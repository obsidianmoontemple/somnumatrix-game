/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HW = { spec: null, home: false, full: true, style: "", grand: false, poor: false, seed: 1, count: {}, keys: null, size: {}, raised: {} };
var HW_HOMES = { palace: 1, castle: 1, house: 1, cottage: 1, apartment: 1, tenementblock: 1, manor: 1, farmhouse: 1, machiya: 1, hanok: 1, izba: 1, longhouse: 1,
roundhouse: 1, stilthouse: 1, riad: 1, toadstoolhouse: 1, shanty: 1, leanto: 1, boardedshack: 1, tent: 1, hacienda: 1, cycladic: 1, pueblo: 1 };
var HW_STYLE = { machiya: "east", hanok: "east", izba: "north", longhouse: "north", roundhouse: "north", stilthouse: "warm", riad: "warm", hacienda: "warm", pueblo: "warm", cycladic: "warm" };
var HW_POOR = { shanty: 1, leanto: 1, boardedshack: 1, tent: 1 };
var HW_SOLID = /^sg_(kf_(loungesofa|loungechair|loungedesignsofa|beddouble|bedsingle|bedbunk|bookcase|table|desk|cabinet|kitchen|bathtub|sidetabledrawers|bench)|qf_(bedking|couch|drawer|tableround|bookshelf|shelflarge|fireplace|kitchen|bathroombathtub)|clock_grandfather)/;
(function () {
if (typeof FURN === "undefined" || typeof furnishRoom !== "function" || typeof makeInterior !== "function")
return;
var R = function () { return Array.prototype.slice.call(arguments); };
var PL = {
house: { mode: "rooms", rooms: R("living", "kitchen", "dining", "study", "bedroom", "bedroom", "bathroom", "nursery", "bedroom", "bathroom"), wall: 0xE6DCC8, floor: "wood" },
cottage: { mode: "rooms", rooms: R("living", "kitchen", "bedroom", "bathroom", "bedroom"), wall: 0xE8E0CC, floor: "wood" },
apartment: { mode: "rooms", rooms: R("living", "kitchen", "dining", "bedroom", "bedroom", "bathroom", "study"), wall: 0xDCD8D0, floor: "wood" },
tenementblock: { mode: "rooms", rooms: R("living", "kitchen", "bedroom", "bathroom"), wall: 0xD8D0C0, floor: "wood" },
manor: { mode: "rooms", rooms: R("living", "dining", "kitchen", "ballroom", "study", "bedroom", "bedroom", "bedroom", "bathroom", "nursery", "study", "bathroom"), wall: 0xE4D8C0, floor: "wood" },
farmhouse: { mode: "rooms", rooms: R("kitchen", "living", "dining", "bedroom", "bedroom", "bathroom", "bedroom"), wall: 0xEAE0C8, floor: "wood" },
machiya: { mode: "rooms", rooms: R("living", "kitchen", "bedroom", "bathroom", "study"), wall: 0xE8DCC0, floor: "wood" },
hanok: { mode: "rooms", rooms: R("living", "kitchen", "bedroom", "bathroom", "study"), wall: 0xEDE4D0, floor: "wood" },
izba: { mode: "rooms", rooms: R("living", "kitchen", "bedroom", "bedroom"), wall: 0xC8A878, floor: "wood" },
longhouse: { mode: "rooms", rooms: R("living", "kitchen", "dining", "bedroom", "bedroom"), wall: 0xB89870, floor: "wood" },
roundhouse: { mode: "rooms", rooms: R("living", "kitchen", "bedroom"), wall: 0xC0A070, floor: "wood" },
stilthouse: { mode: "rooms", rooms: R("living", "kitchen", "bedroom", "bathroom"), wall: 0xD8C090, floor: "wood" },
riad: { mode: "rooms", rooms: R("living", "dining", "kitchen", "bedroom", "bedroom", "bathroom"), wall: 0xF0E2C8, floor: "tile" },
toadstoolhouse: { mode: "rooms", rooms: R("living", "kitchen", "bedroom"), wall: 0xE8D8C0, floor: "wood" }
};
Object.keys(PL).forEach(function (k) { PLANS[k] = PL[k]; });
if (typeof STOREYS !== "undefined") {
STOREYS.manor = STOREYS.manor || 2;
STOREYS.farmhouse = STOREYS.farmhouse || 2;
STOREYS.tenementblock = STOREYS.tenementblock || 1;
}
if (typeof ROOMNAME !== "undefined" && !ROOMNAME.ballroom)
ROOMNAME.ballroom = "the ballroom";
function hash(s) { s = String(s || ""); var h = 2166136261; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function isHome(spec) {
if (!spec || !HW_HOMES[spec.archetype])
return false;
var wk = (typeof workplaceKeyOf === "function") ? workplaceKeyOf(spec) : null;
if (wk && !/^lot:/.test(wk))
return false;
return true;
}
function variants() {
if (HW.keys)
return HW.keys;
HW.keys = {};
Object.keys(FURN).forEach(function (k) {
var m = /^sg_([a-z]+_[a-z0-9]+)_([a-z0-9]+)$/.exec(k);
if (!m)
return;
(HW.keys[m[1]] = HW.keys[m[1]] || []).push(m[2]);
});
return HW.keys;
}
var FABRIC = ["navy", "crimson", "emerald", "mustard", "dove", "teal", "plum", "charcoal", "terracotta", "ivory", "sage", "blush"];
var WOOD = ["oak", "walnut", "cherry", "mahogany", "white", "ebony", "maple", "pine", "ash"];
var METAL = ["brass", "chrome", "copper", "iron", "gold"];
var STONE = ["marble", "rose", "black", "granite", "sand", "slate"];
function pal(spec) {
var h = hash(spec && spec.id), r = function (n) { var v = h % n; h = Math.floor(h / n) ^ (h * 2654435761 >>> 7); return v; };
var p = { fab: FABRIC[r(FABRIC.length)], fab2: FABRIC[r(FABRIC.length)], wood: WOOD[r(5)], metal: METAL[r(METAL.length)],
stone: STONE[r(3)], art: r(12), rug: r(6), rugv: r(8), seed: h };
if (HW.style === "north") {
p.wood = "walnut";
p.stone = "granite";
}
if (HW.style === "east") {
p.wood = ["oak", "cherry", "walnut"][r(3)];
p.fab = "ivory";
}
if (HW.poor) {
p.fab = "charcoal";
p.wood = "pine";
}
if (HW.grand) {
p.wood = ["mahogany", "walnut", "cherry"][r(3)];
p.metal = "gold";
p.stone = "marble";
}
return p;
}
function pk(base, want) {
var v = variants()[base];
if (!v || !v.length)
return null;
var w = [].concat(want || []);
for (var i = 0; i < w.length; i++)
if (v.indexOf(w[i]) >= 0)
return "sg_" + base + "_" + w[i];
return "sg_" + base + "_" + v[HW.seed % v.length];
}
function fab(base) { return pk(base, [HW.p.fab, HW.p.fab2, "navy", "dove"]); }
function wd(base) { return pk(base, [HW.p.wood, "oak", "walnut", "white"]); }
function mt(base) { return pk(base, [HW.p.metal, "brass", "chrome"]); }
function st(base) { return pk(base, [HW.p.stone, "marble", "rose"]); }
var ARTS = ["sunset", "sea", "mountains", "forest", "night", "abstract", "bloom", "city", "meadow", "storm", "dunes", "aurora"];
function art(i) { return pk("paint_" + ARTS[(HW.p.art + (i || 0)) % ARTS.length], [String((HW.p.seed >> 3) % 4), "0"]); }
var RUGS = ["medallion", "kilim", "border", "diamonds", "stripes", "checks"];
function rug(i) { return pk("rug_" + RUGS[(HW.p.rug + (i || 0)) % RUGS.length], [String((HW.p.rugv + (i || 0)) % 8), "0"]); }
function on(k, h) {
if (!k || !FURN[k])
return null;
var key = "hwup_" + Math.round(h * 100) + "_" + k;
if (!FURN[key]) {
var base = FURN[k];
FURN[key] = function () { var g = new THREE.Group(), c = base(); c.position.y = h; g.add(c); return g; };
}
return key;
}
if (typeof furnBox === "function") {
var furnBox0 = furnBox;
furnBox = function (k) {
if (HW.size[k])
return HW.size[k];
if (typeof k === "string" && HW_SOLID.test(k) && FURN[k]) {
try {
var b = new THREE.Box3().setFromObject(FURN[k]()), s = b.getSize(new THREE.Vector3());
HW.size[k] = [Math.max(.3, s.x - .1), Math.max(.3, s.z - .1)];
return HW.size[k];
}
catch (e) { }
}
return furnBox0(k);
};
}
function solidify(k) { if (k && HW_SOLID.test(k) && typeof SOLIDFURN !== "undefined")
SOLIDFURN[k] = 1; }
function roomer(xc, zc, w, d, sd, put) {
var lite = (typeof LITE !== "undefined" && LITE);
var face = { "+v": 0, "-v": Math.PI, "+u": sd * Math.PI / 2, "-u": -sd * Math.PI / 2 };
function P(k, u, v, f) { if (!k || !FURN[k])
return; solidify(k); put(k, xc - sd * w / 2 + sd * u, zc + v, typeof f === "number" ? f : (face[f || "+v"] || 0)); }
P.small = function (k, u, v, f) { if (!lite)
P(k, u, v, f); };
P.on = function (k, h, u, v, f) { if (!lite)
P(on(k, h), u, v, f); };
P.B = -d / 2;
P.F = d / 2;
P.w = w;
P.d = d;
return P;
}
var ROOM = {};
ROOM.living = function (P) {
var w = P.w, B = P.B, F = P.F, c = w * 0.55;
if (HW.style === "east") {
P(rug(0), c, 0, "+v");
P(wd("kf_tablecoffee"), c, 0, "+v");
[[-0.95, 0], [0.95, 0], [0, -0.75], [0, 0.75]].forEach(function (o) { P(fab("kf_pillow"), c + o[0], o[1], "+v"); });
P(wd("kf_cabinettelevision"), c, B + 0.3, "+v");
P.on("lantern", 0.62, c + 0.6, B + 0.3, "+v");
P(wd("kf_bookcaseopenlow"), w - 0.35, B + 1.2, "-u");
P("plant", w - 0.45, F - 0.45, "+v");
P(art(0), c, B + 0.06, "+v");
P(mt("kf_lamproundfloor"), w - 0.35, B + 0.35, "+v");
return;
}
if (HW.style === "north") {
P(st("qf_fireplace"), c, B + 0.4, "+v");
P.small(wd("clock_mantel"), c, B + 0.4, "+v");
P("pelt", c, -0.2, 0);
P(wd("kf_bench"), c - 1.6, 0.2, "+u");
P(wd("kf_bench"), c + 1.7, 0.2, "-u");
P("longtable", c, F - 1.5, 0);
P("bookshelf", 1.2, B + 0.25, "+v");
P("lantern", w - 0.4, B + 0.4, 0);
P("barrel", w - 0.45, F - 0.45, 0);
return;
}
if (HW.style === "warm") {
P(rug(1), c, -0.3, "+v");
P(rug(2), c, 1.4, "+v");
P(fab("kf_benchcushionlow"), c, B + 0.4, "+v");
P(fab("kf_benchcushionlow"), w - 0.4, -0.6, "-u");
P(wd("kf_tablecoffeesquare"), c, -0.4, "+v");
[-0.8, 0.8].forEach(function (o) { P(fab("kf_pillow"), c + o, 0.5, "-v"); });
P("lantern", w - 0.4, B + 0.4, 0);
P("plant", w - 0.45, F - 0.45, 0);
P("plant", 1.0, B + 0.4, 0);
P(art(0), c, B + 0.06, "+v");
return;
}
if (HW.poor) {
P(fab("kf_loungesofa"), c, B + 0.5, "+v");
P("crates", c, B + 1.8, 0);
P(wd("kf_televisionvintage"), c, F - 0.4, "-v");
P(rug(1), c, 0, "+v");
P("lantern", w - 0.4, B + 0.4, 0);
return;
}
P(rug(0), c, -0.2, "+v");
P(fab(HW.grand ? "kf_loungedesignsofa" : "kf_loungesofa"), c, B + 0.5, "+v");
P.on(fab("kf_pillow"), 0.45, c - 0.6, B + 0.45, "+v");
P.on(pk("kf_pillow", [HW.p.fab2, "dove"]), 0.45, c + 0.6, B + 0.45, "+v");
P(wd("kf_tablecoffee"), c, B + 1.8, "+v");
P(fab("kf_loungechair"), w - 0.7, B + 1.9, "-u");
P(pk("kf_loungechair", [HW.p.fab2, HW.p.fab]), c - 1.95, B + 1.9, "+u");
P(wd("kf_sidetable"), c + 1.5, B + 0.35, "+v");
P.on(mt("kf_lamproundtable"), 0.55, c + 1.5, B + 0.35, "+v");
P(mt("kf_lampsquarefloor"), w - 0.35, B + 0.35, "+v");
P("bookshelf", 1.05, B + 0.25, "+v");
P(art(0), c, B + 0.06, "+v");
P(fab("qf_curtainsdouble"), w - 0.14, 0, "-u");
P("plant", 0.55, F - 0.45, 0);
P.small(wd("clock_wall"), 1.4, F - 0.05, "-v");
if (!HW.media) {
P(wd("kf_cabinettelevision"), w / 2, F - 0.3, "-v");
P.on(wd("kf_televisionvintage"), 0.62, w / 2, F - 0.3, "-v");
}
if (HW.grand) {
P(mt("qf_lightchandelier"), c, 0, "+v");
P("piano", 1.5, F - 1.3, "+u");
}
};
ROOM.kitchen = function (P) {
var w = P.w, B = P.B, F = P.F, east = HW.style === "east";
if (HW.poor) {
P("stove", 1.6, B + 0.4, 0);
P("crates", 3.0, B + 0.55, 0);
P("barrel", w - 0.5, B + 0.5, 0);
P("table", w * 0.5, 0.6, 0);
P("lantern", w - 0.4, F - 0.4, 0);
return;
}
if (HW.style === "north") {
P("oven", 1.8, B + 0.6, 0);
P("table", w * 0.5, 0.4, 0);
P(wd("kf_bench"), w * 0.5, 1.3, "-v");
P(wd("kf_bench"), w * 0.5, -0.5, "+v");
P("barrel", w - 0.5, B + 0.5, 0);
P("herbrack", w - 0.4, F - 0.6, 0);
P("crates", w - 0.6, F - 1.6, 0);
P("cask", 1.0, F - 0.5, 0);
return;
}
var run = ["kf_kitchencabinetdrawer", "kf_kitchensink", "kf_kitchencabinet", "kf_kitchenstove", "kf_kitchencabinetdrawer", "kf_kitchencabinet"];
var u = 1.45, i = 0;
while (u < w - 1.4 && i < run.length) {
P(wd(run[i]), u, B + 0.46, "+v");
if (run[i] !== "kf_kitchenstove")
P.small(wd("kf_kitchencabinetupper"), u, B + 0.23, "+v");
u += 0.88;
i++;
}
P(wd("kf_kitchenfridgebuiltin"), w - 0.47, B + 0.47, "+v");
P(wd("kf_kitchencabinet"), w - 0.46, B + 1.4, "-u");
P(wd("kf_kitchencabinetdrawer"), w - 0.46, B + 2.28, "-u");
P.on(wd("kf_radio"), 0.92, w - 0.46, B + 1.4, "-u");
if (east) {
P(wd("kf_tablecoffee"), w * 0.45, F - 1.5, "+v");
[-0.9, 0.9].forEach(function (o) { P(fab("kf_pillow"), w * 0.45 + o, F - 1.5, "+v"); });
}
else {
var tx = w * 0.45, tz = F - 1.6;
P(wd("kf_tableround"), tx, tz, "+v");
P(wd("kf_chair"), tx - 0.85, tz, "+u");
P(wd("kf_chair"), tx + 0.85, tz, "-u");
P(wd("kf_chair"), tx, tz - 0.85, "+v");
P(wd("kf_chair"), tx, tz + 0.85, "-v");
}
P(fab("qf_curtainsdouble"), w - 0.14, 0.4, "-u");
P.small(wd("clock_wall"), 1.3, F - 0.05, "-v");
P("plant", 0.55, F - 0.45, 0);
};
ROOM.dining = function (P) {
var w = P.w, B = P.B, F = P.F, c = w * 0.55;
if (HW.style === "east") {
P(wd("kf_tablecoffee"), c, 0, "+v");
P(wd("kf_tablecoffee"), c + 1.25, 0, "+v");
[-0.8, 0.5, 1.8].forEach(function (o) { P(fab("kf_pillow"), c + o - 0.3, -0.75, "+v"); P(fab("kf_pillow"), c + o - 0.3, 0.75, "+v"); });
P(art(1), c, B + 0.06, "+v");
return;
}
P(rug(2), c, 0, "+v");
P(wd("qf_tableroundlarge"), c, 0, "+v");
[-0.6, 0.6].forEach(function (o) { P(wd("kf_chaircushion") || wd("kf_chair"), c + o, -0.85, "+v"); P(wd("kf_chaircushion") || wd("kf_chair"), c + o, 0.85, "-v"); });
P(wd("kf_chair"), c - 1.35, 0, "+u");
P(wd("kf_chair"), c + 1.35, 0, "-u");
P(wd("qf_drawer1"), c, B + 0.3, "+v");
P.on("candles", 0.7, c - 0.4, B + 0.3, 0);
P(art(1), c, B + 0.06, "+v");
P(mt("qf_lightchandelier"), c, 0, "+v");
P(wd("clock_grandfather"), w - 0.35, B + 0.3, "+v");
P(wd("kf_bookcasecloseddoors"), c, F - 0.3, "-v");
P(fab("qf_curtainsdouble"), w - 0.14, 0, "-u");
P("plant", 0.55, F - 0.45, 0);
};
ROOM.bedroom = function (P) {
var w = P.w, B = P.B, F = P.F, n = (HW.count.bedroom = (HW.count.bedroom || 0) + 1);
if (HW.poor) {
P(fab("kf_bedsingle"), w - 0.65, B + 1.1, "+v");
P("crates", w - 1.6, B + 0.4, 0);
P.on("lantern", 0.6, w - 1.6, B + 0.4, 0);
P(rug(1), w * 0.5, 0.6, "+v");
return;
}
if (HW.style === "east") {
P(pk("kf_bedsingle", ["dove", "ivory", "navy"]), w * 0.6, B + 1.1, "+v");
P(pk("kf_bedsingle", ["dove", "ivory", "navy"]), w * 0.6 - 1.2, B + 1.1, "+v");
P(rug(3), w * 0.55, 1.2, "+v");
P("lantern", w - 0.4, B + 0.4, 0);
P(wd("kf_bookcasecloseddoors"), w * 0.55, F - 0.3, "-v");
P(art(2), w * 0.55, B + 0.06, "+v");
return;
}
var kid = (n === 2 || n === 4) && !HW.grand, c = w * 0.6;
if (kid) {
var bunk = n === 4;
P(bunk ? wd("kf_bedbunk") : pk("kf_bedsingle", [HW.p.fab2, "teal", "blush"]), w - 0.65, B + 1.1, "+v");
P(wd("qf_nightstand1"), w - 1.6, B + 0.33, "+v");
P.on(mt("kf_lamproundtable"), 0.55, w - 1.6, B + 0.33, "+v");
P.on(pk("kf_bear", ["tan", "brown", "pink", "sky"]), 0.66, w - 0.65, B + 0.45, "+v");
P(wd("kf_desk"), 2.1, B + 0.42, "+v");
P(pk("kf_chairdesk", [HW.p.fab, "navy"]), 2.1, B + 1.15, "-v");
P("bookshelf", w * 0.55, F - 0.25, "-v");
P("toys", w * 0.5, 0.7, 0);
P(rug(4), w * 0.5, 0.5, "+v");
P(art(3), 2.1, B + 0.06, "+v");
P(pk("qf_curtainsdouble", [HW.p.fab2]), w - 0.14, 0.6, "-u");
return;
}
P(rug(3), c, B + 2.4, "+v");
P(HW.grand ? "fourposter" : (n === 1 ? fab("qf_bedking") : fab("kf_beddouble")), c, B + 1.15, "+v");
[-1.3, 1.3].forEach(function (o) { P(wd("qf_nightstand1"), c + o, B + 0.33, "+v"); P.on(mt("kf_lamproundtable"), 0.55, c + o, B + 0.33, "+v"); });
P(art(2), c, B + 0.06, "+v");
P("wardrobe", c, F - 0.35, "-v");
P(wd("qf_drawer1"), 2.0, F - 0.3, "-v");
P.small(wd("kf_bathroommirror"), 2.0, F - 0.05, "-v");
P(fab("kf_loungechair"), w - 0.7, F - 1.1, "-u");
P(mt("kf_lamproundfloor"), w - 0.3, F - 0.35, "+v");
P(fab("qf_curtainsdouble"), w - 0.14, 0, "-u");
if (HW.grand)
P(mt("qf_lightchandelier"), c, B + 2.3, "+v");
};
ROOM.bathroom = function (P) {
var w = P.w, B = P.B, F = P.F;
if (HW.poor) {
P("sink", 1.6, B + 0.4, 0);
P("barrel", w - 0.5, B + 0.5, 0);
return;
}
P(st("kf_bathtub"), w - 1.0, B + 0.45, "+v");
P(st("kf_toilet"), 2.3, B + 0.45, "+v");
P.small(wd("qf_shelfsmall1"), 2.3, B + 0.15, "+v");
P(st("kf_bathroomsink"), w - 1.0, F - 0.28, "-v");
P(mt("qf_bathroommirror1"), w - 1.0, F - 0.04, "-v");
P(pk("qf_bathroomtowel", ["white", HW.p.fab]), 1.6, F - 0.05, "-v");
P.small(pk("qf_bathroomtowel", [HW.p.fab, "white"]), w - 0.05, B + 1.4, "-u");
P(rug(5), w * 0.55, 0.2, "+v");
P("plant", w - 0.4, 0.9, 0);
if (HW.style === "warm")
P("lantern", 1.4, B + 0.4, 0);
};
ROOM.study = function (P) {
var w = P.w, B = P.B, F = P.F, n = (HW.count.study = (HW.count.study || 0) + 1);
P(rug(4), w * 0.55, 0, "+v");
for (var u = 1.3; u < w - 1.2; u += 1.7)
P("bookshelf", u, B + 0.25, "+v");
if (n === 2 || HW.grand) {
for (var u2 = w * 0.5; u2 < w - 1.0; u2 += 0.9)
P(wd("kf_bookcasecloseddoors"), u2, F - 0.3, "-v");
}
P(wd("kf_desk"), w - 0.5, 0, "-u");
P(pk("kf_chairdesk", [HW.p.fab, "navy", "black"]), w - 1.25, 0, "+u");
P.on(mt("kf_lamproundtable"), 0.79, w - 0.5, 0.55, "-u");
P(fab("kf_loungechairrelax"), 1.9, F - 1.2, "+u");
P(mt("kf_lamproundfloor"), 1.0, F - 0.4, "+v");
P(art(4), 1.6, F - 0.05, "-v");
P(fab("qf_curtainsdouble"), w - 0.14, 0, "-u");
};
ROOM.nursery = function (P) {
var w = P.w, B = P.B, F = P.F;
P(rug(5), w * 0.5, 0, "+v");
P("crib", w * 0.55, B + 0.6, "+v");
P(fab("kf_loungechairrelax"), w - 0.8, F - 1.0, "-u");
P("toys", w * 0.4, 0.9, 0);
P.small(pk("kf_bear", ["cream", "pink", "sky", "tan"]), w * 0.6, 0.3, "-v");
P(wd("kf_sidetabledrawers"), 2.0, F - 0.3, "-v");
P.on(mt("kf_lamproundtable"), 0.94, 2.5, F - 0.3, "-v");
P(wd("kf_bookcaseopenlow"), w - 0.3, B + 1.2, "-u");
P(art(5), w * 0.55, B + 0.06, "+v");
P(pk("qf_curtainsdouble", ["blush", "lavender", "sage", HW.p.fab2]), w - 0.14, 0, "-u");
};
var MIN = {};
MIN.living = function (P) {
var c = P.w * 0.55;
P(pk("kf_loungesofa", ["dove", "charcoal"]), c, P.B + 0.5, "+v");
P(pk("kf_tablecoffee", ["pine", "white", "oak"]), c, P.B + 1.8, "+v");
P(pk("kf_lamproundfloor", ["chrome", "iron"]), P.w - 0.35, P.B + 0.35, "+v");
if (!HW.media) {
P(pk("kf_cabinettelevision", ["white", "pine"]), P.w / 2, P.F - 0.3, "-v");
P.on(pk("kf_televisionvintage", ["white", "oak"]), 0.62, P.w / 2, P.F - 0.3, "-v");
}
};
MIN.kitchen = function (P) {
var B = P.B, w = P.w, p = ["white", "pine", "oak"];
P(pk("kf_kitchencabinet", p), 1.45, B + 0.46, "+v");
P(pk("kf_kitchensink", p), 2.33, B + 0.46, "+v");
P(pk("kf_kitchenstove", p), 3.21, B + 0.46, "+v");
P(pk("kf_kitchenfridgebuiltin", p), w - 0.47, B + 0.47, "+v");
var tx = w * 0.45, tz = P.F - 1.6;
P(pk("kf_table", ["pine", "white", "oak"]), tx, tz, "+v");
P(pk("kf_chair", ["pine", "white", "oak"]), tx, tz - 0.75, "+v");
P(pk("kf_chair", ["pine", "white", "oak"]), tx, tz + 0.75, "-v");
};
MIN.dining = function (P) {
var c = P.w * 0.55;
P(pk("kf_table", ["pine", "white", "oak"]), c, 0, "+v");
[-0.45, 0.45].forEach(function (o) { P(pk("kf_chair", ["pine", "white", "oak"]), c + o, -0.75, "+v"); P(pk("kf_chair", ["pine", "white", "oak"]), c + o, 0.75, "-v"); });
};
MIN.bedroom = function (P) {
var n = (HW.count.bedroom = (HW.count.bedroom || 0) + 1), c = P.w * 0.6;
if (n === 1) {
P(pk("kf_beddouble", ["dove", "ivory"]), c, P.B + 1.15, "+v");
P(pk("qf_nightstand1", ["white", "oak"]), c + 1.3, P.B + 0.33, "+v");
}
else
P(pk("kf_bedsingle", ["dove", "charcoal"]), P.w - 0.65, P.B + 1.1, "+v");
P("wardrobe", c, P.F - 0.35, "-v");
};
MIN.bathroom = function (P) {
var w = P.w, B = P.B, F = P.F;
P(pk("kf_bathtub", ["marble"]), w - 1.0, B + 0.45, "+v");
P(pk("kf_toilet", ["marble"]), 2.3, B + 0.45, "+v");
P(pk("kf_bathroomsink", ["marble"]), w - 1.0, F - 0.28, "-v");
P(pk("qf_bathroommirror1", ["chrome", "iron"]), w - 1.0, F - 0.04, "-v");
};
MIN.study = function (P) { var w = P.w; P(pk("kf_desk", ["pine", "white", "oak"]), w - 0.5, 0, "-u"); P(pk("kf_chairdesk", ["black", "dove"]), w - 1.25, 0, "+u"); P("bookshelf", 1.3, P.B + 0.25, "+v"); };
MIN.nursery = function (P) { P("crib", P.w * 0.55, P.B + 0.6, "+v"); };
function cozy(W, D, put, spots) {
var lite = (typeof LITE !== "undefined" && LITE);
function Q(k, x, z, r) { if (!k || !FURN[k])
return; solidify(k); put(k, x, z, r || 0); }
var B = -D / 2, L = -W / 2, Rr = W / 2;
Q(fab("kf_bedsingle"), L + 0.65, B + 1.15, 0);
Q(pk("kf_pillow", ["dove", "charcoal"]), L + 0.65, B + 0.4, 0);
Q(rug(1), 0, -0.2, 0);
Q("crates", Rr - 0.7, B + 0.7, 0);
if (!lite)
Q(on(wd("kf_radio"), 1.1, true), Rr - 0.7, B + 0.7, 0);
Q("stove", Rr - 0.5, 0.2, -Math.PI / 2);
Q("barrel", Rr - 0.5, D / 2 - 1.2, 0);
Q("lantern", L + 0.4, D / 2 - 0.9, 0);
Q(wd("qf_shelfsmall1"), 0, B + 0.15, 0);
if (W > 4.5)
Q("table", 0.4, 0.6, 0);
spots.push({ x: 0, z: 0, room: "home" });
}
var makeInterior0 = makeInterior;
makeInterior = function (spec) {
var was = { spec: HW.spec, home: HW.home };
HW.spec = spec;
HW.home = isHome(spec);
HW.count = {};
HW.style = HW_STYLE[spec && spec.archetype] || "";
HW.poor = !!HW_POOR[spec && spec.archetype];
var plot = (typeof hlPlotOf === "function") ? hlPlotOf(spec) : null, q = String((plot && plot.quarter) || "");
var great = /Northgate|Employee & Backer|Crescent|Backers/i.test(q + " " + ((plot && plot.street) || "") + " " + ((plot && plot.name) || ""));
HW.full = !plot || great;
HW.grand = great || (!plot && !!(spec && (spec.archetype === "manor" || spec.archetype === "hacienda" || spec.archetype === "palace")));
HW.media = (typeof homeMediaWanted === "function") && homeMediaWanted(spec);
if (HW.home) {
HW.p = pal(spec);
HW.seed = HW.p.seed;
}
try {
var I = makeInterior0.apply(this, arguments);
if (HW.home && I)
try {
fillBays(I, spec);
}
catch (e) { }
return I;
}
finally {
HW.spec = was.spec;
HW.home = was.home;
}
};
function fillBays(I, spec) {
var plan = planOf(spec);
if (!plan || plan.mode !== "rooms" || !I.root || !I.W || !I.D)
return;
var big = (spec.inside && spec.inside.big) ? 1.6 : (plan.big || 1), rd = 6 * big, hall = 5.2, W = I.W, D = I.D;
var FLOOR = (plan.h || INT_H) + 0.5, lite = (typeof LITE !== "undefined" && LITE);
var levels = I.levels || 1;
for (var L = 0; L < levels; L++) {
[-1, 1].forEach(function (sd) {
var end = -D / 2;
(I.spots || []).forEach(function (q) { if ((q.level || 0) === L && q.room && q.room !== "hallway" && Math.sign(q.x) === sd && Math.abs(q.x) > hall / 2)
end = Math.max(end, q.z - rd * 0.2 + rd / 2); });
var z0 = end + 0.15, z1 = D / 2 - 0.15, depth = z1 - z0;
if (depth < 2.2)
return;
var xin = sd * (hall / 2 + 0.2), xout = sd * (W / 2 - 0.15), y = L * FLOOR, zm = (z0 + z1) / 2;
var inward = -sd * Math.PI / 2;
function Q(k, x, z, rot, solid) {
if (!k || !FURN[k])
return;
var it = FURN[k]();
it.userData.furn = k;
it.position.set(x, y, z);
it.rotation.y = rot || 0;
I.root.add(it);
if (solid) {
var bb = furnBox(k), c = Math.abs(Math.cos(rot || 0)), s2 = Math.abs(Math.sin(rot || 0));
I.walls.push({ x: I.ox + x, z: I.oz + z, rot: 0, hw: (c * bb[0] + s2 * bb[1]) / 2, hd: (s2 * bb[0] + c * bb[1]) / 2, h: 1.2, level: L });
}
}
var xm = (xin + xout) / 2;
Q(HW.full ? rug(L + 3) : pk("rug_stripes", ["0", "1"]), xm, zm, 0, false);
Q(art(7 + L + (sd > 0 ? 1 : 0)), xout - sd * 0.03, (zm + z0) / 2, inward, false);
if (L === 0 && sd < 0) {
Q(wd("kf_coatrackstanding"), xout - sd * 0.5, z1 - 0.5, 0, false);
Q(pk("kf_benchcushion", [HW.p.fab, "navy"]) || wd("kf_bench"), xm, z1 - 0.35, Math.PI, true);
Q(wd("kf_sidetabledrawers"), xout - sd * 0.3, zm, inward, true);
Q("plant", xout - sd * 0.45, z0 + 0.45, 0, false);
if (HW.full) {
if (!lite)
Q(on(mt("kf_lamproundtable"), 0.94), xout - sd * 0.3, zm - 0.4, inward, false);
Q(wd("clock_grandfather"), xin + sd * 0.35, z0 + 0.35, 0, true);
Q("plant", xin + sd * 0.45, z1 - 0.45, 0, false);
}
}
else if (L === 0) {
if (HW.full) {
Q(rug(1), xm, zm, 0, false);
Q(fab("kf_loungechair"), xm, z0 + 0.6, 0, true);
Q(pk("kf_loungechair", [HW.p.fab2, HW.p.fab]), xm, z1 - 0.6, Math.PI, true);
Q(wd("kf_sidetable"), xout - sd * 0.35, zm, inward, true);
if (!lite)
Q(on(mt("kf_lamproundtable"), 0.5), xout - sd * 0.35, zm, inward, false);
Q("bookshelf", xout - sd * 0.25, zm - 1.9 > z0 + 0.8 ? zm - 1.9 : zm + 1.9, inward, true);
Q(wd("clock_grandfather"), xout - sd * 0.3, z1 - 0.35, inward, true);
if (HW.grand)
Q(mt("qf_lightchandelier"), xm, zm, 0, false);
}
else {
Q(pk("kf_chair", ["pine", "white", "oak"]), xm, zm, inward, false);
Q("plant", xout - sd * 0.45, z1 - 0.45, 0, false);
Q("bookshelf", xout - sd * 0.25, z0 + 1.2, inward, true);
Q("plant", xin + sd * 0.45, z1 - 0.45, 0, false);
}
}
else {
Q(wd("kf_bookcasecloseddoors"), xout - sd * 0.3, zm, inward, true);
Q("plant", xout - sd * 0.45, z1 - 0.45, 0, false);
if (HW.full) {
Q(fab("kf_loungechair"), xm, z0 + 0.6, 0, true);
Q(mt("kf_lamproundfloor"), xout - sd * 0.3, z0 + 0.35, 0, false);
Q(wd("kf_bookcaseopenlow"), xin + sd * 0.3, zm, -inward, true);
}
else
Q(pk("kf_chair", ["pine", "white", "oak"]), xm, z0 + 0.5, 0, false);
}
});
}
}
var furnishRoom0 = furnishRoom;
furnishRoom = function (kind, xc, zc, w, d, sd, put) {
if (HW.home && ROOM[kind]) {
try {
var set = (!HW.full && !HW.poor && MIN[kind]) ? MIN[kind] : ROOM[kind];
set(roomer(xc, zc, w, d, sd, put));
return;
}
catch (e) {
if (typeof console !== "undefined")
console.warn("home room", kind, e);
}
}
if (HW.home && kind === "hallway") {
furnishRoom0.apply(this, arguments);
if (typeof put === "function" && FURN[wd("kf_coatrackstanding")])
put(wd("kf_coatrackstanding"), xc - w / 2 + 0.5, zc + d / 2 - 0.5, 0);
return;
}
return furnishRoom0.apply(this, arguments);
};
if (typeof roomsByLevel === "function") {
var roomsByLevel0 = roomsByLevel;
roomsByLevel = function (rooms, levels) {
if (HW.home && levels === 1)
return [rooms.slice()];
var out = roomsByLevel0.apply(this, arguments);
if (HW.home && out && out.length > 1) {
var total = 0;
out.forEach(function (l) { total += l.length; });
var per = Math.ceil(total / out.length), pref = ["study", "bathroom", "bedroom", "nursery", "dining", "living"];
for (var guard = 0; guard < 40 && out[0].length < per; guard++) {
var from = -1, most = 0;
for (var L = 1; L < out.length; L++)
if (out[L].length > most && out[L].length > 1) {
most = out[L].length;
from = L;
}
if (from < 0)
break;
var list = out[from], pick = -1;
for (var pi = 0; pi < pref.length && pick < 0; pi++)
pick = list.indexOf(pref[pi]);
if (pick < 0)
pick = list.length - 1;
out[0].push(list.splice(pick, 1)[0]);
}
}
return out;
};
}
if (typeof fillHall === "function") {
var fillHall0 = fillHall;
fillHall = function (kind, W, D, put, spots) {
if (HW.home && (HW.poor || kind === "cozy")) {
try {
cozy(W, D, put, spots);
return;
}
catch (e) { }
}
return fillHall0.apply(this, arguments);
};
}
HW.x = { pk: pk, fab: fab, wd: wd, mt: mt, st: st, art: art, rug: rug, on: on, solidify: solidify, ROOM: ROOM, MIN: MIN };
})();
function hwRugLift(I) { return __ZC(283, 0, this, arguments, new.target); }
(function () {
function wrap() {
if (typeof makeInterior !== "function" || makeInterior.hwRug)
return;
var mk = makeInterior;
makeInterior = function () { var I = mk.apply(this, arguments); try {
hwRugLift(I);
}
catch (e) { } return I; };
makeInterior.hwRug = 1;
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", wrap);
else
wrap();
})();
