/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(232, function () {
"use strict";
return [
function (e) {
if (e && e.preventDefault)
e.preventDefault();
psSave("lost");
if (document.getElementById("ps-lost"))
return;
var d = document.createElement("div");
d.id = "ps-lost";
d.innerHTML = '<div><b>Your phone ran short of memory.</b><br>Picking the dream up again…</div>';
document.body.appendChild(d);
setTimeout(function () { location.reload(); }, 1500);
},
function (root) {
var geos = new Set(), texs = new Set();
root.traverse(function (o) {
var g = o.geometry;
if (g && g.attributes) {
var whole = true;
for (var k in g.attributes) {
var a = g.attributes[k];
if (!a || !a.array || !a.array.length) {
whole = false;
break;
}
}
if (whole && g.index && (!g.index.array || !g.index.array.length))
whole = false;
if (whole)
geos.add(g);
}
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
ms.forEach(function (m) { if (!m)
return; for (var k in m) {
var t = m[k];
if (t && t.isTexture && t.image && !t.isVideoTexture && !t.isCubeTexture)
texs.add(t);
} });
});
geos.forEach(function (g) { try {
g.dispose();
}
catch (e) { } });
texs.forEach(function (t) { try {
t.dispose();
}
catch (e) { } });
return geos.size + texs.size;
},
function (el) {
if (!el.isConnected)
return false;
var cs = getComputedStyle(el);
if (cs.display === "none")
return false;
for (var p = el.parentElement; p && p !== document.body; p = p.parentElement) {
if (getComputedStyle(p).display === "none")
return false;
}
return !(el.disabled);
},
function (el) {
var t = (el.textContent || "").replace(/\s+/g, " ").trim();
if (el.id === "ph-btn")
return "📱 Phone" + (/\d+/.test(t) && +t.replace(/\D/g, "") > 0 ? " (" + t.replace(/\D/g, "") + ")" : "");
if (el.id === "tgl-btn")
return "🚘 The limousine";
if (el.id === "rsy-btn")
return "🎨 Restyle this building";
if (el.id === "pd-fold")
return t === "hide" ? "Hide the arrow pad" : "Show the arrow pad";
t = t.replace(/\s*\([A-Z0-9]\)$/, "");
var ic = PS_ICON[el.id];
if (ic && t && !/^[^A-Za-z0-9]/.test(t))
t = ic + " " + t;
return t || el.title || el.getAttribute("aria-label") || el.id;
},
function (id, box) {
for (var i = 0; i < PS_SECTIONS.length; i++)
if (PS_SECTIONS[i].ids.indexOf(id) >= 0)
return PS_SECTIONS[i];
if (box && box.id === "sp-bar")
return PS_SECTIONS[0];
for (var j = 0; j < PS_SECTIONS.length; j++)
if (PS_SECTIONS[j].k === "more")
return PS_SECTIONS[j];
return PS_SECTIONS[PS_SECTIONS.length - 1];
},
function (pc, opt) {
opt = opt || {};
var by = {}, seen = {};
PS_SECTIONS.forEach(function (s) { by[s.k] = []; });
function put(id, label, run, box) {
if (!label || seen[label])
return;
seen[label] = 1;
var s = psSectionOf(id, box), at = s.ids.indexOf(id);
by[s.k].push({ id: id, label: label, run: run, at: at < 0 ? 999 : at, n: by[s.k].length });
}
psCandidates(pc).forEach(function (c) {
if (opt.skip && opt.skip[c.el.id])
return;
if (!psAvailable(c.el))
return;
var el = c.el;
put(el.id, c.label || psLabel(el), function () { el.click(); }, c.box);
});
if (!opt.noExtras)
PS_EXTRAS.forEach(function (x) {
try {
if (x.show && !x.show(pc))
return;
put(x.id, typeof x.label === "function" ? x.label() : x.label, x.run);
}
catch (e) { }
});
return PS_SECTIONS.map(function (s) {
var it = by[s.k].sort(function (a, b) { return a.at - b.at || a.n - b.n; });
return { k: s.k, t: s.t, items: it };
}).filter(function (s) { return s.items.length; });
},
function () {
var g = document.getElementById("ps-grid");
if (!g)
return;
g.innerHTML = "";
var secs = psMenuSections(PSTD.pc), open = psOpenSec(secs);
secs.forEach(function (s) {
var on = s.k === open, h = document.createElement("div");
h.className = "ps-h ps-dd" + (on ? " on" : "");
h.setAttribute("role", "button");
h.tabIndex = 0;
h.setAttribute("aria-expanded", on ? "true" : "false");
h.setAttribute("data-sec", s.k);
h.innerHTML = '<span>' + esc(s.t) + '</span><b>' + s.items.length + (on ? ' &#9662;' : ' &#9656;') + '</b>';
function pick() {
PSTD.open = on ? "-" : s.k;
try {
localStorage.setItem("somnu.ps.open", PSTD.open);
}
catch (e) { }
psPaintSheet();
var again = g.querySelector('[data-sec="' + s.k + '"]');
if (again) {
try {
again.focus({ preventScroll: true });
again.scrollIntoView({ block: "nearest" });
}
catch (e) { }
if (typeof gpdRing === "function" && typeof GPD !== "undefined" && GPD.focus)
gpdRing(again);
}
}
h.addEventListener("click", pick);
h.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") {
e.preventDefault();
e.stopPropagation();
pick();
} });
g.appendChild(h);
s.items.forEach(function (it) {
var b = document.createElement("button");
b.type = "button";
b.textContent = it.label;
b.setAttribute("data-for", it.id || "");
if (!on)
b.className = "ps-shut";
b.addEventListener("click", function () { psClose(); setTimeout(it.run, 30); });
g.appendChild(b);
});
});
}
];
});
