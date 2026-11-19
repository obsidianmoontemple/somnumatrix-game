/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HOUSE_BUILD = 2;
var NEIGHBOURHOODS = [
{ name: "Saltmarket", at: 3.30, r: 250, kind: "home", grade: "rooms",
note: "Rooms over the shops. Cheap, loud, and near everything.",
homes: ["shanty", "shanty", "tenementblock", "tenementblock", "shanty"],
price: [2600, 4200], rent: [90, 150], ground: null, dress: ["washing", "firebarrel", "crates", "barrel"] },
{ name: "The Terraces", at: 5.60, r: 340, kind: "home", grade: "flat",
note: "Flats stacked six deep, and a bench outside every door.",
homes: ["apartment", "apartment", "tenementblock", "apartment", "apartment", "apartment"],
price: [7000, 12000], rent: [210, 340], ground: "groundpad", dress: ["bench", "streetlight", "trashcan", "bicycle", "hedge"] },
{ name: "The Old Quarter", at: 0.00, r: 300, kind: "home", grade: "house",
note: "Cottages and houses, the oldest streets in the city.",
homes: ["cottage", "house", "cottage", "house", "cottage", "house", "farmhouse"],
price: [14000, 26000], rent: [380, 620], ground: "lawn", dress: ["fence", "hedge", "flowers", "tree", "well"] },
{ name: "Lantern Street", at: 0.35, r: 430, kind: "home", grade: "house",
note: "Machiya and hanok under strung lanterns, with gardens behind.",
homes: ["machiya", "hanok", "machiya", "teahouse", "hanok"],
price: [16000, 30000], rent: [420, 680], ground: "groundpad", dress: ["redlanterns", "bonsai", "koipond", "hedge"] },
{ name: "The Riad Quarter", at: 1.80, r: 400, kind: "home", grade: "house",
note: "Blank walls to the street, and a fountain in every court.",
homes: ["riad", "hacienda", "riad", "cycladic"],
price: [18000, 34000], rent: [460, 720], ground: "groundpad", dress: ["tiledfountain", "palm", "marketawning"] },
{ name: "Northgate", at: 6.00, r: 520, kind: "home", grade: "grand",
note: "Great houses behind gates, with ground enough to lose somebody in.",
homes: ["manor", "manor", "palace", "castle", "manor"],
price: [90000, 320000], rent: [1600, 4800], ground: "lawn", dress: ["fence", "tree", "tree", "fountain", "statue", "pergola", "hedge"] },
{ name: "Bellwater", at: 4.75, r: 470, kind: "home", grade: "house",
note: "Quiet streets by the water, and a longer walk to work.",
homes: ["house", "cottage", "stilthouse", "house", "izba"],
price: [15000, 28000], rent: [400, 640], ground: "lawn", dress: ["reeds", "pond", "tree", "fence", "bench"] },
{ name: "The Warrens", at: 2.60, r: 280, kind: "home", grade: "rooms",
note: "What the city would rather you did not see. It houses people all the same.",
homes: ["shanty", "shanty", "shanty", "ruin", "shanty"],
price: [1400, 2600], rent: [50, 95], ground: null, dress: ["firebarrel", "scrapheap", "washing", "barrel"] },
{ name: "The Hotels", at: 1.20, r: 360, kind: "business", grade: "hotel",
note: "For those not staying. Rooms by the week, and somebody at the desk.",
homes: ["hotel", "motel", "hotel", "hotel"],
price: [60000, 140000], rent: [900, 2200], ground: "groundpad", dress: ["streetlight", "bench", "hedge", "busstop"] }
];
function inBand(band, t) { return Math.round(band[0] + (band[1] - band[0]) * t); }
var DISTRICT_AT = 5.05, DISTRICT_R = 520, DISTRICT_BUILD = 2;
var DISTRICT_CYCLE = ["manor", "manor", "palace", "manor", "manor", "castle"];
var DISTRICT_TOTAL = 72, DISTRICT_ROW_CAP = 24;
var DISTRICT_HOMES = (function () {
var out = [];
for (var i = 0; i < DISTRICT_TOTAL; i++)
out.push(DISTRICT_CYCLE[i % DISTRICT_CYCLE.length]);
return out;
})();
function districtReach() { return __ZC(40, 0, this, arguments, new.target); }
function sectionDistrict() { return __ZC(40, 1, this, arguments, new.target); }
function sectionHousing() { return __ZC(40, 2, this, arguments, new.target); }
var cityLots = [], lotsAt = 0;
function loadLots() {
if (Date.now() - lotsAt < 20000 && cityLots.length)
return Promise.resolve(cityLots);
var ask = signedIn() ? cityRpc("lot_board") : (typeof restRpc === "function" && typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseUrl ? restRpc("lot_board", {}) : Promise.resolve(null));
return ask.then(function (rows) { cityLots = rows || []; lotsAt = Date.now(); applyLotDecor(); return cityLots; })
.catch(function () { return []; });
}
function lotByName(name) {
for (var i = 0; i < cityLots.length; i++)
if (cityLots[i].name === name)
return cityLots[i];
return null;
}
function applyLotDecor() { return __ZC(40, 3, this, arguments, new.target); }
function ownLot(lotId) {
return !!(typeof standing !== "undefined" && standing && (standing.lots || []).some(function (l) { return l.lot_id === lotId && l.own; }));
}
var plotNear = null, plotCool = 0;
function housingTick(dt) {
if (plotCool > 0)
plotCool -= dt;
if (!walkMode || store.inside) {
plotNear = null;
return;
}
var P = camera.position, found = null;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!o.plot || (o.realm || 0) !== (store.here || 0))
continue;
if (Math.abs(o.x - P.x) > 7 || Math.abs(o.z - P.z) > 7)
continue;
if (Math.hypot(o.x - P.x, o.z - P.z) < 3.6) {
found = o;
break;
}
}
if (found && found !== plotNear) {
plotNear = found;
var rec = lotByName(found.plot.name), p = found.plot;
var held = rec && rec.held;
var mine = rec && ownLot(rec.lot_id);
var assigned = p.kind === "district" || (rec && rec.kind === "district");
var offMarket = rec && !rec.for_sale && !rec.to_let;
setStatus("<b>" + esc(p.name) + "</b> \u2014 " + esc(p.quarter) + ". " +
(held ? (mine ? "Yours. Press <b>G</b> to raise something new on it, <b>D</b> to dress it." : "Taken.")
: assigned ? "Kept for Somnucor's own people and its backers. It is assigned by the penthouse or a keeper, never bought."
: offMarket ? "Not on the market just now."
: ("To buy <b>" + p.price.toLocaleString() + " gold</b>, or <b>" + p.rent.toLocaleString() +
" a week</b> to rent. Every lot is bought and let at <b>the Land Office</b> in the Civic Ring.")));
loadLots();
}
else if (!found && plotNear)
plotNear = null;
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (!plotNear || plotCool > 0)
return;
var rec = lotByName(plotNear.plot.name);
if (!rec) {
setStatus("That plot is not in the books yet. The realtor must enter it first.");
return;
}
if ((e.code === "KeyB" || e.code === "KeyR") && (plotNear.plot.kind === "district" || rec.kind === "district")) {
plotCool = 1;
setStatus("District plots are assigned, never bought or let.");
return;
}
if (e.code === "KeyB" || e.code === "KeyR") {
plotCool = 1;
setStatus("<b>" + esc(rec.name) + "</b> is bought and let at <b>the Land Office</b>, in the Civic Ring. Ask at the counter there.");
}
if (e.code === "KeyG") {
plotCool = 1;
offerToRaise(rec, plotNear);
}
if (e.code === "KeyD") {
plotCool = 1;
offerToDress(rec, plotNear);
}
});
var buildCostsCache = null;
function loadBuildCosts() { return __ZC(40, 4, this, arguments, new.target); }
function offerToRaise(rec, board) { return __ZC(40, 5, this, arguments, new.target); }
function raiseBuilding(lotId, archetype, board) { return __ZC(40, 6, this, arguments, new.target); }
function offerToDress(rec, board) {
if (!rec || !ownLot(rec.lot_id))
return setStatus("Only ground you hold can be dressed.");
var choice = (prompt("Dress " + rec.name + " with what? A word or two \u2014 it is remembered on the lot.") || "").trim();
if (!choice)
return;
dressLot(rec.lot_id, choice);
}
function dressLot(lotId, note) { return __ZC(40, 7, this, arguments, new.target); }
var YARD_BUILD = 1;
var yardNear = null, yardCool = 0, yardPrices = null;
function yardTick(dt) {
if (yardCool > 0)
yardCool -= dt;
if (!walkMode || store.inside) {
yardNear = null;
return;
}
var P = camera.position, found = null;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!o.forSale || (o.realm || 0) !== (store.here || 0))
continue;
if (Math.abs(o.x - P.x) > 7 || Math.abs(o.z - P.z) > 7)
continue;
if (Math.hypot(o.x - P.x, o.z - P.z) < 3.6) {
found = o;
break;
}
}
if (found && found !== yardNear) {
yardNear = found;
yardLook(found.forSale).then(function (item) {
if (!item)
return setStatus("<b>" + esc(found.forSale) + "</b> — the yard has no price on it yet.");
setStatus("<b>" + esc(item.name) + "</b> — " + item.price.toLocaleString() + " gold" +
(item.speed ? (", " + (+item.speed).toFixed(1) + " times your own pace") : "") +
(item.note ? (". " + esc(item.note)) : "") + ". Press <b>B</b> to buy it.");
});
}
else if (!found && yardNear)
yardNear = null;
}
function yardLook(name) { return __ZC(40, 8, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code !== "KeyB" || !yardNear || yardCool > 0)
return;
yardCool = 1.2;
yardLook(yardNear.forSale).then(function (item) {
if (!item)
return setStatus("The yard cannot price that yet.");
if (typeof yardBuyRow === "function")
yardBuyRow(item);
else if (typeof buyItem === "function")
buyItem(item.id, null);
});
});
var WORKS_BUILD = 1;
