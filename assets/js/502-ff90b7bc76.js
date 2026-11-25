/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var IFG = { on: true, lands: [], tiles: [], ftiles: [], deep: [], water: [], folk: [], built: false, t: 0, R: { inner: 420, full: 570, edge: 1400, bound: 1470 },
hurtT: 0, lastLand: null, mats: {}, tex: {}, inCbt: 0 };
var IFG_ORDER = ["coast", "frost", "moor", "weald", "fen", "ember", "bad", "dune"];
var IFG_A0 = -112.5 * Math.PI / 180, IFG_STEP = Math.PI / 4;
function ifgLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof GFX_PHONE !== "undefined" && !!GFX_PHONE); }
function ifgAngOf(i) { return IFG_A0 + i * IFG_STEP; }
function ifgAt(i, r, da) { var a = ifgAngOf(i) + (da || 0) * Math.PI / 180; return { x: Math.cos(a) * r, z: Math.sin(a) * r }; }
function ifgSm(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
function ifgN(x, z, s, f) { return wNoise(x * f, z * f, s); }
function ifgF(x, z, s, f, o) { return wFbm(x * f, z * f, s, o || 3) / (1 - Math.pow(0.5, o || 3)); }
var IFG_LANDS = {
coast: { name: "The Gullwrack Coast", lv: 10, i: 0,
about: "Sea cliffs over a grey beach, sea stacks in the surf and caves at the cliff foot. Sky-pirates' boarders come ashore against the Coast Watch's musketeers.",
war: { name: "Wreckers' Strand", sides: { crimson: ["cutthroat", "pirate", "cutthroat", "gunslinger"], azure: ["musketeer", "musketeer", "halberdier", "sniper"] }, about: "Wreckers come up the strand at the Coast Watch. Fight from the rocks, or from the wreck." },
wild: { name: "The Crab Shallows", list: ["crab", "crab", "giantcrab", "crab"], chief: "crabking", about: "The shallows under the cliffs: giant crabs, and the Crab King in his shell of barnacles." },
post: { name: "Gullwrack hamlet", folk: ["fisher", "fisher", "herder", "trader", "scout"], about: "A fishing hamlet on the cliff top: nets drying, a smokehouse, a lighthouse that still burns." } },
frost: { name: "The Frostfang Reach", lv: 20, i: 1,
about: "Snowfields and dark pines, a frozen lake, crags of blue ice and caves in the drifts. Northern raiders against the Azure wardens; wolves and yetis in the high snow.",
war: { name: "The Rimewall", sides: { crimson: ["frostraider", "frostraider", "viking", "archer"], azure: ["paladin", "knight", "frostmage", "halberdier"] }, about: "The raiders of the north storm the wardens' ice wall. Pines and drifts to hide in." },
wild: { name: "The Wolf Fells", list: ["wolf", "wolf", "yeti", "wolf", "werewolf"], chief: "oldtusk", about: "High snow where the wolf packs run, yetis walk, and Old Tusk the great mammoth will not be driven off." },
post: { name: "Rimehold", folk: ["trapper", "trapper", "smith", "trader", "scout"], about: "A log steading on the lake shore: trappers, a smithy with its fire always lit, sledges." } },
moor: { name: "The Highmoor Downs", lv: 4, i: 2,
about: "Rolling moor, heather and long grass, dry-stone walls, a ring of standing stones and a ruined abbey. Knights against the legions; wild boar in the bracken.",
war: { name: "Abbey Field", sides: { crimson: ["legionary", "legionary", "archer", "legionary"], azure: ["knight", "knight", "archer", "halberdier"] }, about: "The legion marches on the knights by the old abbey. Walls to crouch behind, long grass to vanish in." },
wild: { name: "Bracken Hollow", list: ["boar", "boar", "wolf", "boar"], chief: "boarking", about: "Deep bracken where the wild boar root, and the Boar King keeps his wallow." },
post: { name: "Thornwick", folk: ["herder", "herder", "farmer", "trader", "scout", "farmer"], about: "A farming hamlet in the lee of the hill: cottages, a barn, a well, sheep on the down." } },
weald: { name: "The Blackroot Weald", lv: 8, i: 3,
about: "Old forest, close and dark: ferns to the waist, fallen giants you can crawl into, a ravine. Rangers against the shadow-blades; bears and wolves.",
war: { name: "The Greenwood War", sides: { crimson: ["shadowblade", "ninja", "shadowblade", "necromancer"], azure: ["warden", "warden", "archer", "monk"] }, about: "Wardens of the wood against the shadow-blades. Every tree is cover, every fern a hiding place." },
wild: { name: "Bearden Ravine", list: ["bear", "wolf", "wolf", "boar", "bear"], chief: "grimmaw", about: "The ravine's caves: bears, wolves, and Grimmaw the dire bear." },
post: { name: "Ashdell", folk: ["woodcutter", "woodcutter", "trapper", "trader", "scout"], about: "A woodcutters' camp in a clearing: a sawpit, stacked timber, a charcoal burner's clamp." } },
fen: { name: "The Drownmere Fen", lv: 16, i: 4,
about: "Black pools and reed beds, boardwalks, stilt huts and sunken boats, mist on the water. The drowned dead and their necromancers against the paladins.",
war: { name: "The Sunken Causeway", sides: { crimson: ["necromancer", "skeleton", "lizard", "skeleton"], azure: ["paladin", "paladin", "archer", "knight"] }, about: "Paladins hold the causeway against the drowned and their masters. Wade, or crouch in the reeds." },
wild: { name: "Rotreed Mire", list: ["giantrat", "lizard", "wraith", "giantrat"], chief: "drownedking", about: "The deep mire: giant rats, lizard-kin, wraiths over the water, and the Drowned King." },
post: { name: "Mirewatch", folk: ["fisher", "herder", "trader", "scout", "fisher"], about: "Stilt houses joined by boardwalks: eel traps, punts, a lamp at every door." } },
ember: { name: "The Emberfall Caldera", lv: 30, i: 5,
about: "Black rock and ash, cinder cones, rivers of lava, columns of basalt and lava tubes to hide in. Fire-sworn oni against the battle-mages. The lava burns: keep out of it.",
war: { name: "The Cinder Front", sides: { crimson: ["oni", "oni", "demon", "mage"], azure: ["mage", "frostmage", "stormcaller", "paladin"] }, about: "The mages hold the cinder front against the oni. Basalt to hide behind; the lava burns." },
wild: { name: "The Furnace Vents", list: ["fireelemental", "imp", "golem", "imp"], chief: "magmaw", about: "Vents of fire: fire spirits, imps, stone golems, and Magmaw the molten colossus." },
post: { name: "Cinderwatch", folk: ["smith", "smith", "miner", "trader", "scout"], about: "A forge camp on the rim, where the smiths work obsidian and fire-steel." } },
bad: { name: "The Shatterstone Badlands", lv: 24, i: 6,
about: "Red mesas and canyons, hoodoos, old mine adits. Riflemen and heavy gunners against war robots and spider-bots.",
war: { name: "Canyon Line", sides: { crimson: ["soldier", "heavy", "gunner", "soldier"], azure: ["warbot", "spiderbot", "android", "warbot"] }, about: "The machines come down the canyon. Mesas to climb, hoodoos and adits to hide in." },
wild: { name: "The Scrapworks", list: ["spiderbot", "automaton", "spiderbot", "sentinel"], chief: "colossus", about: "An old mine works run wild with machines, and the Iron Colossus that guards it." },
post: { name: "Rustgulch", folk: ["miner", "miner", "smith", "trader", "scout"], about: "A mining camp in the gulch: a headframe, ore carts, a cook-tent." } },
dune: { name: "The Redsand Expanse", lv: 13, i: 7,
about: "Great dunes, an oasis with its palms, and a temple half buried in the sand. Desert riders against the lizard-kin; scorpions in the deep sand.",
war: { name: "The Buried Temple", sides: { crimson: ["duneraider", "duneraider", "gunslinger", "duneraider"], azure: ["lizard", "lizard", "lizard", "archer"] }, about: "The riders fight the lizard-kin for the half-buried temple. Dune crests block every line of sight." },
wild: { name: "The Deep Sand", list: ["scorpion", "scorpion", "giantrat", "scorpion"], chief: "sandmaw", about: "The deep dunes: giant scorpions, and Queen Sandmaw under the sand." },
post: { name: "Sunwell", folk: ["trader", "trader", "herder", "scout", "fisher"], about: "A caravan stop at the oasis: tents, camels' lines, a well, a market of a dozen stalls." } }
};
(function () {
IFG_ORDER.forEach(function (k, i) {
var L = IFG_LANDS[k];
L.k = k;
L.a = ifgAngOf(i);
L.warAt = ifgAt(i, 830, 0);
L.wildAt = ifgAt(i, 1130, 10);
L.lair = ifgAt(i, 1190, 13);
L.postAt = ifgAt(i, 640, -11);
});
IFG_LANDS.frost.lake = ifgAt(1, 990, -9);
IFG_LANDS.frost.lake.r = 95;
IFG_LANDS.dune.oasis = ifgAt(7, 700, -11);
IFG_LANDS.dune.oasis.r = 34;
IFG_LANDS.dune.postAt = ifgAt(7, 700, -4);
IFG_LANDS.dune.temple = ifgAt(7, 830, 0);
IFG_LANDS.ember.cones = [[960, -14, 95, 46], [1180, 4, 120, 58], [760, 14, 70, 32], [1260, -12, 80, 40]].map(function (c) { var p = ifgAt(5, c[0], c[1]); return { x: p.x, z: p.z, r: c[2], h: c[3] }; });
})();
var IFG_W = { a: null, b: null, wa: 1, wb: 0 };
function ifgWhich(x, z) { return __ZC(502, 0, this, arguments, new.target); }
function ifgLandAt(x, z) { var r = Math.hypot(x, z); if (r < IFG.R.full - 80)
return null; var W = ifgWhich(x, z); return IFG_LANDS[W.wa >= W.wb ? W.a : W.b]; }
var IFG_S = { h: 0, s: 0, g: 0, r: 0, n: 0, cr: 0, cg: 0, cb: 0 };
function ifgTint(S, hex, k) { S.cr += ((hex >> 16) & 255) / 255 * k; S.cg += ((hex >> 8) & 255) / 255 * k; S.cb += (hex & 255) / 255 * k; }
function ifgRidge(v) { return 1 - Math.abs(v * 2 - 1); }
var IFG_LAND_FN = {
coast: function (x, z, r, S, k) { return __ZC(502, 1, this, arguments, new.target); },
frost: function (x, z, r, S, k) { return __ZC(502, 2, this, arguments, new.target); },
moor: function (x, z, r, S, k) {
var h = 6 + (ifgF(x, z, 31, 0.0035, 4) - 0.5) * 28 + (ifgN(x, z, 32, 0.02) - 0.5) * 1.4;
S.h += h * k;
if (!S.full)
return;
var heath = ifgSm(0.55, 0.68, ifgF(x, z, 33, 0.009, 3));
S.g += (1 - heath) * 0.9 * k;
ifgTint(S, heath > 0.5 ? 0x6E5060 : (ifgN(x, z, 34, 0.03) > 0.5 ? 0x6E8A3E : 0x7E9446), k);
},
weald: function (x, z, r, S, k) {
var h = 4 + (ifgF(x, z, 41, 0.005, 4) - 0.5) * 14;
var q = ifgF(x, z, 42, 0.0028, 2), dv = Math.abs(q - 0.5);
if (dv < 0.035) {
var t = 1 - dv / 0.035;
h -= 8 * t * t * (3 - 2 * t);
}
S.h += h * k;
if (!S.full)
return;
S.g += 0.4 * k;
ifgTint(S, ifgN(x, z, 43, 0.02) > 0.5 ? 0x4E6A30 : 0x5E5034, k);
},
fen: function (x, z, r, S, k) { return __ZC(502, 3, this, arguments, new.target); },
ember: function (x, z, r, S, k) { return __ZC(502, 4, this, arguments, new.target); },
bad: function (x, z, r, S, k) { return __ZC(502, 5, this, arguments, new.target); },
dune: function (x, z, r, S, k) { return __ZC(502, 6, this, arguments, new.target); }
};
function ifgFenDry(x, z) {
var L = IFG_LANDS.fen, m = 0;
[L.postAt, L.warAt, L.wildAt].forEach(function (p) { var d = Math.hypot(x - p.x, z - p.z); m = Math.max(m, 1 - ifgSm(26, 46, d)); });
return m;
}
function ifgLavaK(x, z) { return __ZC(502, 7, this, arguments, new.target); }
var IFG_H0 = null, IFG_C0 = null;
function ifgOldRise(x, z, r) { return r > 400 ? Math.pow((r - 400) / 70, 2) * 16 * (0.7 + wNoise(x * 0.01, z * 0.01, 5) * 0.6) : 0; }
function ifgGround(x, z, full) { return __ZC(502, 8, this, arguments, new.target); }
function ifgOldMade(x, z, S, k) { return __ZC(502, 9, this, arguments, new.target); }
function ifgTex(name) { return __ZC(502, 10, this, arguments, new.target); }
var IFG_GROUND_VS = "attribute vec4 ifgW;\nvarying vec4 vIfgW;\nvarying vec2 vIfgP;\n";
function ifgGroundMat() { return __ZC(502, 11, this, arguments, new.target); }
var IFG_TILE = 275, IFG_EXT = 1650;
function ifgBuildGround(G) { return __ZC(502, 12, this, arguments, new.target); }
function ifgTileGeo(x0, z0, size, n) { return __ZC(502, 13, this, arguments, new.target); }
function ifgSheetRing(r0, r1, landK, halfDeg, y, mat, segs) {
var L = IFG_LANDS[landK], half = halfDeg * Math.PI / 180;
var g = new THREE.RingGeometry(r0, r1, segs || 48, 4, -(L.a + half), 2 * half);
g.rotateX(-Math.PI / 2);
var m = new THREE.Mesh(g, mat);
m.position.y = y;
m.receiveShadow = true;
m.userData.keep = 1;
return m;
}
function ifgSheetDisc(x, z, r, y, mat) { var g = new THREE.CircleGeometry(r, 40); g.rotateX(-Math.PI / 2); var m = new THREE.Mesh(g, mat); m.position.set(x, y, z); m.receiveShadow = true; m.userData.keep = 1; return m; }
function ifgWaterMat(col, op, shine) {
var lite = ifgLite();
return lite ? new THREE.MeshLambertMaterial({ color: col, transparent: true, opacity: op, depthWrite: false })
: new THREE.MeshPhongMaterial({ color: col, transparent: true, opacity: op, shininess: shine || 70, specular: 0x5A6A70, depthWrite: false });
}
function ifgLavaTex() { return __ZC(502, 14, this, arguments, new.target); }
var IFG_LAVA_Y = 1.5, IFG_SEA_Y = -0.2, IFG_FEN_Y = 0.15;
function ifgBuildWaters(G) { return __ZC(502, 15, this, arguments, new.target); }
function ifgDeep(x, z) { var h = bwH(x, z); if (h > -1.25)
return false; var L = ifgLandAt(x, z); return !!L && (L.k === "coast" || L.k === "fen"); }
function ifgMorePeaks(G) {
var R = wRand(5151), lite = ifgLite(), n = lite ? 14 : 30;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.15, d = 1680 + R() * 240;
var W = ifgWhich(Math.cos(a) * d, Math.sin(a) * d);
if (W.a === "coast" && W.wa > 0.6)
continue;
bwMountainOld(G, Math.cos(a) * d, Math.sin(a) * d, 160 + R() * 140, 170 + R() * 190, R, lite);
}
}
var bwMountainOld = null;
function ifgMerge(list) { return __ZC(502, 16, this, arguments, new.target); }
function ifgM4(x, y, z, rx, ry, rz, sx, sy, sz) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)), new THREE.Vector3(sx || 1, sy === undefined ? (sx || 1) : sy, sz === undefined ? (sx || 1) : sz)); return m; }
function ifgLump(r, seed, ws, hs, flat) {
var g = new THREE.SphereGeometry(r, ws || 8, hs || 6), P = g.attributes.position, R = wRand(seed);
for (var i = 0; i < P.count; i++) {
var x = P.getX(i), y = P.getY(i), z = P.getZ(i), k = 0.78 + 0.4 * wNoise(x * 1.3 + seed, z * 1.3 + y, seed);
P.setXYZ(i, x * k, y * k * (flat || 1), z * k);
}
g.computeVertexNormals();
return g;
}
function ifgKinds() { return __ZC(502, 17, this, arguments, new.target); }
var IFG_SOLID = { pine: 0.35, snowpine: 0.35, broad: 0.55, giant: 1.2, dead: 0.35, palm: 0.3, cactus: 0.45, basalt: 1.8, hoodoo: 1.6, crag: 2.2, boulder: 1.4, dark: 1.4, redrock: 1.4, snowrock: 1.4, stack: 6.5 };
var IFG_FT = 550;
function ifgPlant(kind, x, z, s, rot, y) {
var key = Math.floor(x / IFG_FT) + "," + Math.floor(z / IFG_FT), P = IFG.plant || (IFG.plant = {}), T = P[key] || (P[key] = {});
(T[kind] || (T[kind] = [])).push([x, y === undefined ? bwH(x, z) - 0.15 : y, z, s || 1, rot === undefined ? (x * 7.1 + z * 3.3) % 6.28 : rot]);
var r = IFG_SOLID[kind];
if (r)
bwSolid({ x: x, z: z, r: r * (s || 1) });
}
function ifgTileGroup(G, x, z) {
var key = Math.floor(x / IFG_FT) + "," + Math.floor(z / IFG_FT), T = IFG.tg || (IFG.tg = {});
if (!T[key]) {
var g = new THREE.Group();
g.name = "ifg-tile";
g.userData.keep = 1;
G.add(g);
var ab = key.split(",");
T[key] = g;
IFG.ftiles.push({ g: g, x: (+ab[0] + 0.5) * IFG_FT, z: (+ab[1] + 0.5) * IFG_FT });
}
return T[key];
}
function ifgPlantFlush(G) { return __ZC(502, 18, this, arguments, new.target); }
function ifgHidePatch(x, z, r, kind, R) {
var n = Math.round(r * r * (ifgLite() ? 0.5 : 0.9));
for (var i = 0; i < n; i++) {
var a = R() * 6.28, d = Math.sqrt(R()) * r;
ifgPlant(kind, x + Math.cos(a) * d, z + Math.sin(a) * d, 0.85 + R() * 0.5, R() * 6.28);
}
BW.bushes.push({ x: x, z: z, r: r, ifg: kind });
}
function ifgDeepAdd(x, z, r, name, crouch) { IFG.deep.push({ x: x, z: z, r: r, name: name, crouch: !!crouch }); }
function ifgInDeep(x, z) { for (var i = 0; i < IFG.deep.length; i++) {
var D = IFG.deep[i];
if ((x - D.x) * (x - D.x) + (z - D.z) * (z - D.z) < D.r * D.r)
return D;
} return null; }
function ifgScatter(landK, n, fn, R, r0, r1) {
var L = IFG_LANDS[landK], got = 0;
for (var t = 0; t < n * 6 && got < n; t++) {
var a = L.a + (R() - 0.5) * IFG_STEP * 1.02, r = (r0 || IFG.R.full) + R() * ((r1 || IFG.R.edge - 20) - (r0 || IFG.R.full)), x = Math.cos(a) * r, z = Math.sin(a) * r;
if (ifgBusy(x, z))
continue;
if (fn(x, z, R) !== false)
got++;
}
return got;
}
function ifgBusy(x, z) { return __ZC(502, 19, this, arguments, new.target); }
function ifgOnPath(x, z, w) {
var r = Math.hypot(x, z);
if (r < IFG.R.inner - 20 || r > 1300)
return false;
var ang = Math.atan2(z, x), u = (ang - IFG_A0) / IFG_STEP, i = Math.round(u), da = (u - i) * IFG_STEP;
var wob = Math.sin(r * 0.012 + i) * 0.035;
return Math.abs(da - wob) * r < w;
}
var IFG_NEW_KINDS = {
frostraider: { name: "Frost raider", body: "person", arm: "battleaxe", hp: 85, spd: 3.5, armor: 0.12, worth: 15, look: function (T) { return { sex: "m", top: 0x6A5A4A, layer: "longcoat", layerColor: 0x8A7A66, hat: "hood", hatColor: 0xD8D0C0, back: "cloak", backColor: T.dark, beard: "full" }; }, spoil: ["Frost raider's fur clasp", "❄️"] },
warden: { name: "Weald warden", body: "person", arm: "longbow", hp: 55, spd: 3.8, range: 34, worth: 12, look: function (T) { return { top: 0x3A4A2A, bottom: 0x3A3224, hat: "hood", hatColor: 0x2A3A22, back: "cloak", backColor: 0x2E3E24 }; }, spoil: ["Warden's oak-leaf brooch", "🍂"] },
duneraider: { name: "Dune rider", body: "person", arm: "scimitar", hp: 65, spd: 4.0, worth: 13, look: function (T) { return { top: 0xD8C8A0, bottom: 0xB8A880, hat: "hood", hatColor: 0xE0D0B0, back: "cloak", backColor: T.col, layer: "longcoat", layerColor: 0xC8B48A }; }, spoil: ["Dune rider's sand-veil", "🏜️"] },
wolf: { name: "Grey wolf", body: "beast", arch: "wolf", arm: "bite", hp: 55, spd: 5.6, worth: 11, spoil: ["Wolf pelt", "🐺"] },
boar: { name: "Wild boar", body: "beast", arch: "boar", arm: "bite", hp: 75, spd: 5.0, worth: 12, spoil: ["Boar's tusk", "🐗"] },
crab: { name: "Giant crab", body: "crawl", arch: "crab", arm: "claws", hp: 70, spd: 3.6, armor: 0.3, scale: 2.6, worth: 12, noBlood: 1, spoil: ["Crab claw", "🦀"] },
giantcrab: { name: "Great shore crab", body: "crawl", arch: "crab", arm: "club", hp: 160, spd: 3.2, armor: 0.35, scale: 4.2, big: 1, worth: 22, noBlood: 1, spoil: ["Great crab's shell", "🦀"] },
scorpion: { name: "Giant scorpion", body: "crawl", arch: "scorpion", arm: "bite", hp: 90, spd: 4.4, armor: 0.25, scale: 3.4, worth: 15, noBlood: 1, spoil: ["Scorpion's sting", "🦂"] },
giantrat: { name: "Giant rat", body: "beast", arch: "giantrat", arm: "bite", hp: 40, spd: 5.2, worth: 8, spoil: ["Rat's tail", "🐀"] },
wraith: { name: "Fen wraith", body: "folk", arch: "wraith", arm: "claws", hp: 80, spd: 4.0, worth: 16, noBlood: 1, spoil: ["Wraith's grave-cloth", "👻"] },
fireelemental: { name: "Fire spirit", body: "folk", arch: "fireelemental", arm: "breath", hp: 110, spd: 3.8, range: 24, worth: 20, noBlood: 1, spoil: ["Ember heart", "🔥"] },
imp: { name: "Ash imp", body: "folk", arch: "imp", arm: "claws", hp: 45, spd: 5.0, worth: 10, spoil: ["Imp's horn", "😈"] },
golem: { name: "Stone golem", body: "folk", arch: "golem", arm: "stomp", hp: 300, spd: 2.4, armor: 0.35, big: 1, worth: 40, noBlood: 1, spoil: ["Golem's rune-stone", "🪨"] },
oni: { name: "Oni warrior", body: "folk", arch: "oni", arm: "club", hp: 160, spd: 3.6, armor: 0.15, big: 1, worth: 28, spoil: ["Oni's iron club-stud", "👹"] },
demon: { name: "Cinder demon", body: "folk", arch: "demon", arm: "claws", hp: 140, spd: 4.0, armor: 0.1, worth: 26, spoil: ["Demon's horn", "😈"] },
spiderbot: { name: "Spider-bot", body: "crawl", arch: "spiderbot", arm: "pulserifle", hp: 90, spd: 4.0, range: 28, armor: 0.25, worth: 16, noBlood: 1, spoil: ["Spider-bot's leg servo", "🕷️"] },
automaton: { name: "Rogue automaton", body: "folk", arch: "automaton", arm: "fists", hp: 120, spd: 3.0, armor: 0.3, worth: 18, noBlood: 1, spoil: ["Automaton's brass gear", "⚙️"] },
crabking: { name: "The Crab King", body: "crawl", arch: "crab", arm: "stomp", hp: 900, spd: 3.0, armor: 0.4, scale: 7, big: 2, worth: 160, noBlood: 1, chief: 1, spoil: ["The Crab King's barnacled crown", "👑"] },
oldtusk: { name: "Old Tusk", body: "beast", arch: "mammoth", arm: "stomp", hp: 1600, spd: 3.2, armor: 0.25, scale: 1.5, big: 2, worth: 260, chief: 1, spoil: ["Old Tusk's ivory", "🦣"] },
boarking: { name: "The Boar King", body: "beast", arch: "boar", arm: "stomp", hp: 500, spd: 4.6, armor: 0.15, scale: 2.2, big: 2, worth: 90, chief: 1, spoil: ["The Boar King's tusks", "🐗"] },
grimmaw: { name: "Grimmaw the dire bear", body: "beast", arch: "bear", arm: "stomp", hp: 800, spd: 4.4, armor: 0.2, scale: 1.9, big: 2, worth: 140, chief: 1, spoil: ["Grimmaw's claw", "🐻"] },
drownedking: { name: "The Drowned King", body: "folk", arch: "wraith", arm: "shadowtome", hp: 1100, spd: 3.4, range: 30, armor: 0.2, scale: 1.8, big: 2, worth: 200, noBlood: 1, chief: 1, spoil: ["The Drowned King's black pearl", "⚫"] },
magmaw: { name: "Magmaw the molten colossus", body: "folk", arch: "golem", arm: "breath", hp: 2200, spd: 2.6, range: 30, armor: 0.4, scale: 2.4, big: 2, worth: 340, noBlood: 1, chief: 1, spoil: ["Magmaw's molten core", "🌋"] },
colossus: { name: "The Iron Colossus", body: "robot", arm: "gatling", hp: 1800, spd: 2.2, range: 38, armor: 0.4, scale: 3, big: 2, worth: 300, chief: 1, spoil: ["The Colossus's reactor", "☢️"] },
sandmaw: { name: "Queen Sandmaw", body: "crawl", arch: "scorpion", arm: "stomp", hp: 1300, spd: 3.8, armor: 0.35, scale: 8, big: 2, worth: 220, noBlood: 1, chief: 1, spoil: ["Queen Sandmaw's sting", "🦂"] },
fisher: { name: "Fisher", body: "person", arm: "fists", hp: 9999, spd: 1.4, worth: 0, folk: 1, look: function () { return { top: 0x5A6A7A, bottom: 0x3A3A40, hat: "cap", hatColor: 0x2A3A4A, layer: "apron", layerColor: 0x6A5A3A }; } },
herder: { name: "Herder", body: "person", arm: "fists", hp: 9999, spd: 1.4, worth: 0, folk: 1, look: function () { return { top: 0x7A6A4A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x5A4A32 }; } },
farmer: { name: "Farmer", body: "person", arm: "fists", hp: 9999, spd: 1.3, worth: 0, folk: 1, look: function () { return { top: 0x8A7A5A, bottom: 0x3A4A5A, hat: "brimmed", hatColor: 0xC8B080, layer: "apron", layerColor: 0x6A5A3A }; } },
trader: { name: "Trader", body: "person", arm: "fists", hp: 9999, spd: 1.2, worth: 0, folk: 1, look: function () { return { top: 0x6A3A4A, bottom: 0x3A2A2A, layer: "longcoat", layerColor: 0x4A2A3A }; } },
scout: { name: "Outpost scout", body: "person", arm: "fists", hp: 9999, spd: 1.6, worth: 0, folk: 1, look: function () { return { top: 0x4A5A3A, bottom: 0x3A3A2A, hat: "hood", hatColor: 0x3A4A2A, back: "cloak", backColor: 0x3A4A2A }; } },
trapper: { name: "Trapper", body: "person", arm: "fists", hp: 9999, spd: 1.4, worth: 0, folk: 1, look: function () { return { top: 0x6A5A4A, bottom: 0x4A3A2A, hat: "hood", hatColor: 0xD8D0C0, layer: "longcoat", layerColor: 0x7A6A56 }; } },
smith: { name: "Smith", body: "person", arm: "fists", hp: 9999, spd: 1.2, worth: 0, folk: 1, look: function () { return { top: 0x5A3A2A, bottom: 0x3A3028, layer: "apron", layerColor: 0x3A2A1A, hands: "gloves" }; } },
miner: { name: "Miner", body: "person", arm: "fists", hp: 9999, spd: 1.3, worth: 0, folk: 1, look: function () { return { top: 0x6A5A40, bottom: 0x3A3A3A, hat: "helmet", hatColor: 0xC8A040 }; } },
woodcutter: { name: "Woodcutter", body: "person", arm: "fists", hp: 9999, spd: 1.3, worth: 0, folk: 1, look: function () { return { top: 0x8A3A2A, bottom: 0x3A3A4A, hat: "cap", hatColor: 0x5A2A1A }; } }
};
function ifgZones() {
if (IFG.zonesIn)
return;
IFG.zonesIn = true;
Object.keys(IFG_NEW_KINDS).forEach(function (k) { if (!BW_KINDS[k])
BW_KINDS[k] = IFG_NEW_KINDS[k]; });
if (typeof BW_TEAMS !== "undefined" && !BW_TEAMS.folk)
BW_TEAMS.folk = { name: "the people of the outposts", col: 0x7A6A4A, dark: 0x4A3A2A, css: "#E8D8B8" };
IFG_ORDER.forEach(function (k, i) {
var L = IFG_LANDS[k], a = L.a, ux = Math.cos(a), uz = Math.sin(a), W = L.warAt;
BW_ZONES.push({ k: "ifw_" + k, name: L.war.name + " (" + L.name.replace(/^The /, "") + ")", x: W.x, z: W.z, r: 110, col: 0x5A5E3A, land: k, lv: L.lv, sides: L.war.sides,
sp: { crimson: { x: W.x - ux * 48, z: W.z - uz * 48 }, azure: { x: W.x + ux * 48, z: W.z + uz * 48 } }, about: L.war.about + " (Combat level " + L.lv + ".)" });
BW_ZONES.push({ k: "ifx_" + k, name: L.wild.name, x: L.wildAt.x, z: L.wildAt.z, r: 100, col: 0x5A5E3A, land: k, lv: L.lv + 3, sides: { wild: L.wild.list }, sp: { wild: { x: L.wildAt.x, z: L.wildAt.z } },
chief: L.wild.chief, lair: L.lair, nosign: 1, about: L.wild.about + " (Combat level " + (L.lv + 3) + ".)" });
BW_ZONES.push({ k: "ifp_" + k, name: L.post.name, x: L.postAt.x, z: L.postAt.z, r: 30, col: 0x5A5E3A, land: k, lv: 0, sides: { folk: L.post.folk }, sp: { folk: { x: L.postAt.x, z: L.postAt.z } },
post: 1, nosign: 1, about: L.post.about + " Nobody fights here." });
});
BW_ZONES.forEach(function (Z) { BW_Z[Z.k] = Z; });
}
function ifgLvMul(lv) { return { hp: 1 + lv / 22, dmg: 1 + lv / 45 }; }
function ifgFoeLv(F) {
var Z = F && BW_Z[F.zone], base = Math.max(1, Math.round((F.max || F.k.hp || 40) / 14));
if (Z && Z.lv)
base = Math.max(base, Z.lv + (F.k.chief ? 6 : F.k.big ? 2 : 0));
return Math.min(60, base);
}
function ifgU(L) { return { ux: Math.cos(L.a), uz: Math.sin(L.a), tx: -Math.sin(L.a), tz: Math.cos(L.a) }; }
function ifgP(L, r, side) { var U = ifgU(L); return { x: U.ux * r + U.tx * side, z: U.uz * r + U.tz * side }; }
function ifgW2(x, z, rot, lx, lz) { var c = Math.cos(rot), s = Math.sin(rot); return { x: x + lx * c + lz * s, z: z - lx * s + lz * c }; }
function ifgBox(tex, w, h, d, x, y, z, rot, col, solid, rx, rz) {
bwPut(tex, new THREE.BoxGeometry(w, h, d), x, y + h / 2, z, rx || 0, rot || 0, rz || 0, col);
if (solid !== false)
bwSolid({ x: x, z: z, hw: w / 2, hd: d / 2, rot: rot || 0, h: h, b: y });
}
function ifgHut(x, z, rot, w, d, h, tex, col, roofTex, roofCol, y0) { return __ZC(502, 20, this, arguments, new.target); }
function ifgTent(x, z, rot, w, d, col) { return __ZC(502, 21, this, arguments, new.target); }
function ifgDen(G, x, z, face, r, h, col, name, frame) { return __ZC(502, 22, this, arguments, new.target); }
function ifgStoneWall(ax, az, bx, bz, h, col) { return __ZC(502, 23, this, arguments, new.target); }
function ifgKeeper(G, L, p, rot, title, look) {
var m = wPerson("ifg_keep_" + L.k, { title: title, look: look || {} });
m.position.set(p.x, bwH(p.x, p.z), p.z);
m.rotation.y = rot;
G.add(m);
BW.talk.push({ x: p.x, z: p.z, r: 3.4, name: title + " of " + L.post.name, verb: "hear about " + L.name.replace(/^The /, "the "), fn: function () { ifgLandCard(L); } });
}
function ifgLandCard(L) { return __ZC(502, 24, this, arguments, new.target); }
function ifgHideTip(k) { return __ZC(502, 25, this, arguments, new.target); }
var IFG_BUILD = {
coast: function (G, L, R) { return __ZC(502, 26, this, arguments, new.target); },
frost: function (G, L, R) { return __ZC(502, 27, this, arguments, new.target); },
moor: function (G, L, R) { return __ZC(502, 28, this, arguments, new.target); },
weald: function (G, L, R) { return __ZC(502, 29, this, arguments, new.target); },
fen: function (G, L, R) { return __ZC(502, 30, this, arguments, new.target); },
ember: function (G, L, R) { return __ZC(502, 31, this, arguments, new.target); },
bad: function (G, L, R) { return __ZC(502, 32, this, arguments, new.target); },
dune: function (G, L, R) { return __ZC(502, 33, this, arguments, new.target); }
};
var IFG_POST = {
coast: { tex: "wood", col: 0x8A7A66, roof: "wood", rc: 0x4A4038, title: "Harbour-master" },
frost: { tex: "wood", col: 0x7A5A3E, roof: "wood", rc: 0xE8ECF0, title: "Steadholder" },
moor: { tex: "stone", col: 0xC8C0B0, roof: "wood", rc: 0xB8A060, title: "Reeve" },
weald: { tex: "wood", col: 0x6A4A30, roof: "wood", rc: 0x4A5A30, title: "Woodward" },
fen: { tex: "wood", col: 0x6A5A44, roof: "wood", rc: 0x8A7A4A, title: "Mire-warden", stilt: 1 },
ember: { tex: "stone", col: 0x4A4440, roof: "rust", rc: 0x3A3634, title: "Forge-master" },
bad: { tex: "wood", col: 0x9A7050, roof: "rust", rc: 0x8A6A4A, title: "Camp boss" },
dune: { tex: "canvas", col: 0xE0D0A8, roof: "canvas", rc: 0xB86A3A, title: "Caravan-master", tents: 1 }
};
function ifgOutpost(G, L, R) { return __ZC(502, 34, this, arguments, new.target); }
function ifgSignposts(G) { return __ZC(502, 35, this, arguments, new.target); }
var IFG_COVER = { coast: [["rock", 16], ["barrels", 6], ["crates", 8], ["cart", 3]], frost: [["rock", 14], ["sandbags", 6], ["crates", 6], ["pine", 8]], moor: [["haybale", 12], ["cart", 5], ["rock", 10], ["stump", 8], ["ruinwall", 6, "stone"]],
weald: [["stump", 14], ["rock", 8], ["thicket", 12]], fen: [["stump", 8], ["barrels", 6], ["deadtree", 12]], ember: [["rock", 14], ["pillar", 6, "rock"], ["bones", 6]],
bad: [["rock", 16], ["barrier", 8], ["container", 4], ["barrels", 6]], dune: [["pillar", 12, "stone"], ["ruinwall", 8, "stone"], ["crates", 6], ["rock", 6]] };
function ifgCover(L, R) { return __ZC(502, 36, this, arguments, new.target); }
function ifgBuildLands(G) { return __ZC(502, 37, this, arguments, new.target); }
function ifgWarn(k, e) { if (window.console)
console.warn("[ironfray-grow] " + k, e); }
var IFG_MEADOWS = [
{ lands: { moor: 1, weald: 1, coast: 1, fen: 1 }, cols: { base: 0x56783A, lush: 0x3E622A, dry: 0x9A9A5A }, hMin: 0.12, hVar: 0.22, dens: 0.5 },
{ lands: { bad: 1, dune: 1, ember: 1 }, cols: { base: 0x8A7A4A, lush: 0x6A6A3A, dry: 0xC2AA74 }, hMin: 0.1, hVar: 0.2, dens: 0.05 },
{ lands: { frost: 1 }, cols: { base: 0xA8B0A4, lush: 0x8A967E, dry: 0xD2D0C2 }, hMin: 0.08, hVar: 0.18, dens: 0.0 }
];
function ifgMeadows(G) { return __ZC(502, 38, this, arguments, new.target); }
(function () {
if (typeof bwH !== "function" || typeof BW === "undefined" || typeof WORLDS === "undefined" || !WORLDS.battle)
return;
ifgZones();
IFG_H0 = bwH;
IFG_C0 = bwGroundCol;
bwH = function (x, z) { return ifgGround(x, z, false).h; };
bwGroundCol = function (x, z) { return Math.hypot(x, z) <= 420 ? IFG_C0(x, z) : 0x5A5E3A; };
var wg = wGround;
wGround = function (s, n, fn, mat) {
if (IFG.building && s === 1100 && IFG.G) {
try {
ifgBuildGround(IFG.G);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(9), 3));
g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(6), 2));
var m = new THREE.Mesh(g, mat || new THREE.MeshBasicMaterial());
m.visible = false;
return m;
}
catch (e) {
ifgWarn("ground", e);
}
}
return wg.apply(this, arguments);
};
bwMountainOld = bwMountain;
bwMountain = function (G, x, z, r, h, R, lite) {
if (!IFG.building)
return bwMountainOld.apply(this, arguments);
var k = 2.85, nx = x * k, nz = z * k, W = ifgWhich(nx, nz);
if (W.a === "coast" && W.wa > 0.6) {
R();
R();
return null;
}
return bwMountainOld(G, nx, nz, r * 1.7, h * 1.5, R, lite);
};
var bb = bwBuild;
bwBuild = function (G) {
IFG.building = true;
IFG.G = G;
IFG.kinds = null;
IFG.chiefs = {};
try {
bb.apply(this, arguments);
}
finally {
IFG.building = false;
}
try {
ifgBuildLands(G);
}
catch (e) {
ifgWarn("lands", e);
}
};
var bc = bwCamp;
bwCamp = function (G) {
var all = BW_ZONES.slice(), keep = all.filter(function (Z) { return !Z.nosign; });
BW_ZONES.length = 0;
keep.forEach(function (Z) { BW_ZONES.push(Z); });
try {
return bc.apply(this, arguments);
}
finally {
BW_ZONES.length = 0;
all.forEach(function (Z) { BW_ZONES.push(Z); });
}
};
var W = WORLDS.battle;
W.bound = IFG.R.bound;
var wb = W.block;
W.block = function (x, z, feet) { if (wb.call(this, x, z, feet))
return true; if (Math.hypot(x, z) > IFG.R.inner + 400 && ifgDeep(x, z))
return true; return false; };
var we = W.enter;
W.enter = function () {
var r = we.apply(this, arguments);
try {
setStatus("<b>Ironfray, the battle world.</b> You step through the War Gate into the Muster Camp, the Truce Ground, where nobody fights. The Armoury sells weapons, armour and fighters' kits; the Herald gives you a banner. Round the camp, the eight old battlefields; beyond them, over the ring of hills, eight wide lands, each with its own war, its wild things and their chief, and an outpost of people who live there: the Gullwrack Coast, the Frostfang Reach, the Highmoor Downs, the Blackroot Weald, the Drownmere Fen, the Emberfall Caldera, the Shatterstone Badlands and the Redsand Expanse. Your combat level counts here. (Back, or the gate behind you, goes home.)");
}
catch (e) { }
return r;
};
var bh = bwHostile;
bwHostile = function (a, b) { if (a === "folk" || b === "folk")
return false; return bh.apply(this, arguments); };
var bl = typeof bwBleeds === "function" ? bwBleeds : null;
if (bl)
bwBleeds = function (F) { if (F && F.k && F.k.noBlood)
return false; return bl.apply(this, arguments); };
var bs = bwSpawn;
bwSpawn = function (kind, team, zone) {
var F = bs.apply(this, arguments);
try {
var Z = F && BW_Z[zone];
if (F && Z && Z.lv && team !== "folk" && team !== "dummy" && !F.summon) {
var M = ifgLvMul(Z.lv);
F.hp = F.max = Math.round(F.k.hp * M.hp);
F.ifgDm = M.dmg;
}
}
catch (e) { }
return F;
};
var zf = bwZoneFill;
bwZoneFill = function (Z) {
var r = zf.apply(this, arguments);
try {
if (Z.chief && Z.active) {
var C = Z.chiefF;
if (!(C && C.st !== "dead" && BW.f.indexOf(C) > -1) && BW.t >= (Z.chiefBack || 0)) {
Z.chiefF = bwSpawn(Z.chief, "wild", Z.k, Z.lair.x, Z.lair.z);
if (Z.chiefF)
Z.chiefF.home = { x: Z.lair.x, z: Z.lair.z };
}
}
}
catch (e) {
ifgWarn("chief", e);
}
return r;
};
var hm = bwHurtMe;
bwHurtMe = function (dmg, src, raw) { try {
if (src && src.F && src.F.ifgDm)
dmg *= src.F.ifgDm;
}
catch (e) { } return hm.call(this, dmg, src, raw); };
var ft = bwFTick;
bwFTick = function (F, dt) {
var x = F.x, z = F.z;
var r = ft.apply(this, arguments);
try {
if (F.zone && F.zone.charAt(0) === "i" && F.st !== "dead" && (F.x !== x || F.z !== z)) {
var Z = BW_Z[F.zone];
if (Z && ((Z.land === "ember" && ifgLavaK(F.x, F.z) > 0.25) || ((Z.land === "coast" || Z.land === "fen") && bwH(F.x, F.z) < -1.1))) {
F.x = x;
F.z = z;
F.y = bwSupport(x, z, F.y + 0.4);
F.g.position.x = x;
F.g.position.z = z;
}
}
}
catch (e) { }
return r;
};
var hn = bwHiddenNow;
bwHiddenNow = function () { if (hn.apply(this, arguments))
return true; var L = worldLocal(), D = ifgInDeep(L.x, L.z); return !!D && (!D.crouch || !!BW.crouch); };
var sm = bwSeesMe;
bwSeesMe = function (x, y, z) { var L = worldLocal(), d = Math.hypot(L.x - x, L.z - z); if (d > 5) {
var D = ifgInDeep(L.x, L.z);
if (D && (!D.crouch || BW.crouch))
return false;
} return sm.apply(this, arguments); };
var lo = bwLoot;
bwLoot = function (F) {
var r = lo.apply(this, arguments);
try {
if (F.k.chief) {
var Z = BW_Z[F.zone];
if (Z) {
Z.chiefBack = BW.t + 300;
Z.chiefF = null;
}
bwSay("<b>You have brought down " + esc(F.k.name) + "!</b> It will take five minutes for the wild ground to bring forth another.", true);
var arts = Object.keys(BW_ARMS).filter(function (k) { return BW_ARMS[k].era === "Artifacts" && !bwOwns(k); });
if (arts.length && Math.random() < 0.5) {
var a = arts[Math.floor(Math.random() * arts.length)];
bwGive(a, true, "won");
bwSay("<b>" + esc(F.k.name) + " leaves an artifact:</b> " + esc(BW_ARMS[a].name) + " is in your backpack.", true);
}
}
}
catch (e) {
ifgWarn("chief down", e);
}
return r;
};
var bt = bwTick;
bwTick = function (dt) { var r = bt.apply(this, arguments); try {
ifgTick(Math.min(dt || 0, 0.1));
}
catch (e) {
if (!IFG.tw) {
IFG.tw = 1;
ifgWarn("tick", e);
}
} return r; };
})();
function ifgTick(dt) { return __ZC(502, 39, this, arguments, new.target); }
function ifgInLava(x, z, feet) { var L = ifgLandAt(x, z); if (!L || L.k !== "ember")
return false; var h = bwH(x, z); return h < IFG_LAVA_Y - 0.2 && feet < IFG_LAVA_Y + 0.5; }
(function () {
if (typeof cbtZoneNow !== "function" || typeof BW === "undefined")
return;
var inB = function () { return typeof WLD !== "undefined" && WLD.on === "battle"; };
var zn = cbtZoneNow;
cbtZoneNow = function () {
if (!inB())
return zn.apply(this, arguments);
if (typeof walkMode !== "undefined" && !walkMode)
return null;
if (BW.ride || BW.downT || bwInTruce())
return null;
var L = worldLocal(), land = ifgLandAt(L.x, L.z);
return { k: "battle", n: land ? land.name : "Ironfray", lv: land ? land.lv : 5 };
};
var cf = cbtFoes;
cbtFoes = function (range, storyOnly) {
if (!inB() || storyOnly)
return cf.apply(this, arguments);
var out = [], P = camera.position;
try {
bwFoesForMe().forEach(function (o) { var d = Math.hypot(o.x - P.x, o.z - P.z); if (d > range)
return; var f = ifgCbtFoe(o); if (!f)
return; f.d = d; out.push(f); });
}
catch (e) {
cbtWarn("ironfray foes", e);
}
return out.sort(function (a, b) { return a.d - b.d; });
};
window.cbtNativeFire = function () { if (!inB())
return false; if (BW.ride)
return true; var k = bwHeldKey(), A = k && BW_ARMS[k]; return !!A && A.kind !== "melee"; };
var cs = cbtStrike;
cbtStrike = function () { if (inB() && cbtNativeFire()) {
bwAttack();
return true;
} return cs.apply(this, arguments); };
var rd = cbtRawDmg;
cbtRawDmg = function () { if (inB()) {
var k = bwHeldKey(), A = k && BW_ARMS[k];
if (A && A.dmg)
return Math.round(A.dmg * (bwClass().dmg || 1) * (0.9 + Math.random() * 0.3));
} return rd.apply(this, arguments); };
var hf = bwHitF;
bwHitF = function (F, dmg, src) {
try {
if (src && src.me && !IFG.inCbt && CBT.on && F && F.team !== "dummy" && F.team !== "folk" && F.st !== "dead") {
var crit = Math.random() < cbtCritChance(), W = cbtWeapon();
dmg = dmg * cbtOutMult(W) * (crit ? 1.75 : 1);
CBT.fought = CBT.t;
if (crit) {
cbtFloatText(String(Math.round(dmg * (1 - (F.k.armor || 0)))), { x: BW.base + F.x, y: F.y + 1.6 * (F.k.big ? 1.6 : 1), z: F.z }, "#FFD86A", 1.2, true);
}
IFG.msT = (IFG.msT || 0) + 1;
if (IFG.msT % 3 === 0)
cbtMasteryXp(W.cls, 1);
CBT.fury = Math.min(100, CBT.fury + 2);
}
}
catch (e) { }
return hf.call(this, F, dmg, src);
};
if (typeof cbtAmFire === "function" && typeof bwAttack === "function") {
var ba = bwAttack;
bwAttack = function () {
var c0 = BW.cool, r = ba.apply(this, arguments);
try {
if (inB() && CBT.on && !BW.ride && c0 <= 0 && BW.cool > 0) {
var W = cbtWeapon();
if (W && W.ranged) {
var a = cbtAmFire(W, 1);
IFG.am = a ? { a: a, k: bwHeldKey(), until: BW.t + 4, after: 0 } : null;
}
}
}
catch (e) {
cbtWarn("ironfray ammo", e);
}
return r;
};
}
var hf2 = bwHitF;
bwHitF = function (F, dmg, src) {
var A = IFG.am, f = null, h0 = 0;
try {
if (A && src && src.me && !IFG.inCbt && BW.t <= A.until && bwHeldKey() === A.k && F && F.team !== "folk" && F.team !== "dummy" && F.st !== "dead") {
f = ifgCbtFoe({ F: F, x: BW.base + F.x, y: F.y, z: F.z, r: F.k.big ? 1.4 : 0.7 });
if (f) {
dmg = Math.max(1, Math.round(dmg * cbtAmMult(A.a, f)));
h0 = F.hp;
}
}
}
catch (e) {
f = null;
}
var r = hf2.call(this, F, dmg, src);
try {
if (f && !A.after && F.hp < h0) {
A.after = 1;
cbtAmAfter(A.a, f, h0 - F.hp);
}
}
catch (e) {
cbtWarn("ironfray ammo hit", e);
}
return r;
};
var lo = bwLoot;
bwLoot = function (F) {
var r = lo.apply(this, arguments);
try {
if (F.team !== "dummy" && F.team !== "folk")
cbtKilled({ name: F.k.name, lv: ifgFoeLv(F), boss: !!(F.k.chief || F.k.boss), at: { x: BW.base + F.x, y: F.y + 1.1, z: F.z } });
}
catch (e) {
cbtWarn("ironfray kill", e);
}
return r;
};
var hm = bwHurtMe;
bwHurtMe = function (dmg, src, raw) { var was = CBT.pvpIn; CBT.pvpIn = src && src.pvp ? 1 : was; try {
return hm.call(this, dmg, src, raw);
}
finally {
CBT.pvpIn = was;
} };
var bn = bwBeaten;
bwBeaten = function () { try {
if (CBT.on) {
cbtP().falls++;
CBT.fury = 0;
CBT.lock = null;
CBT.move = null;
cbtDirty();
}
}
catch (e) { } return bn.apply(this, arguments); };
var cv = cbtVig;
cbtVig = function () { if (inB())
return { hp: Math.max(0, +BW.hp || 0), max: +BW.max || 100 }; return cv.apply(this, arguments); };
var ch = cbtHeal;
cbtHeal = function (n) { if (inB()) {
n = Math.max(0, +n || 0);
if (!BW.downT)
BW.hp = Math.min(BW.max, BW.hp + n);
return;
} return ch.apply(this, arguments); };
if (typeof CBT_MAGIC !== "undefined" && Array.isArray(CBT_MAGIC) && !CBT_MAGIC.some(function (S) { return S.w === "battle"; })) {
[{ id: "w_warhorn", sch: "world", w: "battle", wn: "Ironfray", elem: "storm", n: "War Horn of Ironfray", i: "📯", lv: 8, mana: 30, cd: 22, t: "around", m: 1.1, rad: 7, stun: 1.4, d: "The great horn of the Muster Camp sounds through you: every foe near is struck and staggered." },
{ id: "w_ironrain", sch: "world", w: "battle", wn: "Ironfray", elem: "steel", n: "Iron Rain", i: "🌧️", lv: 14, mana: 40, cd: 24, t: "zone", m: 0.7, rad: 6, ticks: 5, gap: 0.35, bleed: 3, d: "A storm of old arrowheads and shrapnel falls on the foe and all round it." }]
.forEach(function (S) { CBT_MAGIC.push(S); if (typeof CBT_MAGIC_BY !== "undefined")
CBT_MAGIC_BY[S.id] = S; });
}
})();
function ifgCbtFoe(o) { return __ZC(502, 40, this, arguments, new.target); }
function ifgHudPlace() { return __ZC(502, 41, this, arguments, new.target); }
(function () { if (typeof bwLayout !== "function")
return; var bl = bwLayout; bwLayout = function () { var r = bl.apply(this, arguments); try {
if (typeof WLD !== "undefined" && WLD.on === "battle")
ifgHudPlace();
}
catch (e) { } return r; }; })();
var IFG_ARMOUR = {
gambeson: { name: "Quilted gambeson", armor: 0.06, hp: 10, price: 90, about: "Thick padded cloth: light, quiet, cheap." },
leather: { name: "Boiled-leather brigandine", armor: 0.1, hp: 15, price: 240, about: "Hardened leather plates riveted inside a coat." },
mail: { name: "Mail hauberk", armor: 0.16, hp: 20, price: 680, about: "Riveted rings from neck to knee." },
lamellar: { name: "Lacquered lamellar (o-yoroi)", armor: 0.18, hp: 22, price: 1450, about: "The samurai's laced plates." },
ballistic: { name: "Ballistic vest and helmet", armor: 0.18, hp: 18, price: 950, about: "Woven plates that stop a bullet." },
plate: { name: "Plate harness", armor: 0.25, hp: 30, price: 2600, about: "Full steel plate: the best that forge and hammer make." },
starplate: { name: "Star-plate armour", armor: 0.23, hp: 28, price: 3400, about: "Sealed armour from beyond the stars." }
};
var IFG_SHIELDS = {
buckler: { name: "Buckler", front: 0.15, block: 0.78, price: 80, about: "A small round fist-shield: quick, and it turns a blade." },
round: { name: "Round shield", front: 0.25, block: 0.84, price: 170, about: "Limewood boards and an iron boss, as the raiders of the north carry." },
heater: { name: "Heater shield", front: 0.3, block: 0.88, price: 340, about: "The knight's shield: steel-faced, painted with your banner." },
tower: { name: "Tower shield", front: 0.4, block: 0.92, price: 620, about: "Tall as a man: a wall to fight behind." },
riot: { name: "Ballistic riot shield", front: 0.35, block: 0.9, price: 780, about: "Clear and bullet-proof, with a pistol you can fire round it." },
energy: { name: "Energy buckler", front: 0.35, block: 0.93, price: 2300, about: "A disc of hard light on the forearm." }
};
var IFG_TWO_HANDS = /^(greatsword|claymore|katana|battleaxe|warhammer|halberd|quarterstaff|scythe|lance|longbow|crossbow|horsebow|arbalest|musket|rifle|trenchgun|leveraction|shotgun|blunderbuss|handcannon|smg|assault|sniper|gatling|bazooka|grenadelauncher|mortar|plasma|railgun|pulserifle|arccaster|ioncannon|gravhammer|freezeray|lasersniper|micromissiles|sonic|flamer|firestaff|froststaff|stormrod|stonestaff|thornstaff|lightstaff|mendstaff|bonescythe|thundermaul|wyrmbow|moonscythe)$/;
var IFG_TWO_HELD = /greatsword|staff|rifle|shotgun|smg|assault|sniper|gatling|launcher|rail|bow|crossbow|flamer|scythe|glaive|lance/i;
function ifgTwoHanded(k, A) { if (IFG_TWO_HANDS.test(k))
return true; if (/^(roundshield|dawnaegis)$/.test(k))
return true; if (A && A.held && IFG_TWO_HELD.test(String(A.held)) && !/^bw(Pistol|Wand)$/.test(String(A.held)))
return true; return false; }
var IFG_MACH = { tank: { name: "Tank", price: 12000 }, mech: { name: "Walker mech", price: 9500 }, spider: { name: "Spider walker", price: 15000 }, hover: { name: "Hover-tank", price: 22000 }, titan: { name: "Aegis-class war frame", price: 60000 } };
var IFG_PARTS = [["frame", "Frame and running gear"], ["engine", "Engine"], ["armour", "Armour plate"], ["guns", "Weapons"]];
var IFG_ERA_BASE = { "Ancient": 60, "Blades": 150, "Axes and hammers": 140, "Pole arms": 120, "Bows and throwing": 110, "Firearms": 380, "Heavy weapons": 1500, "Star weapons": 1100, "Magic": 850 };
function ifgWeaponPrice(A) {
var b = IFG_ERA_BASE[A.era];
if (!b)
return null;
var score = A.kind === "self" ? 20 : A.kind === "summon" ? 40 : (+A.dmg || 10) * (A.kind === "cone" ? 3 : A.kind === "beam" ? 1.2 : 1) / Math.sqrt(Math.max(0.05, +A.cool || 0.6));
return Math.max(25, Math.round(b * (0.6 + score / 25) / 5) * 5);
}
function ifgGoods(ARMS, CLASSES, MACHN) { return __ZC(502, 42, this, arguments, new.target); }
var IFG_SHOP = { owned: {}, srv: "", goods: null, by: {}, sure: null, tab: "kit", msg: "", keeper: false };
function ifgShopGoods() {
if (IFG_SHOP.goods)
return IFG_SHOP.goods;
IFG_SHOP.goods = ifgGoods(BW_ARMS, BW_CLASSES, null);
IFG_SHOP.goods.forEach(function (g) { IFG_SHOP.by[g.item] = g; });
return IFG_SHOP.goods;
}
function ifgIsKeeper() { if (IFG_SHOP.keeper)
return true; try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function ifgSigned() { try {
return typeof signedIn === "function" && signedIn() && typeof cityRpc === "function";
}
catch (e) {
return false;
} }
function ifgOpenShop() { return IFG_SHOP.srv === "ok"; }
function ifgOwnedLoad() { if (IFG_SHOP.ownLoaded)
return; IFG_SHOP.ownLoaded = 1; try {
var d = bwData();
(Array.isArray(d.own) ? d.own : []).forEach(function (i) { IFG_SHOP.owned[i] = 1; });
}
catch (e) { } }
function ifgOwns(item) { return __ZC(502, 43, this, arguments, new.target); }
function ifgWonKept(k) { return bkpKept().some(function (q) { return q.a === "bw_" + k && q.got === "won"; }); }
function ifgKitOk() { var d = bwData(); return !d.cls || ifgOwns("k_" + d.cls); }
function ifgShopTidy() { return __ZC(502, 44, this, arguments, new.target); }
function ifgShopLoad() { return __ZC(502, 45, this, arguments, new.target); }
function ifgShopSync() {
Object.keys(IFG_SHOP.owned).forEach(function (i) { var m = /^w_(.+)$/.exec(i); if (m && BW_ARMS[m[1]] && !bwOwns(m[1]))
bwGive(m[1], true, "bought"); });
}
function ifgBuy(item, then) { return __ZC(502, 46, this, arguments, new.target); }
function ifgPurse() { try {
return typeof standing !== "undefined" && standing && standing.gold != null ? (+standing.gold).toLocaleString() + " gold" : "";
}
catch (e) {
return "";
} }
function ifgPrice(G) { return G && G.price ? G.price.toLocaleString() + " gold" : "free"; }
function ifgArmoury() { return __ZC(502, 47, this, arguments, new.target); }
(function () { if (typeof bwArmoury === "function")
bwArmoury = ifgArmoury; })();
var IFG_CLS_OLD = null;
function ifgArmourApply() { try {
var C = bwClass();
BW.max = C.hp || 100;
if (BW.hp > BW.max)
BW.hp = BW.max;
}
catch (e) { } }
(function () {
if (typeof bwClass !== "function")
return;
IFG_CLS_OLD = bwClass;
bwClass = function () {
var c = IFG_CLS_OLD.apply(this, arguments), d = bwData(), A = d.arm && IFG_ARMOUR[d.arm];
if (d.cls && !ifgKitOk())
c = { hp: 100, armor: 0, dmg: 1 };
if (!A || !ifgOwns("a_" + d.arm))
return c;
var o = {};
for (var k in c)
o[k] = c[k];
o.armor = Math.max(c.armor || 0, A.armor);
o.hp = Math.max(c.hp || 100, 100 + A.hp);
o.dmg = c.dmg || 1;
return o;
};
})();
function ifgShieldNow() {
if (typeof WLD === "undefined" || WLD.on !== "battle" || BW.ride)
return null;
var d = bwData(), S = d.sh && IFG_SHIELDS[d.sh];
if (!S)
return null;
if (!ifgOwns("s_" + d.sh))
return null;
var k = bwHeldKey();
if (k && ifgTwoHanded(k, BW_ARMS[k]))
return null;
return S;
}
(function () {
if (typeof bwHurtMe !== "function")
return;
var hm = bwHurtMe;
bwHurtMe = function (dmg, src, raw) {
var S = ifgShieldNow(), was = BW.block;
try {
if (S && src && src.x !== undefined) {
var L = worldLocal(), a = Math.atan2(-(src.x - L.x), -(src.z - L.z));
if (Math.abs(bwAngDiff(yaw, a)) < 1.05) {
if (BW.block) {
dmg *= 1 - S.block;
BW.block = false;
if (typeof playTone === "function")
playTone(380, 0.08);
IFG.shHit = 1;
}
else {
dmg *= 1 - S.front;
IFG.shHit = 0.6;
}
}
}
}
catch (e) { }
try {
return hm.call(this, dmg, src, raw);
}
finally {
BW.block = was;
}
};
if (typeof bwVmTick === "function") {
var vt = bwVmTick;
bwVmTick = function (dt) { var r = vt.apply(this, arguments); try {
ifgShieldView(dt);
}
catch (e) { } return r; };
}
if (typeof bwEquip === "function") {
var be = bwEquip;
bwEquip = function (k) { var r = be.apply(this, arguments); try {
var d = bwData();
if (d.sh && IFG_SHIELDS[d.sh] && ifgTwoHanded(k, BW_ARMS[k]) && !IFG.toldTwo) {
IFG.toldTwo = 1;
bwSay("The " + esc(BW_ARMS[k].name) + " needs both hands: your shield goes on your back until you take up a one-handed weapon.");
}
}
catch (e) { } return r; };
}
})();
function ifgShieldView(dt) { return __ZC(502, 48, this, arguments, new.target); }
function ifgOwnsMach(t) { if (ifgIsKeeper())
return true; ifgOwnedLoad(); return !!IFG_SHOP.owned["m_" + t]; }
function ifgMotorPool(msg) { return __ZC(502, 49, this, arguments, new.target); }
(function () {
if (typeof bwMount !== "function")
return;
var bm = bwMount;
bwMount = function (M) { try {
if (M && M.pool && !M.crafted && !ifgOwnsMach(M.type)) {
IFG_SHOP.sure = null;
ifgMotorPool("The " + esc((M.T && M.T.name) || "machine") + " is the Motor Pool's: buy it, or build one of your own a part at a time.");
return;
}
}
catch (e) { } return bm.apply(this, arguments); };
var bb = bwBuild;
bwBuild = function (G) {
var r = bb.apply(this, arguments);
try {
var ck = wPerson("ifgclerk", { title: "Motor Pool clerk", look: { top: 0x6A5A3A, bottom: 0x3A3A32, hat: "cap", hatColor: 0x3A3A32 } });
ck.position.set(10, 0, 24.5);
ck.rotation.y = Math.PI;
G.add(ck);
bwSolid({ x: 10, z: 24.5, hw: 0.4, hd: 0.4, h: 1.9 });
BW.talk.push({ x: 10, z: 24.5, r: 3, name: "The Motor Pool clerk", verb: "buy a war machine, or build one part by part", fn: function () { IFG_SHOP.sure = null; IFG_SHOP.msg = ""; ifgMotorPool(); } });
}
catch (e) { }
return r;
};
var we = WORLDS.battle && WORLDS.battle.enter;
if (we)
WORLDS.battle.enter = function () { var r = we.apply(this, arguments); try {
if (IFG_SHOP.srv === "later")
IFG_SHOP.srv = "";
ifgShopLoad();
ifgArmourApply();
}
catch (e) { } return r; };
})();
var IFG_WH = { el: null, open: false, downT: 0, timer: null, page: 0, pick: null, list: [], cx: 0, cy: 0, held: false, rep: null };
function ifgWhOn() { return typeof WLD !== "undefined" && WLD.on === "battle" && typeof armbTouch === "function" && armbTouch() && !(typeof BW !== "undefined" && BW.ride) && !(typeof bwVR === "function" && bwVR()); }
function ifgWhStrike() {
try {
if (typeof CBT !== "undefined" && CBT.on && typeof cbtStrike === "function") {
cbtStrike();
return;
}
}
catch (e) { }
if (typeof bwAttack === "function")
bwAttack();
}
function ifgWhBuild() { return __ZC(502, 50, this, arguments, new.target); }
var IFG_WH_N = 10;
function ifgWhOpen() { return __ZC(502, 51, this, arguments, new.target); }
function ifgWhPaint() { return __ZC(502, 52, this, arguments, new.target); }
function ifgWhHover(x, y) {
var best = null, bd = 40;
(IFG_WH.spots || []).forEach(function (s) { var d = Math.hypot(s.x - x, s.y - y); if (d < bd) {
bd = d;
best = s.k;
} });
if (best !== IFG_WH.pick) {
IFG_WH.pick = best;
ifgWhPaint();
}
}
function ifgWhChoose() {
var k = IFG_WH.pick;
ifgWhClose();
if (k && BW_ARMS[k] && k !== bwHeldKey()) {
bwEquip(k);
if (typeof bwSay === "function")
bwSay("<b>" + esc(BW_ARMS[k].name) + "</b> in hand.");
}
}
function ifgWhClose() { IFG_WH.open = false; IFG_WH.pick = null; if (IFG_WH.el) {
IFG_WH.el.style.display = "none";
IFG_WH.el.style.pointerEvents = "none";
IFG_WH.el.innerHTML = "";
} }
function ifgWhTick() {
var on = ifgWhOn();
ifgWhBuild();
if (document.body.classList.contains("ifg-wh") !== on)
document.body.classList.toggle("ifg-wh", on);
var b = document.getElementById("t-arm");
if (b && b.classList.contains("ifg-wh-b") !== on)
b.classList.toggle("ifg-wh-b", on);
if (!on && IFG_WH.open)
ifgWhClose();
}
(function () {
if (typeof bwTick !== "function")
return;
var bt = bwTick, acc = 0;
bwTick = function (dt) { var r = bt.apply(this, arguments); acc -= dt || 0; if (acc <= 0) {
acc = 0.5;
try {
ifgWhTick();
}
catch (e) { }
} return r; };
if (WORLDS.battle && WORLDS.battle.leave) {
var lv = WORLDS.battle.leave;
WORLDS.battle.leave = function () { var r = lv.apply(this, arguments); try {
document.body.classList.remove("ifg-wh");
var b = document.getElementById("t-arm");
if (b)
b.classList.remove("ifg-wh-b");
ifgWhClose();
}
catch (e) { } return r; };
}
})();
var IFS_MEADOWS = [
{ kinds: { camp: 1, siege: 1, sky: 1, pass: 1, open: 1 }, cols: { base: 0x5A7A3A, lush: 0x41652A, dry: 0x9A9A5A }, hMin: 0.12, hVar: 0.24, dens: 0.55 },
{ kinds: { trench: 1, ruins: 1, crater: 1, arena: 1 }, cols: { base: 0x7A7444, lush: 0x5E6434, dry: 0xA89A64 }, hMin: 0.1, hVar: 0.2, dens: 0.22 },
{ kinds: { fang: 1 }, cols: { base: 0x5A5446, lush: 0x46423A, dry: 0x7A7058 }, hMin: 0.1, hVar: 0.22, dens: 0.24 }
];
function ifsKind(x, z) { return __ZC(502, 53, this, arguments, new.target); }
(function () {
if (typeof ifgMeadows !== "function")
return;
var m0 = ifgMeadows;
ifgMeadows = function (G) {
m0.apply(this, arguments);
if (typeof aupMeadow !== "function")
return;
var lite = ifgLite(), base = WORLDS.battle.base || BW.base;
IFS_MEADOWS.forEach(function (Md, i) {
var grow = function (x, z) { var k = ifsKind(x, z); if (!k || !Md.kinds[k])
return false; if (bwSolidAt(x, z, 0.5))
return false; return true; };
try {
var m = aupMeadow(G, { lite: lite, origin: base, start: [0, 0], height: function (x, z) { return bwH(x, z); }, grow: grow, hMin: Md.hMin, hVar: Md.hVar, dens: Md.dens, seed: 911 + i * 41, cols: Md.cols });
if (m) {
m.name = "ifs-meadow";
if (!m.instanceColor) {
var n0 = m.count;
m.count = m.instanceMatrix.count;
m.setColorAt(0, new THREE.Color(Md.cols.base));
m.count = n0;
m.instanceColor.needsUpdate = true;
}
}
}
catch (e) {
ifgWarn("old-field meadow", e);
}
});
};
})();
function ifsG(k, f) { return f(); }
function ifsSolid(o) { if (o.h !== undefined)
o.b = bwH(o.x, o.z); return bwSolid(o); }
function ifsBarrel(x, z, R) { return __ZC(502, 54, this, arguments, new.target); }
function ifsCrate(x, z, R, s) {
s = s || 0.8 + R() * 0.3;
var y = bwH(x, z), ry = R() * 1.5;
bwPut("wood", ifsG("box1", function () { return new THREE.BoxGeometry(1, 1, 1); }), x, y + s / 2, z, 0, ry, 0, [0x8A6A40, 0x7A5A34, 0x9A7A4A][Math.floor(R() * 3)], s, s, s);
ifsSolid({ x: x, z: z, hw: s / 2 + 0.05, hd: s / 2 + 0.05, rot: ry, h: s });
}
function ifsCrates(x, z, R) { ifsCrate(x, z, R, 0.9); ifsCrate(x + 1.0, z + 0.2, R, 0.8); var y = bwH(x, z); bwPut("wood", ifsG("box1", function () { return new THREE.BoxGeometry(1, 1, 1); }), x + 0.4, y + 1.25, z + 0.1, 0, R(), 0, 0x8A6A40, 0.7, 0.7, 0.7); }
function ifsSandbags(x, z, R, ry) { return __ZC(502, 55, this, arguments, new.target); }
function ifsRock(x, z, R, s, col) {
s = s || 0.5 + R() * 1.0;
var y = bwH(x, z);
bwPut("rock", ifsG("rock", function () { return new THREE.DodecahedronGeometry(1, 0); }), x, y + s * 0.35, z, R(), R() * 6, R(), col || [0x7A7468, 0x6A665C, 0x8A8478][Math.floor(R() * 3)], s * 1.2, s * 0.7, s);
ifsSolid({ x: x, z: z, r: s * 0.95, h: s * 0.9 });
}
function ifsShrub(x, z, R, col) { return __ZC(502, 56, this, arguments, new.target); }
function ifsDeadTree(x, z, R) { return __ZC(502, 57, this, arguments, new.target); }
function ifsCart(x, z, R) { return __ZC(502, 58, this, arguments, new.target); }
function ifsFence(x, z, R, ry) { return __ZC(502, 59, this, arguments, new.target); }
function ifsRubble(x, z, R, col) {
var y = bwH(x, z);
for (var i = 0; i < 6; i++) {
var s = 0.25 + R() * 0.45;
bwPut("brick", ifsG("chunk", function () { return new THREE.BoxGeometry(1, 1, 1); }), x + (R() - 0.5) * 2, y + s * 0.3, z + (R() - 0.5) * 2, R(), R() * 6, R() * 0.5, col || [0x7A6A5A, 0x6A6A6E, 0x8A7A6A][i % 3], s * 1.4, s * 0.6, s);
}
ifsSolid({ x: x, z: z, r: 1.2, h: 0.7 });
}
function ifsBones(x, z, R) { return __ZC(502, 60, this, arguments, new.target); }
function ifsHay(x, z, R) { var y = bwH(x, z), ry = R() * 6; bwPut("canvas", ifsG("bale", function () { return new THREE.CylinderGeometry(0.75, 0.75, 1.2, 14); }), x, y + 0.75, z, Math.PI / 2, ry, 0, 0xC8B070); ifsSolid({ x: x, z: z, r: 0.8, h: 1.5 }); }
function ifsWoodpile(x, z, R) { return __ZC(502, 61, this, arguments, new.target); }
function ifsFireRing(x, z, R) { return __ZC(502, 62, this, arguments, new.target); }
function ifsRack(x, z, R) { return __ZC(502, 63, this, arguments, new.target); }
var IFS_LITTER = {
siege: [["crates", 2], ["barrel", 2], ["cart", 2], ["fence", 2], ["rock", 2], ["shrub", 3], ["rubble", 1], ["hay", 1]],
trench: [["sandbags", 5], ["barrel", 2], ["crates", 2], ["rubble", 1], ["deadtree", 2], ["fence", 2], ["cart", 1]],
ruins: [["rubble", 5], ["barrel", 2], ["crates", 2], ["cart", 2], ["rock", 1], ["shrub", 1]],
arena: [["barrel", 2], ["crates", 2], ["cart", 1], ["hay", 1], ["rock", 1]],
fang: [["deadtree", 4], ["bones", 4], ["rock", 3], ["rubble", 1], ["shrub", 1]],
sky: [["rock", 2], ["shrub", 3], ["barrel", 1], ["crates", 1]],
pass: [["rock", 3], ["shrub", 4], ["fence", 1], ["crates", 1], ["barrel", 1]],
crater: [["rock", 4], ["rubble", 2], ["crates", 1], ["barrel", 1]],
open: [["rock", 3], ["shrub", 4], ["fence", 1], ["deadtree", 1], ["cart", 1]]
};
var IFS_PUT = { crates: ifsCrates, barrel: ifsBarrel, cart: ifsCart, rock: function (x, z, R) { ifsRock(x, z, R); }, shrub: function (x, z, R) { ifsShrub(x, z, R); }, rubble: function (x, z, R) { ifsRubble(x, z, R); },
hay: ifsHay, deadtree: ifsDeadTree, bones: ifsBones, woodpile: ifsWoodpile, firering: ifsFireRing, rack: ifsRack,
sandbags: function (x, z, R) { ifsSandbags(x, z, R, R() * 6); }, fence: function (x, z, R) { ifsFence(x, z, R, R() * 6); } };
function ifsPick(list, R) { var t = 0; list.forEach(function (e) { t += e[1]; }); var r = R() * t; for (var i = 0; i < list.length; i++) {
r -= list[i][1];
if (r <= 0)
return list[i][0];
} return list[0][0]; }
function ifsLitter(G) { return __ZC(502, 64, this, arguments, new.target); }
(function () {
if (typeof bwCover !== "function")
return;
var c0 = bwCover;
bwCover = function (G) { c0.apply(this, arguments); try {
ifsLitter(G);
}
catch (e) {
ifgWarn("litter", e);
} };
})();
(function () { if (typeof WORLDS !== "undefined" && WORLDS.battle && (WORLDS.battle.far || 0) < 3200)
WORLDS.battle.far = 3200; })();
var IFS_LAND_LITTER = {
coast: [["rock", 3], ["barrel", 2], ["crates", 2], ["cart", 1], ["bones", 1], ["shrub", 1]],
frost: [["rock", 4], ["deadtree", 3], ["firering", 1], ["woodpile", 1], ["crates", 1], ["bones", 1]],
moor: [["rock", 3], ["shrub", 4], ["fence", 3], ["deadtree", 1], ["hay", 1]],
weald: [["deadtree", 2], ["shrub", 4], ["rock", 2], ["woodpile", 1], ["cart", 1]],
fen: [["deadtree", 4], ["shrub", 2], ["bones", 1], ["rock", 1]],
ember: [["rock", 5], ["rubble", 2], ["bones", 2]],
bad: [["rock", 4], ["deadtree", 2], ["bones", 2], ["rubble", 1], ["cart", 1]],
dune: [["rock", 3], ["bones", 2], ["crates", 1], ["barrel", 1], ["cart", 1]]
};
function ifsLandOK(x, z, key) { return __ZC(502, 65, this, arguments, new.target); }
function ifsLandLitter(G) { return __ZC(502, 66, this, arguments, new.target); }
var IFS_NEAR = [[122, -751], [194, -918], [195, -605], [96, -467], [291, -823], [1013, -701], [86, -29], [302, -440]];
(function () {
if (typeof bwCover !== "function")
return;
var c0 = bwCover;
bwCover = function (G) { c0.apply(this, arguments); try {
ifsLandLitter(G);
}
catch (e) {
ifgWarn("land litter", e);
} };
})();
