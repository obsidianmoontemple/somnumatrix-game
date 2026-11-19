/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(262, function () {
"use strict";
return [
function () {
var P = camera.position, out = [], seen = {};
function add(name, x, z, kind) {
if (!name || x == null || z == null)
return;
var k = String(name);
if (seen[k])
return;
seen[k] = 1;
var dx = x - P.x, dz = z - P.z, d = Math.hypot(dx, dz), b = bearingOf(dx, dz);
out.push({ name: k, x: x, z: z, d: d, b: b, kind: kind || "" });
}
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null, inCity = r && (store.here || 0) === r.id && !(typeof WLD !== "undefined" && WLD.on);
if (inCity && store.workplaceAt)
Object.keys(store.workplaceAt).forEach(function (k) { var w = store.workplaceAt[k]; if (w)
add(k, w.x, w.z, "place"); });
var here = store.here || 0;
(store.objects || []).forEach(function (o) {
if (!o || (o.realm || 0) !== here || o.filler)
return;
var n = o.workplace || o.label || o.name;
if (!n || /^sc\d/.test(n))
return;
if (o.archetype === "signboard" || o.archetype === "streetsign")
return;
add(n, o.x, o.z, o.archetype);
});
if (typeof WLD !== "undefined" && WLD.on && WLD.w && Array.isArray(WLD.w.places))
WLD.w.places.forEach(function (q) { if (q && q.name)
add(q.name, (WLD.w.base || 0) + (q.x || 0), q.z || 0, "place"); });
return out.sort(function (a, b) { return a.d - b.d; });
},
function () {
var el = document.getElementById("pfind");
if (el)
return el;
el = document.createElement("div");
el.id = "pfind";
el.style.cssText = "position:fixed;z-index:56;left:clamp(10px,4vw,40px);top:calc(150px + env(safe-area-inset-top,0px));width:min(380px,calc(100vw - 24px));max-height:min(64vh,560px);display:none;flex-direction:column;" +
"background:linear-gradient(180deg,rgba(18,15,24,.97),rgba(9,8,12,.98));border:1px solid #8A7A4A;border-radius:8px;padding:10px 12px 12px;color:var(--bone,#C9BEA8);font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6)";
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:500 15px var(--serif,Georgia);color:#F0E0B8">🧭 Places, by distance</b><button class="btn" data-pf="x">Close</button></div>' +
'<input id="pfind-q" type="search" placeholder="Search: bakery, temple, garage…" style="margin:8px 0 6px;padding:7px 9px;border-radius:6px;border:1px solid rgba(201,190,168,.4);background:#0C0B14;color:#E6E0D2;font:14px var(--sans,system-ui)">' +
'<div id="pfind-list" style="overflow-y:auto;-webkit-overflow-scrolling:touch"></div>';
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-pf]");
if (!b)
return;
var a = b.getAttribute("data-pf");
if (a === "x")
return pfindClose();
var pl = (PFIND.list || [])[+a];
if (!pl)
return;
guideTo = { key: pl.name, x: pl.x, z: pl.z };
pfindClose();
setStatus("<b>" + esc(pl.name) + "</b>: " + pfindDist(pl.d) + " to the " + PFIND_POINTS[Math.round(pl.b / 45) % 8] + ". Follow the pointer at the top of the screen; it counts down as you go. Tap it to stop.");
});
document.body.appendChild(el);
document.getElementById("pfind-q").addEventListener("input", function () { PFIND.q = this.value; pfindPaint(); });
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return PFIND.open; }, close: pfindClose });
return el;
},
function () {
var el = pfindEl();
if (!PFIND.open) {
el.style.display = "none";
return;
}
el.style.display = "flex";
var q = String(PFIND.q || "").toLowerCase().trim(), all = pfindPlaces();
PFIND.list = q ? all.filter(function (p) { return p.name.toLowerCase().indexOf(q) >= 0 || String(p.kind).toLowerCase().indexOf(q) >= 0; }) : all;
var L = document.getElementById("pfind-list"), h = "";
if (!PFIND.list.length)
h = '<div style="color:var(--dim,#999);padding:6px 0">' + (all.length ? "Nothing by that name here." : "No named places in this world yet.") + '</div>';
PFIND.list.slice(0, 80).forEach(function (p, i) {
h += '<div data-pf="' + i + '" style="display:flex;justify-content:space-between;gap:10px;padding:6px 2px;border-bottom:1px solid rgba(255,255,255,.06);cursor:pointer">' +
'<span>' + esc(p.name) + '</span><span style="white-space:nowrap;color:#E8C27A"><b>' + pfindArrow(p.b) + '</b> ' + pfindDist(p.d) + ' <span style="color:var(--dim,#999)">' + PFIND_POINTS[Math.round(p.b / 45) % 8] + '</span></span></div>';
});
L.innerHTML = h;
}
];
});
