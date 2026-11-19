/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EVC = { fair: null, stage: null, hall: null, q: [], t: 0, warned: false };
var EVC_N = { pc: { wander: 16, knots: 3, show: 9, story: 8, stage: 22, hall: 30 }, lite: { wander: 6, knots: 1, show: 4, story: 4, stage: 8, hall: 10 } };
function evcLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof scpLite === "function" && scpLite()); }
function evcN(k) { return (evcLite() ? EVC_N.lite : EVC_N.pc)[k]; }
function evcHash(s) { s = String(s); var h = 2166136261; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function evcLook(seed, o) { return __ZC(417, 0, this, arguments, new.target); }
function evcFig(seed, o) { return __ZC(417, 1, this, arguments, new.target); }
function evcBake(g) { return typeof scpBake === "function" && !g.userData.evcNoBake ? scpBake(g) : g; }
function evcDrop(C) {
if (!C)
return;
EVC.q = EVC.q.filter(function (j) { return j.C !== C; });
if (typeof scpDrop === "function")
scpDrop(C.g);
else if (C.g.parent)
C.g.parent.remove(C.g);
}
function evcAway(C) { if (C && C.g.parent)
C.g.parent.remove(C.g); }
function evcBack(C, parent) { if (C && C.g.parent !== parent) {
if (C.g.parent)
C.g.parent.remove(C.g);
parent.add(C.g);
} }
function evcShown(C) { return !!(C && C.g.parent); }
function evcQueue(C, seed, o, place) { EVC.q.push({ C: C, seed: seed, o: o, place: place }); }
function evcWork() {
var n = evcLite() ? 1 : 3;
for (var qi = 0; qi < EVC.q.length && n > 0;) {
var j = EVC.q[qi];
if (!j.C.g.parent) {
qi++;
continue;
}
EVC.q.splice(qi, 1);
n--;
try {
var g = evcFig(j.seed, j.o);
j.place(g);
j.C.g.add(g);
if (g.userData.evcAct !== "sit")
evcBake(g);
else {
g.updateMatrixWorld(true);
evcBake(g);
}
j.C.figs.push(g);
}
catch (e) {
if (!EVC.warned) {
EVC.warned = true;
if (window.console)
console.warn("event crowd:", e);
}
}
}
}
function evcSit(g, x, z, y, h, face) { return __ZC(417, 2, this, arguments, new.target); }
function evcStand(g, x, y, z, face) { g.position.set(x, y, z); g.rotation.y = face; g.userData.evcHome = { x: x, y: y, z: z, ry: face }; }
var EVC_STALL_WHO = {
hunt: ["the Lantern Keeper at the Samhain Fair, minding the stall for the Great Lantern Hunt: thirteen lost lanterns hidden round the city every day", "asking the Lantern Keeper where the lost lanterns might be hidden today, for the Great Lantern Hunt"],
toss: ["the stallholder at the Pumpkin Toss, handing out hoops to throw over the pumpkins", "playing the Pumpkin Toss at the Samhain Fair, throwing hoops at the pumpkins"],
cauldron: ["the witch who keeps the Witches' Cauldron stall, where people stir in the ingredients from Macbeth's brew", "stirring the Witches' Cauldron at the Samhain Fair, putting in eye of newt and toe of frog"],
fortune: ["the fortune teller in the Fortune Booth, telling the old Halloween fortunes from Burns' poem: kail stocks, nuts on the fire, the apple peel", "having your Halloween fortune told at the Fortune Booth"],
story: ["the storyteller at the Storyteller's Fire, telling old ghost stories: Stingy Jack, Sleepy Hollow, the Monkey's Paw", "sitting by the Storyteller's Fire at the Samhain Fair, listening to a ghost story"],
show: ["the showman who runs the Phantasmagoria, the ghost show of 1798 with smoke and a magic lantern", "watching the Phantasmagoria, the old ghost show, at the Samhain Fair"]
};
var EVC_WANDER_WHO = "at the Samhain Fair in the Tower Plaza tonight, in costume, going from stall to stall (the Pumpkin Toss, the Witches' Cauldron, the Fortune Booth, the Storyteller's Fire, the ghost show) and looking at the Great Jack";
function evcLocal(S, lx, lz) { var c = Math.cos(S.rot), s = Math.sin(S.rot); return { x: S.x + lx * c + lz * s, z: S.z - lx * s + lz * c }; }
function evcFairKey(F) { return F.stalls.map(function (S) { return S.k + Math.round(S.x) + "," + Math.round(S.z); }).join("|"); }
function evcFairBuild() { return __ZC(417, 3, this, arguments, new.target); }
function evcStageBuild() { return __ZC(417, 4, this, arguments, new.target); }
function evcHallBuild() { return __ZC(417, 5, this, arguments, new.target); }
function evcAnim(C, t, clap) { return __ZC(417, 6, this, arguments, new.target); }
function evcWalkTick(C, dt, t) { return __ZC(417, 7, this, arguments, new.target); }
function evcHoopTick(C, t) { return __ZC(417, 8, this, arguments, new.target); }
function evcCityTick(dt) {
var t = performance.now() / 1000, P = camera.position;
var F = typeof SHC !== "undefined" ? SHC.fair : null, nearFair = false;
if (F && F.stalls && F.stalls.length) {
var J = typeof shcJackSpot === "function" ? shcJackSpot() : F.stalls[0];
nearFair = Math.hypot(P.x - J.x, P.z - J.z) < 260;
}
if (F && nearFair) {
if (EVC.fair && EVC.fair.key !== evcFairKey(F)) {
evcDrop(EVC.fair);
EVC.fair = null;
}
if (!EVC.fair)
evcFairBuild();
else {
EVC.fair.src = F;
evcBack(EVC.fair, scene);
}
}
else
evcAway(EVC.fair);
var ST = typeof SCP !== "undefined" ? SCP.stage : null, nearStage = false;
if (ST && ST.spot && ST.g.parent)
nearStage = Math.hypot(P.x - ST.spot.x, P.z - ST.spot.z) < 220;
if (nearStage) {
var sk = Math.round(ST.spot.x) + "," + Math.round(ST.spot.z);
if (EVC.stage && EVC.stage.key !== sk) {
evcDrop(EVC.stage);
EVC.stage = null;
}
if (!EVC.stage)
evcStageBuild();
else {
EVC.stage.src = ST;
evcBack(EVC.stage, ST.g);
}
}
else
evcAway(EVC.stage);
evcWork();
var ph = typeof scpPhase === "function" ? scpPhase() : "";
if (evcShown(EVC.fair)) {
evcAnim(EVC.fair, t, false);
evcWalkTick(EVC.fair, dt, t);
evcHoopTick(EVC.fair, t);
}
if (evcShown(EVC.stage))
evcAnim(EVC.stage, t, ph === "catwalk" || ph === "crowned");
}
function evcHallTick() { return __ZC(417, 9, this, arguments, new.target); }
function evcStats() { return __ZC(417, 10, this, arguments, new.target); }
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
evcCityTick(dt || 0.016);
}
catch (e) {
if (!EVC.warned) {
EVC.warned = true;
if (window.console)
console.warn("event crowd:", e);
}
} };
}
if (typeof scpDrop === "function") {
var sd = scpDrop;
scpDrop = function (G) { try {
if (EVC.stage && G && EVC.stage.g.parent === G && G !== EVC.stage.g)
G.remove(EVC.stage.g);
}
catch (e) { } return sd.apply(this, arguments); };
}
if (typeof otmSpTick === "function") {
var ot = otmSpTick;
otmSpTick = function (dt) { var r = ot.apply(this, arguments); try {
evcHallTick();
}
catch (e) {
if (!EVC.warned) {
EVC.warned = true;
if (window.console)
console.warn("event crowd:", e);
}
} return r; };
}
})();
