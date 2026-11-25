/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BST_KEY = "The Dreamers' Book Store";
var BST_GENRES = [
["fiction", "Fiction"], ["fantasy", "Fantasy"], ["scifi", "Science fiction"], ["mystery", "Mystery and thriller"],
["romance", "Romance"], ["horror", "Horror"], ["ya", "Young adult"], ["children", "Children's books"],
["poetry", "Poetry"], ["comics", "Comics and graphic novels"], ["nonfiction", "Non-fiction"], ["history", "History"],
["memoir", "Biography and memoir"], ["dreams", "Dreams and the mind"], ["spirit", "Faith and spirit"], ["selfhelp", "Self-help"],
["cookery", "Cookery and home"], ["art", "Art and photography"], ["business", "Business and money"], ["other", "Everything else"]
];
var BST_GN = {};
BST_GENRES.forEach(function (g) { BST_GN[g[0]] = g[1]; });
function bstGenreName(g) { return BST_GN[g] || "Everything else"; }
function bstGenreOfLabel(lab) {
var s = String(lab || "").replace(/\s+\d+$/, "");
for (var i = 0; i < BST_GENRES.length; i++)
if (BST_GENRES[i][1] === s)
return BST_GENRES[i][0];
return "all";
}
if (typeof S === "function" && typeof KIT !== "undefined" && !KIT.bstshop) {
var BST_BRICK = 0x8A4434, BST_STONE = 0xDCD2BE, BST_GREEN = 0x1E3B30, BST_GOLD = 0xC9A050;
S("bstshop", "structure", [26, 18, 20], [
{ g: "box", s: [26, 0.6, 20], p: [0, 0.3, 0], c: 0xB8AE9C },
{ g: "box", s: [25, 14.2, 18.6], p: [0, 7.7, -0.5], c: BST_BRICK },
{ g: "box", s: [0.7, 14.2, 0.7], p: [-12.3, 7.7, 8.55], c: BST_STONE, rep: [2, 24.6, 0, 0] },
{ g: "box", s: [25.4, 0.35, 0.4], p: [0, 5.9, 8.9], c: BST_STONE },
{ g: "box", s: [25.4, 0.3, 0.36], p: [0, 10.2, 8.9], c: BST_STONE },
{ g: "box", s: [24.4, 5.3, 0.35], p: [0, 2.95, 8.95], c: BST_GREEN },
{ g: "box", s: [16, 1.1, 0.2], p: [0, 5.1, 9.2], c: 0x16291F },
{ g: "box", s: [8.4, 3.5, 0.12], p: [-7.4, 2.35, 9.18], c: "glass" },
{ g: "box", s: [8.4, 3.5, 0.12], p: [7.4, 2.35, 9.18], c: "glass" },
{ g: "box", s: [8.2, 3.3, 0.05], p: [-7.4, 2.35, 8.7], c: 0xE8C890, glow: 1 },
{ g: "box", s: [8.2, 3.3, 0.05], p: [7.4, 2.35, 8.7], c: 0xE8C890, glow: 1 },
{ g: "box", s: [0.12, 3.5, 0.18], p: [-9.5, 2.35, 9.22], c: BST_GREEN, rep: [3, 2.1, 0, 0] },
{ g: "box", s: [0.12, 3.5, 0.18], p: [5.3, 2.35, 9.22], c: BST_GREEN, rep: [3, 2.1, 0, 0] },
{ g: "box", s: [0.55, 0.8, 0.06], p: [-10.6, 1.5, 8.95], c: 0x7A2E2E, rep: [6, 1.2, 0, 0] },
{ g: "box", s: [0.55, 0.8, 0.06], p: [4.2, 1.5, 8.95], c: 0x2F4A6A, rep: [6, 1.2, 0, 0] },
{ g: "box", s: [0.5, 0.72, 0.06], p: [-10.0, 2.75, 8.95], c: 0x2F5A3A, rep: [5, 1.2, 0, 0] },
{ g: "box", s: [0.5, 0.72, 0.06], p: [4.8, 2.75, 8.95], c: 0x8A6A2A, rep: [5, 1.2, 0, 0] },
{ g: "box", s: [8, 0.12, 0.6], p: [-7.4, 1.0, 8.8], c: 0x5A3A22 },
{ g: "box", s: [8, 0.12, 0.6], p: [7.4, 1.0, 8.8], c: 0x5A3A22 },
{ g: "box", s: [3.2, 3.9, 0.25], p: [0, 2.25, 9.05], c: 0x3A2418 },
{ g: "box", s: [1.45, 3.5, 0.1], p: [-0.75, 2.05, 9.2], c: BST_GREEN, rep: [2, 1.5, 0, 0] },
{ g: "box", s: [1.0, 1.9, 0.05], p: [-0.75, 2.4, 9.27], c: "glass", rep: [2, 1.5, 0, 0] },
{ g: "box", s: [3.0, 0.9, 0.1], p: [0, 4.35, 9.2], c: "glass" },
{ g: "sph", s: [0.07], p: [-0.18, 2.0, 9.32], c: BST_GOLD, rep: [2, 0.36, 0, 0] },
{ g: "box", s: [24, 0.22, 1.7], p: [0, 5.55, 9.95], c: 0x2A4A3A },
{ g: "box", s: [24, 0.35, 0.06], p: [0, 5.35, 10.8], c: BST_GOLD },
{ g: "box", s: [1.7, 2.6, 0.12], p: [-10.5, 8.0, 8.86], c: "glass", rep: [8, 3, 0, 0] },
{ g: "box", s: [1.7, 2.6, 0.12], p: [-10.5, 12.3, 8.86], c: "glass", rep: [8, 3, 0, 0] },
{ g: "box", s: [1.6, 2.4, 0.04], p: [-10.5, 8.0, 8.7], c: 0xEED8A8, glow: 1, rep: [8, 3, 0, 0] },
{ g: "box", s: [1.6, 2.4, 0.04], p: [-10.5, 12.3, 8.7], c: 0xEED8A8, glow: 1, rep: [8, 3, 0, 0] },
{ g: "box", s: [1.75, 0.08, 0.14], p: [-10.5, 8.0, 8.94], c: 0xF2EEE6, rep: [8, 3, 0, 0] },
{ g: "box", s: [1.75, 0.08, 0.14], p: [-10.5, 12.3, 8.94], c: 0xF2EEE6, rep: [8, 3, 0, 0] },
{ g: "box", s: [2.1, 0.2, 0.45], p: [-10.5, 6.6, 8.95], c: BST_STONE, rep: [8, 3, 0, 0] },
{ g: "box", s: [2.1, 0.2, 0.45], p: [-10.5, 10.9, 8.95], c: BST_STONE, rep: [8, 3, 0, 0] },
{ g: "box", s: [2.1, 0.35, 0.3], p: [-10.5, 9.45, 8.9], c: BST_STONE, rep: [8, 3, 0, 0] },
{ g: "box", s: [2.1, 0.35, 0.3], p: [-10.5, 13.75, 8.9], c: BST_STONE, rep: [8, 3, 0, 0] },
{ g: "box", s: [26, 0.55, 19.8], p: [0, 15.05, -0.5], c: BST_STONE },
{ g: "box", s: [25.4, 0.9, 0.4], p: [0, 15.75, 8.9], c: BST_STONE },
{ g: "tri", s: [9, 2.3, 0.6], p: [0, 16.2, 8.9], c: BST_STONE },
{ g: "cyl", s: [0.9, 0.9, 0.15, 20], p: [0, 17.1, 9.25], c: BST_GOLD },
{ g: "box", s: [25, 0.4, 18], p: [0, 15.5, -1], c: 0x4A4E56 },
{ g: "box", s: [4.4, 0.3, 1.4], p: [0, 0.15, 10.1], c: 0xCFC6B4 }
], ["book store", "bookstore", "bookshop", "book shop", "booksellers", "bookseller's"], { sign: [0, 5.1, 9.32, 15, 1.0] });
}
if (typeof cityWorkplace === "function")
cityWorkplace({ key: BST_KEY, ring: "markets", arch: "bstshop", s: 1, jobs: [], fit: [],
note: "Books by the dreamers themselves, on every kind of shelf. Open one and buy it from the shop that sells it." });
if (typeof cityMore === "function")
cityMore("xbst", function (C) {
if (typeof cityFrontage !== "function")
return;
cityFrontage(C, BST_KEY, 1080, 2) || cityFrontage(C, BST_KEY, 1080, 5) || cityFrontage(C, BST_KEY, 245, 5) || cityFrontage(C, BST_KEY, 1280, 4);
});
function bstPlace() { return typeof cityPlaceOf === "function" ? cityPlaceOf(BST_KEY) : null; }
function bstInside() { return !!(typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec && (INT.spec.workplace === BST_KEY || INT.spec.label === BST_KEY)); }
var BST_SLOTS = {};
var BST_TEX = { spines: [], signs: {} };
function bstCanvas(w, h, paint) {
var c = document.createElement("canvas");
c.width = w;
c.height = h;
paint(c.getContext("2d"), w, h);
var t = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace && "colorSpace" in t)
t.colorSpace = THREE.SRGBColorSpace;
return t;
}
function bstSpines(n) { return __ZC(359, 0, this, arguments, new.target); }
function bstSignTex(text, bg, fg) { return __ZC(359, 1, this, arguments, new.target); }
function bstPlane(g, w, h, tex, x, y, z, ry, basic) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex }) : new THREE.MeshLambertMaterial({ map: tex }));
m.position.set(x, y, z);
if (ry)
m.rotation.y = ry;
g.add(m);
return m;
}
(function () {
if (typeof wgPiece !== "function" || typeof trB !== "function")
return;
var oak = function () { return trM(0x5A3A22, "wood"); }, dark = function () { return trM(0x3A2416, "wood"); }, brass = function () { return trM(0xC9A050, null, "shine"); };
function bookcase(key, title, col) {
wgPiece(key, 2.0, 0.5, true, false, function () {
var g = new THREE.Group(), w = oak(), d = dark();
trB(g, 0.07, 2.6, 0.48, w, -0.97, 1.3, 0);
trB(g, 0.07, 2.6, 0.48, w, 0.97, 1.3, 0);
trB(g, 1.9, 2.6, 0.03, d, 0, 1.3, -0.225);
trB(g, 2.04, 0.14, 0.5, d, 0, 0.07, 0.01);
trB(g, 2.12, 0.1, 0.56, w, 0, 2.64, 0.02);
trB(g, 2.06, 0.05, 0.52, d, 0, 2.57, 0.01);
[0.14, 0.62, 1.1, 1.58, 2.06].forEach(function (y, i) {
trB(g, 1.88, 0.035, 0.44, w, 0, y, 0);
if (i !== 2)
bstPlane(g, 1.86, 0.4, bstSpines((i + key.length) % 3), 0, y + 0.22, -0.05);
});
trB(g, 1.88, 0.05, 0.04, d, 0, 1.15, 0.2);
trB(g, 1.7, 0.3, 0.04, d, 0, 2.86, 0.08);
bstPlane(g, 1.62, 0.24, bstSignTex(title, col), 0, 2.86, 0.105, 0, true);
return trDone(g);
});
BST_SLOTS[key] = [[-0.6, 1.36, 0.07, -0.12, 0], [0, 1.36, 0.07, -0.12, 0], [0.6, 1.36, 0.07, -0.12, 0]];
}
bookcase("bstcase_all", "New and notable", "#1E3B30");
BST_GENRES.forEach(function (gn) { bookcase("bstcase_" + gn[0], gn[1], gn[0] === "horror" ? "#2A1418" : gn[0] === "children" ? "#1E5AA8" : "#1E3B30"); });
wgPiece("bstkidscase", 2.0, 0.45, true, false, function () {
var g = new THREE.Group(), r = trM(0xE8322A, null, "shine"), y = trM(0xFFC21A, null, "shine"), b = trM(0x1E6AE0, null, "shine");
trB(g, 0.08, 1.3, 0.42, r, -0.96, 0.65, 0);
trB(g, 0.08, 1.3, 0.42, b, 0.96, 0.65, 0);
trB(g, 1.9, 1.3, 0.03, y, 0, 0.65, -0.2);
trB(g, 2.0, 0.08, 0.44, b, 0, 1.32, 0);
trB(g, 1.86, 0.05, 0.42, r, 0, 0.06, 0);
trB(g, 1.86, 0.04, 0.42, y, 0, 0.66, 0);
trB(g, 1.86, 0.05, 0.04, r, 0, 0.11, 0.19);
trB(g, 1.86, 0.05, 0.04, b, 0, 0.71, 0.19);
trS(g, 0.12, trM(0x3ACB4A, null, "shine"), -0.6, 1.48, 0);
trS(g, 0.1, trM(0xFF7AC8, null, "shine"), 0.6, 1.46, 0);
bstPlane(g, 1.62, 0.24, bstSignTex("Children's books", "#E8322A", "#FFF6D0"), 0, 1.58, 0.04, 0, true);
return trDone(g);
});
BST_SLOTS.bstkidscase = [[-0.6, 0.36, 0.05, -0.14, 0], [0, 0.36, 0.05, -0.14, 0], [0.6, 0.36, 0.05, -0.14, 0], [-0.6, 0.96, 0.05, -0.14, 0], [0, 0.96, 0.05, -0.14, 0], [0.6, 0.96, 0.05, -0.14, 0]];
wgPiece("bstfeature", 4.2, 0.4, true, true, function () {
var g = new THREE.Group(), gr = trM(0x1E3B30), w = oak();
trB(g, 4.2, 2.9, 0.12, gr, 0, 1.45, -0.14);
trB(g, 4.36, 0.16, 0.3, w, 0, 2.98, -0.06);
trB(g, 4.36, 0.5, 0.3, w, 0, 0.25, -0.06);
trB(g, 0.12, 2.9, 0.3, w, -2.12, 1.45, -0.06);
trB(g, 0.12, 2.9, 0.3, w, 2.12, 1.45, -0.06);
[0.95, 1.6, 2.25].forEach(function (y) { trB(g, 4.0, 0.03, 0.16, w, 0, y - 0.29, 0); trB(g, 4.0, 0.025, 0.025, brass(), 0, y - 0.2, 0.07); });
[-1.5, -0.5, 0.5, 1.5].forEach(function (x) { trC(g, 0.02, 0.02, 0.18, 6, brass(), x, 2.82, 0.02, Math.PI / 2); trB(g, 0.34, 0.05, 0.07, trM(0xFFE6B0, null, "glow"), x, 2.76, 0.11); });
bstPlane(g, 3.6, 0.4, bstSignTex("New from our dreamers", "#16291F"), 0, 3.32, -0.07, 0, true);
trB(g, 3.7, 0.48, 0.04, w, 0, 3.32, -0.1);
return trDone(g);
});
BST_SLOTS.bstfeature = [];
[0.95, 1.6, 2.25].forEach(function (y) { [-1.5, -0.5, 0.5, 1.5].forEach(function (x) { BST_SLOTS.bstfeature.push([x, y, 0.0, -0.1, 0]); }); });
function table(key) {
wgPiece(key, 2.0, 1.1, true, false, function () {
var g = new THREE.Group(), w = oak(), d = dark();
trB(g, 2.0, 0.06, 1.1, w, 0, 0.82, 0);
trB(g, 1.86, 0.1, 0.96, d, 0, 0.74, 0);
[[-0.88, -0.44], [0.88, -0.44], [-0.88, 0.44], [0.88, 0.44]].forEach(function (p) { trC(g, 0.04, 0.05, 0.72, 8, d, p[0], 0.36, p[1]); });
var cols = [0x6E2424, 0x23395A, 0x2F5238, 0x7A6226, 0x4A2A55, 0xD8CCB0];
[[0, -0.02], [-0.28, 0.02]].forEach(function (p, j) { var y = 0.85; for (var i = 0; i < 5; i++) {
var h = 0.035 + ((i + j) % 3) * 0.01;
trB(g, 0.26 - (i % 2) * 0.02, h, 0.36 - (i % 3) * 0.02, trM(cols[(i + j * 2) % cols.length]), p[0] + (i % 2 ? 0.01 : -0.01), y + h / 2, p[1]);
y += h;
} });
[[-0.62, 0.22, 0], [0.62, 0.22, 0], [-0.62, -0.22, Math.PI], [0.62, -0.22, Math.PI]].forEach(function (p) {
trB(g, 0.24, 0.02, 0.1, brass(), p[0], 0.86, p[1] + (p[2] ? -0.1 : 0.1));
});
return trDone(g);
});
BST_SLOTS[key] = [[-0.62, 1.02, 0.2, -0.95, 0], [0.62, 1.02, 0.2, -0.95, 0], [-0.62, 1.02, -0.2, -0.95, Math.PI], [0.62, 1.02, -0.2, -0.95, Math.PI]];
}
table("bsttable_all");
BST_GENRES.forEach(function (gn) { table("bsttable_" + gn[0]); });
wgPiece("bstcounter", 4.0, 0.8, true, true, function () {
var g = new THREE.Group(), w = oak(), d = dark();
trB(g, 4.0, 0.95, 0.7, w, 0, 0.475, 0);
trB(g, 4.1, 0.06, 0.82, trM(0x2A2420, null, "shine"), 0, 0.98, 0);
for (var x = -1.6; x <= 1.61; x += 0.8)
trB(g, 0.62, 0.6, 0.02, d, x, 0.5, 0.36);
trB(g, 0.5, 0.28, 0.4, brass(), -1.1, 1.15, -0.05);
trB(g, 0.46, 0.1, 0.18, trM(0x2A2A2A), -1.1, 1.33, 0.06);
trB(g, 0.3, 0.12, 0.3, brass(), -1.1, 1.38, -0.12);
trC(g, 0.02, 0.02, 0.4, 6, brass(), 1.3, 1.21, -0.1);
trC(g, 0.16, 0.12, 0.12, 12, trM(0x2F7A4A), 1.3, 1.42, -0.1);
trB(g, 0.18, 0.03, 0.08, trM(0xFFE6B0, null, "glow"), 1.3, 1.35, -0.1);
trB(g, 0.2, 0.18, 0.12, w, 0.5, 1.1, 0.18);
[0, 1, 2, 3].forEach(function (i) { trB(g, 0.035, 0.16, 0.01, trM([0xC03A2A, 0x2A6AC0, 0xE8B83A, 0x3A9A4A][i]), 0.43 + i * 0.045, 1.2, 0.23); });
[[0, 0], [0.28, 0.02]].forEach(function (p, j) { var y = 1.01; for (var i = 0; i < 4; i++) {
trB(g, 0.24, 0.045, 0.32, trM([0x6E2424, 0x23395A, 0x2F5238, 0x7A6226][(i + j) % 4]), p[0], y + 0.022, p[1] - 0.1);
y += 0.046;
} });
return trDone(g);
});
wgPiece("bstarmchair", 1.0, 1.0, true, false, function () {
var g = new THREE.Group(), c = trM(0x6A2A2A), wd = dark();
trB(g, 0.84, 0.22, 0.8, c, 0, 0.36, 0.04);
trB(g, 0.8, 0.14, 0.7, trM(0x7A3434), 0, 0.53, 0.08);
trB(g, 0.84, 0.78, 0.2, c, 0, 0.82, -0.32);
trC(g, 0.42, 0.42, 0.2, 14, c, 0, 1.2, -0.32, Math.PI / 2);
[-0.45, 0.45].forEach(function (x) { trB(g, 0.16, 0.36, 0.8, c, x, 0.56, 0.04); trC(g, 0.1, 0.1, 0.82, 10, c, x, 0.75, 0.04, Math.PI / 2); });
[[-0.36, -0.32], [0.36, -0.32], [-0.36, 0.38], [0.36, 0.38]].forEach(function (p) { trC(g, 0.03, 0.025, 0.25, 6, wd, p[0], 0.125, p[1]); });
return trDone(g);
});
wgPiece("bstlamp", 0.4, 0.4, false, false, function () {
var g = new THREE.Group();
trC(g, 0.16, 0.18, 0.03, 14, brass(), 0, 0.015, 0);
trC(g, 0.018, 0.018, 1.5, 8, brass(), 0, 0.77, 0);
trC(g, 0.17, 0.26, 0.3, 14, trM(0xF2E2B8), 0, 1.6, 0);
trC(g, 0.08, 0.08, 0.05, 10, trM(0xFFE6B0, null, "glow"), 0, 1.47, 0);
return trDone(g);
});
wgPiece("bstside", 0.6, 0.6, true, false, function () {
var g = new THREE.Group(), wd = oak();
trC(g, 0.28, 0.28, 0.04, 16, wd, 0, 0.6, 0);
trC(g, 0.04, 0.05, 0.58, 8, wd, 0, 0.3, 0);
trC(g, 0.18, 0.2, 0.03, 12, wd, 0, 0.015, 0);
trB(g, 0.22, 0.05, 0.3, trM(0x23395A), -0.05, 0.645, 0);
trB(g, 0.2, 0.04, 0.28, trM(0x7A6226), -0.04, 0.69, 0.01);
trC(g, 0.04, 0.035, 0.08, 10, trM(0xF2EEE6), 0.14, 0.66, 0.08);
return trDone(g);
});
wgPiece("bstladder", 0.6, 0.5, false, false, function () {
var g = new THREE.Group(), wd = oak(), lean = 0.32;
[-0.24, 0.24].forEach(function (x) { trB(g, 0.05, 2.9, 0.06, wd, x, 1.42, 0.12, lean, 0, 0); });
for (var i = 0; i < 8; i++) {
var y = 0.3 + i * 0.34;
trB(g, 0.48, 0.03, 0.08, wd, 0, y, 0.12 + Math.sin(lean) * (1.42 - y));
}
trC(g, 0.05, 0.05, 0.04, 10, brass(), -0.24, 0.05, 0.56, 0, 0, Math.PI / 2);
trC(g, 0.05, 0.05, 0.04, 10, brass(), 0.24, 0.05, 0.56, 0, 0, Math.PI / 2);
return trDone(g);
});
[["bstbean_r", 0xE8322A], ["bstbean_y", 0xFFC21A], ["bstbean_b", 0x1E6AE0], ["bstbean_g", 0x2EB84A]].forEach(function (b) {
wgPiece(b[0], 0.9, 0.9, false, false, function () {
var g = new THREE.Group(), m = trM(b[1], null, "shine");
trS(g, 0.45, m, 0, 0.3, 0, 1, 0.66, 1);
trS(g, 0.3, m, 0, 0.52, -0.2, 1, 0.8, 0.7);
return trDone(g);
});
});
wgPiece("bststage", 4.0, 2.2, true, true, function () {
var g = new THREE.Group(), wd = oak();
trB(g, 4.0, 0.3, 2.2, dark(), 0, 0.15, 0);
trB(g, 4.0, 0.04, 2.2, trM(0x6E1A20), 0, 0.32, 0);
trB(g, 3.8, 2.4, 0.06, trM(0x16291F), 0, 1.6, -1.06);
trB(g, 3.9, 0.12, 0.12, brass(), 0, 2.85, -1.02);
bstPlane(g, 3.2, 0.45, bstSignTex("Author corner", "#16291F"), 0, 2.45, -1.02, 0, true);
trB(g, 0.6, 1.1, 0.45, wd, 0.7, 0.88, 0.1);
trB(g, 0.66, 0.06, 0.52, wd, 0.7, 1.45, 0.08, -0.25, 0, 0);
trC(g, 0.012, 0.012, 1.3, 6, trM(0x2A2A2A), -0.4, 0.97, 0.4);
trS(g, 0.045, trM(0x2A2A2A, null, "shine"), -0.4, 1.66, 0.4);
trC(g, 0.15, 0.15, 0.03, 12, trM(0x2A2A2A), -0.4, 0.34, 0.4);
var cc = trM(0x6A2A2A);
trB(g, 0.74, 0.2, 0.7, cc, -1.3, 0.52, -0.26);
trB(g, 0.7, 0.12, 0.6, trM(0x7A3434), -1.3, 0.67, -0.22);
trB(g, 0.74, 0.7, 0.18, cc, -1.3, 0.95, -0.55);
trC(g, 0.37, 0.37, 0.18, 14, cc, -1.3, 1.3, -0.55, Math.PI / 2);
[-1.69, -0.91].forEach(function (x) { trC(g, 0.09, 0.09, 0.72, 10, cc, x, 0.82, -0.26, Math.PI / 2); trB(g, 0.14, 0.3, 0.7, cc, x, 0.66, -0.26); });
return trDone(g);
});
wgPiece("bstsigning", 2.2, 1.4, true, false, function () {
var g = new THREE.Group(), wd = oak();
trB(g, 1.8, 0.05, 0.8, wd, 0, 0.76, 0);
trB(g, 1.84, 0.6, 0.84, trM(0x1E5A3A), 0, 0.47, 0);
[[-0.5, 0], [0.5, 0]].forEach(function (p) { var y = 0.8; for (var i = 0; i < 4; i++) {
trB(g, 0.24, 0.04, 0.34, trM(0x6E2424), p[0], y + 0.02, p[1]);
y += 0.042;
} });
trC(g, 0.04, 0.05, 0.08, 8, brass(), 0, 0.83, -0.1);
trC(g, 0.008, 0.008, 0.18, 6, trM(0x1A1A1A), 0.02, 0.92, -0.1, 0.3, 0, 0);
[-0.25, 0.25].forEach(function (x) { trB(g, 0.04, 1.7, 0.04, wd, 1.05 + x * 0.4, 0.85, -0.4 + (x > 0 ? 0 : 0.08), x > 0 ? -0.15 : 0.15, 0, 0); });
trB(g, 0.62, 0.9, 0.03, trM(0xF2EAD6), 1.05, 1.25, -0.36);
return trDone(g);
});
BST_SLOTS.bstsigning = [[1.05, 1.27, -0.33, -0.05, 0]];
wgPiece("bsthowto", 1.4, 0.2, false, true, function () {
var g = new THREE.Group(), wd = oak();
trB(g, 1.3, 1.6, 0.06, wd, 0, 1.6, 0);
bstPlane(g, 1.2, 1.5, bstCanvas(256, 320, function (x, w, h) {
x.fillStyle = "#F2EAD6";
x.fillRect(0, 0, w, h);
x.strokeStyle = "#1E3B30";
x.lineWidth = 6;
x.strokeRect(6, 6, w - 12, h - 12);
x.fillStyle = "#1E3B30";
x.textAlign = "center";
x.font = "bold 22px Georgia,serif";
x.fillText("Your book", w / 2, 44);
x.fillText("on our shelves", w / 2, 72);
x.font = "16px Georgia,serif";
x.fillStyle = "#3A2A1A";
["Wrote a book? Put it here.", "", "Menu  ›  📚 Book Store", "›  My books  ›  Add a book", "", "Its cover, its story, and", "a link to where it is sold.", "Readers buy it there."].forEach(function (t, i) { x.fillText(t, w / 2, 112 + i * 24); });
}), 0, 1.6, 0.035, 0, true);
return trDone(g);
});
})();
if (typeof wgRoom === "function") {
wgRoom("bstgenre", "Books", 10, function (R) {
var w = R.w, d = R.d, g = bstGenreOfLabel(R.label), cs = "bstcase_" + g, tb = "bsttable_" + g;
if (!FURN[cs]) {
cs = "bstcase_all";
tb = "bsttable_all";
}
for (var v = -d / 2 + 1.15; v < d / 2 - 1.1; v += 2.1)
R.wallOut(cs, v);
for (var u = 2.4; u < w - 1.5; u += 2.1)
R.wallS(cs, u);
for (var u2 = 3.4; u2 < w - 1.5; u2 += 2.1)
R.wallN(cs, u2);
R.put("rug", w * 0.55, 0.2, 0);
R.put(tb, w * 0.55, 0, "n");
R.put("bstarmchair", 1.5, -d / 2 + 1.4, "out");
R.put("bstlamp", 0.9, -d / 2 + 0.6, 0);
R.put("bstside", 2.3, -d / 2 + 0.7, 0);
R.put("bstladder", w - 0.85, -d / 2 + 2.2, "in");
R.spot(1.6, 0.8);
}, { public: true });
wgRoom("bstnook", "Reading room", 9, function (R) {
var w = R.w, d = R.d;
R.put("fireplace", w - 0.4, 0, "in");
R.put("rug", w - 2.6, 0, 0);
R.put("bstarmchair", w - 2.2, -1.5, "n");
R.put("bstarmchair", w - 2.2, 1.5, "s");
R.put("bstside", w - 2.2, 0, 0);
R.put("bstarmchair", 2.4, -d / 2 + 1.3, "n");
R.put("bstlamp", 1.6, -d / 2 + 0.6, 0);
R.put("bstside", 3.3, -d / 2 + 0.7, 0);
R.put("bstarmchair", 2.4, d / 2 - 1.3, "s");
R.put("bstlamp", 3.3, d / 2 - 0.6, 0);
for (var u = 4.6; u < w - 1.5; u += 2.1) {
R.wallS("bstcase_all", u);
R.wallN("bstcase_all", u);
}
R.put("sofa", w * 0.5, 0.9, "in");
R.spot(1.6, 0.4);
R.spot(w - 3.4, 0.2);
}, { public: true });
wgRoom("bstauthor", "Author corner", 12, function (R) {
var w = R.w, d = R.d;
R.put("bststage", w - 1.2, 0, "in");
for (var u = 2.4; u < w - 3.6; u += 1.3)
for (var v = -2.6; v <= 2.61; v += 0.9) {
if (Math.abs(v) < 0.5)
continue;
R.put("chair", u, v, "out");
}
R.put("bstsigning", 2.2, -d / 2 + 1.0, "n");
R.put("chair", 2.2, -d / 2 + 0.35, "n");
R.put("bstfeature", w * 0.55, d / 2 - 0.25, "s");
R.staff("Events host", w - 2.3, 1.8, "out");
R.spot(1.6, 1.2);
R.spot(w * 0.5, -d / 2 + 1.6, "the signing table");
}, { public: true });
wgRoom("bstkids", "Children's books", 11, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.15; v < d / 2 - 1.1; v += 2.1)
R.wallOut("bstkidscase", v);
for (var u = 2.4; u < w - 1.5; u += 2.1) {
R.wallS("bstkidscase", u);
}
for (var u2 = 3.4; u2 < w - 1.5; u2 += 2.1) {
R.wallN("bstkidscase", u2);
}
R.put("rug", w * 0.5, 0, 0);
R.put("rug", w * 0.5, 1.6, 0);
["bstbean_r", "bstbean_y", "bstbean_b", "bstbean_g", "bstbean_r", "bstbean_b"].forEach(function (k, i) { var a = i / 6 * Math.PI * 2; R.put(k, w * 0.5 + Math.cos(a) * 2.0, 0.8 + Math.sin(a) * 1.7, 0); });
R.put("bstarmchair", w * 0.5, -1.6, "s");
R.put("toys", 2.0, d / 2 - 1.2, 0);
R.staff("Children's bookseller", 1.6, -d / 2 + 1.4, "out");
R.spot(1.6, 0.8);
}, { public: true });
}
if (typeof wgPlace === "function") {
var bstG = function (id) { return "bstgenre:" + bstGenreName(id); };
wgPlace(BST_KEY, { floors: 3, w: 28, front: 22, floor: "wood", wall: 0xE8DCC4,
trade: "Bookseller", clerk: "Bookseller", head: "Store manager", secure: false, openAll: true,
wingName: "The books · every kind, on three floors",
names: ["Ground floor · The shop, and the stories", "First floor · Knowing, and the reading rooms", "Second floor · The author corner and the children's room"],
ground: { L: [bstG("fiction"), bstG("mystery"), bstG("romance"), bstG("ya")],
R: [bstG("fantasy"), bstG("scifi"), bstG("horror"), "store:Stockroom"] },
up: [{ L: [bstG("nonfiction"), bstG("history"), bstG("memoir"), "bstnook:Reading room"],
R: [bstG("dreams"), bstG("spirit"), bstG("selfhelp"), bstG("poetry"), "bstnook:Fireside nook"] },
{ L: ["bstauthor", "bstomt", "bstkids", bstG("comics")],
R: [bstG("cookery"), bstG("art"), bstG("business"), bstG("other")] }],
fillers: ["bstnook:Reading corner", "bstgenre:New and notable"] });
}
if (typeof WG_FRONT !== "undefined")
WG_FRONT[BST_KEY] = function (K) { return __ZC(359, 2, this, arguments, new.target); };
var BST = { books: null, at: 0, loading: null, open: true, sites: [], own: true, may: null, why: "", missing: false, cov: {}, covAsk: {}, mat: {}, dressAt: 0, count: {}, warned: false,
el: null, view: null, mine: null, draft: null, busy: false };
function bstMissing(e) { return /does not exist|not find the function|PGRST202|404|schema cache/i.test(String((e && e.message) || e || "")); }
function bstErr(e) { return __ZC(359, 3, this, arguments, new.target); }
function bstSigned() { return typeof signedIn === "function" && signedIn(); }
function bstRpc(name, args, read) { return __ZC(359, 4, this, arguments, new.target); }
function bstLoad(force) { return __ZC(359, 5, this, arguments, new.target); }
function bstShown() { return (BST.books || []).filter(function (b) { return b.status === "approved"; }); }
function bstById(id) { var L = BST.books || []; for (var i = 0; i < L.length; i++)
if (L[i].id === id)
return L[i]; return null; }
function bstCovers(ids) { return __ZC(359, 6, this, arguments, new.target); }
function bstColour(id) { var c = ["#6E2424", "#23395A", "#2F5238", "#7A6226", "#4A2A55", "#8A5A30", "#1F3F4F", "#9A3A2A", "#2E5A5A"]; return c[Math.abs(+id || 0) % c.length]; }
function bstWrap(x, text, max, lh, y, maxLines) { return __ZC(359, 7, this, arguments, new.target); }
function bstPrinted(b, w, h) { return __ZC(359, 8, this, arguments, new.target); }
function bstThumb(b) { return BST.cov[b.id] || (b._thumb || (b._thumb = bstPrinted(b, 120, 180).toDataURL("image/jpeg", 0.8))); }
function bstTex(b) { return __ZC(359, 9, this, arguments, new.target); }
function bstMat(b) {
var M = BST.mat[b.id], real = !!BST.cov[b.id];
if (M && M.real === real)
return M.m;
if (M) {
if (M.m.map)
M.m.map.dispose();
M.m.map = bstTex(b);
M.m.needsUpdate = true;
M.real = real;
return M.m;
}
var m = new THREE.MeshLambertMaterial({ map: bstTex(b) });
BST.mat[b.id] = { m: m, real: real };
return m;
}
var BST_GEO = null, BST_BACK = null;
function bstBookMesh(b) { return __ZC(359, 10, this, arguments, new.target); }
function bstPoolOf(k) {
if (k === "bstkidscase")
return "children";
var m = /^bst(?:case|table)_(.+)$/.exec(k);
if (m)
return m[1];
return "all";
}
function bstDress(force) { return __ZC(359, 11, this, arguments, new.target); }
function bstRefresh() { Object.keys(BST.mat).forEach(function (id) { var b = bstById(+id); if (b)
bstMat(b); }); }
function bstAuthorOfWeek() {
var L = bstShown();
if (!L.length)
return null;
var wk = Math.floor(Date.now() / (7 * 86400000));
return L[wk % L.length];
}
function bstUndress() {
Object.keys(BST.mat).forEach(function (id) { var M = BST.mat[id]; if (M.m.map)
M.m.map.dispose(); M.m.dispose(); });
BST.mat = {};
}
function bstNear() { return __ZC(359, 12, this, arguments, new.target); }
function bstSay(n) { return __ZC(359, 13, this, arguments, new.target); }
function bstDo(n) { return __ZC(359, 14, this, arguments, new.target); }
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
try {
if (bstInside() && !(typeof WLD !== "undefined" && WLD && WLD.on) && typeof tsPrompt === "function") {
var n = bstNear();
if (n) {
var s = bstSay(n);
tsPrompt(s, function () { bstDo(n); });
}
else
tsPrompt(null);
return;
}
}
catch (e) {
if (window.console && !BST.warned) {
BST.warned = true;
console.warn("book store:", e);
}
}
return tt.apply(this, arguments);
};
})();
(function () {
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
var r = eb.apply(this, arguments);
try {
if (bstInside()) {
setStatus("<b>Inside the Dreamers' Book Store.</b> Every book here was written by a dreamer. Walk up to a shelf and <b>press E</b> to look through it; the bookseller is at the counter on your right.");
bstLoad(false).then(function () { bstDress(true); });
}
}
catch (e) {
if (window.console)
console.warn("book store:", e);
}
return r;
};
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function () { var was = bstInside(); var r = ex.apply(this, arguments); if (was) {
try {
bstUndress();
bstClose();
}
catch (e) { }
} return r; };
}
if (typeof interiorTick === "function") {
var it = interiorTick;
interiorTick = function (dt) {
var r = it.apply(this, arguments);
try {
if (bstInside() && BST.books && Date.now() - BST.dressAt > 1500)
bstDress(false);
}
catch (e) { }
return r;
};
}
})();
function bstEl() { return __ZC(359, 15, this, arguments, new.target); }
function bstClose() { if (BST.el)
BST.el.style.display = "none"; BST.view = null; }
function bstShow(title, html, back) { return __ZC(359, 16, this, arguments, new.target); }
function bstTabs(on) { return __ZC(359, 17, this, arguments, new.target); }
function bstCard(b) { return __ZC(359, 18, this, arguments, new.target); }
function bstGrid(list) { return __ZC(359, 19, this, arguments, new.target); }
function bstMenu(view, arg, quiet) { return __ZC(359, 20, this, arguments, new.target); }
function bstBrowse(g, quiet) { return __ZC(359, 21, this, arguments, new.target); }
function bstHostName(h) { return String(h || "").replace(/^www\./, ""); }
function bstBookView(id) { return __ZC(359, 22, this, arguments, new.target); }
function bstLeave(id) { return __ZC(359, 23, this, arguments, new.target); }
function bstStatusWords(b) {
if (b.status === "approved")
return "On the shelves.";
if (b.status === "pending")
return "Waiting for the Keeper to look at it. It goes on the shelves once it is approved.";
return "Taken down" + (b.note ? ": " + b.note : ".");
}
function bstMine() { return __ZC(359, 24, this, arguments, new.target); }
function bstWhere() { return __ZC(359, 25, this, arguments, new.target); }
function bstGo() {
var s = bstPlace();
if (!s)
return;
bstClose();
if (typeof walkMode !== "undefined" && !walkMode && typeof setWalk === "function")
setWalk(true);
if (typeof enterBuilding === "function")
enterBuilding(s);
}
function bstEditor(id) { return __ZC(359, 26, this, arguments, new.target); }
function bstNote(t) { var m = document.getElementById("bst-msg"); if (m)
m.textContent = t || ""; }
function bstShrink(file) { return __ZC(359, 27, this, arguments, new.target); }
var BST_SHORT = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "rebrand.ly", "cutt.ly", "shorturl.at", "tiny.cc", "rb.gy", "s.id", "lnkd.in"];
function bstUrlCheck(v) { return __ZC(359, 28, this, arguments, new.target); }
function bstSave() { return __ZC(359, 29, this, arguments, new.target); }
function bstDelete(id) { return __ZC(359, 30, this, arguments, new.target); }
function bstClick(e) { return __ZC(359, 31, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-books"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-books";
b.title = "The Dreamers' Book Store";
b.textContent = "📚 Book Store";
b.onclick = function () { bstMenu("browse"); };
bar.appendChild(b);
}
if (typeof PS_SECTIONS !== "undefined")
try {
PS_SECTIONS.filter(function (s) { return s.k === "shop"; })[0].ids.push("me-books");
}
catch (e) { }
if (typeof document !== "undefined")
setTimeout(hook, 1700);
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var mine = (BST.books || []).filter(function (b) { return b.mine; });
if (mine.length) {
h += bkpHead("In the Dreamers' Book Store");
mine.forEach(function (b) { h += bkpRow("📚 " + esc(b.title), esc(b.status === "approved" ? "on the shelves" : b.status === "pending" ? "waiting for the Keeper" : "taken down")); });
}
}
catch (e) { }
return h;
};
})();
(function () {
if (typeof location === "undefined" || !/[?&]kbooks=1\b/.test(location.search))
return;
var tries = 0;
(function wait() { if (++tries > 90)
return; if (bstPlace() && typeof enterBuilding === "function" && !(typeof store !== "undefined" && store.inside)) {
try {
bstGo();
}
catch (e) { }
return;
} setTimeout(wait, 1000); })();
})();
var BST_OMT = [
["The Obsidian Chalice, Volume 1", "Sebastian Nightwell", "Ritual Texts", "☾", "https://static.wixstatic.com/media/d6c75e_5e3ed9d9d7654bc3872f14b43154aa53~mv2.jpg", "A multi-faith collection of adult Pagan rites spanning the Left-Hand Path, Asatru, and beyond.", "$29.99", "$9.99", "https://www.amazon.com/dp/B0CXTB919Z"],
["The Obsidian Hymnal", "Sebastian Nightwell", "Ritual Texts", "✦", "https://static.wixstatic.com/media/d6c75e_b32858c3c9394863863ec1099ad3a141~mv2.jpg", "A hymnal and prayer book of chants, invocations, and devotions for the Left Hand Path.", "$19.99", "$6.99", "https://www.amazon.com/dp/B0CSYKT49K"],
["The Topaz Grimoire, Vol. 1: Secrets of the Dawn", "Sebastian Nightwell", "Ritual Texts", "🜂", "https://static.wixstatic.com/media/d6c75e_6bbab609918d4214b7af2ec2a001306f~mv2.jpg", "Invocations and hymns for the primordial Titans of Greek myth.", "$49.99", "$9.99", "https://www.amazon.com/dp/B0CW1CW9ZW"],
["The Topaz Grimoire, Vol. 2: Olympian Whispers", "Sebastian Nightwell", "Ritual Texts", "🜁", "https://static.wixstatic.com/media/d6c75e_eac5aa4a5cbb4d9ea080882fcbe99ff1~mv2.jpg", "Invocations and rites for the twelve Olympian gods and goddesses.", "$39.99", "$9.99", "https://www.amazon.com/dp/B0CZ1D99F5"],
["Through the Black Looking Glass", "Sebastian Nightwell", "Ritual Texts", "◑", "https://static.wixstatic.com/media/d6c75e_8fa7f8fe68604089a258f628183ff4e9~mv2.jpg", "An introductory guide to shadow work and the ethics of black magic.", "$32.85", "$9.99", "https://www.amazon.com/dp/B0D1YT8HZS"],
["The Black Looking Glass", "Sebastian Nightwell", "Ritual Texts", "◐", "https://static.wixstatic.com/media/d6c75e_09293510950242b68ef150731f8749da~mv2.jpg", "A companion volume exploring the deeper mysteries of shadow and spell.", "$27.50", "$9.99", "https://www.amazon.com/gp/product/B0D2JMMN79"],
["The Rune Reader's Handbook", "Sebastian & Lucius Nightwell", "Ritual Texts", "ᚠ", "https://static.wixstatic.com/media/d6c75e_42898008ee5d4c28a0e5fd63b9b34d0b~mv2.jpg", "A guide to casting, reading, and crafting with the Elder Futhark runes.", "$39.99", "$9.99", "https://www.amazon.com/dp/B0CYP7C3MC"],
["The Enchanter's Lexicon", "Sebastian & Lucius Nightwell", "Curriculum", "⚝", "https://static.wixstatic.com/media/d6c75e_a7972b4f7d524013b8c1ec99bd15b832~mv2.jpg", "A foundational glossary of magical terms and practice.", "$39.99", "$9.99", "https://www.amazon.com/dp/B0D1287CWV"],
["The Crystal Compendium", "Sebastian & Lucius Nightwell", "Curriculum", "◈", "https://static.wixstatic.com/media/d6c75e_f82c11d7ef4542b38dd8159e9ff526d4~mv2.jpg", "Properties, correspondences, and workings of crystal magic.", "$42.37", "$9.99", "https://www.amazon.com/dp/B0D1PKF6G4"],
["Beyond Shadows and Light", "Sebastian Nightwell", "Curriculum", "☽", "https://static.wixstatic.com/media/d6c75e_5ac4615d8b7446c5aa8c75a3a2c89eb5~mv2.jpg", "An exploration of the ethical use of magic.", "$19.99", "$9.99", "https://www.amazon.com/dp/B0CW1J2VXN"],
["Tales and Scales", "Sebastian Nightwell", "Curriculum", "✵", "https://static.wixstatic.com/media/d6c75e_5b0045af3f534abb907f9b3357cc9ee8~mv2.jpg", "A bestiary unveiling the world's magical creatures.", "$37.50", "$9.99", "https://www.amazon.com/dp/B0D4K11XNC"],
["The Green Codex", "Sebastian Nightwell", "Curriculum", "❧", "https://static.wixstatic.com/media/d6c75e_c9031ac1471449698e45ac897a6c23a2~mv2.jpg", "A beginner's guide to herbal remedies, tinctures, and plant-based magic.", "$29.99", "$9.99", "https://www.amazon.com/dp/B0D1F679G5"],
["Illuminating the Path", "Sebastian & Lucius Nightwell", "Curriculum", "🕯", "https://static.wixstatic.com/media/d6c75e_19dc6237156b47c1834f28f305a43b0f~mv2.jpg", "A grimoire of candle magic and flame-based ritual work.", "$29.99", "$9.99", "https://www.amazon.com/dp/B0D18K7LBG"],
["Awaken the Flow", "Sebastian Nightwell", "Curriculum", "〰", "https://static.wixstatic.com/media/d6c75e_1665f5c77f1f4a619d76b0c0de4088bd~mv2.jpg", "A beginner's introduction to energy work and subtle-body practice.", "$24.99", "$9.99", "https://www.amazon.com/dp/B0CZTR3QF7"],
["The Spellbound Thread", "Sebastian Nightwell", "Curriculum", "🧵", "https://static.wixstatic.com/media/d6c75e_1266a993e29e4ae5b3133e3f260fb7ab~mv2.jpg", "A history of magic's influence on art, science, and culture through the ages.", "$26.99", "$9.99", "https://www.amazon.com/dp/B0CZNWMC4F"],
["Secrets of the Silver Sphere", "Sebastian Nightwell", "Curriculum", "☾", "https://static.wixstatic.com/media/d6c75e_9562612b09714732aa5b25646f3389fb~mv2.jpg", "A guide to moon magic, lunar ritual, and nighttime practice.", "$20.99", "$9.99", "https://www.amazon.com/dp/B0CZMS2TDL"],
["Brewing Magic", "Sebastian Nightwell", "Curriculum", "⚗", "https://static.wixstatic.com/media/d6c75e_ee34dbaadedc47e39aac392e317d3b56~mv2.jpg", "The art and science of potion-making, from tinctures to elixirs.", "$29.99", "$9.99", "https://www.amazon.com/dp/B0D12D4NZC"],
["The Magic Within Your Hands", "Sebastian & Lucius Nightwell", "Curriculum", "✋", "https://static.wixstatic.com/media/d6c75e_028fc221dfa4489b89c3d0bc3284dfbb~mv2.jpg", "A guide to crafting and consecrating your own magical tools.", "$24.99", "$9.99", "https://www.amazon.com/dp/B0CZNX5FS5"],
["Obsidian Veil University Enrollment Brochure", "Sebastian Nightwell", "Curriculum", "🎓", "https://static.wixstatic.com/media/d6c75e_b503bb5bf8c04da4950a24eced5672f8~mv2.jpg", "An introduction to the Temple's curriculum and course of study.", "N/A", "$0.99", "https://www.amazon.com/dp/B0CZJV3WBY"],
["Winter's Heart", "Sebastian Nightwell", "Fiction", "❄", "https://static.wixstatic.com/media/d6c75e_b850003ea0e64d22bae95dddb3c661f1~mv2.jpg", "A Snow Queen tale — two cursed immortals, a shattered mirror, and a bond that won't stay broken.", "$23.50", "$9.99", "https://www.amazon.com/dp/B0GB6VRZHR"],
["Heart of the Drakkyn", "Sebastian Nightwell & Thaddeus Johnson", "Fiction", "🐉", "https://static.wixstatic.com/media/d6c75e_dffc6cd63b4746638b16d69bf3def5cf~mv2.jpg", "Book one of the Drakkyn Saga — a dragon-blooded outcast crosses into a realm at war.", "$29.99", "$9.99", "https://www.amazon.com/dp/B0FWD1KZ2J"],
["Temple Time Adventures, Vol. 1", "Sebastian Nightwell", "Family", "⭐", "https://static.wixstatic.com/media/d6c75e_030bb8b7110b47cf8432891fe7c0803c~mv2.jpg", "Where Faith and Fun Collide — a family-friendly title from the Temple.", "$39.99", "$9.99", "https://www.amazon.com/Temple-Time-Adventures-Where-Collide/dp/B0CXF5K73S"]
];
var BST_OMT_KINDS = [["Ritual Texts", "Ritual texts", "☾"], ["Curriculum", "The temple's curriculum", "✦"], ["Fiction", "Fiction", "❦"], ["Family", "For the family", "✿"]];
var BST_OMT_MAIL = "obsidianmoontemple@gmail.com";
var BST_OMT_TEX = {};
function bstOmtCover(i) { return __ZC(359, 32, this, arguments, new.target); }
(function () {
if (typeof wgPiece !== "function" || typeof trB !== "function")
return;
var ebony = function () { return trM(0x141016, "wood"); }, gold = function () { return trM(0xC9A050, null, "shine"); };
BST_OMT_KINDS.forEach(function (K, ki) {
wgPiece("bstomtcase_" + ki, 2.0, 0.5, true, false, function () {
var g = new THREE.Group(), e = ebony(), au = gold(), list = [];
BST_OMT.forEach(function (b, i) { if (b[2] === K[0])
list.push(i); });
trB(g, 0.07, 2.6, 0.48, e, -0.97, 1.3, 0);
trB(g, 0.07, 2.6, 0.48, e, 0.97, 1.3, 0);
trB(g, 1.9, 2.6, 0.03, trM(0x2A1A3A), 0, 1.3, -0.225);
trB(g, 2.04, 0.14, 0.5, e, 0, 0.07, 0.01);
trB(g, 2.12, 0.1, 0.56, e, 0, 2.64, 0.02);
[0.14, 0.94, 1.74].forEach(function (y, r) {
trB(g, 1.88, 0.035, 0.44, e, 0, y, 0);
trB(g, 1.88, 0.02, 0.02, au, 0, y + 0.02, 0.22);
list.slice(r * 4, r * 4 + 4).forEach(function (bi, j, arr) {
var n = arr.length, x0 = -(n - 1) * 0.22;
var m = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.5), bstOmtCover(bi));
m.position.set(x0 + j * 0.44, y + 0.3, 0.02);
m.rotation.x = -0.1;
g.add(m);
trB(g, 0.34, 0.5, 0.03, trM(0x0E0A14), x0 + j * 0.44, y + 0.3, 0.0, -0.1, 0, 0);
});
});
trB(g, 1.7, 0.3, 0.04, au, 0, 2.86, 0.08);
bstPlane(g, 1.62, 0.24, bstSignTex(K[2] + " " + K[1], "#120A1C", "#E8C878"), 0, 2.86, 0.105, 0, true);
return trDone(g);
});
});
wgPiece("bstomtdesk", 2.0, 0.8, true, false, function () {
var g = new THREE.Group(), e = ebony(), au = gold();
trB(g, 2.0, 0.95, 0.7, e, 0, 0.48, 0);
trB(g, 2.1, 0.06, 0.8, au, 0, 0.98, 0);
[-0.75, 0.75].forEach(function (x) { trC(g, 0.05, 0.05, 0.24, 10, trM(0xF2E8D0), x, 1.13, -0.15); trB(g, 0.04, 0.07, 0.04, trM(0xFFD27A, null, "glow"), x, 1.29, -0.15); });
trB(g, 0.9, 0.5, 0.04, e, 0, 1.3, -0.3);
bstPlane(g, 0.84, 0.44, bstSignTex("☾ The Temple's bookseller", "#120A1C", "#E8C878"), 0, 1.3, -0.275, 0, true);
return trDone(g);
});
})();
if (typeof wgRoom === "function")
wgRoom("bstomt", "The Obsidian Moon alcove", 9, function (R) {
var w = R.w, d = R.d;
R.wallN("bstomtcase_0", w * 0.32);
R.wallN("bstomtcase_1", w * 0.68);
R.wallS("bstomtcase_2", w * 0.32);
R.wallS("bstomtcase_3", w * 0.68);
R.put("rug", w * 0.5, 0, 0);
R.put("bstomtdesk", w - 1.3, 0, "in");
R.staff("Temple bookseller", w - 1.3, 1.6, "out");
R.put("bstarmchair", 1.6, 0, "in");
R.put("bstlamp", 1.0, -0.9, 0);
R.spot(2.6, 0.6);
}, { public: true });
function bstOmtKind(k) { var m = /^bstomtcase_(\d)$/.exec(k); return m ? BST_OMT_KINDS[+m[1]] : null; }
function bstOmtSay(k) {
var K = bstOmtKind(k);
if (K)
return "<b>The Temple of the Obsidian Moon</b> · " + esc(K[1]) + " · <b>press E</b> (or tap here) to look through them";
return "<b>The Temple's bookseller</b> · <b>press E</b> (or tap here) for every book of the Obsidian Moon";
}
function bstOmtDo(k) { var K = bstOmtKind(k); bstOmt("omtshelf", K ? K[0] : ""); }
function bstOmt(v, arg) {
if (v === "omtshelf")
return bstOmtShelf(arg);
if (v === "omtbook")
return bstOmtBook(+arg);
if (v === "omtleave")
return bstOmtLeave(+arg);
if (v === "omtsign")
return bstOmtSign(+arg);
}
function bstOmtShelf(kind) { return __ZC(359, 33, this, arguments, new.target); }
function bstOmtCoverHtml(i) { return __ZC(359, 34, this, arguments, new.target); }
function bstOmtBook(i) { return __ZC(359, 35, this, arguments, new.target); }
function bstOmtLeave(i) { return __ZC(359, 36, this, arguments, new.target); }
function bstOmtSign(i) { return __ZC(359, 37, this, arguments, new.target); }
