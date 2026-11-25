/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(143, function () {
"use strict";
return [
function () {
if (!hallInside("The City Treasury")) {
setStatus("You hold " + GNUG.n + " gold nugget" + (GNUG.n === 1 ? "" : "s") + ". Take " + (GNUG.n === 1 ? "it" : "them") + " inside the <b>City Treasury</b> in the Civic Ring to sell" + (GNUG.pay ? " (" + GNUG.pay + " gold each to you; " + GNUG.worth + " to the coffers)" : "") + ".");
return;
}
cityRpc("sell_gold_nuggets", { p_count: GNUG.n }).then(function (o) {
setStatus(esc((o && o.say) || "The Treasury could not take them."));
goldLoad(true);
}).catch(function (e) { setStatus(esc(e.message)); });
},
function () {
var el = document.getElementById("cs-panel");
if (!el) {
if (!document.body)
return;
el = document.createElement("div");
el.id = "cs-panel";
el.style.cssText = "position:fixed;right:12px;bottom:calc(228px + env(safe-area-inset-bottom,0px));z-index:46;width:min(400px,calc(100vw - 24px));max-height:min(64vh,560px);overflow:auto;background:rgba(8,10,16,.96);border:1px solid #8EB84A;border-radius:4px;padding:12px 14px;font:13px var(--sans);color:var(--bone);line-height:1.45";
document.body.appendChild(el);
el.addEventListener("click", csClick);
}
if (!CS.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">Community service</b><button class="btn" data-cs="x">Close</button></div>';
var O = CS.order;
if (O) {
var left = Math.max(0, O.hours * 60 - O.done_min);
h += '<div style="margin:6px 0">Ordered by the court: <b>' + O.hours + ' hour' + (O.hours === 1 ? '' : 's') + '</b> for ' + esc(O.reason || "an offence") + '. <b>' + Math.ceil(left) + ' minutes</b> still to serve.</div>' +
'<div style="color:var(--dim)">Each task takes a minute and a half of real work where you stand (outdoors in the city) and counts for a quarter of an hour' + (O.supervised ? ', half as much again now: an officer is on duty' : '') + '.</div>';
if (CS.run)
h += '<div style="margin-top:8px"><b>' + esc(CS.run.task) + '</b>: ' + Math.ceil((CS.run.until - Date.now()) / 1000) + ' s more. Stay where you are.</div>';
else
h += '<div style="margin-top:6px">' + CS_TASKS.map(function (t) { return '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;margin-top:4px"><span>' + esc(t[0]) + ' <span style="color:var(--dim)">' + esc(t[1]) + '</span></span><button class="btn" data-cs="do:' + esc(t[0]) + '">Do it</button></div>'; }).join("") + '</div>';
}
else
h += '<div style="color:var(--dim);margin:6px 0">You have no community service to do.</div>';
if (CS.officer || CS.judge || (typeof amKeeper === "function" && amKeeper())) {
h += '<div style="border-top:1px solid rgba(255,255,255,.12);margin-top:8px;padding-top:7px"><b>Open orders</b></div>';
(CS.orders || []).forEach(function (o) { h += '<div style="margin-top:3px">' + esc(o.name) + ' <span style="color:var(--dim)">' + Math.round(o.done_min) + ' of ' + o.hours * 60 + ' min · ' + esc(o.reason || "") + '</span></div>'; });
if (!(CS.orders || []).length)
h += '<div style="color:var(--dim)">None open.</div>';
if (CS.judge || (typeof amKeeper === "function" && amKeeper()))
h += '<div style="margin-top:8px">Order service on a decided case: case <input id="cs-case" type="number" min="1" style="width:80px"> hours <input id="cs-hours" type="number" min="1" max="40" value="2" style="width:56px"> <button class="btn" data-cs="order">Order it</button></div>';
}
if (CS.msg)
h += '<div style="margin-top:8px;color:var(--dim)">' + esc(CS.msg) + '</div>';
el.innerHTML = h;
},
function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-cs]") : null;
if (!b)
return;
var a = b.getAttribute("data-cs"), i = a.indexOf(":"), k = i < 0 ? a : a.slice(0, i), v = i < 0 ? "" : a.slice(i + 1);
if (k === "x") {
CS.open = false;
csPaint();
return;
}
if (k === "do") {
if (store.inside || !(typeof careInCity === "function" && careInCity())) {
CS.msg = "Community service is done outdoors, in the city's streets.";
csPaint();
return;
}
CS.run = { task: v, until: Date.now() + 90000, x: camera.position.x, z: camera.position.z };
CS.msg = "";
csPaint();
setStatus("<b>" + esc(v) + ".</b> A minute and a half of honest work. Stay nearby.");
return;
}
if (k === "order") {
var c = +document.getElementById("cs-case").value, hrs = +document.getElementById("cs-hours").value;
cityRpc("court_order_service", { p_case: c, p_hours: hrs, p_note: null }).then(function (o) { CS.msg = (o && o.say) || ""; csLoad(true); }).catch(function (err) { CS.msg = err.message; csPaint(); });
}
}
];
});
