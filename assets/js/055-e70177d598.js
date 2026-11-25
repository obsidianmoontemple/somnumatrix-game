/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var walkMode = false, locked = false, keys = {}, yaw = 0, pitch = 0;
var canFly = false, flyY = 0, flyVz = 0, portalCool = 0;
function flyFloor() { return (typeof WLD !== "undefined" && WLD.on && !store.inside) ? -2000 : 0; }
var orb = { r: 180, t: 0.9, p: 0.95, tx: 0, tz: 0 }, dragging = null, idle = 0;
function initControls() {
var el = renderer.domElement;
addEventListener("keydown", function (e) {
if (document.activeElement && document.activeElement.tagName === "TEXTAREA")
return;
keys[e.code] = true;
if (e.code === "KeyE" && walkMode && nearChar && !talkOpen && !greetOpen) {
e.preventDefault();
if (nearChar.primary === false)
openGreet(nearChar);
else
openTalk(nearChar);
return;
}
if (e.code === "Escape") {
if (document.getElementById("interp").classList.contains("open")) {
closeInterp();
return;
}
if (storyOpen) {
closeStory();
return;
}
if (document.getElementById("journal").classList.contains("open")) {
closeJournal();
return;
}
if (document.getElementById("self").classList.contains("open")) {
closeSelf();
return;
}
if (greetOpen) {
closeGreet();
return;
}
if (talkOpen) {
closeTalk();
return;
}
if (backOneStep())
return;
if (walkMode)
setWalk(false);
}
if (walkMode && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].indexOf(e.code) > -1)
e.preventDefault();
});
addEventListener("keyup", function (e) { keys[e.code] = false; });
el.addEventListener("mousedown", function (e) {
if (walkMode || plotBusy)
return;
dragging = { x: e.clientX, y: e.clientY };
idle = 0;
});
addEventListener("mouseup", function () { dragging = null; });
addEventListener("mousemove", function (e) {
if (locked) {
yaw -= e.movementX * 0.0022;
pitch = Math.max(-1.35, Math.min(1.35, pitch - e.movementY * 0.0022));
return;
}
if (dragging && !plotBusy) {
if (plotOn && (e.shiftKey || (e.buttons & 2))) {
panOrbit((e.clientX - dragging.x), (e.clientY - dragging.y));
dragging = { x: e.clientX, y: e.clientY };
return;
}
orb.t -= (e.clientX - dragging.x) * 0.006;
orb.p = Math.max(0.12, Math.min(1.5, orb.p - (e.clientY - dragging.y) * 0.005));
dragging = { x: e.clientX, y: e.clientY };
idle = 0;
}
});
el.addEventListener("wheel", function (e) {
if (walkMode)
return;
e.preventDefault();
orb.r = Math.max(25, Math.min(1400, orb.r * (1 + Math.sign(e.deltaY) * 0.12)));
idle = 0;
}, { passive: false });
el.addEventListener("click", function () {
if (walkMode && !locked && el.requestPointerLock)
el.requestPointerLock();
else if (walkMode && locked)
pick();
});
document.addEventListener("pointerlockchange", function () {
locked = (document.pointerLockElement === el);
document.getElementById("recticle").classList.toggle("gone", !locked);
});
var lt = null;
el.addEventListener("touchstart", function (e) { if (touchRig)
return; lt = { x: e.touches[0].clientX, y: e.touches[0].clientY, n: e.touches.length }; }, { passive: true });
el.addEventListener("touchmove", function (e) {
if (touchRig || !lt || plotBusy)
return;
var t = e.touches[0], dx = t.clientX - lt.x, dy = t.clientY - lt.y;
if (walkMode) {
yaw -= dx * 0.005;
pitch = Math.max(-1.35, Math.min(1.35, pitch - dy * 0.005));
}
else {
orb.t -= dx * 0.006;
orb.p = Math.max(0.12, Math.min(1.5, orb.p - dy * 0.005));
idle = 0;
}
lt = { x: t.clientX, y: t.clientY, n: e.touches.length };
}, { passive: true });
el.addEventListener("touchend", function () { lt = null; }, { passive: true });
}
var viewAt = null;
function lookTarget() {
if (viewAt)
return viewAt;
var g = store.grid, o = blockOrigin(g.bx, g.bz);
return { x: o.x, z: o.z };
}
function animate() {
requestAnimationFrame(animate);
var dt = Math.min(clock.getDelta(), 0.1);
if (walkMode) {
var steered = typeof vehicleFrame === "function" && vehicleFrame(dt);
if (!steered) {
var sp = (keys["ShiftLeft"] || keys["ShiftRight"]) ? 26 : 9;
var f = 0, s = 0;
if (keys["KeyW"] || keys["ArrowUp"])
f += 1;
if (keys["KeyS"] || keys["ArrowDown"])
f -= 1;
if (keys["KeyA"] || keys["ArrowLeft"])
s -= 1;
if (keys["KeyD"] || keys["ArrowRight"])
s += 1;
var jv = joyInput() || padInput(), pace = 1;
var inNow = (typeof cfxIndoorsNow === "function") ? cfxIndoorsNow() : (store.inside ? 1 : 0);
if (jv && !f && !s) {
f = jv.f;
s = jv.s;
pace = jv.mag;
if (jv.run && !(inNow && !indoorRun && !jv.pad))
sp = 26;
}
if (inNow && indoorRun && !(typeof rideSpeed !== "undefined" && rideSpeed > 1))
sp = 26;
if (inNow && !(typeof rideSpeed !== "undefined" && rideSpeed > 1)) {
var bigHall = inNow === 2;
sp = bigHall ? ((sp > 9) ? 16 : 6.5) : ((sp > 9) ? 9 : 3.4);
}
if (typeof rideSpeed !== "undefined" && rideSpeed > 1)
sp *= rideSpeed;
if (typeof cwxPace === "function")
sp *= cwxPace();
var vsp = sp;
if (canFly && !store.inside && !(typeof DRIVE !== "undefined" && DRIVE && DRIVE.on)) {
var aP = camera.position, aGy = (typeof terrainY === "function") ? terrainY(aP.x, aP.z) : 0;
if (flyY > aGy + 0.8) {
var fRun = (keys["ShiftLeft"] || keys["ShiftRight"]) || !!(jv && jv.run), fSp = window.DXU_SWIM ? (fRun ? 14 : 8) : (fRun ? 60 : 32);
sp = (typeof rideSpeed !== "undefined" && rideSpeed > 1) ? Math.max(sp, fSp * 1.15) : Math.max(sp, fSp);
}
}
if (f || s) {
var l = Math.hypot(f, s);
f /= l;
s /= l;
f *= pace;
s *= pace;
var wx = (Math.sin(yaw) * -f + Math.cos(yaw) * s) * sp * dt, wz = (Math.cos(yaw) * -f - Math.sin(yaw) * s) * sp * dt;
var wn = Math.max(1, Math.ceil(Math.hypot(wx, wz) / 1.2));
for (var wi = 0; wi < wn; wi++)
walkBy(wx / wn, wz / wn);
}
if (store.inside && typeof inLift === "function" && inLift()) {
if (keys["Space"])
liftMove(1);
if (keys["KeyC"] || keys["ControlLeft"])
liftMove(-1);
}
if (canFly) {
var cv = (keys["Space"] ? 1 : 0) - ((keys["KeyC"] || keys["ControlLeft"]) ? 1 : 0);
var vmax = (typeof touchRig !== "undefined" && touchRig) ? Math.min(vsp, 12) : vsp;
flyVz += (cv * vmax - flyVz) * Math.min(1, dt * 5);
if (!cv && Math.abs(flyVz) < 0.05)
flyVz = 0;
flyY += flyVz * dt;
var flo = flyFloor();
flyY = Math.max(flo, Math.min(900, flyY));
if (flyY === flo && flyVz < 0)
flyVz = 0;
}
}
groundTick(dt);
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
stepThrough();
proximity(dt);
}
else {
idle += dt;
if (idle > 4 && !dragging && !plotOn)
orb.t += dt * 0.045;
if (plotOn)
plotKeys(dt);
var tgt = lookTarget();
if (!plotOn)
orb.tx += (tgt.x - orb.tx) * Math.min(dt * 1.4, 1);
if (!plotOn)
orb.tz += (tgt.z - orb.tz) * Math.min(dt * 1.4, 1);
var oy = (typeof terrainY === "function") ? terrainY(orb.tx, orb.tz) : 0;
camera.position.set(orb.tx + Math.cos(orb.t) * Math.cos(orb.p) * orb.r, oy + Math.max(6, Math.sin(orb.p) * orb.r), orb.tz + Math.sin(orb.t) * Math.cos(orb.p) * orb.r);
camera.rotation.order = "XYZ";
camera.lookAt(orb.tx, oy + 12, orb.tz);
}
tickClock(false);
stepFigures(dt);
animateEffects(dt);
realmWatch();
touchUI();
updateCompass();
skyFollow();
if (audio.on)
audioTick();
if (store.dressLater) {
store.dressLater = false;
realms().forEach(function (r) { realmScenery(r); });
}
if (store.peopleLater) {
store.peopleLater = false;
peopleEverything();
}
navTick();
interiorTick(dt);
padTick();
realmSkyTick(dt);
magicTick(dt);
armsTick(dt);
hubTick(dt);
if (typeof presenceTick === "function")
presenceTick(dt);
doorsTick(dt);
visitTick(dt);
deskTick(dt);
templeTick(dt);
housingTick(dt);
yardTick(dt);
nightTick(dt);
nightFades(dt);
if (typeof atlTick === "function")
atlTick(dt);
if (typeof cityLifeTick === "function")
cityLifeTick(dt);
if (typeof bakeTick === "function")
bakeTick(dt);
if (typeof lotTick === "function")
lotTick(dt);
if (typeof transitTick === "function")
transitTick(dt);
if (typeof workTick === "function")
workTick(dt);
if (typeof mallTick === "function")
mallTick(dt);
if (typeof gfxApply === "function")
gfxApply();
if (typeof atlLifeTick === "function")
atlLifeTick(dt);
avatarTick(dt);
renderView();
}
function stepThrough() {
if (portalCool > 0) {
portalCool -= 1;
return;
}
var hit = passageAt(camera.position.x, camera.position.z, 3.2);
if (!hit)
return;
var ang = Math.random() * 6.283;
camera.position.x = hit.to.x + Math.cos(ang) * 5;
camera.position.z = hit.to.z + Math.sin(ang) * 5;
flyY = 0;
portalCool = 140;
var nm = placeName(hit.to);
setStatus("<b>Through \u2014 " + esc(nm) + ".</b>");
var pel = document.getElementById("place");
pel.innerHTML = esc(nm);
pel.classList.remove("gone");
lastPlace = hit.to;
}
function findHidden(p) {
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.filler || !isHidden(o))
continue;
var dx = o.x - p.x, dz = o.z - p.z;
if (dx * dx + dz * dz < 12 * 12) {
o.found = true;
refresh(o);
save();
setStatus("<b>You found " + esc(placeName(o)) + ".</b>");
}
}
}
var nearChar = null, lastPlace = null;
function proximity(dt) {
var p = camera.position;
for (var i = 0; i < store.characters.length; i++) {
var c = store.characters[i];
if (!c.awake || !c.objId)
continue;
var g = meshes[c.objId];
if (!g)
continue;
var dx = p.x - c.x, dz = p.z - c.z, d2 = dx * dx + dz * dz;
g.userData.facingPlayer = d2 < 900;
if (d2 < 900) {
var want = Math.atan2(dx, dz);
var diff = ((want - g.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
g.rotation.y += diff * Math.min(dt * 1.6, 1);
}
g.children.forEach(function (ch) { if (ch.userData.spin)
ch.rotation.z += dt * 0.6; });
}
var here = nearestNamed(p.x, p.z, 70);
var pel = document.getElementById("place");
if (here !== lastPlace) {
lastPlace = here;
if (here) {
pel.innerHTML = esc(placeName(here)) +
(here.addr && here.archetype !== "road" ? ("<small>" + esc(here.addr.street) + "</small>") : "");
pel.classList.remove("gone");
}
else
pel.classList.add("gone");
}
findHidden(p);
var n = awakeNear(p, 7);
if (nearChar && n !== nearChar && nearChar.objId && store.characters.indexOf(nearChar) >= 0 && nearChar.visible !== false && !talkOpen && !greetOpen && canSpeakTo(nearChar)) {
var kx = nearChar.x - p.x, kz = nearChar.z - p.z;
if (kx * kx + kz * kz < 8.5 * 8.5)
n = nearChar;
}
if (n !== nearChar) {
nearChar = n;
var el = document.getElementById("prompt");
if (n && !talkOpen && !greetOpen) {
document.getElementById("prompt-who").textContent = (n.primary === false ? "someone" :
n.awake ? n.name : (n.name + " \u00b7 not yet awake"));
el.classList.remove("gone");
}
else
el.classList.add("gone");
}
}
function backOneStep() { return __ZC(55, 0, this, arguments, new.target); }
var indoorRun = false;
var walkResume = null;
function setWalk(on) {
if (!on && walkMode && camera)
walkResume = { here: store.here || 0, inside: !!store.inside, x: camera.position.x, y: camera.position.y, z: camera.position.z, yaw: yaw, pitch: pitch, flyY: flyY };
walkMode = on;
document.getElementById("scrim").classList.toggle("hidden", on);
document.getElementById("walkhint").classList.toggle("gone", !on);
document.getElementById("walkbtn").textContent = on ? "Back to capture" : "Walk it";
if (!on) {
if (document.exitPointerLock)
document.exitPointerLock();
closeInspect();
document.getElementById("place").classList.add("gone");
lastPlace = null;
}
else {
var t = lookTarget();
yaw = 0;
pitch = 0;
flyY = 0;
portalCool = 60;
canFly = hasAbility("flying") || hasAbility("floating");
document.getElementById("walkhint").innerHTML = touchRig
? "left thumb to walk, push further to run &middot; drag to look &middot; tap a form to inspect, or a figure to speak"
: "click to look &middot; tab frees the mouse &middot; wasd move &middot; shift run" +
(canFly ? " &middot; space/c to rise and fall" : "") +
" &middot; click a form to inspect &middot; e to speak &middot; esc closes a panel";
var R = walkResume;
if (R && (R.here || 0) !== (store.here || 0))
R = null;
if (R && Math.hypot(R.x - t.x, R.z - t.z) > 3000)
R = null;
if (R && !R.inside && !store.inside && (!R.here || realmById(R.here))) {
if ((store.here || 0) !== R.here)
beHere(R.here);
camera.position.set(R.x, R.y, R.z);
yaw = R.yaw;
pitch = R.pitch;
flyY = R.flyY || 0;
}
else
camera.position.set(t.x, 1.72, t.z + 70);
walkResume = null;
}
}
var picked = null;
var SWATCH = [0x4A4640, 0xB9B3A6, 0x16171C, 0x7A3128, 0x2E4566, 0x33502F, 0x8A6A2E, 0x5E3A30, 0x4E4C46, 0x6B4A3A];
function bakeRayPick(ray, far) { return __ZC(55, 1, this, arguments, new.target); }
function pick() { return __ZC(55, 2, this, arguments, new.target); }
function specById(id) {
for (var i = 0; i < store.objects.length; i++)
if (store.objects[i].id === id)
return store.objects[i];
return null;
}
function openInspect(id) { return __ZC(55, 3, this, arguments, new.target); }
function cityThing(o) {
if (!o)
return false;
if (o.city || o.hub)
return true;
var r = o.realm ? realmById(o.realm) : null;
return !!(r && (r.kind === "somnucor" || r.kind === "hall"));
}
function inspectLock(o) { return __ZC(55, 4, this, arguments, new.target); }
function closeInspect() { picked = null; document.getElementById("inspect").classList.remove("open"); }
function touchPicked() {
if (!picked)
return;
refresh(picked);
document.getElementById("i-sub").textContent = picked.archetype + " \u00b7 " + Math.round(fidelity(picked) * 100) + "% remembered";
save();
}
var NOWALL = { signboard: 1, driveway: 1, road: 1, sidewalk: 1, water: 1, grass: 1, pool: 1, flood: 1, crater: 1, circle: 1, sigil: 1, rift: 1, veil: 1, portal: 1,
secretdoor: 1, fire: 1, wisps: 1, flowers: 1, reeds: 1, parking: 1, bridge: 1, stairs: 1, tunnel: 1, pier: 1, trapdoor: 1, cellar: 1,
secretstair: 1, impossiblestair: 1, sinkhole: 1, fissure: 1, lavaflow: 1, tidalwave: 1, sandstorm: 1, tornado: 1, wildfire: 1,
blizzard: 1, stormcloud: 1, lightningstorm: 1, ashcloud: 1, meteor: 1, dune: 1, hill: 1, mountain: 1, cave: 1, floatingisland: 1,
spiritfire: 1, orb: 1, standingstones: 1, graveyard: 1, playground: 1, geyser: 1, waterfall: 1, barrow: 1, busstop: 0, groundpad: 1, lawn: 1, snowfield: 1, blossomground: 1, leaffall: 1, landinglights: 1, washing: 1,
ragline: 1, pergola: 1, marketawning: 1, prayerflags: 1, lunarlanterns: 1, stringlights: 1, redlanterns: 1, papelpicado: 1, eidlanterns: 1,
torii: 1, paifang: 1, ringarch: 1, estategate: 1, estatepiers: 1, carriagedrive: 1 };
var TRUNK = { tierfountain: 5.6, tree: .55, pine: .5, deadtree: .45, palm: .4, worldtree: 4, giantmushroom: 1, cactus: .5, streetlight: .25, trafficlight: .25,
sign: .2, pylon: .8, hydrant: .3, bollard: .25, mailbox: .35, trashcan: .4, statue: 1.2, runestone: .6, glyphobelisk: 1.4, crystalspire: 4 };
var WALLS = [], wallsAt = -1;
function solidWalls() {
if (typeof INT !== "undefined" && INT) {
var L = INT.level || 0;
return INT.walls.filter(function (w) { return (w.level || 0) === L; });
}
if (wallsAt > 0 && performance.now() - wallsAt < 500)
return WALLS;
wallsAt = performance.now();
WALLS = [];
var here = store.here || 0;
store.objects.forEach(function (o) {
if (!o.solid || o.filler || NOWALL[o.archetype])
return;
var d = KIT[o.archetype];
if (!d || d.cat === "being")
return;
if ((o.realm || 0) !== here)
return;
if (typeof isHidden === "function" && isHidden(o))
return;
var a = o.attrs || {}, s = a.s || 1, g = meshes[o.id];
var h = d.size[1] * s * (a.h || 1);
if (a.lv)
h = Math.max(h, a.lv * 3.2 + 2);
var live = g && typeof g.position.x === "number";
var x = live ? g.position.x : o.x, z = live ? g.position.z : o.z, rot = live && typeof g.rotation.y === "number" ? g.rotation.y : (o.rot || 0);
if (o.archetype === "volcanolair") {
WALLS.push({ x: x, z: z, rot: rot, lair: 1, s: s, h: 36 * s });
return;
}
if (TRUNK[o.archetype] !== undefined)
WALLS.push({ x: x, z: z, r: TRUNK[o.archetype] * s, h: h, b: (typeof terrainY === "function") ? terrainY(x, z) : 0 });
else {
var S = (typeof SURFACE !== "undefined") ? SURFACE[o.archetype] : null;
var wt = S ? (S.top !== undefined ? S.top * s : (S.ramp ? S.ramp[1] * s : (S.mound ? S.mound[1] * s : (S.roof ? h : undefined)))) : undefined;
var dr = null;
if (typeof enterable === "function" && enterable(o) && typeof doorWorld === "function") {
try {
dr = doorWorld(o);
}
catch (e) {
dr = null;
}
}
WALLS.push({ x: x, z: z, rot: rot, hw: d.size[0] * s * (a.w || 1) / 2, hd: d.size[2] * s * (a.d || 1) / 2, h: h, walkTop: wt, door: dr,
b: (typeof terrainY === "function") ? terrainY(x, z) : 0 });
}
});
return WALLS;
}
function throughWalls() {
try {
return dreamer().abilities.some(function (a) { return /through walls/.test(a.name); });
}
catch (e) {
return false;
}
}
function blockedAt(x, z, feet) {
var ws = solidWalls(), R = 0.35;
var relFeet = (typeof INT !== "undefined" && INT) ? feet - (INT.level || 0) * INT.floor : feet;
for (var i = 0; i < ws.length; i++) {
var w = ws[i];
if (relFeet - (w.b || 0) > w.h)
continue;
var dx = x - w.x, dz = z - w.z;
if (w.r !== undefined) {
if (dx * dx + dz * dz < (w.r + R) * (w.r + R))
return true;
continue;
}
if (w.lair) {
var c0 = Math.cos(-w.rot), s0 = Math.sin(-w.rot), qx = (dx * c0 + dz * s0) / w.s, qz = (-dx * s0 + dz * c0) / w.s, rr = Math.sqrt(qx * qx + qz * qz);
var wallR = LAIR_R - (LAIR_R - 9) * Math.min(1, feet / (34 * w.s));
if (Math.abs(rr - wallR) < 1.8 && Math.abs(Math.atan2(qx, qz)) > LAIR_GAP)
return true;
if (qz > 28 && qz < 40 && Math.abs(Math.abs(qx) - 6.2) < 1.1)
return true;
if (feet < 1 && rr < 10.8 && rr > 3.6 && !(qz > 0 && Math.abs(qx) < 1.3))
return true;
continue;
}
if (Math.abs(dx) > w.hw + w.hd + 1 || Math.abs(dz) > w.hw + w.hd + 1)
continue;
var c = Math.cos(-w.rot), sn = Math.sin(-w.rot);
var lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
var atDoor = w.door && feet - (w.b || 0) < 4;
if (atDoor && !w.door.out && Math.abs(x - w.door.x) < 1.5 && Math.abs(z - w.door.z) < 1.5)
continue;
if (atDoor && w.door.out) {
var ddx = x - w.door.x, ddz = z - w.door.z;
var along = ddx * w.door.out.x + ddz * w.door.out.z, side = ddx * w.door.out.z - ddz * w.door.out.x;
if (along > -0.5 && along < w.hw + w.hd && Math.abs(side) < 1.4)
continue;
}
if (Math.abs(lx) < w.hw + R && Math.abs(lz) < w.hd + R) {
if (w.walkTop !== undefined && feet - (w.b || 0) >= w.walkTop - 0.35)
continue;
return true;
}
}
return false;
}
function walkBy(mx, mz) { return __ZC(55, 5, this, arguments, new.target); }
addEventListener("keydown", function (e) {
if (!walkMode || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyG" && typeof armsReach === "function") {
armsReach();
}
if (e.code === "KeyF" && typeof useCarried === "function") {
useCarried();
}
});
