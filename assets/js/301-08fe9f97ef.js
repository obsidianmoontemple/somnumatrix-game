/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FG = { open: false, st: null, tab: "make", cat: null, design: null, tier: null, stock: {}, items: [], byId: {}, loaded: false, missing: false, busy: false, msg: "",
name: "", colour: null, work: null, ask: "", rules: null, rideId: null, rideItem: null, rolled: {}, spots: [], picked: {}, queue: [], noBounty: false, el: null };
var FG_REC = fgRecipes(), FG_RB = {}, FG_MB = {}, FG_DB = {};
FG_REC.forEach(function (r) { FG_RB[r.key] = r; });
FG_MATS.forEach(function (m) { FG_MB[m[0]] = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] }; });
FG_DESIGNS.forEach(function (d) { FG_DB[d[0]] = { key: d[0], cat: d[1], label: d[2], item: d[3], tiers: d[4], size: d[5], st: d[7], use: d[8], x: d[9] }; });
var FG_STATIONS = {
warforge: { name: "The War Forge", who: "the Forgemaster", st: ["forge", "joinery"], sells: ["cr_ore", "cr_coal", "cr_wood", "cr_cloth", "cr_leather", "cr_crystal", "cr_ember"], verb: "Strike" },
engineer: { name: "The Motor Pool workshop", who: "the Mechanic", st: ["engineer", "garage"], sells: ["cr_parts", "cr_rubber", "cr_glass", "cr_cloth", "cr_crystal"], verb: "Fit" },
smithy: { name: "The Smithy", who: "the smith", st: ["forge"], sells: ["cr_ore", "cr_coal", "cr_leather", "cr_cloth", "cr_crystal", "cr_ember"], verb: "Strike" },
joinery: { name: "The Joinery", who: "the joiner", st: ["joinery"], sells: ["cr_wood", "cr_cloth", "cr_glass", "cr_leather"], verb: "Plane" },
garage: { name: "The Transport Yard workshop", who: "the yard's mechanic", st: ["garage"], sells: ["cr_parts", "cr_rubber", "cr_glass", "cr_cloth", "cr_leather"], verb: "Fit" },
volcano: { name: "Hephaestus's forge", who: "Hephaestus", st: ["forge", "joinery", "garage"], sells: ["cr_ore", "cr_coal", "cr_wood", "cr_cloth", "cr_glass", "cr_rubber", "cr_leather", "cr_parts", "cr_crystal", "cr_ember"], verb: "Strike" }
};
var FG_WORKPLACES = { "The Smithy": "smithy", "The Joinery": "joinery", "The Transport Yard": "garage" };
var FG_COLOURS = [["Natural", null], ["Crimson", "#9a2a2a"], ["Royal blue", "#2a4aa8"], ["Forest green", "#2e5a34"], ["Gold", "#c9a04a"], ["Black", "#222226"],
["Ivory", "#d8d2c4"], ["Purple", "#5a2a6a"], ["Bronze", "#8a5a2a"], ["Teal", "#2a6a6a"], ["Rose", "#b86a82"], ["Silver", "#a8acb4"], ["Orange", "#c8662a"], ["Sky", "#5a8ac8"]];
var FG_TINT = { iron: 0x7E8084, steel: 0xC0C4CA, darksteel: 0x4A4652, starmetal: 0x8FC2DA, dragonforged: 0x6E3B33,
ash: 0xB89A70, yew: 0x8A5A3A, heartwood: 0x6A2A1A, starwood: 0x6A8AA8, dragonbone: 0xD0C4A8 };
var FG_USE = {};
var FG_PIC = null;
var FG_CATS = ["Materials", "Blades", "Axes and hammers", "Pole arms", "Bows and throwing", "Firearms", "Heavy weapons", "Star weapons", "Magic", "Armour", "Vehicles", "War machines"];
function fgQ(q) { var Q = FG_QUALITY[+q || 2]; return Q ? Q[1] : 1; }
function fgQName(q) { var Q = FG_QUALITY[+q || 2]; return Q ? Q[0] : "Sound"; }
function fgCol(hex) { return /^#[0-9a-f]{6}$/i.test(String(hex || "")) ? parseInt(String(hex).slice(1), 16) : null; }
function fgHas(k) { return +FG.stock[k] || 0; }
function fgKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function fgCan(R) { if (fgKeeper())
return true; var n = R.need || {}; for (var k in n)
if (fgHas(k) < n[k])
return false; return true; }
function fgNeedHtml(n) { return __ZC(301, 0, this, arguments, new.target); }
function fgRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function fgMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e)); }
function fgLoad() { return __ZC(301, 1, this, arguments, new.target); }
function fgItems(rows) {
FG.items = rows;
FG.byId = {};
rows.forEach(function (it) { FG.byId[it.id] = it; fgRegister(it); });
try {
localStorage.setItem("somnu.fg.items", JSON.stringify(rows.slice(0, 200)));
}
catch (e) { }
fgKeptSync();
}
function fgRegister(it) { return __ZC(301, 2, this, arguments, new.target); }
function fgKeptSync() { return __ZC(301, 3, this, arguments, new.target); }
(function () { try {
var c = JSON.parse(localStorage.getItem("somnu.fg.items") || "null");
if (Array.isArray(c)) {
FG.items = c;
c.forEach(function (it) { FG.byId[it.id] = it; fgRegister(it); });
}
}
catch (e) { } })();
function fgTintHeld(g, tier, colour) { return __ZC(301, 4, this, arguments, new.target); }
function fgTintBody(g, colour) { return __ZC(301, 5, this, arguments, new.target); }
function craftOpen(station, ask) { return __ZC(301, 6, this, arguments, new.target); }
function craftClose() { FG.open = false; FG.work = null; fgPaint(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!FG.open; }, close: craftClose });
function fgPanel() { return __ZC(301, 7, this, arguments, new.target); }
function fgB(act, label, on, title) { return "<button class='btn' data-fg='" + esc(act) + "'" + (title ? " title='" + esc(title) + "'" : "") + " style='margin:3px 4px 3px 0;" + (on ? "border-color:#E8C66A;color:#FFE7B0" : "") + "'>" + label + "</button>"; }
function fgHead(t) { return "<div style='margin:12px 0 4px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function fgDim(t) { return "<span style='opacity:.7'>" + t + "</span>"; }
function fgPaint() { return __ZC(301, 8, this, arguments, new.target); }
function fgAtHere(R, S) { return R.st.some(function (s) { return S.st.indexOf(s) > -1; }); }
function fgDesignsIn(cat, S) { return FG_DESIGNS.filter(function (d) { return d[1] === cat && d[7].some(function (s) { return S.st.indexOf(s) > -1; }); }); }
function fgFind(ask, S) { return __ZC(301, 9, this, arguments, new.target); }
function fgMakeHtml(S) { return __ZC(301, 10, this, arguments, new.target); }
function fgCatStations(c) { var s = {}; FG_DESIGNS.forEach(function (d) { if (d[1] === c)
d[7].forEach(function (x) { s[x] = 1; }); }); return Object.keys(s); }
function fgWhereMade(st) { return __ZC(301, 11, this, arguments, new.target); }
function fgAbout(D) { return __ZC(301, 12, this, arguments, new.target); }
function fgStatLine(D, R, q) { return __ZC(301, 13, this, arguments, new.target); }
function fgMatsHtml(S) { return __ZC(301, 14, this, arguments, new.target); }
function fgMineHtml() { return __ZC(301, 15, this, arguments, new.target); }
function fgActs(it, R, D) { return __ZC(301, 16, this, arguments, new.target); }
function fgBountyHtml() { return __ZC(301, 17, this, arguments, new.target); }
function fgRules() { return fgRpc("battle_bounty_rules_get").then(function (o) { if (o && typeof o === "object")
FG.rules = o; fgPaint(); }).catch(function (e) { if (fgMissing(e))
FG.missing = true; fgPaint(); }); }
function fgClick(a, t) { return __ZC(301, 18, this, arguments, new.target); }
function fgKeepName() { var i = document.getElementById("fg-name"); if (i)
FG.name = i.value; }
function fgWorkStart(R) { return __ZC(301, 19, this, arguments, new.target); }
function fgHeat() { var W = FG.work; if (!W)
return 0; var p = ((performance.now() - W.t0) % W.T) / W.T; return 0.5 - 0.5 * Math.cos(p * Math.PI * 2); }
function fgHeatWord(h) { return h >= 0.93 ? "✨ Now!" : h >= 0.75 ? "Nearly…" : h >= 0.4 ? "Warming" : "Cooling"; }
function fgWorkHtml() { return __ZC(301, 20, this, arguments, new.target); }
function fgTouch() { return typeof touchRig !== "undefined" && !!touchRig; }
function fgWorkFrame() { return __ZC(301, 21, this, arguments, new.target); }
function fgStrike() { return __ZC(301, 22, this, arguments, new.target); }
addEventListener("keydown", function (e) {
if (!FG.open || !FG.work || e.code !== "Space" || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
e.preventDefault();
e.stopImmediatePropagation();
fgStrike();
}, true);
function fgMakeNow(R, skill, name, colour) { return __ZC(301, 23, this, arguments, new.target); }
function fgSay(h) { if (typeof WLD !== "undefined" && WLD.on === "battle" && typeof bwSay === "function")
bwSay(h, true);
else if (typeof setStatus === "function")
setStatus(h); }
function fgBuy(k, n) { return __ZC(301, 24, this, arguments, new.target); }
function fgRename(id) {
var it = FG.byId[id];
if (!it)
return;
var n = prompt("A new name for " + it.name + "?", it.name);
if (n == null)
return;
fgRpc("craft_rename", { p_id: id, p_name: n }).then(function () { return fgLoad(); }).catch(function (e) { FG.msg = esc((e && e.message) || String(e)); fgPaint(); });
}
function fgRuleSet(what, by) { return __ZC(301, 25, this, arguments, new.target); }
function fgHold(id) { return __ZC(301, 26, this, arguments, new.target); }
var FG_WEARKEY = { armor: ["layer", "layerColor"], helmet: ["hat", "hatColor"], gloves: ["hands", "accColor"], boots: ["shoeKind", "shoes"] };
function fgWornMap() { if (!store.fgWorn || typeof store.fgWorn !== "object")
store.fgWorn = {}; return store.fgWorn; }
function fgWorn(it) {
var R = FG_RB[it.recipe], D = R && FG_DB[R.design];
if (!D || D.use !== "armour")
return false;
var w = D.x.wear, K = FG_WEARKEY[w], L = meLook();
return fgWornMap()[w] === it.id && K && L[K[0]] === w;
}
function fgWear(id) { return __ZC(301, 27, this, arguments, new.target); }
function fgProt() {
var M = fgWornMap(), p = 0;
Object.keys(M).forEach(function (w) { var it = FG.byId[M[w]]; if (!it || !fgWorn(it))
return; var R = FG_RB[it.recipe], D = FG_DB[R.design]; p += D.x.prot * (R.mult || 1) * fgQ(it.quality); });
return Math.min(0.45, p);
}
function fgRide(id) { return __ZC(301, 28, this, arguments, new.target); }
var FG_BAYS = [[31, 27], [-14, 36.5], [14, 36.5], [0, 37]];
function fgRollOut(id) { return __ZC(301, 29, this, arguments, new.target); }
function fgPark(id) { var m = FG.rolled[id]; if (!m)
return; if (BW.ride === m)
bwDismount(true); var i = BW.mach.indexOf(m); if (i > -1)
BW.mach.splice(i, 1); if (m.g && m.g.parent)
m.g.parent.remove(m.g); delete FG.rolled[id]; }
(function () {
if (typeof bwCamp !== "function")
return;
var bc = bwCamp;
bwCamp = function (G) {
var hide = {};
Object.keys(BW_ARMS).forEach(function (k) { if (/^cr\d+$/.test(k) || BW_ARMS[k].bought) {
hide[k] = BW_ARMS[k];
delete BW_ARMS[k];
} });
try {
bc.apply(this, arguments);
}
finally {
Object.keys(hide).forEach(function (k) { BW_ARMS[k] = hide[k]; });
}
try {
fgWarForge(G);
}
catch (e) {
if (window.console)
console.warn("[forge] war forge", e);
}
};
var bb = bwBuild;
bwBuild = function (G) { var r = bb.apply(this, arguments); try {
fgSpotsBuild(G);
}
catch (e) {
if (window.console)
console.warn("[forge] spots", e);
} return r; };
})();
function fgWarForge(G) { return __ZC(301, 30, this, arguments, new.target); }
function fgSpotsBuild(G) { return __ZC(301, 31, this, arguments, new.target); }
function fgSpotName(k) { return { cr_ore: "An iron ore vein", cr_coal: "A coal seam", cr_ember: "An ember rock", cr_crystal: "A cluster of star crystal", cr_wood: "An old pine, fallen", cr_scrap: "A heap of war scrap" }[k] || "Something useful"; }
function fgSpotVerb(k) { return { cr_ore: "mine it", cr_coal: "dig out coal", cr_ember: "chip off emberstone", cr_crystal: "break off crystal", cr_wood: "cut seasoned timber", cr_scrap: "pick through the scrap" }[k] || "gather"; }
function fgSpotMesh(k) { return __ZC(301, 32, this, arguments, new.target); }
function fgGather(S) { return __ZC(301, 33, this, arguments, new.target); }
setInterval(function () { var n = Date.now(); (FG.spots || []).forEach(function (S) { if (S.g && S.g.scale.x < 1 && !(FG.picked[S.id] > n))
S.g.scale.setScalar(1); }); }, 15000);
(function () {
if (typeof bwLoot === "function") {
var bl = bwLoot;
bwLoot = function (F) { var r = bl.apply(this, arguments); try {
if (F && F.kind && F.kind !== "dummy" && !(F.summon))
fgBounty(F.kind, F.k && F.k.name);
}
catch (e) { } return r; };
}
if (typeof bwMachHit === "function") {
var bm = bwMachHit;
bwMachHit = function (M, dmg, byMe) {
var was = M && M.alive;
var r = bm.apply(this, arguments);
try {
if (was && !M.alive && byMe && BW.ride !== M && !M.pool)
fgBounty("m_" + M.type, M.T && M.T.name);
}
catch (e) { }
return r;
};
}
if (typeof bwWonPvp === "function") {
var bp = bwWonPvp;
bwWonPvp = function (r) { var o = bp.apply(this, arguments); try {
var b = +(r && r.body && r.body.bonus) || 0;
if (b) {
bwFeed("💰 +" + b + " gold bounty", "#FFD88A");
if (typeof refreshStanding === "function")
refreshStanding();
}
}
catch (e) { } return o; };
}
if (typeof bwClass === "function") {
var bc = bwClass;
bwClass = function () { var c = bc.apply(this, arguments), p = fgProt(); if (!p)
return c; var o = {}; for (var k in c)
o[k] = c[k]; o.armor = Math.min(0.6, (c.armor || 0) + p); return o; };
}
if (typeof BW_ERA_ICON !== "undefined")
BW_ERA_ICON.Forged = "⚒️";
})();
function fgBounty(foe, name) {
if (FG.noBounty || !(typeof signedIn === "function" && signedIn()))
return;
FG.queue.push({ foe: foe, name: name || "" });
if (FG.queue.length > 12)
FG.queue.shift();
if (!FG.qBusy)
fgBountyNext();
}
function fgBountyNext() { return __ZC(301, 34, this, arguments, new.target); }
(function () {
if (typeof ride === "function") {
var rd = ride;
ride = function (name) { var r = rd.apply(this, arguments); if (!name || name !== FG.rideItem) {
FG.rideId = null;
FG.rideItem = null;
} return r; };
}
if (typeof vehSpec === "function") {
var vs = vehSpec;
vehSpec = function (arch) {
var s = vs.apply(this, arguments);
try {
var it = FG.rideId && FG.byId[FG.rideId];
if (s && it && typeof riding !== "undefined" && riding === FG.rideItem) {
var R = FG_RB[it.recipe], m = Math.min(1.6, (R.mult || 1) * fgQ(it.quality));
s.vmax *= m;
s.acc *= Math.min(1.4, m);
}
}
catch (e) { }
return s;
};
}
})();
setInterval(function () {
try {
var it = FG.rideId && FG.byId[FG.rideId];
if (!it || typeof rideG === "undefined" || !rideG || rideG.userData.fgTint === it.id)
return;
if (typeof riding !== "undefined" && riding === FG.rideItem) {
fgTintBody(rideG, it.colour);
rideG.userData.fgTint = it.id;
}
}
catch (e) { }
}, 400);
function fgCityBtn() { return __ZC(301, 35, this, arguments, new.target); }
if (typeof PS_KEEP !== "undefined")
PS_KEEP["fg-city"] = 1;
setInterval(function () {
try {
var st = null, label = "";
var talking = typeof talkOpen !== "undefined" && talkOpen;
if (!talking && !FG.open && typeof walkMode !== "undefined" && walkMode && store.inside && typeof INT !== "undefined" && INT) {
if (typeof cfxHephNear === "function" && cfxHephNear()) {
st = "volcano";
label = "⚒️ Work at Hephaestus's forge";
}
else if (INT.wpKey && FG_WORKPLACES[INT.wpKey]) {
st = FG_WORKPLACES[INT.wpKey];
label = st === "garage" ? "🔧 Build a vehicle" : st === "joinery" ? "🪚 Work at the bench" : "⚒️ Work at the forge";
}
}
var el = fgCityBtn();
if (st) {
el.setAttribute("data-st", st);
if (el.textContent !== label)
el.textContent = label;
el.style.display = "block";
}
else
el.style.display = "none";
}
catch (e) { }
}, 500);
function fgStationFor(ctx) { return __ZC(301, 36, this, arguments, new.target); }
(function () {
var def = { tag: "MAKE", label: "🔨 Make something", hint: "take a commission and make it at this forge or workshop: cars, armour, weapons, anything",
when: function (ctx) { return !!fgStationFor(ctx); },
run: function (ctx, arg) { craftOpen(fgStationFor(ctx) || "smithy", arg || ""); } };
if (typeof staffDeedAdd === "function")
staffDeedAdd(def);
else
(window.SD_PENDING = window.SD_PENDING || []).push(def);
})();
setTimeout(function () { if (typeof signedIn === "function" && signedIn())
fgRpc("my_crafted").then(function (rows) { if (Array.isArray(rows))
fgItems(rows); }).catch(function () { }); }, 4000);
(function () {
if (typeof bkpKeptHtml === "function") {
var bk = bkpKeptHtml;
bkpKeptHtml = function () {
var K = store.kept, h;
if (Array.isArray(K)) {
store.kept = K.filter(function (q) { return !/^bw_cr\d+$/.test(q.a); });
try {
h = bk.apply(this, arguments);
}
finally {
store.kept = K;
}
}
else
h = bk.apply(this, arguments);
if (!FG.items.length || typeof bkpRow !== "function")
return h;
var x = '<div style="margin-top:6px">' + bkpDim("Made by hand") + '</div>';
FG.items.forEach(function (it) {
var R = FG_RB[it.recipe], D = R && FG_DB[R.design];
if (!D)
return;
var b = function (l, a) { return '<button class="btn" style="white-space:nowrap" data-bku="fg:' + a + ':' + it.id + '">' + l + '</button>'; }, btn = "";
if (D.use === "weapon")
btn = b(typeof carrying !== "undefined" && carrying && carrying.archetype === "bw_cr" + it.id ? "Put away" : "Hold", "hold");
else if (D.use === "armour")
btn = b(fgWorn(it) ? "Take off" : "Wear", "wear");
else if (D.use === "vehicle")
btn = b(FG.rideId === it.id && typeof riding !== "undefined" && riding ? "Get out" : "Drive", "ride");
else if (D.use === "machine")
btn = b("In Ironfray", "roll");
else if (FG_USE[D.use])
btn = b(FG_USE[D.use].label(it), D.use);
var pic = FG_PIC ? FG_PIC(D.key, 34) : "";
x += bkpRow((pic ? pic + " " : FG_USE[D.use] ? FG_USE[D.use].icon + " " : D.use === "weapon" ? "⚔️ " : D.use === "armour" ? "🛡️ " : D.use === "vehicle" ? "🚗 " : "🦾 ") + esc(it.name) + " " + bkpDim("(" + esc(R.label.toLowerCase()) + ", " + esc(fgQName(it.quality).toLowerCase()) + ", made by " + esc(it.maker || "a dreamer") + ")"), btn);
});
return h + "\u0000" + x;
};
}
if (typeof bkpUse === "function") {
var bu = bkpUse;
bkpUse = function (t) {
var u = t && t.getAttribute && t.getAttribute("data-bku");
if (u && /^fg:/.test(u)) {
var p = u.split(":"), id = +p[2];
if (p[1] === "hold") {
if (typeof carrying !== "undefined" && carrying && carrying.archetype === "bw_cr" + id && typeof bkpStow === "function")
bkpStow();
else
fgHold(id);
}
else if (p[1] === "wear")
fgWear(id);
else if (p[1] === "ride") {
if (typeof bkpClose === "function")
bkpClose();
fgRide(id);
return true;
}
else if (FG_USE[p[1]]) {
if (FG_USE[p[1]].run(id) === true) {
if (typeof bkpClose === "function")
bkpClose();
return true;
}
}
else if (p[1] === "roll") {
if (typeof WLD !== "undefined" && WLD.on === "battle") {
if (typeof bkpClose === "function")
bkpClose();
fgRollOut(id);
return true;
}
setStatus("War machines roll out of the Motor Pool in Ironfray: talk to the Mechanic there.");
}
setTimeout(function () { if (typeof bkpPaint === "function")
bkpPaint(); }, 60);
return true;
}
return bu.apply(this, arguments);
};
}
if (typeof bkpHtml === "function") {
var bh = bkpHtml;
bkpHtml = function () {
var D = typeof BKP !== "undefined" && BKP.d, T = D && D.things;
if (!Array.isArray(T) || !FG.items.length)
return bh.apply(this, arguments);
var made = {};
FG.items.forEach(function (it) { made[it.id] = 1; });
D.things = T.filter(function (t) { return !made[t.id]; });
try {
return bh.apply(this, arguments);
}
finally {
D.things = T;
}
};
}
if (typeof bkpLoad === "function") {
var bl = bkpLoad;
bkpLoad = function () { var p = bl.apply(this, arguments); if (typeof signedIn === "function" && signedIn())
fgRpc("my_crafted").then(function (rows) { if (Array.isArray(rows)) {
fgItems(rows);
if (typeof bkpPaint === "function")
bkpPaint();
} }).catch(function () { }); return p; };
}
})();
