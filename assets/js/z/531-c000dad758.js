/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(531, function () {
"use strict";
return [
function (x, z, ry, r, gap) {
var n = Math.ceil(Math.PI * 2 * r / 0.9);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
var d = Math.abs(((a - Math.PI / 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
if (d < gap / 2 + 0.12)
continue;
var lx = Math.cos(a) * r, lz = Math.sin(a) * r, c = Math.cos(ry), s = Math.sin(ry);
ppSolidR(x + lx * c + lz * s, z - lx * s + lz * c, 0.32);
}
},
function (g, ry, r, R, kind) {
var q = JBG_QUILT[Math.floor(R() * JBG_QUILT.length)], wood = ppM(0x8A6A48);
var rug = ppCyl(r * 0.72, r * 0.72, 0.02, ppM([0xA83A3A, 0x3A5A8A, 0xC8883A, 0x6A3A7A][Math.floor(R() * 4)]), 0, 0.02, 0, g, PP.lite ? 12 : 20);
ppCyl(r * 0.6, r * 0.6, 0.025, ppM(0xE8D8B8), 0, 0.025, 0, g, PP.lite ? 12 : 20);
ppBox(2.0, 0.28, 1.5, wood, 0, 0.14, -r + 1.1, g);
ppBox(1.92, 0.2, 1.42, ppM(0xF4F0E8), 0, 0.38, -r + 1.1, g);
ppBox(1.4, 0.06, 1.46, ppM(q), 0.25, 0.5, -r + 1.1, g);
ppBox(0.3, 0.08, 1.46, ppM(new THREE.Color(q).multiplyScalar(0.7).getHex()), 0.85, 0.52, -r + 1.1, g);
ppBox(0.4, 0.16, 0.55, ppM(0xF8F4EC), -0.72, 0.56, -r + 0.78, g);
ppBox(0.4, 0.16, 0.55, ppM(0xF8F4EC), -0.72, 0.56, -r + 1.42, g);
ppBox(0.3, 0.3, 0.12, ppM(0xD8A030), -0.55, 0.62, -r + 1.1, g).rotation.z = 0.3;
ppBox(0.9, 0.9, 0.03, ppM(JBG_QUILT[(JBG_QUILT.indexOf(q) + 2) % 6]), 0, 1.25, -r + 0.12, g);
ppBox(0.6, 0.4, 0.6, wood, r - 1.0, 0.2, -r + 1.3, g);
ppSph(0.12, ppGlowMat(0xFFD08A), r - 1.0, 0.55, -r + 1.3, g, 8);
ppCyl(0.14, 0.14, 0.04, ppM(0x3A3A3A), r - 1.0, 0.43, -r + 1.3, g, 8);
ppBox(0.9, 0.5, 0.5, ppM(0x6A4A2E), -r + 1.1, 0.25, 0.2, g);
ppBox(0.92, 0.04, 0.52, ppM(0xB89A50), -r + 1.1, 0.5, 0.2, g);
[[0.6, 0.6], [-0.4, 0.9]].forEach(function (p, i) { ppCyl(0.32, 0.34, 0.18, ppM(JBG_QUILT[(i + 3) % 6]), p[0], 0.11, p[1], g, 10); });
var b = jbgW(g, 0, -r + 1.1, ry);
ppSolid(b[0], b[1], 1.0, 0.75, ry, 0.6, 0);
var t = jbgW(g, -r + 1.1, 0.2, ry);
ppSolid(t[0], t[1], 0.45, 0.25, ry, 0.55, 0);
var tb = jbgW(g, r - 1.0, -r + 1.3, ry);
ppSolid(tb[0], tb[1], 0.3, 0.3, ry, 0.45, 0);
var sp = jbgW(g, 0, -r + 2.2, ry);
ppSpot({ x: sp[0], z: sp[1], r: 1.4, name: (kind === "yurt" ? "The yurt" : "The bell tent") + ": lie down on the bed and rest", fn: function () { ppRest(kind === "yurt" ? "a yurt" : "a bell tent"); } });
},
function (g, x, z, ry, R) {
var r = 3.0, canvas = ppM(JBG_CANVAS[Math.floor(R() * 3)], { ds: 1 }), gap = 0.9;
jbgWall(g, r, 1.5, canvas, gap);
var roof = new THREE.Mesh(new THREE.ConeGeometry(r + 0.15, 2.4, PP.lite ? 14 : 24, 1, true), canvas);
roof.position.y = 1.5 + 1.2;
g.add(roof);
ppCyl(0.05, 0.05, 3.9, ppM(0x8A6A48), 0, 1.95, 0, g, 6);
var pen = ppBox(0.02, 0.35, 0.6, ppM(JBG_QUILT[Math.floor(R() * 6)]), 0, 4.0, 0.3, g);
[-1, 1].forEach(function (k) { var a = Math.PI / 2 + k * (gap / 2 + 0.12); var f = ppBox(0.5, 1.45, 0.03, canvas, Math.cos(a) * (r + 0.05), 0.75, Math.sin(a) * (r + 0.05), g); f.rotation.y = -a + Math.PI / 2; });
if (!PP.lite)
for (var i = 0; i < 8; i++) {
var a2 = i / 8 * Math.PI * 2 + 0.2;
if (Math.abs(((a2 - Math.PI / 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI) < 0.6)
continue;
var pts = [new THREE.Vector3(Math.cos(a2) * (r + 0.1), 2.0, Math.sin(a2) * (r + 0.1)), new THREE.Vector3(Math.cos(a2) * (r + 1.6), 0.05, Math.sin(a2) * (r + 1.6))];
g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), JBG.rope || (JBG.rope = new THREE.LineBasicMaterial({ color: 0xC8B898 }))));
}
jbgRingSolid(x, z, ry, r, gap);
jbgInside(g, ry, r, R, "bell");
},
function (g, x, z, ry, R) {
var r = 3.3, felt = ppM(JBG_FELT[Math.floor(R() * 4)], { ds: 1 }), gap = 0.75, wood = ppM(0xA8784A);
jbgWall(g, r, 1.8, felt, gap);
var band = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.02, r + 0.02, 0.22, PP.lite ? 14 : 24, 1, true, Math.PI / 2 + gap / 2, Math.PI * 2 - gap), ppM(0xE8D8A8, { ds: 1 }));
band.position.y = 1.55;
g.add(band);
var roof = new THREE.Mesh(new THREE.ConeGeometry(r + 0.25, 1.5, PP.lite ? 14 : 24, 1, true), ppM(0xE8DCC4, { ds: 1 }));
roof.position.y = 1.8 + 0.75;
g.add(roof);
ppCyl(0.5, 0.6, 0.25, wood, 0, 3.35, 0, g, 10);
var dz = r + 0.02;
ppBox(0.12, 1.8, 0.12, wood, -0.95, 0.9, Math.cos(gap / 2) * dz * 0.98, g);
ppBox(0.12, 1.8, 0.12, wood, 0.95, 0.9, Math.cos(gap / 2) * dz * 0.98, g);
ppBox(2.0, 0.14, 0.12, ppM(0xC83A3A), 0, 1.85, Math.cos(gap / 2) * dz * 0.98, g);
if (!PP.lite)
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, p = ppCyl(0.025, 0.025, r, wood, Math.cos(a) * r * 0.52, 2.55, Math.sin(a) * r * 0.52, g, 4);
p.rotation.z = Math.cos(a) * 1.1;
p.rotation.x = -Math.sin(a) * 1.1;
}
jbgRingSolid(x, z, ry, r, gap);
jbgInside(g, ry, r, R, "yurt");
},
function (x, z, r) {
if (ppWater(x, z) || worldSolidAt(PP.solids, x, z, 0))
return false;
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
if (worldSolidAt(PP.solids, x + Math.cos(a) * r, z + Math.sin(a) * r, 0))
return false;
}
for (var t = 0; t < JBG.tents.length; t++) {
var T = JBG.tents[t];
if (Math.hypot(x - T.x, z - T.z) < T.r + r + 0.6)
return false;
var dx = T.x + Math.sin(T.ry) * (T.r + 1.5), dz = T.z + Math.cos(T.ry) * (T.r + 1.5);
if (Math.hypot(x - dx, z - dz) < 1.6 + r)
return false;
}
for (var s = 0; s < PP.spots.length; s++) {
var S = PP.spots[s];
if (S.x != null && Math.hypot(x - S.x, z - S.z) < (S.r || 2) + r)
return false;
}
return true;
},
function (G, L, pts, col) {
var bulbs = [], lines = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(2, Math.round(d / (PP.lite ? 1.6 : 0.9)));
var seg = [];
for (var k = 0; k <= n; k++) {
var t = k / n, y = a[2] + (b[2] - a[2]) * t - Math.sin(t * Math.PI) * Math.min(1.2, d * 0.06), x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
seg.push(new THREE.Vector3(x, y, z));
if (k > 0 && k < n)
bulbs.push([x, y - 0.12, z]);
}
lines.push(seg);
}
var lm = JBG.wire || (JBG.wire = new THREE.LineBasicMaterial({ color: 0x2A2A2A }));
lines.forEach(function (s) { G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(s), lm)); });
var geo = new THREE.SphereGeometry(0.045, 6, 4), im = new THREE.InstancedMesh(geo, ppGlowMat(col || 0xFFD890), bulbs.length), M = new THREE.Matrix4();
bulbs.forEach(function (p, i) { M.makeTranslation(p[0], p[1], p[2]); im.setMatrixAt(i, M); });
im.userData.keep = 1;
(L || G).add(im);
},
function (G, a, b) {
var d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(3, Math.round(d / 0.55)), pos = [], col = [], C = [0xE83A3A, 0xF0A030, 0xF0E040, 0x3AB84A, 0x3A8AE8, 0x9A4AD8, 0xE86AB8], c = new THREE.Color();
var ux = (b[0] - a[0]) / d, uz = (b[1] - a[1]) / d;
for (var k = 0; k < n; k++) {
var t = (k + 0.5) / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t, y = a[2] + (b[2] - a[2]) * t - Math.sin(t * Math.PI) * Math.min(0.9, d * 0.05);
c.setHex(C[k % C.length]);
var w = 0.2;
pos.push(x - ux * w, y, z - uz * w, x + ux * w, y, z + uz * w, x, y - 0.38, z);
for (var v = 0; v < 3; v++)
col.push(c.r, c.g, c.b);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, JBG.flagMat || (JBG.flagMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })));
m.userData.keep = 1;
G.add(m);
G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a[0], a[2], a[1]), new THREE.Vector3((a[0] + b[0]) / 2, (a[2] + b[2]) / 2 - Math.min(0.9, d * 0.05), (a[1] + b[1]) / 2), new THREE.Vector3(b[0], b[2], b[1])]), JBG.wire || (JBG.wire = new THREE.LineBasicMaterial({ color: 0x2A2A2A }))));
},
function (G, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
var wood = ppM(0xB8925A);
[-0.3, 0.3].forEach(function (s) { var a = ppBox(0.04, 0.04, 1.2, wood, s, 0.35, 0, g); a.rotation.x = -0.5; var b = ppBox(0.04, 0.04, 0.9, wood, s, 0.3, 0.25, g); b.rotation.x = 0.7; });
var c = ppBox(0.56, 0.02, 1.05, ppM(col, { ds: 1 }), 0, 0.42, -0.02, g);
c.rotation.x = -0.62;
ppSolidR(x, z, 0.45);
},
function (G, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
var wood = ppM(0x6A4A30);
[-1.9, 1.9].forEach(function (s) { ppCyl(0.08, 0.1, 1.8, wood, s, 0.9, 0, g, 6); });
var h = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 3.0, 12, 1, true, Math.PI, Math.PI), ppM(col, { ds: 1 }));
h.rotation.z = Math.PI / 2;
h.position.y = 1.05;
h.scale.set(1, 1, 0.55);
g.add(h);
var w = jbgW(g, -1.9, 0, ry), w2 = jbgW(g, 1.9, 0, ry);
ppSolidR(w[0], w[1], 0.2);
ppSolidR(w2[0], w2[1], 0.2);
ppSolid(x, z, 1.5, 0.35, ry, 1.2, 0);
},
function (G, x, z, ry, c1, c2, R) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
ppBox(1.9, 1.0, 4.3, ppM(c1), 0, 0.85, 0, g);
ppBox(1.9, 0.95, 4.1, ppM(c2), 0, 1.8, -0.1, g);
ppBox(1.92, 0.08, 4.32, ppM(0xF4F0E8), 0, 1.32, 0, g);
var nose = ppBox(1.88, 1.6, 0.4, ppM(c1), 0, 1.15, 2.18, g);
nose.rotation.x = -0.12;
ppBox(1.6, 0.6, 0.04, ppM(0x2A3A48), 0, 1.85, 2.06, g);
[-1, 1].forEach(function (s) { for (var w = 0; w < 3; w++)
ppBox(0.04, 0.55, 0.8, ppM(0x2A3A48), s * 0.96, 1.9, -1.3 + w * 1.05, g); });
ppCyl(0.42, 0.42, 1.0, ppM(0xF4F0E8), 0, 0.85, 2.32, g, 10).rotation.x = Math.PI / 2;
[[-0.95, 1.4], [0.95, 1.4], [-0.95, -1.4], [0.95, -1.4]].forEach(function (p) { var wh = ppCyl(0.38, 0.38, 0.22, ppM(0x1A1A1A), p[0], 0.38, p[1], g, 12); wh.rotation.z = Math.PI / 2; ppCyl(0.2, 0.2, 0.24, ppM(0xD8D8D8), p[0], 0.38, p[1], g, 8).rotation.z = Math.PI / 2; });
for (var f = 0; f < (PP.lite ? 3 : 6); f++) {
var s2 = f % 2 ? 1 : -1, fz = -1.6 + R() * 3.0, fy = 0.7 + R() * 0.4, fc = JBG_QUILT[Math.floor(R() * 6)];
for (var p2 = 0; p2 < 5; p2++) {
var a = p2 / 5 * Math.PI * 2;
ppCyl(0.12, 0.12, 0.02, ppM(fc), s2 * 0.96, fy + Math.sin(a) * 0.15, fz + Math.cos(a) * 0.15, g, 8).rotation.z = Math.PI / 2;
}
ppCyl(0.08, 0.08, 0.025, ppM(0xF0E040), s2 * 0.965, fy, fz, g, 8).rotation.z = Math.PI / 2;
}
ppBox(0.03, 0.03, 3.0, ppM(0x8A8A8A), 1.0 + 1.7, 2.05, 0, g);
var aw = ppBox(1.9, 0.03, 3.0, ppM(c2, { ds: 1 }), 1.0 + 0.9, 2.3, 0, g);
aw.rotation.z = -0.18;
[-1.4, 1.4].forEach(function (pz) { ppCyl(0.03, 0.03, 2.0, ppM(0x8A8A8A), 2.7, 1.0, pz, g, 5); });
ppBox(1.8, 0.02, 2.6, ppM(0x3A6A8A), 1.9, 0.02, 0, g);
ppSolid(x, z, 1.0, 2.4, ry, 2.4, 0);
var aw2 = jbgW(g, 2.7, -1.4, ry), aw3 = jbgW(g, 2.7, 1.4, ry);
ppSolidR(aw2[0], aw2[1], 0.15);
ppSolidR(aw3[0], aw3[1], 0.15);
},
function (G, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
var cols = [0xE83A3A, 0xF0A030, 0xF0E040, 0x3AB84A, 0x3A8AE8, 0x9A4AD8];
for (var i = 0; i < 6; i++)
ppBox(2.4, 2.3, 1.6, ppM(cols[i]), 0, 1.55, -4.0 + i * 1.6, g);
ppBox(2.42, 0.15, 9.7, ppM(0xF4F0E8), 0, 2.75, 0, g);
ppBox(2.3, 1.2, 1.6, ppM(0xF0E040), 0, 1.0, 5.6, g);
[-1, 1].forEach(function (s) { for (var w = 0; w < 6; w++)
ppBox(0.04, 0.7, 1.1, ppM(0x2A3A48), s * 1.21, 2.0, -4.0 + w * 1.6, g); });
[[-1.1, 3.8], [1.1, 3.8], [-1.1, -3.2], [1.1, -3.2]].forEach(function (p) { ppCyl(0.5, 0.5, 0.3, ppM(0x1A1A1A), p[0], 0.5, p[1], g, 12).rotation.z = Math.PI / 2; });
ppBox(2.0, 0.6, 0.05, ppM(0x6A4A30), 0, 3.15, -4.7, g);
jbgDeckChair(g, -0.5, -1, 0.3, 0x3A8AE8);
jbgDeckChair(g, 0.5, 0.5, -0.2, 0xE86AB8);
g.children.slice(-2).forEach(function (c) { c.position.y += 2.82; });
PP.solids.splice(PP.solids.length - 2, 2);
ppSolid(x, z, 1.3, 6.4, ry, 3, 0);
},
function (G, L, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
var wood = ppM(0x9A7450), dark = ppM(0x5A3E28);
[[-4, -3], [4, -3], [-4, 3], [4, 3]].forEach(function (p) { ppCyl(0.08, 0.1, 3.2, dark, p[0], 1.6, p[1], g, 6); var w = jbgW(g, p[0], p[1], ry); ppSolidR(w[0], w[1], 0.2); });
var sail = ppBox(8.6, 0.04, 6.6, ppM(0xF0E4CC, { ds: 1 }), 0, 3.1, 0, g);
sail.rotation.x = 0.06;
ppBox(6, 0.9, 0.8, wood, 0, 0.45, -2.4, g);
ppBox(6.1, 0.06, 0.9, ppM(0xD8C8A8), 0, 0.93, -2.4, g);
ppBox(1.2, 0.25, 0.6, ppM(0x2A2A2E), -1.5, 1.08, -2.4, g);
ppCyl(0.16, 0.16, 0.02, ppM(0x3A3A3A), -1.8, 1.21, -2.4, g, 10);
ppCyl(0.16, 0.16, 0.02, ppM(0x3A3A3A), -1.2, 1.21, -2.4, g, 10);
ppCyl(0.12, 0.14, 0.22, ppM(0xC84A3A), -1.8, 1.34, -2.4, g, 10);
ppCyl(0.2, 0.2, 0.26, ppM(0x8A8A90), -1.2, 1.35, -2.4, g, 12);
ppBox(0.6, 0.4, 0.4, ppM(0x3A7A5A), 1.2, 1.16, -2.4, g);
for (var b = 0; b < 5; b++)
ppCyl(0.1, 0.1, 0.28, ppM([0xE8C860, 0xC84A3A, 0x5AA860, 0xF0F0E8, 0x8A5A2A][b]), 2.0 + b * 0.22, 1.1, -2.5, g, 8);
ppBox(3, 0.05, 0.4, wood, 0, 1.7, -2.75, g);
ppBox(3, 0.05, 0.4, wood, 0, 2.2, -2.75, g);
for (var j = 0; j < 10; j++)
ppCyl(0.08, 0.08, 0.22, ppM([0xE8A040, 0xC8D8E0, 0xA83A3A, 0x6AA84A][j % 4], { op: 0.9 }), -1.3 + j * 0.29, 1.84 + (j % 2) * 0.5, -2.75, g, 8);
ppCyl(0.4, 0.4, 0.95, ppM(0x3A6AA8), 3.4, 0.48, -2.0, g, 12);
var cw = jbgW(g, 0, -2.4, ry);
ppSolid(cw[0], cw[1], 3.0, 0.45, ry, 1, 0);
var bw = jbgW(g, 3.4, -2.0, ry);
ppSolidR(bw[0], bw[1], 0.45);
[-2, 2].forEach(function (px) {
ppBox(1.0, 0.06, 2.2, wood, px, 0.75, 0.8, g);
ppBox(0.3, 0.05, 2.2, wood, px - 0.75, 0.45, 0.8, g);
ppBox(0.3, 0.05, 2.2, wood, px + 0.75, 0.45, 0.8, g);
ppBox(0.1, 0.72, 0.1, dark, px, 0.36, 0, g);
ppBox(0.1, 0.72, 0.1, dark, px, 0.36, 1.6, g);
ppCyl(0.12, 0.1, 0.14, ppM(0xF0F0E8), px, 0.85, 0.4, g, 8);
ppCyl(0.05, 0.05, 0.2, ppM(0xE8D040, { op: 0.85 }), px + 0.2, 0.88, 1.0, g, 6);
var tw = jbgW(g, px, 0.8, ry);
ppSolid(tw[0], tw[1], 1.0, 1.15, ry, 0.8, 0);
});
ppSign(g, ["CAMP KITCHEN", "tea · porridge · pancakes · share what you've got"], 4.6, 0.8, 0, 2.55, -2.95, 0, "#2A1A0A", "#FFE8B0");
ppSph(0.18, ppGlowMat(0xFFD08A), -3, 2.6, 0, L || g, 8);
ppSph(0.18, ppGlowMat(0xFFD08A), 3, 2.6, 0, L || g, 8);
var sp = jbgW(g, 0, -1.5, ry);
ppSpot({ x: sp[0], z: sp[1], r: 1.8, name: "The camp kitchen: a cup of tea", fn: function () { if (typeof ppMenu === "function")
ppMenu("fest", "The camp kitchen"); } });
},
function (R, k) {
var f = R() < 0.55, cols = [0xE86A3A, 0x3A8A6A, 0xD8A030, 0x8A4A9A, 0x3A6AA8, 0xE8D8B0, 0xC84A6A, 0x6A8A3A];
return { sex: f ? "f" : "m", look: { top: cols[Math.floor(R() * 8)], topKind: f && R() < 0.6 ? "dress" : "shirt", bottom: f ? cols[Math.floor(R() * 8)] : [0x3A4A6A, 0x6A5A3A, 0x4A3A2A][k % 3],
skin: [0xF0C8A8, 0xC89878, 0x8A5A3A, 0xE8B898, 0x5A3A28][Math.floor(R() * 5)], hair: [0x3A2A1A, 0x8A5A2A, 0xE8C878, 0x1A1A1A, 0xA84A2A][Math.floor(R() * 5)],
hairStyle: ["long", "braids", "curly", "waves", "long", "bun"][Math.floor(R() * 6)], hat: ["flowercrown", "bandana", "none", "beanie", "brimmed", "flowercrown"][Math.floor(R() * 6)],
layer: R() < 0.4 ? "vest" : "none", layerColor: [0x8A5A2A, 0x6A3A5A, 0x3A5A4A][k % 3] } };
},
function (spots) {
var R = jbgRand("jbg-folk"), gi = 0;
spots.forEach(function (q) {
var n = PP.lite ? Math.ceil(q[3] / 2) : q[3];
for (var k = 0, t = 0; k < n && t < n * 20; t++) {
var a = R() * 6.283, d = Math.sqrt(R()) * q[2], x = q[0] + Math.cos(a) * d, z = q[1] + Math.sin(a) * d;
if (ppBlocked(x, z, 0.5) || !jbgFree(x, z, 0.5))
continue;
var P = ppGroupFor(x, z, 0);
if (P.zone !== "out" && !ppWalkAt(x, z))
continue;
try {
var o = jbgLook(R, gi), g = wPerson("jbg_" + (gi++), o);
g.position.set(x, ppGround(x, z, 0), z);
g.rotation.y = q[4] != null ? q[4] + (R() - 0.5) * 1.4 : R() * 6.28;
P.g.add(g);
PP.people.push({ g: g, zone: P.zone, x: x, z: z, wander: q[5] ? { r: q[5] } : null });
}
catch (e) { }
k++;
}
});
},
function () {
if (JBG.done || !PP.out)
return;
JBG.done = true;
var lite = PP.lite, R = jbgRand("jbg-field"), D = new THREE.Group();
D.name = "jbg-field";
PP.out.add(D);
var L = PP.outLive || D;
var T = JBG.tents.slice();
if (!T.length)
return;
var x0 = Math.min.apply(null, T.map(function (t) { return t.x; })) - 8, x1 = Math.max.apply(null, T.map(function (t) { return t.x; })) + 8;
var z0 = Math.min.apply(null, T.map(function (t) { return t.z; })) - 8, z1 = Math.max.apply(null, T.map(function (t) { return t.z; })) + 8;
var rows = lite ? 2 : 4, poles = [];
for (var r = 0; r <= rows; r++) {
var z = z0 + (z1 - z0) * r / rows, row = [];
for (var c = 0; c <= 4; c++) {
var x = x0 + (x1 - x0) * c / 4 + (r % 2 ? 4 : 0);
if (!jbgFree(x, z, 0.4)) {
x += 2.5;
if (!jbgFree(x, z, 0.4))
continue;
}
jbgPole(D, x, z, 4.2);
row.push([x, z, 4.1]);
}
poles.push(row);
if (row.length > 1)
jbgFestoon(D, L, row, 0xFFC060);
}
for (var r2 = 0; r2 < poles.length - 1; r2++) {
var A = poles[r2], B = poles[r2 + 1], zig = [];
for (var i = 0; i < Math.min(A.length, B.length); i++) {
zig.push(i % 2 ? B[i] : A[i]);
}
if (zig.length > 1 && !lite)
jbgFestoon(D, L, zig, 0xFFB0D0);
}
for (var t = 0; t < T.length - 1; t++) {
var a = T[t], b = T[t + 1];
if (Math.abs(a.z - b.z) > 8 || Math.hypot(a.x - b.x, a.z - b.z) > 24)
continue;
jbgBunting(D, [a.x, a.z, 3.3], [b.x, b.z, 3.3]);
}
var pits = [[-300, 112], [-268, 130], [-290, 150], [-262, 166], [-300, 172]];
pits.forEach(function (p, i) { if (lite && i % 2)
return; for (var k = 0; k < 4; k++) {
var an = k / 4 * Math.PI * 2 + 0.8 + i, x = p[0] + Math.cos(an) * 3.4, z = p[1] + Math.sin(an) * 3.4;
if (jbgFree(x, z, 0.5))
jbgDeckChair(D, x, z, Math.atan2(p[0] - x, p[1] - z), JBG_QUILT[(k + i) % 6]);
} });
T.forEach(function (tt, i) { if (lite && i % 2)
return; var a = tt.ry, x = tt.x + Math.sin(a) * (tt.r + 2.2) + Math.cos(a) * 1.8, z = tt.z + Math.cos(a) * (tt.r + 2.2) - Math.sin(a) * 1.8; if (jbgFree(x, z, 0.5))
jbgDeckChair(D, x, z, a + Math.PI, JBG_QUILT[i % 6]); });
var hm = 0;
for (var h = 0; h < 60 && hm < (lite ? 2 : 5); h++) {
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), ry = R() * 3.14;
if (!jbgFree(x, z, 2.4))
continue;
jbgHammock(D, x, z, ry, JBG_QUILT[hm % 6]);
hm++;
}
var kx = x1 + 8, kz = (z0 + z1) / 2;
for (var s = 0; s < 8 && !jbgFree(kx, kz, 5.5); s++)
kz += 4;
if (jbgFree(kx, kz, 5.5))
jbgKitchen(D, L, kx, kz, -Math.PI / 2);
var vans = [[0x3A8AB8, 0xF4F0E8], [0xE8A030, 0xF4F0E8], [0xC84A6A, 0xF0E0B0], [0x5A9A5A, 0xF4F0E8]];
for (var v = 0, vz = z0 + 2; v < (lite ? 2 : 4) && vz < z1 + 10; vz += 8) {
var vx = x0 - 6;
if (!jbgFree(vx, vz, 3))
continue;
jbgVan(D, vx, vz, Math.PI / 2 + (R() - 0.5) * 0.2, vans[v][0], vans[v][1], R);
v++;
}
if (jbgFree(x0 - 8, z1 + 12, 5))
jbgBus(D, x0 - 8, z1 + 12, 0.15);
jbxFinish(D);
jbgPeople([[(x0 + x1) / 2, (z0 + z1) / 2, (x1 - x0) / 2, lite ? 8 : 22, null, 4], [kx, kz, 5, lite ? 2 : 5, null, 0], [x0 - 4, (z0 + z1) / 2, 10, lite ? 2 : 5, null, 2]]);
},
function (kind, seed) {
var k = kind + seed;
JBC.tex = JBC.tex || {};
if (JBC.tex[k])
return JBC.tex[k];
var R = jbgRand("tex" + k), S = PP.lite ? 128 : 256;
var t = wTex(S, S, function (x, W, H) {
if (kind === "tiedye") {
var cx = W / 2, cy = H / 2;
for (var r = W * 0.75; r > 0; r -= 2) {
for (var a = 0; a < 64; a++) {
var an = a / 64 * Math.PI * 2 + r * 0.035;
var c = JBC_BRIGHT[(Math.floor(r / 14) + Math.floor(seed)) % 7];
x.fillStyle = "#" + c.toString(16).padStart(6, "0");
x.globalAlpha = 0.35;
x.fillRect(cx + Math.cos(an) * r - 3, cy + Math.sin(an) * r - 3, 6, 6);
}
}
x.globalAlpha = 1;
}
else if (kind === "mandala") {
x.fillStyle = ["#2A1A4A", "#3A1A2A", "#1A2A4A"][seed % 3];
x.fillRect(0, 0, W, H);
var cx2 = W / 2, cy2 = H / 2;
for (var ring = 8; ring > 0; ring--) {
var rr = ring * W / 18, n = ring * 6;
x.fillStyle = "#" + JBC_BRIGHT[(ring + seed) % 7].toString(16).padStart(6, "0");
for (var p = 0; p < n; p++) {
var a2 = p / n * Math.PI * 2;
x.beginPath();
x.ellipse(cx2 + Math.cos(a2) * rr, cy2 + Math.sin(a2) * rr, W / 40 + ring, W / 90 + ring * 0.5, a2, 0, Math.PI * 2);
x.fill();
}
}
x.strokeStyle = "#F0D890";
x.lineWidth = 3;
x.strokeRect(6, 6, W - 12, H - 12);
}
else if (kind === "mural") {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#3A6AC8");
g.addColorStop(0.6, "#F0A8C8");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#F0C830";
x.beginPath();
x.arc(W * (0.25 + 0.5 * R()), H * 0.3, H * 0.16, 0, Math.PI * 2);
x.fill();
for (var b = 0; b < 7; b++) {
x.strokeStyle = "#" + JBC_BRIGHT[b].toString(16).padStart(6, "0");
x.lineWidth = H * 0.035;
x.beginPath();
x.arc(W * 0.5, H * 1.1, H * (0.75 - b * 0.04), Math.PI, 0);
x.stroke();
}
for (var h = 0; h < 3; h++) {
x.fillStyle = ["#3A8A3A", "#4AA84A", "#2A6A3A"][h];
x.beginPath();
x.moveTo(0, H);
for (var i = 0; i <= 20; i++)
x.lineTo(i / 20 * W, H * (0.7 + h * 0.08) + Math.sin(i * 0.8 + h + seed) * H * 0.05);
x.lineTo(W, H);
x.fill();
}
for (var f = 0; f < 26; f++) {
var fx = R() * W, fy = H * (0.82 + R() * 0.16);
x.fillStyle = "#" + JBC_BRIGHT[f % 7].toString(16).padStart(6, "0");
for (var q = 0; q < 5; q++) {
var aq = q / 5 * Math.PI * 2;
x.beginPath();
x.arc(fx + Math.cos(aq) * 4, fy + Math.sin(aq) * 4, 3.5, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#F0E040";
x.beginPath();
x.arc(fx, fy, 2.5, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#F8F8F8";
var dx = W * (0.2 + R() * 0.6), dy = H * 0.45;
x.beginPath();
x.ellipse(dx, dy, W * 0.06, H * 0.025, 0, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.moveTo(dx - W * 0.01, dy);
x.quadraticCurveTo(dx - W * 0.05, dy - H * 0.12, dx + W * 0.03, dy - H * 0.08);
x.fill();
}
else {
for (var s = 0; s < 8; s++) {
x.fillStyle = "#" + JBC_BRIGHT[(s + seed) % 7].toString(16).padStart(6, "0");
x.fillRect(s * W / 8, 0, W / 8 + 1, H);
}
}
});
return (JBC.tex[k] = t);
},
function (G, L, x, z) {
var g = jbcG(G, x, z, 0), wood = ppM(0x6A4A30), n = PP.lite ? 8 : 14;
ppCyl(4.2, 4.2, 0.03, ppM(0x8A7A5A), 0, 0.02, 0, g, 24);
for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.283;
ppSph(0.25, ppM(0x6A6660), Math.cos(a) * 1.1, 0.12, Math.sin(a) * 1.1, g, 6);
}
var fl = ppSph(0.5, ppGlowMat(0xFF9A3A, 0.85), x, ppGround(x, z, 0) + 0.4, z, L, 8);
fl.scale.y = 1.5;
PP.flames.push({ m: fl, ph: 0.3 });
ppSolidR(x, z, 1.4);
for (var k = 0; k < n; k++) {
var a2 = k / n * 6.283, lx = Math.cos(a2) * 4.6, lz = Math.sin(a2) * 4.6;
var lg = ppCyl(0.22, 0.22, 1.4, wood, lx, 0.22, lz, g, 8);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = -a2;
if (k % 2 === 0) {
var dx = Math.cos(a2) * 3.7, dz = Math.sin(a2) * 3.7;
ppCyl(0.22, 0.12, 0.45, ppM([0x8A5A2A, 0xA86A3A, 0x6A3A22][k % 3]), dx, 0.22, dz, g, 10);
ppCyl(0.12, 0.2, 0.25, ppM(0x7A4A2A), dx, 0.55, dz, g, 10);
ppCyl(0.22, 0.22, 0.02, ppM(0xE8D8B8), dx, 0.68, dz, g, 10);
}
var w = jbgW(g, lx, lz, 0);
ppSolidR(w[0], w[1], 0.35);
}
ppSpot({ x: x + 5.6, z: z, r: 2.2, name: "The drum circle: sit in and play", fn: function () {
worldCard(ppHead("The drum circle", "Anyone can sit in. The rhythm goes round the fire and comes back to you.") +
worldBtn("play", "🥁 Play along", "Doum, tek, tek, doum…"), { play: function () { if (typeof togEmote === "function")
try {
togEmote("dance");
}
catch (e) { } setStatus("🥁 You find the beat: doum, tek-tek, doum. The circle grins and goes round again."); } });
} });
PP.music.push({ k: "jbc-drums", zone: "out", x: x, z: z, r: 26, C: { bpm: 100, band: true } });
return [x, z, 7];
},
function (G, L, x, z, ry) {
var g = jbcG(G, x, z, ry), r = 9, gap = 0.55;
var ico = new THREE.IcosahedronGeometry(r, PP.lite ? 1 : 2), P = ico.attributes.position, seen = {}, pos = [];
for (var i = 0; i < P.count; i += 3) {
for (var e = 0; e < 3; e++) {
var a = i + e, b = i + (e + 1) % 3, ay = P.getY(a), by = P.getY(b);
if (ay < -0.2 && by < -0.2)
continue;
var k1 = [P.getX(a).toFixed(2), ay.toFixed(2), P.getZ(a).toFixed(2)].join(), k2 = [P.getX(b).toFixed(2), by.toFixed(2), P.getZ(b).toFixed(2)].join(), kk = k1 < k2 ? k1 + k2 : k2 + k1;
if (seen[kk])
continue;
seen[kk] = 1;
pos.push(P.getX(a), Math.max(0, ay), P.getZ(a), P.getX(b), Math.max(0, by), P.getZ(b));
}
}
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xE8E0D0 })));
var skin = new THREE.Mesh(new THREE.SphereGeometry(r * 0.99, PP.lite ? 16 : 28, PP.lite ? 8 : 12, Math.PI / 2 + gap / 2, Math.PI * 2 - gap, 0, Math.PI / 2), ppM(0xF4ECE0, { ds: 1, op: 0.82 }));
g.add(skin);
ppCyl(r * 0.95, r * 0.95, 0.08, ppM(0xB8925A), 0, 0.04, 0, g, PP.lite ? 16 : 28);
var cols = [0x6A3A8A, 0x3A8A7A, 0xD86A3A, 0x3A5AA8, 0xC84A6A, 0x8AA83A];
for (var row = 0; row < 3; row++)
for (var c = -2; c <= 2; c++) {
if (PP.lite && (c + row) % 2)
continue;
var mx = c * 2.4, mz = -1 + row * 2.6;
if (Math.hypot(mx, mz) > r - 2.2)
continue;
ppBox(0.65, 0.02, 1.8, ppM(cols[(c + row + 6) % 6]), mx, 0.1, mz, g);
ppBox(0.22, 0.12, 0.15, ppM(0xD8C8A8), mx + 0.25, 0.16, mz - 0.75, g);
}
ppBox(0.8, 0.02, 2.0, ppM(0x9A4AD8), 0, 0.1, -r + 2.4, g);
ppCyl(0.22, 0.14, 0.14, ppM(0xC8A050), 0.7, 0.17, -r + 2.0, g, 12);
[[-r + 1.6, -2], [r - 1.6, -2], [-r + 2.2, 3], [r - 2.2, 3]].forEach(function (p) { jbdPot(g, p[0], p[1], 0.08, 1.2); var w = jbgW(g, p[0], p[1], ry); ppSolidR(w[0], w[1], 0.45); });
var tp = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.4), jbcTexMat("mandala", 3, true));
tp.position.set(0, 2.6, -r + 1.4);
g.add(tp);
ppSph(0.2, ppGlowMat(0xFFD08A), -3, 3.4, -2, L || g, 8);
ppSph(0.2, ppGlowMat(0xFFD08A), 3, 3.4, -2, L || g, 8);
jbgRingSolid(g.position.x, g.position.z, ry, r - 0.2, gap);
var sp = jbgW(g, 0, 0, ry);
ppSpot({ x: sp[0], z: sp[1], r: 3, name: "The yoga dome: a class, or sit and breathe", fn: function () {
worldCard(ppHead("The yoga and meditation dome", "Classes at sunrise and sundown. Between them, the mats are yours.") +
worldBtn("y", "🧘 Join a slow flow", "Twenty minutes of stretches: you come out loose and light") + worldBtn("m", "🔔 Sit and breathe", "The singing bowl rings; four breaths in, four out"), { y: function () { setStatus("🧘 Downward dog, warrior, tree… the teacher's voice is slow and kind. You roll up your mat feeling loose and light."); }, m: function () { setStatus("🔔 The bowl hums. In for four, out for four. The festival seems a long way off."); } });
} });
var t0 = jbgW(g, 0, -r + 2.4, ry);
return { x: t0[0], z: t0[1], ry: ry };
},
function (G, L, x, z) {
var g = jbcG(G, x, z, 0), R = jbgRand("spring"), rr = 6;
var w = new THREE.Mesh(new THREE.CircleGeometry(rr, PP.lite ? 18 : 32), ppM(0x4AA8B8, { op: 0.88 }));
w.rotation.x = -Math.PI / 2;
w.position.y = 0.25;
g.add(w);
ppCyl(rr, rr, 0.2, ppM(0x2A5A6A), 0, 0.05, 0, g, PP.lite ? 18 : 32);
for (var i = 0; i < (PP.lite ? 18 : 30); i++) {
var a = i / (PP.lite ? 18 : 30) * 6.283, s = 0.5 + R() * 0.5, st = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), ppM([0x7A7268, 0x8A8070, 0x6A6258][i % 3]));
st.scale.y = 0.6;
st.position.set(Math.cos(a) * (rr + 0.3), s * 0.3, Math.sin(a) * (rr + 0.3));
st.rotation.y = R() * 3;
g.add(st);
}
for (var p = 0; p < (PP.lite ? 3 : 7); p++) {
var sm = ppSph(1.1 + R() * 0.6, ppGlowMat(0xF0F4F8, 0.12), x + (R() - 0.5) * rr, ppGround(x, z, 0) + 1.2 + R() * 0.8, z + (R() - 0.5) * rr, L, 8);
PP.flames.push({ m: sm, ph: R() * 6, small: 1 });
}
ppSolidR(x, z, rr + 0.2);
ppSpot({ x: x + rr + 1.4, z: z, r: 2, name: "The hot spring: a long soak", fn: function () { setStatus("♨️ You slide into the warm water up to your chin. Somebody passes round a jug of cold mint tea."); if (typeof needsGot === "function") { } } });
var sx = x + rr + 8, sz = z + 2, s = jbcG(G, sx, sz, -Math.PI / 2), cedar = ppM(0xA8683A), dark = ppM(0x6A3E22);
ppBox(4.2, 2.6, 0.15, cedar, 0, 1.3, -1.6, s);
ppBox(0.15, 2.6, 3.3, cedar, -2.05, 1.3, 0, s);
ppBox(0.15, 2.6, 3.3, cedar, 2.05, 1.3, 0, s);
ppBox(1.4, 2.6, 0.15, cedar, -1.4, 1.3, 1.6, s);
ppBox(1.4, 2.6, 0.15, cedar, 1.4, 1.3, 1.6, s);
ppBox(1.3, 0.5, 0.15, cedar, 0, 2.35, 1.6, s);
var rf = ppBox(4.8, 0.15, 4.0, dark, 0, 2.85, 0, s);
ppBox(3.6, 0.08, 0.9, cedar, 0, 0.45, -1.0, s);
ppBox(3.6, 0.08, 0.7, cedar, 0, 0.95, -1.25, s);
ppBox(0.6, 0.7, 0.6, ppM(0x2A2A2A), 1.5, 0.35, 0.9, s);
for (var q = 0; q < 6; q++)
ppSph(0.1, ppM(0x5A5A5A), 1.35 + (q % 3) * 0.15, 0.75, 0.75 + Math.floor(q / 3) * 0.2, s, 5);
ppSign(s, ["CEDAR SAUNA", "towels on the hook · water on the stones"], 2.8, 0.5, 0, 3.15, 1.72, 0, "#2A160A", "#FFE0B0");
[[0, -1.6, 2.1, 0.1], [-2.05, 0, 0.1, 1.65], [2.05, 0, 0.1, 1.65], [-1.4, 1.6, 0.7, 0.1], [1.4, 1.6, 0.7, 0.1]].forEach(function (q) { var w2 = jbgW(s, q[0], q[1], -Math.PI / 2); ppSolid(w2[0], w2[1], q[2], q[3], -Math.PI / 2, 3, 0); });
var b1 = jbgW(s, 0, -1.0, -Math.PI / 2);
ppSolid(b1[0], b1[1], 1.8, 0.5, -Math.PI / 2, 0.5, 0);
var st2 = jbgW(s, 1.5, 0.9, -Math.PI / 2);
ppSolidR(st2[0], st2[1], 0.4);
var sp = jbgW(s, -0.5, 0.4, -Math.PI / 2);
ppSpot({ x: sp[0], z: sp[1], r: 1.3, name: "The sauna: sit in the heat", fn: function () { setStatus("🧖 A ladle of water on the stones: a soft wave of heat. You sit until you glow, then step out into the cool night."); } });
return [x, z, rr + 12];
},
function (G, L, x, z, ry, T, i) {
var g = jbcG(G, x, z, ry);
ppBox(2.3, 2.4, 5.2, ppM(T[2]), 0, 1.6, 0, g);
ppBox(2.32, 0.4, 5.22, ppM(0xF4F0E8), 0, 2.95, 0, g);
ppBox(2.1, 1.2, 1.6, ppM(T[2]), 0, 1.0, 3.3, g);
ppBox(2.0, 0.6, 0.05, ppM(0x2A3A48), 0, 1.4, 4.1, g);
ppBox(0.05, 1.0, 3.0, ppM(0x2A1A10), 1.16, 1.85, 0, g);
ppBox(0.6, 0.06, 3.2, ppM(0xD8C8A8), 1.45, 1.3, 0, g);
var aw = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3.4), jbcTexMat("stripes", i, true));
aw.position.set(1.85, 2.75, 0);
aw.rotation.set(0, Math.PI / 2, 0);
aw.rotateX(-1.2);
g.add(aw);
[[-1, 1.9], [1, 1.9], [-1, -1.9], [1, -1.9], [-0.95, 3.3], [0.95, 3.3]].forEach(function (p, k) { if (k > 3)
return; var wh = ppCyl(0.42, 0.42, 0.24, ppM(0x1A1A1A), p[0] * 1.1, 0.42, p[1], g, 12); wh.rotation.z = Math.PI / 2; });
for (var f = 0; f < 5; f++) {
var fc = JBC_BRIGHT[(f + i) % 7];
ppCyl(0.22, 0.22, 0.02, ppM(fc), -1.16, 1.2 + (f % 2) * 0.6, -2 + f * 0.9, g, 8).rotation.z = Math.PI / 2;
}
ppSign(g, [T[0], T[1]], 2.8, 0.7, 1.17, 3.3, 0, Math.PI / 2, "#1A1208", "#FFE8B0");
ppBox(0.05, 0.9, 0.7, ppM(0x1A1A1A), 2.4, 0.55, 1.8, g);
ppSolid(g.position.x, g.position.z, 1.25, 3.6, ry, 3.3, 0);
var bw = jbgW(g, 2.4, 1.8, ry);
ppSolidR(bw[0], bw[1], 0.3);
var sp = jbgW(g, 2.3, 0, ry);
ppSpot({ x: sp[0], z: sp[1], r: 1.6, name: T[0] + ": " + T[1], fn: function () { ppMenu("truck", T[0]); } });
PP.staffAt.push({ title: "Truck cook", place: PP_KEYS.fest, x: jbgW(g, 0.6, 0, ry)[0], z: jbgW(g, 0.6, 0, ry)[1], ry: ry + Math.PI / 2, seed: "jbct" + i });
return [g.position.x, g.position.z, 4];
},
function (G, L, x, z, ry, S, i) {
var g = jbcG(G, x, z, ry), wood = ppM(0x8A6A48);
[[-1.6, -1.2], [1.6, -1.2], [-1.6, 1.2], [1.6, 1.2]].forEach(function (p) { ppCyl(0.05, 0.05, 2.6, wood, p[0], 1.3, p[1], g, 5); });
var top = new THREE.Mesh(new THREE.ConeGeometry(2.6, 0.9, 4, 1, true), jbcTexMat(S[2] === "tiedye" ? "tiedye" : "stripes", i, true));
top.position.y = 3.0;
top.rotation.y = Math.PI / 4;
top.scale.set(1.0, 1, 0.8);
g.add(top);
ppBox(3.2, 0.9, 0.8, wood, 0, 0.45, 1.0, g);
ppBox(3.3, 0.04, 0.9, ppM(0x6A3A5A), 0, 0.92, 1.0, g);
if (S[2] === "tiedye" || S[2] === "mandala") {
for (var h = 0; h < 3; h++) {
var cl = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.3), jbcTexMat(S[2], h + i, true));
cl.position.set(-1 + h, 1.75, -1.2);
g.add(cl);
}
ppBox(3.2, 0.04, 0.04, wood, 0, 2.45, -1.2, g);
}
if (S[2] === "beads")
for (var b = 0; b < 24; b++)
ppSph(0.05, ppM(JBC_BRIGHT[b % 7]), -1.2 + (b % 12) * 0.22, 1.0, 0.8 + Math.floor(b / 12) * 0.25, g, 5);
if (S[2] === "crystal")
for (var c = 0; c < 9; c++) {
var cr = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 5), ppM([0xB898E8, 0xE8E0F8, 0xD8A8E0][c % 3], { e: 0x221133 }));
cr.position.set(-1.2 + c * 0.3, 1.12, 1.0);
g.add(cr);
}
if (S[2] === "macrame")
for (var m = 0; m < 4; m++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.02, 5, 16), ppM(0xE8DCC0));
ring.position.set(-1.2 + m * 0.8, 2.0, -1.2);
g.add(ring);
ppBox(0.04, 0.6, 0.02, ppM(0xE8DCC0), -1.2 + m * 0.8, 1.5, -1.2, g);
}
if (S[2] === "flowers")
for (var f = 0; f < 10; f++) {
var fl = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.04, 5, 10), ppM(JBC_BRIGHT[f % 7]));
fl.rotation.x = Math.PI / 2;
fl.position.set(-1.3 + f * 0.28, 0.97, 1.0);
g.add(fl);
}
ppSign(g, [S[0], S[1]], 2.6, 0.55, 0, 2.45, 1.45, 0, "#2A1438", "#FFE8B0");
ppSolid(g.position.x + Math.sin(ry) * 1.0, g.position.z + Math.cos(ry) * 1.0, 1.65, 0.45, ry, 1, 0);
var sp = jbgW(g, 0, 2.2, ry);
ppSpot({ x: sp[0], z: sp[1], r: 1.6, name: S[0] + ": " + S[1], fn: function () { ppShopCard("swag"); } });
PP.staffAt.push({ title: "Stallholder", place: PP_KEYS.fest, x: jbgW(g, 0, -0.2, ry)[0], z: jbgW(g, 0, -0.2, ry)[1], ry: ry, seed: "jbcs" + i });
return [g.position.x, g.position.z, 3.4];
},
function (G, x, z, ry, seed) {
var g = jbcG(G, x, z, ry), w = 10;
ppBox(w + 0.4, 4.4, 0.4, ppM(0xD8C8B0), 0, 2.2, 0, g);
[-1, 1].forEach(function (s) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, 4), jbcTexMat("mural", seed + (s > 0 ? 0 : 7))); m.position.set(0, 2.2, s * 0.21); if (s < 0)
m.rotation.y = Math.PI; g.add(m); });
ppSolid(g.position.x, g.position.z, w / 2 + 0.2, 0.3, ry, 4.4, 0);
return [g.position.x, g.position.z, w / 2 + 1];
},
function (G, spots) {
var lite = PP.lite, R = jbgRand("beds"), heads = [], stems = [], M = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(1, 1, 1), v = new THREE.Vector3();
spots.forEach(function (s) {
var n = lite ? Math.ceil(s[3] / 2) : s[3];
var bed = ppCyl(s[2], s[2] + 0.2, 0.25, ppM(0x4A3424), s[0], ppGround(s[0], s[1], 0) + 0.12, s[1], G, 16);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = Math.sqrt(R()) * (s[2] - 0.2), x = s[0] + Math.cos(a) * d, z = s[1] + Math.sin(a) * d, h = 0.3 + R() * 0.4;
stems.push([x, z, h]);
heads.push([x, ppGround(x, z, 0) + 0.25 + h, z, JBC_BRIGHT[Math.floor(R() * 7)]]);
}
ppSolidR(s[0], s[1], s[2]);
});
(JBC.sun || []).forEach(function (r) {
for (var k = 0; k < (lite ? 6 : 14); k++) {
var t = k / ((lite ? 6 : 14) - 1), x = r[0] + (r[2] - r[0]) * t, z = r[1] + (r[3] - r[1]) * t;
if (worldSolidAt(PP.solids, x, z, 0))
continue;
var h = 1.8 + R() * 0.8;
stems.push([x, z, h, 1]);
heads.push([x, ppGround(x, z, 0) + h, z, 0xF0C020, 1]);
}
});
var sg = new THREE.CylinderGeometry(0.02, 0.03, 1, 4), sm = new THREE.InstancedMesh(sg, ppM(0x3A7A2A), stems.length);
stems.forEach(function (s, i) { var y = ppGround(s[0], s[1], 0); sc.set(s[3] ? 3 : 1, s[2], s[3] ? 3 : 1); v.set(s[0], y + 0.25 + s[2] / 2, s[1]); M.compose(v, q, sc); sm.setMatrixAt(i, M); });
sm.userData.keep = 1;
G.add(sm);
var hg = new THREE.SphereGeometry(0.09, 6, 4), hm = new THREE.InstancedMesh(hg, new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), heads.length), c = new THREE.Color();
heads.forEach(function (h, i) { var s2 = h[4] ? 3.2 : 1; sc.set(s2, h[4] ? 0.5 : 1, s2); v.set(h[0], h[1], h[2]); M.compose(v, q, sc); hm.setMatrixAt(i, M); c.setHex(h[3]); hm.setColorAt(i, c); });
if (hm.instanceColor)
hm.instanceColor.needsUpdate = true;
hm.userData.keep = 1;
G.add(hm);
},
function (G, L, x, z) {
var g = jbcG(G, x, z, 0), wood = ppM(0x8A6040);
ppBox(12, 1.0, 7, wood, 0, 0.5, 0, g);
ppBox(12.2, 0.08, 7.2, ppM(0x6A4630), 0, 1.02, 0, g);
[[-5.8, -3.3], [5.8, -3.3], [-5.8, 3.3], [5.8, 3.3]].forEach(function (p) { ppCyl(0.15, 0.18, 5.2, wood, p[0], 2.6, p[1], g, 8); });
var sail = new THREE.Mesh(new THREE.PlaneGeometry(13, 8), jbcTexMat("tiedye", 5, true));
sail.rotation.x = -Math.PI / 2 + 0.12;
sail.position.y = 5.3;
g.add(sail);
var back = new THREE.Mesh(new THREE.PlaneGeometry(11, 4), jbcTexMat("mandala", 1, true));
back.position.set(0, 3.1, -3.3);
g.add(back);
ppSign(g, ["THE MEADOW STAGE", "folk · bluegrass · songs round the fire"], 6, 0.9, 0, 4.6, 3.5, 0, "#2A1A0A", "#FFE8B0");
for (var k = 0; k < 4; k++)
ppBox(0.6, 1.0, 0.5, ppM(0x1A1A1A), -5 + k * (k < 2 ? 1 : 0) + (k > 1 ? 9 : 0), 1.5, 2.8, g);
for (var b = 0; b < (PP.lite ? 3 : 8); b++) {
var bx = -4 + b * 1.15;
ppSph(0.14, ppGlowMat(0xFFC060), x + bx, ppGround(x, z, 0) + 4.9, z + 3.2, L, 6);
}
ppSolid(x, z, 6.1, 3.6, 0, 1.1, 0);
PP.walk.push({ x0: x - 6, x1: x + 6, z0: z - 3.5, z1: z + 3.5, y: 1.06 });
PP.bands = PP.bands || [];
PP.bands.push({ x: x, y: 1.06, z: z - 0.6, face: 0, seed: "meadow" });
PP.music.push({ k: "jbc-meadow", zone: "out", x: x, z: z + 8, r: 45, C: { bpm: 88, band: true } });
PP.floors.push({ zone: "out", x0: x - 8, x1: x + 8, z0: z + 5, z1: z + 18, y: 0, n: 0, name: "the grass before the Meadow Stage" });
PP.crowds.push({ x0: x - 7, x1: x + 7, z0: z + 6, z1: z + 16, n: PP.lite ? 5 : 14, y: 0, face: Math.PI, seed: "meadow", sway: 1 });
ppSpot({ x: x, z: z + 5, r: 2.5, name: "The Meadow Stage: who is singing", fn: function () { worldCard(ppHead("The Meadow Stage", "Tonight: the Wildflower Family Band, fiddle, banjo, guitar and four voices, playing until the stars go pale.")); } });
return [x, z, 10];
},
function (G, L) {
var lite = PP.lite, R = jbgRand("filler"), n = lite ? 30 : 70, got = 0;
for (var t = 0; got < n && t < n * 30; t++) {
var x = -272 + R() * 165, z = 200 + R() * 125, k = R();
if (!jbcFree(x, z, k < 0.4 ? 1.8 : 2.4))
continue;
var ry = R() * 6.28, g = jbcG(G, x, z, ry);
got++;
if (k < 0.4) {
var rug = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7), jbcTexMat(R() < 0.5 ? "stripes" : "tiedye", got % 7, false));
rug.rotation.x = -Math.PI / 2;
rug.position.y = 0.03;
g.add(rug);
ppBox(0.5, 0.3, 0.35, ppM(0xA8844A), 0.7, 0.15, -0.4, g);
ppCyl(0.09, 0.11, 0.25, ppM(0xE8E0D0), 0.2, 0.13, -0.5, g, 8);
ppCyl(0.28, 0.3, 0.14, ppM(JBC_BRIGHT[got % 7]), -0.6, 0.08, 0.4, g, 10);
}
else if (k < 0.62) {
var d = new THREE.Mesh(new THREE.SphereGeometry(1.3, 12, 6, 0, 6.283, 0, Math.PI / 2), ppM(JBC_BRIGHT[got % 7]));
d.scale.set(1.1, 0.85, 1.4);
g.add(d);
ppBox(0.7, 0.8, 0.02, ppM(0x2A2A2A), 0, 0.4, 1.78, g);
ppSolidR(x, z, 1.5);
}
else if (k < 0.78) {
ppBox(1.0, 0.5, 0.5, ppM(0xD8B860), 0, 0.25, 0, g);
ppBox(1.0, 0.5, 0.5, ppM(0xC8A850), 0.15, 0.25, 0.9, g).rotation.y = 0.3;
ppSolid(x, z, 0.8, 0.8, ry, 0.5, 0);
}
else if (k < 0.9) {
var a = [x - Math.cos(ry) * 3, z + Math.sin(ry) * 3], b = [x + Math.cos(ry) * 3, z - Math.sin(ry) * 3];
g.parent.remove(g);
if (!jbcFree(a[0], a[1], 0.4) || !jbcFree(b[0], b[1], 0.4))
continue;
jbgPole(G, a[0], a[1], 2.6);
jbgPole(G, b[0], b[1], 2.6);
jbgBunting(G, [a[0], a[1], 2.5], [b[0], b[1], 2.5]);
}
else {
ppCyl(0.03, 0.03, 2.2, ppM(0x8A8A90), 0, 1.1, 0, g, 5);
for (var w = 0; w < 6; w++) {
var bl = ppBox(0.5, 0.02, 0.12, ppM(JBC_BRIGHT[w]), Math.cos(w) * 0.25, 2.2, Math.sin(w) * 0.25, g);
bl.rotation.y = -w;
}
ppSph(0.15, ppGlowMat(0xFFC878, 0.9), x + 0.6, ppGround(x, z, 0) + 1.0, z, L, 8);
ppCyl(0.02, 0.02, 1.0, ppM(0x5A3A20), 0.6, 0.5, 0, g, 4);
ppSolidR(x, z, 0.3);
}
}
},
function () {
if (JBC.done || !PP.out)
return;
JBC.done = true;
var lite = PP.lite, D = new THREE.Group();
D.name = "jbc-meadow";
PP.out.add(D);
var L = PP.outLive || D, p;
ppSign(D, ["RAINBOW MEADOW", "peace · music · tea · stay a while"], 7, 1.2, -205, 3.2, 182, Math.PI, "#2A1438", "#FFE8B0");
jbgPole(D, -208.6, 182, 3.0);
jbgPole(D, -201.4, 182, 3.0);
if ((p = jbcAt(-150, 196, 8)))
jbcStage(D, L, p[0], p[1]);
if ((p = jbcAt(-200, 224, 7)))
jbcDrums(D, L, p[0], p[1]);
if ((p = jbcAt(-162, 258, 10)))
JBC.dome = jbcDome(D, L, p[0], p[1], Math.PI * 0.85);
if ((p = jbcAt(-244, 250, 14)))
jbcSpring(D, L, p[0], p[1]);
JBC_TRUCKS.forEach(function (T, i) { var q = jbcAt(-120, 234 + i * 12, 4.5); if (q)
jbcTruck(D, L, q[0], q[1], -Math.PI / 2, T, i); });
JBC_STALLS.forEach(function (S, i) { if (lite && i > 3)
return; var q = jbcAt(-224 + i * 10, 288, 3.6); if (q)
jbcStall(D, L, q[0], q[1], 0, S, i); });
[[-246, 308, 0.25, 11], [-165, 310, -0.1, 4], [-272, 272, Math.PI / 2, 2]].forEach(function (m, i) { if (lite && i === 2)
return; var q = jbcAt(m[0], m[1], 5.5); if (q)
jbcMural(D, q[0], q[1], m[2], m[3]); });
JBC.sun = [[-290, 200, -290, 268], [-120, 330, -80, 300]];
var beds = [];
[[-190, 250, 2.2, 40], [-222, 270, 1.8, 30], [-185, 276, 2.0, 34], [-135, 222, 1.6, 26], [-235, 212, 1.8, 28], [-200, 312, 2.0, 30], [-140, 288, 1.6, 24], [-262, 292, 1.6, 24], [-172, 232, 1.4, 20], [-214, 246, 1.4, 20]].forEach(function (b) { var q = jbcAt(b[0], b[1], b[2] + 0.6); if (q)
beds.push([q[0], q[1], b[2], b[3]]); });
jbcBeds(D, beds);
jbcFiller(D, L);
jbgFestoon(D, L, [[-232, 286, 4], [-196, 284, 4.4], [-160, 286, 4], [-126, 284, 4.4]].filter(function (q) { if (!jbcFree(q[0], q[1], 0.4))
return false; jbgPole(D, q[0], q[1], 4.3); return true; }), 0xFFC060);
jbxFinish(D);
},
function () {
if (!JBC.done || JBC.folk)
return;
JBC.folk = true;
var lite = PP.lite;
jbgPeople([[-210, 222, 9, lite ? 5 : 12, null, 0], [-180, 292, 26, lite ? 5 : 14, null, 3], [-104, 250, 14, lite ? 3 : 8, Math.PI / 2, 0], [-262, 236, 10, lite ? 2 : 5, null, 2], [-190, 250, 40, lite ? 6 : 20, null, 5], [-150, 215, 12, lite ? 3 : 8, null, 2]]);
if (JBC.dome && !lite) {
var R = jbgRand("yoga");
for (var k = 0; k < 5; k++) {
var c = JBC.dome, a = c.ry, ox = (k - 2) * 2.4, oz = 1.6;
var x = c.x + ox * Math.cos(a) + oz * Math.sin(a), z = c.z - ox * Math.sin(a) + oz * Math.cos(a);
try {
var o = jbgLook(R, k), g = wPerson("jbc_yoga_" + k, o);
g.position.set(x, ppGround(x, z, 0) + 0.1, z);
g.rotation.y = a + Math.PI;
ppGroupFor(x, z, 0).g.add(g);
PP.people.push({ g: g, zone: "out", x: x, z: z });
}
catch (e) { }
}
}
},
function (G, L, x, z) {
var g = jbcG(G, x, z, 0), w = 22, d = 16, wood = ppM(0x8A6A48);
ppBox(w, 0.2, d, ppM(0x6A4A30), 0, 0.1, 0, g);
for (var i = 0; i < 11; i++)
ppBox(w, 0.01, 0.04, ppM(0x4A3020), 0, 0.21, -d / 2 + 0.7 + i * 1.45, g);
PP.walk.push({ x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2, y: 0.2 });
PP.floors.push({ zone: "out", x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2, y: 0.2, n: 0, name: "the Silent Disco" });
JBP_CH.forEach(function (c, k) {
var dx = -6 + k * 6;
ppBox(2.4, 1.0, 0.9, ppM(0x1A1A22), dx, 0.7, -d / 2 - 1.0, g);
ppBox(2.4, 0.06, 0.9, ppGlowMat(c[1]), dx, 1.22, -d / 2 - 1.0, g);
ppSph(0.25, ppGlowMat(c[1], 0.9), x + dx, ppGround(x, z, 0) + 3.2, z - d / 2 - 1.0, L, 8);
PP.djs.push({ x: x + dx, z: z - d / 2 - 1.7, y: 0.2, ry: 0, seed: "silent" + k, title: "Silent Disco DJ" });
});
ppBox(w, 0.2, 3.2, ppM(0x5A3A28), 0, 0.1, -d / 2 - 1.4, g);
ppSolid(x, z - d / 2 - 1.0, 9, 0.6, 0, 1.3, 0.2);
[[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]].forEach(function (p) { ppCyl(0.08, 0.1, 4.6, wood, p[0], 2.3, p[1], g, 6); ppSolidR(x + p[0], z + p[1], 0.2); });
jbgFestoon(G, L, [[x - w / 2, z - d / 2, 4.5], [x + w / 2, z + d / 2, 4.5]], 0xFFE0A0);
jbgFestoon(G, L, [[x + w / 2, z - d / 2, 4.5], [x - w / 2, z + d / 2, 4.5]], 0xFFE0A0);
var bx = w / 2 + 2.2;
ppBox(2.6, 1.1, 1.2, ppM(0x2A1A3A), bx, 0.55, d / 2 - 2, g);
ppSign(g, ["SILENT DISCO", "headphones here · 3 channels"], 2.8, 0.6, bx, 2.0, d / 2 - 1.38, 0, "#160C24", "#F0E0FF");
for (var h = 0; h < 8; h++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 5, 12, Math.PI), ppGlowMat(JBP_CH[h % 3][1]));
ring.position.set(bx - 1 + h * 0.28, 1.3, d / 2 - 2);
g.add(ring);
}
ppSolid(x + bx, z + d / 2 - 2, 1.35, 0.65, 0, 1.2, 0);
ppSpot({ x: x + bx - 2.2, z: z + d / 2 - 2, r: 1.8, name: "The Silent Disco: pick up headphones", fn: function () {
var fns = {}, h = ppHead("The Silent Disco", "Three DJs, three channels; the glow on your headphones shows which one you're dancing to.");
JBP_CH.forEach(function (c, k) { h += worldBtn("c" + k, c[0], ""); fns["c" + k] = function () { PP.req = PP.req || {}; PP.req["jbp-silent"] = [124, 112, 88][k]; setStatus("🎧 " + esc(c[0]) + ". Walk onto the floor and dance: only you and the others on your channel can hear it."); }; });
worldCard(h, fns);
} });
PP.music.push({ k: "jbp-silent", zone: "out", x: x, z: z, r: 13, C: { bpm: 124, band: false } });
PP.crowds.push({ x0: x - w / 2 + 1.5, x1: x + w / 2 - 1.5, z0: z - d / 2 + 1.5, z1: z + d / 2 - 1.5, n: PP.lite ? 8 : 22, y: 0.2, face: 0, seed: "silentdisco", sway: 1 });
JBP.silent = { x: x, z: z, w: w, d: d };
},
function () {
var S = JBP.silent;
if (!S)
return;
var k = 0;
PP.dancers.concat(PP.people).forEach(function (P) {
var g = P.g;
if (!g || !g.parent)
return;
var p = g.position;
if (Math.abs(p.x - S.x) > S.w / 2 || Math.abs(p.z - S.z) > S.d / 2)
return;
if (g.userData.jbpHP)
return;
g.userData.jbpHP = 1;
var c = JBP_CH[(k++) % 3][1], hp = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 5, 12, Math.PI), ppGlowMat(c));
hp.position.y = 1.68;
hp.rotation.y = Math.PI / 2;
g.add(hp);
[-1, 1].forEach(function (s) { var cup = ppSph(0.05, ppGlowMat(c), 0, 1.6, 0, g, 6); cup.position.x = s * 0.12; });
});
},
function (G, L, x, z) {
var R = jbgRand("glowforest"), n = PP.lite ? 10 : 20, rr = 24, bark = ppM(0x3A3040), leaf = ppM(0x2A5A48, { e: 0x0A2A22 }), leaf2 = ppM(0x3A4A6A, { e: 0x101A30 });
var g = jbcG(G, x, z, 0);
ppCyl(rr + 4, rr + 4, 0.04, ppM(0x1E3A2A), 0, 0.02, 0, g, PP.lite ? 18 : 32);
var dg = ppCyl(11, 11, 0.05, ppM(0x2A1A3A, { e: 0x120820 }), 0, 0.05, 0, g, PP.lite ? 18 : 32);
PP.floors.push({ zone: "out", x0: x - 8, x1: x + 8, z0: z - 8, z1: z + 8, y: 0, n: 0, name: "the Glow Forest" });
for (var i = 0; i < n; i++) {
var a = i / n * 6.283 + R() * 0.2, d = rr + R() * 4, tx = Math.cos(a) * d, tz = Math.sin(a) * d, h = 7 + R() * 5;
if (!jbpFree(x + tx, z + tz, 1.0))
continue;
ppCyl(0.35, 0.55, h, bark, tx, h / 2, tz, g, 8);
for (var cl = 0; cl < (PP.lite ? 2 : 4); cl++) {
var cn = ppSph(1.8 + R() * 1.4, cl % 2 ? leaf2 : leaf, tx + (R() - 0.5) * 2.6, h - 0.4 + cl * 0.9, tz + (R() - 0.5) * 2.6, g, 8);
cn.scale.y = 0.75;
}
var col = R();
for (var v = 0; v < (PP.lite ? 2 : 4); v++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.04, 4, 14), ppGlowMat(0xFFFFFF));
ring.position.set(x + tx, ppGround(x, z, 0) + 1.2 + v * 1.5, z + tz);
ring.rotation.x = Math.PI / 2 + 0.3;
L.add(ring);
jbpCycle(ring, (col + v * 0.06) % 1, 0.012);
}
ppSolidR(x + tx, z + tz, 0.7);
}
for (var t = 0; t < (PP.lite ? 5 : 10); t++) {
var a2 = R() * 6.283, d2 = 12 + R() * 9, mx = Math.cos(a2) * d2, mz = Math.sin(a2) * d2;
if (!jbpFree(x + mx, z + mz, 1.4))
continue;
var s = 0.8 + R() * 1.2;
ppCyl(0.18 * s, 0.25 * s, 1.6 * s, ppM(0xE8E0D0), mx, 0.8 * s, mz, g, 8);
var cap = new THREE.Mesh(new THREE.SphereGeometry(1.0 * s, 12, 6, 0, 6.283, 0, 1.3), ppGlowMat(0xFFFFFF, 0.9));
cap.scale.y = 0.55;
cap.position.set(x + mx, ppGround(x, z, 0) + 1.6 * s, z + mz);
L.add(cap);
jbpCycle(cap, R(), 0.01);
ppSolidR(x + mx, z + mz, 0.9 * s);
}
var bz = -14;
ppCyl(2.6, 3.4, 1.4, bark, 0, 0.7, bz, g, 10);
ppBox(3, 0.9, 1.0, ppM(0x1A1A22), 0, 1.85, bz + 0.6, g);
var deck = ppBox(3, 0.05, 1.0, ppGlowMat(0xFFFFFF), 0, 2.32, bz + 0.6, g);
ppCyl(0.6, 0.9, 9, bark, 0, 4.5, bz - 1.6, g, 8);
var bc = ppSph(4, leaf, 0, 9.5, bz - 1.6, g, 10);
bc.scale.y = 0.6;
ppSolidR(x, z + bz, 3.2);
ppSolidR(x, z + bz - 1.6, 1.0);
PP.walk.push({ x0: x - 2.2, x1: x + 2.2, z0: z + bz - 1.6, z1: z + bz + 0.2, y: 1.4 });
PP.djs.push({ x: x, z: z + bz - 0.6, y: 1.4, ry: 0, seed: "glowforest", title: "Glow Forest DJ" });
for (var h = 0; h < (PP.lite ? 6 : 14); h++) {
var a3 = R() * 6.283, d3 = 5 + R() * 14, lx = x + Math.cos(a3) * d3, lz = z + Math.sin(a3) * d3;
var lan = ppSph(0.28, ppGlowMat(0xFFFFFF, 0.85), lx, ppGround(lx, lz, 0) + 5 + R() * 2.5, lz, L, 8);
jbpCycle(lan, R(), 0.008);
}
ppSign(g, ["THE GLOW FOREST", "dance under the trees"], 5, 0.9, 0, 2.6, rr + 5, Math.PI, "#0A1A14", "#A8FFD8");
PP.music.push({ k: "jbp-forest", zone: "out", x: x, z: z, r: 34, C: { bpm: 122, band: false } });
PP.crowds.push({ x0: x - 8, x1: x + 8, z0: z - 7, z1: z + 8, n: PP.lite ? 8 : 24, y: 0.05, face: Math.PI, seed: "glowforest", sway: 1 });
ppSpot({ x: x, z: z + rr + 3, r: 2.5, name: "The Glow Forest: who is playing", fn: function () { worldCard(ppHead("The Glow Forest", "A rave clearing under the trees. The colours drift round the wheel all night; nothing flashes.")); } });
return [x, z, rr + 5];
},
function (G, L, x, z) {
var g = jbcG(G, x, z, 0), R = jbgRand("firecircle"), rr = 9;
ppCyl(rr, rr, 0.04, ppM(0xC8A878), 0, 0.02, 0, g, PP.lite ? 18 : 32);
for (var t = 0; t < (PP.lite ? 6 : 12); t++) {
var a = t / (PP.lite ? 6 : 12) * 6.283, tx = Math.cos(a) * (rr + 0.4), tz = Math.sin(a) * (rr + 0.4);
ppCyl(0.05, 0.07, 1.8, ppM(0x5A3A20), tx, 0.9, tz, g, 5);
var fl = ppSph(0.22, ppGlowMat(0xFFA040, 0.9), x + tx, ppGround(x, z, 0) + 2.0, z + tz, L, 8);
fl.scale.y = 1.6;
PP.flames.push({ m: fl, ph: t, small: 1 });
ppSolidR(x + tx, z + tz, 0.2);
}
for (var k = 0; k < (PP.lite ? 6 : 12); k++) {
var a2 = k / (PP.lite ? 6 : 12) * 6.283 + 0.26, lx = Math.cos(a2) * (rr + 3), lz = Math.sin(a2) * (rr + 3);
var lg = ppCyl(0.25, 0.25, 1.8, ppM(0x6A4A30), lx, 0.25, lz, g, 8);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = -a2 + Math.PI / 2;
ppSolidR(x + lx, z + lz, 0.5);
}
var nd = PP.lite ? 2 : 4;
for (var d = 0; d < nd; d++) {
var a3 = d / nd * 6.283, px = x + Math.cos(a3) * 4, pz = z + Math.sin(a3) * 4;
var hold = new THREE.Group();
hold.position.set(px, ppGround(px, pz, 0) + 1.3, pz);
hold.rotation.y = -a3;
L.add(hold);
var spin = new THREE.Group();
hold.add(spin);
[-1, 1].forEach(function (s) {
var arm = new THREE.Group();
arm.position.x = s * 0.35;
spin.add(arm);
var ball = ppSph(0.13, ppGlowMat(0xFFB050, 0.95), 0, 0.75, 0, arm, 8);
var trail = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.06, 4, 18, 1.6), ppGlowMat(0xFF7A2A, 0.45));
trail.rotation.y = Math.PI / 2;
trail.rotation.z = 1.2;
arm.add(trail);
});
JBP.poi.push({ g: spin, ph: d * 1.3, sp: 2.4 + d * 0.3 });
JBP.fireDancers = (JBP.fireDancers || []).concat([[px, pz, -a3]]);
}
ppSign(g, ["THE FIRE CIRCLE", "fire dancers from dusk · stay behind the logs"], 5, 0.8, 0, 2.6, -(rr + 5), 0, "#2A0E06", "#FFD0A0");
PP.music.push({ k: "jbp-fire", zone: "out", x: x, z: z, r: 22, C: { bpm: 96, band: true } });
ppSpot({ x: x, z: z + rr + 4, r: 2.5, name: "The Fire Circle: watch the fire show", fn: function () { setStatus("🔥 The dancers swing their poi into slow wheels of flame. Sparks drift up into the dark and the crowd on the logs goes quiet."); } });
return [x, z, rr + 4];
},
function (G, L, x, z, ry) {
var g = jbcG(G, x, z, ry), w = 16, d = 11, wood = ppM(0x5A3A22);
[[-w / 2, -d / 2], [0, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [0, d / 2], [w / 2, d / 2]].forEach(function (p) { ppCyl(0.1, 0.12, 3.6, wood, p[0], 1.8, p[1], g, 6); var q = jbgW(g, p[0], p[1], ry); ppSolidR(q[0], q[1], 0.2); });
var roof = new THREE.Mesh(new THREE.PlaneGeometry(w + 1.5, d + 1.5, 8, 1), jbcTexMat("stripes", 2, true));
roof.rotation.x = -Math.PI / 2;
roof.position.y = 3.6;
var P = roof.geometry.attributes.position;
for (var i = 0; i < P.count; i++)
P.setZ(i, Math.sin(P.getX(i) / (w + 1.5) * Math.PI * 4) * 0.25);
roof.geometry.computeVertexNormals();
g.add(roof);
var cols = [0x8A2A2A, 0x2A3A6A, 0x6A2A5A, 0xA86A2A];
for (var c = 0; c < 4; c++) {
var cx = -w / 2 + 2.4 + c * 3.8;
ppBox(3.4, 0.02, 6, ppM(cols[c]), cx, 0.02, 0, g);
ppBox(3.0, 0.025, 5.4, ppM(0xD8B870), cx, 0.025, 0, g);
ppBox(1.0, 0.35, 1.0, wood, cx, 0.18, 0, g);
ppCyl(0.12, 0.1, 0.18, ppM(0xC8A050), cx, 0.45, 0, g, 8);
var tw = jbgW(g, cx, 0, ry);
ppSolid(tw[0], tw[1], 0.5, 0.5, ry, 0.4, 0);
for (var s = 0; s < 4; s++) {
var sx = cx + (s % 2 ? 0.9 : -0.9), sz = s < 2 ? -1.2 : 1.2;
ppBox(0.8, 0.22, 0.8, ppM(cols[(c + s + 1) % 4]), sx, 0.12, sz, g);
}
}
var hang = new THREE.Mesh(new THREE.PlaneGeometry(w - 1, 3), jbcTexMat("mandala", 4, true));
hang.position.set(0, 1.9, -d / 2 + 0.05);
g.add(hang);
for (var l = 0; l < (PP.lite ? 3 : 6); l++) {
var lw = jbgW(g, -w / 2 + 1.5 + l * (w - 3) / 5, 0, ry);
ppSph(0.22, ppGlowMat([0xFFB060, 0xFF8AC8, 0x8AE0FF][l % 3], 0.9), lw[0], ppGround(x, z, 0) + 2.9, lw[1], L, 8);
}
ppBox(3, 1.0, 0.8, wood, w / 2 - 2.2, 0.5, -d / 2 + 1.0, g);
ppCyl(0.25, 0.25, 0.5, ppM(0xB87A3A), w / 2 - 2.6, 1.25, -d / 2 + 1.0, g, 10);
var tc = jbgW(g, w / 2 - 2.2, -d / 2 + 1.0, ry);
ppSolid(tc[0], tc[1], 1.5, 0.4, ry, 1, 0);
ppSign(g, ["THE CHAI LOUNGE", "chai · mint tea · cardamom cake · cushions"], 5, 0.8, 0, 3.1, d / 2 + 0.8, 0, "#2A1408", "#FFE0B0");
var sp = jbgW(g, w / 2 - 2.2, -d / 2 + 2.0, ry);
ppSpot({ x: sp[0], z: sp[1], r: 1.6, name: "The Chai Lounge: tea and cake", fn: function () { ppMenu("chai", "The Chai Lounge"); } });
PP.staffAt.push({ title: "Chai seller", place: PP_KEYS.fest, x: jbgW(g, w / 2 - 2.2, -d / 2 + 0.3, ry)[0], z: jbgW(g, w / 2 - 2.2, -d / 2 + 0.3, ry)[1], ry: ry, seed: "chai1" });
PP.music.push({ k: "jbp-chai", zone: "out", x: x, z: z, r: 14, C: { bpm: 84, band: false } });
return [x, z, 10];
},
function (G, L) {
var R = jbgRand("mainflags"), F = [];
for (var i = 0; i < (PP.lite ? 8 : 16); i++) {
var t = i / (PP.lite ? 8 : 16), x, z;
if (i % 2) {
x = -272 + t * 72;
z = 40;
}
else {
x = -272 + t * 72;
z = -40;
}
if (!jbpFree(x, z, 0.4))
continue;
var h = 6 + R() * 2;
ppCyl(0.04, 0.05, h, ppM(0x8A8A90), x, h / 2, z, G, 5);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 3.2), i % 3 ? jbcTexMat("stripes", i, true) : jbcTexMat("tiedye", i, true));
fl.position.set(x + 0.45, h - 1.7, z);
G.add(fl);
ppSolidR(x, z, 0.15);
}
[[-262, 46], [-262, -46]].forEach(function (p) {
if (!jbpFree(p[0], p[1], 1.2))
return;
var g = jbcG(G, p[0], p[1], 0), steel = ppM(0x5A5A62);
[[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].forEach(function (q) { ppBox(0.12, 12, 0.12, steel, q[0], 6, q[1], g); });
for (var y = 1; y < 12; y += 2.2)
ppBox(1.7, 0.08, 1.7, steel, 0, y, 0, g);
for (var k = 0; k < (PP.lite ? 2 : 4); k++) {
var lamp = ppSph(0.3, ppGlowMat(0xFFFFFF, 0.95), p[0] + (k - 1.5) * 0.6, 12.2, p[1], L, 8);
jbpCycle(lamp, k * 0.25, 0.01);
}
ppSolidR(p[0], p[1], 1.3);
});
},
function () {
if (JBP.done || !PP.out)
return;
JBP.done = true;
var D = new THREE.Group();
D.name = "jbp-zones";
PP.out.add(D);
var L = PP.outLive || D, p;
if ((p = jbpAt(175, 195, 12)))
jbpSilent(D, L, p[0], p[1]);
if ((p = jbpAt(262, 190, 28)))
jbpForest(D, L, p[0], p[1]);
if ((p = jbpAt(-250, -232, 13)))
jbpFire(D, L, p[0], p[1]);
if ((p = jbpAt(-112, -232, 9)))
jbpChai(D, L, p[0], p[1], 0);
jbpMainField(D, L);
jbxFinish(D);
},
function () {
if (!JBP.done || JBP.folk)
return;
JBP.folk = true;
var lite = PP.lite;
(JBP.fireDancers || []).forEach(function (f, i) { try {
var o = jbgLook(jbgRand("fd" + i), i), g = wPerson("jbp_fire_" + i, o);
g.position.set(f[0], ppGround(f[0], f[1], 0), f[1]);
g.rotation.y = f[2];
ppGroupFor(f[0], f[1], 0).g.add(g);
PP.people.push({ g: g, zone: "out", x: f[0], z: f[1] });
}
catch (e) { } });
var sp = [];
if (JBP.fireDancers && JBP.fireDancers.length) {
var c = JBP.fireDancers[0];
sp.push([c[0] - Math.cos(-c[2]) * 4, c[1] - Math.sin(-c[2]) * 4, 13, lite ? 4 : 12, null, 0]);
}
jbgPeople(sp);
jbpHeadphones();
}
];
});
