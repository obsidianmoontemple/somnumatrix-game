/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DMENU = { ok: false };
function dmOpen() { var m = document.getElementById("more"); return !!(m && !m.hasAttribute("hidden")); }
function dmShut() {
var m = document.getElementById("more"), b = document.getElementById("morebtn");
if (!m || m.hasAttribute("hidden"))
return;
m.setAttribute("hidden", "");
if (b)
b.setAttribute("aria-expanded", "false");
}
function dmBuild() {
if (DMENU.ok)
return;
var more = document.getElementById("more"), mb = document.getElementById("morebtn"), row = more && more.parentNode && more.parentNode.querySelector(".row");
if (!more || !mb || !row)
return;
DMENU.ok = true;
var st = document.createElement("style");
st.textContent =
"#scrim .row{position:relative;z-index:5}" +
"#scrim #more{position:absolute;z-index:30;right:0;bottom:calc(100% + 8px);margin:0;display:block;" +
"width:min(340px,calc(100vw - 32px));max-height:min(62vh,520px);overflow-y:auto;-webkit-overflow-scrolling:touch;" +
"padding:10px 10px 6px;border:1px solid rgba(201,190,168,.35);border-radius:12px;background:#0B0B12;isolation:isolate;" +
"box-shadow:0 10px 30px rgba(0,0,0,.55)}" +
"#scrim #more[hidden]{display:none}" +
"#scrim #more .more-g{display:flex;flex-direction:column;align-items:stretch;gap:4px;margin:0 0 10px}" +
"#scrim #more .more-h{width:auto;margin:2px 4px 2px}" +
"#scrim #more .btn{display:block;width:100%;text-align:left;padding:10px 12px;font-size:14px;background:#14141C}" +
"#morebtn .dm-c{display:inline-block;margin-left:6px;font-size:.8em}" +
"body.ps-phone:not(.ps-walk) #ps-menu,body.ps-phone:not(.ps-walk) #ps-sheet{display:none!important}" +
".dm-tuck{visibility:hidden!important;pointer-events:none!important}";
document.head.appendChild(st);
row.appendChild(more);
var g = document.createElement("div");
g.className = "more-g";
g.innerHTML = '<span class="more-h">This dream</span>';
["plotbtn", "landbtn", "setbtn"].forEach(function (id) { var b = document.getElementById(id); if (b)
g.appendChild(b); });
more.insertBefore(g, more.firstChild);
mb.innerHTML = '☰ Menu<span class="dm-c" aria-hidden="true">▾</span>';
mb.setAttribute("aria-haspopup", "true");
var also = document.createElement("div");
also.className = "more-g";
also.id = "dm-also";
more.insertBefore(also, g.nextSibling);
mb.addEventListener("click", function () {
if (!dmOpen())
return;
var secs = (typeof psMenuSections === "function") ? psMenuSections(false, { noExtras: true }) : [], n = 0;
also.innerHTML = "";
secs.forEach(function (sc) {
var h = document.createElement("span");
h.className = "more-h";
h.textContent = sc.t;
also.appendChild(h);
sc.items.forEach(function (it) {
var x = document.createElement("button");
x.type = "button";
x.className = "btn";
x.textContent = it.label;
x.addEventListener("click", function () { setTimeout(it.run, 30); });
also.appendChild(x);
n++;
});
});
also.style.display = n ? "" : "none";
});
var fit = function () {
if (!dmOpen())
return;
var top = row.getBoundingClientRect().top;
more.style.maxHeight = Math.max(150, Math.min(520, top - 104)) + "px";
};
mb.addEventListener("click", fit);
window.addEventListener("resize", fit);
more.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("button") : null;
if (t)
setTimeout(dmShut, 0);
});
document.addEventListener("pointerdown", function (e) {
if (!dmOpen())
return;
var t = e.target;
if (t && (t === mb || mb.contains(t) || more.contains(t)))
return;
dmShut();
}, true);
document.addEventListener("keydown", function (e) { if (e.key === "Escape" && dmOpen())
dmShut(); });
}
function dmTick() {
if (typeof psCandidates !== "function")
return;
var dream = !(typeof walkMode !== "undefined" && walkMode);
psCandidates().forEach(function (c) { if (c.box.classList.contains("dm-tuck") !== dream)
c.box.classList.toggle("dm-tuck", dream); });
}
(function () {
var go = function () {
try {
dmBuild();
}
catch (e) {
if (window.console)
console.warn("[dream-menu]", e);
}
setInterval(function () { try {
dmTick();
}
catch (e) { } }, 500);
};
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go();
})();
