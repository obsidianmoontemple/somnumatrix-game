/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var UD = { base: -300000, door: null, open: false, opening: 0, people: [], talkers: [], spiders: [], shrooms: [], glows: [], water: null, solids: [], told: {}, ferry: null, R: 560, C: { x: 0, z: -700 } };
try {
UD.open = localStorage.getItem("sm.ud.door") === "1";
}
catch (e) { }
var UD_LAKE = { x: -230, z: -860, r: 150 }, UD_CITY = { x: 200, z: -800 }, UD_GLIM = { x: 960, z: -700, r: 170 }, UD_SEA_X = 1160;
function udCaveR(a) { return UD.R * (0.86 + 0.22 * wFbm(Math.cos(a) * 1.3 + 3, Math.sin(a) * 1.3, 41, 3)); }
function udHeight(x, z) { return __ZC(167, 0, this, arguments, new.target); }
var UD_LAKE_Y = -64.5, UD_SEA_Y = -83;
var UD_STEPS = 180;
var UD_CG = { n: 140, s: 10, h: null };
function udCaveCorner(i, j) {
var G = UD_CG, k = i * (G.n + 1) + j;
if (!G.h) {
G.h = new Float32Array((G.n + 1) * (G.n + 1));
G.h.fill(NaN);
}
var v = G.h[k];
if (v !== v) {
v = G.h[k] = udCaveH(UD.C.x - G.n * G.s / 2 + i * G.s, UD.C.z - G.n * G.s / 2 + j * G.s);
}
return v;
}
function udCaveMeshH(x, z) { return __ZC(167, 1, this, arguments, new.target); }
function udGlimH(x, z) { return -80 + (wFbm(x * 0.03, z * 0.03, 9, 2) - 0.5) * 2; }
function udStairTop(z) { var k = Math.round(Math.max(0, Math.min(1, (-125 - z) / 110)) * (UD_STEPS - 1)); return -60 * k / (UD_STEPS - 1); }
var UD_FLAT = [[0, -236, 0, 30], [0, -1040, 22, 45], [0, -1110, 14, 40], [-150, -340, 40, 60]];
function udFlatK(x, z) { var k = 1; for (var i = 0; i < UD_FLAT.length; i++) {
var f = UD_FLAT[i], d = Math.hypot(x - f[0], z - f[1]);
if (d < f[3])
k = Math.min(k, Math.max(0, (d - f[2]) / (f[3] - f[2])));
} return k; }
function udCaveH(x, z) {
var h = -60 + (wFbm(x * 0.01, z * 0.01, 5, 3) - 0.5) * 6 * udFlatK(x, z);
var ld = Math.hypot(x - UD_LAKE.x, z - UD_LAKE.z);
if (ld < UD_LAKE.r + 30)
h = Math.min(h, -60 - 8 * Math.max(0, 1 - ld / (UD_LAKE.r + 30)) * 1.6);
return h;
}
function udPassage(geo, col, open) { var m = new THREE.MeshLambertMaterial({ color: col, side: THREE.BackSide, flatShading: true }), none = new THREE.MeshBasicMaterial({ visible: false }); return new THREE.Mesh(geo, [0, 1, 2, 3, 4, 5].map(function (i) { return open.indexOf(i) >= 0 ? none : m; })); }
function udRock(c) { return new THREE.MeshLambertMaterial({ color: c, flatShading: true }); }
function udBuild(G) { return __ZC(167, 2, this, arguments, new.target); }
function udFact(G, x, z, title, rows, rot) { return __ZC(167, 3, this, arguments, new.target); }
function udFungusForest(G, R) { return __ZC(167, 4, this, arguments, new.target); }
function udSpider(s) { return __ZC(167, 5, this, arguments, new.target); }
function udCity(G, R) { return __ZC(167, 6, this, arguments, new.target); }
function udGlimmerdeep(G, R) { return __ZC(167, 7, this, arguments, new.target); }
var UD_SPOTS = { farm: { x: -150, z: -340, r: 34 }, falls: { x: 330, z: -430, r: 30 }, grotto: { x: 420, z: -560, r: 30 }, rift: { x0: -140, x1: 140, z0: -1050, z1: -1030 }, ruins: { x: 0, z: -1110, r: 46 },
market: { x: 95, z: -470, r: 30 }, landing: { x: -232, z: -992, r: 22 }, forge: { x: 340, z: -990, r: 30 }, hollow: { x: -505, z: -690, r: 34 } };
function udClearAt(x, z) {
var S = UD_SPOTS, r = S.rift;
if (x > r.x0 - 6 && x < r.x1 + 6 && z > r.z0 - 6 && z < r.z1 + 6)
return true;
return ["farm", "falls", "grotto", "ruins", "market", "landing", "forge", "hollow"].some(function (k) { var s = S[k]; return Math.hypot(x - s.x, z - s.z) < s.r; });
}
function udNewWhere(x, z) { return __ZC(167, 8, this, arguments, new.target); }
function udRiftAt(x, z) { var r = UD_SPOTS.rift; return x > r.x0 - 0.3 && x < r.x1 + 0.3 && z > r.z0 - 0.3 && z < r.z1 + 0.3 && Math.abs(x) > 1.5; }
function udPut(G, seed, o, x, z, talk, wander, ry) {
var y = udHeight(x, z), g = wPerson(seed, o);
g.position.set(x, y < -900 ? -60 : y, z);
g.rotation.y = ry || 0;
G.add(g);
var P = { g: g, wander: wander };
UD.people.push(P);
if (talk)
UD.talkers.push({ p: P, r: o.scale && o.scale < 0.8 ? 3.5 : 4, name: talk.name, t: talk });
return P;
}
function udTop(x, z, r) { var m = -1e9; for (var a = 0; a < 6.28; a += 0.7)
for (var d = 0; d <= r; d += r / 2) {
m = Math.max(m, udHeight(x + Math.cos(a) * d, z + Math.sin(a) * d));
} return m; }
var UD_ELF = function (top, f, o) { return { top: top, topKind: f ? "dress" : "robe", bottom: top, skin: [0x4A4660, 0x3E3A52, 0x55506A][(o || 0) % 3], hair: 0xEDEAF4, hairStyle: "long", shoes: 0x1A1820, hat: "none", layer: "cloak", layerColor: 0x1A1424 }; };
var UD_GNOME = function (c) { return { top: c, topKind: "shirt", bottom: 0x4A4038, skin: 0x8A8478, hair: 0x5A5450, hairStyle: "bald", beard: 1, hat: "none", layer: "apron", layerColor: 0x6A5040 }; };
var UD_SETTING = " (SomnuMatrix's own deep world under the mine, its places and peoples all original: Zhaelvorn, City of Spires, the dark elves' city carved in the stalagmites; Glimmerdeep, the deep gnomes' gem-cutting town; the Darklake; the fungus forest; the Sunless Sea). Keep it courteous, characterful and suitable for all ages.";
function udFarm(G) { return __ZC(167, 9, this, arguments, new.target); }
function udFalls(G) { return __ZC(167, 10, this, arguments, new.target); }
function udGrotto(G) { return __ZC(167, 11, this, arguments, new.target); }
function udRift(G) { return __ZC(167, 12, this, arguments, new.target); }
function udRuins(G) { return __ZC(167, 13, this, arguments, new.target); }
function udLW(x0, z0, ry, lx, lz) { var c = Math.cos(ry), s = Math.sin(ry); return { x: x0 + lx * c + lz * s, z: z0 - lx * s + lz * c }; }
function udMarket(G) { return __ZC(167, 14, this, arguments, new.target); }
var UD_JETTY = { x: -230, z0: -986, z1: -946, w: 1.6, y: -63.6 };
function udJettyAt(x, z) { var J = UD_JETTY; return Math.abs(x - J.x) < J.w && z > J.z0 && z < J.z1 ? J.y : null; }
function udJetty(G) { return __ZC(167, 15, this, arguments, new.target); }
function udForge(G) { return __ZC(167, 16, this, arguments, new.target); }
function udHermit(G) { return __ZC(167, 17, this, arguments, new.target); }
worldDef("underdark", {
base: UD.base, far: 3200, ownSky: true, tone: 220, bound: 5000,
env: { top: 0x050408, low: 0x07060A, fog: 0x0A0810, fogD: 0.0018, sun: 0.14, sunCol: 0x8A7AB8, sunDir: [0.2, 1, 0.1], hemi: 0.5, hemiCol: 0x6A60A0, hemiGround: 0x1A1620, stars: 0 },
build: function (G) { udBuild(G); },
enter: function (opt) {
camera.position.set(UD.base, 1.72, 4);
yaw = 0;
pitch = 0;
if (UD.open && UD.door) {
UD.door.position.y = -7.2;
}
setStatus("<b>The Deep Workings.</b> The cage rattles to a stop far below the mine. A tunnel runs on ahead, lit by old lamps. (Back, or E at the cage, takes you up again.)");
},
leave: function () { },
ground: function (x, z) { var j = udJettyAt(x, z); if (j !== null)
return j; var h = udHeight(x, z); return h < -900 ? -60 : h; },
block: function (x, z, feet) { return __ZC(167, 18, this, arguments, new.target); },
tick: function (dt) { udTick(dt); },
back: function () { worldHome("<b>Back up the shaft.</b> The cage clanks up into daylight, and the miners don't ask where you've been."); }
});
function udTick(dt) { return __ZC(167, 19, this, arguments, new.target); }
function udExamine() { return __ZC(167, 20, this, arguments, new.target); }
function udMineHere() {
if (typeof store === "undefined" || !store.inside || typeof INT === "undefined" || !INT || !INT.root)
return false;
var sp = INT.spec || {};
return sp.archetype === "mineshaft" || (INT.wpKey && /mine head/i.test(INT.wpKey));
}
var UDCAGE = { on: null };
function udMineRoom() { return __ZC(167, 21, this, arguments, new.target); }
function udCageTick() {
if (WLD.on || !udMineHere() || (INT.level || 0) !== 0) {
if (UDCAGE.on) {
UDCAGE.on = null;
worldPromptCity(null);
}
return;
}
if (!INT.udCage) {
var g = new THREE.Group(), iron = wM(0x3A3A3E), z = -INT.D / 2 + 1.5, x = INT.W / 2 - 1.8;
for (var i = 0; i < 4; i++) {
wBox(0.08, 2.6, 0.08, iron, (i % 2 ? 0.9 : -0.9), 1.3, (i < 2 ? 0.9 : -0.9), g);
}
for (var b = 0; b < 7; b++) {
wBox(0.03, 2.4, 0.03, iron, -0.9 + b * 0.3, 1.3, 0.9, g);
}
wBox(1.9, 0.1, 1.9, wM(0x5A4A3A), 0, 0.05, 0, g);
wBox(1.9, 0.1, 1.9, iron, 0, 2.6, 0, g);
var ch = wCyl(0.04, 0.04, 4, iron, 0, 4.6, 0, g, 4);
var dk = wMesh(new THREE.PlaneGeometry(1.7, 1.7), wB(0x050404), 0, 0.11, 0, g);
dk.rotation.x = -Math.PI / 2;
var sg = wSign(["The cage", "Down to the workings"], 1.2, 0.5, "#2A2018", "#E8D8A8");
sg.position.set(0, 2.95, 0.96);
g.add(sg);
g.position.set(x, 0, z);
INT.root.add(g);
INT.udCage = { x: x, z: z };
if ((INT.spec || {}).archetype === "mineshaft")
udMineRoom();
}
var P = camera.position, c = INT.udCage, d = Math.hypot(P.x - (INT.ox + c.x), P.z - (INT.oz + c.z));
if (d < 2.4) {
if (!UDCAGE.on) {
UDCAGE.on = 1;
worldPromptCity("<b>The cage</b> · <b>press E</b> to go down to the deep workings", function () { UDCAGE.on = null; worldPromptCity(null); if (typeof playTone === "function")
playTone(90, 1.2); worldGo("underdark"); });
}
}
else if (UDCAGE.on) {
UDCAGE.on = null;
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
udCageTick();
}
catch (e) {
if (window.console)
console.warn("cage:", e);
} };
})();
