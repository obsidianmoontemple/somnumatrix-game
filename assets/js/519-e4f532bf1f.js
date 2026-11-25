/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SWK = { mats: {}, stripes: {}, walkers: [], ticking: false, last: 0 };
function swkLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); }
function swkKeep(i) { return !swkLite() || i % 2 === 0; }
function swkR(seed) { var s = (seed * 2654435761) >>> 0 || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
function swkM(col, tex, o) { return __ZC(519, 0, this, arguments, new.target); }
function swkMesh(G, geo, mat, x, y, z, ry) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; if (G)
G.add(m); return m; }
function swkBox(G, w, h, d, mat, x, y, z, ry) { var g = new THREE.BoxGeometry(w, h, d); if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]); return swkMesh(G, g, mat, x, y, z, ry); }
function swkCyl(G, rt, rb, h, mat, x, y, z, seg) { var g = new THREE.CylinderGeometry(rt, rb, h, seg || 10); if (typeof metreUVs === "function")
metreUVs(g, "cyl", [rt, rb, h]); return swkMesh(G, g, mat, x, y, z); }
function swkFlat(G, w, d, mat, x, y, z, ry) { var g = new THREE.PlaneGeometry(w, d); if (typeof metreUVs === "function")
metreUVs(g, "pln", [w, d]); var m = swkMesh(G, g, mat, x, y, z); m.rotation.x = -Math.PI / 2; if (ry)
m.rotation.z = ry; return m; }
function swkBall(G, r, mat, x, y, z, seg) { var g = new THREE.IcosahedronGeometry(r, seg || 1); if (typeof metreUVs === "function")
metreUVs(g, "ico", [r]); return swkMesh(G, g, mat, x, y, z); }
function swkAt(G, x, y, z, ry) { var g = new THREE.Group(); g.position.set(x, y || 0, z); g.rotation.y = ry || 0; G.add(g); return g; }
function swkTree(G, x, z, o) { return __ZC(519, 1, this, arguments, new.target); }
function swkBench(G, x, z, ry, y) { return __ZC(519, 2, this, arguments, new.target); }
function swkLamp(G, x, z, o) { return __ZC(519, 3, this, arguments, new.target); }
function swkPlanter(G, x, z, w, d, o) { return __ZC(519, 4, this, arguments, new.target); }
function swkStripe(c1, c2) { return __ZC(519, 5, this, arguments, new.target); }
function swkStall(G, x, z, ry, o) { return __ZC(519, 6, this, arguments, new.target); }
function swkFlag(G, x, z, o) { return __ZC(519, 7, this, arguments, new.target); }
function swkBin(G, x, z, y) { var B = swkAt(G, x, y || 0, z, 0); swkCyl(B, 0.28, 0.24, 0.85, swkM(0x2A3A2E, "metal"), 0, 0.425, 0, 12); swkCyl(B, 0.3, 0.3, 0.06, swkM(0x1E2622, "metal"), 0, 0.88, 0, 12); return B; }
function swkBollard(G, x, z, y) { var B = swkAt(G, x, y || 0, z, 0); swkCyl(B, 0.11, 0.13, 0.9, swkM(0x2A2C30, "metal"), 0, 0.45, 0, 10); swkBall(B, 0.12, swkM(0x2A2C30, "metal"), 0, 0.92, 0, 1); return B; }
function swkCafe(G, x, z, o) { return __ZC(519, 8, this, arguments, new.target); }
function swkCrates(G, x, z, o) { o = o || {}; var C = swkAt(G, x, o.y || 0, z, o.ry || 0), w = swkM(o.c || 0x8A6A42, "wood"); swkBox(C, 0.7, 0.6, 0.6, w, 0, 0.3, 0); swkBox(C, 0.6, 0.5, 0.55, w, 0.68, 0.25, 0.05, 0.2); swkBox(C, 0.55, 0.5, 0.5, w, 0.1, 0.85, 0.02, 0.3); return C; }
function swkBarrel(G, x, z, o) {
o = o || {};
var B = swkAt(G, x, o.y || 0, z, 0), w = swkM(o.c || 0x6A4A2C, "wood"), band = swkM(0x3A3A3A, "metal");
swkCyl(B, 0.32, 0.32, 0.95, w, 0, 0.475, 0, 12);
var mid = swkCyl(B, 0.36, 0.36, 0.3, w, 0, 0.475, 0, 12);
[0.12, 0.83].forEach(function (h) { swkCyl(B, 0.335, 0.335, 0.04, band, 0, h, 0, 12); });
return B;
}
function swkWall(G, x, z, len, o) { o = o || {}; var W = swkAt(G, x, o.y || 0, z, o.ry || 0); swkBox(W, len, o.h || 0.8, o.d || 0.45, swkM(o.c || 0x8A8478, o.tex || "stone"), 0, (o.h || 0.8) / 2, 0); swkBox(W, len + 0.1, 0.08, (o.d || 0.45) + 0.1, swkM(o.cap || 0x9A9488, "stone"), 0, (o.h || 0.8) + 0.04, 0); return W; }
function swkRug(G, x, z, w, d, col, y, ry) { var m = swkFlat(G, w, d, swkM(col, "wood"), x, (y || 0) + 0.025, z, ry); m.material = swkRugMat(col); return m; }
function swkRugMat(col) { return __ZC(519, 9, this, arguments, new.target); }
function swkPeople(G, seed, list, ground) { return __ZC(519, 10, this, arguments, new.target); }
function swkLive(g) { var o = g; while (o) {
if (o.visible === false)
return false;
if (o.isScene)
return true;
o = o.parent;
} return false; }
function swkTick(t) { return __ZC(519, 11, this, arguments, new.target); }
"use strict";
var KSW = { on: !(typeof window !== "undefined" && window.KIT_OFF), styles: {}, done: {}, night: 0, mats: {}, areas: [], last: null, ticking: false, lite: null,
stat: { buildings: 0, roofs: 0, windows: 0, props: 0, folk: 0, scatter: 0, areas: 0 } };
function kitLite() { if (KSW.lite === null)
KSW.lite = (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); return KSW.lite; }
var KIT_BASE = {
name: "", era: "", culture: "",
pal: { wall: [0xD8CCB4, 0xC8B89A, 0xE0D6C2], trim: 0xEDE6D6, roof: [0x8A5A44, 0x7A4E3C], door: [0x4A3022, 0x2E3A4A, 0x5A2A22], shutter: [0x3A5A44, 0x5A3A2A],
wood: 0x7A5634, metal: 0x2A2C30, canvas: [[0xC83A3A, 0xF0ECE0], [0x2E5A8A, 0xF0ECE0]], glass: 0x34424E, lit: 0xFFC878, goods: [0xD84A2A, 0xE8B030, 0x6A9A3A, 0xB8862A] },
mat: { wall: "plaster", trim: "stone", roof: "tile", door: "wood" },
roof: ["gable", "hip"], win: "sash", shutters: 0.4, balcony: 0.1, boxes: 0.2, cornice: 1, plinth: 1, weather: 0.5,
lamp: "lantern", lampCol: 0xFFD49A,
ground: [["puddle", 0.3], ["pebble", 0.6], ["leaf", 0.4]], edge: [["weed", 0.6], ["grime", 0.5]],
props: [["barrel", 2], ["crates", 2], ["bench", 2], ["stall", 2], ["cart", 1], ["planter", 1]],
folk: { titles: ["townsperson", "merchant", "worker"], look: null, n: 6, walk: 0.5 },
light: { fill: 0x8EA2CC, floor: 0.62, fogL: 0.13, day: 0.5 },
areas: [], build: 1, scatter: 1, life: 1, radius: 70
};
function kitStyle(key, o) { var S = KSW.styles[key] || (KSW.styles[key] = { key: key }); for (var k in o)
S[k] = o[k]; return S; }
function kitStyleOf(key) { return __ZC(519, 12, this, arguments, new.target); }
function kitHash(n) { n = (n | 0) ^ 61 ^ ((n | 0) >>> 16); n = (n + (n << 3)) | 0; n ^= n >>> 4; n = Math.imul(n, 0x27d4eb2d); return (n ^ (n >>> 15)) >>> 0; }
function kitRand(seed) { var s = kitHash(seed) || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 100000) / 100000; }; }
function kitPick(list, r) { if (!Array.isArray(list))
return list; return list[Math.floor(r * list.length) % list.length]; }
function kitWeighted(list, r) { var t = 0, i; for (i = 0; i < list.length; i++)
t += list[i][1]; var v = r * t; for (i = 0; i < list.length; i++) {
v -= list[i][1];
if (v <= 0)
return list[i][0];
} return list[list.length - 1][0]; }
function kitCol(c, f, dh, ds) { var C = new THREE.Color(c); if (dh || ds)
C.offsetHSL(dh || 0, ds || 0, 0); if (f !== undefined && f !== 1)
C.multiplyScalar(f); return C; }
"use strict";
var KIT_M4 = new THREE.Matrix4(), KIT_Q = new THREE.Quaternion(), KIT_E = new THREE.Euler(), KIT_V = new THREE.Vector3(), KIT_S = new THREE.Vector3(1, 1, 1);
function kitBatch() { return { parts: {}, n: 0 }; }
function kitAdd(B, kind, col, g, x, y, z, ry, rx, rz) { return __ZC(519, 13, this, arguments, new.target); }
function kitAddF(B, F, kind, col, g, lx, ly, lz, ry, rx, rz) {
var c = Math.cos(F.ry), s = Math.sin(F.ry);
return kitAdd(B, kind, col, g, F.x + lx * c + lz * s, F.y + ly, F.z - lx * s + lz * c, F.ry + (ry || 0), rx, rz);
}
function kitBoxG(w, h, d) { var g = new THREE.BoxGeometry(w, h, d); if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]); return g; }
function kitCylG(rt, rb, h, seg) { var g = new THREE.CylinderGeometry(rt, rb, h, seg || 8); if (typeof metreUVs === "function")
metreUVs(g, "cyl", [rt, rb, h]); return g; }
function kitBallG(r, det) { var g = new THREE.IcosahedronGeometry(r, det || 0); if (typeof metreUVs === "function")
metreUVs(g, "ico", [r]); return g; }
function kitConeG(r, h, seg) { var g = new THREE.ConeGeometry(r, h, seg || 8); if (typeof metreUVs === "function")
metreUVs(g, "cone", [r, h]); return g; }
function kitGableG(w, h, d) { return __ZC(519, 14, this, arguments, new.target); }
function kitHipG(w, h, d) { return __ZC(519, 15, this, arguments, new.target); }
function kitMat(kind) { return __ZC(519, 16, this, arguments, new.target); }
function kitPress(B, P) { return __ZC(519, 17, this, arguments, new.target); }
function kitInst(P, geo, mat, list) { return __ZC(519, 18, this, arguments, new.target); }
"use strict";
var KIT_BV = new THREE.Vector3(), KIT_BB = new THREE.Box3();
function kitDescOf(m) { return __ZC(519, 19, this, arguments, new.target); }
function kitBlockAt(D, mw, W) { return __ZC(519, 20, this, arguments, new.target); }
function kitBlockOf(m, W) { var D = kitDescOf(m); return D ? kitBlockAt(D, m.matrixWorld, W) : null; }
function kitNoteBake(root) { return __ZC(519, 21, this, arguments, new.target); }
(function () {
["gwBake", "grBake"].forEach(function (fn) {
if (typeof window === "undefined" || typeof window[fn] !== "function")
return;
var f0 = window[fn];
window[fn] = function (root) {
var notes = KSW.on && KSW.cur && root && root.traverse ? kitNoteBake(root) : null;
var res = f0.apply(this, arguments);
if (notes && notes.length) {
var keep = (res && res.isObject3D) ? res : root;
keep.userData.kitN = (keep.userData.kitN || []).concat(notes);
}
return res;
};
});
})();
function kitSpace(W, list) { return __ZC(519, 22, this, arguments, new.target); }
function kitNear(S, x0, x1, z0, z1, fn) { return __ZC(519, 23, this, arguments, new.target); }
function kitFaces(b) { return __ZC(519, 24, this, arguments, new.target); }
function kitDressBlock(B, S, A, b, info) { return __ZC(519, 25, this, arguments, new.target); }
function kitWindow(B, S, F, cx, s, sh, bw, b, trimC, tk, shutC, r, first) { return __ZC(519, 26, this, arguments, new.target); }
function kitDoor(B, S, F, cx, bw, sh, doorC, trimC, tk, r, b) { return __ZC(519, 27, this, arguments, new.target); }
function kitLampOnWall(B, S, F, lx, ly) {
var mC = kitCol(S.pal.metal);
kitAddF(B, F, "metal", mC, kitBoxG(0.05, 0.05, 0.4), lx, ly + 0.3, 0.2);
kitAddF(B, F, "metal", mC, kitBoxG(0.24, 0.06, 0.24), lx, ly + 0.28, 0.4);
kitAddF(B, F, "glow", kitCol(S.lampCol), kitBoxG(0.18, 0.26, 0.18), lx, ly + 0.1, 0.4);
}
function kitShopFront(B, S, F, cx, bw, sh, trimC, tk, r) { return __ZC(519, 28, this, arguments, new.target); }
function kitRoof(B, S, b, r, roofC, rk, trimC, tk, wallC) { return __ZC(519, 29, this, arguments, new.target); }
function kitDormer(B, S, F, lx, ly, lz, ry, roofC, rk, wallC) { return __ZC(519, 30, this, arguments, new.target); }
function kitRetaining(W, b) { return __ZC(519, 31, this, arguments, new.target); }
function kitDressBuildings(W, S, A, B, all) { return __ZC(519, 32, this, arguments, new.target); }
"use strict";
function kitLum(c) { return 0.2126 * ((c >> 16) & 255) / 255 + 0.7152 * ((c >> 8) & 255) / 255 + 0.0722 * (c & 255) / 255; }
function kitHexL(c, minL) { var C = new THREE.Color(c), h = {}; C.getHSL(h); if (h.l >= minL)
return c; C.setHSL(h.h, Math.min(h.s, 0.45), minL); return C.getHex(); }
function kitNightOf(E) { return __ZC(519, 33, this, arguments, new.target); }
function kitLightE(E, S) { return __ZC(519, 34, this, arguments, new.target); }
function kitLightE0(E, S) { return __ZC(519, 35, this, arguments, new.target); }
(function () {
if (typeof worldEnv !== "function")
return;
var env0 = worldEnv;
worldEnv = function (E) {
try {
if (KSW.on && E && typeof WLD !== "undefined" && WLD.on) {
var S = KSW.cur && KSW.cur.key === WLD.on ? KSW.cur.S : null;
if (S)
E = kitLightE(E, S);
}
}
catch (e) { }
return env0.call(this, E);
};
})();
function kitGlowTick() {
var on = KSW.night > 0.3;
KSW.areas.forEach(function (A) { if (A.lit)
A.lit.forEach(function (m) { m.visible = on && A.g.visible; }); });
}
"use strict";
var KIT_RC = new THREE.Raycaster(), KIT_DN = new THREE.Vector3(0, -1, 0), KIT_O = new THREE.Vector3();
function kitGroundY(W, A, x, z) { return __ZC(519, 36, this, arguments, new.target); }
function kitFree(W, A, x, z, y, rr) { return __ZC(519, 37, this, arguments, new.target); }
function kitPatchTex() { return __ZC(519, 38, this, arguments, new.target); }
var KIT_SC = {};
function kitScShape(kind) { return __ZC(519, 39, this, arguments, new.target); }
function kitMergeG(list) { return __ZC(519, 40, this, arguments, new.target); }
function kitScCol(S, kind, r) { return __ZC(519, 41, this, arguments, new.target); }
function kitScatter(W, S, A, kind, n, P) { return __ZC(519, 42, this, arguments, new.target); }
function kitEdges(W, S, A, P) { return __ZC(519, 43, this, arguments, new.target); }
function kitGround(W, S, A, P) { return __ZC(519, 44, this, arguments, new.target); }
function kitNoise(x, z) { return 0.5 + 0.25 * (Math.sin(x * 0.031 + 1.7 * Math.sin(z * 0.023)) + Math.sin(z * 0.029 + 1.3 * Math.sin(x * 0.019))); }
function kitLiftFloor(W, S) { return __ZC(519, 45, this, arguments, new.target); }
"use strict";
var KIT_PROPS = {};
KIT_PROPS.barrel = function (B, S, F, r) { return __ZC(519, 46, this, arguments, new.target); };
KIT_PROPS.crates = function (B, S, F, r) { return __ZC(519, 47, this, arguments, new.target); };
KIT_PROPS.sacks = function (B, S, F, r) { var c = kitCol(S.pal.sack || 0xB8A07A); for (var i = 0; i < 3 + ((r() * 3) | 0); i++) {
var g = kitBallG(0.3, 1);
g.scale(1, 1.25, 0.8);
kitAddF(B, F, "plain", c.clone().multiplyScalar(0.85 + r() * 0.2), g, (i % 3) * 0.5 - 0.5, 0.32 + (i > 2 ? 0.45 : 0), (i > 2 ? 0.1 : 0) + (r() - 0.5) * 0.1, r());
} return 0.8; };
KIT_PROPS.bench = function (B, S, F, r) { return __ZC(519, 48, this, arguments, new.target); };
KIT_PROPS.stall = function (B, S, F, r) { return __ZC(519, 49, this, arguments, new.target); };
KIT_PROPS.cart = function (B, S, F, r) { return __ZC(519, 50, this, arguments, new.target); };
KIT_PROPS.well = function (B, S, F, r) { return __ZC(519, 51, this, arguments, new.target); };
KIT_PROPS.hay = function (B, S, F, r) { var c = kitCol(0xC8A858); for (var i = 0; i < 2 + ((r() * 2) | 0); i++) {
var g = kitCylG(0.55, 0.55, 1.1, kitLite() ? 8 : 12);
kitAddF(B, F, "thatch", c.clone().multiplyScalar(0.9 + r() * 0.2), g, (i % 2) * 1.15 - 0.5, 0.55, (i > 1 ? 1.1 : 0), 0, 0, Math.PI / 2);
} return 1.3; };
KIT_PROPS.woodpile = function (B, S, F, r) { var c = kitCol(0x7A5A3A); for (var row = 0; row < 3; row++)
for (var i = 0; i < 5 - row; i++)
kitAddF(B, F, "wood", c.clone().multiplyScalar(0.8 + r() * 0.3), kitCylG(0.12, 0.12, 1.1, 6), -0.5 + i * 0.25 + row * 0.12, 0.12 + row * 0.21, 0, Math.PI / 2, 0, Math.PI / 2); return 0.8; };
KIT_PROPS.trough = function (B, S, F, r) { var st = kitCol(S.pal.trim, 0.85); kitAddF(B, F, "stone", st, kitBoxG(2, 0.6, 0.7), 0, 0.3, 0); kitAddF(B, F, "plain", kitCol(0x2A3E4A), new THREE.PlaneGeometry(1.8, 0.5), 0, 0.58, 0, 0, -Math.PI / 2); return 1.1; };
KIT_PROPS.planter = function (B, S, F, r) { return __ZC(519, 52, this, arguments, new.target); };
KIT_PROPS.pots = function (B, S, F, r) { return __ZC(519, 53, this, arguments, new.target); };
KIT_PROPS.table = function (B, S, F, r) { return __ZC(519, 54, this, arguments, new.target); };
KIT_PROPS.washing = function (B, S, F, r) { return __ZC(519, 55, this, arguments, new.target); };
KIT_PROPS.signpost = function (B, S, F, r) { var wd = kitCol(S.pal.wood); kitAddF(B, F, "wood", wd, kitBoxG(0.12, 2.6, 0.12), 0, 1.3, 0); for (var i = 0; i < 2; i++)
kitAddF(B, F, "wood", wd.clone().multiplyScalar(1.1), kitBoxG(1.1, 0.22, 0.04), 0.45 * (i ? -1 : 1), 2.2 - i * 0.35, 0, i * 1.2); return 0.4; };
KIT_PROPS.fence = function (B, S, F, r) { var wd = kitCol(S.pal.wood, 0.9); for (var i = 0; i < 4; i++)
kitAddF(B, F, "wood", wd, kitBoxG(0.1, 1.0, 0.1), -1.8 + i * 1.2, 0.5, 0); [0.35, 0.8].forEach(function (h) { kitAddF(B, F, "wood", wd, kitBoxG(3.7, 0.08, 0.05), 0, h, 0); }); return 1.9; };
KIT_PROPS.firepit = function (B, S, F, r) { return __ZC(519, 56, this, arguments, new.target); };
KIT_PROPS.canister = function (B, S, F, r) { return __ZC(519, 57, this, arguments, new.target); };
KIT_PROPS.solar = function (B, S, F, r) { kitAddF(B, F, "metal", kitCol(0x8A8C90), kitCylG(0.07, 0.09, 1.0, 6), 0, 0.5, 0); kitAddF(B, F, "plain", kitCol(0x1E2A48), kitBoxG(2.2, 0.06, 1.3), 0, 1.05, 0, 0, -0.55); kitAddF(B, F, "metal", kitCol(0xB8BCC0), kitBoxG(2.3, 0.04, 0.06), 0, 1.05, 0.62, 0, -0.55); return 1.2; };
KIT_PROPS.antenna = function (B, S, F, r) { var m = kitCol(0xB8BCC0); kitAddF(B, F, "metal", m, kitCylG(0.05, 0.08, 4, 6), 0, 2, 0); var d = new THREE.SphereGeometry(0.7, 10, 5, 0, Math.PI * 2, 0, Math.PI / 3); kitAddF(B, F, "metal", kitCol(0xE0E0DC), d, 0, 3.3, 0.2, 0, -1.0); kitAddF(B, F, "glow", kitCol(0xFF5A40), kitBallG(0.08, 0), 0, 4.05, 0); return 0.6; };
KIT_PROPS.kiosk = function (B, S, F, r) { var c = kitCol(kitPick(S.pal.wall, r())); kitAddF(B, F, "metal", c, kitBoxG(1.2, 2.1, 0.9), 0, 1.05, 0); kitAddF(B, F, "glow", kitCol(S.pal.screen || 0x6AD0E0, 0.85), new THREE.PlaneGeometry(0.8, 0.6), 0, 1.45, 0.46); kitAddF(B, F, "metal", kitCol(S.pal.trim), kitBoxG(1.4, 0.12, 1.1), 0, 2.16, 0); return 0.9; };
KIT_PROPS["crate-metal"] = function (B, S, F, r) { var c = kitCol(kitPick(S.pal.tank || [0x6A7078, 0x8A6A3A], r())); kitAddF(B, F, "metal", c, kitBoxG(1.2, 0.9, 0.9), 0, 0.45, 0); kitAddF(B, F, "metal", c.clone().multiplyScalar(0.85), kitBoxG(0.9, 0.7, 0.8), 0.2, 1.25, 0, 0.3); kitAddF(B, F, "metal", kitCol(0xE0B020), kitBoxG(1.22, 0.08, 0.92), 0, 0.75, 0); return 0.9; };
KIT_PROPS.log = function (B, S, F, r) { kitAddF(B, F, "bark", kitCol(0x6A5038), kitCylG(0.3, 0.34, 2.4, 8), 0, 0.3, 0, 0, 0, Math.PI / 2); if (!kitLite())
kitAddF(B, F, "leafy", kitCol(0x3E5A2A), kitBallG(0.25, 0), 0.6, 0.55, 0.1); return 1.3; };
KIT_PROPS.mushroom = function (B, S, F, r) { return __ZC(519, 58, this, arguments, new.target); };
KIT_PROPS.lanternstring = function (B, S, F, r) { return __ZC(519, 59, this, arguments, new.target); };
KIT_PROPS.pumpkins = function (B, S, F, r) { return __ZC(519, 60, this, arguments, new.target); };
KIT_PROPS.stook = function (B, S, F, r) { var c = kitCol(0xC8A858); for (var i = 0; i < 2; i++) {
var g = kitConeG(0.55, 1.7, kitLite() ? 6 : 9);
kitAddF(B, F, "thatch", c.clone().multiplyScalar(0.85 + r() * 0.25), g, i * 1.3 - 0.65, 0.85, (r() - 0.5) * 0.4);
kitAddF(B, F, "thatch", c.clone().multiplyScalar(0.75), kitCylG(0.58, 0.6, 0.12, 8), i * 1.3 - 0.65, 0.75, 0);
} return 1.2; };
KIT_PROPS.turnips = function (B, S, F, r) { kitAddF(B, F, "wood", kitCol(S.pal.wood), kitBoxG(1.1, 0.5, 0.7), 0, 0.25, 0); for (var i = 0; i < (kitLite() ? 3 : 7); i++) {
var g = kitBallG(0.12, 0);
kitAddF(B, F, "plain", kitCol(i % 2 ? 0xE8D8E0 : 0xB868A8), g, (r() - 0.5) * 0.9, 0.55, (r() - 0.5) * 0.5);
} return 0.7; };
function kitLamp(B, S, F, r) { return __ZC(519, 61, this, arguments, new.target); }
function kitFolk(W, S, A, P) { return __ZC(519, 62, this, arguments, new.target); }
function kitLife(W, S, A, B) { return __ZC(519, 63, this, arguments, new.target); }
"use strict";
function kitLeafCols(S) { return S.pal.leaf || [0x4A6A2A, 0x587A32, 0x3E5E28, 0x6A7A38]; }
KIT_PROPS.tree = function (B, S, F, r) { return __ZC(519, 64, this, arguments, new.target); };
function kitHedge(B, S, F, len, r) { return __ZC(519, 65, this, arguments, new.target); }
function kitHouse(W, S, A, B, x, z, ry, r) { return __ZC(519, 66, this, arguments, new.target); }
function kitFillArea(W, S, A, B, put, r, solids) { return __ZC(519, 67, this, arguments, new.target); }
function kitFronts(W, S, A, B, put, r, n) { return __ZC(519, 68, this, arguments, new.target); }
function kitSignOnWall(B, S, F, r) { return __ZC(519, 69, this, arguments, new.target); }
"use strict";
var KIT_FORMS = { stall: {}, cart: {}, kiosk: {} };
KIT_FORMS.stall.awning = KIT_PROPS.stall;
KIT_FORMS.cart.wagon = KIT_PROPS.cart;
KIT_FORMS.kiosk.box = KIT_PROPS.kiosk;
function kitGoods(B, S, F, r, x0, x1, y, z, n) { var gd = S.pal.goods; for (var i = 0; i < n; i++) {
var gx = x0 + (x1 - x0) * (i + 0.5) / n;
kitAddF(B, F, "plain", kitCol(kitPick(gd, r())), kitBallG(0.09, 0), gx, y, z + (r() - 0.5) * 0.2);
} }
KIT_PROPS.stall = function (B, S, F, r) { var f = KIT_FORMS.stall[S.stall || "awning"] || KIT_FORMS.stall.awning; return f(B, S, F, r); };
KIT_PROPS.cart = function (B, S, F, r) { var f = KIT_FORMS.cart[S.cart || "wagon"] || KIT_FORMS.cart.wagon; return f(B, S, F, r); };
KIT_PROPS.kiosk = function (B, S, F, r) { var f = KIT_FORMS.kiosk[S.kiosk || "box"] || KIT_FORMS.kiosk.box; return f(B, S, F, r); };
KIT_FORMS.stall.booth = function (B, S, F, r) { return __ZC(519, 70, this, arguments, new.target); };
KIT_FORMS.cart.barrow = function (B, S, F, r) { return __ZC(519, 71, this, arguments, new.target); };
KIT_FORMS.stall.souk = function (B, S, F, r) { return __ZC(519, 72, this, arguments, new.target); };
KIT_FORMS.cart.handcart = function (B, S, F, r) { return __ZC(519, 73, this, arguments, new.target); };
KIT_FORMS.stall.pod = function (B, S, F, r) { return __ZC(519, 74, this, arguments, new.target); };
KIT_FORMS.cart.trailer = function (B, S, F, r) { return __ZC(519, 75, this, arguments, new.target); };
KIT_FORMS.stall.ice = function (B, S, F, r) { return __ZC(519, 76, this, arguments, new.target); };
KIT_FORMS.cart.sledge = function (B, S, F, r) { return __ZC(519, 77, this, arguments, new.target); };
KIT_FORMS.stall.pavilion = function (B, S, F, r) { return __ZC(519, 78, this, arguments, new.target); };
KIT_FORMS.cart.ebike = function (B, S, F, r) { return __ZC(519, 79, this, arguments, new.target); };
KIT_FORMS.stall.altar = function (B, S, F, r) { return __ZC(519, 80, this, arguments, new.target); };
KIT_FORMS.stall.harvest = function (B, S, F, r) { return __ZC(519, 81, this, arguments, new.target); };
KIT_FORMS.cart.haywain = function (B, S, F, r) { return __ZC(519, 82, this, arguments, new.target); };
KIT_FORMS.kiosk.terminal = function (B, S, F, r) { return __ZC(519, 83, this, arguments, new.target); };
KIT_FORMS.kiosk.pillar = function (B, S, F, r) { return __ZC(519, 84, this, arguments, new.target); };
KIT_FORMS.kiosk.totem = function (B, S, F, r) { return __ZC(519, 85, this, arguments, new.target); };
KIT_FORMS.stall.chalet = function (B, S, F, r) { return __ZC(519, 86, this, arguments, new.target); };
KIT_FORMS.cart.sleigh = function (B, S, F, r) { return __ZC(519, 87, this, arguments, new.target); };
KIT_FORMS.stall.hut = function (B, S, F, r) { return __ZC(519, 88, this, arguments, new.target); };
KIT_FORMS.cart.dugout = function (B, S, F, r) { return __ZC(519, 89, this, arguments, new.target); };
KIT_FORMS.stall.lodge = function (B, S, F, r) { return __ZC(519, 90, this, arguments, new.target); };
KIT_FORMS.cart.iceboat = function (B, S, F, r) { return __ZC(519, 91, this, arguments, new.target); };
KIT_FORMS.stall.toadstool = function (B, S, F, r) { return __ZC(519, 92, this, arguments, new.target); };
KIT_FORMS.cart.nutshell = function (B, S, F, r) { return __ZC(519, 93, this, arguments, new.target); };
KIT_FORMS.stall.hab = function (B, S, F, r) { return __ZC(519, 94, this, arguments, new.target); };
KIT_FORMS.cart.moonrover = function (B, S, F, r) { return __ZC(519, 95, this, arguments, new.target); };
KIT_FORMS.stall.gondola = function (B, S, F, r) { return __ZC(519, 96, this, arguments, new.target); };
KIT_FORMS.cart.samplerig = function (B, S, F, r) { return __ZC(519, 97, this, arguments, new.target); };
KIT_FORMS.stall.cellstall = function (B, S, F, r) { return __ZC(519, 98, this, arguments, new.target); };
KIT_FORMS.cart.orecart = function (B, S, F, r) { return __ZC(519, 99, this, arguments, new.target); };
KIT_FORMS.stall.salvage = function (B, S, F, r) { return __ZC(519, 100, this, arguments, new.target); };
KIT_FORMS.cart.drumcart = function (B, S, F, r) { return __ZC(519, 101, this, arguments, new.target); };
KIT_FORMS.stall.lampniche = function (B, S, F, r) { return __ZC(519, 102, this, arguments, new.target); };
KIT_FORMS.cart.minetub = function (B, S, F, r) { return __ZC(519, 103, this, arguments, new.target); };
KIT_FORMS.stall.forge = function (B, S, F, r) { return __ZC(519, 104, this, arguments, new.target); };
KIT_FORMS.cart.crucible = function (B, S, F, r) { return __ZC(519, 105, this, arguments, new.target); };
KIT_FORMS.stall.teahouse = function (B, S, F, r) { return __ZC(519, 106, this, arguments, new.target); };
KIT_FORMS.cart.palanquin = function (B, S, F, r) { return __ZC(519, 107, this, arguments, new.target); };
KIT_FORMS.stall.scopestall = function (B, S, F, r) { return __ZC(519, 108, this, arguments, new.target); };
KIT_FORMS.cart.lensdolly = function (B, S, F, r) { return __ZC(519, 109, this, arguments, new.target); };
KIT_FORMS.stall.boatstall = function (B, S, F, r) { return __ZC(519, 110, this, arguments, new.target); };
KIT_FORMS.cart.netcart = function (B, S, F, r) { return __ZC(519, 111, this, arguments, new.target); };
KIT_FORMS.stall.glazier = function (B, S, F, r) { return __ZC(519, 112, this, arguments, new.target); };
KIT_FORMS.cart.panecart = function (B, S, F, r) { return __ZC(519, 113, this, arguments, new.target); };
KIT_FORMS.stall.shellkiosk = function (B, S, F, r) { return __ZC(519, 114, this, arguments, new.target); };
KIT_FORMS.cart.reedsled = function (B, S, F, r) { return __ZC(519, 115, this, arguments, new.target); };
KIT_FORMS.stall.lectern = function (B, S, F, r) { return __ZC(519, 116, this, arguments, new.target); };
KIT_FORMS.cart.driftslab = function (B, S, F, r) { return __ZC(519, 117, this, arguments, new.target); };
"use strict";
function kitAreasOf(S) { return (S.areas || []).map(function (a) { return { x: a[0], z: a[1], r: a[2] || S.radius || 70, S: kitZoneStyle(S, a[3]) }; }); }
function kitZoneStyle(S, zone) {
var Z = zone && S.zones && S.zones[zone];
if (!Z)
return S;
var o = {}, k;
for (k in S)
o[k] = S[k];
for (k in Z) {
if (k === "pal" || k === "folk") {
o[k] = {};
var a = S[k] || {}, b = Z[k];
for (var q in a)
o[k][q] = a[q];
for (q in b)
o[k][q] = b[q];
}
else
o[k] = Z[k];
}
o.zone = zone;
return o;
}
var KIT_CLIPMAT = {};
function kitClipRays(list, W, A) { return __ZC(519, 118, this, arguments, new.target); }
function kitStart(key, W, S) { return __ZC(519, 119, this, arguments, new.target); }
function kitTick() { return __ZC(519, 120, this, arguments, new.target); }
(function () {
var last = 0;
function walk(t) {
var dt = Math.min(0.1, last ? (t - last) / 1000 : 0);
last = t;
if (typeof wWander === "function" && typeof WLD !== "undefined" && WLD.on)
KSW.areas.forEach(function (A) {
if (A.key !== WLD.on || !A.g.visible)
return;
A.people.forEach(function (p) {
if (!p.walk || !p.g.visible)
return;
var y = p.y;
wWander(p.g, dt, function () { return y; }, { r: 4, sp: 0.9 });
var W = A.W;
if (W.block) {
try {
if (W.block(p.g.position.x, p.g.position.z, y + 0.2)) {
var u = p.g.userData.wan;
if (u) {
u.tx = u.hx;
u.tz = u.hz;
}
}
}
catch (e) { }
}
});
});
requestAnimationFrame(walk);
}
if (typeof requestAnimationFrame === "function")
requestAnimationFrame(walk);
})();
(function () {
if (!KSW.on || typeof worldGo !== "function")
return;
var go0 = worldGo;
worldGo = function (key) {
var S = null;
try {
S = kitStyleOf(key);
KSW.cur = S ? { key: key, S: S } : null;
}
catch (e) {
KSW.cur = null;
}
var r = go0.apply(this, arguments);
try {
var W = WORLDS[key];
if (S && W && W.g && !W.g.userData.kit) {
W.g.userData.kit = 1;
var G = W.g;
setTimeout(function () { if (W.g === G)
kitStart(key, W, S); }, 1200);
}
}
catch (e) {
if (window.console)
console.warn("[kit]", key, e);
}
return r;
};
if (typeof worldOff === "function") {
var off0 = worldOff;
worldOff = function () { var was = typeof WLD !== "undefined" ? WLD.on : null, r = off0.apply(this, arguments); if (KSW.cur && KSW.cur.key === was) {
KSW.cur = null;
KSW.night = 0;
} return r; };
}
})();
"use strict";
function kitSpotsOf(O, r) { return __ZC(519, 121, this, arguments, new.target); }
kitStyle("bard", { name: "Shakespeare's London", era: "1600", culture: "Elizabethan English",
pal: { wall: [0xF0E6D0, 0xEADCC0, 0xE6E0D4], trim: 0x9A8E7A, roof: [0xB06A4A, 0x9A5A3E], door: [0x3A2A1C, 0x4A3424], shutter: [0x3A2A1C, 0x5A4A30],
wood: 0x6A4A2E, metal: 0x26221E, canvas: [[0xC8B890, 0x8A3A2A], [0xD8CCA8, 0x3A4A2A], [0xB89A6A, 0xE8DCC0]], glass: 0x2E3A42, lit: 0xFFB860,
goods: [0xC83A2A, 0x6A8A3A, 0xE8C050, 0x8A5A2A, 0xD8D0B0], cloth: [0xE8E0CC, 0xC8B898, 0x8A3A2A, 0x4A5A3A], sack: 0xB8A07A },
mat: { wall: "plaster", trim: "wood", roof: "tile" }, roof: ["gable"], win: "casement", shutters: 0.25, balcony: 0, boxes: 0.15, shops: 0.3,
lamp: "lantern", lampCol: 0xFFC070, chimney: 0.8,
ground: [["puddle", 0.55], ["straw", 0.9], ["pebble", 0.5], ["setts", 0.3], ["leaf", 0.2], ["dust", 0.5]],
edge: [["grime", 0.6], ["stones", 0.15]],
props: [["barrel", 3], ["crates", 2], ["sacks", 2], ["cart", 1.5], ["bench", 1], ["trough", 0.6], ["woodpile", 1], ["washing", 0.7], ["hay", 0.6]],
mid: "stall", mid2: "cart", cartLoad: "barrels", stall: "booth", cart: "barrow",
folk: { titles: ["costermonger", "carter", "apprentice", "player", "waterman", "gentlewoman", "fishwife", "baker"], n: 7, walk: 0.5 },
light: { fill: 0x8EA0C8, floor: 0.6, fogL: 0.14, day: 0.55, moon: 0xB8C4E8 },
avoid: function () { return __ZC(519, 122, this, arguments, new.target); },
tree: "broad",
fill: { fronts: 16, trees: 6, seats: 2, clusters: 4, edge: 0.4, green: [["bench", 2], ["trough", 1]] },
front: [["barrel", 2], ["crates", 1.5], ["sacks", 1.2], ["bench", 1], ["walllamp", 1.2], ["sign", 1.6], ["woodpile", 0.4]],
zones: {
yard: { mid: "stall", mid2: "table", props: [["bench", 2], ["crates", 1.5], ["barrel", 1], ["sacks", 0.8], ["cart", 0.5]],
fill: { fronts: 10, trees: 18, seats: 6, hedges: 2, edge: 0.3, clusters: 6, cluster: [["stall", 3], ["cart", 0.6]], green: [["bench", 2], ["crates", 1], ["planter", 0.5]] },
ground: [["leaf", 0.9], ["pebble", 0.6], ["puddle", 0.3], ["straw", 0.3]],
folk: { titles: ["bookseller", "ballad singer", "apprentice", "gentlewoman", "preacher's listener", "printer's boy"], n: 4, walk: 0.5 } },
road: { mid: "cart", mid2: "trough", props: [["cart", 1.5], ["hay", 1], ["trough", 1], ["bench", 1], ["fence", 1], ["barrel", 1]],
fill: { fronts: 10, trees: 0, seats: 2, hedges: 0, edge: 0.4, clusters: 3, cluster: [["cart", 2], ["stall", 1]], green: [["bench", 1], ["fence", 1], ["hay", 0.6]] },
ground: [["straw", 0.8], ["puddle", 0.5], ["leaf", 0.4], ["pebble", 0.4]],
folk: { titles: ["courtier", "carter", "waterman", "guard", "gentlewoman", "messenger"], n: 7, walk: 0.6 } }
},
areas: [[-351, 352, 60], [-513, 377, 55], [-194, 377, 55], [-294, -497, 60, "yard"], [42, -449, 60], [257, -39, 60], [255, 298, 55], [-1139, -285, 55, "road"]] });
kitStyle("guildlands", { name: "the Guildlands", era: "high middle ages", culture: "guild town",
pal: { wall: [0xD8D0BE, 0xC8BCA2], trim: 0x7A6A52, roof: [0x5A4A3E, 0x6A5A4A, 0x4E5258], door: [0x5A3A22, 0x3A2A1A], shutter: [0x5A3A22, 0x3A4A3A],
wood: 0x7A5634, metal: 0x2A2A2C, canvas: [[0x2E5A3A, 0xE0D4B0], [0x8A2A2A, 0xE8D8A8], [0x3A4A7A, 0xE8E0C8]], glass: 0x2A3440, lit: 0xFFB050,
goods: [0xB0B4BA, 0x8A5A2A, 0xC8A040, 0x6A8A3A, 0x9A2A2A], sack: 0xA89070, flowers: [0xE8C040, 0xC84A6A, 0xE8E0F0] },
mat: { wall: "stone", trim: "wood", roof: "shingle" }, roof: ["gable", "hip"], win: "lattice", shutters: 0.6, balcony: 0, boxes: 0.25,
lamp: "torch", lampCol: 0xFFA040, chimney: 0.6,
ground: [["straw", 0.6], ["pebble", 0.7], ["flower", 0.25], ["dust", 0.6], ["rock", 0.12], ["puddle", 0.15]],
edge: [["weed", 0.8], ["stones", 0.3], ["moss", 0.4]],
props: [["barrel", 2], ["crates", 2], ["sacks", 1.5], ["woodpile", 2], ["hay", 1.5], ["cart", 1.2], ["well", 0.5], ["signpost", 0.5], ["fence", 0.8], ["trough", 0.6], ["firepit", 0.4]],
mid: "stall", mid2: "table", cartLoad: "hay",
folk: { titles: ["blacksmith", "weaver", "tanner", "guard", "apprentice", "merchant", "farmer", "herbalist"], n: 7, walk: 0.5 },
light: { fill: 0x9AA8C8, floor: 0.62, fogL: 0.14, day: 0.55 },
zones: {
wood: { mid: "woodpile", mid2: "log", lamp: "torch", props: [["log", 3], ["mushroom", 2], ["woodpile", 1.5], ["firepit", 0.5], ["crates", 0.4], ["fence", 0.3]],
ground: [["leaf", 1.6], ["moss", 0.6], ["rock", 0.25], ["flower", 0.3], ["pebble", 0.3]], folk: { titles: ["forester", "woodcutter", "charcoal burner", "herb gatherer", "hunter"], n: 4, walk: 0.6 }, build: 1 },
moor: { mid: "hay", mid2: "fence", lamp: "torch", props: [["fence", 2], ["hay", 1.5], ["trough", 1], ["signpost", 0.6], ["sacks", 0.6], ["cart", 0.6]],
ground: [["rock", 0.5], ["flower", 0.6], ["pebble", 0.5], ["dust", 0.3]], folk: { titles: ["shepherd", "farmer", "drover", "herbalist"], n: 4, walk: 0.6 } }
},
tree: "broad", fill: { fronts: 8, trees: 5, seats: 1, clusters: 2 },
areas: [[41, 111, 60], [-41, 26, 55], [1013, 497, 55, "moor"], [289, -267, 55, "wood"], [492, -1105, 55, "wood"], [408, -284, 50, "wood"], [-54, 233, 55], [300, 208, 55, "moor"]] });
kitStyle("samhain", { name: "Hollowmere", era: "old Samhain custom", culture: "Irish village",
pal: { wall: [0xE6E0D2, 0xD8D0C0, 0xA8A090], trim: 0x8A8478, roof: [0x9A8458, 0x7A6A48], door: [0x3A2A1C, 0x5A2A1E, 0x2A3A2E], shutter: [0x2A3A2E, 0x4A2A1E],
wood: 0x5A4430, metal: 0x1E1C1A, canvas: [[0x5A2A6A, 0xE8803A], [0x2A2A2A, 0xD8A040]], glass: 0x1E242C, lit: 0xFFA040, leaf: [0xA8642A, 0xC8842E, 0x8A4A22, 0x6A6A2A, 0x7A5A28], hedge: 0x3E4A2A, bark: 0x3A3028,
goods: [0xD86A1A, 0xE8C040, 0x8A3A6A, 0x6A4A2A, 0xC8A060], sack: 0x9A8460, cloth: [0xD8D0C0, 0x5A2A6A, 0x2A2A2A] },
mat: { wall: "plaster", trim: "stone", roof: "thatch" }, roof: ["gable", "hip"], pitch: 0.62, win: "casement", shutters: 0.3, balcony: 0, boxes: 0, litShare: 0.6,
lamp: "lantern", lampCol: 0xFFA850, chimney: 0.7,
ground: [["leaf", 1.4], ["puddle", 0.6], ["pebble", 0.4], ["moss", 0.25], ["tuft", 0.25]],
edge: [["weed", 0.7], ["moss", 0.5], ["stones", 0.2]],
props: [["pumpkins", 3], ["stook", 2], ["hay", 1.2], ["turnips", 1.5], ["bench", 1], ["barrel", 1], ["woodpile", 1], ["fence", 0.6], ["lanternstring", 0.6]],
mid: "pumpkins", mid2: "stook", cartLoad: "sacks", stall: "harvest", cart: "haywain",
folk: { titles: ["guiser", "villager", "farmer", "storyteller", "child out guising"], n: 6, walk: 0.5 },
light: { fill: 0x8A94D0, floor: 1.8, fogL: 0.22, day: 0.5, moon: 0xB8C0F0, ground: 0x3A3448 },
zones: {
hollow: { mid: "lanternstring", mid2: "pumpkins", lamp: "orb", lampCol: 0xFFC060, props: [["pumpkins", 3], ["bench", 1.5], ["stall", 1], ["lanternstring", 1], ["hay", 1]],
pal: { canvas: [[0x8A3AC8, 0xF0A030], [0x3AA858, 0xF0E040], [0xE8603A, 0x2A2A2A]], goods: [0xF09030, 0xE84A8A, 0x8A4AE8, 0x4AD0E8] },
ground: [["leaf", 0.9], ["petal", 0.4], ["tuft", 0.3], ["pebble", 0.3]], folk: { titles: ["child out guising", "parent", "sweet seller", "storyteller"], n: 6, walk: 0.6 } },
church: { tree: "conifer", fill: { trees: 8, hedges: 3, seats: 1, houses: 0 }, mid: "bench", lamp: "stone", lampCol: 0xFFB060, bench: "stone", props: [["bench", 1], ["pumpkins", 1], ["planter", 0.6]],
ground: [["leaf", 1.2], ["moss", 0.8], ["puddle", 0.4]], folk: { titles: ["sexton", "villager", "guiser"], n: 3, walk: 0.4 } }
},
avoid: function () { return typeof SHN !== "undefined" ? kitSpotsOf(SHN, 4) : []; },
clear: function (x, z, r) { return __ZC(519, 123, this, arguments, new.target); },
floorLift: { mul: 2.5, vary: [0xA8B888, 0xB0A080, 0x90B080, 0xC0B898], mix: 0.45 },
tree: "bare", fill: { houses: 3, hedges: 10, trees: 18, seats: 2, clusters: 2, green: [["bench", 1], ["pumpkins", 1.5], ["stook", 1]] },
areas: [[-33, 33, 60], [30, -536, 55], [208, -268, 55, "church"], [364, 104, 55, "hollow"], [-327, -247, 55], [359, -279, 50], [537, 197, 55, "hollow"], [522, -433, 55]] });
var KIT_GR_FORM = {
block: { roof: ["hip", "gable", "mansard"], win: "sash", lamp: "gas" },
pod: { roof: ["dome"], win: "round", lamp: "orb", sci: 1 },
round: { roof: ["dome", "cone"], win: "arch", lamp: "lantern" },
stepped: { roof: ["flat"], win: "arch", lamp: "brazier", sci: 1 },
tower: { roof: ["flat"], win: "strip", lamp: "glowpost", sci: 1 },
carved: { roof: ["flat"], win: "arch", lamp: "brazier" },
tree: { roof: ["cone"], win: "round", lamp: "orb", green: 1 },
shell: { roof: ["dome"], win: "round", lamp: "orb" },
timber: { roof: ["gable"], win: "casement", lamp: "lantern" },
float: { roof: ["dome", "flat"], win: "round", lamp: "lantern" },
pagoda: { roof: ["hip"], win: "lattice", lamp: "stone" },
crypt: { roof: ["gable"], win: "arch", lamp: "lantern" },
fortress: { roof: ["flat"], win: "slit", lamp: "torch" },
salvage: { roof: ["flat"], win: "strip", lamp: "brazier", sci: 1 },
twin: { roof: ["flat"], win: "strip", lamp: "glowpost", sci: 1 }
};
var KIT_GR_AREAS = [[0, 110, 50], [0, -104, 45], [0, 268, 45], [-176, 85, 40], [430, 110, 55], [120, 70, 40], [-110, 150, 40], [100, -40, 35]];
var KIT_GR_OWN = {
mars: { stall: "pod", cart: "trailer", kiosk: "terminal", name: "New Jezero", era: "settlement century", culture: "Martian settlers", win: "arch",
pal: { lit: 0xFFC890, glass: 0x2A3A44, canvas: [[0x2A5A6A, 0xE8D8C0], [0xC86A3A, 0xF0E0C8]], tank: [0xD8D4CC, 0x2A5A6A, 0xC8A040], goods: [0x6AAA4A, 0xC8603A, 0xE8D070, 0x4A8ABA], metal: 0x3A3A40, wood: 0x8A6A4A, screen: 0x6AD0E0 },
rooftop: ["solar", "dish", "vent", "tank"], props: [["canister", 2], ["crate-metal", 2], ["solar", 1.5], ["antenna", 0.8], ["kiosk", 1], ["bench", 1.2], ["planter", 0.8]],
mid: "stall", mid2: "kiosk",
ground: [["rock", 0.5], ["pebble", 0.9], ["dust", 0.7], ["scrap", 0.15], ["cable", 0.12]], edge: [["dust", 0.8], ["pipe", 0.5], ["stones", 0.3]],
scc: { pebble: [0x8A4A30, 0x9A5A3A, 0x6A3A28], rock: [0x8A4A32, 0x7A3E2A, 0x9A5A40], dust: [0xB86A44, 0x8A4A30], stones: [0x7A3E2A] },
folk: { titles: ["settler", "engineer", "hydroponics farmer", "rover driver", "technician", "geologist"], n: 7, walk: 0.5 },
light: { fill: 0xC8907A, floor: 0.62, fogL: 0.16, day: 0.5, moon: 0xE8B8A0, ground: 0x3A2420 },
areas: [[-24, 61, 45], [-85, 180, 45], [11, 275, 45], [-13, -104, 45], [121, 72, 40], [-176, 85, 40], [373, 120, 55], [448, 37, 45]] }
};
KIT_GR_OWN.desert = { stall: "souk", cart: "handcart", name: "Sahmira", era: "caravan age", culture: "desert oasis city", win: "arch", roof: ["dome", "flat", "flat"], lamp: "lantern", lampCol: 0xFFC070,
pal: { wall: [0xD8B47A, 0xE0C48E, 0xC89E68], trim: 0xB89058, roof: [0x3A8AB0, 0x4A9AC0, 0xC8A060], door: [0x2A5A7A, 0x6A3A22], shutter: [0x2A6A8A, 0x8A4A2A],
wood: 0x7A5232, metal: 0x5A4A30, canvas: [[0xC8402A, 0xF0D8A0], [0x2A6A9A, 0xF0E0C0], [0xE0A020, 0x7A2A4A]], lit: 0xFFB868,
goods: [0xD86A2A, 0xE8B030, 0x8A3A2A, 0x4A8A3A, 0xC8C0A0], sack: 0xC8A878, rugs: [0x8A2A2A, 0x2A3A6A, 0xA8642A, 0x5A2A4A, 0x2A5A4A], leaf: [0x4A7A2E, 0x5A8A34, 0x3E6A28], bark: 0x7A6248 },
mat: { wall: "plaster", trim: "stone", roof: "tile" }, shutters: 0.35, balcony: 0.2, boxes: 0, shops: 0.3,
props: [["sacks", 2.5], ["pots", 2], ["crates", 1.2], ["cart", 1], ["barrel", 0.6], ["bench", 1], ["trough", 0.8], ["well", 0.5], ["planter", 1]],
mid: "stall", mid2: "cart", cartLoad: "sacks",
ground: [["dust", 0.9], ["pebble", 0.6], ["petal", 0.15], ["straw", 0.3], ["rock", 0.15]], edge: [["dust", 0.8], ["weed", 0.3], ["stones", 0.2]],
scc: { dust: [0xD8B47A, 0xC8A068], pebble: [0xC8A878, 0xB89868] },
tree: "palm", fill: { trees: 12, seats: 2, fronts: 8, hedges: 0, clusters: 4, green: [["bench", 1], ["planter", 1.5], ["pots", 1]] },
folk: { titles: ["water seller", "spice merchant", "caravaneer", "potter", "weaver", "camel driver", "date grower"], n: 7, walk: 0.5 },
light: { fill: 0xA8A8D0, floor: 0.62, fogL: 0.16, day: 0.5, moon: 0xC8C8F0 },
areas: [[18, 195, 45], [-86, 131, 40], [22, 45, 45], [-15, -103, 45], [-176, 65, 40], [440, 120, 50], [456, -113, 45], [-123, -35, 40]] };
KIT_GR_OWN.future = { stall: "pavilion", cart: "ebike", kiosk: "totem", name: "Brightwater", era: "near future", culture: "garden city",
pal: { lit: 0xFFE0B0, canvas: [[0x2A8A8A, 0xF0F0E8], [0xE87A3A, 0xF0F0E8]], goods: [0x6AC04A, 0xE8D050, 0x4A9AE0, 0xE85A6A], metal: 0x5A6068, wood: 0xA8845A,
leaf: [0x4A8A3A, 0x5A9A44, 0x6AAA4A, 0x3E7A34], bark: 0x6A5A4A },
props: [["bench", 2], ["planter", 2.5], ["kiosk", 1], ["solar", 0.6], ["crate-metal", 0.6], ["table", 1.2], ["pots", 0.8]],
mid: "kiosk", mid2: "table",
ground: [["leaf", 0.7], ["pebble", 0.4], ["dust", 0.2]], edge: [["weed", 0.4], ["moss", 0.3]],
tree: "broad", fill: { trees: 12, seats: 4, hedges: 3, fronts: 6, clusters: 3, cluster: [["stall", 2], ["table", 1.5], ["cart", 1]], green: [["bench", 2], ["planter", 1.5], ["table", 0.8]] },
folk: { titles: ["engineer", "gardener", "commuter", "teacher", "courier", "architect", "student"], n: 7, walk: 0.6 },
light: { fill: 0x9AA8D0, floor: 0.62, fogL: 0.16, day: 0.55 },
areas: [[-19, 194, 45], [-14, 25, 45], [12, -104, 45], [231, 103, 45], [-105, 110, 40], [402, 219, 45], [488, -246, 45], [327, -86, 45]] };
KIT_GR_OWN.pluto = { stall: "ice", cart: "sledge", kiosk: "pillar", name: "Tombaugh Halls", era: "far future", culture: "ice-carved settlement", win: "arch", lamp: "orb", lampCol: 0xFFD8A0,
pal: { lit: 0xFFD0A0, canvas: [[0x2A4A6A, 0xE8F0F8], [0xC86A3A, 0xF0E8E0]], goods: [0x6AAAD8, 0xE8C060, 0xD86A4A, 0x9AD0E8], metal: 0x3A4048, wood: 0x8A7A6A,
leaf: [0xA8D0F0, 0xC8E0FF, 0x8AB8E0], sack: 0x9AA0A8 },
props: [["crate-metal", 2.5], ["canister", 2], ["sacks", 1], ["bench", 1.2], ["kiosk", 0.8], ["antenna", 0.5], ["cart", 0.8], ["planter", 0.6]],
mid: "stall", mid2: "cart", cartLoad: "goods",
ground: [["drift", 0.5], ["pebble", 0.6], ["rock", 0.3], ["dust", 0.3]], edge: [["drift", 0.9], ["stones", 0.3]],
scc: { pebble: [0xC8D8E8, 0xA8B8C8], rock: [0xA8B8C8, 0x8A9AAA], dust: [0xD8E4EE, 0xB8C8D8] },
tree: "ice", fill: { trees: 4, seats: 3, fronts: 10, clusters: 5, green: [["bench", 1], ["crate-metal", 1]] },
folk: { titles: ["ice quarrier", "outfitter", "warden", "surveyor", "hydroponics keeper", "pilot", "tholin chemist", "ice-cutter"], n: 9, walk: 0.5 },
light: { fill: 0x9AB0E0, floor: 0.62, fogL: 0.16, day: 0.5, moon: 0xC8D8FF },
areas: [[-20, 261, 45], [-48, 140, 40], [84, 132, 40], [-132, 252, 40], [8, 16, 45], [-15, -103, 45], [434, 112, 50], [-179, 90, 40]] };
KIT_GR_OWN.northpole = { stall: "chalet", cart: "sleigh", name: "North Pole city", era: "timeless winter", culture: "toymakers' town", win: "casement", roof: ["gable"], lamp: "lantern", lampCol: 0xFFC878,
pal: { lit: 0xFFC878, wood: 0x6A4A2E, canvas: [[0xA82A2A, 0xF0E8D8], [0x2E5A34, 0xF0E8D8]], goods: [0xC83A2A, 0x2E6A3A, 0xE8C050, 0xF0F0F0, 0x8A5A2A], sack: 0xA89070, leaf: [0x2E5A34, 0x3A6A3E, 0x264A2C], bark: 0x5A4430 },
mat: { wall: "wood", trim: "wood", roof: "shingle" }, shutters: 0.5, boxes: 0.1, shops: 0.25, chimney: 0.9,
props: [["woodpile", 2], ["sacks", 1.5], ["barrel", 1.2], ["crates", 1.2], ["bench", 1], ["cart", 0.8], ["lanternstring", 1]],
mid: "stall", mid2: "cart", ground: [["pebble", 0.4], ["straw", 0.25], ["stones", 0.2]], edge: [["drift", 0.6], ["stones", 0.2]],
scc: { pebble: [0xD8DEE4, 0xC0C8D0] },
tree: "conifer", fill: { trees: 14, seats: 3, fronts: 6, hedges: 0, clusters: 7, cluster: [["stall", 2.5], ["cart", 1]], green: [["bench", 1], ["woodpile", 1]] },
folk: { titles: ["toymaker", "bellfounder", "candlemaker", "reindeer herder", "skater", "baker", "sleigh driver"], n: 7, walk: 0.5 },
light: { fill: 0xA8B8E0, floor: 0.64, fogL: 0.16, day: 0.55, moon: 0xC8D8FF },
areas: [[-28, 264, 45], [99, 265, 45], [9, 145, 45], [-16, -102, 45], [-9, 21, 45], [119, -41, 40], [-175, 62, 40], [437, 116, 50]] };
KIT_GR_OWN.neverland = { stall: "hut", cart: "dugout", name: "Neverland city", era: "never quite grown up", culture: "island town", win: "round", lamp: "torch", lampCol: 0xFFA048,
pal: { lit: 0xFFB060, wood: 0x8A6A40, canvas: [[0x2A8A8A, 0xF0E0B8], [0xD86A2A, 0xF0E0B8]], goods: [0xE8C040, 0xD8602A, 0x6AAA3A, 0xF0E8D0, 0x3AA8B8], sack: 0xC8B07A, leaf: [0x3E7A3A, 0x4A8A44, 0x2E6A30], bark: 0x7A6048 },
props: [["barrel", 1.5], ["crates", 1.5], ["sacks", 1], ["bench", 1], ["firepit", 0.8], ["log", 1.2], ["pots", 1], ["washing", 0.6]],
mid: "stall", mid2: "cart", ground: [["shell", 0.8], ["pebble", 0.5], ["rock", 0.2], ["leaf", 0.3], ["tuft", 0.4]], edge: [["weed", 0.5], ["stones", 0.3]],
tree: "palm", fill: { trees: 12, seats: 2, fronts: 4, hedges: 0, clusters: 4, cluster: [["stall", 2], ["cart", 1], ["firepit", 0.6]], green: [["bench", 1], ["log", 1], ["firepit", 0.5]] },
folk: { titles: ["lagoon fisher", "sailmaker", "lost boy", "pirate ashore", "fruit seller", "flying teacher"], n: 7, walk: 0.6 },
light: { fill: 0x9AB0D8, floor: 0.62, fogL: 0.16, day: 0.55 },
areas: [[-28, 261, 45], [15, 124, 45], [12, -104, 45], [431, 103, 50], [-174, 93, 40], [112, 43, 40]] };
KIT_GR_OWN.frozen = { stall: "lodge", cart: "iceboat", name: "the Frozen city", era: "the Long Winter", culture: "herders' ice city", lamp: "lantern", lampCol: 0xFFB868,
pal: { lit: 0xFFC080, wood: 0x6A5A48, canvas: [[0x3A5A7A, 0xE8E4D8], [0x8A3A2A, 0xE8E0D0]], goods: [0xD8D0C0, 0x8A6A4A, 0xC8A060, 0x6A8AA8], sack: 0x9A8A72, leaf: [0x2E4A3A, 0x3A5A44], bark: 0x4A3E34 },
props: [["woodpile", 1.5], ["sacks", 1.2], ["firepit", 1], ["crates", 1], ["bench", 1], ["log", 1]],
mid: "stall", mid2: "cart", ground: [["rock", 0.35], ["pebble", 0.45], ["stones", 0.2]], edge: [["drift", 0.6], ["stones", 0.3]],
scc: { pebble: [0xC8D8E8, 0xA8B8C8], rock: [0x8A9AAA, 0x6A7A8A] },
tree: "conifer", fill: { trees: 8, seats: 2, fronts: 6, clusters: 4, cluster: [["stall", 2], ["cart", 1], ["firepit", 1]], green: [["bench", 1], ["firepit", 1], ["woodpile", 1]] },
folk: { titles: ["herder", "ice cutter", "ice fisher", "story-keeper", "felt maker", "hunter"], n: 6, walk: 0.5 },
light: { fill: 0x9AB0E0, floor: 0.62, fogL: 0.16, day: 0.5, moon: 0xC8D8FF },
areas: [[24, 200, 45], [-13, 45, 45], [-15, -102, 45], [-176, 66, 40], [435, 113, 50], [197, 100, 40], [-117, 207, 40], [-124, -34, 40]] };
KIT_GR_OWN.faerie = { stall: "toadstool", cart: "nutshell", name: "the Faerie city", era: "always twilight", culture: "fae court", win: "round", lamp: "orb", lampCol: 0xB8F0D8,
pal: { lit: 0xC8F0D0, wood: 0x5A4430, canvas: [[0x6A3A8A, 0xE8E0F0], [0x2E6A5A, 0xE8F0E0]], goods: [0x9AE8C8, 0xE8D07A, 0xC8A0F0, 0xF0A0C0, 0x8AD06A], sack: 0x8A7A5A, leaf: [0x3E6A3A, 0x4A7A44, 0x5A8A4A], bark: 0x4A3A2A },
props: [["mushroom", 2.5], ["log", 1.5], ["lanternstring", 1.5], ["bench", 0.8], ["planter", 0.8], ["pots", 0.6]],
mid: "stall", mid2: "cart", ground: [["moss", 0.9], ["petal", 0.5], ["flower", 0.25], ["leaf", 0.5], ["tuft", 0.4]], edge: [["moss", 0.9], ["weed", 0.5]],
tree: "broad", fill: { trees: 10, seats: 2, fronts: 4, hedges: 2, clusters: 4, cluster: [["stall", 2], ["cart", 1], ["mushroom", 1]], green: [["mushroom", 1.5], ["log", 1], ["bench", 0.5]] },
folk: { titles: ["fae courtier", "bargainer", "glow-moth keeper", "bramble warden", "dew gatherer", "piper"], n: 7, walk: 0.5 },
light: { fill: 0x9AA8D8, floor: 0.62, fogL: 0.16, day: 0.5, moon: 0xC8D0FF },
areas: [[17, 99, 45], [26, 275, 45], [-132, 252, 40], [-15, -103, 45], [437, 112, 50], [-178, 62, 40], [185, -183, 40], [117, -47, 40]] };
KIT_GR_OWN.moon = { stall: "hab", cart: "moonrover", kiosk: "terminal", name: "Moon city", era: "settlement century", culture: "lunar domes",
pal: { lit: 0xFFE0B0, metal: 0x4A4A50, canvas: [[0x2A5A8A, 0xE8E8E0], [0xC86A2A, 0xE8E8E0]], goods: [0xD8D4CC, 0x6A9AC8, 0xC8A040, 0x6AAA4A], screen: 0x8AD8F0, leaf: [0x5A9A4A, 0x4A8A3A] },
props: [["canister", 2.5], ["crate-metal", 2], ["solar", 1.2], ["antenna", 0.8], ["bench", 1], ["planter", 0.8]], mid: "stall", mid2: "cart",
ground: [["rock", 0.6], ["pebble", 0.9], ["dust", 0.6]], edge: [["dust", 0.8], ["pipe", 0.5], ["stones", 0.3]],
scc: { pebble: [0x8A8680, 0x6E6A64], rock: [0x7A7670, 0x5E5A56], dust: [0x9A968E, 0x7E7A74] },
fill: { trees: 0, seats: 2, fronts: 6, clusters: 5, cluster: [["stall", 2], ["cart", 1.5]], green: [["bench", 1], ["canister", 1]] },
folk: { titles: ["helium miner", "air-keeper", "hydroponic grower", "Compact clerk", "rover driver", "dome engineer"], n: 6, walk: 0.5 },
light: { fill: 0xA0A8C0, floor: 0.6, fogL: 0.15, day: 0.5, moon: 0xC8D0E8 },
areas: [[-37, 134, 45], [10, 271, 45], [84, 132, 40], [-13, -104, 45], [-176, 85, 40], [441, 126, 50]] };
KIT_GR_OWN.venus = { stall: "gondola", cart: "samplerig", name: "Venus city", era: "cloud age", culture: "airship city",
pal: { lit: 0xFFD898, metal: 0x6A5A48, canvas: [[0xC8A868, 0xF0E8D8], [0xB8703A, 0xF0E4D0], [0x8A6A9A, 0xF0E8E0]], goods: [0xE8C060, 0xD8803A, 0x9AC86A, 0xE8E0C8], sack: 0xC8B07A, leaf: [0x6AAA4A, 0x5A9A3A] },
props: [["crates", 1.5], ["sacks", 1.2], ["planter", 1.5], ["bench", 1], ["canister", 1], ["table", 1]], mid: "stall", mid2: "cart",
ground: [["pebble", 0.4], ["leaf", 0.3], ["flower", 0.2]], edge: [["weed", 0.3], ["grime", 0.3]],
fill: { trees: 4, seats: 3, fronts: 6, clusters: 5, cluster: [["stall", 2], ["cart", 1], ["table", 1]], green: [["bench", 1], ["planter", 1.5]] },
folk: { titles: ["rig hand", "cloud farmer", "envoy", "keel-wright", "sample reader", "balloon pilot"], n: 6, walk: 0.5 },
light: { fill: 0xC8B090, floor: 0.62, fogL: 0.16, day: 0.55 },
areas: [[16, 119, 45], [-6, 269, 45], [-13, -104, 45], [121, 74, 40], [-110, 93, 40], [441, 125, 50]] };
KIT_GR_OWN.mercury = { stall: "cellstall", cart: "orecart", name: "Mercury city", era: "sun-harvest age", culture: "rock-cut city",
pal: { lit: 0xF0C060, metal: 0x5A4A3A, canvas: [[0xB8743A, 0xE8D8B8], [0x8A3A2A, 0xE8D8B8]], goods: [0xF0C860, 0xE8E0A0, 0xC8603A, 0x8A7A6A], sack: 0x9A8468 },
props: [["crate-metal", 1.5], ["canister", 1.5], ["sacks", 1], ["bench", 1], ["firepit", 0.6], ["crates", 1]], mid: "stall", mid2: "cart",
ground: [["rock", 0.6], ["pebble", 0.8], ["dust", 0.6], ["scrap", 0.1]], edge: [["dust", 0.8], ["stones", 0.4], ["pipe", 0.3]],
scc: { pebble: [0x6A645C, 0x5A544C], rock: [0x5E5850, 0x4E4840], dust: [0x7A7268, 0x6A6258] },
fill: { trees: 0, seats: 2, fronts: 8, clusters: 5, cluster: [["stall", 2], ["cart", 1.5]], green: [["bench", 1], ["crate-metal", 1]] },
folk: { titles: ["sun farmer", "cell-keeper", "rock-cutter", "porter", "assayer", "shade-warden"], n: 6, walk: 0.5 },
light: { fill: 0xB0A090, floor: 0.6, fogL: 0.15, day: 0.5 },
areas: [[-44, 195, 45], [17, 26, 45], [19, -110, 45], [-171, 110, 40], [453, 115, 50], [345, -55, 40], [362, -217, 40]] };
KIT_GR_OWN.wasteland = { stall: "salvage", cart: "drumcart", name: "Wasteland city", era: "after the fall", culture: "salvage town",
pal: { lit: 0xFFB868, canvas: [[0xC8402A, 0xE8DCC0], [0x3A6A8A, 0xE8DCC0], [0xD8A030, 0x3A3A3A]], goods: [0x6AAA4A, 0xC8A040, 0x3A6AA8, 0x9A8A7A], sack: 0x9A8A68, leaf: [0x5A8A3A, 0x4A7A32], bark: 0x5A4A3A },
props: [["barrel", 2], ["crates", 1.5], ["planter", 1.5], ["firepit", 1], ["bench", 0.8], ["fence", 0.8], ["solar", 0.5]], mid: "stall", mid2: "cart", cartLoad: "barrels",
ground: [["scrap", 0.4], ["pebble", 0.6], ["dust", 0.6], ["tuft", 0.5], ["puddle", 0.2]], edge: [["weed", 0.8], ["grime", 0.6], ["stones", 0.3]],
tree: "broad", fill: { trees: 6, seats: 2, fronts: 6, hedges: 0, clusters: 5, cluster: [["stall", 2], ["cart", 1], ["firepit", 0.8]], green: [["planter", 2], ["bench", 1], ["firepit", 0.6]] },
folk: { titles: ["salvager", "gardener", "water-sharer", "mechanic", "scavenger child", "dam keeper"], n: 7, walk: 0.5 },
light: { fill: 0xA8A0A0, floor: 0.62, fogL: 0.16, day: 0.55 },
areas: [[12, 275, 45], [-23, 54, 45], [-13, -104, 45], [-176, 85, 40], [435, 118, 50], [123, 73, 40]] };
KIT_GR_OWN.underworld = { stall: "lampniche", cart: "minetub", name: "Underworld city", era: "deep time", culture: "miners' city under the earth",
pal: { lit: 0xF0A050, metal: 0x6A5030, canvas: [[0x6A1E2A, 0xD8C8A8], [0x3A2E4A, 0xD8C8A8]], goods: [0xC84A5A, 0xD8D8E0, 0x9A2A3A, 0xB8BCC8, 0xC8A050], sack: 0x6A5A48, leaf: [0x3A4A2E, 0x2E3E28], bark: 0x3A2E26 },
props: [["crates", 1.5], ["sacks", 1.5], ["barrel", 1.2], ["bench", 1], ["firepit", 0.8], ["log", 0.6]], mid: "stall", mid2: "cart", cartLoad: "ore",
ground: [["pebble", 0.8], ["rock", 0.5], ["stones", 0.4], ["dust", 0.4]], edge: [["stones", 0.6], ["grime", 0.6], ["moss", 0.3]],
scc: { pebble: [0x5A524C, 0x4A4440], rock: [0x4A4440, 0x3A3430], dust: [0x6A5E54, 0x5A4E46] },
tree: null, fill: { trees: 0, seats: 2, fronts: 6, hedges: 0, clusters: 6, cluster: [["stall", 2.5], ["cart", 1.2], ["firepit", 0.6]], green: [["bench", 1], ["firepit", 0.8]] },
folk: { titles: ["silver miner", "garnet cutter", "lamp keeper", "river boatman", "assayer", "miner's child"], n: 7, walk: 0.5 },
light: { fill: 0xA08870, floor: 0.58, fogL: 0.14, day: 0.45 },
areas: [[-115, 103, 45], [24, 96, 45], [11, 274, 45], [12, -104, 45], [432, 102, 50], [191, 92, 40]] };
KIT_GR_OWN.fire = { stall: "forge", cart: "crucible", name: "Burning Lands city", era: "age of the forge", culture: "volcano smiths",
pal: { lit: 0xFF8A40, metal: 0x3A3432, canvas: [[0x6A2A1A, 0xC8B090], [0x2A2A2E, 0xC89A50]], goods: [0x1E1E22, 0xC8C8CC, 0xFF8A30, 0x8A3A2A], sack: 0x5A4A3E, leaf: [0x3A3A2E], bark: 0x2E2622 },
props: [["woodpile", 1.2], ["crates", 1.2], ["barrel", 1], ["canister", 0.6], ["bench", 0.8], ["firepit", 1]], mid: "stall", mid2: "cart",
ground: [["pebble", 0.7], ["rock", 0.6], ["dust", 0.6], ["scrap", 0.2]], edge: [["stones", 0.6], ["grime", 0.7]],
scc: { pebble: [0x3A302C, 0x4A3E38], rock: [0x2E2624, 0x3E3430], dust: [0x5A4A42, 0x4A3C36] },
tree: null, fill: { trees: 0, seats: 2, fronts: 6, hedges: 0, clusters: 6, cluster: [["stall", 2.5], ["cart", 1], ["firepit", 0.8]], green: [["bench", 1], ["firepit", 1]] },
folk: { titles: ["bladesmith", "glassblower", "bellows boy", "obsidian knapper", "ore carter", "forge master"], n: 7, walk: 0.5 },
light: { fill: 0xB09080, floor: 0.6, fogL: 0.15, day: 0.5 },
areas: [[-23, 56, 45], [-122, 180, 45], [10, 205, 45], [-13, -104, 45], [121, 72, 40], [-177, 74, 40], [440, 122, 50]] };
KIT_GR_OWN.heavens = { stall: "teahouse", cart: "palanquin", name: "Heavens city", era: "the morning court", culture: "cloud court",
pal: { lit: 0xFFD8A0, wood: 0x3A2418, canvas: [[0xA82A22, 0xF0E8D8], [0x2E4A3E, 0xF0E8D8], [0xC8A040, 0xF0E8D8]], goods: [0xE8E4D8, 0x5A8A7A, 0xC8A040, 0xA82A22], sack: 0xC8B898, leaf: [0x5A9A5A, 0x6AAA62], bark: 0x5A4430, pot: 0x5A8A7A },
props: [["planter", 2], ["pots", 1.5], ["bench", 1.2], ["table", 1], ["lanternstring", 1], ["sacks", 0.5]], mid: "stall", mid2: "cart",
ground: [["petal", 0.5], ["flower", 0.3], ["pebble", 0.4], ["setts", 0.3]], edge: [["moss", 0.4], ["flower", 0.4]],
tree: "broad", fill: { trees: 6, seats: 3, fronts: 6, hedges: 0, clusters: 6, cluster: [["stall", 2.5], ["cart", 1]], green: [["planter", 2], ["bench", 1.2], ["table", 0.8]] },
folk: { titles: ["tea master", "court musician", "calendar scribe", "dawn-bell ringer", "sky-bee keeper", "letter teacher"], n: 7, walk: 0.5 },
areas: [[-19, 110, 45], [93, 84, 40], [5, 260, 45], [-13, -104, 45], [-176, 85, 40], [442, 125, 50]] };
KIT_GR_OWN.stars = { stall: "scopestall", cart: "lensdolly", kiosk: "terminal", name: "Among the Stars city", era: "the age of charts", culture: "observatory city",
pal: { lit: 0xD8E4FF, metal: 0x5A5E66, canvas: [[0x2A3A6A, 0xE0E4EC], [0x8A6A3E, 0xE0E4EC]], goods: [0xC8A050, 0xB8C8E8, 0xE8DCC0, 0x6A7A9A], screen: 0x9AB8F0, leaf: [0x5A8A4A] },
props: [["crate-metal", 2], ["canister", 1.5], ["antenna", 1], ["bench", 1.2], ["solar", 0.8], ["planter", 0.5]], mid: "stall", mid2: "cart",
ground: [["rock", 0.6], ["pebble", 0.9], ["dust", 0.7]], edge: [["dust", 0.8], ["pipe", 0.4], ["stones", 0.3]],
scc: { pebble: [0x5E6068, 0x4E5056], rock: [0x4A4B52, 0x3E3F44], dust: [0x6E7078, 0x5A5C62] },
fill: { trees: 0, seats: 2, fronts: 6, clusters: 5, cluster: [["stall", 2.5], ["cart", 1.2]], green: [["bench", 1], ["antenna", 0.8]] },
folk: { titles: ["navigator", "lens grinder", "star-chart clerk", "telescope keeper", "apprentice astronomer", "dish engineer"], n: 6, walk: 0.5 },
light: { fill: 0xA0A8C8, floor: 0.6, fogL: 0.15, day: 0.5, moon: 0xC8D4F0 },
areas: [[-23, 52, 45], [-127, 206, 45], [15, 207, 45], [12, -104, 45], [-176, 85, 40], [442, 125, 50]] };
KIT_GR_OWN.sea = { stall: "boatstall", cart: "netcart", name: "Sea city", era: "age of sail", culture: "harbour isles",
pal: { lit: 0xFFD49A, wood: 0x6A5038, canvas: [[0x2A5A8A, 0xF0ECE0], [0xC8A040, 0xF0ECE0]], goods: [0x8A9AA8, 0xC87A5A, 0xE8E0D0, 0x2A5A8A], sack: 0xC8B898, leaf: [0x4A7A3A, 0x5A8A44], bark: 0x6A5A44, pot: 0x2A5A8A },
props: [["barrel", 2], ["crates", 1.5], ["sacks", 1], ["bench", 1.2], ["planter", 1], ["pots", 1]], mid: "stall", mid2: "cart",
ground: [["shell", 0.5], ["pebble", 0.5], ["puddle", 0.3], ["setts", 0.3]], edge: [["weed", 0.4], ["shell", 0.4], ["moss", 0.3]],
tree: "palm", fill: { trees: 4, seats: 3, fronts: 6, hedges: 0, clusters: 6, cluster: [["stall", 2.5], ["cart", 1.2]], green: [["bench", 1.2], ["planter", 1], ["pots", 0.8]] },
folk: { titles: ["shipwright", "fish salter", "net mender", "harbour pilot", "sailor", "rope maker"], n: 7, walk: 0.5 },
areas: [[-43, 109, 45], [98, 136, 40], [50, -27, 40], [361, 141, 45], [496, 92, 45], [18, -198, 45], [424, -9, 40], [4, 261, 45]] };
KIT_GR_OWN.mirror = { stall: "glazier", cart: "panecart", name: "Mirror city", era: "the twin age", culture: "glassmakers' isles",
pal: { lit: 0xE8ECF8, canvas: [[0x6A7088, 0xF0F0F4], [0x3A3E4A, 0xD8DCE4]], goods: [0xC0C4CC, 0xD8E0E8, 0x8A90A0, 0xB8A0C8], sack: 0xC8C8CC, leaf: [0x6A8A7A, 0x5A7A6A], bark: 0x5A5A60, pot: 0x8A90A0 },
props: [["crates", 1.5], ["bench", 1.5], ["planter", 1.2], ["sacks", 0.6], ["table", 0.8], ["pots", 0.6]], mid: "stall", mid2: "cart",
ground: [["pebble", 0.6], ["setts", 0.4], ["puddle", 0.2]], edge: [["stones", 0.4], ["moss", 0.3]],
scc: { pebble: [0xC8CCD4, 0xA8ACB4] },
tree: "cypress", fill: { trees: 4, seats: 3, fronts: 6, hedges: 0, clusters: 6, cluster: [["stall", 2.5], ["cart", 1.2]], green: [["bench", 1.2], ["planter", 1]] },
folk: { titles: ["glazier", "mirror silverer", "lens cutter", "scholar of choices", "glassblower", "sand gatherer"], n: 7, walk: 0.5 },
areas: [[-28, 111, 45], [101, 83, 40], [-7, 269, 45], [-13, -104, 45], [-176, 85, 40], [443, 120, 50]] };
KIT_GR_OWN.elsewhere = { stall: "shellkiosk", cart: "reedsled", name: "Another World city", era: "another time", culture: "coral-glass city",
pal: { lit: 0xB8F0E8, canvas: [[0x2A6A6A, 0xE8E0D0], [0x6A3A6A, 0xE8E0D0]], goods: [0x6AD8C8, 0xC8A0F0, 0xC87A3A, 0x8AAA4A], sack: 0xA89A78, leaf: [0x4A8A7A, 0x6A9A5A, 0x8A6A9A], bark: 0x5A4A5A, pot: 0x6AD8C8 },
props: [["planter", 1.5], ["mushroom", 1.5], ["bench", 1], ["sacks", 0.8], ["pots", 1]], mid: "stall", mid2: "cart",
ground: [["moss", 0.7], ["pebble", 0.4], ["tuft", 0.4], ["petal", 0.2]], edge: [["moss", 0.6], ["weed", 0.4]],
tree: null, fill: { trees: 0, seats: 2, fronts: 6, hedges: 0, clusters: 6, cluster: [["stall", 2.5], ["cart", 1.2], ["mushroom", 0.8]], green: [["planter", 1.2], ["mushroom", 1.2], ["bench", 0.8]] },
folk: { titles: ["seed trader", "crystal grower", "greeter of strangers", "moss gatherer", "spiral builder"], n: 6, walk: 0.5 },
areas: [[-19, 114, 45], [-108, 204, 45], [-129, 84, 40], [12, 274, 45], [-13, -104, 45], [114, 191, 40], [434, 110, 50]] };
KIT_GR_OWN.void = { stall: "lectern", cart: "driftslab", name: "Void city", era: "no time at all", culture: "city of stillness",
pal: { lit: 0xC8E0FF, canvas: [[0x2A2A4A, 0xD8D8E8], [0x4A3A6A, 0xD8D8E8]], goods: [0x9AB8E8, 0xC8D8F8, 0xA898D8, 0xE8E8F0], sack: 0x8A88A0, leaf: [0x5A6A8A, 0x6A7A9A], bark: 0x3A3A48, pot: 0x6A6878 },
props: [["bench", 1.5], ["planter", 1], ["crates", 0.8], ["pots", 0.8], ["table", 0.6]], mid: "stall", mid2: "cart",
ground: [["pebble", 0.5], ["stones", 0.3], ["dust", 0.3]], edge: [["stones", 0.4], ["moss", 0.2]],
scc: { pebble: [0x8A88A0, 0x6A6878] },
tree: null, fill: { trees: 0, seats: 3, fronts: 6, hedges: 0, clusters: 5, cluster: [["stall", 2.5], ["cart", 1.2]], green: [["bench", 1.5], ["planter", 0.8]] },
folk: { titles: ["light-keeper", "quiet reader", "guide for the lost", "crystal tender", "sleeper"], n: 6, walk: 0.3 },
light: { fill: 0x9AA0C0, floor: 0.58, fogL: 0.14, day: 0.45, moon: 0xC8D4F0 },
areas: [[-19, 97, 45], [11, 205, 45], [12, -104, 45], [121, 73, 40], [-176, 85, 40], [435, 112, 50]] };
KIT_GR_OWN.mars.fill = { fronts: 6, seats: 2, trees: 0, clusters: 5, green: [["planter", 1], ["bench", 1]] };
Object.keys(KIT_GR_OWN).forEach(function (k) { var f = KIT_GR_OWN[k].fill; if (f && f.near == null)
f.near = 5; });
var KIT_GR_ON = { mars: 1, desert: 1, future: 1, pluto: 1, northpole: 1, neverland: 1, frozen: 1, faerie: 1, moon: 1, venus: 1, mercury: 1, wasteland: 1, underworld: 1, fire: 1, heavens: 1, stars: 1, sea: 1, mirror: 1, elsewhere: 1, void: 1 };
function kitGrandStyle(key) { return __ZC(519, 124, this, arguments, new.target); }
kitStyle("erebos", { stall: "altar", groundFeet: 400,
name: "Erebos", era: "the age of myth", culture: "Greek underworld",
pal: { wall: [0x8A8680, 0x6E6A66, 0xB8B2A8], trim: 0xC8C0B0, roof: [0x4A4644, 0x5A544E], door: [0x2A2420, 0x3A2E24], shutter: [0x2A2624],
wood: 0x4A3E34, metal: 0x7A5A30, canvas: [[0x3A2A4A, 0xC8B890], [0x4A1E1E, 0xC8A860]], glass: 0x14181C, lit: 0xFFA860,
goods: [0xC8A050, 0x8A2A2A, 0xD8D0C0, 0x4A4A6A], sack: 0x8A8070, leaf: [0x2A3A2E, 0x34402E, 0x3A4434], bark: 0x2E2824, pot: 0x8A4A2A },
mat: { wall: "stone", trim: "marble", roof: "slate" }, roof: ["flat", "hip"], win: "slit", shutters: 0, balcony: 0, boxes: 0, shops: 0, litShare: 0.35,
lamp: "brazier", lampCol: 0xFF9A48, cornice: 1,
ground: [["flower", 0.8], ["pebble", 0.6], ["rock", 0.35], ["dust", 0.4], ["tuft", 0.3]], edge: [["stones", 0.5], ["moss", 0.4], ["dust", 0.4]],
scc: { flower: [0xD8D4C8, 0xE8E4DA, 0xC8C4D0], tuft: [0x6A6E5E, 0x5A5E52], dust: [0x5A5650, 0x4A4844], pebble: [0x6A6660, 0x8A8680] },
props: [["pots", 2], ["stall", 0.8], ["bench", 1.2], ["firepit", 0.8], ["planter", 0.6], ["sacks", 0.6], ["crates", 0.5], ["signpost", 0.4]],
bench: "stone", mid: "firepit", mid2: "pots",
avoid: function () { return typeof EBS !== "undefined" ? kitSpotsOf(EBS, 4) : []; },
tree: "cypress", fill: { trees: 10, seats: 2, fronts: 6, hedges: 0, clusters: 2, cluster: [["stall", 1]], green: [["bench", 1], ["pots", 1]] },
folk: { titles: ["shade", "ferryman's helper", "judges' clerk", "priestess of Persephone", "shade of a hero", "mourner"], n: 6, walk: 0.35 },
light: { fill: 0x8A88B0, floor: 0.7, fogL: 0.14, day: 0.45, moon: 0xA8A8D0, ground: 0x2A2830 },
zones: {
fire: { tree: "dead", mid: "firepit", mid2: "firepit", lamp: "brazier", lampCol: 0xFF7A30, props: [["firepit", 1], ["pots", 0.5], ["log", 1]],
fill: { trees: 8, seats: 0, fronts: 0 }, ground: [["rock", 0.8], ["dust", 0.6], ["pebble", 0.5]], edge: [["stones", 0.6], ["dust", 0.5]],
scc: { rock: [0x3A2A26, 0x4A3028, 0x2A201C], dust: [0x5A2A1A, 0x3A2018], pebble: [0x4A3A34, 0x2A2420], stones: [0x3A2A26] },
folk: { titles: ["shade", "punished shade", "Fury's servant"], n: 2, walk: 0.2 } }
},
areas: [[-33, 2841, 55], [14, 4167, 55], [-30700, -1095, 55, "fire"], [12, 3947, 50], [0, 1, 55], [-830, -1610, 55], [-1674, -6, 55, "fire"], [-1480, 2517, 55]] });
