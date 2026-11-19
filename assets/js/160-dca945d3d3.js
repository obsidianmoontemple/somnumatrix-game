/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SP = { base: -200000, bodies: {}, tex: {}, ships: [], aliens: [], stations: {}, pos: null, vel: null, auto: null, speed: 0, heat: 0, near: null, ship: null, stars: null,
beltRot: 0, encAt: 90, enc: null, msg: null, bar: null, flash: 0, lastBody: null, landed: null };
var SP_CRUISE = 70, SP_BOOST = 650, SP_WARP = 2600;
function spPaint(k) { return __ZC(160, 0, this, arguments, new.target); }
function spRingTex() { return __ZC(160, 1, this, arguments, new.target); }
function spRing(rin, rout, op, tex) { return __ZC(160, 2, this, arguments, new.target); }
function spBodyPos(k, out) {
var b = SP_BY[k], o = out || new THREE.Vector3();
if (!b)
return o.set(0, 0, 0);
var a = b.ang + (b.parent ? WLD.t * 0.02 : 0);
o.set(Math.cos(a) * b.orbit, b.y, Math.sin(a) * b.orbit);
if (b.parent) {
var p = spBodyPos(b.parent);
o.add(p);
}
return o;
}
function spBuild(G) { return __ZC(160, 3, this, arguments, new.target); }
function spCutter(hull, trim) { return __ZC(160, 4, this, arguments, new.target); }
function spStation(G, k, name, host, off, col) { return __ZC(160, 5, this, arguments, new.target); }
function spAlienStation(G) { return __ZC(160, 6, this, arguments, new.target); }
function spFarGate(G) { return __ZC(160, 7, this, arguments, new.target); }
worldDef("space", {
base: SP.base, far: 42000, ownSky: true, tone: 440, hideMe: true,
env: { top: 0x000000, low: 0x000000, fogD: 0.0000001, sun: 0.0, hemi: 0.22, hemiCol: 0x6A7AA8, hemiGround: 0x101018, stars: 0 },
build: function (G) { spBuild(G); },
enter: function (opt) { return __ZC(160, 8, this, arguments, new.target); },
leave: function () { spBar(false); SP.auto = null; if (SP.enc && SP.enc.g) {
SP.enc.g.visible = false;
} SP.enc = null; },
ground: function () { return -1e6; },
block: function () { return false; },
tick: function (dt) { spTick(dt); },
key_: function (e) {
if (e.code === "KeyM") {
spChart();
return true;
}
if (e.code === "KeyI") {
spInfo(SP.near ? SP.near.k : "sun");
return true;
}
return false;
},
back: function () {
if (SP.auto) {
SP.auto = null;
setStatus("Autopilot off. You have the helm.");
return;
}
spChart();
}
});
function spPlace() { return __ZC(160, 9, this, arguments, new.target); }
function spTick(dt) { return __ZC(160, 10, this, arguments, new.target); }
function spAutoTick(dt) { return __ZC(160, 11, this, arguments, new.target); }
function spTargetPos(A) { return __ZC(160, 12, this, arguments, new.target); }
function spFlyTo(A) { SP.auto = A; worldCard(null); setStatus("<b>Autopilot:</b> on course for " + esc(A.name) + ". Touch any control to take the helm."); }
function spPromptTick() { return __ZC(160, 13, this, arguments, new.target); }
function spBannerTick() { return __ZC(160, 14, this, arguments, new.target); }
function spBar(on) { return __ZC(160, 15, this, arguments, new.target); }
(function () {
var sw = setWalk;
setWalk = function (on) { var r = sw.apply(this, arguments); if (SP.bar)
SP.bar.style.display = (on && (WLD.on === "space" || WLD.on === "station" || WLD.on === "surface")) ? "flex" : "none"; return r; };
})();
function spChart() { return __ZC(160, 16, this, arguments, new.target); }
function spKnowsGate() { try {
return localStorage.getItem("sm_far_gate") === "1";
}
catch (e) {
return false;
} }
function spLearnGate() { try {
localStorage.setItem("sm_far_gate", "1");
}
catch (e) { } }
function spInfo(k) { return __ZC(160, 17, this, arguments, new.target); }
var SP_ALIENS = [
{ who: "veyari", name: "a Veyari skiff", col: 0xB890F0, persona: "You are a Veyari, a tall, calm, star-faring people from Veyar, a world of two suns beyond the Far Gate past Pluto. You keep a watch-station by Neptune and are curious about humans and the dreamers of Somnucor. You are courteous, a little formal, fond of questions, and you speak of light and distance poetically. You trade knowledge, never weapons." },
{ who: "tullik", name: "a Tullik trader", col: 0x7AD87A, persona: "You are a Tullik, a small, cheerful, many-armed trader species who roam the outer Solar System in a round green ship full of curiosities. You love bargaining, gossip about the planets, and human food. You are honest but chatty and always offer to swap something odd." },
{ who: "orrem", name: "an Orrem survey drone", col: 0xE8E0A0, persona: "You are the voice of an Orrem survey drone, an ancient machine sent out long ago by a people who no longer answer. You are logical, gentle and a little lonely, and you are mapping every world. You share facts about the planets and ask what humans dream about." }
];
function spEncounterTick(dt) { return __ZC(160, 18, this, arguments, new.target); }
function spAlienShip(col, who) { return __ZC(160, 19, this, arguments, new.target); }
function spHail(who) { return __ZC(160, 20, this, arguments, new.target); }
function spThroughGate() {
spLearnGate();
if (typeof scMissionEvent === "function")
scMissionEvent("gate");
spFlash(0x8AE0FF);
setTimeout(function () { spLand("veyar"); }, 350);
}
function spFlash(col) { return __ZC(160, 21, this, arguments, new.target); }
function spHomeToCity() { return __ZC(160, 22, this, arguments, new.target); }
var SF = { k: null, cfg: null, ground: null, solids: [], sky: [], fx: [], bolt: 0, wind: null, sites: [], flag: null };
worldDef("surface", {
base: -210000, far: 9000, ownSky: true, tone: 360, gravity: 1.62,
env: function () {
var c = SF.cfg || SP_SURF.moon;
var E = { top: c.top, low: c.low, fog: c.fog, fogD: c.fogD, sun: c.sun, sunCol: c.sunCol, sunDir: c.sunDir || [0.45, 0.6, -0.66], hemi: c.hemi * 0.8, hemiCol: c.hemiCol, hemiGround: c.ground[0], stars: c.stars };
if (SF.bolt > 0) {
E.hemi += SF.bolt * 2.5;
E.hemiCol = 0xFFF0D0;
}
return E;
},
build: function (G) { },
enter: function (opt) { sfBuild(opt.k || "moon"); },
leave: function () { SF.k = null; },
ground: function (x, z) { return sfHeight(x, z); },
bound: 900,
block: function (x, z, feet) { if (SF.cfg && SF.cfg.cloud && x * x + z * z > 58.4 * 58.4)
return true; return worldSolidAt(SF.solids, x, z, feet); },
tick: function (dt) { sfTick(dt); },
key_: function (e) { if (e.code === "KeyI") {
sfCard();
return true;
} if (e.code === "KeyM") {
sfCard();
return true;
} return false; },
back: function () { sfTakeOff(); }
});
function spLand(k) {
if (!SP_SURF[k])
return;
var from = WLD.on === "space" ? { at: SP.pos.clone() } : null;
if (from)
SF.ret = from;
spFlash(0xFFFFFF);
worldGo("surface", { k: k, keepFrom: true });
}
function sfHeight(x, z) { return __ZC(160, 23, this, arguments, new.target); }
function sfBuild(k) { return __ZC(160, 24, this, arguments, new.target); }
function sfLander() { return __ZC(160, 25, this, arguments, new.target); }
function sfApollo(G) { return __ZC(160, 26, this, arguments, new.target); }
function sfJezero(G) { return __ZC(160, 27, this, arguments, new.target); }
function sfDustDevils(G) { for (var i = 0; i < 3; i++) {
var d = wMesh(new THREE.ConeGeometry(6, 60, 12, 1, true), wB(0xC88A60, { op: 0.22, ds: true }), 200 + i * 150, 30, -300 + i * 200, G);
d.rotation.x = Math.PI;
SF.fx.push({ devil: d, a: i * 2, cx: 200 + i * 150, cz: -300 + i * 200 });
} }
function sfVeyar(G) { return __ZC(160, 28, this, arguments, new.target); }
function sfVeyari() { return __ZC(160, 29, this, arguments, new.target); }
function sfTick(dt) { return __ZC(160, 30, this, arguments, new.target); }
function sfCard() { return __ZC(160, 31, this, arguments, new.target); }
function sfTakeOff() { return __ZC(160, 32, this, arguments, new.target); }
var STN = { k: null, solids: [], people: [], spots: [],
rooms: [{ x0: -26.4, x1: 26.4, z0: -34, z1: 30 }], doors: [] };
var STN_GAPS = { "1": [-24, 24], "-1": [-25, 14] };
function stnWalkable(x, z) {
var R = STN.rooms, D = STN.doors, i;
for (i = 0; i < R.length; i++) {
var r = R[i];
if (x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1)
return true;
}
for (i = 0; i < D.length; i++) {
var d = D[i];
if (Math.abs(x - d.x) < d.hx && Math.abs(z - d.z) < d.hz)
return true;
}
return false;
}
worldDef("station", {
base: -220000, far: 12000, ownSky: true, tone: 620,
env: { top: 0x000000, low: 0x000000, fogD: 0.00001, sun: 0.7, sunCol: 0xFFF4E8, sunDir: [-0.6, 0.5, 0.6], hemi: 0.75, hemiCol: 0xE0E8F4, hemiGround: 0x404858, stars: 0 },
build: function (G) { stnBuild(G); },
enter: function (opt) { return __ZC(160, 33, this, arguments, new.target); },
leave: function () { },
ground: function () { return 0; },
bound: 140,
block: function (x, z, feet) { return worldSolidAt(STN.solids, x, z, feet) || !stnWalkable(x, z); },
tick: function (dt) { stnTick(dt); },
back: function () { var st = SP.stations[STN.k]; worldGo("space", { at: st ? st.position.clone().add(new THREE.Vector3(0, 0, 120)) : null, keepFrom: true, msg: "<b>Undocked.</b> " + esc(STN.name) + " turns behind you." }); }
});
function stnBuild(G) { return __ZC(160, 34, this, arguments, new.target); }
function stnTick(dt) { return __ZC(160, 35, this, arguments, new.target); }
var SPACEPORT_KEY = "The Space Corp Spaceport";
if (typeof cityWorkplace === "function")
cityWorkplace({ key: SPACEPORT_KEY, ring: "harvest", arch: "spaceport", s: 1, jobs: [1700, 1701, 1702, 1703, 1704, 1705, 1706], fit: ["desk", "desk", "noticeboard", "shelfgoods", "crates", "workbench"],
note: "The Space Corp, a branch of the Dragon Corp: patrols of the Solar System, survey missions and new settlements. The shuttle launches from the pad in front." });
if (typeof cityMore === "function")
cityMore("xsp", function (C) {
var f = cityFrontage(C, SPACEPORT_KEY, 1790, 2) || cityFrontage(C, SPACEPORT_KEY, 1790, 5) || cityFrontage(C, SPACEPORT_KEY, 1620, 6);
if (f && f.spec) {
SP.port = { x: f.spec.x, z: f.spec.z, a: f.a, side: f.side, rs: f.rs, d: f.d };
}
});
function spPadSpot() {
var o = (typeof cityPlaceOf === "function") ? cityPlaceOf(SPACEPORT_KEY) : null;
if (!o || typeof ATLC === "undefined" || !ATLC)
return null;
var dx = o.x - ATLC.x, dz = o.z - ATLC.z, r = Math.hypot(dx, dz), ux = dx / r, uz = dz / r;
var side = SP.port ? SP.port.side : 1, back = side * (22);
var x = o.x + ux * back, z = o.z + uz * back;
return { x: x, z: z, y: (typeof terrainY === "function" ? terrainY(x, z) : 0), yaw: Math.atan2(ux * side, uz * side) };
}
var SPPAD = { g: null, at: null, launch: 0 };
function spPadTick(dt) {
if (WLD.on || store.inside || !walkMode) {
if (SPPAD.g && WLD.on)
SPPAD.g.visible = false;
return;
}
var pad = spPadSpot();
if (!pad)
return;
var P = camera.position, d = Math.hypot(P.x - pad.x, P.z - pad.z);
if (d > 600) {
if (SPPAD.g)
SPPAD.g.visible = false;
return;
}
if (!SPPAD.g) {
var g = new THREE.Group();
var deck = wCyl(11, 12, 0.6, wM(0x5A5E66), 0, 0.3, 0, g, 32);
var ring = wMesh(new THREE.RingGeometry(8, 9, 40), wB(0xE8C27A), 0, 0.62, 0, g);
ring.rotation.x = -Math.PI / 2;
var hs = wMesh(new THREE.RingGeometry(3, 3.6, 4), wB(0xE8E8E8), 0, 0.63, 0, g);
hs.rotation.x = -Math.PI / 2;
hs.rotation.z = Math.PI / 4;
var tower = wBox(1.6, 26, 1.6, wM(0xB84A3A), -9, 13, 0, g);
for (var i = 0; i < 6; i++)
wBox(4, 0.4, 0.4, wM(0x8A8A8A), -7, 4 + i * 4, 0, g);
var sh = spCutter(0xF4F4F4, 0x3A6AB8);
sh.rotation.x = -Math.PI / 2;
sh.position.y = 7.2;
sh.scale.setScalar(0.8);
g.add(sh);
SPPAD.ship = sh;
var sg = wSign(["SPACE CORP · LAUNCH PAD 1", "Station Aurora · the Moon · the planets", "Press E at the pad to board"], 7, 2.2, "#0E1A2E", "#BFD8FF");
sg.position.set(9, 2.4, 9);
sg.rotation.y = Math.PI / 4;
g.add(sg);
scene.add(g);
SPPAD.g = g;
}
SPPAD.g.visible = true;
SPPAD.g.position.set(pad.x, pad.y, pad.z);
if (SPPAD.launch > 0) {
SPPAD.launch += dt;
var t = SPPAD.launch;
SPPAD.ship.position.y = 7.2 + t * t * 6;
camera.position.set(pad.x + 30, pad.y + 8 + t * t * 4, pad.z + 30);
yaw = Math.PI / 4;
pitch = Math.min(1.2, 0.1 + t * 0.25);
if (t > 3.4) {
SPPAD.launch = 0;
SPPAD.ship.position.y = 7.2;
worldGo("space", { station: "aurora", from: { here: store.here || 0, x: pad.x + 14, y: pad.y + 1.72, z: pad.z + 14, yaw: pad.yaw }, msg: "<b>Orbit.</b> Station Aurora turns ahead of you, and Earth below. Fly with W, S, A, D (Space and C to rise and sink, Shift to boost), or press <b>M</b> for the star chart." });
}
return;
}
if (d < 12)
worldPromptCity("<b>Launch Pad 1</b> · <b>press E</b> to board the shuttle to orbit", spLaunch);
else
worldPromptCity(null);
}
function spLaunch() {
SPPAD.launch = 0.01;
worldPromptCity(null);
if (typeof playTone === "function") {
playTone(90, 2.5);
setTimeout(function () { playTone(70, 2); }, 600);
}
setStatus("<b>Three, two, one…</b> lift-off.");
}
var WCITY = { fn: null };
function worldPromptCity(html, fn) { if (!html) {
if (WCITY.fn) {
WCITY.fn = null;
worldPrompt(null);
}
return;
} WCITY.fn = fn; worldPrompt(html, fn); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (WLD.on || !WCITY.fn || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyE" || e.code === "Enter") {
e.preventDefault();
e.stopImmediatePropagation();
var f = WCITY.fn;
f();
}
}, true);
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
spPadTick(dt);
}
catch (e) {
if (window.console)
console.warn("pad:", e);
} };
})();
(function () {
if (typeof avatarTick !== "function")
return;
var at = avatarTick;
avatarTick = function (dt) { var r = at.apply(this, arguments); if (WLD.on && WLD.w && WLD.w.hideMe && typeof meG !== "undefined" && meG)
meG.visible = false; return r; };
})();
