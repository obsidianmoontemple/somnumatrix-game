/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var POE_KEY = "poe", POE_NAME = "Poe's Dream-Land";
var POE = { base: -8300000, G: null, built: false, t: 0, lite: false, zone: "land", mats: {}, tex: {}, solids: [], floors: [], spots: [], talk: [], people: [], fx: [],
lights: [], flames: [], districts: [], room: null, busy: false, pt: 0, vt: 0, moving: false, veil: null, storm: { t: 9, f: 0 }, rain: null, my: null, lock: null, still: 0, lastP: null,
cast: {}, anim: [], e: {} };
var POE_IN_X = 20000;
var POE_BOUND = { x0: -1300, x1: 1300, z0: -1300, z1: 1300 };
function poeKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function poeAdult() { try {
return poeKeeper() || (typeof ageAdult === "function" && ageAdult());
}
catch (e) {
return false;
} }
function poeA(grown, young) { return poeAdult() ? grown : young; }
var POE_AT = {
arrive: { x: 0, z: 505, ry: Math.PI },
raven: { x: 0, z: 540, door: { x: 0, z: 528.6 }, n: "The house of the Raven" },
throne: { x: 0, z: 0 },
usher: { x: 760, z: -650, door: { x: 760, z: -633 }, tarn: { x: 760, z: -470, rx: 150, rz: 118 }, causeway: { x: 760, z0: -352, z1: -630 }, n: "The House of Usher" },
heart: { x: 1000, z: 260, n: "The old man's street" },
masque: { x: 0, z: -1020, gate: { x: 0, z: -938 }, n: "Prince Prospero's abbey" },
pit: { x: -980, z: 160, door: { x: -962.5, z: 160 }, n: "Toledo: the House of the Inquisition" },
cask: { x: -740, z: 780, door: { x: -740, z: 797.6 }, n: "The carnival, and the palazzo of Montresor" },
morgue: { x: 430, z: 1060, n: "Paris: the Rue Morgue" }
};
var POE_ROADS = [
[[0, 30], [0, 505]],
[[25, -20], [300, -180], [560, -300], [760, -345]],
[[30, 15], [400, 120], [700, 220], [935, 262]],
[[0, -30], [0, -500], [0, -930]],
[[-30, 10], [-500, 100], [-930, 158]],
[[-25, 25], [-350, 400], [-620, 640], [-740, 742]],
[[22, 26], [180, 420], [330, 800], [420, 1000]],
[[6, 506], [170, 640], [330, 800]]
];
var POE_ROOMS = [
{ k: "chamber", n: "The chamber of the Raven", w: 11, d: 9, h: 4.2, wall: "damask", floor: "carpet", ceil: "plaster", dark: 0.5,
doors: [["n", 0, "dark", "The chamber door"], ["s", -3.2, "out:raven", "The door to the stair and the street"]] },
{ k: "u_hall", n: "The hall of the House of Usher", w: 18, d: 24, h: 10, wall: "gothic", floor: "flags", ceil: "vault", dark: 0.55,
doors: [["s", 0, "out:usher", "The Gothic archway of the hall"], ["n", -4, "u_studio", "The door to Roderick Usher's studio"], ["e", 4, "u_library", "The library door"], ["w", 4, "u_chamber", "The door to your apartment"], ["n", 5, "u_passage", "The stair down, toward the vaults"]] },
{ k: "u_studio", n: "Roderick Usher's studio", w: 15, d: 16, h: 8, wall: "panel", floor: "oak", ceil: "fretted", dark: 0.5,
doors: [["s", 0, "u_hall", "The door back to the hall"]] },
{ k: "u_library", n: "The library of Usher", w: 16, d: 14, h: 7.5, wall: "books", floor: "oak", ceil: "fretted", dark: 0.5,
doors: [["w", 0, "u_hall", "The door back to the hall"]] },
{ k: "u_chamber", n: "Your apartment in the house", w: 11, d: 11, h: 6, wall: "tapestry", floor: "oak", ceil: "fretted", dark: 0.5, windows: "e",
doors: [["e", 0, "u_hall", "The door to the hall"]] },
{ k: "u_passage", n: "The long archway down to the vault", w: 3.4, d: 46, h: 3.4, wall: "stone", floor: "flags", ceil: "stone", dark: 0.35,
doors: [["s", 0, "u_hall", "The stair up into the house"], ["n", 0, "u_vault", "The door of massive iron"]] },
{ k: "u_vault", n: "The vault, under your own sleeping apartment", w: 8, d: 11, h: 3.1, wall: "copper", floor: "copper", ceil: "stone", dark: 0.3,
doors: [["s", 0, "u_passage", "The door of massive iron"]] },
{ k: "t_house", n: "The old man's house: the passage", w: 4.2, d: 16, h: 3.2, wall: "oldpaper", floor: "boards", ceil: "plaster", dark: 0.25,
doors: [["s", 0, "out:heart", "The street door"], ["w", -3, "t_mine", "Your own room"], ["e", 3, "t_room", "The old man's chamber"]] },
{ k: "t_mine", n: "Your room", w: 5.5, d: 6, h: 3, wall: "oldpaper", floor: "boards", ceil: "plaster", dark: 0.3,
doors: [["e", 0, "t_house", "The door to the passage"]] },
{ k: "t_room", n: "The old man's chamber", w: 7, d: 7.4, h: 3.2, wall: "oldpaper", floor: "boards", ceil: "plaster", dark: 0.12,
doors: [["w", 0, "t_house", "The old man's door"]] },
{ k: "t_neigh", n: "The neighbour's parlour", w: 8, d: 7, h: 3.2, wall: "sprig", floor: "boards", ceil: "plaster", dark: 0.45,
doors: [["s", 0, "out:t_neigh", "The street door"]] },
{ k: "t_police", n: "The police office", w: 10, d: 8, h: 3.6, wall: "plaster", floor: "boards", ceil: "plaster", dark: 0.6,
doors: [["s", 0, "out:t_police", "The street door"]] },
{ k: "t_tavern", n: "The Black Horse tavern", w: 11, d: 9, h: 3.4, wall: "panel", floor: "boards", ceil: "beams", dark: 0.55,
doors: [["s", 0, "out:t_tavern", "The street door"]] },
{ k: "t_lodge", n: "A lodging house", w: 9, d: 8, h: 3.2, wall: "oldpaper", floor: "boards", ceil: "plaster", dark: 0.4,
doors: [["s", 0, "out:t_lodge", "The street door"]] },
{ k: "m_hall", n: "The great hall of the abbey", w: 24, d: 28, h: 12, wall: "gothic", floor: "marble", ceil: "vault", dark: 0.75,
doors: [["s", 0, "out:masque", "The great doors (the bolts are welded)"], ["n", 0, "m_suite", "The way into the imperial suite"]] },
{ k: "m_suite", n: "The imperial suite: the seven chambers", custom: 1, w: 120, d: 40, h: 9, dark: 0.6,
doors: [] },
{ k: "m_cot", n: "A cottage the Red Death emptied", w: 7, d: 6, h: 3, wall: "whitewash", floor: "earth", ceil: "beams", dark: 0.25,
doors: [["s", 0, "out:m_cot", "The broken door"]] },
{ k: "p_court", n: "The hall of the Inquisition at Toledo", w: 16, d: 26, h: 10, wall: "blackcloth", floor: "flags", ceil: "vault", dark: 0.45,
doors: [["e", 0, "out:pit", "The doors to the plaza"]] },
{ k: "p_dungeon", n: "The dungeon", custom: 1, w: 22, d: 22, h: 9, dark: 0.0, doors: [] },
{ k: "p_inn", n: "A posada on the plaza", w: 10, d: 8, h: 3.6, wall: "whitewash", floor: "tiles", ceil: "beams", dark: 0.55,
doors: [["w", 0, "out:p_inn", "The door to the plaza"]] },
{ k: "c_hall", n: "The palazzo of Montresor", w: 14, d: 16, h: 8, wall: "fresco", floor: "marble", ceil: "coffer", dark: 0.55,
doors: [["n", 0, "out:cask", "The street door"], ["s", 3, "c_vaults", "The long and winding staircase down"]] },
{ k: "c_vaults", n: "The catacombs of the Montresors", custom: 1, w: 140, d: 60, h: 4, dark: 0.0, doors: [] },
{ k: "c_wine", n: "A wine shop on the piazza", w: 10, d: 8, h: 3.6, wall: "brick", floor: "tiles", ceil: "beams", dark: 0.55,
doors: [["n", 0, "out:c_wine", "The door to the piazza"]] },
{ k: "r_dupin", n: "Dupin's library, Faubourg St. Germain", w: 10, d: 11, h: 4.2, wall: "books", floor: "parquet", ceil: "plaster", dark: 0.4, windows: "n",
doors: [["s", 0, "out:r_dupin", "The street door"]] },
{ k: "r_house", n: "The house in the Rue Morgue: the stair", w: 5, d: 11, h: 3.8, wall: "oldpaper", floor: "boards", ceil: "plaster", dark: 0.45,
doors: [["s", 0, "out:r_house", "The street door"], ["n", 0, "r_room", "The door of the fourth-storey chamber (forced)"]] },
{ k: "r_room", n: "The fourth-storey chamber", w: 8, d: 9, h: 3.6, wall: "stripe", floor: "parquet", ceil: "plaster", dark: 0.55, windows: "w",
doors: [["s", 0, "r_house", "The forced door to the stair"], ["e", 0, "r_back", "The door to the back chamber"]] },
{ k: "r_back", n: "The back chamber", w: 5, d: 6, h: 3.6, wall: "stripe", floor: "parquet", ceil: "plaster", dark: 0.5, windows: "e",
doors: [["w", 0, "r_room", "The door to the front chamber"]] },
{ k: "r_cafe", n: "A café in the Rue St. Roch", w: 11, d: 9, h: 4, wall: "mirror", floor: "tiles", ceil: "plaster", dark: 0.75,
doors: [["s", 0, "out:r_cafe", "The café door"]] },
{ k: "r_pref", n: "The Préfecture: the Prefect's office", w: 9, d: 9, h: 4.4, wall: "panel", floor: "parquet", ceil: "plaster", dark: 0.65,
doors: [["s", 0, "out:r_pref", "The door to the street"]] },
{ k: "r_shop", n: "A bookshop in the Rue Montmartre", w: 9, d: 8, h: 3.8, wall: "books", floor: "boards", ceil: "plaster", dark: 0.6,
doors: [["s", 0, "out:r_shop", "The shop door"]] }
];
var POE_RX = {};
POE_ROOMS.forEach(function (R, i) { R.i = i; R.x = POE_IN_X + i * 300; POE_RX[R.k] = R; });
var POE_TUNES = {
raven: "assets/poe/moonlight.mp3",
usher: "assets/poe/toccata.mp3",
dread: "assets/poe/funeral.mp3",
masque: "assets/poe/danse.mp3",
paris: "assets/poe/gymnopedie.mp3"
};
var POE_KEEPS = {
raven: ["poe_feather", "A black feather from the Raven", "🪶"],
usher: ["poe_trist", "The Mad Trist of Sir Launcelot Canning", "📕"],
heart: ["poe_lantern", "The dark lantern, its shutter closed", "🏮"],
masque: ["poe_mask", "A mask from Prince Prospero's revel", "🎭"],
pit: ["poe_hem", "A strip torn from the hem of your robe", "🧵"],
cask: ["poe_trowel", "Montresor's trowel", "🧱"],
morgue: ["poe_ribbon", "The sailor's greasy ribbon", "🎀"]
};
var POE_HIDDEN = { key: "poequill", name: "The Raven's quill", icon: "🖋️" };
function poeNz(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "0,0,0") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function poeStain(x, W, H, n, seed, col, a) { var R = wRand(seed || 9); for (var i = 0; i < n; i++) {
var cx = R() * W, cy = R() * H, r = 10 + R() * 60, g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
g.addColorStop(0, "rgba(" + (col || "20,16,10") + "," + (a || 0.25) + ")");
g.addColorStop(1, "rgba(" + (col || "20,16,10") + ",0)");
x.fillStyle = g;
x.fillRect(cx - r, cy - r, r * 2, r * 2);
} }
function poeBlocks(x, W, H, rows, cols, base, vary, mortar, seed, moss) { return __ZC(467, 0, this, arguments, new.target); }
var POE_TEX = {
flags: [2, function (x, W, H) { poeBlocks(x, W, H, 4, 3, [70, 66, 60], 26, "#1C1A16", 7); poeStain(x, W, H, 6, 8, "10,10,8", 0.3); }],
stone: [2, function (x, W, H) { poeBlocks(x, W, H, 6, 3, [64, 62, 58], 30, "#16140F", 11, true); poeStain(x, W, H, 8, 12, "8,10,6", 0.35); }],
gothic: [2.4, function (x, W, H) { return __ZC(467, 1, this, arguments, new.target); }],
brick: [2, function (x, W, H) { return __ZC(467, 2, this, arguments, new.target); }],
damask: [1, function (x, W, H) { return __ZC(467, 3, this, arguments, new.target); }],
tapestry: [2, function (x, W, H) { return __ZC(467, 4, this, arguments, new.target); }],
panel: [1.2, function (x, W, H) { return __ZC(467, 5, this, arguments, new.target); }],
books: [1.5, function (x, W, H) { return __ZC(467, 6, this, arguments, new.target); }],
oldpaper: [1, function (x, W, H) { return __ZC(467, 7, this, arguments, new.target); }],
sprig: [1, function (x, W, H) { return __ZC(467, 8, this, arguments, new.target); }],
plaster: [2, function (x, W, H) { return __ZC(467, 9, this, arguments, new.target); }],
whitewash: [2, function (x, W, H) { x.fillStyle = "#B8B2A2"; x.fillRect(0, 0, W, H); poeNz(x, W, H, 5000, 0.18, 31); poeStain(x, W, H, 8, 32, "60,50,36", 0.25); x.fillStyle = "rgba(40,34,26,.3)"; x.fillRect(0, H * 0.86, W, H * 0.14); }],
blackcloth: [1.5, function (x, W, H) { for (var i = 0; i < W; i++) {
var v = Math.sin(i / W * Math.PI * 8) * 0.5 + 0.5;
x.fillStyle = "rgb(" + Math.round(8 + v * 16) + "," + Math.round(7 + v * 14) + "," + Math.round(9 + v * 16) + ")";
x.fillRect(i, 0, 1, H);
} poeNz(x, W, H, 1200, 0.12, 33, "255,255,255"); }],
copper: [1, function (x, W, H) { return __ZC(467, 10, this, arguments, new.target); }],
fresco: [3, function (x, W, H) { return __ZC(467, 11, this, arguments, new.target); }],
mirror: [2, function (x, W, H) { return __ZC(467, 12, this, arguments, new.target); }],
stripe: [1, function (x, W, H) { for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#6A5A3E" : "#7E6E4E";
x.fillRect(i * W / 8, 0, W / 8, H);
} x.fillStyle = "rgba(160,130,70,.3)"; for (i = 0; i < 8; i++)
x.fillRect(i * W / 8 + W / 16 - 1, 0, 2, H); poeStain(x, W, H, 5, 38, "40,30,16", 0.3); }],
boards: [1.5, function (x, W, H) { return __ZC(467, 13, this, arguments, new.target); }],
oak: [2, function (x, W, H) { return __ZC(467, 14, this, arguments, new.target); }],
carpet: [2, function (x, W, H) { return __ZC(467, 15, this, arguments, new.target); }],
marble: [2, function (x, W, H) { return __ZC(467, 16, this, arguments, new.target); }],
parquet: [1, function (x, W, H) { return __ZC(467, 17, this, arguments, new.target); }],
tiles: [1, function (x, W, H) { x.fillStyle = "#3A2A20"; x.fillRect(0, 0, W, H); var R = wRand(45); for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var c = 120 + Math.round(R() * 30);
x.fillStyle = "rgb(" + c + "," + Math.round(c * 0.5) + "," + Math.round(c * 0.32) + ")";
x.fillRect(i * W / 4 + 2, j * H / 4 + 2, W / 4 - 4, H / 4 - 4);
} poeNz(x, W, H, 1500, 0.2, 46); }],
earth: [2, function (x, W, H) { x.fillStyle = "#2A2218"; x.fillRect(0, 0, W, H); poeNz(x, W, H, 7000, 0.35, 47); poeStain(x, W, H, 10, 48, "10,8,4", 0.35); }],
cobbles: [2, function (x, W, H) { return __ZC(467, 18, this, arguments, new.target); }],
ground: [4, function (x, W, H) { return __ZC(467, 19, this, arguments, new.target); }],
slate: [2, function (x, W, H) { x.fillStyle = "#1C1E22"; x.fillRect(0, 0, W, H); var R = wRand(54); for (var r = 0; r < 10; r++) {
var y = r * H / 10;
for (var c = 0; c < 9; c++) {
var v = 26 + Math.round(R() * 12);
x.fillStyle = "rgb(" + v + "," + (v + 2) + "," + (v + 6) + ")";
x.fillRect(c * W / 8 + (r % 2) * W / 16 + 1, y + 1, W / 8 - 2, H / 10 - 2);
}
} poeStain(x, W, H, 6, 55, "40,50,30", 0.25); }],
bark: [1, function (x, W, H) { x.fillStyle = "#1A1612"; x.fillRect(0, 0, W, H); var R = wRand(56); for (var i = 0; i < 30; i++) {
x.strokeStyle = "rgba(0,0,0,.6)";
x.lineWidth = 1 + R() * 3;
x.beginPath();
x.moveTo(i * W / 30, 0);
x.lineTo(i * W / 30 + (R() - 0.5) * 16, H);
x.stroke();
} poeNz(x, W, H, 1500, 0.25, 57, "90,80,70"); }],
beams: [2, function (x, W, H) { x.fillStyle = "#6A6252"; x.fillRect(0, 0, W, H); poeNz(x, W, H, 3000, 0.2, 58); x.fillStyle = "#22160E"; x.fillRect(0, H * 0.35, W, H * 0.3); x.fillStyle = "rgba(0,0,0,.4)"; x.fillRect(0, H * 0.62, W, H * 0.04); }],
vault: [3, function (x, W, H) { poeBlocks(x, W, H, 6, 4, [46, 44, 40], 18, "#121110", 59); x.strokeStyle = "rgba(20,16,12,.85)"; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(W, H); x.moveTo(W, 0); x.lineTo(0, H); x.stroke(); x.strokeStyle = "rgba(140,124,100,.2)"; x.lineWidth = 3; x.stroke(); }],
fretted: [2, function (x, W, H) { return __ZC(467, 20, this, arguments, new.target); }],
coffer: [2, function (x, W, H) { x.fillStyle = "#4A3A26"; x.fillRect(0, 0, W, H); for (var i = 0; i < 3; i++)
for (var j = 0; j < 3; j++) {
x.fillStyle = "#2A1E12";
x.fillRect(i * W / 3 + 10, j * H / 3 + 10, W / 3 - 20, H / 3 - 20);
x.fillStyle = "rgba(200,160,80,.35)";
x.fillRect(i * W / 3 + W / 6 - 6, j * H / 3 + H / 6 - 6, 12, 12);
} }],
velvet: [1, function (x, W, H) { for (var i = 0; i < W; i++) {
var v = Math.sin(i / W * Math.PI * 10) * 0.5 + 0.5;
x.fillStyle = "rgb(" + Math.round(70 + v * 60) + "," + Math.round(10 + v * 10) + "," + Math.round(18 + v * 14) + ")";
x.fillRect(i, 0, 1, H);
} poeNz(x, W, H, 800, 0.15, 61); }],
rough: [2, function (x, W, H) { x.fillStyle = "#2E2C28"; x.fillRect(0, 0, W, H); poeNz(x, W, H, 9000, 0.35, 62); poeStain(x, W, H, 16, 63, "20,26,16", 0.5); x.fillStyle = "rgba(200,200,190,.06)"; var R = wRand(64); for (var i = 0; i < 90; i++)
x.fillRect(R() * W, R() * H, 2 + R() * 6, 1 + R() * 3); }],
nitre: [2, function (x, W, H) { return __ZC(467, 21, this, arguments, new.target); }],
bones: [1.6, function (x, W, H) { return __ZC(467, 22, this, arguments, new.target); }]
};
function poeTex(k) { return __ZC(467, 23, this, arguments, new.target); }
function poeS(k, col) {
var key = "s" + k + ":" + (col || 0xFFFFFF);
if (POE.mats[key])
return POE.mats[key];
var m = new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: poeTex(k) });
m.userData.metre = 1;
return (POE.mats[key] = m);
}
function poeC(col) { var k = "c" + col; return POE.mats[k] || (POE.mats[k] = new THREE.MeshLambertMaterial({ color: col })); }
function poeShine(col, r, m) { var k = "m" + col + ":" + r + ":" + m; return POE.mats[k] || (POE.mats[k] = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m })); }
function poeGlowM(col, op) { var k = "g" + col + ":" + (op || 1); return POE.mats[k] || (POE.mats[k] = new THREE.MeshBasicMaterial({ color: col, transparent: op != null && op < 1, opacity: op || 1, fog: true })); }
function poeDS(m) { var k = (m.uuid) + "ds"; if (POE.mats[k])
return POE.mats[k]; var c = m.clone(); c.side = THREE.DoubleSide; return (POE.mats[k] = c); }
function poeBox(P, w, h, d, mat, x, y, z, ry) {
var g = new THREE.BoxGeometry(w, h, d);
if (mat && mat.userData && mat.userData.metre)
metreUVs(g, "box", [w, h, d]);
var m = new THREE.Mesh(g, mat);
m.position.set(x || 0, y || 0, z || 0);
if (ry)
m.rotation.y = ry;
(P || POE.G).add(m);
return m;
}
function poeCyl(P, rt, rb, h, mat, x, y, z, seg, open) {
var g = new THREE.CylinderGeometry(rt, rb, h, seg || (POE.lite ? 8 : 14), 1, !!open);
if (mat && mat.userData && mat.userData.metre)
metreUVs(g, "cyl", [rt, rb, h]);
var m = new THREE.Mesh(g, mat);
m.position.set(x || 0, y || 0, z || 0);
(P || POE.G).add(m);
return m;
}
function poeSph(P, r, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || (POE.lite ? 8 : 14), Math.max(6, ((seg || 14) * 0.7) | 0)), mat); m.position.set(x || 0, y || 0, z || 0); (P || POE.G).add(m); return m; }
function poePlane(P, w, d, mat, x, y, z, ry) {
var g = new THREE.PlaneGeometry(w, d);
g.rotateX(-Math.PI / 2);
if (mat && mat.userData && mat.userData.metre)
metreUVs(g, "pln", [w, d]);
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
if (ry)
m.rotation.y = ry;
P.add(m);
return m;
}
function poeFace(P, w, h, mat, x, y, z, ry) {
var g = new THREE.PlaneGeometry(w, h);
if (mat && mat.userData && mat.userData.metre)
metreUVs(g, "pln", [w, h]);
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
return m;
}
function poeGrp(P, x, y, z, ry) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); if (ry)
g.rotation.y = ry; (P || POE.G).add(g); return g; }
function poePic(P, w, h, fn, x, y, z, ry, key) {
var t = key && POE.tex["pic:" + key];
if (!t) {
t = wTex(256, Math.round(256 * h / w), fn);
if (key)
POE.tex["pic:" + key] = t;
}
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
return m;
}
function poeSolid(x, z, w, d, y0, y1, rot) {
var c = Math.cos(rot || 0), s = Math.sin(rot || 0), hw = Math.abs(w / 2 * c) + Math.abs(d / 2 * s), hd = Math.abs(w / 2 * s) + Math.abs(d / 2 * c);
var S = { x: x, z: z, hw: hw, hd: hd, y0: y0 === undefined ? -5 : y0, y1: y1 === undefined ? 50 : y1 };
POE.solids.push(S);
return S;
}
function poeFloor(x, z, w, d, y, inside) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, inside: !!inside }; POE.floors.push(F); return F; }
function poeSolidAt(x, z, feet) { for (var i = 0; i < POE.solids.length; i++) {
var S = POE.solids[i];
if (!S.off && Math.abs(x - S.x) < S.hw && Math.abs(z - S.z) < S.hd && feet < S.y1 - 0.4 && feet + 1.7 > S.y0)
return true;
} return false; }
function poeFloorAt(x, z, feet) { var best = null; for (var i = 0; i < POE.floors.length; i++) {
var F = POE.floors[i];
if (F.off)
continue;
if (Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd && F.y <= feet + 0.9 && (best === null || F.y > best))
best = F.y;
} return best; }
function poeInsideWalk(x, z) { for (var i = 0; i < POE.floors.length; i++) {
var F = POE.floors[i];
if (F.inside && !F.off && Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd)
return true;
} return false; }
function poeSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; POE.spots.push(S); return S; }
function poeLight(col, k, dist, x, y, z, parent, always) {
if (POE.lite && !always)
return null;
var L = new THREE.PointLight(col, k, dist, 2);
L.position.set(x, y, z);
(parent || POE.G).add(L);
var F = { L: L, k: k, ph: Math.random() * 20 };
POE.lights.push(F);
return F;
}
function poeFlickerTick(dt) { return __ZC(467, 24, this, arguments, new.target); }
function poeFlame(P, x, y, z, s, col) {
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.024 * (s || 1), 0.09 * (s || 1), 6), poeGlowM(col || 0xFFB848));
fl.position.set(x, y, z);
P.add(fl);
var F = { m: fl, s: 1, ph: Math.random() * 9, out: false };
POE.flames.push(F);
return F;
}
function poeCandle(P, x, y, z, h, lit) { h = h || 0.24; poeCyl(P, 0.03, 0.034, h, poeC(0xE8E0C8), x, y + h / 2, z, 8); var F = poeFlame(P, x, y + h + 0.045, z); F.out = lit === false; return F; }
function poeCandelabrum(P, x, y, z, s, light) { return __ZC(467, 25, this, arguments, new.target); }
function poeLamp(P, x, y, z, k) { return __ZC(467, 26, this, arguments, new.target); }
function poeTorch(P, x, y, z, ry, k) { return __ZC(467, 27, this, arguments, new.target); }
var POE_WOOD = 0x2A180E;
function poeChair(P, x, z, ry, col, y, tall) { return __ZC(467, 28, this, arguments, new.target); }
function poeCone(P, r, h, mat, x, y, z) { var m = new THREE.Mesh(new THREE.ConeGeometry(r, h, 8), mat); m.position.set(x, y, z); P.add(m); return m; }
function poeArmchair(P, x, z, ry, col, y) { return __ZC(467, 29, this, arguments, new.target); }
function poeTable(P, x, z, w, d, h, ry, cloth, y) { return __ZC(467, 30, this, arguments, new.target); }
function poeDesk(P, x, z, ry, y) { return __ZC(467, 31, this, arguments, new.target); }
function poeBookcase(P, x, z, w, h, ry, y) { return __ZC(467, 32, this, arguments, new.target); }
function poeBed(P, x, z, ry, curtain, y) { return __ZC(467, 33, this, arguments, new.target); }
function poeFireplace(P, x, z, ry, lit, y) { return __ZC(467, 34, this, arguments, new.target); }
function poeClock(P, x, z, ry, ebony, y) { return __ZC(467, 35, this, arguments, new.target); }
function poeMirror(P, x, y, z, ry, w, h) { var g = poeGrp(P, x, y, z, ry); poeBox(g, w + 0.16, h + 0.16, 0.06, poeShine(0x8A6A2A, 0.35, 0.85), 0, 0, 0); poeFace(g, w, h, poeShine(0x6A7074, 0.05, 1), 0, 0, 0.035, 0); return g; }
function poePainting(P, x, y, z, ry, w, h, fn, key) { var g = poeGrp(P, x, y, z, ry); poeBox(g, w + 0.2, h + 0.2, 0.07, poeShine(0x6A4A1A, 0.4, 0.8), 0, 0, 0); poePic(g, w, h, fn, 0, 0, 0.04, 0, key); return g; }
function poeCurtains(P, x, y, z, ry, w, h, col) { var g = poeGrp(P, x, y, z, ry), m = poeDS(poeS("velvet", col || 0xFFFFFF)); poeFace(g, w * 0.32, h, m, -w * 0.36, 0, 0, 0); poeFace(g, w * 0.32, h, m, w * 0.36, 0, 0, 0); poeBox(g, w + 0.2, 0.06, 0.06, poeShine(0x8A6A2A, 0.4, 0.8), 0, h / 2 + 0.05, 0); return g; }
function poeRug(P, x, z, w, d, col, y) { var r = poePlane(P, w, d, poeS("carpet", col || 0xFFFFFF), x, (y || 0) + 0.012, z); return r; }
function poeCoffin(P, x, y, z, ry, open) { return __ZC(467, 36, this, arguments, new.target); }
function poeCask(P, x, y, z, s, lying) { return __ZC(467, 37, this, arguments, new.target); }
function poeBottle(P, x, y, z, col, lying) {
var g = poeGrp(P, x, y, z), m = poeShine(col || 0x1A3A1A, 0.15, 0.2);
poeCyl(g, 0.04, 0.04, 0.2, m, 0, 0.1, 0, 8);
poeCyl(g, 0.012, 0.04, 0.06, m, 0, 0.23, 0, 8);
poeCyl(g, 0.012, 0.012, 0.06, m, 0, 0.28, 0, 6);
if (lying) {
g.rotation.x = Math.PI / 2;
g.position.y = y + 0.04;
}
return g;
}
function poeWineRack(P, x, z, ry, w, y) { return __ZC(467, 38, this, arguments, new.target); }
function poeSkull(P, x, y, z, ry, s) { return __ZC(467, 39, this, arguments, new.target); }
function poeBonePile(P, x, y, z, n, seed, w) { return __ZC(467, 40, this, arguments, new.target); }
function poeChain(P, x0, y0, z0, x1, y1, z1, n) { return __ZC(467, 41, this, arguments, new.target); }
function poeGothicWin(P, x, y, z, ry, w, h, glass) { return __ZC(467, 42, this, arguments, new.target); }
function poeLeadTex() { return __ZC(467, 43, this, arguments, new.target); }
function poeSashWin(P, x, y, z, ry, w, h, shut) { return __ZC(467, 44, this, arguments, new.target); }
function poeDoorLeaf(P, x, z, ry, w, h, col, arch) { return __ZC(467, 45, this, arguments, new.target); }
function poeBust(P, x, y, z, ry) { return __ZC(467, 46, this, arguments, new.target); }
function poeRaven(P, x, y, z, ry, s) { return __ZC(467, 47, this, arguments, new.target); }
function poeDeadTree(P, x, y, z, s, seed) { return __ZC(467, 48, this, arguments, new.target); }
function poeGrave(P, x, y, z, ry, seed) { return __ZC(467, 49, this, arguments, new.target); }
function poeRock(P, x, y, z, s, seed) { var m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), poeS("rough", 0x9A968E)); m.position.set(x, y + s * 0.3, z); m.rotation.set(seed, seed * 2, seed * 3); m.scale.y = 0.6; P.add(m); return m; }
function poePerson(seed, x, z, ry, o, parent, y) { return __ZC(467, 50, this, arguments, new.target); }
var POE_WEAR = {
gent: { x: { coat: "frock", coatCol: 0x1A1A1E, coatStuff: "cloth", coatTrim: "plain", vest: 0x3A2A22, stock: 0xF4F0E6, collar: "high", tie: "cravat", tieCol: 0x101010, shoes: 0x101010 } },
roderick: { x: { coat: "frock", coatCol: 0x101012, coatStuff: "velvet", coatTrim: "plain", vest: 0x1A1418, stock: 0xF6F4F0, collar: "high", tie: "cravat", tieCol: 0x0A0A0A, shoes: 0x0A0A0A } },
dupin: { x: { coat: "frock", coatCol: 0x24202A, coatStuff: "cloth", coatTrim: "plain", vest: 0x4A3A2A, stock: 0xF0ECE2, collar: "high", tie: "cravat", tieCol: 0x1A1A1A, shoes: 0x141010 } },
oldman: { x: { shirt: 0xE8E2D4, trou: 0xD8D2C4, stock: 0xE8E2D4, collar: "low", tie: "soft", tieCol: 0xE0DACC, shoes: 0x5A4A3A, add: ["oz:apron:half:long:0.2"] } },
police: { x: { coat: "frock", coatCol: 0x1A2238, coatStuff: "cloth", coatTrim: "plain", stock: 0x101010, collar: "high", tie: "soft", tieCol: 0x101010, shoes: 0x101010 } },
servant: { x: { coat: "tails", coatCol: 0x2A2A2E, coatStuff: "cloth", coatTrim: "plain", vest: 0xC8B898, breeches: true, stock: 0xF2EEE6, collar: "high", tie: "soft", shoes: 0x141414 } },
physician: { x: { coat: "frock", coatCol: 0x1E1A16, coatStuff: "cloth", coatTrim: "plain", vest: 0x1E1A16, stock: 0xF2EEE6, collar: "high", tie: "cravat", tieCol: 0x101010, shoes: 0x101010 } },
madeline: { f: 1, x: { dress: 0xF2F0EA, skirt: 0xEEECE4, sl: "long", len: "ankle", flare: 0.12, stuff: "satin", trim: 0xE8E6E0, pelerine: 0xF4F2EC } },
lady: { f: 1, x: { sl: "long", len: "ankle", flare: 0.24, stuff: "satin", pelerine: null } },
poorf: { f: 1, x: { sl: "long", len: "ankle", apron: 0xD8D0C0, stock: 0xE8E2D4, flare: 0.16, pelerine: 0x4A3E3A } },
prince: { x: { coat: "long", coatCol: 0x8A1018, coatStuff: "velvet", coatTrim: "gold", vest: 0xE8C860, vestStuff: "velvet", breeches: true, stock: 0xF8F6F0, collar: "high", tie: "big", tieCol: 0xF8F6F0, shoes: 0x141010 } },
reveller: { x: { coat: "long", coatStuff: "velvet", coatTrim: "gold", vestStuff: "velvet", breeches: true, stock: 0xF8F6F0, collar: "high", tie: "big", tieCol: 0xF8F6F0, shoes: 0x141010 } },
revelf: { f: 1, x: { sl: "puff", len: "ankle", flare: 0.32, stuff: "satin" } },
death: { f: 1, x: { dress: 0xE4E0D4, skirt: 0xDCD8CA, sl: "long", len: "ankle", flare: 0.1, stuff: "cloth", trim: 0xD8D2C4, pelerine: 0xE0DCD0 } },
monk: { f: 1, x: { dress: 0x0E0C0E, skirt: 0x0C0A0C, sl: "long", len: "ankle", flare: 0.14, stuff: "cloth", trim: 0x141214, pelerine: 0x0E0C0E } },
french: { x: { coat: "military", coatCol: 0x1E2E6A, breeches: true, trou: 0xF0ECE2, stock: 0x141414, shoes: 0x141414, add: ["oz:sash"] } },
montresor: { x: { coat: "long", coatCol: 0x0A0A0C, coatStuff: "velvet", coatTrim: "plain", vest: 0x141418, breeches: true, trou: 0x0E0E10, stock: 0x101010, collar: "high", tie: "soft", tieCol: 0x0A0A0A, shoes: 0x0A0A0A } },
fortunato: { x: { coat: "jacket", coatCol: 0xC81E22, coatStuff: "satin", coatTrim: "gold", vest: 0xE8C030, breeches: true, trou: 0x1E5A2A, stock: 0xE8C030, collar: "low", tie: "soft", tieCol: 0x1E5A2A, shoes: 0x2A1A0E } },
carnival: { x: { coat: "long", coatStuff: "satin", coatTrim: "gold", breeches: true, stock: 0xF2EEE6, collar: "high", tie: "big", shoes: 0x141010 } },
carnf: { f: 1, x: { sl: "puff", len: "ankle", flare: 0.3, stuff: "satin" } },
sailor: { x: { coat: "jacket", coatCol: 0x1A2238, coatStuff: "cloth", coatTrim: "plain", shirt: 0xE8E4DA, trou: 0x2A3044, stock: 0x101010, collar: "low", tie: "soft", tieCol: 0x101010, shoes: 0x101010 } },
gendarme: { x: { coat: "military", coatCol: 0x1A2448, breeches: false, trou: 0x1A2448, stock: 0x101010, shoes: 0x101010 } },
workman: { x: { shirt: 0xD8D2C4, vest: 0x4A3A2A, trou: 0x5A4A3A, stock: 0xD8D2C4, collar: "low", tie: "soft", tieCol: 0x3A2A1A, shoes: 0x2A1E14 } }
};
var POE_ROLE = [
[/^Roderick Usher$/, "roderick"], [/^The Lady Madeline$/, "madeline"], [/^The valet$|^A servant|^The waiter$|footman/, "servant"], [/^The family physician$/, "physician"],
[/^The old man$/, "oldman"], [/^(An officer|The officers?|A police officer)/, "police"],
[/^Prince Prospero$/, "prince"], [/^The masked figure$/, "death"],
[/^An inquisitor|^A judge|^A familiar|^The black-robed/, "monk"], [/^General Lasalle$|^A French (soldier|officer)/, "french"],
[/^Montresor$/, "montresor"], [/^Fortunato$/, "fortunato"], [/^A reveller|^A masker/, "carnival"],
[/^C\. Auguste Dupin$/, "dupin"], [/^The sailor$/, "sailor"], [/^A gendarme|^The gendarme/, "gendarme"], [/^Monsieur G-|^The Prefect/, "gent"],
[/neighbour$|^The landlady$|^Madame|^A woman/, "poorf"], [/^A workman|^The baker|^The carter/, "workman"]
];
function poeRoleOf(name, sex) { name = name || ""; for (var i = 0; i < POE_ROLE.length; i++)
if (POE_ROLE[i][0].test(name))
return POE_ROLE[i][1]; return sex === "f" ? "lady" : "gent"; }
function poeWearFor(L, o) { return __ZC(467, 51, this, arguments, new.target); }
function poeWM(col, o) { return typeof wdrMat === "function" ? wdrMat(col, o) : new THREE.MeshStandardMaterial({ color: col }); }
function poeTopHat(col) { var g = new THREE.Group(), m = poeWM(col || 0x0E0E10, { r: 0.55 }); g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.014, 22), m)); var c = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.21, 20), m); c.position.y = 0.105; g.add(c); return g; }
function poeHalfMask(col, gold) { return __ZC(467, 52, this, arguments, new.target); }
function poeProps(add, c, E) { return __ZC(467, 53, this, arguments, new.target); }
(function () {
if (typeof WDR_COST === "undefined" || typeof OZ_WEAR === "undefined")
return;
WDR_COST.oz_poe = { rb: 1, look: { hat: "none", role: "" }, ozKey: "poe", props: function (add, c, E) { try {
poeProps(add, c, E);
}
catch (e) {
if (window.console)
console.warn("[poe] props", e);
} } };
OZ_WEAR.oz_poe = function (L, o) { return poeWearFor(L, o); };
})();
function poeSmooth(d, r) { if (d >= r)
return 0; var t = 1 - d / r; return t * t * (3 - 2 * t); }
function poeSegD(x, z, ax, az, bx, bz) { var dx = bx - ax, dz = bz - az, t = ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1); t = Math.max(0, Math.min(1, t)); return Math.hypot(x - (ax + dx * t), z - (az + dz * t)); }
function poePathD(x, z, P) { var b = 1e9; for (var i = 0; i < P.length - 1; i++)
b = Math.min(b, poeSegD(x, z, P[i][0], P[i][1], P[i + 1][0], P[i + 1][1])); return b; }
function poeRoadD(x, z) { var b = 1e9; for (var i = 0; i < POE_ROADS.length; i++)
b = Math.min(b, poePathD(x, z, POE_ROADS[i])); return b; }
var POE_FLATS = [[0, 540, 70], [0, 0, 90], [760, -660, 90], [1000, 260, 120], [0, -1020, 180], [-980, 160, 110], [-740, 780, 120], [430, 1060, 170], [600, 1170, 80], [470, 1175, 90]];
function poeTarnIn(x, z) { var T = POE_AT.usher.tarn, u = (x - T.x) / T.rx, v = (z - T.z) / T.rz; return u * u + v * v; }
function poeLand(x, z) { return __ZC(467, 54, this, arguments, new.target); }
var POE_WATER = -1.15;
function poeGround(x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet, fl = poeFloorAt(x, z, f);
if (x >= POE_IN_X - 1000)
return fl === null ? 0 : fl;
var g = poeLand(x, z);
return fl !== null && fl > g ? fl : g;
}
function poeTerrain(G) { return __ZC(467, 55, this, arguments, new.target); }
function poeSky(G) { return __ZC(467, 56, this, arguments, new.target); }
var POE_ENV = {
land: { top: 0x020204, low: 0x121218, fog: 0x121218, fogD: 0.0042, sun: 0.55, sunCol: 0xA8B0C8, sunDir: [0.7, 0.55, 0.35], hemi: 0.6, hemiCol: 0x5A5E78, hemiGround: 0x14120E, stars: 0.05 },
usher: { top: 0x010102, low: 0x0C0E10, fog: 0x0C0E10, fogD: 0.0036, sun: 0.6, sunCol: 0xA0A4BC, sunDir: [0.7, 0.55, 0.35], hemi: 0.46, hemiCol: 0x4A4E62, hemiGround: 0x0E0C0A, stars: 0 },
red: { top: 0x080204, low: 0x160A0A, fog: 0x160A0A, fogD: 0.0042, sun: 0.5, sunCol: 0xB89A9A, sunDir: [0.7, 0.55, 0.35], hemi: 0.55, hemiCol: 0x6A4A50, hemiGround: 0x140C0A, stars: 0 },
town: { top: 0x030306, low: 0x16161C, fog: 0x16161C, fogD: 0.004, sun: 0.5, sunCol: 0xA8B0C8, sunDir: [0.7, 0.55, 0.35], hemi: 0.62, hemiCol: 0x6A6A80, hemiGround: 0x1A1612, stars: 0.1 },
inside: { top: 0x000000, low: 0x000000, fog: 0x000000, fogD: 0.03, sun: 0.0, sunCol: 0x6A7AA0, sunDir: [0.3, 0.8, 0.2], hemi: 0.2, hemiCol: 0x8A8070, hemiGround: 0x0E0A08, stars: 0 },
black: { top: 0x000000, low: 0x000000, fog: 0x000000, fogD: 0.2, sun: 0, sunCol: 0x000000, sunDir: [0.3, 0.8, 0.2], hemi: 0.004, hemiCol: 0x404040, hemiGround: 0x000000, stars: 0 }
};
function poeEnvNow(dt) { return __ZC(467, 57, this, arguments, new.target); }
function poeStormTick(dt) { return __ZC(467, 58, this, arguments, new.target); }
function poeRainTick(dt) { return __ZC(467, 59, this, arguments, new.target); }
function poeThrone(G) { return __ZC(467, 60, this, arguments, new.target); }
function poeWilds(G) { return __ZC(467, 61, this, arguments, new.target); }
function poeLampTick() { return __ZC(467, 62, this, arguments, new.target); }
POE.exits = {};
function poeWinTex(kind, lit) { return __ZC(467, 63, this, arguments, new.target); }
function poeWinMat(kind, lit) { var k = "wm:" + kind + ":" + (lit ? 1 : 0); return POE.mats[k] || (POE.mats[k] = lit ? new THREE.MeshBasicMaterial({ map: poeWinTex(kind, true), fog: true }) : new THREE.MeshLambertMaterial({ map: poeWinTex(kind, false), emissive: 0x05070A })); }
function poeWin(P, x, y, z, ry, w, h, kind, lit, sill) { var m = poeFace(P, w, h, poeWinMat(kind || "sash", lit), x, y, z, ry); if (sill !== false) {
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
poeBox(P, w + 0.2, 0.1, 0.22, sill || poeC(0x8A8478), x + s * 0.08, y - h / 2 - 0.05, z + c * 0.08, ry);
} return m; }
function poeRoof(P, w, d, h, y, mat) { return __ZC(467, 64, this, arguments, new.target); }
function poeBuilding(G, o) { return __ZC(467, 65, this, arguments, new.target); }
function poeStreetLamp(P, x, z, y) { return __ZC(467, 66, this, arguments, new.target); }
function poeRavenHouse(G) { return __ZC(467, 67, this, arguments, new.target); }
function poeUsherOut(G) { return __ZC(467, 68, this, arguments, new.target); }
function poeHeartStreet(G) { return __ZC(467, 69, this, arguments, new.target); }
function poeAbbeyOut(G) { return __ZC(467, 70, this, arguments, new.target); }
function poeToledoOut(G) { return __ZC(467, 71, this, arguments, new.target); }
function poeCarnivalOut(G) { return __ZC(467, 72, this, arguments, new.target); }
function poeParisOut(G) { return __ZC(467, 73, this, arguments, new.target); }
var POE_RB = {};
function poeDoorPos(R, D) {
var w = R.w, d = R.d, s = D[0], o = D[1];
if (s === "n")
return { x: o, z: -d / 2, ry: 0, nx: 0, nz: 1 };
if (s === "s")
return { x: o, z: d / 2, ry: Math.PI, nx: 0, nz: -1 };
if (s === "e")
return { x: w / 2, z: o, ry: -Math.PI / 2, nx: -1, nz: 0 };
return { x: -w / 2, z: o, ry: Math.PI / 2, nx: 1, nz: 0 };
}
var POE_WALL_COL = { damask: 0xFFFFFF, gothic: 0xA8A098, panel: 0xFFFFFF, books: 0xFFFFFF, tapestry: 0xFFFFFF, stone: 0xB0A8A0, copper: 0xFFFFFF, oldpaper: 0xFFFFFF, sprig: 0xFFFFFF, plaster: 0xFFFFFF, whitewash: 0xFFFFFF, blackcloth: 0xFFFFFF, fresco: 0xFFFFFF, mirror: 0xFFFFFF, stripe: 0xFFFFFF, brick: 0xFFFFFF };
function poeShell(R, g) { return __ZC(467, 74, this, arguments, new.target); }
function poeDoorUse(R, D) { return __ZC(467, 75, this, arguments, new.target); }
function poeLeaveAsk(to, why) { return __ZC(467, 76, this, arguments, new.target); }
function poeLockDoor(k, to, msg) { var R = POE_RX[k]; if (!R)
return; R.locked = R.locked || {}; if (msg)
R.locked[to] = msg;
else
delete R.locked[to]; }
function poeRoomGet(k) { return __ZC(467, 77, this, arguments, new.target); }
function poeVeil(sec, mid, hold) { return __ZC(467, 78, this, arguments, new.target); }
function poeShowOnly(R) {
if (!POE.G)
return;
POE.G.children.forEach(function (o) { if (o.userData.room)
o.visible = !!R && o === R.g;
else if (o.userData.item || o.userData.keepVis || o.isLight)
return;
else
o.visible = !R; });
}
function poeEnterRoom(k, from, at) { return __ZC(467, 79, this, arguments, new.target); }
function poeOutside(to, at) { return __ZC(467, 80, this, arguments, new.target); }
function poeTrig(R, x, z, r, fn) { (R.trig || (R.trig = [])).push({ x: R.x + x, z: z, r: r, fn: fn, done: false }); }
function poeTrigTick() {
var R = POE.room;
if (!R || !R.trig)
return;
var L = worldLocal();
R.trig.forEach(function (T) { if (T.done)
return; if (Math.hypot(L.x - T.x, L.z - T.z) < T.r) {
T.done = true;
try {
T.fn();
}
catch (e) { }
} });
}
function poeRoomPerson(R, seed, x, z, ry, o) { var P = poePerson(seed, x, z, ry, o, R.g, 0); P.ox = R.x; P.room = R; return P; }
var POE_AU = { loops: {}, heart: null };
function poeAcOk() { return typeof shnAc === "function" && typeof shnTone === "function" && typeof shnNoiseHit === "function"; }
function poeSfx(kind, o) { return __ZC(467, 81, this, arguments, new.target); }
var POE_CH = [];
var POEB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, t: 0, wt: 0, got: 0, still: 0, puz: null };
function poeBS() { if (!store.poebook)
store.poebook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0 }; var S = store.poebook; S.f = S.f || {}; S.keeps = S.keeps || []; return S; }
function poeSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function poeStep() { var S = poeBS(), C = POE_CH[S.ch]; return C ? C.steps[S.s] : null; }
function poeActive() { var S = poeBS(); return !!(S.started && !S.done && !S.paused && WLD.on === POE_KEY); }
function poeKey() { var S = poeBS(); return S.done ? "done" : S.ch + "." + S.s; }
function poeEsc(t) { return String(t).replace(/[&<>]/g, function (c) { return c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"; }); }
function poeAreaNow() { return POE.room && !POE.room.city ? "room:" + POE.room.k : "out"; }
function poeNamed(list, name, room) { return __ZC(467, 82, this, arguments, new.target); }
function poeRoomAtX(x) { var best = null, bd = 1e9; for (var k in POE_RX) {
var R = POE_RX[k];
if (R.city)
continue;
var d = Math.abs(x - R.x);
if (d < bd && d < 160) {
bd = d;
best = k;
}
} return best; }
function poePos(at) { return __ZC(467, 83, this, arguments, new.target); }
function poeDist(P, L) { return Math.hypot(P.x - L.x, P.z - L.z); }
function poeRoomDoorOut(k) { return __ZC(467, 84, this, arguments, new.target); }
function poeRoomWay(fromK, toK) { return __ZC(467, 85, this, arguments, new.target); }
function poeWay(P, L) { return __ZC(467, 86, this, arguments, new.target); }
function poeBeam() { return __ZC(467, 87, this, arguments, new.target); }
function poeItemMesh(kind) { return __ZC(467, 88, this, arguments, new.target); }
function poeItemsClear() { POEB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = POE.spots.indexOf(I.S); if (j >= 0)
POE.spots.splice(j, 1); }); POEB.items = []; }
function poeItemAdd(kind, P, name, verb, onTake) { return __ZC(467, 89, this, arguments, new.target); }
function poeTune(k) { return __ZC(467, 90, this, arguments, new.target); }
var POE_TXT = { data: null, wait: [] };
function poeTextLoad(fn) { return __ZC(467, 91, this, arguments, new.target); }
function poeTaleText(key) { return __ZC(467, 92, this, arguments, new.target); }
var POE_WORKS = { data: null, wait: [] };
function poeWorksLoad(fn) { return __ZC(467, 93, this, arguments, new.target); }
var POE_VOLS = ["I: the Gold-Bug, the Rue Morgue, Marie Rogêt", "II: Usher, the Red Death, the Pit, the Black Cat", "III: Arthur Gordon Pym, Ligeia, Morella", "IV: the Belfry, Metzengerstein, the comic tales", "V: Hop-Frog, the essays, and all the poems"];
function poeShelf(vol) { return __ZC(467, 94, this, arguments, new.target); }
function poeWorkRead(i, page, vol) { return __ZC(467, 95, this, arguments, new.target); }
function poeCard(title, html, btns) { return __ZC(467, 96, this, arguments, new.target); }
function poeChapterCard() { return __ZC(467, 97, this, arguments, new.target); }
function poeKeeperBtns(fns) { return __ZC(467, 98, this, arguments, new.target); }
function poeJump(i) { var S = poeBS(); S.ch = Math.max(0, Math.min(POE_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; poeSave(); poeChapterBegin(true); }
function poeChapterBegin(place) { return __ZC(467, 99, this, arguments, new.target); }
function poePlaceAt(st) { return __ZC(467, 100, this, arguments, new.target); }
function poeStepBegin() { return __ZC(467, 101, this, arguments, new.target); }
function poeSay(h) { setStatus(h); }
function poeStepDone() { return __ZC(467, 102, this, arguments, new.target); }
function poeFinish() { return __ZC(467, 103, this, arguments, new.target); }
function poeOpen() { return __ZC(467, 104, this, arguments, new.target); }
function poeBegin() {
var S = poeBS();
S.started = 1;
poeSave();
if (WLD.on !== POE_KEY) {
POEB.pending = 1;
poeGo({ book: 1 });
return;
}
poeChapterBegin(true);
}
function poePutDown(walkOut, then) { return __ZC(467, 105, this, arguments, new.target); }
function poeToParisGate() { return __ZC(467, 106, this, arguments, new.target); }
function pRead() { return { k: "read" }; }
function pGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function pTalk(who, h, card, at, o) { return Object.assign({ k: "talk", who: who, at: Object.assign({ who: who }, at || {}), h: h, card: card }, o || {}); }
function pSpot(spot, h, at, o) { return Object.assign({ k: "spot", spot: spot, at: Object.assign({ spot: spot }, at || {}), h: h }, o || {}); }
function pHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function pStill(sec, h, o) { return Object.assign({ k: "still", sec: sec, h: h }, o || {}); }
function pFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function pGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function pCard(title, html, btn, o) { return Object.assign({ k: "card", card: [title, html, btn] }, o || {}); }
function pAsk(title, html, choices, o) { return Object.assign({ k: "card", card: [title, html], choices: choices }, o || {}); }
function pPuz(h, start, o) { return Object.assign({ k: "puzzle", h: h, start: start }, o || {}); }
function pUntil(h, test, at, o) { return Object.assign({ k: "until", h: h, test: test, at: at }, o || {}); }
function poeZoneAt(x, z) { return __ZC(467, 107, this, arguments, new.target); }
var POE_ZONE_NAME = { usher: "The House of Usher", masque: "The abbey of Prince Prospero", heart: "The old man's street", pit: "Toledo, 1808", cask: "The carnival", morgue: "The Barrière (the road into Paris)", throne: "The black throne of NIGHT", land: "Dream-Land", inside: "" };
function poeBlock(x, z, feet) { return __ZC(467, 108, this, arguments, new.target); }
function poeBuild(G) { return __ZC(467, 109, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef(POE_KEY, {
base: POE.base, far: 3200, ownSky: true, tone: 150,
env: function (dt) { return poeEnvNow(dt); },
build: function (G) { poeBuild(G); },
enter: function (opt) { return __ZC(467, 110, this, arguments, new.target); },
leave: function () { POE.moving = false; POE.lock = null; POE.black = false; if (POE.veil)
POE.veil.style.opacity = "0"; poeTune(null); poeItemsClear(); poeSfx("heartoff"); poeSfx("rainoff"); poeSfx("windoff"); POE.sfxRain = false; if (POEB.beam)
POEB.beam.visible = false; if (POE.onLeave)
try {
POE.onLeave();
}
catch (e) { } },
ground: function (x, z, feet) { if (POE.lock && POE.lock.y != null)
return POE.lock.y; return poeGround(x, z, feet); },
block: function (x, z, feet) { return poeBlock(x, z, feet); },
tick: function (dt) { poeTick(dt); },
back: function () { poeHome(); }
});
function poeHome() { worldHome("<b>Back from " + POE_NAME + ".</b> <i>\"Quoth the Raven, 'Nevermore.'\"</i>"); }
function poeGo(opt) { return worldGo(POE_KEY, opt || {}); }
function poeTick(dt) { return __ZC(467, 111, this, arguments, new.target); }
function poeTalkUse(T) { return __ZC(467, 112, this, arguments, new.target); }
function poeSpotUse(S) {
var r;
if (S.fn)
r = S.fn();
var b = poeActive() && poeStep();
if (b && b.k === "spot" && !S.book) {
var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot;
if (ok) {
var k = poeKey();
setTimeout(function () { if (poeKey() === k)
poeStepDone(); }, b.wait || (window.POE_FAST ? 20 : 350));
}
}
return r;
}
function poeAnimTick(dt) {
var t = POE.t;
for (var i = POE.anim.length - 1; i >= 0; i--) {
var A = POE.anim[i];
try {
if (A.k === "pend") {
A.g.rotation.z = Math.sin(t * A.sp) * A.a;
}
else if (A.k === "fn") {
if (A.fn(dt, t) === false)
POE.anim.splice(i, 1);
}
}
catch (e) {
POE.anim.splice(i, 1);
if (window.console)
console.warn("[poe] anim", e);
}
}
}
function poeEvery(fn) { var A = { k: "fn", fn: fn }; POE.anim.push(A); return A; }
function poeStop(A) { var i = POE.anim.indexOf(A); if (i >= 0)
POE.anim.splice(i, 1); }
function poeBookTick(dt) { return __ZC(467, 113, this, arguments, new.target); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(POE_KEY) < 0)
WLG.keys.push(POE_KEY);
function poeForget() { return __ZC(467, 114, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === POE_KEY)
poeForget(); return r; }; })();
POE_RB.chamber = function (R, g) { return __ZC(467, 115, this, arguments, new.target); };
function poeArmour(P, x, z, ry) { return __ZC(467, 116, this, arguments, new.target); }
function poeTrophy(P, x, y, z, ry) { return __ZC(467, 117, this, arguments, new.target); }
POE_RB.u_hall = function (R, g) { return __ZC(467, 118, this, arguments, new.target); };
POE_RB.u_studio = function (R, g) { return __ZC(467, 119, this, arguments, new.target); };
POE_RB.u_library = function (R, g) { return __ZC(467, 120, this, arguments, new.target); };
POE_RB.u_chamber = function (R, g) { return __ZC(467, 121, this, arguments, new.target); };
POE_RB.u_passage = function (R, g) { return __ZC(467, 122, this, arguments, new.target); };
POE_RB.u_vault = function (R, g) { return __ZC(467, 123, this, arguments, new.target); };
function poeCell(R, g, cx, cz, w, d, h, wm, fm, cm, open) { return __ZC(467, 124, this, arguments, new.target); }
function poePass(R, x, z, w, d) { poeFloor(R.x + x, z, w, d, 0, true); }
POE_RB.t_house = function (R, g) { return __ZC(467, 125, this, arguments, new.target); };
POE_RB.t_mine = function (R, g) { return __ZC(467, 126, this, arguments, new.target); };
POE_RB.t_room = function (R, g) { return __ZC(467, 127, this, arguments, new.target); };
function poeParlour(R, g, seed, fire) { return __ZC(467, 128, this, arguments, new.target); }
POE_RB.t_neigh = function (R, g) { return __ZC(467, 129, this, arguments, new.target); };
POE_RB.t_police = function (R, g) { return __ZC(467, 130, this, arguments, new.target); };
POE_RB.t_tavern = function (R, g) { return __ZC(467, 131, this, arguments, new.target); };
POE_RB.t_lodge = function (R, g) { poeParlour(R, g, 9, "embers"); poeBed(g, -R.w / 2 + 1.3, R.d / 2 - 1.6, Math.PI / 2, null); poeSolid(R.x - R.w / 2 + 1.3, R.d / 2 - 1.6, 2.4, 1.8, -1, 2.6); };
var POE_MASQ = [[0x2A4AD8, "blue"], [0x7A2AB8, "purple"], [0x2AA84A, "green"], [0xE87A1A, "orange"], [0xF2F2F0, "white"], [0x9A4AE8, "violet"], [0x0A0808, "black"]];
POE_RB.m_hall = function (R, g) { return __ZC(467, 132, this, arguments, new.target); };
POE_RB.m_suite = function (R, g) { return __ZC(467, 133, this, arguments, new.target); };
function poeSuiteCell(R, lx) { var best = 0, bd = 1e9; R.cells.forEach(function (C, i) { var d = Math.abs(lx - C.x); if (d < bd) {
bd = d;
best = i;
} }); return best; }
function poeSuiteTick(dt) { return __ZC(467, 134, this, arguments, new.target); }
POE_RB.m_cot = function (R, g) { return __ZC(467, 135, this, arguments, new.target); };
function poeTunnel(R, g, x, z, w, d, h, wm, fm, alongX) { return __ZC(467, 136, this, arguments, new.target); }
POE_RB.p_court = function (R, g) { return __ZC(467, 137, this, arguments, new.target); };
POE_RB.p_inn = function (R, g) { return __ZC(467, 138, this, arguments, new.target); };
POE_RB.p_dungeon = function (R, g) { return __ZC(467, 139, this, arguments, new.target); };
function poeDungeonTick(dt) { return __ZC(467, 140, this, arguments, new.target); }
POE_RB.c_hall = function (R, g) { return __ZC(467, 141, this, arguments, new.target); };
POE_RB.c_wine = function (R, g) { return __ZC(467, 142, this, arguments, new.target); };
POE_RB.c_vaults = function (R, g) { return __ZC(467, 143, this, arguments, new.target); };
function poeVaultCell(R, lx) { var best = 0, bd = 1e9; R.cells.forEach(function (C, i) { var d = Math.abs(lx - C.x); if (d < bd) {
bd = d;
best = i;
} }); return best; }
function poeVaultTick(dt) { return __ZC(467, 144, this, arguments, new.target); }
POE_RB.r_dupin = function (R, g) { return __ZC(467, 145, this, arguments, new.target); };
POE_RB.r_house = function (R, g) { return __ZC(467, 146, this, arguments, new.target); };
POE_RB.r_room = function (R, g) { return __ZC(467, 147, this, arguments, new.target); };
POE_RB.r_back = function (R, g) { return __ZC(467, 148, this, arguments, new.target); };
POE_RB.r_cafe = function (R, g) { return __ZC(467, 149, this, arguments, new.target); };
POE_RB.r_pref = function (R, g) { return __ZC(467, 150, this, arguments, new.target); };
POE_RB.r_shop = function (R, g) { return __ZC(467, 151, this, arguments, new.target); };
POE_TEX.catstone = [2, function (x, W, H) { return __ZC(467, 152, this, arguments, new.target); }];
POE_TEX.catfloor = [2, function (x, W, H) { x.fillStyle = "#6E6450"; x.fillRect(0, 0, W, H); poeNz(x, W, H, 12000, 0.3, 175); poeNz(x, W, H, 5000, 0.2, 176, "200,186,150"); poeStain(x, W, H, 14, 177, "26,20,12", 0.4); }];
POE_TEX.catbones = [2, function (x, W, H) { return __ZC(467, 153, this, arguments, new.target); }];
var POE_CAT_FIG = [
["A virgin, and serpents swallowing her up", "upon the first of the seventh leaves"],
["A cross, where a serpent was crucified", "upon the second seventh leaf"],
["Deserts, in the midst whereof ran many fair fountains, from whence there issued out a number of serpents, which ran up and down here and there", "upon the last seventh leaf"],
["A young man with wings at his ankles, a rod in his hand writhen about with two serpents; and against him, running and flying with open wings, a great old man with an hour-glass upon his head and a scythe in his hands", "upon the fourth leaf"],
["A fair flower on the top of a very high mountain, sore shaken with the north wind; its foot blue, its flowers white and red, its leaves shining like fine gold; and round about it the dragons and griffons of the north made their nests", "upon the other side of the fourth leaf"],
["A fair rose-tree flowered in the midst of a sweet garden, climbing up against a hollow oak; at the foot whereof boiled a fountain of most white water", "upon the fifth leaf"],
["A king with a great falchion, who made to be killed in his presence by soldiers a great multitude of little infants; whose blood was put in a great vessel, wherein the Sun and the Moon came to bathe themselves", "upon the other side of the fifth leaf"]
];
function poeBatch() { return __ZC(467, 154, this, arguments, new.target); }
function poeCatMat(k, col, rep) { var key = "cat" + k + col; if (POE.mats[key])
return POE.mats[key]; var t = poeTex(k).clone(); t.needsUpdate = true; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 1); var m = new THREE.MeshLambertMaterial({ map: t, color: col }); POE.mats[key] = m; POE.mats[key + "t"] = t; return m; }
function poeCatFigPic(i) { return __ZC(467, 155, this, arguments, new.target); }
POE_TEX.catrock = [2, function (x, W, H) { return __ZC(467, 156, this, arguments, new.target); }];
var POE_GRS = { T: 500, X0: -4000, Z0: -3600, NX: 7000, NZ: 6000, CX: -1000, CZ: -1200, CH: 32, has: {}, data: {}, loading: {}, used: {}, chunks: {}, blk: {}, stamp: 0 };
var POE_GRS_D = { "stairs": [[-303, 215, "Barrière d’Enfer", 1], [1470, 456, "Gobelins", 1], [-252, -562, "Luxembourg", 1], [-3377, -3084, "Chaillot", 1], [288, 237, "Faubourg Saint-Jacques", 1], [1693, -101, "Salpêtrière", 1], [450, -506, "Val-de-Grâce", 1], [-683, -225, "Mont-Parnasse", 1], [-353, -1240, "Rue de Vaugirard", 1], [-1708, -688, "Barrière de Vaugirard", 1], [-3089, -3303, "Chaillot", 2], [-3499, -2882, "Chaillot", 3], [-1150, -622, "Notre-Dame-des-Champs", 1], [253, -844, "Panthéon", 1], [-2976, -3373, "Chaillot", 4], [-3258, -3226, "Chaillot", 5], [1368, 113, "Gobelins", 2], [-3159, -3102, "Chaillot", 6], [902, -466, "Rue Mouffetard", 1], [445, -340, "Val-de-Grâce", 2], [1309, 188, "Gobelins", 3], [-2898, -3537, "Chaillot", 7], [-111, -713, "Luxembourg", 2], [692, -432, "Rue Mouffetard", 2], [1294, 61, "Gobelins", 4], [779, -620, "Rue Mouffetard", 3], [37, -1496, "Odéon", 1], [1232, 173, "Gobelins", 5], [1443, -871, "Jardin des Plantes", 1], [-755, -1420, "Rue de Vaugirard", 2], [197, 482, "Faubourg Saint-Jacques", 2], [-685, -1203, "Rue de Vaugirard", 3], [-402, -804, "Luxembourg", 3], [1462, -200, "Saint-Marcel", 1], [-414, -1440, "Rue de Vaugirard", 4], [1354, -771, "Jardin des Plantes", 2], [1409, -560, "Saint-Marcel", 2], [-154, -846, "Luxembourg", 4], [-2864, -3394, "Chaillot", 8], [-3047, 638, "Rue de Dantzig", 1], [-2882, 658, "Rue de Dantzig", 2], [-2931, 551, "Rue de Dantzig", 3], [-2935, 758, "Rue de Dantzig", 4], [-3001, 618, "Rue de Dantzig", 5], [-2837, 581, "Rue de Dantzig", 6], [-373, 1415, "Montsouris", 1], [-192, 1267, "Montsouris", 2], [1796, 841, "Avenue d’Italie", 1], [-1227, 1388, "Porte d’Orléans", 1], [-359, 1263, "Montsouris", 3], [1640, 1012, "Avenue d’Italie", 2], [1437, 975, "Avenue d’Italie", 3]], "st": { "A": [-355, 820], "P": [-247, 713], "S": [-330, 756], "X": [-476, 879], "B": [-264, 725], "I": [-347, 797], "G": [-291, 832], "C": [-289, 794], "L": [-325, 863], "T": [-268, 859] }, "F": [383, 15], "fig": [[372, -412], [-329, -565], [-652, -372], [1509, 301], [-217, 76], [-3275, -3084], [1721, 31]], "H": [-56, -722], "K": [-286, -818], "tiles": [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [6, 4], [7, 4], [8, 4], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [6, 7], [7, 7], [8, 7], [10, 7], [11, 7], [1, 8], [2, 8], [7, 8], [8, 8], [10, 8], [11, 8], [12, 8], [5, 9], [6, 9], [7, 9], [8, 9], [10, 9], [11, 9], [12, 9], [5, 10], [6, 10], [7, 10], [8, 10], [12, 10]] };
POE_GRS_D.tiles.forEach(function (t) { POE_GRS.has[t[0] + "_" + t[1]] = 1; });
var POE_GRS_NAMES = [["the Porte d’Orléans", -795, 1480], ["the Boulevard Brune", -1050, 1440], ["the Parc de Montsouris", 150, 1300], ["the reservoir of Montsouris", -80, 1180], ["the Boulevard Jourdan", -200, 1560], ["the Avenue d’Italie", 1500, 950], ["the Avenue de Choisy", 1750, 1000], ["the Rue Nationale", 2130, 900], ["the Rue de Tolbiac", 2202, 1052], ["the Avenue d’Ivry", 1900, 1250], ["the Rue de Dantzig", -2945, 595], ["the Salle des Fourrages militaires", -3059, 535], ["Le Frigo", -3099, 571], ["La Douve", -3074, 619], ["the Salle des Noms", -2996, 562], ["the Salle des Tapisseries", -3064, 577], ["La Crypte", -3068, 733], ["the Réserve de bombes", -3043, 710], ["the gallery Tourne-en-rond", -3081, 640], ["the Boulevard Lefebvre", -2960, 720], ["the Barrière d’Enfer", -305, 220], ["the Boulevard Saint-Jacques", -130, 310], ["the Boulevard d’Enfer", -380, -150], ["the Observatory", -20, 60], ["the Cimetière du Sud (Mont-Parnasse)", -750, -310], ["the Marché aux Fourrages", -570, -480], ["the Boulevard du Mont-Parnasse", -275, -490], ["the Hospice des Enfants-Assistés", -200, -120], ["the Rue de la Gaîté", -900, -550],
["the Rue d’Enfer", 129, -468], ["the Rue Saint-Jacques", 320, -485], ["the Val-de-Grâce", 390, -470], ["the Hôpital militaire du Val-de-Grâce", 530, -310], ["the Maison d’Accouchement", 100, -205], ["the Place des Capucins", 360, -200], ["the Rue des Bourguignons", 700, -110], ["the Rue Mouffetard", 980, -510], ["the École de Pharmacie", 840, -380], ["the Rue de Lourcine", 820, -290], ["the Rue Pascal", 900, -140],
["the Marché aux Chevaux", 1590, -280], ["the Boulevard de l’Hôpital", 1830, -250], ["the Place Scipion", 1250, -250], ["the Rue Geoffroy-Saint-Hilaire", 1450, -480], ["the Hospice de la Vieillesse (the Salpêtrière)", 1920, -210], ["the Place de la Collégiale", 1170, -10], ["the Rue des Fossés-Saint-Marcel", 1420, -160], ["the Jardin des Plantes", 1450, -850],
["the Faubourg Saint-Jacques", 150, 150], ["the Boulevard de la Glacière", 600, 480], ["the Gobelins", 1300, 350], ["the Barrière d’Italie", 1770, 590], ["the Boulevard des Gobelins", 1450, 450],
["the Jardin du Luxembourg", -200, -1000], ["the Chartreux", -290, -820], ["the Rue de Vaugirard", -500, -1350], ["the Rue Notre-Dame-des-Champs", -650, -900], ["the Panthéon", 700, -1050], ["the Rue Soufflot", 450, -1100], ["the Sourds-Muets", 150, -760], ["the Rue des Ursulines", 300, -720], ["the Odéon", 150, -1500], ["the Barrière de Vaugirard", -1750, -650],
["the village of Chaillot", -3300, -3000], ["the Quai de Billy", -3300, -2600], ["the Boulevard de Longchamp", -3650, -2800], ["the reservoirs of Chaillot", -3050, -3500],
["the aqueduct of Arcueil", -290, 560], ["the Tombe-Issoire", -200, 800], ["the ossuary", -320, 820], ["Port-Mahon", -248, 713]];
function poeGrsLoad(tx, tz) { return __ZC(467, 157, this, arguments, new.target); }
function poeGrsT(sx, sz) { var G = POE_GRS, ix = Math.floor(sx) - G.X0, iz = Math.floor(sz) - G.Z0; if (ix < 0 || iz < 0 || ix >= G.NX || iz >= G.NZ)
return 0; var tx = (ix / G.T) | 0, tz = (iz / G.T) | 0, k = tx + "_" + tz; if (!G.has[k])
return 0; var d = G.data[k]; if (!d) {
poeGrsLoad(tx, tz);
return -1;
} G.used[k] = POE.t || 0; return d[(iz - tz * G.T) * G.T + (ix - tx * G.T)]; }
function poeGrsOpen(sx, sz) { var t = poeGrsT(sx, sz); return t === 1 || t === 2 || t === 7; }
function poeGrsH(t) { return t === 1 ? 2.7 : 2.2; }
function poeGrsHash(x, z) { var h = (Math.imul(x | 0, 73856093) ^ Math.imul(z | 0, 19349663)) >>> 0; h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; return (h ^ (h >>> 16)) >>> 0; }
function poeGrsL(sx, sz) { return { x: sx - POE_GRS.CX, z: sz - POE_GRS.CZ }; }
function poeGrsHere() { var R = POE_RX.x_cat, L = worldLocal(); return { x: L.x - R.x + POE_GRS.CX, z: L.z + POE_GRS.CZ }; }
function poeGrsPut(sx, sz, ry) { var R = POE_RX.x_cat; camera.position.set(POE.base + R.x + sx - POE_GRS.CX, 1.72, sz - POE_GRS.CZ); if (ry != null)
yaw = ry; pitch = 0; }
function poeGrsWall(sx, sz) { return __ZC(467, 158, this, arguments, new.target); }
function poeGrsBatch() { return __ZC(467, 159, this, arguments, new.target); }
function poeGrsChunk(cx, cz) { return __ZC(467, 160, this, arguments, new.target); }
function poeGrsDrop(K) { if (K.g) {
K.g.traverse(function (o) { if (o.geometry && !o.userData.keep && o.geometry !== POE_GRS.boxGeo && o.geometry !== POE_GRS.endGeo && o.geometry !== POE_GRS.rubGeo)
o.geometry.dispose(); });
if (K.g.parent)
K.g.parent.remove(K.g);
} }
function poeGrsAround(max) { return __ZC(467, 161, this, arguments, new.target); }
POE_ROOMS.push({ k: "x_cat", n: "The Catacombs of Paris", custom: 1, w: 10000, d: 7200, h: 3, dark: 0.02, doors: [] });
POE_ROOMS.push({ k: "x_flamel", n: "The laboratory of Nicolas Flamel", w: 11, d: 12, h: 4.6, wall: "stone", floor: "flags", ceil: "vault", dark: 0.5, doors: [["s", 0, "x_cat", "The low door back into the quarries"]] });
(function () { var n = POE_ROOMS.length; ["x_cat", "x_flamel"].forEach(function (k, j) { var R = POE_ROOMS[n - 2 + j]; R.i = n - 2 + j; R.x = j ? POE_IN_X + (n + 2) * 300 + 600 : POE_IN_X + 60000; POE_RX[k] = R; }); })();
(function () { var D = POE_GRS_D, F = POE_GRS.fixed = {}; function fx(p) { F[p[0] + "," + p[1]] = 1; } D.stairs.forEach(fx); D.fig.forEach(fx); fx(D.F); fx(D.H); fx(D.K); for (var k in D.st)
fx(D.st[k]); })();
function poeCS() { if (!store.poecat || store.poecat.v !== 2)
store.poecat = { v: 2, candle: 100, figs: [], seen: {}, stair: 0, flamel: 0, lost: 0, tomb: 0, caches: {} }; var S = store.poecat; S.figs = S.figs || []; S.seen = S.seen || {}; S.caches = S.caches || {}; return S; }
POE_RB.x_cat = function (R, g) { return __ZC(467, 162, this, arguments, new.target); };
function poeGrsStand(p) { return __ZC(467, 163, this, arguments, new.target); }
function poeGrsWhere(P) { var best = null, bd = 260 * 260; POE_GRS_NAMES.forEach(function (n) { var d = (n[1] - P.x) * (n[1] - P.x) + (n[2] - P.z) * (n[2] - P.z); if (d < bd) {
bd = d;
best = n[0];
} }); return best; }
function poeGrsInOss(P) { return P.x > -420 && P.x < -225 && P.z > 770 && P.z < 905; }
function poeCatBanner() {
var S = poeCS(), P = poeGrsHere(), w = poeGrsWhere(P);
return "The Catacombs of Paris · 🕯 " + Math.max(0, Math.round(S.candle)) + "% · " + (poeGrsInOss(P) ? "in the ossuary" : w ? "beneath " + w : "<b>in the old quarries</b>") + " · stones of the arch " + S.figs.length + " of 7";
}
function poeCatLost(why) { return __ZC(467, 164, this, arguments, new.target); }
function poeGrsDir(dx, dz) { var a = Math.atan2(dx, -dz) * 180 / Math.PI; return ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"][Math.round(((a + 360) % 360) / 45) % 8]; }
function poeCatTick(dt) { return __ZC(467, 165, this, arguments, new.target); }
function poeCatNextFig() { var S = poeCS(), D = POE_GRS_D, P = poeGrsHere(), best = null, bd = 1e18; D.fig.forEach(function (c, i) { if (S.figs.indexOf(i) >= 0)
return; var d = (c[0] - P.x) * (c[0] - P.x) + (c[1] - P.z) * (c[1] - P.z); if (d < bd) {
bd = d;
best = c;
} }); return best || (S.flamel ? null : D.F); }
function poeCatLight(n, why) { var S = poeCS(); S.candle = Math.min(100, Math.max(S.candle, 0) + n); POE.black = false; poeSave(); if (why)
poeSay("🕯 " + why); }
function poeGrsPlan() { return __ZC(467, 166, this, arguments, new.target); }
function poeGrsStairs(q) { return __ZC(467, 167, this, arguments, new.target); }
function poeGrsGo(i) {
var D = POE_GRS_D, s = D.stairs[i], G = POE_GRS;
if (!s)
return;
var S = poeCS();
S.stair = i;
poeSave();
poeGrsLoad(Math.floor((s[0] - G.X0) / G.T), Math.floor((s[1] - G.Z0) / G.T));
poeVeil(poeSec(1.2), function () { poeGrsStand(s); poeGrsAround(99); poeSay("Down the stair of " + s[2] + "."); }, poeSec(0.8));
}
function poeCatHook(k, i) { return __ZC(467, 168, this, arguments, new.target); }
function poeCatDoor(n) { return __ZC(467, 169, this, arguments, new.target); }
POE_RB.x_flamel = function (R, g) { return __ZC(467, 170, this, arguments, new.target); };
function poeFlamelTalk() { return __ZC(467, 171, this, arguments, new.target); }
function poeParStairUp() {
var S = poeCS(), i = S.stair || 0, A = typeof POE_PAR_AT !== "undefined" ? POE_PAR_AT.stairs : null, p = A && A[i];
if (i > 0 && p && POE_RX.x_paris)
poeOutside(null, { x: POE_RX.x_paris.x + p[0] + 0.5, z: p[1] + 0.5, ry: 0, par: 1 });
else
poeOutside("out:x_cat");
}
function poeCatOut(G) { if (typeof poeParExits === "function")
poeParExits(); }
function poeCatTest() { return __ZC(467, 172, this, arguments, new.target); }
var POE_FOLK = [
["cask", -14, -22, "A reveller", "carnival", "m", 7, "“Ha! ha! The carnival! Drink, friend, drink; tomorrow is Lent.”"],
["cask", -6, -30, "A masker", "carnf", "f", 6, "“You have no mask. Everyone has a mask tonight. Some keep theirs on all year.”"],
["cask", 8, -18, "A reveller", "carnival", "m", 8, "“Fortunato? In motley, with the bells. He was tasting somebody’s wine. He is always tasting somebody’s wine.”"],
["cask", 16, -28, "A masker", "carnf", "f", 6, "“The Montresors were a great and numerous family once. Their vaults go on for ever, they say.”"],
["cask", -22, -8, "A reveller", "carnival", "m", 5, "“Nemo me impune lacessit. That is over the door there. ‘No one wounds me with impunity.’ A cheerful house!”"],
["cask", 2, -40, "A masker", "carnf", "f", 8, "“Dance with me! No? Then you are the only sober soul in the city.”"],
["cask", 24, -6, "A reveller", "carnival", "m", 5, "“I heard bells under the street last night. Little bells. I had been drinking.”", "“I heard little bells somewhere last night. I had been up late.”"],
["cask", -28, -34, "A reveller", "carnival", "m", 6, "“A pipe of Amontillado, in the middle of the carnival? Somebody has been cheated.”"],
["morgue", 36, -40, "A gendarme", "gendarme", "m", 5, "“Paris is through the gate, monsieur. The Rue Morgue is in the Quartier Saint-Roch, by the Palais-Royal. The house is shut by order of the Prefect.”"],
["morgue", 44, 0, "A woman of the quarter", "poorf", "f", 6, "“Such shrieks! At three in the morning! And the door locked on the inside. I shall not sleep in this street again.”"],
["morgue", 38, 44, "A workman", "workman", "m", 7, "“Two voices, they all say. One a Frenchman. The other, who knows? I say a Russian.”"],
["morgue", 43, 84, "A gentleman", "gent", "m", 6, "“The Gazette has the whole of it. Read the evidence, monsieur; then tell me how anyone got out of that room.”"],
["morgue", 37, 118, "A workman", "workman", "m", 5, "“The Catacombs? Through the gate: the stair is in the toll-house on the left, the western pavilion. Keep under the black line, and take more candle than you think you need.”"],
["morgue", 80, -50, "A lady", "lady", "f", 6, "“They say a scrivener named Flamel made gold in this city, four hundred years ago, and that he never died. His house still stands, in the Rue de Montmorency. Paris will say anything.”"],
["heart", -40, 3, "The watchman", "police", "m", 8, "“All’s well. One o’clock, and all’s well. … Did you hear a shriek? No. Nor I.”", "“All’s well. One o’clock, and all’s well.”"],
["heart", 20, -3, "A neighbour", "poorf", "f", 5, "“The old gentleman at the corner? Kind as you please. His lodger is very attentive. Up at all hours.”"],
["heart", 60, 3, "A gentleman", "gent", "m", 6, "“A fine night. Quiet. You could hear a watch ticking in cotton.”"],
["pit", 52, -14, "A French soldier", "french", "m", 6, "“Toledo will be ours within the week. General Lasalle does not knock twice.”"],
["pit", 60, 16, "A woman of Toledo", "poorf", "f", 5, "“Do not stand before that door, señor. Those who go in are judged. Those who are judged are not seen.”"],
["pit", 36, 26, "A familiar of the Holy Office", "monk", "m", 0, "“You have business with the tribunal? No? Then you have business elsewhere.”"],
["masque", -14, 96, "A countryman", "workman", "m", 5, "“He welded the bolts. A thousand of them in there, dancing. And us out here with the Red Death.”", "“He shut the gates. A thousand of them in there, dancing. And us out here with the sickness.”"],
["masque", 12, 100, "A countrywoman", "poorf", "f", 5, "“Half the country gone. Half an hour, from the first pain to the end. Keep away from the cottages.”", "“Half the country is sick. Keep away from the cottages.”"]
];
function poeFolk(G) { return __ZC(467, 173, this, arguments, new.target); }
var POE_PAR_TILES = [[3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6], [16, 6], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [16, 8], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [17, 9], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [16, 10], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13]];
var POE_PAR_AT = { "r_dupin": { "b": [-1023, -2264], "n": [0, -1] }, "r_house": { "b": [-152, -3145], "n": [1, 0] }, "r_pref": { "b": [610, -2128], "n": [0, -1] }, "r_shop": { "b": [628, -3175], "n": [-1, 0] }, "r_cafe": { "b": [-152, -3137], "n": [1, 0] }, "r_cafe2": { "b": [-152, -3133], "n": [1, 0] }, "flamel": { "b": [1279, -2981], "n": [0, -1] }, "morgue": { "b": [732, -1942], "n": [0, 1] }, "enfer": { "b": [-329, 207], "n": [0, -1] }, "stairs": [[-303, 215], [1467, 453], [-257, -557], [-3377, -3084], [273, 222], [1693, -101], [450, -507], [-675, -233], [-350, -1237], [-1708, -688], [-3018, -3231], [-3513, -2869], [-1150, -622], [225, -820], [-2976, -3374], [-3248, -3222], [1387, 134], [-3141, -3094], [902, -466], [448, -346], [1319, 189], [-2925, -3566], [-130, -697], [644, -480], [1309, 77], [784, -617], [46, -1486], [1236, 168], [1443, -871], [-760, -1425], [192, 487], [-687, -1205], [-400, -807], [1460, -185], [-414, -1440], [1349, -766], [1409, -560], [-133, -845], [-2869, -3396], [-3047, 638], [-2882, 658], [-2931, 551], [-2935, 758], [-3001, 618], [-2837, 581], [-373, 1415], [-192, 1267], [1796, 841], [-1227, 1388], [-361, 1265], [1640, 1012], [1448, 964]], "X": [-476, 879] };
var POE_PAR = { T: 500, X0: -4000, Z0: -6000, NX: 9000, NZ: 7500, CH: 32, has: {}, data: {}, loading: {}, used: {}, chunks: {}, stamp: 0, err: 0 };
POE_PAR_TILES.forEach(function (t) { POE_PAR.has[t[0] + "_" + t[1]] = 1; });
function poeParLoad(tx, tz) { return __ZC(467, 174, this, arguments, new.target); }
var POE_PAR_CLEAR = [];
function poeParRaw(sx, sz) { var G = POE_PAR, ix = Math.floor(sx) - G.X0, iz = Math.floor(sz) - G.Z0; if (ix < 0 || iz < 0 || ix >= G.NX || iz >= G.NZ)
return 2; var tx = (ix / G.T) | 0, tz = (iz / G.T) | 0, k = tx + "_" + tz; if (!G.has[k])
return 2; var d = G.data[k]; if (!d) {
poeParLoad(tx, tz);
return -1;
} G.used[k] = 1; return d[(iz - tz * G.T) * G.T + (ix - tx * G.T)]; }
function poeParT(sx, sz) { var t = poeParRaw(sx, sz); if (t === 1) {
for (var i = 0; i < POE_PAR_CLEAR.length; i++) {
var C = POE_PAR_CLEAR[i];
if (Math.abs(sx - C[0]) < C[2] && Math.abs(sz - C[1]) < C[3])
return 0;
}
} return t; }
function poeParWalk(t) { return t === 0 || t === 2 || t === 4; }
function poeParHash(x, z) { var h = (Math.imul(x | 0, 73856093) ^ Math.imul(z | 0, 19349663) ^ 0x5bd1e995) >>> 0; h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; return (h ^ (h >>> 16)) >>> 0; }
function poeParPlot(sx, sz) { return poeParHash(Math.floor((sx + 3) / 9), Math.floor((sz + 5) / 9)); }
function poeParH(sx, sz) { var p = poeParPlot(sx, sz); return POE.era ? 8.6 + (p % 4) * 1.5 : 13.2 + (p % 5) * 1.5; }
var POE_PAR_GF = 4.4;
function poeParCanvas(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
function poeParTexPair(key, w, h, fn) { return __ZC(467, 175, this, arguments, new.target); }
function poeParStone(x, W, H, mPx, col, seed) { return __ZC(467, 176, this, arguments, new.target); }
function poeParWindow(x, e, X, Y, w, h, R, lit, shut, col) { return __ZC(467, 177, this, arguments, new.target); }
function poeParRail(x, X, Y, w, h) { x.strokeStyle = "#141414"; x.lineWidth = 2.5; x.strokeRect(X, Y, w, h); x.beginPath(); for (var i = X; i < X + w; i += h / 5) {
x.moveTo(i, Y);
x.lineTo(i, Y + h);
} x.stroke(); x.lineWidth = 1.5; x.beginPath(); for (var j = X; j < X + w - h / 2; j += h / 2.5) {
x.arc(j + h / 5, Y + h * 0.55, h / 5, 0, 7);
} x.stroke(); }
var POE_PAR_SHUT = ["#3A4A3A", "#5A6A5A", "#4A4038", "#6A6A62", "#2E3A44", "#8A8A80"];
function poeParUpper(k) { return __ZC(467, 178, this, arguments, new.target); }
var POE_PAR_SHOPS = ["BOULANGERIE", "MARCHAND DE VIN", "ÉPICERIE", "LIBRAIRIE", "CAFÉ", "CHAPELIER", "HORLOGER", "PHARMACIE", "MERCERIE", "TABAC", "BOUCHERIE", "PÂTISSIER", "GANTIER", "PARFUMEUR", "RESTAURANT", "CORDONNIER", "BLANCHISSEUSE", "ESTAMINET", "MARCHAND DE COULEURS", "LIMONADIER"];
function poeParGround(k) { return __ZC(467, 179, this, arguments, new.target); }
function poeParMansard() { return __ZC(467, 180, this, arguments, new.target); }
function poeParBalTex() { return __ZC(467, 181, this, arguments, new.target); }
var POE_PAR_TEX = {
party: [6, function (x, W, H) { return __ZC(467, 182, this, arguments, new.target); }],
zinc: [3, function (x, W, H) { x.fillStyle = "#3A3E44"; x.fillRect(0, 0, W, H); for (var i = 0; i < W; i += W / 8) {
x.fillStyle = "rgba(200,210,220,.12)";
x.fillRect(i, 0, 3, H);
} poeNz(x, W, H, 5000, 0.15, 984); poeStain(x, W, H, 6, 985, "10,10,10", 0.3); }],
setts: [2, function (x, W, H) { return __ZC(467, 183, this, arguments, new.target); }],
quayflag: [3, function (x, W, H) { poeBlocks(x, W, H, 4, 3, [92, 88, 80], 26, "#2A2620", 989); poeStain(x, W, H, 6, 990, "20,18,14", 0.3); }],
court: [2, function (x, W, H) { poeBlocks(x, W, H, 5, 5, [70, 66, 58], 20, "#22201A", 991); poeNz(x, W, H, 3000, 0.2, 992); }],
garden: [4, function (x, W, H) { return __ZC(467, 184, this, arguments, new.target); }],
quaywall: [4, function (x, W, H) { poeBlocks(x, W, H, 6, 3, [78, 74, 66], 24, "#1A1814", 994, true); var g = x.createLinearGradient(0, H * 0.6, 0, H); g.addColorStop(0, "rgba(20,30,20,0)"); g.addColorStop(1, "rgba(20,40,24,.55)"); x.fillStyle = g; x.fillRect(0, 0, W, H); }],
arches: [8, function (x, W, H) { poeBlocks(x, W, H, 8, 6, [82, 78, 70], 24, "#1A1814", 995, true); x.fillStyle = "#0A0C0E"; x.beginPath(); x.moveTo(W * 0.12, H); x.lineTo(W * 0.12, H * 0.55); x.arc(W * 0.5, H * 0.55, W * 0.38, Math.PI, 0); x.lineTo(W * 0.88, H); x.fill(); }],
door: [1, function (x, W, H) { return __ZC(467, 185, this, arguments, new.target); }]
};
function poeParMat(k, col) { return __ZC(467, 186, this, arguments, new.target); }
function poeParBatch() { return __ZC(467, 187, this, arguments, new.target); }
function poeParWall(B, p0, p1, y0, y1, n, us, vs, vo) {
var ox = POE_PAR.ox || 0, oz = POE_PAR.oz || 0, u0 = ((p0[0] + ox) * n[1] - (p0[1] + oz) * n[0]), u1 = ((p1[0] + ox) * n[1] - (p1[1] + oz) * n[0]);
B.q([p0[0], y0, p0[1]], [p1[0], y0, p1[1]], [p1[0], y1, p1[1]], [p0[0], y1, p0[1]], [n[0], 0, n[1]], u0 / us, (y0 - (vo || 0)) / vs, u1 / us, (y1 - (vo || 0)) / vs);
}
function poeParBox(B, x, y, z, w, h, d, us) { return __ZC(467, 188, this, arguments, new.target); }
var POE_PAR_D = [[0, 1], [0, -1], [1, 0], [-1, 0]];
function poeParCut(x, z, lx, lz, T) { return __ZC(467, 189, this, arguments, new.target); }
function poeParEdge(x, z, i) {
return i === 0 ? [[x, z + 1], [x + 1, z + 1]] : i === 1 ? [[x + 1, z], [x, z]] : i === 2 ? [[x + 1, z + 1], [x + 1, z]] : [[x, z], [x, z + 1]];
}
function poeParChunk(cx, cz) { return __ZC(467, 190, this, arguments, new.target); }
function poeParMansardQ(B, E, h, n) { return __ZC(467, 191, this, arguments, new.target); }
function poeParDrop(K) { if (K.g) {
K.g.traverse(function (o) { if (o.geometry && !o.userData.keepGeo && o.geometry !== POE_PAR.treeGeo && o.geometry !== POE_PAR.crownGeo)
o.geometry.dispose(); });
if (K.g.parent)
K.g.parent.remove(K.g);
} }
function poeParHere() { var R = POE_RX.x_paris, L = worldLocal(); return { x: L.x - R.x, z: L.z }; }
function poeParAround(max) { return __ZC(467, 192, this, arguments, new.target); }
var POE_PAR_MON = { nd: [935, -1892], ndFront: [860, -1895], pantheon: [714, -1083], invalides: [-1761, -2070], valdegrace: [411, -424], sorbonne: [485, -1358], vendome: [-520, -3450], obelisk: [-1124, -3239], henri4: [327, -2298], stjacques: [903, -2393], stsulpice: [-125, -1614], july: [2395, -1860], observatory: [0, 21], enfer: [-293, 222], menagerie: [1727, -882], palaisroyal: [136, -3065], dupinWalk: [-1003, -2266], parvis: [826, -1896], stroch: [-293, -3204] };
POE_PAR_CLEAR.push([935, -1892, 72, 30], [862, -1892, 9, 26], [714, -1083, 52, 52], [-1761, -2070, 26, 26], [411, -424, 18, 18], [485, -1358, 12, 12], [903, -2393, 7, 7], [-125, -1614, 58, 24], [0, 21, 24, 14], [-293, 222, 44, 13], [-1124, -3239, 8, 8], [-520, -3450, 5, 5], [2395, -1860, 8, 8], [327, -2298, 6, 6]);
function poeParW(sx, sz) { var R = POE_RX.x_paris; return { x: R.x + sx, z: sz }; }
function poeParStatue(P, y, s, m) { var q = poeGrp(P, 0, y, 0); poeCyl(q, 0.22 * s, 0.3 * s, 1.0 * s, m, 0, 0.5 * s, 0, 8); poeCyl(q, 0.3 * s, 0.24 * s, 0.7 * s, m, 0, 1.3 * s, 0, 8); poeSph(q, 0.14 * s, m, 0, 1.8 * s, 0, 8); poeCyl(q, 0.2 * s, 0.2 * s, 0.08 * s, m, 0, 1.93 * s, 0, 8); poeCyl(q, 0.07 * s, 0.06 * s, 0.65 * s, m, 0.32 * s, 1.3 * s, 0, 6); return q; }
function poeParLit(m) { var k = "parLit" + m.uuid; if (POE.mats[k])
return POE.mats[k]; var c = m.clone(); c.emissiveMap = m.map; c.emissive = new THREE.Color(0x5A5446); c.userData = m.userData; return (POE.mats[k] = c); }
function poeParMonuments(R, g) { return __ZC(467, 193, this, arguments, new.target); }
var POE_PAR_NAMES = [["the Cité", 771, -2059], ["Notre-Dame", 935, -1892], ["the Île Saint-Louis", 1483, -1681], ["the Pont Neuf", 330, -2304], ["the Louvre", 81, -2682], ["the Tuileries", -660, -2993], ["the Place de la Concorde", -1122, -3238], ["the Champs-Élysées", -2091, -3705], ["the Palais-Royal", 44, -3038], ["the Quartier Saint-Roch", -330, -3227], ["the Place Vendôme", -521, -3449], ["the Rue Saint-Honoré", 404, -2838], ["the Halles", 697, -2838], ["Saint-Eustache", 646, -2993], ["the Rue Montmartre", 550, -3394], ["the Boulevards", 404, -3838], ["the Marais", 1798, -2504], ["the Place Royale", 2128, -2126], ["the Hôtel de Ville", 1152, -2237], ["the Grève", 1064, -2170], ["the Temple", 1798, -3171], ["the Faubourg Saint-Antoine", 3119, -1615], ["the Bastille", 2393, -1859], ["the Arsenal", 2018, -1448], ["the Jardin des Plantes", 1652, -836], ["the Salpêtrière", 1945, -280], ["the Faubourg Saint-Marcel", 991, -169], ["the Gobelins", 1138, 165], ["the Montagne Sainte-Geneviève", 844, -1058], ["the Panthéon", 712, -1080], ["the Latin Quarter", 551, -1503], ["the Sorbonne", 485, -1358], ["the Luxembourg", 52, -1080], ["Saint-Sulpice", -125, -1614], ["Saint-Germain-des-Prés", -183, -1948], ["the Faubourg Saint-Germain", -991, -2226], ["the Invalides", -1761, -2237], ["the Champ de Mars", -2825, -2126], ["the Gros-Caillou", -2385, -2504], ["Chaillot", -3191, -3061], ["the Faubourg Saint-Honoré", -1504, -3839], ["the Chaussée d'Antin", -257, -4061], ["the Faubourg Montmartre", 477, -4394], ["the Faubourg Saint-Denis", 1431, -4172], ["the Faubourg Saint-Martin", 1797, -4172], ["the Faubourg du Temple", 2458, -3616], ["Popincourt", 3045, -2727], ["Vaugirard", -1578, -836], ["Mont-Parnasse", -844, -613], ["the Barrière d'Enfer", -294, 287], ["the Val-de-Grâce", 411, -424], ["the Observatory", 0, 21], ["the Quai des Orfèvres", 551, -2170], ["the Rue de Montmorency", 1277, -2982]];
function poeParWhere(P) { var best = null, bd = 1e12; POE_PAR_NAMES.forEach(function (n) { var d = (n[1] - P.x) * (n[1] - P.x) + (n[2] - P.z) * (n[2] - P.z); if (d < bd) {
bd = d;
best = n[0];
} }); return best; }
POE_ROOMS.push({ k: "x_paris", n: "Paris", custom: 1, city: 1, w: 9000, d: 7500, h: 80, dark: 0.5, doors: [] });
(function () { var n = POE_ROOMS.length, R = POE_ROOMS[n - 1]; R.i = n - 1; R.x = POE_IN_X + 100000; POE_RX.x_paris = R; })();
var POE_PAR_DOORS = { r_dupin: "Dupin’s house, Rue Dunôt, No. 33, Faubourg St. Germain", r_house: "The house in the Rue Morgue (the four-storey house of Madame L’Espanaye)", r_pref: "The Préfecture of Police, Rue de Jérusalem", r_shop: "A bookshop in the Rue Montmartre", r_cafe: "A café in the Rue St. Roch", r_cafe2: "A house of apartments, Rue St. Roch" };
function poeParExit(sx, sz, n, out) { var R = POE_RX.x_paris, o = out == null ? 1.6 : out; return { x: R.x + sx + 0.5 + n[0] * o, z: sz + 0.5 + n[1] * o, ry: Math.atan2(n[0], n[1]), par: 1 }; }
function poeParExits() { return __ZC(467, 194, this, arguments, new.target); }
poeParExits();
function poeParRod(out, side) { var D = POE.rod; return { x: D.x + D.n[0] * out + D.r[0] * side, z: D.z + D.n[1] * out + D.r[1] * side }; }
function poeParStreet(sx, sz) { return poeParW(sx, sz); }
POE_RB.x_paris = function (R, g) { return __ZC(467, 195, this, arguments, new.target); };
function poeParS() { if (!store.poepar)
store.poepar = { v: 1 }; return store.poepar; }
function poeParTick(dt) { return __ZC(467, 196, this, arguments, new.target); }
POE_ROOMS.push({ k: "x_phouse", n: "A house of Paris", custom: 1, w: 13, d: 11, h: 3.6, dark: 0.85, doors: [] });
(function () { var n = POE_ROOMS.length, R = POE_ROOMS[n - 1]; R.i = n - 1; R.x = POE_IN_X + 45000; POE_RX.x_phouse = R; })();
var POE_PAR_FLOOR = ["the ground floor", "the first floor (the étage noble)", "the second floor", "the third floor", "the fourth floor", "the fifth floor", "the garrets"];
var POE_PAR_FIRST = { m: ["Jules", "Henri", "Louis", "Auguste", "Pierre", "Étienne", "Victor", "Achille", "Hippolyte", "Armand", "Théodore", "Alphonse", "Eugène", "Gustave", "Jean-Baptiste", "Antoine", "Félix", "Prosper"], f: ["Marie", "Louise", "Joséphine", "Adèle", "Sophie", "Clémence", "Hortense", "Eugénie", "Pauline", "Césarine", "Delphine", "Mathilde", "Julie", "Aglaé", "Rosalie", "Zoé", "Héloïse", "Victorine"] };
var POE_PAR_LAST = ["Lefebvre", "Moreau", "Dubois", "Laurent", "Girard", "Bonnet", "Mercier", "Fontaine", "Rousseau", "Chevalier", "Blanchard", "Gauthier", "Perrin", "Morel", "Lambert", "Garnier", "Faure", "Renaud", "Dumont", "Picard", "Brunet", "Roussel", "Vasseur", "Lemaire", "Collin", "Baudry", "Delorme", "Marchand", "Prévost", "Deschamps"];
var POE_PAR_WHO = [
[["Monsieur", "gent", "m", "the shopkeeper on the ground floor", "his trade, his customers, the price of bread and candles, the gossip of the street"], ["Madame", "poorf", "f", "the porter's wife (the concierge), who keeps the door and knows every lodger's business", "who comes in late, who owes rent, which lodger has a lover; she sorts the letters and watches the stair"], ["Monsieur", "workman", "m", "the shop's apprentice", "his master, his sweetheart, the theatres of the Boulevard du Temple"]],
[["Madame", "lady", "f", "the lady of the first floor, wife of a banker of the Chaussée d'Antin", "the Opéra, the King's court at the Tuileries, Monsieur Balzac's novels, her daughter's marriage"], ["Monsieur", "gent", "m", "a deputy of the Chamber, who lives on the first floor", "the July Monarchy, Monsieur Guizot, the railways that are coming, the fortifications of Paris"], ["Monsieur", "servant", "m", "the footman of the first floor", "his masters, the dinners they give, what the other servants say"]],
[["Monsieur", "physician", "m", "a physician with his rooms on the second floor", "the cholera of 1832, the hospitals, the new science of the Faculty"], ["Madame", "lady", "f", "a notary's widow on the second floor", "her late husband's clients, her lodgers, the sermons at Saint-Roch"], ["Monsieur", "gent", "m", "a retired officer of the Emperor", "Austerlitz, the return of the Emperor's ashes in 1840, the old days"]],
[["Monsieur", "gent", "m", "a clerk at the ministry, living on the third floor with his family", "his small salary, his superiors, the lottery, the Sunday walks to the barrières"], ["Madame", "poorf", "f", "a clerk's wife on the third floor", "the children, the market at the Halles, the price of firewood"], ["Monsieur", "workman", "m", "an engraver who works at his window", "his plates, the print-sellers of the Quai Voltaire, the fine maps of Paris"]],
[["Madame", "poorf", "f", "a seamstress who sews for the shops", "her work, the long hours by one candle, the shops of the Rue Vivienne"], ["Monsieur", "workman", "m", "a cabinet-maker of the Faubourg Saint-Antoine", "his trade, the barricades of 1830 and 1832, his guild"], ["Madame", "poorf", "f", "a laundress who works on the boats of the Seine", "the washing-boats, the river in flood, the bridges"]],
[["Monsieur", "workman", "m", "a water-carrier from Auvergne", "carrying water up six storeys, his village, the fountains of Paris"], ["Madame", "poorf", "f", "an old widow who lives on very little", "her memories of the Revolution, her cat, her prayers"]],
[["Monsieur", "gent", "m", "a poor student of the Latin Quarter who lodges in the garret", "his law books, his poems, the lectures at the Sorbonne, the grisettes, the price of a dinner"], ["Mademoiselle", "poorf", "f", "a grisette, a young working girl who makes flowers", "her work, the dances at the Chaumière, the student across the landing"], ["Monsieur", "workman", "m", "a painter's apprentice in the garret", "the Salon at the Louvre, Monsieur Delacroix, being poor and young in Paris"]]
];
var POE_PAR_GREET = ["Bonsoir, monsieur. You are on the stair late.", "Good evening. Do you look for someone in the house?", "Ah, a visitor. Come in, come in, the stair is dark.", "Bonsoir. Mind the step; the landlord will not mend it.", "Good evening. Have you heard what they say of the Rue Morgue?"];
var POE_PAR_SHOPKIND = { BOULANGERIE: "bread", PÂTISSIER: "bread", "MARCHAND DE VIN": "wine", ESTAMINET: "wine", CAFÉ: "cafe", LIMONADIER: "cafe", RESTAURANT: "cafe", LIBRAIRIE: "books", ÉPICERIE: "goods", MERCERIE: "goods", TABAC: "goods", PHARMACIE: "jars", PARFUMEUR: "jars", "MARCHAND DE COULEURS": "jars", HORLOGER: "clocks", CHAPELIER: "goods", GANTIER: "goods", CORDONNIER: "goods", BOUCHERIE: "goods", BLANCHISSEUSE: "goods" };
function poeParHouseInfo(D) {
var s = D.seed >>> 0, h = D.h || 15, nf = Math.max(4, Math.min(6, Math.round((h - 4.4) / 3) + 2));
var quarter = typeof poeParWhere === "function" ? poeParWhere({ x: D.x, z: D.z }) : "Paris";
return { seed: s, nf: nf, no: 1 + s % 120, quarter: quarter, shop: D.big ? null : POE_PAR_SHOPS[(s >>> 3) % POE_PAR_SHOPS.length] };
}
function poeParHouseName(D) { var I = poeParHouseInfo(D); return "No. " + I.no + ", near " + I.quarter + (I.shop ? " (" + I.shop.toLowerCase() + ")" : ""); }
function poeParHouseEnter(D) {
var R = poeRoomGet("x_phouse");
if (!R)
return;
POE.parHouse = { D: D, f: 0 };
poeParHouseBuild(R, D, 0);
poeEnterRoom("x_phouse", "par:house", { x: 3.6, z: R.d / 2 - 1.3, ry: 0 });
}
function poeParHouseOut() {
var H = POE.parHouse, PR = POE_RX.x_paris;
if (!H || !PR) {
poeOutside("out:par_gate");
return;
}
var D = H.D, n = [Math.sin(D.ry), Math.cos(D.ry)];
poeOutside(null, { x: PR.x + D.x + n[0] * 0.4, z: D.z + n[1] * 0.4, ry: D.ry, par: 1 });
}
function poeParHouseFloor(f, up) {
var R = POE_RX.x_phouse, H = POE.parHouse;
if (!H)
return;
poeVeil(window.POE_FAST ? 0.01 : 0.3, function () { H.f = f; poeParHouseBuild(R, H.D, f); poeShowOnly(R); camera.position.set(POE.base + R.x - 3.4, 1.72, -R.d / 2 + 2.6); yaw = -Math.PI / 2; pitch = 0; poeSfx("tap"); });
}
function poeParHouseClear(R) { return __ZC(467, 197, this, arguments, new.target); }
function poeParHouseBuild(R, D, f) { return __ZC(467, 198, this, arguments, new.target); }
function poeParShop(R, g, I, rnd, person, solid) { return __ZC(467, 199, this, arguments, new.target); }
function poeParMorgueRoom(R, g, person, solid) { return __ZC(467, 200, this, arguments, new.target); }
var POE_PAR_FOLK = [
["A lamplighter", "workman", "m", "a lamplighter (allumeur de réverbères) with his ladder and pole, who lights and trims the oil lamps hung over the streets of Paris", "the lamps, the new gas lamps on the Rue de la Paix, the hours of the night, who walks the streets late", "Bonsoir. Mind my ladder, monsieur. Every lamp in this street is mine."],
["A water-carrier", "workman", "m", "an Auvergnat water-carrier (porteur d'eau) with two buckets on a yoke, who carries water from the fountains up to the flats", "the fountains, the stairs, his village in the Auvergne, the price of a bucket (one sou)", "Water, fresh from the fountain! Two buckets, a sou. You want water, monsieur?"],
["A rag-picker", "workman", "m", "a rag-picker (chiffonnier) with his basket on his back, his hook and his little lantern, who searches the refuse of Paris by night", "what Paris throws away, the barrières, the wine at the guinguettes, the strange things he has found", "Bonsoir. You have nothing to throw away? Everyone has something to throw away."],
["A gendarme", "gendarme", "m", "a gendarme of the Municipal Guard on his night round", "the law, the Préfecture of Police in the Rue de Jérusalem, the murders in the Rue Morgue, thieves", "Good evening, monsieur. Late to be walking. Keep to the lit streets."],
["A student", "gent", "m", "a student of law or medicine from the Latin Quarter, walking home late", "his lectures at the Sorbonne and the École de Médecine, poetry, politics, the cafés, the grisettes", "Ah, another soul awake! Do you know a café still open? I have one franc and a great thirst."],
["A grisette", "poorf", "f", "a grisette, a young working girl in a grey dress who sews or makes artificial flowers, walking home from work", "her work, her students, the dances at the Chaumière and the Prado, the shops", "Bonsoir! Don't look so lost; Paris is easy. Every street ends at the Seine, or at a café."],
["A cab driver", "workman", "m", "a cab driver (cocher de fiacre) waiting with his horse and whip", "his horse, his fares, the streets he knows, the omnibuses that steal his trade", "A fiacre, monsieur? Anywhere inside the walls, thirty sous. The horse is old but honest."],
["A flower seller", "poorf", "f", "a flower seller with her basket of violets", "her flowers, the market of the Quai aux Fleurs, the gentlemen who buy for their ladies", "Violets, monsieur? A bunch for two sous. For your lady, or for yourself."],
["A gentleman", "gent", "m", "a gentleman of fashion (a dandy of the Boulevard de Gand) walking home from the Café de Paris", "the Opéra, the Jockey Club, horses, cards, scandals, Monsieur Balzac", "Bonsoir. You have the air of a stranger. You are walking the wrong way for anything amusing."],
["A lady", "lady", "f", "a lady in a bonnet and shawl walking home with her maid after the theatre", "the play at the Théâtre-Français, Mademoiselle Rachel, the fashions, the dangers of the night streets", "Good evening. We are only going as far as the next street. My husband is waiting."],
["A bargeman", "sailor", "m", "a bargeman of the Seine who brings wood and wine to the ports of Paris", "the river, the floods, the bridges, the washing-boats, the Morgue where the drowned are taken", "Evening. The river is high tonight. Keep off the quays where there is no lamp."],
["A baker's boy", "workman", "m", "a baker's boy hurrying to the oven, for the bakers work all night", "the bread, the ovens, his master, the market at the Halles at dawn", "No time, monsieur! The bread does not wait for anyone."],
["A washerwoman", "poorf", "f", "a washerwoman with a bundle of linen going to the washing-boats on the Seine", "the boats, the water, the gossip of the quarter, the Rue Morgue murders", "Bonsoir. Those poor ladies in the Rue Morgue! Did you read it in the Gazette? Shocking."],
["A priest", "gent", "m", "a priest of the parish going to bring the last sacraments to a dying parishioner", "his parish, the poor, the dying, the churches of Paris", "God keep you, my son. I cannot stop; someone waits for me."],
["An old soldier", "gent", "m", "an old soldier of the Emperor with a wooden leg, who sells newspapers", "the Emperor, his campaigns, the return of the Emperor's ashes to the Invalides in December 1840", "The Gazette, monsieur? All about the murders in the Rue Morgue. One sou. I was at Austerlitz, you know."],
["A seamstress", "poorf", "f", "a seamstress carrying a finished gown to a lady's house", "her work, the long hours, the shops of the Rue Vivienne", "Excuse me, monsieur, I must hurry. Madame wants her gown tonight."]
];
var POE_PAR_F = { list: [], on: false };
function poeParFolkStart(R) { return __ZC(467, 201, this, arguments, new.target); }
function poeParFolkStop() { var F = POE_PAR_F; F.on = false; F.list.forEach(function (W) { W.P.g.visible = false; W.dir = null; }); }
function poeParFolkPlace(W, P, near) { return __ZC(467, 202, this, arguments, new.target); }
function poeParFolkTick(dt) { return __ZC(467, 203, this, arguments, new.target); }
(function () { var b = POE_RB.x_paris; if (!b)
return; POE_RB.x_paris = function (R, g) { POE_PAR_F.list = []; POE_PAR_F.on = false; b(R, g); var t = R.tick; R.tick = function (dt) { if (t)
t(dt); try {
poeParFolkTick(dt);
}
catch (e) { } }; }; })();
var POE_PAR_PAINT = [
function (x, W, H) { return __ZC(467, 204, this, arguments, new.target); },
function (x, W, H) { return __ZC(467, 205, this, arguments, new.target); },
function (x, W, H) { return __ZC(467, 206, this, arguments, new.target); },
function (x, W, H) { return __ZC(467, 207, this, arguments, new.target); },
function (x, W, H) { return __ZC(467, 208, this, arguments, new.target); }
];
function poeParPic(g, x, y, z, ry, w, h, k) { return poePainting(g, x, y, z, ry, w, h, POE_PAR_PAINT[k % POE_PAR_PAINT.length], "parPaint" + (k % POE_PAR_PAINT.length)); }
function poeParWainscot(R, g, col, h) { return __ZC(467, 209, this, arguments, new.target); }
function poeParSconce(g, x, y, z, ry) { return __ZC(467, 210, this, arguments, new.target); }
function poeParChandelier(g, y, rich, lite) { return __ZC(467, 211, this, arguments, new.target); }
function poeParVase(g, x, y, z, s) { return __ZC(467, 212, this, arguments, new.target); }
function poeParPlant(g, x, z, s) { return __ZC(467, 213, this, arguments, new.target); }
function poeParSofa(g, x, z, ry, col) { return __ZC(467, 214, this, arguments, new.target); }
function poeParArmoire(g, x, z, ry, col) { return __ZC(467, 215, this, arguments, new.target); }
function poeParSideboard(g, x, z, ry, rich) { return __ZC(467, 216, this, arguments, new.target); }
function poeParWashstand(g, x, z, ry) { return __ZC(467, 217, this, arguments, new.target); }
function poeParStove(g, x, z, ry) { return __ZC(467, 218, this, arguments, new.target); }
function poeParChest(g, x, z, ry, col) { var c = poeGrp(g, x, 0, z, ry); poeBox(c, 1.0, 0.5, 0.5, poeS("oak", col || 0x6A4A2A), 0, 0.25, 0); poeBox(c, 1.02, 0.04, 0.52, poeShine(0x2A2A2A, 0.5, 0.7), 0, 0.12, 0); poeBox(c, 1.02, 0.04, 0.52, poeShine(0x2A2A2A, 0.5, 0.7), 0, 0.4, 0); return c; }
function poeParBirdcage(g, x, y, z) { return __ZC(467, 219, this, arguments, new.target); }
function poeParLaid(g, x, z, w, d, y, rich, n) { return __ZC(467, 220, this, arguments, new.target); }
function poeParDressForm(g, x, z, col) {
var d = poeGrp(g, x, 0, z);
poeCyl(d, 0.02, 0.02, 1.0, poeC(POE_WOOD), 0, 0.5, 0, 6);
poeCyl(d, 0.25, 0.05, 0.04, poeC(POE_WOOD), 0, 0.02, 0, 8);
var b = poeSph(d, 0.2, poeS("velvet", col), 0, 1.3, 0, 12);
b.scale.set(1, 1.4, 0.8);
var sk = poeCyl(d, 0.18, 0.42, 0.7, poeS("velvet", col), 0, 0.75, 0, 14);
return d;
}
function poeParLaundry(g, x0, x1, y, z) {
poeBox(g, x1 - x0, 0.01, 0.01, poeC(0x8A7A5A), (x0 + x1) / 2, y, z);
var cols = [0xF0ECE4, 0xD8E0F0, 0xE8D8C8, 0xC8D8C0];
for (var i = 0; i < 5; i++) {
var x = x0 + 0.4 + i * (x1 - x0 - 0.8) / 4;
poeFace(g, 0.4, 0.55, poeC(cols[i % 4]), x, y - 0.28, z, i * 0.2);
poeFace(g, 0.4, 0.55, poeC(cols[i % 4]), x, y - 0.28, z, Math.PI + i * 0.2);
}
}
function poeParBooks(g, x, y, z, n, ry) { var b = poeGrp(g, x, y, z, ry || 0); for (var i = 0; i < n; i++) {
var h = 0.18 + 0.06 * ((i * 5) % 3);
poeBox(b, 0.05 + 0.02 * (i % 3), h, 0.17, poeC([0x6A1A1A, 0x1A2A4A, 0x3A2A1A, 0x2A4A2A, 0x8A6A2A][i % 5]), -n * 0.035 + i * 0.07, h / 2, 0);
} return b; }
function poeParShelf(g, x, y, z, ry, w, fill) { return __ZC(467, 221, this, arguments, new.target); }
function poeParMantel(g, x, z, rich) { return __ZC(467, 222, this, arguments, new.target); }
function poeParFlatRich(R, g, cls, rnd, person, solid, garret) { return __ZC(467, 223, this, arguments, new.target); }
function poeParPartition(R, g, solid) { return __ZC(467, 224, this, arguments, new.target); }
function poeParPegs(g, x, z, ry) { return __ZC(467, 225, this, arguments, new.target); }
function poeParBasket(g, x, z) {
var b = poeGrp(g, x, 0, z);
poeCyl(b, 0.3, 0.24, 0.4, poeS("rough", 0x8A6A3A), 0, 0.2, 0, 12, true);
poeCyl(b, 0.24, 0.24, 0.02, poeC(0x5A3A1A), 0, 0.02, 0, 12);
for (var i = 0; i < 6; i++) {
var l = poeCyl(b, 0.05, 0.05, 0.6, poeS("bark"), -0.12 + (i % 3) * 0.12, 0.42 + Math.floor(i / 3) * 0.09, 0, 6);
l.rotation.x = Math.PI / 2;
}
return b;
}
function poeParEasel(g, x, z, ry) { return __ZC(467, 226, this, arguments, new.target); }
function poeParLodgeRich(R, g, I, rnd, person, solid) { return __ZC(467, 227, this, arguments, new.target); }
function poeParShopDress(R, g, I, rnd) { return __ZC(467, 228, this, arguments, new.target); }
function poeParFlamelRich(R, g, f, person, solid) { return __ZC(467, 229, this, arguments, new.target); }
function poeNdArchPts(s, y0, r, n) { return __ZC(467, 230, this, arguments, new.target); }
function poeNdApex(s, y0, r) { r = r || s * 0.8; var ta = Math.acos((s / 2 - r) / r); return y0 + r * Math.sin(ta); }
function poeNdWall(len, h, th, opens, mat) { return __ZC(467, 231, this, arguments, new.target); }
function poeNdRing(s, b, y0, r, th, mat) { return __ZC(467, 232, this, arguments, new.target); }
function poeNdPut(P, m, x, y, z, ry) { m.position.set(x, y, z); m.rotation.y = ry || 0; P.add(m); return m; }
function poeNdMerge(root) { return __ZC(467, 233, this, arguments, new.target); }
function poeNdLit(m, em) { var k = "ndLit" + m.uuid + em; if (POE.mats[k])
return POE.mats[k]; var c = m.clone(); c.emissiveMap = m.map; c.emissive = new THREE.Color(em); c.userData = m.userData; return (POE.mats[k] = c); }
function poeNdAshlarTex() { return __ZC(467, 234, this, arguments, new.target); }
function poeNdStone(col, em) { var k = "ndStone" + col + ":" + em; if (POE.mats[k])
return POE.mats[k]; var t = poeNdAshlarTex(); var m = new THREE.MeshLambertMaterial({ map: t, color: col, emissiveMap: t, emissive: new THREE.Color(em) }); m.userData.metre = 1; return (POE.mats[k] = m); }
function poeNdCanvasTex(key, w, h, fn, rep) { return __ZC(467, 235, this, arguments, new.target); }
function poeNdGlassTex() { return __ZC(467, 236, this, arguments, new.target); }
function poeNdRoseTex(n, key) { return __ZC(467, 237, this, arguments, new.target); }
function poeNdGlassM(inside, key) {
var k = "ndGlassM" + (inside ? 1 : 0) + key;
if (POE.mats[k])
return POE.mats[k];
var t = key === "lancet" ? poeNdGlassTex() : poeNdRoseTex(key === "west" ? 12 : 24, "ndRose" + key);
return (POE.mats[k] = new THREE.MeshBasicMaterial({ map: t, color: inside ? 0xC8C8D8 : 0x5A5260, fog: true }));
}
function poeNdFrontTex() { return __ZC(467, 238, this, arguments, new.target); }
function poeNdFrontM() {
var k = "ndFrontM";
if (POE.mats[k])
return POE.mats[k];
var t = poeNdFrontTex();
t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
t.repeat.set(1 / 41, 1 / 43);
t.offset.set(0.5, 0);
return (POE.mats[k] = new THREE.MeshLambertMaterial({ map: t, emissiveMap: t, emissive: new THREE.Color(0x8A8270) }));
}
var POE_ND_PAINT = [
function (x, W, H) { return __ZC(467, 239, this, arguments, new.target); },
function (x, W, H) { return __ZC(467, 240, this, arguments, new.target); },
function (x, W, H) { return __ZC(467, 241, this, arguments, new.target); }
];
function poeNdOutside(R, q, C, a, solidW) { return __ZC(467, 242, this, arguments, new.target); }
function poeNdFlyer(mat) { return __ZC(467, 243, this, arguments, new.target); }
var POE_ND = { door: null };
POE_ROOMS.push({ k: "x_nd", n: "Notre-Dame de Paris", custom: 1, w: 136, d: 56, h: 34, dark: 1.5, doors: [] });
(function () { var n = POE_ROOMS.length, R = POE_ROOMS[n - 1]; R.i = n - 1; R.x = POE_IN_X + 75000; POE_RX.x_nd = R; })();
function poeNdEnter() { poeEnterRoom("x_nd", "par:nd", { x: -48.6, z: 0, ry: -Math.PI / 2 }); }
function poeNdOut() { var D = POE_ND.door, PR = POE_RX.x_paris; if (!D || !PR) {
poeOutside("out:par_gate");
return;
} poeOutside(null, { x: PR.x + D.x, z: D.z, ry: D.ry, par: 1 }); }
POE_RB.x_nd = function (R, g) { return __ZC(467, 244, this, arguments, new.target); };
function poeNdWhere() {
var L = worldLocal(), R = POE_RX.x_nd;
if (!R)
return "the nave";
var x = L.x - R.x, z = L.z;
return x > 36 ? "the sanctuary" : x > 10 ? (Math.abs(z) < 7 ? "the choir" : "the ambulatory") : x > -4 ? (Math.abs(z) > 20 ? (z < 0 ? "the south transept" : "the north transept") : "the crossing") : Math.abs(z) < 7 ? "the nave" : "the aisles";
}
function poeNdChapel(P, bx, s, i) { return __ZC(467, 245, this, arguments, new.target); }
function poeNdChairs(P, lite) { return __ZC(467, 246, this, arguments, new.target); }
var POE_ND_FOLK = [
[-48.6, -2.6, Math.PI / 2, "gent", "m", "The Suisse of Notre-Dame", "the beadle (the Suisse) of Notre-Dame de Paris in 1841, in his red-and-blue uniform, plumed hat and sword, with his halberd and his silver-headed staff; he keeps order in the cathedral, leads processions and chases out dogs and beggars", "the cathedral, its offices and processions, the Archbishop (Monseigneur Affre), the crowds who come since Monsieur Hugo's novel, the damage of 1793", "Monsieur. Hat off, if you please: this is the house of Our Lady. Walk where you like, but quietly."],
[-46, -11.8, 0.2, "workman", "m", "Old Mathurin, the bell-ringer", "the old bell-ringer of the towers of Notre-Dame in 1841, who has rung the bells for forty years; he lives up among the bells and knows every stair and gallery (387 steps to the top of the towers); he speaks of the great bourdon Emmanuel in the south tower, recast in 1686, which takes several men to swing, and of the other bells melted down in the Revolution; and of Monsieur Victor Hugo's novel (1831) about a deaf hunchbacked ringer called Quasimodo who loved the gypsy girl Esmeralda in 1482. He tells it as half a true story of the towers. Gruff, kind, a little deaf himself", "the bells and the towers, Emmanuel, the view of Paris from the galleries, the old stories, Hugo's Quasimodo and Esmeralda", "Eh? You want the towers? Three hundred and eighty-seven steps. The bells don't mind visitors. Mind you don't stand by Emmanuel when she swings."],
[7.6, -11.4, Math.PI * 0.8, "poorf", "f", "Mère Toinette, the chair-woman", "the old woman who lets the chairs of the nave at Notre-Dame in 1841 (one sou a chair, two on feast days) and sells candles at the stand before the Virgin", "the chairs, the candles, the sermons of the Lent preachers (Father Lacordaire preached here in 1835), the crowds, the Virgin who answers prayers", "A chair, monsieur? A sou. A candle for the Virgin? Two. She hears everyone, but she hears better with a candle."],
[38.6, -2.4, -Math.PI / 2, "gent", "m", "The Abbé Morel", "a canon of Notre-Dame in 1841, saying Compline at the end of the day; learned and gentle", "the history of the cathedral (Maurice de Sully began it in 1163), the Vow of Louis XIII, the Coronation of 1804, the Revolution's Temple of Reason, the sad state of the stones and the hope of restoring them", "Good evening, my son. You come late, but Our Lady keeps late hours. What brings you?"],
[-6.4, -6.0, Math.PI * 0.25, "gent", "m", "Monsieur Ferdinand, a student of architecture", "a young student of the École des Beaux-Arts in 1841 who draws the cathedral every evening; he has read Hugo's 'Guerre aux démolisseurs' and the novel, and longs to see the cathedral restored (the government will soon hold a competition for it); he deplores the 18th-century whitewash, the smashed statues, the lost spire", "gothic architecture, the measured drawings he makes, the rose windows, the master masons, Hugo's novel, the spire taken down in 1786", "Look at that vault! Thirty-three metres, and they built it with ropes and wooden cranes in 1180. I draw it every night, and every night I find a new stone."],
[10.2, -10.8, Math.PI, "poorf", "f", "A washerwoman praying", "a washerwoman of the Cité in 1841 who comes every evening to light a candle before the Virgin for her son, a sailor at sea", "her son, the river, the Virgin, the miracles people tell of", "Shh. I am saying my prayer for my Jean. He is on the sea, off Algiers."],
[-30, 0.0, -Math.PI / 2, "lady", "f", "Madame de Lusignan", "a pious lady of the Faubourg Saint-Germain in 1841 who has come to hear the end of the office", "the sermon, the Archbishop, the society of the faubourg, the wickedness of novels (she has secretly read Hugo's)", "Good evening. You are not from Paris. Have you come to see the cathedral of the novel? Everyone has, now."],
[-20, -15, Math.PI / 2, "workman", "m", "A mason of the cathedral", "a mason who patches the stones of Notre-Dame in 1841, a little on his own account; he knows where the water comes in and which gargoyle has cracked", "the stones, the water, the scaffolds, the old marks of the masons of the thirteenth century", "Evening. See this joint? Six hundred years and it still holds. The new plaster round it won't last ten."],
[26, -9.6, Math.PI, "servant", "m", "The sacristan", "the sacristan of Notre-Dame in 1841, putting out and lighting candles and keeping the treasury of relics (the Crown of Thorns is kept here since 1806)", "the treasury, the Crown of Thorns, the candles, the vestments, the hours of the offices", "The treasury is closed now, monsieur. Come in the morning: you may see the Crown of Thorns, on Fridays in Lent."]
];
function poeNdPeople(R, lite) { return __ZC(467, 247, this, arguments, new.target); }
function poeNdTower() { return __ZC(467, 248, this, arguments, new.target); }
function poeTextNow() { return POE.text || null; }
function poeTextWarm() { if (POE.text || POE.textAsk)
return; POE.textAsk = 1; try {
poeTextLoad(function (D) { if (D && D.tales)
POE.text = D; });
}
catch (e) { } }
function poeSentences(t) { return t.match(/[^.!?]+[.!?]+["”’)]*\s*|[^.!?]+$/g) || [t]; }
function poeQraw(key, needle, n) {
var D = poeTextNow(), T = D && D.tales[key];
if (!T)
return "";
var P = T.p;
for (var i = 0; i < P.length; i++) {
var at = P[i].indexOf(needle);
if (at < 0)
continue;
var S = poeSentences(P[i].slice(at));
return S.slice(0, n || 1).join("").trim();
}
return "";
}
function poeQ(key, needle, n) { var t = poeQraw(key, needle, n); if (!t)
return ""; return "<p style='margin:6px 0;font-style:italic'>“" + poeEsc(t).replace(/\n/g, "<br>") + "”</p>"; }
function poeStanza(key, i) { var D = poeTextNow(), T = D && D.tales[key]; if (!T || !T.p[i])
return ""; return "<p style='margin:6px 0;font-style:italic;line-height:1.45'>" + poeEsc(T.p[i]).replace(/\n/g, "<br>") + "</p>"; }
function poeNote(t) { return "<p style='margin:6px 0;font-size:13px;opacity:.85'>" + t + "</p>"; }
var POE_LOOK = {};
function poeHook(n, a) { return __ZC(467, 249, this, arguments, new.target); }
POE.onDoor = function (R, D) { return __ZC(467, 250, this, arguments, new.target); };
function poeWait(sec, fn) { return __ZC(467, 251, this, arguments, new.target); }
function poeSec(s) { return window.POE_FAST ? Math.min(s, 0.05) : s; }
function poeSpotOnce(key, x, z, r, name, verb, fn, y) { POE.once = POE.once || {}; if (POE.once[key] && POE.spots.indexOf(POE.once[key]) >= 0)
return POE.once[key]; return (POE.once[key] = poeSpot(x, z, r, name, verb, fn, y)); }
function poeRoomSpot(k, key, lx, lz, r, name, verb, hook, arg) { var R = poeRoomGet(k); if (!R)
return null; return poeSpotOnce(k + ":" + key, R.x + lx, lz, r, name, verb, function () { poeHook(hook || key, arg); }, 0); }
function poeMove(P, k, x, z, ry) { return __ZC(467, 252, this, arguments, new.target); }
function poeHide(P) { if (P && P.g)
P.g.visible = false; }
function poeCast(key, k, x, z, ry, o) {
if (POE.cast[key]) {
poeMove(POE.cast[key], k, x, z, ry);
return POE.cast[key];
}
var P;
if (k) {
var R = poeRoomGet(k);
P = poeRoomPerson(R, key, x, z, ry, o);
}
else
P = poePerson(key, x, z, ry, o);
POE.cast[key] = P;
return P;
}
function poeLay(P, on) { if (!P)
return; P.g.rotation.x = on ? -Math.PI / 2 : 0; P.g.position.y = (P.y || 0) + (on ? 0.25 : 0); }
function pDo(h, at, hook, fn, o) {
var st = { k: "puzzle", h: h, at: at, start: function (f, done) { POEB.done = done; if (st.begin)
st.begin(f); }, hooks: {} };
(Array.isArray(hook) ? hook : [hook]).forEach(function (hk) { st.hooks[hk] = function (a, f) { return fn(a, f, function () { var d = POEB.done; POEB.done = null; if (d)
d(); }, hk); }; });
return Object.assign(st, o || {});
}
function pSlow(h, at, hook, n, gap, o) {
o = o || {};
var st = pDo(h, at, hook, function (a, f, done) {
var now = performance.now() / 1000, last = POEB.slowT || 0;
f.slow = f.slow || 0;
if (!window.POE_FAST && last && now - last < gap) {
f.slow = Math.max(0, f.slow - (o.back || 2));
POEB.slowT = now;
poeSave();
if (o.hasty)
o.hasty(f);
else
poeSay("Too quick. " + (o.hastyT || "Slowly, slowly."));
return;
}
POEB.slowT = now;
f.slow++;
if (o.each)
o.each(f.slow, f);
if (f.slow >= n) {
f.slow = 0;
POEB.slowT = 0;
done();
}
else
poeSave();
}, o);
st.bar = function (f) { return (f.slow || 0) + " of " + n; };
st.auto = function (f) { for (var i = 0; i < n + 1; i++) {
POEB.slowT = 0;
if (poeStep() === st)
poeHook(Array.isArray(hook) ? hook[0] : hook);
} };
return st;
}
function pOrder(h, title, intro, lines, o) {
var st = { k: "puzzle", h: h, start: function (f, done) {
f.ord = f.ord || 0;
var k = poeKey();
function show(msg) {
if (poeKey() !== k)
return;
if (f.ord >= lines.length) {
done();
return;
}
var rest = [];
for (var i = f.ord; i < lines.length; i++)
rest.push(i);
var R = wRand(lines.length * 31 + f.ord * 7 + 3);
rest.sort(function () { return R() - 0.5; });
var html = intro + (f.ord ? "<div style='margin:6px 0;opacity:.8;font-style:italic'>" + lines.slice(0, f.ord).map(function (l) { return poeEsc(l); }).join("<br>") + "</div>" : "") + (msg ? poeNote(msg) : "") + poeNote("Which comes next?");
poeCard(title, html, rest.map(function (i) { return [lines[i], "", function () { if (i === f.ord) {
f.ord++;
poeSave();
show("");
}
else
show("Not yet that one."); }]; }));
}
st.show = show;
show("");
},
tick: function () { var open = WLD.card && WLD.card.style.display === "block"; if (!open && st.show && !POE.moving) {
st.reopen = (st.reopen || 0) + 1;
if (st.reopen > 90) {
st.reopen = 0;
st.show("");
}
} },
auto: function (f) { f.ord = lines.length; worldCard(null); if (st.show)
st.show(""); } };
return Object.assign(st, o || {});
}
function pQuiz(title, html, opts, o) { return pAsk(title, html, opts.map(function (O) { return [O[0], O[1] || "", O[2] ? null : false, O[3] || "No. Think again."]; }), o); }
POE_LOOK.lore = ["A quaint and curious volume of forgotten lore", function () { return poeStanza("raven", 0); }];
POE_LOOK.cushion = ["The velvet-cushioned seat", function () { return poeQ("raven", "This I sat engaged in guessing", 1) || poeNote("Velvet, violet, under the lamp-light."); }];
POE_LOOK.lattice = ["The window lattice", function () { return poeNote("The shutter is fast. Something taps at it, gently."); }];
POE_LOOK.portrait = ["A portrait, veiled in black crape", function () { return poeNote("The rare and radiant maiden whom the angels name Lenore: nameless here for evermore."); }];
POE_LOOK.guitar = ["Roderick's guitar", function () { return poeQ("usher", "It was, perhaps, the narrow limits", 1); }];
POE_LOOK.painting = ["One of Roderick's paintings", function () { return poeQ("usher", "If ever mortal painted an idea", 1); }];
POE_LOOK["painting-vault"] = ["A painting: a vault, white, without outlet", function () { return poeQ("usher", "A small picture presented the interior", 3); }];
POE_LOOK.rod = ["The lightning-rod", function () { return poeQ("morgue", "About five feet and a half from the casement", 1); }];
POE_LOOK.gazette = ["The Gazette des Tribunaux", function () { return poeQ("morgue", "EXTRAORDINARY MURDERS.", 2); }];
POE_LOOK.lantern = ["The dark lantern", function () { return poeQ("heart", "And every night, about midnight", 2); }];
POE_LOOK.flambeau = ["A flambeau in its sconce", function () { return poeQ("cask", "I took from their sconces two flambeaux", 1); }];
POE_LOOK.medoc = ["A bottle of Medoc", function () { return poeQ("cask", "A draught of this Medoc will defend us", 1); }];
POE_LOOK.degrave = ["A flagon of De Grâve", function () { return poeQ("cask", "I broke and reached him a flagon of De Grave", 1) || poeNote("De Grâve. He emptied it at a breath."); }];
POE_LOOK.bones = ["A pile of bones", function () { return poeQ("cask", "Its walls had been lined with human remains", 1); }];
POE_LOOK.wall = ["The recess", function () { return poeQ("cask", "in depth about four feet", 1) || poeQ("cask", "Within the wall thus exposed", 2); }];
POE_LOOK.brazier = function (i) { var M = POE_MASQ[i || 0]; poeCard("The " + M[1] + " window", poeQ("masque", "But in the corridors that followed the suite", 2)); };
["win1", "win2", "chimney", "hearth", "razor", "gold", "bureau", "yard", "advert"].forEach(function (k) { POE_LOOK[k] = ["The Rue Morgue", function () { return poeQ("morgue", "The apartment was in the wildest disorder", 2); }]; });
[["m_suite", function (dt) { poeSuiteTick(dt); }], ["p_dungeon", function (dt) { poeDungeonTick(dt); }], ["c_vaults", function (dt) { poeVaultTick(dt); }]].forEach(function (T) { var a = POE_RB[T[0]]; if (a)
POE_RB[T[0]] = function (R, g) { a(R, g); R.tick = T[1]; }; });
function poeAim(x, z) { var L = worldLocal(), a = Math.atan2(-(x - L.x), -(z - L.z)) - yaw; while (a > Math.PI)
a -= Math.PI * 2; while (a < -Math.PI)
a += Math.PI * 2; return Math.abs(a); }
function poeDoneNow() { var d = POEB.done; POEB.done = null; if (d)
d(); }
function poeP(key, a, b) { var D = poeTextNow(), T = D && D.tales[key]; if (!T)
return ""; var o = ""; for (var i = a; i <= (b == null ? a : b); i++)
if (T.p[i])
o += "<p style='margin:5px 0;font-style:italic'>" + poeEsc(T.p[i]) + "</p>"; return o; }
function poeFollow(P, on, gap) { return __ZC(467, 253, this, arguments, new.target); }
function poeRavenSay(q, then) { poeSfx("nevermore"); poeCard("The Raven", (q ? poeNote("You: " + q) : "") + "<p style='margin:8px 0;font-size:20px;font-style:italic;text-align:center'>“Nevermore.”</p>", [["…", "", then || null]]); }
function poeRavenSetup(f) { return __ZC(467, 254, this, arguments, new.target); }
POE_CH.push({ t: "The Raven", key: "raven", year: "1845", tune: "raven", jump: true, start: { room: "chamber", at: { x: -1.5, z: 2.6, ry: 0.4 } },
words: "“Once upon a midnight dreary, while I pondered, weak and weary, over many a quaint and curious volume of forgotten lore…”",
intro: "Midnight, in the bleak December. Your chamber. The lamp.",
warn: ["A poem of grief with no way out of it. All eighteen stanzas, lived.", "A sad, eerie poem: a bird, a lost love, one word."],
setup: poeRavenSetup,
hooks: {
ember: function () { poeCard("The dying embers", poeStanza("raven", 1)); },
curtain: function () { poeSfx("heart", { k: 0.5, bpm: 96 }); poeWait(6, function () { poeSfx("heartoff"); }); poeCard("The purple curtains", poeStanza("raven", 2)); },
bird: function () { var R = POE_RX.chamber; if (!R.raven.visible) {
poeSay("Only the bust of Pallas, pale above the door.");
return;
} poeRavenSay("", null); },
lattice: function () { poeSay("The shutter. Something taps at it."); poeSfx("tap"); },
lore: function () { poeCard("A quaint and curious volume of forgotten lore", poeStanza("raven", 0)); },
cushion: function () { poeSay("The cushion's velvet lining, that the lamp-light gloats over."); },
shadow: function () { poeSay("Its shadow, thrown by the lamp, lies on the floor."); }
},
door: function (R, D, f) { if (D[2] === "dark") {
poeSay("The chamber door.");
return true;
} if (D[2].indexOf("out:") === 0 && poeBS().s < POE_CH[0].steps.length - 1) {
poeLeaveAsk(D[2], "Not tonight. Not while that tapping goes on.");
return true;
} return false; },
end: function () { poeSfx("rainoff"); POE.sfxRain = false; },
steps: [
pRead(),
pSpot("A quaint and curious volume of forgotten lore", "Sit to your book by the lamp: a quaint and curious volume of forgotten lore", null, { done: function () { poeWait(1.5, function () { poeSfx("tap"); }); } }),
pCard("Midnight", function () { return poeStanza("raven", 0) + poeNote("A tapping. Gentle. At the chamber door."); }, "“’Tis some visitor,” I muttered"),
pSpot("The dying embers", "It is bleak December: go to the fire and watch the dying embers", null),
pGather("paper", { room: "chamber", lx: -1, lz: -1 }, 4, "A volume from your shelves", "Vainly you sought to borrow from your books surcease of sorrow: take down four of them", { spread: 3.2, each: "No comfort in that one." }),
pQuiz("Sorrow for the lost Lenore", "<p>Book after book, and no surcease. Whom do you mourn?</p>", [["The rare and radiant maiden whom the angels name Lenore", "Nameless here for evermore", true], ["A friend who has flown before", "", false, "Other friends have flown before; this is another sorrow."], ["No one. It is only the hour.", "", false, "You know it is not the hour."]]),
pSpot("The purple curtains", "The silken, sad, uncertain rustling of each purple curtain: go and stand by them", null, { on: function () { poeSfx("tap"); } }),
pStill(12, "Stand, to still the beating of your heart, repeating: “’Tis some visitor entreating entrance at my chamber door”", { at: { room: "chamber", lx: POE_RX.chamber.w / 2 - 1.3, lz: 2.8 }, r: 3, on: function () { poeSfx("heart", { k: 0.6, bpm: 104 }); }, done: function () { poeSfx("heartoff"); }, moved: function () { poeSay("Your heart will not be still while you pace. Stand."); } }),
pCard("Presently my soul grew stronger", function () { return poeStanza("raven", 3); }, "Open wide the door"),
pDo("Open wide the chamber door", { room: "chamber", lx: 0, lz: -POE_RX.chamber.d / 2 + 1.2 }, "x", function () { }, { door: function (R, D, f) { return __ZC(467, 255, this, arguments, new.target); }, auto: function () { poeStep().door(POE_RX.chamber, ["n", 0, "dark"], {}); } }),
pStill(14, "Deep into that darkness peering, long you stand there wondering, fearing: stand quite still", { noBeam: true, on: function () { POE.black = true; }, moved: function () { poeSay("Stand. Doubting, dreaming dreams no mortal ever dared to dream before."); } }),
pQuiz("The silence was unbroken", function () { return "<p>The stillness gives no token. One word only comes to your lips. You whisper it.</p>"; }, [["“Lenore?”", "", true], ["“Who is there?”", "", false, "That is not the word that was spoken."], ["“Nevermore.”", "", false, "Not yet. That word is not yours."]], { done: function () { POE.black = false; poeSfx("windoff"); } }),
pCard("And an echo murmured back the word", function () { return poeStanza("raven", 4) + poeStanza("raven", 5); }, "“Surely that is something at my window lattice”", { done: function () { poeSfx("tap"); poeWait(1.2, function () { poeSfx("tap"); }); } }),
pDo("The tapping again, somewhat louder, at the window lattice: fling open the shutter", { spot: "The window lattice" }, "lattice", function (a, f, done) {
var R = POE_RX.chamber;
poeSfx("lattice");
R.shutter.forEach(function (s, i) { s.rotation.y = i ? 1.9 : -1.9; });
R.raven.visible = true;
R.raven.position.set(R.w / 2 - 0.6, 2.1, 1.4);
var t = 0, A = poeEvery(function (dt) { t += dt / poeSec(2.2); var k = Math.min(1, t); R.raven.position.set((R.w / 2 - 0.6) * (1 - k), 2.1 + 1.22 * k + Math.sin(k * Math.PI) * 0.5, 1.4 + (-R.d / 2 + 0.32 - 1.4) * k); R.raven.rotation.y = -Math.PI / 2 * (1 - k); if (k >= 1) {
done();
return false;
} });
poeSfx("flutter");
}, { auto: function () { poeHook("lattice"); } }),
pCard("In there stepped a stately Raven", function () { return poeStanza("raven", 6); }, "Perched, and sat, and nothing more"),
pDo("This ebony bird beguiles your sad fancy into smiling: ask it its lordly name", { spot: "The Raven, on the bust of Pallas" }, "bird", function (a, f, done) { poeRavenSay("“Tell me what thy lordly name is on the Night’s Plutonian shore!”", done); }, { auto: function () { poeHook("bird"); worldCard(null); var d = POEB.done; POEB.done = null; if (d)
d(); } }),
pCard("Quoth the Raven", function () { return poeStanza("raven", 7) + poeStanza("raven", 8); }, "Marvel at the ungainly fowl"),
pQuiz("Nothing farther then he uttered", function () { return "<p>Not a feather then he fluttered. You scarcely more than mutter:</p>"; }, [["“Other friends have flown before. On the morrow he will leave me, as my Hopes have flown before.”", "", true], ["“It will stay with me for ever.”", "", false, "You do not yet believe that."], ["“It is no bird at all.”", "", false, "Not yet. You still think it a bird."]], { done: function () { poeSfx("nevermore"); } }),
pCard("Then the bird said", function () { return poeStanza("raven", 9); }, "Startled at the stillness broken"),
pQuiz("By reply so aptly spoken", function () { return "<p>One word, and so apt. You reason with yourself. What it utters is…</p>"; }, [["Its only stock and store, caught from some unhappy master whom unmerciful Disaster followed fast and followed faster", "", true], ["A prophecy meant for you", "", false, "Not yet. For a little longer you reason like a sane man."], ["An echo of your own voice", "", false, "The bird spoke. You heard it."]]),
pCard("Till the dirges of his Hope", function () { return poeStanza("raven", 10); }, "Wheel a cushioned seat in front of bird, and bust, and door"),
pDo("Wheel the cushioned seat in front of bird, and bust, and door, and sink into it", { spot: "The velvet-cushioned seat" }, "cushion", function (a, f, done) { var R = POE_RX.chamber; POE.lock = { x: R.x + 0.2, z: 0.8, y: -0.35, yaw: 0, noE: false }; pitch = 0.35; done(); }),
pCard("Upon the velvet sinking", function () { return poeStanza("raven", 11); }, "Sit, guessing"),
pStill(16, "Sit engaged in guessing, with the fowl’s fiery eyes burning into your bosom’s core", { noBeam: true, on: function () { var R = POE_RX.chamber; POE.lock = { x: R.x + 0.2, z: 0.8, y: -0.35, yaw: 0 }; }, done: function () { POE.lock = null; } }),
pCard("She shall press, ah, nevermore!", function () { return poeStanza("raven", 12); }, "Rise"),
pSpot("A portrait, veiled in black crape", "The cushion’s velvet lining that she shall press, ah, nevermore: go to her portrait", null, { hooks: { portrait: function () { poeCard("Lenore", "<p>You lift the crape. The rare and radiant maiden. The lamp-light gloats over her as it does over the violet velvet.</p>"); } } }),
pGather("wisp", { room: "chamber", lx: 0, lz: 0.5 }, 5, "A wreath of perfume from an unseen censer", "The air grows denser, perfumed from an unseen censer swung by seraphim: follow the foot-falls that tinkle on the tufted floor", { spread: 3.6, each: "Sweet, and heavy.", on: function () { poeSfx("chime", { k: 0.3 }); } }),
pDo("Cry out: “Respite, respite and nepenthe from thy memories of Lenore!”", { spot: "The Raven, on the bust of Pallas" }, "bird", function (a, f, done) { poeRavenSay("“Wretch, thy God hath lent thee, by these angels he hath sent thee, respite and nepenthe! Quaff, oh quaff this kind nepenthe and forget this lost Lenore!”", done); }, { auto: function () { worldCard(null); var d = POEB.done; POEB.done = null; if (d)
d(); } }),
pCard("Quoth the Raven", function () { return poeStanza("raven", 13); }, "“Prophet!”"),
pQuiz("Prophet! said I, thing of evil!", function () { return "<p>Prophet still, if bird or devil. On this home by Horror haunted, you implore it. What do you ask?</p>"; }, [["“Is there, is there balm in Gilead? Tell me, tell me, I implore!”", "", true], ["“Who sent thee?”", "", false, "You have named the sender already: Tempter, or tempest."], ["“Wilt thou leave me?”", "", false, "That comes after. First you ask if there is any healing."]], { done: function () { poeSfx("nevermore"); } }),
pCard("Quoth the Raven", function () { return poeStanza("raven", 14); }, "Ask the last thing"),
pDo("By that Heaven that bends above us: ask if you shall clasp her again within the distant Aidenn", { spot: "The Raven, on the bust of Pallas" }, "bird", function (a, f, done) { poeRavenSay("“Tell this soul with sorrow laden if, within the distant Aidenn, it shall clasp a sainted maiden whom the angels name Lenore!”", done); }, { auto: function () { worldCard(null); var d = POEB.done; POEB.done = null; if (d)
d(); } }),
pCard("Quoth the Raven", function () { return poeStanza("raven", 15); }, "Upstarting"),
pDo("“Be that word our sign of parting, bird or fiend!” Fling the lattice wide and drive it back into the tempest", { spot: "The window lattice" }, "lattice", function (a, f, done) { poeSfx("lattice"); poeSfx("wind"); poeWait(2.5, function () { poeSfx("windoff"); poeRavenSay("“Take thy beak from out my heart, and take thy form from off my door!”", done); }); }, { auto: function () { poeHook("lattice"); } }),
pCard("Quoth the Raven", function () { return poeStanza("raven", 16); }, "It does not move"),
pHold({ room: "chamber", lx: -1.2, lz: 0.6 }, 20, "The lamp-light o’er him streaming throws his shadow on the floor: go and stand in the shadow", { r: 1.6, on: function () { poeSfx("heart", { k: 0.35, bpm: 60 }); }, done: function () { poeSfx("heartoff"); } }),
pCard("And the Raven, never flitting", function () { return poeStanza("raven", 17); }, "Nevermore")
] });
function poeUsherRestore() { (POE.usherHalves || []).forEach(function (h) { h.rotation.z = 0; h.position.y = 0; h.visible = true; }); if (POE.usherFissure) {
POE.usherFissure.scale.x = 1;
POE.usherFissure.visible = true;
} if (POE.moon)
POE.moon.material.color.setHex(0xD8C8A0); POE.usherDown = false; }
function poeUsherSetup(f) { return __ZC(467, 256, this, arguments, new.target); }
var POE_PALACE = ["In the greenest of our valleys, by good angels tenanted…", "Banners yellow, glorious, golden, on its roof did float and flow…", "Wanderers in that happy valley through two luminous windows saw…", "And all with pearl and ruby glowing was the fair palace door…", "But evil things, in robes of sorrow, assailed the monarch’s high estate…", "And travellers now within that valley, through the red-litten windows, see…"];
var POE_USHER_BOOKS = ["the “Ververt et Chartreuse” of Gresset", "the “Belphegor” of Machiavelli", "the “Heaven and Hell” of Swedenborg", "the “Subterranean Voyage of Nicholas Klimm” by Holberg", "the “Chiromancy” of Robert Flud", "the “City of the Sun” of Campanella", "the “Directorium Inquisitorium” of Eymeric de Gironne", "the “Vigiliae Mortuorum secundum Chorum Ecclesiae Maguntinae”"];
function poeUsherFall(done) { return __ZC(467, 257, this, arguments, new.target); }
POE_CH.push({ t: "The Fall of the House of Usher", key: "usher", year: "1839", tune: "usher", jump: true, start: { x: POE_AT.usher.x + 4, z: POE_AT.usher.causeway.z0 + 26, ry: 0 },
words: "“During the whole of a dull, dark, and soundless day in the autumn of the year, when the clouds hung oppressively low in the heavens, I had been passing alone, on horseback, through a singularly dreary tract of country…”",
intro: "Evening. The melancholy House of Usher comes into view.",
warn: ["A living burial, a house that is a mind, and what comes up from the vault. Blood upon white robes.", "A haunted house, a sick friend, a storm. Frightening, told without the gore."],
setup: poeUsherSetup,
hooks: {
tarn: function () { poeCard("The tarn", poeQ("usher", "I reined my horse to the precipitous brink", 1)); },
eyes: function () { poeCard("The windows", poeQ("usher", "I looked upon the scene before me", 1)); },
fungi: function () { poeCard("The house", poeQ("usher", "Its principal feature seemed to be that of an excessive antiquity", 3)); },
fissure: function () { poeCard("The fissure", poeQ("usher", "Perhaps the eye of a scrutinizing observer", 1)); },
guitar: function () { poeCard("Roderick's guitar", poeQ("usher", "It was, perhaps, the narrow limits", 1)); },
painting: function () { poeCard("One of Roderick's paintings", poeQ("usher", "If ever mortal painted an idea", 2)); },
"painting-vault": function () { poeCard("A painting: a vault", poeQ("usher", "A small picture presented the interior", 3)); },
lid: function () { poeSay("The coffin, upon its tressels."); }, bed: function () { poeSay("Your bed, under the dark and tattered draperies."); },
casement: function () { poeSay("The casement, and the night beyond it."); }, trist: function () { poeSay("An antique volume. The “Mad Trist”."); },
shelf: function () { poeCard("The books of Roderick Usher", poeQ("usher", "Our books", 1)); }
},
end: function () { poeSfx("windoff"); },
steps: [
pRead(),
pSpot("The brink of the black and lurid tarn", "Rein your horse to the precipitous brink of the black and lurid tarn that lies in unruffled lustre by the dwelling", null),
pCard("An utter depression of soul", function () { return poeQ("usher", "I know not how it was", 2) + poeQ("usher", "I looked upon the scene before me", 1); }, "Look more narrowly at the real aspect of the building"),
pSpot("The vacant and eye-like windows", "Cross the causeway and look up at the vacant, eye-like windows", null),
pSpot("The minute fungi overspreading the whole exterior", "Look at the fungi hanging in a fine tangled web-work from the eaves", null),
pSpot("A barely perceptible fissure", "A scrutinizing observer might discover a fissure. Find it.", null),
pQuiz("The fissure", "<p>It runs from the roof of the building in front, down the wall in a zigzag direction. Where is it lost?</p>", [["In the sullen waters of the tarn", "", true], ["Under the Gothic archway of the hall", "", false, "Follow it lower."], ["Among the fungi of the eaves", "", false, "That is where it begins."]]),
pGo({ room: "u_hall" }, "A servant in waiting takes your horse: enter the Gothic archway of the hall"),
pTalk("The valet", "A valet, of stealthy step: let him conduct you", ["The valet", function () { return poeQ("usher", "A valet, of stealthy step", 2); }, "Follow him"]),
pTalk("The family physician", "On one of the staircases, the physician of the family: meet him", ["The family physician", function () { return poeQ("usher", "His countenance, I thought", 2); }, "Pass on"]),
pGo({ room: "u_studio" }, "The valet throws open a door and ushers you into the presence of his master"),
pCard("The studio", function () { return poeQ("usher", "The room in which I found myself was very large and lofty", 3) + poeQ("usher", "I felt that I breathed an atmosphere of sorrow", 2); }, "Usher rises from the sofa"),
pTalk("Roderick Usher", "Roderick Usher, the companion of your boyhood: greet him", ["Roderick Usher", function () { return poeQ("usher", "Surely, man had never before so terribly altered", 1) + poeQ("usher", "A cadaverousness of complexion", 1) + poeNote("He speaks of the object of your visit, of his earnest desire to see you, and of the solace he expects you to afford him."); }, "Ask him what ails him"]),
pQuiz("The nature of his malady", function () { return poeQ("usher", "It was, he said, a constitutional and a family evil", 1) + "<p>It displays itself in a host of unnatural sensations. What is it he suffers from?</p>"; }, [["A morbid acuteness of the senses", "", true], ["A wound taken in a duel", "", false, "There is no wound on him."], ["Nothing but too much wine", "", false, "He is beyond wine."]]),
pCard("A morbid acuteness of the senses", function () { return poeQ("usher", "He suffered much from a morbid acuteness of the senses", 1) + poeNote("So: the most insipid food; garments of a certain texture; no flowers; no light but the faintest; no sounds but those of stringed instruments. Make the house bearable for him."); }, "See to it"),
pGather("flower", { room: "u_hall", lx: 0, lz: 2 }, 5, "A bowl of flowers", "The odors of all flowers are oppressive to him: carry the flowers out of the hall", { spread: 7, each: "Out with it." }),
pGather("candle", { room: "u_studio", lx: 0, lz: 0 }, 4, "A taper too bright for him", "His eyes are tortured by even a faint light: put out the brighter tapers in the studio", { spread: 5, verb: "put it out", each: "Dimmer." }),
pQuiz("Sounds", function () { return "<p>There were but peculiar sounds which did not inspire him with horror. Which?</p>"; }, [["Those from stringed instruments", "", true], ["The tolling of a bell", "", false, "A bell would unman him."], ["The human voice, singing", "", false, "Not voices."]]),
pTalk("Roderick Usher", "Sit with him: he will tell you the rest", ["Roderick Usher", function () { return poeQ("usher", "I shall perish", 2) + poeQ("usher", "I have, indeed, no abhorrence of danger", 2) + poeQ("usher", "He admitted, however", 1); }, "“Her decease would leave him the last of the ancient race of the Ushers”"]),
pHold({ room: "u_studio", lx: 0, lz: 2 }, 9, "While he speaks, the lady Madeline passes slowly through a remote portion of the apartment: watch", { r: 7, on: function () { var M = POE.cast.madeline, R = POE_RX.u_studio; poeMove(M, "u_studio", -R.w / 2 + 1.2, -R.d / 2 + 1.6, Math.PI / 2); var t = 0; poeEvery(function (dt) { t += dt / poeSec(9); M.g.position.x = (-R.w / 2 + 1.2) + (R.w - 2.4) * Math.min(1, t); if (t >= 1) {
poeHide(M);
return false;
} }); } }),
pCard("The lady Madeline", function () { return poeQ("usher", "I regarded her with an utter astonishment", 2) + poeQ("usher", "The disease of the lady Madeline had long baffled", 2); }, "For several days her name is unmentioned"),
pSpot(/^One of Roderick/, "Days pass. You paint and read together. Look at what he paints", null),
pSpot("A painting: a vault, white, without outlet", "One of his phantasmagoric conceptions may be shadowed forth in words: find it", null),
pQuiz("The picture of the vault", "<p>An immensely long and rectangular vault or tunnel, with low walls, smooth, white, without interruption or device, at an exceeding depth below the surface of the earth. What lights it?</p>", [["Nothing: no outlet, no torch, yet a flood of intense rays rolls throughout", "A ghastly and inappropriate splendor", true], ["A single torch at the far end", "", false, "No torch was discernible."], ["A window high in the wall", "", false, "No outlet was observed in any portion."]]),
pSpot("Roderick's guitar", "Take up his guitar: hear the wild improvisations of his speaking guitar", null),
pOrder("Put the verses of “The Haunted Palace” in their order", "The Haunted Palace", "<p>One of his rhapsodies you remember well. It tells of a palace, and what came to it. Set its six verses in order, by their first lines.</p>", POE_PALACE),
pCard("The Haunted Palace", function () { return poeQ("usher", "I was, perhaps, the more forcibly impressed with it", 1) + poeNote("In the under or mystic current of its meaning you fancy that you perceive, and for the first time, a full consciousness on the part of Usher of the tottering of his lofty reason upon her throne."); }, "He speaks of the sentience of all vegetable things"),
pQuiz("The sentience of the stones", function () { return poeQ("usher", "The belief, however, was connected", 2) + "<p>Where does he say the evidence of the sentience is to be seen?</p>"; }, [["In the gradual yet certain condensation of an atmosphere of their own about the waters and the walls", "", true], ["In the cracks of the plaster", "", false, "He spoke of the tarn, and the air."], ["In the eyes of the portraits", "", false, "He spoke of the stones, the fungi, the still waters."]]),
pGo({ room: "u_library" }, "Our books: go with him to the library"),
pGather("book", { room: "u_library", lx: 0, lz: 0 }, 8, "One of the books of his mind", "Find the books which, for years, have formed no small portion of the mental existence of the invalid", { spread: 5, each: "Another." }),
pCard("Our books", function () { return "<p>You take them down, one by one:</p><p style='font-style:italic'>" + POE_USHER_BOOKS.join("; ") + ".</p>"; }, "Which was his chief delight?"),
pQuiz("His chief delight", "<p>An exceedingly rare and curious book in quarto Gothic, the manual of a forgotten church.</p>", [["The Vigiliae Mortuorum: the Watches of the Dead", "", true], ["The City of the Sun", "", false, "He pored over that; it was not his chief delight."], ["The Belphegor of Machiavelli", "", false, "Not that one."]]),
pTalk("Roderick Usher", "One evening he informs you abruptly that the lady Madeline is no more", ["Roderick Usher", function () { poeMove(POE.cast.roderick, "u_library", -2.6, 2.2, Math.PI); return poeQ("usher", "he stated his intention of preserving her corpse for a fortnight", 1) + poeQ("usher", "The brother had been led to his resolution", 1); }, "Aid him in the arrangements for the temporary entombment"], { at: { room: "u_library" }, on: function () { poeMove(POE.cast.roderick, "u_library", -2.6, 2.2, Math.PI); } }),
pGo({ room: "u_passage" }, "The body having been encoffined, you two alone bear it to its rest: down the stair, into the long archway", { on: function () { poeLockDoor("u_hall", "u_passage", null); }, done: function () { poeMove(POE.cast.roderick, "u_passage", 0.6, 14, Math.PI); } }),
pGo({ room: "u_vault" }, "Carry the coffin on: the door of massive iron, sheathed with copper", { on: function () { poeSfx("grating"); }, done: function () { var V = POE_RX.u_vault; V.coffin.visible = true; poeMove(POE.cast.roderick, "u_vault", 1.6, -1.2, -Math.PI / 2); } }),
pCard("The vault", function () { return poeQ("usher", "The vault in which we placed it", 2) + poeQ("usher", "The door, of massive iron", 1); }, "Set the burden upon the tressels"),
pDo("Partially turn aside the yet unscrewed lid of the coffin, and look upon the face of the tenant", { spot: "The yet unscrewed lid of the coffin" }, "lid", function (a, f, done) { poeCard("The face of the tenant", poeQ("usher", "A striking similitude between the brother and sister", 2) + poeQ("usher", "The disease which had thus entombed the lady", 1), [["Replace the lid", "", done]]); }, { auto: function () { poeHook("lid"); worldCard(null); var d = POEB.done; POEB.done = null; if (d)
d(); } }),
pSlow("Screw down the lid: four screws, each turned slowly home", { spot: "The yet unscrewed lid of the coffin" }, "lid", 4, 2.5, { each: function (n) { poeSfx("grating", { k: 0.3 }); poeSay("A screw driven home. " + n + " of 4."); }, hastyT: "The screw slips. Turn it slowly." }),
pGo({ room: "u_passage" }, "Secure the door of iron, and make your way, with toil, into the scarcely less gloomy apartments of the upper portion of the house", { done: function () { poeSfx("clang"); poeLockDoor("u_passage", "u_vault", "The door of massive iron is secured."); } }),
pGo({ room: "u_studio" }, "Some days of bitter grief elapse. Go and find your friend", { on: function () { poeMove(POE.cast.roderick, "u_studio", 2.5, 1, 2.2); POE.cast.roderick.wander = { r: 5, sp: 1.1 }; } }),
pTalk("Roderick Usher", "He roams from chamber to chamber with hurried, unequal, and objectless step: speak to him", ["Roderick Usher", function () { return poeQ("usher", "And now, some days of bitter grief having elapsed", 3) + poeQ("usher", "There were times, indeed, when I thought", 2); }, "His condition terrifies you; it infects you"]),
pGo({ room: "u_chamber" }, "The seventh or eighth night after the placing of the lady Madeline within the donjon: retire to your chamber", { done: function () { POE.cast.roderick.wander = null; POE.storm.t = 1; } }),
pDo("Lie down. Sleep comes not near your couch", { spot: "Your bed" }, "bed", function (a, f, done) { var R = POE_RX.u_chamber; POE.lock = { x: R.x - 2.6, z: -2.4, y: -0.6, yaw: Math.PI, pitch: 0.5 }; poeSfx("wind"); done(); }),
pStill(18, "Lie and hearken, you know not why, to certain low and indefinite sounds which come, through the pauses of the storm, at long intervals, you know not whence", { noBeam: true, on: function () { var R = POE_RX.u_chamber; POE.lock = { x: R.x - 2.6, z: -2.4, y: -0.6, yaw: Math.PI, pitch: 0.5 }; poeWait(5, function () { poeSfx("grating", { k: 0.15 }); }); poeWait(11, function () { poeSfx("stone", { k: 0.2 }); }); poeWait(15, function () { poeSfx("heart", { k: 0.3, bpm: 70 }); }); }, done: function () { POE.lock = null; poeSfx("heartoff"); } }),
pCard("An irrepressible tremor", function () { return poeQ("usher", "I struggled to reason off the nervousness", 1) + poeQ("usher", "Overpowered by an intense sentiment of horror", 1); }, "A light step on an adjoining staircase"),
pTalk("Roderick Usher", "He raps at your door and enters, bearing a lamp: “And you have not seen it?”", ["Roderick Usher", function () { return poeQ("usher", "His countenance was, as usual, cadaverously wan", 2) + poeQ("usher", "And you have not seen it?", 2); }, "He hurries to the casement"], { on: function () { var R = POE_RX.u_chamber; poeMove(POE.cast.roderick, "u_chamber", R.w / 2 - 1.8, 1.4, -Math.PI / 2); poeSfx("tap"); } }),
pDo("He has thrown the casement freely open to the storm: go to it", { spot: "The casement" }, "casement", function (a, f, done) { poeSfx("wind"); POE.storm.t = 0.5; poeCard("The casement", poeQ("usher", "The impetuous fury of the entering gust", 2) + poeQ("usher", "But the under surfaces of the huge masses", 1), [["“You must not, you shall not behold this!”", "Lead him, with a gentle violence, from the window to a seat", done]]); }, { auto: function () { poeHook("casement"); worldCard(null); var d = POEB.done; POEB.done = null; if (d)
d(); } }),
pDo("Close the casement, and take up one of his favourite romances: the “Mad Trist”", { spot: "The antique volume: the “Mad Trist” of Sir Launcelot Canning" }, "trist", function (a, f, done) { var R = POE_RX.u_chamber; poeMove(POE.cast.roderick, "u_chamber", 2.2, 2.8, Math.PI * 0.9); poeCard("The Mad Trist", poeQ("usher", "These appearances, which bewilder you", 2) + poeQ("usher", "I had arrived at that well-known portion of the story", 1), [["Read", "", done]]); }, { auto: function () { poeHook("trist"); worldCard(null); var d = POEB.done; POEB.done = null; if (d)
d(); } }),
pCard("“And Ethelred…”", function () { return poeQ("usher", "And Ethelred, who was by nature of a doughty heart", 1); }, "Pause", { done: function () { poeSfx("crash", { k: 0.25 }); } }),
pStill(7, "You start, and pause. From some very remote portion of the mansion: listen", { noBeam: true, on: function () { poeWait(2, function () { poeSfx("crash", { k: 0.2 }); }); } }),
pQuiz("The echo", function () { return poeQ("usher", "At the termination of this sentence I started", 1) + "<p>What was the sound in the tale that the house has echoed?</p>"; }, [["The cracking and ripping of the dry and hollow-sounding wood of the hermit’s door", "", true], ["The shriek of the dragon", "", false, "That is not yet read."], ["The shield falling upon the floor of silver", "", false, "That is not yet read."]]),
pCard("“But the good champion Ethelred…”", function () { return poeQ("usher", "But the good champion Ethelred", 1) + poeQ("usher", "And Ethelred uplifted his mace", 1); }, "Pause again", { done: function () { poeSfx("shriek", { k: 0.3 }); } }),
pStill(7, "A low and apparently distant, but harsh, protracted, and most unusual screaming or grating sound: listen", { noBeam: true, on: function () { poeWait(2, function () { poeSfx("grating", { k: 0.4 }); }); } }),
pTalk("Roderick Usher", "A strange alteration has taken place in his demeanor: look at him", ["Roderick Usher", function () { var R = POE_RX.u_chamber; POE.cast.roderick.g.rotation.y = Math.PI; return poeQ("usher", "From a position fronting my own", 3); }, "Resume the narrative"]),
pCard("“And now, the champion…”", function () { return poeQ("usher", "And now, the champion, having escaped", 1); }, "…", { done: function () { poeSfx("clang"); } }),
pStill(6, "A distinct, hollow, metallic, and clangorous, yet apparently muffled reverberation: you leap to your feet. Listen.", { noBeam: true }),
pQuiz("What he has heard for many days", function () { return poeQ("usher", "Not hear it?", 4) + "<p>The breaking of the hermit’s door, the death-cry of the dragon, the clangor of the shield. Say, rather:</p>"; }, [["The rending of her coffin, the grating of the iron hinges of her prison, and her struggles within the coppered archway of the vault", "", true], ["The storm, and nothing more", "", false, "He has heard it for many minutes, many hours, many days."], ["The servants, below", "", false, "There is no servant in that part of the house."]]),
pCard("“We have put her living in the tomb!”", function () { return poeQ("usher", "We have put her living in the tomb!", 3) + poeQ("usher", "Is she not hurrying to upbraid me", 3) + "<p style='font-size:17px;font-style:italic'>“Madman! I tell you that she now stands without the door!”</p>"; }, "Turn to the door"),
pUntil("The huge antique panels throw slowly back their ponderous and ebony jaws: turn and look at the door", function (f, dt) { var R = POE_RX.u_chamber, L = worldLocal(), a = Math.atan2(-(R.x + R.w / 2 - L.x), -(0 - L.z)) - yaw; while (a > Math.PI)
a -= 6.283; while (a < -Math.PI)
a += 6.283; return Math.abs(a) < 0.5 || window.POE_FAST; }, { room: "u_chamber", lx: POE_RX.u_chamber.w / 2 - 1, lz: 0 }, { on: function () { poeSfx("wind"); var R = POE_RX.u_chamber; poeHide(POE.cast.madeline); POE.cast.madeline = poeCast("madeline2", "u_chamber", R.w / 2 - 0.9, 0, -Math.PI / 2, { name: "The lady Madeline of Usher", role: "madeline", sex: "f", look: { skin: 0xF2E8E4, hair: 0x2A1A14, long: 1, _blood: poeAdult() ? 1 : 0 } }); poeSfx("grating"); } }),
pCard("The lady Madeline of Usher", function () { return poeQ("usher", "without those doors there did stand", 2) || poeQ("usher", "the lofty and enshrouded figure of the lady Madeline", 2); }, "…", { done: function () { return __ZC(467, 258, this, arguments, new.target); } }),
pCard("A corpse, and a victim to the terrors he had anticipated", function () { return poeQ("usher", "For a moment she remained trembling", 2); }, "Flee"),
pGo({ x: POE_AT.usher.x, z: POE_AT.usher.causeway.z0 + 10 }, "From that chamber, and from that mansion, flee aghast: out, and over the old causeway", { r: 6, on: function () { POE.storm.t = 0.3; poeLockDoor("u_hall", "u_passage", "No. Out. Out of this house."); } }),
pUntil("The storm is still abroad in all its wrath. A wild light shoots along the path: turn to see whence it comes", function (f) { var A = POE_AT.usher, L = worldLocal(), a = Math.atan2(-(A.x - L.x), -(A.z - L.z)) - yaw; while (a > Math.PI)
a -= 6.283; while (a < -Math.PI)
a += 6.283; return Math.abs(a) < 0.45 || window.POE_FAST; }, null, { noBeam: true, done: function (f) { poeUsherFall(null); } }),
pHold({ x: POE_AT.usher.x, z: POE_AT.usher.causeway.z0 + 10 }, 10, "The full, setting, and blood-red moon shines vividly through that once barely discernible fissure. Watch.", { r: 40 }),
pCard("The House of Usher", function () { return poeQ("usher", "While I gazed, this fissure rapidly widened", 1); }, "The deep and dank tarn closes, sullenly and silently")
] });
function poeHeartNight(on) {
POE.dim = !!on;
POE.roomLit = on ? 0.12 : 1.5;
var R = POE_RX.t_room, O = POE.cast.oldman;
if (!R || !R.g || !O)
return;
if (on) {
O.g.position.set(0.6, 0.62, -2.0);
O.g.rotation.set(-Math.PI / 2, 0, 0);
}
else {
O.g.rotation.set(0, 0.6, 0);
O.g.position.set(-1.2, 0, 1.2);
}
O.g.visible = true;
}
function poeHeartSetup(f) { return __ZC(467, 259, this, arguments, new.target); }
function poeHeartRay(R, dt, open) { var a = poeAim(R.x + 0.6, -2.8), k = Math.max(0, 1 - a / 0.5); if (R.ray)
R.ray.k = k * k * (open ? 1.6 : 0.9); if (R.eye)
R.eye.material.opacity = open && a < 0.14 ? 0.9 : 0; return a; }
function poeNightSteps(n) {
var last = n === 8, gap = last ? 5 : 3.5, turns = last ? 6 : 4, greet = ["“Good morning! And how have you passed the night?”", "“A fine morning, sir. You slept soundly?”", "“Up already! You rested well, I hope?”", "“Good day to you. No ill dreams?”", "“Another night gone, sir. How did you sleep?”", "“Good morning. The death-watches kept quiet for you?”", "“Good morning, sir! You look well rested.”"];
var A = [
pDo(n === 1 ? "Midnight. Take up the dark lantern, all closed, closed, so that no light shines out" : "Midnight, the " + ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"][n] + " night. Take up the dark lantern", { spot: "The dark lantern" }, "lantern", function (a, f, done) { poeHeartNight(true); poeSay("The lantern, shut. Now the latch of his door."); done(); }, { on: function () { poeHeartNight(true); } }),
pSlow(last ? "Upon the eighth night be more than usually cautious: turn the latch of his door. A watch’s minute hand moves more quickly than yours." : "Turn the latch of his door and open it, oh, so gently", { room: "t_house", lx: 1.4, lz: 3 }, "odoor", turns, gap, { each: function (k) { poeSay(k < turns ? "The door, a hair wider. " + k + " of " + turns + ". Wait. Then again." : "Wide enough for your head."); }, hasty: function () { poeSfx("grating", { k: 0.2 }); poeSay("The hinge creaks. Stand. Wait. Slower: slowly, very, very slowly, so that you may not disturb the old man’s sleep."); }, door: function (R, D) { if (D[2] === "t_room") {
poeHook("odoor");
return true;
} if (D[2].indexOf("out:") === 0) {
poeSay("Not tonight.");
return true;
} return false; }, auto: function () { for (var i = 0; i < turns + 1; i++) {
POEB.slowT = 0;
var b = poeStep();
if (b && b.hooks && b.hooks.odoor)
poeHook("odoor");
} } }),
pGo({ room: "t_room" }, "Put in the dark lantern, then thrust in your head. It takes you an hour to place your whole head within the opening.", { door: function (R, D) { if (D[2] === "t_room") {
poeEnterRoom("t_room", "t_house");
return true;
} return false; }, done: function () { var R = POE_RX.t_room; POE.lock = { x: R.x - R.w / 2 + 1.3, z: 0 }; } })
];
if (!last) {
A.push(pUntil("Undo the lantern cautiously, oh, so cautiously (for the hinges creak): turn the single thin ray until it falls upon the vulture eye", function (f, dt) { var R = POE_RX.t_room; POE.lock = { x: R.x - R.w / 2 + 1.3, z: 0 }; var a = poeHeartRay(R, dt, false); f.aim = a < 0.14 ? (f.aim || 0) + dt : 0; return f.aim > 2.5 || window.POE_FAST; }, null, { noBeam: true, done: function (f) { f.aim = 0; } }));
A.push(pCard("The eye is closed", function () { return poeQ("heart", "but I found the eye always closed", 1) || poeQ("heart", "And this I did for seven long nights", 1); }, "Draw back. Close the door. To bed.", { done: function () { var R = POE_RX.t_room; if (R.ray)
R.ray.k = 0; POE.lock = null; } }));
A.push(pDo("Back to your own room, and lie down till morning", { spot: "Your own bed" }, "mybed", function (a, f, done) { poeVeil(poeSec(1.2), function () { poeHeartNight(false); poeSfx("chime", { k: 0.4 }); }, poeSec(1)); done(); }, { door: function (R, D) { if (D[2].indexOf("out:") === 0) {
poeSay("Not tonight.");
return true;
} return false; } }));
A.push(pTalk("The old man", "When the day breaks, go boldly into the chamber and speak courageously to him, calling him by name in a hearty tone", ["The old man", "<p>You: " + greet[n - 1] + "</p>" + (n === 1 ? "<p>“Well enough, well enough. You are very good to an old man.”</p>" : n === 4 ? "<p>“I thought I heard the door, once. The wind, I dare say.”</p>" : n === 7 ? "<p>“Soundly. You are never kinder than you have been this week.”</p>" : "<p>“Soundly, soundly.”</p>") + (n === 7 ? poeQ("heart", "So you see he would have been a very profound old man", 1) : ""), "He suspects nothing"], { on: function () { poeHeartNight(false); } }));
}
return A;
}
var POE_HEART_STEPS = [
pRead(),
pCard("True!", function () { return poeQ("heart", "TRUE!", 5); }, "How calmly I can tell you the whole story"),
pGo({ room: "t_room" }, "Morning. Go in to the old man", { on: function () { poeHeartNight(false); } }),
pTalk("The old man", "Speak with the old man", ["The old man", function () { return "<p>“Good morning, good morning! Sit, sit. You are good company for an old man.”</p>" + poeQ("heart", "Object there was none", 4); }, "Then what is it?"]),
pQuiz("It haunted me day and night", function () { return poeQ("heart", "It is impossible to say how first the idea entered my brain", 1) + "<p>What is it about him?</p>"; }, [["His eye: the eye of a vulture, a pale blue eye, with a film over it", "Whenever it falls upon you, your blood runs cold", true], ["His gold", "", false, "For his gold you had no desire."], ["Some insult he gave you", "", false, "He had never given you insult."]]),
pCard("And so, by degrees", function () { return poeQ("heart", "I think it was his eye!", 3) + poeQ("heart", "Now this is the point", 5); }, "Be never kinder to the old man than during the whole week before"),
pTalk("The landlord", "Be kind to him: go down the street to the Black Horse and fetch him a bottle of porter", ["The landlord", "<p>“For the old gentleman? Take it, and welcome. A harmless soul. And you, friend: you look as though you had not slept.”</p><p>You: “I? I never slept better.”</p>", "Take the bottle"]),
pTalk("The old man", "Carry it back to him", ["The old man", "<p>“Porter! You spoil me. Never was a lodger so kind.”</p>", "Wait for midnight"])
];
[1, 2].forEach(function (n) { POE_HEART_STEPS = POE_HEART_STEPS.concat(poeNightSteps(n)); });
POE_HEART_STEPS.push(pTalk("The neighbour", "By day, be seen: pass the time of day with the neighbour", ["The neighbour", "<p>“Such a quiet house, yours. I never hear a sound from it. The old gentleman is well?”</p><p>You: “Never better. I see to him myself.”</p>", "Good day"]));
[3, 4].forEach(function (n) { POE_HEART_STEPS = POE_HEART_STEPS.concat(poeNightSteps(n)); });
POE_HEART_STEPS.push(pQuiz("Am I mad?", function () { return poeQ("heart", "You fancy me mad", 3) + "<p>You have looked in upon him four nights. Why have you not done the work?</p>"; }, [["Because the eye was always closed; and it is not the old man who vexes you, but his Evil Eye", "", true], ["Because you pity him", "", false, "Pity? You chuckle at heart."], ["Because you fear the police", "", false, "What have you to fear?"]]));
[5, 6, 7].forEach(function (n) { POE_HEART_STEPS = POE_HEART_STEPS.concat(poeNightSteps(n)); });
POE_HEART_STEPS = POE_HEART_STEPS.concat(poeNightSteps(8));
var POE_HEART_DEAD = POE_HEART_STEPS.length + 8;
POE_HEART_STEPS = POE_HEART_STEPS.concat([
pCard("The eighth night", function () { return poeQ("heart", "Never before that night had I felt the extent of my own powers", 4); }, "Open the lantern", { on: function () { var R = POE_RX.t_room; POE.lock = { x: R.x - R.w / 2 + 1.3, z: 0 }; } }),
pCard("My thumb slipped upon the tin fastening", function () { poeSfx("clang", { k: 0.15 }); var O = POE.cast.oldman; O.g.rotation.set(0, Math.PI, 0); O.g.position.set(0.6, 0.35, -2.4); return poeQ("heart", "I had my head in, and was about to open the lantern", 1) + "<p style='font-size:17px;font-style:italic'>“Who’s there?”</p>"; }, "Keep quite still and say nothing"),
pStill(30, "For a whole hour do not move a muscle. He is still sitting up in the bed, listening.", { noBeam: true, on: function () { var R = POE_RX.t_room; POE.lock = null; POE.lockSoft = 1; }, moved: function () { poeSay("He hears. “Who’s there?” Begin again: not a muscle."); poeSfx("heart", { k: 0.2, bpm: 70 }); poeWait(2, function () { poeSfx("heartoff"); }); } }),
pCard("The groan of mortal terror", function () { return poeQ("heart", "Presently I heard a slight groan", 4) + poeQ("heart", "All in vain; because Death", 1); }, "Open a little, a very, very little crevice in the lantern"),
pSlow("Open a very, very little crevice in the lantern: stealthily, stealthily", null, "crevice", 3, 3, { noBeam: true, begin: function () { poeSpotOnce("t:crev", POE_RX.t_room.x - POE_RX.t_room.w / 2 + 1.3, 0, 2.4, "The shutter of the lantern", "ease it open", function () { poeHook("crevice"); }, 0).off = false; }, each: function (k) { poeSay("A thread of light. " + k + " of 3."); }, hasty: function () { poeSay("The tin clicks. Wait. Stealthily."); } }),
pUntil("A single dim ray, like the thread of the spider, shoots from out the crevice: let it fall full upon the vulture eye", function (f, dt) { var R = POE_RX.t_room, a = poeHeartRay(R, dt, true); f.aim = a < 0.14 ? (f.aim || 0) + dt : 0; return f.aim > 2 || window.POE_FAST; }, null, { noBeam: true, on: function () { var S = POE.once && POE.once["t:crev"]; if (S)
S.off = true; }, done: function () { poeSfx("heart", { k: 0.3, bpm: 72 }); } }),
pCard("It was open, wide, wide open", function () { return poeQ("heart", "It was open", 3) + poeQ("heart", "And have I not told you", 2); }, "Refrain. Keep still."),
pStill(18, "Hold the lantern motionless. Try how steadily you can maintain the ray upon the eye. The hellish tattoo of the heart increases.", { noBeam: true, on: function () { var t = 0, k = poeKey(); poeEvery(function (dt) { if (poeKey() !== k)
return false; t += dt; if (Math.floor(t / 4) !== Math.floor((t - dt) / 4))
poeSfx("heart", { k: Math.min(1, 0.3 + t * 0.04), bpm: 72 + t * 5 }); }); }, moved: function () { poeSay("Still! Scarcely breathe."); } }),
pDo("The old man’s hour has come! With a loud yell, throw open the lantern and leap into the room", { spot: "The old man's bed" }, "bedside", function (a, f, done) { poeSfx("shriek"); poeVeil(poeSec(0.5), function () { var R = POE_RX.t_room, O = POE.cast.oldman; O.g.visible = false; if (R.bed)
R.bed.position.y = 0.02; if (R.ray)
R.ray.k = 0; if (R.eye)
R.eye.material.opacity = 0; POE.roomLit = 0.5; poeSfx("heart", { k: 0.25, bpm: 60 }); }, poeSec(1.5)); done(); }, { on: function () { POE.lock = null; } }),
pCard("He shrieked once, once only", function () { return poeA(poeQ("heart", "He shrieked once", 3), "<p>He shrieked once, once only. Then it was over, and you smiled gaily, to find the deed so far done.</p>") + poeQ("heart", "But, for many minutes, the heart beat on", 2); }, "Wait"),
pHold({ room: "t_room", lx: 0.6, lz: -0.9 }, 10, "The heart beats on with a muffled sound. This does not vex you; it will not be heard through the wall. Stand over the bed until it ceases.", { r: 2.2, done: function () { poeSfx("heartoff"); } }),
pCard("Stone, stone dead", function () { return poeQ("heart", "At length it ceased", 5) + poeQ("heart", "If still you think me mad", 2) + poeA(poeQ("heart", "First of all I dismembered the corpse", 2), ""); }, "The planks"),
pSlow("Take up three planks from the flooring of the chamber", { spot: "Three planks of the flooring" }, "planks", 3, 2, { each: function (k) { var R = POE_RX.t_room; R.planks[k - 1].visible = false; R.under.visible = true; poeSfx("stone", { k: 0.2 }); poeSay("A plank up. " + k + " of 3."); }, hastyT: "Quietly. In silence." }),
pCard("Between the scantlings", function () { return poeQ("heart", "I then took up three planks", 1); }, "Replace the boards"),
pSlow("Replace the boards so cleverly, so cunningly, that no human eye (not even his) could detect any thing wrong", { spot: "Three planks of the flooring" }, "planks", 3, 2, { each: function (k) { var R = POE_RX.t_room; R.planks[k - 1].visible = true; if (k === 3)
R.under.visible = false; poeSay("A plank down. " + k + " of 3."); }, hastyT: "Cunningly. Not a mark." }),
pCard("A tub had caught all", function () { poeSfx("chime"); poeWait(1.2, function () { poeSfx("chime"); }); poeWait(2.4, function () { poeSfx("chime"); }); poeWait(3.6, function () { poeSfx("chime"); poeSfx("tap"); }); if (POE_RX.t_room.bed)
POE_RX.t_room.bed.position.y = 0; return poeQ("heart", "There was nothing to wash out", 3) + poeQ("heart", "When I had made an end of these labors", 2); }, "Go down to open it with a light heart"),
pGo({ room: "t_house", lx: 0, lz: 5.5 }, "Four o’clock, still dark as midnight. A knocking at the street door: go down to open it", { r: 2.5, on: function () { return __ZC(467, 260, this, arguments, new.target); } }),
pTalk("An officer of the police", "Three men, who introduce themselves, with perfect suavity, as officers of the police", ["An officer of the police", function () { return poeQ("heart", "A shriek had been heard by a neighbour", 1); }, "Smile. What have you to fear?"]),
pQuiz("The shriek", "<p>“And the shriek, sir?”</p>", [["“The shriek was my own, in a dream.”", "", true], ["“I heard no shriek.”", "", false, "A neighbour heard it. Deny it and they will wonder."], ["“It was the old man.”", "", false, "Never name him so."]]),
pQuiz("The old man", "<p>“And the old gentleman who lives here?”</p>", [["“The old man is absent in the country.”", "", true], ["“He is asleep; do not wake him.”", "", false, "They would ask to look in upon him."], ["“There is no old man.”", "", false, "The whole street knows him."]]),
pGo({ room: "t_room" }, "Take your visitors all over the house. Bid them search: search well. Lead them, at length, to his chamber.", { door: function (R, D) { return false; }, done: function () { var R = POE_RX.t_room; ["off1", "off2", "off3"].forEach(function (k, i) { poeMove(POE.cast[k], "t_room", -1.4 + i * 1.2, 2.4, Math.PI); }); POE.roomLit = 1.2; } }),
pSpot("The old man's treasures", "Show them his treasures, secure, undisturbed", null, { hooks: { treasures: function () { poeCard("His treasures", "<p>His watch. His purse, heavy. His papers. Not a thing has been touched.</p>"); } } }),
pGather("chair", { room: "t_room", lx: 0.4, lz: 1.2 }, 3, "A chair", "In the enthusiasm of your confidence, bring chairs into the room, and desire them here to rest from their fatigues", { spread: 1.8, verb: "set it down for an officer", each: "“Sit, sir, sit.”" }),
pDo("In the wild audacity of your perfect triumph, place your own seat upon the very spot beneath which reposes the corpse of the victim", { spot: "Three planks of the flooring" }, "planks", function (a, f, done) { var R = POE_RX.t_room; POE.lock = { x: R.x - 0.06, z: 1.0, y: -0.4, yaw: 0 }; ["off1", "off2", "off3"].forEach(function (k, i) { poeMove(POE.cast[k], "t_room", -1.6 + i * 1.5, -0.6, 0); }); done(); }),
pCard("The officers were satisfied", function () { return poeQ("heart", "The officers were satisfied", 5); }, "They sit, and still chat", { done: function () { poeSfx("heart", { k: 0.15, bpm: 66 }); } }),
pQuiz("A ringing in your ears", "<p>Your head aches. You fancy a ringing in your ears. They sit and still chat. What do you do?</p>", [["Talk more freely, to get rid of the feeling", "", true], ["Ask them to go", "", false, "And have them wonder why? Talk."], ["Sit silent", "", false, "Silence would be noticed. Talk."]], { done: function () { poeSfx("heart", { k: 0.3, bpm: 78 }); } }),
pQuiz("It is not within your ears", "<p>It continues and becomes more distinct: a low, dull, quick sound, much such a sound as a watch makes when enveloped in cotton. You gasp for breath. And yet the officers hear it not.</p>", [["Talk more quickly, more vehemently", "", true], ["Stop your ears", "", false, "It is not within your ears."], ["Laugh", "", false, "Not yet. Talk."]], { done: function () { poeSfx("heart", { k: 0.5, bpm: 92 }); } }),
pQuiz("The noise steadily increases", "<p>Why will they not be gone?</p>", [["Arise and argue about trifles, in a high key and with violent gesticulations", "", true], ["Offer them more porter", "", false, "The noise steadily increases."], ["Sit still", "", false, "You cannot sit still."]], { done: function () { POE.lock = null; poeSfx("heart", { k: 0.7, bpm: 108 }); } }),
pGather("pace", { room: "t_room", lx: 0, lz: 0.6 }, 6, "The floor", "Pace the floor to and fro with heavy strides, as if excited to fury by the observations of the men", { spread: 2.6, verb: "stride across it", each: "Louder. Louder!", pts: [[-2.2, 0.8], [2.2, 0.4], [-2.0, -0.2], [2.0, 1.4], [-1.6, 1.8], [1.8, -0.4]] }),
pDo("Foam. Rave. Swear. Swing the chair upon which you have been sitting, and grate it upon the boards", { spot: "Three planks of the flooring" }, "planks", function (a, f, done) { poeSfx("grating"); poeSfx("heart", { k: 0.9, bpm: 124 }); poeCard("Louder! Louder! Louder!", poeQ("heart", "Oh God! what could I do?", 3) + poeQ("heart", "Was it possible they heard not?", 6), [["“Villains!”", "", done]]); }, { auto: function () { poeHook("planks"); } }),
pCard("The beating of his hideous heart", function () { poeSfx("heart", { k: 1, bpm: 140 }); var R = POE_RX.t_room; R.planks.forEach(function (p) { p.visible = false; }); R.under.visible = true; return "<p style='font-size:17px;font-style:italic'>“Villains! dissemble no more! I admit the deed! Tear up the planks! here, here! It is the beating of his hideous heart!”</p>"; }, "…", { done: function () { poeSfx("heartoff"); } })
]);
POE_CH.push({ t: "The Tell-Tale Heart", key: "heart", year: "1843", tune: "dread", jump: true, start: { room: "t_mine", at: { x: 0.5, z: 1.2, ry: 0 } },
words: "“True! nervous, very, very dreadfully nervous I had been and am; but why will you say that I am mad?”",
intro: "A quiet house. A kind old man. His eye.",
warn: ["A murder told by the murderer. Eight nights at a door, and what lies under the floor.", "A frightening tale of guilt: eight nights at a door, and a sound that will not stop. Told without the gore."],
setup: poeHeartSetup,
hooks: { lantern: function () { poeSay("The dark lantern. By day it stays shut."); }, planks: function () { poeSay("The boards of the floor."); }, bedside: function () { poeSay("His bed."); }, treasures: function () { poeSay("His watch, his purse, his papers."); }, mybed: function () { poeSay("Your bed."); } },
end: function () { poeHeartNight(false); POE.roomLit = null; POE.dim = false; poeSfx("heartoff"); ["off1", "off2", "off3"].forEach(function (k) { poeHide(POE.cast[k]); }); },
steps: POE_HEART_STEPS });
function poeMasqueSetup(f) { return __ZC(467, 261, this, arguments, new.target); }
var POE_MASQ_LIT = 0;
function poeMasqHour(n, room) {
var nm = POE_MASQ[room][1];
return [
pGather("wisp", function () { var R = POE_RX.m_suite, C = R.cells[room]; return { room: "m_suite", lx: C.x, lz: C.z }; }, 4, "A partner in the dance", "The waltzers whirl in the " + nm + " chamber: join the dance there, four partners", { spread: 4.5, verb: "take a turn", each: "On, and on." }),
pStill(Math.max(6, n), "The clock! " + n + " strokes. The musicians pause; the waltzers perforce cease their evolutions. Stand still till the echoes have fully ceased.", { noBeam: true, on: function () { var R = POE_RX.m_suite; (R.folk || []).forEach(function (P) { P.wanderHold = P.wander; P.wander = null; }); for (var i = 0; i < n; i++)
(function (i) { poeWait(i * 1.0, function () { poeSfx("chime", { k: 0.9 }); }); })(i); }, moved: function () { poeSay("The giddiest grow pale; you alone are moving. Stand."); }, done: function () { var R = POE_RX.m_suite; (R.folk || []).forEach(function (P) { P.wander = P.wanderHold || P.wander0 || null; }); poeSay("A light laughter at once pervades the assembly. The music swells again."); } })
];
}
var POE_MASQ_STEPS = [
pRead(),
pGo({ room: "m_cot" }, "The country is half depopulated. Look into one of the cottages by the abbey wall"),
pSpot("What the pestilence left", "Look at what the pestilence left", null, { hooks: { sheet: function () { poeCard("The Red Death", poeA(poeQ("masque", "No pestilence had ever been so fatal", 3), "<p>No pestilence had ever been so fatal, or so hideous. There were sharp pains, and sudden dizziness; and the whole seizure, progress and termination of the disease, were the incidents of half an hour.</p>")); } } }),
pQuiz("Its Avatar and its seal", "<p>What was the Avatar and the seal of the Red Death?</p>", [["Blood: the redness and the horror of blood", "", true], ["A black swelling", "", false, "That is another plague. This one is red."], ["A cough", "", false, "Worse than that."]]),
pQuiz("The seizure", "<p>And the whole seizure, progress and termination of the disease, were the incidents of…</p>", [["Half an hour", "", true], ["A fortnight", "", false, "Far quicker."], ["A single night", "", false, "Quicker still."]]),
pCard("The Prince Prospero", function () { return poeQ("masque", "But the Prince Prospero was happy and dauntless and sagacious", 2); }, "You are one of the thousand: go to the abbey"),
pGo({ room: "m_hall" }, "Retire with the Prince and his thousand friends to the deep seclusion of his castellated abbey: go in at the gates"),
pCard("A strong and lofty wall", function () { return poeQ("masque", "This was an extensive and magnificent structure", 3); }, "Bring furnaces and massy hammers"),
pSlow("Weld the bolts of the gates of iron: leave means neither of ingress nor egress", { spot: "The bolts of the great gates" }, "bolts", 5, 1.2, { each: function (k) { poeSfx("clang"); poeSay("A bolt welded. " + k + " of 5."); }, hastyT: "Let the iron take the heat. Then strike.", door: function (R, D) { if (D[2].indexOf("out:") === 0) {
poeHook("bolts");
return true;
} return false; } }),
pCard("The external world could take care of itself", function () { return poeQ("masque", "The abbey was amply provisioned", 5); }, "All these and security were within. Without was the Red Death.", { done: function () { poeLockDoor("m_hall", "out:masque", "The bolts are welded. There is no way out, nor in."); } }),
pTalk("Prince Prospero", "Pay your court to the Prince", ["Prince Prospero", "<p>“In the meantime it is folly to grieve, or to think. I have provided all the appliances of pleasure. Buffoons, improvisatori, ballet-dancers, musicians, Beauty, wine. See that the tables want for nothing.”</p>", "As your Highness wills"]),
pGather("bottle", { room: "m_hall", lx: 0, lz: 6 }, 6, "A flagon for the banquet", "Carry wine to the long tables", { spread: 8, each: "More." }),
pTalk(/masker|reveller/i, "Speak with one of the thousand", ["A reveller", "<p>“Five months! And not a soul sick within these walls. Let them die out there, if they must. Have you seen the suite he has dressed for the masquerade? Seven rooms. I do not like the seventh.”</p>", "Go on"]),
pCard("Toward the close of the fifth or sixth month", function () { return poeQ("masque", "It was toward the close of the fifth or sixth month", 1) + poeQ("masque", "It was a voluptuous scene, that masquerade", 4); }, "Go through to the imperial suite"),
pGo({ room: "m_suite" }, "Go through into the imperial suite: seven chambers, so irregularly disposed that the vision embraces but little more than one at a time")
];
POE_MASQ.forEach(function (M, i) {
var txt = ["The eastern extremity: hung in blue, and vividly blue are its windows", "The second chamber: purple in its ornaments and tapestries, and here the panes are purple", "The third: green throughout, and so are the casements", "The fourth: furnished and lighted with orange", "The fifth: with white", "The sixth: with violet", "The seventh apartment: closely shrouded in black velvet tapestries that hang all over the ceiling and down the walls, falling in heavy folds upon a carpet of the same material and hue"][i];
POE_MASQ_STEPS.push(pGo(function () { var R = POE_RX.m_suite, C = R.cells[i]; return { room: "m_suite", lx: C.x, lz: C.z }; }, txt, { r: 3.5 }));
POE_MASQ_STEPS.push(pDo("There is no lamp or candle within the suite. In the corridor a heavy tripod bears a brazier of fire that projects its rays through the tinted glass: light the brazier of the " + M[1] + " chamber", function () { var R = POE_RX.m_suite, C = R.cells[i]; return { room: "m_suite", lx: C.x, lz: C.z - 5.6 }; }, "brazier", function (a, f, done) { if (a !== i) {
poeSay("That is the " + POE_MASQ[a][1] + " window. Light the " + M[1] + " one.");
return;
} var R = POE_RX.m_suite; R.cells[i].brazier.out = false; poeSfx("sizzle"); poeSay(i === 6 ? "Scarlet: a deep blood color. The fire-light that streams upon the dark hangings through the blood-tinted panes is ghastly in the extreme." : "The " + M[1] + " chamber glares and glitters."); done(); }, { auto: function () { poeHook("brazier", i); } }));
});
POE_MASQ_LIT = POE_MASQ_STEPS.length - 1;
POE_MASQ_STEPS = POE_MASQ_STEPS.concat([
pQuiz("The seventh chamber", "<p>In six rooms the color of the windows corresponds with the decorations. In the seventh it fails to. The panes there are…</p>", [["Scarlet: a deep blood color", "", true], ["Black, like the velvet", "", false, "In this chamber only, the color of the windows failed to correspond."], ["Clear", "", false, "None of the windows is clear."]]),
pOrder("Name the seven chambers in their order, from the eastern extremity to the west", "The imperial suite", "<p>You have walked them. Name them, east to west.</p>", POE_MASQ.map(function (M) { return "The " + M[1] + " chamber"; })),
pSpot("The gigantic clock of ebony", "In the black chamber, against the western wall: go and stand before the clock", null, { hooks: { clock: function () { poeSfx("chime", { k: 0.6 }); poeCard("The clock of ebony", poeQ("masque", "It was in this apartment, also", 3)); } } }),
pCard("The revel", function () { return poeQ("masque", "But, in spite of these things, it was a gay and magnificent revel", 4) + poeQ("masque", "He had directed, in great part", 5); }, "To and fro in the seven chambers stalk a multitude of dreams")
]);
POE_MASQ_STEPS = POE_MASQ_STEPS.concat(poeMasqHour(9, 0), poeMasqHour(10, 2), [pCard("The dreams", function () { return poeQ("masque", "And these—the dreams—writhed in and about", 4) || poeQ("masque", "And then, for a moment, all is still", 3); }, "The revel goes whirlingly on")], poeMasqHour(11, 4), [
pQuiz("The black chamber", "<p>The night is waning away. Of all the maskers, how many now venture into the seventh chamber?</p>", [["None: there flows a ruddier light through the blood-colored panes, and the blackness of the sable drapery appals", "", true], ["The boldest of them", "", false, "Not even they."], ["Only the Prince", "", false, "Not yet."]]),
pGather("wisp", function () { var C = POE_RX.m_suite.cells[1]; return { room: "m_suite", lx: C.x, lz: C.z }; }, 4, "A partner in the dance", "The other apartments are densely crowded, and in them beats feverishly the heart of life: dance on in the purple chamber", { spread: 4.5, verb: "take a turn", each: "On." }),
pStill(12, "Midnight. Twelve strokes to be sounded by the bell of the clock. More of thought creeps, with more of time, into the meditations of the thoughtful. Stand.", { noBeam: true, on: function () { return __ZC(467, 262, this, arguments, new.target); }, moved: function () { poeSay("Stand, and count the strokes."); } }),
pCard("A masked figure", function () { return poeQ("masque", "before the last echoes of the last chime had utterly sunk into silence", 2) + poeQ("masque", "The figure was tall and gaunt", 3) + poeA(poeQ("masque", "His vesture was dabbled in blood", 1), ""); }, "A buzz, a murmur: of disapprobation, then of terror, of horror, of disgust"),
pGo(function () { var C = POE_RX.m_suite.cells[0]; return { room: "m_suite", lx: C.x + 2, lz: C.z }; }, "It is in the eastern or blue chamber. Go and see.", { r: 5, on: function () { var R = POE_RX.m_suite, C = R.cells[0]; poeMove(POE.cast.prospero, "m_suite", C.x + 4, C.z - 2, -Math.PI / 2); } }),
pTalk("Prince Prospero", "The Prince stands in the blue room with a group of pale courtiers by his side", ["Prince Prospero", function () { return poeQ("masque", "Who dares?", 2); }, "No one stirs"]),
pCard("None put forth hand to seize him", function () { return poeQ("masque", "At first, as he spoke, there was a slight rushing movement", 3); }, "He passes within a yard of the Prince’s person", { done: function (f) { return __ZC(467, 263, this, arguments, new.target); } }),
pUntil("He makes his way uninterruptedly, with the same solemn and measured step: through the blue chamber to the purple, the purple to the green, the green to the orange, to the white, to the violet. Follow him, to the black.", function (f) { var R = POE_RX.m_suite, L = worldLocal(); return POE.room === R && poeSuiteCell(R, L.x - R.x) === 6 && POE.cast.death.g.position.x >= R.cells[6].x - 1.6; }, function () { var C = POE_RX.m_suite.cells[6]; return { room: "m_suite", lx: C.x + 3, lz: C.z }; }, { auto: function () { var D = POE.cast.death, R = POE_RX.m_suite; D.g.position.x = R.cells[6].x - 1.5; } }),
pCard("A drawn dagger", function () { var R = POE_RX.m_suite, C = R.cells[6], P = POE.cast.prospero; poeMove(P, "m_suite", C.x + 1.2, C.z, -Math.PI / 2); poeSfx("shriek"); poeLay(P, true); return poeQ("masque", "It was then, however, that the Prince Prospero", 4); }, "The dagger drops gleaming upon the sable carpet"),
pDo("Summon the wild courage of despair: throw yourself into the black apartment, and seize the mummer, whose tall figure stands erect and motionless within the shadow of the ebony clock", function () { var C = POE_RX.m_suite.cells[6]; return { room: "m_suite", lx: C.x - 1.5, lz: C.z }; }, "seize", function (a, f, done) { poeHide(POE.cast.death); poeSfx("wind"); poeCard("Untenanted by any tangible form", poeQ("masque", "gasped in unutterable horror", 1) || poeQ("masque", "Then, summoning the wild courage of despair", 1), [["…", "", done]]); }, { begin: function () { var C = POE_RX.m_suite.cells[6]; poeSpotOnce("m:seize", POE_RX.m_suite.x + C.x - 1.5, C.z, 2.6, "The mummer", "seize him", function () { poeHook("seize"); }, 0).off = false; }, auto: function () { poeHook("seize"); } }),
pStill(12, "And now is acknowledged the presence of the Red Death. One by one drop the revellers in the blood-bedewed halls of their revel. Stand, while you can.", { noBeam: true, on: function () { return __ZC(467, 264, this, arguments, new.target); } }),
pCard("Illimitable dominion over all", function () { POE.black = true; return poeQ("masque", "And now was acknowledged the presence of the Red Death", 5); }, "…", { done: function () { POE.black = false; var R = POE_RX.m_suite; if (R.light)
R.light.dim = 1; } })
]);
POE_CH.push({ t: "The Masque of the Red Death", key: "masque", year: "1842", tune: "masque", jump: true, start: { x: POE_AT.masque.x + 30, z: POE_AT.masque.gate.z + 70, ry: 0 },
words: "“The ‘Red Death’ had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal.”",
intro: "A plague outside the walls. A masked ball within.",
warn: ["A plague of blood, a masquerade, and a guest nobody invited. No one leaves.", "A plague, a masked ball, and a stranger at midnight. Frightening, told without the gore."],
setup: poeMasqueSetup,
hooks: { clock: function () { poeSfx("chime", { k: 0.5 }); poeSay("Its pendulum swings to and fro with a dull, heavy, monotonous clang."); }, bolts: function () { poeSay("The gates of iron."); }, sheet: function () { poeSay("Leave it covered."); },
brazier: function (i) { var M = POE_MASQ[i || 0]; poeSay("The " + M[1] + " window, and the tripod of fire beyond it."); } },
end: function () { poeLockDoor("m_hall", "out:masque", null); var R = POE_RX.m_suite; (R.folk || []).forEach(function (P) { poeLay(P, false); P.wander = P.wander0 || null; }); poeHide(POE.cast.death); if (POE.cast.prospero) {
poeLay(POE.cast.prospero, false);
poeMove(POE.cast.prospero, "m_hall", 0, -6, 0);
} },
steps: POE_MASQ_STEPS });
function poeDunWalls(R, size) { R.size = size; var cx = R.cx || 0; R.walls.forEach(function (m) { var n = m.userData.n; m.position.x = cx + n[0] * size / 2; m.position.z = n[1] * size / 2; }); }
function poeDunState(st) {
var R = POE_RX.p_dungeon;
if (!R || !R.g)
return;
R.envBlack = st === "dark";
POE.black = st === "dark";
if (R.light)
R.light.k = st === "dark" ? 0 : st === "fire" ? 0.5 : 0.85;
if (R.glow)
R.glow.k = st === "fire" ? 1.6 : 0;
R.iron.emissiveIntensity = st === "fire" ? 0.5 : 0;
}
function poePitSetup(f) { return __ZC(467, 265, this, arguments, new.target); }
function poePitLie() { var R = POE_RX.p_dungeon; POE.lock = { x: R.x - 5, z: 0, y: -1.05 }; }
function poePendTo(len, sw, sec) { var R = POE_RX.p_dungeon, P = R.pend, l0 = P.len, s0 = P.sw, t = 0, k = poeKey(); P.pv.visible = true; P.on = true; poeEvery(function (dt) { if (poeKey() !== k && sec > 2) {
P.len = len;
P.sw = sw;
return false;
} t += dt / poeSec(sec); var u = Math.min(1, t); P.len = l0 + (len - l0) * u; P.sw = s0 + (sw - s0) * u; if (u >= 1)
return false; }); }
var POE_PIT_LIGHT = 0, POE_PIT_FIRE = 0;
var POE_PIT_STEPS = [
pRead(),
pCard("The sentence", function () { var C = POE_RX.p_court; POE.lock = { x: C.x + 1, z: 0, yaw: Math.PI / 2 }; return poeQ("pit", "I WAS sick", 4); }, "The lips of the black-robed judges", { on: function () { var C = POE_RX.p_court; POE.lock = { x: C.x + 1, z: 0, yaw: Math.PI / 2 }; } }),
pStill(12, "You are bound. Watch the seven tall candles upon the table: at first they wear the aspect of charity, and seem white slender angels who would save you", { noBeam: true, on: function () { var C = POE_RX.p_court; POE.lock = { x: C.x + 1, z: 0, yaw: Math.PI / 2 }; var t = 0, k = poeKey(); poeEvery(function (dt) { if (poeKey() !== k) {
POE.roomLit = null;
return false;
} t += dt; POE.roomLit = Math.max(0.05, 1 - t / 12); }); } }),
pCard("The angel forms became meaningless spectres", function () { return poeQ("pit", "And then my vision fell upon the seven tall candles", 3) + poeQ("pit", "And then there stole into my fancy", 2); }, "Silence, and stillness, and night were the universe", { done: function () { POE.lock = null; POE.roomLit = null; poeVeil(poeSec(1.5), function () { poeEnterRoom("p_dungeon", null, { x: -5, z: 1.6, ry: 0 }); poeDunState("dark"); }, poeSec(1)); } }),
pStill(8, "You lie upon your back, unbound. Lie quiet, and make effort to exercise your reason", { noBeam: true, at: { room: "p_dungeon", lx: -5, lz: 1.6 }, r: 30, on: function () { poeDunState("dark"); poeSfx("heart", { k: 0.3, bpm: 84 }); }, done: function () { poeSfx("heartoff"); } }),
pCard("The blackness of eternal night", function () { return poeQ("pit", "So far, I had not opened my eyes", 3) + poeQ("pit", "At length, with a wild desperation at heart", 3); }, "Not the tomb? Then where?"),
pQuiz("A fearful idea", "<p>You gasp for breath. What is it you most dread to find, when you thrust your arms wildly above and around you in all directions?</p>", [["The walls of a tomb", "", true], ["Another prisoner", "", false, "You dread a narrower thing."], ["The judges", "", false, "They have done with you."]]),
pUntil("Rise. Move forward cautiously, with your arms extended, your eyes straining from their sockets in the hope of catching some faint ray of light, until your hands find a wall", function (f) { var R = POE_RX.p_dungeon, L = worldLocal(), h = R.size / 2 - 1.2; return POE.room === R && (Math.abs(L.x - R.x) > h || Math.abs(L.z) > h); }, null, { noBeam: true, auto: function () { var R = POE_RX.p_dungeon; camera.position.set(POE.base + R.x - 8.1, 1.72, 6); }, done: function (f) { var L = worldLocal(); f.rx = L.x - POE_RX.p_dungeon.x; f.rz = L.z; poeSfx("stone", { k: 0.2 }); } }),
pCard("A wall, seemingly of stone masonry", function () { return poeQ("pit", "It was a wall, seemingly of stone masonry", 2) + poeQ("pit", "This process, however, afforded me no means", 3); }, "Tear a part of the hem from the robe"),
pFind("hem", function () { var f = poeBS().f, R = POE_RX.p_dungeon; return { room: "p_dungeon", lx: f.rx != null ? f.rx : -8, lz: f.rz != null ? f.rz : 6 }; }, "The hem of your robe of coarse serge", "Tear a part of the hem from your robe and place the fragment at full length, at right angles to the wall", { verb: "tear it, and lay it down", noBeam: true, done: function (f) { f.walk = 0; var L = worldLocal(); f.lx = L.x; f.lz = L.z; } }),
pUntil("Grope your way around the prison, counting your paces. The ground is moist and slippery.", function (f) { var R = POE_RX.p_dungeon, L = worldLocal(), h = R.size / 2 - 2.6, near = Math.abs(L.x - R.x) > h || Math.abs(L.z) > h, d = Math.hypot(L.x - (f.lx || L.x), L.z - (f.lz || L.z)); if (near)
f.walk = (f.walk || 0) + d; f.lx = L.x; f.lz = L.z; return f.walk >= 31 || window.POE_FAST; }, null, { noBeam: true, h: function () { return "Grope your way around the prison, keeping to the wall, counting your paces: " + Math.floor(((poeBS().f.walk || 0)) / 0.6) + " paces"; } }),
pCard("Fifty-two paces", function () { return poeQ("pit", "I staggered onward for some time, when I stumbled and fell", 2); }, "Sleep overtakes you as you lie", { done: function () { poeVeil(poeSec(1.5), null, poeSec(1.2)); } }),
pDo("Upon awaking, and stretching forth an arm, you find beside you a loaf and a pitcher with water", function () { var L = worldLocal(); return null; }, "pitcher", function (a, f, done) { poeSay("You eat and drink with avidity."); done(); }, { noBeam: true, begin: function (f) { var L = worldLocal(), S = POE.once["p_dungeon:pitcher"]; if (S) {
S.x = L.x;
S.z = L.z + 0.6;
} }, auto: function () { poeHook("pitcher"); } }),
pUntil("Resume your tour around the prison, and with much toil come at last upon the fragment of the serge", function (f) { var R = POE_RX.p_dungeon, L = worldLocal(), d = Math.hypot(L.x - (f.lx || L.x), L.z - (f.lz || L.z)); f.walk2 = (f.walk2 || 0) + d; f.lx = L.x; f.lz = L.z; return (f.walk2 >= 24 && Math.hypot(L.x - R.x - (f.rx || 0), L.z - (f.rz || 0)) < 3) || window.POE_FAST; }, function () { var f = poeBS().f; return { room: "p_dungeon", lx: f.rx || -8, lz: f.rz || 6 }; }, { noBeam: true, h: function () { return "Resume your tour, to the rag: " + (52 + Math.floor(((poeBS().f.walk2 || 0)) / 0.5)) + " paces"; } }),
pQuiz("The dimensions of your dungeon", "<p>Up to the period when you fell you had counted fifty-two paces, and upon resuming your walk, forty-eight more. A hundred paces in all; and admitting two paces to the yard, you presume the dungeon to be…</p>", [["Fifty yards in circuit", "", true], ["A hundred yards in circuit", "", false, "Two paces to the yard."], ["Twenty-five yards", "", false, "That you learn later, and why you erred."]]),
pUntil("Quit the wall, and resolve to cross the area of the enclosure. Proceed with extreme caution: the floor, although seemingly of solid material, is treacherous with slime", function (f) { var R = POE_RX.p_dungeon, L = worldLocal(); return Math.hypot(L.x - R.x - R.pit.x, L.z - R.pit.z) < R.pit.r + 1.1; }, null, { noBeam: true, auto: function () { var R = POE_RX.p_dungeon; camera.position.set(POE.base + R.x + R.pit.x - 3, 1.72, 0); }, done: function () { var R = POE_RX.p_dungeon, L = worldLocal(), a = Math.atan2(L.z - R.pit.z, L.x - R.x - R.pit.x); POE.lock = { x: R.x + R.pit.x + Math.cos(a) * (R.pit.r + 0.5), z: R.pit.z + Math.sin(a) * (R.pit.r + 0.5), y: -1.2 }; poeSfx("stone"); var S = POE.once["p_dungeon:brink"]; if (S) {
S.x = POE.lock.x;
S.z = POE.lock.z;
} } }),
pCard("You fall violently on your face", function () { return poeQ("pit", "the remnant of the torn hem of my robe became entangled", 1) + poeQ("pit", "my chin rested upon the floor of the prison", 3); }, "Put forward your arm"),
pDo("You have fallen at the very brink of a circular pit. Grope about the masonry just below the margin: dislodge a small fragment, and let it fall into the abyss", null, "brink", function (a, f, done) { poeSfx("stone", { k: 0.3 }); poeWait(1.4, function () { poeSfx("stone", { k: 0.15 }); }); poeWait(2.6, function () { poeSfx("stone", { k: 0.08 }); }); poeWait(4.2, function () { poeSfx("splash"); poeCard("The pit", poeQ("pit", "For many seconds I hearkened to its reverberations", 2) + poeQ("pit", "At the same moment there came a sound resembling the quick opening", 1) + poeQ("pit", "I saw clearly the doom which had been prepared for me", 3), [["To the victims of its tyranny, there was the choice of death with its direst physical agonies, or death with its most hideous moral horrors", "", done]]); }); }, { noBeam: true, auto: function () { poeHook("brink"); } }),
pUntil("Shaking in every limb, grope your way back to the wall; resolving there to perish rather than risk the terrors of the wells", function (f) { var R = POE_RX.p_dungeon, L = worldLocal(), h = R.size / 2 - 1.4; return Math.abs(L.x - R.x) > h || Math.abs(L.z) > h; }, null, { noBeam: true, on: function () { POE.lock = null; }, auto: function () { var R = POE_RX.p_dungeon; camera.position.set(POE.base + R.x - 8.1, 1.72, 0); } }),
pDo("Agitation of spirit keeps you awake for many long hours. Upon arousing, you find by your side, as before, a loaf and a pitcher of water. A burning thirst consumes you.", null, "pitcher", function (a, f, done) { poeCard("The pitcher", poeQ("pit", "A burning thirst consumed me", 3), [["A sleep like that of death", "", function () { poeVeil(poeSec(2), function () { poeDunState("dim"); poePitLie(); var R = POE_RX.p_dungeon; R.pend.pv.visible = true; }, poeSec(1.5)); done(); }]]); }, { noBeam: true, begin: function (f) { var L = worldLocal(), S = POE.once["p_dungeon:pitcher"]; if (S) {
S.x = L.x;
S.z = L.z + 0.6;
} }, auto: function () { poeHook("pitcher"); } })
];
POE_PIT_LIGHT = POE_PIT_STEPS.length;
POE_PIT_STEPS = POE_PIT_STEPS.concat([
pCard("By a wild sulphurous lustre", function () { poePitLie(); return poeQ("pit", "By a wild sulphurous lustre", 2) + poeQ("pit", "In its size I had been greatly mistaken", 2); }, "How had you erred?", { on: function () { poeDunState("dim"); poePitLie(); POE_RX.p_dungeon.pend.pv.visible = true; } }),
pQuiz("Twenty-five yards", "<p>The whole circuit of its walls does not exceed twenty-five yards. You had counted fifty. How?</p>", [["You had nearly made the circuit when you fell and slept; on waking you returned upon your steps, and so counted the vault twice", "", true], ["The walls have moved", "", false, "Not yet."], ["You counted in your sleep", "", false, "You counted true; you walked it twice."]]),
pCard("The figures of fiends", function () { return poeQ("pit", "I had been deceived, too, in respect to the shape", 5) + poeQ("pit", "All this I saw indistinctly", 3); }, "Look upward", { on: poePitLie }),
pUntil("You lie upon your back, at full length, on a species of low framework of wood, bound by a long strap resembling a surcingle. Look upward, and survey the ceiling of your prison", function (f) { poePitLie(); return pitch > 0.75 || window.POE_FAST; }, null, { noBeam: true }),
pCard("The painted figure of Time", function () { return poeQ("pit", "It was some thirty or forty feet overhead", 4); }, "Its sweep is brief, and of course slow", { on: poePitLie }),
pUntil("A slight noise attracts your notice. Look to the floor, toward the well, at your right", function (f) { poePitLie(); var R = POE_RX.p_dungeon; return (poeAim(R.x + R.pit.x, R.pit.z) < 0.5 && pitch < 0.3) || window.POE_FAST; }, null, { noBeam: true, on: function () { var R = POE_RX.p_dungeon; R.rats.forEach(function (Q) { Q.g.visible = true; }); poeSfx("rats"); } }),
pCard("Enormous rats", function () { return poeQ("pit", "I saw several enormous rats traversing it", 3); }, "It requires much effort and attention to scare them away", { on: poePitLie }),
pStill(22, "Half an hour, perhaps even an hour, passes before you again cast your eyes upward. Lie, and watch the pendulum.", { noBeam: true, on: function () { poePitLie(); poePendTo(3.4, 0.55, 22); } }),
pCard("It had perceptibly descended", function () { return poeQ("pit", "What I then saw confounded and amazed me", 3) + poeQ("pit", "its nether extremity was formed of a crescent of glittering steel", 3); }, "Monkish ingenuity in torture", { on: poePitLie }),
pQuiz("The doom prepared for you", "<p>Your cognizance of the pit had become known to the inquisitorial agents. Having failed to fall, it is no part of the demon plan to hurl you into the abyss. What awaits you instead?</p>", [["A different and a milder destruction", "Milder! You half smile in your agony as you think of such application of such a term", true], ["Release", "", false, "There is no release from the Inquisition."], ["The pit, by force", "", false, "The plunge into this pit formed no part of their plan now."]], { on: poePitLie }),
pStill(26, "Inch by inch, line by line, with a descent only appreciable at intervals that seem ages: count the rushing vibrations of the steel", { noBeam: true, on: function () { poePitLie(); poePendTo(6.6, 0.8, 26); } }),
pCard("Down and still down it came", function () { return poeQ("pit", "What boots it to tell of the long, long hours", 5) + poeQ("pit", "There was another interval of utter insensibility", 3); }, "You are sick and weak, as if through long inanition", { on: poePitLie }),
pDo("Even amid the agonies of that period, the human nature craves food. With painful effort, outstretch your left arm as far as your bonds permit, and take the small remnant which has been spared you by the rats", { spot: "The dish of meat, within reach of your left hand" }, "dish", function (a, f, done) { poeCard("A half formed thought of joy, of hope", poeQ("pit", "As I put a portion of it within my lips", 4), [["Yet what business have you with hope?", "", done]]); }, { on: poePitLie, auto: function () { poeHook("dish"); } }),
pQuiz("The vibration of the pendulum", "<p>The vibration of the pendulum is at right angles to your length. Where is the crescent designed to cross?</p>", [["The region of the heart", "It will fray the serge of your robe; it will return and repeat its operations, again and again", true], ["The throat", "", false, "Lower."], ["The bonds at your feet", "", false, "It is not designed to free you."]], { on: poePitLie }),
pStill(24, "Down, steadily down it creeps. To the right, to the left, far and wide, with the shriek of a damned spirit; to your heart with the stealthy pace of the tiger. Lie, and alternately laugh and howl.", { noBeam: true, on: function () { poePitLie(); poePendTo(7.9, 0.95, 24); poeSfx("heart", { k: 0.5, bpm: 100 }); } }),
pCard("Within three inches of your bosom", function () { return poeQ("pit", "Down—certainly, relentlessly down!", 4) + poeQ("pit", "I saw that some ten or twelve vibrations", 2); }, "For the first time during many hours, or perhaps days, you think", { on: poePitLie }),
pQuiz("The bandage", "<p>The bandage, or surcingle, which envelops you is unique: you are tied by no separate cord. The first stroke of the razor-like crescent athwart any portion of the band would so detach it that it might be unwound. Will the blade free you?</p>", [["No. The surcingle envelops your limbs and body close in all directions, save in the path of the destroying crescent", "", true], ["Yes: wait for the first stroke", "", false, "Lift your head and look at your breast. The band crosses you everywhere but where the steel will pass."], ["Yes, if you struggle", "", false, "The result of the slightest struggle, how deadly!"]], { on: poePitLie }),
pQuiz("The unformed half of that idea of deliverance", "<p>For many hours the immediate vicinity of the low framework upon which you lie has been literally swarming with rats. They are wild, bold, ravenous; their red eyes glaring upon you as if they waited but for motionlessness on your part to make you their prey. “To what food,” you think, “have they been accustomed in the well?”</p><p>What do you do?</p>", [["With the particles of the oily and spicy viand which now remains, thoroughly rub the bandage wherever you can reach it", "", true], ["Scare them away with your free hand", "", false, "That is what you have done for hours. Think the other way."], ["Cry out to the judges", "", false, "They watch. They will not answer."]], { on: poePitLie }),
pSlow("Rub the bandage with the remnant of the meat, wherever you can reach it", { spot: "The dish of meat, within reach of your left hand" }, "dish", 4, 1.5, { on: poePitLie, each: function (k) { poeSay("The band is smeared. " + k + " of 4."); }, hastyT: "Thoroughly. Every strand you can reach." }),
pStill(20, "Now raise your hand from the floor, and lie breathlessly still", { noBeam: true, on: function () { return __ZC(467, 266, this, arguments, new.target); }, moved: function () { poeSay("They shrink back. Still! Breathlessly still."); } }),
pCard("They swarmed upon me in ever accumulating heaps", function () { return poeQ("pit", "At first the ravenous animals were startled", 4) + poeQ("pit", "They pressed—they swarmed upon me", 4) + poeQ("pit", "Yet one minute, and I felt that the struggle would be over", 3); }, "With a more than human resolution, lie still", { on: poePitLie }),
pSlow("The surcingle hangs in ribands from your body. But the stroke of the pendulum already presses upon your bosom. With a steady movement, cautious, sidelong, shrinking, and slow, slide from the embrace of the bandage and beyond the reach of the scimitar", { spot: "The low framework of wood" }, "frame", 4, 2, { on: poePitLie, each: function (k) { var R = POE_RX.p_dungeon; POE.lock = { x: R.x - 5, z: k * 0.45, y: -1.05 }; poeSay("Sidelong. " + k + " of 4."); }, hasty: function () { poeSay("The steel! Slower: sidelong, shrinking, and slow."); poeSfx("swish"); } }),
pCard("Free!", function () { var R = POE_RX.p_dungeon; POE.lock = null; R.ratAt = null; R.rats.forEach(function (Q) { Q.g.visible = false; }); poePendTo(1.2, 0.05, 4); poeSfx("heartoff"); return poeQ("pit", "For the moment, at least, I was free", 1) + poeQ("pit", "Free!—and in the grasp of the Inquisition!", 4); }, "Your every motion is undoubtedly watched", { done: function () { var R = POE_RX.p_dungeon; poeWait(4.5, function () { R.pend.pv.visible = false; }); } })
]);
POE_PIT_FIRE = POE_PIT_STEPS.length;
POE_PIT_STEPS = POE_PIT_STEPS.concat([
pCard("Demon eyes, of a wild and ghastly vivacity", function () { poeDunState("fire"); return poeQ("pit", "As I arose from the attempt", 3) + poeQ("pit", "Unreal!", 5); }, "The breath of the vapour of heated iron", { on: function () { poeDunState("fire"); poeSfx("sizzle"); } }),
pUntil("Amid the thought of the fiery destruction that impends, the idea of the coolness of the well comes over your soul like balm. Rush to its deadly brink, and throw your straining vision below", function (f) { var R = POE_RX.p_dungeon, L = worldLocal(); return (Math.hypot(L.x - R.x - R.pit.x, L.z - R.pit.z) < R.pit.r + 1.6 && pitch < -0.3) || window.POE_FAST; }, { room: "p_dungeon", lx: 5.9, lz: 0 }, {}),
pCard("Oh! any horror but this!", function () { return poeQ("pit", "The glare from the enkindled roof illumined its inmost recesses", 4); }, "With a shriek, rush from the margin", { done: function () { poeSfx("shriek"); } }),
pDo("The heat rapidly increases. There has been a second change in the cell: in its form. The Inquisitorial vengeance has been hurried. Keep from the pit while there is an inch of foothold.", null, "none", function () { }, { noBeam: true, begin: function (f) { var R = POE_RX.p_dungeon; R.cx = R.pit.x; f.sz = 18; f.fell = 0; poeSfx("grating"); },
tick: function (dt, f) { return __ZC(467, 267, this, arguments, new.target); },
bar: function (f) { return "the walls: " + Math.max(0, Math.round(((f.sz || 18) - 5.6) * 10) / 10) + " m of floor left"; } }),
pCard("An outstretched arm caught my own", function () { var R = POE_RX.p_dungeon; poeSfx("trumpet"); poeSfx("crash"); R.cx = 0; poeDunWalls(R, 18); poeDunState("dim"); var L = worldLocal(); poeCast("lasalle", "p_dungeon", L.x - R.x - 1.2, L.z + 0.6, 0.6, { name: "General Lasalle", role: "military", sex: "m", look: { _seed: 90, beard: 1 } }); return poeQ("pit", "At length for my seared and writhing body", 4) + poeQ("pit", "There was a discordant hum of human voices!", 7); }, "The Inquisition was in the hands of its enemies")
]);
POE_CH.push({ t: "The Pit and the Pendulum", key: "pit", year: "1842", tune: "dread", jump: true, start: { room: "p_court", at: { x: 1, z: 0, ry: Math.PI / 2 } },
words: "“I was sick, sick unto death with that long agony; and when they at length unbound me, and I was permitted to sit, I felt that my senses were leaving me.”",
intro: "Toledo. The Inquisition. The sentence is death.",
warn: ["Torture in the dark, as its victim tells it: the pit, the blade, the rats, the burning walls.", "A prisoner in the dark, a pit, a swinging blade, and an escape. Frightening, told without the gore."],
setup: poePitSetup,
hooks: { dish: function () { poeSay("A small remnant of meat, highly seasoned."); }, frame: function () { poeSay("The low framework of wood."); }, brink: function () { poeSay("The brink. A smell of decayed fungus rises."); }, pitcher: function () { poeSay("A loaf, and a pitcher of water."); } },
end: function () { POE.lock = null; POE.black = false; POE.roomLit = null; var R = POE_RX.p_dungeon; if (R && R.g) {
R.cx = 0;
poeDunWalls(R, 18);
poeDunState("dim");
R.envBlack = true;
} poeSfx("heartoff"); },
steps: POE_PIT_STEPS });
function poeCaskSetup(f) { return __ZC(467, 268, this, arguments, new.target); }
var POE_CASK_MEET = 0, POE_CASK_CHAIN = 0, POE_CASK_TORCH = 0, POE_CASK_TIER = [];
function poeCaskTier(n, o) { o = o || {}; return pSlow("The " + ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh"][n] + " tier: lay the stones, and plaster them, with your trowel", { spot: "The recess" }, "wall", n === 11 ? 1 : 3, 1.6, Object.assign({ each: function (k) { poeSfx("trowel"); poeSay(n === 11 ? "You force the last stone into its position; you plaster it up." : "A stone laid and plastered. " + k + " of 3."); }, hastyT: "The mortar must be laid true. Work steadily.", done: function () { var V = POE_RX.c_vaults; V.tiers[n - 1].visible = true; poeSfx("stone"); } }, o)); }
var POE_CASK_STEPS = [
pRead(),
pCard("The thousand injuries of Fortunato", function () { return poeP("cask", 0); }, "At length I would be avenged"),
pQuiz("A wrong is unredressed", "<p>You must not only punish, but punish with impunity. When is a wrong unredressed?</p>", [["When retribution overtakes its redresser; and equally when the avenger fails to make himself felt as such to him who has done the wrong", "", true], ["When the law is not called in", "", false, "The law has no part in this."], ["When it is forgiven", "", false, "You do not forgive."]]),
pCard("My smile now was at the thought of his immolation", function () { return poeP("cask", 1, 2); }, "He had a weak point, this Fortunato"),
pGo({ room: "c_hall" }, "It is the supreme madness of the carnival season. First, your own house: go in to the palazzo"),
pQuiz("The attendants", "<p>There must be no attendants at home tonight. How do you insure their immediate disappearance, one and all, as soon as your back is turned?</p>", [["Tell them that you shall not return until the morning, and give them explicit orders not to stir from the house", "", true], ["Dismiss them for the night", "", false, "Then they could say they were sent away. Let them abscond of themselves."], ["Lock them in the kitchens", "", false, "They would hear. They must be gone, and by their own fault."]]),
pFind("trowel", { room: "c_hall", lx: 3, lz: 4 }, "A mason's trowel", "Take a trowel, and keep it beneath the folds of your roquelaire", {}),
pGo(function () { var V = POE_RX.c_vaults, C = V.cells[6]; return { room: "c_vaults", lx: C.x, lz: C.z }; }, "Go down alone to the most remote end of the vaults, and make all ready", { r: 4 }),
pGather("stone", function () { var V = POE_RX.c_vaults; return { room: "c_vaults", lx: V.niche.x + 2.2, lz: V.niche.z + 2.6 }; }, 6, "Building stone", "Bring a quantity of building stone to the recess", { spread: 2.2, each: "Another." }),
pDo("And mortar. Now hide them: heap the bones of your fathers over the stone and the mortar", { spot: "The pile of bones by the recess" }, "bones", function (a, f, done) { poeSfx("stone"); poeSay("Hidden. Now, the carnival."); done(); }),
pGo({ x: POE_AT.cask.x - 4, z: POE_AT.cask.z - 20 }, "About dusk. Go up, and out among the maskers on the piazza", { r: 8 }),
pTalk("The vintner", "Ask at the wine shop where Fortunato may be found", ["The vintner", "<p>“Fortunato? In motley tonight, cap and bells and all, and three parts drunk. He was by the mask-stalls. Why, have you wine for him to judge?”</p>", "“I have my doubts about a pipe of it.”"], { who: "The vintner", room: "c_wine" })
];
POE_CASK_MEET = POE_CASK_STEPS.length + 1;
POE_CASK_STEPS = POE_CASK_STEPS.concat([
pTalk("Fortunato", "You encounter your friend. He accosts you with excessive warmth, for he has been drinking much.", ["Fortunato", function () { return poeP("cask", 3); }, "Wring his hand"], { x: POE_AT.cask.x + 12, z: POE_AT.cask.z - 14 }),
pQuiz("You are luckily met", "<p>You: “My dear Fortunato, you are luckily met. How remarkably well you are looking to-day!” And then?</p>", [["“But I have received a pipe of what passes for Amontillado, and I have my doubts.”", "", true], ["“Come down to my vaults with me.”", "", false, "Never ask. He must ask."], ["“You have injured me a thousand times.”", "", false, "Neither by word nor deed give him cause to doubt your good will."]]),
pCard("Amontillado!", function () { return poeP("cask", 5, 11); }, "“And I must satisfy them.”"),
pQuiz("He must insist", "<p>He: “Amontillado!” What do you say now?</p>", [["“As you are engaged, I am on my way to Luchesi. If any one has a critical turn, it is he.”", "", true], ["“Then come and taste it.”", "", false, "Too plain. Name his rival."], ["“It is no matter.”", "", false, "Then he will go back to his wine."]]),
pCard("Luchesi", function () { return poeP("cask", 13, 17); }, "“To your vaults.”"),
pQuiz("Refuse him", "<p>He: “Come, let us go… To your vaults.”</p>", [["“My friend, no; I will not impose upon your good nature. I perceive you have an engagement. Luchesi…”", "", true], ["“At once!”", "", false, "Eagerness would be remembered. Refuse, and be overborne."], ["“Tomorrow.”", "", false, "Tomorrow he will be sober."]]),
pQuiz("Refuse him again", "<p>He: “I have no engagement; come.”</p>", [["“My friend, no. It is not the engagement, but the severe cold with which I perceive you are afflicted. The vaults are insufferably damp. They are encrusted with nitre.”", "", true], ["“Very well.”", "", false, "Once more. Let it be his own doing, wholly."], ["“You are drunk.”", "", false, "No insult. Only kindness."]]),
pCard("Let us go, nevertheless", function () { return poeP("cask", 21, 22); }, "Suffer him to hurry you to your palazzo", { done: function () { poeFollow(POE.cast.fortunato, true); } }),
pGo({ room: "c_hall" }, "Putting on a mask of black silk, and drawing a roquelaire closely about your person, suffer him to hurry you to your palazzo", { on: function () { poeFollow(POE.cast.fortunato, true); } }),
pCard("There were no attendants at home", function () { return poeP("cask", 23); }, "Take from their sconces two flambeaux")
]);
POE_CASK_TORCH = POE_CASK_STEPS.length + 1;
POE_CASK_STEPS = POE_CASK_STEPS.concat([
pSpot("A flambeau in its sconce", "Take from their sconces two flambeaux, and give one to Fortunato", null, { hooks: { flambeau: function () { poeSfx("sizzle"); poeSay("Two flambeaux. One for him."); } }, done: function () { poeLockDoor("c_hall", "c_vaults", null); } }),
pGo({ room: "c_vaults" }, "Bow him through several suites of rooms to the archway that leads into the vaults. Pass down a long and winding staircase, requesting him to be cautious as he follows.", { on: function () { poeLockDoor("c_hall", "c_vaults", null); } }),
pCard("The catacombs of the Montresors", function () { return poeP("cask", 24, 25); }, "“The pipe,” says he"),
pGo(function () { var C = POE_RX.c_vaults.cells[1]; return { room: "c_vaults", lx: C.x, lz: C.z }; }, "“It is farther on.” Lead him into the first vault, and bid him observe the white web-work which gleams from these cavern walls", { r: 4 }),
pCard("Nitre", function () { poeSfx("cough"); return poeP("cask", 26, 33); }, "“It is nothing,” he says, at last"),
pQuiz("His health is precious", "<p>He has coughed for many minutes. What do you say, with decision?</p>", [["“Come, we will go back; your health is precious. You are rich, respected, admired, beloved; you are happy, as once I was. You are a man to be missed. For me it is no matter. We will go back; you will be ill, and I cannot be responsible. Besides, there is Luchesi…”", "", true], ["“On, then.”", "", false, "Urge him back. He will not go."], ["“You will die of that cough.”", "", false, "He must say it himself: “I shall not die of a cough.” And you: “True, true.”"]]),
pGo(function () { var C = POE_RX.c_vaults.cells[2]; return { room: "c_vaults", lx: C.x, lz: C.z }; }, "“Enough; the cough is a mere nothing; it will not kill me. I shall not die of a cough.” “True, true.” Lead on, between the walls of piled bones", { r: 4 }),
pGo(function () { var C = POE_RX.c_vaults.cells[3]; return { room: "c_vaults", lx: C.x, lz: C.z }; }, "“A draught of this Medoc will defend us from the damps.” On, to where the Medoc lies", { r: 4 }),
pSpot("A row of bottles of Medoc on the mould", "Knock off the neck of a bottle drawn from a long row of its fellows that lie upon the mould", null, { hooks: { medoc: function () { poeSfx("clang", { k: 0.2 }); poeSfx("bells"); poeCard("The Medoc", poeP("cask", 37, 41)); } } }),
pCard("These vaults are extensive", function () { return poeP("cask", 42, 45); }, "“I forget your arms.”"),
pQuiz("The arms of the Montresors", "<p>“I forget your arms.”</p>", [["“A huge human foot d’or, in a field azure; the foot crushes a serpent rampant whose fangs are imbedded in the heel.”", "", true], ["“A serpent d’or, crushing a foot.”", "", false, "It is the foot that crushes; the serpent that bites."], ["“Three casks, on a field gules.”", "", false, "Those are no arms of yours."]]),
pQuiz("And the motto", "<p>“And the motto?”</p>", [["“Nemo me impune lacessit.”", "No one attacks me with impunity", true], ["“In pace requiescat.”", "", false, "That is for later."], ["“In vino veritas.”", "", false, "Not that."]], { done: function () { poeSfx("bells"); } }),
pGo(function () { var C = POE_RX.c_vaults.cells[4]; return { room: "c_vaults", lx: C.x, lz: C.z }; }, "The wine sparkles in his eyes and the bells jingle. On, through long walls of piled skeletons, with casks and puncheons intermingling, under the low arches", { r: 4, done: function () { POE.vaultDim = 0.8; } }),
pCard("We are below the river’s bed", function () { return poeP("cask", 50, 52); }, "“But first, another draught of the Medoc.”"),
pGo(function () { var C = POE_RX.c_vaults.cells[5]; return { room: "c_vaults", lx: C.x, lz: C.z }; }, "Descend again, to the vault of the De Grâve", { r: 4 }),
pSpot("A flagon of De Grâve", "Break and reach him a flagon of De Grâve", null, { hooks: { degrave: function () { poeSfx("bells"); poeCard("The De Grâve", poeP("cask", 53, 59)); } } }),
pQuiz("A mason", "<p>“You? Impossible! A mason?” “A mason.” “A sign,” he says.</p>", [["Produce a trowel from beneath the folds of your roquelaire", "“It is this.”", true], ["Repeat his gesture", "", false, "You do not know it. You are not of the brotherhood."], ["Show him your ring", "", false, "A mason of the other sort: show him the tool."]]),
pCard("You jest", function () { return poeP("cask", 65, 66); }, "Pass on, and descending again, arrive at a deep crypt", { done: function () { POE.vaultDim = 0.55; } }),
pGo(function () { var C = POE_RX.c_vaults.cells[6]; return { room: "c_vaults", lx: C.x, lz: C.z }; }, "The deep crypt, in which the foulness of the air causes your flambeaux rather to glow than flame", { r: 4 }),
pCard("A still interior recess", function () { return poeP("cask", 67, 68); }, "“Proceed; herein is the Amontillado. As for Luchesi…”")
]);
POE_CASK_CHAIN = POE_CASK_STEPS.length + 1;
POE_CASK_STEPS = POE_CASK_STEPS.concat([
pSlow("“He is an ignoramus.” He steps unsteadily forward into the recess, and stands stupidly bewildered at the rock. Fetter him to the granite: throw the links about his waist; turn the key in the padlock", { spot: "The recess" }, "wall", 2, 1.2, { on: function () { var V = POE_RX.c_vaults, F = POE.cast.fortunato; poeFollow(F, false); poeMove(F, "c_vaults", V.niche.x, V.niche.z - 0.3, 0); }, each: function (k) { poeSfx("chain"); poeSay(k === 1 ? "The chain about his waist." : "The padlock. He is too much astounded to resist."); }, hastyT: "Surely. A moment more." }),
pCard("The Amontillado!", function () { return poeP("cask", 70, 73); }, "Busy yourself among the pile of bones"),
pDo("Throw the bones aside: uncover the building stone and the mortar", { spot: "The pile of bones by the recess" }, "bones", function (a, f, done) { var V = POE_RX.c_vaults; V.bonepile.visible = false; V.stones.visible = true; poeSfx("stone"); done(); })
]);
(function () {
var S = POE_CASK_STEPS, T = POE_CASK_TIER;
T[0] = S.length;
S.push(poeCaskTier(1));
S.push(pCard("Not the cry of a drunken man", function () { poeSfx("laugh", { k: 0.1 }); return poeQ("cask", "I had scarcely laid the first tier", 4); }, "There is then a long and obstinate silence"));
[2, 3, 4].forEach(function (n) { T[n - 1] = S.length; S.push(poeCaskTier(n)); });
S.push(pStill(14, "The furious vibrations of the chain. The noise lasts for several minutes: that you may hearken to it with the more satisfaction, cease your labors and sit down upon the bones", { noBeam: true, on: function () { var k = poeKey(), t = 0; poeEvery(function (dt) { if (poeKey() !== k)
return false; t += dt; if (Math.floor(t / 2.2) !== Math.floor((t - dt) / 2.2))
poeSfx("chain"); if (t > 14)
return false; }); }, moved: function () { poeSay("Sit. Listen."); } }));
[5, 6, 7].forEach(function (n) { T[n - 1] = S.length; S.push(poeCaskTier(n)); });
S.push(pCard("The wall is now nearly upon a level with your breast", function () { return poeQ("cask", "The wall was now nearly upon a level with my breast", 2); }, "Hold the flambeau over the mason-work", { done: function () { poeSfx("shriek"); poeWait(1.2, function () { poeSfx("shriek", { k: 0.8 }); }); } }));
S.push(pQuiz("A succession of loud and shrill screams", function () { return poeA(poeQ("cask", "A succession of loud and shrill screams", 3), "<p>He cries out, loud and shrill, from the dark of the recess. For a brief moment you hesitate; you tremble.</p>") + "<p>What do you do?</p>"; }, [["Place your hand upon the solid fabric of the catacombs, and feel satisfied. Reapproach the wall. Reply to the yells of him who clamours: re-echo, aid, surpass them in volume and in strength", "", true], ["Draw your rapier and grope with it about the recess", "", false, "You begin to; the thought of an instant reassures you. The wall is solid."], ["Flee up the stair", "", false, "There is no one in the house to hear."]], { done: function () { poeSfx("shriek", { k: 0.5 }); } }));
S.push(pCard("The clamourer grew still", function () { return "<p style='font-style:italic'>“I did this, and the clamourer grew still.”</p>" + poeNote("It is now midnight, and your task is drawing to a close."); }, "The eighth tier"));
[8, 9, 10].forEach(function (n) { T[n - 1] = S.length; S.push(poeCaskTier(n)); });
S.push(pCard("A low laugh that erects the hairs upon your head", function () { poeSfx("laugh"); return poeQ("cask", "I had finished a portion of the last and the eleventh", 3) + poeP("cask", 78, 80); }, "Answer him"));
S.push(pQuiz("Let us be gone", "<p>“Will not they be awaiting us at the palazzo, the Lady Fortunato and the rest? Let us be gone.”</p>", [["“Yes, let us be gone.”", "", true], ["“You will never be gone.”", "", false, "No threat. Echo him."], ["Say nothing", "", false, "Answer him. Gently."]]));
S.push(pQuiz("For the love of God", "<p style='font-size:17px;font-style:italic'>“For the love of God, Montresor!”</p>", [["“Yes, for the love of God!”", "", true], ["“It is too late.”", "", false, "Echo him."], ["Break down the wall", "", false, "Your heart grows sick: on account of the dampness of the catacombs."]]));
S.push(pDo("You hearken in vain for a reply. You grow impatient. Call aloud", { spot: "The recess" }, "wall", function (a, f, done) { f.call = (f.call || 0) + 1; if (f.call < 2) {
poeSay("“Fortunato!” No answer. Call again.");
return;
} poeSay("“Fortunato!” No answer still."); done(); }, { auto: function () { poeHook("wall"); poeHook("wall"); } }));
S.push(pDo("Thrust a torch through the remaining aperture and let it fall within", { spot: "The recess" }, "wall", function (a, f, done) { poeSfx("bells"); POE.vaultDim = 0.4; poeCard("Only a jingling of the bells", poeQ("cask", "There came forth in return only a jingling of the bells", 2), [["Hasten to make an end of your labour", "", done]]); }, { auto: function () { poeHook("wall"); } }));
T[10] = S.length;
S.push(poeCaskTier(11));
S.push(pDo("Against the new masonry re-erect the old rampart of bones", { spot: "The pile of bones by the recess" }, "bones", function (a, f, done) { var V = POE_RX.c_vaults; V.stones.visible = false; V.bonepile.visible = true; V.bonepile.position.set(V.niche.x, 0, V.niche.z + 1.1); poeSfx("stone"); done(); }));
S.push(pCard("In pace requiescat!", function () { return poeQ("cask", "Against the new masonry I re-erected", 3); }, "…"));
})();
POE_CH.push({ t: "The Cask of Amontillado", key: "cask", year: "1846", tune: "dread", jump: true, start: { x: POE_AT.cask.x - 6, z: POE_AT.cask.z - 34, ry: Math.PI },
words: "“The thousand injuries of Fortunato I had borne as I best could; but when he ventured upon insult, I vowed revenge.”",
intro: "Carnival. A friend in cap and bells. A pipe of Amontillado.",
warn: ["You are the murderer. A man is walled up alive, tier by tier, and you lay every stone.", "A dark tale of revenge in the catacombs, told as Poe told it, without gore."],
setup: poeCaskSetup,
hooks: { flambeau: function () { poeSay("A flambeau in its sconce."); }, medoc: function () { poeSay("Medoc, on the mould."); }, degrave: function () { poeSay("A flagon of De Grâve."); }, bones: function () { poeSay("The bones of the Montresors."); }, wall: function () { poeSay("The recess: four feet deep, three wide, six or seven high."); } },
end: function () { poeFollow(POE.cast.fortunato, false); poeHide(POE.cast.fortunato); POE.vaultDim = null; },
steps: POE_CASK_STEPS });
function poeApe(P, x, z, ry, s) { return __ZC(467, 269, this, arguments, new.target); }
var POE_WIT = { "Pauline Dubourg, laundress": 38, "Pierre Moreau, tobacconist": 39, "Isidore Musèt, gendarme": 41, "Henri Duval, silversmith": 42, "Odenheimer, restaurateur": 43, "Jules Mignaud, banker": 44, "Adolphe Le Bon, in the cell": 45, "William Bird, tailor": 46, "Alfonzo Garcio, undertaker": 48, "Alberto Montani, confectioner": 49, "Paul Dumas, physician": 51, "Alexandre Etienne, surgeon": 52 };
function poeMorgueSetup(f) { return __ZC(467, 270, this, arguments, new.target); }
var POE_MORGUE_OUT = 0, POE_MORGUE_HOME = 0, POE_MORGUE_APE = 9999;
function poeWitStep(name, h) { return pTalk(name, h, [name, function () { return poeP("morgue", POE_WIT[name]); }, "Note it"]); }
function poeVoiceQ(who, ans, opts) { return pQuiz("The shrill voice", function () { return "<p>" + who + " What did this witness take the shrill voice to be?</p>"; }, opts.map(function (o) { return [o, "", o === ans, "Read the deposition again."]; })); }
var POE_MORGUE_STEPS = [
pRead(),
pCard("The analyst", function () { return poeQ("morgue", "As the strong man exults in his physical ability", 3) + poeQ("morgue", "The narrative which follows will appear", 1); }, "Paris, in the spring of 18—"),
pFind("book", { room: "r_shop", lx: -2.4, lz: 0.6 }, "A very rare and very remarkable volume", "An obscure library in the Rue Montmartre: search for the very rare and very remarkable volume you have come for", {}),
pTalk("C. Auguste Dupin", "Another hand is on the same volume. Speak to the young gentleman", ["C. Auguste Dupin", function () { return poeP("morgue", 7, 8); }, "Live together during your stay in the city"]),
pGo({ room: "r_dupin" }, "You rent, and furnish in a style which suits the rather fantastic gloom of your common temper, a time-eaten and grotesque mansion in a retired and desolate portion of the Faubourg St. Germain: go there", { on: function () { poeMove(POE.cast.dupin, "r_dupin", -2.2, -1.4, Math.PI / 2 + 0.5); } }),
pCard("Enamored of the Night for her own sake", function () { return poeP("morgue", 9, 10); }, "At the first dawn of the morning, close all the massy shutters"),
pGather("candle", { room: "r_dupin", lx: 0.5, lz: 0 }, 2, "A strongly perfumed taper", "Counterfeit her presence: light a couple of tapers which throw out only the ghastliest and feeblest of rays", { spread: 2.5, verb: "light it", each: "One." })
];
POE_MORGUE_OUT = POE_MORGUE_STEPS.length;
POE_MORGUE_STEPS = POE_MORGUE_STEPS.concat([
pGo(function () { return poeParW(POE_PAR_MON.dupinWalk[0], POE_PAR_MON.dupinWalk[1]); }, "The advent of the true Darkness: sally forth into the streets, arm in arm, roaming far and wide until a late hour", { r: 7, on: function () { poeFollow(POE.cast.dupin, true, 2); } }),
pHold(function () { return poeParW(POE_PAR_MON.palaisroyal[0], POE_PAR_MON.palaisroyal[1]); }, 14, "A long dirty street in the vicinity of the Palais Royal. Being both, apparently, occupied with thought, neither of you speaks a syllable for fifteen minutes at least. Walk on in silence.", { r: 60 }),
pCard("All at once Dupin broke forth", function () { return poeP("morgue", 14, 17); }, "“Tell me, for Heaven’s sake, the method!”"),
pCard("The fruiterer", function () { return poeP("morgue", 20, 24); }, "Retrace the course of your own meditations"),
pOrder("Retrace the chain of your own thoughts, from the rencontre with the fruiterer to Chantilly", "The larger links of the chain", "<p>Dupin read them in your face and your steps. Put the links in the order you thought them, beginning with the man who ran up against you.</p>", ["The fruiterer, with his basket of apples, thrusts you upon a pile of paving-stones", "The street stones: you look sulkily at the holes and ruts in the pavement", "Stereotomy: the little alley paved with overlapping and riveted blocks", "Epicurus, and the atomies", "Dr. Nichols, and the late nebular cosmogony", "Orion: you look up at the great nebula", "Chantilly, the cobbler turned tragedian: “He is a very little fellow”"]),
pCard("Perdidit antiquum litera sonum", function () { return poeP("morgue", 29); }, "Home"),
pGo({ room: "r_dupin" }, "Not long after this: home, to the evening edition of the Gazette des Tribunaux", {}),
]);
POE_MORGUE_HOME = POE_MORGUE_STEPS.length;
POE_MORGUE_STEPS = POE_MORGUE_STEPS.concat([
pSpot("The Gazette des Tribunaux", "Look over the evening edition of the “Gazette des Tribunaux”", null, { on: function () { poeFollow(POE.cast.dupin, false); poeMove(POE.cast.dupin, "r_dupin", -2.2, -1.4, Math.PI / 2 + 0.5); }, hooks: { gazette: function () { poeCard("EXTRAORDINARY MURDERS", poeP("morgue", 31)); } } }),
pCard("The apartment was in the wildest disorder", function () { return poeA(poeP("morgue", 32, 35), poeP("morgue", 32) + "<p style='font-style:italic'>The daughter was found dead in the chimney; the mother, dead, in a small paved yard in the rear of the building. “To this horrible mystery there is not as yet, we believe, the slightest clew.”</p>"); }, "The next day’s paper has additional particulars"),
pGo({ room: "r_cafe" }, "Many individuals have been examined. Go and hear them for yourself: most are to be found at a café in the Rue St. Roch"),
poeWitStep("Pauline Dubourg, laundress", "Hear Pauline Dubourg, laundress"),
poeWitStep("Pierre Moreau, tobacconist", "Hear Pierre Moreau, tobacconist"),
poeWitStep("Henri Duval, silversmith", "Hear Henri Duval, a neighbor, and by trade a silver-smith"),
poeWitStep("Odenheimer, restaurateur", "Hear Odenheimer, restaurateur, a native of Amsterdam"),
poeWitStep("William Bird, tailor", "Hear William Bird, tailor, an Englishman"),
poeWitStep("Alfonzo Garcio, undertaker", "Hear Alfonzo Garcio, undertaker, a native of Spain"),
poeWitStep("Alberto Montani, confectioner", "Hear Alberto Montani, confectioner, an Italian"),
pGo({ room: "r_pref" }, "The banker, the clerk and the medical men are at the Préfecture: go there"),
poeWitStep("Jules Mignaud, banker", "Hear Jules Mignaud, banker, of the firm of Mignaud et Fils"),
poeWitStep("Adolphe Le Bon, in the cell", "Hear Adolphe Le Bon, clerk to Mignaud et Fils, who has been arrested and imprisoned"),
poeWitStep("Paul Dumas, physician", "Hear Paul Dumas, physician, who viewed the bodies about day-break"),
poeWitStep("Alexandre Etienne, surgeon", "Hear Alexandre Etienne, surgeon"),
pTalk("G—, the Prefect of Police", "Dupin knows G—, the Prefect of Police. Obtain the necessary permission to see the premises with your own eyes", ["G—, the Prefect of Police", "<p>“An insoluble mystery, the papers call it. We have Le Bon. But Monsieur Dupin once did me a service. Go; look; the gendarme Musèt has the house.”</p>" + poeP("morgue", 57), "To the Rue Morgue"]),
pGo({ room: "r_house" }, "The Rue Morgue: one of those miserable thoroughfares which intervene between the Rue Richelieu and the Rue St. Roch. Ring, show your credentials, and be admitted by the agents in charge"),
poeWitStep("Isidore Musèt, gendarme", "Hear Isidore Musèt, gendarme, who forced the gateway with a bayonet"),
pCard("The voices", function () { return poeNote("You have every deposition. All agree about the gruff voice: a Frenchman’s. Now set down what each made of the other, the shrill voice; or, as one called it, the harsh voice."); }, "Begin with the gendarme"),
poeVoiceQ("Isidore Musèt, a Frenchman.", "A Spaniard", ["A Spaniard", "An Italian", "A German"]),
poeVoiceQ("Henri Duval, a Frenchman, not acquainted with the Italian language.", "An Italian", ["A Frenchman", "An Italian", "An Englishman"]),
poeVoiceQ("Odenheimer, of Amsterdam, who speaks no French and was examined through an interpreter.", "A Frenchman", ["A Frenchman", "A Dutchman", "A Russian"]),
poeVoiceQ("William Bird, an Englishman, who does not understand German.", "A German", ["An Englishman", "A German", "A Spaniard"]),
poeVoiceQ("Alfonzo Garcio, a native of Spain, who does not understand the English language, but judges by the intonation.", "An Englishman", ["A Spaniard", "An Englishman", "An Italian"]),
poeVoiceQ("Alberto Montani, an Italian, who has never conversed with a native of Russia.", "A Russian", ["An Italian", "A Russian", "A Frenchman"]),
pQuiz("What is peculiar in the evidence", "<p>Dupin: “That was the evidence itself; but it was not the peculiarity of the evidence. You have observed nothing distinctive. Yet there was something to be observed.” What?</p>", [["Each speaks of the shrill voice as that of a foreigner; each is sure it was not the voice of one of his own countrymen; each likens it to a language he does not understand. And no words, no sounds resembling words, were distinguishable", "", true], ["That the gruff voice was French", "", false, "There was unanimity there. The peculiarity lies with the other voice."], ["That two voices were heard at all", "", false, "Nearer. What did each man make of the shrill one?"]]),
pGo({ room: "r_room" }, "Go up stairs, into the chamber where the body of Mademoiselle L’Espanaye was found"),
pCard("The disorders of the room", function () { return poeP("morgue", 60); }, "Scrutinize every thing"),
pSpot("The gold on the floor", "Scrutinize every thing. First: the gold", null, { hooks: { gold: function () { poeCard("Four thousand francs in gold", poeQ("morgue", "In a word, why did he abandon", 2) || poeNote("Two bags, containing nearly four thousand francs in gold: abandoned upon the floor.")); } } }),
pQuiz("The motive", "<p>The gold delivered three days before by the banker’s clerk lies, in bags, upon the floor. What does that tell you of the motive?</p>", [["If gold was the motive, the perpetrator was so vacillating an idiot as to abandon his gold and his motive together. Dismiss the blundering idea of motive", "", true], ["That the robbers were disturbed", "", false, "By whom? The party broke in minutes later, and no one was there."], ["That Le Bon is guilty", "", false, "Coincidences ten times as remarkable happen to all of us every hour of our lives."]]),
pSpot("The bureau", "The drawers of the bureau", null, { hooks: { bureau: function () { poeCard("The bureau", poeQ("morgue", "The drawers of the bureau, it is said, had been rifled", 3)); } } }),
pSpot("The chair with the razor", "The chair, and what lies upon it", null, { hooks: { razor: function () { poeCard("A razor", poeA("<p style='font-style:italic'>“On a chair lay a razor, besmeared with blood.”</p>", "<p>On a chair lay a razor.</p>")); } } }),
pSpot("The hearth", "The hearth", null, { hooks: { hearth: function () { poeCard("The hearth", poeA(poeQ("morgue", "On the hearth were thick tresses", 3), "<p>On the hearth lie thick tresses, very thick tresses, of grey human hair, pulled out by the roots. You know what force it takes to pull out even twenty or thirty hairs together.</p>")); } } }),
pSpot("The chimney", "The chimney", null, { hooks: { chimney: function () { return __ZC(467, 271, this, arguments, new.target); } } }),
pGo({ room: "r_back" }, "The small back chamber"),
pSpot("The window over the paved yard", "Look from its window into the small paved yard in the rear of the building", null, { hooks: { yard: function () { poeCard("The yard", poeA(poeP("morgue", 34), "<p>In the yard below lay the old lady. She had fallen from the window of the chamber; so much the police never thought to see, because the shutters hid the sill.</p>")); } } }),
pQuiz("The means of egress", "<p>Dupin: “Let us now transport ourselves, in fancy, to this chamber. What shall we first seek here?” The doors were locked, the keys inside. The chimneys will not admit the body of a large cat. The front windows look on the crowd in the street.</p>", [["The murderers must have passed through the windows of the back room: the apparent impossibilities are, in reality, not such", "", true], ["They never left: they hid in the house", "", false, "The police laid bare the floors, the ceilings, the masonry of the walls. No secret issues."], ["Spirits", "", false, "Madame and Mademoiselle L’Espanaye were not destroyed by spirits. The doers of the deed were material, and escaped materially."]]),
pGo({ room: "r_room" }, "Back to the chamber: there are two windows"),
pDo("One window is unobstructed by furniture, and is wholly visible. A very stout nail is fitted into a gimlet-hole in its frame, nearly to the head. Endeavor to raise the sash", { spot: "The other window" }, "win2", function (a, f, done) { poeSfx("stone", { k: 0.15 }); poeCard("The unobstructed window", poeP("morgue", 73), [["It resists the utmost force", "", done]]); }, { auto: function () { poeHook("win2"); } }),
pQuiz("A posteriori", "<p>The murderers did escape from one of these windows. This being so, they could not have refastened the sashes from the inside, as they were found fastened. Yet the sashes were fastened. Therefore?</p>", [["They must have the power of fastening themselves. There is a concealed spring", "", true], ["The police fastened them afterward", "", false, "The police found them so."], ["The nail was driven in from outside", "", false, "A nail cannot be driven from outside through the frame into the sash."]]),
pSlow("Withdraw the nail with some difficulty; attempt the sash; search for the hidden spring; press it", { spot: "The other window" }, "win2", 3, 1.5, { each: function (k) { poeSay(["", "The nail is out. The sash still resists all your efforts.", "A careful search: here, a concealed spring.", "You press it. The sash would rise. You forbear to raise it."][k]); }, hastyT: "Look closely. It is hidden." }),
pQuiz("The nail", "<p>You replace the nail. A person passing out through this window might have reclosed it, and the spring would have caught: but the nail could not have been replaced. The conclusion is plain.</p>", [["The assassins must have escaped through the other window", "There must be found a difference between the nails, or at least between the modes of their fixture", true], ["The nail was replaced by an accomplice", "", false, "No one remained within."], ["Then they did not use the windows", "", false, "You have terminated the clew? Not so. Trace it on."]]),
pSlow("Get upon the sacking of the bedstead, and look over the head-board minutely at the second casement. Pass your hand down behind the board; press the spring; then touch the nail", { spot: "The window behind the head of the bedstead" }, "win1", 3, 1.5, { each: function (k) { return __ZC(467, 272, this, arguments, new.target); }, hastyT: "Minutely." }),
pCard("There must be something wrong about the nail", function () { return poeP("morgue", 77, 78); }, "The riddle, so far, is unriddled"),
pFind("hair", { room: "r_room", lx: 0.4, lz: -2.6 }, "A little tuft, disentangled from the rigidly clutched fingers of Madame L’Espanaye", "One thing more in this room, which the police let lie: a little tuft", {}),
pGo(function () { return poeParRod(1.4, 1.5); }, "The mode of descent. Go round to the rear of the building", { r: 4 }),
pSpot("The lightning-rod", "About five feet and a half from the casement in question there runs a lightning-rod: look at it closely, and at the shutters of the fourth story", null, { hooks: { rod: function () { poeCard("The lightning-rod, and the shutter", poeP("morgue", 79)); } } }),
pQuiz("The shutter", "<p>The shutters are of the kind Parisian carpenters call ferrades: a single door, the upper half latticed, fully three feet and a half broad. If the shutter of the window at the head of the bed were swung fully back to the wall, how near would it reach to the lightning-rod?</p>", [["To within two feet of it", "By exertion of a very unusual degree of activity and courage, an entrance into the window, from the rod, might have been thus effected", true], ["It would touch it", "", false, "Not quite. Within two feet."], ["No nearer than five feet and a half", "", false, "That is the casement. The shutter, swung back, is three feet and a half broad."]]),
pFind("ribbon", function () { return poeParRod(0.8, 0.9); }, "A small piece of ribbon", "At the foot of the lightning-rod: pick it up", {}),
pGo({ room: "r_dupin" }, "Home. It is his humor now to decline all conversation on the subject of the murder, until about noon the next day", { on: function () { poeFollow(POE.cast.dupin, false); poeMove(POE.cast.dupin, "r_dupin", -2.2, -1.4, Math.PI / 2 + 0.5); } }),
pTalk("C. Auguste Dupin", "Noon. He asks you, suddenly, if you observed any thing peculiar at the scene of the atrocity", ["C. Auguste Dupin", function () { return poeP("morgue", 64) + poeP("morgue", 66); }, "Take the pistols"]),
pCard("A very unusual degree of activity", function () { return poeP("morgue", 80, 81); }, "Shift the question from the mode of egress to that of ingress"),
pQuiz("Draw them together", "<p>An agility astounding. A strength superhuman. A ferocity brutal. A butchery without motive. A grotesquerie in horror absolutely alien from humanity. And a voice foreign in tone to the ears of men of many nations, and devoid of all distinct or intelligible syllabification. What result, then, has ensued? What impression has been made upon your fancy?</p>", [["“A madman has done this deed: some raving maniac, escaped from a neighboring Maison de Santé.”", "Your idea is not irrelevant, in some respects", true], ["“A band of robbers.”", "", false, "The gold lay on the floor."], ["“Le Bon.”", "", false, "A clerk, with the strength to thrust a body up a chimney?"]]),
pCard("But the voices of madmen", function () { return poeP("morgue", 88, 90); }, "Glance at the little sketch"),
pDo("He has traced upon paper a fac-simile of the dark bruises and deep indentations of finger nails upon the throat. Attempt to place all your fingers, at the same time, in the respective impressions as you see them", { spot: "Dupin's drawing of the bruises upon the throat" }, "draw", function (a, f, done) { f.dr = (f.dr || 0) + 1; if (f.dr < 2) {
poeCard("The drawing, spread upon the table", poeP("morgue", 91, 93));
return;
} poeCard("Wrapped around a billet of wood", poeP("morgue", 94), [["“This is the mark of no human hand.”", "", done]]); }, { bar: function (f) { return f.dr ? "now wrap the drawing around the billet of wood, and try again" : ""; }, auto: function () { poeHook("draw"); poeHook("draw"); } }),
pFind("book", { room: "r_dupin", lx: 3.4, lz: -2.2 }, "A volume of Cuvier", "“Read now this passage from Cuvier.” Take down the volume", {}),
pCard("The large fulvous Ourang-Outang of the East Indian Islands", function () { return poeP("morgue", 96, 97); }, "But there were two voices"),
pQuiz("The gruff voice", "<p>Two voices were heard in contention, and one of them was unquestionably the voice of a Frenchman, saying “mon Dieu!” in remonstrance or expostulation. What do you build upon those two words?</p>", [["A Frenchman was cognizant of the murder. It is possible, indeed far more than probable, that he was innocent of all participation: the Ourang-Outang may have escaped from him; he may have traced it to the chamber, and could not recapture it", "", true], ["The Frenchman did the murders, and brought the ape to hide them", "", false, "The words were of remonstrance. And he fled; he did not strike."], ["The ape can speak French", "", false, "The shrill voice had no syllables at all."]]),
pQuiz("The ribbon", "<p>The piece of ribbon from the foot of the lightning-rod is greasy, and has evidently been used in tying the hair in one of those long queues. And this knot is one which few besides sailors can tie, and is peculiar to the Maltese. So the Frenchman is…</p>", [["A sailor belonging to a Maltese vessel", "", true], ["A hairdresser", "", false, "The knot. Few besides sailors can tie it."], ["A soldier of Malta", "", false, "A sailor: the queue, the grease, the knot."]]),
pGo({ room: "r_shop" }, "If he is innocent, an advertisement will bring him to our residence. Carry it to the office of “Le Monde”, a paper devoted to the shipping interest, and much sought by sailors"),
pDo("Hand in the advertisement", { spot: "The counter: advertisements taken for Le Monde" }, "advert", function (a, f, done) { poeCard("CAUGHT", poeP("morgue", 100), [["“In the Bois de Boulogne”: at a vast distance from the scene of that butchery", "He will reason: I am innocent; I am poor; my Ourang-Outang is of great value; why should I lose it through idle apprehensions of danger?", done]]); }, { auto: function () { poeHook("advert"); } }),
pGo({ room: "r_dupin" }, "Home, and wait. He will come."),
pGather("pistol", { room: "r_dupin", lx: 1.2, lz: 0.4 }, 2, "A pistol", "“Be ready with your pistols, but neither use them nor show them until at a signal from myself”", { spread: 1.2, each: "One." }),
pHold({ room: "r_dupin", lx: 0, lz: 0 }, 12, "The front door of the house has been left open. Wait.", { r: 9, done: function () { return __ZC(467, 273, this, arguments, new.target); } }),
pTalk("The sailor", "A step upon the stairs; it hesitates; it descends; it comes up again with decision. “Come in,” says Dupin, in a cheerful and hearty tone.", ["The sailor", function () { return poeP("morgue", 107, 111); }, "“I shall be sorry to part with him.”"]),
pCard("What should I have?", function () { return poeP("morgue", 114, 115); }, "Dupin says the last words in a very low tone, and very quietly"),
pDo("Just as quietly, walk toward the door, lock it, and put the key in your pocket", { spot: "The door of the room" }, "lock", function (a, f, done) { poeSfx("clang", { k: 0.2 }); poeCard("He draws a pistol from his bosom and places it, without the least flurry, upon the table", poeP("morgue", 117, 120), [["“I will tell you all I know about this affair”", "", done]]); }, { auto: function () { poeHook("lock"); } }),
pCard("What he stated was, in substance, this", function () { return poeP("morgue", 121, 122); }, "The ape, razor in hand, was through the door and down the stairs", { done: function () { poeVeil(poeSec(1.2), function () { POE.flash = 1; var Q = poeParRod(3, 4); poeOutside(null, { x: Q.x, z: Q.z, ry: Math.atan2(POE.rod.n[0], POE.rod.n[1]) - Math.PI, par: 1 }); if (POE.ape) {
var Q2 = poeParRod(0.5, 0);
POE.ape.visible = true;
POE.ape.position.set(Q2.x, 3, Q2.z);
} }, poeSec(0.6)); } }),
pHold(function () { return poeParRod(3, 4); }, 12, "Three o’clock in the morning, as the sailor saw it. The streets are profoundly quiet. A light gleams from the open window of the fourth story. Watch the lightning-rod.", { r: 12, on: function () { var k = poeKey(), t = 0; if (POE.ape)
POE.ape.visible = true; poeEvery(function (dt) { if (poeKey() !== k)
return false; t += dt / poeSec(9); if (POE.ape)
POE.ape.position.y = 3 + Math.min(1, t) * 11; if (t >= 1) {
poeSfx("ape");
return false;
} }); }, done: function () { poeSfx("shriek"); } }),
pCard("The rod is ascended without difficulty", function () { return poeP("morgue", 123, 124) + poeA(poeP("morgue", 125, 126), "<p style='font-style:italic'>As the sailor looked in, the gigantic animal had seized Madame L’Espanaye. The screams and struggles of the old lady had the effect of changing the probably pacific purposes of the Ourang-Outang into those of wrath. What followed in that room the sailor saw from the rod; and, shrinking aghast, he rather glided than clambered down, and hurried at once home, dreading the consequences of the butchery, and gladly abandoning, in his terror, all solicitude about the fate of the Ourang-Outang.</p>"); }, "The words heard by the party upon the staircase were the Frenchman’s exclamations of horror and affright", { done: function () { if (POE.ape) {
POE.ape.position.set(POE.cage.x, poeGround(POE.cage.x, POE.cage.z), POE.cage.z);
} } }),
pSpot("The cage at the Jardin des Plantes", "The Ourang-Outang was subsequently caught by the owner himself, who obtained for it a very large sum at the Jardin des Plantes. Go and see it.", null, { on: function () { if (POE.ape) {
POE.ape.visible = true;
POE.ape.position.set(POE.cage.x, poeGround(POE.cage.x, POE.cage.z), POE.cage.z);
} }, hooks: { cage: function () { poeSfx("ape"); poeCard("The Ourang-Outang", poeQ("morgue", "The gigantic stature, the prodigious strength and activity", 1)); } } }),
pGo({ room: "r_pref" }, "Le Bon is instantly released, upon your narration of the circumstances at the bureau of the Prefect of Police: go there"),
pTalk("G—, the Prefect of Police", "The functionary cannot altogether conceal his chagrin at the turn which affairs have taken", ["G—, the Prefect of Police", function () { poeHide(POE.cast.lebon); return poeP("morgue", 127) + poeP("morgue", 128); }, "“De nier ce qui est, et d’expliquer ce qui n’est pas.”"])
]);
POE_MORGUE_APE = POE_MORGUE_STEPS.length - 5;
POE_CH.push({ t: "The Murders in the Rue Morgue", key: "morgue", year: "1841", tune: "paris", jump: true, start: { room: "r_shop", at: { x: 0, z: 2.4, ry: 0 } },
words: "“What song the Syrens sang, or what name Achilles assumed when he hid himself among women, although puzzling questions, are not beyond all conjecture.”",
intro: "Paris. A locked room on the fourth story. Dupin.",
warn: ["The first detective story, and a brutal one: two women killed in a locked room, described as the newspapers of the tale describe it.", "The first detective story: a locked room, twelve witnesses, and a mind that sees. The deaths are told without the gore."],
setup: poeMorgueSetup,
hooks: { gazette: function () { poeCard("The Gazette des Tribunaux", poeP("morgue", 31)); }, draw: function () { poeSay("A sketch of bruises, each the size of a thumb, and more."); }, lock: function () { poeSay("The door."); }, cage: function () { poeSay("An empty cage."); },
rod: function () { poeCard("The lightning-rod", poeQ("morgue", "About five feet and a half from the casement", 1)); }, win1: function () { poeSay("The window behind the head of the bedstead."); }, win2: function () { poeSay("The other window, nailed."); },
gold: function () { poeSay("Gold, on the floor."); }, bureau: function () { poeSay("Drawers, open."); }, razor: function () { poeSay("A razor."); }, hearth: function () { poeSay("The hearth."); }, chimney: function () { poeSay("A narrow chimney."); }, yard: function () { poeSay("A small paved yard."); }, advert: function () { poeSay("“Advertisements for Le Monde, monsieur?”"); } },
end: function () { poeFollow(POE.cast.dupin, false); poeHide(POE.cast.sailor); if (POE.cast.lebon)
POE.cast.lebon.g.visible = true; },
steps: POE_MORGUE_STEPS });
Object.assign(POE_WEAR, {
m15: { x: { coat: "long", coatStuff: "cloth", coatTrim: "plain", breeches: true, stock: 0xE8E2D4, collar: "low", tie: "soft", shoes: 0x2A1A10, add: ["oz:belt"] } },
rich15: { x: { coat: "long", coatStuff: "velvet", coatTrim: "gold", vestStuff: "velvet", breeches: true, stock: 0xF2EEE6, collar: "low", tie: "soft", shoes: 0x1A1010, add: ["oz:belt"] } },
fleming: { x: { coat: "long", coatCol: 0x1A1A1E, coatStuff: "velvet", coatTrim: "plain", vest: 0x3A2A1A, breeches: true, stock: 0xF2EEE6, collar: "low", tie: "soft", shoes: 0x141010, add: ["oz:belt"] } },
student: { x: { coat: "jacket", coatStuff: "cloth", coatTrim: "plain", breeches: true, stock: 0xE8E2D4, collar: "low", tie: "soft", shoes: 0x2A1A10, add: ["oz:belt"] } },
archer: { x: { coat: "military", coatCol: 0x6A1A1A, breeches: true, trou: 0x2A2A3A, stock: 0x5A5A60, shoes: 0x2A1A10, add: ["oz:sash", "oz:belt"] } },
truand: { x: { shirt: 0xB8A888, vest: 0x4A3A2A, trou: 0x5A4A38, stock: 0xB8A888, collar: "low", tie: "soft", tieCol: 0x3A2A1A, shoes: 0x2A1E14 } },
priest15: { f: 1, x: { dress: 0x0E0C0E, skirt: 0x0C0A0C, sl: "long", len: "ankle", flare: 0.1, stuff: "cloth", trim: 0x141214, pelerine: 0x0E0C0E } },
canon15: { f: 1, x: { dress: 0xF0ECE2, skirt: 0x141214, sl: "long", len: "ankle", flare: 0.12, stuff: "cloth", trim: 0xE8E4DA, pelerine: 0x2A1A2A } },
cardinal: { f: 1, x: { dress: 0xA8101A, skirt: 0xA8101A, sl: "long", len: "ankle", flare: 0.18, stuff: "satin", trim: 0xF0ECE2, pelerine: 0xA8101A } },
king15: { x: { coat: "long", coatCol: 0x3A3028, coatStuff: "cloth", coatTrim: "plain", vest: 0x2A2420, breeches: true, stock: 0xE0DACC, collar: "low", tie: "soft", shoes: 0x1A1410, add: ["oz:belt"] } },
quasi: { x: { coat: "jacket", coatCol: 0x7A2A1A, coatStuff: "cloth", coatTrim: "plain", vest: 0x5A4A2A, breeches: true, trou: 0x4A3A2A, stock: 0x8A7A5A, collar: "low", tie: "soft", tieCol: 0x3A2A1A, shoes: 0x2A1A10, add: ["oz:belt"] } },
gypsy: { f: 1, x: { dress: 0xC8961E, skirt: 0xB8202A, sl: "puff", len: "ankle", flare: 0.38, stuff: "satin", trim: 0xE8C040, pelerine: null } },
lady15: { f: 1, x: { sl: "long", len: "ankle", flare: 0.3, stuff: "velvet", trim: 0xE8D8B0, pelerine: null } },
wife15: { f: 1, x: { sl: "long", len: "ankle", apron: 0xE8E2D4, stock: 0xE8E2D4, flare: 0.2, pelerine: null } },
recluse: { f: 1, x: { dress: 0x5A5048, skirt: 0x4A4038, sl: "long", len: "ankle", flare: 0.08, stuff: "cloth", trim: 0x3A3028, pelerine: 0x3A3028 } }
});
POE_ROLE.unshift([/^Quasimodo/, "quasi"], [/^La Esmeralda|^Esmeralda/, "gypsy"], [/^Dom Claude Frollo|^Claude Frollo|^The archdeacon/, "priest15"], [/^Captain Phoebus|^Phoebus|^An archer|^The archers|^Tristan/, "archer"], [/^Pierre Gringoire|^Gringoire/, "m15"], [/^Jehan Frollo|^Robin Poussepain|^A student|^A scholar/, "student"], [/^Clopin|^A truand|^Mathias Hungadi|^A vagabond/, "truand"], [/^Master Jacques Coppenole|^Guillaume Rym|^A Flemish|^The Flemish/, "fleming"], [/^Monsieur the Cardinal|^The Cardinal/, "cardinal"], [/^Compère Tourangeau|^King Louis/, "king15"], [/^Fleur-de-Lys|^Madame Aloïse|^A lady of/, "lady15"], [/^Sister Gudule|^The recluse|^Paquette/, "recluse"], [/^Master Jacques Coictier/, "rich15"], [/^A canon|^Dom /, "canon15"], [/^Mahiette|^Gervaise|^Oudarde|^La Falourdel|^A woman of|^A goodwife/, "wife15"]);
function poeNdHat(r, L) { return __ZC(467, 274, this, arguments, new.target); }
(function () {
var f = poeProps;
poeProps = function (add, c, E) {
var L = (E && E.spec && E.spec.look) || {}, r = String(L._pr || "");
if (r === "quasi") {
poeNdQuasiProps(add, L);
return;
}
if (r === "gypsy") {
var band = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.01, 4, 20), poeWM(0xE8C040, { r: 0.2, m: 0.9 }));
band.rotation.x = Math.PI / 2 - 0.25;
add("Head", [0, 0.1, 0], band);
for (var i = 0; i < 7; i++) {
var a = -1.2 + i * 0.4, cn = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.003, 8), poeWM(0xF0C848, { r: 0.2, m: 0.95 }));
cn.rotation.x = Math.PI / 2;
cn.position.set(Math.sin(a) * 0.118, 0.075, Math.cos(a) * 0.118);
add("Head", [cn.position.x, cn.position.y, cn.position.z], cn);
}
if (!L._noTamb) {
var tb = new THREE.Group(), rim = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.04, 18, 1, true), poeWM(0x8A5A2A, { r: 0.6 }));
rim.material.side = THREE.DoubleSide;
tb.add(rim);
var skin = new THREE.Mesh(new THREE.CircleGeometry(0.125, 18), poeWM(0xE8D8B0, { r: 0.9 }));
skin.rotation.x = -Math.PI / 2;
skin.position.y = 0.02;
tb.add(skin);
for (var j = 0; j < 5; j++) {
var ja = j / 5 * Math.PI * 2, jg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.004, 8), poeWM(0xE8C040, { r: 0.2, m: 0.9 }));
jg.position.set(Math.cos(ja) * 0.13, 0, Math.sin(ja) * 0.13);
jg.rotation.z = Math.PI / 2;
tb.add(jg);
}
tb.rotation.x = Math.PI / 2;
add("hand_r", [0, -0.06, 0.05], tb);
}
return;
}
if (r === "priest15") {
if (L._cowl) {
var hd = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.42, 14, 1, true), poeWM(0x0C0A0C, { r: 1 }));
hd.material.side = THREE.DoubleSide;
hd.position.set(0, 0.1, -0.03);
add("Head", [0, 0.06, -0.01], hd);
}
else {
var ton = new THREE.Mesh(new THREE.CircleGeometry(0.05, 14), poeWM(0xD8B8A0, { r: 0.6 }));
ton.rotation.x = -Math.PI / 2;
add("Head", [0, 0.18, -0.02], ton);
}
return;
}
var H = POE_WEAR[r] && poeNdHat(r, L);
if (H) {
add("Head", H[1], H[0]);
if (r === "archer" && !L._noArms) {
var hal = new THREE.Group(), sh = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.1, 6), poeWM(0x4A3020, { r: 0.8 }));
hal.add(sh);
var bl = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.16), poeWM(0x9A9AA0, { r: 0.3, m: 0.9 }));
bl.position.set(0, 1.0, 0.06);
hal.add(bl);
add("hand_r", [0, 0.1, 0], hal);
}
return;
}
return f.apply(this, arguments);
};
})();
function poeNdQuasiProps(add, L) { return __ZC(467, 275, this, arguments, new.target); }
function poeNdQuasi(R, key, x, z, ry, o) { return __ZC(467, 276, this, arguments, new.target); }
function poeNdGoat(P, x, z, ry) { return __ZC(467, 277, this, arguments, new.target); }
var POE_ND_WHO = {
"Quasimodo": ["Quasimodo, the bell-ringer of Notre-Dame in 1482, about twenty years old: hunchbacked, one-eyed, lame, and deaf from the bells; enormously strong; abandoned as a baby on the foundlings' bed on Quasimodo Sunday 1467 and taken in by Claude Frollo, whom he obeys like a dog; he loves the cathedral and his bells (Marie, Jacqueline, Gabrielle, Thibauld...) above all things. He is deaf: he reads lips poorly, answers in very few rough words or by signs, and is suspicious of everyone except Dom Claude; with Esmeralda (after the water at the pillory) he is gentle and humble", "his bells, the towers, the gargoyles, Dom Claude, the parvis below, people who laugh at him", "(He looks at you with his one eye, and says nothing. Then, roughly:) What?"],
"La Esmeralda": ["La Esmeralda, a girl of sixteen who dances in the squares of Paris in 1482 with her goat Djali; she was raised among the Egyptians (gypsies) and wears an amulet, a little bag of green silk round her neck, given her as the sign by which she will find her mother; gentle, proud, quick, generous, a little childish; she loves Captain Phoebus de Châteaupers with all her heart", "dancing, Djali and her tricks, the Cour des Miracles, Phoebus, her amulet, her lost mother, the cruelty and kindness of the Parisians", "Who are you? Djali, be still. Did you see the dance?"],
"Dom Claude Frollo": ["Dom Claude Frollo, archdeacon of Josas at Notre-Dame in 1482, about thirty-six: tall, grave, bald on the crown, his brow furrowed; immensely learned (theology, medicine, the law, Latin, Greek and Hebrew) and secretly given to alchemy in his cell at the top of the north tower; he raised his little brother Jehan and the foundling Quasimodo; stern and cold in speech, and consumed inside by a passion he despises", "learning, the books and the stones of the cathedral, alchemy (but guardedly), his brother Jehan's follies, the gypsy girl (with sudden hostility), fate (ἀνάγκη)", "(He looks at you from under his heavy brows.) What do you want of me?"],
"Pierre Gringoire": ["Pierre Gringoire, a poor poet and philosopher of Paris in 1482, author of the mystery play performed in the great hall of the Palais at the Feast of Kings; vain about his verses, good-humoured, always hungry, always thinking; later married to la Esmeralda by the broken jug in the Cour des Miracles (in name only) and devoted to her goat Djali", "his mystery 'The Good Judgment of Madame the Virgin Mary', poetry, philosophy, his hunger, the truands, Djali, the follies of Paris", "Ah, a listener! Monsieur, have you seen my mystery? It is called 'The Good Judgment of Madame the Virgin Mary'."],
"Captain Phoebus de Châteaupers": ["Phoebus de Châteaupers, a captain of the archers of the king's ordnance in Paris in 1482, handsome, gay, vain and empty; he swears like a trooper, drinks with Jehan Frollo, and is betrothed to his cousin Fleur-de-Lys de Gondelaurier", "his archers, horses, taverns, women, his cousin Fleur-de-Lys, the gypsy girl he rescued", "Hey! Bonjour. Phoebus de Châteaupers, captain of the king's archers, at your service. Have you seen a little gypsy pass by?"],
"Clopin Trouillefou": ["Clopin Trouillefou, King of Thunes (King of the beggars and truands) of the Cour des Miracles in 1482: a cripple by day and whole by night, a sly, rough, merry rogue who judges every stranger who wanders into his kingdom", "the laws of the Cour des Miracles, the argotiers, the Egyptians, the Galileans, the Emperor of Galilee and the Duke of Egypt, purses, the gallows", "Who are you, rascal? Speak, and speak quickly: this is the court of the King of Thunes."],
"Jehan Frollo du Moulin": ["Jehan Frollo du Moulin, the younger brother of the archdeacon, a scholar of the University in 1482 aged about sixteen: idle, witty, impudent, always short of money, always at the taverns", "his brother's sermons, taverns (the Pomme d'Ève), the girls of the Rue de Glatigny, money, Latin jokes", "Hey, hey! A new face! Lend me a sou, there's a good fellow; my brother the archdeacon is as tight as a vault."],
"Master Jacques Coppenole": ["Master Jacques Coppenole, hosier of Ghent, one of the Flemish envoys come to Paris in 1482 for the marriage of the Dauphin and Margaret of Flanders: proud of being a hosier, plain-spoken, scornful of courtiers, beloved of the Paris crowd", "Ghent, his trade, the people, the King of France and the Duke of Burgundy, revolts, the Feast of Fools he proposes", "Master Jacques Coppenole, hosier, at the sign of the Three Little Chains, in Ghent. A hosier, mark you: not a lord."]
};
function poeNdTalk(name, extra) { return __ZC(467, 278, this, arguments, new.target); }
var ND_KING_GEO = null;
function ndKingGeo() { return __ZC(467, 279, this, arguments, new.target); }
function ndKing(P, x, y, z, ry, rc, mc, s, lite) { return __ZC(467, 280, this, arguments, new.target); }
var POE_BOOK = "poe", ND_CH = [], POE_CH_POE = POE_CH;
var ND_ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
function poeNdOn() { return POE_BOOK === "nd"; }
function poeBookUse(k) { if (POE_BOOK === k)
return; POE_BOOK = k; POE_CH = k === "nd" ? ND_CH : POE_CH_POE; POEB.readOpen = 0; POEB.readAsk = 0; POEB.puz = null; poeItemsClear(); }
(function () {
var f = poeBS;
poeBS = function () {
if (POE_BOOK !== "nd")
return f();
if (!store.ndbook)
store.ndbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0 };
var S = store.ndbook;
S.f = S.f || {};
S.keeps = S.keeps || [];
return S;
};
})();
var ND_TXT = { b: {}, wait: {} };
function ndText(b, cb) { return __ZC(467, 281, this, arguments, new.target); }
function ndIdx(b, needle) { var D = ND_TXT.b[b]; if (!D)
return -1; for (var i = 0; i < D.p.length; i++)
if (D.p[i].indexOf(needle) >= 0)
return i; return -1; }
function ndP(b, needle, n) {
var D = ND_TXT.b[b], i = ndIdx(b, needle);
if (!D)
return poeNote("(Hugo's page is on its way.)");
if (i < 0)
return "";
var o = "";
for (var k = i; k < i + (n || 1) && k < D.p.length; k++)
o += "<p style='margin:5px 0;font-style:italic'>" + poeEsc(D.p[k]) + "</p>";
return o;
}
function ndQ(b, needle, n) { var D = ND_TXT.b[b], i = ndIdx(b, needle); if (i < 0)
return ""; var S = poeSentences(D.p[i].slice(D.p[i].indexOf(needle))); return "<p style='margin:6px 0;font-style:italic'>" + poeEsc(S.slice(0, n || 1).join("").trim()) + (S.length > (n || 1) ? " …" : "") + "</p>"; }
function ndWarm(b) { ndText(b); if (b < 11)
ndText(b + 1); }
function ndRead(b, at) { return __ZC(467, 282, this, arguments, new.target); }
(function () {
var f = poeChapterCard;
poeChapterCard = function () {
if (!poeNdOn())
return f.apply(this, arguments);
var S = poeBS(), C = POE_CH[S.ch];
if (!C)
return;
POEB.readAsk = 0;
POEB.readOpen = 1;
ndWarm(C.book);
var b = "<div style='font-size:12px;opacity:.7'>Victor Hugo · Notre-Dame de Paris · 1831</div><h3 style='margin:4px 0;font-family:Georgia,serif'>Book " + ND_ROMAN[S.ch + 1] + ". " + poeEsc(C.t) + "</h3>" + (C.when ? "<p style='margin:4px 0;font-size:13px;opacity:.85'>" + C.when + "</p>" : "") + (C.words ? "<p style='margin:6px 0;font-style:italic;font-family:Georgia,serif'>" + C.words + "</p>" : "");
if (C.warn)
b += "<p style='margin:6px 0;font-size:12px;opacity:.8'>" + poeA(C.warn[0], C.warn[1]) + "</p>";
var fns = { go: function () { ndText(C.book, function () { worldCard(null); POEB.readOpen = 0; poeStepDone(); }); }, all: function () { ndRead(C.book); } };
b += worldBtn("go", "▶ Begin", C.intro || "");
b += worldBtn("all", "📖 Read this book of Hugo's", "Every word of it, chapter by chapter");
b += poeNdKeeperBtns(fns);
worldCard(b, fns);
};
})();
function poeNdKeeperBtns(fns) { return __ZC(467, 283, this, arguments, new.target); }
(function () {
var f = poeOpen;
poeOpen = function () {
if (!poeNdOn())
return f.apply(this, arguments);
var S = poeBS(), C = POE_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Victor Hugo, 1802 to 1885</div><h3 style='margin:4px 0;font-family:Georgia,serif'>🔔 Notre-Dame de Paris, 1482</h3>";
if (S.done)
b += "<p>You have lived the whole of the novel, from the Feast of Fools to the vault of Montfaucon.</p>";
else
b += "<p>You are in <b>Book " + ND_ROMAN[S.ch + 1] + ". " + poeEsc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + (function () { var h = (poeStep() || {}).h; return typeof h === "function" ? h() : (h || ""); })() + "</p>";
if (!S.done) {
b += worldBtn("go", "▶ Carry on", "Back to where you were");
fns.go = function () { worldCard(null); poeChapterBegin(true); };
}
else {
b += worldBtn("again", "Live it again from the start", "The sixth of January, 1482");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; poeSave(); poeChapterBegin(true); };
}
b += worldBtn("back", "ΑΝΑΓΚΗ: go back to 1841", "To the stair of the north tower, where the word is cut");
fns.back = function () { worldCard(null); poeNdTo1841(); };
b += "<div style='margin-top:6px;font-size:12px'>📖 Read Hugo: <span data-w='r0' role='button' style='text-decoration:underline;margin-right:8px'>Preface</span>" + ND_CH.map(function (C2, i) { fns["r" + (i + 1)] = function () { ndRead(C2.book); }; return "<span data-w='r" + (i + 1) + "' role='button' style='text-decoration:underline;margin-right:8px'>" + ND_ROMAN[i + 1] + ". " + poeEsc(C2.t) + "</span>"; }).join("") + "</div>";
fns.r0 = function () { ndRead(0); };
b += poeNdKeeperBtns(fns);
worldCard(b, fns);
};
})();
(function () {
var f = poeFinish;
poeFinish = function () {
if (!poeNdOn())
return f.apply(this, arguments);
poeTune(null);
var S = poeBS(), fns = {};
var b = "<h3 style='margin:4px 0;font-family:Georgia,serif'>ΑΝΑΓΚΗ</h3><p style='font-style:italic;font-family:Georgia,serif'>“And when an attempt was made to detach the skeleton which he held in his embrace, he fell to dust.”</p><p>You have lived the whole of Victor Hugo's Notre-Dame de Paris, from the Feast of Fools in the great hall of the Palais to the vault of Montfaucon. The word on the tower stair will take you back to 1841 whenever you wish.</p>";
b += worldBtn("back", "ΑΝΑΓΚΗ: go back to 1841", "The stair of the north tower");
fns.back = function () { worldCard(null); poeNdTo1841(); };
b += worldBtn("again", "Live it again from the start", "The sixth of January, 1482");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; poeSave(); poeChapterBegin(true); };
b += poeNdKeeperBtns(fns);
worldCard(b, fns);
};
})();
POE.era = 0;
POE.ndTime = "night";
function poeNdEra(on) { return __ZC(467, 284, this, arguments, new.target); }
POE_ENV.nd_day = { top: 0x7E90AA, low: 0xC4C8CC, fog: 0xB4B8BC, fogD: 0.0045, sun: 1.45, sunCol: 0xFFF2DC, sunDir: [0.45, 0.5, 0.55], hemi: 1.15, hemiCol: 0xC8D0DC, hemiGround: 0x5A5448, stars: 0 };
POE_ENV.nd_dusk = { top: 0x2A3456, low: 0xC8865A, fog: 0x7A6A64, fogD: 0.0055, sun: 0.85, sunCol: 0xFFB070, sunDir: [0.85, 0.18, 0.3], hemi: 0.85, hemiCol: 0x8A7A8A, hemiGround: 0x2A2018, stars: 0.02 };
POE_ENV.nd_dawn = { top: 0x5A6A8A, low: 0xD8A898, fog: 0x9A8C8C, fogD: 0.0055, sun: 0.9, sunCol: 0xFFC8A8, sunDir: [-0.8, 0.2, 0.3], hemi: 0.9, hemiCol: 0xA8A0B0, hemiGround: 0x3A3028, stars: 0 };
function poeNdTime(t) { return __ZC(467, 285, this, arguments, new.target); }
(function () {
var f = poeEnvNow;
poeEnvNow = function (dt) {
var E = f.apply(this, arguments);
var R = POE.room;
if (POE.era && R && R.city && !(R.envBlack || POE.black) && POE.ndTime !== "night") {
var B = POE_ENV["nd_" + POE.ndTime];
if (B) {
for (var k in B)
E[k] = B[k];
E.fogD = POE.ndView ? 0.0016 : (POE.lite ? 0.03 : 0.017);
}
}
else if (POE.era && R && R.city && POE.ndView)
E.fogD = 0.0022;
return E;
};
})();
var ND_WORD = "ΑΝΑΓΚΗ";
function poeNdWordCard() { return __ZC(467, 286, this, arguments, new.target); }
function poeNdTo1482() { return __ZC(467, 287, this, arguments, new.target); }
function poeNdTo1841() { return __ZC(467, 288, this, arguments, new.target); }
(function () {
var f = poeNdTower;
poeNdTower = function () {
if (POE.era) {
var b = poeActive() && poeStep();
if (b && b.k === "spot" && b.spot === "The stair of the north tower")
return;
poeCard("The north tower, 1482", "<p>The stair turns up into the dark: 387 steps to the gallery between the two towers, the bells, and the archdeacon's cell under the roof of the north tower.</p>", [["Climb to the gallery between the towers", "Paris of 1482 below you", function () { poeNdTopGo(); }], ["ΑΝΑΓΚΗ", "The word in the dark corner: go back to 1841", function () { poeNdTo1841(); }], ["Not now", "", null]]);
return;
}
poeCard("The towers of Notre-Dame", "<p>Three hundred and eighty-seven steps wind up the north tower in the dark, worn into hollows; old Mathurin the bell-ringer keeps the door and takes your sou.</p><p>Half-way up, in the darkest turn, your candle falls on something cut into the wall.</p>", [["Look closer", "Letters, cut by hand, black with age", function () { poeNdWordCard(); }], ["Climb to the top", "The gallery between the towers", function () { poeNdTopGo(); }], ["Not now", "", null]]);
};
})();
(function () { var f = POE.onLeave; POE.onLeave = function () { if (f)
try {
f();
}
catch (e) { } if (POE.era || poeNdOn()) {
POE.ndView = 0;
poeNdTime("night");
poeNdEra(false);
poeBookUse("poe");
} }; })();
(function () {
var m = /[?&]kpoe=(nd|nd1482)\b/.exec(location.search);
if (!m)
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 90) {
clearInterval(iv);
return;
}
if (typeof WLD === "undefined" || WLD.on !== POE_KEY || !POE.built || !poeKeeper())
return;
clearInterval(iv);
setTimeout(function () { try {
poeEnterRoom("x_nd", "nd:stair", { x: -46, z: -8.2, ry: Math.PI });
setTimeout(poeNdTo1482, 1200);
}
catch (e) { } }, 1800);
}, 1000);
})();
function ndCastAt(key, sx, sz, ry, o) { var R = poeRoomGet("x_paris"); return poeCast(key, "x_paris", sx, sz, ry, o); }
function ndW(sx, sz) { return poeParW(sx, sz); }
function ndHide(keys) { keys.forEach(function (k) { poeHide(POE.cast[k]); }); }
function pLook(h, pt, sec, o) { return __ZC(467, 289, this, arguments, new.target); }
function pShadow(h, who, route, o) { return __ZC(467, 290, this, arguments, new.target); }
function poeNdBeam(x, X, Y, w, h, R) { return __ZC(467, 291, this, arguments, new.target); }
function poeNdBrace(x, X0, Y0, X1, Y1, t) { x.strokeStyle = "#3A2416"; x.lineWidth = t; x.lineCap = "butt"; x.beginPath(); x.moveTo(X0, Y0); x.lineTo(X1, Y1); x.stroke(); x.strokeStyle = "rgba(255,220,170,.08)"; x.lineWidth = t * 0.25; x.beginPath(); x.moveTo(X0, Y0 - t * 0.3); x.lineTo(X1, Y1 - t * 0.3); x.stroke(); }
function poeNdCasement(x, e, X, Y, w, h, R, lit, shut) { return __ZC(467, 292, this, arguments, new.target); }
function poeNdUpper(k) { return __ZC(467, 293, this, arguments, new.target); }
var POE_ND_SIGNS = ["À L'IMAGE NOTRE-DAME", "AU CHEVAL ROUGE", "À LA POMME DE PIN", "AU MOUTON", "AU POT D'ÉTAIN", "À L'ÉCU DE FRANCE", "AU CYGNE", "À L'IMAGE SAINT-NICOLAS", "AU LION D'OR", "À LA HUCHE", "AU PANIER FLEURI", "À LA CORNE DE CERF", "AUX TROIS POISSONS", "AU SOLEIL D'OR", "À LA HEAULMERIE", "AU GRAND GODET"];
function poeNdGround(k) { return __ZC(467, 294, this, arguments, new.target); }
function poeNdRoof() { return __ZC(467, 295, this, arguments, new.target); }
function ndFlameTex() { return __ZC(467, 296, this, arguments, new.target); }
var POE_ND_TEX = {
zinc: [3, function (x, W, H) { return __ZC(467, 297, this, arguments, new.target); }],
setts: [2, function (x, W, H) { return __ZC(467, 298, this, arguments, new.target); }],
door: [1, function (x, W, H) { x.fillStyle = "#2A1A10"; x.fillRect(0, 0, W, H); x.fillStyle = "#4A3220"; for (var i = 0; i < 5; i++)
x.fillRect(W * i / 5 + 1, 0, W / 5 - 2, H); x.fillStyle = "#141414"; x.fillRect(0, H * 0.22, W * 0.8, H * 0.03); x.fillRect(0, H * 0.7, W * 0.8, H * 0.03); x.beginPath(); x.arc(W * 0.8, H * 0.5, W * 0.035, 0, 7); x.fill(); }]
};
POE.ndGlowMats = [];
(function () {
var f = poeParMat;
poeParMat = function (k, col) {
if (!POE.era)
return f.apply(this, arguments);
var key = "nd" + k + (col || "");
if (POE.mats[key])
return POE.mats[key];
var m = null;
if (k.indexOf("up") === 0 || k.indexOf("gf") === 0 || k === "man") {
var P = k === "man" ? poeNdRoof() : k.indexOf("up") === 0 ? poeNdUpper(+k.slice(2) % 3) : poeNdGround(+k.slice(2));
m = new THREE.MeshLambertMaterial({ map: P.map, emissiveMap: P.glow, emissive: 0xFFFFFF, color: k.indexOf("up") === 0 ? [0xFFFFFF, 0xF4ECDC, 0xECE4DC][+k.slice(2) % 3] : 0xFFFFFF });
m.userData.metre = 1;
POE.ndGlowMats.push(m);
m.emissiveIntensity = POE.ndTime === "day" ? 0.12 : POE.ndTime === "night" ? 1 : 0.5;
}
else if (POE_ND_TEX[k]) {
var D = POE_ND_TEX[k], px = POE.lite ? 256 : 512, t = wTex(px, px, D[1]);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
try {
t.anisotropy = Math.min(POE.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
m = new THREE.MeshLambertMaterial({ map: t, color: col || 0xFFFFFF });
m.userData.metre = D[0];
}
if (!m)
return f.apply(this, arguments);
return (POE.mats[key] = m);
};
})();
var ND_AT = {
greve: [1170, -2218], pillory: [1166, -2224], gibbet: [1188, -2232], cross: [1156, -2210], fire: [1172, -2209], ratHole: [1133.4, -2206.5], piliers: [1203, -2220],
palais: [699.5, -2062.5], palaisN: [1, 0], chapelle: [652, -2086], chatelet: [706, -2214], louvre: [40, -2700], temple: [1790, -3180], bastille: [2380, -1885], genevieve: [790, -1100], germain: [-183, -1948],
miracles: [778, -3612], miraclesClear: [780, -3613, 17, 10], montfaucon: [2410, -4826]
};
var POE_PAR_CLEAR_ND = [ND_AT.miraclesClear, [816, -3609.5, 13.5, 2]];
(function () { var f = poeParT; poeParT = function (sx, sz) { var t = f(sx, sz); if (t === 1 && POE.era) {
for (var i = 0; i < POE_PAR_CLEAR_ND.length; i++) {
var C = POE_PAR_CLEAR_ND[i];
if (Math.abs(sx - C[0]) < C[2] && Math.abs(sz - C[1]) < C[3])
return C[4] || 0;
}
} return t; }; })();
function poeNdMark(o, era, far) { o.userData.era = era; if (far)
o.userData.ndFar = 1; return o; }
function poeNdCity(R, g) { return __ZC(467, 299, this, arguments, new.target); }
function poeNdWinM() { return __ZC(467, 300, this, arguments, new.target); }
function poeNdTympM() { return __ZC(467, 301, this, arguments, new.target); }
function poeNdIs1841Mon(o) {
var p = o.position, nd = POE_PAR_MON.nd, fl = POE_PAR_AT.flamel;
if (Math.hypot(p.x - nd[0], p.z - nd[1]) < 6)
return false;
if (fl && Math.hypot(p.x - fl.b[0], p.z - fl.b[1]) < 4)
return false;
return true;
}
(function () {
var b = POE_RB.x_paris;
if (!b)
return;
POE_RB.x_paris = function (R, g) {
b(R, g);
(R.mons || []).forEach(function (o) { if (o.userData.era == null)
o.userData.era = poeNdIs1841Mon(o) ? 0 : -1; });
R.spots1841 = POE.spots.filter(function (S) { return S.x > R.x - 6000 && S.x < R.x + 6000 && S !== R.dspot && !S.book && !/Flamel/.test(S.name || "") && /Rue|Morgue|Préfecture|bookshop|Inspection|Jardin|cage|lightning|Dupin|apartments|café/i.test(S.name || ""); });
var made = poeNdCity(R, g);
R.mons = (R.mons || []).concat(made);
var t = R.tick;
R.tick = function (dt) { if (t)
t(dt); try {
poeNdCityTick(dt);
}
catch (e) {
if (!POE.ndE) {
POE.ndE = 1;
if (window.console)
console.warn("[poe] nd city", e);
}
} };
var oe = R.onEnter;
R.onEnter = function (from) { if (POE.era) {
var S = poeParS();
if (!S.seen) {
S.seen = 1;
}
} return oe.apply(this, arguments); };
var bn = R.banner;
R.banner = function () { var s = bn ? bn() : ""; return POE.era ? s.replace("Paris, 1841", "Paris, 1482").replace(/ · No\. \d+/, "") : s; };
poeNdEraRooms();
};
})();
function poeNdCityTick(dt) { return __ZC(467, 302, this, arguments, new.target); }
POE.ndShow = {};
function poeNdEraRooms() { return __ZC(467, 303, this, arguments, new.target); }
var POE_ND_FOLK = [
["A water-carrier", "m15", "m", "a water-carrier of Paris in 1482 with his buckets on a yoke, who fills them at the fountains of the Innocents and the Halles", "the fountains, the price of water, the river, the feast days", "Water! Fresh water from the fountain of the Innocents!"],
["A sergeant of the Châtelet", "archer", "m", "a sergeant of the provost of Paris (the Châtelet) on his round in 1482", "the provost Robert d'Estouteville, the watch, thieves, the Cour des Miracles where no sergeant goes", "Move along. Keep out of the mud and out of trouble."],
["A student of the University", "student", "m", "a scholar of the University of Paris in 1482 from the Rue du Fouarre, idle, poor and impudent", "the four nations of the University, the Rector, the taverns, the Feast of Fools, the girls, Latin jokes", "Ho! A fellow without a gown. Are you of the University? No? Then pay for my wine!"],
["A goodwife of the Cité", "wife15", "f", "a goodwife (a bourgeoise) of the Cité in 1482 going to market with her basket", "the market, the price of bread, her husband, the sermons at Notre-Dame, the gypsies (whom she fears), the Feast of Kings", "God keep you. Mind the gutter; it runs in the middle of the street."],
["A rag-picker", "truand", "m", "a poor rag-picker and beggar of Paris in 1482", "the streets, alms, the Cour des Miracles, the cold", "Alms, good sir, for the love of God and Madame the Virgin."],
["A seller of wafers", "wife15", "f", "a wafer-seller (oublieuse) of Paris in 1482 with her basket and her little drum", "her wafers, the feast days, the crowds at the Grève", "Oublies! Wafers! Light as air, a denier the dozen!"],
["A Benedictine monk", "canon15", "m", "a Benedictine monk of Saint-Germain-des-Prés in Paris in 1482", "his abbey, the meadow of the clerks (Pré-aux-Clercs), the quarrels with the University, prayer", "Pax tecum. You walk late, my son."],
["A bourgeois of Paris", "m15", "m", "a bourgeois of Paris in 1482, a draper of the Rue Saint-Denis, in his good gown and chaperon", "trade, the guilds, the King (Louis XI, whom he fears), the Flemish ambassadors, the Feast of Fools", "Good day. Have you seen the Flemings? Ambassadors of Ghent! In hose and leather!"],
["A porter of the Halles", "truand", "m", "a porter of the Halles in 1482, carrying a sack", "the Halles, the merchants, the weight he carries, the pillory of the Halles", "Make way! Make way there!"],
["A lady of the court", "lady15", "f", "a lady of good family in 1482, in her hennin and veil, walking with her maid", "the court, the Dauphin's marriage to Margaret of Flanders, the fashions, the mystery play at the Palais", "Good day. Do not stare so; one would think you had never seen a hennin."],
["A knight", "rich15", "m", "a knight of Paris in 1482 walking to the Palais", "the King, the wars with Burgundy, horses, the law courts", "God keep you, friend."],
["An archer of the watch", "archer", "m", "an archer of the night watch (le guet) of Paris in 1482 with his halberd", "the watch, curfew, the ordinance against carrying a light, brawls of the scholars", "Who goes there? Ah. Pass, but keep to the middle of the street."]
];
(function () {
var F = POE_PAR_F;
F.byEra = { 0: F.list, 1482: [] };
var fs = poeParFolkStart;
poeParFolkStart = function (R) {
if (!POE.era) {
F.list = F.byEra[0];
return fs.apply(this, arguments);
}
F.list = F.byEra[1482];
if (F.list.length) {
F.on = true;
F.list.forEach(function (W) { W.P.g.visible = true; W.t = 0; W.dir = null; });
return;
}
var n = POE.lite ? 5 : 10;
F.on = true;
for (var i = 0; i < n; i++) {
var D = POE_ND_FOLK[i % POE_ND_FOLK.length];
var P = poeRoomPerson(R, "nf" + i, 1e5, 0, 0, { role: D[1], sex: D[2], r: 2.6, look: { _seed: 800 + i }, talk: { name: D[0], persona: D[0] + ": " + D[3] + ", in the streets of Paris in January 1482 (the time of Victor Hugo's Notre-Dame de Paris, in the reign of Louis XI). Speaks as a Parisian of that year and station, in English with a little old French, briefly; talks about " + D[4] + ". Knows the city of 1482: the City (the island, Notre-Dame, the Palais), the University (the left bank) and the Town (the right bank), the Grève, the Châtelet, the Halles, the Louvre, the Bastille. Never mentions anything after 1482.", greet: D[5] } });
F.list.push({ P: P, i: i, dir: null, t: 0, sp: 0.85 + (i % 5) * 0.12, carry: null });
}
};
F.byEra[0] = F.list;
})();
function poeParFolkEra() { return __ZC(467, 304, this, arguments, new.target); }
(function () { var b = POE_RB.x_paris; POE_RB.x_paris = function (R, g) { POE_PAR_F.byEra = { 0: [], 1482: [] }; b(R, g); POE_PAR_F.byEra[0] = POE_PAR_F.list; }; })();
var ND_TOP = { y: 69.7 };
function poeNdTopAt(lx, lz) { var C = POE_PAR_MON.nd, F = POE_PAR_MON.ndFront, a = Math.atan2(C[1] - F[1], C[0] - F[0]), ca = Math.cos(a), sa = Math.sin(a); return [C[0] + lx * ca - lz * sa, C[1] + lx * sa + lz * ca]; }
function poeNdTopMake() { return __ZC(467, 305, this, arguments, new.target); }
function poeNdTopGo() { return __ZC(467, 306, this, arguments, new.target); }
function poeNdTopDown() { POE.ndView = 0; poeNdFarDrop(); poeEnterRoom("x_nd", "nd:stair", { x: -46, z: -8.2, ry: Math.PI }); }
function poeNdFarCity() { return __ZC(467, 307, this, arguments, new.target); }
function poeNdFarDrop() { var R = POE_RX.x_paris; if (!R)
return; [R.ndFarCity, R.ndFarGround].forEach(function (m) { if (m) {
if (m.parent)
m.parent.remove(m);
m.geometry.dispose();
m.material.dispose();
} }); R.ndFarCity = null; R.ndFarGround = null; }
(function () { var f = poeEnterRoom; poeEnterRoom = function (k, from, at) { if (from !== "nd:top" && POE.ndView) {
POE.ndView = 0;
poeNdFarDrop();
} return f.apply(this, arguments); }; })();
POE_ROOMS.push({ k: "x_ndhall", n: "The great hall of the Palais", custom: 1, w: 76, d: 30, h: 20, dark: 1.45, doors: [] });
(function () { var n = POE_ROOMS.length, R = POE_ROOMS[n - 1]; R.i = n - 1; R.x = POE_IN_X + 120000; POE_RX.x_ndhall = R; })();
POE_ROOMS.push({ k: "x_ndbride", n: "La Esmeralda's little room", custom: 1, w: 6, d: 5, h: 3, dark: 0.9, doors: [] });
(function () { var n = POE_ROOMS.length, R = POE_ROOMS[n - 1]; R.i = n - 1; R.x = POE_IN_X + 121000; POE_RX.x_ndbride = R; })();
function poeNdVaultTex() { return __ZC(467, 308, this, arguments, new.target); }
function poeNdCheckTex() { return __ZC(467, 309, this, arguments, new.target); }
function poeNdGrimTex(i) { return __ZC(467, 310, this, arguments, new.target); }
POE_RB.x_ndhall = function (R, g) { return __ZC(467, 311, this, arguments, new.target); };
function poeNdTapM() { return __ZC(467, 312, this, arguments, new.target); }
var ND_CROWD_ROLES = [["m15", "m", "A burgher of Paris", "the mystery play, the Flemings, the cardinal who keeps everyone waiting"], ["wife15", "f", "A burgher's wife", "the cold, the crowd, the Flemish ambassadors, the gypsy girl who dances in the Grève"], ["student", "m", "A scholar of the University", "the rector, the Feast of Fools, Jehan Frollo and his tricks, the Pope of Fools to be chosen"], ["rich15", "m", "A merchant of the Halles", "trade with Flanders, the marriage of the Dauphin and Margaret of Flanders, prices"], ["lady15", "f", "A lady of the Town", "the cardinal of Bourbon, the tribune, the fine clothes of the Flemings"], ["truand", "m", "A beggar of the Cour des Miracles", "alms, the King of Thunes, the grimace match"], ["archer", "m", "A sergeant of the Châtelet", "keeping order in the hall, the provost Robert d'Estouteville"], ["priest15", "m", "A clerk of the Basoche", "the clerks of the Palais, the marble table, the mystery of Master Gringoire"]];
function poeNdCrowd(g, R, lite) { return __ZC(467, 313, this, arguments, new.target); }
POE_RB.x_ndbride = function (R, g) { return __ZC(467, 314, this, arguments, new.target); };
(function () {
var b = POE_RB.x_nd;
if (!b)
return;
POE_RB.x_nd = function (R, g) {
var t0 = POE.people.length;
b(R, g);
R.folk1841 = POE.people.slice(t0).filter(function (P) { return P.room === R; });
var bn = R.banner;
R.banner = function () { var s = bn ? bn() : ""; return POE.era ? s.replace("1841", "1482") : s; };
var lite = POE.lite, N = poeGrp(g, 0, 0, 0), st = poeNdStone(0xFFFFFF, 0x3A3428), dk = poeNdStone(0xB0A898, 0x2A2620), gold = poeShine(0xD8A848, 0.3, 0.85), A = poeGrp(N, 0, 0, 0);
var SC = poeSolid(R.x - 43.3, -5.6, 2.4, 1.8, -1, 9);
SC.era = 1482;
(R.ndSolids || (R.ndSolids = [])).push(SC);
var sc = poeGrp(A, -43.3, 0, -5.6, 0);
poeBox(sc, 2.4, 0.8, 1.8, dk, 0, 0.4, 0);
poeCyl(sc, 1.1, 1.2, 0.5, poeShine(0x2A4A6A, 0.3, 0.4), 0, 0.95, 0, 12);
[-0.4, 0.4].forEach(function (x) { poeCyl(sc, 0.32, 0.38, 2.6, poeS("cloth", 0x8A6A4A), x, 2.3, 0, 10); });
poeCyl(sc, 0.9, 1.1, 3.2, poeS("cloth", 0x8A1A1A), 0, 5.0, 0, 12);
poeCyl(sc, 1.15, 0.9, 1.4, poeS("cloth", 0x2A4A8A), 0, 6.6, 0, 12);
poeSph(sc, 0.55, poeC(0xD0A888), 0, 7.9, 0.05, 12);
var bd = poeSph(sc, 0.42, poeC(0x5A3A1A), 0, 7.55, 0.25, 10);
bd.scale.set(1, 1.1, 0.6);
var staff = poeCyl(sc, 0.16, 0.22, 8.4, poeC(0x4A3A22), 1.4, 4.2, 0.5, 8);
staff.rotation.z = -0.08;
poeSph(sc, 0.6, poeC(0x3A5A2A), 1.7, 8.6, 0.5, 8);
var kid = poeGrp(sc, -0.8, 7.3, 0);
poeCyl(kid, 0.22, 0.3, 0.7, poeS("cloth", 0xE8E0D0), 0, 0.35, 0, 8);
poeSph(kid, 0.2, poeC(0xE0B898), 0, 0.9, 0, 8);
poeCyl(kid, 0.24, 0.24, 0.03, gold, 0, 1.1, -0.05, 12).rotation.x = 0.3;
var j = poeGrp(A, 10.8, 0, 0);
[-1, 1].forEach(function (s) { poeNdPut(j, poeNdWall(5.4, 5.2, 1.6, [{ x: 0, w: 2.6, h: 3.6, r: 1.6 }], st), 0, 0, s * 4.3, Math.PI / 2); var JS = poeSolid(R.x + 10.8, s * 4.3 + (s > 0 ? 0.9 : -0.9), 1.8, 3.6, -1, 5.2); JS.era = 1482; (R.ndSolids || (R.ndSolids = [])).push(JS); });
poeBox(j, 1.8, 1.0, 14, dk, 0, 5.7, 0);
poeBox(j, 0.1, 0.8, 13.4, poeS("cloth", 0x2A3A7A), -0.92, 4.6, 0);
for (var pf = 0; pf < 9; pf++) {
var fz = -5.8 + pf * 1.45;
poeCyl(j, 0.14, 0.18, 0.7, poeS("cloth", [0x8A1A1A, 0xC8A040, 0x2A6A3A][pf % 3]), -0.98, 4.6, fz, 6);
poeSph(j, 0.09, poeC(0xE0B898), -0.98, 5.05, fz, 6);
}
poeBox(j, 0.2, 5.6, 0.2, poeC(0x5A3A1E), 0, 9.0, 0);
poeBox(j, 0.2, 0.2, 3.0, poeC(0x5A3A1E), 0, 10.6, 0);
var cx = poeGrp(j, -0.15, 9.4, 0);
poeCyl(cx, 0.12, 0.12, 2.0, poeC(0xE0C0A0), 0, 0, 0, 8);
[-1, 1].forEach(function (s) { var ar = poeCyl(cx, 0.06, 0.06, 1.4, poeC(0xE0C0A0), 0, 0.9, s * 0.7, 6); ar.rotation.x = Math.PI / 2; });
[-1, 1].forEach(function (s) { var fg = poeGrp(j, 0, 6.2, s * 2.4); poeCyl(fg, 0.25, 0.35, 1.6, poeS("cloth", s < 0 ? 0x2A3A8A : 0x8A1A1A), 0, 0.8, 0, 8); poeSph(fg, 0.15, poeC(0xE0B898), 0, 1.75, 0, 8); });
var al = poeGrp(A, 41.4, 1.25, 0);
poeBox(al, 0.2, 1.6, 3.4, gold, 0.8, 1.6, 0);
for (var pn = 0; pn < 5; pn++) {
poeFace(al, 0.6, 1.2, poeNdTympM(), 0.68, 1.6, -1.36 + pn * 0.68, -Math.PI / 2);
}
[[-0.9, -2.2], [-0.9, 2.2], [1.2, -2.2], [1.2, 2.2]].forEach(function (p) { poeCyl(al, 0.06, 0.07, 3.0, gold, p[0], 1.0, p[1], 6); poeSph(al, 0.16, gold, p[0], 2.7, p[1], 6); });
[-1, 1].forEach(function (s) { poeBox(al, 2.1, 2.2, 0.04, poeS("velvet", 0x8A1A2A), 0.15, 1.3, s * 2.2); });
var shr = poeGrp(A, 44.6, 0, 0);
[-0.9, 0.9].forEach(function (z) { poeCyl(shr, 0.14, 0.16, 3.2, poeShine(0x9A9AA0, 0.3, 0.8), 0, 1.6, z, 8); });
poeBox(shr, 1.2, 0.9, 2.6, gold, 0, 3.6, 0);
var sr = poeRoof(shr, 2.6, 1.2, 0.6, 4.05, gold);
sr.rotation.y = Math.PI / 2;
poeNdMerge(A);
N.visible = !!POE.era;
R.nd1482 = N;
R.folk1482 = [[38.6, -2.4, -Math.PI / 2, "canon15", "m", "A canon of Notre-Dame", "a canon of the chapter of Notre-Dame in 1482 saying the office; learned, a little proud; he knows the archdeacon Dom Claude Frollo and does not like his reputation for alchemy", "the chapter, the bishop Louis de Beaumont, the archdeacon Frollo, the bell-ringer Quasimodo, the relics, the miracles of the Virgin", "Pax vobis. The office is not finished, my son."],
[-30, 2.0, -Math.PI / 2, "wife15", "f", "A goodwife at her prayers", "a goodwife of the Cité in 1482 at her prayers in Notre-Dame", "her children, the bells (the great bell Marie), the bell-ringer whom she fears, the gypsy girl who dances in the Parvis", "Hush. Not so loud: this is the house of God and of Madame the Virgin."],
[-48.6, 4.4, Math.PI / 2, "truand", "m", "A beggar at the door", "a beggar in the porch of Notre-Dame in 1482, one of the truands of the Cour des Miracles in his daytime trade", "alms, the canons who give, the canons who don't, the Cour des Miracles (very guardedly), the bell-ringer", "Alms, for the love of Our Lady! A little denier for a poor cripple!"],
[12.6, -6.2, Math.PI, "canon15", "m", "A choir-boy", "a choir-boy of Notre-Dame in 1482 trimming the candles of the rood screen", "the bells, the choir, the archdeacon (whom he fears), Quasimodo (whom he fears more), the Feast of Fools", "Shh! The archdeacon is about."]
].filter(function (F, i) { return !lite || i < 2; }).map(function (F, i) { var P = poeRoomPerson(R, "nd15_" + i, F[0], F[1], F[2], { role: F[3], sex: F[4], talk: { name: F[5], persona: F[5] + ": " + F[6] + ", inside Notre-Dame de Paris in January 1482 (Victor Hugo's Notre-Dame de Paris). Speaks as a person of that year and station, briefly, in English with a little Latin and old French; talks about " + F[7] + ". Never mentions anything after 1482.", greet: F[8] } }); P.g.visible = !!POE.era; return P; });
poeNdEraRooms();
poeSpot(R.x - 43.3, -3.4, 2.4, "The colossal Saint Christopher", "look", function () { if (POE.era)
poeHook("ndChristopher"); }, 0);
poeSpot(R.x + 8.4, 0, 2.6, "The rood screen", "look", function () { if (POE.era)
poeHook("ndJube"); }, 0);
};
})();
function pMatch(h, title, intro, pairs, o) { return __ZC(467, 315, this, arguments, new.target); }
function pGrimace(h) { return __ZC(467, 316, this, arguments, new.target); }
function ndDance(P, on) { if (!P)
return; if (P.dance) {
poeStop(P.dance);
P.dance = null;
} if (!on)
return; var t = 0, ry = P.g.rotation.y; P.dance = poeEvery(function (dt) { if (!P.g.parent)
return false; t += dt; P.g.rotation.y = ry + Math.sin(t * 1.6) * 2.2; P.g.position.y = (P.y || 0) + Math.abs(Math.sin(t * 3.2)) * 0.12; }); }
function ndGoatAt(R, x, z, ry) { var k = "goat_" + R.k; if (POE[k] && POE[k].parent) {
POE[k].position.set(x, 0, z);
POE[k].rotation.y = ry || 0;
POE[k].visible = true;
return POE[k];
} return (POE[k] = poeNdGoat(R.g, x, z, ry)); }
function ndPeal(n, kind) { var fs = kind === 1 ? [55, 73, 82, 98, 110, 131, 147, 165] : kind === 2 ? [49, 65] : [62]; for (var i = 0; i < n; i++)
poeSfx("chime", { f: fs[(i * 5 + (i >> 1)) % fs.length], delay: i * (kind === 1 ? 0.55 : 1.6) + (kind === 1 ? (i % 3) * 0.13 : 0) }); }
function ndPar(sx, sz) { return { x: POE_RX.x_paris.x + sx, z: sz }; }
function ndGoPar(sx, sz, ry) { poeEnterRoom("x_paris", "nd:place", { x: sx, z: sz, ry: ry || 0 }); }
function ndParvis() { var D = POE_ND.door; if (!D)
return null; var C = POE_PAR_MON.nd, F = POE_PAR_MON.ndFront, a = Math.atan2(C[1] - F[1], C[0] - F[0]); return { x: D.x - Math.cos(a) * 16, z: D.z - Math.sin(a) * 16, ry: D.ry }; }
var ND_B1 = [
pRead(),
pCard("The sixth of January, 1482", function () { return ndP(1, "Three hundred and forty-eight years", 2) + ndP(1, "On that day, there was to be a bonfire", 1); }, "Into the great hall"),
pCard("The great hall", function () { return ndP(1, "And, first of all, there is a buzzing in the ears", 1) + ndP(1, "Let the reader picture to himself now", 1); }, "Push through the crowd"),
pSpot("The marble table and the stage of the mystery", "Push through the crowd to the far end of the hall, to the famous marble table where the mystery is to be played", null, { hooks: { ndStage: function () { poeCard("The marble table", ndP(1, "It was upon the marble table", 1) + ndP(1, "The piece was only to begin", 1)); } } }),
pTalk("Jehan Frollo du Moulin", "High on a pillar the scholars of the University jeer at everything. The boldest of them, a fair little devil with a face full of mischief, is Jehan Frollo, the archdeacon's brother: speak to him", ["Jehan Frollo du Moulin", function () { return ndP(1, "Fine gentry are our people of the university", 1); }, "“Down with the bailiff of the courts!”"]),
pHold({ room: "x_ndhall", lx: -22, lz: -3 }, 14, "Wait before the stage with the crowd for the twelfth stroke of the great palace clock. Noon. The cardinal has not come.", { r: 7, done: function () { ndPeal(12, 0); } }),
pCard("Noon", function () { return ndP(1, "Messieurs the bourgeois,\" said he", 1) + ndP(1, "Nevertheless, as be harangued them", 1) + ndP(1, "\"Down with Jupiter and the Cardinal de Bourbon!\"", 1); }, "Poor Jupiter"),
pTalk("Pierre Gringoire", "Someone comes to Jupiter's rescue: a tall, thin, pale, fair young man in a threadbare black serge doublet, by the pillar. He is the author. Speak to him", ["Pierre Gringoire", function () { return ndP(1, "Luckily, some one came to rescue him", 1) + ndP(1, "\"Jupiter,\" said he, \"my dear Jupiter!\"", 1) + ndP(1, "The author of the \"Cid\" could not have said", 1); }, "“Pierre Gringoire!” The mystery begins"]),
pMatch("The prologue begins. Gringoire wants you to understand his allegories: tell each robe by what it carries", "The four allegories of the prologue", ndPFn(1, "The four personages, after having reaped", 1), [["The robe of gold and silver brocade, a sword in its right hand", "Nobility"], ["The robe of silk, two golden keys", "Clergy"], ["The robe of wool, a pair of scales", "Merchandise"], ["The robe of linen, a spade", "Labour"]]),
pCard("Monsieur the Cardinal", function () { return ndP(1, "Poor Gringoire! the din of all", 1) + ndP(1, "Now, at the moment when the door had opened to admit the cardinal", 1); }, "The usher announces the Flemings, one by one"),
pTalk("Master Jacques Coppenole", "Among the velvet and the silk of the tribune, a man in a felt doublet and leather jerkin: the hosier of Ghent. Go to the foot of the tribune and speak to him", ["Master Jacques Coppenole", function () { return ndP(1, "While the pensioner of Ghent and his eminence", 1) + ndP(1, "\"Messieurs the bourgeois and squires of Paris, I don't know, cross of God!", 1); }, "“A Pope of Fools!”"], null, { on: function () { ndText(1); } }),
pCard("The grinning match", function () { return ndP(1, "In the twinkling of an eye, all was ready", 1); }, "To the chapel"),
pGo({ room: "x_ndhall", lx: 27, lz: -0.5 }, "The little chapel opposite the marble table is chosen for the contest: go there, under the little rose window with its broken pane", { r: 5 }),
pGrimace("The faces come to the broken pane one after another. Give your voice for the one who deserves the tiara of the Pope of Fools: press E at the chapel when he is at the window"),
pCard("Noel! Noel! Noel!", function () { return ndP(1, "\"Noel! Noel! Noel!\"* shouted", 1) + ndP(1, "The acclamation was unanimous", 1) + ndP(1, "Or rather, his whole person was a grimace", 2); }, "The bell-ringer of Notre-Dame", { done: function () { var Q = POE.cast.quasi; if (Q) {
poeMove(Q, "x_ndhall", 27.4, 1.6, -Math.PI / 2);
Q.g.visible = true;
} } }),
pTalk("Quasimodo", "He stands on the threshold of the chapel, sombre and grave, and lets them admire him. Go to him", ["Quasimodo", function () { return ndP(1, "The men, on the contrary, were delighted and applauded", 1) + ndP(1, "\"Cross of God! Holy Father! you possess", 1) + ndP(1, "He was, in truth, deaf.", 1); }, "The tiara and the cope"]),
pCard("The Pope of the Fools", function () { return ndP(1, "In the meantime, all the beggars, all the lackeys", 1); }, "They carry him out, on their shoulders", { done: function () { var Q = POE.cast.quasi; if (Q)
poeHide(Q); ndHide(["coppenole", "jehan"]); } }),
pTalk("Pierre Gringoire", "The hall has emptied after the procession. Only Gringoire stands firm by his stage, and a few old men and women: go back to him", ["Pierre Gringoire", function () { return ndP(1, "We are delighted to be able to inform the reader", 1) + ndP(1, "This word produced a magical effect", 1); }, "“La Esmeralda!”"]),
pSpot("The great door of the Palais", "Everyone left in the hall flies to the windows: “La Esmeralda! La Esmeralda!” Go out into the night after them", null)
];
function ndPFn(b, needle, n) { return function () { return ndP(b, needle, n); }; }
ND_CH.push({ t: "The Great Hall", book: 1, when: "The sixth of January, 1482: the Feast of Kings and the Feast of Fools. The Palais de Justice, on the island of the City.",
words: "“Three hundred and forty-eight years, six months, and nineteen days ago to-day, the Parisians awoke to the sound of all the bells in the triple circuit of the city, the university, and the town ringing a full peal.”",
intro: "The great hall of the Palais, the mystery play, the Pope of Fools",
start: { room: "x_ndhall", at: { x: 0, z: -12.2, ry: 0 } },
setup: function (f) { return __ZC(467, 317, this, arguments, new.target); },
hooks: { ndStage: function () { poeCard("The marble table", ndP(1, "It was upon the marble table", 1)); }, ndRose: function () { poeSay("The little rose window over the door of the chapel; one pane is broken."); }, ndTribune: function () { poeCard("The tribune of the ambassadors", ndP(1, "In the middle of the hall, opposite the great door", 1)); } },
end: function () { ndHide(["gringoire", "jehan", "coppenole", "cardinal", "rym", "quasi"]); },
steps: ND_B1 });
var ND_ESME_WALK = [[1160.5, -2235.5], [1186.5, -2238.5], [1186.5, -2268.5], [1177.5, -2281.5], [1170.5, -2283.5], [1171.5, -2299.5], [1172.5, -2300.5], [1170.5, -2310.5], [1110.5, -2329.5], [1112.5, -2387.5], [1131.5, -2434.5], [1131.5, -2441.5], [1158.5, -2497.5], [1182.5, -2540.5]];
var ND_TO_COUR = [[1188.5, -2549.5], [1193.5, -2553.5], [1193.5, -2556.5], [1142.5, -2591.5], [1142.5, -2605.5], [1145.5, -2655.5], [1143.5, -2660.5], [1089.5, -2688.5], [1089.5, -2703.5], [1096.5, -2743.5], [1108.5, -2744.5], [1108.5, -2762.5], [1111.5, -2781.5], [1137.5, -2871.5], [1135.5, -2898.5], [1140.5, -2930.5], [1138.5, -2939.5], [1131.5, -2955.5], [1067.5, -2989.5], [1067.5, -2996.5], [1076.5, -3062.5], [1074.5, -3064.5], [1071.5, -3065.5], [1071.5, -3071.5], [1074.5, -3082.5], [1091.5, -3110.5], [1091.5, -3117.5], [1100.5, -3143.5], [1100.5, -3162.5], [1105.5, -3200.5], [1101.5, -3206.5], [1103.5, -3258.5], [1091.5, -3262.5], [1054.5, -3271.5], [1056.5, -3287.5], [1071.5, -3331.5], [1069.5, -3358.5], [1090.5, -3440.5], [1090.5, -3443.5], [1104.5, -3473.5], [1104.5, -3487.5], [1128.5, -3589.5], [1125.5, -3599.5], [1120.5, -3607.5], [1093.5, -3636.5], [1084.5, -3664.5], [1025.5, -3662.5], [1022.5, -3660.5], [961.5, -3645.5], [927.5, -3641.5], [830.5, -3635.5], [828.5, -3610.5], [790.5, -3606.5]];
function pWay(h, pts, o) { return __ZC(467, 318, this, arguments, new.target); }
var ND_B2 = [
pRead(),
pCard("From Charybdis to Scylla", function () { return ndP(2, "Night comes on early in January", 1) + ndP(2, "Then a desperate resolution occurred to him", 1); }, "To the Place de Grève"),
pGo(function () { return ndPar(ND_AT.greve[0], ND_AT.greve[1]); }, "Like Gringoire, go to the Place de Grève, where the bonfire of the Feast of Kings is burning: over the Pont Notre-Dame to the right bank, then along the river", { r: 16 }),
pCard("The Place de Grève", function () { return ndP(2, "There remains to-day but a very imperceptible vestige", 1) + ndP(2, "It was then, as it is to-day, an irregular trapezoid", 1); }, "The fire, and the crowd round it"),
pHold(function () { var P = ndPar(1172, -2213); return P; }, 12, "In a vast space left free between the crowd and the fire, a young girl is dancing. Stand in the crowd and watch", { r: 9 }),
pTalk("La Esmeralda", "Speak to the dancer when she stops", ["La Esmeralda", function () { return ndP(2, "She was not tall, though she seemed so", 1) + ndP(2, "\"He, no!\" said he, \"she is a gypsy!\"", 1); }, "Her goat"]),
pQuiz("Djali", "<p>A pretty little white goat comes up to her, alert, glossy, with gilded horns, gilded hoofs and a gilded collar. She seats herself and presents her tambourine to the goat.</p><p><b>“Djali,” said she, “what month is this?”</b> How many blows does the goat strike upon the tambourine?</p>", [["One", "", true], ["Six", "", false, "Six is the day of the month; that is the next question."], ["Twelve", "", false, "Count from the first month of the year."], ["Seven", "", false, "Seven is the hour; she has not asked it yet."]]),
pQuiz("Djali", "<p>“Djali, what day of the month is this?” Six blows: the sixth of January, the day of Kings.</p><p><b>“Djali, what hour of the day is it?”</b></p>", [["Seven blows: at that moment the clock of the Pillar House rings seven", "", true], ["Twelve blows", "", false, "Noon was long ago, in the great hall."], ["Three blows", "", false, "It is dark already; night comes on early in January."]]),
pCard("“Sacrilege! profanation!”", function () { return ndP(2, "\"There's sorcery at the bottom of it,\" said a sinister voice", 1) + ndP(2, "Djali reared himself on his hind legs", 1) + ndP(2, "\"Sacrilege! profanation!\" resumed the voice", 1) + ndP(2, "\"Ah!\" said she, \"'tis that villanous man!\"", 1); }, "A bald man in a priest's cloak, in the crowd"),
pSpot("The Rat-Hole", "From the dark corner of the Place by the quay, the window of the Tour-Roland, a harsh old woman's voice: “Will you hold your tongue, you cricket of hell?” Go and look at the barred window in the wall", null, { hooks: { ndRat: function () { poeCard("The Rat-Hole", ndP(2, "\"Will you hold your tongue, you cricket of hell?\"", 1) + poeNote("A barred window at the height of a man, in the wall of the old house. Over it two words are cut: TU, ORA. Within, the dark. Someone is there.")); } } }),
pCard("The Pope of the Fools comes to the Grève", function () { return ndP(2, "This procession, which our readers have seen set out", 1) + ndP(2, "This man, this rash individual, was the man with the bald brow", 1) + ndP(2, "He made one bound as far as the priest", 1) + ndP(2, "Quasimodo remained on his knees", 1); }, "The priest leads him away", { on: function () { var Q = POE.cast.quasi, F = POE.cast.frollo; if (Q) {
poeMove(Q, "x_paris", 1162, -2220, 0.5);
Q.g.visible = true;
} if (F) {
poeMove(F, "x_paris", 1163.5, -2218.6, -2.6);
F.g.visible = true;
} }, done: function () { ndHide(["quasi", "frollo"]); } }),
pShadow("She sets off from the Place with her goat. Follow her through the dark streets, as Gringoire did: not too close, never losing her", "esme", ND_ESME_WALK, { whoName: "La Esmeralda", sp: 1.7, far: 30, near: 3.2, lost: "She went that way, toward the Rue de la Tixeranderie.",
extra: { on: function (f) { var E = POE.cast.esme; ndDance(E, false); if (E) {
E.g.position.set(ND_ESME_WALK[0][0], 0, ND_ESME_WALK[0][1]);
} poeNdTime("night"); var G = POE.goat_x_paris; if (G)
G.visible = false; } } }),
pCard("The inconveniences of following a pretty woman through the streets in the evening", function () { return ndP(2, "The young girl's attention had been attracted to him", 1) + ndP(2, "Quasimodo came up to him, tossed him four paces away", 1) + ndP(2, "\"Halt, rascals, and yield me that wench!\"", 1) + ndP(2, "He tore the gypsy from the arms of the dazed Quasimodo", 1); }, "The captain", { on: function () { return __ZC(467, 319, this, arguments, new.target); }, done: function () { ndHide(["quasi", "frollo"]); } }),
pQuiz("“What is your name, monsieur le gendarme?”", "<p>The gypsy, across the captain's saddle, looks up at him and asks his name.</p>", [["Captain Phoebus de Châteaupers, at your service, my beauty!", "", true], ["Jacques Charmolue", "", false, "That is the king's procurator in the ecclesiastical court; he comes later."], ["Robert d'Estouteville", "", false, "The provost of Paris; not he."]], { done: function () { ndHide(["phoebus", "esme"]); } }),
pCard("Result of the dangers", function () { return ndP(2, "\"What would you have, captain?\" said one gendarme", 1) + poeNote("Gringoire picks himself out of the gutter, soaked, and wanders on, lost, through streets ever narrower and darker. Cripples in bowls, blind men and lame men crawl after him out of the night."); }, "Lost in the night"),
pWay("Wander on, lost, into the dark streets to the north, as Gringoire did: follow the faint lights from one corner to the next", ND_TO_COUR, { r: 9 }),
pCard("The Cour des Miracles", function () { return ndP(2, "\"Where am I?\" said the terrified poet", 1) + ndP(2, "Around a great fire which burned on a large, circular flagstone", 1); }, "“To the king! to the king!”"),
pTalk("Clopin Trouillefou", "They drag you before the king of this place, on his cask by the fire: Clopin Trouillefou, King of Thunes. Answer him", ["Clopin Trouillefou", function () { return ndP(2, "That is sufficient,\" resumed Trouillefou", 1) + ndP(2, "\"So be it,\" said the poet. \"I agree.", 1); }, "The test of the manikin"]),
pCard("The manikin", function () { return ndP(2, "\"What are they going to do?\" Gringoire asked himself", 1) + ndP(2, "\"Now,\" went on the King of Thunes, \"twist your right foot", 1); }, "Climb on the stool"),
pGo(function () { var M = POE_RX.x_paris.ndGallows; return M ? ndPar(M[0], M[1] + 0.6) : null; }, "Climb on the tottering stool under the manikin hung with bells", { r: 1.6 }),
pStill(8, "Twist your right foot round your left leg, rise on the tip of your left foot, and hold perfectly still: not a bell must sound", { r: 3, at: function () { var M = POE_RX.x_paris.ndGallows; return M ? ndPar(M[0], M[1] + 0.6) : null; }, moved: function () { poeSfx("bells"); poeSay("A tinkle! The stool shifts. Start again: still, perfectly still."); } }),
pSpot("The manikin hung with bells", "Now: one hand into the manikin's pocket, for the purse. Slowly", null, { on: function () { var M = POE_RX.x_paris.ndGallows; if (M)
poeSpotOnce("nd:manikin", POE_RX.x_paris.x + M[0], M[1] + 0.6, 1.8, "The manikin hung with bells", "feel for the purse", function () { }, 0); },
hooks: {}, done: function () { poeSfx("bells"); var M = POE_RX.x_paris.ndMannequin; if (M) {
var t = 0, A = poeEvery(function (dt) { t += dt; M.rotation.z = Math.sin(t * 3) * 0.25 * Math.max(0, 1 - t / 4); if (t > 4) {
M.rotation.z = 0;
return false;
} });
} } }),
pCard("The bells!", function () { return poeNote("The stool totters on its one good leg; your foot slips; your hand drags the manikin; all its bells ring at once, a long peal of little bells, and it swings and spins above you.") + ndP(2, "\"You will be hanged,\" replied the other", 1); }, "The noose"),
pCard("Will no one take him?", function () { return ndP(2, "Bellevigne de l'Etoile, Andry the Red", 1) + ndP(2, "This rare creature seemed, even in the Cour des Miracles", 1) + ndP(2, "\"You are going to hang this man?\" she said gravely", 1) + ndP(2, "She made her pretty little pout", 1); }, "The jug", { on: function () { var E = POE.cast.esme, C = ND_AT.miraclesClear; if (E) {
poeMove(E, "x_paris", C[0] - 3, C[1] + 2, 0.6);
E.g.visible = true;
} } }),
pCard("The broken jug", function () { return ndP(2, "The change was, in fact, violent", 1) + poeNote("The Duke of Egypt hands a jug of earthenware to the gypsy. “Throw it on the ground,” says he. The jug breaks.") + ndP(2, "The crock broke into four pieces.", 1) + poeNote("“Brother, she is your wife; sister, he is your husband; for four years. Go.”"); }, "Her door", { done: function () { var C = ND_AT.miraclesClear; poeSpotOnce("nd:bridedoor", POE_RX.x_paris.x + C[0] + 6, C[1] + 7.6, 2, "A little door in the Cour des Miracles", "go in after her", function () { if (POE.era)
poeEnterRoom("x_ndbride", "nd:cour"); }, 0); } }),
pGo({ room: "x_ndbride" }, "She leads you to a little door at the edge of the square: go in after her", { on: function () { var E = POE.cast.esme; if (E) {
poeMove(E, "x_ndbride", -1.2, -1.0, 0.6);
E.g.visible = true;
} } }),
pTalk("La Esmeralda", "A little vaulted room, warm; a table, a chest, a bed; a lamp; the goat. She has taken a tiny dagger from somewhere. Speak to her", ["La Esmeralda", function () { return ndP(2, "\"Pardon, mademoiselle,\" said Gringoire, with a smile", 1) + ndP(2, "\"So,\" said the poet, somewhat disappointed", 1) + ndP(2, "\"I can never love a man who cannot protect me.\"", 1); }, "“Do you know what Phoebus means?”"]),
pQuiz("Phoebus", "<p>She asks Gringoire, out of nowhere, what the name <i>Phoebus</i> means. He is not sorry to display his learning.</p>", [["It is a Latin word which means “sun”", "", true], ["It is a Greek word which means “archer”", "", false, "Not quite: Gringoire knows his Latin."], ["It means “captain”", "", false, "No: think of the god it belongs to."]], { done: function () { } }),
pCard("A bridal night", function () { return ndP(2, "\"Sun!\" she repeated", 1) + ndP(2, "\"A god!\" repeated the gypsy", 1) + poeNote("She is gone through the other door with her goat, and Gringoire hears the bolt slide. He sleeps on the chest."); }, "End of the second book", { done: function () { poeHide(POE.cast.esme); } })
];
ND_CH.push({ t: "The Place de Grève and the Cour des Miracles", book: 2, when: "The same day, at nightfall. The Place de Grève; the streets of the Town; the Cour des Miracles.",
words: "“In a vast space left free between the crowd and the fire, a young girl was dancing.”",
intro: "The bonfire, the dancer and her goat, the night streets, the King of Thunes",
setup: function (f) { return __ZC(467, 320, this, arguments, new.target); },
hooks: { ndRat: function () { poeCard("The Rat-Hole", poeNote("A barred window in the wall of the old house of the Tour-Roland. Over it, cut in the stone: TU, ORA. A recluse is walled up within.")); } },
end: function () { ndDance(POE.cast.esme, false); ndHide(["esme", "frollo", "quasi", "phoebus", "clopin", "cour0", "cour1", "cour2", "cour3"]); var G = POE.goat_x_paris; if (G)
G.visible = false; POE.ndShow = {}; },
steps: ND_B2 });
function ndTowerLook(name, at, needle, n, h) { return [pLook(h, function () { return ndPar(at[0], at[1]); }, 2.0, { cone: 0.14 }), pCard(name, function () { return ndP(3, needle, n || 1); }, "Turn to the next")]; }
var ND_B3 = [
pRead(),
pCard("Notre-Dame", function () { return ndP(3, "The church of Notre-Dame de Paris is still no doubt", 1) + ndP(3, "On the face of this aged queen of our cathedrals", 1); }, "Look up at the front"),
pLook("The west front. Hugo writes of what the eighteenth century took from it; here it still stands. Look up at the gallery of the kings over the portals", function () { var p = poeNdTopAt(-67, 0); return ndPar(p[0], p[1]); }, 2.5, { cone: 0.3 }),
pCard("The twenty-eight kings", function () { return ndP(3, "Three important things are to-day lacking in that facade", 1) + ndP(3, "But who has thrown down the two rows of statues?", 1) + poeNote("In 1482 they are all there: twenty-eight kings, painted and gilded, from Childebert to Philip Augustus."); }, "And the spire"),
pLook("Now look above the roofs, over the crossing: the spire", function () { var p = poeNdTopAt(3, 0); return ndPar(p[0], p[1]); }, 2.0, { cone: 0.25 }),
pCard("The little bell tower", function () { return ndP(3, "And if we ascend the cathedral, without mentioning a thousand barbarisms", 1); }, "Go in"),
pSpot("Notre-Dame de Paris (the Portal of the Last Judgment)", "Go into the church by the great portal", null),
pSpot("The colossal Saint Christopher", "Inside on your right, against the first pier: the colossus of Saint Christopher, wading the river with the Child on his shoulder", null, { hooks: { ndChristopher: function () { poeCard("Saint Christopher", ndP(3, "And if we enter the interior of the edifice", 1)); } } }),
pSpot("The rood screen", "Go up the nave to the screen that closes the choir, with the great crucifix over it", null, { hooks: { ndJube: function () { return __ZC(467, 321, this, arguments, new.target); } } }),
pCard("Notre-Dame is not a complete monument", function () { return ndP(3, "Notre-Dame is not, moreover, what can be called", 1) + ndP(3, "It is an edifice of the transition period", 1); }, "To the towers"),
pSpot("The stair of the north tower", "Climb the north tower: the dark spiral that pierces the thick wall of the belfries", null, { done: function () { setTimeout(function () { poeNdTopGo(); }, window.POE_FAST ? 10 : 300); } }),
pCard("A bird's-eye view of Paris", function () { return ndP(3, "That was, in fact,—when, after having long groped", 1) + ndP(3, "For the spectator who arrived, panting, upon that pinnacle", 1); }, "The three towns", { on: function () { POE.ndView = 1; } }),
pCard("The City, the University, the Town", function () { return ndP(3, "In the fifteenth century, Paris was still divided into three", 1); }, "First, the City")
].concat(ndTowerLook("The City: the prow of the ship", ND_AT.chapelle, "Thus the City first presented itself to the eye", 1, "First the City, the island under your feet: it is made like a great ship. Look toward its prow, to the west, where the spire of the Sainte-Chapelle stands over the roofs of the Palais"), ndTowerLook("The University", ND_AT.genevieve, "The ground of the University was hilly", 1, "Turn to the left bank, the University: the mass of its roofs climbing to the abbey and the tower of Sainte-Geneviève on its mount, to the south"), ndTowerLook("The Town: the Bastille", ND_AT.bastille, "To the right of the Tournelles, that truss of enormous towers", 1, "Now the right bank, the Town. Far to the east, black as ink, the eight towers of the Bastille"), ndTowerLook("The Grève and the Rues Saint-Denis and Saint-Martin", ND_AT.greve, "The Rues Saint-Denis and Saint-Martin", 1, "Nearer, just across the river: the Place de Grève, where the girl danced last night"), ndTowerLook("The Louvre", ND_AT.louvre, "Finally, the fourth compartment", 1, "And downstream to the west, the Louvre of the kings, its great tower in the midst of its three and twenty towers")).concat([
pHold(function () { var R = POE_RX.x_paris; return R && R.ndTop ? ndPar(R.ndTop.x, R.ndTop.z) : null; }, 18, "Lend an ear: the bells of all Paris wake, one church answering another, across the roofs", { r: 8, on: function () { ndPeal(24, 1); }, done: function () { ndPeal(8, 2); } }),
pCard("The concert of bell towers", function () { return ndP(3, "And if you wish to receive of the ancient city an impression", 1) + ndP(3, "Assuredly, this is an opera which it is worth the trouble", 1); }, "Go down"),
pSpot("The stair down the tower", "Go down the tower again", null)
]);
ND_CH.push({ t: "Notre-Dame", book: 3, when: "Notre-Dame de Paris in 1482, and Paris seen from the top of its towers.",
words: "“The church of Notre-Dame de Paris is still no doubt, a majestic and sublime edifice. But, beautiful as it has been preserved in growing old, it is difficult not to sigh, not to wax indignant, before the numberless degradations and mutilations which time and men have both caused the venerable monument to suffer.”",
intro: "The west front, the colossus, the spire, the view from the towers",
setup: function (f) { ndWarm(3); poeNdTime("day"); POE.ndShow = {}; poeRoomGet("x_paris"); var P = ndParvis(); if (P)
ndGoPar(P.x - POE_RX.x_paris.x, P.z, P.ry); },
end: function () { POE.ndView = 0; poeNdFarDrop(); },
steps: ND_B3 });
POE_LOOK.ndStage = ["The marble table", function () { return ndP(1, "It was upon the marble table", 1) || poeNote("The marble table of the great hall."); }];
POE_LOOK.ndRose = ["The little rose window", function () { return poeNote("Over the door of the chapel of Louis XI; one pane is broken."); }];
POE_LOOK.ndTribune = ["The tribune of the ambassadors", function () { return ndP(1, "In the middle of the hall, opposite the great door", 1); }];
POE_LOOK.ndChristopher = ["Saint Christopher", function () { return ndP(3, "And if we enter the interior of the edifice", 1); }];
POE_LOOK.ndJube = ["The rood screen", function () { return ndP(3, "And who substituted for the ancient gothic altar", 1); }];
POE_LOOK.ndRat = ["The Rat-Hole", function () { return poeNote("A barred window in the wall of the Tour-Roland. Over it: TU, ORA."); }];
var ND_ROOMS2 = [["x_ndbells", "The belfry of the south tower", 12, 12, 14, 122000, 1.1], ["x_ndcanon", "Dom Claude's cell in the cloister", 8, 6, 4, 123000, 0.9], ["x_ndcourt", "The audience hall of the Châtelet", 15, 10, 5, 124000, 1.0],
["x_ndcell", "The archdeacon's cell in the north tower", 7, 7, 4.2, 125000, 0.85], ["x_ndgondel", "The Gondelaurier house, on the parvis", 11, 8, 4.6, 126000, 1.2], ["x_ndfalour", "La Falourdel's upper room, Pont Saint-Michel", 6, 5, 3, 127000, 0.8],
["x_ndtorture", "The torture chamber under the Palais", 9, 8, 4, 128000, 0.75], ["x_ndpit", "The pit of the Tournelle", 4, 4, 3.2, 129000, 0.5], ["x_ndrefuge", "The cell of the sanctuary", 5, 4, 3, 130000, 0.95],
["x_ndbastille", "The retreat of Louis XI in the Bastille", 10, 8, 4.6, 131000, 0.95], ["x_ndvault", "The vault of Montfaucon", 9, 9, 3.4, 132000, 0.85]];
ND_ROOMS2.forEach(function (D) { POE_ROOMS.push({ k: D[0], n: D[1], custom: 1, w: D[2], d: D[3], h: D[4], dark: D[6], doors: [] }); var n = POE_ROOMS.length, R = POE_ROOMS[n - 1]; R.i = n - 1; R.x = POE_IN_X + D[5]; POE_RX[D[0]] = R; });
function ndShell(R, g, o) { return __ZC(467, 322, this, arguments, new.target); }
function ndForm(P, x, z, w, col) { var g = poeGrp(P, x, 0, z), o = poeS("oak", 0x4A2E18); poeBox(g, w, 0.06, 0.36, o, 0, 0.42, 0); [-1, 1].forEach(function (sd) { poeBox(g, 0.06, 0.42, 0.3, o, sd * (w / 2 - 0.12), 0.21, 0); }); poeBox(g, w - 0.3, 0.04, 0.04, o, 0, 0.15, 0); poeBox(g, w - 0.06, 0.07, 0.32, poeS("velvet", col || 0x8A2A2A), 0, 0.485, 0); return g; }
function ndWords(P, lines, x, y, z, ry, w, h, bg, fg) { var s = wSign(lines, w, h, bg || "#B8AC94", fg || "#2A1E14"); s.position.set(x, y, z); s.rotation.y = ry || 0; P.add(s); return s; }
function ndBell(P, x, y, z, r, col) { return __ZC(467, 323, this, arguments, new.target); }
POE_RB.x_ndbells = function (R, g) { return __ZC(467, 324, this, arguments, new.target); };
POE_LOOK.ndMarie = ["Big Marie", function () { return ndP(4, "It is true that their voice was the only one", 1); }];
POE_RB.x_ndcanon = function (R, g) { return __ZC(467, 325, this, arguments, new.target); };
POE_LOOK.ndWindow = ["Notre-Dame, from the cell", function () { return ndP(5, "And opening the window of his cell", 1); }];
POE_LOOK.ndInscr = ["The inscription", function () { return ndP(5, "Gossip Tourangeau obeyed, and read this inscription", 1); }];
POE_RB.x_ndcourt = function (R, g) { return __ZC(467, 326, this, arguments, new.target); };
POE_RB.x_ndcell = function (R, g) { return __ZC(467, 327, this, arguments, new.target); };
POE_LOOK.ndSpider = ["The spider and the fly", function () { return poeNote("In the corner of the window a great spider's web; a fly, seeking the sun, has thrown itself into it and is caught."); }];
POE_LOOK.ndFurnace = ["The furnace", function () { return poeNote("Cold. A crucible on it, crusted; a pair of bellows; on the bellows, in copper letters: SPIRA, SPERA."); }];
POE_LOOK.ndWordCell = ["The word", function () { return poeNote("ΑΝΑΓΚΗ: Fate. Cut deep, the letters blackened with age."); }];
POE_RB.x_ndgondel = function (R, g) { return __ZC(467, 328, this, arguments, new.target); };
POE_RB.x_ndfalour = function (R, g) { return __ZC(467, 329, this, arguments, new.target); };
POE_RB.x_ndtorture = function (R, g) { return __ZC(467, 330, this, arguments, new.target); };
POE_RB.x_ndpit = function (R, g) { return __ZC(467, 331, this, arguments, new.target); };
POE_RB.x_ndrefuge = function (R, g) { return __ZC(467, 332, this, arguments, new.target); };
POE_RB.x_ndbastille = function (R, g) { return __ZC(467, 333, this, arguments, new.target); };
function ndBoneGeo() { return __ZC(467, 334, this, arguments, new.target); }
function ndBoneMat() { return POE.mats.ndBone || (POE.mats.ndBone = new THREE.MeshStandardMaterial({ color: 0xC8BA98, roughness: 0.82, metalness: 0 })); }
function ndBone(P, a, b, k) {
var v = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), L = v.length(), m = new THREE.Mesh(ndBoneGeo(), ndBoneMat());
m.scale.set(k || 0.5, L, k || 0.5);
m.position.set(a[0], a[1], a[2]);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize());
P.add(m);
return m;
}
function ndSkullHead(P, x, y, z, s, jawOpen) { return __ZC(467, 335, this, arguments, new.target); }
function ndSkeleton(P, o) { return __ZC(467, 336, this, arguments, new.target); }
function ndBoneHeap(P, x, z, n, seed, w, d) { return __ZC(467, 337, this, arguments, new.target); }
POE_RB.x_ndvault = function (R, g) { return __ZC(467, 338, this, arguments, new.target); };
POE_PAR_CLEAR_ND.push([ND_AT.montfaucon[0], ND_AT.montfaucon[1] - 6, 48, 48, 2]);
function poeParNoTree(x, z) { var M = ND_AT.montfaucon; return !!POE.era && Math.abs(x - M[0]) < 52 && Math.abs(z - M[1] + 6) < 52; }
(function () {
var f = poeNdCity;
poeNdCity = function (R, g) {
var out = f(R, g), lite = POE.lite, M = ND_AT.montfaucon, q = poeNdMark(poeGrp(g, M[0], 0, M[1], 0), 1482), st = poeParLit(poeS("stone", 0x9A9282)), dk = poeParLit(poeS("stone", 0x6A6458)), oak = poeS("oak", 0x3A2A1A), ir = poeShine(0x2A2A2A, 0.6, 0.7);
poeBox(q, 12, 4.6, 9, st, 0, 2.3, 0);
poeBox(q, 12.6, 0.4, 9.6, dk, 0, 4.8, 0);
poeFace(q, 1.6, 2.6, poeC(0x0A0806), 0, 1.3, 4.52, 0);
for (var s = 0; s < 12; s++) {
var sx = -5.2 + s * 0.95;
poeBox(q, 0.5, 0.25, 0.5, dk, sx, 4.95, 4.6);
}
for (var k = 0; k < 9; k++)
poeBox(q, 1.6, 0.5, 0.9, dk, 4.4, 0.25 + k * 0.5, 5.0 + (8 - k) * 0.9 - 0.45 * 0);
var pil = [];
for (var i = 0; i < 6; i++)
pil.push([-5.4 + i * 2.16, -4.0]);
for (var j = 1; j < 5; j++) {
pil.push([-5.4, -4.0 + j * 1.6]);
pil.push([5.4, -4.0 + j * 1.6]);
}
pil.push([-5.4, 3.6], [5.4, 3.6]);
pil.forEach(function (p) { poeBox(q, 0.9, 9.5, 0.9, st, p[0], 5 + 4.75, p[1]); });
[[0, -4.0, 11.7, 0], [-5.4, -0.2, 0, 8.4], [5.4, -0.2, 0, 8.4]].forEach(function (b) { [9, 13.6].forEach(function (y) { poeBox(q, b[2] || 0.5, 0.5, b[3] || 0.5, oak, b[0], y, b[1]); }); });
for (var c = 0; c < (lite ? 6 : 14); c++) {
var cx = c < 6 ? -5.4 + c * 2.16 + 1.08 : (c < 10 ? -5.4 : 5.4), cz = c < 6 ? -4.0 : -4.0 + ((c - 6) % 4 + 0.5) * 1.6;
poeCyl(q, 0.03, 0.03, 3.2, ir, cx, 11.9, cz, 4);
}
for (var h = 0; h < (lite ? 3 : 7); h++) {
var hx = h < 4 ? -4.3 + h * 2.16 : (h < 6 ? -5.4 : 5.4), hz = h < 4 ? -4.0 : -2.4 + (h % 2) * 3.2, hg = poeGrp(q, hx, 0, hz, h * 1.3);
poeCyl(hg, 0.02, 0.02, 1.6, ir, 0, 12.6, 0, 4);
var bd = poeGrp(hg, 0, 11.85, 0, 0);
bd.rotation.z = (h % 3 - 1) * 0.05;
var sk = ndSkeleton(bd, { look: (h % 2 ? 0.4 : -0.3), jaw: 0.3, arms: [[[-0.2, 1.1, 0.04], [-0.18, 0.84, 0.08]], [[0.2, 1.1, 0.04], [0.18, 0.84, 0.08]]] });
sk.position.y = -1.55;
{
var rag = poePlane(bd, 0.42, 0.7, poeS("cloth", [0x4A3A2A, 0x5A4A3A, 0x3A2E22][h % 3]), 0, -0.55, 0.06);
rag.rotation.x = -Math.PI / 2;
}
if (!lite && h % 2)
poeRaven(q, hx + 0.3, 13.65, hz, h, 0.8);
}
[[-3, 13.65, -4.0], [2.2, 13.65, -4.0], [5.4, 13.65, 1.0]].forEach(function (c, i) { if (!lite)
poeRaven(q, c[0], c[1], c[2], i * 2, 0.8); });
for (var r = 0; r < 28; r++) {
var a = r / 28 * Math.PI * 2;
poeBox(q, 0.18, 1.2, 0.18, oak, Math.cos(a) * 16, 0.6, Math.sin(a) * 13);
}
var S = poeSolid(R.x + M[0], M[1], 12.4, 9.4, -2, 4.8, 0);
S.era = 1482;
S.off = !POE.era;
(R.ndSolids || (R.ndSolids = [])).push(S);
R.ndMontSpot = poeSpot(R.x + M[0], M[1] + 5.6, 2.0, "The door of the vault of Montfaucon", "go down", function () { if (POE.era)
poeEnterRoom("x_ndvault", "nd:mont"); }, 0);
R.ndMontSpot.off = !POE.era;
out.push(q);
return out;
};
})();
(function () { var f = poeNdEraRooms; poeNdEraRooms = function () { f.apply(this, arguments); var R = POE_RX.x_paris; if (R && R.ndMontSpot)
R.ndMontSpot.off = !POE.era; }; })();
function pRing(h) { return __ZC(467, 339, this, arguments, new.target); }
function ndRoomP(room, lx, lz) { var R = POE_RX[room]; return R ? { x: R.x + lx, z: lz, area: "room:" + room } : null; }
var ND_B4 = [
pRead(),
pCard("Quasimodo Sunday, 1467", function () { return ndP(4, "Sixteen years previous to the epoch", 1) + ndP(4, "The sort of living being which lay upon that plank", 1); }, "Go and see"),
pSpot("The foundlings' bed", "Inside the west doors, on the left: the wooden bed where foundlings are exposed to public charity. A crowd of old women bends over it", null),
pTalk("Agnes la Herme", "Four old women in grey cassocks, the Haudriettes, have their faces close to the bed. Speak to the first of them", ["Agnes la Herme", function () { return ndP(4, "In the first row, and among those", 1) + ndP(4, "\"What is this, sister?\" said Agnes", 1) + ndP(4, "\"What is to become of us,\"", 1) + ndP(4, "\"'Tis not a child, Agnes.\"", 1) + ndP(4, "\"'Tis an abortion of a monkey,\"", 1); }, "And the learned men?"]),
pTalk("Master Robert Mistricolle", "The king's protonotary has stopped, a missal under one arm and his wife on the other: ask him what he makes of it", ["Master Robert Mistricolle", function () { return __ZC(467, 340, this, arguments, new.target); }, "A young priest has been listening"], null, { done: function () { var F = POE.cast.frollo; if (F) {
poeMove(F, "x_nd", -50.4, -4.2, -0.4);
F.g.visible = true;
} } }),
pTalk("Dom Claude Frollo", "A young priest, with a severe face, a broad brow and a profound glance, has been listening to the women. Watch what he does", ["Claude Frollo, 1467", function () { return ndP(4, "For several minutes, a young priest had been listening", 1) + ndP(4, "\"I adopt this child,\" said the priest.", 1) + ndP(4, "He took it in his cassock and carried it off.", 1) + ndP(4, "\"I told you so, sister,", 1); }, "Who was he?"]),
pCard("Claude Frollo", function () { return ndP(4, "In fact, Claude Frollo was no common person.", 1) + ndQ(4, "He belonged to one of those middle-class families", 3) + ndP(4, "This catastrophe was a crisis in Claude's existence.", 1) + ndP(4, "He threw himself, therefore, into the love for his little Jehan", 1); }, "The foundling"),
pCard("The foundling", function () { return ndP(4, "It was at the moment when he was returning, on Quasimodo day", 1) + ndP(4, "Then it was that he approached the unhappy little creature", 1) + ndQ(4, "When he removed the child from the sack", 4); }, "His name"),
pQuiz("Quasimodo", "<p>He baptized his adopted child, and gave him a name. Why <b>Quasimodo</b>?</p>", [["For the Sunday he was found on, and because the poor little creature was so incomplete: “almost”", "", true], ["After a saint of Reims", "", false, "No: think of the day, Quasimodo Sunday, and what the Latin word means."], ["Because the Haudriettes chose it", "", false, "No: the priest named him."]]),
pCard("Immanis pecoris custos, immanior ipse", function () { return ndP(4, "He baptized his adopted child, and gave him the name of Quasimodo", 1) + ndP(4, "Now, in 1482, Quasimodo had grown up.", 1) + ndP(4, "So Quasimodo was the ringer of the chimes of Notre-Dame.", 1) + ndP(4, "There was certainly a sort of mysterious and pre-existing harmony", 1); }, "Up to the bells", { done: function () { var F = POE.cast.frollo; if (F)
poeHide(F); } }),
pSpot("The stair of the north tower", "Climb to the bells, as he does: faster than anyone could come down", null, { done: function () { setTimeout(function () { poeEnterRoom("x_ndbells", "nd:stair"); }, window.POE_FAST ? 10 : 300); } }),
pCard("The bells", function () { return ndP(4, "What he loved above all else in the maternal edifice", 1) + ndP(4, "It is true that their voice was the only one", 1); }, "“Go!”", { on: function () { var Q = POE.cast.quasi; if (Q) {
poeMove(Q, "x_ndbells", 1.8, 2.6, Math.PI);
Q.g.visible = true;
} } }),
pRing("The archdeacon has said “Go!”: today is a grand peal. Ring big Marie with Quasimodo: press E at the bell each time she reaches the top of her swing"),
pCard("The grand peal", function () { return ndP(4, "No idea can be formed of his delight on days when the grand peal", 1) + ndP(4, "\"Vah!\" he cried, with a senseless burst of laughter.", 1); }, "The dog and his master", { on: function () { ndPeal(14, 1); } }),
pTalk("Quasimodo", "When the peal dies away he sits by Marie, breathless, happy. Speak to him: he cannot hear you, but he watches your lips and your hands", ["The dog and his master", function () { return ndP(4, "Nevertheless, there was one human creature whom Quasimodo excepted", 1) + ndP(4, "The matter was simple; Claude Frollo had taken him in", 1) + ndP(4, "Hence Quasimodo's gratitude was profound", 1); }, "Dom Claude"]),
pCard("More about Claude Frollo", function () { return ndP(4, "In 1482, Quasimodo was about twenty years of age", 1) + ndQ(4, "Claude Frollo was no longer the simple scholar", 3) + ndQ(4, "Furthermore, it is certain that the archdeacon had established himself", 3) + ndQ(4, "It was also noticed that his horror for Bohemian women", 2); }, "Unpopularity"),
pCard("Unpopularity", function () { return ndP(4, "The archdeacon and the bellringer, as we have already said", 1) + ndP(4, "Sometimes a mischievous child risked his skin", 1) + ndP(4, "But the insult generally passed unnoticed", 1); }, "Down the tower"),
pSpot("The stair, down the tower", "Go down again", null)
];
ND_CH.push({ t: "Good Souls; the Bell-Ringer", book: 4, when: "Quasimodo Sunday, 1467, in Notre-Dame; then 1482, in the bells of the south tower.",
words: "“Sixteen years previous to the epoch when this story takes place, one fine morning, on Quasimodo Sunday, a living creature had been deposited, after mass, in the church of Notre-Dame, on the wooden bed securely fixed in the vestibule on the left.”",
intro: "The foundling, the young priest, the grand peal",
start: { room: "x_nd", from: "nd:parvis", at: { x: -52, z: -1, ry: -Math.PI / 2 } },
setup: function (f) { return __ZC(467, 341, this, arguments, new.target); },
end: function () { var R = POE_RX.x_nd; if (R && R.foundBed)
R.foundBed.visible = false; ndHide(["agnes", "jehanne", "henriette", "gauchere", "mistricolle", "frollo", "quasi"]); },
steps: ND_B4 });
var ND_B5 = [
pRead(),
pCard("Abbas beati Martini", function () { return ndP(5, "Dom Claude's fame had spread far and wide.", 1) + ndP(5, "It was in the evening. He had just retired", 1); }, "“Who is there?”"),
pCard("Two visitors", function () { return ndP(5, "A voice without replied, \"Your friend, Jacques Coictier.\"", 1) + ndP(5, "It was, in fact, the king's physician", 1) + ndP(5, "He was, so far as the feeble light of the lamp permitted", 1); }, "Greet the physician"),
pTalk("Jacques Coictier", "The king's physician has taken off his ermine-lined cap. Greet him", ["Jacques Coictier", function () { return __ZC(467, 342, this, arguments, new.target); }, "And his companion?"]),
pTalk("Gossip Tourangeau", "The old man in the shabby grey doublet, with the hooked nose and the flashing eyes, says his name is Gossip Tourangeau. Hear him", ["Gossip Tourangeau", function () { return ndP(5, "\"Reverend master,\" he said in a grave tone", 1) + ndP(5, "\"Your reverence,\" replied Tourangeau, \"I am ill, very ill.", 1) + ndP(5, "\"Medicine!\" said the archdeacon, tossing his head.", 1); }, "Read what is over his head"]),
pSpot("The words over the guest's chair", "Dom Claude points at the wall above the old man's head: read the inscription", null, { hooks: { ndInscr: function () { poeCard("The inscription", ndP(5, "Gossip Tourangeau obeyed, and read this inscription", 1)); } } }),
pQuiz("“What then do you believe in?”", "<p>The archdeacon will not have medicine; he laughs at astrology: “The idea of imagining that every ray of a star is a thread fastened to the head of a man!” Gossip Tourangeau, astonished, asks him what he holds to be true and certain.</p>", [["Alchemy", "", true], ["The stars", "", false, "He has just mocked the stars."], ["Medicine", "", false, "“I reject the physician.”"], ["Nothing at all", "", false, "He hesitates, smiles a gloomy smile, and answers in one word."]]),
pCard("“Alchemy.”", function () { return ndP(5, "\"Alchemy.\"", 1) + ndP(5, "\"And,\" said Tourangeau suddenly, \"the wondrous result,", 1) + ndP(5, "\"If I had made it,\" replied the archdeacon", 1) + ndP(5, "\"What am I saying?\" resumed Dom Claude", 1) + ndP(5, "\"But no, I am still crawling;", 1); }, "“What are your books, then?”"),
pSpot("The window, toward Notre-Dame", "“Here is one of them,” says the archdeacon, and opens the window of his cell: go to it", null, { hooks: { ndWindow: function () { poeCard("“Here is one of them”", ndP(5, "And opening the window of his cell he pointed out", 1) + ndP(5, "The archdeacon gazed at the gigantic edifice", 1)); } } }),
pQuiz("“Alas! this will kill that.”", "<p>He stretches his right hand toward the printed book on his table, his left toward Notre-Dame, and turns a sad glance from the book to the church. What will kill what?</p>", [["The book will kill the building: the printing press will kill architecture", "", true], ["The king will kill the Church", "", false, "No: look at what he points to, the printed book and the church of stone."], ["Gold will kill science", "", false, "No: one hand on a printed book, the other toward Notre-Dame."]]),
pCard("Curfew", function () { return ndP(5, "You have said it,\" replied Claude", 1) + ndP(5, "The curfew of the cloister sounded", 1) + ndP(5, "It was the hour when no stranger could remain", 1); }, "Who was he?", { done: function () { ndHide(["coictier", "tourangeau"]); } }),
pQuiz("Gossip Tourangeau", "<p>“Master,” says Coictier on the stair, “I have to tell you something: you have been in the presence of…”</p>", [["Louis XI, King of France", "", true], ["The Cardinal de Bourbon", "", false, "Older, shabbier, richer: the king's physician serves him."], ["The provost of Paris", "", false, "Coictier is the king's physician."]]),
pCard("This will kill that", function () { return ndP(5, "The archdeacon returned to his chamber dumbfounded", 1) + ndP(5, "Our lady readers will pardon us", 1) + ndP(5, "In the fifteenth century everything changes.", 1) + ndP(5, "Human thought discovers a mode of perpetuating itself", 1) + ndP(5, "*The book is about to kill the edifice*.", 1) + ndP(5, "The invention of printing is the greatest event in history.", 1); }, "Read the whole chapter", { choices: [["Go on", "", null], ["Read the whole chapter", "Hugo's essay, page by page", function () { setTimeout(function () { ndRead(5, 100); }, 50); }]] }),
pSpot("The door, to the cloister", "Leave the cell", null)
];
ND_CH.push({ t: "Abbas Beati Martini; This Will Kill That", book: 5, when: "An evening early in 1482, in Dom Claude's canon's cell in the cloister of Notre-Dame.",
words: "“Alas! this will kill that.”",
intro: "The king's physician, Gossip Tourangeau, the book and the building",
start: { room: "x_ndcanon", from: "nd:cloister", at: { x: 2.6, z: 2.0, ry: -Math.PI * 0.25 } },
setup: function (f) { return __ZC(467, 343, this, arguments, new.target); },
end: function () { ndHide(["frollo", "coictier", "tourangeau"]); },
steps: ND_B5 });
var ND_B6 = [
pRead(),
pCard("An impartial glance at the ancient magistracy", function () { return ndQ(6, "A very happy personage in the year of grace 1482", 3) + ndP(6, "The hall was small, low, vaulted.", 1); }, "The auditor"),
pCard("Master Florian Barbedienne", function () { return ndP(6, "Imagine, in fact, at the provost's table", 1) + ndP(6, "Now, the auditor was deaf.", 1); }, "The scholars"),
pTalk("Jehan Frollo du Moulin", "Behind the bar the archdeacon's young brother has squeezed in to watch, laughing in his sleeve. Speak to him", ["Jehan Frollo du Moulin", function () { return ndQ(6, "\"Stay,\" he said in a low tone to his companion", 6) + ndP(6, "It was he indeed.", 1); }, "The prisoner"]),
pCard("The prisoner", function () { return ndP(6, "It was Quasimodo, bound, encircled, roped", 1) + ndQ(6, "Meanwhile Master Florian, the auditor", 3); }, "“Your name?”", { on: function () { var Q = POE.cast.quasi; if (Q) {
poeMove(Q, "x_ndcourt", 0, -1.0, Math.PI);
Q.g.visible = true;
} } }),
pQuiz("A deaf man questioning a deaf man", "<p>“Your name?” Quasimodo, whom nothing warns that a question has been addressed to him, goes on staring fixedly at the judge, and does not answer. The judge, deaf too, and not knowing his prisoner is deaf, thinks that he has answered, as all prisoners do. So what does he say next?</p>", [["“Very well. And your age?”", "", true], ["“Answer, knave, or you will hang!”", "", false, "He thinks the man has answered."], ["He calls for an interpreter", "", false, "He does not care to have his own deafness noticed."]]),
pCard("“Very well. And your age?”", function () { return ndP(6, "\"Very well. And your age?\"", 1) + ndP(6, "Again Quasimodo made no reply", 1) + ndP(6, "\"Now, your profession?\"", 1) + ndP(6, "Still the same silence.", 1) + ndP(6, "\"That will do,\" went on the imperturbable auditor", 1) + ndP(6, "At this unlucky question, a burst of laughter rose", 1); }, "The provost comes in"),
pCard("Monseigneur the provost", function () { return ndP(6, "The provost addressed him with severity", 1) + ndP(6, "The poor fellow, supposing that the provost was asking his name", 1) + ndP(6, "\"Bellringer of Notre-Dame,\" replied Quasimodo", 1) + ndP(6, "\"If it is my age that you wish to know,\"", 1) + ndP(6, "This was too much; the provost could no longer restrain himself.", 1) + ndP(6, "\"Ah! you are scoffing at the provostship", 1); }, "The sentence"),
pQuiz("The sentence", "<p>The provost has given the bell-ringer a flogging and an hour in the pillory of the Grève. Before he signs, Master Florian hears the clerk whisper, pointing at the prisoner: “That man is deaf.” Master Florian hears not a word, but wishes to seem to hear. What does he do?</p>", [["He says “Ah! that is different,” and adds another hour of the pillory", "", true], ["He frees the prisoner", "", false, "He did not hear a word the clerk said."], ["He halves the sentence", "", false, "He wishes to seem to hear; what he says makes it worse."]]),
pCard("“Ventre Dieu! 'tis well adjudged!”", function () { return ndP(6, "He hoped that this community of infirmity", 1) + ndP(6, "And he signed the sentence thus modified.", 1) + ndP(6, "\"'Tis well done,\" said Robin Poussepain", 1); }, "Out to the Grève", { done: function () { var Q = POE.cast.quasi; if (Q)
poeHide(Q); ndHide(["jehan"]); } }),
pSpot("The door of the hall", "Go out, and down to the Place de Grève, where the pillory waits", null),
pCard("The Rat-Hole", function () { return ndP(6, "The reader must permit us to take him back to the Place de Greve", 1) + ndQ(6, "It is ten o'clock in the morning;", 4) + ndP(6, "At the epoch of this history, the cell in the Tour-Roland was occupied.", 1); }, "Three women come along the quay"),
pTalk("Mahiette", "Three women come along the quay with a little boy dragging behind, carrying a cake for the recluse. The one from Reims, Mahiette, knows a story. Ask her", ["Mahiette", function () { return ndP(6, "Two of these women were dressed like good bourgeoises", 1) + ndP(6, "\"The gypsy!\" said Mahiette, suddenly retracing her steps", 1) + ndP(6, "\"Oh! you must tell us that story, my good Mahiette,\"", 1) + ndQ(6, "\"Gladly,\" replied Mahiette", 8); }, "Paquette la Chantefleurie"]),
pCard("Paquette la Chantefleurie", function () { return ndQ(6, "\"Patience!\" resumed Mahiette", 6) + ndQ(6, "\"So she was very sad, very miserable", 6) + ndQ(6, "\"However, Paquette's child had more that was pretty", 5); }, "The gypsies"),
pCard("The gypsies of Reims", function () { return ndQ(6, "\"Here,\" replied Mahiette. \"One day there arrived in Reims", 6) + ndQ(6, "\"She was very much frightened by the Egyptians", 10); }, "The little shoe"),
pQuiz("The little shoe", "<p>When Paquette ran back to her room, the cradle was empty. Of her little Agnès there remained to her one thing only. What?</p>", [["One of her little shoes, of pink silk, embroidered with silver", "", true], ["Her christening robe", "", false, "Something small that she had made for her child's feet."], ["A lock of her hair", "", false, "Something she had sewn herself, for the child's feet."]]),
pQuiz("In the cradle", "<p>And in the empty cradle, in place of the pretty child, the gypsies had left something. Mahiette tells what became of it: the archbishop had it exorcised and sent to Paris, to be exposed on the wooden bed of Notre-Dame as a foundling. What was it?</p>", [["A little monster, hideous, lame and one-eyed", "", true], ["A gypsy girl", "", false, "Think of the foundlings' bed, and Quasimodo Sunday, 1466."], ["A goat", "", false, "Think of the foundlings' bed of Notre-Dame."]]),
pCard("What became of la Chantefleurie?", function () { return ndP(6, "\"Some said that she had been seen to quit Reims at nightfall", 1) + ndP(6, "\"And the little shoe?\" asked Gervaise.", 1) + ndP(6, "\"Disappeared with the mother,\" replied Mahiette.", 1); }, "To the Rat-Hole"),
pSpot("The Rat-Hole", "Go with them to the grating in the wall of the Tour-Roland, and look in", null, { hooks: { ndRat: function () { poeCard("Sister Gudule", ndP(6, "The cell was small, broader than it was long", 1) + ndP(6, "It was neither a woman, nor a man, nor a living being", 1)); } } }),
pCard("“And I call her Paquette la Chantefleurie”", function () { return ndP(6, "\"What do you call that woman?\" she asked Oudarde.", 1) + ndP(6, "\"We call her Sister Gudule.\"", 1) + ndP(6, "\"And I,\" returned Mahiette, \"call her Paquette la Chantefleurie.\"", 1) + ndP(6, "Oudarde looked and beheld, in the corner", 1); }, "The child's voice", { on: function () { ndPeal(1, 0); } }),
pCard("The recluse", function () { return ndP(6, "At the sound of this clear, fresh, ringing child's voice", 1) + ndP(6, "\"Fire!\" said the sacked nun", 1) + ndP(6, "Every limb was trembling", 1) + ndP(6, "At that moment, a scene which was passing at the pillory", 1); }, "The pillory", { done: function () { var Q = POE.cast.quasi; if (Q) {
var P = ND_AT.pillory;
poeMove(Q, "x_paris", P[0], P[1], Math.PI * 0.6);
Q.g.position.y = 3.47;
Q.y = 3.47;
Q.g.visible = true;
} } }),
pGo(function () { var P = ND_AT.pillory; return ndPar(P[0] - 7, P[1] + 3); }, "Push through the crowd to the foot of the pillory", { r: 5 }),
pCard("A tear for a drop of water", function () { return ndP(6, "The victim finally arrived, bound to the tail of a cart", 1) + ndP(6, "It was he, in fact. The change was singular.", 1) + ndP(6, "They placed him on his knees on the circular plank", 1) + ndP(6, "At length the torturer stamped his foot.", 1); }, "The hour-glass is turned"),
pHold(function () { var P = ND_AT.pillory; return ndPar(P[0] - 7, P[1] + 3); }, 20, "The hour on the pillory. The crowd mocks him; stand and watch, and do not join them", { r: 7, on: function () { poeSfx("laugh"); } }),
pCard("“Drink!”", function () { return ndP(6, "Quasimodo had resumed, to all appearance", 1) + ndP(6, "Then the wretched man, unable to break his collar", 1) + ndQ(6, "Nevertheless, that cloud cleared away for a moment", 3) + ndP(6, "This priest was Archdeacon Dom Claude Frollo.", 1) + ndP(6, "All at once he moved again in his chains", 1); }, "Who will give him water?", { on: function () { var F = POE.cast.frollo, P = ND_AT.pillory; if (F) {
poeMove(F, "x_paris", P[0] + 9, P[1] + 6, -2.0);
F.g.visible = true;
} }, done: function () { ndHide(["frollo"]); } }),
pTalk("La Esmeralda", "The crowd gives way: a young girl, fantastically dressed, with a little white goat, climbs the ladder with a gourd. Go to the foot of the ladder", ["A tear for a drop of water", function () { return ndP(6, "At that moment he beheld the crowd give way.", 1) + ndP(6, "She approached, without uttering a syllable", 1) + ndP(6, "Then, from that eye which had been", 1) + ndP(6, "When he had finished, the wretch protruded his black lips", 1) + ndP(6, "It would have been a touching spectacle anywhere", 1); }, "“Noel! Noel!”"], null, { on: function () { var E = POE.cast.esme, P = ND_AT.pillory; if (E) {
poeMove(E, "x_paris", P[0] - 2.6, P[1] + 1.6, 0.8);
E.g.visible = true;
} } }),
pCard("“Accursed be thou, daughter of Egypt!”", function () { return ndP(6, "It was at that moment that the recluse caught sight", 1) + ndP(6, "\"Accursed be thou, daughter of Egypt!", 1) + ndP(6, "La Esmeralda turned pale and descended", 1) + ndP(6, "\"Descend! descend! Thief of Egypt!", 1) + ndP(6, "The hour had arrived for removing Quasimodo.", 1); }, "End of the story of the cake", { done: function () { ndHide(["esme", "quasi"]); } }),
pCard("End of the story of the cake", function () { return ndP(6, "Near the Grand Pont, Mahiette", 1) + ndP(6, "\"By the way, Eustache! what did you do with that cake?\"", 1) + ndP(6, "\"Mother,\" said the child, \"while you were talking", 1) + ndP(6, "\"'Tis a terrible child!\"", 1); }, "End of the sixth book")
];
ND_CH.push({ t: "The Deaf Judge; the Rat-Hole; the Pillory", book: 6, when: "The seventh of January, 1482: the audience hall of the Châtelet in the morning; the Place de Grève at ten.",
words: "“The provost addressed him with severity, ‘What have you done that you have been brought hither, knave?’”",
intro: "Two deaf men, the little shoe, a tear for a drop of water",
start: { room: "x_ndcourt", from: "nd:chatelet", at: { x: 0, z: 3.4, ry: 0 } },
setup: function (f) { return __ZC(467, 344, this, arguments, new.target); },
end: function () { ndHide(["florian", "provost", "jehan", "quasi", "mahiette", "oudarde", "gervaise", "eustache", "esme", "frollo"]); },
steps: ND_B6 });
function poeHallPallas() { return __ZC(467, 345, this, arguments, new.target); }
function poeHallRaven() { return __ZC(467, 346, this, arguments, new.target); }
var POE_OPEN = true;
var POEC = { door: null, on: null };
function poeHallSpot() {
if (typeof hallRealm !== "function" || typeof blockOrigin !== "function")
return null;
var r = hallRealm();
if (!r || !r.grid || (store.here || 0) !== r.id)
return null;
var h = blockOrigin(r.grid.bx, r.grid.bz), n = 1;
try {
n = hubDoorList().filter(function (d) { return d.to !== "hall"; }).length || 1;
}
catch (e) { }
var gaps = [];
for (var i = 0; i < n; i++) {
var a = ((i + 0.5) / n) * Math.PI * 2;
gaps.push({ a: a, d: Math.abs(Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2))) });
}
gaps.sort(function (p, q) { return p.d - q.d; });
if (gaps[8]) {
var a8 = gaps[8].a;
return { x: h.x + Math.cos(a8) * 29.5, z: h.z + Math.sin(a8) * 29.5, a: a8 };
}
var a4 = (gaps[4] || gaps[0]).a + 4 / 29.5;
return { x: h.x + Math.cos(a4) * 29.5, z: h.z + Math.sin(a4) * 29.5, a: a4 };
}
function poeCityTick(dt) {
if (typeof WLD === "undefined")
return;
var show = !WLD.on && !store.inside && walkMode && (POE_OPEN || poeKeeper()), s = show ? poeHallSpot() : null;
if (!s) {
if (POEC.door)
POEC.door.visible = false;
if (POEC.on) {
POEC.on = null;
worldPromptCity(null);
}
return;
}
if (!POEC.door) {
var g = new THREE.Group(), ebony = new THREE.MeshStandardMaterial({ color: 0x0A0A0C, roughness: 0.35, metalness: 0.1 }), stone = new THREE.MeshLambertMaterial({ color: 0x4A4844 }), iron = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.5, metalness: 0.8 });
wBox(0.9, 5.4, 0.9, stone, -2, 2.7, 0, g);
wBox(0.9, 5.4, 0.9, stone, 2, 2.7, 0, g);
var sh = new THREE.Shape();
sh.moveTo(-2.45, 5.4);
sh.quadraticCurveTo(-2.45, 7.6, 0, 8.4);
sh.quadraticCurveTo(2.45, 7.6, 2.45, 5.4);
sh.lineTo(1.55, 5.4);
sh.quadraticCurveTo(1.55, 6.9, 0, 7.4);
sh.quadraticCurveTo(-1.55, 6.9, -1.55, 5.4);
sh.lineTo(-2.45, 5.4);
var ar = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.9, bevelEnabled: false }), stone);
ar.position.z = -0.45;
g.add(ar);
wBox(3.1, 5.4, 0.22, ebony, 0, 2.7, 0, g);
for (var i = 0; i < 12; i++)
wSph(0.05, iron, -1.2 + (i % 4) * 0.8, 0.8 + ((i / 4) | 0) * 1.6, 0.13, g, 6);
wSph(0.08, new THREE.MeshStandardMaterial({ color: 0xC8A050, roughness: 0.3, metalness: 0.9 }), 1.1, 2.6, 0.16, g, 8);
var bust = new THREE.Group();
bust.position.set(0, 8.32, 0.05);
bust.scale.setScalar(1.8);
g.add(bust);
var bm = new THREE.MeshStandardMaterial({ color: 0xE8E4DA, roughness: 0.45 }), bm2 = new THREE.MeshStandardMaterial({ color: 0xD0CCC0, roughness: 0.6 });
wBox(1.3, 0.3, 1.0, stone, 0, 0.15, 0, bust);
wBox(1.0, 0.18, 0.8, bm2, 0, 0.39, 0, bust);
var pal = poeHallPallas();
if (pal) {
pal.position.y = 0.48;
bust.add(pal);
}
else {
var sh2 = wSph(0.55, bm, 0, 0.78, 0, bust, 18);
sh2.scale.set(1.25, 0.62, 0.7);
var hd = wSph(0.3, bm, 0, 1.5, 0.04, bust, 18);
hd.scale.set(0.88, 1.08, 0.98);
var hm = wSph(0.33, bm2, 0, 1.62, -0.02, bust, 18);
hm.scale.set(0.95, 0.8, 1.08);
}
var rv = new THREE.Group();
rv.position.set(0, 1.62, 0.1);
if (POEC.palGeo)
rv.position.set(0, 1.62, 0.0);
bust.add(rv);
var rm = new THREE.MeshStandardMaterial({ color: 0x0A0A10, roughness: 0.38, metalness: 0.15 }), S = 3.2;
var sculpt = poeHallRaven();
if (sculpt) {
sculpt.scale.setScalar(2.6);
sculpt.position.y = 0.12;
rv.add(sculpt);
}
else if (typeof poeRaven === "function") {
var rr = poeRaven(rv, 0, 0.22, 0, 0, S);
rr.rotation.x = -0.08;
}
POEC.raven = rv;
var sg = wSign(["POE'S DREAM-LAND", "the Raven · Usher · the Tell-Tale Heart · the Red Death · press E"], 4.2, 0.8, "#0A0A0E", "#C8C0A8");
sg.position.set(0, 15.4, 0.5);
g.add(sg);
var gl = wGlow(0x8A9AC8, 5, 0.18);
gl.position.set(0, 3, 0.4);
g.add(gl);
scene.add(g);
POEC.door = g;
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
POEC.door.visible = true;
POEC.door.position.set(s.x, 0, s.z);
POEC.door.rotation.y = -s.a - Math.PI / 2;
if (POEC.raven)
POEC.raven.rotation.y = Math.sin(performance.now() / 2600) * 0.5;
if (d < 3.6) {
if (POEC.on !== "door") {
POEC.on = "door";
worldPromptCity("🪶 <b>" + POE_NAME + "</b> · <b>press E</b> to open the ebony door", function () { worldPromptCity(null); POEC.on = null; poeGo({ from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } }); });
}
}
else if (POEC.on === "door") {
POEC.on = null;
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
poeCityTick(dt);
}
catch (e) {
if (!POE.e1) {
POE.e1 = 1;
if (window.console)
console.warn("[poe] city", e);
}
} };
})();
(function () {
if (typeof ktPane !== "function")
return;
var f = ktPane;
ktPane = function (pane) {
var r = f.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-poe]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-poe", "1");
b.textContent = "🪶 " + POE_NAME;
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } poeGo({}); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
})();
setTimeout(function () {
try {
var m = /[?&]kpoe=([a-z0-9-]+)/.exec(location.search);
if (!m)
return;
var where = m[1];
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!poeKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
poeGo(POE_KEEPS[where] ? { tale: where } : {});
if (where === "catacombs" || where === "flamel")
setTimeout(function () { try {
if (where === "flamel")
poeCS().flamel = Math.max(1, poeCS().flamel || 0);
poeEnterRoom(where === "flamel" ? "x_flamel" : "x_cat", "out:x_cat");
}
catch (e) { } }, 2500);
if (where === "paris")
setTimeout(function () { try {
var E = POE_PAR_MON.enfer;
poeEnterRoom("x_paris", "par:gate", { x: E[0], z: E[1] + 30, ry: 0 });
}
catch (e) { } }, 2500);
try {
var q = new URLSearchParams(location.search);
q.delete("kpoe");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === POE_KEY; })) {
DGR_WORLDS.push([POE_KEY, POE_NAME + " (Safe: the tales are terrible, but nothing there can hurt you)", 0, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[POE_KEY] = { id: POE_KEY, name: POE_NAME, def: 0, group: "hidden" };
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === POE_KEY; }))
try {
DK_PLACES.push([POE_KEY, POE_NAME]);
}
catch (e) { }
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.poebook;
if (d && Array.isArray(d.keeps) && d.keeps.length) {
h += bkpHead("Keepsakes from " + POE_NAME) + d.keeps.map(function (k) { return bkpRow(esc(k.i + " " + k.n), ""); }).join("");
}
}
catch (e) { }
return h;
};
})();
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list[POE_HIDDEN.key])
return;
var hx = -18, hz = -112;
var d = { k: POE_HIDDEN.key, name: POE_HIDDEN.name, icon: POE_HIDDEN.icon, at: POE_KEY, seed: [hx, hz], spot: "stone", mark: 0x8A9AC8,
what: "a gravestone with no name on it, behind the throne where no road goes", look: "Every other stone here has a name worn into it. This one is blank, and the earth before it has been turned, not long ago.", act: "Lift the stone",
open: "A quill pen, cut from a raven's feather, black and still sharp; its nib is stained with ink that has never dried.",
tale: "Poe wrote The Raven in 1844 and 1845, in New York, and was paid about nine dollars for it. It made him famous in a month; it never made him rich. They say in Dream-Land that he left his pen here, by the throne of NIGHT, when he went on.",
rumour: "Behind the black throne, where none of the seven roads go, there is a grave without a name. The Eidolon looks the other way." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list[d.k] = d;
RA.order.push(d.k);
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === POE_HIDDEN.key) {
var key = dd.k + "@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots[dd.k];
if (c && c.key === key)
return c;
return (RA.spots[dd.k] = { x: hx, z: hz, y: poeGround(hx, hz), key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL[POE_HIDDEN.key] = function () {
var g = new THREE.Group(), fm = new THREE.MeshStandardMaterial({ color: 0x08080C, roughness: 0.4 }), sm = new THREE.MeshStandardMaterial({ color: 0xC8C0A8, roughness: 0.3, metalness: 0.4 });
var vane = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.008, 0.32), fm);
vane.position.y = 0.2;
vane.rotation.x = 0.3;
g.add(vane);
var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.004, 0.36, 6), sm);
sh.rotation.x = Math.PI / 2 + 0.3;
sh.position.y = 0.2;
g.add(sh);
var glow = wGlow(0x8A9AC8, 0.5, 0.4);
glow.position.y = 0.2;
g.add(glow);
return { g: g, h: 0.3, anim: function (dt) { g.rotation.y += dt * 0.4; } };
};
if (typeof RA_POW !== "undefined")
RA_POW[POE_HIDDEN.key] = { n: "Nevermore", col: 0x8A9AC8, cd: 45, pas: { speed: 1.04, regen: 1.3 },
act: [{ aoe: 16, dmg: 80, knock: 4 }, { aoe: 16, slow: 8 }],
pasT: "The pen that wrote the Raven: you move 4% faster and heal steadily, as one whom no terror in the tales can touch any more.",
actT: "Nevermore: a dark wind of black feathers bursts out round you, striking every foe within 16 m for 80 and throwing them back; then they stand frozen in dread, slowed, for 8 seconds (dreamers too, where dreamers may fight)." };
})();
function poeTest() { return { POE: POE, go: poeGo, room: poeEnterRoom, rooms: POE_RX, at: POE_AT, land: poeLand, ground: poeGround, block: poeBlock, zone: poeZoneAt, open: poeOpen }; }
var ND_PHOEBUS_WALK = [[845.5, -1894.5], [805.5, -1914.5], [805.5, -1920.5], [802.5, -1925.5], [802.5, -1946.5], [810.5, -1955.5], [810.5, -1970.5], [807.5, -1974.5], [797.5, -1972.5], [797.5, -1969.5], [751.5, -1973.5], [751.5, -1996.5], [740.5, -2045.5], [728.5, -2070.5], [732.5, -2109.5], [701.5, -2133.5], [688.5, -2133.5], [687.5, -2128.5], [682.5, -2121.5], [669.5, -2095.5], [629.5, -2096.5], [575.5, -2052.5], [575.5, -2000.5], [592.5, -1978.5], [590.5, -1962.5]];
ND_AT.michel = [590.5, -1960];
function ndCourtCast() { return __ZC(467, 347, this, arguments, new.target); }
var ND_B7 = [
pRead(),
pCard("The danger of confiding one's secret to a goat", function () { return ndP(7, "The first of March had arrived.", 1) + ndP(7, "Opposite the lofty cathedral, reddened by the setting sun", 1) + ndP(7, "The balcony on which these young girls stood", 1); }, "Among the young ladies"),
pTalk("Fleur-de-Lys de Gondelaurier", "The daughter of the house, at the great tapestry with her companions, her betrothed beside her. Speak to her", ["Fleur-de-Lys", function () { return ndP(7, "Beside her stood a young man of imposing mien", 1) + ndP(7, "They were chatting together in that whispering tone", 1) + ndP(7, "\"Fair cousin,\" he said, approaching Fleur-de-Lys", 1); }, "The captain"]),
pSpot("The balcony, over the parvis", "“Look! look!” The girls run to the balcony: something is happening on the parvis below", null, { hooks: { ndBalcony: function () { poeCard("The parvis", ndP(7, "\"Look! look!\" exclaimed her lively companions", 1)); } } }),
pCard("The man on the tower", function () { return ndP(7, "\"Godmother!\" exclaimed Berangere", 1) + ndP(7, "All the young girls raised their eyes.", 1); }, "“Call her up”"),
pCard("The gypsy in the Gondelaurier house", function () { return ndP(7, "The young girl looked at him again, then she blushed", 1) + ndP(7, "A moment later, the tapestry portiere was raised", 1) + ndP(7, "Hence the welcome accorded to the gypsy was marvellously glacial.", 1); }, "The goat", { on: function () { var E = POE.cast.esme; if (E) {
poeMove(E, "x_ndgondel", 4.2, 0.6, -Math.PI / 2);
E.g.visible = true;
} ndGoatAt(POE_RX.x_ndgondel, 3.4, 1.4, -1.2); } }),
pQuiz("Djali's letters", "<p>Little Bérangère has coaxed the goat into a corner with a marchpane cake and emptied the little bag at its neck: wooden letters, each on its own small block. The goat, as if it had been taught, pushes some of them into a row with its hoof. Which word does it spell?</p>", [["PHOEBUS", "", true], ["DJALI", "", false, "The word is a name, and the captain hears it."], ["ESMERALDA", "", false, "Not her name: his."]]),
pCard("“She is a magician!”", function () { return ndP(7, "The gypsy beheld the piece of folly which the goat had committed.", 1) + ndP(7, "\"You have a marvellous memory!\" said Fleur-de-Lys", 1) + ndP(7, "In a twinkling, La Esmeralda gathered up the unlucky letters", 1); }, "A priest and a philosopher", { done: function () { ndHide(["esme"]); var G = POE.goat_x_ndgondel; if (G)
G.visible = false; } }),
pCard("A priest and a philosopher are two different things", function () { return ndP(7, "Every day, an hour before sunset, the archdeacon ascended", 1) + ndP(7, "From the moment when the archdeacon caught sight of this stranger", 1) + ndP(7, "Then he plunged down beneath the tortuous vault", 1); }, "Into the church", { done: function () { poeEnterRoom("x_nd", "nd:parvis", { x: -40, z: 4, ry: -Math.PI / 2 }); poeNdTime("night"); } }),
pTalk("Pierre Gringoire", "In the dark church, the archdeacon has Gringoire against a pillar: the juggler with a chair in his teeth was the poet. Listen", ["The priest and the poet", function () { return ndP(7, "Come now, Master Pierre. You are to explain many things", 1) + ndP(7, "\"Messire,\" said Gringoire, piteously", 1) + ndP(7, "\"What would you have a man do, Dom Claude", 1); }, "“Swear it”"], { room: "x_nd" }),
pQuiz("“Swear to me, by the body of your mother”", "<p>Dom Claude, crimson then pale, makes the poet swear to one thing before he lets him go. What?</p>", [["That he has never touched her", "", true], ["That he will leave Paris", "", false, "Something about the gypsy girl and her husband."], ["That he will never write again", "", false, "It is about la Esmeralda."]]),
pCard("The bells", function () { return ndP(7, "After the morning in the pillory, the neighbors of Notre-Dame", 1) + ndP(7, "It chanced that, in the year of grace 1482, Annunciation Day", 1) + ndP(7, "All at once, on letting his glance fall between the large slate scales", 1); }, "Ananke", { on: function () { ndPeal(10, 1); }, done: function () { ndHide(["gringoire"]); } }),
pSpot("The stair of the north tower", "Saturday the 29th of March: Jehan, out of money, climbs to his brother's secret cell. Go up after him", null, { done: function () { setTimeout(function () { poeEnterRoom("x_ndcell", "nd:stair"); poeNdTime("day"); }, window.POE_FAST ? 10 : 300); } }),
pCard("Ananke", function () { return ndP(7, "Something very similar to Faust's cell presented itself", 1) + ndP(7, "Nevertheless, the cell was not deserted.", 1) + ndP(7, "In fact, there was no fire in the furnace", 1); }, "The walls", { on: function () { var F = POE.cast.frollo; if (F) {
poeMove(F, "x_ndcell", 1.0, -1.6, Math.PI);
F.g.visible = true;
} } }),
pSpot("The word on the wall", "Among all the writing on the walls one word is cut deeper than the rest. Read it", null, { hooks: { ndWordCell: function () { poeCard("ΑΝΑΓΚΗ", ndP(7, "Other inscriptions were written, in accordance with the fashion", 1) + ndP(0, "A few years ago, while visiting", 1)); } } }),
pTalk("Jehan Frollo du Moulin", "The scholar has come in, all innocence. He wants money. Hear the brothers", ["Two brothers", function () { return ndP(7, "\"Brother,\" replied the scholar, making an effort", 1) + ndP(7, "\"Stay, dear Brother Claude, I should not come to you", 1) + ndP(7, "\"Only a poor little parisis, brother,\" continued the suppliant", 1) + ndP(7, "\"Well,\" he exclaimed, \"to the devil then!", 1); }, "Someone at the door: hide"], { room: "x_ndcell" }),
pCard("The two men clothed in black", function () { return ndP(7, "The personage who entered wore a black gown", 1) + ndP(7, "\"That gypsy girl you know, who comes every day to dance", 1); }, "The fly", { on: function () { var C = POE.cast.charmolue; if (C) {
poeMove(C, "x_ndcell", 2.0, 0.8, Math.PI * 1.2);
C.g.visible = true;
} var J = POE.cast.jehan; if (J)
poeHide(J); } }),
pSpot("The spider's web at the window", "The archdeacon is staring at the window. Look where he looks", null, { hooks: { ndSpider: function () { poeCard("“Let fate take its course!”", ndP(7, "\"Oh, yes!\" continued the priest", 1) + ndP(7, "The archdeacon did not hear him. \"Oh, madman!\"", 1) + ndP(7, "\"Master Jacques,\" he cried, \"let fate take its course!\"", 1)); } } }),
pCard("The effect which seven oaths in the open air can produce", function () { return ndP(7, "\"Te Deum Laudamus!\" exclaimed Master Jehan", 1) + ndP(7, "This name of Phoebus reached the ears of the archdeacon", 1) + ndP(7, "The archdeacon followed them, gloomy and haggard.", 1); }, "Follow them", { done: function () { ndHide(["charmolue", "frollo"]); var P = ND_PHOEBUS_WALK[0]; ndGoPar(P[0] - 6, P[1] + 4, Math.PI / 2); poeNdTime("night"); var Ph = POE.cast.phoebus; if (Ph) {
poeMove(Ph, "x_paris", P[0], P[1], Math.PI);
Ph.g.visible = true;
} } }),
pShadow("Wrap yourself in your mantle and follow the captain through the night, as the archdeacon did: far enough not to be seen, never losing him", "phoebus", ND_PHOEBUS_WALK, { whoName: "Captain Phoebus de Châteaupers", sp: 2.0, far: 32, near: 4, lost: "He went by the Palais, toward the Pont Saint-Michel.", close: "Too close: he will turn and see you. Keep to the shadow of the houses." }),
pCard("The mysterious monk", function () { return ndP(7, "The captain was brave, and would have cared very little", 1) + ndP(7, "\"Captain,\" pursued the man", 1) + ndP(7, "\"One condition,\" said the man.", 1) + ndP(7, "The door opened instantly, and allowed the new-corners", 1); }, "Up la Falourdel's ladder", { done: function () { poeEnterRoom("x_ndfalour", "nd:michel"); } }),
pSpot("The closet door", "The old woman shows the captain's silent companion into a dark hole behind a door of rotten cask staves. Look through the cracks", null, { hooks: { ndCloset: function () { poeCard("The utility of windows which open on the river", ndP(7, "Claude Frollo (for we presume that the reader", 1) + ndP(7, "When he recovered himself, Phoebus and Esmeralda", 1)); } } }),
pCard("The captain and the gypsy", function () { return ndP(7, "\"Phoebus,\" continued the Bohemian, gently releasing her waist", 1) + ndP(7, "\"Do I love thee, angel of my life!\" exclaimed the captain", 1) + ndP(7, "But Dom Claude saw everything.", 1) + ndP(7, "All at once, above Phoebus's head she beheld another head", 1); }, "The window", { on: function () { var E = POE.cast.esme, Ph = POE.cast.phoebus; if (E) {
poeMove(E, "x_ndfalour", 1.2, -0.2, Math.PI);
E.g.visible = true;
} if (Ph) {
poeMove(Ph, "x_ndfalour", 0.6, -0.4, Math.PI * 0.8);
Ph.g.visible = true;
} } }),
pSpot("The window, over the river", "The priest has gone: the window at the back of the room, open on the river", null, { hooks: { ndRiverWin: function () { poeCard("The window", ndP(7, "At the moment when her eyes closed", 1) + ndP(7, "When she recovered her senses, she was surrounded", 1) + ndP(7, "\"'Tis a sorceress who has stabbed a captain.\"", 1)); } }, done: function () { ndHide(["esme", "phoebus"]); } })
];
ND_CH.push({ t: "Phoebus", book: 7, when: "March 1482: the Gondelaurier house on the parvis; Notre-Dame by night; the archdeacon's cell; the streets to the Pont Saint-Michel.",
words: "“PHOEBUS.”",
intro: "The balcony, the goat's letters, Ananke, the captain followed by night",
start: { room: "x_ndgondel", from: "nd:parvis", at: { x: -3.6, z: 2.6, ry: -Math.PI * 0.6 } },
setup: function (f) { return __ZC(467, 348, this, arguments, new.target); },
end: function () { ndHide(["fleur", "aloise", "colombe", "berangere", "christeuil", "phoebus", "esme", "gringoire", "frollo", "jehan", "charmolue"]); },
steps: ND_B7 });
var ND_B8 = [
pRead(),
pCard("The crown changed into a dry leaf", function () { return ndP(8, "Gringoire and the entire Court of Miracles were suffering", 1) + ndP(8, "\"I know not, sir,\" replied the young man.", 1) + ndP(8, "The hall was vast and gloomy", 1); }, "The witness"),
pTalk("La Falourdel", "An old woman in the middle of the hall, her face almost hidden in her rags, is giving evidence. Hear her", ["The witness", function () { return ndQ(8, "\"Messeigneurs,\" said an old woman in the middle of the hall", 12); }, "The goat is brought in"], { room: "x_ndcourt" }),
pCard("The examination of the goat", function () { return ndP(8, "All eyes turned towards a small door", 1) + ndP(8, "\"If the gentlemen please, we will proceed to the examination of the goat.\"", 1) + ndP(8, "It was far worse when the procurator of the king", 1); }, "The accused", { on: function () { var E = POE.cast.esme; if (E) {
poeMove(E, "x_ndcourt", 0.6, -1.0, Math.PI);
E.g.visible = true;
} ndGoatAt(POE_RX.x_ndcourt, -0.8, -0.8, Math.PI); } }),
pQuiz("“Is Phoebus de Châteaupers dead?”", "<p>The accused, who has been as if dead, rises at that name and asks one thing only of the court.</p>", [["Whether the captain is dead", "", true], ["For her goat to be spared", "", false, "Not yet: she asks about him first."], ["For her mother", "", false, "She asks one thing only, about the captain."]]),
pCard("To the torture", function () { return ndP(8, "The unhappy girl quivered in every limb.", 1) + ndP(8, "After ascending and descending several steps", 1); }, "The chamber", { done: function () { poeEnterRoom("x_ndtorture", "nd:court"); var E = POE.cast.esme; if (E) {
poeMove(E, "x_ndtorture", 0.5, -0.8, Math.PI);
} var C = POE.cast.charmolue; if (C)
poeMove(C, "x_ndtorture", -1.6, 2.0, Math.PI * 0.9); } }),
pCard("Continuation of the crown which was changed into a dry leaf", function () { return ndP(8, "Meanwhile, la Esmeralda had remained standing.", 1) + ndP(8, "At the clanking of their frightful irons", 1) + poeNote("The boot is fastened. The wheel turns once. She cries out, and confesses whatever they wish."); }, "Back to the hall"),
pSpot("The low door", "They carry her back to the hall", null),
pCard("End of the crown which was turned into a dry leaf", function () { return ndP(8, "When she re-entered the audience hall", 1) + ndP(8, "They proceeded to take a vote without leaving the room.", 1) + ndP(8, "Then the unhappy girl heard the people moving", 1); }, "Lasciate ogni speranza", { done: function () { ndHide(["charmolue", "falourdel"]); var G = POE.goat_x_ndcourt; if (G)
G.visible = false; poeEnterRoom("x_ndpit", "nd:court"); var E = POE.cast.esme; if (E) {
poeMove(E, "x_ndpit", 0.4, -0.6, 0);
poeLay(E, true);
} } }),
pCard("Lasciate ogni speranza", function () { return ndP(8, "It was in a sloping cavity of this description", 1) + ndQ(8, "There she lay, lost in the shadows", 4) + ndP(8, "At the same time, the heavy lock creaked", 1); }, "The priest", { on: function () { var F = POE.cast.frollo; if (F) {
poeMove(F, "x_ndpit", -0.6, 1.0, Math.PI);
F.g.visible = true;
} } }),
pTalk("Dom Claude Frollo", "A man stands alone on the steps, in a cowl, with a lantern. Hear him", ["The priest in the pit", function () { return ndQ(8, "\"One day I was leaning on the window of my cell.", 8) + ndQ(8, "\"Oh!\" said the priest, \"young girl, have pity upon me!", 6) + ndQ(8, "\"Well, yes!\" he resumed at last", 3); }, "She refuses him"], { room: "x_ndpit" }),
pCard("The mother", function () { return ndP(8, "I do not believe that there is anything sweeter", 1) + ndP(8, "One May morning, when the sun was rising", 1) + ndQ(8, "\"Oh my daughter!\" she said", 6) + ndP(8, "There is one in particular whom I hate", 1); }, "Three human hearts", { done: function () { return __ZC(467, 349, this, arguments, new.target); } }),
pCard("Three human hearts differently constructed", function () { return ndP(8, "Phoebus was not dead, however.", 1) + ndQ(8, "Moreover, he hoped that the affair would not get noised abroad", 3) + ndP(8, "An immense crowd, which overflowed", 1); }, "To the balcony"),
pSpot("The balcony, over the parvis", "Midday. Go out on the balcony beside them: the whole parvis is full", null, { done: function () { var P = ndParvis(); if (P)
ndGoPar(P.x - POE_RX.x_paris.x - 12, P.z + 10, P.ry); } }),
pHold(function () { var P = ndParvis(); return P ? { x: P.x - 12, z: P.z + 10 } : null; }, 14, "Stand among the crowd on the parvis. Midday rings slowly from the clock of Notre-Dame", { r: 10, on: function () { ndPeal(12, 0); var E = POE.cast.esme, P = ndParvis(); if (E && P) {
poeMove(E, "x_paris", P.x - POE_RX.x_paris.x - 3, P.z, P.ry);
E.g.visible = true;
} } }),
pCard("The amende honorable", function () { return ndP(8, "In the fatal cart sat a young girl", 1) + ndP(8, "It halted before the central portal.", 1) + ndP(8, "Then the chanting in the church ceased.", 1) + ndP(8, "At the moment when he made his appearance", 1); }, "Up there, on the gallery of the kings"),
pLook("Look up at the gallery of the statues of the kings over the portals: a strange spectator has been there since morning", function () { var p = poeNdTopAt(-67, 0); return ndPar(p[0], p[1]); }, 2.2, { cone: 0.3, on: function () { var Q = POE.cast.quasi; if (Q) {
var p = poeNdTopAt(-67.5, 1.5);
poeMove(Q, "x_paris", p[0], p[1], -Math.PI / 2);
Q.g.position.y = 17.4;
Q.y = 17.4;
Q.g.visible = true;
} } }),
pCard("“Sanctuary!”", function () { return ndP(8, "No one had yet observed in the gallery of the statues of the kings", 1) + ndP(8, "Quasimodo had halted beneath the great portal", 1) + ndP(8, "And then, it was touching to behold this protection", 1) + ndP(8, "Meanwhile, after several moments of triumph", 1); }, "End of the eighth book", { on: function () { ndPeal(6, 2); }, done: function () { ndHide(["quasi", "esme", "phoebus", "fleur"]); } })
];
ND_CH.push({ t: "The Trial; Sanctuary", book: 8, when: "A month later, 1482: the Grand' Chambre of the Palais; the torture chamber; the pit of the Tournelle; the Rat-Hole; the parvis at midday.",
words: "“Sanctuary! Sanctuary!”",
intro: "The goat on trial, the pit, the mother, the amende honorable",
start: { room: "x_ndcourt", from: "nd:palais", at: { x: 0, z: 3.4, ry: 0 } },
setup: function (f) { return __ZC(467, 350, this, arguments, new.target); },
end: function () { ndHide(["president", "charmolue", "falourdel", "gringoire", "esme", "frollo", "phoebus", "fleur", "quasi"]); POE.ndCourtExit = null; },
steps: ND_B8 });
var ND_B9 = [
pRead(),
pCard("Delirium", function () { return ndP(9, "Claude Frollo was no longer in Notre-Dame", 1) + ndQ(9, "Then frightful ideas thronged his mind.", 3) + ndQ(9, "He sped thus across the fields until evening.", 2); }, "Night, in the church"),
pCard("The spectre on the stair", function () { return ndP(9, "In the church he found the gloom and silence of a cavern.", 1) + ndP(9, "All at once, he felt a freshness on his face", 1) + ndP(9, "She came towards him, slowly, with her gaze fixed on the sky.", 1) + ndP(9, "When she had passed on, he began to descend", 1); }, "Hunchbacked, one-eyed, lame"),
pCard("Sanctuary", function () { return ndQ(9, "Every city during the Middle Ages", 3) + ndP(9, "At Notre-Dame it was a tiny cell situated on the roof", 1); }, "Up to her cell"),
pSpot("The stair of the north tower", "Climb to the roofs of the church: the little cell on the roof of the aisle, under the flying buttresses", null, { done: function () { setTimeout(function () { poeEnterRoom("x_ndrefuge", "nd:stair"); poeNdTime("day"); }, window.POE_FAST ? 10 : 300); } }),
pCard("The cell", function () { return ndP(9, "It was here that Quasimodo had deposited la Esmeralda", 1) + ndP(9, "Then she examined her cell.", 1) + ndP(9, "On the following morning, she perceived on awaking", 1); }, "He is at the door", { on: function () { var E = POE.cast.esme; if (E) {
poeMove(E, "x_ndrefuge", 1.2, -0.6, Math.PI);
E.g.visible = true;
} var Q = POE.cast.quasi; if (Q) {
poeMove(Q, "x_ndrefuge", -1.9, 0.4, -Math.PI / 2);
Q.g.visible = true;
} ndGoatAt(POE_RX.x_ndrefuge, 1.4, 0.4, 0.4); } }),
pTalk("Quasimodo", "He stands at the door of the cell, which he never enters, a basket of food and a mattress in his arms. Speak to him", ["Deaf", function () { return __ZC(467, 351, this, arguments, new.target); }, "The whistle"]),
pFind("whistle", function () { var R = POE_RX.x_ndrefuge; return R ? { x: R.x - 1.5, z: 0.2, area: "room:x_ndrefuge", y: 0.02 } : null; }, "Quasimodo's whistle", "He has laid it on the floor by the door: pick it up and keep it", {}),
pCard("Day followed day", function () { return ndP(9, "Day followed day.", 1) + ndP(9, "And then, Phoebus was alive; she was sure of it", 1) + ndP(9, "On another occasion he presented himself at the door of the cell", 1) + ndP(9, "At last, one morning, la Esmeralda had advanced", 1) + ndP(9, "Quasimodo leaned over the Place, and saw", 1); }, "Earthenware and crystal", { done: function () { var Q = POE.cast.quasi; if (Q)
poeHide(Q); } }),
pSpot("The two vases on the ledge", "One morning, on waking, she finds two vases of flowers on her window ledge. Look at them", null, { hooks: { ndVases: function () { poeCard("Two vases", ndP(9, "One morning, on awaking, she saw on her window two vases", 1)); } } }),
pQuiz("Earthenware and crystal", "<p>One vase is of glass, very beautiful and brilliant but cracked: the water has run out and its flowers are faded. The other is a coarse jug of earthenware; it has kept its water, and its flowers are fresh and bright. Which nosegay does la Esmeralda take, to wear all day long on her breast?</p>", [["The faded flowers from the cracked crystal vase", "", true], ["The fresh flowers from the earthenware jug", "", false, "Think of whom she still loves, and whom she cannot look at."], ["Neither", "", false, "She takes one, and wears it all day."]]),
pCard("That day she did not hear the voice", function () { return ndP(9, "I know not whether it was done intentionally", 1) + ndP(9, "That day she did not hear the voice singing in the tower.", 1) + ndP(9, "She had entirely ceased to see or hear Quasimodo.", 1) + ndP(9, "In the meantime, public minor had informed the archdeacon", 1) + ndP(9, "He passed whole days with his face close to the panes", 1); }, "The key to the red door", { on: function () { poeNdTime("night"); } }),
pCard("The key to the red door", function () { return ndP(9, "That night, la Esmeralda had fallen asleep in her cell", 1) + poeNote("A hand in the dark. A man's breath. The priest, with the key of the red door to the roofs, has come in. She struggles; she crawls across the floor."); }, "The whistle!", { on: function () { var F = POE.cast.frollo; if (F) {
poeMove(F, "x_ndrefuge", -0.6, 0.2, Math.PI * 0.5);
F.g.visible = true;
} } }),
pDo("Her hand finds something cold on the floor: Quasimodo's whistle. Blow it (press E at the door of the cell)", { spot: "The door, to the leads of the roof" }, "ndDoorBlow", function (a, f, done) { poeSfx("chime", { f: 880 }); done(); }, { on: function () { var R = POE_RX.x_ndrefuge; poeSpotOnce("nd:whistle", R.x - 1.6, 0.2, 1.6, "Quasimodo's whistle", "blow it", function () { poeHook("ndDoorBlow"); }, 0); }, at: { spot: "Quasimodo's whistle", room: "x_ndrefuge" } }),
pCard("“Not with his face!”", function () { return ndP(9, "All at once, as she struggled and crawled on the floor", 1) + ndP(9, "Almost at the same instant he felt himself raised by a vigorous arm.", 1) + ndP(9, "The priest fancied that he perceived the form of Quasimodo.", 1); }, "End of the ninth book", { on: function () { var Q = POE.cast.quasi; if (Q) {
poeMove(Q, "x_ndrefuge", -1.2, 0.2, Math.PI / 2);
Q.g.visible = true;
} }, done: function () { ndHide(["frollo", "quasi"]); } })
];
ND_CH.push({ t: "Sanctuary", book: 9, when: "The days after the amende honorable, spring 1482: Notre-Dame by night, and the little cell on the roof of the aisle.",
words: "“Look not at the face, young girl, look at the heart.”",
intro: "The spectre on the stair, the whistle, the two vases, the red door",
start: { room: "x_nd", from: "nd:parvis", at: { x: -40, z: 4, ry: -Math.PI / 2 } },
setup: function (f) { return __ZC(467, 352, this, arguments, new.target); },
end: function () { ndHide(["esme", "quasi", "frollo"]); var G = POE.goat_x_ndrefuge; if (G)
G.visible = false; },
steps: ND_B9 });
POE_LOOK.ndVases = ["Two vases", function () { return poeNote("One of crystal, cracked, its flowers faded; one of earthenware, its flowers fresh."); }];
POE_LOOK.ndRefugeWin = ["The roofs", function () { return poeNote("The leads of the aisle roof, the flying buttresses, and below, the parvis and the Gondelaurier house."); }];
POE_LOOK.ndBalcony = ["The balcony", function () { return poeNote("The parvis of Notre-Dame below, and the great front of the church."); }];
POE_LOOK.ndCloset = ["The closet", function () { return poeNote("A dark hole behind a door of rotten cask staves."); }];
POE_LOOK.ndRiverWin = ["The window", function () { return poeNote("The Seine, black and fast under the arches of the Pont Saint-Michel."); }];
POE_LOOK.ndCage = ["The cage", function () { return ndP(10, "\"For having made a great cage", 1) || poeNote("A cage of wood and iron, made for a man."); }];
POE_LOOK.ndPair = ["The two skeletons", function () { return ndP(11, "About eighteen months or two years after", 1) || ""; }];
POE_LOOK.ndTrap = ["The trap", function () { return poeNote("The trap of the oubliette, far overhead."); }];
function ndAssault(on) { return __ZC(467, 353, this, arguments, new.target); }
function ndAssaultSet(k, on) { return __ZC(467, 354, this, arguments, new.target); }
function ndTruands(on) { return __ZC(467, 355, this, arguments, new.target); }
var ND_B10 = [
pRead(),
pCard("Gringoire has many good ideas in succession", function () { return ndQ(10, "As soon as Pierre Gringoire had seen how this whole affair was turning", 4) + ndQ(10, "\"What is death, after all?\" pursued Gringoire", 3) + ndQ(10, "\"Until to-morrow,\" repeated Gringoire.", 3); }, "Long live mirth!"),
pCard("Long live mirth!", function () { return ndP(10, "The reader has probably not forgotten that a part of the Cour de Mirac", 1) + ndQ(10, "The room, circular in form, was very spacious", 4) + ndQ(10, "\"Hurrah! hurrah!\" he was shouting.", 4); }, "“To Notre-Dame!”"),
pTalk("Clopin Trouillefou", "The King of Thunes is handing out the arms by the fire: the Parliament is to take the gypsy out of sanctuary in three days, and the truands mean to fetch her first. Speak to him", ["Clopin Trouillefou", function () { return ndP(10, "\"Well! comrades!\" exclaimed the merchant", 1) + poeNote("“Brothers! to Notre-Dame! We will deliver our sister la Esmeralda. To-night!”"); }, "Up to Quasimodo's tower"]),
pCard("An awkward friend", function () { return ndP(10, "That night, Quasimodo did not sleep.", 1) + ndP(10, "All at once, while he was scrutinizing the great city", 1); }, "Climb the tower", { done: function () { poeNdTime("night"); ndAssault(true); ndTruands(false); setTimeout(function () { poeNdTopGo(); }, window.POE_FAST ? 10 : 200); } }),
pLook("From the top of the north tower, look down into the Rue du Parvis: a long dark column, moving without a light, pours toward the church", function () { var P = ndParvis(); return P ? { x: P.x - 30 * Math.cos(P.ry), z: P.z } : null; }, 2.2, { cone: 0.4, on: function () { ndTruands(true); } }),
pCard("The truands before the portal", function () { return ndP(10, "At the moment when Quasimodo was lost in conjectures", 1) + ndP(10, "Clopin Trouillefou, on arriving in front of the lofty portal", 1) + ndP(10, "\"To you, Louis de Beaumont, bishop of Paris", 1); }, "The beam"),
pSpot("The great beam on the gallery", "The masons' work on the south tower has left a long beam on the gallery between the towers. Push it over the balustrade", null, { on: function () { var R = POE_RX.x_paris, c = R.ndTop; poeSpotOnce("nd:beam", R.x + c.x + 1.5, c.z + 2.0, 2.2, "The great beam on the gallery", "heave it over", function () { }, ND_TOP.y); }, done: function () { ndAssaultSet("beam"); } }),
pCard("The spell of the beam", function () { return ndP(10, "Clopin was interrupted by a frightful uproar", 1) + ndP(10, "This piece of bravado produced its effects", 1) + ndP(10, "It was remarkable that all these stones fell one by one", 1); }, "The door is yielding"),
pOrder("The great door is yielding to the ram. Below the gallery are the lead roofs, and the masons' fuel. Do what Quasimodo did, in order", "The lead", "<p>Gutters of stone run from the gallery to the spouts that hang over the parvis.</p>", ["Carry the faggots and the bundles of laths onto the platform between the two spouts", "Pile the rolls of lead from the roofs upon them", "Set fire to the pile with your lantern", "When the lead runs, let it into the gutters of the spouts"]),
pCard("The streams of lead", function () { return ndP(10, "All at once, at the moment when they were grouping themselves round the ram", 1) + ndP(10, "All eyes were raised to the top of the church.", 1); }, "The ladder", { on: function () { ndAssaultSet("lead", true); ndAssaultSet("fire", true); }, done: function () { ndAssaultSet("lead", false); } }),
pCard("Jehan on the ladder", function () { return ndP(10, "In an instant the ladder was raised, and propped", 1) + ndP(10, "Before a second assailant could gain a foothold", 1) + ndP(10, "The shot sped. The feathered vireton", 1) + ndQ(10, "Quasimodo had grasped with his left hand the two arms of Jehan", 3) + ndQ(10, "He did not finish.", 2); }, "Meanwhile, at the Bastille", { done: function () { ndAssaultSet("fire", false); poeEnterRoom("x_ndbastille", "nd:bastille"); } }),
pCard("The retreat in which Monsieur Louis of France says his prayers", function () { return ndP(10, "He had come, that day, to sleep at the Bastille.", 1) + ndQ(10, "In this chamber, nothing was to be found", 4); }, "The king", { on: function () { ndTruands(false); POE.ndView = 0; poeNdFarDrop(); } }),
pSpot("The cage of wood and iron", "The king has had them show him the cage, beam by beam and nail by nail, and its price. Look at it", null, { hooks: { ndCage: function () { poeCard("The cage", ndP(10, "\"For having made a great cage of wood", 1) + ndP(10, "\"Fourteen years, sire! Fourteen years now!", 1)); } } }),
pTalk("King Louis XI", "The old man in the shabby grey doublet in the great arm-chair: Gossip Tourangeau, the King of France. Hear him", ["Louis XI", function () { return ndP(10, "\"These be dear beasts,\" said Louis XI.", 1) + ndQ(10, "\"Master Olivier, the princes who reign over great lordships", 3); }, "News from the City"], { room: "x_ndbastille" }),
pQuiz("The rising", "<p>A message: the populace has risen in the City. The king, delighted, thinks it is against the bailiff of the Palais, who has lands the king covets. Then Gringoire, dragged in, blurts out what the truands are really doing. What is it?</p>", [["Besieging Notre-Dame, to carry off the sorceress from the sanctuary", "", true], ["Burning the Palais", "", false, "They are at a church, not the Palais."], ["Marching on the Bastille", "", false, "They are on the island, before Notre-Dame."]]),
pCard("“Notre-Dame! They lay siege to our Lady”", function () { return ndP(10, "\"Yes, indeed!\" said the king in a low voice", 1) + ndP(10, "\"Here, Tristan! There are here with us", 1) + ndP(10, "Here, as though seized with a sudden idea", 1); }, "Châteaupers to the rescue", { done: function () { var P = ndParvis(); if (P)
ndGoPar(P.x - POE_RX.x_paris.x - 26, P.z + 8, P.ry); ndAssault(true); ndTruands(true); } }),
pHold(function () { var P = ndParvis(); return P ? { x: P.x - 26, z: P.z + 8 } : null; }, 14, "The king's men arrive at the gallop on the parvis: the torches, the pikes, the swords. Stand back against the houses and watch", { r: 10, on: function () { poeSfx("trumpet"); poeSfx("clang"); } }),
pCard("Châteaupers to the rescue!", function () { return ndP(10, "It was, in fact, the king's troops who had arrived.", 1) + ndP(10, "The battle was frightful.", 1) + ndP(10, "At length the vagabonds gave way.", 1) + ndP(10, "When Quasimodo, who had not ceased to fight for a moment", 1) + ndP(10, "When he entered the cell, he found it empty.", 1); }, "End of the tenth book", { done: function () { ndTruands(false); ndAssault(false); } })
];
ND_CH.push({ t: "The Assault on Notre-Dame", book: 10, when: "A night of May 1482: the Cour des Miracles; the towers of Notre-Dame; the Bastille Saint-Antoine.",
words: "“Brothers! to Notre-Dame!”",
intro: "The truands, the beam, the lead, the king in the Bastille",
start: { room: "x_paris", from: "nd:cour", at: { x: ND_AT.miraclesClear[0] - 6, z: ND_AT.miraclesClear[1] + 2, ry: 0 } },
setup: function (f) { return __ZC(467, 356, this, arguments, new.target); },
end: function () { ndHide(["clopin", "jehan", "louis", "olivier", "coppenole"]); ndTruands(false); ndAssault(false); POE.ndShow = {}; },
steps: ND_B10 });
var ND_B11 = [
pRead(),
pCard("The little shoe", function () { return ndP(11, "Soon the ever-increasing uproar around the edifice", 1) + ndQ(11, "But little by little the first vapors of terror", 3); }, "Two men at the door"),
pCard("The man in black", function () { return ndP(11, "She was obliged to content herself with this explanation.", 1) + ndQ(11, "They rapidly descended the staircase of the towers", 4) + ndQ(11, "The man with the lantern walked straight to the point of the Terrain.", 3); }, "The boat"),
pCard("On the river", function () { return ndP(11, "The boat made its way slowly towards the right shore.", 1) + ndP(11, "The tumult around Notre-Dame was, in fact, increasing.", 1) + ndP(11, "It is certain that Gringoire was enduring cruel perplexity.", 1) + ndP(11, "A shock informed them that the boat had reached the land at last.", 1); }, "Alone with him", { done: function () { var G = ND_AT.gibbet; ndGoPar(G[0] - 4, G[1] + 3, Math.PI * 0.75); poeNdTime("dawn"); var F = POE.cast.frollo; if (F) {
poeMove(F, "x_paris", G[0] - 2, G[1] + 1.6, -Math.PI * 0.5);
F.g.visible = true;
} var E = POE.cast.esme; if (E) {
poeMove(E, "x_paris", G[0] - 0.6, G[1] + 0.6, Math.PI * 0.5);
E.g.visible = true;
} } }),
pTalk("Dom Claude Frollo", "The Place de Grève, deserted, before dawn. He has led her to the foot of the gibbet. Hear him", ["The priest at the gibbet", function () { return ndP(11, "The poor gypsy shivered when she beheld herself alone", 1) + ndQ(11, "\"Listen!\" he said to her", 3) + ndP(11, "He extended his arm toward the City.", 1) + ndP(11, "\"You see that they are in pursuit of you", 1) + ndP(11, "She tore herself from his hands and fell at the foot of the gibbet", 1); }, "“Choose between us two”"]),
pCard("“Die, then!”", function () { return ndQ(11, "\"Well, yes, an assassin!\" he said", 3) + ndP(11, "He gave vent to a horrible cry", 1); }, "He drags her to the Rat-Hole", { done: function () { ndHide(["frollo"]); var E = POE.cast.esme, H = ND_AT.ratHole; if (E) {
poeMove(E, "x_paris", H[0] + 1.0, H[1] + 0.4, -Math.PI / 2);
} } }),
pSpot("The Rat-Hole", "He has thrust her against the grating of the Tour-Roland, and a lean hand from within holds her arm like iron. Go to the grating", null, { hooks: { ndRat: function () { poeCard("The recluse", ndP(11, "The young girl had recognized the spiteful recluse.", 1) + ndP(11, "She fell back against the wall exhausted", 1)); } } }),
pCard("“Give me back my little Agnes!”", function () { return ndP(11, "All at once the recluse exclaimed", 1) + ndQ(11, "\"Oh! yes!\" returned the recluse, \"you must have been born.", 4) + ndP(11, "\"Madam,\" she cried, clasping her hands", 1) + ndQ(11, "\"Give me back my little Agnes!\" pursued Gudule.", 4); }, "The amulet"),
pQuiz("The little bag", "<p>The gypsy has always worn at her neck a little bag of green silk, sewn with glass beads: her amulet, which was to help her find her parents. The recluse sees it. What is inside?</p>", [["A little shoe of pink silk, embroidered with silver: the mate of the recluse's", "", true], ["A lock of black hair", "", false, "Think of what the recluse has kissed for fifteen years."], ["A medal of the Virgin", "", false, "Think of Reims, and the cradle, and what was left."]]),
pCard("“My daughter!”", function () { return ndP(11, "All at once she rose, flung aside her long gray hair", 1) + ndP(11, "When her daughter was inside the cell", 1) + ndQ(11, "\"My daughter! my daughter!\" she said.", 5) + ndP(11, "\"Oh, my mother!\" said the young girl", 1); }, "Hide her!", { on: function () { var E = POE.cast.esme; if (E)
poeHide(E); } }),
pCard("The soldiers", function () { return ndP(11, "She set her daughter (down for she was still carrying her)", 1) + ndP(11, "\"Monseigneur!\" she cried, still pressed against the opening", 1) + ndP(11, "But he still hesitated for some time before mounting his horse.", 1) + ndP(11, "The poor child had remained all this time in her corner", 1); }, "They come back", { on: function () { poeSfx("trumpet"); var T = POE.cast.tristan, H = ND_AT.ratHole; if (T) {
poeMove(T, "x_paris", H[0] + 6, H[1] + 2, -Math.PI / 2);
T.g.visible = true;
} } }),
pCard("The mother", function () { return ndP(11, "In the meantime, although the sun had not yet risen", 1) + ndP(11, "The recluse had gone and seated herself by her daughter", 1) + ndQ(11, "\"Messeigneurs! messieurs the sergeants, one word.", 5) + ndP(11, "At that moment, the sun rose", 1) + ndP(11, "At that moment, the mother who was crouching on the pavement", 1); }, "In Notre-Dame", { done: function () { ndHide(["tristan", "esme"]); poeEnterRoom("x_ndrefuge", "nd:stair"); poeNdTime("day"); } }),
pCard("The beautiful creature clad in white", function () { return ndP(11, "When Quasimodo saw that the cell was empty", 1) + ndP(11, "At length he summoned up courage, advanced on tiptoe", 1) + ndP(11, "It appears to have been then, that, seeking at the bottom", 1) + ndP(11, "At the moment when his thought was thus fixed upon the priest", 1); }, "Follow the priest up the tower"),
pSpot("The door, to the leads of the roof", "The archdeacon is climbing the north tower with a slow, grave step. Follow him", null, { done: function () { setTimeout(function () { poeNdTopGo(); }, window.POE_FAST ? 10 : 300); var F = POE.cast.frollo; setTimeout(function () { var R = POE_RX.x_paris, c = R.ndTop; if (F && c) {
poeMove(F, "x_paris", c.x + 2.2, c.z - 1.2, Math.PI * 0.5);
F.g.position.y = ND_TOP.y;
F.y = ND_TOP.y;
F.g.visible = true;
} }, window.POE_FAST ? 30 : 1400); } }),
pCard("The top of the tower", function () { return ndP(11, "When he reached the summit of the tower", 1) + ndP(11, "Paris is a magnificent and charming spectacle", 1) + ndP(11, "Outside the balustrade of the tower, directly under the point", 1); }, "Where is he looking?"),
pLook("The archdeacon leans on the balustrade and stares at one point of the city, on the right bank. Look where he looks", function () { var G = ND_AT.gibbet; return ndPar(G[0], G[1]); }, 2.6, { cone: 0.12 }),
pCard("The Place de Grève", function () { return ndP(11, "Quasimodo was burning to ask him what he had done with the gypsy", 1) + ndP(11, "Here something took place which Quasimodo could not see very clearly.", 1) + poeNote("Then the priest laughed: one of those laughs which a man can give only when he is no longer human."); }, "Quasimodo", { on: function () { ndPeal(1, 0); } }),
pCard("The gutter", function () { return ndP(11, "In this terrible situation, the archdeacon said not a word", 1) + ndP(11, "The deaf man was leaning, with his elbows on the balustrade", 1) + ndQ(11, "He heard his cassock, which was caught on the spout", 3) + ndP(11, "Quasimodo wept.", 1) + ndQ(11, "At last the archdeacon, foaming with rage and despair", 3) + ndP(11, "Quasimodo watched him fall.", 1) + ndQ(11, "A fall from such a height is seldom perpendicular.", 3); }, "“There is all that I ever loved!”", { done: function () { ndHide(["frollo"]); } }),
pCard("“Oh! all that I have ever loved!”", function () { return ndP(11, "Then Quasimodo raised his eyes to the gypsy", 1) + ndP(11, "Towards evening on that day", 1) + ndP(11, "A great many rumors were in circulation", 1) + ndP(11, "This is why the archdeacon was not interred", 1); }, "The marriage of Phoebus"),
pCard("The marriage of Phoebus", function () { return ndP(11, "Louis XI. died a year later", 1) + ndP(11, "As for Pierre Gringoire, he succeeded in saving the goat", 1) + ndP(11, "Phoebus de Chateaupers also came to a tragic end. He married.", 1); }, "The marriage of Quasimodo", { done: function () { POE.ndView = 0; poeNdFarDrop(); var M = ND_AT.montfaucon; ndGoPar(M[0] - 2, M[1] + 24, Math.PI); poeNdTime("dusk"); } }),
pCard("Montfaucon", function () { return ndP(11, "We have just said that Quasimodo disappeared", 1) + ndP(11, "During the night which followed the execution", 1) + ndP(11, "Montfaucon was, as Sauval says", 1) + ndP(11, "Let the reader picture to himself, crowning a limestone hillock", 1) + ndP(11, "The mass of masonry which served as foundation", 1); }, "Go to the gibbet"),
pSpot("The door of the vault of Montfaucon", "Cross the field to the gibbet; the door in its foundation leads down into the vault", null, { done: function () { var R = POE_RX.x_ndvault; } }),
pSpot("The two skeletons", "At the back of the vault, among the bones, two skeletons, one holding the other in its embrace", null, { on: function () { var R = poeRoomGet("x_ndvault"); if (R.pair)
R.pair.visible = true; }, hooks: { ndPair: function () { poeCard("The marriage of Quasimodo", ndP(11, "As for the mysterious disappearance of Quasimodo", 1) + ndP(11, "About eighteen months or two years after", 1)); } } }),
pCard("ΑΝΑΓΚΗ", function () { return ndP(11, "About eighteen months or two years after", 1) + poeNote("<b>The end of Notre-Dame de Paris.</b> The word on the stair of the north tower will bring you back to 1841 whenever you wish; the Keeper's cards can open any of the eleven books again."); }, "Close the book")
];
ND_CH.push({ t: "The Little Shoe; the Marriage of Quasimodo", book: 11, when: "The same night and the dawn after, 1482: the river, the Place de Grève, the Rat-Hole, the towers of Notre-Dame; and Montfaucon.",
words: "“Oh! all that I have ever loved!”",
intro: "The flight by the river, the mother, the tower, Montfaucon",
start: { room: "x_ndrefuge", from: "nd:stair", at: { x: -1.4, z: 1.2, ry: -Math.PI * 0.5 } },
setup: function (f) { return __ZC(467, 357, this, arguments, new.target); },
end: function () { ndHide(["esme", "frollo", "tristan"]); POE.ndView = 0; poeNdFarDrop(); },
steps: ND_B11 });
var POE_SW = {};
(function () {
if (typeof POE_ENV === "undefined")
return;
[["land", 1.3, 0x8A90B4, 0.95, 0.0028, 0x2A2E3E], ["usher", 1.1, 0x7A80A0, 0.9, 0.0028, 0x262A34], ["red", 1.15, 0x9A7A82, 0.85, 0.003, 0x32222A], ["town", 1.35, 0x9A9AB4, 0.9, 0.0027, 0x2E3040]].forEach(function (q) {
var E = POE_ENV[q[0]];
if (!E)
return;
E.hemi = q[1];
E.hemiCol = q[2];
E.sun = q[3];
E.fogD = q[4];
E.fog = q[5];
E.low = q[5];
});
})();
function poeSwFree(x, z, r) { return __ZC(467, 358, this, arguments, new.target); }
function poeSwLamp(P, x, z) { return __ZC(467, 359, this, arguments, new.target); }
function poeSwBench(P, x, z, ry, stone) { return __ZC(467, 360, this, arguments, new.target); }
function poeSwCask(P, x, z, n) { return __ZC(467, 361, this, arguments, new.target); }
function poeSwCrates(P, x, z, ry) {
var y = poeLand(x, z), g = poeGrp(P, x, y, z, ry), m = poeS("oak", 0x8A7458);
poeBox(g, 0.7, 0.6, 0.6, m, 0, 0.3, 0);
poeBox(g, 0.6, 0.5, 0.55, m, 0.75, 0.25, 0.1);
poeBox(g, 0.55, 0.45, 0.5, m, 0.1, 0.83, 0.05);
poeSolid(x, z, 1.6, 0.9, y - 2, y + 1.1, ry);
}
function poeSwWell(P, x, z) { return __ZC(467, 362, this, arguments, new.target); }
function poeSwUrn(P, x, z) {
var y = poeLand(x, z), st = poeS("stone", 0xA8A298);
poeBox(P, 0.7, 0.8, 0.7, st, x, y + 0.4, z);
var u = poeSph(P, 0.42, st, x, y + 1.15, z, 10);
u.scale.y = 1.2;
poeCyl(P, 0.3, 0.22, 0.16, st, x, y + 1.65, z, 10);
poeSolid(x, z, 0.8, 0.8, y - 2, y + 2);
}
function poeSwWalkers(P, cx, cz, r0, r1, n, seed) { return __ZC(467, 363, this, arguments, new.target); }
function poeSwPlace(G, cx, cz, o, seed) { return __ZC(467, 364, this, arguments, new.target); }
function poeSweep(G) { return __ZC(467, 365, this, arguments, new.target); }
(function () {
if (typeof poeFolk !== "function")
return;
var pf = poeFolk;
poeFolk = function (G) { var r = pf.apply(this, arguments); try {
poeSweep(G);
}
catch (e) {
if (window.console)
console.warn("[poe] sweep", e);
} return r; };
})();
