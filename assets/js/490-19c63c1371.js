/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NVG = { lite: false, G: null, tiles: [], treeTiles: [], people: [], talk: [], solids: [], spots: [], boats: [], mats: {}, tex: {}, below: null, inBelow: false,
built: false, fairies: [], river: null, riverMesh: null, visAt: 0, deck: [], floors: [], belowCrew: [], rects: [], houses: [], crewHidden: false, smokes: [], flags: [], lanterns: [], told: {} };
var NVG_H0 = typeof nvHeight === "function" ? nvHeight : null;
var NVG_LAND = [
{ k: "north", x: -150, z: -1560, r: 960, s: 3 },
{ k: "west", x: -1390, z: -560, r: 520, s: 7 },
{ k: "southwest", x: -1030, z: 560, r: 440, s: 11 }
];
var NVG_NECK = [[110, -500, -10, -840, 260], [-540, 330, -760, 470, 220], [-1200, -960, -900, -1200, 170]];
var NVG_ISLE = [{ x: 1080, z: -180, r: 62 }, { x: 1190, z: -70, r: 38 }, { x: 990, z: -330, r: 44 }, { x: 1240, z: -260, r: 26 }];
var NVG_PEAK = [{ x: -380, z: -1960, h: 320, r: 580 }, { x: 170, z: -2060, h: 215, r: 420 }, { x: -770, z: -1660, h: 150, r: 340 }, { x: -1500, z: -720, h: 95, r: 300 }, { x: -1120, z: 640, h: 70, r: 280 }];
var NVG_RIVER = [[-430, -1700], [-520, -1480], [-640, -1260], [-760, -1040], [-820, -860], [-840, -700]];
function nvgS(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
function nvgSegD(x, z, ax, az, bx, bz) { var dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz))); return Math.hypot(x - ax - dx * t, z - az - dz * t); }
function nvgLandT(x, z) { return __ZC(490, 0, this, arguments, new.target); }
function nvgRiverMake() { return __ZC(490, 1, this, arguments, new.target); }
function nvgRiverAt(segs, s) { for (var i = 0; i < segs.length; i++) {
var S = segs[i];
if (s <= S.s0 + S.l || i === segs.length - 1) {
var t = Math.max(0, Math.min(1, (s - S.s0) / S.l));
return [S.a[0] + (S.b[0] - S.a[0]) * t, S.a[1] + (S.b[1] - S.a[1]) * t];
}
} return segs[0].a; }
function nvgRiverNear(x, z) { return __ZC(490, 2, this, arguments, new.target); }
function nvgRaw(x, z) { return __ZC(490, 3, this, arguments, new.target); }
var NVG_PADS = [[-1180, -520, 95, 6.5], [-1000, -380, 60, 1.6], [-260, -1150, 55, 26], [-900, 420, 40, 9]];
function nvgLobeH(x, z) { return __ZC(490, 4, this, arguments, new.target); }
if (NVG_H0) {
nvHeight = function (x, z) {
var a = NVG_H0(x, z), r = Math.sqrt(x * x + z * z), h = a;
if (r >= 540) {
var b = nvgLobeH(x, z);
if (r < 720) {
var w = nvgS(540, 720, r);
b = -6 + (b + 6) * w;
}
if (b > a)
h = b;
}
return typeof nvgTownH === "function" ? nvgTownH(x, z, h) : h;
};
}
function nvgTex(name, mpt) { return __ZC(490, 5, this, arguments, new.target); }
function nvgUV(g) { return __ZC(490, 6, this, arguments, new.target); }
function nvgSurf(name, tint, mpt, o) { return __ZC(490, 7, this, arguments, new.target); }
function nvgC(col, o) { var k = "c" + col + (o ? JSON.stringify(o) : ""); if (NVG.mats[k])
return NVG.mats[k]; return (NVG.mats[k] = wM(col, o)); }
function nvgBox(w, h, d, mat, x, y, z, par) { var m = new THREE.Mesh(nvgUV(new THREE.BoxGeometry(w, h, d)), mat); m.position.set(x, y, z); par.add(m); return m; }
function nvgCyl(rt, rb, h, mat, x, y, z, par, seg) { var m = new THREE.Mesh(nvgUV(new THREE.CylinderGeometry(rt, rb, h, seg || 10)), mat); m.position.set(x, y, z); par.add(m); return m; }
var NVG_GROUND_VS = "attribute vec4 nvgW;\nvarying vec4 vNvgW;\nvarying vec2 vNvgP;\n";
function nvgGroundMat() { return __ZC(490, 8, this, arguments, new.target); }
function nvgWoodK(x, z) { return wFbm(x * 0.006 + 11, z * 0.006 + 4, 303, 3); }
var NVG_GC = { sand: new THREE.Color(0xD8C89C), grass: new THREE.Color(0x5E8C3A), lush: new THREE.Color(0x46782C), dry: new THREE.Color(0x8A9450), rock: new THREE.Color(0x8C877C), snow: new THREE.Color(0xF2F4F6), earth: new THREE.Color(0x5E4A32), wet: new THREE.Color(0x7A6A4A) };
function nvgGround(G) { return __ZC(490, 9, this, arguments, new.target); }
function nvgRiverWater(G) { return __ZC(490, 10, this, arguments, new.target); }
function nvgLeafMat(col) { return __ZC(490, 11, this, arguments, new.target); }
function nvgCrownGeo(seed, sx, sy, sz, det) { return __ZC(490, 12, this, arguments, new.target); }
function nvgFrondGeo(n, len, wid, droop, top) { return __ZC(490, 13, this, arguments, new.target); }
function nvgTrunkGeo(r0, r1, h, bend, seg) { return __ZC(490, 14, this, arguments, new.target); }
var NVG_TREE = {};
function nvgTreeKinds() { return __ZC(490, 15, this, arguments, new.target); }
var NVG_CLEAR = [[-120, 250, 34], [-60, 300, 16], [150, -470, 74], [-600, -160, 48], [40, -80, 60], [-260, 140, 24], [300, 300, 22], [-300, 505, 26], [-298, 570, 14], [250, 500, 14], [200, 150, 20], [350, -100, 32], [450, -250, 24], [-450, 0, 46], [135, -365, 82], [560, 70, 190],
[-1180, -520, 110], [-1000, -380, 80], [-260, -1150, 70], [-900, 420, 46]];
function nvgClear(x, z, pad) { if (typeof nvgTownK === "function" && nvgTownK(x, z) > 0.55)
return true; for (var i = 0; i < NVG_CLEAR.length; i++) {
var c = NVG_CLEAR[i];
if (Math.hypot(x - c[0], z - c[1]) < c[2] + (pad || 0))
return true;
} return false; }
function nvgTreeAt(x, z, R) { return __ZC(490, 16, this, arguments, new.target); }
function nvgTrees(G) { return __ZC(490, 17, this, arguments, new.target); }
function nvgPalm(G, x, h, z, R) {
var K = nvgTreeKinds().palm, g = new THREE.Group(), s = 0.8 + R() * 0.4;
K.forEach(function (part) { var m = new THREE.Mesh(part.g, part.m); g.add(m); });
g.position.set(x, h - 0.2, z);
g.rotation.y = R() * 6.28;
g.scale.setScalar(s);
G.add(g);
NV.solids.push({ x: x, z: z, r: 0.4 });
}
if (typeof nvPalm === "function")
nvPalm = nvgPalm;
function nvgRocks(G) { return __ZC(490, 18, this, arguments, new.target); }
function nvgGrassGeo() { return __ZC(490, 19, this, arguments, new.target); }
function nvgGrass(G) { return __ZC(490, 20, this, arguments, new.target); }
var NVG_PIRATE_P = "You are a pirate of Captain Hook's crew in J. M. Barrie's Peter and Wendy (1911), on the Neverland. You fear the Captain, the crocodile and Peter Pan, in that order on a good day. Talk like a storybook pirate of the old Spanish Main: rough, boastful, superstitious, comic, and full of tall tales; never gruesome. ";
function nvgPirateLook(i, o) { return __ZC(490, 21, this, arguments, new.target); }
function nvgPut(G, seed, o, x, z, talk, wander, ry, y) { return __ZC(490, 22, this, arguments, new.target); }
function nvgShipDress() { return __ZC(490, 23, this, arguments, new.target); }
var NVG_DECK = [
["Robt. Mullins", "Robert Mullins, one of Hook's crew named in the book. You are the ship's carpenter, always with a plane or an adze, proud of every plank of the Jolly Roger.", "Mind the deck, matey, I've just holystoned it.", -1.5, -6],
["Ed Teynte", "Ed Teynte, the quartermaster of the Jolly Roger in the book. You keep the ship's stores and the ship's discipline and you think the Captain's fine manners are wasted on this crew.", "Ed Teynte, quartermaster. Touch nothing, sign nothing, and keep out of the Captain's cabin.", 1.8, 3],
["The Black Pirate", "the big silent pirate the book calls the black pirate: a powerful, quiet man who has sailed every sea; you speak slowly, rarely, and with great dignity, and you are the only one aboard the Captain never shouts at. Speak with dignity; never in a stereotype.", "...Good morning. The sea is calm today.", 0, -1],
["A pirate at the guns", "a gunner of the Jolly Roger who loves his long gun 'Long Tom' like a sweetheart and polishes it all day.", "Don't touch Long Tom. She's been polished.", -2.4, 1.5],
["A pirate in the rigging", "a young pirate, the ship's lookout, nimble and cheeky, who swears he once saw the Never bird lay an egg on a cloud.", "Ahoy below! Nothing on the horizon but sea and more sea.", 2.2, 8],
["A pirate swabbing the deck", "a pirate set to swab the deck as a punishment for snoring on watch; you are very sorry for yourself.", "Swab, swab, swab. Mind your feet, I've been at this since the dog watch.", -0.8, 9.5]
];
function nvgCrew(G) { return __ZC(490, 24, this, arguments, new.target); }
function nvgShoreFind() { return __ZC(490, 25, this, arguments, new.target); }
function nvgPirateShore(G) { return __ZC(490, 26, this, arguments, new.target); }
function nvgSmoke(G, x, y, z, small) {
var list = [], m = null;
for (var i = 0; i < 5; i++) {
var p = wSph(small ? 0.25 : 0.4, wB(0xC8C4BC, { op: 0.3 }), x, y, z, G, 6);
list.push(p);
}
return { list: list, x: x, y: y, z: z, small: small };
}
function nvgBoats(G) { return __ZC(490, 27, this, arguments, new.target); }
function nvgBoatsTick(dt, t) { return __ZC(490, 28, this, arguments, new.target); }
var NVG_SHORE = [
["A pirate scraping the hull", "scraping barnacles off the prize's bottom with a scraper, in the heat, and grumbling about it", [-4, 8], 0],
["A pirate tarring the seams", "tarring the prize's seams with a hot mop, and you smell of it", [4, 10], 0],
["The sailmaker", "mending a torn topsail with palm and needle, sitting cross-legged, and humming", [-8, -12], "sit"],
["A pirate with a barrel", "rolling water casks down to the jetty for the ship", [0, -2], "walk"],
["The cook", "stirring a kettle of what you call stew; nobody else calls it that", [4, -6], 0],
["A pirate at cards", "playing cards on a barrel head and cheating, badly", [8, 12], "sit"],
["Another pirate at cards", "playing cards on a barrel head and accusing everyone of cheating", [9.5, 13.5], "sit"],
["A pirate at sword practice", "practising your cutlass strokes on a post, very fiercely, while nobody watches", [-14, 4], 0],
["The lookout", "keeping watch from the platform by the gate for Peter Pan, and seeing him everywhere", null, "look"],
["The armourer", "at the forge, mending a cutlass; you are deaf from the guns and shout everything", [-10, 12], 0],
["A pirate splicing rope", "splicing rope on a stump, and you can tie forty knots and will name them all", [-18, -4], "sit"],
["A pirate with a parrot", "a pirate whose parrot speaks better than you do; the parrot is called Admiral", [12, -2], "walk"],
["A pirate fishing off the jetty", "fishing off the jetty and catching nothing but weed, very patiently", null, "jetty"],
["The ship's boy", "the youngest of the crew, who joined to see the world and has seen mostly a mop; you secretly admire Peter Pan", [2, 4], "walk"],
["A pirate asleep", "pretending to be awake", [-20, 8], "sit"],
["A pirate singing", "singing a sea-shanty you made up yourself: 'Avast belay, yo ho, heave to, a-pirating we go'", [6, 0], 0]
];
function nvgShoreCrew(G) { return __ZC(490, 29, this, arguments, new.target); }
function nvgShoreGreet(i) { return __ZC(490, 30, this, arguments, new.target); }
var NVG_AT = { camp: { x: -260, z: -1150 }, glade: { x: -900, z: 420 }, spring: { x: -430, z: -1700 }, rocks: { x: 1080, z: -180 } };
function nvgSignAt(G, lines, x, z, ry) { var h = Math.max(nvHeight(x, z), 0), sg = wSign(lines, 4.4, lines.length > 1 ? 1.3 : 0.9, "#6A4A2A", "#FFF4D8"); sg.position.set(x, h + 1.9, z); sg.rotation.y = ry === undefined ? Math.atan2(-x, -z) : ry; G.add(sg); wCyl(0.08, 0.08, 1.9, nvgC(0x5A3A1A), x, h + 0.95, z, G, 5); }
var NVG_BLUFF_P = "You are one of the People of the Bluff, Tiger Lily's people, the first people of the Neverland, in a respectful retelling of J. M. Barrie's Peter and Wendy. Speak in clear, natural, modern English with quiet dignity and good humour; never broken English and never the old stereotypes. ";
function nvgCamp(G) { return __ZC(490, 31, this, arguments, new.target); }
function nvgLodge(L, bark, mat, wx, wz, ry) { return __ZC(490, 32, this, arguments, new.target); }
function nvgGlade(G) { return __ZC(490, 33, this, arguments, new.target); }
function nvgSpring(G) { return __ZC(490, 34, this, arguments, new.target); }
function nvgMermaidRocks(G) { return __ZC(490, 35, this, arguments, new.target); }
function nvgWhere(x, z) { return __ZC(490, 36, this, arguments, new.target); }
var NVG_TREE_AT = { x: -120, z: 250 };
function nvgTreeDress(G) { return __ZC(490, 37, this, arguments, new.target); }
function nvgTreeTick(dt, L) { return __ZC(490, 38, this, arguments, new.target); }
if (typeof nvOutOfHome === "function") {
var NVG_OUT0 = nvOutOfHome;
nvOutOfHome = function () {
NVG_OUT0.apply(this, arguments);
NVG.treeCool = 3;
var D = NVG.treeDoor;
if (D) {
var x = D.x, z = D.z + 4.2;
camera.position.set(NV.base + x, nvHeight(x, z) + 1.72, z);
yaw = Math.PI;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = nvHeight(x, z);
}
};
}
function nvgVillageOpen() { return __ZC(490, 39, this, arguments, new.target); }
var NVG_BELOW = { x: 1800, y: -90, z: -1700, w: 8, d: 28, h: 2.5 };
var NVG_BELOW_ENV = { top: 0x0A0806, low: 0x1A120A, fog: 0x1A120C, fogD: 0.012, sun: 0.35, sunCol: 0xFFC890, sunDir: [0.2, 0.9, 0.1], hemi: 0.7, hemiCol: 0xFFD8A8, hemiGround: 0x4A3420, stars: 0 };
function nvgBelowBuild(G) { return __ZC(490, 40, this, arguments, new.target); }
function nvgBelowGo() { return __ZC(490, 41, this, arguments, new.target); }
function nvgBelowOut() { return __ZC(490, 42, this, arguments, new.target); }
function nvgBelowBlock(x, z, feet) {
var B = NVG.below, lx = x - B.x, lz = z - B.z;
if (Math.abs(lx) > NVG_BELOW.w / 2 - 0.35 || Math.abs(lz) > NVG_BELOW.d / 2 - 0.35)
return true;
return worldSolidAt(B.solids, lx, lz, feet - B.y);
}
function nvgBelowTick(dt, L) { return __ZC(490, 43, this, arguments, new.target); }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.neverland;
if (!W || !NVG_H0)
return;
var b0 = W.build, e0 = W.enter, g0 = W.ground, k0 = W.block, t0 = W.tick, v0 = W.env, h0 = W.back;
W.bound = Math.max(W.bound || 0, 3700);
W.build = function (G) {
NVG.lite = typeof LITE !== "undefined" && !!LITE;
NVG.G = G;
NVG.rects = [];
NVG.houses = [];
NVG.tiles = [];
NVG.treeTiles = [];
NVG.people = [];
NVG.deck = [];
NVG.boats = [];
NVG.smokes = [];
NVG.flags = [];
NVG.floors = [];
NVG.fairies = [];
NVG.below = null;
NVG.inBelow = false;
NVG.belowCrew = [];
b0.apply(this, arguments);
function step(n, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[nvg] " + n, e);
} }
step("ground", function () { nvgGround(G); });
step("river", function () { nvgRiverWater(G); });
step("trees", function () { nvgTrees(G); });
step("rocks", function () { nvgRocks(G); });
step("grass", function () { nvgGrass(G); });
step("tree", function () { nvgTreeDress(G); });
step("village", function () { nvgVillageOpen(); });
step("ship", function () { nvgShipDress(); });
step("crew", function () { nvgCrew(G); });
step("shore", function () { var f = NV.flag; nvgPirateShore(G); NV.flag = f; });
step("shore crew", function () { nvgShoreCrew(G); });
step("boats", function () { nvgBoats(G); });
step("camp", function () { nvgCamp(G); });
step("glade", function () { nvgGlade(G); });
step("spring", function () { nvgSpring(G); });
step("rocks east", function () { nvgMermaidRocks(G); });
step("below", function () { nvgBelowBuild(G); });
step("town", function () { nvgTown(G); });
step("town folk", function () { nvgTownFolk(G); });
step("signs", function () { nvgSignAt(G, ["To the Pirate Shore", "across Kidd's Creek"], -560, -240); nvgSignAt(G, ["To the Northlands", "and the Never Mountains"], 60, -640); nvgSignAt(G, ["To the Wildwood", "and the fairies' glade"], -560, 380); });
NVG.built = true;
NVG.visAt = 0;
};
W.enter = function () { NVG.inBelow = false; if (NVG.below)
NVG.below.g.visible = false; return e0.apply(this, arguments); };
W.ground = function (x, z) {
if (NVG.inBelow && NVG.below)
return NVG.below.y;
for (var i = 0; i < (NVG.floors || []).length; i++) {
var F = NVG.floors[i], dx = x - F.cx, dz = z - F.cz, c = Math.cos(-F.ry), s = Math.sin(-F.ry), lx = dx * c + dz * s, lz = -dx * s + dz * c;
if (Math.abs(lx) < F.hw && lz > 0 && lz < F.hd * 2 && !NV.home)
return F.y;
}
var best = null;
for (var j = 0; j < (NVG.rects || []).length; j++) {
var Q = NVG.rects[j], qx = x - Q.cx, qz = z - Q.cz, qc = Math.cos(Q.ry), qs = Math.sin(Q.ry), ax = qx * qc - qz * qs, az = qx * qs + qz * qc;
if (Math.abs(ax) < Q.hw && Math.abs(az) < Q.hd && !NV.home && (best === null || Q.y > best))
best = Q.y;
}
var g = g0.apply(this, arguments);
return best !== null && best > g ? best : g;
};
W.block = function (x, z, feet) { if (NVG.inBelow && NVG.below)
return nvgBelowBlock(x, z, feet); return k0.apply(this, arguments); };
W.env = function () { if (NVG.inBelow) {
var o = {};
for (var k in NVG_BELOW_ENV)
o[k] = NVG_BELOW_ENV[k];
return o;
} return v0.apply(this, arguments); };
W.back = function () { if (NVG.inBelow) {
nvgBelowOut();
return;
} return h0.apply(this, arguments); };
W.tick = function (dt) {
if (NVG.inBelow) {
var L = worldLocal(), near = nvgBelowTick(dt, L);
if (near)
worldPrompt("<b>" + esc(near.name) + "</b> · <b>press E</b> to " + (near.verb || "talk"), near.fn ? near.fn : function () { wTalk(near.t); });
else
worldPrompt(null);
worldBanner("<b>Neverland</b> · below deck in the Jolly Roger");
return;
}
t0.apply(this, arguments);
try {
nvgTick(dt);
}
catch (e) {
if (window.console)
console.warn("[nvg] tick", e);
}
};
if (typeof nvWhere === "function") {
var w0 = nvWhere;
nvWhere = function (x, z) { var n = null; try {
n = nvgWhere(x, z);
}
catch (e) { } return n || w0.apply(this, arguments); };
}
})();
function nvgBookOn() { return typeof nvbActive === "function" && nvbActive(); }
function nvgTick(dt) { return __ZC(490, 44, this, arguments, new.target); }
var NVG_TOWN = { sx: -790, sz: -170, ry: 0.45, x0: 28, x1: 250, z0: -128, z1: 128, y: 2.3 };
function nvgTW(lx, lz) { var T = NVG_TOWN, c = Math.cos(T.ry), s = Math.sin(T.ry); return { x: T.sx + lx * c + lz * s, z: T.sz - lx * s + lz * c }; }
function nvgTL(x, z) { var T = NVG_TOWN, c = Math.cos(T.ry), s = Math.sin(T.ry), dx = x - T.sx, dz = z - T.sz; return { lx: dx * c - dz * s, lz: dx * s + dz * c }; }
function nvgTownK(x, z) { return __ZC(490, 45, this, arguments, new.target); }
function nvgTownH(x, z, h) { return __ZC(490, 46, this, arguments, new.target); }
var NVG_TOWN_P = "You live in the pirate town at Kidd's Creek on the Neverland, the shore town of Captain Hook's crew from J. M. Barrie's Peter and Wendy, where the Jolly Roger lies moored at the wharf. Everyone here fears the Captain, the crocodile (its clock can be heard in the creek some nights) and Peter Pan. Speak in the lively, salty manner of an old storybook sea town; keep it fun and suitable for children; never gruesome. ";
var NVG_HOUSES = [
[60, -104, 15, 12, 2, "The Cooper's", "cooper"], [60, -80, 15, 12, 3, "The Lodging House", "lodge"], [60, -56, 15, 12, 2, "The Chandler's", "shop"], [60, -32, 15, 12, 2, "The Sailmaker's Loft", "sail"],
[60, 32, 18, 13, 3, "The Tick-Tock Tavern", "tavern"], [60, 57, 15, 12, 2, "The Cook-shop", "cook"], [60, 81, 15, 12, 2, "The Gunsmith's", "gun"], [60, 105, 15, 12, 2, "The Ropewalk Store", "shop"],
[104, -100, 15, 12, 2, "The Map-maker's", "map"], [104, -74, 15, 12, 2, "The Doubloon Exchange", "bank"], [104, -48, 16, 12, 3, "Captain Hook's Countinghouse", "hook"],
[104, 48, 15, 12, 2, "The Bakehouse", "cook"], [104, 74, 15, 12, 2, "The Blacksmith's", "smith"], [104, 100, 15, 12, 2, "A pirate's lodgings", "home"],
[192, -96, 15, 12, 2, "A sea captain's house", "home"], [192, -66, 15, 12, 3, "The Old Sea-Dog", "tavern"], [192, -36, 15, 12, 2, "A pirate's lodgings", "home"], [192, 36, 15, 12, 2, "The Pistol Range", "gun"], [192, 66, 15, 12, 2, "A house of the town", "home"], [192, 96, 15, 12, 2, "The Pickled Herring", "cook"],
[148, -78, 15, 12, 2, "The Harbourmaster's", "shop"], [148, -52, 15, 12, 2, "Ship's Biscuit & Salt Pork", "shop"], [148, 52, 15, 12, 2, "A house of the town", "home"], [148, 78, 15, 12, 2, "The Parrot Seller's", "shop"]
];
function nvgTown(G) { return __ZC(490, 47, this, arguments, new.target); }
function nvgHouse(S, H, face, M) { return __ZC(490, 48, this, arguments, new.target); }
function nvgInside(g, kind, w, d, M) { return __ZC(490, 49, this, arguments, new.target); }
var NVG_TOWNFOLK = [
["The landlady of the Tick-Tock Tavern", "the landlady of the Tick-Tock Tavern, who named it to annoy Captain Hook and has never told him", [60, 32, 0, -4.6], "f", null],
["The chandler", "the ship's chandler, selling rope, tar, lanterns and biscuit to every pirate on the creek, and keeping a sharp tally", [60, -56, 0, -4.6], "m", null],
["The sailmaker", "the sailmaker, sewing the Jolly Roger's new topsail and complaining about how the crew treat canvas", [60, -32, -1, 1], "m", "sit"],
["The gunsmith", "the gunsmith, who can mend a pistol in the dark and tells everyone so", [60, 81, 0, -4.6], "m", null],
["The cook-shop woman", "selling pies on the waterfront; nobody asks what is in them", [60, 57, 0, -4.6], "f", null],
["The map-maker", "an old map-maker drawing every child's map of the Neverland, which is never quite the same twice", [104, -100, 2, 1.5], "m", "sit"],
["Captain Hook's clerk", "Captain Hook's clerk at the countinghouse, who keeps the Captain's ledgers in a beautiful hand and is terrified of ink blots", [104, -48, 0, -1], "m", null],
["The harbourmaster", "the harbourmaster, who has told the Jolly Roger to move her stern line forty times", [34, -6, 0, 0], "m", "walk"],
["A pirate on the wharf", "rolling casks on the wharf by the Jolly Roger", [10, -10, 0, 0], "m", "wharf"],
["Another pirate on the wharf", "coiling rope on the wharf and watching the water for the crocodile", [10, 10, 0, 0], "m", "wharf"],
["A pirate in the square", "strolling the square in a stolen admiral's hat", [128, -6, 0, 0], "m", "walk"],
["A stallholder", "selling fruit from the island at a stall in the square", [118, -14, 0, -1.2], "f", null],
["A parrot seller", "selling parrots that only ever say rude things about Peter Pan", [148, 78, 0, -4.6], "m", null],
["A boy of the town", "a town boy who runs errands for the pirates and secretly wishes he were a Lost Boy", [120, 10, 0, 0], "m", "walk"],
["The baker", "baking ship's biscuit so hard the crew use it as shot", [104, 48, 0, -4.6], "f", null],
["The blacksmith", "the blacksmith, who forged Captain Hook's spare hooks (he has seven, one for Sundays)", [104, 74, 0, -1], "m", null],
["A pirate at the tavern table", "drinking at a table in the Tick-Tock Tavern and telling the tale of the crocodile for the hundredth time", [60, 32, -3, 1.5], "m", "sit"],
["Another pirate at the tavern", "arm-wrestling at a tavern table and losing", [60, 32, 2, 2], "m", "sit"]
];
function nvgTownFolk(G) { return __ZC(490, 50, this, arguments, new.target); }
function nvgTownGreet(i) { return __ZC(490, 51, this, arguments, new.target); }
function nvgKeepBoys() { return __ZC(490, 52, this, arguments, new.target); }
function nvgSweepDress(G) { return __ZC(490, 53, this, arguments, new.target); }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.neverland;
if (!W)
return;
var b = W.build;
W.build = function (G) { var r = b.apply(this, arguments); try {
nvgSweepDress(G);
}
catch (e) {
if (window.console)
console.warn("[nvg] sweep dress", e);
} return r; };
})();
