/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(340, function () {
return [
function () {
if (VO.css)
return;
VO.css = true;
var s = document.createElement("style");
s.id = "vo-style";
s.textContent = ".vo-tuck{visibility:hidden!important;pointer-events:none!important}" +
".vo-tuck .vo-keep{visibility:visible!important;pointer-events:auto!important}" +
".vo-keep .vo-tuck{visibility:hidden!important;pointer-events:none!important}";
document.head.appendChild(s);
},
function (mode) {
voCss();
var one = VO_KEEP_ONE[mode] || {}, box = VO_KEEP_BOX[mode] || {};
var kids = document.body ? document.body.children : [];
for (var i = 0; i < kids.length; i++) {
var el = kids[i], id = el.id || "", tag = el.tagName;
if (tag === "SCRIPT" || tag === "STYLE" || tag === "CANVAS" || tag === "LINK")
continue;
if (VO_KEEP_ALL[id] || box[id])
continue;
if (el.classList.contains("vo-tuck"))
continue;
if (voIsCard(el))
continue;
var pressable = (el.matches && el.matches(VO_PRESS)) || !!el.querySelector(VO_PRESS);
if (!pressable)
continue;
if (el.querySelector && el.querySelector("#dhud,#mm-hud,#mm-pad,#mp-bar,#py-hud,#ugd"))
continue;
voTuck(el);
if (VO_ROWS[id])
Array.prototype.forEach.call(el.querySelectorAll("[id]"), function (b) { if (one[b.id])
voKeep(b); });
}
},
function () {
var items = [], seen = {};
var ids = ["dhud", "ugd", "mm-hud", "mm-pad", "mp-bar", "py-pad", "bw-pad", "txi-box", "tgl-box", "pass-bar", "pass-panel", "sp-bar"];
ids.forEach(function (id) {
var box = document.getElementById(id);
if (!box || getComputedStyle(box).display === "none")
return;
Array.prototype.forEach.call(box.querySelectorAll("button,[role=button],[data-mm]"), function (b) {
if (getComputedStyle(b).display === "none" || b.hidden)
return;
var t = (b.title || b.innerText || b.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
if (!t || seen[t])
return;
seen[t] = 1;
items.push({ t: t, run: function () {
if (b.hasAttribute("data-mm")) {
try {
b.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
b.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
}
catch (e) { }
}
else
b.click();
} });
});
});
if (typeof BW !== "undefined" && BW.ride && typeof bwAttack === "function" && !seen["🔥 Fire"])
items.unshift({ t: "🔥 Fire", run: function () { bwAttack(); } });
items.push({ t: "🚪 Leave VR", run: function () { try {
VRM.xr.end();
}
catch (e) { } } });
return items;
}
];
});
