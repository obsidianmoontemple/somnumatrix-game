/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(285, function () {
"use strict";
return [
function (C) {
var B = { C: C, sets: {}, glow: [], glass: [], wins: [], stat: new THREE.Group(), locks: [], spots: [], anim: [] };
C.root.add(B.stat);
B.bx = function (set, w, h, d, col, x, y, z, ry) { (B.sets[set] || (B.sets[set] = [])).push([x, y + h / 2, z, w, h, d, ry || 0, col]); };
B.blk = function (set, w, h, d, col, x, y, z) { B.bx(set, w, h, d, col, x, y, z); C.solid(x, z, w / 2, d / 2, y + h); };
B.gl = function (w, h, d, col, x, y, z, ry) { B.glow.push([x, y + h / 2, z, w, h, d, ry || 0, col]); };
B.win = function (w, h, d, x, y, z) { B.wins.push([x, y + h / 2, z, w, h, d, 0, 0xFFFFFF]); };
B.glassBox = function (w, h, d, x, y, z) { B.glass.push([x, y + h / 2, z, w, h, d, 0, 0xBFE0F0]); };
B.mesh = function (geo, col, x, y, z, ry, rx, rz) { var m = new THREE.Mesh(geo, tlm(col)); m.position.set(x, y, z); if (ry || rx || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); B.stat.add(m); return m; };
B.light = function (x, z) { C.light(x, z); B.gl(1.2, 0.05, 0.6, 0xF4F8FF, x, EDU_H - 0.06, z); };
B.wall = function (ax, c, a0, a1, h, col, gaps, set) {
set = set || "shell";
var T = 0.2, cuts = [a0], gs = (gaps || []).slice().sort(function (p, q) { return p[0] - q[0]; });
gs.forEach(function (g) { cuts.push(g[0] - g[1] / 2, g[0] + g[1] / 2); });
cuts.push(a1);
for (var i = 0; i < cuts.length; i += 2) {
var a = cuts[i], b = cuts[i + 1];
if (b - a < 0.05)
continue;
var m = (a + b) / 2, L = b - a;
if (ax === "x") {
B.bx(set, L, h, T, col, m, 0, c);
C.solid(m, c, L / 2, T / 2, h);
}
else {
B.bx(set, T, h, L, col, c, 0, m);
C.solid(c, m, T / 2, L / 2, h);
}
}
gs.forEach(function (g) {
var dh = 2.4;
if (h > dh) {
if (ax === "x")
B.bx(set, g[1], h - dh, T, col, g[0], dh, c);
else
B.bx(set, T, h - dh, g[1], col, c, dh, g[0]);
}
var fc = 0x8A7A66;
if (ax === "x") {
B.bx(set, 0.1, dh, 0.26, fc, g[0] - g[1] / 2, 0, c);
B.bx(set, 0.1, dh, 0.26, fc, g[0] + g[1] / 2, 0, c);
}
else {
B.bx(set, 0.26, dh, 0.1, fc, c, 0, g[0] - g[1] / 2);
B.bx(set, 0.26, dh, 0.1, fc, c, 0, g[0] + g[1] / 2);
}
if (g[2])
B.lockDoor(ax, c, g[0], g[1], g[2]);
});
};
B.lockDoor = function (ax, c, m, w, id) {
var leaf = new THREE.Group(), pivot = new THREE.Group();
var p = new THREE.Mesh(gB(w - 0.06, 2.3, 0.06), tlm(0x6A4A2E));
p.position.set((w - 0.06) / 2, 1.15, 0);
pivot.add(p);
var plate = new THREE.Mesh(gB(0.14, 0.2, 0.08), tlm(0x2A3A5A));
plate.position.set(w - 0.25, 1.3, 0.06);
pivot.add(plate);
var led = new THREE.Mesh(gB(0.04, 0.04, 0.09), new THREE.MeshBasicMaterial({ color: 0xE04A3A }));
led.position.set(w - 0.25, 1.42, 0.07);
pivot.add(led);
leaf.add(pivot);
if (ax === "x") {
leaf.position.set(m - w / 2 + 0.03, 0, c);
}
else {
leaf.position.set(c, 0, m + w / 2 - 0.03);
leaf.rotation.y = Math.PI / 2;
}
C.root.add(leaf);
var wall = { x: C.ox + (ax === "x" ? m : c), z: (ax === "x" ? c : m), rot: 0, hw: ax === "x" ? w / 2 : 0.12, hd: ax === "x" ? 0.12 : w / 2, h: 2.4, level: 0, eduLock: id };
C.walls.push(wall);
B.locks.push({ id: id, ax: ax, x: ax === "x" ? m : c, z: ax === "x" ? c : m, pivot: pivot, led: led, wall: wall, open: 0 });
};
B.finish = function () {
var mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), o = new THREE.Object3D(), col = new THREE.Color(), unit = new THREE.BoxGeometry(1, 1, 1);
var made = {};
function inst(list, m, name) {
if (!list.length)
return null;
var IM = new THREE.InstancedMesh(unit, m, list.length);
list.forEach(function (q, i) { o.position.set(q[0], q[1], q[2]); o.rotation.set(0, q[6], 0); o.scale.set(q[3], q[4], q[5]); o.updateMatrix(); IM.setMatrixAt(i, o.matrix); col.setHex(q[7]); IM.setColorAt(i, col); });
IM.instanceMatrix.needsUpdate = true;
if (IM.instanceColor)
IM.instanceColor.needsUpdate = true;
IM.frustumCulled = false;
IM.name = "school " + name;
C.root.add(IM);
return IM;
}
Object.keys(B.sets).forEach(function (k) { made[k] = inst(B.sets[k], mat, k); });
inst(B.glow, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), "lights");
B.winMat = new THREE.MeshBasicMaterial({ color: 0xCFE0F0 });
inst(B.wins, B.winMat, "windows");
inst(B.glass, new THREE.MeshLambertMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.28, depthWrite: false }), "glass");
if (B.stat.children.length > 1 && typeof festMergeVC === "function")
festMergeVC(B.stat);
return made;
};
return B;
},
function (B, s, x, z, ry, small) {
var k = small ? 0.82 : 1;
B.bx(s, 0.7, 0.04, 0.5, 0xC8A878, x, 0.70 * k, z, ry);
B.bx(s, 0.62, 0.66 * k, 0.04, EDU_C.steel, x, 0.04, z, ry);
var cz = z + 0.55 * Math.cos(ry || 0), cx = x + 0.55 * Math.sin(ry || 0);
B.bx(s, 0.42, 0.04, 0.42, 0x3A5A8A, cx, 0.44 * k, cz, ry);
B.bx(s, 0.4, 0.42, 0.04, 0x3A5A8A, cx + 0.2 * Math.sin(ry || 0), 0.46 * k, cz + 0.2 * Math.cos(ry || 0), ry);
B.bx(s, 0.36, 0.44 * k, 0.36, EDU_C.steel, cx, 0, cz, ry);
},
function (B, s, w, x, z, ry, h) {
h = h || 1.9;
var cols = [0xA83A32, 0x2E5A9A, 0x3A7A4A, 0xC8963A, 0x6A3A8A, 0xE8C04A, 0x2A2C30];
var along = Math.abs(Math.sin(ry || 0)) > 0.5;
B.bx(s, along ? 0.4 : w, h, along ? w : 0.4, EDU_C.oakD, x, 0, z);
for (var l = 0; l < 4; l++) {
var y = 0.12 + l * (h - 0.2) / 4;
for (var b = 0; b < 5; b++) {
var o = -w / 2 + 0.1 + b * (w - 0.2) / 5 + (w - 0.2) / 10, bw = (w - 0.2) / 5 - 0.04;
if (along)
B.bx(s, 0.42, 0.3, bw, cols[(b + l * 3) % 7], x, y, z + o);
else
B.bx(s, bw, 0.3, 0.42, cols[(b + l * 3) % 7], x + o, y, z);
}
}
B.C.solid(x, z, along ? 0.22 : w / 2, along ? w / 2 : 0.22, h);
},
function (B, r) {
var s = r.hall, C = B.C, x0 = r.x0, x1 = r.x1, z0 = r.z0, z1 = r.z1, cx = (x0 + x1) / 2, side = r.side;
var ow = side ? x1 : x0, inw = side ? -1 : 1, g = r.grade, el = EDU_GRADES.indexOf(g) < 6, small = EDU_GRADES.indexOf(g) < 3, sub = r.subj;
var scol = EDU_SCOL[sub] || 0x5A6A7A;
B.bx(s, 8.8, 0.02, 7.8, el ? [0x5A7AA8, 0x8A6AA8, 0x6A9A7A][EDU_GRADES.indexOf(g) % 3] : 0xD4D0C4, cx, 0.004, (z0 + z1) / 2);
B.win(0.04, 1.5, 6.2, ow + inw * 0.12, 1.0, (z0 + z1) / 2);
B.bx(s, 0.3, 0.06, 6.4, EDU_C.white, ow + inw * 0.25, 0.95, (z0 + z1) / 2);
B.light(cx - 2, (z0 + z1) / 2);
B.gl(1.2, 0.05, 0.6, 0xF4F8FF, cx + 2, EDU_H - 0.06, (z0 + z1) / 2);
if (r.kind === "wc") {
eduDressRestroom(B, r);
return;
}
B.bx(s, 4.2, 1.3, 0.06, 0xF8F8F8, cx, 0.95, z0 + 0.14);
B.bx(s, 4.4, 0.08, 0.14, EDU_C.steel, cx, 0.88, z0 + 0.18);
B.bx(s, 4.4, 0.12, 0.06, scol, cx, 2.3, z0 + 0.14);
B.bx(s, 1.6, 0.9, 0.05, EDU_C.cork, cx, 1.1, z1 - 0.14);
B.bx(s, 0.5, 0.35, 0.04, scol, cx - 0.4, 1.3, z1 - 0.18);
B.bx(s, 0.4, 0.3, 0.04, 0xF4E8C8, cx + 0.35, 1.2, z1 - 0.18);
eduClock(B, cx + 2.6, 2.6, z0 + 0.14, 0);
eduFlag(B, ow + inw * 0.3, z0 + 0.4);
var tx = ow + inw * 1.6, tz = z0 + 1.7;
B.blk(s, 1.5, 0.76, 0.75, EDU_C.oak, tx, 0, tz);
B.bx(s, 0.4, 0.1, 0.3, EDU_C.dark, tx - 0.3, 0.76, tz);
B.bx(s, 0.3, 0.05, 0.22, 0xF4F4F0, tx + 0.35, 0.76, tz);
eduChair(B, s, tx, tz - 0.7, Math.PI, 0x2A2C30);
eduBin(B, s, tx + inw * 1.0, tz);
B.spots.push({ room: r.id, x: tx - inw * 0.2, z: tz - 1.05, ry: 0, teacher: 1 });
var desks = [];
if (sub === "sci" && !el) {
[[-2.1, z0 + 3.7], [2.1, z0 + 3.7], [-2.1, z0 + 6.0], [2.1, z0 + 6.0]].forEach(function (q) {
var x = cx + q[0];
eduTable(B, s, 2.4, 1.0, x, q[1], 0x5A5048, 0x1E2024);
B.mesh(gC(0.04, 0.04, 0.35, 6), 0x9AA0A8, x, 0.94, q[1] - 0.3);
[-0.7, 0, 0.7].forEach(function (o) { B.bx(s, 0.34, 0.62, 0.34, EDU_C.steel, x + o, 0, q[1] + 0.8); desks.push([x + o, q[1] + 0.8, 0.62]); });
});
B.blk(s, 1.3, 2.2, 0.8, EDU_C.steel, ow + inw * 0.75, 0, z1 - 1.0);
B.gl(1.1, 0.9, 0.05, 0xDDEEFF, ow + inw * 0.75, 1.0, z1 - 0.58);
B.bx(s, 0.5, 0.06, 0.5, 0x3AA84A, x1 - (side ? 0.5 : 8.5), 2.2, z1 - 0.5);
B.bx(s, 0.7, 0.95, 0.5, 0x2AA84A, cx + 3.2, 0, z1 - 0.4);
B.bx(s, 1.6, 1.0, 0.03, 0xE8E0C8, cx - 2.9, 1.2, z1 - 0.14);
for (var pt = 0; pt < 18; pt++)
B.bx(s, 0.07, 0.07, 0.035, [0xE87A6A, 0x6AA8E8, 0xE8D86A, 0x7AE87A][pt % 4], cx - 3.6 + pt * 0.082, 1.6, z1 - 0.15);
B.mesh(gC(0.06, 0.08, 0.18, 8), 0xBFE0F0, cx - 2.1, 0.86, z0 + 3.7);
B.mesh(gC(0.05, 0.07, 0.16, 8), 0xE8C04A, cx + 2.1, 0.85, z0 + 6.0);
}
else if (sub === "art") {
eduTable(B, s, 3.2, 1.6, cx - 2.2, z0 + 4.4, EDU_C.steel, 0xD8D0C0);
eduTable(B, s, 3.2, 1.6, cx + 2.2, z0 + 4.4, EDU_C.steel, 0xD8D0C0);
[-3.3, -2.2, -1.1, 1.1, 2.2, 3.3].forEach(function (o) { B.bx(s, 0.34, 0.6, 0.34, EDU_C.steel, cx + o, 0, z0 + 5.6); desks.push([cx + o, z0 + 5.6, 0.6]); });
for (var e = 0; e < 3; e++) {
var ex = cx - 2.2 + e * 2.2, ez = z1 - 1.2;
B.bx(s, 0.06, 1.7, 0.06, EDU_C.oak, ex - 0.3, 0, ez);
B.bx(s, 0.06, 1.7, 0.06, EDU_C.oak, ex + 0.3, 0, ez);
B.bx(s, 0.9, 0.7, 0.04, 0xF4F0E4, ex, 0.95, ez - 0.06);
B.bx(s, 0.35, 0.3, 0.045, [0xE85A3A, 0x3A8AE8, 0xE8C04A][e], ex - 0.1, 1.1, ez - 0.08);
C.solid(ex, ez, 0.45, 0.2, 1.7);
}
B.blk(s, 2.4, 0.9, 0.6, 0x8A8A8A, ow + inw * 0.35, 0, z0 + 4.6);
B.bx(s, 1.0, 0.05, 0.4, 0xC8D0D8, ow + inw * 0.35, 0.9, z0 + 4.6);
B.blk(s, 0.9, 1.6, 0.5, EDU_C.steel, ow + inw * 0.35, 0, z1 - 0.6);
if (!el) {
B.blk(s, 0.9, 1.0, 0.9, 0x6A6A6A, cx + 3.6, 0, z0 + 2.0);
B.mesh(gC(0.38, 0.38, 0.08, 12), 0x3A3A3A, cx + 3.6, 1.05, z0 + 2.0);
}
}
else if (sub === "mus") {
for (var row = 0; row < 3; row++)
for (var k = 0; k < 5; k++) {
var a = (k - 2) * 0.32, R = 2.6 + row * 1.2, x = cx + Math.sin(a) * R, z = z0 + 1.4 + Math.cos(a) * R;
eduChair(B, s, x, z, a, scol);
desks.push([x, z, 0.5]);
if (row < 2)
B.bx(s, 0.4, 0.03, 0.3, EDU_C.dark, x - Math.sin(a) * 0.55, 1.05, z - Math.cos(a) * 0.55, a);
}
B.blk(s, 1.5, 1.25, 0.6, 0x161616, ow + inw * 0.4, 0, z0 + 3.2);
B.bx(s, 1.4, 0.05, 0.2, 0xF4F4F0, ow + inw * 0.4 - inw * 0.0, 0.75, z0 + 3.2 + 0.38);
var dx2 = ow + inw * 1.4, dz2 = z1 - 1.4;
B.mesh(gC(0.3, 0.3, 0.4, 14), 0xA83A32, dx2, 0.4, dz2, 0, Math.PI / 2);
B.mesh(gC(0.18, 0.18, 0.25, 12), 0xE8E0D0, dx2 + 0.4, 0.6, dz2 - 0.3);
B.mesh(gC(0.22, 0.22, 0.02, 14), 0xC9A040, dx2 - 0.4, 1.0, dz2 - 0.3);
C.solid(dx2, dz2, 0.6, 0.5, 1);
if (el)
for (var xy = 0; xy < 2; xy++) {
var xx = cx + 3.0, xz = z1 - 1.6 - xy * 1.3;
B.bx(s, 0.9, 0.3, 0.35, EDU_C.oakD, xx, 0.45, xz);
for (var bar = 0; bar < 8; bar++)
B.bx(s, 0.08, 0.03, 0.3 - bar * 0.02, [0xE85A3A, 0xE8A03A, 0xE8D83A, 0x6AC84A, 0x3AA8E8, 0x5A6AE8, 0x9A5AE8, 0xE85AA8][bar], xx - 0.35 + bar * 0.1, 0.76, xz);
}
}
else if (sub === "pe") {
[-2.6, 0, 2.6].forEach(function (o) { B.bx(s, 2.0, 0.06, 1.2, 0x2E5AA8, cx + o, 0, z0 + 5.6); });
B.blk(s, 1.0, 0.7, 0.6, EDU_C.steel, ow + inw * 0.6, 0, z1 - 0.8);
[0, 1, 2, 3].forEach(function (b2) { B.mesh(gS(0.13), [0xE8701A, 0xF4F4F0, 0x3AA84A, 0xE8C04A][b2], ow + inw * (0.35 + (b2 % 2) * 0.4), 0.82, z1 - 0.95 + (b2 >> 1) * 0.3); });
for (var c2 = 0; c2 < 5; c2++)
for (var r2 = 0; r2 < 2; r2++) {
eduChair(B, s, cx - 2.6 + c2 * 1.3, z0 + 3.0 + r2 * 1.0, 0, scol);
desks.push([cx - 2.6 + c2 * 1.3, z0 + 3.0 + r2 * 1.0, 0.5]);
}
B.bx(s, 0.8, 1.1, 0.03, 0xF4E8C8, cx + 2.9, 1.1, z1 - 0.14);
B.bx(s, 0.5, 0.06, 0.5, 0x3AA84A, cx + 2.9, 1.5, z1 - 0.16);
}
else {
var cs = sub === "cs";
for (var row2 = 0; row2 < 3; row2++)
for (var c3 = 0; c3 < 4; c3++) {
var dx = cx - 2.7 + c3 * 1.8, dz = z0 + 3.4 + row2 * 1.5;
eduDesk(B, s, dx, dz, 0, small);
desks.push([dx, dz + 0.55, small ? 0.4 : 0.48]);
if (cs)
B.bx(s, 0.36, 0.24, 0.03, EDU_C.dark, dx, 0.75, dz - 0.12);
}
for (var c4 = 0; c4 < 4; c4++)
C.solid(cx - 2.7 + c4 * 1.8, z0 + 4.9, 0.36, 1.85, 0.8);
}
var back = z1 - 0.35;
if (sub === "ela") {
eduShelf(B, s, 2.2, cx - 2.4, back, 0);
eduShelf(B, s, 2.2, cx + 0.0, back, 0);
if (el) {
B.bx(s, 2.6, 0.03, 2.0, 0xC84A4A, ow + inw * 1.6, 0.006, z1 - 2.0);
[0, 1, 2].forEach(function (b3) { B.mesh(gS(0.32), [0xE8C04A, 0x3AA8E8, 0x8AC84A][b3], ow + inw * (1.0 + b3 * 0.6), 0.25, z1 - 1.6 - (b3 % 2) * 0.6); });
}
B.bx(s, 2.6, 0.4, 0.03, 0xF4F0E0, cx, 2.45, z1 - 0.15);
}
if (sub === "math") {
B.bx(s, 6.0, 0.18, 0.03, 0xF4F0E0, cx, 2.5, z1 - 0.15);
for (var n = 0; n < 11; n++)
B.bx(s, 0.03, 0.16, 0.035, EDU_C.dark, cx - 2.8 + n * 0.56, 2.51, z1 - 0.16);
eduShelf(B, s, 1.6, cx + 2.6, back, 0, 1.2);
[0, 1, 2, 3, 4].forEach(function (q) { B.bx(s, 0.14, 0.14, 0.14, [0xE85A3A, 0x3A8AE8, 0xE8C04A, 0x6AC84A, 0x9A5AE8][q], cx - 2.8 + q * 0.2, 0.8, back - 0.6); });
}
if (sub === "soc" || sub === "lang") {
var mx = ow + inw * 0.14;
B.bx(s, 0.03, 1.4, 2.6, 0x3A6AA8, mx, 1.1, (z0 + z1) / 2 + 1.6);
[[0.3, 0.2, 0.5, 0.5], [0.7, 0.5, 0.6, 0.4], [-0.6, 0.3, 0.6, 0.4], [-0.2, -0.4, 0.3, 0.6], [0.9, -0.3, 0.3, 0.3]].forEach(function (q) { B.bx(s, 0.035, q[3], q[2], 0x5A9A4A, mx + inw * 0.005, 1.8 + q[1] - q[3] / 2, (z0 + z1) / 2 + 1.6 + q[0]); });
eduGlobe(B, cx + 3.2, z1 - 1.2);
if (sub === "lang")
[[0xAA151B, 0xF1BF00], [0x006847, 0xCE1126], [0x74ACDF, 0xF6B40E], [0xFCD116, 0x003893], [0x0039A6, 0xD52B1E]].forEach(function (f, i) { B.bx(s, 0.6, 0.2, 0.03, f[0], cx - 2.6 + i * 0.7, 2.3, z1 - 0.15); B.bx(s, 0.6, 0.2, 0.03, f[1], cx - 2.6 + i * 0.7, 2.1, z1 - 0.15); });
}
if (sub === "sci" && el) {
eduTable(B, s, 1.8, 0.7, ow + inw * 0.6, z1 - 1.2, EDU_C.steel);
for (var pp = 0; pp < 3; pp++)
B.mesh(gS(0.14), 0x3A9A3A, ow + inw * 0.6, 0.95, z1 - 1.7 + pp * 0.5);
B.glassBox(0.7, 0.45, 0.35, cx + 2.8, 0.78, z1 - 0.5);
B.bx(s, 0.7, 0.78, 0.36, EDU_C.dark, cx + 2.8, 0, z1 - 0.5);
B.gl(0.66, 0.3, 0.32, 0x3AA8E8, cx + 2.8, 0.8, z1 - 0.5);
}
if (sub === "cs") {
for (var k2 = 0; k2 < 4; k2++) {
var mz = z0 + 3 + k2 * 1.3;
B.blk(s, 0.7, 0.75, 1.1, 0xD8D4CC, ow + inw * 0.5, 0, mz);
B.bx(s, 0.05, 0.4, 0.6, EDU_C.dark, ow + inw * 0.25, 0.8, mz);
B.gl(0.02, 0.32, 0.5, 0x3A6AA8, ow + inw * 0.28, 0.84, mz);
}
}
if (small)
for (var cb = 0; cb < 6; cb++) {
B.bx(s, 0.5, 1.2, 0.4, [0xE85A3A, 0x3A8AE8, 0xE8C04A, 0x6AC84A, 0x9A5AE8, 0xE88A3A][cb], cx - 3.6 + cb * 0.55, 0, z1 - 0.3);
}
B.room = r;
B.desks = desks;
r.desks = desks;
C.spots.push({ x: cx, z: (z0 + z1) / 2, room: r.id, level: 0 });
},
function (B, r) {
var s = r.hall, x0 = r.x0, x1 = r.x1, z0 = r.z0, z1 = r.z1, cx = (x0 + x1) / 2, side = r.side, ow = side ? x1 : x0, inw = side ? -1 : 1;
B.bx(s, 8.8, 0.02, 7.8, 0xE8ECEE, cx, 0.004, (z0 + z1) / 2);
B.wall("x", (z0 + z1) / 2, x0, x1, 2.6, 0xB8D0D8, [[side ? x0 + 1.2 : x1 - 1.2, 1.2]], s);
[z0 + 0.2, z1 - 0.2].forEach(function (zw, h) {
var dir = h ? -1 : 1;
for (var k = 0; k < 3; k++) {
var sx = ow + inw * (1.0 + k * 1.3);
B.bx(s, 0.06, 1.9, 1.5, 0x6A8AA8, sx + inw * 0.62, 0.1, zw + dir * 0.75);
B.bx(s, 0.5, 0.4, 0.6, 0xF4F4F4, sx, 0, zw + dir * 0.35);
}
B.bx(s, 0.06, 1.9, 1.5, 0x6A8AA8, ow + inw * 4.5, 0.1, zw + dir * 0.75);
for (var k2 = 0; k2 < 3; k2++) {
var tx = ow + inw * (5.6 + k2 * 0.8);
B.bx(s, 0.6, 0.15, 0.45, 0xF4F4F4, tx, 0.8, zw + dir * 0.25);
}
B.bx(s, 2.4, 0.9, 0.02, 0xCFE0F0, ow + inw * 6.4, 1.3, zw + dir * 0.02);
});
},
function (B, h) {
var C = B.C, xc = h.xc, zE = h.x0, s = h.id, el = h.el, rows = h.rows, zEnd = h.z0;
B.bx(s, 3.9, 0.02, -zEnd - 2, el ? 0xD8D0B8 : 0xCCD0D4, xc, 0.004, (zEnd - 2) / 2);
[0, 1].forEach(function (side) {
var x = side ? xc + 2 : xc - 2, gaps = [];
EDU_ROOMS.forEach(function (r) { if (r.hall === h.id && r.side === side)
gaps.push([r.door.z, 1.3]); });
B.wall("z", x, zEnd, -2, EDU_H, EDU_C.hallW, gaps);
var dir = side ? -1 : 1;
for (var z = -2.6; z > zEnd + 0.3; z -= 0.42) {
var nearDoor = gaps.some(function (g) { return Math.abs(z - g[0]) < 1.0; });
if (nearDoor)
continue;
if (!el)
B.bx(s, 0.4, 1.8, 0.44, [0x2E5A9A, 0xA83A32, 0x3A7A4A, 0x6A4A8A, 0xC8963A, 0x2A8A8A, 0x5A5A6A][EDU_GRADES.indexOf(h.grade) % 7], x + dir * 0.32, 0, z);
}
if (!el)
C.solid(x + dir * 0.32, (zEnd - 2) / 2, 0.22, (-zEnd - 2) / 2, 1.8);
else
for (var zb = -6; zb > zEnd + 1; zb -= 8) {
B.bx(s, 0.04, 0.9, 2.2, EDU_C.cork, x + dir * 0.12, 1.2, zb);
B.bx(s, 0.05, 0.5, 0.6, [0xE85A3A, 0x3A8AE8, 0xE8C04A][(-zb | 0) % 3], x + dir * 0.14, 1.4, zb - 0.4);
B.bx(s, 0.05, 0.4, 0.5, 0xF4F0E0, x + dir * 0.14, 1.3, zb + 0.5);
for (var hk = 0; hk < 5; hk++)
B.bx(s, 0.12, 0.04, 0.04, EDU_C.steel, x + dir * 0.12, 1.5, zb - 3 + hk * 0.3);
}
});
for (var r = 1; r < rows; r++) {
var z = -2 - 8 * r;
B.wall("x", z, xc - 11, xc - 2, EDU_H, EDU_C.wall, null);
B.wall("x", z, xc + 2, xc + 11, EDU_H, EDU_C.wall, null);
}
B.blk(s, 0.5, 0.9, 0.4, EDU_C.steel, xc + 1.4, 0, zEnd + 0.35);
B.bx(s, 0.2, 0.5, 0.15, 0xC83A32, xc - 1.6, 0.9, zEnd + 0.2);
for (var lz = -4; lz > zEnd; lz -= 5)
B.light(xc, lz);
C.spots.push({ x: xc, z: (zEnd - 2) / 2, room: h.id, level: 0 });
EDU_ROOMS.forEach(function (rm) { if (rm.hall === h.id)
eduDressClass(B, rm); });
},
function (spec) {
var C = tlCtx(spec, EDU_W, EDU_D, EDU_H), B = eduBuilder(C), H = EDU_H, W = EDU_C;
var S = "shell", K = "core", P = "play";
B.bx(S, 378, 0.1, 114, W.floor, 11, -0.1, 4);
B.bx(S, 374, 0.012, 3.9, 0xC8C0AC, 11, 0.002, 0);
for (var tx = -174; tx < 197; tx += 6)
B.bx(S, 2.8, 0.014, 0.6, 0x9A8A6A, tx, 0.003, 0);
var CEIL = 0xF0EEE8;
[[-176, -44, -34, 2], [-44, 198, -2, 2], [44, 198, -42, -2], [44, 198, 2, 30], [-44, -12, 2, 60], [12, 44, 2, 60], [-12, 12, 52, 60], [-44, 10, -50, -40]].forEach(function (q) {
B.bx(S, q[1] - q[0], 0.2, q[3] - q[2], CEIL, (q[0] + q[1]) / 2, H, (q[2] + q[3]) / 2);
});
B.bx(S, 24, 0.2, 50, CEIL, 0, 6.5, 27);
B.gl(14, 0.05, 30, 0xDCEBF8, 0, 6.44, 27);
B.bx(S, 54, 0.2, 38, 0xD8D4CC, -17, 8, -21);
B.bx(S, 34, 0.2, 48, 0x3A2E2A, 27, 8, -26);
var hallsW = EDU_HALLS.filter(function (h) { return h.el; }), hallsE = EDU_HALLS.filter(function (h) { return !h.el; });
B.wall("x", -2, -176, -44, H, W.hallW, hallsW.map(function (h) { return [h.xc, 3.8]; }));
B.wall("x", -2, -44, 10, 8, W.wall, [[-30, 3], [-4, 3]]);
B.wall("x", -2, 10, 44, 8, 0x6A3A3A, [[18, 2.4], [36, 2.4]]);
B.wall("x", -2, 44, 198, H, W.hallW, hallsE.map(function (h) { return [h.xc, 3.8]; }));
B.wall("x", 2, -176, -44, H, W.hallW, [[-150, 3], [-70, 3]]);
B.wall("x", 2, -44, -12, H, W.wall, [[-28, 2.4]]);
B.wall("x", 2, 12, 44, H, W.wall, [[20, 3], [39, 1.2, "kitchen"]]);
B.wall("x", 2, 44, 198, H, W.hallW, [[55, 1.3, "staff"], [79, 2.4], [107, 2.4], [136, 2.4], [160, 1.6], [177, 1.2, "staff"], [191, 1.2, "staff"]]);
B.wall("z", -176, -34, 40, H, W.wall, null);
B.wall("z", 198, -42, 30, H, W.wall, null);
for (var i = 1; i < 6; i++)
B.wall("z", -44 - 22 * i, -34, -2, H, W.wall, null);
for (var j = 1; j < 7; j++)
B.wall("z", 44 + 22 * j, -42, -2, H, W.wall, null);
B.wall("x", -34, -176, -44, H, W.wall, null);
B.wall("x", -42, 44, 198, H, W.wall, null);
[66, 92, 122, 150, 170, 184].forEach(function (x) { B.wall("z", x, 2, 30, H, W.wall, null); });
B.wall("x", 30, 44, 198, H, W.wall, null);
B.wall("z", -44, -50, 60, 8, W.wall, null);
B.wall("z", 44, -50, 30, 8, W.wall, null);
B.wall("z", 44, 30, 60, H, W.wall, null);
B.wall("z", 10, -50, -2, 8, W.wall, null);
B.wall("z", -12, 2, 34, 6.5, W.wall, [[20, 2.4]]);
B.wall("z", -12, 34, 52, 6.5, W.wall, [[44, 2]]);
B.wall("z", -12, 52, 60, H, W.wall, null);
B.wall("z", 12, 2, 28, 6.5, W.wall, [[14, 4]]);
B.wall("z", 12, 28, 32, 6.5, W.wall, [[30, 3]]);
B.wall("z", 12, 32, 52, 6.5, W.wall, null);
B.wall("z", 12, 52, 60, H, W.wall, null);
B.wall("x", 52, -12, 12, 6.5, W.wall, [[0, 4]]);
B.bx(S, 24, 2.9, 0.22, W.wall, 0, 3.6, 52);
B.wall("x", 60, -44, 44, H, 0xB8A890, [[0, 2.4]]);
B.wall("x", 34, -44, -12, H, W.wall, null);
B.wall("z", -24, 34, 60, H, W.wall, [[40, 1.2, "office"]]);
B.wall("z", -34, 34, 60, H, W.wall, [[40, 1.2], [54, 1.2]]);
B.wall("x", 47, -44, -34, H, W.wall, null);
B.wall("x", 28, 12, 44, H, W.wall, null);
B.wall("x", 32, 12, 44, H, W.wall, [[17, 1.4], [27, 1.4], [38, 1.4]]);
B.wall("z", 22, 32, 60, H, W.wall, null);
B.wall("z", 32, 32, 60, H, W.wall, null);
B.wall("x", 46, 12, 44, H, W.wall, [[17, 1.2, "nurse"], [27, 1.4], [38, 1.2, "district"]]);
B.wall("z", 34, 2, 28, H, 0xD8DCE0, [[15, 9], [25, 1.2, "kitchen"]]);
B.wall("x", -40, -44, 10, 8, W.wall, [[-37, 1.6], [-23, 1.6], [-11, 1.2, "gym"], [2, 1.6, "gym"]]);
B.wall("x", -50, -44, 44, 8, W.wall, null);
[-30, -16, -6].forEach(function (x) { B.wall("z", x, -50, -40, H, W.wall, null); });
B.wall("x", 40, -176, -44, 2.4, 0x8A9098, null);
for (var lx = -170; lx < 196; lx += 8)
B.light(lx, 0);
[-120, -60, 70, 140].forEach(function (x) { B.bx(K, 2.4, 0.9, 0.04, W.cork, x, 1.2, 1.86); });
EDU_HALLS.forEach(function (h) { C.spots.push({ x: h.xc, z: 0, room: "corridor", level: 0 }); });
B.glassBox(6, 2, 0.5, -17, 0.6, -1.6);
B.bx(K, 6, 0.6, 0.5, W.oakD, -17, 0, -1.6);
for (var tr = 0; tr < 6; tr++)
B.mesh(gC(0.08, 0.14, 0.36, 8), 0xC9A040, -19.5 + tr, 0.82, -1.6);
B.bx(K, 24, 0.012, 8, 0x6A6A6A, 0, 0.003, 56);
B.blk(K, 3, 1.05, 0.8, W.oak, -7.5, 0, 55.5);
B.bx(K, 0.5, 0.35, 0.3, W.dark, -7.2, 1.05, 55.4);
B.blk(K, 0.6, 1.3, 0.5, W.dark, 7.5, 0, 57);
B.gl(0.4, 0.3, 0.02, 0x5A8AC8, 7.5, 1.0, 56.74);
B.glassBox(4, 2.4, 0.1, 0, 0, 52.05);
B.light(0, 56);
C.spots.push({ x: 0, z: 56, room: "vestibule", level: 0 });
B.mesh(gC(4, 4, 0.02, 40), 0x2E4A7A, 0, 0.006, 30);
B.mesh(gC(3.2, 3.2, 0.024, 40), 0xC9A040, 0, 0.008, 30);
B.mesh(gC(2.6, 2.6, 0.03, 40), 0x2E4A7A, 0, 0.01, 30);
B.glassBox(0.6, 2.1, 8, -11.4, 0.7, 30);
B.bx(K, 0.7, 0.7, 8.2, W.oakD, -11.4, 0, 30);
for (var tc = 0; tc < 6; tc++)
B.mesh(gC(0.1, 0.18, 0.5, 8), 0xC9A040, -11.4, 0.95, 26.6 + tc * 1.3);
C.solid(-11.4, 30, 0.35, 4.1, 2.8);
[[-6, 40], [6, 40], [-6, 16], [6, 16]].forEach(function (q) { B.blk(K, 2.4, 0.45, 0.6, W.oak, q[0], 0, q[1]); });
[[-10, 48], [10, 48], [-10, 6], [10, 6]].forEach(function (q) { eduPlant(B, q[0], q[1]); });
B.bx(K, 0.1, 2.2, 4, 0x1E2A44, 11.85, 1.0, 22);
for (var al = 0; al < 4; al++)
for (var az = 0; az < 4; az++)
B.light(-7 + al * 4.7, 8 + az * 12);
C.spots.push({ x: 0, z: 30, room: "atrium", level: 0 }, { x: 0, z: 12, room: "atrium", level: 0 }, { x: 0, z: 44, room: "atrium", level: 0 });
B.bx(K, 32, 0.012, 26, 0x8A8270, -28, 0.003, 47);
B.blk(K, 0.8, 1.1, 12, W.oak, -20, 0, 47);
B.bx(K, 1.0, 0.05, 12.2, 0xD8D0C0, -20, 1.1, 47);
B.glassBox(0.06, 0.9, 12, -20.2, 1.15, 47);
for (var wc = 0; wc < 4; wc++)
eduChair(B, K, -14, 38.5 + wc * 1.0, Math.PI / 2, 0x4A6A8A);
eduPlant(B, -13, 58.5);
B.light(-18, 40);
B.light(-18, 54);
[[-31, 38], [-27, 38], [-31, 44], [-27, 44]].forEach(function (q) { B.blk(K, 1.4, 0.76, 0.7, W.oak, q[0], 0, q[1]); B.bx(K, 0.5, 0.35, 0.05, W.dark, q[0], 0.76, q[1] - 0.2); eduChair(B, K, q[0], q[1] + 0.7, Math.PI, W.dark); });
B.blk(K, 1.2, 1.1, 0.7, 0xD8D8D8, -25, 0, 57);
B.blk(K, 3, 1.8, 0.4, W.oakD, -29, 0, 59.6);
for (var ph = 0; ph < 12; ph++)
B.bx(K, 0.22, 0.18, 0.05, 0xF4F0E0, -30.3 + (ph % 6) * 0.45, 1.0 + (ph >> 1 & 1) * 0.25 + (ph > 5 ? 0.5 : 0), 59.38);
for (var fc = 0; fc < 3; fc++)
B.blk(K, 0.5, 1.3, 0.6, 0x7A8088, -33.4, 0, 50 + fc * 0.6);
B.light(-29, 41);
B.light(-29, 53);
[["principal", 53.5], ["ap", 40.5]].forEach(function (q) {
var z = q[1];
B.bx(K, 9.8, 0.012, 12.8, 0x6A3A3A, -39, 0.004, z);
B.blk(K, 2.0, 0.78, 0.9, W.oakD, -39, 0, z - 2.2);
eduChair(B, K, -39, z - 3.1, 0, W.dark);
eduChair(B, K, -39.6, z - 1.0, Math.PI, 0x6A3A3A);
eduChair(B, K, -38.4, z - 1.0, Math.PI, 0x6A3A3A);
eduShelf(B, K, 2.4, -43.7, z + 1, Math.PI / 2);
B.mesh(gC(0.6, 0.6, 0.05, 16), W.oak, -37, 0.72, z + 3.5);
B.mesh(gC(0.08, 0.08, 0.7, 6), W.oakD, -37, 0.36, z + 3.5);
B.light(-39, z);
eduFlag(B, -36.2, z - 5.6);
C.spots.push({ x: -39, z: z, room: q[0], level: 0 });
});
B.bx(K, 32, 0.012, 32, 0x4A6A5A, -28, 0.004, 18);
for (var sr = 0; sr < 4; sr++) {
eduShelf(B, K, 4.8, -40, 6 + sr * 3.2, 0);
eduShelf(B, K, 4.8, -33, 6 + sr * 3.2, 0);
}
eduShelf(B, K, 8, -43.6, 26, Math.PI / 2);
eduShelf(B, K, 6, -43.6, 10, Math.PI / 2);
[[-22, 8], [-22, 14], [-16, 8], [-16, 14]].forEach(function (q) { eduTable(B, K, 2.0, 1.2, q[0], q[1]); eduChair(B, K, q[0] - 0.6, q[1] + 1.0, Math.PI, 0x3A6A5A); eduChair(B, K, q[0] + 0.6, q[1] + 1.0, Math.PI, 0x3A6A5A); eduChair(B, K, q[0] - 0.6, q[1] - 1.0, 0, 0x3A6A5A); eduChair(B, K, q[0] + 0.6, q[1] - 1.0, 0, 0x3A6A5A); });
B.blk(K, 4, 1.05, 1, W.oak, -18, 0, 24);
B.bx(K, 0.5, 0.35, 0.05, W.dark, -18.6, 1.05, 23.8);
for (var cp = 0; cp < 5; cp++) {
B.blk(K, 1.2, 0.75, 0.7, 0xD8D4CC, -38 + cp * 1.5, 0, 32.9);
B.bx(K, 0.55, 0.38, 0.05, W.dark, -38 + cp * 1.5, 0.8, 33.1);
B.gl(0.5, 0.3, 0.01, 0x3A6AA8, -38 + cp * 1.5, 0.83, 33.07);
eduChair(B, K, -38 + cp * 1.5, 32.2, Math.PI, W.dark);
}
B.bx(K, 5, 0.03, 4, 0xC84A4A, -28, 0.006, 29);
[0, 1, 2, 3].forEach(function (b) { B.mesh(gS(0.45), [0xE8C04A, 0x3AA8E8, 0x8AC84A, 0xE87A9A][b], -30 + b * 1.3, 0.3, 29 + (b % 2) * 0.8); });
for (var pb = 0; pb < 4; pb++)
B.blk(K, 1.0, 0.6, 0.6, [0xE85A3A, 0x3A8AE8, 0xE8C04A, 0x6AC84A][pb], -24 + pb * 1.2, 0, 31.5);
for (var ll = 0; ll < 4; ll++)
for (var lz = 0; lz < 4; lz++)
B.light(-40 + ll * 8, 6 + lz * 8);
C.spots.push({ x: -18, z: 22.6, room: "library", level: 0 });
B.bx(K, 22, 0.012, 26, 0xE0D8C0, 23, 0.004, 15);
for (var ct = 0; ct < 3; ct++)
for (var cr = 0; cr < 4; cr++) {
var tx2 = 16 + ct * 5.6, tz2 = 5 + cr * 5.5;
B.blk(K, 1.2, 0.74, 3.6, 0xD8C8A0, tx2, 0, tz2);
B.blk(K, 0.35, 0.45, 3.6, 0x3A6AA8, tx2 - 0.95, 0, tz2);
B.blk(K, 0.35, 0.45, 3.6, 0x3A6AA8, tx2 + 0.95, 0, tz2);
}
B.blk(K, 0.9, 0.95, 9, W.steel, 33, 0, 15);
B.glassBox(0.05, 0.5, 9, 32.7, 1.3, 15);
B.bx(K, 0.9, 0.03, 9, 0xC8CCD0, 33, 0.95, 15);
for (var tray = 0; tray < 5; tray++)
B.bx(K, 0.4, 0.04, 0.3, 0xC85A3A, 33, 0.98, 11.5 + tray * 0.2);
for (var cl = 0; cl < 3; cl++)
for (var cz = 0; cz < 3; cz++)
B.light(16 + cl * 6, 6 + cz * 8);
B.blk(K, 1.0, 0.9, 3, W.steel, 43.4, 0, 6);
B.bx(K, 1, 0.05, 3, 0x2A2A2A, 43.4, 0.9, 6);
B.blk(K, 1.0, 1.8, 2, 0xB8BCC4, 43.4, 0, 11);
B.blk(K, 1.0, 2.1, 3, 0xD8DCE0, 43.4, 0, 24);
B.blk(K, 2.4, 0.9, 0.8, W.steel, 38, 0, 27.4);
B.blk(K, 3, 0.9, 0.9, W.steel, 38, 0, 9);
B.light(39, 8);
B.light(39, 20);
C.spots.push({ x: 23, z: 15, room: "cafeteria", level: 0 }, { x: 38, z: 15, room: "kitchen", level: 0 });
B.bx(K, 32, 0.012, 4, 0xC8C0AC, 28, 0.004, 30);
B.light(18, 30);
B.light(36, 30);
B.bx(K, 10, 0.012, 28, 0xE8ECEE, 17, 0.004, 46);
B.blk(K, 1.4, 0.76, 0.7, 0xD8D4CC, 19.5, 0, 35);
eduChair(B, K, 19.5, 34.3, 0, W.dark);
for (var nc = 0; nc < 3; nc++)
eduChair(B, K, 12.8, 36 + nc * 1.0, Math.PI / 2, 0x5A8AA8);
B.blk(K, 0.5, 1.8, 1.2, 0xF4F4F4, 21.5, 0, 41);
B.bx(K, 0.04, 0.8, 0.5, 0xF4F4F4, 12.15, 1.2, 43);
B.bx(K, 0.4, 0.05, 0.4, 0x3A3A3A, 14.5, 0.05, 44.5);
[49, 53, 57].forEach(function (z) { B.blk(K, 2.0, 0.6, 0.9, 0xF4F4F0, 15.5, 0, z); B.bx(K, 0.5, 0.12, 0.8, 0xFFFFFF, 14.8, 0.6, z); });
B.blk(K, 0.8, 1.4, 0.5, 0xE8E8E8, 21.5, 0, 58.5);
B.light(17, 39);
B.light(17, 53);
C.spots.push({ x: 17, z: 39, room: "nurse", level: 0 }, { x: 17, z: 53, room: "sickbay", level: 0 });
B.bx(K, 10, 0.012, 14, 0x7A8A6A, 27, 0.004, 39);
B.blk(K, 1.6, 0.76, 0.8, W.oak, 27, 0, 35.4);
eduChair(B, K, 27, 34.6, 0, W.dark);
B.blk(K, 2.2, 0.45, 0.9, 0x6A8A5A, 24.2, 0, 42);
B.blk(K, 0.9, 0.45, 0.9, 0x6A8A5A, 29.5, 0, 42);
eduPlant(B, 31, 45);
B.bx(K, 10, 0.012, 14, 0xC8C0AC, 27, 0.004, 53);
eduTable(B, K, 3.6, 1.4, 27, 51);
for (var cc = 0; cc < 3; cc++) {
eduChair(B, K, 25.8 + cc * 1.2, 50, 0, W.dark);
eduChair(B, K, 25.8 + cc * 1.2, 52, Math.PI, W.dark);
}
B.blk(K, 0.4, 1.6, 3, 0xC8963A, 31.6, 0, 55);
for (var pm = 0; pm < 6; pm++)
B.bx(K, 0.05, 0.28, 0.2, [0xE85A3A, 0x3A8AE8, 0xE8C04A][pm % 3], 31.37, 0.4 + (pm >> 1) * 0.45, 54 + (pm % 2) * 1.0);
for (var cm = 0; cm < 3; cm++) {
B.blk(K, 0.7, 0.75, 1.1, 0xD8D4CC, 22.4, 0, 49 + cm * 1.6);
B.bx(K, 0.05, 0.4, 0.6, W.dark, 22.2, 0.8, 49 + cm * 1.6);
}
B.light(27, 39);
B.light(27, 53);
C.spots.push({ x: 27, z: 38, room: "counsel", level: 0 }, { x: 27, z: 53, room: "career", level: 0 });
B.bx(K, 12, 0.012, 14, 0x3A4A6A, 38, 0.004, 39);
B.blk(K, 2.6, 0.76, 0.9, W.oak, 38, 0, 35.6);
B.blk(K, 1.6, 0.76, 0.8, W.oak, 41.5, 0, 40);
B.blk(K, 1.6, 0.76, 0.8, W.oak, 34.5, 0, 40);
eduShelf(B, K, 3, 38, 45.6, 0);
B.bx(K, 0.06, 1.6, 3.2, 0x1E3A5A, 43.85, 1.0, 39);
B.light(38, 39);
C.spots.push({ x: 38, z: 39, room: "district", level: 0 });
B.bx(K, 12, 0.012, 14, 0x6A3A3A, 38, 0.004, 53);
B.blk(K, 2.2, 0.78, 1.0, W.oakD, 38, 0, 50);
eduChair(B, K, 38, 49.2, 0, W.dark);
eduShelf(B, K, 3, 43.6, 54, Math.PI / 2);
eduFlag(B, 33, 58);
eduPlant(B, 43, 58.5);
B.light(38, 53);
C.spots.push({ x: 38, z: 53, room: "super", level: 0 });
B.bx(K, 54, 0.014, 38, W.gymF, -17, 0.004, -21);
[[28, 0.08, -17, -13.5], [28, 0.08, -17, -28.5]].forEach(function (q) { B.bx(K, q[0], 0.02, q[1], 0xF4F4F0, q[2], 0.012, q[3]); });
[-31, -3, -17].forEach(function (x) { B.bx(K, 0.08, 0.02, 15, 0xF4F4F0, x, 0.012, -21); });
B.mesh(gT(1.8, 0.05), 0xF4F4F0, -17, 0.02, -21, 0, Math.PI / 2);
[-30.6, -3.4].forEach(function (x, k) { var d = k ? -1 : 1; B.bx(K, 0.1, 1.1, 1.8, 0xF4F4F0, x - d * 0.0, 2.9, -21); B.mesh(gT(0.23, 0.02), 0xE8701A, x + d * 0.35, 3.05, -21, 0, Math.PI / 2); B.bx(K, 0.12, 3.6, 0.12, 0x3A3A3A, x - d * 0.5, 0, -21); });
for (var bl = 0; bl < 5; bl++) {
B.blk(K, 17, 0.45, 0.9, 0x9AA0A8, -17, bl * 0.45, -3.7 - bl * 0.9);
}
B.bx(K, 6, 1.8, 0.2, 0x161616, -17, 5.2, -39.8);
B.gl(1.6, 0.7, 0.05, 0xE8701A, -19, 5.8, -39.65);
B.gl(1.6, 0.7, 0.05, 0xE8701A, -15, 5.8, -39.65);
B.bx(K, 0.12, 1.8, 36, 0x2E4A8A, -43.85, 0, -21);
B.bx(K, 0.12, 1.8, 36, 0x2E4A8A, 9.85, 0, -21);
for (var gl = 0; gl < 3; gl++)
for (var gz = 0; gz < 3; gz++) {
C.light(-34 + gl * 17, -34 + gz * 12);
B.gl(1.6, 0.08, 1.6, 0xF8F4E8, -34 + gl * 17, 7.8, -34 + gz * 12);
}
C.spots.push({ x: -17, z: -21, room: "gym", level: 0 });
[-37, -23].forEach(function (cx) { for (var lk = 0; lk < 12; lk++) {
B.bx(K, 0.42, 1.8, 0.45, 0x6A7A8A, cx - 2.4 + lk * 0.42, 0, -49.5);
} C.solid(cx, -49.5, 2.6, 0.25, 1.8); B.blk(K, 4, 0.45, 0.4, W.oak, cx, 0, -46.5); B.bx(K, 4, 0.012, 8, 0xB8C8D0, cx, 0.005, -45); B.light(cx, -45); });
B.blk(K, 1.6, 0.76, 0.8, W.oak, -11, 0, -47);
eduChair(B, K, -11, -47.8, 0, W.dark);
B.blk(K, 0.4, 1.8, 2.4, W.oakD, -6.6, 0, -46);
for (var eq = 0; eq < 10; eq++)
B.mesh(gS(0.2), [0xE8701A, 0xF4F4F0, 0x3A6AC8][eq % 3], -3 + (eq % 5) * 0.6, 0.2, -48.5 + Math.floor(eq / 5) * 0.6);
B.blk(K, 3, 1.4, 0.6, W.steel, 4, 0, -49.4);
B.blk(K, 2, 0.1, 1.4, 0x2E5AA8, 6, 0, -45);
B.light(-11, -45);
B.light(2, -45);
B.bx(K, 34, 0.014, 48, 0x6A2A2A, 27, 0.004, -26);
B.blk(K, 34, 1.0, 9, W.stage, 27, 0, -45.5);
B.bx(K, 34, 6.4, 0.2, 0x8A1A22, 27, 1.0, -49.6);
[[11.2, 1.4], [42.8, 1.4]].forEach(function (q) { B.bx(K, q[1] + 0.8, 7, 0.6, 0x4A2A1A, q[0], 0, -41.2); });
B.bx(K, 34, 1.0, 0.6, 0x4A2A1A, 27, 7, -41.2);
for (var ar = 0; ar < 14; ar++) {
var az2 = -38 + ar * 2.2;
[[12, 18], [20, 34], [36, 42]].forEach(function (q) { var w2 = q[1] - q[0]; B.blk(K, w2, 0.45, 0.55, 0x7A1A22, (q[0] + q[1]) / 2, 0, az2); B.bx(K, w2, 0.55, 0.12, 0x7A1A22, (q[0] + q[1]) / 2, 0.45, az2 + 0.27); });
}
for (var sl = 0; sl < 4; sl++) {
C.light(14 + sl * 8, -46);
B.gl(0.5, 0.3, 0.5, 0xFFF0C8, 14 + sl * 8, 7.6, -30);
}
for (var al2 = 0; al2 < 3; al2++)
C.light(19 + al2 * 8, -20);
C.spots.push({ x: 27, z: -20, room: "auditorium", level: 0 });
B.bx(K, 22, 0.012, 28, 0x8A7A6A, 55, 0.004, 16);
B.blk(K, 2.4, 0.8, 0.9, 0x5A6A8A, 50, 0, 10);
B.blk(K, 0.9, 0.8, 2.2, 0x5A6A8A, 47, 0, 12.5);
eduTable(B, K, 3.6, 1.4, 58, 14);
for (var lt = 0; lt < 3; lt++) {
eduChair(B, K, 56.8 + lt * 1.2, 13, 0, W.dark);
eduChair(B, K, 56.8 + lt * 1.2, 15, Math.PI, W.dark);
}
B.blk(K, 0.8, 1.9, 0.7, 0xD8DCE0, 65.3, 0, 26);
B.blk(K, 2.4, 0.9, 0.6, W.oak, 62, 0, 29.4);
B.bx(K, 0.5, 0.3, 0.35, W.dark, 61.4, 0.9, 29.4);
B.blk(K, 1.2, 1.1, 0.7, 0xD8D8D8, 46, 0, 27);
B.light(52, 10);
B.light(58, 22);
C.spots.push({ x: 55, z: 16, room: "lounge", level: 0 });
B.bx(K, 26, 0.014, 28, 0x2A2C30, 79, 0.004, 16);
for (var wr = 0; wr < 3; wr++) {
B.blk(K, 1.6, 2.0, 1.2, W.steel, 70 + wr * 4, 0, 6);
B.mesh(gC(0.03, 0.03, 2.0, 8), 0xC0C4C8, 70 + wr * 4, 1.5, 6.4, 0, 0, Math.PI / 2);
B.blk(K, 0.4, 0.45, 1.4, W.dark, 70 + wr * 4, 0, 8);
}
for (var tm = 0; tm < 4; tm++) {
B.blk(K, 0.9, 0.3, 2.0, W.dark, 72 + tm * 3, 0, 25);
B.bx(K, 0.8, 1.3, 0.1, 0x3A3A3A, 72 + tm * 3, 0.3, 24.1);
}
B.bx(K, 0.05, 1.8, 10, 0xCFE0F0, 91.85, 0.4, 16);
B.light(74, 10);
B.light(84, 22);
C.spots.push({ x: 79, z: 16, room: "weights", level: 0 });
B.bx(K, 30, 0.014, 28, 0x8A8070, 107, 0.004, 16);
for (var wb = 0; wb < 3; wb++)
for (var wb2 = 0; wb2 < 2; wb2++)
eduTable(B, K, 3, 1.2, 99 + wb * 7, 12 + wb2 * 7, 0x6A4A2A, 0xB89A6A);
B.blk(K, 1.4, 0.9, 1.0, 0x3A5A8A, 118, 0, 6);
B.blk(K, 0.6, 1.7, 0.6, 0x3A5A8A, 118, 0, 10);
B.blk(K, 0.6, 2.2, 8, W.oakD, 121.5, 0, 20);
for (var lb = 0; lb < 6; lb++)
B.bx(K, 0.2, 0.1, 7.6, 0xC8A878, 121.4, 0.4 + lb * 0.3, 20);
B.bx(K, 0.04, 1.2, 3, 0xE8C04A, 92.15, 1.1, 16);
B.light(100, 10);
B.light(112, 22);
C.spots.push({ x: 107, z: 16, room: "shop", level: 0 });
B.bx(K, 28, 0.012, 28, 0xCCD0D4, 136, 0.004, 16);
B.bx(K, 6, 0.02, 6, 0x3A3A3A, 136, 0.01, 20);
[[0, -3], [0, 3], [-3, 0], [3, 0]].forEach(function (q) { B.bx(K, q[0] ? 0.1 : 6.1, 0.3, q[0] ? 6.1 : 0.1, 0xE8C04A, 136 + q[0], 0, 20 + q[1]); });
C.solid(136, 20, 3.05, 3.05, 0.3);
B.bx(K, 0.4, 0.25, 0.5, 0xC83A3A, 135, 0.02, 19.4);
B.bx(K, 0.4, 0.25, 0.5, 0x3A6AC8, 137, 0.02, 21);
for (var pr = 0; pr < 4; pr++) {
B.blk(K, 0.9, 0.8, 0.7, 0xD8D4CC, 125 + pr * 1.6, 0, 4);
B.bx(K, 0.7, 0.8, 0.6, 0x2A2C30, 125 + pr * 1.6, 0.8, 4);
B.gl(0.4, 0.02, 0.4, 0x6AE8A0, 125 + pr * 1.6, 1.1, 4);
}
eduTable(B, K, 4, 1.2, 128, 12);
eduTable(B, K, 4, 1.2, 144, 8);
B.light(128, 10);
B.light(144, 22);
C.spots.push({ x: 136, z: 14, room: "maker", level: 0 });
B.bx(K, 20, 0.012, 28, 0x7A9A8A, 160, 0.004, 16);
[[155, 8], [165, 8], [155, 16]].forEach(function (q) { eduTable(B, K, 1.6, 1.0, q[0], q[1]); eduChair(B, K, q[0] - 0.4, q[1] + 0.9, Math.PI, 0x5A8A7A); eduChair(B, K, q[0] + 0.4, q[1] - 0.9, 0, 0x5A8A7A); });
B.bx(K, 4, 0.03, 4, 0xA8C8E8, 165, 0.006, 24);
[0, 1, 2].forEach(function (b) { B.mesh(gS(0.45), [0xE8C04A, 0x9AC8E8, 0xC8E89A][b], 163.6 + b * 1.3, 0.3, 24.5); });
B.blk(K, 1.6, 2.2, 1.6, 0x6A8AA8, 152, 0, 27);
B.light(160, 10);
B.light(160, 22);
C.spots.push({ x: 160, z: 16, room: "resource", level: 0 });
B.bx(K, 14, 0.012, 28, 0x8A9098, 177, 0.004, 16);
for (var rk = 0; rk < 4; rk++) {
B.blk(K, 0.8, 2.1, 1.0, 0x1A1C20, 173 + rk * 1.8, 0, 22);
for (var ld = 0; ld < 6; ld++)
B.gl(0.5, 0.02, 0.02, ld % 2 ? 0x3AE87A : 0x3A9AE8, 173 + rk * 1.8, 0.4 + ld * 0.28, 21.48);
}
B.blk(K, 1.6, 0.76, 0.8, 0xD8D4CC, 177, 0, 8);
B.bx(K, 0.6, 0.38, 0.05, W.dark, 177, 0.8, 8.2);
eduChair(B, K, 177, 7.3, 0, W.dark);
B.light(177, 10);
B.light(177, 22);
C.spots.push({ x: 177, z: 12, room: "it", level: 0 });
B.bx(K, 14, 0.012, 28, 0x6A6A60, 191, 0.004, 16);
B.blk(K, 1.2, 0.9, 0.6, 0x3A6AA8, 190, 0, 10);
B.mesh(gC(0.3, 0.3, 0.5, 10), 0xE8C04A, 188, 0.25, 12);
B.blk(K, 1.4, 0.6, 0.8, 0xC8C8C8, 196.8, 0, 6);
eduShelf(B, K, 4, 197.6, 22, Math.PI / 2);
B.light(191, 10);
B.light(191, 22);
C.spots.push({ x: 191, z: 14, room: "custodian", level: 0 });
B.bx(P, 132, 0.016, 38, 0x5A9A4A, -110, 0.004, 21);
B.bx(P, 40, 0.02, 30, 0x4A4A4E, -70, 0.008, 21);
[[-80, 12], [-76, 12]].forEach(function (q) { B.bx(P, 0.06, 0.022, 8, 0xF4F4F0, q[0], 0.01, 16); });
B.bx(P, 8, 0.022, 0.06, 0xF4F4F0, -78, 0.01, 16);
for (var hs = 0; hs < 8; hs++)
B.bx(P, 0.9, 0.022, 0.9, [0xE8C04A, 0xE85A3A, 0x3A8AE8][hs % 3], -64, 0.01, 8 + hs * 1.0);
B.bx(P, 0.12, 3.4, 0.12, 0x3A3A3A, -56, 0, 30);
B.bx(P, 1.8, 1.1, 0.1, 0xF4F4F0, -56, 3.0, 29.9);
B.mesh(gT(0.23, 0.02), 0xE8701A, -56, 3.05, 29.5, 0, Math.PI / 2);
[-1, 1].forEach(function (s2) { B.bx(P, 0.12, 2.6, 0.12, 0xC83A3A, -128 + s2 * 4, 0, 10 - 0.8); B.bx(P, 0.12, 2.6, 0.12, 0xC83A3A, -128 + s2 * 4, 0, 10 + 0.8); });
B.bx(P, 8.2, 0.14, 0.14, 0xC83A3A, -128, 2.6, 10);
C.solid(-132, 10, 0.15, 0.9, 2.6);
C.solid(-124, 10, 0.15, 0.9, 2.6);
var swings = [];
for (var sw = 0; sw < 3; sw++) {
var sg = new THREE.Group();
sg.position.set(-130.4 + sw * 2.4, 2.6, 10);
var ch1 = new THREE.Mesh(gB(0.03, 1.9, 0.03), tlm(0x8A8A8A));
ch1.position.set(-0.25, -0.95, 0);
sg.add(ch1);
var ch2 = ch1.clone();
ch2.position.x = 0.25;
sg.add(ch2);
var seat = new THREE.Mesh(gB(0.6, 0.05, 0.25), tlm(0x2A2A2A));
seat.position.y = -1.9;
sg.add(seat);
C.root.add(sg);
swings.push(sg);
}
B.anim.push(function (t) { swings.forEach(function (g2, i) { g2.rotation.x = Math.sin(t * 1.6 + i * 1.3) * 0.18; }); });
B.blk(P, 2.2, 1.8, 2.2, 0x3A7AC8, -110, 0, 10);
B.bx(P, 2.4, 0.1, 2.4, 0xE8C04A, -110, 1.8, 10);
B.bx(P, 2.6, 0.4, 2.6, 0xE8C04A, -110, 2.6, 10);
B.mesh(gB(0.9, 0.06, 4.2), 0xE85A3A, -110, 0.95, 13.6, 0, -0.42);
B.bx(P, 0.6, 1.8, 0.1, 0x8A8A8A, -111.1, 0, 8.9);
B.mesh(new THREE.SphereGeometry(2.4, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), 0x2E8A5A, -92, 0, 20);
C.solid(-92, 20, 2.2, 2.2, 2.4);
B.bx(P, 5, 0.25, 5, 0xC8A86A, -140, 0, 28);
B.bx(P, 4.4, 0.06, 4.4, 0xE8D8A8, -140, 0.25, 28);
[[-100, 36], [-120, 36], [-150, 8]].forEach(function (q) { B.blk(P, 2.4, 0.45, 0.6, W.oak, q[0], 0, q[1]); });
[[-170, 6], [-170, 34], [-150, 36], [-96, 6], [-50, 36]].forEach(function (q) { B.mesh(gC(0.22, 0.3, 3, 8), 0x5A3A22, q[0], 1.5, q[1]); B.mesh(gS(1.8), 0x3A8A3A, q[0], 3.8, q[1]); C.solid(q[0], q[1], 0.35, 0.35, 3); });
C.spots.push({ x: -110, z: 21, room: "playground", level: 0 });
EDU_HALLS.forEach(function (h) { eduBuildHall(B, h); });
var made = B.finish();
var lightPool = [];
for (var li = 0; li < 10; li++) {
var pl = new THREE.PointLight(0xFFF4E4, 0, 16, 1.6);
C.root.add(pl);
lightPool.push(pl);
}
var fill = new THREE.PointLight(0xFFF8F0, 0, 80, 1.0);
C.root.add(fill);
var amb = new THREE.HemisphereLight(0xFFFFFF, 0x8A8478, 0.95);
amb.position.set(0, 10, 0);
C.root.add(amb);
var hallSets = {};
EDU_HALLS.forEach(function (h) { hallSets[h.id] = made[h.id]; });
return { spec: spec, root: C.root, walls: C.walls, spots: C.spots, ox: C.ox, oz: 0, exit: { x: C.ox, z: 59.2 }, start: { x: C.ox, z: 57.6 },
winMats: [B.winMat], winGlints: [], W: EDU_W, D: EDU_D, levels: 1, floor: H + 0.5, stairs: [], lifts: [], level: 0, holes: [], locked: null, unlocked: false,
floorNames: [EDU_KEY], asBuilt: [], wpKey: EDU_KEY, wpSaved: false,
lightSpots: C.lights, lightPool: lightPool, lightFill: fill, ceilH: H, lightAt: -1, lightLevel: -1,
school: { anim: B.anim, locks: B.locks, spots: B.spots, sets: hallSets, staff: {}, kids: [], signs: {}, hall: null, t: 0 } };
},
function (g, cb) {
if (EDU.data[g])
return cb(EDU.data[g]);
(EDU.loading[g] || (EDU.loading[g] = [])).push(cb);
if (EDU.loading[g].length > 1)
return;
fetch("data/school/g" + g + ".json").then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); }).then(function (d) {
var by = {};
(d.rooms || []).forEach(function (r) { by[r.subj] = r; });
EDU.data[g] = by;
var q = EDU.loading[g];
EDU.loading[g] = null;
q.forEach(function (f) { try {
f(by);
}
catch (e) { } });
}).catch(function () { var q = EDU.loading[g]; EDU.loading[g] = null; q.forEach(function (f) { try {
f(null);
}
catch (e) { } }); });
},
function (job) {
var t = (typeof TEMPS !== "undefined" && TEMPS.list) ? TEMPS.list.filter(function (x) { return x.post && +x.post.job === +job; })[0] : null;
if (t)
return { name: t.name, f: t.f, id: t.id };
var id = "tw" + job + "_0", hs = (typeof hash === "function") ? hash(id) : job * 7, f = (hs >>> 3) % 2 === 0;
var nm = (typeof TEMP_GIVEN_F !== "undefined") ? ((f ? TEMP_GIVEN_F : TEMP_GIVEN_M)[(hs >>> 5) % 20] + " " + SURNAME[(hs >>> 10) % SURNAME.length]) : "The teacher";
return { name: nm, f: f, id: id };
},
function (id, job, title, f) {
var t = { id: id, f: f, post: { title: title, workplace: EDU_KEY, job: +job }, mode: "desk", seed: 0 };
var L = (typeof tempLook === "function") ? tempLook(t) : {};
if (typeof jobDress === "function")
jobDress(L, title, EDU_KEY);
var g = buildFigure({ id: "__sch_" + job, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function () {
if (!INT || !INT.school)
return;
var Sd = INT.school, h = (typeof cityHourNow === "function") ? cityHourNow() : 12, P = camera.position, lx = P.x - INT.ox, lz = P.z - INT.oz, want = {};
Object.keys(EDU_POSTS).forEach(function (job) {
var p = EDU_POSTS[job], r = EDU_ROOM[p[1]], hr = p[3];
if (!r)
return;
if (!(eduOnShift(hr[0], hr[1], h) || eduOnShift(hr[2], hr[3], h)))
return;
var x = (r.x0 + r.x1) / 2 + p[2][0], z = (r.z0 + r.z1) / 2 + p[2][1];
if (Math.hypot(x - lx, z - lz) > (LITE ? 34 : 60))
return;
want[job] = { x: x, z: z, ry: 0 };
});
var hall = Sd.hall;
if (hall)
(Sd.spots || []).forEach(function (sp) {
var r = EDU_ROOM[sp.room];
if (!r || r.hall !== hall || !r.job)
return;
var hr = eduHours(r.job);
if (!eduOnShift(hr[0], hr[1], h))
return;
want[r.job] = { x: sp.x, z: sp.z, ry: 0 };
});
Object.keys(Sd.staff).forEach(function (job) { if (!want[job]) {
var g = Sd.staff[job].g;
if (g && g.parent)
g.parent.remove(g);
delete Sd.staff[job];
} });
Object.keys(want).forEach(function (job) {
if (Sd.staff[job])
return;
var w = want[job], n = eduName(job), title = eduTitle(+job);
var g = eduFigure(n.id, job, title, n.f);
g.position.set(w.x, 0, w.z);
g.rotation.y = w.ry;
var tag = makeTag(n.name + " · " + title, false);
tag.position.y = 2.2;
g.add(tag);
INT.root.add(g);
Sd.staff[job] = { g: g, name: n.name };
});
},
function (r) {
var Sd = INT.school, h = (typeof cityHourNow === "function") ? cityHourNow() : 12;
var key = r && r.kind === "class" && h >= 8 && h < 15 ? r.id : null;
if (Sd.kidsFor === key)
return;
Sd.kids.forEach(function (g) { if (g.parent)
g.parent.remove(g); });
Sd.kids = [];
Sd.kidsFor = key;
if (!key || !r.desks)
return;
var gi = EDU_GRADES.indexOf(r.grade), young = gi < 7, n = Math.min(r.desks.length, LITE ? 3 : 7);
for (var i = 0; i < n; i++) {
var d = r.desks[(i * 5) % r.desks.length], id = "schk" + r.id + "_" + i;
var L = (typeof randomLook === "function") ? randomLook(id, young ? "child" : "human") : {};
var g = buildFigure({ id: "__" + id, archetype: young ? "child" : "human", attrs: {}, look: L, solid: false, detail: 2, nights: [], city: true }, 1);
if (!young)
g.scale.setScalar(0.9);
g.position.set(d[0], 0.02, d[1]);
g.rotation.y = Math.PI;
g.userData.seated = true;
g.userData.pose = "sit";
g.traverse(function (m) { m.raycast = function () { }; });
INT.root.add(g);
Sd.kids.push(g);
}
},
function (lines, w, h, bg, fg) {
return hallCanvas(w, h, function (g, cw, ch) {
g.fillStyle = bg || "#1E2A44";
g.fillRect(0, 0, cw, ch);
g.strokeStyle = "#C9A040";
g.lineWidth = 4;
g.strokeRect(3, 3, cw - 6, ch - 6);
var n = lines.length;
lines.forEach(function (t, i) { hallText(g, t, cw / 2, ch * (i + 0.5) / n + 1, cw - 24, (i === 0 ? "bold " : "") + Math.round(ch / (n + 0.9) * 0.62) + "px Georgia,serif", fg || "#F4ECD8"); });
});
},
function (I) {
var R = I.root;
EDU_HALLS.forEach(function (h) { eduSign(R, [eduGradeName(h.grade) + " hall", h.el ? "Elementary wing" : (EDU_GRADES.indexOf(h.grade) < 9 ? "Middle school" : "High school")], 3.6, 1.0, h.xc, 3.0, -1.86, 0, 256); });
[["THE LIBRARY", -28, 2, 1.86, Math.PI], ["CAFETERIA", 20, 2, 1.86, Math.PI], ["GYMNASIUM", -17, -2, -1.86, 0, 4], ["AUDITORIUM", 27, -2, -1.86, 0, 4], ["PLAYGROUND", -110, 2, 1.86, Math.PI],
["TEACHERS' LOUNGE · STAFF", 55, 2, 1.86, Math.PI], ["WEIGHT ROOM", 79, 2, 1.86, Math.PI], ["THE SHOP · CTE", 107, 2, 1.86, Math.PI], ["MAKERSPACE & ROBOTICS", 136, 2, 1.86, Math.PI], ["LEARNING SUPPORT", 160, 2, 1.86, Math.PI],
["IT · STAFF", 177, 2, 1.86, Math.PI], ["CUSTODIAN · STAFF", 191, 2, 1.86, Math.PI]].forEach(function (q) { eduSign(R, [q[0]], q[5] || 2.6, 0.5, q[1], 2.75, q[3], q[4], 256); });
[["FRONT OFFICE", -12.12, 44, Math.PI / 2], ["LIBRARY", -12.12, 20, Math.PI / 2], ["CAFETERIA", 12.12, 14, -Math.PI / 2], ["NURSE · COUNSELOR · DEPT. OF EDUCATION", 12.12, 30, -Math.PI / 2]].forEach(function (q) { eduSign(R, [q[0]], 3.2, 0.45, q[1], 2.8, q[2], q[3], 320); });
[["NURSE", 17, 32.12, 0], ["COUNSELOR", 27, 32.12, 0], ["DEPARTMENT OF EDUCATION", 38, 32.12, 0]].forEach(function (q) { eduSign(R, [q[0]], 2.2, 0.36, q[1], 2.7, 31.86, Math.PI, 256); });
eduSign(R, ["SOMNUCOR CITY SCHOOL", "Kindergarten to Grade 12 · Department of Education"], 8, 1.4, 0, 4.9, 51.86, Math.PI, 512);
eduSign(R, ["WELCOME · PLEASE SIGN IN"], 3, 0.5, -7.5, 2.4, 59.8, Math.PI, 256);
var dir = hallCanvas(256, 512, function (g, w, h) {
g.fillStyle = "#1E2A44";
g.fillRect(0, 0, w, h);
var L = ["DIRECTORY", "", "West: Elementary wing", "Kindergarten to Grade 5", "Playground", "", "East: Middle & High", "Grades 6 to 12", "Shop · Makerspace · Weights", "", "North: Gym · Auditorium", "", "Library (west) · Office", "Cafeteria · Nurse (east)", "Counselor · Dept. of Education"];
L.forEach(function (t, i) { hallText(g, t, w / 2, 24 + i * 32, w - 16, (i === 0 ? "bold 24px" : "17px") + " Georgia,serif", i === 0 ? "#E8C870" : "#F4ECD8"); });
});
var dm = new THREE.Mesh(gP(1.9, 3.8), new THREE.MeshBasicMaterial({ map: dir.tex }));
dm.position.set(11.78, 2.1, 22);
dm.rotation.y = -Math.PI / 2;
R.add(dm);
},
function (h) {
var Sd = INT.school;
eduHallUndress();
var g = new THREE.Group();
INT.root.add(g);
Sd.hallDress = { id: h.id, g: g, tex: [] };
EDU_ROOMS.forEach(function (r) {
if (r.hall !== h.id)
return;
var lines = r.kind === "class" ? [r.name, eduTeacherName(r)] : ["RESTROOMS", "Girls · Boys"];
var sx = r.side ? r.door.x - 0.12 : r.door.x + 0.12, ry = r.side ? -Math.PI / 2 : Math.PI / 2;
var m = eduSign(g, lines, 1.6, 0.5, sx, 2.05, r.door.z + 1.35, ry, 256);
Sd.hallDress.tex.push(m.material.map);
if (r.kind === "class") {
var cx = (r.x0 + r.x1) / 2, n = eduCount(r.id);
var bt = hallCanvas(256, 96, function (c, w, hh) {
c.fillStyle = "#F8F8F8";
c.fillRect(0, 0, w, hh);
hallText(c, r.name, w / 2, 22, w - 16, "bold 17px sans-serif", "#1A3A7A");
hallText(c, "Ten units · " + (n ? n + " done by you" : "open the lessons to begin"), w / 2, 52, w - 16, "14px sans-serif", "#2A2A2A");
hallText(c, "Taught by " + eduTeacherName(r), w / 2, 76, w - 16, "italic 13px sans-serif", "#5A5A5A");
});
var bm = new THREE.Mesh(gP(3.9, 1.2), new THREE.MeshBasicMaterial({ map: bt.tex }));
bm.position.set(cx, 1.6, r.z0 + 0.18);
g.add(bm);
Sd.hallDress.tex.push(bt.tex);
}
});
},
function (g) {
var r = eduRnd, a, b, c, x;
switch (g) {
case "K":
if (Math.random() < 0.5) {
a = r(1, 10);
return { q: "How many dots? " + new Array(a + 1).join("● "), a: a };
}
a = r(0, 5);
b = r(0, 5 - a);
return { q: a + " + " + b + " =", a: a + b };
case "1":
if (Math.random() < 0.5) {
a = r(0, 10);
b = r(0, 10);
return { q: a + " + " + b + " =", a: a + b };
}
a = r(5, 20);
b = r(0, a);
return { q: a + " − " + b + " =", a: a - b };
case "2":
if (Math.random() < 0.5) {
a = r(10, 89);
b = r(1, 99 - a);
return { q: a + " + " + b + " =", a: a + b };
}
a = r(20, 99);
b = r(1, a);
return { q: a + " − " + b + " =", a: a - b };
case "3":
a = r(2, 10);
b = r(2, 10);
return Math.random() < 0.6 ? { q: a + " × " + b + " =", a: a * b } : { q: (a * b) + " ÷ " + a + " =", a: b };
case "4":
if (Math.random() < 0.5) {
a = r(12, 99);
b = r(2, 9);
return { q: a + " × " + b + " =", a: a * b };
}
b = r(2, 9);
c = r(11, 99);
return { q: (b * c) + " ÷ " + b + " =", a: c };
case "5":
if (Math.random() < 0.5) {
a = r(1, 99) / 10;
b = r(1, 99) / 10;
return { q: a.toFixed(1) + " + " + b.toFixed(1) + " =", a: Math.round((a + b) * 10) / 10 };
}
c = r(5, 12);
a = r(1, c - 2);
b = r(1, c - 1 - a);
return { q: a + "/" + c + " + " + b + "/" + c + " = ?/" + c + "   (type the top number)", a: a + b };
case "6":
if (Math.random() < 0.5) {
var p = [10, 20, 25, 50, 75][r(0, 4)];
a = r(1, 20) * 4 * 5;
return { q: p + "% of " + a + " =", a: a * p / 100 };
}
a = r(2, 9);
b = r(2, 9);
c = r(2, 6);
return { q: a + " : " + b + " = " + (a * c) + " : ?", a: b * c };
case "7":
if (Math.random() < 0.5) {
a = r(-12, 12);
b = r(-12, 12);
return Math.random() < 0.5 ? { q: "(" + a + ") + (" + b + ") =", a: a + b } : { q: "(" + a + ") × (" + b + ") =", a: a * b };
}
a = r(2, 9);
x = r(-9, 12);
b = r(-10, 10);
return { q: "Solve: " + a + "x " + (b < 0 ? "− " + (-b) : "+ " + b) + " = " + (a * x + b) + "    x =", a: x };
case "8":
var t = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]][r(0, 4)];
if (Math.random() < 0.4)
return { q: "A right triangle has legs " + t[0] + " and " + t[1] + ". The hypotenuse =", a: t[2] };
if (Math.random() < 0.5) {
a = r(2, 5);
b = r(2, 5);
return { q: a + "^" + b + " =", a: Math.pow(a, b) };
}
a = r(2, 9);
x = r(-9, 9);
b = r(-20, 20);
c = r(1, 5);
return { q: "Solve: " + a + "x " + (b < 0 ? "− " + (-b) : "+ " + b) + " = " + c + "x " + ((a - c) * x + b + 0 < 0 ? "" : "+ ") + 0 + " + " + ((a - c) * x + b) + "    x =", a: x };
case "9":
if (Math.random() < 0.5) {
var x1 = r(-5, 5), y1 = r(-5, 5), m = r(-4, 4), dx = r(1, 4);
return { q: "Slope of the line through (" + x1 + ", " + y1 + ") and (" + (x1 + dx) + ", " + (y1 + m * dx) + ") =", a: m };
}
a = r(2, 6);
x = r(-6, 6);
b = r(-9, 9);
return { q: "Solve: " + a + "(x " + (b < 0 ? "− " + (-b) : "+ " + b) + ") = " + (a * (x + b)) + "    x =", a: x };
case "10":
var k = r(0, 2);
if (k === 0) {
a = r(20, 80);
b = r(20, 150 - a);
return { q: "Two angles of a triangle are " + a + "° and " + b + "°. The third angle =", a: 180 - a - b };
}
if (k === 1) {
a = r(1, 10);
return { q: "Area of a circle of radius " + a + " (to one decimal place; π ≈ 3.14159) =", a: Math.round(Math.PI * a * a * 10) / 10, tol: 0.11 };
}
a = r(2, 15);
b = r(2, 15);
return { q: "Area of a rectangle " + a + " by " + b + " =", a: a * b };
case "11":
if (Math.random() < 0.5) {
a = r(1, 10);
return { q: "log₂(" + Math.pow(2, a) + ") =", a: a };
}
a = r(2, 15);
b = r(-6, 6);
return { q: "The positive solution of x² − " + (a * a) + " = 0 is x =", a: a };
default:
if (Math.random() < 0.5) {
var L = [r(1, 20), r(1, 20), r(1, 20), r(1, 20)];
var s = L[0] + L[1] + L[2] + L[3];
L[3] += (4 - s % 4) % 4;
s = L[0] + L[1] + L[2] + L[3];
return { q: "The mean of " + L.join(", ") + " =", a: s / 4 };
}
a = r(1, 5);
b = r(-5, 5);
x = r(-4, 4);
return { q: "f(x) = " + a + "x + " + b + " and g(x) = x². f(g(" + x + ")) =", a: a * x * x + b };
}
},
function (cid, tab) {
var c = eduCourse(cid);
if (!c)
return;
var st = eduStore()[cid] || {}, u = 1;
while (u < 10 && st[u])
u++;
EDU.lesson = { cid: cid, g: c[1], subj: c[2], title: c[3], unit: u, tab: tab || "learn", picks: {}, msg: "", t0: Date.now(), data: null, prac: null, streak: 0 };
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
eduLessonPaint();
eduData(c[1], function (by) { if (!EDU.lesson || EDU.lesson.cid !== cid)
return; EDU.lesson.data = by ? by[c[2]] || null : null; EDU.lesson.failed = !by; eduBegin(); eduLessonPaint(); });
},
function () {
var el = document.getElementById("sch-lesson");
if (!el) {
el = document.createElement("div");
el.id = "sch-lesson";
el.style.cssText = "position:fixed;inset:0;z-index:9100;background:rgba(6,8,14,.86);display:flex;align-items:flex-start;justify-content:center;padding:max(10px,env(safe-area-inset-top)) 10px 10px;overflow:auto;-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", eduLessonClick);
document.body.appendChild(el);
}
return el;
},
function () {
var Ls = EDU.lesson, el = document.getElementById("sch-lesson");
if (!Ls) {
if (el)
el.parentNode.removeChild(el);
if (typeof speechSynthesis !== "undefined")
try {
speechSynthesis.cancel();
}
catch (e) { }
return;
}
el = eduLessonEl();
var col = "#" + (EDU_SCOL[Ls.subj] || 0x5A6A7A).toString(16).padStart(6, "0"), D = Ls.data, r = EDU_ROOM[Ls.cid];
var h = '<div style="width:min(680px,100%);background:#FBFAF6;color:#1E2228;border-radius:8px;border-top:6px solid ' + col + ';padding:14px 16px 18px;font:15px/1.55 var(--sans,system-ui);box-shadow:0 10px 40px rgba(0,0,0,.5)">' +
'<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div><div style="font:600 19px Georgia,serif">' + esc(Ls.title) + '</div>' +
'<div style="color:#5A6068;font-size:13px">' + (r ? 'Taught by ' + esc(eduTeacherName(r)) + ' · ' : '') + eduCount(Ls.cid) + ' of 10 units done</div></div>' +
'<button data-sl="close" style="' + eduBtnCss("#5A6068") + '">Close</button></div>' +
'<div style="display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 6px">' +
eduTab("learn", "Lessons", Ls.tab) + (Ls.subj === "math" ? eduTab("practice", "Practice", Ls.tab) : "") + eduTab("books", "Books & activities", Ls.tab) + eduTab("report", "Report card", Ls.tab) + '</div>';
if (Ls.tab === "learn") {
if (!D) {
h += '<p style="color:#5A6068">' + (Ls.failed ? 'The lesson book could not be fetched. Check the connection and open it again.' : 'Taking the lesson book from the shelf…') + '</p>';
}
else {
h += '<div style="color:#3A4048;font-size:13.5px;margin-bottom:8px">' + esc(D.about || "") + '</div><div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">';
for (var u = 1; u <= 10; u++) {
var done = eduPassed(Ls.cid, u), on = u === Ls.unit;
h += '<button data-sl="unit" data-u="' + u + '" title="' + esc(D.units[u - 1] ? D.units[u - 1].t : "") + '" style="min-width:34px;padding:5px 8px;border-radius:5px;border:1px solid ' + (on ? col : "#C8CCD2") + ';background:' + (on ? col : done ? "#E4F2E6" : "#FFF") + ';color:' + (on ? "#FFF" : "#1E2228") + ';font-weight:600">' + u + (done ? " ✓" : "") + '</button>';
}
var U = D.units[Ls.unit - 1] || {};
h += '</div><div style="font:600 17px Georgia,serif;margin:4px 0 6px">Unit ' + Ls.unit + ': ' + esc(U.t || "") + '</div>' +
(U.learn || []).map(function (p) { return '<p style="margin:0 0 9px">' + esc(p) + '</p>'; }).join("") +
(U["try"] ? '<div style="background:#F0F4FA;border-left:4px solid ' + col + ';padding:8px 10px;border-radius:4px;margin:10px 0"><b>Try it.</b> ' + esc(U["try"]) + '</div>' : "") +
'<div style="margin:6px 0 10px"><button data-sl="read" style="' + eduBtnCss("#3A6AA8") + '">🔊 Read it to me</button></div>' +
'<div style="font-weight:600;margin:12px 0 4px">Check what you learned</div>';
(U.check || []).forEach(function (q, k) {
h += '<div style="margin:8px 0 4px">' + (k + 1) + '. ' + esc(q[0]) + '</div><div style="display:flex;flex-direction:column;gap:5px">';
eduOpt(Ls, k, q).forEach(function (o) {
var pk = Ls.picks[k] === o, show = Ls.marked && pk;
h += '<button data-sl="pick" data-k="' + k + '" data-o="' + esc(o) + '" style="text-align:left;padding:7px 10px;border-radius:5px;border:1px solid ' + (pk ? col : "#C8CCD2") + ';background:' + (show ? (o === q[1] ? "#DFF2E2" : "#F8E0DC") : pk ? "#EEF2F8" : "#FFF") + ';color:#1E2228">' + esc(o) + '</button>';
});
h += '</div>';
});
h += '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button data-sl="hand" style="' + eduBtnCss(col) + '">Hand it in</button>' +
(Ls.unit < 10 ? '<button data-sl="unit" data-u="' + (Ls.unit + 1) + '" style="' + eduBtnCss("#5A6068") + '">Next unit</button>' : '') +
(Ls.msg ? '<span style="font-size:14px">' + Ls.msg + '</span>' : '') + '</div>';
}
}
else if (Ls.tab === "practice") {
if (!Ls.prac)
Ls.prac = eduProblem(Ls.g);
h += '<p style="color:#3A4048;font-size:13.5px">New questions for ' + esc(eduGradeName(Ls.g)) + ' every time. Type the answer and press Check.</p>' +
'<div style="font:600 22px Georgia,serif;margin:10px 0">' + esc(Ls.prac.q) + '</div>' +
'<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><input id="sch-ans" inputmode="decimal" autocomplete="off" style="font-size:18px;padding:6px 10px;width:140px;border:1px solid #A8B0BA;border-radius:5px">' +
'<button data-sl="check" style="' + eduBtnCss(col) + '">Check</button><button data-sl="skip" style="' + eduBtnCss("#5A6068") + '">Another</button></div>' +
'<div style="margin-top:10px;font-size:14px">' + (Ls.pmsg || "") + '</div><div style="margin-top:6px;color:#5A6068;font-size:13px">Right in a row: <b>' + Ls.streak + '</b></div>';
}
else if (Ls.tab === "books") {
h += eduResourcesHtml(Ls);
}
else if (Ls.tab === "report") {
h += eduReportHtml();
}
h += '</div>';
el.innerHTML = h;
var inp = document.getElementById("sch-ans");
if (inp) {
inp.focus();
inp.onkeydown = function (e) { if (e.key === "Enter") {
e.preventDefault();
eduPracCheck();
} };
}
},
function (Ls) {
var h = '', bk = (EDU_BOOKS[Ls.subj] || {})[Ls.g] || [], ph = (EDU_PHET[Ls.subj] || {})[Ls.g] || [], op = EDU_OPEN[Ls.cid] || [];
if (bk.length) {
h += '<div style="font-weight:600;margin:8px 0 4px">Books to read (public domain, the whole book)</div>';
bk.forEach(function (b) { h += '<div style="margin:5px 0"><button data-sl="book" data-n="' + b[0] + '" style="' + eduBtnCss("#6A4A2A") + '">Read</button> <b>' + esc(b[1]) + '</b> <span style="color:#5A6068">· ' + esc(b[2]) + '</span></div>'; });
}
if (ph.length) {
h += '<div style="font-weight:600;margin:12px 0 4px">Activities to play</div>';
ph.forEach(function (k) { h += '<div style="margin:5px 0"><button data-sl="phet" data-k="' + esc(k) + '" style="' + eduBtnCss("#3A8A5A") + '">Play</button> <b>' + esc(EDU_PHET_NAME[k] || k) + '</b> <span style="color:#5A6068">· PhET Interactive Simulations, University of Colorado Boulder (CC BY 4.0)</span></div>'; });
}
if (op.length) {
h += '<div style="font-weight:600;margin:12px 0 4px">Free textbooks</div>';
op.forEach(function (o) { h += '<div style="margin:5px 0"><a target="_blank" rel="noopener noreferrer" href="' + esc(o[2]) + '" style="' + eduBtnCss("#3A6AA8") + ';text-decoration:none;display:inline-block">Open</a> <b>' + esc(o[0]) + '</b> <span style="color:#5A6068">· ' + esc(o[1]) + ' (' + esc(o[3]) + ')</span></div>'; });
}
if (!h)
h = '<p>This room teaches from its own lesson book; the library down the corridor has many more books for every age.</p>';
return h + '<p style="color:#5A6068;font-size:12.5px;margin-top:12px">Everything here is free for anyone to use: the lessons are the school\'s own; the books are in the public domain (Project Gutenberg); the activities and textbooks carry open licences.</p>';
},
function () {
var h = '<div style="font-weight:600;margin:8px 0 6px">Report card</div><div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:13px;min-width:100%">';
EDU_GRADES.forEach(function (g) {
var cs = EDU_COURSES.filter(function (c) { return c[1] === g; }), done = eduGradeDone(g);
h += '<tr><td style="padding:4px 8px 4px 0;font-weight:600;white-space:nowrap;vertical-align:top">' + esc(eduGradeName(g)) + (done ? ' <span style="color:#2A8A3A">✓ promoted</span>' : '') + '</td><td style="padding:4px 0">' +
cs.map(function (c) { var n = eduCount(c[0]); return '<span title="' + esc(c[3]) + '" style="display:inline-block;margin:2px 4px 2px 0;padding:2px 6px;border-radius:4px;background:' + (n >= 10 ? "#DFF2E2" : n ? "#FFF4D8" : "#F0F2F4") + '">' + esc(EDU_SUBJ[c[2]]) + ' ' + n + '/10</span>'; }).join("") + '</td></tr>';
});
h += '</table></div>';
var w = (eduStore()["world-odyssey"] || {}), wn = Object.keys(w).length;
h += '<div style="margin-top:10px">' + (eduDiploma() ? '<b style="color:#8A6A1A">🎓 Somnucor City School Diploma: earned.</b>' : 'The diploma is earned by finishing every course of Grades 9 to 12.') + '</div>';
h += '<div style="margin-top:6px">World Learning: the Odyssey voyage, ' + wn + ' of ' + (typeof ODL_STOPS !== "undefined" ? ODL_STOPS.length : 17) + ' places learned.</div>';
return h;
},
function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-sl]") : null;
if (!b)
return;
var Ls = EDU.lesson;
if (!Ls)
return;
var k = b.getAttribute("data-sl");
if (k === "close") {
EDU.lesson = null;
eduLessonPaint();
eduPaint(true);
return;
}
if (k === "tab") {
Ls.tab = b.getAttribute("data-t");
eduLessonPaint();
return;
}
if (k === "unit") {
Ls.unit = +b.getAttribute("data-u");
Ls.marked = false;
eduBegin();
eduLessonPaint();
var el = document.getElementById("sch-lesson");
if (el)
el.scrollTop = 0;
return;
}
if (k === "pick") {
Ls.picks[+b.getAttribute("data-k")] = b.getAttribute("data-o");
Ls.marked = false;
eduLessonPaint();
return;
}
if (k === "hand") {
eduHandIn();
return;
}
if (k === "read") {
eduReadAloud();
return;
}
if (k === "check") {
eduPracCheck();
return;
}
if (k === "skip") {
Ls.prac = eduProblem(Ls.g);
Ls.pmsg = "";
Ls.streak = 0;
eduLessonPaint();
return;
}
if (k === "book") {
eduReadBook(+b.getAttribute("data-n"));
return;
}
if (k === "phet") {
EDU.lesson = null;
eduLessonPaint();
var key = b.getAttribute("data-k"), url = "https://phet.colorado.edu/sims/html/" + key + "/latest/" + key + "_en.html";
hallViewer((EDU_PHET_NAME[key] || key) + " · PhET", url, '<a target="_blank" rel="noopener noreferrer" href="https://phet.colorado.edu">PhET Interactive Simulations</a>, University of Colorado Boulder, licensed CC BY 4.0.', { link: url });
return;
}
},
function (n) {
EDU.lesson = null;
eduLessonPaint();
var all = [];
Object.keys(EDU_BOOKS).forEach(function (s) { Object.keys(EDU_BOOKS[s]).forEach(function (g) { all = all.concat(EDU_BOOKS[s][g]); }); });
var b = all.filter(function (q) { return q[0] === n; })[0];
if (!b)
return;
var lb = (typeof LIB_BOOKS !== "undefined") ? LIB_BOOKS.filter(function (q) { return q[0] === n; })[0] : null;
var book = lb || [n, b[1], b[2], 4, "all", ""];
if (typeof libReader === "function")
libReader(book, function () { if (typeof libReadPage === "function")
libReadPage(book); });
else if (typeof libReadPage === "function")
libReadPage(book);
},
function () {
var Ls = EDU.lesson;
if (!Ls || !Ls.data || typeof speechSynthesis === "undefined")
return;
var U = Ls.data.units[Ls.unit - 1];
if (!U)
return;
try {
speechSynthesis.cancel();
var t = [U.t].concat(U.learn || []).concat(U["try"] ? ["Try it. " + U["try"]] : []).join(". ");
var s = new SpeechSynthesisUtterance(t);
s.rate = EDU_GRADES.indexOf(Ls.g) < 3 ? 0.9 : 1;
if (Ls.subj === "lang")
s.lang = "en-US";
speechSynthesis.speak(s);
}
catch (e) { }
},
function () {
var Ls = EDU.lesson, inp = document.getElementById("sch-ans");
if (!Ls || !Ls.prac || !inp)
return;
if (eduCheckAnswer(Ls.prac, inp.value)) {
Ls.streak++;
Ls.pmsg = '<b style="color:#2A8A3A">Right!</b> ' + esc(Ls.prac.q) + ' ' + esc(String(Ls.prac.a));
Ls.prac = eduProblem(Ls.g);
if (Ls.streak === 10)
setStatus("<b>Ten right in a row.</b> Well done.");
}
else {
Ls.pmsg = '<b style="color:#B03A2A">Not quite.</b> Try again, or press Another.';
Ls.streak = 0;
}
eduLessonPaint();
},
function () {
var Ls = EDU.lesson;
if (!Ls || !Ls.data)
return;
var U = Ls.data.units[Ls.unit - 1];
if (!U)
return;
var right = (U.check || []).every(function (q, k) { return Ls.picks[k] === q[1]; }), all = (U.check || []).every(function (q, k) { return Ls.picks[k] != null; });
if (!all) {
Ls.msg = "Answer both questions first.";
eduLessonPaint();
return;
}
Ls.marked = true;
if (!right) {
Ls.msg = '<span style="color:#B03A2A">Not yet: the red one is wrong. Read the unit again and try once more.</span>';
eduLessonPaint();
return;
}
var cid = Ls.cid, u = Ls.unit;
function done(say) {
var st = eduStore(), c = st[cid] || (st[cid] = {}), was = eduCourseDone(cid);
c[u] = c[u] || new Date().toISOString();
if (typeof save === "function")
save();
Ls.msg = '<b style="color:#2A8A3A">' + esc(say || ("Unit " + u + " passed.")) + '</b>';
if (!was && eduCourseDone(cid)) {
Ls.msg += ' <b>The whole course is done: a certificate is in your backpack.</b>';
setStatus("<b>Course complete: " + esc(Ls.title) + ".</b> The certificate is in your backpack.");
if (typeof pwBurst === "function") {
var P = camera.position;
pwBurst(P.x, P.y - 1, P.z, EDU_SCOL[Ls.subj] || 0xC9A040, 40, [0.8, 1.2, 0.8], 1.2, "swirl", 0.16);
}
}
eduLessonPaint();
eduPaint(true);
}
if (typeof signedIn === "function" && signedIn()) {
var wait = 20000 - (Date.now() - Ls.t0);
if (wait > 0) {
Ls.msg = "Read it through first: hand it in again in " + Math.ceil(wait / 1000) + " seconds.";
eduLessonPaint();
return;
}
cityRpc("school_pass", { p_course: cid, p_unit: u }).then(function (o) {
if (o && o.ok)
done(o.say);
else if (o && o.say && /not over|read/i.test(o.say)) {
Ls.msg = esc(o.say);
eduLessonPaint();
}
else
done();
}).catch(function () { done(); });
}
else
done("Unit " + u + " passed (kept on this device; sign in to keep it on your record).");
},
function (force) {
var el = hallPanel("sch-panel", "#3A6AA8");
if (!el)
return;
var r = eduWhere();
if (!r || !walkMode || EDU.lesson || (r.kind === "corridor" && LITE)) {
el.style.display = "none";
return;
}
var key = r.id + "|" + (EDU.badge ? 1 : 0);
if (!force && el.dataset.k === key && el.style.display === "block")
return;
el.dataset.k = key;
el.style.display = "block";
var h = '<h4 style="color:#BFD4F4">' + esc(r.name) + '</h4>';
if (r.kind === "class") {
var n = eduCount(r.id), hr = eduHours(r.job), now = (typeof cityHourNow === "function") ? cityHourNow() : 12, on = eduOnShift(hr[0], hr[1], now);
h += '<div class="dim">' + (on ? esc(eduTeacherName(r)) + ' is teaching.' : 'Class is over for the day; the lesson book on the desk teaches in the teacher\'s place.') + ' You have done ' + n + ' of 10 units.</div>' +
'<div class="row"><button class="btn" data-sch="open" data-c="' + r.id + '">' + (n ? (n >= 10 ? 'Go over the lessons' : 'Carry on with the lessons') : 'Open the lessons') + '</button>' +
(r.subj === "math" ? '<button class="btn" data-sch="prac" data-c="' + r.id + '">Practice</button>' : '') +
'<button class="btn" data-sch="books" data-c="' + r.id + '">Books &amp; activities</button><button class="btn" data-sch="report" data-c="' + r.id + '">Report card</button></div>';
}
else if (r.kind === "hall") {
h += '<div class="dim">Classrooms in this hall:</div>';
EDU_ROOMS.forEach(function (q) { if (q.hall === r.id && q.kind === "class")
h += '<div class="item" style="padding:4px 0">' + esc(q.name) + ' <span class="dim">· ' + eduCount(q.id) + '/10</span> <button class="btn" data-sch="open" data-c="' + q.id + '">Lessons</button></div>'; });
}
else if (r.kind === "corridor") {
h += '<div class="dim">West: the elementary wing (Kindergarten to Grade 5) and the playground. East: middle and high school (Grades 6 to 12), the shop, the makerspace and the weight room. North: the gym and the auditorium. South: the library, the lobby, the cafeteria and the offices.</div>';
}
else {
if (r.note)
h += '<div class="dim">' + esc(r.note) + '</div>';
if (r.lock && !EDU.badge)
h += '<div style="color:#F4C080;margin-top:4px">🔒 Staff only. A school employee badge opens the door.</div>';
var row = '';
if (r.id === "reception" || r.id === "atrium" || r.id === "vestibule")
row += '<button class="btn" data-sch="report">My report card</button>';
if (r.id === "library") {
row += '<button class="btn" data-sch="shelf">Reading lists for every grade</button>';
if (typeof libCatalogue === "function")
row += '<button class="btn" data-sch="lib">The city library\'s catalogue</button>';
}
if (r.id === "district" || r.id === "super")
row += '<button class="btn" data-sch="world">World Learning programmes</button>' + (EDU.badge ? '<button class="btn" data-sch="roll">The school roll</button>' : '');
if (r.id === "cafeteria")
row += '<button class="btn" data-sch="lunch">What\'s for lunch?</button>';
if (r.id === "career")
row += '<button class="btn" data-sch="jobs">Jobs at the school</button>';
var tk = EDU_TALK[r.id === "principal" ? "principal" : r.id];
if (tk && (r.id !== "principal" || EDU.badge))
row += '<button class="btn" data-sch="talk" data-t="' + r.id + '">Talk to ' + esc(tk[0]) + '</button>';
if (r.id === "reception")
row += '<button class="btn" data-sch="talk" data-t="principal">Ask for the principal</button>';
if (row)
h += '<div class="row">' + row + '</div>';
}
el.innerHTML = h;
},
function () {
var h = '<div style="font-weight:600;margin:8px 0 6px">Reading lists</div>';
EDU_GRADES.forEach(function (g) {
var L = (EDU_BOOKS.ela[g] || []);
if (!L.length)
return;
h += '<div style="margin:8px 0 2px;font-weight:600">' + esc(eduGradeName(g)) + '</div>' + L.map(function (b) { return '<div style="margin:3px 0"><button data-sl="book" data-n="' + b[0] + '" style="' + eduBtnCss("#6A4A2A") + '">Read</button> ' + esc(b[1]) + ' <span style="color:#5A6068">· ' + esc(b[2]) + '</span></div>'; }).join("");
});
EDU.lesson = { cid: "gK-ela", g: "K", subj: "ela", title: "The library media centre", unit: 1, tab: "html", picks: {}, html: h };
eduLessonPaintHtml();
},
function () {
var Ls = EDU.lesson, el = eduLessonEl();
el.innerHTML = '<div style="width:min(680px,100%);background:#FBFAF6;color:#1E2228;border-radius:8px;border-top:6px solid #3A6AA8;padding:14px 16px 18px;font:15px/1.55 var(--sans,system-ui)">' +
'<div style="display:flex;justify-content:space-between"><div style="font:600 19px Georgia,serif">' + esc(Ls.title) + '</div><button data-sl="close" style="' + eduBtnCss("#5A6068") + '">Close</button></div>' + Ls.html + '</div>';
},
function () {
var w = eduStore()["world-odyssey"] || {}, n = Object.keys(w).length, tot = (typeof ODL_STOPS !== "undefined" ? ODL_STOPS.length : 17);
var h = '<p>The Department of Education adds learning to Somnucor\'s worlds, so every place you can dream of can also teach. Each programme is free and open to everyone.</p>' +
'<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>The Odyssey voyage</b> · the Endless Sea<br>Sail the Wayfarer from the Last Pier at the edge of the Nightmare Wilds to every place Homer describes. At each one: the story, the real place and the science behind it, a choice Odysseus had to make, and two questions. Collect every stamp in the voyage log for the Odyssey Scholar certificate.<br>' +
'<span style="color:#2A6A3A">You have learned ' + n + ' of ' + tot + ' places.</span></div>' +
'<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>Already teaching</b><br>The Learning Gallery on Station Aurora (with Lumen the robot); the city library\'s learning corner; the Academy of the Arcane, where the science behind each power is taught.</div>' +
'<div style="border:1px dashed #C8CCD2;border-radius:6px;padding:10px;margin:8px 0;color:#5A6068"><b>Next from this office</b><br>More worlds will get their own programmes, starting where the stories already live: Neverland, the Underdark, the North Pole and the planets and moons.</div>';
EDU.lesson = { cid: "gK-ela", g: "K", subj: "ela", title: "World Learning · Department of Education", unit: 1, tab: "html", picks: {}, html: h };
eduLessonPaintHtml();
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in to see the school roll.");
return;
}
cityRpc("school_roll", {}).then(function (o) {
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "The roll is kept by the principal and the Department of Education."));
return;
}
var h = '<p>Pupils who have passed a unit: <b>' + (o.students || 0) + '</b> · units passed today: <b>' + (o.today || 0) + '</b> · courses finished: <b>' + (o.courses || 0) + '</b> · diplomas: <b>' + (o.diplomas || 0) + '</b></p>';
h += '<div style="font-size:13px">' + Object.keys(o.grades || {}).map(function (g) { return esc(eduGradeName(g)) + ': ' + o.grades[g] + ' units'; }).join(" · ") + '</div>';
EDU.lesson = { cid: "gK-ela", g: "K", subj: "ela", title: "The school roll", unit: 1, tab: "html", picks: {}, html: h };
eduLessonPaintHtml();
}).catch(function () { setStatus("The roll could not be fetched."); });
}
];
});
