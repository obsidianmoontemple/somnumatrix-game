/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SWK = { mats: {}, stripes: {}, walkers: [], ticking: false, last: 0 };
function swkLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); }
function swkKeep(i) { return !swkLite() || i % 2 === 0; }
function swkR(seed) { var s = (seed * 2654435761) >>> 0 || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
function swkM(col, tex, o) { return __ZC(511, 0, this, arguments, new.target); }
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
function swkTree(G, x, z, o) { return __ZC(511, 1, this, arguments, new.target); }
function swkBench(G, x, z, ry, y) { return __ZC(511, 2, this, arguments, new.target); }
function swkLamp(G, x, z, o) { return __ZC(511, 3, this, arguments, new.target); }
function swkPlanter(G, x, z, w, d, o) { return __ZC(511, 4, this, arguments, new.target); }
function swkStripe(c1, c2) { return __ZC(511, 5, this, arguments, new.target); }
function swkStall(G, x, z, ry, o) { return __ZC(511, 6, this, arguments, new.target); }
function swkFlag(G, x, z, o) { return __ZC(511, 7, this, arguments, new.target); }
function swkBin(G, x, z, y) { var B = swkAt(G, x, y || 0, z, 0); swkCyl(B, 0.28, 0.24, 0.85, swkM(0x2A3A2E, "metal"), 0, 0.425, 0, 12); swkCyl(B, 0.3, 0.3, 0.06, swkM(0x1E2622, "metal"), 0, 0.88, 0, 12); return B; }
function swkBollard(G, x, z, y) { var B = swkAt(G, x, y || 0, z, 0); swkCyl(B, 0.11, 0.13, 0.9, swkM(0x2A2C30, "metal"), 0, 0.45, 0, 10); swkBall(B, 0.12, swkM(0x2A2C30, "metal"), 0, 0.92, 0, 1); return B; }
function swkCafe(G, x, z, o) { return __ZC(511, 8, this, arguments, new.target); }
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
function swkRugMat(col) { return __ZC(511, 9, this, arguments, new.target); }
function swkPeople(G, seed, list, ground) { return __ZC(511, 10, this, arguments, new.target); }
function swkLive(g) { var o = g; while (o) {
if (o.visible === false)
return false;
if (o.isScene)
return true;
o = o.parent;
} return false; }
function swkTick(t) { return __ZC(511, 11, this, arguments, new.target); }
