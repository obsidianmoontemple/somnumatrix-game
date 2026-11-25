/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PB = { np: 0, warned: 0 };
var PB_LIST = [
{ id: "north", name: "The Palace of the North King", icon: "❄️", where: "The North Pole, on the snow hill east of the village",
note: "Ice-stone and crystal under a great dome. The way there is up any cold fireplace: put the fire out, then examine it." },
{ id: "volcano", name: "The Volcano Castle", icon: "🌋", where: "The Harvest Ring, by the Gem Pits",
note: "A castle inside a living volcano. Its gate is cut into the volcano's foot." },
{ id: "crown", name: "The Crown Estate", icon: "👑", where: "The Crescent, on the High Ring",
note: "The grandest house in the city, behind its own gates." },
{ id: "lounge", name: "GiGi's Lounge", icon: "💜", where: "The Market Ring",
note: "GiGi's plush game house: Bingo, Mahjong, Solitaire and tournaments." },
{ id: "lawanda", name: "GiGi's House", icon: "🏡", where: "The Crescent, on the High Ring",
note: "GiGi's own home. Private: the butler receives callers at the door." }
];
function pbById(id) { for (var i = 0; i < PB_LIST.length; i++)
if (PB_LIST[i].id === id)
return PB_LIST[i]; return null; }
function pbMatch(P, q) {
q = String(q || "").trim().toLowerCase();
if (!q)
return true;
return (P.name + " " + P.where + " palace castle estate great house").toLowerCase().indexOf(q) >= 0;
}
function pbVolcanoSpec() {
var L = store.objects || [];
for (var i = 0; i < L.length; i++) {
var o = L[i];
if (o.archetype === "castle" && (o.label === "The Volcano Castle" || o.name === "The Volcano Castle"))
return o;
}
return null;
}
function pbSpec(P) {
if (P.id === "volcano")
return pbVolcanoSpec();
if (P.id === "lounge")
return typeof ktSpecFor === "function" ? ktSpecFor(P.name) : null;
if (P.id === "crown" || P.id === "lawanda")
return typeof awlHomeSpec === "function" ? awlHomeSpec(P.name) : null;
return null;
}
function pbDoor(sp) {
try {
var D = typeof doorWorld === "function" ? doorWorld(sp) : null;
if (D && D.out)
return { x: D.x + D.out.x * 3, z: D.z + D.out.z * 3 };
}
catch (e) { }
return { x: sp.x, z: sp.z };
}
function pbKerb(pt) { return __ZC(317, 0, this, arguments, new.target); }
function pbHearth() { return __ZC(317, 1, this, arguments, new.target); }
function pbNpGate() { if (typeof ipW !== "function" || typeof NP === "undefined")
return null; var w = ipW(0, 246); return { x: NP.base + w.x, z: w.z }; }
function pbInSomnucor() { var r = typeof somnucorRealm === "function" ? somnucorRealm() : null; return !!r && (store.here || 0) === r.id && !(typeof WLD !== "undefined" && WLD.on); }
function pbToCity() { var r = typeof somnucorRealm === "function" ? somnucorRealm() : null; if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor(); }
function pbGo(id, quiet) { return __ZC(317, 2, this, arguments, new.target); }
(function () {
if (typeof fireEnsureHome !== "function")
return;
var fe = fireEnsureHome;
fireEnsureHome = function () {
var r = fe.apply(this, arguments);
try {
if (INT && INT.wpKey === "The Tavern" && !INT.pbHearth && INT.root && typeof FURN !== "undefined" && FURN.fireplace) {
INT.pbHearth = 1;
var has = INT.root.children.some(function (c) { return c.userData && c.userData.furn === "fireplace"; });
if (!has) {
var best = null;
[-1, 1].forEach(function (sd) {
[0, -0.25, 0.2].forEach(function (f) {
var x = sd * (INT.W / 2 - 0.45), z = f * INT.D, clear = 99;
INT.root.children.forEach(function (c) { if (!c.userData || !c.userData.furn || c.position.y > 1)
return; clear = Math.min(clear, Math.hypot(c.position.x - x, c.position.z - z)); });
if (!best || clear > best.c)
best = { x: x, z: z, r: sd > 0 ? -Math.PI / 2 : Math.PI / 2, c: clear };
});
});
var g = FURN.fireplace();
g.userData.furn = "fireplace";
g.position.set(best.x, 0, best.z);
g.rotation.y = best.r;
INT.root.add(g);
}
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof guideTick !== "function")
return;
var gt = guideTick;
guideTick = function () {
try {
if (guideTo && guideTo.np && store.inside && typeof INT !== "undefined" && INT &&
(guideTo.home ? (INT.spec && INT.spec.id === guideTo.home) : INT.wpKey === guideTo.key)) {
guideTo = null;
var el = document.getElementById("guide");
if (el)
el.style.display = "none";
setStatus("<b>The way to the Palace of the North King:</b> find the fireplace here, put the fire out (E), then examine it and look up the chimney.");
return;
}
}
catch (e) { }
return gt.apply(this, arguments);
};
})();
(function () {
var np = typeof WORLDS !== "undefined" && WORLDS.northpole;
if (!np)
return;
var e0 = np.enter;
np.enter = function (opt) {
var r = e0.apply(this, arguments);
try {
if (PB.np && Date.now() - PB.np < 3600000 && !(opt && opt.palace)) {
PB.np = 0;
var g = pbNpGate();
if (g) {
guideTo = { key: "The Palace of the North King", x: g.x, z: g.z };
setStatus("<b>The North Pole.</b> The Palace of the North King is up the snow hill east of the village: follow the pointer at the top of the screen.");
}
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof vrmScreenText !== "function")
return;
var st = vrmScreenText;
vrmScreenText = function () {
var t = st.apply(this, arguments);
try {
var g = document.getElementById("guide");
if (g && g.style.display !== "none" && guideTo) {
var s = (g.textContent || "").replace(/\s+/g, " ").trim();
if (s && String(t).indexOf(s) < 0)
t = t ? s + "\n" + t : s;
}
}
catch (e) { }
return t;
};
})();
function pbTarget(P) {
if (P.id === "north") {
var T = typeof tglTarget === "function" ? tglTarget("wp:The Tavern") : null;
if (T)
T.name = P.name + " (by the Tavern's fireplace)";
return T;
}
var sp = pbSpec(P);
if (!sp)
return null;
var k = pbKerb(pbDoor(sp));
return { x: k.x, z: k.z, name: P.name };
}
(function () {
if (typeof tglTarget === "function") {
var tt = tglTarget;
tglTarget = function (k) {
if (typeof k === "string" && k.indexOf("pl:") === 0) {
var P = pbById(k.slice(3));
return P ? pbTarget(P) : null;
}
return tt.apply(this, arguments);
};
}
if (typeof wtLabel === "function") {
var wl = wtLabel;
wtLabel = function (k) {
if (typeof k === "string" && k.indexOf("pl:") === 0) {
var P = pbById(k.slice(3));
if (P)
return P.id === "north" ? P.name + " (by the Tavern's fireplace)" : P.name;
}
return wl.apply(this, arguments);
};
}
if (typeof wtListHtml === "function") {
var wh = wtListHtml;
wtListHtml = function (sel) {
var h = wh.apply(this, arguments);
try {
var q = String(WT.q || "").trim(), all = !!q, L = PB_LIST.filter(function (P) { return pbMatch(P, q); });
if (!L.length)
return h;
if (/No place by that name\./.test(h) && h.indexOf("data-wk") < 0)
h = "";
var on = all || WT.open["pal"];
var H = ["<div class='wt-h l0' data-wg='pal'><span>" + (on ? "▾ " : "▸ ") + "Palaces and great houses</span><span class='s'>" + L.length + "</span></div>"];
if (on)
L.forEach(function (P) {
var k = "pl:" + P.id;
H.push("<div class='wt-p l1" + (k === sel ? " on" : "") + "' data-wk='" + esc(k) + "'>" + esc(P.icon + " " + P.name) + " <span class='s' style='opacity:.7'>· " + esc(P.where) + "</span></div>");
});
var cut = h.indexOf("<div class='wt-h");
return cut < 0 ? h + H.join("") : h.slice(0, cut) + H.join("") + h.slice(cut);
}
catch (e) {
return h;
}
};
}
if (typeof tglPlaces === "function") {
var tp = tglPlaces;
tglPlaces = function () { var L = tp.apply(this, arguments); try {
PB_LIST.forEach(function (P) { L.push({ k: "pl:" + P.id, name: wtLabel("pl:" + P.id) }); });
}
catch (e) { } return L; };
}
if (typeof txiCall === "function") {
var tc = txiCall;
txiCall = function (k) { var r = tc.apply(this, arguments); try {
if (typeof k === "string" && k.indexOf("pl:") === 0 && typeof TXI !== "undefined" && TXI.state)
pbGo(k.slice(3), true);
}
catch (e) { } return r; };
}
if (typeof tglGo === "function") {
var tg = tglGo;
tglGo = function (k) { var r = tg.apply(this, arguments); try {
if (typeof k === "string" && k.indexOf("pl:") === 0)
pbGo(k.slice(3), true);
}
catch (e) { } return r; };
}
})();
(function () {
if (typeof phBookPlaces !== "function" || typeof phPaint !== "function")
return;
var bp = phBookPlaces;
phBookPlaces = function (bk) {
var h = bp.apply(this, arguments);
try {
var q = String(PH.q || "").trim(), L = PB_LIST.filter(function (P) { return pbMatch(P, q); });
if (!L.length)
return h;
var H = ["<div class='s' style='margin:12px 2px 2px;font-weight:600'>Palaces and great houses · " + L.length + "</div>"];
L.forEach(function (P) {
H.push("<div class='row pb-r'><div style='display:flex;justify-content:space-between;align-items:center;gap:8px'><span class='n'>" + esc(P.icon + " " + P.name) + "</span>" +
"<span style='display:flex;gap:6px'><button data-pbcab='" + esc(P.id) + "' style='" + PH_BTN2 + "'>Cab</button><button data-pbway='" + esc(P.id) + "' style='" + PH_BTN + "'>Directions</button></span></div>" +
"<div class='s'>" + esc(P.where) + "</div><div class='s'>" + esc(P.note) + "</div></div>");
});
return H.join("") + h;
}
catch (e) {
return h;
}
};
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
var box = document.getElementById("ph-box");
if (!box || PH.tab !== "book")
return r;
var on = function (sel, fn) { box.querySelectorAll(sel).forEach(function (el) { el.onclick = function (ev) { ev.stopPropagation(); fn(el); }; }); };
on("[data-pbway]", function (el) { var id = el.getAttribute("data-pbway"); PH.open = false; phPaint(); pbGo(id); });
on("[data-pbcab]", function (el) {
var id = el.getAttribute("data-pbcab");
PH.open = false;
phPaint();
if (typeof txiOpen !== "function" || typeof TXI === "undefined") {
pbGo(id);
return;
}
if (id === "north" && typeof WLD !== "undefined" && WLD.on === "northpole") {
pbGo(id);
return;
}
TXI.sel = "pl:" + id;
if (typeof WT !== "undefined")
WT.open.pal = true;
txiOpen(true);
});
}
catch (e) {
if (!PB.warned++ && window.console)
console.warn("[palace book]", e);
}
return r;
};
})();
