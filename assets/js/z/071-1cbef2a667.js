/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(71, function () {
"use strict";
return [
function () {
var w = document.getElementById("me-ward");
if (!w) {
w = document.createElement("div");
w.id = "me-ward";
w.style.cssText = "position:fixed;top:64px;right:12px;z-index:62;width:min(300px,calc(100vw - 24px));max-height:calc(100vh - 90px);overflow-y:auto;" +
"background:rgba(11,13,19,.94);border:1px solid var(--line,#333);padding:14px 16px;border-radius:3px";
if (document.body)
document.body.appendChild(w);
}
if (meView !== "mirror")
meBefore = meView;
setView("mirror");
renderWardrobe();
w.style.display = "block";
},
function () {
var w = document.getElementById("me-ward");
if (!w)
return;
LKH = {};
var L = meLook(), S = L.src || {};
function set(k, v) { L[k] = v; L.src = L.src || {}; L.src[k] = "chosen"; rebuildMe(); save(); renderWardrobe(); }
var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
'<b style="color:var(--bone,#ddd);font-weight:500">How you look</b><button class="btn" id="me-close">Done</button></div>' +
'<p style="font-size:12px;color:var(--dim,#999);margin:0 0 10px;line-height:1.5">Turn to see yourself from behind with the View button. Only you choose this.</p>';
h += selectRow("Species", S.species, SPECIES, L.species, function (v) { set("species", v || null); }, SPECIES_LABEL);
h += selectRow("Body", S.sex, ["f", "m"], L.sex, function (v) { set("sex", v || null); }, ["woman", "man"]);
h += swatchRow("Skin", S.skin, SKIN, L.skin, function (v) { set("skin", v); });
h += swatchRow("Hair", S.hair, HAIR, L.hair, function (v) { set("hair", v); });
h += selectRow("Hair style", S.hairStyle, HAIRSTYLES, L.hairStyle, function (v) { set("hairStyle", v || null); });
h += swatchRow("Top", S.top, TOPS, L.top, function (v) { set("top", v); });
h += selectRow("What you wear on top", S.topKind, TOPKINDS, L.topKind, function (v) { set("topKind", v || null); }, ["shirt", "coat", "dress", "robe"]);
h += swatchRow("Bottom", S.bottom, BOTTOMS, L.bottom, function (v) { set("bottom", v); });
h += selectRow("Below", S.bottomKind, BOTTOMKINDS, L.bottomKind, function (v) { set("bottomKind", v || null); }, ["trousers", "skirt"]);
h += swatchRow("Shoes", S.shoes, SHOES, L.shoes, function (v) { set("shoes", v); });
h += selectRow("Hat", S.hat, HATS, L.hat, function (v) { set("hat", v || null); }, ["none", "cap", "brimmed hat", "hood"]);
w.innerHTML = h;
document.getElementById("me-close").onclick = closeWardrobe;
Array.prototype.forEach.call(w.querySelectorAll("[data-lk]"), function (b) { b.onclick = function () { LKH[b.getAttribute("data-lk")](parseInt(b.getAttribute("data-c"), 10)); }; });
Array.prototype.forEach.call(w.querySelectorAll("[data-lkp]"), function (inp) { inp.onchange = function () { LKH[inp.getAttribute("data-lkp")](parseInt(inp.value.slice(1), 16)); }; });
Array.prototype.forEach.call(w.querySelectorAll("[data-lks]"), function (s) { s.onchange = function () { LKH[s.getAttribute("data-lks")](s.value); }; });
}
];
});
