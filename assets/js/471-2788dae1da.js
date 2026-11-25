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
function rmpLoad(force) {
if (!rmpSigned())
return Promise.resolve(null);
if (RMP.busy || (!force && RMP.st && Date.now() - RMP.stAt < 60000))
return Promise.resolve(RMP.st);
RMP.busy = true;
return rmpRpc("rumple_state", {}).then(function (o) { RMP.busy = false; RMP.missing = false; RMP.stAt = Date.now(); if (o && o.ok)
RMP.st = o; rmpGlimpseShow(); return RMP.st; })
.catch(function (e) { RMP.busy = false; RMP.stAt = Date.now(); if (typeof rpcMissing === "function" && rpcMissing(e))
RMP.missing = true; return RMP.st; });
}
var RMP_TEX = {};
function rmpWoodTex() { return __ZC(471, 0, this, arguments, new.target); }
function rmpMat(col, o) { return __ZC(471, 1, this, arguments, new.target); }
function rmpMesh(par, geo, mat, x, y, z) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); par.add(m); return m; }
function rmpBuild() { return __ZC(471, 2, this, arguments, new.target); }
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
function rmpRide() { return __ZC(471, 3, this, arguments, new.target); }
function rmpOff() { if (!rmpOn())
return; if (typeof ride === "function")
ride(null);
else {
riding = null;
rideSpeed = 1;
rideArch = null;
} }
function rmpStamp() { return __ZC(471, 4, this, arguments, new.target); }
function rmpRing(P) { return __ZC(471, 5, this, arguments, new.target); }
function rmpSpin() { return __ZC(471, 6, this, arguments, new.target); }
function rmpTick(dt) {
dt = Math.min(0.1, dt || 0.016);
for (var i = RMP.fx.length - 1; i >= 0; i--) {
var f = RMP.fx[i];
f.t += dt;
var k = f.t / 1.1;
f.g.scale.setScalar(1 + k * f.r);
f.m[0].opacity = 0.5 * (1 - k);
f.m[1].opacity = 0.4 * (1 - k);
if (k >= 1) {
scene.remove(f.g);
f.g.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); });
f.m.forEach(function (m) { m.dispose(); });
RMP.fx.splice(i, 1);
}
}
var P = camera.position, on = rmpOn() && walkMode && !store.inside, max = rmpLite() ? 10 : 26;
if (on) {
RMP.trailT -= dt;
var mv = RMP.last ? Math.hypot(P.x - RMP.last.x, P.z - RMP.last.z, P.y - RMP.last.y) / dt : 0;
if (RMP.trailT <= 0 && mv > 1.2 && RMP.trail.length < max) {
RMP.trailT = rmpLite() ? 0.22 : 0.09;
if (!RMP.strawMat)
RMP.strawMat = new THREE.MeshBasicMaterial({ color: 0xFFCC50, transparent: true, opacity: 0.9, depthWrite: false });
var w = new THREE.Mesh(RMP.strawGeo || (RMP.strawGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.32, 3)), RMP.strawMat.clone());
var fx = -Math.sin(yaw), fz = -Math.cos(yaw);
w.position.set(P.x - fx * 0.6 + (Math.random() - 0.5) * 0.5, P.y - 1.72 - RMP.seat + 0.8, P.z - fz * 0.6 + (Math.random() - 0.5) * 0.5);
w.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
scene.add(w);
RMP.trail.push({ m: w, t: 0, vx: (Math.random() - 0.5) * 0.4, vz: (Math.random() - 0.5) * 0.4, sp: (Math.random() - 0.5) * 2 });
}
RMP.last = { x: P.x, y: P.y, z: P.z };
}
else
RMP.last = null;
for (var j = RMP.trail.length - 1; j >= 0; j--) {
var s = RMP.trail[j];
s.t += dt;
s.m.position.y -= dt * 0.35;
s.m.position.x += s.vx * dt;
s.m.position.z += s.vz * dt;
s.m.rotation.z += s.sp * dt;
s.m.material.opacity = 0.9 * Math.max(0, 1 - s.t / 2.4);
if (s.t >= 2.4) {
scene.remove(s.m);
s.m.material.dispose();
RMP.trail.splice(j, 1);
}
}
}
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
function rmpBtnPaint() {
var show = rmpOn() && !store.inside && (typeof walkMode === "undefined" || walkMode);
if (!RMP.btn && show) {
var box = document.createElement("div");
box.id = "rmp-power";
box.style.cssText = "position:fixed;right:10px;top:164px;z-index:30;display:flex;flex-direction:column;gap:6px;align-items:flex-end";
var css = "padding:8px 12px;border-radius:12px;border:1px solid #D8A838;background:rgba(30,20,10,.88);color:#FFE7A8;font:600 14px system-ui,sans-serif;cursor:pointer";
var a = document.createElement("button");
a.type = "button";
a.style.cssText = css;
a.textContent = RMP.power.icon + " " + RMP.power.name + " (J)";
a.addEventListener("click", function () { rmpStamp(); });
var b = document.createElement("button");
b.type = "button";
b.style.cssText = css;
b.textContent = "🧶 Straw into gold";
b.addEventListener("click", function () { rmpSpin(); });
box.appendChild(a);
box.appendChild(b);
document.body.appendChild(box);
RMP.btn = box;
}
if (RMP.btn)
RMP.btn.style.display = show ? "flex" : "none";
}
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
function rmpHide(R, g) { return __ZC(471, 7, this, arguments, new.target); }
function rmpGlimpseShow() { var G = RMP.glimpse; if (!G)
return; G.visible = !(RMP.st && RMP.st.found); }
function rmpReach() { return __ZC(471, 8, this, arguments, new.target); }
function rmpClaim() { return __ZC(471, 9, this, arguments, new.target); }
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
function rmpBkpSection() { return __ZC(471, 10, this, arguments, new.target); }
function rmpAbout() { return __ZC(471, 11, this, arguments, new.target); }
function rmpKeeperHide() { return __ZC(471, 12, this, arguments, new.target); }
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
