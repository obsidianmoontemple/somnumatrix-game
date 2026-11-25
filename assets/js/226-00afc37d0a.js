/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SCH = { d: null, at: 0, busy: false, open: false, warned: 0 };
function schLoad(force) { return __ZC(226, 0, this, arguments, new.target); }
function schPool(k) { var ps = (SCH.d && SCH.d.pools) || []; for (var i = 0; i < ps.length; i++)
if (ps[i].key === k)
return ps[i]; return null; }
function schColour(p) { return p < 15 ? "#C0603A" : p < 40 ? "#C9A868" : "#8FCB8A"; }
function schChip(k) {
var p = schPool(k);
if (!p)
return "";
return '<span title="' + esc(p.name) + '" style="display:inline-block;margin:2px 6px 2px 0;white-space:nowrap">' + p.icon + ' ' + esc(p.name.toLowerCase()) +
' <b style="color:' + schColour(p.pct) + '">' + p.pct + '%</b></span>';
}
function schMineFor(id) { var m = (SCH.d && SCH.d.mine) || []; for (var i = 0; i < m.length; i++)
if (m[i].job_id === id)
return m[i]; return null; }
(function () {
if (typeof workPaint !== "function")
return;
var wp = workPaint;
workPaint = function () {
wp.apply(this, arguments);
try {
var el = typeof workEl === "function" ? workEl() : null;
if (!el || el.style.display === "none")
return;
schLoad();
var jobs = (WORK.data && WORK.data.jobs) || [], boxes = el.querySelectorAll(".job");
jobs.forEach(function (j, ji) {
var m = schMineFor(j.job_id), box = boxes[ji];
if (!m || !box)
return;
if (!(m.uses || []).length && !(m.makes || []).length)
return;
var d = document.createElement("div");
d.style.cssText = "margin-top:6px;padding:5px 7px;border:1px solid rgba(201,168,104,.25);border-radius:4px;font-size:12.5px;line-height:1.5";
d.innerHTML = ((m.uses || []).length ? '<div><span style="color:var(--dim)">Your work needs</span> ' + m.uses.map(schChip).join("") + '</div>' : '') +
((m.makes || []).length ? '<div><span style="color:var(--dim)">Your work supplies</span> ' + m.makes.map(schChip).join("") +
(m.makes.some(function (k) { var p = schPool(k); return p && p.pct < 25; }) ? ' <span style="color:#E8C27A">· the city is short: 5 gold extra a task</span>' : '') + '</div>' : '');
box.insertBefore(d, box.querySelector(".tk"));
});
if (!document.getElementById("sch-open")) {
var b = document.createElement("div");
b.style.cssText = "margin-top:8px";
b.innerHTML = '<button class="btn" id="sch-open">🔗 Every store the city keeps, and who fills it</button>';
el.appendChild(b);
document.getElementById("sch-open").onclick = function () { schOpen(); };
}
}
catch (e) {
if (!SCH.warned && window.console) {
SCH.warned = 1;
console.warn("[supply]", e);
}
}
};
})();
function schAfterTask(o) {
var s = o && o.ok && o.supply;
if (!s || !(s.made || []).length)
return;
setTimeout(function () {
setStatus("🔗 Into the city's stores: <b>" + esc(s.made.join(", ")) + "</b>." + (s.bonus ? " +" + s.bonus + " gold for supplying it while the city was short." : ""));
}, 2200);
SCH.at = 0;
}
(function () {
if (typeof cityRpc !== "function")
return;
var cr = cityRpc;
cityRpc = function (name, body) {
var p = cr.apply(this, arguments);
if (name === "do_task" && p && p.then)
p.then(schAfterTask, function () { });
return p;
};
})();
function schHtml() { return __ZC(226, 1, this, arguments, new.target); }
function schPaint() { return __ZC(226, 2, this, arguments, new.target); }
function schOpen() {
SCH.open = true;
schPaint();
if (!(typeof signedIn === "function" && signedIn())) {
SCH.d = { pools: [] };
schPaint();
return;
}
schLoad(true);
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
}
if (typeof backRegister === "function")
backRegister({ order: 3, open: function () { return SCH.open; }, close: function () { SCH.open = false; schPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-supply"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-supply";
b.textContent = "🔗 City supply";
b.title = "What the city's work needs, and who supplies it";
b.onclick = function () { schOpen(); };
var pk = document.getElementById("me-memory") || document.getElementById("me-pets");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () { if (!document.hidden && SCH.open && Date.now() - SCH.at > 30000)
schLoad(true); }, 5000);
