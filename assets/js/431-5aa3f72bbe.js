/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CV = { b: null, busy: false, at: 0, say: "", form: "", sure: "", m: null, mk: { tab: "browse", b: null, busy: false, at: 0, q: "", pick: null, sure: "" } };
var CV_KIND = { parade: "🎺 A parade round the ring", notice: "📜 A notice in the Gazette", toll: "⚖️ The market toll", next_project: "🏗️ What the city builds next", grant: "💰 Treasury gold to the project" };
function cvLoad(force) {
if (CV.busy || (!force && Date.now() - CV.at < 30000) || typeof cityRpc !== "function" || !(typeof signedIn === "function" && signedIn()))
return;
CV.busy = true;
CV.at = Date.now();
cityRpc("council_board", {}).then(function (o) { if (o && o.ok)
CV.b = o; }).catch(function () { }).then(function () { CV.busy = false; if (CTY.open && CTY.tab === "council")
ctyPaint(); });
}
function cvAct(name, args, then) {
CTY.say = "…";
ctyPaint();
cityRpc(name, args).then(function (o) { CTY.say = (o && o.say) || ""; if (then)
then(o); CV.busy = false; cvLoad(true); })
.catch(function () { CTY.say = "That did not go through. Try again in a moment."; ctyPaint(); });
}
function cvRing(k) { var r = ((CV.b && CV.b.rings) || []).filter(function (x) { return x.k === k; })[0]; return r ? r.n : k; }
function cvDay(t) { var d = new Date(t); return d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" }) + ", " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
function cvLeft(t) { var m = Math.max(0, Math.round((new Date(t).getTime() - Date.now()) / 60000)); return m < 60 ? m + " min" : m < 2880 ? Math.round(m / 60) + " hours" : Math.round(m / 1440) + " days"; }
function cvBox(inner, gold) { return '<div style="border:1px solid ' + (gold ? "#C9A868" : "#2A3040") + ';border-radius:6px;padding:8px 10px;margin-bottom:8px">' + inner + '</div>'; }
function cvDim(s) { return '<div style="color:#9AA3B5;margin:3px 0">' + s + '</div>'; }
function cvBtn(act, label, attrs, on) { return '<button class="btn" data-cty="' + act + '"' + (attrs || "") + ' style="margin:3px 4px 3px 0;' + (on ? "border-color:#E8C67A;color:#F2E6C4" : "") + '">' + label + '</button>'; }
function cvRingHere() { return __ZC(431, 0, this, arguments, new.target); }
function cvHtml() { return __ZC(431, 1, this, arguments, new.target); }
function cvClick(t, a) { return __ZC(431, 2, this, arguments, new.target); }
"use strict";
function mkLoad(force) { return __ZC(431, 3, this, arguments, new.target); }
function mkAct(name, args, then) {
CTY.say = "…";
CV.mk.sure = "";
ctyPaint();
cityRpc(name, args).then(function (o) { CTY.say = (o && o.say) || ""; if (then)
then(o); CV.mk.busy = false; mkLoad(true); })
.catch(function () { CTY.say = "That did not go through. Try again in a moment."; ctyPaint(); });
}
function mkG(n) { return Number(n || 0).toLocaleString() + " gold"; }
function mkNext(l) { return l.top_bid == null ? l.price : l.top_bid + Math.max(1, Math.ceil(l.top_bid * 0.05)); }
function mkLotHtml(l, B, mineTab) { return __ZC(431, 4, this, arguments, new.target); }
function mkHtml() { return __ZC(431, 5, this, arguments, new.target); }
function mkClick(t, a) { return __ZC(431, 6, this, arguments, new.target); }
"use strict";
(function () {
if (typeof ctyHtml !== "function" || typeof ctyClick !== "function" || typeof ctyPaint !== "function")
return;
var TABS = [["weather", "Weather"], ["projects", "Projects"], ["prices", "Prices"], ["council", "🗳️ Council"], ["market", "⚖️ Market House"]];
ctyHtml = function () {
var h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🏙️ The city</b><button class="btn" data-cty="close">Close</button></div>';
h += '<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">' + TABS.map(function (t) { return '<button class="btn" data-cty="tab" data-t="' + t[0] + '" style="' + (CTY.tab === t[0] ? "border-color:#E8C67A;color:#F2E6C4" : "") + '">' + t[1] + '</button>'; }).join("") + '</div>';
if (CTY.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(CTY.say) + '</div>';
return h + (CTY.tab === "weather" ? ctyWeatherHtml() : CTY.tab === "projects" ? ctyProjectsHtml() : CTY.tab === "council" ? cvHtml() : CTY.tab === "market" ? mkHtml() : ctyPricesHtml());
};
var paint0 = ctyPaint;
ctyPaint = function () {
var keep = {}, el = document.getElementById("cty-box");
if (el)
el.querySelectorAll("input[id^=cv-],input[id^=mk-],textarea[id^=cv-],select[id^=cv-],select[id^=mk-]").forEach(function (f) { keep[f.id] = f.value; });
paint0.apply(this, arguments);
Object.keys(keep).forEach(function (id) { var f = document.getElementById(id); if (f)
f.value = keep[id]; });
};
var click0 = ctyClick;
ctyClick = function (e) {
var t = e.target.closest && e.target.closest("[data-cty]");
if (!t)
return;
var a = t.getAttribute("data-cty");
if (a === "tab") {
var tb = t.getAttribute("data-t");
if (tb === "council" || tb === "market") {
CTY.tab = tb;
CTY.say = "";
CV.form = "";
ctyPaint();
if (tb === "council")
cvLoad(true);
else
mkLoad(true);
return;
}
}
if (/^cv/.test(a)) {
cvClick(t, a);
return;
}
if (/^mk/.test(a)) {
mkClick(t, a);
return;
}
return click0.apply(this, arguments);
};
var el = document.getElementById("cty-box");
if (el) {
el.removeEventListener("click", click0);
el.addEventListener("click", ctyClick);
}
var open0 = ctyOpen;
ctyOpen = function (tab) { if (tab === "council" || tab === "market")
CTY.tab = tab; open0.apply(this, arguments); if (CTY.tab === "council")
cvLoad(true); if (CTY.tab === "market")
mkLoad(true); };
var b = document.getElementById("me-city");
if (b) {
b.title = "The city's weather, projects, prices, its ring councils and the Market House";
b.onclick = function () { ctyOpen(); };
}
})();
(function () {
if (typeof tnRows !== "function")
return;
var tr = tnRows;
tnRows = function () {
var rows = tr.apply(this, arguments);
try {
var E = CV.b && CV.b.on && CV.b.election;
if (E)
rows.push(["🗳️", E.status === "voting" ? "<b>The rings are voting</b> for their councils until " + cvDay(E.count_at) + " (☰ Menu → 🏙️ City → 🗳️ Council)" :
"<b>Stand for your ring's council</b>: nominations close " + cvDay(E.vote_from) + " (☰ Menu → 🏙️ City → 🗳️ Council)", false]);
}
catch (e) { }
return rows;
};
})();
setInterval(function () {
try {
if (CTY.open && CTY.tab === "council")
cvLoad(false);
else if (Date.now() - CV.at > 15 * 60000 && typeof ctyIn === "function" && ctyIn())
cvLoad(false);
}
catch (e) { }
try {
if (CTY.open && CTY.tab === "market")
mkLoad(false);
}
catch (e) { }
}, 10000);
if (typeof backRegister === "function")
backRegister({ order: 1, open: function () { return CTY.open && CTY.tab === "market" && !!CV.mk.pick; }, close: function () { CV.mk.pick = null; ctyPaint(); } });
