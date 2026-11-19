/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DMK = { v: 1, spec: null, edit: null, sel: -1, undo: [], run: null, open: false, base: -9800000, crawlBase: -9650000, say: "", tab: "make", board: null, boardTab: "best", keeperList: null };
var DMK_CELL = 2;
var DMK_SIZES = [
{ k: "snug", n: "Snug", rooms: 5, sub: "five rooms: a quick crawl" },
{ k: "small", n: "Small", rooms: 8, sub: "eight rooms" },
{ k: "medium", n: "Medium", rooms: 12, sub: "twelve rooms: an evening's crawl" },
{ k: "large", n: "Large", rooms: 17, sub: "seventeen rooms" },
{ k: "huge", n: "Huge", rooms: 23, sub: "twenty-three rooms" },
{ k: "sprawl", n: "Sprawling", rooms: 30, sub: "thirty rooms: bring food" }
];
var DMK_SHAPES = [
{ k: "winding", n: "Winding road", sub: "one long way, room after room, with a few side rooms" },
{ k: "branch", n: "Branching", sub: "the way forks again and again; dead ends hide things" },
{ k: "hub", n: "Great hub", sub: "a great middle hall with ways out on every side" },
{ k: "wings", n: "Twin wings", sub: "two long wings that meet at the end" },
{ k: "maze", n: "Labyrinthine", sub: "rooms joined every which way, loops and all" },
{ k: "cavern", n: "Cavern sprawl", sub: "rough caves of every size, opening into each other" }
];
var DMK_PARTY = [
{ k: "1", n: "Solo", sub: "one dreamer", mul: 1 }, { k: "2", n: "A pair", sub: "two dreamers", mul: 1.5 },
{ k: "4", n: "Three or four", sub: "a small party", mul: 2.2 }, { k: "6", n: "Five or six", sub: "a full party", mul: 3 },
{ k: "8", n: "Seven or eight", sub: "a raid", mul: 3.8 }
];
var DMK_DIFF = [
{ k: "gentle", n: "Gentle", sub: "beasts hit softly and slowly", hp: 0.6, dmg: 0.5, lv: 1 },
{ k: "fair", n: "Fair", sub: "a fair fight", hp: 1, dmg: 0.8, lv: 2 },
{ k: "hard", n: "Hard", sub: "bring your best weapon", hp: 1.35, dmg: 1.05, lv: 3 },
{ k: "brutal", n: "Brutal", sub: "beasts hit hard and do not tire", hp: 1.8, dmg: 1.35, lv: 4 },
{ k: "nightmare", n: "Nightmare", sub: "only for the bold", hp: 2.5, dmg: 1.75, lv: 5 }
];
var DMK_MANY = [{ k: "few", n: "Few", m: 0.6 }, { k: "some", n: "Some", m: 1 }, { k: "many", n: "Many", m: 1.5 }, { k: "swarm", n: "Swarming", m: 2.2 }];
var DMK_OFTEN = [{ k: "none", n: "None", m: 0 }, { k: "few", n: "Few", m: 0.25 }, { k: "some", n: "Some", m: 0.45 }, { k: "many", n: "Many", m: 0.7 }];
var DMK_LOOT = [{ k: "meagre", n: "Meagre", m: 0.5 }, { k: "fair", n: "Fair", m: 1 }, { k: "rich", n: "Rich", m: 1.6 }, { k: "hoard", n: "A hoard", m: 2.4 }];
var DMK_LIGHT = [
{ k: "torch", n: "Torch-lit", sub: "torches on the walls, warm and steady", amb: 0.5, pt: 1.3 },
{ k: "dim", n: "Dim", sub: "few torches, long shadows", amb: 0.32, pt: 0.95 },
{ k: "dark", n: "Lantern dark", sub: "near black: your own lantern goes with you", amb: 0.16, pt: 0.55, lantern: 1 },
{ k: "crystal", n: "Crystal glow", sub: "cold light from crystals in the rock", amb: 0.45, pt: 1.1, crystal: 1 },
{ k: "fire", n: "Fire-lit", sub: "braziers and fire pits everywhere", amb: 0.55, pt: 1.5 }
];
var DMK_DECOR = [
{ k: "bare", n: "Bare stone", sub: "a few things where they fell", m: 0.35 },
{ k: "lived", n: "Lived-in", sub: "someone was here not long ago", m: 0.75 },
{ k: "furnished", n: "Furnished", sub: "every room set out for its use", m: 1.1 },
{ k: "lavish", n: "Lavish", sub: "crammed with fine things", m: 1.6 }
];
var DMK_SETS = [
["banners", "Banners and hangings"], ["candles", "Candles"], ["bones", "Bones and skulls"], ["barrels", "Barrels and crates"],
["books", "Bookcases"], ["statues", "Statues"], ["webs", "Cobwebs"], ["gold", "Heaps of treasure"], ["chains", "Chains and shackles"],
["rugs", "Rugs"], ["tables", "Tables and benches"], ["racks", "Weapon racks"], ["pools", "Pools of water"], ["shrooms", "Glowing mushrooms"],
["altars", "Altars"], ["tapestry", "Tapestries"], ["camp", "Bedrolls and a camp"], ["cages", "Cages"], ["pillars", "Pillars"], ["rubble", "Rubble and fallen stone"]
];
var DMK_THEMES = [
{ k: "crypt", n: "Old crypt", sub: "grey stone, coffins and bones", stone: 0x8A8478, floor: 0x6E6A62, light: 0xFFB070, fog: 0x15130F, beasts: ["restless", "hollowshade", "faceless", "watcher"], sets: ["bones", "candles", "altars", "webs", "pillars", "statues"], boss: "faceless" },
{ k: "temple", n: "Sunken temple", sub: "green-stained marble, still water", stone: 0x7E8A80, floor: 0x5E6A62, light: 0x9AE0C8, fog: 0x0E1816, beasts: ["mirelizard", "mirespider", "deepshade", "watcher"], sets: ["pools", "statues", "pillars", "altars", "shrooms"], boss: "mirelizard" },
{ k: "dwarf", n: "Dwarf hold", sub: "square-cut granite, forges and halls", stone: 0x8C8076, floor: 0x6A5E54, light: 0xFFA650, fog: 0x16110C, beasts: ["tunnelgob", "deeptroll", "renegade", "cavespider"], sets: ["racks", "barrels", "tables", "banners", "pillars", "rubble"], boss: "deeptroll" },
{ k: "spider", n: "Spider caves", sub: "rough rock thick with webs", stone: 0x6E665E, floor: 0x4E4842, light: 0xC8B0FF, fog: 0x100E14, beasts: ["cavespider", "mirespider", "glassstalker"], sets: ["webs", "bones", "rubble", "shrooms", "cages"], boss: "cavespider", cave: 1 },
{ k: "frost", n: "Frost vault", sub: "blue ice over old stone", stone: 0x9AB0C4, floor: 0x8094A8, light: 0xA8D8FF, fog: 0x0E1622, beasts: ["rimeyeti", "snowbear", "hollowshade"], sets: ["pillars", "statues", "chains", "rubble", "bones"], boss: "rimeyeti" },
{ k: "fungal", n: "Fungal grotto", sub: "soft earth and giant glowing mushrooms", stone: 0x6A5E50, floor: 0x4A4036, light: 0xA0FFB0, fog: 0x0E140E, beasts: ["mirespider", "mirelizard", "acidwraith", "wildboar"], sets: ["shrooms", "pools", "rubble", "camp", "bones"], boss: "brimcrawler", cave: 1 },
{ k: "tomb", n: "Desert tomb", sub: "sandstone, gold and painted walls", stone: 0xC8A878, floor: 0xA88A5E, light: 0xFFC880, fog: 0x1A140C, beasts: ["dustscorp", "canyonscorp", "restless", "ashhusk"], sets: ["gold", "statues", "altars", "pillars", "tapestry", "candles"], boss: "canyonscorp" },
{ k: "ossuary", n: "Bone ossuary", sub: "walls built of bones", stone: 0xC8BCA4, floor: 0x7A7262, light: 0xFFD8A0, fog: 0x14120E, beasts: ["restless", "hollowshade", "faceless", "deepshade"], sets: ["bones", "candles", "altars", "chains", "webs"], boss: "faceless" },
{ k: "cellar", n: "Haunted cellars", sub: "brick vaults under an old house", stone: 0x8A5A44, floor: 0x5E4434, light: 0xFFB868, fog: 0x140E0C, beasts: ["restless", "werewolf", "hollowshade", "bandit"], sets: ["barrels", "tables", "webs", "candles", "cages", "rugs"], boss: "werewolf" },
{ k: "wizard", n: "Wizard's vaults", sub: "carved stone, books and runes", stone: 0x6E6A8A, floor: 0x4E4A62, light: 0xB8A0FF, fog: 0x100E1A, beasts: ["watcher", "discord", "songbreaker", "deepshade"], sets: ["books", "candles", "tables", "rugs", "tapestry", "altars"], boss: "watcher" },
{ k: "forge", n: "Lava forge", sub: "black rock and channels of fire", stone: 0x4A403A, floor: 0x34302C, light: 0xFF7A30, fog: 0x1A0C06, beasts: ["emberhound", "cinderimp", "magmagolem", "kilnimp", "emberel"], sets: ["racks", "chains", "barrels", "rubble", "pillars"], boss: "brimfiend", lava: 1 },
{ k: "ruin", n: "Overgrown ruin", sub: "tumbled stone and roots coming through", stone: 0x7A7A68, floor: 0x5A5A48, light: 0xFFE0A0, fog: 0x10140C, beasts: ["wildboar", "wildbear", "bandit", "mirespider"], sets: ["rubble", "statues", "pools", "shrooms", "camp"], boss: "wildbear" },
{ k: "clock", n: "Clockwork vault", sub: "brass, iron and turning wheels", stone: 0x6A625A, floor: 0x4A443E, light: 0xFFD890, fog: 0x12100C, beasts: ["trackdrone", "watcher", "songbreaker"], sets: ["racks", "chains", "tables", "pillars", "barrels"], boss: "trackdrone" },
{ k: "smuggler", n: "Smugglers' grotto", sub: "sea caves, crates and lanterns", stone: 0x6A7076, floor: 0x4E5458, light: 0xFFC070, fog: 0x0C1216, beasts: ["bandit", "roadraider", "renegade", "mirelizard"], sets: ["barrels", "camp", "gold", "pools", "tables", "chains"], boss: "roadraider", cave: 1 }
];
var DMK_KINDS = [
{ k: "entry", n: "The way in", icon: "🚪", sets: ["banners", "camp", "barrels"], h: 7, safe: 1 },
{ k: "chamber", n: "Chamber", icon: "⬜", sets: [], h: 8 },
{ k: "hall", n: "Great hall", icon: "🏛️", sets: ["pillars", "banners", "tables"], h: 11, big: 1 },
{ k: "corridor", n: "Long gallery", icon: "➖", sets: ["candles", "statues"], h: 6, long: 1 },
{ k: "treasure", n: "Treasure room", icon: "💰", sets: ["gold", "statues"], h: 7, chest: 2 },
{ k: "trap", n: "Trap hall", icon: "⚠️", sets: ["bones", "rubble"], h: 7, trap: 1 },
{ k: "puzzle", n: "Puzzle room", icon: "🧩", sets: ["altars", "candles"], h: 8, puz: 1 },
{ k: "shrine", n: "Shrine", icon: "🕯️", sets: ["altars", "candles", "statues"], h: 9, safe: 1 },
{ k: "library", n: "Library", icon: "📚", sets: ["books", "tables", "rugs", "candles"], h: 8 },
{ k: "armoury", n: "Armoury", icon: "🗡️", sets: ["racks", "chains", "barrels"], h: 7, chest: 1 },
{ k: "crypt", n: "Crypt", icon: "⚰️", sets: ["bones", "altars", "candles", "webs"], h: 7 },
{ k: "den", n: "Beast den", icon: "🐾", sets: ["bones", "rubble", "webs"], h: 8, den: 1 },
{ k: "barracks", n: "Barracks", icon: "🛏️", sets: ["camp", "tables", "racks", "barrels"], h: 7 },
{ k: "prison", n: "Prison", icon: "⛓️", sets: ["cages", "chains", "bones"], h: 7 },
{ k: "throne", n: "Throne room", icon: "👑", sets: ["banners", "rugs", "pillars", "statues"], h: 12, big: 1 },
{ k: "secret", n: "Secret room", icon: "🗝️", sets: ["gold", "books"], h: 6, chest: 2, hidden: 1 },
{ k: "boss", n: "The boss's hall", icon: "💀", sets: ["pillars", "banners", "bones"], h: 15, boss: 1 }
];
function dmkKind(k) { for (var i = 0; i < DMK_KINDS.length; i++)
if (DMK_KINDS[i].k === k)
return DMK_KINDS[i]; return DMK_KINDS[1]; }
function dmkTheme(k) { for (var i = 0; i < DMK_THEMES.length; i++)
if (DMK_THEMES[i].k === k)
return DMK_THEMES[i]; return DMK_THEMES[0]; }
function dmkPick(list, k) { for (var i = 0; i < list.length; i++)
if (list[i].k === k)
return list[i]; return list[1] || list[0]; }
var DMK_TRAPS = [
{ k: "spikes", n: "Spike plates", sub: "iron spikes spring from the floor", dmg: 12 },
{ k: "fire", n: "Fire jets", sub: "flame from the floor, on a steady beat", dmg: 14 },
{ k: "gas", n: "Poison vents", sub: "green gas that stings while you stand in it", dmg: 5, dot: 1 },
{ k: "stones", n: "Falling stones", sub: "loose stones fall where the ceiling cracks", dmg: 16 },
{ k: "blades", n: "Blade sweepers", sub: "a blade swings low across the floor", dmg: 13 },
{ k: "darts", n: "Dart walls", sub: "darts from holes in the wall", dmg: 9 }
];
var DMK_PUZZLES = [
{ k: "levers", n: "Levers in order", sub: "pull the levers in the order the carving shows" },
{ k: "plates", n: "Pressure plates", sub: "step on every plate before they rise again" },
{ k: "runes", n: "Rune stones", sub: "turn each stone to the rune over the door" },
{ k: "key", n: "Key and locked door", sub: "the key is somewhere in the dungeon" },
{ k: "riddle", n: "Riddle door", sub: "the door asks a riddle" },
{ k: "braziers", n: "Light the braziers", sub: "light every brazier in the room" }
];
function dmkTrapDef(k) { for (var i = 0; i < DMK_TRAPS.length; i++)
if (DMK_TRAPS[i].k === k)
return DMK_TRAPS[i]; return DMK_TRAPS[0]; }
function dmkPuzDef(k) { for (var i = 0; i < DMK_PUZZLES.length; i++)
if (DMK_PUZZLES[i].k === k)
return DMK_PUZZLES[i]; return DMK_PUZZLES[0]; }
var DMK_RIDDLES = [
{ q: "What has a mouth but never eats, a bed but never sleeps?", a: ["river", "a river"], o: ["A river", "A cave", "A grave", "A ship"] },
{ q: "The more you take, the more you leave behind. What are they?", a: ["footsteps", "steps"], o: ["Footsteps", "Breaths", "Coins", "Years"] },
{ q: "What can run but never walks, has a mouth but never talks?", a: ["river"], o: ["A river", "The wind", "A clock", "A rumour"] },
{ q: "I have keys but open no locks. What am I?", a: ["piano"], o: ["A piano", "A map", "A jailer", "A ring"] },
{ q: "What gets wetter the more it dries?", a: ["towel"], o: ["A towel", "The sea", "Bread", "A sponge cake"] },
{ q: "Thirty white horses on a red hill: first they champ, then they stamp, then they stand still. What are they?", a: ["teeth"], o: ["Teeth", "Snowflakes", "Soldiers", "Candles"] },
{ q: "What has roots nobody sees, is taller than trees, up, up it goes, and yet never grows?", a: ["mountain"], o: ["A mountain", "A tower", "A shadow", "The sky"] },
{ q: "Voiceless it cries, wingless flutters, toothless bites, mouthless mutters. What is it?", a: ["wind"], o: ["The wind", "A ghost", "A bat", "Fire"] }
];
var DMK_BOSS_TRICKS = [["slam", "The red ring (a slam you must get clear of)"], ["call", "Calls its kin (two beasts join it)"], ["rage", "Rage at half life (faster and harder)"], ["shield", "Stone skin (hits do half for a while)"]];
var DMK_BOSS_SIZES = [{ k: "big", n: "Big", s: 1.4 }, { k: "huge", n: "Huge", s: 1.9 }, { k: "giant", n: "Giant", s: 2.5 }];
function dmkBeastList() {
var out = [];
try {
Object.keys(DGB_KINDS).forEach(function (k) { var K = DGB_KINDS[k]; if (K && K.name && !K.robot)
out.push([k, K.name]); });
}
catch (e) { }
out.sort(function (a, b) { return a[1] < b[1] ? -1 : 1; });
return out;
}
function dmkBeast(k) { try {
return DGB_KINDS[k] || DGB_KINDS.restless || null;
}
catch (e) {
return null;
} }
function dmkDefaults() { return __ZC(493, 0, this, arguments, new.target); }
function dmkLite() { return typeof LITE !== "undefined" && !!LITE; }
function dmkEsc(s) { return typeof esc === "function" ? esc(s) : String(s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
function dmkSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function dmkRng(seed) { var s = (seed >>> 0) || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 1000003) / 1000003; }; }
function dmkInt(R, a, b) { return a + Math.floor(R() * (b - a + 1)); }
function dmkShuffle(R, a) { for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(R() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
var DMK_DIRS = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };
function dmkCorr(a, b) { return __ZC(493, 1, this, arguments, new.target); }
function dmkHit(r, q) { return r.x < q.x + q.w && r.x + r.w > q.x && r.z < q.z + q.l && r.z + r.l > q.z; }
function dmkGrow(r, m) { return { x: r.x - m, z: r.z - m, w: r.w + 2 * m, l: r.l + 2 * m }; }
function dmkCheck(S) { return __ZC(493, 2, this, arguments, new.target); }
function dmkRoomName(S, i) { var r = S.rooms[i]; return r ? (r.name || dmkKind(r.k).n + " " + (i + 1)) : "room " + (i + 1); }
function dmkRoomDims(R, k, cave) { return __ZC(493, 3, this, arguments, new.target); }
function dmkPlace(S, p, n, d, R) { return __ZC(493, 4, this, arguments, new.target); }
function dmkDegree(S, i) { var n = 0; S.links.forEach(function (L) { if (L[0] === i || L[1] === i)
n++; }); return n; }
function dmkDepths(S) {
var d = { 0: 0 }, q = [0];
while (q.length) {
var k = q.shift();
S.links.forEach(function (L) { var o = L[0] === k ? L[1] : L[1] === k ? L[0] : -1; if (o >= 0 && d[o] === undefined) {
d[o] = d[k] + 1;
q.push(o);
} });
}
return d;
}
function dmkGenerate(opt) { return __ZC(493, 5, this, arguments, new.target); }
function dmkAssign(S, R) { return __ZC(493, 6, this, arguments, new.target); }
function dmkMobsFor(S, r, R) { return __ZC(493, 7, this, arguments, new.target); }
function dmkSnap() { if (!DMK.edit)
return; DMK.undo.push(JSON.stringify(DMK.edit)); if (DMK.undo.length > 40)
DMK.undo.shift(); }
function dmkUndo() { if (!DMK.undo.length)
return false; DMK.edit = JSON.parse(DMK.undo.pop()); DMK.sel = Math.min(DMK.sel, DMK.edit.rooms.length - 1); return true; }
function dmkTry(fn, i) { return __ZC(493, 8, this, arguments, new.target); }
function dmkEdAdd(i, d, k) { return __ZC(493, 9, this, arguments, new.target); }
function dmkEdRemove(i) { return __ZC(493, 10, this, arguments, new.target); }
function dmkEdResize(i, dw, dl) { return __ZC(493, 11, this, arguments, new.target); }
function dmkEdMove(i, dx, dz) { return dmkTry(function (S) { if (i === 0)
return "The way in stays where it is."; var r = S.rooms[i]; r.x += dx; r.z += dz; return ""; }, i); }
function dmkEdKind(i, k) { return __ZC(493, 12, this, arguments, new.target); }
function dmkEdSet(i, key, val) { return dmkTry(function (S) { var r = S.rooms[i]; if (val === null || val === "" || val === undefined)
delete r[key];
else
r[key] = val; return ""; }, i); }
function dmkEdJoin(a, b) { return __ZC(493, 13, this, arguments, new.target); }
function dmkEdPart(a, b) {
return dmkTry(function (S) {
var n = S.links.length;
S.links = S.links.filter(function (L) { return !((L[0] === a && L[1] === b) || (L[0] === b && L[1] === a)); });
if (S.links.length === n)
return "They are not joined.";
return "";
});
}
function dmkFloor(S) { return __ZC(493, 14, this, arguments, new.target); }
function dmkRoomH(r) { var K = dmkKind(r.k); var h = K.h || 8; return Math.min(18, h + Math.max(0, Math.max(r.w, r.l) - 10) * 0.25); }
var DMKW = { g: null, R: [], gates: [], chests: [], traps: [], puz: [], props: [], torches: [], lights: [], floor: null, tex: {}, mats: {}, spec: null, stair: null, rooms: [], bossAt: null, key: null, secret: [] };
function dmkTexLoad(path, rep) {
var k = path;
if (DMKW.tex[k])
return DMKW.tex[k];
var t = null;
try {
t = new THREE.TextureLoader().load(path);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = dmkLite() ? 1 : 4;
}
catch (e) {
t = null;
}
DMKW.tex[k] = t;
return t;
}
function dmkStone(T, part) { return __ZC(493, 15, this, arguments, new.target); }
function dmkTexRep(t, rx, ry) {
if (!t)
return null;
var k = (t.uuid || "") + "@" + rx + "x" + ry;
DMKW.texRep = DMKW.texRep || {};
if (DMKW.texRep[k])
return DMKW.texRep[k];
var c = t.clone();
c.wrapS = c.wrapT = THREE.RepeatWrapping;
c.repeat.set(rx, ry);
c.needsUpdate = true;
DMKW.texRep[k] = c;
return c;
}
function dmkMat(key, make) { if (DMKW.mats[key])
return DMKW.mats[key]; var m = make(); m.userData.dmkOwn = 1; DMKW.mats[key] = m; return m; }
function dmkStd(col, o) { return __ZC(493, 16, this, arguments, new.target); }
function dmkBoxes() { return { p: [], n: [], u: [], i: [], c: 0 }; }
function dmkBoxAdd(B, x0, x1, y0, y1, z0, z1, tile) { return __ZC(493, 17, this, arguments, new.target); }
function dmkBoxMesh(B, mat, G) { return __ZC(493, 18, this, arguments, new.target); }
function dmkBuild(G, S) { return __ZC(493, 19, this, arguments, new.target); }
function dmkArches(G, S, T, F, A, mat) { return __ZC(493, 20, this, arguments, new.target); }
function dmkCaveRock(G, S, T, F, A) { return __ZC(493, 21, this, arguments, new.target); }
function dmkLights(G, S, T) { return __ZC(493, 22, this, arguments, new.target); }
function dmkLightTick(lx, lz) { return __ZC(493, 23, this, arguments, new.target); }
function dmkGates(G, S, T, F, A, trim, wall) { return __ZC(493, 24, this, arguments, new.target); }
function dmkGateAt(cx, cz) { for (var i = 0; i < DMKW.gates.length; i++) {
var Gt = DMKW.gates[i];
if (Gt.open)
continue;
for (var j = 0; j < Gt.cells.length; j++)
if (Gt.cells[j][0] === cx && Gt.cells[j][1] === cz)
return Gt;
} return null; }
function dmkGateOpen(Gt, msg) {
if (!Gt || Gt.open)
return;
Gt.open = true;
Gt.t = 0;
if (msg)
dmkSay(msg);
if (typeof playTone === "function")
playTone(Gt.kind === "secret" ? 180 : 330, 0.5);
}
function dmkGatesTick(dt) {
DMKW.gates.forEach(function (Gt) {
if (!Gt.open || Gt.t > 3)
return;
Gt.t += dt;
if (Gt.kind === "secret") {
Gt.g.position.y = -Math.min(4.8, Gt.t * 1.8);
}
else
Gt.g.position.y = Math.min(4.3, Gt.t * 1.6);
});
}
function dmkGeo(k, make) { DMKW.geo = DMKW.geo || {}; if (!DMKW.geo[k])
DMKW.geo[k] = make(); return DMKW.geo[k]; }
function dmkM(k, col, o) { return dmkMat(k, function () { return dmkStd(col, o); }); }
function dmkWood() { var t = null; try {
t = texOf("wood");
}
catch (e) { } return dmkMat("wood", function () { return dmkStd(0x8A6440, { map: t, r: 0.8 }); }); }
function dmkMesh(geo, mat, x, y, z, G) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); G.add(m); return m; }
function dmkSpots(S, i) { return __ZC(493, 25, this, arguments, new.target); }
function dmkSolid(x, z, r) { DMKW.R.push({ x: x, z: z, r: r }); }
function dmkTorch(G, x, y, z, a, col, crystal) { return __ZC(493, 26, this, arguments, new.target); }
function dmkDress(G, S, T, i) { return __ZC(493, 27, this, arguments, new.target); }
var dmkProp = {
banners: function (G, p, T, R) { return __ZC(493, 28, this, arguments, new.target); },
candles: function (G, p, T, R) { return __ZC(493, 29, this, arguments, new.target); },
bones: function (G, p, T, R) { return __ZC(493, 30, this, arguments, new.target); },
barrels: function (G, p, T, R) { return __ZC(493, 31, this, arguments, new.target); },
books: function (G, p, T, R) { return __ZC(493, 32, this, arguments, new.target); },
statues: function (G, p, T, R) { return __ZC(493, 33, this, arguments, new.target); },
webs: function (G, p, T, R) {
var web = dmkWebMat();
var pl = new THREE.Mesh(dmkGeo("webpl", function () { return new THREE.PlaneGeometry(2.6, 2.6); }), web);
pl.position.set(p.x, 2.5 + R() * 3, p.z);
pl.rotation.set((R() - 0.5) * 1.2, R() * 3, (R() - 0.5) * 0.6);
pl.scale.setScalar(0.7 + R() * 0.9);
G.add(pl);
},
gold: function (G, p, T, R) { return __ZC(493, 34, this, arguments, new.target); },
chains: function (G, p, T, R, r) { return __ZC(493, 35, this, arguments, new.target); },
rugs: function (G, p, T, R) {
var t = dmkRugTex(R);
var m = dmkMat("rug" + t.k, function () { return dmkStd(0xFFFFFF, { map: t.t, r: 1 }); });
var rg = wBox(3 + R() * 1.5, 0.03, 2 + R() * 1, m, p.x, 0.016, p.z, G);
rg.rotation.y = R() < 0.5 ? 0 : Math.PI / 2;
},
tables: function (G, p, T, R) { return __ZC(493, 36, this, arguments, new.target); },
racks: function (G, p, T, R) { return __ZC(493, 37, this, arguments, new.target); },
pools: function (G, p, T, R) { return __ZC(493, 38, this, arguments, new.target); },
shrooms: function (G, p, T, R) { return __ZC(493, 39, this, arguments, new.target); },
altars: function (G, p, T, R) { dmkProp.altar(G, p, T, R); },
altar: function (G, p, T, R) { return __ZC(493, 40, this, arguments, new.target); },
tapestry: function (G, p, T, R) { return __ZC(493, 41, this, arguments, new.target); },
camp: function (G, p, T, R) { return __ZC(493, 42, this, arguments, new.target); },
cages: function (G, p, T, R) { return __ZC(493, 43, this, arguments, new.target); },
pillars: function (G, p, T, R, r) { return __ZC(493, 44, this, arguments, new.target); },
rubble: function (G, p, T, R) { return __ZC(493, 45, this, arguments, new.target); },
coffin: function (G, p, T, R) { return __ZC(493, 46, this, arguments, new.target); },
throne: function (G, p, T, R) { return __ZC(493, 47, this, arguments, new.target); },
brazier: function (G, p, T, R) { return __ZC(493, 48, this, arguments, new.target); },
bed: function (G, p, T, R) { return __ZC(493, 49, this, arguments, new.target); }
};
var DMK_RUGS = [[0x5A1E1A, 0xA8884A, 0x1E2434], [0x1E2A44, 0x9A8460, 0x4A1E1A], [0x2A3A26, 0xA89064, 0x3A2418], [0x3A2234, 0xA88A5A, 0x1A1A22]];
function dmkRugTex(R) { return __ZC(493, 50, this, arguments, new.target); }
function dmkChest(G, p, S, i, R) { return __ZC(493, 51, this, arguments, new.target); }
function dmkWebMat() { return __ZC(493, 52, this, arguments, new.target); }
function dmkCoinNrm() { return __ZC(493, 53, this, arguments, new.target); }
var DMK_LVL = { bare: 0, lived: 1, furnished: 2, lavish: 3 };
function dmkTh() { return DMKW.th || (DMKW.th = { spin: [], bob: [], swing: [] }); }
function dmkWallCells(S, i) { return dmkSpots(S, i).wall.map(function (p) { return { x: p.x - Math.sin(p.a) * 0.74, z: p.z - Math.cos(p.a) * 0.74, a: p.a, ix: p.x, iz: p.z }; }); }
function dmkOnWall(G, p, y, out) { var g = new THREE.Group(); g.position.set(p.x + Math.sin(p.a) * (out || 0.02), y, p.z + Math.cos(p.a) * (out || 0.02)); g.rotation.y = p.a; G.add(g); return g; }
function dmkPlaneTex(key, W, H, draw, o) { return __ZC(493, 54, this, arguments, new.target); }
function dmkPlane(G, mat, w, h, x, y, z) { var m = new THREE.Mesh(dmkGeo("pl" + w + "x" + h, function () { return new THREE.PlaneGeometry(w, h); }), mat); m.position.set(x, y, z); G.add(m); return m; }
var DMK_WALLART = {
tomb: function (x, W, H) { return __ZC(493, 55, this, arguments, new.target); },
ossuary: function (x, W, H) { return __ZC(493, 56, this, arguments, new.target); },
algae: function (x, W, H) { return __ZC(493, 57, this, arguments, new.target); },
ivy: function (x, W, H) { return __ZC(493, 58, this, arguments, new.target); },
stars: function (x, W, H) { return __ZC(493, 59, this, arguments, new.target); },
runes: function (x, W, H) { return __ZC(493, 60, this, arguments, new.target); },
net: function (x, W, H) { return __ZC(493, 61, this, arguments, new.target); },
ice: function (x, W, H) { return __ZC(493, 62, this, arguments, new.target); },
portrait: function (x, W, H) { return __ZC(493, 63, this, arguments, new.target); }
};
function dmkArtMat(k, o) { var lite = dmkLite(), S = lite ? 256 : 512; o = o || {}; return dmkPlaneTex("art-" + k, o.w || S, o.h || S / 2, DMK_WALLART[k], o); }
function dmkBand(G, cells, mat, y, h, lite, every) { cells.forEach(function (p, k) { if (every && k % every)
return; var g = dmkOnWall(G, p, 0, 0.03); dmkPlane(g, mat, 2.02, h, 0, y, 0); }); }
function dmkGearGeo(r, teeth, th) { return __ZC(493, 64, this, arguments, new.target); }
function dmkChandelier(G, x, z, h, kind, T, R) { return __ZC(493, 65, this, arguments, new.target); }
function dmkRunner(G, r, T, R, col) { return __ZC(493, 66, this, arguments, new.target); }
function dmkGiltTrim(G, r, h, mat) { return __ZC(493, 67, this, arguments, new.target); }
function dmkStoneMat(T, k, mul) { return dmkMat("thst-" + k, function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).multiplyScalar(mul || 1).getHex(), { map: s.map, nrm: s.nrm, r: 0.85 }); }); }
var DMK_THEME_DRESS = {
crypt: function (c) { return __ZC(493, 68, this, arguments, new.target); },
temple: function (c) { return __ZC(493, 69, this, arguments, new.target); },
dwarf: function (c) { return __ZC(493, 70, this, arguments, new.target); },
spider: function (c) {
for (var i = 0; i < c.n(1.2, 2); i++) {
var p = c.R() < 0.5 ? c.wall() : c.mid();
if (!p)
break;
dmkProp.eggs(c.G, p, c.T, c.R);
}
for (var j = 0; j < c.n(0.8, 1.5); j++) {
var q = c.mid() || c.wall();
if (!q)
break;
dmkProp.cocoon(c.G, q, c.T, c.R, c.h);
}
var web = dmkWebMat(), x0 = c.r.x * DMK_CELL, x1 = (c.r.x + c.r.w) * DMK_CELL, z0 = c.r.z * DMK_CELL, z1 = (c.r.z + c.r.l) * DMK_CELL;
[[x0, z0], [x1, z0], [x0, z1], [x1, z1]].forEach(function (q, k) {
if (k >= 1 + c.lvl)
return;
var cn = new THREE.Mesh(dmkGeo("cweb", function () { return new THREE.PlaneGeometry(6, 6); }), web);
cn.position.set(q[0] + (k % 2 ? -1.2 : 1.2), c.h - 1.6, q[1] + (k < 2 ? 1.2 : -1.2));
cn.rotation.set(0, (k === 0 ? -Math.PI / 4 : k === 1 ? Math.PI / 4 : k === 2 ? -3 * Math.PI / 4 : 3 * Math.PI / 4), 0);
c.G.add(cn);
});
if (c.lvl >= 3) {
var gold = c.mid();
if (gold)
dmkProp.gold(c.G, gold, c.T, c.R);
}
},
frost: function (c) { return __ZC(493, 71, this, arguments, new.target); },
fungal: function (c) { return __ZC(493, 72, this, arguments, new.target); },
tomb: function (c) { return __ZC(493, 73, this, arguments, new.target); },
ossuary: function (c) { return __ZC(493, 74, this, arguments, new.target); },
cellar: function (c) { return __ZC(493, 75, this, arguments, new.target); },
wizard: function (c) { return __ZC(493, 76, this, arguments, new.target); },
forge: function (c) { return __ZC(493, 77, this, arguments, new.target); },
ruin: function (c) { return __ZC(493, 78, this, arguments, new.target); },
clock: function (c) { return __ZC(493, 79, this, arguments, new.target); },
smuggler: function (c) { return __ZC(493, 80, this, arguments, new.target); }
};
var DMK_CHANDELIER = { crypt: "iron", temple: "gilt", dwarf: "iron", frost: "ice", tomb: "gilt", ossuary: "bone", cellar: "iron", wizard: "gilt", forge: "iron", clock: "brass" };
function dmkRoots(c, n, col) { return __ZC(493, 81, this, arguments, new.target); }
Object.assign(dmkProp, {
effigy: function (G, p, T, R) { return __ZC(493, 82, this, arguments, new.target); },
drum: function (G, p, T, R) { return __ZC(493, 83, this, arguments, new.target); },
idol: function (G, p, T, R) { return __ZC(493, 84, this, arguments, new.target); },
anvil: function (G, p, T, R) { return __ZC(493, 85, this, arguments, new.target); },
hearth: function (G, p, T, R, big) { return __ZC(493, 86, this, arguments, new.target); },
kingstatue: function (G, p, T, R) { return __ZC(493, 87, this, arguments, new.target); },
ingots: function (G, p, T, R) { return __ZC(493, 88, this, arguments, new.target); },
eggs: function (G, p, T, R) { return __ZC(493, 89, this, arguments, new.target); },
cocoon: function (G, p, T, R, h) { return __ZC(493, 90, this, arguments, new.target); },
icecrystals: function (G, p, T, R) { return __ZC(493, 91, this, arguments, new.target); },
frozen: function (G, p, T, R) { return __ZC(493, 92, this, arguments, new.target); },
bigshroom: function (G, p, T, R, lvl) { return __ZC(493, 93, this, arguments, new.target); },
jars: function (G, p, T, R) { return __ZC(493, 94, this, arguments, new.target); },
mummycase: function (G, p, T, R) { return __ZC(493, 95, this, arguments, new.target); },
obelisk: function (G, p, T, R) { return __ZC(493, 96, this, arguments, new.target); },
bonepile: function (G, p, T, R) { return __ZC(493, 97, this, arguments, new.target); },
skullpillar: function (G, p, T, R, h) {
var sk = dmkArtMat("ossuary", { w: 256, h: 256 });
var c = wCyl(0.6, 0.6, h, sk, p.x, h / 2, p.z, G, dmkLite() ? 8 : 14);
wBox(1.5, 0.4, 1.5, dmkStoneMat(T, "skp", 0.9), p.x, 0.2, p.z, G);
wBox(1.5, 0.4, 1.5, dmkStoneMat(T, "skp", 0.9), p.x, h - 0.2, p.z, G);
dmkSolid(p.x, p.z, 0.75);
},
winerack: function (G, p, T, R) { return __ZC(493, 98, this, arguments, new.target); },
cask: function (G, p, T, R) { return __ZC(493, 99, this, arguments, new.target); },
armchair: function (G, p, T, R) { return __ZC(493, 100, this, arguments, new.target); },
floatcrystal: function (G, p, T, R) { return __ZC(493, 101, this, arguments, new.target); },
alchemy: function (G, p, T, R) { return __ZC(493, 102, this, arguments, new.target); },
armillary: function (G, p, T, R) { return __ZC(493, 103, this, arguments, new.target); },
crucible: function (G, p, T, R) { return __ZC(493, 104, this, arguments, new.target); },
tree: function (G, p, T, R, h) { return __ZC(493, 105, this, arguments, new.target); },
pendulum: function (G, p, T, R) { return __ZC(493, 106, this, arguments, new.target); },
biggear: function (G, p, T, R) { return __ZC(493, 107, this, arguments, new.target); },
lantern: function (G, p, T, R, h) { return __ZC(493, 108, this, arguments, new.target); },
cratestack: function (G, p, T, R) { return __ZC(493, 109, this, arguments, new.target); },
rowboat: function (G, p, T, R) { return __ZC(493, 110, this, arguments, new.target); },
rope: function (G, p, T, R) { return __ZC(493, 111, this, arguments, new.target); }
});
function dmkThemeDress(G, S, T, i, sp) { return __ZC(493, 112, this, arguments, new.target); }
function dmkThemeTick(dt) { return __ZC(493, 113, this, arguments, new.target); }
var DMK_RUNES = ["☉", "☾", "★", "✦", "♁", "☿"];
function dmkRuneTex(sym, lit) { return __ZC(493, 114, this, arguments, new.target); }
function dmkRuneMat(sym, lit) { return dmkMat("rune" + sym + (lit ? 1 : 0), function () { return dmkStd(0xFFFFFF, { map: dmkRuneTex(sym, lit), r: 0.8, e: lit ? 0x3A2A10 : undefined, ei: 0.6 }); }); }
function dmkTrapsBuild(G, S, T) { return __ZC(493, 115, this, arguments, new.target); }
function dmkTrapMake(tr, T, r) { return __ZC(493, 116, this, arguments, new.target); }
function dmkNearLine(px, pz, ax, az, bx, bz) { var vx = bx - ax, vz = bz - az, L = vx * vx + vz * vz || 1, t = Math.max(0, Math.min(1, ((px - ax) * vx + (pz - az) * vz) / L)); return Math.hypot(px - (ax + vx * t), pz - (az + vz * t)); }
function dmkTrapsTick(dt, lx, lz) { return __ZC(493, 117, this, arguments, new.target); }
function dmkPuzBuild(G, S, T) { return __ZC(493, 118, this, arguments, new.target); }
function dmkPuzPart(P, part, T) { return __ZC(493, 119, this, arguments, new.target); }
function dmkPuzSolve(P, msg) { return __ZC(493, 120, this, arguments, new.target); }
function dmkPuzUse(P, part) { return __ZC(493, 121, this, arguments, new.target); }
function dmkPuzTick(dt, lx, lz) { return __ZC(493, 122, this, arguments, new.target); }
function dmkRiddle(P) { return __ZC(493, 123, this, arguments, new.target); }
function dmkFighting() { return typeof cbtRegisterWorld === "function"; }
function dmkPlay(spec, o) { return __ZC(493, 124, this, arguments, new.target); }
function dmkEnter() { return __ZC(493, 125, this, arguments, new.target); }
function dmkLeave() { return __ZC(493, 126, this, arguments, new.target); }
function dmkOut() { return __ZC(493, 127, this, arguments, new.target); }
function dmkSafeHere() {
if (WLD.on !== "dmk" || !DMK.play)
return true;
var P = camera.position, B = WORLDS.dmk.base, rm = dmkRoomAtXZ(P.x - B, P.z);
return !!(rm && dmkKind(rm.r.k).safe);
}
function dmkRoomAtXZ(x, z) { for (var i = 0; i < DMKW.rooms.length; i++) {
var r = DMKW.rooms[i];
if (x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1)
return r;
} return null; }
function dmkBlock(x, z) { return __ZC(493, 128, this, arguments, new.target); }
function dmkWallAt(x, z) { var C = DMK_CELL, F = DMKW.floor && DMKW.floor.F; if (!F)
return false; var cx = Math.floor(x / C), cz = Math.floor(z / C); return F[cx + "," + cz] === undefined || !!dmkGateAt(cx, cz); }
function dmkSees(ax, az, bx, bz) {
var dx = bx - ax, dz = bz - az, d = Math.hypot(dx, dz);
if (d < 1.4)
return true;
var n = Math.min(120, Math.ceil(d / 0.4));
for (var i = 1; i < n; i++) {
var u = i / n;
if (u * d < 0.4 || (1 - u) * d < 0.6)
continue;
if (dmkWallAt(ax + dx * u, az + dz * u))
return false;
}
return true;
}
function dmkMobStats(K, boss) { return __ZC(493, 129, this, arguments, new.target); }
function dmkKindsFor(r) {
var S = DMK.play, T = dmkTheme(S.opt.theme);
var list = (r.beast ? [r.beast] : null) || (S.opt.beasts && S.opt.beasts.length ? S.opt.beasts : T.beasts);
return list.filter(function (k) { return !!dmkBeast(k); });
}
function dmkSpawnRoom(rm) { return __ZC(493, 130, this, arguments, new.target); }
function dmkFoes() { var R = DMK.run, out = []; if (!R)
return out; R.mobs.forEach(function (M) { if (M.st !== "dead")
out.push(M); }); if (R.boss && R.boss.st !== "sleep" && R.boss.st !== "dead")
out.push(R.boss); return out; }
function dmkDamage(M, d) { return __ZC(493, 131, this, arguments, new.target); }
function dmkFell(M) { return __ZC(493, 132, this, arguments, new.target); }
function dmkHasBoss() { return DMK.play.rooms.some(function (r) { return dmkKind(r.k).boss; }); }
function dmkAllDown() {
var S = DMK.play;
for (var i = 0; i < DMKW.rooms.length; i++) {
var rm = DMKW.rooms[i];
if ((rm.r.mobs | 0) > 0 && !rm.spawned)
return false;
}
return DMK.run.mobs.every(function (M) { return M.st === "dead"; });
}
function dmkHurtMe(d, name) { return __ZC(493, 133, this, arguments, new.target); }
function dmkStrike() { return __ZC(493, 134, this, arguments, new.target); }
function dmkLv(room) { return __ZC(493, 135, this, arguments, new.target); }
function dmkPouch(x, z, foe, M) { return __ZC(493, 136, this, arguments, new.target); }
function dmkPouchTake(p) { return __ZC(493, 137, this, arguments, new.target); }
function dmkWon() { return __ZC(493, 138, this, arguments, new.target); }
function dmkTick(dt) { return __ZC(493, 139, this, arguments, new.target); }
function dmkMobTick(M, dt, lx, lz, here) { return __ZC(493, 140, this, arguments, new.target); }
function dmkBolt(M, lx, lz, col) {
var R = DMK.run, s = wGlow(col || 0xA8C8FF, 0.9, 0.85), d = Math.hypot(lx - M.g.position.x, lz - M.g.position.z);
WORLDS.dmk.g.add(s);
R.bolts.push({ s: s, x0: M.g.position.x, z0: M.g.position.z, x1: lx, z1: lz, t: 0, T: Math.max(0.25, d / 14), d: Math.round(M.dmg * 0.8), n: M.K.name });
}
function dmkBossTick(Bo, dt, lx, lz, here) { return __ZC(493, 141, this, arguments, new.target); }
function dmkCallKin(Bo) { return __ZC(493, 142, this, arguments, new.target); }
function dmkPromptTick(lx, lz) { return __ZC(493, 143, this, arguments, new.target); }
function dmkPuzOf(Gt) { for (var i = 0; i < DMKW.puz.length; i++)
if (DMKW.puz[i].gates.indexOf(Gt) >= 0)
return DMKW.puz[i]; return null; }
function dmkChestOpen(c) { return __ZC(493, 144, this, arguments, new.target); }
function dmkDirWord(dx, dz) { var a = Math.atan2(dx, -dz) * 180 / Math.PI; a = (a + 360) % 360; return ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"][Math.round(a / 45) % 8]; }
function dmkBooks(bk) { return __ZC(493, 145, this, arguments, new.target); }
function dmkHud() { return __ZC(493, 146, this, arguments, new.target); }
if (typeof WLG !== "undefined" && WLG.keys && WLG.keys.indexOf("dmk") < 0)
WLG.keys.push("dmk");
if (typeof worldDef === "function")
worldDef("dmk", {
base: DMK.base, far: 300, ownSky: true, tone: 210,
env: function () { var T = dmkTheme(DMK.play ? DMK.play.opt.theme : "crypt"); return { top: T.fog, low: T.fog, fog: T.fog, fogD: 0.02, sun: 0.2, sunCol: T.light, sunDir: [0.2, 1, 0.1], hemi: 0.45, hemiCol: 0x8890A8, hemiGround: 0x201814, stars: 0 }; },
build: function (G) { DMKW.mats = {}; DMKW.geo = {}; DMKW.rt = {}; DMKW.rugs = {}; if (DMK.play)
dmkBuild(G, DMK.play); },
enter: function () { dmkEnter(); },
leave: function () { dmkLeave(); },
ground: function (x, z) { var a = DMKW.bossAt; return a && (x - a.x) * (x - a.x) + (z - a.z) * (z - a.z) < a.r * a.r ? 0.4 : 0; },
block: function (x, z) { return dmkBlock(x, z); },
sight: function (ax, az, bx, bz) { return dmkSees(ax, az, bx, bz); },
tick: function (dt) { dmkTick(dt); },
back: function () { if (typeof dgnLeaveAsk === "function")
dgnLeaveAsk(dmkOut);
else
dmkOut(); },
indoors: function () { return 2; }
});
(function () {
if (typeof window === "undefined")
return;
window.SPELL_FOES = window.SPELL_FOES || [];
window.SPELL_FOES.push(function () {
if (typeof WLD === "undefined" || WLD.on !== "dmk" || !DMK.run)
return [];
var B = WORLDS.dmk.base;
return dmkFoes().map(function (M) {
return { kind: "dmk", ref: M, name: M.name || M.K.name, x: B + M.g.position.x, y: M.g.position.y, z: M.g.position.z, r: M.boss ? 0.8 + M.scale * 0.4 : 0.8, max: M.max, lv: dmkLv(M.room) + (M.boss ? 10 : M.champ ? 3 : 0), boss: !!M.boss,
hp: function () { return M.hp; }, dead: function () { return M.st === "dead"; }, hit: function (d) { dmkDamage(M, d); } };
});
});
setTimeout(function () { try {
if (typeof cbtRegisterWorld === "function")
cbtRegisterWorld("dmk", { name: "the dungeon", lv: 3, safe: function () { return dmkSafeHere(); } });
}
catch (e) { } }, 2500);
if (typeof dgbBarred === "function") {
var db = dgbBarred;
dgbBarred = function (x, z, feet) { if (typeof WLD !== "undefined" && (WLD.on === "dmk" || WLD.on === "crawl"))
return true; return db.apply(this, arguments); };
}
if (typeof useCarried === "function") {
var uc = useCarried;
useCarried = function () { if (WLD.on === "dmk" && !dmkFighting()) {
dmkStrike();
return;
} return uc.apply(this, arguments); };
}
if (typeof addEventListener === "function") {
addEventListener("keydown", function (e) { if (WLD.on !== "dmk" || dmkFighting() || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return; if (e.code === "KeyF" && !e.repeat)
dmkStrike(); });
addEventListener("mousedown", function (e) { if (WLD.on === "dmk" && !dmkFighting() && e.button === 0 && document.pointerLockElement && walkMode)
dmkStrike(); });
}
})();
var DMK_MAX_MINE = 12;
function dmkMine() { try {
store.dmk = store.dmk || { mine: [] };
if (!Array.isArray(store.dmk.mine))
store.dmk.mine = [];
return store.dmk.mine;
}
catch (e) {
return [];
} }
function dmkSaveMine(m) { try {
store.dmk = store.dmk || {};
store.dmk.mine = m;
if (typeof save === "function")
save();
}
catch (e) { } }
function dmkCss() { return __ZC(493, 147, this, arguments, new.target); }
function dmkOpen(tab) { return __ZC(493, 148, this, arguments, new.target); }
function dmkClose() { DMK.open = false; var el = document.getElementById("dmk-panel"); if (el)
el.style.display = "none"; }
function dmkChip(group, v, label, on, sub) { return "<span class='chip" + (on ? " on" : "") + "' data-g='" + group + "' data-v='" + dmkEsc(v) + "'>" + label + (sub ? "<small>" + sub + "</small>" : "") + "</span>"; }
function dmkChips(group, list, cur, multi) { return "<div class='chips'>" + list.map(function (x) { var on = multi ? (cur || []).indexOf(x.k) >= 0 : cur === x.k; return dmkChip(group, x.k, dmkEsc(x.n), on); }).join("") + "</div>"; }
function dmkPaint() { return __ZC(493, 149, this, arguments, new.target); }
function dmkFootHtml() { return __ZC(493, 150, this, arguments, new.target); }
function dmkMakeHtml() { return __ZC(493, 151, this, arguments, new.target); }
function dmkMapHtml() { return __ZC(493, 152, this, arguments, new.target); }
function dmkRoomHtml() { return __ZC(493, 153, this, arguments, new.target); }
function dmkMapView(S) { return __ZC(493, 154, this, arguments, new.target); }
function dmkDrawMap() { return __ZC(493, 155, this, arguments, new.target); }
function dmkMineHtml() { return __ZC(493, 156, this, arguments, new.target); }
function dmkMineFetch() {
if (typeof cityRpc !== "function" || typeof signedIn !== "function" || !signedIn())
return;
cityRpc("dmk_mine", {}).then(function (o) { if (!o || !o.ok)
return; var by = {}; (o.rows || []).forEach(function (r) { by[r.id] = r; }); DMK.mineSrv = by; if (DMK.open && DMK.tab === "mine")
dmkPaint(); }).catch(function () { });
}
function dmkToggle(list, v) { list = (list || []).slice(); var i = list.indexOf(v); if (i >= 0)
list.splice(i, 1);
else
list.push(v); return list; }
function dmkClick(e) { return __ZC(493, 157, this, arguments, new.target); }
function dmkChange(e) {
var t = e.target, o = DMK.opt;
if (t.dataset.o === "bosskind") {
o.boss.kind = t.value || null;
return;
}
if (t.dataset.r && DMK.edit && DMK.sel >= 0) {
var why = dmkEdSet(DMK.sel, t.dataset.r, t.value || null);
DMK.say = why ? dmkEsc(why) : "";
dmkPaint();
}
}
function dmkInput(e) { return __ZC(493, 158, this, arguments, new.target); }
function dmkFate() { return __ZC(493, 159, this, arguments, new.target); }
function dmkBuildFromChoices() { return __ZC(493, 160, this, arguments, new.target); }
function dmkRandom(go) { return __ZC(493, 161, this, arguments, new.target); }
function dmkKeep() { return __ZC(493, 162, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-dmk"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-dmk";
b.title = "Make your own dungeon";
b.textContent = "🏰 Dungeon Maker";
b.onclick = function () { dmkOpen(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1600);
})();
var DMKC = { g: null, R: [], spots: [], folk: [], board: null, bt: 0 };
var DMKC_W = 36, DMKC_L = 64;
function dmkCrawlBuild(G) { return __ZC(493, 163, this, arguments, new.target); }
var DMKC_FOLK = [
{ n: "Hallwarden Brannoc", t: "hallwarden", x: 3, z: -56, p: "Brannoc, the Hallwarden of the Dungeon Crawlers' Hall: a broad, grey-bearded former delver with a limp from the Ember Foundry, who keeps the Board and the guild's rules. Gruff, fair, proud of every dreamer who makes a dungeon. Knows the Board's lists (Featured, Best rated, Most cleared, Newest), that the Keeper approves each dungeon before it goes up, that only those who clear a dungeon may rate it, and that makers are paid in gold for each clear by another dreamer (if they are grown-ups who pay their dues).", g: "Board's that way. Pick one that scares you a little." },
{ n: "Ysolde the Cartographer", t: "cartographer", x: -9, z: -26, p: "Ysolde, the Cartographer of the Dungeon Crawlers' Hall, who sits at the Makers' Table helping dreamers design dungeons. Precise, warm, ink on her fingers. Explains the Dungeon Maker: size, shape, how many dreamers it is for, difficulty, fourteen themes, decor style and what stands in the rooms, light, beasts, traps, puzzles, treasure, a secret room, the boss and its tricks; then the map, where every room can be changed, added, taken away or joined. Advises: beat your own dungeon first, then send it to the Keeper.", g: "Come, sit. Every good dungeon starts as a bad map." },
{ n: "Old Mag the barkeep", t: "barkeep", x: 11.5, z: -22, p: "Old Mag, who keeps the Crawlers' Rest, the tavern in the Dungeon Crawlers' Hall. Loud, kind, has heard every tall tale twice. Serves ale, stew and bread. Gossips about which dungeons on the Board are cruel, which are clever, and which makers are getting rich.", g: "Sit down before you fall down. Stew's hot." },
{ n: "Tamsin Reed", t: "crawler", x: 7, z: -12, p: "Tamsin Reed, a young crawler between runs at the Crawlers' Rest, bandaged arm, cheerful. Has cleared a dozen dreamers' dungeons and rates them honestly. Loves puzzle rooms, hates dart walls.", g: "Lost to a riddle door. A riddle door!" },
{ n: "Garrow the Unlucky", t: "crawler", x: 10, z: -40, p: "Garrow, a big crawler warming himself by the fire in the Crawlers' Rest. Has been knocked down in nearly every dungeon on the Board and keeps going back. Gives advice: learn a trap's beat, step through on the off-beat; get clear of a boss's red ring.", g: "Spikes go up, spikes go down. Count." },
{ n: "Sister Elowen", t: "healer", x: -6, z: -44, p: "Sister Elowen, a healer of the Dungeon Crawlers' Hall who patches up crawlers when they climb back up. Calm and dry-humoured. Reminds everyone that the way in and any shrine are safe places in a dungeon.", g: "Sit still. This will sting." },
{ n: "Pip Hollins", t: "apprentice", x: -13, z: -35, p: "Pip Hollins, an eager apprentice maker at the Makers' Table, working on a first dungeon: a sunken temple with too many pools. Asks the dreamer's opinion of themes and traps.", g: "Do you think nine pools is too many pools?" },
{ n: "Corvin Ashe", t: "crawler", x: 5, z: -48, p: "Corvin Ashe, a quiet, well-armed crawler reading the Board, choosing which dreamer's dungeon to go down next. Prefers Brutal and Nightmare. Speaks little, but knows which makers build fair fights.", g: "The featured ones. Always start there." }
];
function dmkCrawlFolk(G) { return __ZC(493, 164, this, arguments, new.target); }
function dmkCrawlBlock(x, z) {
if (x < -DMKC_W / 2 + 0.6 || x > DMKC_W / 2 - 0.6 || z < -DMKC_L + 0.6 || z > -0.6)
return true;
var R = DMKC.R;
for (var i = 0; i < R.length; i++) {
var q = R[i];
if (!q.r)
continue;
var dx = x - q.x, dz = z - q.z;
if (dx * dx + dz * dz < (q.r + 0.28) * (q.r + 0.28))
return true;
}
return false;
}
function dmkCrawlTick(dt) { return __ZC(493, 165, this, arguments, new.target); }
if (typeof WLG !== "undefined" && WLG.keys && WLG.keys.indexOf("crawl") < 0)
WLG.keys.push("crawl");
if (typeof worldDef === "function")
worldDef("crawl", {
base: DMK.crawlBase, far: 260, ownSky: true, tone: 260,
env: function () { return { top: 0x14100C, low: 0x14100C, fog: 0x14100C, fogD: 0.008, sun: 0.3, sunCol: 0xFFD8A0, sunDir: [0.2, 1, 0.1], hemi: 0.6, hemiCol: 0xFFE8D0, hemiGround: 0x2A2018, stars: 0 }; },
build: function (G) { return __ZC(493, 166, this, arguments, new.target); },
enter: function (opt) { return __ZC(493, 167, this, arguments, new.target); },
leave: function () { worldPrompt(null); },
ground: function () { return 0; },
block: function (x, z) { return dmkCrawlBlock(x, z); },
tick: function (dt) { dmkCrawlTick(dt); },
back: function () { worldHome("<b>Back through the door.</b>"); },
indoors: function () { return 2; }
});
function dmkCrawlGo() { return worldGo("crawl", {}); }
function dmkBoardFetch(tab, cb) { return __ZC(493, 168, this, arguments, new.target); }
function dmkBoard(tab) { return __ZC(493, 169, this, arguments, new.target); }
function dmkGoDown(id) { return __ZC(493, 170, this, arguments, new.target); }
function dmkFame() { return __ZC(493, 171, this, arguments, new.target); }
function dmkRate(id, n) {
if (typeof cityRpc !== "function")
return;
cityRpc("dmk_rate", { p_id: id, p_stars: n }).then(function (o) { dmkSay("⭐ " + dmkEsc((o && o.say) || "")); }).catch(function () { });
}
function dmkSubmit(i) { return __ZC(493, 172, this, arguments, new.target); }
function dmkKeeperCard(st) { return __ZC(493, 173, this, arguments, new.target); }
function dmkKeeperNote(r, done) { return __ZC(493, 174, this, arguments, new.target); }
(function () {
if (typeof ktPane !== "function")
return;
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-dmk]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-dmk", "1");
b.textContent = "🏰 Dungeon Crawlers: dungeons waiting";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } dmkCrawlGo(); setTimeout(function () { dmkKeeperCard("waiting"); }, 900); };
row.parentNode.appendChild(b);
if (typeof cityRpc === "function")
cityRpc("dmk_keeper_state", {}).then(function (o) { if (o && o.ok)
b.textContent = "🏰 Dungeon Crawlers: " + o.waiting + " waiting, " + o.in_hall + " in the Hall"; }).catch(function () { });
}
}
catch (e) { }
return r;
};
})();
(function door(n) {
if (typeof WFD_LIST === "undefined" || !Array.isArray(WFD_LIST)) {
if ((n | 0) < 20 && typeof setTimeout === "function")
setTimeout(function () { door((n | 0) + 1); }, 1500);
return;
}
if (WFD_LIST.some(function (d) { return d.k === "crawl"; }))
return;
WFD_LIST.push({ k: "crawl", n: "The Dungeon Crawlers", s: "dreamers' own dungeons, and the Makers' Table", fr: 0x5A4A3A, lf: 0x3A2418, gl: 0xFFC870, sh: "arch", tex: "stone", go: function () { return dmkCrawlGo(); } });
})();
setTimeout(function () {
try {
if (typeof location === "undefined" || !/[?&]kdmk=1/.test(location.search))
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
dmkCrawlGo();
setTimeout(function () { dmkKeeperCard("waiting"); }, 1200);
try {
var q = new URLSearchParams(location.search);
q.delete("kdmk");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
