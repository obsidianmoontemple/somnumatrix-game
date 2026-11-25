/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(330, function () {
"use strict";
return [
function (x, z) {
if (z <= -125 && z > -236 && Math.abs(x) < 6)
return udStairTop(z);
var h = udHeight(x, z);
if (h < -900)
return null;
if (Math.hypot(x - UD_LAKE.x, z - UD_LAKE.z) < UD_LAKE.r + 30 && h < UD_LAKE_Y + 0.4)
return null;
if (x > UD_SEA_X - 4)
return null;
var r = UD_SPOTS.rift;
if (x > r.x0 - 2 && x < r.x1 + 2 && z > r.z0 - 2 && z < r.z1 + 2)
return null;
if (udJettyAt(x, z) !== null)
return null;
return h;
},
function (x, z, pad, town) {
var S = UD.solids;
for (var i = 0; i < S.length; i++) {
var s = S[i];
if (s.r !== undefined) {
if (Math.hypot(x - s.x, z - s.z) < s.r + pad)
return false;
}
else if (s.hw !== undefined && Math.abs(x - s.x) < s.hw + pad && Math.abs(z - s.z) < s.hd + pad)
return false;
}
var keep = ["market", "landing", "forge", "farm", "ruins", "hollow", "falls", "grotto"];
for (var k = 0; k < keep.length; k++) {
var p = UD_SPOTS[keep[k]];
if (Math.hypot(x - p.x, z - p.z) < p.r * 0.85)
return false;
}
if (!town && Math.hypot(x - UD_GLIM.x, z - UD_GLIM.z) < UD_GLIM.r - 10)
return false;
return true;
},
function () {
if (UDGL_SH)
return UDGL_SH;
var stem = new THREE.CylinderGeometry(0.6, 1, 1, LITE ? 4 : 5, 1, true);
stem.translate(0, 0.5, 0);
var cap = new THREE.SphereGeometry(1, LITE ? 6 : 7, LITE ? 2 : 3, 0, Math.PI * 2, 0, Math.PI / 2);
cap.scale(1, 0.55, 1);
var gill = new THREE.CircleGeometry(0.96, LITE ? 6 : 7);
gill.rotateX(Math.PI / 2);
var prism = new THREE.CylinderGeometry(1, 1, 0.72, LITE ? 5 : 6, 1, true);
prism.translate(0, 0.36, 0);
var tip = new THREE.CylinderGeometry(0, 1, 0.28, LITE ? 5 : 6, 1);
tip.translate(0, 0.86, 0);
var pool = new THREE.PlaneGeometry(2, 2);
pool.rotateX(-Math.PI / 2);
UDGL_SH = { stem: udglShape(stem), cap: udglShape(cap), gill: udglShape(gill), prism: udglShape(prism), tip: udglShape(tip), pool: udglShape(pool), poolUV: (pool.index ? pool.toNonIndexed() : pool).attributes.uv.array };
return UDGL_SH;
},
function (C, arr, m, lo, hi) {
var V = UDGL_V, y0 = Infinity, y1 = -Infinity, i;
for (i = 1; i < arr.length; i += 3) {
if (arr[i] < y0)
y0 = arr[i];
if (arr[i] > y1)
y1 = arr[i];
}
for (i = 0; i < arr.length; i += 3) {
V.set(arr[i], arr[i + 1], arr[i + 2]);
var u = y1 > y0 ? (arr[i + 1] - y0) / (y1 - y0) : 1;
V.applyMatrix4(m);
C.p.push(V.x, V.y, V.z);
C.c.push(lo.r + (hi.r - lo.r) * u, lo.g + (hi.g - lo.g) * u, lo.b + (hi.b - lo.b) * u);
}
},
function (C, R, x, y, z, big) {
var S = udglShapes(), n = LITE ? 2 + Math.floor(R() * 2) : 3 + Math.floor(R() * 3), hue = UDGL_CAPS[Math.floor(R() * UDGL_CAPS.length)];
var lo = UDGL_C, hi = UDGL_C2, stemLo = new THREE.Color(0x3A3646), stemHi = new THREE.Color(0xA8A0B8);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = i ? 0.3 + R() * 0.7 : 0, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d, h = (big && !i ? 2.2 + R() * 1.2 : 0.4 + R() * 0.9) * (i ? 0.75 : 1), r = h * (0.38 + R() * 0.18), lean = (R() - 0.5) * 0.25;
udglPut(C, S.stem, udglMat(px, y - 0.05, pz, r * 0.22, h, r * 0.22, 0, lean, 0), stemLo, stemHi);
hi.setHex(hue).multiplyScalar(0.9);
lo.copy(hi).multiplyScalar(0.55);
udglPut(C, S.cap, udglMat(px + Math.sin(lean) * 0, y + h - 0.05, pz, r, r, r, a, lean, 0), hi, lo);
lo.copy(hi).lerp(new THREE.Color(0xFFFFFF), 0.35);
udglPut(C, S.gill, udglMat(px, y + h - 0.04, pz, r, 1, r, a, lean, 0), lo, lo);
}
hi.setHex(hue);
udglPool(C, x, y, z, big ? 5.5 : 3.4, hi, big ? 0.5 : 0.42);
udglHalo(C, x, y + (big ? 2.4 : 0.9), z, hi, big ? 0.9 : 0.65);
},
function (C, R, x, y, z, big) {
var S = udglShapes(), n = LITE ? 2 + Math.floor(R() * 2) : 3 + Math.floor(R() * 3), hue = UDGL_SHARDS[Math.floor(R() * UDGL_SHARDS.length)];
var lo = UDGL_C, hi = UDGL_C2;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = i ? 0.25 + R() * 0.55 : 0, h = (big && !i ? 2.8 + R() * 1.4 : 0.6 + R() * 1.0) * (i ? 0.75 : 1), r = h * (0.12 + R() * 0.06);
var tx = i ? (R() - 0.5) * 0.9 : (R() - 0.5) * 0.2, tz = i ? (R() - 0.5) * 0.9 : (R() - 0.5) * 0.2, m;
hi.setHex(hue).multiplyScalar(0.92);
lo.copy(hi).multiplyScalar(0.45);
m = udglMat(x + Math.cos(a) * d, y - 0.1, z + Math.sin(a) * d, r, h, r, a, tx, tz);
udglPut(C, S.prism, m, lo, hi);
lo.copy(hi).lerp(new THREE.Color(0xFFFFFF), 0.3);
udglPut(C, S.tip, m, hi, lo);
}
hi.setHex(hue);
udglPool(C, x, y, z, big ? 5 : 3, hi, big ? 0.48 : 0.4);
udglHalo(C, x, y + (big ? 2.2 : 0.7), z, hi, big ? 0.85 : 0.6);
},
function (G) {
var R = wRand(4417), cells = {}, step = LITE ? 8 : 6, k = 0;
UDGL_M = new THREE.Matrix4();
UDGL_V = new THREE.Vector3();
UDGL_C = new THREE.Color();
UDGL_C2 = new THREE.Color();
UDGL_WAYS.forEach(function (W) {
for (var i = 0; i + 1 < W.length; i++) {
var a = W[i], b = W[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz), ux = dx / L, uz = dz / L;
var narrow = Math.abs(a[1] + 700) < 1 && Math.abs(b[1] + 700) < 1;
for (var s = step * 0.5; s < L; s += step) {
k++;
var both = LITE ? k % 2 === 0 : true, side = k % 2 ? 1 : -1, big = k % 4 === 0 && !narrow;
[side, both ? -side : 0].forEach(function (sd) {
if (!sd)
return;
var off = narrow ? 4.3 : 2.8 + R() * 1.2, along = s + (R() - 0.5) * 2;
udglCluster(cells, R, a[0] + ux * along - uz * off * sd, a[1] + uz * along + ux * off * sd, big && sd === side);
});
}
}
});
for (var z = -132; z > -232; z -= LITE ? 9 : 7) {
[-1, 1].forEach(function (sd) {
var x = sd * 4.7, y = udStairTop(z + (sd > 0 ? 2 : 0)), C = udglCell(cells, x, z);
if (R() < 0.55)
udglFungus(C, R, x, y, z + (sd > 0 ? 2 : 0), false);
else
udglShards(C, R, x, y, z + (sd > 0 ? 2 : 0), false);
UDGL.stats.clusters = (UDGL.stats.clusters || 0) + 1;
});
}
for (var j = 0; j < (LITE ? 18 : 28); j++) {
var an = j / (LITE ? 18 : 28) * Math.PI * 2 + 0.1, rr = 112 + (j % 2) * 5;
udglCluster(cells, R, UD_CITY.x + Math.cos(an) * rr, UD_CITY.z + Math.sin(an) * rr, j % 4 === 0);
}
for (var gi = 0, gn = 0; gn < (LITE ? 24 : 40) && gi < 400; gi++) {
var ga = R() * 6.283, gd = 12 + Math.sqrt(R()) * (UD_GLIM.r - 30), gx = UD_GLIM.x + Math.cos(ga) * gd, gz = UD_GLIM.z + Math.sin(ga) * gd;
if (gx > UD_GLIM.x + 95)
continue;
var gy = udglFloor(gx, gz);
if (gy === null || !udglFree(gx, gz, 1.2, true))
continue;
udglShards(udglCell(cells, gx, gz), R, gx, gy, gz, gn % 5 === 0);
gn++;
UDGL.stats.clusters++;
}
var want = LITE ? 120 : 260, tries = 0, got = 0;
while (got < want && tries < want * 6) {
tries++;
var aa = R() * 6.283, dd = Math.sqrt(R()) * UD.R * 0.88, x = UD.C.x + Math.cos(aa) * dd, zz = UD.C.z + Math.sin(aa) * dd;
if (Math.abs(x) < 8 && zz > -260)
continue;
if (udglCluster(cells, R, x, zz, R() < 0.3))
got++;
}
var tex = softGlow();
var solid = new THREE.MeshBasicMaterial({ vertexColors: true, fog: true });
var poolMat = new THREE.MeshBasicMaterial({ vertexColors: true, map: tex, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending, fog: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
var haloMat = new THREE.PointsMaterial({ vertexColors: true, map: tex, size: LITE ? 2.6 : 2.2, sizeAttenuation: true, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending, fog: true });
UDGL.haloMat = haloMat;
var HP = [], HC = [];
Object.keys(cells).forEach(function (key) {
var C = cells[key];
if (!C.p.length)
return;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(C.p, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(C.c, 3));
g.computeBoundingSphere();
var m = new THREE.Mesh(g, solid);
m.matrixAutoUpdate = false;
m.updateMatrix();
G.add(m);
var pg = new THREE.BufferGeometry();
pg.setAttribute("position", new THREE.Float32BufferAttribute(C.pp, 3));
pg.setAttribute("color", new THREE.Float32BufferAttribute(C.pc, 3));
pg.setAttribute("uv", new THREE.Float32BufferAttribute(C.pu, 2));
pg.computeBoundingSphere();
var pm = new THREE.Mesh(pg, poolMat);
pm.renderOrder = 1;
pm.matrixAutoUpdate = false;
pm.updateMatrix();
G.add(pm);
Array.prototype.push.apply(HP, C.hp);
Array.prototype.push.apply(HC, C.hc);
UDGL.cells.push(m, pm);
UDGL.stats.tris = (UDGL.stats.tris || 0) + C.p.length / 9;
});
var hg = new THREE.BufferGeometry();
hg.setAttribute("position", new THREE.Float32BufferAttribute(HP, 3));
hg.setAttribute("color", new THREE.Float32BufferAttribute(HC, 3));
hg.computeBoundingSphere();
var hp = new THREE.Points(hg, haloMat);
hp.renderOrder = 2;
hp.matrixAutoUpdate = false;
hp.updateMatrix();
G.add(hp);
UDGL.cells.push(hp);
},
function () {
var s = [];
UD.people.forEach(function (P) { s.push(P.g); });
UD.spiders.forEach(function (S) { s.push(S.g); });
[UD.door, UD.ferry, UD.wheel, UD.forgeWheel, UD.lake, UD.sea].forEach(function (o) { if (o)
s.push(o); });
(UD.skiffs || []).forEach(function (o) { s.push(o); });
UD.shrooms.forEach(function (o) { s.push(o); });
if (typeof SSX !== "undefined") {
if (SSX.nearG)
s.push(SSX.nearG);
if (SSX.root)
s.push(SSX.root);
}
return s;
},
function (G) {
if (UDGL.lines) {
UDGL.lines.forEach(function (l) { G.remove(l); l.geometry.dispose(); });
}
UDGL.lines = [];
G.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(G.matrixWorld).invert(), skip = udglSkipRoots(), mine = UDGL.cells.concat(UDGL.root ? [UDGL.root] : []);
var buf = [{ p: [], c: [] }, { p: [], c: [] }], m = new THREE.Matrix4(), v = new THREE.Vector3(), sc = new THREE.Vector3(), col = new THREE.Color(), bb, n = 0;
G.traverse(function (o) {
if (!o.isMesh || o.isInstancedMesh || !o.visible || Array.isArray(o.material) || mine.indexOf(o) >= 0)
return;
var mt = o.material;
if (!mt || mt.transparent || mt.type === "MeshBasicMaterial" || mt.visible === false)
return;
var ge = o.geometry, ty = ge.type, P = ge.parameters || {};
if (ty === "ConeGeometry") {
if ((P.radius || 0) < 1.5)
return;
}
else if (ty === "CylinderGeometry") {
if (Math.max(P.radiusTop || 0, P.radiusBottom || 0) < 0.3 || (P.height || 0) < 1.2 || (P.radialSegments || 8) > 12)
return;
}
else if (ty === "BufferGeometry") {
if (!ge.attributes.position || ge.attributes.position.count > 30000)
return;
if (mt.emissive && (mt.emissive.r + mt.emissive.g + mt.emissive.b) * (mt.emissiveIntensity || 1) > 0.15)
return;
if (mt.color && mt.color.getHex() === 0xD8D0C0)
return;
}
else if (ty === "SphereGeometry") {
if ((P.phiLength !== undefined && P.phiLength < 6.2) || (P.thetaStart || 0) > 0.01)
return;
}
else if (ty !== "BoxGeometry" && ty !== "TorusGeometry")
return;
for (var a = o; a && a !== G; a = a.parent) {
if (a.userData && (a.userData.wSeed !== undefined || a.userData.legs || a.userData.ssxBoat || a.userData.noGlowEdge) || skip.indexOf(a) >= 0)
return;
}
if (!ge.boundingBox)
ge.computeBoundingBox();
bb = ge.boundingBox;
bb.getCenter(v).applyMatrix4(o.matrixWorld);
var lx = v.x - G.position.x, lz = v.z;
if (lz > -121 && Math.abs(lx) < 10)
return;
o.getWorldScale(sc);
var dx = (bb.max.x - bb.min.x) * Math.abs(sc.x), dy = (bb.max.y - bb.min.y) * Math.abs(sc.y), dz = (bb.max.z - bb.min.z) * Math.abs(sc.z), big = Math.max(dx, dy, dz);
if (big < 1.2 || big > 90)
return;
m.multiplyMatrices(inv, o.matrixWorld);
col.setHex(udglHue(lx, lz, lx * 0.37 + lz * 0.71)).multiplyScalar(0.72);
var B = buf[(Math.floor(lx * 0.13 + lz * 0.29) % 2 + 2) % 2];
if (ty === "TorusGeometry" || ty === "SphereGeometry") {
var tor = ty === "TorusGeometry", rad = tor ? (P.radius || 1) + (P.tube || 0) * 1.2 : (P.radius || 1) * 1.02, segs = 24;
if (rad * Math.max(Math.abs(sc.x), Math.abs(sc.y), Math.abs(sc.z)) < (tor ? 1.4 : 1.8) || big > 40)
return;
for (var s = 0; s < segs; s++) {
var t0 = s / segs * Math.PI * 2, t1 = (s + 1) / segs * Math.PI * 2;
(tor ? [[rad, 0]] : [[rad, 0.1 * (P.radius || 1)], [rad * 0.8, 0.6 * (P.radius || 1)]]).forEach(function (rr) {
if (tor)
v.set(Math.cos(t0) * rr[0], Math.sin(t0) * rr[0], 0);
else
v.set(Math.cos(t0) * rr[0], rr[1], Math.sin(t0) * rr[0]);
v.applyMatrix4(m);
B.p.push(v.x, v.y, v.z);
if (tor)
v.set(Math.cos(t1) * rr[0], Math.sin(t1) * rr[0], 0);
else
v.set(Math.cos(t1) * rr[0], rr[1], Math.sin(t1) * rr[0]);
v.applyMatrix4(m);
B.p.push(v.x, v.y, v.z);
B.c.push(col.r, col.g, col.b, col.r, col.g, col.b);
});
}
n++;
return;
}
var merged = ty === "BufferGeometry", eg = new THREE.EdgesGeometry(ge, merged ? 30 : 24), ep = eg.attributes.position.array;
if (ep.length > (merged ? 4000 : 900) * 6) {
eg.dispose();
return;
}
var cx = (bb.max.x + bb.min.x) / 2, cy = (bb.max.y + bb.min.y) / 2, cz = (bb.max.z + bb.min.z) / 2;
var ex = merged ? 0 : 0.035 / Math.max(Math.abs(sc.x), 1e-3), ey = merged ? 0 : 0.035 / Math.max(Math.abs(sc.y), 1e-3), ez = merged ? 0 : 0.035 / Math.max(Math.abs(sc.z), 1e-3);
for (var i = 0; i < ep.length; i += 3) {
var x = ep[i], y = ep[i + 1], z = ep[i + 2];
v.set(x + (x > cx ? ex : x < cx ? -ex : 0), y + (y > cy ? ey : y < cy ? -ey : 0), z + (z > cz ? ez : z < cz ? -ez : 0)).applyMatrix4(m);
B.p.push(v.x, v.y, v.z);
B.c.push(col.r, col.g, col.b);
}
eg.dispose();
n++;
});
if (!UDGL.lineMats.length) {
for (var q = 0; q < 2; q++)
UDGL.lineMats.push(udglLift(new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending, fog: true })));
var band = wTex(64, 4, function (x, W, H) { var g = x.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.5, "rgba(255,255,255,1)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
for (var q2 = 0; q2 < 2; q2++)
UDGL.lineMats.push(udglLift(new THREE.MeshBasicMaterial({ vertexColors: true, map: band, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: true })));
}
buf.forEach(function (B, i) {
if (!B.p.length)
return;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(B.p, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(B.c, 3));
g.computeBoundingSphere();
var L = new THREE.LineSegments(g, UDGL.lineMats[i]);
L.matrixAutoUpdate = false;
L.updateMatrix();
L.renderOrder = 2;
G.add(L);
UDGL.lines.push(L);
var F = udglBands(B.p, B.c), fg = new THREE.BufferGeometry();
fg.setAttribute("position", new THREE.Float32BufferAttribute(F.p, 3));
fg.setAttribute("color", new THREE.Float32BufferAttribute(F.c, 3));
fg.setAttribute("uv", new THREE.Float32BufferAttribute(F.u, 2));
fg.computeBoundingSphere();
var M = new THREE.Mesh(fg, UDGL.lineMats[2 + i]);
M.matrixAutoUpdate = false;
M.updateMatrix();
M.renderOrder = 2;
G.add(M);
UDGL.lines.push(M);
UDGL.stats.bandTris = (UDGL.stats.bandTris || 0) + F.p.length / 9;
});
UDGL.stats.outlined = n;
UDGL.stats.segments = (buf[0].p.length + buf[1].p.length) / 6;
},
function (m) {
m.onBeforeCompile = function (sh) {
sh.vertexShader = sh.vertexShader.replace("#include project_vertex", "vec4 mvPosition=modelViewMatrix*vec4(transformed,1.0);\n float udglD=length(mvPosition.xyz);\n mvPosition.xyz*=1.0-min(0.6,max(0.04,udglD*0.002))/max(udglD,0.01);\n gl_Position=projectionMatrix*mvPosition;");
};
m.customProgramCacheKey = function () { return "udgl-lift"; };
return m;
},
function (P, Cl) {
var out = { p: [], c: [], u: [] }, A = new THREE.Vector3(), B = new THREE.Vector3(), d = new THREE.Vector3(), n1 = new THREE.Vector3(), n2 = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), w = LITE ? 0.16 : 0.13;
for (var i = 0; i < P.length; i += 6) {
A.set(P[i], P[i + 1], P[i + 2]);
B.set(P[i + 3], P[i + 4], P[i + 5]);
d.subVectors(B, A);
if (d.lengthSq() < 1e-6)
continue;
d.normalize();
n1.crossVectors(d, Math.abs(d.y) > 0.95 ? n2.set(1, 0, 0) : up).normalize();
n2.crossVectors(d, n1).normalize();
var r = Cl[i], g = Cl[i + 1], b = Cl[i + 2];
[n1, n2].forEach(function (n) {
var ax = n.x * w, ay = n.y * w, az = n.z * w;
out.p.push(A.x - ax, A.y - ay, A.z - az, A.x + ax, A.y + ay, A.z + az, B.x + ax, B.y + ay, B.z + az, A.x - ax, A.y - ay, A.z - az, B.x + ax, B.y + ay, B.z + az, B.x - ax, B.y - ay, B.z - az);
out.u.push(0, 0.5, 1, 0.5, 1, 0.5, 0, 0.5, 1, 0.5, 0, 0.5);
for (var k = 0; k < 6; k++)
out.c.push(r, g, b);
});
}
return out;
},
function (dt) {
var W = WORLDS.underdark, G = W && W.g;
if (!G)
return;
var t = (typeof WLD !== "undefined" && WLD.t) || 0;
if (!UDGL.built) {
UDGL.n = (UDGL.n || 0) + 1;
if (UDGL.n === 2)
udglPaths(G);
if (UDGL.n === 3) {
UDGL.built = true;
udglOutlines(G);
UDGL.kids = G.children.length;
UDGL.checkAt = t + 4;
}
if (UDGL.n < 3)
return;
}
if (t > UDGL.checkAt) {
UDGL.checkAt = t + 4;
if (G.children.length !== UDGL.kids) {
udglOutlines(G);
UDGL.kids = G.children.length;
}
}
var now = (typeof performance !== "undefined" ? performance.now() : Date.now()) / 1000;
if (UDGL.lineMats[0]) {
var b0 = Math.sin(now * 0.72), b1 = -b0;
UDGL.lineMats[0].opacity = 0.6 + 0.14 * b0;
UDGL.lineMats[1].opacity = 0.6 + 0.14 * b1;
UDGL.lineMats[2].opacity = 0.34 + 0.1 * b0;
UDGL.lineMats[3].opacity = 0.34 + 0.1 * b1;
}
if (UDGL.haloMat)
UDGL.haloMat.opacity = 0.4 + 0.08 * Math.sin(now * 0.6);
}
];
});
