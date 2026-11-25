/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(527, function () {
"use strict";
return [
function () {
try {
if (typeof amVisiting === "function" && amVisiting() && typeof endVisit === "function")
endVisit();
}
catch (e) { }
try {
if (typeof DRIVE !== "undefined" && DRIVE.on && typeof vehicleEnd === "function")
vehicleEnd();
}
catch (e) { }
try {
if (store.inside && typeof exitInterior === "function")
exitInterior(true);
}
catch (e) { }
try {
if (typeof closeLand === "function")
closeLand();
}
catch (e) { }
try {
if (typeof psClose === "function")
psClose();
}
catch (e) { }
try {
if (typeof CTY !== "undefined" && CTY.open && typeof ctyPaint === "function") {
CTY.open = false;
ctyPaint();
}
}
catch (e) { }
try {
if (typeof TXI !== "undefined" && TXI.box && !TXI.state && typeof txiOpen === "function")
txiOpen(false);
}
catch (e) { }
},
function (then) {
try {
if (typeof joinedSomnucor === "function" && !joinedSomnucor() && typeof joinSomnucor === "function") {
if (typeof cityAllowed === "function" && !cityAllowed()) {
if (typeof cdrTurnBack === "function")
cdrTurnBack(true);
return;
}
joinSomnucor();
setTimeout(function () { try {
then();
}
catch (e) { } }, 400);
return;
}
}
catch (e) { }
then();
},
function () {
var h = wtcCtyHtml.apply(this, arguments);
if (wtcInCity())
return h;
var bar = '<div style="margin:0 0 10px;padding:8px 10px;border:1px solid rgba(232,198,122,.45);border-radius:8px;background:rgba(232,198,122,.07)">' +
'<div style="margin:0 0 6px;color:#F2E6C4">You are not in Somnucor now. Go there in one step:</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap">' + wtcButtons() + '</div></div>';
var k = h.indexOf('<div style="display:flex;gap:6px;margin-bottom:10px">');
return k > 0 ? h.slice(0, k) + bar + h.slice(k) : bar + h;
},
function (on) {
var r = wtcTxiOpen.apply(this, arguments);
try {
if (!on || !TXI.box || TXI.state || wtcInCity())
return r;
TXI.box.innerHTML = "<div style='display:flex;justify-content:space-between'><h3>🚕 Somnucor Cabs</h3><span data-wtcx='1' style='cursor:pointer'>✕</span></div>" +
"<div class='s'>Cabs only drive Somnucor's streets, so one can't come for you here. Step across to the city first. It's free, and a cab can take you on from there.</div>" +
"<div style='margin-top:8px'>" + wtcButtons() + "</div>";
var x = TXI.box.querySelector("[data-wtcx]");
if (x)
x.onclick = function (ev) { ev.stopPropagation(); txiOpen(false); };
}
catch (e) { }
return r;
}
];
});
