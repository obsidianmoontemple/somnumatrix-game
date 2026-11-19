/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var TZW_KEY = "tarzan", TZW_NAME = "Tarzan of the Apes", TZW_LONG = "Tarzan of the Apes: the cabin on the shore, the jungle and the apes, Mbonga's village, the sea and the Wisconsin woods";
var TZW = { base: -11800000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], moving: false, ride: null, night: 0, lights: 0, water: [], inst: [], beasts: [], hgt: null, rooms: [], doors: [], envK: null, st: {} };
var TZW_ERA = " It is the coast of West Africa between 1888 and 1909 (and later Wisconsin, in 1910), in Edgar Rice Burroughs's book Tarzan of the Apes (the book only, never any film). Speak in the manner of a person of the time, briefly and in character; keep it kind and suitable for all ages, never use the book's slurs, and never give away what happens later in the book.";
var TZW_SC = {
coast: { x: 0, name: "The coast of West Africa", bound: 900, env: "jungle" },
fuwalda: { x: 6000, name: "The Fuwalda, at sea", bound: 420, env: "sea" },
wisconsin: { x: 12000, name: "The woods of northern Wisconsin", bound: 620, env: "autumn" }
};
function tzwScAt(x) { var best = null, bd = 1e9; for (var k in TZW_SC) {
var d = Math.abs(x - TZW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 5000 ? best : null; }
var TZW_AT = {};
function tzwAtPt(at) { if (typeof at === "string")
at = TZW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
var TZW_ENV = {
jungle: { top: 0x4A84C8, low: 0xD8E4C8, fog: 0x9AB494, fogD: 0.0042, sun: 1.0, sunCol: 0xFFF2D0, sunDir: [0.3, 0.88, 0.2], hemi: 0.72, hemiCol: 0xD0E4C0, hemiGround: 0x2A3A18 },
canopy: { top: 0x2A4A2A, low: 0x6A8A5A, fog: 0x4A6A44, fogD: 0.012, sun: 0.55, sunCol: 0xFFF0C0, sunDir: [0.2, 0.95, 0.1], hemi: 0.62, hemiCol: 0xB8D8A0, hemiGround: 0x1A2410 },
junglenight: { top: 0x040A12, low: 0x12202A, fog: 0x0C161A, fogD: 0.006, sun: 0.26, sunCol: 0xC8D8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.3, hemiCol: 0x5A7A88, hemiGround: 0x060A06, stars: 0.95 },
shore: { top: 0x4A8ED8, low: 0xE8EEE8, fog: 0xC8DCE0, fogD: 0.0012, sun: 1.1, sunCol: 0xFFF4DC, sunDir: [0.4, 0.8, 0.3], hemi: 0.8, hemiCol: 0xDCE8F4, hemiGround: 0x5A5A3A },
tropicdusk: { top: 0x2A3A7A, low: 0xF0A060, fog: 0xB88A68, fogD: 0.0026, sun: 0.66, sunCol: 0xFFA060, sunDir: [-0.75, 0.22, 0.3], hemi: 0.6, hemiCol: 0xF0C0A0, hemiGround: 0x2A2416 },
fire: { top: 0x3A2418, low: 0xC87A3A, fog: 0x8A5A3A, fogD: 0.009, sun: 0.7, sunCol: 0xFFA860, sunDir: [0.3, 0.6, 0.2], hemi: 0.62, hemiCol: 0xE8A070, hemiGround: 0x2A1A10 },
heath: { top: 0x5A90D8, low: 0xE8ECE4, fog: 0xD4DCD0, fogD: 0.0014, sun: 1.05, sunCol: 0xFFF2DC, sunDir: [0.45, 0.8, 0.25], hemi: 0.76, hemiCol: 0xDCE8F4, hemiGround: 0x5A5A34 },
dusk: { top: 0x2A3A6A, low: 0xE8A070, fog: 0xB89078, fogD: 0.0022, sun: 0.62, sunCol: 0xFFA868, sunDir: [-0.75, 0.25, 0.3], hemi: 0.6, hemiCol: 0xE8C0A8, hemiGround: 0x3A2E22 },
dawn: { top: 0x5A6A9A, low: 0xF0C8A8, fog: 0xD0B8A8, fogD: 0.0024, sun: 0.7, sunCol: 0xFFD0A0, sunDir: [0.8, 0.25, 0.2], hemi: 0.66, hemiCol: 0xE8D0C0, hemiGround: 0x3A3428 },
smoke: { top: 0x3A3430, low: 0x7A6A5A, fog: 0x5A5048, fogD: 0.0062, sun: 0.45, sunCol: 0xE8B888, sunDir: [0.3, 0.6, 0.2], hemi: 0.55, hemiCol: 0xA89888, hemiGround: 0x2A241E },
red: { top: 0x6A80A8, low: 0xE0C8B8, fog: 0xC8A898, fogD: 0.0018, sun: 0.95, sunCol: 0xFFE8D0, sunDir: [0.4, 0.75, 0.3], hemi: 0.72, hemiCol: 0xE8D8D0, hemiGround: 0x5A2A22 },
sea: { top: 0x6A94C8, low: 0xE4EAEE, fog: 0xC8D4DC, fogD: 0.0011, sun: 0.95, sunCol: 0xFFF0D8, sunDir: [-0.5, 0.6, 0.3], hemi: 0.76, hemiCol: 0xDCE6F0, hemiGround: 0x4A5A5A },
ice: { top: 0x6A8AB8, low: 0xE8EEF2, fog: 0xD8E2EA, fogD: 0.0024, sun: 0.85, sunCol: 0xFFF4E8, sunDir: [0.3, 0.35, -0.6], hemi: 0.82, hemiCol: 0xE8F0FF, hemiGround: 0x9AA8B8 },
icefog: { top: 0xB8C4CE, low: 0xDDE4EA, fog: 0xD4DCE2, fogD: 0.012, sun: 0.5, sunCol: 0xF0F0F0, sunDir: [0.2, 0.6, -0.3], hemi: 0.86, hemiCol: 0xE8EEF4, hemiGround: 0x9AA4AE },
icenight: { top: 0x060C1A, low: 0x1A2638, fog: 0x141E2C, fogD: 0.004, sun: 0.28, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.6, -0.4], hemi: 0.34, hemiCol: 0x6A7AA8, hemiGround: 0x20283A, stars: 0.95 },
lake: { top: 0x5A8ED8, low: 0xE4EAEE, fog: 0xD0DCE4, fogD: 0.0011, sun: 1.05, sunCol: 0xFFF2DC, sunDir: [0.4, 0.8, 0.3], hemi: 0.76, hemiCol: 0xDCE8F4, hemiGround: 0x4A5A34 },
storm: { top: 0x1E2430, low: 0x4A5260, fog: 0x3A4250, fogD: 0.0045, sun: 0.32, sunCol: 0xB8C0D0, sunDir: [0.2, 0.9, 0.1], hemi: 0.5, hemiCol: 0x8A94A8, hemiGround: 0x1E2418 },
town: { top: 0x6A94D0, low: 0xE0E2DC, fog: 0xC8CCC8, fogD: 0.0024, sun: 0.95, sunCol: 0xFFF0D8, sunDir: [0.4, 0.75, 0.35], hemi: 0.72, hemiCol: 0xD8E0EA, hemiGround: 0x4A4638 },
rain: { top: 0x3A4450, low: 0x7A848A, fog: 0x6A7278, fogD: 0.007, sun: 0.42, sunCol: 0xC8D0D8, sunDir: [0.2, 0.9, 0.1], hemi: 0.6, hemiCol: 0xA8B0B8, hemiGround: 0x2A2E28 },
alpine: { top: 0x3A78D0, low: 0xE8EEF4, fog: 0xD8E4F0, fogD: 0.00065, sun: 1.1, sunCol: 0xFFF6E4, sunDir: [0.45, 0.8, 0.25], hemi: 0.78, hemiCol: 0xE0ECF8, hemiGround: 0x5A6448 },
mist: { top: 0x9AA8B8, low: 0xD8DEE2, fog: 0xC8D0D6, fogD: 0.0055, sun: 0.55, sunCol: 0xE8ECF0, sunDir: [0.3, 0.8, 0.2], hemi: 0.8, hemiCol: 0xD8E0E8, hemiGround: 0x5A5E58 },
forest: { top: 0x5A8AC0, low: 0xC8D8C0, fog: 0x9AAE98, fogD: 0.0034, sun: 0.86, sunCol: 0xFFF0D0, sunDir: [0.3, 0.85, 0.2], hemi: 0.68, hemiCol: 0xC8DCC0, hemiGround: 0x3A4A26 },
winter: { top: 0x7A90AA, low: 0xE4E8EC, fog: 0xD0D8DE, fogD: 0.0042, sun: 0.6, sunCol: 0xF0F0F0, sunDir: [0.3, 0.5, 0.2], hemi: 0.82, hemiCol: 0xE0E8F0, hemiGround: 0x8A8E90 },
spring: { top: 0x5A94DA, low: 0xEAF0E4, fog: 0xD4E2D0, fogD: 0.0018, sun: 1.05, sunCol: 0xFFF4DA, sunDir: [0.4, 0.8, 0.3], hemi: 0.78, hemiCol: 0xDCECF4, hemiGround: 0x4A6A2E },
autumn: { top: 0x6A88B8, low: 0xE8D8B8, fog: 0xC8B898, fogD: 0.0026, sun: 0.8, sunCol: 0xFFD8A8, sunDir: [0.5, 0.55, 0.2], hemi: 0.68, hemiCol: 0xE8D8C0, hemiGround: 0x5A4A2A },
river: { top: 0x5A90D8, low: 0xE6EAE0, fog: 0xD0D8CC, fogD: 0.0016, sun: 1.0, sunCol: 0xFFF0D8, sunDir: [0.4, 0.8, 0.3], hemi: 0.75, hemiCol: 0xDCE6F0, hemiGround: 0x4A5A30 },
grey: { top: 0x6A7A8A, low: 0xC8CED2, fog: 0xA8B2B8, fogD: 0.0045, sun: 0.6, sunCol: 0xE8ECF0, sunDir: [0.3, 0.7, 0.3], hemi: 0.72, hemiCol: 0xC8D2DA, hemiGround: 0x3A4234 },
moon: { top: 0x0A1428, low: 0x24304A, fog: 0x1A2436, fogD: 0.0035, sun: 0.4, sunCol: 0xC8D8FF, sunDir: [0.4, 0.6, -0.3], hemi: 0.38, hemiCol: 0x7A8AB8, hemiGround: 0x101418, stars: 0.85 },
evening: { top: 0x3A4A8A, low: 0xF0B07A, fog: 0xC89A80, fogD: 0.0018, sun: 0.72, sunCol: 0xFFB070, sunDir: [-0.7, 0.3, 0.3], hemi: 0.62, hemiCol: 0xF0C8A8, hemiGround: 0x3A3020 },
gaslit: { top: 0x0C1224, low: 0x2A2A3A, fog: 0x1E1E2A, fogD: 0.0032, sun: 0.3, sunCol: 0xC8D0F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.46, hemiCol: 0xE8C890, hemiGround: 0x1A140E, stars: 0.6 },
paris: { top: 0x6A90C8, low: 0xE4E0D8, fog: 0xC8C4BC, fogD: 0.0026, sun: 0.92, sunCol: 0xFFF0D8, sunDir: [0.4, 0.75, 0.35], hemi: 0.72, hemiCol: 0xDCE0E8, hemiGround: 0x4A4438 },
breton: { top: 0x5A80B0, low: 0xDCE2E4, fog: 0xB8C4CC, fogD: 0.0022, sun: 0.82, sunCol: 0xFFF0DC, sunDir: [-0.4, 0.6, -0.3], hemi: 0.74, hemiCol: 0xD8E2EC, hemiGround: 0x4A5040 },
opera: { top: 0x2A1A10, low: 0x6A4A28, fog: 0x3A2614, fogD: 0.006, sun: 0.5, sunCol: 0xFFE0A8, sunDir: [0.2, 0.9, 0.1], hemi: 1.05, hemiCol: 0xFFE8C0, hemiGround: 0x4A2A14 },
stage: { top: 0x1A120A, low: 0x4A3420, fog: 0x2A1C10, fogD: 0.007, sun: 0.55, sunCol: 0xFFE8C0, sunDir: [0.1, 0.9, 0.3], hemi: 0.95, hemiCol: 0xFFE0B0, hemiGround: 0x2A1A0E },
dark: { top: 0x040404, low: 0x0E0C0A, fog: 0x080706, fogD: 0.03, sun: 0.06, sunCol: 0xC8B898, sunDir: [0.2, 0.9, 0.1], hemi: 0.2, hemiCol: 0x8A7A60, hemiGround: 0x080604 },
cellar: { top: 0x0C0A08, low: 0x2A2218, fog: 0x18140E, fogD: 0.022, sun: 0.14, sunCol: 0xFFC880, sunDir: [0.2, 0.9, 0.1], hemi: 0.46, hemiCol: 0xC8A070, hemiGround: 0x14100A },
lakecave: { top: 0x04080A, low: 0x14222A, fog: 0x0C161C, fogD: 0.02, sun: 0.14, sunCol: 0xA8C8D8, sunDir: [0.2, 0.9, 0.1], hemi: 0.42, hemiCol: 0x7AA0B0, hemiGround: 0x060A0C },
hot: { top: 0x3A2410, low: 0xE8C890, fog: 0xC89060, fogD: 0.012, sun: 0.9, sunCol: 0xFFE8C0, sunDir: [0.1, 0.95, 0.1], hemi: 1.15, hemiCol: 0xFFF0D0, hemiGround: 0x6A3A10 },
night: { top: 0x060A18, low: 0x141A2A, fog: 0x10141E, fogD: 0.0042, sun: 0.22, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.28, hemiCol: 0x5A6A98, hemiGround: 0x0A0C10, stars: 0.95 },
snow: { top: 0x8A9AB0, low: 0xE8ECF0, fog: 0xDCE2E8, fogD: 0.0028, sun: 0.7, sunCol: 0xF4F4F8, sunDir: [0.3, 0.4, -0.5], hemi: 0.86, hemiCol: 0xE8EEF6, hemiGround: 0xA8B0BA },
indoor: { top: 0x2A2018, low: 0x4A3A2A, fog: 0x3A2E22, fogD: 0.012, sun: 0.24, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.8, hemiCol: 0xFFE6C0, hemiGround: 0x3A2A1E },
garret: { top: 0x140E0A, low: 0x2A1E14, fog: 0x1E160E, fogD: 0.016, sun: 0.12, sunCol: 0xFFC890, sunDir: [0.2, 0.9, 0.1], hemi: 0.55, hemiCol: 0xFFD0A0, hemiGround: 0x1A120A },
cell: { top: 0x0E0E10, low: 0x2A2A2E, fog: 0x1A1A1E, fogD: 0.02, sun: 0.12, sunCol: 0xD8D8E8, sunDir: [0.3, 0.9, 0.1], hemi: 0.48, hemiCol: 0xB8B8C8, hemiGround: 0x1A1A1A }
};
var TZW_Q = [];
function tzQ(s) { TZW_Q.push(s); return "<i>“" + s + "”</i>"; }
function tzQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0'>" + tzQ(s) + "</p>"; }).join(""); }
function tzEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function tzSrc(part) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>Edgar Rice Burroughs, Tarzan of the Apes (1912)" + (part ? ", " + part : "") + "</div>"; }
function tzwLite() { return typeof LITE !== "undefined" && !!LITE; }
function tzwPhotoTex(name, mpt, nrm) { return __ZC(508, 0, this, arguments, new.target); }
function tzwS(name, col, mpt, o) { return __ZC(508, 1, this, arguments, new.target); }
function tzwCanvas(key, w, h, fn) { if (TZW.tex[key])
return TZW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (TZW.tex[key] = t); }
function tzwM(key, make) { return TZW.mats[key] || (TZW.mats[key] = make()); }
function tzwLam(col, o) { return __ZC(508, 2, this, arguments, new.target); }
function tzwShine(col, r, mt) { return tzwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function tzwGlowM(col, op) { return tzwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function tzwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function tzwLeafTex() { return tzwPhotoTexAlpha(); }
function tzwPhotoTexAlpha() { var k = "leafpng"; if (TZW.tex[k])
return TZW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (TZW.tex[k] = t); }
function tzwFrondTex(kind) { return __ZC(508, 3, this, arguments, new.target); }
function tzwBambooTex() { return __ZC(508, 4, this, arguments, new.target); }
function tzwReedTex(kind) { return __ZC(508, 5, this, arguments, new.target); }
function tzwGrassTex() { return __ZC(508, 6, this, arguments, new.target); }
function tzwFlowerTex(col) { return __ZC(508, 7, this, arguments, new.target); }
function tzwSkinTex(kind) { return __ZC(508, 8, this, arguments, new.target); }
function tzwRippleTex() { return __ZC(508, 9, this, arguments, new.target); }
function tzwWaterM(col, op) { return tzwM("water" + col + "|" + op, function () { var t = tzwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var TZW_CELL = 48;
function tzwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / TZW_CELL), b = Math.floor(x1 / TZW_CELL), c = Math.floor(z0 / TZW_CELL), d = Math.floor(z1 / TZW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function tzwGridAdd(S) { var g = TZW.sgrid || (TZW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; tzwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function tzwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; TZW.solids.push(S); tzwGridAdd(S); return S; }
function tzwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; TZW.solids.push(S); tzwGridAdd(S); return S; }
function tzwSolidAt(x, z, feet) { return __ZC(508, 10, this, arguments, new.target); }
function tzwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; TZW.floors.push(F); return F; }
function tzwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; TZW.floors.push(F); return F; }
function tzwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function tzwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function tzwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < TZW.floors.length; i++) {
var F = TZW.floors[i];
if (F.off || !tzwFloorIn(F, x, z))
continue;
var y = tzwFloorY(F, x, z);
if (y <= feet + 1.1 && (best === null || y > best))
best = y;
} return best; }
function tzwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; TZW.spots.push(S); return S; }
function tzwPerson(seed, x, z, y, o, ry) { return __ZC(508, 11, this, arguments, new.target); }
function tzwTalk(P, name, persona, greet, r, fn) { TZW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona + TZW_ERA, greet: greet } }); return P; }
function tzwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(508, 12, this, arguments, new.target); }
function tzwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function tzwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = tzwHash(ix, iz), b = tzwHash(ix + 1, iz), c = tzwHash(ix, iz + 1), d = tzwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function tzwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * tzwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function tzwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function tzwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), tzwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); TZW.water.push(m); return m; }
var TZW_GEO = {};
function tzwGeo(k, make) { if (TZW_GEO[k])
return TZW_GEO[k]; var g = make(); g.userData.shared = 1; return (TZW_GEO[k] = g); }
function tzwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function tzwFronds(n, len, wid, droop, y0, ring) { return __ZC(508, 13, this, arguments, new.target); }
function tzwInst(P, geo, mat, list, o) { return __ZC(508, 14, this, arguments, new.target); }
function tzwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function tzwPathD(x, z, pts) { var best = 1e9; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = Math.sqrt(px * px + pz * pz);
if (d < best)
best = d;
} return best; }
function tzwStrip(P, pts, w, hfn, mat, lift) { return __ZC(508, 15, this, arguments, new.target); }
function tzwPlant(P, kind, list, o) { return __ZC(508, 16, this, arguments, new.target); }
function tzwTaper(pts, rads, seg, rs, flat) { return __ZC(508, 17, this, arguments, new.target); }
function tzwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function tzwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function tzwSkinM(kind, col) { return __ZC(508, 18, this, arguments, new.target); }
function tzwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), tzwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function tzwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(508, 19, this, arguments, new.target); }
function tzwBoxG(w, h, d) { return __ZC(508, 20, this, arguments, new.target); }
function tzwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(tzwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !tzwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
tzwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function tzwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(tzwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function tzwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(508, 21, this, arguments, new.target); }
function tzwHouse(P, x, z, w, d, h, o) { return __ZC(508, 22, this, arguments, new.target); }
function tzwLand(x, z) { if (TZW.inRm && tzwRoomAt(x, z))
return -999; return TZW.hgt ? TZW.hgt(x, z) : 0; }
function tzwGround(x, z, feet) { var f = tzwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = tzwLand(x, z); return f === null ? h : Math.max(f, h); }
var TZW_SCN = {};
function tzwSc() { return TZW_SC[TZW.sc] || TZW_SC.woking; }
function tzwSceneDrop() { return __ZC(508, 23, this, arguments, new.target); }
function tzwScene(k) { return __ZC(508, 24, this, arguments, new.target); }
function tzwVeil() { if (TZW.veil)
return TZW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); TZW.veil = v; return v; }
function tzwGo(at, msg, after) { return __ZC(508, 25, this, arguments, new.target); }
function tzwSmoke(P, x, y, z, col, n) { return __ZC(508, 26, this, arguments, new.target); }
function tzwFire(P, x, y, z, s) { return __ZC(508, 27, this, arguments, new.target); }
function tzwLocalSc() { var L = worldLocal(); return { x: L.x - tzwSc().x, z: L.z }; }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
var C = function (o, list) { return list[Math.floor(o.r * list.length) % list.length]; };
Object.assign(DLN_WEAR, {
tzape: function (o) { return { ids: ["oz:belt", "oz:skirt:knee:0.08:cloth"], col: { belt: 0x4A3420, skirt: 0x8A6A44, dress: 0x8A6A44 }, shoes: 0x6A4A30 }; },
tzboy: function (o) { return { ids: ["oz:belt", "oz:skirt:knee:0.05:cloth"], col: { belt: 0x5A4430, skirt: 0x9A7A54, dress: 0x9A7A54 }, shoes: 0x7A5A3A }; },
tzdressed: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:collar:low:soft", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xF0ECE0, collar: 0xF0ECE0, trou: 0xD8D0B8 }, shoes: 0x3A2A1A }; },
tzlord: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xFAF8F2, collar: 0xFAF8F2, tie: 0x2A2A3A, vest: 0xF0ECE0, coat: 0xF2EEE2, trou: 0xEAE4D4 }, shoes: 0x4A3420 }; },
tzalice: function (o) { return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.18:cloth", "oz:collar:high:none"], col: { dress: 0xE8E2EE, skirt: 0xD8D2E0, trim: 0xFAF6F0, collar: 0xFAF6F0 }, shoes: 0x2A1E16 }; },
tzsailor: function (o) { return { ids: [C(o, ["oz:shirt:long:stripe", "oz:shirt:long:cloth", "oz:shirt:long:check"]), "oz:trousers:cloth", "oz:boots"], col: { shirt: C(o, [0x2A3A5A, 0xE8E0D0, 0x6A2A2A, 0x3A4A3A]), trou: C(o, [0xD8D0B8, 0x2A3040, 0x5A5040]) }, shoes: 0x1E1610 }; },
tzmate: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xE8E2D4, coat: 0x1A2238, trou: 0x1A2238 }, shoes: 0x141010 }; },
tzvillm: function (o) { var c = C(o, [0xA8743A, 0x8A5A2A, 0xC8A060, 0x6A3A1E, 0xB85A2A, 0xD8C090]); return { ids: ["oz:belt", "oz:skirt:knee:0.12:cloth"], col: { belt: C(o, [0x3A2414, 0xC8A040, 0x8A2A1A]), skirt: c, dress: c }, shoes: 0x3A2414 }; },
tzvillf: function (o) { var c = C(o, [0xB85A2A, 0xD8A040, 0x6A3A1E, 0x2A4A6A, 0xC8B090, 0x8A2A2A]); return { ids: ["oz:bodice:cap:cloth", "oz:skirt:calf:0.18:cloth", "oz:sash"], col: { dress: c, skirt: c, trim: c, sash: C(o, [0xE8C860, 0xD84A2A, 0xF0E8D0, 0x2A6A4A]) }, shoes: 0x3A2414 }; },
tzvillc: function (o) { var c = C(o, [0xC8A060, 0xB85A2A, 0x8A5A2A]); return { ids: ["oz:belt", "oz:skirt:knee:0.06:cloth"], col: { belt: 0x3A2414, skirt: c, dress: c }, shoes: 0x3A2414 }; },
tzprof: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth:chain", "oz:coat:frock:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xF4F2EA, collar: 0xF4F2EA, tie: 0x141414, vest: 0x1A1A1E, coat: 0x121216, trou: 0x2A2A30 }, shoes: 0x141010 }; },
tzjane: function (o) { return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.16:cloth", "oz:collar:high:none", "oz:sash"], col: { dress: 0xF8F6F0, skirt: 0x8A7A5A, trim: 0xF8F6F0, collar: 0xF8F6F0, sash: 0x2A2A3A }, shoes: 0x2A1E16 }; },
tzmaid: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.14:cloth", "oz:apron:full:long:0.12"], col: { dress: 0x3A5A8A, skirt: 0x3A5A8A, trim: 0xF4F2EC, apron: 0xF8F6F0 }, shoes: 0x1E1610 }; },
tzcecil: function (o) { return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xF8F6F0, collar: 0xF8F6F0, coat: 0xF0ECE0, trou: 0xF0ECE0 }, shoes: 0x6A4A2A }; },
tzfroff: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:none", "oz:coat:military:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xFAF8F2, collar: 0xFAF8F2, coat: 0x141A30, trou: 0x141A30, trim: 0xD8B040 }, shoes: 0x0E0E10 }; },
tzfrsail: function (o) { return { ids: ["oz:shirt:long:stripe", "oz:collar:low:soft", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xF4F4F8, collar: 0x1E2A5A, trou: 0x1E2A5A }, shoes: 0x0E0E10 }; },
tzfarm: function (o) { return { ids: [C(o, ["oz:shirt:long:check", "oz:shirt:long:cloth"]), "oz:trousers:cloth", "oz:boots"], col: { shirt: C(o, [0x8A2A2A, 0x3A4A6A, 0xD8D0B8, 0x5A6A3A]), trou: C(o, [0x2A3A5A, 0x4A4038, 0x3A3A3A]) }, shoes: 0x2A1E14 }; },
tzfarmf: function (o) { var c = C(o, [0xD8E0F0, 0xF0E0D0, 0xE0E8D0, 0xE8D0D8]); return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.12:cloth", "oz:apron:half:long"], col: { dress: c, skirt: c, trim: 0xFAFAF6, apron: 0xF8F6F0 }, shoes: 0x2A1E14 }; }
});
if (typeof DLN_HAT !== "undefined") {
if (!DLN_HAT.topee)
DLN_HAT.topee = function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0xEAE2CC, { r: 0.95 });
var d = new THREE.Mesh(wfGeo("tztopd", function () { var s = new THREE.SphereGeometry(0.14, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5); s.scale(1, 0.9, 1.16); return s; }), mt);
g.add(d);
var b = new THREE.Mesh(wfGeo("tztopb", function () { var s = new THREE.SphereGeometry(0.24, 20, 8, 0, Math.PI * 2, Math.PI * 0.42, Math.PI * 0.1); s.scale(1, 0.5, 1.15); return s; }), mt);
b.material.side = THREE.DoubleSide;
b.position.y = 0.03;
g.add(b);
var bd = new THREE.Mesh(wfGeo("tztopbd", function () { return new THREE.CylinderGeometry(0.142, 0.142, 0.03, 18, 1, true); }), wfMat(0x8A7A5A));
bd.position.y = 0.015;
g.add(bd);
add("Head", [0, 0.12, -0.01], g);
};
if (!DLN_HAT.slouch)
DLN_HAT.slouch = function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x6A5A40, { r: 1 });
g.add(new THREE.Mesh(wfGeo("tzslb", function () { return new THREE.CylinderGeometry(0.27, 0.27, 0.012, 22); }), mt));
var cr = new THREE.Mesh(wfGeo("tzslc", function () { return new THREE.CylinderGeometry(0.115, 0.135, 0.12, 16); }), mt);
cr.position.y = 0.06;
g.add(cr);
var bd = new THREE.Mesh(wfGeo("tzslbd", function () { return new THREE.CylinderGeometry(0.137, 0.137, 0.03, 16, 1, true); }), wfMat(0x2A1E14));
bd.position.y = 0.02;
g.add(bd);
add("Head", [0, 0.13, -0.01], g);
};
if (!DLN_HAT.seacap)
DLN_HAT.seacap = function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x1A1E2A, { r: 0.9 });
var t = new THREE.Mesh(wfGeo("tzscpt", function () { return new THREE.CylinderGeometry(0.13, 0.125, 0.07, 16); }), mt);
t.position.y = 0.035;
g.add(t);
var p = new THREE.Mesh(wfGeo("tzscpp", function () { return new THREE.CylinderGeometry(0.11, 0.11, 0.01, 12, 1, false, -Math.PI / 2, Math.PI); }), wfMat(0x0A0A0C, { r: 0.4 }));
p.position.set(0, 0, 0.08);
g.add(p);
add("Head", [0, 0.12, -0.005], g);
};
if (!DLN_HAT.kepi)
DLN_HAT.kepi = function (add) {
var g = new THREE.Group(), mt = wfMat(0x141A30, { r: 0.7 });
var t = new THREE.Mesh(wfGeo("tzkpt", function () { return new THREE.CylinderGeometry(0.115, 0.13, 0.11, 16); }), mt);
t.position.y = 0.05;
t.rotation.x = -0.12;
g.add(t);
var bd = new THREE.Mesh(wfGeo("tzkpb", function () { return new THREE.CylinderGeometry(0.132, 0.132, 0.022, 16, 1, true); }), wfMat(0xD8B040, { m: 0.7, r: 0.4 }));
bd.position.y = 0.012;
g.add(bd);
var p = new THREE.Mesh(wfGeo("tzkpp", function () { return new THREE.CylinderGeometry(0.11, 0.11, 0.01, 12, 1, false, -Math.PI / 2, Math.PI); }), wfMat(0x0A0A0C, { r: 0.3 }));
p.position.set(0, 0, 0.08);
g.add(p);
add("Head", [0, 0.12, -0.005], g);
};
if (!DLN_HAT.sailorhat)
DLN_HAT.sailorhat = function (add) {
var g = new THREE.Group(), w = wfMat(0xF8F8FA, { r: 0.9 });
var t = new THREE.Mesh(wfGeo("tzsht", function () { return new THREE.CylinderGeometry(0.14, 0.12, 0.06, 16); }), w);
t.position.y = 0.03;
g.add(t);
var pm = new THREE.Mesh(wfGeo("tzshp", function () { return new THREE.SphereGeometry(0.03, 8, 6); }), wfMat(0xC8202A));
pm.position.y = 0.075;
g.add(pm);
add("Head", [0, 0.12, -0.01], g);
};
if (!DLN_HAT.headwrap)
DLN_HAT.headwrap = function (add, c) { var m = new THREE.Mesh(wfGeo("tzhwr", function () { var s = new THREE.SphereGeometry(0.135, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); s.scale(1.05, 0.95, 1.1); return s; }), wfMat(c || 0xD8A040, { r: 1 })); add("Head", [0, 0.09, -0.01], m); };
}
if (typeof DLN_HELDF !== "undefined") {
if (!DLN_HELDF.knife)
DLN_HELDF.knife = function (add) {
var g = new THREE.Group();
var b = new THREE.Mesh(wfGeo("tzknb", function () { return new THREE.BoxGeometry(0.035, 0.26, 0.006); }), wfMat(0xC8C8D0, { m: 0.85, r: 0.25 }));
b.position.y = 0.17;
g.add(b);
var h = new THREE.Mesh(wfGeo("tzknh", function () { return new THREE.CylinderGeometry(0.016, 0.018, 0.11, 8); }), wfMat(0x3A2414));
g.add(h);
add("hand_r", [0, -0.02, 0.03], g);
};
if (!DLN_HELDF.spear)
DLN_HELDF.spear = function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("tzspr", function () { return new THREE.CylinderGeometry(0.012, 0.014, 2.0, 6); }), wfMat(0x8A6A40)));
var tip = new THREE.Mesh(wfGeo("tzsprt", function () { var c = new THREE.ConeGeometry(0.028, 0.22, 4); c.scale(1, 1, 0.35); return c; }), wfMat(0x5A5A60, { m: 0.7, r: 0.4 }));
tip.position.y = 1.1;
g.add(tip);
add("hand_r", [0, 0.3, 0.02], g);
};
if (!DLN_HELDF.bow)
DLN_HELDF.bow = function (add) {
var g = new THREE.Group(), a = new THREE.Mesh(wfGeo("tzbow", function () { return new THREE.TorusGeometry(0.62, 0.012, 5, 16, Math.PI * 0.7); }), wfMat(0x5A3A1E));
a.rotation.z = Math.PI * 0.65;
a.position.x = -0.5;
g.add(a);
var st = new THREE.Mesh(wfGeo("tzbows", function () { return new THREE.CylinderGeometry(0.002, 0.002, 1.06, 3); }), wfMat(0xE8E0C8));
st.position.x = -0.04;
g.add(st);
add("hand_l", [0, 0, 0.04], g);
};
if (!DLN_HELDF.rope)
DLN_HELDF.rope = function (add) { var r = new THREE.Mesh(wfGeo("tzrope", function () { return new THREE.TorusGeometry(0.2, 0.018, 6, 20); }), wfMat(0x8A7A4A, { r: 1 })); r.rotation.set(0.2, 0.3, 1.2); add("hand_l", [0, -0.1, 0.04], r); };
if (!DLN_HELDF.rifle)
DLN_HELDF.rifle = function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("tzrfb", function () { return new THREE.CylinderGeometry(0.009, 0.011, 0.72, 6); }), wfMat(0x1E1E22, { m: 0.7, r: 0.4 })));
var st = new THREE.Mesh(wfGeo("tzrfs", function () { return new THREE.BoxGeometry(0.04, 0.42, 0.07); }), wfMat(0x5A3A1E));
st.position.y = -0.5;
g.add(st);
g.rotation.x = 0.25;
add("hand_r", [0, 0.1, 0.04], g);
};
if (!DLN_HELDF.pot)
DLN_HELDF.pot = function (add) { var p = new THREE.Mesh(wfGeo("tzpot", function () { var s = new THREE.SphereGeometry(0.13, 12, 10); s.scale(1, 0.85, 1); return s; }), wfMat(0x9A5A34, { r: 1 })); add("hand_l", [0, -0.12, 0.05], p); };
}
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { tzape: [null], tzboy: [null], tzdressed: [null], tzlord: ["topee"], tzalice: ["ladyhat"], tzsailor: [null, "seacap", null, "seacap"], tzmate: ["seacap"], tzvillm: [null, null, null, "headwrap"], tzvillf: ["headwrap", null, "headwrap"], tzvillc: [null],
tzprof: ["tophat"], tzjane: [null, "ladyhat"], tzmaid: ["headwrap"], tzcecil: ["topee"], tzfroff: ["kepi"], tzfrsail: ["sailorhat"], tzfarm: ["slouch", null, "flatcap"], tzfarmf: [null] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { tzape: ["knife"], tzboy: [null], tzdressed: [null], tzlord: [null, "rifle"], tzalice: [null], tzsailor: [null], tzmate: [null], tzvillm: ["spear", "spear", "bow", null], tzvillf: [null, "pot", null], tzvillc: [null],
tzprof: [null, "book"], tzjane: [null, "parasol"], tzmaid: [null], tzcecil: ["rifle", null], tzfroff: [null], tzfrsail: ["rifle", null], tzfarm: [null], tzfarmf: [null] });
})();
function tzwDressed(seed, dress, o) { return __ZC(508, 28, this, arguments, new.target); }
var TZW_ERA2 = TZW_ERA;
var TZP = {
tarzan: "You are Tarzan of the Apes, from Edgar Rice Burroughs's book (the book only, never any film): raised by the she-ape Kala in Kerchak's tribe, you taught yourself to read and write English from your dead father's books in the cabin on the shore, though you have never heard it spoken; you speak the apes' tongue and, as the book goes on, a little French. Proud, curious, fearless, courteous in your own way; you call the apes Mangani. Speak in short, plain sentences." + TZW_ERA2,
boy: "You are the boy Tarzan, about ten, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): you live with the great apes, whom you call the Mangani, and Kala is your mother; you are smaller and weaker than the young apes but quicker and cleverer, and you are curious about the little cabin on the shore. You speak like a quick, proud child." + TZW_ERA2,
clayton: "You are John Clayton, Lord Greystoke, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): a young English nobleman, strong, brave, resourceful, a little formal, devoted to your wife Alice; marooned with her on this coast in 1888, you are building a cabin and keeping a diary in French." + TZW_ERA2,
alice: "You are Lady Alice Greystoke, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): young, gentle, brave, devoted to your husband John; you are expecting a child, marooned on a lonely African coast in 1888." + TZW_ERA2,
michael: "You are Black Michael, a big sailor of the barkentine Fuwalda, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): rough but grateful to Lord Greystoke, who once did you a kindness; you have no love for the brutal captain." + TZW_ERA2,
captain: "You are the captain of the barkentine Fuwalda, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): a harsh, quick-tempered man who keeps his crew down with his fists and his pistol. Be gruff, never cruel to the player." + TZW_ERA2,
sailor: "You are a sailor in Edgar Rice Burroughs's Tarzan of the Apes (the book only), on a hard ship in 1888 or 1909: you grumble about the food, the officers and the heat, and you know the sea." + TZW_ERA2,
porter: "You are Professor Archimedes Q. Porter of Baltimore, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): an old, absent-minded, learned scholar in a frock-coat and silk hat, come to Africa to find a buried treasure; you speak in long, grand words and forget where you are." + TZW_ERA2,
philander: "You are Mr. Samuel T. Philander, Professor Porter's secretary, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): thin, nervous, precise, forever trying to keep the Professor out of trouble and out of the jungle." + TZW_ERA2,
jane: "You are Jane Porter of Baltimore, nineteen, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): brave, clever, warm, quick-witted; you have come to Africa with your father the Professor on his treasure-hunt, and you have been saved in the forest by a stranger you can't stop thinking of." + TZW_ERA2,
esmeralda: "You are Esmeralda, Jane Porter's devoted maid from Baltimore, in Edgar Rice Burroughs's Tarzan of the Apes (the book only): warm-hearted, quick to fear the jungle and quicker to defend Miss Jane. Speak in plain, clear English, with dignity and humour." + TZW_ERA2,
cecil: "You are William Cecil Clayton, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): a young Englishman, heir to Lord Greystoke, travelling with the Porters; brave, decent, a little stiff, and in love with Jane Porter." + TZW_ERA2,
darnot: "You are Lieutenant Paul D'Arnot of the French navy, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): a cheerful, warm, gallant young officer who owes Tarzan his life and becomes his best friend; you are teaching him to speak French." + TZW_ERA2,
dufranne: "You are Captain Dufranne of the French cruiser, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): a steady, courteous commander, anxious to find your lost lieutenant D'Arnot." + TZW_ERA2,
frsailor: "You are a sailor of the French cruiser off the West African coast in 1909, in Edgar Rice Burroughs's Tarzan of the Apes (the book only): you speak a little English with a French accent and are glad to be ashore." + TZW_ERA2,
snipes: "You are Snipes, a sailor of the Arrow, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): a sly, grumbling little man who has fallen out with your shipmates. Be shifty, never cruel to the player." + TZW_ERA2,
mbonga: "You are Mbonga, the old chief of a village in the forest of West Africa, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): your people came here fleeing the soldiers of a cruel foreign power; you are wary of strangers, proud of your village and your people, and a little afraid of the forest god who steals from your village." + TZW_ERA2,
constantine: "You are Father Constantine of the French Mission on the West African coast about 1909, in Edgar Rice Burroughs's Tarzan of the Apes (the book only): a kindly, practical priest who runs a small mission with its church, house and fields; you welcome lost travellers, and speak French and English." + TZW_ERA2,
mission: "You live and work at the French Mission on the West African coast about 1909: you tend the fields, sew, cook, teach the children and keep the mission's houses; you speak of your work, your family and your village with quiet pride." + TZW_ERA2,
portman: "You are a European trader or official at a little French port at a river's mouth on the West African coast about 1909, in Edgar Rice Burroughs's Tarzan of the Apes (the book only): you sit on the hotel veranda, talk of ships, trade, the heat and lion hunting, and have heard odd tales of the big quiet Monsieur Tarzan." + TZW_ERA2,
villager: "You live in Mbonga's village in the forest of West Africa about 1900: you farm the fields by the river, hunt, fish, weave, cook and make pots; you speak of your own work and family, of the forest, and of the strange forest god who plays tricks in the village at night. Speak with warmth and dignity." + TZW_ERA2,
canler: "You are Robert Canler of Baltimore, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): a rich, smooth, middle-aged man who has lent Professor Porter money and expects to marry Jane. Be smug and polite." + TZW_ERA2,
kala: "You are Kala, a young she-ape of the tribe of Kerchak, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): fierce in defence and tender beyond words with the little hairless white baby you took from the cabin and raised as your own, whom the tribe calls Tarzan, White-Skin. You speak only in the short, simple words of the apes' tongue (food, water, danger, Sabor, Numa, tree, good, bad). Never speak of how the book goes on." + TZW_ERA2,
kerchak: "You are Kerchak, the great king ape of the tribe, from Edgar Rice Burroughs's Tarzan of the Apes (the book only): huge, ill-tempered, jealous of your rule, quick to fury. You speak only in the short, harsh words of the apes' tongue, in threats and boasts. Never harm the player; growl and warn." + TZW_ERA2,
ape: "You are one of the great apes of the tribe of Kerchak, from Edgar Rice Burroughs's Tarzan of the Apes (the book only). You speak only in a few short words of the apes' tongue: food, water, tree, danger, sleep, Tarzan." + TZW_ERA2,
farm: "You live on a farm in the woods of northern Wisconsin in 1910, in the world of Edgar Rice Burroughs's Tarzan of the Apes: you speak of the crops, the woods, the dry autumn and the smoke of forest fires on the wind." + TZW_ERA2
};
function tzwPersona(k) { return TZP[k] || k || ""; }
var TZW_FOLK = {
tarzan: { name: "Tarzan of the Apes", dress: "tzape", sex: "m", hair: 0x141210, skin: 0xC8946A, persona: "tarzan", greet: "I am Tarzan. This is my jungle.", scale: [1.06, 1.06, 1.06] },
tarzanboy: { name: "The boy Tarzan", dress: "tzboy", sex: "m", hair: 0x141210, skin: 0xCC9A72, persona: "boy", greet: "Kala is my mother. Who are you?", child: true },
tarzand: { name: "Tarzan of the Apes", dress: "tzdressed", sex: "m", hair: 0x141210, skin: 0xC8946A, persona: "tarzan", greet: "Bonjour. D'Arnot is teaching me to speak.", scale: [1.06, 1.06, 1.06] },
clayton: { name: "John Clayton, Lord Greystoke", dress: "tzlord", sex: "m", hair: 0x5A3A20, beard: "short", skin: 0xEAC8A8, persona: "clayton", greet: "Good day. Watch the edge of the jungle; we are not alone here." },
alice: { name: "Lady Alice Greystoke", dress: "tzalice", sex: "f", hair: 0xB8904A, skin: 0xF0D4BC, persona: "alice", greet: "John is at the cabin. Isn't the little harbour lovely, in spite of everything?" },
michael: { name: "Black Michael", dress: "tzsailor", sex: "m", hair: 0x141210, beard: "full", skin: 0xD8B090, persona: "michael", greet: "You'll be all right with me, my lord. Black Michael don't forget a kindness.", scale: [1.12, 1.04, 1.12] },
captain: { name: "The captain of the Fuwalda", dress: "tzmate", sex: "m", hair: 0x3A2A1A, beard: "full", skin: 0xD8A888, persona: "captain", greet: "Keep out from under my feet, and out of my men's business." },
porter: { name: "Professor Archimedes Q. Porter", dress: "tzprof", sex: "m", hair: 0xE8E4DC, beard: "full", skin: 0xEAC8B0, persona: "porter", greet: "Ah! Remarkable, most remarkable. Have you seen Mr. Philander?" },
philander: { name: "Mr. Samuel T. Philander", dress: "tzprof", sex: "m", hair: 0xC8C0B0, skin: 0xEAC8B0, persona: "philander", greet: "Professor! Professor Porter! Oh dear, he has wandered off again.", scale: [0.94, 1.04, 0.94] },
jane: { name: "Jane Porter", dress: "tzjane", sex: "f", hair: 0xC8A060, skin: 0xF2D8C2, persona: "jane", greet: "Oh! I thought you were ... someone else. Have you seen anyone in the trees?" },
esmeralda: { name: "Esmeralda", dress: "tzmaid", sex: "f", hair: 0x141210, skin: 0x5A3422, persona: "esmeralda", greet: "Miss Jane is in the cabin, and she's not to be bothered. This jungle is no place for a lady." },
cecil: { name: "William Cecil Clayton", dress: "tzcecil", sex: "m", hair: 0xB8904A, beard: "mustache", skin: 0xEAC8B0, persona: "cecil", greet: "Good day. Have you seen Miss Porter? I mean to see her safe." },
darnot: { name: "Lieutenant Paul D'Arnot", dress: "tzfroff", sex: "m", hair: 0x2A1E14, beard: "mustache", skin: 0xE8C4A4, persona: "darnot", greet: "Bonjour, mon ami! You are a friend of Tarzan? Then you are a friend of mine." },
dufranne: { name: "Captain Dufranne", dress: "tzfroff", sex: "m", hair: 0x8A8A8A, beard: "full", skin: 0xE8C4A4, persona: "dufranne", greet: "Good day. We are searching for one of my officers. Have you any news?" },
snipes: { name: "Snipes", dress: "tzsailor", sex: "m", hair: 0x5A4030, beard: "short", skin: 0xE0B898, persona: "snipes", greet: "What're you lookin' at? Mind your own business.", scale: [0.92, 0.96, 0.92] },
mbonga: { name: "Mbonga, the chief", dress: "tzvillm", sex: "m", hair: 0xD8D4CC, beard: "short", skin: 0x4A2C1C, persona: "mbonga", greet: "You are a stranger in my village. Sit, and say why you have come." },
canler: { name: "Robert Canler", dress: "gent", sex: "m", hair: 0x5A4A3A, beard: "mustache", skin: 0xEAC8B0, persona: "canler", greet: "Good afternoon. Professor Porter and I have business to settle." }
};
function tzwFolk(key, x, z, ry, o) { return __ZC(508, 29, this, arguments, new.target); }
function tzwCrowd(seed, list, x0, z0, x1, z1, o) { return __ZC(508, 30, this, arguments, new.target); }
function tzwOne(seed, name, sex, dress, x, z, ry, greet, o) { return __ZC(508, 31, this, arguments, new.target); }
function tzwVoiceG() { var g = new THREE.Group(); g.userData.voice = 1; return g; }
var TZW_RY = -80;
function tzwMat(k) { return __ZC(508, 32, this, arguments, new.target); }
function tzwThatchM() { return __ZC(508, 33, this, arguments, new.target); }
function tzwInRoom() { return camera.position.y < TZW_RY + 30; }
function tzwRoomAt(x, z) { for (var i = 0; i < TZW.rooms.length; i++) {
var R = TZW.rooms[i];
if (x > R.x0 - 0.3 && x < R.x1 + 0.3 && z > R.z0 - 0.3 && z < R.z1 + 0.3)
return R;
} return null; }
function tzwRoom(P, key, cx, cz, w, d, o) { return __ZC(508, 34, this, arguments, new.target); }
function tzwDoor(R, name, ox, oz, ory) { return __ZC(508, 35, this, arguments, new.target); }
function tzwInDoor(fromKey, toKey, lx, lz, name, verb) { return __ZC(508, 36, this, arguments, new.target); }
function tzwIn(sc, key, lx, lz) {
return function () {
var R = TZW.sc === sc ? TZW.rooms.filter(function (r) { return r.key === key; })[0] : null;
if (R)
return { sc: sc, x: R.cx + lx, z: R.cz + lz, y: R.y };
var A = TZW_ROOMXZ[sc] && TZW_ROOMXZ[sc][key];
return A ? { sc: sc, x: A[0] + lx, z: A[1] + lz, y: TZW_RY } : null;
};
}
var TZW_ROOMXZ = {};
function tzwTable(P, x, z, w, d, h, o) { return __ZC(508, 37, this, arguments, new.target); }
function tzwChair(P, x, z, ry, o) { return __ZC(508, 38, this, arguments, new.target); }
function tzwBed(P, x, z, ry, o) { return __ZC(508, 39, this, arguments, new.target); }
function tzwShelves(P, x, z, w, h, ry, o) { return __ZC(508, 40, this, arguments, new.target); }
function tzwHearth(P, x, z, ry, o) { return __ZC(508, 41, this, arguments, new.target); }
function tzwCandle(P, x, y, z, o) { return __ZC(508, 42, this, arguments, new.target); }
function tzwBench(P, x, z, ry, o) { return __ZC(508, 43, this, arguments, new.target); }
function tzwRug(P, x, z, w, d, col) { return __ZC(508, 44, this, arguments, new.target); }
function tzwPicture(P, x, y, z, ry, w, h, draw) { return __ZC(508, 45, this, arguments, new.target); }
function tzwWindowIn(P, x, y, z, ry, w, h, o) { return __ZC(508, 46, this, arguments, new.target); }
function tzwTownHouse(P, x, z, w, d, h, o) { return __ZC(508, 47, this, arguments, new.target); }
function tzwChurch(P, x, z, o) { return __ZC(508, 48, this, arguments, new.target); }
function tzwTownWall(P, x0, z0, x1, z1, h, gate) { return __ZC(508, 49, this, arguments, new.target); }
function tzwConifer(P, list, o) { return __ZC(508, 50, this, arguments, new.target); }
function tzwBirch(P, list) { return __ZC(508, 51, this, arguments, new.target); }
function tzwPeak(P, x, z, r, h, o) { return __ZC(508, 52, this, arguments, new.target); }
function tzwBoat(P, x, y, z, ry, o) { return __ZC(508, 53, this, arguments, new.target); }
var TZW_UP = new THREE.Vector3(0, 1, 0), TZW_V1 = new THREE.Vector3(), TZW_V2 = new THREE.Vector3();
function tzwStick(m, a, b) { TZW_V1.set(b.x - a.x, b.y - a.y, b.z - a.z); var L = TZW_V1.length() || 0.001; m.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); m.quaternion.setFromUnitVectors(TZW_UP, TZW_V1.multiplyScalar(1 / L)); m.scale.set(1, L, 1); return m; }
function tzwVilla(P, x, z, o) { return __ZC(508, 54, this, arguments, new.target); }
function tzwVillaDoor(x, z, o) { o = o || {}; var w = o.w || 9, d = o.d || 8, ry = o.ry || 0, lx = w * 0.25, lz = d / 2 + 1.6; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function tzwShops(P, x, z, n, o) { return __ZC(508, 55, this, arguments, new.target); }
function tzwShopDoor(x, z, n, i, o) { o = o || {}; var sw = o.sw || 6, d = o.d || 9, ry = o.ry || 0, lx = -((n - 1) * sw) / 2 + i * sw + sw / 2 - 0.9, lz = d / 2 + 1.2; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function tzwRailway(P, pts, hfn) { return __ZC(508, 56, this, arguments, new.target); }
function tzwStation(P, x, z, len, name, o) { return __ZC(508, 57, this, arguments, new.target); }
function tzwSignal(P, x, z, hfn) { var g = new THREE.Group(); g.position.set(x, hfn(x, z), z); P.add(g); tzwCyl(g, 0.1, 0.14, 7, tzwLam(0xE8E4D8), 0, 0, 0, 8); var arm = tzwBox(g, 1.4, 0.24, 0.06, tzwLam(0xB82A22), 0.7, 6, 0.1); arm.rotation.z = -0.5; return g; }
function tzwBridge(P, x, z, len, w, y, o) { return __ZC(508, 58, this, arguments, new.target); }
function tzwLamp(P, x, z, hfn, o) { return __ZC(508, 59, this, arguments, new.target); }
function tzwPoles(P, pts, hfn, gap) { return __ZC(508, 60, this, arguments, new.target); }
function tzwPaling(P, pts, hfn, o) { return __ZC(508, 61, this, arguments, new.target); }
function tzwScorch(P, x, z, r, hfn, fires) { return __ZC(508, 62, this, arguments, new.target); }
function tzwDeadTrees(P, list) { return __ZC(508, 63, this, arguments, new.target); }
function tzwCart(P, x, z, ry, o) { return __ZC(508, 64, this, arguments, new.target); }
function tzwFar(P, hfn, col, o) { return __ZC(508, 65, this, arguments, new.target); }
function tzwPathAt(pts, s) { return __ZC(508, 66, this, arguments, new.target); }
function tzwPathLen(pts) { var L = 0; for (var i = 1; i < pts.length; i++)
L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function tzwStream(P, pts, hfn, o) { return __ZC(508, 67, this, arguments, new.target); }
var TZF = {};
function tzfAll() { (TZW.rooms || []).forEach(function (R) { var f = TZF[R.key]; if (f && R.g && !R.g.userData.furn) {
R.g.userData.furn = 1;
try {
f(R.g, R, tzwLite());
}
catch (e) {
if (window.console)
console.warn("[tarzan] furnish " + R.key, e);
}
} }); }
function tzfLantern(P, x, y, z, o) { return __ZC(508, 68, this, arguments, new.target); }
function tzfBasket(P, x, z, s, col) { s = s || 1; var m = tzwCyl(P, 0.22 * s, 0.17 * s, 0.3 * s, tzwLam(col || 0xB8945A), x, 0, z, 10); tzwCyl(P, 0.225 * s, 0.225 * s, 0.03 * s, tzwLam(0x8A6A3A), x, 0.29 * s, z, 10); return m; }
function tzfGourd(P, x, y, z, s) { return __ZC(508, 69, this, arguments, new.target); }
function tzfMat(P, x, z, w, d, col, ry) { var m = tzwBox(P, w, 0.03, d, tzwLam(col || 0xC8B070), x, 0, z, ry || 0); for (var i = 0; i < 4; i++)
tzwBox(P, w * 0.98, 0.032, 0.03, tzwLam(0x8A6A3A), x, 0, z - d / 2 + d * (i + 0.5) / 4, ry || 0); return m; }
function tzfStool(P, x, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var wd = tzwMat(o.mat || "darkoak");
tzwCyl(g, 0.24, 0.2, 0.08, wd, 0, o.h || 0.36, 0, 10);
tzwCyl(g, 0.08, 0.14, o.h || 0.36, wd, 0, 0, 0, 8);
tzwCyl(g, 0.2, 0.22, 0.06, wd, 0, 0, 0, 10);
return g;
}
function tzfShield(P, x, y, z, ry, col) { return __ZC(508, 70, this, arguments, new.target); }
function tzfTusk(P, x, z, ry) { var m = new THREE.Mesh(tzwGeo("tzTusk", function () { var c = new THREE.TorusGeometry(0.9, 0.06, 6, 12, Math.PI * 0.45); return c; }), tzwLam(0xF0E6CC)); m.position.set(x, 0.06, z); m.rotation.set(-Math.PI / 2, 0, ry || 0); P.add(m); return m; }
function tzfHang(P, x, y, z, n, col, len) { for (var i = 0; i < n; i++) {
tzwCyl(P, 0.01, 0.01, 0.3, tzwLam(0x6A5A3A), x + i * 0.18, y, z, 4);
tzwBox(P, 0.08, len || 0.3, 0.05, tzwLam(col || 0x8A5A2A), x + i * 0.18, y - (len || 0.3), z);
} }
function tzfWood(P, x, z, ry, n) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
n = n || 9;
for (var i = 0; i < n; i++) {
var l = tzwCyl(g, 0.07, 0.07, 0.9, tzwMat("bark"), 0, 0, 0, 6);
l.rotation.z = Math.PI / 2;
l.position.set(0, 0.08 + Math.floor(i / 4) * 0.13, -0.24 + (i % 4) * 0.16 + (Math.floor(i / 4) % 2) * 0.08);
}
return g;
}
function tzfBucket(P, x, z) { tzwCyl(P, 0.17, 0.14, 0.32, tzwMat("oak"), x, 0, z, 10); tzwCyl(P, 0.172, 0.172, 0.03, tzwLam(0x2A2A2A), x, 0.06, z, 10); tzwCyl(P, 0.172, 0.172, 0.03, tzwLam(0x2A2A2A), x, 0.25, z, 10); }
function tzfPegs(P, x, y, z, ry, items) { return __ZC(508, 71, this, arguments, new.target); }
function tzfPlates(P, x, y, z, n, spread) { for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
tzwCyl(P, 0.13, 0.11, 0.02, tzwLam(0xF4F2EA), x + Math.cos(a) * spread[0], y, z + Math.sin(a) * spread[1], 12);
tzwCyl(P, 0.035, 0.03, 0.12, tzwShine(0xD8E4E8, 0.1, 0.1), x + Math.cos(a) * spread[0] * 0.7, y, z + Math.sin(a) * spread[1] * 0.7, 8);
} }
function tzfBottle(P, x, y, z, col) { tzwCyl(P, 0.05, 0.05, 0.2, tzwShine(col || 0x2A4A2A, 0.15, 0.1), x, y, z, 8); tzwCyl(P, 0.018, 0.03, 0.08, tzwShine(col || 0x2A4A2A, 0.15, 0.1), x, y + 0.2, z, 6); }
function tzfClock(P, x, y, z, ry) { return __ZC(508, 72, this, arguments, new.target); }
function tzfStove(P, x, z, ry) { return __ZC(508, 73, this, arguments, new.target); }
function tzfSofa(P, x, z, ry, col) { return __ZC(508, 74, this, arguments, new.target); }
function tzfLampTable(P, x, z, o) { return __ZC(508, 75, this, arguments, new.target); }
function tzfDresser(P, x, z, ry, o) { return __ZC(508, 76, this, arguments, new.target); }
function tzfPlant(P, x, z, s) { s = s || 1; tzwPot(P, x, 0, z, 0.32 * s); for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, l = tzwBox(P, 0.07 * s, 0.5 * s, 0.02, tzwLam(0x3A6A2A, { ds: 1 }), x + Math.cos(a) * 0.08 * s, 0.28 * s, z + Math.sin(a) * 0.08 * s, a);
l.rotation.z = 0.5;
} }
function tzfHammock(P, x, y, z, len, ry) { var m = new THREE.Mesh(tzwGeo("tzHamk" + len, function () { var c = new THREE.CylinderGeometry(0.4, 0.4, len, 10, 1, true, Math.PI * 0.7, Math.PI * 0.6); c.rotateZ(Math.PI / 2); return c; }), tzwLam(0xD8CCAA, { ds: 1 })); m.position.set(x, y, z); m.rotation.y = ry || 0; P.add(m); return m; }
function tzfCoil(P, x, z) { var m = new THREE.Mesh(tzwGeo("tzCoil", function () { return new THREE.TorusGeometry(0.28, 0.07, 6, 16); }), tzwLam(0xB8A070)); m.rotation.x = Math.PI / 2; m.position.set(x, 0.07, z); P.add(m); var m2 = m.clone(); m2.position.y = 0.18; m2.scale.setScalar(0.8); P.add(m2); }
function tzfChart(P, x, y, z, w, d) { tzwBox(P, w, 0.005, d, tzwLam(0xE8DCB8), x, y, z); tzwBox(P, w * 0.6, 0.006, 0.01, tzwLam(0x3A5A8A), x, y, z - d * 0.1); tzwBox(P, 0.01, 0.006, d * 0.5, tzwLam(0x3A5A8A), x + w * 0.1, y, z); }
function tzfDrums(P, x, z) { [[0, 0, 0.9], [0.55, 0.2, 0.6], [-0.4, 0.3, 0.5]].forEach(function (q) { var g = new THREE.Group(); g.position.set(x + q[0], 0, z + q[1]); P.add(g); tzwCyl(g, 0.2 * q[2] + 0.08, 0.15 * q[2] + 0.06, 0.8 * q[2], tzwMat("darkoak"), 0, 0, 0, 12); tzwCyl(g, 0.2 * q[2] + 0.085, 0.2 * q[2] + 0.085, 0.02, tzwLam(0xD8C8A0), 0, 0.8 * q[2], 0, 12); }); }
function tzfCurtain(P, x, y, z, ry, w, h, col) { var m = tzwBox(P, w, h, 0.03, tzwLam(col || 0x8A2A2A, { ds: 1 }), x, y, z, ry || 0); return m; }
function tzfTimetable(P, x, y, z, ry) { return __ZC(508, 77, this, arguments, new.target); }
TZF.cabin = function (g, R, lite) { return __ZC(508, 78, this, arguments, new.target); };
TZF.mbonga = function (g, R, lite) { return __ZC(508, 79, this, arguments, new.target); };
TZF.hut = function (g, R, lite) { return __ZC(508, 80, this, arguments, new.target); };
TZF.cook = function (g, R, lite) { return __ZC(508, 81, this, arguments, new.target); };
TZF.wardroom = function (g, R, lite) { return __ZC(508, 82, this, arguments, new.target); };
TZF.arrowcabin = function (g, R, lite) {
tzfLantern(g, 0, 2.5, 0, { hang: 0.5 });
tzfChart(g, 0, 0.77, 0, 1.4, 0.8);
tzfBottle(g, 0.8, 0.76, -0.2, 0x6A4A1A);
tzwBed(g, 2.6, 0.4, Math.PI / 2, { cover: 0x6A5A4A, mat: "darkoak" });
tzwChest(g, 2.6, -1.8, 0, { y: 0, w: 1.0, h: 0.5, d: 0.5 });
tzfPegs(g, -1.6, 1.9, -2.44, 0, ["coat", "rope"]);
tzfClock(g, 1.4, 1.9, -2.44, 0);
};
TZF.mission = function (g, R, lite) { return __ZC(508, 83, this, arguments, new.target); };
TZF.stateroom = function (g, R, lite) {
tzfLantern(g, 0, 1.9, 0, { hang: 0.3, brass: 1 });
tzfPegs(g, 0.4, 1.6, 2.44, Math.PI, ["coat", "hat"]);
tzwRug(g, 0, 0.3, 2.0, 1.2, 0x6A2A2A);
tzwBox(g, 0.3, 0.04, 0.22, tzwLam(0x3A2A5A), 1.0, 0.74, -1.0);
tzfBottle(g, 1.5, 0.74, -1.2, 0x8AA8B8);
if (!lite)
tzwBox(g, 0.5, 0.35, 0.35, tzwLam(0x6A4A2A), -0.6, 0, -2.0);
};
TZF.captcab = function (g, R, lite) { return __ZC(508, 84, this, arguments, new.target); };
TZF.fo = function (g, R, lite) {
tzfLantern(g, 0, 1.8, 0.2, { hang: 0.4 });
tzfCoil(g, -1.8, 1.9);
tzfCoil(g, 1.8, 1.9);
tzfPegs(g, 0, 1.5, 2.94, Math.PI, ["coat", "bag", "coat", "rope"]);
for (var c = 0; c < 3; c++)
tzwBox(g, 0.16, 0.1, 0.22, tzwLam([0x2A2A2A, 0x8A2A1A, 0x2A4A6A][c]), -0.4 + c * 0.4, 0.7, 0.2);
tzfBottle(g, 0.5, 0.7, 0.0, 0x3A2A1A);
};
TZF.parlour = function (g, R, lite) { return __ZC(508, 85, this, arguments, new.target); };
TZF.kitchen = function (g, R, lite) { return __ZC(508, 86, this, arguments, new.target); };
TZF.depot = function (g, R, lite) { return __ZC(508, 87, this, arguments, new.target); };
TZF.inn = function (g, R, lite) { return __ZC(508, 88, this, arguments, new.target); };
function tzfExtraRooms(sc, G) { return __ZC(508, 89, this, arguments, new.target); }
TZF.hotel = function (g, R, lite) { return __ZC(508, 90, this, arguments, new.target); };
TZF.church = function (g, R, lite) { return __ZC(508, 91, this, arguments, new.target); };
TZF.barn = function (g, R, lite) { return __ZC(508, 92, this, arguments, new.target); };
function tzwCrxKinds() { return __ZC(508, 93, this, arguments, new.target); }
function tzwHorse(P, x, y, z, ry, o) { return __ZC(508, 94, this, arguments, new.target); }
function tzwPartG(list, geo, x, y, z, rx, ry, rz, sx, sy, sz) { geo = geo.index ? geo.toNonIndexed() : geo; geo.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)), new THREE.Vector3(sx || 1, sy || 1, sz || 1))); list.push(geo); }
function tzwBeastGeo(cow) { return __ZC(508, 95, this, arguments, new.target); }
function tzwPlainBeast(P, x, y, z, ry, o) { return __ZC(508, 96, this, arguments, new.target); }
function tzwStandIn(P, x, y, z, ry, o) { return __ZC(508, 97, this, arguments, new.target); }
function tzwApeGeo() { return __ZC(508, 98, this, arguments, new.target); }
function tzwPlainApe(P, x, y, z, ry, o) { return __ZC(508, 99, this, arguments, new.target); }
function tzwCatGeo(mane) { return __ZC(508, 100, this, arguments, new.target); }
function tzwPlainCat(P, x, y, z, ry, o) { return __ZC(508, 101, this, arguments, new.target); }
function tzwElephantGeo() { return __ZC(508, 102, this, arguments, new.target); }
function tzwPlainElephant(P, x, y, z, ry, o) {
var g = new THREE.Group(), G = tzwElephantGeo();
g.add(new THREE.Mesh(G.hide, tzwLam(0x7A7470)));
g.add(new THREE.Mesh(G.tusk, tzwLam(0xEAE2CC)));
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
}
function tzwBeast(P, kind, x, y, z, ry, o) { o = Object.assign({}, o || {}, { kind: kind }); return tzwHorse(P, x, y, z, ry, o); }
function tzjLimb(list, a, b, r0, r1, seg) { return __ZC(508, 103, this, arguments, new.target); }
function tzjClump(list, r, x, y, z, seed, flat, det) { return __ZC(508, 104, this, arguments, new.target); }
function tzjLiana(list, a, b, sag, r, seed) { return __ZC(508, 105, this, arguments, new.target); }
function tzjTreeGeo(k, v) { return __ZC(508, 106, this, arguments, new.target); }
function tzjPalmGeo() { return __ZC(508, 107, this, arguments, new.target); }
function tzjBananaTex() { return __ZC(508, 108, this, arguments, new.target); }
function tzjBananaGeo() { return __ZC(508, 109, this, arguments, new.target); }
function tzjFloorGeo() { return __ZC(508, 110, this, arguments, new.target); }
function tzjFernGeo() { return tzwGeo("tzjLowFern", function () { return tzwFronds(tzwLite() ? 7 : 11, 1.3, 0.55, 0.55, 0.05, 1.25); }); }
function tzjMats() { return __ZC(508, 111, this, arguments, new.target); }
function tzjChunks(list, cell) { var C = {}; list.forEach(function (t) { var k = Math.floor(t.x / cell) + "," + Math.floor(t.z / cell); (C[k] || (C[k] = [])).push(t); }); return Object.keys(C).map(function (k) { var L = C[k]; L.cx = (Math.floor(L[0].x / cell) + 0.5) * cell; L.cz = (Math.floor(L[0].z / cell) + 0.5) * cell; L.cell = cell; return L; }); }
function tzjFar(m, c) { if (!m)
return m; m.userData.cx = c.cx; m.userData.cz = c.cz; m.userData.cr = c.cell * 0.75; (TZW.far || (TZW.far = [])).push(m); return m; }
function tzjFarTick(L) {
var far = TZW.far;
if (!far || !far.length)
return;
var see = tzwLite() ? 200 : 330;
if (TZW.inRm) {
far.forEach(function (m) { m.visible = false; });
return;
}
for (var i = 0; i < far.length; i++) {
var m = far[i], d = Math.hypot(m.userData.cx - L.x, m.userData.cz - L.z) - m.userData.cr;
m.visible = d < see;
}
}
function tzjPlant(P, kind, list, o) { if (!list || !list.length)
return; tzjChunks(list, o && o.cell || 240).forEach(function (c) { var n0 = P.children.length; tzwPlant(P, kind, c, Object.assign({ keepAll: true }, o || {})); for (var k = n0; k < P.children.length; k++)
tzjFar(P.children[k], c); }); }
function tzjPlace(P, kind, list, o) { return __ZC(508, 112, this, arguments, new.target); }
function tzjShrubGeo(v) { return __ZC(508, 113, this, arguments, new.target); }
function tzjNearInit(P, ok, H) { return __ZC(508, 114, this, arguments, new.target); }
function tzjNearTick(L) { return __ZC(508, 115, this, arguments, new.target); }
var TZW_CO = { harb: [-428, 44], cabin: [-338, 14], amph: [20, -80], hole: [230, -150], vil: [450, -262], sea: -500 };
function tzwCoastX(z) { return TZW_CO.sea + 26 * Math.sin(z / 170) + 10 * Math.sin(z / 53 + 1.3); }
var TZW_RIVER = [[920, -600], [760, -500], [600, -430], [470, -372], [330, -340], [180, -318], [20, -300], [-160, -286], [-320, -272], [-440, -262], [-560, -256], [-760, -250]];
function tzwRiverY(x) { return -0.55 + Math.max(0, x + 470) * 0.012; }
function tzwRiverW(x) { return x < -460 ? 44 : 30; }
var TZW_CO_PATHS = {
cabin: [[-374, 30], [-358, 22], [-346, 16]],
amph: [[-322, 6], [-290, -2], [-220, -20], [-140, -44], [-60, -66], [0, -78]],
hole: [[40, -82], [120, -110], [190, -140], [226, -150]],
trail: [[236, -156], [300, -196], [360, -206], [420, -196], [450, -194]],
shore: [[-462, -236], [-466, -120], [-456, -20], [-390, 90], [-458, 200], [-470, 380]]
};
var TZW_TOPWAY = [[-304, -4, 3], [-294, -9, 9], [-282, -13, 15], [-262, -18, 16], [-258, -24, 16], [-226, -30, 17], [-196, -44, 16], [-164, -52, 17], [-130, -60, 16], [-98, -74, 17], [-66, -82, 16], [-40, -92, 15], [-22, -98, 9], [-12, -100, 3]];
function tzwCoH(x, z) { return __ZC(508, 116, this, arguments, new.target); }
function tzwAmphY() { return TZW.amphY != null ? TZW.amphY : (TZW.amphY = 1.4 + (TZW_CO.amph[0] - tzwCoastX(TZW_CO.amph[1]) - 40) * 0.028 + 3.5); }
function tzwHoleY() { return 1.4 + (TZW_CO.hole[0] - tzwCoastX(TZW_CO.hole[1]) - 40) * 0.028 + 2; }
function tzwVilY() { return tzwRiverY(TZW_CO.vil[0]) + 3.2; }
var TZW_CO_STREAM = [[-236, 62], [-270, 48], [-300, 40], [-318, 36], [-336, 38], [-360, 42], [-384, 46], [-404, 48]];
TZW_ROOMXZ.coast = { cabin: [-760, 840], mbonga: [-720, 840], hut: [-685, 840], cook: [-650, 840], wardroom: [-610, 840], arrowcabin: [-570, 840], mission: [-530, 840], hotel: [-490, 840], church: [-450, 840] };
Object.assign(TZW_AT, {
beach: { sc: "coast", x: -372, z: 34, name: "the beach of the little harbour", ry: -Math.PI / 2 },
landing: { sc: "coast", x: -380, z: 4, name: "the landing place on the beach" },
harbour: { sc: "coast", x: -420, z: 50, name: "the little landlocked harbour" },
cabin: { sc: "coast", x: -356, z: 16, name: "the cabin above the beach", ry: -Math.PI / 2 },
clearing: { sc: "coast", x: -326, z: 2, name: "the clearing round the cabin" },
jungle: { sc: "coast", x: -296, z: -6, name: "the edge of the jungle" },
forest: { sc: "coast", x: -180, z: -30, name: "the jungle" },
topway: { sc: "coast", x: -304, z: -4, name: "the foot of the apes' road through the trees" },
treetop: { sc: "coast", x: -226, z: -30, name: "the tree-top way, high in the middle terrace" },
amph: { sc: "coast", x: 20, z: -80, name: "the amphitheatre of the apes" },
drum: { sc: "coast", x: 20, z: -80, name: "the earthen drum" },
hole: { sc: "coast", x: 214, z: -150, name: "the water-hole" },
trail: { sc: "coast", x: 330, z: -270, name: "the elephant trail" },
river: { sc: "coast", x: 240, z: -300, name: "the river" },
rivermouth: { sc: "coast", x: -470, z: -230, name: "the river's mouth" },
village: { sc: "coast", x: 450, z: -194, name: "Mbonga's village", ry: 0 },
vilgate: { sc: "coast", x: 450, z: -206, name: "the gate of Mbonga's village", ry: 0 },
vilmid: { sc: "coast", x: 450, z: -262, name: "the middle of Mbonga's village" },
vilbank: { sc: "coast", x: 450, z: -336, name: "the river bank below the village" },
fields: { sc: "coast", x: 524, z: -226, name: "the village fields" },
rocks: { sc: "coast", x: -500, z: 28, name: "the rocks at the harbour mouth" },
graves: { sc: "coast", x: -342, z: 3, name: "the graves beside the cabin", ry: Math.PI },
mission: { sc: "coast", x: -410, z: -700, name: "the French mission" }, missiongate: { sc: "coast", x: -376, z: -700, name: "the gate of the mission" }, missionfield: { sc: "coast", x: -350, z: -700, name: "the mission's field" },
port: { sc: "coast", x: -440, z: -842, name: "the little port at the river's mouth" }, hotel: { sc: "coast", x: -440, z: -834, name: "the hotel veranda" },
stream: { sc: "coast", x: -322, z: 39, name: "the stream below the clearing" }
});
function tzwCoRooms(G) { return __ZC(508, 117, this, arguments, new.target); }
var TZW_MISSION = [-410, -700], TZW_PORT = [-452, -842];
function tzwPort(G, H) { return __ZC(508, 118, this, arguments, new.target); }
function tzwMission(G, H) { return __ZC(508, 119, this, arguments, new.target); }
function tzwBookshelf() { return __ZC(508, 120, this, arguments, new.target); }
function tzwPot(P, x, y, z, s) { return __ZC(508, 121, this, arguments, new.target); }
function tzwMortar(P, x, z) { var g = new THREE.Group(); g.position.set(x, P === TZW.scG ? 0 : 0, z); P.add(g); tzwCyl(g, 0.32, 0.26, 0.7, tzwMat("darkoak"), 0, 0, 0, 12); var ps = tzwCyl(g, 0.05, 0.05, 1.7, tzwMat("oak"), 0.05, 0.5, 0, 6); ps.rotation.z = 0.08; return g; }
function tzwSpearRack(P, x, z, ry) { return __ZC(508, 122, this, arguments, new.target); }
function tzwRoundHut(P, x, z, r, o) { return __ZC(508, 123, this, arguments, new.target); }
function tzwGranary(P, x, z) { return __ZC(508, 124, this, arguments, new.target); }
function tzwCanoe(P, x, y, z, ry, len) { return __ZC(508, 125, this, arguments, new.target); }
function tzwRack(P, x, z, ry, what) { return __ZC(508, 126, this, arguments, new.target); }
function tzwDrum(P, x, y, z) { return __ZC(508, 127, this, arguments, new.target); }
function tzwLog(P, x, z, ry, len) { var y = tzwLand(x, z), m = new THREE.Mesh(tzwGeo("tzLog", function () { var c = new THREE.CylinderGeometry(0.42, 0.5, 1, 9, 3); c.rotateZ(Math.PI / 2); return c; }), tzwMat("mossbark")); m.scale.x = len || 6; m.position.set(x, y + 0.3, z); m.rotation.y = ry || 0; P.add(m); return m; }
function tzwChest(P, x, z, ry, o) { return __ZC(508, 128, this, arguments, new.target); }
function tzwCoast(G) { return __ZC(508, 129, this, arguments, new.target); }
var TZW_BLUFF = { z: -112, in: 22 }, TZW_FCAMP = [330, -60];
function tzwNest(G, H) { return __ZC(508, 130, this, arguments, new.target); }
function tzwNestY() { return TZW.nestY != null ? TZW.nestY : tzwCoH(TZW_CO.cabin[0] + 8, TZW_CO.cabin[1] - 20) + 3.05; }
Object.assign(TZW_AT, { nest: { sc: "coast", x: TZW_CO.cabin[0] + 8, z: TZW_CO.cabin[1] - 20, name: "the nest in the trees" }, nestfoot: { sc: "coast", x: TZW_CO.cabin[0] + 12, z: TZW_CO.cabin[1] - 20, name: "the foot of the ladder to the nest" } });
function tzwUnderCanopy(x, z) {
var C = TZW_CO;
if (x - tzwCoastX(z) < 130)
return false;
if (Math.hypot(x - C.cabin[0], z - C.cabin[1]) < 40 || Math.hypot(x - C.amph[0], z - C.amph[1]) < 26 || Math.hypot(x - C.hole[0], z - C.hole[1]) < 26 || Math.hypot(x - C.vil[0], z - C.vil[1]) < 125)
return false;
return tzwPathD(x, z, TZW_RIVER) > tzwRiverW(x) / 2 + 24;
}
function tzwMangroves(P, list) { return __ZC(508, 131, this, arguments, new.target); }
function tzwTopWay(G, H) { return __ZC(508, 132, this, arguments, new.target); }
var TZW_PERCH = { x: 150, z: -126, h: 6.2, len: 16, a: 0 }, TZW_PERCH2 = { x: 506, z: -252, h: 7.4, len: 20, a: -Math.PI / 2 };
function tzwPerchY(P) { P = P || TZW_PERCH; return tzwCoH(P.x, P.z) + P.h; }
function tzwPerch(G, H, P) { return __ZC(508, 133, this, arguments, new.target); }
Object.assign(TZW_AT, { perchfoot: { sc: "coast", x: 150, z: -146, name: "the foot of the great tree by the trail" }, perchtrail: { sc: "coast", x: 150, z: -123, name: "the trail to the water, under the great branch" },
vilfoot: { sc: "coast", x: 528, z: -252, name: "the foot of the great tree at the edge of the village" }, viltree: { sc: "coast", x: 500, z: -252, name: "beneath the great tree that leans over the village" } });
function tzwVillage(G, H) { return __ZC(508, 134, this, arguments, new.target); }
function tzwCruiser(P, x, z, ry) { return __ZC(508, 135, this, arguments, new.target); }
function tzwFlag(P, kind, w, h) { return __ZC(508, 136, this, arguments, new.target); }
function tzwSailShip(P, x, z, ry, o) { return __ZC(508, 137, this, arguments, new.target); }
function tzwCoFolk(G) { return __ZC(508, 138, this, arguments, new.target); }
function tzwCoBeasts(G) { return __ZC(508, 139, this, arguments, new.target); }
TZW_SCN.coast = { start: { x: -372, z: 34, ry: -Math.PI / 2 }, h: tzwCoH,
wl: function (x, z) { var inl = x - tzwCoastX(z); if (inl < -4)
return -1.0; if (Math.hypot(x - TZW_CO.harb[0], z - TZW_CO.harb[1]) < 49 || tzwPathD(x, z, [[TZW_CO.harb[0], TZW_CO.harb[1]], [TZW_CO.harb[0] - 110, TZW_CO.harb[1] + 6]]) < 12)
return -0.95; var rd = tzwPathD(x, z, TZW_RIVER); if (rd < tzwRiverW(x) / 2 - 2)
return tzwRiverY(x); return null; },
build: function (G) { TZW.amphY = null; tzwCoRooms(G); tzfExtraRooms("coast", G); tzfAll(); tzwCoast(G); tzwCoFolk(G); tzwCoBeasts(G); } };
var TZW_FU = { L: 38 };
TZW_ROOMXZ.fuwalda = { stateroom: [-300, 380], captcab: [-262, 380], fo: [-224, 380] };
Object.assign(TZW_AT, {
fudeck: { sc: "fuwalda", x: 0, z: 2, name: "the deck of the Fuwalda", ry: 0 },
fuwaist: { sc: "fuwalda", x: 1.6, z: -2, name: "the waist of the Fuwalda" },
fuquarter: { sc: "fuwalda", x: 0, z: -13.4, name: "the quarterdeck, by the wheel" },
fubow: { sc: "fuwalda", x: 0, z: 14, name: "the forecastle, at the bow" },
furail: { sc: "fuwalda", x: 3.6, z: 4, name: "the rail, looking over the sea" },
fuboat: { sc: "fuwalda", x: -2.4, z: 2.6, name: "the ship's boat in its chocks" }
});
function tzwFuH(x, z) { return -24; }
function tzwFuDeckY() { return TZW.fuDy != null ? TZW.fuDy : 4.97; }
function tzwFuwalda(G) { return __ZC(508, 140, this, arguments, new.target); }
function tzwFuRooms(G) { return __ZC(508, 141, this, arguments, new.target); }
function tzwFuFolk(G) { return __ZC(508, 142, this, arguments, new.target); }
TZW_SCN.fuwalda = { start: { x: 0, z: 2, ry: 0 }, h: tzwFuH, wl: function () { return 0; },
build: function (G) { tzwFuRooms(G); tzfAll(); tzwFuwalda(G); tzwFuFolk(G); } };
var TZW_WI = { house: [0, 0], barn: [34, -18], station: [-300, -240] };
var TZW_WI_ROADS = {
road: [[-300, -226], [-220, -200], [-140, -150], [-80, -90], [-40, -40], [-10, -6]],
lane: [[-10, -6], [6, -4], [30, -14]],
south: [[0, 12], [10, 80], [-20, 180], [0, 300], [40, 600]]
};
var TZW_WI_RAIL = [[-620, -262], [-300, -250], [0, -262], [620, -290]];
TZW_ROOMXZ.wisconsin = { parlour: [-500, 560], kitchen: [-460, 560], depot: [-420, 560], inn: [-380, 560], barn: [-340, 560] };
Object.assign(TZW_AT, {
wifarm: { sc: "wisconsin", x: -6, z: -10, name: "Jane Porter's farm", ry: Math.PI },
wiporch: { sc: "wisconsin", x: 0, z: 8.6, name: "the porch of the farmhouse", ry: 0 },
wibarn: { sc: "wisconsin", x: 34, z: -8, name: "the barn" },
wiwell: { sc: "wisconsin", x: 16, z: 4, name: "the well" },
wiorchard: { sc: "wisconsin", x: -40, z: 20, name: "the orchard" },
wiroad: { sc: "wisconsin", x: -120, z: -140, name: "the road through the woods" },
wistation: { sc: "wisconsin", x: -300, z: -232, name: "the railway station" },
wisouth: { sc: "wisconsin", x: -10, z: 160, name: "the road south, into the woods" },
wiwoods: { sc: "wisconsin", x: 120, z: 120, name: "the woods" },
wiinn: { sc: "wisconsin", x: -282, z: -216, name: "before the little hotel", ry: Math.PI }
});
function tzwWiH(x, z) { return __ZC(508, 143, this, arguments, new.target); }
function tzwWiRoadY(x, z, h) { return h; }
function tzwWisconsin(G) { return __ZC(508, 144, this, arguments, new.target); }
function tzwMotorCar(P, x, z, ry) { return __ZC(508, 145, this, arguments, new.target); }
function tzwWiRooms(G) { return __ZC(508, 146, this, arguments, new.target); }
function tzwWiFolk(G) { return __ZC(508, 147, this, arguments, new.target); }
TZW_SCN.wisconsin = { start: { x: -6, z: -10, ry: Math.PI }, h: tzwWiH,
build: function (G) { tzwWiRooms(G); tzfExtraRooms("wisconsin", G); tzfAll(); tzwWisconsin(G); tzwWiFolk(G); } };
function tzwBlaze(P, x, y, z, s) { return __ZC(508, 148, this, arguments, new.target); }
function tzwEnvNow() { return __ZC(508, 149, this, arguments, new.target); }
function tzwBlockL(x, z, feet) { return __ZC(508, 150, this, arguments, new.target); }
function tzwPlaceName(L) {
if (tzwInRoom()) {
var R = tzwRoomAt(L.x, L.z);
if (R)
return R.name;
}
var best = null, bd = 1e9;
for (var k in TZW_AT) {
var A = TZW_AT[k];
if (A.sc !== TZW.sc)
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A;
}
}
return best && bd < 70 ? best.name : tzwSc().name;
}
function tzwTick(dt) { return __ZC(508, 151, this, arguments, new.target); }
function tzwBuild(G) { TZW.G = G; TZW.lite = tzwLite(); TZW.built = true; }
if (typeof worldDef === "function")
worldDef(TZW_KEY, {
base: TZW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return tzwEnvNow(); },
build: function (G) { tzwBuild(G); },
enter: function (opt) { return __ZC(508, 152, this, arguments, new.target); },
leave: function () { TZW.ride = null; TZW.moving = false; if (TZW.veil)
TZW.veil.style.opacity = "0"; if (typeof tzbLeave === "function")
try {
tzbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = tzwSc(); TZW.inRm = tzwInRoom(); return tzwGround(x - S.x, z, feet); },
block: function (x, z, feet) { var S = tzwSc(); TZW.inRm = tzwInRoom(); return tzwBlockL(x - S.x, z, feet); },
tick: function (dt) { tzwTick(dt); },
back: function () { var D = TZW_SCN[TZW.sc]; tzwGo(D && D.start ? { sc: TZW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "beach"); }
});
function tzwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(TZW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(TZW_KEY) < 0)
WLG.keys.push(TZW_KEY);
if (typeof GLF !== "undefined" && GLF.skip)
GLF.skip[TZW_KEY] = 1;
function tzwForget() { return __ZC(508, 153, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === TZW_KEY)
tzwForget(); return r; }; })();
function tzwSnowfall(P, n, sp) { return __ZC(508, 154, this, arguments, new.target); }
var TZB_CH = [];
var TZB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var TZB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function tzbS() { if (!store.tzbook)
store.tzbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.tzbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function tzbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function tzbStep() { var S = tzbS(), C = TZB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function tzbActive() { var S = tzbS(); return !!(S.started && !S.done && WLD.on === TZW_KEY); }
function tzbKey() { var S = tzbS(); return S.done ? "done" : S.ch + "." + S.s; }
function tzbSay(h) { setStatus(h); }
function tzbQ(s) { return tzQ(s); }
function tzbQs() { return tzQs.apply(null, arguments); }
function tzbPos(at) { return __ZC(508, 155, this, arguments, new.target); }
function tzbScName(k) { return (TZW_SC[k] || {}).name || k; }
function tzbWay(P, L) { return __ZC(508, 156, this, arguments, new.target); }
function tzbBeam() { return __ZC(508, 157, this, arguments, new.target); }
function tzbItemMesh(kind) { return __ZC(508, 158, this, arguments, new.target); }
function tzbItemsClear() { TZB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = TZW.spots.indexOf(I.S); if (j >= 0)
TZW.spots.splice(j, 1); }); TZB.items = []; }
function tzbItemAdd(kind, P, name, verb, onTake) { return __ZC(508, 159, this, arguments, new.target); }
var TZB_TUNES = { danger: "assets/neverland/mountain-king.mp3", love: "assets/erebos/gymnopedie.mp3", home: "assets/oz/deserted-isle.mp3", jungle: "assets/oz/forest-of-gugu.mp3", sea: "assets/oz/storm-at-sea.mp3", study: "assets/lost-world/largo.mp3", dread: "assets/poe/funeral.mp3", night: "assets/erebos/gymnopedie.mp3", cottage: "assets/neverland/morning-mood.mp3", chase: "assets/neverland/mountain-king.mp3", end: "assets/erebos/gymnopedie.mp3", grief: "assets/poe/funeral.mp3", search: "assets/oz/search-party.mp3", fire: "assets/neverland/mountain-king.mp3" };
function tzbTune(k) { return __ZC(508, 160, this, arguments, new.target); }
function tzbText(fn) { return __ZC(508, 161, this, arguments, new.target); }
function tzbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function tzbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var TZB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>Edgar Rice Burroughs's own words (1912).</div>";
function tzbReadAll(i) { return __ZC(508, 162, this, arguments, new.target); }
function tzbChapterCard() { return __ZC(508, 163, this, arguments, new.target); }
function tzbKeeperBtns(fns) { return __ZC(508, 164, this, arguments, new.target); }
function tzbJump(i) { var S = tzbS(); S.ch = Math.max(0, Math.min(TZB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; tzbSave(); tzbChapterBegin(true); }
function tzbStV(v) { return typeof v === "function" ? v(tzbS().s) : v; }
function tzbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function tzbWorldState() {
var S = tzbS(), C = TZB_CH[S.ch] || {}, st = C.state || {};
TZW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
TZW.envK = tzbStV(st.env) || null;
if (typeof tzwStateApply === "function")
try {
tzwStateApply(st, S.s);
}
catch (e) { }
worldEnv(tzwEnvNow());
}
function tzbChapterBegin(place) { return __ZC(508, 165, this, arguments, new.target); }
function tzbStepBegin() { return __ZC(508, 166, this, arguments, new.target); }
function tzbPuzzleCard(b) { return __ZC(508, 167, this, arguments, new.target); }
function tzbStepDone() { return __ZC(508, 168, this, arguments, new.target); }
function tzbFinish() { return __ZC(508, 169, this, arguments, new.target); }
function tzbCastName(c) { return c.name || (TZW_FOLK[c.k] || {}).name || c.k; }
function tzbCastLive(C) { return !!(C && C.g && C.g.parent); }
function tzbCastAdd(c) { return __ZC(508, 170, this, arguments, new.target); }
function tzbCastHide(key) { var C = TZB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); TZW.talk = TZW.talk.filter(function (T) { return T.p !== C.P; }); TZW.people = TZW.people.filter(function (p) { return p !== C.P; }); delete TZB.cast[key]; }
function tzbCastClear() { for (var k in TZB.cast)
tzbCastHide(k); TZB.cast = {}; }
function tzbCastMove(key, at, ry) { var C = TZB.cast[key]; if (!C)
return; var P = tzbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : tzwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function tzbCastTick() { return __ZC(508, 171, this, arguments, new.target); }
function tzbPassTick() { return __ZC(508, 172, this, arguments, new.target); }
var TZB_FOLK_AT = {};
function tzbPopulate() { return __ZC(508, 173, this, arguments, new.target); }
function tzbCastHere(C) { return (C.cast || []).some(function (c) { var P = tzbPos(c.at); return P && P.sc === TZW.sc; }); }
function tzbChapterSc(C) { var P = C && C.start ? tzbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function tzbSceneDrop() { TZB.beam = null; TZB.items = []; TZB.cast = {}; }
function tzbHeard(kind) { TZB.rew[kind] = (TZB.rew[kind] || 0) + 1; }
function tzbNote(kind, title) { tzbHeard(kind); if (title)
tzbHeard("tale:" + title); }
function tzbTalk(T) { return __ZC(508, 174, this, arguments, new.target); }
function tzbSpot(S) { if (!tzbActive() || S.tzb)
return; var b = tzbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = tzbKey(); setTimeout(function () { if (tzbKey() === k)
tzbStepDone(); }, b.wait || 400); }
function tzbIdlePrompt() { worldPrompt("🌿 <b>Tarzan of the Apes</b> · <b>press E</b> for the book", tzbOpen); }
function tzbTick(dt, L) { return __ZC(508, 175, this, arguments, new.target); }
function tzbOpen() { return __ZC(508, 176, this, arguments, new.target); }
function tzbBegin() { var S = tzbS(); S.started = 1; tzbSave(); if (WLD.on !== TZW_KEY) {
tzwEnter({});
return;
} tzbChapterBegin(true); }
function tzbStartAt() { var S = tzbS(); if (S.started && !S.done) {
var C = TZB_CH[S.ch], P = C && C.start ? tzbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function tzbEnter(opt) { var S = tzbS(); setTimeout(function () { if (WLD.on !== TZW_KEY)
return; if (S.started && !S.done)
tzbChapterBegin(false);
else {
tzbWorldState();
tzbPopulate();
if (!S.started)
tzbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function tzbLeave() { tzbTune(null); tzbItemsClear(); TZB.cast = {}; TZB.beam = null; TZW.bannerBook = false; }
function tzzGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function tzzTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function tzzSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function tzzRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function tzzFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function tzzGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function tzzHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function tzzUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function tzzPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function tzzRead(title, html, btn, o) { return tzzPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function tzzReadA(title, adult, young, btn, o) { var r = tzzRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = tzbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function tzzMove(at, msg) { return function () { tzwGo(at, msg || null, tzbPopulate); }; }
function tzbNum(i) { return "Chapter " + (i + 1); }
function tzbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function tzbCh(C) { return __ZC(508, 177, this, arguments, new.target); }
function tzbStepAt(id) { var C = TZB_CH[tzbS().ch]; return C ? tzbS().s >= tzbIdx(C, id) : false; }
function tzzId(id, step) { step.id = id; return step; }
var TZW_LIVEK = ["voice"];
function tzwStateApply(st, s) { return __ZC(508, 178, this, arguments, new.target); }
function tzwRebuild() { var k = TZW.scBuilt; if (!k)
return; var L = tzwLocalSc(), y = camera.position.y; TZW.scBuilt = null; tzwScene(k); var S = tzwSc(); camera.position.set(TZW.base + S.x + L.x, y, L.z); }
function tzwLiveState() { if (TZW.live)
try {
TZW.live(TZW.st);
}
catch (e) { } }
(function () { var s0 = tzwScene; tzwScene = function (k) { var was = TZW.scBuilt; s0.apply(this, arguments); if (was !== TZW.scBuilt && typeof tzbWorldState === "function" && !TZW.rebuilding)
try {
tzbWorldState();
}
catch (e) { } }; })();
function tzc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
function tzBk(ch) { return "Chapter " + (ch + 1); }
function tzCo(x, z, y) { return { sc: "coast", x: x, z: z, y: y }; }
function tzFu(x, z, y) { return { sc: "fuwalda", x: x, z: z, y: y }; }
function tzWi(x, z, y) { return { sc: "wisconsin", x: x, z: z, y: y }; }
function tzA(n, dx, dz) { var A = TZW_AT[n]; return { sc: A.sc, x: A.x + (dx || 0), z: A.z + (dz || 0), y: A.y }; }
function tzR(k, lx, lz) { var sc = null; for (var s in TZW_ROOMXZ) {
if (TZW_ROOMXZ[s][k]) {
sc = s;
break;
}
} return tzwIn(sc || "coast", k, lx, lz); }
function tzzTravel(title, html, at, msg, btn, o) { return tzzRead(title, html, btn || "▶ Go", Object.assign({ done: function () { var A = typeof at === "function" ? at() : at; if (A && typeof at === "function" && A.ry == null)
A.ry = Math.PI; tzwGo(A, msg || null, function () { tzbPopulate(); tzbStepBegin(); }); } }, o || {})); }
function tzzSay(who, h, title, lines, src, o) { return tzzTalk(who, h, [title, tzbQs.apply(null, lines) + tzSrc(src), "▶ Go on"], o); }
function tzwCalm(st, keys) { st = st || {}; for (var i = 0; i < keys.length; i++)
if (st[keys[i]])
return false; return true; }
function tzRy(k, lx, lz, dy) { var f = tzR(k, lx, lz); return function () { var p = f(); if (p)
p.y = (p.y || 0) + dy; return p; }; }
function tzTop(i) { return function () { var p = TZW_TOPWAY[Math.max(0, Math.min(TZW_TOPWAY.length - 1, i))]; return { sc: "coast", x: p[0], z: p[1], y: tzwCoH(p[0], p[1]) + p[2] }; }; }
function tzOn(a, b, val) { return function () { var on = (a == null || tzbStepAt(a)) && (b == null || !tzbStepAt(b)); return on ? (val === undefined ? true : val) : (val === undefined ? false : null); }; }
function tzNest(dx, dz) { return function () { return { sc: "coast", x: TZW_CO.cabin[0] + 8 + (dx || 0), z: TZW_CO.cabin[1] - 20 + (dz || 0), y: tzwNestY() }; }; }
function tzDeck(x, z) { return function () { return { sc: "fuwalda", x: x, z: z, y: tzwFuDeckY() }; }; }
function tzPerch(d, P) { return function () { P = P || TZW_PERCH; return { sc: "coast", x: P.x + Math.sin(P.a) * (d || 0), z: P.z + Math.cos(P.a) * (d || 0), y: tzwPerchY(P) }; }; }
function tzPerch2(d) { return tzPerch(d, TZW_PERCH2); }
tzbCh({ t: "Out to Sea", txt: 0, start: { sc: "fuwalda", x: 3.0, z: 4, ry: -Math.PI / 2 }, jump: 1, tune: "sea", keep: ["fuwalda", "A brass button off the Fuwalda", "⚓"],
state: { env: "sea", warship: tzOn("ship", "shipgone") },
words: "May 1888. John Clayton, Lord Greystoke, and Lady Alice, three months married, have sailed from Dover to Freetown and there chartered a little barkentine to bear them down the coast. You are the only other passenger aboard.",
intro: "The deck of the Fuwalda",
cast: [
tzc("clayton", tzDeck(3.2, 5.4), { ry: -Math.PI / 2, until: "warn" }),
tzc("clayton", tzDeck(3.0, 2.2), { key: "cl2", ry: Math.PI, from: "warn", until: "capt" }),
tzc("clayton", tzR("captcab", 0.4, 1.2), { key: "cl3", ry: Math.PI, from: "capt", until: "ransack" }),
tzc("clayton", tzR("stateroom", -0.6, 0.6), { key: "cl4", ry: 0, from: "ransack" }),
tzc("alice", tzDeck(3.2, 6.4), { ry: -Math.PI / 2, until: "ransack" }),
tzc("alice", tzR("stateroom", 0.8, 0.4), { key: "al2", ry: -Math.PI / 2, from: "ransack" }),
tzc("captain", tzDeck(2.0, 4.8), { ry: Math.PI / 2, until: "aft" }),
tzc("captain", tzA("fuquarter", 0, 1.2), { key: "ca2", ry: Math.PI, from: "aft", until: "capt" }),
tzc("captain", tzR("captcab", 0, -1.2), { key: "ca3", ry: 0, from: "capt", until: "ransack" }),
tzc("sailor", tzDeck(1.0, 0.6), { key: "old", dress: "tzsailor", sex: "m", hair: 0xC8C0B0, beard: "short", scale: [0.9, 0.92, 0.9], name: "The little old sailor", persona: "sailor", greet: "Mind yer feet on the wet deck, sir.", until: "aft" }),
tzc("sailor", tzDeck(-2.6, -4), { key: "old2", dress: "tzsailor", sex: "m", hair: 0xC8C0B0, beard: "short", scale: [0.9, 0.92, 0.9], name: "The little old sailor", persona: "sailor", greet: "Can't stop, sir. Brasses.", from: "aft", until: "brasses" }),
tzc("sailor", tzDeck(2.6, 3.2), { key: "old3", dress: "tzsailor", sex: "m", hair: 0xC8C0B0, beard: "short", scale: [0.9, 0.92, 0.9], name: "The little old sailor", persona: "sailor", greet: "Keep a still tongue, sir.", from: "brasses", until: "warn" }),
tzc("michael", tzDeck(0.2, -0.6), { ry: Math.PI / 2, until: "limp" }),
tzc("michael", tzR("fo", 1.6, -1.2), { key: "mi2", ry: -Math.PI / 2, from: "limp", until: "fo2" }),
tzc("sailor", tzR("fo", -2.2, 1.4), { key: "f1", dress: "tzsailor", sex: "m", name: "A sailor in his bunk", persona: "sailor", greet: "What d'ye want in the fo'c'sle?" }),
tzc("sailor", tzR("fo", -1.0, -1.8), { key: "f2", dress: "tzsailor", sex: "m", hair: 0x8A5A2A, name: "A sailor mending a shirt", persona: "sailor", greet: "Mind yer head on the beams." }),
tzc("sailor", tzA("fubow", 1.4, 0), { key: "bw", dress: "tzsailor", sex: "m", hair: 0x3A2A1A, name: "The look-out", persona: "sailor", greet: "Sail to the west'ard, if ye care to look." }),
tzc("sailor", tzA("fuquarter", -1.2, -1.4), { key: "helm", dress: "tzmate", sex: "m", beard: "short", name: "The first mate", persona: "captain", greet: "Passengers keep to the lee side." }),
tzc("sailor", tzDeck(-2.8, 6.4), { key: "mt", dress: "tzsailor", sex: "m", hair: 0x5A3A2A, name: "A sullen sailor", persona: "sailor", greet: "...", from: "pin", until: "ship" }),
tzc("sailor", tzDeck(-3.2, 7.8), { key: "mt2", dress: "tzsailor", sex: "m", hair: 0x2A2420, name: "Another sullen sailor", persona: "sailor", greet: "...", from: "pin", until: "ship" })
],
steps: [
{ k: "read" },
tzzRead("📜 How the story came to be told", tzbQs("I had this story from one who had no business to tell it to me, or to any other.", "The yellow, mildewed pages of the diary of a man long dead, and the records of the Colonial Office dovetail perfectly with the narrative of my convivial host, and so I give you the story as I painstakingly pieced it out from these several various agencies.") + tzSrc(tzBk(0)), "▶ Begin"),
tzzGo(tzDeck(3.0, 4.6), "Come to the rail, where Lord and Lady Greystoke stand watching the low green coast slip by", { r: 2.5 }),
tzzSay("John Clayton, Lord Greystoke", "Speak to Lord Greystoke", "🎖️ The commission", ["And so the Colonial Office appointed John Clayton to a new post in British West Africa, but his confidential instructions centered on a thorough investigation of the unfair treatment of black British subjects by the officers of a friendly European power."], tzBk(0)),
tzzRead("👤 John Clayton", tzbQs("Clayton was the type of Englishman that one likes best to associate with the noblest monuments of historic achievement upon a thousand victorious battlefields--a strong, virile man--mentally, morally, and physically.", "In stature he was above the average height; his eyes were gray, his features regular and strong; his carriage that of perfect, robust health influenced by his years of army training.") + tzSrc(tzBk(0))),
tzzSay("Lady Alice Greystoke", "Speak to Lady Alice", "💍 Three months married", ["For her sake he would have refused the appointment, but she would not have it so. Instead she insisted that he accept, and, indeed, take her with him."], tzBk(0)),
tzzPuzzle("📅 The voyage", "Lady Alice tells you how they set out. When, and from where, did they sail?", ["From Liverpool, one winter's night", "From Dover, on a bright May morning in 1888", "From Plymouth, in the spring of 1890"], 1, ["No: think of the white cliffs.", "", "No."], { yes: "📅 " + tzbQ("We know only that on a bright May morning in 1888, John, Lord Greystoke, and Lady Alice sailed from Dover on their way to Africa.") }),
tzzRead("⚓ The Fuwalda", tzbQs("The Fuwalda, a barkentine of about one hundred tons, was a vessel of the type often seen in coastwise trade in the far southern Atlantic, their crews composed of the offscourings of the sea--unhanged murderers and cutthroats of every race and every nation.", "The Fuwalda was no exception to the rule. Her officers were swarthy bullies, hating and hated by their crew.") + tzSrc(tzBk(0))),
tzzPuzzle("🪵 The captain's arguments", "The captain is a competent seaman but a brute to his men. The book says he knew, or used, only two arguments with them. Which?", ["Kind words and an extra tot of rum", "A belaying pin and a revolver", "The lash and the irons"], 1, ["Hardly.", "", "Not quite: look at what he carries."], { yes: "🪵 " + tzbQ("He knew, or at least he used, but two arguments in his dealings with them--a belaying pin and a revolver") }),
tzzTalk("The captain of the Fuwalda", "The captain has stopped by the rail to speak with the Claytons: say good morning", ["🧭 The captain", tzbQs("It was on the morning of the second day that the first link was forged in what was destined to form a chain of circumstances ending in a life for one then unborn such as has never been paralleled in the history of man.") + tzSrc(tzBk(0)), "▶ Go on"]),
tzzHold(tzDeck(3.0, 4.6), 6, "Stand with them and watch two sailors washing down the decks, working backwards toward you with their pail", { r: 3 }),
tzzReadA("💥 The captain falls", tzbQs("But just that instant the officer turned to leave Lord and Lady Greystoke, and, as he did so, tripped against the sailor and sprawled headlong upon the deck, overturning the water-pail so that he was drenched in its dirty contents.", "For an instant the scene was ludicrous; but only for an instant. With a volley of awful oaths, his face suffused with the scarlet of mortification and rage, the captain regained his feet, and with a terrific blow felled the sailor to the deck.", "As he saw his mate go down he crouched, and, with a low snarl, sprang upon the captain crushing him to his knees with a single mighty blow.", "Without waiting to rise he whipped a revolver from his pocket, firing point blank at the great mountain of muscle towering before him; but, quick as he was, John Clayton was almost as quick") + tzSrc(tzBk(0)), "<p>The captain trips over the little old sailor and falls headlong into the dirty water. " + tzbQ("For an instant the scene was ludicrous; but only for an instant.") + " In his rage he knocks the old man down. The old man's mate, a huge sailor with black mustachios, knocks the captain to his knees; the captain pulls out a revolver, and Lord Greystoke strikes his arm down just as it fires.</p>" + tzSrc(tzBk(0))),
tzzPuzzle("🎯 Where did the shot go?", "The captain fired point blank at the big sailor's heart. Where did the bullet go?", ["Into the mast", "Into the sailor's leg, because Clayton struck down the captain's arm", "Over the side into the sea"], 1, ["No.", "", "No."], { yes: "🎯 " + tzbQ("so that the bullet which was intended for the sailor's heart lodged in the sailor's leg instead, for Lord Greystoke had struck down the captain's arm as he had seen the weapon flash in the sun.") }),
tzzSay("John Clayton, Lord Greystoke", "Lord Greystoke, white with anger", "⚖️ Words with the captain", ["Words passed between Clayton and the captain, the former making it plain that he was disgusted with the brutality displayed toward the crew, nor would he countenance anything further of the kind while he and Lady Greystoke remained passengers."], tzBk(0)),
tzzPuzzle("🌊 Why the captain gave way", "The captain was on the point of an angry reply, and then turned on his heel. What was he afraid of?", ["Clayton's fists", "England's far-reaching navy", "His own crew"], 1, ["Not that.", "", "Not yet."], { yes: "🌊 " + tzbQ("He did not care to antagonize an English official, for the Queen's mighty arm wielded a punitive instrument which he could appreciate, and which he feared--England's far-reaching navy.") }),
tzzId("aft", tzzTalk("Black Michael", "The big sailor is testing his wounded leg: speak to him", ["🦵 Black Michael", tzbQs("The two sailors picked themselves up, the older man assisting his wounded comrade to rise. The big fellow, who was known among his mates as Black Michael, tried his leg gingerly, and, finding that it bore his weight, turned to Clayton with a word of gruff thanks.") + "<p>\"Thank 'ee, sir. I'll not forget it.\" And he turns away before anyone can say more.</p>" + tzSrc(tzBk(0)), "▶ Go on"])),
tzzId("limp", tzzGo("fubow", "Follow him forward: he is limping off toward the forecastle", { r: 3 })),
tzzSpot("The scuttle down to the forecastle", "Go down the scuttle into the forecastle, where the men sleep"),
tzzTalk("Black Michael", "Black Michael is binding his leg on his sea-chest: speak to him", ["🩹 In the forecastle", tzbQs("Ere he had scarce finished his little speech he had turned and was limping off toward the forecastle with the very apparent intention of forestalling any further conversation.") + "<p>He looks up at you from his sea-chest and says only: \"Ye'd best get back aft with yer friends, mate. This ain't no place for passengers.\"</p>" + tzSrc(tzBk(0)), "▶ Go on"]),
tzzId("fo2", tzzHold(tzR("fo", 0, 0), 6, "Stand a moment in the stuffy dark of the forecastle and listen to the men muttering in their bunks", { r: 3 })),
tzzRead("🌫️ An undertow", tzbQs("There was in the whole atmosphere of the craft that undefinable something which presages disaster. Outwardly, to the knowledge of the Claytons, all went on as before upon the little vessel; but that there was an undertow leading them toward some unknown danger both felt, though they did not speak of it to each other.") + tzSrc(tzBk(0))),
tzzGo(tzR("captcab", 0, 1.6), "Go aft and down the companion to the captain's cabin, where the passengers take their meals", { r: 2.2 }),
tzzFind("bread", tzR("captcab", 0.6, -0.4), "Your supper of ship's biscuit", "Take your supper from the table: you eat alone"),
tzzPuzzle("🍽️ Meals with the captain", "The Claytons still take their meals in the captain's cabin. Does the captain eat with them?", ["Yes, and he is very civil now", "No: he sees that his duties never let him eat at the same time", "No: he has his meals sent up on deck"], 1, ["No.", "", "Not quite."], { yes: "🍽️ " + tzbQ("They took their meals in his cabin, as they had before the unfortunate occurrence; but the captain was careful to see that his duties never permitted him to eat at the same time.") }),
tzzId("pin", tzzGo(tzDeck(1.0, 4.0), "Up on deck again: two days have passed since Black Michael was shot", { r: 3 })),
tzzReadA("🩸 The belaying pin", tzbQs("On the second day after the wounding of Black Michael, Clayton came on deck just in time to see the limp body of one of the crew being carried below by four of his fellows while the first mate, a heavy belaying pin in his hand, stood glowering at the little party of sullen sailors.") + tzSrc(tzBk(0)), "<p>Two days later Clayton comes on deck to find that the first mate has struck another sailor with a belaying pin, and the man is being carried below by his friends. Clayton asks no questions. He does not need to.</p>" + tzSrc(tzBk(0))),
tzzId("ship", tzzGo(tzDeck(3.4, -2), "Next day: a British battleship is growing out of the horizon. Go to the rail to see her", { r: 2.5 })),
tzzHold(tzDeck(3.4, -2), 8, "Watch her come up, grey and enormous, within speaking distance", { r: 2.5 }),
tzzPuzzle("🛡️ Why not ask?", "Clayton half determines to ask that he and Lady Alice be put aboard the battleship, and then does not. Why not?", ["The battleship would not stop", "He feared the officers would laugh, and put it down to cowardice", "Lady Alice would not go"], 1, ["She could have been signalled.", "", "She would have gone with him."], { yes: "🛡️ " + tzbQ("They would but laugh in their sleeves and attribute his reason for wishing to leave the ship to but one thing--cowardice.") }),
tzzId("brasses", tzzRead("🌅 The battleship goes", tzbQs("Late in the afternoon he saw her upper works fade below the far horizon, but not before he learned that which confirmed his greatest fears, and caused him to curse the false pride which had restrained him from seeking safety for his young wife a few short hours before, when safety was within reach--a safety which was now gone forever.") + tzSrc(tzBk(0)))),
tzzId("shipgone", tzzSay("The little old sailor", "The little old sailor has come edging along the rail, polishing the brasses: listen", "🤫 'Ell's to pay", ["\"'Ell's to pay, sir, on this 'ere craft, an' mark my word for it, sir. 'Ell's to pay.\"", "\"What do you mean, my good fellow?\" asked Clayton.", "\"Two busted 'eads yeste'day, an' three to-day. Black Michael's as good as new agin an' 'e's not the bully to stand fer it, not 'e; an' mark my word for it, sir.\""], tzBk(0))),
tzzSay("The little old sailor", "Ask him plainly what he means", "🔪 Mutiny?", ["\"You mean, my man, that the crew contemplates mutiny?\" asked Clayton.", "\"Mutiny!\" exclaimed the old fellow. \"Mutiny! They means murder, sir, an' mark my word for it, sir.\"", "But keep a still tongue in yer 'ead an' when ye 'ear shootin' git below an' stay there."], tzBk(0)),
tzzSay("John Clayton, Lord Greystoke", "Speak to Clayton when the old man has gone", "😐 Deuced cheerful", ["\"Deuced cheerful outlook, Alice,\" said Clayton.", "\"I suppose I should, but yet from purely selfish motives I am almost prompted to 'keep a still tongue in my 'ead.'"], tzBk(0)),
tzzSay("Lady Alice Greystoke", "And to Lady Alice", "⚖️ Duty is duty", ["\"You have but one duty, John, and that lies in the interest of vested authority. If you do not warn the captain you are as much a party to whatever follows as though you had helped to plot and carry it out with your own head and hands.\"", "\"Duty is duty, John, and no amount of sophistries may change it."], tzBk(0)),
tzzPuzzle("🧭 What will Clayton do?", "Lady Alice has had her say. What does Clayton decide?", ["To say nothing and keep to their cabin", "To warn the captain, though he has little stomach to talk with the brute", "To go and find Black Michael"], 1, ["She would not let him.", "", "No."], { yes: "🧭 " + tzbQ("\"But there goes the captain to his cabin now. If I am going to warn him I might as well get the beastly job over for I have little stomach to talk with the brute at all.\"") }),
tzzId("warn", tzzGo(tzR("captcab", 0.6, 1.8), "Go down with Clayton to the captain's cabin and stand by the door", { r: 2 })),
tzzId("capt", tzzSay("John Clayton, Lord Greystoke", "Clayton knocks, and goes in: listen", "🚪 \"Well?\"", ["\"Come in,\" growled the deep tones of that surly officer.", "\"I have come to report the gist of a conversation I heard to-day, because I feel that, while there may be nothing to it, it is as well that you be forearmed. In short, the men contemplate mutiny and murder.\""], tzBk(0))),
tzzSay("The captain of the Fuwalda", "The captain's answer", "😡 \"It's a lie!\"", ["\"It's a lie!\" roared the captain. \"And if you have been interfering again with the discipline of this ship, or meddling in affairs that don't concern you you can take the consequences, and be damned.", "I'm captain of this here ship, and from now on you keep your meddling nose out of my business.\""], tzBk(0)),
tzzPuzzle("🎩 Clayton's reply", "Greystoke never turned a hair. What did he say to Captain Billings?", ["\"I beg your pardon, captain.\"", "\"If you will pardon my candor, I might remark that you are something of an ass.\"", "\"You will hear from the Colonial Office.\""], 1, ["Never.", "", "He might have, but he didn't."], { yes: "🎩 " + tzbQ("\"Captain Billings,\" he drawled finally, \"if you will pardon my candor, I might remark that you are something of an ass.\"") }),
tzzId("ransack", tzzGo(tzR("stateroom", 0, 0.8), "Go through with them to their own cabin, to look over the revolvers", { r: 2 })),
tzzGather("paper", tzR("stateroom", 0, 0), 5, "Clothes and papers, strewn about", "Someone has been through everything: pick up the clothes and papers strewn about the cabin", { spread: 2.4 }),
tzzSay("John Clayton, Lord Greystoke", "Ask Clayton what is missing", "🔫 Only the revolvers", ["A thorough search revealed the fact that nothing had been taken but Clayton's two revolvers and the small supply of ammunition he had saved out for them.", "\"Those are the very things I most wish they had left us,\" said Clayton, \"and the fact that they wished for them and them alone is most sinister.\""], tzBk(0)),
tzzSay("Lady Alice Greystoke", "And Lady Alice", "🛤️ The middle of the road", ["\"If the officers are able to prevent a mutiny, we have nothing to fear, while if the mutineers are victorious our one slim hope lies in not having attempted to thwart or antagonize them.\"", "\"Right you are, Alice. We'll keep in the middle of the road.\""], tzBk(0)),
tzzFind("note", tzR("stateroom", 0, 2.2), "A bit of grimy, folded paper", "Something is being pushed in under the door, a little at a time. Don't open the door; wait, then take it up"),
tzzRead("✉️ The note", tzbQs("It was a bit of grimy, white paper roughly folded into a ragged square. Opening it they found a crude message printed almost illegibly, and with many evidences of an unaccustomed task.", "Translated, it was a warning to the Claytons to refrain from reporting the loss of the revolvers, or from repeating what the old sailor had told them--to refrain on pain of death.") + tzSrc(tzBk(0))),
tzzPuzzle("🤐 What now?", "Lady Alice stopped Clayton from flinging the door open as the note came under it. Why?", ["She thought it was the captain", "They do not wish to be seen, and so we cannot afford to see them", "She was afraid of the dark"], 1, ["No.", "", "No."], { yes: "🤐 " + tzbQ("\"No, John,\" she whispered. \"They do not wish to be seen, and so we cannot afford to see them. Do not forget that we are keeping to the middle of the road.\"") }),
tzzSay("John Clayton, Lord Greystoke", "Clayton, with a rueful smile", "⏳ Sit tight", ["\"I rather imagine we'll be good,\" said Clayton with a rueful smile. \"About all we can do is to sit tight and wait for whatever may come.\""], tzBk(0))
] });
tzbCh({ t: "The Savage Home", txt: 1, start: { sc: "fuwalda", x: 0, z: -7, ry: Math.PI }, jump: 1, tune: "sea", keep: ["nest", "A scrap of the old sail", "⛺"],
state: { env: tzOn("dusk", "gone", "tropicdusk"), land: tzOn("land", null), night: true, nightFrom: "climb", fuAnchor: tzOn(null, "gone2"), boats: tzOn(null, "gone"), nest: tzOn("nestup", null), noCabin: true, noTribe: true },
words: "The next morning. Clayton is just coming up on deck for his walk before breakfast when a shot rings out, and then another, and another.",
intro: "The companion-way",
cast: [
tzc("clayton", tzDeck(-0.8, -6.6), { ry: 0, until: "land" }),
tzc("alice", tzDeck(0.6, -7.2), { ry: 0, until: "land" }),
tzc("michael", tzDeck(0, -1), { ry: Math.PI, until: "land" }),
tzc("clayton", tzA("fubow", -1.0, -1), { key: "cl2", ry: 0, from: "land", until: "ashore" }),
tzc("alice", tzA("fubow", 0.4, -1.4), { key: "al2", ry: 0, from: "land", until: "ashore" }),
tzc("michael", tzA("fubow", 1.6, 0.6), { key: "mi2", ry: -Math.PI / 2, from: "land", until: "ashore" }),
tzc("sailor", tzDeck(-2.6, 2), { key: "m1", dress: "tzsailor", sex: "m", hair: 0x2A2420, name: "A mutineer with an ax", persona: "sailor", greet: "Captain says leave ye be. So I leave ye be.", until: "ashore" }),
tzc("sailor", tzDeck(2.4, 6), { key: "m2", dress: "tzsailor", sex: "m", hair: 0x5A3A2A, skin: 0x6A4028, name: "A mutineer with a boat hook", persona: "sailor", greet: "Keep to yerself, mister.", until: "ashore" }),
tzc("sailor", tzDeck(-1.8, 9), { key: "m3", dress: "tzsailor", sex: "m", hair: 0x8A6A3A, name: "A mutineer at the hatch", persona: "sailor", greet: "...", until: "ashore" }),
tzc("michael", tzA("landing", -4, 2), { key: "mi3", ry: Math.PI / 2, from: "ashore", until: "gone" }),
tzc("sailor", tzA("landing", -6, 6), { key: "s1", dress: "tzsailor", sex: "m", hair: 0x2A2420, name: "A sailor at the boats", persona: "sailor", greet: "Mind, that box is heavy.", from: "ashore", until: "gone" }),
tzc("sailor", tzA("landing", -7, 12), { key: "s2", dress: "tzsailor", sex: "m", hair: 0x5A3A2A, skin: 0x6A4028, name: "A sailor filling the casks", persona: "sailor", greet: "Fresh water at last.", from: "ashore", until: "gone" }),
tzc("clayton", tzA("landing", 1.4, -1.2), { key: "cl3", ry: -Math.PI / 2, from: "ashore", until: "nestup" }),
tzc("alice", tzA("landing", 2.0, 1.0), { key: "al3", ry: -Math.PI / 2, from: "ashore", until: "nestup" }),
tzc("clayton", tzA("nestfoot", 1.4, 1.6), { key: "cl4", ry: Math.PI / 2, from: "nestup", until: "climb" }),
tzc("alice", tzA("nestfoot", 1.6, -1.0), { key: "al4", ry: Math.PI / 2, from: "nestup", until: "climb" }),
tzc("clayton", tzNest(0.6, 0.5), { key: "cl5", ry: -Math.PI / 2, from: "climb" }),
tzc("alice", tzNest(-0.2, -0.6), { key: "al5", ry: -Math.PI / 2, from: "climb" }),
tzc("kerchak", tzA("clearing", 48, -34), { key: "ridge", beast: "kerchak", ry: Math.PI / 2, from: "look", until: "melt", mute: true }),
tzc("sheeta", tzA("nestfoot", -3, 3), { key: "pan", beast: "sheeta", ry: 0.6, from: "panther", until: "away", mute: true }),
tzc("sheeta", tzA("beach", 4, -12), { key: "pan2", beast: "sheeta", ry: Math.PI / 2, from: "away", mute: true })
],
steps: [
{ k: "read" },
tzzGo(tzDeck(-0.2, -6), "Come up the companion-way onto the deck", { r: 2.5 }),
tzzReadA("🔫 The mutiny", tzbQs("The sight which met his eyes confirmed his worst fears. Facing the little knot of officers was the entire motley crew of the Fuwalda, and at their head stood Black Michael.", "Both sides were cursing and swearing in a frightful manner, which, together with the reports of the firearms and the screams and groans of the wounded, turned the deck of the Fuwalda to the likeness of a madhouse.", "Short and grisly had been the work of the mutineers of the Fuwalda, and through it all John Clayton had stood leaning carelessly beside the companionway puffing meditatively upon his pipe as though he had been but watching an indifferent cricket match.") + tzSrc(tzBk(1)), "<p>The crew have risen against their officers, with Black Michael at their head. It is over very quickly, and the captain and his mates are gone. Through it all Clayton stands by the companion-way, calm, smoking his pipe, so that no one will see how afraid he is for his wife.</p>" + tzSrc(tzBk(1))),
tzzSay("Lady Alice Greystoke", "Lady Alice is on the steps just behind you", "😨 Since the beginning", ["\"How long have you been here, Alice?\"", "\"Since the beginning,\" she replied. \"How awful, John. Oh, how awful! What can we hope for at the hands of such as those?\""], tzBk(1)),
tzzSay("John Clayton, Lord Greystoke", "Clayton's answer", "🍳 Breakfast", ["\"Breakfast, I hope,\" he answered, smiling bravely in an attempt to allay her fears.", "\"At least,\" he added, \"I'm going to ask them. Come with me, Alice. We must not let them think we expect any but courteous treatment.\""], tzBk(1)),
tzzSay("Black Michael", "Black Michael, pistol in hand, turns on his men", "🛡️ My friends", ["\"These here are my friends, and they are to be left alone. D'ye understand?", "\"I'm captain of this ship now, an' what I says goes,\" he added, turning to Clayton. \"Just keep to yourselves, and nobody'll harm ye,\""], tzBk(1)),
tzzPuzzle("🛡️ Why spare them?", "Of all the crew, why does Black Michael alone stand up for the Claytons?", ["Clayton promised him money", "Clayton saved his life when the captain fired at him", "He means to hold them for ransom"], 1, ["No.", "", "No."], { yes: "🛡️ The day the captain fired at his heart, Clayton struck the revolver down. Black Michael has not forgotten." }),
tzzHold(tzA("fubow", 0, -3), 10, "Keep to yourself, as he says: wait out the long days up by the bows, out of the men's way", { r: 4 }),
tzzId("land", tzzRead("🏝️ Land!", tzbQs("On the fifth day following the murder of the ship's officers, land was sighted by the lookout. Whether island or mainland, Black Michael did not know, but he announced to Clayton that if investigation showed that the place was habitable he and Lady Greystoke were to be put ashore with their belongings.") + tzSrc(tzBk(1)))),
tzzGo(tzA("fubow", 0, 0), "Go forward and look at the land", { r: 3 }),
tzzSay("Black Michael", "Black Michael comes to tell Clayton his plan", "📜 A few months", ["\"You'll be all right there for a few months,\" he explained, \"and by that time we'll have been able to make an inhabited coast somewhere and scatter a bit. Then I'll see that yer gover'ment's notified where you be an' they'll soon send a man-o'war to fetch ye off.", "\"It would be a hard matter to land you in civilization without a lot o' questions being asked, an' none o' us here has any very convincin' answers up our sleeves.\""], tzBk(1)),
tzzSay("John Clayton, Lord Greystoke", "Clayton argues", "🗣️ Of no avail", ["Clayton remonstrated against the inhumanity of landing them upon an unknown shore to be left to the mercies of savage beasts, and, possibly, still more savage men.", "But his words were of no avail, and only tended to anger Black Michael, so he was forced to desist and make the best he could of a bad situation."], tzBk(1)),
tzzPuzzle("⚓ The harbour", "About three in the afternoon they come about off a wooded shore. Black Michael sends a boat to sound the entrance of a landlocked harbour. What do they find?", ["Rocks across the mouth", "Deep water through the passage as well as far into the little basin", "A village on the shore"], 1, ["No.", "", "No."], { yes: "⚓ " + tzbQ("In about an hour they returned and reported deep water through the passage as well as far into the little basin.") }),
tzzId("dusk", tzzRead("🌅 At anchor", tzbQs("Before dark the barkentine lay peacefully at anchor upon the bosom of the still, mirror-like surface of the harbor.", "The surrounding shores were beautiful with semitropical verdure, while in the distance the country rose from the ocean in hill and tableland, almost uniformly clothed by primeval forest.") + tzSrc(tzBk(1)))),
tzzHold(tzA("furail", 0, 0), 8, "Stand at the rail with them as darkness settles, and listen to the forest", { r: 3 }),
tzzRead("🦁 From the dark shadows", tzbQs("From the dark shadows of the mighty forest came the wild calls of savage beasts--the deep roar of the lion, and, occasionally, the shrill scream of a panther.", "The woman shrank closer to the man in terror-stricken anticipation of the horrors lying in wait for them in the awful blackness of the nights to come, when they should be alone upon that wild and lonely shore.") + tzSrc(tzBk(1))),
tzzSay("Black Michael", "Black Michael comes to the rail", "🤝 That's all I can do", ["\"I am the only man aboard who would not rather see ye both safely dead, and, while I know that's the sensible way to make sure of our own necks, yet Black Michael's not the man to forget a favor. Ye saved my life once, and in return I'm goin' to spare yours, but that's all I can do.", "I'll put all yer stuff ashore with ye as well as cookin' utensils an' some old sails for tents, an' enough grub to last ye until ye can find fruit and game."], tzBk(1)),
tzzSpot("The companion-way down to the cabins", "Go below with the Claytons, each wrapped in gloomy forebodings"),
tzzGather("load", tzR("stateroom", 0, 0), 4, "Their boxes", "Help pack the boxes for the morning: everything is to go ashore", { spread: 2.2 }),
tzzReadA("💭 That other little life", tzbQs("And even should they escape that fate was it not but to be faced with far graver dangers? Alone, he might hope to survive for years; for he was a strong, athletic man.", "But what of Alice, and that other little life so soon to be launched amidst the hardships and grave dangers of a primeval world?") + tzSrc(tzBk(1)), "<p>Clayton lies awake. Alone, a strong man might live for years in such a place. But Alice is going to have a baby, and the baby will be born out there, far from any help.</p>" + tzSrc(tzBk(1))),
tzzId("ashore", tzzTravel("🚣 Ashore", tzbQs("Early next morning their numerous chests and boxes were hoisted on deck and lowered to waiting small boats for transportation to shore.", "Into the small boats were also loaded salt meats and biscuit, with a small supply of potatoes and beans, matches, and cooking vessels, a chest of tools, and the old sails which Black Michael had promised them.") + tzSrc(tzBk(1)), { sc: "coast", x: -384, z: 10, ry: -Math.PI / 2 }, "The boats run up on the white sand of the little harbour", "▶ Into the boats")),
tzzGather("tin", tzA("landing", -3, 4), 5, "The stores", "Carry the stores up the beach from the boats: salt meat, biscuit, beans, matches", { spread: 5 }),
tzzGather("load", tzA("landing", -4, 0), 3, "The tools and the old sails", "And the chest of tools, the cooking vessels and the old sails", { spread: 5 }),
tzzFind("rifle", tzA("landing", -1, -3), "Clayton's revolvers", "Black Michael has made the sailors give back Clayton's revolvers: take them from the chest and hand them to him"),
tzzTalk("Black Michael", "Black Michael is the last to go: speak to him", ["👋 The last to leave", tzbQs("As though himself fearing the very thing which Clayton had suspected, Black Michael accompanied them to shore, and was the last to leave them when the small boats, having filled the ship's casks with fresh water, were pushed out toward the waiting Fuwalda.") + tzSrc(tzBk(1)), "▶ Go on"]),
tzzId("gone", tzzHold(tzA("beach", 0, 0), 8, "Stand with the Claytons and watch the boats pull slowly back across the still water to the Fuwalda", { r: 4 })),
tzzRead("👁️ Other eyes", tzbQs("As the boats moved slowly over the smooth waters of the bay, Clayton and his wife stood silently watching their departure--in the breasts of both a feeling of impending disaster and utter hopelessness.", "And behind them, over the edge of a low ridge, other eyes watched--close set, wicked eyes, gleaming beneath shaggy brows.") + tzSrc(tzBk(1))),
tzzId("gone2", tzzSay("Lady Alice Greystoke", "The Fuwalda passes out of sight behind the point: Lady Alice", "😢 The horror of it", ["As the Fuwalda passed through the narrow entrance to the harbor and out of sight behind a projecting point, Lady Alice threw her arms about Clayton's neck and burst into uncontrolled sobs.", "\"Oh, John,\" she cried at last, \"the horror of it. What are we to do? What are we to do?\""], tzBk(1))),
tzzSay("John Clayton, Lord Greystoke", "Clayton answers her, as quietly as at home", "🔨 Work", ["\"There is but one thing to do, Alice,\" and he spoke as quietly as though they were sitting in their snug living room at home, \"and that is work. Work must be our salvation. We must not give ourselves time to think, for in that direction lies madness."], tzBk(1)),
tzzPuzzle("🪨 Our ancestors", "Clayton says their ancestors faced the same problems, hundreds of thousands of years ago, with weapons of stone and bone. Why does he think they will do better?", ["They have a ship hidden in the harbour", "They are armed with ages of superior knowledge, and the means science has given them", "The forest is safer now"], 1, ["No.", "", "No."], { yes: "🪨 " + tzbQ("What they did may we not do? And even better, for are we not armed with ages of superior knowledge, and have we not the means of protection, defense, and sustenance which science has given us, but of which they were totally ignorant?") }),
tzzSay("Lady Alice Greystoke", "Lady Alice dries her eyes", "💪 A brave primeval woman", ["\"I only hope you are right, John. I will do my best to be a brave primeval woman, a fit mate for the primeval man.\""], tzBk(1)),
tzzFind("rifle", tzA("landing", 1, -4), "The box of rifles", "Open the box of rifles and ammunition, so they may both be armed while they work"),
tzzGo("clearing", "Walk up a hundred yards from the beach to a little level spot, fairly free of trees", { r: 6 }),
tzzPuzzle("🌳 Where to sleep?", "Here, one day, they will build a house. But for tonight, where is it safest to sleep?", ["In a tent of sails on the beach", "On a platform in the trees, out of reach of the larger beasts", "In the boats"], 1, ["The beasts walk the beach at night.", "", "The boats have gone."], { yes: "🌳 " + tzbQ("here they decided eventually to build a permanent house, but for the time being they both thought it best to construct a little platform in the trees out of reach of the larger of the savage beasts in whose realm they were.") }),
tzzGather("wood", tzA("nestfoot", 4, 4), 6, "Long branches", "Cut long branches from the trees for the framework, round four trees that stand eight feet square", { spread: 10 }),
tzzGather("fern", tzA("nestfoot", -2, 10), 6, "Elephant's ear", "Gather the huge fronds of elephant's ear that grow all about, to pave the platform", { spread: 9 }),
tzzRead("🪢 The nest", tzbQs("Across this framework Clayton placed other smaller branches quite close together. This platform he paved with the huge fronds of elephant's ear which grew in profusion about them, and over the fronds he laid a great sail folded into several thicknesses.", "Seven feet higher he constructed a similar, though lighter platform to serve as roof, and from the sides of this he suspended the balance of his sailcloth for walls.") + tzSrc(tzBk(1))),
tzzId("nestup", tzzGo("nestfoot", "The rude ladder is done: come to the foot of it", { r: 2.5 })),
tzzRead("🐒 The little neighbours", tzbQs("All during the day the forest about them had been filled with excited birds of brilliant plumage, and dancing, chattering monkeys, who watched these new arrivals and their wonderful nest building operations with every mark of keenest interest and fascination.") + tzSrc(tzBk(1))),
tzzFind("jar", tzA("stream", 0, 0), "A great basin of water", "Just before dusk: fill a great basin with water from the near-by stream"),
tzzId("climb", tzzGo(tzNest(0, 0), "Climb the ladder to the nest", { r: 1.6 })),
tzzHold(tzNest(0, 0), 6, "Sit like Turks upon the blankets, the curtains thrown back, and watch the shadows of the wood darken", { r: 2 }),
tzzId("look", tzzSay("Lady Alice Greystoke", "Lady Alice suddenly grasps Clayton's arm", "👁️ Look!", ["\"John,\" she whispered, \"look! What is it, a man?\""], tzBk(1))),
tzzPuzzle("🌑 On the ridge", "Look out toward the ridge. What do you see?", ["Nothing at all", "A great figure standing upright upon the ridge, as though listening", "A light, as of a fire"], 1, ["Look again, toward the ridge.", "", "No."], { yes: "🌑 " + tzbQ("As Clayton turned his eyes in the direction she indicated, he saw silhouetted dimly against the shadows beyond, a great figure standing upright upon the ridge.") }),
tzzId("melt", tzzSay("John Clayton, Lord Greystoke", "It turns slowly, and melts into the jungle: Clayton", "🌒 A shadow?", ["\"I do not know, Alice,\" he answered gravely, \"it is too dark to see so far, and it may have been but a shadow cast by the rising moon.\""], tzBk(1))),
tzzSay("Lady Alice Greystoke", "Lady Alice", "😰 Some huge mockery", ["\"No, John, if it was not a man it was some huge and grotesque mockery of man. Oh, I am afraid.\""], tzBk(1)),
tzzId("panther", tzzHold(tzNest(0, 0), 10, "The curtains are down. Lie still in the dark: something is screaming in the jungle, closer and closer, and then it is directly beneath you", { r: 2 })),
tzzRead("🐆 Sniffing and clawing", tzbQs("Scarcely had they closed their eyes than the terrifying cry of a panther rang out from the jungle behind them. Closer and closer it came until they could hear the great beast directly beneath them. For an hour or more they heard it sniffing and clawing at the trees which supported their platform") + tzSrc(tzBk(1))),
tzzId("away", tzzPuzzle("🌕 Where did it go?", "At last the beast roams away. Where can Clayton see it, clear in the brilliant moonlight?", ["Up on the ridge", "Across the beach: a great, handsome beast, the largest he had ever seen", "Swimming in the harbour"], 1, ["No.", "", "No."], { yes: "🌕 " + tzbQ("but at last it roamed away across the beach, where Clayton could see it clearly in the brilliant moonlight--a great, handsome beast, the largest he had ever seen.") })),
tzzRead("🌌 The first night", tzbQs("During the long hours of darkness they caught but fitful snatches of sleep, for the night noises of a great jungle teeming with myriad animal life kept their overwrought nerves on edge, so that a hundred times they were startled to wakefulness by piercing screams, or the stealthy moving of great bodies beneath them.") + tzSrc(tzBk(1)), "▶ Morning")
] });
tzbCh({ t: "Life and Death", txt: 2, start: { sc: "coast", x: -324, z: -6, ry: -Math.PI / 2 }, jump: 1, tune: "cottage", keep: ["cabin", "A splinter of the great door", "🚪"],
state: { env: tzOn("night1", "dawn2", "junglenight"), noTribe: true, nest: tzOn(null, "roof"), cabinHalf: tzOn(null, "roof"), noLanding: tzOn("roof", null) },
words: "Morning, after the first night in the nest. Clayton means to have four strong walls round them before anything else.",
intro: "The clearing",
cast: [
tzc("clayton", tzA("clearing", -6, 4), { ry: -Math.PI / 2, until: "tree" }),
tzc("alice", tzA("clearing", -4, 8), { ry: -Math.PI / 2, until: "sit" }),
tzc("clayton", tzA("clearing", 22, -12), { key: "cl2", ry: Math.PI / 2, from: "tree", until: "home" }),
tzc("alice", tzA("clearing", -8, 14), { key: "al2", ry: Math.PI / 2, from: "sit", until: "home" }),
tzc("mangani", tzA("clearing", 44, -26), { key: "bull", beast: "mangani", ry: -Math.PI / 2 * 1.2, from: "see", until: "dead", mute: true }),
tzc("clayton", tzR("cabin", -1.6, 1.4), { key: "cl3", ry: Math.PI / 2, from: "home", until: "desk" }),
tzc("alice", tzR("cabin", -2.6, 0.6), { key: "al3", ry: 0, from: "home", until: "gone" }),
tzc("clayton", tzR("cabin", 0.6, -0.4), { key: "cl4", ry: 0, from: "desk" })
],
steps: [
{ k: "read" },
tzzGo("clearing", "Come down from the nest into the clearing: the day has dawned at last", { r: 6 }),
tzzRead("🪵 Four strong walls", tzbQs("As soon as they had made their meager breakfast of salt pork, coffee and biscuit, Clayton commenced work upon their house, for he realized that they could hope for no safety and no peace of mind at night until four strong walls effectually barred the jungle life from them.") + tzSrc(tzBk(2))),
tzzGather("wood", tzA("clearing", 14, -10), 8, "Small logs", "Cut small logs about six inches through, for the walls, from the young trees at the edge of the clearing", { spread: 12 }),
tzzPuzzle("🧱 Stopping the chinks", "The logs are up. What does Clayton stop the chinks between them with?", ["Moss from the trees", "Clay, which he found a few feet beneath the surface soil", "Sand from the beach"], 1, ["No.", "", "It would run out."], { yes: "🧱 " + tzbQ("He constructed his cabin of small logs about six inches in diameter, stopping the chinks with clay which he found at the depth of a few feet beneath the surface soil.") }),
tzzGather("clay", tzA("clearing", -2, -12), 6, "Clay", "Dig clay from a few feet down, where the bank by the stream is cut", { spread: 6 }),
tzzGather("stone", tzA("beach", -10, 10), 6, "Small stones from the beach", "Carry small stones up from the beach for the fireplace at one end", { spread: 10 }),
tzzRead("🪟 The window and the roof", tzbQs("In the window opening he set small branches about an inch in diameter both vertically and horizontally, and so woven that they formed a substantial grating that could withstand the strength of a powerful animal.", "The A-shaped roof was thatched with small branches laid close together and over these long jungle grass and palm fronds, with a final coating of clay.") + tzSrc(tzBk(2))),
tzzGather("fern", tzA("clearing", -14, -20), 6, "Long jungle grass and palm fronds", "Gather long jungle grass and palm fronds for the thatch", { spread: 10 }),
tzzGather("load", tzA("landing", 0, 0), 4, "The packing-boxes", "Bring up the empty packing-boxes from the beach: the door is to be made of them", { spread: 4 }),
tzzPuzzle("🚪 The great door", "Clayton nails piece upon piece of the packing-boxes, the grain of each layer running across the last. How thick is the door when he is done?", ["An inch", "Some three inches thick, and so strong that they both laughed to see it", "A foot"], 1, ["Thicker.", "", "Not so thick."], { yes: "🚪 " + tzbQ("until he had a solid body some three inches thick and of such great strength that they were both moved to laughter as they gazed upon it.") }),
tzzPuzzle("🔩 The hinges", "Then the greatest difficulty: he has no hinges. What does he do?", ["Leans the door against the opening", "After two days' work fashions two massive hardwood hinges", "Hangs it on ropes"], 1, ["Not good enough for him.", "", "No."], { yes: "🔩 " + tzbQ("After two days' work, however, he succeeded in fashioning two massive hardwood hinges, and with these he hung the door so that it opened and closed easily.") }),
tzzId("roof", tzzGo(tzA("cabin", -1, 0), "The roof is on and they have moved in: come to the door of the cabin", { r: 3 })),
tzzSpot("The door of the cabin", "Go in"),
tzzRead("🛏️ Well settled", tzbQs("The building of a bed, chairs, table, and shelves was a relatively easy matter, so that by the end of the second month they were well settled, and, but for the constant dread of attack by wild beasts and the ever growing loneliness, they were not uncomfortable or unhappy.") + tzSrc(tzBk(2))),
tzzSpot("The door of the cabin", "Out again into the sunshine", { at: tzR("cabin", -3.4, 0) }),
tzzId("sit", tzzRead("🐦 Their little friends", tzbQs("The brilliant birds and the little monkeys had become accustomed to their new acquaintances", "so that within the first month several of the birds had gone so far as even to accept morsels of food from the friendly hands of the Claytons.") + tzSrc(tzBk(2)))),
tzzFind("bread", tzA("clearing", -8, 12), "A bit of biscuit", "Sit a little way from the cabin with Lady Alice and hold out a morsel for the birds"),
tzzId("tree", tzzRead("🪓 An addition", tzbQs("One afternoon, while Clayton was working upon an addition to their cabin, for he contemplated building several more rooms, a number of their grotesque little friends came shrieking and scolding through the trees from the direction of the ridge.") + tzSrc(tzBk(2)))),
tzzGo(tzA("clearing", 18, -8), "Go up toward Clayton: he has come to fell a perfect tree, some way from the cabin", { r: 5 }),
tzzId("see", tzzRead("🦍 The man-brute", tzbQs("At last he saw it, the thing the little monkeys so feared--the man-brute of which the Claytons had caught occasional fleeting glimpses.", "It was approaching through the jungle in a semi-erect position, now and then placing the backs of its closed fists upon the ground--a great anthropoid ape, and, as it advanced, it emitted deep guttural growls and an occasional low barking sound.") + tzSrc(tzBk(2)))),
tzzPuzzle("🔫 Where are his guns?", "The ape is crashing through the underbrush straight at Clayton. Where are his rifles and revolvers?", ["Slung on his back", "All within the little cabin: he had grown careless", "On the stump beside him"], 1, ["No.", "", "No."], { yes: "🔫 " + tzbQ("Grown careless from months of continued safety, during which time he had seen no dangerous animals during the daylight hours, he had left his rifles and revolvers all within the little cabin") }),
tzzSay("John Clayton, Lord Greystoke", "Clayton, at bay with his ax", "🪓 Close and bolt the door", ["\"Close and bolt the door, Alice,\" cried Clayton. \"I can finish this fellow with my ax.\"", "But he knew he was facing a horrible death, and so did she."], tzBk(2)),
tzzReadA("💥 A lioness protecting its young", tzbQs("She had always been afraid of firearms, and would never touch them, but now she rushed toward the ape with the fearlessness of a lioness protecting its young.", "The man swung his ax with all his mighty strength, but the powerful brute seized it in those terrible hands, and tearing it from Clayton's grasp hurled it far to one side.", "With an ugly snarl he closed upon his defenseless victim, but ere his fangs had reached the throat they thirsted for, there was a sharp report and a bullet entered the ape's back between his shoulders.", "With little or no effort he succeeded, and the great bulk rolled inertly upon the turf before him--the ape was dead. The bullet had done its work.") + tzSrc(tzBk(2)), "<p>Lady Alice, who had always been afraid of guns, runs out of the cabin with one of the rifles. " + tzbQ("now she rushed toward the ape with the fearlessness of a lioness protecting its young.") + " The ape tears the ax out of Clayton's hands; and then the rifle cracks, and the ape turns on her, and falls. " + tzbQ("the ape was dead. The bullet had done its work.") + " Lady Alice has fainted.</p>" + tzSrc(tzBk(2))),
tzzId("dead", tzzFind("rifle", tzA("clearing", 6, 6), "Lady Alice's rifle", "Pick up the rifle she dropped on the turf")),
tzzId("home", tzzGo(tzR("cabin", -1.4, 0.6), "Clayton has carried her into the cabin: go in to them", { r: 2 })),
tzzSay("Lady Alice Greystoke", "It is two hours before she wakes: Lady Alice", "🏠 Home", ["\"O, John, it is so good to be really home! I have had an awful dream, dear. I thought we were no longer in London, but in some horrible place where great beasts attacked us.\""], tzBk(2)),
tzzSay("John Clayton, Lord Greystoke", "Clayton, stroking her forehead", "🤫 There, there", ["\"There, there, Alice,\" he said, stroking her forehead, \"try to sleep again, and do not worry your head about bad dreams.\""], tzBk(2)),
tzzId("night1", tzzRead("👶 A little son", tzbQs("That night a little son was born in the tiny cabin beside the primeval forest, while a leopard screamed before the door, and the deep notes of a lion's roar sounded from beyond the ridge.") + tzSrc(tzBk(2)), "▶ Go on")),
tzzId("dawn2", tzzRead("🌧️ Never again outside", tzbQs("Lady Greystoke never recovered from the shock of the great ape's attack, and, though she lived for a year after her baby was born, she was never again outside the cabin, nor did she ever fully realize that she was not in England.", "In other ways she was quite rational, and the joy and happiness she took in the possession of her little son and the constant attentions of her husband made that year a very happy one for her, the happiest of her young life.") + tzSrc(tzBk(2)))),
tzzPuzzle("🏡 Made fine for her", "With his meager tools Clayton works all that year to make the inside of the cabin beautiful. Look round the room: what is on the floor?", ["Bare earth", "Skins of lion and panther", "Carpets from England"], 1, ["Look down.", "", "Their carpets were never unpacked."], { yes: "🏡 " + tzbQ("Skins of lion and panther covered the floor. Cupboards and bookcases lined the walls. Odd vases made by his own hand from the clay of the region held beautiful tropical flowers.") }),
tzzGather("flower", tzA("clearing", 10, 10), 5, "Tropical flowers", "Go out and pick tropical flowers for the vases he has made of clay", { spread: 10 }),
tzzGo(tzR("cabin", 0, 0.4), "Bring them in to her", { r: 2 }),
tzzSpot("The books on the shelf", "Look at the books on the shelf: some of them are for a child"),
tzzRead("📚 Picture books, primers, readers", tzbQs("In his leisure Clayton read, often aloud to his wife, from the store of books he had brought for their new home. Among these were many for little children--picture books, primers, readers--for they had known that their little child would be old enough for such before they might hope to return to England.") + tzSrc(tzBk(2))),
tzzPuzzle("📔 The diary", "Clayton keeps a diary of their strange life, locked in a little metal box. In what language does he write it?", ["English", "French, as he always had", "Latin"], 1, ["No.", "", "No."], { yes: "📔 " + tzbQ("At other times Clayton wrote in his diary, which he had always been accustomed to keep in French, and in which he recorded the details of their strange life. This book he kept locked in a little metal box.") }),
tzzId("gone", tzzReadA("🕯️ A year from the day", tzbQs("A year from the day her little son was born Lady Alice passed quietly away in the night. So peaceful was her end that it was hours before Clayton could awake to a realization that his wife was dead.") + tzSrc(tzBk(2)), "<p>" + tzbQ("A year from the day her little son was born Lady Alice passed quietly away in the night.") + " She did not suffer. Clayton is left alone with the baby.</p>" + tzSrc(tzBk(2)))),
tzzId("desk", tzzFind("book", tzR("cabin", 0.6, 0.0), "The diary", "The diary lies open on the table he built for her. Read the last entry")),
tzzRead("📔 The last entry", tzbQs("My little son is crying for nourishment--O Alice, Alice, what shall I do?") + "<p style='opacity:.8'>(In French in the diary; the book gives it in English.)</p>" + tzSrc(tzBk(2))),
tzzRead("🌿 The deathlike stillness", tzbQs("And as John Clayton wrote the last words his hand was destined ever to pen, he dropped his head wearily upon his outstretched arms where they rested upon the table he had built for her", "For a long time no sound broke the deathlike stillness of the jungle midday save the piteous wailing of the tiny man-child.") + tzSrc(tzBk(2)), "▶ Go on")
] });
tzbCh({ t: "The Apes", txt: 3, start: { sc: "coast", x: -70, z: -46, ry: Math.PI / 2 }, jump: 1, tune: "jungle", keep: ["kala", "A tuft of Kala's black hair", "🖤"],
state: { noTribe: true, bones: false },
words: "The same day, in the forest of the table-land a mile back from the ocean. Old Kerchak the Ape is on a rampage of rage among his people.",
intro: "The forest of the table-land",
cast: [
tzc("kerchak", tzA("forest", 112, -10), { key: "k", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: -Math.PI / 2, until: "march" }),
tzc("kala", tzA("forest", 106, -24), { key: "kl", beast: "kala", name: "Kala", persona: "kala", ry: 0.4, until: "march" }),
tzc("ape", tzA("forest", 124, -28), { key: "a1", beast: "mangani", name: "A he-ape of the tribe", persona: "ape", ry: 2.4, until: "march" }),
tzc("ape", tzA("forest", 130, -6), { key: "a2", beast: "mangani", name: "An old she-ape", persona: "ape", ry: 3.6, s: 0.9, until: "march" }),
tzc("ape", tzA("forest", 100, 4), { key: "a3", beast: "mangani", name: "A young ape at play", persona: "ape", ry: 1.2, s: 0.6, until: "march" }),
tzc("ape", tzA("forest", 118, 8), { key: "a4", beast: "mangani", name: "A young ape searching for bugs", persona: "ape", ry: -1.2, s: 0.65, until: "march" }),
tzc("kerchak", tzA("clearing", 46, -30), { key: "k2", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: Math.PI / 2 * 1.2, from: "march", until: "creep" }),
tzc("kala", tzA("clearing", 50, -24), { key: "kl2", beast: "kala", name: "Kala", persona: "kala", ry: Math.PI / 2 * 1.2, from: "march", until: "creep" }),
tzc("ape", tzA("clearing", 54, -36), { key: "a5", beast: "mangani", name: "A he-ape of the tribe", persona: "ape", ry: Math.PI / 2, from: "march", until: "creep" }),
tzc("ape", tzA("cabin", 3, -4), { key: "a6", beast: "mangani", name: "A he-ape at the door", persona: "ape", ry: -Math.PI / 2, from: "creep", until: "home" }),
tzc("ape", tzA("cabin", 5, 3), { key: "a7", beast: "mangani", name: "An ape craning to see in", persona: "ape", ry: -Math.PI / 2, s: 0.9, from: "creep", until: "home" }),
tzc("kala", tzA("clearing", -6, -18), { key: "kl3", beast: "kala", name: "Kala", persona: "kala", ry: Math.PI, from: "tree", until: "home" }),
tzc("kerchak", tzR("cabin", 1.8, -0.6), { key: "k3", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: Math.PI / 2, from: "inside", until: "shot" }),
tzc("ape", tzR("cabin", -2.4, -1.8), { key: "a8", beast: "mangani", name: "An ape huddled by the door", persona: "ape", ry: 0.6, from: "inside", until: "shot" }),
tzc("kerchak", tzA("clearing", 20, -6), { key: "k4", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: Math.PI / 2, from: "shot", until: "home" }),
tzc("kerchak", tzA("forest", 112, -10), { key: "k5", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: -Math.PI / 2, from: "home" }),
tzc("kala", tzA("forest", 104, -16), { key: "kl5", beast: "kala", name: "Kala", persona: "kala", ry: 0.2, from: "home" })
],
steps: [
{ k: "read" },
tzzReadA("😡 Kerchak's rage", tzbQs("The younger and lighter members of his tribe scampered to the higher branches of the great trees to escape his wrath; risking their lives upon branches that scarce supported their weight rather than face old Kerchak in one of his fits of uncontrolled anger.", "The other males scattered in all directions, but not before the infuriated brute had felt the vertebra of one snap between his great, foaming jaws.") + tzSrc(tzBk(3)), "<p>" + tzbQ("The younger and lighter members of his tribe scampered to the higher branches of the great trees to escape his wrath") + ". Kerchak, the king ape, is in one of his fits of rage, and no ape is safe near him.</p>" + tzSrc(tzBk(3))),
tzzGo(tzA("forest", 96, -18), "Keep well back, under the great trees, where Kala is coming home from a search for food", { r: 6 }),
tzzReadA("🍂 Kala's leap", tzbQs("But Kerchak was close upon her, so close that he had almost grasped her ankle had she not made a furious leap far into space from one tree to another--a perilous chance which apes seldom if ever take, unless so closely pursued by danger that there is no alternative.", "She made the leap successfully, but as she grasped the limb of the further tree the sudden jar loosened the hold of the tiny babe where it clung frantically to her neck, and she saw the little thing hurled, turning and twisting, to the ground thirty feet below.", "With a low cry of dismay Kala rushed headlong to its side, thoughtless now of the danger from Kerchak; but when she gathered the wee, mangled form to her bosom life had left it.") + tzSrc(tzBk(3)), "<p>Kerchak chases Kala, and she makes a great leap from one tree to another to escape him. Her tiny baby, clinging to her neck, loses its hold and falls; and when Kala reaches it, it is dead. " + tzbQ("With the death of the babe his fit of demoniacal rage passed as suddenly as it had seized him.") + "</p>" + tzSrc(tzBk(3))),
tzzRead("👑 Kerchak", tzbQs("Kerchak was a huge king ape, weighing perhaps three hundred and fifty pounds. His forehead was extremely low and receding, his eyes bloodshot, small and close set to his coarse, flat nose; his ears large and thin, but smaller than most of his kind.", "His awful temper and his mighty strength made him supreme among the little tribe into which he had been born some twenty years before.") + tzSrc(tzBk(3))),
tzzPuzzle("🐘 Whom did Kerchak fear?", "No ape in all the forest dared contest his right to rule. Of all the wild life, only one feared him not, and that one alone did Kerchak fear. Which?", ["Sabor, the lioness", "Tantor, the elephant", "Histah, the snake"], 1, ["No.", "", "No."], { yes: "🐘 " + tzbQ("Old Tantor, the elephant, alone of all the wild savage life, feared him not--and he alone did Kerchak fear. When Tantor trumpeted, the great ape scurried with his fellows high among the trees of the second terrace.") }),
tzzPuzzle("🦍 Kala's mate", "Kala was the youngest mate of a male whose name meant broken nose. What was it?", ["Kerchak", "Tublat", "Terkoz"], 1, ["No: Kerchak is the king.", "", "Not that one."], { yes: "🦍 " + tzbQ("Kala was the youngest mate of a male called Tublat, meaning broken nose, and the child she had seen dashed to death was her first; for she was but nine or ten years old.") }),
tzzTalk("Kala", "Go near Kala, very quietly, where she sits cuddling her baby", ["🖤 Kala", tzbQs("Notwithstanding her youth, she was large and powerful--a splendid, clean-limbed animal, with a round, high forehead, which denoted more intelligence than most of her kind possessed. So, also, she had a great capacity for mother love and mother sorrow.") + tzSrc(tzBk(3)), "▶ Go on"]),
tzzRead("🌿 The tribe at its work", tzbQs("The young played and frolicked about among the trees and bushes. Some of the adults lay prone upon the soft mat of dead and decaying vegetation which covered the ground, while others turned over pieces of fallen branches and clods of earth in search of the small bugs and reptiles which formed a part of their food.", "Others, again, searched the surrounding trees for fruit, nuts, small birds, and eggs.") + tzSrc(tzBk(3))),
tzzGather("nuts", tzA("forest", 110, -4), 5, "Nuts", "Forage with the tribe: find nuts among the fallen leaves", { spread: 12 }),
tzzGather("fruit", tzA("forest", 96, 8), 4, "Wild fruit", "And fruit, low on the bushes", { spread: 12 }),
tzzId("march", tzzRead("🐾 Toward the sea", tzbQs("They had passed an hour or so thus when Kerchak called them together, and, with a word of command to them to follow him, set off toward the sea.", "They traveled for the most part upon the ground, where it was open, following the path of the great elephants whose comings and goings break the only roads through those tangled mazes of bush, vine, creeper, and tree.") + tzSrc(tzBk(3)), "▶ Follow them")),
tzzGo(tzA("forest", 40, 10), "Follow the tribe down the elephants' path toward the sea", { r: 8 }),
tzzGo(tzA("clearing", 56, -30), "On to the ridge above the beach", { r: 6 }),
tzzRead("🏚️ The strange white ape's lair", tzbQs("It was shortly after noon when they reached a ridge overlooking the beach where below them lay the tiny cottage which was Kerchak's goal.", "He had seen many of his kind go to their deaths before the loud noise made by the little black stick in the hands of the strange white ape who lived in that wonderful lair, and Kerchak had made up his brute mind to own that death-dealing contrivance, and to explore the interior of the mysterious den.") + tzSrc(tzBk(3))),
tzzPuzzle("🤫 Why so quiet?", "Today the apes creep toward the cabin without a growl or a scream. Why?", ["They are tired from the march", "The little black stick had taught them to come quietly lest they awaken it", "Kerchak is asleep"], 1, ["No.", "", "No."], { yes: "🤫 " + tzbQ("There were no growls, no fierce screams of rage--the little black stick had taught them to come quietly lest they awaken it.") }),
tzzId("creep", tzzGo(tzA("cabin", 8, 0), "Creep down after them through the jungle to the cabin: the door is open", { r: 4 })),
tzzReadA("🚪 Within the door", tzbQs("Inside the den they saw the strange white ape lying half across a table, his head buried in his arms; and on the bed lay a figure covered by a sailcloth, while from a tiny rustic cradle came the plaintive wailing of a babe.", "Noiselessly Kerchak entered, crouching for the charge; and then John Clayton rose with a sudden start and faced them.", "for his revolvers were hanging on the far wall beside his rifle, and Kerchak was charging.") + tzSrc(tzBk(3)), "<p>Inside, Clayton is sitting at the table with his head on his arms, and the baby is crying in its cradle. Kerchak creeps in. Clayton jumps up, but his guns are on the far wall. Kerchak kills him.</p>" + tzSrc(tzBk(3))),
tzzId("tree", tzzRead("🍼 Kala", tzbQs("but Kala was there before him, and when he would have grasped the child she snatched it herself, and before he could intercept her she had bolted through the door and taken refuge in a high tree.", "As she took up the little live baby of Alice Clayton she dropped the dead body of her own into the empty cradle; for the wail of the living had answered the call of universal motherhood within her wild breast which the dead could not still.") + tzSrc(tzBk(3)))),
tzzGo(tzA("clearing", -6, -14), "Go out to the foot of the high tree where Kala has taken refuge with the baby", { r: 4 }),
tzzRead("🤱 Kala, the great ape", tzbQs("the instinct of mother love--reached out to the tiny man-child's half-formed understanding, and he became quiet.", "Then hunger closed the gap between them, and the son of an English lord and an English lady nursed at the breast of Kala, the great ape.") + tzSrc(tzBk(3))),
tzzId("inside", tzzSpot("The door of the cabin", "Look in at the door: the beasts within are warily examining this strange lair")),
tzzRead("🔫 The thunder-stick", tzbQs("The rifle hanging upon the wall caught his first attention; it was for this strange, death-dealing thunder-stick that he had yearned for months; but now that it was within his grasp he scarcely had the temerity to seize it.", "Using his long arms as a man uses crutches, and rolling his huge carcass from side to side with each stride, the great king ape paced to and fro, uttering deep growls, occasionally punctuated with the ear-piercing scream, than which there is no more terrifying noise in all the jungle.") + tzSrc(tzBk(3))),
tzzHold(tzR("cabin", -3.0, 0), 8, "Keep still by the door and watch Kerchak pace before the rifle, his eyes never leaving it", { r: 2 }),
tzzPuzzle("💥 The trigger", "At last Kerchak tears the rifle from its hook, peers down the muzzle, fingers the sights and the breech, and then the trigger. What happens?", ["Nothing: it is not loaded", "A deafening roar, and every ape falls over the others to escape", "He shoots another ape"], 1, ["Clayton kept it loaded.", "", "No."], { yes: "💥 " + tzbQ("Suddenly Kerchak's finger closed upon the trigger. There was a deafening roar in the little room and the apes at and beyond the door fell over one another in their wild anxiety to escape.") }),
tzzId("shot", tzzSpot("The door of the cabin", "Get out of the door before Kerchak comes through it!", { at: tzR("cabin", -3.4, 0) })),
tzzPuzzle("🔒 The door shuts", "As Kerchak bolts out with the rifle in his hand, the door shuts behind him, and the apes can never get in again. Why?", ["Kala pushed it to", "The rifle's front sight caught the door and slammed it, and Clayton's clever latch sprang", "The wind blew it shut"], 1, ["She was up a tree.", "", "No."], { yes: "🔒 " + tzbQ("The cleverly constructed latch which Clayton had made for the door had sprung as Kerchak passed out; nor could the apes find means of ingress through the heavily barred windows.") }),
tzzFind("rifle", tzA("clearing", 22, -4), "The thunder-stick", "Kerchak dropped it like a red hot iron and will not touch it again: pick it up and stand it against the cabin wall"),
tzzId("home", tzzRead("🏃 Homeward", tzbQs("Kala had not once come to earth with her little adopted babe, but now Kerchak called to her to descend with the rest, and as there was no note of anger in his voice she dropped lightly from branch to branch and joined the others on their homeward march.", "Those of the apes who attempted to examine Kala's strange baby were repulsed with bared fangs and low menacing growls, accompanied by words of warning from Kala.") + tzSrc(tzBk(3)), "▶ Follow them home")),
tzzGo(tzA("forest", 40, 10), "Follow the tribe back up the elephants' path", { r: 8 }),
tzzGo(tzA("forest", 100, -12), "Back to the forest of the table-land", { r: 8 }),
tzzPuzzle("🤲 How Kala carried him", "The other young ride on their mothers' backs. How does Kala carry her new baby?", ["On her back like the others", "Tightly to her breast, with one hand: she had seen one child fall", "In her mouth"], 1, ["No: she had seen one child fall from her back.", "", "No."], { yes: "🤲 " + tzbQ("Not so with Kala; she held the small form of the little Lord Greystoke tightly to her breast, where the dainty hands clutched the long black hair which covered that portion of her body. She had seen one child fall from her back to a terrible death, and she would take no further chances with this.") }),
tzzTalk("Kala", "Kala is settling down with the baby under the great trees: go near her", ["🖤 Kala and the baby", "<p>Kala bares her fangs at you, low and warning, and then, when you keep still, lets you look. The baby is asleep, his small hands knotted in her black hair.</p>" + tzbQs("It was as though she knew that her baby was frail and delicate and feared lest the rough hands of her fellows might injure the little thing.") + tzSrc(tzBk(3)), "▶ The End of Chapter 4"])
] });
tzbCh({ t: "The White Ape", txt: 4, start: { sc: "coast", x: -80, z: -40, ry: Math.PI / 2 }, jump: 1, tune: "jungle", keep: ["rope", "A rope of twisted grasses", "🪢"],
state: { noTribe: true, bones: true },
words: "The years after. Kala's little waif is slow to grow: nearly a year before he will walk alone, and as for climbing, my, but how stupid he is! The tribe has named him Tarzan.",
intro: "The forest",
cast: [
tzc("kala", tzA("forest", 104, -14), { key: "kl", beast: "kala", name: "Kala", persona: "kala", ry: 0.3, until: "ten" }),
tzc("ape", tzA("forest", 116, -4), { key: "tu", beast: "mangani", name: "Tublat", persona: "ape", ry: -2.2, until: "ten" }),
tzc("kerchak", tzA("forest", 128, -24), { key: "k", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: -1.6, until: "ten" }),
tzc("tarzanboy", tzTop(5), { key: "tb", ry: -Math.PI / 2, from: "ten", until: "lake" }),
tzc("tarzanboy", tzA("hole", -1, 1.4), { key: "tb2", ry: -Math.PI / 2, from: "lake", until: "swim" }),
tzc("ape", tzA("hole", -1, -1.4), { key: "cz", beast: "manganiyoung", name: "Tarzan's little cousin", persona: "ape", ry: -Math.PI / 2, from: "lake", until: "sabor" }),
tzc("sabor", tzA("hole", -26, 4), { key: "sb", beast: "sabor", ry: -Math.PI / 2, from: "sabor", until: "gone", mute: true }),
tzc("tarzanboy", tzA("hole", -3, -6), { key: "tb3", ry: Math.PI / 2, from: "swim", until: "night" }),
tzc("kala", tzA("hole", -6, -8), { key: "kl2", beast: "kala", name: "Kala", persona: "kala", ry: Math.PI / 2, from: "gone" }),
tzc("ape", tzA("hole", -10, 4), { key: "a1", beast: "mangani", name: "An ape of the tribe", persona: "ape", ry: Math.PI / 2, from: "gone" }),
tzc("ape", tzA("hole", -14, -4), { key: "a2", beast: "mangani", name: "A mother ape", persona: "ape", ry: Math.PI / 3, s: 0.9, from: "gone" }),
tzc("tarzanboy", tzA("hole", -12, -14), { key: "tb4", ry: 0, from: "night" }),
tzc("ape", tzA("hole", -22, -12), { key: "tu2", beast: "mangani", name: "Tublat", persona: "ape", ry: 2.0, from: "night" })
],
steps: [
{ k: "read" },
tzzRead("🐒 So slow", tzbQs("Tenderly Kala nursed her little waif, wondering silently why it did not gain strength and agility as did the little apes of other mothers. It was nearly a year from the time the little fellow came into her possession before he would walk alone, and as for climbing--my, but how stupid he was!") + tzSrc(tzBk(4))),
tzzGo(tzA("forest", 110, -10), "Go to where Kala sits with her charge, and Tublat glowering near by", { r: 6 }),
tzzSay("Tublat", "Tublat, sorely vexed", "😠 Only a burden", ["\"He will never be a great ape,\" he argued. \"Always will you have to carry him and protect him. What good will he be to the tribe? None; only a burden.", "\"Let us leave him quietly sleeping among the tall grasses, that you may bear other and stronger apes to guard us in our old age.\""], tzBk(4)),
tzzSay("Kala", "Kala's answer", "🖤 Never", ["\"Never, Broken Nose,\" replied Kala. \"If I must carry him forever, so be it.\""], tzBk(4)),
tzzPuzzle("🏷️ His name", "The tribe have given the tiny Lord Greystoke a name. What does Tarzan mean?", ["Little Monkey", "White-Skin", "Lost One"], 1, ["No.", "", "No."], { yes: "🏷️ " + tzbQ("force her to give up little Tarzan, which was the name they had given to the tiny Lord Greystoke, and which meant \"White-Skin.\"") }),
tzzPuzzle("🏃 Kala's threat", "When Kerchak himself tells her to give the child up, what does Kala threaten?", ["To fight Kerchak", "To run away from the tribe if they do not leave her in peace", "To hide the child in the cabin"], 1, ["She is brave, but not foolish.", "", "No."], { yes: "🏃 " + tzbQ("But when Kerchak spoke to her about it Kala threatened to run away from the tribe if they did not leave her in peace with the child; and as this is one of the inalienable rights of the jungle folk") }),
tzzId("ten", tzzRead("🌳 Yet such a boy!", tzbQs("As Tarzan grew he made more rapid strides, so that by the time he was ten years old he was an excellent climber", "He could spring twenty feet across space at the dizzy heights of the forest top, and grasp with unerring precision, and without apparent jar, a limb waving wildly in the path of an approaching tornado.", "Though but ten years old he was fully as strong as the average man of thirty, and far more agile than the most practiced athlete ever becomes.") + tzSrc(tzBk(4)), "▶ Ten years on")),
tzzGo("topway", "Go to the foot of the apes' road through the trees", { r: 4 }),
tzzGo(tzTop(3), "Climb up into the middle terrace after the boy", { r: 3 }),
tzzGo(tzTop(5), "Along the limbs to where he waits for you, laughing", { r: 3 }),
tzzTalk("The boy Tarzan", "Speak to the boy", ["🧒 Tarzan, ten years old", tzbQs("His life among these fierce apes had been happy; for his recollection held no other life, nor did he know that there existed within the universe aught else than his little forest and the wild jungle animals with which he was familiar.") + tzSrc(tzBk(4)), "▶ Go on"]),
tzzPuzzle("🫥 His shame", "Nearly ten, he begins to see how he differs from his fellows. What shames him most about his body?", ["That he is too tall", "That it is entirely hairless, like some low snake", "That he cannot climb"], 1, ["No.", "", "He climbs better than any of them."], { yes: "🫥 " + tzbQ("His little body, burned brown by exposure, suddenly caused him feelings of intense shame, for he realized that it was entirely hairless, like some low snake, or other reptile.") }),
tzzGo(tzTop(9), "On along the road through the trees, toward the higher land", { r: 3 }),
tzzGo(tzTop(13), "And down again at the far end", { r: 3 }),
tzzId("lake", tzzGo(tzA("hole", -3, 0), "Go down to the little lake with Tarzan and his cousin to drink: a sultry day of the dry season", { r: 4 })),
tzzHold(tzA("hole", -3, 0), 6, "Lean over the still water beside them and look at the faces in it", { r: 4 }),
tzzRead("🪞 In the still water", tzbQs("As they leaned over, both little faces were mirrored on the placid pool; the fierce and terrible features of the ape beside those of the aristocratic scion of an old English house.", "That tiny slit of a mouth and those puny white teeth! How they looked beside the mighty lips and powerful fangs of his more fortunate brothers!") + tzSrc(tzBk(4))),
tzzPuzzle("👁️ His eyes", "And the final blow: his own eyes. How do they look to him?", ["Small and red, like an ape's", "A brown spot, a gray circle and then blank whiteness", "Black all over"], 1, ["That is how the apes' look.", "", "No."], { yes: "👁️ " + tzbQ("But when he saw his own eyes; ah, that was the final blow--a brown spot, a gray circle and then blank whiteness! Frightful! not even the snakes had such hideous eyes as he.") }),
tzzId("sabor", tzzReadA("🦁 Sabor", tzbQs("Not thirty paces behind the two she crouched--Sabor, the huge lioness--lashing her tail. Cautiously she moved a great padded paw forward, noiselessly placing it before she lifted the next.", "No longer the tail lashed--quiet and straight behind her it lay.", "An instant she paused thus, as though turned to stone, and then, with an awful scream, she sprang.") + tzSrc(tzBk(4)), "<p>" + tzbQ("Not thirty paces behind the two she crouched--Sabor, the huge lioness--lashing her tail.") + " Neither of them hears her coming. Then, with an awful scream, she springs.</p>" + tzSrc(tzBk(4)))),
tzzPuzzle("💦 Which way?", "Sabor's scream is meant to freeze her prey for an instant. Before Tarzan lie the deep waters he was taught to avoid; behind him, Sabor. What does he do?", ["Freezes, like his cousin", "Jumps into the deep water", "Climbs a tree"], 1, ["That instant is all she needs.", "", "There is no tree within reach."], { yes: "💦 " + tzbQ("But of the two evils his quick mind chose the lesser ere the first note of Sabor's scream had scarce broken the quiet of the jungle, and before the great beast had covered half her leap Tarzan felt the chill waters close above his head.") }),
tzzId("swim", tzzRead("🐕 The stroke a dog uses", tzbQs("He could not swim, and the water was very deep; but still he lost no particle of that self-confidence and resourcefulness which were the badges of his superior being.", "Rapidly he moved his hands and feet in an attempt to scramble upward, and, possibly more by chance than design, he fell into the stroke that a dog uses when swimming, so that within a few seconds his nose was above water") + tzSrc(tzBk(4)))),
tzzPuzzle("📣 His call", "Tarzan swims along the bank. What does he call out?", ["Nothing: he keeps quiet", "The call of distress, with the warning that keeps rescuers out of Sabor's clutches", "Kala's name"], 1, ["No.", "", "The apes have few names for calling."], { yes: "📣 " + tzbQ("Instead he raised his voice in the call of distress common to his tribe, adding to it the warning which would prevent would-be rescuers from running into the clutches of Sabor.") }),
tzzId("gone", tzzRead("🦍 Forty or fifty great apes", tzbQs("Almost immediately there came an answer from the distance, and presently forty or fifty great apes swung rapidly and majestically through the trees toward the scene of tragedy.", "In the lead was Kala, for she had recognized the tones of her best beloved") + tzSrc(tzBk(4)))),
tzzRead("🌊 A daily plunge", tzbQs("The feeling of freshness and exhilaration which the cool waters had imparted to him, filled his little being with grateful surprise, and ever after he lost no opportunity to take a daily plunge in lake or stream or ocean when it was possible to do so.") + tzSrc(tzBk(4))),
tzzHold(tzA("hole", 8, 0), 5, "Go in the water yourself: swim a little way out into the lake, as Tarzan does", { r: 6 }),
tzzId("night", tzzRead("🍃 Where darkness overtook them", tzbQs("At night they slept where darkness overtook them, lying upon the ground, and sometimes covering their heads, and more seldom their bodies, with the great leaves of the elephant's ear.", "thus Tarzan had slept in Kala's arms nightly for all these years.") + tzSrc(tzBk(4)))),
tzzGather("fern", tzA("hole", -12, -12), 4, "Leaves of elephant's ear", "Gather great leaves of elephant's ear for the night", { spread: 10 }),
tzzPuzzle("😤 Tublat", "Tublat always hated Tarzan. How does Tarzan answer him?", ["He keeps out of his way", "He makes faces and hurls insults at him, from the safety of his mother's arms or the higher branches", "He brings him fruit"], 1, ["Not Tarzan.", "", "Hardly."], { yes: "😤 " + tzbQ("whenever he could safely annoy him or make faces at him or hurl insults upon him from the safety of his mother's arms, or the slender branches of the higher trees, he did so.") }),
tzzGather("fern", tzA("hole", -20, 8), 6, "Long grasses", "Gather long grasses at the edge of the lake: Tarzan is teaching you to twist them into a rope", { spread: 9 }),
tzzRead("🪢 A rope of grasses", tzbQs("Early in his boyhood he had learned to form ropes by twisting and tying long grasses together, and with these he was forever tripping Tublat or attempting to hang him from some overhanging branch.", "By constant playing and experimenting with these he learned to tie rude knots, and make sliding nooses; and with these he and the younger apes amused themselves.") + tzSrc(tzBk(4))),
tzzPuzzle("🪢 The new game", "One day his noose fell, by accident, squarely about a running ape's neck. What did Tarzan think?", ["That he had hurt his playmate", "Here was a new game, a fine game", "That he should throw the rope away"], 1, ["The ape was only surprised.", "", "Never."], { yes: "🪢 " + tzbQ("Ah, here was a new game, a fine game, thought Tarzan, and immediately he attempted to repeat the trick. And thus, by painstaking and continued practice, he learned the art of roping.") }),
tzzTalk("Tublat", "Creep up on Tublat with Tarzan's noose", ["🪢 Broken Nose", "<p>The noose settles neatly, Tublat roars and claws at it, and the whole tribe hoots with laughter as Tarzan whisks away into the branches.</p>" + tzbQs("Now, indeed, was the life of Tublat a living nightmare. In sleep, upon the march, night or day, he never knew when that quiet noose would slip about his neck and nearly choke the life out of him.", "The other apes derived unlimited amusement from Tublat's discomfiture, for Broken Nose was a disagreeable old fellow, whom no one liked, anyway.") + tzSrc(tzBk(4)), "▶ Go on"]),
tzzPuzzle("💡 A thought", "In Tarzan's clever little mind a new thought turns over. If he can catch his fellow apes with his long arm of many grasses...", ["...why not a fish?", "...why not Sabor, the lioness?", "...why not the moon?"], 1, ["Smaller than that.", "", "Not yet."], { yes: "💡 " + tzbQ("If he could catch his fellow apes with his long arm of many grasses, why not Sabor, the lioness?") + " " + tzbQ("But that came in later years.") })
] });
tzbCh({ t: "Jungle Battles", txt: 5, start: { sc: "coast", x: -318, z: 6, ry: Math.PI / 2 }, jump: 1, tune: "jungle", keep: ["knife", "Your father's hunting knife", "🔪"],
state: { noTribe: true, bones: true, night: true, nightFrom: "dusk", noLanding: true },
words: "The next visit of the tribe to the coast, after the adventure with Sabor. The closed and silent cabin by the little land-locked harbour has always been a never-ending mystery to Tarzan.",
intro: "The clearing",
cast: [
tzc("tarzanboy", tzA("cabin", 3, -3), { key: "tb", ry: -Math.PI / 2, until: "in" }),
tzc("tarzanboy", tzR("cabin", 1.2, -0.4), { key: "tb2", ry: 0, from: "in", until: "dusk" }),
tzc("tarzanboy", tzA("clearing", 16, -6), { key: "tb3", ry: Math.PI / 2, from: "dusk", until: "kala" }),
tzc("bolgani", tzA("clearing", 22, -8), { key: "bg", beast: "bolgani", ry: -Math.PI / 2, from: "bolgani", until: "kala", mute: true }),
tzc("tarzanboy", tzA("forest", 100, -16), { key: "tb4", ry: 0, lie: true, mute: true, from: "kala", until: "mend" }),
tzc("kala", tzA("forest", 102, -14), { key: "kl", beast: "kala", name: "Kala", persona: "kala", ry: -2.4, from: "kala" }),
tzc("ape", tzA("forest", 120, -24), { key: "tu", beast: "mangani", name: "Tublat", persona: "ape", ry: 2.2, from: "kala" }),
tzc("kerchak", tzA("forest", 126, 0), { key: "k", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: -1.8, from: "kala" }),
tzc("tarzanboy", tzA("forest", 94, -22), { key: "tb5", ry: 0.6, from: "mend" })
],
steps: [
{ k: "read" },
tzzRead("🏚️ The closed cabin", tzbQs("He would peek into the curtained windows, or, climbing upon the roof, peer down the black depths of the chimney in vain endeavor to solve the unknown wonders that lay within those strong walls.") + tzSrc(tzBk(5))),
tzzGo(tzA("cabin", 3, -3), "Go up to the cabin with Tarzan: he is alone, as he often is here, for the apes fear the place", { r: 4 }),
tzzPuzzle("🚪 The door", "Tarzan has always paid the door little heed. What does he notice today, from a distance?", ["That it is painted", "That it appears to be an independent part of the wall, and might be a way in", "That it is broken"], 1, ["No.", "", "No."], { yes: "🚪 " + tzbQ("Tarzan noticed that from a distance the door appeared to be an independent part of the wall in which it was set, and for the first time it occurred to him that this might prove the means of entrance which had so long eluded him.") }),
tzzHold(tzA("cabin", -1.4, 0), 8, "Fuss with the hinges, the knob and the latch with him, for hours", { r: 2.5 }),
tzzRead("🔓 Open", tzbQs("Finally he stumbled upon the right combination, and the door swung creakingly open before his astonished eyes.", "For some minutes he did not dare venture within, but finally, as his eyes became accustomed to the dim light of the interior he slowly and cautiously entered.") + tzSrc(tzBk(5))),
tzzId("in", tzzSpot("The door of the cabin", "Go in after him")),
tzzReadA("🕸️ The room", tzbQs("In the middle of the floor lay a skeleton, every vestige of flesh gone from the bones to which still clung the mildewed and moldered remnants of what had once been clothing. Upon the bed lay a similar gruesome thing, but smaller, while in a tiny cradle near-by was a third, a wee mite of a skeleton.", "To none of these evidences of a fearful tragedy of a long dead day did little Tarzan give but passing heed.") + tzSrc(tzBk(5)), "<p>Long ago, the people who lived here died in this room, and what is left of them lies under the old sailcloth. " + tzbQ("To none of these evidences of a fearful tragedy of a long dead day did little Tarzan give but passing heed.") + " He does not know they were his father and mother.</p>" + tzSrc(tzBk(5))),
tzzRead("🧰 Strange tools and weapons", tzbQs("He examined many things minutely--strange tools and weapons, books, paper, clothing--what little had withstood the ravages of time in the humid atmosphere of the jungle coast.", "He opened chests and cupboards, such as did not baffle his small experience, and in these he found the contents much better preserved.") + tzSrc(tzBk(5))),
tzzFind("knife", tzR("cabin", 2.6, 2.0), "A sharp hunting knife", "Open the chest by the wall: there is something bright inside"),
tzzPuzzle("🩸 The keen blade", "What is the first thing Tarzan does with the hunting knife?", ["Cuts a rope", "Cuts his finger on its keen blade", "Throws it away"], 1, ["No.", "", "Not yet."], { yes: "🩸 " + tzbQ("Among other things he found a sharp hunting knife, on the keen blade of which he immediately proceeded to cut his finger. Undaunted he continued his experiments, finding that he could hack and hew splinters of wood from the table and chairs with this new toy.") }),
tzzSpot("The books on the shelf", "Look in the cupboard filled with books"),
tzzRead("🅰️ A is for Archer", tzbQs("In a cupboard filled with books he came across one with brightly colored pictures--it was a child's illustrated alphabet--", "A is for Archer Who shoots with a bow. B is for Boy, His first name is Joe.") + tzSrc(tzBk(5))),
tzzPuzzle("🐜 The little figures", "Beneath and between the pictures are odd little figures. What does Tarzan take them for?", ["Seeds", "Some strange kind of bug, many of them with legs, but none with eyes and a mouth", "Pictures of birds"], 1, ["No.", "", "No."], { yes: "🐜 " + tzbQ("some strange kind of bug he thought they might be, for many of them had legs though nowhere could he find one with eyes and a mouth. It was his first introduction to the letters of the alphabet, and he was over ten years old.") }),
tzzPuzzle("🦁 Old friends", "Near the middle of the book he finds two he knows. Who?", ["Kala and Kerchak", "His old enemy Sabor, the lioness, and coiled Histah, the snake", "Tantor and Numa"], 1, ["None of his own people are in the book.", "", "Not those."], { yes: "🦁 " + tzbQ("Near the middle of the book he found his old enemy, Sabor, the lioness, and further on, coiled Histah, the snake.") }),
tzzId("dusk", tzzRead("🌒 Dusk", tzbQs("Oh, it was most engrossing! Never before in all his ten years had he enjoyed anything so much. So absorbed was he that he did not note the approaching dusk, until it was quite upon him and the figures were blurred.") + tzSrc(tzBk(5)))),
tzzSpot("The door of the cabin", "Go out with him into the gathering darkness: he closes the great door behind him", { at: tzR("cabin", -3.4, 0) }),
tzzId("bolgani", tzzGo(tzA("clearing", 12, -4), "Walk with him toward the jungle", { r: 4 })),
tzzReadA("🦍 Bolgani", tzbQs("He had taken scarce a dozen steps toward the jungle when a great form rose up before him from the shadows of a low bush. At first he thought it was one of his own people but in another instant he realized that it was Bolgani, the huge gorilla.", "But in one hand he still clutched the knife he had found in the cabin of his father", "But the boy had learned in that brief second a use for his sharp and shining toy, so that, as the tearing, striking beast dragged him to earth he plunged the blade repeatedly and to the hilt into its breast.", "then the little figure stiffened with a spasmodic jerk, and Tarzan, the young Lord Greystoke, rolled unconscious upon the dead and decaying vegetation which carpeted his jungle home.") + tzSrc(tzBk(5)), "<p>" + tzbQ("At first he thought it was one of his own people but in another instant he realized that it was Bolgani, the huge gorilla.") + " There is no running. The boy fights with his bare fists, and then with the knife he found in the cabin. The gorilla falls; and Tarzan, badly hurt, falls too.</p>" + tzSrc(tzBk(5))),
tzzPuzzle("🔪 What saved him?", "Tarzan was no match for the gorilla. What saved him?", ["Kerchak came", "The knife from his father's cabin", "He ran up a tree"], 1, ["Kerchak would not come.", "", "There was no time."], { yes: "🔪 The hunting knife: he had learned in that brief second a use for his sharp and shining toy." }),
tzzRead("🌙 Kala", tzbQs("It was soon discovered that Tarzan was missing, and Tublat was strongly opposed to sending assistance.", "But Kala was of a different mind; in fact, she had not waited but to learn that Tarzan was absent ere she was fairly flying through the matted branches toward the point from which the cries of the gorilla were still plainly audible.") + tzSrc(tzBk(5))),
tzzRead("👻 Like some huge phantom", tzbQs("Like some huge phantom, Kala swung noiselessly from tree to tree; now running nimbly along a great branch, now swinging through space at the end of another", "Presently she came upon them, lying in a little open space full under the brilliant light of the moon--little Tarzan's torn and bloody form, and beside it a great bull gorilla, stone dead.", "Faintly she heard it--the weak beating of the little heart.") + tzSrc(tzBk(5))),
tzzId("kala", tzzGo(tzA("forest", 98, -14), "Follow her as she bears him back through the inky jungle to where the tribe lies", { r: 6 })),
tzzRead("🤲 Many days and nights", tzbQs("Tenderly she bore him back through the inky jungle to where the tribe lay, and for many days and nights she sat guard beside him, bringing him food and water, and brushing the flies and other insects from his cruel wounds.") + tzSrc(tzBk(5))),
tzzFind("jar", tzA("hole", -4, 0), "Water from the lake", "He craves only water: fetch some from the little lake"),
tzzGo(tzA("forest", 98, -14), "Bring it back to Kala", { r: 5 }),
tzzGather("fruit", tzA("forest", 108, 4), 4, "Fruit for Kala", "Kala has scarcely eaten while he was so low: gather fruit for her", { spread: 12 }),
tzzRead("💛 No human mother", tzbQs("No human mother could have shown more unselfish and sacrificing devotion than did this poor, wild brute for the little orphaned waif whom fate had thrown into her keeping.") + tzSrc(tzBk(5))),
tzzId("mend", tzzRead("🩹 He commenced to mend", tzbQs("At last the fever abated and the boy commenced to mend. No word of complaint passed his tight set lips, though the pain of his wounds was excruciating.", "With the stoicism of the brutes who had raised him he endured his suffering quietly, preferring to crawl away from the others and lie huddled in some clump of tall grasses rather than to show his misery before their eyes.") + tzSrc(tzBk(5)))),
tzzTalk("The boy Tarzan", "Find him where he lies in the tall grasses, mending", ["🧒 Tarzan", "<p>He looks up at you with those eyes he hates, a brown spot, a gray circle, and grins. The knife lies by his hand. He will not let it out of his reach again.</p>" + tzbQs("Kala, alone, he was glad to have with him, but now that he was better she was gone longer at a time, in search of food") + tzSrc(tzBk(5)), "▶ The End of Chapter 6"])
] });
var TZ_RING = function (i, n, r, sc) { var a = i / n * Math.PI * 2 + 0.3; return function () { return { sc: "coast", x: TZW_CO.amph[0] + Math.cos(a) * r, z: TZW_CO.amph[1] + Math.sin(a) * r, y: tzwAmphY() }; }; };
var TZ_RINGRY = function (i, n) { var a = i / n * Math.PI * 2 + 0.3; return Math.atan2(-Math.cos(a), -Math.sin(a)); };
tzbCh({ t: "The Light of Knowledge", txt: 6, start: { sc: "coast", x: -304, z: -8, ry: Math.PI / 2 }, jump: 1, tune: "study", keep: ["primer", "A page of the primer: A BOY AND A DOG", "📖"],
state: { noTribe: true, bones: true, night: true, nightFrom: "moon", noLanding: true },
words: "A month or so later. Tarzan is well again, and his first thought is to find the wonderful little weapon that made him the superior of the mighty terror of the jungle.",
intro: "The edge of the clearing",
cast: [
tzc("tarzanboy", tzA("clearing", 20, -10), { key: "tb", ry: Math.PI / 2, until: "in" }),
tzc("tarzanboy", tzRy("cabin", 0.6, 0.2, 0.76), { key: "tb2", ry: 0, from: "in", until: "amph" }),
tzc("tarzanboy", TZ_RING(0, 12, 7), { key: "tb3", ry: TZ_RINGRY(0, 12), from: "amph", until: "flee" }),
tzc("tarzanboy", tzTop(11), { key: "tb4", ry: 0, from: "flee", until: "fight" }),
tzc("tarzanboy", TZ_RING(3, 12, 4), { key: "tb5", ry: TZ_RINGRY(3, 12), from: "fight" }),
tzc("kerchak", TZ_RING(6, 12, 6), { key: "k", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: TZ_RINGRY(6, 12), from: "amph" }),
tzc("kala", TZ_RING(2, 12, 10), { key: "kl", beast: "kala", name: "Kala", persona: "kala", ry: TZ_RINGRY(2, 12), from: "amph", until: "fight" }),
tzc("kala", TZ_RING(3, 12, 6), { key: "kl2", beast: "kala", name: "Kala", persona: "kala", ry: TZ_RINGRY(3, 12), from: "fight" }),
tzc("ape", TZ_RING(8, 12, 8), { key: "tu", beast: "mangani", name: "Tublat", persona: "ape", ry: TZ_RINGRY(8, 12), from: "amph", until: "fight" }),
tzc("ape", TZ_RING(1, 12, 2.4), { key: "d1", beast: "mangani", name: "An old she-ape at the drum", persona: "ape", s: 0.85, ry: TZ_RINGRY(1, 12), from: "amph" }),
tzc("ape", TZ_RING(5, 12, 2.4), { key: "d2", beast: "mangani", name: "An old she-ape with a knotted branch", persona: "ape", s: 0.85, ry: TZ_RINGRY(5, 12), from: "amph" }),
tzc("ape", TZ_RING(9, 12, 2.4), { key: "d3", beast: "mangani", name: "An old she-ape drumming", persona: "ape", s: 0.85, ry: TZ_RINGRY(9, 12), from: "amph" }),
tzc("ape", TZ_RING(4, 12, 9), { key: "a1", beast: "mangani", name: "A great bull of the tribe", persona: "ape", ry: TZ_RINGRY(4, 12), from: "amph" }),
tzc("ape", TZ_RING(7, 12, 9), { key: "a2", beast: "mangani", name: "A bull of the tribe", persona: "ape", ry: TZ_RINGRY(7, 12), from: "amph" }),
tzc("ape", TZ_RING(10, 12, 9), { key: "a3", beast: "mangani", name: "A young bull of the tribe", persona: "ape", s: 0.92, ry: TZ_RINGRY(10, 12), from: "amph" }),
tzc("ape", TZ_RING(11, 12, 13), { key: "a4", beast: "manganiyoung", name: "A young ape", persona: "ape", ry: TZ_RINGRY(11, 12), from: "amph" }),
tzc("ape", TZ_RING(0, 12, 13), { key: "a5", beast: "mangani", name: "A mother of the tribe", persona: "ape", s: 0.9, ry: TZ_RINGRY(0, 12), from: "amph" }),
tzc("ape", TZ_RING(6, 12, 13), { key: "a6", beast: "manganiyoung", name: "A little ape", persona: "ape", s: 0.8, ry: TZ_RINGRY(6, 12), from: "amph" })
],
steps: [
{ k: "read" },
tzzRead("🔪 The wonderful little weapon", tzbQs("During his convalescence he had gone over in his mind many times the battle with the gorilla, and his first thought was to recover the wonderful little weapon which had transformed him from a hopelessly outclassed weakling to the superior of the mighty terror of the jungle.") + tzSrc(tzBk(6))),
tzzFind("knife", tzA("clearing", 18, -8), "The hunting knife, red with rust", "Search with him near the clean-picked bones of the gorilla: the knife is partly buried under the fallen leaves"),
tzzPuzzle("😤 No more", "It is rusty now, but still a formidable weapon. What has Tarzan in mind?", ["To hide it in the cabin", "That no more would he run from the wanton attacks of old Tublat", "To give it to Kala"], 1, ["No.", "", "No."], { yes: "😤 " + tzbQ("He had in mind that no more would he run from the wanton attacks of old Tublat.") }),
tzzGo(tzA("cabin", -1, 0), "On to the cabin", { r: 3 }),
tzzRead("🔐 The lock", tzbQs("His first concern was to learn the mechanism of the lock, and this he did by examining it closely while the door was open, so that he could learn precisely what caused it to hold the door, and by what means it released at his touch.", "He found that he could close and lock the door from within") + tzSrc(tzBk(6))),
tzzId("in", tzzSpot("The door of the cabin", "Go in with him; he locks it behind you")),
tzzRead("📖 Little primitive man", tzbQs("Squatting upon his haunches on the table top in the cabin his father had built--his smooth, brown, naked little body bent over the book which rested in his strong slender hands, and his great shock of long, black hair falling about his well-shaped head and bright, intelligent eyes--Tarzan of the apes, little primitive man, presented a picture filled, at once, with pathos and with promise") + tzSrc(tzBk(6))),
tzzPuzzle("🔤 Three little bugs", "In the primer is a picture of a little ape like himself, but in strange coloured fur (a jacket and trousers). Beneath it are three little bugs, repeated again and again. Which three?", ["A-P-E", "B-O-Y", "M-A-N"], 1, ["Look at the picture again.", "", "Not yet: that comes later."], { yes: "🔤 B-O-Y. " + tzbQ("Presently he found it beneath a picture of another little ape and a strange animal which went upon four legs like the jackal and resembled him not a little. Beneath this picture the bugs appeared as:") + " A BOY AND A DOG" }),
tzzPuzzle("🐕 A BOY AND A DOG", "Under the picture of the boy and the dog are the bugs A BOY AND A DOG. Tarzan knows B-O-Y is the little ape. Which bugs must then stand for the four-legged beast like a jackal?", ["A", "AND", "DOG"], 2, ["A stands alone.", "That one joins them.", ""], { yes: "🐕 " + tzbQ("There they were, the three little bugs which always accompanied the little ape.") }),
tzzRead("⏳ Very, very slowly", tzbQs("He did not accomplish it in a day, or in a week, or in a month, or in a year; but slowly, very slowly, he learned after he had grasped the possibilities which lay in those little bugs, so that by the time he was fifteen he knew the various combinations of letters which stood for every pictured figure in the little primer and in one or two of the picture books.") + tzSrc(tzBk(6))),
tzzFind("pencil", tzR("cabin", 0.6, 0.7), "Lead pencils", "About twelve, he finds a drawer under the table no one had opened: look in it"),
tzzPuzzle("✏️ How to hold it", "He scratches the table top into a mass of scrawly loops. How does he hold the pencil at first?", ["Between finger and thumb, as we do", "As one would grasp the hilt of a dagger", "In his teeth"], 1, ["That took him months to find.", "", "No."], { yes: "✏️ " + tzbQ("It was a difficult task, for he held the pencil as one would grasp the hilt of a dagger, which does not add greatly to ease in writing or to the legibility of the results.") }),
tzzPuzzle("✋ Counting", "Copying the bugs teaches him their number. He cannot count as we do; what is the base of his reckoning?", ["The moons", "The fingers upon one of his hands", "The apes of his family"], 1, ["No.", "", "No."], { yes: "✋ " + tzbQ("yet he had an idea of quantity, the base of his calculations being the number of fingers upon one of his hands.") }),
tzzSpot("The books on the shelf", "Take down the huge illustrated dictionary"),
tzzRead("📚 The great dictionary", tzbQs("His education progressed; but his greatest finds were in the inexhaustible storehouse of the huge illustrated dictionary, for he learned more through the medium of pictures than text, even after he had grasped the significance of the bugs.") + tzSrc(tzBk(6))),
tzzPuzzle("🧑 M-A-N", "By seventeen he can read the simple primer. And he has worked out what he is. What?", ["An A-P-E with no hair", "A M-A-N; they are A-P-E-S", "A M-O-N-K-E-Y"], 1, ["Not any longer.", "", "No."], { yes: "🧑 " + tzbQ("No longer did he feel shame for his hairless body or his human features, for now his reason told him that he was of a different race from his wild and hairy companions. He was a M-A-N, they were A-P-E-S") }),
tzzFind("stone", tzA("stream", -2, 0), "A flat whetstone", "He keeps his knife keen by whetting it on flat stones: find one by the stream"),
tzzRead("🪵 Copy books", tzbQs("Pieces of bark and flat leaves and even smooth stretches of bare earth provided him with copy books whereon to scratch with the point of his hunting knife the lessons he was learning.", "He practiced with his rope and played with his sharp knife, which he had learned to keep keen by whetting upon flat stones.") + tzSrc(tzBk(6))),
tzzGo("topway", "He is about thirteen. Today the tribe goes to the amphitheatre: take the apes' road through the trees", { r: 4 }),
tzzGo(tzTop(7), "Along the middle terrace", { r: 3 }),
tzzGo(tzTop(12), "On, and down again to the amphitheatre", { r: 3 }),
tzzId("amph", tzzGo("amph", "Drop down into the little level arena", { r: 6 })),
tzzRead("🥁 The amphitheatre", tzbQs("The open space was almost circular in shape. Upon every hand rose the mighty giants of the untouched forest, with the matted undergrowth banked so closely between the huge trunks that the only opening into the little, level arena was through the upper branches of the trees.", "In the center of the amphitheater was one of those strange earthen drums which the anthropoids build for the queer rites the sounds of which men have heard in the fastnesses of the jungle, but which none has ever witnessed.") + tzSrc(tzBk(6))),
tzzRead("🌕 The Dum-Dum", tzbQs("Many travelers have seen the drums of the great apes, and some have heard the sounds of their beating and the noise of the wild, weird revelry of these first lords of the jungle, but Tarzan, Lord Greystoke, is, doubtless, the only human being who ever joined in the fierce, mad, intoxicating revel of the Dum-Dum.") + tzSrc(tzBk(6))),
tzzPuzzle("🥁 What it marks", "The rites of the Dum-Dum mark the important events of the tribe. Which of these is NOT one?", ["A victory, or the capture of a prisoner", "The killing of some large fierce beast", "The death or accession of a king", "The first rains of the year"], 3, ["It is one.", "It is one.", "It is one.", ""], { yes: "🥁 " + tzbQ("The rites of the Dum-Dum marked important events in the life of the tribe--a victory, the capture of a prisoner, the killing of some large fierce denizen of the jungle, the death or accession of a king, and were conducted with set ceremonialism.") }),
tzzHold("amph", 10, "Curl up in a grassy nook at the edge of the arena with the tribe, and wait for the rising moon", { r: 14 }),
tzzId("moon", tzzRead("🌕 Moonrise", tzbQs("At length as darkness settled upon the jungle the apes commenced to bestir themselves, and soon they formed a great circle about the earthen drum.", "Slowly and softly they began tapping upon the resounding surface of the drum as the first faint rays of the ascending moon silvered the encircling tree tops.") + tzSrc(tzBk(6)))),
tzzHold(TZ_RING(4, 12, 6), 10, "Take your place in the circle and listen to the drum swell until it booms for miles", { r: 3 }),
tzzRead("🌙 Kerchak's cry", tzbQs("As the din of the drum rose to almost deafening volume Kerchak sprang into the open space between the squatting males and the drummers.", "Standing erect he threw his head far back and looking full into the eye of the rising moon he beat upon his breast with his great hairy paws and emitted his fearful roaring shriek.", "One--twice--thrice that terrifying cry rang out across the teeming solitude of that unspeakably quick, yet unthinkably dead, world.") + tzSrc(tzBk(6))),
tzzReadA("💃 The Dance of Death", tzbQs("It was the challenge and the hunt.", "Tarzan was one of the wild, leaping horde. His brown, sweat-streaked, muscular body, glistening in the moonlight, shone supple and graceful among the uncouth, awkward, hairy brutes about him.", "None was more stealthy in the mimic hunt, none more ferocious than he in the wild ferocity of the attack, none who leaped so high into the air in the Dance of Death.") + tzSrc(tzBk(6)), "<p>The great bulls leap and circle round the drum in a mimic hunt, and Tarzan with them. " + tzbQ("none who leaped so high into the air in the Dance of Death.") + " At a sign from Kerchak the drums stop, and the feast begins.</p>" + tzSrc(tzBk(6))),
tzzHold(TZ_RING(3, 12, 4), 8, "Dance with them: circle the drum with the leaping horde", { r: 5 }),
tzzReadA("🍖 His share", tzbQs("Tarzan, more than the apes, craved and needed flesh.", "At his side hung the hunting knife of his unknown father in a sheath self-fashioned in copy of one he had seen among the pictures of his treasure-books.", "So little Tarzan wriggled out from beneath the struggling mass, clutching his grisly prize close to his breast.") + tzSrc(tzBk(6)), "<p>" + tzbQ("Tarzan, more than the apes, craved and needed flesh.") + " With his knife he cuts himself a share of the feast from under the very feet of Kerchak, and wriggles out of the crowd with it.</p>" + tzSrc(tzBk(6))),
tzzRead("👁️ Tublat", tzbQs("Tublat's little, close-set, bloodshot, pig-eyes shot wicked gleams of hate as they fell upon the object of his loathing. In them, too, was greed for the toothsome dainty the boy carried.") + tzSrc(tzBk(6))),
tzzId("flee", tzzGo(tzTop(11), "Run! Up into the trees with Tarzan, up the apes' road where heavy Tublat dare not follow", { r: 3 })),
tzzReadA("🌕 Tublat went mad", tzbQs("And then Tublat went mad.", "In the brilliant moonlight Tarzan witnessed the whole mad carnival of rage. He saw the females and the young scamper to the safety of the trees.", "There was but one in the amphitheater beside Tublat, a belated female running swiftly toward the tree where Tarzan perched, and close behind her came the awful Tublat.") + tzSrc(tzBk(6)), "<p>" + tzbQ("And then Tublat went mad.") + " He rushes among the tribe in a fury and they all flee into the trees, all but one, running for the tree where Tarzan perches, with Tublat close behind her. It is Kala.</p>" + tzSrc(tzBk(6))),
tzzId("fight", tzzGo(TZ_RING(3, 12, 5), "Down! Drop from branch to branch to Kala", { r: 4 })),
tzzReadA("🔪 Between him and Kala", tzbQs("Both were up in an instant, but as quick as they had been Tarzan had been quicker, so that the infuriated bull found himself facing the man-child who stood between him and Kala.", "A muscular hand shot out and grasped the hairy throat, and another plunged a keen hunting knife a dozen times into the broad breast. Like lightning the blows fell, and only ceased when Tarzan felt the limp form crumple beneath him.", "As the body rolled to the ground Tarzan of the Apes placed his foot upon the neck of his lifelong enemy and, raising his eyes to the full moon, threw back his fierce young head and voiced the wild and terrible cry of his people.") + tzSrc(tzBk(6)), "<p>" + tzbQ("Both were up in an instant, but as quick as they had been Tarzan had been quicker, so that the infuriated bull found himself facing the man-child who stood between him and Kala.") + " Tublat leaps, and Tarzan's knife is quicker. Then the boy throws back his head to the full moon and gives the wild cry of his people.</p>" + tzSrc(tzBk(6))),
tzzSay("The boy Tarzan", "The tribe comes down and makes a circle round him: Tarzan", "🗣️ I am Tarzan", ["\"I am Tarzan,\" he cried. \"I am a great killer. Let all respect Tarzan of the Apes and Kala, his mother. There be none among you as mighty as Tarzan. Let his enemies beware.\""], tzBk(6)),
tzzPuzzle("👀 Whose eyes?", "Then Tarzan beats upon his breast and screams once more his cry of defiance, looking full into whose eyes?", ["Kala's", "The wicked, red eyes of Kerchak", "The moon's"], 1, ["No.", "", "He looked at the moon before."], { yes: "👀 " + tzbQ("Looking full into the wicked, red eyes of Kerchak, the young Lord Greystoke beat upon his mighty breast and screamed out once more his shrill cry of defiance.") })
] });
tzbCh({ t: "The Tree-top Hunter", txt: 7, start: { sc: "coast", x: -6, z: -86, ry: -Math.PI / 2 }, jump: 1, tune: "chase", keep: ["sabor", "A twig flung at Sabor's face", "🪵"],
state: { noTribe: true, bones: true, noLanding: true, env: tzOn("storm", "calm", "storm") },
words: "The morning after the Dum-Dum. The tribe starts slowly back through the forest toward the coast, foraging as it goes.",
intro: "The amphitheatre",
cast: [
tzc("tarzanboy", tzA("forest", 60, -40), { key: "tb", ry: Math.PI / 2, until: "storm" }),
tzc("sabor", tzA("forest", 64, -30), { key: "sb", beast: "sabor", ry: Math.PI, from: "sabor1", until: "plan", mute: true }),
tzc("kala", tzA("forest", 52, -36), { key: "kl", beast: "kala", name: "Kala", persona: "kala", ry: Math.PI / 2, until: "horta" }),
tzc("kerchak", tzA("forest", 70, -48), { key: "k", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: -Math.PI / 2, until: "horta" }),
tzc("ape", tzA("forest", 44, -52), { key: "a1", beast: "mangani", name: "An ape of the tribe", persona: "ape", ry: 0.6, until: "horta" }),
tzc("ape", tzA("forest", 76, -26), { key: "a2", beast: "manganiyoung", name: "A young ape", persona: "ape", ry: 2.6, until: "horta" }),
tzc("tarzanboy", tzA("forest", 56, -44), { key: "tb2", ry: 0, from: "storm", until: "horta" }),
tzc("boar", tzA("perchtrail", -14, 0), { key: "bo", beast: "boar", ry: Math.PI / 2, from: "horta", until: "rope", mute: true }),
tzc("tarzanboy", tzPerch(4), { key: "tb3", ry: Math.PI / 2, from: "rope", until: "home" }),
tzc("sabor", tzA("perchtrail", -16, 0), { key: "sb2", beast: "sabor", ry: Math.PI / 2, from: "sabor2", until: "home", mute: true }),
tzc("kala", tzA("forest", 104, -16), { key: "kl2", beast: "kala", name: "Kala", persona: "kala", ry: 0.3, from: "home" }),
tzc("tarzanboy", tzA("forest", 100, -12), { key: "tb4", ry: Math.PI, from: "home" }),
tzc("ape", tzA("forest", 112, -2), { key: "a3", beast: "mangani", name: "An ape of the tribe", persona: "ape", ry: -2.4, from: "home" })
],
steps: [
{ k: "read" },
tzzRead("🍍 A leisurely search for food", tzbQs("The body of Tublat lay where it had fallen, for the people of Kerchak do not eat their own dead.", "Cabbage palm and gray plum, pisang and scitamine they found in abundance, with wild pineapple, and occasionally small mammals, birds, eggs, reptiles, and insects. The nuts they cracked between their powerful jaws, or, if too hard, broke by pounding between stones.") + tzSrc(tzBk(7))),
tzzGo(tzA("forest", 60, -40), "Go along with the tribe toward the coast", { r: 8 }),
tzzGather("fruit", tzA("forest", 58, -50), 5, "Gray plum and pisang", "Forage with them: gray plum, pisang, wild pineapple", { spread: 12 }),
tzzGather("nuts", tzA("forest", 66, -32), 4, "Hard nuts", "And nuts: the hard ones must be broken between stones", { spread: 10 }),
tzzId("sabor1", tzzRead("🍍 A pineapple for Sabor", tzbQs("Once old Sabor, crossing their path, sent them scurrying to the safety of the higher branches", "Upon a low-hanging branch sat Tarzan directly above the majestic, supple body as it forged silently through the thick jungle. He hurled a pineapple at the ancient enemy of his people. The great beast stopped and, turning, eyed the taunting figure above her.") + tzSrc(tzBk(7)))),
tzzRead("🦁 Her challenge", tzbQs("With back-laid ears she looked straight into the eyes of Tarzan of the Apes and sounded her fierce, shrill challenge. And from the safety of his overhanging limb the ape-child sent back the fearsome answer of his kind.", "For a moment the two eyed each other in silence, and then the great cat turned into the jungle, which swallowed her as the ocean engulfs a tossed pebble.") + tzSrc(tzBk(7))),
tzzId("plan", tzzPuzzle("💡 A great plan", "Into Tarzan's mind springs a great plan. He killed the fierce Tublat. So...", ["...he will be king of the apes", "...he will track down the crafty Sabor and slay her likewise", "...he will go and live in the cabin"], 1, ["That comes later.", "", "Not yet."], { yes: "💡 " + tzbQ("Now would he track down the crafty Sabor and slay her likewise. He would be a mighty hunter, also.") })),
tzzPuzzle("👕 CLOTHES", "At the bottom of his little English heart beats a great desire. For what?", ["For a hut of his own", "To cover his nakedness with CLOTHES, for all MEN in his picture books are so covered", "For a gun"], 1, ["No.", "", "No."], { yes: "👕 " + tzbQ("CLOTHES therefore, must be truly a badge of greatness; the insignia of the superiority of MAN over all other animals, for surely there could be no other reason for wearing the hideous things.") }),
tzzId("storm", tzzRead("⛈️ It became as midnight", tzbQs("Suddenly it became as midnight; the noises of the jungle ceased; the trees stood motionless as though in paralyzed expectancy of some great and imminent disaster. All nature waited--but not for long.", "Faintly, from a distance, came a low, sad moaning. Nearer and nearer it approached, mounting louder and louder in volume.") + tzSrc(tzBk(7)))),
tzzRead("🌪️ All hell broke loose", tzbQs("Then, suddenly, the jungle giants whipped back, lashing their mighty tops in angry and deafening protest. A vivid and blinding light flashed from the whirling, inky clouds above. The deep cannonade of roaring thunder belched forth its fearsome challenge. The deluge came--all hell broke loose upon the jungle.") + tzSrc(tzBk(7))),
tzzHold(tzA("forest", 56, -42), 14, "Huddle at the base of a great tree with the shivering tribe while the tornado passes over", { r: 5 }),
tzzId("calm", tzzRead("☀️ Nature smiled once more", tzbQs("The end was as sudden as the beginning. The wind ceased, the sun shone forth--nature smiled once more.", "But to Tarzan a dawning light had come to explain the mystery of CLOTHES. How snug he would have been beneath the heavy coat of Sabor! And so was added a further incentive to the adventure.") + tzSrc(tzBk(7)))),
tzzRead("🪢 The quick thrown noose", tzbQs("For several months the tribe hovered near the beach where stood Tarzan's cabin, and his studies took up the greater portion of his time, but always when journeying through the forest he kept his rope in readiness, and many were the smaller animals that fell into the snare of the quick thrown noose.") + tzSrc(tzBk(7))),
tzzId("horta", tzzGo(tzA("perchtrail", -6, 0), "Come down the trail to the water with him", { r: 5 })),
tzzReadA("🐗 Horta", tzbQs("Once it fell about the short neck of Horta, the boar, and his mad lunge for freedom toppled Tarzan from the overhanging limb where he had lain in wait and from whence he had launched his sinuous coil.", "He was on his feet in an instant and, leaping with the agility of the monkey he was, he gained the safety of a low limb as Horta, the boar, rushed futilely beneath.") + tzSrc(tzBk(7)), "<p>Tarzan's noose catches Horta the boar, and the boar's lunge pulls him clean off his branch. Horta charges; but Tarzan lands like a cat and is up a low limb before the tusks can reach him. He has lost his rope.</p>" + tzSrc(tzBk(7))),
tzzPuzzle("🧠 What he learned", "Tarzan lost a long rope to Horta. What did he learn?", ["That ropes are useless", "The limitations as well as the possibilities of his strange weapon: had it been Sabor, he would have lost his life too", "To hunt only small animals"], 1, ["No.", "", "Not for long."], { yes: "🧠 " + tzbQ("Thus it was that Tarzan learned by experience the limitations as well as the possibilities of his strange weapon.") }),
tzzGather("fern", tzA("perchtrail", 10, -8), 8, "Long grasses for a new rope", "It takes many days to braid a new rope: gather the long grasses with him", { spread: 12 }),
tzzId("rope", tzzGo("perchfoot", "He means to lie in wait above the well-beaten trail that leads to water. Go to the foot of the great tree", { r: 3 })),
tzzGo(tzPerch(4), "Climb up and out along the great branch over the trail", { r: 1.6 }),
tzzHold(tzPerch(4), 10, "Lie in wait among the dense foliage. Several small animals pass beneath: let them go", { r: 2 }),
tzzId("sabor2", tzzRead("🦁 Fat and glossy came Sabor", tzbQs("At last came she whom Tarzan sought, with lithe sinews rolling beneath shimmering hide; fat and glossy came Sabor, the lioness.", "Like a thing of bronze, motionless as death, sat Tarzan. Sabor passed beneath. One stride beyond she took--a second, a third, and then the silent coil shot out above her.") + tzSrc(tzBk(7)))),
tzzPuzzle("🪢 Sabor was trapped", "The noose settles round her neck. With Horta he lost his rope. What does he do differently this time?", ["Holds on with both hands", "Drops the rope and clings to the branch, for he had fastened its end to the tree", "Jumps down on her"], 1, ["That is how he fell before.", "", "No."], { yes: "🪢 " + tzbQ("Sabor was trapped.") + " " + tzbQ("He had learned from experience.") }),
tzzRead("😾 A very different proposition", tzbQs("Thus far his plan had worked to perfection, but when he grasped the rope, bracing himself behind a crotch of two mighty branches, he found that dragging the mighty, struggling, clawing, biting, screaming mass of iron-muscled fury up to the tree and hanging her was a very different proposition.", "Presently the beast dropped to the earth again and Tarzan came quickly to seize the rope, but Sabor had now found that it was only a slender cord that held her, and grasping it in her huge jaws severed it before Tarzan could tighten the strangling noose a second time.") + tzSrc(tzBk(7))),
tzzFind("fruit", tzPerch(-3), "A well-aimed ripe fruit", "Sabor paces below for hours. Pick a ripe fruit off the branch for Tarzan's parting shot"),
tzzRead("🍑 A parting roar", tzbQs("At last Tarzan tired of the sport, and with a parting roar of challenge and a well-aimed ripe fruit that spread soft and sticky over the snarling face of his enemy, he swung rapidly through the trees, a hundred feet above the ground, and in a short time was among the members of his tribe.") + tzSrc(tzBk(7))),
tzzId("home", tzzGo(tzA("forest", 102, -10), "Back to the tribe", { r: 6 })),
tzzTalk("Kala", "Kala is dancing for joy and pride", ["🖤 Kala", tzbQs("Here he recounted the details of his adventure, with swelling chest and so considerable swagger that he quite impressed even his bitterest enemies, while Kala fairly danced for joy and pride.") + tzSrc(tzBk(7)), "▶ The End of Chapter 8"])
] });
tzbCh({ t: "Man and Man", txt: 8, start: { sc: "coast", x: -760, z: 842, y: -80, ry: 0 }, jump: 1, tune: "grief", keep: ["anklet", "A copper anklet", "🟤"],
state: { noTribe: true, bones: true, noLanding: true, night: true, nightFrom: "night", nightUntil: "dawn" },
words: "Several years on. Tarzan of the Apes is eighteen, reads fluently, and has never seen a human being other than himself. He is in his father's cabin with a new book.",
intro: "The cabin",
cast: [
tzc("tarzan", tzRy("cabin", 0.4, 0.2, 0.0), { key: "t", ry: 0, until: "kala" }),
tzc("elephant", tzA("clearing", 30, 24), { key: "tan", beast: "elephant", ry: -1.2, until: "kala", mute: true }),
tzc("kala", tzA("trail", -30, 26), { key: "kl", beast: "kala", name: "Kala", persona: "kala", ry: Math.PI / 2 * 1.4, until: "shot" }),
tzc("villager", tzA("trail", 10, -2), { key: "ku", dress: "tzvillm", sex: "m", name: "Kulonga, son of Mbonga", persona: "villager", greet: "...", ry: -Math.PI / 2 * 1.3, from: "kulonga", until: "shot" }),
tzc("kala", tzA("trail", -34, 30), { key: "kl2", beast: "kala", name: "Kala", persona: "kala", lie: true, mute: true, ry: 0, from: "shot", until: "track" }),
tzc("tarzan", tzA("trail", -30, 26), { key: "t2", ry: Math.PI, from: "grief", until: "track" }),
tzc("ape", tzA("trail", -40, 22), { key: "a1", beast: "mangani", name: "An ape of the tribe", persona: "ape", ry: 0.8, from: "shot", until: "track" }),
tzc("ape", tzA("trail", -26, 34), { key: "a2", beast: "mangani", name: "Kerchak", persona: "kerchak", ry: 2.4, from: "shot", until: "track" }),
tzc("boar", tzA("perchtrail", 14, 4), { key: "bo", beast: "boar", ry: -Math.PI / 2, from: "horta", until: "fire", mute: true }),
tzc("villager", tzA("perchtrail", -8, 0), { key: "ku2", dress: "tzvillm", sex: "m", name: "Kulonga, son of Mbonga", persona: "villager", greet: "...", ry: -Math.PI / 2, from: "horta", until: "night" }),
tzc("villager", tzA("fields", -14, 20), { key: "ku3", dress: "tzvillm", sex: "m", name: "Kulonga, son of Mbonga", persona: "villager", greet: "...", ry: Math.PI, from: "dawn", until: "noose" }),
tzc("tarzan", tzA("fields", -18, 26), { key: "t3", ry: Math.PI, from: "noose" })
],
steps: [
{ k: "read" },
tzzRead("🐆 Quick was Sabor", tzbQs("To him life was never monotonous or stale. There was always Pisah, the fish, to be caught in the many streams and the little lakes, and Sabor, with her ferocious cousins to keep one ever on the alert and give zest to every instant that one spent upon the ground.", "Quick was Sabor, the lioness, and quick were Numa and Sheeta, but Tarzan of the Apes was lightning.") + tzSrc(tzBk(8))),
tzzPuzzle("🐘 A friend", "Tarzan made friends with one great beast of the jungle, and rode on his back on moonlight nights. Who?", ["Numa, the lion", "Tantor, the elephant", "Bolgani, the gorilla"], 1, ["No.", "", "Hardly."], { yes: "🐘 " + tzbQ("With Tantor, the elephant, he made friends. How? Ask not.") }),
tzzRead("📚 At eighteen", tzbQs("At eighteen he read fluently and understood nearly all he read in the many and varied volumes on the shelves.", "Thus, at eighteen, we find him, an English lordling, who could speak no English, and yet who could read and write his native language. Never had he seen a human being other than himself") + tzSrc(tzBk(8))),
tzzPuzzle("✍️ Script", "Tarzan can write printed letters, rapidly and plainly. Why has he not learned script?", ["He cannot hold the pencil", "There was so little written English in the cabin that he saw no use for it", "The books forbid it"], 1, ["He mastered that years ago.", "", "No."], { yes: "✍️ " + tzbQ("there was so little written English in the cabin that he saw no use for bothering with this other form of writing, though he could read it, laboriously.") }),
tzzRead("🛡️ A strange cavalcade", tzbQs("But as Tarzan of the Apes sat one day in the cabin of his father delving into the mysteries of a new book, the ancient security of his jungle was broken forever.", "At the far eastern confine a strange cavalcade strung, in single file, over the brow of a low hill.", "Following them were several hundred women and children, the former bearing upon their heads great burdens of cooking pots, household utensils and ivory.") + tzSrc(tzBk(8))),
tzzPuzzle("⛓️ Fleeing", "Why has Mbonga's people come so far into this unknown forest?", ["They are hunting ivory", "They are fleeing from the white man's soldiers, who had harassed them for rubber and ivory", "They are looking for the sea"], 1, ["They carry ivory; they are not hunting it.", "", "No."], { yes: "⛓️ The soldiers of the same European power Lord Greystoke had been sent to look into, so long before: " + tzbQ("for they were fleeing from the white man's soldiers who had so harassed them for rubber and ivory") }),
tzzRead("🏘️ A new village", tzbQs("Here they set to work to build a new village, and in a month a great clearing had been made, huts and palisades erected, plantains, yams and maize planted, and they had taken up their old life in their new home. Here there were no white men, no soldiers, nor any rubber or ivory to be gathered for cruel and thankless taskmasters.") + tzSrc(tzBk(8))),
tzzSpot("The door of the cabin", "Out of the cabin: the tribe is foraging inland", { at: tzR("cabin", -3.4, 0) }),
tzzId("kala", tzzGo(tzA("trail", -34, 30), "Go east along the elephant track where Kala is turning over rotted logs for bugs and fungi", { r: 6 })),
tzzGather("root", tzA("trail", -30, 24), 4, "Fungi on rotted logs", "Help her search the rotted limbs and logs", { spread: 9 }),
tzzId("kulonga", tzzRead("🏹 It was Kulonga", tzbQs("For fifty yards before her the trail was straight, and down this leafy tunnel she saw the stealthy advancing figure of a strange and fearful creature.", "It was Kulonga.") + tzSrc(tzBk(8)))),
tzzId("shot", tzzReadA("💔 Kala", tzbQs("A poor cast. It but grazed her side.", "As she charged, Kulonga unslung his bow and fitted an arrow with almost unthinkable quickness. Drawing the shaft far back he drove the poisoned missile straight into the heart of the great anthropoid.", "With a horrid scream Kala plunged forward upon her face before the astonished members of her tribe.") + tzSrc(tzBk(8)), "<p>Kulonga's spear only grazes her, and Kala turns on him; but his arrow is poisoned, and it strikes her. Kala falls, and does not get up. The apes chase Kulonga, but he runs like an antelope, and they lose him.</p>" + tzSrc(tzBk(8)))),
tzzId("grief", tzzRead("😢 The only creature", tzbQs("When he arrived he found the entire tribe gathered jabbering about the dead body of his slain mother.", "To lose the only creature in all his world who ever had manifested love and affection for him was the greatest tragedy he had ever known.", "What though Kala was a fierce and hideous ape! To Tarzan she had been kind, she had been beautiful.") + tzSrc(tzBk(8)))),
tzzHold(tzA("trail", -32, 28), 8, "Stay with him a while beside her", { r: 4 }),
tzzPuzzle("🪶 What the apes told him", "Tarzan asks the tribe what they saw. With their few words, what can they tell him?", ["That Sabor killed her", "Of a strange, hairless black ape with feathers on its head, who launched death from a slender branch, and ran toward the rising sun", "That she fell from a tree"], 1, ["No.", "", "No."], { yes: "🪶 " + tzbQ("It told him of a strange, hairless, black ape with feathers growing upon its head, who launched death from a slender branch, and then ran, with the fleetness of Bara, the deer, toward the rising sun.") }),
tzzId("track", tzzGo(tzA("perchtrail", -30, 0), "Follow Tarzan as he cuts straight through the jungle to intercept the trail", { r: 6 })),
tzzHold(tzA("perchtrail", -26, 2), 6, "Kneel with him in the soft mud by a tiny rivulet and examine the prints", { r: 3 }),
tzzPuzzle("👣 The footprints", "In the mud are footprints like those he alone in all the jungle has ever made, but much larger. What does Tarzan wonder?", ["If it is Bolgani", "If he is trailing a MAN, one of his own race", "If it is a ghost"], 1, ["The gorilla's hands and feet are not like that.", "", "No."], { yes: "👣 " + tzbQ("His heart beat fast. Could it be that he was trailing a MAN--one of his own race?") }),
tzzId("horta", tzzGo(tzPerch(-4), "Up into the trees and along above the trail: climb the great branch and look down", { r: 2 })),
tzzRead("🏹 The Archer", tzbQs("Tarzan looked with wonder upon the strange creature beneath him--so like him in form and yet so different in face and color.", "As the man stood there with taut drawn bow Tarzan recognized him not so much the NEGRO as the ARCHER of his picture book--", "How wonderful! Tarzan almost betrayed his presence in the deep excitement of his discovery.") + tzSrc(tzBk(8))),
tzzPuzzle("🅰️ A stands for...", "Which page of his old alphabet book is the man below like?", ["B is for Boy", "A stands for Archer", "M is for Monkey"], 1, ["No.", "", "No."], { yes: "🅰️ " + tzbQ("A stands for Archer") }),
tzzRead("🐗 Horta charges", tzbQs("Horta, the boar, was charging, and then the black released the little poisoned arrow, and Tarzan saw it fly with the quickness of thought and lodge in the bristling neck of the boar.", "With a bound the black leaped entirely over the rushing beast and turning with incredible swiftness planted a second arrow in Horta's back.") + tzSrc(tzBk(8))),
tzzId("fire", tzzPuzzle("🔥 The red-and-yellow fangs", "Kulonga builds a fire in the trail and cooks his meat. What does Tarzan make of fire?", ["He has made it many times", "He had seen it only when Ara, the lightning, destroyed a tree, and thinks cooking ruins good meat", "He is afraid of it and runs"], 1, ["Never.", "", "He is surprised, not afraid."], { yes: "🔥 " + tzbQ("He had seen fire, but only when Ara, the lightning, had destroyed some great tree. That any creature of the jungle could produce the red-and-yellow fangs which devoured wood and left nothing but fine dust surprised Tarzan greatly") })),
tzzRead("🎩 In far-off London", tzbQs("And then Lord Greystoke wiped his greasy fingers upon his naked thighs and took up the trail of Kulonga, the son of Mbonga, the king; while in far-off London another Lord Greystoke, the younger brother of the real Lord Greystoke's father, sent back his chops to the club's CHEF because they were underdone") + tzSrc(tzBk(8))),
tzzRead("🧪 Tiny slivers of wood", tzbQs("No, there was something mysterious connected with these tiny slivers of wood which could bring death by a mere scratch. He must look into the matter.", "That night Kulonga slept in the crotch of a mighty tree and far above him crouched Tarzan of the Apes.") + tzSrc(tzBk(8))),
tzzId("night", tzzFind("arrow", tzA("perchtrail", -10, 2), "Kulonga's bow and arrows", "In the dark, while Kulonga sleeps in his tree, take his bow and arrows")),
tzzPuzzle("🌲 The cache", "Tarzan ties the bow and arrows high in a giant tree. How does he mark it, so he will find it again?", ["He scratches his name", "A patch of bark taken off near the ground, and a branch half cut through fifty feet up", "He leaves Kala's hair on it"], 1, ["He can write it, but he doesn't here.", "", "No."], { yes: "🌲 " + tzbQ("Kulonga's bow and arrows were securely tied high in the top of a giant tree from which a patch of bark had been removed by a sharp knife near to the ground, and a branch half cut through and left hanging about fifty feet higher up. Thus Tarzan blazed the forest trails and marked his caches.") }),
tzzId("dawn", tzzGo(tzA("fields", -20, 24), "Morning: Kulonga runs for home with Tarzan above him. Follow to where the forest ends at the fields", { r: 6 })),
tzzRead("🏘️ Many strange lairs", tzbQs("The moment was delayed only because Tarzan was anxious to ascertain the black warrior's destination, and presently he was rewarded, for they came suddenly in view of a great clearing, at one end of which lay many strange lairs.", "The forest ended abruptly and beyond lay two hundred yards of planted fields between the jungle and the village.") + tzSrc(tzBk(8))),
tzzId("noose", tzzReadA("🪢 Kala was avenged", tzbQs("So it was that as Kulonga emerged from the shadow of the jungle a slender coil of rope sped sinuously above him from the lowest branch of a mighty tree directly upon the edge of the fields of Mbonga, and ere the king's son had taken a half dozen steps into the clearing a quick noose tightened about his neck.", "Kala was avenged.", "Suddenly, a strange doubt stayed his hand. Had not his books taught him that he was a man? And was not The Archer a man, also?", "All he knew was that he could not eat the flesh of this black man, and thus hereditary instinct, ages old, usurped the functions of his untaught mind and saved him from transgressing a worldwide law of whose very existence he was ignorant.") + tzSrc(tzBk(8)), "<p>" + tzbQ("So it was that as Kulonga emerged from the shadow of the jungle a slender coil of rope sped sinuously above him from the lowest branch of a mighty tree directly upon the edge of the fields of Mbonga") + ", and Tarzan's noose takes him. " + tzbQ("Kala was avenged.") + " And then, for the first time, a strange doubt stops Tarzan's hand: " + tzbQ("Had not his books taught him that he was a man? And was not The Archer a man, also?") + "</p>" + tzSrc(tzBk(8)))),
tzzPuzzle("🟤 What he took", "What does Tarzan take from the Archer, of the things he wore?", ["His shield", "The knife with its sheath and belt, a copper anklet, and the feathered headdress", "His spear"], 1, ["No.", "", "He had thrown that at Kala."], { yes: "🟤 " + tzbQ("The knife with its sheath and belt caught his eye; he appropriated them. A copper anklet also took his fancy, and this he transferred to his own leg.") })
] });
tzbCh({ t: "The Fear-Phantom", txt: 9, start: { sc: "coast", x: 528, z: -252, ry: Math.PI / 2 }, jump: 1, tune: "dread", keep: ["arrows", "A poisoned arrow, its point wrapped in a leaf", "🏹"],
state: { noTribe: true, bones: true, noLanding: true, vilEmpty: tzOn("empty", "back") },
words: "The same morning. From a lofty perch Tarzan views the village of thatched huts across the plantation, and makes his way to where the forest touches it.",
intro: "The edge of the fields",
cast: [
tzc("tarzan", tzPerch2(2), { key: "t", ry: Math.PI / 2, until: "drop" }),
tzc("villager", tzA("viltree", -2, 0.4), { key: "w", dress: "tzvillf", sex: "f", name: "A woman dipping arrows", persona: "villager", greet: "...", ry: -Math.PI / 2, until: "empty" }),
tzc("villager", tzA("viltree", -80, 40), { key: "sen", dress: "tzvillm", sex: "m", name: "A sentry, shouting", persona: "villager", greet: "...", ry: 0, from: "cry", until: "empty" }),
tzc("mbonga", tzA("vilmid", 4, 6), { key: "mb", ry: Math.PI / 2, from: "back" }),
tzc("villager", tzA("vilmid", -4, 10), { key: "v1", dress: "tzvillm", sex: "m", name: "A warrior of Mbonga's", persona: "villager", greet: "...", ry: 0.4, from: "back" }),
tzc("villager", tzA("vilmid", 8, -4), { key: "v2", dress: "tzvillm", sex: "m", name: "An old man of the village", persona: "villager", greet: "...", ry: 2.6, from: "back" }),
tzc("villager", tzA("vilmid", -8, -2), { key: "v3", dress: "tzvillf", sex: "f", name: "A woman of the village, wailing", persona: "villager", greet: "...", ry: -1.4, from: "back" })
],
steps: [
{ k: "read" },
tzzRead("🌳 No sentimentalist", tzbQs("Tarzan of the Apes was no sentimentalist. He knew nothing of the brotherhood of man. All things outside his own tribe were his deadly enemies, with the few exceptions of which Tantor, the elephant, was a marked example.", "His strange life had left him neither morose nor bloodthirsty.") + tzSrc(tzBk(9))),
tzzGo("vilfoot", "Go to the foot of the great tree that leans over the palisade", { r: 3 }),
tzzGo(tzPerch2(3), "Climb up and out along its limb, into the thick foliage above the village", { r: 1.6 }),
tzzRead("🏘️ A new, strange life", tzbQs("There were naked children running and playing in the village street. There were women grinding dried plantain in crude stone mortars, while others were fashioning cakes from the powdered flour. Out in the fields he could see still other women hoeing, weeding, or gathering.") + tzSrc(tzBk(9))),
tzzHold(tzPerch2(3), 8, "Crouch in the leaves and watch the village at its morning work", { r: 2 }),
tzzPuzzle("🌾 Who works?", "Tarzan watches a long while. Who does all the work of the village?", ["The men", "The women alone", "The children"], 1, ["He sees the men dozing in the shade.", "", "They are playing."], { yes: "🌾 " + tzbQ("He noticed that the women alone worked. Nowhere was there evidence of a man tilling the fields or performing any of the homely duties of the village.") }),
tzzRead("🧪 The cauldron", tzbQs("Before her was a small cauldron standing over a low fire and in it bubbled a thick, reddish, tarry mass. On one side of her lay a quantity of wooden arrows the points of which she dipped into the seething substance, then laying them upon a narrow rack of boughs which stood upon her other side.") + tzSrc(tzBk(9))),
tzzPuzzle("🧠 The secret", "Tarzan knows nothing of poison. What does he work out, watching her?", ["The arrows are magic", "It is the stuff in the cauldron that kills, and the arrow only carries it", "The woman is a witch"], 1, ["No.", "", "No."], { yes: "🧠 " + tzbQ("Tarzan knew nothing of poison, but his shrewd reasoning told him that it was this deadly stuff that killed, and not the little arrow, which was merely the messenger that carried it into the body of its victim.") }),
tzzId("cry", tzzRead("📣 A wild cry", tzbQs("As he was trying to think out some plan to distract her attention he heard a wild cry from across the clearing. He looked and saw a black warrior standing beneath the very tree in which he had killed the murderer of Kala an hour before.") + tzSrc(tzBk(9)))),
tzzId("empty", tzzRead("🏃 Deserted", tzbQs("The village was in an uproar instantly. Armed men rushed from the interior of many a hut and raced madly across the clearing toward the excited sentry. After them trooped the old men, and the women and children until, in a moment, the village was deserted.") + tzSrc(tzBk(9)))),
tzzId("drop", tzzGo(tzA("viltree", -1, 0), "Drop to the ground beside the cauldron with him", { r: 3 })),
tzzGather("arrow", tzA("viltree", -3, -2), 3, "Poisoned arrows from the rack", "Take arrows from the rack, carefully: never let the stuff touch your hands", { spread: 3 }),
tzzSpot("The door of a house", "He looks in at the open door of a hut near by: go in with him"),
tzzRead("🗡️ Weapons on the walls", tzbQs("Weapons hung against the walls--long spears, strangely shaped knives, a couple of narrow shields. In the center of the room was a cooking pot") + tzSrc(tzBk(9))),
tzzGather("spear", tzR("hut", 0, 0), 4, "Spears and knives from the walls", "Take each thing down from the walls and pile it in the middle of the room, as Tarzan does", { spread: 2.2 }),
tzzRead("😏 A joke", tzbQs("Then he stood back, surveyed his work, and grinned. Tarzan of the Apes enjoyed a joke.") + "<p>On top of the pile, the cooking pot, upside down; and on top of that, the feathered headdress of the dead Kulonga.</p>" + tzSrc(tzBk(9))),
tzzSpot("The door of a house", "Wailing, outside! They are coming back across the plantation: get out", { at: tzR("hut", 0, 2.4) }),
tzzPuzzle("🦶 One kick", "Tarzan sprints for the tree with all the arrows he can carry under one arm. What does he do on the way?", ["Takes the cauldron too", "Overturns the seething cauldron with a kick", "Shouts at them"], 1, ["Too hot.", "", "He is not that foolish."], { yes: "🦶 " + tzbQ("Gathering up all he could carry under one arm, he overturned the seething cauldron with a kick, and disappeared into the foliage above just as the first of the returning natives entered the gate at the far end of the village street.") }),
tzzId("back", tzzGo(tzPerch2(3), "Back up into the foliage, quickly", { r: 2 })),
tzzRead("👑 Mbonga", tzbQs("It was Mbonga, the king, father of Kulonga.", "For a few moments all was silent. Then Mbonga emerged, a look of mingled wrath and superstitious fear writ upon his hideous countenance. He spoke a few words to the assembled warriors, and in an instant the men were flying through the little village searching minutely every hut and corner within the palisades.") + tzSrc(tzBk(9))),
tzzPuzzle("👻 The fear-phantom", "They find the overturned cauldron and the stolen arrows, and nothing more. How do the villagers take it?", ["They laugh", "They huddle round their king, awed and frightened, talking in low tones", "They go hunting"], 1, ["No.", "", "No."], { yes: "👻 " + tzbQ("They stood in little groups, talking in low tones, and ever casting affrighted glances behind them from their great rolling eyes.") }),
tzzRead("🌞 Many miles", tzbQs("The sun was high in the heavens. Tarzan had not broken fast this day, and it was many miles to where lay the toothsome remains of Horta the boar.", "So he turned his back upon the village of Mbonga and melted away into the leafy fastness of the forest.") + tzSrc(tzBk(9)), "▶ The End of Chapter 10")
] });
tzbCh({ t: "\"King of the Apes\"", txt: 10, start: { sc: "coast", x: -60, z: -36, ry: Math.PI / 2 }, jump: 1, tune: "chase", keep: ["locket", "The golden locket studded with diamonds", "📿"],
state: { noTribe: true, bones: true, noLanding: true, night: true, nightFrom: "dusk", nightUntil: "morning", saborDead: tzOn("sabor", null) },
words: "Evening of the same day. A well-laden Tarzan drops from the branches into the midst of the tribe of Kerchak with the bow and arrows of the Archer.",
intro: "The forest",
cast: [
tzc("tarzan", tzA("forest", 100, -12), { key: "t", ry: Math.PI, until: "cabin" }),
tzc("kerchak", tzA("forest", 116, -26), { key: "k", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: -2.2, until: "cabin" }),
tzc("ape", tzA("forest", 110, 4), { key: "a1", beast: "mangani", name: "An ape of the tribe", persona: "ape", ry: -1.8, until: "cabin" }),
tzc("tarzan", tzRy("cabin", 1.8, -2.2, 0.0), { key: "t2", ry: Math.PI, from: "cabin", until: "raid" }),
tzc("tarzan", tzPerch2(1), { key: "t3", ry: Math.PI / 2, from: "raid", until: "drop" }),
tzc("villager", tzA("viltree", -2, 0.4), { key: "w", dress: "tzvillf", sex: "f", name: "The woman at the cauldron", persona: "villager", greet: "...", ry: -Math.PI / 2, until: "drop" }),
tzc("mbonga", tzA("vilmid", 0, 8), { key: "mb", ry: Math.PI, from: "raid", until: "sabor" }),
tzc("villager", tzA("vilmid", -6, 4), { key: "v1", dress: "tzvillm", sex: "m", name: "A hunter back from the north", persona: "villager", greet: "...", ry: 1.2, from: "hail", until: "sabor" }),
tzc("villager", tzA("vilmid", 6, 2), { key: "v2", dress: "tzvillm", sex: "m", name: "A warrior by the fire", persona: "villager", greet: "...", ry: -1.4, from: "hail", until: "sabor" }),
tzc("villager", tzA("vilmid", 2, -6), { key: "v3", dress: "tzvillf", sex: "f", name: "A woman with a cooking pot", persona: "villager", greet: "...", ry: 0.2, from: "hail", until: "sabor" }),
tzc("sabor", tzA("perchtrail", -12, 6), { key: "sb", beast: "sabor", ry: -Math.PI / 2, from: "saborc", until: "sabor", mute: true }),
tzc("tarzan", tzA("forest", 102, -14), { key: "t4", ry: Math.PI, from: "home" }),
tzc("kerchak", tzA("forest", 118, -24), { key: "k2", beast: "kerchak", name: "Kerchak", persona: "kerchak", ry: -2.2, from: "home", until: "dead" }),
tzc("ape", tzA("forest", 96, 2), { key: "a2", beast: "mangani", name: "An ape of the tribe", persona: "ape", ry: 2.2, from: "home" }),
tzc("ape", tzA("forest", 120, 0), { key: "a3", beast: "mangani", name: "An old ape", persona: "ape", ry: -2.0, s: 0.9, from: "home" }),
tzc("ape", tzA("forest", 88, -24), { key: "a4", beast: "manganiyoung", name: "A young ape", persona: "ape", ry: 0.8, from: "home" })
],
steps: [
{ k: "read" },
tzzTalk("Tarzan of the Apes", "Tarzan is showing the tribe the spoils of conquest: speak to him", ["🏹 The spoils", tzbQs("With swelling chest he narrated the glories of his adventure and exhibited the spoils of conquest.", "Kerchak grunted and turned away, for he was jealous of this strange member of his band. In his little evil brain he sought for some excuse to wreak his hatred upon Tarzan.") + tzSrc(tzBk(10)), "▶ Go on"]),
tzzGather("arrow", tzA("forest", 80, -30), 5, "Lost arrows", "Next dawn he practises with the bow. Help him find the arrows he loses among the trees", { spread: 14 }),
tzzId("cabin", tzzGo(tzR("cabin", 1.4, -1.6), "The hunting is good near the beach: go with him to the cabin and its books", { r: 2 })),
tzzFind("tin", tzR("cabin", 2.6, 2.2), "A small metal box", "Hidden in the back of one of the cupboards is a small metal box, the key in its lock"),
tzzRead("🖼️ In the box", tzbQs("In it he found a faded photograph of a smooth faced young man, a golden locket studded with diamonds, linked to a small gold chain, a few letters and a small book.", "The photograph he liked most of all, for the eyes were smiling, and the face was open and frank. It was his father.") + tzSrc(tzBk(10))),
tzzFind("locket", tzR("cabin", 2.0, 2.0), "The golden locket", "Put the locket's chain about his neck"),
tzzPuzzle("📔 The little book", "The little book is filled with fine script. The bugs are all familiar, but the dictionary is no help at all. Why?", ["It is in code", "It was the diary of John Clayton, Lord Greystoke, kept in French", "It is upside down"], 1, ["No.", "", "No."], { yes: "📔 " + tzbQ("Little did he know that this book held between its covers the key to his origin--the answer to the strange riddle of his strange life. It was the diary of John Clayton, Lord Greystoke--kept in French, as had always been his custom.") }),
tzzId("raid", tzzGo("vilfoot", "His arrows are all gone. Early next morning go with him to the black men's village, to the great tree", { r: 3 })),
tzzGo(tzPerch2(3), "Up into the great tree over the palisade", { r: 1.6 }),
tzzHold(tzPerch2(3), 10, "For hours he lies waiting for a chance; nothing calls the villagers away", { r: 2 }),
tzzId("dusk", tzzRead("🍲 Evening in the village", tzbQs("Presently the workers in the fields returned. The hunting warriors emerged from the forest, and when all were within the palisade the gates were closed and barred.", "Many cooking pots were now in evidence about the village. Before each hut a woman presided over a boiling stew, while little cakes of plantain, and cassava puddings were to be seen on every hand.") + tzSrc(tzBk(10)))),
tzzId("hail", tzzReadA("🔥 A prisoner", tzbQs("It was a party of belated hunters returning from the north, and among them they half led, half carried a struggling animal.", "As they approached the village the gates were thrown open to admit them, and then, as the people saw the victim of the chase, a savage cry rose to the heavens, for the quarry was a man.", "Sheeta, the leopard, alone of all the jungle folk, tortured his prey. The ethics of all the others meted a quick and merciful death to their victims.", "He saw that these people were more wicked than his own apes, and as savage and cruel as Sabor, herself. Tarzan began to hold his own kind in low esteem.") + tzSrc(tzBk(10)), "<p>Hunters come back with a prisoner from another tribe, and the whole village gathers round the fires and the drums. Tarzan watches from the tree and does not understand his own kind: " + tzbQ("The ethics of all the others meted a quick and merciful death to their victims.") + "</p>" + tzSrc(tzBk(10)))),
tzzPuzzle("🚂 What he expected", "When Tarzan first followed Kulonga, what had his books led him to expect to find?", ["A cave", "A city of strange houses on wheels, puffing black smoke, or a sea of mighty floating buildings", "Another tribe of apes"], 1, ["No.", "", "No."], { yes: "🚂 Trains and ships, out of the picture books. " + tzbQ("He had been sorely disappointed with the poor little village of the blacks, hidden away in his own jungle, and with not a single house as large as his own cabin upon the distant beach.") }),
tzzId("drop", tzzGo(tzA("viltree", -1, 0), "All eyes are on the fires. Drop down with him to the end of the village street", { r: 3 })),
tzzGather("arrow", tzA("viltree", -3, -2), 4, "Every arrow on the rack", "This time take them all: he has brought long fibres to bind them in a bundle", { spread: 3 }),
tzzSpot("The door of a house", "The devil of capriciousness enters his heart: creep with him into the same hut as before"),
tzzHold(tzR("hut", -2.2, -1.8), 5, "Flatten yourself against the far wall: a woman has come in looking for a cooking pot", { r: 1.4 }),
tzzSpot("The door of a house", "She has gone. Out again, quickly", { at: tzR("hut", 0, 2.4) }),
tzzGo(tzPerch2(4), "Overturn the cauldron and up the tree, to a leafy opening high above", { r: 1.8 }),
tzzPuzzle("💀 Out of the sky", "Tarzan throws the thing he took from the hut, with an aim made true by years of fruit and coconut throwing. What happens?", ["It misses", "It falls squarely among them, and they all run for their huts in terror", "They throw it back"], 1, ["Not Tarzan.", "", "No."], { yes: "💀 " + tzbQ("All gazed in consternation at it for an instant, and then, with one accord, broke and ran for their huts.") + " " + tzbQ("It was a grinning human skull which looked up at them from the ground.") }),
tzzRead("🍲 An offering", tzbQs("it commenced to dawn upon them that they had offended some great god by placing their village in this part of the jungle without propitiating him.", "But the seed of fear was deep sown, and had he but known it, Tarzan of the Apes had laid the foundation for much future misery for himself and his tribe.") + tzSrc(tzBk(10))),
tzzId("morning", tzzGo(tzA("perchtrail", -30, 4), "He sleeps in the forest near the village, and in the morning starts slowly home. Go with him", { r: 6 })),
tzzGather("berries", tzA("perchtrail", -26, 10), 3, "A few berries", "Only a few berries and a grub worm or two for breakfast", { spread: 8 }),
tzzId("saborc", tzzRead("🦁 Sabor", tzbQs("The great yellow eyes were fixed upon him with a wicked and baleful gleam, and the red tongue licked the longing lips as Sabor crouched, worming her stealthy way with belly flattened against the earth.", "Tarzan did not attempt to escape. He welcomed the opportunity for which, in fact, he had been searching for days past, now that he was armed with something more than a rope of grass.") + tzSrc(tzBk(10)))),
tzzPuzzle("🏹 Three arrows", "Sabor springs. How many arrows does Tarzan put into her before she bears him down, and his knife finishes it?", ["One", "Three: one in mid-air, one in the loin, one full in the eye", "Ten"], 1, ["More.", "", "Fewer."], { yes: "🏹 " + tzbQ("With a mighty roar the beast turned and charged once more, only to be met with a third arrow full in one eye; but this time she was too close to the ape-man for the latter to sidestep the onrushing body.") }),
tzzId("sabor", tzzRead("📣 The victorious bull ape", tzbQs("With swelling breast, he placed a foot upon the body of his powerful enemy, and throwing back his fine young head, roared out the awful challenge of the victorious bull ape.", "And in London another Lord Greystoke was speaking to HIS kind in the House of Lords, but none trembled at the sound of his soft voice.") + tzSrc(tzBk(10)))),
tzzFind("skin", tzA("perchtrail", -14, 6), "The skin of Sabor", "He has practised often on smaller animals: help him with the great pelt, and carry it"),
tzzId("home", tzzGo(tzA("forest", 100, -10), "Hurry on to the tribe to show them the skin", { r: 6 })),
tzzSay("Tarzan of the Apes", "Tarzan, with the skin of Sabor", "🦁 Tarzan is no ape", ["\"Look!\" he cried, \"Apes of Kerchak. See what Tarzan, the mighty killer, has done. Who else among you has ever killed one of Numa's people? Tarzan is mightiest amongst you for Tarzan is no ape. Tarzan is--\""], tzBk(10)),
tzzPuzzle("🗣️ The missing word", "Tarzan stops in the middle. Why?", ["Kerchak interrupts him", "In the language of the anthropoids there is no word for man", "He forgets"], 1, ["Not yet.", "", "No."], { yes: "🗣️ " + tzbQ("But here he stopped, for in the language of the anthropoids there was no word for man") }),
tzzSay("Kerchak", "Something snaps in Kerchak's brain", "😡 Come down", ["\"Come down, Tarzan, great killer,\" cried Kerchak. \"Come down and feel the fangs of a greater! Do mighty fighters fly to the trees at the first approach of danger?\""], tzBk(10)),
tzzPuzzle("🔪 Kerchak's charge", "His bow and arrows lie some way off. What has Tarzan to meet Kerchak with?", ["His bow", "Only his hunting knife and his superior intellect", "His rope"], 1, ["Too far away.", "", "No."], { yes: "🔪 " + tzbQ("His bow and arrows lay some distance away where he had dropped them while showing Sabor's hide to his fellow apes, so that he confronted Kerchak now with only his hunting knife and his superior intellect to offset the ferocious strength of his enemy.") }),
tzzReadA("🦍 Kerchak was dead", tzbQs("Thus they struggled, the one to crush out his opponent's life with those awful teeth, the other to close forever the windpipe beneath his strong grasp while he held the snarling mouth from him.", "Kerchak was dead.", "Withdrawing the knife that had so often rendered him master of far mightier muscles than his own, Tarzan of the Apes placed his foot upon the neck of his vanquished enemy, and once again, loud through the forest rang the fierce, wild cry of the conqueror.") + tzSrc(tzBk(10)), "<p>The great ape and the young man struggle, Kerchak's teeth an inch from Tarzan's throat; and then Tarzan's knife wins. " + tzbQ("Kerchak was dead.") + "</p>" + tzSrc(tzBk(10))),
tzzId("dead", tzzRead("👑 King of the Apes", tzbQs("And thus came the young Lord Greystoke into the kingship of the Apes.") + tzSrc(tzBk(10)), "▶ The End of Chapter 11"))
] });
tzbCh({ t: "Man's Reason", txt: 11, start: { sc: "coast", x: -60, z: -36, ry: Math.PI / 2 }, jump: 1, tune: "jungle", keep: ["kagoda", "KA-GODA", "👑"],
state: { noTribe: true, bones: true, noLanding: true, saborDead: true, kerchakDead: true, night: true, nightFrom: "fields", nightUntil: "court" },
words: "Some months after. Tarzan rules the tribe of Kerchak; only Terkoz, son of Tublat, questions him.",
intro: "The forest",
cast: [
tzc("tarzan", tzA("forest", 100, -12), { key: "t", ry: Math.PI, until: "fields" }),
tzc("ape", tzA("forest", 112, -24), { key: "tk", beast: "kerchak", name: "Terkoz, son of Tublat", persona: "kerchak", ry: -2.4, until: "fields" }),
tzc("ape", tzA("fields", -6, 6), { key: "f1", beast: "mangani", name: "An ape among the maize", persona: "ape", ry: 0.6, from: "fields", until: "court" }),
tzc("ape", tzA("fields", 6, 12), { key: "f2", beast: "manganiyoung", name: "A young ape in the field", persona: "ape", ry: 2.0, from: "fields", until: "court" }),
tzc("tarzan", tzA("forest", 100, -12), { key: "t2", ry: Math.PI, from: "court", until: "brook" }),
tzc("ape", tzA("forest", 110, -2), { key: "th", beast: "mangani", name: "Thaka", persona: "ape", ry: -2.4, from: "court", until: "brook" }),
tzc("ape", tzA("forest", 116, -14), { key: "mu", beast: "mangani", name: "Old Mungo", persona: "ape", s: 0.95, ry: -1.8, from: "court", until: "brook" }),
tzc("ape", tzA("forest", 92, -2), { key: "ta", beast: "mangani", name: "Tana", persona: "ape", s: 0.88, ry: 2.0, from: "court", until: "brook" }),
tzc("ape", tzA("forest", 88, -14), { key: "gu", beast: "mangani", name: "Gunto", persona: "ape", ry: 1.4, from: "court", until: "brook" }),
tzc("tarzan", tzA("hole", -14, 8), { key: "t3", ry: Math.PI / 2, from: "brook" }),
tzc("ape", tzA("hole", -34, 0), { key: "tk2", beast: "kerchak", name: "Terkoz, son of Tublat", persona: "kerchak", ry: Math.PI / 2, from: "terkoz" }),
tzc("ape", tzA("hole", -38, 6), { key: "of", beast: "mangani", name: "An old she-ape", persona: "ape", s: 0.85, ry: -Math.PI / 2, from: "terkoz" }),
tzc("ape", tzA("hole", -26, -10), { key: "om", beast: "mangani", name: "One of the old males", persona: "ape", s: 0.95, ry: 2.6, from: "terkoz" }),
tzc("ape", tzA("hole", -22, 14), { key: "om2", beast: "mangani", name: "An old bull of the tribe", persona: "ape", ry: -2.4, from: "terkoz" })
],
steps: [
{ k: "read" },
tzzRead("🌙 Wiser than before", tzbQs("For months the life of the little band went on much as it had before, except that Tarzan's greater intelligence and his ability as a hunter were the means of providing for them more bountifully than ever before.") + tzSrc(tzBk(11))),
tzzId("fields", tzzGo(tzA("fields", 0, 10), "By night, lead the tribe with him to the fields of the black men", { r: 8 })),
tzzGather("fruit", tzA("fields", 0, 8), 5, "Plantains", "Take only what you need, as the king commands; never waste what you cannot eat", { spread: 12 }),
tzzPuzzle("🌽 Only what they need", "Why does Tarzan forbid the apes to lay waste the plantation, as Manu the monkey would?", ["The villagers would see", "So the blacks will not be discouraged from tilling it, and there will be food again", "The maize is bitter"], 1, ["They come by night.", "", "No."], { yes: "🌽 " + tzbQ("So, while the blacks were wroth at the continued pilfering of their fields, they were not discouraged in their efforts to cultivate the land, as would have been the case had Tarzan permitted his people to lay waste the plantation wantonly.") }),
tzzFind("bread", tzA("viltree", 28, 0), "The offering of food", "At the foot of the great tree, his way into the palisade, the villagers leave food every night for the god of the forest. Take it"),
tzzRead("🫣 The spirit came", tzbQs("When the awe-struck savages saw that the food disappeared overnight they were filled with consternation and dread, for it was one thing to put food out to propitiate a god or a devil, but quite another thing to have the spirit really come into the village and eat it.") + tzSrc(tzBk(11))),
tzzRead("🚶 Man had come", tzbQs("Now was the quiet, fierce solitude of the primeval forest broken by new, strange cries. No longer was there safety for bird or beast. Man had come.", "With man it is different. When he comes many of the larger animals instinctively leave the district entirely, seldom if ever to return; and thus it has always been with the great anthropoids. They flee man as man flees a pestilence.") + tzSrc(tzBk(11))),
tzzId("court", tzzGo(tzA("forest", 100, -8), "Back with the tribe, a month: the king holds his court", { r: 6 })),
tzzTalk("Thaka", "Thaka comes to complain", ["⚖️ Thaka's wife", tzbQs("In the afternoon comes Thaka, possibly, to complain that old Mungo has stolen his new wife. Then must Tarzan summon all before him") + tzSrc(tzBk(11)), "▶ Go on"]),
tzzPuzzle("⚖️ The king's judgement", "The new wife prefers old Mungo. What does the king decide?", ["Mungo must give her back at once", "Matters stay as they are, or Mungo gives Thaka one of his daughters in exchange", "Thaka and Mungo must fight"], 1, ["Not if she prefers Mungo.", "", "That is how tribes break up."], { yes: "⚖️ " + tzbQ("if he finds that the wife prefers her new lord he commands that matters remain as they are, or possibly that Mungo give Thaka one of his daughters in exchange.") }),
tzzTalk("Tana", "Tana comes shrieking, holding her side", ["😣 Tana", tzbQs("Then comes Tana, shrieking and holding tight her side from which blood is streaming. Gunto, her husband, has cruelly bitten her! And Gunto, summoned, says that Tana is lazy and will not bring him nuts and beetles, or scratch his back for him.") + tzSrc(tzBk(11)), "▶ Go on"]),
tzzPuzzle("⚖️ Tana and Gunto", "What does the king do?", ["Sends Gunto away from the tribe", "Scolds them both: threatens Gunto with the slivers if he hurts her again, and makes Tana promise to do better", "Nothing"], 1, ["Too harsh, for a family quarrel.", "", "He must settle it, or the tribe will split."], { yes: "⚖️ " + tzbQ("So Tarzan scolds them both and threatens Gunto with a taste of the death-bearing slivers if he abuses Tana further, and Tana, for her part, is compelled to promise better attention to her wifely duties.") }),
tzzRead("🌊 He longed for the cabin", tzbQs("But Tarzan tired of it, as he found that kingship meant the curtailment of his liberty. He longed for the little cabin and the sun-kissed sea--for the cool interior of the well-built house, and for the never-ending wonders of the many books.", "Had Kala lived, Tarzan would have sacrificed all else to remain near her") + tzSrc(tzBk(11))),
tzzId("brook", tzzGo(tzA("hole", -14, 8), "One day: Tarzan lies on his belly beside a limpid brook trying to catch a fish in his hands. Go to him", { r: 5 })),
tzzGather("shell", tzA("hole", -8, 6), 3, "Little fish in the shallows", "Try it yourself: catch Pisah, the fish, with your hands", { spread: 6 }),
tzzId("terkoz", tzzRead("😠 Terkoz", tzbQs("With one accord the tribe swung rapidly toward the frightened cries, and there found Terkoz holding an old female by the hair and beating her unmercifully with his great hands.", "Terkoz knew that it was against the laws of his kind to strike this woman of another, but being a bully, he had taken advantage of the weakness of the female's husband to chastise her because she had refused to give up to him a tender young rodent she had captured.") + tzSrc(tzBk(11)))),
tzzGo(tzA("hole", -30, 2), "Run with Tarzan to stop it", { r: 4 }),
tzzReadA("🩸 Two great savage beasts", tzbQs("Never had the ape-man fought so terrible a battle since that long-gone day when Bolgani, the great king gorilla had so horribly manhandled him ere the new-found knife had, by accident, pricked the savage heart.", "But there was that which had raised him far above his fellows of the jungle--that little spark which spells the whole vast difference between man and brute--Reason.") + tzSrc(tzBk(11)), "<p>It is the worst fight of Tarzan's life since Bolgani. Terkoz is the stronger, and should win. " + tzbQ("But there was that which had raised him far above his fellows of the jungle--that little spark which spells the whole vast difference between man and brute--Reason.") + "</p>" + tzSrc(tzBk(11))),
tzzPuzzle("🤼 The hold", "Tarzan works his way on to Terkoz's back. His right arm slips beneath Terkoz's arm from behind, and his hand round the back of the bull's neck. What has he found?", ["A choke", "The half-Nelson of modern wrestling; and then, with both hands, the full-Nelson", "A bite"], 1, ["No.", "", "No."], { yes: "🤼 " + tzbQ("It was the half-Nelson of modern wrestling which the untaught ape-man had stumbled upon") }),
tzzPuzzle("🧠 Man's reason", "In an instant Terkoz's neck will break. What stops Tarzan?", ["Pity", "A man's reasoning: dead, Terkoz would know nothing of his king's supremacy; alive, he would be an example to the other apes", "The tribe begs him"], 1, ["Not pity, quite.", "", "No."], { yes: "🧠 " + tzbQ("\"If I kill him,\" thought Tarzan, \"what advantage will it be to me? Will it not rob the tribe of a great fighter? And if Terkoz be dead, he will know nothing of my supremacy, while alive he will ever be an example to the other apes.\"") }),
tzzSay("Tarzan of the Apes", "Tarzan, in Terkoz's ear", "🤚 KA-GODA?", ["\"KA-GODA?\" hissed Tarzan in Terkoz's ear, which, in ape tongue, means, freely translated: \"Do you surrender?\"", "\"KA-GODA!\" cried Terkoz.", "\"You have said: 'KA-GODA' to me. All the tribe have heard. Quarrel no more with your king or your people, for next time I shall kill you. Do you understand?\""], tzBk(11)),
tzzSay("Terkoz, son of Tublat", "Terkoz, let up", "😤 HUH", ["\"HUH,\" assented Terkoz.", "\"And you are satisfied?\"", "\"HUH,\" said the ape."], tzBk(11)),
tzzFind("jar", tzA("hole", -6, 0), "Water from the stream", "Wash his wounds with water from the stream"),
tzzSay("Tarzan of the Apes", "That evening Tarzan calls the old males round him", "🌊 The great lake which has no farther shore", ["\"You have seen again to-day that Tarzan of the Apes is the greatest among you,\" he said.", "\"Tarzan,\" he continued, \"is not an ape. He is not like his people. His ways are not their ways, and so Tarzan is going back to the lair of his own kind by the waters of the great lake which has no farther shore. You must choose another to rule you, for Tarzan will not return.\""], tzBk(11)),
tzzPuzzle("🎯 The goal", "What is the goal toward which the young Lord Greystoke has now taken his first step?", ["To be king again one day", "The finding of other white men like himself", "To find Kala's grave"], 1, ["He will not return.", "", "No."], { yes: "🎯 " + tzbQ("And thus young Lord Greystoke took the first step toward the goal which he had set--the finding of other white men like himself.") })
] });
var TZ_DOOR = function (dx, dz) { return function () { return { sc: "coast", x: TZW_CO.cabin[0] - 6 + (dx || 0), z: TZW_CO.cabin[1] + (dz || 0) }; }; };
tzbCh({ t: "His Own Kind", txt: 12, start: { sc: "coast", x: -760, z: 842, y: -80, ry: 0 }, jump: 1, tune: "search", keep: ["notice", "THIS IS THE HOUSE OF TARZAN", "📜"],
state: { bones: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, arrow: tzOn("ship", null), boats: tzOn("ship", null) },
words: "The morning after. Tarzan, lame and sore from his battle with Terkoz, has come back to his cabin by the sea, to live among his books.",
intro: "The cabin",
cast: [
tzc("tarzan", tzRy("cabin", 0.6, 0.6, 0.0), { key: "t", ry: Math.PI, until: "out" }),
tzc("mbonga", tzA("vilgate", 0, 10), { key: "mb", ry: 0, from: "mirando", until: "ship" }),
tzc("villager", tzA("vilgate", -4, 12), { key: "v1", dress: "tzvillm", sex: "m", name: "A frightened hunter", persona: "villager", greet: "...", ry: 0.6, from: "mirando", until: "ship" }),
tzc("villager", tzA("vilgate", 4, 12), { key: "v2", dress: "tzvillm", sex: "m", name: "Another frightened hunter", persona: "villager", greet: "...", ry: -0.6, from: "mirando", until: "ship" }),
tzc("snipes", tzA("landing", 2, -2), { key: "sn", ry: Math.PI / 2, from: "ship", until: "party" }),
tzc("sailor", tzA("landing", -1, 0), { key: "kg", dress: "tzsailor", sex: "m", beard: "full", scale: [1.14, 1.06, 1.14], name: "A giant of a sailor", persona: "sailor", greet: "...", ry: -Math.PI / 2, from: "ship", until: "shot" }),
tzc("sailor", tzA("landing", -3, 4), { key: "s1", dress: "tzsailor", sex: "m", hair: 0x5A3A2A, name: "A sailor of the Arrow", persona: "sailor", greet: "Keep yer distance.", ry: Math.PI / 2, from: "ship", until: "party" }),
tzc("sailor", tzA("landing", -4, -3), { key: "s2", dress: "tzsailor", sex: "m", hair: 0x2A2420, name: "A sailor by the boat", persona: "sailor", greet: "...", ry: Math.PI / 2, from: "ship", until: "party" }),
tzc("tarzan", tzTop(1), { key: "t2", ry: Math.PI / 2 * 1.4, from: "out" }),
tzc("snipes", TZ_DOOR(-1, -2), { key: "sn2", ry: -Math.PI / 2, from: "party", until: "spear" }),
tzc("sailor", TZ_DOOR(-0.5, 1.6), { key: "s3", dress: "tzsailor", sex: "m", hair: 0x5A3A2A, name: "A sailor at the door", persona: "sailor", greet: "Ho, mates!", ry: -Math.PI / 2, from: "party" }),
tzc("sailor", TZ_DOOR(-3, 3), { key: "s4", dress: "tzsailor", sex: "m", hair: 0x8A6A3A, name: "A sailor with a bale", persona: "sailor", greet: "...", ry: -1.2, from: "party" }),
tzc("porter", TZ_DOOR(-2.4, -0.4), { key: "po", ry: -Math.PI / 2, from: "party", until: "spear" }),
tzc("philander", TZ_DOOR(-3.4, -1.2), { key: "ph", ry: -Math.PI / 2, from: "party", until: "spear" }),
tzc("cecil", TZ_DOOR(-2.0, 1.2), { key: "ce", ry: -Math.PI / 2, from: "party", until: "go" }),
tzc("jane", TZ_DOOR(-1.6, 2.4), { key: "ja", ry: -Math.PI / 2, from: "party", until: "in" }),
tzc("esmeralda", TZ_DOOR(-3.2, 2.6), { key: "es", ry: -Math.PI / 2, from: "party", until: "in" }),
tzc("snipes", TZ_DOOR(-4, -3), { key: "sn3", ry: 0, lie: true, mute: true, from: "spear", until: "go" }),
tzc("jane", tzR("cabin", -1.0, 0.6), { key: "ja2", ry: Math.PI, from: "in" }),
tzc("esmeralda", tzR("cabin", -1.8, 1.2), { key: "es2", ry: Math.PI, from: "in" })
],
steps: [
{ k: "read" },
tzzRead("🩹 The scar", tzbQs("In ten days he was quite sound again, except for a terrible, half-healed scar, which, starting above his left eye ran across the top of his head, ending at the right ear. It was the mark left by Terkoz when he had torn the scalp away.") + tzSrc(tzBk(12))),
tzzPuzzle("🦁 A mantle of Sabor", "He tries to make a mantle of the skin of Sabor. Why can't he?", ["It is too small", "The hide has dried stiff as a board, and he knows naught of tanning", "Kala's people stole it"], 1, ["No.", "", "No."], { yes: "🦁 " + tzbQ("But he found the hide had dried as stiff as a board, and as he knew naught of tanning, he was forced to abandon his cherished plan.") }),
tzzRead("🏹 A strange and war-like figure", tzbQs("About his neck hung the golden chain from which depended the diamond encrusted locket of his mother, the Lady Alice. At his back was a quiver of arrows slung from a leathern shoulder belt, another piece of loot from some vanquished black.", "A personification, was Tarzan of the Apes, of the primitive man, the hunter, the warrior.") + tzSrc(tzBk(12))),
tzzPuzzle("🪒 Why shave?", "Almost daily he scrapes at his young beard with his knife. Why?", ["It itches", "He is afraid that hair on his face means he may yet become an ape", "Kala told him to"], 1, ["No.", "", "Kala is dead."], { yes: "🪒 " + tzbQ("Almost daily he whetted his keen knife and scraped and whittled at his young beard to eradicate this degrading emblem of apehood.") + " " + tzbQ("And so he learned to shave--rudely and painfully, it is true--but, nevertheless, effectively.") }),
tzzSpot("The door of the cabin", "Out, and away to Mbonga's village with him", { at: tzR("cabin", -3.4, 0) }),
tzzId("mirando", tzzReadA("👖 A deerskin breechcloth", tzbQs("Tarzan let the first two pass beneath him, but as the third came swiftly on, the quiet noose dropped about the black throat. A quick jerk drew it taut.", "Tarzan dispatched his prisoner quickly and silently; removed the weapons and ornaments, and--oh, the greatest joy of all--a handsome deerskin breechcloth, which he quickly transferred to his own person.", "Now indeed was he dressed as a man should be. None there was who could now doubt his high origin.") + tzSrc(tzBk(12)), "<p>On the trail Tarzan meets three warriors of the village, who run from him. The last of them, Mirando, does not get away. Tarzan takes his weapons, and, the greatest joy of all, a handsome deerskin breechcloth. " + tzbQ("Now indeed was he dressed as a man should be.") + "</p>" + tzSrc(tzBk(12)))),
tzzGo(tzA("vilgate", 0, 24), "Follow, out of sight, to the edge of the village, where the two who escaped are telling their story", { r: 6 }),
tzzSay("Mbonga, the chief", "Wise old Mbonga does not believe them", "🤨 Cowards", ["\"You tell us this great story,\" he said, \"because you do not dare to speak the truth. You do not dare admit that when the lion sprang upon Mirando you ran away and left him. You are cowards.\""], tzBk(12)),
tzzPuzzle("🍲 Munan-go-Keewati", "After that day, what does Mbonga order to be left out for the god of the jungle?", ["Gold", "Food, and also an offering of arrows", "A goat"], 1, ["They have none.", "", "No."], { yes: "🍲 " + tzbQ("If you ever chance to pass that far off African village you will still see before a tiny thatched hut, built just without the village, a little iron pot in which is a quantity of food, and beside it a quiver of well-daubed arrows.") }),
tzzGo(tzA("vilgate", 12, 16), "Look: the little thatched hut outside the gate, the iron pot and the quiver", { r: 3 }),
tzzId("ship", tzzGo("clearing", "Back to the beach with Tarzan, hunting as he goes. And then, at the edge of the trees, he stops", { r: 8 })),
tzzRead("⛵ A great ship", tzbQs("On the placid waters of the landlocked harbor floated a great ship, and on the beach a small boat was drawn up.", "But, most wonderful of all, a number of white men like himself were moving about between the beach and his cabin.") + tzSrc(tzBk(12))),
tzzGo(tzA("landing", 10, 0), "Creep closer through the trees with him", { r: 5 }),
tzzId("shot", tzzReadA("🔫 The rat-faced man", tzbQs("Presently one of them, a little, mean-faced, black-bearded fellow with a countenance which reminded Tarzan of Pamba, the rat, laid his hand upon the shoulder of a giant who stood next him", "As he turned, the little, mean-faced man drew a revolver from his belt and shot the giant in the back.") + tzSrc(tzBk(12)), "<p>The sailors are quarrelling. A little rat-faced man gets the big man who leads them to look the other way, and shoots him in the back.</p>" + tzSrc(tzBk(12)))),
tzzPuzzle("🤔 Brothers?", "Tarzan had a first impulse to rush down and greet these white men as brothers. What does he think now?", ["That he should go down anyway", "That they are no different from the black men, no more civilized than the apes, no less cruel than Sabor", "That they are gods"], 1, ["No.", "", "No."], { yes: "🤔 " + tzbQ("They were evidently no different from the black men--no more civilized than the apes--no less cruel than Sabor.") }),
tzzId("out", tzzSpot("The door of the cabin", "They have rowed back to the ship. Slip in at the cabin door with him")),
tzzGather("book", tzR("cabin", 0, 0), 4, "His books, strewn about", "Everything has been ransacked: pick up the books from the floor", { spread: 2.4 }),
tzzFind("tin", tzR("cabin", 2.6, 2.2), "The little tin box", "Quickly, the far recess of the lower shelf: is the tin box still there?"),
tzzRead("📝 A notice", tzbQs("Running to the window Tarzan looked toward the harbor, and there he saw that a boat was being lowered from the great ship beside the one already in the water.", "the ape-man snatched up a piece of paper, and with a pencil printed on it for a few moments until it bore several lines of strong, well-made, almost letter-perfect characters.") + tzSrc(tzBk(12))),
tzzFind("paper", tzA("cabin", -1.6, 0), "The notice", "Stick his notice on the outside of the door with a sharp splinter of wood"),
tzzGo(tzTop(1), "Then away, up into the foliage of a near-by tree, to watch", { r: 2.5 }),
tzzId("party", tzzRead("🚣 A strange assortment", tzbQs("When the two boats were beached upon the silvery sand it was a strange assortment of humanity that clambered ashore.", "One was an elderly man, with white hair and large rimmed spectacles. His slightly stooped shoulders were draped in an ill-fitting, though immaculate, frock coat, and a shiny silk hat added to the incongruity of his garb in an African jungle.", "The last member of the party to disembark was a girl of about nineteen") + tzSrc(tzBk(12)))),
tzzGo(TZ_DOOR(-6, 0), "Come down and stand near: they have all come up to the cabin door", { r: 4 }),
tzzSay("A sailor at the door", "A sailor at the door", "❗ What's here?", ["\"Ho, mates!\" he cried. \"What's here? This sign was not posted an hour ago or I'll eat the cook.\"", "\"Hi, perfesser,\" he called, \"step for'rd and read the bloomin' notis.\""], tzBk(12)),
tzzSay("Professor Archimedes Q. Porter", "The professor reads it, and strolls away", "🧐 Most remarkable", ["Adjusting his spectacles he looked for a moment at the placard and then, turning away, strolled off muttering to himself: \"Most remarkable--most remarkable!\""], tzBk(12)),
tzzPuzzle("📜 The notice", "At last the professor reads it aloud. What does it say?", ["KEEP OUT. BY ORDER", "THIS IS THE HOUSE OF TARZAN, THE KILLER OF BEASTS AND MANY BLACK MEN. DO NOT HARM THE THINGS WHICH ARE TARZAN'S. TARZAN WATCHES.", "GONE TO THE VILLAGE"], 1, ["No.", "", "No."], { yes: "📜 " + tzbQ("THIS IS THE HOUSE OF TARZAN, THE KILLER OF BEASTS AND MANY BLACK MEN. DO NOT HARM THE THINGS WHICH ARE TARZAN'S. TARZAN WATCHES. TARZAN OF THE APES.") }),
tzzSay("Jane Porter", "Miss Porter", "❓ What does it mean?", ["\"Who the devil is Tarzan?\" cried the sailor who had before spoken.", "\"He evidently speaks English,\" said the young man.", "\"But what does 'Tarzan of the Apes' mean?\" cried the girl."], tzBk(12)),
tzzSay("William Cecil Clayton", "The young man in white ducks", "🐒 A runaway simian", ["\"I do not know, Miss Porter,\" replied the young man, \"unless we have discovered a runaway simian from the London Zoo who has brought back a European education to his jungle home. What do you make of it, Professor Porter?\""], tzBk(12)),
tzzId("wander", tzzSay("Professor Archimedes Q. Porter", "Professor Porter", "🎩 Tut, tut", ["\"Tut, tut, child; tut, tut,\" responded Professor Porter, in a kindly and indulgent tone, \"do not trouble your pretty head with such weighty and abstruse problems,\""], tzBk(12))),
tzzSay("William Cecil Clayton", "The rat-faced sailor sneers, and young Clayton turns on him", "😠 You damned coward", ["\"Keep a civil tongue in your head,\" cried the young man, his face paling in anger, at the insulting tone of the sailor.", "\"You damned coward,\" cried the young man. \"You'd never dare shoot a man until his back was turned. You don't dare shoot me even then,\""], tzBk(12)),
tzzPuzzle("🔙 His back", "What does William Cecil Clayton do, to put the rat-faced man to the test?", ["Draws a knife", "Deliberately turns his back full upon him and walks nonchalantly away", "Calls for help"], 1, ["He has none.", "", "No."], { yes: "🔙 " + tzbQ("and he deliberately turned his back full upon the sailor and walked nonchalantly away as if to put him to the test.") }),
tzzId("spear", tzzRead("🗡️ Three things happened", tzbQs("And then three things happened almost simultaneously. The sailor jerked out his weapon and leveled it at Clayton's back, Miss Porter screamed a warning, and a long, metal-shod spear shot like a bolt from above and passed entirely through the right shoulder of the rat-faced man.", "The revolver exploded harmlessly in the air, and the seaman crumpled up with a scream of pain and terror.") + tzSrc(tzBk(12)))),
tzzPuzzle("🔫 The revolver", "In the confusion, unseen by any, who picks up the rat-faced man's fallen revolver?", ["Jane", "William Cecil Clayton, who slips it inside his shirt", "Another sailor"], 1, ["She is behind him.", "", "No one sees it go."], { yes: "🔫 " + tzbQ("Clayton, unseen by any, picked up the fallen revolver and slipped it inside his shirt, then he joined the sailors in gazing, mystified, into the jungle.") }),
tzzSay("Jane Porter", "Jane, wide-eyed beside him", "👀 Who could it have been?", ["\"Who could it have been?\" whispered Jane Porter, and the young man turned to see her standing, wide-eyed and wondering, close beside him.", "\"I dare say Tarzan of the Apes is watching us all right,\" he answered, in a dubious tone."], tzBk(12)),
tzzSay("William Cecil Clayton", "Clayton, worried: the professor and Mr. Philander have wandered into the jungle", "🧭 I have it!", ["\"I have it!\" suddenly exclaimed Clayton. \"You can use a revolver, can't you?\"", "\"Yes. Why?\"", "\"I have one. With it you and Esmeralda will be comparatively safe in this cabin while I am searching for your father and Mr. Philander."], tzBk(12)),
tzzId("go", tzzRead("🗡️ Primitively armed", tzbQs("Clayton's only response was a shrug of the shoulders, but as he left them he picked up the spear which had transfixed Snipes, and thus primitively armed, the son of the then Lord Greystoke strode into the dense jungle.") + tzSrc(tzBk(12)))),
tzzId("in", tzzSpot("The door of the cabin", "Go into the cabin with Jane and Esmeralda")),
tzzReadA("🕯️ What horrible place?", tzbQs("Jane, turning at the cry, saw the cause of it lying prone upon the floor before them--the whitened skeleton of a man. A further glance revealed a second skeleton upon the bed.", "\"What horrible place are we in?\" murmured the awe-struck girl. But there was no panic in her fright.", "What an awful tragedy these poor mute bones proclaimed!") + tzSrc(tzBk(12)), "<p>Inside, Jane finds what is left of the people who lived here long ago. " + tzbQ("\"What horrible place are we in?\" murmured the awe-struck girl. But there was no panic in her fright.") + "</p>" + tzSrc(tzBk(12))),
tzzPuzzle("🚪 Barred", "Jane finds the door has a heavy wooden bar on the inside. When was it last put in place?", ["Yesterday", "Not for twenty years", "Never"], 1, ["No.", "", "It was used once."], { yes: "🚪 " + tzbQ("Soon the girl found that the door was equipped with a heavy wooden bar upon the inside, and after several efforts the combined strength of the two enabled them to slip it into place, the first time in twenty years.") }),
tzzHold(tzR("cabin", -1.4, 1.0), 8, "Sit with them on the bench, arms about one another, and wait", { r: 2 })
] });
var TZ_WIN = function (dx, dz) { return function () { return { sc: "coast", x: TZW_CO.cabin[0] + 3.4 + (dx || 0), z: TZW_CO.cabin[1] + 1.8 + (dz || 0) }; }; };
tzbCh({ t: "At the Mercy of the Jungle", txt: 13, start: { sc: "coast", x: -300, z: -6 }, jump: 1, tune: "danger", keep: ["arrowtip", "An arrow of the village", "🏹"],
state: { bones: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, arrow: true, env: tzOn("numa", null, "junglenight"), night: true, nightFrom: "numa" },
words: "The same afternoon. The sailors have rowed back to the Arrow; Jane and Esmeralda have barred themselves in the cabin; William Cecil Clayton has gone into the jungle after the professor. Tarzan goes after him.",
intro: "The edge of the jungle",
cast: [
tzc("tarzan", tzA("forest", -130, 40), { key: "t", ry: Math.PI / 2, until: "follow" }),
tzc("cecil", tzA("forest", 4, 0), { key: "ce", ry: Math.PI / 2, until: "numa" }),
tzc("sheeta", tzA("forest", -6, 12), { key: "sh", beast: "sheeta", ry: 2.4, from: "sheeta", until: "turn", mute: true }),
tzc("cecil", tzA("forest", 70, -18), { key: "ce2", ry: Math.PI / 2, from: "numa", until: "lead" }),
tzc("numa", tzA("forest", 76, -12), { key: "nu", beast: "numa", ry: -2.4, from: "numa", until: "kill", mute: true }),
tzc("numa", tzA("forest", 72, -14), { key: "nu2", beast: "numa", ry: -1.2, from: "kill", until: "lead", lie: true, mute: true }),
tzc("tarzan", tzA("forest", 73, -16), { key: "t2", ry: Math.PI, from: "kill", until: "lead" }),
tzc("jane", tzR("cabin", -1.0, 0.6), { key: "ja", ry: Math.PI, from: "cabin" }),
tzc("esmeralda", tzR("cabin", -1.8, 1.2), { key: "es", ry: Math.PI, from: "cabin" }),
tzc("sabor", TZ_WIN(1.4, 0), { key: "lio", beast: "sabor", ry: -Math.PI / 2, from: "cabin", mute: true })
],
steps: [
{ k: "read" },
tzzRead("⛵ Back to the ship", tzbQs("After Clayton had plunged into the jungle, the sailors--mutineers of the Arrow--fell into a discussion of their next step; but on one point all were agreed--that they should hasten to put off to the anchored Arrow, where they could at least be safe from the spears of their unseen foe.") + tzSrc(tzBk(13))),
tzzRead("👁️ One of his own kind", tzbQs("So much had Tarzan seen that day that his head was in a whirl of wonder. But the most wonderful sight of all, to him, was the face of the beautiful white girl.", "Here at last was one of his own kind; of that he was positive. And the young man and the two old men; they, too, were much as he had pictured his own people to be.") + tzSrc(tzBk(13))),
tzzPuzzle("🧭 Lost?", "Why does Tarzan not understand that the young man might be lost?", ["He thinks white men cannot be lost", "The jungle to him is as simple as the main street of your own home town is to you", "He has never seen anyone lost"], 1, ["No.", "", "No."], { yes: "🧭 " + tzbQ("Tarzan wondered why the men had gone into the jungle, nor did it ever occur to him that one could become lost in that maze of undergrowth which to him was as simple as is the main street of your own home town to you.") }),
tzzId("follow", tzzGo(tzA("forest", -8, -6), "Follow the young man into the jungle, keeping out of sight", { r: 6 })),
tzzTalk("William Cecil Clayton", "Clayton, leaning against a tree, almost fagged", ["📣 Calling", "<p>" + tzbQ("At intervals Clayton called aloud and finally it came to Tarzan that he was searching for the old man.") + "</p>" + tzSrc(tzBk(13))]),
tzzId("sheeta", tzzRead("🐆 A sleek hide", tzbQs("Tarzan was on the point of going off to look for them himself, when he caught the yellow glint of a sleek hide moving cautiously through the jungle toward Clayton.", "It was Sheeta, the leopard. Now, Tarzan heard the soft bending of grasses and wondered why the young white man was not warned. Could it be he had failed to note the loud warning? Never before had Tarzan known Sheeta to be so clumsy.") + tzSrc(tzBk(13)))),
tzzPuzzle("🦍 The cry", "Sheeta is crouching for the spring. What does Tarzan do?", ["Throws his spear", "Gives the awful cry of the challenging ape, and Sheeta turns, crashing into the underbrush", "Shouts in English"], 1, ["He has given his spear already.", "", "He cannot speak it."], { yes: "🦍 " + tzbQ("No, the white man did not hear. Sheeta was crouching for the spring, and then, shrill and horrible, there rose from the stillness of the jungle the awful cry of the challenging ape, and Sheeta turned, crashing into the underbrush.") }),
tzzId("turn", tzzRead("🥶 The icy fingers of fear", tzbQs("Clayton came to his feet with a start. His blood ran cold. Never in all his life had so fearful a sound smote upon his ears. He was no coward; but if ever man felt the icy fingers of fear upon his heart, William Cecil Clayton, eldest son of Lord Greystoke of England, did that day in the fastness of the African jungle.") + tzSrc(tzBk(13)))),
tzzPuzzle("🌅 Which way?", "The afternoon is drawing to a close. Which way does Clayton go?", ["Back to the beach", "Further into the jungle, toward Mbonga's village, for he is lost", "Up a tree for the night"], 1, ["He means to, but he is lost.", "", "No."], { yes: "🌅 " + tzbQ("To Tarzan's surprise the young man was heading further into the jungle in the general direction of Mbonga's village, and the shrewd young ape-man was convinced that he was lost.") }),
tzzId("numa", tzzGo(tzA("forest", 60, -16), "Dusk. Go after him, deeper in", { r: 6 })),
tzzRead("🦁 Numa", tzbQs("Yes, there was Numa, the lion, even now, stalking the white man a dozen paces to the right.", "Clayton heard the great body paralleling his course, and now there rose upon the evening air the beast's thunderous roar. The man stopped with upraised spear and faced the brush from which issued the awful sound. The shadows were deepening, darkness was settling in.") + tzSrc(tzBk(13))),
tzzFind("arrow", tzA("forest", 64, -20), "His arrows", "Up into the tree above Clayton, and string an arrow"),
tzzRead("🏹 A sharp twang", tzbQs("He heard a noise in the tree above him. Some new danger, he thought, but he dared not take his eyes from the yellow green orbs before him. There was a sharp twang as of a broken banjo-string, and at the same instant an arrow appeared in the yellow hide of the crouching lion.") + tzSrc(tzBk(13))),
tzzId("kill", tzzReadA("🔪 Upon the brute's back", tzbQs("With a roar of pain and anger the beast sprang; but, somehow, Clayton stumbled to one side, and as he turned again to face the infuriated king of beasts, he was appalled at the sight which confronted him. Almost simultaneously with the lion's turning to renew the attack a half-naked giant dropped from the tree above squarely on the brute's back.", "His right arm encircled the lion's neck, while the left hand plunged the knife time and again into the unprotected side behind the left shoulder. The infuriated beast, pulled up and backwards until he stood upon his hind legs, struggled impotently in this unnatural position.") + tzSrc(tzBk(13)), "<p>The lion springs, and misses. Then a half-naked giant drops from the tree above onto the lion's back, an arm like iron round its neck, and the fight is over almost before it has begun. " + tzbQ("The scene he witnessed there in the twilight depths of the African jungle was burned forever into the Englishman's brain.") + "</p>" + tzSrc(tzBk(13)))),
tzzRead("💎 On the breast a locket", tzbQs("Before him he saw the figure of a young man, naked except for a loin cloth and a few barbaric ornaments about arms and legs; on the breast a priceless diamond locket gleaming against a smooth brown skin.") + tzSrc(tzBk(13))),
tzzRead("🗣️ Thank you", tzbQs("Clayton spoke to the stranger in English, thanking him for his brave rescue and complimenting him on the wondrous strength and dexterity he had displayed, but the only answer was a steady stare and a faint shrug of the mighty shoulders, which might betoken either disparagement of the service rendered, or ignorance of Clayton's language.") + tzSrc(tzBk(13))),
tzzPuzzle("🤔 Tarzan of the Apes?", "Clayton wonders whether this is the Tarzan of the notice on the door. Why does he decide it cannot be?", ["He is too young", "He answers only in a strange tongue, like the chattering of monkeys, and seems an utter stranger to English", "He has no knife"], 1, ["No.", "", "He has one."], { yes: "🤔 " + tzbQ("No, this could not be Tarzan of the Apes, for it was very evident that he was an utter stranger to English.") + " (He can read and write it; he has never heard it spoken.)" }),
tzzId("lead", tzzGo(tzA("forest", -20, 10), "He leads Clayton the other way, toward the sea. Follow through the dark", { r: 6 })),
tzzRead("🌑 The sable mantle", tzbQs("The Englishman, finally concluding that he was a prisoner, saw no alternative open but to accompany his captor, and thus they traveled slowly through the jungle while the sable mantle of the impenetrable forest night fell about them, and the stealthy footfalls of padded paws mingled with the breaking of twigs and the wild calls of the savage life that Clayton felt closing in upon him.", "Suddenly Clayton heard the faint report of a firearm--a single shot, and then silence.") + tzSrc(tzBk(13)), "▶ The cabin"),
tzzId("cabin", tzzSpot("The door of the cabin", "Meanwhile, in the cabin by the beach: go in to Jane and Esmeralda", { at: tzA("cabin", -6, 0) })),
tzzRead("🐾 Sniffing at the door", tzbQs("And now there came the sound of a heavy body brushing against the side of the cabin. She could hear the great padded paws upon the ground outside. For an instant, all was silence; even the bedlam of the forest died to a faint murmur.", "\"Hush!\" she whispered. \"Hush, Esmeralda,\" for the woman's sobs and groans seemed to have attracted the thing that stalked there just beyond the thin wall.") + tzSrc(tzBk(13))),
tzzSay("Jane Porter", "Jane, at the window", "😱 The window!", ["\"God!\" she murmured, for now, silhouetted against the moonlit sky beyond, she saw framed in the tiny square of the latticed window the head of a huge lioness. The gleaming eyes were fixed upon her in intent ferocity.", "\"Look, Esmeralda!\" she whispered. \"For God's sake, what shall we do? Look! Quick! The window!\""], tzBk(13)),
tzzPuzzle("🚪 The door", "For twenty minutes the lioness tears at the door. Why does it hold?", ["Clayton nailed it shut", "John Clayton built it, piece by piece, twenty years before, crude but mighty", "It is iron"], 1, ["He has gone.", "", "It is wood."], { yes: "🚪 " + tzbQ("Little did John Clayton imagine when he fashioned that crude but mighty portal that one day, twenty years later, it would shield a fair American girl, then unborn, from the teeth and talons of a man-eater.") }),
tzzRead("🪟 The lattice gives", tzbQs("Again and again the lioness repeated these tactics, until finally the horrified prisoner within saw a portion of the lattice give way, and in an instant one great paw and the head of the animal were thrust within the room.") + tzSrc(tzBk(13))),
tzzSay("Jane Porter", "Jane, to Esmeralda on the floor", "🙏 Help me", ["\"Esmeralda! Esmeralda!\" she cried. \"Help me, or we are lost.\""], tzBk(13)),
tzzPuzzle("🔫 Against her bosom", "Standing pale against the farther wall, what does Jane's hand find?", ["A knife from the shelf", "The revolver Clayton left with her earlier in the day", "Nothing"], 1, ["No.", "", "Look again."], { yes: "🔫 " + tzbQ("Suddenly her hand, tight-pressed against her bosom, felt the hard outline of the revolver that Clayton had left with her earlier in the day.") }),
tzzRead("💥 A flash of flame", tzbQs("Quickly she snatched it from its hiding-place, and, leveling it full at the lioness's face, pulled the trigger.", "There was a flash of flame, the roar of the discharge, and an answering roar of pain and anger from the beast.", "But Sabor was not killed. The bullet had but inflicted a painful wound in one of the great shoulders. It was the surprise at the blinding flash and the deafening roar that had caused her hasty but temporary retreat.") + tzSrc(tzBk(13))),
tzzRead("😨 Inch by inch", tzbQs("Slowly she forced her great bulk, inch by inch, through the opening. Now her head was through, now one great forearm and shoulder.", "A moment more and both shoulders through, the long, sinuous body and the narrow hips would glide quickly after.", "It was on this sight that Jane Porter again opened her eyes.") + tzSrc(tzBk(13)), "▶ The Forest God")
] });
tzbCh({ t: "The Forest God", txt: 14, start: { sc: "coast", x: -200, z: -20 }, jump: 1, tune: "danger", keep: ["lionclaw", "A claw of Sabor", "🦁"],
state: { bones: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, arrow: true, env: "junglenight", night: true },
words: "That night. Clayton has heard the single shot from the cabin. He is sure Jane is in danger.",
intro: "The dark jungle",
cast: [
tzc("tarzan", tzA("forest", -18, 6), { key: "t", ry: -Math.PI / 2, until: "ride" }),
tzc("cecil", tzA("forest", -15, 8), { key: "ce", ry: -Math.PI / 2, until: "ride" }),
tzc("sabor", TZ_WIN(1.6, 0), { key: "lio", beast: "sabor", ry: -Math.PI / 2, until: "snap", mute: true }),
tzc("tarzan", TZ_WIN(3.2, 0.4), { key: "t2", ry: -Math.PI / 2, from: "tail", until: "gone" }),
tzc("cecil", TZ_WIN(3.0, -1.4), { key: "ce2", ry: -Math.PI / 2, from: "tail", until: "door" }),
tzc("sabor", TZ_WIN(2.6, 2.4), { key: "lio2", beast: "sabor", ry: 0.4, from: "snap", lie: true, mute: true }),
tzc("jane", tzR("cabin", -1.0, 0.6), { key: "ja", ry: Math.PI, until: "door" }),
tzc("cecil", tzR("cabin", -0.4, -0.4), { key: "ce3", ry: Math.PI * 0.8, from: "door" }),
tzc("jane", tzR("cabin", -1.2, 0.2), { key: "ja2", ry: 0, from: "door" }),
tzc("esmeralda", tzR("cabin", -1.8, 1.2), { key: "es", ry: Math.PI })
],
steps: [
{ k: "read" },
tzzRead("🔫 A single shot", tzbQs("When Clayton heard the report of the firearm he fell into an agony of fear and apprehension. He knew that one of the sailors might be the author of it; but the fact that he had left the revolver with Jane, together with the overwrought condition of his nerves, made him morbidly positive that she was threatened with some great danger.") + tzSrc(tzBk(14))),
tzzPuzzle("🦍 Too slow", "Clayton stumbles blindly behind. What does Tarzan do?", ["Leaves him", "Stoops, has Clayton grasp him about the neck, and takes to the trees with him on his back", "Carries him on the ground"], 1, ["No.", "", "Too slow."], { yes: "🦍 " + tzbQ("For a moment Tarzan looked at the young man closely, as though undecided as to just what was best to do; then, stooping down before Clayton, he motioned him to grasp him about the neck, and, with the white man upon his back, Tarzan took to the trees.") }),
tzzId("ride", tzzGo(tzTop(4), "Up into the trees, and along the apes' road through the dark", { r: 3 })),
tzzRead("🌕 A hundred feet above the earth", tzbQs("From one lofty branch the agile creature swung with Clayton through a dizzy arc to a neighboring tree; then for a hundred yards maybe the sure feet threaded a maze of interwoven limbs, balancing like a tightrope walker high above the black depths of verdure beneath.", "At such times the man fairly caught his breath at sight of the horrid depths below them, for Tarzan took the easiest way, which often led over a hundred feet above the earth.") + tzSrc(tzBk(14))),
tzzPuzzle("🌳 Feeling his way", "Tarzan seems to fly, but in truth he goes slowly. Why?", ["He is tired", "He must search constantly for limbs strong enough for a double weight", "He is lost"], 1, ["No.", "", "Never."], { yes: "🌳 " + tzbQ("And yet with all his seeming speed, Tarzan was in reality feeling his way with comparative slowness, searching constantly for limbs of adequate strength for the maintenance of this double weight.") }),
tzzGo(tzTop(1), "On to the trees above the clearing by the beach", { r: 3 }),
tzzId("tail", tzzGo(TZ_WIN(4.2, -0.4), "Drop to earth with him, and round the cabin to the window", { r: 3 })),
tzzRead("🐅 By the tail", tzbQs("As Clayton rounded the corner of the cabin to behold the animal disappearing within, it was also to see the ape-man seize the long tail in both hands, and, bracing himself with his feet against the side of the cabin, throw all his mighty strength into the effort to draw the beast out of the interior.") + tzSrc(tzBk(14))),
tzzHold(TZ_WIN(3.6, -0.8), 8, "Lay hold with them and pull!", { r: 2 }),
tzzRead("🦸 The last word in heroism", tzbQs("For a naked man to drag a shrieking, clawing man-eater forth from a window by the tail to save a strange white girl, was indeed the last word in heroism.") + tzSrc(tzBk(14))),
tzzPuzzle("🗣️ Orders", "Tarzan jabbers orders at Clayton that he cannot understand. What is he trying to tell him?", ["To run", "To plunge the poisoned arrows into Sabor's back and sides, and reach the heart with the hunting knife", "To fetch the revolver"], 1, ["No.", "", "No."], { yes: "🗣️ " + tzbQ("He was trying to tell the stupid white man to plunge his poisoned arrows into Sabor's back and sides, and to reach the savage heart with the long, thin hunting knife that hung at Tarzan's hip; but the man would not understand, and Tarzan did not dare release his hold to do the things himself, for he knew that the puny white man never could hold mighty Sabor alone, for an instant.") }),
tzzPuzzle("🤼 Terkoz", "As Sabor's shoulders come clear of the window, what does Tarzan remember?", ["Kala's lessons", "His battle with Terkoz, and the hold he learned in it", "The picture book"], 1, ["No.", "", "No."], { yes: "🤼 " + tzbQ("With the quickness of a striking rattler he launched himself full upon Sabor's back, his strong young arms seeking and gaining a full-Nelson upon the beast, as he had learned it that other day during his bloody, wrestling victory over Terkoz.") }),
tzzId("snap", tzzReadA("🌙 Beneath the silver moonlight", tzbQs("At last Clayton saw the immense muscles of Tarzan's shoulders and biceps leap into corded knots beneath the silver moonlight. There was a long sustained and supreme effort on the ape-man's part--and the vertebrae of Sabor's neck parted with a sharp snap.") + tzSrc(tzBk(14)), "<p>" + tzbQ("At last Clayton saw the immense muscles of Tarzan's shoulders and biceps leap into corded knots beneath the silver moonlight.") + " The lioness gives one great heave, and is still.</p>" + tzSrc(tzBk(14)))),
tzzSay("Jane Porter", "Jane, from within", "😰 What is it?", ["\"Cecil--Mr. Clayton! Oh, what is it? What is it?\""], tzBk(14)),
tzzId("door", tzzSpot("The door of the cabin", "Run round to the door with Clayton: she raises the great bar")),
tzzSay("William Cecil Clayton", "Clayton", "🦍 The cry of the kill", ["\"What was that awful noise?\" she whispered, shrinking close to him.", "\"It was the cry of the kill from the throat of the man who has just saved your life, Miss Porter. Wait, I will fetch him so you may thank him.\""], tzBk(14)),
tzzId("gone", tzzGo(TZ_WIN(3.2, 1.6), "Out with them to the side of the cabin, where the lioness lies", { r: 3 })),
tzzRead("🌳 Gone", tzbQs("Tarzan of the Apes was gone.", "Clayton called several times, but there was no reply, and so the two returned to the greater safety of the interior.") + tzSrc(tzBk(14))),
tzzSpot("The door of the cabin", "Back inside"),
tzzSay("Jane Porter", "Jane", "🌲 A forest god", ["\"What a frightful sound!\" cried Jane, \"I shudder at the mere thought of it. Do not tell me that a human throat voiced that hideous and fearsome shriek.\"", "\"But it did, Miss Porter,\" replied Clayton; \"or at least if not a human throat that of a forest god.\""], tzBk(14)),
tzzSay("William Cecil Clayton", "Clayton", "🤷 Untenable", ["\"I cannot make it out at all,\" he concluded. \"At first I thought he might be Tarzan of the Apes; but he neither speaks nor understands English, so that theory is untenable.\""], tzBk(14)),
tzzSay("Jane Porter", "Jane", "🙏 May God bless him", ["\"Well, whatever he may be,\" cried the girl, \"we owe him our lives, and may God bless him and keep him in safety in his wild and savage jungle!\"", "\"Amen,\" said Clayton, fervently."], tzBk(14)),
tzzRead("😮 Alive", tzbQs("And now, for Jane Porter, the reaction came, and she threw herself upon the bench, sobbing with hysterical laughter.") + "<p>Esmeralda has come round on the floor, and cannot believe she is alive. Nor, for a moment, can any of them.</p>" + tzSrc(tzBk(14)), "▶ Go on")
] });
var TZ_SB = function (dx, dz) { return function () { var z = TZW_CO.cabin[1] + 380 + (dz || 0); return { sc: "coast", x: tzwCoastX(z) + 16 + (dx || 0), z: z }; }; };
tzbCh({ t: "\"Most Remarkable\"", txt: 15, start: { sc: "coast", x: -470, z: 390 }, jump: 1, tune: "search", keep: ["rope2", "Tarzan's grass rope", "🪢"],
state: { bones: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, arrow: true, env: tzOn(null, "dawn", "junglenight"), night: true, nightUntil: "dawn" },
words: "The same night, several miles south of the cabin. Professor Porter and Mr. Philander have wandered for miles in search of their camp, always in the wrong direction.",
intro: "A beach far to the south",
cast: [
tzc("porter", TZ_SB(0, 0), { key: "po", ry: -Math.PI / 2, until: "run" }),
tzc("philander", TZ_SB(0, 2), { key: "ph", ry: -Math.PI / 2, until: "run" }),
tzc("numa", TZ_SB(18, 6), { key: "nu", beast: "numa", ry: -Math.PI / 2, from: "lion", until: "run", mute: true }),
tzc("numa", TZ_SB(34, -48), { key: "nu2", beast: "numa", ry: 0.4, from: "run", until: "cry", mute: true }),
tzc("porter", TZ_SB(32, -52), { key: "po2", ry: 0.3, from: "run", until: "rope" }),
tzc("philander", TZ_SB(30, -53), { key: "ph2", ry: 0.6, from: "run", until: "rope" }),
tzc("tarzan", TZ_SB(29, -56), { key: "t", ry: 0, from: "stand", until: "rope" }),
tzc("porter", function () { return { sc: "coast", x: TZW_CO.cabin[0] - 8, z: TZW_CO.cabin[1] + 3 }; }, { key: "po3", ry: -Math.PI / 2, from: "rope" }),
tzc("philander", function () { return { sc: "coast", x: TZW_CO.cabin[0] - 8, z: TZW_CO.cabin[1] + 5 }; }, { key: "ph3", ry: -Math.PI / 2, from: "rope" }),
tzc("cecil", function () { return { sc: "coast", x: TZW_CO.cabin[0] - 9, z: TZW_CO.cabin[1] - 1 }; }, { key: "ce", ry: -Math.PI / 2, from: "rope" }),
tzc("jane", function () { return { sc: "coast", x: TZW_CO.cabin[0] - 10, z: TZW_CO.cabin[1] + 1 }; }, { key: "ja", ry: Math.PI / 2, from: "rope" }),
tzc("esmeralda", function () { return { sc: "coast", x: TZW_CO.cabin[0] - 10.5, z: TZW_CO.cabin[1] + 3 }; }, { key: "es", ry: Math.PI / 2, from: "rope" }),
tzc("sabor", TZ_WIN(2.6, 2.4), { key: "lio", beast: "sabor", ry: 0.4, lie: true, mute: true })
],
steps: [
{ k: "read" },
tzzRead("🌊 Two old men, arguing", tzbQs("Several miles south of the cabin, upon a strip of sandy beach, stood two old men, arguing.", "Savage beasts roared and growled; noises, hideous and weird, assailed their ears. They had wandered for miles in search of their camp, but always in the wrong direction. They were as hopelessly lost as though they suddenly had been transported to another world.") + tzSrc(tzBk(15))),
tzzGo(TZ_SB(-4, 0), "Walk down the moonlit sand to them", { r: 5 }),
tzzPuzzle("📚 The question of the minute", "What are the two lost scholars arguing about, on a dark beach in Africa?", ["Which way the camp lies", "The Moors in fifteenth-century Spain, and Ferdinand and Isabella", "The price of the treasure"], 1, ["They ought to be!", "", "No."], { yes: "📚 " + tzbQ("\"But, my dear professor,\" he was saying, \"I still maintain that but for the victories of Ferdinand and Isabella over the fifteenth-century Moors in Spain the world would be today a thousand years in advance of where we now find ourselves.") }),
tzzId("lion", tzzSay("Mr. Samuel T. Philander", "Mr. Philander, peering at the jungle", "👓 Someone approaching", ["\"Bless me! Professor,\" interjected Mr. Philander, who had turned his gaze toward the jungle, \"there seems to be someone approaching.\""], tzBk(15))),
tzzSay("Professor Archimedes Q. Porter", "Professor Porter", "🦁 A mere quadruped", ["\"Tut, tut, Mr. Philander,\" he chided. \"How often must I urge you to seek that absolute concentration of your mental faculties which alone may permit you to bring to bear the highest powers of intellectuality upon the momentous problems which naturally fall to the lot of great minds? And now I find you guilty of a most flagrant breach of courtesy in interrupting my learned discourse to call attention to a mere quadruped of the genus FELIS. As I was saying, Mr.--\"", "\"Heavens, Professor, a lion?\" cried Mr. Philander, straining his weak eyes toward the dim figure outlined against the dark tropical underbrush."], tzBk(15)),
tzzSay("Professor Archimedes Q. Porter", "Professor Porter, irritated", "🏛️ The zoological garden", ["\"Most reprehensible, most reprehensible,\" exclaimed Professor Porter, with a faint trace of irritation in his voice. \"Never, Mr. Philander, never before in my life have I known one of these animals to be permitted to roam at large from its cage. I shall most certainly report this outrageous breach of ethics to the directors of the adjacent zoological garden.\""], tzBk(15)),
tzzId("run", tzzRead("🏃 Follow-the-leader", tzbQs("\"He is following us!\" gasped Mr. Philander, breaking into a run.", "With streaming coat tails and shiny silk hat Professor Archimedes Q. Porter fled through the moonlight close upon the heels of Mr. Samuel T. Philander.", "It was Tarzan of the Apes who watched, with face a-grin, this odd game of follow-the-leader.") + tzSrc(tzBk(15)))),
tzzGo(TZ_SB(30, -56), "Run with them, up the beach, to the trees on the point", { r: 5 }),
tzzPuzzle("🍖 Full", "Tarzan knows the old men are safe enough from the lion. Why?", ["Lions do not eat men", "Numa has passed up such easy prey, so his belly must already be full", "The professor is too thin"], 1, ["Some do.", "", "Ha. No."], { yes: "🍖 " + tzbQ("He knew the two men were safe enough from attack in so far as the lion was concerned. The very fact that Numa had foregone such easy prey at all convinced the wise forest craft of Tarzan that Numa's belly already was full.") }),
tzzPuzzle("⚠️ The one great danger", "Then what is the danger?", ["That they get lost", "That one of them stumbles and falls, and the joy of the kill is too great for Numa to resist", "That they wake the apes"], 1, ["They are lost.", "", "No."], { yes: "⚠️ " + tzbQ("Really, the one great danger was that one of the men might stumble and fall, and then the yellow devil would be upon him in a moment and the joy of the kill would be too great a temptation to withstand.") }),
tzzRead("🌳 By the collar", tzbQs("So Tarzan swung quickly to a lower limb in line with the approaching fugitives; and as Mr. Samuel T. Philander came panting and blowing beneath him, already too spent to struggle up to the safety of the limb, Tarzan reached down and, grasping him by the collar of his coat, yanked him to the limb by his side.", "Another moment brought the professor within the sphere of the friendly grip, and he, too, was drawn upward to safety just as the baffled Numa, with a roar, leaped to recover his vanishing quarry.") + tzSrc(tzBk(15))),
tzzSay("Mr. Samuel T. Philander", "On the branch, Mr. Philander has had enough", "😤 Patience becomes a crime", ["\"Tut, tut, Mr. Philander, tut, tut!\" cautioned Professor Porter; \"you forget yourself.\"", "\"I forget nothing as yet, Professor Archimedes Q. Porter; but, believe me, sir, I am tottering on the verge of forgetfulness as to your exalted position in the world of science, and your gray hairs.\""], tzBk(15)),
tzzSay("Professor Archimedes Q. Porter", "And then the professor is a boy again", "🤝 Skinny", ["\"Look here, Skinny Philander,\" he said, in belligerent tones, \"if you are lookin' for a scrap, peel off your coat and come on down on the ground, and I'll punch your head just as I did sixty years ago in the alley back of Porky Evans' barn.\"", "\"Forgive me, Skinny,\" he said, softly. \"It hasn't been quite twenty years, and God alone knows how hard I have tried to be 'human' for Jane's sake, and yours, too, since He took my other Jane away.\""], tzBk(15)),
tzzRead("🤲 Two old hands", tzbQs("Another old hand stole up from Mr. Philander's side to clasp the one that lay upon his shoulder, and no other message could better have translated the one heart to the other.") + tzSrc(tzBk(15))),
tzzSay("Mr. Samuel T. Philander", "Mr. Philander", "🤔 Someone in this tree", ["\"You certainly pulled me up into this tree just in time,\" said the professor at last. \"I want to thank you. You saved my life.\"", "\"But I didn't pull you up here, Professor,\" said Mr. Philander. \"Bless me! The excitement of the moment quite caused me to forget that I myself was drawn up here by some outside agency--there must be someone or something in this tree with us.\""], tzBk(15)),
tzzId("cry", tzzPuzzle("🦍 Long enough", "Numa has loitered beneath the tree long enough. What does Tarzan do?", ["Shoots him", "Raises his head and gives the awful warning challenge of the anthropoid, and the lion slinks away", "Drops on him"], 1, ["No need.", "", "No need."], { yes: "🦍 " + tzbQ("The two friends, huddled trembling in their precarious position on the limb, saw the great lion halt in his restless pacing as the blood-curdling cry smote his ears, and then slink quickly into the jungle, to be instantly lost to view.") })),
tzzRead("💫 Most unscholarly shrieks", tzbQs("For a moment they swayed uncertainly, and then, with mingled and most unscholarly shrieks, they pitched headlong from the tree, locked in frenzied embrace.", "At length Professor Porter made an attempt to move one leg. To his surprise, it responded to his will as in days gone by. He now drew up its mate and stretched it forth again.", "\"Most remarkable, most remarkable,\" he murmured.") + tzSrc(tzBk(15))),
tzzSay("Professor Archimedes Q. Porter", "Professor Porter, sitting up", "🎩 They are all here", ["\"They are all here,\" he exclaimed. \"Most remarkable!\"", "\"Tut, tut, Mr. Philander; this is no time to indulge in slothful ease. We must be up and doing.\""], tzBk(15)),
tzzId("stand", tzzSay("Professor Archimedes Q. Porter", "A giant stands before them. The professor lifts his hat", "🎩 Good evening", ["\"Good evening, sir!\" said the professor, lifting his hat."], tzBk(15))),
tzzPuzzle("🪢 Neck to neck", "The giant beckons, but the old men will not follow: the professor is positive the camp lies south. What does Tarzan do?", ["Leaves them", "Ties his rope about Mr. Philander's neck, then the professor's, and leads them north", "Carries them"], 1, ["No.", "", "Two at once? No."], { yes: "🪢 " + tzbQ("But scarcely were the words out of his mouth ere he, too, had been seized and securely bound by the neck with the same rope. Then Tarzan set off toward the north, leading the now thoroughly frightened professor and his secretary.") }),
tzzId("rope", tzzGo(function () { return { sc: "coast", x: TZW_CO.cabin[0] - 14, z: TZW_CO.cabin[1] + 4 }; }, "Lead them north, up the beach, to the rise where the cabin lies", { r: 6 })),
tzzSay("Professor Archimedes Q. Porter", "The professor, released", "🧐 Quite right, as usual", ["\"Most remarkable, most remarkable!\" gasped the professor. \"But you see, Mr. Philander, that I was quite right, as usual; and but for your stubborn willfulness we should have escaped a series of most humiliating, not to say dangerous accidents. Pray allow yourself to be guided by a more mature and practical mind hereafter when in need of wise counsel.\""], tzBk(15)),
tzzId("dawn", tzzRead("🌅 Once more united", tzbQs("It was a much-relieved party of castaways that found itself once more united. Dawn discovered them still recounting their various adventures and speculating upon the identity of the strange guardian and protector they had found on this savage shore.", "Esmeralda was positive that it was none other than an angel of the Lord, sent down especially to watch over them.") + tzSrc(tzBk(15)))),
tzzSay("William Cecil Clayton", "Clayton, laughing", "😄 A very material angel", ["\"Had you seen him devour the raw meat of the lion, Esmeralda,\" laughed Clayton, \"you would have thought him a very material angel.\"", "\"There was nothing heavenly about his voice,\" said Jane Porter, with a little shudder at recollection of the awful roar which had followed the killing of the lioness."], tzBk(15)),
tzzSay("Professor Archimedes Q. Porter", "Professor Porter", "🐄 As though they had been cows", ["\"Nor did it precisely comport with my preconceived ideas of the dignity of divine messengers,\" remarked Professor Porter, \"when the--ah--gentleman tied two highly respectable and erudite scholars neck to neck and dragged them through the jungle as though they had been cows.\""], tzBk(15))
] });
var TZ_BL = function (dx, dz) { return function () { var z = TZW_BLUFF.z + (dz || 0); return { sc: "coast", x: tzwCoastX(TZW_BLUFF.z) + TZW_BLUFF.in + (dx || 0), z: z }; }; };
var TZ_CB = function (dx, dz) { return function () { return { sc: "coast", x: TZW_CO.cabin[0] + (dx || 0), z: TZW_CO.cabin[1] + (dz || 0) }; }; };
tzbCh({ t: "Burials", txt: 16, start: { sc: "coast", x: -352, z: 12 }, jump: 1, tune: "search", keep: ["ring", "The ring of Greystoke", "💍"],
state: { bones: tzOn(null, "buried"), graves: tzOn("buried", null), saborDead: true, kerchakDead: true, noTribe: true, noLanding: true,
arrow: tzOn(null, "back"), arrowOut: tzOn("leave", "back"), arrowPoint: tzOn("back", "sail"), smoke: tzOn("smoke", null), chestBoat: tzOn("land", "fetch"),
trench: tzOn("dig", "fill"), brush: tzOn("fill", null), env: tzOn("night", null, "junglenight"), night: true, nightFrom: "night" },
words: "Morning. None of the castaways has eaten or slept since the day before. Then the cabin must be made fit to live in.",
intro: "The cabin, morning",
cast: [
tzc("cecil", tzR("cabin", 0.8, 0.6), { key: "ce", ry: Math.PI, until: "buried" }),
tzc("jane", tzR("cabin", 1.8, 1.6), { key: "ja", ry: Math.PI * 0.6, until: "buried" }),
tzc("porter", tzR("cabin", -1.6, 1.0), { key: "po", ry: Math.PI * 0.5, until: "buried" }),
tzc("philander", tzR("cabin", -1.8, -0.4), { key: "ph", ry: Math.PI * 0.5, until: "buried" }),
tzc("esmeralda", tzR("cabin", -0.4, 2.2), { key: "es", ry: Math.PI, until: "buried" }),
tzc("porter", TZ_CB(-4, -14.6), { key: "po2", ry: 0, from: "buried", until: "tree" }),
tzc("cecil", TZ_CB(-7, -9), { key: "ce2", ry: -2.6, from: "buried", until: "tree" }),
tzc("jane", TZ_CB(-5.6, -8.6), { key: "ja2", ry: Math.PI, from: "buried", until: "tree" }),
tzc("philander", TZ_CB(-2.4, -8.6), { key: "ph2", ry: Math.PI, from: "buried", until: "tree" }),
tzc("esmeralda", TZ_CB(-1, -9), { key: "es2", ry: 2.6, from: "buried", until: "tree" }),
tzc("cecil", TZ_CB(-3, -4), { key: "ce3", ry: Math.PI, from: "leave", until: "smoke" }),
tzc("porter", TZ_CB(-1.4, -4.4), { key: "po3", ry: Math.PI, from: "leave", until: "smoke" }),
tzc("jane", TZ_CB(-2.2, -2.8), { key: "ja3", ry: Math.PI, from: "leave", until: "smoke" }),
tzc("snipes", TZ_BL(3, -2), { key: "sn", ry: Math.PI / 2, from: "land", until: "pick" }),
tzc("sailor", TZ_BL(4, 2), { key: "tar", dress: "tzsailor", sex: "m", hair: 0x3A2A1A, beard: "full", name: "Tarrant", persona: "sailor", greet: "Mind your business.", ry: -Math.PI / 2, from: "land", until: "sail" }),
tzc("sailor", TZ_BL(1, 3), { key: "pe", dress: "tzsailor", sex: "m", hair: 0x8A6A3A, name: "Peter, with the map", persona: "sailor", greet: "...", ry: 0, from: "land", until: "sail" }),
tzc("sailor", TZ_BL(5, -1), { key: "s1", dress: "tzsailor", sex: "m", hair: 0x2A2420, name: "A sailor with a shovel", persona: "sailor", greet: "...", ry: Math.PI, from: "land", until: "sail" }),
tzc("snipes", TZ_BL(3.4, -2.6), { key: "sn2", ry: 0, lie: true, mute: true, from: "pick", until: "fill" })
],
steps: [
{ k: "read" },
tzzRead("🥫 Long-famished", tzbQs("As it was now quite light, the party, none of whom had eaten or slept since the previous morning, began to bestir themselves to prepare food.", "The next task was to make the cabin habitable, and to this end it was decided to at once remove the gruesome relics of the tragedy which had taken place there on some bygone day.") + tzSrc(tzBk(16))),
tzzFind("coin", tzR("cabin", -2.4, 1.4), "A massive gold ring", "As they wrap the bones of the man for burial: something gleams among them"),
tzzPuzzle("💍 The crest", "Clayton cries out in astonishment at the ring. Why?", ["It is very old", "It bears the crest of the house of Greystoke", "It is his own lost ring"], 1, ["It is.", "", "No."], { yes: "💍 " + tzbQ("Picking it up to examine it, Clayton gave a cry of astonishment, for the ring bore the crest of the house of Greystoke.") }),
tzzFind("book", tzR("cabin", 2.6, 2.0), "A book from the cupboard", "Look in the books in the cupboard with Jane: open a fly-leaf"),
tzzSay("Jane Porter", "Jane", "📖 JOHN CLAYTON, LONDON", ["\"Why, Mr. Clayton,\" she cried, \"what does this mean? Here are the names of some of your own people in these books.\"", "\"And here,\" he replied gravely, \"is the great ring of the house of Greystoke which has been lost since my uncle, John Clayton, the former Lord Greystoke, disappeared, presumably lost at sea.\""], tzBk(16)),
tzzSay("William Cecil Clayton", "Clayton", "🕯️ All that is mortal of him", ["\"There is but one way to account for it, Miss Porter,\" said Clayton. \"The late Lord Greystoke was not drowned. He died here in this cabin and this poor thing upon the floor is all that is mortal of him.\"", "\"Then this must have been Lady Greystoke,\" said Jane reverently, indicating the poor mass of bones upon the bed.", "\"The beautiful Lady Alice,\" replied Clayton, \"of whose many virtues and remarkable personal charms I often have heard my mother and father speak. Poor woman,\" he murmured sadly."], tzBk(16)),
tzzPuzzle("👶 The little bones", "They take the smallest skeleton, in the crib, for the child of Lord and Lady Greystoke. Whose is it really?", ["Their son's", "The baby of Kala, the ape", "No one's"], 1, ["Their son is watching from the trees.", "", "Look again."], { yes: "👶 " + tzbQ("With deep reverence and solemnity the bodies of the late Lord and Lady Greystoke were buried beside their little African cabin, and between them was placed the tiny skeleton of the baby of Kala, the ape.") + " Mr. Philander examines the skull, and wonders. " + tzbQ("\"Tut, tut, Mr. Philander, tut, tut!\" remonstrated Professor Archimedes Q. Porter. \"'Let the dead past bury its dead.'\"") }),
tzzSpot("The door of the cabin", "Out with them, to the place they have chosen beside the cabin"),
tzzId("buried", tzzHold(TZ_CB(-4, -8), 8, "Stand with them, heads bowed and uncovered, while the old man reads the burial service", { r: 3 })),
tzzId("tree", tzzGo(tzTop(1), "Up into the trees, where Tarzan has watched it all", { r: 3 })),
tzzRead("💛 Created to protect her", tzbQs("In his savage, untutored breast new emotions were stirring. He could not fathom them. He wondered why he felt so great an interest in these people--why he had gone to such pains to save the three men. But he did not wonder why he had torn Sabor from the tender flesh of the strange girl.", "But the girl, ah--that was a different matter. He did not reason here. He knew that she was created to be protected, and that he was created to protect her.") + tzSrc(tzBk(16))),
tzzPuzzle("🦴 Dry bones", "What puzzles Tarzan about the burial?", ["Why they sing", "Why dig a great hole merely to bury dry bones? No one wants to steal dry bones", "Why they cry"], 1, ["They do not.", "", "No."], { yes: "🦴 " + tzbQ("Had there been meat upon them he could have understood, for thus alone might one keep his meat from Dango, the hyena, and the other robbers of the jungle.") }),
tzzId("leave", tzzRead("⛵ The Arrow is going", tzbQs("When the grave had been filled with earth the little party turned back toward the cabin, and Esmeralda, still weeping copiously for the two she had never heard of before today, and who had been dead twenty years, chanced to glance toward the harbor. Instantly her tears ceased.", "And, sure enough, the Arrow was being worked toward the open sea, slowly, through the harbor's entrance.") + tzSrc(tzBk(16)))),
tzzSay("William Cecil Clayton", "Clayton", "😠 Snipes", ["\"They promised to leave us firearms and ammunition,\" said Clayton. \"The merciless beasts!\"", "\"It is the work of that fellow they call Snipes, I am sure,\" said Jane. \"King was a scoundrel, but he had a little sense of humanity. If they had not killed him I know that he would have seen that we were properly provided for before they left us to our fate.\""], tzBk(16)),
tzzSay("Professor Archimedes Q. Porter", "The professor", "💰 The treasure", ["\"I regret that they did not visit us before sailing,\" said Professor Porter. \"I had proposed requesting them to leave the treasure with us, as I shall be a ruined man if that is lost.\"", "\"Never mind, dear,\" she said. \"It wouldn't have done any good, because it is solely for the treasure that they killed their officers and landed us upon this awful shore.\""], tzBk(16)),
tzzGo(TZ_BL(-2, 1), "Swing through the trees with Tarzan to the point north of the harbour mouth, for a nearer view of the ship", { r: 4 }),
tzzId("smoke", tzzRead("🚢 A floating house", tzbQs("Swinging through the trees with great speed, he reached the point only a moment after the ship had passed out of the harbor, so that he obtained an excellent view of the wonders of this strange, floating house.", "Tarzan watched the graceful movements of the ship in rapt admiration, and longed to be aboard her. Presently his keen eyes caught the faintest suspicion of smoke on the far northern horizon, and he wondered over the cause of such a thing out on the great water.") + tzSrc(tzBk(16)))),
tzzId("back", tzzRead("⚓ Beating back toward land", tzbQs("About the same time the look-out on the Arrow must have discerned it, for in a few minutes Tarzan saw the sails being shifted and shortened. The ship came about, and presently he knew that she was beating back toward land.", "A boat was lowered, and in it a great chest was placed. Then a dozen sailors bent to the oars and pulled rapidly toward the point where Tarzan crouched in the branches of a tree.") + tzSrc(tzBk(16)))),
tzzId("land", tzzGo(TZ_BL(-1, -1), "Crouch in the tree on the bluff: the rat-faced man is in the stern of the boat", { r: 3 })),
tzzSay("Snipes", "Snipes", "🗺️ Here is a good place", ["\"Here is a good place,\" said the rat-faced sailor, indicating a spot beneath Tarzan's tree.", "\"It is as good as any,\" replied one of his companions. \"If they catch us with the treasure aboard it will all be confiscated anyway. We might as well bury it here on the chance that some of us will escape the gallows to come back and enjoy it later.\""], tzBk(16)),
tzzPuzzle("🚬 The smoke", "Why do the mutineers bury the treasure here, in such haste?", ["It is too heavy", "The smoke on the horizon may be a warship; if they are caught with the treasure aboard it will be taken", "Snipes wants it for himself"], 1, ["No.", "", "No."], { yes: "🚬 Smoke on the far horizon means a steamer, and perhaps a man-of-war." }),
tzzSay("Tarrant", "Tarrant", "⛏️ A shovel", ["\"Do you mean to say that you don't intend to take a shovel, and lend a hand with this work? Your shoulder's not hurt so all-fired bad as that,\" said Tarrant, the sailor who had before spoken.", "\"Not by a damned sight,\" replied Snipes, fingering the butt of his revolver nervously."], tzBk(16)),
tzzId("pick", tzzReadA("⛏️ A pickax", tzbQs("\"Then, by God,\" replied Tarrant, \"if you won't take a shovel you'll take a pickax.\"", "With the words he raised his pick above his head, and, with a mighty blow, he buried the point in Snipes' brain.", "\"Served the skunk jolly well right,\" he said.") + tzSrc(tzBk(16)), "<p>Snipes will not dig, and lords it over the men. Tarrant, the sailor he has bullied, loses his temper with the pickax in his hands, and that is the end of Snipes. " + tzbQ("There was no further comment on the killing, but the men worked in a better frame of mind than they had since Snipes had assumed command.") + "</p>" + tzSrc(tzBk(16)))),
tzzId("dig", tzzRead("🪦 A trench of ample size", tzbQs("The others saw the cunning of the suggestion, and so the trench was lengthened to accommodate the corpse, and in the center a deeper hole was excavated for the box, which was first wrapped in sailcloth and then lowered to its place, which brought its top about a foot below the bottom of the grave. Earth was shovelled in and tramped down about the chest until the bottom of the grave showed level and uniform.") + tzSrc(tzBk(16)))),
tzzId("fill", tzzRead("🍂 Dead undergrowth", tzbQs("The balance of the loose earth was thrown far and wide, and a mass of dead undergrowth spread in as natural a manner as possible over the new-made grave to obliterate all signs of the ground having been disturbed.", "Their work done the sailors returned to the small boat, and pulled off rapidly toward the Arrow.") + tzSrc(tzBk(16)))),
tzzId("sail", tzzPuzzle("🤔 Why hide it?", "Tarzan wonders: if they did not want the chest, why not throw it into the water?", ["They are foolish", "They do want it: they have hidden it to come back for it later", "It would float"], 1, ["Not in this.", "", "No."], { yes: "🤔 " + tzbQ("Ah, he thought, but they do want it. They have hidden it here because they intend returning for it later.") })),
tzzFind("spade", TZ_BL(4.4, 1.6), "A spade", "Drop to the ground and look about the grave. Something is hidden under the brush"),
tzzHold(TZ_BL(2, 1), 8, "Dig, as he saw the sailors do. It is awkward work, and hurts his bare feet", { r: 2.5 }),
tzzId("fetch", tzzFind("load", TZ_BL(2.6, 1.6), "The chest", "Lift out the great chest: four sailors sweated beneath it")),
tzzRead("💪 An empty packing case", tzbQs("Four sailors had sweated beneath the burden of its weight--Tarzan of the Apes picked it up as though it had been an empty packing case, and with the spade slung to his back by a piece of rope, carried it off into the densest part of the jungle.") + tzSrc(tzBk(16))),
tzzGo("amph", "Carry it, a little north of east, by the trails, to the amphitheater of the apes", { r: 8 }),
tzzHold(tzA("amph", 3, 2), 8, "Near the drum, dig a hole deep enough to hide it", { r: 3 }),
tzzPuzzle("🔒 The lock", "Does Tarzan open the chest before he buries it?", ["Yes, with his knife", "No: the heavy lock and massive iron bands baffle his cunning and his strength", "Yes, with the spade"], 1, ["He tries.", "", "He tries."], { yes: "🔒 " + tzbQ("But the heavy lock and massive iron bands baffled both his cunning and his immense strength, so that he was compelled to bury the chest without having his curiosity satisfied.") }),
tzzId("night", tzzGo(TZ_WIN(4, 0), "Hunt your way back to the cabin. It is quite dark, and a light is burning inside", { r: 3 })),
tzzRead("🪔 Bright as day", tzbQs("Within the little building a light was burning, for Clayton had found an unopened tin of oil which had stood intact for twenty years, a part of the supplies left with the Claytons by Black Michael. The lamps also were still useable, and thus the interior of the cabin appeared as bright as day to the astonished Tarzan.", "Then she loosened the soft mass of golden hair which crowned her head. Like a shimmering waterfall turned to burnished metal by a dying sun it fell about her oval face; in waving lines, below her waist it tumbled.", "Tarzan was spellbound. Then she extinguished the lamp and all within the cabin was wrapped in Cimmerian darkness.") + tzSrc(tzBk(16))),
tzzHold(TZ_WIN(3, 0), 8, "Wait beneath the window until you hear the sound of sleep", { r: 2 }),
tzzFind("paper", TZ_WIN(1.6, 0.4), "Jane's manuscript", "Reach through the lattice, carefully, to the desk")
] });
var TZ_GLADE = function (dx, dz) { return function () { return { sc: "coast", x: -180 + 190 + (dx || 0), z: -30 + 70 + (dz || 0) }; }; };
var TZ_PT = function (dx, dz) { return function () { var z = TZW_BLUFF.z - 14 + (dz || 0); return { sc: "coast", x: tzwCoastX(TZW_BLUFF.z - 14) + 12 + (dx || 0), z: z }; }; };
tzbCh({ t: "The Jungle Toll", txt: 17, start: { sc: "coast", x: -290, z: -20 }, jump: 1, tune: "search", keep: ["loveletter", "Tarzan's first love letter", "💌"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, brush: true, pyre: true, env: tzOn("night", null, "junglenight"), night: true, nightFrom: "night" },
words: "Early the next morning, in Tarzan's tree. His first thought, as his last of yesterday, is of the writing hidden in his quiver.",
intro: "Tarzan's tree",
cast: [
tzc("tarzan", tzTop(2), { key: "t", ry: 0, until: "boar" }),
tzc("jane", TZ_CB(-8, 1), { key: "ja", ry: Math.PI / 2, from: "boar", until: "month" }),
tzc("cecil", TZ_CB(-8, -1), { key: "ce", ry: Math.PI / 2, from: "boar", until: "month" }),
tzc("cecil", TZ_PT(2, 2), { key: "ce2", ry: -Math.PI / 2, from: "month", until: "scream" }),
tzc("porter", TZ_SB(0, -300), { key: "po", ry: 0, from: "month", until: "scream" }),
tzc("philander", TZ_SB(0, -298), { key: "ph", ry: 0, from: "month", until: "scream" }),
tzc("jane", tzA("forest", -90, 30), { key: "ja2", ry: 1.2, from: "month", until: "scream" }),
tzc("esmeralda", tzA("forest", -92, 33), { key: "es", ry: 1.0, from: "month", until: "scream" }),
tzc("esmeralda", tzA("forest", -70, 40), { key: "es2", ry: 0, lie: true, mute: true, from: "found", until: "night" }),
tzc("cecil", tzA("forest", -71, 38), { key: "ce3", ry: 0.3, from: "found", until: "night" }),
tzc("porter", tzA("forest", -73, 42), { key: "po2", ry: 1.0, from: "found", until: "night" }),
tzc("philander", tzA("forest", -68, 43), { key: "ph2", ry: 2.0, from: "found", until: "night" }),
tzc("porter", tzR("cabin", -1.4, 1.0), { key: "po3", ry: Math.PI * 0.5, from: "night" }),
tzc("cecil", tzR("cabin", 0.4, 0.8), { key: "ce4", ry: Math.PI * 0.9, from: "night" }),
tzc("philander", tzR("cabin", -1.8, -0.4), { key: "ph3", ry: Math.PI * 0.5, from: "night" }),
tzc("esmeralda", tzR("cabin", 1.4, 2.0), { key: "es3", ry: Math.PI, from: "night" })
],
steps: [
{ k: "read" },
tzzGo(tzTop(2), "Up to his tree, to the shelter of leaves and boughs where he keeps his treasures", { r: 3 }),
tzzPuzzle("✍️ Crippled bugs", "At first he cannot read Jane's letter at all. Why?", ["It is in French", "It is handwriting: the letters tip the opposite way from all the print he knows", "It is torn"], 1, ["Not this one.", "", "No."], { yes: "✍️ " + tzbQ("Why, they even tipped in the opposite direction from all that he had ever examined either in printed books or the difficult script of the few letters he had found.") + " " + tzbQ("Ah, they were his old friends, but badly crippled.") }),
tzzRead("✉️ DEAREST HAZEL", tzbQs("WEST COAST OF AFRICA, ABOUT 10 DEGREES SOUTH LATITUDE. (So Mr. Clayton says.) February 3 (?), 1909.", "It seems foolish to write you a letter that you may never see, but I simply must tell somebody of our awful experiences since we sailed from Europe on the ill-fated Arrow.", "As you know, we were supposed to have set out upon a scientific expedition to the Congo. Papa was presumed to entertain some wondrous theory of an unthinkably ancient civilization, the remains of which lay buried somewhere in the Congo valley. But after we were well under sail the truth came out.") + tzSrc(tzBk(17))),
tzzRead("📜 A letter written in 1550", tzbQs("It seems that an old bookworm who has a book and curio shop in Baltimore discovered between the leaves of a very old Spanish manuscript a letter written in 1550 detailing the adventures of a crew of mutineers of a Spanish galleon bound from Spain to South America with a vast treasure of \"doubloons\" and \"pieces of eight,\" I suppose, for they certainly sound weird and piraty.", "His letter described the island minutely, as well as the location of the treasure, and was accompanied by the crudest, funniest little old map you ever saw; with trees and rocks all marked by scrawly X's to show the exact spot where the treasure had been buried.") + tzSrc(tzBk(17))),
tzzPuzzle("🏝️ The island", "Where did the old Spaniard bury the treasure, by the reckoning of the ship that picked him up?", ["On the Congo", "On one of the Cape Verde islands, off the West Coast of Africa", "In Baltimore"], 1, ["No.", "", "No."], { yes: "🏝️ " + tzbQ("he could have been on no other island than one of the Cape Verde group, which lie off the West Coast of Africa in about 16 degrees or 17 degrees north latitude.") }),
tzzPuzzle("💸 Robert Canler", "Why is Jane so distressed about the expedition, even before it went wrong?", ["She hates the sea", "Her father borrowed ten thousand dollars from Robert Canler, without security, and she detests the man", "She wanted to go to Europe"], 1, ["No.", "", "No."], { yes: "💸 " + tzbQ("To add to my distress, I learned that he had borrowed ten thousand dollars more from Robert Canler, and had given his notes for the amount.") + " " + tzbQ("Mr. Canler had asked for no security, and you know, dearie, what that will mean for me if papa cannot meet them. Oh, how I detest that man!") }),
tzzRead("💰 SIMPLY FILLED with gold coin", tzbQs("Well, to make a long story short, we found the island and the treasure--a great iron-bound oak chest, wrapped in many layers of oiled sailcloth, and as strong and firm as when it had been buried nearly two hundred years ago.", "It was SIMPLY FILLED with gold coin, and was so heavy that four men bent underneath its weight.") + tzSrc(tzBk(17))),
tzzRead("🦁 The wonderful creature", tzbQs("But the strangest part of it all is the wonderful creature who rescued us. I have not seen him, but Mr. Clayton and papa and Mr. Philander have, and they say that he is a perfectly god-like white man tanned to a dusky brown, with the strength of a wild elephant, the agility of a monkey, and the bravery of a lion.", "Then we have another weird neighbor, who printed a beautiful sign in English and tacked it on the door of his cabin, which we have preempted, warning us to destroy none of his belongings, and signing himself \"Tarzan of the Apes.\"") + tzSrc(tzBk(17))),
tzzPuzzle("❗ They do not know", "What does Tarzan understand, after reading the letter?", ["That they want to leave", "That they do not know the wonderful creature and Tarzan of the Apes are the same", "That Jane is angry with him"], 1, ["They do.", "", "No."], { yes: "❗ " + tzbQ("So they did not know that he was Tarzan of the Apes. He would tell them.") }),
tzzFind("pencil", tzTop(2), "A pencil", "Take a pencil from his treasures, and beneath her signature write: I am Tarzan of the Apes"),
tzzFind("paper", TZ_WIN(1.6, 0.4), "Jane's letter", "That night, put the letter back through the lattice, on the desk where it was"),
tzzGather("meat", tzA("forest", -40, 18), 1, "A wild boar", "And bring meat: they have only a revolver and three cartridges. Take a boar in the jungle", { spread: 4 }),
tzzId("boar", tzzGo(TZ_CB(-6.5, 1.5), "Lay it outside the cabin door, before dawn", { r: 3 })),
tzzSay("Jane Porter", "Jane, with her letter", "😨 Watching me", ["\"And to think,\" she said, \"that uncanny thing was probably watching me all the time that I was writing--oo! It makes me shudder just to think of it.\"", "\"But he must be friendly,\" reassured Clayton, \"for he has returned your letter, nor did he offer to harm you, and unless I am mistaken he left a very substantial memento of his friendship outside the cabin door last night, for I just found the carcass of a wild boar there as I came out.\""], tzBk(17)),
tzzRead("🦌 Every day an offering", tzbQs("From then on scarcely a day passed that did not bring its offering of game or other food. Sometimes it was a young deer, again a quantity of strange, cooked food--cassava cakes pilfered from the village of Mbonga--or a boar, or leopard, and once a lion.", "Tarzan derived the greatest pleasure of his life in hunting meat for these strangers. It seemed to him that no pleasure on earth could compare with laboring for the welfare and protection of the beautiful white girl.") + tzSrc(tzBk(17))),
tzzGather("fruit", tzA("village", -60, 40), 2, "Cassava cakes and fruit", "Bring them more: cassava cakes from the cooking-pots at the edge of Mbonga's village", { spread: 6 }),
tzzGo(TZ_CB(-6.5, 1.5), "Leave them at the cabin door", { r: 3 }),
tzzId("month", tzzRead("📅 A month passed", tzbQs("A month passed. Tarzan had finally determined to visit the camp by daylight.", "It was early afternoon. Clayton had wandered to the point at the harbor's mouth to look for passing vessels. Here he kept a great mass of wood, high piled, ready to be ignited as a signal should a steamer or a sail top the far horizon.") + tzSrc(tzBk(17)))),
tzzGo(TZ_PT(-2, 0), "See: Clayton at the point, with his great pile of wood for a signal", { r: 6 }),
tzzGo(TZ_CB(-7, 0), "Back to the cabin door, to wait. They have all gone out", { r: 3 }),
tzzFind("paper", TZ_CB(-7.5, 0.6), "A sheet of paper", "While he waits, he prints a message to her. Take the paper"),
tzzRead("💌 I am Tarzan of the Apes", tzbQs("I am Tarzan of the Apes. I want you. I am yours. You are mine. We live here together always in my house. I will bring you the best of fruits, the tenderest deer, the finest meats that roam the jungle. I will hunt for you. I am the greatest of the jungle fighters. I will fight for you. I am the mightiest of the jungle fighters. You are Jane Porter, I saw it in your letter. When you see this you will know that it is for you and that Tarzan of the Apes loves you.") + tzSrc(tzBk(17))),
tzzId("scream", tzzRead("😱 A scream", tzbQs("As he stood, straight as a young Indian, by the door, waiting after he had finished the message, there came to his keen ears a familiar sound. It was the passing of a great ape through the lower branches of the forest.", "For an instant he listened intently, and then from the jungle came the agonized scream of a woman, and Tarzan of the Apes, dropping his first love letter upon the ground, shot like a panther into the forest.") + tzSrc(tzBk(17)))),
tzzId("found", tzzGo(tzA("forest", -72, 36), "Now with Clayton and the old men: plunge into the jungle after the scream, calling her name", { r: 5 })),
tzzSay("Professor Archimedes Q. Porter", "The professor", "😢 My little girl", ["\"What shall we do, Mr. Clayton?\" asked the old professor. \"Where shall we look? God could not have been so cruel as to take my little girl away from me now.\""], tzBk(17)),
tzzPuzzle("👣 What took her?", "Esmeralda comes round at last. What does she say took Miss Jane?", ["A lion", "A great big giant all covered with hair", "The sailors"], 1, ["No.", "", "They are gone."], { yes: "👣 " + tzbQ("\"A great big giant all covered with hair.\"") + " " + tzbQ("\"A gorilla, Esmeralda?\" questioned Mr. Philander, and the three men scarcely breathed as he voiced the horrible thought.") }),
tzzGather("fern", tzA("forest", -60, 30), 3, "Trampled grasses", "Look about for tracks with Clayton", { spread: 8 }),
tzzRead("🌑 Despair", tzbQs("Clayton immediately began to look about for tracks, but he could find nothing save a confusion of trampled grasses in the close vicinity, and his woodcraft was too meager for the translation of what he did see.", "All the balance of the day they sought through the jungle; but as night drew on they were forced to give up in despair and hopelessness, for they did not even know in what direction the thing had borne Jane.") + tzSrc(tzBk(17))),
tzzId("night", tzzSpot("The door of the cabin", "Back to the cabin, long after dark", { at: TZ_CB(-6, 0) })),
tzzSay("Professor Archimedes Q. Porter", "Professor Porter, no longer the pedant", "🕯️ I will not return without her", ["\"I shall lie down now,\" said the old man, \"and try to sleep. Early to-morrow, as soon as it is light, I shall take what food I can carry and continue the search until I have found Jane. I will not return without her.\""], tzBk(17)),
tzzSay("William Cecil Clayton", "Clayton", "🤝 I shall go with you", ["\"I shall go with you, of course,\" he said.", "\"No; it is I alone who may go, for she was my daughter--all that was left on earth for me to love.\"", "\"I shall go with you,\" said Clayton simply."], tzBk(17)),
tzzSay("Professor Archimedes Q. Porter", "The professor", "🌿 The same vines and leaves", ["\"The same vines and leaves will cover us, the same rains beat upon us; and when the spirit of her mother is abroad, it will find us together in death, as it has always found us in life.", "\"As you wish,\" he said.", "\"There be enough dead things in the cruel forest as it is. Come--let us try to sleep a little.\""], tzBk(17))
] });
tzbCh({ t: "The Call of the Primitive", txt: 18, start: { sc: "coast", x: -260, z: 30 }, jump: 1, tune: "danger", keep: ["kiss", "The memory of a kiss", "💋"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, brush: true, pyre: tzOn(null, "lit"), pyreLit: tzOn("lit", null),
arrowOut: tzOn("guns", null), arrow: tzOn("guns", null), cruiser: tzOn("guns", null), frBoats: tzOn("land", null) },
words: "The same afternoon, a month after the castaways landed. Terkoz, driven from the tribe, has come upon Jane and Esmeralda gathering fruit in the jungle.",
intro: "The jungle, where Esmeralda lies",
cast: [
tzc("esmeralda", tzA("forest", -70, 40), { key: "es", ry: 0, lie: true, mute: true, until: "trail" }),
tzc("ape", TZ_GLADE(4, 0), { key: "tk", beast: "kerchak", name: "Terkoz, son of Tublat", persona: "kerchak", ry: -Math.PI / 2, until: "won" }),
tzc("jane", TZ_GLADE(6, 2), { key: "ja", ry: -Math.PI / 2, until: "carry" }),
tzc("ape", TZ_GLADE(3, -1), { key: "tk2", beast: "kerchak", name: "Terkoz, son of Tublat", persona: "kerchak", ry: 0.4, lie: true, mute: true, from: "won" }),
tzc("cecil", TZ_CB(-12, 4), { key: "ce", ry: -Math.PI / 2, from: "guns", until: "run" }),
tzc("porter", TZ_CB(-12, 6), { key: "po", ry: -Math.PI / 2, from: "guns" }),
tzc("philander", TZ_CB(-11, 8), { key: "ph", ry: -Math.PI / 2, from: "guns" }),
tzc("esmeralda", TZ_CB(-13, 2), { key: "es2", ry: -Math.PI / 2, from: "guns" }),
tzc("cecil", TZ_PT(-4, 1), { key: "ce2", ry: -Math.PI / 2, from: "run", until: "land" }),
tzc("darnot", tzA("landing", 1, -2), { key: "da", ry: Math.PI / 2, from: "land" }),
tzc("cecil", tzA("landing", 3, -1), { key: "ce3", ry: -Math.PI / 2, from: "land" }),
tzc("dufranne", tzA("landing", 2, 3), { key: "du", ry: Math.PI * 0.8, from: "land" }),
tzc("sailor", tzA("landing", -2, 2), { key: "f1", dress: "tzfrsail", sex: "m", hair: 0x2A1E14, name: "A French sailor", persona: "frsailor", greet: "Bonjour!", ry: Math.PI / 2, from: "land" }),
tzc("sailor", tzA("landing", -3, -3), { key: "f2", dress: "tzfrsail", sex: "m", hair: 0x5A4030, name: "A French sailor with a carbine", persona: "frsailor", greet: "Bonjour, monsieur.", ry: Math.PI / 2, from: "land" }),
tzc("sailor", tzA("landing", -1, 5), { key: "f3", dress: "tzfrsail", sex: "m", hair: 0x141210, name: "A French sailor, volunteering", persona: "frsailor", greet: "Pour la demoiselle!", ry: Math.PI / 2, from: "land" }),
tzc("darnot", tzA("landing", 8, -1), { key: "ch", name: "Lieutenant Charpentier", persona: "darnot", greet: "Charpentier, monsieur. We go at once.", ry: Math.PI / 2, from: "land" })
],
steps: [
{ k: "read" },
tzzRead("😠 A cruel and capricious king", tzbQs("From the time Tarzan left the tribe of great anthropoids in which he had been raised, it was torn by continual strife and discord. Terkoz proved a cruel and capricious king, so that, one by one, many of the older and weaker apes, upon whom he was particularly prone to vent his brutish nature, took their families and sought the quiet and safety of the far interior.") + tzSrc(tzBk(18))),
tzzPuzzle("🦍 Tarzan's counsel", "At last one of the apes remembers what Tarzan told them when he left. What was it?", ["Obey your king", "Never face a cruel chief alone: let two or three or four of you attack him together", "Follow Tarzan to the sea"], 1, ["No.", "", "No."], { yes: "🦍 " + tzbQ("\"If you have a chief who is cruel, do not do as the other apes do, and attempt, any one of you, to pit yourself against him alone. But, instead, let two or three or four of you attack him together. Then, if you will do this, no chief will dare to be other than he should be, for four of you can kill any chief who may ever be over you.\"") }),
tzzRead("🌳 Two women in the jungle", tzbQs("For several days he wandered aimlessly, nursing his spite and looking for some weak thing on which to vent his pent anger.", "He was right above them when he discovered them. The first intimation Jane Porter had of his presence was when the great hairy body dropped to the earth beside her, and she saw the awful face and the snarling, hideous mouth thrust within a foot of her.", "But Jane did not once lose consciousness. It is true that that awful face, pressing close to hers, and the stench of the foul breath beating upon her nostrils, paralyzed her with terror; but her brain was clear, and she comprehended all that transpired.") + tzSrc(tzBk(18))),
tzzGo(tzA("forest", -72, 38), "With Tarzan, straight to where Esmeralda lies. She is unhurt", { r: 4 }),
tzzId("trail", tzzRead("🔍 The whole story", tzbQs("For a moment he scrutinized the ground below and the trees above, until the ape that was in him by virtue of training and environment, combined with the intelligence that was his by right of birth, told his wondrous woodcraft the whole story as plainly as though he had seen the thing happen with his own eyes.") + tzSrc(tzBk(18)))),
tzzPuzzle("🌿 Reading the trail", "Along the high-flung spoor through the trees, where does the trail best show which way the ape has gone?", ["At the boughs' ends", "Nearer the center of the tree, where the signs are fainter but the direction is plain", "On the ground"], 1, ["Most to mark the trail there, but least to point the way.", "", "He is in the trees."], { yes: "🌿 " + tzbQ("At boughs' ends, where the anthropoid swings from one tree to another, there is most to mark the trail, but least to point the direction of the quarry; for there the pressure is downward always, toward the small end of the branch, whether the ape be leaving or entering a tree. Nearer the center of the tree, where the signs of passage are fainter, the direction is plainly marked.") }),
tzzFind("berries", tzA("forest", -20, 40), "A crushed caterpillar", "Follow the spoor: here, on this branch, the fugitive's great foot has crushed a caterpillar"),
tzzFind("wood", tzA("forest", 60, 44), "A bit of upturned bark", "Further: a minute bit of bark upturned by the scraping hand. Which way is the break?"),
tzzFind("rope", tzA("forest", 130, 46), "A tiny shred of hair", "And a tiny shred of hair, caught where the hairy body brushed the stem"),
tzzPuzzle("👃 Up the wind", "But strongest of all the signs is one more. Which?", ["The sound", "The scent: Tarzan is pursuing up the wind, his nostrils as sensitive as a hound's", "The footprints"], 1, ["Terkoz is quiet.", "", "He is in the trees."], { yes: "👃 " + tzbQ("But strongest of all is the scent, for Tarzan is pursuing up the wind, and his trained nostrils are as sensitive as a hound's.") }),
tzzGo(TZ_GLADE(-6, 0), "Three miles. Into the small open glade where Terkoz has turned to fight", { r: 5 }),
tzzRead("⚔️ The arena", tzbQs("When Terkoz saw that it was Tarzan who pursued him, he jumped to the conclusion that this was Tarzan's woman, since they were of the same kind--white and hairless--and so he rejoiced at this opportunity for double revenge upon his hated enemy.", "To Jane the strange apparition of this god-like man was as wine to sick nerves.") + tzSrc(tzBk(18))),
tzzId("won", tzzReadA("🗡️ The primordial ape and the primeval man", tzbQs("Like two charging bulls they came together, and like two wolves sought each other's throat. Against the long canines of the ape was pitted the thin blade of the man's knife.", "When the long knife drank deep a dozen times of Terkoz' heart's blood, and the great carcass rolled lifeless upon the ground, it was a primeval woman who sprang forward with outstretched arms toward the primeval man who had fought for her and won her.") + tzSrc(tzBk(18)), "<p>" + tzbQ("Like two charging bulls they came together, and like two wolves sought each other's throat.") + " Terkoz is huge, but Tarzan is quicker, and he wins. And Jane, who has watched it all against the trunk of a great tree, runs to him.</p>" + tzSrc(tzBk(18)))),
tzzRead("💋 The meaning of love", tzbQs("For a moment Jane lay there with half-closed eyes. For a moment--the first in her young life--she knew the meaning of love.", "But as suddenly as the veil had been withdrawn it dropped again, and an outraged conscience suffused her face with its scarlet mantle, and a mortified woman thrust Tarzan of the Apes from her and buried her face in her hands.", "Tarzan could not understand it.") + tzSrc(tzBk(18))),
tzzId("carry", tzzRead("🌳 Into the jungle", tzbQs("Again he laid his hand upon her arm. Again she repulsed him. And then Tarzan of the Apes did just what his first ancestor would have done.", "He took his woman in his arms and carried her into the jungle.") + tzSrc(tzBk(18)), "▶ Morning")),
tzzId("guns", tzzRead("💥 The booming of a cannon", tzbQs("Early the following morning the four within the little cabin by the beach were awakened by the booming of a cannon. Clayton was the first to rush out, and there, beyond the harbor's mouth, he saw two vessels lying at anchor.", "One was the Arrow and the other a small French cruiser. The sides of the latter were crowded with men gazing shoreward, and it was evident to Clayton, as to the others who had now joined him, that the gun which they had heard had been fired to attract their attention if they still remained at the cabin.") + tzSrc(tzBk(18)))),
tzzGo(TZ_CB(-14, 4), "Out to the beach with them: wave! Esmeralda waves her red apron", { r: 5 }),
tzzId("run", tzzGo(TZ_PT(-3, 0), "They cannot see. Run with Clayton to the northern point, to the signal pyre", { r: 4 })),
tzzId("lit", tzzFind("fire", TZ_PT(-4, 0), "A light for the pyre", "The ships are making sail! Light the pyre in a dozen places")),
tzzRead("🔥 One dense vertical shaft", tzbQs("Quickly lighting the pyre in a dozen places, he hurried to the extreme point of the promontory, where he stripped off his shirt, and, tying it to a fallen branch, stood waving it back and forth above him.", "But still the vessels continued to stand out; and he had given up all hope, when the great column of smoke, rising above the forest in one dense vertical shaft, attracted the attention of a lookout aboard the cruiser, and instantly a dozen glasses were leveled on the beach.") + tzSrc(tzBk(18))),
tzzId("land", tzzGo(tzA("landing", -4, 0), "The cruiser's boat comes in. Down to the beach to meet it", { r: 5 })),
tzzSay("Lieutenant Paul D'Arnot", "A young officer steps out", "🇫🇷 Monsieur Clayton", ["\"Monsieur Clayton, I presume?\" he asked.", "\"Thank God, you have come!\" was Clayton's reply. \"And it may be that it is not too late even now.\"", "\"MON DIEU!\" exclaimed the officer, sadly. \"Yesterday and it would not have been too late. Today and it may be better that the poor lady were never found. It is horrible, Monsieur. It is too horrible.\""], tzBk(18)),
tzzPuzzle("🙋 Volunteers", "The commander calls for volunteers to search for Jane. How many come forward?", ["Two", "Every officer and man of them", "None"], 1, ["No.", "", "No."], { yes: "🙋 " + tzbQ("Not an officer or a man was there of those brave and sympathetic Frenchmen who did not quickly beg leave to be one of the expedition.") + " " + tzbQ("The commander selected twenty men and two officers, Lieutenant D'Arnot and Lieutenant Charpentier.") }),
tzzSay("Captain Dufranne", "Captain Dufranne, the commander", "⚓ The Arrow", ["Then, to Clayton's inquiries as to how they had happened to anchor off shore and fire a signal gun, the commander, Captain Dufranne, explained that a month before they had sighted the Arrow bearing southwest under considerable canvas, and that when they had signaled her to come about she had but crowded on more sail."], tzBk(18)),
tzzReadA("☠️ The Arrow's fate", tzbQs("A dozen dead and dying men rolled hither and thither upon the pitching deck, the living intermingled with the dead. Two of the corpses appeared to have been partially devoured as though by wolves.", "Conditions changed rapidly from bad to worse. One man went mad and leaped overboard. Soon another opened his veins and drank his own blood.", "The men were but little stronger for their ghoulish repast, for the want of water was by far the greatest agony with which they had to contend. And then the cruiser had come.") + tzSrc(tzBk(18)), "<p>The cruiser found the Arrow drifting, her crew dying of hunger and thirst: with no one aboard who knew how to navigate, they had been lost at sea for weeks. " + tzbQ("It seems that the pursuit by the cruiser had so terrorized the mutineers that they had continued out across the Atlantic for several days after losing her; but on discovering the meager supply of water and provisions aboard, they had turned back toward the east.") + "</p>" + tzSrc(tzBk(18))),
tzzPuzzle("🔫 Unheard", "The cruiser fired signal guns the afternoon before. Why did no one on shore hear them?", ["They were asleep", "They were deep in the jungle searching for Jane, crashing through the underbrush", "The guns were too small"], 1, ["No.", "", "No."], { yes: "🔫 " + tzbQ("The signal guns of the afternoon before had not been heard by those on shore, it was presumed, because they had doubtless been in the thick of the jungle searching for Jane Porter, where the noise of their own crashing through the underbrush would have drowned the report of a far distant gun.") }),
tzzRead("🪖 Into the untracked jungle", tzbQs("Within a few minutes the little body of sailors and the two French officers, together with Professor Porter and Clayton, set off upon their hopeless and ill-fated quest into the untracked jungle.") + tzSrc(tzBk(18)), "▶ Go on")
] });
var TZ_FC = function (dx, dz) { return function () { return { sc: "coast", x: TZW_FCAMP[0] + (dx || 0), z: TZW_FCAMP[1] + (dz || 0) }; }; };
var TZ_POST = function (dx, dz) { return function () { return { sc: "coast", x: TZW_CO.vil[0] - 8 + (dx || 0), z: TZW_CO.vil[1] - 4 + (dz || 0) }; }; };
tzbCh({ t: "Heredity", txt: 19, start: { sc: "coast", x: 10, z: 30 }, jump: 1, tune: "love", keep: ["locketgift", "The locket, given", "💎"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, brush: true, bower: tzOn("bower", null),
arrow: true, arrowOut: true, cruiser: true, frBoats: true, env: tzOn("dusk", "morning", "junglenight"), night: true, nightFrom: "dusk", nightUntil: "morning" },
words: "The glade, just after the fight with Terkoz. Tarzan carries Jane away into the jungle.",
intro: "The glade",
cast: [
tzc("jane", tzA("amph", 2, 1), { key: "ja", ry: Math.PI / 2, from: "arena", until: "bower" }),
tzc("jane", tzA("amph", 3, -1), { key: "ja2", ry: 0.3, from: "bower", until: "home" }),
tzc("tarzan", tzA("amph", 5, -2), { key: "t", ry: -1.2, from: "bower", until: "home" }),
tzc("jane", function () { return { sc: "coast", x: TZW_CO.cabin[0] + 26, z: TZW_CO.cabin[1] - 6 }; }, { key: "ja3", ry: -Math.PI / 2, from: "home", until: "guns" }),
tzc("tarzan", function () { return { sc: "coast", x: TZW_CO.cabin[0] + 27, z: TZW_CO.cabin[1] - 4 }; }, { key: "t2", ry: -2.0, from: "home", until: "guns" }),
tzc("jane", function () { return { sc: "coast", x: TZW_CO.cabin[0] + 10, z: TZW_CO.cabin[1] - 2 }; }, { key: "ja4", ry: -Math.PI / 2, from: "guns" }),
tzc("philander", function () { return { sc: "coast", x: TZW_CO.cabin[0] - 1, z: TZW_CO.cabin[1] - 3.6 }; }, { key: "ph", ry: 0, lie: true, from: "guns", until: "laugh" }),
tzc("philander", function () { return { sc: "coast", x: TZW_CO.cabin[0] + 7, z: TZW_CO.cabin[1] - 2 }; }, { key: "ph2", ry: Math.PI / 2, from: "laugh" })
],
steps: [
{ k: "read" },
tzzRead("🛡️ He could never harm her", tzbQs("When Jane realized that she was being borne away a captive by the strange forest creature who had rescued her from the clutches of the ape she struggled desperately to escape, but the strong arms that held her as easily as though she had been but a day-old babe only pressed a little more tightly.", "One thing the girl had noticed particularly when she had seen Tarzan rushing upon Terkoz--the vivid scarlet band upon his forehead, from above the left eye to the scalp; but now as she scanned his features she noticed that it was gone, and only a thin white line marked the spot where it had been.", "No, he could never harm her; of that she was convinced when she translated the fine features and the frank, brave eyes above her into the chivalry which they proclaimed.") + tzSrc(tzBk(19))),
tzzGo(tzTop(6), "Through the middle terrace with them, where a passage opens before him as by magic", { r: 4 }),
tzzPuzzle("🤔 What did men do?", "As he goes, Tarzan thinks of what Terkoz meant to do with her. What question does he ask himself?", ["Where to hide her", "It is the order of the jungle for the male to take his mate by force: but was not Tarzan a Man? And what did men do?", "Whether to go back to the apes"], 1, ["No.", "", "No."], { yes: "🤔 " + tzbQ("True, it was the order of the jungle for the male to take his mate by force; but could Tarzan be guided by the laws of the beasts? Was not Tarzan a Man? But what did men do? He was puzzled; for he did not know.") + " " + tzbQ("He wished that he might ask the girl, and then it came to him that she had already answered him in the futile struggle she had made to escape and to repulse him.") }),
tzzId("arena", tzzGo(tzA("amph", 0, 0), "Down to the turf of the arena where the great apes hold their councils", { r: 6 })),
tzzRead("🌿 Dreamy peacefulness", tzbQs("The green turf looked soft and cool and inviting. The myriad noises of the jungle seemed far distant and hushed to a mere echo of blurred sounds, rising and falling like the surf upon a remote shore.", "With a bound Tarzan sprang into the trees and disappeared. Jane wondered where he had gone. Had he left her there to her fate in the lonely jungle?") + tzSrc(tzBk(19))),
tzzGather("fruit", tzA("amph", -30, 10), 3, "Ripe fruit", "Go with him: an armful of ripe and luscious fruit", { spread: 8 }),
tzzGo(tzA("amph", 1, 1), "Back across the turf to her, softly", { r: 3 }),
tzzRead("🍈 A merry laugh", tzbQs("Tarzan of the Apes stroked her soft hair and tried to comfort and quiet her as Kala had him, when, as a little ape, he had been frightened by Sabor, the lioness, or Histah, the snake.", "Together and in silence they ate, occasionally stealing sly glances at one another, until finally Jane broke into a merry laugh in which Tarzan joined.") + tzSrc(tzBk(19))),
tzzSay("Jane Porter", "Jane, on the edge of the earthen drum", "🗣️ I wish you spoke English", ["\"I wish you spoke English,\" said the girl.", "\"Anyway,\" she said to him in English, \"you understand my German as well as they did in Berlin.\""], tzBk(19)),
tzzPuzzle("📚 The ways of men", "Tarzan has decided how to behave. On what?", ["On what Kala taught him", "On all he had read of the ways of men and women in the books at the cabin: he would act as the men in the books would have acted", "On what the sailors did"], 1, ["No.", "", "Heaven forbid."], { yes: "📚 " + tzbQ("He would act as he imagined the men in the books would have acted were they in his place.") }),
tzzGather("fern", tzA("amph", -24, -14), 3, "Soft grasses and ferns", "Fetch soft grasses and ferns, and branches, for a shelter", { spread: 8 }),
tzzId("bower", tzzHold(tzA("amph", 7, 3), 6, "Build it: a soft flat bed, branches leaned together over it, the great leaves of the elephant's ear on top", { r: 3 })),
tzzRead("💎 An ivory miniature", tzbQs("The magnificent diamond locket which hung about Tarzan's neck, had been a source of much wonderment to Jane. She pointed to it now, and Tarzan removed it and handed the pretty bauble to her.", "She saw that it was the work of a skilled artisan and that the diamonds were of great brilliancy and superbly set, but the cutting of them denoted that they were of a former day. She noticed too that the locket opened, and, pressing the hidden clasp, she saw the two halves spring apart to reveal in either section an ivory miniature.", "One was of a beautiful woman and the other might have been a likeness of the man who sat beside her, except for a subtle difference of expression that was scarcely definable.") + tzSrc(tzBk(19))),
tzzPuzzle("📷 The photograph", "From the bottom of his quiver Tarzan brings out something wrapped in leaves. What?", ["A letter", "A photograph of the same man as in the locket", "A map"], 1, ["No.", "", "No."], { yes: "📷 " + tzbQ("The photograph only served to puzzle the girl still more, for it was evidently another likeness of the same man whose picture rested in the locket beside that of the beautiful young woman.") }),
tzzPuzzle("🧩 Jane's explanation", "How does Jane explain the locket to herself?", ["It is his mother's", "It belonged to Lord Greystoke, and the wild man simply found it in the cabin", "He stole it from the sailors"], 1, ["She does not guess it, though it is true.", "", "No."], { yes: "🧩 " + tzbQ("The locket had belonged to Lord Greystoke, and the likenesses were of himself and Lady Alice.") + " " + tzbQ("But to account for the strange likeness between Lord Greystoke and this forest god--that was quite beyond her, and it is not strange that she could not imagine that this naked savage was indeed an English nobleman.") }),
tzzRead("🤴 Like some courtier of old", tzbQs("She noticed that he was watching her and thinking that he wished his ornament again she held it out to him. He took it from her and taking the chain in his two hands he placed it about her neck, smiling at her expression of surprise at his unexpected gift.", "Tarzan did not know precisely what she meant, but he guessed correctly that it was her way of acknowledging the gift, and so he rose, and taking the locket in his hand, stooped gravely like some courtier of old, and pressed his lips upon it where hers had rested.", "It was a stately and gallant little compliment performed with the grace and dignity of utter unconsciousness of self. It was the hall-mark of his aristocratic birth, the natural outcropping of many generations of fine breeding, an hereditary instinct of graciousness which a lifetime of uncouth and savage training and environment could not eradicate.") + tzSrc(tzBk(19))),
tzzId("dusk", tzzPuzzle("🔪 Heredity speaks", "Dark comes, and for the first time in hours Jane is afraid of him. What does Tarzan do to assure her she is safe?", ["Leaves her", "Hands her his hunting knife, hilt first, and lies down across the entrance of the bower", "Lights a fire"], 1, ["No.", "", "He has none."], { yes: "🔪 " + tzbQ("So Tarzan of the Apes did the only thing he knew to assure Jane of her safety. He removed his hunting knife from its sheath and handed it to her hilt first, again motioning her into the bower.") + " " + tzbQ("The girl understood, and taking the long knife she entered and lay down upon the soft grasses while Tarzan of the Apes stretched himself upon the ground across the entrance.") })),
tzzHold(tzA("amph", 8, 1.4), 8, "Lie across the entrance with him, and keep watch through the night", { r: 2.5 }),
tzzId("morning", tzzRead("🌅 The imprint in the grass", tzbQs("And thus the rising sun found them in the morning.", "In the grass at the entrance to her bower she saw the imprint of his body where he had lain all night to guard her. She knew that the fact that he had been there was all that had permitted her to sleep in such peaceful security.") + tzSrc(tzBk(19)))),
tzzRead("🎵 Her heart was singing", tzbQs("She could not understand it. Her reason told her that she should be torn by wild anxieties, weighted by dread fears, cast down by gloomy forebodings; but instead, her heart was singing and she was smiling into the answering face of the man beside her.") + tzSrc(tzBk(19))),
tzzPuzzle("🧭 The long way", "He takes her home. Which way does he go?", ["The quickest way", "Far south of the direct route, to draw out the journey as long as possible", "By the river"], 1, ["No.", "", "No."], { yes: "🧭 " + tzbQ("Tarzan of the Apes did not hurry. He tried to draw out the sweet pleasure of that journey with those dear arms about his neck as long as possible, and so he went far south of the direct route to the beach.") }),
tzzGo("stream", "At noon, a little brook: stop and drink", { r: 6 }),
tzzId("home", tzzGo(function () { return { sc: "coast", x: TZW_CO.cabin[0] + 30, z: TZW_CO.cabin[1] - 5 }; }, "Nearly sunset: to the edge of the clearing, beside a great tree. There is the cabin", { r: 4 })),
tzzSay("Jane Porter", "Jane", "❤️ I love you", ["\"I love you--I love you,\" she murmured."], tzBk(19)),
tzzId("guns", tzzRead("🔫 Many guns", tzbQs("From far in the distance came the faint sound of many guns. Tarzan and Jane raised their heads.", "Tarzan pointed toward the sounds, touched his breast and pointed again. She understood. He was going, and something told her that it was because he thought her people were in danger.") + tzSrc(tzBk(19)))),
tzzSay("Jane Porter", "Jane", "🕊️ Come back to me", ["\"Come back to me,\" she whispered. \"I shall wait for you--always.\""], tzBk(19)),
tzzRead("🦁 A lioness!", tzbQs("Mr. Philander was the first to see her. It was dusk and Mr. Philander was very near sighted.", "\"Quickly, Esmeralda!\" he cried. \"Let us seek safety within; it is a lioness. Bless me!\"", "For a moment he hung there, clawing with his feet like a cat on a clothesline, but presently a piece of the thatch came away, and Mr. Philander, preceding it, was precipitated upon his back.") + tzSrc(tzBk(19))),
tzzPuzzle("🙃 Natural history", "What remarkable item of natural history does Mr. Philander remember as he lands on his back?", ["That lions cannot climb", "That lions are supposed to ignore one who feigns death", "That lions fear fire"], 1, ["No.", "", "No."], { yes: "🙃 " + tzbQ("At the instant he fell a remarkable item of natural history leaped to his mind. If one feigns death lions and lionesses are supposed to ignore one, according to Mr. Philander's faulty memory.") }),
tzzId("laugh", tzzGo(function () { return { sc: "coast", x: TZW_CO.cabin[0] + 1, z: TZW_CO.cabin[1] - 4 }; }, "Walk across the clearing with Jane. She laughs, and he peers about", { r: 4 })),
tzzSay("Mr. Samuel T. Philander", "Mr. Philander", "😮 Jane Porter. Bless me!", ["\"Jane!\" he cried. \"Jane Porter. Bless me!\"", "\"Mercy, Mr. Philander,\" interrupted the girl, \"I can never remember so many questions.\"", "\"Well, well,\" said Mr. Philander. \"Bless me! I am so filled with surprise and exuberant delight at seeing you safe and well again that I scarcely know what I am saying, really. But come, tell me all that has happened to you.\""], tzBk(19))
] });
tzbCh({ t: "The Village of Torture", txt: 20, start: { sc: "coast", x: -260, z: 30 }, jump: 1, tune: "danger", keep: ["kepi", "D'Arnot's kepi", "🎖️"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, brush: true, bower: true, arrow: true, arrowOut: true, cruiser: true, frBoats: true,
frCamp: tzOn("camp", null), feast: tzOn("post", null), env: tzOn("camp", null, "junglenight"), night: true, nightFrom: "camp" },
words: "The day before: the French search party, with Professor Porter and Clayton, toils through the jungle after Jane.",
intro: "Where Esmeralda was found",
cast: [
tzc("darnot", tzA("forest", -66, 34), { key: "da", ry: Math.PI / 2, until: "seized" }),
tzc("porter", tzA("forest", -70, 36), { key: "po", ry: Math.PI / 2, until: "camp" }),
tzc("cecil", tzA("forest", -70, 32), { key: "ce", ry: Math.PI / 2, until: "camp" }),
tzc("sailor", tzA("forest", -74, 30), { key: "f1", dress: "tzfrsail", sex: "m", hair: 0x2A1E14, name: "A French sailor", persona: "frsailor", greet: "Mademoiselle Porter! Ohé!", ry: Math.PI / 2, until: "camp" }),
tzc("sailor", tzA("forest", -74, 40), { key: "f2", dress: "tzfrsail", sex: "m", hair: 0x5A4030, name: "A sailor in the skirmish line", persona: "frsailor", greet: "Rien, rien.", ry: Math.PI / 2, until: "camp" }),
tzc("darnot", tzA("forest", -60, 38), { key: "ch", name: "Lieutenant Charpentier", persona: "darnot", greet: "We cannot find the trail. We camp here.", ry: Math.PI / 2, from: "seized", until: "camp" }),
tzc("darnot", TZ_FC(2, 0), { key: "ch2", name: "Lieutenant Charpentier", persona: "darnot", greet: "Sentries, there and there. The rest of you, sleep.", ry: Math.PI, from: "camp" }),
tzc("porter", TZ_FC(-2, 2), { key: "po2", ry: 0.6, from: "camp" }),
tzc("cecil", TZ_FC(-3, -1), { key: "ce2", ry: 0.3, from: "camp" }),
tzc("sailor", TZ_FC(5, 4), { key: "f3", dress: "tzfrsail", sex: "m", hair: 0x2A1E14, name: "A wounded sailor", persona: "frsailor", greet: "...", ry: 0, lie: true, from: "camp" }),
tzc("sailor", TZ_FC(7, -3), { key: "f4", dress: "tzfrsail", sex: "m", hair: 0x141210, name: "A sentry", persona: "frsailor", greet: "Qui vive?", ry: -0.6, from: "camp" }),
tzc("darnot", TZ_POST(0, 0.4), { key: "da2", ry: Math.PI, from: "post", until: "free" }),
tzc("mbonga", TZ_POST(2, 6), { key: "mb", ry: Math.PI, from: "post", until: "cry" }),
tzc("villager", TZ_POST(-4, 5), { key: "v1", dress: "tzvillm", sex: "m", name: "A warrior of the village", persona: "villager", greet: "...", ry: 2.4, from: "post", until: "cry" }),
tzc("villager", TZ_POST(5, 3), { key: "v2", dress: "tzvillm", sex: "m", name: "A warrior with a spear", persona: "villager", greet: "...", ry: -2.2, from: "post", until: "cry" }),
tzc("villager", TZ_POST(-6, -2), { key: "v3", dress: "tzvillm", sex: "m", name: "A dancer", persona: "villager", greet: "...", ry: 1.6, from: "post", until: "cry" }),
tzc("villager", TZ_POST(1, -6), { key: "v4", dress: "tzvillf", sex: "f", name: "A woman at the cooking fires", persona: "villager", greet: "...", ry: 0, from: "post", until: "cry" })
],
steps: [
{ k: "read" },
tzzRead("🪖 A skirmish line", tzbQs("As the little expedition of sailors toiled through the dense jungle searching for signs of Jane Porter, the futility of their venture became more and more apparent, but the grief of the old man and the hopeless eyes of the young Englishman prevented the kind hearted D'Arnot from turning back.") + tzSrc(tzBk(20))),
tzzGo(tzA("forest", -20, 20), "Push on with the skirmish line, through the tangled vines and creepers", { r: 6 }),
tzzFind("bone", tzA("forest", 30, 10), "A well-marked trail", "One of the men has found a trail. Look"),
tzzPuzzle("🐘 Whose trail?", "What kind of trail is it, winding off to the northeast?", ["A trail of the apes", "An old elephant track", "The sailors' path"], 1, ["Apes keep to the trees.", "", "No."], { yes: "🐘 " + tzbQ("It was an old elephant track, and D'Arnot after consulting with Professor Porter and Clayton decided to follow it.") }),
tzzId("seized", tzzReadA("⚔️ Ambush", tzbQs("Lieutenant D'Arnot was in the lead and moving at a quick pace, for the trail was comparatively open. Immediately behind him came Professor Porter, but as he could not keep pace with the younger man D'Arnot was a hundred yards in advance when suddenly a half dozen black warriors arose about him.", "They did not know the cause of his outcry, only that it was a warning of danger ahead. They had rushed past the spot where D'Arnot had been seized when a spear hurled from the jungle transfixed one of the men, and then a volley of arrows fell among them.", "Four of the twenty were dead, a dozen others were wounded, and Lieutenant D'Arnot was missing. Night was falling rapidly, and their predicament was rendered doubly worse when they could not even find the elephant trail which they had been following.") + tzSrc(tzBk(20)), "<p>Warriors of Mbonga's village rise up around D'Arnot at the head of the column and drag him into the jungle. The sailors run to help, and there is a fierce fight in the undergrowth before the warriors melt away. " + tzbQ("It was these shots that Tarzan and Jane Porter had heard.") + " D'Arnot is gone, and night is falling.</p>" + tzSrc(tzBk(20)))),
tzzId("camp", tzzGo(TZ_FC(-6, 0), "Make camp with Lieutenant Charpentier: a clearing, a circular abatis of underbrush, a huge fire", { r: 5 })),
tzzGather("wood", TZ_FC(0, 0), 3, "Brushwood for the abatis", "Help build the ring of underbrush round the camp", { spread: 6 }),
tzzRead("🔥 Praying for dawn", tzbQs("The groans of the wounded, mingled with the roaring and growling of the great beasts which the noise and firelight had attracted, kept sleep, except in its most fitful form, from the tired eyes. It was a sad and hungry party that lay through the long night praying for dawn.") + tzSrc(tzBk(20))),
tzzRead("🏚️ Why the village hates white men", tzbQs("To add to the fiendishness of their cruel savagery was the poignant memory of still crueler barbarities practiced upon them and theirs by the white officers of that arch hypocrite, Leopold II of Belgium, because of whose atrocities they had fled the Congo Free State--a pitiful remnant of what once had been a mighty tribe.") + "<p>The book's own words for the people of the village are cruel ones, and they are not repeated here. The history it gives is true: the Congo Free State, ruled by King Leopold II as his own property, was a place of forced labour, mutilation and mass death, and many fled it. A white man in uniform, to these people, means the men who did that.</p>" + tzSrc(tzBk(20))),
tzzRead("🦍 Toward the village of Mbonga", tzbQs("Tarzan of the Apes needed no interpreter to translate the story of those distant shots. With Jane Porter's kisses still warm upon his lips he was swinging with incredible rapidity through the forest trees straight toward the village of Mbonga.", "On he sped. Night had fallen and he traveled high along the upper terrace where the gorgeous tropic moon lighted the dizzy pathway through the gently undulating branches of the tree tops.") + tzSrc(tzBk(20))),
tzzPuzzle("🔥 A distant blaze", "Tarzan sees a fire to the right of his path. What does he take it for, and what is it?", ["The village: and it is", "The camp fire of the two men he left: it is the camp fire of the Frenchmen", "A forest fire"], 1, ["The village is ahead.", "", "No."], { yes: "🔥 " + tzbQ("So sure was Tarzan of his jungle knowledge that he did not turn from his course, but passed the glare at a distance of a half mile. It was the camp fire of the Frenchmen.") }),
tzzGo(tzTop(9), "Along the upper terrace, under the moon", { r: 4 }),
tzzId("post", tzzSpot("The great tree over the village", "Into the trees above Mbonga's village. Ah, he is not quite too late", { at: tzPerch2(0) })),
tzzReadA("🎖️ A soldier of France", tzbQs("He closed his eyes and held his teeth firm set--he would not cry out.", "He was a soldier of France, and he would teach these beasts how an officer and a gentleman died.") + "<p>D'Arnot is bound to the great post in the middle of the village, in the light of many fires. The spears have begun to prick him; the dance has gone a long way.</p>" + tzSrc(tzBk(20)), "<p>D'Arnot is tied to the great post in the middle of the village, in the light of many fires, and the warriors dance around him. He is very brave. " + tzbQ("He was a soldier of France") + ", and he will not cry out.</p>" + tzSrc(tzBk(20))),
tzzPuzzle("🪢 Forty feet", "The post stands forty feet from the nearest tree. What does Tarzan do?", ["Leaps down with his knife", "Coils his rope, gives the awful challenge of the ape-man, and casts the noose", "Waits for the dance to end"], 1, ["Too many spears.", "", "Too late, then."], { yes: "🪢 " + tzbQ("The stake stood forty feet from the nearest tree. Tarzan coiled his rope. Then there rose suddenly above the fiendish cries of the dancing demons the awful challenge of the ape-man.") }),
tzzId("cry", tzzRead("😱 As though by an invisible hand", tzbQs("The dancers halted as though turned to stone.", "The rope sped with singing whir high above the heads of the blacks. It was quite invisible in the flaring lights of the camp fires.", "D'Arnot opened his eyes. A huge black, standing directly before him, lunged backward as though felled by an invisible hand.", "D'Arnot was left alone.") + tzSrc(tzBk(20)))),
tzzGo(TZ_POST(-1.5, 0.4), "Drop from the tree and go to him, into the firelight", { r: 3 }),
tzzRead("👁️ Frank, clear eyes", tzbQs("D'Arnot saw a clean-limbed young giant emerge from the shadows into the firelight and come quickly toward him.", "D'Arnot waited. His eyes never left the face of the advancing man. Nor did the other's frank, clear eyes waver beneath D'Arnot's fixed gaze.") + tzSrc(tzBk(20))),
tzzId("free", tzzHold(TZ_POST(-0.8, 0.4), 5, "Cut the bonds", { r: 2 })),
tzzRead("🌙 A sensation as of flying", tzbQs("Without a word Tarzan of the Apes cut the bonds which held the Frenchman. Weak from suffering and loss of blood, he would have fallen but for the strong arm that caught him.", "He felt himself lifted from the ground. There was a sensation as of flying, and then he lost consciousness.") + tzSrc(tzBk(20)), "▶ Go on")
] });
tzbCh({ t: "The Search Party", txt: 21, start: { sc: "coast", x: 330, z: -52 }, jump: 1, tune: "grief", keep: ["note", "Clayton's note of apology", "✉️"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, brush: true, bower: true, arrow: true, arrowOut: true, cruiser: true, frBoats: true,
frCamp: tzOn(null, "beach"), env: tzOn("back", null, "tropicdusk"), night: true, nightFrom: "back" },
words: "Dawn, at the French camp in the jungle. D'Arnot is missing; six men are dead.",
intro: "The French camp at dawn",
cast: [
tzc("darnot", TZ_FC(2, 0), { key: "ch", name: "Lieutenant Charpentier", persona: "darnot", greet: "We go back to the beach, and then we come for D'Arnot.", ry: Math.PI, until: "beach" }),
tzc("porter", TZ_FC(-2, 2), { key: "po", ry: 0.6, until: "beach" }),
tzc("cecil", TZ_FC(-3, -1), { key: "ce", ry: 0.3, until: "beach" }),
tzc("jane", TZ_CB(-8, 1), { key: "ja", ry: Math.PI / 2, from: "beach", until: "march" }),
tzc("porter", TZ_CB(-9.5, 1.4), { key: "po2", ry: -Math.PI / 2, from: "beach", until: "talk" }),
tzc("cecil", TZ_CB(-11, -1), { key: "ce2", ry: -Math.PI / 2, from: "beach", until: "march" }),
tzc("darnot", TZ_POST(-10, 40), { key: "ch2", name: "Lieutenant Charpentier", persona: "darnot", greet: "Wait for the volley from the north.", ry: Math.PI, from: "march", until: "back" }),
tzc("sailor", TZ_POST(-14, 42), { key: "f1", dress: "tzfrsail", sex: "m", hair: 0x2A1E14, name: "A French sailor", persona: "frsailor", greet: "...", ry: Math.PI, from: "march", until: "back" }),
tzc("sailor", TZ_POST(-6, 43), { key: "f2", dress: "tzfrsail", sex: "m", hair: 0x5A4030, name: "A sailor who served in the French Congo", persona: "frsailor", greet: "I know a little of their speech.", ry: Math.PI, from: "march", until: "back" }),
tzc("cecil", TZ_POST(-8, 44), { key: "ce3", ry: Math.PI, from: "march", until: "back" }),
tzc("darnot", TZ_CB(-14, 6), { key: "ch3", name: "Lieutenant Charpentier", persona: "darnot", greet: "He was my friend since we were boys.", ry: -Math.PI / 2, from: "back" }),
tzc("cecil", TZ_CB(-9, -1), { key: "ce4", ry: -Math.PI / 2, from: "back" }),
tzc("jane", TZ_CB(-7.5, 0.6), { key: "ja2", ry: Math.PI / 2, from: "back", until: "note" }),
tzc("jane", tzR("cabin", 1.4, 1.6), { key: "ja3", ry: Math.PI, from: "note" }),
tzc("esmeralda", tzR("cabin", -1.6, 1.8), { key: "es", ry: Math.PI, lie: true, from: "note" })
],
steps: [
{ k: "read" },
tzzRead("🌅 A sad and disheartened group", tzbQs("When dawn broke upon the little camp of Frenchmen in the heart of the jungle it found a sad and disheartened group.", "It was slow work, for they bore the bodies of six dead men, two more having succumbed during the night, and several of those who were wounded required support to move even very slowly.") + tzSrc(tzBk(21))),
tzzId("beach", tzzGo(TZ_CB(-12, 0), "Back by the trail to the clearing by the beach, late in the afternoon", { r: 6 })),
tzzRead("😭 Jane, by the cabin door", tzbQs("As the little party emerged from the jungle the first person that Professor Porter and Cecil Clayton saw was Jane, standing by the cabin door.", "With a little cry of joy and relief she ran forward to greet them, throwing her arms about her father's neck and bursting into tears for the first time since they had been cast upon this hideous and adventurous shore.") + tzSrc(tzBk(21))),
tzzId("talk", tzzSay("William Cecil Clayton", "Clayton, when he can speak to her alone", "🙏 God has been good", ["\"Jane!\" he cried, \"God has been good to us, indeed. Tell me how you escaped--what form Providence took to save you for--us.\"", "\"Mr. Clayton,\" she said quietly, extending her hand, \"first let me thank you for your chivalrous loyalty to my dear father. He has told me how noble and self-sacrificing you have been. How can we repay you!\""], tzBk(21))),
tzzSay("Jane Porter", "Jane", "🌳 The forest man", ["\"Where is the forest man who went to rescue you? Why did he not return?\"", "\"He who has saved each of us--who saved me from the gorilla.\""], tzBk(21)),
tzzSay("William Cecil Clayton", "Clayton, and the first germ of jealousy", "😒 His own tribe", ["\"We did not see him,\" he replied quietly. \"He did not join us.\" And then after a moment of thoughtful pause: \"Possibly he joined his own tribe--the men who attacked us.\" He did not know why he had said it, for he did not believe it."], tzBk(21)),
tzzSay("Jane Porter", "Jane", "🎩 A gentleman", ["\"I will not believe it,\" she half whispered. \"It is not true. You shall see,\" she said, addressing Clayton, \"that he will come back and that he will prove that you are wrong. You do not know him as I do. I tell you that he is a gentleman.\""], tzBk(21)),
tzzPuzzle("💎 The locket", "Alone on her bed of ferns, Jane feels something hard against her breast. What does she say to it?", ["\"I will give it back\"", "\"Beast? Then God make me a beast; for, man or beast, I am yours.\"", "\"I must forget him\""], 1, ["No.", "", "She tries to."], { yes: "💎 " + tzbQ("\"Beast?\" she murmured. \"Then God make me a beast; for, man or beast, I am yours.\"") }),
tzzId("march", tzzRead("🪖 The relief expedition", tzbQs("The next morning Clayton left early with the relief expedition in search of Lieutenant D'Arnot. There were two hundred armed men this time, with ten officers and two surgeons, and provisions for a week.") + tzSrc(tzBk(21)))),
tzzGo(TZ_POST(-10, 46), "By the elephant track, straight to the edge of the clearing before Mbonga's village", { r: 6 }),
tzzPuzzle("📯 The signal", "Which party is to give the signal for the assault?", ["Charpentier's", "The party taking its position to the north, the last to reach its station: its opening volley", "The party at the gate"], 1, ["No.", "", "No."], { yes: "📯 " + tzbQ("It was arranged that the party which was to take its position to the north, and which would be the last to gain its station should commence the assault, and that their opening volley should be the signal for a concerted rush from all sides in an attempt to carry the village by storm at the first charge.") }),
tzzReadA("⚖️ A grim massacre", tzbQs("Soon the battle turned to a wild rout, and then to a grim massacre; for the French sailors had seen bits of D'Arnot's uniform upon several of the black warriors who opposed them.", "They spared the children and those of the women whom they were not forced to kill in self-defense, but when at length they stopped, panting, blood covered and sweating, it was because there lived to oppose them no single warrior of all the savage village of Mbonga.") + "<p>Remember what the reader knows and they do not: D'Arnot is alive. Tarzan took him from the post two nights ago. The village they have destroyed is the one that fled the Congo Free State.</p>" + tzSrc(tzBk(21)), "<p>The sailors storm the village. The fighting is terrible, and when it is over the warriors of the village are dead. They search every hut, but D'Arnot is not there, and they believe he has been killed.</p><p>Remember what you know and they do not: D'Arnot is alive. Tarzan carried him off two nights ago.</p>" + tzSrc(tzBk(21))),
tzzPuzzle("🏚️ The village left standing", "What do the Frenchmen decide about the village, in the morning?", ["They burn it", "They had meant to burn it, but leave the prisoners with roofs to cover them and a palisade against the beasts", "They take the prisoners to the ship"], 1, ["They meant to.", "", "No."], { yes: "🏚️ " + tzbQ("The next morning they set out upon the return march. Their original intention had been to burn the village, but this idea was abandoned and the prisoners were left behind, weeping and moaning, but with roofs to cover them and a palisade for refuge from the beasts of the jungle.") }),
tzzId("back", tzzGo(TZ_CB(-13, 4), "The long march back. A single shot before they leave the jungle: the signal that they were too late", { r: 6 })),
tzzSay("Lieutenant Charpentier", "Lieutenant Charpentier, D'Arnot's friend since boyhood", "🇫🇷 An officer and a gentleman", ["\"No, Monsieur,\" he said, \"D'Arnot would have chosen to die thus. I only grieve that I could not have died for him, or at least with him. I wish that you could have known him better, Monsieur. He was indeed an officer and a gentleman--a title conferred on many, but deserved by so few.", "\"He did not die futilely, for his death in the cause of a strange American girl will make us, his comrades, face our ends the more bravely, however they may come to us.\""], tzBk(21)),
tzzSay("William Cecil Clayton", "Clayton, exhausted, at the cabin door with Jane", "😠 A cruel word", ["\"We were too late, Miss Porter,\" he replied sadly.", "\"When your forest god left you he was doubtless hurrying to the feast.\""], tzBk(21)),
tzzSay("Jane Porter", "Jane", "❄️ I regret that I am not a man", ["\"There could be but one suitable reply to your assertion, Mr. Clayton,\" she said icily, \"and I regret that I am not a man, that I might make it.\" She turned quickly and entered the cabin."], tzBk(21)),
tzzSay("William Cecil Clayton", "Clayton, alone", "🤦 She called me a liar", ["\"Upon my word,\" he said ruefully, \"she called me a liar. And I fancy I jolly well deserved it,\" he added thoughtfully. \"Clayton, my boy, I know you are tired out and unstrung, but that's no reason why you should make an ass of yourself. You'd better go to bed.\""], tzBk(21)),
tzzId("note", tzzSpot("The door of the cabin", "Into the cabin: a little note has been pushed under the sailcloth partition")),
tzzRead("✉️ MY DEAR MISS PORTER", tzbQs("I had no reason to insinuate what I did. My only excuse is that my nerves must be unstrung--which is no excuse at all.", "Please try and think that I did not say it. I am very sorry. I would not have hurt YOU, above all others in the world. Say that you forgive me.", "WM. CECIL CLAYTON.") + tzSrc(tzBk(21))),
tzzPuzzle("💌 Another note", "Jane has another note: a love letter found in the grass before the cabin, signed Tarzan of the Apes. Who does she think wrote it?", ["Her forest god", "Some new suitor, perhaps another wild denizen of the forest, she cannot tell who", "Clayton"], 1, ["She does not know they are one and the same.", "", "No."], { yes: "💌 " + tzbQ("Who could be this new suitor? If he were another of the wild denizens of this terrible forest what might he not do to claim her?") }),
tzzSay("Jane Porter", "Jane", "😔 Just plain ugly to-night", ["\"Oh, Esmeralda, I'm just plain ugly to-night,\" said the girl. \"Don't pay any attention to me--that's a dear.\""], tzBk(21))
] });
tzbCh({ t: "Brother Men", txt: 22, start: { sc: "coast", x: 20, z: -72 }, jump: 1, tune: "study", keep: ["bark", "A letter on bark", "📜"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, brush: true, bower: true,
arrow: tzOn(null, "cabin"), arrowOut: tzOn(null, "cabin"), cruiser: tzOn(null, "cabin"), env: tzOn("dusk", null, "tropicdusk"), night: true, nightFrom: "dusk" },
words: "D'Arnot wakes beneath a little A-shaped shelter of boughs, on a bed of ferns and grasses.",
intro: "The bower in the amphitheater",
cast: [
tzc("darnot", tzA("amph", 7, 3), { key: "da", ry: -0.6, lie: true, until: "walk" }),
tzc("tarzan", tzA("amph", 4, 1), { key: "t", ry: 0.8, until: "walk" }),
tzc("darnot", tzA("amph", -6, -6), { key: "da2", ry: 0.6, from: "walk", until: "cabin" }),
tzc("tarzan", tzA("amph", -5, -5), { key: "t2", ry: -2.4, from: "walk", until: "cabin" }),
tzc("darnot", tzR("cabin", 0.6, 0.4), { key: "da3", ry: Math.PI, from: "desk" })
],
steps: [
{ k: "read" },
tzzRead("🌿 A little A-shaped shelter", tzbQs("When D'Arnot regained consciousness, he found himself lying upon a bed of soft ferns and grasses beneath a little \"A\" shaped shelter of boughs.", "Once more he experienced the strange sense of utter bewilderment that had marked his earlier awakening, but soon he recalled the recent past, and looking through the opening at his feet he saw the figure of a man squatting on his haunches.") + tzSrc(tzBk(22))),
tzzGo(tzA("amph", 6, 2), "Go to the shelter with Tarzan: the Frenchman has called faintly", { r: 3 }),
tzzPuzzle("🗣️ No language", "D'Arnot tries French, English, Italian, Spanish, German, even Norwegian, Russian and Greek. What happens?", ["Tarzan answers in English", "The man shakes his head at them all", "He answers in French"], 1, ["He cannot speak it.", "", "Not yet."], { yes: "🗣️ " + tzbQ("D'Arnot knew a few words of Norwegian, Russian, Greek, and also had a smattering of the language of one of the West Coast negro tribes--the man denied them all.") }),
tzzGather("fruit", tzA("amph", -28, 12), 2, "Fruit and a gourd of water", "Bring him fruit, and water in a hollow gourd", { spread: 8 }),
tzzFind("pencil", tzA("amph", 5, 1), "Bark and a pencil", "Then: several pieces of bark and, wonder of wonders, a lead pencil"),
tzzRead("📜 Can you read this language?", tzbQs("I am Tarzan of the Apes. Who are you? Can you read this language?", "\"MON DIEU!\" cried D'Arnot. \"If you are English why is it then that you cannot speak English?\"", "I am Paul d'Arnot, Lieutenant in the navy of France. I thank you for what you have done for me. You have saved my life, and all that I have is yours. May I ask how it is that one who writes English does not speak it?") + tzSrc(tzBk(22))),
tzzRead("🦍 The language of my tribe", tzbQs("I speak only the language of my tribe--the great apes who were Kerchak's; and a little of the languages of Tantor, the elephant, and Numa, the lion, and of the other folks of the jungle I understand. With a human being I have never spoken, except once with Jane Porter, by signs. This is the first time I have spoken with another of my kind through written words.") + tzSrc(tzBk(22))),
tzzPuzzle("🦍 The gorilla", "\"Except once, with Jane Porter.\" What does D'Arnot suddenly understand?", ["That Jane is dead", "That this man was the gorilla who carried Jane Porter into the jungle", "That he is Lord Greystoke"], 1, ["No.", "", "Not yet."], { yes: "🦍 " + tzbQ("She is not dead. She was taken by Terkoz to be his wife; but Tarzan of the Apes took her away from Terkoz and killed him before he could harm her.") + " " + tzbQ("None in all the jungle may face Tarzan of the Apes in battle, and live. I am Tarzan of the Apes--mighty fighter.") }),
tzzPuzzle("🐒 Why not fetch help?", "D'Arnot begs Tarzan to go and lead his people here. Why won't Tarzan leave him?", ["He does not know the way", "The great apes come often to this spot, and would kill him, wounded and alone", "He wants the reward"], 1, ["He knows every way.", "", "No."], { yes: "🐒 " + tzbQ("I had thought of that--the first day; but I dared not. The great apes come often to this spot, and if they found you here, wounded and alone, they would kill you.") }),
tzzHold(tzA("amph", 7.6, 2.4), 8, "The fever. Sit beside him through three days of delirium: bathe his head and hands, wash his wounds", { r: 2.5 }),
tzzId("walk", tzzRead("🌳 Beneath a great tree", tzbQs("Two days later, D'Arnot was tottering about the amphitheater, Tarzan's strong arm about him to keep him from falling.", "What can I do to repay you for all that you have done for me?", "Teach me to speak the language of men.") + tzSrc(tzBk(22)))),
tzzPuzzle("🇫🇷 HOMME", "Which language does D'Arnot teach him?", ["English", "French, his own, which he understands best of all", "Latin"], 1, ["That will cause trouble later.", "", "No."], { yes: "🇫🇷 " + tzbQ("And so D'Arnot commenced at once, pointing out familiar objects and repeating their names in French, for he thought that it would be easier to teach this man his own language, since he understood it himself best of all.") + " " + tzbQ("He was a most eager student, and in two more days had mastered so much French that he could speak little sentences such as: \"That is a tree,\" \"this is grass,\" \"I am hungry,\" and the like, but D'Arnot found that it was difficult to teach him the French construction upon a foundation of English.") }),
tzzGather("wood", tzA("amph", -8, -8), 3, "Things to name", "Point to things with them, and say their names: arbre, herbe, homme", { spread: 6 }),
tzzSay("Tarzan of the Apes", "Tarzan, when D'Arnot writes that he cannot carry him all that way", "😄 MAIS OUI", ["\"MAIS OUI,\" he said, and D'Arnot laughed aloud to hear the phrase that he used so often glide from Tarzan's tongue."], tzBk(22)),
tzzRead("❤️ Unselfishly", tzbQs("It had been hard for him to remain with the Frenchman all these days for that very reason, and that he had unselfishly done so spoke more glowingly of his nobility of character than even did his rescuing the French officer from Mbonga's clutches.") + tzSrc(tzBk(22))),
tzzId("cabin", tzzGo(TZ_CB(-12, 0), "Through the trees with D'Arnot on his back, to the clearing by the beach. Mid-afternoon", { r: 6 })),
tzzRead("🚪 Deserted", tzbQs("No one was in sight outside the cabin, and D'Arnot was perplexed to note that neither the cruiser nor the Arrow was at anchor in the bay.", "Tarzan lifted the latch and pushed the great door in upon its wooden hinges. It was as they had feared. The cabin was deserted.", "The men turned and looked at one another. D'Arnot knew that his people thought him dead; but Tarzan thought only of the woman who had kissed him in love and now had fled from him while he was serving one of her people.") + tzSrc(tzBk(22))),
tzzId("desk", tzzSpot("The door of the cabin", "Go in with D'Arnot")),
tzzFind("letter", tzR("cabin", 1.2, -1.6), "Two notes addressed to Tarzan of the Apes", "On the desk John Clayton built: two notes. One is sealed"),
tzzGo(tzTop(7), "But Tarzan has gone. Far to the east, he speeds through the middle terrace back to his tribe", { r: 4 }),
tzzRead("🐆 Sabor", tzbQs("And far to the east Tarzan of the Apes was speeding through the middle terrace back to his tribe. Never had he traveled with such reckless speed. He felt that he was running away from himself--that by hurtling through the forest like a frightened squirrel he was escaping from his own thoughts. But no matter how fast he went he found them always with him.", "He passed above the sinuous body of Sabor, the lioness, going in the opposite direction--toward the cabin, thought Tarzan.") + tzSrc(tzBk(22))),
tzzPuzzle("🤔 An ape or a man?", "Tarzan stops. \"What are you, Tarzan? An ape or a man?\" What does he answer himself?", ["An ape: let the Frenchman look after himself", "If a man, he will go back to protect his kind, and not run away from one of his own people because one of them has run from him", "Neither"], 1, ["That is what an ape would do.", "", "No."], { yes: "🤔 " + tzbQ("\"If you are a man, you will return to protect your kind. You will not run away from one of your own people, because one of them has run away from you.\"") }),
tzzId("dusk", tzzRead("✉️ TO TARZAN OF THE APES", tzbQs("We thank you for the use of your cabin, and are sorry that you did not permit us the pleasure of seeing and thanking you in person.", "We sail within the hour, never to return; but we wish you and that other jungle friend to know that we shall always thank you for what you did for strangers on your shore, and that we should have done infinitely more to reward you both had you given us the opportunity.", "\"'Never to return,'\" muttered D'Arnot, and threw himself face downward upon the cot.") + tzSrc(tzBk(22)))),
tzzRead("🔫 The latch moving", tzbQs("An hour later he started up listening. Something was at the door trying to enter.", "Gently the door opened until a thin crack showed something standing just beyond.", "D'Arnot sighted along the blue barrel at the crack of the door--and then he pulled the trigger.") + tzSrc(tzBk(22)), "▶ Go on")
] });
var TZ_TREE = function (dx, dz) { return function () { return { sc: "coast", x: TZW_CO.cabin[0] + 6 + (dx || 0), z: TZW_CO.cabin[1] + 9 + (dz || 0) }; }; };
var TZ_SH = function (z, dx) { return function () { return { sc: "coast", x: tzwCoastX(z) + 22 + (dx || 0), z: z }; }; };
var TZ_MS = function (dx, dz) { return function () { return { sc: "coast", x: TZW_MISSION[0] + (dx || 0), z: TZW_MISSION[1] + (dz || 0) }; }; };
tzbCh({ t: "Lost Treasure", txt: 23, start: { sc: "coast", x: -380, z: 20 }, jump: 1, tune: "search", keep: ["prayer", "Jane's prayer", "🙏"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, bower: true, arrow: true, arrowOut: true, cruiser: true, frBoats: true,
brush: tzOn(null, "dig"), trench: tzOn("dig", null) },
words: "The relief expedition is back, too late. Captain Dufranne would steam away at once; all agree, save Jane.",
intro: "The beach, walking up to the cabin",
cast: [
tzc("dufranne", TZ_CB(-14, 4), { key: "du", ry: Math.PI / 2, until: "tree" }),
tzc("jane", TZ_CB(-13, 6), { key: "ja", ry: Math.PI / 2, until: "tree" }),
tzc("dufranne", TZ_TREE(-1.6, 0), { key: "du2", ry: Math.PI / 2, from: "tree", until: "dig" }),
tzc("jane", TZ_TREE(-0.6, 1.6), { key: "ja2", ry: Math.PI, from: "tree", until: "dig" }),
tzc("porter", TZ_TREE(1.4, 1.2), { key: "po", ry: -2.2, from: "tree", until: "gone" }),
tzc("philander", TZ_TREE(2.0, -0.6), { key: "ph", ry: -1.4, from: "tree", until: "dig" }),
tzc("cecil", TZ_TREE(0.6, -1.8), { key: "ce", ry: 0, from: "tree", until: "dig" }),
tzc("darnot", TZ_TREE(-1.4, -1.6), { key: "ch", name: "Lieutenant Charpentier", persona: "darnot", greet: "The eyes in the dark, monsieur. I shall see them forever.", ry: 0.6, from: "tree", until: "dig" }),
tzc("esmeralda", TZ_TREE(3.0, 2.6), { key: "es", ry: -2.4, from: "tree", until: "sail" }),
tzc("cecil", TZ_BL(1, 3), { key: "ce2", ry: Math.PI, from: "dig", until: "gone" }),
tzc("darnot", TZ_BL(-1, 2), { key: "ch2", name: "Lieutenant Charpentier", persona: "darnot", greet: "Rien. Nothing beneath him.", ry: 0.4, from: "dig", until: "gone" }),
tzc("sailor", TZ_BL(3.4, 1), { key: "mu", dress: "tzsailor", sex: "m", hair: 0x5A3A2A, name: "A mutineer of the Arrow, as guide", persona: "sailor", greet: "It was here! I swear it was here!", ry: -Math.PI / 2, from: "dig", until: "gone" }),
tzc("sailor", TZ_BL(2, -1), { key: "f1", dress: "tzfrsail", sex: "m", hair: 0x2A1E14, name: "A French sailor with a spade", persona: "frsailor", greet: "...", ry: 0, from: "dig", until: "gone" }),
tzc("cecil", TZ_CB(-9, 0), { key: "ce3", ry: Math.PI / 2, from: "gone", until: "sail" }),
tzc("porter", TZ_CB(-10, 2), { key: "po2", ry: Math.PI / 2, from: "gone", until: "sail" }),
tzc("jane", tzR("cabin", 1.4, 1.6), { key: "ja3", ry: Math.PI, from: "sail" })
],
steps: [
{ k: "read" },
tzzSay("Jane Porter", "Jane, walking up from the beach with the captain", "🚫 I shall not go", ["\"No,\" she said, determinedly, \"I shall not go, nor should you, for there are two friends in that jungle who will come out of it some day expecting to find us awaiting them.", "\"Had he been too late to be of service to the lieutenant he would have been back before now--the fact that he is not back is sufficient proof to me that he is delayed because Lieutenant D'Arnot is wounded, or he has had to follow his captors further than the village which your sailors attacked.\""], tzBk(23)),
tzzSay("Captain Dufranne", "Captain Dufranne", "😄 This superman of yours", ["\"Possibly your forest man, himself was captured or killed by the savages,\" suggested Captain Dufranne.", "\"You do not know him,\" she replied, a little thrill of pride setting her nerves a-tingle at the thought that she spoke of her own.", "\"I admit that he would be worth waiting for, this superman of yours,\" laughed the captain. \"I most certainly should like to see him.\""], tzBk(23)),
tzzId("tree", tzzGo(TZ_TREE(-5, -4), "Join the little group on camp stools in the shade of the great tree beside the cabin", { r: 5 })),
tzzSay("Mr. Samuel T. Philander", "Mr. Philander, for once against the professor", "🛡️ Protector and provider", ["\"I do not agree with you,\" objected Mr. Philander. \"He had ample opportunity to harm us himself, or to lead his people against us. Instead, during our long residence here, he has been uniformly consistent in his role of protector and provider.\""], tzBk(23)),
tzzSay("Jane Porter", "Jane, his loyal champion", "⚖️ The defense", ["\"You would not wonder that I defend him,\" said the girl, \"could you have seen him as I saw him, battling in my behalf with that huge hairy brute.", "\"And could you have seen the chivalrous treatment which he accorded a strange girl of a strange race, you would feel the same absolute confidence in him that I feel.\""], tzBk(23)),
tzzPuzzle("⚖️ The verdict", "What does Captain Dufranne decide?", ["To sail at once", "\"This court finds the defendant not guilty\": the cruiser will wait a few days longer", "To leave Jane behind"], 1, ["Not now.", "", "Never."], { yes: "⚖️ " + tzbQ("\"You have won your suit, my fair pleader,\" cried the captain. \"This court finds the defendant not guilty, and the cruiser shall wait a few days longer that he may have an opportunity to come and thank the divine Portia.\"") }),
tzzSay("Lieutenant Charpentier", "Lieutenant Charpentier, quietly", "👁️ The eyes in the dark", ["\"MON DIEU! I shall see them in the dark forever--the eyes that you see, and those that you don't see, but feel--ah, they are the worst.\"", "\"And he is out there,\" she said, in an awe-hushed whisper. \"Those eyes will be glaring at him to-night, and at your comrade Lieutenant D'Arnot. Can you leave them, gentlemen, without at least rendering them the passive succor which remaining here a few days longer might insure them?\""], tzBk(23)),
tzzSay("Professor Archimedes Q. Porter", "The professor, remembering", "💰 The treasure!", ["\"We can utilize the morrow in recovering the chest, Professor,\" suggested Mr. Philander.", "\"Quite so, quite so, Mr. Philander, I had almost forgotten the treasure,\" exclaimed Professor Porter. \"Possibly we can borrow some men from Captain Dufranne to assist us, and one of the prisoners to point out the location of the chest.\""], tzBk(23)),
tzzId("dig", tzzGo(TZ_BL(0, 0), "Next day, with Lieutenant Charpentier, ten men and a mutineer as guide, to the bluff on the point", { r: 4 })),
tzzHold(TZ_BL(2, 1), 6, "Dig where the guide points, beneath the tree", { r: 3 }),
tzzPuzzle("🕳️ Beneath Snipes", "What do the spades find?", ["The chest", "Snipes's body, and beneath it a hole filled with loose earth, and no chest", "Nothing at all"], 1, ["Look again.", "", "Something was there."], { yes: "🕳️ " + tzbQ("\"God only knows, Professor,\" replied Clayton. \"We might have thought the fellow who guided us was lying about the location, but his surprise and consternation on finding no chest beneath the body of the murdered Snipes were too real to be feigned. And then our spades showed us that SOMETHING had been buried beneath the corpse, for a hole had been there and it had been filled with loose earth.\"") }),
tzzId("gone", tzzGo(TZ_CB(-12, 2), "Back toward the cabin, empty-handed. The professor hurries to meet you", { r: 5 })),
tzzSay("Professor Archimedes Q. Porter", "Professor Porter", "😧 Gone!", ["\"Where is the treasure?\" he cried to Clayton, while yet a hundred feet separated them.", "\"Gone! It cannot be. Who could have taken it?\" cried Professor Porter."], tzBk(23)),
tzzPuzzle("🧐 Who took it?", "Jane points out that four men carried it. Who do they decide must have taken it?", ["The French sailors", "A party of natives who watched it buried", "The mutineers"], 1, ["The professor would as soon suspect Clayton.", "", "They were all aboard."], { yes: "🧐 " + tzbQ("\"By jove!\" cried Clayton. \"That's right. It must have been done by a party of blacks. Probably one of them saw the men bury the chest and then returned immediately after with a party of his friends, and carried it off.\"") + " (You know better: it lies under the turf of the amphitheater of the apes, by the drum.)" }),
tzzSay("Professor Archimedes Q. Porter", "The professor, sadly", "😔 We shall never see it again", ["\"Speculation is futile,\" said Professor Porter sadly. \"The chest is gone. We shall never see it again, nor the treasure that was in it.\""], tzBk(23)),
tzzId("sail", tzzRead("⚓ Six days later", tzbQs("Six days later Captain Dufranne announced that they would sail early on the morrow.", "It was she, though, who suggested that arms, ammunition, supplies and comforts be left behind in the cabin, ostensibly for that intangible personality who had signed himself Tarzan of the Apes, and for D'Arnot should he still be living, but really, she hoped, for her forest god--even though his feet should prove of clay.") + tzSrc(tzBk(23)))),
tzzGather("tin", tzR("cabin", 0, 0), 3, "Supplies for the cabin", "Help set out arms, ammunition and comforts in the cabin for whoever may come", { spread: 2.2 }),
tzzFind("letter", tzR("cabin", 1.2, -1.6), "A sealed letter", "Last of all, Jane leaves a sealed letter on the desk, for Tarzan of the Apes"),
tzzSay("Jane Porter", "Jane, kneeling by the bed where she slept so many nights", "🙏 I love you", ["\"I love you, and because I love you I believe in you. But if I did not believe, still should I love. Had you come back for me, and had there been no other way, I would have gone into the jungle with you--forever.\""], tzBk(23))
] });
tzbCh({ t: "The Outpost of the World", txt: 24, start: { sc: "coast", x: -760, z: 842, y: -80, ry: Math.PI }, jump: 1, tune: "study", keep: ["prints", "The little finger prints", "👣"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, bower: true, trench: true },
words: "The cabin by the beach, at dusk. D'Arnot has fired at the crack of the opening door.",
intro: "The cabin, the shot still ringing",
cast: [
tzc("darnot", tzR("cabin", -1.2, 0.4), { key: "da", ry: -Math.PI / 2, until: "north" }),
tzc("tarzan", tzR("cabin", -2.4, 0.4), { key: "t", ry: Math.PI / 2, lie: true, until: "wake" }),
tzc("tarzan", tzR("cabin", -2.2, 1.6), { key: "t2", ry: Math.PI / 2, from: "wake", until: "north" }),
tzc("darnot", TZ_SH(-270, 0), { key: "da2", ry: Math.PI, from: "north", until: "diary" }),
tzc("tarzan", TZ_SH(-272, 1.5), { key: "t3", ry: Math.PI, from: "north", until: "diary" }),
tzc("darnot", TZ_SH(-530, 4), { key: "da3", ry: 0.4, from: "diary", until: "field" }),
tzc("tarzan", TZ_SH(-532, 2), { key: "t4", ry: -0.4, from: "diary", until: "field" }),
tzc("villager", TZ_MS(46, -6), { key: "m1", dress: "tzvillf", sex: "f", name: "A woman hoeing in the mission field", persona: "mission", greet: "Good day. The Father is inside.", ry: 0.6, until: "gate" }),
tzc("villager", TZ_MS(50, 4), { key: "m2", dress: "tzvillm", sex: "m", name: "A man of the mission at work", persona: "mission", greet: "Welcome, strangers.", ry: -0.4, until: "gate" }),
tzc("villager", TZ_MS(42, 10), { key: "m3", dress: "tzvillf", sex: "f", name: "A girl in the field", persona: "mission", greet: "...", ry: 2.0, until: "gate" }),
tzc("villager", TZ_MS(31, -2), { key: "fc", dress: "clergy", sex: "m", hair: 0x6A6A6A, beard: "full", name: "Father Constantine", persona: "constantine", greet: "Welcome, welcome. You have come a long way.", ry: Math.PI / 2, from: "field" }),
tzc("darnot", TZ_MS(36, 1), { key: "da4", ry: -Math.PI / 2, from: "field" }),
tzc("tarzand", TZ_MS(36, -1.6), { key: "t5", ry: -Math.PI / 2, from: "field" }),
tzc("villager", TZ_MS(-16, 4), { key: "m4", dress: "tzvillf", sex: "f", name: "A seamstress of the mission", persona: "mission", greet: "White duck, for the two gentlemen. It is nearly done.", ry: 1.2, from: "gate" }),
tzc("villager", TZ_MS(-12, 12), { key: "m5", dress: "tzvillm", sex: "m", name: "The mission's carpenter", persona: "mission", greet: "Good day to you.", ry: 0.2, from: "gate" })
],
steps: [
{ k: "read" },
tzzReadA("💥 He had shot his friend", tzbQs("With the report of his gun D'Arnot saw the door fly open and the figure of a man pitch headlong within onto the cabin floor.", "The Frenchman in his panic raised his gun to fire again into the prostrate form, but suddenly in the half dusk of the open door he saw that the man was white and in another instant realized that he had shot his friend and protector, Tarzan of the Apes.", "The bullet had struck a glancing blow upon the skull. There was an ugly flesh wound, but no signs of a fracture of the skull.") + tzSrc(tzBk(24)), "<p>It is Tarzan at the door! D'Arnot has shot his own friend. But the bullet has only grazed his head, and he will be well.</p>" + tzSrc(tzBk(24))),
tzzHold(tzR("cabin", -2.0, 0.6), 5, "Kneel with D'Arnot: bathe the blood from his face", { r: 2 }),
tzzId("wake", tzzRead("😄 A little scratch", tzbQs("Tarzan, after reading the message, sat on the edge of the couch and laughed.", "\"It is nothing,\" he said in French, and then, his vocabulary failing him, he wrote:", "You should have seen what Bolgani did to me, and Kerchak, and Terkoz, before I killed them--then you would laugh at such a little scratch.") + tzSrc(tzBk(24)))),
tzzPuzzle("✉️ A sealed envelope", "D'Arnot hands him Jane's letter. Why does Tarzan give it straight back?", ["He cannot read it", "He has never seen a sealed envelope, and cannot find how to open it", "He is angry"], 1, ["He reads well.", "", "Not yet."], { yes: "✉️ " + tzbQ("Tarzan read the first one through with a look of sorrow on his face. The second one he turned over and over, searching for an opening--he had never seen a sealed envelope before. At length he handed it to D'Arnot.") }),
tzzRead("✉️ TO TARZAN OF THE APES", tzbQs("There is another I should like to thank also, but he did not come back, though I cannot believe that he is dead.", "I do not know his name. He is the great white giant who wore the diamond locket upon his breast.", "Tell him, also, that in my home in America, in the city of Baltimore, there will always be a welcome for him if he cares to come.", "I found a note you wrote me lying among the leaves beneath a tree near the cabin. I do not know how you learned to love me, who have never spoken to me, and I am very sorry if it is true, for I have already given my heart to another.") + tzSrc(tzBk(24))),
tzzPuzzle("💔 Given to another", "\"I have already given my heart to another.\" Who does Jane mean, and what does Tarzan think she means?", ["She means Clayton, and Tarzan knows it", "She means her forest man, who is Tarzan himself; but she wrote to 'Tarzan of the Apes', so he thinks she loves someone else", "She means no one"], 1, ["No.", "", "She means it."], { yes: "💔 " + tzbQ("Tarzan sat with gaze fixed upon the floor for nearly an hour. It was evident to him from the notes that they did not know that he and Tarzan of the Apes were one and the same.") + " " + tzbQ("\"I have given my heart to another,\" he repeated over and over again to himself.") }),
tzzFind("book", tzR("cabin", 2.6, 2.0), "A well-thumbed geography", "A week of French later: \"Where is America?\" Fetch the geography from the cupboard"),
tzzSay("Tarzan of the Apes", "Tarzan, his palm upon the map", "🌍 Scarce the width of my hand", ["\"Now point out America,\" said Tarzan.", "\"You see it is not so very far,\" he said; \"scarce the width of my hand.\"", "\"This little mark,\" he said, \"is many times larger upon this map than your cabin is upon the earth. Do you see now how very far it is?\""], tzBk(24)),
tzzPuzzle("🪙 What is money?", "\"How will you get to America without money?\" asks D'Arnot. What does Tarzan answer, once he understands money?", ["\"I will take it\"", "\"Very well. I will work for it, then.\"", "\"I do not need it\""], 1, ["No.", "", "He will."], { yes: "🪙 " + tzbQ("\"Very well. I will work for it, then.\"") + " " + tzbQ("\"No, my friend,\" returned D'Arnot, \"you need not worry about money, nor need you work for it. I have enough money for two--enough for twenty. Much more than is good for one man and you shall have all you need if ever we reach civilization.\"") }),
tzzId("north", tzzTravel("🧭 North along the shore", "<p>" + tzbQ("So on the following day they started north along the shore. Each man carrying a rifle and ammunition, beside bedding and some food and cooking utensils.") + " " + tzbQ("The latter seemed to Tarzan a most useless encumbrance, so he threw his away.") + "</p>" + tzSrc(tzBk(24)), TZ_SH(-266, 0), "North along the shore with them", "▶ Walk")),
tzzSay("Lieutenant Paul D'Arnot", "D'Arnot, at supper", "🍴 Knife and fork", ["\"You must not eat like a brute, Tarzan, while I am trying to make a gentleman of you. MON DIEU! Gentlemen do not thus--it is terrible.\""], tzBk(24)),
tzzPuzzle("📦 The chest", "On the march Tarzan tells D'Arnot of the chest he dug up and buried by the drum. What does D'Arnot say it must be?", ["Gold of the mutineers", "The treasure chest of Professor Porter", "A coffin"], 1, ["In a way.", "", "No."], { yes: "📦 " + tzbQ("\"It must be the treasure chest of Professor Porter,\" said D'Arnot. \"It is too bad, but of course you did not know.\"") + " " + tzbQ("\"I have a better plan, Tarzan,\" exclaimed D'Arnot. \"We shall go on together to the nearest settlement, and there we will charter a boat and sail back down the coast for the treasure and so transport it easily. That will be safer and quicker and also not require us to be separated. What do you think of that plan?\"") }),
tzzSay("Lieutenant Paul D'Arnot", "D'Arnot, on men", "🧠 Mind, and not muscle", ["\"You will think more highly of your genus when you have seen its armies and navies, its great cities, and its mighty engineering works. Then you will realize that it is mind, and not muscle, that makes the human animal greater than the mighty beasts of your jungle."], tzBk(24)),
tzzSay("Tarzan of the Apes", "Tarzan", "🦍 Kala, my mother", ["\"You are right, D'Arnot,\" replied Tarzan, \"for if Kerchak had come to Tublat's aid that night at the Dum-Dum, there would have been an end of me. But Kerchak could never think far enough ahead to take advantage of any such opportunity. Even Kala, my mother, could never plan ahead. She simply ate what she needed when she needed it, and if the supply was very scarce, even though she found plenty for several meals, she would never gather any ahead.", "\"Yes. She was a great, fine ape, larger than I, and weighing twice as much.\"", "\"I did not know him. Kala told me he was a white ape, and hairless like myself. I know now that he must have been a white man.\""], tzBk(24)),
tzzSay("Lieutenant Paul D'Arnot", "D'Arnot, looking long at him", "🧬 Pure man", ["\"Tarzan,\" he said at length, \"it is impossible that the ape, Kala, was your mother. If such a thing can be, which I doubt, you would have inherited some of the characteristics of the ape, but you have not--you are pure man, and, I should say, the offspring of highly bred and intelligent parents. Have you not the slightest clue to your past?\""], tzBk(24)),
tzzId("diary", tzzFind("book", TZ_SH(-530, 2), "The little black diary", "Tarzan fishes from his quiver the one book he could never read")),
tzzPuzzle("📔 In French", "Why could Tarzan never read the diary?", ["It is in code", "It is written in French", "The ink has faded"], 1, ["No.", "", "Not that."], { yes: "📔 " + tzbQ("\"It is the diary of John Clayton, Lord Greystoke, an English nobleman, and it is written in French,\" he said.") }),
tzzRead("👣 The seal of his tiny finger prints", tzbQs("To-day our little boy is six months old. He is sitting in Alice's lap beside the table where I am writing--a happy, healthy, perfect child.", "Somehow, even against all reason, I seem to see him a grown man, taking his father's place in the world--the second John Clayton--and bringing added honors to the house of Greystoke.", "There--as though to give my prophecy the weight of his endorsement--he has grabbed my pen in his chubby fists and with his inkbegrimed little fingers has placed the seal of his tiny finger prints upon the page.", "And there, on the margin of the page, were the partially blurred imprints of four wee fingers and the outer half of the thumb.") + tzSrc(tzBk(24))),
tzzSay("Lieutenant Paul D'Arnot", "D'Arnot", "👑 You are Lord Greystoke", ["\"Well! Tarzan of the Apes, what think you?\" asked D'Arnot. \"Does not this little book clear up the mystery of your parentage?", "\"Why man, you are Lord Greystoke.\""], tzBk(24)),
tzzPuzzle("💀 One child", "Why does Tarzan say he cannot be Lord Greystoke?", ["He does not want to be", "The diary speaks of one child, and its little skeleton lay in the crib until the Porters buried it", "He was born in the jungle"], 1, ["He does not care.", "", "He thinks so."], { yes: "💀 " + tzbQ("\"The book speaks of but one child,\" he replied. \"Its little skeleton lay in the crib, where it died crying for nourishment, from the first time I entered the cabin until Professor Porter's party buried it, with its father and mother, beside the cabin.") + " But D'Arnot has the key to it: " + tzbQ("D'Arnot shook his head. He was unconvinced, and in his mind had sprung the determination to prove the correctness of his theory, for he had discovered the key which alone could unlock the mystery, or consign it forever to the realms of the unfathomable.") }),
tzzTravel("🌄 A clearing in the forest", "<p>" + tzbQ("A week later the two men came suddenly upon a clearing in the forest.") + " " + tzbQ("In the distance were several buildings surrounded by a strong palisade.") + "</p>" + tzSrc(tzBk(24)), TZ_MS(70, 0), "On, to the edge of the clearing", "▶ Walk"),
tzzPuzzle("🏹 The bow", "Out of jungle habit, Tarzan fits a poisoned arrow at the people working in the field. What does D'Arnot tell him?", ["To aim well", "Do not assume that men are your enemies until they prove it", "To hide"], 1, ["No!", "", "No."], { yes: "🏹 " + tzbQ("\"Wait until the blacks spring upon you,\" replied D'Arnot, \"then you may kill them. Do not assume that men are your enemies until they prove it.\"") + " " + tzbQ("\"Come,\" said Tarzan, \"let us go and present ourselves to be killed,\" and he started straight across the field, his head high held and the tropical sun beating upon his smooth, brown skin.") }),
tzzId("field", tzzGo(TZ_MS(40, 0), "Walk across the field with them, head high", { r: 5 })),
tzzSay("Father Constantine", "A white man with a rifle, at the gate", "⛪ Father Constantine", ["\"Do not fire! We are friends!\"", "\"What manner of men are you?\" he asked, in French.", "\"I am Father Constantine of the French Mission here,\" he said, \"and I am glad to welcome you.\""], tzBk(24)),
tzzId("gate", tzzRead("🏛️ The first outpost of civilization", tzbQs("\"This is Monsieur Tarzan, Father Constantine,\" replied D'Arnot, indicating the ape-man; and as the priest extended his hand to Tarzan, D'Arnot added: \"and I am Paul D'Arnot, of the French Navy.\"", "And thus came Tarzan of the Apes to the first outpost of civilization.") + tzSrc(tzBk(24)))),
tzzSpot("The door of the mission house", "Go in with them: a week at the mission, learning the ways of men", { at: TZ_MS(-1, -8) }),
tzzRead("👔 White duck", tzbQs("For a week they remained there, and the ape-man, keenly observant, learned much of the ways of men; meanwhile black women sewed white duck garments for himself and D'Arnot so that they might continue their journey properly clothed.") + tzSrc(tzBk(24)), "▶ Go on")
] });
var TZ_PT2 = function (dx, dz) { return function () { return { sc: "coast", x: TZW_PORT[0] + (dx || 0), z: TZW_PORT[1] + (dz || 0) }; }; };
var TZ_VER = function (dx, dz) { return function () { return { sc: "coast", x: TZW_PORT[0] + 13 + (dx || 0), z: TZW_PORT[1] + 8 + (dz || 0) }; }; };
tzbCh({ t: "The Height of Civilization", txt: 25, start: { sc: "coast", x: -380, z: -820 }, jump: 1, tune: "study", keep: ["francs", "Ten thousand francs", "💶"],
state: { graves: true, saborDead: true, kerchakDead: true, noTribe: true, noLanding: true, bower: true, trench: true,
env: tzOn("wager", "morning", "junglenight"), night: true, nightFrom: "wager", nightUntil: "morning", arrow: tzOn("tub", null), arrowOut: false },
words: "Another month north. A little group of buildings at the mouth of a wide river, many boats, and many men.",
intro: "The edge of the little port",
cast: [
tzc("darnot", TZ_VER(0, -2), { key: "da", ry: -Math.PI / 2, until: "tub" }),
tzc("tarzand", TZ_VER(0, 0), { key: "t", ry: -Math.PI / 2, until: "go" }),
tzc("villager", TZ_VER(0.4, 2.6), { key: "w", dress: "gent", sex: "m", hair: 0x5A4030, beard: "mustache", name: "The wagerer", persona: "portman", greet: "Ah, Monsieur Tarzan! Sit, sit. We were speaking of lions.", ry: -Math.PI / 2, until: "tub" }),
tzc("villager", TZ_VER(0.4, 5.2), { key: "e", dress: "gent", sex: "m", hair: 0xB8904A, name: "An Englishman on the veranda", persona: "portman", greet: "Beastly hot, what?", ry: -Math.PI / 2, until: "tub" }),
tzc("villager", TZ_VER(-1.2, 4.0), { key: "b", dress: "gent", sex: "m", hair: 0x2A2420, beard: "full", name: "A Belgian back from the gorilla country", persona: "portman", greet: "I have heard that cry before, in the gorilla country.", ry: Math.PI / 2, until: "tub" }),
tzc("villager", TZ_PT2(30, -2), { key: "p1", dress: "tzvillm", sex: "m", name: "A boatman at the jetty", persona: "mission", greet: "Boats for hire, monsieur.", ry: -Math.PI / 2 }),
tzc("villager", TZ_PT2(40, 10), { key: "p2", dress: "tzvillf", sex: "f", name: "A market-woman of the port", persona: "mission", greet: "Fruit, fish, cloth. Good prices.", ry: Math.PI }),
tzc("numa", TZ_PT2(120, 20), { key: "nu", beast: "numa", ry: -1.0, from: "hunt", until: "kill", mute: true }),
tzc("numa", TZ_PT2(120, 20), { key: "nu2", beast: "numa", ry: 0.4, lie: true, mute: true, from: "kill", until: "tub" }),
tzc("tarzan", TZ_CB(-10, 0), { key: "t3", ry: Math.PI / 2, from: "tub", until: "paris" }),
tzc("darnot", TZ_CB(-12, 2), { key: "da2", ry: Math.PI / 2, from: "tub", until: "paris" })
],
steps: [
{ k: "read" },
tzzRead("🛶 Many boats, many men", tzbQs("Another month brought them to a little group of buildings at the mouth of a wide river, and there Tarzan saw many boats, and was filled with the timidity of the wild thing by the sight of many men.", "Gradually he became accustomed to the strange noises and the odd ways of civilization, so that presently none might know that two short months before, this handsome Frenchman in immaculate white ducks, who laughed and chatted with the gayest of them, had been swinging naked through primeval forests to pounce upon some unwary victim, which, raw, was to fill his savage belly.") + tzSrc(tzBk(25))),
tzzGo(TZ_PT2(4, -4), "Walk down among the boats and the people of the port", { r: 6 }),
tzzSay("Lieutenant Paul D'Arnot", "D'Arnot", "🎩 A gentleman at heart", ["\"God made you a gentleman at heart, my friend,\" D'Arnot had said; \"but we want His works to show upon the exterior also.\""], tzBk(25)),
tzzPuzzle("⏳ A month's wait", "Why must they wait a month at the port?", ["For the rains to end", "D'Arnot waits for funds from his bankers, and they cannot charter a vessel to go back for the treasure", "Tarzan is ill"], 1, ["No.", "", "No."], { yes: "⏳ " + tzbQ("He had also cabled his bankers for funds, and the enforced wait of a month, under which both chafed, was due to their inability to charter a vessel for the return to Tarzan's jungle after the treasure.") }),
tzzGo(TZ_VER(-3, 1), "Up the broad steps to the hotel veranda, where the talk falls upon lions", { r: 3 }),
tzzSay("Tarzan of the Apes", "Monsieur Tarzan, who has not expressed himself", "🦁 As much individuality", ["\"There is as much individuality among the lower orders, gentlemen, as there is among ourselves. Today we may go out and stumble upon a lion which is over-timid--he runs away from us. To-morrow we may meet his uncle or his twin brother, and our friends wonder why we do not return from the jungle. For myself, I always assume that a lion is ferocious, and so I am never caught off my guard.\""], tzBk(25)),
tzzSay("Tarzan of the Apes", "Tarzan, on fear", "⚖️ The pleasure of the hunt", ["\"I do not exactly understand what you mean by fear,\" said Tarzan. \"Like lions, fear is a different thing in different men, but to me the only pleasure in the hunt is the knowledge that the hunted thing has power to harm me as much as I have to harm him. If I went out with a couple of rifles and a gun bearer, and twenty or thirty beaters, to hunt a lion, I should not feel that the lion had much chance, and so the pleasure of the hunt would be lessened in proportion to the increased safety which I felt.\""], tzBk(25)),
tzzPuzzle("🔪 And a piece of rope", "They laugh that he would hunt the king of beasts naked with a jackknife. What does Tarzan add?", ["\"And a rifle\"", "\"And a piece of rope\"", "\"And a friend\""], 1, ["No.", "", "No."], { yes: "🔪 " + tzbQ("\"And a piece of rope,\" added Tarzan.") + " A lion roars far off. " + tzbQ("\"I am not hungry,\" said Tarzan simply.") }),
tzzId("wager", tzzSay("The wagerer", "The wagerer", "💶 Five thousand francs", ["\"Five thousand francs is a reason,\" said the other. \"I wager you that amount you cannot bring back a lion from the jungle under the conditions we have named--naked and armed only with a knife and a piece of rope.\"", "\"Make it ten thousand,\" said D'Arnot.", "\"Done,\" replied the other."], tzBk(25))),
tzzId("go", tzzGo(TZ_PT2(66, 4), "To the edge of the jungle with them: leave your clothes in the little storehouse", { r: 4 })),
tzzId("hunt", tzzRead("🌳 At last he was free", tzbQs("Tarzan had no sooner entered the jungle than he took to the trees, and it was with a feeling of exultant freedom that he swung once more through the forest branches.", "This was life! Ah, how he loved it! Civilization held nothing like this in its narrow and circumscribed sphere, hemmed in by restrictions and conventionalities. Even clothes were a hindrance and a nuisance.", "At last he was free. He had not realized what a prisoner he had been.") + tzSrc(tzBk(25)))),
tzzGo(TZ_PT2(112, 16), "Up the wind: the scent of Numa. Follow it to a little patch of moonlight", { r: 6 }),
tzzId("kill", tzzReadA("🪢 The quick noose", tzbQs("Then the quick noose settled and tightened about the tawny throat, and, as he had done it a hundred times in the past, Tarzan made fast the end to a strong branch and, while the beast fought and clawed for freedom, dropped to the ground behind him, and leaping upon the great back, plunged his long thin blade a dozen times into the fierce heart.") + tzSrc(tzBk(25)), "<p>The noose drops over the lion from the branch above, and Tarzan wins, as he has a hundred times before. Then, with his foot upon the great beast, he gives the victory cry of his tribe.</p>" + tzSrc(tzBk(25)))),
tzzPuzzle("🧭 The freedom of the jungle", "For a moment Tarzan thinks of circling back south to his own jungle and cabin, forever. What brings him back to D'Arnot?", ["The money", "The vision of a beautiful face, and the memory of warm lips crushed to his", "Fear of the lion"], 1, ["No.", "", "Never."], { yes: "🧭 " + tzbQ("For a moment Tarzan stood irresolute, swayed by conflicting emotions of loyalty to D'Arnot and a mighty lust for the freedom of his own jungle. At last the vision of a beautiful face, and the memory of warm lips crushed to his dissolved the fascinating picture he had been drawing of his old life.") }),
tzzGo(TZ_PT2(70, 4), "Carry the lion back, to where the armed men stand debating at the jungle's edge", { r: 5 }),
tzzRead("😂 A low laugh", tzbQs("As the party stood finally near the edge of the jungle, debating as to the best distribution of their forces, they were startled by a low laugh near them, and turning, beheld advancing toward them a giant figure bearing a dead lion upon its broad shoulders.", "Incidentally, he had won ten thousand francs, for D'Arnot insisted that he keep it all.") + tzSrc(tzBk(25))),
tzzId("morning", tzzRead("🪙 Without money one must die", tzbQs("It had become evident to Tarzan that without money one must die. D'Arnot had told him not to worry, since he had more than enough for both, but the ape-man was learning many things and one of them was that people looked down upon one who accepted money from another without giving something of equal value in exchange.") + tzSrc(tzBk(25)))),
tzzId("tub", tzzTravel("🚢 An ancient tub", "<p>" + tzbQ("Shortly after the episode of the lion hunt, D'Arnot succeeded in chartering an ancient tub for the coastwise trip to Tarzan's land-locked harbor.") + " " + tzbQ("It was a happy morning for them both when the little vessel weighed anchor and made for the open sea.") + "</p>" + tzSrc(tzBk(25)), TZ_CB(-12, 0), "Ashore at the cabin again", "▶ Sail south")),
tzzGo("amph", "In his jungle things again, with a spade, alone to the amphitheater of the apes", { r: 8 }),
tzzHold(tzA("amph", 3, 2), 6, "Dig by the drum, where the chest lies", { r: 3 }),
tzzFind("load", tzA("amph", 3.4, 2.4), "The great chest", "Lift it to your shoulder"),
tzzGo(TZ_CB(-12, 0), "Back to the beach with it, and aboard. At sunrise the little vessel works out through the harbour's mouth", { r: 6 }),
tzzId("paris", tzzRead("🗼 Paris, 1909", tzbQs("Three weeks later Tarzan and D'Arnot were passengers on board a French steamer bound for Lyons, and after a few days in that city D'Arnot took Tarzan to Paris.", "One of the first things which D'Arnot accomplished after their arrival was to arrange to visit a high official of the police department, an old friend; and to take Tarzan with him.") + "<p>(The Paris you can walk in SomnuMatrix is the Paris of 1841; this one is seventy years on, and is told here in the book's own pages.)</p>" + tzSrc(tzBk(25)))),
tzzPuzzle("👆 The lines never change", "Tarzan asks: surely the lines of the fingers change over the years? What does the police official answer?", ["They change every seven years", "The lines never change, from infancy to old age, except in size", "They fade"], 1, ["No.", "", "No."], { yes: "👆 " + tzbQ("\"The lines never change,\" replied the official. \"From infancy to senility the fingerprints of an individual change only in size, except as injuries alter the loops and whorls. But if imprints have been taken of the thumb and four fingers of both hands one must needs lose all entirely to escape identification.\"") }),
tzzRead("🖤 The little black book", tzbQs("D'Arnot drew a little black book from his pocket and commenced turning the pages.", "Presently D'Arnot stopped at a page on which were five tiny little smudges.", "Tarzan realized now what was the meaning of their visit to the police officer.", "The answer to his life's riddle lay in these tiny marks.") + tzSrc(tzBk(25))),
tzzRead("💀 Twenty years", tzbQs("\"You forget that for twenty years the dead body of the child who made those fingerprints lay in the cabin of his father, and that all my life I have seen it lying there,\" said Tarzan bitterly.", "\"You forget--Kala,\" said Tarzan.") + tzSrc(tzBk(25)), "▶ Go on"),
tzzPuzzle("⏳ Monsieur Desquerc", "What does the police official decide?", ["Tarzan is Lord Greystoke", "He will leave it to their expert, Monsieur Desquerc, and cable a report within two weeks", "The prints do not match"], 1, ["Not yet.", "", "He does not say so."], { yes: "⏳ " + tzbQ("\"I will promise that you can cable him a report within two weeks,\" replied the officer; \"but what it will be I dare not say. There are resemblances, yet--well, we had better leave it for Monsieur Desquerc to solve.\"") }),
tzzRead("🇺🇸 For America", tzbQs("\"I had hoped to know at once,\" said D'Arnot. \"Monsieur Tarzan sails for America tomorrow.\"") + tzSrc(tzBk(25)), "▶ Go on")
] });
var TZ_WF = function (dx, dz) { return function () { return { sc: "wisconsin", x: TZW_WI.house[0] + (dx || 0), z: TZW_WI.house[1] + (dz || 0) }; }; };
var TZ_INN = function (dx, dz) { return function () { return { sc: "wisconsin", x: TZW_WI.station[0] + 18 + (dx || 0), z: TZW_WI.station[1] + 32 - 8 + (dz || 0) }; }; };
tzbCh({ t: "The Giant Again", txt: 26, start: { sc: "wisconsin", x: -296, z: -226, ry: Math.PI / 2 }, jump: 1, tune: "study", keep: ["birch", "A curl of white birch bark from the Wisconsin woods", "🌲"],
state: { car2: tzOn(null, "drive"), fire: tzOn("fire", "drive"), burnt: tzOn("drive", null), car: tzOn("car", "drive"), hamlet: tzOn("drive", null), env: tzOn("fire", "drive", "dusk") },
words: "A taxicab draws up before an old-fashioned house on the outskirts of Baltimore. Then a train, north, to a little farm in the Wisconsin woods.",
intro: "The railway station at Birch Lake",
cast: [
tzc("jane", tzA("wistation", 3, 4), { key: "j", ry: -Math.PI / 2, until: "farm" }),
tzc("porter", tzA("wistation", 5, 2), { key: "p", ry: -Math.PI / 2, until: "farm" }),
tzc("esmeralda", tzA("wistation", 4, 6), { key: "e", ry: -Math.PI / 2, until: "farm" }),
tzc("cecil", tzA("wistation", 8, 3), { key: "c", ry: Math.PI / 2, until: "farm" }),
tzc("philander", tzA("wistation", 8, 5), { key: "ph", ry: Math.PI / 2, until: "farm" }),
tzc("jane", tzR("parlour", -1.4, -0.8), { key: "j2", ry: Math.PI / 2, from: "farm", until: "walk" }),
tzc("cecil", tzR("parlour", 1.4, -0.6), { key: "c2", ry: -Math.PI / 2, from: "farm", until: "car" }),
tzc("porter", tzR("parlour", 2.6, 1.4), { key: "p2", ry: -Math.PI / 2, from: "farm", until: "car" }),
tzc("philander", tzR("parlour", 1.8, 1.8), { key: "ph2", ry: Math.PI, from: "farm", until: "car" }),
tzc("esmeralda", tzR("kitchen", 0.6, 1.6), { key: "e2", ry: Math.PI, from: "farm", until: "car" }),
tzc("canler", TZ_WF(-10, -12), { key: "ca", ry: Math.PI * 0.8, from: "canler", until: "morning" }),
tzc("tarzand", TZ_WF(-1, 10), { key: "g", name: "A black-haired giant", ry: Math.PI, greet: "Where is Miss Porter?", from: "car", until: "south" }),
tzc("cecil", TZ_WF(4, 11), { key: "c3", ry: Math.PI * 0.9, from: "car", until: "drive" }),
tzc("porter", TZ_WF(8, -12), { key: "p3", ry: 0.6, from: "car", until: "drive" }),
tzc("philander", TZ_WF(10, -10), { key: "ph3", ry: 0.6, from: "car", until: "drive" }),
tzc("esmeralda", TZ_WF(6, 12), { key: "e3", ry: Math.PI, from: "car", until: "drive" }),
tzc("jane", tzA("wisouth", -6, 40), { key: "j3", ry: Math.PI, from: "walk", until: "found" }),
tzc("jane", TZ_WF(-12, 32), { key: "j4", ry: Math.PI, from: "found", until: "drive" }),
tzc("tarzand", TZ_WF(-10, 33), { key: "t", ry: Math.PI, from: "found", until: "drive" }),
tzc("jane", tzA("wiinn", -1, -3), { key: "j5", ry: 0, from: "drive" }),
tzc("tarzand", tzA("wiinn", 1, -3), { key: "t2", ry: 0, from: "drive" }),
tzc("cecil", tzA("wiinn", -3, -1), { key: "c4", ry: 0.4, from: "drive" }),
tzc("porter", tzA("wiinn", 3, -1), { key: "p4", ry: -0.4, from: "drive" })
],
steps: [
{ k: "read" },
tzzRead("🚕 The outskirts of Baltimore", tzbQs("A taxicab drew up before an oldfashioned residence upon the outskirts of Baltimore.", "A man of about forty, well built and with strong, regular features, stepped out, and paying the chauffeur dismissed him.", "A moment later the passenger was entering the library of the old home.", "\"Ah, Mr. Canler!\" exclaimed an old man, rising to greet him.", "\"Professor,\" continued Robert Canler, with great deliberation, as though carefully weighing his words, \"I have come this evening to speak with you about Jane.", "Professor Archimedes Q. Porter fidgeted in his armchair. The subject always made him uncomfortable. He could not understand why. Canler was a splendid match.", "\"But Jane,\" continued Canler, \"I cannot understand her. She puts me off first on one ground and then another. I have always the feeling that she breathes a sigh of relief every time I bid her good-by.\"", "\"Tut, tut,\" said Professor Porter. \"Tut, tut, Mr. Canler. Jane is a most obedient daughter. She will do precisely as I tell her.\"") + tzSrc(tzBk(26)), "▶ Turn the page"),
tzzRead("📚 Unless--what?", tzbQs("\"There is young Clayton, you know,\" suggested Canler. \"He has been hanging about for months. I don't know that Jane cares for him; but beside his title they say he has inherited a very considerable estate from his father, and it might not be strange,--if he finally won her, unless--\" and Canler paused.", "\"Unless, you see fit to request that Jane and I be married at once,\" said Canler, slowly and distinctly.", "\"I have already suggested to Jane that it would be desirable,\" said Professor Porter sadly, \"for we can no longer afford to keep up this house, and live as her associations demand.\"", "\"She said she was not ready to marry anyone yet,\" replied Professor Porter, \"and that we could go and live upon the farm in northern Wisconsin which her mother left her.") + tzSrc(tzBk(26)), "▶ Turn the page"),
tzzPuzzle("🏚️ The farm", "Where does Jane mean to take her father, rather than marry at once?", ["To England, with Mr. Clayton", "To the farm in northern Wisconsin which her mother left her", "Back to Africa, for the treasure"], 1, ["No.", "", "There is no treasure now."], { yes: "🏚️ " + tzbQ("\"It is a little more than self-supporting. The tenants have always made a living from it, and been able to send Jane a trifle beside, each year. She is planning on our going up there the first of the week. Philander and Mr. Clayton have already gone to get things in readiness for us.\"") }),
tzzRead("🕯️ Alone with Canler", tzbQs("\"See here, Jane,\" he said bluntly. \"How long is this thing going on like this? You haven't refused to marry me, but you haven't promised either. I want to get the license tomorrow, so that we can be married quietly before you leave for Wisconsin. I don't care for any fuss or feathers, and I'm sure you don't either.\"", "The girl turned cold, but she held her head bravely.", "\"Your father wishes it, you know,\" added Canler.", "\"Yes, I know.\"", "She spoke scarcely above a whisper.") + tzSrc(tzBk(26)), "▶ Go on"),
tzzRead("💵 Buying me", tzbQs("\"Do you realize that you are buying me, Mr. Canler?\" she said finally, and in a cold, level voice. \"Buying me for a few paltry dollars? Of course you do, Robert Canler, and the hope of just such a contingency was in your mind when you loaned papa the money for that hair-brained escapade, which but for a most mysterious circumstance would have been surprisingly successful.", "\"You knew that without security you had a greater hold on the honor of the Porters than with it. You knew the one best way to force me to marry you, without seeming to force me.", "\"You have never mentioned the loan. In any other man I should have thought that the prompting of a magnanimous and noble character. But you are deep, Mr. Robert Canler. I know you better than you think I know you.", "\"I shall certainly marry you if there is no other way, but let us understand each other once and for all.\"") + tzSrc(tzBk(26)), "▶ Go on"),
tzzPuzzle("🪙 Without security", "Why, says Jane, did Canler lend her father the money for the treasure hunt without any security?", ["Because he is generous", "Because without security he had a greater hold on the honour of the Porters, and the one best way to make her marry him", "Because he believed in the treasure"], 1, ["She thought so once, of any other man.", "", "He never did."], { yes: "🪙 " + tzbQ("\"You surprise me, Jane. I thought you had more self-control--more pride. Of course you are right. I am buying you, and I knew that you knew it, but I thought you would prefer to pretend that it was otherwise. I should have thought your self respect and your Porter pride would have shrunk from admitting, even to yourself, that you were a bought woman. But have it your own way, dear girl,\" he added lightly. \"I am going to have you, and that is all that interests me.\"") + " " + tzbQ("Without a word the girl turned and left the room.") }),
tzzRead("🚂 North", tzbQs("Jane was not married before she left with her father and Esmeralda for her little Wisconsin farm, and as she coldly bid Robert Canler goodby as her train pulled out, he called to her that he would join them in a week or two.", "At their destination they were met by Clayton and Mr. Philander in a huge touring car belonging to the former, and quickly whirled away through the dense northern woods toward the little farm which the girl had not visited before since childhood.") + tzSrc(tzBk(26)), "▶ Go on"),
tzzGo(tzA("wistation", 6, 3), "Off the train: Clayton and Mr. Philander are waiting at the end of the platform", { r: 4 }),
tzzTalk("William Cecil Clayton", "Clayton, at the station", ["🚗 The touring car", "<p>Clayton has come to meet the train in a huge touring car of his own, with Mr. Philander beside him, fussing over the luggage. The woods stand close about the little depot: pine, white birch, maples turning red.</p>" + tzSrc(tzBk(26)), "▶ Go on"]),
tzzId("farm", tzzTravel("🚗 Whirled away", "<p>The huge touring car, the road through the dense northern woods, pine and birch and the maples turning, and the little farm the girl has not seen since childhood.</p>" + tzSrc(tzBk(26)), tzA("wiroad"), "The road through the woods to the farm", "▶ Into the car")),
tzzGo("wifarm", "On along the road, to the farm on its little rise", { r: 8 }),
tzzRead("🏡 A complete transformation", tzbQs("The farmhouse, which stood on a little elevation some hundred yards from the tenant house, had undergone a complete transformation during the three weeks that Clayton and Mr. Philander had been there.", "The former had imported a small army of carpenters and plasterers, plumbers and painters from a distant city, and what had been but a dilapidated shell when they reached it was now a cosy little two-story house filled with every modern convenience procurable in so short a time.") + tzSrc(tzBk(26)), "▶ Go on"),
tzzGo(tzR("parlour", 0, 0.6), "In at the front door, to the parlour", { r: 2.5 }),
tzzSay("Jane Porter", "Jane", "🔨 What have you done?", ["\"Why, Mr. Clayton, what have you done?\" cried Jane Porter, her heart sinking within her as she realized the probable size of the expenditure that had been made.", "\"But you know that we can't repay you,\" cried the girl. \"Why do you want to put me under such terrible obligations?\""], tzBk(26)),
tzzSay("William Cecil Clayton", "Clayton", "🤫 S-sh", ["\"S-sh,\" cautioned Clayton. \"Don't let your father guess. If you don't tell him he will never notice, and I simply couldn't think of him living in the terrible squalor and sordidness which Mr. Philander and I found. It was so little when I would like to do so much, Jane. For his sake, please, never mention it.\"", "\"Don't, Jane,\" said Clayton sadly. \"If it had been just you, believe me, I wouldn't have done it, for I knew from the start that it would only hurt me in your eyes, but I couldn't think of that dear old man living in the hole we found here. Won't you please believe that I did it just for him and give me that little crumb of pleasure at least?\""], tzBk(26)),
tzzSay("Jane Porter", "Jane", "💔 Because I love another", ["\"I do believe you, Mr. Clayton,\" said the girl, \"because I know you are big enough and generous enough to have done it just for him--and, oh Cecil, I wish I might repay you as you deserve--as you would wish.\"", "\"Why can't you, Jane?\"", "\"Because I love another.\""], tzBk(26)),
tzzPuzzle("💔 Another", "\"Canler?\" Clayton asks. What does Jane say?", ["\"Yes\"", "\"No\"; she does not love him, but she will marry him because of the money", "She will not answer"], 1, ["She does not love him.", "", "She answers."], { yes: "💔 " + tzbQ("\"I do not love him,\" she said, almost proudly.") + " " + tzbQ("\"Is it because of the money, Jane?\"") + " " + tzbQ("She nodded.") }),
tzzSay("Jane Porter", "Jane", "🤝 With my respect", ["\"I do not love you, Cecil,\" she said, \"but I respect you. If I must disgrace myself by such a bargain with any man, I prefer that it be one I already despise. I should loathe the man to whom I sold myself without love, whomsoever he might be. You will be happier,\" she concluded, \"alone--with my respect and friendship, than with me and my contempt.\""], tzBk(26)),
tzzId("canler", tzzRead("🚘 A purring six cylinder", tzbQs("He did not press the matter further, but if ever a man had murder in his heart it was William Cecil Clayton, Lord Greystoke, when, a week later, Robert Canler drew up before the farmhouse in his purring six cylinder.", "A week passed; a tense, uneventful, but uncomfortable week for all the inmates of the little Wisconsin farmhouse.", "Canler was insistent that Jane marry him at once.", "At length she gave in from sheer loathing of the continued and hateful importuning.", "It was agreed that on the morrow Canler was to drive to town and bring back the license and a minister.") + tzSrc(tzBk(26)), "▶ Go on")),
tzzGo(TZ_WF(-8, -10), "Out into the yard, where Canler stands by his motor", { r: 4 }),
tzzPuzzle("⏳ The morrow", "Clayton wanted to leave as soon as the plan was announced. Why does he stay?", ["He has nowhere to go", "The girl's tired, hopeless look kept him: he could not desert her", "He means to fight Canler"], 1, ["He has an estate in England.", "", "Not yet."], { yes: "⏳ " + tzbQ("Something might happen yet, he tried to console himself by thinking. And in his heart, he knew that it would require but a tiny spark to turn his hatred for Canler into the blood lust of the killer.") }),
tzzId("morning", tzzGo("wiporch", "Early the next morning Canler sets out for town. Stand on the porch and look east", { r: 3 })),
tzzRead("🌫️ Smoke in the east", tzbQs("In the east smoke could be seen lying low over the forest, for a fire had been raging for a week not far from them, but the wind still lay in the west and no danger threatened them.", "About noon Jane started off for a walk. She would not let Clayton accompany her. She wanted to be alone, she said, and he respected her wishes.") + tzSrc(tzBk(26)), "▶ Go on"),
tzzId("walk", tzzGo(tzR("parlour", 0, 0.6), "Back inside: the professor and Mr. Philander deep in a weighty problem, Clayton on the couch", { r: 2.5 })),
tzzHold(tzR("parlour", 0.4, 0.2), 8, "Wait in the quiet house. Clayton, heavy-eyed after a sleepless night, drops into a fitful slumber", { r: 2.5 }),
tzzId("fire", tzzRead("🔥 The fiery demon", tzbQs("To the east the black smoke clouds rose higher into the heavens, suddenly they eddied, and then commenced to drift rapidly toward the west.", "On and on they came. The inmates of the tenant house were gone, for it was market day, and none was there to see the rapid approach of the fiery demon.", "Soon the flames had spanned the road to the south and cut off Canler's return. A little fluctuation of the wind now carried the path of the forest fire to the north, then blew back and the flames nearly stood still as though held in leash by some master hand.") + tzSrc(tzBk(26)), "▶ Go on", { tune: "fire" })),
tzzGo("wiporch", "Out onto the porch: the sky to the south is black and orange", { r: 3 }),
tzzId("car", tzzRead("🚘 A great black car", tzbQs("Suddenly, out of the northeast, a great black car came careening down the road.", "With a jolt it stopped before the cottage, and a black-haired giant leaped out to run up onto the porch. Without a pause he rushed into the house. On the couch lay Clayton. The man started in surprise, but with a bound was at the side of the sleeping man.", "Shaking him roughly by the shoulder, he cried:") + tzSrc(tzBk(26)), "▶ Go on")),
tzzSay("A black-haired giant", "The stranger", "🔥 Are you all mad here?", ["\"My God, Clayton, are you all mad here? Don't you know you are nearly surrounded by fire? Where is Miss Porter?\""], tzBk(26)),
tzzSay("William Cecil Clayton", "Clayton", "🗣️ Jane! Jane!", ["\"Scott!\" he cried, and then, dashing back into the house, \"Jane! Jane! where are you?\"", "\"Where is Miss Jane?\" cried Clayton, seizing Esmeralda by the shoulders and shaking her roughly."], tzBk(26)),
tzzPuzzle("🧭 Which way?", "Esmeralda, frightened, says Miss Jane went out for a walk. Which way does she point?", ["North, by the road to the station", "Down that road: toward the south, where a mighty wall of roaring flames shuts out the view", "East, toward the smoke"], 1, ["The north road is still clear.", "", "No."], { yes: "🧭 " + tzbQ("\"Down that road,\" cried the frightened woman, pointing toward the south where a mighty wall of roaring flames shut out the view.") }),
tzzSay("A black-haired giant", "The stranger", "🚗 Leave my car here", ["\"Put these people in the other car,\" shouted the stranger to Clayton. \"I saw one as I drove up--and get them out of here by the north road.", "\"Leave my car here. If I find Miss Porter we shall need it. If I don't, no one will need it. Do as I say,\" as Clayton hesitated, and then they saw the lithe figure bound away cross the clearing toward the northwest where the forest still stood, untouched by flame."], tzBk(26)),
tzzSay("Professor Archimedes Q. Porter", "The professor", "❓ Who was that?", ["\"Who was that?\" asked Professor Porter.", "\"Tut, tut!\" cried Professor Porter. \"Most remarkable! Who could it have been, and why do I feel that Jane is safe, now that he has set out in search of her?\""], tzBk(26)),
tzzSay("Mr. Samuel T. Philander", "Mr. Philander", "🤔 Startlingly familiar", ["\"There was something most startlingly familiar about him,\" exclaimed Mr. Philander, \"And yet, bless me, I know I never saw him before.\""], tzBk(26)),
tzzRead("🔥 Cut off", tzbQs("When Jane turned to retrace her steps homeward, she was alarmed to note how near the smoke of the forest fire seemed, and as she hastened onward her alarm became almost a panic when she perceived that the rushing flames were rapidly forcing their way between herself and the cottage.", "At length she was compelled to turn into the dense thicket and attempt to force her way to the west in an effort to circle around the flames and reach the house.", "The twenty minutes that it took her to regain the road was all that had been needed to cut off her retreat as effectually as her advance had been cut off before.", "A short run down the road brought her to a horrified stand, for there before her was another wall of flame. An arm of the main conflagration had shot out a half mile south of its parent to embrace this tiny strip of road in its implacable clutches.") + tzSrc(tzBk(26)), "▶ Go on"),
tzzId("south", tzzGo("wisouth", "After the giant: down the south road, into the smoke, between the walls of flame", { r: 8, tune: "chase" })),
tzzGo(tzA("wisouth", -6, 34), "On, through the burning wood, to the strip of road where she kneels", { r: 6 }),
tzzRead("🙏 In the dust of the roadway", tzbQs("Calmly the girl kneeled down in the dust of the roadway and prayed for strength to meet her fate bravely, and for the delivery of her father and her friends from death.", "Suddenly she heard her name being called aloud through the forest:", "\"Jane! Jane Porter!\" It rang strong and clear, but in a strange voice.", "\"Here!\" she called in reply. \"Here! In the roadway!\"", "Then through the branches of the trees she saw a figure swinging with the speed of a squirrel.") + tzSrc(tzBk(26)), "▶ Go on"),
tzzHold(tzA("wisouth", -6, 40), 5, "Reach her through the smoke: a great arm about her, and up into the trees", { r: 3 }),
tzzId("found", tzzRead("🌳 From tree to tree", tzbQs("A veering of the wind blew a cloud of smoke about them and she could no longer see the man who was speeding toward her, but suddenly she felt a great arm about her. Then she was lifted up, and she felt the rushing of the wind and the occasional brush of a branch as she was borne along.", "She opened her eyes.", "Far below her lay the undergrowth and the hard earth.", "About her was the waving foliage of the forest.", "From tree to tree swung the giant figure which bore her, and it seemed to Jane that she was living over in a dream the experience that had been hers in that far African jungle.", "She stole a sudden glance at the face close to hers, and then she gave a little frightened gasp. It was he!") + tzSrc(tzBk(26)), "▶ Go on", { tune: "love" })),
tzzGo(TZ_WF(-11, 30), "Beyond the fire now, and back to the clearing: walk with them toward the cottage", { r: 5 }),
tzzSay("Jane Porter", "Jane", "🌲 My forest man", ["\"My forest man!\" she murmured. \"No, I must be delirious!\"", "\"I did not run away,\" she whispered. \"I would only consent to leave when they had waited a week for you to return.\""], tzBk(26)),
tzzSay("Tarzan of the Apes", "The giant", "🦍 Your man, Jane Porter", ["\"Yes, your man, Jane Porter. Your savage, primeval man come out of the jungle to claim his mate--the woman who ran away from him,\" he added almost fiercely.", "\"I was nursing D'Arnot. He was badly wounded.\""], tzBk(26)),
tzzPuzzle("✉️ Whose note?", "Jane learns his name: Tarzan of the Apes. Why did she never think the note she answered was his?", ["It was in French", "Tarzan of the Apes had written in English, and the man in the jungle could not understand a word of any language", "It was not signed"], 1, ["D'Arnot taught him French later.", "", "It was signed."], { yes: "✉️ " + tzbQ("\"It is a long story, but it was I who wrote what I could not speak--and now D'Arnot has made matters worse by teaching me to speak French instead of English.") }),
tzzId("drive", tzzTravel("🚗 A reckless pace", "<p>" + tzbQ("\"Come,\" he added, \"jump into my car, we must overtake your father, they are only a little way ahead.\"") + "</p><p>" + tzbQ("\"Then when you said in your note to Tarzan of the Apes that you loved another--you might have meant me?\"") + " " + tzbQ("\"I might have,\" she answered, simply.") + "</p><p>" + tzbQ("\"But in Baltimore--Oh, how I have searched for you--they told me you would possibly be married by now. That a man named Canler had come up here to wed you. Is that true?\"") + "</p><p>" + tzbQ("\"I am promised to another. I cannot answer you, Tarzan of the Apes,\" she cried.") + " " + tzbQ("\"You have answered. Now, tell me why you would marry one you do not love.\"") + " " + tzbQ("\"My father owes him money.\"") + "</p><p>" + tzbQ("He was silent for a moment. The car was plunging along the uneven road at a reckless pace, for the fire showed threateningly at their right, and another change of the wind might sweep it on with raging fury across this one avenue of escape.") + "</p>" + tzSrc(tzBk(26)), tzA("wiinn"), "The little hamlet: the hotel, and Clayton's car before it", "▶ Drive", { tune: "chase" })),
tzzPuzzle("🦍 Terkoz did", "\"He would scarcely accede to the demand of a stranger,\" says Jane. \"Terkoz did,\" says Tarzan, grimly. What does he mean?", ["A friend of his in Baltimore", "The great anthropoid he killed in her defence", "A lion"], 1, ["No.", "", "No: an ape."], { yes: "🦍 " + tzbQ("Jane shuddered and looked fearfully up at the giant figure beside her, for she knew that he meant the great anthropoid he had killed in her defense.") + " " + tzbQ("\"This is not the African jungle,\" she said. \"You are no longer a savage beast. You are a gentleman, and gentlemen do not kill in cold blood.\"") + " " + tzbQ("\"I am still a wild beast at heart,\" he said, in a low voice, as though to himself.") }),
tzzRead("💭 If you were free", tzbQs("\"Jane,\" said the man, at length, \"if you were free, would you marry me?\"", "She did not reply at once, but he waited patiently.", "Could he ever rise to her social sphere? Could she bear to think of sinking to his? Would either be happy in such a horrible misalliance?", "\"I do not know what answer to make,\" said Jane sadly. \"I do not know my own mind.\"", "\"Do not ask me. You will be happier without me. You were never meant for the formal restrictions and conventionalities of society--civilization would become irksome to you, and in a little while you would long for the freedom of your old life--a life to which I am as totally unfitted as you to mine.\"", "\"I think I understand you,\" he replied quietly. \"I shall not urge you, for I would rather see you happy than to be happy myself. I see now that you could not be happy with--an ape.\"") + tzSrc(tzBk(26)), "▶ Go on"),
tzzRead("🏘️ A little hamlet", tzbQs("There was just the faintest tinge of bitterness in his voice.", "\"Don't,\" she remonstrated. \"Don't say that. You do not understand.\"", "But before she could go on a sudden turn in the road brought them into the midst of a little hamlet.", "Before them stood Clayton's car surrounded by the party he had brought from the cottage.") + tzSrc(tzBk(26)), "▶ The end of the chapter")
] });
tzbCh({ t: "Conclusion", txt: 27, start: { sc: "wisconsin", x: -282, z: -219, ry: Math.PI }, jump: 1, tune: "study", keep: ["cable", "D'Arnot's cablegram from Paris", "📨"],
state: { burnt: true, hamlet: true, canlerCar: tzOn("canler", "evening"), env: tzOn("evening", null, "dusk") },
words: "At the sight of Jane, cries of relief and delight break from every lip. For a moment no one notices the man sitting silently in his seat.",
intro: "The little hamlet: the hotel, and the motor cars before it",
cast: [
tzc("jane", TZ_INN(-1, -2), { key: "j", ry: 0, until: "inside" }),
tzc("tarzand", TZ_INN(1.4, -2), { key: "t", ry: Math.PI / 2, until: "inside" }),
tzc("cecil", TZ_INN(2.8, -1.4), { key: "c", ry: -Math.PI / 2, until: "inside" }),
tzc("porter", TZ_INN(-2.4, -1.4), { key: "p", ry: Math.PI / 2, until: "inside" }),
tzc("philander", TZ_INN(-3.4, -2.6), { key: "ph", ry: Math.PI / 2, until: "inside" }),
tzc("esmeralda", TZ_INN(-0.8, -4), { key: "e", ry: 0, until: "inside" }),
tzc("jane", tzR("inn", -1.2, 1.4), { key: "j2", ry: Math.PI, from: "inside", until: "alone" }),
tzc("tarzand", tzR("inn", 2.6, -1.6), { key: "t2", ry: -Math.PI / 2, from: "inside", until: "cars" }),
tzc("cecil", tzR("inn", 1.2, 1.4), { key: "c2", ry: Math.PI, from: "inside", until: "cars" }),
tzc("porter", tzR("inn", -2.6, -1.6), { key: "p2", ry: Math.PI / 2, from: "inside", until: "cars" }),
tzc("philander", tzR("inn", -3.2, 0.6), { key: "ph2", ry: Math.PI / 2, from: "inside", until: "cars" }),
tzc("esmeralda", tzR("inn", 0, -2.3), { key: "e2", ry: 0, from: "inside", until: "cars" }),
tzc("canler", tzR("inn", 0.6, 2.2), { key: "ca", ry: Math.PI, from: "canler", until: "gone" }),
tzc("villager", tzR("inn", -0.6, 2.4), { key: "to", dress: "clergy", sex: "m", hair: 0x9A9A9A, name: "The Reverend Mr. Tousley", persona: "constantine", greet: "Delighted, delighted. A wedding is always a happy occasion.", ry: Math.PI, from: "canler", until: "gone" }),
tzc("jane", TZ_INN(0, 1.2), { key: "j3", ry: Math.PI, from: "alone", until: "cars" }),
tzc("philander", tzA("wiinn", 2, -2), { key: "ph3", ry: 0, from: "cars", until: "evening" }),
tzc("tarzand", tzA("wiinn", 4, -2), { key: "t3", ry: 0, from: "cars", until: "evening" }),
tzc("jane", tzR("depot", -1.6, -1.6), { key: "j4", ry: 0, from: "evening" }),
tzc("tarzand", tzR("depot", -0.4, -1.2), { key: "t4", ry: -0.6, from: "evening" }),
tzc("porter", tzR("depot", 1.8, -2.0), { key: "p4", ry: 0, from: "room" }),
tzc("philander", tzR("depot", 2.6, -2.0), { key: "ph4", ry: 0, from: "room" }),
tzc("esmeralda", tzR("depot", 1.0, -2.0), { key: "e4", ry: 0, from: "room" }),
tzc("villager", tzR("depot", 2.4, 0.8), { key: "sa", dress: "tzfarm", sex: "m", hair: 0x5A4A3A, beard: "mustache", name: "The station agent, with an envelope", persona: "farm", greet: "Is there a gentleman by the name of Tarzan in the party?", ry: Math.PI, from: "cable" }),
tzc("cecil", tzR("depot", 3.2, 1.6), { key: "c4", ry: -2.4, from: "clay" })
],
steps: [
{ k: "read" },
tzzRead("🚗 Cries of relief", tzbQs("At the sight of Jane, cries of relief and delight broke from every lip, and as Tarzan's car stopped beside the other, Professor Porter caught his daughter in his arms.", "For a moment no one noticed Tarzan, sitting silently in his seat.", "Clayton was the first to remember, and, turning, held out his hand.") + tzSrc(tzBk(27)), "▶ Go on"),
tzzSay("William Cecil Clayton", "Clayton", "🤝 How can we ever thank you?", ["\"How can we ever thank you?\" he exclaimed. \"You have saved us all. You called me by name at the cottage, but I do not seem to recall yours, though there is something very familiar about you. It is as though I had known you well under very different conditions a long time ago.\""], tzBk(27)),
tzzSay("Tarzan of the Apes", "Tarzan, in French", "🇫🇷 Monsieur Clayton", ["\"You are quite right, Monsieur Clayton,\" he said, in French. \"You will pardon me if I do not speak to you in English. I am just learning it, and while I understand it fairly well I speak it very poorly.\""], tzBk(27)),
tzzPuzzle("❓ But who are you?", "Clayton insists, in French this time himself: but who are you? What is the answer?", ["\"Monsieur D'Arnot\"", "\"Tarzan of the Apes\"", "\"Lord Greystoke\""], 1, ["No.", "", "Not yet."], { yes: "❓ " + tzbQ("\"Tarzan of the Apes.\"") + " " + tzbQ("Clayton started back in surprise.") + " " + tzbQ("\"By Jove!\" he exclaimed. \"It is true.\"") }),
tzzRead("🦍 So far from his savage home", tzbQs("And Professor Porter and Mr. Philander pressed forward to add their thanks to Clayton's, and to voice their surprise and pleasure at seeing their jungle friend so far from his savage home.", "The party now entered the modest little hostelry, where Clayton soon made arrangements for their entertainment.") + tzSrc(tzBk(27)), "▶ Go on"),
tzzId("inside", tzzGo(tzR("inn", 0, 0.4), "In at the door of the little hotel, to its stuffy parlour", { r: 2.5 })),
tzzRead("🪟 The chugging of a motor", tzbQs("They were sitting in the little, stuffy parlor when the distant chugging of an approaching automobile caught their attention.", "Mr. Philander, who was sitting near the window, looked out as the car drew in sight, finally stopping beside the other automobiles.") + tzSrc(tzBk(27)), "▶ Go on"),
tzzSay("Mr. Samuel T. Philander", "Mr. Philander, at the window", "😬 Bless me!", ["\"Bless me!\" said Mr. Philander, a shade of annoyance in his tone. \"It is Mr. Canler. I had hoped, er--I had thought or--er--how very happy we should be that he was not caught in the fire,\" he ended lamely."], tzBk(27)),
tzzSay("Professor Archimedes Q. Porter", "The professor", "🔢 Count ten", ["\"Tut, tut! Mr. Philander,\" said Professor Porter. \"Tut, tut! I have often admonished my pupils to count ten before speaking. Were I you, Mr. Philander, I should count at least a thousand, and then maintain a discreet silence.\""], tzBk(27)),
tzzId("canler", tzzRead("🚪 Robert Canler burst into the room", tzbQs("\"Bless me, yes!\" acquiesced Mr. Philander. \"But who is the clerical appearing gentleman with him?\"", "Jane blanched.", "Clayton moved uneasily in his chair.", "Professor Porter removed his spectacles nervously, and breathed upon them, but replaced them on his nose without wiping.", "Only Tarzan did not comprehend.", "Presently Robert Canler burst into the room.") + tzSrc(tzBk(27)), "▶ Go on", { tune: "dread" })),
tzzSay("Robert Canler", "Canler", "🔥 Thank God!", ["\"Thank God!\" he cried. \"I feared the worst, until I saw your car, Clayton. I was cut off on the south road and had to go away back to town, and then strike east to this road. I thought we'd never reach the cottage.\""], tzBk(27)),
tzzRead("🐆 As Sabor eyes her prey", tzbQs("No one seemed to enthuse much. Tarzan eyed Robert Canler as Sabor eyes her prey.", "Jane glanced at him and coughed nervously.", "\"Mr. Canler,\" she said, \"this is Monsieur Tarzan, an old friend.\"", "Canler turned and extended his hand. Tarzan rose and bowed as only D'Arnot could have taught a gentleman to do it, but he did not seem to see Canler's hand.", "Nor did Canler appear to notice the oversight.", "\"This is the Reverend Mr. Tousley, Jane,\" said Canler, turning to the clerical party behind him. \"Mr. Tousley, Miss Porter.\"", "Mr. Tousley bowed and beamed.") + tzSrc(tzBk(27)), "▶ Go on"),
tzzSay("Robert Canler", "Canler", "📜 The ceremony at once", ["\"We can have the ceremony at once, Jane,\" said Canler. \"Then you and I can catch the midnight train in town.\""], tzBk(27)),
tzzPuzzle("👁️ Half-closed eyes", "Tarzan understands the plan instantly. What does he do?", ["He leaves the room", "He glances out of half-closed eyes at Jane, but he does not move", "He laughs"], 1, ["No.", "", "No."], { yes: "👁️ " + tzbQ("Tarzan understood the plan instantly. He glanced out of half-closed eyes at Jane, but he did not move.") + " " + tzbQ("The girl hesitated. The room was tense with the silence of taut nerves.") }),
tzzSay("Jane Porter", "Jane", "😞 All unstrung", ["\"Can't we wait a few days?\" she asked. \"I am all unstrung. I have been through so much today.\""], tzBk(27)),
tzzSay("Robert Canler", "Canler, roughly", "😠 Played with no longer", ["\"We have waited as long as I intend to wait,\" he said roughly. \"You have promised to marry me. I shall be played with no longer. I have the license and here is the preacher. Come Mr. Tousley; come Jane. There are plenty of witnesses--more than enough,\" he added with a disagreeable inflection; and taking Jane Porter by the arm, he started to lead her toward the waiting minister."], tzBk(27)),
tzzReadA("✊ A grip of steel", tzbQs("But scarcely had he taken a single step ere a heavy hand closed upon his arm with a grip of steel.", "Another hand shot to his throat and in a moment he was being shaken high above the floor, as a cat might shake a mouse.", "Jane turned in horrified surprise toward Tarzan.", "And, as she looked into his face, she saw the crimson band upon his forehead that she had seen that other day in far distant Africa, when Tarzan of the Apes had closed in mortal combat with the great anthropoid--Terkoz.", "She knew that murder lay in that savage heart, and with a little cry of horror she sprang forward to plead with the ape-man. But her fears were more for Tarzan than for Canler. She realized the stern retribution which justice metes to the murderer.", "Before she could reach them, however, Clayton had jumped to Tarzan's side and attempted to drag Canler from his grasp.", "With a single sweep of one mighty arm the Englishman was hurled across the room, and then Jane laid a firm white hand upon Tarzan's wrist, and looked up into his eyes.") + tzSrc(tzBk(27)), "<p>A heavy hand closes on Canler's arm, and Tarzan lifts him clean off the floor. Jane sees the crimson band upon his forehead, the one she saw in Africa the day he fought Terkoz, and she is afraid: not for Canler, but for Tarzan. Clayton tries to pull them apart and is swept aside. Then Jane lays her hand upon Tarzan's wrist, and looks up into his eyes.</p>" + tzSrc(tzBk(27)), "▶ Go on", { tune: "danger" }),
tzzSay("Jane Porter", "Jane", "🤍 For my sake", ["\"For my sake,\" she said.", "\"I do not wish him to die at your hands, my friend,\" she replied. \"I do not wish you to become a murderer.\""], tzBk(27)),
tzzSay("Tarzan of the Apes", "Tarzan", "⚖️ The price of your life", ["\"Do you wish this to live?\" he asked in surprise.", "\"Do you release her from her promise?\" he asked. \"It is the price of your life.\"", "\"Will you go away and never molest her further?\""], tzBk(27)),
tzzPuzzle("🚪 Canler nods", "What is the price of Canler's life?", ["Ten thousand dollars", "That he release Jane from her promise, and go away and never molest her further", "That he apologise to Clayton"], 1, ["No.", "", "No."], { yes: "🚪 " + tzbQ("Tarzan released him, and Canler staggered toward the door. In another moment he was gone, and the terror-stricken preacher with him.") }),
tzzId("gone", tzzSay("Tarzan of the Apes", "Tarzan", "🗨️ A moment, alone", ["\"May I speak with you for a moment, alone,\" he asked."], tzBk(27))),
tzzId("alone", tzzSay("Professor Archimedes Q. Porter", "The professor, stricken", "✋ Wait", ["\"Wait,\" cried Professor Porter, as Tarzan was about to follow.", "\"Before we go further, sir, I should like an explanation of the events which have just transpired. By what right, sir, did you interfere between my daughter and Mr. Canler? I had promised him her hand, sir, and regardless of our personal likes or dislikes, sir, that promise must be kept.\""], tzBk(27))),
tzzSay("Tarzan of the Apes", "Tarzan", "💔 That is enough for me to know", ["\"I interfered, Professor Porter,\" replied Tarzan, \"because your daughter does not love Mr. Canler--she does not wish to marry him. That is enough for me to know.\"", "\"He most certainly will,\" said Tarzan, emphatically.", "\"And further,\" added Tarzan, \"you need not fear that your pride will suffer, Professor Porter, for you will be able to pay the Canler person what you owe him the moment you reach home.\""], tzBk(27)),
tzzRead("💰 Your treasure has been found", tzbQs("\"Tut, tut, sir!\" exclaimed Professor Porter. \"What do you mean, sir?\"", "\"Your treasure has been found,\" said Tarzan.", "\"What--what is that you are saying?\" cried the professor. \"You are mad, man. It cannot be.\"", "\"It is, though. It was I who stole it, not knowing either its value or to whom it belonged. I saw the sailors bury it, and, ape-like, I had to dig it up and bury it again elsewhere. When D'Arnot told me what it was and what it meant to you I returned to the jungle and recovered it. It had caused so much crime and suffering and sorrow that D'Arnot thought it best not to attempt to bring the treasure itself on here, as had been my intention, so I have brought a letter of credit instead.") + tzSrc(tzBk(27)), "▶ Go on"),
tzzPuzzle("✉️ An envelope", "Tarzan draws an envelope from his pocket. How much is in the letter of credit?", ["Ten thousand francs", "Two hundred and forty-one thousand dollars", "A hundred pounds"], 1, ["That was the wager.", "", "No."], { yes: "✉️ " + tzbQ("\"Here it is, Professor Porter,\" and Tarzan drew an envelope from his pocket and handed it to the astonished professor, \"two hundred and forty-one thousand dollars. The treasure was most carefully appraised by experts, but lest there should be any question in your mind, D'Arnot himself bought it and is holding it for you, should you prefer the treasure to the credit.\"") + " " + tzbQ("\"To the already great burden of the obligations we owe you, sir,\" said Professor Porter, with trembling voice, \"is now added this greatest of all services. You have given me the means to save my honor.\"") }),
tzzSay("William Cecil Clayton", "Clayton, back in the room", "🔥 Reach town before dark", ["\"Pardon me,\" he said. \"I think we had better try to reach town before dark and take the first train out of this forest. A native just rode by from the north, who reports that the fire is moving slowly in this direction.\""], tzBk(27)),
tzzId("cars", tzzGo(tzA("wiinn", 2, -4), "Out to the waiting automobiles. Mr. Philander rides with Tarzan", { r: 4 })),
tzzSay("Mr. Samuel T. Philander", "Mr. Philander, in the French automobile", "🚗 Most remarkable", ["\"Bless me!\" exclaimed Mr. Philander, as the car moved off after Clayton. \"Who would ever have thought it possible! The last time I saw you you were a veritable wild man, skipping about among the branches of a tropical African forest, and now you are driving me along a Wisconsin road in a French automobile. Bless me! But it is most remarkable.\""], tzBk(27)),
tzzSay("Tarzan of the Apes", "Tarzan", "💀 Three skeletons", ["\"Yes,\" assented Tarzan, and then, after a pause, \"Mr. Philander, do you recall any of the details of the finding and burying of three skeletons found in my cabin beside that African jungle?\"", "\"It means a great deal to me to know,\" replied Tarzan. \"Your answer may clear up a mystery. It can do no worse, at any rate, than to leave it still a mystery. I have been entertaining a theory concerning those skeletons for the past two months, and I want you to answer my question to the best of your knowledge--were the three skeletons you buried all human skeletons?\""], tzBk(27)),
tzzPuzzle("🦴 The smallest one", "Were the three skeletons they buried by the cabin all human?", ["Yes, all three", "No: the smallest one, the one found in the crib, was the skeleton of an anthropoid ape", "No: two were apes"], 1, ["Mr. Philander remembers better.", "", "Only one."], { yes: "🦴 " + tzbQ("\"No,\" said Mr. Philander, \"the smallest one, the one found in the crib, was the skeleton of an anthropoid ape.\"") + " " + tzbQ("\"Thank you,\" said Tarzan.") }),
tzzRead("💭 In the car ahead", tzbQs("In the car ahead, Jane was thinking fast and furiously. She had felt the purpose for which Tarzan had asked a few words with her, and she knew that she must be prepared to give him an answer in the very near future.", "He was not the sort of person one could put off, and somehow that very thought made her wonder if she did not really fear him.", "And could she love where she feared?", "She realized the spell that had been upon her in the depths of that far-off jungle, but there was no spell of enchantment now in prosaic Wisconsin.", "Did she love him? She did not know--now.", "Could she love Clayton? She could see no reason why she could not. Jane was not coldly calculating by nature, but training, environment and heredity had all combined to teach her to reason even in matters of the heart.", "Again she glanced at Clayton. He was very handsome and every inch a gentleman. She should be very proud of such a husband.", "And then he spoke--a minute sooner or a minute later might have made all the difference in the world to three lives--but chance stepped in and pointed out to Clayton the psychological moment.") + tzSrc(tzBk(27)), "▶ Go on"),
tzzPuzzle("💍 The psychological moment", "\"You are free now, Jane. Won't you say yes--I will devote my life to making you very happy.\" What does she whisper?", ["\"No\"", "\"Yes\"", "\"Ask me tomorrow\""], 1, ["She does not.", "", ""], { yes: "💍 " + tzbQ("\"You are free now, Jane,\" he said. \"Won't you say yes--I will devote my life to making you very happy.\"") + " " + tzbQ("\"Yes,\" she whispered.") }),
tzzId("evening", tzzGo(tzR("depot", 0.6, 0), "That evening: in at the door of the station, to the little waiting room", { r: 2.5, tune: "grief" })),
tzzSay("Tarzan of the Apes", "Tarzan", "🌍 Across the ages", ["\"You are free now, Jane,\" he said, \"and I have come across the ages out of the dim and distant past from the lair of the primeval man to claim you--for your sake I have become a civilized man--for your sake I have crossed oceans and continents--for your sake I will be whatever you will me to be. I can make you happy, Jane, in the life you know and love best. Will you marry me?\""], tzBk(27)),
tzzRead("🌉 Burned her bridges", tzbQs("For the first time she realized the depths of the man's love--all that he had accomplished in so short a time solely for love of her. Turning her head she buried her face in her arms.", "What had she done? Because she had been afraid she might succumb to the pleas of this giant, she had burned her bridges behind her--in her groundless apprehension that she might make a terrible mistake, she had made a worse one.", "And then she told him all--told him the truth word by word, without attempting to shield herself or condone her error.") + tzSrc(tzBk(27)), "▶ Go on"),
tzzSay("Tarzan of the Apes", "Tarzan", "🤲 What can we do?", ["\"What can we do?\" he asked. \"You have admitted that you love me. You know that I love you; but I do not know the ethics of society by which you are governed. I shall leave the decision to you, for you know best what will be for your eventual welfare.\""], tzBk(27)),
tzzId("room", tzzSay("Jane Porter", "Jane", "💔 I shall have to keep it", ["\"I cannot tell him, Tarzan,\" she said. \"He too, loves me, and he is a good man. I could never face you nor any other honest person if I repudiated my promise to Mr. Clayton. I shall have to keep it--and you must help me bear the burden, though we may not see each other again after tonight.\""], tzBk(27))),
tzzRead("🌺 Through the little window", tzbQs("The others were entering the room now and Tarzan turned toward the little window.", "But he saw nothing outside--within he saw a patch of greensward surrounded by a matted mass of gorgeous tropical plants and flowers, and, above, the waving foliage of mighty trees, and, over all, the blue of an equatorial sky.", "In the center of the greensward a young woman sat upon a little mound of earth, and beside her sat a young giant. They ate pleasant fruit and looked into each other's eyes and smiled. They were very happy, and they were all alone.") + tzSrc(tzBk(27)), "▶ Go on", { tune: "love" }),
tzzId("cable", tzzRead("🧳 The station agent", tzbQs("His thoughts were broken in upon by the station agent who entered asking if there was a gentleman by the name of Tarzan in the party.", "\"I am Monsieur Tarzan,\" said the ape-man.") + tzSrc(tzBk(27)), "▶ Go on")),
tzzSay("The station agent, with an envelope", "The station agent", "📨 Forwarded from Baltimore", ["\"Here is a message for you, forwarded from Baltimore; it is a cablegram from Paris.\""], tzBk(27)),
tzzPuzzle("📨 From D'Arnot", "Tarzan tears the envelope open. The message is from D'Arnot. What does it say?", ["The prints do not match", "Fingerprints prove you Greystoke. Congratulations.", "Come home to Paris"], 1, ["No.", "", "No."], { yes: "📨 <b>" + tzbQ("Fingerprints prove you Greystoke. Congratulations. D'ARNOT.") + "</b>" }),
tzzId("clay", tzzRead("👑 A single word", tzbQs("As Tarzan finished reading, Clayton entered and came toward him with extended hand.", "Here was the man who had Tarzan's title, and Tarzan's estates, and was going to marry the woman whom Tarzan loved--the woman who loved Tarzan. A single word from Tarzan would make a great difference in this man's life.", "It would take away his title and his lands and his castles, and--it would take them away from Jane Porter also.") + tzSrc(tzBk(27)), "▶ Go on")),
tzzSay("William Cecil Clayton", "Clayton", "🤝 I say, old man", ["\"I say, old man,\" cried Clayton, \"I haven't had a chance to thank you for all you've done for us. It seems as though you had your hands full saving our lives in Africa and here.", "\"I'm awfully glad you came on here. We must get better acquainted. I often thought about you, you know, and the remarkable circumstances of your environment.", "\"If it's any of my business, how the devil did you ever get into that bally jungle?\""], tzBk(27)),
tzzPuzzle("🦍 How did you ever get into that jungle?", "With the cablegram in his hand and Jane across the room, what does Tarzan answer?", ["\"I am Lord Greystoke, and the title is mine\"", "\"I was born there. My mother was an Ape, and of course she couldn't tell me much about it. I never knew who my father was.\"", "He says nothing at all"], 1, ["One word would take it all away from Jane too.", "", "He answers."], { yes: "🦍 <b>" + tzbQ("\"I was born there,\" said Tarzan, quietly. \"My mother was an Ape, and of course she couldn't tell me much about it. I never knew who my father was.\"") + "</b>" }),
tzzRead("📖 The end", tzbQs("\"I was born there,\" said Tarzan, quietly. \"My mother was an Ape, and of course she couldn't tell me much about it. I never knew who my father was.\"") + "<p style='margin-top:14px;opacity:.8'>So ends <i>Tarzan of the Apes</i>, by Edgar Rice Burroughs (1912). He keeps his secret, for her sake: the boy from the cabin by the sea, the son of Kala, Lord Greystoke, who gave it all away with one quiet sentence.</p>" + tzSrc(tzBk(27)), "▶ Close the book", { tune: "end" })
] });
(function () {
function go() { try {
worldCard(null);
if (typeof CT !== "undefined" && CT.run)
ctStop(null);
}
catch (e) { } tzbOpenIn(); }
if (typeof ctsEnter === "function") {
var e0 = ctsEnter;
ctsEnter = function (id) { if (id === "tarzan") {
go();
return;
} return e0.apply(this, arguments); };
}
if (typeof ctStart === "function") {
var s0 = ctStart;
ctStart = function (id) { if (id === "tarzan") {
go();
return;
} return s0.apply(this, arguments); };
}
if (typeof ctBoard === "function") {
var b0 = ctBoard;
ctBoard = function (id) {
var r = b0.apply(this, arguments);
try {
if (id === "tarzan" && WLD.card) {
var e = WLD.card.querySelector("[data-w=enter]");
if (e)
e.innerHTML = "<b>🚪 Step into Tarzan of the Apes</b><div style='font-size:12px;opacity:.8'>Edgar Rice Burroughs's whole book, all twenty-eight chapters: the Fuwalda and the mutiny, the cabin on the shore, Kala and the tribe of Kerchak, the boy who taught himself to read, the tree-top ways, Mbonga's village, Jane Porter, D'Arnot, and the Wisconsin woods. About four hours; your place is kept.</div>";
}
}
catch (e) { }
return r;
};
}
})();
function tzbOpenIn() { if (WLD.on === TZW_KEY) {
tzbOpen();
return;
} tzwEnter({}); }
