/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var standFall = 0, SURF = [], surfAt = -1, STEP_UP = 0.62;
var pinnedLevel = null;
var SURFACE = {
stairs: { ramp: [0, 2.6] }, celestialstair: { ramp: [0, 22] }, impossiblestair: { ramp: [0, 6] },
bridge: { top: 1.1 }, brokenhighway: { top: 8.5 }, rainbowbridge: { top: 9.4 }, pier: { top: 1.2 },
ship: { top: 3.4, board: true }, boat: { top: 0.55 }, soulferry: { top: 1.3 }, shipwreck: { top: 2.6 },
sleigh: { top: 1.25 }, firechariot: { top: 1.6 }, flyingcarpet: { top: 0.62 }, cloudbank: { top: 2.6 },
floatingisland: { top: 0 }, moonrock: { top: 2.2 }, dune: { mound: [26, 5.6] }, hill: { mound: [16, 6] },
barrow: { mound: [9, 3.4] }, rock: { mound: [3, 2.2] }, stage: { top: 1.2 }, platform: { top: 1.2 },
watertower: { top: 15.2 }, skyscraper: { roof: true }, warehouse: { roof: true }, factory: { roof: true },
hangar: { roof: true }, bunker: { roof: true }, habitat: { roof: true }, reactor: { roof: true },
falloutshelter: { roof: true }, ziggurat: { top: 17 }, pueblo: { roof: true }, marketawning: { top: 3.2 },
wall: { top: 2.4 }, stonewall: { top: 2 }, barricade: { top: 1.4 }, crates: { top: 2 }, scrapheap: { top: 2.6 },
monolith: { roof: true }, sunkenruins: { top: 0.6 }, treasurechest: { top: 1.1 }
};
function surfaceList() { return __ZC(54, 0, this, arguments, new.target); }
function supportAt(x, z, feet) { return __ZC(54, 1, this, arguments, new.target); }
function flightAt(P, feet) { return __ZC(54, 2, this, arguments, new.target); }
function levelFor(feet) {
if (!INT)
return 0;
return Math.max(0, Math.min(INT.levels - 1, Math.round(feet / INT.floor)));
}
function insideSupport(P, feet) {
if (!INT)
return 0;
var f = flightAt(P, feet);
if (f !== null)
return f;
if (pinnedLevel !== null)
return pinnedLevel * INT.floor;
return levelFor(feet) * INT.floor;
}
function floorOpenAt(x, z, Hb) { return __ZC(54, 3, this, arguments, new.target); }
function verticalStop(x, z, fromFeet, toFeet) { return __ZC(54, 4, this, arguments, new.target); }
var RFH = { stuck: 0 };
function roofUnder(x, z, feet, drop) {
if (store.inside || typeof blockedAt !== "function" || throughWalls())
return null;
if (blockedAt(x, z, feet))
return null;
var lo = feet - Math.max(0.45, drop), free = feet, hit = null;
for (var y = feet - 0.45;; y -= 2.5) {
if (y < lo)
y = lo;
if (blockedAt(x, z, y)) {
hit = y;
break;
}
free = y;
if (y <= lo)
break;
}
if (hit === null)
return null;
for (var i = 0; i < 12; i++) {
var m = (free + hit) / 2;
if (blockedAt(x, z, m))
hit = m;
else
free = m;
}
return free;
}
function roofFree(dt, P, feet) {
if (store.inside || throughWalls() || !blockedAt(P.x, P.z, feet)) {
RFH.stuck = 0;
return null;
}
if ((typeof DRIVE !== "undefined" && DRIVE && DRIVE.on) || (typeof SOF !== "undefined" && SOF.seated) ||
(typeof rideArch !== "undefined" && rideArch) || (typeof riding !== "undefined" && riding)) {
RFH.stuck = 0;
return null;
}
RFH.stuck += dt;
if (RFH.stuck < 1.2)
return null;
RFH.stuck = 0;
if (canFly) {
for (var up = 1; up <= 240; up += up < 20 ? 1 : 4)
if (!blockedAt(P.x, P.z, feet + up)) {
var lo = feet + Math.max(0, up - (up <= 20 ? 1 : 4)), hi = feet + up;
for (var i = 0; i < 12; i++) {
var m = (lo + hi) / 2;
if (blockedAt(P.x, P.z, m))
lo = m;
else
hi = m;
}
return { x: P.x, z: P.z, feet: hi };
}
}
for (var r = 0.6; r <= 40; r += 0.6)
for (var a = 0; a < 24; a++) {
var ang = a * Math.PI / 12, x = P.x + Math.sin(ang) * r, z = P.z + Math.cos(ang) * r;
if (!blockedAt(x, z, feet) && !(typeof atlBlocks === "function" && atlBlocks(x, z, x, z, feet)))
return { x: x, z: z, feet: feet };
}
return null;
}
function groundTick(dt) {
if (!walkMode)
return;
var P = camera.position, feet = P.y - 1.72;
if (canFly && flyFloor() < 0 && Math.abs(flyY - feet) > 3)
flyY = feet;
var sup = store.inside ? insideSupport(P, feet) : supportAt(P.x, P.z, feet);
if (!store.inside && !(typeof DRIVE !== "undefined" && DRIVE && DRIVE.on)) {
var out = roofFree(dt, P, feet);
if (out) {
P.x = out.x;
P.z = out.z;
feet = out.feet;
flyY = feet;
flyVz = 0;
standFall = 0;
sup = supportAt(P.x, P.z, feet);
}
var drop = canFly ? Math.max(0, feet - flyY) : (standFall + 24 * dt) * dt;
var rf = roofUnder(P.x, P.z, feet, drop + 0.05);
if (rf !== null && rf > sup) {
sup = rf;
if (canFly && flyY < sup && flyVz < 0)
flyVz = 0;
}
}
if (!store.inside && typeof rideSeatNow === "function")
sup += rideSeatNow();
var flying = canFly && flyY > sup + 0.05, flyLevel = null;
if (flying) {
var stop = store.inside ? verticalStop(P.x, P.z, feet, flyY) : null;
if (stop === null) {
if (Math.abs(feet - flyY) > 1e-6)
pinnedLevel = null;
feet = flyY;
}
else {
var goingUp = flyY > feet;
feet = goingUp ? stop - 0.15 : stop + 0.15;
flyLevel = Math.round(stop / INT.floor) + (goingUp ? -1 : 0);
pinnedLevel = flyLevel;
}
standFall = 0;
}
else {
pinnedLevel = null;
if (feet > sup + 0.02) {
standFall = Math.min(26, standFall + 24 * dt);
feet = Math.max(sup, feet - standFall * dt);
}
else {
standFall = 0;
feet = sup;
}
}
if (store.inside && INT) {
var lvl = flyLevel !== null ? flyLevel : (pinnedLevel !== null ? pinnedLevel : levelFor(feet));
if (!flying && flightAt(P, feet) !== null && Math.abs(feet - lvl * INT.floor) > INT.floor * 0.12)
lvl = INT.level;
if (lvl !== INT.level && typeof levelAllowed === "function" && !levelAllowed(lvl)) {
feet = lvl > INT.level ? Math.min(feet, (INT.level + 1) * INT.floor - 0.1) : Math.max(feet, INT.level * INT.floor + 0.1);
lvl = INT.level;
}
else if (lvl !== INT.level) {
INT.level = lvl;
wallsAt = -1;
setStatus(lvl ? "Floor " + (lvl + 1) + " of " + INT.levels + "." : "The ground floor.");
}
}
flyY = feet > 0.04 || (flyFloor() < 0 && feet < 0) ? feet : 0;
P.y = 1.72 + feet;
}
