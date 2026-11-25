/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(535, function () {
"use strict";
return [
function () {
if (MYF.s)
return MYF.s;
try {
MYF.s = JSON.parse(localStorage.getItem(MYF.key) || "null");
}
catch (e) { }
if (!MYF.s || typeof MYF.s !== "object")
MYF.s = {};
if (!MYF_RATES.some(function (r) { return r[0] === MYF.s.rate; }))
MYF.s.rate = "some";
if (!MYF.s.off || typeof MYF.s.off !== "object")
MYF.s.off = {};
return MYF.s;
},
function () {
try {
var id = myfHere(), on = typeof dgrLevelOf === "function" && dgrLevelOf(id) > 0;
if (typeof setStatus === "function")
setStatus(on ? "⚔️ Fights can come to you here, in " + myfEsc(myfName(id)) + "." : "☮ <b>No fights for you here</b> (" + myfEsc(myfName(id)) + "). The story's own battles still come when you go to them.");
}
catch (e) { }
try {
if (typeof DGB !== "undefined" && typeof dgbClear === "function" && !(typeof dgrLevelOf === "function" && dgrLevelOf(myfHere()) > 0))
dgbClear();
}
catch (e) { }
},
function () {
var S = myfGet(), id = myfHere(), bat = myfBattle(id), here = myfName(id), off = Object.keys(S.off);
var h = "<h4>☮ Fights for you</h4><div style='font-size:12.5px;opacity:.85;margin-bottom:4px'>How often fights come to you, and where they never do. Kept on this device.</div><div class='myf-r' style='display:flex;flex-wrap:wrap;gap:5px'>";
MYF_RATES.forEach(function (r) { var on = S.rate === r[0]; h += "<button data-myf='rate:" + r[0] + "' title='" + myfEsc(r[2]) + "' style='" + (on ? "background:#5A4A1A;border-color:#FFD98A;color:#FFE7B0;font-weight:600" : "") + "'>" + (on ? "● " : "") + myfEsc(r[1]) + "</button>"; });
h += "</div><div style='font-size:12px;opacity:.75;margin:3px 0 6px'>" + myfEsc((MYF_RATES.filter(function (r) { return r[0] === S.rate; })[0] || MYF_RATES[2])[2]) + "</div>";
if (id) {
if (bat)
h += "<div style='font-size:12.5px'>Here (<b>" + myfEsc(here) + "</b>) is a place for battle: fights cannot be switched off here.</div>";
else if (S.rate === "off")
h += "<div style='font-size:12.5px'>☮ No fights come to you anywhere (Off).</div>";
else
h += "<button data-myf='here' style='margin:2px 0'>" + (S.off[id] ? "⚔️ Let fights come here again: " + myfEsc(here) : "☮ No fights here: " + myfEsc(here)) + "</button>";
}
if (off.length && S.rate !== "off")
h += "<div style='font-size:12px;margin-top:5px'>No fights for you in: " + off.map(function (k) { return myfEsc(myfName(k)) + " <button data-myf='on:" + myfEsc(k) + "' style='padding:0 6px;font-size:11px'>undo</button>"; }).join(" · ") + "</div>";
return "<div class='myf' style='border:1px solid rgba(255,217,138,.35);border-radius:8px;padding:6px 9px;margin:8px 0'>" + h + "</div>";
},
function () {
if (MYF.told)
return;
MYF.told = 1;
try {
if (localStorage.getItem("somnu.myfights.tip"))
return;
localStorage.setItem("somnu.myfights.tip", "1");
}
catch (e) { }
setTimeout(function () { try {
if (typeof setStatus === "function")
setStatus("☮ Rather explore than fight? <b>Menu › You › ⚔️ Combat › Fights for you</b>: fewer fights, none at all, or none in the places you choose.");
}
catch (e) { } }, 6000);
}
];
});
