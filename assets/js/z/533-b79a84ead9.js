/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(533, function () {
"use strict";
return [
function (list) {
var n = 0;
list.forEach(function (g) { n += (g.index ? g.index.count : g.attributes.position.count); });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), o = 0;
list.forEach(function (g) { var q = g.index ? g.toNonIndexed() : g; if (!q.attributes.normal)
q.computeVertexNormals(); var c = q.attributes.position.count; P.set(q.attributes.position.array, o * 3); N.set(q.attributes.normal.array, o * 3); o += c; });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
return G;
},
function () {
if (SEI_GEO)
return SEI_GEO;
var L = typeof LITE !== "undefined" && LITE;
var b = function (r, x, y, z, sy, s) { var g = new THREE.SphereGeometry(r, L ? 5 : 6, 4); g.scale(1, sy, 1); seiLump(g, 0.4, s); g.translate(x, y, z); return g; };
var shrub = seiMerge([b(0.75, 0, 0.45, 0, 0.72, 1), b(0.55, 0.6, 0.3, 0.25, 0.7, 2)]);
var blades = [];
for (var i = 0; i < 6; i++) {
var c = new THREE.ConeGeometry(0.035, 0.5 + ((i * 37) % 5) * 0.08, 3);
c.translate(0, 0.25, 0);
c.rotateZ((i % 3 - 1) * 0.35);
c.rotateY(i * 1.05);
c.translate(Math.cos(i) * 0.08, 0, Math.sin(i) * 0.08);
blades.push(c);
}
var tuft = seiMerge([0, 1, 2].map(function (i) { var q = new THREE.PlaneGeometry(0.9, 0.7); q.translate(0, 0.35, 0); q.rotateY(i * 1.047); return q; }));
var rock = new THREE.DodecahedronGeometry(1, 0);
rock.scale(1, 0.55, 0.8);
seiLump(rock, 0.45, 9);
rock.translate(0, 0.15, 0);
var fl = [];
for (var f = 0; f < 5; f++) {
var s = new THREE.OctahedronGeometry(0.075, 0);
s.translate(Math.cos(f * 1.3) * 0.18, 0.28 + (f % 2) * 0.06, Math.sin(f * 1.3) * 0.18);
fl.push(s);
}
var flower = seiMerge(fl), stems = seiMerge(fl.map(function (s, f) { var c = new THREE.CylinderGeometry(0.008, 0.01, 0.3, 3, 1, true); c.translate(Math.cos(f * 1.3) * 0.18, 0.13, Math.sin(f * 1.3) * 0.18); return c; }));
var fern = [];
for (var k = 0; k < 7; k++) {
var pl = new THREE.PlaneGeometry(0.22, 0.9, 1, 3);
var pp = pl.attributes.position;
for (var j = 0; j < pp.count; j++) {
var yy = pp.getY(j) + 0.45;
pp.setZ(j, -yy * yy * 0.35);
pp.setY(j, yy * 0.8);
}
pl.rotateX(-0.5);
pl.rotateY(k / 7 * 6.283);
fern.push(pl);
}
var trunk = new THREE.CylinderGeometry(0.22, 0.34, 1, 6);
trunk.translate(0, 0.5, 0);
var crownBlob = function (n, r, sy, spread, y0) { var a = []; for (var q = 0; q < n; q++) {
var g = new THREE.IcosahedronGeometry(r, L ? 0 : 1);
g.scale(1, sy, 1);
seiLump(g, 0.45, q + 20);
g.translate(Math.cos(q * 2.1) * spread, y0 + (q % 2) * r * 0.5, Math.sin(q * 2.1) * spread);
a.push(g);
} return seiMerge(a); };
var olive = crownBlob(4, 1.3, 0.7, 1.1, 3.2), oak = crownBlob(5, 2.2, 0.75, 1.8, 5.6), orchard = crownBlob(3, 1.2, 0.85, 0.8, 2.9);
var pine = seiMerge([new THREE.ConeGeometry(2.2, 3.2, L ? 6 : 8).translate(0, 6.2, 0), new THREE.ConeGeometry(1.7, 2.8, L ? 6 : 8).translate(0, 7.8, 0), new THREE.ConeGeometry(1.1, 2.4, L ? 6 : 8).translate(0, 9.2, 0)]);
var cyp = new THREE.ConeGeometry(1.0, 10, L ? 6 : 8);
cyp.scale(1, 1, 1);
var cp = cyp.attributes.position;
for (var ci = 0; ci < cp.count; ci++) {
var yy2 = cp.getY(ci) + 5, k2 = Math.sin(Math.min(1, yy2 / 10) * Math.PI * 0.9 + 0.25);
cp.setX(ci, cp.getX(ci) * k2 * 1.25);
cp.setZ(ci, cp.getZ(ci) * k2 * 1.25);
}
cyp.computeVertexNormals();
cyp.translate(0, 6.2, 0);
var poplar = new THREE.IcosahedronGeometry(1.4, L ? 0 : 1);
poplar.scale(1, 4.2, 1);
seiLump(poplar, 0.35, 31);
poplar.translate(0, 7.5, 0);
var palm = seiMerge([0, 1, 2, 3, 4, 5].map(function (i) { var l = new THREE.PlaneGeometry(0.6, 3.2, 1, 4); var lp = l.attributes.position; for (var j = 0; j < lp.count; j++) {
var t = lp.getY(j) + 1.6;
lp.setZ(j, -t * t * 0.18);
lp.setY(j, t * 0.9);
} l.rotateX(-1.1); l.rotateY(i / 6 * 6.283); l.translate(0, 7.2, 0); return l; }));
var palmTrunk = new THREE.CylinderGeometry(0.16, 0.26, 7.4, 6);
palmTrunk.translate(0, 3.7, 0);
var wallStone = new THREE.BoxGeometry(1.1, 0.9, 0.7);
seiLump(wallStone, 0.25, 41);
wallStone.translate(0, 0.45, 0);
SEI_GEO = { shrub: shrub, tuft: tuft, rock: rock, flower: flower, stems: stems, fern: seiMerge(fern), trunk: trunk, olive: olive, oak: oak, orchard: orchard, pine: pine, cypress: cyp, poplar: poplar, palm2: palm, palmTrunk: palmTrunk, wall: wallStone };
return SEI_GEO;
},
function () {
if (SEI.gtex)
return SEI.gtex;
var R = wRand(4417);
SEI.gtex = wTex(64, 64, function (x, W, H) {
x.clearRect(0, 0, W, H);
for (var i = 0; i < 60; i++) {
var bx = 3 + R() * (W - 6), h = H * (0.4 + R() * 0.6), lean = (R() - 0.5) * 18, v = 170 + R() * 85 | 0;
x.strokeStyle = "rgba(" + v + "," + v + "," + (v - 20) + ",1)";
x.lineWidth = 2.2 + R() * 2.2;
x.lineCap = "round";
x.beginPath();
x.moveTo(bx, H);
x.quadraticCurveTo(bx + lean * 0.3, H - h * 0.6, bx + lean, H - h);
x.stroke();
}
});
SEI.gtex.generateMipmaps = false;
SEI.gtex.minFilter = THREE.LinearFilter;
return SEI.gtex;
},
function (G, geo, list, ds, grass, nm) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(geo, seiMat(ds, grass), list.length);
im.name = nm || "";
var M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s = new THREE.Vector3(), c = new THREE.Color();
list.forEach(function (o, i) { p.set(o[0], o[1], o[2]); e.set(o[4] || 0, o[3] || 0, o[5] || 0); q.setFromEuler(e); s.set(o[6], o[7] || o[6], o[8] || o[6]); M.compose(p, q, s); im.setMatrixAt(i, M); c.setHex(o[9]); im.setColorAt(i, c); });
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.raycast = function () { };
if (im.computeBoundingSphere) {
im.computeBoundingSphere();
im.frustumCulled = true;
}
else
im.frustumCulled = false;
G.add(im);
return im;
},
function (p, x, z, minH) {
var h = seaIsleH(p, x, z);
if (h < (minH || 2.2))
return null;
if (p.land && Math.hypot(x - p.land.x, z - p.land.z) < 42)
return null;
if (p.clear && p.clear.some(function (c) { return Math.hypot(x - p.x - c[0], z - p.z - c[1]) < c[2] + 4; }))
return null;
if (p.flat && p.flat.some(function (f) { return Math.hypot(x - p.x - f[0], z - p.z - f[1]) < f[2] + 3; }))
return null;
return h;
},
function (p, LK) {
var gr = p.g && p.g.children[0];
if (!gr || !gr.geometry || !gr.geometry.attributes.color || p.lift)
return;
var ps = gr.geometry.attributes.position, cl = gr.geometry.attributes.color, c = new THREE.Color(), A = new THREE.Color(LK.g[0]), Bd = new THREE.Color(LK.g[1]), D = new THREE.Color(LK.g[2]), rk = new THREE.Color(p.rock), sd = new THREE.Color(0xD8C8A0);
for (var i = 0; i < ps.count; i++) {
var x = p.x + ps.getX(i), z = p.z + ps.getZ(i), h = ps.getY(i);
if (h < 0.2)
continue;
var n1 = wFbm(x * 0.008, z * 0.008, (p.x | 0) % 97, 3), n2 = wFbm(x * 0.03, z * 0.03, (p.z | 0) % 89, 2);
c.copy(A);
c.lerp(Bd, Math.max(0, Math.min(1, (n1 - 0.5) * 4)));
c.lerp(D, Math.max(0, Math.min(1, (0.45 - n2) * 4)) * 0.8);
c.multiplyScalar(0.7);
c.getHSL(SEI.hsl || (SEI.hsl = {}));
c.setHSL(SEI.hsl.h, Math.min(1, SEI.hsl.s * 1.35), SEI.hsl.l);
if (LK.wheat && n1 > 0.58 && h > 3 && h < p.h * 0.5)
c.lerp(new THREE.Color(0xD8B860), 0.75);
var hr = Math.max(p.h * 0.6, 22);
if (h > hr)
c.lerp(rk, Math.min(0.85, (h - hr) / Math.max(8, p.h - hr) * 1.6 + n2 * 0.2));
if (h < 2.2)
c.lerp(sd, Math.min(1, (2.2 - h) / 1.4));
cl.setXYZ(i, c.r, c.g, c.b);
}
cl.needsUpdate = true;
},
function (T, kind, x, y, z, R, LK) {
var s = 0.8 + R() * 0.45, ry = R() * 6.28;
if (kind === "palm2") {
T.palmTrunk.push([x, y, z, ry, (R() - 0.5) * 0.15, (R() - 0.5) * 0.15, s, s, s, 0x7A6448]);
T.palm2.push([x, y, z, ry, 0, 0, s, s, s, seiShade(0x5A8A3A, R)]);
return;
}
var th = kind === "olive" ? 2.6 : kind === "orchard" ? 2.4 : kind === "oak" ? 4.6 : kind === "pine" ? 5.2 : kind === "poplar" ? 3.5 : 1.6, tc = kind === "olive" ? 0x6A6050 : kind === "pine" ? 0x5A3E2A : 0x5A4430;
T.trunk.push([x, y, z, ry, (kind === "olive" ? (R() - 0.5) * 0.35 : 0), 0, s * (kind === "olive" ? 1.2 : 1), th * s, s * (kind === "olive" ? 1.2 : 1), tc]);
var cc = kind === "olive" ? seiShade(0x8A9A6A, R, 0.15) : kind === "pine" ? seiShade(0x2E4A2A, R) : kind === "cypress" ? seiShade(0x24401E, R, 0.15) : kind === "poplar" ? seiShade(LK === SEI_LOOK.cimmeria ? 0x3A4030 : 0x4A6A2E, R) : kind === "orchard" ? seiShade(0x4E7A32, R) : seiShade(0x3A6A2A, R);
T[kind].push([x, y, z, ry, 0, 0, s, s, s, cc]);
},
function (p) {
var LK = SEI_LOOK[p.k];
if (!LK || !p.g || p.g.userData.sei)
return;
p.g.userData.sei = 1;
SEI.groups = SEI.groups.filter(function (o) { return o.p !== p && o.p.k !== p.k; });
var L = typeof LITE !== "undefined" && LITE, R = wRand((p.x * 13 + p.z * 7) | 0), G = new THREE.Group();
G.name = "sei-" + p.k;
p.g.add(G);
G.visible = false;
SEI.groups.push({ g: G, p: p });
seiGround(p, LK);
var area = Math.PI * p.r * p.r * 0.7 / 10000, f = L ? 0.5 : 1, B = { shrub: [], tuft: [], rock: [], flower: [], stems: [], fern: [], wall: [] }, T = { trunk: [], olive: [], oak: [], orchard: [], pine: [], cypress: [], poplar: [], palm2: [], palmTrunk: [] };
var spot = function (minH) { for (var t = 0; t < 12; t++) {
var a = R() * 6.283, d = Math.sqrt(R()) * p.r * 0.95, x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d, h = seiOpen(p, x, z, minH);
if (h !== null)
return [x, h, z];
} return null; };
var nS = Math.round(LK.dens[0] * 2.2 * area * f);
for (var c = 0; c < nS / 5; c++) {
var cc = spot();
if (!cc)
continue;
for (var k = 0; k < 5; k++) {
var x = cc[0] + (R() - 0.5) * 14, z = cc[2] + (R() - 0.5) * 14, h = seiOpen(p, x, z);
if (h === null)
continue;
var s = 0.6 + R() * 1.1;
B.shrub.push([x, h - 0.1, z, R() * 6, 0, 0, s, s * (0.7 + R() * 0.5), s, seiShade(LK.sh[R() * LK.sh.length | 0], R)]);
}
}
var nT = Math.round(LK.dens[1] * 6 * area * f);
for (var i = 0; i < nT; i++) {
var q = spot();
if (!q)
continue;
var s2 = 1.1 + R() * 1.2, tc = new THREE.Color(seiShade(LK.g[R() < 0.6 ? 0 : (R() < 0.5 ? 1 : 2)], R, 0.3)).multiplyScalar(0.62);
B.tuft.push([q[0], q[1] - 0.05, q[2], R() * 6, 0, 0, s2, s2 * (0.7 + R() * 0.7), s2, tc.getHex()]);
}
var nR = Math.round(LK.dens[2] * area * f);
for (var r = 0; r < nR; r++) {
var q2 = spot();
if (!q2)
continue;
var s3 = 0.4 + R() * R() * 2.6;
B.rock.push([q2[0], q2[1] - s3 * 0.2, q2[2], R() * 6, (R() - 0.5) * 0.3, (R() - 0.5) * 0.3, s3, s3 * (0.6 + R() * 0.6), s3, seiShade(p.rock, R, 0.3)]);
}
var nF = Math.round(LK.dens[3] * 3 * area * f);
for (var fl = 0; fl < nF / 6; fl++) {
var fc = spot();
if (!fc)
continue;
var col = LK.fl[R() * LK.fl.length | 0];
for (var k2 = 0; k2 < 6; k2++) {
var fx = fc[0] + (R() - 0.5) * 8, fz = fc[2] + (R() - 0.5) * 8, fh = seiOpen(p, fx, fz);
if (fh === null)
continue;
var s4 = 0.8 + R() * 0.6, ry = R() * 6;
B.flower.push([fx, fh, fz, ry, 0, 0, s4, s4, s4, seiShade(col, R, 0.15)]);
B.stems.push([fx, fh, fz, ry, 0, 0, s4, s4, s4, 0x4A6A2A]);
}
}
if (LK.fern) {
for (var fe = 0; fe < Math.round(30 * area * f); fe++) {
var fq = spot();
if (!fq)
continue;
var s5 = 0.8 + R() * 0.8;
B.fern.push([fq[0], fq[1] - 0.05, fq[2], R() * 6, 0, 0, s5, s5, s5, seiShade(0x3A6A2A, R)]);
}
}
var tr = LK.tr, nTr = Math.round(tr.n * (p.r / 420) * (p.r / 420) * f * 1.2);
if (tr.rows) {
var made = 0;
for (var gtry = 0; gtry < 12 && made < nTr; gtry++) {
var o = spot(3);
if (!o)
continue;
var ang = R() * 3.14, ux = Math.cos(ang), uz = Math.sin(ang), gap = tr.kind === "cypress" ? 9 : 7;
for (var a1 = -4; a1 <= 4 && made < nTr; a1++)
for (var b1 = (tr.kind === "cypress" ? 0 : -3); b1 <= (tr.kind === "cypress" ? 1 : 3) && made < nTr; b1++) {
var x2 = o[0] + ux * a1 * gap - uz * b1 * gap + (R() - 0.5) * 1.2, z2 = o[2] + uz * a1 * gap + ux * b1 * gap + (R() - 0.5) * 1.2, h2 = seiOpen(p, x2, z2, 3);
if (h2 === null || h2 > p.h * 0.8)
continue;
seiTreePut(T, tr.kind, x2, h2 - 0.2, z2, R, LK);
made++;
}
}
}
for (var tt = 0; tt < (tr.rows ? nTr * 0.3 : nTr); tt++) {
var o2 = spot(3);
if (!o2 || o2[1] > p.h * 0.85)
continue;
seiTreePut(T, tr.kind, o2[0], o2[1] - 0.2, o2[2], R, LK);
}
if (LK.walls) {
for (var w = 0; w < (L ? 4 : 9); w++) {
var wq = spot(3);
if (!wq)
continue;
var wa = R() * 3.14, len = 30 + R() * 50, wx = Math.cos(wa), wz = Math.sin(wa);
for (var d2 = -len / 2; d2 < len / 2; d2 += 1.05) {
var sx = wq[0] + wx * d2, sz = wq[2] + wz * d2, sh2 = seiOpen(p, sx, sz, 2.5);
if (sh2 === null)
continue;
B.wall.push([sx, sh2 - 0.25, sz, wa + (R() - 0.5) * 0.3, (R() - 0.5) * 0.15, 0, 0.9 + R() * 0.25, 0.8 + R() * 0.4, 0.9 + R() * 0.2, seiShade(p.rock, R, 0.35)]);
}
}
}
var GG = seiGeo();
seiIM(G, GG.shrub, B.shrub, 0, 0, "shrub");
seiIM(G, GG.tuft, B.tuft, false, true, "tuft");
seiIM(G, GG.rock, B.rock, 0, 0, "rock");
seiIM(G, GG.flower, B.flower, 0, 0, "flower");
seiIM(G, GG.stems, B.stems, 0, 0, "stems");
seiIM(G, GG.fern, B.fern, true, 0, "fern");
seiIM(G, GG.wall, B.wall, 0, 0, "wall");
Object.keys(T).forEach(function (k) { seiIM(G, GG[k], T[k], k === "palm2", 0, k); });
SEA.solids = SEA.solids || [];
T.trunk.concat(T.palmTrunk).forEach(function (t) { SEA.solids.push({ x: t[0], z: t[2], r: 0.5 }); });
},
function (x, z) {
var L = typeof LITE !== "undefined" && LITE, N = L ? 1400 : 3600, F = SEI.near;
if (!F) {
var G = WORLDS.sea && WORLDS.sea.g;
if (!G)
return;
F = SEI.near = { im: new THREE.InstancedMesh(seiGeo().tuft, seiMat(false, true), N), x: 1e9, z: 1e9 };
F.im.frustumCulled = false;
F.im.raycast = function () { };
F.im.count = 0;
G.add(F.im);
for (var i0 = 0; i0 < N; i0++)
F.im.setColorAt(i0, new THREE.Color(0x4A6A2A));
}
if (Math.hypot(x - F.x, z - F.z) < 9)
return;
F.x = x;
F.z = z;
var isle = null;
SEA.isles.forEach(function (p) { if (Math.hypot(x - p.x, z - p.z) < p.r + 40)
isle = p; });
var LK = isle && SEI_LOOK[isle.k];
if (!LK) {
F.im.count = 0;
return;
}
var R = wRand(((x * 0.1) | 0) * 31 + ((z * 0.1) | 0) * 17), M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), pv = new THREE.Vector3(), sv = new THREE.Vector3(), c = new THREE.Color(), k = 0;
for (var t = 0; t < N * 1.4 && k < N; t++) {
var a = R() * 6.283, d = Math.sqrt(R()) * 38, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d, h = seiOpen(isle, px, pz, 2.0);
if (h === null)
continue;
var sc = 0.8 + R() * 0.9;
pv.set(px, h - 0.05, pz);
e.set(0, R() * 6.28, 0);
q.setFromEuler(e);
sv.set(sc, sc * (0.7 + R() * 0.6), sc);
M.compose(pv, q, sv);
F.im.setMatrixAt(k, M);
c.setHex(seiShade(LK.g[R() < 0.65 ? 0 : (R() < 0.5 ? 2 : 1)], R, 0.3)).multiplyScalar(0.6);
F.im.setColorAt(k, c);
k++;
}
F.im.count = k;
F.im.instanceMatrix.needsUpdate = true;
if (F.im.instanceColor)
F.im.instanceColor.needsUpdate = true;
},
function () {
var t = performance.now();
if (t - SEI.at < 400)
return;
SEI.at = t;
if (typeof camera === "undefined" || typeof SEA === "undefined")
return;
var x = camera.position.x - SEA.base, z = camera.position.z;
SEI.groups.forEach(function (o) { var d = Math.hypot(x - o.p.x, z - o.p.z) - o.p.r; o.g.visible = d < 520; });
if (!SEA.aboard)
seiNear(x, z);
else if (SEI.near)
SEI.near.im.count = 0;
}
];
});
