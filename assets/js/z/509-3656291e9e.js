/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(509, function () {
"use strict";
return [
function (kind) {
JBD.tex = JBD.tex || {};
if (JBD.tex[kind])
return JBD.tex[kind];
var c = document.createElement("canvas"), N = 256;
c.width = c.height = N;
var x = c.getContext("2d"), r = ppRand(kind === "panel" ? 17 : 29);
if (kind === "panel") {
x.fillStyle = "#B4B4BC";
x.fillRect(0, 0, N, N);
for (var i = 0; i < 900; i++) {
x.fillStyle = "rgba(" + (r() < 0.5 ? "90,90,100" : "230,230,240") + ",0.07)";
x.fillRect(r() * N, r() * N, 2 + r() * 5, 1 + r() * 2);
}
var g = x.createLinearGradient(0, 0, N, 0);
g.addColorStop(0, "rgba(255,255,255,0.0)");
g.addColorStop(0.5, "rgba(255,255,255,0.10)");
g.addColorStop(1, "rgba(255,255,255,0.0)");
x.fillStyle = g;
x.fillRect(0, 0, N, N);
x.fillStyle = "rgba(30,30,40,0.85)";
x.fillRect(0, 0, N, 3);
x.fillRect(0, N / 2, N, 3);
x.fillRect(0, 0, 3, N);
x.fillStyle = "rgba(255,255,255,0.18)";
x.fillRect(0, 3, N, 1);
x.fillRect(0, N / 2 + 3, N, 1);
for (var b = 0; b < 4; b++) {
x.fillStyle = "rgba(40,40,50,0.6)";
x.beginPath();
x.arc(10, 10 + b * N / 4, 2, 0, 7);
x.fill();
}
}
else {
x.fillStyle = "#E8E4E0";
x.fillRect(0, 0, N, N);
for (var j = 0; j < 2400; j++) {
x.fillStyle = "rgba(" + (r() < 0.5 ? "170,160,160" : "255,255,255") + "," + (0.05 + r() * 0.08).toFixed(2) + ")";
x.fillRect(r() * N, r() * N, 1 + r() * 3, 1 + r() * 3);
}
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = 4;
JBD.tex[kind] = t;
return t;
},
function (G, cx, cz, w, h, d, col, kind, glow, lite, y0) {
y0 = y0 || 0;
var mat = new THREE.MeshLambertMaterial({ color: col, map: jbdTex(kind) }), fin = ppM(new THREE.Color(col).multiplyScalar(0.7).getHex()), u = kind === "panel" ? 3 : 4, v = kind === "panel" ? 3 : 4;
[[0, d / 2 + 0.04, w, 0], [0, -d / 2 - 0.04, w, Math.PI], [w / 2 + 0.04, 0, d, Math.PI / 2], [-w / 2 - 0.04, 0, d, -Math.PI / 2]].forEach(function (f) {
jbdFace(G, f[2], h, u, v, mat, cx + f[0], y0 + h / 2, cz + f[1], f[3]);
if (kind === "panel") {
var n = Math.floor(f[2] / (lite ? 8 : 4));
for (var i = 1; i < n; i++) {
var t = -f[2] / 2 + i * f[2] / n, nx = Math.cos(f[3]) * t, nz = -Math.sin(f[3]) * t;
var fb = ppBox(0.18, h - 2.4, 0.5, fin, cx + f[0] * 1.004 + nx + Math.sin(f[3]) * 0.25, y0 + h / 2 - 0.6, cz + f[1] * 1.004 + nz + Math.cos(f[3]) * 0.25, G);
fb.rotation.y = f[3];
}
}
if (glow) {
var s = ppBox(f[2], 0.18, 0.12, ppGlowMat(glow), cx + f[0] * 1.006, y0 + h - 0.9, cz + f[1] * 1.006, G);
s.rotation.y = f[3];
}
});
},
function (G, x, z, y, col, n) {
y = y || 0;
ppCyl(0.5, 0.5, 0.05, ppM(col || 0x1E1A24), x, y + 1.08, z, G, 16);
ppCyl(0.05, 0.05, 1.06, ppM(0xC9A868), x, y + 0.55, z, G, 8);
ppCyl(0.32, 0.36, 0.05, ppM(0xC9A868), x, y + 0.03, z, G, 12);
for (var s = 0; s < (n || 3); s++) {
var a = s / (n || 3) * Math.PI * 2 + 0.4, sx = x + Math.cos(a) * 0.95, sz = z + Math.sin(a) * 0.95;
ppCyl(0.2, 0.2, 0.08, ppM(0x2A1A30), sx, y + 0.78, sz, G, 10);
ppCyl(0.03, 0.03, 0.74, ppM(0x8A8A90), sx, y + 0.39, sz, G, 6);
ppCyl(0.18, 0.18, 0.02, ppM(0x8A8A90), sx, y + 0.3, sz, G, 10);
}
PP.solids.push({ x: x, z: z, r: 0.6, h: 1.2, b: y - 0.2 });
},
function (G, x, z, y, s, leaf) {
y = y || 0;
s = s || 1;
ppCyl(0.42 * s, 0.32 * s, 0.9 * s, ppM(0x2A2630), x, y + 0.45 * s, z, G, 12);
ppCyl(0.4 * s, 0.4 * s, 0.04, ppM(0x3A2A1E), x, y + 0.9 * s, z, G, 12);
var lf = ppM(leaf || 0x3A7A4A);
for (var k = 0; k < 7; k++) {
var a = k / 7 * Math.PI * 2 + s, fr = wMesh(new THREE.ConeGeometry(0.22 * s, 1.6 * s, 4), lf, x + Math.cos(a) * 0.5 * s, y + 1.55 * s, z + Math.sin(a) * 0.5 * s, G);
fr.rotation.z = Math.cos(a) * 1.0;
fr.rotation.x = -Math.sin(a) * 1.0;
fr.scale.z = 0.3;
}
ppCyl(0.05 * s, 0.07 * s, 1.2 * s, ppM(0x5A4030), x, y + 1.4 * s, z, G, 6);
PP.solids.push({ x: x, z: z, r: 0.45 * s, h: 2, b: y - 0.2 });
},
function (G, x, z, y, ry, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var fr = ppM(0x6A5240), cu = ppM(col || 0xE8E0D0);
ppBox(0.8, 0.28, 2.0, fr, 0, 0.24, 0.1, g);
ppBox(0.74, 0.12, 1.4, cu, 0, 0.44, 0.38, g);
var bk = ppBox(0.74, 0.12, 0.75, cu, 0, 0.7, -0.6, g);
bk.rotation.x = -0.75;
[-0.34, 0.34].forEach(function (sx) { [-0.8, 0.95].forEach(function (sz) { ppBox(0.06, 0.12, 0.06, fr, sx, 0.06, sz, g); }); });
ppCyl(0.26, 0.26, 0.04, fr, 0.85, 0.5, 0.6, g, 12);
ppCyl(0.03, 0.03, 0.48, fr, 0.85, 0.25, 0.6, g, 6);
PP.solids.push({ x: x, z: z, hw: 0.45, hd: 1.05, rot: ry, h: 0.9, b: y - 0.2 });
},
function () {
var lite = PP.lite, D = new THREE.Group();
D.name = "jbd-out";
PP.out.add(D);
jbdClad(D, 62, 40, 60, 18, 60, 0x5A4A6A, "panel", 0xC890FF, lite);
jbdClad(D, 57, -55, 50, 12, 50, 0x4A5A7A, "panel", 0x7AC8FF, lite);
jbdClad(D, -46, 170, 32, 9, 40, 0xF4D8E4, "plaster", null, lite);
[-1, 1].forEach(function (s) {
for (var i = 0; i < (lite ? 1 : 2); i++) {
var wz = 170 + s * (5 + i * 6.5);
ppBox(0.12, 3.0, 4.8, ppM(0xE8D8C0), -29.9, 2.0, wz, D);
ppBox(0.06, 2.6, 4.4, ppGlowMat(0xFFE8C8, 0.9), -29.82, 2.0, wz, D);
for (var k = 0; k < 3; k++)
ppBox(0.1, 0.5 + k * 0.15, 0.6, ppM([0xE84A8A, 0xF0C840, 0x4AA8E8][k]), -29.75, 1.0 + k * 0.2, wz - 1.2 + k * 1.2, D);
}
});
jbxFinish(D);
},
function () {
var R = PP.rooms.glow;
if (!R)
return;
var lite = PP.lite, D = new THREE.Group();
D.name = "jbd-glow";
R.g.add(D);
var tops = [[4568, 12], [4568, 30], [4578, 8], [4578, 20], [4578, 36], [4632, 12], [4632, 30], [4622, 8], [4622, 20], [4622, 36]];
tops.forEach(function (q, i) { if (!lite || i % 2 === 0)
jbdHighTop(D, q[0], q[1], 0, 0x24182E, 3); });
jbdRug(D, 4636, 19, 0, 6, 9, 0x4A2A5A);
for (var p = 0; p < (lite ? 3 : 6); p++)
jbdPouf(D, 4634 + (p % 2) * 3.6, 15 + Math.floor(p / 2) * 3.6, 0, [0xC85A9A, 0x5AC8C8, 0xE8C060][p % 3]);
ppTable(D, 4636, 19, 0.5);
for (var k = 0; k < (lite ? 3 : 6); k++) {
var z = 4 + k * 8;
jbdPot(D, 4556.6, z + 4, 0, 1.1);
jbdPot(D, 4643.4, z + 4, 0, 1.1);
if (k % 2 === 0) {
jbdLightCol(D, R.live, 4562, z + 6, 0, 7.2, [0xFF8AC8, 0x7AE0E8, 0xF0C870][(k / 2) % 3]);
jbdLightCol(D, R.live, 4638, z + 6, 0, 7.2, [0xF0C870, 0xFF8AC8, 0x7AE0E8][(k / 2) % 3]);
}
}
jbdRug(D, 4573, 21, 0, 12, 26, 0x2A1838);
jbdRug(D, 4627, 21, 0, 12, 26, 0x2A1838);
jbdRug(D, 4600, 41, 0, 4, 11, 0x5A2A4A);
[[4570, 42], [4580, 44], [4590, 40], [4610, 40], [4620, 44], [4630, 42]].forEach(function (q, i) { if (!lite || i % 2 === 0)
jbdHighTop(D, q[0], q[1], 0, 0x24182E, 3); });
jbdRug(D, 4566, 4, 0, 9, 6, 0x3A2A5A);
[[4562, 3, Math.PI / 2], [4570, 3, -Math.PI / 2]].forEach(function (q) { ppSofa(D, q[0], q[1], q[2], 0x6A2A7A, 3); });
ppTable(D, 4566, 3, 0.5);
jbxFinish(D);
},
function () {
var R = PP.rooms.club;
if (!R)
return;
var lite = PP.lite, D = new THREE.Group();
D.name = "jbd-club";
R.g.add(D);
var brass = ppM(0xC9A868, { e: 0x2A1C08 });
[[-1, 0], [1, 0], [0, -1]].forEach(function (s) {
var long = s[0] === 0, cx = 2000 + s[0] * 9, cz = -2 + s[1] * 9, L2 = 18;
ppBox(long ? L2 : 0.08, 0.06, long ? 0.08 : L2, brass, cx, 1.05, cz, D);
ppBox(long ? L2 : 0.05, 0.05, long ? 0.05 : L2, brass, cx, 0.55, cz, D);
for (var i = 0; i <= 6; i++) {
var t = -L2 / 2 + i * L2 / 6;
ppCyl(0.04, 0.04, 1.05, brass, long ? cx + t : cx, 0.52, long ? cz : cz + t, D, 6);
}
PP.solids.push({ x: cx, z: cz, hw: long ? L2 / 2 : 0.1, hd: long ? 0.1 : L2 / 2, h: 1.1, b: -0.2 });
});
ppBox(18, 0.06, 0.08, brass, 2000, 1.05, 7, D);
ppBox(5, 0.06, 0.08, brass, 1993.5, 1.05, 7, D);
ppBox(59.6, 0.02, 59.6, jbxReal("floortile", 0x6A5878), 2000, 0.011, 0, D);
for (var dx = 0; dx < 6; dx++)
for (var dz = 0; dz < 6; dz++) {
if (lite && (dx + dz) % 2)
continue;
var lx = 1975 + dx * 10, lz = -25 + dz * 10;
if (Math.abs(lx - 2000) < 10 && Math.abs(lz + 2) < 10)
continue;
var dl = ppCyl(0.35, 0.35, 0.05, ppGlowMat(0xFFE0B8, 0.95), lx, 9.95, lz, R.live, 12);
if (!lite) {
var pool = new THREE.Mesh(new THREE.CircleGeometry(2.6, 16), ppGlowMat(0xFFD8A8, 0.07));
pool.rotation.x = -Math.PI / 2;
pool.position.set(lx, 0.03, lz);
R.live.add(pool);
}
}
jbdRug(D, 1990, 18, 0, 12, 10, 0x2A1430);
jbdRug(D, 2010, 18, 0, 12, 10, 0x2A1430);
jbdRug(D, 1980, 2, 0, 6, 12, 0x3A1838);
jbdRug(D, 2020, 2, 0, 6, 12, 0x3A1838);
[[1980, -2], [1980, 4], [2020, -2], [2020, 4]].forEach(function (q, i) { jbdPouf(D, q[0] - 1.4, q[1], 0, [0xC85A9A, 0x8AFF9A][i % 2]); jbdPouf(D, q[0] + 1.4, q[1], 0, [0x7AE0E8, 0xF0C870][i % 2]); ppTable(D, q[0], q[1], 0.45); });
[[1986, 14], [1994, 18], [2006, 18], [2014, 14], [1984, 4], [2016, 4], [1990, 24], [2010, 24]].forEach(function (q, i) { if (!lite || i % 2 === 0)
jbdHighTop(D, q[0], q[1], 0, 0x1E1028, 3); });
[[1972.6, 27.4], [2027.4, 27.4], [1972.6, -16], [2027.4, -14]].forEach(function (q) { jbdPot(D, q[0], q[1], 0, 1.2); });
[[1985, -14], [2015, -14], [1985, 10], [2015, 10]].forEach(function (q, i) { if (!lite || i < 2)
jbdLightCol(D, R.live, q[0], q[1], 0, 9.6, [0xC890FF, 0x8AFF9A, 0xFF8AC8, 0x7AE0E8][i]); });
jbxFinish(D);
},
function () {
var lite = PP.lite, Rf = PP_ROOF, y = 18.4, D = new THREE.Group();
D.name = "jbd-roof";
PP.out.add(D);
var deck = jbxReal("wood", 0x9A7A5A);
ppBox(Rf.x1 - Rf.x0 - 0.2, 0.04, Rf.z1 - Rf.z0 - 0.2, deck, (Rf.x0 + Rf.x1) / 2, y + 0.02, (Rf.z0 + Rf.z1) / 2, D);
var lf = [0x3A6A3A, 0x4A7A3A, 0x2E5A3A];
for (var i = 0; i < (lite ? 6 : 12); i++) {
var t = (i + 0.5) / (lite ? 6 : 12);
[[Rf.x0 + 0.8 + t * (Rf.x1 - Rf.x0 - 1.6), Rf.z0 + 1.1, 0], [Rf.x0 + 0.8 + t * (Rf.x1 - Rf.x0 - 1.6), Rf.z1 - 1.1, 0], [Rf.x0 + 1.1, Rf.z0 + 6 + t * (Rf.z1 - Rf.z0 - 12), 1], [Rf.x1 - 1.1, Rf.z0 + 6 + t * (Rf.z1 - Rf.z0 - 12), 1]].forEach(function (q, j) {
if (j === 3 && q[1] > 54)
return;
ppBox(q[2] ? 1.0 : 3.2, 0.7, q[2] ? 3.2 : 1.0, ppM(0x3A3440), q[0], y + 0.35, q[1], D);
for (var b = 0; b < 3; b++) {
var bs = ppSph(0.5 + ((i + b + j) % 3) * 0.12, ppM(lf[(i + b + j) % 3]), q[0] + (q[2] ? 0 : (b - 1) * 1.0), y + 0.95, q[1] + (q[2] ? (b - 1) * 1.0 : 0), D, 8);
bs.scale.y = 0.75;
}
PP.solids.push({ x: q[0], z: q[1], hw: q[2] ? 0.5 : 1.6, hd: q[2] ? 1.6 : 0.5, h: 1.2, b: y - 0.2 });
});
}
for (var l = 0; l < (lite ? 3 : 6); l++) {
var lx = 40 + l * 8;
jbdLounger(D, lx, 62.4, y, Math.PI, [0xE8E0D0, 0xC8A8D8, 0xA8D8D0][l % 3]);
if (l % 2 === 0)
jbdParasol(D, lx + 3.8, 62.4, y, [0xE84A8A, 0xF0E0C0, 0x4AA8C8][l % 3]);
}
[[44, 36], [62, 40], [80, 36]].forEach(function (q, i) {
jbdRug(D, q[0], q[1], y, 6, 6, [0x6A3A5A, 0x3A4A6A, 0x5A4A2A][i]);
for (var p = 0; p < (lite ? 2 : 4); p++) {
var a = p / 4 * Math.PI * 2 + 0.4;
jbdPouf(D, q[0] + Math.cos(a) * 2.4, q[1] + Math.sin(a) * 2.4, y, [0xD8C8B0, 0xC85A7A, 0x5AA8B8][p % 3]);
}
});
[[36, 30], [36, 48], [88, 30], [88, 46], [56, 30], [70, 48]].forEach(function (q, i) { if (!lite || i < 3)
jbdPot(D, q[0], q[1], y, 1.3, 0x4A7A3A); });
[[54, 24], [70, 24], [58, 28], [66, 28]].forEach(function (q, i) { if (!lite || i < 2)
jbdHighTop(D, q[0], q[1], y, 0x2A1838, 3); });
jbxFinish(D);
}
];
});
