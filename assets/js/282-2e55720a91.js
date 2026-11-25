/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DWH = { btn: null, ownAt: -1, draftAt: "" };
function dwhOwnCount() {
var n = 0;
if (typeof store === "undefined" || !store || !store.objects)
return 0;
store.objects.forEach(function (o) { if (!o.filler && !(o.realm || 0) && !o.hub && !o.city)
n++; });
return n;
}
function dwhAtHome() {
try {
if (typeof amVisiting === "function" && amVisiting())
return false;
if (typeof WLD !== "undefined" && WLD && WLD.on)
return false;
if (typeof MALL !== "undefined" && MALL && MALL.on)
return false;
if (store.inside)
return (store.here || 0) === 0 && !(typeof inSomnucorNow === "function" && inSomnucorNow());
return (store.here || 0) === 0;
}
catch (e) {
return true;
}
}
function dwhGround() {
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof flyVz !== "undefined")
flyVz = 0;
if (typeof camera !== "undefined" && camera)
camera.position.y = 1.72 + ((typeof terrainY === "function") ? (terrainY(camera.position.x, camera.position.z) || 0) : 0);
}
function goHomeDream(opts) { return __ZC(282, 0, this, arguments, new.target); }
(function () {
if (typeof walkIntoDoor !== "function")
return;
var wd = walkIntoDoor;
walkIntoDoor = function (spec) {
try {
if (spec && spec.dreamerDoor && typeof signedIn === "function" && signedIn() && session && session.user && spec.dreamerDoor === session.user.id) {
goHomeDream();
return;
}
}
catch (e) { }
return wd.apply(this, arguments);
};
})();
if (typeof hubTick === "function") {
var dwhHubTick = hubTick;
hubTick = function (dt) {
var was = store.here || 0, r = dwhHubTick.apply(this, arguments);
if (was !== 0 && (store.here || 0) === 0 && walkMode && !store.inside)
dwhGround();
return r;
};
}
if (typeof PS_EXTRAS !== "undefined")
PS_EXTRAS.push({ id: "ps-home-dream", label: "🌙 My dream", show: function () { return !dwhAtHome(); }, run: function () { goHomeDream(); } });
if (typeof renderRealmList === "function") {
var dwhLand = renderRealmList;
renderRealmList = function () { return __ZC(282, 1, this, arguments, new.target); };
}
function dwhTick() {
if (DWH.holdTil && Date.now() < DWH.holdTil) {
var H = DWH.holdAt, P = camera.position;
if (Math.hypot(P.x - H.x, P.z - H.z) > 20) {
P.set(H.x, H.y, H.z);
yaw = H.yaw;
pitch = H.pitch;
flyY = H.fly;
beHere(DWH.holdWas);
}
}
var wb = document.getElementById("walkbtn");
if (!wb)
return;
if (!DWH.btn) {
var b = document.createElement("button");
b.className = "btn";
b.id = "homedreambtn";
b.type = "button";
b.textContent = "🌙 My dream";
b.title = "Go home to your own dream";
b.addEventListener("click", function () { goHomeDream(); });
wb.parentNode.insertBefore(b, wb.nextSibling);
DWH.btn = b;
}
var show = !walkMode && !dwhAtHome();
if (DWH.btn.style.display !== (show ? "" : "none"))
DWH.btn.style.display = show ? "" : "none";
}
(function () {
if (typeof setWalk !== "function")
return;
var sw = setWalk;
setWalk = function (on) {
if (!on && walkMode) {
DWH.ownAt = dwhOwnCount();
}
return sw.apply(this, arguments);
};
var wire = function () {
var wb = document.getElementById("walkbtn");
if (!wb)
return;
wb.addEventListener("click", function (e) {
if (walkMode || dwhAtHome())
return;
var ft = document.getElementById("freetext"), draft = ft && ft.value.trim();
var grew = DWH.ownAt > -1 && dwhOwnCount() !== DWH.ownAt;
if (!draft && !grew)
return;
e.stopImmediatePropagation();
e.preventDefault();
if (draft && typeof commitDraft === "function")
try {
commitDraft();
}
catch (er) { }
goHomeDream();
}, true);
};
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", wire);
else
wire();
})();
if (typeof viewOnly === "function") {
var dwhOwn = function (o) { return !o.filler && !(o.realm || 0) && !o.hub && !o.city; };
viewOnly = function (n) { return __ZC(282, 2, this, arguments, new.target); };
clearView = function () {
viewNight = null;
store.objects.forEach(function (o) { if (dwhOwn(o))
refresh(o); });
document.getElementById("viewing").classList.add("gone");
};
}
if (typeof buildFromReply === "function") {
var dwhBuild = buildFromReply;
buildFromReply = function () { return __ZC(282, 3, this, arguments, new.target); };
}
if (typeof reconcile === "function") {
var dwhRec = reconcile;
reconcile = function () {
if (!DWH.parseHome || Date.now() - DWH.parseHome > 120000 || dwhAtHome())
return dwhRec.apply(this, arguments);
DWH.parseHome = 0;
var was = store.here || 0;
beHere(0);
try {
return dwhRec.apply(this, arguments);
}
finally {
beHere(was);
}
};
}
(function () {
var go = function () { DWH.ownAt = dwhOwnCount(); dwhTick(); setInterval(function () { try {
dwhTick();
}
catch (e) { } }, 500); };
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go();
})();
