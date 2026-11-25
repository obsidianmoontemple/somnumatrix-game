/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var deskOpen = false, deskNear = false, deskOffices = [], deskJobs = [];
function amKeeper() { return !!(deskStanding && deskStanding.keeper); }
var myPowers = {};
function mayShape() { return amKeeper() || !!(myPowers && myPowers.shape); }
function mayArrangeAny() { return amKeeper() || !!(myPowers && myPowers.arrange); }
function amHolder() { return !!(deskStanding && deskStanding.holder); }
function amDeskOfficer() { return !!(deskStanding && (deskStanding.keeper || deskStanding.officer || deskStanding.holder)); }
var deskStanding = null;
function checkKeeper() {
if (!signedIn()) {
deskStanding = null;
return Promise.resolve(deskStanding);
}
return Promise.all([
cityRpc("penthouse_access").catch(function () { return null; }),
cityRpc("admin_diagnose").catch(function () { return null; }),
(standing ? Promise.resolve(standing) : refreshStanding().catch(function () { return null; }))
]).then(function (r) {
var a = r[0] || {}, d = r[1];
deskStanding = {
keeper: !!(a.keeper || (d && d.you_are === "keeper")),
officer: !!(a.officer || (typeof justiceRoles === "function" ? justiceRoles().desk :
(typeof standing !== "undefined" && standing && (standing.jobs || []).some(function (j) { return j.panel === "police" || j.panel === "court" || j.panel === "prison"; })))),
holder: !!a.holder,
who: a.who || "code", hasCode: !!a.has_code
};
cityRpc("my_powers").then(function (p) { myPowers = p || {}; if (typeof paintShapeButton === "function")
paintShapeButton(); }).catch(function () { myPowers = {}; });
return deskStanding;
}).catch(function () { deskStanding = { keeper: false, officer: false, holder: false }; return deskStanding; });
}
function deskTick(dt) {
if (!walkMode || !store.inside || !INT || !INT.locked) {
deskNear = false;
officeDeskTick();
return;
}
if ((INT.level || 0) !== INT.locked.level) {
deskNear = false;
officeDeskTick();
return;
}
if (INT.deskAt === undefined) {
INT.deskAt = null;
INT.root.children.forEach(function (c) { if (!INT.deskAt && c.userData && c.userData.furn === "desk" && Math.abs(c.position.y - INT.locked.level * INT.floor) < 1)
INT.deskAt = { x: c.position.x, z: c.position.z }; });
}
var P = camera.position, dk = INT.deskAt || { x: 0, z: -INT.D / 2 + 3 }, dx = P.x - (INT.ox + dk.x), dz = P.z - (INT.oz + dk.z);
var near = Math.hypot(dx, dz) < 3.2;
if (near && !deskNear) {
deskNear = true;
setStatus("<b>The Keeper's Desk.</b> Press <b>K</b> to open the city's books.");
}
else if (!near && deskNear)
deskNear = false;
if (near)
officeDeskNear = false;
else
officeDeskTick();
}
var officeDeskNear = false;
var WORKDESK = { desk: 1, judgebench: 1, till: 1, counter: 1, counterbank: 1, lectern: 1, workbench: 1, bigconsole: 1, maptable: 1 };
function officeDeskTick() {
if (!walkMode || !store.inside || !INT || (!INT.locked && !INT.wpKey)) {
officeDeskNear = false;
return;
}
var P = camera.position, near = null;
if (INT.wpKey) {
var lv = INT.level || 0;
INT.root.children.forEach(function (c) {
if (near || !c.userData || !WORKDESK[c.userData.furn])
return;
if (Math.abs(c.position.y - lv * INT.floor) > 1)
return;
if (Math.hypot(P.x - (INT.ox + c.position.x), P.z - (INT.oz + c.position.z)) < 2.8)
near = { room: "work" };
});
}
(INT.spots || []).forEach(function (sp) {
if (near || !INT.locked)
return;
if (sp.room !== "office" && sp.room !== "techoffice")
return;
var wx = INT.ox + sp.x, wz = INT.oz + sp.z;
if (Math.hypot(P.x - wx, P.z - wz) < 3.4)
near = sp;
});
if (near && !officeDeskNear) {
officeDeskNear = true;
setStatus(signedIn() ? "<b>A desk.</b> Press <b>K</b> for your own work here." : "<b>A desk.</b> Sign in to use it.");
}
else if (!near && officeDeskNear)
officeDeskNear = false;
}
function openOfficeDesk() { return __ZC(89, 0, this, arguments, new.target); }
function openDesk() { return __ZC(89, 1, this, arguments, new.target); }
function closeDesk() {
deskOpen = false;
var p = document.getElementById("keeper-desk");
if (p)
p.style.display = "none";
}
function drawDesk(body) { return __ZC(89, 2, this, arguments, new.target); }
function kdMsg(t, bad) { var e = document.getElementById("kd-msg"); if (e) {
e.textContent = t;
e.style.color = bad ? "#C0603A" : "var(--dim)";
} }
function deskPane(which) { return __ZC(89, 3, this, arguments, new.target); }
function readTreasury() { return __ZC(89, 4, this, arguments, new.target); }
function putCloudConfig(key, value) { return __ZC(89, 5, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyK" && (deskNear || deskOpen))
openDesk();
else if (e.code === "KeyK" && officeDeskNear)
openOfficeDesk();
if (e.code === "Escape" && deskOpen)
closeDesk();
});
