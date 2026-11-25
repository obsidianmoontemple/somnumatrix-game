/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CVL = { on: !(typeof window !== "undefined" && window.CVL_OFF), made: 0, trade: [] };
function cvlHash(s) { s = String(s); var h = 2166136261; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function cvlRng(seed) { var s = seed | 0; return function () { s = s + 0x6D2B79F5 | 0; var t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function cvlPick(R, list) { return list[Math.floor(R() * list.length) % list.length]; }
function cvlLerp(R, a, b) { return a + (b - a) * R(); }
function cvlJit(c, R, k) {
k = k === undefined ? 0.07 : k;
var r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255, l = 1 + (R() * 2 - 1) * k, w = (R() * 2 - 1) * k * 0.5;
r = Math.max(0, Math.min(255, Math.round(r * l * (1 + w))));
g = Math.max(0, Math.min(255, Math.round(g * l)));
b = Math.max(0, Math.min(255, Math.round(b * l * (1 - w))));
return (r << 16) | (g << 8) | b;
}
var CVL_KIND = { house: "house", cottage: "cottage", farmhouse: "farm", barn: "farm", izba: "timber", stilthouse: "timber", longhouse: "timber",
apartment: "flat", tenementblock: "flat", hotel: "flat", shanty: "hut", boardedshack: "hut", leanto: "hut",
machiya: "east", hanok: "east", teahouse: "east", riad: "sun", hacienda: "sun", cycladic: "white",
ruin: "ruin", manor: "grand", palace: "grand", castle: "grand",
shop: "shop", motel: "shop", warehouse: "works", factory: "works", shed: "shed", garage: "shed" };
var CVL_OWNROOF = { house: 1, cottage: 1 };
var CVL_STYLE = {
grand: { grand: { palace: [[0xEDE4D0, 0xE8DCC0, 0xF0E8DC, 0xE2D2B8, 0xD8C8B0, 0xE6D8D0, 0xC8C0B0], [0x55606E, 0x3E4450, 0x4A5A50, 0x6A4A3A, 0x2E3440, 0x5A5048]],
manor: [[0xE6DCC8, 0xEDE6D8, 0xD8C8A8, 0xC8A890, 0xB07A58, 0xE0D4C0, 0xA89C88, 0xD8B49A], [0x4A4F58, 0x3E4450, 0x5A4A3E, 0x6A3E30, 0x34383E]],
castle: [[0x8C877C, 0x9A9488, 0xA89C88, 0x7A7468, 0xB0A890, 0x8A8070], [0x3E4654, 0x4A3A34, 0x34383E, 0x5A6068]] } },
house: {
walls: [["siding", [0xEDE8DC, 0xE6DCC2, 0xA9B79A, 0xA8C2C6, 0xE4D29A, 0xD8AEA2, 0x8E9CB2, 0x9A4A3A, 0xC8A066, 0x8A8A62, 0xB8B0A0, 0x6A7A8A]],
["plaster", [0xEAE2CE, 0xE8D4B0, 0xD8B49A, 0xC8C0A8, 0xE6DFD0, 0xD2C08C]],
["brick", [0x8E5040, 0xA0604A, 0x7A4434, 0xB07A58, 0x6E3E30]],
["stone", [0x9A9488, 0xB0A890, 0x8A8478, 0xA8987A]],
["wood", [0x7A5A3C, 0x8A6A48, 0x5E4630]]],
roofs: [["shingle", [0x4A4744, 0x5A4A3E, 0x3A3A3C, 0x6A5A48, 0x4A5048]], ["slate", [0x3E4450, 0x4A4C56, 0x34383E]], ["tile", [0x9A5238, 0x8A4A30, 0xA8643E, 0x7A3E2E]]],
shapes: ["gable", "gable", "front", "hip", "saltbox", "cross", "front", "hip"], pitch: [0.5, 0.85],
doors: [0x2F5A3A, 0x8A2A22, 0x2A3A5A, 0x1E1E22, 0x5A3A22, 0xC8A040, 0x2A6A6A, 0x6A2A4A, 0xE8E4DA],
ws: ["square", "square", "shuttered", "arched", "tall", "shuttered"], ds: ["plain", "plain", "arched", "glass", "double"],
frames: [0xE6E0D2, 0xF0ECE2, 0x2A2A2E, 0x3A5A3A, 0x7A6A58, 0xE8E4DA],
h: [0.94, 1.16], chim: [0.85, 0.35], hood: 0.6, boxes: 0.45, gutter: 0.75, plinth: 0.55, ivy: 0.25
},
cottage: {
walls: [["plaster", [0xF0EADC, 0xEAD8B8, 0xDCA890, 0xE8D49A, 0xD8D0C0, 0xC8B8A0, 0xE2C8C0]],
["stone", [0xA89C88, 0x9A9484, 0xB8AC94, 0x8A8070]],
["brick", [0x9A5A44, 0xB07A58, 0x8E5040]],
["wood", [0x7A5A3C, 0x9A7A54]]],
roofs: [["thatch", [0x9A8456, 0x8A7448, 0xA89060, 0x7A6A44]], ["slate", [0x3E4450, 0x4A4C56]], ["tile", [0x9A5238, 0xA8643E]], ["shingle", [0x5A4A3E, 0x4A4744]]],
shapes: ["gable", "gable", "hip", "front", "gable", "hip"], pitch: [0.75, 1.1],
doors: [0x2F5A3A, 0x8A2A22, 0x2A3A5A, 0x5A3A22, 0x3A4A3A, 0x6A5A8A, 0xA8603A],
ws: ["square", "shuttered", "square", "arched"], ds: ["plain", "arched", "plain", "round"],
frames: [0xF0ECE2, 0xE6E0D2, 0x3A5A3A, 0x5A3A22],
h: [0.95, 1.12], chim: [0.95, 0.4], hood: 0.45, boxes: 0.65, gutter: 0.4, plinth: 0.3, ivy: 0.4
},
farm: {
walls: [["wood", [0x8A3A2A, 0x7A5A3C, 0x9A4A32, 0x6A5A48, 0xA8A094]], ["plaster", [0xEAE2CE, 0xE0D0B0]], ["stone", [0x9A9488, 0xA89C88]]],
roofs: [["metalroof", [0x6E747A, 0x7A3A2A, 0x3A5A4A]], ["shingle", [0x4A4744, 0x5A4A3E]], ["thatch", [0x9A8456]]],
doors: [0x5A3A22, 0x8A2A22, 0x2F5A3A, 0xE8E4DA], frames: [0xE6E0D2, 0xF0ECE2],
h: [0.95, 1.1], chim: [0.5, 0], gutter: 0.3, plinth: 0.3, ivy: 0.2
},
timber: {
walls: [["wood", [0x8A6A48, 0x7A5A3C, 0x9A7A54, 0x6A4A30, 0xA88A60]], ["plaster", [0xE8DCC0, 0xD8C8A8]]],
roofs: [["shingle", [0x4A4744, 0x5A4A3E, 0x6A5A48]], ["thatch", [0x9A8456, 0x8A7448]], ["metalroof", [0x6E747A, 0x3A5A4A]]],
doors: [0x5A3A22, 0x2F5A3A, 0x8A2A22, 0x2A3A5A], frames: [0xE6E0D2, 0xC84A3A, 0x2A5A8A, 0xE8D49A],
h: [0.95, 1.12], chim: [0.6, 0], gutter: 0.2, plinth: 0.3, ivy: 0.25
},
flat: {
walls: [["brick", [0x8E5040, 0xA0604A, 0x7A4434, 0xB07A58, 0x6E3E30, 0x9A6A50, 0xC0A07A]],
["plaster", [0xE6DFD0, 0xD8C8A8, 0xC8B8A0, 0xE0C8A8, 0xB8C0B8]],
["stone", [0xA89C88, 0x9A9484, 0xBCB4A0]], ["concrete", [0x9A9890, 0xB0ACA0, 0x8E8C88]]],
roofs: [["slate", [0x3E4450, 0x4A4C56]], ["metalroof", [0x6E747A, 0x5A6068]]],
doors: [0x1E1E22, 0x2A3A5A, 0x2F5A3A, 0x8A2A22, 0x5A3A22], frames: [0xE6E0D2, 0xF0ECE2, 0x2A2A2E, 0x6A6058],
h: [0.9, 1.14], gutter: 0, plinth: 0.6, bal: 0.6, tank: 0.55, cornice: 0.7
},
hut: {
walls: [["wood", [0x6A5A48, 0x5A5048, 0x7A6A58, 0x5A4A3A, 0x4A4038, 0x8A7A60]], ["metal", [0x7A4A32, 0x6E747A, 0x8A5A3A, 0x5A6068, 0x6A5040]],
["siding", [0x5A6A7A, 0x5A6A50, 0x7A4A40, 0x8A8070, 0x6A6A5A]], ["brick", [0x7A4434, 0x6E3E30, 0x8E5040]]],
roofs: [["metalroof", [0x6E747A, 0x7A4A32, 0x5A6068, 0x8A5A3A, 0x4A4440]]],
tints: 1, h: [0.9, 1.12], wd: [0.84, 1], patch: 0.45, pipe: 0.4, tarp: 0.3, junk: 0.3
},
east: {
walls: [["wood", [0x5A3A24, 0x4A3020, 0x6A4A30, 0x3A2A1E]], ["plaster", [0xEDE4D0, 0xE8DCC0, 0xD8CCB0, 0xE6DACA]]],
roofs: [["tile", [0x3A3A3C, 0x4A4C50, 0x2E3236, 0x5A4A40]]],
doors: [0x3A2A1E, 0x5A3A24, 0x2A2A30], frames: [0x3A2A1E, 0xE8DCC0],
h: [0.96, 1.1], noren: 0.55, pots: 0.5
},
sun: {
walls: [["plaster", [0xD8A878, 0xE0B888, 0xC88A68, 0xE8C8A0, 0xD89A80, 0xE8D4B0, 0xC8A070]]],
roofs: [["tile", [0x9A5238, 0xA8643E, 0x8A4A30]]],
doors: [0x2A5A7A, 0x2F5A3A, 0x5A3A22, 0x8A2A22, 0x2A6A6A], frames: [0x2A5A7A, 0x3A6A4A, 0xE8E4DA],
h: [0.95, 1.1], pots: 0.6
},
white: {
walls: [["plaster", [0xF4F2EC, 0xF0EEE6, 0xF6F0E4, 0xECEAE2]]],
doors: [0x2A5A9A, 0x2A6A8A, 0x3A7AAA, 0x2A8A8A, 0x8A2A22, 0x2F6A3A], frames: [0x2A5A9A, 0x2A6A8A, 0x3A7AAA],
h: [0.95, 1.12], bloom: 0.5, pots: 0.4
},
shop: {
walls: [["brick", [0x8E5040, 0xA0604A, 0x7A4434, 0xB07A58]], ["plaster", [0xE6DFD0, 0xE0C8A8, 0xC8C0A8, 0xD8B49A]], ["stone", [0xA89C88, 0xBCB4A0]], ["siding", [0x5A6A7A, 0x2F5A3A, 0x8A2A22, 0xE6DCC2]]],
awn: [0x8A2A22, 0x2F5A3A, 0x2A3A5A, 0xC8A040, 0x6A2A4A, 0x2A6A6A, 0xA8643E, 0x3A3A3C],
doors: [0x1E1E22, 0x2A3A5A, 0x2F5A3A, 0x8A2A22, 0x5A3A22], frames: [0xE6E0D2, 0x1E1E22, 0x2F5A3A],
h: [0.95, 1.12], gutter: 0.5, plinth: 0.4
},
works: {
walls: [["metal", [0x6E747A, 0x5A6068, 0x7A4A32, 0x3A5A4A, 0x8A8E94]], ["brick", [0x8E5040, 0x7A4434, 0x9A6A50]], ["concrete", [0x9A9890, 0x8E8C88]]],
tints: 1, h: [0.96, 1.06], gutter: 0
},
ruin: { walls: [["stone", [0x8A857A, 0x9A9488, 0x7A7468, 0x8A8070, 0xA89C88, 0x6E6A62]]], tints: 1 },
shed: {
walls: [["wood", [0x7A5A3C, 0x5A4A3A, 0x6A5A48]], ["brick", [0x7A4434, 0x8E5040, 0x6E3E30]], ["metal", [0x6E747A, 0x7A4A32]], ["concrete", [0x9A9890]]],
roofs: [["metalroof", [0x6E747A, 0x7A3A2A, 0x5A6068, 0x3A5A4A]]],
doors: [0x5A3A22, 0x2F5A3A, 0x3A3026, 0x2A3A5A],
h: [0.95, 1.1], junk: 0.45
}
};
function cvlChoose(spec) {
if (!CVL.on || !spec || !spec.city || spec.cvl || spec.lotItem)
return;
var grp = CVL_KIND[spec.archetype];
if (!grp || typeof KIT === "undefined" || !KIT[spec.archetype])
return;
if (typeof isHidden === "function" && isHidden(spec))
return;
var S = CVL_STYLE[grp], a = spec.attrs || (spec.attrs = {}), R = cvlRng(cvlHash("cvl|" + spec.id));
var L = { g: grp };
if (S.grand) {
var P = S.grand[spec.archetype];
if (!P)
return;
L.wall = cvlJit(cvlPick(R, P[0]), R, 0.04);
L.roofCol = cvlJit(cvlPick(R, P[1]), R, 0.05);
L.seed = cvlHash("cvl2|" + spec.id);
spec.cvl = L;
CVL.made++;
return;
}
var W = cvlPick(R, S.walls);
if (a.m === undefined)
a.m = W[0];
if (a.c === undefined)
a.c = cvlJit(cvlPick(R, W[1]), R, 0.05);
if (S.roofs) {
var Rf = cvlPick(R, S.roofs);
if (a.rm === undefined)
a.rm = Rf[0];
if (a.rc === undefined)
a.rc = cvlJit(cvlPick(R, Rf[1]), R, 0.06);
}
if (S.doors && a.dc === undefined)
a.dc = cvlPick(R, S.doors);
if (S.frames && a.wf === undefined)
a.wf = cvlPick(R, S.frames);
if (S.ws && a.ws === undefined)
a.ws = cvlPick(R, S.ws);
if (S.ds && a.ds === undefined)
a.ds = cvlPick(R, S.ds);
if (S.awn)
L.awn = cvlPick(R, S.awn);
if (S.tints)
L.tint = 1;
if (S.h && a.h === undefined && !a.lv) {
var h = cvlLerp(R, S.h[0], S.h[1]);
if (Math.abs(h - 1) > 0.02)
a.h = Math.round(h * 100) / 100;
}
if (S.wd && /^sw/.test(spec.id) && a.w === undefined && a.d === undefined) {
a.w = Math.round(cvlLerp(R, S.wd[0], S.wd[1]) * 100) / 100;
a.d = Math.round(cvlLerp(R, S.wd[0], S.wd[1]) * 100) / 100;
}
if (CVL_OWNROOF[spec.archetype]) {
L.roof = cvlPick(R, S.shapes);
L.pitch = cvlLerp(R, S.pitch[0], S.pitch[1]);
}
if (S.chim) {
L.chim = R() < S.chim[0] ? (R() < S.chim[1] ? 2 : 1) : 0;
L.chimX = R() < 0.5 ? -1 : 1;
L.chimZ = cvlLerp(R, -0.25, 0.25);
L.chimCol = cvlPick(R, [0x8E5040, 0x7A4434, 0xA0604A, 0x9A9488, 0x8A8070]);
}
["hood", "boxes", "gutter", "plinth", "ivy", "bal", "tank", "cornice", "patch", "pipe", "tarp", "junk", "noren", "pots", "bloom"].forEach(function (k) { if (S[k] && R() < S[k])
L[k] = 1; });
if (L.hood)
L.hoodKind = R() < 0.5 ? "flat" : "gable";
if (L.ivy)
L.ivySide = R() < 0.5 ? -1 : 1;
if (L.plinth)
L.plinthCol = cvlPick(R, [0x5A5650, 0x6A6258, 0x4A4440, 0x7A6A58]);
if (L.bal)
L.balCols = [R() < 0.5, R() < 0.5, R() < 0.7, R() < 0.5, R() < 0.5, R() < 0.6, R() < 0.4];
L.flower = cvlPick(R, [0xC83A3A, 0xE8C040, 0xD86AA8, 0xE8E4DA, 0x8A4AC8, 0xE87A3A]);
L.seed = cvlHash("cvl2|" + spec.id);
spec.cvl = L;
CVL.made++;
}
function cvlOwned(spec) {
try {
return !!(spec && spec.city && !spec.lotItem && typeof rsyLookFor === "function" && typeof rsyKeyOf === "function" && rsyLookFor(rsyKeyOf(spec)));
}
catch (e) {
return false;
}
}
function cvlBodyPart(parts) {
var best = null, bv = 0;
parts.forEach(function (pt) { if (pt.g !== "box" || pt.glow || pt.rep)
return; var s = pt.s; if (pt.p[1] - s[1] / 2 > 0.6)
return; var v = s[0] * s[1] * s[2]; if (v > bv) {
bv = v;
best = pt;
} });
return best;
}
(function () {
if (typeof levelParts !== "function")
return;
var lp0 = levelParts;
levelParts = function (def, spec) {
var ps = lp0.apply(this, arguments), L = spec && spec.cvl;
if (!L || spec.__rsy)
return ps;
var a0 = spec.attrs || {}, ck = (ps === def.parts ? "k" : "l" + a0.lv) + "|" + a0.rc + "|" + spec.archetype, M = L._lp;
if (M && M.k === ck)
return M.out;
if (L.g === "grand") {
var GM = typeof RSY_GRAND !== "undefined" ? RSY_GRAND[spec.archetype] : null;
if (!GM)
return ps;
var gout = ps.map(function (p) {
var role = typeof p.c === "number" ? GM[p.c] : null;
if (!role || role === "trim")
return p;
var c = role === "wall" ? L.wall : role === "wall2" ? shade(L.wall, -0.08) : L.roofCol;
return Object.assign({}, p, { c: c });
});
Object.defineProperty(L, "_lp", { value: { k: ck, out: gout }, writable: true, configurable: true, enumerable: false });
return gout;
}
try {
var body = cvlBodyPart(ps), top = body ? body.p[1] + body.s[1] / 2 : 0, bc = body ? body.c : null, a = spec.attrs || {}, R = cvlRng(L.seed);
var own = CVL_OWNROOF[spec.archetype] && L.roof;
var out = [];
ps.forEach(function (p) {
var q = p;
if (own && p.c === "trim" && (p.g === "tri" || p.g === "cone"))
return;
if (own && p.c === "stone" && p.p[1] > top)
return;
if (p.glow || p.c === "glass" || p.c === "dark") {
out.push(p);
return;
}
if (typeof p.c === "number") {
if (bc !== null && typeof bc === "number" && p.c === bc && p.g === "box")
q = Object.assign({}, p, { c: "body" });
else if (body && p.p[1] >= top - 0.3 && (p.g === "tri" || p.g === "cone" || (p.r && (p.r[0] || p.r[2]))) && a.rc !== undefined)
q = (p.g === "tri" || p.g === "cone") ? Object.assign({}, p, { c: "trim" }) : Object.assign({}, p, { c: cvlJit(a.rc, R, 0.04) });
else
q = Object.assign({}, p, { c: cvlJit(p.c, R, L.tint ? 0.12 : 0.06) });
}
else if (p.c === "paint" && L.awn !== undefined)
q = Object.assign({}, p, { c: L.awn });
else if (p.c === "stone" && L.g === "ruin" && a.c !== undefined)
q = Object.assign({}, p, { c: cvlJit(a.c, R, 0.06) });
out.push(q);
});
Object.defineProperty(L, "_lp", { value: { k: ck, out: out }, writable: true, configurable: true, enumerable: false });
return out;
}
catch (e) {
return ps;
}
};
})();
var CVL_MATS = {}, CVL_GEOS = {};
function cvlMat(col, tex, o) {
o = o || {};
var detail = typeof landOpt !== "function" || landOpt("detail");
var k = col + "|" + (detail ? tex || "" : "") + "|" + (o.ds ? 1 : 0) + "|" + (o.basic ? 1 : 0);
if (CVL_MATS[k])
return CVL_MATS[k];
var m = o.basic ? new THREE.MeshBasicMaterial({ color: col, side: o.ds ? THREE.DoubleSide : THREE.FrontSide })
: new THREE.MeshLambertMaterial({ color: col, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
if (detail && tex && typeof texOf === "function") {
var t = texOf(tex);
if (t)
m.map = t;
}
return (CVL_MATS[k] = m);
}
function cvlBox(g, w, h, d, mat, x, y, z, ry, rx, rz) {
var m = new THREE.Mesh(geo("box", [Math.round(w * 100) / 100, Math.round(h * 100) / 100, Math.round(d * 100) / 100]), mat);
m.position.set(x, y, z);
if (ry || rx || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0);
m.castShadow = Math.max(w, h, d) >= 1.2;
m.receiveShadow = true;
m.userData.cvl = 1;
g.add(m);
return m;
}
function cvlCyl(g, r0, r1, h, mat, x, y, z, seg) {
var m = new THREE.Mesh(geo("cyl", [r0, r1, Math.round(h * 100) / 100, seg || 8]), mat);
m.position.set(x, y, z);
m.userData.cvl = 1;
g.add(m);
return m;
}
function cvlRoofGeo(shape, w, d, rise, o, side) { return __ZC(414, 0, this, arguments, new.target); }
function cvlFrontWindows(spec, parts, body) {
var a = spec.attrs || {}, B = { w: body.s[0], h: body.s[1], d: body.s[2], x: body.p[0], z: body.p[2] }, out = [];
var door = typeof frontDoorOf === "function" ? frontDoorOf(parts) : null, doorX = door ? door.p[0] : B.x, doorW = door ? door.s[0] : 1.1;
if (a.ws !== undefined && a.ws !== "none") {
var W = a.ws === "tall" ? 1 : 1.2, H = a.ws === "tall" ? 2.4 : a.ws === "round" ? 1.2 : 1.4, y = B.h < 4.2 ? Math.min(B.h * 0.55, B.h - 1) : 1.8;
var cols = Math.max(1, Math.min(12, Math.floor((B.w - 2.4) / 3.2) + 1)), span = (cols - 1) * 3.2;
for (var c = 0; c < cols; c++) {
var u = -span / 2 + c * 3.2;
if (Math.abs((B.x + u) - doorX) < doorW / 2 + 0.75)
continue;
out.push({ x: B.x + u, y: y, w: W, h: H, z: B.z + B.d / 2 });
}
return out;
}
parts.forEach(function (p) {
if (p.c !== "glass" || p.glow || p.g !== "box" || p.p[2] < B.z + B.d / 2 - 0.4)
return;
var n = p.rep ? p.rep[0] : 1;
for (var i = 0; i < n; i++) {
var x = p.p[0] + (p.rep ? p.rep[1] * i : 0), y = p.p[1] + (p.rep ? p.rep[2] * i : 0);
if (y < 4.5)
out.push({ x: x, y: y, w: p.s[0], h: p.s[1], z: p.p[2] });
}
});
return out;
}
function cvlDress(g, spec) {
var L = spec.cvl, def = KIT[spec.archetype];
if (!L || !def)
return;
var parts = levelParts(def, spec), body = cvlBodyPart(parts);
if (!body)
return;
var a = spec.attrs || {}, R = cvlRng(L.seed), lite = typeof LITE !== "undefined" && LITE;
var w = body.s[0], h = body.s[1], d = body.s[2], bx = body.p[0], bz = body.p[2], y0 = body.p[1] - h / 2, top = y0 + h, front = bz + d / 2;
var door = typeof frontDoorOf === "function" ? frontDoorOf(parts) : null, dx = door ? door.p[0] : bx, dw = door ? door.s[0] : 1.1, dh = door ? door.s[1] : 2.2;
var wallCol = a.c !== undefined ? a.c : 0xB7AD98, roofCol = a.rc !== undefined ? a.rc : 0x4A4744, trim = a.wf !== undefined ? a.wf : 0xE6E0D2;
var ridge = top;
if (CVL_OWNROOF[spec.archetype] && L.roof) {
var span = (L.roof === "front") ? w : d, rise = Math.max(1.2, Math.min(span * 0.5 * L.pitch, 6)), RG = cvlRoofGeo(L.roof, w, d, rise, 0.45, L.chimX);
var rm = cvlMat(roofCol, a.rm || "shingle", { ds: true });
if (RG.roof) {
var rmesh = new THREE.Mesh(RG.roof, rm);
rmesh.position.set(bx, top, bz);
rmesh.castShadow = true;
rmesh.receiveShadow = true;
rmesh.userData.cvl = 1;
g.add(rmesh);
}
if (RG.ends) {
var emesh = new THREE.Mesh(RG.ends, cvlMat(wallCol, a.m || "plaster", { ds: true }));
emesh.position.set(bx, top, bz);
emesh.userData.cvl = 1;
g.add(emesh);
}
ridge = top + (L.roof === "saltbox" ? rise * (d / 2 + 0.45 + d * 0.18) / (d / 2 + 0.45) : rise);
if (!lite && L.roof !== "front") {
[1, -1].forEach(function (s) { cvlBox(g, w + 0.9, 0.22, 0.08, cvlMat(trim), bx, top - 0.02, bz + s * (d / 2 + 0.45), 0); });
}
if ((L.roof === "front" || L.roof === "cross") && rise > 2) {
var gx = L.roof === "front" ? bx : bx + L.chimX * (w / 2 - w * 0.23 - 0.4);
cvlBox(g, 0.9, 0.9, 0.06, cvlMat(trim), gx, top + rise * 0.32, front + 0.03);
cvlBox(g, 0.7, 0.7, 0.06, cvlMat(0x3A4654, null, { basic: true }), gx, top + rise * 0.32, front + 0.05);
}
}
else {
parts.forEach(function (p) { var t = p.p[1] + (p.g === "box" ? p.s[1] / 2 : p.g === "tri" || p.g === "cone" ? p.s[1] : 0); if (t > ridge && !p.glow)
ridge = t; });
}
if (L.chim) {
var cm = cvlMat(L.chimCol, "brick"), pot = cvlMat(0x8A4A30);
for (var c = 0; c < L.chim; c++) {
var cx = bx + (c ? -L.chimX : L.chimX) * (w / 2 - 0.9), cz = bz + L.chimZ * d, ch = (ridge - top) + 1.2 + R() * 0.6;
cvlBox(g, 0.95, ch + 0.6, 0.75, cm, cx, top - 0.6 + (ch + 0.6) / 2, cz);
cvlBox(g, 1.1, 0.16, 0.9, cvlMat(0x6A6258), cx, top + ch + 0.08, cz);
if (!lite)
for (var pp = 0; pp < (R() < 0.5 ? 1 : 2); pp++)
cvlCyl(g, 0.13, 0.16, 0.5, pot, cx + (pp ? 0.24 : -0.12) * (R() < 0.5 ? 1 : -1), top + ch + 0.4, cz);
}
}
if (door && L.hood) {
var hm = cvlMat(trim), hy = dh + 0.3;
if (L.hoodKind === "gable") {
var hw = (dw + 1.0) / 2, ang = 0.5, len = hw / Math.cos(ang);
[1, -1].forEach(function (s) { cvlBox(g, len, 0.12, 0.9, hm, dx + s * hw / 2, hy + Math.tan(ang) * hw / 2, front + 0.45, 0, 0, -s * ang); });
cvlBox(g, dw + 0.9, 0.14, 0.2, hm, dx, hy - 0.02, front + 0.1);
}
else
cvlBox(g, dw + 0.9, 0.14, 0.85, hm, dx, hy, front + 0.42);
[1, -1].forEach(function (s) { cvlBox(g, 0.12, 0.5, 0.6, hm, dx + s * (dw / 2 + 0.3), hy - 0.3, front + 0.3); });
}
if (door && (L.hood || L.plinth))
cvlBox(g, dw + 0.8, 0.18, 0.55, cvlMat(0x8A8478, "stone"), dx, y0 + 0.09, front + 0.28);
if (L.boxes && !lite) {
var wins = cvlFrontWindows(spec, parts, body), bm = cvlMat(a.dc !== undefined ? a.dc : 0x5A3A22), fm = cvlMat(L.flower), lv = cvlMat(0x3A6A2A, "foliage");
wins.forEach(function (W) {
var by = W.y - W.h / 2 - 0.16;
cvlBox(g, W.w + 0.3, 0.24, 0.28, bm, W.x, by, W.z + 0.16);
cvlBox(g, W.w + 0.2, 0.2, 0.22, lv, W.x, by + 0.2, W.z + 0.16);
for (var f = 0; f < 3; f++)
cvlBox(g, 0.16, 0.14, 0.14, fm, W.x - W.w / 2 + 0.25 + f * (W.w - 0.3) / 2, by + 0.33, W.z + 0.18);
});
}
if (L.gutter && !lite) {
var gm = cvlMat(R() < 0.6 ? 0x2A2A2E : 0xE6E0D2);
if (!(L.roof === "front")) {
cvlBox(g, w + 0.6, 0.14, 0.14, gm, bx, top - 0.08, front + 0.5);
cvlBox(g, w + 0.6, 0.14, 0.14, gm, bx, top - 0.08, bz - d / 2 - 0.5);
}
var px = bx + (R() < 0.5 ? -1 : 1) * (w / 2 - 0.15);
cvlBox(g, 0.11, h, 0.11, gm, px, y0 + h / 2, front + 0.1);
}
if (L.plinth)
cvlBox(g, w + 0.12, 0.5, d + 0.12, cvlMat(L.plinthCol, "stone"), bx, y0 + 0.25, bz);
if (L.ivy && !lite) {
var iw = Math.min(d * 0.6, 2 + R() * 2.4), ih = Math.min(h * 0.95, 2 + R() * h * 0.8), iz = bz + (R() - 0.5) * (d - iw) * 0.7, ivx = bx + L.ivySide * (w / 2 + 0.04);
var im = [cvlMat(0x2E5A26, "foliage"), cvlMat(0x3A6A2E, "foliage"), cvlMat(0x24481E, "foliage")];
for (var iv = 0; iv < 5; iv++) {
var f = iv / 5, bw2 = iw * (1 - f * 0.55) * (0.8 + R() * 0.3), bh2 = ih * (0.3 + R() * 0.25);
cvlBox(g, 0.07 + iv * 0.01, bh2, bw2, im[iv % 3], ivx + L.ivySide * iv * 0.005, y0 + ih * f * 0.8 + bh2 / 2, iz + (R() - 0.5) * iw * 0.35);
}
}
if (L.cornice)
cvlBox(g, w + 0.5, 0.55, d + 0.5, cvlMat(cvlJit(trim === 0x2A2A2E ? 0xC8C0A8 : trim, R, 0.05), "stone"), bx, top + 0.1, bz);
if (L.bal && !lite) {
var BM = cvlMat(0x2A2C30), SM = cvlMat(0x8A8478, "concrete"), wins2 = [];
parts.forEach(function (p) {
if (p.c !== "glass" || p.glow || p.g !== "box" || p.p[2] < front - 0.4)
return;
var n1 = p.rep ? p.rep[0] : 1, n2 = p.rep2 ? p.rep2[0] : 1;
for (var i = 0; i < n1; i++)
for (var j = 0; j < n2; j++) {
var x = p.p[0] + (p.rep ? p.rep[1] * i : 0) + (p.rep2 ? p.rep2[1] * j : 0), y = p.p[1] + (p.rep ? p.rep[2] * i : 0) + (p.rep2 ? p.rep2[2] * j : 0);
wins2.push({ x: x, y: y, col: i, w: p.s[0], h: p.s[1] });
}
});
wins2.forEach(function (W) {
if (W.y < 4 || !L.balCols[W.col % L.balCols.length])
return;
var fy = W.y - W.h / 2 - 0.15;
cvlBox(g, W.w + 1.0, 0.14, 1.0, SM, W.x, fy, front + 0.5);
cvlBox(g, W.w + 1.0, 0.9, 0.05, BM, W.x, fy + 0.5, front + 0.98);
[1, -1].forEach(function (s) { cvlBox(g, 0.05, 0.9, 1.0, BM, W.x + s * (W.w / 2 + 0.48), fy + 0.5, front + 0.5); });
});
}
if (L.tank) {
var tx = bx + (R() - 0.5) * w * 0.5, tz = bz - (R() * 0.3) * d;
if (R() < 0.5) {
cvlCyl(g, 1.3, 1.3, 2.4, cvlMat(0x7A5A3C, "wood"), tx, top + 1.9, tz, 12);
cvlCyl(g, 1.4, 0.2, 0.8, cvlMat(0x4A4440), tx, top + 3.5, tz, 12);
[[-0.9, -0.9], [0.9, -0.9], [-0.9, 0.9], [0.9, 0.9]].forEach(function (q) { cvlBox(g, 0.14, 0.8, 0.14, cvlMat(0x2A2C30), tx + q[0], top + 0.4, tz + q[1]); });
}
else {
cvlBox(g, 3.2, 2.6, 2.6, cvlMat(cvlJit(wallCol, R, 0.08), a.m || "brick"), tx, top + 1.3, tz);
cvlBox(g, 1.0, 2.0, 0.08, cvlMat(0x2A2C30), tx, top + 1.0, tz + 1.32);
}
}
if (L.patch) {
var pc = cvlPick(R, [0x7A4A32, 0x6E747A, 0x8A7A60, 0x5A6A7A, 0x4A4038]), pw = 0.8 + R() * Math.min(1.4, w * 0.3), ph = 0.7 + R() * Math.min(1.2, h * 0.4);
cvlBox(g, pw, ph, 0.05, cvlMat(pc, R() < 0.5 ? "metal" : "wood"), bx + (R() - 0.5) * (w - pw) * 0.8, y0 + 0.4 + R() * (h - ph - 0.6) + ph / 2, front + 0.04);
}
if (L.pipe && !lite) {
var sx = bx + (R() < 0.5 ? -1 : 1) * (w / 2 - 0.5), sz = bz - d * 0.2;
cvlCyl(g, 0.11, 0.11, (ridge - top) + 2.0, cvlMat(0x2A2A2C), sx, top + ((ridge - top) + 2.0) / 2 - 0.2, sz, 8);
cvlCyl(g, 0.2, 0.2, 0.12, cvlMat(0x2A2A2C), sx, ridge + 1.8, sz, 8);
}
if (L.tarp)
cvlBox(g, Math.min(w, 1.6 + R() * 2.4), 0.05, Math.min(d, 1.4 + R() * 2), cvlMat(cvlPick(R, [0x2A4A7A, 0x3A5A3A, 0x7A5A3A, 0x6A6A62])), bx + (R() - 0.5) * w * 0.3, ridge + 0.06, bz + (R() - 0.5) * d * 0.3, R() * 0.6, 0, 0.04);
if (L.junk && !lite) {
var jm = cvlMat(0x7A5A3A, "wood"), jx = bx + (dx > bx ? -1 : 1) * (w / 2 - 0.6);
cvlBox(g, 0.7, 0.6, 0.7, jm, jx, y0 + 0.3, front + 0.5, R());
if (R() < 0.6)
cvlBox(g, 0.5, 0.45, 0.5, jm, jx + 0.1, y0 + 0.82, front + 0.5, R());
if (R() < 0.5)
cvlCyl(g, 0.32, 0.3, 0.9, cvlMat(0x5A3A24, "wood"), jx - (dx > bx ? -1 : 1) * 0.9, y0 + 0.45, front + 0.5, 10);
}
if (L.noren && door) {
var nm = cvlMat(cvlPick(R, [0x1E2A4A, 0x6A1E1E, 0x2A2A2E, 0x3A4A2A]), null, { ds: true });
for (var nn = 0; nn < 3; nn++)
cvlBox(g, (dw + 0.3) / 3 - 0.04, 0.9, 0.03, nm, dx - (dw + 0.3) / 3 + nn * (dw + 0.3) / 3, dh - 0.35, front + 0.14);
}
if (L.pots && door && !lite) {
[1, -1].forEach(function (s) {
var px2 = dx + s * (dw / 2 + 0.75);
cvlCyl(g, 0.32, 0.24, 0.6, cvlMat(cvlPick(R, [0xA8643E, 0x8A4A30, 0x2A5A7A, 0xE8E4DA])), px2, y0 + 0.3, front + 0.45, 10);
var bush = new THREE.Mesh(geo("ico", [0.48]), cvlMat(0x3A6A2E, "foliage"));
bush.position.set(px2, y0 + 0.95, front + 0.45);
bush.userData.cvl = 1;
g.add(bush);
});
}
if (L.bloom && !lite) {
var bw = 1.6 + R() * 2;
cvlBox(g, bw, Math.min(h * 0.8, 2 + R() * 1.6), 0.1, cvlMat(cvlPick(R, [0xC84A8A, 0xD86AA8, 0xB03A6A]), "foliage"), bx + (R() < 0.5 ? -1 : 1) * (w / 2 - bw / 2 - 0.3), y0 + Math.min(h * 0.8, 2 + R() * 1.6) / 2 + 0.6, front + 0.06);
}
}
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var g = b0.apply(this, arguments);
try {
if (g && spec && spec.cvl && spec.city && !(typeof isHidden === "function" && isHidden(spec)) && !cvlOwned(spec))
cvlDress(g, spec);
}
catch (e) {
if (window.console && !CVL.warned) {
CVL.warned = 1;
console.warn("[city-looks]", e);
}
}
return g;
};
})();
(function () {
if (typeof atlHands !== "function")
return;
var h0 = atlHands;
atlHands = function (r, h) {
var C = h0.apply(this, arguments);
if (C && typeof C.put === "function") {
var p0 = C.put;
C.put = function () { var sp = p0.apply(this, arguments); try {
if (sp)
cvlChoose(sp);
}
catch (e) { } return sp; };
}
return C;
};
})();
var CVL_TRADES = [["J. PELL", "clockmender"], ["HARTLEY & DAUGHTER", "bookbinders"], ["M. QUILL", "scrivener · letters written"], ["THE LACE BOX", "lace · ribbons · trims"],
["I. BRANDT", "lutes and viols"], ["R. FENN", "chandler · fine candles"], ["O. MARSH", "apothecary"], ["E. WREN", "milliner"], ["T. GALE", "engraver"],
["S. HOLLOWAY", "glover"], ["P. ASHDOWN", "maps and charts"], ["N. CRANE", "tea and spices"], ["A. LOVELL", "perfumer"], ["B. THORNE", "cutler"],
["C. MERRICK", "dolls mended"], ["F. OAKES", "gilder · frames"], ["G. TALBOT", "snuff and pipes"], ["H. VALE", "ink · pens · paper"]];
var CVL_LANES = [{ rs: 430, side: 1, a: -2.4536, at: [-64, -49, -34, -19, 19] }, { rs: 430, side: -1, a: -2.4536, at: [-52, -37, -22, -7] },
{ rs: 430, side: 1, a: -1.03, at: [-16, 0, 16] }, { rs: 430, side: 1, a: 2.65, at: [-16, 0, 16] }, { rs: 430, side: 1, a: -0.25, at: [-15, 0, 15] }];
function cvlLanes(C) {
var keepSeq = C.seq, keepPre = C.pre;
C.pre = "cvl";
C.seq = 0;
try {
var cx = C.h.x, cz = C.h.z, here = C.r.id;
var stand = store.objects.filter(function (o) { return o.realm === here && o.city && KIT[o.archetype] && !(typeof ATL_WALKTHROUGH !== "undefined" && ATL_WALKTHROUGH[o.archetype]); })
.map(function (o) { var d = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1; return { x: o.x, z: o.z, r: Math.max(d.size[0], d.size[2]) * s * 0.5 }; });
if (typeof GLD_GUILDS !== "undefined" && typeof gldCitySpot === "function")
GLD_GUILDS.forEach(function (G) { try {
var S = gldCitySpot(G);
if (S)
stand.push({ x: S.x, z: S.z, r: Math.max(S.w, S.d) * 0.5 + 2 });
}
catch (e) { } });
function free(x, z, r) { for (var i = 0; i < stand.length; i++) {
var q = stand[i];
if (Math.hypot(q.x - x, q.z - z) < q.r + r + 1.5)
return false;
} return true; }
var t = 0;
CVL_LANES.forEach(function (Ln) {
Ln.at.forEach(function (al) {
var R = cvlRng(cvlHash("lane|" + Ln.a + "|" + Ln.side + "|" + al)), w = Math.round(cvlLerp(R, 0.74, 0.92) * 100) / 100, lv = R() < 0.55 ? 3 : 4;
var dd = KIT.house.size[2], rb = Ln.rs + Ln.side * (ATL_ROAD + ATL_SETBACK + dd / 2), a = Ln.a + al / rb;
if (!atlClearAt(rb, a, KIT.house.size[0] * w / 2 + 1, 3))
return;
var x = cx + Math.cos(a) * rb, z = cz + Math.sin(a) * rb, rad = Math.max(KIT.house.size[0] * w, dd) * 0.5;
if (!free(x, z, rad))
return;
var T = CVL_TRADES[(t++) % CVL_TRADES.length];
var sp = C.front("house", Ln.rs, Ln.side, a, 1, null, { cvlTrade: { t: T[0], s: T[1] } }).spec;
if (!sp)
return;
var at = sp.attrs || (sp.attrs = {});
at.w = w;
at.lv = lv;
delete at.h;
stand.push({ x: sp.x, z: sp.z, r: rad });
CVL.trade.push(sp.id);
});
});
}
finally {
C.pre = keepPre;
C.seq = keepSeq;
}
}
(function () {
if (typeof atlStairDress !== "function")
return;
var d0 = atlStairDress;
atlStairDress = function (C) { var r = d0.apply(this, arguments); try {
if (CVL.on)
cvlLanes(C);
}
catch (e) {
if (window.console)
console.warn("[city-looks] lanes", e);
} return r; };
window.atlStairDress = atlStairDress;
})();
var CVL_SIGNS = {};
function cvlTradeTex(t, s, bg, fg) { return __ZC(414, 1, this, arguments, new.target); }
function cvlTradeFront(g, spec) { return __ZC(414, 2, this, arguments, new.target); }
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var g = b0.apply(this, arguments);
try {
if (g && spec && spec.cvlTrade)
cvlTradeFront(g, spec);
}
catch (e) {
if (window.console && !CVL.warnT) {
CVL.warnT = 1;
console.warn("[city-looks] trade", e);
}
}
return g;
};
})();
