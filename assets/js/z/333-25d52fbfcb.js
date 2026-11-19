/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(333, function () {
"use strict";
return [
function (col, tx, o) {
o = o || {};
var m;
if (o.glow) {
m = new THREE.MeshBasicMaterial({ color: col, transparent: o.op !== undefined, opacity: o.op === undefined ? 1 : o.op, depthWrite: o.op === undefined });
}
else {
m = new THREE.MeshLambertMaterial({ color: col });
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.e) {
m.emissive = new THREE.Color(o.e);
}
}
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.grTx = GR_TEX[tx] ? tx : null;
m.userData.grGlow = !!o.glow;
m.userData.grOp = o.op;
return m;
},
function (grp) {
grp.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(grp.matrixWorld).invert(), parts = {};
var keep = [];
grp.traverse(function (o) {
if (!o.isMesh || o.isInstancedMesh || !o.material || Array.isArray(o.material) || !o.material.color || o.userData.grKeep) {
if (o.isMesh || o.isSprite || o.isPoints)
keep.push(o);
return;
}
var m = o.material, ud = m.userData || {}, glow = ud.grGlow || m.isMeshBasicMaterial, op = ud.grOp !== undefined ? ud.grOp : (m.transparent ? m.opacity : undefined);
if (m.map && !ud.grTx) {
keep.push(o);
return;
}
var key = (glow ? "g" : "s") + ":" + (ud.grTx || "") + ":" + (op !== undefined ? op : "") + ":" + (m.side === THREE.DoubleSide ? "d" : "");
var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
var c = m.color.getHex(), e = m.emissive ? m.emissive.getHex() : 0;
(parts[key] = parts[key] || { tx: ud.grTx, glow: glow, op: op, ds: m.side === THREE.DoubleSide, L: [] }).L.push({ g: geo, c: c, e: e });
});
var out = new THREE.Group();
out.position.copy(grp.position);
out.rotation.copy(grp.rotation);
out.scale.copy(grp.scale);
keep.forEach(function (o) {
var w = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
o.updateMatrixWorld(true);
var M = new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld);
M.decompose(w, q, s);
if (o.parent)
o.parent.remove(o);
o.position.copy(w);
o.quaternion.copy(q);
o.scale.copy(s);
out.add(o);
});
var lift = 255 / 204, C = new THREE.Color();
Object.keys(parts).forEach(function (k) {
var P = parts[k], n = 0;
P.L.forEach(function (e) { n += e.g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3), uv = P.tx ? new Float32Array(n * 2) : null, o = 0;
P.L.forEach(function (e) {
var A = e.g.attributes.position, N = e.g.attributes.normal;
C.setHex(e.c);
if (P.tx) {
C.multiplyScalar(lift);
C.r = Math.min(1, C.r);
C.g = Math.min(1, C.g);
C.b = Math.min(1, C.b);
}
if (e.e && !P.glow) {
var E = new THREE.Color(e.e);
C.r = Math.min(1, C.r + E.r * 0.6);
C.g = Math.min(1, C.g + E.g * 0.6);
C.b = Math.min(1, C.b + E.b * 0.6);
}
for (var i = 0; i < A.count; i++) {
var x = A.getX(i), y = A.getY(i), z = A.getZ(i);
pos[o * 3] = x;
pos[o * 3 + 1] = y;
pos[o * 3 + 2] = z;
var nx = N ? N.getX(i) : 0, ny = N ? N.getY(i) : 1, nz = N ? N.getZ(i) : 0;
nor[o * 3] = nx;
nor[o * 3 + 1] = ny;
nor[o * 3 + 2] = nz;
col[o * 3] = C.r;
col[o * 3 + 1] = C.g;
col[o * 3 + 2] = C.b;
if (uv) {
var ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
if (ay >= ax && ay >= az) {
uv[o * 2] = x;
uv[o * 2 + 1] = z;
}
else if (ax >= az) {
uv[o * 2] = z;
uv[o * 2 + 1] = y;
}
else {
uv[o * 2] = x;
uv[o * 2 + 1] = y;
}
}
o++;
}
e.g.dispose();
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
if (uv)
g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g.computeBoundingSphere();
var mat;
if (P.glow)
mat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: P.op !== undefined, opacity: P.op === undefined ? 1 : P.op, depthWrite: P.op === undefined });
else {
mat = new THREE.MeshLambertMaterial({ vertexColors: true });
if (P.op !== undefined) {
mat.transparent = true;
mat.opacity = P.op;
mat.depthWrite = false;
}
if (P.tx && typeof texOf === "function") {
var t = texOf(P.tx);
if (t)
mat.map = t;
}
}
if (P.ds)
mat.side = THREE.DoubleSide;
mat.userData.wsfSkip = 1;
g.userData.wsf = 1;
var mesh = new THREE.Mesh(g, mat);
mesh.userData.wsf = 1;
if (P.op !== undefined)
mesh.renderOrder = 2;
out.add(mesh);
});
return out;
},
function (P, a, x, y, z, ry, s) {
if (typeof KIT === "undefined" || !KIT[a] || typeof build !== "function")
return null;
var m;
try {
m = build({ id: "gr_" + a + "_" + Math.round(x * 10) + "_" + Math.round(z * 10), archetype: a, label: null, attrs: s && s !== 1 ? { s: s } : {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
}
catch (e) {
return null;
}
if (!m)
return null;
m.position.set(x, y || 0, z);
m.rotation.y = ry || 0;
P.add(m);
return m;
},
function (html) {
if (!GR.hudEl) {
var d = document.createElement("div");
d.id = "gr-hud";
d.style.cssText = "position:fixed;left:50%;top:86px;transform:translateX(-50%);z-index:45;pointer-events:none;padding:6px 12px;border-radius:6px;background:rgba(10,12,22,.84);color:#F0ECE0;font:600 14px/1.35 var(--sans,system-ui);text-align:center;max-width:min(92vw,520px);display:none";
document.body.appendChild(d);
GR.hudEl = d;
}
if (!html) {
GR.hudEl.style.display = "none";
return;
}
if (GR.hudEl.dataset.h !== html) {
GR.hudEl.dataset.h = html;
GR.hudEl.innerHTML = html;
}
GR.hudEl.style.display = "block";
},
function (L, x, z, label) {
var dx = x - L.x, dz = z - L.z, d = Math.hypot(dx, dz);
var want = Math.atan2(-dx, -dz), rel = want - (typeof yaw !== "undefined" ? yaw : 0);
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
var arrows = ["⬆️", "↖️", "⬅️", "↙️", "⬇️", "↘️", "➡️", "↗️"], i = ((Math.round(rel / (Math.PI / 4)) % 8) + 8) % 8;
return arrows[i] + " " + esc(label) + " · " + Math.round(d) + " m";
},
function (x, z, feet) {
var R = GR.R;
if (!R)
return 0;
if (x > 15000) {
var I = grInsideAt(x, z);
return I ? I.y : 0;
}
var A = GR_AT, h = null;
var FS = GR.fsteps || [];
for (var f = 0; f < FS.length; f++) {
var F = FS[f], dx = x - F.x, dz = z - F.z, e = dx * F.s + dz * F.c - F.d / 2;
if (F.porch) {
if (e > 0.4 && e < 7.3 && Math.abs(dx * F.c - dz * F.s) <= F.porch.hw)
return F.y + (e < 5.5 ? 1.15 : 1.15 * (3 - Math.floor((e - 5.5) / 0.6)) / 3);
continue;
}
if (e > 0.4 && e < 2.9) {
var k = e < 1.9 ? 2 : (e < 2.4 ? 1 : 0);
if (Math.abs(dx * F.c - dz * F.s) <= (F.dw + 3 - k * 0.6) / 2)
return F.y + (k + 1) / 3;
}
}
var RP = GR.ramps || [];
for (var r = 0; r < RP.length; r++) {
var q = RP[r];
if (x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1) {
var tq = (x - q.x0) / (q.x1 - q.x0);
return q.h0 + (q.h1 - q.h0) * tq;
}
}
var PL = GR.plats || [];
for (var p = 0; p < PL.length; p++) {
var pq = PL[p];
if (pq.r !== undefined ? ((x - pq.x) * (x - pq.x) + (z - pq.z) * (z - pq.z) < pq.r * pq.r) : (x >= pq.x0 && x <= pq.x1 && z >= pq.z0 && z <= pq.z1))
return pq.h;
}
for (var i = 0; i < A.stairs.length; i++) {
var s = A.stairs[i];
if (x >= s.x0 && x <= s.x1 && z >= s.z0 && z <= s.z1) {
var t = (z - s.z0) / (s.z1 - s.z0);
return s.h0 + (s.h1 - s.h0) * t;
}
}
for (var j = A.terr.length - 1; j >= 0; j--) {
var T = A.terr[j];
if (x >= T.x0 && x <= T.x1 && z >= T.z0 && z <= T.z1)
return T.h;
}
if (R.layout === "isles") {
return grOnIsle(x, z) ? 0 : -400;
}
return 0;
},
function (G, R) {
var S = grStyle(R), lite = grLite(), L = grLook(R);
GR.solids = [];
GR.spots = [];
GR.people = [];
GR.isles = [];
GR.sites = [];
GR.doors = [];
GR.drillPosts = [];
GR.gathers = [];
GR.plats = [];
GR.ramps = [];
GR.fsteps = [];
GR.taken = [];
GR.pastimeAt = null;
var P = new THREE.Group();
var A = GR_AT, pave = S.pave, rnd = wRand(grHash(R.id));
grGroundBuild(G, P, R, S);
if (L.plan === "scatter") {
var lane = L.lane || [0x7A6A52, "earth"], S2 = Object.assign({}, S, { pave: lane });
grPaveRect(P, R, S2, -6, 6, -112, 268, 0.02);
grPaveRect(P, R, S2, -200, -36, 76, 84, 0.02);
grPaveRect(P, R, S2, 36, 204, 76, 84, 0.02);
}
else {
grPaveRect(P, R, S, -9, 9, -112, 268, 0.02);
grPaveRect(P, R, S, -200, -36, 74, 86, 0.02);
grPaveRect(P, R, S, 36, 204, 74, 86, 0.02);
}
grPaveDisc(P, R, S, A.plaza.x, A.plaza.z, A.plaza.r, 0.03);
if (R.layout === "isles") {
GR.isles.push({ x0: -10, x1: 10, z0: -114, z1: 272 }, { x0: -205, x1: -30, z0: 72, z1: 88 }, { x0: 30, x1: 205, z0: 72, z1: 88 }, { x: A.plaza.x, z: A.plaza.z, r: A.plaza.r + 1 });
}
if (L.plan === "ring") {
var rg = new THREE.Mesh(new THREE.RingGeometry(GR_RING.road - 6, GR_RING.road + 6, 72, 1), grMat(S.pave[0], S.pave[1]));
rg.rotation.x = -Math.PI / 2;
rg.position.set(A.plaza.x, 0.025, A.plaza.z);
P.add(rg);
[GR_RING.road - 6, GR_RING.road + 6].forEach(function (rr2) { var kb = new THREE.Mesh(new THREE.TorusGeometry(rr2, 0.22, 3, 72), grMat(S.trim[0], S.trim[1])); kb.rotation.x = Math.PI / 2; kb.position.set(A.plaza.x, 0.06, A.plaza.z); P.add(kb); });
if (R.layout === "isles")
for (var ra = 0; ra < 48; ra++) {
var aa = ra / 48 * Math.PI * 2;
GR.isles.push({ x: A.plaza.x + Math.cos(aa) * GR_RING.road, z: A.plaza.z + Math.sin(aa) * GR_RING.road, r: 8 });
}
[45, 135, 225, 315].forEach(function (dg) {
var a = dg * Math.PI / 180, len = GR_RING.road - 6 - A.plaza.r, mx = Math.cos(a) * (A.plaza.r + len / 2), mz = A.plaza.z + Math.sin(a) * (A.plaza.r + len / 2);
grBox(P, 7, 0.12, len + 2, S.pave[0], S.pave[1], mx, 0.0, mz, Math.atan2(Math.cos(a), Math.sin(a)));
if (R.layout === "isles")
for (var t2 = 0; t2 <= len; t2 += 5)
GR.isles.push({ x: Math.cos(a) * (A.plaza.r + t2), z: A.plaza.z + Math.sin(a) * (A.plaza.r + t2), r: 4 });
});
}
for (var z = 250; z >= -100; z -= (L.plan === "scatter" ? 33 : 22)) {
if (Math.abs(z - A.plaza.z) < A.plaza.r + 6)
continue;
if (L.plan === "ring" && Math.abs(Math.abs(z - A.plaza.z) - GR_RING.road) < 9)
continue;
[-1, 1].forEach(function (s) {
var off = L.plan === "scatter" ? 7.4 : 10.4;
if (S.lamp && L.lamps !== false)
grLamp(P, S, s * off, z, R);
var tk = L.tree === undefined ? S.tree : L.tree;
if (tk && (!lite || z % 44 === 0) && R.layout !== "isles")
grKit(P, tk, s * (off + 3.1) + (L.plan === "scatter" ? (rnd() - 0.5) * 4 : 0), 0, z + 11, rnd() * 6, R.layout === "cavern" ? 0.8 : (L.treeS || 1));
});
}
grTerraces(P, R, S);
grPlazaHeart(P, R, S);
var W = R.wards || [], SL = grWardSlots(R);
for (var i = 0; i < W.length && i < 8; i++) {
var b = W[i], T = GR_TYPE[b.t] || GR_TYPE.hall, d = T.size[2], q = SL[i];
var site = grSite(G, P, R, S, b, q.x, q.z, q.rot, "w" + i, q.y);
if (q.y)
grHillPlinth(P, R, S, site);
if (R.layout === "isles") {
var straight = Math.abs(Math.sin(q.rot * 2)) < 0.05;
if (straight)
GR.isles.push(grIsleFor(q.x, q.z, T.size[0], d, q.rot, 7));
else
GR.isles.push({ x: q.x, z: q.z, r: Math.hypot(T.size[0], d) / 2 + 4 });
{
var dx = site.door.x, dz = site.door.z, tx = L.plan === "ring" ? A.plaza.x + (dx - A.plaza.x) / Math.hypot(dx - A.plaza.x, dz - A.plaza.z) * GR_RING.road : (dx < 0 ? -9 : 9), tz = L.plan === "ring" ? A.plaza.z + (dz - A.plaza.z) / Math.hypot(dx - A.plaza.x, dz - A.plaza.z) * GR_RING.road : dz;
var bl = Math.hypot(tx - dx, tz - dz);
if (bl > 1) {
grBox(P, 6, 0.6, bl + 4, S.trim[0], S.trim[1], (dx + tx) / 2, -0.28, (dz + tz) / 2, Math.atan2(tx - dx, tz - dz));
for (var bt = 0; bt <= bl; bt += 3)
GR.isles.push({ x: dx + (tx - dx) * bt / bl, z: dz + (tz - dz) * bt / bl, r: 3.2 });
}
}
}
}
if (R.palace) {
grSite(G, P, R, S, R.palace, A.palace.x, A.palace.z, 0, "p");
}
grHomes(P, R, S);
grArena(G, P, R, S);
grTunnel(G, P, R, S);
grDeep(G, P, R, S);
grInnerGate(G, P, R, S);
grDoesBoard(P, R, S);
grLoreStones(P, R, S);
grPastime(G, P, R, S);
grDecorate(G, P, R, S);
grQuays(P, R, S);
G.add(grBake(P));
grCitizens(G, R);
},
function (P, R, S) {
var u = grLook(R).under;
if (R.layout !== "isles" || (u !== "sea" && u !== "silver"))
return;
GR.isles.forEach(function (q) {
if (q.r !== undefined) {
if (q.r < 5)
return;
grCyl(P, q.r, q.r + 0.4, 2.6, S.trim[0], S.trim[1], q.x, -1.32, q.z, Math.min(28, Math.max(10, Math.round(q.r * 1.5))));
}
else
grBox(P, q.x1 - q.x0, 2.6, q.z1 - q.z0, S.trim[0], S.trim[1], (q.x0 + q.x1) / 2, -1.32, (q.z0 + q.z1) / 2);
});
},
function (P, R, S, x0, x1, z0, z1, y) {
var w = x1 - x0, d = z1 - z0;
grBox(P, w, 0.12, d, S.pave[0], S.pave[1], (x0 + x1) / 2, y - 0.04, (z0 + z1) / 2);
if (w < d) {
[x0, x1].forEach(function (x) { grBox(P, 0.4, 0.22, d, S.trim[0], S.trim[1], x, 0.05, (z0 + z1) / 2); });
}
else {
[z0, z1].forEach(function (z) { grBox(P, w, 0.22, 0.4, S.trim[0], S.trim[1], (x0 + x1) / 2, 0.05, z); });
}
},
function (P, R, S, x, z, r, y) {
grCyl(P, r, r, 0.14, S.pave[0], S.pave[1], x, y - 0.05, z, 40);
grMesh(new THREE.TorusGeometry(r, 0.3, 4, 48), grMat(S.trim[0], S.trim[1]), x, y + 0.04, z, P).rotation.x = Math.PI / 2;
[r * 0.5, r * 0.78].forEach(function (rr) { grMesh(new THREE.TorusGeometry(rr, 0.5, 3, 40), grMat(S.trim[0], S.trim[1]), x, y + 0.02, z, P).rotation.x = Math.PI / 2; });
},
function (G, P, R, S) {
var A = GR_AT, B = A.bound, E = R.env || {}, rnd = wRand(grHash(R.id) + 7);
var gcol = E.groundCol || 0x6A665E, gtx = E.groundTex || "stone";
if (R.layout === "isles") {
var cs = wTex(256, 256, function (x, Wd, H) {
var a = new THREE.Color(E.cloud || 0xE8E0D0), b = new THREE.Color(E.cloud2 || 0xB8A890);
for (var y = 0; y < H; y++) {
var t = Math.sin(y / H * Math.PI * 4 + Math.sin(y * 0.2) * 0.5) * 0.5 + 0.5;
x.fillStyle = "#" + a.clone().lerp(b, t).getHexString();
x.fillRect(0, y, Wd, 1);
}
for (var i = 0; i < 260; i++) {
x.fillStyle = "rgba(255,255,255," + (Math.random() * 0.2) + ")";
x.beginPath();
x.ellipse(Math.random() * Wd, Math.random() * H, 8 + Math.random() * 30, 3 + Math.random() * 7, 0, 0, 7);
x.fill();
}
}, [8, 8]);
var sea = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000), new THREE.MeshLambertMaterial({ map: cs }));
sea.rotation.x = -Math.PI / 2;
var und = grLook(R).under;
sea.position.set(160, und === 'sea' || und === 'silver' ? -2.2 : -140, 0);
G.add(sea);
return;
}
var gr = wGround(1600, 80, function (x, z) {
var lx = x + 160, lz = z + 15, out = Math.max(0, Math.max(B.x0 - lx, lx - B.x1, B.z0 - lz, lz - B.z1));
var h = out > 0 ? Math.min(60, out * 0.35) + (wFbm(lx * 0.01, lz * 0.01, R.idx + 3, 3) - 0.5) * out * 0.3 : 0;
var n = wFbm(lx * 0.04, lz * 0.04, R.idx + 11, 3), c = new THREE.Color(gcol).lerp(new THREE.Color(E.groundCol2 || gcol), n);
return [h, c.getHex()];
});
gr.position.set(160, 0, 15);
gr.material = new THREE.MeshLambertMaterial({ vertexColors: true });
var gt = typeof texOf === "function" ? texOf(gtx) : null;
if (gt) {
var g = gr.geometry, p = g.attributes.position, uv = g.attributes.uv;
for (var i = 0; i < p.count; i++)
uv.setXY(i, p.getX(i), p.getZ(i));
uv.needsUpdate = true;
gr.material.map = gt;
var cl = g.attributes.color;
for (var j = 0; j < cl.count; j++)
cl.setXYZ(j, Math.min(1, cl.getX(j) * 1.25), Math.min(1, cl.getY(j) * 1.25), Math.min(1, cl.getZ(j) * 1.25));
}
gr.position.y = -0.05;
G.add(gr);
if (R.layout === "cavern") {
var rock = E.rock || 0x4A443E, roofH = E.roof || 70;
var roof = new THREE.Mesh(new THREE.PlaneGeometry(1200, 800), grMat(rock, "stone", { ds: true }));
roof.rotation.x = Math.PI / 2;
roof.position.set(165, roofH, 15);
P.add(roof);
var n2 = grLite() ? 60 : 130;
for (var k = 0; k < n2; k++) {
var x = B.x0 + rnd() * (B.x1 - B.x0), z = B.z0 + rnd() * (B.z1 - B.z0), h2 = 4 + rnd() * 16;
if (Math.abs(x) < 14 && z > -120)
continue;
grCone(P, 1 + rnd() * 2.4, h2, rock, "stone", x, roofH - h2 / 2, z, 6).rotation.x = Math.PI;
}
for (var q = 0; q < (grLite() ? 8 : 16); q++) {
var a = q / 16 * Math.PI * 2, px = 165 + Math.cos(a) * 470, pz = 15 + Math.sin(a) * 330;
grCyl(P, 9, 16, roofH, rock, "stone", px, roofH / 2, pz, 8);
}
for (var m = 0; m < (grLite() ? 14 : 30); m++) {
var gx = B.x0 + 20 + rnd() * (B.x1 - B.x0 - 40), gz = B.z0 + 20 + rnd() * (B.z1 - B.z0 - 40);
if (Math.abs(gx) < 16 || Math.abs(gz - 80) < 10)
continue;
var gc = E.glowCol || 0x8AE0C8;
grKit(P, E.glowKit || "giantmushroom", gx, 0, gz, rnd() * 6, 0.6 + rnd() * 0.6);
grGlow(P, gc, 5, 0.22, gx, 2.4, gz);
}
}
else {
grRange(P, R, E, gcol);
if (R.layout === "dome") {
var dm = new THREE.Mesh(new THREE.SphereGeometry(330, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), grMat(0xBFD8F0, null, { op: 0.12, ds: true }));
dm.position.set(0, 0, 30);
P.add(dm);
var ring = new THREE.Mesh(new THREE.TorusGeometry(330, 1.6, 6, 80), grMat(0x8A929C, "metal"));
ring.rotation.x = Math.PI / 2;
ring.position.set(0, 0.6, 30);
P.add(ring);
for (var rb = 0; rb < 12; rb++) {
var ra = new THREE.Mesh(new THREE.TorusGeometry(330, 0.6, 4, 40, Math.PI), grMat(0x8A929C, "metal"));
ra.rotation.y = rb / 12 * Math.PI;
ra.position.set(0, 0, 30);
P.add(ra);
}
var dm2 = new THREE.Mesh(new THREE.SphereGeometry(110, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), grMat(0xBFD8F0, null, { op: 0.12, ds: true }));
dm2.position.set(420, 0, 80);
P.add(dm2);
}
}
},
function (P, R, E, gcol) {
var lite = grLite(), NA = lite ? 128 : 220, NR = lite ? 12 : 22, r0 = 560, r1 = 1120, seed = (R.idx || 0) * 7 + 5;
var mc = new THREE.Color(E.mtn || 0x6A6A72), foot = new THREE.Color(gcol || 0x6A7A4A), top = mc.clone().lerp(new THREE.Color(0xF2F0EA), 0.32), dark = mc.clone().multiplyScalar(0.62);
var pos = new Float32Array(NA * (NR + 1) * 3), col = new Float32Array(NA * (NR + 1) * 3), hs = new Float32Array(NA * (NR + 1)), idx = [], hMax = 1, C = new THREE.Color();
var tall = 0.75 + ((seed * 13) % 7) / 10;
for (var i = 0; i < NA; i++) {
var a = i / NA * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
for (var j = 0; j <= NR; j++) {
var t = j / NR, r = r0 + (r1 - r0) * Math.pow(t, 0.85), x = ca * r, z = sa * r * 0.8;
var e = Math.min(1, Math.max(0, (r - r0) / 140));
e = e * e * (3 - 2 * e);
var fall = Math.min(1, Math.max(0, (r1 - r) / 160));
e *= fall * fall * (3 - 2 * fall);
var n1 = wFbm(x * 0.0032 + 40, z * 0.0032, seed, 4), rd = 1 - Math.abs(2 * wFbm(x * 0.007, z * 0.007 + 90, seed + 1, 4) - 1), n3 = wFbm(x * 0.03, z * 0.03, seed + 2, 2);
var h = e * (30 + 210 * tall * Math.pow(n1, 1.4) * (0.55 + 0.75 * rd * rd)) + e * (n3 - 0.5) * 14 - 6;
var k = i * (NR + 1) + j;
pos[k * 3] = 165 + x;
pos[k * 3 + 1] = h;
pos[k * 3 + 2] = 15 + z;
hs[k] = h;
if (h > hMax)
hMax = h;
}
}
for (var i2 = 0; i2 < NA; i2++) {
var i3 = (i2 + 1) % NA;
for (var j2 = 0; j2 < NR; j2++) {
var A = i2 * (NR + 1) + j2, B = i3 * (NR + 1) + j2;
idx.push(A, B, A + 1, B, B + 1, A + 1);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
var nr = g.attributes.normal, uv = new Float32Array(NA * (NR + 1) * 2);
for (var k2 = 0; k2 < hs.length; k2++) {
var ny = nr.getY(k2), steep = 1 - Math.min(1, Math.max(0, (ny - 0.55) / 0.4)), hh = Math.max(0, hs[k2]) / hMax, gr = wFbm(pos[k2 * 3] * 0.02, pos[k2 * 3 + 2] * 0.02, seed + 3, 2);
C.copy(foot).lerp(mc, Math.min(1, hh * 2.6 + steep * 0.5));
if (hh > 0.62)
C.lerp(top, Math.min(1, (hh - 0.62) * 3.2) * (1 - steep * 0.6));
C.lerp(dark, steep * 0.45);
C.multiplyScalar(0.88 + gr * 0.24);
col[k2 * 3] = C.r;
col[k2 * 3 + 1] = C.g;
col[k2 * 3 + 2] = C.b;
uv[k2 * 2] = (pos[k2 * 3] + pos[k2 * 3 + 2] * 0.7) / 9;
uv[k2 * 2 + 1] = pos[k2 * 3 + 1] / 9 + (ny > 0.8 ? pos[k2 * 3 + 2] / 9 : 0);
}
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g.computeBoundingSphere();
var m = new THREE.MeshLambertMaterial({ vertexColors: true }), tx = typeof texOf === "function" ? texOf(E.mtnTex || "stone") : null;
if (tx)
m.map = tx;
var mesh = new THREE.Mesh(g, m);
mesh.userData.grKeep = 1;
mesh.name = "gr-range";
mesh.raycast = function () { };
P.add(mesh);
return mesh;
},
function (P, R, S) {
var A = GR_AT;
A.terr.forEach(function (T, i) {
var w = T.x1 - T.x0, d = T.z1 - T.z0, cx = (T.x0 + T.x1) / 2, cz = (T.z0 + T.z1) / 2;
grBox(P, w, T.h, d, S.trim[0], S.trim[1], cx, T.h / 2 - 0.02, cz);
grBox(P, w - 1, 0.14, d - 1, S.pave[0], S.pave[1], cx, T.h + 0.02, cz);
var gap = 11;
[[T.x0, -gap], [gap, T.x1]].forEach(function (q) {
var pw = q[1] - q[0];
grBox(P, pw, 1.1, 0.6, S.wall[0], S.wall[1], (q[0] + q[1]) / 2, T.h + 0.55, T.z1 - 0.3);
GR.solids.push({ x: (q[0] + q[1]) / 2, z: T.z1, hw: pw / 2, hd: 0.6, h: T.h + 1.1 });
});
[T.x0, T.x1].forEach(function (x) { grBox(P, 0.6, 1.1, d, S.wall[0], S.wall[1], x, T.h + 0.55, cz); GR.solids.push({ x: x, z: cz, hw: 0.6, hd: d / 2, h: T.h + 1.1 }); });
for (var ux = T.x0 + 6; ux < T.x1 - 4; ux += 12) {
if (Math.abs(ux) < gap + 2)
continue;
grCyl(P, 0.5, 0.3, 0.9, S.trim[0], S.trim[1], ux, T.h + 1.55, T.z1 - 0.3, 8);
}
if (R.layout === "isles")
GR.isles.push({ x0: T.x0, x1: T.x1, z0: T.z0, z1: T.z1 });
});
var T1 = A.terr[0], T2 = A.terr[1];
[[T1.x0, T2.x0], [T2.x1, T1.x1]].forEach(function (q) { var pw = q[1] - q[0]; grBox(P, pw, 1.1, 0.6, S.wall[0], S.wall[1], (q[0] + q[1]) / 2, T1.h + 0.55, T1.z0 + 0.3); GR.solids.push({ x: (q[0] + q[1]) / 2, z: T1.z0, hw: pw / 2, hd: 0.6, h: T1.h + 1.1 }); });
grBox(P, T2.x1 - T2.x0, 1.1, 0.6, S.wall[0], S.wall[1], 0, T2.h + 0.55, T2.z0 + 0.3);
GR.solids.push({ x: 0, z: T2.z0, hw: (T2.x1 - T2.x0) / 2, hd: 0.6, h: T2.h + 1.1 });
A.stairs.forEach(function (s) {
var n = 12, w = s.x1 - s.x0;
for (var k = 0; k < n; k++) {
var t0 = k / n, z = s.z0 + (s.z1 - s.z0) * (k + 0.5) / n, h = s.h0 + (s.h1 - s.h0) * t0;
grBox(P, w, Math.max(0.2, h), (s.z1 - s.z0) / n, S.trim[0], S.trim[1], (s.x0 + s.x1) / 2, Math.max(0.2, h) / 2, z);
}
[s.x0 - 0.4, s.x1 + 0.4].forEach(function (x) { grBox(P, 0.8, 1, Math.abs(s.z1 - s.z0), S.wall[0], S.wall[1], x, (s.h0 + s.h1) / 2 + 0.5, (s.z0 + s.z1) / 2); });
if (R.layout === "isles")
GR.isles.push({ x0: s.x0, x1: s.x1, z0: s.z0, z1: s.z1 });
});
[-14, 14].forEach(function (x) { grCyl(P, 0.12, 0.12, 9, S.trim[0], "metal", x, 9 + 4.5, -165, 6); grBox(P, 2.2, 5, 0.06, S.accent, null, x + 1.2, 9 + 5.5, -165); });
},
function (P, R, S) {
var A = GR_AT, x = A.plaza.x, z = A.plaza.z, k = (R.plaza && R.plaza.heart) || "fountain";
if (k === "fountain") {
grCyl(P, 9, 9.6, 0.9, S.trim[0], S.trim[1], x, 0.45, z, 32);
grCyl(P, 8.4, 8.4, 0.2, 0x4A7A9A, null, x, 0.85, z, 32, { glow: false });
grCyl(P, 1.2, 1.6, 3, S.wall[0], S.wall[1], x, 2, z, 12);
grCyl(P, 3.4, 3.6, 0.5, S.trim[0], S.trim[1], x, 3.5, z, 20);
grCyl(P, 3, 3, 0.12, 0x5A8AAA, null, x, 3.72, z, 20);
grCyl(P, 0.5, 0.7, 2.4, S.wall[0], S.wall[1], x, 4.9, z, 10);
grSph(P, 0.7, S.trim[0], S.trim[1], x, 6.4, z, 10);
grGlow(P, 0xBFE4FF, 6, 0.18, x, 1.4, z);
GR.solids.push({ x: x, z: z, r: 9.6, h: 1.2 });
}
else if (k === "obelisk" || k === "statue" || k === "crystal" || k === "tree" || k === "orrery" || k === "flame") {
grCyl(P, 6, 6.6, 1.2, S.trim[0], S.trim[1], x, 0.6, z, 24);
var a = k === "obelisk" ? "obelisk" : k === "statue" ? (S.statue || "herostatue") : k === "crystal" ? "crystalspire" : k === "tree" ? "worldtree" : k === "orrery" ? "orrery" : "brazier";
grKit(P, a, x, 1.2, z, 0, k === "tree" ? 0.5 : k === "statue" ? 2.2 : k === "orrery" ? 2.4 : k === "flame" ? 2.6 : 1.6);
if (k === "flame" || k === "crystal")
grGlow(P, k === "flame" ? 0xFFB060 : S.glow, 8, 0.25, x, 5, z);
GR.solids.push({ x: x, z: z, r: 6.6, h: 20 });
}
for (var i = 0; i < 8; i++) {
var an = i / 8 * Math.PI * 2 + Math.PI / 8, bx = x + Math.cos(an) * (A.plaza.r - 5), bz = z + Math.sin(an) * (A.plaza.r - 5);
if (Math.abs(bx) < 10)
continue;
grKit(P, "bench", bx, 0, bz, -an + Math.PI / 2, 1);
}
for (var j = 0; j < 6; j++) {
var a2 = j / 6 * Math.PI * 2, lx = x + Math.cos(a2) * (A.plaza.r - 1.5), lz = z + Math.sin(a2) * (A.plaza.r - 1.5);
if (Math.abs(lx) < 10 || Math.abs(lz - z) < 8)
continue;
grLamp(P, S, lx, lz, R);
}
var nm = (R.plaza && R.plaza.n) || "The Great Plaza";
grSign(P, [nm, (R.plaza && R.plaza.d) || ""], x + 10.5, 2.4, z + A.plaza.r - 6, Math.PI * 0.15, 3.8, 1.1);
},
function (G, P, R, S, b, x, z, rot, id, yy) {
var T = GR_TYPE[b.t] || GR_TYPE.hall, w = T.size[0], h = T.size[1], d = T.size[2];
if (b.big) {
w *= 1.2;
h *= 1.2;
d *= 1.15;
}
var hs = grLook(R).hs;
if (hs && id !== "p")
h *= hs;
var y0 = id === "p" ? GR_AT.terr[1].h : (yy || 0);
var B = new THREE.Group();
B.position.set(x, y0, z);
B.rotation.y = rot;
grFacade(B, R, S, b, T, w, h, d, id === "p");
P.add(B);
var c = Math.cos(rot), s = Math.sin(rot);
GR.solids.push({ x: x, z: z, hw: w / 2 + 0.5, hd: d / 2 + 0.5, rot: rot, b: y0 - 1, h: h + 30 });
var po = B.userData.porch || null;
GR.fsteps.push({ x: x, z: z, c: c, s: s, d: d, dw: id === "p" ? 5.6 : 4.2, y: y0, porch: po });
if (po)
po.cols.forEach(function (cx) { GR.solids.push({ x: x + cx * c + po.cz * s, z: z - cx * s + po.cz * c, r: 0.6, b: y0, h: 30 }); });
(B.userData.solids || []).forEach(function (q) { GR.solids.push({ x: x + q.x * c + q.z * s, z: z - q.x * s + q.z * c, r: q.r, b: y0 - 1, h: 40 }); });
var fx = x + s * (d / 2 + 2.2), fz = z + c * (d / 2 + 2.2);
var site = { id: id, b: b, T: T, x: x, z: z, rot: rot, w: w, d: d, h: h, y: y0, door: { x: fx, z: fz }, name: b.n };
GR.sites.push(site);
GR.spots.push({ x: fx, z: fz, y: y0, r: 3.2, label: "<b>" + esc(b.n) + "</b>" + (b.d ? " · " + esc(b.d) : "") + " · <b>press E</b> to go in", fn: function () { grEnter(site); } });
return site;
},
function (B, R, S, b, w, h, d, grand, colon, trim, glow) {
var dw = grand ? 5.6 : 4.2, dh = grand ? 7 : 5.4;
grBox(B, dw + 1.2, dh + 0.8, 0.8, trim[0], trim[1], 0, 1 + dh / 2, d / 2 + 0.2);
grBox(B, dw, dh, 0.3, 0x18120E, null, 0, 1 + dh / 2, d / 2 + 0.5);
[-1, 1].forEach(function (sd) { grBox(B, dw / 2 - 0.1, dh - 0.3, 0.12, 0x5A3A22, "wood", sd * dw / 4, 1 + (dh - 0.3) / 2, d / 2 + 0.66); });
grCyl(B, dw / 2 + 0.6, dw / 2 + 0.6, 0.8, trim[0], trim[1], 0, 1 + dh, d / 2 + 0.2, 16).rotation.x = Math.PI / 2;
for (var st = 0; st < 3; st++)
grBox(B, dw + 3 - st * 0.6, 0.33, 1.2, trim[0], trim[1], 0, 0.17 + st * 0.33, d / 2 + 2.3 - st * 0.5);
[-1, 1].forEach(function (sd) { grCyl(B, 0.12, 0.12, 2.4, trim[0], "metal", sd * (dw / 2 + 1.2), 2.2, d / 2 + 0.9, 6); grSph(B, 0.32, glow, null, sd * (dw / 2 + 1.2), 3.6, d / 2 + 0.9, 8, { glow: true }); });
[-1, 1].forEach(function (sd) { grBox(B, 1.6, Math.min(6, h * 0.45), 0.06, S.accent, null, sd * (w / 2 - 2.4), h * 0.6, d / 2 + 0.12); grBox(B, 2, 0.2, 0.2, trim[0], "metal", sd * (w / 2 - 2.4), h * 0.6 + Math.min(6, h * 0.45) / 2 + 0.1, d / 2 + 0.2); });
grSign(B, [b.n, b.d || ""], 0, 1 + dh + 1.6, d / 2 + (colon ? 5 : 0.9), 0, Math.min(10, dw + 5), 1.3, "#1A1612", S.k === "station" ? "#CFE6FF" : "#F0DCA8");
grSign(B, ["📋 Hiring here", "press E at the door"], dw / 2 + 2.6, 2.2, d / 2 + (colon ? 5 : 0.95), 0, 2.2, 0.7, "#1A2A1A", "#D8F0C0");
},
function (B, R, S, b, T, w, h, d, grand) {
var wall = [grTint(S.wall[0], b.n, 0.1), S.wall[1]], trim = S.trim, roof = [grTint(S.roof[0], b.n + "r", 0.12), S.roof[1]], k = S.roofKind, glow = S.glow;
var FF = GR_FORM[S.form];
if (FF) {
FF(B, R, S, b, w, h, d, grand, wall, trim, roof);
grFormMark(B, R, S, b, w, h, d, grand, trim);
grFront(B, R, S, b, w, h, d, grand, false, trim, glow);
return;
}
grBox(B, w + 1.4, 1, d + 1.4, trim[0], trim[1], 0, 0.5, 0);
grBox(B, w, h - 1, d, wall[0], wall[1], 0, 0.5 + (h - 1) / 2, 0);
var floors = Math.max(2, Math.round(h / 5.5));
for (var f = 1; f < floors; f++) {
var fy = 1 + f * (h - 1) / floors;
grBox(B, w + 0.3, 0.3, d + 0.3, trim[0], trim[1], 0, fy, 0);
}
grBox(B, w + 1, 0.7, d + 1, trim[0], trim[1], 0, h + 0.2, 0);
var wm = grMat(glow, null, { glow: true }), fm = grMat(trim[0], trim[1]);
var AL = (typeof AUP !== "undefined" && AUP.on && typeof aupWindow === "function" && S.k !== "station" && S.k !== "future") ? [] : null, wr = wRand(grHash(b.n + "w"));
for (var fl = 0; fl < floors; fl++) {
var wy = 1 + (fl + 0.55) * (h - 1) / floors, wh = Math.min(2.4, (h - 1) / floors * 0.55);
[[w, d / 2 + 0.06, 0], [w, -d / 2 - 0.06, Math.PI], [d, w / 2 + 0.06, Math.PI / 2], [d, -w / 2 - 0.06, -Math.PI / 2]].forEach(function (side, si) {
var len = side[0], n = Math.max(2, Math.floor(len / 4.2));
for (var i = 0; i < n; i++) {
var u = -len / 2 + (i + 0.5) * len / n;
if (si === 0 && fl === 0 && Math.abs(u) < 4)
continue;
var px = si < 2 ? u : side[1], pz = si < 2 ? side[1] : u, ry = si < 2 ? 0 : Math.PI / 2;
if (AL) {
aupWindow(AL, px, wy, pz, side[2], 1.3, wh, 0.02, 0xF2EEE4, false);
if (wr() < 0.33) {
var lw = new THREE.Mesh(new THREE.PlaneGeometry(1.1, wh * 0.86), wm);
lw.position.set(px + Math.sin(side[2]) * 0.05, wy, pz + Math.cos(side[2]) * 0.05);
lw.rotation.y = side[2];
B.add(lw);
}
continue;
}
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.3, wh), wm);
win.position.set(px, wy, pz);
win.rotation.y = side[2];
B.add(win);
var fr = new THREE.Mesh(new THREE.BoxGeometry(si < 2 ? 1.6 : 0.16, wh + 0.3, si < 2 ? 0.16 : 1.6), fm);
fr.position.set(px, wy, pz);
B.add(fr);
if (S.k !== "station") {
var sill = new THREE.Mesh(new THREE.BoxGeometry(si < 2 ? 1.7 : 0.3, 0.16, si < 2 ? 0.3 : 1.7), fm);
sill.position.set(px, wy - wh / 2 - 0.12, pz);
B.add(sill);
}
}
});
}
if (AL && AL.length)
aupPlace(B, AL);
var dw = grand ? 5.6 : 4.2, dh = grand ? 7 : 5.4;
var colon = S.cols && /palace|academy|temple|bank|court|library|hall|embassy|theatre|observatory/.test(b.t);
if (colon) {
var n = grand ? 10 : 6, span = Math.min(w - 4, grand ? 40 : 26), ch = Math.min(h - 2, grand ? 13 : 9.5);
for (var c = 0; c < n; c++) {
var cx = -span / 2 + c * span / (n - 1);
if (Math.abs(cx) < dw / 2 + 0.8)
continue;
grCyl(B, 0.55, 0.65, ch, trim[0], "marble", cx, 1 + ch / 2, d / 2 + 3.2, 12);
grBox(B, 1.5, 0.5, 1.5, trim[0], trim[1], cx, 1.25, d / 2 + 3.2);
grBox(B, 1.6, 0.5, 1.6, trim[0], trim[1], cx, 1 + ch - 0.1, d / 2 + 3.2);
}
grBox(B, span + 3, 1.2, 4.6, trim[0], trim[1], 0, 1 + ch + 0.6, d / 2 + 2.6);
if (k === "dome" || k === "pitched" || S.k === "classical")
grRoof(B, span + 3, 3.4, 4.8, roof[0], roof[1], 0, 1 + ch + 1.2, d / 2 + 2.6).rotation.y = 0;
grBox(B, span + 4, 0.4, 5.4, trim[0], trim[1], 0, 0.95, d / 2 + 2.8);
for (var ps = 0; ps < 3; ps++) {
var pt = 1.15 * (ps + 1) / 3;
grBox(B, span + 4, pt, 0.6, trim[0], trim[1], 0, pt / 2, d / 2 + 5.5 + (2 - ps) * 0.6 + 0.3);
}
var cxs = [];
for (var c2 = 0; c2 < n; c2++) {
var cx2 = -span / 2 + c2 * span / (n - 1);
if (Math.abs(cx2) >= dw / 2 + 0.8)
cxs.push(cx2);
}
B.userData.porch = { hw: (span + 4) / 2, cols: cxs, cz: d / 2 + 3.2 };
}
var top = h + 0.55;
if (k === "pitched") {
grRoof(B, w + 1.2, Math.min(9, d * 0.45), d + 1.2, roof[0], roof[1], 0, top, 0);
for (var ch2 = -1; ch2 <= 1; ch2 += 2)
grBox(B, 1.2, 3, 1.2, trim[0], "brick", ch2 * w * 0.3, top + 3, -d * 0.15);
}
else if (k === "dome") {
grBox(B, w, 0.4, d, roof[0], roof[1], 0, top, 0);
var dr = Math.min(w, d) * (grand ? 0.3 : 0.24);
grCyl(B, dr * 1.05, dr * 1.05, dr * 0.6, wall[0], wall[1], 0, top + dr * 0.3, 0, 24);
grDome(B, dr, roof[0], roof[1], 0, top + dr * 0.6, 0, 24);
grCyl(B, 0.5, 0.7, dr * 0.4, trim[0], trim[1], 0, top + dr * 1.75, 0, 8);
grParapet(B, w, d, top, trim);
}
else if (k === "spire") {
grRoof(B, w + 0.8, Math.min(12, d * 0.6), d + 0.8, roof[0], roof[1], 0, top, 0);
grTowers(B, w, d, top, S, grand ? 1.6 : 1.1, "cone");
grCyl(B, 1.6, 2, 6, wall[0], wall[1], 0, top + Math.min(12, d * 0.6) + 1, 0, 8);
grCone(B, 2.2, grand ? 20 : 12, roof[0], roof[1], 0, top + Math.min(12, d * 0.6) + 4 + (grand ? 10 : 6), 0, 8);
}
else if (k === "flat") {
grBox(B, w, 0.5, d, roof[0], roof[1], 0, top, 0);
var sleek = S.k === "future";
grParapet(B, w, d, top, trim, !sleek);
grTowers(B, w, d, top, S, grand ? 1.5 : 1.1, sleek ? "cap" : "crown");
if (sleek) {
grBox(B, w * 0.5, 2.6, d * 0.4, 0x34404C, "metal", 0, top + 1.5, 0);
}
}
else if (k === "crystal") {
grBox(B, w, 0.5, d, roof[0], roof[1], 0, top, 0);
grParapet(B, w, d, top, trim);
var rr = wRand(grHash(b.n));
for (var q = 0; q < (grand ? 14 : 7); q++) {
var sx = (rr() - 0.5) * w * 0.6, sz = (rr() - 0.5) * d * 0.6, sh = 4 + rr() * (grand ? 16 : 9);
var cr = grCyl(B, 0.1, 0.9 + rr() * 0.8, sh, roof[0], null, sx, top + sh / 2, sz, 6, { op: 0.86 });
cr.rotation.set((rr() - 0.5) * 0.4, rr() * 3, (rr() - 0.5) * 0.4);
}
grGlow(B, glow, grand ? 16 : 10, 0.2, 0, top + 6, 0);
}
else if (k === "module") {
var bar = grCyl(B, d * 0.42, d * 0.42, w * 0.9, roof[0], roof[1], 0, top, 0, 16);
bar.rotation.z = Math.PI / 2;
bar.scale.set(1, 1, 0.5);
grCyl(B, 0.08, 0.08, 7, trim[0], "metal", w * 0.32, top + 5, 0, 5);
grSph(B, 0.25, 0xFF6A5A, null, w * 0.32, top + 8.6, 0, 6, { glow: true });
grKit(B, "satdish", -w * 0.3, top + 1, -d * 0.2, 0.5, 0.4);
grTowers(B, w, d, top, S, 0.9, "cap");
}
else if (k === "tiered") {
grTier(B, w + 4, d + 4, top, roof);
grBox(B, w * 0.6, 3.2, d * 0.6, wall[0], wall[1], 0, top + 2.8, 0);
grTier(B, w * 0.6 + 3, d * 0.6 + 3, top + 4.4, roof);
grCone(B, 1, 3, trim[0], "metal", 0, top + 8.4, 0, 8);
}
grSignature(B, R, S, b, w, h, d, top, wall, trim, roof, grand);
grFront(B, R, S, b, w, h, d, grand, colon, trim, glow);
},
function (B, R, S, b, w, h, d, top, wall, trim, roof, grand) {
var t = b.t, lite = grLite(), gl = S.glow;
if (grand)
return;
if (t === "academy" || t === "library" || t === "court") {
var th = h * 0.9 + 8;
grBox(B, 6, th, 6, wall[0], wall[1], 0, top + th / 2 - h * 0.5, -d * 0.25);
grBox(B, 6.8, 0.6, 6.8, trim[0], trim[1], 0, top + th - h * 0.5, -d * 0.25);
var face = grCyl(B, 1.9, 1.9, 0.2, 0xE8DCC0, null, 0, top + th - h * 0.5 - 2.4, -d * 0.25 + 3.05, 20, { glow: true });
face.rotation.x = Math.PI / 2;
grBox(B, 0.12, 1.4, 0.1, 0x2A2018, null, 0, top + th - h * 0.5 - 2.0, -d * 0.25 + 3.2);
grBox(B, 1.1, 0.12, 0.1, 0x2A2018, null, 0.45, top + th - h * 0.5 - 2.4, -d * 0.25 + 3.2);
grCone(B, 4.6, 6, roof[0], roof[1], 0, top + th - h * 0.5 + 3.3, -d * 0.25, 4);
}
else if (t === "temple") {
grCyl(B, 3.2, 3.6, 9, wall[0], wall[1], 0, top + 4.5, 0, 8);
grCone(B, 3.6, 16, roof[0], roof[1], 0, top + 17, 0, 8);
grSph(B, 0.6, gl, null, 0, top + 25.4, 0, 8, { glow: true });
}
else if (t === "observatory") {
grCyl(B, 6.2, 6.2, 2.4, wall[0], wall[1], 0, top + 1.2, -d * 0.1, 20);
grDome(B, 6, 0x9AA2AA, "metal", 0, top + 2.4, -d * 0.1, 20);
grBox(B, 1.4, 6.2, 0.4, 0x1A1E26, null, 0, top + 5, -d * 0.1 + 4.6).rotation.x = -0.6;
}
else if (t === "forge" || t === "workshop" || t === "mine") {
[-1, 1].forEach(function (sd) { grCyl(B, 1, 1.3, 12, 0x7A4A3A, "brick", sd * w * 0.3, top + 6, -d * 0.2, 10); grCyl(B, 1.25, 1.25, 0.6, trim[0], trim[1], sd * w * 0.3, top + 12, -d * 0.2, 10); });
if (t === "mine") {
grBox(B, 0.5, 14, 0.5, 0x4A3E34, "metal", w * 0.5 + 3, 7, 0);
grBox(B, 0.5, 14, 0.5, 0x4A3E34, "metal", w * 0.5 + 7, 7, 0);
grBox(B, 5, 0.5, 0.5, 0x4A3E34, "metal", w * 0.5 + 5, 14, 0);
var wh = grCyl(B, 2, 2, 0.4, 0x3A3430, "metal", w * 0.5 + 5, 13, 0.6, 16);
wh.rotation.x = Math.PI / 2;
}
}
else if (t === "market") {
var cols = [S.accent, 0xC8B898, S.accent];
for (var i = 0; i < 6; i++) {
var ax = -w / 2 + 3 + i * (w - 6) / 5;
if (Math.abs(ax) < 4)
continue;
var aw = grBox(B, 3.4, 0.15, 2.4, cols[i % 3], null, ax, 4.2, d / 2 + 1.3);
aw.rotation.x = 0.35;
}
if (!lite)
[-1, 1].forEach(function (sd) { grKit(B, "stall", sd * (w / 2 - 4), 0, d / 2 + 6, 0, 0.9); });
}
else if (t === "barracks" || t === "gaol") {
grBox(B, 12, h * 0.5, 4, wall[0], wall[1], 0, h + h * 0.25, d / 2 - 2);
for (var m = -2; m <= 2; m++)
grBox(B, 1.2, 1.2, 4, trim[0], trim[1], m * 2.4, h + h * 0.5 + 0.6, d / 2 - 2);
[-1, 1].forEach(function (sd) { grCyl(B, 0.08, 0.08, 7, 0x8A8A8A, "metal", sd * 5.4, h + h * 0.5 + 3.5, d / 2 - 2, 5); grBox(B, 2.4, 1.4, 0.05, S.accent, null, sd * 5.4 + 1.2, h + h * 0.5 + 6.2, d / 2 - 2); });
}
else if (t === "hospital") {
grBox(B, 10, 0.4, 6, trim[0], trim[1], 0, 6.2, d / 2 + 3);
[-1, 1].forEach(function (sd) { grCyl(B, 0.2, 0.2, 5.6, trim[0], "metal", sd * 4.6, 3.1, d / 2 + 5.6, 8); });
grSph(B, 0.9, 0x6AC88A, null, 0, h - 1, d / 2 + 0.6, 10, { glow: true });
}
else if (t === "bank" || t === "embassy") {
grRoof(B, w * 0.6, 4, 3, 0xB8964A, "metal", 0, h + 0.8, d / 2 - 1);
grCyl(B, 0.12, 0.12, 10, 0xB8B8B8, "metal", 0, top + 5, -d * 0.2, 6);
grBox(B, 3.2, 1.8, 0.05, S.accent, null, 1.6, top + 9, -d * 0.2);
}
else if (t === "theatre") {
var ar = grCyl(B, 4.6, 4.6, 0.4, gl, null, 0, h * 0.62, d / 2 + 0.12, 20, { glow: true });
ar.rotation.x = Math.PI / 2;
ar.scale.set(1, 1, 0.8);
grBox(B, w * 0.5, h * 0.6, d * 0.4, wall[0], wall[1], 0, top + h * 0.3, -d * 0.2);
}
else if (t === "dock" || t === "hangar") {
grBox(B, w * 0.6, h * 0.7, 0.3, 0x4A4E54, "metal", 0, h * 0.35 + 0.5, d / 2 + 0.2);
grBox(B, 0.8, 18, 0.8, 0xB8862A, "metal", w / 2 + 4, 9, d / 4);
grBox(B, 14, 0.8, 0.8, 0xB8862A, "metal", w / 2 - 2, 18, d / 4);
}
else if (t === "inn" || t === "bath") {
grBox(B, 3, 0.15, 0.15, 0x3A2A1A, "wood", w / 2 - 2, 5.6, d / 2 + 1.5);
grBox(B, 1.8, 1.4, 0.1, S.accent, null, w / 2 - 1, 4.8, d / 2 + 2.2);
if (!lite)
for (var q = -2; q <= 2; q++) {
if (q === 0)
continue;
grBox(B, 1.6, 0.4, 0.5, 0x5A3A22, "wood", q * w / 6, h * 0.45, d / 2 + 0.4);
grSph(B, 0.5, 0x6A8A4A, null, q * w / 6, h * 0.45 + 0.45, d / 2 + 0.45, 6);
}
}
else if (t === "lab" || t === "farm") {
grBox(B, w * 0.5, 4, d * 0.4, 0xA8C8D0, null, 0, top + 2, 0, 0, { op: 0.45 });
grBox(B, w * 0.5 + 0.2, 0.2, d * 0.4 + 0.2, trim[0], "metal", 0, top + 4, 0);
}
else if (t === "guild" || t === "hall") {
grBox(B, 4, 4, 4, wall[0], wall[1], 0, top + 2, 0);
grCone(B, 3.4, 4, roof[0], roof[1], 0, top + 6, 0, 4);
grBox(B, 4.1, 1.6, 4.1, gl, null, 0, top + 2.4, 0, 0, { glow: true });
}
},
function (B, w, d, top, trim, merlons) {
[[w, 0, d / 2], [w, 0, -d / 2], [d, w / 2, 0], [d, -w / 2, 0]].forEach(function (q, i) {
var along = i < 2;
grBox(B, along ? q[0] + 0.6 : 0.6, 1, along ? 0.6 : q[0] + 0.6, trim[0], trim[1], q[1], top + 0.6, q[2]);
if (merlons) {
var n = Math.floor(q[0] / 2.4);
for (var m = 0; m < n; m += 2) {
var u = -q[0] / 2 + (m + 0.5) * q[0] / n;
grBox(B, along ? q[0] / n : 0.7, 0.8, along ? 0.7 : q[0] / n, trim[0], trim[1], along ? u : q[1], top + 1.5, along ? q[2] : u);
}
}
});
},
function (B, w, d, top, S, s, cap) {
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
var x = q[0] * (w / 2), z = q[1] * (d / 2), r = 2.2 * s, th = top + 6 * s;
grCyl(B, r, r * 1.08, th, S.wall[0], S.wall[1], x, th / 2, z, 12);
grCyl(B, r + 0.3, r + 0.3, 0.5, S.trim[0], S.trim[1], x, th, z, 12);
if (cap === "cone")
grCone(B, r + 0.5, 7 * s, S.roof[0], S.roof[1], x, th + 3.5 * s, z, 12);
else if (cap === "crown") {
for (var m = 0; m < 8; m += 2) {
var a = m / 8 * Math.PI * 2;
grBox(B, 1, 1, 1, S.trim[0], S.trim[1], x + Math.cos(a) * r, th + 0.8, z + Math.sin(a) * r);
}
}
else
grDome(B, r, S.roof[0], S.roof[1], x, th + 0.2, z, 12);
for (var wv = 0; wv < 2; wv++) {
var win = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.4), grMat(S.glow, null, { glow: true }));
win.position.set(x + q[0] * 0.02, th * 0.55 + wv * 3, z + q[1] * (r + 0.03));
if (q[1] < 0)
win.rotation.y = Math.PI;
B.add(win);
}
});
},
function (B, w, d, y, roof) {
var g = new THREE.CylinderGeometry(0.01, 1, 1, 4, 1);
g.rotateY(Math.PI / 4);
var m = new THREE.Mesh(g, grMat(roof[0], roof[1]));
m.scale.set(w * 0.72, 2.6, d * 0.72);
m.position.set(0, y + 1.3, 0);
B.add(m);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { var t = grCone(B, 0.4, 1.4, roof[0], null, q[0] * w / 2, y + 0.4, q[1] * d / 2, 5); t.rotation.z = q[0] * 0.8; });
},
function (P, R, S) {
var lite = grLite(), rr = wRand(grHash(R.id) + 31), L = grLook(R), A = GR_AT;
if (L.plan === "ring" && R.layout !== "isles") {
var n = lite ? 14 : 28;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + 0.07, rad = 170 + (i % 2) * 14, x = A.plaza.x + Math.cos(a) * rad, z = A.plaza.z + Math.sin(a) * rad;
if (!grFree(x, z, 6))
continue;
grHome(P, R, S, x, z, Math.atan2(A.plaza.x - x, A.plaza.z - z), 1);
}
}
else if (L.plan === "scatter" && R.layout !== "isles") {
var m = lite ? 14 : 30;
for (var j = 0; j < m; j++) {
var at = grFindFree(rr, 6.5, 25, { x: (j % 2 ? 1 : -1) * (40 + rr() * 120), z: 30 + rr() * 220, r0: 0, r1: 30 });
if (!at)
continue;
grHome(P, R, S, at.x, at.z, rr() * Math.PI * 2, 0.8 + rr() * 0.3);
}
}
else {
var rows = [[44, 190, 69, 0], [44, 190, 91, Math.PI], [-100, -44, 69, 0], [-100, -44, 91, Math.PI]];
rows.forEach(function (q) { for (var x = q[0] + 4.5; x < q[1] - 4; x += lite ? 18 : 9)
grHome(P, R, S, x, q[2], q[3], 1); });
}
grSign(P, [(R.homes && R.homes.n) || "The Residential Ward", (R.homes && R.homes.d) || "homes of the realm's people"], L.plan === "ring" ? A.plaza.x + GR_RING.road + 10 : 40, 2.2, L.plan === "ring" ? A.plaza.z + 14 : 80, Math.PI / 2, 3.6, 1);
},
function (G, P, R, S) {
var A = GR_AT.arena, nm = (R.arena && R.arena.n) || "The Training Ground";
var x = A.x, z = A.z, w = A.w, d = A.d;
grBox(P, w, 0.1, d, S.k === "station" ? 0x6A7078 : (grLook(R).sand || 0xC8B48A), S.k === "station" ? "concrete" : "sand", x, 0.03, z);
if (R.layout === "isles")
GR.isles.push({ x0: x - w / 2 - 4, x1: x + w / 2 + 4, z0: z - d / 2 - 4, z1: z + d / 2 + 4 });
[[x, z - d / 2, w, 0], [x, z + d / 2, w, 0]].forEach(function (q) { grBox(P, q[2], 1.4, 0.8, S.trim[0], S.trim[1], q[0], 0.7, q[1]); GR.solids.push({ x: q[0], z: q[1], hw: q[2] / 2, hd: 0.5 }); });
grBox(P, 0.8, 1.4, d, S.trim[0], S.trim[1], x - w / 2, 0.7, z);
GR.solids.push({ x: x - w / 2, z: z, hw: 0.5, hd: d / 2 });
[[x + w / 2, z - d / 2 + (d / 2 - 7) / 2 + 0.0, (d / 2 - 7)], [x + w / 2, z + d / 2 - (d / 2 - 7) / 2, (d / 2 - 7)]].forEach(function (q) { grBox(P, 0.8, 1.4, q[2], S.trim[0], S.trim[1], q[0], 0.7, q[1]); GR.solids.push({ x: q[0], z: q[1], hw: 0.5, hd: q[2] / 2 }); });
[-1, 1].forEach(function (sd) {
for (var t = 0; t < 4; t++) {
grBox(P, w - 6, 0.6, 1.6, S.wall[0], S.wall[1], x, 1.4 + t * 0.9, z + sd * (d / 2 + 1.6 + t * 1.6));
}
GR.solids.push({ x: x, z: z + sd * (d / 2 + 4), hw: (w - 6) / 2, hd: 3.4 });
});
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, px = x + Math.cos(a) * w * 0.34, pz = z + Math.sin(a) * d * 0.32;
grCyl(P, 0.18, 0.22, 2, 0x6A4A2E, "wood", px, 1, pz, 8);
grBox(P, 1, 1, 0.2, 0xD8D0B8, "wood", px, 1.8, pz);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), new THREE.MeshBasicMaterial({ color: 0x4A4A4A }));
cap.position.set(px, 2.5, pz);
cap.userData.grKeep = 1;
G.add(cap);
GR.drillPosts.push({ x: px, z: pz, cap: cap });
GR.solids.push({ x: px, z: pz, r: 0.3 });
}
grKit(P, "weaponrack", x - w / 2 + 2, 0, z - 6, Math.PI / 2, 1);
grKit(P, "weaponrack", x - w / 2 + 2, 0, z + 6, Math.PI / 2, 1);
grKit(P, "armorstand", x - w / 2 + 2, 0, z, Math.PI / 2, 1);
grSign(P, [nm, (R.arena && R.arena.d) || "Run the drill: press E at the board"], x + w / 2 + 3, 2.4, z - 8, Math.PI / 2, 3.6, 1);
GR.spots.push({ x: x + w / 2 + 2, z: z - 8, r: 3, label: "<b>" + esc(nm) + "</b> · <b>press E</b> to run the drill", fn: function () { grDrillCard(); } });
},
function (G, P, R, S) {
var T = GR_AT.tunnel, k = (R.tunnel && R.tunnel.kind) || "tunnel", nm = (R.tunnel && R.tunnel.n) || "The Deep Road", len = T.x1 - T.x0, cx = (T.x0 + T.x1) / 2, E = R.env || {};
var hw = T.w / 2;
if (k === "tunnel") {
var rock = E.rock || E.mtn || 0x5A544C, top = R.layout === "cavern" ? (E.roof || 70) : 34, rtx = E.mtnTex || "stone", rk = wRand(grHash(R.id) + 61);
[[GR_AT.bound.z0, T.z - hw], [T.z + hw, GR_AT.bound.z1]].forEach(function (q) {
var dz = q[1] - q[0];
grBox(P, len, top, dz, rock, rtx, cx, top / 2, (q[0] + q[1]) / 2);
GR.solids.push({ x: cx, z: (q[0] + q[1]) / 2, hw: len / 2, hd: dz / 2 });
if (R.layout !== "cavern")
for (var c = 0; c < (grLite() ? 8 : 18); c++) {
var ex = T.x0 + rk() * len, ez = q[0] + rk() * dz, es = 8 + rk() * 14;
var m = grMesh(grRockGeo(c), grMat(grTint(rock, R.id + c, 0.1), rtx), ex, top - 2 + rk() * 6, ez, P);
m.scale.set(es, es * (0.6 + rk() * 0.8), es);
m.rotation.set(rk(), rk() * 6, rk());
}
[T.x0, T.x1].forEach(function (fx2) {
for (var c2 = 0; c2 < (grLite() ? 3 : 6); c2++) {
var ez2 = q[0] + rk() * dz;
if (Math.abs(ez2 - T.z) < hw + 8)
continue;
var es2 = 5 + rk() * 9;
var m2 = grMesh(grRockGeo(c2 + 3), grMat(grTint(rock, R.id + "f" + c2, 0.1), rtx), fx2, es2 * 0.5 + rk() * top * 0.6, ez2, P);
m2.scale.set(es2, es2, es2);
m2.rotation.set(rk(), rk() * 6, rk());
}
});
});
grBox(P, len, top - 6.5, T.w + 0.4, rock, "stone", cx, 6.5 + (top - 6.5) / 2, T.z);
[T.x0, T.x1].forEach(function (px, i) {
var face = i ? 1 : -1;
grBox(P, 1.6, 8, T.w + 3, S.trim[0], S.trim[1], px + face * 0.6, 4, T.z - 0);
grBox(P, 1.8, 1.6, T.w + 4, S.trim[0], S.trim[1], px + face * 0.6, 7.4, T.z);
grSign(P, [i ? (R.deep && R.deep.n) || "The Deep" : R.name, nm], px + face * 1.5, 9.2, T.z, face > 0 ? Math.PI / 2 : -Math.PI / 2, 6, 1.2);
});
grBox(P, len, 0.12, T.w, S.pave[0], S.pave[1], cx, 0.02, T.z);
[-1, 1].forEach(function (sd) { grBox(P, len, 6.4, 0.4, S.trim[0], S.trim[1], cx, 3.2, T.z + sd * (hw + 0.1)); });
for (var lx = T.x0 + 6; lx < T.x1; lx += 10) {
[-1, 1].forEach(function (sd) { grBox(P, 0.3, 0.5, 0.3, S.glow, null, lx, 4.4, T.z + sd * (hw - 0.3), 0, { glow: true }); });
if (!grLite())
grGlow(P, S.glow, 3, 0.22, lx, 4.4, T.z);
}
}
else if (k === "tube") {
grBox(P, len, 0.3, T.w, S.pave[0], S.pave[1], cx, 0.05, T.z);
var tb = new THREE.Mesh(new THREE.CylinderGeometry(hw + 0.6, hw + 0.6, len, 20, 1, true, 0, Math.PI), grMat(0xBFE0FF, null, { op: 0.18, ds: true }));
tb.rotation.z = Math.PI / 2;
tb.rotation.y = Math.PI / 2;
tb.position.set(cx, 0.1, T.z);
tb.rotation.set(0, 0, Math.PI / 2);
P.add(tb);
for (var rx = T.x0; rx <= T.x1; rx += 8) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(hw + 0.6, 0.18, 4, 20, Math.PI), grMat(S.trim[0], "metal"));
ring.rotation.y = Math.PI / 2;
ring.position.set(rx, 0.1, T.z);
P.add(ring);
}
for (var lx2 = T.x0 + 4; lx2 < T.x1; lx2 += 12)
grBox(P, 0.4, 0.1, T.w - 1, S.glow, null, lx2, 0.2, T.z, 0, { glow: true });
[-1, 1].forEach(function (sd) { GR.solids.push({ x: cx, z: T.z + sd * (hw + 0.6), hw: len / 2, hd: 0.3 }); });
if (R.layout === "isles")
GR.isles.push({ x0: T.x0 - 6, x1: T.x1 + 6, z0: T.z - hw, z1: T.z + hw });
grSign(P, [nm, "to " + ((R.deep && R.deep.n) || "the far district")], T.x0 - 3, 3.4, T.z + hw + 1.2, -Math.PI / 2, 4.4, 1.1);
}
else {
grBox(P, len, 0.8, T.w, S.trim[0], S.trim[1], cx, -0.35, T.z);
[-1, 1].forEach(function (sd) { grBox(P, len, 1.1, 0.25, S.trim[0], "metal", cx, 0.55, T.z + sd * hw); GR.solids.push({ x: cx, z: T.z + sd * (hw + 0.2), hw: len / 2, hd: 0.3 }); });
for (var bx = T.x0; bx <= T.x1; bx += 13) {
grCyl(P, 0.6, 0.8, 40, S.trim[0], S.trim[1], bx, -20.5, T.z, 8);
if (S.lamp)
grLamp(P, S, bx, T.z + hw - 0.6, R);
}
GR.isles.push({ x0: T.x0 - 6, x1: T.x1 + 6, z0: T.z - hw, z1: T.z + hw });
grSign(P, [nm, "to " + ((R.deep && R.deep.n) || "the far district")], T.x0 - 3, 3.4, T.z + hw + 1.2, -Math.PI / 2, 4.4, 1.1);
}
},
function (G, P, R, S) {
var D = GR_AT.deep, Dd = R.deep || {}, lite = grLite();
grPaveDisc(P, R, S, D.x, D.z, D.r, 0.03);
if (R.layout === "isles") {
GR.isles.push({ x: D.x, z: D.z, r: D.r + 2 });
}
if (Dd.heart) {
var bk = Object.assign({}, R, { plaza: { heart: Dd.heart, n: Dd.n, d: Dd.d } });
var save = GR_AT.plaza;
GR_AT.plaza = { x: D.x, z: D.z, r: D.r };
try {
grPlazaHeart(P, bk, S);
}
finally {
GR_AT.plaza = save;
}
}
(Dd.b || []).forEach(function (b, i) {
var q = GR_DEEP_AT[i];
if (!q)
return;
var st = grSite(G, P, R, S, b, q[0], q[1], q[2], "d" + i);
if (R.layout === "isles") {
GR.isles.push(grIsleFor(q[0], q[1], (GR_TYPE[b.t] || GR_TYPE.hall).size[0], (GR_TYPE[b.t] || GR_TYPE.hall).size[2], q[2], 8));
var dx = st.door.x, dz = st.door.z, L2 = Math.hypot(D.x - dx, D.z - dz);
for (var t = 0; t < L2; t += 3)
GR.isles.push({ x: dx + (D.x - dx) * t / L2, z: dz + (D.z - dz) * t / L2, r: 3.4 });
if (L2 > D.r)
grBox(P, 6, 0.5, L2 - D.r + 2, S.trim[0], S.trim[1], dx + (D.x - dx) * ((L2 - D.r) / 2) / L2, -0.24, dz + (D.z - dz) * ((L2 - D.r) / 2) / L2, Math.atan2(D.x - dx, D.z - dz));
}
});
(Dd.gather || []).forEach(function (g, i) {
var an = (i + 0.5) / (Dd.gather.length) * Math.PI * 1.5 - Math.PI * 0.25, x = D.x + Math.cos(an) * (D.r - 9), z = D.z + Math.sin(an) * (D.r - 9);
if (g.at) {
x = g.at[0];
z = g.at[1];
}
var look = grGatherLook(P, g.look || "ore", x, z, S);
var id = "gr_" + R.id + "_" + i, sp = { id: id, x: x, z: z, kind: g.k, name: g.n, verb: g.v || "gather", look: look };
var gl = wGlow(0x9AD8FF, 3, 0.22);
gl.position.set(x, 1.4, z);
gl.userData.grKeep = 1;
G.add(gl);
sp.glow = gl;
GR.gathers = GR.gathers || [];
GR.gathers.push(sp);
GR.spots.push({ x: x, z: z, r: 2.8, label: "<b>" + esc(g.n) + "</b> · <b>press E</b> to " + esc(sp.verb), fn: function () { grGather(sp); } });
});
if (!Dd.heart)
grSign(P, [Dd.n || "The Far District", Dd.d || ""], D.x - D.r + 4, 2.4, D.z + 12, Math.PI / 2, 4, 1.1);
},
function (P, look, x, z, S) {
var r = wRand(grHash(look + x + z));
if (look === "ore" || look === "coal") {
var col = look === "coal" ? 0x2A2826 : 0x6A5A4A;
for (var i = 0; i < 5; i++) {
var m = grMesh(new THREE.DodecahedronGeometry(0.5 + r() * 0.6, 0), grMat(col, "stone"), x + (r() - 0.5) * 2, 0.35, z + (r() - 0.5) * 2, P);
m.rotation.set(r() * 3, r() * 3, 0);
}
if (look === "ore")
for (var j = 0; j < 4; j++)
grSph(P, 0.14, 0xC8A040, null, x + (r() - 0.5) * 1.6, 0.7 + r() * 0.4, z + (r() - 0.5) * 1.6, 6);
grKit(P, "minecart", x + 1.8, 0, z, 0.4, 0.8);
}
else if (look === "crystal") {
for (var c = 0; c < 6; c++) {
var cr = grCyl(P, 0.05, 0.3, 1 + r() * 1.6, S.glow, null, x + (r() - 0.5) * 1.4, 0.6, z + (r() - 0.5) * 1.4, 6, { op: 0.9 });
cr.rotation.set((r() - 0.5) * 0.6, r() * 3, (r() - 0.5) * 0.6);
}
}
else if (look === "crop") {
for (var k = 0; k < 12; k++)
grCyl(P, 0.03, 0.05, 0.9, 0x8AA84A, null, x + (k % 4 - 1.5) * 0.6, 0.45, z + (Math.floor(k / 4) - 1) * 0.6, 4);
grBox(P, 2.6, 0.2, 2, 0x5A3E28, "earth", x, 0.1, z);
}
else if (look === "wood") {
for (var l = 0; l < 3; l++) {
var lg = grCyl(P, 0.25, 0.28, 2.6, 0x6A4A2E, "bark", x, 0.3 + l * 0.45, z + (l - 1) * 0.3, 8);
lg.rotation.z = Math.PI / 2;
}
}
else if (look === "fish") {
grBox(P, 2.4, 0.2, 1.4, 0x6A4A2E, "wood", x, 0.4, z);
for (var f = 0; f < 4; f++)
grSph(P, 0.18, 0x9AB8C8, null, x - 0.8 + f * 0.5, 0.6, z, 6);
grCyl(P, 0.4, 0.35, 0.7, 0x6A4A2E, "wood", x + 1.6, 0.35, z, 8);
}
else if (look === "ice") {
for (var q = 0; q < 4; q++) {
var ic = grBox(P, 0.8 + r() * 0.6, 0.8 + r(), 0.7, 0xD8E8F4, "marble", x + (r() - 0.5) * 1.6, 0.5, z + (r() - 0.5) * 1.6);
ic.rotation.y = r() * 3;
}
}
else if (look === "gas") {
grCyl(P, 0.5, 0.6, 1.2, 0x8A919C, "metal", x, 0.6, z, 12);
grCyl(P, 0.35, 0.35, 0.3, S.accent, null, x, 1.35, z, 12);
grBox(P, 0.6, 0.4, 0.05, 0x5AE07A, null, x, 0.8, z - 0.52, 0, { glow: true });
}
else if (look === "herb") {
for (var hh = 0; hh < 9; hh++)
grSph(P, 0.3, 0x5A8A4A, null, x + (hh % 3 - 1) * 0.7, 0.25, z + (Math.floor(hh / 3) - 1) * 0.7, 7);
grBox(P, 2.4, 0.3, 2.4, 0x6A4A2E, "wood", x, 0.15, z);
}
else {
grSph(P, 0.5, 0x8A8070, "stone", x, 0.3, z, 7);
}
return null;
},
function (G, P, R, S) {
var g = GR_AT.gate, x = g.x, z = g.z;
var tc = S.trim[0], tt = S.trim[1], wc = S.wall[0], wt = S.wall[1], lite = grLite();
[-1, 1].forEach(function (sd) {
var px = x + sd * 6;
grBox(P, 3.6, 1.2, 4, tc, tt, px, 0.6, z);
grBox(P, 3, 11.8, 3.4, wc, wt, px, 7.1, z);
grBox(P, 3.3, 0.5, 3.7, tc, tt, px, 8, z);
[-1, 1].forEach(function (fz) {
[-1, 1].forEach(function (cx) {
var X = px + cx * 1.05, Z = z + fz * 1.8;
grBox(P, 0.9, 0.5, 0.9, tc, tt, X, 1.45, Z);
grCyl(P, 0.36, 0.42, 10.2, tc, tt, X, 6.8, Z, lite ? 8 : 14);
grBox(P, 0.95, 0.45, 0.95, tc, tt, X, 12.1, Z);
});
grSph(P, 0.38, S.glow, null, px - sd * 1.9, 5.2, z + fz * 1.95, 8, { glow: true });
grBox(P, 0.2, 0.9, 0.2, tc, "metal", px - sd * 1.9, 4.6, z + fz * 1.85);
});
GR.solids.push({ x: px, z: z, hw: 1.4, hd: 1.4 });
});
var sh = new THREE.Shape();
sh.moveTo(-4.5, 8);
sh.lineTo(-4.5, 13.2);
sh.lineTo(4.5, 13.2);
sh.lineTo(4.5, 8);
sh.absarc(0, 8, 4.5, 0, Math.PI, false);
var sp = new THREE.ExtrudeGeometry(sh, { depth: 3.2, bevelEnabled: false, curveSegments: lite ? 10 : 20 });
sp.translate(0, 0, -1.6);
grMesh(sp, grMat(wc, wt), x, 0, z, P);
var arc = new THREE.Mesh(new THREE.TorusGeometry(4.75, 0.32, 8, lite ? 16 : 28, Math.PI), grMat(tc, tt));
[-1.62, 1.62].forEach(function (fz) { var a2 = arc.clone(); a2.position.set(x, 8, z + fz); P.add(a2); });
grBox(P, 1, 1.3, 3.5, tc, tt, x, 12.75, z);
grBox(P, 15.4, 1.2, 3.8, tc, tt, x, 13.8, z);
grBox(P, 16.2, 0.5, 4.4, tc, tt, x, 14.65, z);
grBox(P, 10.4, 2.6, 3.2, wc, wt, x, 16.2, z);
grBox(P, 11, 0.4, 3.6, tc, tt, x, 17.7, z);
var veil = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 10), new THREE.MeshBasicMaterial({ color: R.gateCol || S.glow, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide }));
veil.position.set(x, 5, z);
veil.userData.grKeep = 1;
G.add(veil);
GR.veil = veil;
grSign(P, [R.name, "the way back: press E"], x, 16.2, z - 1.65, Math.PI, 8.4, 1.6);
GR.solids.push({ x: x, z: z + 1.2, hw: 5, hd: 0.4 });
GR.spots.push({ x: x, z: z - 3, r: 3.4, label: "<b>" + esc(R.gate && R.gate.back || "The way back") + "</b> · <b>press E</b> to go back to " + esc(R.parentName || "the world outside"), fn: function () { grLeave(); } });
if (R.warden) {
var w = R.warden;
grPersonAt(G, R, { n: w[0], t: w[1], who: w[2] || "the warden of the gate, who welcomes visitors and knows the realm well" }, x + 5, z - 6, Math.PI * 0.85, true);
}
},
function (P, R, S) {
var at = [[-12, 236], [12, 180], [-12, 118], [12, 30], [-12, -40], [-16, -175]];
(R.lore || []).forEach(function (L, i) {
var q = at[i % at.length];
if (i >= at.length)
return;
var y = i === 5 ? GR_AT.terr[1].h : 0;
var st = new THREE.Group();
st.position.set(q[0], y, q[1]);
grBox(st, 1.4, 1.8, 0.5, S.trim[0], S.trim[1], 0, 0.9, 0);
grBox(st, 1.6, 0.2, 0.7, S.trim[0], S.trim[1], 0, 1.9, 0);
grBox(st, 1.1, 0.9, 0.06, 0x2A2620, null, 0, 1.15, 0.28);
P.add(st);
GR.solids.push({ x: q[0], z: q[1], hw: 0.8, hd: 0.4 });
GR.spots.push({ x: q[0] + (q[0] < 0 ? 1.6 : -1.6), z: q[1], y: y, r: 2.4, label: "<b>A lore stone</b>: " + esc(L[0]) + " · <b>press E</b> to read it", fn: function () { worldCard(grTitle(esc(L[0])) + "<div style='margin-top:6px'>" + esc(L[1]) + "</div><div style='opacity:.6;font-size:12px;margin-top:8px'>" + esc(R.name) + ": from the realm's chronicle. The library holds the rest.</div>"); } });
});
},
function (site) {
var T = site.T, b = site.b, big = b.big ? 1.2 : 1, W = Math.round(T.inside[0] * big / 2) * 2, D = Math.round(T.inside[1] * big / 2) * 2;
var rooms = (b.rooms || T.rooms).slice(), nl = Math.ceil(rooms.length / 2), nr = rooms.length - nl, hallW = 16, seatD = 12;
var out = { W: W, D: D, hallW: hallW, seatD: seatD, rooms: [] };
function side(list, sgn) {
var n = list.length;
if (!n)
return;
for (var i = 0; i < n; i++) {
var z0 = -D / 2 + i * D / n, z1 = -D / 2 + (i + 1) * D / n, r = list[i];
out.rooms.push({ kind: r[0], name: r[1], badge: !!r[2], x0: sgn < 0 ? -W / 2 : hallW / 2, x1: sgn < 0 ? -hallW / 2 : W / 2, z0: z0, z1: z1, door: sgn < 0 ? "e" : "w" });
}
}
side(rooms.slice(0, nl), -1);
side(rooms.slice(nl), 1);
var seat = b.seat || T.seat;
out.rooms.push({ kind: seat[0], name: seat[1], badge: !!seat[2], x0: -hallW / 2, x1: hallW / 2, z0: -D / 2, z1: -D / 2 + seatD, door: "s", seat: true });
out.hall = { x0: -hallW / 2, x1: hallW / 2, z0: -D / 2 + seatD, z1: D / 2, name: b.hall || T.hall };
return out;
},
function (site, idx) {
var R = GR.R, S = grStyle(R), pl = grPlan(site), lite = grLite();
var X0 = GR_IN_X + idx * GR_IN_STEP, Z0 = 0, W = pl.W, D = pl.D, HH = 9, RH = 4.6;
var I = { site: site, x0: X0 - W / 2, x1: X0 + W / 2, z0: Z0 - D / 2, z1: Z0 + D / 2, y: 0, X0: X0, solids: [], spots: [], people: [], doors: [], rooms: [], plan: pl, g: new THREE.Group() };
var P = new THREE.Group(), G = I.g;
var wallC = R.inWall || new THREE.Color(S.wall[0]).lerp(new THREE.Color(0xF2ECE0), 0.35).getHex(), wallT = R.inWallTex || (S.wall[1] === "metal" ? "metal" : "plaster");
var floorC = S.floor[0], floorT = S.floor[1], trim = S.trim;
grBox(P, W, 0.2, D, floorC, floorT, X0, -0.1, Z0);
[[W, X0, Z0 - D / 2, 0], [W, X0, Z0 + D / 2, 0], [D, X0 - W / 2, Z0, 1], [D, X0 + W / 2, Z0, 1]].forEach(function (q, i) {
if (i === 1) {
[-1, 1].forEach(function (sd) { var len = W / 2 - 2.4; grBox(P, len, HH, 0.4, wallC, wallT, X0 + sd * (2.4 + len / 2), HH / 2, q[2]); I.solids.push({ x: X0 + sd * (2.4 + len / 2), z: q[2], hw: len / 2, hd: 0.3 }); });
grBox(P, 4.8, HH - 4.2, 0.4, wallC, wallT, X0, 4.2 + (HH - 4.2) / 2, q[2]);
grBox(P, 4, 4, 0.12, 0x4A3020, "wood", X0, 2, q[2] - 0.05);
return;
}
grBox(P, q[3] ? 0.4 : q[0], HH, q[3] ? q[0] : 0.4, wallC, wallT, q[1], HH / 2, q[2]);
});
grBox(P, pl.hallW, 0.3, pl.hall.z1 - pl.hall.z0, 0xE8E0D0, "plaster", X0, HH + 0.15, Z0 + (pl.hall.z0 + pl.hall.z1) / 2);
for (var cz = pl.hall.z0 + 4; cz < pl.hall.z1 - 3; cz += 6) {
[-1, 1].forEach(function (sd) { grCyl(P, 0.45, 0.55, HH, trim[0], "marble", X0 + sd * (pl.hallW / 2 - 1.6), HH / 2, Z0 + cz, 12); grBox(P, 1.3, 0.4, 1.3, trim[0], trim[1], X0 + sd * (pl.hallW / 2 - 1.6), 0.2, Z0 + cz); I.solids.push({ x: X0 + sd * (pl.hallW / 2 - 1.6), z: Z0 + cz, r: 0.55 }); });
}
grBox(P, 3, 0.03, pl.hall.z1 - pl.hall.z0 - 2, new THREE.Color(S.accent).multiplyScalar(0.6).getHex(), null, X0, 0.02, Z0 + (pl.hall.z0 + pl.hall.z1) / 2);
for (var hz = pl.hall.z0 + 6; hz < pl.hall.z1 - 2; hz += 12) {
grFurn(P, "ironchandelier", X0, HH - 3.2 - 0.4, Z0 + hz) || grFurn(P, "chandelier", X0, HH - 3.2, Z0 + hz);
if (!lite)
grGlow(P, S.glow, 5, 0.18, X0, HH - 1.6, Z0 + hz);
}
for (var bz = pl.hall.z0 + 3; bz < pl.hall.z1 - 3; bz += 9) {
[-1, 1].forEach(function (sd) { grBox(P, 0.05, 3.6, 1.4, S.accent, null, X0 + sd * (pl.hallW / 2 - 0.25), HH - 3, Z0 + bz); });
}
grSign(P, [site.b.n, pl.hall.name], X0, HH - 2.2, Z0 + D / 2 - 0.4, Math.PI, 6, 1.2);
grFurn(P, "desk", X0 - pl.hallW / 2 + 2.4, 0, Z0 + D / 2 - 4, Math.PI / 2);
grFurn(P, "chair", X0 - pl.hallW / 2 + 1.4, 0, Z0 + D / 2 - 4, Math.PI / 2);
grSign(P, ["📋 Hiring here", R.name], X0 - pl.hallW / 2 + 0.5, 2.2, Z0 + D / 2 - 4, Math.PI / 2, 2, 0.7, "#1A2A1A", "#D8F0C0");
I.solids.push({ x: X0 - pl.hallW / 2 + 2.4, z: Z0 + D / 2 - 4, hw: 0.5, hd: 0.9 });
var wk = grWorkplace(R, site.b);
I.spots.push({ x: X0 - pl.hallW / 2 + 3.6, z: Z0 + D / 2 - 4, r: 2.4, label: "<b>📋 Hiring here</b> · " + esc(site.b.n) + " · <b>press E</b> for the posts", fn: function () { if (typeof ahOpen === "function")
ahOpen(wk);
else
grSay("The hiring desk opens soon."); } });
I.spots.push({ x: X0, z: Z0 + D / 2 - 1.6, r: 2.4, label: "<b>The door</b> · <b>press E</b> to go out", fn: function () { grExit(); } });
pl.rooms.forEach(function (r) { grRoomBuild(P, G, I, R, S, r, X0, Z0, RH, HH, wallC, wallT); });
try {
grDressHall(P, I, S, pl, X0, Z0, W, D, HH, RH, wallT);
}
catch (e) {
if (window.console)
console.warn("[grand] hall dress", e);
}
G.add(grBake(P));
try {
var pics = grPicMesh(I.pics || []);
if (pics)
G.add(pics);
}
catch (e) { }
grStaffPlace(G, I, R, site);
grFeatures(G, I, R, site);
return I;
},
function (P, G, I, R, S, r, X0, Z0, RH, HH, wallC, wallT) {
var x0 = X0 + r.x0, x1 = X0 + r.x1, z0 = Z0 + r.z0, z1 = Z0 + r.z1, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0, DW = 2;
var room = { name: r.name, kind: r.kind, badge: r.badge, x0: x0, x1: x1, z0: z0, z1: z1, seat: !!r.seat };
I.rooms.push(room);
grBox(P, w, 0.25, d, 0xEEE8DC, "plaster", cx, RH + 0.12, cz);
grBox(P, w, HH - RH - 0.25, d, wallC, wallT, cx, RH + 0.25 + (HH - RH - 0.25) / 2, cz);
var along = r.door === "s", wx = r.door === "e" ? x1 : r.door === "w" ? x0 : cx, wz = along ? z1 : cz, len = along ? w : d;
[-1, 1].forEach(function (sd) {
var l = len / 2 - DW / 2;
if (l < 0.2)
return;
var px = along ? cx + sd * (DW / 2 + l / 2) : wx, pz = along ? wz : cz + sd * (DW / 2 + l / 2);
grBox(P, along ? l : 0.3, RH, along ? 0.3 : l, wallC, wallT, px, RH / 2, pz);
I.solids.push({ x: px, z: pz, hw: along ? l / 2 : 0.2, hd: along ? 0.2 : l / 2 });
});
grBox(P, along ? DW : 0.3, RH - 2.6, along ? 0.3 : DW, wallC, wallT, along ? cx : wx, 2.6 + (RH - 2.6) / 2, along ? wz : cz);
if (!along) {
grBox(P, w, RH, 0.3, wallC, wallT, cx, RH / 2, z0);
I.solids.push({ x: cx, z: z0, hw: w / 2, hd: 0.2 });
}
else {
[x0, x1].forEach(function (xx) { grBox(P, 0.3, RH, d, wallC, wallT, xx, RH / 2, cz); I.solids.push({ x: xx, z: cz, hw: 0.2, hd: d / 2 }); });
}
[[w, cx, z0 + 0.17, 0], [d, x0 + 0.17, cz, 1], [d, x1 - 0.17, cz, 1]].forEach(function (q) { grBox(P, q[3] ? 0.06 : q[0] - 0.4, 0.9, q[3] ? q[0] - 0.4 : 0.06, new THREE.Color(wallC).multiplyScalar(0.86).getHex(), wallT, q[1], 0.45, q[2]); });
var dx = along ? cx : wx, dz = along ? wz : cz;
[-1, 1].forEach(function (sd) {
var t = wSign([r.name + (r.badge ? " · staff" : "")], 2.6, 0.4, "#1A1612", r.badge ? "#E8C27A" : "#E8E0C8");
t.position.set(dx + (along ? 0 : sd * 0.18), 2.95, dz + (along ? sd * 0.18 : 0));
t.rotation.y = along ? (sd > 0 ? 0 : Math.PI) : (sd > 0 ? Math.PI / 2 : -Math.PI / 2);
t.userData.grKeep = 1;
P.add(t);
});
if (r.badge) {
var leaf = new THREE.Mesh(new THREE.BoxGeometry(along ? DW : 0.12, 2.6, along ? 0.12 : DW), new THREE.MeshLambertMaterial({ color: 0x4A3A2A }));
leaf.position.set(dx, 1.3, dz);
G.add(leaf);
var lamp = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.22), new THREE.MeshBasicMaterial({ color: 0xD8A040 }));
lamp.position.set(dx + (along ? 0.8 : 0), 2.75, dz + (along ? 0 : 0.8));
G.add(lamp);
var sol = { x: dx, z: dz, hw: along ? DW / 2 : 0.12, hd: along ? 0.12 : DW / 2 };
I.solids.push(sol);
I.doors.push({ x: dx, z: dz, leaf: leaf, sol: sol, open: 0, lamp: lamp, room: room });
}
if (!grLite())
grGlow(P, S.glow, 4, 0.16, cx, RH - 0.6, cz);
try {
grDressRoom(P, G, I, S, r, I.plan, X0, Z0, RH, wallT);
}
catch (e) {
if (window.console)
console.warn("[grand] room dress", e);
}
grFurnish(P, I, R, r, x0, x1, z0, z1, RH);
},
function (P, I, R, r, x0, x1, z0, z1, RH) {
var K = GR_ROOM[r.kind] || GR_ROOM.office, door = r.door;
var V = door === "e" ? [-1, 0] : door === "w" ? [1, 0] : [0, -1], U = [-V[1], V[0]];
var C = door === "e" ? [x1, (z0 + z1) / 2] : door === "w" ? [x0, (z0 + z1) / 2] : [(x0 + x1) / 2, z1];
var depth = door === "s" ? z1 - z0 : x1 - x0, width = door === "s" ? x1 - x0 : z1 - z0;
function at(u, v) { return [C[0] + u * U[0] + v * V[0], C[1] + u * U[1] + v * V[1]]; }
function face(f) { return Math.atan2(f[0], f[1]); }
var toDoor = [-V[0], -V[1]], toBack = V;
var LT = grLite();
function put(name, u, v, dir, y, solid) {
var p = at(u, v), ry = face(dir), m;
if (LT) {
if (name === "feasttable")
name = "longtable";
if (name === "wallsconce")
return null;
if (name === "chandelier" || name === "ironchandelier") {
grCyl(P, 0.7, 0.5, 0.25, 0xE8D8B0, null, p[0], RH - 0.2, p[1], 10, { glow: true });
return null;
}
}
if (/K$/.test(name))
m = grKit(P, name.slice(0, -1), p[0], y || 0, p[1], ry, 0.6);
else
m = grFurn(P, name, p[0], y || 0, p[1], ry);
if (m && solid !== false && typeof SOLIDFURN !== "undefined" && SOLIDFURN[name])
I.solids.push({ x: p[0], z: p[1], r: 0.7 });
return m;
}
(K.back || []).forEach(function (n, i) { put(n, (i - (K.back.length - 1) / 2) * 3, depth - 1.4, toDoor); });
var wl = K.wall || [], slots = [];
var sideN = Math.max(1, Math.floor((depth - 3) / 2.6));
for (var s = 0; s < sideN; s++) {
var v = 2.6 + s * (depth - 4.2) / Math.max(1, sideN - 1 || 1);
slots.push([-(width / 2 - 0.7), v, U]);
slots.push([width / 2 - 0.7, v, [-U[0], -U[1]]]);
}
[-1, 1].forEach(function (sd) { for (var bu = 3.2; bu < width / 2 - 1; bu += 2.8)
slots.push([sd * bu, depth - 0.7, toDoor]); });
var lite = grLite();
if (wl.length)
slots.forEach(function (q, i) { if (lite && i >= wl.length && i % 2)
return; put(wl[i % wl.length], q[0], q[1], q[2]); });
if (depth > 6)
for (var sv = 4; sv < depth - 1; sv += 5) {
[-1, 1].forEach(function (sd) { put("wallsconce", sd * (width / 2 - 0.08), sv, sd > 0 ? [-U[0], -U[1]] : U, 2.4, false); });
}
var mid = K.mid || [];
if (mid.length && !K.grid) {
var want = Math.max(mid.length, Math.floor((depth - 2) / 4.5));
var mm = [];
for (var mi = 0; mi < want; mi++)
mm.push(mid[mi % mid.length]);
mid = mm;
}
mid.forEach(function (n, i) {
var v = depth * (i + 1) / (mid.length + 1);
put(n, 0, v, toBack);
if (K.around) {
[-1, 1].forEach(function (sd) { for (var k = -1; k <= 1; k++) {
if (grLite() && k)
continue;
put(K.around, sd * 1.1, v + k * 0.9, [sd > 0 ? -U[0] : U[0], sd > 0 ? -U[1] : U[1]], 0, false);
} });
}
});
if (K.grid) {
var g = K.grid, du = g[1] * (grLite() ? 1.4 : 1), dv = g[2] * (grLite() ? 1.3 : 1);
for (var gv = 2.8; gv < depth - 2.6; gv += dv)
for (var gu = -width / 2 + 1.8; gu <= width / 2 - 1.8; gu += du) {
if (Math.abs(gu) < 1 && gv < 4)
continue;
put(g[0], gu, gv, toBack, 0, true);
}
}
(grLite() ? (K.hang || []).slice(0, 1) : (K.hang || [])).forEach(function (n, i, arr) { var v = depth * (i + 1) / ((arr.length) + 1); put(n, 0, v, toBack, RH - 3.2 - (n === "ironchandelier" ? 0.4 : 0), false); });
},
function (G, I, R, site) {
var b = site.b, T = site.T, max = grLite() ? 3 : 6, list = (b.staff || []).slice(), names = R.names || ["Ash", "Briar", "Cole", "Dara", "Ennis", "Fen", "Gale", "Hollis", "Ivo", "Juno", "Kit", "Lark"];
var rr = wRand(grHash(R.id + b.n));
var seat = I.rooms.filter(function (r) { return r.seat; })[0], staffed = I.rooms.filter(function (r) { return !r.seat && GR_ROOMWHO[r.kind]; });
var spots = [];
if (seat)
spots.push({ room: seat, head: true });
staffed.forEach(function (r) { spots.push({ room: r }); });
var n = Math.min(max, spots.length);
for (var i = 0; i < n; i++) {
var sp = spots[i], who = list[i] || [names[(grHash(b.n) + i * 7) % names.length] + " " + (R.surnames ? R.surnames[(grHash(b.n) + i * 3) % R.surnames.length] : ""), (sp.head ? (T.jobs && T.jobs[0] ? T.jobs[0][0] : "Head of the house") : (GR_ROOMWHO[sp.room.kind] || "Clerk"))];
var r = sp.room, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
var px = cx, pz = cz;
if (r.seat) {
pz = r.z0 + 3.4;
}
else if (r.x0 < I.X0) {
px = cx - ((r.x1 - r.x0) * 0.18);
}
else
px = cx + ((r.x1 - r.x0) * 0.18);
grPersonAt(G, R, { n: who[0].trim(), t: who[1], who: who[2], place: b.n, room: r.name }, px, pz, Math.atan2((I.X0) - px, ((r.z0 + r.z1) / 2 + (r.seat ? 6 : 0)) - pz), false, I);
}
grPersonAt(G, R, { n: names[(grHash(b.n) + 5) % names.length] + (R.surnames ? " " + R.surnames[(grHash(b.n) + 11) % R.surnames.length] : ""), t: "Porter", who: "the porter at the door of " + b.n + ", who keeps the hiring desk and knows every room of the building", place: b.n }, I.X0 - I.plan.hallW / 2 + 1.4, I.z1 - 5.4, Math.PI / 2, false, I);
},
function (G, R, o, x, z, ry, outdoor, I) {
var title = o.t || "Citizen";
var g = wPerson("gr_" + R.id + "_" + grHash(o.n + title), { title: title, place: o.place || R.name, look: R.look || null, species: R.species || undefined });
var y = outdoor ? grGround(x, z, 0) : 0;
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
var persona = "You are " + o.n + ", " + title.toLowerCase() + (o.place ? " at " + o.place : "") + " in " + R.name + ", the heart of " + (R.parentName || "this world") + " in SomnuMatrix. " +
(o.who ? "You are " + o.who + ". " : "") + (R.persona || "") + " " + (R.blurb ? "About this place: " + R.blurb + " " : "") +
"Stay in character, speak warmly and briefly, keep it suitable for all ages, and only promise what can really happen here: you can tell people about the realm, its history and its buildings, point the way, and tell them that posts here are taken at the hiring desk by the door of each building. Never promise gold, items or favours.";
var who = { g: g, name: o.n, title: title, x: x, z: z, talk: { name: o.n, title: title, persona: persona, greet: o.greet || ("Welcome to " + (o.place || R.name) + ".") } };
(I ? I.people : GR.people).push(who);
(I ? I.spots : GR.spots).push({ x: x, z: z, r: 2.4, person: who, label: "<b>💬 " + esc(o.n) + "</b> · " + esc(title) + " · <b>press E</b> to talk", fn: function () { wTalk(who.talk); } });
return who;
},
function (G, R) {
var n = grLite() ? 3 : 7, names = R.names || ["Ash", "Briar", "Cole", "Dara"], rr = wRand(grHash(R.id) + 77);
for (var i = 0; i < n; i++) {
var x = (rr() - 0.5) * 14, z = 230 - i * 36 - rr() * 10;
if (Math.abs(z - 80) < 40)
x = (rr() < 0.5 ? -1 : 1) * (20 + rr() * 10);
var p = grPersonAt(G, R, { n: names[(i * 5 + 3) % names.length] + (R.surnames ? " " + R.surnames[(i * 7 + 1) % R.surnames.length] : ""), t: (R.citizenTitles || ["Citizen", "Traveller", "Merchant", "Scholar", "Guard"])[i % ((R.citizenTitles || [0, 0, 0, 0, 0]).length)] }, x, z, rr() * 6, true);
p.walk = true;
}
[-1, 1].forEach(function (sd, i) { grPersonAt(G, R, { n: names[(i * 3 + 9) % names.length] + (R.surnames ? " " + R.surnames[(i * 5 + 2) % R.surnames.length] : ""), t: R.guardTitle || "Guard of the seat", who: "one of the guards at the foot of the grand stair up to " + ((R.palace && R.palace.n) || "the seat of power") }, sd * 12.5, -104, Math.PI, true); });
},
function (site) {
var idx = GR.sites.indexOf(site);
if (idx < 0)
return;
var R = GR.R, W = WORLDS[R.key];
if (!site.I) {
try {
site.I = grInsideBuild(site, idx);
W.g.add(site.I.g);
}
catch (e) {
if (window.console)
console.warn("[grand] inside", site.b.n, e);
grSay("The doors of " + esc(site.b.n) + " are being set right. Try again in a moment.");
return;
}
}
site.I.g.visible = true;
site.I.g.userData.grIn = true;
GR.inside = site.I;
GR.hid = [];
W.g.children.forEach(function (c) { if (!c.userData.grIn && c.visible) {
c.visible = false;
GR.hid.push(c);
} });
camera.position.set(W.base + site.I.X0, 1.72, site.I.z1 - 3);
yaw = 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
grTone(392, 0.2);
grSay("<b>" + esc(site.b.n) + ".</b> " + esc(site.I.plan.hall.name) + (site.b.d ? ": " + esc(site.b.d) + "." : ".") + " Rooms open off both sides of the hall; the doors marked <i>staff</i> open for those who work in " + esc(R.name) + ". The hiring desk is by the door (📋).");
},
function () {
var I = GR.inside, R = GR.R, W = WORLDS[R.key];
if (!I)
return;
var s = I.site;
I.g.visible = false;
GR.inside = null;
(GR.hid || []).forEach(function (c) { c.visible = true; });
GR.hid = [];
var fx = s.door.x + Math.sin(s.rot) * 1.5, fz = s.door.z + Math.cos(s.rot) * 1.5;
camera.position.set(W.base + fx, s.y + 1.72, fz);
yaw = s.rot + Math.PI;
pitch = 0;
grTone(330, 0.2);
},
function (R) {
var out = [], used = {}, id = R.emp + 1;
var list = [];
if (R.palace)
list.push(R.palace);
(R.wards || []).forEach(function (b) { list.push(b); });
((R.deep && R.deep.b) || []).forEach(function (b) { list.push(b); });
list.forEach(function (b) {
var T = GR_TYPE[b.t] || GR_TYPE.hall, j = b.job || (b.t === "palace" ? T.jobs[1] : (T.jobs[1] || T.jobs[0]));
var t = (R.short + " " + j[0].charAt(0).toLowerCase() + j[0].slice(1));
if (used[t])
t = t + " (" + b.n.replace(/^The /, "") + ")";
used[t] = 1;
out.push({ id: id++, title: t, rate: j[1], pos: j[2], auto: j[3] !== false, start: j[4] || 8, steps: b.steps || T.steps, task: b.task || ("Work a shift at " + b.n), workplace: grWorkplace(R, b), b: b });
});
var an = (R.arena && R.arena.n) || "The Training Ground";
out.push({ id: id++, title: R.short + " drill-master", rate: 13, pos: 1, auto: false, start: 8, steps: ["Set out the posts", "Run the drill with the learners", "Time each run", "Post the best times"], task: "Run the drill at " + an, workplace: R.name + ": " + an, b: { n: an } });
out.push({ id: id++, title: R.short + " gate warden", rate: 11, pos: 2, auto: true, start: 6, steps: ["Take over the watch at the gate", "Welcome travellers and point the way", "Keep the gate clear", "Hand over with the log"], task: "Keep the gate of " + R.name, workplace: R.name + ": " + ((R.gate && R.gate.n) || "The Gate"), b: { n: (R.gate && R.gate.n) || "The Gate" } });
return out;
},
function (R) {
var E = R.env || {}, inside = !!GR.inside;
return { top: E.top !== undefined ? E.top : 0x5A7AA8, low: E.low !== undefined ? E.low : 0xC8D4E0, fog: inside ? 0x2A2420 : (E.fog !== undefined ? E.fog : E.low), fogD: inside ? 0.004 : (E.fogD !== undefined ? E.fogD : 0.0016),
sun: inside ? 0.28 : (E.sun !== undefined ? E.sun : 0.85), sunCol: E.sunCol || 0xFFF2DC, sunDir: E.sunDir || [0.4, 0.75, 0.35], hemi: inside ? 0.95 : (E.hemi !== undefined ? E.hemi : 0.7),
hemiCol: inside ? 0xFFF0DC : (E.hemiCol || 0xCFDCEA), hemiGround: inside ? 0x6A5A4A : (E.hemiGround || 0x40382C), stars: inside ? 0 : (E.stars || 0) };
},
function (key) {
var W = WORLDS[key];
if (!W || !W.g || WLD.on === key)
return;
var G = W.g;
W.g = null;
scene.remove(G);
G.traverse(function (m) {
if (m.geometry && m.geometry.dispose && !m.geometry.userData.shared && !(typeof FIGGEO !== "undefined" && typeof ldShared === "function" && ldShared(m.geometry)))
m.geometry.dispose();
var ms = Array.isArray(m.material) ? m.material : (m.material ? [m.material] : []);
ms.forEach(function (mt) { if (mt.map && mt.map.isCanvasTexture)
mt.map.dispose(); });
});
var R = GR.realms[key.replace(/^gr_/, "")];
if (R)
R.st = null;
if (GR.R && GR.R.key === key) {
GR_KEEP.forEach(function (k) { GR[k] = k === "veil" ? null : []; });
GR.inside = null;
GR.near = null;
GR.gathers = [];
}
},
function (R, W) {
if (R.gate && R.gate.at)
return { x: R.gate.at[0], z: R.gate.at[1], rot: R.gate.at[2] || 0 };
var A = WLD.arrive || { x: 0, z: 0 }, best = null;
var gr = function (x, z) { try {
var h = W.ground ? W.ground(x, z, 0) : 0;
return h == null ? 0 : h;
}
catch (e) {
return 0;
} };
var bl = function (x, z) { try {
return !!(W.block && W.block(x, z, gr(x, z)));
}
catch (e) {
return true;
} };
var y0 = yaw || 0, dirs = [0, 0.4, -0.4, 0.8, -0.8, 1.2, -1.2, 1.6, -1.6, 2.2, -2.2, 2.8, -2.8, Math.PI], bestS = 1e9;
for (var rr = (R.gate && R.gate.r) || 40; rr <= ((R.gate && R.gate.rMax) || 160); rr += 12) {
for (var di = 0; di < dirs.length; di++) {
var a = y0 + dirs[di], x = A.x - Math.sin(a) * rr, z = A.z - Math.cos(a) * rr, h = gr(x, z), ok = true, lo = h, hi = h;
if (!isFinite(h) || h < -50)
continue;
if (R.gate && R.gate.minY != null && h < R.gate.minY)
continue;
for (var u = -9; u <= 9 && ok; u += 3)
for (var v = -7; v <= 7 && ok; v += 3.5) {
var px = x + u, pz = z + v, ph = gr(px, pz);
if (bl(px, pz) || (R.gate && R.gate.minY != null && ph < R.gate.minY))
ok = false;
lo = Math.min(lo, ph);
hi = Math.max(hi, ph);
}
if (!ok)
continue;
var sc = (hi - lo) * 4 + rr * 0.05 + Math.abs(dirs[di]) * 0.5;
if (hi - lo < 4 && sc < bestS) {
bestS = sc;
best = { x: x, z: z, rot: Math.atan2(A.x - x, A.z - z) };
}
}
if (best && bestS < 3)
break;
}
return best || { x: A.x - Math.sin(y0) * 40, z: A.z - Math.cos(y0) * 40, rot: y0 };
},
function (R, W, g) {
var S = grStyle(R), P = new THREE.Group(), h = g.y || 0;
grBox(P, 16, 0.6, 7, S.trim[0], S.trim[1], 0, 0.3, 0);
[-1, 1].forEach(function (sd) { grBox(P, 2.6, 13, 2.6, S.wall[0], S.wall[1], sd * 6.4, 6.8, 0); grBox(P, 3.2, 0.8, 3.2, S.trim[0], S.trim[1], sd * 6.4, 13.6, 0); grCone(P, 1.9, 3.6, S.roof[0], S.roof[1], sd * 6.4, 15.8, 0, S.roofKind === "module" ? 12 : 4); });
grBox(P, 15.6, 2.2, 3, S.trim[0], S.trim[1], 0, 12.2, 0);
for (var i = 0; i < 3; i++)
grBox(P, 10 - i * 1.2, 0.3, 1.2, S.trim[0], S.trim[1], 0, 0.75 + i * 0.3, 3.6 - i * 0.4);
if (g.isle) {
grCyl(P, 16, 12, 4, S.trim[0], S.trim[1], 0, -1.9, 0, 24);
for (var li = 0; li < 8; li++) {
var la = li / 8 * Math.PI * 2;
grSph(P, 0.4, S.glow, null, Math.cos(la) * 15, 0.4, Math.sin(la) * 15, 8, { glow: true });
}
}
var B = grBake(P);
var veil = new THREE.Mesh(new THREE.PlaneGeometry(10, 11), new THREE.MeshBasicMaterial({ color: R.gateCol || S.glow, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide }));
veil.position.set(0, 5.9, 0);
B.add(veil);
var sg = wSign([(R.gate && R.gate.n) || ("The Gate of " + R.name), "to " + R.name + (R.gate && R.gate.d ? " · " + R.gate.d : ""), "press E to go through"], 7.4, 1.6, "#1A1612", "#F0DCA8");
sg.position.set(0, 15.2, 1.6);
B.add(sg);
var gl = wGlow(R.gateCol || S.glow, 9, 0.22);
gl.position.set(0, 6, 0.4);
B.add(gl);
B.position.set(g.x, h, g.z);
B.rotation.y = g.rot;
var gs = grGateScale(R);
if (gs !== 1)
B.scale.setScalar(gs);
B.userData.veil = veil;
return B;
},
function (w, dt) {
var W = WORLDS[w];
if (!W || !W.g || WLD.on !== w)
return;
var L = grGatesIn(w), Lc = grL(), near = null;
L.forEach(function (R) {
var key = grGateKey(R), g = GR.gates[key];
if (!g) {
var f = grGateFind(R, W);
if (!f)
return;
g = GR.gates[key] = { x: f.x, z: f.z, rot: f.rot };
try {
var gh = W.ground ? W.ground(f.x, f.z, 0) : 0;
g.y = (gh == null || !isFinite(gh)) ? 0 : gh - 0.3;
}
catch (e) {
g.y = 0;
}
if (R.gate && R.gate.y != null)
g.y = R.gate.y;
else if (g.y < -1000) {
g.y = camera.position.y - 6;
g.isle = true;
}
if (R.gate && R.gate.isle)
g.isle = true;
g.sol = grGateSol(R, g);
}
if (!g.mesh || g.mesh.parent !== W.g) {
if (g.mesh && g.mesh.parent)
g.mesh.parent.remove(g.mesh);
g.mesh = grGateBuild(R, W, g);
W.g.add(g.mesh);
}
var v = g.mesh.userData.veil;
if (v)
v.material.opacity = 0.26 + 0.06 * Math.sin(WLD.t * 0.8);
var gs = grGateScale(R), fx = g.x + Math.sin(g.rot) * 3 * gs, fz = g.z + Math.cos(g.rot) * 3 * gs, d = Math.hypot(Lc.x - fx, Lc.z - fz);
if (d < ((R.gate && R.gate.reach) || Math.max(2.6, 4.2 * gs)))
near = R;
if (!GR.told[key] && WLD.t > 4) {
GR.told[key] = 1;
grSay("<b>New:</b> " + esc((R.gate && R.gate.n) || ("The Gate of " + R.name)) + " stands nearby, " + grArrow(Lc, g.x, g.z, "") + ": the way to " + esc(R.name) + ", " + esc(R.blurb || "the great heart of this world") + ".");
}
});
if (near) {
GR.gatePrompt = near;
worldPrompt("<b>" + esc((near.gate && near.gate.n) || ("The Gate of " + near.name)) + "</b> · <b>press E</b> to go through to " + esc(near.name), function () { grGo(near); });
}
else if (GR.gatePrompt) {
GR.gatePrompt = false;
worldPrompt(null);
}
},
function () {
var R = GR.R, ret = GR.ret;
if (R && ret && typeof GR_SCENE_LEAVE !== "undefined" && GR_SCENE_LEAVE[ret.w]) {
GR_SCENE_LEAVE[ret.w](R, ret);
return;
}
if (!R || !ret || !WORLDS[ret.w]) {
worldHome();
return;
}
if (R.leave && R.leave(ret))
return;
worldGo(ret.w, { keepFrom: true, k: ret.sub });
var W = WORLDS[ret.w], g = ret.g, gs = grGateScale(R);
if (g && WLD.on === ret.w) {
var fx = g.x + Math.sin(g.rot) * 4.5 * gs, fz = g.z + Math.cos(g.rot) * 4.5 * gs, h = 0;
try {
h = W.ground ? W.ground(fx, fz, 0) : 0;
}
catch (e) { }
camera.position.set(W.base + fx, (h || 0) + 1.72, fz);
yaw = g.rot + Math.PI;
pitch = 0;
}
},
function (dt) {
var R = GR.R;
if (!R)
return;
GR.t += dt;
var L = grL(), I = GR.inside;
var where;
if (I) {
var rm = grRoomAt(I, L.x, L.z);
where = esc(I.site.b.n) + " · " + esc(rm ? rm.name : I.plan.hall.name);
}
else
where = grDistrict(R, L);
var bn = "<b>" + esc(R.name) + "</b> · " + where;
if (GR.banner !== bn) {
GR.banner = bn;
worldBanner(bn);
}
if (I) {
I.doors.forEach(function (D) {
var d = Math.hypot(L.x - D.x, L.z - D.z), want = d < 2.4 && grBadge(R) ? 1 : 0;
D.open += (want - D.open) * Math.min(1, dt * 4);
D.leaf.position.y = 1.3 + D.open * 2.4;
D.leaf.visible = D.open < 0.98;
if (D.open > 0.6) {
D.sol.hw = 0;
D.sol.hd = 0;
}
else {
D.sol.hw = D.leaf.geometry.parameters.width / 2;
D.sol.hd = D.leaf.geometry.parameters.depth / 2;
}
D.lamp.material.color.setHex(want ? 0x6AD07A : 0xD8A040);
});
}
else {
GR.people.forEach(function (p) { if (p.walk && typeof wWander === "function")
wWander(p.g, dt, function (x, z) { return grGround(x, z, 0); }, { r: 14, sp: 1.1 }); p.x = p.g.position.x; p.z = p.g.position.z; });
if (GR.veil)
GR.veil.material.opacity = 0.24 + 0.06 * Math.sin(GR.t * 0.8);
GR.chk += dt;
if (GR.chk > 2) {
GR.chk = 0;
var n = Date.now();
(GR.gathers || []).forEach(function (s) { if (s.glow)
s.glow.visible = !(GR.picked[s.id] > n); });
}
grDrillTick(dt, L);
}
if (GR.guide && !GR.drill) {
var gd = GR.guide;
if (Math.hypot(L.x - gd.x, L.z - gd.z) < 6) {
GR.guide = null;
grHud(null);
grSay("<b>Here:</b> " + esc(gd.n) + ".");
}
else
grHud(grArrow(L, gd.x, gd.z, gd.n));
}
var list = I ? I.spots : GR.spots, best = null, bd = 1e9, feet = camera.position.y - 1.72;
for (var i = 0; i < list.length; i++) {
var s = list[i], x = s.person ? s.person.g.position.x : s.x, z = s.person ? s.person.g.position.z : s.z;
if (s.y !== undefined && Math.abs(feet - s.y) > 3)
continue;
var d = Math.hypot(L.x - x, L.z - z);
if (d < s.r && d < bd) {
bd = d;
best = s;
}
}
if (best) {
if (GR.near !== best) {
GR.near = best;
worldPrompt(best.label, best.fn);
}
}
else if (GR.near) {
GR.near = null;
worldPrompt(null);
}
},
function (R, L) {
var A = GR_AT;
if (L.x > GR_AT.tunnel.x0 - 4 && L.x < GR_AT.tunnel.x1 + 4 && Math.abs(L.z - GR_AT.tunnel.z) < 8)
return esc((R.tunnel && R.tunnel.n) || "The Deep Road");
if (L.x > GR_AT.tunnel.x1)
return esc((R.deep && R.deep.n) || "The Far District");
if (L.z < -108)
return esc((R.palace && R.palace.n) || "The Seat") + " · the terraces";
if (Math.hypot(L.x - A.plaza.x, L.z - A.plaza.z) < A.plaza.r)
return esc((R.plaza && R.plaza.n) || "The Great Plaza");
if (L.x < A.arena.x + A.arena.w / 2 + 2 && Math.abs(L.z - A.arena.z) < A.arena.d / 2 + 6)
return esc((R.arena && R.arena.n) || "The Training Ground");
if (Math.abs(L.z - 80) < 14 && Math.abs(L.x) > 36)
return esc((R.homes && R.homes.n) || "The Residential Ward");
return esc((R.avenue && R.avenue.n) || "The Grand Avenue");
},
function (on) {
var b = document.getElementById("gr-btn");
if (!b) {
b = document.createElement("button");
b.id = "gr-btn";
b.className = "btn";
b.style.cssText = "position:fixed;left:12px;top:calc(206px + env(safe-area-inset-top,0px));z-index:44;display:none;padding:6px 12px;border-radius:16px;background:rgba(10,12,22,.88);color:#F0E6CC;border:1px solid #C9A868;font:600 13px var(--sans,system-ui)";
b.onclick = function (e) { e.stopPropagation(); grGuideCard(); };
document.body.appendChild(b);
}
b.textContent = "🏛️ " + (GR.R ? GR.R.short : "Guide");
b.style.display = on ? "block" : "none";
},
function () {
var R = GR.R;
if (!R)
return;
var h = grTitle("🏛️ " + esc(R.name)) + "<div style='opacity:.85;margin:4px 0 8px'>" + esc(R.blurb || "") + "</div>", fns = {}, L = grL();
if (GR.inside) {
h += worldBtn("out", "Go out of " + esc(GR.inside.site.b.n), "Back to the street");
fns.out = function () { worldCard(null); grExit(); };
}
h += grHead("The great buildings");
(GR.sites || []).forEach(function (s, i) {
var k = "s" + i;
h += worldBtn(k, esc(s.b.n), esc(s.b.d || ((GR_TYPE[s.b.t] || {}).hall || "")));
fns[k] = function () { worldCard(null); if (GR.inside)
grExit(); GR.guide = { x: s.door.x, z: s.door.z, n: s.b.n }; };
});
h += grHead("Elsewhere");
var A = GR_AT, more = [["plaza", (R.plaza && R.plaza.n) || "The Great Plaza", A.plaza.x, A.plaza.z + A.plaza.r - 4], ["arena", (R.arena && R.arena.n) || "The Training Ground", A.arena.x + A.arena.w / 2 + 3, A.arena.z],
["tun", (R.tunnel && R.tunnel.n) || "The Deep Road", A.tunnel.x0 - 4, A.tunnel.z], ["deep", (R.deep && R.deep.n) || "The Far District", A.deep.x - A.deep.r + 6, A.deep.z], ["gate", (R.gate && R.gate.back) || "The way back", A.gate.x, A.gate.z - 4]];
if (GR.pastimeAt)
more.unshift(["pt", GR.pastimeAt.n, GR.pastimeAt.x, GR.pastimeAt.z]);
more.forEach(function (m) { h += worldBtn("m" + m[0], esc(m[1]), null); fns["m" + m[0]] = function () { worldCard(null); if (GR.inside)
grExit(); GR.guide = { x: m[2], z: m[3], n: m[1] }; }; });
h += worldBtn("does", "✨ What to do in " + esc(R.name), "Work, trade, gather, learn and more");
fns.does = function () { grDoesCard(); };
if ((R.lore || []).length) {
h += worldBtn("lore", "📜 The chronicle of " + esc(R.name), "Its history, in short");
fns.lore = function () { grChronicle(); };
}
h += "<div style='opacity:.6;font-size:12px;margin-top:8px'>Posts in every building: 📋 at the door. What you gather goes to your backpack.</div>";
worldCard(h, fns);
},
function () {
var R = GR.R, best = grLocalGet("drill." + R.id, null), nm = (R.arena && R.arena.n) || "The Training Ground";
var h = grTitle(esc(nm)) + "<div style='margin:4px 0 8px'>" + esc((R.arena && R.arena.about) || "Six posts stand round the ground. When you start, one lights gold: run to it. When you reach it, the next lights. Reach all six as fast as you can.") + "</div>" +
(best ? "<div>Your best: <b>" + best.toFixed(1) + " s</b></div>" : "") + worldBtn("go", "Start the drill", "Six posts, in a new order each time");
worldCard(h, { go: function () { worldCard(null); grDrillStart(); } });
},
function (dt, L) {
var D = GR.drill, posts = GR.drillPosts || [];
if (!D) {
return;
}
D.t += dt;
var p = posts[D.order[D.at]];
D.lit = Math.min(1, D.lit + dt * 2.5);
posts.forEach(function (q, i) { var on = q === p; q.cap.material.color.setRGB(on ? 0.3 + 0.6 * D.lit : 0.29, on ? 0.3 + 0.45 * D.lit : 0.29, on ? 0.3 - 0.1 * D.lit : 0.29); });
grHud("🏃 Post " + (D.at + 1) + " of " + posts.length + " · " + D.t.toFixed(1) + " s · " + grArrow(L, p.x, p.z, "the gold post"));
if (Math.hypot(L.x - p.x, L.z - p.z) < 2.4) {
grTone(660 + D.at * 40, 0.1);
D.at++;
D.lit = 0;
if (D.at >= posts.length) {
var R = GR.R, best = grLocalGet("drill." + R.id, null), t = D.t;
GR.drill = null;
grHud(null);
posts.forEach(function (q) { q.cap.material.color.setRGB(0.29, 0.29, 0.29); });
var nb = !best || t < best;
if (nb)
grLocalSet("drill." + R.id, t);
grSay("<b>Drill done: " + t.toFixed(1) + " seconds.</b> " + (nb ? "Your best yet, and written on the board." : "Your best is " + best.toFixed(1) + " s."));
}
}
if (D && D.t > 180) {
GR.drill = null;
grHud(null);
grSay("The drill ran out of time. Start again at the board.");
}
},
function (k) {
if (GR_MB[k])
return GR_MB[k];
if (typeof WMW_MB !== "undefined" && WMW_MB[k])
return WMW_MB[k];
if (typeof HX_MB !== "undefined" && HX_MB[k])
return HX_MB[k];
if (typeof FG_MB !== "undefined" && FG_MB[k])
return FG_MB[k];
if (typeof OW_GOOD !== "undefined" && OW_GOOD[k])
return { kind: k, name: OW_GOOD[k].n, icon: OW_GOOD[k].e, buys: OW_GOOD[k].b || 1, price: null };
return { kind: k, name: k, icon: "", buys: 1, price: null };
},
function (sp) {
if (GR.busy)
return;
if (!grSigned()) {
grSay("Sign in to gather: what you find is kept against your account, in your backpack.");
return;
}
var now = Date.now(), until = +GR.picked[sp.id] || 0;
if (until > now && !grKeeper()) {
grSay("<b>" + esc(sp.name) + ".</b> You have had what there is here for now. Worth another look in " + Math.ceil((until - now) / 60000) + " minutes.");
return;
}
GR.busy = true;
grSay("<b>" + esc(sp.name) + "</b>: you " + esc(sp.verb) + "…");
grTone(330, 0.1);
setTimeout(function () {
var L = grL();
if (Math.hypot(L.x - sp.x, L.z - sp.z) > 5) {
GR.busy = false;
grSay("You moved off before you were done.");
return;
}
grRpc("craft_gather", { p_spot: sp.id }).then(function (o) {
GR.busy = false;
if (o && o.ok) {
GR.picked[sp.id] = Date.now() + (+o.regrow || 20) * 60000;
grPickedSave();
GR.stockAt = 0;
var M = grMatOf(o.kind);
grSay("<b>" + (M.icon || "") + " +" + (+o.got || 1) + " " + esc(M.name) + "</b>. It is in your backpack's stock: sell it at the market hall or to the city, or use it at a forge.");
grTone(523, 0.12);
setTimeout(function () { grTone(659, 0.14); }, 120);
if (typeof loadStock === "function")
loadStock();
}
else {
if (o && o.wait) {
GR.picked[sp.id] = Date.now() + o.wait * 60000;
grPickedSave();
}
grSay(esc((o && o.say) || "Nothing came of it."));
}
}).catch(function (e) { GR.busy = false; grSay(grMissing(e) ? "Gathering here opens with the next server update." : esc((e && e.message) || String(e))); });
}, 1400);
},
function (site, msg) {
var R = GR.R, T = R.trade || { sells: [], buys: [] };
var draw = function () {
var h = grTitle(esc(site.b.n) + ": the exchange desk") + "<div style='opacity:.85;margin:4px 0 8px'>" + esc(T.say || "The desk buys what is gathered in the realm and sells what the realm makes.") + "</div>", fns = {};
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
if (!grSigned())
h += "<div style='margin:6px 0;color:#E8C8A0'>Sign in to trade: gold and stock are kept against your account.</div>";
var sells = (T.sells || []).filter(function (k) { return grMatOf(k).price != null; });
if (sells.length) {
h += grHead("For sale");
sells.forEach(function (k) {
var M = grMatOf(k), p = M.price;
h += worldBtn("b1_" + k, (M.icon || "") + " " + esc(M.name) + " · " + (grKeeper() ? "free to you" : p + " gold"), "Buy one · you have " + grHave(k));
fns["b1_" + k] = function () { grBuy(site, k, 1); };
});
}
var buys = (T.buys || []).filter(function (k) { return grHave(k) > 0; });
h += grHead("They buy");
if (!buys.length)
h += "<div style='opacity:.75'>" + esc((T.buys || []).map(function (k) { return grMatOf(k).name.toLowerCase(); }).join(", ")) + ". You have none of those with you yet.</div>";
buys.forEach(function (k) {
var M = grMatOf(k), n = grHave(k), r = (GR.stock || []).filter(function (s) { return s.kind === k; })[0], p = r && r.buys != null ? +r.buys : M.buys;
h += worldBtn("s1_" + k, "Sell one " + esc(M.name.toLowerCase()) + " · " + p + " gold", "You have " + n);
fns["s1_" + k] = function () { grSell(site, k, 1); };
if (n > 1) {
h += worldBtn("sa_" + k, "Sell all " + n + " · " + (p * n) + " gold", null);
fns["sa_" + k] = function () { grSell(site, k, n); };
}
});
h += "<div style='opacity:.6;font-size:12px;margin-top:8px'>What you buy and sell is your stock: 🎒 Backpack, Materials.</div>";
worldCard(h, fns);
};
draw();
grStock(true).then(function () { if (WLD.card && WLD.card.style.display === "block")
draw(); });
},
function (site, k, n) {
if (!grSigned())
return grTrade(site, "Sign in first.");
grRpc("craft_buy", { p_kind: k, p_amount: n }).then(function (o) { GR.stockAt = 0; grStock(true).then(function () { grTrade(site, esc((o && o.say) || "Done.")); }); if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } })
.catch(function (e) { grTrade(site, esc(grMissing(e) ? "The desk opens soon." : ((e && e.message) || String(e)))); });
},
function (site, k, n) {
if (!grSigned())
return grTrade(site, "Sign in first.");
grRpc("sell_stock", { p_kind: k, p_amount: n }).then(function (o) { GR.stockAt = 0; grStock(true).then(function () { grTrade(site, esc(o === "ok" ? "Sold: " + n + " " + grMatOf(k).name.toLowerCase() + "." : String(o || "Not now."))); }); if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } })
.catch(function (e) { grTrade(site, esc((e && e.message) || String(e))); });
},
function (G, I, R, site) {
var T = site.T;
function inRoom(kinds) { for (var i = 0; i < I.rooms.length; i++)
if (kinds.indexOf(I.rooms[i].kind) >= 0)
return I.rooms[i]; return null; }
function spotIn(r, label, fn) { var cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2; I.spots.push({ x: cx, z: cz, r: 3, label: label, fn: fn }); return { x: cx, z: cz }; }
if (T.lecture && (R.lectures || R.lore)) {
var lr = inRoom(["lecture", "classroom", "observe"]);
if (lr) {
var p = spotIn(lr, "<b>📖 " + esc(lr.name) + "</b> · <b>press E</b> to sit in on today's lecture", function () { grLecture(site); });
var lc = wSign(["Today's lecture", "sit in: press E"], 1.6, 0.5, "#1E2A1E", "#E8F0D8");
lc.position.set(p.x, 1.5, p.z);
lc.userData.grKeep = 1;
G.add(lc);
}
}
if (T.chronicle || site.b.t === "palace") {
var cr = inRoom(["archive", "library", "gallery"]);
if (cr)
spotIn(cr, "<b>📜 " + esc(cr.name) + "</b> · <b>press E</b> to read the chronicle of " + esc(R.name), function () { grChronicle(); });
}
if (T.trade && R.trade) {
var tr = inRoom(["counter", "shop"]);
if (tr)
spotIn(tr, "<b>⚖️ " + esc(tr.name) + "</b> · <b>press E</b> to buy and sell", function () { grTrade(site); });
}
if (site.b.t === "temple") {
var sh = inRoom(["shrine", "chapel"]);
if (sh)
spotIn(sh, "<b>🕯️ " + esc(sh.name) + "</b> · <b>press E</b> to light a candle", function () { grTone(392, 0.4); grSay("You light a candle and stand a while in the quiet of " + esc(sh.name) + ". The flame burns small and steady."); });
}
},
function (site) {
var R = GR.R, L = R.lectures || (R.lore || []).map(function (l) { return { t: l[0], x: l[1] }; });
if (!L.length)
return;
var day = Math.floor(Date.now() / 86400000), i = (day + grHash(site.b.n)) % L.length, lec = L[i], heard = grLocalGet("heard." + R.id, {});
var h = grTitle("📖 " + esc(lec.t)) + "<div style='opacity:.7;font-size:12px'>" + esc(site.b.n) + " · today's lecture</div><div style='margin-top:8px'>" + esc(lec.x) + "</div>", fns = {};
if (lec.q) {
h += grHead("A question");
h += "<div>" + esc(lec.q[0]) + "</div>";
lec.q[1].forEach(function (a, k) {
h += worldBtn("a" + k, esc(a), null);
fns["a" + k] = function () {
var ok = k === lec.q[2];
if (ok) {
heard[lec.t] = 1;
grLocalSet("heard." + R.id, heard);
}
worldCard(grTitle(ok ? "Right." : "Not quite.") + "<div>" + esc(ok ? "Well listened. That is one more lecture of " + R.name + " in your notes (" + Object.keys(heard).length + " of " + L.length + ")." : "The answer is: " + lec.q[1][lec.q[2]] + ". Come back tomorrow for the next lecture.") + "</div>");
};
});
}
else {
heard[lec.t] = 1;
grLocalSet("heard." + R.id, heard);
h += "<div style='opacity:.7;margin-top:8px'>Lectures of " + esc(R.name) + " heard: " + Object.keys(heard).length + " of " + L.length + ". A new one each day.</div>";
}
worldCard(h, fns);
},
function (R, key, x, z) {
if (GR_SC.told[key])
return;
GR_SC.told[key] = 1;
setTimeout(function () { grSay("<b>New:</b> " + esc((R.gate && R.gate.n) || ("The Gate of " + R.name)) + " stands nearby, " + grArrow({ x: camera.position.x, z: camera.position.z }, x, z, "") + ": the way to " + esc(R.name) + ", " + esc(R.blurb || "the great heart of this land") + "."); }, 2500);
},
function () {
if (!LD.g || !LD.kind)
return;
var R = grSceneRealm("land", LD.kind);
if (!R)
return;
var r = (typeof realmById === "function") ? realmById(LD.rid) : null, taken = r ? ldTaken(r) : [];
var best = null, gs = grGateScale(R);
for (var rr = 34; rr <= 120 && !best; rr += 10) {
for (var a = 0; a < 12 && !best; a++) {
var an = a / 12 * Math.PI * 2 + 0.3, x = Math.sin(an) * rr, z = Math.cos(an) * rr, ok = ldClear(taken, x, z, 11 * gs);
for (var u = -9; u <= 9 && ok; u += 3)
for (var v = -6; v <= 6 && ok; v += 3)
if (worldSolidAt(LD.solids, x + u * gs, z + v * gs, 0))
ok = false;
if (ok) {
var h0 = ldY(x, z), lo = h0, hi = h0;
for (var q = -8; q <= 8; q += 4) {
var hq = ldY(x + q * gs, z);
lo = Math.min(lo, hq);
hi = Math.max(hi, hq);
}
if (hi - lo < 3)
best = { x: x, z: z, rot: Math.atan2(-x, -z), y: lo - 0.3 };
}
}
}
if (!best)
best = { x: 0, z: 46, rot: Math.PI, y: ldY(0, 46) - 0.3 };
var B = grGateBuild(R, null, best);
B.userData.ldKeep = 1;
var veil = B.userData.veil;
if (veil)
veil.userData.ldAnim = function (m, t) { m.material.opacity = 0.26 + 0.06 * Math.sin(t * 0.8); };
LD.g.add(B);
grGateSol(R, best).forEach(function (s) { LD.solids.push({ x: s.x, z: s.z, r: s.r, h: 14 * gs }); });
var fx = best.x + Math.sin(best.rot) * 3 * gs, fz = best.z + Math.cos(best.rot) * 3 * gs;
LD.talkers.push({ x: fx, z: fz, r: Math.max(2.6, 4.2 * gs), name: (R.gate && R.gate.n) || ("The Gate of " + R.name), verb: "go through to " + R.name, grR: R });
GR.gates[grGateKey(R)] = { x: best.x, z: best.z, rot: best.rot, y: best.y, land: true };
grSceneTell(R, "land:" + LD.kind, LD.ox + best.x, LD.oz + best.z);
},
function (kind) {
var R = grSceneRealm(kind, null);
if (!R)
return null;
var st = GR_SC[kind];
if (!st) {
var g = { x: 0, z: 0, rot: 0, y: 0 };
if (kind === "ug") {
R.gate = R.gate || {};
if (!R.gate.s)
R.gate.s = 0.3;
g = { x: -30, z: 0, rot: Math.PI / 2, y: 0 };
}
else {
if (!R.gate)
R.gate = {};
if (!R.gate.s)
R.gate.s = 0.5;
var sx = MALL.station.x - MALL.cx, sz = MALL.station.z - MALL.cz, gs = R.gate.s, found = null;
for (var rr = 14; rr <= 60 && !found; rr += 4)
for (var a = 0; a < 16 && !found; a++) {
var an = a / 16 * Math.PI * 2, x = sx + Math.cos(an) * rr, z = sz + Math.sin(an) * rr, ok = true;
for (var u = -8; u <= 8 && ok; u += 2)
for (var v = -4; v <= 6 && ok; v += 2) {
try {
if (mdBlocked(x + u * gs, z + v * gs, 0))
ok = false;
}
catch (e) {
ok = false;
}
}
if (ok)
found = { x: x, z: z, rot: Math.atan2(sx - x, sz - z), y: 0 };
}
g = found || { x: sx + 20, z: sz, rot: -Math.PI / 2, y: 0 };
}
var B = grGateBuild(R, null, g);
B.visible = false;
scene.add(B);
st = GR_SC[kind] = { R: R, g: g, B: B, sol: grGateSol(R, g) };
}
return st;
},
function (R) {
var L = grLook(R), W = R.wards || [], out = [], A = GR_AT, rr = wRand(grHash(R.id) + 5);
for (var i = 0; i < W.length && i < 8; i++) {
var b = W[i], T = GR_TYPE[b.t] || GR_TYPE.hall, d = T.size[2] * (b.big ? 1.15 : 1), west = i < 4, row = A.rows[i % 4], s = { x: 0, z: 0, rot: 0, y: 0 };
if (L.plan === "ring") {
var a = GR_RING.ang[i] * Math.PI / 180;
s.x = Math.cos(a) * GR_RING.r;
s.z = A.plaza.z + Math.sin(a) * GR_RING.r;
s.rot = Math.atan2(A.plaza.x - s.x, A.plaza.z - s.z);
}
else if (L.plan === "scatter") {
var jx = rr() * 16, jz = (rr() - 0.5) * 20;
s.x = (west ? -1 : 1) * (16 + d / 2 + jx);
s.z = row + jz;
s.rot = (west ? Math.PI / 2 : -Math.PI / 2) + (rr() - 0.5) * 0.5;
}
else if (L.plan === "hill") {
s.x = (west ? -1 : 1) * (26 + d / 2);
s.z = row;
s.rot = west ? Math.PI / 2 : -Math.PI / 2;
s.y = GR_HILL_Y[i % 4];
}
else {
s.x = (west ? -1 : 1) * (16 + d / 2);
s.z = row;
s.rot = west ? Math.PI / 2 : -Math.PI / 2;
}
out.push(s);
}
return out;
},
function (P, R, S, site) {
var y = site.y, w = site.w, d = site.d, west = site.x < 0, hw = d / 2 + 3, hd = w / 2 + 3;
var x0 = site.x - hw, x1 = site.x + hw, z0 = site.z - hd, z1 = site.z + hd;
GR.plats.push({ x0: x0, x1: x1, z0: z0, z1: z1, h: y });
grBox(P, x1 - x0, y, z1 - z0, S.trim[0], S.trim[1], site.x, y / 2, site.z);
grBox(P, x1 - x0 - 0.6, 0.14, z1 - z0 - 0.6, S.pave[0], S.pave[1], site.x, y + 0.03, site.z);
var len = Math.max(3, y / 0.45), sx0 = west ? x1 : x0 - len, sx1 = west ? x1 + len : x0;
GR.ramps.push({ x0: sx0, x1: sx1, z0: site.z - 3.2, z1: site.z + 3.2, h0: west ? y : 0, h1: west ? 0 : y, ax: "x" });
var n = Math.max(4, Math.round(y / 0.3));
for (var k = 0; k < n; k++) {
var t = (k + 0.5) / n, sx = sx0 + (sx1 - sx0) * t, h = west ? y * (1 - k / n) : y * ((k + 1) / n);
grBox(P, len / n + 0.02, Math.max(0.15, h), 6.4, S.trim[0], S.trim[1], sx, Math.max(0.15, h) / 2, site.z);
}
var wall = function (cx, cz, lw, ld) { grBox(P, lw, 1, ld, S.wall[0], S.wall[1], cx, y + 0.5, cz); GR.solids.push({ x: cx, z: cz, hw: lw / 2, hd: ld / 2, b: y - 0.2, h: 1.2 }); };
wall(site.x, z0 + 0.3, x1 - x0, 0.6);
wall(site.x, z1 - 0.3, x1 - x0, 0.6);
var bx = west ? x0 + 0.3 : x1 - 0.3, fx = west ? x1 - 0.3 : x0 + 0.3;
wall(bx, site.z, 0.6, z1 - z0);
wall(fx, (z0 + site.z - 3.6) / 2, 0.6, (site.z - 3.6) - z0);
wall(fx, (site.z + 3.6 + z1) / 2, 0.6, z1 - (site.z + 3.6));
GR.solids.push({ x: site.x, z: site.z, hw: hw, hd: hd, b: -1, h: y + 0.9, hill: 1 });
},
function (x, z, r) {
var A = GR_AT, B = A.bound, L = grLook(GR.R);
if (x < B.x0 + 6 + r || x > B.x1 - 6 - r || z < B.z0 + 6 + r || z > B.z1 - 6 - r)
return true;
if (Math.abs(x) < 13 + r && z > -122 && z < 290)
return true;
if (z > 66 - r && z < 94 + r && x > -208 && x < 212)
return true;
if (Math.hypot(x - A.plaza.x, z - A.plaza.z) < A.plaza.r + 6 + r)
return true;
var a = A.arena;
if (x > a.x - a.w / 2 - 8 - r && x < a.x + a.w / 2 + 8 + r && z > a.z - a.d / 2 - 14 - r && z < a.z + a.d / 2 + 14 + r)
return true;
var tk = (GR.R.tunnel && GR.R.tunnel.kind) || "tunnel";
if (tk === "tunnel") {
if (x > A.tunnel.x0 - 6 - r && x < A.tunnel.x1 + 6 + r)
return true;
}
else if (x > A.tunnel.x0 - 8 - r && x < A.tunnel.x1 + 8 + r && Math.abs(z - A.tunnel.z) < 10 + r)
return true;
if (Math.hypot(x - A.deep.x, z - A.deep.z) < A.deep.r + 42 + r)
return true;
if (x > -92 - r && x < 92 + r && z < -100 + r)
return true;
if (L.plan === "ring" && Math.abs(Math.hypot(x - A.plaza.x, z - A.plaza.z) - GR_RING.road) < 9 + r)
return true;
return false;
},
function (x, z, r) {
if (grReserved(x, z, r))
return false;
var o = [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]];
for (var i = 0; i < o.length; i++)
if (worldSolidAt(GR.solids, x + o[i][0], z + o[i][1], 0))
return false;
for (var j = 0; j < GR.sites.length; j++) {
var s = GR.sites[j];
if (Math.hypot(x - s.x, z - s.z) < Math.hypot(s.w, s.d) / 2 + 6 + r)
return false;
if (Math.hypot(x - s.door.x, z - s.door.z) < 10 + r)
return false;
}
for (var k = 0; k < GR.taken.length; k++) {
var q = GR.taken[k];
if (Math.hypot(x - q.x, z - q.z) < q.r + r + 1)
return false;
}
if (GR.R.layout === "isles" && !grOnIsle(x, z))
return false;
return true;
},
function (rnd, r, tries, near) {
var B = GR_AT.bound;
for (var t = 0; t < (tries || 30); t++) {
var x, z;
if (near) {
var an = rnd() * Math.PI * 2, d = near.r0 + rnd() * (near.r1 - near.r0);
x = near.x + Math.cos(an) * d;
z = near.z + Math.sin(an) * d;
}
else {
x = B.x0 + 10 + rnd() * (B.x1 - B.x0 - 20);
z = B.z0 + 10 + rnd() * (B.z1 - B.z0 - 20);
}
if (grFree(x, z, r))
return { x: x, z: z };
}
return null;
},
function (B, S, r, y, n, wh, cx, cz, skipFront) {
var wm = grMat(S.glow, null, { glow: true });
for (var i = 0; i < n; i++) {
var a = (i + 0.5) / n * Math.PI * 2;
if (skipFront && Math.abs(Math.atan2(Math.sin(a), Math.cos(a)) - Math.PI / 2) < 0.35)
continue;
var px = (cx || 0) + Math.cos(a) * (r + 0.05), pz = (cz || 0) + Math.sin(a) * (r + 0.05);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.2, wh), wm);
win.position.set(px, y, pz);
win.rotation.y = Math.PI / 2 - a;
B.add(win);
}
},
function (B, S, len, y, z, wh, skipMid, ry) {
var wm = grMat(S.glow, null, { glow: true }), n = Math.max(2, Math.floor(len / 4.2));
for (var i = 0; i < n; i++) {
var u = -len / 2 + (i + 0.5) * len / n;
if (skipMid && Math.abs(u) < 4)
continue;
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.3, wh), wm);
if (ry) {
win.position.set(z, y, u);
win.rotation.y = ry;
}
else
win.position.set(u, y, z);
B.add(win);
}
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var r = d / 2, hh = h * 0.55;
grCyl(B, r + 0.6, r + 0.8, 1, trim[0], trim[1], 0, 0.5, 0, 28);
grCyl(B, r, r, hh, wall[0], wall[1], 0, 1 + hh / 2, 0, 28);
grDome(B, r, roof[0], roof[1], 0, 1 + hh, 0, 28);
grMesh(new THREE.TorusGeometry(r + 0.05, 0.35, 5, 32), grMat(trim[0], "metal"), 0, 1 + hh, 0, B).rotation.x = Math.PI / 2;
grWinRing(B, S, r, 1 + hh * 0.55, 14, Math.min(2.2, hh * 0.4), 0, 0, true);
var sr = Math.min(r * 0.55, (w / 2 - r) + r * 0.5);
[-1, 1].forEach(function (sd) {
var px = sd * (w / 2 - sr);
grCyl(B, sr, sr, hh * 0.7, wall[0], wall[1], px, 1 + hh * 0.35, -d * 0.1, 20);
grDome(B, sr, roof[0], roof[1], px, 1 + hh * 0.7, -d * 0.1, 20);
var tb = grCyl(B, 1.6, 1.6, Math.abs(px) - r * 0.6, trim[0], "metal", sd * (r * 0.6 + (Math.abs(px) - r * 0.6) / 2), 2.6, -d * 0.1, 10);
tb.rotation.z = Math.PI / 2;
grWinRing(B, S, sr, 1 + hh * 0.4, 8, 1.2, px, -d * 0.1);
});
if (grand) {
grCyl(B, 1, 1, 10, trim[0], "metal", 0, 1 + hh + r + 4, 0, 8);
grDome(B, 3, roof[0], roof[1], 0, 1 + hh + r + 8.6, 0, 14);
}
return { top: 1 + hh + r * 0.6 };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var r = d / 2, hh = h;
grCyl(B, r + 0.7, r + 0.9, 1, trim[0], trim[1], 0, 0.5, 0, 28);
grCyl(B, r, r * 1.04, hh - 1, wall[0], wall[1], 0, 0.5 + hh / 2, 0, 28);
var fl = Math.max(2, Math.round(hh / 5.5));
for (var f = 1; f <= fl; f++)
grMesh(new THREE.TorusGeometry(r + 0.1, 0.22, 4, 32), grMat(trim[0], trim[1]), 0, 1 + f * (hh - 1) / fl, 0, B).rotation.x = Math.PI / 2;
for (var f2 = 0; f2 < fl; f2++)
grWinRing(B, S, r * 1.02, 1 + (f2 + 0.55) * (hh - 1) / fl, 16, Math.min(2.2, (hh - 1) / fl * 0.5), 0, 0, f2 === 0);
var dm = grDome(B, r * 1.02, roof[0], roof[1], 0, hh, 0, 28);
dm.scale.y = S.k === "ice" ? 0.75 : 0.6;
[-1, 1].forEach(function (sd) { if (w / 2 - r < 4)
return; var px = sd * (w / 2 - 4); grCyl(B, 3.6, 3.8, hh * 0.7, wall[0], wall[1], px, hh * 0.35, -d * 0.15, 14); grDome(B, 3.7, roof[0], roof[1], px, hh * 0.7, -d * 0.15, 14); });
if (grand) {
grCyl(B, r * 0.4, r * 0.45, 10, wall[0], wall[1], 0, hh + r * 0.6 + 4, 0, 18);
grDome(B, r * 0.42, roof[0], roof[1], 0, hh + r * 0.6 + 9, 0, 18);
}
return { top: hh + r * 0.5 };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var tiers = [[w, d, h * 0.5], [w * 0.74, d * 0.74, h * 0.32], [w * 0.5, d * 0.5, h * 0.28]], y = 0, lit = S.k === "fire" || S.k === "desert";
tiers.forEach(function (t, i) {
grBox(B, t[0], t[2], t[1], i ? wall[0] : grTint(wall[0], b.n + "t", 0.06), wall[1], 0, y + t[2] / 2, (d - t[1]) / 2 * (i ? -0.2 : 0));
grBox(B, t[0] + 0.6, 0.5, t[1] + 0.6, trim[0], trim[1], 0, y + t[2], (d - t[1]) / 2 * (i ? -0.2 : 0));
grWinFace(B, S, t[0] - 2, y + t[2] * 0.5, (i ? (d - t[1]) / 2 * -0.2 : 0) + t[1] / 2 + 0.06, Math.min(2, t[2] * 0.4), i === 0);
y += t[2];
});
if (S.k === "desert") {
grCyl(B, w * 0.16, w * 0.16, 1.2, wall[0], wall[1], 0, y + 0.6, -d * 0.05, 20);
grDome(B, w * 0.15, roof[0], roof[1], 0, y + 1.2, -d * 0.05, 20);
}
if (lit)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { grCyl(B, 0.5, 0.7, 1.2, trim[0], "metal", q[0] * w * 0.23, y + 0.6, q[1] * d * 0.2, 8); grSph(B, 0.4, S.k === "fire" ? 0xE08A4A : S.glow, null, q[0] * w * 0.23, y + 1.4, q[1] * d * 0.2, 8, { glow: true }); });
return { top: y, noRoof: true };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var hb = h * 0.6, crys = S.k === "crystal";
grBox(B, w, hb, d, wall[0], wall[1], 0, hb / 2, 0);
grBox(B, w + 0.6, 0.5, d + 0.6, trim[0], trim[1], 0, hb, 0);
grWinFace(B, S, w - 2, hb * 0.5, d / 2 + 0.06, Math.min(2.4, hb * 0.35), true);
var tw = [[-w * 0.28, -d * 0.15, h * (grand ? 2.8 : 2.1)], [w * 0.24, -d * 0.2, h * (grand ? 2.3 : 1.6)]];
if (grand)
tw.push([0, -d * 0.3, h * 3.4]);
tw.forEach(function (t, i) {
var tr = crys ? 3.2 : 3.6;
if (crys) {
grCyl(B, tr * 0.4, tr, t[2], wall[0], wall[1], t[0], t[2] / 2, t[1], 6);
grCone(B, tr * 0.4, 6, roof[0], null, t[0], t[2] + 3, t[1], 6, { op: 0.86 });
grGlow(B, S.glow, 6, 0.2, t[0], t[2] + 2, t[1]);
}
else {
grBox(B, tr * 2, t[2], tr * 2, wall[0], wall[1], t[0], t[2] / 2, t[1]);
for (var y = hb + 4; y < t[2] - 2; y += 5) {
grBox(B, tr * 2 + 0.3, 0.35, tr * 2 + 0.3, trim[0], trim[1], t[0], y, t[1]);
grBox(B, tr * 2 + 0.06, 1.5, 0.05, S.glow, null, t[0], y + 2, t[1] + tr + 0.03, 0, { glow: true });
}
if (S.k === "future") {
for (var g = hb + 6; g < t[2] - 4; g += 10)
grBox(B, tr * 2 + 1.4, 0.9, 1.2, 0x4E6E3A, "earth", t[0], g, t[1] + tr + 0.6);
}
grBox(B, tr * 1.4, 1.4, tr * 1.4, roof[0], roof[1], t[0], t[2] + 0.7, t[1]);
}
});
if (S.k === "future" && !grLite())
for (var p = -1; p <= 1; p += 2)
grBox(B, w * 0.36, 0.8, d * 0.3, 0x4E6E3A, "earth", p * w * 0.24, hb + 0.9, d * 0.2);
return { top: hb };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var E = R.env || {}, rock = E.rock || 0x4A443E, tx = S.k === "ice" ? "snow" : "stone", rr = wRand(grHash(b.n + "crag"));
var crag = function (x, y, z, sx, sy, sz) { var m = grBox(B, sx, sy, sz, grTint(rock, b.n + x + z, 0.12), tx, x, y, z); m.rotation.set((rr() - 0.5) * 0.18, (rr() - 0.5) * 0.4, (rr() - 0.5) * 0.18); return m; };
crag(0, h * 0.6, -d * 0.22, w * 0.96, h * 1.2, d * 0.62);
[-1, 1].forEach(function (sd) { crag(sd * w * 0.42, h * 0.5, 0, w * 0.24, h * 1.0, d * 0.9); crag(sd * w * 0.3, h * 0.85, -d * 0.3, w * 0.3, h * 1.5, d * 0.4); });
for (var j = 0; j < (grLite() ? 3 : 7); j++) {
var jx = (rr() - 0.5) * w * 0.9, jh = 3 + rr() * h * 0.5;
grCone(B, 2 + rr() * 3, jh, grTint(rock, b.n + "j" + j, 0.12), tx, jx, h * 1.15 + jh / 2 - 1, -d * 0.25 + (rr() - 0.5) * d * 0.3, 5);
}
grBox(B, w * 0.62, h, 1.6, wall[0], wall[1], 0, h / 2, d / 2 - 0.6);
var fl = Math.max(2, Math.round(h / 5.5));
for (var f = 0; f < fl; f++)
grWinFace(B, S, w * 0.56, 1 + (f + 0.55) * (h - 1) / fl, d / 2 + 0.26, Math.min(2.2, (h - 1) / fl * 0.5), f === 0);
[-1, 1].forEach(function (sd) { grBox(B, 1.6, h + 0.6, 1.8, trim[0], trim[1], sd * w * 0.32, h / 2, d / 2 + 0.1); grBox(B, 1.2, h * 0.9, 1.4, trim[0], trim[1], sd * w * 0.14, h * 0.45, d / 2 + 0.2); });
grBox(B, w * 0.7, 1.4, 2.4, trim[0], trim[1], 0, h + 0.3, d / 2 - 0.4);
return { top: h, noRoof: true };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var hb = h * 0.75, lf = (grLook(R).leaf) || 0x3E6A34, fae = S.k === "fae";
grBox(B, w, hb, d, wall[0], wall[1], 0, hb / 2, 0);
grBox(B, w + 0.6, 0.4, d + 0.6, trim[0], trim[1], 0, hb, 0);
var fl = Math.max(2, Math.round(hb / 5));
for (var f = 0; f < fl; f++)
grWinFace(B, S, w - 2, 1 + (f + 0.55) * (hb - 1) / fl, d / 2 + 0.06, Math.min(1.8, (hb - 1) / fl * 0.5), f === 0);
for (var x = -w / 2; x <= w / 2; x += w / 4)
grBox(B, 0.5, hb, 0.3, trim[0], "wood", x, hb / 2, d / 2 + 0.12);
grRoof(B, w + 1.4, Math.min(8, d * 0.4), d + 1.4, roof[0], roof[1], 0, hb + 0.2, 0);
var tr = grand ? 7 : 4.6, th = h * (grand ? 3 : 2.3), tz = -d * 0.32;
grCyl(B, tr * 0.8, tr * 1.25, th, 0x5A4430, "bark", 0, th / 2, tz, 12);
(B.userData.solids = B.userData.solids || []).push({ x: 0, z: tz, r: tr * 1.3 + 3.4 });
for (var k = 0; k < 6; k++) {
var a = k / 6 * Math.PI * 2;
var rt = grCone(B, 1.4, 7, 0x5A4430, "bark", Math.cos(a) * tr * 1.3, 1.2, tz + Math.sin(a) * tr * 1.3, 6);
rt.rotation.z = Math.cos(a) * 1.1;
rt.rotation.x = -Math.sin(a) * 1.1;
}
var rr = wRand(grHash(b.n + "leaf")), n = grLite() ? 4 : 7;
for (var c = 0; c < n; c++) {
var a2 = c / n * Math.PI * 2, cr = (grand ? 12 : 8) + rr() * 4;
grSph(B, cr, grTint(lf, b.n + c, 0.12), null, Math.cos(a2) * cr * 0.9, th + rr() * 4, tz + Math.sin(a2) * cr * 0.7, 9);
}
grSph(B, grand ? 14 : 9, lf, null, 0, th + 6, tz, 9);
if (fae && !grLite())
for (var g = 0; g < 5; g++) {
var a3 = g / 5 * Math.PI * 2;
grSph(B, 0.4, S.glow, null, Math.cos(a3) * tr * 1.6, th * 0.55 + g * 1.5, tz + Math.sin(a3) * tr * 1.6, 6, { glow: true });
}
return { top: hb };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var r = d / 2, hb = h * 0.55;
grCyl(B, r, r * 1.06, hb, wall[0], wall[1], 0, hb / 2, 0, 24);
grDome(B, r, roof[0], roof[1], 0, hb, 0, 24).scale.y = 0.45;
grWinRing(B, S, r * 1.03, hb * 0.5, 14, Math.min(2.2, hb * 0.35), 0, 0, true);
var turns = grand ? 9 : 6, y = hb + r * 0.3, rr = r * 0.62;
for (var t = 0; t < turns; t++) {
var a = t * 0.9, cr = rr * (1 - t / (turns + 1.5)), seg = grCyl(B, cr, cr * 1.08, h * 0.32, t % 2 ? roof[0] : wall[0], null, Math.cos(a) * cr * 0.25, y + h * 0.16, -d * 0.08 + Math.sin(a) * cr * 0.25, 16);
seg.rotation.y = a;
y += h * 0.26;
}
grCone(B, rr * 0.3, 6, roof[0], null, 0, y + 3, -d * 0.08, 10);
[-1, 1].forEach(function (sd) { var px = sd * (w / 2 - 4.2); grCyl(B, 1.2, 3, hb * 1.3, roof[0], null, px, hb * 0.65, -d * 0.12, 10); });
return { top: hb };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var h1 = h * 0.42, h2 = h * 0.58, wd = 0x4A3422;
grBox(B, w, h1, d, S.k === "ice" ? wall[0] : 0x8A8276, "stone", 0, h1 / 2, 0);
grWinFace(B, S, w - 2, h1 * 0.55, d / 2 + 0.06, Math.min(2, h1 * 0.4), true);
grBox(B, w + 1.6, h2, d + 1.6, wall[0], wall[1], 0, h1 + h2 / 2, 0);
for (var x = -w / 2 - 0.8; x <= w / 2 + 0.9; x += 3.2)
grBox(B, 0.35, h2, 0.25, wd, "wood", x, h1 + h2 / 2, d / 2 + 0.86);
grBox(B, w + 1.6, 0.35, 0.25, wd, "wood", 0, h1 + 0.2, d / 2 + 0.86);
grBox(B, w + 1.6, 0.35, 0.25, wd, "wood", 0, h1 + h2 - 0.2, d / 2 + 0.86);
for (var i = 0; i < Math.floor(w / 6.4); i++) {
var u = -w / 2 + 3.2 + i * 6.4;
var br = grBox(B, 0.25, h2 * 0.9, 0.2, wd, "wood", u + 1.6, h1 + h2 / 2, d / 2 + 0.9);
br.rotation.z = 0.6;
}
grWinFace(B, S, w - 1, h1 + h2 * 0.5, d / 2 + 0.98, Math.min(1.8, h2 * 0.35));
var rh = Math.min(12, d * 0.62);
grRoof(B, w + 2.4, rh, d + 2.6, roof[0], roof[1], 0, h, 0);
for (var dm = -1; dm <= 1; dm += 2) {
grBox(B, 3, 2.6, 3, wall[0], wall[1], dm * w * 0.25, h + 2, d * 0.18);
grRoof(B, 3.4, 1.6, 3.6, roof[0], roof[1], dm * w * 0.25, h + 3.3, d * 0.18).rotation.y = Math.PI / 2;
}
grBox(B, 1.4, 4, 1.4, 0x7A4A3A, "brick", w * 0.3, h + rh * 0.6, -d * 0.15);
if (S.k === "ice" || grLook(R).snow)
grRoof(B, w + 2.5, rh * 0.35, d + 2.7, 0xD8DEE4, "snow", 0, h + rh * 0.62, 0);
return { top: h, noRoof: true };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
grBox(B, w, h - 1, d, wall[0], wall[1], 0, 0.5 + (h - 1) / 2, 0);
grBox(B, w + 1, 0.7, d + 1, trim[0], trim[1], 0, h + 0.2, 0);
var fl = Math.max(2, Math.round(h / 5.5));
for (var f = 0; f < fl; f++)
grWinFace(B, S, w - 2, 1 + (f + 0.55) * (h - 1) / fl, d / 2 + 0.06, Math.min(2.2, (h - 1) / fl * 0.5), f === 0);
var kl = grCone(B, Math.max(w, d) * 0.62, h * 1.6, (R.env && R.env.rock) || 0x6A5E50, "stone", 0, -h * 0.8 - 0.4, 0, 9);
kl.rotation.x = Math.PI;
var gb = grLook(R).bag || S.accent, n = grand ? 3 : (w > 44 ? 2 : 1);
for (var i = 0; i < n; i++) {
var bx = n === 1 ? 0 : (i / (n - 1) - 0.5) * w * 0.6, by = h + 14 + (i % 2) * 3;
var bag = grSph(B, 1, grTint(gb, b.n + i, 0.08), null, bx, by, 0, 18);
bag.scale.set(Math.min(14, w * 0.3), 6, Math.min(9, d * 0.3));
[-1, 1].forEach(function (sd) { var cb = grCyl(B, 0.06, 0.06, 12, 0x3A3A3A, "metal", bx + sd * 5, h + 6, 0, 4); cb.rotation.z = sd * 0.25; });
}
return { top: h + 0.55, roof: "flat" };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var hb = h * 0.5;
grBox(B, w, hb, d, wall[0], wall[1], 0, hb / 2, 0);
grWinFace(B, S, w - 2, hb * 0.55, d / 2 + 0.06, Math.min(2, hb * 0.4), true);
for (var c = -w / 2; c <= w / 2 + 0.1; c += w / 6)
grCyl(B, 0.45, 0.45, hb, trim[0], "wood", c, hb / 2, d / 2 + 0.6, 8);
var y = hb, tw = w + 5, td = d + 5, n = grand ? 5 : 3;
for (var t = 0; t < n; t++) {
grTier(B, tw, td, y, roof);
y += 2.6;
if (t < n - 1) {
var bw = tw * 0.62, bd = td * 0.62;
grBox(B, bw, 3.4, bd, wall[0], wall[1], 0, y + 1.7, 0);
y += 3.4;
tw = bw + 3;
td = bd + 3;
}
}
grCyl(B, 0.3, 0.5, 6, trim[0], "metal", 0, y + 3, 0, 8);
for (var r = 0; r < 5; r++)
grMesh(new THREE.TorusGeometry(0.7, 0.12, 4, 12), grMat(0xB8964A, "metal"), 0, y + 1 + r * 0.9, 0, B).rotation.x = Math.PI / 2;
return { top: hb, noRoof: true };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var hb = h * 0.7;
grBox(B, w, hb, d, wall[0], wall[1], 0, hb / 2, 0);
grBox(B, w + 1, 0.8, d + 1, trim[0], trim[1], 0, hb + 0.4, 0);
var n = Math.floor(w / 4);
for (var i = 0; i < n; i++) {
var u = -w / 2 + (i + 0.5) * w / n;
if (Math.abs(u) < 4)
continue;
grBox(B, 1.8, 3.4, 0.4, 0x2A2A2C, null, u, hb * 0.5, d / 2 + 0.05);
grCyl(B, 0.9, 0.9, 0.4, 0x2A2A2C, null, u, hb * 0.5 + 1.7, d / 2 + 0.05, 10).rotation.x = Math.PI / 2;
grSph(B, 0.35, 0xF0B060, null, u, hb * 0.5 - 0.6, d / 2 + 0.3, 8, { glow: true });
}
grDome(B, Math.min(w, d) * 0.3, roof[0], roof[1], 0, hb + 0.8, 0, 20);
grCyl(B, 0.3, 0.4, 2.4, trim[0], trim[1], 0, hb + 0.8 + Math.min(w, d) * 0.3 + 1.2, 0, 8);
grSph(B, 0.55, 0xF0B060, null, 0, hb + 0.8 + Math.min(w, d) * 0.3 + 2.8, 0, 8, { glow: true });
if (!grLite())
for (var m = -2; m <= 2; m++) {
if (!m)
continue;
grBox(B, 2.2, 0.5, 0.8, 0x5A4A3A, "wood", m * w / 6, 0.25, d / 2 + 1.2);
for (var f = 0; f < 4; f++)
grSph(B, 0.28, 0xE88A2A, null, m * w / 6 - 0.75 + f * 0.5, 0.65, d / 2 + 1.2, 6);
}
return { top: hb + 0.8, noRoof: true };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
grBox(B, w, h - 1, d, wall[0], wall[1], 0, 0.5 + (h - 1) / 2, 0);
grBox(B, w + 1.2, 0.8, d + 1.2, trim[0], trim[1], 0, 1, 0);
for (var u = -w / 2 + 2; u < w / 2 - 1; u += 3) {
if (Math.abs(u) < 4)
continue;
grBox(B, 0.3, 1.8, 0.08, 0x1A1612, null, u, h * 0.55, d / 2 + 0.05);
grBox(B, 0.3, 1.8, 0.08, 0x1A1612, null, u, h * 0.25 + 1, d / 2 + 0.05);
}
grParapet(B, w, d, h, trim, true);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
var x = q[0] * w / 2, z = q[1] * d / 2, r = grand ? 4.2 : 3, th = h + (grand ? 10 : 6);
grCyl(B, r, r * 1.12, th, wall[0], wall[1], x, th / 2, z, 12);
grCyl(B, r + 0.5, r + 0.5, 0.7, trim[0], trim[1], x, th, z, 12);
for (var m = 0; m < 8; m += 2) {
var a = m / 8 * Math.PI * 2;
grBox(B, 1.1, 1.2, 1.1, trim[0], trim[1], x + Math.cos(a) * r, th + 0.9, z + Math.sin(a) * r);
}
grCyl(B, 0.08, 0.08, 5, 0x6A6A6A, "metal", x, th + 3, z, 5);
grBox(B, 2, 1.2, 0.05, S.accent, null, x + 1, th + 4.6, z);
});
return { top: h, noRoof: true };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
grBox(B, w, h - 1, d, wall[0], wall[1], 0, 0.5 + (h - 1) / 2, 0);
var rr = wRand(grHash(b.n + "patch")), cols = [0x7A5A3A, 0x5A6A6E, 0x8A6A4A, 0x6A6A5A, 0x4E5E52];
for (var i = 0; i < (grLite() ? 8 : 20); i++) {
var px = (rr() - 0.5) * (w - 4), py = 1.5 + rr() * (h - 4);
grBox(B, 3 + rr() * 6, 2 + rr() * 4, 0.14, cols[i % cols.length], "metal", px, py, d / 2 + 0.08);
}
for (var i2 = 0; i2 < (grLite() ? 4 : 10); i2++) {
var pz = (rr() - 0.5) * (d - 4), py2 = 1.5 + rr() * (h - 4), sd2 = i2 % 2 ? 1 : -1;
grBox(B, 0.14, 2 + rr() * 4, 3 + rr() * 6, cols[(i2 + 2) % cols.length], "metal", sd2 * (w / 2 + 0.08), py2, pz);
}
grBox(B, w * 0.3, h * 0.5, 4, 0x5A4E40, "wood", -w * 0.32, h * 0.25, d / 2 + 2);
grBox(B, w * 0.32, 0.2, 5, 0x7A6E60, "metalroof", -w * 0.32, h * 0.5 + 0.1, d / 2 + 2);
grWinFace(B, S, w - 3, h * 0.55, d / 2 + 0.16, 1.6, true);
var rf = grBox(B, w + 1.4, 0.3, d + 1.4, 0x8A8478, "metalroof", 0, h + 0.6, 0);
rf.rotation.z = 0.06;
grCyl(B, 2.2, 2.2, 4, 0x6A7A7E, "metal", -w * 0.3, h + 2.8, -d * 0.2, 14);
[-1, 1].forEach(function (sd) { grBox(B, 0.3, 3, 0.3, 0x4A3A2A, "wood", -w * 0.3 + sd * 1.6, h + 1.2, -d * 0.2); });
var sp = grBox(B, 6, 0.15, 4, 0x24344A, null, w * 0.25, h + 1.6, 0);
sp.rotation.x = -0.45;
grBox(B, 0.6, 0.6, 8, 0x6A5A4A, "metal", w / 2 + 0.3, h * 0.6, 0);
return { top: h + 0.6, noRoof: true };
},
function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
grBox(B, w * 0.7, h - 1, d, wall[0], wall[1], 0, 0.5 + (h - 1) / 2, 0);
grBox(B, w * 0.7 + 1, 0.7, d + 1, trim[0], trim[1], 0, h + 0.2, 0);
var fl = Math.max(2, Math.round(h / 5.5));
for (var f = 0; f < fl; f++)
grWinFace(B, S, w * 0.7 - 2, 1 + (f + 0.55) * (h - 1) / fl, d / 2 + 0.06, Math.min(2.2, (h - 1) / fl * 0.5), f === 0);
[-1, 1].forEach(function (sd) {
var x = sd * (w / 2 - 4), th = h * (grand ? 2.4 : 1.8);
grCyl(B, 4, 4.2, th, wall[0], wall[1], x, th / 2, 0, 16);
grCone(B, 4.4, th * 0.35, roof[0], roof[1], x, th + th * 0.175, 0, 16);
for (var y = 4; y < th - 2; y += 6)
grWinRing(B, S, 4.05, y, 8, 1.6, x, 0);
});
grDome(B, w * 0.18, roof[0], roof[1], 0, h + 0.5, 0, 20);
return { top: h + 0.55, noRoof: true };
},
function (P, R, S, x, z, rot, sc) {
var F = S.form, B = new THREE.Group();
B.position.set(x, 0, z);
B.rotation.y = rot || 0;
if (sc && sc !== 1)
B.scale.setScalar(sc);
var rr = wRand(grHash(R.id + x + ":" + z)), tint = new THREE.Color(S.wall[0]).offsetHSL(0, 0, (rr() - 0.5) * 0.08).getHex(), gm = grMat(S.glow, null, { glow: true });
var AL = (typeof AUP !== "undefined" && AUP.on && typeof aupWindow === "function" && S.k !== "station" && S.k !== "future") ? [] : null;
var win = function (px, py, pz, ry) {
if (AL) {
aupWindow(AL, px, py, pz, ry || 0, 1.1, 1.3, 0.02, 0xF2EEE4, false);
if (rr() > 0.34)
return;
}
var m = new THREE.Mesh(new THREE.PlaneGeometry(AL ? 0.9 : 1.1, AL ? 1.08 : 1.3), gm);
m.position.set(px + (AL ? Math.sin(ry || 0) * 0.05 : 0), py, pz + (AL ? Math.cos(ry || 0) * 0.05 : 0));
if (ry)
m.rotation.y = ry;
B.add(m);
};
var r = 4.6, foot = 5.2;
if (F === "pod" || F === "round" || F === "shell") {
var hh = F === "round" ? 5 : 3.4;
grCyl(B, r, r * 1.05, hh, tint, S.wall[1], 0, hh / 2, 0, 18);
var dm = grDome(B, r, S.roof[0], S.roof[1], 0, hh, 0, 18);
if (F === "shell")
dm.scale.y = 1.3;
grBox(B, 1.4, 2.3, 0.6, 0x2E2A26, null, 0, 1.15, r - 0.1);
win(-2.6, 2, r * 0.8, 0.6);
win(2.6, 2, r * 0.8, -0.6);
}
else if (F === "stepped") {
grBox(B, 8.4, 4.2, 9, tint, S.wall[1], 0, 2.1, 0);
grBox(B, 5.4, 3, 6, tint, S.wall[1], -1, 5.7, -1);
grBox(B, 8.8, 0.3, 9.4, S.trim[0], S.trim[1], 0, 4.25, 0);
grBox(B, 1.3, 2.3, 0.2, 0x3A2A1E, "wood", -1.6, 1.15, 4.55);
win(1.8, 2.2, 4.56);
win(0.2, 5.6, 2.06);
}
else if (F === "tree") {
grCyl(B, 1.5, 2.1, 14, 0x5A4430, "bark", 0, 7, 0, 10);
grBox(B, 8, 0.5, 8, 0x5A3E26, "wood", 0, 6.2, 0);
grBox(B, 6.4, 3.4, 6.4, tint, S.wall[1], 0, 8.1, 0);
grRoof(B, 7, 2.6, 7, S.roof[0], S.roof[1], 0, 9.8, 0);
grSph(B, 6, (grLook(R).leaf) || 0x3E6A34, null, 0, 15, 0, 8);
for (var k = 0; k < 10; k++)
grBox(B, 1.2, 0.12, 0.3, 0x5A3E26, "wood", 2.6, 0.4 + k * 0.6, 4.2);
grBox(B, 0.12, 6.2, 0.12, 0x5A3E26, "wood", 2, 3.1, 4.2);
grBox(B, 0.12, 6.2, 0.12, 0x5A3E26, "wood", 3.2, 3.1, 4.2);
win(-1.4, 8.4, 3.22);
win(1.4, 8.4, 3.22);
r = 2.4;
foot = 2.6;
}
else if (F === "carved") {
var E = R.env || {};
var m = grMesh(grRockGeo(5), grMat(E.rock || 0x4A443E, S.k === "ice" ? "snow" : "stone"), 0, 3.6, -1, B);
m.scale.set(6, 5.2, 5);
grBox(B, 6.4, 5, 0.8, tint, S.wall[1], 0, 2.5, 3.4);
grBox(B, 1.3, 2.3, 0.2, 0x2E2A26, null, -1.4, 1.15, 3.85);
win(1.6, 2.4, 3.86);
win(-1.4, 4, 3.86);
}
else if (F === "crypt") {
grBox(B, 7, 4.4, 8, tint, S.wall[1], 0, 2.2, 0);
grRoof(B, 7.6, 2.4, 8.6, S.roof[0], S.roof[1], 0, 4.4, 0);
grBox(B, 1.3, 2.3, 0.2, 0x3A2A1E, "wood", 0, 1.15, 4.05);
grSph(B, 0.3, 0xF0B060, null, 1.4, 2.6, 4.25, 8, { glow: true });
grSph(B, 0.3, 0xF0B060, null, -1.4, 2.6, 4.25, 8, { glow: true });
}
else if (F === "salvage") {
grBox(B, 7.6, 4.4, 8.4, tint, S.wall[1], 0, 2.2, 0);
var rf = grBox(B, 8.6, 0.25, 9.2, 0x8A8478, "metalroof", 0, 4.6, 0);
rf.rotation.z = 0.08;
grBox(B, 2.4, 1.6, 0.1, 0x7A5A3A, "metal", 2, 2.6, 4.25);
grBox(B, 1.3, 2.3, 0.2, 0x3A3A36, "metal", -1.8, 1.15, 4.25);
win(2, 2.6, 4.31);
grCyl(B, 1, 1, 1.8, 0x6A7A7E, "metal", -2.6, 5.6, -2.2, 10);
}
else if (F === "tower" && S.k === "crystal") {
var ch = 6 + rr() * 3;
grCyl(B, 4.4, 4.6, ch, tint, S.wall[1], 0, ch / 2, 0, 6);
grCone(B, 4.6, 5 + rr() * 4, S.roof[0], null, 0, ch + 3, 0, 6, { op: 0.9 });
grBox(B, 1.3, 2.3, 0.4, 0x2E2A36, null, 0, 1.15, 3.95);
win(-2.2, 2.6, 3.6, 0.5);
win(2.2, 2.6, 3.6, -0.5);
}
else if (F === "tower") {
var th = 10 + Math.floor(rr() * 3) * 3.2;
grBox(B, 8.4, th, 9, tint, S.wall[1], 0, th / 2, 0);
grBox(B, 8.8, 0.4, 9.4, S.trim[0], S.trim[1], 0, th, 0);
for (var y = 2; y < th - 1; y += 3.2) {
win(-2.2, y, 4.56);
win(2.2, y, 4.56);
if (y > 4)
grBox(B, 8.6, 0.2, 1.2, S.trim[0], S.trim[1], 0, y - 1.2, 5.1);
}
if (S.k === "future") {
grBox(B, 7.6, 0.8, 8, 0x4E6E3A, "earth", 0, th + 0.6, 0);
for (var tq = 0; tq < 3; tq++)
grSph(B, 1.1, 0x5A8A4A, null, -2.4 + tq * 2.4, th + 1.6, (tq - 1) * 1.8, 7);
}
}
else if (F === "pagoda") {
grBox(B, 8, 4, 8, tint, S.wall[1], 0, 2, 0);
grTier(B, 10, 10, 4, S.roof);
grBox(B, 5, 2.4, 5, tint, S.wall[1], 0, 7.8, 0);
grTier(B, 7, 7, 9, S.roof);
grBox(B, 1.4, 2.4, 0.2, 0x6A2A1E, "wood", 0, 1.2, 4.05);
win(-2.6, 2.4, 4.06);
win(2.6, 2.4, 4.06);
}
else if (F === "fortress") {
grBox(B, 8.4, 6, 9, tint, S.wall[1], 0, 3, 0);
for (var mm = -3; mm <= 3; mm += 2)
grBox(B, 1, 1, 1, S.trim[0], S.trim[1], mm, 6.5, 4.2);
grBox(B, 1.3, 2.3, 0.2, 0x2E2620, "wood", 0, 1.15, 4.55);
grBox(B, 0.3, 1.4, 0.06, 0x1A1612, null, 2.4, 3.6, 4.53);
grBox(B, 0.3, 1.4, 0.06, 0x1A1612, null, -2.4, 3.6, 4.53);
}
else {
var hh2 = F === "timber" ? 7 : 8 + Math.floor(rr() * 3) * 1.6;
if (F === "timber") {
grBox(B, 8.4, 3.4, 10, 0x8A8276, "stone", 0, 1.7, 0);
grBox(B, 9.2, 3.6, 10.8, tint, S.wall[1], 0, 5.2, 0);
for (var bx = -4.6; bx <= 4.7; bx += 2.3)
grBox(B, 0.3, 3.6, 0.2, 0x4A3422, "wood", bx, 5.2, 5.45);
grRoof(B, 9.8, 4.6, 11.4, S.roof[0], S.roof[1], 0, 7, 0);
if (S.k === "ice" || grLook(R).snow)
grRoof(B, 9.9, 1.6, 11.5, 0xD8DEE4, "snow", 0, 9.1, 0);
}
else {
grBox(B, 8.4, hh2, 10, tint, S.wall[1], 0, hh2 / 2, 0);
grBox(B, 8.8, 0.4, 10.4, S.trim[0], S.trim[1], 0, hh2, 0);
if (S.roofKind === "pitched" || S.roofKind === "spire")
grRoof(B, 8.8, 3.4, 10.4, S.roof[0], S.roof[1], 0, hh2 + 0.2, 0);
else if (S.roofKind === "tiered")
grTier(B, 9.6, 11, hh2, S.roof);
else
grBox(B, 8.8, 0.8, 10.4, S.trim[0], S.trim[1], 0, hh2 + 0.6, 0);
if (F === "float") {
var bg = grSph(B, 1, (grLook(R).bag) || S.accent, null, 0, hh2 + 7, 0, 12);
bg.scale.set(4, 2.4, 3);
}
}
grBox(B, 1.4, 2.4, 0.2, 0x3A2A1E, "wood", -2, 1.2, F === "timber" ? 5.05 : 5.05);
win(2.4, 2, 5.1);
win(-2, 5.4, F === "timber" ? 5.46 : 5.1);
win(2.4, 5.4, F === "timber" ? 5.46 : 5.1);
}
if (AL && AL.length)
aupPlace(B, AL);
P.add(B);
GR.solids.push({ x: x, z: z, hw: (sc || 1) * foot, hd: (sc || 1) * foot, rot: rot || 0, h: 16 });
GR.taken.push({ x: x, z: z, r: (sc || 1) * 6 });
if (R.layout === "isles")
GR.isles.push({ x: x, z: z, r: (sc || 1) * 7.5 });
return B;
},
function (P, R, S, x, z, rnd) {
var r = 6 + rnd() * 9, E = R.env || {}, c = E.groundCol || 0x6E6A64;
grMesh(new THREE.TorusGeometry(r, r * 0.18, 5, 24), grMat(new THREE.Color(c).multiplyScalar(1.12).getHex(), E.groundTex || "concrete"), x, 0.15, z, P).rotation.x = Math.PI / 2;
grCyl(P, r * 0.9, r * 0.9, 0.08, new THREE.Color(c).multiplyScalar(0.8).getHex(), E.groundTex || "concrete", x, 0.02, z, 24);
return { r: r + r * 0.2, solid: false };
},
function (P, R, S, x, z, rnd) {
var c = (grLook(R).crys) || S.glow, n = 4 + Math.floor(rnd() * 4);
for (var i = 0; i < n; i++) {
var h = 2 + rnd() * 6, m = grCyl(P, 0.08, 0.5 + rnd() * 0.6, h, c, null, x + (rnd() - 0.5) * 3, h / 2, z + (rnd() - 0.5) * 3, 6, { op: 0.86 });
m.rotation.set((rnd() - 0.5) * 0.5, rnd() * 3, (rnd() - 0.5) * 0.5);
}
if (!grLite())
grGlow(P, c, 6, 0.16, x, 2.5, z);
return { r: 3, solid: true };
},
function (P, R, S, x, z, rnd) {
var G = new THREE.Group();
G.position.set(x, 0, z);
G.rotation.y = rnd() * 6;
grBox(G, 3.6, 1, 2.2, 0xB8B4AA, "metal", 0, 1.2, 0);
grBox(G, 1.4, 0.9, 1.8, 0x8A8E94, "metal", 0.8, 2.1, 0);
[-1.2, 0, 1.2].forEach(function (u) { [-1, 1].forEach(function (sd) { var wh = grCyl(G, 0.5, 0.5, 0.4, 0x3A3A3A, null, u, 0.5, sd * 1.25, 10); wh.rotation.x = Math.PI / 2; }); });
P.add(G);
return { r: 3, solid: true };
},
function (P, R, S, x, z, rnd) {
grCyl(P, 0.4, 0.7, 22, 0xB0B0B0, "metal", x, 11, z, 8);
var hub = new THREE.Group();
hub.position.set(x, 22, z + 0.8);
hub.rotation.z = rnd() * 2;
for (var i = 0; i < 3; i++) {
var bl = grBox(hub, 0.6, 9, 0.2, 0xC0C0C0, "metal", 0, 4.5, 0);
bl.position.set(Math.sin(i * 2.094) * 4.5, Math.cos(i * 2.094) * 4.5, 0);
bl.rotation.z = -i * 2.094;
}
P.add(hub);
return { r: 2, solid: true };
},
function (P, R, S, x, z, rnd) {
var cs = [0xD86A5A, 0xE0A060, 0xB85A8A, 0xE8C0A0], c = cs[Math.floor(rnd() * 4)];
for (var i = 0; i < 6; i++) {
var h = 1.5 + rnd() * 3.5, m = grCyl(P, 0.15, 0.35, h, c, null, x + (rnd() - 0.5) * 2.4, h / 2, z + (rnd() - 0.5) * 2.4, 6);
m.rotation.set((rnd() - 0.5) * 0.8, 0, (rnd() - 0.5) * 0.8);
grSph(P, 0.4, c, null, m.position.x, h, m.position.z, 6);
}
return { r: 2.6, solid: true };
},
function (P, R, S, x, z, rnd) {
var y = 18 + rnd() * 20, G = new THREE.Group();
G.position.set(x, y, z);
G.rotation.y = rnd() * 6;
var bag = grSph(G, 1, (grLook(R).bag) || S.accent, null, 0, 0, 0, 16);
bag.scale.set(14, 4.4, 4.4);
grBox(G, 6, 1.6, 2.4, 0x5A3E26, "wood", 0, -5.6, 0);
grCyl(G, 0.05, 0.05, 3.6, 0x3A3A3A, "metal", -2.4, -3.4, 0, 4);
grCyl(G, 0.05, 0.05, 3.6, 0x3A3A3A, "metal", 2.4, -3.4, 0, 4);
P.add(G);
return { r: 0, solid: false, sky: true };
},
function (P, R, S, x, z, rnd) {
var G = new THREE.Group();
G.position.set(x, -1.6, z);
G.rotation.y = rnd() * 6;
grBox(G, 7, 1.4, 2.6, 0x6A4A2E, "wood", 0, 0.7, 0);
grBox(G, 1.6, 1.2, 2.2, 0xD8D0C0, "plaster", -1.4, 2, 0);
grCyl(G, 0.1, 0.12, 7, 0x5A3E26, "wood", 1.2, 4.2, 0, 6);
var sl = grBox(G, 0.06, 4.6, 3.2, 0xE8E0D0, null, 1.3, 4.6, 0);
sl.rotation.y = Math.PI / 2;
P.add(G);
return { r: 0, solid: false, sky: true };
},
function (P, R, S, x, z, rnd) {
var G = new THREE.Group();
G.position.set(x, 0, z);
G.rotation.y = rnd() * 6;
grBox(G, 4.2, 1, 1.8, 0x7A4A2E, "metal", 0, 0.7, 0);
grBox(G, 2.2, 0.8, 1.6, 0x6A3E26, "metal", -0.2, 1.6, 0);
[-1.4, 1.4].forEach(function (u) { [-1, 1].forEach(function (sd) { var wh = grCyl(G, 0.4, 0.4, 0.3, 0x2A2826, null, u, 0.4, sd * 0.9, 8); wh.rotation.x = Math.PI / 2; }); });
grBox(G, 0.6, 0.5, 1.4, 0x3A6A3A, null, 1.6, 1.4, 0);
P.add(G);
return { r: 2.6, solid: true };
},
function (P, R, S, x, z, rnd) {
var G = new THREE.Group();
G.position.set(x, 0, z);
G.rotation.y = Math.PI / 2 * (rnd() < 0.5 ? 0 : 1);
[-0.8, 0.8].forEach(function (u) { grBox(G, 0.15, 0.1, 24, 0x8A8E94, "metal", u, 0.05, 0); });
grBox(G, 2.6, 2.8, 10, 0xC8C4BA, "metal", 0, 1.9, 0);
grBox(G, 2.62, 0.9, 9, 0x2A4E6E, null, 0, 2.4, 0);
grBox(G, 2.62, 0.9, 8, S.glow, null, 0, 2.4, 0, 0, { glow: true });
P.add(G);
return { r: 12, solid: true, hw: 1.6, hd: 5.2 };
},
function (G, P, R, S) {
var L = grLook(R), rnd = wRand(grHash(R.id) + 404), lite = grLite();
(L.decor || []).forEach(function (dk) {
var kind = dk[0], f = GR_DECOR[kind], kitA = null, kitS = 1;
if (!f && GR_KIT_DECOR[kind]) {
kitA = GR_KIT_DECOR[kind][0];
kitS = GR_KIT_DECOR[kind][1];
f = GR_DECOR.kit;
}
if (!f)
return;
var sky = kind === "cloud" || kind === "floatrock" || kind === "airship" || kind === "boat" || kind === "sails";
var n = sky ? (lite ? Math.ceil(dk[1] * 0.45) : dk[1]) : (lite ? Math.ceil(dk[1] * 0.75) : Math.round(dk[1] * 2.5));
for (var i = 0; i < n; i++) {
var at;
if (sky) {
var B = GR_AT.bound, out = kind === "boat" || kind === "sails";
for (var t = 0; t < 20; t++) {
var x = B.x0 - 60 + rnd() * (B.x1 - B.x0 + 120), z = B.z0 - 60 + rnd() * (B.z1 - B.z0 + 120);
if (!out || !grOnIsle(x, z)) {
if (!out || (Math.abs(x) > 16 || z < -130 || z > 292)) {
at = { x: x, z: z };
break;
}
}
}
}
else
at = grFindFree(rnd, kind === "orchard" ? 11 : kind === "tram" ? 12 : kind === "crater" ? 14 : 5, 30, dk[2]);
if (!at)
continue;
var o = f(P, R, S, at.x, at.z, rnd, kitA, kitS) || { r: 3, solid: true };
if (o.sky)
continue;
GR.taken.push({ x: at.x, z: at.z, r: o.r });
if (o.solid)
GR.solids.push(o.hw ? { x: at.x, z: at.z, hw: o.hw, hd: o.hd } : { x: at.x, z: at.z, r: Math.max(0.6, o.r * 0.6) });
}
});
},
function (G, P, R, S) {
var L = grLook(R), pt = L.pastime;
if (!pt)
return;
var rnd = wRand(grHash(R.id) + 909), at = null;
if (pt.at)
at = { x: pt.at[0], z: pt.at[1] };
if (!at || !grFree(at.x, at.z, 6))
at = grFindFree(rnd, 7, 60, { x: pt.near ? pt.near[0] : -60, z: pt.near ? pt.near[1] : 170, r0: 0, r1: 120 }) || grFindFree(rnd, 7, 80);
if (!at && R.layout === "isles") {
at = { x: -120, z: 150 };
GR.isles.push({ x: at.x, z: at.z, r: 12 }, { x0: -123, x1: -117, z0: 86, z1: 140 });
grCyl(P, 12, 12, 0.6, S.trim[0], S.trim[1], at.x, -0.28, at.z, 24);
grBox(P, 6, 0.6, 54, S.trim[0], S.trim[1], -120, -0.28, 113);
[-1, 1].forEach(function (sd) { grBox(P, 0.25, 1.1, 54, S.trim[0], "metal", -120 + sd * 3, 0.55, 113); GR.solids.push({ x: -120 + sd * 3.2, z: 113, hw: 0.2, hd: 26 }); });
}
if (!at)
return;
var x = at.x, z = at.z, k = pt.look || "board";
if (k === "pier") {
grBox(P, 4, 0.5, 18, 0x6A4A2E, "wood", x, 0.3, z);
GR.plats.push({ x0: x - 2, x1: x + 2, z0: z - 9, z1: z + 9, h: 0.55 });
for (var i = 0; i < 6; i++)
[-1, 1].forEach(function (sd) { grCyl(P, 0.2, 0.2, 4, 0x5A3E26, "wood", x + sd * 1.8, -1, z - 8 + i * 3.2, 6); });
grCyl(P, 0.6, 0.5, 0.8, 0x6A4A2E, "wood", x + 1.2, 0.95, z + 7, 8);
}
else if (k === "lookout") {
grCyl(P, 3, 3.4, 10, S.wall[0], S.wall[1], x, 5, z, 12);
GR.solids.push({ x: x, z: z, r: 3.4, h: 11 });
grCyl(P, 4, 4, 0.6, S.trim[0], S.trim[1], x, 10.3, z, 12);
grKit(P, "orrery", x, 10.6, z, 0, 0.6);
}
else if (k === "garden") {
for (var g = 0; g < 4; g++)
grBox(P, 3, 0.4, 6, 0x4A3A2A, "earth", x - 4.5 + g * 3, 0.2, z);
GR.solids.push({ x: x, z: z, hw: 6, hd: 3, h: 1.2 });
for (var q = 0; q < 16; q++)
grSph(P, 0.4, 0x5A8A3A, null, x - 5.5 + (q % 4) * 3, 0.7, z - 2 + Math.floor(q / 4) * 1.4, 6);
grKit(P, "well", x + 7, 0, z, 0, 0.7);
GR.solids.push({ x: x + 7, z: z, r: 1.2 });
}
else if (k === "dig") {
grCyl(P, 6, 4, 1.4, 0x3A3430, "stone", x, -0.4, z, 14);
grKit(P, "mineshaft", x + 6, 0, z, 0, 0.6);
for (var r2 = 0; r2 < 4; r2++) {
var rx = x + (rnd() - 0.5) * 6, rz = z + (rnd() - 0.5) * 6;
grRock(P, 0x6A5A4A, "stone", rx, rz, 1, rnd);
GR.solids.push({ x: rx, z: rz, r: 0.9, h: 1.4 });
}
}
else if (k === "shrine") {
grCyl(P, 4, 4.4, 0.6, S.trim[0], S.trim[1], x, 0.3, z, 16);
GR.plats.push({ x: x, z: z, r: 4.2, h: 0.6 });
grKit(P, "altar", x, 0.6, z, 0, 0.8);
for (var c = 0; c < 6; c++) {
var a = c / 6 * Math.PI * 2;
grSph(P, 0.3, 0xF0B060, null, x + Math.cos(a) * 3.2, 1, z + Math.sin(a) * 3.2, 6, { glow: true });
}
}
else if (k === "grove") {
for (var t = 0; t < 5; t++) {
var a2 = t / 5 * Math.PI * 2;
grKit(P, (L.groveKit || "tree"), x + Math.cos(a2) * 6, 0, z + Math.sin(a2) * 6, a2, 0.8);
}
}
else {
grBox(P, 5, 0.4, 5, S.trim[0], S.trim[1], x, 0.2, z);
GR.plats.push({ x0: x - 2.5, x1: x + 2.5, z0: z - 2.5, z1: z + 2.5, h: 0.4 });
}
grSign(P, [pt.n, pt.d || ""], x + 3.4, 2.4, z + 3.4, Math.PI * 0.25, 3.8, 1.1, "#1A2A2A", "#E0F0E8");
GR.taken.push({ x: x, z: z, r: 10 });
var id = "gr_" + R.id + "_p0", sp = { id: id, x: x, z: z, kind: pt.k, name: pt.n, verb: pt.v || "try your luck" };
var gl = wGlow(0x9AD8FF, 3, 0.22);
gl.position.set(x, 1.4, z);
gl.userData.grKeep = 1;
G.add(gl);
sp.glow = gl;
GR.gathers.push(sp);
GR.spots.push({ x: x, z: z, r: 4, label: "<b>" + esc(pt.n) + "</b> · <b>press E</b> to " + esc(sp.verb), fn: function () { grGather(sp); } });
GR.pastimeAt = { x: x, z: z, n: pt.n };
},
function (R) {
var L = grLook(R), out = [];
if (R.purpose)
out.push(["🏙️", "What the city is for", R.purpose]);
out.push(["📋", "Work", "Every building is hiring: " + ((R.wards || []).length + ((R.deep && R.deep.b) || []).length + 1) + " places, shifts in real time, paid in gold. Press E at any door."]);
if (R.trade)
out.push(["⚖️", "Trade", (R.trade.say || "The exchange desk buys and sells.")]);
if (R.deep)
out.push(["⛏️", "Gather", esc((R.tunnel && R.tunnel.n) || "The road") + " leads to " + esc(R.deep.n) + ": " + ((R.deep.gather || []).length) + " finding-spots, all to your backpack."]);
if (L.pastime)
out.push(["✨", L.pastime.n, L.pastime.d || ""]);
out.push(["🏃", (R.arena && R.arena.n) || "The Training Ground", (R.arena && R.arena.about) || "Run the drill against the clock."]);
if (R.lectures)
out.push(["📖", "Learn", R.lectures.length + " lectures in the schools, one a day, with a question to check it went in."]);
if (R.lore)
out.push(["📜", "Its story", "Lore stones line the way; the chronicle is in the library."]);
return out;
},
function () {
var R = GR.R;
if (!R)
return;
var h = grTitle("✨ What to do in " + esc(R.name)) + "<div style='opacity:.85;margin:4px 0 6px'>" + esc(R.blurb || "") + "</div>";
grDoes(R).forEach(function (d) { h += grHead(d[0] + " " + esc(d[1])) + "<div>" + d[2] + "</div>"; });
var fns = {};
if (GR.pastimeAt) {
h += worldBtn("pt", "Show me the way to " + esc(GR.pastimeAt.n), null);
fns.pt = function () { worldCard(null); GR.guide = { x: GR.pastimeAt.x, z: GR.pastimeAt.z, n: GR.pastimeAt.n }; };
}
worldCard(h, fns);
},
function (P, R, S) {
var g = GR_AT.gate, x = -11, z = g.z - 12;
grBox(P, 0.3, 3.4, 0.3, 0x4A3A2A, "wood", x - 1.6, 1.7, z);
grBox(P, 0.3, 3.4, 0.3, 0x4A3A2A, "wood", x + 1.6, 1.7, z);
grSign(P, ["What to do in " + R.short, "work · trade · gather · learn · press E"], x, 2.6, z, Math.PI * 0.1, 3.8, 1.4, "#1A2A1A", "#E0F0D0");
GR.solids.push({ x: x, z: z, hw: 2, hd: 0.4 });
GR.spots.push({ x: x + 0.6, z: z - 2, r: 3, label: "<b>What to do in " + esc(R.name) + "</b> · <b>press E</b> to read the board", fn: function () { grDoesCard(); } });
},
function (B, R, S, b, w, h, d, grand, trim) {
var t = b.t, gl = S.glow, lite = grLite(), fz = d / 2;
if (grand)
return;
if (t === "market") {
var cols = [S.accent, 0xC8B898, S.accent];
for (var i = 0; i < 6; i++) {
var ax = -w / 2 + 3 + i * (w - 6) / 5;
if (Math.abs(ax) < 4)
continue;
var aw = grBox(B, 3.4, 0.15, 2.4, cols[i % 3], null, ax, 4.2, fz + 1.3);
aw.rotation.x = 0.35;
}
if (!lite)
[-1, 1].forEach(function (sd) { grKit(B, "marketstall", sd * (w / 2 - 4), 0, fz + 6, 0, 0.8); });
}
else if (t === "hospital") {
grBox(B, 10, 0.4, 6, trim[0], trim[1], 0, 6.2, fz + 3);
[-1, 1].forEach(function (sd) { grCyl(B, 0.2, 0.2, 5.6, trim[0], "metal", sd * 4.6, 3.1, fz + 5.6, 8); });
grSph(B, 0.8, 0x6AC88A, null, 0, 7.4, fz + 3, 10, { glow: true });
}
else if (t === "forge" || t === "workshop" || t === "mine") {
grCyl(B, 1, 1.3, h + 10, 0x7A4A3A, "brick", w / 2 - 2, (h + 10) / 2, -d * 0.3, 10);
grCyl(B, 1.25, 1.25, 0.6, trim[0], trim[1], w / 2 - 2, h + 10, -d * 0.3, 10);
if (t === "mine") {
grBox(B, 0.5, 14, 0.5, 0x4A3E34, "metal", w * 0.5 + 3, 7, 0);
grBox(B, 0.5, 14, 0.5, 0x4A3E34, "metal", w * 0.5 + 7, 7, 0);
grBox(B, 5, 0.5, 0.5, 0x4A3E34, "metal", w * 0.5 + 5, 14, 0);
var wh = grCyl(B, 2, 2, 0.4, 0x3A3430, "metal", w * 0.5 + 5, 13, 0.6, 16);
wh.rotation.x = Math.PI / 2;
}
}
else if (t === "temple") {
[-1, 1].forEach(function (sd) { grCyl(B, 0.5, 0.7, 10, trim[0], trim[1], sd * 5.2, 5, fz + 2.6, 8); grSph(B, 0.5, gl, null, sd * 5.2, 10.5, fz + 2.6, 8, { glow: true }); });
}
else if (t === "academy" || t === "library" || t === "court") {
var face = grCyl(B, 1.5, 1.5, 0.2, 0xE8DCC0, null, 0, 9.6, fz + 0.5, 20, { glow: true });
face.rotation.x = Math.PI / 2;
grBox(B, 0.12, 1.1, 0.1, 0x2A2018, null, 0, 9.9, fz + 0.65);
grBox(B, 0.9, 0.12, 0.1, 0x2A2018, null, 0.35, 9.6, fz + 0.65);
}
else if (t === "barracks" || t === "gaol") {
[-1, 1].forEach(function (sd) { grCyl(B, 0.1, 0.1, 9, 0x8A8A8A, "metal", sd * 6, 4.5, fz + 3, 5); grBox(B, 2.4, 1.4, 0.05, S.accent, null, sd * 6 + 1.2, 8.2, fz + 3); });
}
else if (t === "observatory") {
grCyl(B, 0.4, 0.6, 4, 0x8A8E94, "metal", w / 2 + 3, 2, fz - 3, 8);
var dd = grMesh(new THREE.SphereGeometry(2.6, 14, 6, 0, Math.PI * 2, 0, Math.PI / 3), grMat(0xB8BCC2, "metal", { ds: true }), w / 2 + 3, 4.4, fz - 3, B);
dd.rotation.x = -0.9;
}
else if (t === "dock" || t === "hangar") {
grBox(B, 0.8, 18, 0.8, 0xB8862A, "metal", w / 2 + 4, 9, d / 4);
grBox(B, 14, 0.8, 0.8, 0xB8862A, "metal", w / 2 - 2, 18, d / 4);
}
else if (t === "inn" || t === "bath") {
grBox(B, 3, 0.15, 0.15, 0x3A2A1A, "wood", w / 2 - 2, 5.6, fz + 1.5);
grBox(B, 1.8, 1.4, 0.1, S.accent, null, w / 2 - 1, 4.8, fz + 2.2);
}
else if (t === "theatre") {
var ar = grCyl(B, 3.4, 3.4, 0.3, gl, null, 0, Math.min(h * 0.62, 9.5), fz + 0.15, 20, { glow: true });
ar.rotation.x = Math.PI / 2;
ar.scale.set(1, 1, 0.8);
}
},
function () {
if (GR_IN.atlas)
return GR_IN.atlas;
var cv = document.createElement("canvas");
cv.width = 1024;
cv.height = 512;
var c = cv.getContext("2d");
var seed = 1234567;
function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
function grad(x, y, w, h, stops) { var g = c.createLinearGradient(x, y, x, y + h); stops.forEach(function (s) { g.addColorStop(s[0], s[1]); }); return g; }
function hills(x, y, w, h, base, amp, col) {
c.fillStyle = col;
c.beginPath();
c.moveTo(x, y + h);
var v = base;
for (var i = 0; i <= 40; i++) {
v += (rnd() - 0.5) * amp;
v = Math.max(base - amp * 2, Math.min(base + amp * 2, v));
c.lineTo(x + w * i / 40, y + v);
}
c.lineTo(x + w, y + h);
c.closePath();
c.fill();
}
function trees(x, y, w, yy, n, col) {
for (var i = 0; i < n; i++) {
var tx = x + rnd() * w, ty = y + yy + rnd() * 14, r = 5 + rnd() * 9;
c.fillStyle = col;
for (var k = 0; k < 5; k++) {
c.beginPath();
c.ellipse(tx + (rnd() - 0.5) * r, ty - r * (0.6 + rnd() * 0.8), r * (0.5 + rnd() * 0.4), r * (0.6 + rnd() * 0.5), 0, 0, 7);
c.fill();
}
c.fillRect(tx - 1, ty - 2, 2, 6);
}
}
function brush(x, y, w, h, n) {
var d = c.getImageData(x, y, w, h).data;
for (var i = 0; i < n; i++) {
var px = (rnd() * w) | 0, py = (rnd() * h) | 0, o = (py * w + px) * 4, a = rnd() * Math.PI, L = 3 + rnd() * 7, j = (rnd() - 0.5) * 26;
c.strokeStyle = "rgba(" + Math.max(0, Math.min(255, d[o] + j)) + "," + Math.max(0, Math.min(255, d[o + 1] + j)) + "," + Math.max(0, Math.min(255, d[o + 2] + j)) + ",0.55)";
c.lineWidth = 1.5 + rnd() * 2.5;
c.beginPath();
c.moveTo(x + px, y + py);
c.lineTo(x + px + Math.cos(a) * L, y + py + Math.sin(a) * L * 0.4);
c.stroke();
}
}
function varnish(x, y, w, h) {
var g = c.createRadialGradient(x + w / 2, y + h / 2, w * 0.2, x + w / 2, y + h / 2, w * 0.75);
g.addColorStop(0, "rgba(120,90,30,0.06)");
g.addColorStop(1, "rgba(30,18,6,0.5)");
c.fillStyle = g;
c.fillRect(x, y, w, h);
}
function land(x, y, w, h, sky, hz, far, mid, near, night) {
c.fillStyle = grad(x, y, w, h * 0.62, [[0, sky], [1, hz]]);
c.fillRect(x, y, w, h);
if (night) {
c.fillStyle = "rgba(250,240,200,0.9)";
c.beginPath();
c.arc(x + w * 0.72, y + h * 0.2, 10, 0, 7);
c.fill();
}
else {
var s = c.createRadialGradient(x + w * 0.3, y + h * 0.4, 2, x + w * 0.3, y + h * 0.4, w * 0.4);
s.addColorStop(0, "rgba(255,240,200,0.8)");
s.addColorStop(1, "rgba(255,240,200,0)");
c.fillStyle = s;
c.fillRect(x, y, w, h);
}
for (var k = 0; k < 5; k++) {
c.fillStyle = "rgba(255,255,255," + (night ? 0.05 : 0.22) + ")";
c.beginPath();
c.ellipse(x + rnd() * w, y + h * (0.1 + rnd() * 0.3), 20 + rnd() * 30, 5 + rnd() * 5, 0, 0, 7);
c.fill();
}
hills(x, y, w, h, h * 0.5, 7, far);
hills(x, y, w, h, h * 0.6, 9, mid);
c.fillStyle = grad(x, y + h * 0.7, w, h * 0.1, [[0, hz], [1, mid]]);
c.fillRect(x, y + h * 0.7, w, h * 0.07);
hills(x, y, w, h, h * 0.78, 6, near);
trees(x, y, w, h * 0.72, 9, night ? "#10160F" : "#26361E");
trees(x, y, w * 0.35, h * 0.84, 4, night ? "#0A0E08" : "#1C2814");
brush(x, y, w, h, 1800);
varnish(x, y, w, h);
}
function portrait(x, y, w, h, bg, coat, hair) {
c.fillStyle = grad(x, y, w, h, [[0, bg], [1, "#120C08"]]);
c.fillRect(x, y, w, h);
c.fillStyle = coat;
c.beginPath();
c.moveTo(x + w * 0.12, y + h);
c.quadraticCurveTo(x + w * 0.18, y + h * 0.62, x + w * 0.5, y + h * 0.6);
c.quadraticCurveTo(x + w * 0.82, y + h * 0.62, x + w * 0.88, y + h);
c.fill();
c.fillStyle = "#E8E0D0";
c.beginPath();
c.moveTo(x + w * 0.42, y + h * 0.6);
c.lineTo(x + w * 0.5, y + h * 0.74);
c.lineTo(x + w * 0.58, y + h * 0.6);
c.fill();
c.fillStyle = "#C89A7A";
c.fillRect(x + w * 0.46, y + h * 0.48, w * 0.08, h * 0.14);
var f = c.createRadialGradient(x + w * 0.46, y + h * 0.36, 4, x + w * 0.5, y + h * 0.4, w * 0.16);
f.addColorStop(0, "#F0C8A8");
f.addColorStop(1, "#9A6A4E");
c.fillStyle = f;
c.beginPath();
c.ellipse(x + w * 0.5, y + h * 0.4, w * 0.12, h * 0.15, 0, 0, 7);
c.fill();
c.fillStyle = hair;
c.beginPath();
c.ellipse(x + w * 0.5, y + h * 0.3, w * 0.14, h * 0.09, 0, Math.PI, 0);
c.fill();
c.fillRect(x + w * 0.36, y + h * 0.29, w * 0.04, h * 0.16);
c.fillRect(x + w * 0.6, y + h * 0.29, w * 0.04, h * 0.16);
c.fillStyle = "rgba(40,24,16,0.8)";
c.fillRect(x + w * 0.445, y + h * 0.39, w * 0.03, h * 0.012);
c.fillRect(x + w * 0.525, y + h * 0.39, w * 0.03, h * 0.012);
c.fillStyle = "rgba(140,60,50,0.7)";
c.fillRect(x + w * 0.475, y + h * 0.47, w * 0.05, h * 0.01);
brush(x, y, w, h, 1400);
varnish(x, y, w, h);
}
function sea(x, y, w, h) {
c.fillStyle = grad(x, y, w, h * 0.55, [[0, "#6E8AA8"], [1, "#E8D6B0"]]);
c.fillRect(x, y, w, h * 0.56);
c.fillStyle = grad(x, y + h * 0.55, w, h * 0.45, [[0, "#3E5A6E"], [1, "#1C2E3A"]]);
c.fillRect(x, y + h * 0.55, w, h * 0.45);
for (var i = 0; i < 70; i++) {
c.strokeStyle = "rgba(230,236,240," + (0.2 + rnd() * 0.4) + ")";
c.lineWidth = 1;
var wx = x + rnd() * w, wy = y + h * (0.58 + rnd() * 0.4);
c.beginPath();
c.moveTo(wx, wy);
c.quadraticCurveTo(wx + 6, wy - 3, wx + 12, wy);
c.stroke();
}
var sx = x + w * 0.55, sy = y + h * 0.6;
c.fillStyle = "#2A1E14";
c.beginPath();
c.moveTo(sx - 34, sy - 8);
c.lineTo(sx + 34, sy - 8);
c.lineTo(sx + 26, sy + 4);
c.lineTo(sx - 28, sy + 4);
c.fill();
c.fillStyle = "#2A1E14";
c.fillRect(sx - 12, sy - 74, 2, 66);
c.fillRect(sx + 10, sy - 62, 2, 54);
c.fillStyle = "#EDE4CC";
[[sx - 30, sy - 66, 22, 20], [sx - 28, sy - 42, 24, 26], [sx + 0, sy - 56, 22, 20], [sx + 1, sy - 34, 24, 22]].forEach(function (s) { c.fillRect(s[0], s[1], s[2], s[3]); });
brush(x, y, w, h, 1600);
varnish(x, y, w, h);
}
function still(x, y, w, h) {
c.fillStyle = grad(x, y, w, h, [[0, "#3A2E22"], [1, "#140E08"]]);
c.fillRect(x, y, w, h);
c.fillStyle = "#5A3A22";
c.fillRect(x, y + h * 0.68, w, h * 0.32);
c.fillStyle = "#E4DCC8";
c.fillRect(x + w * 0.1, y + h * 0.68, w * 0.8, h * 0.06);
c.fillStyle = "#8A7A5A";
c.beginPath();
c.ellipse(x + w * 0.5, y + h * 0.68, w * 0.24, h * 0.07, 0, 0, Math.PI);
c.fill();
[["#B8342A", 0.38, 0.6], ["#D8A030", 0.5, 0.56], ["#6A8A2A", 0.6, 0.61], ["#5A2A5A", 0.45, 0.64], ["#C86A2A", 0.56, 0.65]].forEach(function (p) {
var g = c.createRadialGradient(x + w * p[1] - 4, y + h * p[2] - 4, 1, x + w * p[1], y + h * p[2], w * 0.07);
g.addColorStop(0, "#FFF4D8");
g.addColorStop(0.25, p[0]);
g.addColorStop(1, "#1A0E06");
c.fillStyle = g;
c.beginPath();
c.arc(x + w * p[1], y + h * p[2], w * 0.065, 0, 7);
c.fill();
});
c.fillStyle = "rgba(220,200,150,0.5)";
c.fillRect(x + w * 0.76, y + h * 0.3, w * 0.05, h * 0.38);
brush(x, y, w, h, 1200);
varnish(x, y, w, h);
}
var S = 256;
land(0, 0, S, S, "#6A8EB8", "#EAD8B0", "#8A9AAA", "#5E7A5A", "#3E5A30");
land(S, 0, S, S, "#C87A5A", "#F2C890", "#8A6A7A", "#6A5A4A", "#3A3A26");
portrait(2 * S, 0, S, S, "#4A3A28", "#1A2A3A", "#3A2414");
sea(3 * S, 0, S, S);
land(0, S, S, S, "#0E1A30", "#3A4A6A", "#2A3448", "#1E2A30", "#141C18", true);
still(S, S, S, S);
portrait(2 * S, S, S, S, "#3A2A3A", "#5A1A1A", "#6A4A2A");
land(3 * S, S, S, S, "#9AB4C8", "#E8E8D8", "#A8B0B8", "#7A8A6A", "#5A6A3A");
var t = new THREE.CanvasTexture(cv);
t.anisotropy = 4;
GR_IN.atlas = t;
GR_IN.mat = new THREE.MeshLambertMaterial({ map: t });
return t;
},
function (L) {
if (!L.length)
return null;
grPicAtlas();
var pos = new Float32Array(L.length * 18), nor = new Float32Array(L.length * 18), uv = new Float32Array(L.length * 12);
L.forEach(function (q, i) {
var rx = q[4], rz = -q[3], hw = q[5] / 2, hh = q[6] / 2, u0 = (q[7] % 4) / 4 + 0.004, u1 = (q[7] % 4 + 1) / 4 - 0.004, v1 = 1 - Math.floor(q[7] / 4) / 2 - 0.004, v0 = 1 - (Math.floor(q[7] / 4) + 1) / 2 + 0.004;
var P = [[-hw, -hh, u0, v0], [hw, -hh, u1, v0], [hw, hh, u1, v1], [-hw, -hh, u0, v0], [hw, hh, u1, v1], [-hw, hh, u0, v1]];
P.forEach(function (p, k) {
var o = (i * 6 + k);
pos[o * 3] = q[0] + rx * p[0];
pos[o * 3 + 1] = q[1] + p[1];
pos[o * 3 + 2] = q[2] + rz * p[0];
nor[o * 3] = q[3];
nor[o * 3 + 1] = 0;
nor[o * 3 + 2] = q[4];
uv[o * 2] = p[2];
uv[o * 2 + 1] = p[3];
});
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g.computeBoundingSphere();
var m = new THREE.Mesh(g, GR_IN.mat);
m.userData.grKeep = 1;
return m;
},
function (P, ax, f, nrm, a0, a1, gaps, lite, D) {
var runs = [], at = a0;
(gaps || []).slice().sort(function (p, q) { return p[0] - q[0]; }).forEach(function (g) { var s = g[0] - g[1] / 2 - 0.12; if (s > at)
runs.push([at, s]); at = Math.max(at, g[0] + g[1] / 2 + 0.12); });
if (a1 > at)
runs.push([at, a1]);
runs.forEach(function (r) {
grStrip(P, ax, f, nrm, r[0], r[1], 0.1, 0.2, 0.05, 0, D.lo, "wood");
grStrip(P, ax, f, nrm, r[0], r[1], 0.6, 1.0, 0.025, 0, D.c, D.t);
grStrip(P, ax, f, nrm, r[0], r[1], 1.12, 0.08, 0.07, 0, D.lo, "wood");
if (!lite) {
var len = r[1] - r[0], n = Math.max(1, Math.round(len / 1.05)), pw = len / n;
for (var i = 0; i < n; i++) {
var p0 = r[0] + i * pw + 0.1, p1 = r[0] + (i + 1) * pw - 0.1;
grStrip(P, ax, f, nrm, p0, p1, 0.62, 0.6, 0.018, 0.025, D.hi, D.t);
grStrip(P, ax, f, nrm, p0 - 0.03, p1 + 0.03, 0.94, 0.03, 0.012, 0.025, D.lo, "wood");
grStrip(P, ax, f, nrm, p0 - 0.03, p1 + 0.03, 0.3, 0.03, 0.012, 0.025, D.lo, "wood");
}
}
});
},
function (P, ax, f, nrm, c, y0, w, h, curt, lite) {
grStrip(P, ax, f, nrm, c - w / 2, c + w / 2, y0 + h / 2, h, 0.01, 0.004, GR_IN.sky, null);
var M = P.children[P.children.length - 1];
if (M)
M.material = grMat(GR_IN.sky, null, { glow: true });
var fc = 0xEDE6D6, b = 0.12;
grStrip(P, ax, f, nrm, c - w / 2 - b, c - w / 2, y0 + h / 2, h + b, 0.1, 0, fc, "wood");
grStrip(P, ax, f, nrm, c + w / 2, c + w / 2 + b, y0 + h / 2, h + b, 0.1, 0, fc, "wood");
grStrip(P, ax, f, nrm, c - w / 2 - b, c + w / 2 + b, y0 + h + b / 2, b, 0.1, 0, fc, "wood");
grStrip(P, ax, f, nrm, c - w / 2 - 0.2, c + w / 2 + 0.2, y0 - 0.04, 0.08, 0.2, 0, fc, "wood");
grStrip(P, ax, f, nrm, c - 0.03, c + 0.03, y0 + h / 2, h, 0.05, 0, fc, "wood");
[0.33, 0.66].forEach(function (t) { grStrip(P, ax, f, nrm, c - w / 2, c + w / 2, y0 + h * t, 0.05, 0.05, 0, fc, "wood"); });
if (!lite)
[-0.25, 0.25].forEach(function (t) { grStrip(P, ax, f, nrm, c + w * t - 0.015, c + w * t + 0.015, y0 + h / 2, h, 0.03, 0, fc, "wood"); });
if (curt !== undefined && curt !== null) {
var cw = 0.42, ch = h + 0.55;
[-1, 1].forEach(function (sd) {
var a = c + sd * (w / 2 + b + cw / 2 - 0.05);
grStrip(P, ax, f, nrm, a - cw / 2, a + cw / 2, y0 + h + 0.3 - ch / 2, ch, 0.07, 0.06, curt, null);
if (!lite)
for (var k = -1; k <= 1; k += 2)
grStrip(P, ax, f, nrm, a + k * cw * 0.22 - 0.03, a + k * cw * 0.22 + 0.03, y0 + h + 0.3 - ch / 2, ch, 0.04, 0.13, new THREE.Color(curt).multiplyScalar(0.72).getHex(), null);
});
grStrip(P, ax, f, nrm, c - w / 2 - cw - 0.3, c + w / 2 + cw + 0.3, y0 + h + 0.38, 0.22, 0.12, 0.05, new THREE.Color(curt).multiplyScalar(0.8).getHex(), null);
}
},
function (P, G, I, S, r, pl, X0, Z0, RH, wallT) {
var lite = grLite(), D = grDadoKind(S, wallT), W = pl.W, DD = pl.D;
var x0 = X0 + r.x0, x1 = X0 + r.x1, z0 = Z0 + r.z0, z1 = Z0 + r.z1, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
var ix0 = x0 + (Math.abs(r.x0 + W / 2) < 0.01 ? 0.2 : 0.15), ix1 = x1 - (Math.abs(r.x1 - W / 2) < 0.01 ? 0.2 : 0.15);
var iz0 = z0 + (Math.abs(r.z0 + DD / 2) < 0.01 ? 0.2 : 0.15), iz1 = z1 - (Math.abs(r.z1 - DD / 2) < 0.01 ? 0.2 : 0.15);
var cornC = new THREE.Color(0xF2ECE0).getHex(), pics = I.pics || (I.pics = []), seed = grHash(r.name);
var gapX = r.door === "s" ? [[cx, 2]] : [], gapZ0 = [], gapZ1 = [];
grDado(P, "x", iz0, 1, ix0, ix1, [], lite, D);
grCornice(P, "x", iz0, 1, ix0, ix1, RH, cornC);
grDado(P, "x", iz1, -1, ix0, ix1, gapX, lite, D);
grCornice(P, "x", iz1, -1, ix0, ix1, RH, cornC);
grDado(P, "z", ix0, 1, iz0, iz1, r.door === "w" ? [[cz, 2]] : [], lite, D);
grCornice(P, "z", ix0, 1, iz0, iz1, RH, cornC);
grDado(P, "z", ix1, -1, iz0, iz1, r.door === "e" ? [[cz, 2]] : [], lite, D);
grCornice(P, "z", ix1, -1, iz0, iz1, RH, cornC);
if (r.door === "s")
grDoorCase(P, "x", iz1, -1, cx, 2, 2.6, D.lo);
else if (r.door === "e")
grDoorCase(P, "z", ix1, -1, cz, 2, 2.6, D.lo);
else
grDoorCase(P, "z", ix0, 1, cz, 2, 2.6, D.lo);
var curt = new THREE.Color(S.accent).multiplyScalar(0.85).getHex();
if (r.door === "s") {
[-4.6, 4.6].forEach(function (u) { grWindow(P, "x", iz0, 1, cx + u, 1.0, 1.2, 2.5, curt, lite); });
}
else {
var span = iz1 - iz0, ws = [0];
if (span / 2 > 5.8)
ws = [-4.6, 0, 4.6];
var ox = r.door === "e" ? ix0 : ix1, on = r.door === "e" ? 1 : -1;
ws.forEach(function (u) { grWindow(P, "z", ox, on, cz + u, 1.0, 1.2, 2.5, curt, lite); });
}
if (r.door !== "s") {
var depth = ix1 - ix0, sgn = r.door === "e" ? -1 : 1, from = r.door === "e" ? ix1 : ix0, k = 0;
for (var v = 6.5; v < depth - 1.6; v += 5) {
var px = from + sgn * v;
grPicture(P, pics, "x", iz0, 1, px, 2.95, 1.1, 0.78, seed + k++);
if (!lite)
grPicture(P, pics, "x", iz1, -1, px, 2.95, 1.1, 0.78, seed + k++);
}
}
else {
var hw = (ix1 - ix0) / 2;
[-1, 1].forEach(function (sd, i) { grPicture(P, pics, "z", sd < 0 ? ix0 : ix1, -sd, cz, 3.0, 1.6, 1.1, seed + i); });
}
grBox(P, ix1 - ix0, 0.02, iz1 - iz0, 0xEEE8DC, "plaster", cx, RH - 0.01, cz, 0, { e: 0x3A3228 });
var beams = S.k === "timber" || S.k === "dwarf" || S.k === "gothic", along = (ix1 - ix0) > (iz1 - iz0);
var step = beams ? 1.8 : 2.4;
if (lite)
step *= 1.8;
var bc = beams ? D.lo : cornC, bt = beams ? "wood" : "plaster", bh = beams ? 0.24 : 0.12;
if (along) {
for (var bx = ix0 + step; bx < ix1 - 0.5; bx += step)
grBox(P, beams ? 0.22 : 0.14, bh, iz1 - iz0, bc, bt, bx, RH - bh / 2, cz);
}
else {
for (var bz = iz0 + step; bz < iz1 - 0.5; bz += step)
grBox(P, ix1 - ix0, bh, beams ? 0.22 : 0.14, bc, bt, cx, RH - bh / 2, bz);
}
if (!beams && !lite) {
grBox(P, ix1 - ix0 - 0.6, 0.08, 0.12, bc, bt, cx, RH - 0.04, (iz0 + iz1) / 2 - ((iz1 - iz0) / 2 - 0.6));
grBox(P, ix1 - ix0 - 0.6, 0.08, 0.12, bc, bt, cx, RH - 0.04, (iz0 + iz1) / 2 + ((iz1 - iz0) / 2 - 0.6));
grCyl(P, 0.45, 0.55, 0.08, cornC, "plaster", cx, RH - 0.05, cz, 16);
}
},
function (P, I, S, pl, X0, Z0, W, DD, HH, RH, wallT) {
var lite = grLite(), D = grDadoKind(S, wallT), hw = pl.hallW / 2, hz0 = Z0 + pl.hall.z0, hz1 = Z0 + pl.hall.z1, cornC = 0xF2ECE0;
var trim = S.trim[0], trimT = S.trim[1];
[-1, 1].forEach(function (sd) {
var doors = pl.rooms.filter(function (r) { return r.door === (sd < 0 ? "e" : "w"); }).map(function (r) { return [Z0 + (r.z0 + r.z1) / 2, 2]; });
var f = X0 + sd * (hw - 0.15), n = -sd;
grDado(P, "z", f, n, hz0 + 0.15, hz1 - 0.2, doors, lite, D);
doors.forEach(function (d) { grDoorCase(P, "z", f, n, d[0], 2, 2.6, D.lo); });
grCornice(P, "z", f, n, hz0 + 0.15, hz1 - 0.2, RH + 0.02, cornC);
grCornice(P, "z", X0 + sd * hw, n, hz0, hz1 - 0.2, HH, cornC);
for (var wz = pl.hall.z0 + 7.5; wz < pl.hall.z1 - 3; wz += 9)
grWindow(P, "z", X0 + sd * hw, n, Z0 + wz, 5.2, 1.5, 2.9, null, lite);
});
grDado(P, "x", Z0 + DD / 2 - 0.2, -1, X0 - hw + 0.15, X0 + hw - 0.15, [[X0, 4.8]], lite, D);
grCornice(P, "x", Z0 + DD / 2 - 0.2, -1, X0 - hw, X0 + hw, HH, cornC);
grDoorCase(P, "x", Z0 + DD / 2 - 0.2, -1, X0, 4.0, 4.0, D.lo);
grDado(P, "x", hz0 + 0.15, 1, X0 - hw + 0.15, X0 + hw - 0.15, [[X0, 2]], lite, D);
grDoorCase(P, "x", hz0 + 0.15, 1, X0, 2, 2.6, D.lo);
grCornice(P, "x", hz0 + 0.15, 1, X0 - hw, X0 + hw, HH, cornC);
var cl = [];
for (var cz = pl.hall.z0 + 4; cz < pl.hall.z1 - 3; cz += 6)
cl.push(cz);
[-1, 1].forEach(function (sd) {
var x = X0 + sd * (hw - 1.6);
cl.forEach(function (cz) {
grBox(P, 1.25, 0.3, 1.25, trim, trimT, x, HH - 1.0 - 0.15, Z0 + cz);
grBox(P, 1.0, 0.25, 1.0, trim, trimT, x, HH - 1.0 - 0.42, Z0 + cz);
grCyl(P, 0.62, 0.62, 0.12, trim, trimT, x, 0.46, Z0 + cz, 14);
});
if (cl.length)
grBox(P, 1.0, 0.7, cl[cl.length - 1] - cl[0] + 1.25, trim, trimT, x, HH - 0.65, Z0 + (cl[0] + cl[cl.length - 1]) / 2);
});
grBox(P, pl.hallW, 0.02, hz1 - hz0, 0xEEE8DC, "plaster", X0, HH - 0.01, (hz0 + hz1) / 2, 0, { e: 0x3A3228 });
var cs = lite ? 6 : 3;
for (var x = X0 - hw + cs; x < X0 + hw - 0.5; x += cs)
grBox(P, 0.3, 0.36, hz1 - hz0, cornC, "plaster", x, HH - 0.18, (hz0 + hz1) / 2, 0, { e: 0x2E2A24 });
for (var z = hz0 + cs; z < hz1 - 0.5; z += cs)
grBox(P, pl.hallW, 0.36, 0.3, cornC, "plaster", X0, HH - 0.18, z, 0, { e: 0x2E2A24 });
var fc = new THREE.Color(S.floor[0]).multiplyScalar(0.62).getHex(), ft = S.floor[1];
[[X0 - hw + 1.0], [X0 + hw - 1.0]].forEach(function (q) { grBox(P, 0.3, 0.02, hz1 - hz0 - 2, fc, ft, q[0], 0.01, (hz0 + hz1) / 2); });
[hz0 + 1.0, hz1 - 1.0].forEach(function (z) { grBox(P, pl.hallW - 2, 0.02, 0.3, fc, ft, X0, 0.01, z); });
if (!lite) {
for (var gx = X0 - hw + 3; gx < X0 + hw - 2.5; gx += 2)
grBox(P, 0.05, 0.012, hz1 - hz0 - 2.6, fc, ft, gx, 0.006, (hz0 + hz1) / 2);
for (var gz = hz0 + 3; gz < hz1 - 2.5; gz += 2)
grBox(P, pl.hallW - 2.6, 0.012, 0.05, fc, ft, X0, 0.006, gz);
}
},
function (R) {
var E = R.env || {}, tx = E.groundTex || "stone", g = new THREE.Color(E.groundCol || 0x6A665E);
if (R.layout === "isles" || R.layout === "cavern")
return null;
function sh(c, k) { return new THREE.Color(c).multiplyScalar(k).getHex(); }
if (tx === "grass")
return { cols: { base: sh(g, 1.45), lush: sh(g, 1.15), dry: g.clone().lerp(new THREE.Color(0xB8A868), 0.45).getHex() }, dens: 0.45, hMin: 0.14, hVar: 0.24, flowers: true };
if (tx === "earth")
return { cols: { base: g.clone().lerp(new THREE.Color(0x8A8A48), 0.55).getHex(), lush: g.clone().lerp(new THREE.Color(0x5A7038), 0.5).getHex(), dry: g.clone().lerp(new THREE.Color(0xC0A870), 0.55).getHex() }, dens: 0.3, hMin: 0.12, hVar: 0.26 };
if (tx === "sand")
return { cols: { base: g.clone().lerp(new THREE.Color(0x7A7A3E), 0.6).getHex(), lush: g.clone().lerp(new THREE.Color(0x5A6232), 0.6).getHex(), dry: g.clone().lerp(new THREE.Color(0xC8B07A), 0.4).getHex() }, dens: -0.18, hMin: 0.1, hVar: 0.3 };
if (tx === "snow")
return { cols: { base: 0xC4CABC, lush: 0x9AA48E, dry: 0xDCD8C8 }, dens: -0.12, hMin: 0.08, hVar: 0.18 };
return null;
},
function (G, R) {
if (typeof aupMeadow !== "function")
return;
var K = grMeadowKind(R);
if (!K)
return;
var A = GR_AT, B = A.bound, L = grLook(R), lite = grLite(), MS = 2;
var NX = Math.ceil((B.x1 - B.x0) / MS), NZ = Math.ceil((B.z1 - B.z0) / MS), mask = new Uint8Array(NX * NZ);
for (var i = 0; i < NX * NZ; i++)
mask[i] = 1;
function cellsIn(x0, x1, z0, z1, fn) {
var i0 = Math.max(0, Math.floor((x0 - B.x0) / MS)), i1 = Math.min(NX - 1, Math.floor((x1 - B.x0) / MS)), j0 = Math.max(0, Math.floor((z0 - B.z0) / MS)), j1 = Math.min(NZ - 1, Math.floor((z1 - B.z0) / MS));
for (var a = i0; a <= i1; a++)
for (var b = j0; b <= j1; b++)
fn(a, b, B.x0 + (a + 0.5) * MS, B.z0 + (b + 0.5) * MS);
}
function clear(a, b) { mask[a * NZ + b] = 0; }
GR_PAVED.forEach(function (p) {
if (p.r !== undefined)
cellsIn(p.x - p.r - 1, p.x + p.r + 1, p.z - p.r - 1, p.z + p.r + 1, function (a, b, x, z) { if (Math.hypot(x - p.x, z - p.z) < p.r + 1.2)
clear(a, b); });
else
cellsIn(p.x0 - 1.2, p.x1 + 1.2, p.z0 - 1.2, p.z1 + 1.2, clear);
});
if (L.plan === "ring" && typeof GR_RING !== "undefined")
cellsIn(A.plaza.x - GR_RING.road - 8, A.plaza.x + GR_RING.road + 8, A.plaza.z - GR_RING.road - 8, A.plaza.z + GR_RING.road + 8, function (a, b, x, z) { var d = Math.hypot(x - A.plaza.x, z - A.plaza.z); if (Math.abs(d - GR_RING.road) < 7.5)
clear(a, b); });
(GR.solids || []).forEach(function (s) {
if (s.r !== undefined) {
var rr = s.r + 0.6;
cellsIn(s.x - rr, s.x + rr, s.z - rr, s.z + rr, function (a, b, x, z) { if (Math.hypot(x - s.x, z - s.z) < rr)
clear(a, b); });
return;
}
if (s.hw === undefined)
return;
var c = Math.cos(-(s.rot || 0)), sn = Math.sin(-(s.rot || 0)), ext = Math.hypot(s.hw, s.hd) + 1;
cellsIn(s.x - ext, s.x + ext, s.z - ext, s.z + ext, function (a, b, x, z) { var dx = x - s.x, dz = z - s.z, lx = dx * c + dz * sn, lz = -dx * sn + dz * c; if (Math.abs(lx) < s.hw + 0.6 && Math.abs(lz) < s.hd + 0.6)
clear(a, b); });
});
for (var a = 0; a < NX; a++)
for (var b = 0; b < NZ; b++) {
if (!mask[a * NZ + b])
continue;
var x = B.x0 + (a + 0.5) * MS, z = B.z0 + (b + 0.5) * MS;
if (Math.abs(grGround(x, z, 0)) > 0.04)
mask[a * NZ + b] = 0;
}
function grow(x, z) { var i = Math.floor((x - B.x0) / MS), j = Math.floor((z - B.z0) / MS); return i >= 0 && j >= 0 && i < NX && j < NZ && mask[i * NZ + j] === 1; }
var out = new THREE.Group();
out.name = "gr-meadow";
G.add(out);
aupMeadow(out, { lite: lite, origin: GR.base, start: [A.arrive.x, A.arrive.z], height: function () { return 0.0; }, grow: grow, hMin: K.hMin, hVar: K.hVar, dens: K.dens, seed: grHash(R.id) % 9973, cols: K.cols });
if (K.flowers && !lite) {
var fc = [0xE8D04A, 0xF0F0E8, 0xC86AB0, 0x8A7AE0, 0xE87A4A][grHash(R.id) % 5];
aupMeadow(out, { lite: lite, origin: GR.base, start: [A.arrive.x, A.arrive.z], height: function () { return 0; }, grow: grow, hMin: 0.1, hVar: 0.08, dens: -0.5, seed: grHash(R.id) % 7919 + 3,
cols: { base: fc, lush: new THREE.Color(fc).multiplyScalar(0.8).getHex(), dry: 0xF4F0E0 } });
}
},
function (x, z, r) {
var o = [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]];
for (var i = 0; i < o.length; i++) {
if (worldSolidAt(GR.solids, x + o[i][0], z + o[i][1], 0))
return false;
if (GR.R.layout === "isles" && !grOnIsle(x + o[i][0], z + o[i][1]))
return false;
}
for (var j = 0; j < GR.taken.length; j++) {
var t = GR.taken[j];
if (Math.hypot(t.x - x, t.z - z) < (t.r || 2) + r)
return false;
}
return Math.abs(grGround(x, z, 0)) < 0.05;
},
function (G, P, R, S) {
var L = grLook(R), lite = grLite(), rnd = wRand(grHash(R.id) + 1414), A = GR_AT;
if (R.layout === "cavern")
return;
var isle = R.layout === "isles", scatter = L.plan === "scatter";
var side = isle ? 6.2 : scatter ? 10.5 : 16.5;
var names = R.names || ["Ash", "Briar", "Cole", "Dara"], sur = R.surnames || null;
function nm(i) { return names[(i * 7 + 5) % names.length] + (sur ? " " + sur[(i * 3 + 4) % sur.length] : ""); }
var made = 0, keep = lite ? 3 : 8;
var runs = [[236, 170], [(A.plaza.z || 80) - A.plaza.r - 14, (A.plaza.z || 80) - A.plaza.r - 74]];
runs.forEach(function (run, ri) {
for (var z = run[0]; z >= run[1]; z -= (lite ? 14 : 9.5)) {
[-1, 1].forEach(function (sd, si) {
var x = sd * side, k = (Math.round(z) + si * 3 + ri * 5) & 0xffff;
if (!grStreetFree(x, z, 2.4))
return;
var st = grKit(P, "marketstall", x, grGround(x, z, 0), z, sd < 0 ? Math.PI / 2 : -Math.PI / 2, 1);
if (!st)
return;
GR.taken.push({ x: x, z: z, r: 2.6 });
GR.solids.push({ x: x, z: z, hw: 1.6, hd: 2.0 });
if (!lite) {
var bx = x + sd * 0.2, bz = z + 2.6;
if (grStreetFree(bx, bz, 0.8)) {
grKit(P, "barrel", bx, 0, bz, rnd() * 6, 1) || grKit(P, "crates", bx, 0, bz, rnd() * 6, 0.8);
GR.solids.push({ x: bx, z: bz, r: 0.5 });
}
}
if (made < keep) {
var w = GR_STALL_WARES[(k + grHash(R.id)) % GR_STALL_WARES.length], px = x - sd * 2.0;
grPersonAt(G, R, { n: nm(made + 11), t: w[1].charAt(0).toUpperCase() + w[1].slice(1), who: "keeping a stall of " + w[0] + " on the avenue", greet: "Fresh " + w[0] + ", the best in " + R.name + "!" }, px, z, sd < 0 ? Math.PI / 2 : -Math.PI / 2, true);
made++;
}
});
}
});
for (var z2 = 150; z2 >= -90; z2 -= (lite ? 44 : 22)) {
if (Math.abs(z2 - A.plaza.z) < A.plaza.r + 8)
continue;
[-1, 1].forEach(function (sd) {
var x2 = sd * (side - 1.2), z3 = z2 + 5.5;
if (!grStreetFree(x2, z3, 1.6))
return;
if (grKit(P, "bench", x2, grGround(x2, z3, 0), z3, sd < 0 ? Math.PI / 2 : -Math.PI / 2, 1)) {
GR.taken.push({ x: x2, z: z3, r: 1.4 });
GR.solids.push({ x: x2, z: z3, hw: 0.4, hd: 1.0 });
}
if (!isle && !lite) {
var z4 = z3 + 4.5;
if (grStreetFree(x2, z4, 1.8) && grKit(P, "flowers", x2, grGround(x2, z4, 0), z4, 0, 0.6)) {
GR.taken.push({ x: x2, z: z4, r: 1.2 });
}
}
});
}
if (!isle) {
var wx = -24, wz = (A.plaza.z || 80) + 11;
if (grStreetFree(wx, wz, 2.5) && grKit(P, "well", wx, grGround(wx, wz, 0), wz, 0, 0.8)) {
GR.taken.push({ x: wx, z: wz, r: 2.4 });
GR.solids.push({ x: wx, z: wz, r: 1.3 });
}
}
},
function (G, R) {
var lite = grLite(), n = lite ? 3 : 10, names = R.names || ["Ash", "Briar", "Cole", "Dara"], sur = R.surnames || null, rr = wRand(grHash(R.id) + 2121);
var titles = R.citizenTitles || ["Citizen", "Traveller", "Merchant", "Scholar", "Guard"];
for (var i = 0; i < n; i++) {
var x = (rr() - 0.5) * 12, z = 250 - rr() * 340;
if (Math.abs(z - GR_AT.plaza.z) < GR_AT.plaza.r)
x = (rr() < 0.5 ? -1 : 1) * (GR_AT.plaza.r * 0.6);
var p = grPersonAt(G, R, { n: names[(i * 11 + 2) % names.length] + (sur ? " " + sur[(i * 5 + 3) % sur.length] : ""), t: titles[(i + 2) % titles.length], who: i % 3 === 0 ? "out shopping in the market" : "walking the avenue" }, x, z, rr() * 6, true);
if (i % 3 !== 2)
p.walk = true;
}
},
function (P, R, S, x, z) {
var tc = S.trim[0], wc = S.wall[0], lite = grLite();
var ring = new THREE.Mesh(new THREE.TorusGeometry(5.8, 1.2, lite ? 6 : 10, lite ? 14 : 28, Math.PI), grMat(wc, S.wall[1]));
ring.position.set(x, 0, z);
P.add(ring);
var lip = new THREE.Mesh(new THREE.TorusGeometry(4.7, 0.22, 6, lite ? 14 : 28, Math.PI), grMat(tc, "metal"));
[-1.05, 1.05].forEach(function (fz) { var l = lip.clone(); l.position.set(x, 0, z + fz); P.add(l); });
[-1, 1].forEach(function (sd) {
grBox(P, 0.5, 6.4, 2.2, tc, "metal", x + sd * 4.3, 3.2, z - 1.4);
grBox(P, 0.52, 0.4, 2.24, 0xE0B020, null, x + sd * 4.3, 1.2, z - 1.4);
grDome(P, 2.2, wc, S.wall[1], x + sd * 7.6, 0, z, lite ? 10 : 16);
grSph(P, 0.18, 0x60FF90, null, x + sd * 5.2, 4.6, z - 1.2, 8, { glow: true });
GR.solids.push({ x: x + sd * 7.4, z: z, r: 2.2 });
});
grBox(P, 10, 0.6, 0.5, 0xE0B020, null, x, 0.3, z - 1.6);
grBox(P, 9.6, 1.9, 1.4, tc, "metal", x, 7.3, z);
grBox(P, 9.8, 0.2, 1.5, 0xE0B020, null, x, 6.25, z);
return { y: 7.3, z: -0.75 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], tt = S.trim[1], wc = S.wall[0], wt = S.wall[1];
[-1, 1].forEach(function (sd) {
var px = x + sd * 8;
for (var i = 0; i < 5; i++) {
var w = 7 - i * 0.9, d = 6 - i * 0.7;
grBox(P, w, 3, d, wc, wt, px, 1.5 + i * 3, z);
grBox(P, w + 0.3, 0.3, d + 0.3, tc, tt, px, 3.1 + i * 3, z);
}
for (var c = 0; c < 4; c++)
grBox(P, 0.7, 0.8, 0.7, tc, tt, px - 1.6 + c * 1.07, 15.4, z + 1.6);
grBox(P, 1.8, 8, 0.08, R.look && R.look.pal && R.look.pal.accent || 0x8A2A1A, null, px - sd * 0.2, 8.5, z - 3.04);
GR.solids.push({ x: px, z: z, hw: 3.5, hd: 3 });
});
grBox(P, 10, 2.2, 4, wc, wt, x, 10.6, z);
grBox(P, 11, 0.6, 4.6, tc, tt, x, 12, z);
grBox(P, 9.2, 0.3, 0.3, tc, tt, x, 9.4, z - 2.05);
[-1, 1].forEach(function (sd) { grCyl(P, 0.6, 0.3, 1, tc, "metal", x + sd * 3.6, 0.5, z - 4, 8); grSph(P, 0.4, 0xFF9A40, null, x + sd * 3.6, 1.2, z - 4, 8, { glow: true }); });
return { y: 10.6, z: -2.08 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], tt = S.trim[1], wc = S.wall[0], wt = S.wall[1], rnd = wRand(grHash(R.id) + 31);
for (var i = 0; i < (grLite() ? 7 : 13); i++) {
var a = i / 12 * Math.PI, rr = 8 + rnd() * 2.5, g = grRockGeo(i, true);
var gs = 3.4 + rnd() * 2.2;
g.scale(1.1 * gs, (0.9 + rnd() * 0.5) * gs, 0.8 * gs);
grMesh(g, grMat(wc, wt), x + Math.cos(a) * rr, Math.sin(a) * rr * 1.05 + 1, z + (rnd() - 0.5) * 1.5, P, rnd() * 3);
}
grBox(P, 1.2, 9.4, 3.4, tc, tt, x - 5.1, 4.7, z);
grBox(P, 1.2, 9.4, 3.4, tc, tt, x + 5.1, 4.7, z);
grBox(P, 11.4, 1.4, 3.6, tc, tt, x, 10, z);
for (var b = 0; b < 6; b++)
grBox(P, 0.9, 0.5, 0.2, tc, tt, x - 3.8 + b * 1.52, 10, z - 1.85);
GR.solids.push({ x: x - 8, z: z, hw: 3, hd: 2.5 }, { x: x + 8, z: z, hw: 3, hd: 2.5 });
return { y: 10, z: -1.9 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], wood = 0x6A4E36;
[-1, 1].forEach(function (sd) {
var px = x + sd * 5.6;
grCyl(P, 0.3, 0.42, 18, wood, "wood", px, 9, z, 10);
grCyl(P, 0.7, 0.7, 0.5, tc, "metal", px, 18.2, z, 10);
[-1, 1].forEach(function (fz) { var st = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, Math.hypot(17, 3.4), 4), grMat(0xC8B890, null)); st.position.set(px + sd * 1.7, 8.6, z + fz * 1.6); st.rotation.z = sd * 0.2; st.rotation.x = fz * 0.1; P.add(st); });
for (var r = 0; r < 6; r++) {
grBox(P, 0.12, 1.1, 0.12, wood, "wood", x + sd * 4.6, 0.55, z - 2 - r * 2.6);
}
grBox(P, 0.06, 0.06, 13, 0xC8B890, null, x + sd * 4.6, 1.05, z - 8.5);
grBox(P, 0.4, 0.6, 0.4, 0x2A2A2A, "metal", px - sd * 0.6, 0.9, z - 0.9);
grSph(P, 0.16, S.glow, null, px - sd * 0.6, 0.9, z - 0.9, 6, { glow: true });
GR.solids.push({ x: px, z: z, r: 0.6 });
});
grBox(P, 12.8, 0.4, 0.4, wood, "wood", x, 15.4, z);
grBox(P, 9, 0.15, 13, wood, "wood", x, 0.05, z - 8.5);
[-2.6, 2.6].forEach(function (dx) { grBox(P, 0.05, 2.2, 0.05, 0x3A3A3A, "metal", x + dx, 14.2, z - 0.3); });
var cols = [0xC83A2A, 0xE8C040, 0x3A6AB8, 0xF0F0E8];
for (var f = 0; f < 9; f++) {
var fx = x - 4.8 + f * 1.2, sag = Math.abs(f - 4) * 0.22;
var fl = grCone(P, 0.28, 0.6, cols[f % 4], "cloth", fx, 12.4 + sag, z - 0.2, 3);
fl.rotation.x = Math.PI;
}
return { y: 12.6, z: -0.32, w: 6.2, h: 1.6 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], tt = S.trim[1], wc = S.wall[0], wt = S.wall[1], lite = grLite();
var sh = new THREE.Shape();
sh.moveTo(-10, 0);
sh.lineTo(10, 0);
sh.lineTo(10, 13);
sh.lineTo(-10, 13);
sh.lineTo(-10, 0);
var hole = new THREE.Path();
hole.absarc(0, 5.6, 5.1, 0, Math.PI * 2, true);
sh.holes.push(hole);
var g = new THREE.ExtrudeGeometry(sh, { depth: 1.6, bevelEnabled: false, curveSegments: lite ? 16 : 32 });
g.translate(0, 0, -0.8);
grMesh(g, grMat(wc, wt), x, 0, z, P);
var rim = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.3, 8, lite ? 20 : 40), grMat(tc, tt));
[-0.85, 0.85].forEach(function (fz) { var r = rim.clone(); r.position.set(x, 5.6, z + fz); P.add(r); });
grBox(P, 21, 0.6, 2.2, tc, tt, x, 13.3, z);
grBox(P, 1.2, 0.6, 1.8, tc, tt, x, 0.3, z);
GR.solids.push({ x: x - 8, z: z, hw: 2.2, hd: 0.9 }, { x: x + 8, z: z, hw: 2.2, hd: 0.9 });
return { y: 11.2, z: -0.9 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], tt = S.trim[1], wc = S.wall[0], wt = S.wall[1], lite = grLite();
[-1, 1].forEach(function (sd) {
var px = x + sd * 7;
grCyl(P, 2.2, 2.6, 22, wc, wt, px, 11, z, lite ? 10 : 18);
grCyl(P, 2.6, 2.6, 0.8, tc, tt, px, 22.4, z, lite ? 10 : 18);
grCone(P, 2.5, 7, tc, tt, px, 26.6, z, lite ? 10 : 18);
for (var w = 0; w < 4; w++)
grBox(P, 0.6, 1.4, 0.1, 0x1A2230, null, px, 6 + w * 4, z - 2.45);
grSph(P, 0.3, S.glow, null, px, 30.4, z, 8, { glow: true });
GR.solids.push({ x: px, z: z, r: 2.6 });
});
grBox(P, 10, 1.6, 3, wc, wt, x, 16, z);
grBox(P, 10.4, 0.3, 3.4, tc, tt, x, 17, z);
for (var p = 0; p < 5; p++)
grBox(P, 0.8, 1.2, 0.12, 0x1A2230, null, x - 3.2 + p * 1.6, 16, z - 1.52);
grBox(P, 9, 1.4, 0.3, tc, "metal", x, 13.6, z);
return { y: 16, z: -1.6 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], rc = (S.roof || S.trim)[0], rt = (S.roof || S.trim)[1];
[-4.2, 4.2].forEach(function (dx) {
[-1.6, 1.6].forEach(function (dz) { grBox(P, 0.45, 5.4, 0.45, tc, "wood", x + dx, 2.7, z + dz); grBox(P, 0.7, 0.5, 0.7, 0x7A766E, "stone", x + dx, 0.25, z + dz); });
grBox(P, 0.3, 0.3, 3.8, tc, "wood", x + dx, 5.3, z);
var br = grBox(P, 0.2, 1.6, 0.2, tc, "wood", x + dx * 0.86, 4.6, z - 1.6);
br.rotation.z = dx > 0 ? 0.6 : -0.6;
GR.solids.push({ x: x + dx, z: z, hw: 0.4, hd: 1.8 });
});
grBox(P, 9.2, 0.35, 0.35, tc, "wood", x, 5.5, z - 1.6);
grBox(P, 9.2, 0.35, 0.35, tc, "wood", x, 5.5, z + 1.6);
if (typeof grRoof === "function")
grRoof(P, 11, 2.6, 5.6, rc, rt, x, 5.7, z, 0);
else
grBox(P, 11, 0.5, 5.6, rc, rt, x, 6.4, z);
grBox(P, 0.5, 0.5, 0.2, 0x2A2018, "wood", x, 4.8, z - 1.75);
grSph(P, 0.26, 0xFFC870, null, x, 4.3, z - 1.75, 8, { glow: true });
return { y: 6.5, z: -2.9, w: 5, h: 1.1 };
},
function (P, R, S, x, z) {
var lite = grLite(), bark = 0x5A4632, lc = (R.env && R.env.groundCol) || 0x3E6A30;
var arc = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.95, lite ? 6 : 10, lite ? 12 : 24, Math.PI), grMat(bark, "bark"));
arc.position.set(x, 0, z);
P.add(arc);
[-1, 1].forEach(function (sd) { grCyl(P, 1.0, 1.8, 3, bark, "bark", x + sd * 6.2, 1.5, z, lite ? 8 : 14); for (var r = 0; r < 5; r++) {
var rt = grCyl(P, 0.25, 0.45, 3, bark, "bark", x + sd * (6.2 + Math.cos(r) * 1.6), 0.6, z + Math.sin(r * 2.1) * 1.6, 6);
rt.rotation.z = sd * 0.9;
} GR.solids.push({ x: x + sd * 6.2, z: z, r: 1.6 }); });
var lf = new THREE.Color(lc).multiplyScalar(1.15).getHex(), rnd = wRand(grHash(R.id) + 77);
for (var i = 0; i < (lite ? 8 : 18); i++) {
var a = rnd() * Math.PI, c = new THREE.Color(lf).offsetHSL(0, (rnd() - 0.5) * 0.1, (rnd() - 0.5) * 0.14).getHex();
grLeafClump(P, 1.3 + rnd() * 1.3, c, x + Math.cos(a) * (6.6 + rnd()), Math.sin(a) * (6.6 + rnd()) + 1.5, z + (rnd() - 0.5) * 3.4, grHash(R.id) + i * 17, lite);
}
for (var k = 0; k < 5; k++) {
var lx = x - 4 + k * 2;
grBox(P, 0.04, 1.4, 0.04, 0x3A2A1A, null, lx, 6.4 - Math.abs(k - 2) * 0.4, z - 0.6);
grSph(P, 0.22, 0xFFD27A, null, lx, 5.6 - Math.abs(k - 2) * 0.4, z - 0.6, 8, { glow: true });
}
return { y: 4.9, z: -0.9, w: 5.6, h: 1.1 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], tt = S.trim[1], iron = 0x1E1E22;
[-1, 1].forEach(function (sd) {
var px = x + sd * 5.4;
grBox(P, 1.6, 6, 1.6, tc, tt, px, 3, z);
grBox(P, 2, 0.4, 2, tc, tt, px, 6.2, z);
grCyl(P, 0.35, 0.6, 1.4, tc, tt, px, 7.1, z, 10);
grSph(P, 0.5, tc, tt, px, 7.9, z, 10);
for (var b = 0; b < 6; b++) {
var bx = x + sd * (0.6 + b * 0.72);
grCyl(P, 0.05, 0.05, 4.6, iron, "metal", bx, 2.3, z - 0.4, 4);
grCone(P, 0.12, 0.4, iron, "metal", bx, 4.8, z - 0.4, 4);
}
var leaf = grBox(P, 0.12, 0.12, 4.4, iron, "metal", x + sd * 2.6, 3.8, z - 1.6);
leaf.rotation.y = sd * 0.5;
GR.solids.push({ x: px, z: z, hw: 0.9, hd: 0.9 });
});
var ar = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.08, 4, 24, Math.PI), grMat(iron, "metal"));
ar.position.set(x, 4.6, z - 0.4);
P.add(ar);
[-1, 1].forEach(function (sd) { grBox(P, 4.4, 0.08, 0.08, iron, "metal", x + sd * 2.4, 1, z - 0.4); });
return { y: 8.2, z: -0.45, w: 5.2, h: 1.0 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], tt = S.trim[1], wc = S.wall[0], wt = S.wall[1];
[-1, 1].forEach(function (sd) {
var px = x + sd * 8.5;
grBox(P, 7, 17, 8, wc, wt, px, 8.5, z);
grBox(P, 7.6, 0.6, 8.6, tc, tt, px, 17, z);
for (var c = 0; c < 4; c++) {
grBox(P, 1.1, 1.4, 0.9, wc, wt, px - 2.7 + c * 1.8, 18, z - 3.9);
grBox(P, 1.1, 1.4, 0.9, wc, wt, px - 2.7 + c * 1.8, 18, z + 3.9);
}
for (var s = 0; s < 3; s++)
grBox(P, 0.25, 1.6, 0.1, 0x14100C, null, px, 5 + s * 4, z - 4.06);
GR.solids.push({ x: px, z: z, hw: 3.5, hd: 4 });
});
grBox(P, 10, 7, 8, wc, wt, x, 13.5, z);
grBox(P, 10.6, 0.5, 8.6, tc, tt, x, 17.2, z);
for (var c2 = 0; c2 < 5; c2++)
grBox(P, 1.1, 1.4, 0.9, wc, wt, x - 3.6 + c2 * 1.8, 18, z - 3.9);
for (var p = 0; p < 9; p++)
grBox(P, 0.14, 2.8, 0.14, 0x2A2620, "metal", x - 4 + p * 1, 8.6, z - 3.2);
grBox(P, 9, 0.14, 0.14, 0x2A2620, "metal", x, 7.4, z - 3.2);
return { y: 14.2, z: -4.35 };
},
function (P, R, S, x, z) {
var tc = S.trim[0], tt = S.trim[1], rc = (S.roof || S.trim)[0], col = R.look && R.look.pal && R.look.pal.accent || 0xB8302A;
[-6, -2.6, 2.6, 6].forEach(function (dx) { var outer = Math.abs(dx) > 4; grCyl(P, 0.42, 0.48, outer ? 8 : 10.5, col, null, x + dx, outer ? 4 : 5.25, z, 12); grBox(P, 1.4, 0.6, 1.4, tc, tt, x + dx, 0.3, z); GR.solids.push({ x: x + dx, z: z, r: 0.6 }); });
function roof(w, y, d) { grBox(P, w, 0.3, d, rc, "tile", x, y, z); [-1, 1].forEach(function (sd) { var e = grBox(P, 1.6, 0.3, d, rc, "tile", x + sd * (w / 2 + 0.5), y + 0.35, z); e.rotation.z = sd * 0.35; }); grBox(P, w - 1, 0.5, d - 0.6, tc, tt, x, y - 0.4, z); }
roof(9.6, 10.9, 3.4);
roof(15, 8.4, 3.0);
grBox(P, 5.6, 1.4, 0.2, 0x1A1A20, null, x, 9.75, z - 1.4);
return { y: 9.75, z: -1.52, w: 5.2, h: 1.2 };
},
function (P, R, S, x, z) {
var rnd = wRand(grHash(R.id) + 55), cols = [0x7A3A22, 0x4A5A3A, 0x3A4A5A, 0x8A6A2A];
[-1, 1].forEach(function (sd) {
for (var l = 0; l < 3; l++)
for (var k = 0; k < 2; k++) {
var c = grBox(P, 6, 2.6, 2.4, cols[(l + k + (sd > 0 ? 1 : 0)) % 4], "metal", x + sd * (7.5 + k * 0.4), 1.3 + l * 2.6, z + (k ? 2.5 : 0), (rnd() - 0.5) * 0.12);
}
GR.solids.push({ x: x + sd * 7.6, z: z + 1.2, hw: 3.2, hd: 2.6 });
});
var gi = grBox(P, 15, 0.8, 0.5, 0x5A4A3A, "metal", x, 8.6, z - 1.3);
gi.rotation.z = 0.03;
grBox(P, 0.5, 8.2, 0.5, 0x5A4A3A, "metal", x - 4.6, 4.1, z - 1.3);
grBox(P, 0.5, 8.2, 0.5, 0x5A4A3A, "metal", x + 4.6, 4.1, z - 1.3);
for (var t = 0; t < 4; t++) {
var ty = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.22, 6, 12), grMat(0x1A1A1A, null));
ty.position.set(x + (t < 2 ? -5.8 : 5.8), 0.3 + (t % 2) * 0.45, z - 3);
ty.rotation.x = Math.PI / 2;
P.add(ty);
}
return { y: 8.6, z: -1.6, w: 7, h: 1.3 };
},
function (P, R, S, x, z) {
var wc = S.wall[0], wt = S.wall[1], tc = S.trim[0], lite = grLite();
for (var i = 0; i < (lite ? 5 : 9); i++) {
var r = 6.4 - i * 0.55, t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.9 - i * 0.06, lite ? 6 : 10, lite ? 12 : 24, Math.PI * (1 - i * 0.06)), grMat(i % 2 ? tc : wc, wt));
t.position.set(x, 0, z + i * 0.55);
t.rotation.z = i * 0.06;
P.add(t);
}
[-1, 1].forEach(function (sd) { GR.solids.push({ x: x + sd * 6.4, z: z + 2, r: 1.4 }); grSph(P, 0.3, S.glow, null, x + sd * 5.6, 1.2, z - 1.4, 8, { glow: true }); });
grBox(P, 6, 1.3, 0.5, S.trim[0], S.wall[1], x, 7.6, z - 0.4);
return { y: 7.6, z: -0.7, w: 5.6, h: 1.1 };
},
function (P, R, S, x, z) {
var tc = S.trim[0];
[-1, 1].forEach(function (sd) { var px = x + sd * 6; var ob = grCyl(P, 0.6, 1.6, 18, 0xD8E4EC, "glass", px, 9, z, 4); ob.rotation.y = Math.PI / 4; grCone(P, 1.0, 2.2, 0xF0F4F8, "metal", px, 19.1, z, 4); grBox(P, 3.4, 0.8, 3.4, tc, "marble", px, 0.4, z); GR.solids.push({ x: px, z: z, r: 1.6 }); });
grBox(P, 13.4, 1.6, 1.2, 0xE8F0F4, "glass", x, 13.2, z);
grBox(P, 13.8, 0.25, 1.4, 0xF0F4F8, "metal", x, 12.3, z);
grBox(P, 13.8, 0.25, 1.4, 0xF0F4F8, "metal", x, 14.1, z);
var ring = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.14, 6, 48, Math.PI), grMat(0xF0F4F8, "metal"));
ring.position.set(x, 0.6, z);
P.add(ring);
return { y: 13.2, z: -0.62 };
},
function (P, S, x, z) {
[0, 2.1, 4.2].forEach(function (a) { var l = grCyl(P, 0.05, 0.05, 2.6, 0x3A2A1E, "wood", x + Math.cos(a) * 0.4, 1.2, z + Math.sin(a) * 0.4, 4); l.rotation.z = Math.cos(a) * 0.18; l.rotation.x = -Math.sin(a) * 0.18; });
grCyl(P, 0.5, 0.25, 0.5, 0x4A3A2A, "metal", x, 2.6, z, 10);
grSph(P, 0.32, 0xFF9A40, null, x, 2.95, z, 8, { glow: true });
return 3.0;
},
function (geo, amt, seed) {
var p = geo.attributes.position, r = wRand(seed), seen = {};
for (var i = 0; i < p.count; i++) {
var k = p.getX(i).toFixed(3) + "," + p.getY(i).toFixed(3) + "," + p.getZ(i).toFixed(3);
var f = seen[k] || (seen[k] = 1 + (r() - 0.5) * amt);
p.setXYZ(i, p.getX(i) * f, p.getY(i) * f, p.getZ(i) * f);
}
geo.computeVertexNormals();
var n = geo.attributes.normal, v = new THREE.Vector3(), w = new THREE.Vector3();
for (var j = 0; j < p.count; j++) {
v.set(p.getX(j), p.getY(j), p.getZ(j)).normalize();
w.set(n.getX(j), n.getY(j), n.getZ(j));
v.multiplyScalar(0.8).addScaledVector(w, 0.2).normalize();
n.setXYZ(j, v.x, v.y, v.z);
}
n.needsUpdate = true;
return geo;
},
function (B, r0, r1, a, b, col) {
var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.hypot(dx, dy, dz);
if (L < 0.01)
return null;
var m = grMesh(new THREE.CylinderGeometry(r1, r0, L, grLite() ? 5 : 8), grMat(col, "bark"), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, B);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
return m;
},
function (B, x, z, tr, th, cr, lf, seed) {
var lite = grLite(), rnd = wRand(seed), bark = 0x5A4632;
grLimb(B, tr, tr * 0.7, [x, 0, z], [x, th * 0.62, z], bark);
grCyl(B, tr * 1.08, tr * 1.6, tr * 1.4, bark, "bark", x, tr * 0.7, z, lite ? 8 : 12);
for (var k = 0; k < (lite ? 4 : 7); k++) {
var a = k / (lite ? 4 : 7) * Math.PI * 2 + rnd() * 0.4, ex = tr * (2.2 + rnd() * 0.9);
grLimb(B, tr * 0.42, tr * 0.12, [x + Math.cos(a) * tr * 0.7, tr * 0.9, z + Math.sin(a) * tr * 0.7], [x + Math.cos(a) * ex, -0.1, z + Math.sin(a) * ex], bark);
}
var nl = lite ? 4 : 6, ends = [];
for (var l = 0; l < nl; l++) {
var a2 = l / nl * Math.PI * 2 + rnd() * 0.6, up = th * (0.5 + rnd() * 0.2), out = cr * (0.55 + rnd() * 0.25);
var b0 = [x, up, z], b1 = [x + Math.cos(a2) * out * 0.6, up + th * 0.3, z + Math.sin(a2) * out * 0.6];
grLimb(B, tr * 0.5, tr * 0.26, b0, b1, bark);
var nb = lite ? 2 : 3;
for (var s = 0; s < nb; s++) {
var a3 = a2 + (s - 1) * 0.55 + (rnd() - 0.5) * 0.3, o2 = out * (0.8 + rnd() * 0.4), e = [x + Math.cos(a3) * o2, b1[1] + th * (0.08 + rnd() * 0.18), z + Math.sin(a3) * o2];
grLimb(B, tr * 0.24, tr * 0.08, b1, e, bark);
ends.push(e);
}
ends.push([b1[0], b1[1] + th * 0.12, b1[2]]);
}
ends.push([x, th * 0.98, z]);
var base = new THREE.Color(lf);
ends.forEach(function (e, i) {
var c = base.clone().offsetHSL((rnd() - 0.5) * 0.04, (rnd() - 0.5) * 0.1, (rnd() - 0.5) * 0.12).getHex(), r = cr * (0.26 + rnd() * 0.14);
grLeafClump(B, r, c, e[0], e[1], e[2], seed + i * 13, lite);
if (!lite && i % 2 === 0)
grLeafClump(B, r * 0.7, base.clone().multiplyScalar(0.7).getHex(), e[0] + (rnd() - 0.5) * r, e[1] - r * 0.45, e[2] + (rnd() - 0.5) * r, seed + i * 31, lite);
});
return { top: th + cr * 0.3 };
},
function (x, z, s, seed) {
var lite = grLite(), rnd = wRand(seed), G = new THREE.Group();
G.position.set(x, 0, z);
var C = GR_CAPS[(seed >>> 3) % GR_CAPS.length], cap = C[0], wart = C[1], stem = C[2], H = 5.6 * s, R = 3.4 * s, seg = lite ? 10 : 20;
var pr = [];
[[0.0, 0], [1.25, 0.05], [1.35, 0.5], [1.1, 1.1], [0.82, 1.8], [0.7, 3.2], [0.64, 4.8], [0.62, 5.6]].forEach(function (p) { pr.push(new THREE.Vector2(p[0] * s, p[1] * s)); });
grMesh(new THREE.LatheGeometry(pr, seg), grMat(stem, "plaster"), 0, 0, 0, G);
var sk = [];
[[0.66, 4.5], [1.05, 4.15], [1.25, 3.7], [1.2, 3.55]].forEach(function (p) { sk.push(new THREE.Vector2(p[0] * s, p[1] * s)); });
grMesh(new THREE.LatheGeometry(sk, seg), grMat(stem, null, { ds: true }), 0, 0, 0, G);
var vol = [];
[[0, 0.02], [1.55, 0.02], [1.6, 0.35], [1.4, 0.55]].forEach(function (p) { vol.push(new THREE.Vector2(p[0] * s, p[1] * s)); });
grMesh(new THREE.LatheGeometry(vol, seg), grMat(0xD8CCB0, null, { ds: true }), 0, 0, 0, G);
var cp = [], tilt = (rnd() - 0.5) * 0.12;
for (var i = 0; i <= 8; i++) {
var t = i / 8, a = t * Math.PI / 2;
cp.push(new THREE.Vector2(Math.sin(a) * R * (1 - 0.04 * t), H + Math.cos(a) * R * 0.68));
}
cp.push(new THREE.Vector2(R * 1.02, H - 0.05 * s));
cp.push(new THREE.Vector2(R * 0.97, H - 0.3 * s));
cp.push(new THREE.Vector2(R * 0.88, H - 0.34 * s));
var capM = grMesh(new THREE.LatheGeometry(cp.reverse(), seg * 1.5 | 0), grMat(cap, null, { ds: true }), 0, 0, 0, G);
capM.rotation.z = tilt;
var gl = [];
[[R * 0.88, H - 0.34 * s], [R * 0.55, H - 0.5 * s], [0.66 * s, H - 0.2 * s]].forEach(function (p) { gl.push(new THREE.Vector2(p[0], p[1])); });
var gm = grMesh(new THREE.LatheGeometry(gl, seg), grMat(C[1] === 0xE8DDF0 ? 0xC8B8F0 : 0xE8DCC0, null, { ds: true, glow: (C[1] === 0xE8DDF0) }), 0, 0, 0, G);
gm.rotation.z = tilt;
if (cap === 0xB8281E || cap === 0xC23A22) {
for (var w = 0; w < (lite ? 8 : 22); w++) {
var aw = rnd() * Math.PI * 2, tw = 0.15 + rnd() * 0.75, ra = Math.sin(tw * Math.PI / 2) * R * 0.98, hy = H + Math.cos(tw * Math.PI / 2) * R * 0.68;
var wt = grSph(G, (0.12 + rnd() * 0.18) * s, wart, null, Math.cos(aw) * ra, hy + 0.02 * s, Math.sin(aw) * ra, 5);
wt.scale.y = 0.45;
}
}
G.userData.solidR = 0.9 * s;
return G;
},
function (R) {
var A = GR_AT, L = grLook(R), out = [], z0 = 236, z1 = -96, step = 4;
var run = null;
for (var z = z0; z >= z1; z -= step) {
var bad = Math.abs(z - A.plaza.z) < A.plaza.r + 8 || (L.plan === "ring" && Math.abs(Math.abs(z - A.plaza.z) - GR_RING.road) < 10) || (z > 64 && z < 96);
if (bad) {
if (run) {
out.push(run);
run = null;
}
continue;
}
if (!run)
run = { a: z, b: z };
else
run.b = z;
}
if (run)
out.push(run);
return out.filter(function (r) { return r.a - r.b >= 12; });
},
function (P, R, S) {
var w = grAveHalf(R) + 0.4, tc = S.trim[0];
grAveEach(R, 6, function (z) {
var rb = new THREE.Mesh(new THREE.TorusGeometry(w, 0.16, 5, 24, Math.PI), grMat(tc, "metal"));
rb.position.set(0, 0.2, z);
rb.scale.y = 0.62;
P.add(rb);
[-1, 1].forEach(function (s) { GR.solids.push({ x: s * w, z: z, r: 0.45 }); grBox(P, 0.5, 0.4, 0.5, tc, "metal", s * w, 0.2, z); });
});
grAveRuns(R).forEach(function (r) {
var L = r.a - r.b, zm = (r.a + r.b) / 2;
[0.42, 0.82, 1].forEach(function (f) { var a = Math.asin(f), y = 0.2 + Math.cos(Math.asin(f)) * w * 0.62; [-1, 1].forEach(function (s) { grBox(P, 0.12, 0.12, L, tc, "metal", s * f * w, y, zm); }); });
var gl = new THREE.Mesh(new THREE.CylinderGeometry(w, w, L, 24, 1, true, Math.PI / 2, Math.PI), grMat(0xBFD8E4, null, { op: 0.12, ds: true }));
gl.rotation.x = Math.PI / 2;
gl.scale.z = 0.62;
gl.position.set(0, 0.2, zm);
P.add(gl);
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.2, cols = [0xC8642E, 0xE0B060, 0xA83A2A, 0xD8C8A0, 0x2E6A7A, 0x8A3A5A], rnd = wRand(grHash(R.id) + 77);
grAveEach(R, 7, function (z, k) {
var y = 5.2 + rnd() * 0.8, c = cols[k % cols.length];
[-1, 1].forEach(function (s) { grPost(P, s * w, z, y + 0.6, 0x5A4028, "wood", 0.12); });
var sh = new THREE.PlaneGeometry(w * 2, 4.6, 4, 1), p = sh.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i);
p.setZ(i, -Math.cos(x / w * Math.PI / 2) * 0.7);
}
var m = grMesh(sh, grMat(c, null, { ds: true }), 0, y, z + (rnd() - 0.5) * 0.6, P);
m.rotation.x = -Math.PI / 2 + (rnd() - 0.5) * 0.12;
grSagLine(P, -w, w, y + 0.4, z + 2.4, 0.5, 0x3A2A1E);
grSagLine(P, -w, w, y + 0.4, z - 2.4, 0.5, 0x3A2A1E);
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.6, tc = S.trim[0], tt = S.trim[1] || "stone";
grAveEach(R, 22, function (z) {
[-1, 1].forEach(function (s) { grBox(P, 1.4, 7.2, 1.6, tc, tt, s * w, 3.6, z); grBox(P, 1.8, 0.5, 2.0, tc, tt, s * w, 0.25, z); grBox(P, 1.8, 0.45, 2.0, tc, tt, s * w, 7.3, z); GR.solids.push({ x: s * w, z: z, r: 1.0 }); });
var a = new THREE.Mesh(new THREE.TorusGeometry(w, 0.75, 6, 20, Math.PI), grMat(tc, tt));
a.position.set(0, 7.3, z);
a.scale.y = 0.35;
P.add(a);
grBox(P, 0.03, 1.3, 0.03, 0x1A1A1A, null, 0, 9.2, z);
grBox(P, 0.42, 0.55, 0.42, 0x2A2420, "metal", 0, 8.3, z);
grSph(P, 0.15, S.glow, null, 0, 8.3, z, 6, { glow: true });
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.5, cols = [0xC83A2A, 0xE8D8B0, 0x2A5A8A, 0xE0B040, 0x3A7A4A], rnd = wRand(grHash(R.id) + 91);
grAveEach(R, 11, function (z, k) {
var y = 6.2;
[-1, 1].forEach(function (s) { grPost(P, s * w, z, y + 1.4, 0x6A4E36, "wood", 0.16); grCyl(P, 0.2, 0.2, 0.2, 0xB89A5A, "metal", s * w, y + 1.5, z, 6); });
var c = grSagLine(P, -w, w, y, z, 1.3, 0x2A2018), n = grLite() ? 6 : 12;
for (var i = 1; i < n; i++) {
var p = c.getPoint(i / n), f = new THREE.BufferGeometry();
f.setAttribute("position", new THREE.Float32BufferAttribute([-0.35, 0, 0, 0.35, 0, 0, 0, -0.8, 0], 3));
f.computeVertexNormals();
var m = grMesh(f, grMat(cols[(i + k) % cols.length], null, { ds: true }), p.x, p.y, p.z, P);
m.rotation.y = (rnd() - 0.5) * 0.4;
}
if (k % 3 === 0)
[-1, 1].forEach(function (s) { var pn = new THREE.BufferGeometry(); pn.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, -0.7, 0, s * -2.2, -0.35, 0], 3)); pn.computeVertexNormals(); grMesh(pn, grMat(cols[k % cols.length], null, { ds: true }), s * w, y + 1.3, z, P); });
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.4, tc = S.trim[0];
grAveEach(R, 14, function (z) {
[-1, 1].forEach(function (s) { grPost(P, s * w, z, 7.0, tc, "metal", 0.1); grSph(P, 0.2, tc, "metal", s * w, 7.05, z, 8); });
var c = grSagLine(P, -w, w, 6.9, z, 1.1, 0x3A3A3A), n = grLite() ? 3 : 5;
for (var i = 1; i < n; i++) {
var p = c.getPoint(i / n);
grBox(P, 0.02, 0.5, 0.02, 0x2A2A2A, null, p.x, p.y - 0.25, p.z);
grSph(P, 0.3, S.glow, null, p.x, p.y - 0.75, p.z, 10, { glow: true });
}
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.8, tc = S.trim[0], acc = S.accent || 0x2A4A7A;
grAveEach(R, 44, function (z) {
[-1, 1].forEach(function (s) { grBox(P, 1.2, 10.4, 1.2, tc, "metal", s * w, 5.2, z); GR.solids.push({ x: s * w, z: z, r: 1.0 }); });
grBox(P, w * 2 + 1.2, 0.6, 3.2, tc, "metal", 0, 10.6, z);
grBox(P, w * 2 + 1.2, 1.1, 0.08, 0xBFD8E4, null, 0, 11.45, z - 1.55, 0, { op: 0.35 });
grBox(P, w * 2 + 1.2, 1.1, 0.08, 0xBFD8E4, null, 0, 11.45, z + 1.55, 0, { op: 0.35 });
grBox(P, w * 2, 0.08, 0.3, S.glow, null, 0, 10.27, z, 0, { glow: true });
});
grAveEach(R, 22, function (z, k) { if (k % 2)
[-1, 1].forEach(function (s) { grBox(P, 0.12, 0.12, 1.4, tc, "metal", s * (w - 0.9), 8.6, z + 11); grBox(P, 0.04, 5.2, 1.2, k % 4 === 1 ? acc : 0xE8E8EC, null, s * (w - 0.9), 5.9, z + 11, 0, { ds: true }); }); });
},
function (P, R, S) {
var w = grAveHalf(R), rnd = wRand(grHash(R.id) + 55);
if (R.layout !== "isles")
grAveRuns(R).forEach(function (r) { var L = r.a - r.b, zm = (r.a + r.b) / 2; [-1, 1].forEach(function (s) { grBox(P, 2.4, 0.06, L, 0x5E8A3E, "grass", s * (w + 1.6), 0.035, zm); }); });
if (R.layout !== "isles")
grAveEach(R, 9, function (z) {
[-1, 1].forEach(function (s) {
var x = s * (w + 2.9);
for (var i = 0; i < 6; i++)
grBox(P, 0.09, 1.0 + (i % 2) * 0.08, 0.06, 0xEDE6D6, "wood", x, 0.5, z - 2.5 + i * 0.9);
grBox(P, 0.04, 0.08, 5.0, 0xEDE6D6, "wood", x, 0.75, z - 0.25);
grBox(P, 0.04, 0.08, 5.0, 0xEDE6D6, "wood", x, 0.35, z - 0.25);
GR.solids.push({ x: x, z: z - 0.3, r: 2.6 });
if (rnd() < 0.6)
for (var f = 0; f < 4; f++)
grSph(P, 0.22, [0xD84A5A, 0xF0D040, 0xE8E8F0, 0x9A5AC8][f], null, x - s * 0.6, 0.25, z - 2 + f * 1.2, 5);
});
});
var A = GR_AT, mz = A.plaza.z + A.plaza.r + 14;
grPost(P, 0, mz, 9, 0xF0EAE0, "wood", 0.16);
grSph(P, 0.3, 0xE0B040, "metal", 0, 9.1, mz, 8);
var cols = [0xC83A2A, 0x2A6AB8, 0xF0D040, 0x3A8A4A, 0xE8E8F0, 0x9A4AC8];
for (var i = 0; i < (grLite() ? 3 : 6); i++) {
var a = i / 6 * Math.PI * 2, c = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 8.9, mz), new THREE.Vector3(Math.cos(a) * 2, 5, mz + Math.sin(a) * 2), new THREE.Vector3(Math.cos(a) * 3.4, 1.2, mz + Math.sin(a) * 3.4)]);
grMesh(new THREE.TubeGeometry(c, 8, 0.04, 3, false), grMat(cols[i], null), 0, 0, 0, P);
}
},
function (P, R, S) {
var w = grAveHalf(R) + 0.3, lf = grLook(R).leaf || 0x3E6A34, lite = grLite();
grAveEach(R, 12, function (z, k) {
var pts = [];
for (var i = 0; i <= 10; i++) {
var t = i / 10, a = t * Math.PI;
pts.push(new THREE.Vector3(-Math.cos(a) * w, Math.sin(a) * 6.4, z + Math.sin(t * 9 + k) * 0.3));
}
grMesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.22, 5, false), grMat(0x5A4632, "bark"), 0, 0, 0, P);
[-1, 1].forEach(function (s) { GR.solids.push({ x: s * w, z: z, r: 0.6 }); });
var n = lite ? 3 : 7;
for (var j = 0; j < n; j++) {
var t2 = (j + 0.5) / n, a2 = t2 * Math.PI;
grLeafClump(P, 1.1 + ((j * 7 + k) % 3) * 0.25, new THREE.Color(lf).offsetHSL(0, 0, ((j + k) % 3 - 1) * 0.05).getHex(), -Math.cos(a2) * w, Math.sin(a2) * 6.4 + 0.3, z, grHash(R.id) + k * 19 + j, lite);
}
if (!lite && S.k === "fae")
grSph(P, 0.18, S.glow, null, 0, 5.6, z, 6, { glow: true });
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.3;
grAveEach(R, 16, function (z) {
var a = new THREE.Mesh(new THREE.TorusGeometry(w, 0.09, 4, 24, Math.PI), grMat(0x1E1E22, "metal"));
a.position.set(0, 4.4, z);
a.scale.y = 0.42;
P.add(a);
[-1, 1].forEach(function (s) { grPost(P, s * w, z, 4.4, 0x1E1E22, "metal", 0.09); grCone(P, 0.14, 0.4, 0x1E1E22, "metal", s * w, 4.6, z, 4); });
for (var i = -3; i <= 3; i++)
if (i)
grBox(P, 0.04, 1.1 - Math.abs(i) * 0.12, 0.04, 0x1E1E22, "metal", i * w / 4, 4.4 + Math.sqrt(1 - Math.pow(i / 4, 2)) * w * 0.42 - 0.55, z);
grBox(P, 0.02, 0.9, 0.02, 0x1A1A1A, null, 0, 7.9, z);
grCyl(P, 0.22, 0.16, 0.5, 0x1E1E22, "metal", 0, 7.2, z, 6);
grSph(P, 0.12, 0xC8E0A0, null, 0, 7.15, z, 6, { glow: true });
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.6, cols = [0x8A1E1E, 0x1E3A6A, 0xC8A030, 0x2A4A2A, 0x5A2A5A], tc = S.trim[0];
grAveEach(R, 11, function (z, k) {
[-1, 1].forEach(function (s) {
grPost(P, s * w, z, 9.0, 0x3A2A1A, "wood", 0.13);
grCone(P, 0.18, 0.6, 0xA8A8A8, "metal", s * w, 9.3, z, 4);
grBox(P, 0.1, 0.1, 1.9, 0x3A2A1A, "wood", s * w, 8.5, z);
var c = cols[(k + (s > 0 ? 2 : 0)) % cols.length];
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, -0.9, 0, 0, 0.9, 0, -4.2, 0.9, 0, -4.2, -0.9, 0, -5.0, 0], 3));
g.setIndex([0, 2, 1, 0, 3, 2, 3, 4, 2]);
g.computeVertexNormals();
grMesh(g, grMat(c, null, { ds: true }), s * (w - 0.08), 8.4, z, P);
grBox(P, 0.03, 0.5, 0.5, 0xE8D8A0, null, s * (w - 0.12), 6.7, z, 0, { ds: true });
});
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.4, red = 0xA8281E, lite = grLite();
grAveEach(R, 26, function (z) {
[-1, 1].forEach(function (s) { grCyl(P, 0.32, 0.38, 7, red, "wood", s * w, 3.5, z, 10); grCyl(P, 0.48, 0.48, 0.5, 0x1E1A18, "stone", s * w, 0.25, z, 10); GR.solids.push({ x: s * w, z: z, r: 0.7 }); });
var t = grBox(P, w * 2 + 3.4, 0.5, 0.9, 0x1E1A18, "wood", 0, 7.4, z);
grBox(P, w * 2 + 2.2, 0.4, 0.6, red, "wood", 0, 7.0, z);
grBox(P, w * 2, 0.35, 0.5, red, "wood", 0, 5.9, z);
grBox(P, 0.4, 1.0, 0.35, red, "wood", 0, 6.45, z);
});
grAveEach(R, 13, function (z, k) {
if (k % 2 === 0)
return;
var c = grSagLine(P, -w, w, 5.4, z, 0.9, 0x2A2A2A), n = lite ? 4 : 7;
for (var i = 1; i < n; i++) {
var p = c.getPoint(i / n);
var lp = grCyl(P, 0.24, 0.24, 0.5, i % 3 ? 0xF0D8A0 : 0xE04A2A, null, p.x, p.y - 0.35, p.z, 8, { glow: true });
lp.scale.set(1, 1, 1);
grSph(P, 0.24, i % 3 ? 0xF0D8A0 : 0xE04A2A, null, p.x, p.y - 0.35, p.z, 8, { glow: true }).scale.y = 0.7;
}
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.3, cols = [0x4A5A3A, 0x6A4A2A, 0x3A4A5A, 0x8A6A3A], rnd = wRand(grHash(R.id) + 31);
grAveEach(R, 9, function (z, k) {
[-1, 1].forEach(function (s) { var h = 5.6 + rnd() * 1.2; grPost(P, s * w, z, h, k % 2 ? 0x6A3A22 : 0x4A4A4A, "metal", 0.1 + rnd() * 0.08); });
var c = grSagLine(P, -w, w, 5.6, z, 1.2, 0x1A1A1A), n = grLite() ? 3 : 6;
for (var i = 1; i < n; i++) {
var p = c.getPoint(i / n);
grSph(P, 0.1, 0xFFC870, null, p.x, p.y - 0.15, p.z, 5, { glow: true });
}
if (k % 3 === 1) {
var s2 = rnd() < 0.5 ? -1 : 1, tp = new THREE.PlaneGeometry(4.2, 2.8, 3, 2), q = tp.attributes.position;
for (var j = 0; j < q.count; j++)
q.setZ(j, Math.sin(q.getX(j) * 1.3) * 0.25);
var m = grMesh(tp, grMat(cols[k % cols.length], null, { ds: true }), s2 * (w - 2.0), 5.0, z + 3, P);
m.rotation.set(-Math.PI / 2 + 0.35 * s2, 0, 0.12 * s2);
}
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.4, cols = [0xE08A7A, 0xF0C8B0, 0xC85A6A, 0xE8B890];
grAveEach(R, 15, function (z, k) {
var g = grJitter(new THREE.TorusGeometry(w, 0.55, 6, grLite() ? 14 : 26, Math.PI), 0.25, grHash(R.id) + k);
var a = grMesh(g, grMat(cols[k % cols.length], "plaster"), 0, 0, z, P);
a.scale.y = 0.72;
[-1, 1].forEach(function (s) { GR.solids.push({ x: s * w, z: z, r: 0.9 }); if (!grLite())
for (var b = 0; b < 3; b++) {
var br = grCyl(P, 0.08, 0.18, 1.6, cols[(k + b + 1) % cols.length], "plaster", s * (w - 0.4), 1.6 + b * 1.4, z + (b - 1) * 0.5, 5);
br.rotation.z = s * (0.5 + b * 0.2);
} });
grSph(P, 0.22, S.glow, null, 0, w * 0.72 - 0.4, z, 8, { glow: true });
});
},
function (P, R, S) {
var w = grAveHalf(R) + 0.3;
grAveEach(R, 18, function (z) {
var a = new THREE.Mesh(new THREE.TorusGeometry(w, 0.07, 4, 32, Math.PI), grMat(S.glow, null, { glow: true }));
a.position.set(0, 0, z);
a.scale.y = 0.8;
P.add(a);
[-1, 1].forEach(function (s) { GR.solids.push({ x: s * w, z: z, r: 0.4 }); grCyl(P, 0.22, 0.3, 0.3, 0xE8F0F4, "metal", s * w, 0.15, z, 8); });
});
},
function (seed, own) {
var lite = typeof grLite === "function" && grLite(), k = (Math.abs(seed | 0) % 8) + (lite ? "l" : "");
if (!own && GR_ROCKG[k])
return GR_ROCKG[k];
var g = grJitter(new THREE.IcosahedronGeometry(1, lite ? 1 : 2), 0.34, 9101 + (Math.abs(seed | 0) % 8) * 77);
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
if (y < -0.35)
p.setY(i, -0.35 + (y + 0.35) * 0.4);
}
p.needsUpdate = true;
g.computeBoundingBox();
g.computeBoundingSphere();
if (!own)
GR_ROCKG[k] = g;
return g;
},
function (G, P, R, S) {
if (!R || R.layout === "cavern")
return;
var L = grLook(R), lite = grLite(), rnd = wRand(grHash(R.id) + 2117), isle = R.layout === "isles";
var tk = L.tree === undefined ? S.tree : L.tree;
var made = 0, cap = lite ? 10 : 24;
function put(a, x, z, ry, s, r, solid) {
if (made >= cap || !grStreetFree(x, z, r))
return false;
var o = grKit(P, a, x, grGround(x, z, 0), z, ry, s);
if (!o)
return false;
GR.taken.push({ x: x, z: z, r: r });
if (solid)
GR.solids.push(solid);
made++;
return true;
}
[-1, 1].forEach(function (sd) {
for (var z = 258; z >= 228; z -= (lite ? 10 : 6.5)) {
for (var x0 = 15; x0 <= (isle ? 22 : 40); x0 += (lite ? 9 : 6)) {
var x = sd * (x0 + (rnd() - 0.5) * 2.2), zz = z + (rnd() - 0.5) * 2.2, k = rnd();
if (Math.abs(zz - 250) < 3 && x0 < 18)
continue;
if (tk && k < 0.34) {
put(tk, x, zz, rnd() * 6, (L.treeS || 1) * (0.8 + rnd() * 0.35), 2.4, { x: x, z: zz, r: 0.5 });
continue;
}
if (!tk && k < 0.34) {
if (k < 0.07)
put("statue", x, zz, sd < 0 ? Math.PI / 2 : -Math.PI / 2, 1, 1.6, { x: x, z: zz, r: 0.7 });
else if (L.crys)
put("crystal", x, zz, rnd() * 6, 0.8 + rnd() * 0.4, 1.6, { x: x, z: zz, r: 0.6 });
continue;
}
if (k < 0.56) {
put("flowers", x, zz, rnd() * 6, 0.7 + rnd() * 0.3, 1.4, null);
continue;
}
if (k < 0.72) {
put("bench", x, zz, sd < 0 ? Math.PI / 2 : -Math.PI / 2, 1, 1.4, { x: x, z: zz, hw: 0.4, hd: 1.0 });
continue;
}
}
}
if (!isle)
put("well", sd * 26, 242, 0, 1, 2.2, { x: sd * 26, z: 242, r: 1.2 });
});
},
function (x, z, r, y) {
var o = [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]];
for (var i = 0; i < o.length; i++) {
if (worldSolidAt(GR.solids, x + o[i][0], z + o[i][1], (y || 0) + 0.1))
return false;
if (GR.R.layout === "isles" && !grOnIsle(x + o[i][0], z + o[i][1]))
return false;
if (Math.abs(grGround(x + o[i][0], z + o[i][1], 0) - (y || 0)) > 0.05)
return false;
}
for (var j = 0; j < GR.taken.length; j++) {
var t = GR.taken[j];
if (Math.hypot(t.x - x, t.z - z) < (t.r || 2) + r)
return false;
}
var B = GR_AT.bound;
if (x < B.x0 + 4 || x > B.x1 - 4 || z < B.z0 + 4 || z > B.z1 - 4)
return false;
return true;
},
function (P, x, z, w, d, ry, kind, leaf, rnd, edge, y) {
var lite = grLite(), y0 = y || 0, B = new THREE.Group();
B.position.set(x, y0, z);
B.rotation.y = ry || 0;
grBox(B, w, 0.42, d, edge || 0x6A5038, edge ? "stone" : "wood", 0, 0.21, 0);
grBox(B, w - 0.24, 0.06, d - 0.24, 0x3E2E22, null, 0, 0.43, 0);
var cols = [0xC84A5A, 0xE8C04A, 0x9A6AC8, 0xF0E8D8, 0xE07A3A, 0xC86A9A];
if (kind === "veg") {
for (var i = 0; i < (lite ? 3 : 5); i++) {
var u = -w / 2 + 0.5 + (i + 0.5) * (w - 1) / (lite ? 3 : 5);
for (var j = 0; j < (lite ? 2 : 4); j++) {
var v = -d / 2 + 0.45 + (j + 0.5) * (d - 0.9) / (lite ? 2 : 4);
grLeafClump(B, 0.26 + rnd() * 0.1, new THREE.Color(leaf).offsetHSL(0.03, 0.05, (rnd() - 0.4) * 0.1).getHex(), u, 0.62, v, grHash("v" + x + i + j), true);
}
}
}
else {
var n = lite ? Math.min(14, Math.max(4, Math.round(w * d * 0.6))) : Math.min(36, Math.max(5, Math.round(w * d * 1.4))), cr = Math.max(0.22, Math.sqrt(w * d / n) * 0.3);
for (var k = 0; k < n; k++) {
var px = (rnd() - 0.5) * (w - 0.5), pz = (rnd() - 0.5) * (d - 0.5);
grLeafClump(B, cr + rnd() * 0.14, new THREE.Color(leaf).offsetHSL(0, 0, (rnd() - 0.5) * 0.12).getHex(), px, 0.6, pz, grHash("f" + x + k), true);
if (!lite || k % 2 === 0) {
var c = cols[(k + Math.floor(rnd() * 3)) % cols.length];
for (var q = 0; q < (lite ? 1 : 3); q++)
grSph(B, 0.07 + rnd() * 0.04, c, null, px + (rnd() - 0.5) * 0.4, 0.78 + rnd() * 0.12, pz + (rnd() - 0.5) * 0.4, 5);
}
}
}
P.add(B);
GR.solids.push({ x: x, z: z, hw: w / 2 + 0.1, hd: d / 2 + 0.1, rot: ry || 0, h: y0 + 0.6 });
},
function (P, S, x, z, leaf, rnd, y, cone) {
var y0 = y || 0;
grBox(P, 1.3, 0.75, 1.3, S.trim[0], S.trim[1], x, y0 + 0.375, z);
grBox(P, 1.42, 0.1, 1.42, S.trim[0], S.trim[1], x, y0 + 0.8, z);
if (cone) {
grCone(P, 0.62, 2.2, new THREE.Color(leaf).multiplyScalar(0.8).getHex(), null, x, y0 + 1.9, z, 9);
}
else
grLeafClump(P, 0.85, new THREE.Color(leaf).offsetHSL(0, 0, (rnd() - 0.5) * 0.1).getHex(), x, y0 + 1.35, z, grHash("p" + x + z), grLite());
GR.solids.push({ x: x, z: z, r: 0.8, h: y0 + 2 });
},
function (P, x, z, ry, rnd, load) {
var G = new THREE.Group();
G.position.set(x, 0, z);
G.rotation.y = ry;
grBox(G, 1.6, 0.14, 2.6, 0x7A5A3A, "wood", 0, 0.9, 0);
[-0.78, 0.78].forEach(function (u) { grBox(G, 0.08, 0.5, 2.6, 0x6A4A2E, "wood", u, 1.2, 0); });
grBox(G, 1.6, 0.5, 0.08, 0x6A4A2E, "wood", 0, 1.2, -1.28);
[-0.92, 0.92].forEach(function (u) {
var w = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.07, 5, 14), grMat(0x4A3424, "wood"));
w.position.set(u, 0.66, 0.1);
w.rotation.y = Math.PI / 2;
G.add(w);
grCyl(G, 0.09, 0.09, 0.2, 0x3A3A3A, "metal", u, 0.66, 0.1, 6).rotation.z = Math.PI / 2;
});
[-0.6, 0.6].forEach(function (u) { var sh = grBox(G, 0.08, 0.08, 2.2, 0x6A4A2E, "wood", u, 0.55, 2.2); sh.rotation.x = 0.32; });
if (load === "hay") {
var h = grBox(G, 1.5, 0.7, 2.4, 0xC8A85A, null, 0, 1.35, 0);
h.scale.y = 1;
grSph(G, 0.9, 0xC8A85A, null, 0, 1.6, 0, 8).scale.set(0.9, 0.5, 1.4);
}
else if (load === "veg") {
for (var i = 0; i < 10; i++)
grSph(G, 0.2, [0xC86A3A, 0x7A9A3A, 0xD8B04A][i % 3], null, (rnd() - 0.5) * 1.2, 1.15 + rnd() * 0.2, (rnd() - 0.5) * 2, 6);
}
else {
grBox(G, 0.7, 0.6, 0.7, 0x8A6A44, "wood", -0.35, 1.27, -0.5);
grBox(G, 0.7, 0.6, 0.7, 0x9A7A50, "wood", 0.35, 1.27, 0.4);
grSph(G, 0.36, 0xB8A07A, null, -0.3, 1.25, 0.6, 8).scale.set(1, 0.7, 0.8);
}
P.add(G);
GR.solids.push({ x: x + Math.sin(ry) * 0.6, z: z + Math.cos(ry) * 0.6, hw: 0.9, hd: 2.2, rot: ry, h: 1.8 });
},
function (P, x, z, ry, col) {
for (var i = 0; i < 4; i++) {
var u = (i - 1.5) * 0.55;
grCyl(P, 0.22, 0.22, 1.5, i % 2 ? col : 0x8A919C, "metal", x + Math.cos(ry) * u, 0.75, z - Math.sin(ry) * u, 10);
grSph(P, 0.22, 0x8A919C, "metal", x + Math.cos(ry) * u, 1.5, z - Math.sin(ry) * u, 8);
}
grBox(P, 2.4, 0.08, 0.7, 0x5A5E64, "metal", x, 1.1, z, ry);
GR.solids.push({ x: x, z: z, hw: 1.3, hd: 0.5, rot: ry, h: 1.6 });
},
function (P, x0, z0, x1, z1, rnd) {
[[x0, z0], [x1, z1]].forEach(function (q) { grCyl(P, 0.05, 0.06, 2.2, 0x6A4A2E, "wood", q[0], 1.1, q[1], 5); });
var L = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0);
grBox(P, 0.02, 0.02, L, 0xD8D0C0, null, (x0 + x1) / 2, 2.1, (z0 + z1) / 2, a);
var cs = [0xE8E0D0, 0x8AA8C8, 0xC86A5A, 0xD8C88A, 0xA8C8A0];
for (var i = 1; i < 4; i++) {
var t = i / 4, w = 0.5 + rnd() * 0.4;
grBox(P, 0.03, 0.7, w, cs[Math.floor(rnd() * cs.length)], null, x0 + (x1 - x0) * t, 1.72, z0 + (z1 - z0) * t, a, { ds: true });
}
},
function (P, R, S, x, z, rnd) {
var L = grLook(R), tk = L.tree === undefined ? S.tree : L.tree, k = S.k, f = S.form;
if (k === "crystal" || (L.crys && !tk)) {
GR_DECOR.crystal(P, R, S, x, z, rnd);
return 1.8;
}
if (k === "coral") {
GR_DECOR.coral(P, R, S, x, z, rnd);
return 2.4;
}
if (k === "bone") {
grKit(P, "statue", x, 0.4, z, rnd() * 6, 1);
grCyl(P, 1.6, 1.8, 0.4, S.trim[0], S.trim[1], x, 0.2, z, 12);
return 1.8;
}
if (rnd() < 0.45) {
grKit(P, "fountain", x, 0, z, 0, 0.7);
return 2.6;
}
if (tk && tk !== "coral") {
grCyl(P, 1.8, 1.9, 0.5, S.trim[0], S.trim[1], x, 0.25, z, 14);
grKit(P, tk, x, 0.5, z, rnd() * 6, 0.9 * (L.treeS || 1));
return 1.9;
}
grCyl(P, 1.4, 1.6, 0.6, S.trim[0], S.trim[1], x, 0.3, z, 12);
grKit(P, S.statue || "statue", x, 0.6, z, rnd() * 6, 1);
return 1.6;
},
function (G, P, R, S, x, z, ry, rnd, ctx) {
var leaf = grqLeaf(R), pv = new THREE.Color(S.pave[0]).multiplyScalar(0.82).getHex();
grqPatch(P, x, z, 15, 15, pv, S.pave[1], ry);
grqPatch(P, x, z, 15.6, 15.6, new THREE.Color(S.trim[0]).multiplyScalar(0.7).getHex(), S.trim[1], ry, -0.01);
var c = Math.cos(ry), s = Math.sin(ry), at = function (u, v) { return [x + u * c + v * s, z - u * s + v * c]; };
var r = grqCentre(P, R, S, x, z, rnd);
GR.solids.push({ x: x, z: z, r: r });
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { var p = at(q[0] * 5.2, q[1] * 5.2); grqBed(P, p[0], p[1], 3, 3, ry, "flowers", leaf, rnd, S.trim[0]); });
[[0, -4.6, 0], [0, 4.6, Math.PI], [-4.6, 0, Math.PI / 2], [4.6, 0, -Math.PI / 2]].forEach(function (q, i) { if (ctx.lite && i % 2)
return; var p = at(q[0], q[1]); grqBench(P, p[0], p[1], ry + q[2]); });
var lp = at(6.8, -6.8);
grLamp(P, S, lp[0], lp[1], R);
GR.solids.push({ x: lp[0], z: lp[1], r: 0.35 });
if (!ctx.lite) {
var lp2 = at(-6.8, 6.8);
grLamp(P, S, lp2[0], lp2[1], R);
GR.solids.push({ x: lp2[0], z: lp2[1], r: 0.35 });
}
var pp = at(2.2, -5.6);
ctx.person(pp[0], pp[1], ry + Math.PI * 0.8, "Citizen", "sitting out in the garden square, glad of the air");
return 11;
},
function (G, P, R, S, x, z, ry, rnd, ctx) {
var L = grLook(R), leaf = grqLeaf(R), tk = L.tree === undefined ? S.tree : L.tree, gc = new THREE.Color(leaf).lerp(new THREE.Color(0x6A7A3A), 0.3).getHex();
grqPatch(P, x, z, 18, 14, gc, "grass", ry);
var c = Math.cos(ry), s = Math.sin(ry), at = function (u, v) { return [x + u * c + v * s, z - u * s + v * c]; };
[[-6, -3.5], [6, -4], [-5, 4.5], [5.5, 4]].forEach(function (q, i) {
if (ctx.lite && i > 1)
return;
var p = at(q[0], q[1]);
if (S.k === "fae" || S.k === "timber" || (!tk && S.k !== "station" && S.k !== "future")) {
if (i < 2 && !ctx.lite)
grGreatTree(P, p[0], p[1], 0.5, 7 + rnd() * 2, 4.5, leaf, grHash(R.id + x + i));
else
grqPlanter(P, S, p[0], p[1], leaf, rnd);
}
else if (tk)
grKit(P, tk, p[0], 0, p[1], rnd() * 6, 0.75 * (L.treeS || 1));
else
grqPlanter(P, S, p[0], p[1], leaf, rnd, 0, i % 2 === 0);
GR.solids.push({ x: p[0], z: p[1], r: 0.6 });
});
var t = at(0, 0);
grBox(P, 3.2, 0.1, 1.1, 0x7A5A3A, "wood", t[0], 0.78, t[1], ry);
[-1.3, 1.3].forEach(function (u) { var q = at(u, 0); grBox(P, 0.1, 0.75, 0.9, 0x6A4A2E, "wood", q[0], 0.38, q[1], ry); });
[-0.95, 0.95].forEach(function (v) { var q = at(0, v); grBox(P, 3.2, 0.08, 0.36, 0x7A5A3A, "wood", q[0], 0.46, q[1], ry); });
grSph(P, 0.18, 0xC86A3A, null, t[0] + 0.3, 0.92, t[1], 6);
grCyl(P, 0.14, 0.12, 0.3, 0x8A7AA8, null, t[0] - 0.5, 0.98, t[1], 8);
GR.solids.push({ x: t[0], z: t[1], hw: 1.7, hd: 1.2, rot: ry, h: 1 });
var pp = at(0.6, -1.5);
ctx.person(pp[0], pp[1], ry, "Citizen", "taking a meal out on the green");
return 11;
},
function (G, P, R, S, x, z, ry, rnd, ctx) {
var E = R.env || {}, gcol = new THREE.Color(S.pave[0]).lerp(new THREE.Color(0x6A5A44), 0.5).multiplyScalar(0.8).getHex();
grqPatch(P, x, z, 14, 10, gcol, "paving", ry);
var c = Math.cos(ry), s = Math.sin(ry), at = function (u, v) { return [x + u * c + v * s, z - u * s + v * c]; };
var p = at(-3.5, 0);
grqCart(P, p[0], p[1], ry + 0.3, rnd, ["hay", "veg", "goods"][Math.floor(rnd() * 3)]);
[[2.5, -2.6], [3.6, -2.6], [3, -2.6]].forEach(function (q, i) { var a = at(q[0], q[1]); grqCrate(P, a[0], a[1], ry + rnd() * 0.3, 1, i === 2 ? 0.9 : 0); });
if (!ctx.lite)
[[4.6, 1.2], [5.3, 2.1], [4.4, 2.5]].forEach(function (q) { var a = at(q[0], q[1]); grqBarrel(P, a[0], a[1]); });
var sk = at(1.2, 3.2);
grqSacks(P, sk[0], sk[1], rnd);
if (S.k === "fire" || S.k === "dwarf") {
var an = at(0.5, -0.4);
grFurn(P, "anvil", an[0], 0, an[1], ry);
GR.solids.push({ x: an[0], z: an[1], r: 0.6 });
}
var pp = at(0.6, 1.2);
ctx.person(pp[0], pp[1], ry + Math.PI / 2, "Carter", "loading the cart in a work yard off the street");
return 9;
},
function (G, P, R, S, x, z, ry, rnd, ctx) {
grqPatch(P, x, z, 16, 12, new THREE.Color(S.pave[0]).multiplyScalar(0.72).getHex(), "concrete", ry);
var c = Math.cos(ry), s = Math.sin(ry), at = function (u, v) { return [x + u * c + v * s, z - u * s + v * c]; };
var cols = [S.accent, 0x8A4A2A, 0x4A6A4A, 0xA8884A];
var a = at(-5, 0);
grqContainer(P, S, a[0], a[1], ry, cols[Math.floor(rnd() * 4)]);
if (!ctx.lite) {
var b = at(-2.3, 0);
grqContainer(P, S, b[0], b[1], ry, cols[Math.floor(rnd() * 4)]);
}
var g = at(3, -3.8);
grqBottles(P, g[0], g[1], ry, S.accent);
[[2.6, 1.6], [3.8, 1.6], [3.2, 2.8]].forEach(function (q, i) { var d = at(q[0], q[1]); grBox(P, 1.2, 0.14, 1.2, 0x7A5A3A, "wood", d[0], 0.07, d[1], ry); grqCrate(P, d[0], d[1], ry, 0.85, 0.14, i % 2 ? 0x7A7E84 : 0x8A6A44); });
var pp = at(1, 0);
ctx.person(pp[0], pp[1], ry - Math.PI / 2, "Stores hand", "checking the stores in at the depot");
return 10;
},
function (G, P, R, S, x, z, ry, rnd, ctx) {
var leaf = grqLeaf(R);
grqPatch(P, x, z, 13, 11, 0x5A4632, "grass", ry);
var c = Math.cos(ry), s = Math.sin(ry), at = function (u, v) { return [x + u * c + v * s, z - u * s + v * c]; };
[[-3.6, -2.4], [0, -2.4], [3.6, -2.4], [-3.6, 2.4], [3.6, 2.4]].forEach(function (q, i) { if (ctx.lite && i % 2)
return; var p = at(q[0], q[1]); grqBed(P, p[0], p[1], 2.6, 3.4, ry, "veg", leaf, rnd); });
var wb = at(0.2, 3.4);
grqBarrel(P, wb[0], wb[1]);
var fc = 0x7A6040;
[[0, -5.4, 13, 0], [-6.4, 0, 11, Math.PI / 2], [6.4, 0, 11, Math.PI / 2]].forEach(function (q) {
var m = at(q[0], q[1]);
grBox(P, q[2], 0.08, 0.08, fc, "wood", m[0], 0.9, m[1], ry + q[3]);
grBox(P, q[2], 0.08, 0.08, fc, "wood", m[0], 0.5, m[1], ry + q[3]);
for (var u = -q[2] / 2; u <= q[2] / 2 + 0.01; u += 1.6) {
var pc = Math.cos(ry + q[3]), ps = Math.sin(ry + q[3]);
grBox(P, 0.12, 1.1, 0.12, 0x6A5034, "wood", m[0] + u * pc, 0.55, m[1] - u * ps);
}
GR.solids.push({ x: m[0], z: m[1], hw: q[2] / 2, hd: 0.15, rot: ry + q[3], h: 1.1 });
});
if (S.k === "timber" || S.k === "fae") {
var sc = at(0, 0.2);
grKit(P, "scarecrow", sc[0], 0, sc[1], ry, 0.8);
GR.solids.push({ x: sc[0], z: sc[1], r: 0.5 });
}
var pp = at(-1.8, 0.4);
ctx.person(pp[0], pp[1], ry + Math.PI, "Gardener", "working an allotment between the great buildings");
return 9;
},
function (G, P, R, S, x, z, ry, rnd, ctx) {
grqPatch(P, x, z, 14, 12, new THREE.Color(S.pave[0]).multiplyScalar(0.86).getHex(), S.pave[1], ry);
var c = Math.cos(ry), s = Math.sin(ry), at = function (u, v) { return [x + u * c + v * s, z - u * s + v * c]; };
[[-4.6, 0, Math.PI / 2], [0, -3.8, 0], [4.6, 0, -Math.PI / 2]].forEach(function (q, i) {
if (ctx.lite && i === 2)
return;
var p = at(q[0], q[1]);
if (grKit(P, "marketstall", p[0], 0, p[1], ry + q[2], 1))
GR.solids.push({ x: p[0], z: p[1], hw: 2, hd: 1.5, rot: ry + q[2], h: 3 });
});
[[-5.2, 3.4], [5.2, 3.4]].forEach(function (q) { var p = at(q[0], q[1]); grqBarrel(P, p[0], p[1]); });
var cr = at(2.4, -5);
grqCrate(P, cr[0], cr[1], ry, 0.9);
var sk = at(-2.6, -5.1);
grqSacks(P, sk[0], sk[1], rnd);
var w = GR_STALL_WARES[(grHash(R.id) + Math.abs(Math.round(x))) % GR_STALL_WARES.length], pp = at(0, -1.4);
ctx.person(pp[0], pp[1], ry, w[1].charAt(0).toUpperCase() + w[1].slice(1), "keeping a stall of " + w[0] + " in a corner market off the avenue");
if (!ctx.lite) {
var p2 = at(-1.6, 1.8);
ctx.person(p2[0], p2[1], ry + Math.PI * 0.9, "Shopper", "out buying " + w[0]);
}
return 10;
},
function (P, R, S, x, z) {
[-1, 1].forEach(function (sd) { var a = grBox(P, 0.1, 2.6, 0.1, 0x6A4A2E, "wood", x + sd * 1.1, 1.2, z + 0.4, 0); a.rotation.x = 0.3; var b = grBox(P, 0.1, 2.6, 0.1, 0x6A4A2E, "wood", x + sd * 1.1, 1.2, z - 0.4, 0); b.rotation.x = -0.3; });
grBox(P, 2.4, 0.1, 0.1, 0x6A4A2E, "wood", x, 2.45, z);
grBox(P, 0.6, 0.05, 0.25, 0x7A5A3A, "wood", x, 0.6, z);
[-0.25, 0.25].forEach(function (u) { grBox(P, 0.02, 1.8, 0.02, 0x8A8070, null, x + u, 1.5, z); });
return 1.4;
},
function (P, R, S, x, z) {
grBox(P, 0.8, 0.3, 0.8, S.trim[0], "stone", x, 0.15, z);
grCyl(P, 0.16, 0.2, 1, S.trim[0], "stone", x, 0.8, z, 6);
grBox(P, 0.7, 0.12, 0.7, S.trim[0], "stone", x, 1.35, z);
grBox(P, 0.5, 0.5, 0.5, 0xF0C880, null, x, 1.66, z, 0, { glow: true });
grCone(P, 0.62, 0.5, S.trim[0], "stone", x, 2.16, z, 4).rotation.y = Math.PI / 4;
if (!grLite())
grGlow(P, 0xF0C080, 2, 0.2, x, 1.66, z);
return 0.7;
},
function (P, R, S, x, z, ry, r, rnd, n) {
var L = GRQ_TOUCHES[R.id];
if (!L)
return;
var c = Math.cos(ry), s = Math.sin(ry), k = L[(n || 0) % L.length], f = GRQ_TOUCH[k];
if (!f)
return;
var tries = [[0, r + 1.6], [r + 1.6, 0], [-(r + 1.6), 0], [0, -(r + 1.6)]];
for (var i = 0; i < tries.length; i++) {
var u = tries[i][0], v = tries[i][1], px = x + u * c + v * s, pz = z - u * s + v * c;
if (!grqFree(px, pz, 1.6))
continue;
var rr = f(P, R, S, px, pz, rnd) || 1.2;
GR.solids.push({ x: px, z: pz, r: rr * 0.8 });
GR.taken.push({ x: px, z: pz, r: rr + 0.6 });
return;
}
},
function (G, P, R, S) {
var lite = grLite(), rnd = wRand(grHash(R.id) + 2226), isle = R.layout === "isles", set = GRQ_SETS[S.k] || GRQ_SETS.classical;
var B = GR_AT.bound, pts = [], step = isle ? 14 : 22;
for (var x = B.x0 + 14; x < B.x1 - 14; x += step)
for (var z = B.z0 + 14; z < B.z1 - 14; z += step)
pts.push([x + (rnd() - 0.5) * step * 0.6, z + (rnd() - 0.5) * step * 0.6, rnd()]);
pts.sort(function (a, b) { return (Math.hypot(a[0], a[1] - 120) * (0.7 + a[2] * 0.6)) - (Math.hypot(b[0], b[1] - 120) * (0.7 + b[2] * 0.6)); });
var cap = lite ? 14 : 40, made = 0, people = 0, pcap = lite ? 6 : 22, k = grHash(R.id) % set.length;
var ctx = { lite: lite, person: function (x, z, ry, t, who) { if (people >= pcap || (lite && made % 2))
return; if (!grqFree(x, z, 0.4))
return; grqPerson(G, R, made * 3 + people, x, z, ry, t, who); people++; } };
for (var i = 0; i < pts.length && made < cap; i++) {
var p = pts[i], kind = set[k % set.length], need = isle ? 8 : 11.5;
if (kind === "depot" && S.k !== "station" && S.k !== "future" && S.k !== "fire")
kind = "yard";
if (!grFree(p[0], p[1], need) || !grqFree(p[0], p[1], need))
continue;
if (isle && !grqFree(p[0], p[1], need * 0.95))
continue;
var ry = Math.round(rnd() * 4) * Math.PI / 2 + (rnd() - 0.5) * 0.3;
try {
var r = GRQ_MAKE[kind](G, P, R, S, p[0], p[1], ry, rnd, ctx);
if (!lite || made % 2 === 0)
grqTouch(P, R, S, p[0], p[1], ry, 7.6, rnd, made);
GR.taken.push({ x: p[0], z: p[1], r: r || 10 });
made++;
k++;
}
catch (e) {
if (window.console)
console.warn("[grand] quarter", kind, e);
}
}
GRQ.made = made;
try {
grqGardenIsles(G, P, R, S, ctx);
}
catch (e) {
if (window.console)
console.warn("[grand] garden isles", e);
}
},
function (G, P, R, S) {
var lite = grLite(), leaf = grqLeaf(R), rnd = wRand(grHash(R.id) + 3131);
(GR.sites || []).forEach(function (st, i) {
if (st.id === "p")
return;
var c = Math.cos(st.rot), s = Math.sin(st.rot), y = st.y || 0;
var at = function (u, v) { return [st.x + u * c + v * s, st.z - u * s + v * c]; };
var front = st.d / 2 + 3.2, half = st.w / 2;
[-1, 1].forEach(function (sd) {
var p = at(sd * Math.min(half - 1, 5.2), front);
if (grqFree(p[0], p[1], 0.9, y)) {
grqPlanter(P, S, p[0], p[1], leaf, rnd, y, S.k === "classical" || S.k === "eastern" || S.k === "gothic");
GR.taken.push({ x: p[0], z: p[1], r: 1 });
}
if (lite)
return;
var p2 = at(sd * Math.min(half - 1, 8.6), front + 0.4);
if (grqFree(p2[0], p2[1], 1.2, y)) {
grqBench(P, p2[0], p2[1], st.rot, y);
}
var p3 = at(sd * (half + 1.2), st.d / 2 + 1.5);
if (grqFree(p3[0], p3[1], 0.6, y)) {
grLamp(P, S, p3[0], p3[1], R);
GR.solids.push({ x: p3[0], z: p3[1], r: 0.35 });
GR.taken.push({ x: p3[0], z: p3[1], r: 0.6 });
}
var p4 = at(sd * (half * 0.55 + 2.2), st.d / 2 + 0.9);
if (half > 9 && grqFree(p4[0], p4[1], 1.2, y)) {
grqBed(P, p4[0], p4[1], Math.min(5, half * 0.5), 1.2, st.rot, "flowers", leaf, rnd, S.trim[0], y);
GR.taken.push({ x: p4[0], z: p4[1], r: 2 });
}
});
if (!lite || i % 2 === 0) {
var pp = at((i % 2 ? -1 : 1) * 3.6, front + 2.5);
if (grqFree(pp[0], pp[1], 0.5, y))
grqPerson(G, R, 40 + i, pp[0], pp[1], st.rot + (i % 2 ? 0.5 : -0.5), "Visitor", "just come out of " + st.name, undefined);
}
});
},
function (G, P, R, S) {
var lite = grLite(), leaf = grqLeaf(R), rnd = wRand(grHash(R.id) + 4141), L = grLook(R), tk = L.tree === undefined ? S.tree : L.tree, n = 0;
(GRQ.homes || []).forEach(function (h, i) {
if (lite && i % 2)
return;
if (h.form === "tree")
return;
var c = Math.cos(h.rot), s = Math.sin(h.rot), at = function (u, v) { return [h.x + u * c + v * s, h.z - u * s + v * c]; };
var back = -(5.2 * h.sc + 4.2), g = at(0, back);
if (!grqFree(g[0], g[1], 3.6))
return;
var fc = S.k === "station" || S.k === "future" ? 0x7A7E84 : 0x7A6040, ftx = S.k === "station" || S.k === "future" ? "metal" : "wood";
[[0, back - 3.2, 8, 0], [-4, back, 6.4, Math.PI / 2], [4, back, 6.4, Math.PI / 2]].forEach(function (q) {
var m = at(q[0], q[1]);
grBox(P, q[2], 0.08, 0.06, fc, ftx, m[0], 0.95, m[1], h.rot + q[3]);
grBox(P, q[2], 0.08, 0.06, fc, ftx, m[0], 0.45, m[1], h.rot + q[3]);
if (!lite)
for (var u = -q[2] / 2; u <= q[2] / 2 + 0.01; u += 1.3) {
var pc = Math.cos(h.rot + q[3]), ps = Math.sin(h.rot + q[3]);
grBox(P, 0.1, 1.15, 0.1, fc, ftx, m[0] + u * pc, 0.58, m[1] - u * ps);
}
GR.solids.push({ x: m[0], z: m[1], hw: q[2] / 2, hd: 0.12, rot: h.rot + q[3], h: 1.2 });
});
var kind = (i + grHash(R.id)) % 3;
if (kind === 0) {
var b1 = at(-1.8, back - 1.2);
grqBed(P, b1[0], b1[1], 3, 1.4, h.rot, "veg", leaf, rnd);
var b2 = at(1.8, back - 1.2);
grqBed(P, b2[0], b2[1], 3, 1.4, h.rot, "flowers", leaf, rnd);
}
else if (kind === 1) {
var t = at(-1.6, back - 0.8);
if (tk && tk !== "coral" && !/crystal/.test(tk))
grKit(P, tk, t[0], 0, t[1], rnd() * 6, 0.55);
else
grqPlanter(P, S, t[0], t[1], leaf, rnd);
GR.solids.push({ x: t[0], z: t[1], r: 0.5 });
var b3 = at(1.8, back - 1.6);
grqBed(P, b3[0], b3[1], 2.4, 1.2, h.rot, "flowers", leaf, rnd);
}
else {
var w0 = at(-3, back - 1.8), w1 = at(2.6, back - 1.8);
grqWash(P, w0[0], w0[1], w1[0], w1[1], rnd);
var b4 = at(0, back + 0.2);
grqBed(P, b4[0], b4[1], 4, 1, h.rot, "flowers", leaf, rnd);
}
var wb = at(3.2, back + 1.4);
grqBarrel(P, wb[0], wb[1]);
GR.taken.push({ x: g[0], z: g[1], r: 4.4 });
n++;
if (!lite && n % 5 === 2) {
var pp = at(0.4, back - 0.2);
if (grqFree(pp[0], pp[1], 0.4))
grqPerson(G, R, 60 + i, pp[0], pp[1], h.rot + Math.PI, "Householder", "out in the back garden");
}
});
},
function (G, P, R, S) {
var A = GR_AT.arena, lite = grLite(), rnd = wRand(grHash(R.id) + 5151), titles = ["Onlooker", "Recruit", "Trainer", "Supporter"];
var n = lite ? 4 : 10;
for (var i = 0; i < n; i++) {
var sd = i % 2 ? 1 : -1, t = 1 + (i >> 1) % 3, x = A.x - A.w / 2 + 8 + ((i * 7 + 3) % 11) / 11 * (A.w - 16), z = A.z + sd * (A.d / 2 + 1.6 + t * 1.6), y = 1.7 + t * 0.9;
var p = grPersonAt(G, R, { n: (R.names || ["Ash"])[(i * 3 + 5) % (R.names || ["Ash"]).length] + (R.surnames ? " " + R.surnames[(i * 7 + 2) % R.surnames.length] : ""), t: titles[i % 4], who: "watching the drill from the stands of " + ((R.arena && R.arena.n) || "the training ground") }, x, z, sd > 0 ? Math.PI : 0, true);
if (p && p.g)
p.g.position.y = y;
}
for (var j = 0; j < (lite ? 2 : 4); j++) {
var dx = A.x - A.w / 2 + 5, dz = A.z - 12 + j * 8;
if (Math.abs(dz - A.z) < 3.5)
continue;
grCyl(P, 0.08, 0.1, 2.2, 0x6A4A2E, "wood", dx, 1.1, dz, 6);
grBox(P, 1.1, 0.1, 0.1, 0x6A4A2E, "wood", dx, 1.6, dz);
var sk = grCyl(P, 0.32, 0.36, 0.9, 0xC8B080, null, dx, 1.55, dz, 8);
grSph(P, 0.24, 0xC8B080, null, dx, 2.2, dz, 8);
GR.solids.push({ x: dx, z: dz, r: 0.5 });
}
for (var k = 0; k < (lite ? 1 : 3); k++) {
var bx = A.x - A.w / 2 + 14 + k * 7, bz = A.z - A.d / 2 + 3;
var bt = grCyl(P, 0.9, 0.9, 0.4, 0xC8B080, null, bx, 1.2, bz, 16);
bt.rotation.x = Math.PI / 2;
[0xE8E0D0, 0x3A5A9A, 0xC83A2A, 0xE8C04A].forEach(function (c, ci) { var rg = grCyl(P, 0.85 - ci * 0.2, 0.85 - ci * 0.2, 0.02, c, null, bx, 1.2, bz + 0.21, 16); rg.rotation.x = Math.PI / 2; });
[-0.5, 0.5].forEach(function (u) { grBox(P, 0.08, 1.4, 0.08, 0x6A4A2E, "wood", bx + u, 0.7, bz - 0.3); });
GR.solids.push({ x: bx, z: bz, r: 1 });
}
if (!lite)
for (var q = 0; q < 6; q++) {
var px = A.x - A.w / 2 + 6 + q * (A.w - 12) / 5;
[-1, 1].forEach(function (sd) {
var pz = A.z + sd * (A.d / 2 + 8.6);
grCyl(P, 0.06, 0.07, 4, 0x5A5A5A, "metal", px, 4.2, pz, 5);
var f = grBox(P, 0.04, 1.2, 0.9, q % 2 ? S.accent : S.trim[0], null, px, 5.6, pz + 0.45 * sd);
});
}
},
function (G, P, R, S) {
var D = GR_AT.deep, lite = grLite(), rnd = wRand(grHash(R.id) + 6161), made = 0;
var near = function (x, z, r) { for (var i = 0; i < (GR.gathers || []).length; i++) {
var g = GR.gathers[i];
if (Math.hypot(g.x - x, g.z - z) < r + 3)
return true;
} return false; };
var station = S.k === "station" || S.k === "future";
for (var i = 0; i < (lite ? 8 : 20); i++) {
var an = (i + 0.5) / (lite ? 8 : 20) * Math.PI * 2 + 0.2, rr = D.r - (i % 2 ? 14 : 30), x = D.x + Math.cos(an) * rr, z = D.z + Math.sin(an) * rr;
if (near(x, z, 3) || !grqFree(x, z, 2.6))
continue;
var ry = -an - Math.PI / 2, kind = i % 3;
if (kind === 0) {
if (grKit(P, "marketstall", x, 0, z, ry, 1)) {
GR.solids.push({ x: x, z: z, hw: 2, hd: 1.5, rot: ry, h: 3 });
var bx = x + Math.cos(an + 0.35) * 3, bz = z + Math.sin(an + 0.35) * 3;
if (grqFree(bx, bz, 0.6))
grqBarrel(P, bx, bz);
}
}
else if (kind === 1) {
if (station) {
grqBottles(P, x, z, ry, S.accent);
grqCrate(P, x + 1.6, z + 1.2, ry, 0.9, 0, 0x7A7E84);
}
else
grqCart(P, x, z, ry, rnd, ["goods", "hay", "veg"][i % 3]);
}
else {
grqCrate(P, x, z, ry, 1);
grqCrate(P, x + 1.1, z + 0.2, ry + 0.2, 1);
grqCrate(P, x + 0.5, z, ry, 0.85, 0.9);
grqSacks(P, x - 1.6, z + 1, rnd);
}
GR.taken.push({ x: x, z: z, r: 3 });
if (made < (lite ? 3 : 8) && i % 2 === 0) {
var px = D.x + Math.cos(an) * (rr - 3.4), pz = D.z + Math.sin(an) * (rr - 3.4);
if (grqFree(px, pz, 0.5)) {
grqPerson(G, R, 80 + i, px, pz, -an + Math.PI / 2, station ? "Technician" : "Porter", "at work in " + ((R.deep && R.deep.n) || "the far district"));
made++;
}
}
}
for (var j = 0; j < (lite ? 4 : 8); j++) {
var a2 = j / 8 * Math.PI * 2 + Math.PI / 8, lx = D.x + Math.cos(a2) * (D.r - 3), lz = D.z + Math.sin(a2) * (D.r - 3);
if (near(lx, lz, 1) || !grqFree(lx, lz, 0.8))
continue;
grLamp(P, S, lx, lz, R);
GR.solids.push({ x: lx, z: lz, r: 0.35 });
GR.taken.push({ x: lx, z: lz, r: 1 });
}
var leaf = grqLeaf(R);
for (var b = 0; b < (lite ? 4 : 8); b++) {
var a3 = b / 8 * Math.PI * 2 + Math.PI / 8, bx2 = D.x + Math.cos(a3) * 16, bz2 = D.z + Math.sin(a3) * 16;
if (b % 2 === 0) {
if (grqFree(bx2, bz2, 1.3))
grqBench(P, bx2, bz2, -a3 - Math.PI / 2);
}
else if (grqFree(bx2, bz2, 1))
grqPlanter(P, S, bx2, bz2, leaf, rnd);
}
for (var w = 0; w < (lite ? 1 : 4); w++) {
var a4 = w / 4 * Math.PI * 2 + 0.6, wx = D.x + Math.cos(a4) * 24, wz = D.z + Math.sin(a4) * 24;
if (grqFree(wx, wz, 0.5))
grqPerson(G, R, 120 + w, wx, wz, rnd() * 6, ["Porter", "Clerk", "Miner", "Trader"][w], "crossing the square of " + ((R.deep && R.deep.n) || "the far district"));
}
},
function (G, P, R, S) {
var T = GR_AT.terr[0], y = T.h, lite = grLite(), leaf = grqLeaf(R), rnd = wRand(grHash(R.id) + 7171);
[-1, 1].forEach(function (sd) {
var x0 = sd * 16, x1 = sd * (T.x1 - 6), cx = (x0 + x1) / 2, cz = (T.z0 + T.z1) / 2, w = Math.abs(x1 - x0), d = T.z1 - T.z0 - 12;
if (!grqFree(cx, cz, 2, y))
return;
[-1, 1].forEach(function (h) {
var px = cx + h * w / 4, pw = w / 2 - 5, pd = d - 4;
[[px, cz - pd / 2, pw, 0], [px, cz + pd / 2, pw, 0], [px - pw / 2, cz, pd, Math.PI / 2], [px + pw / 2, cz, pd, Math.PI / 2]].forEach(function (q, qi) {
if (qi === 1) {
var gl = (q[2] - 3) / 2;
[-1, 1].forEach(function (g2) { grqHedge(P, q[0] + g2 * (1.5 + gl / 2), q[1], gl, 0, leaf, y, 0.7); });
return;
}
grqHedge(P, q[0], q[1], q[2], q[3], leaf, y, 0.7);
});
grqPatch(P, px, cz, pw - 1, pd - 1, new THREE.Color(leaf).lerp(new THREE.Color(0x6A7A3A), 0.4).getHex(), "grass", 0, y);
[-1, 1].forEach(function (v) { grqBed(P, px, cz + v * (pd / 2 - 1.6), pw - 4, 1.2, 0, "flowers", leaf, rnd, S.trim[0], y); });
[-1, 1].forEach(function (u) { grqBed(P, px + u * (pw / 2 - 1.6), cz, 1.2, pd - 8, 0, "flowers", leaf, rnd, S.trim[0], y); });
[[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]].forEach(function (q, qi) { if (lite && qi % 2)
return; grqBed(P, px + q[0] * (pw / 4 + 0.4), cz + q[1] * (pd / 3 - 0.5), pw / 2 - 6.5, 4.2, 0, "flowers", leaf, rnd, S.trim[0], y); });
grCyl(P, 2.6, 2.7, 0.55, S.trim[0], S.trim[1], px, y + 0.27, cz, 20);
grCyl(P, 2.25, 2.25, 0.06, (grLook(R).water) || 0x3A6A7A, null, px, y + 0.5, cz, 20, { op: 0.88 });
grCyl(P, 0.28, 0.36, 1.3, S.trim[0], S.trim[1], px, y + 1.1, cz, 10);
grCyl(P, 0.75, 0.5, 0.25, S.trim[0], S.trim[1], px, y + 1.85, cz, 12);
GR.solids.push({ x: px, z: cz, r: 2.7, h: y + 2 });
var tk = (grLook(R).tree === undefined ? S.tree : grLook(R).tree);
[[0, -1], [0, 1], [-1, -0.5], [1, -0.5], [-1, 0.5], [1, 0.5]].forEach(function (q, qi) {
if (lite && qi > 1)
return;
var tx = px + q[0] * (pw / 4 + 0.4), tz = cz + q[1] * (pd / 6 + 1.2);
if (q[0] === 0)
tz = cz + q[1] * (pd / 3 - 0.5);
if (q[0] !== 0) {
tx = px + q[0] * 1.2 * (pw / 8);
tz = cz + q[1] * (pd / 3) * 1.3;
}
if (tk && tk !== "coral" && tk !== "crystalspire")
grKit(P, tk, tx, y, tz, rnd() * 6, 0.55);
else {
grCyl(P, 0.1, 0.14, 1.6, 0x5A4632, "bark", tx, y + 0.8, tz, 6);
grLeafClump(P, 0.95, new THREE.Color(leaf).offsetHSL(0, 0, (rnd() - 0.5) * 0.1).getHex(), tx, y + 2.2, tz, grHash("tt" + tx + tz), lite);
}
GR.solids.push({ x: tx, z: tz, r: 0.5, h: y + 4 });
});
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c2) { if (lite && c2[0] > 0)
return; grCone(P, 0.55, 2, new THREE.Color(leaf).multiplyScalar(0.72).getHex(), null, px + c2[0] * (pw / 2), y + 1.6, cz + c2[1] * (pd / 2), 8); grCyl(P, 0.5, 0.5, 0.6, S.trim[0], S.trim[1], px + c2[0] * (pw / 2), y + 0.3, cz + c2[1] * (pd / 2), 8); });
grqPerson(G, R, 95 + h + (sd > 0 ? 2 : 0), px + (pw / 4 - 2), cz + (pd / 3 - 3.6), Math.PI * 0.7, "Gardener", "tending the beds in the gardens below " + ((R.palace && R.palace.n) || "the seat"), y);
});
grKit(P, "fountain", cx, y, cz, 0, 0.6);
GR.solids.push({ x: cx, z: cz, r: 2.4, h: y + 3 });
[-1, 1].forEach(function (v) { [6.5, 11, 16].forEach(function (dz, di) { if (lite && di > 1)
return; if (di === 0)
return; grqBench(P, cx + 1.9, cz + v * dz, -Math.PI / 2, y); grqBench(P, cx - 1.9, cz + v * dz, Math.PI / 2, y); }); });
if (!lite)
grqPerson(G, R, 92 + (sd > 0 ? 1 : 0), cx, cz - 8.6, 0, "Citizen", "sitting in the palace gardens", y);
GR.taken.push({ x: cx, z: cz, r: w / 2 });
grqPerson(G, R, 90 + (sd > 0 ? 1 : 0), cx - 2.6 * sd, cz + 4, sd > 0 ? -Math.PI / 2 : Math.PI / 2, "Courtier", "walking in the gardens below " + ((R.palace && R.palace.n) || "the seat"), y);
});
},
function (R, S) {
var k = S.k, E = R.env || {};
if (k === "fire")
return { lawn: [0x3A302A, "paving"], pave: [0x4A3E38, "stone"], shrub: 0x5A4A30, rock: true, tree: null };
if (k === "dwarf")
return { lawn: [0x3E4A2E, "grass"], pave: [0x5A4E42, "paving"], shrub: 0x4A5A34, tree: "giantmushroom", treeS: 0.35 };
if (k === "ice")
return { lawn: [0xC0C8D0, "snow"], pave: [0x8E9AA6, "paving"], shrub: 0x3E5A4A, tree: "pine", treeS: 0.6 };
if (k === "bone")
return { lawn: [0x4A5A3E, "grass"], pave: [0x6A6860, "paving"], shrub: 0x3E4E36, tree: "deadtree", treeS: 0.6 };
if (k === "crystal")
return { lawn: [0x5A4A7A, "grass"], pave: [S.pave[0], S.pave[1]], shrub: 0x6A5A9A, tree: null };
return { lawn: [0x4E6E38, "grass"], pave: [new THREE.Color(S.pave[0]).multiplyScalar(0.9).getHex(), S.pave[1]], shrub: 0x4A7034, tree: (S.tree && S.tree !== "coral" && S.tree !== "crystalspire") ? S.tree : null, treeS: 0.75 };
},
function (G, P, R, S) {
if (R.layout === "isles" || (typeof grMeadowKind === "function" && grMeadowKind(R)))
return;
var lite = grLite(), K = grqParcelKind(R, S), A = GR_AT, B = A.bound, cell = lite ? 16 : 12, rnd = wRand(grHash(R.id) + 8181), trees = 0, tcap = lite ? 40 : 120;
var kerb = new THREE.Color(S.trim[0]).multiplyScalar(0.75).getHex();
for (var x = B.x0 + 10; x < B.x1 - 10; x += cell)
for (var z = B.z0 + 10; z < B.z1 - 10; z += cell) {
var hs = cell / 2 - 1.2, ok = true;
if (grReserved(x, z, hs))
continue;
[[0, 0], [hs, hs], [-hs, hs], [hs, -hs], [-hs, -hs]].forEach(function (o) { if (!ok)
return; if (Math.abs(grGround(x + o[0], z + o[1], 0)) > 0.04 || worldSolidAt(GR.solids, x + o[0], z + o[1], 0))
ok = false; });
if (!ok)
continue;
for (var j = 0; j < GR.sites.length; j++) {
var st = GR.sites[j];
if (Math.hypot(x - st.x, z - st.z) < Math.hypot(st.w, st.d) / 2 + hs + 4) {
ok = false;
break;
}
}
if (!ok)
continue;
var r = rnd(), w = hs * 2 - rnd() * 2, d = hs * 2 - rnd() * 2;
if (r < 0.58) {
grBox(P, w + 0.5, 0.16, d + 0.5, kerb, S.trim[1], x, 0.08, z);
grBox(P, w, 0.06, d, new THREE.Color(K.lawn[0]).offsetHSL(0, 0, (rnd() - 0.5) * 0.05).getHex(), K.lawn[1], x, 0.15, z);
var t = rnd();
if (K.tree && t < 0.45 && trees < tcap) {
grKit(P, K.tree, x + (rnd() - 0.5) * 2, 0.18, z + (rnd() - 0.5) * 2, rnd() * 6, (K.treeS || 0.7) * (0.85 + rnd() * 0.3));
GR.solids.push({ x: x, z: z, r: 0.6 });
trees++;
}
else if (K.rock && t < 0.5) {
for (var q = 0; q < 3; q++)
grRock(P, (R.env && R.env.rock) || 0x4A403A, "stone", x + (rnd() - 0.5) * w * 0.6, z + (rnd() - 0.5) * d * 0.6, 0.8 + rnd() * 1.2, rnd);
GR.solids.push({ x: x, z: z, r: 1.6 });
}
else if (trees < tcap) {
var n = lite ? 2 : 4 + Math.floor(rnd() * 4);
for (var c = 0; c < n; c++) {
var sx = x + (rnd() - 0.5) * w * 0.6, sz = z + (rnd() - 0.5) * d * 0.6, sr = 0.7 + rnd() * 0.6;
grLeafClump(P, sr, new THREE.Color(K.shrub).offsetHSL(0, 0, (rnd() - 0.5) * 0.12).getHex(), sx, 0.15 + sr * 0.6, sz, grHash(R.id + x + ":" + z + c), true);
}
GR.solids.push({ x: x, z: z, r: Math.min(w, d) * 0.3 });
trees++;
}
if (!lite && rnd() < 0.5) {
var e = rnd() < 0.5 ? -1 : 1;
grqBed(P, x, z + e * (d / 2 - 0.9), w - 2, 1.1, 0, "flowers", K.shrub, rnd, S.trim[0], 0.12);
}
if (!lite && rnd() < 0.3) {
var e2 = rnd() < 0.5 ? -1 : 1;
grqBench(P, x + e2 * (w / 2 + 1.4), z, e2 > 0 ? -Math.PI / 2 : Math.PI / 2);
}
}
else if (r < 0.85) {
grBox(P, w, 0.07, d, new THREE.Color(K.pave[0]).offsetHSL(0, 0, (rnd() - 0.5) * 0.08).getHex(), K.pave[1], x, 0.035, z);
if (rnd() < 0.55 && !lite) {
[[-1, -1], [1, 1]].forEach(function (q) { grqPlanter(P, S, x + q[0] * w * 0.3, z + q[1] * d * 0.3, K.shrub, rnd); });
if (rnd() < 0.5)
grqBench(P, x, z, rnd() < 0.5 ? 0 : Math.PI);
}
}
else {
grBox(P, w, 0.05, d, new THREE.Color(K.pave[0]).lerp(new THREE.Color(0x6A6256), 0.5).multiplyScalar(0.85).getHex(), "paving", x, 0.025, z, 0);
}
}
},
function (G, P, R, S, ctx) {
if (R.layout !== "isles")
return;
var lite = grLite(), rnd = wRand(grHash(R.id) + 9191), u = grLook(R).under, sky = u !== "sea" && u !== "silver", made = 0, cap = lite ? 4 : 9;
var set = GRQ_SETS[S.k] || GRQ_SETS.classical, k = grHash(R.id) % set.length, rr = 11.5;
var groups = [];
[-1, 1].forEach(function (sd) { [48, 75, 102, 129, 156, 183].forEach(function (x) { [-1, 1].forEach(function (dz) { var g = []; for (var e = 0; e <= 24; e += 4)
g.push([sd * x, 80 + dz * (8 + 2 + rr + e), 0, -dz * (rr + 0.5)]); groups.push(g); }); }); });
[215, 185, 155, 125, 35, 5, -25, -55, -85].forEach(function (z) { [-1, 1].forEach(function (sd) { var g = []; for (var e = 0; e <= 24; e += 4)
g.push([sd * (10 + 2 + rr + e), z, -sd * (rr + 0.5), 0]); groups.push(g); }); });
for (var gi = groups.length - 1; gi > 0; gi--) {
var gj = Math.floor(rnd() * (gi + 1)), tmp = groups[gi];
groups[gi] = groups[gj];
groups[gj] = tmp;
}
groups.forEach(function (g) { var done = false; g.forEach(function (c) { if (done || made >= cap)
return; if (tryAt(c))
done = true; }); });
function tryAt(c) {
var x = c[0], z = c[1], ok = true;
for (var a = 0; a < 12 && ok; a++) {
var an = a / 12 * Math.PI * 2;
if (grOnIsle(x + Math.cos(an) * rr * 0.9, z + Math.sin(an) * rr * 0.9) || worldSolidAt(GR.solids, x + Math.cos(an) * rr, z + Math.sin(an) * rr, 0))
ok = false;
}
if (!ok || grOnIsle(x, z))
return false;
for (var j = 0; j < GR.sites.length; j++) {
var st = GR.sites[j];
if (Math.hypot(x - st.x, z - st.z) < Math.hypot(st.w, st.d) / 2 + rr + 3)
return false;
}
for (var t = 0; t < GR.taken.length; t++) {
var q = GR.taken[t];
if (Math.hypot(q.x - x, q.z - z) < q.r + rr)
return false;
}
var B = GR_AT.bound;
if (x < B.x0 + rr || x > B.x1 - rr || z < B.z0 + rr || z > B.z1 - rr)
return false;
var bx = x + c[2], bz = z + c[3], dx = c[2] ? Math.sign(c[2]) : 0, dz = c[3] ? Math.sign(c[3]) : 0;
var ex = bx, ez = bz, L = 0;
while (L < 30 && !grOnIsle(ex, ez)) {
ex += dx;
ez += dz;
L++;
}
if (L >= 30)
return false;
for (var bl = 1; bl < L; bl += 2) {
if (worldSolidAt(GR.solids, bx + dx * bl, bz + dz * bl, 0))
return false;
}
L += 1.5;
var mx = bx + dx * (L / 2 - 0.5), mz = bz + dz * (L / 2 - 0.5), along = dz !== 0;
GR.isles.push({ x: x, z: z, r: rr + 0.6 }, { x0: mx - (along ? 2.6 : L / 2), x1: mx + (along ? 2.6 : L / 2), z0: mz - (along ? L / 2 : 2.6), z1: mz + (along ? L / 2 : 2.6) });
grCyl(P, rr + 0.6, rr + 0.6, 0.8, S.trim[0], S.trim[1], x, -0.38, z, 28);
if (sky) {
var kl = grCone(P, rr * 0.9, rr * 1.6, (R.env && R.env.rock) || 0x6A5E50, "stone", x, -0.8 - rr * 0.8, z, 9);
kl.rotation.x = Math.PI;
}
grBox(P, along ? 5.2 : L, 0.6, along ? L : 5.2, S.trim[0], S.trim[1], mx, -0.28, mz);
[-1, 1].forEach(function (sd) { var rx = mx + (along ? sd * 2.5 : 0), rz = mz + (along ? 0 : sd * 2.5); grBox(P, along ? 0.15 : L, 1, along ? L : 0.15, S.trim[0], "metal", rx, 0.5, rz); GR.solids.push({ x: rx, z: rz, hw: along ? 0.12 : L / 2, hd: along ? L / 2 : 0.12, h: 1.1 }); });
var n = lite ? 14 : 28;
for (var i = 0; i < n; i++) {
var a2 = i / n * Math.PI * 2, px = x + Math.cos(a2) * (rr + 0.2), pz = z + Math.sin(a2) * (rr + 0.2);
if (Math.hypot(px - (x + c[2] / (rr + 0.5) * rr), pz - (z + c[3] / (rr + 0.5) * rr)) < 3.4)
continue;
grCyl(P, 0.1, 0.12, 1, S.trim[0], S.trim[1], px, 0.5, pz, 6);
GR.solids.push({ x: px, z: pz, r: 0.25, h: 1.1 });
var a3 = (i + 0.5) / n * Math.PI * 2;
var rl = grBox(P, 0.12, 0.1, (rr + 0.2) * Math.PI * 2 / n + 0.1, S.trim[0], S.trim[1], x + Math.cos(a3) * (rr + 0.2), 1.02, z + Math.sin(a3) * (rr + 0.2));
rl.rotation.y = -a3;
}
GR.taken.push({ x: x, z: z, r: rr + 1 });
var kind = set[k % set.length];
if (kind === "depot" || kind === "yard" || kind === "plot")
kind = "green";
k++;
try {
var gt = GR.taken.pop();
GRQ_MAKE[kind](G, P, R, S, x, z, Math.atan2(c[2], c[3]) + Math.PI, rnd, ctx);
grqTouch(P, R, S, x, z, Math.atan2(c[2], c[3]) + Math.PI, 7.6, rnd, made);
GR.taken.push(gt);
}
catch (e) {
if (window.console)
console.warn("[grand] garden isle", e);
}
made++;
return true;
}
},
function (P, I, S, pl, X0, Z0, W, DD, HH, RH) {
var lite = grLite(), R = GR.R, hw = pl.hallW / 2, hz0 = Z0 + pl.hall.z0, hz1 = Z0 + pl.hall.z1, rnd = wRand(grHash(R.id + I.site.b.n)), leaf = grqLeaf(R);
var doorsZ = [];
pl.rooms.forEach(function (r) { if (!r.seat)
doorsZ.push(Z0 + (r.z0 + r.z1) / 2); });
var clear = function (z) { for (var i = 0; i < doorsZ.length; i++)
if (Math.abs(z - doorsZ[i]) < 2.6)
return false; return z > hz0 + 2.5 && z < hz1 - 6; };
var cl = [];
for (var cz = pl.hall.z0 + 4; cz < pl.hall.z1 - 3; cz += 6)
cl.push(Z0 + cz);
[-1, 1].forEach(function (sd) {
for (var i = 0; i + 1 < cl.length; i++) {
var bz = (cl[i] + cl[i + 1]) / 2;
if (!clear(bz) || (lite && i % 2))
continue;
var bx = X0 + sd * (hw - 1.6);
if (grFurn(P, "benchin", bx, 0, bz, Math.PI / 2))
I.solids.push({ x: bx, z: bz, hw: 0.35, hd: 1.15 });
}
for (var j = 0; j < cl.length; j++) {
var pz = cl[j];
if (!clear(pz) || (lite && j % 2))
continue;
var px = X0 + sd * (hw - 0.6);
if (grFurn(P, "plant", px, 0, pz, 0, 1.5))
I.solids.push({ x: px, z: pz, r: 0.4 });
}
});
var mz = (hz0 + hz1) / 2;
grCyl(P, 1.3, 1.45, 0.8, S.trim[0], S.trim[1], X0, 0.4, mz, 16);
grCyl(P, 1.45, 1.45, 0.1, S.trim[0], S.trim[1], X0, 0.85, mz, 16);
if (S.k === "crystal") {
for (var c = 0; c < 5; c++) {
var h = 1 + rnd() * 1.6, m = grCyl(P, 0.05, 0.28, h, S.glow, null, X0 + (rnd() - 0.5) * 1.4, 0.9 + h / 2, mz + (rnd() - 0.5) * 1.4, 6, { op: 0.9 });
m.rotation.set((rnd() - 0.5) * 0.5, rnd() * 3, (rnd() - 0.5) * 0.5);
}
}
else {
grCyl(P, 0.75, 0.45, 1.1, S.accent, null, X0, 1.45, mz, 14);
var n = lite ? 4 : 9;
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2;
grLeafClump(P, 0.45, new THREE.Color(leaf).offsetHSL(0, 0, (rnd() - 0.5) * 0.1).getHex(), X0 + Math.cos(a) * 0.55, 2.25 + rnd() * 0.3, mz + Math.sin(a) * 0.55, grHash("u" + k + mz), true);
if (!lite)
grSph(P, 0.12, [0xE8E0D0, 0xC84A5A, 0xE8C04A][k % 3], null, X0 + Math.cos(a) * 0.75, 2.55 + rnd() * 0.3, mz + Math.sin(a) * 0.75, 6);
}
}
I.solids.push({ x: X0, z: mz, r: 1.5 });
var tz = hz1 - 8;
if (clear(tz + 2) || true) {
var tx = X0 + hw - 2.6;
if (grFurn(P, "table", tx, 0, tz, Math.PI / 2))
I.solids.push({ x: tx, z: tz, hw: 0.6, hd: 1 });
for (var l = 0; l < 5; l++)
grBox(P, 0.22, 0.02, 0.3, [0xE8E0D0, 0xD8C88A, 0xA8C8E0][l % 3], null, tx + (rnd() - 0.5) * 0.6, 0.8, tz - 0.7 + l * 0.35, rnd() * 0.4);
}
var names = R.names || ["Ash", "Briar"], np = lite ? 1 : 3;
for (var q = 0; q < np; q++) {
var qz = hz0 + 6 + (q + 0.5) * (hz1 - hz0 - 14) / np, qx = X0 + (q % 2 ? -1 : 1) * (2.4 + rnd() * 1.6);
if (Math.abs(qz - mz) < 2.2)
qz += 3;
grPersonAt(I.g, R, { n: names[(q * 5 + grHash(I.site.b.n)) % names.length] + (R.surnames ? " " + R.surnames[(q * 3 + grHash(I.site.b.n)) % R.surnames.length] : ""), t: ["Visitor", "Petitioner", "Messenger"][q % 3], who: "waiting in the great hall of " + I.site.b.n, place: I.site.b.n }, qx, qz, rnd() * 6, false, I);
I.solids.push({ x: qx, z: qz, r: 0.35 });
}
},
function (P, I, R, r, x0, x1, z0, z1) {
var K = GR_ROOM[r.kind] || GR_ROOM.office, door = r.door, lite = grLite();
var V = door === "e" ? [-1, 0] : door === "w" ? [1, 0] : [0, -1], U = [-V[1], V[0]];
var C = door === "e" ? [x1, (z0 + z1) / 2] : door === "w" ? [x0, (z0 + z1) / 2] : [(x0 + x1) / 2, z1];
var depth = door === "s" ? z1 - z0 : x1 - x0, width = door === "s" ? x1 - x0 : z1 - z0;
function at(u, v) { return [C[0] + u * U[0] + v * V[0], C[1] + u * U[1] + v * V[1]]; }
function free(p, rr) { return !worldSolidAt(I.solids, p[0], p[1], 0) && !worldSolidAt(I.solids, p[0] + rr, p[1], 0) && !worldSolidAt(I.solids, p[0] - rr, p[1], 0) && !worldSolidAt(I.solids, p[0], p[1] + rr, 0) && !worldSolidAt(I.solids, p[0], p[1] - rr, 0); }
[-1, 1].forEach(function (sd) {
var f = at(sd * (width / 2 - 0.75), 0.85);
if (free(f, 0.1) && grFurn(P, "plant", f[0], 0, f[1], 0, 1.4))
I.solids.push({ x: f[0], z: f[1], r: 0.35 });
if (lite)
return;
var b = at(sd * (width / 2 - 0.7), depth - 0.7);
if (free(b, 0.1)) {
if (grFurn(P, sd < 0 ? "lamp" : "plant", b[0], 0, b[1], 0, sd < 0 ? 1.2 : 1.4))
I.solids.push({ x: b[0], z: b[1], r: 0.35 });
}
});
var hasRug = (K.mid || []).some(function (n) { return n === "rug" || n === "redrunner"; });
if (!hasRug && !K.grid && (K.mid || []).length) {
var m = at(0, depth / 2);
var rg = grFurn(P, "rug", m[0], 0, m[1], door === "s" ? 0 : Math.PI / 2, Math.min(2.2, Math.max(1.2, Math.min(width, depth) / 3.2)));
if (rg)
rg.position.y = -0.005;
}
},
function (x, z) {
for (var i = 0; i < GR.sites.length; i++) {
var st = GR.sites[i], fx = Math.sin(st.rot), fz = Math.cos(st.rot), dx = x - st.door.x, dz = z - st.door.z;
var along = dx * fx + dz * fz, lat = Math.abs(dx * fz - dz * fx);
if (along > -2 && along < 45 && lat < 4.2)
return true;
}
for (var j = 0; j < (GRQ.homes || []).length; j++) {
var h = GRQ.homes[j], hx = Math.sin(h.rot), hz = Math.cos(h.rot), ex = x - (h.x + hx * 5.2 * h.sc), ez = z - (h.z + hz * 5.2 * h.sc);
var al = ex * hx + ez * hz, lt = Math.abs(ex * hz - ez * hx);
if (al > -1 && al < 14 && lt < 2.6)
return true;
}
return false;
},
function (x, z, r) {
var A = GR_AT, L = grLook(GR.R);
if (Math.abs(x) < 10.6 + r && z > -125 && z < 290)
return false;
if (Math.abs(z - 80) < 7.6 + r && Math.abs(x) > 30 && Math.abs(x) < 212)
return false;
if (Math.hypot(x - A.plaza.x, z - A.plaza.z) < A.plaza.r + 3 + r)
return false;
var a = A.arena;
if (x > a.x - a.w / 2 - 6 - r && x < a.x + a.w / 2 + 6 - r + 6 && z > a.z - a.d / 2 - 12 - r && z < a.z + a.d / 2 + 12 + r)
return false;
if (x > A.tunnel.x0 - 8 - r && x < A.tunnel.x1 + 8 + r && Math.abs(z - A.tunnel.z) < 12 + r)
return false;
if (Math.hypot(x - A.deep.x, z - A.deep.z) < A.deep.r + 8 + r)
return false;
if (L.plan === "ring" && Math.abs(Math.hypot(x - A.plaza.x, z - A.plaza.z) - GR_RING.road) < 7.6 + r)
return false;
if (x > -92 - r && x < 92 + r && z < -104 + r && z > -245)
return false;
if (grqDoorWay(x, z))
return false;
return grqFree(x, z, r);
},
function (P, R, S, x, z, rnd, leaf) {
var L = grLook(R), tk = L.tree === undefined ? S.tree : L.tree;
if (S.k === "crystal" || (!tk && L.crys)) {
GR_DECOR.crystal(P, R, S, x, z, rnd);
return 1.6;
}
if (S.k === "coral") {
GR_DECOR.coral(P, R, S, x, z, rnd);
return 2;
}
if (tk && tk !== "coral" && tk !== "crystalspire") {
grKit(P, tk, x, 0, z, rnd() * 6, (L.treeS || 1) * (0.7 + rnd() * 0.25));
return 1.2;
}
if (S.k === "fire") {
grqBrazier(P, x, z);
return 0.8;
}
grqPlanter(P, S, x, z, leaf, rnd, 0, rnd() < 0.5);
return 1;
},
function (G, P, R, S) {
var lite = grLite(), L = grLook(R), A = GR_AT, rnd = wRand(grHash(R.id) + 2323), leaf = grqLeaf(R), made = 0, people = 0, pcap = lite ? 6 : 22, isle = R.layout === "isles";
var avH = L.plan === "scatter" ? 6 : 9;
var ways = [{ a: [0, 240], b: [0, -98], hw: avH }, { a: [36, 80], b: [204, 80], hw: 6 }, { a: [-36, 80], b: [-200, 80], hw: 6 }];
var bands = lite ? [[6, 9, "row"], [12, 12, "mix"]] : [[6, 5.5, "row"], [11.5, 6, "mix"], [18, 7, "mix"], [24, 8.5, "far"]];
var k = 0;
function person(x, z, ry, t, who) { if (people >= pcap)
return; if (!grqFree(x, z, 0.4))
return; grqPerson(G, R, 140 + people, x, z, ry, t, who); people++; }
function put(kind, x, z, face) {
var o = null;
if (kind === "row") {
if (!grqRouteOk(x, z, 1.2))
return false;
var r = grqRowPiece(P, R, S, x, z, rnd, leaf);
GR.solids.push({ x: x, z: z, r: Math.min(1, r * 0.5) });
GR.taken.push({ x: x, z: z, r: r });
return true;
}
var m = k++ % 9, pick = ["bench", "planter", "bed", "goods", "bench", "lamp", "stall", "bed", "touch"][m];
if (kind === "far")
pick = ["tree", "bed", "talk", "tree", "goods", "bench"][m % 6];
if (pick === "bench") {
if (!grqRouteOk(x, z, 1.3))
return false;
grqBench(P, x, z, face);
if (rnd() < 0.55)
person(x + Math.sin(face) * 1.1, z + Math.cos(face) * 1.1, face + Math.PI, "Citizen", "sitting out by the " + (Math.abs(x) < 40 ? "avenue" : "street"));
else {
var pl = x + Math.cos(face) * 1.7, pz = z - Math.sin(face) * 1.7;
if (grqFree(pl, pz, 0.7))
grqPlanter(P, S, pl, pz, leaf, rnd);
}
return true;
}
if (pick === "planter") {
if (!grqRouteOk(x, z, 1))
return false;
grqPlanter(P, S, x, z, leaf, rnd, 0, rnd() < 0.4);
GR.taken.push({ x: x, z: z, r: 1 });
return true;
}
if (pick === "bed") {
if (!grqRouteOk(x, z, 2))
return false;
grqBed(P, x, z, 3.4, 1.4, face, "flowers", leaf, rnd, S.trim[0]);
GR.taken.push({ x: x, z: z, r: 2 });
return true;
}
if (pick === "goods") {
if (!grqRouteOk(x, z, 2.4))
return false;
if (isle || S.k === "station" || S.k === "future") {
grqCrate(P, x, z, face, 1, 0, 0x7A7E84);
grqCrate(P, x + 0.9, z + 0.4, face + 0.3, 0.8);
grqBarrel(P, x - 1, z + 0.6);
}
else if (rnd() < 0.5)
grqCart(P, x, z, face + Math.PI / 2, rnd, ["goods", "hay", "veg"][Math.floor(rnd() * 3)]);
else {
grqCrate(P, x, z, face, 1);
grqCrate(P, x + 1.05, z + 0.1, face + 0.2, 1);
grqCrate(P, x + 0.5, z, face, 0.8, 0.95);
grqBarrel(P, x - 1.1, z + 0.4);
grqBarrel(P, x - 1.2, z - 0.6);
}
GR.taken.push({ x: x, z: z, r: 2.6 });
return true;
}
if (pick === "lamp") {
if (!grqRouteOk(x, z, 0.8))
return false;
grLamp(P, S, x, z, R);
GR.solids.push({ x: x, z: z, r: 0.35 });
GR.taken.push({ x: x, z: z, r: 0.8 });
return true;
}
if (pick === "stall") {
if (!grqRouteOk(x, z, 2.6))
return false;
if (grKit(P, "marketstall", x, 0, z, face, 1)) {
GR.solids.push({ x: x, z: z, hw: 2, hd: 1.5, rot: face, h: 3 });
GR.taken.push({ x: x, z: z, r: 2.6 });
var w = GR_STALL_WARES[(grHash(R.id) + k) % GR_STALL_WARES.length];
person(x + Math.sin(face) * 2.2, z + Math.cos(face) * 2.2, face + Math.PI, w[1].charAt(0).toUpperCase() + w[1].slice(1), "keeping a stall of " + w[0] + " by the way");
return true;
}
return false;
}
if (pick === "touch") {
var f = GRQ_TOUCHES[R.id];
if (!f || !grqRouteOk(x, z, 2))
return false;
var rr = GRQ_TOUCH[f[k % f.length]](P, R, S, x, z, rnd) || 1.2;
GR.solids.push({ x: x, z: z, r: rr * 0.8 });
GR.taken.push({ x: x, z: z, r: rr + 0.6 });
return true;
}
if (pick === "tree") {
if (!grqRouteOk(x, z, 1.6))
return false;
var r2 = grqRowPiece(P, R, S, x, z, rnd, leaf);
GR.solids.push({ x: x, z: z, r: Math.min(1, r2 * 0.5) });
GR.taken.push({ x: x, z: z, r: r2 + 0.4 });
return true;
}
if (pick === "talk") {
if (!grqRouteOk(x, z, 1.4))
return false;
person(x - 0.6, z, Math.PI / 2 + face * 0, "Citizen", "stopped to talk in the street");
person(x + 0.6, z, -Math.PI / 2, "Neighbour", "stopped to talk in the street");
GR.taken.push({ x: x, z: z, r: 1.4 });
return true;
}
return false;
}
ways.forEach(function (w) {
var dx = w.b[0] - w.a[0], dz = w.b[1] - w.a[1], len = Math.hypot(dx, dz), ux = dx / len, uz = dz / len, nx = -uz, nz = ux;
bands.forEach(function (bd) {
[-1, 1].forEach(function (sd) {
var off = w.hw + bd[0], face = Math.atan2(-sd * nx, -sd * nz);
for (var t = bd[1] * rnd(); t < len; t += bd[1] * (0.85 + rnd() * 0.3)) {
var x = w.a[0] + ux * t + nx * off * sd + (rnd() - 0.5) * 1.2, z = w.a[1] + uz * t + nz * off * sd + (rnd() - 0.5) * 1.2;
if (put(bd[2], x, z, face))
made++;
}
});
});
});
if (L.plan === "ring") {
var RR = GR_RING.road;
bands.forEach(function (bd) {
[-1, 1].forEach(function (sd) {
var rad = RR + sd * (6 + bd[0]);
if (rad < A.plaza.r + 6)
return;
for (var t = bd[1] * rnd(); t < Math.PI * 2 * rad; t += bd[1] * (0.85 + rnd() * 0.3)) {
var an = t / rad, x = A.plaza.x + Math.cos(an) * rad, z = A.plaza.z + Math.sin(an) * rad;
var face = Math.atan2(-Math.cos(an) * sd, -Math.sin(an) * sd);
if (put(bd[2], x, z, face))
made++;
}
});
});
}
GRQ.route = made;
},
function (G, P, R, S) {
var A = GR_AT.arena, lite = grLite(), rnd = wRand(grHash(R.id) + 2424), n = 0;
var ok = function (x, z, r) { return grqFree(x, z, r); };
[-1, 1].forEach(function (sd) {
var z = A.z + sd * (A.d / 2 - 2.2), face = sd > 0 ? Math.PI : 0, i = 0;
for (var x = A.x - A.w / 2 + 5; x < A.x + A.w / 2 - 4; x += lite ? 6 : 3.2) {
var m = i++ % 6;
if (m === 0) {
if (ok(x, z, 0.9) && grKit(P, "weaponrack", x, 0, z, face, 1))
GR.solids.push({ x: x, z: z, hw: 0.9, hd: 0.4, rot: face });
}
else if (m === 1) {
if (ok(x, z, 0.8)) {
grqBarrel(P, x, z);
if (!lite)
grqBarrel(P, x + 0.8, z + sd * 0.2);
}
}
else if (m === 2) {
if (ok(x, z, 1.2)) {
grqBench(P, x, z, face);
if (n < (lite ? 2 : 6)) {
grqPerson(G, R, 170 + n, x, z - sd * 1.2, face, "Recruit", "resting between drills at " + ((R.arena && R.arena.n) || "the training ground"));
n++;
}
}
}
else if (m === 3) {
if (ok(x, z, 0.9)) {
grqCrate(P, x, z, 0.2, 0.9);
grKit(P, "shield", x + 0.9, 0, z, face, 0.8);
}
}
else if (m === 4) {
if (ok(x, z, 0.6)) {
grCyl(P, 0.08, 0.1, 2.2, 0x6A4A2E, "wood", x, 1.1, z, 6);
grBox(P, 1.1, 0.1, 0.1, 0x6A4A2E, "wood", x, 1.6, z);
grCyl(P, 0.32, 0.36, 0.9, 0xC8B080, null, x, 1.55, z, 8);
grSph(P, 0.24, 0xC8B080, null, x, 2.2, z, 8);
GR.solids.push({ x: x, z: z, r: 0.5 });
}
}
else {
if (ok(x, z, 0.8) && grKit(P, "armorstand", x, 0, z, face, 1))
GR.solids.push({ x: x, z: z, r: 0.5 });
}
}
});
var pairs = lite ? 1 : 3;
for (var p = 0; p < pairs; p++) {
var px = A.x - 8 + p * 8, pz = A.z + (p % 2 ? 3 : -3);
if (ok(px, pz, 1.6)) {
grqPerson(G, R, 180 + p * 2, px - 0.8, pz, Math.PI / 2, "Recruit", "sparring at " + ((R.arena && R.arena.n) || "the training ground"));
grqPerson(G, R, 181 + p * 2, px + 0.8, pz, -Math.PI / 2, "Recruit", "sparring at " + ((R.arena && R.arena.n) || "the training ground"));
}
}
if (ok(A.x + 4, A.z - 8, 0.5))
grqPerson(G, R, 190, A.x + 4, A.z - 8, Math.PI, "Drill-master", "calling the drill at " + ((R.arena && R.arena.n) || "the training ground"));
if (!lite)
for (var b = 0; b < 4; b++) {
var bx = A.x - A.w / 2 + 8 + b * (A.w - 16) / 3, bz = A.z - A.d / 2 - 11.5;
if (ok(bx, bz, 1)) {
GR_DECOR.banner(P, R, S, bx, bz, rnd);
GR.solids.push({ x: bx, z: bz, r: 0.4 });
}
}
},
function (P, x, z) {
[0, 2.1, 4.2].forEach(function (a) { var l = grCyl(P, 0.05, 0.06, 1.3, 0x2A2624, "metal", x + Math.cos(a) * 0.32, 0.62, z + Math.sin(a) * 0.32, 5); l.rotation.set(Math.sin(a) * 0.2, 0, -Math.cos(a) * 0.2); });
grCyl(P, 0.6, 0.32, 0.4, 0x2E2A26, "metal", x, 1.38, z, 12);
grCyl(P, 0.52, 0.52, 0.06, 0xE0702A, null, x, 1.56, z, 12, { glow: true });
for (var i = 0; i < 4; i++)
grSph(P, 0.14, 0xF09040, null, x + Math.cos(i * 1.6) * 0.25, 1.62, z + Math.sin(i * 1.6) * 0.25, 5, { glow: true });
if (!grLite())
grGlow(P, 0xFF9A50, 4.2, 0.32, x, 1.9, z);
GR.solids.push({ x: x, z: z, r: 0.6 });
},
function (G, P, R, S) {
if (R.id !== "fire")
return;
var lite = grLite(), A = GR_AT;
for (var z = 240; z >= -96; z -= lite ? 22 : 11) {
if (Math.abs(z - A.plaza.z) < A.plaza.r + 4)
continue;
[-1, 1].forEach(function (sd) { var x = sd * 11.6; if (grqFree(x, z, 0.7)) {
grqBrazier(P, x, z);
GR.taken.push({ x: x, z: z, r: 0.8 });
} });
}
for (var cx = 44; cx < 200; cx += lite ? 24 : 12)
[-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) { var x = sx * cx, z = 80 + sz * 7.6; if (grqFree(x, z, 0.7)) {
grqBrazier(P, x, z);
GR.taken.push({ x: x, z: z, r: 0.8 });
} }); });
[-1, 1].forEach(function (sd) {
var x = sd * 21.5;
for (var z0 = 236; z0 > -96; z0 -= 14) {
var z1 = z0 - 10.5, zc = (z0 + z1) / 2, ok = true;
if (Math.abs(zc - A.plaza.z) < A.plaza.r + 8)
continue;
for (var t = z1; t <= z0; t += 1.5) {
if (!grqFree(x, t, 1.4) || grqDoorWay(x, t)) {
ok = false;
break;
}
}
if (!ok)
continue;
grBox(P, 2.8, 0.5, 10.5, 0x2A2220, "stone", x, 0.25, zc);
grBox(P, 1.5, 0.06, 10.2, 0xD8642A, null, x, 0.47, zc, 0, { glow: true });
grBox(P, 0.9, 0.05, 9.8, 0xF0A050, null, x, 0.49, zc, 0, { glow: true, op: 0.7 });
if (!lite)
grGlow(P, 0xFF7A3A, 9, 0.18, x, 1.2, zc);
GR.solids.push({ x: x, z: zc, hw: 1.5, hd: 5.4, h: 1.2 });
GR.taken.push({ x: x, z: zc, r: 5.6 });
}
});
},
function (P, x, y, z, s) {
var G = new THREE.Group(), lite = grLite(), sc = s || 1, r = wRand(grHash("pot" + Math.round(x * 10) + "_" + Math.round(z * 10)));
G.position.set(x, y || 0, z);
G.scale.setScalar(sc);
grCyl(G, 0.24, 0.17, 0.42, 0xA0603A, null, 0, 0.21, 0, 12);
grCyl(G, 0.27, 0.27, 0.06, 0x9A5A36, null, 0, 0.42, 0, 12);
grCyl(G, 0.22, 0.22, 0.02, 0x3A2A1E, null, 0, 0.43, 0, 10);
var n = lite ? 6 : 11, base = new THREE.Color(0x3E7A34);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + r() * 0.5, up = i < 3 ? 1.2 : 0.55 + r() * 0.35, L = 0.45 + r() * 0.25;
var leaf = grSph(G, 1, base.clone().offsetHSL((r() - 0.5) * 0.03, (r() - 0.5) * 0.1, (r() - 0.5) * 0.12).getHex(), null, 0, 0, 0, 7);
leaf.scale.set(0.09, L, 0.025);
var tilt = Math.PI / 2 - up;
leaf.position.set(Math.cos(a) * Math.sin(tilt) * L * 0.9, 0.44 + Math.cos(tilt) * L * 0.9, Math.sin(a) * Math.sin(tilt) * L * 0.9);
leaf.rotation.set(0, -a, 0);
leaf.rotateZ(-tilt);
}
P.add(G);
return G;
}
];
});
