/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FGW = { on: false, mesh: null, ff: null, cell: null, t: 0 };
function fgwLite() { return typeof LITE !== "undefined" && !!LITE; }
function fgwH(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function fgwR(seed) { var s = seed >>> 0 || 1; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
function fgwTex(k) { try {
return typeof texOf === "function" ? texOf(k) : null;
}
catch (e) {
return null;
} }
var FGW_M = {};
function fgwM(key, fn) { return FGW_M[key] || (FGW_M[key] = fn()); }
function fgwLam(col, tex, o) { return __ZC(369, 0, this, arguments, new.target); }
function fgwGlow(col, op) { var m = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op, depthWrite: op === undefined }); m.userData.ldShared = 1; return m; }
function fgwAdd(G, geo, mat, x, y, z, ry) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; G.add(m); return m; }
function fgwBirch(G, x, y, z, h, seed, lite) { return __ZC(369, 1, this, arguments, new.target); }
function fgwLantern(G, x, y, z, col) { return __ZC(369, 2, this, arguments, new.target); }
function fgwWillow(G, x, y, z, seed, lite) { return __ZC(369, 3, this, arguments, new.target); }
function fgwRoseArch(G, x, y, z, ry, lite) { return __ZC(369, 4, this, arguments, new.target); }
function fgwStone(G, x, y, z, h, seed) {
var g = new THREE.DodecahedronGeometry(1, 0);
g.scale(0.7, h / 2, 0.45);
var m = fgwAdd(G, g, fgwM("stone", function () { return fgwLam(0x8A8A82, "stone"); }), x, y + h / 2 - 0.2, z, fgwR(seed)() * 3);
return m;
}
function fgwLake(P, cx, cz) { return __ZC(369, 5, this, arguments, new.target); }
function fgwWood(P, cx, cz) { return __ZC(369, 6, this, arguments, new.target); }
function fgwHill(P, cx, cz) { return __ZC(369, 7, this, arguments, new.target); }
function fgwBower(P, cx, cz) { return __ZC(369, 8, this, arguments, new.target); }
(function () {
if (typeof LD_SETS === "undefined" || !LD_SETS.faerie)
return;
var base = LD_SETS.faerie;
LD_SETS.faerie = function (P) {
base.apply(this, arguments);
if (typeof grGreatTree === "function" && typeof grToadstool === "function") {
P.items = P.items.map(function (it) {
if (it.t !== "k")
return it;
if (it.a === "tree") {
var s = it.s || 1, sd = fgwH("ft" + Math.round(it.x) + "_" + Math.round(it.z));
return { t: "m", x: it.x, z: it.z, rot: it.rot || 0, r: 5 * s, fn: function (G) { var lf = [0x3E6A34, 0x4A7A3A, 0x5A6A8A, 0x6A5A8A][sd % 4]; grGreatTree(G, 0, 0, 0.6 * s, 9 * s, 7 * s, lf, sd); return false; }, solid: { r: 0.9 * s, h: 6 } };
}
if (it.a === "giantmushroom") {
var s2 = (it.s || 1) * 0.7, sd2 = fgwH("fm" + Math.round(it.x) + "_" + Math.round(it.z));
return { t: "m", x: it.x, z: it.z, rot: it.rot || 0, r: 3 * s2, fn: function (G) { G.add(grToadstool(0, 0, s2, sd2)); return false; }, solid: { r: 0.9 * s2, h: 5 } };
}
return it;
});
}
var before = P.items;
P.items = [];
fgwLake(P, 150, -150);
fgwWood(P, -175, 90);
fgwHill(P, -165, -195);
fgwBower(P, 62, -78);
var areas = [[150, -150, 50], [-175, 90, 66], [-165, -195, 34]];
P.items = P.items.concat(before.filter(function (it) {
if (it.t !== "k" && it.t !== "m")
return true;
if (it.t === "k" && !/^(giantmushroom|glowflowers|tree|wisps|fairyring|briar|flowers)$/.test(it.a) && !it.fgw)
return true;
return !areas.some(function (A) { return Math.hypot(it.x - A[0], it.z - A[1]) < A[2]; });
}));
P.path([[60, -70], [110, -115], [150, -108]], 2.5, 0x4A5E36, "lanternpost", 16);
P.path([[-80, 10], [-130, 50], [-120, 80]], 2.5, 0x4A5E36, "lanternpost", 16);
P.path([[-140, -80], [-155, -140], [-160, -160]], 2.5, 0x4A5E36, "lanternpost", 16);
fgwPathsFrom(P.items);
};
})();
function fgwActive() { return typeof LD !== "undefined" && !!FGW_KINDS[LD.kind] && LD.g && LD.g.parent && (typeof store === "undefined" || (store.here || 0) === LD.rid) && !(typeof INT !== "undefined" && INT) && typeof camera !== "undefined"; }
var FGW_KINDS = { faerie: { bare: [[150, -150, 41.5], [-165, -195, 27], [0, -130, 34]], flowers: [0xB890FF, 0xFF8AC8, 0x7A9AFF, 0xFFD870, 0xE8E0FF, 0x8AE0F0], ff: true } };
var FGW_PATHS = [];
function fgwPathsFrom(items) { return __ZC(369, 9, this, arguments, new.target); }
function fgwBare(lx, lz) { return __ZC(369, 10, this, arguments, new.target); }
function fgwTuftGeo() { return __ZC(369, 11, this, arguments, new.target); }
function fgwFlowerGeo() { return __ZC(369, 12, this, arguments, new.target); }
function fgwBuildMeadow() { return __ZC(369, 13, this, arguments, new.target); }
var FGW_FLOWERS = [0xB890FF, 0xFF8AC8, 0x7A9AFF, 0xFFD870, 0xE8E0FF, 0x8AE0F0];
function fgwFillMeadow(px, pz) { return __ZC(369, 14, this, arguments, new.target); }
function fgwTick() {
try {
var on = fgwActive();
if (!on) {
if (FGW.on && FGW.mesh && FGW.mesh.G.parent)
FGW.mesh.G.parent.remove(FGW.mesh.G);
FGW.on = false;
FGW.cell = null;
return;
}
if (!FGW.mesh)
fgwBuildMeadow();
var M = FGW.mesh;
if (!M.G.parent)
scene.add(M.G);
FGW.on = true;
var p = camera.position, key = Math.round(p.x / 3) + "," + Math.round(p.z / 3);
if (FGW.kind !== LD.kind) {
FGW.kind = LD.kind;
FGW.cell = null;
var ffOn = !!FGW_KINDS[LD.kind].ff;
M.ff.visible = ffOn;
M.halo.visible = ffOn;
}
if (key !== FGW.cell) {
FGW.cell = key;
fgwFillMeadow(p.x, p.z);
}
FGW.t += 1 / 60;
var t = FGW.t, mx = new THREE.Matrix4(), V = new THREE.Vector3(), Q = new THREE.Quaternion(), S = new THREE.Vector3(1, 1, 1);
M.seeds.forEach(function (s, i) {
if (!s.set || Math.hypot(s.x - p.x, s.z - p.z) > 26) {
var h = fgwH("ff" + i + "_" + Math.round(t * 10)), a = (h & 1023) / 1023 * 6.28, r = 4 + ((h >> 10) & 1023) / 1023 * 20;
s.x = p.x + Math.cos(a) * r;
s.z = p.z + Math.sin(a) * r;
s.y = (typeof ldY === "function" ? ldY(s.x - LD.ox, s.z - LD.oz) : 0) + 0.5 + ((h >> 20) & 255) / 255 * 1.8;
s.set = true;
}
V.set(s.x + Math.sin(t * s.s + s.p) * 1.2, s.y + Math.sin(t * s.s * 0.7 + s.p * 2) * 0.4, s.z + Math.cos(t * s.s * 0.8 + s.p) * 1.2);
mx.compose(V, Q, S);
M.ff.setMatrixAt(i, mx);
M.halo.setMatrixAt(i, mx);
});
M.ff.instanceMatrix.needsUpdate = true;
M.halo.instanceMatrix.needsUpdate = true;
}
catch (e) {
if (window.console && !FGW.warned) {
FGW.warned = true;
console.warn("[faerie-grown]", e);
}
}
}
(function loop() { fgwTick(); requestAnimationFrame(loop); })();
"use strict";
function fgwMirrorSetup() {
if (FGW.mirrorSet)
return;
FGW.mirrorSet = 1;
if (typeof FGW_KINDS !== "undefined")
FGW_KINDS.mirror = { reach: 620, bare: [], flowers: [0xFFFFFF, 0xFFE040, 0xFFF6E0, 0xF8C8D8, 0xFFD020, 0xE8E8FF], ff: false };
if (typeof LGL_C !== "undefined") {
LGL_C.gravel = 0xB8A888;
LGL_C.brook = 0x6E9EB8;
}
if (typeof ctLandPlan === "function") {
var cl0 = ctLandPlan;
ctLandPlan = function (k, P) { if (k === "mirror")
return; return cl0.apply(this, arguments); };
}
if (typeof LD_SETS !== "undefined" && LD_SETS.mirror) {
var m0 = LD_SETS.mirror;
LD_SETS.mirror = function (P) { var r = m0.apply(this, arguments); try {
fgwPathsFrom(P.items);
}
catch (e) { } return r; };
}
if (typeof lglTree === "function") {
var t0 = lglTree;
lglTree = function (B, x, z, kind, s, R) {
if (kind === "willow" || kind === "dark")
return t0.apply(this, arguments);
var C = LGL_C, r = R ? R() : 0.5, lite = typeof LITE !== "undefined" && !!LITE;
s = s || 1;
var rr = lglRand(Math.floor(x * 131 + z * 71 + r * 977) >>> 0);
var trunk = kind === "blossom" ? C.trunkD : C.trunk, n = lite ? 6 : 13;
var shape = kind === "poplar" ? { cy: 4.8, rx: 1.3, ry: 3.0, rz: 1.3, cl: 0.85, h: 2.6 } : kind === "blossom" ? { cy: 3.4, rx: 2.2, ry: 1.3, rz: 2.2, cl: 0.85, h: 2.2 } : { cy: 4.3, rx: 2.5, ry: 1.9, rz: 2.5, cl: 1.0, h: 2.8 };
var base = kind === "blossom" ? (r > 0.5 ? 0xF7B8CE : 0xFBE6EE) : C.leaf;
B.cyl(0.18 * s, 0.32 * s, shape.h * s, trunk, x, shape.h * s / 2, z, 7);
for (var b = 0; b < (kind === "poplar" ? 1 : 3); b++) {
var a = b / 3 * 6.283 + r * 2;
B.cyl(0.06 * s, 0.12 * s, 1.6 * s, trunk, x + Math.cos(a) * 0.5 * s, shape.h * s + 0.4 * s, z + Math.sin(a) * 0.5 * s, 5, Math.sin(a) * 0.6, -Math.cos(a) * 0.6);
}
for (var i = 0; i < n; i++) {
var u = rr() * 6.283, v = Math.acos(1 - 2 * (0.1 + rr() * 0.85)), px = Math.sin(v) * Math.cos(u), py = Math.cos(v), pz = Math.sin(v) * Math.sin(u);
var k = 0.72 + rr() * 0.25, cx = x + px * shape.rx * k * s, cy = (shape.cy + py * shape.ry * k) * s, cz = z + pz * shape.rz * k * s;
var shade = py > 0.3 ? (kind === "blossom" ? 0xFFFFFF : C.leafL) : py < -0.2 ? (kind === "blossom" ? 0xE890B0 : C.leafD) : base;
var col = lglMix(base, shade, 0.35 + rr() * 0.3);
B.blob((shape.cl * (0.75 + rr() * 0.5)) * s, col, cx, cy, cz, 1, 0.82, 1);
}
B.blob(shape.rx * 0.7 * s, lglMix(base, kind === "blossom" ? 0xD890A8 : C.leafD, 0.4), x, shape.cy * s, z, 1, shape.ry / shape.rx, 1);
};
}
}
if (document.readyState === "complete")
fgwMirrorSetup();
else
window.addEventListener("load", fgwMirrorSetup);
