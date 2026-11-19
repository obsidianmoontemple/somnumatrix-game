/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(103, function () {
"use strict";
return [
function (n, v) {
var sp = eyrieSpec();
if (!sp || !n)
return null;
var S = eyrieSlot(n), L = eyrieLocal(S.side, S.u, v === undefined ? 3.9 : v), r = sp.rot || 0, c = Math.cos(r), s = Math.sin(r);
var base = terrainY(sp.x, sp.z) + (sp.y || 0);
var ox = L.ox * c + L.oz * s, oz = -L.ox * s + L.oz * c;
return { x: sp.x + L.x * c + L.z * s, z: sp.z - L.x * s + L.z * c, y: base + S.y, ox: ox, oz: oz, rot: Math.atan2(ox, oz), floor: S.f, n: n };
},
function (B) {
EY.landCool = 4;
EY.guide = null;
var sp = eyrieSpec();
if (!sp)
return;
enterBuilding(sp);
if (typeof INT === "undefined" || !INT || !store.inside)
return;
if (CORP.mounted)
corpMount(false);
var f = Math.min(B.floor, (INT.levels || 1) - 1);
INT.level = f;
camera.position.y = 1.72 + f * INT.floor;
wallsAt = -1;
setStatus("<b>Home.</b> " + esc(myDragon().name) + " settles on the balcony. You are on floor " + (f + 1) + ", at your apartment.");
},
function () {
var mine = CORP.data && CORP.data.apartment, B = mine ? eyriePerch(mine) : null;
if (!B)
return;
if (store.inside && typeof exitInterior === "function")
exitInterior(true);
EY.landCool = 5;
EY.away = false;
camera.position.set(B.x, B.y + RIDE_SEAT.dragon + 1.72, B.z);
yaw = Math.atan2(-B.ox, -B.oz);
pitch = -0.12;
corpMount(true);
if (typeof flyY !== "undefined")
flyY = B.y + RIDE_SEAT.dragon;
setStatus("<b>Out onto the balcony, and up into the saddle.</b> " + esc(myDragon().name) + " spreads its wings — Space to climb, C to come down. Land here again to go back in.");
},
function () {
var mine = CORP.data && CORP.data.apartment, sp = eyrieSpec();
if (!sp)
return;
if (CORP.mounted && mine) {
var B = eyriePerch(mine);
EY.guide = { x: B.x, z: B.z, y: B.y, name: "your balcony" };
}
else {
var d = doorWorld(sp);
EY.guide = { x: d.x, z: d.z, name: "the Eyrie's door" };
}
if (typeof WORK !== "undefined") {
WORK.open = false;
if (typeof workPaint === "function")
workPaint();
}
}
];
});
