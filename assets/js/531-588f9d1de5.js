/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var JBG = { tents: [], done: false };
var JBG_CANVAS = [0xF2E8D4, 0xEADCC0, 0xF0E2CC];
var JBG_FELT = [0xC8783A, 0x3A7A78, 0x8A4A6A, 0xB89A3A];
var JBG_QUILT = [0xC84A3A, 0x3A6AA8, 0xD8A030, 0x7A4A9A, 0x3A8A5A, 0xD86A9A];
function jbgRand(seed) { return ppRand(ppHash(seed)); }
function jbgWall(g, r, h, mat, gap, y) {
var seg = PP.lite ? 14 : 24, a0 = Math.PI / 2 + gap / 2, len = Math.PI * 2 - gap;
var geo = new THREE.CylinderGeometry(r, r, h, seg, 1, true, a0, len), m = new THREE.Mesh(geo, mat);
m.position.y = (y || 0) + h / 2;
g.add(m);
return m;
}
function jbgRingSolid(x, z, ry, r, gap) { return __ZC(531, 0, this, arguments, new.target); }
function jbgW(g, x, z, ry) { var c = Math.cos(ry), s = Math.sin(ry); return [g.position.x + x * c + z * s, g.position.z - x * s + z * c]; }
function jbgInside(g, ry, r, R, kind) { return __ZC(531, 1, this, arguments, new.target); }
function jbgBell(g, x, z, ry, R) { return __ZC(531, 2, this, arguments, new.target); }
function jbgYurt(g, x, z, ry, R) { return __ZC(531, 3, this, arguments, new.target); }
ppGlamp = function (G, L, x, z, ry) {
var n = JBG.tents.length, R = jbgRand("glamp" + n), g = new THREE.Group();
g.position.set(x, ppGround(x, z, 0), z);
g.rotation.y = ry;
G.add(g);
if (n % 3 === 1)
jbgYurt(g, x, z, ry, R);
else
jbgBell(g, x, z, ry, R);
JBG.tents.push({ x: x, z: z, ry: ry, r: n % 3 === 1 ? 3.3 : 3.0 });
};
function jbgFree(x, z, r) { return __ZC(531, 4, this, arguments, new.target); }
function jbgFestoon(G, L, pts, col) { return __ZC(531, 5, this, arguments, new.target); }
function jbgBunting(G, a, b) { return __ZC(531, 6, this, arguments, new.target); }
function jbgPole(G, x, z, h) { ppCyl(0.07, 0.09, h, ppM(0x6A4A30), x, h / 2, z, G, 6); ppSolidR(x, z, 0.2); }
function jbgDeckChair(G, x, z, ry, col) { return __ZC(531, 7, this, arguments, new.target); }
function jbgHammock(G, x, z, ry, col) { return __ZC(531, 8, this, arguments, new.target); }
function jbgVan(G, x, z, ry, c1, c2, R) { return __ZC(531, 9, this, arguments, new.target); }
function jbgBus(G, x, z, ry) { return __ZC(531, 10, this, arguments, new.target); }
function jbgKitchen(G, L, x, z, ry) { return __ZC(531, 11, this, arguments, new.target); }
function jbgLook(R, k) { return __ZC(531, 12, this, arguments, new.target); }
function jbgPeople(spots) { return __ZC(531, 13, this, arguments, new.target); }
function jbgField() { return __ZC(531, 14, this, arguments, new.target); }
(function () {
if (typeof ppPeople !== "function")
return;
var pe = ppPeople;
ppPeople = function () { var r = pe.apply(this, arguments); try {
jbgField();
}
catch (e) {
if (window.console)
console.warn("jubilee glamping:", e);
} return r; };
})();
var JBC = { done: false };
var JBC_BRIGHT = [0xE83A3A, 0xF0A030, 0xF0E040, 0x3AB84A, 0x3A8AE8, 0x9A4AD8, 0xE86AB8];
function jbcTex(kind, seed) { return __ZC(531, 15, this, arguments, new.target); }
function jbcTexMat(kind, seed, ds) { var m = new THREE.MeshLambertMaterial({ map: jbcTex(kind, seed), side: ds ? THREE.DoubleSide : THREE.FrontSide }); return m; }
function jbcG(G, x, z, ry) { var g = new THREE.Group(); g.position.set(x, ppGround(x, z, 0), z); g.rotation.y = ry || 0; G.add(g); return g; }
function jbcDrums(G, L, x, z) { return __ZC(531, 16, this, arguments, new.target); }
function jbcDome(G, L, x, z, ry) { return __ZC(531, 17, this, arguments, new.target); }
function jbcSpring(G, L, x, z) { return __ZC(531, 18, this, arguments, new.target); }
var JBC_TRUCKS = [["GOOD KARMA KITCHEN", "Veggie bowls · dal · flatbread", 0x3AB84A], ["THE KOMBUCHA BUS", "Kombucha · chai · iced hibiscus", 0xE86AB8], ["SUNSHINE SMOOTHIES", "Mango lassi · green juice · açaí", 0xF0A030], ["CRÊPE ESCAPE", "Sweet and savoury crêpes", 0x3A8AE8]];
function jbcTruck(G, L, x, z, ry, T, i) { return __ZC(531, 19, this, arguments, new.target); }
PP_TRUCKS["GOOD KARMA KITCHEN"] = [["pp_hp_bowl", "Rainbow veggie bowl", 7, 45, 0, 0], ["pp_hp_dal", "Dal and warm flatbread", 6, 40, 0, 0], ["pp_hp_falafel", "Falafel wrap", 6, 40, 0, 0]];
PP_TRUCKS["THE KOMBUCHA BUS"] = [["pp_hp_kombucha", "Ginger kombucha", 4, 0, 30, 0], ["pp_hp_chai", "Masala chai", 3, 5, 30, 0], ["pp_hp_hibiscus", "Iced hibiscus tea", 3, 0, 35, 0]];
PP_TRUCKS["SUNSHINE SMOOTHIES"] = [["pp_hp_lassi", "Mango lassi", 4, 10, 30, 0], ["pp_hp_green", "Green juice", 4, 5, 30, 0], ["pp_hp_acai", "Açaí bowl", 6, 30, 10, 0]];
PP_TRUCKS["CRÊPE ESCAPE"] = [["pp_hp_crepe", "Banana and chocolate crêpe", 5, 30, 0, 0], ["pp_hp_galette", "Cheese and mushroom galette", 6, 40, 0, 0]];
var JBC_STALLS = [["TIE-DYE TRIBE", "shirts, skirts, sarongs", "tiedye"], ["BEADS & BANGLES", "necklaces, anklets, bracelets", "beads"], ["TAPESTRY TENT", "wall hangings and throws", "mandala"],
["CRYSTAL CAVE", "quartz, amethyst, geodes", "crystal"], ["MACRAMÉ & MORE", "hangers, dreamcatchers, bags", "macrame"], ["FLOWER POWER", "flower crowns and garlands", "flowers"]];
PP_SHOPS.swag = { title: "The swag market", sub: "Festival clothes and treasures from the Rainbow Meadow stalls. Everything goes into your backpack; wear what you can wear.", wear: /^(wear_(flowercrown|sunglasses|necklace|earrings|satchel|butterflywings|fairywings|faewings|catears|foxtail|sandals|scarf)|pp_swag_[a-z_]+)$/ };
function jbcStall(G, L, x, z, ry, S, i) { return __ZC(531, 20, this, arguments, new.target); }
function jbcMural(G, x, z, ry, seed) { return __ZC(531, 21, this, arguments, new.target); }
function jbcBeds(G, spots) { return __ZC(531, 22, this, arguments, new.target); }
function jbcStage(G, L, x, z) { return __ZC(531, 23, this, arguments, new.target); }
function jbcFiller(G, L) { return __ZC(531, 24, this, arguments, new.target); }
function jbcFree(x, z, r) { if (Math.hypot(x, z) > 362)
return false; return jbgFree(x, z, r); }
function jbcAt(x, z, r) { for (var k = 0; k < 12; k++) {
var a = k * 2.4, d = k * 2.2, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d;
if (jbcFree(px, pz, r))
return [px, pz];
} return null; }
function jbcMeadow() { return __ZC(531, 25, this, arguments, new.target); }
function jbcMeadowPeople() { return __ZC(531, 26, this, arguments, new.target); }
(function () {
if (typeof ppPeople !== "function")
return;
var pe = ppPeople;
ppPeople = function () { try {
jbcMeadow();
}
catch (e) {
if (window.console)
console.warn("jubilee meadow:", e);
} var r = pe.apply(this, arguments); try {
jbcMeadowPeople();
}
catch (e) {
if (window.console)
console.warn("jubilee meadow folk:", e);
} return r; };
})();
var JBP = { done: false, poi: [], cyc: [] };
function jbpFree(x, z, r) { return Math.hypot(x, z) < 362 && jbgFree(x, z, r); }
function jbpAt(x, z, r) { for (var k = 0; k < 14; k++) {
var a = k * 2.4, d = k * 2.5, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d;
if (jbpFree(px, pz, r))
return [px, pz];
} return null; }
function jbpCycle(m, hue, sp) { PP.glows.push({ m: m, cycle: true, hue: hue, sp: sp || 0.015 }); return m; }
var JBP_CH = [["Channel red: house", 0xFF5A5A], ["Channel green: disco and funk", 0x5AFF8A], ["Channel blue: chill and dub", 0x5A9AFF]];
function jbpSilent(G, L, x, z) { return __ZC(531, 27, this, arguments, new.target); }
function jbpHeadphones() { return __ZC(531, 28, this, arguments, new.target); }
function jbpForest(G, L, x, z) { return __ZC(531, 29, this, arguments, new.target); }
function jbpFire(G, L, x, z) { return __ZC(531, 30, this, arguments, new.target); }
function jbpChai(G, L, x, z, ry) { return __ZC(531, 31, this, arguments, new.target); }
PP_MENU.chai = [["pp_hp_chai", "Masala chai", 3, 5, 30, 0], ["pp_hp_mint", "Fresh mint tea", 3, 0, 30, 0], ["pp_hp_cake", "Cardamom and orange cake", 4, 25, 0, 0], ["pp_hp_dates", "Dates and almonds", 3, 15, 0, 0]];
function jbpMainField(G, L) { return __ZC(531, 32, this, arguments, new.target); }
function jbpBuild() { return __ZC(531, 33, this, arguments, new.target); }
function jbpPeople() { return __ZC(531, 34, this, arguments, new.target); }
(function () {
if (typeof ppTick !== "function")
return;
var tk = ppTick;
ppTick = function (dt) { var r = tk.apply(this, arguments); if (JBP.poi.length && typeof WLD !== "undefined" && WLD.on === "party") {
var t = (WLD.t || 0);
JBP.poi.forEach(function (P) { P.g.rotation.x = t * P.sp + P.ph; });
} return r; };
})();
(function () {
if (typeof ppPeople !== "function")
return;
var pe = ppPeople;
ppPeople = function () {
try {
jbpBuild();
}
catch (e) {
if (window.console)
console.warn("jubilee party zones:", e);
}
var r = pe.apply(this, arguments);
try {
jbpPeople();
}
catch (e) {
if (window.console)
console.warn("jubilee party folk:", e);
}
return r;
};
})();
