/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TR_MAT = {};
function trM(c, tex, opt) { return __ZC(194, 0, this, arguments, new.target); }
function trB(g, w, h, d, mat, x, y, z, rx, ry, rz) {
var geo = new THREE.BoxGeometry(w, h, d);
if (mat && mat.map && typeof metreUVs === "function") {
try {
metreUVs(geo, "box", [w, h, d]);
}
catch (e) { }
}
var m = new THREE.Mesh(geo, mat);
m.position.set(x || 0, y || 0, z || 0);
if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0);
g.add(m);
return m;
}
function trC(g, a, b, h, s, mat, x, y, z, rx, ry, rz) {
var m = new THREE.Mesh(new THREE.CylinderGeometry(a, b, h, s || 10), mat);
m.position.set(x || 0, y || 0, z || 0);
if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0);
g.add(m);
return m;
}
function trS(g, r, mat, x, y, z, sx, sy, sz) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), mat); m.position.set(x || 0, y || 0, z || 0); if (sx)
m.scale.set(sx, sy || sx, sz || sx); g.add(m); return m; }
function trDone(g) { var o = g; if (typeof psMerge === "function") {
try {
o = psMerge(g) || g;
}
catch (e) {
o = g;
}
} return o; }
function trRand(seed) { var s = seed || 1; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
var TR_WOOD = function () { return trM(0x6A4428, "wood"); }, TR_WOODD = function () { return trM(0x3E2814, "wood"); }, TR_IRON = function () { return trM(0x2E2E32, null, "shine"); }, TR_PLASTER = function () { return trM(0xE4DCCB, "plaster"); }, TR_STONE = function () { return trM(0x9A9286, "stone"); }, TR_BRASS = function () { return trM(0xC9A040, null, "shine"); };
var TR_PIECES = {}, TR_BOX = {};
function trPiece(k, w, d, solid, fn) { TR_PIECES[k] = fn; TR_BOX[k] = [w, d]; if (solid)
TR_PIECES[k].solid = true; }
(function () {
for (var n = 1; n <= 40; n++)
(function (n) {
var L = n * 0.5;
trPiece("trw" + n, L, 0.16, true, function () {
var g = new THREE.Group();
trB(g, L, 3.2, 0.14, TR_PLASTER(), 0, 1.6, 0);
trB(g, L, 0.16, 0.18, TR_WOODD(), 0, 0.08, 0);
trB(g, L, 0.06, 0.17, TR_WOODD(), 0, 0.95, 0);
return trDone(g);
});
})(n);
trPiece("trdoorframe", 1.5, 0.2, false, function () {
var g = new THREE.Group(), w = TR_WOODD();
trB(g, 0.1, 2.3, 0.2, w, -0.75, 1.15, 0);
trB(g, 0.1, 2.3, 0.2, w, 0.75, 1.15, 0);
trB(g, 1.6, 0.14, 0.2, w, 0, 2.33, 0);
trB(g, 1.5, 0.9, 0.14, TR_PLASTER(), 0, 2.75, 0);
return trDone(g);
});
})();
trPiece("trsort", 2.2, 0.5, true, function () {
var g = new THREE.Group(), w = TR_WOOD(), wd = TR_WOODD(), r = trRand(7);
trB(g, 2.2, 2.1, 0.04, wd, 0, 1.05, -0.22);
for (var i = 0; i <= 8; i++)
trB(g, 0.03, 1.4, 0.4, w, -1.08 + i * 0.27, 1.3, 0);
for (var j = 0; j <= 6; j++)
trB(g, 2.2, 0.03, 0.4, w, 0, 0.6 + j * 0.233, 0);
trB(g, 2.2, 0.6, 0.45, wd, 0, 0.3, 0);
for (var a = 0; a < 8; a++)
for (var b = 0; b < 6; b++)
if (r() < 0.7)
trB(g, 0.18, 0.03 + r() * 0.1, 0.25, trM(r() < 0.5 ? 0xF2EEE2 : 0xE8DCC0), -0.95 + a * 0.27, 0.63 + b * 0.233 + 0.04, 0.04);
return trDone(g);
});
trPiece("trsacks", 1.6, 1.1, true, function () {
var g = new THREE.Group(), m = trM(0xD8C8A0), r = trRand(3);
for (var i = 0; i < 6; i++) {
var x = -0.55 + (i % 3) * 0.55, y = i < 3 ? 0.32 : 0.82, z = (i < 3 ? 0 : 0.05) + (r() - 0.5) * 0.2;
trS(g, 0.32, m, x, y, z, 1, 1.15, 0.8);
trC(g, 0.06, 0.1, 0.14, 8, m, x, y + 0.4, z);
}
return trDone(g);
});
trPiece("trchurns", 1.4, 0.6, true, function () {
var g = new THREE.Group(), m = trM(0xB8BCC2, null, "shine");
for (var i = 0; i < 3; i++) {
var x = -0.45 + i * 0.45;
trC(g, 0.18, 0.2, 0.62, 14, m, x, 0.31, 0);
trC(g, 0.1, 0.18, 0.16, 14, m, x, 0.7, 0);
trC(g, 0.11, 0.11, 0.06, 14, m, x, 0.8, 0);
}
return trDone(g);
});
trPiece("trhay", 2.2, 1.2, true, function () {
var g = new THREE.Group(), m = trM(0xD8B85A, "wood"), s = trM(0x8A6A2A);
[[-0.55, 0.3, 0], [0.55, 0.3, 0], [0, 0.9, 0], [-0.55, 0.3, 0.6], [0.55, 0.3, 0.6]].forEach(function (p) { trB(g, 1.05, 0.58, 0.55, m, p[0], p[1], p[2] - 0.3); trB(g, 0.02, 0.6, 0.57, s, p[0] - 0.25, p[1], p[2] - 0.3); trB(g, 0.02, 0.6, 0.57, s, p[0] + 0.25, p[1], p[2] - 0.3); });
return trDone(g);
});
trPiece("trstall", 3, 0.16, true, function () {
var g = new THREE.Group(), w = TR_WOOD(), wd = TR_WOODD();
[-1.45, 0, 1.45].forEach(function (x) { trB(g, 0.14, 1.8, 0.14, wd, x, 0.9, 0); });
for (var i = 0; i < 4; i++)
trB(g, 2.9, 0.2, 0.06, w, 0, 0.2 + i * 0.25, 0);
trB(g, 3, 0.1, 0.12, wd, 0, 1.75, 0);
return trDone(g);
});
trPiece("trtrough", 1.8, 0.6, true, function () {
var g = new THREE.Group(), w = TR_WOODD();
trB(g, 1.8, 0.08, 0.6, w, 0, 0.1, 0);
trB(g, 1.8, 0.45, 0.06, w, 0, 0.35, 0.27);
trB(g, 1.8, 0.45, 0.06, w, 0, 0.35, -0.27);
trB(g, 0.06, 0.45, 0.6, w, 0.87, 0.35, 0);
trB(g, 0.06, 0.45, 0.6, w, -0.87, 0.35, 0);
trB(g, 1.7, 0.04, 0.5, trM(0x5A7A9A, null, "shine"), 0, 0.48, 0);
return trDone(g);
});
trPiece("trsaddles", 1.6, 0.6, false, function () {
var g = new THREE.Group(), w = TR_WOODD(), l = trM(0x7A4A24, null, "shine");
trB(g, 1.6, 0.08, 0.08, w, 0, 1.2, -0.25);
[-0.5, 0.5].forEach(function (x) {
trB(g, 0.12, 1.3, 0.12, w, x, 0.65, -0.25);
trB(g, 0.1, 0.1, 0.55, w, x, 1.15, 0);
trS(g, 0.26, l, x, 1.3, 0.02, 1.1, 0.45, 1.3);
trB(g, 0.06, 0.5, 0.04, l, x - 0.2, 0.95, 0.05);
});
return trDone(g);
});
trPiece("trtoolwall", 2, 0.15, false, function () {
var g = new THREE.Group(), b = trM(0x8A6A44, "wood"), wd = TR_WOODD(), ir = TR_IRON();
trB(g, 2, 1.1, 0.04, b, 0, 1.65, -0.05);
for (var i = 0; i < 6; i++) {
var x = -0.8 + i * 0.32;
trB(g, 0.04, 0.55, 0.04, wd, x, 1.6, 0.0);
if (i % 2)
trB(g, 0.18, 0.1, 0.04, ir, x, 1.88, 0.0);
else
trB(g, 0.08, 0.22, 0.03, ir, x, 1.35, 0.0);
}
trB(g, 0.5, 0.06, 0.03, ir, 0.2, 2.1, 0.0);
trC(g, 0.12, 0.12, 0.02, 16, ir, -0.55, 1.3, 0.0, Math.PI / 2, 0, 0);
return trDone(g);
});
trPiece("trlogs", 2.4, 1.1, true, function () {
var g = new THREE.Group(), bark = trM(0x5A3E26, "wood"), end = trM(0xC8A070), r = trRand(11);
for (var row = 0; row < 3; row++)
for (var i = 0; i < 5 - row; i++) {
var x = -0.9 + i * 0.45 + row * 0.22, y = 0.22 + row * 0.38;
trC(g, 0.2, 0.2, 2.2, 10, bark, x, y, 0, Math.PI / 2, 0, 0);
trC(g, 0.19, 0.19, 0.02, 10, end, x, y, 1.11, Math.PI / 2, 0, 0);
}
return trDone(g);
});
trPiece("trsaw", 3, 1.2, true, function () {
var g = new THREE.Group(), w = TR_WOOD(), ir = TR_IRON();
trB(g, 3, 0.1, 1.1, w, 0, 0.9, 0);
[[-1.4, -0.5], [1.4, -0.5], [-1.4, 0.5], [1.4, 0.5]].forEach(function (p) { trB(g, 0.12, 0.9, 0.12, TR_WOODD(), p[0], 0.45, p[1]); });
trC(g, 0.4, 0.4, 0.02, 24, trM(0xB8BCC2, null, "shine"), 0, 1.05, 0, Math.PI / 2, 0, 0);
trB(g, 0.5, 0.4, 0.3, ir, 0, 0.62, 0);
trB(g, 2.2, 0.06, 0.3, trM(0xD8B07A, "wood"), -0.6, 0.98, 0.3);
return trDone(g);
});
trPiece("trlathe", 2.2, 0.8, true, function () {
var g = new THREE.Group(), w = TR_WOODD(), ir = TR_IRON();
trB(g, 2.2, 0.12, 0.5, w, 0, 0.9, 0);
trB(g, 0.14, 0.9, 0.4, w, -0.95, 0.45, 0);
trB(g, 0.14, 0.9, 0.4, w, 0.95, 0.45, 0);
trB(g, 0.3, 0.3, 0.3, ir, -0.8, 1.1, 0);
trB(g, 0.25, 0.25, 0.25, ir, 0.7, 1.08, 0);
trC(g, 0.07, 0.07, 1.3, 10, trM(0xD8B07A, "wood"), -0.05, 1.1, 0, 0, 0, Math.PI / 2);
trC(g, 0.3, 0.3, 0.06, 16, ir, -1.15, 1.1, 0, 0, 0, Math.PI / 2);
return trDone(g);
});
trPiece("trbanker", 1.6, 1.2, true, function () {
var g = new THREE.Group(), st = TR_STONE(), w = TR_WOODD();
trB(g, 1.2, 0.75, 1, trM(0x8A847A, "stone"), 0, 0.38, 0);
trB(g, 0.9, 0.6, 0.7, trM(0xD8D0C0, "stone"), 0, 1.05, 0);
trC(g, 0.08, 0.08, 0.18, 10, w, 0.55, 0.84, 0.3, 0, 0, Math.PI / 2);
trB(g, 0.03, 0.03, 0.25, TR_IRON(), 0.35, 0.8, 0.3);
return trDone(g);
});
trPiece("trstones", 2.4, 1.4, true, function () {
var g = new THREE.Group(), r = trRand(5);
for (var i = 0; i < 6; i++) {
var w = 0.6 + r() * 0.5, h = 0.4 + r() * 0.3, d = 0.5 + r() * 0.4;
trB(g, w, h, d, trM(r() < 0.5 ? 0xD8D0C0 : 0xB8B0A2, "stone"), -0.8 + (i % 3) * 0.8, i < 3 ? h / 2 : 0.75 + h / 2, (i < 3 ? 0 : 0.1) - 0.1);
}
return trDone(g);
});
trPiece("trglassfurnace", 2.2, 2.2, true, function () {
var g = new THREE.Group(), br = trM(0xA8624A, "brick");
trC(g, 1.05, 1.1, 1.6, 18, br, 0, 0.8, 0);
var d = new THREE.Mesh(new THREE.SphereGeometry(1.05, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), br);
d.position.y = 1.6;
g.add(d);
trC(g, 0.22, 0.3, 1.4, 10, br, 0, 2.9, 0);
[0, 2.1, -2.1].forEach(function (a) { trC(g, 0.22, 0.22, 0.1, 16, trM(0xFF9A3A, null, "glow"), Math.sin(a) * 1.06, 1.0, Math.cos(a) * 1.06, Math.PI / 2, a, 0); });
trB(g, 1.2, 0.1, 0.4, TR_IRON(), 0, 0.85, 1.3);
return trDone(g);
});
trPiece("trglassbench", 1.8, 0.8, true, function () {
var g = new THREE.Group(), w = TR_WOODD(), ir = TR_IRON();
trB(g, 1.8, 0.08, 0.5, w, 0, 0.62, 0);
trB(g, 0.08, 0.62, 0.45, w, -0.8, 0.31, 0);
trB(g, 0.08, 0.62, 0.45, w, 0.8, 0.31, 0);
trB(g, 0.06, 0.2, 0.8, ir, -0.85, 0.8, 0);
trB(g, 0.06, 0.2, 0.8, ir, 0.85, 0.8, 0);
trC(g, 0.02, 0.02, 1.6, 6, ir, 0.2, 0.92, 0.1, 0, 0, Math.PI / 2);
trS(g, 0.12, trM(0x8ADAE8, null, "glass"), 1.05, 0.92, 0.1);
for (var i = 0; i < 5; i++)
trS(g, 0.08 + i * 0.01, trM([0x3A8AD0, 0x3AB86A, 0xD8A83A, 0xC83A6A, 0x8ADAE8][i], null, "glass"), -0.7 + i * 0.3, 0.75, -0.1, 1, 1.4, 1);
return trDone(g);
});
trPiece("trpump", 2.4, 1.6, true, function () {
var g = new THREE.Group(), gr = trM(0x3A5A4A, null, "shine"), ir = TR_IRON(), br = TR_BRASS();
trB(g, 2.4, 0.3, 1.4, TR_STONE(), 0, 0.15, 0);
trC(g, 0.42, 0.42, 1.6, 16, gr, -0.6, 1.1, 0);
trC(g, 0.45, 0.45, 0.08, 16, br, -0.6, 1.92, 0);
trC(g, 0.65, 0.65, 0.1, 20, ir, 0.55, 1.4, 0.55, Math.PI / 2, 0, 0);
trC(g, 0.08, 0.08, 1.4, 8, ir, 0.55, 1.4, 0, Math.PI / 2, 0, 0);
trC(g, 0.14, 0.14, 1.5, 10, trM(0x5A6A7A, null, "shine"), 0.4, 0.45, 0, 0, 0, Math.PI / 2);
trC(g, 0.12, 0.12, 0.04, 14, trM(0xF2EAD2, null, "glow"), -0.6, 1.4, 0.43, Math.PI / 2, 0, 0);
return trDone(g);
});
trPiece("trmillstone", 2, 2, true, function () {
var g = new THREE.Group(), st = trM(0xA89C8A, "stone"), w = TR_WOOD();
trB(g, 2, 0.7, 2, TR_WOODD(), 0, 0.35, 0);
trC(g, 0.85, 0.85, 0.25, 24, st, 0, 0.83, 0);
trC(g, 0.85, 0.85, 0.25, 24, st, 0, 1.1, 0);
var h = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.12, 0.6, 4), w);
h.position.set(0, 1.6, 0);
h.rotation.y = Math.PI / 4;
g.add(h);
trB(g, 0.12, 1.3, 0.12, TR_WOODD(), 0.75, 1.6, 0);
trB(g, 0.9, 0.1, 0.1, TR_WOODD(), 0.35, 2.2, 0);
return trDone(g);
});
trPiece("trnets", 2.4, 0.3, false, function () {
var g = new THREE.Group(), wd = TR_WOODD(), n = trM(0x6A7A5A), cork = trM(0xC8A060);
trB(g, 0.1, 2, 0.1, wd, -1.15, 1, 0);
trB(g, 0.1, 2, 0.1, wd, 1.15, 1, 0);
trB(g, 2.4, 0.08, 0.08, wd, 0, 1.95, 0);
for (var i = 0; i < 6; i++) {
trB(g, 0.34, 1.3 + ((i * 7) % 3) * 0.1, 0.02, n, -0.95 + i * 0.38, 1.25, 0.02, 0, 0, 0.04 * (i % 2 ? 1 : -1));
trS(g, 0.05, cork, -0.95 + i * 0.38, 0.58, 0.04);
}
return trDone(g);
});
trPiece("trfishtable", 2.2, 0.9, true, function () {
var g = new THREE.Group(), st = trM(0xB8BCC2, null, "shine"), ice = trM(0xE8F4F8), r = trRand(9);
trB(g, 2.2, 0.08, 0.9, st, 0, 0.88, 0);
[[-1, -0.38], [1, -0.38], [-1, 0.38], [1, 0.38]].forEach(function (p) { trB(g, 0.07, 0.88, 0.07, st, p[0], 0.44, p[1]); });
trB(g, 2.1, 0.1, 0.8, ice, 0, 0.97, 0);
for (var i = 0; i < 9; i++) {
var f = trS(g, 0.08, trM(r() < 0.5 ? 0x8A9AA8 : 0xB8A890, null, "shine"), -0.85 + (i % 5) * 0.42, 1.06, -0.2 + Math.floor(i / 5) * 0.35, 2.6, 0.6, 1);
f.rotation.y = r() * 0.6 - 0.3;
}
return trDone(g);
});
trPiece("tricecrates", 1.8, 1, true, function () {
var g = new THREE.Group(), w = TR_WOOD(), ice = trM(0xE8F4F8), r = trRand(4);
[[-0.45, 0.25, 0], [0.45, 0.25, 0], [0, 0.75, 0]].forEach(function (p, k) {
trB(g, 0.85, 0.5, 0.9, w, p[0], p[1], p[2]);
trB(g, 0.78, 0.06, 0.82, ice, p[0], p[1] + 0.24, p[2]);
for (var i = 0; i < 3; i++)
trS(g, 0.07, trM(0x8A9AA8, null, "shine"), p[0] - 0.2 + i * 0.2, p[1] + 0.3, p[2] + (r() - 0.5) * 0.4, 2.4, 0.6, 1);
});
return trDone(g);
});
trPiece("trwheelstand", 1.8, 1, true, function () {
var g = new THREE.Group(), w = trM(0x8A6A44, "wood"), ir = TR_IRON();
trB(g, 0.3, 0.6, 0.3, TR_WOODD(), 0, 0.3, 0);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.06, 8, 24), w);
rim.position.set(0, 0.75, 0);
rim.rotation.x = Math.PI / 2;
g.add(rim);
var tyre = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.025, 6, 24), ir);
tyre.position.copy(rim.position);
tyre.rotation.x = Math.PI / 2;
g.add(tyre);
for (var i = 0; i < 10; i++) {
var a = i * Math.PI / 5;
trB(g, 0.04, 0.03, 0.66, w, Math.sin(a) * 0.35, 0.75, Math.cos(a) * 0.35, 0, a, 0);
}
trC(g, 0.13, 0.13, 0.25, 12, TR_WOODD(), 0, 0.75, 0);
return trDone(g);
});
trPiece("trtypecase", 1.6, 0.8, true, function () {
var g = new THREE.Group(), w = TR_WOODD(), r = trRand(2);
trB(g, 1.6, 1, 0.6, w, 0, 0.5, 0);
var top = trB(g, 1.5, 0.06, 0.7, trM(0x8A6A44, "wood"), 0, 1.2, 0.05, -0.35, 0, 0);
for (var i = 0; i < 12; i++)
for (var j = 0; j < 4; j++)
trB(g, 0.1, 0.02, 0.12, trM(r() < 0.5 ? 0x6A6A70 : 0x4A4A50, null, "shine"), -0.66 + i * 0.12, 1.24 - j * 0.05, 0.25 - j * 0.15, -0.35, 0, 0);
return trDone(g);
});
trPiece("trpaper", 1.2, 0.8, true, function () {
var g = new THREE.Group(), p = trM(0xF0ECE0), s = trM(0x8A6A44);
[[-0.3, 0], [0.3, 0], [0, 0.3]].forEach(function (q, k) { var h = 0.4 + k * 0.15; trB(g, 0.55, h, 0.4, p, q[0], h / 2, q[1] - 0.15); trB(g, 0.56, 0.02, 0.02, s, q[0], h * 0.6, q[1] + 0.05); });
return trDone(g);
});
trPiece("trclockwall", 2.2, 0.15, false, function () {
var g = new THREE.Group(), w = TR_WOODD(), face = trM(0xF4EEDC), br = TR_BRASS();
trB(g, 2.2, 1.4, 0.04, trM(0x5A3A22, "wood"), 0, 1.75, -0.06);
[[-0.75, 2.1, 0.22], [0, 2.15, 0.3], [0.75, 2.1, 0.2], [-0.45, 1.5, 0.17], [0.35, 1.45, 0.24], [0.9, 1.5, 0.14], [-0.95, 1.45, 0.12]].forEach(function (c) {
trC(g, c[2] + 0.04, c[2] + 0.04, 0.05, 20, c[2] > 0.2 ? br : w, c[0], c[1], 0, Math.PI / 2, 0, 0);
trC(g, c[2], c[2], 0.06, 20, face, c[0], c[1], 0.01, Math.PI / 2, 0, 0);
trB(g, 0.015, c[2] * 0.8, 0.01, w, c[0], c[1] + c[2] * 0.3, 0.05);
trB(g, c[2] * 0.6, 0.015, 0.01, w, c[0] + c[2] * 0.25, c[1], 0.05);
});
return trDone(g);
});
trPiece("trcuttable", 2.4, 1.2, true, function () {
var g = new THREE.Group(), w = TR_WOOD();
trB(g, 2.4, 0.08, 1.2, w, 0, 0.88, 0);
[[-1.1, -0.5], [1.1, -0.5], [-1.1, 0.5], [1.1, 0.5]].forEach(function (p) { trB(g, 0.1, 0.88, 0.1, TR_WOODD(), p[0], 0.44, p[1]); });
trB(g, 1.7, 0.01, 0.9, trM(0x2A4A7A), -0.2, 0.93, 0);
trC(g, 0.1, 0.1, 1, 12, trM(0x2A4A7A), 0.9, 1.0, 0, Math.PI / 2, 0, 0);
trB(g, 0.25, 0.02, 0.06, TR_IRON(), -0.6, 0.95, 0.3);
trB(g, 1.2, 0.005, 0.03, trM(0xE8D85A), 0, 0.94, -0.4);
return trDone(g);
});
trPiece("trmeathooks", 2.4, 0.4, false, function () {
var g = new THREE.Group(), ir = TR_IRON(), meat = trM(0xA83A3A), fat = trM(0xF0DCC8);
trB(g, 2.4, 0.06, 0.06, ir, 0, 2.3, 0);
trB(g, 0.06, 2.3, 0.06, ir, -1.18, 1.15, 0);
trB(g, 0.06, 2.3, 0.06, ir, 1.18, 1.15, 0);
for (var i = 0; i < 5; i++) {
var x = -0.9 + i * 0.45;
trB(g, 0.02, 0.2, 0.02, ir, x, 2.18, 0);
trS(g, 0.16, i % 2 ? meat : fat, x, 1.85, 0, 0.9, 1.8, 0.7);
trS(g, 0.12, meat, x, 1.95, 0.05, 0.8, 1.2, 0.6);
}
return trDone(g);
});
trPiece("trveg", 2.4, 1.2, true, function () {
var g = new THREE.Group(), w = trM(0x9A7448, "wood"), r = trRand(13), cols = [0xD83A2A, 0xF2A23A, 0x6AA83A, 0xE8D23A, 0x7A3A8A, 0x3A7A2A, 0xC86A3A];
for (var t = 0; t < 3; t++) {
var y = 0.3 + t * 0.32, z = 0.35 - t * 0.35;
for (var i = 0; i < 4; i++) {
var x = -0.9 + i * 0.6, c = cols[Math.floor(r() * cols.length)];
trB(g, 0.56, 0.22, 0.4, w, x, y, z, -0.25, 0, 0);
for (var k = 0; k < 6; k++)
trS(g, 0.07, trM(c), x - 0.18 + (k % 3) * 0.18, y + 0.12, z - 0.08 + Math.floor(k / 3) * 0.15);
}
}
trB(g, 2.4, 0.3, 0.3, TR_WOODD(), 0, 0.15, 0.4);
trB(g, 2.4, 0.62, 0.3, TR_WOODD(), 0, 0.31, 0.05);
trB(g, 2.4, 0.94, 0.3, TR_WOODD(), 0, 0.47, -0.3);
return trDone(g);
});
trPiece("trbreadrack", 2.2, 0.5, true, function () {
var g = new THREE.Group(), w = TR_WOODD(), br = trM(0xC08A4A), dk = trM(0x8A5A2A), r = trRand(17);
trB(g, 2.2, 1.9, 0.04, w, 0, 0.95, -0.22);
trB(g, 0.05, 1.9, 0.45, w, -1.08, 0.95, 0);
trB(g, 0.05, 1.9, 0.45, w, 1.08, 0.95, 0);
[0.3, 0.75, 1.2, 1.65].forEach(function (y, si) {
trB(g, 2.1, 0.03, 0.42, trM(0x8A6A44, "wood"), 0, y, 0);
for (var i = 0; i < 6; i++) {
var x = -0.85 + i * 0.34;
if (si % 2)
trS(g, 0.12, r() < 0.5 ? br : dk, x, y + 0.09, 0, 1, 0.7, 1);
else
trS(g, 0.08, br, x, y + 0.07, 0, 2.2, 0.8, 1);
}
});
return trDone(g);
});
trPiece("trbier", 2.2, 0.9, true, function () {
var g = new THREE.Group(), w = TR_WOODD(), drape = trM(0x1E1A22);
[-0.8, 0.8].forEach(function (x) { trB(g, 0.08, 0.75, 0.7, w, x, 0.38, 0); });
trB(g, 0.75, 0.5, 2.0, trM(0x4A2E1E, "wood"), 0, 1.0, 0, 0, Math.PI / 2, 0);
trB(g, 0.77, 0.06, 2.02, trM(0x5A3A24, "wood"), 0, 1.28, 0, 0, Math.PI / 2, 0);
trB(g, 0.25, 0.02, 0.05, TR_BRASS(), 0, 1.32, 0);
return trDone(g);
});
trPiece("trdrapes", 3, 0.2, false, function () {
var g = new THREE.Group(), m = trM(0x2A1E2E);
for (var i = 0; i < 10; i++)
trC(g, 0.16, 0.16, 3, 8, m, -1.35 + i * 0.3, 1.5, 0);
trB(g, 3.1, 0.1, 0.1, TR_BRASS(), 0, 3.05, 0);
return trDone(g);
});
trPiece("treasel", 1.4, 1, false, function () {
var g = new THREE.Group(), w = TR_WOOD();
trB(g, 0.06, 2, 0.06, w, -0.5, 1, 0.2, 0.15, 0, 0);
trB(g, 0.06, 2, 0.06, w, 0.5, 1, 0.2, 0.15, 0, 0);
trB(g, 0.06, 1.9, 0.06, w, 0, 0.95, -0.35, -0.3, 0, 0);
trB(g, 1.2, 0.6, 0.04, trM(0x1E3A5A), 0, 1.35, 0.1, 0.15, 0, 0);
trB(g, 0.8, 0.12, 0.01, trM(0xD9B45A), 0, 1.42, 0.13, 0.15, 0, 0);
trB(g, 1.1, 0.05, 0.12, w, 0, 1.02, 0.18);
[[0x7A1E22, -0.3], [0x2E6A3A, 0], [0xD9B45A, 0.3]].forEach(function (p) { trC(g, 0.08, 0.08, 0.14, 10, trM(p[0]), p[1], 0.07, 0.45); });
return trDone(g);
});
trPiece("trsigns", 1.8, 0.5, true, function () {
var g = new THREE.Group(), cols = [[0x1E3A5A, 0xD9B45A], [0x5A1A1A, 0xF2EEE2], [0x1E4A2E, 0xE8D8A8]];
cols.forEach(function (c, i) { var x = -0.55 + i * 0.55; trB(g, 0.5, 1.1 - i * 0.15, 0.04, trM(c[0]), x, 0.55 - i * 0.07, -0.1 + i * 0.08, -0.2, 0, 0); trB(g, 0.36, 0.1, 0.01, trM(c[1]), x, 0.7 - i * 0.07, -0.08 + i * 0.08, -0.2, 0, 0); });
return trDone(g);
});
trPiece("trcopper", 2, 2, true, function () {
var g = new THREE.Group(), cu = trM(0xB8683A, null, "shine"), w = trM(0x6A4428, "wood");
trC(g, 0.8, 0.85, 1.3, 18, cu, -0.4, 0.65, 0);
var d = new THREE.Mesh(new THREE.SphereGeometry(0.8, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), cu);
d.position.set(-0.4, 1.3, 0);
g.add(d);
trC(g, 0.08, 0.08, 1.2, 8, cu, -0.4, 2.4, 0);
trC(g, 0.08, 0.08, 0.9, 8, cu, 0.1, 2.95, 0, 0, 0, Math.PI / 2);
trC(g, 0.55, 0.55, 1, 16, w, 0.9, 0.5, 0.4);
for (var i = 0; i < 3; i++)
trC(g, 0.57, 0.57, 0.05, 16, TR_IRON(), 0.9, 0.15 + i * 0.35, 0.4);
return trDone(g);
});
trPiece("trbarberwall", 2.4, 0.4, false, function () {
var g = new THREE.Group(), w = TR_WOODD(), gl = trM(0xCFE0F0, null, "shine");
trB(g, 2.4, 0.9, 0.4, w, 0, 0.45, 0);
trB(g, 2.3, 0.03, 0.38, trM(0xE8E4DA, "marble"), 0, 0.91, 0);
trB(g, 2.2, 1.0, 0.04, gl, 0, 1.75, -0.18);
trB(g, 2.3, 0.08, 0.06, TR_BRASS(), 0, 2.28, -0.17);
trB(g, 2.3, 0.08, 0.06, TR_BRASS(), 0, 1.22, -0.17);
[-0.7, 0.1, 0.6].forEach(function (x, i) { trC(g, 0.04, 0.04, 0.22, 8, trM([0x2A6A8A, 0x8A2A2A, 0xC8A040][i], null, "glass"), x, 1.04, 0.0); });
trC(g, 0.22, 0.18, 0.12, 14, trM(0xF2EEE6, null, "shine"), 0.9, 0.86, 0.02);
return trDone(g);
});
trPiece("trwinch", 2, 1.2, true, function () {
var g = new THREE.Group(), w = TR_WOODD(), ir = TR_IRON();
trB(g, 0.25, 1.4, 1, w, -0.85, 0.7, 0);
trB(g, 0.25, 1.4, 1, w, 0.85, 0.7, 0);
trC(g, 0.32, 0.32, 1.5, 16, trM(0x5A3E26, "wood"), 0, 1.1, 0, 0, 0, Math.PI / 2);
for (var i = 0; i < 6; i++)
trC(g, 0.33, 0.33, 0.04, 16, ir, -0.6 + i * 0.24, 1.1, 0, 0, 0, Math.PI / 2);
for (var a = 0; a < 4; a++)
trB(g, 0.08, 1.4, 0.08, w, 1.1, 1.1, 0, a * Math.PI / 4, 0, 0);
for (var c = 0; c < 9; c++) {
var l = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 5, 8), ir);
l.position.set(0, 1.45 + c * 0.17, -0.2);
l.rotation.y = c % 2 ? Math.PI / 2 : 0;
g.add(l);
}
return trDone(g);
});
trPiece("trwallmap", 2.4, 0.12, false, function () {
var g = new THREE.Group(), fr = TR_WOODD(), p = trM(0xE8DCB8);
trB(g, 2.4, 1.5, 0.06, fr, 0, 1.75, -0.03);
trB(g, 2.2, 1.3, 0.02, p, 0, 1.75, 0.01);
[0.55, 0.4, 0.25, 0.12].forEach(function (r, i) { var t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 4, 32), trM([0x7A1E22, 0x2E4A2E, 0x1E3A5A, 0x8A6A2A][i])); t.position.set(0, 1.75, 0.03); g.add(t); });
trS(g, 0.06, trM(0xD9B45A, null, "shine"), 0, 1.75, 0.03);
return trDone(g);
});
trPiece("trdutydesk", 2.4, 0.9, true, function () {
var g = new THREE.Group(), w = trM(0x5A3A22, "wood"), wd = TR_WOODD();
trB(g, 2.4, 1.1, 0.12, w, 0, 0.55, 0.4);
trB(g, 0.12, 1.1, 0.8, w, -1.14, 0.55, 0);
trB(g, 0.12, 1.1, 0.8, w, 1.14, 0.55, 0);
trB(g, 2.5, 0.06, 0.95, wd, 0, 1.13, 0.02);
trB(g, 0.9, 0.03, 0.6, trM(0xF0E8D4), -0.2, 1.17, 0.05);
trB(g, 0.02, 0.04, 0.6, trM(0x7A1E22), -0.2, 1.18, 0.05);
trC(g, 0.06, 0.09, 0.08, 10, TR_BRASS(), 0.8, 1.2, 0.2);
trS(g, 0.07, TR_BRASS(), 0.8, 1.27, 0.2, 1, 0.6, 1);
trC(g, 0.05, 0.07, 0.35, 8, TR_IRON(), -1, 1.33, -0.1);
trS(g, 0.09, trM(0xFFE2A0, null, "glow"), -1, 1.55, -0.1);
return trDone(g);
});
trPiece("trlockers", 2.4, 0.5, true, function () {
var g = new THREE.Group(), m = trM(0x4A5A4A, null, "shine"), b = TR_BRASS();
for (var i = 0; i < 4; i++) {
trB(g, 0.58, 2, 0.48, m, -0.9 + i * 0.6, 1, 0);
trB(g, 0.02, 0.12, 0.02, b, -0.75 + i * 0.6, 1.1, 0.25);
for (var s = 0; s < 3; s++)
trB(g, 0.3, 0.02, 0.01, trM(0x2A3A2A), -0.9 + i * 0.6, 1.75 - s * 0.05, 0.245);
}
trB(g, 2.4, 0.3, 0.5, trM(0x5A3A22, "wood"), 0, 0.15, 0.55);
return trDone(g);
});
trPiece("trplanchest", 1.8, 1, true, function () {
var g = new THREE.Group(), w = trM(0x5A3A22, "wood"), b = TR_BRASS();
trB(g, 1.8, 1, 1, w, 0, 0.5, 0);
for (var i = 0; i < 6; i++) {
trB(g, 1.7, 0.01, 0.01, TR_WOODD(), 0, 0.12 + i * 0.16, 0.505);
trB(g, 0.18, 0.03, 0.02, b, 0, 0.19 + i * 0.16, 0.51);
}
trB(g, 1.4, 0.02, 0.9, trM(0xE8DCB8), 0, 1.01, 0);
return trDone(g);
});
trPiece("trdraft", 1.6, 1.1, true, function () {
var g = new THREE.Group(), w = TR_WOODD();
trB(g, 0.08, 0.9, 0.08, w, -0.65, 0.45, 0.35);
trB(g, 0.08, 0.9, 0.08, w, 0.65, 0.45, 0.35);
trB(g, 0.08, 1.1, 0.08, w, -0.65, 0.55, -0.35);
trB(g, 0.08, 1.1, 0.08, w, 0.65, 0.55, -0.35);
trB(g, 1.6, 0.04, 1.1, trM(0xC8A878, "wood"), 0, 1.05, 0, -0.3, 0, 0);
trB(g, 1.2, 0.01, 0.8, trM(0xF0E8D4), 0, 1.08, 0.02, -0.3, 0, 0);
trB(g, 1.5, 0.02, 0.04, trM(0x2A2A2E), 0, 1.1, 0.15, -0.3, 0, 0);
return trDone(g);
});
trPiece("trassay", 1.6, 0.8, true, function () {
var g = new THREE.Group(), w = trM(0x5A3A22, "wood"), b = TR_BRASS();
trB(g, 1.6, 0.9, 0.8, w, 0, 0.45, 0);
trB(g, 1.6, 0.04, 0.8, TR_WOODD(), 0, 0.92, 0);
trB(g, 0.04, 0.5, 0.04, b, 0, 1.2, 0);
trB(g, 0.6, 0.02, 0.02, b, 0, 1.45, 0);
[-0.3, 0.3].forEach(function (x) { trC(g, 0.1, 0.1, 0.02, 14, b, x, 1.1, 0); trB(g, 0.005, 0.35, 0.005, b, x, 1.28, 0); });
trS(g, 0.05, trM(0xD9B45A, null, "shine"), -0.3, 1.14, 0);
for (var i = 0; i < 4; i++)
trB(g, 0.05, 0.05, 0.05, trM(0x6A6A70), 0.5 + i * 0.07, 0.96, 0.25);
return trDone(g);
});
trPiece("trcages", 2.4, 0.9, true, function () {
var g = new THREE.Group(), w = TR_WOODD(), ir = TR_IRON(), r = trRand(21);
for (var c = 0; c < 2; c++)
for (var row = 0; row < 2; row++) {
var x = -0.6 + c * 1.2, y = 0.45 + row * 0.9;
trB(g, 1.1, 0.06, 0.85, w, x, y - 0.42, 0);
trB(g, 1.1, 0.06, 0.85, w, x, y + 0.42, 0);
trB(g, 1.1, 0.85, 0.04, w, x, y, -0.42);
for (var b = 0; b < 8; b++)
trC(g, 0.012, 0.012, 0.84, 5, ir, x - 0.5 + b * 0.14, y, 0.42);
trS(g, 0.13, trM([0xC86A3A, 0x8A8A8A, 0xE8E0D0, 0x6A4A2A][Math.floor(r() * 4)]), x, y - 0.25, 0, 1.4, 1, 1);
}
return trDone(g);
});
trPiece("trquench", 1, 1, true, function () {
var g = new THREE.Group(), w = trM(0x5A3E26, "wood");
trC(g, 0.45, 0.42, 0.7, 14, w, 0, 0.35, 0);
for (var i = 0; i < 2; i++)
trC(g, 0.46, 0.46, 0.04, 14, TR_IRON(), 0, 0.15 + i * 0.4, 0);
trC(g, 0.42, 0.42, 0.02, 14, trM(0x2A3A4A, null, "shine"), 0, 0.66, 0);
trB(g, 0.04, 0.04, 0.7, TR_IRON(), 0.2, 0.85, 0, 0.6, 0, 0);
return trDone(g);
});
trPiece("trhearth", 2.2, 0.8, true, function () {
var g = new THREE.Group(), st = trM(0x8E8678, "stone");
trB(g, 2.2, 0.3, 0.8, st, 0, 0.15, 0.05);
trB(g, 0.45, 1.5, 0.7, st, -0.85, 0.9, 0);
trB(g, 0.45, 1.5, 0.7, st, 0.85, 0.9, 0);
trB(g, 2.2, 0.35, 0.75, st, 0, 1.8, 0);
trB(g, 1.4, 1.4, 0.6, st, 0, 2.65, -0.05);
trB(g, 2.4, 0.12, 0.9, TR_WOODD(), 0, 2.0, 0.05);
trB(g, 1.25, 1.15, 0.1, trM(0x1E1A16), 0, 0.9, -0.28);
[-0.25, 0.05, 0.3].forEach(function (x, i) { trC(g, 0.07, 0.07, 0.6, 8, trM(0x5A3E26, "wood"), x, 0.4, 0.0, 0, 0.5 * i, Math.PI / 2); });
trS(g, 0.18, trM(0xFF8A3A, null, "glow"), 0, 0.5, -0.05, 1.6, 0.6, 0.8);
return trDone(g);
});
trPiece("trbenchtable", 2.4, 1.8, true, function () {
var g = new THREE.Group(), w = trM(0x7A5434, "wood"), wd = TR_WOODD();
trB(g, 2.4, 0.08, 0.9, w, 0, 0.78, 0);
[[-1, -0.35], [1, -0.35], [-1, 0.35], [1, 0.35]].forEach(function (p) { trB(g, 0.1, 0.78, 0.1, wd, p[0], 0.39, p[1]); });
[-0.8, 0.8].forEach(function (z) { trB(g, 2.2, 0.06, 0.3, w, 0, 0.45, z); trB(g, 0.08, 0.45, 0.25, wd, -0.95, 0.22, z); trB(g, 0.08, 0.45, 0.25, wd, 0.95, 0.22, z); });
trC(g, 0.05, 0.05, 0.12, 8, trM(0x8A8A90, null, "shine"), 0.4, 0.88, 0.1);
trB(g, 0.3, 0.03, 0.2, trM(0xC89A5A), -0.4, 0.83, 0);
return trDone(g);
});
trPiece("trplinth", 1, 1, true, function () {
var g = new THREE.Group(), m = trM(0xE8E2D4, "marble"), r = trRand(31);
trB(g, 0.8, 1, 0.8, m, 0, 0.5, 0);
trB(g, 0.9, 0.06, 0.9, trM(0xC8C0B0, "marble"), 0, 1.03, 0);
trB(g, 0.7, 0.7, 0.7, trM(0xCFE0F0, null, "glass"), 0, 1.41, 0);
var k = Math.floor(r() * 3);
if (k === 0)
trS(g, 0.18, trM(0xC9A040, null, "shine"), 0, 1.25, 0, 1, 1.4, 1);
else if (k === 1)
trB(g, 0.3, 0.3, 0.3, trM(0x8A6A4A, "stone"), 0, 1.21, 0);
else
trS(g, 0.14, trM(0x6AC8E8, null, "shine"), 0, 1.22, 0);
return trDone(g);
});
trPiece("trtimetable", 2.4, 0.15, false, function () {
var g = new THREE.Group(), b = trM(0x1E2A3A), y = trM(0xE8D85A), wt = trM(0xF2EEE2);
trB(g, 2.4, 1.3, 0.06, TR_WOODD(), 0, 1.9, -0.03);
trB(g, 2.2, 1.1, 0.02, b, 0, 1.9, 0.01);
for (var i = 0; i < 6; i++) {
trB(g, 1.2, 0.07, 0.01, wt, -0.4, 2.3 - i * 0.16, 0.025);
trB(g, 0.4, 0.07, 0.01, y, 0.65, 2.3 - i * 0.16, 0.025);
}
return trDone(g);
});
trPiece("troars", 2, 0.4, false, function () {
var g = new THREE.Group(), w = trM(0x9A7448, "wood");
trB(g, 2, 0.08, 0.3, TR_WOODD(), 0, 0.1, 0);
trB(g, 2, 0.08, 0.15, TR_WOODD(), 0, 2.1, -0.1);
for (var i = 0; i < 6; i++) {
var x = -0.8 + i * 0.32;
trB(g, 0.05, 2.2, 0.05, w, x, 1.15, 0, 0.08, 0, 0);
if (i % 2)
trB(g, 0.16, 0.5, 0.03, w, x, 0.45, 0.04, 0.08, 0, 0);
}
return trDone(g);
});
trPiece("trcounter", 2.4, 0.7, true, function () {
var g = new THREE.Group(), w = trM(0x6A4428, "wood"), wd = TR_WOODD(), top = trM(0x8A6040, "wood");
trB(g, 2.4, 0.9, 0.62, w, 0, 0.45, 0);
trB(g, 2.5, 0.06, 0.72, top, 0, 0.93, 0);
trB(g, 2.4, 0.1, 0.64, wd, 0, 0.05, 0);
for (var i = 0; i < 4; i++) {
trB(g, 0.5, 0.55, 0.02, wd, -0.9 + i * 0.6, 0.5, 0.32);
trB(g, 0.42, 0.47, 0.02, w, -0.9 + i * 0.6, 0.5, 0.335);
}
trB(g, 2.4, 0.03, 0.03, TR_BRASS(), 0, 0.2, 0.36);
return trDone(g);
});
trPiece("trcase", 1.6, 0.7, true, function () {
var g = new THREE.Group(), w = trM(0x5A3A22, "wood"), wd = TR_WOODD(), r = trRand(41);
trB(g, 1.6, 0.8, 0.7, w, 0, 0.4, 0);
trB(g, 1.5, 0.5, 0.02, wd, 0, 0.42, 0.36);
trB(g, 1.64, 0.05, 0.74, wd, 0, 0.83, 0);
trB(g, 1.56, 0.03, 0.66, trM(0x6A1E2A), 0, 0.865, 0);
trB(g, 1.6, 0.42, 0.7, trM(0xD8EEF8, null, "glass"), 0, 1.08, 0);
[-0.79, 0.79].forEach(function (x) { [-0.34, 0.34].forEach(function (z) { trB(g, 0.03, 0.44, 0.03, TR_BRASS(), x, 1.08, z); }); });
var cols = [0xD9B45A, 0xC83A4A, 0x3A7AD0, 0x3AB86A, 0xE8E0D0, 0x8A5A3A];
for (var i = 0; i < 6; i++) {
var c = cols[Math.floor(r() * cols.length)], x = -0.55 + i * 0.22, z = (i % 2) * 0.2 - 0.1;
if (i % 3 === 0)
trS(g, 0.06, trM(c, null, "shine"), x, 0.94, z);
else if (i % 3 === 1)
trB(g, 0.14, 0.08, 0.1, trM(c), x, 0.92, z);
else
trC(g, 0.04, 0.05, 0.14, 10, trM(c, null, "shine"), x, 0.95, z);
}
return trDone(g);
});
trPiece("trtill", 2, 0.7, true, function () {
var g = new THREE.Group(), w = trM(0x6A4428, "wood"), wd = TR_WOODD(), b = TR_BRASS();
trB(g, 2, 0.9, 0.62, w, 0, 0.45, 0);
trB(g, 2.1, 0.06, 0.72, trM(0x8A6040, "wood"), 0, 0.93, 0);
trB(g, 2, 0.1, 0.64, wd, 0, 0.05, 0);
for (var i = 0; i < 3; i++) {
trB(g, 0.55, 0.55, 0.02, wd, -0.65 + i * 0.65, 0.5, 0.32);
trB(g, 0.47, 0.47, 0.02, w, -0.65 + i * 0.65, 0.5, 0.335);
}
trB(g, 0.5, 0.22, 0.42, b, 0.3, 1.07, 0);
var top = trB(g, 0.5, 0.2, 0.08, b, 0.3, 1.25, -0.12, -0.4, 0, 0);
for (var k = 0; k < 8; k++)
trC(g, 0.022, 0.022, 0.03, 8, trM(0xF2EEE2), 0.12 + (k % 4) * 0.12, 1.2, 0.06 + Math.floor(k / 4) * 0.08);
trB(g, 0.34, 0.03, 0.26, trM(0x7A1E22), -0.45, 0.975, 0);
trB(g, 0.3, 0.01, 0.22, trM(0xF0E8D4), -0.45, 0.995, 0);
return trDone(g);
});
trPiece("trherbs", 2.2, 0.5, true, function () {
var g = new THREE.Group(), w = trM(0x5A3A22, "wood"), wd = TR_WOODD(), b = TR_BRASS(), r = trRand(23);
trB(g, 2.2, 0.9, 0.5, w, 0, 0.45, 0);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 3; j++) {
trB(g, 0.48, 0.24, 0.02, wd, -0.78 + i * 0.52, 0.17 + j * 0.28, 0.26);
trB(g, 0.08, 0.02, 0.02, b, -0.78 + i * 0.52, 0.17 + j * 0.28, 0.28);
}
trB(g, 2.24, 0.04, 0.54, trM(0x8A6040, "wood"), 0, 0.92, 0);
trB(g, 2.2, 1.4, 0.04, wd, 0, 1.62, -0.23);
[1.3, 1.75].forEach(function (y) {
trB(g, 2.1, 0.03, 0.3, w, 0, y, -0.08);
for (var k = 0; k < 9; k++) {
var c = [0x6A9A5A, 0xB8862E, 0x8A4A3A, 0x3A6A8A, 0xC8C0A0][Math.floor(r() * 5)], h = 0.14 + r() * 0.1;
trC(g, 0.06, 0.06, h, 10, trM(c, null, "glass"), -0.92 + k * 0.23, y + 0.015 + h / 2, -0.08);
trC(g, 0.045, 0.045, 0.03, 10, wd, -0.92 + k * 0.23, y + 0.03 + h, -0.08);
}
});
trB(g, 2.1, 0.03, 0.03, wd, 0, 2.25, 0.08);
for (var m = 0; m < 7; m++) {
var c2 = [0x4A7A3A, 0x6A8A3A, 0x8A7A3A, 0x7A5A8A][m % 4];
trB(g, 0.01, 0.12, 0.01, trM(0x8A6A44), -0.9 + m * 0.3, 2.18, 0.08);
var cn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 6), trM(c2));
cn.position.set(-0.9 + m * 0.3, 1.98, 0.08);
cn.rotation.x = Math.PI;
g.add(cn);
}
return trDone(g);
});
trPiece("trcrates", 2, 1.1, true, function () {
var g = new THREE.Group(), w = trM(0xA88456, "wood"), wd = trM(0x6A4A2A, "wood"), st = trM(0x3A2A1E);
[[-0.5, 0.4, 0, 0.8], [0.45, 0.35, 0.05, 0.7], [-0.35, 1.15, 0, 0.7]].forEach(function (c) {
var e = c[3];
trB(g, e, e, e, w, c[0], c[1], c[2]);
[-1, 1].forEach(function (sx) { trB(g, 0.06, e + 0.01, 0.06, wd, c[0] + sx * (e / 2 - 0.03), c[1], c[2] + e / 2 - 0.03); trB(g, 0.06, e + 0.01, 0.06, wd, c[0] + sx * (e / 2 - 0.03), c[1], c[2] - e / 2 + 0.03); });
trB(g, e + 0.01, 0.06, 0.06, wd, c[0], c[1] + e / 2 - 0.03, c[2] + e / 2 - 0.03);
trB(g, e + 0.01, 0.06, 0.06, wd, c[0], c[1] - e / 2 + 0.03, c[2] + e / 2 - 0.03);
trB(g, e * 0.5, e * 0.16, 0.01, st, c[0], c[1], c[2] + e / 2 + 0.005);
});
return trDone(g);
});
(function () {
if (typeof FURN !== "object" || !FURN)
return;
Object.keys(TR_PIECES).forEach(function (k) {
if (FURN[k])
return;
FURN[k] = TR_PIECES[k];
if (TR_PIECES[k].solid && typeof SOLIDFURN !== "undefined")
SOLIDFURN[k] = 1;
});
if (typeof furnBox === "function") {
var fb = furnBox;
furnBox = function (k) { return TR_BOX[k] || fb.apply(this, arguments); };
}
if (typeof FIXED_FURN !== "undefined") {
for (var n = 1; n <= 40; n++)
FIXED_FURN["trw" + n] = 1;
FIXED_FURN.trdoorframe = 1;
}
try {
TEMP_WORK = new RegExp(TEMP_WORK.source + "|trsort|trsaw|trlathe|trbanker|trglassfurnace|trglassbench|trpump|trmillstone|trfishtable|trwheelstand|trtypecase|trcuttable|trveg|trbreadrack|trbier|treasel|trcopper|trwinch|trplanchest|trdraft|trassay|trcages|trquench|trhay|trtrough|trchurns|trnets|trcase|trherbs|trcrates");
TEMP_FRONT = new RegExp(TEMP_FRONT.source + "|trdutydesk");
TEMP_PREFER.unshift([/postmaster|sorter|post clerk|letter/i, /trsort|counter|till/], [/glass/i, /trglassbench|trglassfurnace/], [/sawyer|sawmill|lumber/i, /trsaw|trlogs/], [/turner|joiner|carpenter|cabinet/i, /trlathe|workbench/], [/mason|stonecut|sculpt/i, /trbanker/], [/miller/i, /trmillstone/], [/wheelwright/i, /trwheelstand|workbench/], [/typesett|compositor|printer/i, /trtypecase|printpress/], [/fishmonger|gutter|fish/i, /trfishtable/], [/brewer|maltster/i, /trcopper|cask/], [/undertak|mortician|embalm/i, /trbier|coffin/], [/sign ?writer|sign ?paint|painter/i, /treasel/], [/greengrocer|fruiterer/i, /trveg|till/], [/tailor|seamstress|dressmak/i, /trcuttable|dressform|loom/], [/watch|clock/i, /workbench|displaycase/], [/assay|weigh/i, /trassay/], [/cartograph|map|survey|draught|drafts/i, /trdraft|maptable/], [/archiv|record|registrar/i, /trplanchest|filecabinet|desk/], [/keeper of beasts|menagerie|zookeep|animal/i, /trcages/], [/dairy|milk/i, /trchurns/], [/engine|pump|waterworks/i, /trpump|machine/], [/watch captain|captain of the watch|sergeant|duty/i, /trdutydesk|desk/]);
}
catch (e) {
if (window.console)
console.warn("[trade-rooms]", e);
}
})();
function trKit(W, D, put, spots) { return __ZC(194, 1, this, arguments, new.target); }
function trShop(K, o) { return __ZC(194, 2, this, arguments, new.target); }
function trOffice(K, o) { return __ZC(194, 3, this, arguments, new.target); }
var TR = {};
TR["The Gate Lodge"] = function (K) { return __ZC(194, 4, this, arguments, new.target); };
TR["The Post Office"] = function (K) { return __ZC(194, 5, this, arguments, new.target); };
TR["The Chronicle Press"] = function (K) {
trShop(K, { behind: "trpaper", side: "noticeboard", mid: "desk", mid2: "desk", till: "trcounter",
work: function (K, B, zp) { K.put("printpress", K.L + 1.6, B + 1.2, 0); if (K.W >= 9)
K.put("printpress", K.L + 4.2, B + 1.2, 0); K.put("trtypecase", K.R - 1.4, B + 0.7, 0); K.put("trpaper", K.R - 1.4, zp - 1.1, 0); } });
};
TR["The Land Office"] = function (K) {
trOffice(K, { desks: ["desk", "trdraft", "desk"], right: ["trwallmap"],
records: function (K, B, zp) { K.put("trplanchest", K.L + 1.4, B + 0.7, 0); K.put("trplanchest", K.L + 3.4, B + 0.7, 0); K.rowBack("filecabinet", B + 0.45, K.R - 3.4, K.R - 0.8, 0.9, 0); K.put("maptable", 0, (B + zp) / 2 + 0.3, 0); } });
};
TR["The Map House"] = function (K) {
trOffice(K, { desks: ["trdraft", "trdraft", "trdraft"], wall: ["trplanchest", "trplanchest"], right: ["trwallmap", "trwallmap"],
records: function (K, B, zp) { K.rowBack("trplanchest", B + 0.6, K.L + 1.4, K.R - 1.4, 2.1, 0); K.put("maptable", 0, (B + zp) / 2 + 0.4, 0); } });
};
TR["The Runners' Hall"] = function (K) {
trOffice(K, { desks: ["desk", "desk"], wall: ["trsort", "trlockers"], right: ["trtimetable", "noticeboard"],
records: function (K, B, zp) { K.put("bunk", K.L + 0.8, B + 1.2, 0); K.put("bunk", K.L + 1.9, B + 1.2, 0); K.put("trlockers", K.R - 1.6, B + 0.3, 0); K.put("trbenchtable", 0, (B + zp) / 2 + 0.2, 0); } });
};
TR["The Dock Office"] = function (K) { return __ZC(194, 6, this, arguments, new.target); };
TR["The Pit Office"] = function (K) { trOffice(K, { desks: ["trassay", "desk"], wall: ["keyrack", "trlockers"], right: ["noticeboard"] }); };
TR["The Transport Depot"] = function (K) { return __ZC(194, 7, this, arguments, new.target); };
TR["The General Store"] = function (K) { trShop(K, { side: "shelfgoods", mid: "trcrates", mid2: "barrel", work: function (K, B, zp) { K.rowBack("trcrates", B + 0.7, K.L + 1.4, K.R - 1.4, 2.4, 0); K.put("trsacks", 0, zp - 1.4, 0); K.put("barrel", K.R - 1, zp - 1, 0); } }); };
TR["The Chandlery"] = function (K) { trShop(K, { mid: "trcase", work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("cask", K.R - 1.5, B + 0.9, 0); K.put("trtoolwall", 0, B + 0.1, 0); K.put("barrel", 0, zp - 1.1, 0); } }); };
TR["The Brewhouse"] = function (K) { return __ZC(194, 8, this, arguments, new.target); };
TR["The Barber's"] = function (K) { return __ZC(194, 9, this, arguments, new.target); };
TR["The Butcher's"] = function (K) {
trShop(K, { behind: "trmeathooks", till: "trtill", side: "shelfgoods", mid: "trcase",
work: function (K, B, zp) { K.put("butcherblock", K.L + 1.4, (B + zp) / 2, 0); K.put("butcherblock", 0, (B + zp) / 2, 0); K.put("trmeathooks", K.R - 1.4, B + 0.3, 0); K.put("sink", K.R - 1, zp - 0.9, Math.PI); } });
};
TR["The Print Shop"] = function (K) {
trShop(K, { behind: "trpaper", side: "shelfgoods", mid: "table",
work: function (K, B, zp) { K.put("printpress", K.L + 1.6, (B + zp) / 2, 0); K.put("trtypecase", K.R - 1.4, B + 0.7, 0); K.put("trpaper", 0, B + 0.6, 0); } });
};
TR["The Greengrocer's"] = function (K) {
trShop(K, { behind: "trsacks", side: "trveg", mid: "trveg", till: "trtill",
work: function (K, B, zp) { K.rowBack("trcrates", B + 0.7, K.L + 1.4, K.R - 1.4, 2.4, 0); K.put("trsacks", 0, zp - 1.4, 0); } });
};
TR["The Toy Shop"] = function (K) {
trShop(K, { mid: "trcase", floor: function (K, zc, z0, z1) { K.put("toys", 0, z1 - 0.4, 0); K.put("rug", 0, (z0 + z1) / 2, 0); },
work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("trlathe", K.R - 1.6, B + 0.8, 0); K.put("trtoolwall", 0, B + 0.1, 0); K.put("toys", 0, zp - 1, 0); } });
};
TR["The Bindery"] = function (K) {
trShop(K, { side: "shelfgoods", side2: "shelfgoods", mid: "trcase",
work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("printpress", K.R - 1.6, B + 0.9, 0); K.put("trpaper", 0, B + 0.6, 0); K.put("trcuttable", 0, zp - 1.4, 0); } });
};
TR["The Jeweller's"] = function (K) {
trShop(K, { behind: "trcase", side: "trcase", mid: "trcase", floor: function (K) { K.put("rug", 0, K.Fz - 4, 0); },
work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("workbench", K.R - 1.6, B + 0.6, 0); K.put("trassay", 0, zp - 1.1, 0); if (FURN.treasurechest)
K.put("treasurechest", 0, B + 0.6, 0); } });
};
TR["The Cookhouse"] = function (K) { return __ZC(194, 10, this, arguments, new.target); };
TR["The Tavern"] = function (K) { return __ZC(194, 11, this, arguments, new.target); };
TR["The Smithy"] = function (K) { return __ZC(194, 12, this, arguments, new.target); };
TR["The Tailor's"] = function (K) { return __ZC(194, 13, this, arguments, new.target); };
TR["The Cobbler's"] = function (K) {
trShop(K, { mid: "trcase", floor: function (K, zc, z0, z1) { K.put("benchin", 0, z1 - 0.4, 0); },
work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("workbench", K.R - 1.6, B + 0.6, 0); K.put("trtoolwall", 0, B + 0.1, 0); K.put("trsacks", 0, zp - 1.3, 0); } });
};
TR["The Bakery"] = function (K) {
trShop(K, { behind: "trbreadrack", side: "trbreadrack", mid: "trcase",
work: function (K, B, zp) { K.put("oven", K.L + 1.4, B + 1, 0); K.put("oven", K.L + 3.6, B + 1, 0); K.put("trcuttable", K.R - 1.8, (B + zp) / 2, Math.PI / 2); K.put("trsacks", 0.6, zp - 1.2, 0); } });
};
TR["The Weaving Shed"] = function (K) { return __ZC(194, 14, this, arguments, new.target); };
TR["The Florist's"] = function (K) { return __ZC(194, 15, this, arguments, new.target); };
TR["The Pottery"] = function (K) {
trShop(K, { side: "shelfgoods", mid: "trcase",
work: function (K, B, zp) { K.put("potterswheel", K.L + 1.6, (B + zp) / 2, 0); K.put("potterswheel", 0, (B + zp) / 2, 0); K.put("oven", K.R - 1.6, B + 1, 0); K.put("trsacks", K.R - 1.6, zp - 1.1, 0); } });
};
TR["The Watchmaker's"] = function (K) {
trShop(K, { behind: "trclockwall", side: "trcase", mid: "clock", mid2: "trcase",
work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("workbench", K.R - 1.6, B + 0.6, 0); K.put("trclockwall", 0, B + 0.1, 0); K.put("lamp", 0, zp - 1.2, 0); } });
};
TR["The Apothecary"] = function (K) {
trShop(K, { behind: "trherbs", side: "shelfgoods", mid: "trcase",
work: function (K, B, zp) { K.put("labbench", K.L + 1.8, (B + zp) / 2, 0); K.put("trherbs", K.R - 1.4, B + 0.3, 0); K.put("trsacks", 0, B + 0.8, 0); if (FURN.cauldron)
K.put("cauldron", K.R - 1.6, zp - 1.2, 0); } });
};
TR["The Herbalist's"] = function (K) {
trShop(K, { behind: "trherbs", side: "trherbs", side2: "shelfgoods", mid: "flowerbucket",
work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("trherbs", K.R - 1.4, B + 0.3, 0); K.put("trsacks", 0, zp - 1.3, 0); } });
};
TR["The Sign Shop"] = function (K) {
trShop(K, { behind: "trsigns", side: "trsigns", mid: "treasel",
work: function (K, B, zp) { K.put("workbench", K.L + 1.6, B + 0.6, 0); K.put("treasel", K.R - 1.6, (B + zp) / 2, 0); K.put("trsigns", 0, B + 0.4, 0); } });
};
TR["The Undertaker's"] = function (K) { return __ZC(194, 16, this, arguments, new.target); };
function trYardOffice(K, x, z) { K.wallX(z, x - 2, x + 2, [x]); K.put("desk", x, z - 1.4, 0); K.put("filecabinet", x - 1.4, z - 2.4, 0); }
TR["The Joinery"] = function (K) { return __ZC(194, 17, this, arguments, new.target); };
TR["The Masons' Yard"] = function (K) { return __ZC(194, 18, this, arguments, new.target); };
TR["The Glassworks"] = function (K) { return __ZC(194, 19, this, arguments, new.target); };
TR["The Engine House"] = function (K) { return __ZC(194, 20, this, arguments, new.target); };
TR["The Waterworks"] = function (K) { return __ZC(194, 21, this, arguments, new.target); };
TR["The City Depot"] = function (K) { return __ZC(194, 22, this, arguments, new.target); };
TR["The Wheelwright's"] = function (K) {
var W = K.W, D = K.D, put = K.put;
put("trwheelstand", -W / 4, K.B + 2.2, 0);
put("trwheelstand", W / 4, K.B + 2.2, 0);
put("trtoolwall", 0, K.B + 0.1, 0);
put("workbench", K.L + 0.6, K.Fz - 3.6, Math.PI / 2);
put("trlathe", K.R - 0.8, K.Fz - 3.6, -Math.PI / 2);
put("trlogs", K.L + 1.6, 0, 0);
K.spot(0, K.B + 3.4, "the wheels");
};
TR["The Sawmill"] = function (K) { return __ZC(194, 23, this, arguments, new.target); };
TR["The Stables"] = function (K) { return __ZC(194, 24, this, arguments, new.target); };
TR["The Dairy"] = function (K) { return __ZC(194, 25, this, arguments, new.target); };
TR["The Sheepfold"] = function (K) { return __ZC(194, 26, this, arguments, new.target); };
TR["The Mill"] = function (K) {
var put = K.put;
put("trmillstone", 0, 0, 0);
put("trsacks", K.L + 1.4, K.Fz - 2.2, 0);
put("trsacks", K.R - 1.4, K.Fz - 2.2, 0);
put("trassay", K.R - 1.2, -1.6, -Math.PI / 2);
K.spot(1.6, 1.6, "the stones");
};
TR["The Fish Quay"] = function (K) { return __ZC(194, 27, this, arguments, new.target); };
TR["The Mine Head"] = function (K) { return __ZC(194, 28, this, arguments, new.target); };
TR["The Charcoal Burner's Hut"] = function (K) {
var put = K.put;
put("trhearth", 0, K.B + 0.45, 0);
put("trlogs", K.L + 1.4, K.Fz - 1.8, 0);
put("trsacks", K.R - 1, K.Fz - 1.6, 0);
put("cot", K.R - 0.6, K.B + 1.4, 0);
put("trbenchtable", K.L + 1.4, 0, Math.PI / 2);
K.spot(0, 0, "the hut");
};
function trLodge(K, o) { return __ZC(194, 29, this, arguments, new.target); }
TR["The Gardeners' Lodge"] = function (K) { trLodge(K, { walls: ["trtoolwall", "flowerbucket"], left: ["trsacks", "workbench"] }); };
TR["The Forester's Lodge"] = function (K) { trLodge(K, { walls: ["trtoolwall", "trwallmap"], left: ["trlogs", "workbench"] }); };
TR["The Hunters' Lodge"] = function (K) { trLodge(K, { walls: [FURN.weaponrack ? "weaponrack" : "trtoolwall", FURN.pelt ? "pelt" : "trsaddles"], left: ["trbenchtable", "barrel"] }); };
TR["The Menagerie Lodge"] = function (K) { trLodge(K, { walls: ["trcages", "trcages"], left: ["trsacks", "trtrough"] }); };
TR["The Farmhouse"] = function (K) { return __ZC(194, 30, this, arguments, new.target); };
TR["The City Museum"] = function (K) { return __ZC(194, 31, this, arguments, new.target); };
TR["The City Archive"] = function (K) { return __ZC(194, 32, this, arguments, new.target); };
TR["The City Treasury"] = function (K) { return __ZC(194, 33, this, arguments, new.target); };
TR["The City Hospital"] = function (K) { return __ZC(194, 34, this, arguments, new.target); };
TR["The City School"] = function (K) { return __ZC(194, 35, this, arguments, new.target); };
TR["The Dragon Roost"] = function (K) { return __ZC(194, 36, this, arguments, new.target); };
TR["The Somnucor Inn"] = function (K) { return __ZC(194, 37, this, arguments, new.target); };
(function () {
if (typeof planOf !== "function" || typeof fillHall !== "function")
return;
var po = planOf;
planOf = function (spec) {
var p = po.apply(this, arguments);
try {
var key = spec && spec.workplace;
if (!key || !TR[key] || !p)
return p;
if (p.mode === "hall")
return Object.assign({}, p, { fill: "tr:" + key });
if (p.mode === "mixed")
return Object.assign({}, p, { ground: "tr:" + key });
if (p.mode === "rooms") {
var d = KIT[spec.archetype] || KIT.house, a = spec.attrs || {}, sc = a.s || 1;
return { mode: "hall", w: Math.max(7, Math.min(24, d.size[0] * sc * 0.8)), d: Math.max(7, Math.min(26, d.size[2] * sc * 0.8)), fill: "tr:" + key, wall: p.wall || 0xDCD4C4, floor: p.floor || "wood" };
}
}
catch (e) { }
return p;
};
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
if (typeof kind === "string" && kind.indexOf("tr:") === 0) {
var key = kind.slice(3);
try {
TR[key](trKit(W, D, put, spots));
return;
}
catch (e) {
if (window.console)
console.warn("[trade-rooms] " + key, e);
return fh.call(this, "shop", W, D, put, spots);
}
}
return fh.apply(this, arguments);
};
if (typeof workplaceFit === "function") {
var wf = workplaceFit;
workplaceFit = function (key) { if (TR[key])
return []; return wf.apply(this, arguments); };
}
if (typeof ROOMNAME !== "undefined") {
Object.keys(TR).forEach(function (k) { ROOMNAME["tr:" + k] = k.replace(/^The /, ""); });
}
})();
