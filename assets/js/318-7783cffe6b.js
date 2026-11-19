/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var ES = { last: null, room: null, roomAt: 0, said: "", cullAt: 0, size: {} };
function esLite() { return typeof LITE !== "undefined" && !!LITE; }
function esPlot(spec) { try {
return typeof hlPlotOf === "function" ? hlPlotOf(spec) : null;
}
catch (e) {
return null;
} }
function esKind(spec) { return __ZC(318, 0, this, arguments, new.target); }
function esGrid(g) { return __ZC(318, 1, this, arguments, new.target); }
var ES_DOOR = { "1i": "w", "1o": "w", "2i": "w", "2o": "w", "3i": "w", "3o": "n", "4i": "s", "4o": "s" };
function esMirror(s) { return s === "w" ? "e" : s === "e" ? "w" : s; }
function esSlotDoor(slot) {
if (slot === "c4")
return "s";
var d = ES_DOOR[slot.slice(1)];
return slot.charAt(0) === "l" ? esMirror(d) : d;
}
function esEdgeMid(r, s) { return s === "w" || s === "e" ? (r.z0 + r.z1) / 2 : (r.x0 + r.x1) / 2; }
function esDoor(r, s, at) { return { s: s, at: at === undefined || at === null ? esEdgeMid(r, s) : at }; }
var ES_HOUSES = {
crown: { g: { X: 28, Z: 24, hx: 8, hd: 14, s: 3.5, g0: -14, g1: -10, m: 0, xi: 16, x1: 18, c: 6, x4: 17 }, h: 4.2, levels: 3, stairX: 4.5, stairZ: 13,
floors: ["The state rooms", "The family and guest floor", "The leisure and staff floor"],
wall: 0xD2C8B4, trim: 0xB89A5E,
plan: [
{ hall: { k: "greathall", n: "The Great Hall" }, spine: { k: "longgallery", n: "The Long Gallery" }, gallery: { k: "corridor", n: "The Marble Corridor" },
r1i: { k: "drawing", n: "The Drawing Room" }, r1o: { k: "music", n: "The Music Room" },
r2i: { k: "library", n: "The Library" }, r2o: { k: "office", n: "The Estate Office" },
r3i: { k: "billiards", n: "The Billiard Room", more: [{ s: "n" }] }, r3o: { k: "conservatory", n: "The Conservatory" },
c4: { k: "saloon", n: "The Garden Saloon" }, r4: { merge: ["r4i", "r4o"], k: "ballroom", n: "The Ballroom" },
l1i: { split: "across", at: 0.64, parts: [{ k: "morning", n: "The Morning Room" }, { k: "cloak", n: "The Cloakroom" }] }, l1o: { k: "cards", n: "The Card Room" },
l2i: { k: "dining", n: "The State Dining Room" }, l2o: { k: "pantry", n: "The Butler's Pantry" },
l3i: { k: "servants", n: "The Servants' Hall", more: [{ s: "w" }] }, l3o: { k: "kitchen", n: "The Kitchen", more: [{ s: "s" }] },
l4i: { split: "across", parts: [{ k: "scullery", n: "The Scullery" }, { k: "laundry", n: "The Laundry" }] },
l4o: { split: "across", parts: [{ k: "housekeeper", n: "The Housekeeper's Room" }, { k: "wine", n: "The Wine Cellar" }] } },
{ hall: { k: "landing", n: "The Gallery Landing" }, spine: { k: "longgallery", n: "The Portrait Gallery" }, gallery: { k: "corridor", n: "The Bedroom Corridor" },
r1i: { k: "principal", n: "The Principal Bedroom" }, r1o: { split: "across", parts: [{ k: "dressing", n: "His Dressing Room" }, { k: "dressing", n: "Her Dressing Room" }] },
r2i: { k: "bathgrand", n: "The Principal Bathroom", doors: [{ s: "s", at: 12 }] }, r2o: { k: "boudoir", n: "The Private Sitting Room", doors: [{ s: "s", at: 23 }] },
r3i: { split: "along", at: 0.66, parts: [{ k: "guestbed", n: "The Blue Guest Room", tint: 0x8EA0B8 }, { k: "ensuite", n: "The Blue Room's Bathroom" }] },
r3o: { split: "along", at: 0.62, parts: [{ k: "guestbed", n: "The Rose Guest Room", tint: 0xC09A98 }, { k: "ensuite", n: "The Rose Room's Bathroom" }] },
c4: { k: "familysit", n: "The Family Sitting Room" },
r4i: { split: "along", at: 0.66, parts: [{ k: "guestbed", n: "The Green Guest Room", tint: 0x98A888 }, { k: "ensuite", n: "The Green Room's Bathroom" }] },
r4o: { split: "along", at: 0.66, parts: [{ k: "guestbed", n: "The Gold Guest Room", tint: 0xC8B080 }, { k: "ensuite", n: "The Gold Room's Bathroom" }] },
l1i: { k: "nursery", n: "The Nursery" }, l1o: { k: "nanny", n: "The Nanny's Room" },
l2i: { k: "playroom", n: "The Playroom and Schoolroom" }, l2o: { k: "kidsbath", n: "The Children's Bathroom" },
l3i: { k: "childbed", n: "The Little Bedroom", tint: 0xA4B8C8 }, l3o: { k: "childbed", n: "The Children's Bedroom", tint: 0xD0B098 },
l4i: { k: "familybath", n: "The Family Bathroom" },
l4o: { split: "across", parts: [{ k: "linen", n: "The Linen Room" }, { k: "sewing", n: "The Sewing Room" }] } },
{ hall: { k: "landing", n: "The Upper Hall" }, spine: { k: "longgallery", n: "The Upper Gallery" }, gallery: { k: "corridor", n: "The Top Corridor" },
r1i: { k: "games", n: "The Games Room" }, r1o: { k: "cinema", n: "The Home Cinema" },
r2i: { k: "gym", n: "The Gymnasium" }, r2o: { k: "sauna", n: "The Sauna and Steam Room" },
r3: { merge: ["r3i", "r3o"], k: "pool", n: "The Swimming Pool" },
c4: { k: "observatory", n: "The Observatory" }, r4i: { k: "changing", n: "The Changing Rooms" }, r4o: { k: "treatment", n: "The Treatment Room" },
l1i: { k: "staffsit", n: "The Staff Sitting Room" }, l1o: { k: "butlerflat", n: "The Butler's Apartment" },
l2i: { split: "across", parts: [{ k: "staffbed", n: "The Cook's Room" }, { k: "staffbed", n: "The Housekeeper's Bedroom" }] },
l2o: { k: "boxroom", n: "The Box Room", doors: [{ s: "n" }] },
l3i: { split: "across", parts: [{ k: "staffbed", n: "The Maids' Room" }, { k: "staffbed", n: "The Footmen's Room" }] },
l3o: { k: "staffkitchen", n: "The Staff Kitchen" },
l4i: { k: "staffbath", n: "The Staff Bathrooms" }, l4o: { k: "studio", n: "The Art Studio" } }
] },
palace: { g: { X: 24, Z: 20, hx: 7, hd: 11, s: 3, g0: -12, g1: -8.5, m: 0, xi: 13.5, x1: 15.5, c: 5, x4: 14.5 }, h: 3.9, levels: 2, stairX: 4, stairZ: 11.5,
floors: ["The state rooms", "The family and guest floor"],
wall: 0xD0C6B2, trim: 0xB0925A,
plan: [
{ hall: { k: "greathall", n: "The Entrance Hall" }, spine: { k: "longgallery", n: "The Gallery" }, gallery: { k: "corridor", n: "The Cross Corridor" },
r1i: { k: "drawing", n: "The Drawing Room" }, r1o: { k: "music", n: "The Music Room" },
r2i: { k: "library", n: "The Library" }, r2o: { k: "office", n: "The Study" },
r3i: { k: "billiards", n: "The Billiard Room", more: [{ s: "n" }] }, r3o: { k: "conservatory", n: "The Conservatory" },
c4: { k: "saloon", n: "The Garden Saloon" }, r4: { merge: ["r4i", "r4o"], k: "ballroom", n: "The Ballroom" },
l1i: { split: "across", at: 0.62, parts: [{ k: "morning", n: "The Morning Room" }, { k: "cloak", n: "The Cloakroom" }] }, l1o: { k: "cards", n: "The Card Room" },
l2i: { k: "dining", n: "The Dining Room" }, l2o: { k: "pantry", n: "The Butler's Pantry" },
l3i: { k: "servants", n: "The Servants' Hall", more: [{ s: "w" }] }, l3o: { k: "kitchen", n: "The Kitchen", more: [{ s: "s" }] },
l4i: { split: "across", parts: [{ k: "scullery", n: "The Scullery" }, { k: "laundry", n: "The Laundry" }] },
l4o: { split: "across", parts: [{ k: "housekeeper", n: "The Housekeeper's Room" }, { k: "wine", n: "The Wine Cellar" }] } },
{ hall: { k: "landing", n: "The Landing" }, spine: { k: "longgallery", n: "The Portrait Gallery" }, gallery: { k: "corridor", n: "The Bedroom Corridor" },
r1i: { k: "principal", n: "The Principal Bedroom" }, r1o: { split: "across", parts: [{ k: "dressing", n: "His Dressing Room" }, { k: "dressing", n: "Her Dressing Room" }] },
r2i: { k: "bathgrand", n: "The Principal Bathroom", doors: [{ s: "s", at: 11 }] }, r2o: { k: "boudoir", n: "The Private Sitting Room", doors: [{ s: "s", at: 19.5 }] },
r3i: { split: "along", at: 0.66, parts: [{ k: "guestbed", n: "The Blue Guest Room", tint: 0x8EA0B8 }, { k: "ensuite", n: "The Blue Room's Bathroom" }] },
r3o: { split: "along", at: 0.62, parts: [{ k: "guestbed", n: "The Rose Guest Room", tint: 0xC09A98 }, { k: "ensuite", n: "The Rose Room's Bathroom" }] },
c4: { k: "familysit", n: "The Family Sitting Room" },
r4i: { split: "along", at: 0.66, parts: [{ k: "guestbed", n: "The Green Guest Room", tint: 0x98A888 }, { k: "ensuite", n: "The Green Room's Bathroom" }] },
r4o: { k: "cinema", n: "The Home Cinema" },
l1i: { k: "nursery", n: "The Nursery" }, l1o: { k: "nanny", n: "The Nanny's Room" },
l2i: { k: "playroom", n: "The Playroom and Schoolroom" }, l2o: { k: "kidsbath", n: "The Children's Bathroom" },
l3i: { k: "childbed", n: "The Little Bedroom", tint: 0xA4B8C8 }, l3o: { k: "childbed", n: "The Children's Bedroom", tint: 0xD0B098 },
l4i: { k: "familybath", n: "The Family Bathroom" },
l4o: { split: "across", parts: [{ k: "linen", n: "The Linen Room" }, { k: "gym", n: "The Gymnasium" }] } }
] },
castle: { g: { X: 22, Z: 20, hx: 7, hd: 11, s: 3, g0: -11, g1: -7.5, m: 0, xi: 12.5, x1: 14.5, c: 5, x4: 13.5 }, h: 4.2, levels: 2, stairX: 4, stairZ: 11.5,
floors: ["The hall floor", "The chambers"],
wall: 0xB8AE9C, trim: 0x6A5038, stone: true,
plan: [
{ hall: { k: "castlehall", n: "The Entrance Hall" }, spine: { k: "armourgallery", n: "The Armour Gallery" }, gallery: { k: "corridor", n: "The Cross Passage" },
r1i: { k: "drawing", n: "The Withdrawing Room" }, r1o: { k: "music", n: "The Minstrels' Room" },
r2i: { k: "library", n: "The Library" }, r2o: { k: "office", n: "The Map Room" },
r3i: { k: "billiards", n: "The Gaming Room", more: [{ s: "n" }] }, r3o: { k: "armoury", n: "The Armoury" },
c4: { k: "chapel", n: "The Chapel" }, r4: { merge: ["r4i", "r4o"], k: "banquet", n: "The Banqueting Hall" },
l1i: { split: "across", at: 0.62, parts: [{ k: "morning", n: "The Solar" }, { k: "cloak", n: "The Cloakroom" }] }, l1o: { k: "cards", n: "The Card Room" },
l2i: { k: "dining", n: "The Lord's Dining Room" }, l2o: { k: "pantry", n: "The Buttery" },
l3i: { k: "servants", n: "The Servants' Hall", more: [{ s: "w" }] }, l3o: { k: "kitchen", n: "The Castle Kitchen", more: [{ s: "s" }] },
l4i: { split: "across", parts: [{ k: "scullery", n: "The Scullery" }, { k: "laundry", n: "The Laundry" }] },
l4o: { split: "across", parts: [{ k: "housekeeper", n: "The Steward's Room" }, { k: "wine", n: "The Cellar" }] } },
{ hall: { k: "landing", n: "The Gallery" }, spine: { k: "longgallery", n: "The Portrait Gallery" }, gallery: { k: "corridor", n: "The Chamber Passage" },
r1i: { k: "principal", n: "The Lord's Chamber" }, r1o: { split: "across", parts: [{ k: "dressing", n: "His Dressing Room" }, { k: "dressing", n: "Her Dressing Room" }] },
r2i: { k: "bathgrand", n: "The Lord's Bathroom", doors: [{ s: "s", at: 10 }] }, r2o: { k: "boudoir", n: "The Lady's Sitting Room", doors: [{ s: "s", at: 18 }] },
r3i: { split: "along", at: 0.66, parts: [{ k: "guestbed", n: "The East Chamber", tint: 0x8E98A8 }, { k: "ensuite", n: "The East Chamber's Bathroom" }] },
r3o: { split: "along", at: 0.62, parts: [{ k: "guestbed", n: "The Tower Chamber", tint: 0xA88A7A }, { k: "ensuite", n: "The Tower Chamber's Bathroom" }] },
c4: { k: "familysit", n: "The Family Sitting Room" },
r4i: { split: "along", at: 0.66, parts: [{ k: "guestbed", n: "The West Chamber", tint: 0x8A9A80 }, { k: "ensuite", n: "The West Chamber's Bathroom" }] },
r4o: { k: "cinema", n: "The Home Cinema" },
l1i: { k: "nursery", n: "The Nursery" }, l1o: { k: "nanny", n: "The Nurse's Room" },
l2i: { k: "playroom", n: "The Schoolroom" }, l2o: { k: "kidsbath", n: "The Children's Bathroom" },
l3i: { k: "childbed", n: "The Little Chamber", tint: 0xA4B0C0 }, l3o: { k: "childbed", n: "The Children's Chamber", tint: 0xC8A890 },
l4i: { k: "familybath", n: "The Family Bathroom" },
l4o: { split: "across", parts: [{ k: "linen", n: "The Linen Room" }, { k: "gym", n: "The Gymnasium" }] } }
] }
};
function esRooms(T, L) { return __ZC(318, 2, this, arguments, new.target); }
(function () {
if (typeof planOf !== "function" || typeof makeInterior !== "function")
return;
var po = planOf;
planOf = function (spec) {
try {
var k = esKind(spec);
if (k) {
var T = ES_HOUSES[k], I = spec.inside || {};
return { mode: "estate", estate: T, kind: k, h: T.h, wall: I.wall !== undefined ? I.wall : T.wall, floor: I.floor || (T.stone ? "stone" : "marble") };
}
}
catch (e) {
if (window.console)
console.warn("[estates] plan", e);
}
return po.apply(this, arguments);
};
if (typeof levelsOf === "function") {
var lo = levelsOf;
levelsOf = function (spec) { try {
var k = esKind(spec);
if (k)
return ES_HOUSES[k].levels;
}
catch (e) { } return lo.apply(this, arguments); };
}
})();
"use strict";
var ES_MAT = {}, ES_TEX = {};
function esCanvas(key, size, tile, fn) { return __ZC(318, 3, this, arguments, new.target); }
var ES_PAT = {
damask: function () { return __ZC(318, 4, this, arguments, new.target); },
stripe: function () {
return esCanvas("stripe", 128, 0.9, function (x, W, H) {
x.fillStyle = "#E2DED6";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(140,132,120,.22)";
for (var i = 0; i < 4; i++) {
x.fillRect(i * 32, 0, 12, H);
x.fillRect(i * 32 + 16, 0, 2, H);
}
});
},
coffer: function () { return __ZC(318, 5, this, arguments, new.target); },
carpet: function () { return __ZC(318, 6, this, arguments, new.target); },
rubber: function () {
return esCanvas("rubber", 128, 1, function (x, W, H) {
x.fillStyle = "#C8C8C8";
x.fillRect(0, 0, W, H);
var R = typeof rng === "function" ? rng(91) : Math.random;
for (var i = 0; i < 900; i++) {
var v = 150 + ((R() * 90) | 0);
x.fillStyle = "rgb(" + v + "," + v + "," + v + ")";
x.fillRect(R() * W, R() * H, 1.5, 1.5);
}
});
},
checker: function () {
return esCanvas("checker", 128, 1.2, function (x, W, H) {
x.fillStyle = "#E0DDD6";
x.fillRect(0, 0, W, H);
x.fillStyle = "#5A5650";
x.fillRect(0, 0, W / 2, H / 2);
x.fillRect(W / 2, H / 2, W / 2, H / 2);
x.strokeStyle = "rgba(60,56,50,.3)";
x.strokeRect(0, 0, W, H);
});
},
herring: function () { return __ZC(318, 7, this, arguments, new.target); }
};
function esMat(col, surf, o) { return __ZC(318, 8, this, arguments, new.target); }
function esUV(g, uW, vH) {
var uv = g.attributes.uv;
if (!uv)
return g;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * uW, uv.getY(i) * vH);
uv.needsUpdate = true;
return g;
}
function esQuad(G, mat, w, h, x, y, z, ry, rx) {
var g = esUV(new THREE.PlaneGeometry(w, h), w, h), m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
m.rotation.set(rx || 0, ry || 0, 0, "YXZ");
G.add(m);
return m;
}
function esBox(G, mat, w, h, d, x, y, z) {
var g = new THREE.BoxGeometry(w, h, d), m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
G.add(m);
return m;
}
var ES_FINISH = {
greathall: { f: "checker", fc: 0xCFC8BC, w: 0xCEC4B0, p: "stone", t: 0xA88A52, c: "coffer" },
castlehall: { f: "stone", fc: 0xA8A096, w: 0xA8A092, p: "stone", t: 0x5A4430 },
landing: { f: "carpet", fc: 0x7A3A40, w: 0xC8BCA6, p: "damask", t: 0xA88A52, c: "coffer" },
longgallery: { f: "herring", fc: 0xC8A882, w: 0xB8A88E, p: "damask", t: 0xA88A52 },
armourgallery: { f: "stone", fc: 0xA49C92, w: 0xA49C90, p: "stone", t: 0x5A4430 },
corridor: { f: "marble", fc: 0xD4CEC4, w: 0xC8BEAA, p: "plaster", t: 0xA88A52 },
drawing: { f: "herring", fc: 0xC8A882, w: 0x9AAA8E, p: "damask", t: 0xB0925A, c: "coffer" },
music: { f: "herring", fc: 0xC8A882, w: 0x98AABC, p: "stripe", t: 0xB0925A, c: "coffer" },
library: { f: "wood", fc: 0x9A7A5A, w: 0x4A5E4C, p: "damask", t: 0x5A3E28 },
office: { f: "wood", fc: 0x9A7A5A, w: 0x7E4A40, p: "stripe", t: 0x5A3E28 },
billiards: { f: "wood", fc: 0x8A6A4A, w: 0x3E5444, p: "damask", t: 0x5A3E28 },
conservatory: { f: "checker", fc: 0xD0CCC0, w: 0xC4CCB4, p: "plaster", t: 0xC8C4B4 },
saloon: { f: "herring", fc: 0xC8A882, w: 0xC8B47E, p: "damask", t: 0xB0925A, c: "coffer" },
ballroom: { f: "herring", fc: 0xD0B088, w: 0xD0C4A2, p: "damask", t: 0xB8985A, c: "coffer" },
banquet: { f: "stone", fc: 0xA8A096, w: 0xA49A88, p: "stone", t: 0x5A4430 },
chapel: { f: "stone", fc: 0xB0A89C, w: 0xB8AE9A, p: "stone", t: 0x6A5038 },
armoury: { f: "stone", fc: 0xA49C92, w: 0x9E968A, p: "stone", t: 0x4A3828 },
morning: { f: "wood", fc: 0xB89A78, w: 0xD0BE8C, p: "stripe", t: 0xC8B890 },
cloak: { f: "marble", fc: 0xD0CCC4, w: 0x8E9CA8, p: "stripe", t: 0xC8C0B0 },
cards: { f: "herring", fc: 0xC0A07C, w: 0x74343E, p: "damask", t: 0xB0925A },
dining: { f: "herring", fc: 0xC0A07C, w: 0x84343A, p: "damask", t: 0xB0925A, c: "coffer" },
pantry: { f: "tile", fc: 0xC8C8C0, w: 0xB8C2B2, p: "plaster", t: 0x8A8A80 },
kitchen: { f: "tile", fc: 0xC8C4BC, w: 0xD0C8B2, p: "tile", t: 0x8A8A80 },
servants: { f: "stone", fc: 0xB4ACA0, w: 0xC8C0A8, p: "plaster", t: 0x7A6A50 },
scullery: { f: "tile", fc: 0xC0C4C0, w: 0xC4CCC8, p: "tile", t: 0x8A8A80 },
laundry: { f: "tile", fc: 0xC0C4C0, w: 0xBCC8D0, p: "tile", t: 0x8A8A80 },
housekeeper: { f: "wood", fc: 0xA88A68, w: 0xB8A888, p: "stripe", t: 0x6A5038 },
wine: { f: "stone", fc: 0x8E8478, w: 0x8E8272, p: "stone", t: 0x4A3828 },
principal: { f: "carpet", fc: 0x8A7A86, w: 0xC4A2A0, p: "damask", t: 0xB0925A, c: "coffer" },
dressing: { f: "carpet", fc: 0x9A8C84, w: 0xC8B8A6, p: "stripe", t: 0xB0925A },
bathgrand: { f: "marble", fc: 0xD8D2C8, w: 0xD0CAC0, p: "marble", t: 0xB0925A },
boudoir: { f: "carpet", fc: 0x8A7E90, w: 0xAA9CB6, p: "damask", t: 0xB0925A },
guestbed: { f: "carpet", fc: 0x8A8278, w: 0xB0A890, p: "damask", t: 0xB0925A },
ensuite: { f: "marble", fc: 0xD4D0C8, w: 0xCCC8C0, p: "marble", t: 0xA8A090 },
familysit: { f: "carpet", fc: 0x7E7462, w: 0xB4AA90, p: "stripe", t: 0xA88A52 },
nursery: { f: "carpet", fc: 0xB0B8A8, w: 0xB4C8B4, p: "stripe", t: 0xD0CCC0 },
nanny: { f: "carpet", fc: 0x9A9488, w: 0xBCB4A4, p: "plaster", t: 0xC0B8A8 },
playroom: { f: "wood", fc: 0xB89A78, w: 0xC8BC94, p: "plaster", t: 0xC0B8A8 },
kidsbath: { f: "tile", fc: 0xC4CCD0, w: 0xB8CCD4, p: "tile", t: 0xC0C4C4 },
childbed: { f: "carpet", fc: 0x9A9C98, w: 0xA4B8C8, p: "stripe", t: 0xD0CCC0 },
familybath: { f: "marble", fc: 0xD4D0C8, w: 0xC0C8C4, p: "tile", t: 0xA8A090 },
linen: { f: "wood", fc: 0xA88A68, w: 0xC8C4B8, p: "plaster", t: 0xA89A80 },
sewing: { f: "wood", fc: 0xA88A68, w: 0xC0A8B0, p: "stripe", t: 0xA89A80 },
games: { f: "carpet", fc: 0x4A4E66, w: 0x3E4A64, p: "stripe", t: 0xA88A52 },
cinema: { f: "carpet", fc: 0x4A2228, w: 0x4E2228, p: "plaster", t: 0x8A6A3A },
gym: { f: "rubber", fc: 0x4A4C4E, w: 0xA8AAA8, p: "plaster", t: 0x6A6C6E },
sauna: { f: "wood", fc: 0xB08A60, w: 0xB89468, p: "wood", t: 0x8A6A44 },
pool: { f: "tile", fc: 0xB8C4C4, w: 0x9CB8BC, p: "tile", t: 0xB8C0C0 },
observatory: { f: "wood", fc: 0x7A5E44, w: 0x2E3450, p: "plaster", t: 0xA88A52 },
changing: { f: "tile", fc: 0xC0C4C0, w: 0xC0CCCC, p: "tile", t: 0x8A8A80 },
treatment: { f: "wood", fc: 0xB89A78, w: 0xC4B8A8, p: "plaster", t: 0xC0B4A0 },
staffsit: { f: "wood", fc: 0xA88A68, w: 0xB8B09A, p: "plaster", t: 0x8A7A60 },
butlerflat: { f: "carpet", fc: 0x6E6A60, w: 0xA89A80, p: "stripe", t: 0x8A7A60 },
staffbed: { f: "wood", fc: 0xA88A68, w: 0xC0B8A4, p: "plaster", t: 0x8A7A60 },
staffkitchen: { f: "tile", fc: 0xC4C4BC, w: 0xCCC6B4, p: "tile", t: 0x8A8A80 },
boxroom: { f: "wood", fc: 0x9A7E60, w: 0xA89C88, p: "plaster", t: 0x7A6A50 },
staffbath: { f: "tile", fc: 0xC4C8C8, w: 0xC4CCCC, p: "tile", t: 0x8A8A80 },
studio: { f: "wood", fc: 0xB0947A, w: 0xC8C2B4, p: "plaster", t: 0x8A7A60 }
};
var ES_FLOORSURF = { marble: "marble", parquet: "wood", herring: "herring", wood: "wood", tile: "floortile", checker: "checker", stone: "stone", carpet: "carpet", rubber: "rubber" };
function esFin(r, T) { return __ZC(318, 9, this, arguments, new.target); }
function esLines(list, X, Z) { return __ZC(318, 10, this, arguments, new.target); }
function esDoorways(list) { return __ZC(318, 11, this, arguments, new.target); }
function esCovered(lines, o, c, a, b) {
var e = (o === "h" ? lines.h : lines.v)[c.toFixed(2)], out = [];
if (!e)
return out;
e.iv.forEach(function (v) { var s = Math.max(a, v[0]), t = Math.min(b, v[1]); if (t - s > 0.05)
out.push([s, t]); });
return out;
}
function estateBuild(A) { return __ZC(318, 12, this, arguments, new.target); }
function esFinish(G, r, y0, H, lines, ways, T, up, down) { return __ZC(318, 13, this, arguments, new.target); }
function esWindows(A, r, X, Z, y0, L) { return __ZC(318, 14, this, arguments, new.target); }
function esLightsFor(A, r, y0) {
var w = r.x1 - r.x0, d = r.z1 - r.z0, nx = Math.max(1, Math.round(w / 7)), nz = Math.max(1, Math.round(d / 7));
for (var i = 0; i < nx; i++)
for (var j = 0; j < nz; j++)
A.lights.push({ x: r.x0 + w * (i + 0.5) / nx, z: r.z0 + d * (j + 0.5) / nz, y: y0 });
}
"use strict";
(function () {
if (typeof FURN === "undefined")
return;
var M = function (c, s, o) { return esMat(c, s, o); };
function G() { return new THREE.Group(); }
function B(g, mat, w, h, d, x, y, z, ry) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; g.add(m); return m; }
function C(g, mat, rt, rb, h, x, y, z, seg) { var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 10), mat); m.position.set(x, y, z); g.add(m); return m; }
function S(g, mat, r, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || 10, Math.max(6, (seg || 10) - 2)), mat); m.position.set(x, y, z); g.add(m); return m; }
var MAH = function () { return M(0x6A3A28, "wood"); }, OAK = function () { return M(0xA07A54, "wood"); }, GILT = function () { return M(0xB8985A, null, { e: 0x1A1206 }); }, BRASS = function () { return M(0xB0904A, null, { e: 0x140E04 }); }, CHROME = function () { return M(0xB4B8BC); }, DARK = function () { return M(0x2A2A2E); }, FELT = function () { return M(0x2E6A44); }, CLOTH = function () { return M(0xD8D2C6); }, STONE = function () { return M(0xD0CAC0, "marble"); };
var P = {};
P.esbilliard = function () {
var g = G(), w = MAH(), f = FELT();
B(g, w, 2.74, 0.22, 1.52, 0, 0.68, 0);
B(g, f, 2.5, 0.04, 1.28, 0, 0.8, 0);
B(g, w, 2.74, 0.1, 0.13, 0, 0.83, 0.7);
B(g, w, 2.74, 0.1, 0.13, 0, 0.83, -0.7);
B(g, w, 0.13, 0.1, 1.52, 1.31, 0.83, 0);
B(g, w, 0.13, 0.1, 1.52, -1.31, 0.83, 0);
[[-1.2, -0.62], [1.2, -0.62], [-1.2, 0.62], [1.2, 0.62], [0, -0.62], [0, 0.62]].forEach(function (p) { C(g, DARK(), 0.07, 0.07, 0.03, p[0], 0.82, p[1], 8); });
[[-1.2, -0.6], [1.2, -0.6], [-1.2, 0.6], [1.2, 0.6], [0, -0.6], [0, 0.6]].forEach(function (p) { C(g, w, 0.08, 0.06, 0.58, p[0], 0.29, p[1], 8); });
var cols = [0xC8B060, 0x3A5A9A, 0xA83A3A, 0x5A3A7A, 0xC87A3A, 0x3A7A4A, 0x7A2A2A, 0x2A2A2A, 0xD8D2C6];
cols.forEach(function (c, i) { S(g, M(c), 0.028, -0.6 + (i % 3) * 0.06 + (i > 5 ? 0.9 : 0), 0.85, -0.05 + Math.floor(i / 3) * 0.055, 8); });
C(g, MAH(), 0.008, 0.012, 1.45, 0.3, 0.84, 0.45, 6).rotation.z = Math.PI / 2;
return g;
};
P.escardtable = function () {
var g = G();
C(g, FELT(), 0.62, 0.62, 0.04, 0, 0.74, 0, 20);
C(g, MAH(), 0.64, 0.64, 0.05, 0, 0.7, 0, 20);
C(g, MAH(), 0.06, 0.08, 0.66, 0, 0.35, 0, 8);
C(g, MAH(), 0.32, 0.36, 0.05, 0, 0.03, 0, 12);
for (var i = 0; i < 4; i++) {
var a = i * Math.PI / 2 + 0.4;
B(g, CLOTH(), 0.06, 0.005, 0.09, Math.cos(a) * 0.35, 0.765, Math.sin(a) * 0.35, a);
}
[0x7A2A2A, 0x2A3A6A, 0xC8B060].forEach(function (c, i) { C(g, M(c), 0.02, 0.02, 0.04 + i * 0.01, 0.1 - i * 0.05, 0.78, -0.05, 8); });
return g;
};
P.eschess = function () {
var g = G(), t = MAH();
B(g, t, 0.7, 0.05, 0.7, 0, 0.72, 0);
C(g, t, 0.05, 0.06, 0.68, 0, 0.36, 0, 8);
C(g, t, 0.25, 0.28, 0.04, 0, 0.02, 0, 10);
var sq = M(0xD8D2C6), dk = M(0x3A2A20);
for (var i = 0; i < 8; i++)
for (var j = 0; j < 8; j++) {
if ((i + j) % 2)
B(g, dk, 0.06, 0.004, 0.06, -0.21 + i * 0.06, 0.747, -0.21 + j * 0.06);
}
B(g, sq, 0.5, 0.002, 0.5, 0, 0.746, 0);
for (var k = 0; k < 8; k++) {
C(g, sq, 0.012, 0.016, 0.05, -0.21 + k * 0.06, 0.775, -0.15, 6);
C(g, dk, 0.012, 0.016, 0.05, -0.21 + k * 0.06, 0.775, 0.15, 6);
}
return g;
};
P.eswinerack = function () {
var g = G(), w = OAK(), gl = M(0x2A4A30), lb = M(0xC8B890);
B(g, w, 1.3, 2.1, 0.05, 0, 1.05, -0.2);
B(g, w, 0.05, 2.1, 0.42, -0.63, 1.05, 0);
B(g, w, 0.05, 2.1, 0.42, 0.63, 1.05, 0);
B(g, w, 1.3, 0.05, 0.42, 0, 2.08, 0);
B(g, w, 1.3, 0.05, 0.42, 0, 0.03, 0);
for (var r = 0; r < 6; r++) {
B(g, w, 1.22, 0.03, 0.4, 0, 0.32 + r * 0.32, 0);
for (var c = 0; c < 7; c++) {
var b = C(g, gl, 0.04, 0.04, 0.36, -0.5 + c * 0.165, 0.4 + r * 0.32, 0, 8);
b.rotation.x = Math.PI / 2;
if (!esLite())
C(g, lb, 0.042, 0.042, 0.01, -0.5 + c * 0.165, 0.4 + r * 0.32, 0.17, 8).rotation.x = Math.PI / 2;
}
}
return g;
};
P.estelescope = function () {
var g = G(), br = BRASS(), w = MAH();
for (var i = 0; i < 3; i++) {
var a = i * Math.PI * 2 / 3, l = C(g, w, 0.02, 0.025, 1.3, Math.cos(a) * 0.28, 0.62, Math.sin(a) * 0.28, 6);
l.rotation.z = Math.cos(a) * 0.4;
l.rotation.x = -Math.sin(a) * 0.4;
}
var t = C(g, br, 0.09, 0.12, 1.5, 0, 1.42, 0.1, 12);
t.rotation.x = -0.9;
C(g, DARK(), 0.1, 0.1, 0.02, 0, 1.88, -0.47, 12).rotation.x = -0.9;
return g;
};
P.esglobe = function () {
var g = G(), w = MAH(), br = BRASS();
C(g, w, 0.25, 0.3, 0.06, 0, 0.03, 0, 10);
C(g, w, 0.04, 0.05, 0.6, 0, 0.33, 0, 8);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 6, 24), br);
ring.position.set(0, 0.98, 0);
ring.rotation.y = Math.PI / 2;
g.add(ring);
var gm = M(0x8AA8B4, null);
var tex = esCanvas("globe", 128, 1, function (x, W, H) {
x.fillStyle = "#7A9AAA";
x.fillRect(0, 0, W, H);
x.fillStyle = "#B0A878";
var R = typeof rng === "function" ? rng(33) : Math.random;
for (var i = 0; i < 14; i++) {
x.beginPath();
x.ellipse(R() * W, H * 0.2 + R() * H * 0.6, 8 + R() * 18, 5 + R() * 12, R() * 3, 0, 7);
x.fill();
}
});
var sm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: tex });
if (tex)
tex.repeat.set(1, 1);
S(g, tex ? sm : gm, 0.32, 0, 0.98, 0, 16);
return g;
};
P.esweights = function () {
var g = G(), f = DARK(), c = CHROME();
B(g, f, 1.4, 0.06, 0.45, 0, 0.45, 0);
B(g, f, 1.4, 0.06, 0.45, 0, 0.85, 0);
[-0.65, 0.65].forEach(function (x) { B(g, f, 0.06, 0.9, 0.45, x, 0.45, 0); });
for (var i = 0; i < 6; i++) {
var x = -0.5 + i * 0.2, s = 0.05 + i * 0.008;
[0.5, 0.9].forEach(function (y) { var h = C(g, c, 0.018, 0.018, 0.28, x, y + s, 0, 6); h.rotation.x = Math.PI / 2; C(g, f, s, s, 0.05, x, y + s, -0.12, 10).rotation.x = Math.PI / 2; C(g, f, s, s, 0.05, x, y + s, 0.12, 10).rotation.x = Math.PI / 2; });
}
return g;
};
P.esbike = function () {
var g = G(), f = DARK(), c = CHROME();
B(g, f, 0.5, 0.06, 1.1, 0, 0.03, 0);
B(g, f, 0.08, 0.8, 0.08, 0, 0.45, -0.25).rotation.x = 0.15;
B(g, M(0x3A3A3E), 0.26, 0.06, 0.3, 0, 0.88, -0.3);
B(g, f, 0.08, 1.0, 0.08, 0, 0.55, 0.35).rotation.x = -0.2;
B(g, c, 0.5, 0.04, 0.04, 0, 1.08, 0.45);
var wh = C(g, M(0x5A5A60), 0.24, 0.24, 0.06, 0, 0.3, 0.25, 16);
wh.rotation.z = Math.PI / 2;
B(g, M(0x3A4A5A), 0.2, 0.12, 0.02, 0, 1.15, 0.48).rotation.x = -0.5;
return g;
};
P.esmassage = function () {
var g = G(), w = OAK(), pad = M(0xC8BCA8), tw = CLOTH();
B(g, pad, 0.72, 0.12, 1.9, 0, 0.74, 0);
B(g, tw, 0.6, 0.02, 1.2, 0, 0.81, 0.2);
[[-0.3, -0.85], [0.3, -0.85], [-0.3, 0.85], [0.3, 0.85]].forEach(function (p) { B(g, w, 0.06, 0.68, 0.06, p[0], 0.34, p[1]); });
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.04, 6, 14), pad);
ring.position.set(0, 0.78, -1.05);
ring.rotation.x = Math.PI / 2;
g.add(ring);
return g;
};
P.essauna = function () {
var g = G(), w = M(0xC09A6A, "wood");
B(g, w, 3.2, 0.08, 0.55, 0, 0.42, 0.55);
B(g, w, 3.2, 0.08, 0.55, 0, 0.84, 0);
B(g, w, 3.2, 0.08, 0.55, 0, 1.26, -0.55);
B(g, w, 3.2, 0.42, 0.05, 0, 0.21, 0.8);
B(g, w, 3.2, 0.84, 0.05, 0, 0.42, 0.28);
B(g, w, 3.2, 1.26, 0.05, 0, 0.63, -0.27);
return g;
};
P.essaunastove = function () {
var g = G(), m = M(0x3A3A3E), st = M(0x6E6A66);
B(g, m, 0.6, 0.7, 0.5, 0, 0.35, 0);
for (var i = 0; i < 12; i++)
S(g, st, 0.07, -0.2 + (i % 4) * 0.13, 0.75 + Math.floor(i / 4) * 0.05, -0.15 + Math.floor(i / 4) * 0.13, 6);
var rail = OAK();
B(g, rail, 0.9, 0.9, 0.04, 0, 0.45, 0.42);
return g;
};
P.esshower = function () {
var g = G(), gl = M(0xC8D8DC, null, { op: 0.28 }), c = CHROME(), tray = M(0xD8D4CC, "marble");
B(g, tray, 1.0, 0.06, 1.0, 0, 0.03, 0);
B(g, gl, 1.0, 2.1, 0.02, 0, 1.1, 0.5);
B(g, gl, 0.02, 2.1, 1.0, 0.5, 1.1, 0);
B(g, M(0xD0CCC4, "floortile"), 1.0, 2.2, 0.04, 0, 1.1, -0.5);
C(g, c, 0.015, 0.015, 1.9, -0.35, 1.1, -0.45, 6);
C(g, c, 0.12, 0.12, 0.02, -0.35, 2.06, -0.35, 12);
B(g, c, 0.02, 0.02, 0.12, -0.35, 2.06, -0.4);
return g;
};
P.esarcade = function (cs) {
var g = G(), body = M(cs || 0x2A2E4A), scr = M(0x2A3A4A, null, { e: 0x10202C }), mq = M(0x6A4A8A, null, { e: 0x1A1028 });
B(g, body, 0.7, 1.8, 0.75, 0, 0.9, 0);
B(g, scr, 0.52, 0.42, 0.02, 0, 1.42, 0.3).rotation.x = -0.25;
B(g, mq, 0.66, 0.18, 0.04, 0, 1.86, 0.34);
B(g, M(0x1A1A1E), 0.66, 0.08, 0.3, 0, 1.04, 0.42);
S(g, M(0xA83A3A), 0.03, -0.15, 1.1, 0.45, 8);
S(g, M(0x3A6AA8), 0.025, 0.05, 1.1, 0.45, 8);
S(g, M(0xC8B060), 0.025, 0.15, 1.1, 0.45, 8);
return g;
};
P.esfoos = function () {
var g = G(), w = OAK(), f = FELT(), c = CHROME();
B(g, w, 1.2, 0.25, 0.75, 0, 0.8, 0);
B(g, f, 1.1, 0.02, 0.65, 0, 0.92, 0);
[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].forEach(function (p) { B(g, w, 0.08, 0.7, 0.08, p[0], 0.35, p[1]); });
for (var i = 0; i < 8; i++) {
var x = -0.48 + i * 0.137, r = C(g, c, 0.012, 0.012, 1.1, x, 0.98, 0, 6);
r.rotation.x = Math.PI / 2;
S(g, M(i % 2 ? 0xA83A3A : 0x3A5A9A), 0.03, x, 0.96, 0, 6);
}
return g;
};
P.esscreen = function () {
var g = G(), fr = DARK(), sc = M(0xB4B2AC, null, { e: 0x262624 }), cu = M(0x5A1A22);
B(g, fr, 5.4, 3.1, 0.08, 0, 2.15, 0);
B(g, sc, 5.1, 2.8, 0.02, 0, 2.15, 0.05);
B(g, M(0x3A2A20, "wood"), 5.6, 0.5, 0.6, 0, 0.25, 0.2);
B(g, cu, 0.6, 3.6, 0.12, -3.0, 1.9, 0.1);
B(g, cu, 0.6, 3.6, 0.12, 3.0, 1.9, 0.1);
B(g, cu, 6.6, 0.4, 0.14, 0, 3.85, 0.1);
return g;
};
var SPINES = null;
function spines() {
if (SPINES)
return SPINES;
var c = document.createElement("canvas");
c.width = 256;
c.height = 64;
var x = c.getContext("2d");
x.fillStyle = "#2A1A12";
x.fillRect(0, 0, 256, 64);
var cols = ["#6A2A22", "#2F4A6E", "#3F5A3A", "#8A6A2A", "#5E3A5E", "#7A4A2A", "#2A3A4A", "#6A5A3A", "#4A2A2A", "#3A4A3A"], px = 0, i = 0;
while (px < 256) {
var w = 6 + ((i * 37) % 9), h = 40 + ((i * 53) % 22);
x.fillStyle = cols[(i * 7) % cols.length];
x.fillRect(px, 64 - h, w - 1, h);
x.fillStyle = "rgba(200,170,90,.55)";
x.fillRect(px + 1, 64 - h + 6, w - 3, 2);
x.fillRect(px + 1, 64 - 12, w - 3, 2);
px += w;
i++;
}
SPINES = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace)
SPINES.colorSpace = THREE.SRGBColorSpace;
return SPINES;
}
P.esbookcase = function () {
var g = G(), w = MAH(), bk = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: spines() });
bk.userData.wsfSkip = 1;
bk.userData.bwSurf = 1;
B(g, w, 1.6, 2.5, 0.04, 0, 1.25, -0.2);
B(g, w, 0.06, 2.5, 0.42, -0.77, 1.25, 0);
B(g, w, 0.06, 2.5, 0.42, 0.77, 1.25, 0);
B(g, w, 1.6, 0.12, 0.44, 0, 0.06, 0.01);
B(g, w, 1.72, 0.1, 0.48, 0, 2.55, 0.02);
B(g, GILT(), 1.72, 0.03, 0.49, 0, 2.49, 0.02);
for (var r = 0; r < 5; r++) {
var y = 0.14 + r * 0.47;
B(g, w, 1.48, 0.03, 0.4, 0, y, 0);
B(g, bk, 1.46, 0.36, 0.28, 0, y + 0.195, -0.04);
}
return g;
};
P.esironing = function () {
var g = G(), c = CHROME(), cl = M(0xA8B8C8);
B(g, cl, 1.3, 0.04, 0.38, 0, 0.88, 0);
[-1, 1].forEach(function (s) { var l = B(g, c, 0.03, 1.0, 0.03, s * 0.25, 0.45, 0); l.rotation.z = s * 0.35; });
B(g, M(0x3A3A3E), 0.24, 0.1, 0.12, 0.4, 0.95, 0);
return g;
};
P.essewing = function () {
var g = G(), w = OAK(), m = M(0xD0CCC4), d = DARK();
B(g, w, 1.2, 0.05, 0.6, 0, 0.75, 0);
[[-0.55, -0.25], [0.55, -0.25], [-0.55, 0.25], [0.55, 0.25]].forEach(function (p) { B(g, w, 0.05, 0.73, 0.05, p[0], 0.37, p[1]); });
B(g, m, 0.42, 0.1, 0.2, 0, 0.83, 0);
B(g, m, 0.08, 0.26, 0.18, -0.17, 0.98, 0);
B(g, m, 0.42, 0.08, 0.18, 0, 1.1, 0);
B(g, d, 0.04, 0.12, 0.04, 0.15, 0.98, 0.02);
C(g, M(0x8A3A5A), 0.03, 0.03, 0.05, 0.4, 0.8, 0.1, 8);
C(g, M(0x3A6A8A), 0.03, 0.03, 0.05, 0.48, 0.8, 0.1, 8);
return g;
};
P.esbust = function () {
var g = G(), st = STONE(), w = M(0xCFC8BC);
B(g, st, 0.5, 1.1, 0.5, 0, 0.55, 0);
B(g, st, 0.58, 0.06, 0.58, 0, 1.13, 0);
B(g, st, 0.58, 0.06, 0.58, 0, 0.03, 0);
S(g, w, 0.15, 0, 1.62, 0, 12);
var sh = S(g, w, 0.22, 0, 1.3, 0, 12);
sh.scale.set(1.2, 0.6, 0.7);
C(g, w, 0.07, 0.08, 0.12, 0, 1.44, 0, 8);
return g;
};
P.esconsole = function () {
var g = G(), gl = GILT(), top = M(0xD4CEC4, "marble");
B(g, top, 1.5, 0.05, 0.42, 0, 0.86, 0);
B(g, gl, 1.44, 0.12, 0.38, 0, 0.78, 0);
[[-0.66, -0.15], [0.66, -0.15], [-0.66, 0.15], [0.66, 0.15]].forEach(function (p) { C(g, gl, 0.03, 0.02, 0.72, p[0], 0.36, p[1], 6); });
C(g, M(0x3A5A8A), 0.08, 0.12, 0.32, 0.4, 1.05, 0, 10);
S(g, M(0xC87A8A), 0.13, 0.4, 1.3, 0, 8);
S(g, M(0x5A7A4A), 0.1, 0.48, 1.26, 0.04, 6);
return g;
};
P.esbellboard = function () {
var g = G(), w = MAH(), br = BRASS(), lab = CLOTH();
B(g, w, 1.6, 0.9, 0.06, 0, 1.9, 0);
for (var r = 0; r < 3; r++)
for (var c = 0; c < 6; c++) {
S(g, br, 0.035, -0.62 + c * 0.25, 1.66 + r * 0.26, 0.06, 8);
B(g, lab, 0.16, 0.04, 0.01, -0.62 + c * 0.25, 1.72 + r * 0.26, 0.04);
}
return g;
};
P.esisland = function () {
var g = G(), b = M(0x8A9A8A, "wood"), top = M(0xD8D2C8, "marble");
B(g, b, 2.6, 0.88, 1.1, 0, 0.44, 0);
B(g, top, 2.8, 0.06, 1.25, 0, 0.91, 0);
C(g, M(0xA06A3A), 0.12, 0.1, 0.12, -0.6, 1.0, 0, 10);
S(g, M(0xC8A040), 0.06, 0.5, 0.98, 0.1, 8);
S(g, M(0x7AA040), 0.06, 0.62, 0.98, -0.05, 8);
S(g, M(0xB04030), 0.06, 0.42, 0.98, -0.12, 8);
return g;
};
P.escuerack = function () {
var g = G(), w = MAH();
B(g, w, 1.0, 1.4, 0.05, 0, 1.2, 0);
B(g, w, 1.0, 0.08, 0.14, 0, 0.6, 0.05);
for (var i = 0; i < 6; i++)
C(g, M(0xB89A70), 0.012, 0.008, 1.45, -0.38 + i * 0.15, 1.3, 0.06, 6);
return g;
};
P.esdollhouse = function () {
var g = G(), w = OAK(), h = M(0xD8C8B0), rf = M(0x8A4A3A);
B(g, w, 1.1, 0.7, 0.5, 0, 0.35, 0);
B(g, h, 0.9, 0.7, 0.4, 0, 1.05, 0);
var r = B(g, rf, 0.5, 0.5, 0.42, 0, 1.55, 0);
r.rotation.z = Math.PI / 4;
r.scale.set(1.3, 1.3, 1);
for (var i = 0; i < 4; i++)
B(g, M(0x9AB0C0), 0.14, 0.14, 0.01, -0.3 + i * 0.2, 1.1, 0.205);
return g;
};
P.espalm = function () {
var g = G(), pot = M(0x8A5A3A, "stone"), tr = M(0x7A5A3A), lf = M(0x4A7A44, null, { side: 1 });
C(g, pot, 0.32, 0.26, 0.55, 0, 0.28, 0, 12);
C(g, tr, 0.06, 0.09, 1.9, 0, 1.4, 0, 8);
for (var i = 0; i < 8; i++) {
var a = i * Math.PI / 4, f = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 1.2), lf);
f.position.set(Math.cos(a) * 0.45, 2.25, Math.sin(a) * 0.45);
f.rotation.set(0, -a + Math.PI / 2, 0, "YXZ");
f.rotateX(-1.0);
g.add(f);
}
return g;
};
P.esbar = function () {
var g = G(), w = MAH(), top = M(0xD4CEC4, "marble"), gl = M(0x8AA090, null, { op: 0.75 }), am = M(0xA87A3A, null, { op: 0.8 });
B(g, w, 2.4, 1.05, 0.6, 0, 0.52, 0.6);
B(g, top, 2.5, 0.05, 0.7, 0, 1.07, 0.6);
B(g, w, 2.4, 2.2, 0.3, 0, 1.1, -0.35);
for (var s = 0; s < 3; s++) {
B(g, M(0x5A3A28, "wood"), 2.3, 0.03, 0.28, 0, 1.2 + s * 0.4, -0.2);
for (var i = 0; i < 9; i++)
C(g, i % 2 ? gl : am, 0.035, 0.035, 0.28, -1.0 + i * 0.25, 1.36 + s * 0.4, -0.22, 8);
}
return g;
};
P.eslounger = function () {
var g = G(), f = M(0xD8D2C6), w = OAK();
B(g, w, 0.7, 0.3, 1.9, 0, 0.15, 0);
B(g, f, 0.66, 0.1, 1.3, 0, 0.35, 0.25);
var b = B(g, f, 0.66, 0.1, 0.7, 0, 0.55, -0.55);
b.rotation.x = 0.7;
return g;
};
P.esharp = function () {
var g = G(), gl = GILT();
B(g, gl, 0.3, 0.12, 0.5, 0, 0.06, 0);
B(g, gl, 0.1, 1.7, 0.1, 0, 0.9, -0.18);
var neck = B(g, gl, 0.08, 0.08, 0.75, 0, 1.72, 0.15);
neck.rotation.x = 0.3;
B(g, gl, 0.06, 1.5, 0.06, 0, 0.85, 0.32).rotation.x = -0.12;
for (var i = 0; i < 9; i++) {
var s = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 1.2 + i * 0.03, 4), M(0xD8D2C6));
s.position.set(0, 0.95, -0.12 + i * 0.05);
g.add(s);
}
return g;
};
P.esstand = function () { var g = G(), b = DARK(); C(g, b, 0.012, 0.012, 1.1, 0, 0.6, 0, 6); C(g, b, 0.2, 0.22, 0.03, 0, 0.02, 0, 8); var s = B(g, b, 0.45, 0.32, 0.02, 0, 1.22, 0.04); s.rotation.x = -0.4; return g; };
P.esreading = function () {
var g = G(), w = MAH(), lm = M(0x2E5A3A), lt = M(0xE8D8A8, null, { e: 0x3A2A10 });
B(g, w, 2.2, 0.06, 1.0, 0, 0.76, 0);
B(g, M(0x3A5A3A), 1.9, 0.01, 0.8, 0, 0.795, 0);
[[-1, -0.42], [1, -0.42], [-1, 0.42], [1, 0.42]].forEach(function (p) { B(g, w, 0.08, 0.73, 0.08, p[0], 0.37, p[1]); });
[-0.6, 0.6].forEach(function (x) { C(g, BRASS(), 0.02, 0.03, 0.4, x, 0.99, 0, 6); var sh = C(g, lm, 0.12, 0.18, 0.12, x, 1.22, 0, 10); C(g, lt, 0.11, 0.11, 0.01, x, 1.16, 0, 10); });
B(g, M(0x7A2A2A), 0.3, 0.05, 0.22, -0.2, 0.82, 0.2);
B(g, M(0x2A3A6A), 0.28, 0.04, 0.2, -0.18, 0.86, 0.2);
return g;
};
P.esorgan = function () {
var g = G(), w = MAH(), gl = GILT();
B(g, w, 2.2, 1.1, 0.8, 0, 0.55, 0);
B(g, w, 2.2, 0.08, 0.5, 0, 1.0, 0.5);
B(g, M(0xD8D2C6), 2.0, 0.03, 0.2, 0, 1.05, 0.55);
for (var i = 0; i < 11; i++) {
var h = 1.4 + Math.abs(5 - i) * 0.18 * -1 + 1.0;
C(g, gl, 0.06, 0.06, h, -1.0 + i * 0.2, 1.1 + h / 2, -0.25, 8);
}
return g;
};
P.espew = function () { var g = G(), w = OAK(); B(g, w, 2.6, 0.06, 0.45, 0, 0.45, 0); B(g, w, 2.6, 0.9, 0.06, 0, 0.75, -0.22); B(g, w, 0.06, 0.9, 0.5, -1.28, 0.45, 0); B(g, w, 0.06, 0.9, 0.5, 1.28, 0.45, 0); return g; };
P.esaltar = function () {
var g = G(), st = STONE(), cl = M(0xD8CCB0), gl = GILT();
B(g, st, 2.0, 1.0, 0.8, 0, 0.5, 0);
B(g, cl, 2.1, 0.02, 0.85, 0, 1.01, 0);
B(g, M(0x6A2A3A), 0.5, 0.4, 0.86, 0, 0.75, 0.02);
[-0.7, 0.7].forEach(function (x) { C(g, gl, 0.04, 0.05, 0.4, x, 1.22, -0.1, 8); C(g, M(0xE8E0C8, null, { e: 0x2A2010 }), 0.02, 0.02, 0.18, x, 1.5, -0.1, 6); });
return g;
};
P.eslockers = function () {
var g = G(), m = M(0x7A8A90);
for (var i = 0; i < 5; i++) {
B(g, m, 0.38, 1.9, 0.5, -0.8 + i * 0.4, 0.95, 0);
B(g, M(0x5A6A70), 0.05, 0.08, 0.02, -0.68 + i * 0.4, 1.2, 0.26);
}
return g;
};
P.esbasinrow = function () {
var g = G(), top = M(0xD4CEC4, "marble"), c = CHROME();
B(g, M(0x6A5A4A, "wood"), 2.4, 0.8, 0.55, 0, 0.4, 0);
B(g, top, 2.5, 0.06, 0.6, 0, 0.83, 0);
[-0.65, 0.65].forEach(function (x) { C(g, M(0xE0DCD4), 0.22, 0.18, 0.08, x, 0.88, 0.02, 12); C(g, c, 0.015, 0.015, 0.25, x, 1.0, -0.2, 6); B(g, M(0xA8B4BC, null, { e: 0x1A1E22 }), 0.8, 1.0, 0.03, x, 1.6, -0.26); });
return g;
};
P.esbathfree = function () {
var g = G(), p = M(0xE2DED6), c = BRASS();
var t = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.38, 0.6, 20, 1, true), p);
t.scale.set(2.0, 1, 1);
t.position.set(0, 0.42, 0);
g.add(t);
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.05, 20), p);
b.scale.set(2.0, 1, 1);
b.position.set(0, 0.15, 0);
g.add(b);
var w = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.02, 20), M(0x9AB4C0, null, { op: 0.6 }));
w.scale.set(2.0, 1, 1);
w.position.set(0, 0.6, 0);
g.add(w);
[[-0.7, -0.25], [0.7, -0.25], [-0.7, 0.25], [0.7, 0.25]].forEach(function (q) { S(g, c, 0.06, q[0], 0.1, q[1], 6); });
C(g, c, 0.02, 0.02, 0.9, 0.95, 0.45, 0, 6);
B(g, c, 0.2, 0.03, 0.03, 0.85, 0.9, 0);
return g;
};
Object.keys(P).forEach(function (k) { if (!FURN[k])
FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["esbilliard", "escardtable", "eschess", "eswinerack", "estelescope", "esglobe", "esweights", "esbike", "esmassage", "essauna", "essaunastove",
"esshower", "esarcade", "esfoos", "esironing", "essewing", "esbust", "esconsole", "esisland", "esdollhouse", "espalm", "esbar", "eslounger", "esharp", "esreading", "esorgan", "espew", "esaltar", "eslockers", "esbasinrow", "esbathfree"]
.forEach(function (k) { SOLIDFURN[k] = 1; });
if (typeof furnBox === "function") {
var fb = furnBox;
furnBox = function (k) {
if (typeof k === "string" && /^es[a-z]/.test(k) && FURN[k]) {
var s = esSize(k);
return [Math.max(0.3, s[0] - 0.05), Math.max(0.3, s[1] - 0.05)];
}
return fb.apply(this, arguments);
};
}
FURN.esrecliner = function () {
var g = G(), f = M(0x6A2228), a = M(0x4A1A20);
B(g, f, 0.8, 0.45, 0.85, 0, 0.32, 0.05);
B(g, f, 0.8, 0.8, 0.25, 0, 0.72, -0.32);
B(g, a, 0.14, 0.6, 0.85, -0.43, 0.4, 0.05);
B(g, a, 0.14, 0.6, 0.85, 0.43, 0.4, 0.05);
return g;
};
if (typeof SOLIDFURN !== "undefined")
SOLIDFURN.esrecliner = 1;
})();
function esSize(k) { return __ZC(318, 15, this, arguments, new.target); }
"use strict";
var ES_FACE = { "+v": 0, "-v": Math.PI, "+u": Math.PI / 2, "-u": -Math.PI / 2 };
function esFrame(A, r, ctx) { return __ZC(318, 16, this, arguments, new.target); }
function esX() { return (typeof HW !== "undefined" && HW.x) || null; }
function esFab(b) { var X = esX(); return X ? X.fab(b) : null; }
function esWd(b) { var X = esX(); return X ? X.wd(b) : null; }
function esMt(b) { var X = esX(); return X ? X.mt(b) : null; }
function esSt(b) { var X = esX(); return X ? X.st(b) : null; }
function esPk(b, w) { var X = esX(); return X ? X.pk(b, w) : null; }
function esArt(i) { var X = esX(); return X ? X.art(i) : null; }
function esRug(i) { var X = esX(); return X ? X.rug(i) : "rug"; }
var ES_ART = 0;
function esArts(P, side, n, a, b) {
var span = (b === undefined ? (side === "far" || side === "door" ? P.d / 2 - 1.2 : P.w - 1.2) : b) - (a === undefined ? (side === "far" || side === "door" ? -P.d / 2 + 1.2 : 1.2) : a);
var a0 = a === undefined ? (side === "far" || side === "door" ? -P.d / 2 + 1.2 : 1.2) : a;
for (var i = 0; i < n; i++)
P.wall(side, esArt(ES_ART++), a0 + span * (i + 0.5) / n);
}
function esPlants(P) { P("plant", 0.6, P.B + 0.6, 0); P("plant", 0.6, P.F - 0.6, 0); P("plant", P.w - 0.6, P.B + 0.6, 0); P("plant", P.w - 0.6, P.F - 0.6, 0); }
function esSalon(P, cu, cv, o) { return __ZC(318, 17, this, arguments, new.target); }
function esTable(P, cu, cv, n, o) { return __ZC(318, 18, this, arguments, new.target); }
var ES_ROOM = {};
ES_ROOM.drawing = function (P) { return __ZC(318, 19, this, arguments, new.target); };
ES_ROOM.music = function (P) { return __ZC(318, 20, this, arguments, new.target); };
ES_ROOM.library = function (P) { return __ZC(318, 21, this, arguments, new.target); };
ES_ROOM.office = function (P) { return __ZC(318, 22, this, arguments, new.target); };
ES_ROOM.billiards = function (P) { return __ZC(318, 23, this, arguments, new.target); };
ES_ROOM.conservatory = function (P) { return __ZC(318, 24, this, arguments, new.target); };
ES_ROOM.saloon = function (P) { return __ZC(318, 25, this, arguments, new.target); };
ES_ROOM.ballroom = function (P) { return __ZC(318, 26, this, arguments, new.target); };
ES_ROOM.banquet = function (P) { return __ZC(318, 27, this, arguments, new.target); };
ES_ROOM.morning = function (P) { return __ZC(318, 28, this, arguments, new.target); };
ES_ROOM.cloak = function (P) { return __ZC(318, 29, this, arguments, new.target); };
ES_ROOM.cards = function (P) { return __ZC(318, 30, this, arguments, new.target); };
ES_ROOM.dining = function (P) { return __ZC(318, 31, this, arguments, new.target); };
ES_ROOM.pantry = function (P) { return __ZC(318, 32, this, arguments, new.target); };
ES_ROOM.kitchen = function (P) { return __ZC(318, 33, this, arguments, new.target); };
ES_ROOM.servants = function (P) { return __ZC(318, 34, this, arguments, new.target); };
ES_ROOM.scullery = function (P) { return __ZC(318, 35, this, arguments, new.target); };
ES_ROOM.laundry = function (P) { return __ZC(318, 36, this, arguments, new.target); };
ES_ROOM.housekeeper = function (P) { return __ZC(318, 37, this, arguments, new.target); };
ES_ROOM.wine = function (P) { return __ZC(318, 38, this, arguments, new.target); };
ES_ROOM.principal = function (P) { return __ZC(318, 39, this, arguments, new.target); };
ES_ROOM.dressing = function (P) { return __ZC(318, 40, this, arguments, new.target); };
ES_ROOM.bathgrand = function (P) { return __ZC(318, 41, this, arguments, new.target); };
ES_ROOM.boudoir = function (P) { return __ZC(318, 42, this, arguments, new.target); };
ES_ROOM.guestbed = function (P) { return __ZC(318, 43, this, arguments, new.target); };
ES_ROOM.ensuite = function (P) { return __ZC(318, 44, this, arguments, new.target); };
ES_ROOM.familysit = function (P, A) { return __ZC(318, 45, this, arguments, new.target); };
ES_ROOM.nursery = function (P) { return __ZC(318, 46, this, arguments, new.target); };
ES_ROOM.nanny = function (P) { return __ZC(318, 47, this, arguments, new.target); };
ES_ROOM.playroom = function (P) { return __ZC(318, 48, this, arguments, new.target); };
ES_ROOM.childbed = function (P) { return __ZC(318, 49, this, arguments, new.target); };
ES_ROOM.kidsbath = function (P) { return __ZC(318, 50, this, arguments, new.target); };
ES_ROOM.familybath = function (P) { return __ZC(318, 51, this, arguments, new.target); };
ES_ROOM.linen = function (P) { return __ZC(318, 52, this, arguments, new.target); };
ES_ROOM.sewing = function (P) { return __ZC(318, 53, this, arguments, new.target); };
ES_ROOM.games = function (P) { return __ZC(318, 54, this, arguments, new.target); };
ES_ROOM.cinema = function (P) { return __ZC(318, 55, this, arguments, new.target); };
ES_ROOM.gym = function (P) { return __ZC(318, 56, this, arguments, new.target); };
ES_ROOM.sauna = function (P) { return __ZC(318, 57, this, arguments, new.target); };
ES_ROOM.pool = function (P, A, ctx) { return __ZC(318, 58, this, arguments, new.target); };
ES_ROOM.observatory = function (P) { return __ZC(318, 59, this, arguments, new.target); };
ES_ROOM.changing = function (P) { return __ZC(318, 60, this, arguments, new.target); };
ES_ROOM.treatment = function (P) { return __ZC(318, 61, this, arguments, new.target); };
ES_ROOM.staffsit = function (P) { return __ZC(318, 62, this, arguments, new.target); };
ES_ROOM.butlerflat = function (P) { return __ZC(318, 63, this, arguments, new.target); };
ES_ROOM.staffbed = function (P) { return __ZC(318, 64, this, arguments, new.target); };
ES_ROOM.staffkitchen = function (P) { return __ZC(318, 65, this, arguments, new.target); };
ES_ROOM.boxroom = function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("B", "footchest", w * 0.3);
P.wall("B", "footchest", w * 0.3 + 1.3);
P.wall("far", "crates", 0);
P.wall("F", esPk("qf_shelflarge", ["pine", "oak"]), w * 0.4);
P.wall("F", esPk("qf_shelflarge", ["pine", "oak"]), w * 0.4 + 1.7);
P("barrel", w * 0.6, 0, 0);
P.spot(w * 0.35, 0);
};
ES_ROOM.staffbath = function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "esshower", B + 1.0);
P.wall("far", "esshower", B + 2.2);
P.wall("B", esSt("kf_toilet"), w * 0.55);
P.wall("B", esSt("kf_toilet"), w * 0.55 + 1.0);
P.wall("F", "esbasinrow", w * 0.5);
P.wall("F", esPk("qf_bathroomtowel", ["white"]), w - 1.2);
P.spot(w * 0.35, 0);
};
ES_ROOM.studio = function (P) { return __ZC(318, 66, this, arguments, new.target); };
ES_ROOM.armoury = function (P) { return __ZC(318, 67, this, arguments, new.target); };
ES_ROOM.chapel = function (P) { return __ZC(318, 68, this, arguments, new.target); };
ES_ROOM.greathall = function (P, A, ctx) { return __ZC(318, 69, this, arguments, new.target); };
ES_ROOM.castlehall = function (P, A, ctx) { return __ZC(318, 70, this, arguments, new.target); };
ES_ROOM.landing = function (P, A, ctx) { return __ZC(318, 71, this, arguments, new.target); };
ES_ROOM.longgallery = function (P, A, ctx) { return __ZC(318, 72, this, arguments, new.target); };
ES_ROOM.armourgallery = function (P, A, ctx) { return __ZC(318, 73, this, arguments, new.target); };
ES_ROOM.corridor = function (P, A, ctx) { return __ZC(318, 74, this, arguments, new.target); };
function esFurnish(A, r, L, T, ctx) {
var f = ES_ROOM[r.k];
if (!f)
return;
ctx.L = L;
ctx.ways = ctx.ways || [];
var P = esFrame(A, r, ctx);
f(P, A, ctx);
}
"use strict";
var esMakeInterior0 = makeInterior;
makeInterior = function (spec) { return __ZC(318, 75, this, arguments, new.target); };
function esRestyle(I, spec, decor) { return __ZC(318, 76, this, arguments, new.target); }
function esRoomAt(I, x, z, L) {
var rs = I.ce.rooms;
for (var i = 0; i < rs.length; i++) {
var r = rs[i];
if (r.L === L && x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1)
return r;
}
return null;
}
function esCullTick() {
if (typeof INT === "undefined" || !INT || !INT.ce || !INT.root)
return;
var P = camera.position, lv = INT.level || 0, F = INT.floor || 4.7, R = esLite() ? 28 : 46, cx = P.x - INT.ox, cz = P.z - INT.oz;
INT.ce.decor.forEach(function (g) { g.visible = g.userData.esLevel === lv; });
INT.root.children.forEach(function (c) {
var k = c.userData && c.userData.furn;
if (!k || k === "stairs")
return;
if (c.userData.esVis0 === undefined)
c.userData.esVis0 = c.visible;
var on = Math.round(c.position.y / F) === lv, far = Math.abs(c.position.x - cx) > R || Math.abs(c.position.z - cz) > R;
c.visible = c.userData.esVis0 && on && !far;
});
var r = esRoomAt(INT, cx, cz, lv);
if (r && r !== ES.room) {
ES.room = r;
var nm = r.n;
if (nm !== ES.said) {
ES.said = nm;
try {
setStatus("🏛 " + nm + " · " + (INT.floorNames[lv] || ""));
}
catch (e) { }
}
}
}
setInterval(function () { try {
esCullTick();
}
catch (e) {
if (window.console)
console.warn("[estates]", e);
} }, 300);
function esTest() { return { ES: ES, rooms: (typeof INT !== "undefined" && INT && INT.ce) ? INT.ce.rooms.length : 0 }; }
