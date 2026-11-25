/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WG = { cur: null, lv: 0, progs: {}, sign: {}, proto: {}, staffOn: [], cullAt: 0, locksAt: 0, talkAt: 0, near: null, toldLock: 0 };
function wgPiece(k, w, d, solid, fixed, fn) {
if (typeof FURN !== "object" || !FURN)
return;
FURN[k] = function () {
var pr = WG.proto[k];
if (!pr) {
try {
pr = WG.proto[k] = fn();
}
catch (e) {
if (window.console)
console.warn("[wings] " + k, e);
pr = WG.proto[k] = new THREE.Group();
}
}
var c = pr.clone();
c.userData.wgShared = 1;
return c;
};
if (typeof TR_BOX !== "undefined")
TR_BOX[k] = [w, d];
if (solid && typeof SOLIDFURN !== "undefined")
SOLIDFURN[k] = 1;
if (fixed && typeof FIXED_FURN !== "undefined")
FIXED_FURN[k] = 1;
}
function wgM(c, tex, opt) { return trM(c, tex, opt); }
var WG_WHITE = 0xEEF0F0, WG_STEEL = 0xB8BEC4, WG_DARK = 0x2A2E34, WG_BLUE = 0x6E9CC0, WG_MINT = 0x9FC8C0;
if (typeof trB === "function") {
wgPiece("wgsecdoor", 1.5, 0.2, true, true, function () {
var G = new THREE.Group(), g = new THREE.Group(), fr = wgM(0x5A6068, null, "shine");
trB(g, 0.1, 2.3, 0.22, fr, -0.75, 1.15, 0);
trB(g, 0.1, 2.3, 0.22, fr, 0.75, 1.15, 0);
trB(g, 1.6, 0.14, 0.22, fr, 0, 2.33, 0);
trB(g, 1.5, 0.9, 0.14, TR_PLASTER(), 0, 2.75, 0);
trB(g, 0.16, 0.24, 0.05, wgM(0x1A1C20), 0.98, 1.25, 0.13);
trB(g, 0.1, 0.05, 0.02, wgM(0xE0A030, null, "glow"), 0.98, 1.33, 0.16);
trB(g, 0.16, 0.24, 0.05, wgM(0x1A1C20), -0.98, 1.25, -0.13);
G.add(trDone(g));
var leaf = new THREE.Group();
leaf.name = "leaf";
leaf.position.set(-0.7, 0, 0);
trB(leaf, 1.4, 2.22, 0.06, wgM(0x8C96A0, null, "shine"), 0.7, 1.12, 0);
trB(leaf, 0.5, 0.7, 0.07, wgM(0xBFD4E0, null, "glass"), 0.7, 1.55, 0);
trB(leaf, 0.12, 0.04, 0.12, wgM(0xD0D4D8, null, "shine"), 1.25, 1.0, 0);
G.add(leaf);
return G;
});
wgPiece("wgcurtain", 0.1, 2.2, false, false, function () {
var g = new THREE.Group(), cm = wgM(0x8DB4CC);
trB(g, 0.04, 0.04, 2.3, wgM(WG_STEEL, null, "shine"), 0, 2.4, 0);
for (var i = 0; i < 7; i++)
trB(g, 0.05, 1.9, 0.34, cm, (i % 2 ? 0.03 : -0.03), 1.38, -0.98 + i * 0.33);
return trDone(g);
});
wgPiece("wgivstand", 0.4, 0.4, false, false, function () {
var g = new THREE.Group(), s = wgM(WG_STEEL, null, "shine");
trC(g, 0.015, 0.015, 1.9, 6, s, 0, 0.95, 0);
trB(g, 0.45, 0.02, 0.02, s, 0, 1.88, 0);
trB(g, 0.12, 0.2, 0.04, wgM(0xDDEEF4, null, "glass"), 0.16, 1.72, 0);
trB(g, 0.4, 0.03, 0.04, s, 0, 0.03, 0);
trB(g, 0.04, 0.03, 0.4, s, 0, 0.03, 0);
return trDone(g);
});
wgPiece("wgvitals", 0.5, 0.5, false, false, function () {
var g = new THREE.Group(), s = wgM(WG_STEEL, null, "shine");
trC(g, 0.03, 0.03, 1.3, 6, s, 0, 0.65, 0);
trB(g, 0.45, 0.04, 0.45, s, 0, 0.03, 0);
trB(g, 0.46, 0.36, 0.12, wgM(0xDCE0E4), 0, 1.45, 0);
trB(g, 0.38, 0.27, 0.01, wgM(0x0C1418), 0, 1.46, 0.065);
trB(g, 0.3, 0.012, 0.004, wgM(0x60E090, null, "glow"), 0, 1.52, 0.072);
trB(g, 0.2, 0.012, 0.004, wgM(0x60C0F0, null, "glow"), -0.04, 1.44, 0.072);
trB(g, 0.08, 0.03, 0.004, wgM(0xF0D060, null, "glow"), 0.12, 1.38, 0.072);
return trDone(g);
});
wgPiece("wgcrashcart", 0.7, 0.5, true, false, function () {
var g = new THREE.Group(), r = wgM(0xC0392B, null, "shine");
trB(g, 0.66, 0.95, 0.46, r, 0, 0.55, 0);
for (var i = 0; i < 5; i++)
trB(g, 0.6, 0.012, 0.47, wgM(0x7A1E16), 0, 0.2 + i * 0.18, 0.002);
trB(g, 0.72, 0.04, 0.5, wgM(WG_DARK), 0, 1.04, 0);
trB(g, 0.32, 0.18, 0.24, wgM(0xF0D040), -0.12, 1.15, 0);
[-0.28, 0.28].forEach(function (x) { [-0.18, 0.18].forEach(function (z) { trC(g, 0.04, 0.04, 0.04, 8, wgM(WG_DARK), x, 0.04, z, Math.PI / 2); }); });
return trDone(g);
});
wgPiece("wgoptable", 0.8, 2.1, true, false, function () {
var g = new THREE.Group(), s = wgM(WG_STEEL, null, "shine");
trB(g, 0.55, 0.08, 0.7, s, 0, 0.04, 0);
trC(g, 0.12, 0.14, 0.75, 10, s, 0, 0.45, 0);
trB(g, 0.62, 0.1, 2.0, wgM(0x2E3A44), 0, 0.88, 0);
trB(g, 0.58, 0.06, 1.9, wgM(0x3E6E8A), 0, 0.95, 0);
trB(g, 0.06, 0.04, 1.7, s, -0.34, 0.86, 0);
trB(g, 0.06, 0.04, 1.7, s, 0.34, 0.86, 0);
trC(g, 0.04, 0.04, 0.9, 6, s, 0, 2.75, 0);
trB(g, 0.04, 0.04, 0.7, s, 0, 2.3, 0.3);
trC(g, 0.42, 0.36, 0.14, 16, wgM(0xE8ECEE), 0, 2.2, 0.6);
trC(g, 0.32, 0.32, 0.02, 16, wgM(0xFFFBEA, null, "glow"), 0, 2.12, 0.6);
return trDone(g);
});
wgPiece("wganaesthesia", 0.8, 0.7, true, false, function () {
var g = new THREE.Group();
trB(g, 0.7, 1.05, 0.6, wgM(0xD8DEE4), 0, 0.6, 0);
trB(g, 0.7, 0.06, 0.62, wgM(WG_STEEL, null, "shine"), 0, 1.15, 0);
trB(g, 0.5, 0.34, 0.06, wgM(0x14181C), 0, 1.45, -0.15);
trB(g, 0.4, 0.2, 0.01, wgM(0x50C8A0, null, "glow"), 0, 1.47, -0.11);
trC(g, 0.06, 0.06, 0.4, 8, wgM(0x2E7AC0), -0.28, 1.4, 0.22);
trC(g, 0.06, 0.06, 0.4, 8, wgM(0xF0F0F0), -0.14, 1.4, 0.22);
trC(g, 0.05, 0.05, 0.1, 8, wgM(0x203040), 0.2, 1.25, 0.2, Math.PI / 2);
[-0.28, 0.28].forEach(function (x) { [-0.24, 0.24].forEach(function (z) { trC(g, 0.05, 0.05, 0.05, 8, wgM(WG_DARK), x, 0.05, z, Math.PI / 2); }); });
return trDone(g);
});
wgPiece("wgxray", 1.0, 2.3, true, false, function () {
var g = new THREE.Group(), s = wgM(WG_STEEL, null, "shine"), cream = wgM(0xE6E2D8);
trB(g, 0.8, 0.7, 1.6, cream, 0, 0.35, 0);
trB(g, 0.78, 0.08, 2.2, wgM(0xDDE4EA), 0, 0.74, 0);
trB(g, 0.14, 2.6, 0.14, s, -0.62, 1.3, 0);
trB(g, 0.9, 0.12, 0.16, s, -0.2, 2.2, 0);
trB(g, 0.42, 0.34, 0.5, cream, 0.1, 1.95, 0);
trB(g, 0.36, 0.04, 0.36, wgM(0x2A2E34), 0.1, 1.77, 0);
trB(g, 0.08, 1.9, 0.6, cream, 0.62, 1.0, -0.7);
trB(g, 0.02, 0.4, 0.42, wgM(0xBFD4E0, null, "glass"), 0.57, 1.4, -0.7);
return trDone(g);
});
wgPiece("wgscanner", 2.4, 3.6, true, false, function () {
var g = new THREE.Group(), w = wgM(0xF0F2F4), grey = wgM(0xB0B8C0);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.32, 10, 28), w);
ring.position.set(0, 1.15, -0.6);
g.add(ring);
trB(g, 2.2, 0.5, 0.9, w, 0, 0.25, -0.6);
trB(g, 0.5, 2.0, 0.9, w, -1.0, 1.0, -0.6);
trB(g, 0.5, 2.0, 0.9, w, 1.0, 1.0, -0.6);
trB(g, 2.2, 0.4, 0.9, w, 0, 2.0, -0.6);
trB(g, 2.2, 0.04, 0.02, wgM(0x6EB4E0, null, "glow"), 0, 2.2, -0.14);
trB(g, 0.5, 0.7, 1.8, grey, 0, 0.35, 0.9);
trB(g, 0.46, 0.08, 2.6, wgM(0xE8EEF2), 0, 0.74, 0.5);
return trDone(g);
});
wgPiece("wgmedshelf", 2.0, 0.45, true, false, function () {
var g = new THREE.Group(), r = trRand(31), cols = [0xF0F0F0, 0xE8D8B0, 0xB8D8F0, 0xF0C0B0, 0xC8E8C0, 0xF4E880];
trB(g, 2.0, 2.1, 0.04, wgM(0xDDE2E6), 0, 1.05, -0.2);
[-0.98, 0.98].forEach(function (x) { trB(g, 0.04, 2.1, 0.42, wgM(0xDDE2E6), x, 1.05, 0); });
for (var j = 0; j < 6; j++) {
var y = 0.15 + j * 0.36;
trB(g, 2.0, 0.03, 0.42, wgM(0xE8ECEE), 0, y, 0);
for (var x = -0.9; x < 0.9;) {
var bw = 0.07 + r() * 0.12;
trB(g, bw, 0.12 + r() * 0.14, 0.18 + r() * 0.16, wgM(cols[(r() * cols.length) | 0]), x + bw / 2, y + 0.1, 0.02);
x += bw + 0.015;
}
}
return trDone(g);
});
wgPiece("wgscrubsink", 2.2, 0.65, true, false, function () {
var g = new THREE.Group(), s = wgM(0xC8CED4, null, "shine");
trB(g, 2.2, 0.9, 0.6, s, 0, 0.45, 0);
trB(g, 2.2, 0.3, 0.6, s, 0, 1.1, -0.05);
trB(g, 2.2, 1.0, 0.04, wgM(0xE0E6EA), 0, 1.7, -0.28);
for (var i = 0; i < 3; i++) {
trB(g, 0.55, 0.25, 0.4, wgM(0x9AA2AA, null, "shine"), -0.7 + i * 0.7, 0.98, 0.05);
trC(g, 0.02, 0.02, 0.3, 6, s, -0.7 + i * 0.7, 1.45, -0.15);
trB(g, 0.02, 0.02, 0.18, s, -0.7 + i * 0.7, 1.6, -0.07);
}
return trDone(g);
});
wgPiece("wgmorgue", 2.6, 0.9, true, false, function () {
var g = new THREE.Group(), s = wgM(0xBCC2C8, null, "shine"), d = wgM(0xA6ACB2, null, "shine");
trB(g, 2.6, 2.1, 0.85, s, 0, 1.05, 0);
for (var i = 0; i < 3; i++)
for (var j = 0; j < 3; j++) {
trB(g, 0.78, 0.62, 0.02, d, -0.86 + i * 0.86, 0.38 + j * 0.68, 0.43);
trB(g, 0.3, 0.04, 0.05, wgM(WG_DARK), -0.86 + i * 0.86, 0.52 + j * 0.68, 0.46);
}
return trDone(g);
});
wgPiece("wgsteeltable", 0.9, 2.0, true, false, function () {
var g = new THREE.Group(), s = wgM(0xC4CAD0, null, "shine");
trB(g, 0.85, 0.06, 1.95, s, 0, 0.88, 0);
trB(g, 0.85, 0.04, 1.95, s, 0, 0.3, 0);
[-0.38, 0.38].forEach(function (x) { [-0.9, 0.9].forEach(function (z) { trB(g, 0.05, 0.88, 0.05, s, x, 0.44, z); }); });
return trDone(g);
});
wgPiece("wgexamcouch", 0.75, 1.9, true, false, function () {
var g = new THREE.Group();
trB(g, 0.7, 0.6, 1.8, wgM(0xE4E8EC), 0, 0.3, 0);
trB(g, 0.72, 0.12, 1.86, wgM(0x3E7A8E), 0, 0.66, 0);
trB(g, 0.72, 0.12, 0.6, wgM(0x3E7A8E), 0, 0.86, -0.62, -0.5);
trB(g, 0.6, 0.01, 1.2, wgM(0xF4F4F0), 0, 0.73, 0.25);
return trDone(g);
});
wgPiece("wgwheelchair", 0.7, 0.9, false, false, function () {
var g = new THREE.Group(), s = wgM(0x30343A, null, "shine");
[-0.32, 0.32].forEach(function (x) { var w = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 6, 16), s); w.position.set(x, 0.3, -0.05); w.rotation.y = Math.PI / 2; g.add(w); });
trB(g, 0.5, 0.06, 0.45, wgM(0x2A3A5A), 0, 0.5, 0);
trB(g, 0.5, 0.45, 0.05, wgM(0x2A3A5A), 0, 0.78, -0.22);
trB(g, 0.5, 0.03, 0.2, s, 0, 0.12, 0.38);
return trDone(g);
});
wgPiece("wgnursedesk", 3.2, 0.9, true, false, function () {
var g = new THREE.Group(), wd = wgM(0xD8CDB8, "wood"), top = wgM(0xF2F0EA);
trB(g, 3.2, 1.1, 0.12, wd, 0, 0.55, 0.38);
trB(g, 3.2, 0.05, 0.32, top, 0, 1.12, 0.38);
trB(g, 3.2, 0.05, 0.7, top, 0, 0.76, 0);
trB(g, 0.06, 0.74, 0.66, wd, -1.55, 0.37, 0);
trB(g, 0.06, 0.74, 0.66, wd, 1.55, 0.37, 0);
[-0.8, 0.8].forEach(function (x) { trB(g, 0.5, 0.32, 0.03, wgM(0x14181C), x, 1.05, -0.05); trB(g, 0.44, 0.26, 0.01, wgM(0x9AC8E8, null, "glow"), x, 1.05, -0.03); trB(g, 0.08, 0.2, 0.08, wgM(WG_DARK), x, 0.86, -0.08); });
trB(g, 0.4, 0.03, 0.15, wgM(0x2A2E34), -0.8, 0.79, 0.15);
trB(g, 0.4, 0.03, 0.15, wgM(0x2A2E34), 0.8, 0.79, 0.15);
return trDone(g);
});
wgPiece("wgworkstation", 1.5, 0.75, true, false, function () {
var g = new THREE.Group(), wd = wgM(0x9A7A58, "wood"), d = wgM(WG_DARK);
trB(g, 1.5, 0.05, 0.75, wd, 0, 0.75, 0);
trB(g, 0.04, 0.73, 0.7, wd, -0.72, 0.37, 0);
trB(g, 0.45, 0.6, 0.6, wd, 0.5, 0.4, 0);
trB(g, 0.56, 0.34, 0.03, d, -0.15, 1.1, -0.2);
trB(g, 0.5, 0.28, 0.01, wgM(0xA8D0F0, null, "glow"), -0.15, 1.1, -0.18);
trB(g, 0.06, 0.16, 0.06, d, -0.15, 0.86, -0.22);
trB(g, 0.42, 0.02, 0.14, wgM(0x3A3E44), -0.15, 0.785, 0.08);
trB(g, 0.22, 0.02, 0.3, wgM(0xF4F2EC), 0.45, 0.785, -0.05);
trB(g, 0.08, 0.1, 0.08, wgM(0xC04A2A), 0.62, 0.82, -0.25);
var ch = wgM(0x2E3238);
trB(g, 0.5, 0.08, 0.48, ch, 0, 0.48, 0.62);
trB(g, 0.48, 0.55, 0.06, ch, 0, 0.82, 0.86);
trC(g, 0.03, 0.03, 0.42, 6, wgM(WG_STEEL, null, "shine"), 0, 0.24, 0.62);
trB(g, 0.55, 0.03, 0.06, d, 0, 0.03, 0.62);
trB(g, 0.06, 0.03, 0.55, d, 0, 0.03, 0.62);
return trDone(g);
});
wgPiece("wgshelving", 2.0, 0.6, true, false, function () {
var g = new THREE.Group(), r = trRand(57), s = wgM(0x6E7880, null, "shine");
[-0.97, 0.97].forEach(function (x) { [-0.27, 0.27].forEach(function (z) { trB(g, 0.05, 2.2, 0.05, s, x, 1.1, z); }); });
for (var j = 0; j < 5; j++) {
var y = 0.1 + j * 0.5;
trB(g, 2.0, 0.03, 0.58, wgM(0x8A9298), 0, y, 0);
for (var x = -0.9; x < 0.85;) {
var bw = 0.3 + r() * 0.35;
if (r() < 0.82)
trB(g, bw - 0.04, 0.18 + r() * 0.2, 0.4 + r() * 0.12, wgM(r() < 0.6 ? 0xC8A878 : 0xE4E0D4), x + bw / 2, y + 0.12, 0);
x += bw;
}
}
return trDone(g);
});
wgPiece("wgpallets", 2.8, 1.1, true, false, function () {
var g = new THREE.Group(), r = trRand(77), o = wgM(0xE07A20, null, "shine"), b = wgM(0x2E5A9E, null, "shine");
[-1.35, 1.35].forEach(function (x) { [-0.5, 0.5].forEach(function (z) { trB(g, 0.08, 4.2, 0.08, b, x, 2.1, z); }); });
for (var j = 0; j < 3; j++) {
var y = 0.15 + j * 1.4;
trB(g, 2.8, 0.1, 0.06, o, 0, y, 0.5);
trB(g, 2.8, 0.1, 0.06, o, 0, y, -0.5);
[-0.65, 0.65].forEach(function (x) {
trB(g, 1.15, 0.14, 1.0, wgM(0xA8875A, "wood"), x, y + 0.12, 0);
if (r() < 0.85)
trB(g, 1.05, 0.5 + r() * 0.6, 0.95, wgM(r() < 0.5 ? 0xC8A878 : 0xD8D0C0), x, y + 0.5 + r() * 0.1, 0);
});
}
return trDone(g);
});
wgPiece("wgforklift", 1.2, 2.4, true, false, function () {
var g = new THREE.Group(), y = wgM(0xE8B820, null, "shine"), d = wgM(WG_DARK);
trB(g, 1.1, 0.7, 1.6, y, 0, 0.6, 0.2);
trB(g, 1.0, 0.4, 0.5, d, 0, 0.5, 0.95);
trB(g, 0.5, 0.1, 0.5, d, 0, 1.0, 0.3);
[-0.5, 0.5].forEach(function (x) { trB(g, 0.06, 2.0, 0.06, d, x, 1.3, 1.0); trB(g, 0.06, 2.0, 0.06, d, x, 1.3, -0.55); trC(g, 0.25, 0.25, 0.2, 12, d, x * 1.1, 0.25, 0.65, 0, 0, Math.PI / 2); trC(g, 0.22, 0.22, 0.2, 12, d, x * 1.1, 0.22, -0.35, 0, 0, Math.PI / 2); });
trB(g, 1.0, 0.06, 0.06, d, 0, 2.3, 0.2);
trB(g, 0.9, 1.4, 0.1, d, 0, 0.9, -0.65);
trB(g, 0.12, 0.05, 1.1, d, -0.3, 0.1, -1.15);
trB(g, 0.12, 0.05, 1.1, d, 0.3, 0.1, -1.15);
return trDone(g);
});
wgPiece("wgconveyor", 3.2, 0.9, true, false, function () {
var g = new THREE.Group(), r = trRand(5), s = wgM(0x7A8288, null, "shine");
trB(g, 3.2, 0.08, 0.8, wgM(0x2A2C30), 0, 0.85, 0);
trB(g, 3.2, 0.12, 0.06, s, 0, 0.9, 0.42);
trB(g, 3.2, 0.12, 0.06, s, 0, 0.9, -0.42);
[-1.4, 0, 1.4].forEach(function (x) { trB(g, 0.06, 0.8, 0.7, s, x, 0.42, 0); });
for (var i = 0; i < 4; i++)
trB(g, 0.3 + r() * 0.2, 0.2 + r() * 0.2, 0.3 + r() * 0.2, wgM(0xC8A878), -1.2 + i * 0.8, 1.05, 0);
return trDone(g);
});
wgPiece("wgwatercooler", 0.4, 0.4, true, false, function () {
var g = new THREE.Group();
trB(g, 0.34, 1.0, 0.34, wgM(0xE8ECEE), 0, 0.5, 0);
trC(g, 0.15, 0.15, 0.4, 12, wgM(0x9ACCE8, null, "glass"), 0, 1.2, 0);
trB(g, 0.12, 0.06, 0.05, wgM(0x3060A0), 0, 0.82, 0.18);
return trDone(g);
});
wgPiece("wgcopier", 0.9, 0.7, true, false, function () {
var g = new THREE.Group();
trB(g, 0.85, 0.9, 0.65, wgM(0xDDE0E2), 0, 0.45, 0);
trB(g, 0.8, 0.18, 0.6, wgM(0xC8CCD0), 0, 1.0, 0);
trB(g, 0.3, 0.12, 0.02, wgM(0x3A6AA0, null, "glow"), 0.2, 1.0, 0.31);
trB(g, 0.4, 0.03, 0.3, wgM(0xF4F2EC), -0.2, 1.1, 0);
for (var i = 0; i < 3; i++)
trB(g, 0.8, 0.01, 0.6, wgM(0x9AA0A6), 0, 0.2 + i * 0.22, 0.33);
return trDone(g);
});
wgPiece("wgwhiteboard", 2.0, 0.1, false, false, function () {
var g = new THREE.Group();
trB(g, 2.0, 1.1, 0.04, wgM(WG_STEEL, null, "shine"), 0, 1.6, 0);
trB(g, 1.92, 1.02, 0.02, wgM(0xFAFAF8), 0, 1.6, 0.02);
trB(g, 1.9, 0.04, 0.08, wgM(WG_STEEL), 0, 1.03, 0.05);
[[0.4, 0.03, 0x2A60B0, -0.5, 1.85], [0.7, 0.03, 0x2A2A2A, -0.3, 1.75], [0.5, 0.03, 0xB03030, 0.3, 1.6], [0.3, 0.3, 0x2A60B0, 0.55, 1.4]].forEach(function (q) { trB(g, q[0], q[1], 0.005, wgM(q[2]), q[3], q[4], 0.032); });
return trDone(g);
});
wgPiece("wgcoffeebar", 2.6, 0.65, true, false, function () {
var g = new THREE.Group(), wd = wgM(0xC8B89A, "wood"), top = wgM(0x3A3A3E, null, "shine");
trB(g, 2.6, 0.88, 0.6, wd, 0, 0.44, 0);
trB(g, 2.64, 0.05, 0.64, top, 0, 0.9, 0);
trB(g, 2.6, 0.7, 0.35, wd, 0, 1.95, -0.12);
trB(g, 0.34, 0.42, 0.32, wgM(0x1E1E22, null, "shine"), -0.8, 1.13, -0.08);
trB(g, 0.1, 0.05, 0.02, wgM(0x60C080, null, "glow"), -0.8, 1.25, 0.08);
trB(g, 0.5, 0.3, 0.36, wgM(0xE8E8E8), 0.15, 1.08, -0.06);
trB(g, 0.3, 0.2, 0.01, wgM(0x2A2E34), 0.08, 1.08, 0.12);
trC(g, 0.08, 0.09, 0.22, 10, wgM(0xB0B4B8, null, "shine"), 0.75, 1.03, 0);
for (var i = 0; i < 5; i++)
trC(g, 0.04, 0.035, 0.09, 8, wgM([0xF4F4F0, 0xC04A2A, 0x2A6AB0][i % 3]), 0.95 + ((i % 3) - 1) * 0.1, 0.97, 0.15 + Math.floor(i / 3) * 0.1);
return trDone(g);
});
wgPiece("wgvending", 1.0, 0.85, true, false, function () {
var g = new THREE.Group(), r = trRand(11);
trB(g, 1.0, 1.9, 0.8, wgM(0x9A1E24, null, "shine"), 0, 0.95, 0);
trB(g, 0.66, 1.3, 0.02, wgM(0xBFD4E0, null, "glass"), -0.12, 1.2, 0.41);
for (var j = 0; j < 5; j++)
for (var i = 0; i < 4; i++)
trB(g, 0.11, 0.16, 0.1, wgM([0xE0C040, 0x3070C0, 0xE06030, 0x40A060, 0xF0F0F0][(r() * 5) | 0]), -0.36 + i * 0.16, 0.7 + j * 0.24, 0.3);
trB(g, 0.2, 0.5, 0.02, wgM(0x2A2E34), 0.36, 1.3, 0.41);
trB(g, 0.12, 0.06, 0.01, wgM(0x60C0F0, null, "glow"), 0.36, 1.45, 0.42);
trB(g, 0.6, 0.16, 0.02, wgM(0x1A1A1E), -0.12, 0.3, 0.41);
return trDone(g);
});
wgPiece("wgtoilet", 1.1, 1.7, true, false, function () {
var g = new THREE.Group(), p = wgM(0xC8D4DC), wc = wgM(0xF6F6F4, null, "shine");
trB(g, 0.04, 2.0, 1.7, p, -0.55, 1.1, 0);
trB(g, 0.04, 2.0, 1.7, p, 0.55, 1.1, 0);
trB(g, 0.62, 1.75, 0.04, p, -0.22, 1.08, 0.84, 0, -0.6, 0);
trB(g, 0.38, 0.4, 0.55, wc, 0, 0.2, -0.45);
trB(g, 0.42, 0.05, 0.5, wc, 0, 0.42, -0.42);
trB(g, 0.36, 0.4, 0.16, wc, 0, 0.62, -0.76);
trC(g, 0.06, 0.06, 0.1, 10, wgM(0xFAFAFA), 0.42, 0.8, -0.3, 0, 0, Math.PI / 2);
return trDone(g);
});
wgPiece("wgbasin", 1.9, 0.55, true, false, function () {
var g = new THREE.Group(), top = wgM(0xE6E2DA, null, "shine"), wc = wgM(0xF8F8F6, null, "shine");
trB(g, 1.9, 0.84, 0.5, wgM(0x6A5A4A, "wood"), 0, 0.42, 0);
trB(g, 1.94, 0.05, 0.54, top, 0, 0.86, 0);
[-0.45, 0.45].forEach(function (x) { trB(g, 0.44, 0.08, 0.34, wc, x, 0.86, 0.04); trC(g, 0.02, 0.02, 0.18, 6, wgM(0xC0C4C8, null, "shine"), x, 0.98, -0.18); });
trB(g, 1.8, 0.9, 0.03, wgM(0xDDE6EE, null, "shine"), 0, 1.65, -0.24);
trB(g, 0.25, 0.3, 0.12, wgM(0xE8E8E8), 0.9, 1.25, -0.2);
return trDone(g);
});
wgPiece("wgtv", 1.6, 0.5, true, false, function () {
var g = new THREE.Group();
trB(g, 1.6, 0.5, 0.45, wgM(0x4A3A2E, "wood"), 0, 0.25, 0);
trB(g, 1.5, 0.85, 0.05, wgM(0x14161A), 0, 1.0, -0.05);
trB(g, 1.42, 0.77, 0.01, wgM(0x3A6A8A, null, "glow"), 0, 1.0, -0.02);
trB(g, 0.1, 0.25, 0.1, wgM(0x14161A), 0, 0.55, -0.05);
return trDone(g);
});
wgPiece("wgcookline", 3.2, 0.85, true, false, function () {
var g = new THREE.Group(), s = wgM(0xBCC2C8, null, "shine"), d = wgM(0x2A2C30);
trB(g, 3.2, 0.9, 0.8, s, 0, 0.45, 0);
trB(g, 3.2, 0.04, 0.84, wgM(0xD0D6DC, null, "shine"), 0, 0.92, 0);
for (var i = 0; i < 4; i++) {
trC(g, 0.13, 0.13, 0.03, 12, d, -1.2 + i * 0.35, 0.95, -0.1);
trC(g, 0.13, 0.13, 0.03, 12, d, -1.2 + i * 0.35, 0.95, 0.2);
}
trB(g, 0.6, 0.25, 0.5, d, 0.55, 1.0, 0);
trB(g, 0.6, 0.1, 0.5, wgM(0xC8A040), 1.25, 0.98, 0);
trC(g, 0.18, 0.16, 0.22, 12, s, -1.0, 1.06, 0.1);
trC(g, 0.14, 0.14, 0.12, 12, s, -0.3, 1.0, 0.15);
trB(g, 3.3, 0.5, 1.0, s, 0, 2.45, -0.05);
trB(g, 3.2, 0.6, 0.1, s, 0, 2.0, -0.45);
for (var j = 0; j < 3; j++)
trB(g, 0.9, 0.02, 0.02, d, -1.0 + j * 1.0, 2.18, 0.43);
return trDone(g);
});
wgPiece("wgdishpit", 2.0, 0.75, true, false, function () {
var g = new THREE.Group(), s = wgM(0xC0C6CC, null, "shine");
trB(g, 2.0, 0.9, 0.7, s, 0, 0.45, 0);
trB(g, 0.7, 0.3, 0.5, wgM(0x9AA0A6, null, "shine"), -0.5, 0.85, 0.03);
trB(g, 0.7, 0.3, 0.5, wgM(0x9AA0A6, null, "shine"), 0.3, 0.85, 0.03);
trC(g, 0.02, 0.02, 0.6, 6, s, -0.1, 1.3, -0.25);
trB(g, 0.5, 0.5, 0.6, wgM(0xD8DEE2), 0.75, 1.2, 0);
trB(g, 2.0, 0.03, 0.4, s, 0, 1.65, -0.15);
for (var i = 0; i < 8; i++)
trC(g, 0.12, 0.12, 0.02, 12, wgM(0xF4F4F0), -0.8 + i * 0.22, 1.75, -0.15, Math.PI / 2);
return trDone(g);
});
wgPiece("wgcolddoor", 2.2, 0.3, true, true, function () {
var g = new THREE.Group(), s = wgM(0xC8CED4, null, "shine");
trB(g, 2.2, 2.9, 0.2, wgM(0xE4E8EA), 0, 1.45, 0);
trB(g, 1.1, 2.1, 0.08, s, 0, 1.05, 0.13);
trB(g, 0.08, 0.4, 0.1, wgM(WG_DARK), 0.42, 1.1, 0.2);
trB(g, 0.3, 0.12, 0.02, wgM(0x50A0E0, null, "glow"), 0.8, 1.6, 0.11);
return trDone(g);
});
wgPiece("wgcontrol", 3.2, 1.1, true, false, function () {
var g = new THREE.Group(), d = wgM(0x2E3238), top = wgM(0x4A5058);
trB(g, 3.2, 0.75, 0.9, d, 0, 0.375, 0);
trB(g, 3.2, 0.05, 1.0, top, 0, 0.77, 0);
trB(g, 3.2, 0.4, 0.3, d, 0, 0.95, -0.4, -0.35);
for (var i = 0; i < 4; i++) {
trB(g, 0.62, 0.4, 0.04, wgM(0x14181C), -1.1 + i * 0.73, 1.35, -0.3);
trB(g, 0.56, 0.34, 0.01, wgM([0x60C890, 0x70B0E8, 0xE8C060, 0x70B0E8][i], null, "glow"), -1.1 + i * 0.73, 1.35, -0.275);
}
for (var j = 0; j < 12; j++)
trB(g, 0.06, 0.02, 0.06, wgM([0x40C060, 0xE0B030, 0x4090E0][j % 3], null, "glow"), -1.4 + j * 0.25, 1.03, -0.28);
return trDone(g);
});
wgPiece("wgcctv", 2.6, 0.1, false, false, function () {
var g = new THREE.Group();
trB(g, 2.6, 1.3, 0.06, wgM(0x1A1C20), 0, 1.75, 0);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 3; j++)
trB(g, 0.58, 0.36, 0.01, wgM([0x6A8A9A, 0x7A8A80, 0x8A8A90, 0x5A7A8A][(i + j) % 4], null, "glow"), -0.96 + i * 0.64, 1.32 + j * 0.42, 0.035);
return trDone(g);
});
wgPiece("wglabbench", 2.6, 0.8, true, false, function () {
var g = new THREE.Group(), w = wgM(0xE8E8E4), top = wgM(0x2A2E34, null, "shine"), r = trRand(19);
trB(g, 2.6, 0.88, 0.75, w, 0, 0.44, 0);
trB(g, 2.64, 0.04, 0.8, top, 0, 0.9, 0);
trB(g, 2.6, 0.03, 0.3, wgM(0xDDE2E6), 0, 1.45, -0.25);
trB(g, 2.6, 0.03, 0.3, wgM(0xDDE2E6), 0, 1.8, -0.25);
trB(g, 0.18, 0.06, 0.22, wgM(0x2A2E34), -0.8, 0.95, 0.1);
trB(g, 0.05, 0.32, 0.05, wgM(0x2A2E34), -0.8, 1.1, 0.0);
trC(g, 0.03, 0.03, 0.18, 8, wgM(0x2A2E34), -0.8, 1.22, 0.08, 0.6);
trC(g, 0.16, 0.16, 0.18, 14, wgM(0xDCE0E4), 0.0, 1.0, 0.05);
trB(g, 0.3, 0.06, 0.12, wgM(0x3A6AA0), 0.6, 0.95, 0.1);
for (var i = 0; i < 6; i++)
trC(g, 0.012, 0.012, 0.1, 6, wgM([0xD04040, 0x40A0D0, 0xE0C040][i % 3]), 0.48 + i * 0.05, 1.02, 0.1);
for (var k = 0; k < 14; k++)
trC(g, 0.035, 0.035, 0.12 + r() * 0.08, 8, wgM([0x9ACCE8, 0xE8C890, 0xC8E8C8, 0xF0F0F0][k % 4], null, k % 2 ? "glass" : null), -1.2 + k * 0.18, 1.53, -0.25);
return trDone(g);
});
wgPiece("wglaundry", 1.9, 0.75, true, false, function () {
var g = new THREE.Group(), w = wgM(0xE8ECEE);
[-0.48, 0.48].forEach(function (x) { trB(g, 0.9, 1.0, 0.7, w, x, 0.5, 0); trC(g, 0.28, 0.28, 0.03, 18, wgM(0x9AB4C8, null, "glass"), x, 0.55, 0.36, Math.PI / 2); trB(g, 0.8, 0.12, 0.02, wgM(0xB0B6BC), x, 0.9, 0.36); });
return trDone(g);
});
wgPiece("wgbunk", 1.0, 2.0, true, false, function () {
var g = new THREE.Group(), s = wgM(0x4A5058, null, "shine"), mt = wgM(0x5A6E8A), sh = wgM(0xF0EEE6);
[-0.47, 0.47].forEach(function (x) { [-0.97, 0.97].forEach(function (z) { trB(g, 0.05, 1.9, 0.05, s, x, 0.95, z); }); });
[0.4, 1.45].forEach(function (y) { trB(g, 0.95, 0.08, 1.95, s, 0, y, 0); trB(g, 0.9, 0.14, 1.9, mt, 0, y + 0.11, 0); trB(g, 0.88, 0.02, 1.4, sh, 0, y + 0.19, 0.22); trB(g, 0.5, 0.1, 0.3, sh, 0, y + 0.22, -0.75); });
return trDone(g);
});
wgPiece("wgchairrow", 2.4, 0.65, true, false, function () {
var g = new THREE.Group(), s = wgM(0x5A6068, null, "shine"), seat = wgM(0x2E5A8A);
trB(g, 2.4, 0.05, 0.08, s, 0, 0.38, 0);
for (var i = 0; i < 4; i++) {
var x = -0.9 + i * 0.6;
trB(g, 0.52, 0.08, 0.48, seat, x, 0.45, 0.02);
trB(g, 0.52, 0.48, 0.07, seat, x, 0.75, -0.24, -0.12);
}
[-1.1, 1.1].forEach(function (x) { trB(g, 0.05, 0.38, 0.5, s, x, 0.19, 0); });
return trDone(g);
});
wgPiece("wgreception", 3.2, 0.9, true, false, function () {
var g = new THREE.Group(), wd = wgM(0xB89A70, "wood"), top = wgM(0xF0EEE8);
trB(g, 3.2, 1.12, 0.14, wd, 0, 0.56, 0.38);
trB(g, 3.3, 0.05, 0.36, top, 0, 1.14, 0.38);
trB(g, 3.2, 0.05, 0.7, top, 0, 0.76, 0);
trB(g, 3.2, 0.06, 0.02, wgM(0xC9A040, null, "shine"), 0, 0.9, 0.46);
[-1.0, 0.4].forEach(function (x) { trB(g, 0.5, 0.32, 0.03, wgM(0x14181C), x, 1.05, -0.05); trB(g, 0.44, 0.26, 0.01, wgM(0x9AC8E8, null, "glow"), x, 1.05, -0.03); trB(g, 0.08, 0.2, 0.08, wgM(WG_DARK), x, 0.86, -0.08); });
trB(g, 0.3, 0.12, 0.2, wgM(0x2A2E34), 1.2, 0.84, 0);
trB(g, 0.25, 0.04, 0.12, wgM(0xF4F2EC), -0.3, 0.79, 0.12);
return trDone(g);
});
wgPiece("wgtreadmill", 0.9, 2.0, true, false, function () {
var g = new THREE.Group(), d = wgM(0x2A2C30);
trB(g, 0.8, 0.18, 1.8, d, 0, 0.12, 0.1);
trB(g, 0.6, 0.02, 1.6, wgM(0x14161A), 0, 0.22, 0.1);
[-0.38, 0.38].forEach(function (x) { trB(g, 0.05, 1.1, 0.05, wgM(0x8A9098, null, "shine"), x, 0.75, -0.75); });
trB(g, 0.8, 0.25, 0.15, d, 0, 1.32, -0.78);
trB(g, 0.4, 0.12, 0.01, wgM(0x60C0F0, null, "glow"), 0, 1.36, -0.7);
return trDone(g);
});
wgPiece("wgbedside", 0.5, 0.45, true, false, function () {
var g = new THREE.Group();
trB(g, 0.48, 0.75, 0.42, wgM(0xE4E0D6), 0, 0.375, 0);
trB(g, 0.4, 0.01, 0.3, wgM(0xA8B0B8), 0, 0.76, 0);
trC(g, 0.04, 0.04, 0.12, 8, wgM(0x9ACCE8, null, "glass"), 0.1, 0.82, 0.05);
return trDone(g);
});
wgPiece("wgbay", 1.0, 2.1, true, false, function () {
var G = new THREE.Group();
var g = new THREE.Group(), s = wgM(WG_STEEL, null, "shine");
trB(g, 0.95, 0.1, 2.0, wgM(0xE8ECEE), 0, 0.62, 0);
trB(g, 0.9, 0.14, 1.9, wgM(0xDCE8F0), 0, 0.75, 0);
trB(g, 0.86, 0.02, 1.2, wgM(0xA8C8E0), 0, 0.83, 0.3);
trB(g, 0.5, 0.1, 0.32, wgM(0xFAFAFA), 0, 0.86, -0.72);
trB(g, 0.95, 0.5, 0.05, wgM(0xD8DEE4), 0, 0.95, -0.98);
[-0.44, 0.44].forEach(function (x) { [-0.92, 0.92].forEach(function (z) { trB(g, 0.04, 0.6, 0.04, s, x, 0.3, z); }); trB(g, 0.03, 0.25, 1.1, s, x, 0.95, 0.1); });
G.add(trDone(g));
var add = function (k, x, z, ry) { var f = FURN[k] && FURN[k](); if (!f)
return; f.position.set(x, 0, z); f.rotation.y = ry || 0; G.add(f); };
add("wgbedside", -0.85, -0.75, 0);
add("wgvitals", 0.85, -0.75, 0);
add("wgivstand", 0.75, -0.1, 0);
add("wgcurtain", -1.35, 0, 0);
add("wgcurtain", 1.35, 0, 0);
return G;
});
}
function wgSignTex(label, secure) { return __ZC(275, 0, this, arguments, new.target); }
function wgSignKey(label, secure) { return __ZC(275, 1, this, arguments, new.target); }
