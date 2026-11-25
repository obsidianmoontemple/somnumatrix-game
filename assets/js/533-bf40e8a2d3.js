/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SEI = { done: {}, groups: [], at: 0 };
var SEI_LOOK = {
ithaca: { g: [0x7A8E4A, 0xB8A870, 0x55683A], sh: [0x5A6E3A, 0x6A7A44, 0x4A5E34], fl: [0xE8E0C8, 0xC85A8A, 0xE8C83A], dens: [22, 40, 14, 10], tr: { kind: "olive", n: 160, rows: 1 }, walls: 1 },
cyclops: { g: [0x5E7040, 0x9A8E68, 0x3E4E2C], sh: [0x3E5230, 0x4A5E36, 0x5A5E3A], fl: [0xE8D84A, 0xE8E8E0], dens: [26, 30, 40, 4], tr: { kind: "pine", n: 120 } },
aeaea: { g: [0x3A6A2E, 0x6A7A3E, 0x284A22], sh: [0x2E5A26, 0x3A6A2A, 0x4A6A30], fl: [0xB85AE8, 0xE8E0F0, 0xE85A6A], dens: [30, 30, 6, 12], tr: { kind: "oak", n: 260 }, fern: 1 },
lotus: { g: [0xB8A868, 0xD8C890, 0x8A8A50], sh: [0x6A7A40, 0x8A8A4A], fl: [0xF0A8C8, 0xE8E8F0, 0xF0C8D8], dens: [10, 26, 4, 14], tr: { kind: "palm2", n: 40 } },
ogygia: { g: [0x4A8A3A, 0x7A9A4A, 0x2E5E28], sh: [0x3A6A2E, 0x4A7A34], fl: [0x8A5AD8, 0xE8E8F0, 0xF0D84A, 0x6A8AE8], dens: [24, 44, 6, 26], tr: { kind: "cypress", n: 120 } },
scheria: { g: [0x6A9A4A, 0xA8A860, 0x4A6E34], sh: [0x4A6E34, 0x5A7A3A], fl: [0xF0F0E8, 0xE8A0B8, 0xE8C83A], dens: [18, 40, 6, 14], tr: { kind: "orchard", n: 180, rows: 1 }, walls: 1 },
thrinacia: { g: [0x8AAA4A, 0xC0B060, 0x5A7A34], sh: [0x5A7A34, 0x6A8A3A], fl: [0xF0D83A, 0xE85A3A, 0xF0F0E8, 0xB85AD8], dens: [12, 50, 4, 40], tr: { kind: "oak", n: 60 } },
pylos: { g: [0xC8B880, 0xE0D0A0, 0x9A9A5A], sh: [0x7A8A4A, 0x8A8A52], fl: [0xE8E0C8, 0xE8C83A], dens: [10, 34, 6, 6], tr: { kind: "pine", n: 50 } },
sparta: { g: [0x7A9A4A, 0xD0B868, 0x55703A], sh: [0x4A6A34, 0x5A7A3A], fl: [0xE85A3A, 0xF0F0E8], dens: [14, 36, 6, 12], tr: { kind: "cypress", n: 110, rows: 1 }, walls: 1, wheat: 1 },
troy: { g: [0x8A9A52, 0xB0A468, 0x5E6E3A], sh: [0x5E7040, 0x6A7044], fl: [0xE85A3A, 0xE8E0C8], dens: [10, 56, 8, 10], tr: { kind: "oak", n: 40 } },
cimmeria: { g: [0x5A5E48, 0x7A7458, 0x3A3E30], sh: [0x3A4030, 0x4A4A38], fl: [0xC8C8D0], dens: [14, 40, 12, 3], tr: { kind: "poplar", n: 90 } },
telepylus: { g: [0x6A6A50, 0x8A8268, 0x4A4A3A], sh: [0x4A5236, 0x5A5A3E], fl: [0xE8E0C8], dens: [10, 16, 44, 2], tr: { kind: "pine", n: 30 } },
pharos: { g: [0xC8B880, 0xE0D0A0, 0xA89E70], sh: [0x7A8A4A], fl: [0xE8E0C8], dens: [6, 26, 10, 3], tr: { kind: "palm2", n: 16 } },
nameless: { g: [0x6A8A44, 0x9A9A60, 0x46603A], sh: [0x46603A, 0x56703E], fl: [0xE8E0C8, 0xE8C83A, 0xC85A8A], dens: [22, 36, 14, 10], tr: { kind: "oak", n: 80 } }
};
function seiMerge(list) { return __ZC(533, 0, this, arguments, new.target); }
function seiLump(geo, amt, seed) { var p = geo.attributes.position; for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), k = 1 + (wNoise(x * 3 + seed, z * 3 + y * 2, seed) - 0.5) * amt;
p.setXYZ(i, x * k, y * k, z * k);
} geo.computeVertexNormals(); return geo; }
var SEI_GEO = null;
function seiGeo() { return __ZC(533, 1, this, arguments, new.target); }
function seiGrassTex() { return __ZC(533, 2, this, arguments, new.target); }
function seiMat(ds, grass) { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: ds || grass ? THREE.DoubleSide : THREE.FrontSide }); if (grass) {
m.map = seiGrassTex();
m.alphaTest = 0.35;
m.userData.noReal = 1;
} m.userData.noPhoto = 1; return m; }
function seiIM(G, geo, list, ds, grass, nm) { return __ZC(533, 3, this, arguments, new.target); }
function seiShade(hex, R, amt) { var c = new THREE.Color(hex), k = 1 + (R() - 0.5) * (amt || 0.25); c.r = Math.min(1, c.r * k); c.g = Math.min(1, c.g * k * (1 + (R() - 0.5) * 0.08)); c.b = Math.min(1, c.b * k); return c.getHex(); }
function seiOpen(p, x, z, minH) { return __ZC(533, 4, this, arguments, new.target); }
function seiGround(p, LK) { return __ZC(533, 5, this, arguments, new.target); }
function seiTreePut(T, kind, x, y, z, R, LK) { return __ZC(533, 6, this, arguments, new.target); }
function seiDress(p) { return __ZC(533, 7, this, arguments, new.target); }
function seiNear(x, z) { return __ZC(533, 8, this, arguments, new.target); }
function seiTick() { return __ZC(533, 9, this, arguments, new.target); }
(function () {
setInterval(function () { try {
if (SEI.groups.length && typeof WLD !== "undefined" && WLD.on === "sea")
seiTick();
}
catch (e) { } }, 450);
if (typeof seaIsland !== "function")
return;
var f = seaIsland;
seaIsland = function (G, p) { var r = f.apply(this, arguments); try {
seiDress(p);
}
catch (e) {
if (window.console)
console.warn("sea-isles:", p && p.k, e);
} return r; };
})();
