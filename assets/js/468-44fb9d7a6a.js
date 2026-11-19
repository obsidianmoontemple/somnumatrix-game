/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var RMP_ARCH = "rumple_spoon", RMP_NAME = "Rumpelstiltskin's spoon";
var RMP = { st: null, stAt: 0, busy: false, missing: false, btn: null, cool: 0, fx: [], trail: [], trailT: 0, spin: 0, spinUntil: 0,
speed: 4.2, seat: 0.62, glimpse: null, said: 0,
power: { name: "Rumpel's Stamp", icon: "🦶", r: 11, npc: 36, pvp: 25, hold: 2.2, cool: 12 } };
function rmpLite() { return typeof LITE !== "undefined" && !!LITE; }
function rmpKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function rmpSigned() { return typeof signedIn === "function" && signedIn(); }
function rmpEsc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function rmpSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function rmpRpc(name, body) { return typeof cityRpc === "function" ? cityRpc(name, body || {}) : Promise.reject(new Error("offline")); }
function rmpMine() { return !!(RMP.st && RMP.st.mine); }
function rmpOn() { return typeof rideArch !== "undefined" && rideArch === RMP_ARCH; }
function rmpLoad(force) { return __ZC(468, 0, this, arguments, new.target); }
var RMP_TEX = {};
function rmpWoodTex() { return __ZC(468, 1, this, arguments, new.target); }
function rmpMat(col, o) { return __ZC(468, 2, this, arguments, new.target); }
function rmpMesh(par, geo, mat, x, y, z) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); par.add(m); return m; }
function rmpBuild() { return __ZC(468, 3, this, arguments, new.target); }
(function () {
if (typeof KIT !== "undefined")
KIT[RMP_ARCH] = { cat: "creature", size: [1.4, 1.4, 4.2], parts: [], rmpMount: 1 };
if (typeof RIDE_SEAT !== "undefined")
RIDE_SEAT[RMP_ARCH] = RMP.seat;
if (typeof RIDE_FLIES !== "undefined")
RIDE_FLIES[RMP_ARCH] = 1;
if (typeof archList === "function") {
var al = archList;
archList = function () { return al.apply(this, arguments).split(", ").filter(function (k) { return k !== RMP_ARCH; }).join(", "); };
}
if (typeof build === "function") {
var bd = build;
build = function (spec) {
if (!spec || spec.archetype !== RMP_ARCH)
return bd.apply(this, arguments);
var g;
try {
g = rmpBuild();
}
catch (e) {
if (window.console)
console.warn("[rumple] build", e);
g = new THREE.Group();
}
g.userData.id = spec.id;
return g;
};
}
})();
function rmpRide() { return __ZC(468, 4, this, arguments, new.target); }
function rmpOff() { if (!rmpOn())
return; if (typeof ride === "function")
ride(null);
else {
riding = null;
rideSpeed = 1;
rideArch = null;
} }
function rmpStamp() { return __ZC(468, 5, this, arguments, new.target); }
function rmpRing(P) { return __ZC(468, 6, this, arguments, new.target); }
function rmpSpin() { return __ZC(468, 7, this, arguments, new.target); }
function rmpTick(dt) { return __ZC(468, 8, this, arguments, new.target); }
(function () {
if (typeof rideTick !== "function")
return;
var rt = rideTick;
rideTick = function (dt) { var r = rt.apply(this, arguments); try {
rmpTick(dt);
}
catch (e) {
if (!RMP.eTick) {
RMP.eTick = 1;
if (window.console)
console.warn("[rumple] tick", e);
}
} return r; };
})();
function rmpBtnPaint() { return __ZC(468, 9, this, arguments, new.target); }
setInterval(function () { try {
rmpBtnPaint();
}
catch (e) { } }, 400);
if (typeof PS_KEEP !== "undefined")
PS_KEEP["rmp-power"] = 1;
if (typeof PS_EXTRAS !== "undefined") {
PS_EXTRAS.push({ id: "rmp-ps-ride", show: function () { return (rmpMine() || (rmpKeeper() && RMP.keeperRide)) && !rmpOn() && !store.inside; }, label: function () { return "🥄 Ride Rumpelstiltskin's spoon"; }, run: function () { rmpRide(); } });
PS_EXTRAS.push({ id: "rmp-ps-off", show: function () { return rmpOn(); }, label: function () { return "🥄 Get off the spoon"; }, run: function () { rmpOff(); } });
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyJ" || e.repeat || !rmpOn())
return;
var tg = (e.target && e.target.tagName) || "";
if (/INPUT|TEXTAREA|SELECT/.test(tg))
return;
e.preventDefault();
e.stopImmediatePropagation();
rmpStamp();
}, true);
(function () {
if (typeof POE_RB === "undefined" || !POE_RB.chamber)
return;
var ch = POE_RB.chamber;
POE_RB.chamber = function (R, g) {
var r = ch.apply(this, arguments);
try {
rmpHide(R, g);
}
catch (e) {
if (window.console)
console.warn("[rumple] hide", e);
}
return r;
};
})();
function rmpHide(R, g) { return __ZC(468, 10, this, arguments, new.target); }
function rmpGlimpseShow() { var G = RMP.glimpse; if (!G)
return; G.visible = !(RMP.st && RMP.st.found); }
function rmpReach() { return __ZC(468, 11, this, arguments, new.target); }
function rmpClaim() { return __ZC(468, 12, this, arguments, new.target); }
if (typeof bkpHtml === "function") {
(function () { var bh = bkpHtml; bkpHtml = function () { var h = bh.apply(this, arguments); try {
return h + rmpBkpSection();
}
catch (e) {
return h;
} }; })();
}
if (typeof bkpLoad === "function") {
(function () { var bl = bkpLoad; bkpLoad = function () { var p = bl.apply(this, arguments); rmpLoad(true).then(function () { if (typeof bkpPaint === "function")
try {
bkpPaint();
}
catch (e) { } }); return p; }; })();
}
function rmpBkpSection() { return __ZC(468, 13, this, arguments, new.target); }
function rmpAbout() { return __ZC(468, 14, this, arguments, new.target); }
function rmpKeeperHide() { return __ZC(468, 15, this, arguments, new.target); }
(function () {
if (typeof vrpMenuItems !== "function")
return;
var vm = vrpMenuItems;
vrpMenuItems = function () {
var items = vm.apply(this, arguments);
try {
if (rmpOn())
items.unshift({ t: RMP.power.icon + " " + RMP.power.name, run: rmpStamp }, { t: "🧶 Straw into gold", run: rmpSpin }, { t: "🥄 Get off the spoon", run: rmpOff });
else if ((rmpMine() || (rmpKeeper() && RMP.keeperRide)) && !store.inside)
items.unshift({ t: "🥄 Ride Rumpelstiltskin's spoon", run: rmpRide });
}
catch (e) { }
return items;
};
})();
setTimeout(function () { try {
rmpLoad(true);
}
catch (e) { } }, 9000);
