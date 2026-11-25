/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SD = { built: false, G: null, mats: null, cover: [], run: null, beams: [], duel: null, net: null, hud: null, pad: null, zero: { on: false, hoops: [], got: {}, balls: [] }, bot: null, aurora: [], t: 0, lessonCache: null };
var SD_ARENA = { x0: 27.4, x1: 80.6, z0: -34.6, z1: -0.4 };
var SD_DUEL = { x: 42, z: 15, r: 6 };
var SD_ZERO = { x0: 57.4, x1: 80.6, z0: 0.4, z1: 30.6, top: 9.4 };
if (typeof S === "function") {
S("tagblaster", "infra", [.45, .22, .3], [
{ g: "box", s: [.24, .08, .06], p: [.04, .1, 0], c: 0x2A2E36 },
{ g: "box", s: [.06, .13, .05], p: [-.05, .04, 0], r: [0, 0, .3], c: 0x3A6AB8 },
{ g: "sph", s: [.03], p: [.17, .1, 0], c: 0x6AE0FF, glow: 1 }
], ["tag blaster", "laser tag gun", "laser tag blaster", "tagger"]);
}
if (typeof ARMS !== "undefined")
ARMS.tagblaster = { held: "tagblasterH", shot: "phaser", name: "tag blaster" };
if (typeof HELD !== "undefined")
HELD.tagblasterH = function () { var g = new THREE.Group(); g.add(P(box(.05, .07, .24), mL(0x2A2E36), 0, .1, .06)); g.add(P(box(.05, .12, .06), mL(0x3A6AB8), 0, .03, -.02, .3)); g.add(P(sph(.026, 8, 6), mG(0x6AE0FF, .9), 0, .1, .19)); return g; };
var SD_ROOMS = [
{ k: "arena", name: "LASER TAG ARENA", x0: 27, x1: 81, z0: -35, z1: 0, h: 6, floor: 0x1A1E2A, wall: 0x2A3040, trim: 0x6AE0FF,
skip: { w: 1 }, doors: [] },
{ k: "duel", name: "DUELLING DECK", x0: 27, x1: 57, z0: 0, z1: 31, h: 6, floor: 0x3A3430, wall: 0xB8C0CC, trim: 0xFFD24A,
skip: { w: 1, n: 1 }, doors: [{ side: "e", at: 15 }] },
{ k: "zero", name: "ZERO-G BAY", x0: 57, x1: 81, z0: 0, z1: 31, h: 10, floor: 0x2E3A48, wall: 0xD8E0EA, trim: 0x8FD8FF,
skip: { w: 1, n: 1 }, doors: [] },
{ k: "gallery", name: "AURORA LEARNING GALLERY", x0: -75, x1: -27, z0: -35, z1: -4, h: 6, floor: 0x2A3040, wall: 0xC8D0DA, trim: 0x7AE8A8,
skip: { e: 1 }, window: "n", doors: [{ side: "s", at: -51 }] },
{ k: "quarters", name: "RING QUARTERS AND GYM", x0: -75, x1: -27, z0: -4, z1: 31, h: 6, floor: 0x4A4440, wall: 0xD8D4CC, trim: 0xE8B87A,
skip: { e: 1, n: 1 }, doors: [] }
];
var SD_DOORS = [
{ x: 27, z: -24, ax: "x", to: "arena" }, { x: 27, z: 24, ax: "x", to: "duel" }, { x: 57, z: 15, ax: "x", to: "zero" },
{ x: -27, z: -25, ax: "x", to: "gallery" }, { x: -27, z: 14, ax: "x", to: "quarters" }, { x: -51, z: -4, ax: "z", to: "quarters" }
];
function sdMats() {
if (SD.mats)
return SD.mats;
SD.mats = { dark: wM(0x2A2E36), steel: wM(0x8A8E98), light: wB(0xDDEEFF, { fog: false }), pad: wM(0x3A4A6A), white: wM(0xE8ECF0), rail: wM(0x9AA0AA) };
return SD.mats;
}
function sdWall(G, axis, fixed, a, b, h, gaps, mat, trimM, inner) { return __ZC(267, 0, this, arguments, new.target); }
function sdRoom(G, R) { return __ZC(267, 1, this, arguments, new.target); }
function sdDoor(G, d) { return __ZC(267, 2, this, arguments, new.target); }
function sdArena(G) { return __ZC(267, 3, this, arguments, new.target); }
function sdDuelDeck(G) { return __ZC(267, 4, this, arguments, new.target); }
function sdSabre(col) { return __ZC(267, 5, this, arguments, new.target); }
var SD_POSE = { rest: { rx: 0.25, ry: 0, rz: -0.2, z: 0 }, guard: { rx: 0.9, ry: 0, rz: 0.35, z: 0.1 }, cutup: { rx: -0.5, ry: 0.5, rz: 1.1, z: -0.05 }, cut: { rx: 1.9, ry: -0.4, rz: -0.5, z: 0.35 },
thrustback: { rx: 1.57, ry: 0, rz: 0, z: -0.25 }, thrust: { rx: 1.57, ry: 0, rz: 0, z: 0.7 }, block: { rx: 0.5, ry: 0, rz: 1.45, z: 0.25 }, parry: { rx: 1.1, ry: 0.6, rz: 1.2, z: 0.35 }, stagger: { rx: 0.1, ry: 0, rz: -0.6, z: -0.1 } };
function sdPose(s, name, k) {
var T = SD_POSE[name] || SD_POSE.guard, p = s.userData.pose, a = Math.min(1, k);
p.rx += (T.rx - p.rx) * a;
p.ry += (T.ry - p.ry) * a;
p.rz += (T.rz - p.rz) * a;
p.z += (T.z - p.z) * a;
s.userData.h.rotation.set(p.rx, p.ry, p.rz);
s.position.z = 0.2 + p.z;
}
function sdZeroBay(G) { return __ZC(267, 6, this, arguments, new.target); }
function sdGallery(G) { return __ZC(267, 7, this, arguments, new.target); }
function sdGym(G) { return __ZC(267, 8, this, arguments, new.target); }
function sdBuild(G) {
SD.G = G;
SD.cover = [];
SD.zero.hoops = [];
SD.zero.balls = [];
SD.aurora = [];
SD_ROOMS.forEach(function (R) { sdRoom(G, R); });
SD_DOORS.forEach(function (d) { sdDoor(G, d); });
sdArena(G);
sdDuelDeck(G);
sdZeroBay(G);
sdGallery(G);
sdGym(G);
SD.built = true;
}
(function () {
if (typeof stnBuild !== "function")
return;
var b = stnBuild;
stnBuild = function (G) { var r = b.apply(this, arguments); try {
sdBuild(G);
}
catch (e) {
if (window.console)
console.warn("station decks:", e);
} return r; };
if (typeof WH_PLAN !== "undefined" && WH_PLAN.station) {
WH_PLAN.station.face = { x: -40, z: 12 };
WH_PLAN.station.lots = [["Station Ring Cabin 1", -68, 3], ["Station Ring Cabin 2", -68, 14], ["Station Ring Cabin 3", -68, 25], ["Station Ring Cabin 4", -56, 4]];
}
if (typeof stnTick === "function") {
var t = stnTick;
stnTick = function (dt) { t.apply(this, arguments); try {
sdTick(dt);
}
catch (e) {
if (window.console)
console.warn("station decks:", e);
} };
}
var W = typeof WORLDS !== "undefined" && WORLDS.station;
if (W) {
var lv = W.leave;
W.leave = function () { sdStopAll(); if (lv)
return lv.apply(this, arguments); };
W.key_ = function (e) { return sdKey(e, true); };
}
})();
var SD_FACTS = {
zero: ["Astronauts in orbit are not beyond gravity: at the ISS's height it is still about 90% as strong as on the ground. They float because the station and everyone in it are falling round the Earth together, all the time.",
"This bay is at the hub of the wheel, where the spin that makes the rest of the station feel like gravity barely reaches.",
"On the ISS, crew move by pushing off gently and steering with handrails; the station's handrails are yellow.",
"Fluids drift towards the head in weightlessness, which is why astronauts' faces look puffy and food can taste bland."],
gym: ["ISS crew exercise about two hours every day: without the pull of gravity, muscles and bones weaken (NASA).",
"The T2 treadmill is nicknamed COLBERT, after a public vote in 2009 to name a station module. Runners wear a harness held down by bungee cords.",
"The CEVIS bicycle has no seat: you clip your shoes into the pedals and strap down.",
"ARED lets crew lift 'weights' using vacuum cylinders, since a dumbbell weighs nothing in orbit."]
};
var SD_MODELS = [
{ key: "iss", name: "International Space Station", years: "crewed without a break since November 2000", x: -63, z: -14, src: "Sources: NASA, Space Station Facts and Figures; NASA ISS deorbit plans (2024).",
rows: [["Partners", "5 space agencies, 15 countries"], ["Length", "356 ft (109 m) end to end"], ["Mass", "about 420,000 kg"], ["Orbit", "about every 90 minutes, about 400 km up"], ["Speed", "about 5 miles (8 km) a second"], ["Crew", "usually 7"]],
notes: ["Its first module, Zarya, launched on 20 November 1998; the first crew, Expedition 1, came aboard on 2 November 2000.", "It sees 16 sunrises and 16 sunsets every day.", "Inside it is bigger than a six-bedroom house: six sleeping quarters, two bathrooms, a gym and a 360-degree bay window (the Cupola).", "NASA plans to bring it down safely into a remote stretch of ocean after 2030, using a deorbit vehicle ordered from SpaceX in 2024."],
build: function (g) { return __ZC(267, 9, this, arguments, new.target); } },
{ key: "aurora", name: "Aurora Station (a plan)", years: "announced April 2018; it has not flown", x: -55, z: -14, src: "Source: Space.com, 'Luxury Space Hotel to Launch in 2021' (April 2018).",
rows: [["Company", "Orion Span, a startup (CEO Frank Bunger)"], ["Size", "about 13.3 m long, 4.3 m wide"], ["Guests", "4, with 2 crew"], ["Stay", "12 days, from $9.5 million"], ["Planned orbit", "about 320 km (200 miles) up"]],
notes: ["It was unveiled on 5 April 2018 as a 'luxury space hotel' aiming to launch in late 2021 and take guests from 2022. That did not happen: it has never been launched.", "Guests were to train for three months, the last part aboard the station itself.", "Our own Station Aurora borrows only the name: it is a Space Corp station from the game, not a real one."],
build: function (g) { return __ZC(267, 10, this, arguments, new.target); } },
{ key: "salyut", name: "Salyut 1", years: "1971, the first space station", x: -47, z: -14, src: "Source: NASA history.",
rows: [["Launched", "19 April 1971, by the Soviet Union"]],
notes: ["The first space station ever flown. Its first resident crew (Soyuz 11) spent about three weeks aboard in June 1971 and died on the way home when their capsule lost its air: a loss that changed spacecraft safety for good."],
build: function (g) { return __ZC(267, 11, this, arguments, new.target); } },
{ key: "skylab", name: "Skylab", years: "1973 to 1979, America's first station", x: -39, z: -14, src: "Source: NASA history.",
rows: [["Launched", "14 May 1973"], ["Crews", "3, the last staying 84 days"], ["Fell", "11 July 1979, over the Indian Ocean and Western Australia"]],
notes: ["It was built from the upper stage of a Saturn V moon rocket.", "It lost a shield and a solar wing on launch; the first crew fixed it in orbit with a sunshade like a parasol."],
build: function (g) { return __ZC(267, 12, this, arguments, new.target); } },
{ key: "mir", name: "Mir", years: "1986 to 2001", x: -63, z: -8, src: "Source: NASA history.",
rows: [["Core launched", "20 February 1986"], ["Brought down", "23 March 2001, into the Pacific"]],
notes: ["Built a module at a time, as the ISS would be.", "Valeri Polyakov stayed aboard about 437 days in 1994-95: still the longest single spaceflight.", "American astronauts lived on Mir in the 1990s, practice for building the ISS together."],
build: function (g) { return __ZC(267, 13, this, arguments, new.target); } },
{ key: "tiangong", name: "Tiangong", years: "China's station, finished in 2022", x: -55, z: -8, src: "Source: China Manned Space Agency, as reported by NASA and the press.",
rows: [["Core module", "Tianhe, launched 29 April 2021"], ["Modules", "3: Tianhe, Wentian and Mengtian"], ["Crew", "usually 3"]],
notes: ["Its name means 'Heavenly Palace'.", "It is about a fifth of the mass of the ISS."],
build: function (g) { return __ZC(267, 14, this, arguments, new.target); } }
];
var SD_LESSONS = [
{ k: "aurora", t: "What is Aurora Station?", src: "Space.com (April 2018)", f: [
"'Aurora Station' was a real plan, not a real station: a private 'luxury space hotel' announced by the startup Orion Span on 5 April 2018, at the Space 2.0 Summit in San Jose, California.",
"It was to be about 13.3 m long and 4.3 m wide, with 160 cubic metres inside, for 4 paying guests and 2 crew, orbiting about 320 km (200 miles) up, a little lower than the ISS.",
"A 12-day stay was priced from $9.5 million, with an $80,000 refundable deposit, and three months of training first.",
"It aimed to launch in late 2021 and take guests from 2022. It has never been launched.",
"The name Aurora has also been used by the European Space Agency for its 2000s exploration programme, which led to the ExoMars missions to Mars. Our own Station Aurora is the game's, named after the lights."
] },
{ k: "iss", t: "The International Space Station", src: "NASA, Space Station Facts and Figures", f: [
"The ISS has had people aboard without a break since 2 November 2000. Its first module, Zarya, was launched on 20 November 1998.",
"Five space agencies from 15 countries run it: NASA (USA), Roscosmos (Russia), ESA (Europe), JAXA (Japan) and CSA (Canada).",
"It goes round the Earth about every 90 minutes, at about 5 miles (8 km) a second, roughly 400 km up: 16 sunrises and sunsets a day.",
"End to end it is 109 m (356 ft) long, about a football field, and weighs about 420,000 kg. Its solar arrays make 75 to 90 kilowatts.",
"It took 42 flights to assemble: 37 by the US space shuttle and 5 by Russian rockets.",
"Up to eight spacecraft can be docked at once, and its robot arm, Canadarm2, is 17.6 m (55 ft) long."
] },
{ k: "uses", t: "What the ISS is used for", src: "NASA", f: [
"It is a laboratory in weightlessness: nearly 3,000 investigations from researchers in more than 108 countries had run by Expedition 60 (2019).",
"Medicine and the body: how bones, muscles, eyes and the heart change without gravity. NASA's Twins Study compared astronaut Scott Kelly, after nearly a year aboard (2015-16), with his twin Mark on the ground.",
"Growing things: crew have grown and eaten lettuce grown aboard in the Veggie garden (first eaten in 2015).",
"Physics: the Alpha Magnetic Spectrometer on its outside records cosmic rays, looking among other things for clues to dark matter.",
"Watching the Earth: crew have taken more than 3.5 million photographs of it, used for science and for disaster response.",
"Practising for the Moon and Mars: recycling water (it recovers most of its water, from the air and even urine), life support, and how people cope with long missions."
] },
{ k: "life", t: "Living aboard", src: "NASA", f: [
"Usually 7 people live aboard, more while crews hand over.",
"Crew exercise about two hours a day to keep their bones and muscles strong.",
"There are six sleeping quarters (each about the size of a phone booth), two bathrooms and a gym.",
"The Cupola, a dome of 7 windows added in 2010, is where crew watch the Earth and work the robot arm.",
"Water is recycled from moisture in the air, washing and urine, and comes out cleaner than much tap water."
] },
{ k: "aurora-sky", t: "Auroras seen from orbit", src: "NASA", f: [
"Auroras are light given off high in the air when particles from the Sun, guided by Earth's magnetic field, strike oxygen and nitrogen near the poles.",
"Most aurora glows between about 100 and 300 km up. The ISS flies at about 400 km, so crew look down on auroras from above.",
"The ISS's orbit is tilted 51.6 degrees to the equator, which carries it far enough north and south to pass near the auroral zones.",
"Green, the commonest colour, comes from oxygen; red from oxygen higher up; blue and purple from nitrogen."
] },
{ k: "others", t: "Other real space stations", src: "NASA history", f: [
"Salyut 1 (Soviet Union, 19 April 1971) was the first space station.",
"Skylab (USA, 1973-79) was built from a Saturn V rocket stage and housed three crews.",
"Mir (1986-2001) was built a module at a time; Valeri Polyakov stayed aboard about 437 days, still the longest single spaceflight.",
"Tiangong (China) has three modules; its core, Tianhe, launched on 29 April 2021.",
"Private companies are building stations meant to follow the ISS after it is retired."
] }
];
var SD_QUIZ = [
["How often does the ISS go round the Earth?", ["About every 90 minutes", "Once a day", "Once a week"], 0],
["Since when have people lived aboard the ISS without a break?", ["November 2000", "July 1969", "January 2015"], 0],
["How many countries are partners in the ISS?", ["15", "2", "50"], 0],
["What was 'Aurora Station'?", ["A planned private space hotel (2018) that never launched", "The first space station", "A module of the ISS"], 0],
["How much do ISS crew exercise each day?", ["About two hours", "Never: they float", "About ten minutes"], 0],
["What was the first space station?", ["Salyut 1 (1971)", "Skylab (1973)", "Mir (1986)"], 0],
["Why do astronauts in the ISS float?", ["They and the station are falling round the Earth together", "There is no gravity in space", "The station spins"], 0],
["About how high does the ISS fly?", ["About 400 km", "About 40 km", "About 4,000 km"], 0],
["Which machine lets ISS crew lift 'weights'?", ["ARED, using vacuum cylinders", "A rack of dumbbells", "A rowing machine"], 0],
["What colour of aurora is the commonest, and what makes it?", ["Green, from oxygen", "Blue, from water", "Red, from iron"], 0]
];
function sdAllFacts() { return __ZC(267, 15, this, arguments, new.target); }
function sdLesson(which) { return __ZC(267, 16, this, arguments, new.target); }
function sdBestFacts(q, n) { return __ZC(267, 17, this, arguments, new.target); }
function sdAsk() { return __ZC(267, 18, this, arguments, new.target); }
function sdQuiz() { return __ZC(267, 19, this, arguments, new.target); }
var SD_BEAMGEO = null;
function sdBeam(a, b, col) { return __ZC(267, 20, this, arguments, new.target); }
function sdBeamsTick(dt) {
for (var i = SD.beams.length - 1; i >= 0; i--) {
var b = SD.beams[i];
b.t += dt;
b.m.material.opacity = Math.max(0, 0.75 * (1 - b.t / 0.35));
if (b.t >= 0.35) {
scene.remove(b.m);
b.m.material.dispose();
SD.beams.splice(i, 1);
}
}
}
function sdInCover(x, y, z) { for (var k = 0; k < SD.cover.length; k++) {
var c = SD.cover[k];
if (y < c.h && Math.abs(x - c.x) < c.hw && Math.abs(z - c.z) < c.hd)
return true;
} return false; }
function sdCovered(ax, ay, az, bx, by, bz) {
var L = Math.hypot(bx - ax, bz - az), n = Math.ceil(L / 0.4);
for (var i = 1; i < n; i++) {
var t = i / n, x = ax + (bx - ax) * t, y = ay + (by - ay) * t, z = az + (bz - az) * t;
for (var k = 0; k < SD.cover.length; k++) {
var c = SD.cover[k];
if (y < c.h && Math.abs(x - c.x) < c.hw && Math.abs(z - c.z) < c.hd)
return true;
}
}
return false;
}
function sdAimPick(list, maxAng, maxD) { return __ZC(267, 21, this, arguments, new.target); }
function sdTouch() { return (typeof armbTouch === "function" && armbTouch()) || !!(document.body && document.body.classList.contains("touch")); }
function sdHud(html) { return __ZC(267, 22, this, arguments, new.target); }
function sdHasBlaster() { return typeof carrying !== "undefined" && carrying && carrying.archetype === "tagblaster"; }
function sdArm(kind) { return __ZC(267, 23, this, arguments, new.target); }
function sdInArena() { var L = worldLocal(); return WLD.on === "station" && L.x > SD_ARENA.x0 && L.x < SD_ARENA.x1 && L.z > SD_ARENA.z0 && L.z < SD_ARENA.z1; }
function sdTagBest() { try {
return +localStorage.getItem("somnu.tagBest") || 0;
}
catch (e) {
return 0;
} }
function sdTagCard() { return __ZC(267, 24, this, arguments, new.target); }
var SD_TSPOTS = null;
function sdTargetSpot() { return __ZC(267, 25, this, arguments, new.target); }
function sdRunStart() {
sdStopAll();
sdArm("tagblaster");
SD.run = { t: 60, score: 0, targets: [], spawn: 0.4, hits: 0, shots: 0, count: 3 };
sdHud("<b>Target run</b> · starting in 3");
}
function sdTarget() { return __ZC(267, 26, this, arguments, new.target); }
function sdTargetGone(t) { if (t.g.parent)
t.g.parent.remove(t.g); t.ring.geometry.dispose(); t.core.geometry.dispose(); t.ring.material.dispose(); t.core.material.dispose(); }
function sdRunTick(dt) { return __ZC(267, 27, this, arguments, new.target); }
function sdFire() { return __ZC(267, 28, this, arguments, new.target); }
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () {
if (typeof carrying !== "undefined" && carrying && carrying.archetype === "tagblaster") {
if (WLD.on === "station") {
if (SD.net && SD.net.me && SD.net.me.taggedFor > 0) {
setStatus("You are tagged: two seconds out.");
return;
}
sdFire();
}
else
setStatus("A tag blaster only works in the station's laser tag arena.");
return;
}
if (WLD.on === "station" && SD.duel && typeof carrying !== "undefined" && carrying && carrying.archetype === "lasersword") {
sdDuelAct("swing");
return;
}
if (WLD.on === "station" && typeof carrying !== "undefined" && carrying && carrying.archetype === "phaser" && SC.drones.length) {
var list = SC.drones.filter(function (d) { return !d.down; }).map(function (d) { return { p: d.g.getWorldPosition(new THREE.Vector3()), r: 0.8, d: d }; });
var pick = sdAimPick(list, sdTouch() ? 0.14 : 0.08, 40), y0 = yaw, p0 = pitch;
if (pick) {
var P = camera.position, dx = pick.p.x - P.x, dz = pick.p.z - P.z;
yaw = Math.atan2(-dx, -dz);
pitch = Math.atan2(pick.p.y - (P.y - 0.2), Math.hypot(dx, dz));
}
var r = uc.apply(this, arguments);
yaw = y0;
pitch = p0;
return r;
}
return uc.apply(this, arguments);
};
})();
var SD_LEVEL = { cadet: { name: "Cadet", cut: 0.95, thrust: 0.75, gap: [1.6, 2.6], def: 0.3 }, officer: { name: "Officer", cut: 0.75, thrust: 0.6, gap: [1.1, 2.0], def: 0.5 }, master: { name: "Master", cut: 0.6, thrust: 0.48, gap: [0.8, 1.5], def: 0.68 } };
var SD_COST = { swing: 16, thrust: 22, parry: 10 };
function sdDuelCard() { return __ZC(267, 29, this, arguments, new.target); }
function sdDuelStart(level) { return __ZC(267, 30, this, arguments, new.target); }
function sdDuelAct(move) { return __ZC(267, 31, this, arguments, new.target); }
function sdDuelSay(h, t) { var D = SD.duel; if (D) {
D.say = h;
D.sayT = t || 1.4;
}
else if (SD.net) {
SD.net.say = h;
SD.net.sayT = t || 1.4;
} }
function sdReach(ox, oz, len) { var L = worldLocal(), dx = ox - L.x, dz = oz - L.z, d = Math.hypot(dx, dz); if (d > len)
return false; var fx = -Math.sin(yaw), fz = -Math.cos(yaw); return (dx * fx + dz * fz) / Math.max(d, 0.01) > 0.45; }
function sdDuelTouch(who) { return __ZC(267, 32, this, arguments, new.target); }
function sdDuelTick(dt) { return __ZC(267, 33, this, arguments, new.target); }
function sdMyPose(me) { return __ZC(267, 34, this, arguments, new.target); }
function sdPad(on) { return __ZC(267, 35, this, arguments, new.target); }
function sdPadTick() { return __ZC(267, 36, this, arguments, new.target); }
function sdKey(e, down) {
var inBout = !!(SD.duel || (SD.net && SD.net.kind === "duel"));
if (!inBout)
return false;
if (e.code === "KeyR") {
sdDuelAct("thrust");
return true;
}
if (e.code === "KeyQ") {
sdDuelAct("parry");
return true;
}
if (e.code === "KeyV") {
SD.blockHeld = true;
return true;
}
return false;
}
if (typeof addEventListener === "function")
addEventListener("keyup", function (e) { if (e.code === "KeyV" && SD.blockHeld) {
SD.blockHeld = false;
} });
var SD_SIDES = [{ name: "Red", hex: 0xFF5A5A, css: "#FF8A8A" }, { name: "Blue", hex: 0x4AA8FF, css: "#8AD8FF" }];
function sdVest(N, team) { return N.teams && team != null && SD_SIDES[team] ? SD_SIDES[team].hex : (N.kind === "tag" ? 0x6AE0FF : 0xFFD24A); }
function sdNetJoin(kind) { return __ZC(267, 37, this, arguments, new.target); }
function sdNetLeave() {
var N = SD.net;
if (!N)
return;
SD.net = null;
Object.keys(N.ghosts).forEach(function (id) { var g = N.ghosts[id]; if (g.g.parent)
g.g.parent.remove(g.g); });
if (N.game)
cityRpc("stn_game_leave", { p_game: N.game }).catch(function () { });
}
function sdNetGhost(N, r) { return __ZC(267, 38, this, arguments, new.target); }
function sdNetState(o) { return __ZC(267, 39, this, arguments, new.target); }
function sdNetSay(h) { var N = SD.net; if (N) {
N.say = h;
N.sayT = 1.6;
} }
function sdNetTag(id) { return __ZC(267, 40, this, arguments, new.target); }
function sdNetStrike(id, move) { return __ZC(267, 41, this, arguments, new.target); }
function sdNetTick(dt) { return __ZC(267, 42, this, arguments, new.target); }
function sdStopAll() {
if (SD.run) {
SD.run.targets.forEach(sdTargetGone);
SD.run = null;
}
if (SD.duel) {
SD.duel = null;
if (SD.master) {
SD.master.g.position.copy(SD.master.home);
SD.master.g.rotation.y = Math.PI / 2;
sdPose(SD.master.sab, "rest", 1);
}
}
sdNetLeave();
sdPad(false);
sdHud(null);
}
function sdTick(dt) { return __ZC(267, 43, this, arguments, new.target); }
