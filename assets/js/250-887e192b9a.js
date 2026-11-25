/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var RACE = { on: false, trk: null, g: null, bar: null, lamps: null, riv: [], t: 0, phase: null, cp: 0, car: null, best: null, board: null, boardAt: 0, card: 0, said: 0, bump: 0, missing: false };
var RACE_CP = 6, RACE_MAX_S = 240, RACE_SIGN = 19;
function raceTrack() {
if (RACE.trk)
return RACE.trk;
if (typeof ATL_STREETS === "undefined" || !ATLC || typeof ATL_STAIRS === "undefined")
return null;
var rs = ATL_STREETS.warrens && ATL_STREETS.warrens[0];
if (!rs)
return null;
var main = ATL_STAIRS.filter(function (s) { return s.main; }).slice().sort(function (p, q) { return p.a - q.a; });
if (main.length < 3)
return null;
var s1 = main[1], s2 = main[2], a0 = s1.a + (s1.half + 40) / rs, a1 = s2.a - (s2.half + 40) / rs;
if (a1 < a0)
a1 += Math.PI * 2;
RACE.trk = { rs: rs, a0: a0, a1: a1, len: (a1 - a0) * rs, cps: [] };
for (var i = 1; i <= RACE_CP; i++)
RACE.trk.cps.push(a0 + (a1 - a0) * i / (RACE_CP + 1));
return RACE.trk;
}
function raceXZ(a, r) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
function racePolar(x, z) { return { r: Math.hypot(x - ATLC.x, z - ATLC.z), a: Math.atan2(z - ATLC.z, x - ATLC.x) }; }
function raceAlong(a) { var T = RACE.trk; var d = a - T.a0; d = ((d + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; return d; }
function raceFmt(ms) { var s = ms / 1000, m = Math.floor(s / 60); return m + ":" + (s - m * 60 < 10 ? "0" : "") + (s - m * 60).toFixed(1); }
function raceTex(lines, bg, fg, w, h) { return __ZC(250, 0, this, arguments, new.target); }
function raceChecker() {
var c = document.createElement("canvas");
c.width = 256;
c.height = 64;
var x = c.getContext("2d");
for (var i = 0; i < 16; i++)
for (var j = 0; j < 4; j++) {
x.fillStyle = (i + j) % 2 ? "#141414" : "#F2F2EE";
x.fillRect(i * 16, j * 16, 16, 16);
}
return new THREE.CanvasTexture(c);
}
function raceGantry(a, word, lamps) { return __ZC(250, 1, this, arguments, new.target); }
function raceBuild() { return __ZC(250, 2, this, arguments, new.target); }
var RACE_MAST_GAP = 45;
function raceLights() { return __ZC(250, 3, this, arguments, new.target); }
function raceLightsTick(dt) {
var L = RACE.lit;
if (!L)
return;
L.at -= dt;
if (L.at > 0)
return;
L.at = 0.5;
var n = (typeof careInCity === "function" && careInCity() && typeof nightGlowIsNight === "function") ? nightGlowIsNight() : 0;
if (Math.abs(n - L.n) < 0.01)
return;
L.n = n;
L.head.material = n > 0.05 ? L.headOn : L.headOff;
L.flare.material = n > 0.05 ? L.flareOn : L.flareOff;
L.pool.opacity = 0.3 * n;
L.ring.opacity = 0.32 * n;
L.bar.color.setHex(n > 0.05 ? 0xFFF1D0 : 0x3A3830);
L.pool.visible = L.ring.visible = n > 0.02;
}
function raceBarriers(on) { return __ZC(250, 4, this, arguments, new.target); }
function raceNight() { return (typeof amKeeper === "function" && amKeeper()) || !(typeof isNightHour === "function" && typeof cityHourNow === "function") || isNightHour(cityHourNow()); }
function raceDayWords() { return "The club races at night only, from 20:30 to 05:30 city time" + (typeof cityHourNow === "function" && typeof hm === "function" ? " (it is " + hm(cityHourNow()) + " now)" : "") + "."; }
function raceLicensed() { return (typeof amKeeper === "function" && amKeeper()) || (typeof hasLicence === "function" && hasLicence("driving")); }
function raceOpen() { return __ZC(250, 5, this, arguments, new.target); }
function raceBest() { try {
return +localStorage.getItem("somnu.raceBest.warrens") || null;
}
catch (e) {
return null;
} }
function raceBoardLoad() { return __ZC(250, 6, this, arguments, new.target); }
function raceStart(own, heat) { return __ZC(250, 7, this, arguments, new.target); }
function raceRivals() { return __ZC(250, 8, this, arguments, new.target); }
function raceRivalsClear() { RACE.riv.forEach(function (R) { scene.remove(R.g); }); RACE.riv = []; }
function raceRivalsPlace() { RACE.riv.forEach(function (R) { var p = raceXZ(R.a, R.r); R.g.position.set(p.x, terrainY(p.x, p.z), p.z); R.g.rotation.y = Math.atan2(-Math.sin(R.a), Math.cos(R.a)); }); }
function srTick(dt) {
if (!RACE.g) {
if (typeof careInCity === "function" && careInCity() && raceTrack() && (typeof RMAP === "undefined" || RMAP.list)) {
var P0 = camera.position, q0 = racePolar(P0.x, P0.z);
if (Math.abs(q0.r - RACE.trk.rs) < 300)
raceBuild();
}
}
raceLightsTick(dt);
racePatrolsTick(dt);
if (!RACE.on) {
raceInvite();
return;
}
var T = RACE.trk, D = DRIVE, P = camera.position;
if (!D.on) {
raceEnd(null, RACE.raid && RACE.raid.warned && !RACE.raid.came ? "You left the car and walked off before the Dragon Corp got there." : "You left the car: the race is off.");
return;
}
if (RACE.live) {
if (rliveTick(dt) === false)
return;
}
else
RACE.t += dt;
if (RACE.phase === "grid") {
D.v = 0;
return;
}
if (RACE.phase === "lights") {
D.v = 0;
var n = Math.floor(RACE.t);
(RACE.lamps || []).forEach(function (m, i) { m.material.color.setHex(i < n ? 0xE02020 : 0x2A1A1A); });
if (RACE.t >= 4) {
(RACE.lamps || []).forEach(function (m) { m.material.color.setHex(0x20D040); });
RACE.phase = "go";
RACE.t = RACE.live ? rliveClock() : 0;
setStatus("<b>Green: go!</b>");
}
return;
}
var q = racePolar(P.x, P.z), al = raceAlong(q.a);
RACE.riv.forEach(function (R) {
if (R.done !== null)
return;
R.v = Math.min(R.top, R.v + dt * 4.6);
R.a += R.v * dt / R.r;
if (raceAlong(R.a) * T.rs >= T.len) {
R.done = RACE.t;
}
});
raceRivalsPlace();
RACE.bump -= dt;
if (RACE.bump <= 0)
RACE.riv.forEach(function (R) {
var dx = R.g.position.x - P.x, dz = R.g.position.z - P.z;
if (Math.hypot(dx, dz) < 2.4) {
RACE.bump = 2;
var rel = Math.abs(D.v - R.v);
R.v *= 0.6;
D.v *= 0.6;
if (rel > 1.5 && typeof trfCrash === "function")
try {
trfCrash({ k: "v", v: rel, x: P.x + dx / 2, z: P.z + dz / 2, h: D.h, s: { arch: R.arch, kind: "vehicle" } });
}
catch (e) { }
}
});
if (raceRaidTick(dt, q, al) === false)
return;
if (RACE.cp < T.cps.length) {
var ca = T.cps[RACE.cp];
if (raceAlong(q.a) >= raceAlong(ca)) {
if (Math.abs(q.r - T.rs) < 9) {
RACE.cp++;
}
else {
raceEnd(null, "You missed checkpoint " + (RACE.cp + 1) + ": the time does not count.");
return;
}
}
}
if (Math.abs(q.r - T.rs) > 25 || al < -60 / T.rs || RACE.t > RACE_MAX_S) {
raceEnd(null, RACE.t > RACE_MAX_S ? "Out of time." : RACE.raid && RACE.raid.warned ? "You scattered when the scout called it. The Dragon Corp finds an empty street." : "Off the course: the race is off.");
return;
}
if (al * T.rs >= T.len && RACE.cp >= T.cps.length) {
raceEnd(RACE.t, null);
return;
}
RACE.said -= dt;
if (RACE.said <= 0) {
RACE.said = 0.5;
var place = RACE.live ? rlivePlace(al * T.rs) : 1 + RACE.riv.filter(function (R) { return R.done !== null || raceAlong(R.a) > al; }).length, of = RACE.live ? RACE.live.racers.length : 4;
setStatus("<b>" + (RACE.live ? "Live heat" : "Racing") + "</b> · " + raceFmt(RACE.t * 1000) + " · " + place + (place === 1 ? "st" : place === 2 ? "nd" : place === 3 ? "rd" : "th") + " of " + of + " · checkpoint " + RACE.cp + " of " + T.cps.length + " · " + Math.round(Math.max(0, T.len - al * T.rs)) + " m to go");
}
}
var RACE_RAID_CHANCE = 0.2, RACE_SCOUT_CHANCE = 0.8, RACE_SCOUT_LEAD = 9;
function raceRaidTick(dt, q, al) { return __ZC(250, 9, this, arguments, new.target); }
function racePatrols(al) { return __ZC(250, 10, this, arguments, new.target); }
function racePatrolsClear() { (RACE.patrols || []).forEach(function (p) { scene.remove(p.g); }); RACE.patrols = null; }
function racePatrolsTick(dt) {
var P = RACE.patrols;
if (!P)
return;
RACE.patrolT += dt;
if (RACE.patrolT > 24) {
racePatrolsClear();
return;
}
var ph = Math.floor(RACE.patrolT / 0.75) % 2;
P.forEach(function (p) {
if (RACE.patrolT < 14)
p.a -= 16 * dt / p.r;
var q = raceXZ(p.a, p.r);
p.g.position.set(q.x, terrainY(q.x, q.z), q.z);
p.g.rotation.y = Math.atan2(-Math.sin(p.a), Math.cos(p.a)) + Math.PI;
p.lr.material = ph ? p.dim : p.red;
p.lb.material = ph ? p.blue : p.dim;
});
}
function raceEnd(secs, why) { return __ZC(250, 11, this, arguments, new.target); }
function raceInvite() {
var T = RACE.trk;
if (!T || !RACE.g)
return;
var P = camera.position, D = typeof DRIVE !== "undefined" ? DRIVE : null;
if (D && D.on && D.mode === "road" && raceNight() && Math.abs(D.v) < 0.4 && !(typeof TGL !== "undefined" && TGL.auto) && Date.now() - RACE.card > 25000) {
var g = raceXZ(T.a0 - 5 / T.rs, T.rs);
if (Math.hypot(P.x - g.x, P.z - g.z) < 18) {
RACE.card = Date.now();
worldCard(worldFacts("The steward", "Warrens Street Racing Club", [["Course", Math.round(T.len) + " m, six checkpoints"], ["Your best", raceBest() ? raceFmt(raceBest()) : "no time yet"]], ["Not legal: the Dragon Corp raids now and then. Scatter when the scout calls it."]) +
worldBtn("live", "Race other players", "Join the live heat in this car") + worldBtn("go", "Race the club's three rivals", "In this car"), { go: function () { worldCard(null); raceStart(true); }, live: function () { worldCard(null); rliveJoin(true); } });
}
}
}
var RACE_NAME = "Warrens Street Racing Club";
function raceSignSpot() { if (RACE.sign)
return RACE.sign; var T = raceTrack(); return T ? raceXZ(T.a0 - RACE_SIGN / T.rs, T.rs + 9.5) : null; }
function raceInFinder() {
if (typeof pfindPlaces === "function") {
var pf = pfindPlaces;
pfindPlaces = function () {
var L = pf.apply(this, arguments);
try {
if (typeof careInCity === "function" && careInCity() && !(typeof WLD !== "undefined" && WLD.on) && !L.some(function (p) { return p.name === RACE_NAME; })) {
var S = raceSignSpot(), P = camera.position;
if (S) {
var dx = S.x - P.x, dz = S.z - P.z;
L.push({ name: RACE_NAME, x: S.x, z: S.z, d: Math.hypot(dx, dz), b: bearingOf(dx, dz), kind: "street racing at night (20:30 to 05:30): races, racers and the club's board, on the Warrens' street" });
L.sort(function (a, b) { return a.d - b.d; });
}
}
}
catch (e) { }
return L;
};
}
}
if (document.readyState === "complete")
raceInFinder();
else
window.addEventListener("load", raceInFinder);
(function () {
if (typeof tsTick === "function") {
var tt = tsTick;
tsTick = function () {
try {
if (RACE.sign && !RACE.on && !(typeof DRIVE !== "undefined" && DRIVE.on) && !(typeof INT !== "undefined" && INT) && typeof tsPrompt === "function") {
var P = camera.position;
if (Math.hypot(P.x - RACE.sign.x, P.z - RACE.sign.z) < 6) {
tsPrompt("<b>Warrens Street Racing Club</b> · <b>press E</b> (or tap here) " + (raceNight() ? "to race and see the board" : "to see the board · races at night, 20:30 to 05:30"), raceOpen);
return;
}
}
}
catch (e) { }
return tt.apply(this, arguments);
};
}
if (typeof transitTick === "function") {
var tr = transitTick;
transitTick = function (dt) { tr(dt); try {
srTick(dt);
}
catch (e) {
if (window.console)
console.warn("racing:", e);
} };
}
["trfOffence", "licenceOffence"].forEach(function (n) {
if (typeof window[n] !== "function")
return;
var f = window[n];
window[n] = function () { if (RACE.on && RACE.phase === "go")
return Promise.resolve(null); return f.apply(this, arguments); };
});
if (typeof trafficTick === "function") {
var tk = trafficTick;
trafficTick = function (dt) {
tk(dt);
if (!RACE.on || !RACE.trk)
return;
var T = RACE.trk;
for (var i = 0; i < TRAFFIC.length; i++) {
var t = TRAFFIC[i];
if (!t.g || Math.abs(t.r - T.rs) > 8)
continue;
var al = raceAlong(t.a);
if (al > -40 / T.rs && al * T.rs < T.len + 40)
t.g.visible = false;
}
};
}
})();
