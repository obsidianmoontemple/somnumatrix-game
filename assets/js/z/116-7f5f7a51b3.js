/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(116, function () {
"use strict";
return [
function () {
if (TAILOR || typeof cityRpc !== "function")
return Promise.resolve(TAILOR || []);
return catalogueRows().then(function (rows) {
var names = {};
Object.keys(WEAR).forEach(function (k) { names[WEAR[k].label.toLowerCase()] = 1; });
TAILOR = (rows || []).filter(function (r) { return r.kind === "clothing" || /^wear_/.test(r.archetype || "") || names[String(r.name || "").toLowerCase()]; });
return TAILOR;
})
.catch(function () { TAILOR = null; return []; });
},
function (k) {
var it = wearRow(TAILOR, k);
if (it && +it.price >= 0)
return Number(it.price).toLocaleString();
if (!TAILOR && !wearShownPrice.asked && typeof signedIn === "function" && signedIn()) {
wearShownPrice.asked = 1;
tailorLoad().then(function () { if (TAILOR && TAILOR.length)
try {
renderWardrobe();
}
catch (e) { } });
}
return Number(WEAR[k].price).toLocaleString();
},
function (key) {
var w = WEAR[key];
if (!w)
return;
if (!(typeof signedIn === "function" && signedIn()))
return setStatus("Sign in and join Somnucor to buy at the tailor's.");
tailorLoad().then(function (rows) {
var it = wearRow(rows, key);
if (!it)
return setStatus("The tailor doesn't stock that yet.");
if (!confirm("Buy " + w.label + " for " + Number(it.price).toLocaleString() + " gold? It's yours for good."))
return;
Promise.resolve(buyItem(it.id, null)).then(function () { setTimeout(renderWardrobe, 600); });
});
},
function () {
var w = document.getElementById("me-ward");
if (!w)
return;
LKH = {};
var L = meLook(), S = L.src || {};
function set(k, v) {
L[k] = v;
L.src = L.src || {};
L.src[k] = "chosen";
try {
var od = dreamer().offDuty;
if (od && od.look && k in od.look)
od.look[k] = v;
}
catch (e) { }
rebuildMe();
save();
renderWardrobe();
}
var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
'<b style="color:var(--bone,#ddd);font-weight:500">Your wardrobe</b><button class="btn" id="me-close">Done</button></div>' +
'<div style="display:flex;gap:6px;margin:0 0 10px">' +
['body', 'clothes', 'extras'].map(function (t) { return '<button class="btn" data-wtab="' + t + '" style="' + (WARD_TAB === t ? "color:var(--bone,#ddd);border-color:var(--bone,#ddd)" : "") + '">' + ({ body: "You", clothes: "Clothes", extras: "Extras" })[t] + '</button>'; }).join("") + '</div>';
if (WARD_TAB === "body") {
h += selectRow("Species", S.species, SPECIES, L.species, function (v) { set("species", v || null); }, SPECIES_LABEL);
h += selectRow("Body", S.sex, ["f", "m"], L.sex, function (v) { set("sex", v || null); }, ["woman", "man"]);
h += swatchRow("Skin", S.skin, SKIN, L.skin, function (v) { set("skin", v); });
h += swatchRow("Hair", S.hair, HAIR, L.hair, function (v) { set("hair", v); });
h += selectRow("Hair style", S.hairStyle, HAIRSTYLES, L.hairStyle, function (v) { set("hairStyle", v || null); });
h += selectRow("Build", null, ["0.9", "1", "1.1", "1.2"], String(L.build || 1), function (v) { set("build", parseFloat(v) || 1); }, ["slight", "average", "sturdy", "broad"]);
if (typeof CS_EYES !== "undefined")
h += swatchRow("Eyes", S.eyes, CS_EYES, L.eyes, function (v) { set("eyes", v); });
if (typeof wardBodyExtra === "function")
h += wardBodyExtra(L, S, set);
}
function pieceRow(title, slot, cur, key, colKey, palette, noneOk) {
var keys = Object.keys(WEAR).filter(function (k) { return WEAR[k].slot === slot && (!WEAR[k].prize || wearOwned(k) || k === cur); });
var id = "ws" + Math.floor(Math.random() * 1e9);
var r = '<div class="lk-row"><div class="lk-h">' + title + '</div><select data-wear="' + id + '">';
if (noneOk)
r += '<option value="">none</option>';
keys.forEach(function (k) { var own = wearOwned(k); r += '<option value="' + k + '"' + (k === cur ? " selected" : "") + '>' + WEAR[k].label + (own ? "" : " — " + wearShownPrice(k) + " gold at the tailor's") + '</option>'; });
r += '</select></div>';
LKH[id] = function (v) {
if (v && !wearOwned(v)) {
wearBuy(v);
renderWardrobe();
return;
}
set(key, v || null);
};
if (colKey)
r += swatchRow(title + " colour", S[colKey], palette, L[colKey], function (v) { set(colKey, v); });
return r;
}
if (WARD_TAB === "clothes") {
h += swatchRow("Top", S.top, TOPS, L.top, function (v) { set("top", v); });
h += selectRow("What you wear on top", S.topKind, TOPKINDS, L.topKind, function (v) { set("topKind", v || null); }, ["shirt", "coat", "dress", "robe"]);
h += pieceRow("Over your top", "layer", L.layer, "layer", "layerColor", TOPS, true);
h += pieceRow("Below", "legs", L.bottomKind, "bottomKind", null, null, false);
h += swatchRow("Below colour", S.bottom, BOTTOMS, L.bottom, function (v) { set("bottom", v); });
h += pieceRow("On your feet", "feet", L.shoeKind || "shoes", "shoeKind", null, null, false);
h += swatchRow("Shoe colour", S.shoes, SHOES, L.shoes, function (v) { set("shoes", v); });
}
if (WARD_TAB === "extras") {
h += pieceRow("On your head", "hat", L.hat === "none" ? null : L.hat, "hat", "hatColor", TOPS, true);
h += pieceRow("On your back", "back", L.back, "back", "backColor", TOPS, true);
h += pieceRow("Your face", "face", L.face, "face", null, null, true);
h += pieceRow("Round your neck", "neck", L.neck, "neck", null, null, true);
h += pieceRow("Ears", "ears", L.ears, "ears", null, null, true);
h += pieceRow("Hands", "hands", L.hands, "hands", null, null, true);
h += pieceRow("At your waist", "waist", L.waist, "waist", null, null, true);
h += swatchRow("Accent colour (scarf, tie, gloves, mask)", S.accColor, TOPS, L.accColor, function (v) { set("accColor", v); });
if (typeof GEARS !== "undefined") {
h += selectRow("Gear", S.gear, GEARS, L.gear, function (v) { set("gear", v || "none"); }, GEAR_LABEL);
h += swatchRow("Gear colour", S.gearColor, typeof CS_PALETTE !== "undefined" ? CS_PALETTE : TOPS, L.gearColor, function (v) { set("gearColor", v); });
}
}
h += '<p style="font-size:11.5px;color:var(--dim,#999);margin:12px 0 0;line-height:1.5">Everyday clothes are always yours. Finer things are bought once at the tailor&rsquo;s in Somnucor and are yours for good. Everyone you meet sees what you wear.</p>';
w.innerHTML = h;
document.getElementById("me-close").onclick = closeWardrobe;
Array.prototype.forEach.call(w.querySelectorAll("[data-wtab]"), function (b) { b.onclick = function () { WARD_TAB = b.getAttribute("data-wtab"); renderWardrobe(); }; });
Array.prototype.forEach.call(w.querySelectorAll("[data-lk]"), function (b) { b.onclick = function () { LKH[b.getAttribute("data-lk")](parseInt(b.getAttribute("data-c"), 10)); }; });
Array.prototype.forEach.call(w.querySelectorAll("[data-lkp]"), function (inp) { inp.onchange = function () { LKH[inp.getAttribute("data-lkp")](parseInt(inp.value.slice(1), 16)); }; });
Array.prototype.forEach.call(w.querySelectorAll("[data-lks]"), function (s) { s.onchange = function () { LKH[s.getAttribute("data-lks")](s.value); }; });
Array.prototype.forEach.call(w.querySelectorAll("[data-wear]"), function (s) { s.onchange = function () { LKH[s.getAttribute("data-wear")](s.value); }; });
if (typeof loadThings === "function" && typeof signedIn === "function" && signedIn() && !renderWardrobe._loaded) {
renderWardrobe._loaded = 1;
loadThings().then(function () { renderWardrobe(); });
}
}
];
});
