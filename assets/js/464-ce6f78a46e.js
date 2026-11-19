/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BLN = { geo: {}, mat: {}, tex: null, phx: null, bridges: [], river: null, riverW: 10, sceneryAt: 0 };
function blnLite() { return typeof LITE !== "undefined" && !!LITE; }
function blnGeo(key, make) { var g = BLN.geo[key]; if (!g) {
g = BLN.geo[key] = make();
g.userData.shared = true;
} return g; }
function blnMat(key, make) { var m = BLN.mat[key]; if (!m) {
m = BLN.mat[key] = make();
m.userData.ldShared = true;
} return m; }
function blnLam(col, o) { o = o || {}; return blnMat("l" + col + ":" + (o.e || 0) + ":" + (o.flat ? 1 : 0) + ":" + (o.ds ? 1 : 0), function () { var m = new THREE.MeshLambertMaterial({ color: col, flatShading: !!o.flat }); if (o.e) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
} if (o.ds)
m.side = THREE.DoubleSide; return m; }); }
function blnFire(col, op) { return blnMat("f" + col + ":" + op, function () { return new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }); }); }
function blnGlowTex() { return __ZC(464, 0, this, arguments, new.target); }
function blnSprite(col, size, op) {
var m = blnMat("s" + col + ":" + op, function () { return new THREE.SpriteMaterial({ map: blnGlowTex(), color: col, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending }); });
var s = new THREE.Sprite(m);
s.scale.set(size, size, 1);
return s;
}
function blnMesh(geo, mat, x, y, z, parent) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (parent)
parent.add(m); return m; }
function blnRise(n, w, h, col, size, op, speed) { return __ZC(464, 1, this, arguments, new.target); }
function blnWho(name, who, greet, extra) { return ldWho(name, "the Burning Lands", who, greet, extra); }
function blnTalker(g, r, talk) { var T = { p: { g: g }, r: r || 3.6, name: talk.name, t: talk }; LD.talkers.push(T); return T; }
var BLN_RIVER = [[-260, -50], [-120, -40], [-40, -52], [60, -46], [200, -60], [300, -48]];
var BLN_BRIDGES = [{ x: 0, z: -48, rot: 0.06, len: 26, w: 5, h: 2.6, name: "The Ember Bridge" }, { x: -33, z: -51, rot: -0.5, len: 24, w: 4.4, h: 2.3, name: "The Ash Bridge" }];
var BLN_VENTS = { x: -108, z: -132, r: 30 }, BLN_BEDS = { x: 100, z: -92, r: 32 };
function blnSegDist(px, pz, a, b) { var vx = b[0] - a[0], vz = b[1] - a[1], L = vx * vx + vz * vz, t = L ? Math.max(0, Math.min(1, ((px - a[0]) * vx + (pz - a[1]) * vz) / L)) : 0, dx = px - (a[0] + vx * t), dz = pz - (a[1] + vz * t); return Math.sqrt(dx * dx + dz * dz); }
function blnInLava(x, z) { for (var i = 1; i < BLN_RIVER.length; i++)
if (blnSegDist(x, z, BLN_RIVER[i - 1], BLN_RIVER[i]) < BLN.riverW / 2 + 0.6)
return true; return false; }
function blnOnBridge(x, z) {
for (var i = 0; i < BLN_BRIDGES.length; i++) {
var B = BLN_BRIDGES[i], dx = x - B.x, dz = z - B.z, c = Math.cos(-B.rot), s = Math.sin(-B.rot), lx = dx * c + dz * s, lz = -dx * s + dz * c;
if (Math.abs(lz) < B.len / 2 && Math.abs(lx) < B.w / 2 - 0.35)
return { B: B, t: (lz + B.len / 2) / B.len, lx: lx };
}
return null;
}
function blnDeck(B, t) { return B.h * Math.sin(Math.PI * Math.max(0, Math.min(1, t))); }
function blnBridgeMaker(B) { return __ZC(464, 2, this, arguments, new.target); }
function blnVentMaker(seed, big) { return __ZC(464, 3, this, arguments, new.target); }
function blnBedMaker(seed, w) { return __ZC(464, 4, this, arguments, new.target); }
function blnWatchMaker() { return __ZC(464, 5, this, arguments, new.target); }
function blnRoostMaker() { return __ZC(464, 6, this, arguments, new.target); }
(function () {
if (typeof LD_SETS === "undefined" || typeof LD_SETS.fire !== "function")
return;
var orig = LD_SETS.fire;
LD_SETS.fire = function (P) {
orig(P);
try {
blnLayout(P);
}
catch (e) {
if (window.console)
console.warn("[burning-lands] layout", e);
}
};
})();
function blnLayout(P) { return __ZC(464, 7, this, arguments, new.target); }
var BLN_ROOST = [-60, -100, 5.55];
function blnFeatherGeo(len, wid) { return __ZC(464, 8, this, arguments, new.target); }
function blnPhoenixModel() { return __ZC(464, 9, this, arguments, new.target); }
var BLN_PHX_REST = 45, BLN_PHX_FLY = 70;
function blnPhoenixPlan(P) { return __ZC(464, 10, this, arguments, new.target); }
function blnPhoenixTick(dt) { return __ZC(464, 11, this, arguments, new.target); }
function blnElementalModel(seed) { return __ZC(464, 12, this, arguments, new.target); }
function blnElemental(P, x, z, rot, seed, talk, wander, s) {
P.make(x, z, rot, 1, function (G) {
var e = blnElementalModel(seed);
if (s)
e.scale.setScalar(1.1 * s);
G.add(e);
var M = { g: G, wander: wander || null, home: [x, z] };
if (wander)
LD.movers.push(M);
if (talk)
LD.talkers.push({ p: M, r: 3.8, name: talk.name, t: talk });
return true;
});
}
function blnElementalPlan(P) { return __ZC(464, 13, this, arguments, new.target); }
var BLN_FOLK = [
["Ashka Varn", "guard", "the captain of the Lava Watch, a weathered woman in a red heat-cloak who has watched the lava river for thirty years; she knows real volcano science and loves to share it", "*lowers her spyglass* River's steady. You'll want the bridges; nobody crosses the lava, not even me.", 58, -58, 2.6, 0, { sex: "f", top: 0x5A2A1A, layerColor: 0x7A2A18, back: "cloak", backColor: 0x9A2A14, hat: "hood", hatColor: 0x7A2A18 }, 1],
["Teodor Flint", "guard", "a young lava-watcher on his first season, keen and a little nervous, who has learned every fact about lava he can", "*stands up straight* Lava-watcher Flint, on watch! Did you know some lava flows are slower than you walk?", 70, -56, -2.4, 5, { sex: "m", top: 0x5A2A1A, layerColor: 0x7A2A18, back: "cloak", backColor: 0x9A2A14 }, 0],
["Mother Hesta", "cook", "the cook of Cinder Rest, who bakes flatbread on hot stones and makes everyone drink water before the road", "*waves a wooden paddle* Sit, eat, drink. Nobody walks to the palace on an empty stomach while I'm here.", 31, 21, -0.6, 0, { sex: "f" }, 1],
["Rafi Doun", "merchant", "a water-seller at Cinder Rest with clay jars of cool spring water from under the mountain, cheerful and full of travellers' gossip", "*taps a sweating clay jar* Coldest water in the Burning Lands! The spring is under the mountain; I walk it down myself.", 38, 16, -1.4, 0, { sex: "m", hat: "bandana", hatColor: 0xC8A060 }, 1],
["Old Imre", "scholar", "an old storyteller who sits at Cinder Rest and tells the tales of fire from many lands: Prometheus, Pele, Agni, the firebird, truthfully saying which are myths", "*settles on the bench* Sit a while. Shall I tell you how the Greeks said fire came to people?", 36, 29, 3.0, 0, { sex: "m", hairStyle: "bald" }, 1],
["Lio and Senna", "pilgrim", "two travellers, a brother and sister, on their way to see the Phoenix rise; they have come a long way and are excited and a bit footsore", "*both talk at once* Have you seen her fly? They say she wheels right over the palace!", 26, 14, 0.8, 0, {}, 0],
["Brother Cassian", "monk", "a pilgrim monk walking slowly to the Fire Palace to see the eternal flame; calm and kind, he talks about fire in human history and festivals of light", "*bows* Peace to you. I walk to see the flame that never goes out. Will you walk a while?", -6, -26, 3.1, 10, {}, 1],
["Yara Sol", "pilgrim", "a traveller who has come to sketch the Phoenix and the palace; she shows her drawings and asks what you have seen", "*holds up a charcoal sketch* Not bad, is it? I'm waiting for the Phoenix to fly. I want her wings right.", 6, -84, 3.0, 8, { sex: "f", back: "satchel" }, 0],
["Herald Corvan", "herald", "the herald of the Fire Palace, who stands by its gate in a scarlet tabard, announces visitors grandly and knows every room inside", "*unrolls a scroll* Hear ye! A visitor to the Fire Palace! Within: the Lava Throne Hall, the Crucible Room, the Lantern Room and more besides.", -14, -104, 0.4, 0, { sex: "m", top: 0x9A1A14, layer: "tunic", layerColor: 0xB8241A, hat: "cap", hatColor: 0xD8A030 }, 1],
["Dagny Coalbrook", "miner", "an ember gatherer with thick leather boots and long tongs, who knows exactly which plates of crust are safe to stand on", "*lifts a glowing lump with her tongs* Emberstone. Burns hot and long. The smiths pay well for it.", BLN_BEDS.x - 8, BLN_BEDS.z + 6, 1.0, 6, { sex: "f" }, 1],
["Pell Ashworth", "miner", "an ember gatherer, quiet and careful, who carries a basket of emberstone to the forge twice a day", "*nods* Mind the bright cracks. Walk the dark plates, like me.", BLN_BEDS.x + 12, BLN_BEDS.z - 10, -2.0, 6, { sex: "m" }, 0],
["Nim Ashworth", "miner", "Pell's daughter, a teenager learning ember gathering, who counts every stone and wants to be a smith one day", "*grins* I found eleven today! Pa found nine. Don't tell him I said.", BLN_BEDS.x + 2, BLN_BEDS.z + 14, 2.4, 5, { sex: "f", child: 1 }, 0],
["Orrin Pale", "alchemist", "a sulphur gatherer and chemist in a leather mask pushed up on his head, who explains real chemistry: sulphur, how sulphur is used in matches and to grow crops, in simple safe terms", "*pulls down his mask* Yellow gold, they call it. Sulphur. Smells of rotten eggs? That's the gas, not the crystal.", BLN_VENTS.x + 6, BLN_VENTS.z + 12, 0.5, 6, { sex: "m", face: "glasses" }, 1],
["Keziah Moor", "miner", "a sulphur gatherer who scrapes the crystals off the vent lips into a clay pot, cheerful despite the smell", "*waves the steam aside* Upwind, upwind! Then it's not so bad.", BLN_VENTS.x - 14, BLN_VENTS.z - 6, 2.2, 6, { sex: "f" }, 0],
["Master Harrow", "blacksmith", "the master smith of the open forges of the Burning Lands, broad and soot-black, who tells real facts about iron, steel and forging", "*rests the hammer on the anvil* Heat it till it glows orange, strike while it's hot. That's where the saying comes from.", 74, 6, -1.4, 0, { sex: "m" }, 1],
["Tamsin Reed", "blacksmith", "a smith's apprentice who quenches blades and pumps the bellows; she explains quenching and tempering", "*plunges a blade into water with a hiss* Quenching. Makes it hard. Too hard and it snaps, so then we temper it.", 86, -4, -1.8, 3, { sex: "f" }, 0],
["Juno Blackglass", "mason", "an obsidian cutter who chips black volcanic glass into blades and mirrors, and explains why obsidian is so sharp", "*holds up a black flake* Sharper than a surgeon's steel at the edge. People made knives like this for thousands of years.", -70, -70, 1.2, 6, { sex: "f" }, 0]
];
function blnFolkPlan(P) { return __ZC(464, 14, this, arguments, new.target); }
function blnHere() {
return typeof LD !== "undefined" && LD.g && LD.kind === "fire" && store.here === LD.rid && !store.inside && !(typeof INT !== "undefined" && INT) && !(typeof WLD !== "undefined" && WLD.on);
}
var BLN_HIDE = /^(firepillar|emberfield|lavaflow|volcano)$/;
function blnScenery() { return __ZC(464, 15, this, arguments, new.target); }
(function () {
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (blnHere()) {
var lx = x - LD.ox, lz = z - LD.oz;
if (blnInLava(lx, lz) && !blnOnBridge(lx, lz))
return true;
var S = BLN.spires || [];
for (var i = 0; i < S.length; i++) {
var dx = lx - S[i][0], dz = lz - S[i][1];
if (dx * dx + dz * dz < S[i][2] * S[i][2])
return true;
}
}
return ba.apply(this, arguments);
};
}
if (typeof supportAt === "function") {
var sa = supportAt;
supportAt = function (x, z, feet) {
var best = sa.apply(this, arguments);
if (blnHere()) {
var lx = x - LD.ox, lz = z - LD.oz, on = blnOnBridge(lx, lz);
if (on) {
var B = on.B, h = ldY(B.x, B.z) + blnDeck(B, on.t) + 0.05;
if (h > best && h <= feet + (typeof STEP_UP !== "undefined" ? STEP_UP : 0.6) + 0.05)
best = h;
}
}
return best;
};
}
if (typeof ldTick === "function") {
var lt = ldTick;
ldTick = function (dt) {
lt.apply(this, arguments);
try {
if (typeof LD !== "undefined" && LD.g && LD.kind === "fire") {
BLN.sceneryAt -= dt;
if (BLN.sceneryAt <= 0) {
BLN.sceneryAt = 1;
blnScenery();
}
}
}
catch (e) {
if (window.console)
console.warn("[burning-lands]", e);
}
};
}
})();
try {
if (typeof DQ_LANDS !== "undefined" && DQ_LANDS.fire)
DQ_LANDS.fire.gather.forEach(function (g) { if (g[0] === "dr_sulphur")
g[4] = [BLN_VENTS.x, BLN_VENTS.z, BLN_VENTS.r]; if (g[0] === "cr_ember")
g[4] = [BLN_BEDS.x, BLN_BEDS.z, BLN_BEDS.r]; });
}
catch (e) { }
if (typeof ldStrip === "function") {
ldStrip = function (pts, w, lift, yfn) { return __ZC(464, 16, this, arguments, new.target); };
}
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
FURN.bln_lantern = function () {
var g = new THREE.Group(), iron = blnLam(0x2A2624), paper = blnLam(0x6A2416, { ds: true });
blnMesh(blnGeo("lnBase", function () { return new THREE.CylinderGeometry(0.22, 0.3, 0.08, 10); }), iron, 0, 0.04, 0, g);
blnMesh(blnGeo("lnPole", function () { return new THREE.CylinderGeometry(0.03, 0.03, 1.3, 6); }), iron, 0, 0.7, 0, g);
blnMesh(blnGeo("lnRing", function () { return new THREE.CylinderGeometry(0.2, 0.2, 0.04, 12); }), iron, 0, 1.36, 0, g);
var lamp = blnMesh(blnGeo("lnPaper", function () { var g2 = new THREE.SphereGeometry(0.3, 14, 10); g2.scale(1, 1.25, 1); return g2; }), paper, 0, 1.72, 0, g);
blnMesh(blnGeo("lnTop", function () { return new THREE.CylinderGeometry(0.12, 0.16, 0.06, 10); }), iron, 0, 2.1, 0, g);
for (var i = 0; i < 6; i++) {
var rb = blnMesh(blnGeo("lnRib", function () { return new THREE.TorusGeometry(0.3, 0.008, 4, 16, Math.PI); }), iron, 0, 1.72, 0, g);
rb.rotation.set(0, i * Math.PI / 6, Math.PI / 2);
rb.scale.set(1.25, 1, 1);
}
var tas = blnMesh(blnGeo("lnTassel", function () { return new THREE.ConeGeometry(0.05, 0.22, 6); }), blnLam(0xD8A030), 0, 1.24, 0, g);
tas.rotation.x = Math.PI;
var fl = blnSprite(0xFFC060, 1.6, 0.55);
fl.position.y = 1.72;
fl.visible = false;
g.add(fl);
g.userData.blnLamp = { paper: lamp, glow: fl, lit: false };
g.userData.keep = 1;
return g;
};
FURN.bln_crucible = function () {
var g = new THREE.Group(), stone = blnLam(0x4A3A32, { flat: true }), iron = blnLam(0x2A2A2E), brick = blnLam(0x6A3424, { flat: true });
blnMesh(blnGeo("crHearth", function () { return new THREE.CylinderGeometry(1.15, 1.25, 0.5, 8); }), brick, 0, 0.25, 0, g);
var coals = blnMesh(blnGeo("crCoals", function () { return new THREE.CylinderGeometry(1.0, 1.0, 0.06, 8); }), blnLam(0xC03A0C, { e: 0x8A2000 }), 0, 0.52, 0, g);
void coals;
blnMesh(blnGeo("crPot", function () { return new THREE.CylinderGeometry(0.62, 0.44, 0.95, 16, 1, true); }), iron, 0, 1.0, 0, g);
blnMesh(blnGeo("crPotBase", function () { return new THREE.CircleGeometry(0.44, 16); }), iron, 0, 0.53, 0, g).rotation.x = Math.PI / 2;
var lip = blnMesh(blnGeo("crLip", function () { return new THREE.TorusGeometry(0.62, 0.05, 6, 18); }), iron, 0, 1.47, 0, g);
lip.rotation.x = Math.PI / 2;
var spout = blnMesh(blnGeo("crSpout", function () { return new THREE.BoxGeometry(0.2, 0.08, 0.4); }), iron, 0, 1.44, 0.72, g);
spout.rotation.x = 0.25;
var melt = blnMesh(blnGeo("crMelt", function () { return new THREE.CircleGeometry(0.58, 18); }), new THREE.MeshBasicMaterial({ color: 0x5A1A0A }), 0, 1.32, 0, g);
melt.rotation.x = -Math.PI / 2;
var heat = blnSprite(0xFF7A2A, 2.2, 0.0);
heat.material = heat.material.clone();
heat.material.opacity = 0.12;
heat.position.y = 1.5;
g.add(heat);
var mould = new THREE.Group();
mould.position.set(0, 0, 1.55);
g.add(mould);
blnMesh(blnGeo("crMould", function () { return new THREE.BoxGeometry(1.2, 0.55, 0.7); }), stone, 0, 0.275, 0, mould);
var bars = [];
for (var i = 0; i < 3; i++) {
var b = blnMesh(blnGeo("crBar", function () { return new THREE.BoxGeometry(0.26, 0.06, 0.5); }), new THREE.MeshBasicMaterial({ color: 0x1A1412 }), -0.38 + i * 0.38, 0.56, 0, mould);
bars.push(b);
}
var tg = blnMesh(blnGeo("crTong", function () { return new THREE.BoxGeometry(0.04, 1.1, 0.04); }), iron, 1.0, 1.0, 0.9, g);
tg.rotation.z = 0.2;
blnMesh(blnGeo("crBasket", function () { return new THREE.CylinderGeometry(0.3, 0.24, 0.35, 10); }), blnLam(0x6A4A2A), -1.2, 0.18, 0.6, g);
for (var k = 0; k < 5; k++)
blnMesh(blnGeo("crOre", function () { return new THREE.DodecahedronGeometry(0.09, 0); }), blnLam(0x6A5A50, { flat: true }), -1.2 + ((k * 37) % 5 - 2) * 0.06, 0.38, 0.6 + ((k * 23) % 5 - 2) * 0.05, g);
g.userData.blnCru = { melt: melt, heat: heat, bars: bars };
g.userData.keep = 1;
return g;
};
FURN.bln_plaque = function () {
var g = new THREE.Group(), br = blnLam(0x8A6A30, { e: 0x1A1004 });
blnMesh(blnGeo("plPost", function () { return new THREE.CylinderGeometry(0.05, 0.08, 1.0, 8); }), br, 0, 0.5, 0, g);
var p = blnMesh(blnGeo("plBoard", function () { return new THREE.BoxGeometry(0.7, 0.5, 0.05); }), br, 0, 1.15, 0, g);
p.rotation.x = -0.5;
if (typeof wSign === "function") {
var s = wSign(["The Crucible", "Press E to read"], 0.62, 0.42, "#3A2410", "#F2D890");
s.position.set(0, 1.165, 0.03);
s.rotation.x = -0.5;
g.add(s);
}
return g;
};
if (typeof SOLIDFURN !== "undefined") {
SOLIDFURN.bln_crucible = 1;
}
})();
function blnInRoot(key) { var out = []; if (typeof INT !== "undefined" && INT && INT.root)
INT.root.traverse(function (o) { if (o.userData[key])
out.push(o); }); return out; }
function blnLitMat() { return blnMat("lnLit", function () { return new THREE.MeshBasicMaterial({ color: 0xFFB050, side: THREE.DoubleSide }); }); }
function blnLampSet(o, on) { var L = o.userData.blnLamp; L.lit = on; L.paper.material = on ? blnLitMat() : blnLam(0x6A2416, { ds: true }); L.glow.visible = on; }
function blnLanterns() { return __ZC(464, 17, this, arguments, new.target); }
var BLN_METALS = {
iron: { n: "Iron", t: "1,538 °C", col: 0xFFE0A0, cool: 0x5A5A60, say: "Iron melts at about 1,538 °C, so hot it glows nearly white. Most of the world's iron is made in blast furnaces and turned into steel by taking out some of its carbon." },
copper: { n: "Copper", t: "1,085 °C", col: 0xFFA050, cool: 0xB8683A, say: "Copper melts at about 1,085 °C. It was one of the first metals people worked, about 10,000 years ago; mixed with tin it makes bronze." },
gold: { n: "Gold", t: "1,064 °C", col: 0xFFC040, cool: 0xE8B830, say: "Gold melts at about 1,064 °C. It never rusts or tarnishes, so gold made thousands of years ago still shines today." },
tin: { n: "Tin", t: "232 °C", col: 0xFFC8A0, cool: 0xC8C8CC, say: "Tin melts at only 232 °C, cooler than many ovens. Tin and copper together make bronze, which gave the Bronze Age its name." }
};
var BLN_CRU = { metal: null, poured: false };
function blnCru() { var c = blnInRoot("blnCru"); return c.length ? c[0].userData.blnCru : null; }
function blnCrucible() { return __ZC(464, 18, this, arguments, new.target); }
function blnMelt(k) { return __ZC(464, 19, this, arguments, new.target); }
function blnPour() { return __ZC(464, 20, this, arguments, new.target); }
function blnPlaque() { return __ZC(464, 21, this, arguments, new.target); }
(function () {
if (typeof ES_ROOM === "undefined" || typeof evbFit !== "function")
return;
ES_ROOM.fpcrucible = evbFit({ mid: [["bln_crucible", 0.5, 0]], far: ["bln_plaque"], sides: ["oreheap", "firebowl", "oreheap"], ceil: "ironchandelier",
acts: [[0.3, 0, 2.6, "The crucible", "use it", blnCrucible], [0.84, 0, 1.8, "The founder's plaque", "read it", blnPlaque]] });
ES_ROOM.fplanterns = evbFit({ sides: ["bln_lantern", "bln_lantern", "bln_lantern", "bln_lantern"], far: ["bln_lantern", "bln_lantern"], mid: [["wd:kf_table", 0.5, 0]],
acts: [[0.5, 0, 3.2, "The lanterns", "light one", blnLanterns]] });
})();
