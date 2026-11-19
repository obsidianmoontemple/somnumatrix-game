/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SSX_Y = -83;
var SSX_BOX = { x0: -3700, x1: 3700, z0: 1400, z1: 6600 };
var SSX_IN0 = { x: -3000, z: 7400, step: 320 };
var SSX_GATE = { x: -3350, z: 4000 };
var SSX_PL = {
lanternfall: { name: "Lanternfall", x: -2300, z: 3300, r: 170, card: "A floating port of moored hulks and stilt houses", icon: "🏮" },
coral: { name: "The Coral Lights", x: -1500, z: 5300, r: 230, card: "A ring of coral that glows in the dark", icon: "🪸" },
ysmere: { name: "Ysmere, the Drowned City", x: 300, z: 5650, r: 330, card: "Towers of an old city rising out of the water", icon: "🏛️" },
boneyard: { name: "The Boneyard of Ships", x: -700, z: 2250, r: 300, card: "Where wrecks drift and settle", icon: "⚓" },
lampwick: { name: "Lampwick Rock", x: 900, z: 3500, r: 80, card: "A lighthouse on a crag, its lamp always lit", icon: "🗼" },
puffhollow: { name: "Puffhollow", x: 2050, z: 2350, r: 210, card: "The mushroom island of the Sporekin", icon: "🍄" },
mirrorstill: { name: "Mirrorstill", x: 1500, z: 4750, r: 420, card: "Water so still it holds the glow-worms like a mirror", icon: "🪞" },
gullet: { name: "The Gullet", x: -750, z: 4250, r: 230, card: "A whirlpool: keep well off", icon: "🌀" },
narrows: { name: "The Pillared Narrows", x: 2700, z: 4000, r: 420, card: "A maze of stone pillars, and a race through it", icon: "🏁" },
trench: { name: "The Gloamwyrm's Trench", x: 2650, z: 1900, r: 300, card: "Deep water, and what lives in it", icon: "🐉" },
threads: { name: "The Thousand Threads", x: 3450, z: 4000, r: 200, card: "A curtain of water falling from the roof", icon: "💧" }
};
var SSX_ISLES = [
["coralkey", -1500, 5300, 34, 2.2, 0xB8A890, 0x8A7A68],
["ysmere", 300, 5650, 120, 9, 0x6A6458, 0x55504A],
["lampwick", 900, 3500, 58, 16, 0x4A4640, 0x3A3632],
["puffhollow", 2050, 2350, 170, 7, 0x4A3A4A, 0x3A2E36],
["grotto", 3560, 4000, 40, 2.4, 0xC8C0B0, 0x8A8478],
["wyrmtooth", 2380, 2050, 26, 5, 0x3A3634, 0x2A2826],
["boneyard", -700, 2250, 40, 1.8, 0x9A9080, 0x6A6458]
];
var SSX_BOATS = [
{ k: "skiff", name: "Glimmer skiff", sub: "A deep gnome's sail skiff: quick to turn, light in the hull", top: 9, acc: 2.4, turn: 0.62, hull: 60, len: 6.2, beam: 2.0, col: 0x6A4A30, sail: 0xD8C8A0, quiet: 1 },
{ k: "keel", name: "The Steady Bimble", sub: "A broad keelboat with a cabin: slower, but she takes a battering", top: 7, acc: 1.6, turn: 0.42, hull: 130, len: 9.5, beam: 3.2, col: 0x4A3A2A, sail: 0xA88A60, quiet: 1 },
{ k: "glider", name: "Shadeglider", sub: "A dark elf's silk-sailed glider: fastest of all, and quiet, so the deep notices you less", top: 12.5, acc: 3, turn: 0.55, hull: 50, len: 7.4, beam: 1.7, col: 0x1E1A28, sail: 0x5A4A7A, quiet: 0.5 }
];
var SSX_EMP = [
[6100, "The Lanternfall Harbour Company", "Lanternfall Harbour"],
[6105, "The Lamp & Lantern", "The Lamp & Lantern"],
[6110, "The Keepers of Lampwick Rock", "Lampwick Rock"],
[6115, "The Archive of Tides", "The Archive of Tides"]
];
var SSX_WPN = {
"Lanternfall Harbour": "The Underdark: Lanternfall, the floating port on the Sunless Sea.",
"The Lamp & Lantern": "The Underdark: the Lamp & Lantern chowder house, Lanternfall.",
"Lampwick Rock": "The Underdark: the lighthouse on Lampwick Rock, the Sunless Sea.",
"The Archive of Tides": "The Underdark: the Archive of Tides in Ysmere, the Drowned City."
};
function ssxJobT(t, steps) { return [[t, "station", steps]]; }
var SSX_JOBS = [
[6100, "Lanternfall harbour hand", "Lanternfall Harbour", 10, 4, true, [7, 8], ssxJobT("Work the harbour", ["Take the boats' lines as they come in", "Moor them fore and aft", "Load the cargo nets", "Coil the lines and sweep the quay"])],
[6101, "Net mender", "Lanternfall Harbour", 10, 2, true, [8, 8], ssxJobT("Mend the nets", ["Hang the nets on the drying racks", "Find the torn meshes", "Knot them whole again", "Fold the nets for the boats"])],
[6102, "Harbour pilot", "Lanternfall Harbour", 12, 2, false, [8, 8], ssxJobT("Pilot the boats in", ["Check the board for arrivals", "Row out to the harbour mouth", "Bring a boat in past the moored hulks", "Log her in the harbour book"])],
[6103, "Shipwright's hand", "Lanternfall Harbour", 11, 2, true, [8, 8], ssxJobT("Help on the slip", ["Haul a boat up the slip", "Scrape her hull", "Caulk the seams with oakum and pitch", "Paint and launch her"])],
[6104, "Coral diver", "Lanternfall Harbour", 12, 2, false, [8, 8], ssxJobT("Dive the Coral Lights", ["Check the diving bell and the air hose", "Go down along the coral", "Gather the broken branches only", "Come up slowly and log the catch"])],
[6105, "Chowder cook", "The Lamp & Lantern", 11, 2, true, [7, 8], ssxJobT("Cook the chowder", ["Light the range", "Clean the lantern-eye cod", "Simmer the chowder with glowcap and cream", "Ladle it out to the harbour folk"])],
[6106, "Lamp & Lantern server", "The Lamp & Lantern", 10, 3, true, [10, 8], ssxJobT("Serve the tables", ["Wipe the tables", "Take the orders", "Carry out the chowder and cider", "Wash the bowls"])],
[6107, "Innkeeper's hand", "The Lamp & Lantern", 10, 1, true, [9, 8], ssxJobT("Keep the rooms", ["Strip the beds", "Make them up fresh", "Trim the lamps in the rooms", "Sweep the stair"])],
[6110, "Lamp keeper's mate", "Lampwick Rock", 11, 2, true, [8, 8], ssxJobT("Keep the light", ["Carry up the oil", "Trim the wicks", "Polish the lens", "Write up the light book"])],
[6111, "Watch on the gallery", "Lampwick Rock", 11, 1, true, [18, 8], ssxJobT("Keep the night watch", ["Climb to the gallery", "Watch the dark water for boats in trouble", "Ring the bell if one is", "Log what you saw"])],
[6115, "Archive cataloguer", "The Archive of Tides", 12, 2, false, [9, 8], ssxJobT("Catalogue the finds", ["Take the day's finds from the divers", "Clean them gently", "Measure and draw each one", "Write its card and shelve it"])],
[6116, "Archive diver", "The Archive of Tides", 12, 2, false, [9, 8], ssxJobT("Dive the drowned streets", ["Suit up and check the line", "Go down to the old street", "Map what you see on a slate", "Bring up only what the archivist marked"])]
];
var SSX_MATS = [
["ss_glowcoral", "Glowcoral", "🪸", 4, 8, "broken branches at the Coral Lights"],
["ss_brass", "Salvaged brass", "🔩", 5, 10, "the wrecks of the Boneyard of Ships"],
["ss_lanterncod", "Lantern-eye cod", "🐟", 4, 7, "fished anywhere on the Sunless Sea"],
["ss_lampoil", "Lamp oil", "🛢️", 2, 4, "the chandlery at Lanternfall"],
["ss_sporecake", "Spore-cake", "🍘", 2, 5, "the bakers of Puffhollow"],
["ss_bronze", "Ysmere bronze", "🏺", 9, null, "the drowned streets of Ysmere; found, never sold"],
["ss_eelscale", "Gloam-eel scale", "🐍", 7, null, "shed by gloam eels you drive off; found, never sold"],
["ss_wyrmscale", "Gloamwyrm scale", "🐉", 16, null, "on the Wyrm's Tooth by the Gloamwyrm's Trench; found, never sold"],
["ss_nightpearl", "Night-pearl", "⚪", 20, null, "the grotto behind the Thousand Threads; found, never sold"]
];
var SSX_SPOTS = [
["ss_coral1", "ss_glowcoral", 1, 3, 25, "Broken glowcoral on the reef", "gather glowcoral from the boat", "aboard", "coral1"],
["ss_coral2", "ss_glowcoral", 1, 3, 25, "Glowcoral in the lagoon", "gather glowcoral from the boat", "aboard", "coral2"],
["ss_coral3", "ss_glowcoral", 1, 2, 25, "Glowcoral on the diver's key", "pick up broken glowcoral", "crystal", [-1488, 5318]],
["ss_brass1", "ss_brass", 1, 3, 30, "Brass fittings on a wreck", "prise off the brass", "aboard", "wreck1"],
["ss_brass2", "ss_brass", 1, 2, 30, "Brass in the Wending Star's hold", "gather brass from the hold", "prize", "hold"],
["ss_timber", "cr_wood", 1, 3, 25, "Sound timber on the Boneyard's sandbar", "gather sound timber", "driftwood", [-690, 2262]],
["ss_bronze1", "ss_bronze", 1, 1, 90, "Bronze in the rubble of Ysmere", "dig out old bronze", "gem", [330, 5606]],
["ss_bronze2", "ss_bronze", 1, 1, 120, "A drowned street, below the terrace steps", "dive for old bronze", "aboard", "ysmere1"],
["ss_eel", "ss_eelscale", 1, 2, 20, "A shed eel scale, floating", "fish out the scale", "prize", "eel"],
["ss_wyrm", "ss_wyrmscale", 1, 1, 180, "A great shed scale on the Wyrm's Tooth", "prise the scale off the rock", "crystal", [2386, 2058]],
["ss_pearl", "ss_nightpearl", 1, 1, 240, "An oyster bed behind the Threads", "open an oyster", "gem", [3578, 3994]],
["ss_fish", "ss_lanterncod", 1, 2, 15, "The boat's line", "fish", "prize", "fish"],
["ss_crate", "cr_cloth", 2, 4, 15, "A drifting crate", "haul the crate aboard", "prize", "crate"],
["ss_caps", "hx_glowcap", 2, 4, 20, "Glowcaps under the great mushrooms", "pick glowcaps", "herbs", [2090, 2392]]
];
var SSX_STALLS = {
ss_chandler: { name: "Knotwise's Chandlery", keeper: "Fennick Knotwise, the chandler", sells: ["ss_lampoil", "cr_cloth", "cr_wood", "ss_glowcoral"], buys: ["ss_glowcoral", "ss_brass", "cr_wood", "ss_lampoil"], say: "Rope, sailcloth, lamp oil and timber for every boat on the sea; Fennick buys coral and salvage." },
ss_fishwife: { name: "Gillywick's fish stall", keeper: "Nell Gillywick, the fishmonger", sells: ["ss_lanterncod", "hx_cavefish"], buys: ["ss_lanterncod", "hx_cavefish", "ss_eelscale"], say: "Lantern-eye cod and blind fish, fresh off the boats. Nell buys your catch." },
ss_baker: { name: "The spore-bakery of Puffhollow", keeper: "Tumble Puffwhistle, a Sporekin baker", sells: ["ss_sporecake", "hx_glowcap"], buys: ["hx_glowcap", "ss_lanterncod"], say: "Spore-cakes baked on warm stones, and glowcaps by the basket; the Sporekin buy fish and caps." },
ss_barge: { name: "The Saltwhistle's counter", keeper: "Captain Merrit Saltwhistle", sells: ["ss_lampoil", "cr_cloth", "ss_sporecake", "ss_lanterncod"], buys: ["ss_glowcoral", "ss_brass", "ss_lanterncod", "cr_wood"], say: "A floating shop that goes round the sea: she sells what sailors run short of, and buys what they bring." }
};
var SSX_TASKS = [
["post", "carry", "Pell Stonewhistle", "The Lanternfall post", "Odile Brackwater", null, 12, null, 0, 90],
["oil", "carry", "Fennick Knotwise", "Lamp oil for the Light", "Hesper Lampwick", null, 14, "ss_lampoil", 1, 90],
["cakes", "carry", "Tumble Puffwhistle", "Spore-cakes for the chowder house", "Mags Brinewell", null, 14, "ss_sporecake", 2, 90],
["chart", "carry", "Hesper Lampwick", "Hesper's chart for the Archive", "Archivist Sorrel Inkwater", null, 16, null, 0, 90],
["finds", "carry", "Archivist Sorrel Inkwater", "A crate of finds for Lanternfall", "Odile Brackwater", null, 15, null, 0, 90],
["rescue", "carry", "A castaway on a raft", "A castaway, home to Lanternfall", "Odile Brackwater", null, 18, null, 0, 25],
["coral", "need", "Odile Brackwater", "Coral for the harbour lamps", "Odile Brackwater", { ss_glowcoral: 4 }, 12, "ss_lampoil", 1, 0],
["brass", "need", "Fennick Knotwise", "Brass for the chandlery", "Fennick Knotwise", { ss_brass: 3 }, 14, null, 0, 0],
["fish", "need", "Mags Brinewell", "Cod for the chowder", "Mags Brinewell", { ss_lanterncod: 3 }, 12, "ss_sporecake", 1, 0],
["puff", "need", "Old Mother Puffwhistle", "Fish for the Sporekin", "Old Mother Puffwhistle", { hx_cavefish: 2 }, 10, "ss_sporecake", 2, 0],
["narrows", "game", "Captain Ysolde Varr", "Run the Pillared Narrows", "Captain Ysolde Varr", null, 16, null, 0, 40]
];
var SSX = { aboard: false, boat: null, kind: null, bx: 0, bz: 0, h: 0, v: 0, h0: undefined, hull: 0, hullMax: 0, where: "near", auto: null, carry: null, t: 0,
g: null, root: null, built: false, decks: [], posts: [], solids: [], people: [], talk: [], anim: [], enc: null, encAt: 40, fog: 0, fogWant: 0, told: {},
seen: {}, best: {}, lite: false, rock: 0, tilt: 0, bump: 0, nearBuilt: false, area: null, last: null, keyE: 0 };
try {
SSX.seen = JSON.parse(localStorage.getItem("sm.ssx.seen") || "{}") || {};
}
catch (e) {
SSX.seen = {};
}
try {
SSX.best = JSON.parse(localStorage.getItem("sm.ssx.best") || "{}") || {};
}
catch (e) {
SSX.best = {};
}
function ssxSave() { try {
localStorage.setItem("sm.ssx.seen", JSON.stringify(SSX.seen));
localStorage.setItem("sm.ssx.best", JSON.stringify(SSX.best));
}
catch (e) { } }
function ssxSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function ssxTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function ssxLite() { return typeof LITE !== "undefined" && !!LITE; }
function ssxOn() { return typeof WLD !== "undefined" && WLD.on === "underdark"; }
function ssxKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function ssxRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function ssxMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e)); }
function ssxSigned() { return typeof signedIn === "function" && signedIn(); }
function ssxHead(t, c) { return "<div style='font:600 17px var(--serif,Georgia);color:" + (c || "#BFE8F0") + "'>" + t + "</div>"; }
function ssxP(t) { return "<p style='margin:6px 0;opacity:.9'>" + t + "</p>"; }
function ssxInBox(x, z) { var B = SSX_BOX; return x > B.x0 && x < B.x1 && z > B.z0 && z < B.z1; }
function ssxAng(a) { return ((a + Math.PI * 3) % (Math.PI * 2)) - Math.PI; }
var SSX_MC = {};
function ssxM(col, kind, o) { return typeof udxMat === "function" ? udxMat(col, kind, o) : wM(col, o); }
function ssxGlowM(col, op) { var k = "g" + col + "|" + op; if (SSX_MC[k])
return SSX_MC[k]; var m = new THREE.MeshBasicMaterial({ color: col, transparent: op < 1, opacity: op, depthWrite: op >= 1 }); m.userData.noPhoto = 1; return (SSX_MC[k] = m); }
function ssxEmM(col, em, ei) { var k = "e" + col + "|" + em + "|" + ei; if (SSX_MC[k])
return SSX_MC[k]; var m = new THREE.MeshLambertMaterial({ color: col, emissive: new THREE.Color(em), emissiveIntensity: ei || 1 }); m.userData.noPhoto = 1; return (SSX_MC[k] = m); }
function ssxGlow(G, col, size, op, x, y, z) { var s = wGlow(col, size, op); s.position.set(x, y, z); G.add(s); SSX.anim.push({ glow: s, b: op, ph: (x * 0.37 + z * 0.11) % 6.28 }); return s; }
var SSX_ISLE = {};
SSX_ISLES.forEach(function (r) { SSX_ISLE[r[0]] = { k: r[0], x: r[1], z: r[2], r: r[3], top: r[4], col: r[5], rock: r[6] }; });
function ssxIsleRaw(I, x, z) { return __ZC(328, 0, this, arguments, new.target); }
function ssxLandAt(x, z) { var m = -1e9; for (var i = 0; i < SSX_ISLES.length; i++) {
var I = SSX_ISLE[SSX_ISLES[i][0]], h = ssxIsleRaw(I, x, z);
if (h !== null && h > m)
m = h;
} return m; }
function ssxDeck(o) { SSX.decks.push(o); return o; }
function ssxDeckAt(x, z, feet) { return __ZC(328, 1, this, arguments, new.target); }
function ssxHeight(x, z) { return __ZC(328, 2, this, arguments, new.target); }
function ssxRock(x, z, r) { var s = { x: x, z: z, r: r }; SSX.solids.push(s); return s; }
SSX.area = udxArea({ key: "sunless", name: "the Sunless Sea", kind: "inside", x0: SSX_BOX.x0, x1: SSX_BOX.x1, z0: SSX_BOX.z0, z1: SSX_BOX.z1, y0: SSX_Y - 12, y1: SSX_Y + 70,
env: { top: 0x03060C, low: 0x040810, fog: 0x050B16, fogD: 0.0011, sun: 0.25, sunCol: 0x9AB8E8, sunDir: [0.2, 1, 0.3], hemi: 0.62, hemiCol: 0x7A90C8, hemiGround: 0x0A1420, stars: 0 },
height: ssxHeight, place: function (x, z) { return ssxPlaceName(x, z); },
first: "<b>The Sunless Sea.</b> Out past the Glimmergate the water goes on into the dark, and the roof is a sky of glow-worms. Somewhere out there are a port, a drowned city, a lighthouse and things that sing.",
build: function (A) { ssxBuildSea(A); }, tick: function (dt, A) { ssxAreaTick(dt, A); } });
function ssxPlaceName(x, z) {
var best = null, bd = 1e9;
Object.keys(SSX_PL).forEach(function (k) { var p = SSX_PL[k], d = Math.hypot(x - p.x, z - p.z); if (d < p.r + 60 && d < bd) {
bd = d;
best = p.name;
} });
if (!best && x < SSX_GATE.x + 260)
return "the Glimmergate";
return best || "the open dark of the Sunless Sea";
}
var SSX_SLOTN = 0;
function ssxSlot() { var i = SSX_SLOTN++; return { x: SSX_IN0.x + i * SSX_IN0.step, z: SSX_IN0.z }; }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.underdark;
if (!W)
return;
W.bound = Math.max(W.bound || 0, 8200);
var g0 = W.ground, b0 = W.block, t0 = W.tick, e0 = W.enter, l0 = W.leave, bk0 = W.back, env0 = W.env;
W.ground = function (x, z, feet) { if (SSX.aboard)
return ssxBoatDeckY(); return g0.apply(this, arguments); };
W.block = function (x, z, feet) { if (SSX.aboard)
return false; return b0.apply(this, arguments); };
W.tick = function (dt) { t0.apply(this, arguments); try {
ssxTick(dt);
}
catch (e) {
if (!SSX.e1) {
SSX.e1 = 1;
if (window.console)
console.warn("[sunless-sea] tick", e);
}
} };
W.enter = function () { SSX.aboard = false; SSX.auto = null; return e0.apply(this, arguments); };
W.leave = function () { ssxLand(true); return l0 ? l0.apply(this, arguments) : undefined; };
W.back = function () {
if (SSX.aboard) {
if (SSX.auto) {
SSX.auto = null;
ssxSay("Course cleared. You have the tiller.");
return;
}
ssxChart();
return;
}
var L = worldLocal();
if (ssxInBox(L.x, L.z) && UDX.here === SSX.area) {
ssxAshoreCard();
return;
}
return bk0.apply(this, arguments);
};
W.env = function (dt) {
var b = typeof env0 === "function" ? env0.apply(this, arguments) : env0;
if (UDX.here !== SSX.area || !SSX.fog)
return b;
var k = SSX.fog, E = SSX.envF || (SSX.envF = {});
Object.assign(E, b);
E.fogD = b.fogD + k * 0.006;
E.fog = typeof blendHex === "function" ? blendHex(b.fog, 0x18202A, k) : b.fog;
E.hemi = b.hemi * (1 - k * 0.35);
return E;
};
Object.defineProperty(W, "hideMe", { configurable: true, get: function () { return SSX.aboard; } });
})();
if (typeof voMode === "function") {
var ssxVo = voMode;
voMode = function () { if (SSX.aboard && ssxOn())
return "ship"; return ssxVo.apply(this, arguments); };
}
if (typeof udxGo === "function") {
var ssxGo0 = udxGo;
udxGo = function (key, x, z) {
if (key !== "sunless")
return ssxGo0.apply(this, arguments);
SSX.feetHint = ssxDeckAt(x, z);
if (SSX.feetHint === null)
SSX.feetHint = ssxLandAt(x, z);
try {
return ssxGo0.apply(this, arguments);
}
finally {
SSX.feetHint = undefined;
}
};
}
function ssxHullGeo(len, beam, dep) { return __ZC(328, 3, this, arguments, new.target); }
function ssxBoatMesh(B) { return __ZC(328, 4, this, arguments, new.target); }
function ssxBoatSpec(k) { return SSX_BOATS.filter(function (b) { return b.k === k; })[0] || SSX_BOATS[0]; }
function ssxBoatRoot() { if (!UDX.root) {
var W = WORLDS.underdark;
UDX.root = new THREE.Group();
UDX.root.name = "udx";
W.g.add(UDX.root);
} if (!SSX.root) {
SSX.root = new THREE.Group();
SSX.root.name = "ssx";
UDX.root.add(SSX.root);
} return SSX.root; }
function ssxTakeBoat(k, where, x, z, h) { return __ZC(328, 5, this, arguments, new.target); }
function ssxLand(silent, x, z, yw) { return __ZC(328, 6, this, arguments, new.target); }
function ssxBoard() { if (!SSX.boat)
return; ssxTakeBoat(SSX.kind, SSX.where, SSX.bx, SSX.bz, SSX.h); ssxSay("<b>Aboard the " + esc(SSX.spec.name) + ".</b> W fills the sail, A and D steer; Back opens the chart."); }
function ssxBoatY() { var t = WLD.t || 0; return SSX_Y + 0.05 + Math.sin(t * 0.9 + SSX.bx * 0.01) * 0.12 * (1 - ssxCalm()); }
function ssxBoatDeckY() { return ssxBoatY() + 0.7; }
function ssxHelm() { var B = SSX.spec, back = B.len / 2 - 1.05, side = -0.5; camera.position.set(UD.base + SSX.bx - Math.sin(SSX.h) * back + Math.cos(SSX.h) * side, ssxBoatY() + 2.3, SSX.bz - Math.cos(SSX.h) * back - Math.sin(SSX.h) * side); }
function ssxPlaceBoat(dt) { return __ZC(328, 7, this, arguments, new.target); }
function ssxCalm() { if (SSX.where !== "open")
return 0; var p = SSX_PL.mirrorstill, d = Math.hypot(SSX.bx - p.x, SSX.bz - p.z); return Math.max(0, Math.min(1, (p.r + 80 - d) / 160)); }
var SSX_NEAR = { gx: 0, gz: 0, x0: 0, x1: 0, zh: 250 };
function ssxSail(dt) { return __ZC(328, 8, this, arguments, new.target); }
function ssxThroughGate(out, nx, nz) { return __ZC(328, 9, this, arguments, new.target); }
function ssxHurt(n, msg) { return __ZC(328, 10, this, arguments, new.target); }
function ssxFounder() { return __ZC(328, 11, this, arguments, new.target); }
function ssxChart() { return __ZC(328, 12, this, arguments, new.target); }
function ssxApproach(k) {
var A = SSX_APPROACH[k];
if (A)
return A;
var p = SSX_PL[k], dx = SSX.bx - p.x, dz = SSX.bz - p.z, d = Math.hypot(dx, dz) || 1;
return { x: p.x + dx / d * (p.r + 60), z: p.z + dz / d * (p.r + 60) };
}
var SSX_APPROACH = {};
function ssxBoatCard() { return __ZC(328, 13, this, arguments, new.target); }
var SSX_POINTS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
function ssxBanner() { return __ZC(328, 14, this, arguments, new.target); }
function ssxNearSet() { return __ZC(328, 15, this, arguments, new.target); }
function ssxOnPontoon(x, z) { if (!SSX_NEAR.pon)
return false; for (var i = 0; i < SSX_NEAR.pon.length; i++) {
var p = SSX_NEAR.pon[i];
if (x > p.x0 && x < p.x1 && z > p.z0 && z < p.z1)
return true;
} return false; }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.underdark;
if (!W)
return;
var g0 = W.ground, b0 = W.block;
W.ground = function (x, z, feet) { if (!SSX.aboard && SSX_NEAR.pon && ssxOnPontoon(x, z))
return UD_SEA_Y + 1.25; return g0.apply(this, arguments); };
W.block = function (x, z, feet) { if (!SSX.aboard && SSX_NEAR.pon && ssxOnPontoon(x, z))
return worldSolidAt(UD.solids, x, z, feet); return b0.apply(this, arguments); };
})();
function ssxNearBuild(G) { return __ZC(328, 16, this, arguments, new.target); }
function ssxPellCard(talk) { return __ZC(328, 17, this, arguments, new.target); }
function ssxSeaFacts() { return __ZC(328, 18, this, arguments, new.target); }
var SSX_SET = " (SomnuMatrix's own deep world, the Underdark: the Sunless Sea is an underground ocean past Glimmerdeep, the deep gnomes' town, under a roof of glow-worms; on it are Lanternfall, a floating port of moored hulks and stilt houses; the Coral Lights; Ysmere, the Drowned City, and its Archive of Tides; the Boneyard of Ships; Lampwick Rock and its lighthouse; Puffhollow, the island of the Sporekin, small mushroom folk; Mirrorstill, where the Lantern Leviathan rises; the Gullet, a whirlpool; the Pillared Narrows; the Gloamwyrm's Trench; and the Thousand Threads, a curtain of falling water. Every place and person is original.) Keep it warm, characterful and suitable for all ages: wonder and adventure, never cruelty or horror.";
function ssxPersona(name, who, greet) { return { name: name, persona: "You are " + name + ", " + who + SSX_SET, greet: greet }; }
var SSX_LOOK = {
gnome: function (c, o) { return { top: c, topKind: "shirt", bottom: 0x4A4038, skin: 0x8A8478, hair: 0x5A5450, hairStyle: "bald", beard: (o || 0) % 2, hat: "none", layer: "apron", layerColor: 0x6A5040 }; },
sailor: function (c, o) { return { top: c, topKind: "shirt", bottom: 0x2A3040, hair: [0x3A2A1A, 0x8A6A3A, 0x1A1A1A, 0xA8A098][(o || 0) % 4], hairStyle: (o || 0) % 2 ? "short" : "long", beard: (o || 0) % 3 === 0 ? 1 : 0, hat: (o || 0) % 2 ? "beanie" : "none", hatColor: 0x3A4A5A, layer: "longcoat", layerColor: 0x2A3440, shoes: 0x2A1E14 }; },
elf: function (c, f, o) { var L = UD_ELF(c, f, o); L.species = "elf"; return L; },
dwarf: function (c, o) { return udxLookDwarf(c, o || 0); },
spore: function (c) { return { top: c, topKind: "robe", bottom: c, skin: 0xD8C8B0, hair: 0xE8E0D0, hairStyle: "bald", beard: 0, hat: "none", shoes: 0x5A4A3A }; }
};
function ssxWho(A, G, seed, o, x, z, ry, talk, wander) { return __ZC(328, 19, this, arguments, new.target); }
function ssxSignAt(G, lines, x, y, z, ry, w, h) { var s = wSign(lines, w || 3.6, h || 1.3, "#14202A", "#CFEFF0"); s.position.set(x, y, z); s.rotation.y = ry || 0; G.add(s); return s; }
function ssxFact(A, G, x, z, title, rows, ry) { return __ZC(328, 20, this, arguments, new.target); }
var SSX_LANDINGS = [];
function ssxLanding(A, G, o) { return __ZC(328, 21, this, arguments, new.target); }
function ssxBuildSea(A) { return __ZC(328, 22, this, arguments, new.target); }
var SSX_NOPIL = [];
function ssxPillars(G, R, lite) { return __ZC(328, 23, this, arguments, new.target); }
var SSX_LF = { berth: { x: -2300, z: 3215, h: 0 } };
function ssxLanternfall(A, G, R, lite) { return __ZC(328, 24, this, arguments, new.target); }
function ssxCoral(A, G, R, lite) { return __ZC(328, 25, this, arguments, new.target); }
var SSX_SPOT_AT = {};
function ssxYsmere(A, G, R, lite) { return __ZC(328, 26, this, arguments, new.target); }
function LK_D(c, o) { return udxLookDwarf(c, o); }
function ssxBoneyard(A, G, R, lite) { return __ZC(328, 27, this, arguments, new.target); }
function ssxLampwick(A, G, R, lite) { return __ZC(328, 28, this, arguments, new.target); }
function ssxPuffhollow(A, G, R, lite) { return __ZC(328, 29, this, arguments, new.target); }
function ssxMirror(A, G, R, lite) { return __ZC(328, 30, this, arguments, new.target); }
function ssxGullet(A, G, R, lite) { return __ZC(328, 31, this, arguments, new.target); }
function ssxBuoy(G, x, z, col) { return __ZC(328, 32, this, arguments, new.target); }
var SSX_RACE = [[2380, 3720], [2560, 3600], [2780, 3700], [2950, 3900], [2900, 4180], [2700, 4320], [2500, 4200], [2420, 3960]];
function ssxNarrows(A, G, R, lite) { return __ZC(328, 33, this, arguments, new.target); }
function ssxTrench(A, G, R, lite) { return __ZC(328, 34, this, arguments, new.target); }
function ssxThreads(A, G, R, lite) { return __ZC(328, 35, this, arguments, new.target); }
function ssxEelMesh(len, col, glow) { return __ZC(328, 36, this, arguments, new.target); }
function ssxPoseEel(g, t, amp) { var S = g.userData.segs, L = g.userData.len; for (var i = 0; i < S.length; i++) {
var u = i / S.length;
S[i].position.set(Math.sin(t * 3 - u * 5) * amp * L * 0.08 * (0.3 + u), 0, -u * L * 0.9);
} }
function ssxLeviathan() { return __ZC(328, 37, this, arguments, new.target); }
function ssxWyrm() { return __ZC(328, 38, this, arguments, new.target); }
function ssxJelly(col) { return __ZC(328, 39, this, arguments, new.target); }
function ssxCastaway() { return __ZC(328, 40, this, arguments, new.target); }
function ssxCrate() { var g = new THREE.Group(); udxBox(1.2, 1, 1.2, ssxM(0x7A5A3A, "wood"), 0, 0.2, 0, g); udxBox(1.26, 0.12, 1.26, ssxM(0x3A2A1A, "wood"), 0, 0.5, 0, g); g.rotation.y = Math.random() * 6; return g; }
function ssxBarge() { return __ZC(328, 41, this, arguments, new.target); }
function ssxLifeBuild(A, G, lite) { return __ZC(328, 42, this, arguments, new.target); }
var SSX_BARGE = [[-1900, 3500], [-900, 3000], [400, 3000], [1300, 3300], [1500, 3900], [700, 4500], [-500, 4900], [-1300, 4500], [-1900, 3900]];
function ssxBargeAt(t) { return __ZC(328, 43, this, arguments, new.target); }
function ssxBargeTalk(A) { return __ZC(328, 44, this, arguments, new.target); }
function ssxForces(dt) { return __ZC(328, 45, this, arguments, new.target); }
function ssxAreaTick(dt, A) { return __ZC(328, 46, this, arguments, new.target); }
var SSX_FIRST = {
lanternfall: "<b>Lanternfall.</b> Hulks moored hull to hull, stilt houses, lanterns strung across a quay: a whole town floating on the dark. Steer for the gap in the hulks and moor at Lantern Quay.",
coral: "<b>The Coral Lights.</b> A ring of coral glowing turquoise, rose and amber, breathing slowly in the black water. There is a gap to the south.",
ysmere: "<b>Ysmere, the Drowned City.</b> Towers lean out of the water, windows dark; arches of a street go down under the surface. On the hill at its heart, a dome: the Archive of Tides.",
boneyard: "<b>The Boneyard of Ships.</b> Wrecks, dozens of them, drifted here on some slow current and settled. Little green lights drift between the masts.",
lampwick: "<b>Lampwick Rock.</b> A crag, a white tower banded black, a lamp that never goes out, and its beam turning slowly over the water.",
puffhollow: "<b>Puffhollow.</b> Mushrooms as tall as trees, their gills glowing green, and round little houses among their stems. Somebody small is waving.",
mirrorstill: "<b>Mirrorstill.</b> The waves die away. The water goes flat as glass, and the glow-worms of the roof are in it too, so you seem to sail through stars. A buoy rings, very softly.",
gullet: "<b>The Gullet.</b> Red buoys in a ring, and inside it the water is turning.",
narrows: "<b>The Pillared Narrows.</b> Columns of stone from the water to the roof, close as trees in a forest. Lights mark a course through them: the race.",
trench: "<b>The Gloamwyrm's Trench.</b> The water here is black and very deep, and the buoys have red lamps. Something long moves under the boat.",
threads: "<b>The Thousand Threads.</b> Water falls from the roof in a curtain of a thousand silver threads, roaring softly. Is there something behind it?"
};
function ssxLevTick(dt, t) { return __ZC(328, 47, this, arguments, new.target); }
function ssxWyrmTick(dt, t) { return __ZC(328, 48, this, arguments, new.target); }
var SSX_ENC = ["eels", "jelly", "drift", "castaway", "drip", "fog", "eels", "drift", "jelly"];
function ssxEncTick(dt, t) { return __ZC(328, 49, this, arguments, new.target); }
function ssxPlaceNear() { var r = null; Object.keys(SSX_PL).forEach(function (k) { var p = SSX_PL[k]; if (Math.hypot(SSX.bx - p.x, SSX.bz - p.z) < p.r + 120)
r = k; }); return r; }
function ssxEncStart(k) { var E = { k: k, t: 0, max: 60, g: new THREE.Group() }; SSX.encG.add(E.g); SSX.enc = E; var fn = SSX_ENCF[k]; if (fn && fn.start)
fn.start(E); }
function ssxEncEnd() { var E = SSX.enc; if (!E)
return; if (E.g && E.g.parent)
E.g.parent.remove(E.g); if (E.prompt)
SSX.encPrompt = null; SSX.enc = null; SSX.fogWant = 0; }
function ssxAhead(d, side) { return { x: SSX.bx + Math.sin(SSX.h) * d + Math.cos(SSX.h) * (side || 0), z: SSX.bz + Math.cos(SSX.h) * d - Math.sin(SSX.h) * (side || 0) }; }
var SSX_ENCF = {
eels: { start: function (E) { return __ZC(328, 50, this, arguments, new.target); },
tick: function (E, dt, t) { return __ZC(328, 51, this, arguments, new.target); } },
jelly: { start: function (E) { return __ZC(328, 52, this, arguments, new.target); },
tick: function (E, dt, t) { E.j.forEach(function (j) { j.g.position.y = SSX_Y - 0.9 + Math.sin(t * 0.6 + j.ph) * 0.3; j.g.scale.y = 0.9 + 0.12 * Math.sin(t * 0.8 + j.ph); j.g.userData.m.opacity = 0.35 + 0.2 * Math.sin(t * 0.5 + j.ph); }); } },
drift: { start: function (E) { E.max = 80; var p = ssxAhead(70, (Math.random() - 0.5) * 40); E.x = p.x; E.z = p.z; var c = ssxCrate(); c.position.set(p.x, SSX_Y, p.z); E.g.add(c); E.c = c; ssxSay("<b>Something floating ahead:</b> a crate, low in the water."); },
tick: function (E, dt, t) { E.c.position.y = SSX_Y + Math.sin(t) * 0.1; var d = Math.hypot(SSX.bx - E.x, SSX.bz - E.z); SSX.encPrompt = d < 14 ? { h: "<b>A drifting crate</b> · <b>press E</b> to haul it aboard", fn: function () { E.done = true; ssxGatherPrize("ss_crate"); } } : null; } },
castaway: { start: function (E) { E.max = 120; var p = ssxAhead(90, (Math.random() - 0.5) * 50); E.x = p.x; E.z = p.z; var r = ssxCastaway(); r.position.set(p.x, SSX_Y, p.z); E.g.add(r); E.r = r; ssxSay("<b>A light, low on the water…</b> a raft, and someone on it waving a lamp. A castaway!"); },
tick: function (E, dt, t) { return __ZC(328, 53, this, arguments, new.target); } },
drip: { start: function (E) { return __ZC(328, 54, this, arguments, new.target); },
tick: function (E, dt, t) { return __ZC(328, 55, this, arguments, new.target); } },
fog: { start: function (E) { E.max = 55; SSX.fogWant = 1; ssxSay("<b>Fog.</b> A grey bank rolls over the water and the glow-worms go out one by one. Steer by the compass on the binnacle."); },
tick: function (E) { if (E.t > 45)
SSX.fogWant = 0; } }
};
function ssxGatherPrize(id) { if (typeof hxGive !== "function")
return; ssxSay("You reach over the side…"); hxGive(id, function () { }, function () { }); }
var SSX_TH = {
inn: { wall: udxMat(0x6A5034, "wood"), floor: udxMat(0x5A4028, "wood"), hallFloor: udxMat(0x4A3420, "wood"), ceil: udxMat(0x3A2A1A, "wood"), trim: udxMat(0x2E2014, "wood"), glow: 0xFFC070, signBg: "#2A1A10", signFg: "#FFD890" },
office: { wall: udxMat(0x5A6470, "plaster"), floor: udxMat(0x4A3A2A, "wood"), ceil: udxMat(0x3A3A40, "wood"), trim: udxMat(0x2A2A30, "wood"), glow: 0xFFE0A8, signBg: "#14202A", signFg: "#CFEFF0" },
archive: { wall: udxMat(0x6A6A62, "stone"), floor: udxMat(0x4A5A56, "marble"), hallFloor: udxMat(0x3A4A46, "marble"), ceil: udxMat(0x3A4A4A, "stone"), trim: udxMat(0x8A8478, "stone"), glow: 0x9AD8C8, signBg: "#14202A", signFg: "#CFEFF0" },
wreck: { wall: udxMat(0x3A3028, "wood"), floor: udxMat(0x2E2620, "wood"), ceil: udxMat(0x2A2018, "wood"), trim: udxMat(0x1E1812, "wood"), glow: 0xBFF0E0, signBg: "#1E1812", signFg: "#C8B888" },
cottage: { wall: udxMat(0xD8D4CA, "plaster"), floor: udxMat(0x5A4632, "wood"), ceil: udxMat(0x4A3A2A, "wood"), trim: udxMat(0x2A3A5A, "wood"), glow: 0xFFD890, signBg: "#1E2A3A", signFg: "#E8E4DA" },
spore: { wall: udxMat(0xE0D4C0, null), floor: udxMat(0x5A4A3A, "wood"), hallFloor: udxMat(0x4A3A30, "wood"), ceil: udxMat(0x8AF0B0, null, { e: 0x2AA870, ei: 0.5 }), trim: udxMat(0xA87A5A, "wood"), glow: 0xC8F0A0, signBg: "#2A2030", signFg: "#E8F0D0" }
};
var SSX_ENV_IN = { top: 0x0A0810, low: 0x0A0810, fog: 0x0A0810, fogD: 0.004, sun: 0.85, sunCol: 0xFFE8D0, sunDir: [0.35, 1, 0.45], hemi: 1.7, hemiCol: 0xF0E8E0, hemiGround: 0x7A7068, stars: 0 };
var SSX_DOORS = {};
(function () {
var LF = SSX_PL.lanternfall, YS = SSX_PL.ysmere, BY = SSX_PL.boneyard, LW = SSX_PL.lampwick, PH = SSX_ISLE.puffhollow;
function out(x, z, yaw, msg) { return { area: "sunless", x: x, z: z, yaw: yaw || Math.PI, msg: msg }; }
SSX_DOORS.inn = udxBuilding({ key: "ss_inn", name: "The Lamp & Lantern", stairName: "The stair", out: out(LF.x - 30, LF.z + 19, Math.PI, "<b>Lantern Quay.</b>"), floors: [
{ slot: ssxSlot(), th: SSX_TH.inn, label: "The common room", foyer: { n: "The common room", w: 18, d: 16, h: 5, kit: "tavern" }, hallName: "The passage", hallW: 4, hallH: 4.2,
rooms: [{ n: "The kitchen", t: "kitchen", w: 9, d: 7, lock: "The Lamp & Lantern", lockName: "Kitchen" }, { n: "The snug", t: "sitting", w: 8, d: 7 }, { n: "The cider room", t: "brewery", w: 8, d: 7, lock: "The Lamp & Lantern", lockName: "Cellar" }, { n: "The pantry and store", t: "store", w: 9, d: 7, lock: "The Lamp & Lantern", lockName: "Store" }],
end: { n: "The long dining room", t: "dining", w: 14, d: 14, h: 5 }, env: SSX_ENV_IN },
{ slot: ssxSlot(), th: SSX_TH.inn, label: "The guest rooms", sub: "Up the stair", foyer: { n: "The landing", w: 10, d: 10, h: 4, kit: "hall" }, hallName: "The upstairs passage", hallW: 3.4, hallH: 3.6,
rooms: [{ n: "The Lantern Room", t: "bedroom", w: 8, d: 7 }, { n: "The Cod Room", t: "bedroom", w: 8, d: 7 }, { n: "The Bell Room", t: "bedroom", w: 8, d: 7 }, { n: "The Pilot's Room", t: "bedroom", w: 8, d: 7 }, { n: "The washroom", t: "bath", w: 8, d: 7 }, { n: "Mags's own room", t: "grandbed", w: 8, d: 7, lock: "The Lamp & Lantern", lockName: "Private" }],
end: { n: "The sitting room over the harbour", t: "sitting", w: 10, d: 10 }, env: SSX_ENV_IN }
] });
SSX_DOORS.office = udxBuilding({ key: "ss_office", name: "The Harbour Office", out: out(LF.x + 16, LF.z + 19.5, Math.PI, "<b>Lantern Quay.</b>"), floors: [
{ slot: ssxSlot(), th: SSX_TH.office, foyer: { n: "The front office", w: 12, d: 12, h: 4.4, kit: "office" }, hallName: "The corridor", hallW: 3.6, hallH: 4,
rooms: [{ n: "The chart room", t: "maps", w: 9, d: 7 }, { n: "The harbour book", t: "counting", w: 8, d: 7, lock: "Lanternfall Harbour", lockName: "Harbour staff" }, { n: "The lost-and-found", t: "store", w: 8, d: 7 }, { n: "The pilots' mess", t: "common", w: 9, d: 7 }, { n: "The net loft", t: "loom", w: 9, d: 7, lock: "Lanternfall Harbour", lockName: "Harbour staff" }],
end: { n: "The harbourmistress's office", t: "office", w: 10, d: 10, lock: "Lanternfall Harbour", lockName: "Harbourmistress" }, env: SSX_ENV_IN }
] });
SSX_DOORS.archive = udxBuilding({ key: "ss_archive", name: "The Archive of Tides", stairName: "The spiral stair", out: out(YS.x + 20, YS.z + 20 - 15, Math.PI, "<b>The terrace of Ysmere.</b>"), floors: [
{ slot: ssxSlot(), th: SSX_TH.archive, label: "The rotunda", foyer: { n: "The rotunda", w: 16, d: 16, h: 7, kit: "gallery" }, hallName: "The Gallery of Ysmere", hallW: 5, hallH: 6,
rooms: [{ n: "The reading room", t: "library", w: 10, d: 8 }, { n: "The map room", t: "maps", w: 9, d: 8 }, { n: "The finds hall", t: "gallery", w: 10, d: 8 }, { n: "The conservation room", t: "lab", w: 9, d: 8, lock: "The Archive of Tides", lockName: "Archive staff" }, { n: "The tide-glass room", t: "scrying", w: 9, d: 8 }],
end: { n: "The Hall of the Last Tide", t: "ancestors", w: 14, d: 16, h: 8 }, env: SSX_ENV_IN },
{ slot: ssxSlot(), th: SSX_TH.archive, label: "The stacks", sub: "Up the spiral stair", foyer: { n: "The upper gallery", w: 12, d: 12, h: 5, kit: "hall" }, hallName: "The stacks", hallW: 4, hallH: 5,
rooms: [{ n: "The stacks of the drowned books", t: "library", w: 10, d: 8 }, { n: "The cataloguers' room", t: "office", w: 9, d: 8, lock: "The Archive of Tides", lockName: "Archive staff" }, { n: "The divers' room", t: "guard", w: 9, d: 8, lock: "The Archive of Tides", lockName: "Divers" }, { n: "The lecture room", t: "lecture", w: 10, d: 8 }],
end: { n: "The archivist's study", t: "study", w: 10, d: 10 }, env: SSX_ENV_IN }
] });
SSX_DOORS.hold = udxBuilding({ key: "ss_hold", name: "The Wending Star", out: out(BY.x - 8, BY.z + 52, Math.PI / 2, "<b>The deck of the Wending Star.</b>"), floors: [
{ slot: ssxSlot(), th: SSX_TH.wreck, foyer: { n: "The main hold", w: 12, d: 9, h: 3.2, kit: "ss_hold" }, hallName: "The 'tween deck", hallW: 3, hallH: 2.8,
rooms: [{ n: "The captain's cabin", t: "study", w: 8, d: 6, h: 2.8 }, { n: "The galley", t: "kitchen", w: 7, d: 6, h: 2.8 }, { n: "The crew's berths", t: "barracks", w: 9, d: 6, h: 2.8 }, { n: "The sail locker", t: "store", w: 7, d: 6, h: 2.8 }],
end: { n: "The cargo deck", t: "store", w: 10, d: 9, h: 3.2 }, env: { top: 0x06080A, low: 0x06080A, fog: 0x06080A, fogD: 0.006, sun: 0.5, sunCol: 0xBFF0E0, sunDir: [0.35, 1, 0.45], hemi: 1.1, hemiCol: 0xC8E8E0, hemiGround: 0x3A4A44, stars: 0 },
extra: function (A, ox, oz, y, Q) { udxTalk(A, { x: ox + Q.L + Q.ex / 2, z: oz + 2, r: 3, name: "Brass fittings in the cargo", verb: "gather brass from the hold", fn: function () { ssxGatherPrize("ss_brass2"); } }); } }
] });
SSX_DOORS.cottage = udxBuilding({ key: "ss_cottage", name: "The keeper's cottage", out: out(LW.x + 12, LW.z + 2.5, Math.PI, "<b>The top of Lampwick Rock.</b>"), floors: [
{ slot: ssxSlot(), th: SSX_TH.cottage, foyer: { n: "The kitchen", w: 10, d: 8, h: 3.4, kit: "kitchen" }, hallName: "The passage", hallW: 2.8, hallH: 3.2,
rooms: [{ n: "Hesper's room", t: "bedroom", w: 7, d: 6, h: 3 }, { n: "The oil store", t: "store", w: 7, d: 6, h: 3 }, { n: "The light book room", t: "study", w: 7, d: 6, h: 3 }, { n: "The spare room", t: "bedroom", w: 7, d: 6, h: 3 }],
end: { n: "The parlour", t: "sitting", w: 8, d: 8, h: 3.2 }, env: SSX_ENV_IN }
] });
SSX_DOORS.spore = udxBuilding({ key: "ss_spore", name: "The Spore-hall of Puffhollow", out: out(PH.x - 36, PH.z - 67, Math.PI, "<b>Puffhollow.</b>"), floors: [
{ slot: ssxSlot(), th: SSX_TH.spore, foyer: { n: "The gill hall", w: 16, d: 16, h: 7, kit: "common" }, hallName: "The stem passage", hallW: 4, hallH: 5,
rooms: [{ n: "The bakery", t: "kitchen", w: 9, d: 7 }, { n: "The spore nursery", t: "nursery", w: 9, d: 7 }, { n: "The listening room", t: "scrying", w: 9, d: 7 }, { n: "The sleeping hall", t: "dorm", w: 10, d: 7 }],
end: { n: "Mother Puffwhistle's hearth", t: "sitting", w: 12, d: 12, h: 6 }, env: SSX_ENV_IN }
] });
})();
if (typeof UDX_KITS !== "undefined")
UDX_KITS.ss_hold = function (K) { K.left("crates", K.D * 0.3); K.left("trcrates", K.D * 0.7); K.right("barrel", K.D * 0.3); K.right("trsacks", K.D * 0.7); K.glow(0, K.D * 0.5, K.h - 1, 0xFFC870); };
function ssxDoorsBuild(A, G) { return __ZC(328, 56, this, arguments, new.target); }
(function () {
if (typeof HX_WORK === "undefined" || typeof HX_JOBS === "undefined")
return;
var LF = SSX_PL.lanternfall, at = { "Lanternfall Harbour": [LF.x + 16, LF.z + 10, 70], "The Lamp & Lantern": [LF.x - 30, LF.z + 22, 16], "Lampwick Rock": [SSX_PL.lampwick.x, SSX_PL.lampwick.z, 40], "The Archive of Tides": [SSX_PL.ysmere.x + 20, SSX_PL.ysmere.z + 20, 30] };
SSX_EMP.forEach(function (E) { var k = E[2], p = at[k]; if (!p || HX_WP[k])
return; var row = [k, "underdark", Math.round(p[0]), Math.round(p[1]), p[2], SSX_WPN[k]]; HX_WORK.push(row); HX_WP[k] = { key: k, world: "underdark", x: row[2], z: row[3], r: row[4], note: row[5] }; });
SSX_JOBS.forEach(function (j) { HX_JOBS.push([j[0], "underdark", j[1], j[2], j[3], j[4], j[5], j[6], j[7]]); });
SSX_MATS.forEach(function (m) { if (!HX_MATS.some(function (x) { return x[0] === m[0]; }))
HX_MATS.push(m); var o = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] }; HX_MB[m[0]] = o; if (typeof FG_MB !== "undefined" && !FG_MB[m[0]])
FG_MB[m[0]] = o; });
SSX_SPOTS.forEach(function (s) {
var a = s[8], x = 0, z = 0, look = s[7];
if (Array.isArray(a)) {
x = a[0];
z = a[1];
}
else
look = look === "aboard" ? "aboard" : "prize";
HX_SPOTS.push([s[0], "underdark", s[1], x, z, s[2], s[3], s[4], s[5], s[6], look]);
});
var who = { ss_chandler: [LF.x + 42, LF.z + 15.5], ss_fishwife: [LF.x - 62, LF.z - 4.5], ss_baker: [SSX_ISLE.puffhollow.x + 12, SSX_ISLE.puffhollow.z - 107.6] };
Object.keys(SSX_STALLS).forEach(function (k) { var S = SSX_STALLS[k], p = who[k]; HX_STALLS[k] = { world: "underdark", name: S.name, keeper: S.keeper, x: p ? p[0] : 0, z: p ? p[1] : 0, sells: S.sells, buys: S.buys, say: S.say, aboard: !p }; });
})();
(function () {
var map = { ss_inn: "The Lamp & Lantern", ss_office: "Lanternfall Harbour", ss_archive: "The Archive of Tides", ss_cottage: "Lampwick Rock" };
UDX.areas.forEach(function (A) { var k = A.key.replace(/_\d+$/, ""); if (map[k])
A.wp = map[k]; });
})();
(function () {
if (typeof hxGuideTo !== "function")
return;
var g = hxGuideTo;
hxGuideTo = function (w, x, z, name) {
if (w === "underdark" && ssxInBox(x, z)) {
if (SSX.aboard && SSX.where === "open") {
SSX.auto = { x: x, z: z, name: name, after: "" };
worldCard(null);
ssxSay("<b>Course set</b> for " + esc(name) + ".");
return;
}
var L = worldLocal();
if (!(UDX.here === SSX.area)) {
if (SSX.aboard) {
SSX.auto = { x: SSX_NEAR.x1 + 20, z: SSX_NEAR.gz, name: "the Glimmergate", after: "" };
ssxSay("<b>" + esc(name) + "</b> is out on the Sunless Sea: sail through the Glimmergate first.");
worldCard(null);
return;
}
return g.call(this, w, UD_SEA_X - 10, UD_GLIM.z + 8, "Pell's boat shed (a boat to " + name + ")");
}
}
return g.apply(this, arguments);
};
})();
try {
SSX.carry = JSON.parse(localStorage.getItem("sm.ssx.carry") || "null");
}
catch (e) {
SSX.carry = null;
}
function ssxCarrySave() { try {
localStorage.setItem("sm.ssx.carry", JSON.stringify(SSX.carry));
}
catch (e) { } }
var SSX_TK = {};
SSX_TASKS.forEach(function (r) { SSX_TK[r[0]] = { key: r[0], kind: r[1], who: r[2], name: r[3], to: r[4], need: r[5], gold: r[6], gift: r[7], giftN: r[8], secs: r[9] }; });
function ssxNeedLine(T) { return Object.keys(T.need || {}).map(function (k) { var M = hxMat(k); return T.need[k] + " × " + (M.icon || "") + " " + M.name.toLowerCase() + " (you have " + (typeof hxHave === "function" ? hxHave(k) : 0) + ")"; }).join(", "); }
function ssxTaskBtn(key, fns) { return __ZC(328, 57, this, arguments, new.target); }
function ssxHandBtn(name, fns) {
var C = SSX.carry;
if (!C)
return "";
var T = SSX_TK[C.key];
if (!T || T.to.split(",")[0] !== name.split(",")[0])
return "";
fns["hand"] = function () { ssxTaskDone(C.key); };
return worldBtn("hand", "📦 Hand over " + esc(T.name.toLowerCase()), "Pays " + T.gold + " gold");
}
function ssxTaskStart(key, after) { return __ZC(328, 58, this, arguments, new.target); }
function ssxTaskDone(key) { return __ZC(328, 59, this, arguments, new.target); }
var SSX_NPC = {
"Odile Brackwater": { work: "Lanternfall Harbour", tasks: ["coral"], board: 1 },
"Fennick Knotwise": { stall: "ss_chandler", tasks: ["oil", "brass"] },
"Nell Gillywick": { stall: "ss_fishwife", fish: 1 },
"Gorrel Tarbuckle, the shipwright": { mend: 1, work: "Lanternfall Harbour" },
"Mags Brinewell": { work: "The Lamp & Lantern", tasks: ["fish"] },
"Captain Ysolde Varr": { race: 1 },
"Hesper Lampwick": { work: "Lampwick Rock", tasks: ["chart"] },
"Archivist Sorrel Inkwater": { work: "The Archive of Tides", tasks: ["finds"] },
"Brannagh Deepwell": { work: "The Archive of Tides" },
"Mirelle Fathomly": { work: "Lanternfall Harbour" },
"Tumble Puffwhistle": { stall: "ss_baker", tasks: ["cakes"] },
"Old Mother Puffwhistle": { tasks: ["puff"] }
};
function ssxNpcCard(T) { return __ZC(328, 60, this, arguments, new.target); }
function ssxWrapNpcs(A) { A.talk.forEach(function (T) { if (T.ssx || !T.t || !SSX_NPC[T.name])
return; T.ssx = 1; T.verb = "talk, trade or take an errand"; T.fn = function () { ssxNpcCard(T); }; }); }
function ssxRaceArm() { return __ZC(328, 61, this, arguments, new.target); }
function ssxRaceTick(dt) { return __ZC(328, 62, this, arguments, new.target); }
function ssxTick(dt) { return __ZC(328, 63, this, arguments, new.target); }
function ssxPromptAboard() { return __ZC(328, 64, this, arguments, new.target); }
function ssxMoorAt(x, z, h) { SSX.bx = x; SSX.bz = z; SSX.h = h; SSX.v = 0; SSX.auto = null; ssxPlaceBoat(0); }
function ssxBuoyCard() { return __ZC(328, 65, this, arguments, new.target); }
function ssxAshoreCard() { return __ZC(328, 66, this, arguments, new.target); }
(function () {
if (typeof hxHub !== "function")
return;
var hub = hxHub;
hxHub = function () {
if (typeof WLD === "undefined" || WLD.on !== "underdark")
return hub.apply(this, arguments);
var wc = worldCard, add = "", more = {}, n = 0;
function head(t) { add += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function go(l, s, fn) { var k = "ssx" + (n++); add += worldBtn(k, l, s); more[k] = fn; }
head("The Sunless Sea");
var atSea = SSX.aboard && SSX.where === "open";
if (!atSea)
go("⛵ Pell's boat shed, Glimmerdeep", "Borrow a boat (free) and sail through the Glimmergate", function () { hxGuideTo("underdark", UD_SEA_X - 10, UD_GLIM.z + 8, "Pell's boat shed"); });
Object.keys(SSX_PL).forEach(function (k) { var p = SSX_PL[k]; go(p.icon + " " + esc(p.name), esc(p.card) + (SSX.seen[k] ? "" : " · not yet found"), function () { var a = ssxApproach(k); hxGuideTo("underdark", a.x, a.z, p.name); }); });
var C = SSX.carry;
if (C)
go("📦 Carrying: " + esc(C.name), "Take it to " + esc(C.to), function () { });
head("Errands on the sea · pay once a day");
SSX_TASKS.forEach(function (r) { if (r[1] === "game")
return; go((r[1] === "carry" ? "📦 " : "🧺 ") + esc(r[3]), "From " + esc(r[2]) + (r[1] === "carry" ? " to " + esc(r[4]) : ": " + ssxNeedLine(SSX_TK[r[0]])) + " · " + r[6] + " gold", function () { }); });
var b = SSX.best.narrows;
go("🏁 Race the Pillared Narrows", "Ask Captain Ysolde Varr at Lanternfall" + (b ? " · your best " + hxClock(b) : ""), function () { var p = SSX_PL.lanternfall; hxGuideTo("underdark", p.x + 60, p.z - 28, "Captain Varr"); });
var facts = Object.keys(SSX.seen).filter(function (k) { return /^fact_/.test(k); }).length, found = Object.keys(SSX_PL).filter(function (k) { return SSX.seen[k]; }).length;
go("🗺️ Your chart of the sea", found + " of " + Object.keys(SSX_PL).length + " places found · " + facts + " of 6 fact stones read" + (SSX.seen.leviathan ? " · you have seen the Lantern Leviathan" : ""), function () { if (SSX.aboard)
ssxChart();
else
ssxSeaFacts(); });
worldCard = function (h, fns) { var i = h.indexOf("<div style='margin:10px 0 2px"); h = i > 0 ? h.slice(0, i) + add + h.slice(i) : h + add; return wc.call(this, h, Object.assign({}, fns, more)); };
try {
return hub.apply(this, arguments);
}
finally {
worldCard = wc;
}
};
})();
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.underdark;
if (!W)
return;
var b0 = W.build;
W.build = function (G) {
var r = b0.apply(this, arguments);
SSX.lite = ssxLite();
try {
ssxNearBuild(G);
}
catch (e) {
if (window.console)
console.warn("[sunless-sea] near", e);
}
G.children.forEach(function (c) { var P = c.position; if (P && ssxInBox(P.x, P.z))
c.userData.udxStay = 1; });
return r;
};
})();
