/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DT = { code: null, host: false, hostId: null, hostName: "", since: 0, have: 0, people: [], feed: [], t: null, busy: false, pushing: false, pushAt: 0,
dirty: false, applyAt: 0, pending: null, waiting: false, missing: false, invT: null, invites: [], dismissed: {}, open: false, small: false, size: 0, me: null };
function dtName() { var d = typeof dreamer === "function" ? dreamer() : null; return String((d && d.name) || "A dreamer").slice(0, 40); }
function dtGuest() { return !!(DT.code && !DT.host); }
function dtIn() { return !!DT.code; }
function dtHere() {
if (!DT.code)
return false;
if (!DT.host)
return !!(typeof visiting !== "undefined" && visiting && visiting.dt);
if (typeof visiting !== "undefined" && visiting)
return false;
if (typeof inSomnucorRealm === "function" && inSomnucorRealm())
return false;
if (typeof inHallRealm === "function" && inHallRealm())
return false;
if (typeof WLD !== "undefined" && WLD && WLD.on)
return false;
return true;
}
function dtRpc(n, b) { return cityRpc(n, b || {}).then(function (o) { return o || {}; }); }
function dtMissing(e) { var m = String((e && e.message) || e || ""); return /function|404|PGRST|does not exist/i.test(m); }
function dtSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function dtOpen() { return __ZC(429, 0, this, arguments, new.target); }
function dtJoin(code) { return __ZC(429, 1, this, arguments, new.target); }
function dtLeave(quiet, why) { return __ZC(429, 2, this, arguments, new.target); }
function dtStart() { clearInterval(DT.t); DT.t = setInterval(dtBeat, 1500); dtBeat(); }
function dtBeat() { return __ZC(429, 3, this, arguments, new.target); }
function dtBuild(text, name) { return __ZC(429, 4, this, arguments, new.target); }
function dtPush() { return __ZC(429, 5, this, arguments, new.target); }
function dtTakeDream() { return __ZC(429, 6, this, arguments, new.target); }
function dtApplyDream(sc) { return __ZC(429, 7, this, arguments, new.target); }
function dtSend(text) { return __ZC(429, 8, this, arguments, new.target); }
function dtCard() { return __ZC(429, 9, this, arguments, new.target); }
var DT_B = "background:#2A2440;border:1px solid #6A5A9A;color:#F2D27A;border-radius:4px;padding:5px 10px;margin:3px 4px 3px 0;cursor:pointer;font:inherit;font-size:13px";
function dtPaint() { return __ZC(429, 10, this, arguments, new.target); }
function dtFriends() { return __ZC(429, 11, this, arguments, new.target); }
function dtClick(e) { return __ZC(429, 12, this, arguments, new.target); }
function dtVisitBar() {
var w = document.getElementById("visit-who");
if (w && visiting && visiting.dt)
w.innerHTML = "👥 Dreaming together in <b>" + esc(visiting.name) + "</b>'s dream";
}
function dtButton() {
if (document.getElementById("dt-btn"))
return;
var after = document.getElementById("commitbtn");
if (!after || !after.parentNode)
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "dt-btn";
b.type = "button";
b.textContent = "👥 Together";
b.title = "Dream together: open your dream to friends, or join theirs, and write it together live";
b.onclick = function () { DT.open = !DT.open || !!DT.code; DT.small = false; dtPaint(); };
after.parentNode.insertBefore(b, after.nextSibling);
}
function dtInvites() {
if (DT.missing || !signedIn() || DT.code || document.hidden)
return;
dtRpc("dt_invites", {}).then(function (L) {
DT.invites = Array.isArray(L) ? L : [];
if (DT.invites.some(function (i) { return !DT.dismissed[i.code]; }))
dtPaint();
}).catch(function (e) { if (dtMissing(e))
DT.missing = true; });
}
(function () {
function grab(e, text) {
if (!DT.code)
return;
if (dtGuest()) {
e.preventDefault();
e.stopImmediatePropagation();
var ta = document.getElementById("freetext");
if (!text) {
dtSay("Type a few words first.");
return;
}
dtSend(text).then(function (ok) { if (ok && ta) {
ta.value = "";
ta.style.height = "auto";
} });
}
else if (text)
dtSend(text);
}
function hook() {
dtButton();
var ta = document.getElementById("freetext"), cb = document.getElementById("commitbtn");
if (ta) {
ta.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey)
grab(e, ta.value.trim()); }, true);
ta.addEventListener("input", function (e) { if (dtGuest()) {
e.stopImmediatePropagation();
ta.style.height = "auto";
ta.style.height = Math.min(ta.scrollHeight, innerHeight * 0.26) + "px";
} }, true);
}
if (cb)
cb.addEventListener("click", function (e) { grab(e, ta && ta.value.trim()); }, true);
DT.invT = setInterval(dtInvites, 30000);
setTimeout(dtInvites, 8000);
var m = /[?&]dream=([A-Za-z0-9]{6})/.exec(location.search);
if (m) {
var tries = 0, tj = setInterval(function () { tries++; if (signedIn()) {
clearInterval(tj);
DT.open = true;
dtJoin(m[1]);
}
else if (tries > 60) {
clearInterval(tj);
DT.open = true;
dtPaint();
dtSay("Sign in, then join with the code " + esc(m[1].toUpperCase()) + ".");
} }, 2000);
}
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
setTimeout(hook, 0);
if (typeof save === "function") {
var sv = save;
save = function () { var r = sv.apply(this, arguments); if (DT.host && DT.code)
DT.dirty = true; return r; };
}
if (typeof endVisit === "function") {
var ev = endVisit;
endVisit = function () { var was = typeof visiting !== "undefined" && visiting && visiting.dt; var r = ev.apply(this, arguments); if (was && !DT.leaving && DT.code)
dtLeave(false); return r; };
var vo = document.getElementById("visit-out");
if (vo)
vo.onclick = function () { endVisit(); };
}
if (typeof showVisitBar === "function") {
var sb = showVisitBar;
showVisitBar = function (on) {
var r = sb.apply(this, arguments);
var vo = document.getElementById("visit-out");
if (vo)
vo.onclick = function () { endVisit(); };
if (on)
dtVisitBar();
return r;
};
}
if (typeof presenceSharedHere === "function") {
var ps = presenceSharedHere;
presenceSharedHere = function () { return dtHere() || ps.apply(this, arguments); };
}
if (typeof myPlace === "function") {
var mp = myPlace;
myPlace = function () {
if (dtHere() && !store.inside)
return { place: "dream:" + DT.code + ":" + (store.here || 0), level: 0, x: camera.position.x, z: camera.position.z };
return mp.apply(this, arguments);
};
}
if (typeof placeToWorld === "function") {
var pw = placeToWorld;
placeToWorld = function (row) {
if (row && /^dream:/.test(row.place || "")) {
if (!dtHere() || row.place !== myPlace().place)
return null;
return { x: row.x, y: (typeof terrainY === "function") ? terrainY(row.x, row.z) : 0, z: row.z };
}
return pw.apply(this, arguments);
};
}
if (typeof presenceTick === "function") {
var pt = presenceTick;
presenceTick = function () {
if (!(dtGuest() && dtHere()))
return pt.apply(this, arguments);
var av = amVisiting;
amVisiting = function () { return false; };
try {
return pt.apply(this, arguments);
}
finally {
amVisiting = av;
}
};
}
})();
