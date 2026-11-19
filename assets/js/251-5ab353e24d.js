/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TY_KEY = "The Transport Yard";
var TY = { near: null, card: null, item: null, prices: null, pricesAt: 0, board: null, boardAt: 0, boardBusy: false, missing: false,
fig: null, figFor: null, drive: null, trying: null, said: 0, msg: "", showroom: null, lot: [] };
var TY_DRIVE_SECS = 240, TY_TRY_SECS = 120;
var TY_STAFF = [[1950, "Yard manager", 1], [1951, "Vehicle salesperson", 3], [1952, "Finance clerk", 1], [1953, "Yard mechanic", 2], [1954, "Lot attendant", 2]];
var TY_NAMES = ["Tobias Reed", "Marguerite Vance", "Ezra Holloway", "Priya Castell", "Dominic Ashby", "Rosalind Fairweather", "Silas Brennan", "Imogen Hart"];
cityWorkplace({ key: TY_KEY, ring: "markets", arch: "carshowroom", s: 1, jobs: TY_STAFF.map(function (s) { return s[0]; }), fit: [],
note: "The city's vehicle dealership: everything there is to get about on, from a skateboard to a dragon. Salespeople, test drives, finance, and a service bay." });
S("carshowroom", "structure", [30, 8, 18], [
{ g: "box", s: [30.6, .3, 18.6], p: [0, .15, 0], c: 0xD9D6CE },
{ g: "box", s: [30, 7, 6], p: [0, 3.5, -6], c: 0xE9E7E1 },
{ g: "box", s: [.4, 7, 12.2], p: [-14.8, 3.5, 3], c: 0xE9E7E1 },
{ g: "box", s: [.4, 7, 12.2], p: [14.8, 3.5, 3], c: 0xE9E7E1 },
{ g: "box", s: [29.2, .06, 11.8], p: [0, .33, 3], c: 0xF2EFE8 },
{ g: "box", s: [29, .08, 11.6], p: [0, 6.3, 3], c: 0xFFF6E4, glow: 1 },
{ g: "box", s: [29.2, 6.2, .12], p: [0, 3.4, 8.9], c: "glass" },
{ g: "box", s: [.12, 6.2, 11.6], p: [-14.55, 3.4, 3.1], c: "glass" },
{ g: "box", s: [.12, 6.2, 11.6], p: [14.55, 3.4, 3.1], c: "glass" },
{ g: "box", s: [.2, 6.6, .28], p: [-14.4, 3.4, 9], c: 0x30343C, rep: [9, 3.6, 0, 0] },
{ g: "box", s: [29.4, .25, .3], p: [0, 6.6, 9], c: 0x30343C },
{ g: "box", s: [3.4, 2.9, .18], p: [0, 1.45, 9.02], c: "dark" },
{ g: "box", s: [3.6, .12, .24], p: [0, 2.95, 9.04], c: 0xC9A040 },
{ g: "box", s: [31.6, .7, 21], p: [0, 7.35, 1.3], c: 0x2C313A },
{ g: "box", s: [31.6, 1.5, .35], p: [0, 7.1, 11.6], c: 0x2C313A },
{ g: "box", s: [28, .14, .14], p: [0, 6.35, 10.9], c: 0xFFF0D0, glow: 1 },
{ g: "cyl", s: [.28, .28, 7, 12], p: [-15.4, 3.5, 11.2], c: 0xD8D4CC },
{ g: "cyl", s: [.28, .28, 7, 12], p: [15.4, 3.5, 11.2], c: 0xD8D4CC },
{ g: "box", s: [.18, 4.2, 4.6], p: [15.05, 2.1, -6], c: 0x8A8E96 },
{ g: "box", s: [.2, .12, 4.6], p: [15.1, .6, -6], c: 0x6A6E76, rep: [8, 0, .45, 0] },
{ g: "box", s: [.2, .5, 5.2], p: [15.1, 4.5, -6], c: 0xE0B030 },
{ g: "box", s: [6, 1.6, .3], p: [-9, 4.8, -9.1], c: 0x2C313A },
{ g: "box", s: [5.6, 1.2, .32], p: [-9, 4.8, -9.12], c: 0xF2EEE2 }
], ["car showroom", "showroom", "car dealership", "dealership", "car lot", "car dealer", "motor showroom", "vehicle dealership"], { sign: [0, 7.1, 11.8, 15, 1.1] });
S("carplinth", "infra", [6.4, .6, 6.4], [
{ g: "cyl", s: [3.2, 3.3, .45, 28], p: [0, .22, 0], c: 0xE4E0D8 },
{ g: "cyl", s: [3.0, 3.0, .06, 28], p: [0, .48, 0], c: 0x30343C },
{ g: "cyl", s: [3.36, 3.36, .08, 28], p: [0, .4, 0], c: 0xC9A040 }
], ["car plinth", "display plinth"]);
(function () {
if (typeof modelWanted !== "function")
return;
var mw = modelWanted;
modelWanted = function (spec) {
if (spec && (spec.yardItem || spec.showcar) && typeof modelsOn === "function" && modelsOn() && !(spec.attrs && spec.attrs.noModel))
return true;
return mw.apply(this, arguments);
};
})();
if (typeof PLANS !== "undefined")
PLANS.carshowroom = { mode: "hall", w: 28, d: 17, fill: "works", wall: 0xEEECE6, floor: "marble", h: 6 };
if (typeof ATL_WALKTHROUGH !== "undefined")
ATL_WALKTHROUGH.carplinth = 0;
var TY_LOTKINDS = { skateboard: 1, bicycle: 1, horse: 1, car: 1, truck: 1, bus: 1, broomstick: 1, flyingcarpet: 1, sleigh: 1, firechariot: 1, hovercar: 1, shuttle: 1,
saucer: 1, unicorn: 1, pegasus: 1, griffin: 1, kitsune: 1, dragon: 1 };
function tyGap() { var g = (typeof atlGaps === "function") ? atlGaps(1080 + 30, 10, 6) : null; return g && g[4]; }
cityMore("xty", function (C) {
TY.showroom = null;
TY.lot = [];
var g = tyGap();
if (!g)
return;
var am = (g.a0 + g.a1) / 2, rb = 1158;
var sp = C.at("carshowroom", rb, am, rotIn(am), TY_KEY, { c: 0xE9E7E1 }, { workplace: TY_KEY, sign: TY_KEY });
if (!sp)
return;
C.workplaces[TY_KEY] = { x: sp.x, z: sp.z, id: sp.id };
TY.showroom = { id: sp.id, x: sp.x, z: sp.z, a: am, rb: rb };
[-1, 1].forEach(function (sd) {
var a = am + sd * 12.5 / 1141;
C.at("carplinth", 1141, a, 0, null, {});
C.at(sd < 0 ? "sportscar" : "coupe", 1141, a, rotIn(a) + sd * 0.6, null, { c: sd < 0 ? 0xB0202A : 0x2A4A8A }, { y: 0.5, showcar: true });
});
C.sign(C.kerb(1080, 1), am + 0.0186, rotIn(am), TY_KEY + ": showroom, sales and test drives", "Walk up to anything on the lot and a salesperson comes over. The showroom behind has the salespeople's desks, finance and the service bay.");
C.sign(1146, am + 19 / 1146, rotIn(am), "Test drives", "Ask a salesperson on the lot. A driving licence for anything on the road, a flying licence for anything that flies.");
[-3, -1, 1, 3].forEach(function (k) { C.at("bannerpole", 1146, am + k * 4.2 / 1146, rotIn(am)); });
C.at("flowerbed", 1147, am - 8 / 1147, rotIn(am));
C.at("flowerbed", 1147, am + 8 / 1147, rotIn(am));
var boards = store.objects.filter(function (o) { return o.realm === C.r.id && o.forSale && o.archetype === "signboard"; });
boards.forEach(function (b) {
var bx = b.x - C.h.x, bz = b.z - C.h.z, br = Math.hypot(bx, bz), ba = Math.atan2(bz, bx), best = null, bd = 4;
store.objects.forEach(function (o) {
if (o.realm !== C.r.id || o === b || !TY_LOTKINDS[o.archetype] || o.showcar)
return;
var ox = o.x - C.h.x, oz = o.z - C.h.z, d = Math.abs(Math.hypot(ox, oz) - (br + 8)) + Math.abs(atlWrap(Math.atan2(oz, ox) - ba)) * br;
if (d < bd) {
bd = d;
best = o;
}
});
if (best) {
best.yardItem = b.forSale;
best.home = { x: best.x, z: best.z, rot: best.rot };
TY.lot.push(best);
}
});
});
(function () {
if (typeof bakeSkipObject !== "function")
return;
var bs = bakeSkipObject;
bakeSkipObject = function (o, g) { return (o && o.yardItem) ? true : bs(o, g); };
})();
function tyShowroom() {
if (TY.showroom && typeof specById === "function" && specById(TY.showroom.id))
return TY.showroom;
var sp = typeof cityPlaceOf === "function" ? cityPlaceOf(TY_KEY) : null;
if (!sp)
return null;
TY.showroom = { id: sp.id, x: sp.x, z: sp.z };
return TY.showroom;
}
function tyLot() {
if (TY.lot.length && TY.lotAt && Date.now() - TY.lotAt < 5000)
return TY.lot;
TY.lotAt = Date.now();
if (TY.lot.length && specById(TY.lot[0].id))
return TY.lot;
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
TY.lot = r ? store.objects.filter(function (o) { return o.realm === r.id && o.yardItem; }) : [];
return TY.lot;
}
(function () {
if (typeof trPiece !== "function" || typeof FURN === "undefined")
return;
var CHROME = function () { return trM(0xC8CCD2, null, "shine"); }, DARK = function () { return trM(0x2C313A, null, "shine"); };
function showCar(arch, col) {
return function () {
var G = new THREE.Group();
trC(G, 2.7, 2.8, 0.3, 28, trM(0xE4E0D8, null, "shine"), 0, 0.15, 0);
trC(G, 2.55, 2.55, 0.04, 28, DARK(), 0, 0.31, 0);
try {
var spec = { id: "__show_" + arch, archetype: arch, attrs: { c: col }, solid: false, detail: 4, nights: [], city: true };
var car = build(spec);
car.position.y = 0.33;
car.rotation.y = 0.5;
car.traverse(function (m) { m.raycast = function () { }; });
if (typeof modelDress === "function")
modelDress(car, { id: "__show_" + arch, archetype: arch, attrs: { c: col }, solid: true, placed: true, city: true });
G.add(car);
}
catch (e) { }
return G;
};
}
trPiece("tyshowcar", 5.6, 5.6, true, showCar("sportscar", 0xB0202A));
trPiece("tyshowcar2", 5.6, 5.6, true, showCar("car", 0x2E5A3A));
trPiece("tyshowcar3", 5.6, 5.6, true, showCar("coupe", 0xE8E4DA));
trPiece("tyflystand", 3, 1.4, true, function () {
var g = new THREE.Group(), w = TR_WOODD(), b = TR_BRASS();
trB(g, 3, 0.12, 1.2, trM(0x3A2A4A), 0, 0.06, 0);
[-0.9, 0.9].forEach(function (x) { trC(g, 0.04, 0.04, 1, 8, b, x, 0.6, 0); trC(g, 0.08, 0.08, 0.06, 8, b, x, 1.1, 0); });
trC(g, 0.035, 0.035, 1.9, 8, trM(0x8A5A2A, "wood"), 0, 1.16, 0, 0, 0, Math.PI / 2);
trC(g, 0.05, 0.2, 0.6, 12, trM(0xC8A050), 1.15, 1.16, 0, 0, 0, Math.PI / 2);
trB(g, 1.6, 0.04, 1, trM(0x8A2A3A), -0.1, 0.5, 0.0);
trB(g, 1.5, 0.045, 0.9, trM(0xC9A040), -0.1, 0.51, 0.0);
trB(g, 1.2, 0.05, 0.65, trM(0x2A3A6A), -0.1, 0.52, 0.0);
return trDone(g);
});
trPiece("tysalesdesk", 1.8, 0.9, true, function () {
var g = new THREE.Group(), top = trM(0xF4F2EE, null, "shine"), leg = CHROME();
trB(g, 1.8, 0.06, 0.9, top, 0, 0.76, 0);
[-0.82, 0.82].forEach(function (x) { trB(g, 0.06, 0.74, 0.8, leg, x, 0.37, 0); });
trB(g, 1.7, 0.5, 0.03, trM(0xD8D4CC), 0, 0.45, 0.4);
trB(g, 0.55, 0.36, 0.03, DARK(), -0.35, 1.04, -0.25);
trB(g, 0.08, 0.18, 0.08, DARK(), -0.35, 0.85, -0.25);
trB(g, 0.5, 0.32, 0.01, trM(0x7AA8D8, null, "glow"), -0.35, 1.04, -0.235);
trB(g, 0.42, 0.02, 0.15, trM(0x2C2C30), -0.35, 0.8, -0.02);
[[0.35, 0xB0202A], [0.5, 0x2A4A8A], [0.65, 0xE8E4DA]].forEach(function (p) { trB(g, 0.2, 0.012, 0.28, trM(p[1]), p[0], 0.8, 0.05, 0, 0.2, 0); });
trC(g, 0.05, 0.05, 0.12, 10, trM(0xF2EEE2), 0.6, 0.85, -0.25);
return trDone(g);
});
trPiece("tymgrdesk", 2.2, 1, true, function () {
var g = new THREE.Group(), top = trM(0x3A2A1E, "wood"), leg = TR_WOODD();
trB(g, 2.2, 0.08, 1, top, 0, 0.76, 0);
trB(g, 0.08, 0.72, 0.9, leg, -1.04, 0.36, 0);
trB(g, 0.08, 0.72, 0.9, leg, 1.04, 0.36, 0);
trB(g, 2.1, 0.6, 0.04, leg, 0, 0.42, 0.45);
trB(g, 0.55, 0.36, 0.03, DARK(), -0.5, 1.04, -0.3);
trB(g, 0.5, 0.32, 0.01, trM(0x7AA8D8, null, "glow"), -0.5, 1.04, -0.285);
trB(g, 0.4, 0.1, 0.06, TR_BRASS(), 0.4, 0.85, 0.35);
trB(g, 0.32, 0.08, 0.14, trM(0xB0202A, null, "shine"), 0.75, 0.84, -0.1);
trB(g, 0.18, 0.06, 0.12, trM(0x9FC4E8, "", ""), 0.75, 0.9, -0.1);
return trDone(g);
});
trPiece("tyfinancedesk", 1.6, 0.8, true, function () {
var g = new THREE.Group(), top = trM(0xF4F2EE, null, "shine"), leg = CHROME();
trB(g, 1.6, 0.06, 0.8, top, 0, 0.76, 0);
[-0.72, 0.72].forEach(function (x) { trB(g, 0.06, 0.74, 0.7, leg, x, 0.37, 0); });
trB(g, 0.36, 0.03, 0.26, trM(0x2E4A6A), -0.3, 0.8, 0);
trB(g, 0.18, 0.03, 0.24, DARK(), 0.1, 0.8, -0.1);
trB(g, 0.3, 0.01, 0.4, trM(0xF2EEE2), 0.45, 0.8, 0.05);
trB(g, 0.55, 0.36, 0.03, DARK(), 0.3, 1.04, -0.3);
trB(g, 0.5, 0.32, 0.01, trM(0x7AA8D8, null, "glow"), 0.3, 1.04, -0.285);
return trDone(g);
});
trPiece("typriceboard", 3.4, 0.12, false, function () {
var g = new THREE.Group();
trB(g, 3.4, 1.9, 0.05, DARK(), 0, 1.9, -0.03);
trB(g, 3.2, 0.24, 0.02, TR_BRASS(), 0, 2.68, 0.0);
for (var i = 0; i < 6; i++) {
trB(g, 1.9, 0.07, 0.02, trM(0xF2EEE2), -0.55, 2.38 - i * 0.24, 0.0);
trB(g, 0.5, 0.07, 0.02, trM(0xE0C060), 1.15, 2.38 - i * 0.24, 0.0);
}
return trDone(g);
});
trPiece("tycarlift", 4.6, 2.8, true, function () {
var g = new THREE.Group(), y = trM(0xE0B030, null, "shine"), ir = TR_IRON();
[-1.8, 1.8].forEach(function (x) { trB(g, 0.3, 3.2, 0.3, y, x, 1.6, 0); trB(g, 0.5, 0.1, 0.5, ir, x, 0.05, 0); trB(g, 0.12, 0.08, 1.5, ir, x * 0.8, 1.45, 0); });
trB(g, 3.6, 0.12, 0.2, y, 0, 3.15, 0);
try {
var car = build({ id: "__lift_car", archetype: "van", attrs: { c: 0xF2EEE2 }, solid: false, detail: 4, nights: [], city: true });
car.position.y = 1.5;
car.rotation.y = Math.PI / 2;
car.traverse(function (m) { m.raycast = function () { }; });
if (typeof modelDress === "function")
modelDress(car, { id: "__lift_car", archetype: "van", attrs: { c: 0xF2EEE2 }, solid: true, placed: true, city: true });
g.add(car);
}
catch (e) { }
trB(g, 4.6, 0.02, 2.8, trM(0x5A5E66), 0, 0.01, 0);
return g;
});
trPiece("tytyres", 2.4, 0.7, true, function () {
var g = new THREE.Group(), r = trM(0x1E1E22), ir = TR_IRON();
trB(g, 2.4, 0.06, 0.6, ir, 0, 0.75, 0);
trB(g, 2.4, 0.06, 0.6, ir, 0, 1.55, 0);
[-1.15, 1.15].forEach(function (x) { trB(g, 0.06, 1.9, 0.6, ir, x, 0.95, 0); });
for (var i = 0; i < 4; i++) {
trC(g, 0.34, 0.34, 0.24, 16, r, -0.8 + i * 0.53, 0.45, 0, Math.PI / 2, 0, 0);
trC(g, 0.34, 0.34, 0.24, 16, r, -0.8 + i * 0.53, 1.25, 0, Math.PI / 2, 0, 0);
}
return trDone(g);
});
trPiece("tytoolchest", 1.2, 0.6, true, function () {
var g = new THREE.Group(), red = trM(0xB0202A, null, "shine"), ir = TR_IRON();
trB(g, 1.2, 1.0, 0.6, red, 0, 0.6, 0);
for (var i = 0; i < 5; i++)
trB(g, 1.1, 0.03, 0.02, ir, 0, 0.25 + i * 0.18, 0.31);
trB(g, 1.2, 0.05, 0.6, ir, 0, 1.12, 0);
[-0.5, 0.5].forEach(function (x) { trC(g, 0.06, 0.06, 0.05, 10, ir, x, 0.06, 0.2, Math.PI / 2, 0, 0); trC(g, 0.06, 0.06, 0.05, 10, ir, x, 0.06, -0.2, Math.PI / 2, 0, 0); });
return trDone(g);
});
trPiece("tywashbay", 1.6, 0.8, true, function () {
var g = new THREE.Group(), y = trM(0xE0B030, null, "shine");
trB(g, 0.6, 0.8, 0.5, y, -0.4, 0.4, 0);
trC(g, 0.05, 0.05, 1.2, 8, trM(0x2C2C30), -0.4, 1.3, 0);
trC(g, 0.22, 0.18, 0.35, 12, trM(0x3A6AB0), 0.3, 0.18, 0);
trB(g, 0.6, 0.02, 0.4, trM(0xE8E4DA), 0.4, 0.8, 0.0);
trB(g, 0.2, 0.3, 0.2, trM(0x2E8A5A), 0.6, 0.15, 0.2);
return trDone(g);
});
["tyshowcar", "tyshowcar2", "tyshowcar3", "tyflystand", "tysalesdesk", "tymgrdesk", "tyfinancedesk", "typriceboard", "tycarlift", "tytyres", "tytoolchest", "tywashbay"].forEach(function (k) {
FURN[k] = TR_PIECES[k];
if (TR_PIECES[k].solid && typeof SOLIDFURN !== "undefined")
SOLIDFURN[k] = 1;
});
try {
TEMP_WORK = new RegExp(TEMP_WORK.source + "|tysalesdesk|tymgrdesk|tyfinancedesk|tycarlift|tytyres|tytoolchest|tywashbay");
TEMP_PREFER.unshift([/yard manager/i, /tymgrdesk/], [/vehicle salesperson/i, /tysalesdesk/], [/finance clerk/i, /tyfinancedesk/], [/yard mechanic/i, /tycarlift|tytoolchest|tytyres/], [/lot attendant/i, /tywashbay|tytyres/]);
}
catch (e) { }
})();
if (typeof TR !== "undefined")
TR[TY_KEY] = function (K) { return __ZC(251, 0, this, arguments, new.target); };
if (typeof ROOMNAME !== "undefined")
ROOMNAME["tr:" + TY_KEY] = "The showroom";
(function () {
if (typeof tempsPlan !== "function")
return;
var tp = tempsPlan;
tempsPlan = function (rows) {
if (Array.isArray(rows) && rows.length && !rows.some(function (r) { return r.workplace === TY_KEY; })) {
rows = rows.concat(TY_STAFF.map(function (s) { return { job_id: s[0], title: s[1], positions: s[2], taken: 0, workplace: TY_KEY, panel: null, roams: false }; }));
}
return tp.call(this, rows);
};
})();
(function () {
if (typeof PH_CATS === "undefined")
return;
PH_CATS.forEach(function (c) { if (/^Travel/.test(c[0])) {
c[1] = new RegExp(c[1].source.replace(")$", "|carshowroom)$"));
c[2] = /transport yard/i;
} });
})();
function tyKindOf(arch) {
if (typeof VEH !== "undefined" && VEH[arch])
return "road";
if (typeof FLYER !== "undefined" && FLYER[arch])
return "fly";
if (/^(skateboard|bicycle|horse|unicorn|kitsune)$/.test(arch))
return "try";
return "look";
}
function tyLicOf(arch) { var k = tyKindOf(arch); return k === "road" ? ((VEH[arch] && VEH[arch].lic) || null) : (k === "fly" ? "flying" : null); }
function tyPrices() { return __ZC(251, 1, this, arguments, new.target); }
function tyBoard() { return __ZC(251, 2, this, arguments, new.target); }
function tyStandIn() {
var id = String((typeof myUserId === "function" && myUserId()) || "x") + (Date.now() / 86400000 | 0), h = 0;
for (var i = 0; i < id.length; i++)
h = (h * 31 + id.charCodeAt(i)) >>> 0;
return TY_NAMES[h % TY_NAMES.length];
}
function tySeller() {
var b = TY.board, L = (b && b.salespeople) || [];
if (L.length) {
var me = typeof myUserId === "function" ? myUserId() : null, o = L.filter(function (s) { return s.id !== me; })[0];
if (o)
return { name: o.name, id: o.id, player: true };
}
return { name: tyStandIn(), id: null, player: false };
}
function tyFigure(nm) { return __ZC(251, 3, this, arguments, new.target); }
function tyFigShow(nm, x, z, face) { return __ZC(251, 4, this, arguments, new.target); }
function tyFigHide() { if (TY.fig) {
if (TY.fig.parent)
TY.fig.parent.remove(TY.fig);
TY.fig.visible = false;
} }
function tyFigBeside() { return __ZC(251, 5, this, arguments, new.target); }
function tyFigSeat(nm) { return __ZC(251, 6, this, arguments, new.target); }
var TY_PACE = 0;
yardTick = function (dt) {
if (typeof yardCool !== "undefined" && yardCool > 0)
yardCool -= dt;
TY_PACE -= dt;
if (TY_PACE > 0)
return;
TY_PACE = 0.2;
var P = camera.position, found = null;
if (walkMode && !store.inside && !(typeof DRIVE !== "undefined" && DRIVE.on)) {
var L = tyLot(), bd = 4.6;
for (var i = 0; i < L.length; i++) {
var o = L[i];
if (o.yardDrive)
continue;
var b = o.home || o;
var d = Math.hypot(b.x - P.x, b.z - P.z);
if (d < bd) {
bd = d;
found = o;
}
}
if (!found) {
for (var j = 0; j < store.objects.length; j++) {
var q = store.objects[j];
if (!q.forSale || (q.realm || 0) !== (store.here || 0))
continue;
if (Math.abs(q.x - P.x) > 4 || Math.abs(q.z - P.z) > 4)
continue;
if (Math.hypot(q.x - P.x, q.z - P.z) < 3.6) {
found = L.filter(function (o) { return o.yardItem === q.forSale; })[0] || { yardItem: q.forSale, archetype: null, x: q.x, z: q.z, board: true };
break;
}
}
}
}
var was = TY.near;
TY.near = found;
yardNear = found ? { forSale: found.yardItem } : null;
if (found && (!was || was.yardItem !== found.yardItem)) {
TY.item = found;
tyPrices().then(function (m) {
if (TY.near !== found)
return;
var it = m[found.yardItem];
setStatus("<b>" + esc(found.yardItem) + "</b>" + (it ? " · " + Number(it.price).toLocaleString() + " gold" : "") + ". A salesperson comes over: <b>press E</b> or tap the card.");
tyBoard().then(function () { if (TY.near === found)
tyFigBeside(); });
});
}
if (!found && was) {
if (TY.card === "item")
worldCard(null), TY.card = null;
if (!TY.drive && !TY.trying)
tyFigHide();
}
};
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
if (typeof INT !== "undefined" && INT && INT.spec && INT.spec.workplace === TY_KEY && typeof tsPrompt === "function") {
tsPrompt("<b>The Transport Yard</b> · the showroom · <b>press E</b> (or tap here) for every vehicle and its price", function () { tyListOpen(); });
return;
}
if (TY.near && !(typeof INT !== "undefined" && INT) && typeof tsPrompt === "function") {
var n = TY.near.yardItem;
tsPrompt("<b>" + esc(n) + "</b> · <b>press E</b> (or tap here) to talk to the salesperson", function () { tyItemOpen(TY.near); });
return;
}
return tt.apply(this, arguments);
};
})();
function tyMoney(n) { return Number(n || 0).toLocaleString() + " gold"; }
function tyItemOpen(o) {
if (!o)
return;
TY.item = o;
TY.msg = "";
Promise.all([tyPrices(), tyBoard()]).then(function (r) { tyItemPaint(); });
tyItemPaint();
}
function tyItemPaint() { return __ZC(251, 7, this, arguments, new.target); }
function tyListOpen() { return __ZC(251, 8, this, arguments, new.target); }
function tyShowMe(name) { return __ZC(251, 9, this, arguments, new.target); }
(function () {
if (typeof guideTick !== "function")
return;
var gt = guideTick;
guideTick = function () {
if (guideTo && guideTo.yard && walkMode && !store.inside) {
var P = camera.position;
if (Math.hypot(guideTo.x - P.x, guideTo.z - P.z) < 14) {
var n = guideTo.yard;
guideTo = null;
var el = document.getElementById("guide");
if (el)
el.style.display = "none";
setStatus("<b>Here it is:</b> the " + esc(n.toLowerCase()) + ". Walk up to it and a salesperson comes over.");
return;
}
}
return gt.apply(this, arguments);
};
})();
function tyBuy(name) { return __ZC(251, 10, this, arguments, new.target); }
function yardBuyRow(item) { tyBuy(item.name); }
function tyDriveStart(o) { return __ZC(251, 11, this, arguments, new.target); }
function tyPark(o) { return __ZC(251, 12, this, arguments, new.target); }
function tyDriveEnd(why) { return __ZC(251, 13, this, arguments, new.target); }
(function () {
if (typeof vehicleLeave !== "function")
return;
var vl = vehicleLeave;
vehicleLeave = function () {
var T = TY.drive, o = T && DRIVE.on && DRIVE.spec === T.o ? T.o : null;
var r = vl.apply(this, arguments);
if (o && !DRIVE.on)
tyDriveEnd("left");
return r;
};
})();
function tyDriveTick() {
var T = TY.drive;
if (!T)
return;
if (!(typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.spec === T.o)) {
tyDriveEnd("left");
return;
}
if (!T.fly && TY.fig && typeof rideG !== "undefined" && rideG && TY.fig.parent !== rideG)
tyFigSeat(T.seller);
var left = (T.until - Date.now()) / 1000;
if (left < 60 && T.warn < 1) {
T.warn = 1;
driveNote("One minute left: head back to the yard", 5);
setStatus("<b>One minute left on the test " + (T.fly ? "flight" : "drive") + ".</b> Head back to the Transport Yard on the Market Ring.");
}
if (left < 0 && T.warn < 2) {
T.warn = 2;
driveNote("Time is up: back to the yard", 6);
setStatus("<b>The test " + (T.fly ? "flight" : "drive") + " is over.</b> " + esc(T.seller) + " asks you to bring it back to the yard now.");
}
if (left < -120 && T.warn < 3 && !T.fly && DRIVE.v < 1) {
T.warn = 3;
if (typeof vehicleEnd === "function")
vehicleEnd();
if (typeof rideArch !== "undefined")
rideArch = null;
try {
var Lk = meLook();
Lk.ride = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
tyDriveEnd("late");
}
}
function tyTryStart(o) { return __ZC(251, 14, this, arguments, new.target); }
function tyTryEnd(why) { return __ZC(251, 15, this, arguments, new.target); }
function tyTryTick() {
var T = TY.trying;
if (!T)
return;
if (riding !== T.name) {
tyTryEnd("off");
return;
}
var P = camera.position;
if (store.inside || Math.hypot(P.x - T.cx, P.z - T.cz) > 170) {
tyTryEnd("far");
return;
}
if (Date.now() > T.until)
tyTryEnd("time");
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
tyDriveTick();
tyTryTick();
}
catch (e) {
if (window.console)
console.warn("[yard]", e);
} };
})();
