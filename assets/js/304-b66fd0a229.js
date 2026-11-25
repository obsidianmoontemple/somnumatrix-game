/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GW = { base: -440000, solids: [], badge: [], floors: [], rooms: [], nodes: [], talk: [], spots: [], people: [], animals: [], ins: {}, spin: [], bees: [], flies: null, rain: null,
built: false, t: 0, lastSeason: "", lastMonth: -1, near: null, picked: {}, busy: false, hud: null, wx: "clear", watered: {}, can: false, day: { units: 0, cap: 80 }, seen: {}, mother: null, lessonAt: {}, lecterns: [], G: null, basket: {}, trees: [], grain: [], hives: [], lamps: [] };
var GW_LITE = (typeof LITE !== "undefined" && LITE);
var GW_KEY = "The Greenwold Gate";
function gwMonth() { return new Date().getMonth() + 1; }
function gwSeason(m) { m = m || gwMonth(); return m === 12 || m <= 2 ? "winter" : m <= 5 ? "spring" : m <= 8 ? "summer" : "autumn"; }
function gwRipe(c, m) { if (!c)
return false; if (c.gl || !c.m || !c.m.length)
return true; return c.m.indexOf(m || gwMonth()) >= 0; }
var GW_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function gwNextRipe(c) { var m = gwMonth(); for (var i = 1; i <= 12; i++) {
var k = ((m - 1 + i) % 12) + 1;
if (c.m.indexOf(k) >= 0)
return GW_MONTHS[k - 1];
} return ""; }
function gwMonthsText(c) { if (c.gl || !c.m || !c.m.length)
return "all year"; var a = c.m, s = GW_MONTHS[a[0] - 1], e = GW_MONTHS[a[a.length - 1] - 1]; return a.length === 1 ? s : s + " to " + e; }
function gwWeather() { try {
return typeof cwxNow === "function" ? cwxNow() : "clear";
}
catch (e) {
return "clear";
} }
var GW_WX_LINE = { clear: "Clear skies: the beds dry out slowly; water them at the well for a quicker crop.", rain: "Rain: every bed outdoors is watered, and the garden gives a little more.",
storm: "A storm: the bees stay in their hives, and the wind brings down windfalls in the orchards.", snow: "Snow: the outdoor beds grow slowly; the glasshouses are warm.",
fog: "Fog over the fields: soft and still.", wind: "High wind: the windmill turns fast.", heat: "A heat wave: the beds dry out fast. Water them at the well, or they give less." };
function gwRegrow(n) {
var c = GW_CROP[n.crop];
if (!c)
return 30;
var g = c.g, w = GW.wx, out = !n.glass && c.f !== "farm";
if (out && w === "rain")
g *= 0.75;
if (out && (w === "heat" || w === "clear") && !GW.watered[n.id])
g *= w === "heat" ? 1.3 : 1.1;
if (out && GW.watered[n.id])
g *= 0.8;
if (out && w === "snow")
g *= 1.5;
return g;
}
var GW_SITES = [
["door", 0, 150, 14, "the Green Door"], ["village", 0, 92, 42, "the Village Green"], ["heartwood", 0, 8, 34, "the Heartwood"],
["garden", 112, 30, 54, "the Market Garden"], ["glass", 112, 130, 36, "the Glasshouses"], ["physic", 170, 116, 20, "the Physic Garden"],
["orchard", 132, -132, 78, "the Orchards"], ["press", 56, -84, 12, "the Press House"], ["berries", 218, -36, 32, "the Berry Garden"],
["vineyard", 244, 44, 32, "the Vineyard"], ["fields", -152, -152, 84, "the Grain Fields"], ["mill", -72, -82, 15, "the Windmill"],
["farm", -140, 40, 50, "the Farmstead"], ["pasture", -238, 62, 44, "the Pastures"], ["apiary", -72, 176, 30, "the Apiary"],
["woods", -30, -246, 56, "the Old Wood"], ["cutting", 56, 208, 30, "the Cutting Garden"], ["pond", -50, -30, 16, "the Lily Pond"],
["lane", 198, 194, 38, "Orchard Lane"]
];
var GW_SITE = {};
GW_SITES.forEach(function (s) { GW_SITE[s[0]] = { k: s[0], x: s[1], z: s[2], r: s[3], name: s[4] }; });
function gwRaw(x, z) {
var h = (wFbm(x * 0.006, z * 0.006, 311, 3) - 0.5) * 14 + 4 * Math.sin(x * 0.0045 + 1.3) * Math.cos(z * 0.0052);
var d = Math.hypot(x, z);
if (d > 330)
h += (d - 330) * (d - 330) * 0.0011;
return h;
}
var GW_PADS = null;
function gwPads() { return __ZC(304, 0, this, arguments, new.target); }
function gwHeight(x, z) {
var h = gwHeight0(x, z), P = gwPads();
for (var i = 0; i < P.length; i++) {
var q = P[i], d = Math.hypot(x - q[0], z - q[1]);
if (d >= q[2] + 5)
continue;
var k = d <= q[2] ? 1 : 1 - (d - q[2]) / 5;
k = k * k * (3 - 2 * k);
h = h + (q[3] - h) * k;
}
return h;
}
function gwHeight0(x, z) { return __ZC(304, 1, this, arguments, new.target); }
function gwSiteY(k) { var s = GW_SITE[k]; return gwHeight(s.x, s.z); }
function gwSiteAt(x, z) { var best = null, bd = 1e9; GW_SITES.forEach(function (s) { var d = Math.hypot(x - s[1], z - s[2]); if (d < s[3] + 8 && d < bd) {
bd = d;
best = s;
} }); return best ? best[4] : null; }
var GW_MAT = {};
function gwM(col, o) { var k = col + ":" + (o ? JSON.stringify(o) : ""); if (GW_MAT[k])
return GW_MAT[k]; return (GW_MAT[k] = wM(col, o)); }
function gwBasic(col, o) { var k = "b" + col + ":" + (o ? JSON.stringify(o) : ""); if (GW_MAT[k])
return GW_MAT[k]; return (GW_MAT[k] = wB(col, o)); }
var GW_GLASS = null;
function gwGlass() { if (!GW_GLASS) {
GW_GLASS = new THREE.MeshLambertMaterial({ color: 0xBFD8D0, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide });
} return GW_GLASS; }
function gwMerge(list) {
var n = 0;
list.forEach(function (g) { n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), o = 0;
list.forEach(function (g) {
var P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv, c = P.count;
pos.set(P.array.subarray(0, c * 3), o * 3);
if (N)
nor.set(N.array.subarray(0, c * 3), o * 3);
if (U)
uv.set(U.array.subarray(0, c * 2), o * 2);
o += c;
g.dispose();
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
G.computeBoundingSphere();
return G;
}
function gwBake(root) {
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), buckets = {}, drop = [];
root.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh || m.isSkinnedMesh)
return;
for (var p = m; p && p !== root; p = p.parent)
if (p.userData.keep)
return;
for (var q = m; q && q !== root; q = q.parent)
if (q.userData.limbs)
return;
if (m.material.transparent && m.material !== GW_GLASS)
return;
var geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
if (!geo.attributes.normal)
geo.computeVertexNormals();
geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld));
var k = m.material.uuid;
(buckets[k] || (buckets[k] = { mat: m.material, list: [] })).list.push(geo);
drop.push(m);
});
drop.forEach(function (m) { if (m.parent)
m.parent.remove(m); if (m.geometry)
m.geometry.dispose(); });
Object.keys(buckets).forEach(function (k) {
var b = buckets[k];
for (var i = 0; i < b.list.length; i += 1500) {
var mesh = new THREE.Mesh(gwMerge(b.list.slice(i, i + 1500)), b.mat);
mesh.name = "gw-bake";
root.add(mesh);
}
});
var empty = [];
root.traverse(function (o) { if (o !== root && o.type === "Group" && !o.children.length && !o.userData.keep)
empty.push(o); });
empty.forEach(function (o) { if (o.parent)
o.parent.remove(o); });
}
var GW_IGEO = {};
function gwIGeo(kind) { return __ZC(304, 2, this, arguments, new.target); }
function gwI(kind, x, y, z, sx, sy, sz, ry, col) {
var L = GW.ins[kind] || (GW.ins[kind] = { list: [], mesh: null });
L.list.push([x, y, z, sx, sy === undefined ? sx : sy, sz === undefined ? sx : sz, ry || 0, col === undefined ? 0xFFFFFF : col, 1]);
return { k: kind, i: L.list.length - 1 };
}
function gwIBuild(G) { return __ZC(304, 3, this, arguments, new.target); }
function gwIShow(hs, on) { return __ZC(304, 4, this, arguments, new.target); }
function gwIColour(hs, col) { return __ZC(304, 5, this, arguments, new.target); }
function gwFrame(G, x0, z0, rot, y0) { return __ZC(304, 6, this, arguments, new.target); }
function gwBadge() {
if (typeof amKeeper === "function" && amKeeper())
return true;
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return jobs.some(function (j) { return +j.job_id >= 3200 && +j.job_id <= 3299 || j.workplace === GW_KEY; });
}
function gwInRect(r, x, z, pad) { var dx = x - r.x, dz = z - r.z, c = Math.cos(r.rot), s = Math.sin(r.rot), lx = dx * c - dz * s, lz = dx * s + dz * c; pad = pad || 0; return Math.abs(lx) <= r.hw + pad && Math.abs(lz) <= r.hd + pad; }
function gwRoomAt(x, z) { for (var i = 0; i < GW.rooms.length; i++)
if (gwInRect(GW.rooms[i], x, z))
return GW.rooms[i]; return null; }
var GW_COL = { apples: 0xC8342A, pears: 0xB8B04A, plums: 0x5A2A6A, cherries: 0xA8102A, peaches: 0xF0A070, apricots: 0xF09A3A, figs: 0x5A3A4A, quinces: 0xE0C040,
strawberries: 0xD8202A, raspberries: 0xC8203A, blueberries: 0x3A4A9A, blackberries: 0x1E1424, gooseberries: 0x9AC060, grapes: 0x4A2A5A, rhubarb: 0xC83A4A,
potatoes: 0xC8A878, carrots: 0xE8782A, onions: 0xD8B87A, garlic: 0xEEE8DA, cabbages: 0x6A9A4A, lettuce: 0x8AC85A, tomatoes: 0xD8301E, beans: 0x4A8A2A, peas: 0x7AB84A,
pumpkins: 0xE8761E, courgettes: 0x3A6A2A, sweetcorn: 0xF0D050, beetroot: 0x7A1A3A, kale: 0x2E5A3A, leeks: 0xD8E8C0, parsnips: 0xEEE0C0, spinach: 0x3A7A32, radishes: 0xD82A4A,
cucumbers: 0x3A7A2A, peppers: 0xD83A1E, chillies: 0xC8141E, bananas: 0xF0D040, pineapples: 0xD8A030, oranges: 0xF08A1A, lemons: 0xF0E040, coffee: 0xB8201E, cacao: 0xC88A2A,
wheat: 0xD8B860, barley: 0xD8C070, oats: 0xD0C890, rye: 0xB8A060, lavender: 0x8A6AC0, mint: 0x5AA85A, chamomile: 0xF4F0D8, sage: 0x8AA08A, thyme: 0x6A8A5A, rosemary: 0x4A6A4A,
parsley: 0x3A8A3A, basil: 0x4A9A3A, sunflowers: 0xF0C020, roses: 0xC8203A, tulips: 0xE84A6A, daffodils: 0xF0D84A, dahlias: 0xC84A9A, sweetpeas: 0xD88AC8, chrysanthemums: 0xE8A030,
hellebores: 0xC8A0B8, eggs: 0xE8DCC0, milk: 0xF0F0E8, goatmilk: 0xF0F0E8, wool: 0xE8E2D2, honey: 0xE0A020, beeswax: 0xE8D070, walnuts: 0x8A6A3A, hazelnuts: 0x9A6A3A,
chestnuts: 0x6A3A1A, mushrooms: 0xC8A880, elderflowers: 0xF4F0E0, elderberries: 0x2A1A2A, maplesap: 0xC89040 };
var GW_LEAF = 0x4A7A3A, GW_LEAF2 = 0x3A6A2E, GW_SOIL = 0x4A3424;
function gwNode(o) { o.id = o.id || ("g" + GW.nodes.length); o.hs = o.hs || []; o.r = o.r || 2.4; GW.nodes.push(o); return o; }
function gwSpot(x, z, r, name, verb, fn, o) { var s = Object.assign({ x: x, z: z, r: r, name: name, verb: verb, fn: fn }, o || {}); GW.spots.push(s); return s; }
function gwFaceRot(x, z, tx, tz) { return Math.atan2(tx - x, tz - z); }
function gwTree(x, z, o) { return __ZC(304, 7, this, arguments, new.target); }
function gwBed(x, z, len, rot, crop, o) { return __ZC(304, 8, this, arguments, new.target); }
var GW_STYLE = { lettuce: "leafy", cabbages: "leafy", kale: "leafy", spinach: "leafy", carrots: "root", beetroot: "root", parsnips: "root", radishes: "root", onions: "root", garlic: "root",
potatoes: "potato", leeks: "leek", tomatoes: "cane", beans: "cane", peas: "cane", pumpkins: "sprawl", courgettes: "sprawl", sweetcorn: "corn", rhubarb: "rhubarb",
strawberries: "strawb", raspberries: "cane", blackberries: "bush", blueberries: "bush", gooseberries: "bush",
lavender: "herb", mint: "herb", chamomile: "herb", sage: "herb", thyme: "herb", rosemary: "herb", parsley: "herb", basil: "herb",
sunflowers: "flower", roses: "bush", tulips: "flower", daffodils: "flower", dahlias: "flower", sweetpeas: "cane", chrysanthemums: "flower", hellebores: "flower",
cucumbers: "glassveg", peppers: "glassveg", chillies: "glassveg" };
function gwTable(F, lx, lz, w, d, wood) { wood = wood || gwM(0x7A5434); F.box(w, 0.08, d, wood, lx, 0.78, lz); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { F.box(0.08, 0.76, 0.08, wood, lx + q[0] * (w / 2 - 0.1), 0.38, lz + q[1] * (d / 2 - 0.1)); }); F.solid(lx, lz, w / 2, d / 2); }
function gwBench(F, lx, lz, len, alongX, wood) { wood = wood || gwM(0x6A4A2E); F.box(alongX ? len : 0.4, 0.07, alongX ? 0.4 : len, wood, lx, 0.45, lz); F.box(alongX ? len : 0.1, 0.42, alongX ? 0.1 : len, wood, lx + (alongX ? 0 : -0.15), 0.22, lz + (alongX ? -0.15 : 0)); }
function gwShelves(F, lx, lz, len, alongX, cols, h) { return __ZC(304, 9, this, arguments, new.target); }
function gwCrates(F, lx, lz, crops) { return __ZC(304, 10, this, arguments, new.target); }
function gwLectern(G, x, z, rot, label) { return __ZC(304, 11, this, arguments, new.target); }
function gwPost(G, x, z, lines, rot, w, h) { return __ZC(304, 12, this, arguments, new.target); }
function gwLamp(G, x, z) { return __ZC(304, 13, this, arguments, new.target); }
var GW_PATHS = [[[0, 150], [0, 120], [0, 92], [0, 60], [0, 30]], [[-24, 92], [-60, 92], [-100, 60], [-128, 42]], [[24, 92], [60, 92], [84, 60], [100, 40]], [[0, 30], [40, -20], [70, -60], [100, -100], [132, -132]],
[[0, 30], [-30, -30], [-60, -70]], [[-60, -70], [-100, -110], [-152, -152]], [[0, 120], [-30, 150], [-60, 168]], [[60, 92], [90, 110], [112, 112]], [[150, 30], [200, 30], [244, 44]],
[[150, -20], [200, -30], [218, -36]], [[-128, 42], [-190, 60], [-238, 62]], [[-60, -70], [-50, -150], [-30, -230]], [[0, 150], [30, 190], [56, 208]], [[112, 150], [150, 180], [198, 194]],
[[-72, 176], [-50, 168]], [[132, -132], [60, -84]]];
function gwPathDist(x, z) { return __ZC(304, 14, this, arguments, new.target); }
function gwBuildGround(G) { return __ZC(304, 15, this, arguments, new.target); }
function gwHeartwood(G) { return __ZC(304, 16, this, arguments, new.target); }
function gwVillage(G) { return __ZC(304, 17, this, arguments, new.target); }
function gwHarvestHall(G) { return __ZC(304, 18, this, arguments, new.target); }
function gwGrangeSchool(G) { return __ZC(304, 19, this, arguments, new.target); }
function gwMarketGarden(G) { return __ZC(304, 20, this, arguments, new.target); }
function gwGlasshouses(G) { return __ZC(304, 21, this, arguments, new.target); }
var GW_TREE_NAME = { apples: "an apple tree", pears: "a pear tree", plums: "a plum tree", cherries: "a cherry tree", peaches: "a peach tree", apricots: "an apricot tree", figs: "a fig tree", quinces: "a quince tree" };
function gwOrchards(G) { return __ZC(304, 22, this, arguments, new.target); }
function gwBerries(G) { return __ZC(304, 23, this, arguments, new.target); }
function gwFields(G) { return __ZC(304, 24, this, arguments, new.target); }
function gwFarmstead(G) { return __ZC(304, 25, this, arguments, new.target); }
function gwFence(G, x, z, w, d) { return __ZC(304, 26, this, arguments, new.target); }
function gwApiary(G) { return __ZC(304, 27, this, arguments, new.target); }
function gwWoods(G) { return __ZC(304, 28, this, arguments, new.target); }
function gwCutting(G) { return __ZC(304, 29, this, arguments, new.target); }
function gwWild(G) { return __ZC(304, 30, this, arguments, new.target); }
var GW_SAFE = " You are part of SomnuMatrix, a family-friendly dream world, and players of every age talk to you. Speak warmly and briefly (two to four sentences unless asked for more), " +
"in plain words. Teach real growing knowledge accurately; if you are not sure of a fact, say so. Never give medical or health advice, never say a plant cures anything, and never tell anyone to eat a wild plant or mushroom they found: " +
"here in the Greenwold everything is grown to be safe, but in the waking world people must ask an expert. Never ask for personal details. Stay kind, never scary, never romantic.";
var GW_PEOPLE = [
{ k: "mother", name: "Mother Nature", x: -7, z: 23, face: [0, 60], r: 5, title: "", sex: "female", look: { hairColor: "#5A3A1E", skin: "#C89870" },
persona: "You are Mother Nature, who keeps the Greenwold: a whole green world of gardens, orchards, fields, woods and a farm, reached through the Green Door in the city of Somnucor. You are ancient, patient and warm, with a dry sense of humour, " +
"and you love every seed, worm and bee. You speak like the turning of the seasons: unhurried. You teach how things grow: soil, seed, sun, water, compost, pollination, the seasons, the harvest, and keeping the soil healthy for the next year. " +
"You know this world: the Heartwood (your oak) and its spring, the Village Green with the Harvest Hall (sell to the city's stores, buy seeds, cook in the Hearth Kitchen), the Grange School (World Learning: Growing, sixteen lessons at the places that teach them), " +
"the Market Garden, the Glasshouses and the Physic Garden of herbs, the Orchards and the Press House, the Berry Garden, the Vineyard, the Grain Fields and the Windmill, the Farmstead (barn, dairy, hens, wool shed), the Apiary and Honey House, the Old Wood, the Cutting Garden and the Lily Pond. " +
"Things ripen here in their real season. Dreamers may pick what is ripe and take it home: to eat, cook, sell to the city, or plant in their own garden. Once a day you give a gift basket to anyone who asks you kindly.",
greet: "Welcome, little seedling. Everything here grows in its own good time, and so do you. Ask me anything about growing, or ask me for a gift from the garden." },
{ k: "gardener", name: "Bramwell Oakes, the head gardener", x: 96, z: 16, r: 6, title: "head gardener", sex: "male", wander: 5,
persona: "You are Bramwell Oakes, the head gardener of the Greenwold's Market Garden: broad, cheerful, earth under your nails. You know vegetables, crop rotation (roots, legumes, cabbages, potatoes moving round the beds each year), compost, and the Three Sisters (corn, beans and squash, a planting from Indigenous peoples of the Americas).",
greet: "Mind the beds! Ah, a visitor. Want to know what's ready? Everything with something on it can be picked." },
{ k: "orchard", name: "Tamsin Rowe, the orchard keeper", x: 108, z: -108, r: 6, title: "orchard keeper", sex: "female", wander: 8,
persona: "You are Tamsin Rowe, keeper of the Greenwold's Orchards and the Press House. You know fruit trees: apples, pears, plums, cherries, peaches, apricots, figs and quinces, blossom and pollination, pruning in winter, and grafting (every named apple is a twig of the first tree grafted onto a root).",
greet: "Hello there. Ladder's steady if you want to reach the high ones. Do you know why apples are grafted?" },
{ k: "bees", name: "Wren Hollis, the beekeeper", x: -64, z: 170, r: 6, title: "beekeeper", sex: "female", wander: 4,
persona: "You are Wren Hollis, the Greenwold's beekeeper, calm and quiet-voiced, in a pale veiled hat. You know honeybees: the queen, workers and drones, the waggle dance, pollination, honey and beeswax, and why wildflower meadows matter. Bees here are gentle; you always say to move slowly near hives.",
greet: "Slow and calm, that's the way near the hives. The bees are busy on the clover today." },
{ k: "miller", name: "Ezra Millward, the miller", x: -66, z: -70, r: 6, title: "miller", sex: "male",
persona: "You are Ezra Millward, the miller at the Greenwold's windmill: dusty with flour, proud of your millstones. You know grain (wheat, barley, oats, rye), how wind turns the sails and the stones grind, threshing and winnowing, and that wheat was first farmed in the Fertile Crescent over ten thousand years ago.",
greet: "Wind's good today, the sails are fair humming. Bring me wheat and I'll show you flour." },
{ k: "dairy", name: "Nell Ashby, the dairy hand", x: -116, z: 82, r: 6, title: "dairy hand", sex: "female", wander: 4,
persona: "You are Nell Ashby, the dairy hand at the Greenwold Farmstead. You know cows and goats, milking, churning butter, making cheese, and keeping hens. You love the animals and know each by name: Buttercup, Clementine and Daisy are the cows; Pip and Juniper the goats.",
greet: "Morning! Buttercup's in a good mood today. Fresh milk in the parlour if you'd like some." },
{ k: "shepherd", name: "Hob Fennick, the shepherd", x: -226, z: 76, r: 8, title: "shepherd", sex: "male", wander: 10,
persona: "You are Hob Fennick, the Greenwold's old shepherd, slow-spoken and fond of a joke. You know sheep, shearing in late spring, wool, carding and spinning, sheepdogs, and keeping pastures healthy by moving the flock.",
greet: "Eh up. The flock's grazing the far field. Shearing's done in spring, but there's always a fleece in the shed." },
{ k: "glass", name: "Juniper Vale, the glasshouse keeper", x: 112, z: 126, r: 6, title: "glasshouse keeper", sex: "female", wander: 6,
persona: "You are Juniper Vale, keeper of the Greenwold's Palm House, a great Victorian-style glasshouse. You know tropical crops (bananas, pineapples, coffee, cacao, oranges, lemons) and how glass traps the sun's warmth (the greenhouse effect), and propagating seedlings on warm benches.",
greet: "Come in, come in, shut the door, we keep it tropical in here. The cacao pods are coming along nicely." },
{ k: "teacher", name: "Clover Thistlewood, the agriculture teacher", x: 0, z: 0, r: 6, title: "teacher", sex: "female", at: "teacher",
persona: "You are Clover Thistlewood, who teaches World Learning: Growing at the Grange School in the Greenwold, for the Department of Education. You are encouraging and clear. There are sixteen lessons, each taught at its own place in the Greenwold (the Soil Pit, the Seed Library, the Heartwood, the Compost Yard, the well, the Sundial Lawn, the Market Garden, the Three Sisters mounds, the Apiary, the Orchards, the Windmill, the hedgerow, the Palm House, the Great Barn, the Hearth Kitchen, and here at the school). Answer pupils' questions about farming, plants and food accurately for their age.",
greet: "Hello! Ready to learn? Sixteen lessons, each one out in the Greenwold where it happens. Press E here for the list." },
{ k: "library", name: "Osric Pell, the seed librarian", x: 0, z: 0, r: 5, title: "librarian", sex: "male", at: "seedlib",
persona: "You are Osric Pell, keeper of the Seed Library at the Grange School: precise, gentle, a little fussy about labels. You know seed saving, open-pollinated and heirloom varieties, why seed banks such as the Svalbard Global Seed Vault matter, and how long seeds keep when dry and cool.",
greet: "Shh, the seeds are sleeping. Every drawer is a variety someone saved. You may borrow, if you plant them." },
{ k: "cook", name: "Marigold Finch, the cook", x: 0, z: 0, r: 5, title: "cook", sex: "female", at: "kitchen",
persona: "You are Marigold Finch, cook of the Hearth Kitchen in the Greenwold's Harvest Hall: bustling and generous. You know simple cooking from the garden (bread, soups, pies, jams, porridge), and keeping the harvest: drying, pickling, jam-making, cool dark storage.",
greet: "Come in, there's always something on the stove. Bring me what you've picked and we'll make something lovely." },
{ k: "herbs", name: "Sage Merriweather, the herb gardener", x: 158, z: 110, r: 6, title: "gardener", sex: "female", wander: 5,
persona: "You are Sage Merriweather, keeper of the Greenwold's Physic Garden of herbs. You know growing herbs (lavender, mint, chamomile, sage, thyme, rosemary, parsley, basil) and their uses in cooking and for scent. You never claim a herb cures or treats illness; you say that is a question for a doctor.",
greet: "Rub a leaf of the rosemary between your fingers. Lovely, isn't it? Herbs are for the kitchen and the nose." },
{ k: "vintner", name: "Rosa Linden, the vine keeper", x: 236, z: 40, r: 6, title: "farmer", sex: "female", wander: 8,
persona: "You are Rosa Linden, keeper of the Greenwold's Vineyard. You grow grapes for fresh eating and pressed juice (this is a family world: you make juice, never wine). You know vines, trellises, pruning, and how the sun and slopes ripen grapes.",
greet: "The vines love a sunny slope. Grapes come in September and October; the juice is pressed at the Press House." },
{ k: "forester", name: "Ansel Birch, the forester", x: -30, z: -222, r: 6, title: "forester", sex: "male", wander: 8,
persona: "You are Ansel Birch, forester of the Greenwold's Old Wood. You know trees, coppicing hazel, nut trees, mushroom logs (shiitake and oyster mushrooms grown on logs), sugar maples tapped for sap in late winter (about forty litres of sap make one litre of syrup), and woodland wildlife.",
greet: "Quiet in the wood today. The mushroom logs are fruiting, and the walnuts will drop when they're ready." },
{ k: "florist", name: "Poppy Hart, the flower grower", x: 44, z: 200, r: 6, title: "florist", sex: "female", wander: 6,
persona: "You are Poppy Hart, who grows cut flowers in the Greenwold's Cutting Garden for the city's florists. You know sunflowers, roses, tulips, daffodils, dahlias, sweet peas, chrysanthemums and hellebores, when each blooms, and how to cut and tie a posy.",
greet: "Aren't they something? Cut the stems on a slant and they drink better in the vase." }
];
var GW_WALKERS = [["gardener", "garden", 8], ["farmer", "farm", 10], ["gardener", "orchard", 14], ["farmer", "fields", 18], ["florist", "cutting", 8], ["gardener", "village", 14], ["farmer", "berries", 10], ["gardener", "physic", 6]];
function gwPeople(G) { return __ZC(304, 31, this, arguments, new.target); }
function gwMotherDress(G, g, P) { return __ZC(304, 32, this, arguments, new.target); }
function gwCrowns() { return __ZC(304, 33, this, arguments, new.target); }
function gwFloorY(x, z) { for (var i = 0; i < GW.floors.length; i++) {
var f = GW.floors[i];
if (gwInRect(f, x, z))
return f.y;
} return gwHeight(x, z); }
function gwAnimal(G, kind, i, pen, s) { return __ZC(304, 34, this, arguments, new.target); }
function gwAnimals(G) { return __ZC(304, 35, this, arguments, new.target); }
function gwAnimalsTick(dt) { return __ZC(304, 36, this, arguments, new.target); }
function gwSmall(G) { return __ZC(304, 37, this, arguments, new.target); }
function gwSmallTick(dt, L) { return __ZC(304, 38, this, arguments, new.target); }
var GW_AUTUMN = [0xC8782A, 0xD89A30, 0xB8562A, 0xA8882A];
function gwSeasonPaint() { return __ZC(304, 39, this, arguments, new.target); }
function gwNodeCrop(n) { if (n.crops) {
for (var i = 0; i < n.crops.length; i++)
if (gwRipe(GW_CROP[n.crops[i]]))
return n.crops[i];
return n.crops[0];
} return n.crop; }
function gwNodeReady(n) { var c = GW_CROP[gwNodeCrop(n)]; if (!gwRipe(c))
return 0; var p = GW.picked[n.id]; return !p || Date.now() >= p ? 1 : -1; }
function gwNodesPaint() { return __ZC(304, 40, this, arguments, new.target); }
function gwEnv() { return __ZC(304, 41, this, arguments, new.target); }
function gwBtn(name, label, sub) { return worldBtn(name, label, sub).replace("<div data-w=", "<div role='button' data-w="); }
function gwSigned() { return typeof signedIn === "function" && signedIn(); }
function gwHave(kind) { var r = (typeof myStock !== "undefined" ? myStock : []).filter(function (s) { return s.kind === kind; })[0]; return r ? (+r.amount || 0) : 0; }
function gwName(k) { var c = gwKind(k); return c ? c.n : k; }
function gwIcon(k) { var c = gwKind(k); return c ? c.e : "🧺"; }
function gwSaySoft(e) { var m = String((e && e.message) || e || ""); return /function|404|PGRST|does not exist|schema cache/i.test(m) ? "The Greenwold's store opens soon." : esc(m); }
function gwPickedLoad() { try {
var o = JSON.parse(localStorage.getItem("gw_picked") || "{}"), now = Date.now();
Object.keys(o).forEach(function (k) { if (o[k] > now)
GW.picked[k] = o[k]; });
}
catch (e) { } }
function gwPickedSave() { try {
localStorage.setItem("gw_picked", JSON.stringify(GW.picked));
}
catch (e) { } }
function gwPrompt(n) { return __ZC(304, 42, this, arguments, new.target); }
function gwUse(n) {
var k = gwNodeCrop(n), c = GW_CROP[k], r = gwNodeReady(n);
if (r === 1)
return gwPick(n);
if (r === -1 && GW.can && !n.glass && !GW.watered[n.id] && c.f !== "farm") {
gwWater(n);
return;
}
gwCropCard(k);
}
function gwWater(n) { return __ZC(304, 43, this, arguments, new.target); }
function gwFillCan() { return __ZC(304, 44, this, arguments, new.target); }
function gwPick(n) { return __ZC(304, 45, this, arguments, new.target); }
function gwCropCard(k) { return __ZC(304, 46, this, arguments, new.target); }
function gwRipeCard() { return __ZC(304, 47, this, arguments, new.target); }
function gwGreenStock() { return (typeof myStock !== "undefined" ? myStock : []).filter(function (s) { return (+s.amount || 0) > 0 && gwKind(s.kind); }); }
function gwSellCard(msg) { return __ZC(304, 48, this, arguments, new.target); }
function gwSell(k, n) { return __ZC(304, 49, this, arguments, new.target); }
function gwSeedCard(lib, msg) { return __ZC(304, 50, this, arguments, new.target); }
function gwBuySeed(k, lib) { return __ZC(304, 51, this, arguments, new.target); }
function gwMakeCard(at, msg, home) { return __ZC(304, 52, this, arguments, new.target); }
function gwMake(r, at, home) { return __ZC(304, 53, this, arguments, new.target); }
function gwEat(k, after) { return __ZC(304, 54, this, arguments, new.target); }
function gwMotherCard(t) { return __ZC(304, 55, this, arguments, new.target); }
function gwGift() { return __ZC(304, 56, this, arguments, new.target); }
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var D = (typeof BKP !== "undefined" && BKP.d) || {}, all = D.stock, mine = [];
if (Array.isArray(all)) {
mine = all.filter(function (s) { return (+s.amount || 0) > 0 && gwKind(s.kind); });
D.stock = all.filter(function (s) { return !gwKind(s.kind); });
}
var h;
try {
h = bh.apply(this, arguments);
}
finally {
if (Array.isArray(all))
D.stock = all;
}
if (!mine.length)
return h;
var home = !!(store.inside && typeof INT !== "undefined" && INT && INT.spec && gwMyHomeSpec(INT.spec));
var x = bkpHead("🌿 From the Greenwold") + "<div style='color:var(--dim);font-size:12px'>Picked, made or given. Eat it, cook it" + (home ? " here in your kitchen" : " (in your own home's kitchen, or the Hearth Kitchen)") + ", sell it to the city, or plant the seeds at home.</div>";
mine.forEach(function (s) {
var c = gwKind(s.kind), b = "";
if (c.fd || c.dr)
b += ' <button class="btn" data-gwb="eat:' + esc(s.kind) + '">' + (c.fd ? "Eat" : "Drink") + '</button>';
if (c.seed)
b += ' <button class="btn" data-gwb="plant:' + esc(s.kind) + '">Plant at home</button>';
b += ' <button class="btn" data-gwb="sell:' + esc(s.kind) + '">Sell one (' + (+s.buys || c.b) + ')</button>';
x += bkpRow(c.e + " " + esc(c.n) + " " + bkpDim("× " + s.amount), b);
});
if (home)
x += bkpRow("🍳 Cook at home", '<button class="btn" data-gwb="cook:">Your kitchen</button>');
return h + x;
};
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-gwb]") : null;
if (!b)
return;
e.stopPropagation();
var v = b.getAttribute("data-gwb").split(":"), k = v[1];
var again = function () { if (typeof bkpLoad === "function")
bkpLoad(); };
if (v[0] === "eat")
gwEat(k, again);
else if (v[0] === "sell")
cityRpc("sell_stock", { p_kind: k, p_amount: 1 }).then(function (o) { setStatus(o === "ok" ? "<b>Sold to the city.</b>" : esc(String(o))); again(); if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (x) { } }).catch(function (x) { setStatus(gwSaySoft(x)); });
else if (v[0] === "plant") {
if (typeof bkpClose === "function")
bkpClose();
setStatus("<b>Plant it at home:</b> walk to the board in front of your house (or your rooms) and press E at your kitchen garden.");
var mine = gwMyLots();
if (mine.length && typeof showTheWayHome === "function")
try {
showTheWayHome(mine[0]);
}
catch (x) { }
}
else if (v[0] === "cook") {
if (typeof bkpClose === "function")
bkpClose();
gwMakeCard("kitchen", "", true);
}
}, true);
})();
var GWL = { cur: null, ans: {}, t0: 0, msg: "", guide: null };
function gwlLog() { var st = (typeof eduStore === "function") ? eduStore() : {}; return st["world-green"] || (st["world-green"] = {}); }
function gwlDone(n) { return !!gwlLog()[n]; }
function gwlCount() { return GW_LESSONS.filter(function (l) { return gwlDone(l.n); }).length; }
function gwlOpt(l, k) { var q = l.quiz[k], o = [q[1], q[2], q[3]], r = (l.n * 5 + k * 2) % 3; return [o[r], o[(r + 1) % 3], o[(r + 2) % 3]]; }
var GW_LESSON_PLACE = { soilpit: "the Soil Pit in the Market Garden", seedlib: "the Seed Library in the Grange School", heartwood: "the Heartwood", compost: "the Compost Yard", well: "the well on the Village Green",
sundial: "the Sundial Lawn", garden: "the Market Garden", sisters: "the Three Sisters mounds", apiary: "the Apiary", orchard: "the Orchards", mill: "the Windmill", hedgerow: "the hedgerow and its insect hotel",
palmhouse: "the Palm House", barn: "the Great Barn", kitchen: "the Hearth Kitchen in the Harvest Hall", school: "the Growing classroom in the Grange School" };
function gwlCard(l) { return __ZC(304, 57, this, arguments, new.target); }
function gwlCheck(l) { return __ZC(304, 58, this, arguments, new.target); }
function gwCourseCard() { return __ZC(304, 59, this, arguments, new.target); }
function gwlArrow(L) { return __ZC(304, 60, this, arguments, new.target); }
(function () {
if (typeof bkpHtml === "function") {
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments), n = gwlCount();
if (!n || !gwSigned())
return h;
return h + (n >= GW_LESSONS.length ? bkpRow("🌱 Certificate: <b>Greenwold Grower</b>", bkpDim("the Department of Education")) : bkpRow("🌱 World Learning: Growing", bkpDim(n + " of " + GW_LESSONS.length + " stamps")));
};
}
if (typeof eduReportHtml === "function") {
var er = eduReportHtml;
eduReportHtml = function () { var h = er.apply(this, arguments); return h + '<div style="margin-top:6px">World Learning: Growing, in the Greenwold, ' + gwlCount() + ' of ' + GW_LESSONS.length + ' lessons learned.' + (gwlCount() >= GW_LESSONS.length ? ' <b style="color:#2A6A3A">Greenwold Grower.</b>' : '') + '</div>'; };
}
if (typeof eduWorldCard === "function") {
var ew = eduWorldCard;
eduWorldCard = function () {
ew.apply(this, arguments);
try {
if (!EDU.lesson)
return;
var box = '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>Growing</b> · the Greenwold<br>Go through the Green Door by the Greenwold Gate in the Harvest Ring. Sixteen lessons on soil, seeds, sunlight, water, compost, the seasons, rotation, bees, grafting, grain, pests, glasshouses, farm animals, keeping the harvest and feeding the world, each taught where it happens, with two questions for a stamp. All sixteen make a Greenwold Grower.<br><span style="color:#2A6A3A">You have learned ' + gwlCount() + ' of ' + GW_LESSONS.length + '.</span></div>';
var i = EDU.lesson.html.indexOf('<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>Already teaching');
EDU.lesson.html = i >= 0 ? EDU.lesson.html.slice(0, i) + box + EDU.lesson.html.slice(i) : EDU.lesson.html + box;
if (typeof eduLessonPaintHtml === "function")
eduLessonPaintHtml();
}
catch (e) { }
};
}
})();
function gwGreenDoor(G) { return __ZC(304, 61, this, arguments, new.target); }
if (typeof WH_PLAN !== "undefined") {
WH_STYLE.farm = { w: 9, d: 7, h: 3.1, wall: 0xE8DCC0, trim: 0x5A4030, roof: 0xB89A5A, roofEdge: 0x8A6A3A, floor: 0x8A6440, door: 0x3A6A3A, rug: 0x6A8A4A, quilt: 0xC8A060, feature: "garden", pitch: 0.75 };
WH_PLAN.greenwold = { style: "farm", face: { x: 198, z: 194 }, lots: [["Orchard Lane 1", 176, 176], ["Orchard Lane 2", 198, 168], ["Orchard Lane 3", 220, 176], ["Orchard Lane 4", 226, 196],
["Orchard Lane 5", 220, 216], ["Orchard Lane 6", 198, 222], ["Orchard Lane 7", 176, 216], ["Orchard Lane 8", 170, 196]] };
WR_WORLD.greenwold = "The Greenwold";
if (WR_ORDER.indexOf("greenwold") < 0)
WR_ORDER.push("greenwold");
}
function gwBuild(G) { return __ZC(304, 62, this, arguments, new.target); }
function gwGround(x, z) {
for (var i = 0; i < GW.floors.length; i++) {
var f = GW.floors[i];
if (gwInRect(f, x, z, 0.05))
return f.y;
}
var h = gwHeight(x, z);
return typeof whGround === "function" ? whGround("greenwold", x, z, h) : h;
}
function gwBlock(x, z, feet) {
if (worldSolidAt(GW.solids, x, z, feet))
return true;
if (!gwBadge())
for (var i = 0; i < GW.badge.length; i++)
if (gwInRect(GW.badge[i], x, z, 0.3))
return true;
return false;
}
function gwTick(dt) { return __ZC(304, 63, this, arguments, new.target); }
function gwHome() { worldHome("<b>Back through the Green Door.</b> The city smells of rain and bread; your pockets still smell of the garden."); }
if (typeof worldDef === "function")
worldDef("greenwold", {
base: GW.base, far: 3000, ownSky: true, tone: 440, bound: 470,
env: function () { return gwEnv(); },
build: function (G) { gwBuild(G); },
enter: function (opt) { return __ZC(304, 64, this, arguments, new.target); },
leave: function () { GWL.guide = null; },
ground: function (x, z) { return gwGround(x, z); },
block: function (x, z, feet) { return gwBlock(x, z, feet); },
tick: function (dt) { gwTick(dt); },
back: function () { gwHome(); }
});
if (typeof cityWorkplace === "function")
cityWorkplace({ key: GW_KEY, ring: "harvest", arch: "cottage", s: 1.3, jobs: [3200, 3201, 3202, 3203, 3204, 3205, 3206, 3207, 3208, 3209, 3210, 3211, 3212, 3213, 3214, 3215, 3216, 3217, 3218, 3219],
fit: ["desk", "noticeboard", "shelfgoods", "crates", "crates", "workbench"],
note: "The Greenwold Estate's lodge. Beside it, the Green Door: through it, a whole green world of gardens, orchards, fields and woods kept by Mother Nature, where the harvest is yours to take home." });
if (typeof cityMore === "function")
cityMore("xgw", function (C) {
var f = cityFrontage(C, GW_KEY, 1790, 7) || cityFrontage(C, GW_KEY, 1790, 3) || cityFrontage(C, GW_KEY, 1790, 9) || cityFrontage(C, GW_KEY, 1620, 8);
if (f && f.spec)
GW.lodge = { side: f.side, w: f.w, d: f.d };
});
var GWD = { g: null };
function gwDoorSpot() {
var o = (typeof cityPlaceOf === "function") ? cityPlaceOf(GW_KEY) : null;
if (!o || typeof ATLC === "undefined" || !ATLC)
return null;
var dx = o.x - ATLC.x, dz = o.z - ATLC.z, r = Math.hypot(dx, dz), ux = dx / r, uz = dz / r, tx = -uz, tz = ux;
var w = (GW.lodge && GW.lodge.w) || 12, side = (GW.lodge && GW.lodge.side) || 1, off = w / 2 + 6;
var x = o.x + tx * off - ux * side * 2, z = o.z + tz * off - uz * side * 2;
return { x: x, z: z, y: (typeof terrainY === "function" ? terrainY(x, z) : 0), yaw: Math.atan2(-ux * side, -uz * side) };
}
function gwDoorTick() {
if (WLD.on || store.inside || !walkMode) {
if (GWD.g && (WLD.on || store.inside))
GWD.g.visible = false;
return;
}
if (typeof inCityNow === "function" && !inCityNow()) {
if (GWD.g)
GWD.g.visible = false;
return;
}
var s = gwDoorSpot();
if (!s) {
return;
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
if (d > 500) {
if (GWD.g)
GWD.g.visible = false;
return;
}
if (!GWD.g) {
var g = new THREE.Group(), stone = wM(0x8A8A7E);
[-1, 1].forEach(function (k) { wBox(1.1, 4, 1.1, stone, k * 2, 2, 0, g); });
for (var i = 0; i <= 8; i++) {
var a = i / 8 * Math.PI, b = wBox(0.8, 0.55, 1.1, stone, Math.cos(a) * 2, 4 + Math.sin(a) * 1.5, 0, g);
b.rotation.z = a - Math.PI / 2;
}
wBox(2.9, 4, 0.16, wM(0x2E5A34), 0, 2, 0, g);
wSph(0.11, wB(0xC8A040), 0.95, 1.9, 0.12, g, 8);
var R = wRand(56);
for (var k = 0; k < 90; k++) {
var a2 = R() * Math.PI, on = R() < 0.55, x = on ? Math.cos(a2) * 2.1 : (R() < 0.5 ? -1 : 1) * (2 + (R() - 0.5) * 1.1), y = on ? 4 + Math.sin(a2) * 1.6 : R() * 4;
var lf = wMesh(new THREE.IcosahedronGeometry(0.16, 0), wM(R() < 0.15 ? 0xE8D84A : 0x3E6E30), x, y, (R() < 0.5 ? 0.58 : -0.58), g);
}
var sg = wSign(["THE GREEN DOOR", "to the Greenwold · gardens, orchards and fields", "press E to step through"], 3, 0.9, "#22361E", "#E8E2C8");
sg.position.set(0, 6.6, 0.6);
g.add(sg);
var gl = wGlow(0xD8F0C0, 4, 0.2);
gl.position.set(0, 2.2, 0.3);
g.add(gl);
scene.add(g);
GWD.g = g;
}
GWD.g.visible = true;
GWD.g.position.set(s.x, s.y, s.z);
GWD.g.rotation.y = s.yaw;
if (d < 4)
worldPromptCity("<b>The Green Door</b> · <b>press E</b> to step through to the Greenwold", gwGo);
else if (WCITY.fn === gwGo)
worldPromptCity(null);
}
function gwGo() {
worldPromptCity(null);
var s = gwDoorSpot(), P = camera.position;
worldGo("greenwold", s ? { from: { here: store.here || 0, x: s.x + Math.sin(s.yaw) * 3, y: P.y, z: s.z + Math.cos(s.yaw) * 3, yaw: s.yaw + Math.PI, name: "the Green Door" } } : {});
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
gwDoorTick();
gwHomeGardenTick();
}
catch (e) {
if (window.console)
console.warn("greenwold door:", e);
} };
})();
(function () {
if (typeof onSite !== "function")
return;
var os = onSite;
onSite = function (job) { if (typeof WLD !== "undefined" && WLD.on === "greenwold" && job && (job.workplace === GW_KEY || (+job.job_id >= 3200 && +job.job_id <= 3299)))
return true; return os.apply(this, arguments); };
})();
function gwMyLots() { var st = (typeof standing !== "undefined" && standing) || {}; return (st.lots || []).map(function (l) { return l.lot; }); }
function gwMyHomeSpec(spec) { var mine = gwMyLots(); if (!spec || !mine.length)
return false; return mine.some(function (n) { return spec.label === n || spec.lot === n || (spec.plot && spec.plot.name === n) || spec.home === n; }); }
var GWH = { beds: {}, g: {}, at: 0, near: null };
function gwHomeGardenTick() {
if (WLD.on || store.inside || !walkMode || !gwSigned()) {
Object.keys(GWH.g).forEach(function (k) { GWH.g[k].visible = false; });
if (GWH.near) {
GWH.near = null;
worldPromptCity(null);
}
return;
}
if (typeof inCityNow === "function" && !inCityNow())
return;
var P = camera.position, got = null;
gwMyLots().forEach(function (name) {
var b = typeof haBoardOf === "function" ? haBoardOf(name) : null;
if (!b)
return;
var rot = b.rot || 0, x = b.x - Math.cos(rot) * 3.4, z = b.z + Math.sin(rot) * 3.4, y = typeof terrainY === "function" ? terrainY(x, z) : 0;
if (!GWH.g[name]) {
var g = new THREE.Group();
g.userData.beds = [];
for (var i = 0; i < 4; i++) {
var bx = (i % 2 ? 0.7 : -0.7), bz = (i < 2 ? -0.55 : 0.55);
wBox(1.2, 0.25, 0.9, wM(0x6A5034), bx, 0.12, bz, g);
wBox(1.1, 0.06, 0.8, wM(GW_SOIL), bx, 0.26, bz, g);
var pl = new THREE.Group();
pl.position.set(bx, 0.29, bz);
g.add(pl);
g.userData.beds.push(pl);
}
var sg = wSign(["Kitchen garden"], 1.2, 0.3, "#22361E", "#E8E2C8");
sg.position.set(0, 0.75, -1.05);
g.add(sg);
scene.add(g);
GWH.g[name] = g;
gwHomeLoad(name);
}
var G2 = GWH.g[name];
G2.visible = true;
G2.position.set(x, y, z);
G2.rotation.y = rot;
if (Math.hypot(P.x - x, P.z - z) < 2.6)
got = name;
});
if (got && GWH.near !== got) {
GWH.near = got;
worldPromptCity("<b>Your kitchen garden</b> · <b>press E</b> to plant or pick", function () { gwHomeCard(got); });
}
else if (!got && GWH.near) {
GWH.near = null;
worldPromptCity(null);
}
}
function gwHomeLoad(name) {
return cityRpc("green_home", { p_lot: name, p_slot: 0, p_action: "list", p_crop: null }).then(function (o) { if (o && o.ok) {
GWH.beds[name] = o.beds || [];
gwHomePaint(name);
} return o; }).catch(function () { return null; });
}
function gwHomePaint(name) { return __ZC(304, 65, this, arguments, new.target); }
function gwHomeCard(name, msg) { return __ZC(304, 66, this, arguments, new.target); }
function gwHomeDo(name, slot, act, crop) { return __ZC(304, 67, this, arguments, new.target); }
"use strict";
function gwMeadowGeo() { return __ZC(304, 68, this, arguments, new.target); }
function gwMeadow(G) { return __ZC(304, 69, this, arguments, new.target); }
function gwSweepDress(G) { return __ZC(304, 70, this, arguments, new.target); }
(function () {
if (typeof gwPeople !== "function")
return;
var f = gwPeople;
gwPeople = function (G) { var r = f.apply(this, arguments); try {
gwSweepDress(G);
}
catch (e) {
if (window.console)
console.warn("[greenwold] sweep dress", e);
} return r; };
})();
