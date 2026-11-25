/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LBY = { base: -960000, G: null, built: false, t: 0, lite: false, U: 4, N: 301, C: 150,
grid: null, stoneEp: -1, hedgeEp: -1, deepEp: -1, anim: [], chunks: [], seem: [], mats: {}, tex: {},
solids: [], floors: [], spots: [], talk: [], people: [], glows: [], mist: [], gold: [], traps: [], fx: [],
zone: "gate", zoneAt: "", near: null, run: null, flip: 0, flipT: 0, mark: null, deep: null, inside: null,
told: {}, keeps: null, busy: false, lastNudge: 0, hedgeSound: 0, pt: 0, vis: 0, riddle: null };
var LBY_KEY = "maze";
var LBY_NAME = "The Labyrinth";
var LBY_EDGE = 150;
var LBY_STONE_H = 7.2, LBY_HEDGE_H = 8.2;
var LBY_STONE_EVERY = 720, LBY_HEDGE_EVERY = 120, LBY_DEEP_EVERY = 600, LBY_GROW_S = 7;
function lbyU(x) { return Math.round(x / LBY.U) + LBY.C; }
function lbyM(i) { return (i - LBY.C) * LBY.U; }
function lbyD(i, j) { return Math.max(Math.abs(i - LBY.C), Math.abs(j - LBY.C)); }
function lbyZoneOfUnit(i, j) { return lbyD(i, j) <= LBY_EDGE ? "maze" : "out"; }
function lbyLat(a, b, s) { return (lbyHash(((a * 73856093) ^ (b * 19349663) ^ (s * 83492791)) >>> 0) & 65535) / 65535; }
function lbyNoise(x, y, s) {
var a = Math.floor(x), b = Math.floor(y), fx = x - a, fy = y - b;
fx = fx * fx * (3 - 2 * fx);
fy = fy * fy * (3 - 2 * fy);
var p = lbyLat(a, b, s), q = lbyLat(a + 1, b, s), r = lbyLat(a, b + 1, s), t = lbyLat(a + 1, b + 1, s);
return p + (q - p) * fx + (r - p) * fy + (p - q - r + t) * fx * fy;
}
function lbyMatV(i, j) {
var w = (lbyNoise(i / 23, j / 23, 41) - 0.5) * 14;
return lbyNoise((i + w) / 13, (j - w) / 13, 43) * 0.62 + lbyNoise((i - w) / 5.5, (j + w) / 5.5, 47) * 0.38;
}
function lbyMatAt(i, j) { return lbyMatV(i, j) < 0.5 ? "stone" : "hedge"; }
var LBY_GATE = { x: 0, z: 602 };
var LBY_COURT = { x0: -90, x1: 90, z0: 602, z1: 720 };
var LBY_CARVE = [
["reek", -380, -250, 11, 7, "the Reekmire"],
["stairs", 380, -330, 6, 6, "the Hall of Turned Stairs"],
["hands", -330, 380, 5, 5, "the Shaft of Hands"],
["doors", 0, -400, 6, 4, "the Two Doors"],
["wellcourt", 420, 300, 4, 4, "the Fallen Court"],
["statues", -470, -30, 5, 5, "the Court of Broken Kings"]
];
var LBY_CORE_HALLS = [[0, 0, "columns", 0], [-200, -180, "bath", 1], [220, -120, "foundry", 0], [-180, 220, "scrolls", 0], [230, 250, "crypt", 1],
[120, -300, "garden", 0], [-280, -440, "mines", 1], [460, -120, "platform", 0], [-60, 440, "roots", 0], [340, 40, "roots", 1]];
var LBY_QUERRA = { x: 0, z: 200 };
var LBY_HEDGE_CARVE = [["querra", 0, 200, 3, 3, "Querra's Court"]];
var LBY_TRAPS = [[71, 233], [233, 85], [45, 151], [263, 183], [121, 41], [191, 259], [29, 91], [275, 29]];
var LBY_DEEP = { x: 0, z: 0, n: 8, room: 34, gap: 14, h: 9 };
var LBY_DEEP_Y = -40;
var LBY_HEART_Y = -130, LBY_HEART_R = 66;
var LBY_AGES = [
{ k: "bath", name: "a bathhouse of the old empire", floor: 0xB8B0A0, wall: 0xD8CEB8, trim: 0x8A6A4A, light: 0xFFD8A0, water: 1 },
{ k: "columns", name: "a columned hall of white stone", floor: 0xD8D4C8, wall: 0xE8E4D8, trim: 0xB89A5A, light: 0xFFE8C0, cols: 1 },
{ k: "bulls", name: "a painted hall of bull-leapers", floor: 0xC8A880, wall: 0xE0C8A0, trim: 0xA83A2A, light: 0xFFD8B0, fresco: 1 },
{ k: "crypt", name: "a crypt of the long-dead", floor: 0x5A5650, wall: 0x6A6660, trim: 0x3A3630, light: 0xC8B898, tombs: 1 },
{ k: "sewer", name: "a brick sewer of a city above", floor: 0x4A4038, wall: 0x7A4A38, trim: 0x3A2A22, light: 0xC8B080, brick: 1, water: 1 },
{ k: "foundry", name: "a clockwork foundry", floor: 0x3A3632, wall: 0x5A4A3A, trim: 0xB8863A, light: 0xFFB070, gears: 1 },
{ k: "platform", name: "an underground railway platform, long closed", floor: 0x8A8478, wall: 0xD8D0B8, trim: 0x2A4A6A, light: 0xE8E0C0, tiles: 1 },
{ k: "garage", name: "an empty car park", floor: 0x6A6A68, wall: 0x8A8A86, trim: 0xC8B030, light: 0xE0E8F0, pillars: 1 },
{ k: "scrolls", name: "a library of scrolls", floor: 0x6A4A30, wall: 0x5A3A26, trim: 0xC8A050, light: 0xFFD090, shelves: 1 },
{ k: "garden", name: "a mosaic garden under a painted sky", floor: 0x8AA870, wall: 0x7A9AC8, trim: 0xE8D8A8, light: 0xF0F0E0, plants: 1 },
{ k: "river", name: "a cavern where a black river runs", floor: 0x4A4A48, wall: 0x3A3A3C, trim: 0x5A5A60, light: 0x9AB8E0, water: 2 },
{ k: "mines", name: "old mine workings", floor: 0x5A4A3A, wall: 0x4A3E32, trim: 0x6A4A2A, light: 0xFFC080, props: 1 },
{ k: "roots", name: "a hall the living hedge has broken into", floor: 0x6A5A44, wall: 0x8A8270, trim: 0x4A6A3A, light: 0xE8F0C8, roots: 1 }
];
var LBY_DEEP_FIXED = { oubliette: [7, 1], workshop: [0, 6], slow: [4, 4], entry: [7, 6], heartway: [0, 1] };
var LBY_FOLK = {
warden: { name: "Hollis Wend, Warden of the Gate", persona: "Hollis Wend, the Warden of the Labyrinth's Gate: an old, kind, weathered woman in a long grey coat with a ring of iron keys, who has walked the maze for forty years and still loses her way on Tuesdays. She knows the stone in the maze rearranges every twelve minutes and the hedge that grows all through it every two, the Deep's doors every ten. She has never found the Heart; the old stories say it is not in the middle at all but at the very bottom of everything, under the Deep, and that its way down moves. She warns people of the beasts in the maze and the Deep, that the Gatehouse Court and the Heart are safe, and never gives away the way through.",
greet: "Welcome to the Labyrinth, traveller. The court is safe; past the gate, nothing is. The stones move every twelve minutes, the hedges every two. Nobody I know has found the Heart, and I have looked for forty years. Keep your wits, and keep going.", look: { top: 0x5A5A62, bottom: 0x3A3A40, hat: "none", back: "cloak", backColor: 0x4A4A52 } },
clock: { name: "Old Tamsin, Keeper of the Clock", persona: "Old Tamsin, keeper of the Thirteen-Hour Clock at the Heart of the Labyrinth: a tiny cheerful man with brass spectacles and oil on his fingers, who winds the clock, keeps its thirteen hours and greets everyone who reaches the Heart, the hidden hollow at the very bottom of the Labyrinth, far under the Deep, as though they had come a very long way (they have). He talks about the clock, the Lantern Cup, the Deep above, and the Maker who built it all and was never seen again.",
greet: "You made it! Sit, sit. The clock says you're in good time. Touch the cup when you're ready: it's yours to claim.", look: { top: 0x6A4A2A, bottom: 0x3A2E22, hat: "none" } },
artificer: { name: "The Artificer's echo", persona: "The Artificer's echo: the voice of the Labyrinth's long-gone maker, kept in a brass speaking-head on her workbench in the Deep. Proud, clever, lonely and a little sorry. She built the maze to keep something in, or someone out; she won't say which. She speaks of the living maze, of how it grows and changes on its own now, of the Maker's Mark on every true way in, of the Heart she buried at the bottom of everything (its one way down is a round stone in some room of the Deep, and it moves whenever the doors do), of the thread that never lets its holder be lost (it is hidden down here, somewhere), and of the wings she made and never flew with.",
greet: "Another visitor. The maze let you in, then. It does what it likes these days. What do you want with my workshop?" },
querra: { name: "Querra, the Riddle-Keeper", persona: "Querra, the Riddle-Keeper of the Greenmaze: a great winged lioness of living stone with a calm, old woman's face and slow golden eyes. She keeps her court in the maze south of the middle. She is courteous and patient, never cruel, and very old. She asks one riddle; the right answer and she tells you in which quarter of the Deep the Heart's one way down lies just now (it moves whenever the Deep's doors move, so hurry), the wrong one and the hedges carry you off somewhere else in the maze.",
greet: "Few come this way. Answer me, and I will tell you where the Heart's way down lies, for now. Answer wrongly, and the green carries you away." }
};
var LBY_RIDDLES = [
["I have keys but open no locks; I have space but no room; you can enter, but never go inside. What am I?", "A keyboard", ["A prison", "A house of cards", "A map"]],
["The more of me you take, the more you leave behind. What am I?", "Footsteps", ["Breaths", "Coins", "Years"]],
["I am always ahead of you, and you will never reach me, though you walk all your life toward me. What am I?", "Tomorrow", ["The horizon's edge of a map", "Your shadow at noon", "The Heart of the maze"]],
["I have cities but no houses, forests but no trees, water but no fish. What am I?", "A map", ["A dream", "A painting of the sea", "A desert"]],
["What goes through every door in a house, yet never comes in and never goes out?", "A keyhole", ["A draught", "A ghost", "The hallway"]],
["What can fill a whole room and still take up no space at all?", "Light", ["Silence", "A thought", "The air"]],
["Break me and I am better than before; keep me and I am useless. What am I?", "A record (to be broken)", ["A promise", "An egg", "A spell"]],
["I turn once, and what is out is not getting in; I turn again, and what is in is not getting out. What am I?", "A key", ["A hedge", "A wheel", "The hour hand"]],
["I can be cracked, made, told and played. What am I?", "A joke", ["A code", "A nut", "A lie"]],
["The one who makes me does not need me; the one who buys me does not use me; the one who uses me never knows. What am I?", "A coffin", ["A crown", "A cradle", "A ship"]],
["What has a neck but no head, two arms but no hands?", "A shirt", ["A bottle", "A statue", "A stone guard"]],
["Walk me forward and I am a path; walk me back and I am a way home. Lose me and you are lost. What am I?", "A thread", ["A road", "A wall", "A dream"]]
];
var LBY_DOORS_TALE = "Two doors, two stone guards. One door leads on toward the Heart; the other drops you into the Deep. One guard always tells the truth; the other always lies. You may ask one of them one question.";
var LBY_BEASTS = {
lby_scorchtail: { name: "Scorchtail crawler", body: "kit", arch: "scorpion", scale: 2.4, hp: 85, spd: 3.8, dmg: 11, reach: 3, shot: { r: 14, c: 0xFF9A4A }, spoil: ["Scorchtail's tail-plate", "🦂"], growl: 160 },
lby_weaver: { name: "Hedge-weaver spider", body: "kit", arch: "spider", scale: 3.4, hp: 90, spd: 4.6, dmg: 10, reach: 3.2, spoil: ["Hedge-weaver's silk", "🕸️"], growl: 190 },
lby_thornhound: { name: "Thornhound", body: "kit", arch: "hellhound", hp: 70, spd: 5.4, dmg: 10, reach: 2.2, spoil: ["Thornhound's barbed collar", "🌿"], growl: 140 },
lby_mazegob: { name: "Maze goblin", body: "person", species: "goblin", arm: "dagger", scale: 0.85, hp: 38, spd: 4.8, dmg: 7, reach: 1.7, spoil: ["A goblin's stolen compass", "🧭"], growl: 310 },
lby_wallgolem: { name: "Wall-stone troll", body: "kit", arch: "troll", hp: 190, spd: 2.6, dmg: 17, reach: 2.8, big: 1, spoil: ["A troll's heart-stone", "🪨"], growl: 90 },
lby_minotaur: { name: "Warder of the Deep", body: "person", species: "giant", arm: "battleaxe", scale: 1.5, hp: 220, spd: 3.6, dmg: 18, reach: 3, big: 1,
look: { top: 0x4A3A2A, bottom: 0x3A2E22, hat: "helmet", hatColor: 0x6A5A3A }, spoil: ["The Warder's brass ring", "💍"], growl: 80 },
lby_deepshade: { name: "Deep-way shade", body: "kit", arch: "wraith", glow: 0x6A8AE0, hp: 55, spd: 3.8, dmg: 10, reach: 2, shot: { r: 14, c: 0x8AA0F0 }, spoil: ["A shade's cold lantern-glass", "🌑"], growl: 150 },
lby_automaton: { name: "Broken automaton", body: "kit", robot: 1, arch: "ogre", arm: "mace", hp: 110, spd: 3.0, dmg: 13, reach: 2.4, spoil: ["An automaton's brass gear", "⚙️"], growl: 240 }
};
var LBY_BEASTS_AT = {
maze: ["lby_mazegob", "lby_weaver", "lby_wallgolem", "lby_thornhound", "lby_scorchtail", "lby_mazegob", "lby_weaver"],
deep: ["lby_minotaur", "lby_deepshade", "lby_automaton", "lby_deepshade", "lby_mazegob"],
reach: ["lby_minotaur", "lby_wallgolem", "lby_weaver", "lby_thornhound", "lby_mazegob", "lby_scorchtail", "lby_automaton"]
};
function lbyZoneLevel(base) { var z = LBY.zone; if (z === "gate" || z === "heart" || z === "inside")
return 0; if ((z === "deep" || z === "reach") && base >= 3)
return 4; return base; }
var LBY_RB = 20, LBY_REACH_HALL = 0.14, LBY_RING_WAYS = 10;
var LBY_COURT_U = { i0: 128, i1: 172, j0: 301, j1: 330 };
var LBY_COURT_ARCH = [];
var LBY_ARCH_Z = 660;
var LBY_OPEN = { gate: [151, 300] };
LBY_GATE = { x: lbyM(151), z: lbyM(300) };
LBY_QUERRA = { x: lbyM(151), z: lbyM(201) };
function lbyGridMake() { return __ZC(354, 0, this, arguments, new.target); }
function lbyIdx(i, j) { return i * LBY.N + j; }
function lbyIn(i, j) { return i >= 0 && j >= 0 && i < LBY.N && j < LBY.N; }
function lbyCarveJob(kind, seed, braid, seemP) { return __ZC(354, 1, this, arguments, new.target); }
function lbyCarve(kind, seed, braid, seemP) { var J = lbyCarveJob(kind, seed, braid, seemP); J.step(Infinity); return J.res; }
function lbyCarveFor(kind, ep) { return lbyCarveJob(kind, ep * 7919 + (kind === "stone" ? 101 : 202), kind === "stone" ? 0.07 : 0.05, kind === "stone" ? 0.03 : 0); }
function lbyPreTick() { return __ZC(354, 2, this, arguments, new.target); }
function lbyNow() { return Date.now() / 1000; }
function lbyEpoch(every) { return Math.floor(lbyNow() / every) + (LBY.shift || 0) * 100003; }
function lbySecsLeft(every) { var t = lbyNow(); return Math.ceil(every - (t % every)); }
function lbyEpochKind(kind) { return lbyEpoch(kind === "stone" ? LBY_STONE_EVERY : LBY_HEDGE_EVERY); }
function lbyApply(kind, animate) { return __ZC(354, 3, this, arguments, new.target); }
function lbySolidUnit(i, j) {
if (!lbyIn(i, j))
return lbyReachSolid(i, j);
var k = lbyIdx(i, j), G = LBY.grid;
if (G.seem[k])
return false;
var g = G.grow[k];
if (G.wall[k])
return g > 0.3;
return g > 0.35 && g < 0.999;
}
function lbyWallAt(x, z) { return lbySolidUnit(lbyU(x), lbyU(z)); }
function lbyNearestOpen(x, z) { return __ZC(354, 4, this, arguments, new.target); }
function lbyPath(x0, z0, x1, z1, limit) { return __ZC(354, 5, this, arguments, new.target); }
var LBY_RCACHE = new Map();
var LBY_REACH_LIM = 11000;
function lbyCoreU(i, j) { return i >= 0 && j >= 0 && i < LBY.N && j < LBY.N; }
function lbyCourtU(i, j) { var C = LBY_COURT_U; return i >= C.i0 && i <= C.i1 && j >= C.j0 && j <= C.j1; }
function lbyBlockHash(bx, by, salt) { return lbyHash(((bx * 73856093) ^ (by * 19349663) ^ (salt * 83492791)) >>> 0); }
function lbyBlockKind(bx, by) {
var nearMid = bx >= -1 && bx <= 15 && by >= -1 && by <= 17;
return { hall: !nearMid && (lbyBlockHash(bx, by, 9) % 1000) < LBY_REACH_HALL * 1000 };
}
function lbyHallOf(bx, by) {
var K = lbyBlockKind(bx, by);
if (!K.hall)
return null;
var O = { i: bx * LBY_RB, j: by * LBY_RB }, h = lbyBlockHash(bx, by, 13);
return { bx: bx, by: by, x: lbyM(O.i + 10), z: lbyM(O.j + 10), age: LBY_AGES[h % LBY_AGES.length].k, down: (h >>> 8) % 100 < 34 };
}
function lbyReachData(bx, by) { return __ZC(354, 6, this, arguments, new.target); }
function lbyReachAt(i, j) { var bx = Math.floor(i / LBY_RB), by = Math.floor(j / LBY_RB); return { D: lbyReachData(bx, by), k: (i - bx * LBY_RB) * LBY_RB + (j - by * LBY_RB) }; }
function lbyReachSolid(i, j) {
if (Math.abs(i - LBY.C) > LBY_REACH_LIM || Math.abs(j - LBY.C) > LBY_REACH_LIM)
return true;
var A = lbyReachAt(i, j), D = A.D, k = A.k;
if (D.fix[k] === 3)
return true;
var g = D.grow[k];
if (D.wall[k])
return g > 0.3;
return g > 0.35 && g < 0.999;
}
function lbyReachWall(i, j) { var A = lbyReachAt(i, j); return A.D.fix[A.k] === 3 || !!A.D.wall[A.k]; }
function lbyDeepRoomXZ(r, c) { var D = LBY_DEEP, step = D.room + D.gap, off = (D.n - 1) * step / 2; return { x: D.x + c * step - off, z: D.z + r * step - off }; }
function lbyDeepAge(r, c) {
var F = LBY_DEEP_FIXED;
for (var f in F)
if (F[f][0] === r && F[f][1] === c)
return f;
return LBY_AGES[(r * 5 + c * 3 + ((r * c) % 4)) % LBY_AGES.length].k;
}
function lbyDeepDoors(ep) { return __ZC(354, 7, this, arguments, new.target); }
function lbyDoorKey(r1, c1, r2, c2) { if (r2 < r1 || (r2 === r1 && c2 < c1)) {
var a = r1, b = c1;
r1 = r2;
c1 = c2;
r2 = a;
c2 = b;
} return r1 + "," + c1 + (r2 === r1 ? "e" : "s"); }
function lbyTex(name, rep) { return __ZC(354, 8, this, arguments, new.target); }
function lbyNorm(name, rep) {
var key = name + ":n:" + rep;
if (LBY.tex[key])
return LBY.tex[key];
var t = new THREE.TextureLoader().load("assets/textures/maze/" + name + "-n.jpg");
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rep, rep);
return (LBY.tex[key] = t);
}
function lbySurf(name, tint, rep, o) { return __ZC(354, 9, this, arguments, new.target); }
function lbyC(col, o) { return __ZC(354, 10, this, arguments, new.target); }
function lbyGlowM(col) { var k = "g" + col; return LBY.mats[k] || (LBY.mats[k] = wB(col, { fog: false })); }
function lbyRough(w, h, d, sx, sy, sz, amp, topAmp, round, seed, uvM) { return __ZC(354, 11, this, arguments, new.target); }
function lbyPieces() { return __ZC(354, 12, this, arguments, new.target); }
function lbyWallMats() { return __ZC(354, 13, this, arguments, new.target); }
var LBY_CS = 25;
function lbyChunks(G) { return __ZC(354, 14, this, arguments, new.target); }
function lbyUnitMat(k) { var kd = LBY.grid.kind[k]; if (kd === 2)
return "stone"; if (kd === 3)
return "hedge"; var N = LBY.N, i = (k / N) | 0; return lbyMatAt(i, k - i * N); }
function lbyHash(k) { var h = (k * 2654435761) >>> 0; h ^= h >>> 15; h = (h * 2246822519) >>> 0; h ^= h >>> 13; return h >>> 0; }
function lbyHeightOf(k, mat) { var h = lbyHash(k); return (mat === "hedge" ? 0.94 : 0.9) + ((h >>> 4) % 100) / 100 * 0.14; }
function lbySetInst(mesh, idx, k, m4, q, e, v, s) { return __ZC(354, 15, this, arguments, new.target); }
function lbySetCap(mesh, idx, k, m4, q, e, v, s) { return __ZC(354, 16, this, arguments, new.target); }
var LBY_T = { m4: null, q: null, e: null, v: null, s: null };
function lbyRedraw(k) { return __ZC(354, 17, this, arguments, new.target); }
function lbySeemDraw() { return __ZC(354, 18, this, arguments, new.target); }
function lbyChunkVis(L) { return __ZC(354, 19, this, arguments, new.target); }
function lbyGroundBuild(G) { return __ZC(354, 20, this, arguments, new.target); }
function lbyEarthTint() { return __ZC(354, 21, this, arguments, new.target); }
function lbyEarthTick(L) {
var E = LBY.earth;
if (!E)
return;
var x = Math.round(L.x / 70) * 70, z = Math.round(L.z / 70) * 70;
if (E.position.x !== x || E.position.z !== z || !LBY.earthAt) {
E.position.set(x, 0, z);
LBY.earthAt = 1;
lbyEarthTint();
}
E.visible = !lbyBelow();
}
var LBY_RV = { slots: [], cx: null, cz: null, anim: [], at: 0 };
function lbyReachRadius() { return LBY.lite ? 2 : 3; }
function lbySlotGeo(base) { return __ZC(354, 22, this, arguments, new.target); }
function lbySlotMake() { return __ZC(354, 23, this, arguments, new.target); }
function lbySlotFill(S) { return __ZC(354, 24, this, arguments, new.target); }
function lbyReachWindow(L, force) { return __ZC(354, 25, this, arguments, new.target); }
function lbyReachAnimTick(dt) { return __ZC(354, 26, this, arguments, new.target); }
function lbyReachVis(L) {
var far = LBY.lite ? 150 : 320, off = lbyBelow();
LBY_RV.slots.forEach(function (S) {
var on = !off && !!S.key;
if (on) {
var D = S.D, cx = lbyM(D.bx * LBY_RB + LBY_RB / 2), cz = lbyM(D.by * LBY_RB + LBY_RB / 2);
on = Math.max(0, Math.hypot(L.x - cx, L.z - cz) - 58) < far;
}
if (S.root.visible !== on)
S.root.visible = on;
});
}
function lbyReachForget() { LBY_RV.slots = []; LBY_RV.cx = null; LBY_RV.cz = null; LBY_RV.anim = []; LBY_RV.geo = null; LBY_RCACHE.clear(); }
var LBY_ENV = {
gate: { top: 0x5E86C4, low: 0xF0D2A8, fog: 0xE0C8A8, fogD: 0.0022, sun: 1.05, sunCol: 0xFFE2B4, sunDir: [-0.5, 0.5, 0.45], hemi: 0.62, hemiCol: 0xD8E2F2, hemiGround: 0x5A4A38 },
stone: { top: 0x5A80BE, low: 0xE8C49C, fog: 0xD8BC98, fogD: 0.0034, sun: 1.0, sunCol: 0xFFDCA8, sunDir: [-0.5, 0.5, 0.45], hemi: 0.6, hemiCol: 0xD0DCEE, hemiGround: 0x584836 },
hedge: { top: 0x8AA0B4, low: 0xC8D2C8, fog: 0xC4CEC4, fogD: 0.0105, sun: 0.7, sunCol: 0xF4ECD8, sunDir: [-0.4, 0.62, 0.4], hemi: 0.72, hemiCol: 0xD8E4E0, hemiGround: 0x3A4A30 },
maze: { top: 0x6A8AB8, low: 0xD8C8B0, fog: 0xCEC6B0, fogD: 0.0058, sun: 0.88, sunCol: 0xFAE4C0, sunDir: [-0.45, 0.56, 0.42], hemi: 0.68, hemiCol: 0xD4E0E8, hemiGround: 0x4A4A34 },
reach: { top: 0x5A78A8, low: 0xC8B8A4, fog: 0xB8AC9C, fogD: 0.0062, sun: 0.95, sunCol: 0xFFDCA8, sunDir: [-0.5, 0.5, 0.45], hemi: 0.78, hemiCol: 0xD0DCEE, hemiGround: 0x5A4A38 },
heart: { top: 0x10182A, low: 0x6A5038, fog: 0x3A2E24, fogD: 0.0045, sun: 0.7, sunCol: 0xFFE0A8, sunDir: [0.2, 0.9, 0.1], hemi: 0.75, hemiCol: 0xF0DCB8, hemiGround: 0x4A3A28 },
deep: { top: 0x0A0C12, low: 0x12141C, fog: 0x0E1018, fogD: 0.022, sun: 0.22, sunCol: 0xC8B8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.42, hemiCol: 0x8A90A8, hemiGround: 0x2A2420 },
inside: { top: 0x1A1814, low: 0x2A2620, fog: 0x2A2620, fogD: 0.008, sun: 0.35, sunCol: 0xFFE0B0, sunDir: [0.2, 0.9, 0.1], hemi: 0.6, hemiCol: 0xE8D8C0, hemiGround: 0x3A3026 }
};
function lbyEnvNow() {
var E = LBY_ENV[LBY.zone] || LBY_ENV.maze;
if (LBY.lite && E.fogD < 0.006)
E = Object.assign({}, E, { fogD: 0.006 });
return E;
}
var LBY_MIST_TEX = null;
function lbyMistTex() { return __ZC(354, 27, this, arguments, new.target); }
function lbyMist(G) { return __ZC(354, 28, this, arguments, new.target); }
function lbyGoldPlace() { return __ZC(354, 29, this, arguments, new.target); }
function lbyBox(w, h, d, mat, x, y, z, parent, solid) { var m = wBox(w, h, d, mat, x, y, z, parent || LBY.G); if (solid)
LBY.solids.push({ x: x, z: z, hw: w / 2, hd: d / 2, b: solid === 2 ? y - h / 2 : undefined, h: solid === 2 ? h : undefined }); return m; }
function lbyCylS(r, h, mat, x, y, z, parent, solid, seg) { var m = wCyl(r, r, h, mat, x, y, z, parent || LBY.G, seg || (LBY.lite ? 10 : 18)); if (solid)
LBY.solids.push({ x: x, z: z, r: r }); return m; }
function lbyFloorAt(x, z, hw, hd, y) { LBY.floors.push({ x: x, z: z, hw: hw, hd: hd, y: y }); }
function lbyRoomAt(name, x, z, hw, hd, zone) { (LBY.rooms || (LBY.rooms = [])).push({ name: name, x: x, z: z, hw: hw, hd: hd, zone: zone }); }
function lbySpot(x, z, r, name, verb, fn, y) { var s = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; LBY.spots.push(s); return s; }
function lbyLamp(x, z, y, col, parent) { return __ZC(354, 30, this, arguments, new.target); }
function lbyPerson(key, x, z, ry, o) { return __ZC(354, 31, this, arguments, new.target); }
function lbySign(lines, w, h, x, y, z, ry, parent) { var s = wSign(lines, w, h, "#2A241C", "#E8D8B0"); s.position.set(x, y, z); s.rotation.y = ry || 0; (parent || LBY.G).add(s); return s; }
function lbyArch(x, z, ry, w, h, mat, parent) { return __ZC(354, 32, this, arguments, new.target); }
function lbyCourt(G) { return __ZC(354, 33, this, arguments, new.target); }
function lbyCourtCamp(G) { return __ZC(354, 34, this, arguments, new.target); }
function lbyBench(G, x, z, ry) { return __ZC(354, 35, this, arguments, new.target); }
var LBY_DIAL = null;
function lbyDialTex() { return __ZC(354, 36, this, arguments, new.target); }
var LBY_MARK_TEX = null;
function lbyMarkTex() {
if (LBY_MARK_TEX)
return LBY_MARK_TEX;
LBY_MARK_TEX = wTex(128, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "rgba(150,200,255,.95)";
x.lineWidth = 7;
x.strokeRect(12, 12, W - 24, H - 24);
x.strokeStyle = "rgba(240,210,140,.95)";
x.lineWidth = 6;
x.beginPath();
for (var t = 0; t < 6 * Math.PI; t += 0.1) {
var r = 4 + t * 2.4, px = W / 2 + Math.cos(t) * r, py = H / 2 + Math.sin(t) * r;
if (t)
x.lineTo(px, py);
else
x.moveTo(px, py);
}
x.stroke();
});
return LBY_MARK_TEX;
}
function lbyMarkMesh(parent, x, y, z, s) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(s, s), new THREE.MeshBasicMaterial({ map: lbyMarkTex(), transparent: true, depthWrite: false, fog: false, side: THREE.DoubleSide, opacity: 0.85 }));
m.position.set(x, y, z);
parent.add(m);
return m;
}
function lbyCarveAt(k) { for (var i = 0; i < LBY_CARVE.length; i++)
if (LBY_CARVE[i][0] === k)
return { x: lbyM(lbyU(LBY_CARVE[i][1])), z: lbyM(lbyU(LBY_CARVE[i][2])), hw: LBY_CARVE[i][3] * LBY.U, hd: LBY_CARVE[i][4] * LBY.U, name: LBY_CARVE[i][5] }; return null; }
function lbyStonewend(G) { return __ZC(354, 37, this, arguments, new.target); }
function lbyHand(mat) {
var g = new THREE.Group();
wBox(0.5, 0.7, 0.2, mat, 0, 0.35, 0, g);
for (var f = 0; f < 4; f++) {
var fg = wBox(0.1, 0.42, 0.1, mat, -0.18 + f * 0.12, 0.9, 0.02, g);
fg.rotation.x = 0.3;
}
var th = wBox(0.1, 0.32, 0.1, mat, 0.3, 0.55, 0.05, g);
th.rotation.z = -0.7;
wBox(0.3, 0.8, 0.2, mat, 0, -0.35, 0, g);
return g;
}
function lbyStatue(mat) { return __ZC(354, 38, this, arguments, new.target); }
function lbyQuerraBuild(G) { return __ZC(354, 39, this, arguments, new.target); }
function lbyHeartBuild(G0) { return __ZC(354, 40, this, arguments, new.target); }
function lbyHollow(G) { return __ZC(354, 41, this, arguments, new.target); }
function lbyHeart(G) { return __ZC(354, 42, this, arguments, new.target); }
function lbyCoreHalls(G) { return __ZC(354, 43, this, arguments, new.target); }
var LBY_IN = {
gatehouse: { x: 50000, z: 0, name: "the Gatehouse" },
stairs: { x: 51000, z: 0, name: "the Hall of Turned Stairs" }
};
function lbyInsides(G) { return __ZC(354, 44, this, arguments, new.target); }
function lbyMapTex() {
if (LBY.mapTex)
return LBY.mapTex;
var cv = document.createElement("canvas");
cv.width = cv.height = LBY.lite ? 300 : 600;
LBY.mapCv = cv;
LBY.mapTex = new THREE.CanvasTexture(cv);
lbyMapPaint();
return LBY.mapTex;
}
function lbyMapPaint() { return __ZC(354, 45, this, arguments, new.target); }
function lbyDeepBuild(G0) { return __ZC(354, 46, this, arguments, new.target); }
function lbyRoomShell(p, A, g, doors, size, h) { return __ZC(354, 47, this, arguments, new.target); }
function lbyDeepRooms(G) { return __ZC(354, 48, this, arguments, new.target); }
function lbyDim(col, k) { var c = new THREE.Color(col); c.multiplyScalar(k); return c.getHex(); }
function lbyBrickM(col) { var k = "brick" + col; if (LBY.mats[k])
return LBY.mats[k]; var t = texOf("brick"); var m = new THREE.MeshLambertMaterial({ color: col, map: t || null }); return (LBY.mats[k] = m); }
function lbyAgeDef(age) { return __ZC(354, 49, this, arguments, new.target); }
function lbyAgeName(age) { return "the Deep: " + lbyAgeDef(age).name; }
function lbyAgeDress(age, A, p, g) { return __ZC(354, 50, this, arguments, new.target); }
var LBY_FRESCO = null;
function lbyFrescoTex() { return __ZC(354, 51, this, arguments, new.target); }
function lbyDeepApply(say) { return __ZC(354, 52, this, arguments, new.target); }
function lbyDeepSealedAt(x, z) {
for (var k in LBY.deepDoors) {
var d = LBY.deepDoors[k];
if (d.open)
continue;
if (Math.abs(x - d.x) < d.hw + 0.3 && Math.abs(z - d.z) < d.hd + 0.3)
return true;
}
return false;
}
function lbyDeepRoomAt(x, z) { var D = LBY_DEEP, step = D.room + D.gap, off = (D.n - 1) * step / 2; var c = Math.round((x - D.x + off) / step), r = Math.round((z - D.z + off) / step); if (r < 0 || c < 0 || r >= D.n || c >= D.n)
return null; return { r: r, c: c }; }
function lbyDeepVis(L) { return __ZC(354, 53, this, arguments, new.target); }
function lbyHeartWayBuild(G) { return __ZC(354, 54, this, arguments, new.target); }
function lbyHeartWayAt(ep) { return __ZC(354, 55, this, arguments, new.target); }
function lbyHeartWayPlace(ep) {
var W = lbyHeartWayAt(ep);
LBY.heartWay = W;
if (LBY.heartWayG)
LBY.heartWayG.position.set(W.x, 0, W.z);
if (LBY.heartWaySpot) {
LBY.heartWaySpot.x = W.x;
LBY.heartWaySpot.z = W.z;
}
}
function lbyHeartWayQuarter() { var W = LBY.heartWay; if (!W)
return "nowhere"; var h = LBY_DEEP.n / 2; return (W.r < h ? "north" : "south") + "-" + (W.c < h ? "west" : "east"); }
function lbyHeartWayTick(L) {
var m = LBY.hwMark, W = LBY.heartWay;
if (!m || !W)
return;
var d = LBY.zone === "deep" ? Math.hypot(L.x - W.x, L.z - W.z) : 99, op = Math.max(0, Math.min(0.6, (6 - d) / 4));
if (Math.abs(m.material.opacity - op) > 0.01)
m.material.opacity += (op - m.material.opacity) * 0.2;
m.visible = m.material.opacity > 0.01;
}
var LBY_DEEP_LONG = [[0, 3, 0, -1, "north"], [3, 7, 1, 0, "east"], [7, 4, 0, 1, "south"], [4, 0, -1, 0, "west"]];
function lbyLongStair(g, p, q) { return __ZC(354, 56, this, arguments, new.target); }
function lbyReachOut(dx, dz, msg) {
var R = Math.random(), dist = 900 + R * 700, side = (Math.random() - 0.5) * 600, x = dx * dist - dz * side, z = dz * dist + dx * side, q = lbyNearestOpen(x, z);
lbyMove(q.x, q.z, Math.atan2(-dx, -dz), msg, 0);
}
function lbyToDeepFrom(x, z, msg) { return __ZC(354, 57, this, arguments, new.target); }
LBY.halls = {};
function lbyHallBuildAt(S, X, Y) { return __ZC(354, 58, this, arguments, new.target); }
function lbyHallDrop(S) { return __ZC(354, 59, this, arguments, new.target); }
function lbyHallAt(x, z, pad) { pad = pad || 0; for (var k in LBY.halls) {
var H = LBY.halls[k];
if (Math.abs(x - H.x) <= 22 + pad && Math.abs(z - H.z) <= 22 + pad)
return H;
} return null; }
function lbyInGrid(x, z) { return Math.abs(x) < 601.9 && Math.abs(z) < 601.9; }
function lbyInCourt(x, z) { return x > LBY_COURT.x0 && x < LBY_COURT.x1 && z >= 601.9 && z < LBY_COURT.z1; }
function lbyHeartFeet(feet) { return feet !== undefined && feet !== null && feet < LBY_HEART_Y + 40; }
function lbyDeepFeet(feet) { return feet !== undefined && feet !== null && feet < LBY_DEEP_Y + 20 && !lbyHeartFeet(feet); }
function lbyBelow() { var z = LBY.zone; return z === "deep" || z === "inside" || z === "heart"; }
function lbyZoneAt(x, z, feet) { return __ZC(354, 60, this, arguments, new.target); }
function lbyRoomName(x, z) { var R = LBY.rooms || []; for (var i = 0; i < R.length; i++) {
var r = R[i];
if (Math.abs(x - r.x) <= r.hw && Math.abs(z - r.z) <= r.hd)
return r.name;
} return null; }
function lbyPlaceName(x, z) { return __ZC(354, 61, this, arguments, new.target); }
function lbyFloorsAt(list, x, z, f) { var best = null; for (var i = 0; i < list.length; i++) {
var F = list[i];
if (Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd && F.y <= f + 0.75 && (best === null || F.y > best))
best = F.y;
} return best; }
function lbyGround(x, z, feet) { return __ZC(354, 62, this, arguments, new.target); }
function lbyDeepWalkAt(x, z) { var W = LBY.walk || []; for (var i = 0; i < W.length; i++) {
var w = W[i];
if (Math.abs(x - w.x) <= w.hw && Math.abs(z - w.z) <= w.hd)
return true;
} return false; }
function lbyBlock(x, z, feet) { return __ZC(354, 63, this, arguments, new.target); }
function lbyVeil() {
if (LBY.veil)
return LBY.veil;
var v = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;background:#0A0806;opacity:0;pointer-events:none;transition:opacity .7s ease;z-index:43";
document.body.appendChild(v);
LBY.veil = v;
return v;
}
function lbyMove(x, z, yawTo, msg, y) { return __ZC(354, 64, this, arguments, new.target); }
function lbyToCourt(msg) { lbyMove(LBY.home.x, LBY.home.z - 6, 0, msg || "<b>The Gatehouse Court.</b> Safe, for now."); }
function lbyToDeep(at, msg) {
var D = LBY_DEEP_FIXED[at] || LBY_DEEP_FIXED.oubliette, p = lbyDeepRoomXZ(D[0], D[1]);
lbyMove(p.x, p.z + (at === "entry" ? 6 : 4), 0, msg || "<b>The Deep.</b> Rooms from every age, and doors that will not stay as they are. It is Deadly down here.", LBY_DEEP_Y);
}
function lbyInside(k) { return __ZC(354, 65, this, arguments, new.target); }
function lbyOut(k) {
if (k === "gatehouse")
lbyMove(52 - 17 - 3, LBY_GATE.z + 52, Math.PI / 2, "Back out in the Gatehouse Court.");
else {
var S = lbyCarveAt("stairs");
lbyMove(S.x, S.z + 14, Math.PI, "Back out in the maze, by the Hall of Turned Stairs.");
}
}
function lbyTurnStair(i) {
var L = LBY.landings[i];
if (!L)
return;
lbyMove(L.x, L.z, Math.random() * Math.PI * 2, i ? "<b>The room turns.</b> What was a wall is a floor; you are standing on landing " + i + " of 5." : "<b>The room turns</b> and sets you back on the floor.", L.y);
}
function lbyRandomStone(nearMid, mat) { return __ZC(354, 66, this, arguments, new.target); }
function lbyRandomHedgeEdge() { return lbyRandomStone(false, "hedge"); }
function lbyStairsTop() { var p = lbyRandomStone(false); lbyMove(p.x, p.z, Math.random() * 6.28, "<b>Through the door at the top</b>, and the door is gone behind you. You are somewhere in the maze. Where, exactly, nobody could say."); }
function lbyHandsCard() { return __ZC(354, 67, this, arguments, new.target); }
function lbyDoorsCard() { return __ZC(354, 68, this, arguments, new.target); }
function lbyRiddleCard() { return __ZC(354, 69, this, arguments, new.target); }
function lbyRunCard() { return __ZC(354, 70, this, arguments, new.target); }
function lbyCupCard() { return __ZC(354, 71, this, arguments, new.target); }
function lbyClaim(kind) { return __ZC(354, 72, this, arguments, new.target); }
function lbyMapCard() { return __ZC(354, 73, this, arguments, new.target); }
var LBY_LOST = ["a single glove, embroidered with someone's initials", "a brass button", "a child's drawing of the hedges", "a pocket watch that runs backwards", "half a sandwich, still fresh (somehow)", "a compass that points at you", "a key with no lock anywhere in the maze", "a ribbon, much longer than it looks", "a tin soldier", "a letter addressed to 'whoever finds this'"];
function lbyLostCard() { return __ZC(354, 74, this, arguments, new.target); }
function lbyData() { var d = store.lby; if (!d || typeof d !== "object")
d = store.lby = {}; if (!Array.isArray(d.keeps))
d.keeps = []; return d; }
function lbyKeep(icon, name, why) { var d = lbyData(); d.keeps.push({ i: icon, n: name, w: why || "", at: Date.now() }); if (d.keeps.length > 200)
d.keeps.splice(0, d.keeps.length - 200); try {
if (typeof save === "function")
save();
}
catch (e) { } }
function lbyChangeTick() { return __ZC(354, 75, this, arguments, new.target); }
function lbyAnimate(keys, L) {
var G = LBY.grid, near = [], far = LBY.farQ || (LBY.farQ = []);
keys.forEach(function (k) { var i = (k / LBY.N) | 0, j = k - i * LBY.N; if (Math.hypot(lbyM(i) - L.x, lbyM(j) - L.z) < (LBY.lite ? 140 : 240))
near.push(k);
else {
G.grow[k] = 1;
far.push(k);
} });
LBY.anim = LBY.anim.concat(near);
}
function lbyFarTick() {
var Q = LBY.farQ;
if (!Q || !Q.length)
return;
if (!LBY.chunks) {
Q.length = 0;
return;
}
var n = Math.min(Q.length, LBY.lite ? 250 : 500);
for (var i = 0; i < n; i++)
lbyRedraw(Q[i]);
Q.splice(0, n);
}
function lbyAnimTick(dt) { return __ZC(354, 76, this, arguments, new.target); }
function lbyRedrawGrow(k) {
var G = LBY.grid;
if (!G.wall[k] && G.grow[k] < 1) {
var keepG = G.grow[k];
G.wall[k] = 1;
lbyRedraw(k);
G.wall[k] = 0;
G.grow[k] = keepG;
return;
}
lbyRedraw(k);
}
function lbyBehindTick(L) { return __ZC(354, 77, this, arguments, new.target); }
function lbyNudgeTick(L) { return __ZC(354, 78, this, arguments, new.target); }
function lbyTick(dt) { return __ZC(354, 79, this, arguments, new.target); }
function lbyMins(s) { var m = Math.floor(s / 60), r = s % 60; return m ? m + "m " + (r < 10 ? "0" : "") + r + "s" : r + "s"; }
function lbyFxTick(dt, L) { return __ZC(354, 80, this, arguments, new.target); }
function lbyMistPlace(L) { return __ZC(354, 81, this, arguments, new.target); }
function lbyFlipTick(dt, L) { return __ZC(354, 82, this, arguments, new.target); }
function lbyXR() { try {
return !!(renderer && renderer.xr && renderer.xr.isPresenting);
}
catch (e) {
return false;
} }
function lbyThreadTick(dt, L) { return __ZC(354, 83, this, arguments, new.target); }
function lbyBuild(G) { return __ZC(354, 84, this, arguments, new.target); }
function lbyHome() { worldHome("<b>Out of the Labyrinth.</b> For a moment, every street looks like it might move."); }
if (typeof worldDef === "function")
worldDef(LBY_KEY, {
base: LBY.base, far: 3000, ownSky: true, tone: 300,
env: function () { return lbyEnvNow(); },
build: function (G) { lbyBuild(G); },
enter: function (opt) { return __ZC(354, 85, this, arguments, new.target); },
leave: function () { LBY.run = null; if (LBY.veil)
LBY.veil.style.opacity = "0"; LBY.moving = false; LBY.flip = 0; try {
camera.rotation.z = 0;
}
catch (e) { } },
ground: function (x, z, feet) { return lbyGround(x, z, feet); },
block: function (x, z, feet) { return lbyBlock(x, z, feet); },
tick: function (dt) { lbyTick(dt); },
back: function () { lbyHome(); }
});
function lbyGo(opt) { return worldGo(LBY_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(LBY_KEY) < 0)
WLG.keys.push(LBY_KEY);
function lbyForget() { return __ZC(354, 86, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () {
var f = worldLetGo;
worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === LBY_KEY)
lbyForget(); return r; };
})();
var LBYD = { g: null, on: false };
function lbyHallSpot() {
if (typeof hallRealm !== "function" || typeof blockOrigin !== "function")
return null;
var r = hallRealm();
if (!r || !r.grid || (store.here || 0) !== r.id)
return null;
var h = blockOrigin(r.grid.bx, r.grid.bz);
var n = 1;
try {
n = hubDoorList().filter(function (d) { return d.to !== "hall"; }).length || 1;
}
catch (e) { }
var best = -Math.PI / 2, bd = 9;
for (var i = 0; i < n; i++) {
var a = ((i + 0.5) / n) * Math.PI * 2, d = Math.abs(Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2)));
if (d < bd) {
bd = d;
best = a;
}
}
return { x: h.x + Math.cos(best) * 29.5, z: h.z + Math.sin(best) * 29.5, a: best };
}
function lbyHallTick() {
if (WLD.on || store.inside || !walkMode) {
if (LBYD.g)
LBYD.g.visible = false;
if (LBYD.on) {
LBYD.on = false;
worldPromptCity(null);
}
return;
}
var s = lbyHallSpot();
if (!s) {
if (LBYD.g)
LBYD.g.visible = false;
if (LBYD.on) {
LBYD.on = false;
worldPromptCity(null);
}
return;
}
if (!LBYD.g) {
var g = new THREE.Group(), stone = wM(0x8A8478), hedge = wM(0x3E6A34);
[-1, 1].forEach(function (k) { wBox(1.1, 4.6, 1.1, stone, k * 2.1, 2.3, 0, g); for (var b = 0; b < 6; b++)
wSph(0.5, hedge, k * 2.1 + (Math.random() - 0.5) * 0.6, 0.6 + b * 0.75, 0.45, g, 7); });
for (var i = 0; i <= 8; i++) {
var a = i / 8 * Math.PI, b2 = wBox(0.8, 0.6, 1.1, stone, Math.cos(a) * 2.1, 4.6 + Math.sin(a) * 1.6, 0, g);
b2.rotation.z = a - Math.PI / 2;
}
wBox(3, 4.6, 0.18, wM(0x2A2420), 0, 2.3, 0, g);
lbyMarkMesh(g, 0, 2.6, 0.12, 1.4);
var sg = wSign(["THE LABYRINTH", "a maze that never holds still · press E"], 3.2, 0.8, "#2A241C", "#E8D8B0");
sg.position.set(0, 7.2, 0.5);
g.add(sg);
var gl = wGlow(0x9AC8FF, 3.5, 0.3);
gl.position.set(0, 2.6, 0.4);
g.add(gl);
scene.add(g);
LBYD.g = g;
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
LBYD.g.visible = true;
LBYD.g.position.set(s.x, 0, s.z);
LBYD.g.rotation.y = -s.a - Math.PI / 2;
if (d < 3.6) {
if (!LBYD.on) {
LBYD.on = true;
worldPromptCity("<b>The Labyrinth</b> · <b>press E</b> to step through", lbyFromHall);
}
}
else if (LBYD.on) {
LBYD.on = false;
worldPromptCity(null);
}
}
function lbyFromHall() {
worldPromptCity(null);
LBYD.on = false;
var s = lbyHallSpot(), P = camera.position;
lbyGo(s ? { from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } } : {});
}
var LBY_MARKS = [
{ at: "city", hint: "far out in the Nightmare Wilds, beyond the War Gate's side of the city", seed: function () { if (typeof ATLC === "undefined" || !ATLC || typeof atlRing !== "function")
return null; var W = atlRing("wilds"); if (!W)
return null; var a = 0.19 + 6.5 * Math.PI / 4 + 0.21, r = W.S + 260; return [Math.cos(a) * r, Math.sin(a) * r]; } },
{ at: "greenwold", hint: "in the Greenwold's Old Wood, low on a stone among the roots", seed: function () { return [-62, -268]; } },
{ at: "underdark", hint: "in the Underdark, on a fallen block in the cavern", seed: function () { return [240, -330]; } }
];
var LBYM = { g: {}, spot: {}, on: null };
function lbyMarkSpot(M) {
var key = M.at + "@" + (WLD.w && WLD.w.g ? WLD.w.g.uuid : "city");
if (LBYM.spot[M.at] && LBYM.spot[M.at].key === key)
return LBYM.spot[M.at];
var s = M.seed();
if (!s || typeof mmGround !== "function")
return null;
var best = null;
for (var rad = 0; rad <= 120 && !best; rad += 4) {
var n = rad ? Math.max(8, Math.round(rad / 3)) : 1;
for (var q = 0; q < n && !best; q++) {
var a = q / n * Math.PI * 2, x = s[0] + Math.cos(a) * rad, z = s[1] + Math.sin(a) * rad, y = mmGround(x, z);
if (y < -50 || mmBlockL(x, z, y + 0.2) || mmBlockL(x + 1.2, z, y + 0.2) || mmBlockL(x - 1.2, z, y + 0.2) || mmBlockL(x, z + 1.2, y + 0.2) || mmBlockL(x, z - 1.2, y + 0.2))
continue;
if (Math.abs(mmGround(x + 1, z) - y) > 0.6 || Math.abs(mmGround(x, z + 1) - y) > 0.6)
continue;
best = { x: x, z: z, y: y };
}
}
if (!best)
return null;
best.key = key;
LBYM.spot[M.at] = best;
return best;
}
function lbyMarksTick() {
var here = typeof mmWhere === "function" ? mmWhere() : null;
LBY_MARKS.forEach(function (M) {
var g = LBYM.g[M.at];
if (here !== M.at || WLD.on === LBY_KEY) {
if (g)
g.visible = false;
return;
}
var S = lbyMarkSpot(M), b = typeof mmBase === "function" ? mmBase() : null;
if (!S || !b) {
if (g)
g.visible = false;
return;
}
if (!g) {
g = new THREE.Group();
var st = wBox(1.6, 0.7, 1.2, wM(0x6A665E), 0, 0.35, 0, g);
st.rotation.y = 0.2;
var m = lbyMarkMesh(g, 0, 0.72, 0, 0.7);
m.rotation.x = -Math.PI / 2;
m.material.opacity = 0.55;
g.userData.noCull = 1;
LBYM.g[M.at] = g;
}
if (g.parent !== scene)
scene.add(g);
g.visible = true;
g.position.set(b.x + S.x, S.y, b.z + S.z);
});
var P = camera.position, near = null;
LBY_MARKS.forEach(function (M) { var g = LBYM.g[M.at]; if (g && g.visible && Math.hypot(P.x - g.position.x, P.z - g.position.z) < 2.4)
near = M; });
if (near && LBYM.on !== near.at) {
LBYM.on = near.at;
var f = function () { worldPromptCity(null); LBYM.on = null; var P2 = camera.position; lbyGo({ at: "deep", from: { here: store.here || 0, x: P2.x + 1.5, y: P2.y, z: P2.z + 1.5, yaw: yaw, name: "the Maker's Mark" } }); };
if (WLD.on)
worldPrompt("<b>A spiral in a square, glowing faintly</b> · <b>press E</b> to press it", f);
else
worldPromptCity("<b>A spiral in a square, glowing faintly</b> · <b>press E</b> to press it", f);
}
else if (!near && LBYM.on) {
LBYM.on = null;
if (WLD.on)
worldPrompt(null);
else
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt(dt);
try {
lbyHallTick();
}
catch (e) {
if (!LBY.e1) {
LBY.e1 = 1;
if (window.console)
console.warn("labyrinth door:", e);
}
}
LBYM.t = (LBYM.t || 0) + dt;
if (LBYM.t > 0.25) {
LBYM.t = 0;
try {
lbyMarksTick();
}
catch (e) {
if (!LBY.e2) {
LBY.e2 = 1;
if (window.console)
console.warn("labyrinth marks:", e);
}
}
}
};
})();
function lbyMenu() { return __ZC(354, 87, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-maze"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-maze";
b.title = "The Labyrinth";
b.textContent = "🌀 Labyrinth";
b.onclick = function () { lbyMenu(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1500);
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-maze]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-maze", "1");
b.textContent = "🌀 The Labyrinth (to the gate)";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } lbyGo({}); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
}
})();
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === LBY_KEY; })) {
DGR_WORLDS.push([LBY_KEY, "The Labyrinth (its court and Heart always safe; the Deep and the Endless Reaches Deadly)", 3, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[LBY_KEY] = { id: LBY_KEY, name: "The Labyrinth", def: 3, group: "hidden" };
}
(function () {
if (typeof dgrLevelOf === "function") {
var lo = dgrLevelOf;
dgrLevelOf = function (id) { var n = lo.apply(this, arguments); if (id === LBY_KEY && typeof WLD !== "undefined" && WLD.on === LBY_KEY)
return lbyZoneLevel(n); return n; };
}
if (typeof DGB_KINDS !== "undefined")
Object.keys(LBY_BEASTS).forEach(function (k) { DGB_KINDS[k] = LBY_BEASTS[k]; });
if (typeof dgbList === "function") {
var dl = dgbList;
dgbList = function () { if (typeof WLD !== "undefined" && WLD.on === LBY_KEY)
return LBY_BEASTS_AT[LBY.zone === "deep" ? "deep" : LBY.zone === "reach" ? "reach" : "maze"]; return dl.apply(this, arguments); };
}
if (typeof dgbBarred === "function") {
var db = dgbBarred;
dgbBarred = function (x, z, feet) {
if (typeof WLD !== "undefined" && WLD.on === LBY_KEY) {
if (LBY.master && LBY.master.mine)
return true;
var zn = lbyZoneAt(x, z, feet);
if (zn === "gate" || zn === "heart" || zn === "inside")
return true;
if (zn !== "deep" && zn !== "heart" && lbyWallAt(x, z))
return true;
}
return db.apply(this, arguments);
};
}
if (typeof dgbBody === "function" && typeof bwRobotMesh === "function") {
var bb = dgbBody;
dgbBody = function (K, seed) { if (K && K.robot) {
try {
var g = bwRobotMesh({ slim: false }, "wild");
g.userData.dgb = 1;
return g;
}
catch (e) { }
} return bb.apply(this, arguments); };
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === LBY_KEY; }))
try {
DK_PLACES.push([LBY_KEY, "the Labyrinth"]);
}
catch (e) { }
})();
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list.thread)
return;
var room = lbyDeepRoomXZ(2, 5);
var d = { k: "thread", name: "The Wayfinder's Thread", icon: "🧶", at: LBY_KEY, seed: [room.x + 9, room.z + 9], spot: "slab", mark: 0x6A665E,
what: "a floor slab with a hair-thin silver line along its edge", look: "Along one edge of this slab runs a line of silver, thin as a hair, that seems to go on into the stone.", act: "Lift the slab",
open: "Under the slab lies a small ball of silver thread on a wooden spool. Its loose end lifts, all by itself, and points the way out.",
tale: "A ball of silver thread spun by the Labyrinth's maker, the one thing she made that the maze cannot fool. Whoever holds it is never lost: its loose end always knows the way out, however the walls have moved.",
rumour: "The Warden of the Gate says the maker of the Labyrinth hid the one thing that beats it \"down in the Deep, under a slab with a silver line\", and that the maze keeps moving its doors so nobody finds it." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list.thread = d;
RA.order.push("thread");
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === "thread") {
var key = "thread@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots.thread;
if (c && c.key === key)
return c;
return (RA.spots.thread = { x: dd.seed[0], z: dd.seed[1], y: LBY_DEEP_Y, key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL.thread = function () {
var M = raM(), g = new THREE.Group(), silver = M.silver;
mmCyl(g, M.wood, 0.035, 0.035, 0.012, 0, 0.006, 0, 0, 0, 0, 18);
mmCyl(g, M.wood, 0.035, 0.035, 0.012, 0, 0.098, 0, 0, 0, 0, 18);
mmCyl(g, M.walnut, 0.012, 0.012, 0.1, 0, 0.052, 0, 0, 0, 0, 10);
var ball = mmEll(g, silver, 0.032, 0.04, 0.032, 0, 0.052, 0, 20);
mmTube(g, silver, [[0.03, 0.06, 0], [0.07, 0.05, 0.02], [0.11, 0.03, -0.01], [0.15, 0.012, 0.02]], 0.002, 0, 0, 0, 12);
return { g: g, h: 0.11, anim: function (dt) { ball.rotation.y += dt * 0.3; } };
};
if (typeof RA_POW !== "undefined")
RA_POW.thread = { n: "The Binding Thread", col: 0xDDE4F2, cd: 45, pas: { speed: 1.15, armor: 0.85 },
act: [{ aoe: 18, dmg: 45, stun: 6 }],
pasT: "You move 15% faster and blows on you land 15% softer. In the Labyrinth, a silver thread on the ground shows you the way out, however the walls have moved (never the way to the Heart).",
actT: "Silver thread whips out and binds every foe within 18 m: 45 to each, and held fast for 6 seconds (25 to each dreamer within 12 m)." };
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.lby;
if (d && Array.isArray(d.keeps) && d.keeps.length) {
var by = {};
d.keeps.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
h += bkpHead("Keepsakes from the Labyrinth") + Object.keys(by).map(function (k) { return bkpRow(esc(k), by[k] > 1 ? "×" + by[k] : ""); }).join("");
}
}
catch (e) { }
return h;
};
})();
LBY.master = null;
LBY.shift = 0;
function lbyMasterSet(o) { return __ZC(354, 88, this, arguments, new.target); }
function lbyMasterFetch() {
if (!(typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()))
return;
LBY.mft = Date.now();
cityRpc("maze_state_get", {}).then(lbyMasterSet).catch(function () { });
}
function lbyMasterTick() { if (!LBY.mft || Date.now() - LBY.mft > 60000)
lbyMasterFetch(); }
function lbyMasterClaim() { return __ZC(354, 89, this, arguments, new.target); }
function lbyMasterCard() { return __ZC(354, 90, this, arguments, new.target); }
setTimeout(function () {
try {
if (!/[?&]kmaze=1/.test(location.search))
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!(typeof amKeeper === "function" && amKeeper()))
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
lbyGo({});
try {
var q = new URLSearchParams(location.search);
q.delete("kmaze");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
function lbyTest() { return { LBY: LBY, go: lbyGo, zoneAt: lbyZoneAt, path: lbyPath, apply: lbyApply }; }
