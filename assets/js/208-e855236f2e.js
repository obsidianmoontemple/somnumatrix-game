/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CSEC = { int: null, marks: [], near: null, t: 0, told: null,
list: {
throneroom: { x: -0.5, z: 0.5, side: "back", name: "The Ember Seam", text: "Behind the dais, one block of basalt is warm where the others are cool. Pressed, it gives a little, and a hand's width of the wall turns on a pin: inside, a narrow shelf holds the castle's first key, cast in gold, with a dragon for its bow. Whoever built this hall meant its lord to have a way out." },
lair: { x: 0.42, z: 0.5, side: "right", name: "The Shed Scale", text: "Wedged in a crack of the wall, where the sleeping dragon cannot see it, is one great scale the size of a shield, shed long ago. Its underside is scratched with a tally of years: the dragon has slept here longer than the city has stood." },
banquet: { x: -0.42, z: 0.3, side: "left", name: "The Steward's Ledger", text: "A panel by the high table slides aside: the steward's private ledger of every feast held here, with the guests, the courses and, in a smaller hand, who was not invited and why." },
treasury: { x: 0.42, z: -0.3, side: "right", name: "The False Floor", text: "One flagstone here rings hollow. Under it, a chest older than every other in the vault: no gold at all, only a child's wooden sword, wrapped in silk. The most precious thing in the treasury is the one no thief would take." },
forge: { x: -0.42, z: -0.25, side: "left", name: "Hephaestus's Mark", text: "Low on the wall a hammer and tongs are cut into the rock and filled with cooled gold: the forge-god's own mark. Laid flat against it, your hand feels the heat of the volcano's heart, steady as a pulse." },
mine: { x: 0.42, z: 0.35, side: "right", name: "The Deep Seam", text: "Behind the last prop, a seam of glowing crystal runs down into the dark, too deep for any cart. Old miners' chalk beside it says only: further down, a door. The deep workings go on below the city." },
engine: { x: -0.42, z: 0.35, side: "left", name: "The Engineer's Cipher", text: "Scratched into a brass plate by the boilers is a line of numbers and dragon-letters: the engineer's cipher for the pressure that would wake the volcano. Under it someone has written, firmly: never." },
bedroom: { x: 0.42, z: -0.35, side: "right", name: "The Hidden Letter", text: "Behind a loose stone by the hearth is a letter, sealed with red wax and a dragon. It is a love letter, from the castle's lord to the one they built it for, and it ends: every hall of this is yours." }
} };
function csecKey() { var u = (typeof session !== "undefined" && session && session.user) ? session.user.id : "guest"; return "sm-castle-secrets-" + u; }
function csecFound() { try {
return JSON.parse(localStorage.getItem(csecKey()) || "{}") || {};
}
catch (e) {
return {};
} }
function csecSave(f) { try {
localStorage.setItem(csecKey(), JSON.stringify(f));
}
catch (e) { } }
function csecHere() {
if (!(typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec))
return false;
var s = INT.spec;
return !!(s.dlRooms && s.dlRooms.length && (s.psInside || INT.psSetting === "volcano"));
}
function csecRooms() { var r = ["throneroom"]; try {
r = r.concat(dlHallFloors(INT.spec));
}
catch (e) { } return r; }
function csecSpot(k, L) {
var S = CSEC.list[k];
if (!S)
return null;
var W = INT.W, D = INT.D, x, z;
if (S.side === "back") {
x = S.x * W;
z = -D / 2 + 1.3;
}
else {
x = (S.side === "left" ? -1 : 1) * (W / 2 - 1.3);
z = S.z * D;
}
return { k: k, L: L, x: x, z: z, y: L * INT.floor, S: S };
}
function csecMark(sp) { return __ZC(208, 0, this, arguments, new.target); }
function csecBuild() { return __ZC(208, 1, this, arguments, new.target); }
function csecOpen(sp) { return __ZC(208, 2, this, arguments, new.target); }
function csecTick() {
if (!csecHere()) {
if (CSEC.near) {
CSEC.near = null;
if (typeof worldPromptCity === "function")
worldPromptCity(null);
}
CSEC.int = null;
return;
}
if (CSEC.int !== INT)
csecBuild();
var P = camera.position, rp = INT.root.position, lx = P.x - rp.x, lz = P.z - rp.z, feet = P.y - 1.72, best = null, bd = 1e9;
CSEC.marks.forEach(function (s) { if (Math.abs(feet - s.y) > 2.5)
return; var d = Math.hypot(lx - s.x, lz - s.z); if (d < bd) {
bd = d;
best = s;
} });
var hit = best && bd < 3.2 ? best : null;
if (hit !== CSEC.near) {
CSEC.near = hit;
if (typeof worldPromptCity === "function") {
if (hit) {
var f = csecFound();
worldPromptCity((f[hit.k] ? "<b>" + esc(hit.S.name) + "</b> · <b>press E</b> to look again" : "Something here is not quite as it seems · <b>press E</b> to look closer"), function () { csecOpen(hit); });
}
else
worldPromptCity(null);
}
}
}
setInterval(function () { try {
csecTick();
}
catch (e) {
if (window.console && !CSEC.warned) {
CSEC.warned = 1;
console.warn("[castle secrets]", e);
}
} }, 400);
