/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
function swDefaults() { return { open: true, talk: true, welcome: true, notice: "", helpers: "", notes: "" }; }
function swMerge(c) {
var d = swDefaults();
if (!c || typeof c !== "object")
return d;
return { open: c.open !== false, talk: c.talk !== false, welcome: c.welcome !== false, notice: String(c.notice || "").slice(0, 300),
helpers: String(c.helpers || "").slice(0, 600), notes: String(c.notes || "").slice(0, 1200) };
}
var SW_KEY = "stillwater", SW_NAME = "Stillwater";
var SW = { base: -6200000, G: null, built: false, t: 0, lite: false, room: null, solids: [], floors: [], spots: [], talk: [], people: [], movers: [], fx: [], lights: [],
outside: null, veil: null, moving: false, pt: 0, vt: 0, zone: "green", trees: null, under: null, water: null, cfg: null, cfgAt: 0, hud: null, sit: null, boat: null, ducks: [], flies: [], e1: 0 };
var SW_IN_X = 40000;
var SW_BOUND = 520;
function swKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function swCfg() { if (!SW.cfg || Date.now() - SW.cfgAt > 20000) {
var c = (typeof cloudSetting === "function") ? cloudSetting("stillwater") : null;
SW.cfg = swMerge(c);
SW.cfgAt = Date.now();
} return SW.cfg; }
function swOpen() { return swCfg().open; }
var SW_GREEN = { x: 0, z: 10, r: 30 };
var SW_LAKE = { x: 0, z: -150, rx: 120, rz: 78, y: -1.1 };
var SW_AT = {
arrive: { x: 0, z: 122, name: "the Arrival Stone" },
green: { x: 0, z: 10, r: 34, name: "the village green" },
harbour: { x: 0, z: -66, r: 22, name: "the little harbour" },
lake: { x: 0, z: -150, r: 110, name: "the lake" },
lane: { x: 0, z: 150, r: 90, name: "Hobby Lane" },
hill: { x: -196, z: -36, r: 46, name: "Star Hill" },
stream: { x: 150, z: -70, r: 40, name: "the stream" },
allot: { x: 104, z: 40, r: 26, name: "the allotments" },
meadow: { x: -120, z: 80, r: 40, name: "the meadow" }
};
var SW_RING_R = 60, SW_LANE_R = 128;
var SW_HOUSES = [
["welcome", "The Welcome Cottage", "🏡", "ring", 196, [11, 8, 2], "plaster", "thatch", 0x3A6A4A, "where you arrive: the host, the picture map and the day's three things"],
["quiet", "The Quiet Room", "🌧️", "ring", 228, [8, 7, 1], "stone", "slate", 0x4A5A7A, "a room only for you (and your companion): rain on the window, a slow fish tank, the breathing light"],
["bakery", "The Bakery", "🍞", "ring", 262, [10, 8, 2], "plaster", "tile", 0x8A4A2A, "follow the picture recipe card and bake bread"],
["library", "The Library of Pictures", "📚", "ring", 298, [12, 9, 2], "stone", "slate", 0x2A4A6A, "picture books read aloud, and the sorting tables"],
["music", "The Music Shed", "🎵", "ring", 332, [8, 6, 1], "wood", "shingle", 0x6A3A5A, "instruments whose notes always sound well together"],
["barn", "The Animal Barn", "🐴", "ring", 28, [16, 11, 1], "barn", "shingle", 0x8A2A1A, "brush the pony, feed the hens, collect the eggs"],
["hall", "The Meeting Hall", "🧩", "ring", 62, [14, 10, 1], "stone", "slate", 0x5A3A1A, "small, slow games with a few others, never rushed"],
["garden", "The Garden Shed", "🌱", "ring", 96, [7, 6, 1], "wood", "shingle", 0x3A6A2A, "your own allotment plot: plant, water, wait a day, pick"],
["pottery", "The Pottery and Woodshop", "🏺", "ring", 130, [12, 9, 1], "stone", "tile", 0x7A4A2A, "the potter's wheel, the kiln and the whittling bench"],
["trains", "The Train Room", "🚂", "lane", 112, [16, 12, 1], "brick", "slate", 0x2A3A5A, "a great model railway to build, run and ride"],
["models", "The Model Workshop", "✈️", "lane", 128, [12, 9, 2], "brick", "tile", 0x3A4A6A, "kits of cars, shuttles, aeroplanes, ships and steam engines to build and paint"],
["paint", "The Paint Room", "🖌️", "lane", 144, [10, 8, 1], "plaster", "tile", 0x6A2A4A, "paint small figures up close under the magnifying lamp"],
["sculpt", "The Sculpting Studio", "🗿", "lane", 160, [12, 9, 1], "stone", "slate", 0x5A5A5A, "clay to shape, stone to carve, wood to whittle"],
["crafts", "The Arts and Crafts Studio", "🎨", "lane", 176, [14, 10, 2], "plaster", "thatch", 0x7A5A1A, "the easel, mosaics, stained glass, beads and the loom"],
["bricks", "The Brick Room", "🧱", "lane", 192, [14, 10, 1], "brick", "slate", 0xA82A2A, "building bricks with picture guides, up to giant builds of thousands of pieces"],
["logs", "The Log Cabin Table", "🪵", "lane", 208, [10, 8, 1], "log", "shingle", 0x5A3A1A, "notched logs that stack at the corners: cabins, forts, barns and bridges"],
["blocks", "The Block Corner", "🧸", "lane", 224, [10, 8, 1], "plaster", "tile", 0x2A5A8A, "wooden building blocks and slow, soft domino runs"],
["puzzles", "The Puzzle Parlour", "🧩", "lane", 240, [12, 9, 2], "stone", "slate", 0x4A2A5A, "famous paintings made into jigsaws, 12 to 2000 pieces"],
["knit", "The Knitting Nook", "🧶", "lane", 256, [9, 7, 1], "plaster", "thatch", 0x8A3A4A, "knitting, crochet and cross-stitch by the fire"],
["stars", "The Star Room", "🔭", "hill", 0, [12, 12, 1], "dome", "dome", 0x2A2A4A, "the telescope, the planets and the slow orrery"],
["nature", "The Nature Cabinet", "🦋", "stream", 0, [12, 9, 1], "stone", "slate", 0x3A5A3A, "cases of shells, beetles, rocks and feathers to sort, and the Butterfly House"],
["maps", "The Map Room", "🗺️", "harbour", 0, [13, 10, 2], "plaster", "slate", 0x2A4A5A, "the living model of the whole village, the map drawers, the globes, the telescope and the map desk"],
["home1", "Rose Cottage", "🌹", "at", [-24, 100], [10, 8, 2], "plaster", "thatch", 0x8A3A4A, "Mabel Rowe's cottage: a warm kitchen, a fire and a cat", "", [0, 100]],
["home2", "Willow Cottage", "🌿", "at", [24, 100], [10, 8, 2], "stone", "slate", 0x3A5A6A, "George Penn's cottage: clocks, books and a pot of tea", "", [0, 100]],
["home3", "Bramble Cottage", "🫐", "at", [-36, 78], [11, 8, 1], "brick", "tile", 0x4A6A3A, "the Ashby family's cottage: toys, a big table and jam", "", [0, 84]],
["home4", "Lark Cottage", "🐦", "at", [36, 78], [10, 8, 2], "plaster", "tile", 0x3A4A7A, "Nell Price's cottage: seed trays, birds at the window", "", [0, 84]],
["home5", "Ned's Cottage", "⛵", "at", [-74, -48], [9, 7, 1], "wood", "shingle", 0x2A4A6A, "Old Ned's cottage by the shore: ropes, a ship in a bottle, the stove", "", [-56, -66]]
];
var SW_HOUSE_AT = {};
function swHouseDef(k) { for (var i = 0; i < SW_HOUSES.length; i++)
if (SW_HOUSES[i][0] === k)
return SW_HOUSES[i]; return null; }
function swPlaceHouses() {
SW_HOUSES.forEach(function (H) {
var k = H[0], a = H[4] * Math.PI / 180, x, z, ry;
if (H[3] === "ring") {
x = SW_GREEN.x + Math.sin(a) * SW_RING_R;
z = SW_GREEN.z - Math.cos(a) * SW_RING_R;
ry = Math.atan2(SW_GREEN.x - x, SW_GREEN.z - z);
}
else if (H[3] === "lane") {
var c = { x: 0, z: 20 };
x = c.x + Math.sin(a) * SW_LANE_R;
z = c.z - Math.cos(a) * SW_LANE_R;
ry = Math.atan2(c.x - x, c.z - z);
}
else if (H[3] === "hill") {
x = SW_AT.hill.x;
z = SW_AT.hill.z;
ry = Math.atan2(SW_GREEN.x - x, SW_GREEN.z - z);
}
else if (H[3] === "stream") {
x = SW_AT.stream.x - 26;
z = SW_AT.stream.z + 30;
ry = Math.atan2(SW_GREEN.x - x, SW_GREEN.z - z);
}
else if (H[3] === "at") {
x = H[4][0];
z = H[4][1];
var F = H[11] || [SW_GREEN.x, SW_GREEN.z];
ry = Math.atan2(F[0] - x, F[1] - z);
}
else {
x = -40;
z = -58;
ry = Math.atan2(SW_GREEN.x - x, SW_GREEN.z - z);
}
SW_HOUSE_AT[k] = { x: x, z: z, ry: ry, w: H[5][0], d: H[5][1] };
});
}
swPlaceHouses();
var SW_FOLK = [
["host", "Mrs Elsie Hart", "f", "old", { top: 0x6A8A6A, bottom: 0x4A4A5A, hair: 0xE0E0E0, hairStyle: "bun" }, ["welcome", "welcome", "green"], "the host at the Welcome Cottage, a retired schoolteacher, patient and warm"],
["baker", "Tom Abel", "m", "mid", { top: 0xF0EEE6, bottom: 0x6A5A4A }, ["bakery", "bakery", "green"], "the baker, who is up early and likes to explain each step slowly"],
["librarian", "Miss Ada Lowe", "f", "young", { top: 0x5A4A7A, bottom: 0x3A3A4A, hair: 0x3A2A1A }, ["library", "library", "library"], "the librarian, who reads aloud in a soft voice and loves sorting things"],
["farmer", "Walt Green", "m", "old", { top: 0x5A6A3A, bottom: 0x3A3A2A, hat: "cap" }, ["barn", "garden", "barn"], "the farmer, who keeps the pony Clover, the hens and the allotments"],
["potter", "Rosa Bell", "f", "mid", { top: 0x8A6A4A, bottom: 0x4A3A2A, hair: 0x8A4A2A }, ["pottery", "pottery", "green"], "the potter and woodworker, calm and slow with her hands"],
["trainman", "Mr Henry Platt", "m", "old", { top: 0x2A3A5A, bottom: 0x2A2A3A, hat: "cap" }, ["trains", "trains", "trains"], "a retired railwayman who runs the Train Room and knows every engine"],
["modeller", "Sam Okoro", "m", "young", { top: 0x4A6A8A, bottom: 0x3A3A4A }, ["models", "models", "models"], "the model maker, who glues and paints kits of cars, shuttles and aeroplanes"],
["artist", "June Marsh", "f", "young", { top: 0xC8A0C0, bottom: 0x4A4A6A, hair: 0xC89A4A }, ["crafts", "crafts", "green"], "the painter and crafter, who never says a painting is wrong"],
["builder", "Ben Carter", "m", "mid", { top: 0xC83A2A, bottom: 0x3A3A4A }, ["bricks", "bricks", "bricks"], "the brick builder, who sorts every piece by colour before he starts"],
["stargazer", "Dr Clara Voss", "f", "old", { top: 0x2A2A4A, bottom: 0x2A2A3A, hair: 0xC8C8C8 }, ["stars", "stars", "stars"], "the stargazer who keeps the telescope and the orrery"],
["naturalist", "Arthur Finch", "m", "old", { top: 0x6A5A3A, bottom: 0x4A4A3A }, ["nature", "nature", "nature"], "the naturalist who keeps the butterfly house and the cabinets"],
["knitter", "Grandma Polly", "f", "old", { top: 0xA84A5A, bottom: 0x5A4A5A, hair: 0xE8E8E8, hairStyle: "bun" }, ["knit", "knit", "knit"], "who knits by the fire and is always glad of company"],
["fisher", "Old Ned", "m", "old", { top: 0x3A4A5A, bottom: 0x3A3A3A, hat: "cap" }, ["harbour", "harbour", "harbour"], "who looks after the rowing boats and only ever fishes catch-and-release"],
["mapper", "Isla Moore", "f", "mid", { top: 0x2A5A6A, bottom: 0x3A3A3A }, ["maps", "maps", "maps"], "the map maker, who draws the village again every season"],
["musician", "Leo Grant", "m", "young", { top: 0x6A3A5A, bottom: 0x2A2A2A }, ["music", "music", "green"], "who plays the music shed's soft instruments and teaches by echo"]
];
var SW_PERSONA = "You live in Stillwater, a calm lakeside village in SomnuMatrix where everything is gentle and nothing is ever rushed. " +
"Speak in short, simple sentences with everyday words. Be warm, patient and clear. Say one thing at a time. Never use sarcasm, idioms that could confuse, or sudden excitement. " +
"If someone seems worried, tell them they can go to the Quiet Room, or press the Go home button, any time. Never talk about illness, diagnoses or treatments. " +
"If asked what there is to do, name two or three things and where they are. ";
var SW_TODO = [
["garden", "🌱", "Water the garden", "garden"], ["bake", "🍞", "Bake bread", "bakery"], ["ducks", "🦆", "Feed the ducks", "harbour"], ["pony", "🐴", "Brush the pony", "barn"],
["eggs", "🥚", "Collect the eggs", "barn"], ["read", "📖", "Hear a story", "library"], ["sort", "🐚", "Sort the shells", "library"], ["music", "🎵", "Play some music", "music"],
["pot", "🏺", "Make a pot", "pottery"], ["train", "🚂", "Run the trains", "trains"], ["model", "✈️", "Build a model", "models"], ["paintfig", "🖌️", "Paint a figure", "paint"],
["easel", "🎨", "Paint a picture", "crafts"], ["bricks", "🧱", "Build with bricks", "bricks"], ["logs", "🪵", "Build a log cabin", "logs"], ["blocks", "🧸", "Build with blocks", "blocks"],
["puzzle", "🧩", "Do a puzzle", "puzzles"], ["knit", "🧶", "Knit a row or two", "knit"], ["stars", "🔭", "Look at the stars", "stars"], ["bugs", "🦋", "Visit the butterflies", "nature"],
["map", "🗺️", "Draw a map", "maps"], ["boat", "🚣", "Row a boat", "harbour"], ["fish", "🎣", "Go fishing", "harbour"], ["quiet", "🌧️", "Rest in the Quiet Room", "quiet"]
];
function swTodo(k) { for (var i = 0; i < SW_TODO.length; i++)
if (SW_TODO[i][0] === k)
return SW_TODO[i]; return null; }
var SW_PHRASES = [["👋", "Hello"], ["🙂", "Nice to see you"], ["🤝", "Want to play?"], ["👍", "Yes please"], ["🙅", "No thank you"], ["🙏", "Thank you"],
["⏸️", "I need a break"], ["🏠", "I am going home now"], ["🎉", "I made it!"], ["❓", "Can you help me?"], ["👀", "Look at this"], ["💚", "Have a calm day"]];
var SW_ART = [
["starry", "The Starry Night", "Vincent van Gogh", 1889, 640, 507], ["sunflowers", "Sunflowers", "Vincent van Gogh", 1888, 1110, 1400], ["irises", "Irises", "Vincent van Gogh", 1889, 1400, 1070],
["bedroom", "The Bedroom", "Vincent van Gogh", 1889, 1400, 1095], ["cafe", "Café Terrace at Night", "Vincent van Gogh", 1888, 1116, 1400], ["nightcafe", "The Night Café", "Vincent van Gogh", 1888, 1400, 1105],
["cypress", "Road with Cypress and Star", "Vincent van Gogh", 1890, 1111, 1400], ["poppies_vg", "Poppy Field", "Vincent van Gogh", 1890, 1400, 1138], ["crows", "Wheatfield with Crows", "Vincent van Gogh", 1890, 1400, 670],
["lilies", "Water Lilies", "Claude Monet", 1906, 1400, 1345], ["lilypond", "Water Lily Pond", "Claude Monet", 1900, 1400, 1240], ["bridge", "The Japanese Bridge", "Claude Monet", 1899, 1400, 1082],
["poppies_m", "Poppy Field in a Hollow near Giverny", "Claude Monet", 1885, 1400, 1117], ["train", "Arrival of the Normandy Train", "Claude Monet", 1877, 1400, 1050], ["etretat", "Boats on the Beach at Étretat", "Claude Monet", 1885, 1400, 1103],
["rouen", "Rouen Cathedral in Sunlight", "Claude Monet", 1894, 900, 1400], ["sunrise", "Impression, Sunrise", "Claude Monet", 1872, 640, 492], ["wave", "The Great Wave off Kanagawa", "Katsushika Hokusai", 1831, 1400, 966],
["monalisa", "Mona Lisa", "Leonardo da Vinci", 1503, 429, 640], ["pearl", "Girl with a Pearl Earring", "Johannes Vermeer", 1665, 547, 640], ["venus", "The Birth of Venus", "Sandro Botticelli", 1485, 640, 402],
["kiss", "The Kiss", "Gustav Klimt", 1908, 639, 640], ["wanderer", "Wanderer above the Sea of Fog", "Caspar David Friedrich", 1818, 1093, 1400], ["meninas", "Las Meninas", "Diego Velázquez", 1656, 556, 640],
["nightwatch", "The Night Watch", "Rembrandt van Rijn", 1642, 640, 536], ["adam", "The Creation of Adam", "Michelangelo", 1512, 640, 291], ["apples", "Apple-Picking", "Camille Pissarro", 1886, 1393, 1400],
["harvest", "The Harvest", "Camille Pissarro", 1882, 1400, 776], ["louvre", "The Louvre in the Morning", "Camille Pissarro", 1901, 1400, 1122], ["murnau", "Landscape with a Locomotive", "Wassily Kandinsky", 1909, 583, 452],
["balloon", "Red Balloon", "Paul Klee", 1922, 1343, 1400]
];
var SW_ART_DIR = "assets/stillwater/art/";
var SW_PIECES = [12, 24, 48, 100, 250, 500, 1000, 2000];
function swArt(k) { for (var i = 0; i < SW_ART.length; i++)
if (SW_ART[i][0] === k)
return SW_ART[i]; return null; }
function swArtMax(A) { var px = A[4] * A[5]; return SW_PIECES.filter(function (n) { return px / n >= 26 * 26; }).pop() || 12; }
function swData() {
var d = store.sw;
if (!d || typeof d !== "object")
d = store.sw = {};
d.calm = d.calm || {};
d.made = d.made || {};
d.today = d.today || {};
d.f = d.f || {};
d.plots = d.plots || {};
d.puz = d.puz || {};
d.shelf = Array.isArray(d.shelf) ? d.shelf : [];
return d;
}
function swSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function swLocalGet(k) { try {
var v = localStorage.getItem("sw:" + k);
return v ? JSON.parse(v) : null;
}
catch (e) {
return null;
} }
function swLocalSet(k, v) { try {
localStorage.setItem("sw:" + k, JSON.stringify(v));
return true;
}
catch (e) {
return false;
} }
function swToday() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function swKeep(kind, name, icon, extra) { var d = swData(); var o = { k: kind, n: String(name).slice(0, 60), i: icon || "⭐", at: Date.now() }; if (extra)
for (var q in extra)
o[q] = extra[q]; d.shelf.unshift(o); if (d.shelf.length > 60)
d.shelf.length = 60; swSave(); }
var SW_MATS = {}, SW_TEX = {};
function swTexK(k) { if (SW_TEX[k])
return SW_TEX[k]; var t = typeof ctnTex === "function" ? ctnTex(k) : (typeof texOf === "function" ? texOf(k) : null); return (SW_TEX[k] = t || null); }
function swMat(kind, col) {
var key = (kind || "-") + "|" + col;
if (SW_MATS[key])
return SW_MATS[key];
var m = new THREE.MeshLambertMaterial({ color: col }), t = kind ? swTexK(kind) : null;
if (t)
m.map = t;
m.userData.ctn = 1;
m.userData.ldShared = 1;
return (SW_MATS[key] = m);
}
function swGlowM(col) { var k = "glow|" + col; if (SW_MATS[k])
return SW_MATS[k]; var m = new THREE.MeshBasicMaterial({ color: col }); m.userData.ldShared = 1; return (SW_MATS[k] = m); }
function swShiny(col, sh) { var k = "ph|" + col + "|" + (sh || 60); if (SW_MATS[k])
return SW_MATS[k]; var m = new THREE.MeshPhongMaterial({ color: col, shininess: sh || 60, specular: 0x555555 }); m.userData.ldShared = 1; return (SW_MATS[k] = m); }
function swSee(col, op) { var k = "see|" + col + "|" + op; if (SW_MATS[k])
return SW_MATS[k]; var m = new THREE.MeshPhongMaterial({ color: col, transparent: true, opacity: op, shininess: 90, specular: 0xFFFFFF, depthWrite: false }); m.userData.ldShared = 1; return (SW_MATS[k] = m); }
function swMetre(geo) { return typeof ctnMetre === "function" ? ctnMetre(geo) : geo; }
function swAdd(geo, mat, x, y, z, p, ry) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; if (p)
p.add(m); return m; }
function swB(w, h, d, kind, col, x, y, z, p, ry) { return swAdd(kind ? swMetre(new THREE.BoxGeometry(w, h, d)) : new THREE.BoxGeometry(w, h, d), swMat(kind, col), x, y, z, p, ry); }
function swC(rt, rb, h, kind, col, x, y, z, p, seg) { return swAdd(kind ? swMetre(new THREE.CylinderGeometry(rt, rb, h, seg || 14)) : new THREE.CylinderGeometry(rt, rb, h, seg || 14), swMat(kind, col), x, y, z, p); }
function swK(r, h, kind, col, x, y, z, p, seg) { return swAdd(kind ? swMetre(new THREE.ConeGeometry(r, h, seg || 14)) : new THREE.ConeGeometry(r, h, seg || 14), swMat(kind, col), x, y, z, p); }
function swS(r, col, x, y, z, p, seg) { return swAdd(new THREE.SphereGeometry(r, seg || 12, Math.max(6, ((seg || 12) * 0.7) | 0)), swMat(null, col), x, y, z, p); }
function swG(x, y, z, p, ry) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); if (ry)
g.rotation.y = ry; if (p)
p.add(g); return g; }
function swPrism(w, h, d, kind, col, x, y, z, p, ry) { return __ZC(446, 0, this, arguments, new.target); }
var SW_LB = {};
function swLeafBall(p, x, y, z, r, col) { return __ZC(446, 1, this, arguments, new.target); }
function swTo(g, lx, lz) { return __ZC(446, 2, this, arguments, new.target); }
function swRotOf(g) { var r = 0, q = g; while (q && q !== SW.G) {
r += q.rotation.y || 0;
q = q.parent;
} return r; }
function swSolid(x, z, w, d, y0, y1, rot) {
var c = Math.cos(rot || 0), s = Math.sin(rot || 0);
var S = { x: x, z: z, hw: w / 2, hd: d / 2, c: c, s: s, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 80 : y1 };
SW.solids.push(S);
return S;
}
function swSolidIn(g, lx, lz, w, d, y0, y1) { var p = swTo(g, lx, lz); return swSolid(p.x, p.z, w, d, y0, y1, swRotOf(g)); }
function swRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 80 : y1, round: 1 }; SW.solids.push(S); return S; }
function swFloor(x, z, w, d, y, inside) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, inside: !!inside }; SW.floors.push(F); return F; }
function swSolidAt(x, z, feet) { return __ZC(446, 3, this, arguments, new.target); }
function swFloorAt(x, z, feet) { var best = null; for (var i = 0; i < SW.floors.length; i++) {
var F = SW.floors[i];
if (F.off)
continue;
if (Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd && F.y <= feet + 0.9 && (best === null || F.y > best))
best = F.y;
} return best; }
function swInsideWalk(x, z) { for (var i = 0; i < SW.floors.length; i++) {
var F = SW.floors[i];
if (F.inside && !F.off && Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd)
return true;
} return false; }
function swSpot(x, z, r, name, verb, fn, y, icon) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y, icon: icon }; SW.spots.push(S); return S; }
function swLight(col, k, dist, x, y, z, parent, always) {
if (SW.lite && !always)
return null;
var L = new THREE.PointLight(col, k, dist, 2);
L.position.set(x, y, z);
(parent || SW.G).add(L);
var F = { L: L, k: k, ph: Math.random() * 20 };
SW.lights.push(F);
return F;
}
function swLightsTick(dt) { SW.lights.forEach(function (F) { if (!F.L.parent)
return; F.ph += dt; F.L.intensity = F.k * (0.97 + 0.03 * Math.sin(F.ph * 0.6)); }); }
function swLamp(g, x, y, z, col) { return __ZC(446, 4, this, arguments, new.target); }
function swLantern(g, x, y, z) {
swB(0.24, 0.34, 0.24, null, 0x1A1A1A, x, y, z, g);
var gl = swB(0.17, 0.24, 0.17, null, 0, x, y, z, g);
gl.material = swGlowM(0xFFC870);
var s = wGlow(0xFFB060, 1.6, 0.4);
s.position.set(x, y, z);
g.add(s);
}
function swVeil(sec, mid) { return __ZC(446, 5, this, arguments, new.target); }
function swPerson(seed, x, z, ry, o, parent, y) { return __ZC(446, 6, this, arguments, new.target); }
function swBeast(a, x, z, ry, k, seed, parent, y) { return __ZC(446, 7, this, arguments, new.target); }
function swBird(p, x, y, z, s, col, neck, bill) { return __ZC(446, 8, this, arguments, new.target); }
var SWP = { el: null, body: null, title: null, open: false, onClose: null, keys: null };
function swPanel(title, html, onClose, o) { return __ZC(446, 9, this, arguments, new.target); }
function swPanelClose() { if (!SWP.el || !SWP.open)
return; SWP.el.style.display = "none"; SWP.open = false; SWP.keys = null; var f = SWP.onClose; SWP.onClose = null; if (f)
try {
f();
}
catch (e) {
if (window.console)
console.warn("[stillwater] close", e);
} }
function swBtn(id, label, sub, o) { o = o || {}; return "<button class='swb" + (o.big ? " swb-big" : "") + (o.on ? " swb-on" : "") + (o.small ? " swb-small" : "") + "' data-sw='" + id + "'" + (o.col ? " style='background:" + o.col + "'" : "") + (o.title ? " title='" + esc(o.title) + "'" : "") + ">" + label + (sub ? "<small>" + sub + "</small>" : "") + "</button>"; }
function swBind(root, fns) { root.querySelectorAll("[data-sw]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); var f = fns[b.getAttribute("data-sw")]; if (f)
try {
f(b, e);
}
catch (x) {
if (window.console)
console.warn("[stillwater] button", x);
} }; }); }
var SW_CSS = false;
function swCss() { return __ZC(446, 10, this, arguments, new.target); }
function swSay(t, force) { return __ZC(446, 11, this, arguments, new.target); }
var SW_WOOD = 0x8A6242, SW_DARK = 0x5A3E2A, SW_PALE = 0xC8A47A;
function swTable(g, x, z, w, d, col, o) { return __ZC(446, 12, this, arguments, new.target); }
function swChair(g, x, z, ry, col, s) {
s = s || 1;
var c = swG(x, 0, z, g, ry);
swB(0.44 * s, 0.05, 0.44 * s, "wood", col || SW_WOOD, 0, 0.46 * s, 0, c);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { swB(0.04, 0.46 * s, 0.04, "wood", col || SW_WOOD, q[0] * 0.19 * s, 0.23 * s, q[1] * 0.19 * s, c); });
swB(0.44 * s, 0.5 * s, 0.04, "wood", col || SW_WOOD, 0, 0.72 * s, -0.2 * s, c);
return c;
}
function swStool(g, x, z, col) { var c = swG(x, 0, z, g); swC(0.18, 0.18, 0.05, "wood", col || SW_WOOD, 0, 0.62, 0, c, 14); for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2, l = swC(0.02, 0.025, 0.62, "wood", col || SW_WOOD, Math.cos(a) * 0.12, 0.31, Math.sin(a) * 0.12, c, 6);
l.rotation.z = Math.cos(a) * 0.12;
l.rotation.x = -Math.sin(a) * 0.12;
} return c; }
function swArmchair(g, x, z, ry, col) { return __ZC(446, 13, this, arguments, new.target); }
function swSofa(g, x, z, ry, col, L) { return __ZC(446, 14, this, arguments, new.target); }
function swBench(g, x, z, ry, L, col) { var b = swG(x, 0, z, g, ry); swB(L, 0.06, 0.36, "wood", col || SW_WOOD, 0, 0.44, 0, b); swB(0.06, 0.44, 0.3, "wood", col || SW_WOOD, -L / 2 + 0.2, 0.22, 0, b); swB(0.06, 0.44, 0.3, "wood", col || SW_WOOD, L / 2 - 0.2, 0.22, 0, b); return b; }
function swShelf(g, x, z, ry, w, h, col, fill) { return __ZC(446, 15, this, arguments, new.target); }
function swBooks(s, x0, W, y, j) {
var R = wRand(31 + j * 7), x = x0;
while (x < x0 + W - 0.04) {
var bw = 0.03 + R() * 0.04, bh = 0.22 + R() * 0.12, col = [0x7A2A2A, 0x2A4A6A, 0x3A5A3A, 0x6A5A2A, 0x5A3A5A, 0xA87A3A, 0x2A2A3A][(R() * 7) | 0];
swB(bw, bh, 0.22, null, col, x + bw / 2, y + bh / 2, 0, s);
x += bw + 0.004;
}
}
function swRug(g, x, z, w, d, col, col2) { return __ZC(446, 16, this, arguments, new.target); }
function swPlant(g, x, z, s) { s = s || 1; swC(0.18 * s, 0.13 * s, 0.3 * s, null, 0xB8643A, x, 0.15 * s, z, g, 12); swLeafBall(g, x, 0.5 * s, z, 0.3 * s, 0x4A8A3A); }
function swFrame(g, x, y, z, ry, w, h, tex, col) {
var f = swG(x, y, z, g, ry);
swB(w + 0.1, h + 0.1, 0.04, "wood", col || 0x8A6A3A, 0, 0, 0, f);
var p = swAdd(new THREE.PlaneGeometry(w, h), tex ? new THREE.MeshBasicMaterial({ map: tex }) : swMat(null, 0xE8E0D0), 0, 0, 0.025, f);
return f;
}
function swStove(g, x, z, ry) { return __ZC(446, 17, this, arguments, new.target); }
function swFireplace(g, x, z, ry) { return __ZC(446, 18, this, arguments, new.target); }
function swWindowIn(g, x, y, z, ry, w, h, col) { return __ZC(446, 19, this, arguments, new.target); }
function swCabinet(g, x, z, ry, w, h, col, glassCol) {
var c = swG(x, 0, z, g, ry);
swB(w, h, 0.5, "wood", col || SW_DARK, 0, h / 2, 0, c);
var gp = swB(w - 0.12, h - 0.4, 0.02, null, 0, 0, h / 2 + 0.1, 0.26, c);
gp.material = swSee(glassCol || 0xD8E8F0, 0.28);
for (var i = 1; i < 4; i++)
swB(w - 0.14, 0.03, 0.42, "wood", col || SW_DARK, 0, i * (h - 0.2) / 4 + 0.1, 0.02, c);
return c;
}
function swSmooth(d, r) { if (d >= r)
return 0; var t = 1 - d / r; return t * t * (3 - 2 * t); }
function swSegD(x, z, ax, az, bx, bz) { var dx = bx - ax, dz = bz - az, t = ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1); t = Math.max(0, Math.min(1, t)); return Math.hypot(x - (ax + dx * t), z - (az + dz * t)); }
function swPathD(x, z, P) { var b = 1e9; for (var i = 0; i < P.length - 1; i++) {
var d = swSegD(x, z, P[i][0], P[i][1], P[i + 1][0], P[i + 1][1]);
if (d < b)
b = d;
} return b; }
function swLakeE(x, z) { var L = SW_LAKE, u = (x - L.x) / L.rx, v = (z - L.z) / L.rz; return Math.sqrt(u * u + v * v); }
function swInLake(x, z) { return swLakeE(x, z) < 0.97; }
var SW_STREAM = [[96, -160], [130, -140], [160, -110], [176, -74], [196, -40], [236, -12], [300, 10], [380, 30], [470, 40]];
function swStreamD(x, z) { return swPathD(x, z, SW_STREAM); }
var SW_PATHS = null;
function swPaths() { return __ZC(446, 20, this, arguments, new.target); }
function swPathAll(x, z) { var P = swPaths(), b = 1e9; for (var i = 0; i < P.length; i++) {
var d = swPathD(x, z, P[i]);
if (d < b)
b = d;
} return b; }
function swLandRaw(x, z) { return __ZC(446, 21, this, arguments, new.target); }
var SW_FLATS = null;
function swFlats() { return __ZC(446, 22, this, arguments, new.target); }
var SW_CY = {};
function swCentre(f) { var k = f[0] + "|" + f[1]; if (SW_CY[k] === undefined)
SW_CY[k] = Math.max(0.4, swLandRaw(f[0], f[1])); return SW_CY[k]; }
function swLand(x, z) { return __ZC(446, 23, this, arguments, new.target); }
function swMeshH(x, z) { return __ZC(446, 24, this, arguments, new.target); }
function swGround(x, z, feet) {
if (x >= SW_IN_X - 2000) {
var fl = swFloorAt(x, z, feet === undefined || feet === null ? 1e9 : feet);
return fl === null ? 0 : fl;
}
var g = Math.max(swLand(x, z), swMeshH(x, z)), f = swFloorAt(x, z, feet === undefined || feet === null ? 1e9 : feet);
return f !== null && f > g ? f : g;
}
function swMix(a, b, t) { var ar = a >> 16 & 255, ag = a >> 8 & 255, ab = a & 255, br = b >> 16 & 255, bg = b >> 8 & 255, bb = b & 255; return (Math.round(ar + (br - ar) * t) << 16) | (Math.round(ag + (bg - ag) * t) << 8) | Math.round(ab + (bb - ab) * t); }
function swGroundCol(x, z, h) { return __ZC(446, 25, this, arguments, new.target); }
function swTerrain(G) { return __ZC(446, 26, this, arguments, new.target); }
function swRibbon(G, P, w, mat, yf, y0) { return __ZC(446, 27, this, arguments, new.target); }
function swPathsBuild(G) { return __ZC(446, 28, this, arguments, new.target); }
var SW_ENV = {
out: { top: 0x3E6EB8, low: 0xC09A6A, fog: 0xB8AC94, fogD: 0.0017, sun: 0.86, sunCol: 0xFFDCA8, sunDir: [-0.62, 0.42, 0.3], hemi: 0.7, hemiCol: 0xEAF0FF, hemiGround: 0x4A5A2E, stars: 0 },
inside: { top: 0x000000, low: 0x16120E, fog: 0x16120E, fogD: 0.01, sun: 0.15, sunCol: 0xFFE0B0, sunDir: [0.3, 0.8, 0.2], hemi: 0.68, hemiCol: 0xFFF0DC, hemiGround: 0x5A4A3A, stars: 0 },
dome: { top: 0x000000, low: 0x080A14, fog: 0x080A14, fogD: 0.01, sun: 0.05, sunCol: 0xB0C0FF, sunDir: [0.3, 0.8, 0.2], hemi: 0.42, hemiCol: 0xC8D0F0, hemiGround: 0x2A2A3A, stars: 0 }
};
function swEnvNow() { return __ZC(446, 29, this, arguments, new.target); }
function swSky(G) { return __ZC(446, 30, this, arguments, new.target); }
function swTreeProto(kind) { return __ZC(446, 31, this, arguments, new.target); }
var SW_TREEK = ["oak", "birch", "willow", "fruit", "pine"];
function swTreeOK(x, z, pad) { return __ZC(446, 32, this, arguments, new.target); }
function swTrees(G) { return __ZC(446, 33, this, arguments, new.target); }
function swTreeHit(x, z) { var L = SW.treeList; if (!L)
return false; for (var k in L) {
var A = L[k], r = k === "oak" ? 0.75 : k === "willow" ? 0.65 : 0.35;
for (var i = 0; i < A.length; i++) {
var T = A[i];
if (Math.abs(T.x - x) < 2 && Math.abs(T.z - z) < 2 && Math.hypot(T.x - x, T.z - z) < r * T.s + 0.3)
return true;
}
} return false; }
function swFlowerGeo() { return __ZC(446, 34, this, arguments, new.target); }
function swTuftGeo(tall) { return __ZC(446, 35, this, arguments, new.target); }
function swUnder(G) { return __ZC(446, 36, this, arguments, new.target); }
var SW_FLC = [0xF4F0F0, 0xE8C83A, 0xC85A9A, 0x8A8AE8, 0xF0A0C0, 0xE8E070, 0xB8A0E8];
function swUnderFill(x, z) { return __ZC(446, 37, this, arguments, new.target); }
function swWindow(p, x, y, z, ry, w, h, o) { return __ZC(446, 38, this, arguments, new.target); }
function swDoor(p, x, y, z, ry, w, h, col, o) { return __ZC(446, 39, this, arguments, new.target); }
function swGable(p, w, d, y, rh, kind, col, over, gableKind, gableCol) { return __ZC(446, 40, this, arguments, new.target); }
function swHangSign(g, x, y, z, ry, icon, name, bg) { return __ZC(446, 41, this, arguments, new.target); }
var SW_WALLS = { plaster: ["plaster", 0xEEE4D0], stone: ["stone", 0xB8AE9C], brick: ["brick", 0xA8604A], wood: ["wood", 0x8A6A4A], log: ["bark", 0x7A5A3A], barn: ["wood", 0x9A2E22] };
var SW_ROOFS = { thatch: ["thatch", 0xA88A5A], slate: ["slate", 0x5A6068], tile: ["tile", 0xA8503A], shingle: ["shingle", 0x6A5A4A] };
function swHouse(G, k) { return __ZC(446, 42, this, arguments, new.target); }
function swDomeHouse(G, k, g, A, H) { return __ZC(446, 43, this, arguments, new.target); }
function swButterflyHouse(G) { return __ZC(446, 44, this, arguments, new.target); }
function swButterfly(g, x, y, z, n) { return __ZC(446, 45, this, arguments, new.target); }
function swGreen(G) { return __ZC(446, 46, this, arguments, new.target); }
function swMapTex() { return __ZC(446, 47, this, arguments, new.target); }
function swArrival(G) { return __ZC(446, 48, this, arguments, new.target); }
function swHarbour(G) { return __ZC(446, 49, this, arguments, new.target); }
function swBoat(G, x, y, z, n) { return __ZC(446, 50, this, arguments, new.target); }
function swBridge(G) { return __ZC(446, 51, this, arguments, new.target); }
function swLampPosts(G) { return __ZC(446, 52, this, arguments, new.target); }
function swSignposts(G) { return __ZC(446, 53, this, arguments, new.target); }
function swAllotments(G) { return __ZC(446, 54, this, arguments, new.target); }
function swAnimals(G) { return __ZC(446, 55, this, arguments, new.target); }
function swDucks(G) { return __ZC(446, 56, this, arguments, new.target); }
function swFolkPlace(key) {
if (key === "green")
return { x: SW_GREEN.x + (Math.random() - 0.5) * 14, z: SW_GREEN.z + SW_GREEN.r - 8, room: null };
if (key === "harbour")
return { x: -6, z: -66, room: null };
return { room: key };
}
function swFolkSlot() { var h = new Date().getHours(); return h < 12 ? 0 : h < 17 ? 1 : 2; }
function swVillagers(G) { return __ZC(446, 57, this, arguments, new.target); }
function swFolkTalk(F) {
return { name: F[1], persona: SW_PERSONA + "You are " + F[1] + ", " + F[6] + ". " + (swCfg().notes ? "The Keeper of Stillwater asks: " + swCfg().notes : ""), greet: "Hello. I'm " + F[1].replace(/^(Mrs|Miss|Mr|Dr) /, "") + ". Take your time." };
}
function swJoined(G, fn) { var t = new THREE.Group(); G.add(t); fn(t); if (typeof ctnMerge === "function")
ctnMerge(t); return t; }
function swVillage(G) { return __ZC(446, 58, this, arguments, new.target); }
var SW_ROOMS = {}, SW_RORDER = [];
function swRoomDef(k, R) { R.k = k; R.i = SW_RORDER.length; R.x = SW_IN_X + R.i * 300; SW_RORDER.push(k); SW_ROOMS[k] = R; return R; }
function swRoomKit(R) { return __ZC(446, 59, this, arguments, new.target); }
function swShell(R, g) { return __ZC(446, 60, this, arguments, new.target); }
function swRoomGet(k) { return __ZC(446, 61, this, arguments, new.target); }
function swRoomFolk(R) { return __ZC(446, 62, this, arguments, new.target); }
function swShowOnly(R) {
for (var q in SW_ROOMS) {
var O = SW_ROOMS[q];
if (O.g) {
O.g.visible = O === R;
O.D.visible = O === R;
}
}
if (SW.outside)
SW.outside.forEach(function (o) { o.visible = !R; });
}
function swEnterRoom(k, D) { return __ZC(446, 63, this, arguments, new.target); }
function swLeaveRoom(R) { if (R.onLeave)
try {
R.onLeave(R);
}
catch (e) { } swOutside(R.door); }
function swOutside(D) { return __ZC(446, 64, this, arguments, new.target); }
function swBenchAt(R, g, lx, lz, ry, name, verb, fn, icon, dress) { return __ZC(446, 65, this, arguments, new.target); }
function swDressBricks(t) { var R = wRand(4); for (var i = 0; i < 26; i++)
swB(0.08, 0.05, 0.04 + R() * 0.08, null, [0xC83A2A, 0x2A6AC8, 0xF0C030, 0x3A9A4A, 0xF4F4F0][i % 5], (R() - 0.5) * 1.4, 0.85, (R() - 0.5) * 0.6, t); }
function swDressPaint(t) { for (var i = 0; i < 8; i++)
swC(0.035, 0.035, 0.06, null, [0xC83A2A, 0x2A6AC8, 0xF0C030, 0x3A9A4A, 0xF4F4F0, 0x1A1A1A, 0x8A4AC8, 0xE87A2A][i], -0.7 + i * 0.08, 0.84, 0.3, t, 8); swB(0.4, 0.02, 0.3, null, 0xF4F0E8, 0.2, 0.82, 0, t); }
function swDressClay(t) { swC(0.22, 0.24, 0.1, null, 0x5A5A5A, 0, 0.86, 0, t, 20); swC(0.13, 0.15, 0.22, null, 0xA87A5A, 0, 1.0, 0, t, 16); }
function swDressYarn(t) { for (var i = 0; i < 6; i++)
swS(0.08, [0xC84A5A, 0x4A8AC8, 0xE8C84A, 0x6AB86A, 0xF4F0E8, 0xA86AC8][i], -0.6 + i * 0.24, 0.88, 0.25, t, 10); }
swRoomDef("welcome", { w: 12, d: 9, wall: ["plaster", 0xF0E6D2], floor: ["wood", 0xA87E58], folkAt: [2.6, -2.6, -0.4], say: "Mrs Hart is here. The board by the fire has the day's three things, and your own shelf is in the corner.", f: function (R, g) { return __ZC(446, 66, this, arguments, new.target); } });
swRoomDef("quiet", { w: 8, d: 7, wall: ["plaster", 0xDCE4E8], floor: ["wood", 0x8A7A6A], light: 0.5, lightCol: 0xE8E4F0, win: 1, winSide: 1, winCol: 0x8AA0B8, say: "Only you (and your companion) can come in here. Sit in the big chair, watch the fish, or breathe with the light.", noMerge: false, f: function (R, g) { return __ZC(446, 67, this, arguments, new.target); } });
swRoomDef("bakery", { w: 10, d: 8, wall: ["plaster", 0xF2E6D0], floor: ["floortile", 0xC8B8A0], folkAt: [0, -2.6, 0], say: "Tom is at the oven. The recipe card on the big table shows every step with a picture.", f: function (R, g) { return __ZC(446, 68, this, arguments, new.target); } });
swRoomDef("library", { w: 12, d: 9, wall: ["plaster", 0xEAE0CC], floor: ["wood", 0x8A6242], folkAt: [0, -3, 0], say: "Miss Lowe reads aloud at the story chair. The sorting tables are by the window.", f: function (R, g) { return __ZC(446, 69, this, arguments, new.target); } });
swRoomDef("music", { w: 8, d: 6, wall: ["wood", 0x9A7A5A], floor: ["wood", 0x7A5A3A], folkAt: [-2.4, -1.8, 0.6], say: "Every instrument here is tuned so its notes always sound well together. Nothing can sound wrong.", f: function (R, g) { return __ZC(446, 70, this, arguments, new.target); } });
swRoomDef("barn", { w: 15, d: 10, wall: ["wood", 0x8A6A4A], floor: ["earth", 0x8A7A5A], h: 4.5, beams: true, say: "The hay smells sweet. Clover the pony is in the paddock outside; the hens are by the coop.", f: function (R, g) { return __ZC(446, 71, this, arguments, new.target); } });
swRoomDef("hall", { w: 13, d: 9, wall: ["plaster", 0xEEE2CC], floor: ["wood", 0x9A7452], h: 4, say: "Small, slow games, never rushed. Turns are shown with faces and an arrow.", f: function (R, g) { return __ZC(446, 72, this, arguments, new.target); } });
swRoomDef("garden", { w: 7, d: 6, wall: ["wood", 0x8A7A5A], floor: ["wood", 0x7A6A4A], say: "Seeds, watering cans and a calendar of what grows when.", f: function (R, g) { return __ZC(446, 73, this, arguments, new.target); } });
swRoomDef("pottery", { w: 12, d: 9, wall: ["stone", 0xC8BEAC], floor: ["floortile", 0xB8A890], say: "Rosa's wheel turns slowly. The kiln is warm. The whittling bench smells of fresh wood.", folkAt: [-3, -2.8, 0.3], f: function (R, g) { return __ZC(446, 74, this, arguments, new.target); } });
swRoomDef("stars", { w: 12, d: 12, wall: ["plaster", 0x2A2E44], floor: ["wood", 0x3A2E2A], env: "dome", light: 0.45, lightCol: 0xB8C8F0, win: 0, h: 5.5, beams: false, ceil: 0x0A0E1E, ceilKind: null, say: "The orrery turns slowly in the middle. The telescope points through the dome.", folkAt: [-3, -3, 0.4], f: function (R, g) { return __ZC(446, 75, this, arguments, new.target); } });
swRoomDef("nature", { w: 12, d: 9, wall: ["plaster", 0xE8E2D0], floor: ["wood", 0x8A6242], folkAt: [0, -3, 0], say: "Glass cases of shells, beetles, rocks and feathers. The Butterfly House is just outside.", f: function (R, g) { return __ZC(446, 76, this, arguments, new.target); } });
swRoomDef("maps", { w: 11, d: 8, wall: ["plaster", 0xE8DCC4], floor: ["wood", 0x8A6242], folkAt: [2.8, -2.6, -0.3], say: "The great globe turns slowly. The sand table is ready to shape, and the map desk has stamps.", f: function (R, g) { return __ZC(446, 77, this, arguments, new.target); } });
swRoomDef("knit", { w: 9, d: 7, wall: ["plaster", 0xF0E2D0], floor: ["wood", 0x8A6242], folkAt: [1.2, -1.8, -0.6], say: "Grandma Polly knits by the fire. Pick a pattern and some wool, and knit a row or two.", f: function (R, g) { return __ZC(446, 78, this, arguments, new.target); } });
swRoomDef("trains", { w: 16, d: 12, wall: ["brick", 0xB8705A], floor: ["wood", 0x8A6242], h: 4, folkAt: [-6, -4.6, 0.5], say: "Mr Platt's railway. Press E at the control desk to lay track, choose trains and add scenery. Press E by the table's end to ride in the cab.", f: function (R, g) { return __ZC(446, 79, this, arguments, new.target); } });
swRoomDef("models", { w: 12, d: 9, wall: ["brick", 0xB8705A], floor: ["wood", 0x8A6242], folkAt: [3, -3, -0.3], say: "Kits of cars, shuttles, aeroplanes, ships and steam engines. Pick one at the bench; your finished models go in the glass case.", f: function (R, g) { return __ZC(446, 80, this, arguments, new.target); } });
swRoomDef("paint", { w: 10, d: 8, wall: ["plaster", 0xEEE2D6], floor: ["wood", 0x8A6242], say: "Paint small figures up close under the magnifying lamp: a knight, a dragon, an owl, a fox and more.", f: function (R, g) { return __ZC(446, 81, this, arguments, new.target); } });
swRoomDef("sculpt", { w: 12, d: 9, wall: ["stone", 0xC8BEAC], floor: ["floortile", 0xB8A890], say: "Clay on the sculpting stand, a block of soft stone, and a log for whittling. Nothing here can go wrong: there is always Undo.", f: function (R, g) { return __ZC(446, 82, this, arguments, new.target); } });
swRoomDef("crafts", { w: 14, d: 10, wall: ["plaster", 0xF2E8D8], floor: ["wood", 0x9A7452], h: 3.6, folkAt: [0, -3.6, 0], say: "The easel by the window, and tables for mosaics, stained glass, beads and weaving. June never says a painting is wrong.", f: function (R, g) { return __ZC(446, 83, this, arguments, new.target); } });
swRoomDef("bricks", { w: 14, d: 10, wall: ["brick", 0xB8705A], floor: ["wood", 0x8A6242], folkAt: [-4.4, -3.6, 0.4], say: "Building bricks sorted by colour in trays. Pick a build with a picture guide (a little duck up to a giant city block of thousands), or build anything you like.", f: function (R, g) { return __ZC(446, 84, this, arguments, new.target); } });
swRoomDef("logs", { w: 10, d: 8, wall: ["wood", 0x9A7A5A], floor: ["wood", 0x7A5A3A], say: "Notched wooden logs that stack at the corners. Build a cabin, a fort, a barn or a bridge.", f: function (R, g) { return __ZC(446, 85, this, arguments, new.target); } });
swRoomDef("blocks", { w: 10, d: 8, wall: ["plaster", 0xEEE6D4], floor: ["wood", 0xA87E58], say: "Wooden blocks: cubes, arches, columns and roofs. And a domino run that falls slowly and softly.", f: function (R, g) { return __ZC(446, 86, this, arguments, new.target); } });
swRoomDef("puzzles", { w: 12, d: 9, wall: ["plaster", 0xE8E0D2], floor: ["wood", 0x8A6242], say: "Famous paintings made into jigsaws. Choose a painting, then choose how many pieces: from 12 up to 2000.", f: function (R, g) { return __ZC(446, 87, this, arguments, new.target); } });
var SW_BRICKCOLS = [[0xC8281E, "red"], [0x1E5AB4, "blue"], [0xF2C81E, "yellow"], [0x2A8A3A, "green"], [0xF4F4F0, "white"], [0x1E1E22, "black"], [0x8A8A8E, "grey"], [0x6A3A1E, "brown"], [0xE87A1E, "orange"], [0x6AB4E8, "light blue"], [0xD8B888, "tan"], [0xA83A8A, "purple"]];
var SW_LAYOUTS = {
oval: { n: "The oval", sub: "one long loop round the table", pts: [[-4, -1.8], [0, -2.2], [4, -1.8], [4.4, 0], [4, 1.8], [0, 2.2], [-4, 1.8], [-4.4, 0]] },
eight: { n: "The figure of eight", sub: "with a bridge where it crosses", pts: [[-3.8, -1.6], [-1.6, -2.1], [0, 0], [1.6, 2.1], [3.8, 1.6], [4.3, 0], [3.8, -1.6], [1.6, -2.1], [0, 0], [-1.6, 2.1], [-3.8, 1.6], [-4.3, 0]], bridge: true },
mountain: { n: "The mountain line", sub: "through a tunnel under a green hill", pts: [[-4.2, -1.4], [-1, -2.2], [2.6, -2.3], [4.3, -0.6], [3.6, 1.8], [0.6, 2.2], [-2.4, 1.6], [-4.4, 0.6]], hill: true },
twin: { n: "Two loops", sub: "an inner and an outer line, two trains at once", pts: [[-4.4, -2.2], [0, -2.5], [4.4, -2.2], [4.7, 0], [4.4, 2.2], [0, 2.5], [-4.4, 2.2], [-4.7, 0]], inner: [[-2.8, -1], [0, -1.3], [2.8, -1], [3.1, 0], [2.8, 1], [0, 1.3], [-2.8, 1], [-3.1, 0]] },
country: { n: "The country branch", sub: "a winding loop past a village and a lake", pts: [[-4.2, -1.2], [-2.6, -2.3], [-0.4, -1.6], [1.6, -2.4], [4.2, -1.6], [4.4, 0.6], [2.4, 2.2], [0.2, 1.4], [-2, 2.3], [-4.3, 1.4]], lake: true }
};
var SW_ENGINES = {
steamgreen: { n: "Green steam engine", i: "🚂", kind: "steam", col: 0x2E6A3A, trim: 0xC8A048 },
steamblack: { n: "Black steam engine", i: "🚂", kind: "steam", col: 0x1E1E22, trim: 0xC83A2A },
steamred: { n: "Red tank engine", i: "🚂", kind: "tank", col: 0xA82A22, trim: 0x1E1E22 },
dieselyellow: { n: "Yellow diesel", i: "🚃", kind: "diesel", col: 0xE8B82A, trim: 0x2A2A2A },
dieselblue: { n: "Blue diesel", i: "🚃", kind: "diesel", col: 0x2A4A8A, trim: 0xE8E0D0 },
steammaroon: { n: "Maroon express engine", i: "🚂", kind: "steam", col: 0x6A1E26, trim: 0xC8A048 },
streamsilver: { n: "Silver streamliner", i: "🚄", kind: "stream", col: 0xB8BEC6, trim: 0x2A4A8A }
};
var SW_CARS = { coaches: { n: "Passenger coaches", i: "🚋" }, goods: { n: "Goods wagons", i: "📦" }, mixed: { n: "A bit of both", i: "🚋📦" }, tankers: { n: "Tank wagons", i: "🛢️" }, timber: { n: "Timber wagons", i: "🪵" } };
function swTrainData() { var d = swData(); var t = d.made.trains; if (!t || typeof t !== "object")
t = d.made.trains = { layout: "oval", laid: 0, run: false, speed: 1, eng: ["steamgreen", "dieselblue"], cars: ["coaches", "goods"], scen: { trees: 1, houses: 1, people: 1, lamps: 1, station: 1, signals: 1, church: 1 } }; t.scen = t.scen || {}; return t; }
function swToyM(col, kind, sh) { return __ZC(446, 88, this, arguments, new.target); }
function swTexOnce(k, w, h, fn, rep) { var key = "tex|" + k; if (SW_MATS[key])
return SW_MATS[key]; var t = wTex(w, h, fn, rep); t.anisotropy = 4; return (SW_MATS[key] = t); }
function swMapM(k, tex, col) { var key = "mapm|" + k; if (SW_MATS[key])
return SW_MATS[key]; var m = new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: tex }); m.userData.realSoft = 1; m.userData.ldShared = 1; return (SW_MATS[key] = m); }
function swBoardTex() { return __ZC(446, 89, this, arguments, new.target); }
function swSkyBackTex() { return __ZC(446, 90, this, arguments, new.target); }
function swGravelTex() { return swTexOnce("gravel", 128, 128, function (c, W, H) { var r = wRand(5); c.fillStyle = "#8A847A"; c.fillRect(0, 0, W, H); for (var i = 0; i < 1600; i++) {
var v = 110 + r() * 90 | 0;
c.fillStyle = "rgb(" + v + "," + (v - 4) + "," + (v - 12) + ")";
c.fillRect(r() * W, r() * H, 1 + r() * 2.2, 1 + r() * 2.2);
} }, [1, 1]); }
function swSpokeTex() { return __ZC(446, 91, this, arguments, new.target); }
function swCoachTex(col) { return __ZC(446, 92, this, arguments, new.target); }
function swPlankTex(col) { return __ZC(446, 93, this, arguments, new.target); }
function swGrilleTex(col) { return __ZC(446, 94, this, arguments, new.target); }
function swProfile(w, h, len, rad, mat, p, y, z) { return __ZC(446, 95, this, arguments, new.target); }
function swPanel2(w, h, mat, x, y, z, p, ry) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry || 0; p.add(m); return m; }
function swWheel(p, r, col, x, y, z, spoke) { return __ZC(446, 96, this, arguments, new.target); }
function swWheelsOf(g) { g.userData.wh = g.userData.wh || []; return g.userData.wh; }
function swBuffers(g, z, dir, beamCol) { return __ZC(446, 97, this, arguments, new.target); }
function swBogie(g, z, col) { var b = swG(0, 0, z, g); swB(0.15, 0.03, 0.13, null, 0, 0, 0.05, 0, b).material = swToyM(0x222226, "metal"); [-0.04, 0.04].forEach(function (dz) { [-1, 1].forEach(function (s) { swWheelsOf(g).push({ g: swWheel(b, 0.026, col || 0x2A2A2C, s * 0.075, 0.03, dz, true), r: 0.026 }); }); }); return b; }
function swLoco(p, E) { return __ZC(446, 98, this, arguments, new.target); }
function swTender(p, E) { return __ZC(446, 99, this, arguments, new.target); }
function swWagon(p, kind, n) { return __ZC(446, 100, this, arguments, new.target); }
function swJoinToy(g) { try {
if (typeof ctnMerge === "function")
ctnMerge(g);
}
catch (e) { } }
var SW_SCENERY = [["trees", "🌲 Woods and trees", "fir woods and leafy trees"], ["houses", "🏠 Village houses", "cottages, a terrace and their gardens"], ["station", "🚉 The station", "platform, booking hall, canopy, benches"], ["people", "🧍 Little people", "on the platform and out walking"],
["lamps", "💡 Lineside lamps", "lamps along the line"], ["signals", "🚦 Signals", "arms that drop as a train comes"], ["crossing", "🚧 Level crossing", "a road, gates that close for the train"], ["church", "⛪ Village church", "with its spire and churchyard"],
["farm", "🐄 A farm", "barn, silo, a paddock of sheep and cows"], ["windmill", "🌬️ A windmill", "its sails turn slowly"], ["shed", "🏭 Engine shed", "with its water tower and coal"], ["fields", "🌾 Fields and hedges", "a patchwork of crops"], ["castle", "🏰 A castle", "on its own green mound"]];
function swSceneryBuild(grp, lines, L, S) { return __ZC(446, 101, this, arguments, new.target); }
function swFigure(p, x, y, z, k) { return __ZC(446, 102, this, arguments, new.target); }
function swVcM(inst) { var k = "vcm" + (inst ? "i" : ""); if (SW_MATS[k])
return SW_MATS[k]; var m = new THREE.MeshLambertMaterial({ vertexColors: true }); m.userData.ldShared = 1; return (SW_MATS[k] = m); }
function swTreeGeo(kind) { return __ZC(446, 103, this, arguments, new.target); }
function swTrainsBuild(R) { return __ZC(446, 104, this, arguments, new.target); }
function swTrainPieces(D) { return __ZC(446, 105, this, arguments, new.target); }
function swTrainsTick(dt) { return __ZC(446, 106, this, arguments, new.target); }
function swPuff(R, loco) { return __ZC(446, 107, this, arguments, new.target); }
function swTrainCard() { return __ZC(446, 108, this, arguments, new.target); }
function swCabRide() { return __ZC(446, 109, this, arguments, new.target); }
function swCabTick(dt) {
var C = SW.cab, P = C.T.parts[0];
P.updateMatrixWorld(true);
var v = new THREE.Vector3(0, 0.3, -0.05);
P.localToWorld(v);
camera.position.copy(v);
var fy = P.rotation.y + (SW_ROOMS.trains.tbl.rotation.y || 0);
if (!C.look) {
yaw = fy + Math.PI;
}
}
function swCabOut() { var C = SW.cab; if (!C)
return; SW.cab = null; camera.position.set(C.back.x, C.back.y, C.back.z); yaw = C.back.yaw; worldPrompt(null); setStatus("🚂 You step out of the cab."); }
var SWB = { on: false, sc: null, cam: null, root: null, view: null, side: null, o: null, th: 0.7, ph: 1.0, r: 30, tg: null, ptrs: {}, down: null, ray: null, anim: [], t: 0, last: 0, geo: {}, mat: {}, narrow: false, e1: 0 };
function swBenchInit() { return __ZC(446, 110, this, arguments, new.target); }
function swBenchFrame() { return __ZC(446, 111, this, arguments, new.target); }
function swBenchOpen(title, o) { return __ZC(446, 112, this, arguments, new.target); }
SWB.own = function (m) { (SWB.owned = SWB.owned || []).push(m); return m; };
function swBenchSide(html, fns) { if (!SWB.side)
return; SWB.side.innerHTML = html; swBind(SWB.side, fns || {}); }
function swBenchClear() { return __ZC(446, 113, this, arguments, new.target); }
function swBenchClose() { var o = SWB.o; SWB.on = false; SWB.o = null; if (o && o.close)
try {
o.close();
}
catch (e) { } swBenchClear(); SWB.batches = null; }
function swBenchPointer(v) { return __ZC(446, 114, this, arguments, new.target); }
function swBenchZoom(k) { var o = SWB.o || {}; SWB.r = Math.max(o.rMin || 3, Math.min(o.rMax || 200, SWB.r * k)); }
function swBenchKey(e) { return __ZC(446, 115, this, arguments, new.target); }
function swBenchLook(tg, r, sec) { var a = SWB.tg.clone(), r0 = SWB.r; SWB.anim.push({ t: 0, d: sec || 0.9, f: function (k) { var e = k * k * (3 - 2 * k); SWB.tg.lerpVectors(a, tg, e); if (r)
SWB.r = r0 + (r - r0) * e; } }); }
function swBGeo(k) { return __ZC(446, 116, this, arguments, new.target); }
function swBMat(k) { return __ZC(446, 117, this, arguments, new.target); }
function swBatch(parent, P, ghost, mats) { return __ZC(446, 118, this, arguments, new.target); }
function swBatchDrop(list) { (list || []).forEach(function (im) { if (im.parent)
im.parent.remove(im); try {
if (im.dispose)
im.dispose();
}
catch (e) { } }); }
var SWK = {};
function swVox() { return __ZC(446, 119, this, arguments, new.target); }
function swPack(V) { return __ZC(446, 120, this, arguments, new.target); }
SW_BRICKCOLS.push([0x1E5A2A, "dark green"], [0xE8E4D8, "cream"], [0xA0D8F0, "window"]);
var SWC = { red: 0, blue: 1, yellow: 2, green: 3, white: 4, black: 5, grey: 6, brown: 7, orange: 8, lblue: 9, tan: 10, purple: 11, dgreen: 12, cream: 13, glass: 14 };
var SW_BRICK_DESIGNS = [
["flower", "A red flower", "a very first build", function (V) { swGenFlower(V); }],
["duck", "A little duck", "for a first build", function (V) { V.ell(0, 1.4, 0, 3.6, 1.6, 2.6, SWC.yellow); V.ell(2.4, 4.4, 0, 1.8, 1.5, 1.7, SWC.yellow, 3); V.box(4, 4, -1, 5, 4, 0, SWC.orange); V.set(3, 5, -2, SWC.black); V.set(3, 5, 1, SWC.black); V.box(-4, 2, -1, -4, 3, 0, SWC.yellow); }],
["pot", "A flower pot", "red flowers in a pot", function (V) { V.cyl(0, 0, 3.2, 0, 3, SWC.orange); V.cyl(0, 0, 3.6, 4, 4, SWC.orange); V.cyl(0, 0, 2.6, 4, 4, SWC.brown); V.box(-1, 5, -1, 0, 8, 0, SWC.green); V.ell(-0.5, 10, -0.5, 2.6, 1.4, 2.6, SWC.red); V.box(-1, 10, -1, 0, 10, 0, SWC.yellow); V.box(1, 6, -1, 2, 6, 0, SWC.green); V.box(-3, 7, -1, -2, 7, 0, SWC.green); }],
["car", "A little car", "blue, with its windows and wheels", function (V) { swGenCar(V); }],
["tree", "An apple tree", "with red apples", function (V) { swGenTree(V); }],
["train", "A steam train", "engine and tender on their track", function (V) { swGenTrain(V); }],
["cottage", "A cottage", "white walls, a red roof and a chimney", function (V) { swGenHouse(V, 0, 0, 16, 12, 7, { wall: SWC.white, corner: SWC.tan, roof: SWC.red, base: SWC.green, chim: 1, flowers: 1 }); }],
["ship", "A sailing ship", "three masts and white sails", function (V) { swGenShip(V); }],
["lighthouse", "A lighthouse", "red and white, on its rock", function (V) { swGenLighthouse(V); }],
["windmill", "A windmill", "sails, a cap and a field of corn", function (V) { swGenWindmill(V); }],
["shuttle", "A space shuttle", "on the launch pad, with its tank and boosters", function (V) { swGenShuttle(V); }],
["castle", "A castle", "towers, a gate and a keep", function (V) { swGenCastle(V); }],
["station", "A space station", "the crew ring, modules, solar wings and a docked ship", function (V) { swGenStation(V); }],
["town", "A whole town square", "a giant build: town hall, shops, flats, a park and the streets", function (V) { swGenTown(V); }],
["liner", "An ocean liner", "four funnels, decks of windows, lifeboats", function (V) { swGenLiner(V); }],
["harbour", "A harbour town", "quay, tall houses, a lighthouse, a ship, cranes and boats", function (V) { swGenHarbour(V); }],
["palace", "A palace", "the biggest: moat, towers, gatehouse, a tall keep and gardens", function (V) { swGenPalace(V); }]
];
function swPut(V, fn, dx, dy, dz, flip) { var W = swVox(); fn(W); for (var k in W.M) {
var a = k.split(","), x = +a[0], z = +a[2];
if (flip) {
var t = x;
x = z;
z = t;
}
V.set(x + dx, +a[1] + dy, z + dz, W.M[k]);
} }
function swGenFlower(V) { return __ZC(446, 121, this, arguments, new.target); }
function swGenCar(V) { return __ZC(446, 122, this, arguments, new.target); }
function swGenTree(V) {
V.box(0, 0, 0, 11, 0, 11, SWC.green);
V.box(5, 1, 5, 6, 7, 6, SWC.brown);
V.box(4, 1, 4, 7, 1, 7, SWC.brown);
V.ell(5.5, 11, 5.5, 5, 4.5, 5, SWC.dgreen, 7);
V.ell(5.5, 12, 5.5, 4, 3.5, 4, SWC.green, 8);
[[2, 10, 5], [9, 11, 3], [5, 13, 1], [8, 9, 9], [3, 12, 9], [6, 15, 6], [10, 10, 7]].forEach(function (a) { V.set(a[0], a[1], a[2], SWC.red); });
}
function swGenWindmill(V) { return __ZC(446, 123, this, arguments, new.target); }
function swGenLiner(V) { return __ZC(446, 124, this, arguments, new.target); }
function swGenStation(V) { return __ZC(446, 125, this, arguments, new.target); }
function swGenHarbour(V) { return __ZC(446, 126, this, arguments, new.target); }
function swGenPalace(V) { return __ZC(446, 127, this, arguments, new.target); }
function swGenHouse(V, x0, z0, W, D, H, o) { return __ZC(446, 128, this, arguments, new.target); }
function swGenTrain(V) { return __ZC(446, 129, this, arguments, new.target); }
function swGenLighthouse(V) { return __ZC(446, 130, this, arguments, new.target); }
function swGenShip(V) { return __ZC(446, 131, this, arguments, new.target); }
function swGenShuttle(V) { return __ZC(446, 132, this, arguments, new.target); }
function swGenCastle(V) { return __ZC(446, 133, this, arguments, new.target); }
function swGenTown(V) { return __ZC(446, 134, this, arguments, new.target); }
function swBrickParts(dk) { return __ZC(446, 135, this, arguments, new.target); }
SWK.bricks = { n: "Building bricks", i: "🧱", unit: 1, lh: 1.2,
designs: function () { return SW_BRICK_DESIGNS.map(function (d) { return { k: d[0], n: d[1], sub: d[2] }; }); },
parts: function (dk) { return swBrickParts(dk); },
render: function (P, on, ghost) { return __ZC(446, 136, this, arguments, new.target); },
describe: function (L) { return __ZC(446, 137, this, arguments, new.target); },
free: { sizes: [[1, 1], [1, 2], [1, 4], [2, 2], [2, 4]], cols: true, plate: 32 }
};
function swCabin(L, A, B, lv, o) { return __ZC(446, 138, this, arguments, new.target); }
var SW_LOG_DESIGNS = [
["shed", "A little log shed", "the smallest cabin, a first build", function (L) { swCabin(L, 3, 3, 6, {}); }],
["cabin", "A log cabin", "with a door, windows and a chimney", function (L) { swCabin(L, 6, 4, 10, { door: 1, win: 1, chim: 1 }); }],
["farm", "A farmhouse", "a long cabin with a porch roof", function (L) { swCabin(L, 9, 5, 12, { door: 1, win: 1, chim: 1 }); for (var i = 0; i < 5; i++)
L.push({ t: "post", x: -4.5 + i * 2.25, z: 3.6, h: 2.0 }); L.push({ t: "board", x: 0, y: 2.1, z: 3.3, len: 10, ang: 0.18, w: 1.6 }); }],
["bridge", "A log bridge", "two log cribs and a deck across", function (L) { return __ZC(446, 139, this, arguments, new.target); }],
["fort", "A frontier fort", "a stockade, a gate and a watchtower", function (L) { return __ZC(446, 140, this, arguments, new.target); }],
["village", "A frontier village", "four cabins, a barn and the fort: hundreds of logs", function (L) { return __ZC(446, 141, this, arguments, new.target); }]
];
function swLogParts(dk) { return __ZC(446, 142, this, arguments, new.target); }
var SW_LOGR = 0.2;
SWK.logs = { n: "Log cabins", i: "🪵",
designs: function () { return SW_LOG_DESIGNS.map(function (d) { return { k: d[0], n: d[1], sub: d[2] }; }); },
parts: function (dk) { return swLogParts(dk); },
render: function (P, on) { return __ZC(446, 143, this, arguments, new.target); },
describe: function (L) { return __ZC(446, 144, this, arguments, new.target); },
free: { logs: [1, 2, 3, 4, 6, 8] }
};
var SW_BLOCK_COLS = [0xE8CC98, 0xC0463A, 0x3A6AB0, 0xE8C048, 0x4A8A4A];
function swBl(L, s, x, y, z, ry, c) { L.push({ s: s, x: x, y: y, z: z, ry: ry || 0, c: c || 0 }); }
var SW_BLOCK_DESIGNS = [
["tower", "A tall tower", "cubes and long blocks, a roof on top", function (L) { for (var y = 0; y < 8; y++) {
if (y % 2 === 0) {
swBl(L, "long", 0, y, -0.5, 0, y % 4 ? 0 : 1);
swBl(L, "long", 0, y, 0.5, 0, y % 4 ? 0 : 1);
}
else {
swBl(L, "long", -0.5, y, 0, Math.PI / 2, 0);
swBl(L, "long", 0.5, y, 0, Math.PI / 2, 0);
}
} swBl(L, "roof", 0, 8, -0.5, 0, 1); swBl(L, "roof", 0, 8, 0.5, 0, 1); }],
["stairs", "A stepped pyramid", "one block less on every step", function (L) { for (var y = 0; y < 5; y++)
for (var x = -4 + y; x <= 4 - y; x += 1)
for (var z = -4 + y; z <= 4 - y; z += 1)
if (y === 4 || Math.abs(x) === 4 - y || Math.abs(z) === 4 - y)
swBl(L, "cube", x, y, z, 0, (x + z + y) % 5 === 0 ? 3 : 0); }],
["bridge", "An arched bridge", "two arches and a long deck", function (L) { return __ZC(446, 145, this, arguments, new.target); }],
["house", "A little house", "walls of long blocks, a door, a roof", function (L) { return __ZC(446, 146, this, arguments, new.target); }],
["gate", "A castle gate", "two towers and an arch between", function (L) { return __ZC(446, 147, this, arguments, new.target); }],
["temple", "A temple of pillars", "six pillars, a plank roof and a gable", function (L) { return __ZC(446, 148, this, arguments, new.target); }]
];
SWK.blocks = { n: "Wooden blocks", i: "🧸",
designs: function () { return SW_BLOCK_DESIGNS.map(function (d) { return { k: d[0], n: d[1], sub: d[2] }; }); },
parts: function (dk) { if (SWB.cache && SWB.cache.k === "blocks:" + dk)
return SWB.cache.P; var D = SW_BLOCK_DESIGNS.filter(function (d) { return d[0] === dk; })[0]; if (!D)
return null; var L = []; D[3](L); L.sort(function (a, b) { return a.y - b.y; }); L.forEach(function (q, i) { q.st = i; }); SWB.cache = { k: "blocks:" + dk, P: L }; return L; },
render: function (P, on) { return __ZC(446, 149, this, arguments, new.target); },
describe: function (L) { var nm = { cube: "cube", long: "long block", plank: "plank", pillar: "pillar", arch: "arch", roof: "roof block", half: "half round" }, cnt = {}; L.forEach(function (q) { var k = nm[q.s] || q.s; cnt[k] = (cnt[k] || 0) + 1; }); return Object.keys(cnt).map(function (k) { return "<div>" + cnt[k] + " × " + k + "</div>"; }).join(""); },
free: { shapes: ["cube", "long", "plank", "pillar", "arch", "roof"] }
};
function swBuildCard(kind) { return __ZC(446, 150, this, arguments, new.target); }
function swBuildKey(kind, dk) { return "b:" + kind + ":" + dk; }
function swBuildProgress(kind, dk, n) { var s = swLocalGet(swBuildKey(kind, dk)), on = new Uint8Array(n); if (s && typeof s.p === "string")
for (var i = 0; i < n && i < s.p.length; i++)
on[i] = s.p.charCodeAt(i) === 49 ? 1 : 0; return on; }
function swBuildKeep(kind, dk, on) { var s = ""; for (var i = 0; i < on.length; i++)
s += on[i] ? "1" : "0"; swLocalSet(swBuildKey(kind, dk), { p: s, at: Date.now() }); }
function swBuildStart(kind, dk) { return __ZC(446, 151, this, arguments, new.target); }
function swBuildStepNow(S) { for (var i = 0; i < S.P.length; i++)
if (!S.on[i])
return S.P[i].st; return -1; }
function swBuildStepList(S, st) { var L = []; S.P.forEach(function (q, i) { if (q.st === st && !S.on[i])
L.push(i); }); return L; }
function swBuildDraw(S) { return __ZC(446, 152, this, arguments, new.target); }
function swBuildPut(S, list) { return __ZC(446, 153, this, arguments, new.target); }
function swBuildSide(S) { return __ZC(446, 154, this, arguments, new.target); }
function swBuildDone(S) { return __ZC(446, 155, this, arguments, new.target); }
function swFreeBuild(kind) { return __ZC(446, 156, this, arguments, new.target); }
function swFreeDraw(S) { swBatchDrop(S.solid); S.solid = swBatch(SWB.root, SWK[S.kind].render(S.P, null, false)); clearTimeout(S.kt); S.kt = setTimeout(function () { swLocalSet(swBuildKey(S.kind, "free"), { P: S.P }); }, 1200); }
function swFreePiece(S, p, n, pi) { return __ZC(446, 157, this, arguments, new.target); }
function swBlockTop(q) { return q.y + ({ cube: 1, long: 1, plank: 0.33, pillar: 2, arch: 1, roof: 1, half: 0.5 }[q.s] || 1); }
function swFreeSide(S) { return __ZC(446, 158, this, arguments, new.target); }
var SW_DOMINO_RUNS = [
["line", "A straight line", "twenty in a row", function () { var L = []; for (var i = 0; i < 20; i++)
L.push([-5.5 + i * 0.58, 0]); return L; }],
["curve", "An S curve", "forty round two bends", function () { var L = []; for (var i = 0; i < 40; i++) {
var t = i / 39;
L.push([-7 + t * 14, Math.sin(t * Math.PI * 2) * 2.4]);
} return L; }],
["circle", "A circle", "all the way round", function () { var L = []; for (var i = 0; i < 48; i++) {
var a = i / 48 * Math.PI * 1.94;
L.push([Math.cos(a) * 4.4, Math.sin(a) * 4.4]);
} return L; }],
["heart", "A heart", "sixty dominoes in a heart", function () { var L = []; for (var i = 0; i < 64; i++) {
var t = i / 64 * Math.PI * 2;
L.push([16 * Math.pow(Math.sin(t), 3) * 0.32, -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.32]);
} return L; }],
["spiral", "The great spiral", "two hundred, winding in", function () { var L = [], a = 0, r = 9; while (r > 1.4 && L.length < 220) {
L.push([Math.cos(a) * r, Math.sin(a) * r]);
var da = 0.58 / r;
a += da;
r -= 0.07 * da * 6;
} return L; }]
];
function swDominoCard() { return __ZC(446, 159, this, arguments, new.target); }
var SW_DOM_COLS = [0xF4F0E8, 0xC0463A, 0x3A6AB0, 0xE8C048, 0x4A8A4A, 0x2A2A2E];
function swDominoStart(rk) { return __ZC(446, 160, this, arguments, new.target); }
function swDomDraw(S) { return __ZC(446, 161, this, arguments, new.target); }
function swDomPose(S) { return __ZC(446, 162, this, arguments, new.target); }
function swDomTick(S, dt) { return __ZC(446, 163, this, arguments, new.target); }
function swDomSide(S) { return __ZC(446, 164, this, arguments, new.target); }
function swDisplayRefresh(R) { return __ZC(446, 165, this, arguments, new.target); }
var SW_PAINTS = [[0xB8282A, "red"], [0xE85A2A, "orange"], [0xF2C230, "yellow"], [0xE8D8A0, "cream"], [0xF4F4F0, "white"], [0xA8ACB0, "silver grey"], [0x5A5E62, "dark grey"], [0x1E1E22, "black"],
[0x2A5A2A, "dark green"], [0x4A9A4A, "green"], [0x8AC86A, "light green"], [0x1E3A7A, "navy"], [0x2E6AC8, "blue"], [0x8AC0E8, "sky blue"], [0x2A9A9A, "teal"], [0x6A3A8A, "purple"],
[0xC86AA8, "pink"], [0x6A3A22, "brown"], [0xA87A4A, "tan"], [0xC8A048, "brass"], [0xE8C060, "gold"], [0x8A2A2A, "dark red"], [0xE8B8A0, "skin light"], [0x8A5A3A, "skin dark"]];
var SWG = {
box: function (w, h, d) { return new THREE.BoxGeometry(w, h, d); },
cyl: function (rt, rb, h, s) { return new THREE.CylinderGeometry(rt, rb, h, s || (SW.lite ? 12 : 20)); },
cylX: function (rt, rb, h, s) { return new THREE.CylinderGeometry(rt, rb, h, s || (SW.lite ? 12 : 20)).rotateZ(-Math.PI / 2); },
cylZ: function (rt, rb, h, s) { return new THREE.CylinderGeometry(rt, rb, h, s || (SW.lite ? 12 : 20)).rotateX(Math.PI / 2); },
sph: function (r, sx, sy, sz) { return new THREE.SphereGeometry(r, SW.lite ? 14 : 24, SW.lite ? 10 : 16).scale(sx || 1, sy || 1, sz || 1); },
cone: function (r, h, s) { return new THREE.ConeGeometry(r, h, s || (SW.lite ? 12 : 20)); },
coneX: function (r, h) { return new THREE.ConeGeometry(r, h, SW.lite ? 12 : 20).rotateZ(-Math.PI / 2); },
tyre: function (r, t) { return new THREE.TorusGeometry(r, t, SW.lite ? 8 : 12, SW.lite ? 16 : 28); },
lathe: function (pts, s) { return new THREE.LatheGeometry(pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), s || (SW.lite ? 14 : 28)); },
latheX: function (pts) { return SWG.lathe(pts).rotateZ(-Math.PI / 2); },
wing: function (pts, t) { var s = new THREE.Shape(); pts.forEach(function (p, i) { if (i)
s.lineTo(p[0], p[1]);
else
s.moveTo(p[0], p[1]); }); var g = new THREE.ExtrudeGeometry(s, { depth: t || 0.1, bevelEnabled: false }); g.rotateX(Math.PI / 2); g.translate(0, (t || 0.1) / 2, 0); return g; },
fin: function (pts, t) { var s = new THREE.Shape(); pts.forEach(function (p, i) { if (i)
s.lineTo(p[0], p[1]);
else
s.moveTo(p[0], p[1]); }); var g = new THREE.ExtrudeGeometry(s, { depth: t || 0.08, bevelEnabled: false }); g.translate(0, 0, -(t || 0.08) / 2); return g; },
arch: function (r, w) { var g = new THREE.CylinderGeometry(r, r, w, SW.lite ? 10 : 18, 1, true, Math.PI / 2, Math.PI); g.rotateX(Math.PI / 2); return g; },
sail: function (w, h, bulge) { var g = new THREE.PlaneGeometry(w, h, 8, 4), p = g.attributes.position; for (var i = 0; i < p.count; i++) {
var u = p.getX(i) / w + 0.5, v = p.getY(i) / h + 0.5;
p.setZ(i, Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 0.9 + 0.2) * (bulge || 0.3));
} g.computeVertexNormals(); return g; }
};
function swKit(steps) { var L = []; var P = function (st, zone, name, geo, x, y, z, rx, ry, rz) { L.push({ st: st, z: zone, n: name, geo: geo, p: [x || 0, y || 0, z || 0], r: [rx || 0, ry || 0, rz || 0] }); }; P.L = L; P.steps = steps; return P; }
var SW_KITS = [
["roadster", "An open roadster", "🚗", "a 1920s two-seater car", { body: 0xB8282A, trim: 0x1E1E22, tyre: 0x1A1A1A, chrome: 0xC8CCD0, seat: 0x6A3A22, glass: 0xA8C8E0 }, function () { return __ZC(446, 166, this, arguments, new.target); }],
["racer", "A racing car", "🏎️", "long, low and fast-looking", { body: 0x2E6AC8, trim: 0x1E1E22, tyre: 0x1A1A1A, chrome: 0xC8CCD0, helmet: 0xF2C230, glass: 0x1E1E22, white: 0xF4F4F0 }, function () { return __ZC(446, 167, this, arguments, new.target); }],
["fire", "A fire engine", "🚒", "with a long ladder and a hose reel", { body: 0xB8282A, trim: 0x1E1E22, tyre: 0x1A1A1A, chrome: 0xC8CCD0, glass: 0x8AC0E8, light: 0x2E6AC8, ladder: 0xF4F4F0 }, function () { return __ZC(446, 168, this, arguments, new.target); }],
["shuttle", "The space shuttle", "🚀", "standing on its pad, with the orange tank and two boosters", { stand: 0x5A5E62, tank: 0xC8622A, booster: 0xF4F4F0, body: 0xF4F4F0, trim: 0x1E1E22, engine: 0x5A5E62 }, function () { return __ZC(446, 169, this, arguments, new.target); }],
["rocket", "A moon rocket", "🌙", "three stages, very tall", { body: 0xF4F4F0, trim: 0x1E1E22, engine: 0x5A5E62, tower: 0xB8282A, stand: 0x5A5E62 }, function () { return __ZC(446, 170, this, arguments, new.target); }],
["biplane", "A biplane", "🛩️", "two wings, struts and a wooden propeller", { body: 0xF2C230, wing: 0xB8282A, strut: 0x6A3A22, tyre: 0x1A1A1A, prop: 0xA87A4A, chrome: 0xC8CCD0, pilot: 0x6A3A22 }, function () { return __ZC(446, 171, this, arguments, new.target); }],
["airliner", "An airliner", "✈️", "a big passenger plane", { body: 0xF4F4F0, wing: 0xA8ACB0, trim: 0x1E3A7A, engine: 0xA8ACB0, glass: 0x1E1E22, tail: 0x2E6AC8 }, function () { return __ZC(446, 172, this, arguments, new.target); }],
["ship", "A sailing ship", "⛵", "three masts and square sails", { hull: 0x6A3A22, deck: 0xA87A4A, mast: 0x6A3A22, sail: 0xF4EEDC, flag: 0xB8282A, trim: 0xF2C230 }, function () { return __ZC(446, 173, this, arguments, new.target); }],
["loco", "A steam engine", "🚂", "a tender engine with six big wheels", { body: 0x2A5A2A, trim: 0x1E1E22, wheel: 0xB8282A, chrome: 0xC8CCD0, brass: 0xC8A048, roof: 0x1E1E22 }, function () { return __ZC(446, 174, this, arguments, new.target); }],
["heli", "A helicopter", "🚁", "a rescue helicopter", { body: 0xE85A2A, glass: 0x8AC0E8, trim: 0x1E1E22, rotor: 0x5A5E62, chrome: 0xC8CCD0, white: 0xF4F4F0 }, function () { return __ZC(446, 175, this, arguments, new.target); }]
];
var SWD = {
spokes: function (P, st, zone, c, r0, r1, n, axis, th, off) { return __ZC(446, 176, this, arguments, new.target); },
ring: function (P, st, zone, name, geo, c, r, n, axis) {
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
if (axis === "x")
P(st, zone, name, geo, c[0], c[1] + Math.cos(a) * r, c[2] + Math.sin(a) * r);
else if (axis === "y")
P(st, zone, name, geo, c[0] + Math.cos(a) * r, c[1], c[2] + Math.sin(a) * r);
else
P(st, zone, name, geo, c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r, c[2]);
}
},
rod: function (P, st, zone, name, a, b, th) { return __ZC(446, 177, this, arguments, new.target); },
step: function (P, name) { P.steps.push(name); return P.steps.length - 1; }
};
var SW_KIT_MORE = {
roadster: { cols: { spoke: 0xC8CCD0, engine: 0x5A5E62, dash: 0x6A3A22, dial: 0xF4F4F0, lamp: 0xF2C230, spring: 0x1E1E22, plate: 0xF4F4F0 }, f: function (P) { return __ZC(446, 178, this, arguments, new.target); } },
racer: { cols: { light: 0xB8282A, susp: 0x1E1E22, disc: 0x5A5E62, caliper: 0xB8282A, pipe: 0xC8A048, belt: 0xB8282A, flap: 0x2E6AC8 }, f: function (P) { return __ZC(446, 179, this, arguments, new.target); } },
fire: { cols: { seat: 0x1E1E22, dial: 0xF4F4F0, valve: 0xC8A048, panel: 0xC8CCD0, hose: 0x1E1E22, amber: 0xE85A2A }, f: function (P) { return __ZC(446, 180, this, arguments, new.target); } },
shuttle: { cols: { tower: 0xB8282A, tile: 0x1E1E22, window: 0x1E1E22, ring: 0xA8622A, pod: 0xF4F4F0 }, f: function (P) { return __ZC(446, 181, this, arguments, new.target); } },
rocket: { cols: { white: 0xF4F4F0, tower: 0xB8282A, pipe: 0xC8CCD0, check: 0x1E1E22, window: 0x1E1E22, cable: 0x1E1E22 }, f: function (P) { return __ZC(446, 182, this, arguments, new.target); } },
biplane: { cols: { glass: 0x8AC0E8, trim: 0x1E1E22, rib: 0xF4EEDC, wire: 0x1E1E22, engine: 0x5A5E62, spoke: 0xC8CCD0, dial: 0xF4F4F0, tank: 0xC8CCD0 }, f: function (P) { return __ZC(446, 183, this, arguments, new.target); } },
airliner: { cols: { white: 0xF4F4F0, door: 0x1E3A7A, flap: 0xA8ACB0, gear: 0xC8CCD0, tyre: 0x1A1A1A, fan: 0x5A5E62, light: 0xB8282A }, f: function (P) { return __ZC(446, 184, this, arguments, new.target); } },
ship: { cols: { plank: 0xC8A070, rail: 0x6A3A22, rope: 0x3A2A1A, deadeye: 0x2A1A12, pin: 0xA87A4A, barrel: 0x8A5A32, boat: 0xF4EEDC, lantern: 0xF2C230, porthole: 0x1E1E22, band: 0x1E1E22 }, f: function (P) { return __ZC(446, 185, this, arguments, new.target); } },
loco: { cols: { glass: 0x8AC0E8, spoke: 0xB8282A, rod: 0xC8CCD0, gauge: 0xF4F4F0, brake: 0x1E1E22, step: 0x1E1E22, coal: 0x1E1E22, plate: 0xC8A048 }, f: function (P) { return __ZC(446, 186, this, arguments, new.target); } },
heli: { cols: { hub: 0x5A5E62, seat: 0x1E1E22, dial: 0xF4F4F0, winch: 0xF2C230, light: 0xF4F4F0, belt: 0xB8282A }, f: function (P) { return __ZC(446, 187, this, arguments, new.target); } }
};
SW_KITS.forEach(function (K) { var M = SW_KIT_MORE[K[0]]; if (!M)
return; for (var c in M.cols)
if (K[4][c] === undefined)
K[4][c] = M.cols[c]; var f = K[5]; K[5] = function () { var P = f(); try {
M.f(P);
}
catch (e) {
if (window.console)
console.warn("[stillwater] kit " + K[0], e);
} return P; }; });
var SW_KITN = {};
function swKitCount(K) { if (SW_KITN[K[0]])
return SW_KITN[K[0]]; var P = K[5](), n = P.L.length; P.L.forEach(function (p) { if (p.geo && p.geo.dispose)
p.geo.dispose(); }); return (SW_KITN[K[0]] = n); }
function swKitDef(k) { for (var i = 0; i < SW_KITS.length; i++)
if (SW_KITS[i][0] === k)
return SW_KITS[i]; return null; }
var SW_PLAIN = 0xBFC2C4;
function swFinMat(col, fin, own) {
var sh = fin === "metal" ? 130 : fin === "gloss" ? 80 : 6, sp = fin === "metal" ? 0xB8B8B8 : fin === "gloss" ? 0x4A4A4A : 0x0A0A0A;
if (!own)
return swShiny(col, sh);
var m = new THREE.MeshPhongMaterial({ color: col, shininess: sh, specular: sp, side: THREE.DoubleSide });
return m;
}
function swModelMesh(m) { return __ZC(446, 188, this, arguments, new.target); }
function swModelCard() { return __ZC(446, 189, this, arguments, new.target); }
function swPaintPick(S, h) { for (var i = 0; i < h.length; i++) {
var pi = h[i].object.userData.pi;
if (pi === undefined)
continue;
if (S.built !== undefined && S.parts[pi].st >= S.built)
continue;
return pi;
} return -1; }
function swPaintApply(S, pi) { return __ZC(446, 190, this, arguments, new.target); }
function swPaintHtml(S, fns) { return __ZC(446, 191, this, arguments, new.target); }
function swModelStart(k) { return __ZC(446, 192, this, arguments, new.target); }
function swModelShow(S) { S.meshes.forEach(function (m, i) { var st = S.parts[i].st; if (st < S.built) {
m.visible = true;
m.material = m.userData.mat;
}
else if (st === S.built) {
m.visible = true;
m.material = S.ghostM;
}
else
m.visible = false; }); }
function swModelFit(S) { return __ZC(446, 193, this, arguments, new.target); }
function swModelSide(S) { return __ZC(446, 194, this, arguments, new.target); }
var SW_FIGS = [
["knight", "A knight", "🛡️", function (P) { return __ZC(446, 195, this, arguments, new.target); }],
["dragon", "A dragon", "🐉", function (P) { return __ZC(446, 196, this, arguments, new.target); }],
["owl", "An owl", "🦉", function (P) { return __ZC(446, 197, this, arguments, new.target); }],
["fox", "A fox", "🦊", function (P) { return __ZC(446, 198, this, arguments, new.target); }],
["wizard", "A wizard", "🧙", function (P) { return __ZC(446, 199, this, arguments, new.target); }],
["tower", "A castle tower", "🏰", function (P) { return __ZC(446, 200, this, arguments, new.target); }]
];
function swFigDef(k) { for (var i = 0; i < SW_FIGS.length; i++)
if (SW_FIGS[i][0] === k)
return SW_FIGS[i]; return null; }
function swFigParts(k) { var F = swFigDef(k), L = []; F[3](function (z, n, geo, x, y, zz, rx, ry, rz) { L.push({ z: z, n: n, geo: geo, p: [x || 0, y || 0, zz || 0], r: [rx || 0, ry || 0, rz || 0] }); }); return L; }
function swFigureMesh(m) { return __ZC(446, 201, this, arguments, new.target); }
function swFigureCard() { return __ZC(446, 202, this, arguments, new.target); }
function swFigureStart(k) { return __ZC(446, 203, this, arguments, new.target); }
function swSculptBench(kind) { return __ZC(446, 204, this, arguments, new.target); }
function swPotteryBench() { return __ZC(446, 205, this, arguments, new.target); }
function swSandTable() { return __ZC(446, 206, this, arguments, new.target); }
var SW_PLANETS = [
["Mercury", 0.38, 0xA89888, 4, "The smallest planet, and the closest to the Sun. A day there is longer than its year."],
["Venus", 0.95, 0xE8C890, 6.2, "Wrapped in thick yellow clouds. It is the brightest thing in the night sky after the Moon."],
["Earth", 1, 0x3A7AC8, 8.4, "Our home. Seven tenths of it is water. It has one Moon."],
["Mars", 0.53, 0xC8603A, 10.6, "The red planet. Its red colour is rust in the dust. It has two tiny moons."],
["Jupiter", 2.6, 0xD8B890, 15, "The biggest planet: more than a thousand Earths would fit inside. The Great Red Spot is a storm bigger than the Earth."],
["Saturn", 2.2, 0xE8D8A8, 20, "Famous for its rings, made of ice and rock, some as small as sand and some as big as houses."],
["Uranus", 1.4, 0x9AD8E0, 24.5, "An ice giant that spins on its side, rolling round the Sun like a ball."],
["Neptune", 1.35, 0x4A6AE8, 28.5, "The farthest planet: deep blue, very cold and very windy. One year there is 165 of ours."]
];
function swPlanetTex(i) { return __ZC(446, 207, this, arguments, new.target); }
function swPlanets() { return __ZC(446, 208, this, arguments, new.target); }
function swPlanetHtml(i) { return __ZC(446, 209, this, arguments, new.target); }
function swPlanetFns(S) { return { s0: function () { S.sp = 0; }, s1: function () { S.sp = 0.5; }, s2: function () { S.sp = 2; }, all: function () { S.sel = -1; swBenchLook(new THREE.Vector3(), 62, 1.2); swBenchSide(swPlanetHtml(-1), swPlanetFns(S)); } }; }
var SW_PLACES = [["the Arctic", 66, 90, -180, 180, "The cold top of the world. Polar bears live on the sea ice."], ["Antarctica", -90, -62, -180, 180, "The cold bottom of the world, covered in ice. Penguins live on its coasts."],
["North America", 15, 72, -168, -52, "Canada, the United States and Mexico, with the Rocky Mountains and the Great Lakes."], ["South America", -56, 12, -82, -34, "The Amazon rainforest and the Andes mountains."],
["Europe", 36, 71, -10, 40, "Many countries close together: old castles, cathedrals and farms."], ["Africa", -35, 37, -18, 52, "The Sahara desert, the Nile river and the great grasslands with lions and elephants."],
["Asia", 5, 77, 40, 180, "The biggest continent: the Himalaya mountains, China, India and Japan."], ["Australia", -44, -10, 112, 154, "A continent and a country: kangaroos, koalas and the Great Barrier Reef."],
["the Pacific Ocean", -60, 60, -180, -80, "The biggest and deepest ocean of all."], ["the Pacific Ocean", -60, 60, 140, 180, "The biggest and deepest ocean of all."], ["the Atlantic Ocean", -60, 65, -70, -5, "Between the Americas and Europe and Africa."], ["the Indian Ocean", -60, 25, 40, 115, "Warm water between Africa, Asia and Australia."]];
function swGlobeCard() { return __ZC(446, 210, this, arguments, new.target); }
function swGlobeBtns() { return swBtn("spin", "🔄 Let it turn", "", { small: 1 }) + swBtn("stop", "⏸️ Hold it still", "", { small: 1 }); }
function swGlobeFns(S) { return { spin: function () { S.spin = true; }, stop: function () { S.spin = false; } }; }
function swArtUrl(k) { return SW_ART_DIR + k + ".jpg"; }
function swPuzzleKey(k, n) { return "pz:" + k + ":" + n; }
function swPuzzleCard() { return __ZC(446, 211, this, arguments, new.target); }
function swPuzzlePieces(k) { return __ZC(446, 212, this, arguments, new.target); }
function swPuzzleCut(A, n) { return __ZC(446, 213, this, arguments, new.target); }
function swPzEdge(c, x0, y0, x1, y1, t, j) { return __ZC(446, 214, this, arguments, new.target); }
function swPzPath(c, X, r, col, pw, ph, ox, oy) { return __ZC(446, 215, this, arguments, new.target); }
var SWZ = null;
function swPuzzleStart(k, n) { return __ZC(446, 216, this, arguments, new.target); }
function swPzFit(Z) { var r = Z.cv.getBoundingClientRect(), w = Z.W * 2.3, h = Z.H * 2.1; Z.sc = Math.min(r.width / w, (r.height - 50) / h); Z.ox = r.width / 2 - Z.W * Z.sc / 2; Z.oy = 50 + (r.height - 50) / 2 - Z.H * Z.sc / 2; Z.dirty = true; }
function swPzZoom(Z, k, cx, cy) { var s = Math.max(0.05, Math.min(6, Z.sc * k)); k = s / Z.sc; Z.ox = cx - (cx - Z.ox) * k; Z.oy = cy - (cy - Z.oy) * k; Z.sc = s; Z.dirty = true; }
function swPzPiece(Z, p) { return __ZC(446, 217, this, arguments, new.target); }
function swPzStamp(Z, p) { Z.bctx.drawImage(swPzPiece(Z, p), p.c * Z.pw - Z.m, p.r * Z.ph - Z.m); p.cv = null; }
function swPzPlace(Z, p) {
p.on = true;
p.x = p.c * Z.pw;
p.y = p.r * Z.ph;
var i = Z.order.indexOf(p);
if (i >= 0)
Z.order.splice(i, 1);
swPzStamp(Z, p);
if (Z.hint === p.i)
Z.hint = -1;
if (typeof playTone === "function" && swCalm().sound > 0.05)
try {
playTone(560 + ((p.i * 37) % 5) * 40, 0.05);
}
catch (e) { }
if (!Z.order.length)
swPuzzleDone(Z);
}
function swPzDraw(Z) { return __ZC(446, 218, this, arguments, new.target); }
function swPzBar(Z, bar) { return __ZC(446, 219, this, arguments, new.target); }
function swPuzzleKeepSoon() { var Z = SWZ; if (!Z)
return; clearTimeout(Z.kt); Z.kt = setTimeout(swPuzzleKeep, 1500); }
function swPuzzleKeep() { var Z = SWZ; if (!Z || !Z.ready)
return; var s = "", xs = [], ys = []; Z.P.forEach(function (p) { s += p.on ? "1" : "0"; xs.push(Math.round(p.x / Z.W * 1000)); ys.push(Math.round(p.y / Z.H * 1000)); }); swLocalSet(swPuzzleKey(Z.k, Z.n), { p: s, x: xs, y: ys }); }
function swPuzzleDone(Z) { return __ZC(446, 220, this, arguments, new.target); }
function swPuzzleWall(R, g) { return __ZC(446, 221, this, arguments, new.target); }
var SW_SOFT = [0x1E1E22, 0x5A5E62, 0xA8ACB0, 0xF4F4F0, 0xF2EEE4, 0xE8D8A0, 0xF2C230, 0xE89A3A, 0xE85A2A, 0xB8282A, 0xC86AA8, 0xE8A8C8, 0x6A3A8A, 0x9A8AD8, 0x1E3A7A, 0x2E6AC8, 0x8AC0E8, 0x2A9A9A, 0x2A5A2A, 0x4A9A4A, 0x8AC86A, 0x6A3A22, 0xA87A4A, 0xE8C8A0];
function swHex(c) { return "#" + (c >>> 0).toString(16).padStart(6, "0"); }
function swCss2() { return __ZC(446, 222, this, arguments, new.target); }
var SW_STAMPS = { map: ["🌲", "🌳", "🏠", "🏰", "⛰️", "🌊", "⛵", "🐑", "🌻", "⛪", "🌉", "🧭"], easel: ["☀️", "🌙", "⭐", "☁️", "🌸", "🦋", "🐦", "🌲"] };
function swPaintPanel(mode) { return __ZC(446, 223, this, arguments, new.target); }
function swGalleryRefresh(R, g) { return __ZC(446, 224, this, arguments, new.target); }
var SW_PATTERNS = {
heart: ["..11.11..", ".1111111.", "111111111", "111111111", ".1111111.", "..11111..", "...111...", "....1...."],
star: ["....1....", "....1....", "...111...", "111111111", ".1111111.", "..11111..", ".111.111.", "11.....11"],
flower: ["..2.2.2..", "..22222..", "..21112..", "..22222..", "..2.2.2..", "....3....", "..3.3....", "...33.3..", "....3.3..", "....3...."],
tree: ["....3....", "...333...", "..33333..", "...333...", "..33333..", ".3333333.", "3333333333", "....4....", "....4...."],
house: ["....1....", "...111...", "..11111..", ".1111111.", "111111111", ".5555555.", ".5665765.", ".5665565.", ".5555755.", ".5555755."],
cat: ["1.......1", "11.....11", "111111111", "1.11111.1", "111.1.111", "111111111", ".1111111.", "..11111.."],
boat: ["....1....", "....11...", "....111..", "....1111.", "....1....", "222222222", ".2222222.", "..22222.."],
butterfly: ["11.....11", "111...111", "1111.1111", "111111111", "..11111..", ".111.111.", "111...111", ".1.....1."]
};
var SW_PCOL = { 1: 0xB8282A, 2: 0xF2C230, 3: 0x4A9A4A, 4: 0x6A3A22, 5: 0xF2EEE4, 6: 0x8AC0E8, 7: 0x6A3A22 };
var SW_GRIDK = {
mosaic: { n: "Mosaic", i: "🟦", cols: 32, rows: 24, bg: "#B8B0A0", cell: 26, shape: "tile", pats: ["heart", "star", "flower", "tree", "house", "cat", "boat", "butterfly"] },
beads: { n: "Bead pattern", i: "📿", cols: 29, rows: 29, bg: "#E8E4DC", cell: 22, shape: "bead", pats: ["heart", "star", "flower", "cat", "butterfly"] },
weave: { n: "The loom", i: "🧵", cols: 40, rows: 30, bg: "#D8C8A8", cell: 18, shape: "weave", rowsOnly: true },
knit: { n: "Knitting", i: "🧶", cols: 30, rows: 36, bg: "#E8E0D0", cell: 20, shape: "knit", pats: ["heart", "star", "tree", "house", "cat"], rowWork: true },
stitch: { n: "Cross-stitch", i: "✖️", cols: 36, rows: 28, bg: "#F4F0E6", cell: 20, shape: "cross", pats: ["heart", "star", "flower", "house", "cat", "butterfly"] },
glass: { n: "Stained glass", i: "🪟", glass: true },
crochet: { n: "A granny square", i: "🔶", crochet: true }
};
function swGridCraft(kind) { return __ZC(446, 225, this, arguments, new.target); }
function swGlassCraft() { return __ZC(446, 226, this, arguments, new.target); }
function swCrochet() { return __ZC(446, 227, this, arguments, new.target); }
function swKnitCard() { return __ZC(446, 228, this, arguments, new.target); }
function swKnitRack() { return __ZC(446, 229, this, arguments, new.target); }
function swSortItems(kind) { return __ZC(446, 230, this, arguments, new.target); }
function swSortCard(kind) { return __ZC(446, 231, this, arguments, new.target); }
var SW_CONST = [
["The Great Bear (the Plough)", [[0.12, 0.2], [0.2, 0.22], [0.27, 0.25], [0.33, 0.3], [0.36, 0.4], [0.45, 0.42], [0.47, 0.31]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]], "Seven bright stars that look like a big ladle or a plough. The two at the end point to the North Star, which always stays in the same place."],
["Orion, the Hunter", [[0.62, 0.55], [0.72, 0.53], [0.65, 0.65], [0.67, 0.66], [0.69, 0.67], [0.63, 0.78], [0.73, 0.77]], [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]], "A giant hunter from the old Greek stories. Look for the three stars in a row: that is his belt."],
["Cassiopeia, the Queen", [[0.5, 0.08], [0.55, 0.15], [0.6, 0.1], [0.65, 0.17], [0.7, 0.11]], [[0, 1], [1, 2], [2, 3], [3, 4]], "Five stars in the shape of a W. In the old story she is a queen sitting on her throne."],
["The Swan", [[0.86, 0.18], [0.86, 0.28], [0.86, 0.4], [0.79, 0.27], [0.93, 0.29]], [[0, 1], [1, 2], [3, 1], [1, 4]], "A swan flying along the Milky Way, its long neck stretched out. People also call it the Northern Cross."],
["The Lion", [[0.24, 0.55], [0.29, 0.5], [0.34, 0.52], [0.36, 0.58], [0.3, 0.62], [0.44, 0.6], [0.47, 0.66]], [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6]], "A lion lying down. The stars of its head make a shape like a backwards question mark."],
["The Lyre", [[0.78, 0.5], [0.8, 0.56], [0.84, 0.56], [0.83, 0.62], [0.79, 0.62]], [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4]], "A small harp from the old stories. Its brightest star, Vega, is one of the brightest in the summer sky."],
["The Southern Cross", [[0.15, 0.78], [0.15, 0.9], [0.1, 0.84], [0.2, 0.83]], [[0, 1], [2, 3]], "Four bright stars in a cross, seen from the south half of the world. Sailors used it to find their way."]
];
function swStarCard() { return __ZC(446, 232, this, arguments, new.target); }
var SW_STORIES = [
["The Tortoise and the Hare", "🐢", ["A hare laughed at a tortoise for being slow.", "\"Let's have a race,\" said the tortoise.", "The hare ran fast and was soon far ahead. He thought, \"I have lots of time,\" and lay down for a nap.", "The tortoise kept walking, slowly and steadily, step after step.", "When the hare woke up, the tortoise was already at the finish.", "Slow and steady can get there in the end."]],
["The Lion and the Mouse", "🦁", ["A little mouse ran over a sleeping lion and woke him up.", "The lion caught the mouse in his paw. \"Please let me go,\" said the mouse. \"One day I may help you.\"", "The lion smiled and let him go.", "Later the lion was caught in a hunter's net. He could not get out.", "The mouse heard him, ran to the net, and nibbled the ropes until the lion was free.", "Little friends can be a great help."]],
["The Crow and the Jug", "🐦", ["A thirsty crow found a jug with a little water at the bottom.", "Her beak could not reach it.", "She thought, and thought. Then she picked up a pebble and dropped it in. Then another, and another.", "With every pebble the water rose a little higher.", "At last she could drink.", "Thinking calmly can solve a problem."]],
["The North Wind and the Sun", "☀️", ["The North Wind and the Sun saw a man walking in a coat.", "\"Let's see who can get his coat off,\" said the Wind.", "The Wind blew hard and cold. The man pulled his coat tighter.", "Then the Sun shone, gently and warmly.", "The man grew warm, and took off his coat by himself.", "Gentleness can do more than force."]],
["The Town Mouse and the Country Mouse", "🐭", ["A country mouse lived quietly in a field and ate seeds and barley.", "Her cousin from the town came to visit and said, \"Come and see my house: we eat cake!\"", "The town was busy and noisy. Just as they began to eat, a big dog barked and they had to hide.", "\"Thank you,\" said the country mouse, \"but I'll go home.\"", "She went back to her quiet field, and was happy there.", "A quiet, simple home can be best."]],
["The Ant and the Dove", "🕊️", ["An ant fell into a stream and could not get out.", "A dove saw her, and dropped a leaf into the water. The ant climbed onto it and floated safely to the bank.", "Later, a hunter was going to catch the dove.", "The ant saw, and gave the hunter's foot a little nip. He jumped, and the dove flew safely away.", "One kindness can bring another."]]
];
function swStoryCard() { return __ZC(446, 233, this, arguments, new.target); }
function swStoryRead(i) { return __ZC(446, 234, this, arguments, new.target); }
var SW_SCALE = [261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3];
function swNote(f, kind, dur) { return __ZC(446, 235, this, arguments, new.target); }
function swMusicPanel() { return __ZC(446, 236, this, arguments, new.target); }
function swHeadphones() { var C = swCalm(); SW.hush = !SW.hush; swAmbient(); setStatus(SW.hush ? "🎧 <b>Headphones on.</b> Everything is quiet now. Press E at the headphones again to take them off." : "🎧 Headphones off."); }
var SW_PICS = ["🍎", "🐟", "🌻", "🚂", "🐱", "⭐", "🌙", "🐢", "🦋", "🏠", "⛵", "🎈", "🍞", "🐴", "🌈", "🔔"];
function swMatchCard() { return __ZC(446, 237, this, arguments, new.target); }
function swMatchPlay(n, two) { return __ZC(446, 238, this, arguments, new.target); }
function swBingoCard() { return __ZC(446, 239, this, arguments, new.target); }
var SW_BAKES = [
["bread", "🍞", "A loaf of bread", [["🥣", "Put the flour in the bowl"], ["💧", "Add warm water and a little yeast"], ["🤲", "Knead the dough (press, fold, turn)", 6], ["⏳", "Let it rise under a cloth", 0, 8], ["🔥", "Into the warm oven", 0, 6], ["🍞", "Out it comes. Smell that!"]]],
["scones", "🧁", "Scones", [["🥣", "Flour, butter and a little sugar"], ["🥛", "Add the milk and stir"], ["🤲", "Pat the dough flat", 4], ["⭕", "Cut out round scones", 5], ["🔥", "Into the oven", 0, 6], ["🧁", "Done: with jam, if you like"]]],
["pie", "🥧", "An apple pie", [["🍎", "Choose the apples"], ["🔪", "Slice the apples (Hazel helps)", 5], ["🥣", "Roll out the pastry", 4], ["🥧", "Fill the pie and put the lid on"], ["🔥", "Into the oven", 0, 8], ["🥧", "A golden apple pie"]]],
["biscuits", "🍪", "Biscuits", [["🥣", "Butter and sugar in the bowl"], ["🥚", "Add an egg and the flour"], ["🤲", "Roll little balls", 6], ["👍", "Press them flat", 4], ["🔥", "Into the oven", 0, 5], ["🍪", "Biscuits! Let them cool"]]]
];
function swBakeCard() { return __ZC(446, 240, this, arguments, new.target); }
function swBakeDo(B) { return __ZC(446, 241, this, arguments, new.target); }
function swCalmDefaults() { return { sound: 0.6, music: 0.7, voices: 0.8, bright: 1, soft: false, slow: false, people: "all", big: false, read: false }; }
function swCalm() { var d = (typeof store !== "undefined" && store.sw && store.sw.calm) || {}, D = swCalmDefaults(); for (var k in D)
if (d[k] !== undefined)
D[k] = d[k]; return D; }
function swCalmSet(k, v) { var d = swData(); d.calm[k] = v; swSave(); swCalmApply(); }
function swCalmApply() { return __ZC(446, 242, this, arguments, new.target); }
function swCalmCard() { return __ZC(446, 243, this, arguments, new.target); }
function swPeopleFilter() {
if (typeof presenceOthers === "undefined")
return;
var on = typeof WLD !== "undefined" && WLD.on === SW_KEY, mode = on ? swCalm().people : "all";
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id];
if (!p || !p.group)
return;
var show = mode === "all" || (mode === "friends" && typeof pfState === "function" && pfState(id) === "friend");
if (!show) {
p.group.visible = false;
p.swHid = 1;
}
else if (p.swHid) {
p.swHid = 0;
p.group.visible = true;
}
});
}
if (typeof presenceTick === "function")
(function () { var pt = presenceTick; presenceTick = function () { var r = pt.apply(this, arguments); try {
swPeopleFilter();
}
catch (e) { } return r; }; })();
if (typeof cwxPace === "function")
(function () { var cp = cwxPace; cwxPace = function () { var r = cp.apply(this, arguments); try {
if (typeof WLD !== "undefined" && WLD.on === SW_KEY) {
r *= swCalm().slow ? 0.55 : 0.85;
if (SW.boat)
r *= 0.5;
if (SW.sit)
r = 0;
}
}
catch (e) { } return r; }; })();
var SWA = { on: false, nodes: null, birdT: null };
function swAmbient() { return __ZC(446, 244, this, arguments, new.target); }
function swAmbientStop() { if (!SWA.nodes)
return; try {
var t = audio.ctx.currentTime;
["water", "wind", "rain"].forEach(function (k) { SWA.nodes[k].g.gain.setTargetAtTime(0, t, 0.6); });
}
catch (e) { } SWA.on = false; }
function swBirdsong() { return __ZC(446, 245, this, arguments, new.target); }
function swAmbRoom(R) { swAmbient(); }
function swTodayList() { var d = swData(), T = d.today; if (T.day !== swToday()) {
d.today = { day: swToday(), pick: T.keep && Array.isArray(T.pick) ? T.pick : [], done: [], keep: !!T.keep };
} return d.today; }
function swDid(k) { try {
var T = swTodayList();
if (T.done.indexOf(k) < 0) {
T.done.push(k);
swSave();
}
if (T.pick.indexOf(k) >= 0) {
var it = swTodo(k);
setTimeout(function () { setStatus("✅ <b>Done:</b> " + (it ? it[1] + " " + esc(it[2]) : "") + ". Lovely."); }, 300);
}
swHud();
}
catch (e) { } }
function swTodayCard() { return __ZC(446, 246, this, arguments, new.target); }
function swHud() { return __ZC(446, 247, this, arguments, new.target); }
function swHomeAsk() { return __ZC(446, 248, this, arguments, new.target); }
function swPhrases() { return __ZC(446, 249, this, arguments, new.target); }
function swSayOut(t) { return __ZC(446, 250, this, arguments, new.target); }
function swShelfCard() { return __ZC(446, 251, this, arguments, new.target); }
function swMapTarget(k) { return __ZC(446, 252, this, arguments, new.target); }
function swTakeMe(k, inside) { return __ZC(446, 253, this, arguments, new.target); }
function swMapCard() { return __ZC(446, 254, this, arguments, new.target); }
function swFeedDucks(x, z) { return __ZC(446, 255, this, arguments, new.target); }
function swPonyCard() { return __ZC(446, 256, this, arguments, new.target); }
function swHensCard() { return __ZC(446, 257, this, arguments, new.target); }
var SW_CROPS = [["carrot", "🥕", "Carrots", 0xE8802A], ["sunflower", "🌻", "Sunflowers", 0xF2C230], ["tomato", "🍅", "Tomatoes", 0xC83A2A], ["bean", "🫘", "Runner beans", 0x4A9A4A], ["strawberry", "🍓", "Strawberries", 0xD83A4A]];
function swPlotCard() { return __ZC(446, 258, this, arguments, new.target); }
function swPlotShow() { return __ZC(446, 259, this, arguments, new.target); }
function swBoatIn(B) { return __ZC(446, 260, this, arguments, new.target); }
function swBoatOut() { var B = SW.boat; if (!B)
return; SW.boat = null; var hp = B.userData.home; swVeil(0.5, function () { B.position.set(hp.x, B.position.y, hp.z); B.rotation.y = hp.ry; var J = SW.jetty; camera.position.set(SW.base + J.x, J.y + 1.72, J.z0 - 3); worldPrompt(null); }); }
var SW_FISH = [["a perch", "with green stripes"], ["a roach", "silver, with red fins"], ["a small trout", "speckled and quick"], ["a carp", "golden and round"], ["a tench", "olive green and smooth"], ["a little bream", "flat and shiny"]];
function swFishCard() { return __ZC(446, 261, this, arguments, new.target); }
function swSitQuiet(R) { return __ZC(446, 262, this, arguments, new.target); }
function swStandUp() { var S = SW.sit; SW.sit = null; if (S)
camera.position.set(S.x, 1.72, S.z + 0.4); worldPrompt(null); setStatus("🛋️ You get up, slowly."); }
function swWatchFish() { return __ZC(446, 263, this, arguments, new.target); }
function swBreathe() { return __ZC(446, 264, this, arguments, new.target); }
function swMagnify() { return __ZC(446, 265, this, arguments, new.target); }
function swBlock(x, z, feet) { return __ZC(446, 266, this, arguments, new.target); }
function swBuild(G) { return __ZC(446, 267, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef(SW_KEY, {
base: SW.base, far: 1800, ownSky: true, tone: 196,
env: function (dt) { return swEnvNow(dt); },
build: function (G) { swBuild(G); },
enter: function (opt) { return __ZC(446, 268, this, arguments, new.target); },
leave: function () { return __ZC(446, 269, this, arguments, new.target); },
ground: function (x, z, feet) { if (SW.cab)
return camera.position.y - 1.72; if (SW.sit)
return camera.position.y - 1.72; if (SW.boat && x < SW_IN_X - 2000)
return SW_LAKE.y - 0.47; return swGround(x, z, feet); },
block: function (x, z, feet) { return swBlock(x, z, feet); },
tick: function (dt) { swTick(dt); },
back: function () { swHome(); }
});
function swGo(opt) { if (!swOpen() && !swKeeper()) {
setStatus("🍃 <b>" + SW_NAME + " is closed just now.</b> The Keeper will open it again soon.");
return false;
} return worldGo(SW_KEY, opt || {}); }
function swHome() { SW.boat = null; SW.sit = null; SW.cab = null; worldHome("🍃 <b>Back from " + SW_NAME + ".</b> Come back any time."); }
function swTick(dt) { return __ZC(446, 270, this, arguments, new.target); }
function swZoneName(x, z) { var best = "the meadows", bd = 1e9; for (var k in SW_AT) {
var A = SW_AT[k];
if (k === "lake" && !swInLake(x, z))
continue;
var d = Math.hypot(x - A.x, z - A.z) / (A.r || 30);
if (d < 1 && d < bd) {
bd = d;
best = A.name;
}
} return esc(best.charAt(0).toUpperCase() + best.slice(1)); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(SW_KEY) < 0)
WLG.keys.push(SW_KEY);
function swForget() { return __ZC(446, 271, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === SW_KEY)
swForget(); return r; }; })();
if (typeof wTalk === "function")
(function () { var wt = wTalk; wTalk = function (t) { try {
var Cf = swCfg();
if (typeof WLD !== "undefined" && WLD.on === SW_KEY && t && t.persona && (Cf.notes || Cf.helpers) && t.persona.indexOf("Stillwater Helpers") < 0) {
var c = {};
for (var k in t)
c[k] = t[k];
c.persona = t.persona + (Cf.notes && t.persona.indexOf(Cf.notes) < 0 ? " The Keeper of Stillwater asks: " + Cf.notes : "") + (Cf.helpers ? " If someone would like a real person to help them, the Stillwater Helpers are: " + Cf.helpers + "." : "");
t = c;
}
}
catch (e) { } return wt.apply(this, [t].concat([].slice.call(arguments, 1))); }; })();
var SWC_D = { door: null, on: null };
function swHallSpot() {
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
var a2 = (gaps[7] || gaps[gaps.length - 1] || gaps[0]).a;
return { x: h.x + Math.cos(a2) * 29.5, z: h.z + Math.sin(a2) * 29.5, a: a2 };
}
function swCityTick(dt) {
if (typeof WLD === "undefined")
return;
var show = (swOpen() || swKeeper()) && !WLD.on && !store.inside && walkMode, s = show ? swHallSpot() : null;
if (!s) {
if (SWC_D.door)
SWC_D.door.visible = false;
if (SWC_D.on) {
SWC_D.on = null;
worldPromptCity(null);
}
return;
}
if (!SWC_D.door) {
var g = new THREE.Group(), wood = new THREE.MeshLambertMaterial({ color: 0x7A9A7A }), frame = new THREE.MeshLambertMaterial({ color: 0xE8E0CC }), leaf = new THREE.MeshLambertMaterial({ color: 0x6A9A4A });
wBox(3.6, 0.3, 1.2, new THREE.MeshLambertMaterial({ color: 0xB8B0A0 }), 0, 0.15, 0, g);
wBox(0.3, 3.2, 0.4, frame, -1.4, 1.6, 0, g);
wBox(0.3, 3.2, 0.4, frame, 1.4, 1.6, 0, g);
var top = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.15, 8, 20, Math.PI), frame);
top.position.set(0, 3.2, 0);
g.add(top);
wBox(2.5, 3.2, 0.12, wood, 0, 1.6, -0.05, g);
var half = new THREE.Mesh(new THREE.CircleGeometry(1.25, 20, 0, Math.PI), wood);
half.position.set(0, 3.2, 0.02);
g.add(half);
var knob = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshPhongMaterial({ color: 0xC8A048, shininess: 80 }));
knob.position.set(0.8, 1.5, 0.12);
g.add(knob);
var tr = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 4.2, 8), new THREE.MeshLambertMaterial({ color: 0x6A5A42 }));
tr.position.set(2.6, 2.1, -0.4);
g.add(tr);
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2, fr = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 3.2, 6, 1, true), leaf);
fr.position.set(2.6 + Math.cos(a) * 0.9, 2.8, -0.4 + Math.sin(a) * 0.9);
g.add(fr);
}
var cap = new THREE.Mesh(new THREE.SphereGeometry(1.4, 10, 8), leaf);
cap.scale.y = 0.6;
cap.position.set(2.6, 4.4, -0.4);
g.add(cap);
var sg = wSign(["STILLWATER", "a calm place · press E"], 3.4, 0.75, "#E8F0E0", "#2E4A3A");
sg.position.set(0, 4.3, 0.1);
g.add(sg);
scene.add(g);
SWC_D.door = g;
}
var P = camera.position, dd = Math.hypot(P.x - s.x, P.z - s.z);
SWC_D.door.visible = true;
SWC_D.door.position.set(s.x, 0, s.z);
SWC_D.door.rotation.y = -s.a - Math.PI / 2;
if (dd < 3.6) {
if (SWC_D.on !== "door") {
SWC_D.on = "door";
worldPromptCity("🍃 <b>" + SW_NAME + "</b> · <b>press E</b> to go through the green door (a calm lakeside village)", function () { worldPromptCity(null); SWC_D.on = null; swGo({ from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } }); });
}
}
else if (SWC_D.on === "door") {
SWC_D.on = null;
worldPromptCity(null);
}
}
(function () { if (typeof transitTick !== "function")
return; var tt = transitTick; transitTick = function (dt) { tt(dt); try {
swCityTick(dt);
}
catch (e) {
if (!SW.e1) {
SW.e1 = 1;
if (window.console)
console.warn("stillwater city:", e);
}
} }; })();
function swMenu() { return __ZC(446, 272, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
var btn = document.getElementById("me-sw");
if (!btn) {
btn = document.createElement("button");
btn.className = "btn";
btn.id = "me-sw";
btn.title = SW_NAME;
btn.textContent = "🍃 Stillwater";
btn.onclick = function () { swMenu(); };
bar.appendChild(btn);
}
btn.style.display = (swOpen() || swKeeper()) ? "" : "none";
setTimeout(hook, 30000);
}
if (typeof document !== "undefined")
setTimeout(hook, 2200);
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-sw]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-sw", "1");
b.textContent = "🍃 " + SW_NAME;
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } swGo({}); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
}
})();
setTimeout(function () {
try {
var m = /[?&]ksw=([a-z0-9-]+)/.exec(location.search);
if (!m)
return;
var where = m[1];
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!swKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
swGo(where.indexOf("room-") === 0 ? { room: where.slice(5) } : (SW_AT[where] ? { at: where } : {}));
try {
var q = new URLSearchParams(location.search);
q.delete("ksw");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === SW_KEY; })) {
DGR_WORLDS.push([SW_KEY, SW_NAME + " (Always safe: a calm place, nothing here can hurt anyone)", 0, "safe"]);
if (typeof DGR_W !== "undefined")
DGR_W[SW_KEY] = { id: SW_KEY, name: SW_NAME, def: 0, group: "safe" };
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === SW_KEY; }))
try {
DK_PLACES.push([SW_KEY, SW_NAME]);
}
catch (e) { }
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list.swpebble)
return;
var sx = SW_LAKE.x + 34, sz = SW_LAKE.z - SW_LAKE.rz * 1.06;
var d = { k: "swpebble", name: "The Still Pebble", icon: "⚪", at: SW_KEY, seed: [sx, sz], spot: "rock", mark: 0xF4F4F0,
what: "a smooth white pebble among the reeds, perfectly round, a little warm", look: "It's quite white, with a faint spiral in it, like a tiny shell turned to stone long ago.", act: "Pick it up",
open: "It fits your palm exactly. Holding it, everything around seems to go a little slower and a little quieter: the reeds, the water, your own breathing.",
tale: "Old Ned says the lake gives one of these up every hundred years or so, always on the north shore where nobody walks. The spiral in it is a sea creature from long before there was a lake here, or a village, or anyone at all to find it. He says you can't buy one, and you can't keep one if you're in a hurry.",
rumour: "Old Ned says: on the far side of the lake, where there's no path and the reeds grow tall, the water sometimes leaves something white and round. Go slowly. Look carefully." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list.swpebble = d;
RA.order.push("swpebble");
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === "swpebble") {
var key = "swpebble@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots.swpebble;
if (c && c.key === key)
return c;
return (RA.spots.swpebble = { x: sx, z: sz, y: swGround(sx, sz), key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL.swpebble = function () {
var g = new THREE.Group();
var p = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 14), new THREE.MeshPhongMaterial({ color: 0xF4F2EC, shininess: 90, specular: 0x888888 }));
p.scale.y = 0.6;
p.position.y = 0.07;
g.add(p);
var glow = wGlow(0xF8F8FF, 0.45, 0.3);
glow.position.y = 0.08;
g.add(glow);
return { g: g, h: 0.15, anim: function (dt) { g.rotation.y += dt * 0.2; } };
};
if (typeof RA_POW !== "undefined")
RA_POW.swpebble = { n: "Still Water", col: 0xE8F0F8, cd: 45, pas: { speed: 1.0, regen: 1.4 },
act: [{ aoe: 18, slow: 10 }],
pasT: "Everything goes a little slower and quieter around you: you heal steadily.",
actT: "Still Water: a ring of calm spreads from you; everyone hostile within 18 m slows to a gentle walk for 10 seconds. Nobody is hurt." };
})();
function swTest() { return __ZC(446, 273, this, arguments, new.target); }
var SW_RICH = { oak: ["oak", 1.4], planks: ["planks", 2], velvet: ["velvet", 0.7], quilt: ["quilt", 0.9], damask: ["damask", 1.1], stucco: ["stucco", 3], limestone: ["limestone", 2.2],
ashlar: ["ashlar", 2.4], cotto: ["cotto", 1.1], terracotta: ["terracotta", 1.4], moss: ["moss", 2], deck: ["deck", 1.8], checker: ["checker", 1], darktile: ["darktile", 1], marble: ["marble", 2], slate: ["slate", 1.6], cave: ["cave", 2.5] };
function swRM(kind, col) { return __ZC(446, 274, this, arguments, new.target); }
function swRB(w, h, d, kind, col, x, y, z, p, ry) { return swAdd(swMetre(new THREE.BoxGeometry(w, h, d)), swRM(kind, col), x, y, z, p, ry); }
function swRC(rt, rb, h, kind, col, x, y, z, p, seg) { return swAdd(swMetre(new THREE.CylinderGeometry(rt, rb, h, seg || 16)), swRM(kind, col), x, y, z, p); }
function swCloth(col, kind) {
var k = "cloth|" + (kind || "") + "|" + col;
if (SW_MATS[k])
return SW_MATS[k];
var m = swRM(kind || "velvet", col);
if (m && m.clone && !m.side) {
m = m.clone();
m.side = THREE.DoubleSide;
m.userData = Object.assign({}, m.userData);
}
return (SW_MATS[k] = m);
}
var SW_VIEW = null;
function swViewTex() { return __ZC(446, 275, this, arguments, new.target); }
var SW_ARTS = {};
function swArtTex(k) { return __ZC(446, 276, this, arguments, new.target); }
function swPainting(g, x, y, z, ry, k, hgt) { return __ZC(446, 277, this, arguments, new.target); }
var SW_ART_HANG = ["sunflowers", "lilies", "bridge", "irises", "apples", "harvest", "poppies_m", "etretat", "louvre", "wanderer", "lilypond", "poppies_vg", "bedroom", "murnau", "sunrise", "rouen", "pearl", "wave"];
function swCurtains(g, x, y, z, ry, w, h, col) { return __ZC(446, 278, this, arguments, new.target); }
function swPotPlant(g, x, z, s, kind) { return __ZC(446, 279, this, arguments, new.target); }
function swSconce(g, x, y, z, ry) { return __ZC(446, 280, this, arguments, new.target); }
function swCushion(g, x, y, z, ry, col, s) { s = s || 1; var c = swAdd(new THREE.SphereGeometry(0.22 * s, 14, 10), swCloth(col, "velvet"), x, y, z, g); c.scale.set(1, 0.45, 0.85); c.rotation.y = ry || 0; c.rotation.z = 0.15; return c; }
function swVase(g, x, y, z, col) { return __ZC(446, 281, this, arguments, new.target); }
function swBookPile(g, x, y, z, n) { var R = wRand(Math.round(x * 31 + z * 17)); for (var i = 0; i < (n || 4); i++)
swB(0.24 + R() * 0.08, 0.04 + R() * 0.02, 0.17 + R() * 0.04, null, [0x7A2A2A, 0x2A4A6A, 0x3A5A3A, 0x6A5A2A, 0x5A3A5A][i % 5], x + (R() - 0.5) * 0.03, y + 0.025 + i * 0.05, z + (R() - 0.5) * 0.03, g).rotation.y = (R() - 0.5) * 0.3; }
function swClock(g, x, z, ry) { return __ZC(446, 282, this, arguments, new.target); }
function swFreeAt(R, lx, lz) { return !swSolidAt(R.x + lx, lz, 0.2); }
function swRich(R, g) { return __ZC(446, 283, this, arguments, new.target); }
(function () {
var R = SW_ROOMS.maps;
if (!R)
return;
R.w = 16;
R.d = 12;
R.h = 5;
R.win = 0;
R.wall = ["plaster", 0x8E9E86];
R.floor = ["wood", 0x8A5E3A];
R.panel = 0x6A4428;
R.art = false;
R.light = 0.95;
R.folkAt = [3.7, 1.9, -0.95];
R.say = "The living model of the whole village is on the great table: press E there to see every place and go to it. The map drawers, the globes, the telescope and the map desk are round the walls.";
R.f = function (R, g) {
var w = R.w, d = R.d, h = R.h;
[-3.3, 0, 3.3].forEach(function (x) {
swWindowIn(g, x, 2.55, -d / 2 + 0.02, 0, 1.7, 2.8);
R.wins.push({ x: x, y: 2.55, z: -d / 2 + 0.02, ry: 0, w: 1.7, h: 2.8 });
var arch = swAdd(new THREE.CircleGeometry(0.85, 24, 0, Math.PI), swViewTex(), x, 3.95, -d / 2 + 0.03, g);
arch.userData.keep = 1;
var ar = swAdd(new THREE.TorusGeometry(0.88, 0.05, 6, 24, Math.PI), swMat(null, 0xF2ECE0), x, 3.95, -d / 2 + 0.05, g);
});
var ws = swG(0, 0, -d / 2 + 0.45, g);
swRB(9.4, 0.5, 0.8, "oak", 0x6A4428, 0, 0.25, 0, ws);
swAdd(new THREE.BoxGeometry(9.2, 0.14, 0.74), swCloth(0x4E6A72, "velvet"), 0, 0.57, 0.02, ws);
for (var c = 0; c < 7; c++)
swCushion(ws, -4 + c * 1.35, 0.74, -0.2, 0, [0xC8A86A, 0x8A5A4A, 0x6A8A9A, 0xE8DCC0][c % 4], 1.1);
R.solid(0, -d / 2 + 0.45, 9.5, 0.9, 0.7);
R.spot(0, -d / 2 + 1.6, 2.4, "The window seat", "sit and look out over the lake", function () { setStatus("🪟 You sit in the window seat. The lake is very still this evening. The willows lean over the water, and the hills go blue in the distance."); swSay("You sit in the window seat. The lake is very still this evening."); }, "🪟");
var tl = swG(6.1, 0, -4.4, g, -0.5);
for (var l = 0; l < 3; l++) {
var a = l / 3 * 6.283, leg = swRC(0.025, 0.03, 1.5, "oak", 0x5A3820, Math.sin(a) * 0.32, 0.7, Math.cos(a) * 0.32, tl, 8);
leg.rotation.x = Math.cos(a) * 0.22;
leg.rotation.z = -Math.sin(a) * 0.22;
}
var tube = swRC(0.07, 0.1, 1.5, "brass", 0xD8B060, 0, 1.55, 0, tl, 18);
tube.rotation.x = 1.2;
swRC(0.11, 0.11, 0.12, "brass", 0xC8A048, 0, 1.55 + Math.cos(1.2) * 0.75, -Math.sin(1.2) * 0.75, tl, 18).rotation.x = 1.2;
R.round(6.1, -4.4, 0.45);
R.spot(6.1, -3.3, 1.6, "The brass telescope", "look out across the lake", function () { setStatus("🔭 Through the telescope: Old Ned's boats at the jetty, the ducks, the willows on the far shore, and the white dome of the Star Room up on its hill."); }, "🔭");
var gl = swG(-6.3, 0, -4.2, g);
for (var q = 0; q < 4; q++) {
var a2 = q / 4 * 6.283 + 0.785, lg = swRC(0.035, 0.05, 0.95, "oak", 0x5A3018, Math.sin(a2) * 0.42, 0.47, Math.cos(a2) * 0.42, gl, 8);
lg.rotation.x = Math.cos(a2) * 0.3;
lg.rotation.z = -Math.sin(a2) * 0.3;
}
var hz = swAdd(new THREE.TorusGeometry(0.62, 0.05, 8, 40), swRM("oak", 0x5A3018), 0, 0.95, 0, gl);
hz.rotation.x = Math.PI / 2;
var mer = swAdd(new THREE.TorusGeometry(0.6, 0.022, 8, 48), swRM("brass", 0xD8B060), 0, 1.1, 0, gl);
mer.rotation.y = 0.4;
mer.rotation.z = 0.41;
var tex = null;
try {
tex = new THREE.TextureLoader().load("assets/stillwater/world.jpg");
}
catch (e) { }
var globe = swAdd(new THREE.SphereGeometry(0.56, 40, 26), tex ? new THREE.MeshPhongMaterial({ map: tex, shininess: 30, specular: 0x333333 }) : swMat(null, 0x4A7AA8), 0, 1.1, 0, gl);
globe.rotation.z = 0.41;
globe.userData.keep = 1;
SW.globe = globe;
R.round(-6.3, -4.2, 0.75);
R.spot(-6.3, -3.0, 1.7, "The great globe", "spin it and learn about a place", function () { swGlobeCard(); }, "🌍");
var om = swG(-w / 2 + 0.06, 2.95, -1.2, g, Math.PI / 2);
swRB(3.9, 2.7, 0.08, "oak", 0x4A2E1A, 0, 0, 0, om);
swAdd(new THREE.BoxGeometry(3.74, 2.54, 0.09), swRM("brass", 0xC89A48), 0, 0, 0.01, om);
var omp = swAdd(new THREE.PlaneGeometry(3.6, 2.4), new THREE.MeshLambertMaterial({ map: swOldMapTex() }), 0, 0, 0.06, om);
omp.userData.keep = 1;
var pc = swG(-w / 2 + 0.5, 0, -1.2, g, Math.PI / 2);
swRB(2.8, 0.98, 0.9, "oak", 0x5A3820, 0, 0.49, 0, pc);
swRB(2.9, 0.05, 0.96, "oak", 0x4A2E1A, 0, 1.0, 0, pc);
for (var dr = 0; dr < 6; dr++) {
swRB(2.66, 0.13, 0.02, "oak", 0x6A4428, 0, 0.12 + dr * 0.145, 0.455, pc);
[-0.7, 0.7].forEach(function (x) { swB(0.18, 0.03, 0.03, null, 0, x, 0.12 + dr * 0.145, 0.48, pc).material = swRM("brass", 0xD8B060); });
}
for (var rl = 0; rl < 5; rl++) {
var roll = swC(0.045, 0.045, 0.9, null, [0xF0E6CC, 0xE8D8B0, 0xF4ECD8][rl % 3], -0.9 + rl * 0.2, 1.07, 0.05 - rl * 0.04, pc, 10);
roll.rotation.z = Math.PI / 2;
roll.rotation.y = 0.1 * (rl - 2);
}
var mg = swG(0.8, 1.03, 0.1, pc);
swC(0.08, 0.08, 0.01, null, 0, 0, 0, 0, mg, 20).material = swSee(0xE0F0FF, 0.45);
swC(0.012, 0.012, 0.16, null, 0xB8904A, 0.13, 0, 0, mg, 6).rotation.z = Math.PI / 2;
R.solid(-w / 2 + 0.5, -1.2, 1, 2.9, 1.2);
R.spot(-w / 2 + 1.5, -1.2, 1.8, "The map drawers", "look through the maps", function () { swMapDrawers(); }, "🗂️");
swBenchAt(R, g, -w / 2 + 0.9, 3.6, Math.PI / 2, "The map desk", "draw your own map", function () { swPaintPanel("map"); }, "✒️", function (t) { swB(0.7, 0.01, 0.5, null, 0xF0E6CC, 0, 0.82, 0, t); swC(0.03, 0.04, 0.06, null, 0x1A1A2A, -0.6, 0.85, 0.25, t, 10); var dv = swC(0.004, 0.004, 0.18, null, 0xB8B8C0, 0.3, 0.84, -0.1, t, 4); dv.rotation.z = 1.2; });
var st = swG(4.5, 0, 3.3, g);
swRB(2.7, 0.85, 1.9, "oak", 0x5A3820, 0, 0.42, 0, st);
swB(2.5, 0.08, 1.7, "sand", 0xD8C49A, 0, 0.88, 0, st);
for (var s2 = 0; s2 < 5; s2++) {
var hill = swS(0.18 + s2 * 0.04, 0xCCB88E, -0.8 + s2 * 0.4, 0.86, (s2 % 2 ? 0.3 : -0.3), st, 10);
hill.scale.y = 0.35;
}
R.solid(4.5, 3.3, 2.8, 2.0, 1.2);
R.spot(4.5, 4.8, 1.8, "The sand table", "shape hills, rivers and lakes", function () { swSandTable(); }, "🏝️");
[-4.1, 2.4].forEach(function (z) { swShelf(g, w / 2 - 0.25, z, -Math.PI / 2, 2.6, h - 0.6, 0x4A2E1A, swBooks); R.solid(w / 2 - 0.25, z, 0.5, 2.7, 4); });
var lad = swG(w / 2 - 0.65, 0, -4.1, g);
[-0.25, 0.25].forEach(function (x) { var r1 = swRB(0.05, 4.3, 0.06, "oak", 0x6A4428, 0, 2.1, x, lad); r1.rotation.z = 0.12; });
for (var rg = 0; rg < 12; rg++)
swC(0.02, 0.02, 0.5, "metal", 0xB8904A, -0.24 + rg * 0.033 + 0.04, 0.3 + rg * 0.34, 0, lad, 6).rotation.x = Math.PI / 2;
swFireplace(g, w / 2 - 0.3, -0.85, -Math.PI / 2);
R.solid(w / 2 - 0.3, -0.85, 0.7, 2.1, 1.6);
var mt = swG(w / 2 - 0.35, 1.42, -0.85, g, -Math.PI / 2);
var sh = swG(0, 0, 0.05, mt);
var hl = swS(0.14, 0x5A3820, 0, 0.08, 0, sh, 12);
hl.scale.set(3, 0.7, 1);
[-0.2, 0, 0.2].forEach(function (x, i) { swC(0.008, 0.008, 0.5 - i % 2 * 0.08, null, 0x3A2A1A, x, 0.33, 0, sh, 4); for (var sl = 0; sl < 2; sl++) {
var sa = swAdd(new THREE.PlaneGeometry(0.16, 0.12), swCloth(0xF2ECDC, "quilt"), x + 0.01, 0.22 + sl * 0.14, 0, sh);
} });
[-0.75, 0.75].forEach(function (x) { var cs = swG(x, 0, 0, mt); swC(0.04, 0.06, 0.04, null, 0xD8B060, 0, 0.02, 0, cs, 10); swC(0.022, 0.022, 0.2, null, 0xF4EEDC, 0, 0.14, 0, cs, 8); if (!SW.lite) {
var fl = wGlow(0xFFC870, 0.18, 0.6);
fl.position.y = 0.27;
cs.add(fl);
} });
var wm = swG(w / 2 - 0.06, 3.15, -0.85, g, -Math.PI / 2);
swRB(2.7, 1.5, 0.06, "oak", 0x4A2E1A, 0, 0, 0, wm);
swAdd(new THREE.BoxGeometry(2.58, 1.38, 0.07), swRM("brass", 0xC89A48), 0, 0, 0.01, wm);
var wmp = swAdd(new THREE.PlaneGeometry(2.48, 1.24), tex ? new THREE.MeshLambertMaterial({ map: tex }) : swMat(null, 0x4A7AA8), 0, 0, 0.05, wm);
wmp.userData.keep = 1;
swRug(g, w / 2 - 2.6, -0.85, 3, 3.6, 0x7A3A2A, 0xE8D0A0);
swArmchair(g, w / 2 - 2.6, -2.6, -0.9 + Math.PI / 2 + 1.2, 0x6A3A2A);
swArmchair(g, w / 2 - 2.6, 0.9, Math.PI / 2 + 0.3 + Math.PI / 2 + 0.2, 0x3A5A4A);
swTable(g, w / 2 - 3.1, -0.85, 0.6, 0.6, 0x5A3820, { h: 0.55 });
swBookPile(g, w / 2 - 3.1, 0.59, -0.85, 3);
R.solid(w / 2 - 2.6, -2.6, 0.9, 0.9, 1);
R.solid(w / 2 - 2.6, 0.9, 0.9, 0.9, 1);
var cg = swG(w / 2 - 1.1, 0, d / 2 - 1.2, g);
swRC(0.05, 0.14, 0.8, "oak", 0x5A3018, 0, 0.4, 0, cg, 10);
var cs2 = swAdd(new THREE.SphereGeometry(0.34, 28, 18), new THREE.MeshPhongMaterial({ map: swStarGlobeTex(), shininess: 40 }), 0, 1.12, 0, cg);
cs2.userData.keep = 1;
cs2.rotation.z = 0.4;
var cm = swAdd(new THREE.TorusGeometry(0.38, 0.015, 6, 40), swRM("brass", 0xD8B060), 0, 1.12, 0, cg);
cm.rotation.z = 0.4;
R.round(w / 2 - 1.1, d / 2 - 1.2, 0.45);
var wb = swG(-3.7, 1.75, d / 2 - 0.06, g, Math.PI);
swRB(2.4, 1.5, 0.05, "oak", 0x5A3820, 0, 0, 0, wb);
var cork = swAdd(new THREE.PlaneGeometry(2.24, 1.34), new THREE.MeshLambertMaterial({ map: swGoBoardTex() }), 0, 0, 0.03, wb);
cork.userData.keep = 1;
R.spot(-3.7, d / 2 - 1.2, 1.6, "Where shall I go?", "choose a place and go there", function () { swMapCard(); }, "📌");
var sc = swG(3.7, 1.9, d / 2 - 0.06, g, Math.PI);
swRB(1.7, 1.3, 0.05, "oak", 0x4A2E1A, 0, 0, 0, sc);
var scp = swAdd(new THREE.PlaneGeometry(1.56, 1.16), new THREE.MeshLambertMaterial({ map: swStarChartTex() }), 0, 0, 0.03, sc);
scp.userData.keep = 1;
var cr = swAdd(new THREE.CircleGeometry(1.5, 48), new THREE.MeshLambertMaterial({ map: swRoseTex(), transparent: true }), 0, 0.012, 3.4, g);
cr.rotation.x = -Math.PI / 2;
cr.userData.keep = 1;
var ch = swG(0, h - 1.15, -1.1, g);
[0, 1].forEach(function (i) { var rg2 = swAdd(new THREE.TorusGeometry(0.9 - i * 0.35, 0.03, 8, 40), swRM("brass", 0xD8B060), 0, -i * 0.25, 0, ch); rg2.rotation.x = Math.PI / 2; });
for (var ck = 0; ck < 3; ck++) {
var a3 = ck / 3 * 6.283, chn = swC(0.008, 0.008, 1.3, null, 0x6A5A3A, Math.sin(a3) * 0.5, 0.6, Math.cos(a3) * 0.5, ch, 4);
chn.rotation.x = Math.cos(a3) * 0.35;
chn.rotation.z = -Math.sin(a3) * 0.35;
}
for (var cn = 0; cn < 10; cn++) {
var a4 = cn / 10 * 6.283, rr = cn % 2 ? 0.55 : 0.9, yy = cn % 2 ? -0.25 : 0;
swC(0.02, 0.02, 0.14, null, 0xF4EEDC, Math.sin(a4) * rr, yy + 0.08, Math.cos(a4) * rr, ch, 8);
var fg = wGlow(0xFFD49A, 0.16, 0.7);
fg.position.set(Math.sin(a4) * rr, yy + 0.19, Math.cos(a4) * rr);
ch.add(fg);
}
swLivingModel(R, g, 0, -1.0);
R.spot(0, -1.0 + 2.6, 2.4, "The living model of Stillwater", "see every place, and go there", function () { swMapCard(); }, "🗺️");
R.spot(-3.7, -1.0, 2.0, "The living model of Stillwater", "see every place, and go there", function () { swMapCard(); }, "🗺️");
var bl = swG(-4.6, h - 1.3, 2.6, g);
var env = swS(0.38, 0xC85A3A, 0, 0, 0, bl, 18);
env.scale.y = 1.15;
for (var st2 = 0; st2 < 6; st2++) {
var stp = swAdd(new THREE.SphereGeometry(0.385, 18, 12, st2 / 6 * 6.283, 0.35), swMat(null, 0xF0D890), 0, 0, 0, bl);
stp.scale.y = 1.15;
}
swRC(0.09, 0.08, 0.12, "oak", 0x8A6A3A, 0, -0.62, 0, bl, 10);
SW.movers.push({ k: "swing", g: bl, ph: 1 });
swPotPlant(g, -5.2, -5.3, 1.1, "palm");
swPotPlant(g, 5.2, -5.5, 1, "fern");
};
})();
function swLivingModel(R, g, cx, cz) { return __ZC(446, 284, this, arguments, new.target); }
var SW_ICONS = {};
function swIconTex(ic) { return __ZC(446, 285, this, arguments, new.target); }
function swOldMapTex() { return __ZC(446, 286, this, arguments, new.target); }
function swGoBoardTex() { return __ZC(446, 287, this, arguments, new.target); }
var SW_CONST = [["The Plough", [[0.2, 0.2], [0.28, 0.22], [0.35, 0.26], [0.42, 0.27], [0.46, 0.36], [0.56, 0.36], [0.58, 0.27]]], ["Cassiopeia", [[0.62, 0.6], [0.68, 0.52], [0.74, 0.6], [0.8, 0.5], [0.86, 0.58]]], ["Orion", [[0.2, 0.62], [0.3, 0.6], [0.24, 0.72], [0.26, 0.73], [0.28, 0.74], [0.2, 0.86], [0.32, 0.85]]], ["The Swan", [[0.55, 0.7], [0.6, 0.78], [0.65, 0.86], [0.52, 0.8], [0.68, 0.76]]]];
function swStarChartTex() { return __ZC(446, 288, this, arguments, new.target); }
function swStarGlobeTex() { return __ZC(446, 289, this, arguments, new.target); }
function swRoseTex() { return __ZC(446, 290, this, arguments, new.target); }
function swMapDrawers() { return __ZC(446, 291, this, arguments, new.target); }
(function () {
var R = SW_ROOMS.quiet;
if (!R)
return;
R.w = 10;
R.d = 8;
R.h = 3.2;
R.wall = ["plaster", 0xC8C4D8];
R.floor = ["carpet", 0x7A86A0];
R.light = 0.42;
R.lightCol = 0xD8D4F0;
R.win = 1;
R.winSide = 1;
R.beams = false;
R.wainscot = false;
R.art = false;
R.light2 = false;
R.backPlants = false;
R.ceil = 0x2A3050;
R.curtain = 0x8A92B0;
R.say = "Only you (and your companion) can come in here. Lie on a bean bag, sit in the big chair, watch the fish or the bubbles, or breathe with the light. Nothing here changes quickly.";
R.f = function (R, g) {
var w = R.w, d = R.d, h = R.h;
var cp = swAdd(new THREE.PlaneGeometry(w - 0.1, d - 0.1), swRM("velvet", 0x8A94B0), 0, 0.015, 0, g);
cp.rotation.x = -Math.PI / 2;
[[0, -d / 2 + 0.08, w, 0], [-w / 2 + 0.08, 0, d, Math.PI / 2], [w / 2 - 0.08, 0, d, Math.PI / 2]].forEach(function (s) {
var p = swG(s[0], 0, s[1], g, s[3]);
var n = Math.round(s[2] / 1.1);
for (var i = 0; i < n; i++) {
var pad = swAdd(new THREE.BoxGeometry(s[2] / n - 0.06, 1.3, 0.1), swRM("quilt", [0xB8C8E0, 0xC8C0E0, 0xB8D8D0][i % 3]), -s[2] / 2 + (i + 0.5) * s[2] / n, 0.75, 0, p);
}
});
var sg = new THREE.Group();
sg.position.set(0, h - 0.02, 0);
g.add(sg);
var stars = wPoints(SW.lite ? 160 : 420, function () { return [(Math.random() - 0.5) * (w - 0.4), -0.01, (Math.random() - 0.5) * (d - 0.4)]; }, 0xE8ECFF, 0.035, true);
stars.material.opacity = 0.85;
sg.add(stars);
SW.qStars = sg;
swArmchair(g, -2.8, -1.9, 0.5, 0x6A7A9A);
for (var i = 0; i < 6; i++)
swB(0.9, 0.04, 0.6, null, [0x9AA8C8, 0xA8B8D8][i % 2], -2.8, 0.56 + i * 0.012, -1.8, g);
swCushion(g, -2.95, 0.85, -2.15, 0.5, 0xE8E0F0, 1.2);
R.solid(-2.8, -1.9, 1, 1, 1);
R.spot(-2.8, -0.9, 1.6, "The big soft chair (with a weighted blanket)", "sit and rest", function () { swSitQuiet(R); }, "🛋️");
[[-0.6, -2.2, 0x7A9AC8], [0.8, -2.6, 0xA890C8], [-1.2, 0.4, 0x8AC0B0]].forEach(function (b) { var bb = swAdd(new THREE.SphereGeometry(0.55, 18, 12), swCloth(b[2], "velvet"), b[0], 0.32, b[1], g); bb.scale.set(1.1, 0.55, 1); var dent = swAdd(new THREE.SphereGeometry(0.35, 14, 10), swCloth(swMix(b[2], 0x000000, 0.1), "velvet"), b[0], 0.5, b[1] + 0.15, g); dent.scale.set(1, 0.3, 0.9); R.round(b[0], b[1], 0.5); });
R.spot(0, -1.5, 1.8, "The bean bags", "lie back and rest", function () { setStatus("🫘 You sink into the bean bag. It holds you all the way round. Stay as long as you like."); swSay("You sink into the bean bag. Stay as long as you like."); }, "🫘");
var bt = swG(2.6, 0, -2.9, g);
swAdd(new THREE.CylinderGeometry(0.62, 0.66, 0.4, 24), swRM("quilt", 0xD8D8E8), 0, 0.2, 0, bt);
var col = new THREE.MeshBasicMaterial({ color: 0x9AC8F0, transparent: true, opacity: 0.45, depthWrite: false });
var tube = swAdd(new THREE.CylinderGeometry(0.2, 0.2, 2.3, 24, 1, true), col, 0, 1.55, 0, bt);
tube.userData.keep = 1;
var glass = swAdd(new THREE.CylinderGeometry(0.21, 0.21, 2.32, 24, 1, true), swSee(0xFFFFFF, 0.12), 0, 1.55, 0, bt);
glass.userData.keep = 1;
swC(0.24, 0.24, 0.08, "metal", 0xC8C8D0, 0, 2.74, 0, bt, 20);
var nb = SW.lite ? 14 : 30, bub = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), new THREE.MeshBasicMaterial({ color: 0xF4FAFF, transparent: true, opacity: 0.6, depthWrite: false }), nb);
bub.frustumCulled = false;
bub.userData.keep = 1;
bt.add(bub);
var BB = [];
for (var q = 0; q < nb; q++)
BB.push({ y: Math.random() * 2.2, x: (Math.random() - 0.5) * 0.24, z: (Math.random() - 0.5) * 0.24, r: 0.015 + Math.random() * 0.03, sp: 0.12 + Math.random() * 0.12, ph: Math.random() * 6 });
var bglow = wGlow(0x9AC8F0, 2.2, 0.25);
bglow.position.set(0, 1.6, 0);
bt.add(bglow);
SW.bubble = { m: col, glow: bglow, inst: bub, list: BB, t: 0 };
R.round(2.6, -2.9, 0.7);
R.spot(2.6, -1.9, 1.6, "The bubble tube", "watch the bubbles rise", function () { setStatus("🫧 The bubbles rise slowly, one after another. The light turns from blue to green to lilac, very slowly. Put your hand on the glass: it is cool and hums softly."); swSay("The bubbles rise slowly, one after another."); }, "🫧");
var fo = swG(1.4, 0, 0.6, g);
swC(0.14, 0.18, 0.18, null, 0x4A4A5A, 0, 0.09, 0, fo, 14);
var lp = [], tips = [], NS = SW.lite ? 40 : 110;
for (var s = 0; s < NS; s++) {
var a = s / NS * 6.283 * 3.1, r = 0.5 + ((s * 37) % 60) / 60 * 0.9, tx = Math.cos(a) * r, tz = Math.sin(a) * r;
lp.push(0, 0.17, 0, tx * 0.5, 0.12, tz * 0.5, tx * 0.5, 0.12, tz * 0.5, tx, 0.02, tz);
tips.push(tx, 0.03, tz);
}
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute(lp, 3));
var lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xC8D0F0, transparent: true, opacity: 0.5 }));
fo.add(lines);
var tg = new THREE.BufferGeometry();
tg.setAttribute("position", new THREE.Float32BufferAttribute(tips, 3));
var tp = new THREE.Points(tg, new THREE.PointsMaterial({ color: 0xB8D8FF, size: 0.05, transparent: true, opacity: 0.9, depthWrite: false }));
fo.add(tp);
SW.fibre = tp.material;
R.spot(1.4, 1.7, 1.5, "The soft light strands", "hold them, let them run through your fingers", function () { setStatus("✨ The strands are soft and cool and light as hair. Their tips glow gently. They change colour very slowly while you hold them."); }, "✨");
var tn = swG(-3.4, 0, 2.0, g);
var cl = swAdd(new THREE.ConeGeometry(1.25, 2.4, 20, 1, true), swCloth(0xE8E0D0, "quilt"), 0, 1.3, 0, tn);
var cl2 = swAdd(new THREE.ConeGeometry(1.24, 2.38, 20, 1, true, 0.5, 1.5), swSee(0xF4E8E0, 0.4), 0, 1.3, 0, tn);
swC(0.03, 0.03, 0.3, null, 0xE8D8B8, 0, 2.6, 0, tn, 6);
swAdd(new THREE.CircleGeometry(1.2, 20), swCloth(0xC8B8D8, "quilt"), 0, 0.02, 0, tn).rotation.x = -Math.PI / 2;
for (var cu = 0; cu < 5; cu++)
swCushion(tn, Math.cos(cu * 1.3) * 0.6, 0.16, Math.sin(cu * 1.3) * 0.6, cu, [0xE8C8D0, 0xC8D8E8, 0xF0E0B8, 0xC8E0C8, 0xD8C8E8][cu], 1.2);
for (var fl = 0; fl < 14; fl++) {
var fa = fl / 14 * 6.283, fy = 1.0 + 0.25 * Math.sin(fa * 2);
var fg = wGlow(0xFFE0A0, 0.12, 0.75);
fg.position.set(Math.cos(fa) * (1.25 - (fy - 0.1) * 0.52), fy, Math.sin(fa) * (1.25 - (fy - 0.1) * 0.52));
tn.add(fg);
}
R.spot(-2.6, 1.4, 1.5, "The little tent", "sit inside, among the cushions", function () { setStatus("⛺ Inside the tent it's soft and close and dim, with little steady lights. Nobody else can see in. Stay as long as you like."); swSay("Inside the tent it is soft and dim. Stay as long as you like."); }, "⛺");
var tk = swG(-0.2, 0, -d / 2 + 0.42, g);
swRB(2.6, 0.75, 0.7, "oak", 0x5A4A3A, 0, 0.37, 0, tk);
var gw = swAdd(new THREE.BoxGeometry(2.4, 1.0, 0.56), swSee(0x9AD8D0, 0.22), 0, 1.27, 0, tk);
gw.userData.keep = 1;
var wat = swAdd(new THREE.BoxGeometry(2.36, 0.9, 0.52), new THREE.MeshBasicMaterial({ color: 0x3A8A8A, transparent: true, opacity: 0.28, depthWrite: false }), 0, 1.22, 0, tk);
wat.userData.keep = 1;
swB(2.36, 0.08, 0.52, "sand", 0xD8C8A0, 0, 0.8, 0, tk);
for (var st = 0; st < 6; st++)
swS(0.06 + st % 3 * 0.02, 0x8A8478, -1 + st * 0.4, 0.84, 0.1 - st % 2 * 0.15, tk, 8);
for (var wd = 0; wd < 9; wd++) {
var weed = swLeafBall(tk, -1.05 + wd * 0.26, 0.95 + (wd % 3) * 0.08, -0.15, 0.06, 0x3A8A4A);
weed.scale.set(0.5, 2.8 + (wd % 3), 0.5);
}
SW.fish = [];
for (var f = 0; f < 8; f++) {
var fs = swG(0, 1.2, 0, tk), fc = [0xF08A3A, 0xF4D040, 0x5AA8F0, 0xE85A5A][f % 4], b = swS(0.045, fc, 0, 0, 0, fs, 10);
b.scale.set(1, 0.7, 2);
var tl = swK(0.04, 0.06, null, fc, 0, 0, -0.1, fs, 4);
tl.rotation.x = Math.PI / 2;
SW.fish.push({ g: fs, ph: f * 0.8, r: 0.7 + (f % 3) * 0.2, y: 1.05 + (f % 4) * 0.1, own: 1 });
}
swLight(0x8AE8D8, 0.35, 3.2, 0, 1.3, 0.5, tk, true);
R.solid(-0.2, -d / 2 + 0.42, 2.7, 0.8, 2);
R.spot(-0.2, -d / 2 + 1.5, 1.6, "The fish tank", "watch the fish", function () { swWatchFish(); }, "🐠");
var bt2 = swG(3.2, 0, 1.6, g);
swRC(0.35, 0.35, 0.06, "oak", 0x7A6A5A, 0, 0.45, 0, bt2, 20);
swC(0.05, 0.08, 0.42, null, 0x6A5A4A, 0, 0.21, 0, bt2, 10);
var bl = swS(0.18, 0, 3.2, 0.68, 1.6, g, 18);
bl.material = new THREE.MeshBasicMaterial({ color: 0xBFE0F0, transparent: true, opacity: 0.85 });
bl.userData.keep = 1;
var bg = wGlow(0xBFE0F0, 1.2, 0.35);
bg.position.set(3.2, 0.68, 1.6);
g.add(bg);
SW.breath = { m: bl, glow: bg };
R.round(3.2, 1.6, 0.4);
R.spot(3.2, 2.5, 1.5, "The breathing light", "breathe with it", function () { swBreathe(); }, "🫧");
(R.wins || []).forEach(function (Wn) {
var rg = swG(Wn.x, Wn.y, Wn.z, g, Wn.ry);
var rt = wTex(64, 256, function (c, W, H) { c.clearRect(0, 0, W, H); for (var i = 0; i < 40; i++) {
var x = (i * 23) % W, y = (i * 61) % H;
c.strokeStyle = "rgba(230,240,255,.55)";
c.lineWidth = 1;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + 1, y + 10 + (i % 4) * 6);
c.stroke();
c.fillStyle = "rgba(240,248,255,.6)";
c.fillRect(x, y + 14 + (i % 4) * 6, 2, 2);
} }, [2, 1]);
var rm = new THREE.MeshBasicMaterial({ map: rt, transparent: true, depthWrite: false });
var rp = swAdd(new THREE.PlaneGeometry(Wn.w, Wn.h), rm, 0, 0, 0.03, rg);
rp.userData.keep = 1;
SW.rain = rt;
});
R.amb = "rain";
};
})();
(function () {
var t0 = swTick;
swTick = function (dt) {
t0(dt);
var R = SW.room;
if (!R || R.k !== "quiet")
return;
var B = SW.bubble;
if (B) {
B.t += dt;
var hue = 0.58 + 0.12 * Math.sin(B.t * 2 * Math.PI / 90);
B.m.color.setHSL(hue, 0.55, 0.72);
B.glow.material.color.copy(B.m.color);
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3();
B.list.forEach(function (b, i) { b.y += b.sp * dt; if (b.y > 2.6)
b.y = 0.45; b.ph += dt; v.set(b.x + Math.sin(b.ph) * 0.03, 0.45 + b.y, b.z); s.setScalar(b.r); m4.compose(v, q, s); B.inst.setMatrixAt(i, m4); });
B.inst.instanceMatrix.needsUpdate = true;
}
if (SW.fibre) {
SW.fibre.color.setHSL(0.6 + 0.1 * Math.sin(SW.t * 2 * Math.PI / 70), 0.5, 0.78);
}
if (SW.qStars)
SW.qStars.rotation.y += dt * 0.004;
if (SW.rain)
SW.rain.offset.y += dt * 0.05;
};
})();
var SW_HOMES = {
home1: { who: ["Mabel Rowe", "f", "old", { top: 0x8A6A8A, bottom: 0x4A3A4A, hair: 0xE8E8E8, hairStyle: "bun" }, "a retired nurse who grows roses and keeps a big ginger cat called Marmalade"], paper: 0xE8D0C8, sofa: 0x8A4A4A, rug: [0x6A3A3A, 0xE8D0B0], extra: "roses" },
home2: { who: ["George Penn", "m", "old", { top: 0x4A5A4A, bottom: 0x3A3A3A, hair: 0xC8C8C8 }, "a retired clockmaker who mends clocks very slowly and carefully and likes to explain how they work"], paper: 0xC8D4C0, sofa: 0x3A5A4A, rug: [0x2A4A3A, 0xD8C8A0], extra: "clocks" },
home3: { who: ["Hannah Ashby", "f", "mid", { top: 0x6A8AB8, bottom: 0x4A4A5A, hair: 0x8A5A2A }, "a mother of two who makes jam and loves board games, and always has a spare biscuit"], paper: 0xE8E0C0, sofa: 0x5A6A9A, rug: [0x8A6A2A, 0xF0E0B0], extra: "toys" },
home4: { who: ["Nell Price", "f", "young", { top: 0x6A9A5A, bottom: 0x5A4A3A, hair: 0xC89A4A }, "a gardener who knows every bird by its song and keeps seed trays on every windowsill"], paper: 0xD8E4D0, sofa: 0x7A8A4A, rug: [0x4A6A3A, 0xE8E0C0], extra: "seeds" },
home5: { who: ["Ned's sister, Ivy", "f", "old", { top: 0x3A4A6A, bottom: 0x3A3A3A, hair: 0xD8D8D8 }, "Old Ned's sister, who mends fishing nets and tells slow stories about the lake"], paper: 0xC8D0D8, sofa: 0x3A4A6A, rug: [0x2A3A5A, 0xD8D0B8], extra: "sea", wood: true }
};
function swHomeFill(R, g, o) { return __ZC(446, 292, this, arguments, new.target); }
Object.keys(SW_HOMES).forEach(function (k) {
var o = SW_HOMES[k], H = swHouseDef(k);
if (!H)
return;
swRoomDef(k, { w: 10, d: 7.5, h: 3, wall: ["plaster", o.paper], wallRich: "damask", floor: ["wood", 0x8A6242], boards: "planks", light: 0.75, win: 1, wainscot: true, panel: 0x6A4A30, curtain: swMix(o.sofa, 0xFFFFFF, 0.25), noBackArt: true,
say: o.who[0] + " lives here. The kettle's on the range, if you'd like a cup of tea, and there's a seat by the fire.",
f: function (R, g) { swHomeFill(R, g, o); },
more: function (R) {
var W = o.who, look = Object.assign({}, W[3]);
look.sex = W[1];
R.person("home_" + k, 1.0, -0.2, -0.8, { look: look, sex: W[1], talk: { name: W[0], persona: SW_PERSONA + "You are " + W[0] + ", " + W[4] + ". You live in " + H[1] + " in Stillwater. Someone has come round to visit you at home.", greet: "Oh, hello. Come in, come in. I'm " + W[0].replace(/^(Mrs|Miss|Mr|Dr) /, "") + ". Would you like a cup of tea?" } });
if (k === "home3")
R.person("home_" + k + "_kid", -3.4, 1.6, 0.6, { look: { top: 0xE8C040, bottom: 0x3A6AC8, sex: "f" }, sex: "f", s: 0.62, talk: { name: "Pip Ashby", persona: SW_PERSONA + "You are Pip Ashby, a cheerful eight-year-old girl who loves building with blocks and drawing horses. Speak like a kind child, simply.", greet: "Hi! Do you want to see my drawing of a horse?" } });
}
});
});
SW_AT.sgarden = { x: -102, z: 26, r: 20, name: "the Sensory Garden" };
SW_AT.homes = { x: 0, z: 92, r: 30, name: "Willow Row" };
SW_AT.garden = SW_AT.sgarden;
(function () {
var p0 = swPaths;
swPaths = function () {
if (SW_PATHS)
return SW_PATHS;
var P = p0();
var S = SW_AT.sgarden;
P.push([[S.x, S.z - S.r + 1], [S.x, S.z - S.r - 6], [S.x + 4, -14]]);
P.push([[-12, 100], [0, 100]]);
P.push([[12, 100], [0, 100]]);
P.push([[-24.2, 80], [-10, 82.5], [0, 84]]);
P.push([[24.2, 80], [10, 82.5], [0, 84]]);
return P;
};
var f0 = swFlats;
swFlats = function () { if (SW_FLATS)
return SW_FLATS; var F = f0(); F.push([SW_AT.sgarden.x, SW_AT.sgarden.z, SW_AT.sgarden.r + 2]); return F; };
var t0 = swTreeOK;
swTreeOK = function (x, z, pad) { if (Math.hypot(x - SW_AT.sgarden.x, z - SW_AT.sgarden.z) < SW_AT.sgarden.r + 5)
return false; if (Math.hypot(x - SW_GREEN.x, z - SW_GREEN.z) < SW_GREEN.r + 12)
return false; return t0(x, z, pad); };
})();
var SWF = {};
function swBloomGeo(kind) { return __ZC(446, 293, this, arguments, new.target); }
function swBedsBuild(G, list) { return __ZC(446, 294, this, arguments, new.target); }
var SW_FCOL = { hollyhock: [0xF4B8C8, 0xE85A7A, 0xFFF0E0, 0xC83A5A, 0xF0D8A0], foxglove: [0xD898D8, 0xC870B8, 0xF4E8F0], lavender: [0x9A86D8, 0x8A78C8], rose: [0xE85A6A, 0xF4A8B8, 0xFFF4E8, 0xF0C870], daisy: [0xFFFFFF, 0xF4C8D8, 0xF0E070, 0xC8A8F0] };
function swFcol(k, i) { var L = SW_FCOL[k]; return L[i % L.length]; }
function swFrontGarden(G, k, beds, o) { return __ZC(446, 295, this, arguments, new.target); }
var SWV = { hedgeM: null };
function swKeepAll(o) { o.traverse(function (m) { if (m.isMesh)
m.userData.keep = 1; }); return o; }
function swBandstand(G) { return __ZC(446, 296, this, arguments, new.target); }
function swSensoryGarden(G, beds) { return __ZC(446, 297, this, arguments, new.target); }
function swMoreTrees(G) { return __ZC(446, 298, this, arguments, new.target); }
function swMoreLife(G) { return __ZC(446, 299, this, arguments, new.target); }
function swMoreThings(G) { return __ZC(446, 300, this, arguments, new.target); }
(function () {
var v0 = swVillage;
swVillage = function (G) {
v0(G);
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[stillwater] " + name, e);
} }
SWV.hedgeM = swMat(null, 0x355E28);
var beds = [];
step("gardens", function () {
swJoined(G, function (t) {
SW_HOUSES.forEach(function (H, i) {
var k = H[0];
if (H[6] === "dome" || H[6] === "barn" || k === "garden" || k === "maps" || k === "nature")
return;
swFrontGarden(t, k, beds, { hedge: H[6] === "stone" || H[6] === "brick" && i % 2, depth: H[3] === "lane" ? 4.2 : 5, kinds: i % 3 === 0 ? ["hollyhock", "rose", "lavender", "daisy"] : i % 3 === 1 ? ["foxglove", "hollyhock", "daisy", "lavender"] : ["hollyhock", "foxglove", "lavender", "daisy"] });
});
});
});
step("sensory garden", function () { swJoined(G, function (t) { swSensoryGarden(t, beds); }); });
step("bandstand", function () { swJoined(G, swBandstand); });
step("beds", function () { swBedsBuild(G, SW.lite ? beds.filter(function (b, i) { return i % 2 === 0; }) : beds); });
step("trees", function () { swMoreTrees(G); });
step("things", function () { swJoined(G, swMoreThings); });
step("life", function () { swMoreLife(G); });
};
var t0 = swTick;
swTick = function (dt) {
t0(dt);
if (!SW.built || SW.room)
return;
if (SWV.birds)
SWV.birds.children.forEach(function (b) { var u = b.userData; u.ph += dt * u.sp; b.position.set(u.cx + Math.cos(u.ph) * u.r, u.y + Math.sin(u.ph * 2) * 1.5, u.cz + Math.sin(u.ph) * u.r); b.rotation.y = -u.ph; var f = Math.sin(SW.t * 1.2 + u.ph * 9) * 0.12; b.children[0].rotation.z = 0.18 + f; b.children[1].rotation.z = -0.18 - f; });
if (SWV.smoke)
SWV.smoke.forEach(function (s) { var u = s.userData; u.t += dt; var k = (u.t % 10) / 10; s.position.set(u.x + k * 1.6, u.y0 + k * 6, u.z + k * 0.6); var sc = 0.8 + k * 3; s.scale.set(sc, sc, 1); s.material.opacity = 0.3 * Math.min(1, k * 4) * (1 - k); });
if (SWV.sheet)
SWV.sheet.rotation.y += dt * 0.05;
};
var f0 = swForget;
swForget = function () { f0(); SWV.birds = null; SWV.smoke = null; SWV.sheet = null; SWV.tall = null; SWV.tallM = null; SW.bubble = null; SW.fibre = null; SW.qStars = null; SW.rain = null; SW.globe = null; SW.fish = null; SW.breath = null; };
})();
function swFits(R, x, z, w, d) { var ok = true; [[0, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { if (!swFreeAt(R, x + c[0] * w / 2, z + c[1] * d / 2))
ok = false; }); return ok; }
function swPutIt(R, x, z, w, d, h, fn) { if (!swFits(R, x, z, w, d))
return false; fn(); R.solid(x, z, w, d, h || 1.2); return true; }
function swDresser(g, x, z, ry, wood) { return __ZC(446, 301, this, arguments, new.target); }
function swCoats(g, x, z, ry) { return __ZC(446, 302, this, arguments, new.target); }
function swPiano(g, x, z, ry) { return __ZC(446, 303, this, arguments, new.target); }
function swYarnWall(g, x, z, ry, w, h) { return __ZC(446, 304, this, arguments, new.target); }
function swSpinWheel(g, x, z, ry) { return __ZC(446, 305, this, arguments, new.target); }
function swBreadRack(g, x, z, ry) { return __ZC(446, 306, this, arguments, new.target); }
function swSacks(g, x, z) { for (var i = 0; i < 3; i++) {
var sk = swS(0.28, 0xE0D4B8, x + (i - 1) * 0.5, 0.3, z + (i % 2) * 0.1, g, 10);
sk.scale.set(0.9, 1.2, 0.75);
} }
function swGreenLamp(g, x, y, z) { return __ZC(446, 307, this, arguments, new.target); }
function swFramedBugs(g, x, y, z, ry) { var f = swG(x, y, z, g, ry); swRB(0.7, 0.55, 0.04, "oak", 0x4A2E1A, 0, 0, 0, f); swB(0.62, 0.47, 0.01, null, 0xF4EEDC, 0, 0, 0.025, f); for (var i = 0; i < 6; i++) {
var b = swButterfly(f, -0.2 + (i % 3) * 0.2, (i < 3 ? 0.1 : -0.1), 0.04, i);
b.rotation.x = Math.PI / 2;
b.userData.wl.rotation.z = 0.3;
b.userData.wr.rotation.z = -0.3;
} return f; }
function swMicroscope(g, x, y, z) { var m = swG(x, y, z, g); swB(0.14, 0.03, 0.18, null, 0x2A2A2A, 0, 0.015, 0, m); var arm = swC(0.02, 0.025, 0.24, "metal", 0x2A2A2A, 0, 0.14, -0.06, m, 8); arm.rotation.x = 0.3; var tube = swC(0.025, 0.02, 0.16, "brass", 0xC8A048, 0, 0.24, 0.0, m, 10); tube.rotation.x = -0.3; tube.material = swRM("brass", 0xC8A048); return m; }
(function () {
function more(k, fn) { var R = SW_ROOMS[k]; if (!R)
return; var m0 = R.more; R.more = function (R, g) { if (m0)
m0(R, g); try {
fn(R, g);
}
catch (e) {
if (window.console)
console.warn("[stillwater] extras " + k, e);
} }; }
more("welcome", function (R, g) {
var w = R.w, d = R.d;
swPutIt(R, w / 2 - 0.35, 1.45, 0.6, 1.8, 2.2, function () { swDresser(g, w / 2 - 0.35, 1.45, -Math.PI / 2); });
swCoats(g, 2.2, d / 2 - 0.05, Math.PI);
swPutIt(R, -w / 2 + 0.4, 1.4, 0.55, 0.55, 2.3, function () { swClock(g, -w / 2 + 0.4, 1.4, Math.PI / 2); });
swSofa(g, 0, 0.5, Math.PI, 0x6A7A5A, 2.2);
R.solid(0, 0.5, 2.3, 0.9, 1);
swCushion(g, -0.6, 0.82, 0.45, Math.PI, 0xE8D8B8);
swCushion(g, 0.6, 0.82, 0.45, Math.PI, 0xC8A86A);
swVase(g, 0, 0.5, -1.1, 0xE8E0F0);
swBookPile(g, 0.35, 0.49, -1.0, 2);
try {
swBeast("cat", R.x + 0.8, -2.0, 1.2, 0.55, 77, R.D, 0.02);
}
catch (e) { }
var mt = swG(0, 1.42, -4.2 + 0.05, g);
swClock(mt, 0, 0, 0).scale.setScalar(0.2);
[-0.7, 0.7].forEach(function (x) { swC(0.04, 0.05, 0.22, null, 0xC8A048, x, 0.11, 0, mt, 10); });
});
more("library", function (R, g) {
swPutIt(R, -2.3, 2.4, 2.6, 1.1, 1, function () { swTable(g, -2.3, 2.4, 2.4, 1.0, 0x5A3820); [-0.7, 0.7].forEach(function (x) { swGreenLamp(g, -2.3 + x, 0.82, 2.2); swChair(g, -2.3 + x, 3.2, Math.PI, 0x5A3820); }); swBookPile(g, -2.6, 0.82, 2.55, 3); swBookPile(g, -1.8, 0.82, 2.6, 2); });
var lad = swG(-1.6, 0, -3.7, g);
[-0.25, 0.25].forEach(function (x) { var r1 = swRB(0.05, 2.6, 0.06, "oak", 0x6A4428, x, 1.25, 0, lad); r1.rotation.x = -0.18; });
for (var rg = 0; rg < 7; rg++)
swC(0.02, 0.02, 0.5, "metal", 0xB8904A, 0, 0.3 + rg * 0.34, -0.05 - rg * 0.06, lad, 6).rotation.z = Math.PI / 2;
});
more("bakery", function (R, g) {
var w = R.w;
swPutIt(R, w / 2 - 0.4, -1.6, 0.5, 1.5, 2, function () { swBreadRack(g, w / 2 - 0.4, -1.6, -Math.PI / 2); });
swSacks(g, -3.6, -3.4);
R.solid(-3.6, -3.4, 1.6, 0.6, 0.8);
swPutIt(R, 3.2, 2.6, 2.0, 0.7, 1.1, function () { var c = swG(3.2, 0, 2.6, g); swRB(2, 0.95, 0.7, "oak", 0x7A5A3A, 0, 0.47, 0, c); swRB(2.05, 0.05, 0.75, "marble", 0xE8E4DC, 0, 0.97, 0, c); for (var i = 0; i < 3; i++) {
var cake = swC(0.14, 0.14, 0.1, null, [0xF0D8B0, 0x8A4A2A, 0xF4C8D8][i], -0.6 + i * 0.6, 1.05, 0, c, 16);
var dome = swAdd(new THREE.SphereGeometry(0.2, 16, 10, 0, 6.283, 0, Math.PI / 2), swSee(0xFFFFFF, 0.25), -0.6 + i * 0.6, 1.0, 0, c);
} });
for (var hb = 0; hb < 5; hb++) {
var bunch = swG(-2 + hb * 1, 2.9, -1.0, g);
swC(0.005, 0.005, 0.3, null, 0x6A5A3A, 0, 0.15, 0, bunch, 4);
swLeafBall(bunch, 0, -0.08, 0, 0.12, [0x6A8A4A, 0x8A9A5A, 0x5A7A3A][hb % 3]);
}
});
more("music", function (R, g) {
var w = R.w, d = R.d;
swPutIt(R, w / 2 - 0.45, 0.9, 0.7, 1.6, 1.4, function () { swPiano(g, w / 2 - 0.45, 0.9, -Math.PI / 2); swStool(g, w / 2 - 1.3, 0.9, 0x2A1A12); });
R.spot(w / 2 - 1.6, 0.9, 1.4, "The piano", "play the piano (every note sounds right)", function () { swMusicPanel(); }, "🎹");
var gs = swG(-1.4, 0, 1.6, g, 0.4);
var body = swS(0.2, 0xB8783A, 0, 0.55, 0, gs, 14);
body.scale.set(1, 1.3, 0.35);
var body2 = swS(0.15, 0xB8783A, 0, 0.85, 0, gs, 12);
body2.scale.set(1, 1, 0.35);
swB(0.06, 0.6, 0.03, null, 0x3A2A1A, 0, 1.2, 0.02, gs);
swC(0.05, 0.05, 0.02, null, 0x1A1A1A, 0, 0.62, 0.07, gs, 12).rotation.x = Math.PI / 2;
var ms = swG(0.4, 0, 1.4, g);
swC(0.01, 0.01, 1.2, "metal", 0x2A2A2A, 0, 0.6, 0, ms, 6);
var pg = swB(0.45, 0.32, 0.01, null, 0x2A2A2A, 0, 1.25, 0, ms);
pg.rotation.x = -0.3;
swB(0.4, 0.28, 0.005, null, 0xF4F0E6, 0, 1.26, 0.01, ms).rotation.x = -0.3;
});
more("barn", function (R, g) {
var w = R.w, d = R.d;
for (var l = 0; l < 4; l++) {
var lt = swG(-w / 2 + 2 + l * 3.6, 3.2, 0, g);
swC(0.005, 0.005, 1.2, null, 0x2A2A2A, 0, 0.6, 0, lt, 4);
swLantern(lt, 0, 0, 0);
}
var st = swG(-w / 2 + 0.2, 1.2, 2.6, g, Math.PI / 2);
for (var s2 = 0; s2 < 2; s2++) {
var sd = swS(0.3, 0x6A3A1A, -0.5 + s2 * 1.0, 0, 0.15, st, 12);
sd.scale.set(1, 0.5, 0.8);
swB(0.06, 0.06, 0.3, null, 0x3A2A1A, -0.5 + s2 * 1.0, -0.05, 0.0, st);
}
swPutIt(R, w / 2 - 1.3, 3.2, 1.4, 0.7, 0.8, function () { var wb = swG(w / 2 - 1.3, 0, 3.2, g, 0.3); swRB(1.0, 0.35, 0.6, "oak", 0x7A5A3A, 0, 0.5, 0, wb); swC(0.18, 0.18, 0.08, null, 0x2A2A2A, 0.6, 0.2, 0, wb, 14).rotation.z = Math.PI / 2; [-0.3, 0.3].forEach(function (z) { swB(0.9, 0.05, 0.05, "wood", 0x6A4A32, -0.6, 0.5, z, wb); }); swS(0.3, 0xD8C070, 0, 0.7, 0, wb, 10).scale.y = 0.5; });
for (var bk = 0; bk < 3; bk++)
swC(0.15, 0.12, 0.3, "metal", 0x8A8A8A, 2 + bk * 0.4, 0.15, -4.3, g, 12);
});
more("hall", function (R, g) {
var w = R.w, d = R.d;
swPutIt(R, w / 2 - 0.35, 1.6, 0.5, 2.4, 2.1, function () { swShelf(g, w / 2 - 0.35, 1.6, -Math.PI / 2, 2.4, 2.0, 0x6A4428, function (s, x0, W, y, j) { for (var q = 0; q < 5; q++)
swB(0.4, 0.07, 0.3, null, [0xC83A2A, 0x2A6AC8, 0xE8C040, 0x3A9A4A, 0xF0E8D8][(q + j) % 5], x0 + 0.25 + q * 0.45, y + 0.04 + ((q + j) % 2) * 0.07, 0, s); }); });
swPutIt(R, -w / 2 + 0.5, 2.4, 0.7, 1.6, 1.1, function () { var t = swTable(g, -w / 2 + 0.5, 2.4, 0.7, 1.6, 0x6A4428, { cloth: 0xF2ECE0 }); var urn = swC(0.16, 0.18, 0.45, "metal", 0xC8C8D0, -w / 2 + 0.5, 1.05, 2.0, g, 16); for (var c = 0; c < 6; c++)
swC(0.04, 0.03, 0.07, null, 0xF4F0E8, -w / 2 + 0.4 + (c % 2) * 0.2, 0.86, 2.4 + Math.floor(c / 2) * 0.25, g, 10); });
swPiano(g, -3, -d / 2 + 0.4, 0);
R.solid(-3, -d / 2 + 0.4, 1.6, 0.7, 1.4);
});
more("garden", function (R, g) { for (var p = 0; p < 8; p++)
swRC(0.12 - p * 0.004, 0.09, 0.18, "terracotta", 0xC8704A, 2.6, 0.09 + p * 0.14, -2.4, g, 12); });
more("pottery", function (R, g) { swPutIt(R, 2.4, 2.6, 1.6, 0.8, 1, function () { swTable(g, 2.4, 2.6, 1.6, 0.8, 0x6A5A4A); for (var b = 0; b < 3; b++)
swS(0.13, 0x9A7A5A, 2.0 + b * 0.4, 0.92, 2.6, g, 10).scale.y = 0.7; }); swCoats(g, -1.6, R.d / 2 - 0.05, Math.PI); });
more("stars", function (R, g) {
var w = R.w, d = R.d;
swRug(g, 0, 0, 7, 7, 0x1E2A4A, 0xC8A860);
for (var c = 0; c < 6; c++) {
var a = c / 6 * Math.PI * 2 + 0.3, x = Math.sin(a) * 3.6, z = Math.cos(a) * 3.6;
(function (x, z) { swPutIt(R, x, z, 0.9, 0.9, 1.0, function () { swArmchair(g, x, z, Math.atan2(-x, -z), [0x3A4A7A, 0x5A3A6A, 0x2A5A6A][c % 3]); }); })(x, z);
}
[[-w / 2 + 0.6, -d / 2 + 0.6], [w / 2 - 0.6, -d / 2 + 0.6], [-w / 2 + 0.6, d / 2 - 0.9], [w / 2 - 0.6, d / 2 - 0.9]].forEach(function (p) { swPutIt(R, p[0], p[1], 0.6, 0.6, 1.2, function () { swPotPlant(g, p[0], p[1], 1, "palm"); }); });
[-1, 1].forEach(function (s) { swPutIt(R, s * (w / 2 - 0.4), 0, 0.6, 2.2, 1, function () { swShelf(g, s * (w / 2 - 0.4), 0, s > 0 ? -Math.PI / 2 : Math.PI / 2, 2.2, 1.8, 0x3A2A22, function (sh, x0, W, y, j) { swBooks(sh, x0, W, y, j); }); }); });
});
more("barn", function (R, g) {
var w = R.w, d = R.d;
[[-w / 2 + 1.2, -d / 2 + 1.0], [-w / 2 + 2.6, -d / 2 + 0.9], [-w / 2 + 1.4, -d / 2 + 1.0]].forEach(function (p, i) { swPutIt(R, p[0], p[1] + (i === 2 ? 0 : 0), 1.2, 0.7, i === 2 ? 1.4 : 0.7, function () { var b = swRB(1.1, 0.6, 0.6, "thatch", 0xA88A48, p[0], i === 2 ? 0.9 : 0.3, p[1], g); }); });
swPutIt(R, w / 2 - 2.2, -d / 2 + 1.2, 1.8, 1.2, 1.0, function () { var c = swG(w / 2 - 2.2, 0, -d / 2 + 1.2, g); swRB(1.6, 0.3, 1.0, "oak", 0x7A5A3A, 0, 0.6, 0, c); [-1, 1].forEach(function (s) { var wh = swC(0.42, 0.42, 0.06, "wood", 0x5A3A22, s * 0.85, 0.42, 0, c, 16); wh.rotation.z = Math.PI / 2; wh.rotation.y = Math.PI / 2; }); swB(0.06, 0.06, 1.4, "wood", 0x6A4A32, 0, 0.5, 1.1, c); swS(0.35, 0xC85A2A, -0.3, 0.85, 0, c, 10); swS(0.3, 0xE8A040, 0.35, 0.85, 0.1, c, 10); });
swRug(g, 0, 0, 5, 3.5, 0x8A6A3A, 0xC8A860);
});
more("pottery", function (R, g) {
var w = R.w, d = R.d;
swPutIt(R, -w / 2 + 0.4, 0.8, 0.5, 2.4, 2.1, function () { swShelf(g, -w / 2 + 0.4, 0.8, Math.PI / 2, 2.4, 2.0, 0x6A4428, function (sh, x0, W, y, j) { for (var q = 0; q < 5; q++) {
var col = [0x3A6A8A, 0xC8704A, 0xE8E0D0, 0x6A8A4A, 0x9A4A3A][(q + j) % 5];
swRC(0.09, 0.07, 0.18 + ((q + j) % 3) * 0.05, "terracotta", col, x0 + 0.25 + q * 0.45, y + 0.12, 0, sh, 12);
} }); });
swRug(g, 0, 0.6, 4, 2.6, 0x7A4A3A, 0xE0C8A0);
swPutIt(R, w / 2 - 0.6, -d / 2 + 0.6, 0.6, 0.6, 1.2, function () { swPotPlant(g, w / 2 - 0.6, -d / 2 + 0.6, 1, "fern"); });
});
more("nature", function (R, g) {
var w = R.w, d = R.d;
[-1, 1].forEach(function (s) { swFramedBugs(g, s * (w / 2 - 0.04), 2.1, -1.6, s > 0 ? -Math.PI / 2 : Math.PI / 2); swFramedBugs(g, s * (w / 2 - 0.04), 2.1, 0.6, s > 0 ? -Math.PI / 2 : Math.PI / 2); });
swMicroscope(g, -2.0, 0.82, 1.0);
swPutIt(R, 4.6, -1.4, 1.0, 0.6, 1.3, function () { var t = swG(4.6, 0, -1.4, g); swRB(1.0, 0.8, 0.6, "oak", 0x5A3820, 0, 0.4, 0, t); var tq = swAdd(new THREE.BoxGeometry(0.9, 0.5, 0.5), swSee(0xD8F0E8, 0.25), 0, 1.05, 0, t); for (var f = 0; f < 6; f++)
swLeafBall(t, -0.3 + f * 0.12, 0.9, 0, 0.1, 0x3E8A3A); });
var am = swG(0, 2.2, -d / 2 + 0.06, g);
var sh = swAdd(new THREE.TorusGeometry(0.22, 0.09, 10, 28, Math.PI * 1.8), swRM("limestone", 0xC8B898), 0, 0, 0.08, am);
swRB(0.7, 0.7, 0.04, "oak", 0x4A2E1A, 0, 0, 0, am);
});
more("knit", function (R, g) {
var w = R.w, d = R.d;
swPutIt(R, w / 2 - 0.25, -1.2, 0.45, 2.2, 2.2, function () { swYarnWall(g, w / 2 - 0.25, -1.2, -Math.PI / 2, 2.2, 2.0); });
swPutIt(R, -3.2, 1.8, 1.0, 0.5, 1.2, function () { swSpinWheel(g, -3.2, 1.8, 0.3); });
var ql = swG(-w / 2 + 0.06, 1.9, -0.6, g, Math.PI / 2);
swAdd(new THREE.PlaneGeometry(1.8, 1.4), swCloth(0xE8C8C0, "quilt"), 0, 0, 0.02, ql);
swRB(1.9, 0.05, 0.05, "oak", 0x5A3820, 0, 0.72, 0.04, ql);
});
})();
function swSwFree(x, z, r) {
var y = swLand(x, z);
if (y < SW_LAKE.y + 0.3)
return false;
for (var a = 0; a < 6; a++) {
var px = x + Math.cos(a * 1.047) * r, pz = z + Math.sin(a * 1.047) * r;
if (swSolidAt(px, pz, y + 0.3))
return false;
if (swLand(px, pz) < SW_LAKE.y + 0.2)
return false;
}
return !swSolidAt(x, z, y + 0.3);
}
function swSwBench(P, x, z, ry) { return __ZC(446, 308, this, arguments, new.target); }
function swSwAngler(P, x, z, ry, seed) { return __ZC(446, 309, this, arguments, new.target); }
function swSwEasel(P, x, z, ry, seed) { return __ZC(446, 310, this, arguments, new.target); }
function swSwPlace(G, cx, cz, o, seed) { return __ZC(446, 311, this, arguments, new.target); }
function swSweep(G) { return __ZC(446, 312, this, arguments, new.target); }
(function () {
if (typeof swVillage !== "function")
return;
var v = swVillage;
swVillage = function (G) { var r = v.apply(this, arguments); try {
swSweep(G);
}
catch (e) {
if (window.console)
console.warn("[stillwater] sweep", e);
} return r; };
})();
