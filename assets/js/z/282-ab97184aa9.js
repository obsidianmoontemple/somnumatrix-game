/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(282, function () {
"use strict";
return [
function (opts) {
opts = opts || {};
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
if (typeof riding !== "undefined" && riding) {
riding = null;
if (typeof rideSpeed !== "undefined")
rideSpeed = 1;
}
if (typeof rideArch !== "undefined")
rideArch = null;
if (typeof rideG !== "undefined" && rideG) {
scene.remove(rideG);
rideG = null;
}
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
if (typeof walkResume !== "undefined")
walkResume = null;
visitRealm(0);
if (typeof beHere === "function")
beHere(0);
if (typeof canFly !== "undefined" && !(typeof magicGranted !== "undefined" && magicGranted))
canFly = false;
var any = dwhOwnCount() > 0;
if (any && !opts.stay && typeof setWalk === "function") {
setWalk(true);
var C = typeof dreamCluster === "function" ? dreamCluster() : null;
if (C && !store.inside) {
var R = Math.max(22, Math.min(90, C.spread * 0.8 + 20));
camera.position.x = C.x;
camera.position.z = C.z + R;
if (typeof yaw !== "undefined")
yaw = 0;
if (typeof pitch !== "undefined")
pitch = -0.05;
}
else if (!C) {
var h = heartOf(0);
camera.position.x = h.x;
camera.position.z = h.z + 24;
}
dwhGround();
}
else
dwhGround();
DWH.ownAt = dwhOwnCount();
setStatus(any ? "<b>Your own dream.</b> Everything you have dreamt stands here. To go to the city: ☰ Menu → Places and getting about → 🏙️ Go to the city."
: "<b>Your own dream.</b> Nothing is built here yet: tell a dream, and it rises here.");
if (!any) {
var ft = document.getElementById("freetext");
if (ft)
try {
ft.focus();
}
catch (e) { }
}
if (typeof save === "function")
save();
},
function () {
var r = dwhLand.apply(this, arguments);
var el = document.getElementById("l-realms");
if (el && !document.getElementById("l-home-dream")) {
var d = document.createElement("div");
d.className = "l-realm";
d.innerHTML = '<span><b>🌙 Your own dream</b> &mdash; everything you have dreamt</span><button class="btn" id="l-home-dream">Go there</button>';
el.insertBefore(d, el.firstChild);
d.querySelector("button").onclick = function () { goHomeDream(); };
}
return r;
},
function (n) {
if (!dwhAtHome() || walkMode)
goHomeDream({ stay: true });
if (walkMode && typeof setWalk === "function")
setWalk(false);
viewNight = n;
store.objects.forEach(function (o) { if (dwhOwn(o))
refresh(o); });
var r = nightRecord(n);
document.getElementById("viewing-t").textContent = "Viewing " + (r ? r.title : ("night " + n));
document.getElementById("viewing").classList.remove("gone");
var first = null;
store.objects.forEach(function (o) { if (!first && dwhOwn(o) && o.nights && o.nights.indexOf(n) > -1)
first = o; });
if (first) {
orb.tx = first.x;
orb.tz = first.z;
viewAt = { x: first.x, z: first.z };
store.grid.bx = Math.round(first.x / PITCH);
store.grid.bz = Math.round(first.z / PITCH);
}
},
function () {
if (dwhAtHome() || !lastReply)
return dwhBuild.apply(this, arguments);
var was = store.here || 0, n = 0, P = camera.position, at = { x: P.x, y: P.y, z: P.z, yaw: yaw, pitch: pitch, fly: flyY };
beHere(0);
try {
var said = deFirstPerson(lastReply, talkWith ? talkWith.name : null);
n = scanText(said);
feedContext(said);
store.heard = ((store.heard || "") + " " + said).trim();
DWH.parseHome = Date.now();
scheduleParse(300);
}
finally {
beHere(was);
}
var back = function () { camera.position.set(at.x, at.y, at.z); yaw = at.yaw; pitch = at.pitch; flyY = at.fly; if (typeof beHere === "function")
beHere(was); };
back();
DWH.holdAt = at;
DWH.holdWas = was;
DWH.holdTil = Date.now() + 1500;
if (typeof save === "function")
save();
if (typeof updateCount === "function")
updateCount();
var say = (n ? "<b>" + n + " form" + (n > 1 ? "s" : "") + " rose in your own dream</b> from what they said." : "<b>Taken down in your own dream.</b>") +
" You stay here; ☰ Menu → 🌙 My dream to go and see it.";
setStatus(say);
setTimeout(function () { if (!dwhAtHome())
setStatus(say); }, 2600);
}
];
});
