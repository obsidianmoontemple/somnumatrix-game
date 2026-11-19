/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NEEDS = { food: null, drink: null, sick: null, left: null, exempt: null, missing: false, at: 0, busy: false,
menu: null, menuAt: 0, menuBusy: false, band: {}, el: null, shown: false, stalls: [], stallsAt: 0, open: null, hpLast: null };
var NEEDS_PLACES = { "The Cookhouse": "Hot food all day", "The Bakery": "Bread, pies and cake", "The Tavern": "Meals and drinks",
"The Somnucor Inn": "Breakfast and dinner", "The Greengrocer's": "Fruit and juice", "The Butcher's": "Pies and rolls", "The Dairy": "Milk and cheese",
"The General Store": "Water and a bite", "The Brewhouse": "Ale and water", "The Apothecary": "Remedies", "The Herbalist's": "Herbal remedies" };
var NEEDS_FOOD_PLACES = ["The Cookhouse", "The Bakery", "The Tavern", "The Somnucor Inn", "The General Store", "The Butcher's", "The Greengrocer's", "The Dairy"];
var NEEDS_SICK = { cold: "a cold", flu: "the flu", stomach: "an upset stomach" };
var NEEDS_SICK_CURE = { cold: "The Apothecary's cold remedy ends it; honey and lemon tea at the Herbalist's eases it.",
flu: "The Apothecary's fever draught ends it; honey and lemon tea at the Herbalist's eases it.",
stomach: "The Apothecary's stomach salts end it; ginger root at the Herbalist's eases it. Drink plenty: it makes you thirsty." };
function needsErr(e) { if (typeof rpcMissing === "function" && rpcMissing(e)) {
NEEDS.missing = true;
NEEDS.at = Date.now();
return "Food and drink open soon.";
} return String((e && e.message) || e || ""); }
function needsSomnucor() {
if (typeof WLD !== "undefined" && WLD && WLD.on)
return false;
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
return !!(r && walkMode && (store.here || 0) === r.id);
}
function needsLive() { return !!(typeof signedIn === "function" && signedIn() && needsSomnucor()); }
function needsGot(o) { return __ZC(258, 0, this, arguments, new.target); }
function needsBeat(force) {
if (NEEDS.busy || !needsLive())
return;
var wait = NEEDS.missing ? 600000 : 60000;
if (!force && Date.now() - NEEDS.at < wait)
return;
NEEDS.busy = true;
NEEDS.at = Date.now();
cityRpc("needs_beat", {}).then(function (o) { NEEDS.busy = false; NEEDS.missing = false; needsGot(o); })
.catch(function (e) { NEEDS.busy = false; needsErr(e); needsPaint(); });
}
function needsMenuLoad() { return __ZC(258, 1, this, arguments, new.target); }
function needsBandOf(v) { return v == null ? "" : v <= 0 ? "empty" : v < 10 ? "starving" : v < 30 ? "low" : "ok"; }
function needsNudge() { return __ZC(258, 2, this, arguments, new.target); }
function needsEls() {
if (NEEDS.el || !document.body)
return NEEDS.el;
var st = document.createElement("style");
st.textContent = "#needs-hud{position:fixed;z-index:43;display:none;cursor:pointer;user-select:none;-webkit-user-select:none;" +
"background:rgba(10,12,18,.72);border:1px solid rgba(200,180,140,.35);border-radius:4px;padding:6px 8px 5px;font:11.5px var(--sans,system-ui);color:var(--bone,#EDE6D6);" +
"right:20px;top:78px;width:200px}" +
"#needs-hud .nr{display:flex;align-items:center;gap:6px;margin:2px 0}" +
"#needs-hud .nl{width:44px;opacity:.85}" +
"#needs-hud .nb{flex:1;height:7px;background:rgba(255,255,255,.12);border-radius:3px;overflow:hidden}" +
"#needs-hud .nf{height:100%;border-radius:3px;transition:width .8s}" +
"#needs-hud .nv{width:32px;text-align:right;font-variant-numeric:tabular-nums;opacity:.9}" +
"#needs-hud .ns{margin-top:3px;color:#E8B860;font-size:11px}" +
"@media (max-width:820px),(pointer:coarse){#needs-hud{right:auto;left:calc(10px + env(safe-area-inset-left,0px));top:calc(178px + env(safe-area-inset-top,0px));width:140px;padding:5px 6px 4px;font-size:10.5px}" +
"#needs-hud .nl{width:38px}#needs-hud .nv{width:30px}#needs-hud .nb{height:6px}}" +
"@media (max-height:500px) and (pointer:coarse){#needs-hud{top:calc(8px + env(safe-area-inset-top,0px));left:calc(96px + env(safe-area-inset-left,0px))}}";
document.head.appendChild(st);
var d = document.createElement("div");
d.id = "needs-hud";
d.setAttribute("role", "button");
d.setAttribute("aria-label", "Health, food and drink");
d.onclick = function (ev) { ev.stopPropagation(); needsCard(); };
document.body.appendChild(d);
NEEDS.el = d;
return d;
}
function needsCol(k, v) {
if (k === "hp")
return v >= 70 ? "#5FB86A" : v >= 35 ? "#D9A441" : "#D0553F";
if (v < 10)
return "#D0553F";
return k === "food" ? "#D98A3D" : "#4F95D6";
}
function needsRow(label, k, v, note) {
var w = v == null ? 0 : Math.max(0, Math.min(100, v));
return "<div class='nr'><span class='nl'>" + label + "</span><span class='nb'><span class='nf' style='display:block;width:" + w + "%;background:" + needsCol(k, w) + "'></span></span>" +
"<span class='nv'>" + (note != null ? note : (v == null ? "–" : Math.round(w))) + "</span></div>";
}
function needsPaint() {
var d = needsEls();
if (!d)
return;
var on = needsLive();
if (!on) {
if (NEEDS.shown) {
d.style.display = "none";
NEEDS.shown = false;
}
return;
}
var hp = (typeof HARM !== "undefined" && HARM) ? HARM.hp : 100, down = typeof HARM !== "undefined" && HARM && HARM.state === "down";
var ex = NEEDS.exempt, h = needsRow("Health", "hp", hp, down ? "down" : null);
if (NEEDS.missing || NEEDS.food == null) { }
else {
h += needsRow("Food", "food", ex ? 100 : NEEDS.food) + needsRow("Drink", "drink", ex ? 100 : NEEDS.drink);
if (ex)
h += "<div class='ns' style='color:#C9B98A'>" + (ex === "keeper" ? "Keeper: always fed" : "Guest of the city: fed free") + "</div>";
else if (NEEDS.sick)
h += "<div class='ns'>Ill: " + esc(NEEDS_SICK[NEEDS.sick] || NEEDS.sick) + (NEEDS.left ? " · " + NEEDS.left + " min" : "") + "</div>";
}
if (d.dataset.h !== h) {
d.dataset.h = h;
d.innerHTML = h;
}
if (!NEEDS.shown) {
d.style.display = "block";
NEEDS.shown = true;
}
}
function needsNearest(keys) {
var P = camera.position, best = null, bd = 1e18, W = store.workplaceAt || {};
keys.forEach(function (k) { var w = W[k]; if (!w)
return; var d = (w.x - P.x) * (w.x - P.x) + (w.z - P.z) * (w.z - P.z); if (d < bd) {
bd = d;
best = k;
} });
return best;
}
function needsCardHtml() { return __ZC(258, 3, this, arguments, new.target); }
function needsCardFns() { return __ZC(258, 4, this, arguments, new.target); }
function needsCard() {
if (typeof worldCard !== "function")
return;
NEEDS.open = "me";
worldCard(needsCardHtml(), needsCardFns());
needsBeat(false);
}
function needsVendorHere() {
if (typeof INT !== "undefined" && INT && store.inside && INT.spec) {
var k = INT.spec.workplace || INT.spec.label;
return (k && NEEDS_PLACES[k]) ? k : null;
}
if (store.inside || !needsSomnucor())
return null;
var now = Date.now();
if (now - NEEDS.stallsAt > 4000) {
NEEDS.stallsAt = now;
var r = somnucorRealm(), L = store.objects || [], out = [];
for (var i = 0; i < L.length; i++) {
var o = L[i];
if (o && o.realm === r.id && /^(marketstall|marketawning|foodstall|foodcart|streetfood)$/.test(o.archetype || ""))
out.push(o);
}
NEEDS.stalls = out;
}
var P = camera.position, S = NEEDS.stalls;
for (var j = 0; j < S.length; j++) {
var s = S[j];
if (Math.abs(s.x - P.x) < 4 && Math.abs(s.z - P.z) < 4 && Math.hypot(s.x - P.x, s.z - P.z) < 3.6)
return "stall";
}
return null;
}
function needsPlaceTitle(k) { return k === "stall" ? "Street food" : k === "cinema" ? "The snack counter" : k; }
function needsMenuHtml(k, menu, msg) { return __ZC(258, 5, this, arguments, new.target); }
function needsMenuFns(k, menu) {
var f = {};
(menu || []).forEach(function (m) { if (m.place === k)
f["buy:" + m.item] = function () { needsBuy(k, m); }; });
return f;
}
function needsMenu(k, msg) { return __ZC(258, 6, this, arguments, new.target); }
function needsCardRefresh() {
if (!NEEDS.open || typeof WLD === "undefined" || !WLD.card || WLD.card.style.display === "none") {
NEEDS.open = null;
return;
}
if (NEEDS.open === "me")
worldCard(needsCardHtml(), needsCardFns());
}
function needsBuy(k, m) { return __ZC(258, 7, this, arguments, new.target); }
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
try {
if (typeof tsPrompt === "function" && !(typeof WLD !== "undefined" && WLD && WLD.on)) {
var k = needsVendorHere();
if (k) {
var nm = k === "stall" ? "Street food" : k;
tsPrompt("<b>" + esc(nm) + "</b> · <b>press E</b> (or tap here) for the " + (k === "The Apothecary" || k === "The Herbalist's" ? "remedies" : "menu"), function () { needsMenu(k); });
return;
}
}
}
catch (e) {
if (window.console && !NEEDS.warned) {
NEEDS.warned = true;
console.warn("needs:", e);
}
}
return tt.apply(this, arguments);
};
})();
(function () {
if (typeof cinSnack !== "function")
return;
var cs = cinSnack, map = { popcorn: "cin_popcorn", toffee_apple: "cin_toffee", lemonade: "cin_lemonade", cocoa: "cin_cocoa" };
cinSnack = function (k) {
if (NEEDS.missing || !map[k] || !(typeof signedIn === "function" && signedIn()))
return cs.apply(this, arguments);
cityRpc("buy_food", { p_item: map[k] }).then(function (o) {
if (o && o.ok !== false) {
needsGot(o);
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}
setStatus(esc((o && o.say) || "") + (o && o.ok !== false ? " Enjoy the film." : ""));
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e)) {
NEEDS.missing = true;
return cs(k);
} setStatus(esc(e.message || String(e))); });
};
})();
(function () {
if (typeof harmPace !== "function")
return;
var hp = harmPace;
harmPace = function () {
var k = hp.apply(this, arguments);
if (!NEEDS.exempt && NEEDS.food != null && (NEEDS.food <= 0 || NEEDS.drink <= 0 || NEEDS.sick === "flu"))
k *= 0.85;
return k;
};
})();
setInterval(function () {
try {
needsPaint();
if (needsLive())
needsBeat(false);
}
catch (e) {
if (window.console && !NEEDS.warnedTick) {
NEEDS.warnedTick = true;
console.warn("needs:", e);
}
}
}, 1000);
if (typeof onHarm === "function")
onHarm(function () { try {
needsPaint();
}
catch (e) { } });
function needsTest(o) { if (o)
needsGot(Object.assign({ ok: true, events: [] }, o)); return NEEDS; }
