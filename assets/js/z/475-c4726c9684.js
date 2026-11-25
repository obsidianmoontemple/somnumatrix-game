/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(475, function () {
"use strict";
return [
function () {
if (!LGL_M4) {
LGL_M4 = new THREE.Matrix4();
LGL_Q = new THREE.Quaternion();
LGL_E = new THREE.Euler();
LGL_V = new THREE.Vector3();
LGL_S = new THREE.Vector3();
LGL_COL = new THREE.Color();
}
var B = { g: [], base: null };
B.at = function (x, y, z, ry, s) { if (x === undefined) {
B.base = null;
return B;
} B.base = new THREE.Matrix4().compose(new THREE.Vector3(x, y || 0, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry || 0, 0)), new THREE.Vector3(s || 1, s || 1, s || 1)); return B; };
B.sub = function (x, y, z, ry, s, fn) { var keep = B.base; B.at(x, y, z, ry, s); if (keep)
B.base.premultiply(keep); fn(); B.base = keep; return B; };
B.add = function (geo, col, x, y, z, rx, ry, rz, sx, sy, sz) {
var q = geo.index ? geo.toNonIndexed() : geo;
if (q !== geo)
geo.dispose();
if (sy === undefined)
sy = sx;
if (sz === undefined)
sz = sx;
LGL_E.set(rx || 0, ry || 0, rz || 0);
LGL_M4.compose(LGL_V.set(x || 0, y || 0, z || 0), LGL_Q.setFromEuler(LGL_E), LGL_S.set(sx || 1, sy || 1, sz || 1));
q.applyMatrix4(LGL_M4);
if (B.base)
q.applyMatrix4(B.base);
var n = q.attributes.position.count, c = new Float32Array(n * 3);
LGL_COL.set(col);
for (var i = 0; i < n; i++) {
c[i * 3] = LGL_COL.r;
c[i * 3 + 1] = LGL_COL.g;
c[i * 3 + 2] = LGL_COL.b;
}
q.setAttribute("color", new THREE.BufferAttribute(c, 3));
B.g.push(q);
return B;
};
B.box = function (w, h, d, col, x, y, z, ry, rx, rz) { return B.add(new THREE.BoxGeometry(w, h, d), col, x, y, z, rx, ry, rz); };
B.cyl = function (rt, rb, h, col, x, y, z, seg, rx, rz, ry) { return B.add(new THREE.CylinderGeometry(rt, rb, h, seg || 10), col, x, y, z, rx, ry, rz); };
B.cone = function (r, h, col, x, y, z, seg, rx, rz) { return B.add(new THREE.ConeGeometry(r, h, seg || 8), col, x, y, z, rx, 0, rz); };
B.sph = function (r, col, x, y, z, sx, sy, sz, seg) { return B.add(new THREE.SphereGeometry(r, seg || 12, Math.max(6, Math.round((seg || 12) * 0.7))), col, x, y, z, 0, 0, 0, sx, sy, sz); };
B.blob = function (r, col, x, y, z, sx, sy, sz) { return B.add(new THREE.IcosahedronGeometry(r, 1), col, x, y, z, 0, (x * 7 + z * 3) % 6, 0, sx, sy, sz); };
B.tor = function (R, t, col, x, y, z, rx, ry, arc, rz) { return B.add(new THREE.TorusGeometry(R, t, 6, 18, arc || Math.PI * 2), col, x, y, z, rx, ry, rz); };
B.lathe = function (pts, col, x, y, z, seg, s, sy) { var P = pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }); return B.add(new THREE.LatheGeometry(P, seg || 14), col, x, y, z, 0, 0, 0, s || 1, sy || s || 1, s || 1); };
B.mesh = function (o) {
o = o || {};
var n = 0;
B.g.forEach(function (q) { n += q.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3), k = 0;
B.g.forEach(function (q) { if (!q.attributes.normal)
q.computeVertexNormals(); pos.set(q.attributes.position.array, k * 3); nor.set(q.attributes.normal.array, k * 3); col.set(q.attributes.color.array, k * 3); k += q.attributes.position.count; q.dispose(); });
B.g = [];
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("color", new THREE.BufferAttribute(col, 3));
G.computeBoundingSphere();
var mt = o.shine ? new THREE.MeshPhongMaterial({ vertexColors: true, shininess: o.shine, specular: o.spec || 0x666666 }) : o.glow ? new THREE.MeshBasicMaterial({ vertexColors: true }) : new THREE.MeshLambertMaterial({ vertexColors: true });
if (o.op !== undefined) {
mt.transparent = true;
mt.opacity = o.op;
mt.depthWrite = false;
}
if (o.e !== undefined && mt.emissive) {
mt.emissive = new THREE.Color(o.e);
mt.emissiveIntensity = o.ei || 0.4;
}
if (o.ds)
mt.side = THREE.DoubleSide;
var m = new THREE.Mesh(G, mt);
m.receiveShadow = !o.op;
m.castShadow = false;
return m;
};
return B;
},
function (name, x, z, who, greet, extra, r) {
if (typeof LD === "undefined" || typeof ldWho !== "function")
return;
LD.talkers.push({ x: x, z: z, r: r || 3.4, name: name, t: ldWho(name, "Looking-Glass Land (the Mirror World)", who + ", exactly as in Lewis Carroll's Through the Looking-Glass (1871)", greet, (extra || "") + " The dreamer has stepped through the looking-glass and is a pawn crossing the great chessboard to become a Queen in the Eighth Square. Never mention films or cartoons.") });
},
function (B, x, z, kind, s, R) {
var C = LGL_C, r = R ? R() : 0.5, j = function (c) { return lglMix(c, r > 0.5 ? C.leafL : C.leafD, Math.abs(r - 0.5) * 0.7); };
s = s || 1;
if (kind === "poplar") {
B.cyl(0.16 * s, 0.24 * s, 2.2 * s, C.trunk, x, 1.1 * s, z, 6);
B.blob(1.2 * s, j(C.leaf), x, 4.6 * s, z, 0.85, 2.5, 0.85);
B.blob(0.9 * s, j(C.leafL), x + 0.2 * s, 6.4 * s, z, 0.7, 1.8, 0.7);
return;
}
if (kind === "blossom") {
var bc = r > 0.5 ? 0xF7B8CE : 0xFBE6EE;
B.cyl(0.14 * s, 0.22 * s, 2 * s, C.trunkD, x, 1 * s, z, 6);
B.cyl(0.07 * s, 0.1 * s, 1.4 * s, C.trunkD, x + 0.4 * s, 2.4 * s, z, 5, 0, -0.7);
B.cyl(0.07 * s, 0.1 * s, 1.4 * s, C.trunkD, x - 0.4 * s, 2.4 * s, z, 5, 0, 0.7);
B.blob(1.5 * s, bc, x, 3.5 * s, z, 1.1, 0.8, 1.1);
B.blob(1.1 * s, lglMix(bc, 0xFFFFFF, 0.4), x + 1 * s, 3.1 * s, z + 0.3 * s, 1, 0.8, 1);
B.blob(1.1 * s, lglMix(bc, 0xE890B0, 0.3), x - 0.9 * s, 3.2 * s, z - 0.4 * s, 1, 0.8, 1);
return;
}
if (kind === "willow") {
B.cyl(0.24 * s, 0.4 * s, 3.2 * s, C.trunkD, x, 1.6 * s, z, 7);
B.blob(2.6 * s, 0x7FB46A, x, 4.6 * s, z, 1, 0.6, 1);
for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.283;
B.blob(0.6 * s, i % 2 ? 0x8CC074 : 0x6FA85E, x + Math.cos(a) * 2.2 * s, 2.9 * s, z + Math.sin(a) * 2.2 * s, 0.8, 2.9, 0.8);
}
return;
}
if (kind === "dark") {
B.cyl(0.22 * s, 0.36 * s, 3.4 * s, 0x3A2A22, x, 1.7 * s, z, 6);
B.blob(2 * s, lglMix(0x24503A, 0x1A3A30, r), x, 5 * s, z, 1, 0.9, 1);
B.blob(1.5 * s, lglMix(0x2E6044, 0x1E4634, r), x + 1.1 * s, 4.2 * s, z + 0.5 * s);
B.blob(1.4 * s, 0x1E4634, x - 1 * s, 4.4 * s, z - 0.6 * s);
return;
}
B.cyl(0.2 * s, 0.34 * s, 2.6 * s, C.trunk, x, 1.3 * s, z, 7);
B.blob(1.9 * s, j(C.leaf), x, 4.2 * s, z, 1, 0.85, 1);
B.blob(1.4 * s, j(C.leafL), x + 1.2 * s, 3.6 * s, z + 0.4 * s, 1, 0.8, 1);
B.blob(1.3 * s, j(C.leafD), x - 1.1 * s, 3.7 * s, z - 0.5 * s, 1, 0.8, 1);
B.blob(1.1 * s, j(C.leafL), x + 0.2 * s, 5.3 * s, z - 0.3 * s, 1, 0.8, 1);
},
function (B, x, z, kind, s) {
s = s || 1;
var st = 0x3F8A3C;
B.cyl(0.035 * s, 0.05 * s, 1.3 * s, st, x, 0.65 * s, z, 5);
B.sph(0.16 * s, st, x + 0.2 * s, 0.5 * s, z, 1.8, 0.25, 0.7);
B.sph(0.16 * s, st, x - 0.2 * s, 0.8 * s, z, 1.8, 0.25, 0.7);
var y = 1.4 * s, i, a;
if (kind === "tiger") {
for (i = 0; i < 6; i++) {
a = i / 6 * 6.283;
B.sph(0.2 * s, i % 2 ? 0xF08A24 : 0xF4A030, x + Math.cos(a) * 0.2 * s, y, z + Math.sin(a) * 0.2 * s, 1, 0.3, 0.5, 8);
}
for (i = 0; i < 5; i++) {
a = i * 1.3;
B.sph(0.022 * s, 0x4A1A0A, x + Math.cos(a) * 0.2 * s, y + 0.06 * s, z + Math.sin(a) * 0.2 * s);
}
B.sph(0.09 * s, 0x7A3A12, x, y + 0.02 * s, z);
}
else if (kind === "rose") {
B.sph(0.2 * s, 0xC81E3A, x, y, z, 1, 0.9, 1, 10);
B.tor(0.13 * s, 0.05 * s, 0xE03A58, x, y + 0.1 * s, z, Math.PI / 2);
B.tor(0.07 * s, 0.04 * s, 0xA01428, x, y + 0.16 * s, z, Math.PI / 2);
}
else if (kind === "daisy") {
for (i = 0; i < 10; i++) {
a = i / 10 * 6.283;
B.sph(0.12 * s, i % 2 ? 0xFFFFFF : 0xFBE6EE, x + Math.cos(a) * 0.17 * s, y, z + Math.sin(a) * 0.17 * s, 1, 0.25, 0.45, 6);
}
B.sph(0.09 * s, 0xF2C230, x, y + 0.02 * s, z);
}
else if (kind === "violet") {
for (i = 0; i < 5; i++) {
a = i / 5 * 6.283;
B.sph(0.13 * s, 0x6A3AB8, x + Math.cos(a) * 0.12 * s, y, z + Math.sin(a) * 0.12 * s, 1, 0.35, 0.8, 6);
}
B.sph(0.05 * s, 0xF2D040, x, y + 0.03 * s, z);
}
else {
for (i = 0; i < 6; i++)
B.sph(0.1 * s, i % 2 ? 0x3A6AD8 : 0x6A8AF0, x, y - 0.5 * s + i * 0.14 * s, z, 1.3, 0.9, 1.3, 6);
}
},
function (B, kind, red, x, z, s, ry) {
var C = LGL_C, c = red ? C.red : C.ivory, d = red ? C.redD : C.ivoryD, i, a;
B.sub(x, 0, z, ry || 0, s || 1, function () {
B.lathe(LGL_TURN[kind], c, 0, 0, 0, 16);
B.tor(0.5, 0.05, d, 0, 0.13, 0, Math.PI / 2);
if (kind === "queen") {
for (i = 0; i < 8; i++) {
a = i / 8 * 6.283;
B.sph(0.07, C.gold, Math.cos(a) * 0.37, 2.36, Math.sin(a) * 0.37);
}
B.sph(0.11, C.gold, 0, 2.3, 0);
}
if (kind === "king") {
B.box(0.08, 0.4, 0.08, C.gold, 0, 2.68, 0);
B.box(0.28, 0.08, 0.08, C.gold, 0, 2.74, 0);
}
if (kind === "bishop") {
B.box(0.03, 0.3, 0.4, d, 0.12, 2.02, 0, 0, 0, 0.5);
}
if (kind === "rook") {
for (i = 0; i < 6; i++) {
a = i / 6 * 6.283;
B.box(0.2, 0.18, 0.14, c, Math.sin(a) * 0.38, 1.84, Math.cos(a) * 0.38, a);
}
}
if (kind === "knight") {
B.box(0.34, 0.9, 0.5, c, 0, 0.95, -0.04, 0, 0.18);
B.box(0.3, 0.42, 0.75, c, 0, 1.5, 0.22, 0, 0.5);
B.box(0.26, 0.3, 0.36, c, 0, 1.3, 0.58, 0, 0.9);
B.cone(0.07, 0.24, d, -0.09, 1.86, 0.0, 5);
B.cone(0.07, 0.24, d, 0.09, 1.86, 0.0, 5);
B.box(0.08, 0.9, 0.14, d, 0, 1.2, -0.32, 0, 0.18);
B.sph(0.05, C.black, 0.16, 1.6, 0.3);
B.sph(0.05, C.black, -0.16, 1.6, 0.3);
}
});
},
function (B, o) {
var c = o.col, d = o.dark || lglMix(c, 0x000000, 0.25), L = o.len || 1.6, H = o.h || 1.1, w = o.w || 0.36, lg = o.leg || 0.09, i;
B.sph(0.5, c, 0, H, 0, w / 0.5, (o.deep || 0.42) / 0.5, L / 2 / 0.5, 12);
[[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(function (p) { B.cyl(lg, lg * 0.75, H - 0.15, c, p[0] * w * 0.6, (H - 0.15) / 2, p[1] * L * 0.36, 6); B.cyl(lg * 0.9, lg * 1.05, 0.1, o.hoof || d, p[0] * w * 0.6, 0.05, p[1] * L * 0.36, 6); });
var ny = H + (o.neck || 0.5) * 0.6, nz = L / 2 + 0.05;
B.cyl(w * 0.5, w * 0.7, (o.neck || 0.5) + 0.3, c, 0, H + (o.neck || 0.5) * 0.35, L / 2 - 0.12, 7, o.lean === undefined ? 0.6 : o.lean);
var hy = H + (o.neck || 0.5) + 0.05, hz = nz + (o.neck || 0.5) * 0.35;
if (o.kind === "lion") {
B.sph(0.42, d, 0, hy - 0.05, hz - 0.12, 1.15, 1.15, 0.8, 12);
B.sph(0.27, c, 0, hy, hz + 0.1, 1, 0.95, 1, 10);
B.sph(0.14, lglMix(c, 0xFFFFFF, 0.3), 0, hy - 0.08, hz + 0.3, 1.1, 0.8, 1);
B.sph(0.04, 0x2A1A14, 0, hy - 0.03, hz + 0.43);
B.sph(0.035, 0x1A1410, 0.11, hy + 0.07, hz + 0.3);
B.sph(0.035, 0x1A1410, -0.11, hy + 0.07, hz + 0.3);
B.box(0.5, 0.02, 0.02, 0xE8E0C8, 0, hy + 0.07, hz + 0.33);
B.cyl(0.04, 0.04, L * 0.6, c, 0, H + 0.1, -L / 2 - 0.2, 5, -1.0);
B.sph(0.1, d, 0, H + 0.33, -L / 2 - 0.5);
}
else if (o.kind === "sheep") {
for (i = 0; i < 9; i++)
B.blob(0.3, c, ((i % 3) - 1) * 0.22, H + 0.12 + ((i * 7) % 3) * 0.06, (Math.floor(i / 3) - 1) * 0.4);
B.sph(0.2, 0x3A3432, 0, hy - 0.1, hz, 0.8, 0.9, 1.2);
B.sph(0.07, 0x3A3432, 0.17, hy - 0.02, hz - 0.1, 1.6, 0.5, 0.8);
B.sph(0.07, 0x3A3432, -0.17, hy - 0.02, hz - 0.1, 1.6, 0.5, 0.8);
B.tor(0.07, 0.012, 0xE8C050, 0.08, hy - 0.06, hz + 0.2, 0, 0);
B.tor(0.07, 0.012, 0xE8C050, -0.08, hy - 0.06, hz + 0.2, 0, 0);
B.blob(0.16, c, 0, hy + 0.1, hz - 0.08);
}
else {
B.sph(0.2, c, 0, hy, hz, o.kind === "fawn" ? 0.75 : 0.85, 0.9, o.kind === "fawn" ? 1.3 : 1.7, 10);
B.sph(0.11, lglMix(c, 0xFFFFFF, o.kind === "goat" ? 0.4 : 0.15), 0, hy - 0.07, hz + 0.27, 1, 0.8, 1);
B.sph(0.03, 0x1A1410, 0.14, hy + 0.05, hz + 0.08);
B.sph(0.03, 0x1A1410, -0.14, hy + 0.05, hz + 0.08);
B.cone(0.05, 0.2, c, 0.1, hy + 0.22, hz - 0.12, 5);
B.cone(0.05, 0.2, c, -0.1, hy + 0.22, hz - 0.12, 5);
if (o.kind === "unicorn") {
B.cone(0.05, 0.75, 0xF4E8C0, 0, hy + 0.5, hz + 0.08, 7, 0.35);
for (i = 0; i < 5; i++)
B.blob(0.13, 0xFFFFFF, 0, hy + 0.1 - i * 0.14, hz - 0.2 - i * 0.06, 0.5, 1, 1);
B.sph(0.07, 0xFFFFFF, 0, hy - 0.28, hz + 0.16, 0.7, 1.6, 0.7);
}
if (o.kind === "horse") {
for (i = 0; i < 5; i++)
B.blob(0.11, d, 0, hy + 0.12 - i * 0.13, hz - 0.2 - i * 0.06, 0.45, 1, 1);
}
if (o.kind === "goat") {
B.cone(0.035, 0.3, 0xD8D0B8, 0.07, hy + 0.3, hz - 0.1, 5, -0.5);
B.cone(0.035, 0.3, 0xD8D0B8, -0.07, hy + 0.3, hz - 0.1, 5, -0.5);
B.cone(0.05, 0.22, 0xF0EDE0, 0, hy - 0.28, hz + 0.2, 5, Math.PI);
}
if (o.kind === "fawn") {
for (i = 0; i < 8; i++)
B.sph(0.035, 0xFFF4E0, ((i % 2) ? 0.26 : -0.26) * (0.8 + ((i * 3) % 4) * 0.05), H + 0.12, -0.4 + i * 0.11, 0.3, 1, 1);
}
if (o.tail !== false)
B.cone(o.kind === "fawn" ? 0.06 : 0.09, o.kind === "fawn" ? 0.2 : 0.8, o.kind === "unicorn" ? 0xFFFFFF : d, 0, H - (o.kind === "fawn" ? -0.1 : 0.2), -L / 2 - 0.1, 6, Math.PI + 0.5);
}
},
function (P, cx, cz, r, fn) {
P.make(cx, cz, 0, r, function (G) {
var B = lglB();
B.at(-cx, 0, -cz);
var keep = B.base;
G.userData.lgl = { cx: cx, cz: cz };
try {
fn(B, G, function () { B.base = keep; });
}
catch (e) {
if (window.console)
console.warn("looking-glass zone", cx, cz, e);
}
B.base = keep;
if (B.g.length)
G.add(B.mesh());
return true;
});
},
function (G, kind, red, x, z, name, who, greet, rr) {
var g = lglMade(function (B) {
lglPiece(B, kind, red, 0, 0, 0.82);
var ey = kind === "pawn" ? 1.24 : kind === "rook" ? 1.2 : kind === "knight" ? 1.3 : 1.42, er = kind === "knight" ? 0 : 0.2;
if (er) {
B.sph(0.035, 0x1A1418, -0.07, ey, er);
B.sph(0.035, 0x1A1418, 0.07, ey, er);
}
});
var L = G.userData.lgl;
g.position.set(x - L.cx, 0, z - L.cz);
G.add(g);
lglTalker(name, x, z, who, greet, "You are a living chess piece and glide rather than walk.", 3.2);
var T = LD.talkers[LD.talkers.length - 1];
LGL.movers.push({ g: g, cx: L.cx, cz: L.cz, x: x, z: z, hx: x, hz: z, tx: x, tz: z, wait: 1 + Math.random() * 5, r: rr || 9, T: T });
},
function (B, G, x, z, ry, w, h, L, y0) {
y0 = y0 || 0;
B.sub(x, y0, z, ry, 1, function () {
var g = LGL_C.gold, d = LGL_C.goldD;
B.box(w + 0.5, 0.25, 0.5, d, 0, 0.12, 0);
B.box(0.22, h + 0.5, 0.22, g, -w / 2 - 0.1, h / 2 + 0.25, 0);
B.box(0.22, h + 0.5, 0.22, g, w / 2 + 0.1, h / 2 + 0.25, 0);
B.box(w + 0.4, 0.22, 0.22, g, 0, 0.36, 0);
B.add(new THREE.CylinderGeometry(w / 2 + 0.2, w / 2 + 0.2, 0.22, 20, 1, false, -Math.PI / 2, Math.PI), g, 0, h + 0.4, 0, Math.PI / 2);
B.sph(0.2, g, 0, h + 0.4 + w / 2 + 0.3, 0);
B.sph(0.14, g, -w / 2 - 0.1, h + 0.62, 0);
B.sph(0.14, g, w / 2 + 0.1, h + 0.62, 0);
});
var mat = lglGlassMat(0xD6E8F4), px = x - L.cx + Math.sin(ry) * 0.03, pz = z - L.cz + Math.cos(ry) * 0.03;
var pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h - 0.1), mat);
pane.position.set(px, y0 + h / 2 + 0.45, pz);
pane.rotation.y = ry;
G.add(pane);
var top = new THREE.Mesh(new THREE.CircleGeometry(w / 2, 20, 0, Math.PI), mat);
top.position.set(px, y0 + h + 0.4, pz);
top.rotation.y = ry;
G.add(top);
return pane;
},
function (P) {
var C = LGL_C, lite = P.lite, R = lglRand(1871), i, j;
LGL.movers = [];
LGL.marks = [];
LGL.itemsAt = {};
var SQ = function (n) { return -40 - 70 * (n - 2); };
var BROOKS = [-110, -180, -250, -320, -390, -460];
P.path([[0, 8], [0, -10]], 4, C.gravel);
P.path([[0, -24], [0, -20], [9.5, -20], [9.5, -44], [0, -48], [0, -56], [-3, -70], [3, -84], [0, -94]], 3, C.gravel);
P.path([[0, -102], [0, -128]], 3, C.gravel, "ornatelamp", 13);
P.path([[0, -184], [0, -196], [-2, -208], [2, -220], [0, -228], [0, -262]], 3, C.gravel);
P.path([[0, -234], [-14, -234], [-26, -232]], 2.4, C.gravel);
P.path([[2, -238], [20, -239]], 2.2, C.gravel);
P.path([[0, -276], [0, -342]], 3, C.gravel, "ornatelamp", 16);
P.path([[2, -276], [12, -282]], 2.2, C.gravel);
P.path([[0, -352], [0, -366], [14, -374], [28, -374]], 3, C.gravel);
P.path([[0, -366], [0, -400], [-2, -414], [2, -428], [0, -442], [0, -476]], 3, C.gravel);
P.path([[28, -374], [44, -372], [60, -366]], 3, C.gravel, "ornatelamp", 12);
P.path([[0, -484], [0, -500]], 4, 0xF6ECD2, "ornatelamp", 8);
BROOKS.forEach(function (z) { P.flow([[-284, z], [284, z]], 3.4, C.brook, { bank: 0.7, bankCol: 0x8FB86A, lift: 0.1 }); });
lglZone(P, 0, -250, 0.5, function (B, G) {
var pos = [], uv = [], idx = [], n = 0, tx = (typeof texOf === "function") ? texOf("grass") : null;
for (var f = 0; f < 8; f++)
for (var k = 0; k < 9; k++) {
if ((f + k) % 2)
continue;
var x0 = -280 + f * 70, z0 = 30 - k * 70, x1 = x0 + 70, z1 = z0 - 70;
pos.push(x0, 0.03, z0 + 250, x1, 0.03, z0 + 250, x1, 0.03, z1 + 250, x0, 0.03, z1 + 250);
uv.push(x0, z0, x1, z0, x1, z1, x0, z1);
idx.push(n, n + 1, n + 2, n, n + 2, n + 3);
n += 4;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ color: 0xC2EC96, map: tx, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
m.receiveShadow = true;
G.add(m);
});
[-105, -35, 35, 105].forEach(function (x) {
if (lite && Math.abs(x) > 40)
return;
lglZone(P, x, -250, 0.5, function (B) {
var cuts = [30, -40].concat(BROOKS).concat([-530]);
for (var k = 0; k + 1 < cuts.length; k++) {
var a = cuts[k] - 3, b = cuts[k + 1] + 3, mid = (a + b) / 2, gaps = [mid];
if (x === 35 && k === 5)
gaps = [mid, -376];
if (x === 35 && k === 4)
gaps = [mid];
if (x === -35 && k === 3)
gaps = [-233];
var pts = [a];
gaps.sort(function (p, q) { return q - p; }).forEach(function (gz) { pts.push(gz + 3.5, gz - 3.5); });
pts.push(b);
for (var s = 0; s < pts.length; s += 2) {
if (pts[s] - pts[s + 1] < 1)
continue;
lglHedge(B, x, pts[s], x, pts[s + 1], 1.5, 1.1);
lglSolid(x, (pts[s] + pts[s + 1]) / 2, 0.55, (pts[s] - pts[s + 1]) / 2, 1.6);
}
gaps.forEach(function (gz) { B.cyl(0.3, 0.3, 2.6, C.hedge, x, 1.3, gz + 3.6, 8); B.cyl(0.3, 0.3, 2.6, C.hedge, x, 1.3, gz - 3.6, 8); B.sph(0.5, C.hedgeL, x, 2.9, gz + 3.6); B.sph(0.5, C.hedgeL, x, 2.9, gz - 3.6); });
}
});
});
lglZone(P, 0, -285, 0.5, function (B) { BROOKS.forEach(function (z) { for (var s = -1; s <= 1; s++)
B.cyl(0.55, 0.6, 0.16, s ? C.stone : C.stoneD, s * 0.9, 0.1, z + s * 0.5, 9); }); });
lglZone(P, -13, -6, 2, function (B) { lglAvenue(B, -13, R, P.lite); });
lglZone(P, 13, -6, 2, function (B) { lglAvenue(B, 13, R, P.lite); });
lglHouse(P);
lglGarden(P, R);
lglRailway(P, R);
lglFourth(P, R);
lglFifth(P, R);
lglSixth(P, R);
lglSeventh(P, R);
lglEighth(P, R);
lglSides(P, R);
P.sign(-7, -4, 0.4, ["Looking-Glass Land", "Press E to read"], ["Looking-Glass Land", "The country through the glass", [
"You have come through the looking-glass. The whole country is one great game of chess: eight squares long, marked out by six little brooks and green hedges.",
"You come in as a Pawn. Walk the book across the board, square by square, and in the Eighth Square you will be a Queen.",
"To begin, go up to the great looking-glass straight ahead and press E. The words at the top of the screen always say what to do next, and the pointer shows the way.",
"Everyone here can be talked with: the Queens, the Tweedles, Humpty Dumpty, the Knights, the live flowers, and the chessmen out walking.",
"After \"Through the Looking-Glass, and What Alice Found There\" by Lewis Carroll (1871), with the look of John Tenniel's pictures. The whole of the book is here to read as you play it."
]]);
},
function (B, x, R, lite) {
var red = x < 0 ? 1 : 0, sd = x < 0 ? -1 : 1;
[[0, 6, "blossom"], [2 * sd, -4, "blossom"], [4 * sd, -14, "blossom"], [9 * sd, 2, "oak"], [11 * sd, -12, "poplar"], [15 * sd, -24, "blossom"], [8 * sd, -22, "blossom"]].forEach(function (t) { lglTree(B, x + t[0], t[1], t[2], 1.1 + R() * 0.3, R); lglRound(x + t[0], t[1], 0.4, 5); });
[["rook", 3 * sd, 10, 1.5], ["knight", -3 * sd, 1, 1.4], ["bishop", -1 * sd, -9, 1.4], ["pawn", 5 * sd, -19, 1.2]].forEach(function (p) { lglPiece(B, p[0], red, x + p[1], p[2], p[3], sd > 0 ? -0.6 : 0.6); lglRound(x + p[1], p[2], p[3] * 0.6, 3); });
lglBed(B, x - 5.5 * sd, -2, 5, 22, lite ? 50 : 130, red ? [0xC81E3A, 0xE03A58, 0xF7B8CE] : [0xFFFFFF, 0xFBE6EE, 0xF2C230], R);
},
function (P) {
var C = LGL_C;
lglZone(P, 0, -12, 3.5, function (B, G) {
var L = G.userData.lgl;
B.box(5.6, 0.3, 1.6, 0xEDE8DE, 0, 0.15, -13);
B.box(0.7, 1.5, 1, 0xF4F0E8, -2.2, 0.9, -13);
B.box(0.7, 1.5, 1, 0xF4F0E8, 2.2, 0.9, -13);
B.box(5.8, 0.28, 1.5, 0xFAF6EE, 0, 1.78, -13);
B.box(3.7, 1.5, 0.3, 0x2A2624, 0, 0.9, -13.3);
B.box(3.4, 0.3, 0.7, 0x3A3634, 0, 0.3, -12.8);
for (var i = 0; i < 7; i++)
B.sph(0.16, i % 2 ? 0xE8602A : 0xF2A030, -1.2 + i * 0.4, 0.52, -12.8);
B.cyl(0.16, 0.22, 0.5, 0x3A7AB8, -2.3, 2.17, -13, 10);
B.cyl(0.16, 0.22, 0.5, 0x3A7AB8, 2.3, 2.17, -13, 10);
B.sph(0.2, C.pink, -2.3, 2.6, -13);
B.sph(0.2, C.pink, 2.3, 2.6, -13);
lglMirror(B, G, 0, -13.2, 0, 3.2, 3, L, 1.9);
lglSolid(0, -13, 2.9, 0.8, 6);
if (typeof ldHalo === "function")
ldHalo(G, 0, 4, -0.9, 0xEAF4FF, 7, 0.5);
});
lglZone(P, 0, -31, 11, function (B, G) {
var L = G.userData.lgl, w = C.cream, i;
B.box(14.4, 0.12, 14.4, 0x8A5A3A, 0, 0.06, -31);
B.box(6, 0.03, 4, 0x9A2A3A, 0, 0.14, -35.2);
B.box(5.4, 0.035, 3.4, 0xC8A050, 0, 0.145, -35.2);
var wall = function (x, z, hw, hd) { B.box(hw * 2, 4.2, hd * 2, w, x, 2.1, z); B.box(hw * 2 + 0.04, 0.9, hd * 2 + 0.04, 0x6A8AA8, x, 0.57, z); lglSolid(x, z, hw, hd, 4.2); };
wall(0, -38.1, 7.2, 0.2);
wall(-7.1, -31, 0.2, 7.2);
wall(7.1, -35, 0.2, 3.2);
wall(7.1, -25.9, 0.2, 2.3);
wall(-4.3, -23.9, 2.9, 0.2);
wall(4.3, -23.9, 2.9, 0.2);
B.box(3, 1.4, 0.4, w, 0, 3.5, -23.9);
B.box(0.4, 1.4, 2.4, w, 7.1, 3.5, -30);
B.box(14.6, 0.2, 14.6, 0xF6F0E0, 0, 4.4, -31);
lglCeil(G, 14, 14, 0xF4EEDF, 0, 4.28, -31);
B.box(14, 0.16, 0.1, 0xFFFFFF, 0, 4.16, -37.86);
B.box(0.1, 0.16, 14, 0xFFFFFF, -6.86, 4.16, -31);
B.box(0.1, 0.16, 14, 0xFFFFFF, 6.86, 4.16, -31);
for (i = 0; i < 9; i++) {
B.box(0.06, 2.6, 0.05, 0xE4D6B8, -6 + i * 1.5, 2.72, -37.87);
B.box(0.05, 2.6, 0.06, 0xE4D6B8, -6.87, 2.72, -37 + i * 1.5);
}
B.box(2.2, 3, 0.5, C.woodD, 5.6, 1.5, -37.5);
for (i = 0; i < 4; i++) {
B.box(2, 0.05, 0.44, C.wood, 5.6, 0.5 + i * 0.7, -37.46);
for (var bk = 0; bk < 8; bk++)
B.box(0.18, 0.46 + ((bk * i) % 3) * 0.05, 0.3, [0x7A1E2A, 0x2A4A7A, 0x2E6E38, 0xC8A050, 0x5A3A6A][(bk + i) % 5], 4.8 + bk * 0.22, 0.78 + i * 0.7, -37.4);
}
lglSolid(5.6, -37.5, 1.1, 0.3, 3);
B.box(1, 0.45, 1, 0x2E5A4A, 4.4, 0.42, -34);
B.box(1, 1.1, 0.22, 0x2E5A4A, 4.4, 1, -34.5);
lglSolid(4.4, -34.1, 0.55, 0.55, 1.2);
B.cyl(0.4, 0.4, 0.05, C.wood, -5.6, 0.8, -26, 12);
B.cyl(0.05, 0.2, 0.78, C.woodD, -5.6, 0.4, -26, 6);
B.cyl(0.05, 0.1, 0.4, C.gold, -5.6, 1.02, -26, 8);
B.cone(0.24, 0.3, 0xF8E8B8, -5.6, 1.36, -26, 10);
lglRound(-5.6, -26, 0.4, 1);
[[-4, -24.2], [4, -24.2]].forEach(function (p) { B.box(0.4, 2.5, 0.08, 0x9A2A3A, p[0] - 1.05, 2.2, p[1]); B.box(0.4, 2.5, 0.08, 0x9A2A3A, p[0] + 1.05, 2.2, p[1]); B.box(2.7, 0.25, 0.12, 0x9A2A3A, p[0], 3.5, p[1]); });
lglRoof(B, 15.6, 15.6, 3.6, C.slate, 0, 4.5, -31);
B.box(1.3, 3.4, 1.3, C.brick, 0, 6.6, -37);
B.cyl(0.3, 0.36, 0.7, 0xC8683A, 0, 8.6, -37, 8);
[[-4, -23.75], [4, -23.75]].forEach(function (p) { B.box(1.8, 2, 0.1, 0xBFDDEE, p[0], 2.3, p[1]); B.box(2, 0.12, 0.16, 0xFFFFFF, p[0], 3.34, p[1]); B.box(2, 0.12, 0.16, 0xFFFFFF, p[0], 1.26, p[1]); B.box(0.1, 2, 0.14, 0xFFFFFF, p[0], 2.3, p[1]); B.box(1.8, 0.08, 0.14, 0xFFFFFF, p[0], 2.3, p[1]); });
B.box(4.2, 2, 0.7, 0xF2EEE6, 0, 1, -37.6);
B.box(2.2, 1.3, 0.75, 0x1E1A18, 0, 0.72, -37.58);
B.box(4.6, 0.16, 1, 0xFAF6EE, 0, 2.08, -37.5);
B.box(2, 0.2, 0.8, 0x3A3634, 0, 0.26, -37.3);
for (i = 0; i < 6; i++)
B.sph(0.14, i % 2 ? 0xE8602A : 0xF2A030, -0.75 + i * 0.3, 0.44, -37.3);
B.box(0.7, 0.9, 0.4, 0x3A2418, 0, 2.62, -37.6);
B.cyl(0.27, 0.27, 0.06, 0xF8F2DC, 0, 2.72, -37.38, 16, Math.PI / 2);
B.sph(0.03, 0x1A1410, -0.09, 2.78, -37.34);
B.sph(0.03, 0x1A1410, 0.09, 2.78, -37.34);
B.tor(0.1, 0.012, 0x1A1410, 0, 2.7, -37.34, 0, 0, Math.PI, Math.PI);
B.cyl(0.13, 0.18, 0.45, 0x3A7AB8, -1.7, 2.4, -37.5, 10);
B.cyl(0.13, 0.18, 0.45, 0x3A7AB8, 1.7, 2.4, -37.5, 10);
var pane = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.1), lglGlassMat(0xD6E8F4));
pane.position.set(0, 3.65, -37.86 - L.cz);
G.add(pane);
B.box(3.5, 0.14, 0.12, C.gold, 0, 4.22, -37.86);
B.box(3.5, 0.14, 0.12, C.gold, 0, 3.06, -37.86);
B.box(0.14, 1.3, 0.12, C.gold, -1.7, 3.65, -37.86);
B.box(0.14, 1.3, 0.12, C.gold, 1.7, 3.65, -37.86);
[[-1.9, -36.3, "pawn", 0], [-1.6, -36.9, "pawn", 1], [1.8, -36.2, "rook", 0], [2.1, -36.8, "bishop", 1], [-0.3, -35.9, "knight", 1], [0.5, -36, "pawn", 0], [2.6, -35.6, "queen", 1], [-2.6, -35.7, "king", 1]].forEach(function (p) { lglPiece(B, p[2], p[3], p[0], p[1], 0.2, p[0] * 3); });
B.cyl(1, 1, 0.08, C.wood, 3.6, 0.95, -30, 18);
B.cyl(0.1, 0.34, 0.9, C.woodD, 3.6, 0.47, -30, 8);
B.box(0.5, 0.08, 0.36, 0x7A1E2A, 3.5, 1.04, -29.9, 0.4);
B.box(0.46, 0.02, 0.32, 0xF4EEDD, 3.5, 1.09, -29.9, 0.4);
B.box(1.1, 0.5, 1.1, 0x7A2A3A, -3.4, 0.45, -33.2);
B.box(1.1, 1.2, 0.25, 0x7A2A3A, -3.4, 1.1, -33.75, 0);
B.box(0.22, 0.4, 1.1, 0x6A2030, -3.95, 0.85, -33.2);
B.box(0.22, 0.4, 1.1, 0x6A2030, -2.85, 0.85, -33.2);
B.sph(0.16, 0x3A6AB8, -2.5, 0.3, -32.4);
lglSolid(-3.4, -33.3, 0.6, 0.6, 1.3);
lglRound(3.6, -30, 0.9, 1);
lglMirror(B, G, -6.5, -30, Math.PI / 2, 1.2, 1.9, L);
lglSolid(-6.5, -30, 0.3, 0.9, 2.6);
[[-6.86, -34.5, Math.PI / 2], [-6.86, -27, Math.PI / 2], [6.86, -34.5, -Math.PI / 2], [3.5, -37.86, 0], [-3.5, -37.86, 0]].forEach(function (p, k) { B.box(1.2, 0.9, 0.06, C.gold, p[0], 2.6, p[1], p[2]); B.box(1, 0.7, 0.08, [0x6A8AB8, 0x8AB86A, 0xB88A6A, 0x8A6AB8, 0xB86A8A][k], p[0], 2.6, p[1], p[2]); });
[[-3.4, -32.9, 0x1A1A1E, 0.72], [-2, -35.4, 0xF4F4F0, 0.2]].forEach(function (p) { B.sph(0.16, p[2], p[0], p[3] + 0.14, p[1], 1, 0.8, 1.5); B.sph(0.11, p[2], p[0], p[3] + 0.3, p[1] + 0.2); B.cone(0.035, 0.08, p[2], p[0] - 0.06, p[3] + 0.42, p[1] + 0.2, 4); B.cone(0.035, 0.08, p[2], p[0] + 0.06, p[3] + 0.42, p[1] + 0.2, 4); B.cyl(0.02, 0.03, 0.3, p[2], p[0], p[3] + 0.2, p[1] - 0.3, 5, -0.9); });
lglTalker("The black kitten", -3.4, -32.4, "Kitty, Dinah's black kitten, who may or may not have been the Red Queen all along", "Prrrr.", "You only purr. Purr in different ways for yes and for no, and never say a word.", 2.4);
if (typeof ldHalo === "function")
ldHalo(G, 0, 0.6, -6.2, 0xFFB050, 2.2, 0.6);
});
},
function (P, R) {
var C = LGL_C;
lglZone(P, -8, -66, 9, function (B, G) {
lglTree(B, -7, -63.4, "willow", 1.25, R);
lglRound(-7, -63.4, 0.5, 5);
B.tor(5, 0.28, C.stone, -7, 0.12, -63.4, Math.PI / 2);
[["tiger", -8.6, -60.6, 1.3], ["rose", -5.4, -61.2, 1.25], ["daisy", -9.8, -63, 0.8], ["daisy", -10.2, -64.4, 0.75], ["daisy", -9.4, -65.6, 0.8], ["daisy", -8.2, -66.6, 0.7], ["violet", -5.2, -66.2, 0.75], ["larkspur", -3.6, -63.6, 1.3], ["rose", -4.2, -65.2, 1], ["tiger", -6.4, -67, 1], ["daisy", -4.6, -60.2, 0.7], ["larkspur", -10.4, -61.4, 1.1], ["rose", -7.6, -59.4, 0.9], ["violet", -9, -67.4, 0.7]].forEach(function (f) { lglFlower(B, f[1], f[2], f[0], f[3]); });
lglBed(B, -7, -63.4, 9, 9, lite(110), [0xF7B8CE, 0xFFFFFF, 0xF2C230, 0xC81E3A, 0x9A6AE0], R);
lglTalker("The Tiger-lily", -8.6, -60.6, "the Tiger-lily of the garden of live flowers, who keeps the other flowers in order", "We CAN talk, when there's anybody worth talking to.", "You are proud and sharp-tongued, and tell the daisies to hold their tongues.", 2.6);
lglTalker("The Rose", -5.4, -61.2, "the Rose of the garden of live flowers", "It's my opinion that you never think AT ALL.", "You are rather severe, and judge everyone by their petals.", 2.6);
lglTalker("The Daisies", -9.8, -64.4, "the daisies of the garden of live flowers, who all speak at once in shrill little voices", "Bough-wough! That's why its branches are called boughs!", "You are many small voices together, excitable; when told to hush you turn white (the pink ones) and whisper.", 2.4);
lglTalker("The Violet", -5.2, -66.2, "the Violet of the garden of live flowers, who never spoke before", "I never saw anybody that looked stupider.", "You say one rude thing, suddenly, and then go quiet and shy.", 2.2);
lglTalker("The Larkspur", -3.6, -63.6, "the Larkspur of the garden of live flowers, who hears footsteps on the gravel before anyone", "She's coming! I hear her footstep, thump, thump, thump, along the gravel-walk!", "You are always listening for who is coming.", 2.4);
});
function lite(n) { return P.lite ? Math.ceil(n * 0.4) : n; }
lglZone(P, 10, -78, 7, function (B) {
[[12, -60, "blossom", 1], [16, -72, "oak", 1.1], [9, -86, "blossom", 1.2], [20, -84, "poplar", 1], [22, -62, "oak", 0.9], [14, -94, "blossom", 0.9], [26, -74, "blossom", 1.1], [28, -96, "oak", 1.2]].forEach(function (t) { lglTree(B, t[0], t[1], t[2], t[3], R); lglRound(t[0], t[1], 0.4, 4); });
lglBed(B, 14, -70, 16, 12, lite(140), [0xC81E3A, 0xE03A58, 0xF7B8CE, 0xFFFFFF], R);
lglBed(B, 18, -88, 14, 10, lite(90), [0xF2C230, 0xFFFFFF, 0x9A6AE0], R);
for (var k = 0; k < 5; k++) {
var bx = 11 + k * 3, bz = -70 + ((k * 7) % 5);
B.blob(0.6, 0x2E7A3A, bx, 0.5, bz, 1, 0.85, 1);
for (var q = 0; q < 5; q++)
B.sph(0.11, 0xC81E3A, bx + Math.cos(q * 1.3) * 0.45, 0.6 + ((q * 5) % 3) * 0.18, bz + Math.sin(q * 1.3) * 0.45);
}
});
lglZone(P, -20, -88, 7, function (B) {
[[-16, -78, "blossom", 1.1], [-24, -74, "oak", 1.2], [-14, -92, "poplar", 1], [-28, -90, "blossom", 1], [-22, -100, "oak", 1], [-30, -62, "poplar", 1.1], [-12, -104, "blossom", 0.9]].forEach(function (t) { lglTree(B, t[0], t[1], t[2], t[3], R); lglRound(t[0], t[1], 0.4, 4); });
lglBed(B, -20, -84, 16, 14, lite(140), [0x9A6AE0, 0x6A8AF0, 0xFFFFFF, 0xF7B8CE], R);
lglPiece(B, "bishop", 0, -26, -82, 1.6, 0.4);
lglRound(-26, -82, 0.9, 4);
});
lglZone(P, 0, -99, 6, function (B, G) {
B.cyl(8.5, 9, 0.1, 0x9AD070, 0, 0.06, -98, 26);
for (var k = 0; k < 16; k++) {
var a = k / 16 * 6.283;
B.sph(0.3, k % 2 ? C.stone : C.stoneD, Math.cos(a) * 8.6, 0.14, -98 + Math.sin(a) * 8.6, 1, 0.6, 1);
}
lglTree(B, 7, -102.6, "oak", 1.5, R);
lglRound(7, -102.6, 0.6, 5);
for (var p = 0; p < 5; p++) {
B.cyl(0.04, 0.04, 0.5, C.white, 0, 0.25, -103 - p * 1.2, 5);
B.sph(0.07, C.red, 0, 0.52, -103 - p * 1.2);
}
lglCast(G, 0, -98, 0, lglFigure("redqueen", { sex: "f", look: { top: C.red, topKind: "dress", bottom: C.red, shoes: 0x3A0A0A, skin: 0xE8C8A8, hair: 0x2A1A14, hairStyle: "bun", hat: "none" } }, function (B2) { lglSkirt(B2, C.red, C.redD, 1.02, 0.62); lglCrown(B2, C.gold, 1.86, 0.2, 7); B2.tor(0.2, 0.03, C.gold, 0, 1.5, 0, Math.PI / 2); }), "The Red Queen", "the Red Queen, a chess queen half a head taller than Alice, brisk, bossy and fond of rules", "Where do you come from? And where are you going? Look up, speak nicely, and don't twiddle your fingers all the time.", "You say 'Faster! Faster!' and 'Curtsey while you're thinking what to say, it saves time.' You are never cruel.");
});
lglZone(P, 24, -52, 1, function (B, G) {
lglWalker(G, "pawn", 0, 22, -54, "A White Pawn", "Lily, the White Queen's little daughter, a white pawn too young to play, which is why the dreamer may take her place", "Are you to be the Queen's Pawn instead of me? Mind the brooks!", 8);
lglWalker(G, "rook", 1, -22, -52, "The Red Castle", "one of the Red Castles of the chessboard country, who walks arm in arm with the other", "Two and two, that's how we walk. Have you seen the other Castle?", 8);
lglWalker(G, "bishop", 0, 30, -100, "The White Bishop", "a White Bishop of the chessboard country, who moves only cornerwise", "I go slantwise, always. It gets one along beautifully.", 10);
lglWalker(G, "knight", 1, -30, -126, "A Red Horse", "one of the Red Knights' chess-horses, out without its rider", "Check! No, I beg your pardon. Habit.", 10);
});
},
function (P, R) {
var C = LGL_C;
lglZone(P, 0, -140, 12, function (B, G) {
var i;
B.box(150, 0.14, 3.4, 0x9A9488, 0, 0.07, -141);
for (i = -37; i <= 37; i++)
B.box(0.3, 0.1, 2.8, C.woodD, i * 2, 0.17, -141);
B.box(150, 0.12, 0.12, 0x5A5A62, 0, 0.26, -140.2);
B.box(150, 0.12, 0.12, 0x5A5A62, 0, 0.26, -141.8);
B.box(26, 0.5, 4.6, C.stone, -2, 0.25, -136);
B.box(26, 0.08, 0.3, C.white, -2, 0.52, -138.1);
B.box(7, 3, 3, C.brick, -11, 2, -134.6);
lglRoof(B, 8, 4, 1.6, C.slate, -11, 3.5, -134.6);
B.box(1, 2, 0.1, C.woodD, -11, 1.5, -136.12);
B.box(1.2, 1, 0.1, 0xBFDDEE, -13, 2.2, -136.12);
B.box(1.2, 1, 0.1, 0xBFDDEE, -9, 2.2, -136.12);
lglSolid(-11, -134.6, 3.6, 1.6, 4);
lglSolid(-2, -136, 13, 2.3, 0.4);
for (i = 0; i < 4; i++) {
B.cyl(0.07, 0.09, 3, 0x2A3A4A, -4 + i * 4.6, 2, -134.2, 6);
}
B.box(15.4, 0.14, 2.6, 0x8A2A2A, 2.9, 3.56, -135);
B.box(15.4, 0.5, 0.06, C.white, 2.9, 3.3, -136.3);
B.cyl(1.05, 1.05, 5, 0x2E7A4A, -9.5, 1.95, -141, 16, 0, Math.PI / 2);
B.box(2.4, 2.6, 2.4, 0x2E7A4A, -5.8, 2.2, -141);
B.box(2.8, 0.14, 2.8, 0x1E1E22, -5.8, 3.56, -141);
B.cyl(0.26, 0.34, 1.5, 0x1E1E22, -11.2, 3.5, -141, 10);
B.cyl(0.42, 0.3, 0.3, C.gold, -11.2, 4.3, -141, 10);
B.sph(0.42, C.gold, -9.4, 3.05, -141, 1, 0.8, 1);
B.cone(1.1, 1.2, C.red, -12.7, 0.9, -141, 4, 0, Math.PI / 2);
[-11, -9, -7].forEach(function (x) { B.cyl(0.62, 0.62, 0.2, C.red, x, 0.82, -139.95, 14, Math.PI / 2); B.cyl(0.62, 0.62, 0.2, C.red, x, 0.82, -142.05, 14, Math.PI / 2); });
B.box(6, 0.5, 2.2, 0x1E1E22, -8.8, 0.8, -141);
lglSolid(-9, -141, 3.8, 1.3, 4);
[[-0.5, 0x7A2A2A], [7.5, 0x2A4A7A]].forEach(function (c) {
var x = c[0];
B.box(7, 0.3, 2.5, 0x2A2A2E, x, 0.75, -141);
B.box(7, 2.3, 0.12, c[1], x, 2.05, -142.2);
B.box(0.12, 2.3, 2.5, c[1], x - 3.44, 2.05, -141);
B.box(0.12, 2.3, 2.5, c[1], x + 3.44, 2.05, -141);
B.box(7, 0.9, 0.12, c[1], x, 1.35, -139.8);
B.box(7.3, 0.16, 2.9, 0xE8E0D0, x, 3.28, -141);
B.box(7, 0.3, 0.12, c[1], x, 3.05, -139.8);
[-3.44, -1.15, 1.15, 3.44].forEach(function (dx) { B.box(0.12, 1.2, 0.12, c[1], x + dx, 2.4, -139.8); });
B.box(6.6, 0.45, 0.7, 0x8A5A3A, x, 1.15, -141.85);
[-2.3, 0, 2.3].forEach(function (dx) { B.cyl(0.42, 0.42, 0.16, 0x2A2A2E, x + dx, 0.46, -139.95, 12, Math.PI / 2); B.cyl(0.42, 0.42, 0.16, 0x2A2A2E, x + dx, 0.46, -142.05, 12, Math.PI / 2); });
lglSolid(x, -141, 3.5, 1.3, 3.4);
});
B.sub(1.4, 1.15, -141.6, 0, 0.62, function () { lglBeast(B, { kind: "goat", col: 0xE8E0D0, len: 1.2, h: 0.7, neck: 0.45 }); });
B.sub(9.4, 1.15, -141.6, 0, 0.7, function () { lglBeast(B, { kind: "horse", col: 0x8A5A3A, len: 1.3, h: 0.9, neck: 0.5 }); });
B.sph(0.22, 0x1E2A1E, 6, 1.62, -141.7, 1, 0.75, 1.3);
B.sph(0.12, 0x1E2A1E, 6, 1.72, -141.4);
B.cyl(0.01, 0.01, 0.3, 0x1E2A1E, 5.94, 1.9, -141.3, 3, 0.5);
B.cyl(0.01, 0.01, 0.3, 0x1E2A1E, 6.06, 1.9, -141.3, 3, 0.5);
lglCast(G, -1.6, -141.5, 0, (function () { var f = lglFigure("paperman", { sex: "m", look: { top: 0xFAFAF6, topKind: "coat", bottom: 0xFAFAF6, shoes: 0xF0F0EA, skin: 0xE8C8A8, hair: 0x8A8A8A, hat: "none" } }, function (B2) { B2.cone(0.2, 0.34, 0xFFFFFF, 0, 2.0, 0, 4); }); f.scale.setScalar(0.78); f.position.y = 0.95; return f; })(), "The gentleman in white paper", "the gentleman dressed in white paper who sits opposite Alice in the railway carriage", "So young a child ought to know which way she's going, even if she doesn't know her own name!", "You are prim and whispery, and you rustle.", 2.6);
lglTalker("The Goat", 1.4, -140.6, "the Goat in the railway carriage, who shuts his eyes and speaks in a loud voice", "She ought to know her way to the ticket-office, even if she doesn't know her alphabet!", "", 2.4);
lglTalker("The Horse", 9.4, -140.6, "the Horse in the railway carriage, with a hoarse voice", "Change engines. It's only a brook we have to jump over.", "You sound extremely hoarse (you ARE a horse).", 2.4);
lglCast(G, -2.4, -137.4, 0, (function () { var f = lglFigure("guard", { sex: "m", look: { top: 0x1E2A4A, topKind: "coat", bottom: 0x1E2A4A, shoes: 0x1A1410, skin: 0xE0B898, hair: 0x3A2A1A, beard: "full", hat: "cap", hatColor: 0x1E2A4A } }, function (B2) { B2.cyl(0.05, 0.12, 0.5, C.gold, 0.36, 1.25, 0.2, 8, 1.2); }); f.position.y = 0.5; return f; })(), "The Guard", "the Guard of the Looking-glass railway, who looks at passengers first through a telescope, then a microscope, then an opera-glass", "Tickets, please! Now then! Show your ticket, child! Don't keep him waiting: why, his time is worth a thousand pounds a minute!", "You say everything costs a thousand pounds: a minute, an inch of land, a puff of smoke, a word.");
B.box(2.6, 0.9, 0.08, 0x1E2A4A, 5, 2.75, -134.3);
if (typeof wSign === "function") {
var s = wSign(["THIRD SQUARE", "A pawn goes through by railway"], 3.4, 0.9, "#1E2A4A", "#F2E2B0");
s.position.set(5, 2.75, -134.24 + 140);
G.add(s);
}
});
lglZone(P, -62, -150, 6, function (B, G) {
for (var i = 0; i < 5; i++) {
lglFlower(B, -70 + i * 5, -150 + ((i * 7) % 6), ["tiger", "rose", "daisy", "violet", "larkspur"][i], 4 + ((i * 3) % 3));
}
lglTalker("An Elephant making honey", -62, -150, "one of the elephants that go about the giant flowers like bees making honey, with its trunk in a flower", "Hmmmm? Bzzz. One does get so sticky in the trunk.", "You hum like a bee and are very large and very gentle.", 5);
B.sub(-62, 0, -150, 0.8, 1, function () {
B.sph(1.5, 0x9A9AA4, 0, 2, 0, 1, 1, 1.4);
B.sph(0.9, 0x9A9AA4, 0, 2.8, 1.9);
[[-0.7, 1.1], [0.7, 1.1], [-0.7, -1.1], [0.7, -1.1]].forEach(function (p) { B.cyl(0.36, 0.4, 1.4, 0x8A8A94, p[0], 0.7, p[1], 8); });
B.cyl(0.14, 0.24, 1.8, 0x9A9AA4, 0, 2.2, 2.9, 7, 0.5);
B.sph(0.7, 0xA8A8B2, -1, 2.9, 1.6, 0.15, 1, 1);
B.sph(0.7, 0xA8A8B2, 1, 2.9, 1.6, 0.15, 1, 1);
});
lglRound(-62, -150, 2.4, 4);
});
},
function (G, B, x, z, lines, L) {
B.cyl(0.07, 0.09, 3, 0x4A3422, x, 1.5, z, 6);
B.sph(0.12, 0x4A3422, x, 3.05, z);
lines.forEach(function (t, i) { if (typeof wSign !== "function")
return; var s = wSign([t], 3, 0.5, "#F2E8D0", "#2A2018"); s.position.set(x - L.cx + 1.5, 2.6 - i * 0.62, z - L.cz + 0.06); G.add(s); var b = s.clone(); b.position.z -= 0.12; b.rotation.y = Math.PI; G.add(b); });
},
function (P, R) {
var C = LGL_C, n = function (k) { return P.lite ? Math.ceil(k * 0.45) : k; };
lglZone(P, 8, -191, 5, function (B, G) {
lglTree(B, 8, -193, "oak", 1.6, R);
lglRound(8, -193, 0.6, 5);
B.cyl(0.04, 0.06, 2.2, C.trunk, 8, 1.9, -191.6, 5, 1.2);
B.sub(8, 1.75, -190.7, 0, 1, function () {
B.sph(0.16, 0x4A4A3A, 0, 0.1, 0, 0.8, 0.8, 1.9);
B.sph(0.11, 0x3A3A2E, 0, 0.16, 0.32);
B.cyl(0.012, 0.012, 0.4, 0x2A2A22, 0, 0.14, 0.5, 3, 1.3);
[[-1, 0.1], [1, 0.1], [-1, -0.1], [1, -0.1], [-1, 0.25], [1, 0.25]].forEach(function (p) { B.cyl(0.012, 0.012, 0.36, 0x2A2A22, p[0] * 0.14, -0.04, p[1], 3, 0, p[0] * 0.6); });
B.sph(0.03, 0xC83030, 0.07, 0.2, 0.4);
B.sph(0.03, 0xC83030, -0.07, 0.2, 0.4);
});
var wing = new THREE.Mesh(new THREE.CircleGeometry(0.34, 10), new THREE.MeshBasicMaterial({ color: 0xEAF4FF, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false }));
wing.scale.set(0.5, 1.4, 1);
wing.rotation.x = -Math.PI / 2;
wing.position.set(0, 1.98, -190.8 + 191);
G.add(wing);
wing.userData.ldAnim = function (m, t) { m.rotation.z = Math.sin(t * 9) * 0.5; };
lglTalker("The Gnat", 8, -190.6, "the Gnat, about the size of a chicken, who makes sad little jokes in a very small voice and sighs", "I know you are a friend, a dear friend, and an old friend. And you won't hurt me, though I AM an insect.", "You tell of the Rocking-horse-fly, the Snap-dragon-fly and the Bread-and-butter-fly, and wish the dreamer had made your jokes.", 3);
B.blob(0.8, C.leaf, 11.4, 0.6, -189.6, 1, 0.8, 1);
B.sub(11.4, 1.25, -189.6, 0.6, 0.5, function () { B.box(0.3, 0.3, 0.9, 0xC87A3A, 0, 0.4, 0); B.box(0.2, 0.4, 0.3, 0xC87A3A, 0, 0.7, 0.5, 0, 0.4); B.tor(0.55, 0.04, 0xE8C050, -0.14, 0.02, 0, 0, Math.PI / 2, Math.PI, Math.PI); B.tor(0.55, 0.04, 0xE8C050, 0.14, 0.02, 0, 0, Math.PI / 2, Math.PI, Math.PI); });
B.sub(5.6, 2.3, -189.8, -0.5, 0.6, function () { B.sph(0.2, 0x5A2A1A, 0, 0, 0, 1, 0.9, 1.2); B.sph(0.12, 0xF2A030, 0, 0.05, 0.26); B.box(0.5, 0.02, 0.2, 0x3F8A3C, 0.3, 0.1, 0, 0, 0, 0.3); B.box(0.5, 0.02, 0.2, 0x3F8A3C, -0.3, 0.1, 0, 0, 0, -0.3); });
B.sub(9.2, 0.12, -188.6, 0.3, 0.6, function () { B.box(0.4, 0.03, 0.4, 0xF2E2B0, 0.24, 0.14, 0, 0, 0, 0.5); B.box(0.4, 0.03, 0.4, 0xF2E2B0, -0.24, 0.14, 0, 0, 0, -0.5); B.box(0.08, 0.08, 0.4, 0xC8A060, 0, 0.06, 0); B.sph(0.07, 0xFFFFFF, 0, 0.08, 0.24); });
});
lglZone(P, 0, -212, 2, function (B, G) {
lglWood(B, -33, 33, -226, -199, n(70), ["dark", "dark", "oak"], R, lglNear([[-4, -216, 3]], 3), 1.1);
lglCast(G, -4, -216, 0.5, lglMade(function (B2) { lglBeast(B2, { kind: "fawn", col: 0xC89060, len: 1.05, h: 0.72, neck: 0.42, w: 0.24, deep: 0.26, leg: 0.045 }); }), "The Fawn", "the Fawn of the wood where things have no names, with large gentle eyes and a soft sweet voice", "What do you call yourself? ... I'll tell you, if you'll come a little further on. I can't remember here.", "In this wood you cannot remember any names, neither yours nor the dreamer's; outside it you would cry 'I'm a Fawn! And, dear me! you're a human child!' and dart away.", 3);
});
lglZone(P, 0, -236, 9, function (B, G) {
var L = G.userData.lgl;
lglPost(G, B, -2.6, -227, ["TO TWEEDLEDUM'S HOUSE", "TO THE HOUSE OF TWEEDLEDEE"], L);
lglTree(B, 0, -238.4, "oak", 1.7, R);
lglRound(0, -238.4, 0.7, 5);
[["dum", -1.3], ["dee", 1.3]].forEach(function (t) {
var f = lglFigure("tweedle" + t[0], { sex: "m", look: { top: 0xC8A050, topKind: "coat", bottom: 0xF0EAD8, shoes: 0x2A1A12, skin: 0xF0C8A8, hair: 0x8A5A2A, hat: "cap", hatColor: 0x3A2A6A } }, function (B2) {
B2.sph(0.34, 0xC8A050, 0, 1.12, 0, 1, 0.95, 0.95);
B2.cyl(0.26, 0.26, 0.05, 0xFFFFFF, 0, 1.5, 0, 14);
B2.tor(0.3, 0.04, 0x6A2A2A, 0, 0.95, 0, Math.PI / 2);
});
f.scale.set(1.25, 0.8, 1.25);
lglCast(G, t[1], -235.5, 0, f, "Tweedle" + t[0], "Tweedle" + t[0] + ", one of two fat little schoolboy twins who stand with an arm round each other's neck, with '" + t[0].toUpperCase() + "' embroidered on his collar", t[0] === "dum" ? "If you think we're wax-works, you ought to pay, you know. Nohow!" : "Contrariwise, if you think we're alive, you ought to speak.", t[0] === "dum" ? "You often say 'Nohow!' and are furious about your nice new RATTLE being spoiled." : "You often say 'Contrariwise' and love reciting 'The Walrus and the Carpenter'.", 2.6);
if (typeof wSign === "function") {
var s = wSign([t[0].toUpperCase()], 0.5, 0.2, "#FFFFFF", "#1A1A1A");
s.position.set(t[1] - L.cx, 1.2, -235.5 - L.cz - 0.36);
s.rotation.y = Math.PI;
G.add(s);
}
});
lglTree(B, 26, -242, "dark", 1.3, R);
lglRound(26, -242, 0.5, 5);
var k = lglFigure("redking", { sex: "m", look: { top: C.red, topKind: "robe", bottom: C.red, shoes: 0x3A0A0A, skin: 0xE8C0A0, hair: 0x8A8A8A, beard: "full", hat: "none" } }, function (B2) { B2.cone(0.15, 0.6, C.red, 0, 2.05, -0.08, 8, -0.5); B2.sph(0.06, C.gold, 0, 2.26, -0.36); });
k.rotation.x = -Math.PI / 2 + 0.12;
k.position.y = 0.3;
lglCast(G, 24, -241.2, 0, k, "The Red King", "the Red King, fast asleep and snoring under a tree, dreaming", "Zzzzz ... hnnnk ... zzzzz.", "You are asleep and dreaming the dreamer; you only snore and mutter in your sleep, and must never wake.", 3);
k.rotation.set(-Math.PI / 2 + 0.12, 0, 0);
k.rotation.order = "YXZ";
k.rotation.y = Math.PI / 2;
lglWood(B, 10, 33, -248, -229, n(16), ["oak", "dark", "blossom"], R, lglNear([[24, -240, 4.5], [7, -240.5, 2]], 3));
lglWood(B, -12, -33, -229, -226.5, n(6), ["oak", "blossom"], R);
});
lglZone(P, -32, -238, 8, function (B, G) {
B.cyl(9.5, 9.5, 0.08, C.sand, -32, 0.06, -237, 24);
for (var i = 0; i < 7; i++)
B.blob(0.5 + R() * 0.5, i % 2 ? C.stone : C.stoneD, -40 + R() * 4, 0.3, -232 - R() * 10, 1, 0.7, 1);
var sea = new THREE.Mesh(new THREE.CircleGeometry(6, 24, Math.PI * 0.5, Math.PI), lglGlassMat(0x7FC4DC, 0.85));
sea.rotation.x = -Math.PI / 2;
sea.position.set(-32 - (-32) - 4.5, 0.11, -237 - (-238));
G.add(sea);
lglCast(G, -36, -235, 0.9, lglMade(function (B2) {
B2.sph(0.75, 0x7A5A44, 0, 0.95, 0, 1, 1.25, 0.95);
B2.sph(0.42, 0x8A6A52, 0, 2.05, 0.1, 1.1, 1, 1);
B2.sph(0.24, 0xA88A70, -0.16, 1.92, 0.42, 1, 0.8, 0.8);
B2.sph(0.24, 0xA88A70, 0.16, 1.92, 0.42, 1, 0.8, 0.8);
B2.cone(0.05, 0.5, 0xF8F4E4, -0.14, 1.62, 0.46, 6, Math.PI);
B2.cone(0.05, 0.5, 0xF8F4E4, 0.14, 1.62, 0.46, 6, Math.PI);
B2.sph(0.04, 0x1A1410, -0.16, 2.2, 0.42);
B2.sph(0.04, 0x1A1410, 0.16, 2.2, 0.42);
B2.sph(0.78, 0x3A4A6A, 0, 0.9, -0.04, 1.02, 1.1, 0.95);
B2.sph(0.3, 0x7A5A44, -0.8, 1.1, 0.1, 0.6, 1.3, 0.7);
B2.sph(0.3, 0x7A5A44, 0.8, 1.1, 0.1, 0.6, 1.3, 0.7);
B2.sph(0.34, 0x6A4A38, -0.3, 0.12, 0.3, 1, 0.4, 1.5);
B2.sph(0.34, 0x6A4A38, 0.3, 0.12, 0.3, 1, 0.4, 1.5);
B2.box(0.3, 0.3, 0.02, 0xFFFFFF, 0.74, 1.5, 0.4, 0.4);
}), "The Walrus", "the Walrus of the poem 'The Walrus and the Carpenter', who weeps for the oysters with his pocket-handkerchief before his streaming eyes", "The time has come, to talk of many things: of shoes, and ships, and sealing-wax, of cabbages, and kings.", "You speak in the poem's rhythm when you can, and are sentimental and greedy.", 3.4);
lglCast(G, -33.4, -236.6, -0.4, lglFigure("carpenter", { sex: "m", look: { top: 0xD8D0C0, topKind: "shirt", bottom: 0x5A4A3A, shoes: 0x2A1A12, skin: 0xE0B898, hair: 0x3A2A1A, beard: "short", hat: "none", layer: "apron", layerColor: 0xE8E0D0 } }, function (B2) { B2.box(0.3, 0.16, 0.3, 0xFAF6EA, 0, 1.92, 0); B2.box(0.06, 0.4, 0.06, 0x7A5234, 0.36, 1.0, 0.16); B2.box(0.22, 0.1, 0.1, 0x5A5A62, 0.36, 1.22, 0.16); }), "The Carpenter", "the Carpenter of the poem 'The Walrus and the Carpenter', in a square paper cap, who says little and eats much", "The butter's spread too thick! Cut us another slice.", "You are blunt and only ever talk about bread, butter, and whether the sand could be swept away.", 3);
B.box(1.6, 0.5, 0.9, C.stoneD, -34.6, 0.3, -237.6);
B.cyl(0.3, 0.3, 0.05, 0xF4E8C8, -34.6, 0.58, -237.6, 12);
B.box(0.2, 0.16, 0.14, 0xC89A50, -34.3, 0.66, -237.4);
lglSolid(-34.6, -237.6, 0.9, 0.5, 0.6);
});
},
function (P, R) {
var C = LGL_C, n = function (k) { return P.lite ? Math.ceil(k * 0.45) : k; };
lglZone(P, 0, -248.5, 1.5, function (B, G) {
lglCast(G, 0, -248.5, 0, lglFigure("whitequeen", { sex: "f", look: { top: 0xF8F8F4, topKind: "dress", bottom: 0xF8F8F4, shoes: 0xD8D8D8, skin: 0xF0D8C0, hair: 0xECECEC, hairStyle: "long", hat: "none" } }, function (B2) {
lglSkirt(B2, 0xF8F8F4, 0xD8D8E0, 1.02, 0.62);
lglCrown(B2, 0xE8E8F0, 1.86, 0.16, 7);
B2.box(0.9, 0.02, 0.7, 0xE8D8F0, 0.08, 1.42, -0.12, 0.5, 0.3, 0.2);
B2.blob(0.12, 0xECECEC, 0.16, 1.84, -0.1);
B2.box(0.04, 0.2, 0.04, 0x8A6A4A, -0.12, 1.9, -0.12, 0, 0, 0.6);
}), "The White Queen", "the White Queen, kind, muddled, untidy, with her shawl pinned all crooked and a brush tangled in her hair, who lives backwards and remembers things before they happen", "Bread-and-butter, bread-and-butter ... Oh! Am I addressing the White Queen? Well, yes, if you call that a-dressing.", "You remember best the things that happened the week after next.");
});
lglZone(P, 0, -271, 7, function (B, G) {
var L = G.userData.lgl, w = 0x4A3A32, i, j;
B.box(9.4, 0.1, 8.4, 0x3A2A22, 0, 0.05, -271);
var wall = function (x, z, hw, hd) { B.box(hw * 2, 3.4, hd * 2, w, x, 1.7, z); lglSolid(x, z, hw, hd, 3.4); };
wall(0, -275.1, 4.7, 0.2);
wall(-4.6, -271, 0.2, 4.2);
wall(4.6, -273, 0.2, 2.2);
wall(-2.9, -266.9, 1.8, 0.2);
wall(2.9, -266.9, 1.8, 0.2);
B.box(2.2, 0.9, 0.4, w, 0, 2.95, -266.9);
B.box(9.8, 0.2, 8.8, 0x2A2420, 0, 3.5, -271);
lglRoof(B, 10.6, 9.6, 2.2, 0x6A3A3A, 0, 3.6, -271);
lglCeil(G, 9, 8, 0x4A3A30, 0, 3.38, -271);
B.cyl(0.03, 0.03, 0.8, 0x2A2420, 0, 3, -270, 4);
B.sph(0.16, 0xFFE0A0, 0, 2.56, -270);
if (typeof ldHalo === "function")
ldHalo(G, 0, 2.56, 1, 0xFFD890, 2.4, 0.5);
B.box(1.2, 0.7, 0.7, C.woodD, 3.6, 0.35, -268.4);
B.box(1, 0.5, 0.6, 0x8A6A4A, -3.4, 0.25, -268.2);
for (i = 0; i < 4; i++)
B.sph(0.2, [0xC83A3A, 0xE8C050, 0x3A6AC8, 0x6AB86A][i], 3.3 + (i % 2) * 0.5, 0.9, -268.6 + Math.floor(i / 2) * 0.4);
B.cyl(0.3, 0.36, 0.9, 0x6A4A2A, -3.8, 0.45, -273.8, 10);
B.box(0.06, 1.6, 0.06, C.woodD, 3.9, 0.8, -274.2);
B.box(0.5, 0.5, 0.04, 0x9A2A3A, 3.9, 1.3, -274.1);
B.box(2.4, 1.3, 0.08, 0xC8DCE8, -2.9, 1.8, -266.78);
B.box(2.4, 1.3, 0.08, 0xC8DCE8, 2.9, 1.8, -266.78);
B.box(3.6, 0.5, 0.1, 0x2A4A3A, 0, 3.1, -266.7);
if (typeof wSign === "function") {
var s = wSign(["WOOL & WATER"], 3.4, 0.45, "#2A4A3A", "#F2E2B0");
s.position.set(0, 3.1, -266.62 - L.cz);
G.add(s);
}
B.box(6, 1, 0.8, C.woodD, 0, 0.5, -272);
B.box(6.2, 0.08, 1, C.wood, 0, 1.04, -272);
lglSolid(0, -272, 3, 0.45, 1.1);
for (j = 0; j < 3; j++) {
B.box(8.6, 0.06, 0.5, C.wood, 0, 1.1 + j * 0.7, -274.7);
for (i = 0; i < 11; i++) {
var cx = -3.9 + i * 0.78 + ((i * j) % 3) * 0.05, y = 1.13 + j * 0.7, col = [0xC83A3A, 0x3A6AC8, 0xE8C050, 0x6AB86A, 0xB86AB8, 0xF4EEDD][(i + j * 2) % 6], k = (i * 3 + j) % 4;
if (k === 0)
B.cyl(0.1, 0.13, 0.3, col, cx, y + 0.15, -274.7, 8);
else if (k === 1)
B.box(0.22, 0.26, 0.2, col, cx, y + 0.13, -274.7, i);
else if (k === 2)
B.sph(0.13, col, cx, y + 0.13, -274.7);
else
B.cone(0.12, 0.3, col, cx, y + 0.15, -274.7, 6);
}
}
B.sph(0.1, 0xFAF4E0, 1.8, 1.92, -274.7, 0.8, 1.05, 0.8);
[[-4.3, -270], [-4.3, -272.4]].forEach(function (p) { B.box(0.4, 2.6, 1.6, C.woodD, p[0], 1.3, p[1]); for (i = 0; i < 3; i++)
B.sph(0.14, [0xC83A3A, 0xE8C050, 0x3A6AC8][i], p[0] + 0.1, 0.6 + i * 0.8, p[1] + ((i % 2) ? 0.3 : -0.3)); });
for (i = 0; i < 5; i++)
B.sph(0.16, [0xC83A3A, 0x3A6AC8, 0xE8C050, 0xF4EEDD, 0x6AB86A][i], -1.8 + i * 0.5, 1.22, -271.9);
lglCast(G, 0, -273.2, 0, lglMade(function (B2) {
B2.sub(0, 0.25, 0, 0, 1, function () { lglBeast(B2, { kind: "sheep", col: 0xF4F0E6, len: 1.1, h: 0.75, neck: 0.45, w: 0.36 }); });
B2.cone(0.2, 0.2, 0xFFFFFF, 0, 1.62, 0.5, 10);
for (var q = 0; q < 6; q++)
B2.cyl(0.008, 0.008, 0.6, 0xD8D8E0, -0.3 + q * 0.12, 1.0, 0.85, 3, 1.1, (q - 2.5) * 0.15);
B2.sph(0.14, 0x3A6AC8, 0, 0.95, 0.95);
}), "The Sheep", "the old Sheep who keeps the little dark shop, knitting with fourteen pairs of needles at once, in a cap and great spectacles", "What is it you want to buy? You may look in front of you, and on both sides, if you like; but you can't look ALL round you, unless you've got eyes at the back of your head.", "You cry 'Feather! Feather!' when anyone rows, and never put things into people's hands: they must get them for themselves.");
});
lglZone(P, 22, -287, 10, function (B, G) {
var water = new THREE.Mesh(new THREE.CircleGeometry(9, 30), lglGlassMat(0x86C8DC, 0.88));
water.rotation.x = -Math.PI / 2;
water.scale.set(0.8, 1.1, 1);
water.position.set(22 - 22, 0.1, -287 + 287);
G.add(water);
for (var i = 0; i < 26; i++) {
var a = i / 26 * 6.283, rx = 22 + Math.cos(a) * 7.6, rz = -287 + Math.sin(a) * 10.3;
if (i % 3 === 0)
B.blob(0.5, C.stone, rx, 0.2, rz, 1, 0.6, 1);
for (var q = 0; q < n(5); q++) {
var h = 0.9 + R() * 0.8, x = rx + (R() - 0.5) * 1.2, z = rz + (R() - 0.5) * 1.2;
B.cyl(0.015, 0.025, h, 0x5A9A4A, x, h / 2, z, 4, (R() - 0.5) * 0.3);
if (q % 2)
B.sph(0.05, 0x7A5A3A, x, h, z, 1, 2.6, 1);
}
}
B.sub(22, 0.16, -286, 0.5, 1, function () {
B.sph(1, 0x7A5234, 0, 0.2, 0, 0.75, 0.42, 2.1, 12);
B.sph(0.9, 0x9A7248, 0, 0.32, 0, 0.68, 0.25, 1.95);
B.box(1.3, 0.06, 0.3, C.woodD, 0, 0.42, 0.3);
B.box(1.3, 0.06, 0.3, C.woodD, 0, 0.42, -0.7);
B.cyl(0.03, 0.03, 2.6, C.wood, 0.9, 0.5, 0, 5, 0, Math.PI / 2 - 0.2);
B.cyl(0.03, 0.03, 2.6, C.wood, -0.9, 0.5, 0, 5, 0, -Math.PI / 2 + 0.2);
B.box(0.5, 0.03, 0.2, C.wood, 2.1, 0.25, 0);
B.box(0.5, 0.03, 0.2, C.wood, -2.1, 0.25, 0);
});
lglTree(B, 31, -281, "willow", 1.2, R);
lglRound(31, -281, 0.5, 5);
lglTree(B, 30, -296, "blossom", 1.1, R);
lglRound(30, -296, 0.4, 5);
lglBed(B, 14, -300, 10, 8, n(70), [0xFFFFFF, 0xF7B8CE, 0xF2C230], R);
});
lglZone(P, -20, -290, 6, function (B, G) {
lglWood(B, -33, -8, -316, -256, n(22), ["oak", "blossom", "poplar"], R);
lglWood(B, 8, 33, -318, -300, n(8), ["oak", "blossom"], R);
lglPiece(B, "rook", 0, -18, -300, 2.2, 0.3);
lglRound(-18, -300, 1.3, 4);
lglWalker(G, "pawn", 1, -12, -284, "A Red Pawn", "a Red Pawn of the chessboard country, marching one square at a time", "One square at a time, that's my rule. Two, the first go.", 9);
lglWalker(G, "bishop", 1, 12, -308, "The Red Bishop", "a Red Bishop of the chessboard country", "Cornerwise is the only way to travel.", 8);
});
},
function (P, R) {
var C = LGL_C, n = function (k) { return P.lite ? Math.ceil(k * 0.45) : k; };
lglZone(P, 0, -349, 5, function (B, G) {
var i, j;
for (j = 0; j < 7; j++)
for (i = 0; i < 16; i++) {
var bx = -11.25 + i * 1.5 + (j % 2 ? 0.75 : 0);
if (bx > 11.4)
continue;
B.box(1.44, 0.42, 0.7, (i + j) % 3 ? C.brick : 0xA24A32, bx, 0.22 + j * 0.45, -349);
}
B.box(24, 0.16, 1, C.stone, 0, 3.24, -349);
lglSolid(0, -349, 12, 0.4, 3.4);
lglCast(G, 0, -349, 0, lglMade(function (B2) {
var e = 0xFAF2DC;
B2.sph(0.8, e, 0, 4.3, 0, 1, 1.25, 1, 18);
B2.sph(0.07, 0x1A1410, -0.26, 4.62, 0.7);
B2.sph(0.07, 0x1A1410, 0.26, 4.62, 0.7);
B2.sph(0.1, 0xF0D8B8, 0, 4.4, 0.8, 1, 1, 1.2);
B2.tor(0.36, 0.035, 0xA83030, 0, 4.3, 0.66, 0.25, 0, Math.PI, Math.PI);
B2.cyl(0.02, 0.02, 0.2, 0x3A2A1A, -0.26, 4.76, 0.66, 4, 0, 0.4);
B2.cyl(0.02, 0.02, 0.2, 0x3A2A1A, 0.26, 4.76, 0.66, 4, 0, -0.4);
B2.tor(0.74, 0.09, 0x3A6AC8, 0, 3.86, 0, Math.PI / 2);
B2.box(0.34, 0.2, 0.1, 0x3A6AC8, -0.2, 3.84, 0.76, 0, 0, 0.3);
B2.box(0.34, 0.2, 0.1, 0x3A6AC8, 0.2, 3.84, 0.76, 0, 0, -0.3);
B2.sph(0.08, C.gold, 0, 3.86, 0.8);
B2.cyl(0.07, 0.06, 0.8, 0xC8A050, -0.86, 4.0, 0.1, 6, 0, 0.5);
B2.cyl(0.07, 0.06, 0.8, 0xC8A050, 0.86, 4.0, 0.1, 6, 0, -0.5);
B2.sph(0.1, 0xF0D8B8, -1.06, 3.66, 0.12);
B2.sph(0.1, 0xF0D8B8, 1.06, 3.66, 0.12);
B2.cyl(0.1, 0.09, 0.9, 0x5A4A3A, -0.2, 3.42, 0.42, 6, 1.4, 0.5);
B2.cyl(0.1, 0.09, 0.9, 0x5A4A3A, 0.2, 3.42, 0.42, 6, 1.4, -0.5);
B2.sph(0.14, 0x2A1A12, 0.44, 3.36, 0.8, 1, 0.7, 1.6);
B2.sph(0.14, 0x2A1A12, -0.44, 3.36, 0.8, 1, 0.7, 1.6);
}), "Humpty Dumpty", "Humpty Dumpty, an enormous egg with a face, sitting cross-legged on top of a high narrow wall, proud, touchy and certain the King has promised to send all his horses and all his men", "Some people have no more sense than a baby! My name means the shape I am, and a good handsome shape it is, too.", "When you use a word, it means just what you choose it to mean, neither more nor less. You explain hard words and pay them extra on Saturday nights.", 4.5);
lglBed(B, 0, -345.6, 22, 3, n(120), [0xF2C230, 0xFFFFFF, 0xC81E3A], R);
lglTree(B, -15, -348, "poplar", 1.2, R);
lglTree(B, 15, -348, "poplar", 1.2, R);
lglRound(-15, -348, 0.4, 5);
lglRound(15, -348, 0.4, 5);
});
lglZone(P, -6, -372, 5, function (B, G) {
lglWood(B, -33, 20, -388, -354, n(46), ["oak", "oak", "dark", "poplar"], R, lglNear([[0, -370, 5], [-3, -372, 3], [14, -374, 4]], 3));
for (var i = 0; i < n(12); i++) {
var x = -26 + R() * 40, z = -386 + R() * 26, fallen = i % 3 === 0;
if (Math.abs(x) < 4)
x += 8;
B.sub(x, fallen ? 0.3 : 0, z, R() * 6, 0.8, function () { if (fallen) {
B.base.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
} lglPiece(B, "pawn", 0, 0, 0, 1); B.cyl(0.03, 0.03, 2.6, C.woodD, 0.4, 1.3, 0, 4); B.cone(0.07, 0.24, C.silver, 0.4, 2.7, 0, 5); });
}
lglCast(G, 0, -370, 0, lglFigure("whiteking", { sex: "m", look: { top: 0xF4F4F0, topKind: "robe", bottom: 0xF4F4F0, shoes: 0xD8D8D8, skin: 0xF0D0B0, hair: 0xE0E0E0, beard: "full", hat: "none" } }, function (B2) { lglCrown(B2, 0xE8E8F0, 1.86, 0.2, 5); B2.box(0.06, 0.3, 0.06, 0xE8E8F0, 0, 2.2, 0); B2.box(0.2, 0.06, 0.06, 0xE8E8F0, 0, 2.24, 0); B2.box(0.26, 0.34, 0.05, 0x7A1E2A, 0.34, 1.18, 0.2, 0.3); }), "The White King", "the White King, timid and fussy, who keeps a memorandum-book and has sent four thousand two hundred and seven soldiers into the wood", "I've sent them all! Four thousand two hundred and seven, that's the exact number. I couldn't send all the horses, you know, because two of them are wanted in the game.", "You feel faint and want ham sandwiches, or hay: there's nothing like eating hay when you're faint.");
lglCast(G, -3, -372, 0.4, lglFigure("haigha", { sex: "m", look: { top: 0xB8A070, topKind: "shirt", bottom: 0x6A5A3A, shoes: 0x3A2A1A, skin: 0xD8C0A0, hair: 0xB89A6A, hat: "none" } }, function (B2) { B2.cone(0.05, 0.5, 0xC8B088, -0.07, 2.06, 0, 5, 0, 0.12); B2.cone(0.05, 0.5, 0xC8B088, 0.07, 2.06, 0, 5, 0, -0.12); B2.box(0.34, 0.3, 0.14, 0x8A6A3A, -0.36, 0.98, 0.1); B2.sph(0.03, 0xFFFFFF, 0, 1.66, 0.11); }), "Haigha", "Haigha, the White King's Anglo-Saxon Messenger, with the long ears of a hare, who goes along in curious Anglo-Saxon attitudes, wriggling like an eel with his great hands spread out like fans, and carries ham sandwiches and hay in a bag round his neck", "I'll whisper it. They're at it again!", "Your name rhymes with 'mayor'. You are happy; the other Messenger is Hatta.", 2.8);
});
lglZone(P, 30, -378, 7, function (B, G) {
lglCast(G, 27, -379.4, 0.6, lglMade(function (B2) { lglBeast(B2, { kind: "lion", col: 0xD8A850, dark: 0x8A5A22, len: 1.9, h: 1.2, w: 0.44, deep: 0.46, neck: 0.4, leg: 0.11, lean: 0.3 }); }), "The Lion", "the Lion who fights the Unicorn for the crown, very tired and sleepy, with great hollow-bell voice, in spectacles", "Are you animal, vegetable, or mineral? Then hand round the plum-cake, Monster.", "You call the dreamer 'Monster', and think you beat the Unicorn all round the town.", 3.2);
lglCast(G, 33.5, -379, -0.6, lglMade(function (B2) { lglBeast(B2, { kind: "unicorn", col: 0xFAFAF6, dark: 0xD8D8E0, len: 1.8, h: 1.25, w: 0.36, neck: 0.6, leg: 0.08, hoof: C.gold }); }), "The Unicorn", "the Unicorn who fights the Lion for the crown, proud and cheerful, who always thought children were fabulous monsters", "What is this? ... Well, now that we HAVE seen each other, if you'll believe in me, I'll believe in you. Is that a bargain?", "You call the dreamer 'Monster' kindly, and want plum-cake, not brown bread.", 3.2);
B.cyl(0.6, 0.5, 0.1, 0xF4EEDD, 30, 0.5, -381.6, 16);
B.cyl(0.42, 0.42, 0.3, 0x5A2A1A, 30, 0.7, -381.6, 14);
B.cyl(0.44, 0.44, 0.05, 0xFAF6EA, 30, 0.87, -381.6, 14);
B.box(0.04, 0.02, 0.5, C.silver, 30.5, 0.56, -381.5);
B.box(0.8, 0.45, 0.8, C.stoneD, 30, 0.22, -381.6);
lglCast(G, 24.5, -374, 1.2, lglFigure("hatta", { sex: "m", look: { top: 0x5A6A8A, topKind: "coat", bottom: 0xC8B890, shoes: 0x2A1A12, skin: 0xE8C8A8, hair: 0x8A6A3A, hat: "tophat", hatColor: 0x2A2A32 } }, function (B2) { B2.box(0.14, 0.1, 0.01, 0xFFFFFF, 0.1, 2.02, 0.13); B2.cyl(0.06, 0.045, 0.08, 0xFAFAF6, 0.36, 1.1, 0.2, 8); B2.box(0.16, 0.02, 0.16, 0xE8C890, -0.36, 1.1, 0.2); }), "Hatta", "Hatta, the White King's other Messenger, only just out of prison (he hadn't finished his tea when he was sent in), with a teacup in one hand and a piece of bread-and-butter in the other, wearing a tall hat with a price ticket in the band", "They're getting on very well. Each of them has been down about eighty-seven times.", "You speak with your mouth full and weep a tear or two; in prison they only gave you oyster-shells.", 2.8);
[[18, -386], [36, -387]].forEach(function (p) { B.cyl(0.9, 0.9, 0.9, C.red, p[0], 0.9, p[1], 16, Math.PI / 2); B.cyl(0.92, 0.92, 0.06, 0xFAF6EA, p[0], 0.9, p[1] + 0.46, 16, Math.PI / 2); B.tor(0.9, 0.05, C.gold, p[0], 0.9, p[1] + 0.4); B.tor(0.9, 0.05, C.gold, p[0], 0.9, p[1] - 0.4); lglRound(p[0], p[1], 0.9, 2); });
});
[[54, -358, "cottage"], [54, -374, "house"], [86, -358, "manor"], [86, -378, "cottage"]].forEach(function (h) { P.k(h[2], h[0], h[1], h[0] < 70 ? -Math.PI / 2 : Math.PI / 2, 1); });
P.k("teahouse", 66, -336, 0, 1);
P.k("teahouse", 84, -336, 0, 1);
P.k("clocktower", 70, -369, 0, 0.9);
P.k("mirrormaze", 96, -352, 0, 1);
P.k("reflectpool", 70, -362, 0, 0.8);
P.ring("mirrorstand", 8, 9, 70, -369, 1, null, 1);
P.path([[60, -366], [84, -366]], 4, C.gravel, "ornatelamp", 10);
P.path([[70, -342], [70, -362]], 3, C.gravel);
P.person("glazier", 64, -366, -Math.PI / 2, { sex: "f", look: { top: 0x3A5AA8, topKind: "dress", bottom: 0x3A5AA8, hair: 0x2A1A10, hat: "brimmed", hatColor: 0xE8E0D0 } }, ldWho("The looking-glass maker", "Looking-Glass Town", "the looking-glass maker of the old town that the Lion and the Unicorn fight all round, who silvers every glass in the country", "Mind the Lion and the Unicorn: they've been round the town twice this morning. White bread or brown?"), { r: 8 });
P.person("drummer", 76, -368, Math.PI / 2, { sex: "m", look: { top: C.red, topKind: "coat", bottom: 0xF4F4F0, hair: 0x3A2A1A, hat: "cap", hatColor: C.red } }, ldWho("The town drummer", "Looking-Glass Town", "the drummer of the old town, who drums the Lion and the Unicorn out of town when they have had their cake", "Some gave them white bread and some gave them brown; some gave them plum-cake and drummed them out of town. That last part's me."), { r: 8 });
},
function (P, R) {
var C = LGL_C, n = function (k) { return P.lite ? Math.ceil(k * 0.45) : k; };
lglZone(P, 0, -425, 3, function (B, G) {
lglWood(B, -33, 33, -452, -398, n(80), ["oak", "dark", "oak", "poplar"], R, lglNear([[-4.5, -405, 6], [4.5, -405, 6], [2, -448, 4]], 3));
var knight = function (seed, red, x, z, ry, name, who, greet, extra) {
var a = red ? C.red : 0xDCE2EA, d = red ? C.redD : 0xAEB6C2;
lglCast(G, x, z, ry, lglFigure(seed, { sex: "m", look: { top: a, topKind: "coat", bottom: a, shoes: d, skin: 0xE8C8A8, hair: red ? 0x3A1A10 : 0xF0F0E8, beard: red ? "short" : "full", hat: "helmet", hatColor: a } }, function (B2) {
B2.sph(0.3, a, 0, 1.3, 0, 1, 1.05, 0.8);
B2.tor(0.2, 0.03, d, 0, 1.02, 0, Math.PI / 2);
B2.sph(0.13, a, -0.27, 1.5, 0);
B2.sph(0.13, a, 0.27, 1.5, 0);
if (red) {
B2.box(0.16, 0.3, 0.4, a, 0, 2.06, 0.1, 0, 0.5);
B2.cone(0.04, 0.14, d, -0.06, 2.3, -0.02, 4);
B2.cone(0.04, 0.14, d, 0.06, 2.3, -0.02, 4);
B2.cyl(0.05, 0.11, 1, C.woodD, 0.4, 1.3, 0.2, 6, 0.3);
}
else {
B2.cyl(0.02, 0.02, 0.5, 0xF0F0E8, 0, 1.5, 0.14, 3);
B2.box(0.4, 0.3, 0.26, 0xC8A870, 0, 1.4, -0.3);
B2.cyl(0.14, 0.18, 0.28, 0xE8C050, -0.34, 1.0, -0.1, 8);
}
}), name, who, greet, extra);
B.sub(x + (red ? -1.8 : 1.8), 0, z - 0.6, ry, 1.1, function () {
lglBeast(B, { kind: "horse", col: red ? 0x8A2A22 : 0xF4F2EA, dark: red ? 0x5A1A14 : 0xC8C8D0, len: 1.8, h: 1.25, neck: 0.6, leg: 0.08 });
B.box(0.5, 0.12, 0.6, red ? C.redD : 0x6A4A2A, 0, 1.7, 0);
if (!red) {
for (var q = 0; q < 4; q++)
B.tor(0.1, 0.03, C.silver, (q % 2 ? 0.22 : -0.22), 0.3, (q < 2 ? 0.65 : -0.65), Math.PI / 2);
B.box(0.3, 0.3, 0.4, 0xC8A870, 0.34, 1.4, -0.4);
B.cone(0.16, 0.3, 0xE8C050, -0.36, 1.5, -0.3, 8);
B.cyl(0.02, 0.02, 0.5, 0xF28A30, 0.4, 1.3, 0.3, 3, 0, 0.8);
}
});
lglRound(x + (red ? -1.8 : 1.8), z - 0.6, 0.9, 2);
};
knight("redknight", 1, -4.5, -405, 0.5, "The Red Knight", "the Red Knight in crimson armour, whose helmet is shaped like a horse's head, and who tumbles off his horse whenever he stops", "Ahoy! Ahoy! Check! You're my prisoner!", "You observe the Rules of Battle and always fall on your head.");
knight("whiteknight", 0, 4.5, -405, -0.5, "The White Knight", "the White Knight in tin armour that fits him badly, with shaggy hair, a gentle face and mild blue eyes, a queer little deal box upside down on his shoulders, and a horse hung with a bee-hive, a mouse-trap, anklets against sharks, carrots and fire-irons; he keeps falling off, and everything is his own invention", "It was a glorious victory, wasn't it? I'll see you safe to the end of the wood, and then I must go back, you know. That's the end of my move.", "You are kind and foolish and proud of your inventions: a plan to keep hair from falling off, a new pudding of blotting-paper, a way of getting over a gate. You sing 'A-sitting On A Gate'.");
lglTalker("The White Knight", 2, -448, "the White Knight at the end of the wood, about to sing his song", "You are sad: let me sing you a song to comfort you. It's long, but it's very, VERY beautiful.", "", 3);
[[-1.8, -420, 0xE8C050], [1.6, -431, 0xF28A30], [-1.4, -440, 0x8A8A92]].forEach(function (p) { B.box(0.3, 0.2, 0.24, p[2], p[0], 0.1, p[1], p[0]); });
B.box(0.14, 1.4, 0.14, C.woodD, 3.4, 0.7, -449.4);
B.box(0.14, 1.4, 0.14, C.woodD, 6.2, 0.7, -449.4);
for (var i = 0; i < 4; i++)
B.box(2.8, 0.1, 0.08, C.wood, 4.8, 0.3 + i * 0.32, -449.4);
B.box(3, 0.08, 0.08, C.wood, 4.8, 0.7, -449.4, 0, 0, 0.42);
lglSolid(4.8, -449.4, 1.5, 0.1, 1.4);
});
},
function (P, R) {
var C = LGL_C, n = function (k) { return P.lite ? Math.ceil(k * 0.45) : k; };
lglZone(P, 0, -476, 6, function (B, G) {
B.cyl(13, 13, 0.06, 0xA6DC84, 0, 0.05, -474, 30);
[[-7, -468], [7, -468], [-9, -477], [9, -477], [-5, -486], [5, -486]].forEach(function (p, i) { B.tor(1.4, 0.16, C.stone, p[0], 0.1, p[1], Math.PI / 2); lglBed(B, p[0], p[1], 2.2, 2.2, n(34), [[0xC81E3A, 0xE03A58], [0xFFFFFF, 0xF7B8CE], [0xF2C230, 0xF28A30]][i % 3], R); });
[[-12, -466], [12, -466], [-13, -484], [13, -484]].forEach(function (p) { lglTree(B, p[0], p[1], "blossom", 1.2, R); lglRound(p[0], p[1], 0.4, 5); });
var q = function (seed, red, x, name, who, greet) {
var a = red ? C.red : 0xF8F8F4, d = red ? C.redD : 0xD8D8E0;
lglCast(G, x, -481, 0, lglFigure(seed, { sex: "f", look: { top: a, topKind: "dress", bottom: a, shoes: d, skin: red ? 0xE8C8A8 : 0xF0D8C0, hair: red ? 0x2A1A14 : 0xECECEC, hairStyle: red ? "bun" : "long", hat: "none" } }, function (B2) { lglSkirt(B2, a, d, 1.02, 0.62); lglCrown(B2, red ? C.gold : 0xE8E8F0, 1.86, red ? 0.2 : 0.16, 7); if (!red)
B2.box(0.9, 0.02, 0.7, 0xE8D8F0, 0.08, 1.42, -0.12, 0.5, 0.3, 0.2); }), name, who, greet, "You are in the Eighth Square with the other Queen, examining the dreamer, who has just become a Queen.");
};
q("redqueen8", 1, -2.2, "The Red Queen", "the Red Queen in the Eighth Square, who examines Alice before she may be a Queen", "Speak when you're spoken to! Always speak the truth, think before you speak, and write it down afterwards.");
q("whitequeen8", 0, 2.2, "The White Queen", "the White Queen in the Eighth Square, who is sleepy and good-tempered and can do Addition if you give her time, but not Subtraction under ANY circumstances", "What's one and one and one and one and one and one and one and one and one and one?");
});
lglZone(P, 0, -507, 12, function (B, G) {
var L = G.userData.lgl, i, st = 0xEDE6D6;
B.box(13, 0.12, 26, 0xD8C8A8, 0, 0.06, -507.5);
for (i = 0; i < 12; i++)
for (var j = 0; j < 6; j++)
if ((i + j) % 2)
B.box(2, 0.02, 2, 0x8A2A2A, -5 + j * 2, 0.13, -496.5 - i * 2);
var wall = function (x, z, hw, hd, h) { B.box(hw * 2, h || 6, hd * 2, st, x, (h || 6) / 2, z); lglSolid(x, z, hw, hd, h || 6); };
wall(-4.2, -494.6, 2.5, 0.4);
wall(4.2, -494.6, 2.5, 0.4);
wall(-6.5, -507.5, 0.4, 13);
wall(6.5, -507.5, 0.4, 13);
wall(0, -520.6, 6.9, 0.4);
B.add(new THREE.CylinderGeometry(2.3, 2.3, 0.9, 20, 1, false, Math.PI / 2, Math.PI), st, 0, 3.7, -494.6, Math.PI / 2);
B.box(4.2, 1.4, 0.8, st, 0, 5.3, -494.6);
B.add(new THREE.CylinderGeometry(1.75, 1.75, 1, 20, 1, false, Math.PI / 2, Math.PI), 0x3A2A22, 0, 3.7, -494.62, Math.PI / 2);
if (typeof wSign === "function") {
var s = wSign(["QUEEN ALICE"], 3.6, 0.7, "#EDE6D6", "#7A1E2A");
s.position.set(0, 5.3, -494.6 - L.cz + 0.44);
G.add(s);
}
B.cyl(0.12, 0.12, 0.3, C.gold, -2.2, 1.7, -494.1, 8);
B.cyl(0.12, 0.12, 0.3, C.gold, 2.2, 1.7, -494.1, 8);
for (i = 0; i < 5; i++) {
[-6, 6].forEach(function (x) { B.cyl(0.34, 0.4, 6, 0xF6F0E2, x * 0.93, 3, -498 - i * 5, 10); B.box(1, 0.3, 1, C.gold, x * 0.93, 5.9, -498 - i * 5); });
}
B.box(13.8, 0.3, 27, 0xF6F0E2, 0, 6.15, -507.5);
lglRoof(B, 14.6, 27.8, 3, C.slate, 0, 6.3, -507.5);
lglCeil(G, 12.4, 25.6, 0xF2EBDD, 0, 5.98, -507.5);
for (i = 0; i < 3; i++) {
var cz = -501 - i * 6.5;
B.cyl(0.03, 0.03, 1.4, C.goldD, 0, 5.3, cz, 4);
B.tor(0.8, 0.04, C.gold, 0, 4.5, cz, Math.PI / 2);
for (var cq = 0; cq < 8; cq++) {
B.cyl(0.03, 0.03, 0.2, 0xFAF6EA, Math.cos(cq * 0.785) * 0.8, 4.64, cz + Math.sin(cq * 0.785) * 0.8, 5);
B.sph(0.05, 0xFFD070, Math.cos(cq * 0.785) * 0.8, 4.78, cz + Math.sin(cq * 0.785) * 0.8);
}
if (typeof ldHalo === "function")
ldHalo(G, 0, 4.6, cz + 507, 0xFFE0A0, 3, 0.45);
}
for (i = 0; i < 4; i++) {
[-5.9, 5.9].forEach(function (x, sd) { B.box(0.06, 2.4, 1.1, (i + sd) % 2 ? C.red : 0xF4F4F0, x, 3.6, -498 - i * 5 - 2.5); B.cone(0.3, 0.4, (i + sd) % 2 ? C.red : 0xF4F4F0, x, 2.3, -498 - i * 5 - 2.5, 3, Math.PI); });
}
B.box(1.6, 0.02, 24, 0x8A1E2A, -3.4, 0.14, -507.5);
B.box(1.6, 0.02, 24, 0x8A1E2A, 3.4, 0.14, -507.5);
for (i = 0; i < 4; i++) {
[-6.05, 6.05].forEach(function (x) { B.box(0.1, 2.6, 1.6, 0xBFDDEE, x, 3.4, -500.5 - i * 5); });
}
B.box(2.4, 0.1, 13, C.wood, 0, 1, -510);
B.box(2.6, 0.02, 13.2, 0xFAFAF6, 0, 1.06, -510);
[-5.8, 0, 5.8].forEach(function (dz) { B.box(0.2, 1, 0.2, C.woodD, -1, 0.5, -510 + dz); B.box(0.2, 1, 0.2, C.woodD, 1, 0.5, -510 + dz); });
lglSolid(0, -510, 1.25, 6.6, 1.1);
for (i = 0; i < 6; i++) {
B.cyl(0.04, 0.05, 0.5, 0xFAF6EA, i % 2 ? 0.6 : -0.6, 1.32, -505 - i * 1.9, 6);
B.cone(0.04, 0.12, 0xFFB040, i % 2 ? 0.6 : -0.6, 1.64, -505 - i * 1.9, 5);
B.cyl(0.09, 0.11, 0.34, 0x2A5A3A, i % 2 ? -0.7 : 0.7, 1.24, -505.8 - i * 1.9, 8);
B.cyl(0.03, 0.04, 0.14, 0x2A5A3A, i % 2 ? -0.7 : 0.7, 1.48, -505.8 - i * 1.9, 6);
B.cyl(0.22, 0.22, 0.02, 0xFAFAF6, i % 2 ? -0.72 : 0.72, 1.08, -504.4 - i * 1.9, 12);
}
B.cyl(0.5, 0.5, 0.04, C.silver, -1.2 + 0.7, 1.09, -512, 16);
B.sph(0.3, 0x8A4A2A, -0.5, 1.3, -512, 1.5, 0.8, 0.9);
B.cyl(0.05, 0.05, 0.5, 0xFAF6EA, -0.05, 1.34, -512, 6, 0, 1.3);
B.sph(0.03, 0x1A1410, -0.62, 1.42, -511.74);
B.sph(0.03, 0x1A1410, -0.4, 1.42, -511.74);
B.cyl(0.45, 0.45, 0.04, C.silver, 0.5, 1.09, -514, 16);
B.sph(0.34, 0x3A2218, 0.5, 1.36, -514, 1, 0.9, 1);
B.sph(0.2, 0xFAF6EA, 0.5, 1.62, -514, 1.2, 0.4, 1.2);
B.sph(0.05, C.red, 0.5, 1.74, -514);
B.sph(0.03, 0xFFFFFF, 0.4, 1.44, -513.7);
B.sph(0.03, 0xFFFFFF, 0.6, 1.44, -513.7);
lglTalker("The Leg of Mutton", -0.5, -512, "the Leg of Mutton at Queen Alice's dinner-party, which gets up in the dish and makes a little bow when introduced", "(It bows.) It isn't etiquette to cut anyone you've been introduced to.", "", 2.2);
lglTalker("The Plum-Pudding", 0.5, -514, "the Plum-Pudding at Queen Alice's dinner-party, with a thick, suety sort of voice", "What impertinence! I wonder how you'd like it, if I were to cut a slice out of YOU, you creature!", "", 2.2);
[-1.4, 0, 1.4].forEach(function (x, k) { B.box(0.9, 0.12, 0.9, k === 1 ? 0xC8A050 : (k ? 0xF4F4F0 : C.red), x, 0.7, -518.6); B.box(0.9, k === 1 ? 2 : 1.6, 0.14, k === 1 ? 0xC8A050 : (k ? 0xF4F4F0 : C.red), x, k === 1 ? 1.6 : 1.4, -519); [[-0.38, 0.38], [0.38, 0.38]].forEach(function (p) { B.box(0.1, 0.7, 0.1, C.goldD, x + p[0], 0.35, -518.6 + p[1]); }); });
lglSolid(0, -518.9, 2.1, 0.5, 1.6);
lglWalker(G, "pawn", 0, -4, -503, "A White Pawn at the feast", "a white pawn come as a guest to Queen Alice's dinner-party", "Three times three! Have you drunk your health yet?", 2.5);
lglWalker(G, "rook", 1, 4, -508, "A Red Castle at the feast", "a red castle come as a guest to Queen Alice's dinner-party", "Put cats in the coffee, and mice in the tea, and welcome Queen Alice with thirty-times-three!", 2.5);
lglWalker(G, "bishop", 0, -4, -515, "A White Bishop at the feast", "a white bishop come as a guest to Queen Alice's dinner-party", "Sprinkle the table with buttons and bran!", 2.5);
lglCast(G, 3.2, -493.2, 0.2, lglMade(function (B2) {
var g = 0x5A9A3A, y = 0xF2D030;
B2.sph(0.5, y, 0, 0.95, 0, 1, 1.15, 0.9);
B2.sph(0.42, g, 0, 1.72, 0.06, 1.25, 0.8, 1);
B2.sph(0.13, g, -0.26, 2.0, 0.1);
B2.sph(0.13, g, 0.26, 2.0, 0.1);
B2.sph(0.06, 0x1A1410, -0.26, 2.02, 0.2);
B2.sph(0.06, 0x1A1410, 0.26, 2.02, 0.2);
B2.tor(0.3, 0.02, 0x2A4A1A, 0, 1.66, 0.3, 0.3, 0, Math.PI, Math.PI);
B2.cyl(0.09, 0.08, 0.7, y, -0.56, 1.0, 0.1, 6, 0, 0.4);
B2.cyl(0.09, 0.08, 0.7, y, 0.56, 1.0, 0.1, 6, 0, -0.4);
B2.cyl(0.14, 0.16, 0.6, 0x3A2A1A, -0.22, 0.32, 0, 8);
B2.cyl(0.14, 0.16, 0.6, 0x3A2A1A, 0.22, 0.32, 0, 8);
B2.sph(0.2, 0x3A2A1A, -0.22, 0.1, 0.18, 1, 0.5, 1.7);
B2.sph(0.2, 0x3A2A1A, 0.22, 0.1, 0.18, 1, 0.5, 1.7);
}), "The old Frog", "a very old Frog dressed in bright yellow with enormous boots on, who sits under a tree by Queen Alice's door and speaks in a deep hoarse whisper", "What is it, now? ... To answer the door? What's it been asking of? ... Wexes it, you know.", "You are slow and deaf and kindly, and think the door should be let alone.", 3);
});
},
function (P, R) {
var C = LGL_C, lite = P.lite, n = function (k) { return lite ? Math.ceil(k * 0.45) : k; };
var NAMES = [["pawn", "A White Pawn"], ["pawn", "A Red Pawn"], ["rook", "A White Castle"], ["knight", "A White Horse"], ["bishop", "A Red Bishop"], ["rook", "A Red Castle"]];
[-210, -140, -70, 70, 140, 210].forEach(function (fx, fi) {
if (lite && Math.abs(fx) > 140)
return;
for (var k = 0; k < 8; k++) {
(function (k) {
var cz = -5 - k * 70, seed = (fi * 8 + k), what = (fi * 5 + k * 3) % 5;
if (fx === 70 && k === 5)
return;
if (fx === 70 && k === 1 || fx === -70 && k === 2)
what = 4;
lglZone(P, fx, cz, 0.5, function (B, G) {
var Rz = lglRand(seed * 977 + 13), i, x, z;
if (what === 0) {
var set = [["king", 1, 0, 0, 3.2], ["queen", 0, -14, 10, 3], ["rook", 1, 16, -12, 2.8], ["bishop", 0, 12, 16, 2.6], ["knight", 1, -18, -14, 2.6], ["pawn", 0, -4, -22, 2.2], ["pawn", 1, 22, 6, 2.2]];
set.forEach(function (p, q) { if (lite && q > 3)
return; var red = (p[1] + fi + k) % 2; lglPiece(B, p[0], red, fx + p[2], cz + p[3], p[4], Rz() * 6); lglRound(fx + p[2], cz + p[3], p[4] * 0.6, 5); });
lglBed(B, fx, cz, 40, 40, n(120), [0xFFFFFF, 0xF2C230, 0xF7B8CE], Rz);
}
else if (what === 1) {
var lake = new THREE.Mesh(new THREE.CircleGeometry(15, 36), lglGlassMat(0xCFE6F2, 0.92));
lake.rotation.x = -Math.PI / 2;
lake.position.y = 0.09;
G.add(lake);
for (i = 0; i < 22; i++) {
var a = i / 22 * 6.283;
B.blob(0.7 + Rz() * 0.5, i % 2 ? C.stone : 0xE4E0D4, fx + Math.cos(a) * 15.4, 0.3, cz + Math.sin(a) * 15.4, 1, 0.6, 1);
}
lglMirror(B, G, fx, cz - 17.5, 0, 4, 5.5, G.userData.lgl);
lglSolid(fx, cz - 17.5, 2.4, 0.4, 7);
[[-19, 8, "willow"], [18, 10, "willow"], [-10, -20, "blossom"], [11, -21, "blossom"], [22, -10, "poplar"], [-23, -8, "poplar"]].forEach(function (t) { lglTree(B, fx + t[0], cz + t[1], t[2], 1.2, Rz); lglRound(fx + t[0], cz + t[1], 0.5, 5); });
for (i = 0; i < n(40); i++) {
var ra = Rz() * 6.283, h = 0.9 + Rz();
B.cyl(0.015, 0.025, h, 0x5A9A4A, fx + Math.cos(ra) * (14.2 + Rz()), h / 2, cz + Math.sin(ra) * (14.2 + Rz()), 4);
}
}
else if (what === 2) {
for (i = 0; i < n(16); i++) {
x = fx - 24 + (i % 4) * 16 + Rz() * 3;
z = cz - 24 + Math.floor(i / 4) * 16 + Rz() * 3;
lglTree(B, x, z, "blossom", 1 + Rz() * 0.4, Rz);
lglRound(x, z, 0.4, 5);
}
lglBed(B, fx, cz, 50, 50, n(160), [0xF7B8CE, 0xFFFFFF, 0xFBE6EE], Rz);
lglPiece(B, "pawn", (fi + k) % 2, fx + 8, cz + 8, 1.6, Rz() * 6);
lglRound(fx + 8, cz + 8, 0.9, 4);
}
else if (what === 3) {
[[-12, -12, 12, -12], [12, -12, 12, 12], [12, 12, -12, 12], [-12, 12, -12, 3], [-12, -3, -12, -12]].forEach(function (hh) { lglHedge(B, fx + hh[0], cz + hh[1], fx + hh[2], cz + hh[3], 1.3, 1); lglSolid(fx + (hh[0] + hh[2]) / 2, cz + (hh[1] + hh[3]) / 2, Math.abs(hh[2] - hh[0]) / 2 + 0.5, Math.abs(hh[3] - hh[1]) / 2 + 0.5, 1.4); });
lglPiece(B, ["queen", "king", "bishop"][(fi + k) % 3], (fi + k) % 2, fx, cz, 2.6, 0);
lglRound(fx, cz, 1.6, 6);
for (i = 0; i < 8; i++) {
var ba = i / 8 * 6.283;
x = fx + Math.cos(ba) * 7;
z = cz + Math.sin(ba) * 7;
B.blob(0.8, 0x2E7A3A, x, 0.6, z, 1, 0.85, 1);
for (var q = 0; q < 6; q++)
B.sph(0.13, i % 2 ? 0xC81E3A : 0xFFFFFF, x + Math.cos(q * 1.1) * 0.6, 0.7 + ((q * 5) % 3) * 0.2, z + Math.sin(q * 1.1) * 0.6);
}
[[-20, -20], [20, -20], [-20, 20], [20, 20]].forEach(function (t) { lglTree(B, fx + t[0], cz + t[1], "poplar", 1.3, Rz); lglRound(fx + t[0], cz + t[1], 0.4, 5); });
}
else {
for (i = 0; i < n(9); i++) {
x = fx + 14 + Rz() * 14;
z = cz - 10 + Rz() * 20;
lglTree(B, x, z, ["oak", "oak", "poplar", "blossom"][i % 4], 1 + Rz() * 0.6, Rz);
lglRound(x, z, 0.45, 5);
}
lglBed(B, fx - 8, cz, 30, 44, n(140), [0xF2C230, 0xFFFFFF, 0xC81E3A, 0x9A6AE0], Rz);
}
var nm = NAMES[(fi + k * 2) % NAMES.length], red = /Red/.test(nm[1]);
if (!lite || k % 2 === 0)
lglWalker(G, nm[0], red ? 1 : 0, fx - 20 + Rz() * 10, cz + 22 - Rz() * 8, nm[1], nm[1].replace(/^A /, "a ") + " of the great chessboard country, out walking in its own square between moves", "Whose move is it? I'm sure it isn't mine. Are you the new White Pawn?", 10);
});
})(k);
}
});
},
function (html) {
var el = LGL.hud;
if (!el) {
if (typeof document === "undefined")
return;
el = LGL.hud = document.createElement("div");
el.id = "lglHud";
el.style.cssText = "position:fixed;left:50%;top:54px;transform:translateX(-50%);max-width:min(620px,86vw);z-index:40;padding:7px 12px;border-radius:8px;background:rgba(24,30,44,.82);border:1px solid rgba(232,192,80,.55);color:#F4EEDD;font:13px/1.35 var(--sans,system-ui,sans-serif);text-align:center;cursor:pointer;display:none";
el.onclick = function (ev) { ev.stopPropagation(); lglBookCard(); };
document.body.appendChild(el);
}
if (!html) {
if (el.style.display !== "none")
el.style.display = "none";
return;
}
if (el.dataset.h !== html) {
el.dataset.h = html;
el.innerHTML = html;
}
if (el.style.display !== "block")
el.style.display = "block";
},
function () {
var S = lglState(), st = lglStepNow();
if (!st) {
lglHud("<b style='color:#FFE7B0'>♛ Queen Alice.</b> You have played the whole book. Tap here to read any chapter again or begin afresh.");
return;
}
var extra = "";
if (st.k === "pick") {
var got = st.items.filter(function (it) { return S.pk[it[0]]; }).length;
if (st.items.length > 1)
extra = " <span style='opacity:.75'>(" + got + " of " + st.items.length + ")</span>";
}
if (st.k === "run")
extra = " <span style='opacity:.75'>(" + Math.min(100, Math.round(LGL.run / 1.6)) + "%)</span>";
if (st.k === "away" && S.b >= 1)
extra = "<div style='color:#FFD8A0'>" + (S.b >= 2 ? "The path keeps giving a sudden twist and shaking itself. Take the Rose's advice: walk the OTHER way, back to the door of the house, and you will meet her." : "\"I should advise you to walk the other way,\" says the Rose.") + "</div>";
lglHud("<span style='color:#FFE7B0'>♟ " + lglRoman(st.c) + ". " + esc(LGL_CH[st.c]) + "</span> <span style='opacity:.6'>· " + (S.i + 1) + " of " + LGL_STEPS.length + "</span><div>" + esc(st.d) + extra + "</div>");
},
function () {
if (typeof LD === "undefined")
return;
LD.talkers = LD.talkers.filter(function (T) { return T.lgl === undefined; });
if (LD.near && LD.near.lgl !== undefined) {
LD.near = null;
if (LD.prompted && typeof worldPrompt === "function") {
worldPrompt(null);
LD.prompted = false;
}
}
(LGL.items || []).forEach(function (m) { if (m.parent)
m.parent.remove(m); m.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); }); });
LGL.items = [];
},
function (key) {
var B = lglB(), C = LGL_C;
if (/^hearth/.test(key))
lglPiece(B, key === "hearthq" ? "queen" : "king", 0, 0, 0, 0.24);
else if (/^oy/.test(key)) {
B.sph(0.22, 0xD8D0C0, 0, 0.3, 0, 1, 0.6, 1);
B.sph(0.2, 0xF4F0E6, 0, 0.36, 0, 1, 0.5, 1);
B.sph(0.04, 0x1A1410, -0.07, 0.42, 0.16);
B.sph(0.04, 0x1A1410, 0.07, 0.42, 0.16);
B.sph(0.07, 0x2A1A12, -0.09, 0.05, 0.06, 1, 0.6, 1.6);
B.sph(0.07, 0x2A1A12, 0.09, 0.05, 0.06, 1, 0.6, 1.6);
}
else if (key === "rattle") {
B.sph(0.14, 0xFAFAF6, 0, 0.16, 0);
B.cyl(0.025, 0.025, 0.34, 0xFAFAF6, 0.2, 0.1, 0, 5, 0, 1.3);
B.tor(0.14, 0.015, C.red, 0, 0.16, 0, Math.PI / 2);
}
else if (/^arm/.test(key)) {
var n = +key.slice(3);
if (n === 0)
B.cyl(0.2, 0.2, 0.9, 0xF4EEDD, 0, 0.2, 0, 10, 0, Math.PI / 2);
else if (n === 1) {
B.cyl(0.18, 0.18, 0.9, 0x9A2A3A, 0, 0.18, 0, 10, 0, Math.PI / 2);
B.cyl(0.19, 0.19, 0.1, 0xC8A050, 0.3, 0.18, 0, 10, 0, Math.PI / 2);
}
else if (n === 2) {
B.sph(0.34, C.silver, 0, 0.02, 0, 1, 0.6, 1);
B.sph(0.05, C.silver, 0, 0.24, 0);
}
else if (n === 3) {
B.cyl(0.24, 0.16, 0.4, 0x2A2A30, 0, 0.2, 0, 8);
B.tor(0.2, 0.015, 0x2A2A30, 0, 0.42, 0, 0, 0, Math.PI);
}
else {
B.cyl(0.2, 0.2, 0.24, 0x3A3A42, 0, 0.14, 0, 12);
B.box(0.5, 0.04, 0.06, 0x3A3A42, 0.4, 0.2, 0);
}
}
else if (/^rush/.test(key)) {
for (var i = 0; i < 9; i++) {
var h = 1 + ((i * 7) % 5) * 0.14;
B.cyl(0.015, 0.03, h, 0x6AAA4A, Math.cos(i * 0.7) * 0.14, h / 2, Math.sin(i * 0.7) * 0.14, 4, (i % 3 - 1) * 0.12, (i % 2 ? 0.1 : -0.1));
B.sph(0.05, 0x8A6A3A, Math.cos(i * 0.7) * 0.14, h, Math.sin(i * 0.7) * 0.14, 1, 2.4, 1);
}
}
else if (key === "crown") {
B.sub(0, 0.2, 0, 0, 2.2, function () { lglCrown(B, C.gold, 0.04, 0.2, 8); });
B.sph(0.07, C.red, 0, 0.42, 0.3);
}
var g = new THREE.Group();
g.add(B.mesh(key === "crown" || key === "arm2" ? { shine: 90 } : null));
if (typeof wGlow === "function") {
var s = wGlow(0xFFE9A8, key === "crown" ? 3 : 1.6, 0.55);
s.position.y = 0.5;
g.add(s);
}
g.userData.ldAnim = function (m, t) { m.position.y = (m.userData.y0 || 0) + 0.06 + Math.sin(t * 2 + m.position.x) * 0.05; };
return g;
},
function () {
lglClearMarks();
var S = lglState(), st = lglStepNow(), at = lglPos(st);
if (!LGL.beacon || LGL.beacon.parent !== LD.g) {
var bm = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1.1, 60, 14, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFE49A, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
bm.userData.ldAnim = function (m, t) { m.material.opacity = 0.2 + Math.sin(t * 1.6) * 0.05; };
LD.g.add(bm);
LGL.beacon = bm;
}
LGL.beacon.visible = !!st;
if (!st) {
LD.talkers.unshift({ x: LGL_AT.glass[0], z: LGL_AT.glass[1] + 1.6, r: 3.6, name: "The looking-glass", verb: "open the book again", lgl: "again" });
return;
}
var tgt = (st.k === "away" && S.b >= 2) ? LGL_AT.door : at;
LGL.beacon.position.set(tgt[0], 30, tgt[1]);
if (typeof guideTo !== "undefined") {
try {
guideTo = { key: "lgl", x: LD.ox + tgt[0], z: LD.oz + tgt[1] };
}
catch (e) { }
}
if (st.k === "talk")
LD.talkers.unshift({ x: at[0], z: at[1] + (st.at === "glass" ? 1.6 : 0), r: st.r || 3.8, name: st.n, verb: st.v, lgl: "talk" });
if (st.k === "pick")
st.items.forEach(function (it) {
if (S.pk[it[0]])
return;
var p = LGL_ITEM[it[0]], m = lglItemMesh(it[0]);
var y0 = /^hearth/.test(it[0]) ? 0.16 : 0;
m.position.set(p[0], y0, p[1]);
m.userData.y0 = y0;
LD.g.add(m);
LGL.items.push(m);
m.userData.key = it[0];
LD.talkers.unshift({ x: p[0], z: p[1], r: 2.6, name: it[1], verb: it[2], lgl: "pick", key: it[0] });
});
if (LGL.ready)
LD.talkers.unshift({ x: lglLocal()[0], z: lglLocal()[1], r: 6, name: "📖 " + LGL_CH[st.c], verb: "go on reading", lgl: "resume" });
LGL.set = S.i + ":" + Object.keys(S.pk).length + ":" + (S.b || 0) + ":" + (LGL.ready ? 1 : 0);
},
function (then) {
if (LGL.book) {
then(LGL.book);
return;
}
if (LGL.loading) {
LGL.wait = then;
return;
}
LGL.loading = true;
LGL.wait = then;
fetch("data/looking-glass/book.json").then(function (r) { if (!r.ok)
throw new Error("no book"); return r.json(); }).then(function (j) { LGL.book = j; LGL.loading = false; var w = LGL.wait; LGL.wait = null; if (w)
w(j); })
.catch(function () { LGL.loading = false; LGL.book = { ch: [] }; var w = LGL.wait; LGL.wait = null; if (w)
w(LGL.book); });
},
function (i, after, title) {
LGL.busy = true;
lglLoad(function (book) {
var st = LGL_STEPS[i], pages = lglPages(lglParas(i, book)), n = 0;
if (!pages.length) {
after();
return;
}
var show = function () {
var fns = {}, h = dqHead("📖 " + esc(title || (lglRoman(st.c) + ". " + LGL_CH[st.c]))) + "<div style='opacity:.6;font-size:11.5px'>Through the Looking-Glass · Lewis Carroll, 1871 · page " + (n + 1) + " of " + pages.length + "</div>" +
"<div style='max-height:46vh;overflow:auto;margin:6px 0;font:14.5px var(--serif,Georgia,serif);padding-right:6px' id='lglPage'>" + pages[n].map(lglParaHtml).join("") + "</div>";
if (n > 0) {
h += dqBtn("back", "‹ Back");
fns.back = function () { n--; show(); };
}
h += dqBtn("next", n + 1 < pages.length ? "Turn the page ›" : "Go on ›");
fns.next = function () { if (n + 1 < pages.length) {
n++;
show();
}
else
after(); };
worldCard(h, fns);
var el = document.getElementById("lglPage");
if (el)
el.scrollTop = 0;
};
show();
});
},
function (i, after) {
var st = LGL_STEPS[i], q = st.q, opts = [[q[1], 1], [q[2], 0], [q[3], 0]], k = (i * 7 + 3) % 3;
opts = opts.slice(k).concat(opts.slice(0, k));
if (i % 2)
opts.reverse();
var show = function (note) {
var fns = {}, h = dqHead("❓ " + esc(st.n || LGL_CH[st.c])) + "<div style='margin:6px 0;font:14.5px var(--serif,Georgia,serif)'>" + esc(q[0]) + "</div>" + (note ? "<div style='color:#FFB8A0;margin-bottom:4px'>" + note + "</div>" : "");
opts.forEach(function (o, j) {
h += dqBtn("o" + j, esc(o[0]));
fns["o" + j] = function () {
if (o[1] || q[5]) {
lglTone(660, 0.18);
worldCard(dqHead("✓ " + esc(o[0])) + "<div style='margin:8px 0;font:italic 14px var(--serif,Georgia,serif);opacity:.9'>" + esc(q[4]) + "</div>" + dqBtn("go", "Go on ›"), { go: after });
}
else {
lglTone(220, 0.2);
show("Not that. Think of what you have just read, and try again.");
}
};
});
worldCard(h, fns);
};
show("");
},
function (i) {
var S = lglState();
if (S.i !== i) {
LGL.busy = false;
return;
}
var st = LGL_STEPS[i], nx = LGL_STEPS[i + 1];
if (typeof worldCard === "function")
worldCard(null);
S.i = i + 1;
S.pk = {};
S.b = 0;
LGL.ready = false;
LGL.busy = false;
LGL.run = 0;
LGL.set = null;
lglKeep();
if (st.tp)
lglTp(st.tp[0], st.tp[1], st.tp[2]);
if (nx && nx.tpBefore)
lglTp(nx.tpBefore[0], nx.tpBefore[1], nx.tpBefore[2]);
lglTone(784, 0.25);
if (!nx) {
lglFinish();
return;
}
var msg = st.say ? esc(st.say) : "";
if (nx.c !== st.c)
msg = (msg ? msg + " " : "") + "<b>Chapter " + lglRoman(nx.c) + ": " + esc(LGL_CH[nx.c]) + ".</b>";
if (msg && typeof setStatus === "function")
setStatus(msg);
},
function () {
var S = lglState(), first = !S.won;
S.won = 1;
lglKeep();
if (first && typeof dqBasketAdd === "function")
try {
dqBasketAdd("dr_chessset", 1);
}
catch (e) { }
worldCard(dqHead("♛ Queen Alice") + "<div style='margin:8px 0;line-height:1.5'>You have crossed the whole board, from the Looking-glass room to the Eighth Square, and read every word of the book on the way.</div>" +
"<div style='margin:8px 0;font:italic 14px var(--serif,Georgia,serif)'>Ever drifting down the stream, / Lingering in the golden gleam, / Life, what is it but a dream?</div>" +
(first ? "<div style='opacity:.85'>Keepsake: a Looking-glass chess set, put in your basket.</div>" : "") + dqBtn("ok", "Close"), { ok: function () { worldCard(null); } });
},
function () {
var S = lglState(), st = lglStepNow(), fns = {}, h = dqHead("📖 Through the Looking-Glass") + "<div style='opacity:.8;margin-bottom:6px'>Lewis Carroll, 1871. Twelve chapters, played across the eight squares of the board. " + (st ? "You are in chapter " + lglRoman(st.c) + "." : "You have finished it.") + "</div>";
if (st && lglHere()) {
h += dqBtn("take", "Take me to where the book goes on", esc(st.d));
fns.take = function () { var p = lglPos(st); worldCard(null); lglTp(p[0] + (st.k === "go" ? 0 : 0), p[1] + 7); };
}
var keeper = (typeof amKeeper === "function" && amKeeper()) || (typeof isKeeperNow === "function" && isKeeperNow());
for (var c = 1; c <= 12; c++) {
(function (c) {
var first = -1;
LGL_STEPS.forEach(function (s, k) { if (first < 0 && s.c === c)
first = k; });
var done = S.i > first && (!st || st.c > c), here = st && st.c === c;
if (done || keeper) {
h += dqBtn("c" + c, (done ? "✓ " : here ? "▸ " : "○ ") + lglRoman(c) + ". " + esc(LGL_CH[c]), done ? "read it again" : (keeper ? "Keeper: go to this chapter" : ""));
fns["c" + c] = function () { if (done && !keeper) {
lglReread(c);
return;
} worldCard(dqHead(lglRoman(c) + ". " + esc(LGL_CH[c])) + dqBtn("r", "Read the chapter") + dqBtn("j", "Keeper: play from here"), { r: function () { lglReread(c); }, j: function () { S.i = first; S.pk = {}; S.b = 0; LGL.ready = false; LGL.busy = false; LGL.set = null; lglKeep(); worldCard(null); var p = lglPos(LGL_STEPS[first]); if (lglHere())
lglTp(p[0], p[1] + 7); } }); };
}
else
h += "<div style='margin:6px 0;padding:6px 10px;opacity:.55'>" + (here ? "▸ " : "○ ") + lglRoman(c) + ". " + esc(LGL_CH[c]) + "</div>";
})(c);
}
if (!st || S.i > 0) {
h += dqBtn("anew", "Begin the book afresh", "from the Looking-glass room");
fns.anew = function () { worldCard(dqHead("Begin afresh?") + "<div style='margin:6px 0'>Your place in the book goes back to the first page.</div>" + dqBtn("y", "Yes, begin again") + dqBtn("n", "No"), { y: function () { S.i = 0; S.pk = {}; S.b = 0; LGL.ready = false; LGL.busy = false; LGL.set = null; lglKeep(); worldCard(null); }, n: function () { lglBookCard(); } }); };
}
worldCard(h, fns);
},
function (c) {
lglLoad(function (book) {
var ch = book.ch[c - 1];
if (!ch)
return;
var pages = lglPages(ch.p), n = 0;
var show = function () {
var fns = {}, h = dqHead("📖 " + lglRoman(c) + ". " + esc(LGL_CH[c])) + "<div style='opacity:.6;font-size:11.5px'>page " + (n + 1) + " of " + pages.length + "</div><div style='max-height:46vh;overflow:auto;margin:6px 0;font:14.5px var(--serif,Georgia,serif);padding-right:6px' id='lglPage'>" + pages[n].map(lglParaHtml).join("") + "</div>";
if (n > 0) {
h += dqBtn("back", "‹ Back");
fns.back = function () { n--; show(); };
}
if (n + 1 < pages.length) {
h += dqBtn("next", "Turn the page ›");
fns.next = function () { n++; show(); };
}
worldCard(h, fns);
var el = document.getElementById("lglPage");
if (el)
el.scrollTop = 0;
};
show();
});
},
function (T) {
var S = lglState(), st = lglStepNow();
LD.near = null;
if (LD.prompted && typeof worldPrompt === "function") {
worldPrompt(null);
LD.prompted = false;
}
if (T.lgl === "again") {
lglBookCard();
return;
}
if (!st)
return;
if (T.lgl === "resume" || T.lgl === "talk") {
LGL.busy = false;
lglTrigger();
return;
}
if (T.lgl === "pick") {
S.pk[T.key] = 1;
lglTone(880, 0.12);
lglKeep();
LGL.set = null;
var left = st.items.filter(function (it) { return !S.pk[it[0]]; }).length;
if (!left)
lglTrigger();
else if (typeof setStatus === "function")
setStatus("<b>" + esc(T.name) + ".</b> " + left + " more to find.");
}
}
];
});
