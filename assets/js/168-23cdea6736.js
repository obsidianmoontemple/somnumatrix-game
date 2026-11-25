/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NP = { base: -320000, people: [], talkers: [], aurora: [], snow: null, smoke: [], deer: [], belt: [], bears: [], lights: [], solids: [], tick: 0 };
var FIRE = { near: null, on: null };
function fireKey(spec, i) { var k = (INT.wpKey || (spec && (spec.id || spec.name)) || "room"); return "sm.fire." + k + "." + i; }
function fireLit(key) { try {
return localStorage.getItem(key) !== "out";
}
catch (e) {
return true;
} }
function fireSet(key, lit) { try {
if (lit)
localStorage.removeItem(key);
else
localStorage.setItem(key, "out");
}
catch (e) { } }
function fireDress(f) { return __ZC(168, 0, this, arguments, new.target); }
function fireShow(f, lit) {
fireDress(f);
f.userData.fireFl.visible = lit;
f.userData.fireOld.forEach(function (c) { c.visible = lit; });
f.userData.fireAsh.visible = !lit;
f.userData.lit = lit;
}
function fireEnsureHome() { return __ZC(168, 1, this, arguments, new.target); }
function fireTick() {
var inside = typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.root && walkMode && !WLD.on;
if (!inside) {
if (FIRE.on) {
FIRE.on = null;
worldPromptCity(null);
}
return;
}
fireEnsureHome();
var P = camera.position, lv = (INT.level || 0), fy = lv * (INT.floor || 4), best = null, bd = 2.6, idx = 0;
INT.root.children.forEach(function (c) {
if (!c.userData || c.userData.furn !== "fireplace")
return;
var i = idx++;
if (c.userData.fireKey === undefined) {
c.userData.fireKey = fireKey(INT.spec, i);
fireShow(c, fireLit(c.userData.fireKey));
}
if (Math.abs(c.position.y - fy) > 1)
return;
var d = Math.hypot(P.x - (INT.ox + c.position.x), P.z - (INT.oz + c.position.z));
if (d < bd) {
bd = d;
best = c;
}
});
if (typeof nearChar !== "undefined" && nearChar)
best = null;
if (!best) {
if (FIRE.on) {
FIRE.on = null;
worldPromptCity(null);
}
return;
}
var lit = !!best.userData.lit, sig = best.uuid + (lit ? "1" : "0");
if (FIRE.on === sig)
return;
FIRE.on = sig;
if (lit)
worldPromptCity("<b>The fireplace</b> · the fire is burning · <b>press E</b> to put it out", function () { fireSet(best.userData.fireKey, false); fireShow(best, false); FIRE.on = null; if (typeof playTone === "function")
playTone(180, 0.3); setStatus("<b>The fire is out.</b> The hearth is cold and grey; a draught comes down the chimney."); });
else
worldPromptCity("<b>The fireplace</b> · cold and dark · <b>press E</b> to light it, or to examine it", function () { fireCard(best); });
}
function fireCard(f) { return __ZC(168, 2, this, arguments, new.target); }
function npDown() { return __ZC(168, 3, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
fireTick();
}
catch (e) {
if (window.console)
console.warn("fire:", e);
} };
})();
function npHeight(x, z) { return __ZC(168, 4, this, arguments, new.target); }
function npTierGeo(r, h, seed, snow) { return __ZC(168, 5, this, arguments, new.target); }
function npPineGeos() { return __ZC(168, 6, this, arguments, new.target); }
function npPines(G, L) { return __ZC(168, 7, this, arguments, new.target); }
function npBuild(G) { return __ZC(168, 8, this, arguments, new.target); }
function npStripes() { return wTex(64, 64, function (x, W, H) { x.fillStyle = "#F4F0E8"; x.fillRect(0, 0, W, H); x.fillStyle = "#C82A2A"; for (var i = -4; i < 8; i++) {
x.beginPath();
x.moveTo(i * 16, 0);
x.lineTo(i * 16 + 8, 0);
x.lineTo(i * 16 + 8 + 64, H);
x.lineTo(i * 16 + 64, H);
x.fill();
} }, [1, 3]); }
function npAuroraTex(k) { return __ZC(168, 9, this, arguments, new.target); }
function npWorkshop(G) { return __ZC(168, 10, this, arguments, new.target); }
function npListTex() { return __ZC(168, 11, this, arguments, new.target); }
function npToy(g, x, y, z, k) { return __ZC(168, 12, this, arguments, new.target); }
function npReindeer(name, red) { return __ZC(168, 13, this, arguments, new.target); }
function npStable(G) { return __ZC(168, 14, this, arguments, new.target); }
function npDeerFacts(n) { return __ZC(168, 15, this, arguments, new.target); }
function npPostOffice(G) { return __ZC(168, 16, this, arguments, new.target); }
function npLetter() { return __ZC(168, 17, this, arguments, new.target); }
function npCottage(G) { return __ZC(168, 18, this, arguments, new.target); }
function npPole(G) { return __ZC(168, 19, this, arguments, new.target); }
function npBear(s) { return __ZC(168, 20, this, arguments, new.target); }
function npFox() { return __ZC(168, 21, this, arguments, new.target); }
var NP_SITES = [[-110, -95, 26, "the Flying Paddock"], [95, -100, 14, "the Sleigh-Bell Foundry"], [-60, 130, 16, "the Toy-Testing Hall"], [20, -115, 13, "the Office of the List"],
[20, 145, 18, "the Wrapping House", 1], [-35, 165, 18, "the Moss Barn", 1], [-45, -135, 15, "the Candle-Dipper's", 1], [55, -135, 15, "the Yule Goat", 1]];
function npLW(x0, z0, ry, lx, lz) { var c = Math.cos(ry), s = Math.sin(ry); return { x: x0 + lx * c + lz * s, z: z0 - lx * s + lz * c }; }
function npPut(G, seed, o, x, z, talk, wander) {
var g = wPerson(seed, o);
g.position.set(x, npHeight(x, z) + (o.y || 0), z);
g.rotation.y = o.rot || 0;
G.add(g);
var P = { g: g, wander: wander, elf: !!o.elf };
NP.people.push(P);
if (talk)
NP.talkers.push({ p: P, r: o.elf ? 2.6 : 3.6, name: talk.name, t: talk });
return P;
}
var NP_ELF = function (i, rot) { return { child: true, elf: 1, sex: i % 2 ? "f" : "m", rot: rot || 0, look: { top: [0x2A8A3A, 0xC82A2A, 0x2A5AA8][i % 3], topKind: "shirt", bottom: [0xC82A2A, 0x2A8A3A][i % 2], shoes: 0x3A2A1A, hat: "beanie", hatColor: [0xC82A2A, 0x2A8A3A][i % 2] } }; };
var NP_KIDS = " Keep it merry, gentle and suitable for small children; never ask for anyone's full name, address or school, and never promise a particular present.";
function npPaddock(G) { return __ZC(168, 22, this, arguments, new.target); }
function npFoundry(G) { return __ZC(168, 23, this, arguments, new.target); }
function npTestHall(G) { return __ZC(168, 24, this, arguments, new.target); }
function npListOffice(G) { return __ZC(168, 25, this, arguments, new.target); }
function npWrapping(G) { return __ZC(168, 26, this, arguments, new.target); }
function npMossBarn(G) { return __ZC(168, 27, this, arguments, new.target); }
function npCandles(G) { return __ZC(168, 28, this, arguments, new.target); }
function npYuleGoat(G) { return __ZC(168, 29, this, arguments, new.target); }
function npPeople(G) { return __ZC(168, 30, this, arguments, new.target); }
worldDef("northpole", {
base: NP.base, far: 4000, ownSky: true, tone: 1047, bound: 780,
env: { top: 0x0A1A3A, low: 0x3A5A8A, fog: 0x2A4060, fogD: 0.0022, sun: 0.35, sunCol: 0xB8C8FF, sunDir: [-0.3, 0.25, -0.6], hemi: 0.9, hemiCol: 0xC8D8FF, hemiGround: 0x8A9AB8, stars: 0.9 },
build: function (G) { npBuild(G); npPeople(G); },
enter: function (opt) { return __ZC(168, 31, this, arguments, new.target); },
leave: function () { },
ground: function (x, z) { return npHeight(x, z); },
block: function (x, z, feet) { return worldSolidAt(NP.solids, x, z, feet); },
tick: function (dt) { npTick(dt); },
back: function () { npHome(); }
});
function npHome() { worldHome("<b>Whoosh, up the chimney!</b> You come down again by the door you went in at, with a little snow on your shoulders. (The fire is still out; it's up to you whether to light it.)"); }
function npTick(dt) { return __ZC(168, 32, this, arguments, new.target); }
