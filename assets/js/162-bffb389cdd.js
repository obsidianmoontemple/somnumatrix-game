/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var ORB_PERIOD = 150;
var ORB_LINES = [
{ k: "lunar", name: "Lunar Line", col: "#E8C27A", off: 0, stops: [
{ k: "earth", name: "Earth: the Space Corp Spaceport" },
{ k: "aurora", name: "Station Aurora", kind: "station", host: "earth",
facts: ["Station Aurora orbits about 400 km up, the height of the real International Space Station.", "At that height a station goes round the Earth once every 92 minutes, at about 28,000 km/h, so its crew see sixteen sunrises a day."] },
{ k: "moon", name: "The Moon: the Sea of Tranquillity", kind: "surface", host: "moon",
facts: ["The Moon is 384,400 km away. Apollo 11 took just over three days to get there; the Corp's shuttle folds the trip into a minute.", "On the Moon you weigh a sixth of what you weigh at home: a jump of half a metre here is three metres there.", "The Moon keeps the same face to Earth: it turns once on its axis in the time it takes to go round us, about 27 days."] }
] },
{ k: "mars", name: "Mars Line", col: "#E07A50", off: 75, stops: [
{ k: "earth", name: "Earth: the Space Corp Spaceport" },
{ k: "ares", name: "The Ares Gateway", kind: "station", host: "mars",
facts: ["Mars is never closer than about 55 million km, and at times 400 million km away: real ships leave every 26 months, when the planets line up.", "A real crew would be about seven months on the way there."] },
{ k: "mars", name: "Mars: Jezero Crater", kind: "surface", host: "mars",
facts: ["Mars has 38 per cent of Earth's gravity, and air a hundred times thinner, mostly carbon dioxide: you cannot breathe it.", "A day on Mars, a sol, is 24 hours 39 minutes long.", "Mars is red because its dust is rich in iron oxide: rust."] }
] }
];
var ORB_LAUNCH_FACTS = ["To stay in orbit round the Earth you need about 28,000 km/h; to leave it altogether, about 40,000 km/h. That is escape velocity.",
"The pressure you feel on lift-off is about three times your weight: three g.", "At 100 km up, the Kármán line, is where space is said to begin. We pass it in about two and a half minutes on a real rocket.",
"The sky goes black because there is no air above us to scatter the sunlight. On the ground it is the air that makes the sky blue."];
var ORB = { ride: null, board: null, boardTex: null, boardAt: 0, people: [], waiting: [], seat: null, stopAt: null, shake: 0 };
function orbNow() { return Date.now() / 1000; }
function orbNext(line, from) { var t = from || orbNow(), p = ORB_PERIOD; return Math.ceil((t - line.off) / p) * p + line.off; }
function orbLine(k) { return ORB_LINES.filter(function (l) { return l.k === k; })[0]; }
function orbStop(line, k) { for (var i = 0; i < line.stops.length; i++)
if (line.stops[i].k === k)
return i; return -1; }
function orbMins(s) { s = Math.max(0, Math.round(s)); return s < 60 ? s + " s" : Math.floor(s / 60) + " min " + (s % 60 < 10 ? "0" : "") + (s % 60) + " s"; }
function orbCrewName(title, salt) { return __ZC(162, 0, this, arguments, new.target); }
(function () {
if (typeof WP_BY_KEY === "undefined" || typeof SPACEPORT_KEY === "undefined" || !WP_BY_KEY[SPACEPORT_KEY])
return;
var w = WP_BY_KEY[SPACEPORT_KEY];
[1707, 1708, 1709, 1710].forEach(function (id) { if (w.jobs.indexOf(id) < 0)
w.jobs.push(id); if (typeof WP_BY_JOB !== "undefined")
WP_BY_JOB[id] = w.key; });
w.note = (w.note || "") + " The Orbital Line's shuttles leave Launch Pad 1 on the timetable for Station Aurora, the Moon, the Ares Gateway and Mars.";
})();
worldDef("shuttle", {
base: -230000, far: 6000, ownSky: true, tone: 300, hideMe: false,
env: function () { return orbEnv(); },
build: function (G) { orbBuild(G); },
enter: function (opt) { orbEnter(opt); },
leave: function () { ORB.ride = null; ORB.seat = null; },
ground: function () { return ORB.sitting ? -0.54 : 0; },
block: function (x, z, feet) { return ORB.sitting || Math.abs(x) > 1.9 || z < -9.6 || z > 11.4 || worldSolidAt(ORB.solids || [], x, z, feet); },
tick: function (dt) { orbTick(dt); },
back: function () { orbBack(); }
});
function orbEnv() { return __ZC(162, 1, this, arguments, new.target); }
function orbBuild(G) { return __ZC(162, 2, this, arguments, new.target); }
function orbCrew() { return __ZC(162, 3, this, arguments, new.target); }
function orbSay(who, txt) { return __ZC(162, 4, this, arguments, new.target); }
function orbBoard(lineK, fromK, toK) { return __ZC(162, 5, this, arguments, new.target); }
function orbEnter(opt) { return __ZC(162, 6, this, arguments, new.target); }
function orbStage() { return __ZC(162, 7, this, arguments, new.target); }
function orbSit() {
var s = ORB.seat;
if (!s)
return;
ORB.sitting = true;
var B = WORLDS.shuttle.base;
camera.position.set(B + s.x, 1.18, s.z + 0.05);
yaw = 0;
pitch = 0;
setStatus(ORB.ride.phase === "wait" ? "<b>Seated, belt fastened.</b> We leave in " + orbMins(ORB.ride.dep - orbNow()) + "." : "<b>Seated.</b>");
}
function orbSeatNear(L) {
var best = null, bd = 1.7;
(ORB.seats || []).forEach(function (s) { if (s.taken && s !== ORB.seat)
return; var d = Math.hypot(L.x - s.x, L.z - (s.z + 0.4)); if (d < bd) {
bd = d;
best = s;
} });
return best;
}
function orbTake(s) { if (!s)
return; if (ORB.seat && ORB.seat !== s)
ORB.seat.taken = false; ORB.seat = s; s.taken = true; orbSit(); }
function orbStand() { ORB.sitting = false; var s = ORB.seat; if (s)
camera.position.set(WORLDS.shuttle.base + (s.x < 0 ? -0.3 : 0.3), 1.72, s.z + 0.6); }
function orbTick(dt) { return __ZC(162, 8, this, arguments, new.target); }
function orbBack() { return __ZC(162, 9, this, arguments, new.target); }
function orbOff() { var R = ORB.ride; if (!R)
return; ORB.ride = null; orbArrive(R.to); }
function orbEnsureSpace() {
var W = WORLDS.space;
if (!W)
return;
if (!W.g) {
W.g = new THREE.Group();
W.g.position.set(W.base, 0, 0);
W.g.name = "world-space";
scene.add(W.g);
try {
W.build(W.g, {});
}
catch (e) { }
W.g.visible = false;
}
try {
spPlace();
}
catch (e) { }
}
function orbArrive(stop) { return __ZC(162, 10, this, arguments, new.target); }
function orbDepartures(here) { return __ZC(162, 11, this, arguments, new.target); }
function orbBoardSpot() { var pad = spPadSpot(); if (!pad)
return null; var a = pad.yaw || 0; return { x: pad.x + Math.cos(a) * 14 - Math.sin(a) * 0, z: pad.z - Math.sin(a) * 14, y: pad.y, yaw: a }; }
function orbBoardPaint() { return __ZC(162, 12, this, arguments, new.target); }
function orbPadTick(dt) {
if (WLD.on || store.inside || !walkMode) {
if (ORB.board)
ORB.board.visible = false;
return;
}
var b = orbBoardSpot();
if (!b) {
return;
}
var P = camera.position, d = Math.hypot(P.x - b.x, P.z - b.z);
if (d > 500) {
if (ORB.board)
ORB.board.visible = false;
return;
}
if (!ORB.board) {
var g = new THREE.Group();
var cv = document.createElement("canvas");
cv.width = 640;
cv.height = 320;
ORB.boardCv = cv;
ORB.boardTex = new THREE.CanvasTexture(cv);
var face = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.8), new THREE.MeshBasicMaterial({ map: ORB.boardTex }));
face.position.set(0, 2.6, 0.07);
g.add(face);
var back = face.clone();
back.rotation.y = Math.PI;
back.position.z = -0.07;
g.add(back);
wBox(3.8, 2, 0.12, wM(0x2A3040), 0, 2.6, 0, g);
wBox(0.16, 1.6, 0.16, wM(0x5A6474), -1.5, 0.8, 0, g);
wBox(0.16, 1.6, 0.16, wM(0x5A6474), 1.5, 0.8, 0, g);
wBox(6, 0.12, 2.6, wM(0x3A6AB8), 0, 3.9, -1.6, g);
wBox(0.12, 3.9, 0.12, wM(0x8A93A2), -2.9, 1.95, -2.8, g);
wBox(0.12, 3.9, 0.12, wM(0x8A93A2), 2.9, 1.95, -2.8, g);
wBox(4.4, 0.1, 0.5, wM(0x8A6A4A), 0, 0.5, -2.4, g);
wBox(4.4, 0.5, 0.08, wM(0x8A6A4A), 0, 0.8, -2.66, g);
scene.add(g);
ORB.board = g;
try {
var ag = wPerson("orb_agent", { title: "Departures agent", place: SPACEPORT_KEY });
ag.position.set(1.9, 0, 1.1);
ag.rotation.y = -0.5;
g.add(ag);
var tg = makeTag(orbCrewName("Departures agent", 0) + " · Departures agent (stand-in)", false);
tg.position.y = 2.05;
ag.add(tg);
for (var i = 0; i < 4; i++) {
var w = wPerson("orb_wait" + i, {});
if (i < 2) {
w.position.set(-1 + i * 1.2, 0.05, -2.35);
w.userData.seated = true;
w.userData.pose = "sit";
}
else {
w.position.set(-2.2 + i * 0.7, 0, 0.9 + i * 0.3);
w.rotation.y = Math.PI * 0.9;
}
g.add(w);
ORB.waiting.push(w);
}
}
catch (e) { }
}
ORB.board.visible = true;
ORB.board.position.set(b.x, b.y, b.z);
ORB.board.rotation.y = b.yaw + Math.PI / 2;
ORB.boardAt -= dt;
if (ORB.boardAt <= 0) {
ORB.boardAt = 1;
orbBoardPaint();
}
if (d < 4.5 && !(typeof SPPAD !== "undefined" && SPPAD.launch > 0))
worldPromptCity("<b>Orbital Line departures</b> · <b>press E</b> to board a shuttle to the stations, the Moon, Mars or the planets", function () { orbDepartures("earth"); });
}
(function () {
if (typeof spPadTick !== "function")
return;
var pt = spPadTick;
spPadTick = function (dt) { pt(dt); try {
orbPadTick(dt);
}
catch (e) {
if (window.console)
console.warn("orbital line:", e);
} };
})();
(function () {
if (typeof stnTick === "function") {
var st = stnTick;
stnTick = function (dt) {
st(dt);
var L = worldLocal();
if (wNear(L.x, L.z, 8, 26, 3))
worldPrompt("<b>Orbital Line</b> · <b>press E</b> for the shuttles home to Earth and on along the line", function () { orbDepartures(STN.k); });
};
}
if (typeof stnBuild === "function") {
var sb = stnBuild;
stnBuild = function (G) {
sb(G);
var sg = wSign(["ORBITAL LINE", "Shuttles to Earth, the Moon and Mars", "Press E here"], 4, 1.6, "#0E1A2E", "#E8C27A");
sg.position.set(8, 2.6, 29.9);
sg.rotation.y = Math.PI;
G.add(sg);
wBox(2.4, 3, 0.2, wM(0xE8C27A), 8, 1.5, 30.2, G);
};
}
if (typeof sfTick === "function") {
var ft = sfTick;
sfTick = function (dt) {
ft(dt);
if (!SF.k || (SF.k !== "moon" && SF.k !== "mars"))
return;
var L = worldLocal();
if (wNear(L.x, L.z, -14, 10, 5))
worldPrompt("<b>Orbital Line shuttle stop</b> · <b>press E</b> for the shuttles home to Earth", function () { orbDepartures(SF.k); });
};
}
if (typeof scSurfaceBuilt === "function" || typeof sfBuild === "function") {
var fb = sfBuild;
sfBuild = function (k) {
fb(k);
if (k !== "moon" && k !== "mars")
return;
var G = WORLDS.surface.g, y = sfHeight(-14, 10);
var pad = wCyl(4, 4.2, 0.3, wM(0x5A5E66), -14, y + 0.15, 10, G, 24);
var ring = wMesh(new THREE.RingGeometry(2.8, 3.2, 32), wB(0xE8C27A), -14, y + 0.32, 10, G);
ring.rotation.x = -Math.PI / 2;
var sg = wSign(["ORBITAL LINE · SHUTTLE STOP", "Earth · " + (k === "moon" ? "Station Aurora" : "the Ares Gateway"), "Press E on the pad"], 3.6, 1.4, "#0E1A2E", "#E8C27A");
sg.position.set(-14, y + 2.2, 6.4);
G.add(sg);
wBox(0.12, 1.6, 0.12, wM(0x666666), -14, y + 0.8, 6.4, G);
};
}
})();
