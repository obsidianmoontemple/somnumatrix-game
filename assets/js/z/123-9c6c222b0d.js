/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(123, function () {
"use strict";
return [
function () {
if (TOWER_AT && TOWER_AT.at > Date.now() - 10000)
return TOWER_AT.p;
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null, p = null;
if (r)
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.realm === r.id && o.archetype === "somnucortower") {
var s = (o.attrs && o.attrs.s) || 1, H = ((KIT.somnucortower && KIT.somnucortower.size[1]) || 210) * s;
p = { x: o.x, z: o.z, top: terrainY(o.x, o.z) + H };
break;
}
}
TOWER_AT = { at: Date.now(), p: p };
return p;
},
function (arch, src, spec) {
var kind = vehicleKindOf(arch);
if (!kind)
return false;
var D = DRIVE;
D.on = true;
D.mode = kind;
D.arch = arch;
D.src = src;
D.spec = spec || null;
D.v = 0;
D.steer = 0;
D.thr = 0;
D.brk = 0;
D.ind = null;
D.indTurn = 0;
D.look = 0;
D.roll = 0;
D.pitch = 0;
D.climb = 0;
D.bumps = 0;
D.overT = 0;
D.wrongT = 0;
D.offT = 0;
D.trip = {};
D.cam = null;
D.rail = null;
D.note = "";
D.noteT = 0;
D.h = yaw;
D.yawSet = yaw;
if (spec) {
D.h = (spec.rot || 0) + Math.PI;
yaw = D.h;
D.yawSet = yaw;
pitch = -0.04;
}
D.prevFly = (typeof canFly !== "undefined") ? canFly : false;
if (kind === "road") {
if (typeof canFly !== "undefined")
canFly = false;
if (typeof flyY !== "undefined")
flyY = 0;
}
else if (typeof canFly !== "undefined")
canFly = true;
if (kind === "road" && VEH[arch].c === "tram")
railFind();
driveHudOpen();
var P = vehSpec(arch) || FLYER[arch] || { name: arch };
setStatus(kind === "road"
? "<b>At the wheel of the " + esc(P.name) + ".</b> W to go, S to brake (hold it to reverse), A and D to steer, V for the view, Q to get out. Keep right."
: "<b>In the saddle.</b> W faster, S slower, A and D to bank, Space to climb and C to come down. V for the view.");
return true;
},
function () {
if (typeof DriveHUD === "undefined")
return;
var D = DRIVE, lic = D.mode === "fly" ? "flying" : (VEH[D.arch] ? VEH[D.arch].lic : null);
var nm = D.mode === "fly" ? (FLYER[D.arch] || {}).name : (VEH[D.arch] || {}).name;
var title = (D.spec && D.spec.learner) ? ("Learner " + nm) : (D.src === "corp" ? "Dragon Corp patrol" : (typeof riding !== "undefined" && riding ? riding : ("The " + nm)));
title = title.charAt(0).toUpperCase() + title.slice(1);
var B = { view: driveToggleView, exit: vehicleLeave };
if (D.mode === "road" && VEH[D.arch].c !== "tram") {
B.left = function () { driveIndicate("left"); };
B.right = function () { driveIndicate("right"); };
}
DriveHUD.open({ kind: D.mode === "fly" ? (FLYER[D.arch].hud) : VEH[D.arch].hud, title: title, licence: lic, buttons: B });
D.shown = true;
},
function () {
var D = DRIVE;
if (!D.on)
return;
if (D.mode === "fly") {
var sup = (typeof supportAt === "function") ? supportAt(camera.position.x, camera.position.z, camera.position.y - 1.72) : terrainY(camera.position.x, camera.position.z);
if (D.alt > 2.5 && flyY > sup + 2.5) {
driveNote("Land first — hold C to come down.", 3);
setStatus("<b>Land first.</b> Hold C (or the down button) to come down, then get off.");
return;
}
}
if (D.src === "corp" && typeof corpMount === "function") {
vehicleEnd();
corpMount(false);
return;
}
if (D.src === "ride" && typeof ride === "function") {
vehicleEnd();
ride(null);
return;
}
var o = D.spec, h = D.h, P = camera.position;
vehicleEnd();
if (o) {
var home = o.home, far = home && Math.hypot(P.x - home.x, P.z - home.z) > 30;
var at = far ? home : { x: P.x, z: P.z, rot: h - Math.PI };
o.x = at.x;
o.z = at.z;
o.rot = at.rot;
var g = (typeof meshes !== "undefined") ? meshes[o.id] : null;
if (g) {
g.position.x = o.x;
g.position.z = o.z;
g.position.y = terrainY(o.x, o.z) + (o.y || 0);
g.rotation.y = o.rot;
g.visible = true;
}
if (o._solid !== undefined) {
o.solid = o._solid;
delete o._solid;
}
if (typeof wallsAt !== "undefined")
wallsAt = -1;
var V = vehSpec(o.archetype), wid = V ? V.wid : 1.2;
var lx = -Math.cos(h), lz = Math.sin(h), out = null;
[1, -1].forEach(function (sd) { if (out)
return; var x = P.x + lx * sd * (wid + 1.1), z = P.z + lz * sd * (wid + 1.1); if (!blockedAt(x, z, 0))
out = { x: x, z: z }; });
if (out) {
P.x = out.x;
P.z = out.z;
}
if (far)
setStatus("<b>Out of the " + esc((V || FLYER[o.archetype] || { name: "vehicle" }).name) + ".</b> The Licensing Office will fetch it back to its bay.");
else
setStatus("<b>Out, and on foot.</b> Press Q beside it to get back in.");
}
rideArch = null;
try {
var L = meLook();
L.ride = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
},
function () {
var D = DRIVE;
if (!D.on)
return;
var wasFly = D.mode === "fly", prev = D.prevFly;
try {
var o0 = D.src === "wheel" ? D.spec : null;
if (o0) {
var g0 = (typeof meshes !== "undefined") ? meshes[o0.id] : null;
if (o0.home && Math.hypot(camera.position.x - o0.home.x, camera.position.z - o0.home.z) > 30) {
o0.x = o0.home.x;
o0.z = o0.home.z;
o0.rot = o0.home.rot;
}
if (g0) {
g0.position.x = o0.x;
g0.position.z = o0.z;
g0.position.y = terrainY(o0.x, o0.z) + (o0.y || 0);
if (o0.rot != null)
g0.rotation.y = o0.rot;
g0.visible = true;
}
if (o0._solid !== undefined) {
o0.solid = o0._solid;
delete o0._solid;
}
if (typeof wallsAt !== "undefined")
wallsAt = -1;
}
}
catch (e) { }
D.on = false;
D.mode = null;
D.spec = null;
D.v = 0;
D.shown = false;
D.rail = null;
if (typeof DriveHUD !== "undefined")
DriveHUD.close();
if (typeof canFly !== "undefined") {
var abil = (typeof hasAbility === "function") && (hasAbility("flying") || hasAbility("floating"));
canFly = wasFly ? (abil || (typeof magicGranted !== "undefined" && !!magicGranted)) : (prev || abil);
}
if (typeof licenceTestAbort === "function")
licenceTestAbort("left");
},
function (o) {
if (!o || DRIVE.on)
return false;
if (typeof rideArch !== "undefined" && rideArch) {
setStatus("Get off what you are riding first.");
return false;
}
var P = camera.position;
o._solid = o.solid;
o.solid = false;
if (typeof wallsAt !== "undefined")
wallsAt = -1;
var g = (typeof meshes !== "undefined") ? meshes[o.id] : null;
if (g)
g.visible = false;
P.x = o.x;
P.z = o.z;
if (typeof flyY !== "undefined")
flyY = terrainY(o.x, o.z);
rideArch = o.archetype;
if (typeof rideG !== "undefined" && rideG) {
scene.remove(rideG);
rideG = null;
}
if (typeof build === "function" && typeof rideG !== "undefined" && o.archetype !== "dragon") {
try {
rideG = build({ id: "__ride", archetype: o.archetype, attrs: o.attrs || {}, solid: false, detail: 4, nights: [], city: true });
rideG.traverse(function (m) { m.raycast = function () { }; });
scene.add(rideG);
if (typeof modelDress === "function")
modelDress(rideG, { id: o.id, archetype: o.archetype, attrs: o.attrs || {}, solid: true, placed: true });
}
catch (e) {
rideG = null;
}
}
try {
var L = meLook();
L.ride = o.archetype;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
return vehicleStart(o.archetype, "wheel", o);
},
function () {
var f = 0, s = 0;
if (keys["KeyW"] || keys["ArrowUp"])
f += 1;
if (keys["KeyS"] || keys["ArrowDown"])
f -= 1;
if (keys["KeyA"] || keys["ArrowLeft"])
s -= 1;
if (keys["KeyD"] || keys["ArrowRight"])
s += 1;
var kb = !!(f || s);
if (!f && !s) {
var jv = (typeof joyInput === "function" ? joyInput() : null) || (typeof padInput === "function" ? padInput() : null);
if (jv) {
f = Math.max(-1, Math.min(1, jv.f));
s = Math.max(-1, Math.min(1, jv.s));
}
}
return { f: f, s: s, kb: kb, hand: !!keys["Space"], up: !!keys["Space"], down: !!(keys["KeyC"] || keys["ControlLeft"]) };
},
function (dt, inp) {
var D = DRIVE, S = vehSpec(D.arch), P = camera.position;
if (typeof canFly !== "undefined" && canFly)
canFly = false;
if (typeof flyY !== "undefined")
flyY = 0;
var f = inp.f, v = D.v, thr = 0, brk = 0;
if (f > 0) {
if (v < -0.3)
brk = f;
else
thr = f;
}
else if (f < 0) {
if (v > 0.3)
brk = -f;
else
thr = f;
}
if (inp.hand)
brk = Math.max(brk, 0.85);
var a = 0;
if (thr > 0)
a += thr * S.acc * Math.max(0, 1 - v / S.vmax);
if (thr < 0)
a += thr * S.acc * 0.6 * Math.max(0, 1 - Math.abs(v) / 5);
var drag = 0.25 + 0.0028 * v * v + (thr === 0 && brk === 0 ? 0.7 : 0);
var stop = brk * S.brake + drag;
if (v > 0)
v = Math.max(0, v + a * dt - stop * dt);
else if (v < 0)
v = Math.min(0, v + a * dt + stop * dt);
else
v = v + a * dt;
if (v > S.vmax)
v = S.vmax;
D.thr = Math.abs(thr);
D.brk = brk;
var lock = 0.6 / (1 + Math.abs(v) / 8);
D.steer += (inp.s * lock - D.steer) * Math.min(1, dt * 7);
var turn = -(v / S.wb) * Math.tan(D.steer) * dt;
if (S.cls === "tram") {
turn = 0;
D.steer = 0;
}
var nh = D.h + turn;
var fx = -Math.sin(nh), fz = -Math.cos(nh), nx = P.x + fx * v * dt, nz = P.z + fz * v * dt;
if (S.cls === "tram") {
if (!D.rail)
railFind();
if (!D.rail) {
v = 0;
nx = P.x;
nz = P.z;
driveNote("A tram runs only on its rails. Take it to a tram line.", 2);
}
else {
var R = D.rail;
R.a += R.dir * v * dt / R.r;
nx = ATLC.x + Math.cos(R.a) * R.r;
nz = ATLC.z + Math.sin(R.a) * R.r;
nh = Math.atan2(Math.sin(R.a) * R.dir, -Math.cos(R.a) * R.dir);
}
}
if (Math.abs(v) > 0.01) {
var hit = driveBlocked(P.x, P.z, D.h, S, v) ? false : driveBlocked(nx, nz, nh, S, v);
if (hit) {
var was = Math.abs(v);
v = was > 2 ? -v * 0.22 : 0;
D.bumps++;
D.bumpAt = Date.now();
if (was > 3)
driveNote(was > 9 ? "Crash! Mind what is in front of you." : "Bump.", 2);
if (typeof audio !== "undefined" && audio.on && typeof playTone === "function" && was > 3)
try {
playTone(70, 0.2);
}
catch (e) { }
nx = P.x;
nz = P.z;
nh = D.h;
if (D.rail) {
D.rail.a -= D.rail.dir * was * dt / D.rail.r;
}
}
}
P.x = nx;
P.z = nz;
D.h = nh;
D.v = v;
if (D.ind) {
D.indTurn += turn;
if (Math.abs(D.indTurn) > 1.1 && Math.abs(D.steer) < 0.04) {
D.ind = null;
D.indTurn = 0;
}
}
var mph = Math.abs(v) / MPH_MS;
if (S.cls === "carriage")
D.gear = mph < 0.5 ? "N" : (mph < 4 ? "D1" : mph < 8 ? "D2" : mph < 12 ? "D3" : "D4");
else
D.gear = inp.hand && mph < 0.5 ? "P" : (v < -0.2 ? "R" : (mph < 0.5 && !thr ? "N" : "D" + (mph < 12 ? 1 : mph < 22 ? 2 : mph < 32 ? 3 : mph < 45 ? 4 : 5)));
D.road = roadAt(P.x, P.z);
D.limit = D.road.limit;
},
function (x, z, h, S, v) {
var fx = -Math.sin(h), fz = -Math.cos(h), lx = -fz, lz = fx, sg = v >= 0 ? 1 : -1, feet = terrainY(x, z) + 0.3;
var pts = [[sg * S.len, 0], [sg * S.len, S.wid * 0.85], [sg * S.len, -S.wid * 0.85], [sg * S.len * 0.5, S.wid * 0.9], [sg * S.len * 0.5, -S.wid * 0.9]];
for (var i = 0; i < pts.length; i++) {
var px = x + fx * pts[i][0] + lx * pts[i][1], pz = z + fz * pts[i][0] + lz * pts[i][1];
if (blockedAt(px, pz, feet))
return true;
var bx = px - fx * sg * 0.7, bz = pz - fz * sg * 0.7;
if (!store.inside && typeof atlBlocks === "function" && atlBlocks(bx, bz, px, pz, terrainY(bx, bz)))
return true;
}
return false;
},
function () {
var D = DRIVE, P = camera.position;
D.rail = null;
if (typeof ATLC === "undefined" || !ATLC)
return;
var dx = P.x - ATLC.x, dz = P.z - ATLC.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx), best = null;
(typeof TRAM_RAIL_RINGS !== "undefined" ? TRAM_RAIL_RINGS : [740, 1080, 1280, 1620]).forEach(function (rs) { [-1, 1].forEach(function (dir) { var rr = rs + dir * 2.6, d = Math.abs(r - rr); if (d < 14 && (!best || d < best.d))
best = { d: d, r: rr, lane: dir }; }); });
if (!best)
return;
var fx = -Math.sin(D.h), fz = -Math.cos(D.h), tx = -Math.sin(a), tz = Math.cos(a);
D.rail = { r: best.r, a: a, dir: (fx * tx + fz * tz) >= 0 ? 1 : -1 };
},
function (dt, inp) {
var D = DRIVE, F = FLYER[D.arch], P = camera.position;
if (typeof canFly !== "undefined")
canFly = true;
var seat = (typeof rideSeatNow === "function") ? rideSeatNow() : 0;
var gy = terrainY(P.x, P.z);
var sup = ((typeof supportAt === "function") ? supportAt(P.x, P.z, P.y - 1.72) : gy) + seat;
var fy = (typeof flyY === "number") ? Math.max(flyY, sup) : sup;
var landed = fy <= sup + 0.06;
var v;
if (typeof touchRig !== "undefined" && touchRig && !inp.kb) {
var want = landed && inp.f < 0 ? -2 : Math.max(0, inp.f) * (landed ? 6 : F.vmax);
var ease = inp.f < -0.05 ? F.acc * 1.6 : (inp.f > 0.05 ? F.acc * 1.2 : F.acc * 0.9);
v = D.v + Math.max(-ease * dt, Math.min(ease * dt, want - D.v));
}
else {
v = D.v + inp.f * F.acc * dt;
if (inp.f === 0 && landed)
v -= Math.sign(v) * Math.min(Math.abs(v), 4 * dt);
}
v = Math.max(landed ? -2 : 0, Math.min(landed ? 6 : F.vmax, v));
var rollT = landed ? 0 : inp.s * 0.65;
D.roll += (rollT - D.roll) * Math.min(1, dt * 3);
var w = landed ? inp.s * 1.4 : Math.min(1.6, 9.81 * Math.tan(Math.abs(D.roll)) / Math.max(Math.abs(v), 5)) * Math.sign(D.roll);
D.h -= w * dt;
var c = (typeof inp.c === "number") ? inp.c : (inp.up ? 1 : 0) - (inp.down ? 1 : 0), rate = Math.min(14, 4 + Math.abs(v) * 0.35);
var climb = c * rate;
var ceilY = gy + FLY_CEILING;
var ny = fy + climb * dt;
if (ny > ceilY) {
ny = ceilY;
climb = 0;
driveNote("The ceiling: " + FLY_CEILING + " m above the ground is as high as Somnucor lets you fly.", 2.5);
}
if (ny < sup) {
ny = sup;
climb = 0;
}
D.pitch += (Math.atan2(climb, Math.max(Math.abs(v), 3)) - D.pitch) * Math.min(1, dt * 4);
var fx = -Math.sin(D.h), fz = -Math.cos(D.h), nx = P.x + fx * v * dt, nz = P.z + fz * v * dt;
var cliff = terrainY(nx + fx * 1.5, nz + fz * 1.5) + seat > ny + 0.4;
if (Math.abs(v) > 0.01 && (cliff || (!blockedAt(P.x, P.z, ny) && (blockedAt(nx, nz, ny) || blockedAt(nx + fx * 1.5, nz + fz * 1.5, ny))))) {
var was = Math.abs(v);
v = 0;
nx = P.x;
nz = P.z;
D.bumps++;
D.bumpAt = Date.now();
if (was > 3)
driveNote("Pulled up short of a wall.", 2);
}
var T = inSomnucorNow() ? towerSpot() : null;
D.nofly = false;
D.noflyNear = false;
if (T) {
var tdx = nx - T.x, tdz = nz - T.z, td = Math.hypot(tdx, tdz), low = T.top - NOFLY_DROP;
if (ny > low - 30 && td < NOFLY_R + 60)
D.noflyNear = true;
if (ny > low && td < NOFLY_R) {
D.nofly = true;
var k = (NOFLY_R + 0.5) / Math.max(td, 0.01);
nx = T.x + tdx * k;
nz = T.z + tdz * k;
v = Math.min(v, 6);
driveNote("No-fly zone: the Tower's penthouse. Turned away.", 3);
}
}
P.x = nx;
P.z = nz;
D.v = v;
D.climb = climb;
if (typeof flyY !== "undefined")
flyY = ny;
D.alt = Math.max(0, ny - seat - gy);
D.gear = null;
D.thr = Math.max(0, inp.f);
D.brk = Math.max(0, -inp.f);
D.road = null;
D.limit = null;
},
function (dt) {
var D = DRIVE;
if (!inSomnucorNow())
return;
var lic = driveLicenceKind(), moving = Math.abs(D.v) > 2 || (D.mode === "fly" && D.alt > 3);
var onTest = !!(D.test && D.test.active && D.test.kind === lic);
var corpDuty = D.mode === "fly" && driveCorpOnDuty();
var corpOwn = D.mode === "fly" && D.src === "corp" && typeof CORP !== "undefined" && CORP.mounted;
if (lic && moving && !onTest && !corpDuty && !corpOwn && !D.trip.learner && !(typeof hasLicence === "function" && hasLicence(lic)) && !D.trip.nolic) {
D.trip.nolic = true;
if (typeof licenceOffence === "function")
licenceOffence(lic, lic === "flying" ? "flying without a licence" : "driving without a licence");
setStatus("<b>You hold no " + (lic === "flying" ? "flying" : "driving") + " licence.</b> " + (lic === "flying" ? "Flying over" : "Driving in") +
" Somnucor without one is an offence, and it has been recorded. The Licensing Office in the Civic Ring teaches and tests.");
}
if (D.mode === "road" && D.road) {
var lim = D.road.limit !== null ? D.road.limit : (D.road.mph || 60) * MPH_MS;
var over = Math.abs(D.v) > lim * 1.1 + 0.9;
D.overT = over ? D.overT + dt : 0;
if (over && !D.note)
driveNote("Over the limit — " + D.road.mph + " mph here.", 0.5);
if (D.overT > 3 && !onTest && Date.now() - DRIVE_SPEED_NOTE > 60000) {
DRIVE_SPEED_NOTE = Date.now();
var what = "speeding: " + Math.round(Math.abs(D.v) / MPH_MS) + " mph in a " + D.road.mph;
if (typeof licenceOffence === "function")
licenceOffence("driving", what);
setStatus("<b>Speeding, and recorded.</b> " + esc(what) + ". At 30 mph a car needs about 23 m to stop; at 40, about 36 m.");
}
if (D.road.kind === "ring" && Math.abs(D.v) > 2) {
var a = D.road.a, fx = -Math.sin(D.h), fz = -Math.cos(D.h), along = fx * -Math.sin(a) + fz * Math.cos(a);
var wrong = (along * ROAD_SIDE > 0.5 && D.road.r < D.road.rs - 0.4) || (along * ROAD_SIDE < -0.5 && D.road.r > D.road.rs + 0.4);
D.wrongT = wrong ? D.wrongT + dt : 0;
if (D.wrongT > 1.5 && !D.note)
driveNote("Keep right — you are on the wrong side of the road.", 1.5);
}
else
D.wrongT = 0;
D.offT = D.road.kind === "off" && Math.abs(D.v) > 1 ? D.offT + dt : 0;
if (D.offT > 1 && !D.note)
driveNote("Off the road — pavements and gardens are for people.", 1.5);
}
if (D.mode === "fly" && D.nofly && !onTest && !D.trip.learner && !corpDuty && !D.trip.nofly) {
D.trip.nofly = true;
if (typeof licenceOffence === "function")
licenceOffence("flying", "entering the no-fly zone round the Tower penthouse");
}
if (D.mode === "fly" && !D.nofly)
D.trip.nofly = false;
},
function () {
if (typeof DriveHUD === "undefined" || !DriveHUD.isOpen())
return;
var D = DRIVE, b = bearingOfHeading(D.h), T = D.test && D.test.active ? D.test : null;
var next = T && T.next ? T.next : null, turn = T && T.turn !== undefined ? T.turn : null;
var road = D.mode === "road" ? (D.road && D.road.name ? (D.road.name.charAt(0).toUpperCase() + D.road.name.slice(1)) + " · heading " + compassWord(b) : "Heading " + compassWord(b))
: ("Heading " + compassWord(b) + (D.noflyNear && !D.nofly ? " · the Tower's no-fly zone is close" : ""));
var note = D.note || (T && T.note) || "";
DriveHUD.update({ speed: Math.abs(D.v), limit: D.mode === "road" && D.road ? D.road.limit : null, throttle: D.thr, brake: D.brk, gear: D.gear,
heading: b, next: next, turn: turn, road: road, note: note, indicator: D.ind, altitude: D.alt, climb: D.climb, pitch: D.pitch, roll: D.roll });
}
];
});
