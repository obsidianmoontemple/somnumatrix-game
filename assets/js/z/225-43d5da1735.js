/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(225, function () {
"use strict";
return [
function (force) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve();
if (SCH.busy || (!force && Date.now() - SCH.at < 45000))
return Promise.resolve();
SCH.busy = true;
return cityRpc("supply_board", {}).then(function (o) { if (o && o.ok)
SCH.d = o; }).catch(function () { })
.then(function () { SCH.busy = false; SCH.at = Date.now(); if (typeof WORK !== "undefined" && WORK.open)
workPaint(); if (SCH.open)
schPaint(); });
},
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:6px'><b style='font-size:15px;flex:1'>🔗 City supply</b><button class='btn' data-sch='x'>Close</button></div>" +
"<p style='font-size:12px;opacity:.85;margin:0 0 8px'>Every job leans on another, as in a real city. Each task done by a job that makes something fills its store; each task by a job that needs it takes a little out. " +
"An empty store holds up the jobs that need it until someone supplies it (the city's stand-ins bring a little each hour). While a store is under a quarter full, the jobs that supply it earn 5 gold extra a task.</p>";
var d = SCH.d;
if (!d)
return h + "<p>Looking…</p>";
(d.pools || []).forEach(function (p) {
h += "<div style='padding:6px 0;border-top:1px solid rgba(201,168,104,.2)'><div style='display:flex;align-items:center;gap:6px'><span style='font-size:18px'>" + p.icon + "</span><b style='flex:1'>" + esc(p.name) + "</b><span style='color:" + schColour(p.pct) + "'>" + p.pct + "%</span></div>" +
"<div style='height:7px;background:#2A2418;border-radius:4px;overflow:hidden;margin:3px 0'><span style='display:block;height:100%;width:" + p.pct + "%;background:" + schColour(p.pct) + "'></span></div>" +
"<div style='font-size:12px;opacity:.85'>Made by " + esc(p.who) + ".</div>" + (p.needed_by ? "<div style='font-size:12px;opacity:.85'>Needed by " + esc(p.needed_by) + ".</div>" : "") +
(p.workers ? "<div style='font-size:12px;color:#B8E0A0'>" + p.workers + " dreamer" + (p.workers === 1 ? "" : "s") + " brought in " + p.hour + " in the last hour.</div>" : "") + "</div>";
});
return h;
},
function () {
var el = document.getElementById("sch-box");
if (!SCH.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "sch-box";
el.style.cssText = "position:fixed;z-index:54;left:50%;top:50%;transform:translate(-50%,-50%);width:min(520px,calc(100vw - 32px));max-height:min(86vh,780px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(28,22,14,.97),rgba(10,9,7,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) { var t = e.target.closest && e.target.closest("[data-sch]"); if (t && t.getAttribute("data-sch") === "x") {
SCH.open = false;
schPaint();
} });
document.body.appendChild(el);
}
var top = el.scrollTop;
el.innerHTML = schHtml();
el.style.display = "block";
el.scrollTop = top;
}
];
});
