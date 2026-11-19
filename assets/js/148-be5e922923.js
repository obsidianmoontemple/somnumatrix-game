/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof A !== "function" || typeof KIT === "undefined")
return;
var Q = Math.PI / 4, H = Math.PI / 2;
var SLATE = 0x3E4654, FLAG = 0x9E1B2A, WARM = 0xFFC86A, GOLDC = (typeof GOLD !== "undefined" ? GOLD : 0xD4AF37);
function P(g, s, p, c, x) { var o = { g: g, s: s, p: p, c: c }; if (x)
for (var k in x)
o[k] = x[k]; return o; }
function gableX(out, cx, top, cz, len, dep, col, wall) {
var sl = dep / 2 * Math.SQRT2 + 0.6;
out.push(P("box", [len + 0.8, 0.45, sl], [cx, top + dep / 4, cz + dep / 4], col, { r: [Q, 0, 0] }));
out.push(P("box", [len + 0.8, 0.45, sl], [cx, top + dep / 4, cz - dep / 4], col, { r: [-Q, 0, 0] }));
var a = dep / Math.SQRT2;
[-1, 1].forEach(function (e) { out.push(P("box", [0.3, a, a], [cx + e * (len / 2 - 0.17), top, cz], wall, { r: [Q, 0, 0] })); });
}
function gableZ(out, cx, top, cz, wid, len, col, wall) {
var sl = wid / 2 * Math.SQRT2 + 0.6;
out.push(P("box", [sl, 0.45, len + 0.8], [cx + wid / 4, top + wid / 4, cz], col, { r: [0, 0, -Q] }));
out.push(P("box", [sl, 0.45, len + 0.8], [cx - wid / 4, top + wid / 4, cz], col, { r: [0, 0, Q] }));
var a = wid / Math.SQRT2;
[-1, 1].forEach(function (e) { out.push(P("box", [a, a, 0.3], [cx, top, cz + e * (len / 2 - 0.17)], wall, { r: [0, 0, Q] })); });
}
function crenels(out, cx, top, cz, w, d, col) {
var n = Math.max(2, Math.round(w / 2.6)), m = Math.max(2, Math.round(d / 2.6));
out.push(P("box", [1.1, 1.3, 0.9], [cx - w / 2 + 0.55, top + 0.65, cz + d / 2 - 0.45], col, { rep: [n, (w - 1.1) / (n - 1), 0, 0] }));
out.push(P("box", [1.1, 1.3, 0.9], [cx - w / 2 + 0.55, top + 0.65, cz - d / 2 + 0.45], col, { rep: [n, (w - 1.1) / (n - 1), 0, 0] }));
out.push(P("box", [0.9, 1.3, 1.1], [cx + w / 2 - 0.45, top + 0.65, cz - d / 2 + 0.55], col, { rep: [m, 0, 0, (d - 1.1) / (m - 1)] }));
out.push(P("box", [0.9, 1.3, 1.1], [cx - w / 2 + 0.45, top + 0.65, cz - d / 2 + 0.55], col, { rep: [m, 0, 0, (d - 1.1) / (m - 1)] }));
}
function tower(out, x, z, r, h, o) {
o = o || {};
var y0 = o.y0 || 0, col = o.c || "stone", roof = o.roof || SLATE;
out.push(P("cyl", [r, r * 1.06, h, 14], [x, y0 + h / 2, z], col));
out.push(P("cyl", [r * 1.16, r * 1.02, 1.4, 14], [x, y0 + h - 0.2, z], col));
if (o.flat) {
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
out.push(P("box", [1, 1.3, 1], [x + Math.cos(a) * r * 1.05, y0 + h + 1.1, z + Math.sin(a) * r * 1.05], col));
}
}
else {
var sh = o.spire || r * 2.8;
out.push(P("cone", [r * 1.28, sh, 14], [x, y0 + h + 0.5 + sh / 2, z], roof));
out.push(P("sph", [0.35], [x, y0 + h + 0.5 + sh + 0.2, z], GOLDC));
if (o.flag !== false) {
out.push(P("cyl", [0.07, 0.07, 3.2, 4], [x, y0 + h + sh + 2, z], "metal"));
out.push(P("box", [2.2, 1.2, 0.08], [x + 1.15, y0 + h + sh + 2.9, z], o.flagC || FLAG));
}
}
var lit = o.lit, n = Math.max(1, Math.floor((h - 4) / 6));
out.push(P("box", [0.6, 1.6, 0.25], [x, y0 + 5, z + r * 1.02], lit ? WARM : "glass", lit ? { glow: true, rep: [n, 0, 6, 0] } : { rep: [n, 0, 6, 0] }));
}
function squareTower(out, x, z, w, h, o) {
o = o || {};
var y0 = o.y0 || 0, col = o.c || "stone";
out.push(P("box", [w, h, w], [x, y0 + h / 2, z], col));
if (o.pyramid) {
out.push(P("cone", [w * 0.82, o.pyramid, 4], [x, y0 + h + o.pyramid / 2, z], o.roof || SLATE, { r: [0, Q, 0] }));
out.push(P("sph", [0.35], [x, y0 + h + o.pyramid + 0.2, z], GOLDC));
}
else
crenels(out, x, y0 + h, z, w, w, col);
[-1, 1].forEach(function (sx) {
[-1, 1].forEach(function (sz) {
if (o.turrets) {
out.push(P("cyl", [1.1, 0.7, 3, 10], [x + sx * w / 2, y0 + h - 0.5, z + sz * w / 2], col));
out.push(P("cone", [1.3, 3.4, 10], [x + sx * w / 2, y0 + h + 2.7, z + sz * w / 2], o.roof || SLATE));
}
});
});
}
function windows(out, x0, y0, z, n, dx, rows, dy, lit, big) {
var s = big || [1.2, 2.6, 0.2];
out.push(P("box", s, [x0, y0, z], lit ? WARM : "glass", lit ? { glow: true, opa: 0.9, rep: [n, dx, 0, 0], rep2: [rows, 0, dy, 0] } : { rep: [n, dx, 0, 0], rep2: [rows, 0, dy, 0] }));
}
function windowsX(out, x, y0, z0, n, dz, rows, dy, lit, big) {
var s = big || [0.2, 2.6, 1.2];
out.push(P("box", s, [x, y0, z0], lit ? WARM : "glass", lit ? { glow: true, opa: 0.9, rep: [n, 0, 0, dz], rep2: [rows, 0, dy, 0] } : { rep: [n, 0, 0, dz], rep2: [rows, 0, dy, 0] }));
}
function keepExtra(name) { var d = KIT[name] || {}, x = {}; for (var k in d)
if (k !== "cat" && k !== "size" && k !== "parts")
x[k] = d[k]; return x; }
(function () {
var C = [], W = 0x8C877C, Wd = 0x77726A;
C.push(P("box", [78, 0.25, 3.4], [0, 0.06, -36.4], "water"), P("box", [3.4, 0.25, 72], [-36.4, 0.06, 0], "water"), P("box", [3.4, 0.25, 72], [36.4, 0.06, 0], "water"));
C.push(P("box", [34, 0.25, 3.4], [-22, 0.06, 36.4], "water"), P("box", [34, 0.25, 3.4], [22, 0.06, 36.4], "water"));
C.push(P("box", [5.6, 0.4, 7], [0, 0.3, 37.4], 0x6B4A2E));
C.push(P("cyl", [0.08, 0.08, 9, 4], [-2.6, 4.6, 35.2], "metal", { r: [0.95, 0, 0] }), P("cyl", [0.08, 0.08, 9, 4], [2.6, 4.6, 35.2], "metal", { r: [0.95, 0, 0] }));
C.push(P("box", [61, 0.2, 61], [0, 0.1, 0], 0x7E7A70));
[[0, -32, 64, 3], [0, 32, 64, 3], [-32, 0, 3, 64], [32, 0, 3, 64]].forEach(function (w) {
C.push(P("box", [w[2], 15, w[3]], [w[0], 7.5, w[1]], W));
crenels(C, w[0], 15, w[1], w[2], w[3], W);
});
[[-32, -32], [32, -32], [-32, 32], [32, 32]].forEach(function (t) { tower(C, t[0], t[1], 6, 27, { c: W, spire: 13 }); });
tower(C, -32, 0, 4.4, 20, { c: W, flat: true });
tower(C, 32, 0, 4.4, 20, { c: W, flat: true });
tower(C, 0, -32, 4.4, 22, { c: W, spire: 9 });
C.push(P("box", [16, 19, 9], [0, 9.5, 32], W));
crenels(C, 0, 19, 32, 16, 9, W);
tower(C, -8.5, 34.5, 4.6, 23, { c: W, spire: 10 });
tower(C, 8.5, 34.5, 4.6, 23, { c: W, spire: 10 });
C.push(P("box", [5, 7.6, 0.5], [0, 3.8, 36.75], "dark"));
C.push(P("box", [0.22, 7.2, 0.2], [-2.1, 3.8, 37.08], "metal", { rep: [7, 0.7, 0, 0] }), P("box", [5, 0.22, 0.2], [0, 1.6, 37.1], "metal", { rep: [4, 0, 1.8, 0] }));
C.push(P("box", [6.4, 1.2, 0.6], [0, 8.4, 36.8], Wd));
C.push(P("box", [30, 22, 22], [0, 11, -10], W));
crenels(C, 0, 22, -10, 30, 22, W);
windows(C, -11.25, 6, 1.05, 7, 3.75, 3, 5.4, false, [1.3, 3, 0.2]);
C.push(P("box", [3, 4.6, 0.7], [0, 2.3, 1.2], Wd));
C.push(P("box", [2.2, 7, 0.15], [-6.5, 15, 1.1], FLAG), P("box", [2.2, 7, 0.15], [6.5, 15, 1.1], FLAG));
C.push(P("box", [1.4, 1.4, 0.18], [-6.5, 15.6, 1.2], GOLDC), P("box", [1.4, 1.4, 0.18], [6.5, 15.6, 1.2], GOLDC));
squareTower(C, -8, -15, 12, 40, { c: W, pyramid: 11, turrets: true });
windows(C, -10, 26, -8.95, 2, 4, 3, 4.4, false, [1.1, 2.4, 0.2]);
tower(C, 10, -16, 3.6, 46, { c: W, spire: 15 });
tower(C, 15, 1, 2.4, 28, { c: W, spire: 8 });
C.push(P("box", [12, 13, 22], [21, 6.5, 5], W));
gableZ(C, 21, 13, 5, 12, 22, SLATE, W);
windowsX(C, 14.9, 6.8, -4, 6, 3.6, 1, 0, false, [0.2, 4.2, 1.3]);
C.push(P("box", [2.2, 2.2, 4], [21, 19, -3], Wd), P("box", [2.6, 0.6, 4.4], [21, 20.3, -3], Wd));
C.push(P("box", [9, 11, 16], [-21, 5.5, 8], 0x9A9488));
gableZ(C, -21, 11, 8, 9, 16, SLATE, 0x9A9488);
C.push(P("cyl", [1.7, 1.7, 0.2, 16], [-21, 8, 16.1], 0xB08CE8, { glow: true, r: [H, 0, 0] }));
C.push(P("box", [1.4, 3.4, 0.2], [-21, 3.4, 16.1], 0x7F6BC8, { glow: true, opa: 0.8 }));
C.push(P("box", [2, 3, 2], [-21, 16.4, 2.6], 0x9A9488), P("cone", [1.8, 6, 4], [-21, 20.9, 2.6], SLATE, { r: [0, Q, 0] }));
C.push(P("cyl", [1.4, 1.5, 1.1, 12], [9, 0.65, 20], 0x6E6A62), P("cyl", [0.08, 0.08, 2.6, 4], [7.8, 1.9, 20], "bark", { rep: [2, 2.4, 0, 0] }), P("box", [3, 0.3, 1.6], [9, 3.3, 20], 0x5A3A24));
C.push(P("box", [14, 4.4, 6], [18, 2.2, 26], 0x6B4A2E));
gableX(C, 18, 4.4, 26, 14, 6, 0x5A3A24, 0x6B4A2E);
A("castle", "structure", [78, 48, 82], C, keepExtra("castle"));
})();
(function () {
var C = [], ST = 0xEDE4D0, ST2 = 0xE2D6BE, RF = 0x55606E, CR = 0xC8A882;
C.push(P("box", [34, 20, 18], [0, 10, -14], ST));
C.push(P("box", [35, 1.2, 19], [0, 20.6, -14], CR));
C.push(P("box", [34.4, 2.6, 18.4], [0, 22.5, -14], RF));
C.push(P("box", [14, 24, 6], [0, 12, -3], ST2));
C.push(P("box", [14.6, 1.4, 6.6], [0, 24.7, -3], CR));
C.push(P("cyl", [1, 1, 19, 12], [-5.4, 9.5, 0.6], 0xF6F2E6, { rep: [4, 3.6, 0, 0] }));
C.push(P("box", [14, 1.6, 1.2], [0, 19.8, 0.4], CR));
C.push(P("cyl", [6.4, 6.8, 5, 20], [0, 24.5, -13], ST2), P("cyl", [6.9, 6.9, 0.8, 20], [0, 27.2, -13], CR));
C.push(P("sph", [6.3], [0, 27.4, -13], 0x6FA394), P("cyl", [1.2, 1.4, 2.6, 10], [0, 34.4, -13], ST2), P("sph", [0.9], [0, 36.4, -13], GOLDC));
[-1, 1].forEach(function (e) {
var wx = e * 26.5;
C.push(P("box", [13, 16, 36], [wx, 8, -4], ST));
C.push(P("box", [13.6, 1, 36.6], [wx, 16.5, -4], CR));
C.push(P("box", [12.4, 2.4, 35.4], [wx, 18.2, -4], RF));
C.push(P("box", [16, 19, 11], [wx, 9.5, 19], ST2));
C.push(P("box", [16.6, 1.2, 11.6], [wx, 19.6, 19], CR));
C.push(P("cyl", [5.2, 8.6, 4.4, 4], [wx, 22.4, 19], RF, { r: [0, Q, 0] }));
C.push(P("box", [1.4, 2, 1], [wx - 3.5, 22.6, 23.2], ST2, { rep: [3, 3.5, 0, 0] }), P("box", [0.9, 1.2, 0.2], [wx - 3.5, 22.6, 23.75], "glass", { rep: [3, 3.5, 0, 0] }));
windowsX(C, wx - e * 6.55, 4, -19, 9, 3.6, 3, 4.6, false, [0.2, 2.8, 1.3]);
windows(C, wx - 5.4, 4.5, 24.55, 4, 3.6, 3, 5, false, [1.3, 3, 0.2]);
C.push(P("sph", [0.5], [wx - e * 6.4, 17.6, -20], CR, { rep: [8, 0, 0, 4.6] }));
C.push(P("box", [1.2, 3.4, 1.2], [wx, 20.6, -16], ST2, { rep: [3, 0, 0, 8] }));
});
windows(C, -15.2, 4, -4.95, 4, 3, 3, 5.6, false, [1.3, 3.2, 0.2]);
windows(C, 6.2, 4, -4.95, 4, 3, 3, 5.6, false, [1.3, 3.2, 0.2]);
C.push(P("sph", [0.5], [-16, 21.9, -4.6], CR, { rep: [9, 4, 0, 0] }));
C.push(P("box", [4, 7, 0.5], [0, 3.5, 0.2], "dark"));
[0, 1, 2].forEach(function (i) { C.push(P("box", [16 - i * 2, 0.4, 2.2], [0, 0.2 + i * 0.4, 3.4 - i * 0.8], ST2)); });
C.push(P("box", [40, 0.15, 30], [0, 0.08, 15], 0xD6CCB4));
[-1, 1].forEach(function (e) {
C.push(P("box", [11, 0.4, 16], [e * 10.5, 0.2, 14], 0x5F8A4A), P("box", [11.4, 0.6, 0.4], [e * 10.5, 0.3, 6], 0x355E2C), P("box", [11.4, 0.6, 0.4], [e * 10.5, 0.3, 22], 0x355E2C));
C.push(P("cone", [0.8, 2.6, 8], [e * 6, 1.5, 7], 0x2E5A2A, { rep: [4, e * 3, 0, 0], rep2: [2, 0, 0, 14] }));
C.push(P("box", [1, 1.8, 1], [e * 17, 0.9, 10], ST2, { rep: [2, 0, 0, 8] }), P("sph", [0.6], [e * 17, 2.3, 10], 0xF2EEE6, { rep: [2, 0, 0, 8] }));
});
C.push(P("cyl", [3.6, 3.8, 0.8, 20], [0, 0.4, 15], CR), P("cyl", [3.2, 3.2, 0.5, 20], [0, 0.6, 15], "water"), P("cyl", [0.5, 0.7, 2.6, 10], [0, 1.6, 15], CR), P("sph", [0.7], [0, 3.2, 15], GOLDC));
C.push(P("box", [13, 0.3, 0.3], [-13.5, 2.2, 29.4], GOLDC), P("box", [13, 0.3, 0.3], [13.5, 2.2, 29.4], GOLDC));
C.push(P("box", [0.12, 2.4, 0.12], [-19.6, 1.2, 29.4], "metal", { rep: [13, 1, 0, 0] }), P("box", [0.12, 2.4, 0.12], [7.4, 1.2, 29.4], "metal", { rep: [13, 1, 0, 0] }));
C.push(P("box", [1.4, 4.4, 1.4], [-3.6, 2.2, 29.4], ST2), P("box", [1.4, 4.4, 1.4], [3.6, 2.2, 29.4], ST2));
C.push(P("sph", [0.7], [-3.6, 4.9, 29.4], GOLDC), P("sph", [0.7], [3.6, 4.9, 29.4], GOLDC), P("box", [5.8, 0.5, 0.2], [0, 4.2, 29.4], GOLDC));
A("palace", "structure", [84, 37, 62], C, keepExtra("palace"));
})();
(function () {
var C = [], ST = 0xE6DCC8, RF = 0x4A4F58, TR = 0xF4F0E6;
C.push(P("box", [22, 11, 13], [0, 5.5, -2], ST));
gableX(C, 0, 11, -2, 22, 13, RF, ST);
C.push(P("box", [22.6, 0.6, 13.6], [0, 5.6, -2], TR));
[-1, 1].forEach(function (e) {
C.push(P("box", [8, 8.6, 15], [e * 14, 4.3, 0.5], ST));
gableZ(C, e * 14, 8.6, 0.5, 8, 15, RF, ST);
windows(C, e * 14 - 1.6, 2.6, 8.05, 2, 3.2, 2, 3.8, false, [1.2, 2.2, 0.2]);
C.push(P("box", [1.3, 4.4, 1.3], [e * 10.6, 14.2, -2], 0x8A5A3A), P("box", [1.6, 0.4, 1.6], [e * 10.6, 16.5, -2], 0x6E4A30));
});
windows(C, -8.4, 2.8, 4.55, 7, 2.8, 2, 4.6, false, [1.2, 2.4, 0.2]);
C.push(P("cyl", [0.42, 0.48, 7.2, 12], [-3, 3.6, 6.8], TR, { rep: [4, 2, 0, 0] }));
C.push(P("box", [8.4, 1, 3.2], [0, 7.7, 6.2], TR), P("box", [8.8, 0.3, 3.6], [0, 8.35, 6.2], TR));
C.push(P("box", [0.25, 0.7, 0.25], [-4, 8.85, 7.8], TR, { rep: [9, 1, 0, 0] }), P("box", [8.6, 0.2, 0.3], [0, 9.25, 7.8], TR));
C.push(P("box", [2.2, 3.8, 0.4], [0, 1.9, 4.65], "dark"));
C.push(P("cyl", [1.2, 1.2, 0.2, 12], [0, 4.4, 4.6], WARM, { glow: true, opa: 0.8, r: [H, 0, 0], cyl: 1 }));
C.push(P("box", [6.6, 0.4, 2.6], [0, 0.2, 8.6], TR), P("box", [5.6, 0.4, 1.2], [0, 0.6, 8.2], TR));
C.push(P("box", [1.6, 1.8, 1.6], [-6, 13.2, 1.3], ST, { rep: [3, 6, 0, 0] }), P("box", [0.9, 1.1, 0.2], [-6, 13.2, 2.12], "glass", { rep: [3, 6, 0, 0] }));
C.push(P("cone", [1.3, 1.2, 4], [-6, 14.7, 1.3], RF, { r: [0, Q, 0], rep: [3, 6, 0, 0] }));
C.push(P("box", [2, 2.4, 2], [0, 18.2, -2], TR), P("cone", [1.8, 2.2, 8], [0, 20.5, -2], 0x5E7E76), P("sph", [0.25], [0, 21.7, -2], GOLDC));
C.push(P("box", [6, 0.08, 5], [0, 0.04, 11], 0xC8BCA2), P("box", [0.6, 0.9, 0.6], [-14, 0.45, 11.5], 0x355E2C, { rep: [4, 2.2, 0, 0] }), P("box", [0.6, 0.9, 0.6], [7.4, 0.45, 11.5], 0x355E2C, { rep: [4, 2.2, 0, 0] }));
C.push(P("cone", [0.6, 2.2, 8], [-4, 1.1, 9.4], 0x2E5A2A), P("cone", [0.6, 2.2, 8], [4, 1.1, 9.4], 0x2E5A2A));
A("manor", "structure", [34, 22, 26], C, keepExtra("manor"));
})();
(function () {
var C = [], ST = 0x8E8A82, ST2 = 0x7C786F, y = 9;
C.push(P("box", [92, 9, 66], [0, 4.5, -12], ST2));
crenels(C, 0, 9, -12, 92, 66, ST2);
[[-48, -30, 10, 7, 12], [48, -24, 9, 6, 13], [-40, 14, 8, 6, 8], [46, 12, 8, 5, 7], [0, -46, 16, 7, 6], [-26, -46, 10, 6, 6], [28, -46, 11, 6, 6]].forEach(function (r) {
C.push(P("ell", [r[2], r[3], r[4]], [r[0], r[3] * 0.45, r[1]], 0x5E5A52));
});
C.push(P("box", [5, 7.6, 0.5], [0, 3.8, 21.25], "dark"));
C.push(P("box", [7, 1.4, 0.8], [0, 8, 21.2], ST));
tower(C, -6, 23, 2.4, 12, { c: ST, spire: 6, lit: true });
tower(C, 6, 23, 2.4, 12, { c: ST, spire: 6, lit: true });
windows(C, -40, 4, 21.05, 6, 5, 1, 0, true, [1, 2.4, 0.2]);
windows(C, 15, 4, 21.05, 6, 5, 1, 0, true, [1, 2.4, 0.2]);
C.push(P("box", [16, 16, 40], [-20, y + 8, -12], ST));
gableZ(C, -20, y + 16, -12, 16, 40, SLATE, ST);
windowsX(C, -28.1, y + 7, -28, 8, 4.6, 1, 0, true, [0.2, 7, 1.5]);
windowsX(C, -11.9, y + 7, -28, 8, 4.6, 1, 0, true, [0.2, 7, 1.5]);
C.push(P("cyl", [2.4, 2.4, 0.2, 16], [-20, y + 12, 8.1], WARM, { glow: true, r: [H, 0, 0] }));
C.push(P("box", [1.2, 10, 1.2], [-28.6, y + 5, -30], ST2, { rep: [9, 0, 0, 4.6] }));
C.push(P("box", [34, 16, 18], [12, y + 8, -22], ST));
gableX(C, 12, y + 16, -22, 34, 18, SLATE, ST);
windows(C, -1.5, y + 4, -12.95, 10, 3, 3, 4.4, true, [1, 2.2, 0.2]);
C.push(P("box", [1.6, 1.8, 1.6], [0, y + 19.6, -15], ST, { rep: [5, 6, 0, 0] }), P("box", [0.9, 1.1, 0.2], [0, y + 19.6, -14.15], WARM, { glow: true, rep: [5, 6, 0, 0] }));
C.push(P("box", [14, 12, 26], [24, y + 6, 0], ST));
gableZ(C, 24, y + 12, 0, 14, 26, SLATE, ST);
windowsX(C, 16.9, y + 3.5, -10, 6, 4, 2, 4.4, true, [0.2, 2.2, 1]);
squareTower(C, 4, 4, 10, 34, { c: ST, y0: y, pyramid: 12, turrets: true });
C.push(P("cyl", [3, 3, 0.3, 24], [4, y + 27, 9.1], 0xF4E6C0, { glow: true, r: [H, 0, 0] }));
C.push(P("box", [0.25, 2.4, 0.2], [4, y + 28, 9.3], "dark"), P("box", [1.8, 0.25, 0.2], [4.7, y + 27, 9.3], "dark"));
windows(C, 4, y + 6, 9.05, 1, 0, 4, 5, true, [1.2, 2.6, 0.2]);
tower(C, 30, -30, 5, 58, { c: ST, y0: y, spire: 18, lit: true });
C.push(P("cyl", [6.4, 6.4, 0.5, 16], [30, y + 50, -30], ST2), P("cyl", [0.1, 0.1, 1.2, 4], [30 - 6, y + 50.8, -30], "metal", { rep: [7, 2, 0, 0] }));
[[-36, -36, 4.2, 36, 13], [-34, -2, 3.4, 28, 10], [-6, -36, 4.6, 42, 15], [42, -8, 3.4, 30, 11], [34, 10, 3, 24, 9], [-6, -10, 3, 32, 11],
[12, -36, 3.6, 38, 12], [-30, 10, 2.6, 22, 8], [18, 8, 2.4, 26, 9], [42, -38, 3, 24, 9], [-44, -20, 3, 20, 8]].forEach(function (t) {
tower(C, t[0], t[1], t[2], t[3], { c: ST, y0: y, spire: t[4], lit: true });
});
C.push(P("box", [18, 4.4, 4.4], [40, y + 13, 20], ST));
gableX(C, 40, y + 15.2, 20, 18, 4.4, SLATE, ST);
windows(C, 33, y + 13, 22.25, 6, 2.6, 1, 0, true, [0.9, 1.4, 0.2]);
C.push(P("box", [2, 11, 3], [36, y + 5.5, 20], ST2, { rep: [2, 8, 0, 0] }));
C.push(P("ell", [6, 6, 6], [52, 3, 20], 0x5E5A52));
tower(C, 52, 20, 4, 30, { c: ST, y0: 2, spire: 12, lit: true });
C.push(P("box", [11, 4, 6], [-40, 2, 29], 0xBFE6C8, { opa: 0.45 }));
gableX(C, -40, 4, 29, 11, 6, 0xA8DDB8, 0xBFE6C8);
C.push(P("box", [11, 4, 6], [-26, 2, 29], 0xBFE6C8, { opa: 0.45 }));
gableX(C, -26, 4, 29, 11, 6, 0xA8DDB8, 0xBFE6C8);
C.push(P("box", [10, 0.3, 5], [-40, 0.3, 29], 0x4C7A3A), P("box", [10, 0.3, 5], [-26, 0.3, 29], 0x4C7A3A));
C.push(P("cyl", [0.08, 0.08, 3, 4], [-3, 1.5, 30], "metal", { rep: [4, 0, 0, 3], rep2: [2, 6, 0, 0] }), P("box", [0.5, 0.6, 0.5], [-3, 3.2, 30], WARM, { glow: true, rep: [4, 0, 0, 3], rep2: [2, 6, 0, 0] }));
A("wizardschool", "structure", [120, 86, 96], C);
})();
(function () {
var C = [], WH = 0xF4F0EA, BL = 0x3A68D2, PK = 0xE8A8C4, y = 0;
C.push(P("box", [44, 10, 34], [0, 5, -2], WH));
crenels(C, 0, 10, -2, 44, 34, WH);
C.push(P("box", [28, 10, 22], [0, 15, -6], WH));
crenels(C, 0, 20, -6, 28, 22, WH);
C.push(P("box", [14, 12, 12], [0, 26, -8], WH));
gableX(C, 0, 32, -8, 14, 12, BL, WH);
[[-22, 15, 4, 16, 10], [22, 15, 4, 16, 10], [-22, -19, 4, 18, 11], [22, -19, 4, 18, 11], [-14, 5, 2.8, 26, 10], [14, 5, 2.8, 26, 10],
[-14, -17, 3, 30, 11], [14, -17, 3, 30, 11], [-7, -2, 2.2, 40, 10], [7, -2, 2.2, 40, 10], [0, -14, 3.4, 52, 16], [-8, -15, 1.8, 36, 8], [8, -15, 1.8, 36, 8]].forEach(function (t) {
tower(C, t[0], t[1], t[2], t[3], { c: WH, spire: t[4], roof: BL, flagC: PK });
});
windows(C, -16, 4, 15.05, 9, 4, 1, 0, false, [1.2, 2.6, 0.2]);
windows(C, -10, 13.5, 5.05, 6, 4, 1, 0, false, [1.2, 2.6, 0.2]);
windows(C, -4, 24, -1.95, 3, 4, 1, 0, false, [1.2, 2.6, 0.2]);
C.push(P("box", [4.4, 7, 0.5], [0, 3.5, 15.2], "dark"));
C.push(P("cyl", [2.2, 2.2, 0.6, 16, 1, false, 0, Math.PI], [0, 7, 15.2], GOLDC, { r: [H, 0, 0] }));
C.push(P("box", [8, 0.5, 4], [0, 0.25, 17.5], WH), P("box", [0.4, 2, 0.4], [-4, 1, 19], GOLDC, { rep: [2, 8, 0, 0] }));
C.push(P("box", [2.2, 9, 0.15], [-6, 14, 15.1], PK), P("box", [2.2, 9, 0.15], [6, 14, 15.1], PK));
A("fairycastle", "structure", [54, 70, 46], C);
})();
if (typeof PLANS !== "undefined") {
if (PLANS.castle)
PLANS.palace = PLANS.palace || { mode: "hall", w: 22, d: 30, fill: "castle", wall: 0xEDE4D0, floor: "marble", h: 7 };
PLANS.wizardschool = { mode: "hall", w: 20, d: 36, fill: "castle", wall: 0x8E8A82, floor: "stone", h: 7, side: ["classroom", "library", "chamber", "classroom"] };
PLANS.fairycastle = { mode: "hall", w: 20, d: 28, fill: "castle", wall: 0xF4F0EA, floor: "marble", h: 7 };
if (!PLANS.manor)
PLANS.manor = { mode: "rooms", rooms: ["living", "dining", "kitchen", "study", "ballroom", "bedroom", "bedroom", "bathroom", "bedroom", "nursery", "bathroom"], wall: 0xE6DCC8, floor: "wood" };
}
if (typeof STOREYS !== "undefined") {
if (!STOREYS.manor)
STOREYS.manor = 2;
if (!STOREYS.palace)
STOREYS.palace = 2;
if (!STOREYS.wizardschool)
STOREYS.wizardschool = 3;
if (!STOREYS.fairycastle)
STOREYS.fairycastle = 2;
}
if (typeof BELONGS !== "undefined") {
BELONGS.wizardschool = [{ n: [3, 6], kind: "wizard", role: "teacher" }, { n: [4, 8], kind: "student", role: "pupil" }];
BELONGS.fairycastle = [{ n: [1, 2], kind: "princess", role: "keeper" }, { n: [1, 3], kind: "knight", role: "guard" }];
}
if (typeof ROOMNAME !== "undefined") {
ROOMNAME.wizardschool = ROOMNAME.wizardschool || "great hall";
}
var WORDS = {
wizardschool: ["hogwarts", "school of magic", "magic school", "school for wizards", "wizard school", "wizarding school", "school of witchcraft", "school of witchcraft and wizardry",
"academy of magic", "magic academy", "magical academy", "witch school", "school for witches", "castle school", "school in a castle", "sorcery school", "mage academy"],
fairycastle: ["fairy tale castle", "fairytale castle", "fairy-tale castle", "princess castle", "princess's castle", "disney castle", "cinderella castle", "cinderella's castle",
"sleeping beauty castle", "sleeping beauty's castle", "neuschwanstein", "magic castle", "enchanted castle", "storybook castle", "white castle", "castle with blue spires", "fairy castle"],
palace: ["versailles", "buckingham palace", "royal court", "king's palace", "queen's palace", "emperor's palace", "sultan's palace", "palace gardens"],
manor: ["estate house", "country estate", "stately mansion", "big mansion", "grand mansion", "rich man's house", "plantation house", "villa estate"],
castle: ["medieval castle", "stone castle", "castle with a moat", "moated castle", "king's castle", "knight's castle", "great castle", "castle keep"]
};
if (typeof learnWord === "function")
Object.keys(WORDS).forEach(function (k) {
if (!KIT[k])
return;
WORDS[k].forEach(function (w) {
if (typeof PHRASES !== "undefined")
for (var i = PHRASES.length - 1; i >= 0; i--)
if (PHRASES[i][0] === w && PHRASES[i][1] !== k)
PHRASES.splice(i, 1);
if (typeof VOCAB !== "undefined")
Object.keys(VOCAB).forEach(function (o) { if (o !== k && VOCAB[o]) {
var j = VOCAB[o].indexOf(w);
if (j > -1)
VOCAB[o].splice(j, 1);
} });
learnWord(k, w);
});
});
if (typeof EFFECTS !== "undefined") {
var fx = function (spark) {
return function (g, spec) {
var flags = [], lights = [], s = String(spec.id || ""), ph = 0;
for (var i = 0; i < s.length; i++)
ph = (ph * 31 + s.charCodeAt(i)) % 628;
ph /= 100;
g.children.forEach(function (c) {
if (!c.material || !c.geometry || !c.geometry.parameters)
return;
var p = c.geometry.parameters;
if (c.geometry.type === "BoxGeometry" && p.depth < 0.1 && p.width > 1.5 && p.width < 2.5 && p.height < 1.4) {
c.userData.fx0 = c.position.x;
c.userData.fy0 = c.rotation.y;
flags.push(c);
}
else if (c.material.type === "MeshBasicMaterial" && c.material.color && c.material.color.getHex() === WARM)
lights.push(c.material);
});
var base = lights.map(function (m) { return m.opacity; }), sp = null;
if (spark && typeof particles === "function") {
sp = particles(50, [26, 26, 26], 0xFFE7A0, 0.5, 0.8);
if (sp) {
sp.position.set(30, 70, -30);
g.add(sp);
}
}
return function (t, dt) {
for (var i = 0; i < flags.length; i++) {
var f = flags[i];
f.rotation.y = f.userData.fy0 + Math.sin(t * 2.6 + ph + i) * 0.35;
}
for (var j = 0; j < lights.length; j++)
lights[j].opacity = base[j] * (0.86 + 0.14 * Math.sin(t * (3 + j % 3) + ph + j * 1.7));
if (sp && typeof rise === "function")
rise(sp, dt, 0.8, 13);
};
};
};
["castle", "palace", "manor", "fairycastle"].forEach(function (k) { if (!EFFECTS[k])
EFFECTS[k] = fx(false); });
EFFECTS.wizardschool = fx(true);
}
})();
