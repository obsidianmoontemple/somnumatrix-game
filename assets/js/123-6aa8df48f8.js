/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var VEH_CLASS = {
car: { vmax: 25, acc: 4.2, brake: 9, wb: 2.7 }, bus: { vmax: 16, acc: 1.8, brake: 6, wb: 6 },
tram: { vmax: 14, acc: 1.3, brake: 5, wb: 8 }, carriage: { vmax: 8, acc: 1.6, brake: 4, wb: 3 },
moto: { vmax: 28, acc: 5.5, brake: 8, wb: 1.5 }
};
var VEH = {
car: { c: "car", lic: "driving", hud: "car", name: "motor car" }, coupe: { c: "car", lic: "driving", hud: "car", name: "coupé" },
roadster: { c: "car", lic: "driving", hud: "car", open: 1, name: "roadster" }, sportscar: { c: "car", lic: "driving", hud: "car", vmax: 34, acc: 6.5, name: "sports car" },
limousine: { c: "car", lic: "driving", hud: "car", vmax: 24, wb: 4, name: "limousine" }, taxicab: { c: "car", lic: "driving", hud: "cab", name: "cab" },
vintagecar: { c: "car", lic: "driving", hud: "car", vmax: 18, acc: 3, open: 1, name: "vintage car" }, van: { c: "car", lic: "driving", hud: "van", vmax: 22, acc: 3.2, name: "van" },
hovercar: { c: "car", lic: "driving", hud: "car", vmax: 30, name: "hovercar" }, truck: { c: "bus", lic: "driving", hud: "truck", vmax: 18, name: "lorry" },
bus: { c: "bus", lic: "driving", hud: "bus", name: "bus" }, omnibus: { c: "bus", lic: "driving", hud: "bus", vmax: 12, open: 1, name: "omnibus" },
tractor: { c: "bus", lic: "driving", hud: "tractor", vmax: 9, acc: 1.6, wb: 2.4, open: 1, name: "tractor" },
tram: { c: "tram", lic: "driving", hud: "tram", name: "tram" },
motorbike: { c: "moto", lic: "driving", hud: "motorbike", open: 1, name: "motorbike" }, scooter: { c: "moto", lic: "driving", hud: "motorbike", vmax: 16, acc: 3.5, open: 1, name: "scooter" },
carriage: { c: "carriage", lic: null, hud: "carriage", open: 1, name: "carriage" }, hansomcab: { c: "carriage", lic: null, hud: "carriage", vmax: 9, open: 1, name: "hansom cab" },
wagon: { c: "carriage", lic: null, hud: "carriage", vmax: 6, open: 1, name: "wagon" }, cart: { c: "carriage", lic: null, hud: "cart", vmax: 5, open: 1, name: "cart" }
};
var FLYER = {
dragon: { vmax: 36, acc: 7, hud: "dragon", name: "dragon" }, broomstick: { vmax: 26, acc: 6, hud: "broom", name: "broomstick" },
flyingcarpet: { vmax: 18, acc: 4, hud: "carpet", name: "flying carpet" }, pegasus: { vmax: 30, acc: 6, hud: "pegasus", name: "pegasus" },
griffin: { vmax: 30, acc: 6, hud: "griffin", name: "griffin" }, hippogriff: { vmax: 28, acc: 6, hud: "hippogriff", name: "hippogriff" },
airship: { vmax: 11, acc: 1.2, hud: "airship", name: "airship" }, saucer: { vmax: 40, acc: 8, hud: "saucer", name: "flying saucer" },
sleigh: { vmax: 22, acc: 4, hud: "sleigh", name: "sleigh" }, firechariot: { vmax: 28, acc: 5, hud: "firechariot", name: "chariot of fire" }
};
var ROAD_LIMIT_MPH = { plaza: 15, civic: 20, estates: 20, temples: 20, markets: 20, commons: 30, warrens: 20, harvest: 40, wilds: 60 };
var MPH_MS = 0.44704, FLY_CEILING = 300, NOFLY_R = 90, NOFLY_DROP = 80;
var DRIVE = { on: false, mode: null, arch: null, src: null, spec: null, h: 0, v: 0, steer: 0, thr: 0, brk: 0, gear: "N", ind: null, indTurn: 0,
view: "chase", look: 0, yawSet: 0, roll: 0, pitch: 0, climb: 0, alt: 0, road: null, limit: null, bumps: 0, bumpAt: 0, overT: 0,
wrongT: 0, offT: 0, trip: {}, prevFly: null, test: null, cam: null, dt: 0.016, rail: null, shown: false, note: "", noteT: 0 };
try {
var dv = localStorage.getItem("somnu.driveview");
if (dv === "cab" || dv === "chase")
DRIVE.view = dv;
}
catch (e) { }
function vehicleKindOf(arch) { if (VEH[arch])
return "road"; if (FLYER[arch])
return "fly"; return null; }
function vehSpec(arch) {
var v = VEH[arch];
if (!v)
return null;
var c = VEH_CLASS[v.c], k = (typeof KIT !== "undefined" && KIT[arch]) ? KIT[arch].size : [1.9, 1.5, 4.6];
return { vmax: v.vmax || c.vmax, acc: v.acc || c.acc, brake: v.brake || c.brake, wb: v.wb || c.wb, len: k[2] / 2, wid: k[0] / 2, cls: v.c, lic: v.lic, hud: v.hud, open: !!v.open, name: v.name };
}
function inSomnucorNow() {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
return !!(r && (store.here || 0) === r.id && !store.inside && typeof ATLC !== "undefined" && ATLC);
}
function driveNote(t, secs) { DRIVE.note = t || ""; DRIVE.noteT = secs || 3; }
function wrapAng(d) { return ((d % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI; }
function compassWord(b) { var n = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"]; return n[Math.round((((b * 180 / Math.PI) % 360) + 360) % 360 / 45) % 8]; }
function bearingOfHeading(h) { return ((-h) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2); }
function roadAt(x, z) {
if (typeof ATLC === "undefined" || !ATLC || !inSomnucorNow())
return { kind: "open", name: "", limit: null, mph: null };
var dx = x - ATLC.x, dz = z - ATLC.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
if (r < 140)
return { kind: "plaza", name: "Tower Plaza", limit: ROAD_LIMIT_MPH.plaza * MPH_MS, mph: ROAD_LIMIT_MPH.plaza, ring: "plaza" };
if (r > 2160)
return { kind: "open", name: "The Nightmare Wilds", limit: null, mph: 60, national: true, ring: "wilds" };
var best = null;
Object.keys(ATL_STREETS).forEach(function (k) {
ATL_STREETS[k].forEach(function (rs) {
var d = Math.abs(r - rs);
if (d <= ATL_ROAD + 0.6 && (!best || d < best.d))
best = { d: d, rs: rs, ring: k };
});
});
if (best) {
var R = atlRing(best.ring), mph = ROAD_LIMIT_MPH[best.ring] || 30;
return { kind: "ring", name: (R ? R.name : "the ring road"), limit: mph * MPH_MS, mph: mph, rs: best.rs, ring: best.ring, a: a, r: r };
}
var st = (typeof atlNearStair === "function") ? atlNearStair(r, a) : null;
if (st)
return { kind: "avenue", name: st.s.main ? "a grand avenue" : "a stair lane", limit: (st.s.main ? 30 : 20) * MPH_MS, mph: st.s.main ? 30 : 20, a: a, r: r };
return { kind: "off", name: "off the road", limit: 5 * MPH_MS, mph: 5, a: a, r: r };
}
var TOWER_AT = null;
function towerSpot() { return __ZC(123, 0, this, arguments, new.target); }
function vehicleStart(arch, src, spec) { return __ZC(123, 1, this, arguments, new.target); }
function driveHudOpen() { return __ZC(123, 2, this, arguments, new.target); }
function driveLicenceKind() { var D = DRIVE; if (!D.on)
return null; return D.mode === "fly" ? "flying" : (VEH[D.arch] ? VEH[D.arch].lic : null); }
function vehicleLeave() { return __ZC(123, 3, this, arguments, new.target); }
function vehicleEnd() { return __ZC(123, 4, this, arguments, new.target); }
function vehicleTakeWheel(o) { return __ZC(123, 5, this, arguments, new.target); }
function driveInput() { return __ZC(123, 6, this, arguments, new.target); }
function driveIndicate(side) {
var D = DRIVE;
if (!D.on || D.mode !== "road")
return;
D.ind = D.ind === side ? null : side;
D.indTurn = 0;
if (typeof audio !== "undefined" && audio.on && typeof playTone === "function")
try {
playTone(880, 0.05);
}
catch (e) { }
}
function driveToggleView() {
DRIVE.view = DRIVE.view === "chase" ? "cab" : "chase";
DRIVE.cam = null;
try {
localStorage.setItem("somnu.driveview", DRIVE.view);
}
catch (e) { }
driveNote(DRIVE.view === "chase" ? "View: from behind" : "View: from the seat", 1.5);
}
function vehicleFrame(dt) {
var D = DRIVE;
var want = (typeof rideArch !== "undefined" && rideArch) ? vehicleKindOf(rideArch) : null;
if (D.on && (!want || rideArch !== D.arch)) {
vehicleEnd();
}
if (!D.on && want) {
var src = (typeof CORP !== "undefined" && CORP.mounted && rideArch === "dragon") ? "corp" : "ride";
vehicleStart(rideArch, src, null);
}
if (!D.on)
return false;
if (store.inside)
return false;
if (!D.shown)
driveHudOpen();
D.dt = dt;
var turned = wrapAng(yaw - D.yawSet);
if (D.mode === "fly" && typeof touchRig !== "undefined" && touchRig)
D.h += turned;
else
D.look += turned;
var inp = driveInput();
if (D.mode === "road")
driveRoad(dt, inp);
else
driveFly(dt, inp);
if (Math.abs(D.v) > 3)
D.look *= Math.max(0, 1 - dt * (locked ? 0.5 : 1.4));
D.look = Math.max(-2.4, Math.min(2.4, D.look));
yaw = D.h + D.look;
D.yawSet = yaw;
if (D.noteT > 0) {
D.noteT -= dt;
if (D.noteT <= 0)
D.note = "";
}
if (typeof licenceTestTick === "function")
try {
licenceTestTick(dt, D);
}
catch (e) {
if (window.console)
console.warn("licence test:", e);
}
driveEnforce(dt);
driveHudPaint();
return true;
}
function driveRoad(dt, inp) { return __ZC(123, 7, this, arguments, new.target); }
function driveBlocked(x, z, h, S, v) { return __ZC(123, 8, this, arguments, new.target); }
function railFind() { return __ZC(123, 9, this, arguments, new.target); }
function driveFly(dt, inp) { return __ZC(123, 10, this, arguments, new.target); }
var DRIVE_SPEED_NOTE = 0;
function driveEnforce(dt) { return __ZC(123, 11, this, arguments, new.target); }
function driveCorpOnDuty() {
if (!(typeof CORP !== "undefined" && CORP.mounted))
return false;
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return jobs.some(function (j) { return j.panel === "police" && j.clocked_in; });
}
function driveHudPaint() { return __ZC(123, 12, this, arguments, new.target); }
(function () {
if (typeof renderView !== "function")
return;
var rv = renderView;
renderView = function () {
var D = DRIVE;
if (!(D.on && walkMode && !store.inside && camera))
return rv.apply(this, arguments);
var P = camera.position, px = P.x, py = P.y, pz = P.z, seat = (typeof rideSeatNow === "function") ? rideSeatNow() : 0;
var base = py - 1.72 - seat;
var doRender = function () { (typeof gfxRender === "function" ? gfxRender() : renderer.render(scene, camera)); };
if (D.view === "cab") {
var hide = D.mode === "road" && !(vehSpec(D.arch) || {}).open && typeof rideG !== "undefined" && rideG && rideG.visible;
if (hide)
rideG.visible = false;
camera.rotation.order = "YXZ";
camera.rotation.set(pitch - (D.mode === "fly" ? D.pitch * 0.3 : 0), yaw, D.mode === "fly" ? -D.roll * (typeof touchRig !== "undefined" && touchRig ? 0.2 : 0.5) : 0);
doRender();
if (hide)
rideG.visible = true;
camera.rotation.set(pitch, yaw, 0);
return;
}
var S = D.mode === "road" ? vehSpec(D.arch) : null, len = S ? S.len : (D.arch === "dragon" ? 3 : 1.5);
var dist = 6 + len * 1.5, up = 2.2 + len * 0.35, ang = D.h + D.look;
var fx = -Math.sin(ang), fz = -Math.cos(ang);
while (dist > len + 1.5 && blockedAt(px - fx * dist, pz - fz * dist, base + up))
dist -= 0.5;
if (typeof vwlReach === "function") {
var hy0 = base + 1.4, ty0 = Math.max(base + up - Math.sin(pitch) * dist * 0.6, terrainY(px - fx * dist, pz - fz * dist) + 0.8);
var rch = vwlReach(px, hy0, pz, px - fx * dist, ty0, pz - fz * dist, 0.4), L0 = Math.hypot(fx * dist, ty0 - hy0, fz * dist);
if (rch < L0) {
dist = Math.max(0.6, dist * rch / L0);
if (D.cam) {
D.cam.x = px - fx * dist;
D.cam.z = pz - fz * dist;
D.cam.y = hy0 + (ty0 - hy0) * rch / L0;
}
}
}
var tx = px - fx * dist, tz = pz - fz * dist, ty = Math.max(base + up - Math.sin(pitch) * dist * 0.6, terrainY(tx, tz) + 0.8);
if (!D.cam)
D.cam = { x: tx, y: ty, z: tz };
var k = Math.min(1, (D.dt || 0.016) * 7);
D.cam.x += (tx - D.cam.x) * k;
D.cam.y += (ty - D.cam.y) * k;
D.cam.z += (tz - D.cam.z) * k;
camera.position.set(D.cam.x, D.cam.y, D.cam.z);
camera.lookAt(px + fx * 4, base + 1.2 + Math.sin(pitch) * 3, pz + fz * 4);
if (D.mode === "fly") {
camera.rotateZ(-D.roll * (typeof touchRig !== "undefined" && touchRig ? 0.1 : 0.25));
}
doRender();
camera.position.set(px, py, pz);
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
};
})();
(function () {
if (typeof rideTick !== "function")
return;
var rt = rideTick;
rideTick = function (dt) {
rt(dt);
var D = DRIVE;
if (D.on && typeof rideG !== "undefined" && rideG && rideG.visible) {
rideG.rotation.y = D.h + Math.PI + (RIDE_YAW[D.arch] || 0);
rideG.rotation.z = D.mode === "fly" ? D.roll * 0.6 : 0;
rideG.rotation.x = D.mode === "fly" ? -D.pitch * 0.5 : 0;
}
};
})();
(function () {
if (typeof avatarTick !== "function")
return;
var at = avatarTick;
avatarTick = function (dt) {
at(dt);
var D = DRIVE;
if (!(D.on && walkMode && !store.inside && typeof meG !== "undefined" && meG))
return;
var open = D.mode === "fly" || (vehSpec(D.arch) || {}).open;
meG.visible = D.view === "chase" && !!open;
meG.rotation.y = D.h + Math.PI;
};
})();
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt(dt);
var D = DRIVE;
if (D.on && (!walkMode || store.inside) && D.shown) {
if (typeof DriveHUD !== "undefined")
DriveHUD.close();
D.shown = false;
}
if (D.on && (!walkMode) && !(typeof rideArch !== "undefined" && rideArch))
vehicleEnd();
vehiclePromptTick(dt);
};
})();
var VEH_NEAR = null, VEH_SCAN = 0;
function vehiclePromptTick(dt) {
VEH_SCAN -= dt;
var pr = document.getElementById("veh-prompt");
if (!walkMode || store.inside || DRIVE.on || (typeof rideArch !== "undefined" && rideArch)) {
VEH_NEAR = null;
if (pr)
pr.style.display = "none";
return;
}
if (VEH_SCAN > 0)
return;
VEH_SCAN = 0.25;
var P = camera.position, here = store.here || 0, best = null, bd = 5.5;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!vehicleKindOf(o.archetype) || (o.realm || 0) !== here || o.filler || o.traffic)
continue;
if (o.city && !o.learner)
continue;
if (Math.abs(o.x - P.x) > bd || Math.abs(o.z - P.z) > bd)
continue;
var d = Math.hypot(o.x - P.x, o.z - P.z);
if (d < bd) {
bd = d;
best = o;
}
}
VEH_NEAR = best;
if (!best) {
if (pr)
pr.style.display = "none";
return;
}
if (!pr) {
pr = document.createElement("div");
pr.id = "veh-prompt";
pr.style.cssText = "position:fixed;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:45;display:none;" +
"background:rgba(10,12,18,.92);border:1px solid #C9A868;border-radius:3px;padding:9px 14px;font:13px var(--sans);color:var(--bone);cursor:pointer";
pr.onclick = function () { if (VEH_NEAR)
vehicleTakeWheel(VEH_NEAR); };
document.body.appendChild(pr);
}
var fly = vehicleKindOf(best.archetype) === "fly", nm = (best.learner ? "Learner " : "") + (fly ? FLYER[best.archetype].name : VEH[best.archetype].name);
pr.innerHTML = "<b>" + esc(nm.charAt(0).toUpperCase() + nm.slice(1)) + "</b> · <b>press Q</b> or tap " + (fly ? "to mount" : "to take the wheel");
pr.style.display = "block";
}
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (!walkMode)
return;
var D = DRIVE;
if (D.on) {
if (e.code === "KeyV") {
e.preventDefault();
e.stopImmediatePropagation();
driveToggleView();
return;
}
if (e.code === "KeyQ") {
e.preventDefault();
vehicleLeave();
return;
}
if (e.code === "Comma") {
e.preventDefault();
driveIndicate("left");
return;
}
if (e.code === "Period") {
e.preventDefault();
driveIndicate("right");
return;
}
if (e.code === "Space" && D.mode === "road")
e.preventDefault();
return;
}
if (e.code === "KeyQ" && VEH_NEAR) {
e.preventDefault();
vehicleTakeWheel(VEH_NEAR);
}
}, true);
(function () {
if (typeof magicTick !== "function")
return;
var mt = magicTick;
magicTick = function (dt) { if (DRIVE.on && walkMode && !store.inside)
return; return mt(dt); };
})();
