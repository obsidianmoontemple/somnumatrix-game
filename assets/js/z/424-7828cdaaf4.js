/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(424, function () {
"use strict";
return [
function (k) {
var G = WDG.gc[k];
if (G)
return G;
var lo = wdgLite();
if (k === "box")
G = new THREE.BoxGeometry(1, 1, 1);
else if (k === "cyl")
G = new THREE.CylinderGeometry(0.5, 0.5, 1, lo ? 8 : 14);
else if (k === "cone")
G = new THREE.ConeGeometry(0.5, 1, lo ? 8 : 14);
else if (k === "sph")
G = new THREE.SphereGeometry(0.5, lo ? 8 : 12, lo ? 6 : 9);
else if (k === "flower")
G = new THREE.IcosahedronGeometry(0.5, 0);
else if (k === "plane")
G = new THREE.PlaneGeometry(1, 1);
else if (k === "disc")
G = new THREE.CircleGeometry(0.5, lo ? 16 : 28);
else if (k === "ring")
G = new THREE.TorusGeometry(0.5, 0.06, 6, lo ? 16 : 24);
else if (/^arch:/.test(k)) {
var a = k.split(":");
G = new THREE.TorusGeometry(+a[1], +a[2], lo ? 6 : 8, lo ? 14 : 24, Math.PI);
}
else if (/^tor:/.test(k)) {
var b = k.split(":");
G = new THREE.TorusGeometry(+b[1], +b[2], 6, lo ? 16 : 28);
}
else
G = new THREE.BoxGeometry(1, 1, 1);
WDG.gc[k] = G;
return G;
},
function (col, o) {
o = o || {};
var key = col + "|" + (o.glow ? 1 : 0) + "|" + (o.op || 1) + "|" + (o.ds ? 1 : 0);
var M = WDG.mc[key];
if (M)
return M;
if (o.glow)
M = new THREE.MeshBasicMaterial({ color: col, transparent: (o.op || 1) < 1, opacity: o.op || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide, depthWrite: (o.op || 1) >= 1 });
else
M = new THREE.MeshLambertMaterial({ color: col, transparent: (o.op || 1) < 1, opacity: o.op || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
WDG.mc[key] = M;
return M;
},
function (P, geo, col, sx, sy, sz, x, y, z, o) {
o = o || {};
var m = new THREE.Mesh(wdgGeo(geo), wdgMat(col, o));
m.scale.set(sx, sy, sz);
m.position.set(x, y + P.gy(x, z), z);
if (o.ry)
m.rotation.y = o.ry;
if (o.rx)
m.rotation.x = o.rx;
if (o.rz)
m.rotation.z = o.rz;
m.raycast = function () { };
m.matrixAutoUpdate = !!o.live;
m.updateMatrix();
(o.to || P.g).add(m);
return m;
},
function (P, geo, col, list, o) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(wdgGeo(geo), wdgMat(col, o), list.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3();
list.forEach(function (q, i) { E.set(q.rx || 0, q.ry || 0, q.rz || 0); Q.setFromEuler(E); S.set(q.sx, q.sy, q.sz); V.set(q.x, q.y + (q.flat ? 0 : P.gy(q.x, q.z)), q.z); M.compose(V, Q, S); im.setMatrixAt(i, M); });
im.instanceMatrix.needsUpdate = true;
im.raycast = function () { };
im.matrixAutoUpdate = false;
im.updateMatrix();
im.frustumCulled = false;
P.g.add(im);
P.batches.push(im);
return im;
},
function (P, x, y, z, r, n, cols, seed) {
var h = wdgHash(seed || (x + "," + z));
for (var i = 0; i < n; i++) {
h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0;
var a = (h % 628) / 100, d = ((h >>> 10) % 100) / 100 * r, u = ((h >>> 17) % 100) / 100;
var s = 0.09 + ((h >>> 5) % 6) / 100;
P.flowers[(h >>> 3) % cols.length].push({ x: x + Math.cos(a) * d, y: y + (u - 0.5) * r * 0.8, z: z + Math.sin(a) * d, sx: s, sy: s * 0.8, sz: s, ry: a });
}
P.leaves.push({ x: x, y: y - r * 0.2, z: z, sx: r * 1.5, sy: r * 1.0, sz: r * 1.5 });
},
function (P) {
var C = P.cul, c0 = C.col[0], c1 = C.col[1], fl = C.col[2], d = P.tier.decor, gold = d >= 5, W = 1.7, H = 3.1;
var post = gold ? WDG_GOLD : (C.s === "torii" ? c1 : C.s === "mandap" ? c0 : c1);
var flcols = P.flowerCols;
function bunchesOnArch(R, y0, n, per) { for (var i = 0; i <= n; i++) {
var a = Math.PI * i / n;
wdgBunch(P, Math.cos(a) * R, y0 + Math.sin(a) * R, 0, 0.28, per, flcols, "a" + i);
} }
if (C.s === "arch" || C.s === "willow" || C.s === "table") {
var R = W, t = C.s === "willow" ? 0.11 : 0.07, col = C.s === "willow" ? WDG_WOOD : (gold ? WDG_GOLD : WDG_WHITE);
[-R, R].forEach(function (x) { wdgPut(P, "cyl", col, t * 2, H - R + 0.3, t * 2, x, (H - R + 0.3) / 2, 0); });
wdgPut(P, "arch:" + R + ":" + t, col, 1, 1, 1, 0, H - R + 0.3, 0);
if (C.s === "willow") {
var rc = [C.col[1], 0xC8A848, 0xF0E8C0, 0x8A2A2A];
for (var i = 1; i < 8; i++) {
var a = Math.PI * i / 8, x = Math.cos(a) * R, y = H - R + 0.3 + Math.sin(a) * R;
wdgPut(P, "box", rc[i % 4], 0.05, 0.7, 0.01, x, y - 0.38, 0.04);
}
bunchesOnArch(R, H - R + 0.3, d >= 3 ? 8 : 4, d >= 3 ? 8 : 5);
}
else
bunchesOnArch(R, H - R + 0.3, d >= 2 ? 10 : 4, d >= 4 ? 12 : d >= 2 ? 8 : 5);
if (C.s === "table") {
wdgPut(P, "box", WDG_DARKWOOD, 1.6, 0.06, 0.7, 0, 0.76, -0.3);
wdgPut(P, "box", c0, 1.64, 0.7, 0.74, 0, 0.38, -0.3);
wdgPut(P, "box", 0x2A3A5A, 0.36, 0.04, 0.26, 0.3, 0.81, -0.3);
wdgPut(P, "box", WDG_WHITE, 0.34, 0.01, 0.24, 0.3, 0.835, -0.3);
wdgBunch(P, -0.55, 0.95, -0.3, 0.18, 6, flcols, "tbl");
}
}
else if (C.s === "chuppah" || C.s === "canopy" || C.s === "mandap") {
var pw = C.s === "mandap" ? 1.5 : 1.3, ph = C.s === "mandap" ? 3.0 : 2.6, pt = C.s === "mandap" ? 0.2 : 0.08;
[[-pw, -pw * 0.6], [pw, -pw * 0.6], [-pw, pw * 0.6], [pw, pw * 0.6]].forEach(function (q) {
wdgPut(P, "cyl", gold ? WDG_GOLD : (C.s === "mandap" ? c0 : C.s === "canopy" ? WDG_GOLD : WDG_WOOD), pt, ph, pt, q[0], ph / 2, q[1]);
if (C.s === "mandap") {
wdgPut(P, "box", c1, pt * 1.6, 0.18, pt * 1.6, q[0], 0.09, q[1]);
wdgPut(P, "box", c1, pt * 1.5, 0.14, pt * 1.5, q[0], ph - 0.07, q[1]);
}
if (d >= 2)
wdgBunch(P, q[0], ph - 0.1, q[1], 0.22, d >= 4 ? 9 : 5, flcols, "p" + q[0] + q[1]);
});
if (C.s === "chuppah") {
wdgPut(P, "box", c0, pw * 2 + 0.2, 0.03, pw * 1.2 + 0.2, 0, ph + 0.02, 0, { ds: true });
wdgPut(P, "box", c1, pw * 2 + 0.24, 0.12, 0.03, 0, ph - 0.04, pw * 0.6 + 0.11);
wdgPut(P, "box", c1, pw * 2 + 0.24, 0.12, 0.03, 0, ph - 0.04, -pw * 0.6 - 0.11);
}
else if (C.s === "canopy") {
wdgPut(P, "box", c0, pw * 2 + 0.3, 0.04, pw * 1.2 + 0.3, 0, ph + 0.02, 0);
wdgPut(P, "box", c1, pw * 2 + 0.32, 0.3, 0.03, 0, ph - 0.12, pw * 0.6 + 0.15);
wdgPut(P, "box", C.col[2], pw * 2 + 0.32, 0.14, 0.035, 0, ph - 0.33, pw * 0.6 + 0.16);
[-pw, pw].forEach(function (x) { wdgPut(P, "box", c1, 0.5, ph - 0.3, 0.02, x, ph / 2 + 0.1, pw * 0.6 + 0.06); });
}
else {
wdgPut(P, "box", c1, pw * 2 + 0.4, 0.22, pw * 1.2 + 0.4, 0, ph + 0.11, 0);
wdgPut(P, "sph", c0, pw * 1.9, 1.2, pw * 1.2, 0, ph + 0.22, 0);
wdgPut(P, "cone", WDG_GOLD, 0.3, 0.6, 0.3, 0, ph + 0.95, 0);
for (var g = 0; g < 4; g++) {
var gx0 = g < 2 ? -pw : pw, gz0 = g % 2 ? pw * 0.6 : -pw * 0.6;
for (var k = 0; k < 9; k++) {
var u = k / 8, sag = Math.sin(u * Math.PI) * 0.45;
P.flowers[0].push({ x: g < 2 ? -pw + u * pw * 2 : gx0, y: ph - 0.25 - sag, z: g < 2 ? gz0 : -pw * 0.6 + u * pw * 1.2, sx: 0.09, sy: 0.09, sz: 0.09 });
}
}
wdgPut(P, "box", WDG_GOLD, 0.9, 0.2, 0.9, 0, 0.1, 0.15);
wdgPut(P, "box", 0x6A4A3A, 0.6, 0.12, 0.6, 0, 0.26, 0.15);
P.flames.push(wdgPut(P, "cone", WDG_FLAME, 0.32, 0.55, 0.32, 0, 0.55, 0.15, { glow: true, live: true }));
P.flames.push(wdgPut(P, "cone", 0xFFE0A0, 0.16, 0.32, 0.16, 0, 0.5, 0.15, { glow: true, live: true }));
}
}
else if (C.s === "circle") {
var mR = 1.6;
[-mR, mR].forEach(function (x) { wdgPut(P, "cyl", 0x2A2632, 0.12, 1.6, 0.12, x, 0.8, -0.2); });
wdgPut(P, "arch:" + mR + ":0.08", 0xC8CCD8, 1, 1, 1, 0, 1.6, -0.2);
var moon = wdgPut(P, "tor:0.42:0.07", 0xE8ECF4, 1, 1, 1, 0, 3.3, -0.2, { glow: true });
moon.scale.set(1, 1, 0.5);
wdgPut(P, "box", 0x2A2632, 0.9, 0.85, 0.5, 0, 0.42, -0.7);
wdgPut(P, "cyl", 0xC8CCD8, 0.1, 0.22, 0.1, 0, 0.96, -0.7);
for (var cn = 0; cn < (wdgLite() ? 10 : 16); cn++) {
var ca = cn / (wdgLite() ? 10 : 16) * Math.PI * 2, cx = Math.cos(ca) * 2.4, cz = 1.2 + Math.sin(ca) * 2.4;
P.candles.push({ x: cx, z: cz, h: 0.3 + (cn % 3) * 0.12 });
}
bunchesOnArch(mR, 1.6, d >= 3 ? 8 : 4, d >= 3 ? 8 : 5);
}
else if (C.s === "arches") {
[-1.9, 0, 1.9].forEach(function (x, i) {
var w = i === 1 ? 1.0 : 0.7, h = i === 1 ? 3.0 : 2.4;
[-w, w].forEach(function (dx) { wdgPut(P, "box", WDG_WHITE, 0.16, h, 0.16, x + dx, h / 2, i === 1 ? 0 : -0.3); });
wdgPut(P, "box", WDG_WHITE, 0.14, w * 1.2, 0.16, x - w / 2, h + w * 0.35, i === 1 ? 0 : -0.3, { rz: -0.9 });
wdgPut(P, "box", WDG_WHITE, 0.14, w * 1.2, 0.16, x + w / 2, h + w * 0.35, i === 1 ? 0 : -0.3, { rz: 0.9 });
wdgPut(P, "box", c1, w * 2, 0.08, 0.18, x, h, i === 1 ? 0 : -0.3);
if (d >= 2)
wdgBunch(P, x, h + w * 0.7, i === 1 ? 0 : -0.3, 0.2, d >= 4 ? 8 : 5, flcols, "ar" + i);
});
if (d >= 3)
[-1, 1].forEach(function (s) { wdgPut(P, "box", c1, 0.6, 2.6, 0.02, s * 1.0, 1.6, 0.12, { op: 0.85, ds: true }); });
}
else if (C.s === "redgate") {
[-1.6, 1.6].forEach(function (x) { wdgPut(P, "cyl", c0, 0.22, 3.0, 0.22, x, 1.5, 0); wdgPut(P, "box", WDG_GOLD, 0.3, 0.12, 0.3, x, 0.06, 0); });
wdgPut(P, "box", c0, 4.0, 0.22, 0.3, 0, 3.0, 0);
wdgPut(P, "box", WDG_GOLD, 4.2, 0.08, 0.34, 0, 3.15, 0);
[-2.0, 2.0].forEach(function (x) { wdgPut(P, "box", c0, 0.5, 0.14, 0.3, x + (x < 0 ? -0.15 : 0.15), 3.14, 0, { rz: x < 0 ? -0.35 : 0.35 }); });
var sign = wdgPut(P, "plane", 0xFFFFFF, 0.9, 0.9, 1, 0, 2.3, 0.02, { glow: true, ds: true });
sign.material = wdgXiMat();
[-1.6, 1.6].forEach(function (x) { var l = wdgPut(P, "sph", c0, 0.42, 0.5, 0.42, x, 2.5, 0.4, { glow: true }); wdgPut(P, "cyl", WDG_GOLD, 0.2, 0.06, 0.2, x, 2.78, 0.4); wdgPut(P, "cyl", WDG_GOLD, 0.2, 0.06, 0.2, x, 2.22, 0.4); });
if (d >= 2)
wdgBunch(P, 0, 3.25, 0, 0.3, d >= 4 ? 10 : 6, flcols, "rg");
}
else if (C.s === "torii") {
[-1.5, 1.5].forEach(function (x) { wdgPut(P, "cyl", c1, 0.26, 3.3, 0.26, x, 1.65, 0); wdgPut(P, "cyl", 0x1A1A1A, 0.32, 0.25, 0.32, x, 0.12, 0); });
wdgPut(P, "box", c1, 3.9, 0.2, 0.24, 0, 2.65, 0);
wdgPut(P, "box", c1, 4.3, 0.22, 0.36, 0, 3.3, 0);
wdgPut(P, "box", 0x1A1A1A, 4.6, 0.14, 0.42, 0, 3.45, 0);
wdgPut(P, "box", c1, 0.18, 0.5, 0.16, 0, 2.95, 0);
wdgPut(P, "box", WDG_WHITE, 0.9, 0.4, 0.45, 0, 0.2, -0.5);
if (d >= 2)
[-2.2, 2.2].forEach(function (x) { wdgBunch(P, x, 0.9, 0.2, 0.3, d >= 4 ? 10 : 6, flcols, "tr" + x); wdgPut(P, "cyl", 0x6A6A6A, 0.3, 0.7, 0.3, x, 0.35, 0.2); });
}
else if (C.s === "iconstand") {
wdgPut(P, "box", WDG_WHITE, 1.0, 0.9, 0.7, 0, 0.45, -0.4);
wdgPut(P, "box", WDG_GOLD, 1.04, 0.06, 0.74, 0, 0.92, -0.4);
wdgPut(P, "box", WDG_GOLD, 0.3, 0.06, 0.22, -0.22, 0.98, -0.4);
wdgPut(P, "cyl", WDG_DARKWOOD, 0.06, 1.3, 0.06, 1.4, 0.65, -0.6);
var ic = wdgPut(P, "box", WDG_GOLD, 0.55, 0.7, 0.05, 1.4, 1.5, -0.6, { ry: -0.4 });
wdgPut(P, "box", 0x6A2A1E, 0.42, 0.56, 0.02, 1.4, 1.5, -0.57, { ry: -0.4 });
[-0.6, 0.6].forEach(function (x) { P.candles.push({ x: x, z: -0.4, h: 1.25, stand: true }); });
if (d >= 2)
wdgBunch(P, 0, 1.1, -0.55, 0.22, d >= 4 ? 10 : 6, flcols, "ic");
if (d >= 3) {
var R2 = W;
[-R2, R2].forEach(function (x) { wdgPut(P, "cyl", gold ? WDG_GOLD : WDG_WHITE, 0.14, H - R2 + 0.3, 0.14, x, (H - R2 + 0.3) / 2, 0.4); });
wdgPut(P, "arch:" + R2 + ":0.07", gold ? WDG_GOLD : WDG_WHITE, 1, 1, 1, 0, H - R2 + 0.3, 0.4);
bunchesOnArch(R2, H - R2 + 0.3, 8, 6);
}
}
else if (C.s === "runestones") {
for (var s = 0; s < 7; s++) {
var sa = Math.PI * (0.1 + 0.8 * s / 6), sx = Math.cos(sa) * 3.2, sz = -Math.sin(sa) * 1.6 - 0.3, sh = 1.6 + (s % 3) * 0.45;
wdgPut(P, "box", WDG_STONE, 0.6, sh, 0.4, sx, sh / 2, sz, { ry: sa, rz: ((s % 3) - 1) * 0.04 });
}
wdgPut(P, "box", 0x6A6660, 1.4, 0.75, 0.7, 0, 0.37, -0.6);
[-2.2, 2.2].forEach(function (x) {
wdgPut(P, "cyl", WDG_DARKWOOD, 0.09, 1.7, 0.09, x, 0.85, 0.6);
wdgPut(P, "cyl", 0x3A3A3A, 0.18, 0.18, 0.18, x, 1.75, 0.6);
P.flames.push(wdgPut(P, "cone", WDG_FLAME, 0.2, 0.4, 0.2, x, 2.0, 0.6, { glow: true, live: true }));
});
if (d >= 2)
wdgBunch(P, 0, 0.85, -0.6, 0.22, d >= 4 ? 9 : 5, flcols, "rs");
}
},
function () {
if (WDG_XI)
return WDG_XI;
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#B01818";
x.fillRect(0, 0, 128, 128);
x.strokeStyle = "#E8C048";
x.lineWidth = 6;
x.strokeRect(5, 5, 118, 118);
x.fillStyle = "#F4D468";
x.font = "bold 92px serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText("囍", 64, 70);
var T = new THREE.CanvasTexture(c);
WDG_XI = new THREE.MeshBasicMaterial({ map: T, side: THREE.DoubleSide });
return WDG_XI;
},
function (P, n) {
var d = P.tier.decor, cols = d >= 4 ? 5 : d >= 3 ? 4 : 3, per = cols * 2, rows = Math.max(2, Math.ceil(n / per)), z0 = 3.6, gap = d >= 3 ? 1.25 : 1.15, seats = [];
var seat = [], back = [], legs = [], sash = [], gold = d >= 5, col = gold ? WDG_GOLD : (d >= 3 ? WDG_WHITE : (P.cul.k === "norse" ? WDG_WOOD : 0xE8E2D6));
for (var r = 0; r < rows; r++)
for (var s = 0; s < 2; s++)
for (var c = 0; c < cols; c++) {
var x = (s ? 1 : -1) * (1.25 + c * 0.62), z = z0 + r * gap;
seat.push({ x: x, y: 0.45, z: z, sx: 0.46, sy: 0.05, sz: 0.44 });
back.push({ x: x, y: 0.72, z: z + 0.21, sx: 0.46, sy: 0.5, sz: 0.04 });
if (!wdgLite())
[[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]].forEach(function (q) { legs.push({ x: x + q[0], y: 0.22, z: z + q[1], sx: 0.035, sy: 0.44, sz: 0.035 }); });
else
legs.push({ x: x, y: 0.22, z: z, sx: 0.38, sy: 0.44, sz: 0.36 });
if (d >= 3)
sash.push({ x: x, y: 0.7, z: z + 0.235, sx: 0.12, sy: 0.52, sz: 0.02 });
seats.push({ x: x, z: z, y: 0, h: 0.47, face: Math.PI, row: r });
}
wdgBatch(P, "box", col, seat);
wdgBatch(P, "box", col, back);
wdgBatch(P, "box", gold ? 0xB89030 : col, legs);
if (sash.length)
wdgBatch(P, "box", P.cul.col[1], sash);
P.rows = rows;
P.rowGap = gap;
P.z0 = z0;
P.cols = cols;
return seats;
},
function (P) {
var d = P.tier.decor, C = P.cul, lite = wdgLite(), rows = P.rows || 4, z0 = P.z0 || 3.6, gap = P.rowGap || 1.2, zEnd = z0 + rows * gap + 0.6, cols = P.cols || 3;
var halfW = 1.25 + cols * 0.62 + 0.4;
if (d >= 2 && !P.ev) {
wdgPut(P, "box", d >= 4 ? C.col[1] : WDG_WHITE, 1.3, 0.02, zEnd - 1.2, 0, 0.012, (zEnd + 1.2) / 2);
if (d >= 4)
wdgPut(P, "box", WDG_GOLD, 1.42, 0.015, zEnd - 1.2, 0, 0.008, (zEnd + 1.2) / 2);
var pet = [], h = wdgHash(P.id + "pet");
for (var i = 0; i < (lite ? 20 : 60); i++) {
h = Math.imul(h ^ (h >>> 13), 2654435761) >>> 0;
pet.push({ x: ((h % 100) / 100 - 0.5) * 1.2, y: 0.03, z: 1.4 + ((h >>> 8) % 1000) / 1000 * (zEnd - 1.6), sx: 0.06, sy: 0.004, sz: 0.05, ry: (h % 628) / 100 });
}
wdgBatch(P, "box", P.flowerCols[0], pet);
}
var stands = [], lan = [], lanTop = [];
for (var r = 0; r < rows; r++) {
var z = z0 + r * gap;
if (d >= 2 && (d >= 3 || r % 2 === 0))
[-1, 1].forEach(function (s) { stands.push({ x: s * 0.95, y: 0.45, z: z, sx: 0.06, sy: 0.9, sz: 0.06 }); wdgBunch(P, s * 0.95, 0.98, z, 0.16, d >= 4 ? 7 : 4, P.flowerCols, "st" + r + s); });
if (d >= 3)
[-1, 1].forEach(function (s) { lan.push({ x: s * 0.75, y: 0.17, z: z + gap / 2, sx: 0.18, sy: 0.32, sz: 0.18 }); lanTop.push({ x: s * 0.75, y: 0.35, z: z + gap / 2, sx: 0.2, sy: 0.04, sz: 0.2 }); P.candles.push({ x: s * 0.75, z: z + gap / 2, h: 0.05, lantern: true }); });
}
wdgBatch(P, "cyl", d >= 5 ? WDG_GOLD : 0xD8D0C0, stands);
wdgBatch(P, "box", 0xF8F0E0, lan, { op: 0.35 });
wdgBatch(P, "box", d >= 5 ? WDG_GOLD : 0x2A2A2A, lanTop);
if (d >= 3 && C.s !== "chuppah" && C.s !== "mandap" && C.s !== "canopy" && C.s !== "redgate") {
[-1, 1].forEach(function (s) { wdgPut(P, "box", C.k === "moon" ? 0x6A5A8A : WDG_WHITE, 0.7, 2.5, 0.02, s * 1.75, 1.55, 0.15, { op: 0.8, ds: true, rz: s * 0.06 }); });
}
if (d >= 4) {
var bw = 6.4, bh = 3.4, bz = -1.4;
wdgPut(P, "box", 0x2E4A2A, bw, bh, 0.2, 0, bh / 2, bz);
var n = lite ? 60 : 220, hh = wdgHash(P.id + "wall");
for (var j = 0; j < n; j++) {
hh = Math.imul(hh ^ (hh >>> 15), 2246822519) >>> 0;
var s2 = 0.1 + (hh % 5) / 60;
P.flowers[(hh >>> 4) % P.flowerCols.length].push({ x: ((hh % 1000) / 1000 - 0.5) * bw, y: ((hh >>> 10) % 1000) / 1000 * bh, z: bz + 0.12, sx: s2, sy: s2, sz: s2 * 0.6 });
}
var posts = [], pl = [], stepZ = lite ? 4 : 2.5;
if (!P.A.indoor) {
for (var pz = 1.5; pz < zEnd; pz += stepZ)
[-1, 1].forEach(function (s) { var x = s * (halfW + 0.3); posts.push({ x: x, y: 1.6, z: pz, sx: 0.08, sy: 3.2, sz: 0.08 }); pl.push({ x: x * 0.55, y: 2.9, z: pz, sx: 0.24, sy: 0.3, sz: 0.24 }); });
wdgBatch(P, "cyl", d >= 5 ? WDG_GOLD : WDG_DARKWOOD, posts);
wdgBatch(P, "sph", 0xFFE8B8, pl, { glow: true });
if (!lite)
[-1, 1].forEach(function (s) { wdgPut(P, "box", 0x2A2A2A, 0.02, 0.02, zEnd - 1.5, s * (halfW + 0.3) * 0.78, 3.08, (zEnd + 1.5) / 2); });
}
}
if (d >= 5) {
var pil = [], ban = [], ban2 = [];
for (var pr = 0; pr < rows; pr += 2)
[-1, 1].forEach(function (s) {
var x = s * (halfW + 1.0), z = z0 + pr * gap;
pil.push({ x: x, y: 1.3, z: z, sx: 0.36, sy: 2.6, sz: 0.36 });
wdgBunch(P, x, 2.8, z, 0.45, lite ? 8 : 18, P.flowerCols, "pl" + pr + s);
ban.push({ x: x, y: 2.2, z: z + gap, sx: 0.05, sy: 4.4, sz: 0.05 });
ban2.push({ x: x + s * 0.01, y: 3.3, z: z + gap + 0.28, sx: 0.02, sy: 1.6, sz: 0.52 });
});
wdgBatch(P, "cyl", WDG_WHITE, pil);
wdgBatch(P, "cyl", WDG_GOLD, ban);
wdgBatch(P, "box", C.col[1], ban2);
}
P.marks = [];
[-0.7, 0.7].forEach(function (x) { var m = wdgPut(P, "disc", 0xFFF0D0, 0.9, 0.9, 1, x, 0.03, 1.5, { glow: true, op: 0.35, rx: -Math.PI / 2, live: true }); P.marks.push(m); });
var wax = [], fla = [];
P.candles.forEach(function (c) {
var hh = c.h || 0.3;
if (!c.lantern) {
wax.push({ x: c.x, y: hh / 2 + (c.stand ? 0 : 0), z: c.z, sx: 0.06, sy: hh, sz: 0.06 });
}
fla.push({ x: c.x, y: hh + 0.05 + (c.lantern ? 0.06 : 0), z: c.z, sx: 0.045, sy: 0.09, sz: 0.045 });
});
wdgBatch(P, "cyl", 0xF4EEDC, wax);
P.flameBatch = wdgBatch(P, "cone", WDG_FLAME, fla, { glow: true });
P.flowers.forEach(function (L, i) { wdgBatch(P, "flower", P.flowerCols[i], L); });
wdgBatch(P, "sph", 0x3E6A34, P.leaves);
},
function (P) {
var C = P.cul, g = new THREE.Group();
g.visible = false;
P.g.add(g);
P.rite = g;
P.riteBits = [];
var o = { to: g };
function put(geo, col, sx, sy, sz, x, y, z, oo) { return wdgPut(P, geo, col, sx, sy, sz, x, y, z, Object.assign({ to: g }, oo || {})); }
var cx = 0, cz = 1.5, hy = 1.05;
if (C.rite === "rings") {
put("box", 0xE8E0F0, 0.3, 0.06, 0.3, cx, 0.95, cz - 0.55);
put("cyl", WDG_DARKWOOD, 0.08, 0.92, 0.08, cx, 0.46, cz - 0.55);
put("ring", WDG_GOLD, 0.1, 0.1, 0.1, cx - 0.05, 1.0, cz - 0.55, { rx: -Math.PI / 2 });
put("ring", WDG_GOLD, 0.1, 0.1, 0.1, cx + 0.06, 1.0, cz - 0.55, { rx: -Math.PI / 2 });
}
else if (C.rite === "sign") {
put("box", WDG_WHITE, 0.5, 0.02, 0.34, 0.3, 0.86, -0.3);
put("cyl", 0xE8E0C8, 0.01, 0.3, 0.01, 0.45, 0.95, -0.25, { rz: 0.6 });
}
else if (C.rite === "cord") {
var cord = put("tor:0.18:0.03", C.k === "moon" ? 0xC8CCD8 : C.col[1], 1, 1, 1, cx, hy, cz, { live: true });
cord.scale.set(1, 0.6, 1);
P.riteBits.push(cord);
put("tor:0.15:0.025", C.k === "moon" ? 0x6A4A9A : 0xC8A848, 1, 1, 1, cx, hy + 0.04, cz, { rx: 0.6 });
}
else if (C.rite === "glass") {
var gl = put("cyl", 0xD8E8F0, 0.12, 0.18, 0.12, cx, 0.09, cz + 0.4, { op: 0.7 });
var cl = put("box", WDG_WHITE, 0.3, 0.06, 0.3, cx, 0.03, cz + 0.4);
P.glass = { glass: gl, cloth: cl };
var sh = [];
for (var i = 0; i < 6; i++) {
var a = i * 1.05;
sh.push(put("box", 0xD8E8F0, 0.05, 0.01, 0.03, cx + Math.cos(a) * 0.2, 0.01, cz + 0.4 + Math.sin(a) * 0.2, { op: 0.7, ry: a }));
}
sh.forEach(function (s) { s.visible = false; });
P.glass.shards = sh;
}
else if (C.rite === "fire") {
P.steps = [];
for (var st = 0; st < 7; st++) {
var r = put("tor:" + (0.7 + st * 0.11) + ":0.03", st % 2 ? 0xF0A020 : 0xE85A10, 1, 1, 1, 0, 0.04, 0.15, { rx: -Math.PI / 2 });
r.visible = false;
P.steps.push(r);
}
[-0.7, 0.7].forEach(function (x) { put("tor:0.22:0.04", 0xF0A020, 1, 1, 1, x, 1.35, cz, { rx: -1.2 }); });
}
else if (C.rite === "scroll") {
put("box", 0x2E6A4A, 1.0, 0.7, 0.5, cx, 0.35, cz - 0.7);
put("cyl", 0xF4ECD8, 0.07, 0.5, 0.07, cx, 0.74, cz - 0.7, { rz: Math.PI / 2 });
put("box", 0xF4ECD8, 0.36, 0.005, 0.3, cx, 0.715, cz - 0.6);
}
else if (C.rite === "tea") {
put("box", 0x6A2A1A, 1.1, 0.4, 0.5, cx, 0.2, cz - 0.6);
put("sph", WDG_WHITE, 0.22, 0.18, 0.22, cx - 0.25, 0.5, cz - 0.6);
put("cyl", WDG_WHITE, 0.03, 0.14, 0.03, cx - 0.12, 0.55, cz - 0.6, { rz: -1.0 });
for (var t = 0; t < 4; t++)
put("cyl", WDG_WHITE, 0.07, 0.06, 0.07, cx + 0.05 + t * 0.12, 0.43, cz - 0.6 + (t % 2) * 0.08);
put("box", 0xC01E1E, 0.14, 0.02, 0.09, cx + 0.35, 0.415, cz - 0.45);
}
else if (C.rite === "sake") {
[0.11, 0.09, 0.07].forEach(function (r, i) { put("cyl", 0xB8241A, r * 2, 0.025, r * 2, cx, 0.42 + i * 0.03, cz - 2.0); });
}
else if (C.rite === "tasting") {
put("box", WDG_DARKWOOD, 1.0, 0.6, 0.5, cx, 0.3, cz - 0.7);
[0x6A3A1A, 0xD89A20, 0xB81E1E, 0xA8C8E0].forEach(function (c, i) { put("cyl", WDG_WHITE, 0.16, 0.07, 0.16, cx - 0.36 + i * 0.24, 0.64, cz - 0.7); put("cyl", c, 0.13, 0.02, 0.13, cx - 0.36 + i * 0.24, 0.67, cz - 0.7); });
}
else if (C.rite === "crowns") {
[-0.7, 0.7].forEach(function (x) {
var cr = put("tor:0.12:0.025", WDG_GOLD, 1, 1, 1, x, 1.95, cz, { rx: -Math.PI / 2, live: true });
P.riteBits.push(cr);
for (var k = 0; k < 5; k++)
put("flower", 0xFFFFFF, 0.05, 0.05, 0.05, x + Math.cos(k * 1.26) * 0.12, 1.97, cz + Math.sin(k * 1.26) * 0.12);
});
put("box", WDG_WHITE, 1.4, 0.012, 0.02, 0, 1.98, cz);
}
else if (C.rite === "sword") {
var sw = put("box", 0xC8CCD0, 0.05, 0.9, 0.015, cx, 1.15, cz - 0.9, { rz: Math.PI / 2, live: true });
put("box", 0x6A5A30, 0.06, 0.28, 0.03, cx - 0.55, 1.15, cz - 0.9, { rz: Math.PI / 2 });
put("box", 0x8A7A50, 0.03, 0.04, 0.2, cx - 0.43, 1.15, cz - 0.9);
put("ring", WDG_GOLD, 0.08, 0.08, 0.08, cx - 0.56, 1.2, cz - 0.9);
put("ring", WDG_GOLD, 0.08, 0.08, 0.08, cx - 0.62, 1.2, cz - 0.9);
P.riteBits.push(sw);
}
},
function (b, A) {
var tier = wdgTier(b.tier), cul = wdgCulture(b.culture);
var g = new THREE.Group();
g.name = "wedding " + b.id;
g.position.set(A.x, A.y, A.z);
g.rotation.y = A.rot || 0;
var cs = Math.cos(A.rot || 0), sn = Math.sin(A.rot || 0);
var P = { id: b.id, b: b, A: A, g: g, tier: tier, cul: cul, batches: [], flowers: [], leaves: [], candles: [], flames: [], figs: [], ev: !!A.ev,
flowerCols: wdgFlowerCols(cul, tier.decor),
gy: function (x, z) { if (!A.ground)
return 0; var wx = A.x + x * cs + z * sn, wz = A.z - x * sn + z * cs; var y = A.ground(wx, wz); return (y == null || !isFinite(y)) ? 0 : Math.max(-1.5, Math.min(1.5, y - A.y)); },
toWorld: function (x, z) { return { x: A.x + x * cs + z * sn, z: A.z - x * sn + z * cs }; } };
P.flowerCols.forEach(function () { P.flowers.push([]); });
if (!(A.ev && (cul.k === "classic" || A.noStruct)))
wdgStructure(P);
else
wdgStructureFlowers(P);
if (A.seats) {
P.seats = A.seats.slice();
var zs = P.seats.map(function (s) { return s.z; });
P.z0 = Math.max(2.4, Math.min.apply(null, zs));
P.rowGap = 1.6;
P.rows = Math.min(6, Math.ceil((Math.min(Math.max.apply(null, zs), P.z0 + 14) - P.z0) / 1.6) + 1);
P.cols = 4;
P.kidZ = Math.min(Math.max.apply(null, zs) + 1.2, 26);
}
else
P.seats = wdgSeats(P, Math.max(tier.ai + 2, b.guests_n + tier.ai * 0.25));
wdgDress(P);
wdgRiteProps(P);
P.offAt = { x: 0, z: cul.s === "mandap" ? -0.9 : cul.s === "circle" ? -0.1 : -0.45 };
P.mid = { x: 0, z: 1.5 };
var d = tier.decor, lite = wdgLite(), halfW = 1.25 + (P.cols || 3) * 0.62 + 0.4;
P.players = [];
if (d >= 3)
P.players.push({ k: "harp", x: -halfW - 0.9, z: 1.8, face: Math.PI * 0.5 });
if (d >= 4 && !lite)
[["violin", halfW + 0.9, 1.2], ["violin", halfW + 1.6, 1.9], ["viola", halfW + 0.9, 2.6], ["cello", halfW + 1.6, 3.3]].forEach(function (q) { P.players.push({ k: q[0], x: q[1], z: q[2], face: -Math.PI * 0.5 }); });
else if (d >= 4)
P.players.push({ k: "violin", x: halfW + 0.9, z: 1.6, face: -Math.PI * 0.5 });
if (d >= 5)
[-1, 1].forEach(function (s) { P.players.push({ k: "trumpet", x: s * 2.6, z: 0.2, face: 0 }); });
P.guard = [];
if (d >= 5) {
var gn = lite ? 2 : 6, zEnd = (P.z0 || 3.6) + (P.rows || 4) * (P.rowGap || 1.2);
for (var i = 0; i < gn; i++) {
var s = i % 2 ? 1 : -1, z = 2.6 + Math.floor(i / 2) * ((zEnd - 2.6) / Math.max(1, Math.ceil(gn / 2) - 0.5));
P.guard.push({ x: s * 0.85, z: z, face: s > 0 ? -Math.PI / 2 : Math.PI / 2 });
}
}
P.players.forEach(function (p) { wdgInstrument(P, p); });
return P;
},
function (P) {
var d = P.tier.decor, n = d >= 4 ? 14 : d >= 2 ? 9 : 5;
var az = P.A.archZ || 0.3;
if (P.A.noStruct) {
wdgBunch(P, -1.1, 1.0, -0.2, 0.2, d >= 3 ? 9 : 5, P.flowerCols, "rg1");
wdgBunch(P, 1.1, 1.0, -0.2, 0.2, d >= 3 ? 9 : 5, P.flowerCols, "rg2");
return;
}
for (var i = 0; i <= n; i++) {
var a = Math.PI * i / n;
wdgBunch(P, Math.cos(a) * 1.65, 1.55 + Math.sin(a) * 1.65, az, 0.24, d >= 4 ? 10 : 6, P.flowerCols, "ev" + i);
}
if (d >= 3)
[-1, 1].forEach(function (s) { wdgPut(P, "box", WDG_WHITE, 0.7, 2.6, 0.02, s * 2.0, 1.4, az + 0.1, { op: 0.8, ds: true }); });
},
function (P, p) {
var x = p.x, z = p.z, f = p.face, fx = Math.sin(f), fz = Math.cos(f);
if (p.k === "harp") {
wdgPut(P, "box", WDG_GOLD, 0.08, 1.6, 0.08, x + fx * 0.55, 0.8, z + fz * 0.55, { rz: 0.15, ry: f });
wdgPut(P, "box", WDG_GOLD, 0.06, 0.06, 0.7, x + fx * 0.55, 1.55, z + fz * 0.3, { ry: f });
wdgPut(P, "box", 0xF0E8D0, 0.02, 1.3, 0.5, x + fx * 0.55, 0.85, z + fz * 0.3, { ry: f, op: 0.5 });
}
else if (p.k === "cello") {
wdgPut(P, "box", 0x7A3A1A, 0.4, 0.75, 0.18, x + fx * 0.35, 0.55, z + fz * 0.35, { ry: f });
wdgPut(P, "box", 0x2A1A10, 0.05, 0.5, 0.05, x + fx * 0.35, 1.1, z + fz * 0.35, { ry: f });
wdgPut(P, "cyl", 0x6A4A30, 0.4, 0.45, 0.4, x, 0.22, z);
}
else if (p.k === "violin" || p.k === "viola") { }
else if (p.k === "trumpet") { }
},
function (P) {
if (!P)
return;
P.figs.forEach(function (f) { if (f.g.parent)
f.g.parent.remove(f.g); f.busy = false; f.set = null; if (f.extra) {
f.extra.forEach(function (e) { if (e.parent)
e.parent.remove(e); });
f.extra = null;
} });
P.figs = [];
if (P.g.parent)
P.g.parent.remove(P.g);
P.batches.forEach(function (im) { try {
im.dispose();
}
catch (e) { } });
P.batches = [];
P.g = null;
P.flames = [];
P.flameBatch = null;
P.marks = [];
P.rite = null;
},
function (seed, o) {
var g = null;
try {
if (typeof evcFig === "function")
g = evcFig("wd" + seed, { plain: true, child: !!o.child, sex: o.sex, dress: o.dress || {}, who: o.who || "", act: o.act || "sit" });
else if (typeof wPerson === "function")
g = wPerson("wd" + seed, { sex: o.sex, child: !!o.child, look: o.dress || {} });
if (g && o.sit && typeof sofPose === "function")
try {
sofPose(g, "sit", 0, 0, 0, 0.47, 0);
}
catch (e) { }
if (g && !o.live && typeof scpBake === "function") {
g.position.set(0, g.position.y, 0);
g = scpBake(g) || g;
}
}
catch (e) {
if (!WDG.warned) {
WDG.warned = true;
if (window.console)
console.warn("weddings: a figure", e);
}
}
if (g) {
g.traverse(function (m) { m.raycast = function () { }; });
g.userData.wdgSeed = seed;
}
return g;
},
function () {
WDG.pool.concat(WDG.kids, WDG.stand).forEach(function (p) {
if (!p)
return;
if (p.g.parent)
p.g.parent.remove(p.g);
if (typeof scpDrop === "function")
try {
var G = new THREE.Group();
G.add(p.g);
scpDrop(G);
}
catch (e) { }
});
WDG.pool = [];
WDG.kids = [];
WDG.stand = [];
for (var k in WDG.offs) {
var o = WDG.offs[k];
if (o && o.g) {
if (o.g.parent)
o.g.parent.remove(o.g);
if (typeof scpDrop === "function")
try {
var G2 = new THREE.Group();
G2.add(o.g);
scpDrop(G2);
}
catch (e) { }
}
}
WDG.offs = {};
},
function (k) {
if (WDG.offs[k])
return WDG.offs[k];
var O = wdgOfficiant(k), g = wdgFig("o" + k, { sex: O.sex, dress: O.dress, act: "tell" });
if (!g) {
WDG.offs[k] = { g: null, O: O };
return WDG.offs[k];
}
(O.acc || []).forEach(function (a) {
var p = a.split(":"), col = p[1] ? +p[1] : 0, m = null;
function add(geo, c, sx, sy, sz, x, y, z, o) { var mm = new THREE.Mesh(wdgGeo(geo), wdgMat(c, o)); mm.scale.set(sx, sy, sz); mm.position.set(x, y, z); if (o && o.rx)
mm.rotation.x = o.rx; mm.raycast = function () { }; g.add(mm); return mm; }
if (p[0] === "stole") {
add("box", col, 0.07, 0.85, 0.02, -0.09, 1.05, 0.15);
add("box", col, 0.07, 0.85, 0.02, 0.09, 1.05, 0.15);
}
else if (p[0] === "collar")
add("box", WDG_WHITE, 0.06, 0.03, 0.02, 0, 1.5, 0.12);
else if (p[0] === "kippah")
add("sph", 0x1A1A3A, 0.17, 0.06, 0.17, 0, 1.78, -0.02);
else if (p[0] === "tallit") {
add("box", 0xF4F2EC, 0.5, 0.06, 0.26, 0, 1.45, 0.02);
add("box", 0x2A4A8A, 0.06, 0.7, 0.02, -0.16, 1.12, 0.15);
add("box", 0x2A4A8A, 0.06, 0.7, 0.02, 0.16, 1.12, 0.15);
}
else if (p[0] === "kufi")
add("cyl", 0xF6F4EE, 0.2, 0.1, 0.2, 0, 1.79, 0);
else if (p[0] === "eboshi") {
add("cone", 0x141414, 0.16, 0.34, 0.16, 0, 1.95, -0.02);
}
else if (p[0] === "kamilavkion")
add("cyl", 0x141414, 0.21, 0.2, 0.21, 0, 1.84, 0);
else if (p[0] === "gele") {
add("sph", col, 0.3, 0.2, 0.28, 0, 1.83, -0.02);
add("box", col, 0.32, 0.05, 0.12, 0.06, 1.92, 0.02, { rx: 0.4 });
}
else if (p[0] === "circlet")
add("tor:0.11:0.012", 0xC8CCD8, 1, 1, 1, 0, 1.76, 0, { rx: -Math.PI / 2 });
else if (p[0] === "tilak")
add("box", 0xC82A1E, 0.012, 0.03, 0.005, 0, 1.69, 0.105);
else if (p[0] === "fur")
add("box", 0x8A7A64, 0.52, 0.14, 0.3, 0, 1.47, 0);
});
try {
if (typeof makeTag === "function") {
var tg = makeTag(O.n + " · Officiant", false);
tg.position.y = 2.15;
g.add(tg);
}
}
catch (e) { }
var o = { g: g, O: O };
WDG.offs[k] = o;
return o;
},
function (P, who) {
var b = P.b, C = P.cul, O = wdgOfficiant(b.officiant), place = b.venue === "spot" ? ((b.spot && b.spot.name) || "a place of their own choosing") : ((WDG_VENUES.filter(function (v) { return v.k === b.venue; })[0] || {}).n || "the Everbloom");
var at = "the wedding of " + b.couple + " (" + C.n.toLowerCase() + ", the " + P.tier.n + " package) at " + place + " in Somnucor";
if (who === "off")
return "You are " + O.n + ", " + O.t + ". You are leading " + at + ". You know the tradition well (" + C.note + ") and speak of it warmly and truly. " +
"Stay in character, keep replies short and kind, never be crude, and never invent private facts about real players.";
return "You are a guest at " + at + ": " + who + ". You are happy to be here, and chat about the couple, the day, the tradition and the music. " +
"Stay in character, keep replies short and kind, never be crude, and never invent private facts about real players.";
},
function (P) {
if (!P.g)
return;
var b = P.b, n = Math.min(wdgLite() ? P.tier.lite : P.tier.ai, P.seats.length);
var order = P.seats.map(function (s, i) { return { s: s, i: i, h: wdgHash(P.id + ":" + i) % 100 }; });
order.sort(function (a, c) { return (a.s.z - c.s.z) * 0.5 + (a.h - c.h) * 0.012; });
if (b.guests_n > 0)
order = order.slice(Math.min(order.length, Math.max(2, Math.min(b.guests_n, P.cols ? P.cols : 4)))).concat(order.slice(0, Math.min(b.guests_n, 4)));
P.want = n;
P.wantS = P.players.length + P.guard.length;
P.wantK = P.tier.decor >= 2 ? (wdgLite() ? 1 : 2) : 0;
var gi = P.figs.filter(function (f) { return f.role === "guest"; }).length;
for (var i = 0; i < WDG.pool.length && gi < n; i++) {
var p = WDG.pool[i];
if (!p || p.busy)
continue;
p.busy = true;
p.set = P.id;
p.role = "guest";
p.seat = order[gi].s;
gi++;
wdgSitAt(P, p.g, p.seat);
p.who = WDG_GUEST_WHO[(p.i + P.id) % WDG_GUEST_WHO.length];
p.name = wdgGuestName(p);
P.g.add(p.g);
P.figs.push(p);
}
var si = P.figs.filter(function (f) { return f.role === "play" || f.role === "guard"; }).length;
for (var j = 0; j < WDG.stand.length && si < P.wantS; j++) {
var q = WDG.stand[j];
if (!q || q.busy)
continue;
var asPlayer = si < P.players.length;
if (asPlayer === !!q.uniform && WDG.stand.some(function (x, xi) { return xi > j && x && !x.busy && !!x.uniform !== asPlayer; }))
continue;
q.busy = true;
q.set = P.id;
if (asPlayer) {
var pl = P.players[si];
q.role = "play";
q.inst = pl.k;
wdgStandAt(P, q.g, pl.x, pl.z, pl.face);
q.who = "one of the musicians playing at the wedding (" + pl.k + ")";
wdgHold(P, q, pl.k);
}
else {
var gd = P.guard[si - P.players.length];
q.role = "guard";
wdgStandAt(P, q.g, gd.x, gd.z, gd.face);
q.who = "one of the honour guard standing along the aisle at the wedding";
}
si++;
q.name = wdgGuestName(q);
P.g.add(q.g);
P.figs.push(q);
}
if (P.tier.decor >= 2 && !P.kidsIn) {
var zEnd = P.kidZ || ((P.z0 || 3.6) + (P.rows || 4) * (P.rowGap || 1.2) + 0.8), kn = wdgLite() ? 1 : 2, had = 0;
WDG.kids.forEach(function (k, j) {
if (!k || k.busy || had >= kn)
return;
k.busy = true;
k.set = P.id;
k.role = "kid";
had++;
k.name = k.girl ? "the flower girl" : "the page boy";
k.home = { x: (j ? 0.35 : -0.35), z: zEnd };
wdgStandAt(P, k.g, k.home.x, k.home.z, Math.PI);
P.g.add(k.g);
P.figs.push(k);
});
if (had >= kn)
P.kidsIn = true;
}
if (!P.off) {
var o = wdgOfficiantFig(b.officiant);
if (o && o.g) {
P.off = o;
o.busy = true;
o.set = P.id;
o.role = "off";
o.name = o.O.n;
wdgStandAt(P, o.g, P.offAt.x, P.offAt.z, 0);
P.g.add(o.g);
P.figs.push(o);
}
}
},
function (P, g, s) {
var y = P.gy(s.x, s.z) + (s.y || 0);
if (typeof sofPose === "function")
try {
sofPose(g, "sit", s.x, s.z, y, s.h || 0.47, s.face);
g.userData.wdgHome = { x: g.position.x, y: g.position.y, z: g.position.z, ry: s.face };
return;
}
catch (e) { }
g.position.set(s.x, y + (s.h || 0.47) - 0.95, s.z);
g.rotation.y = s.face;
var L = g.userData.limbs;
if (L) {
if (L.ll)
L.ll.rotation.x = -1.45;
if (L.rl)
L.rl.rotation.x = -1.45;
}
g.userData.wdgHome = { x: g.position.x, y: g.position.y, z: g.position.z, ry: s.face };
},
function (P, p, k) {
var L = p.g.userData.limbs, g = p.g;
p.extra = [];
function add(geo, c, sx, sy, sz, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(wdgGeo(geo), wdgMat(c)); m.scale.set(sx, sy, sz); m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, rz || 0); m.raycast = function () { }; g.add(m); p.extra.push(m); return m; }
if (k === "violin" || k === "viola") {
var s = k === "viola" ? 1.12 : 1;
add("box", 0x8A4A1E, 0.2 * s, 0.07, 0.36 * s, -0.12, 1.45, 0.2, 0.3, 0, 0.5);
add("box", 0x2A1A10, 0.03, 0.02, 0.6, 0.15, 1.38, 0.32, 0.1, 0.6, 0);
}
else if (k === "cello") {
add("box", 0x2A1A10, 0.02, 0.02, 0.7, 0.2, 0.8, 0.42, 0.2, 0.4, 0);
}
else if (k === "trumpet") {
add("cyl", WDG_GOLD, 0.04, 0.5, 0.04, 0, 1.55, 0.35, Math.PI / 2 + 0.25, 0, 0);
add("cone", WDG_GOLD, 0.16, 0.14, 0.16, 0, 1.49, 0.6, -Math.PI / 2 + 0.25, 0, 0);
}
else if (k === "harp") { }
},
function (P, t, ph, clapping) {
var P0 = camera.position;
P.figs.forEach(function (f) {
var g = f.g, L = g.userData.limbs, H = g.userData.wdgHome, hs = (wdgHash(g.userData.wdgSeed || "") % 628) / 100;
if (!L || !H)
return;
if (f.role === "guest") {
if (clapping) {
var c = Math.abs(Math.sin(t * 6.5 + hs));
if (L.la) {
L.la.rotation.x = -1.1 - c * 0.3;
L.la.rotation.z = -(0.25 - c * 0.25);
}
if (L.ra) {
L.ra.rotation.x = -1.1 - c * 0.3;
L.ra.rotation.z = 0.25 - c * 0.25;
}
f.clap = true;
}
else {
if (f.clap) {
f.clap = false;
if (L.la) {
L.la.rotation.x = -0.5;
L.la.rotation.z = 0;
}
if (L.ra) {
L.ra.rotation.x = -0.5;
L.ra.rotation.z = 0;
}
}
g.rotation.y = H.ry + Math.sin(t * 0.35 + hs) * 0.12;
}
}
else if (f.role === "play") {
var bow = Math.sin(t * (f.inst === "cello" ? 1.6 : 2.4) + hs);
if (f.inst === "trumpet") {
if (L.ra)
L.ra.rotation.x = -1.35;
if (L.la)
L.la.rotation.x = -1.25;
}
else if (f.inst === "harp") {
if (L.ra)
L.ra.rotation.x = -0.9 + bow * 0.15;
if (L.la)
L.la.rotation.x = -0.8 - bow * 0.15;
}
else if (f.inst === "cello") {
if (L.ra) {
L.ra.rotation.x = -0.7;
L.ra.rotation.z = 0.3 + bow * 0.25;
}
if (L.la)
L.la.rotation.x = -1.0;
}
else {
if (L.la)
L.la.rotation.x = -1.5;
if (L.ra) {
L.ra.rotation.x = -1.25;
L.ra.rotation.z = 0.4 + bow * 0.3;
}
}
}
else if (f.role === "guard") {
if (L.ra)
L.ra.rotation.x = clapping ? -2.6 : 0;
if (L.la)
L.la.rotation.x = 0;
}
else if (f.role === "off") {
var speaking = ph && ph.k === "words";
if (L.ra)
L.ra.rotation.x = speaking ? -0.5 - Math.max(0, Math.sin(t * 1.3)) * 0.6 : (ph && ph.k === "rite" ? -1.0 : -0.15);
if (L.la)
L.la.rotation.x = speaking ? -0.3 : (ph && ph.k === "rite" ? -1.0 : -0.15);
var talking = typeof talkOpen !== "undefined" && !!talkOpen;
if (talking && f.near)
wdgFaceCam(P, g);
else
g.rotation.y = H.ry;
}
else if (f.role === "kid") {
var w = ph && ph.k === "walk" ? ph.u : (ph && ph.k !== "wait" ? 1 : 0), zEnd = f.home.z, zTo = 2.6;
var z = zEnd + (zTo - zEnd) * w, x = f.home.x * (1 - w) + (f.home.x < 0 ? -1.1 : 1.1) * Math.max(0, (w - 0.9) * 10);
g.position.set(x, P.gy(x, z), z);
g.rotation.y = w < 1 ? Math.PI : 0;
if (L.ll && w > 0 && w < 1) {
var st = Math.sin(t * 7 + hs) * 0.45;
L.ll.rotation.x = st;
L.rl.rotation.x = -st;
if (L.ra)
L.ra.rotation.x = -0.6 + Math.sin(t * 3) * 0.2;
}
else if (L.ll) {
L.ll.rotation.x = 0;
L.rl.rotation.x = 0;
}
}
});
},
function (k) {
if (typeof FL === "undefined" || typeof WLD === "undefined" || WLD.on !== "family")
return null;
var A = null, seats = [];
if (k === "chapel") {
A = { x: 0, z: -6.4, archZ: 2.4 };
for (var r = 0; r < 12; r++)
[-8, 8].forEach(function (px) { for (var s = -6; s <= 6; s++) {
seats.push({ x: px + s * 0.62, z: 6 + r * 2.4 - 0.02, h: 0.47, face: Math.PI });
} });
}
else if (k === "garden") {
A = { x: 42, z: -24.2, archZ: 2.2 };
for (var gr = 0; gr < (FL.lite ? 5 : 8); gr++)
for (var gc = 0; gc < 5; gc++) {
seats.push({ x: 35.4 + gc, z: -16 + gr * 1.6, h: 0.47, face: Math.PI });
seats.push({ x: 44.6 + gc, z: -16 + gr * 1.6, h: 0.47, face: Math.PI });
}
}
else if (k === "rose") {
A = { x: -60, z: 41.0, archZ: 1.4 };
for (var rr = 0; rr < 3; rr++)
[-64, -56].forEach(function (px) { for (var s2 = -2; s2 <= 2; s2++)
seats.push({ x: px + s2 * 0.6, z: 47 + rr * 1.6, h: 0.47, face: Math.PI }); });
}
else if (k === "registry") {
var X = typeof FL_FX !== "undefined" ? FL_FX : 1000;
A = { x: X + 57, z: 43.0, noStruct: true };
for (var r3 = 0; r3 < 3; r3++)
for (var c3 = 0; c3 < 4; c3++)
seats.push({ x: X + 53 + c3 * 2.6, z: 48 + r3 * 2.2, h: 0.47, face: Math.PI });
}
if (!A)
return null;
var base = FL.base, gy = function (wx, wz) { try {
return flGround(wx - base, wz, 1.5);
}
catch (e) {
return 0;
} };
var y = gy(base + A.x, A.z);
return { x: base + A.x, y: y, z: A.z, rot: 0, ev: true, indoor: k !== "garden", archZ: A.archZ || 0, noStruct: !!A.noStruct, ground: gy,
seats: seats.map(function (s) { return { x: s.x - A.x, z: s.z - A.z, y: 0, h: s.h, face: s.face }; }) };
},
function (sp) {
if (!sp || !sp.place || typeof myPlace !== "function")
return null;
var here = myPlace();
if (here.place !== sp.place)
return null;
var x, y, z, ground = null, Wd = null;
if (/^world:/.test(sp.place) && typeof WLD !== "undefined" && WLD.w) {
Wd = WLD.w;
x = Wd.base + (+sp.x);
z = +sp.z;
y = +sp.y || 0;
var sy = y;
ground = function (wx, wz) { try {
if (Wd.ground) {
var g = Wd.ground(wx - Wd.base, wz, sy + 0.6);
if (g != null && isFinite(g))
return g;
}
}
catch (e) { } return sy; };
y = ground(x, z);
}
else if (sp.place === "out") {
var ox = (typeof ATLC !== "undefined" && ATLC) ? ATLC.x : 0, oz = (typeof ATLC !== "undefined" && ATLC) ? ATLC.z : 0;
x = ox + (+sp.x);
z = oz + (+sp.z);
ground = function (wx, wz) { return typeof terrainY === "function" ? terrainY(wx, wz) : 0; };
y = ground(x, z);
}
else {
var w = typeof placeToWorld === "function" ? placeToWorld({ place: sp.place, x: +sp.x, z: +sp.z, level: sp.level || 0 }) : null;
if (!w)
return null;
x = w.x;
z = w.z;
y = (w.y != null ? w.y : +sp.y || 0);
}
return { x: x, y: y, z: z, rot: +sp.rot || 0, ground: ground };
},
function (b, now) {
if (b.status === "done")
return { k: "done", e: (now - new Date(b.done_at || now).getTime()) / 1000 };
if (!b.begun_at)
return { k: "wait" };
var e = (now - new Date(b.begun_at).getTime()) / 1000;
if (e < 0)
e = 0;
if (e < WDG_WALK)
return { k: "walk", u: e / WDG_WALK, e: e };
var L = wdgLines(b), t = WDG_WALK;
for (var i = 0; i < L.length; i++) {
var d = wdgLineSecs(L[i]);
if (e < t + d)
return { k: "words", i: i, line: L[i], e: e, u: (e - t) / d };
t += d;
}
if (e < t + WDG_RITE)
return { k: "rite", u: (e - t) / WDG_RITE, e: e };
return { k: "vows", e: e };
},
function (b) {
var C = wdgCulture(b.culture), O = wdgOfficiant(b.officiant), fall = wdgLines({ culture: b.culture, a_name: "{A}", b_name: "{B}" });
var Cn = typeof ftkConn === "function" ? ftkConn() : null;
if (!Cn || typeof ftkAsk !== "function")
return Promise.resolve(fall);
var place = b.venue === "spot" ? ((b.spot && b.spot.name) || "a place of their choosing") : ((WDG_VENUES.filter(function (v) { return v.k === b.venue; })[0] || {}).n || "the Everbloom");
var sys = "You are " + O.n + ", " + O.t + ", in the city of Somnucor. You are about to lead a wedding: " + C.n + ". " + C.note + " Speak warmly, truly and with dignity, in the voice of who you are.";
var ask = "Lead the ceremony for {A} and {B} now, at " + place + ", with their guests gathered (" + wdgTier(b.tier).n + "). Write what you say aloud, as 6 to 8 short lines, one per line, each under 200 characters. " +
"Welcome everyone, speak of the tradition and of marriage, and at the right moment describe and lead the rite: " + C.act + " End by inviting them to say their vows. " +
"Write {A} and {B} for their names exactly like that. No numbers, no headings, no stage directions in brackets, nothing crude.";
var to = new Promise(function (r) { setTimeout(function () { r(""); }, 12000); });
return Promise.race([ftkAsk(Cn, [{ role: "system", content: sys }, { role: "user", content: ask }]).catch(function () { return ""; }), to]).then(function (t) {
var L = String(t || "").split(/\n+/).map(function (s) { return s.replace(/^\s*([-*•]|\d+[.)])\s*/, "").replace(/^["“]|["”]$/g, "").replace(/\[[^\]]*\]|\([^)]*\)/g, "").trim(); })
.filter(function (s) { return s.length > 8; }).map(function (s) { return s.slice(0, 280); }).slice(0, 9);
return L.length >= 4 ? L : fall;
});
},
function (b) {
if (WDG.begun[b.id])
return;
WDG.begun[b.id] = 1;
wdgCap(b, "<i>The music is about to begin…</i>", true);
if (b.preview) {
b.begun_at = new Date().toISOString();
b.status = "begun";
WDG.begun[b.id] = 0;
return;
}
wdgRiteWords(b).then(function (L) {
return cityRpc("wed_begin", { p_booking: b.id, p_rite: L });
}).then(function (o) {
WDG.begun[b.id] = 0;
if (o && o.ok) {
b.begun_at = o.begun_at;
b.rite = o.rite;
b.status = "begun";
WDG.fast = Date.now() + 20 * 60000;
wdgPoll(true);
}
else if (typeof setStatus === "function")
setStatus(esc((o && o.say) || "Not yet."));
}).catch(function (e) { WDG.begun[b.id] = 0; if (typeof setStatus === "function")
setStatus(esc(String((e && e.message) || "Not now."))); });
},
function (b) {
if (b.preview) {
b.vowsN = (b.vowsN || 0) + 1;
if (b.vowsN >= 2) {
b.status = "done";
b.done_at = new Date().toISOString();
}
wdgCapKey = "";
return;
}
cityRpc("wed_vow", { p_booking: b.id }).then(function (o) {
if (typeof setStatus === "function")
setStatus(esc((o && o.say) || "Done."));
if (o && o.married) {
b.status = "done";
b.done_at = new Date().toISOString();
if (typeof fwLoad === "function")
fwLoad(true);
if (typeof loadThings === "function")
try {
loadThings();
}
catch (e) { }
}
wdgPoll(true);
}).catch(function (e) { if (typeof setStatus === "function")
setStatus(esc(String((e && e.message) || "Not now."))); });
},
function () {
var el = document.getElementById("wdg-cap");
if (!el) {
el = document.createElement("div");
el.id = "wdg-cap";
el.style.cssText = "position:fixed;z-index:41;left:50%;bottom:118px;transform:translateX(-50%);width:min(560px,calc(100vw - 32px));box-sizing:border-box;padding:9px 13px;" +
"background:rgba(14,12,10,.82);border:1px solid rgba(201,168,104,.55);border-radius:8px;color:#F2E6CC;font:14px/1.45 var(--serif,Georgia);text-align:center;display:none;pointer-events:auto";
el.addEventListener("click", function (e) {
var t = e.target.closest && e.target.closest("[data-wdg]");
if (!t)
return;
e.stopPropagation();
var a = t.getAttribute("data-wdg"), b = WDG.capB;
if (!b)
return;
if (a === "begin")
wdgBegin(b);
else if (a === "vow") {
t.disabled = true;
wdgVow(b);
}
else if (a === "hide") {
WDG.hidden = b.id;
el.style.display = "none";
}
});
document.body.appendChild(el);
}
return el;
},
function (b, html, force) {
var el = wdgCapEl();
if (!html || WDG.hidden === b.id) {
if (el.style.display !== "none")
el.style.display = "none";
WDG.capB = null;
return;
}
WDG.capB = b;
var key = b.id + "|" + html;
if (key !== wdgCapKey || force) {
wdgCapKey = key;
el.innerHTML = "<span data-wdg='hide' role='button' aria-label='Hide' style='float:right;cursor:pointer;opacity:.6;margin:-4px -4px 0 6px'>✕</span>" + html;
}
if (el.style.display !== "block")
el.style.display = "block";
},
function (P, ph, d) {
var b = P.b, O = wdgOfficiant(b.officiant), C = wdgCulture(b.culture), me = wdgMe(), mine = !!b.mine || b.preview, h = "";
if (ph.k === "wait") {
var st = new Date(b.starts_at).getTime(), soon = st - Date.now();
h = "<b>" + esc(b.couple || "A wedding") + "</b> · " + esc(C.n) + "<br><span style='opacity:.8'>" + esc(O.n) + " is waiting" + (soon > 60000 ? ", from " + new Date(st).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "") + ".</span>";
if (mine)
h += "<br><span style='opacity:.8;font-size:12.5px'>Stand on the two soft lights before " + esc(O.n.split(" ").slice(-2).join(" ")) + ", then begin.</span>" + wdgBtn("begin", "🎻 Begin the ceremony");
}
else if (ph.k === "walk") {
h = "<i>" + (P.tier.decor >= 2 ? "The music plays, and the flower girl comes down the aisle, scattering petals…" : "The music plays. Everyone stands, then sits…") + "</i>";
}
else if (ph.k === "words") {
h = "<b>" + esc(O.n) + "</b><br>“" + esc(ph.line) + "”";
}
else if (ph.k === "rite") {
h = "<i>" + esc(C.act) + "</i>" + (b.culture === "jewish" && ph.u > 0.55 ? "<br><b>Mazel tov!</b>" : "");
}
else if (ph.k === "vows") {
var said = b.vows && me && b.vows[me];
h = "<b>" + esc(O.n) + "</b><br>“" + esc((b.a_name || "") + " and " + (b.b_name || "") + ", say your vows.") + "”";
if (mine && !said)
h += wdgBtn("vow", "💍 Say “I do”");
else if (mine)
h += "<br><span style='opacity:.8'>You have said I do. Now " + esc(me === b.a ? b.b_name : b.a_name) + "…</span>";
}
else if (ph.k === "done") {
if (ph.e > 120)
return wdgCap(b, null);
h = "<b>" + esc((b.a_name || "") + " and " + (b.b_name || "")) + " are married!</b><br><span style='opacity:.85'>" + esc(O.n) + ": “You may celebrate!”</span>";
}
wdgCap(b, h);
},
function (P, ph) {
var b = P.b, k = b.id + ":" + ph.k + ":" + (ph.i != null ? ph.i : "");
if (WDG.lineSaid[k])
return;
WDG.lineSaid[k] = 1;
if (ph.k === "walk" && ph.e < 4)
wdgTune(WDG_IN);
else if (ph.k === "done" && ph.e < 5)
wdgTune(WDG_OUT);
else if (ph.k === "rite" && b.culture === "jewish" && typeof playTone === "function")
setTimeout(function () { try {
playTone(1800, 0.08);
playTone(2400, 0.06);
}
catch (e) { } }, WDG_RITE * 550);
else if (ph.k === "words" && ph.u < 0.3) {
var O = wdgOfficiant(b.officiant);
if (typeof fvoSpeak === "function" && !(typeof talkOpen !== "undefined" && talkOpen))
try {
fvoSpeak({ name: O.n, ftkSex: O.sex, ftkAge: O.age }, ph.line);
}
catch (e) { }
}
},
function (P, ph, t) {
if (!P.rite)
return;
var on = ph.k === "rite" || ph.k === "vows" || ph.k === "done";
P.rite.visible = on;
if (!on)
return;
var u = ph.k === "rite" ? ph.u : 1;
if (P.glass) {
var broke = u > 0.55;
P.glass.glass.visible = !broke;
P.glass.shards.forEach(function (s) { s.visible = broke; });
}
if (P.steps)
P.steps.forEach(function (r, i) { r.visible = u * 8 > i + 0.5; });
P.riteBits.forEach(function (m) { if (P.cul.rite === "sword") {
m.position.y = 1.15 + Math.min(1, u * 2) * 0.15;
m.updateMatrix();
} });
},
function (P) {
var g = new THREE.Group(), n = wdgLite() ? 24 : 70, cols = P.flowerCols;
for (var i = 0; i < n; i++) {
var m = new THREE.Mesh(wdgGeo("plane"), wdgMat(cols[i % cols.length], { glow: true, ds: true }));
m.scale.set(0.08, 0.06, 1);
m.position.set((Math.random() - 0.5) * 6, 2.5 + Math.random() * 3, Math.random() * 6);
m.rotation.set(Math.random() * 3, Math.random() * 3, 0);
m.userData.v = 0.35 + Math.random() * 0.3;
m.raycast = function () { };
g.add(m);
}
P.g.add(g);
P.petals = { g: g, t: 0 };
},
function (P, dt) {
var p = P.petals;
p.t += dt;
p.g.children.forEach(function (m) { if (m.position.y > P.gy(m.position.x, m.position.z) + 0.02) {
m.position.y -= m.userData.v * dt;
m.rotation.x += dt * 0.8;
m.position.x += Math.sin(p.t * 0.9 + m.position.z) * 0.004;
} });
if (p.t > 14) {
if (p.g.parent)
p.g.parent.remove(p.g);
P.petals = null;
}
},
function (P) {
if (!P.A.ev || typeof FL === "undefined" || !FL.talk)
return;
P.hid = [];
P.hidTalk = [];
var ax = P.A.x - FL.base, az = P.A.z;
function near(p) { return p && p.title && /Officiant|Registrar/.test(p.title) && Math.hypot(p.x - ax, p.z - az) < 4; }
FL.talk = FL.talk.filter(function (T) { if (near(T.p)) {
P.hidTalk.push(T);
return false;
} return true; });
(FL.people || []).forEach(function (p) { if (near(p) && p.g) {
p.away = true;
p.g.visible = false;
P.hid.push(p);
} });
},
function (name) {
if (typeof myPlace !== "function")
return { ok: false, say: "Not here." };
var w = typeof dgrWhere === "function" ? dgrWhere() : "";
if (w === "kidszone")
return { ok: false, say: "Not in the Kids Zone: choose a place grown-ups gather." };
if (w === "dream")
return { ok: false, say: "Your own dream is yours alone: guests could not come. Choose a place in Somnucor or one of its worlds." };
if (w === "underground")
return { ok: false, say: "Not on the Underground: choose a place that stays put." };
var here = myPlace(), P = camera.position, feet = P.y - 1.72;
var rot = (typeof yaw !== "undefined" ? yaw : 0) + Math.PI;
var ax = -Math.sin(yaw) * 3.5, az = -Math.cos(yaw) * 3.5;
var nm = String(name || "").trim().slice(0, 80);
if (!nm) {
var D = typeof DGR_W !== "undefined" && DGR_W[w];
nm = D ? D.name.split(":")[0] : "";
if (typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec)
nm = String(INT.spec.label || INT.spec.name || "a room in Somnucor");
if (!nm)
nm = here.place === "out" ? "Somnucor" : "a place of our own choosing";
}
var dn = typeof dgrLevelOf === "function" && w ? dgrLevelOf(w) : 0;
var sp = { place: here.place, x: +(here.x + ax).toFixed(1), z: +(here.z + az).toFixed(1), y: +feet.toFixed(2), level: here.level || 0, rot: +(rot + Math.PI).toFixed(3), name: nm };
sp.rot = +(Math.atan2(-ax, -az)).toFixed(3);
try {
localStorage.setItem("wdgSpot", JSON.stringify(sp));
}
catch (e) { }
return { ok: true, spot: sp, say: "Marked: " + nm + ". The arch goes a few steps ahead of you, and the guests sit where you stand." + (dn >= 3 ? " This world is dangerous: beasts may come to your wedding." : "") };
},
function (b) {
if (!b)
return;
if (b.venue !== "spot") {
if (typeof fwGo === "function")
fwGo(b.venue === "registry" ? "fam" : "wed", b.venue);
return;
}
var sp = b.spot || {}, pl = sp.place || "";
var m = /^world:(.+)$/.exec(pl);
if (m && typeof WORLDS !== "undefined" && WORLDS[m[1]]) {
if (typeof fwClose === "function")
fwClose();
worldGo(m[1]);
setTimeout(function () {
try {
var W = WORLDS[m[1]], c = Math.sin(sp.rot || 0), s = Math.cos(sp.rot || 0);
var bx = W.base + sp.x + c * 9, bz = sp.z + s * 9;
camera.position.set(bx, (sp.y || 0) + 1.72, bz);
if (typeof yaw !== "undefined")
yaw = Math.atan2(c, s);
if (typeof flyY !== "undefined")
flyY = 0;
}
catch (e) { }
}, 350);
return;
}
if (pl === "out") {
if (typeof fwClose === "function")
fwClose();
var ox = (typeof ATLC !== "undefined" && ATLC) ? ATLC.x : 0, oz = (typeof ATLC !== "undefined" && ATLC) ? ATLC.z : 0;
if (typeof WLD !== "undefined" && WLD.on && typeof worldHome === "function")
worldHome("<b>Back in Somnucor.</b> Follow the pointer to the wedding.");
guideTo = { key: sp.name || "The wedding", x: ox + sp.x, z: oz + sp.z };
if (typeof setStatus === "function")
setStatus("<b>" + esc(sp.name || "The wedding") + "</b>: follow the pointer at the top of the screen.");
return;
}
if (typeof setStatus === "function")
setStatus("<b>The wedding is at " + esc(sp.name || "the place they marked") + ".</b> Go in there: everything will be ready.");
},
function (tier, culture, officiant, venue) {
var mk = venue && venue !== "spot" ? null : wdgMarkHere("The Keeper's preview");
if (mk && !mk.ok) {
if (typeof setStatus === "function")
setStatus(esc(mk.say));
return;
}
if (WDG.preview && WDG.sets[WDG.preview.id]) {
wdgDropSet(WDG.sets[WDG.preview.id]);
delete WDG.sets[WDG.preview.id];
}
var me = wdgMe();
WDG.preview = { id: "p" + Date.now(), preview: true, venue: venue || "spot", spot: mk ? mk.spot : null, tier: tier || "grand", culture: culture || "classic", officiant: officiant || wdgCulture(culture).o,
starts_at: new Date(Date.now() + 60000).toISOString(), status: "booked", a: me, b: null, a_name: "Rowan", b_name: "Ellery", couple: "Rowan and Ellery", guests_n: 0, mine: true };
WDG.list = WDG.list.filter(function (x) { return !x.preview; }).concat([WDG.preview]);
WDG.hidden = null;
WDG.slow = 0;
if (typeof setStatus === "function")
setStatus("<b>A preview wedding</b> is set up here, seen only by you. Press Begin on the card when you are ready.");
},
function (W) {
var K = FW.pick, h = "";
if (!K.spot && typeof wdgSavedSpot === "function")
K.spot = wdgSavedSpot();
var places = (W.places || []).filter(function (v) { return !v.off; });
if (!places.some(function (v) { return v.k === K.venue; }))
K.venue = places[0] ? places[0].k : "chapel";
h += fwHead("1. Where");
h += "<div>" + places.map(function (v) { return fwB("venue", FW_VENUE_ICON[v.k] + " " + esc(v.n), { k: v.k, on: K.venue === v.k }); }).join("") + "</div>";
var V = places.filter(function (v) { return v.k === K.venue; })[0] || {};
if (K.venue === "spot") {
h += fwDim(esc(V.note || "") + " The planners' fee: " + (+V.fee || 0) + " gold.");
if (K.spot)
h += fwDim("📍 Your place: <b>" + esc(K.spot.name) + "</b>.") + fwB("unmark", "Choose another");
h += "<input id='fw-spotname' maxlength='60' placeholder='What shall we call it? (optional)' style='width:100%;box-sizing:border-box;margin:6px 0;padding:7px;background:rgba(255,255,255,.06);color:inherit;border:1px solid rgba(201,168,104,.4);border-radius:4px' value='" + esc(FW.spotName || "") + "'>";
h += fwB("mark", "📍 Mark this spot (where I stand now)");
h += fwDim("Or go somewhere lovely first, then mark it there:") + "<div>" + WDG_GO.filter(function (g) { return typeof WORLDS !== "undefined" && WORLDS[g[0]]; }).map(function (g) { return fwB("goWorld", "➡️ " + esc(g[1]), { k: g[0] }); }).join("") + fwB("goHome", "🏡 My home") + "</div>";
}
else
h += fwDim(esc(((W.venues || []).filter(function (x) { return x.k === K.venue; })[0] || {}).note || "") + " Room for " + (V.cap || "") + " guests. Venue fee: " + (+V.fee || 0) + " gold.");
h += fwHead("2. The package");
h += "<div>" + (W.tiers || []).map(function (t) { return fwB("tier", esc(t.n) + " · " + fwWdgPrice(W, t.k, K.venue).toLocaleString() + " gold", { k: t.k, on: K.tier === t.k }); }).join("") + "</div>";
var T = (W.tiers || []).filter(function (x) { return x.k === K.tier; })[0];
if (T)
h += fwDim(esc(T.note) + " Up to " + Math.min(T.guests, V.cap || T.guests) + " invited guests" + (V.cap && V.cap < T.guests ? " (the room's limit)" : "") + ", and the house's own guests fill the seats. " +
"The price is the package, the venue and the 60-gold licence.");
h += fwHead("3. The tradition");
h += "<div>" + (W.cultures || []).map(function (c) { return fwB("cul", esc(c.n), { k: c.k, on: K.culture === c.k }); }).join("") + "</div>";
var C = (W.cultures || []).filter(function (x) { return x.k === K.culture; })[0];
if (C)
h += fwDim(esc(C.note));
h += fwHead("4. Who marries you");
var usual = C ? C.o : "priest", off = K.off || usual;
h += "<div>" + (W.officiants || []).map(function (o) { return fwB("off", esc(o.n) + (o.k === usual ? " ★" : ""), { k: o.k, on: off === o.k }); }).join("") + "</div>";
var O = (W.officiants || []).filter(function (x) { return x.k === off; })[0];
if (O)
h += fwDim(esc(O.n) + ", " + esc(O.t) + (O.k === usual ? ". The usual choice for this tradition (★), though anyone may lead any." : ". Anyone may lead any tradition."));
h += fwHead("5. When");
h += "<div>" + FW_WHEN.map(function (w, i) { return fwB("when", w[0], { k: i, on: K.when === i }); }).join("") + "</div>";
var fr2 = fwFriends();
if (fr2.length) {
h += fwHead("6. Your guests") + fwDim("They get an invitation by post and on their phone, with the way to the place.");
h += "<div>" + fr2.filter(function (f) { return f.id !== W.partner; }).map(function (f) { return fwB("guest", (K.guests.indexOf(f.id) >= 0 ? "✓ " : "") + esc(f.name || "a friend"), { id: f.id, on: K.guests.indexOf(f.id) >= 0 }); }).join("") + "</div>";
}
var total = fwWdgPrice(W, K.tier, K.venue);
h += "<div style='margin-top:10px'>" + fwB("book2", "📅 Book it · " + total.toLocaleString() + " gold", { off: K.venue === "spot" && !K.spot }) + "</div>";
if (K.venue === "spot" && !K.spot)
h += fwDim("Mark your place first.");
if (W.keeper)
h += fwB("preview", "👁 Keeper: show me this wedding here now (only you see it)");
return h;
},
function (W, bk) {
var C = typeof wdgCulture === "function" ? wdgCulture(bk.culture) : { n: bk.culture }, O = typeof wdgOfficiant === "function" ? wdgOfficiant(bk.officiant) : { n: bk.officiant }, T = typeof wdgTier === "function" ? wdgTier(bk.tier) : { n: bk.tier };
var vn = bk.venue === "spot" ? ((bk.spot && bk.spot.name) || "a place of your own choosing") : (((W.places || []).filter(function (x) { return x.k === bk.venue; })[0] || { n: bk.venue }).n);
var h = fwHead((FW_VENUE_ICON[bk.venue] || "💍") + " Your wedding: " + esc(vn));
h += fwDim(fwWhen(bk.starts_at) + " · " + esc(T.n) + " · " + esc(C.n) + " · led by " + esc(O.n) + (bk.guests && bk.guests.length ? " · guests: " + esc(bk.guests.join(", ")) : "") + ".");
h += fwDim("On the day both of you come to the place: from half an hour before, everything is set up, the guests are seated and " + esc(O.n) + " is waiting. " +
"Stand on the two soft lights and either of you presses Begin. After the words and the rite, each of you says I do.");
var said = bk.vows && Object.keys(bk.vows).length;
h += (bk.venue === "spot" ? fwB("goSpot", "➡️ Go to the place", { id: bk.id }) : fwB("goVenue", "➡️ Go to the place", { k: bk.venue })) + fwB("cancel", "Cancel the booking (half back)", { id: bk.id });
if (said)
h += fwDim("“I do” has been said by " + said + " of you.");
return h;
},
function (a, id, k) {
var K = FW.pick;
if (a === "tier") {
K.tier = k;
fwPaint();
return true;
}
if (a === "cul") {
K.culture = k;
K.off = "";
fwPaint();
return true;
}
if (a === "off") {
K.off = k;
fwPaint();
return true;
}
if (a === "unmark") {
K.spot = null;
try {
localStorage.removeItem("wdgSpot");
}
catch (e) { }
fwPaint();
return true;
}
if (a === "mark") {
var nm = (document.getElementById("fw-spotname") || {}).value || FW.spotName || "";
var r = wdgMarkHere(nm);
FW.say = esc(r.say);
if (r.ok)
K.spot = r.spot;
fwPaint();
return true;
}
if (a === "goWorld") {
fwClose();
if (typeof worldGo === "function")
worldGo(k);
if (typeof setStatus === "function")
setStatus("Find the spot you love, then ☰ Menu, 💍 Family, and <b>📍 Mark this spot</b>.");
return true;
}
if (a === "goHome") {
fwClose();
if (typeof showTheWayHome === "function")
showTheWayHome();
return true;
}
if (a === "goSpot") {
var W = FW.wed || {}, b = (W.bookings || []).concat(W.invited || []).filter(function (x) { return String(x.id) === String(id); })[0];
wdgGoTo(b);
return true;
}
if (a === "book2") {
var hrs = FW_WHEN[K.when][1], at = new Date(Date.now() + hrs * 3600000);
at.setSeconds(0, 0);
if (hrs >= 24)
at.setMinutes(0);
var C = (FW.wed && FW.wed.cultures || []).filter(function (x) { return x.k === K.culture; })[0];
fwAct("wed_book2", { p_venue: K.venue, p_tier: K.tier, p_culture: K.culture, p_officiant: K.off || (C ? C.o : "priest"), p_at: at.toISOString(), p_guests: K.guests, p_spot: K.venue === "spot" ? K.spot : null }, function (o) { if (o && o.ok && typeof wdgPoll === "function") {
WDG.at = 0;
setTimeout(function () { wdgPoll(true); }, 600);
} });
return true;
}
if (a === "preview") {
var C2 = (FW.wed && FW.wed.cultures || []).filter(function (x) { return x.k === K.culture; })[0];
fwClose();
wdgPreview(K.tier, K.culture, K.off || (C2 ? C2.o : "priest"), K.venue === "spot" ? "spot" : (typeof WLD !== "undefined" && WLD.on === "family" ? K.venue : "spot"));
return true;
}
return false;
}
];
});
