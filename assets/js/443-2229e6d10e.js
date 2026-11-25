/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CDR = { asked: 0, told: 0, poll: null, was: null };
function cityAllowed() {
if (typeof window !== "undefined") {
if (typeof window.SOMNU_CITY === "boolean")
return window.SOMNU_CITY;
if (window.SOMNU_ACCESS === true)
return true;
}
var me = typeof accessMe === "function" ? accessMe() : null, a = typeof accessRead === "function" ? accessRead() : null;
if (!me || !a || a.user_id !== me)
return false;
if (a.keeper)
return true;
if (a.city === true)
return true;
if (a.city === false)
return false;
return typeof hasAccess === "function" && hasAccess();
}
function cityPassStatus() { var a = typeof accessRead === "function" ? accessRead() : null; return (a && a.user_id === (typeof accessMe === "function" && accessMe()) && a.cityPass) || null; }
function cdrInCity() {
try {
if (typeof realmById !== "function" || typeof store === "undefined")
return false;
var r = realmById(store.here || 0);
return !!(r && (r.kind === "somnucor" || r.kind === "hall"));
}
catch (e) {
return false;
}
}
function cdrSendHome() { return __ZC(443, 0, this, arguments, new.target); }
function cdrClose() { var p = document.getElementById("cdr-panel"); if (p)
p.remove(); }
function cityDoorPanel() { return __ZC(443, 1, this, arguments, new.target); }
function cdrTurnBack(pressed) {
if (cdrInCity())
cdrSendHome();
if (!pressed && Date.now() - CDR.told < 60000)
return;
CDR.told = Date.now();
cityDoorPanel();
}
if (typeof joinedSomnucor === "function") {
var cdrJoinedRaw = joinedSomnucor;
joinedSomnucor = function () { return cdrJoinedRaw() && cityAllowed(); };
}
if (typeof joinSomnucor === "function") {
var cdrJoinRaw = joinSomnucor;
joinSomnucor = function () { if (!cityAllowed())
return cdrTurnBack(true); return cdrJoinRaw.apply(this, arguments); };
}
if (typeof toSomnucor === "function") {
var cdrToRaw = toSomnucor;
toSomnucor = function () { if (!cityAllowed())
return cdrTurnBack(true); return cdrToRaw.apply(this, arguments); };
}
if (typeof toHall === "function") {
var cdrHallRaw = toHall;
toHall = function () { if (!cityAllowed())
return cdrTurnBack(true); return cdrHallRaw.apply(this, arguments); };
}
if (typeof atlCityJob === "function") {
var cdrJobRaw = atlCityJob;
atlCityJob = function () { if (!cityAllowed())
return { done: null }; return cdrJobRaw.apply(this, arguments); };
}
if (typeof buildHall === "function") {
var cdrBuildHallRaw = buildHall;
buildHall = function () { if (!cityAllowed())
return null; return cdrBuildHallRaw.apply(this, arguments); };
}
if (typeof realmWatch === "function") {
var cdrWatchRaw = realmWatch;
realmWatch = function () {
var r = cdrWatchRaw.apply(this, arguments);
if (cdrInCity() && !cityAllowed())
cdrTurnBack(false);
return r;
};
}
if (typeof gateRefused === "function") {
var cdrRefusedRaw = gateRefused;
gateRefused = function (why) {
if (why === "city" && !cityAllowed()) {
if (typeof gateLast !== "undefined")
gateLast = { at: Date.now(), why: why };
if (cdrInCity())
cdrTurnBack(false);
return;
}
return cdrRefusedRaw.apply(this, arguments);
};
}
function cdrRecheck() {
var now = cityAllowed();
if (CDR.was === null) {
CDR.was = now;
return;
}
if (now === CDR.was)
return;
CDR.was = now;
if (now) {
if (typeof setStatus === "function")
setStatus("<b>The Keeper has let you in.</b> Somnucor is open to you: ☰ Menu › Settings › Join Somnucor, then The land › Somnucor › Go there.");
if (typeof paintJoin === "function")
paintJoin();
if (CDR.poll) {
clearInterval(CDR.poll);
CDR.poll = null;
}
}
else {
if (cdrInCity())
cdrTurnBack(true);
if (typeof paintJoin === "function")
paintJoin();
}
}
function cdrKeepAsking() {
if (CDR.poll)
return;
var until = Date.now() + 24 * 3600e3;
CDR.poll = setInterval(function () {
if (Date.now() > until || cityAllowed()) {
clearInterval(CDR.poll);
CDR.poll = null;
}
if (typeof refreshAccess === "function")
refreshAccess().then(cdrRecheck, cdrRecheck);
}, 60000);
}
if (typeof setInterval === "function" && typeof window !== "undefined" && window.SOMNU_ACCESS !== true) {
setTimeout(function () { cdrRecheck(); if (cityPassStatus() === "asked")
cdrKeepAsking(); }, 2500);
setInterval(function () { if (cdrInCity() && typeof refreshAccess === "function")
refreshAccess().then(cdrRecheck, cdrRecheck);
else
cdrRecheck(); }, 180000);
}
