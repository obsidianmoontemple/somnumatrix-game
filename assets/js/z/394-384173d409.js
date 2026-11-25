/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(394, function () {
"use strict";
return [
function (r) {
var left = r.positions - r.taken;
return "<div style='display:flex;justify-content:space-between;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--line)'>" +
"<span>" + esc(r.title) + " <span style='color:var(--dim)'>· " + r.rate + " gold " + (r.pay_kind === "salary" ? "a week" : "an hour") +
(r.workplace ? " · " + esc(r.workplace) : "") + (r.auto_hire === false ? " · a keeper chooses" : "") + "</span></span>" +
"<span style='white-space:nowrap'>" + (left > 0 ? ("<button class='btn' data-apply='" + r.job_id + "'>" + (r.auto_hire === false ? "Apply" : "Take it") + "</button> <span style='color:var(--dim)'>" + left + " free</span>")
: "<span style='color:var(--dim)'>full</span>") +
(typeof amKeeper === "function" && amKeeper() ? " <button class='btn' data-ktake='" + r.job_id + "' title='Keeper override: take it and clock in now'>Keeper: work it</button>" : "") + "</span></div>";
},
function () {
var el = document.getElementById("city-jobs");
if (!el || !JBT.rows)
return;
var rows = JBT.rows, by = {}, open = 0;
rows.forEach(function (r) { var g = jbtGroup(r); (by[g] = by[g] || { all: 0, free: 0 }); by[g].all++; if (jbtFree(r)) {
by[g].free++;
open++;
} });
var keys = Object.keys(by).sort();
if (JBT.tab !== "open" && !by[JBT.tab])
JBT.tab = "open";
var tab = function (k, label, n) {
var on = JBT.tab === k;
return "<button type='button' class='btn' data-jbt='" + esc(k) + "' style='margin:0 6px 6px 0;padding:6px 10px;font-size:12.5px;border-radius:14px;" +
(on ? "background:var(--gold,#C9A040);color:#1E160A;border-color:var(--gold,#C9A040)" : "") + "'>" + esc(label) + " <span style='opacity:.75'>" + n + "</span></button>";
};
var h = "<input type='text' id='jbt-find' placeholder='find a job by name' value='" + esc(JBT.find) + "' style='margin:0 0 8px'>" +
"<div style='display:flex;flex-wrap:wrap'>" + tab("open", "✨ Open now", open) + keys.map(function (k) { return tab(k, k.charAt(0).toUpperCase() + k.slice(1), by[k].free); }).join("") + "</div>";
var q = JBT.find.trim().toLowerCase(), list;
if (q)
list = rows.filter(function (r) { return [r.title, r.workplace, r.panel].join(" ").toLowerCase().indexOf(q) >= 0; });
else if (JBT.tab === "open")
list = rows.filter(jbtFree);
else
list = rows.filter(function (r) { return jbtGroup(r) === JBT.tab; });
var hidden = 0;
if (!JBT.full && JBT.tab !== "open") {
var shown = list.filter(jbtFree);
hidden = list.length - shown.length;
list = shown;
}
list.sort(function (a, b) { return jbtGroup(a) < jbtGroup(b) ? -1 : jbtGroup(a) > jbtGroup(b) ? 1 : (b.rate - a.rate); });
h += "<div id='jbt-list' style='max-height:420px;overflow-y:auto;-webkit-overflow-scrolling:touch'>";
if (!list.length)
h += "<p style='color:var(--dim)'>" + (q ? "No job by that name." : "Nothing free here just now. Try another tab.") + "</p>";
else {
var last = null;
list.forEach(function (r) {
if ((JBT.tab === "open" || q) && jbtGroup(r) !== last) {
last = jbtGroup(r);
h += "<div style='margin-top:8px;color:var(--gold);font-size:12px;letter-spacing:.08em;text-transform:uppercase'>" + esc(last) + "</div>";
}
h += jbtRow(r);
});
}
h += "</div>";
if (hidden || JBT.full && JBT.tab !== "open")
h += "<div style='margin-top:6px'><button type='button' class='btn' data-jbtfull='1' style='font-size:12px'>" + (JBT.full ? "Hide full posts" : "Show " + hidden + " full post" + (hidden === 1 ? "" : "s")) + "</button></div>";
el.innerHTML = h;
el.querySelectorAll("[data-jbt]").forEach(function (b) { b.onclick = function () { JBT.tab = b.getAttribute("data-jbt"); JBT.find = ""; jbtPaint(); var l = document.getElementById("jbt-list"); if (l)
l.scrollTop = 0; }; });
var fb = el.querySelector("[data-jbtfull]");
if (fb)
fb.onclick = function () { JBT.full = !JBT.full; jbtPaint(); };
var f = document.getElementById("jbt-find");
if (f) {
f.addEventListener("keydown", function (e) { e.stopPropagation(); });
f.oninput = function () { JBT.find = f.value; var at = f.selectionStart; jbtPaint(); var g = document.getElementById("jbt-find"); if (g) {
g.focus();
try {
g.setSelectionRange(at, at);
}
catch (e) { }
} };
}
el.querySelectorAll("[data-ktake]").forEach(function (b) { b.onclick = function () { keeperTakeJob(+b.getAttribute("data-ktake")); }; });
el.querySelectorAll("[data-apply]").forEach(function (b) {
b.onclick = function () {
var row = rows.filter(function (x) { return x.job_id === +b.getAttribute("data-apply"); })[0];
applyFor(+b.getAttribute("data-apply"), (row && row.auto_hire === false) ? (prompt("A word about why you want it?") || null) : null);
};
});
}
];
});
