/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var FKW_KEY = "frankenstein", FKW_NAME = "Frankenstein", FKW_LONG = "Frankenstein: Geneva, Ingolstadt, the Alps and the ice";
var FKW = { base: -10600000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], moving: false, ride: null, night: 0, lights: 0, water: [], inst: [], beasts: [], hgt: null, rooms: [], doors: [], envK: null, st: {} };
var FKW_ERA = " It is the 1790s, in Mary Shelley's book Frankenstein (1818, revised 1831; the book only, never any film). Speak in the manner of the time, briefly and in character; keep it kind and suitable for all ages.";
var FKW_SC = {
arctic: { x: 0, name: "The Arctic: Walton's ship in the ice", bound: 720, env: "ice" },
geneva: { x: 6000, name: "Geneva, and its lake", bound: 820, env: "lake" },
ingol: { x: 12000, name: "Ingolstadt", bound: 520, env: "town" },
alps: { x: 18000, name: "Chamounix and the Mer de Glace", bound: 1300, env: "alpine" },
cottage: { x: 24000, name: "The forest, and the De Laceys' cottage", bound: 560, env: "forest" },
rhine: { x: 30000, name: "Down the Rhine", bound: 560, env: "river" },
orkney: { x: 36000, name: "The Orkneys", bound: 460, env: "grey" },
ireland: { x: 42000, name: "The coast of Ireland", bound: 360, env: "grey" },
evian: { x: 48000, name: "Évian, on the lake", bound: 360, env: "evening" },
chase: { x: 54000, name: "The chase: over the snows to the frozen sea", bound: 980, env: "snow" }
};
function fkwScAt(x) { var best = null, bd = 1e9; for (var k in FKW_SC) {
var d = Math.abs(x - FKW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 5000 ? best : null; }
var FKW_AT = {
ship: { sc: "arctic", x: 9, z: 4, name: "the ice beside Walton's ship", ry: Math.PI / 2 },
deck: { sc: "arctic", x: 0, z: -1, y: 3.05, name: "the deck of Walton's ship", ry: 0 },
bow: { sc: "arctic", x: 0, z: -13, y: 3.05, name: "the bow", ry: 0 },
rail: { sc: "arctic", x: 2.8, z: -6, y: 3.05, name: "the starboard rail, looking north" },
wheel: { sc: "arctic", x: 0, z: 14.2, y: 3.05, name: "the wheel, at the stern" },
cabin: { sc: "arctic", x: 0, z: 8.6, y: 3.05, name: "Walton's cabin", ry: Math.PI },
berth: { sc: "arctic", x: -1.6, z: 11.4, y: 3.05, name: "the berth in the cabin" },
desk: { sc: "arctic", x: 1.6, z: 11.6, y: 3.05, name: "Walton's writing-desk" },
ice: { sc: "arctic", x: 14, z: 0, name: "the ice beside the ship" },
floe: { sc: "arctic", x: 44, z: -64, name: "the drifting fragment of ice" },
north: { sc: "arctic", x: -30, z: -260, name: "the plain of ice to the north" },
ridge: { sc: "arctic", x: -90, z: -180, name: "the ridge of piled ice" },
far: { sc: "arctic", x: -70, z: -560, name: "far out on the ice, half a mile north" },
lead: { sc: "arctic", x: 0, z: -60, name: "the lane of open water in the ice" },
raft: { sc: "arctic", x: -7.5, z: 10, name: "the ice raft under the cabin window" },
quay: { sc: "geneva", x: -120, z: -52, name: "the quay at Geneva", ry: Math.PI },
grandrue: { sc: "geneva", x: -160, z: 20, name: "the Grand' Rue" },
fhouse: { sc: "geneva", x: -167, z: 16, name: "the Frankensteins' house in the town" },
cathedral: { sc: "geneva", x: -262, z: 86, name: "the cathedral of Saint Pierre" },
court: { sc: "geneva", x: -60, z: 27, name: "the court-house and prison" },
gate: { sc: "geneva", x: 58, z: 20, name: "the gate of the town" },
secheron: { sc: "geneva", x: 118, z: -14, name: "Sécheron, outside the walls" },
plain: { sc: "geneva", x: -110, z: 330, name: "the fields of Plainpalais" },
murder: { sc: "geneva", x: -60, z: 380, name: "the place where William was found" },
belrive: { sc: "geneva", x: 400, z: -10, name: "Belrive, the house by the lake" },
oak: { sc: "geneva", x: 430, z: 46, name: "the old oak at Belrive" },
landing: { sc: "geneva", x: 400, z: -62, name: "the boat-landing at Belrive" },
shore: { sc: "geneva", x: 250, z: -46, name: "the lake shore" },
saleve: { sc: "geneva", x: 520, z: 520, name: "the foot of the Salève" },
inn: { sc: "ingol", x: 150, z: 8, name: "the inn-yard where the diligence stops", ry: Math.PI },
square: { sc: "ingol", x: 0, z: 26, name: "the square of Ingolstadt" },
church: { sc: "ingol", x: 0, z: -33, name: "the church with the white steeple" },
univ: { sc: "ingol", x: 90, z: -7, name: "the university" },
lodging: { sc: "ingol", x: -72, z: 21, name: "the door of Victor's lodgings" },
yard: { sc: "ingol", x: -72, z: 56, name: "the courtyard of the house" },
vaults: { sc: "ingol", x: -24, z: -112, name: "the churchyard and the charnel-house" },
townout: { sc: "ingol", x: 0, z: 200, name: "the road out of the town" },
woods: { sc: "ingol", x: -150, z: 330, name: "the wood near Ingolstadt" },
valley: { sc: "alps", x: -200, z: 30, name: "the road up the valley of the Arve", ry: Math.PI / 2 },
bridge: { sc: "alps", x: -320, z: 44, name: "the bridge over the Arve" },
chamounix: { sc: "alps", x: 0, z: 10, name: "the village of Chamounix" },
chinn: { sc: "alps", x: 30, z: -3, name: "the inn at Chamounix" },
arveiron: { sc: "alps", x: 180, z: -120, name: "the source of the Arveiron" },
path: { sc: "alps", x: 70, z: -60, name: "the path up Montanvert" },
montanvert: { sc: "alps", x: 210, z: -420, name: "the summit of Montanvert" },
glacier: { sc: "alps", x: 330, z: -560, name: "the Mer de Glace" },
opposite: { sc: "alps", x: 470, z: -700, name: "the far side of the glacier" },
hut: { sc: "alps", x: 520, z: -760, name: "the creature's hut on the mountain" },
wake: { sc: "cottage", x: 180, z: 300, name: "the wood where he first woke", ry: Math.PI },
shepherd: { sc: "cottage", x: -150, z: 200, name: "the shepherd's hut" },
village: { sc: "cottage", x: -300, z: 40, name: "the village" },
cott: { sc: "cottage", x: 0, z: 23, name: "the De Laceys' cottage" },
hovel: { sc: "cottage", x: 0, z: 8.4, name: "the hovel against the back of the cottage" },
chink: { sc: "cottage", x: -1.2, z: 10.6, name: "the chink in the wall" },
garden: { sc: "cottage", x: 10, z: 27, name: "the cottage garden" },
woodpile: { sc: "cottage", x: -14, z: 17.6, name: "the woodpile" },
stream: { sc: "cottage", x: 60, z: 0, name: "the stream" },
satchel: { sc: "cottage", x: 130, z: -160, name: "a leathern satchel in the wood" },
river: { sc: "cottage", x: 200, z: -274, name: "the river, swollen and fast" },
rboat: { sc: "rhine", x: 29.8, z: 418.8, y: 0.65, name: "the boat on the Rhine", ry: Math.PI },
rbank: { sc: "rhine", x: -40, z: 40, name: "the bank of the Rhine" },
castle: { sc: "rhine", x: -120, z: -220, name: "the ruined castle on its crag" },
vines: { sc: "rhine", x: -80, z: 120, name: "the vineyards on the bank" },
orkland: { sc: "orkney", x: 120, z: 10, name: "the landing on the island", ry: -Math.PI / 2 },
ohuts: { sc: "orkney", x: 20, z: -20, name: "the three huts" },
olab: { sc: "orkney", x: 40, z: 4.2, name: "Victor's hut" },
oshore: { sc: "orkney", x: 140, z: 40, name: "the shore, under the moon" },
ocliff: { sc: "orkney", x: -70, z: -90, name: "the rocks above the sea" },
iquay: { sc: "ireland", x: 0, z: -40, name: "the harbour", ry: 0 },
ibeach: { sc: "ireland", x: -90, z: -70, name: "the beach where the body was found" },
kirwin: { sc: "ireland", x: 30, z: 1, name: "Mr. Kirwin's house" },
iinn: { sc: "ireland", x: -60, z: 1, name: "the inn" },
iprison: { sc: "ireland", x: 80, z: 41, name: "the prison" },
elanding: { sc: "evian", x: 0, z: -40, name: "the landing at Évian", ry: 0 },
einn: { sc: "evian", x: 0, z: 2.4, name: "the inn at Évian" },
thonon: { sc: "evian", x: -30, z: -1.6, name: "the inn at the baths near Thonon" },
eshore: { sc: "evian", x: 60, z: -44, name: "the shore of the lake" },
cstart: { sc: "chase", x: 0, z: 300, name: "the plains of Russia under snow", ry: Math.PI },
chut: { sc: "chase", x: -40, z: 220, name: "a peasant's hut" },
cmark1: { sc: "chase", x: 60, z: 120, name: "a mark cut in the bark of a tree" },
cmark2: { sc: "chase", x: -80, z: -40, name: "words cut in a stone" },
cmark3: { sc: "chase", x: 40, z: -200, name: "food left on the snow" },
cvillage: { sc: "chase", x: -20, z: -320, name: "the hamlet by the sea" },
cshore: { sc: "chase", x: 0, z: -420, name: "the edge of the frozen sea" },
csea: { sc: "chase", x: 0, z: -720, name: "far out on the frozen sea" }
};
function fkwAtPt(at) { if (typeof at === "string")
at = FKW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
var FKW_ENV = {
ice: { top: 0x6A8AB8, low: 0xE8EEF2, fog: 0xD8E2EA, fogD: 0.0024, sun: 0.85, sunCol: 0xFFF4E8, sunDir: [0.3, 0.35, -0.6], hemi: 0.82, hemiCol: 0xE8F0FF, hemiGround: 0x9AA8B8 },
icefog: { top: 0xB8C4CE, low: 0xDDE4EA, fog: 0xD4DCE2, fogD: 0.012, sun: 0.5, sunCol: 0xF0F0F0, sunDir: [0.2, 0.6, -0.3], hemi: 0.86, hemiCol: 0xE8EEF4, hemiGround: 0x9AA4AE },
icenight: { top: 0x060C1A, low: 0x1A2638, fog: 0x141E2C, fogD: 0.004, sun: 0.28, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.6, -0.4], hemi: 0.34, hemiCol: 0x6A7AA8, hemiGround: 0x20283A, stars: 0.95 },
lake: { top: 0x5A8ED8, low: 0xE4EAEE, fog: 0xD0DCE4, fogD: 0.0011, sun: 1.05, sunCol: 0xFFF2DC, sunDir: [0.4, 0.8, 0.3], hemi: 0.76, hemiCol: 0xDCE8F4, hemiGround: 0x4A5A34 },
storm: { top: 0x1E2430, low: 0x4A5260, fog: 0x3A4250, fogD: 0.0045, sun: 0.32, sunCol: 0xB8C0D0, sunDir: [0.2, 0.9, 0.1], hemi: 0.5, hemiCol: 0x8A94A8, hemiGround: 0x1E2418 },
town: { top: 0x6A94D0, low: 0xE0E2DC, fog: 0xC8CCC8, fogD: 0.0024, sun: 0.95, sunCol: 0xFFF0D8, sunDir: [0.4, 0.75, 0.35], hemi: 0.72, hemiCol: 0xD8E0EA, hemiGround: 0x4A4638 },
rain: { top: 0x3A4450, low: 0x7A848A, fog: 0x6A7278, fogD: 0.007, sun: 0.42, sunCol: 0xC8D0D8, sunDir: [0.2, 0.9, 0.1], hemi: 0.6, hemiCol: 0xA8B0B8, hemiGround: 0x2A2E28 },
alpine: { top: 0x3A78D0, low: 0xE8EEF4, fog: 0xD8E4F0, fogD: 0.00065, sun: 1.1, sunCol: 0xFFF6E4, sunDir: [0.45, 0.8, 0.25], hemi: 0.78, hemiCol: 0xE0ECF8, hemiGround: 0x5A6448 },
mist: { top: 0x9AA8B8, low: 0xD8DEE2, fog: 0xC8D0D6, fogD: 0.0055, sun: 0.55, sunCol: 0xE8ECF0, sunDir: [0.3, 0.8, 0.2], hemi: 0.8, hemiCol: 0xD8E0E8, hemiGround: 0x5A5E58 },
forest: { top: 0x5A8AC0, low: 0xC8D8C0, fog: 0x9AAE98, fogD: 0.0034, sun: 0.86, sunCol: 0xFFF0D0, sunDir: [0.3, 0.85, 0.2], hemi: 0.68, hemiCol: 0xC8DCC0, hemiGround: 0x3A4A26 },
winter: { top: 0x7A90AA, low: 0xE4E8EC, fog: 0xD0D8DE, fogD: 0.0042, sun: 0.6, sunCol: 0xF0F0F0, sunDir: [0.3, 0.5, 0.2], hemi: 0.82, hemiCol: 0xE0E8F0, hemiGround: 0x8A8E90 },
spring: { top: 0x5A94DA, low: 0xEAF0E4, fog: 0xD4E2D0, fogD: 0.0018, sun: 1.05, sunCol: 0xFFF4DA, sunDir: [0.4, 0.8, 0.3], hemi: 0.78, hemiCol: 0xDCECF4, hemiGround: 0x4A6A2E },
autumn: { top: 0x6A88B8, low: 0xE8D8B8, fog: 0xC8B898, fogD: 0.0026, sun: 0.8, sunCol: 0xFFD8A8, sunDir: [0.5, 0.55, 0.2], hemi: 0.68, hemiCol: 0xE8D8C0, hemiGround: 0x5A4A2A },
river: { top: 0x5A90D8, low: 0xE6EAE0, fog: 0xD0D8CC, fogD: 0.0016, sun: 1.0, sunCol: 0xFFF0D8, sunDir: [0.4, 0.8, 0.3], hemi: 0.75, hemiCol: 0xDCE6F0, hemiGround: 0x4A5A30 },
grey: { top: 0x6A7A8A, low: 0xC8CED2, fog: 0xA8B2B8, fogD: 0.0045, sun: 0.6, sunCol: 0xE8ECF0, sunDir: [0.3, 0.7, 0.3], hemi: 0.72, hemiCol: 0xC8D2DA, hemiGround: 0x3A4234 },
moon: { top: 0x0A1428, low: 0x24304A, fog: 0x1A2436, fogD: 0.0035, sun: 0.4, sunCol: 0xC8D8FF, sunDir: [0.4, 0.6, -0.3], hemi: 0.38, hemiCol: 0x7A8AB8, hemiGround: 0x101418, stars: 0.85 },
evening: { top: 0x3A4A8A, low: 0xF0B07A, fog: 0xC89A80, fogD: 0.0018, sun: 0.72, sunCol: 0xFFB070, sunDir: [-0.7, 0.3, 0.3], hemi: 0.62, hemiCol: 0xF0C8A8, hemiGround: 0x3A3020 },
night: { top: 0x060A18, low: 0x141A2A, fog: 0x10141E, fogD: 0.0042, sun: 0.22, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.28, hemiCol: 0x5A6A98, hemiGround: 0x0A0C10, stars: 0.95 },
snow: { top: 0x8A9AB0, low: 0xE8ECF0, fog: 0xDCE2E8, fogD: 0.0028, sun: 0.7, sunCol: 0xF4F4F8, sunDir: [0.3, 0.4, -0.5], hemi: 0.86, hemiCol: 0xE8EEF6, hemiGround: 0xA8B0BA },
indoor: { top: 0x2A2018, low: 0x4A3A2A, fog: 0x3A2E22, fogD: 0.012, sun: 0.24, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.8, hemiCol: 0xFFE6C0, hemiGround: 0x3A2A1E },
garret: { top: 0x140E0A, low: 0x2A1E14, fog: 0x1E160E, fogD: 0.016, sun: 0.12, sunCol: 0xFFC890, sunDir: [0.2, 0.9, 0.1], hemi: 0.55, hemiCol: 0xFFD0A0, hemiGround: 0x1A120A },
cell: { top: 0x0E0E10, low: 0x2A2A2E, fog: 0x1A1A1E, fogD: 0.02, sun: 0.12, sunCol: 0xD8D8E8, sunDir: [0.3, 0.9, 0.1], hemi: 0.48, hemiCol: 0xB8B8C8, hemiGround: 0x1A1A1A }
};
var FKW_Q = [];
function fkQ(s) { FKW_Q.push(s); return "<i>“" + s + "”</i>"; }
function fkQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0'>" + fkQ(s) + "</p>"; }).join(""); }
function fkEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function fkSrc(part) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>Mary Shelley, Frankenstein (1831 text)" + (part ? ", " + part : "") + "</div>"; }
function fkwLite() { return typeof LITE !== "undefined" && !!LITE; }
function fkwPhotoTex(name, mpt, nrm) { return __ZC(503, 0, this, arguments, new.target); }
function fkwS(name, col, mpt, o) { return __ZC(503, 1, this, arguments, new.target); }
function fkwCanvas(key, w, h, fn) { if (FKW.tex[key])
return FKW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (FKW.tex[key] = t); }
function fkwM(key, make) { return FKW.mats[key] || (FKW.mats[key] = make()); }
function fkwLam(col, o) { return __ZC(503, 2, this, arguments, new.target); }
function fkwShine(col, r, mt) { return fkwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function fkwGlowM(col, op) { return fkwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function fkwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function fkwLeafTex() { return fkwPhotoTexAlpha(); }
function fkwPhotoTexAlpha() { var k = "leafpng"; if (FKW.tex[k])
return FKW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (FKW.tex[k] = t); }
function fkwFrondTex(kind) { return __ZC(503, 3, this, arguments, new.target); }
function fkwBambooTex() { return __ZC(503, 4, this, arguments, new.target); }
function fkwReedTex(kind) { return __ZC(503, 5, this, arguments, new.target); }
function fkwGrassTex() { return __ZC(503, 6, this, arguments, new.target); }
function fkwFlowerTex(col) { return __ZC(503, 7, this, arguments, new.target); }
function fkwSkinTex(kind) { return __ZC(503, 8, this, arguments, new.target); }
function fkwRippleTex() { return __ZC(503, 9, this, arguments, new.target); }
function fkwWaterM(col, op) { return fkwM("water" + col + "|" + op, function () { var t = fkwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var FKW_CELL = 48;
function fkwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / FKW_CELL), b = Math.floor(x1 / FKW_CELL), c = Math.floor(z0 / FKW_CELL), d = Math.floor(z1 / FKW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function fkwGridAdd(S) { var g = FKW.sgrid || (FKW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; fkwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function fkwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; FKW.solids.push(S); fkwGridAdd(S); return S; }
function fkwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; FKW.solids.push(S); fkwGridAdd(S); return S; }
function fkwSolidAt(x, z, feet) { return __ZC(503, 10, this, arguments, new.target); }
function fkwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; FKW.floors.push(F); return F; }
function fkwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; FKW.floors.push(F); return F; }
function fkwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function fkwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function fkwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < FKW.floors.length; i++) {
var F = FKW.floors[i];
if (F.off || !fkwFloorIn(F, x, z))
continue;
var y = fkwFloorY(F, x, z);
if (y <= feet + 1.1 && (best === null || y > best))
best = y;
} return best; }
function fkwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; FKW.spots.push(S); return S; }
function fkwPerson(seed, x, z, y, o, ry) { return __ZC(503, 11, this, arguments, new.target); }
function fkwTalk(P, name, persona, greet, r, fn) { FKW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona + FKW_ERA, greet: greet } }); return P; }
function fkwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(503, 12, this, arguments, new.target); }
function fkwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function fkwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = fkwHash(ix, iz), b = fkwHash(ix + 1, iz), c = fkwHash(ix, iz + 1), d = fkwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fkwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * fkwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function fkwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function fkwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), fkwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); FKW.water.push(m); return m; }
var FKW_GEO = {};
function fkwGeo(k, make) { if (FKW_GEO[k])
return FKW_GEO[k]; var g = make(); g.userData.shared = 1; return (FKW_GEO[k] = g); }
function fkwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function fkwFronds(n, len, wid, droop, y0, ring) { return __ZC(503, 13, this, arguments, new.target); }
function fkwInst(P, geo, mat, list, o) { return __ZC(503, 14, this, arguments, new.target); }
function fkwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function fkwPathD(x, z, pts) { var best = 1e9; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = Math.sqrt(px * px + pz * pz);
if (d < best)
best = d;
} return best; }
function fkwStrip(P, pts, w, hfn, mat, lift) { return __ZC(503, 15, this, arguments, new.target); }
function fkwPlant(P, kind, list, o) { return __ZC(503, 16, this, arguments, new.target); }
function fkwTaper(pts, rads, seg, rs, flat) { return __ZC(503, 17, this, arguments, new.target); }
function fkwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function fkwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function fkwSkinM(kind, col) { return __ZC(503, 18, this, arguments, new.target); }
function fkwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), fkwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function fkwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(503, 19, this, arguments, new.target); }
function fkwBoxG(w, h, d) { return __ZC(503, 20, this, arguments, new.target); }
function fkwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(fkwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !fkwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
fkwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function fkwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(fkwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function fkwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(503, 21, this, arguments, new.target); }
function fkwHouse(P, x, z, w, d, h, o) { return __ZC(503, 22, this, arguments, new.target); }
function fkwLand(x, z) { if (FKW.inRm && fkwRoomAt(x, z))
return -999; return FKW.hgt ? FKW.hgt(x, z) : 0; }
function fkwGround(x, z, feet) { var f = fkwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = fkwLand(x, z); return f === null ? h : Math.max(f, h); }
var FKW_SCN = {};
function fkwSc() { return FKW_SC[FKW.sc] || FKW_SC.arctic; }
function fkwSceneDrop() { return __ZC(503, 23, this, arguments, new.target); }
function fkwScene(k) { return __ZC(503, 24, this, arguments, new.target); }
function fkwVeil() { if (FKW.veil)
return FKW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); FKW.veil = v; return v; }
function fkwGo(at, msg, after) { return __ZC(503, 25, this, arguments, new.target); }
function fkwSmoke(P, x, y, z, col, n) { return __ZC(503, 26, this, arguments, new.target); }
function fkwFire(P, x, y, z, s) { return __ZC(503, 27, this, arguments, new.target); }
function fkwLocalSc() { var L = worldLocal(); return { x: L.x - fkwSc().x, z: L.z }; }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
var C = function (o, list) { return list[Math.floor(o.r * list.length) % list.length]; };
Object.assign(DLN_WEAR, {
fkgent: function (o) {
var c = C(o, [0x2A3A5A, 0x3A2A22, 0x2E4A3A, 0x4A3A5A, 0x1E1E24, 0x5A4A30]);
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:tails:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots"],
col: { shirt: 0xF6F2E8, collar: 0xF6F2E8, tie: 0xF4F0E6, vest: C(o, [0xE8DCC0, 0xC8A86A, 0x8A2A2A, 0xF0ECE0]), coat: c, trou: C(o, [0xE8DCC0, 0x2A2A2E, 0xC8B890]), stock: 0xF0ECE2 }, shoes: 0x141210 };
},
fkvictor: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:tails:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots"],
col: { shirt: 0xF6F2E8, collar: 0xF6F2E8, tie: 0xF4F0E6, vest: 0xD8C8A0, coat: 0x1E2A44, trou: 0xD8C8A0, stock: 0xF0ECE2 }, shoes: 0x141210 };
},
fkworn: function (o) {
return { ids: ["oz:shirt:long:worn7", "oz:collar:low:soft", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:boots"],
col: { shirt: 0xC8C0A8, collar: 0xC8C0A8, tie: 0x3A3A3A, coat: 0x3A3430, trou: 0x4A443A }, shoes: 0x2A241E };
},
fkclerval: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:satin", "oz:coat:tails:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots"],
col: { shirt: 0xF8F6EE, collar: 0xF8F6EE, tie: 0xF8F6EE, vest: 0xE8C860, coat: 0x4A6A3A, trou: 0xE8E0C8, stock: 0xF4F0E8 }, shoes: 0x1A1410 };
},
fkelder: function (o) {
var c = C(o, [0x2A2A2E, 0x3A3028, 0x2A3040]);
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth:chain", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots"],
col: { shirt: 0xF4F0E6, collar: 0xF4F0E6, tie: 0xF4F0E6, vest: 0x4A4038, coat: c, trou: c, stock: 0x2A2A2E }, shoes: 0x141210 };
},
fklady: function (o) {
var c = C(o, [0xF4F0E8, 0xD8E4F0, 0xE8D8E0, 0xF0E4C8, 0xC8D8C8, 0xE8E0F0]);
return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.12:cloth", "oz:collar:high:none"].concat(o.r > 0.5 ? ["oz:pelerine"] : []),
col: { dress: c, skirt: c, trim: 0xE8D8B0, collar: 0xFAF8F2, cape: C(o, [0x3A4A6A, 0x6A3A3A, 0x4A5A4A]) }, shoes: 0x3A2A20 };
},
fkeliz: function (o) {
return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.1:cloth", "oz:collar:high:none", "oz:sash"],
col: { dress: 0xF8F6F0, skirt: 0xF8F6F0, trim: 0xE8E0D0, collar: 0xFAF8F2, sash: 0x5A7AB0 }, shoes: 0x6A5A4A };
},
fkmaid: function (o) {
var c = C(o, [0x6A5A4A, 0x4A5A6A, 0x7A6A5A, 0x5A4A5A, 0x8A7A5A]);
return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.16:cloth", "oz:collar:high:none", "oz:apron:half:long:0.14"],
col: { dress: c, skirt: c, trim: 0x3A3A3A, collar: 0xF4F0E6, apron: 0xF0ECE0 }, shoes: 0x2A2018 };
},
fkwork: function (o) {
return { ids: ["oz:shirt:long:cloth", "oz:collar:low:soft", "oz:vest:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots"],
col: { shirt: C(o, [0xE8E0CC, 0xD8D0B8, 0xC8C0A8]), collar: 0xE8E0CC, tie: C(o, [0x8A2A2A, 0x2A4A6A, 0x3A3A2A]), vest: C(o, [0x5A4A36, 0x3A4A3A, 0x6A5A40, 0x4A3A3A]), trou: C(o, [0x4A4036, 0x3A3A44, 0x5A5040]), stock: C(o, [0xC8C0B0, 0x8A8070]) }, shoes: 0x2A1A10 };
},
fksailor: function (o) {
return { ids: [o.r < 0.5 ? "oz:shirt:long:stripe" : "oz:shirt:long:cloth", "oz:collar:low:soft", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: C(o, [0xF0ECE0, 0xD8D0C0]), collar: 0xF0ECE0, tie: 0x1A2A4A, coat: C(o, [0x1E2638, 0x2A2E3A, 0x3A3428]), trou: C(o, [0x2A2E3A, 0xC8C0A8, 0x3A3A40]) }, shoes: 0x141210 };
},
fkwalton: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:military:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xF4F0E6, collar: 0xF4F0E6, tie: 0x1A1A1E, vest: 0x6A5A40, coat: 0x1A2440, trou: 0x2A2E3A }, shoes: 0x141210 };
},
fkpeasant: function (o) {
return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:trousers:knit", "oz:belt", "oz:boots"],
col: { shirt: C(o, [0xD8C8A8, 0xC8B898]), coat: C(o, [0x8A6A48, 0x6A5A44, 0x9A8A6A, 0x5A4A3A]), trou: C(o, [0x4A4036, 0x5A5048]), belt: 0x8A2A1A }, shoes: 0x3A2A1A };
},
fkcreature: function (o) {
return { ids: ["oz:shirt:long:worn7", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0x6A6458, coat: 0x2A2622, trou: 0x3A3630 }, shoes: 0x2A2018 };
},
fkblack: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:big", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots"],
col: { shirt: 0xF8F6F0, collar: 0xF8F6F0, coat: 0x141416, trou: 0x141416, stock: 0x141416 }, shoes: 0x0E0E10 };
}
});
if (typeof DLN_HAT !== "undefined")
Object.assign(DLN_HAT, {
fkcocked: function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x141414, { r: 1 });
var cr = new THREE.Mesh(wfGeo("fkckc", function () { return new THREE.CylinderGeometry(0.11, 0.125, 0.1, 14); }), mt);
cr.position.y = 0.04;
g.add(cr);
for (var i = 0; i < 3; i++) {
var b = new THREE.Mesh(wfGeo("fkckb", function () { return new THREE.BoxGeometry(0.3, 0.08, 0.02); }), mt);
var a = i / 3 * Math.PI * 2;
b.position.set(Math.sin(a) * 0.13, 0.06, Math.cos(a) * 0.13);
b.rotation.y = a + Math.PI / 2;
b.rotation.z = 0;
g.add(b);
}
add("Head", [0, 0.13, -0.01], g);
},
fkround: function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x1E1A16, { r: 1 });
g.add(new THREE.Mesh(wfGeo("fkrdb", function () { return new THREE.CylinderGeometry(0.2, 0.2, 0.012, 20); }), mt));
var cr = new THREE.Mesh(wfGeo("fkrdc", function () { return new THREE.CylinderGeometry(0.105, 0.115, 0.17, 16); }), mt);
cr.position.y = 0.085;
g.add(cr);
var bd = new THREE.Mesh(wfGeo("fkrdbd", function () { return new THREE.CylinderGeometry(0.117, 0.117, 0.03, 16, 1, true); }), wfMat(0x0E0E0E));
bd.position.y = 0.02;
g.add(bd);
add("Head", [0, 0.13, -0.01], g);
},
fkcap: function (add) { var m = new THREE.Mesh(wfGeo("fkcap", function () { var s = new THREE.SphereGeometry(0.13, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55); return s; }), wfMat(0xF8F6F0, { r: 1 })); m.scale.set(1.05, 0.9, 1.1); add("Head", [0, 0.04, -0.02], m); },
fkfur: function (add) { var m = new THREE.Mesh(wfGeo("fkfur", function () { return new THREE.CylinderGeometry(0.13, 0.135, 0.16, 14); }), wfMat(0x5A4430, { r: 1 })); add("Head", [0, 0.12, -0.01], m); },
fkknit: function (add) { var m = new THREE.Mesh(wfGeo("fkknit", function () { var s = new THREE.SphereGeometry(0.125, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6); return s; }), wfMat(0x6A1E1E, { r: 1 })); add("Head", [0, 0.05, -0.01], m); }
});
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { fkgent: ["fkround", "fkcocked", null, "fkround"], fkvictor: [null], fkworn: [null], fkclerval: [null], fkelder: ["fkcocked", null], fklady: [null, "ladyhat", null], fkeliz: [null],
fkmaid: ["fkcap", "fkcap", null], fkwork: [null, "flatcap", "fkround"], fksailor: ["fkknit", "fkknit", null], fkwalton: ["fkcocked"], fkpeasant: ["fkfur", "fkfur", null], fkcreature: [null], fkblack: [null, "fkcocked"] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { fkgent: ["stick", null, "book", null], fkvictor: [null], fkworn: [null], fkclerval: ["book", null], fkelder: ["stick", null, "book"], fklady: [null, "parasol", "book"], fkeliz: [null, "flowers"],
fkmaid: [null, "bag", null], fkwork: [null], fksailor: [null], fkwalton: [null], fkpeasant: [null, "stick"], fkcreature: [null], fkblack: ["book", null] });
})();
function fkwDressed(seed, dress, o) { return __ZC(503, 28, this, arguments, new.target); }
var FKP = {
walton: "You are Robert Walton, from Mary Shelley's Frankenstein (the book only): an English explorer of about twenty-eight, captain of a ship hired at Archangel, trying to reach the North Pole and find the passage and the secret of the magnet. Self-taught, ardent, romantic, lonely: you long for a friend who could understand you. You write letters to your sister, Mrs. Margaret Saville, in England.",
master: "You are the master of Robert Walton's ship in Mary Shelley's Frankenstein (the book only): a man of excellent disposition, gentle and mild, a little silent, who gave up his savings to the man who loved the girl he wanted to marry. A brave and steady sailor.",
sailor: "You are a sailor on Robert Walton's ship, in the ice near the North Pole, in Mary Shelley's Frankenstein (the book only): plain-spoken, cold, worried about being frozen in, loyal to the captain, but you want to go home if the ice frees the ship.",
victor: "You are Victor Frankenstein of Geneva, from Mary Shelley's Frankenstein (the book only): a young man of good family, ardent, with a thirst for knowledge of the secrets of heaven and earth. You studied Cornelius Agrippa and Paracelsus as a boy, then chemistry at Ingolstadt. Speak as he does, earnestly and with feeling; never give away what happens later in the story.",
victor2: "You are Victor Frankenstein as Walton finds him on the ice, from Mary Shelley's Frankenstein (the book only): wasted by cold and grief, gentle and wise in speech, eloquent, haunted; you have lost everyone you loved because of what you made, and you are chasing it to the end. You warn Walton against the ambition that ruined you.",
alphonse: "You are Alphonse Frankenstein, Victor's father, from Mary Shelley's Frankenstein (the book only): a respected citizen of Geneva, a syndic, honourable and kind, devoted to his family, practical and gentle. Grief has aged you.",
elizabeth: "You are Elizabeth Lavenza, from Mary Shelley's Frankenstein (the book only): adopted as a child into the Frankenstein family at Geneva, Victor's dearest companion; gentle, lively, generous, loving poetry and the beauty of the mountains; you write Victor kind letters full of the family's news.",
william: "You are William Frankenstein, Victor's little brother, from Mary Shelley's Frankenstein (the book only): a merry, rosy little boy with sweet laughing blue eyes and dark eyelashes, who loves running and hiding in the fields of Plainpalais.",
ernest: "You are Ernest Frankenstein, Victor's younger brother, from Mary Shelley's Frankenstein (the book only): a boy of good health and spirit, who wants to be a soldier, and does not like study.",
justine: "You are Justine Moritz, from Mary Shelley's Frankenstein (the book only): taken into the Frankenstein household as a girl, a servant who is treated as one of the family; gentle, frank-hearted, grateful, devoted to Madame Frankenstein, Elizabeth and little William.",
caroline: "You are Caroline Frankenstein, Victor's mother, from Mary Shelley's Frankenstein (the book only): the daughter of Beaufort, a merchant who fell into poverty; kind and devoted, you visit the cottages of the poor, and you adopted Elizabeth.",
clerval: "You are Henry Clerval, Victor Frankenstein's dearest friend, from Mary Shelley's Frankenstein (the book only): the son of a merchant of Geneva, a boy of singular talent and fancy, loving romances, chivalry and the languages of the East; cheerful, kind, warm-hearted, delighted by every landscape.",
krempe: "You are M. Krempe, professor of natural philosophy at Ingolstadt, from Mary Shelley's Frankenstein (the book only): an uncouth man, squat, with a gruff voice and a repulsive face, but deeply learned; blunt, and scornful of the old alchemists Victor read as a boy ('every minute you have wasted on those books is utterly and entirely lost').",
waldman: "You are M. Waldman, professor of chemistry at Ingolstadt, from Mary Shelley's Frankenstein (the book only): about fifty, very kind, grey-haired at the temples, short but very erect, with the sweetest voice; you speak of the wonders of modern chemistry with enthusiasm, and you are generous to students.",
creature: "You are the being that Victor Frankenstein made, from Mary Shelley's Frankenstein (the book only, never any film): eight feet high, with yellow skin, black hair and watery eyes; you speak eloquently, having learned language by watching the De Lacey family and reading Paradise Lost, Plutarch's Lives and The Sorrows of Werter. You were born good and benevolent; misery made you a fiend. You long for companionship and are full of grief and anger at being rejected by everyone, even your maker. Speak with dignity and feeling; keep it suitable for all ages.",
delacey: "You are old De Lacey, from Mary Shelley's Frankenstein (the book only): a blind old Frenchman of good family, now poor, living in a cottage in Germany with your son Felix and daughter Agatha; gentle, wise, kind, you play the guitar and sing sweetly. You are ready to help anyone in need.",
felix: "You are Felix De Lacey, from Mary Shelley's Frankenstein (the book only): a young Frenchman, once of a good family in Paris, now working hard on the land to keep your blind father and your sister; loving, sad, brave; you love Safie, the Arabian.",
agatha: "You are Agatha De Lacey, from Mary Shelley's Frankenstein (the book only): a gentle young woman, caring for your blind father in the cottage, working in the house and garden; quiet and kind.",
safie: "You are Safie, from Mary Shelley's Frankenstein (the book only): the daughter of a Turkish merchant and a Christian Arab mother; you came alone across Europe to find Felix, whom you love; you are learning French from the family, and you are brave and free-spirited.",
kirwin: "You are Mr. Kirwin, the magistrate in a small town on the coast of Ireland, from Mary Shelley's Frankenstein (the book only): an old benevolent man with calm and mild manners, fair and kind even to the stranger accused of murder.",
townfolk: "You live in the place this world shows, in the 1790s, in the world of Mary Shelley's Frankenstein (the book only). You are going about your own life and work, friendly, and you talk about your town, your trade and the weather. You know nothing of Frankenstein's secret."
};
function fkwPersona(k) { return FKP[k] || k || ""; }
var FKW_FOLK = {
walton: { name: "Robert Walton", dress: "fkwalton", sex: "m", hair: 0x6A4A2A, persona: "walton", greet: "Welcome aboard, such as she is. The ice has us fast. Come down to the cabin, if you will: I have a guest there." },
master: { name: "The master", dress: "fksailor", sex: "m", beard: "full", hair: 0x5A4A3A, persona: "master", greet: "Captain's below. She's held fast, but she's sound." },
victor: { name: "Victor Frankenstein", dress: "fkvictor", sex: "m", hair: 0x3A2A1E, persona: "victor", greet: "Good day. Forgive me, my mind was far away: on my studies, I am afraid." },
victor2: { name: "Victor Frankenstein", dress: "fkworn", sex: "m", beard: "short", hair: 0x3A3028, persona: "victor2", greet: "You are kind. Sit with me a while. I will tell you my tale." },
alphonse: { name: "Alphonse Frankenstein", dress: "fkelder", sex: "m", hair: 0xB8B4AC, persona: "alphonse", greet: "Welcome, welcome. Come in out of the wind." },
elizabeth: { name: "Elizabeth", dress: "fkeliz", sex: "f", hair: 0xD8B060, persona: "elizabeth", greet: "Oh, good day! Have you come from the lake? Is it not lovely this morning?" },
william: { name: "William", dress: "fkgent", sex: "m", hair: 0x6A4A2A, child: true, persona: "william", greet: "Can you find me? I'm going to hide!" },
ernest: { name: "Ernest", dress: "fkgent", sex: "m", hair: 0x5A3A22, child: true, persona: "ernest", greet: "Good day! I'm going to be a soldier, you know." },
justine: { name: "Justine Moritz", dress: "fkmaid", sex: "f", hair: 0x4A3020, persona: "justine", greet: "Good day, sir. Madame is in the drawing-room." },
caroline: { name: "Caroline Frankenstein", dress: "fklady", sex: "f", hair: 0x6A4A30, persona: "caroline", greet: "Good day. You are welcome in our house." },
clerval: { name: "Henry Clerval", dress: "fkclerval", sex: "m", hair: 0xA87A4A, persona: "clerval", greet: "My dear friend! How glad I am to see you!" },
krempe: { name: "M. Krempe", dress: "fkelder", sex: "m", hair: 0x5A5048, scale: [1.12, 0.94, 1.12], persona: "krempe", greet: "Hm. Another student. What have you read? Speak up." },
waldman: { name: "M. Waldman", dress: "fkelder", sex: "m", hair: 0x9A9690, scale: [1.0, 0.97, 1.0], persona: "waldman", greet: "Welcome, welcome, my young friend. You love the science? Then we shall be friends." },
creature: { name: "The creature", dress: "fkcreature", sex: "m", hair: 0x0A0A0C, skin: 0xD8C890, scale: [1.24, 1.36, 1.24], persona: "creature", greet: "You look on me. All men do so, and then they run. Will you stay, and hear me?" },
delacey: { name: "Old De Lacey", dress: "fkelder", sex: "m", hair: 0xE8E4DC, persona: "delacey", greet: "Who is there? Come in, come in: I am blind, but I can hear that you are tired." },
felix: { name: "Felix", dress: "fkwork", sex: "m", hair: 0x3A2A1E, persona: "felix", greet: "Good day. Forgive me, I have the wood to cut before dark." },
agatha: { name: "Agatha", dress: "fkmaid", sex: "f", hair: 0x5A3A22, persona: "agatha", greet: "Good day. Father is resting; hush." },
safie: { name: "Safie", dress: "fklady", sex: "f", hair: 0x141010, skin: 0xC89A70, persona: "safie", greet: "Good day! I am learning to say it properly: good day!" },
kirwin: { name: "Mr. Kirwin", dress: "fkblack", sex: "m", hair: 0xD8D4CC, persona: "kirwin", greet: "Sit down, sir. I mean to be fair to you." }
};
function fkwFolk(key, x, z, ry, o) { return __ZC(503, 29, this, arguments, new.target); }
function fkwCrowd(seed, list, x0, z0, x1, z1, o) { return __ZC(503, 30, this, arguments, new.target); }
function fkwOne(seed, name, sex, dress, x, z, ry, greet, o) { return __ZC(503, 31, this, arguments, new.target); }
var FKW_RY = -80;
function fkwMat(k) { return __ZC(503, 32, this, arguments, new.target); }
function fkwThatchM() { return __ZC(503, 33, this, arguments, new.target); }
function fkwInRoom() { return camera.position.y < FKW_RY + 30; }
function fkwRoomAt(x, z) { for (var i = 0; i < FKW.rooms.length; i++) {
var R = FKW.rooms[i];
if (x > R.x0 - 0.3 && x < R.x1 + 0.3 && z > R.z0 - 0.3 && z < R.z1 + 0.3)
return R;
} return null; }
function fkwRoom(P, key, cx, cz, w, d, o) { return __ZC(503, 34, this, arguments, new.target); }
function fkwDoor(R, name, ox, oz, ory) { return __ZC(503, 35, this, arguments, new.target); }
function fkwIn(sc, key, lx, lz) {
return function () {
var R = FKW.sc === sc ? FKW.rooms.filter(function (r) { return r.key === key; })[0] : null;
if (R)
return { sc: sc, x: R.cx + lx, z: R.cz + lz, y: R.y };
var A = FKW_ROOMXZ[sc] && FKW_ROOMXZ[sc][key];
return A ? { sc: sc, x: A[0] + lx, z: A[1] + lz, y: FKW_RY } : null;
};
}
var FKW_ROOMXZ = {};
function fkwTable(P, x, z, w, d, h, o) { return __ZC(503, 36, this, arguments, new.target); }
function fkwChair(P, x, z, ry, o) { return __ZC(503, 37, this, arguments, new.target); }
function fkwBed(P, x, z, ry, o) { return __ZC(503, 38, this, arguments, new.target); }
function fkwShelves(P, x, z, w, h, ry, o) { return __ZC(503, 39, this, arguments, new.target); }
function fkwHearth(P, x, z, ry, o) { return __ZC(503, 40, this, arguments, new.target); }
function fkwCandle(P, x, y, z, o) { return __ZC(503, 41, this, arguments, new.target); }
function fkwBench(P, x, z, ry, o) { return __ZC(503, 42, this, arguments, new.target); }
function fkwRug(P, x, z, w, d, col) { return __ZC(503, 43, this, arguments, new.target); }
function fkwPicture(P, x, y, z, ry, w, h, draw) { return __ZC(503, 44, this, arguments, new.target); }
function fkwWindowIn(P, x, y, z, ry, w, h, o) { return __ZC(503, 45, this, arguments, new.target); }
function fkwTownHouse(P, x, z, w, d, h, o) { return __ZC(503, 46, this, arguments, new.target); }
function fkwChurch(P, x, z, o) { return __ZC(503, 47, this, arguments, new.target); }
function fkwTownWall(P, x0, z0, x1, z1, h, gate) { return __ZC(503, 48, this, arguments, new.target); }
function fkwConifer(P, list, o) { return __ZC(503, 49, this, arguments, new.target); }
function fkwBirch(P, list) { return __ZC(503, 50, this, arguments, new.target); }
function fkwPeak(P, x, z, r, h, o) { return __ZC(503, 51, this, arguments, new.target); }
function fkwBoat(P, x, y, z, ry, o) { return __ZC(503, 52, this, arguments, new.target); }
var FKW_SHIP = { deck: 3.05 };
function fkwArcticH(x, z) { return __ZC(503, 53, this, arguments, new.target); }
function fkwShip(P) { return __ZC(503, 54, this, arguments, new.target); }
function fkwBerg(P, x, z, s, k) { return __ZC(503, 55, this, arguments, new.target); }
function fkwSledge(P, x, z, ry, o) { return __ZC(503, 56, this, arguments, new.target); }
function fkwDog() { return __ZC(503, 57, this, arguments, new.target); }
FKW_SCN.arctic = { start: { x: 12, z: 4, ry: Math.PI / 2 }, h: fkwArcticH,
wl: function (x, z) { return FKW.st.lead && z < -38 && z > -90 && Math.abs(x) < 60 ? 0 : null; },
build: function (G) { return __ZC(503, 58, this, arguments, new.target); } };
FKW_ROOMXZ.arctic = {};
function fkwGenH(x, z) { return __ZC(503, 59, this, arguments, new.target); }
FKW_ROOMXZ.geneva = { fhouse: [-560, 200], court: [-520, 200], cell: [-490, 200], belrive: [-460, 200], cathedral: [-420, 212], inn: [-380, 200], watch: [-350, 200], books: [-322, 200], baker: [-294, 200], widow: [-266, 200], pastor: [-238, 200] };
function fkwGenRooms(G) { return __ZC(503, 60, this, arguments, new.target); }
var FKW_GEN_FOLK = [
["watch", "Monsieur Dufour, a watchmaker", "m", "fkwork", "Come in, come in, mind the bench. Every watch in Geneva passes through hands like mine: the finest in the world, monsieur. Look at this escapement."],
["books", "Monsieur Cramer's assistant, at the bookseller's", "m", "fkgent", "Philosophy? Natural history? We have Buffon, Rousseau, of course: he was a Genevese, you know. And for the young gentlemen who like old things, a little Paracelsus."],
["baker", "Madame Rey, the baker's wife", "f", "fkmaid", "Fresh bread, still warm. Take one; you look as though you have walked from Lausanne."],
["widow", "Madame Lullin, a widow", "f", "fklady", "Sit, sit. My husband was a syndic with Monsieur Frankenstein, you know. Such a good family, and the poor dear mother."],
["pastor", "Pastor Vernes", "m", "fkblack", "Good day to you. I am writing Sunday's sermon, on charity. Calvin's city must never forget the poor."]
];
function fkwGeneva(G) { return __ZC(503, 61, this, arguments, new.target); }
function fkwOakState() { if (FKW.genOak)
FKW.genOak.visible = !FKW.st.oakGone; if (FKW.genStump)
FKW.genStump.visible = !!FKW.st.oakGone; }
function fkwGateState() { if (FKW.genGate)
FKW.genGate.visible = !!FKW.st.gateShut; if (FKW.genGateS)
FKW.genGateS.off = !FKW.st.gateShut; }
FKW_SCN.geneva = { start: { x: -120, z: -40, ry: Math.PI }, h: fkwGenH,
wl: function (x, z) { return z < -50 ? 0 : null; },
build: function (G) { return __ZC(503, 62, this, arguments, new.target); } };
function fkwCrxKinds() { return __ZC(503, 63, this, arguments, new.target); }
function fkwHorse(P, x, y, z, ry, o) { return __ZC(503, 64, this, arguments, new.target); }
function fkwPlainBeast(P, x, y, z, ry, o) { return __ZC(503, 65, this, arguments, new.target); }
function fkwCoach(P, x, z, ry, o) { return __ZC(503, 66, this, arguments, new.target); }
function fkwIngH(x, z) {
var h = 1.0 + fkwFbm(x * 0.012, z * 0.012, 3) * 0.8;
if (x > -250 && x < 250 && z > -160 && z < 90)
h = 1.0 + fkwFbm(x * 0.02, z * 0.02, 2) * 0.12;
if (z > 110 && z < 180) {
var t = Math.min(1, Math.min(z - 110, 180 - z) / 14);
h = h * (1 - t) + (-3.0) * t;
}
if (z > 260) {
h += Math.min(14, (z - 260) * 0.05) * (0.7 + fkwFbm(x * 0.01, z * 0.01, 2) * 0.6);
}
return h;
}
FKW_ROOMXZ.ingol = { lodging: [-480, 420], bedroom: [-450, 420], workshop: [-420, 420], lecture: [-380, 424], waldlab: [-340, 420], krempe: [-310, 420], dissect: [-280, 420], inn: [-250, 420], church: [-210, 428], charnel: [-170, 420],
apoth: [-480, 450], tailor: [-454, 450], beer: [-428, 450], butcher: [-400, 450], student: [-372, 450], binder: [-344, 450], widowi: [-316, 450] };
function fkwIngRooms(G) { return __ZC(503, 67, this, arguments, new.target); }
var FKW_ING_FOLK = [
["apoth", "Herr Weber, the apothecary", "m", "fkgent", "Guten Tag. Spirits of wine, sal ammoniac, oil of vitriol? The young gentlemen of the university buy a great deal of it."],
["tailor", "Meister Gruber, the tailor", "m", "fkwork", "A new coat for the winter, sir? The Danube wind is cruel in January."],
["beer", "The landlady of the beer-house", "f", "fkmaid", "A mug of beer, and a sausage? The students sing here half the night."],
["butcher", "Herr Kaltenbach, the butcher", "m", "fkwork", "Ach, the young doctors come for odd things sometimes. Bones, an eye. Who am I to ask?"],
["student", "A student from Bavaria", "m", "fkgent", "Natural philosophy? Waldman's lectures are the best in the university. Krempe? A little squat man with a gruff voice; but he knows his business."],
["binder", "Herr Meyer, the bookbinder", "m", "fkwork", "Calf or vellum? I have bound the professors' books for thirty years."],
["widowi", "Frau Huber, a widow", "f", "fklady", "Come in and warm yourself. My lodger is a quiet young man: always at his books, up at the top of the house."]
];
function fkwIngol(G) { return __ZC(503, 68, this, arguments, new.target); }
FKW_SCN.ingol = { start: { x: 150, z: 8, ry: Math.PI }, h: fkwIngH,
wl: function (x, z) { return z > 112 && z < 178 ? -0.3 : null; },
build: function (G) { return __ZC(503, 69, this, arguments, new.target); } };
var FKW_GLAC = [[180, -120], [230, -300], [330, -560], [470, -820], [640, -1150]];
function fkwAlpsH(x, z) { return __ZC(503, 70, this, arguments, new.target); }
function fkwAlpsBase(x, z) { return 2 + (-40 - z) * 0.55 + fkwFbm(x * 0.006, z * 0.006, 4) * 30 + Math.max(0, Math.abs(x) - 400) * 0.25; }
FKW_ROOMXZ.alps = { chinn: [-900, 600], church: [-860, 608], guide: [-820, 600], cheese: [-790, 600], priest: [-760, 600], chalet: [-730, 600], temple: [-700, 600], hut: [-670, 600] };
function fkwChalet(P, x, z, w, d, o) { return __ZC(503, 71, this, arguments, new.target); }
function fkwAlpRooms(G) { return __ZC(503, 72, this, arguments, new.target); }
var FKW_ALP_FOLK = [["guide", "Jacques, a guide of Chamounix", "m", "fkwork", "Montanvert? I'll take you up for a crown. The path is broken in places by the avalanches; keep to my steps. Never go on the ice alone."],
["cheese", "Mère Couttet, the cheesemaker", "f", "fkmaid", "The cows come down from the high pastures in September. Try this; it's last summer's."],
["priest", "The curé of Chamounix", "m", "fkblack", "The English come in summer to look at our glaciers. They call them sublime. We call them cold."],
["chalet", "A herdsman", "m", "fkwork", "Up there? The ice moves, they say: a little every year. I have seen it swallow a hut."]];
function fkwAlps(G) { return __ZC(503, 73, this, arguments, new.target); }
FKW_SCN.alps = { start: { x: -200, z: 28, ry: Math.PI / 2 }, h: fkwAlpsH,
wl: function (x, z) { var rz = 48 + Math.sin(x * 0.01) * 6; return Math.abs(z - rz) < 8 ? -0.3 : null; },
build: function (G) { return __ZC(503, 74, this, arguments, new.target); } };
function fkwSeason() { return FKW.st.season || "winter"; }
function fkwCotH(x, z) { return __ZC(503, 75, this, arguments, new.target); }
FKW_ROOMXZ.cottage = { cott: [-500, 500], inner: [-466, 500], shep: [-440, 500], vil1: [-410, 500], vil2: [-380, 500], vil3: [-350, 500] };
function fkwCotRooms(G) { return __ZC(503, 76, this, arguments, new.target); }
var FKW_COT_FOLK = [["vil1", "A farmer's wife", "f", "fkmaid", "Who's there? Oh! I thought, for a moment, I saw something huge at the window. Silly of me."], ["vil2", "The weaver", "m", "fkwork", "Clack, clack, all day. The cloth goes to the market in the town."], ["vil3", "The smith", "m", "fkwork", "Shoe your horse? No horse? Then what brings you all this way into the woods?"]];
function fkwCottage(P, x, z, w, d, o) { return __ZC(503, 77, this, arguments, new.target); }
function fkwCot(G) { return __ZC(503, 78, this, arguments, new.target); }
function fkwRebuild() { var k = FKW.scBuilt; if (!k)
return; var L = fkwLocalSc(), y = camera.position.y; FKW.scBuilt = null; fkwScene(k); var S = fkwSc(); camera.position.set(FKW.base + S.x + L.x, y, L.z); }
FKW_SCN.cottage = { start: { x: 180, z: 300, ry: Math.PI }, h: fkwCotH,
wl: function (x, z) { return fkwPathD(x, z, [[560, -360], [260, -310], [200, -300], [120, -340], [-560, -300]]) < 20 ? -0.6 : null; },
build: function (G) {
fkwCotRooms(G);
fkwCot(G);
FKW_COT_FOLK.forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("coth" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
} };
function fkwRhH(x, z) {
var n = fkwFbm(x * 0.008, z * 0.008, 4), w = 34 + Math.sin(z * 0.006) * 8, cx = Math.sin(z * 0.004) * 30, d = Math.abs(x - cx);
if (d < w)
return -3.5 + Math.pow(d / w, 3) * 2.6;
var h = 0.8 + (d - w) * 0.5 + n * 20;
if (d - w < 14)
h = 0.8 + (d - w) * 0.08;
return Math.min(h, 140 + n * 30);
}
function fkwRhC(z) { return Math.sin(z * 0.004) * 30; }
FKW_ROOMXZ.rhine = { rinn: [-500, 520], vint: [-466, 520], rchurch: [-430, 526], ferry: [-394, 520] };
function fkwRhRooms(G) { return __ZC(503, 79, this, arguments, new.target); }
function fkwRuin(P, x, z, o) { return __ZC(503, 80, this, arguments, new.target); }
function fkwRhine(G) { return __ZC(503, 81, this, arguments, new.target); }
FKW_SCN.rhine = { start: { x: fkwRhC(418), z: 418.8, ry: Math.PI }, h: fkwRhH,
wl: function (x, z) { return Math.abs(x - fkwRhC(z)) < 34 + Math.sin(z * 0.006) * 8 - 2 ? -0.4 : null; },
build: function (G) { return __ZC(503, 82, this, arguments, new.target); } };
function fkwOrkH(x, z) { return __ZC(503, 83, this, arguments, new.target); }
function fkwIreH(x, z) {
var n = fkwFbm(x * 0.01, z * 0.01, 3), shore = x < -40 ? -95 : -60;
if (x > -40 && x < -20)
shore = -60 - (-20 - x) * 1.75;
if (z < shore)
return -0.2 - (shore - z) * 0.06;
return Math.min(1.2 + Math.max(0, z - 60) * 0.12 + n * 4, 0.4 + (z - shore) * 0.12);
}
FKW_ROOMXZ.orkney = { olab: [-400, 400], olab2: [-372, 400], ohut1: [-344, 400], ohut2: [-316, 400] };
FKW_ROOMXZ.ireland = { kirwin: [-300, 300], iinn: [-268, 300], iprison: [-236, 300], icell: [-208, 300], ihome1: [-182, 300], ihome2: [-156, 300] };
function fkwOrkRooms(G) { return __ZC(503, 84, this, arguments, new.target); }
var FKW_ORK_FOLK = [["ohut1", "Old Magnus, a crofter", "m", "fkworn", "Oats and a few thin cows: that's the island. Five of us, and now you, sir. What does a gentleman want here?"], ["ohut2", "Ingrid, a fisherman's wife", "f", "fkmaid", "My man's out in the boat. The sea gives us our living, and takes it back when it likes."]];
function fkwOrkney(G) { return __ZC(503, 85, this, arguments, new.target); }
function fkwIreRooms(G) { return __ZC(503, 86, this, arguments, new.target); }
var FKW_IRE_FOLK = [["ihome1", "Daniel Nugent, a fisherman", "m", "fkwork", "I saw a boat with a man in it, sir, not far from the shore, the night they found the poor gentleman."], ["ihome2", "Mrs. Nugent", "f", "fkmaid", "A terrible thing, a terrible thing. A young man, strangled, and no mark of a robber on him."]];
function fkwIreland(G) { return __ZC(503, 87, this, arguments, new.target); }
FKW_SCN.orkney = { start: { x: 120, z: 10, ry: -Math.PI / 2 }, h: fkwOrkH, wl: function (x, z) { return fkwOrkH(x, z) < 0 ? 0 : null; },
build: function (G) { return __ZC(503, 88, this, arguments, new.target); } };
FKW_SCN.ireland = { start: { x: 0, z: -52, ry: 0 }, h: fkwIreH, wl: function (x, z) { return fkwIreH(x, z) < -0.2 ? 0 : null; },
build: function (G) { return __ZC(503, 89, this, arguments, new.target); } };
function fkwEvH(x, z) { var n = fkwFbm(x * 0.01, z * 0.01, 3); if (z < -50)
return -3; if (z < -38)
return -3 + (z + 50) / 12 * 3.8; var h = 0.8 + (z + 38) * 0.04 + n * 2; if (z > 120)
h += (z - 120) * 0.6; return h; }
FKW_ROOMXZ.evian = { einn: [-300, 300], eroom: [-266, 300], epass: [-238, 300], echurch: [-206, 306], ehome1: [-176, 300], ehome2: [-150, 300], thonon: [-120, 300] };
function fkwEvRooms(G) { return __ZC(503, 90, this, arguments, new.target); }
function fkwEvian(G) { return __ZC(503, 91, this, arguments, new.target); }
function fkwChH(x, z) { var n = fkwFbm(x * 0.006, z * 0.006, 4); if (z < -420)
return 0.5 + fkwSmooth(0.1, 0.5, fkwFbm(x * 0.02, z * 0.02, 2)) * 2.4; if (z < -380)
return (z + 420) / 40 * 3; return 3 + n * 14; }
FKW_ROOMXZ.chase = { chut: [-600, 700], izba1: [-570, 700], izba2: [-540, 700], izba3: [-510, 700] };
function fkwChRooms(G) { return __ZC(503, 92, this, arguments, new.target); }
var FKW_CH_FOLK = [["chut", "An old peasant", "m", "fkworn", "A giant passed this way last night, with a gun and many pistols. He took our winter's store and went north. God protect you if you follow him."], ["izba1", "Yakov, who sells sledges", "m", "fkwork", "A sledge and dogs? For the sea? You are mad, barin. The ice breaks in spring. But money is money."], ["izba2", "A fisherman's wife", "f", "fkmaid", "He came at night, a monster, and took our food and a sledge and dogs. He drove out over the sea, where no one goes."], ["izba3", "The elder of the hamlet", "m", "fkelder", "They say he crossed the sea ice going north. He will die there, or the ice will break under him. That is all I know."]];
function fkwChase(G) { return __ZC(503, 93, this, arguments, new.target); }
FKW_SCN.evian = { start: { x: 0, z: -40, ry: Math.PI }, h: fkwEvH, wl: function (x, z) { return z < -40 ? 0 : null; },
build: function (G) { return __ZC(503, 94, this, arguments, new.target); } };
FKW_SCN.chase = { start: { x: 0, z: 300, ry: Math.PI }, h: fkwChH, wl: function () { return null; },
build: function (G) {
fkwChRooms(G);
fkwChase(G);
FKW_CH_FOLK.forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("chh" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
} };
function fkwEnvNow() { return __ZC(503, 95, this, arguments, new.target); }
function fkwBlockL(x, z, feet) { return __ZC(503, 96, this, arguments, new.target); }
function fkwPlaceName(L) {
if (fkwInRoom()) {
var R = fkwRoomAt(L.x, L.z);
if (R)
return R.name;
}
var best = null, bd = 1e9;
for (var k in FKW_AT) {
var A = FKW_AT[k];
if (A.sc !== FKW.sc)
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A;
}
}
return best && bd < 70 ? best.name : fkwSc().name;
}
function fkwTick(dt) { return __ZC(503, 97, this, arguments, new.target); }
function fkwBuild(G) { FKW.G = G; FKW.lite = fkwLite(); FKW.built = true; }
if (typeof worldDef === "function")
worldDef(FKW_KEY, {
base: FKW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return fkwEnvNow(); },
build: function (G) { fkwBuild(G); },
enter: function (opt) { return __ZC(503, 98, this, arguments, new.target); },
leave: function () { FKW.ride = null; FKW.moving = false; if (FKW.veil)
FKW.veil.style.opacity = "0"; if (typeof fkbLeave === "function")
try {
fkbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = fkwSc(); FKW.inRm = fkwInRoom(); return fkwGround(x - S.x, z, feet); },
block: function (x, z, feet) { var S = fkwSc(); FKW.inRm = fkwInRoom(); return fkwBlockL(x - S.x, z, feet); },
tick: function (dt) { fkwTick(dt); },
back: function () { var D = FKW_SCN[FKW.sc]; fkwGo(D && D.start ? { sc: FKW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "ship"); }
});
function fkwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(FKW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(FKW_KEY) < 0)
WLG.keys.push(FKW_KEY);
function fkwForget() { return __ZC(503, 99, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === FKW_KEY)
fkwForget(); return r; }; })();
function fkwSnowfall(P, n, sp) { return __ZC(503, 100, this, arguments, new.target); }
var FKB_CH = [];
var FKB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var FKB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function fkbS() { if (!store.fkbook)
store.fkbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.fkbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function fkbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function fkbStep() { var S = fkbS(), C = FKB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function fkbActive() { var S = fkbS(); return !!(S.started && !S.done && WLD.on === FKW_KEY); }
function fkbKey() { var S = fkbS(); return S.done ? "done" : S.ch + "." + S.s; }
function fkbSay(h) { setStatus(h); }
function fkbQ(s) { return fkQ(s); }
function fkbQs() { return fkQs.apply(null, arguments); }
function fkbPos(at) { return __ZC(503, 101, this, arguments, new.target); }
function fkbScName(k) { return (FKW_SC[k] || {}).name || k; }
function fkbWay(P, L) { return __ZC(503, 102, this, arguments, new.target); }
function fkbBeam() { return __ZC(503, 103, this, arguments, new.target); }
function fkbItemMesh(kind) { return __ZC(503, 104, this, arguments, new.target); }
function fkbItemsClear() { FKB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = FKW.spots.indexOf(I.S); if (j >= 0)
FKW.spots.splice(j, 1); }); FKB.items = []; }
function fkbItemAdd(kind, P, name, verb, onTake) { return __ZC(503, 105, this, arguments, new.target); }
var FKB_TUNES = { home: "assets/westminster/baker-street-air.mp3", lake: "assets/verne/moonlight.mp3", study: "assets/verne/toccata.mp3", dread: "assets/poe/funeral.mp3", night: "assets/erebos/gymnopedie.mp3", ice: "assets/verne/hebrides.mp3", cottage: "assets/neverland/morning-mood.mp3", chase: "assets/neverland/mountain-king.mp3", end: "assets/erebos/gymnopedie.mp3", grief: "assets/poe/funeral.mp3" };
function fkbTune(k) { return __ZC(503, 106, this, arguments, new.target); }
function fkbText(fn) { return __ZC(503, 107, this, arguments, new.target); }
function fkbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function fkbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var FKB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>Mary Shelley's own words, as revised by her in 1831.</div>";
function fkbReadAll(i) { return __ZC(503, 108, this, arguments, new.target); }
function fkbChapterCard() { return __ZC(503, 109, this, arguments, new.target); }
function fkbKeeperBtns(fns) { return __ZC(503, 110, this, arguments, new.target); }
function fkbJump(i) { var S = fkbS(); S.ch = Math.max(0, Math.min(FKB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; fkbSave(); fkbChapterBegin(true); }
function fkbStV(v) { return typeof v === "function" ? v(fkbS().s) : v; }
function fkbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function fkbWorldState() {
var S = fkbS(), C = FKB_CH[S.ch] || {}, st = C.state || {};
FKW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
FKW.envK = fkbStV(st.env) || null;
if (typeof fkwStateApply === "function")
try {
fkwStateApply(st, S.s);
}
catch (e) { }
worldEnv(fkwEnvNow());
}
function fkbChapterBegin(place) { return __ZC(503, 111, this, arguments, new.target); }
function fkbStepBegin() { return __ZC(503, 112, this, arguments, new.target); }
function fkbPuzzleCard(b) { return __ZC(503, 113, this, arguments, new.target); }
function fkbStepDone() { return __ZC(503, 114, this, arguments, new.target); }
function fkbFinish() { return __ZC(503, 115, this, arguments, new.target); }
function fkbCastName(c) { return c.name || (FKW_FOLK[c.k] || {}).name || c.k; }
function fkbCastLive(C) { return !!(C && C.g && C.g.parent); }
function fkbCastAdd(c) { return __ZC(503, 116, this, arguments, new.target); }
function fkbCastHide(key) { var C = FKB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); FKW.talk = FKW.talk.filter(function (T) { return T.p !== C.P; }); FKW.people = FKW.people.filter(function (p) { return p !== C.P; }); delete FKB.cast[key]; }
function fkbCastClear() { for (var k in FKB.cast)
fkbCastHide(k); FKB.cast = {}; }
function fkbCastMove(key, at, ry) { var C = FKB.cast[key]; if (!C)
return; var P = fkbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : fkwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function fkbCastTick() { return __ZC(503, 117, this, arguments, new.target); }
var FKB_FOLK_AT = {};
function fkbPopulate() { return __ZC(503, 118, this, arguments, new.target); }
function fkbCastHere(C) { return (C.cast || []).some(function (c) { var P = fkbPos(c.at); return P && P.sc === FKW.sc; }); }
function fkbChapterSc(C) { var P = C && C.start ? fkbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function fkbSceneDrop() { FKB.beam = null; FKB.items = []; FKB.cast = {}; }
function fkbHeard(kind) { FKB.rew[kind] = (FKB.rew[kind] || 0) + 1; }
function fkbNote(kind, title) { fkbHeard(kind); if (title)
fkbHeard("tale:" + title); }
function fkbTalk(T) { return __ZC(503, 119, this, arguments, new.target); }
function fkbSpot(S) { if (!fkbActive() || S.fkb)
return; var b = fkbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = fkbKey(); setTimeout(function () { if (fkbKey() === k)
fkbStepDone(); }, b.wait || 400); }
function fkbIdlePrompt() { worldPrompt("⚡ <b>Frankenstein</b> · <b>press E</b> for the book", fkbOpen); }
function fkbTick(dt, L) { return __ZC(503, 120, this, arguments, new.target); }
function fkbOpen() { return __ZC(503, 121, this, arguments, new.target); }
function fkbBegin() { var S = fkbS(); S.started = 1; fkbSave(); if (WLD.on !== FKW_KEY) {
fkwEnter({});
return;
} fkbChapterBegin(true); }
function fkbStartAt() { var S = fkbS(); if (S.started && !S.done) {
var C = FKB_CH[S.ch], P = C && C.start ? fkbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function fkbEnter(opt) { var S = fkbS(); setTimeout(function () { if (WLD.on !== FKW_KEY)
return; if (S.started && !S.done)
fkbChapterBegin(false);
else {
fkbWorldState();
fkbPopulate();
if (!S.started)
fkbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function fkbLeave() { fkbTune(null); fkbItemsClear(); FKB.cast = {}; FKB.beam = null; FKW.bannerBook = false; }
function fzGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function fzTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function fzSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function fzRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function fzFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function fzGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function fzHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function fzUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function fzPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function fzRead(title, html, btn, o) { return fzPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function fzReadA(title, adult, young, btn, o) { var r = fzRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = fkbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function fzMove(at, msg) { return function () { fkwGo(at, msg || null, fkbPopulate); }; }
function fkbNum(i) { return i < 4 ? "Letter " + (i + 1) : "Chapter " + (i - 3); }
function fkbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function fkbCh(C) { return __ZC(503, 122, this, arguments, new.target); }
function fkbStepAt(id) { var C = FKB_CH[fkbS().ch]; return C ? fkbS().s >= fkbIdx(C, id) : false; }
function fzId(id, step) { step.id = id; return step; }
function fkwStateApply(st, s) { return __ZC(503, 123, this, arguments, new.target); }
(function () { var s0 = fkwScene; fkwScene = function (k) { var was = FKW.scBuilt; s0.apply(this, arguments); if (was !== FKW.scBuilt && typeof fkbWorldState === "function" && !FKW.rebuilding)
try {
fkbWorldState();
}
catch (e) { } }; })();
function fkc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
function fkSrc(ch) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>Mary Shelley, Frankenstein (1831)" + (ch ? ", " + ch : "") + "</div>"; }
function fkG(x, z) { return { sc: "geneva", x: x, z: z }; }
function fkI(x, z) { return { sc: "ingol", x: x, z: z }; }
function fzTravel(title, html, at, msg, btn, o) { return fzRead(title, html, btn || "▶ Go", Object.assign({ done: function () { var A = typeof at === "function" ? at() : at; if (A && typeof at === "function" && A.ry == null)
A.ry = Math.PI; fkwGo(A, msg || null, function () { fkbPopulate(); fkbStepBegin(); }); } }, o || {})); }
function fzSay(who, h, title, lines, src, o) { return fzTalk(who, h, [title, fkbQs.apply(null, lines) + fkSrc(src), "▶ Go on"], o); }
function fkA(x, z, y) { return { sc: "arctic", x: x, z: z, y: y }; }
var FKD = 3.05;
fkbCh({ t: "St. Petersburgh, December", txt: 0, start: { sc: "arctic", x: 1.6, z: 10.6, y: FKD, ry: Math.PI }, jump: 1, tune: "ice", keep: ["needle", "Walton's compass", "🧭"], state: { env: "icenight", night: true },
words: "You are Robert Walton, English, twenty-eight, captain of a ship bound for the North Pole. Tonight the ship is locked in the Arctic ice, and in your cabin you read over the letters you have written to your sister, Margaret Saville, in England. The first was written in St. Petersburgh, in December, before the voyage began.",
intro: "Your cabin, by candlelight",
cast: [fkc("master", fkA(0, -6, FKD), { ry: Math.PI }), fkc("sailor", fkA(-2, 2, FKD), { key: "s1", name: "Old Thomas, the carpenter", dress: "fksailor", persona: "sailor", greet: "Evening, Captain. She's holding." })],
steps: [
{ k: "read" },
fzGo("desk", "Sit at your writing-desk in the cabin, where the letters lie", { r: 2.2 }),
fzRead("✉️ To Mrs. Saville, England", fkbQs("You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings.", "I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight.") + fkSrc("Letter 1"), "▶ Read on"),
fzPuzzle("🧭 What do you hope for?", "Your letter tells Margaret what you hope to find at the pole, in \"a country of eternal light\". Which is it?", ["Gold, and a trading company", "The wondrous power which attracts the needle, and a passage near the pole", "A lost colony of Englishmen"], 1, ["Not gold: you have given up ease and luxury for this.", "", "Nothing of the kind is in your letter."], { yes: "🧭 " + fkQ("I may there discover the wondrous power which attracts the needle") }),
fzHold("bow", 10, "Go up on deck to the bow and look north into the dark, as you dreamed of doing in Petersburgh", { r: 3 }),
fzRead("🐋 Six years", fkbQs("Six years have passed since I resolved on my present undertaking.", "I accompanied the whale-fishers on several expeditions to the North Sea; I voluntarily endured cold, famine, thirst, and want of sleep") + fkSrc("Letter 1"), "▶ Go on"),
fzTalk("Old Thomas, the carpenter", "Find Old Thomas, the carpenter, on deck, and ask how the ship is holding", ["🔨 She's holding", "\"Holding, Captain. She groans in the ice at night, but she's sound. Archangel timber.\" He looks at you sideways. \"The men say you trained for this, sir. In the whalers.\"", "▶ Go on"]),
fzPuzzle("🛷 Russia in winter", "In Petersburgh you wrote that this was the best season for travelling in Russia. Why?", ["The roads are dry", "They fly quickly over the snow in their sledges", "The rivers are open for boats"], 1, ["Dry? It is December in Russia.", "", "The rivers are frozen hard."], { yes: "🛷 " + fkQ("They fly quickly over the snow in their sledges; the motion is pleasant") }),
fzGo("desk", "Go back down to your desk and fold the letter away", { r: 2.2 })
] });
fkbCh({ t: "Archangel, March", txt: 1, start: { sc: "arctic", x: 1.6, z: 10.6, y: FKD, ry: Math.PI }, tune: "ice", keep: ["friend", "\"I have no friend, Margaret\"", "🕯️"], state: { env: "icenight", night: true },
words: "Archangel, on the White Sea, in March. You have hired a ship and are gathering your sailors. You are lonely: you have no friend to share your hopes. Here, in the ice, you meet again the men you wrote of: your lieutenant, and the master.",
intro: "Archangel, and the crew",
cast: [fkc("master", fkA(0.6, -4, FKD), { ry: Math.PI }), fkc("sailor", fkA(-1.5, -9, FKD), { key: "lt", name: "Your lieutenant", dress: "fkwalton", persona: "You are Robert Walton's lieutenant in Frankenstein (the book only): an Englishman of wonderful courage and enterprise, madly desirous of advancement in your profession. Brisk and proud.", greet: "Captain. The watch is set." }), fkc("sailor", fkA(2, 4, FKD), { key: "s2", name: "Young Jem, a sailor", dress: "fksailor", persona: "sailor", greet: "Cold, sir." })],
steps: [
{ k: "read" },
fzRead("✉️ How slowly the time passes", fkbQs("How slowly the time passes here, encompassed as I am by frost and snow! Yet a second step is taken towards my enterprise.", "But I have one want which I have never yet been able to satisfy") + fkSrc("Letter 2"), "▶ Go on"),
fzPuzzle("🕯️ One want", "What is the one thing you told Margaret that you lack?", ["Money", "A friend", "A good ship"], 1, ["You have money enough: you have hired the ship.", "", "The ship is hired, and sound."], { yes: "🕯️ " + fkQ("I have no friend, Margaret") }),
fzTalk("Your lieutenant", "Speak to your lieutenant at the bow", ["⚓ Your lieutenant", fkbQs("My lieutenant, for instance, is a man of wonderful courage and enterprise; he is madly desirous of glory") + fkSrc("Letter 2") + "<p>\"We'll be the first, sir. The first ship ever to stand at the pole.\"</p>", "▶ Go on"]),
fzTalk("The master", "Speak to the master of the ship", ["🧭 The master", fkbQs("The master is a person of an excellent disposition and is remarkable in the ship for his gentleness and the mildness of his discipline.") + fkSrc("Letter 2"), "▶ Hear his story"]),
fzPuzzle("💍 The master's story", "You heard of the master first from a lady \"who owes to him the happiness of her life\". What did he do?", ["He saved her from a shipwreck", "He gave up the girl he was to marry, and his farm, to the poor man she loved", "He lent her father money"], 1, ["Not a shipwreck.", "", "Not a loan: he gave everything."], { yes: "💍 " + fkQ("What a noble fellow!") + " you wrote: " + fkQ("He is so; but then he is wholly uneducated: he is as silent as a Turk") }),
fzTalk("Young Jem, a sailor", "See that young Jem on watch has his gloves", ["🧤 Young Jem", "\"Thank you, Captain. My mother knitted these at Archangel. The master says you don't hold with flogging, sir. The men like you for it.\"", "▶ Go on"]),
fzRead("🌍 Unexplored regions", fkbQs("I am going to unexplored regions, to \"the land of mist and snow,\" but I shall kill no albatross; therefore do not be alarmed for my safety") + fkSrc("Letter 2"), "▶ Go on"),
fzHold("wheel", 8, "Stand at the wheel a while, thinking of the voyage ahead", { r: 2.5 })
] });
fkbCh({ t: "At sea, July", txt: 2, start: { sc: "arctic", x: 0, z: -1, y: FKD, ry: 0 }, tune: "ice", keep: ["stars", "The stars as witnesses", "⭐"], state: { env: "ice" },
words: "July: you are well advanced on the voyage, past the floating sheets of ice. You write a few lines in haste, for a merchantman homeward bound to Archangel will carry them.",
intro: "On deck, in the July light",
cast: [fkc("master", fkA(0, 13, FKD), { ry: 0 }), fkc("sailor", fkA(-2.4, -4, FKD), { key: "s3", name: "A sailor at the rail", dress: "fksailor", persona: "sailor", greet: "Ice ahead, Captain. Sheets of it." })],
steps: [
{ k: "read" },
fzRead("✉️ Safe, and well advanced", fkbQs("I write a few lines in haste to say that I am safe—and well advanced on my voyage.") + fkSrc("Letter 3"), "▶ Go on"),
fzGather("letter", fkA(0, 6, FKD), 3, "A page of your letter, blown across the deck", "Gather the three pages of your letter the wind has blown across the deck", { spread: 4, eachSay: "A page saved." }),
fzPuzzle("🌊 Small accidents", "What did you call the stiff gales and the springing of a leak?", ["Disasters", "Accidents which experienced navigators scarcely remember to record", "Warnings to turn back"], 1, ["Not disasters: you are cheerful.", "", "You will not turn back."], { yes: "🌊 " + fkQ("One or two stiff gales and the springing of a leak are accidents which experienced navigators scarcely remember to record") }),
fzTalk("A sailor at the rail", "Ask the sailor at the rail what he sees", ["❄️ Ice", "\"Floating sheets, sir, all round. They come down out of the north. Pretty enough in the sun, but they'd stave us in if we hit them.\"", "▶ Go on"]),
fzHold("rail", 8, "Watch the ice drift by from the rail", { r: 2.5 }),
fzRead("⭐ Witnesses", fkbQs("Thus far I have gone, tracing a secure way over the pathless seas, the very stars themselves being witnesses and testimonies of my triumph.") + fkSrc("Letter 3"), "▶ Seal the letter"),
fzTalk("The master", "Give the letter to the master, to go with the merchantman", ["📨 For England", "\"I'll see it goes across, sir. She sails within the hour.\"", "▶ Go on"])
] });
fkbCh({ t: "The stranger on the ice", txt: 3, start: { sc: "arctic", x: 0, z: -6, y: FKD, ry: 0 }, tune: "ice", keep: ["sledge", "The stranger's sledge", "🛷"],
state: { env: function (s) { return s < 3 ? "icefog" : "ice"; }, night: false },
words: "July 31st: the ice has closed round the ship on all sides, and a thick fog has come down. You and the crew lie to, waiting for the weather to change.",
intro: "Shut in by ice",
cast: [fkc("master", fkA(0.6, -9, FKD), { ry: Math.PI }), fkc("sailor", fkA(-2, -11, FKD), { key: "s4", name: "A sailor with a telescope", dress: "fksailor", persona: "sailor", greet: "Look there, sir! North!" }),
fkc("victor2", fkA(44, -64), { from: "stranger", until: "aboard", ry: Math.PI, greet: "Before I come on board your vessel, will you have the kindness to inform me whither you are bound?" }),
fkc("victor2", fkA(-1.6, 11.4, FKD), { key: "vbed", from: "aboard", lie: true, greet: "Thank you, Captain. You have restored me to life." })],
steps: [
{ k: "read" },
fzHold("bow", 8, "Wait at the bow for the fog to clear", { r: 3 }),
fzRead("🌫️ The mist clears", fkbQs("About two o'clock the mist cleared away, and we beheld, stretched out in every direction, vast and irregular plains of ice, which seemed to have no end.", "We perceived a low carriage, fixed on a sledge and drawn by dogs, pass on towards the north, at the distance of half a mile") + fkSrc("Letter 4"), "▶ Look!"),
fzTalk("A sailor with a telescope", "Take the telescope from the sailor and look north", ["🔭 Gigantic stature", fkbQs("a being which had the shape of a man, but apparently of gigantic stature, sat in the sledge and guided the dogs.") + fkSrc("Letter 4") + "<p>The sailor shivers. \"No man's that big, sir. And we're hundreds of miles from land.\"</p>", "▶ Go on"]),
fzPuzzle("🔭 Where can he be going?", "You are \"many hundred miles from any land\". What does this sight seem to say?", ["That land is not so far away as you believed", "That the sailors are dreaming", "That the ice is breaking"], 0, ["", "They all saw it.", "The ice has not broken yet."], { yes: "🔭 But shut in by ice, you cannot follow his track." }),
fzRead("🌊 The ice breaks", fkbQs("About two hours after this occurrence we heard the ground sea, and before night the ice broke and freed our ship.") + fkSrc("Letter 4"), "▶ Morning"),
fzId("stranger", fzGo("ice", "In the morning the sailors are busy at one side of the ship: go down onto the ice to see", { r: 6 })),
fzGo("floe", "A sledge has drifted to the ship in the night on a large fragment of ice. Go to it", { r: 5 }),
fzTalk("Victor Frankenstein", "A man is in the sledge, only one dog alive. Speak to him", ["❄️ Whither you are bound?", fkbQs("Before I come on board your vessel,", "will you have the kindness to inform me whither you are bound?") + "<p>You tell him you are on a voyage of discovery towards the northern pole.</p>" + fkSrc("Letter 4"), "▶ Bring him aboard"]),
fzId("aboard", fzGo("cabin", "Carry him aboard and down to your cabin, where it is warm", { r: 2.4 })),
fzFind("flask", fkA(1.6, 11.2, FKD), "A little brandy", "Find a little brandy for him on your desk", { verb: "give it to him" }),
fzTalk("Victor Frankenstein", "He wakes at last. Ask him why he came so far upon the ice", ["🛷 To seek one who fled", fkbQs("To seek one who fled from me.", "And did the man whom you pursued travel in the same fashion?", "Yes.") + fkSrc("Letter 4"), "▶ Go on"]),
fzPuzzle("🛷 What will you tell him?", "He is desperate to know: could the ice breaking up have destroyed the other sledge?", ["Yes, certainly", "You cannot say: the ice broke near midnight, and the traveller might have reached a place of safety", "No, it was days ago"], 1, ["You do not know that.", "", "It was only yesterday."], { yes: "🛷 From this time a new spirit of life animates him. He wants to be on deck, watching." }),
fzHold("cabin", 10, "Sit with him in the cabin through the days of August as he grows stronger", { r: 2.5 }),
fzRead("📜 He will tell you", fkbQs("You may easily perceive, Captain Walton, that I have suffered great and unparalleled misfortunes.", "I have found a man who, before his spirit had been broken by misery, I should have been happy to have possessed as the brother of my heart.") + fkSrc("Letter 4") + "<p>He will tell you his story. From now on, it is his to live: you are Victor Frankenstein.</p>", "▶ His story begins")
] });
fkbCh({ t: "A Genevese", txt: 4, start: { sc: "geneva", x: -167, z: 18, ry: Math.PI }, jump: 1, tune: "home", keep: ["gift", "\"A pretty present for my Victor\"", "🎁"], state: { env: "lake" },
words: "You are Victor Frankenstein, the eldest son of one of the most distinguished families of the republic of Geneva. This is your father's town on its lake; your childhood was spent here and at Belrive, with your mother Caroline, your father Alphonse, and the girl your mother brought home to be your sister and more.",
intro: "Geneva, the Grand' Rue",
cast: [fkc("alphonse", fkwIn("geneva", "fhouse", -2, -1), { ry: 0.4 }), fkc("caroline", fkwIn("geneva", "fhouse", 1.8, -2), { ry: -0.6 }), fkc("elizabeth", fkG(394, -56), { ry: Math.PI, from: "eliz" })],
steps: [
{ k: "read" },
fzGo("fhouse", "Go home: the Frankensteins' house in the Grand' Rue", { r: 3 }),
fzTalk("Alphonse Frankenstein", "Your father, in the drawing-room. Ask him how he came to marry your mother", ["⚖️ Beaufort's daughter", fkbQs("I am by birth a Genevese, and my family is one of the most distinguished of that republic.") + "<p>Your father tells you of his friend Beaufort, a merchant fallen into poverty, who hid himself in a mean street near the Reuss in Lucerne; and of Beaufort's daughter, who worked at plain-work and straw-plaiting to keep them both.</p>" + fkSrc("1"), "▶ Go on"]),
fzPuzzle("🌾 Caroline Beaufort", "When her father died in her arms, how had Caroline kept them alive?", ["By plaiting straw and doing plain-work", "By selling his books", "By begging"], 0, ["", "He had sold nothing that would help.", "Never."], { yes: "🌾 Your father came to her \"like a protecting spirit\", and two years later she became his wife." }),
fzTalk("Caroline Frankenstein", "Your mother: ask where you were born", ["🌋 Naples", "She smiles. You were born at Naples, and carried as a baby on all their wanderings through Italy, Germany and France. \"For a long time you were our only care.\"", "▶ Go on"]),
fzPuzzle("🏞️ By Lake Como", "When you were about five, beyond the frontiers of Italy, your mother found a child in a peasant's cottage on the shores of Lake Como. Who was she?", ["The peasant's own daughter", "The daughter of a Milanese nobleman, left with the poor family", "A foundling from the church"], 1, ["Not their child: they were dark, and she was fair.", "", "No: her father had been a Milanese noble."], { yes: "🏞️ Elizabeth." }),
fzTalk("Caroline Frankenstein", "Your mother has something to tell you, playfully", ["🎁 A pretty present", fkbQs("I have a pretty present for my Victor—tomorrow he shall have it.") + fkSrc("1"), "▶ Tomorrow"]),
fzId("eliz", fzGo("landing", "Go down to the boat-landing at Belrive, where your cousin is", { r: 6 })),
fzTalk("Elizabeth", "Elizabeth, your cousin", ["💛 Mine to protect", fkbQs("Everyone loved Elizabeth.", "my more than sister, since till death she was to be mine only.") + fkSrc("1"), "▶ Go on"]),
fzHold("landing", 8, "Sit on the landing with her and watch the boats on the lake", { r: 6 })
] });
fkbCh({ t: "Agrippa, and the oak", txt: 5, start: { sc: "geneva", x: 400, z: -8, ry: Math.PI }, jump: 1, tune: "lake", keep: ["agrippa", "Cornelius Agrippa", "📕"],
state: { env: function (s) { return s >= 10 && s < 14 ? "storm" : "lake"; }, night: false, oakGone: function (s) { return s >= 12; } },
words: "Your childhood: Belrive on the eastern shore of the lake, the house in Geneva, your friend Henry Clerval, the son of a merchant, who loved tales of chivalry. You wanted to learn the secrets of heaven and earth.",
intro: "Belrive, by the lake",
cast: [fkc("clerval", fkG(410, 30), { ry: Math.PI }), fkc("elizabeth", fkG(388, 4), { ry: 0.4 }), fkc("alphonse", fkwIn("evian", "thonon", 0.5, -1.4), { ry: 0, from: "agr", until: "back" }),
fkc("alphonse", fkG(396, -6), { key: "alph2", from: "back", ry: Math.PI }), fkc("philo", fkG(424, 40), { key: "philo", name: "A natural philosopher, your father's guest", dress: "fkblack", persona: "You are a man of great research in natural philosophy staying with the Frankensteins at Belrive in the 1780s, in Mary Shelley's Frankenstein (the book only). You explain electricity and galvanism with enthusiasm.", greet: "Extraordinary! Did you see it? Electricity, my boy: the same fire as in Franklin's kite.", from: "after" })],
steps: [
{ k: "read" },
fzTalk("Henry Clerval", "Find your friend Henry Clerval in the garden", ["⚔️ Henry", fkbQs("Meanwhile Clerval occupied himself, so to speak, with the moral relations of things.") + "<p>\"Let's play Roncesvalles again! I'll be Orlando, and you can be the Saracen.\"</p>" + fkSrc("2"), "▶ Go on"]),
fzPuzzle("📚 What you wanted to learn", "Elizabeth loved poetry and the mountains; Henry loved heroes and adventure. What did you, Victor, want to learn?", ["Languages and laws", "The secrets of heaven and earth", "Music and painting"], 1, ["Not those.", "", "Elizabeth's delight, not yours."], { yes: "📚 Natural philosophy, the genius that has regulated your fate." }),
fzTravel("🌧️ Thonon", "When you were thirteen, the whole family went on a party of pleasure to the baths near Thonon, along the southern shore. The weather was foul, and you were shut in the inn all day.", { sc: "evian", x: -30, z: -2.6, ry: 0 }, "🌧️ <b>The baths near Thonon.</b> Rain on the lake.", "▶ Take the boat across"),
fzGo("thonon", "Go into the inn out of the rain", { r: 2.5 }),
fzId("agr", fzFind("book", fkwIn("evian", "thonon", -4.2, -1), "A volume of Cornelius Agrippa", "Look along the inn's shelves for something to read")),
fzTalk("Alphonse Frankenstein", "Show your father your discovery", ["📕 Sad trash", fkbQs("Ah! Cornelius Agrippa! My dear Victor, do not waste your time upon this; it is sad trash.") + fkSrc("2"), "▶ Go on"]),
fzPuzzle("📕 If only", "What would have saved you, you think now, looking back?", ["If your father had burnt the book", "If he had explained that Agrippa's principles had been exploded by modern science", "If you had never learnt to read Latin"], 1, ["He only glanced at it.", "", "You would have found another way."], { yes: "📕 But he didn't, and you read Agrippa, and then Paracelsus and Albertus Magnus, with delight." }),
fzId("back", fzTravel("⛵ Home", "Back across the lake to Belrive. You are fifteen now, and it is a summer of storms.", { sc: "geneva", x: 404, z: -8, ry: 0 }, "⛵ <b>Belrive.</b>", "▶ Sail home")),
fzGather("book", fkG(400, -4), 3, "A book of the old masters", "Gather your books of the old masters (Agrippa, Paracelsus, Albertus Magnus) from the garden bench", { spread: 5 }),
fzHold(fkG(424, 30), 10, "A terrible thunderstorm comes from behind the Jura. Stand at the door and watch it", { r: 8 }),
fzRead("⚡ A stream of fire", fkbQs("As I stood at the door, on a sudden I beheld a stream of fire issue from an old and beautiful oak which stood about twenty yards from our house; and so soon as the dazzling light vanished, the oak had disappeared, and nothing remained but a blasted stump.") + fkSrc("2"), "▶ The next morning"),
fzId("after", fzGo("oak", "Go to see the oak in the morning", { r: 5 })),
fzTalk("A natural philosopher, your father's guest", "Your father's guest, a man of great research, is looking at the stump", ["⚡ Electricity", fkbQs("It was not splintered by the shock, but entirely reduced to thin ribbons of wood. I never beheld anything so utterly destroyed.") + "<p>\"Electricity, Victor! And galvanism: the motion it makes in dead muscle. That is where the future lies, not in your old alchemists.\"</p>" + fkSrc("2"), "▶ Go on"]),
fzPuzzle("⚡ What destroyed the oak?", "The philosopher asks you, as if you were a student: what was it that reduced the old oak to ribbons?", ["The wind", "Lightning: electricity", "Old age"], 1, ["Not the wind.", "", "It stood a hundred years."], { yes: "⚡ All he says throws Agrippa and Paracelsus into the shade. For a while you give up natural science entirely, for mathematics." }),
fzRead("🌑 Destiny", fkbQs("Destiny was too potent, and her immutable laws had decreed my utter and terrible destruction.") + fkSrc("2"), "▶ Go on")
] });
fkbCh({ t: "To Ingolstadt", txt: 6, start: { sc: "geneva", x: -167, z: 18, ry: Math.PI }, jump: 1, tune: "grief", keep: ["hands", "Your mother's blessing", "🤍"], state: { env: "lake" },
words: "You are seventeen, and your parents have decided you shall study at the university of Ingolstadt, in Bavaria. But before you leave, Elizabeth catches the scarlet fever.",
intro: "Geneva, before you leave",
cast: [fkc("caroline", fkwIn("geneva", "fhouse", -1.8, -2.6), { lie: true, until: "dies", greet: "My children..." }), fkc("elizabeth", fkwIn("geneva", "fhouse", -0.6, -1.6), { ry: Math.PI, until: "go" }), fkc("alphonse", fkwIn("geneva", "fhouse", 1.6, -1), { ry: -0.8, until: "go" }),
fkc("clerval", fkG(-150, 22), { from: "dies", until: "go", ry: Math.PI }), fkc("elizabeth", fkG(-140, 18), { key: "el2", from: "dies", until: "go", ry: Math.PI }),
fkc("krempe", fkwIn("ingol", "krempe", 0, -0.8), { ry: 0 }), fkc("waldman", fkwIn("ingol", "lecture", 0, -5.6), { from: "lect", ry: 0 })],
steps: [
{ k: "read" },
fzGo(fkwIn("geneva", "fhouse", 0, 2), "Go home. Elizabeth has the scarlet fever, and your mother would not stay away from her", { r: 3 }),
fzTalk("Caroline Frankenstein", "Your mother has caught the fever. Go to her bedside", ["🤍 My children", fkbQs("My children,", "my firmest hopes of future happiness were placed on the prospect of your union. This expectation will now be the consolation of your father.") + fkSrc("3"), "▶ Go on"]),
fzId("dies", fzRead("🕯️ She died calmly", fkbQs("She died calmly, and her countenance expressed affection even in death.") + fkSrc("3"), "▶ Go on")),
fzTalk("Elizabeth", "Elizabeth, at the door: she has hidden her grief to comfort everyone", ["💛 Elizabeth", "She takes your hand. \"Your father needs us. Ernest and little William need us. We must be brave, Victor.\"", "▶ Go on"]),
fzTalk("Henry Clerval", "Henry has come to spend your last evening with you", ["📜 His father won't let him", fkbQs("He had endeavoured to persuade his father to permit him to accompany me and to become my fellow student, but in vain.") + "<p>\"A narrow-minded trader, my father. He says learning makes no money. One day I'll come to Ingolstadt anyway.\"</p>" + fkSrc("3"), "▶ Say farewell"]),
fzPuzzle("👋 Farewell", "You sat late, Henry, Elizabeth and you. Could you say the word?", ["You could not, and parted pretending to sleep", "You said it at once", "You quarrelled"], 0, ["", "You loved them too well.", "Never."], { yes: "👋 " + fkQ("We could not tear ourselves away from each other nor persuade ourselves to say the word") }),
fzId("go", fzTravel("🐎 The chaise", "You throw yourself into the chaise and leave Geneva. The journey to Ingolstadt is long and tiring.", { sc: "ingol", x: 150, z: 9, ry: Math.PI }, "🐎 <b>Ingolstadt,</b> after days on the road.", "▶ To Ingolstadt")),
fzHold("square", 8, "At length the high white steeple of the town meets your eyes. Stand in the square and look at your new home", { r: 6 }),
fzGo("lodging", "Go to your solitary apartment in the house where you will lodge", { r: 3 }),
fzGo("univ", "In the morning, take your letters of introduction to the university", { r: 4 }),
fzTalk("M. Krempe", "M. Krempe, professor of natural philosophy, in his study", ["😠 Utterly lost", fkbQs("Every minute,", "every instant that you have wasted on those books is utterly and entirely lost. You have burdened your memory with exploded systems and useless names.", "My dear sir, you must begin your studies entirely anew.") + fkSrc("3"), "▶ Go on"]),
fzPuzzle("📝 Krempe's list", "Krempe writes you a list of books. What do you think of the little squat man with the gruff voice?", ["You love him at once", "He does not prepossess you in favour of his pursuits", "You decide to study law instead"], 1, ["Not at all.", "", "Not that either."], { yes: "📝 And you have no wish to go back to modern natural philosophy, which seems to you to promise so little." }),
fzId("lect", fzHold(fkwIn("ingol", "lecture", 0, 1.6), 14, "Partly from curiosity and partly from idleness, go into the lecturing room and hear M. Waldman's lecture on chemistry", { r: 4 })),
fzTalk("M. Waldman", "M. Waldman, at his desk", ["🔥 Performed miracles", fkbQs("The ancient teachers of this science,", "promised impossibilities and performed nothing.", "They have acquired new and almost unlimited powers; they can command the thunders of heaven, mimic the earthquake, and even mock the invisible world with its own shadows.") + fkSrc("3"), "▶ Go on"]),
fzPuzzle("🔥 That night", "Waldman's words touch every key of your being. What do you resolve, lying awake?", ["To go home to Geneva", "To pioneer a new way, explore unknown powers, and unfold the deepest mysteries of creation", "To study only mathematics"], 1, ["Not now.", "", "Not any more."], { yes: "🔥 \"So much has been done,\" you think, \"more, far more, will I achieve.\"" }),
fzGo(fkwIn("ingol", "waldlab", 0, 1), "Visit M. Waldman: he takes you into his laboratory and shows you his machines", { r: 3 }),
fzRead("⚗️ A day memorable", fkbQs("Thus ended a day memorable to me; it decided my future destiny.") + fkSrc("3"), "▶ Go on")
] });
function fkWs(x, z) { return fkwIn("ingol", "workshop", x, z); }
fkbCh({ t: "The principle of life", txt: 7, start: { sc: "ingol", x: -72, z: 21, ry: Math.PI }, jump: 1, tune: "study", keep: ["secret", "The secret of life", "🔬"],
state: { env: function (s) { return s >= 5 && s < 9 ? "night" : "town"; }, night: function (s) { return s >= 5 && s < 9; }, body: function (s) { return s >= 10; } },
words: "Two years at Ingolstadt. Natural philosophy, and chemistry above all, have become your whole life. M. Waldman is your friend, even Krempe is impressed. And one question has taken hold of you: where does the principle of life come from?",
intro: "Ingolstadt, two years on",
cast: [fkc("waldman", fkwIn("ingol", "waldlab", 0.8, -1), { ry: 0 }), fkc("krempe", fkwIn("ingol", "lecture", -5, -4), { ry: 0.6 })],
steps: [
{ k: "read" },
fzGo(fkwIn("ingol", "waldlab", 0, 1.6), "Go to M. Waldman's laboratory, where you work every day", { r: 3 }),
fzTalk("M. Waldman", "M. Waldman, at the electrical machine", ["⚗️ Your progress", fkbQs("As I applied so closely, it may be easily conceived that my progress was rapid. My ardour was indeed the astonishment of the students, and my proficiency that of the masters.") + "<p>\"You have learnt all I can teach you, Victor. Truly. What will you do now?\"</p>" + fkSrc("4"), "▶ Go on"]),
fzPuzzle("❓ The bold question", "Which question now fills your mind?", ["How to turn lead into gold", "Whence did the principle of life proceed?", "How far away the stars are"], 1, ["The alchemists' old dream: not yours.", "", "Not now."], { yes: "❓ " + fkQ("Whence, I often asked myself, did the principle of life proceed?") + " And " + fkQ("To examine the causes of life, we must first have recourse to death.") }),
fzGather("book", fkwIn("ingol", "lecture", 0, -4.6), 3, "A book of anatomy", "Gather the books of anatomy and physiology from the lecture hall", { spread: 3 }),
fzGo("vaults", "Go at night to the churchyard behind the church: you must see how the body decays", { r: 5 }),
fzRead("🕯️ Vaults and charnel-houses", fkbQs("Now I was led to examine the cause and progress of this decay and forced to spend days and nights in vaults and charnel-houses.") + fkSrc("4"), "▶ Go in"),
fzGo(fkwIn("ingol", "charnel", 0, 1.6), "Go down into the charnel-house with your lantern", { r: 2.5 }),
fzHold(fkwIn("ingol", "charnel", 0, 0), 12, "Study by lantern-light, as the nights go by", { r: 3 }),
fzRead("💡 A sudden light", fkbQs("Remember, I am not recording the vision of a madman.") + "<p>After days and nights of incredible labour and fatigue, you have found it: the cause of generation and life. More: you are yourself capable of bestowing animation upon lifeless matter.</p>" + fkSrc("4") + "<p>(You will not tell Walton the secret. \"Learn from me,\" you tell him, \"how dangerous is the acquirement of knowledge.\")</p>", "▶ Go on"),
fzGo(fkWs(0, 1.8), "Go up to the garret at the top of the house: your workshop", { r: 2.5 }),
fzRead("🏚️ The workshop", fkbQs("In a solitary chamber, or rather cell, at the top of the house, and separated from all the other apartments by a gallery and staircase, I kept my workshop of filthy creation") + fkSrc("4"), "▶ Go on"),
fzPuzzle("📏 How large?", "Your materials are hard to work small. What size do you decide to make the being?", ["The size of a child", "Of a gigantic stature: about eight feet in height", "Exactly your own size"], 1, ["Too small and fine for your hands.", "", "The minute parts slow you down."], { yes: "📏 About eight feet tall, and proportionably large." }),
fzGather("jar", fkWs(-2, -2), 4, "Glass and instruments", "Gather the instruments and jars for the work from the benches", { spread: 2 }),
fzHold(fkWs(0, 0.6), 16, "Work at the table, through winter, spring and summer, pale and thin", { r: 2.5 }),
fzRead("🌙 Midnight labours", fkbQs("the moon gazed on my midnight labours, while, with unrelaxed and breathless eagerness, I pursued nature to her hiding-places.") + fkSrc("4"), "▶ Go on"),
fzPuzzle("✉️ Your father's letters", "Your father writes, mildly, asking what you are doing. And you?", ["You write home every week", "You neglect them: you cannot tear your thoughts from the work", "You go home for the summer"], 1, ["You do not.", "", "You do not go."], { yes: "✉️ Winter, spring and summer pass. You do not see the blossom or the leaves." })
] });
fkbCh({ t: "A dreary night of November", txt: 8, start: { sc: "ingol", x: -420, z: 421.6, ry: 0 }, jump: 1, tune: "dread", keep: ["eye", "The dull yellow eye", "👁️"],
state: { env: function (s) { return s < 9 ? "rain" : "town"; }, night: function (s) { return s < 9; }, body: function (s) { return s < 4; } },
words: "November, two years after you began. It is one o'clock in the morning, the rain patters on the panes, and your candle is nearly burnt out. The being lies on the table.",
intro: "The workshop, one in the morning",
cast: [fkc("creature", fkwIn("ingol", "bedroom", -0.6, -0.2), { from: "curtain", until: "flee", ry: Math.PI * 0.2, greet: "(He holds up the curtain of the bed. His jaws open; he mutters some sounds; a grin wrinkles his cheeks.)" }),
fkc("clerval", fkI(152, 18), { from: "inn", until: "lodg", ry: 0 }), fkc("clerval", fkwIn("ingol", "bedroom", 1.2, 0.6), { key: "cl2", from: "fever", ry: Math.PI * 1.2 })],
steps: [
{ k: "read" },
fzHold(fkWs(0, 1.4), 8, "Collect the instruments of life around you, to infuse a spark of being into the thing on the table", { r: 2.5 }),
fzRead("👁️ The dull yellow eye", fkbQs("It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.") + fkSrc("5"), "▶ Look at him"),
fzRead("😱 Beautiful!", fkbQs("His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God!") + fkSrc("5"), "▶ Run!"),
fzGo(fkwIn("ingol", "bedroom", 0, 1.6), "Rush out of the room, to your bedchamber", { r: 2.5 }),
fzHold(fkwIn("ingol", "bedroom", -1.2, -0.4), 8, "Throw yourself on the bed in your clothes, and try to sleep", { r: 2.5 }),
fzId("curtain", fzRead("🛏️ The curtain", fkbQs("Oh! No mortal could support the horror of that countenance.") + "<p>You wake from a nightmare of Elizabeth turning into your dead mother in your arms, and by the dim yellow light of the moon you see the wretch, the miserable monster you have created. He holds up the curtain of the bed. His jaws open; one hand is stretched out, seemingly to detain you.</p>" + fkSrc("5"), "▶ Escape")),
fzId("flee", fzGo("yard", "Escape down the stairs, into the courtyard of the house", { r: 6 })),
fzHold("yard", 10, "Walk up and down the courtyard all night, listening for every sound", { r: 8 }),
fzRead("🕕 The sixth hour", fkbQs("Morning, dismal and wet, at length dawned and discovered to my sleepless and aching eyes the church of Ingolstadt, its white steeple and clock, which indicated the sixth hour.") + fkSrc("5"), "▶ Out into the streets"),
fzRead("🚶 Like one who, on a lonely road", fkbQs("Like one who, on a lonely road, Doth walk in fear and dread, And, having once turned round, walks on, And turns no more his head; Because he knows a frightful fiend Doth close behind him tread.") + "<div style='font-size:11px;opacity:.65'>Coleridge, The Ancient Mariner, as Victor remembers it</div>", "▶ Walk on"),
fzId("inn", fzGo("inn", "Walk the streets until you come to the inn where the diligences stop", { r: 6 })),
fzTalk("Henry Clerval", "A Swiss coach has stopped: Henry Clerval jumps out!", ["🤗 Clerval!", fkbQs("Nothing could equal my delight on seeing Clerval; his presence brought back to my thoughts my father, Elizabeth, and all those scenes of home so dear to my recollection.") + "<p>\"My dear Frankenstein! How glad I am! My father let me come at last. But you look so thin, so pale!\"</p>" + fkSrc("5"), "▶ Go on"]),
fzId("lodg", fzGo("lodging", "Take him to your rooms (dreading what you will find there)", { r: 3 })),
fzGo(fkwIn("ingol", "lodging", 0, 1.4), "Go up. Throw open the door like a child expecting a spectre", { r: 3 }),
fzPuzzle("🚪 The room", "What do you find in your apartment?", ["The creature, waiting", "Nothing: it is empty, and your bedroom freed of its hideous guest", "A letter from the creature"], 1, ["He is gone.", "", "He cannot yet write."], { yes: "🚪 You clap your hands for joy and laugh wildly, and Henry is frightened for you. Then you fall down senseless." }),
fzId("fever", fzHold(fkwIn("ingol", "bedroom", -1.2, -0.2), 14, "A nervous fever holds you for several months. Lie still while Henry nurses you", { r: 2.5 })),
fzTalk("Henry Clerval", "Henry, by your bed: you are getting well", ["🌸 Spring", fkbQs("Dearest Clerval,", "how kind, how very good you are to me.") + "<p>\"Get well fast, and write to your father and cousin in your own hand. And here: a letter, lying some days for you. From your cousin, I believe.\"</p>" + fkSrc("5"), "▶ Take the letter"])
] });
fkbCh({ t: "Elizabeth's letter, and the spring", txt: 9, start: { sc: "ingol", x: -450, z: 421.6, ry: 0 }, jump: 1, tune: "cottage", keep: ["letter", "Elizabeth's letter", "💌"], state: { env: "spring" },
words: "Your recovery, and Elizabeth's letter from Geneva: home, Justine Moritz, little William. Then Henry meets the professors, and the two of you walk the country round Ingolstadt in May.",
intro: "Elizabeth's letter",
cast: [fkc("clerval", fkwIn("ingol", "bedroom", 1.2, 0.6), { ry: Math.PI * 1.2, until: "walk" }), fkc("waldman", fkwIn("ingol", "waldlab", 0.8, -1), { ry: 0 }), fkc("krempe", fkwIn("ingol", "krempe", 0, -0.8), { ry: 0 }),
fkc("clerval", fkI(-150, 326), { key: "cl3", from: "walk", ry: Math.PI })],
steps: [
{ k: "read" },
fzRead("💌 My dearest Cousin", fkbQs("You have been ill, very ill, and even the constant letters of dear kind Henry are not sufficient to reassure me on your account.") + "<p>The blue lake and snow-clad mountains never change, she writes. Your father is well. Ernest is sixteen and wants to be a soldier.</p>" + fkSrc("6"), "▶ Read on"),
fzPuzzle("👩 Justine Moritz", "Elizabeth reminds you of Justine Moritz. Who is she?", ["A cousin from Lausanne", "The girl your mother took into the house, whose own mother disliked her", "A governess from Paris"], 1, ["No.", "", "No."], { yes: "👩 Justine nursed your mother in her last illness. She went home to her mother after; now she has come back to the house." }),
fzPuzzle("👦 Little William", "And William, your youngest brother?", ["\"Very tall of his age, with sweet laughing blue eyes, dark eyelashes, and curling hair\"", "Away at school", "Sick with fever"], 0, ["", "Not yet.", "He is well."], { yes: "👦 He has two little wives already, Louisa Biron among them." }),
fzRead("✍️ Dear, dear Elizabeth", fkbQs("Dear, dear Elizabeth!", "I will write instantly and relieve them from the anxiety they must feel.") + fkSrc("6"), "▶ Write"),
fzGo(fkwIn("ingol", "waldlab", 0, 1.8), "Introduce Henry to the professors: first M. Waldman", { r: 3 }),
fzTalk("M. Waldman", "M. Waldman praises your work; it hurts you to hear it", ["🔪 Torture", fkbQs("M. Krempe was not equally docile") + "<p>Waldman praises your astonishing progress, kindly, and every word is torture. He sees your pain, and thinks it modesty, and changes the subject.</p>" + fkSrc("6"), "▶ Go on"]),
fzTalk("M. Krempe", "M. Krempe, in his study", ["💬 D—n the fellow", fkbQs("D—n the fellow!", "why, M. Clerval, I assure you he has outstript us all. Ay, stare if you please; but it is nevertheless true.") + fkSrc("6"), "▶ Go on"]),
fzPuzzle("📜 Henry's studies", "What has Henry come to Ingolstadt to learn?", ["Chemistry", "The oriental languages: Persian, Arabic, Sanskrit", "Medicine"], 1, ["He never cared for it.", "", "No."], { yes: "📜 And you learn them with him: they are a comfort, with no thought in them of the laboratory." }),
fzId("walk", fzTravel("🌿 A walk in May", "May: Henry proposes a pedestrian tour of the country round Ingolstadt before you go home.", { sc: "ingol", x: 0, z: 200, ry: Math.PI }, "🌿 <b>Out of the town,</b> over the Danube.", "▶ Walk out")),
fzGo("woods", "Walk with Henry to the wood", { r: 8 }),
fzHold("woods", 12, "A fortnight of walking, the air, the flowers, the talk", { r: 12 }),
fzTalk("Henry Clerval", "Henry", ["🌸 Gaiety", "He recites poems to you, and argues for the fun of it. You are well, and happy, as you were before the work." + fkbQs("We returned to our college on a Sunday afternoon: the peasants were dancing, and every one we met appeared gay and happy."), "▶ Back to the town"]),
fzGo("square", "Back in the town, the peasants are dancing in the square", { r: 8 })
] });
fkbCh({ t: "William is dead", txt: 10, start: { sc: "ingol", x: -480, z: 421.6, ry: 0 }, jump: 1, tune: "grief", keep: ["miniature", "Your mother's miniature", "🖼️"],
state: { env: function (s) { return s < 3 ? "town" : (s < 13 ? "storm" : "lake"); }, night: function (s) { return s >= 3 && s < 13; }, gateShut: function (s) { return s >= 3 && s < 13; } },
words: "You come back from the walk to a letter from your father.",
intro: "A letter from Geneva",
cast: [fkc("clerval", fkwIn("ingol", "lodging", 1.6, 0), { ry: -Math.PI / 2, until: "go" }), fkc("creature", fkG(-40, 470), { from: "flash", until: "gone", ry: Math.PI, mute: true }),
fkc("ernest", fkwIn("geneva", "fhouse", -1.2, -1.4), { from: "home", ry: 0.6 }), fkc("alphonse", fkwIn("geneva", "fhouse", 1.6, -1), { from: "home", ry: -0.8 }), fkc("elizabeth", fkwIn("geneva", "fhouse", 0.2, -2.4), { from: "home", ry: 0 })],
steps: [
{ k: "read" },
fzRead("✉️ My dear Victor", fkbQs("William is dead!—that sweet child, whose smiles delighted and warmed my heart, who was so gentle, yet so gay! Victor, he is murdered!") + "<p>On Thursday evening they walked in Plainpalais; William ran ahead to hide; at dawn they found him on the grass, the print of the murderer's finger on his neck. And the miniature of your mother that Elizabeth had let him wear is gone.</p>" + fkSrc("7"), "▶ Go on"),
fzTalk("Henry Clerval", "Henry sees your face", ["😢 Poor William", fkbQs("I can offer you no consolation, my friend,", "your disaster is irreparable. What do you intend to do?", "To go instantly to Geneva: come with me, Henry, to order the horses.") + fkSrc("7"), "▶ Order the horses"]),
fzId("go", fzTravel("🐎 Home", "Days on the road. Two days at Lausanne, looking at the lake. It is completely dark when you reach Geneva, and the gates of the town are already shut.", { sc: "geneva", x: 118, z: -14, ry: Math.PI / 2 }, "🌑 <b>Outside Geneva,</b> at night. The gates are shut.", "▶ Hurry home")),
fzPuzzle("🚪 Shut out", "The gates of Geneva are shut for the night. What will you do?", ["Climb the wall", "Pass the night at Sécheron, and cross the lake to see the place where William died", "Hammer on the gate till they open"], 1, ["Not you.", "", "They will not open till dawn."], { yes: "⛵ " + fkQ("As I could not pass through the town, I was obliged to cross the lake in a boat to arrive at Plainpalais.") }),
fzGo("shore", "Go down to the lake for a boat. The lightning plays on the summit of Mont Blanc", { r: 8 }),
fzTravel("⛵ Across the lake", "The storm comes on fast. You land and walk up into the dark fields.", { sc: "geneva", x: -60, z: 380 }, "⛈️ <b>Plainpalais,</b> in the storm.", "▶ Land"),
fzHold("murder", 8, "Stand in the storm where William was murdered", { r: 8 }),
fzId("flash", fzRead("⚡ A figure", fkbQs("William, dear angel! this is thy funeral, this thy dirge!", "As I said these words, I perceived in the gloom a figure which stole from behind a clump of trees near me; I stood fixed, gazing intently: I could not be mistaken.") + fkSrc("7"), "▶ Look!")),
fzGo(fkG(-50, 440), "A flash shows him: gigantic, deformed. Run towards him", { r: 12 }),
fzId("gone", fzRead("⛰️ Mont Salêve", fkbQs("another flash discovered him to me hanging among the rocks of the nearly perpendicular ascent of Mont Salêve, a hill that bounds Plainpalais on the south. He soon reached the summit, and disappeared.") + fkSrc("7"), "▶ Go on")),
fzPuzzle("💭 Who killed William?", "You stand in the rain. What do you know now, beyond doubt?", ["A robber killed him for the miniature", "The creature you made is the murderer of your brother", "It was an accident"], 1, ["You know better.", "", "No."], { yes: "💭 And you can tell no one: who would believe it?" }),
fzHold("murder", 10, "Spend the rest of the night in the open, cold and wet", { r: 10 }),
fzTravel("🌅 Dawn", "Day dawns. The gates are open, and you hurry to your father's house.", { sc: "geneva", x: -167, z: 17 }, "🌅 <b>Geneva,</b> five in the morning.", "▶ Go home"),
fzId("home", fzGo(fkwIn("geneva", "fhouse", 0, 1.8), "Go into your father's house, to the library, and wait for the family to rise", { r: 3 })),
fzTalk("Ernest", "Ernest, your brother, comes in", ["😨 The murderer discovered", fkbQs("She most of all,", "requires consolation; she accused herself of having caused the death of my brother, and that made her very wretched. But since the murderer has been discovered—", "The murderer discovered! Good God! how can that be?") + "<p>It is Justine Moritz. The miniature was found in her pocket.</p>" + fkSrc("7"), "▶ Go on"]),
fzTalk("Alphonse Frankenstein", "Your father", ["⚖️ To be tried today", fkbQs("My dear father, you are mistaken; Justine is innocent.", "If she is, God forbid that she should suffer as guilty. She is to be tried today, and I hope, I sincerely hope, that she will be acquitted.") + fkSrc("7"), "▶ Go on"]),
fzTalk("Elizabeth", "Elizabeth, changed and lovely, and sure of Justine", ["💛 She is innocent", fkbQs("She is innocent, my Elizabeth,", "and that shall be proved; fear nothing, but let your spirits be cheered by the assurance of her acquittal.") + fkSrc("7"), "▶ To the court"])
] });
fkbCh({ t: "Justine", txt: 11, start: { sc: "geneva", x: -60, z: 27, ry: 0 }, jump: 1, tune: "grief", keep: ["justine", "Justine's farewell", "🕊️"], state: { env: "rain" },
words: "Eleven o'clock: the trial begins. Your father and family must go as witnesses. You go with them, in torture.",
intro: "The court-house",
cast: [fkc("justine", fkwIn("geneva", "court", 5.5, -1), { until: "night", ry: -Math.PI / 2 }), fkc("elizabeth", fkwIn("geneva", "court", -2, 2), { until: "night", ry: Math.PI }), fkc("alphonse", fkwIn("geneva", "court", -3.4, 2.6), { until: "night", ry: Math.PI }),
fkc("judge", fkwIn("geneva", "court", 0, -6.2), { key: "judge", name: "The chief judge", dress: "fkblack", persona: "You are a judge of the court of Geneva in the 1790s, in Mary Shelley's Frankenstein (the book only): stern, sure of the evidence.", greet: "The court will hear the charge.", until: "night" }),
fkc("officer", fkwIn("geneva", "court", 3, 4), { key: "officer", name: "An officer of the court", dress: "fkblack", persona: "townfolk", greet: "Sir?", from: "night", until: "cell" }),
fkc("justine", fkwIn("geneva", "cell", 1.2, -1.6), { key: "j2", from: "cell", ry: 0 }), fkc("elizabeth", fkwIn("geneva", "cell", -0.8, 0.6), { key: "e2", from: "cell", ry: Math.PI })],
steps: [
{ k: "read" },
fzGo(fkwIn("geneva", "court", -1, 3), "Go into the court-house and take your place on the benches", { r: 3 }),
fzTalk("Justine Moritz", "Justine, in mourning, in the dock", ["🕊️ Her defence", fkbQs("God knows,", "how entirely I am innocent. But I do not pretend that my protestations should acquit me") + "<p>She passed that night at her aunt's at Chêne; coming back late she found the gates shut and slept in a barn, and searched for William at dawn. She cannot say how the picture came into her pocket.</p>" + fkSrc("8"), "▶ Go on"]),
fzPuzzle("🖼️ The miniature", "How does the court believe the picture came to Justine?", ["She stole it from the house", "She took it from William when she killed him", "She bought it from a pedlar"], 1, ["No.", "", "No."], { yes: "🖼️ And you know better, and cannot say." }),
fzTalk("Elizabeth", "Elizabeth asks leave to speak for her", ["💛 Elizabeth speaks", fkbQs("I am,", "the cousin of the unhappy child who was murdered, or rather his sister, for I was educated by and have lived with his parents ever since and even long before his birth.") + fkSrc("8"), "▶ Go on"]),
fzHold(fkwIn("geneva", "court", -1, 3), 10, "Sit through the rest of the trial, in torture", { r: 3 }),
fzId("night", fzRead("🌑 A night of wretchedness", fkbQs("I passed a night of unmingled wretchedness. In the morning I went to the court; my lips and throat were parched.") + fkSrc("8"), "▶ Go on")),
fzTalk("An officer of the court", "The officer guesses what you dare not ask", ["⚖️ She has confessed", "\"The ballots are all black, sir. She is condemned. And she has confessed.\"", "▶ Go on"]),
fzPuzzle("💔 Confessed", "What do you tell Elizabeth?", ["That she was guilty after all", "That all judges had rather ten innocent suffer than one guilty escape, but she has confessed", "Nothing"], 1, ["You know she is not.", "", "She asks you."], { yes: "💔 " + fkQ("How shall I ever again believe in human goodness?") + " says Elizabeth." }),
fzId("cell", fzGo(fkwIn("geneva", "cell", 0, 1.4), "Justine asked to see Elizabeth. Go down with her to the cell", { r: 2.5 })),
fzTalk("Justine Moritz", "Justine, on the straw, her hands in irons", ["🕊️ I confessed a lie", fkbQs("I did confess, but I confessed a lie. I confessed, that I might obtain absolution; but now that falsehood lies heavier at my heart than all my other sins.", "I do not fear to die,", "that pang is past.") + fkSrc("8"), "▶ Go on"]),
fzRead("🪱 The never-dying worm", fkbQs("But I, the true murderer, felt the never-dying worm alive in my bosom, which allowed of no hope or consolation.") + fkSrc("8"), "▶ Go on"),
fzRead("⚰️ On the morrow", fkbQs("And on the morrow Justine died.") + fkSrc("8"), "▶ Go on"),
fzHold("cathedral", 10, "Go to the cathedral, where the family mourns William and Justine", { r: 6 })
] });
function fkAl(x, z) { return { sc: "alps", x: x, z: z }; }
function fkC(x, z) { return { sc: "cottage", x: x, z: z }; }
function fkCot(x, z) { return fkwIn("cottage", "cott", x, z); }
fkbCh({ t: "The valley of Chamounix", txt: 12, start: { sc: "geneva", x: 400, z: -8, ry: Math.PI }, jump: 1, tune: "night", keep: ["mule", "The mule to Chamounix", "🫏"],
state: { env: function (s) { return s < 6 ? "moon" : "alpine"; }, night: function (s) { return s < 6; } },
words: "After Justine's death you cannot rest. The family goes out to Belrive; you take the boat out on the lake alone at night. Then you leave for the Alps.",
intro: "Belrive, at night",
cast: [fkc("alphonse", fkwIn("geneva", "belrive", -2, -1), { ry: 0.4 }), fkc("elizabeth", fkwIn("geneva", "belrive", 1.6, -0.6), { ry: -0.6 })],
steps: [
{ k: "read" },
fzRead("🌑 Dead calmness", fkbQs("Nothing is more painful to the human mind than, after the feelings have been worked up by a quick succession of events, the dead calmness of inaction and certainty which follows and deprives the soul both of hope and fear.") + fkSrc("9"), "▶ Go on"),
fzGo("landing", "Free of the town gates at last: go down to the boat at the landing", { r: 6 }),
fzRead("⛵ On the lake", fkbQs("Often, after the rest of the family had retired for the night, I took the boat and passed many hours upon the water.") + fkSrc("9"), "▶ Row out"),
fzHold(fkG(400, -90), 12, "Row into the middle of the lake and let the boat drift", { r: 20 }),
fzPuzzle("🌊 What holds you back", "You are tempted to let the waters close over you. What keeps you from it?", ["Fear of the cold", "The thought of heroic, suffering Elizabeth, and your father and brother", "The boat's oars"], 1, ["Not that.", "", "No."], { yes: "🌊 And the dread that the fiend might still do more harm to them, while you lived to protect them." }),
fzGo(fkwIn("geneva", "belrive", 0, 1.6), "Go back up to the house", { r: 3 }),
fzTalk("Elizabeth", "Elizabeth, at the window", ["💔 Justine", fkbQs("When I reflect, my dear cousin,", "on the miserable death of Justine Moritz, I no longer see the world and its works as they before appeared to me.") + fkSrc("9"), "▶ Go on"]),
fzTalk("Alphonse Frankenstein", "Your father tells you grief should not be indulged", ["⚖️ Your father", "\"Victor, do you think I do not suffer also? But excessive sorrow prevents improvement or enjoyment, and even the discharge of daily usefulness. It is a duty you owe to us.\"" + fkSrc("9"), "▶ Go on"]),
fzTravel("🏔️ To the Alps", "You leave home suddenly, on horseback, then on a sure-footed mule, up into the Alpine valleys: the valley of Chamounix, where you went as a boy.", { sc: "alps", x: -200, z: 28, ry: Math.PI / 2 }, "🏔️ <b>The valley of the Arve.</b>", "▶ Ride"),
fzGo("bridge", "Cross the bridge over the Arve, and follow the river up the valley", { r: 8 }),
fzHold("valley", 10, "Ride on up the valley: ruined castles on precipices, the glaciers, Mont Blanc over all", { r: 14 }),
fzGo("chamounix", "Arrive at last at the village of Chamounix", { r: 10 }),
fzGo("chinn", "Go to the inn and rest", { r: 3 }),
fzRead("🌙 Sleep", fkbQs("At length I arrived at the village of Chamounix.") + "<p>You lie at the window and watch the lightning play over Mont Blanc and listen to the Arve, until sleep comes like a nurse.</p>" + fkSrc("9"), "▶ Sleep")
] });
fkbCh({ t: "The Mer de Glace", txt: 13, start: { sc: "alps", x: 30, z: -2, ry: Math.PI }, jump: 1, tune: "ice", keep: ["glacier", "The sea of ice", "🏔️"],
state: { env: function (s) { return s < 5 ? "alpine" : (s < 8 ? "mist" : "alpine"); } },
words: "The next day you wander through the valley. The day after, alone, you climb Montanvert, to the sea of ice.",
intro: "Chamounix",
cast: [fkc("creature", fkAl(470, -680), { from: "comes", until: "hut", ry: Math.PI * 0.8 }), fkc("creature", fkwIn("alps", "hut", 1.6, -1), { key: "cr2", from: "hut", ry: Math.PI * 1.3 })],
steps: [
{ k: "read" },
fzGo("arveiron", "Walk up to the source of the Arveiron, under the glacier's icy wall", { r: 10 }),
fzRead("🧊 The presence-chamber", fkbQs("the solemn silence of this glorious presence-chamber of imperial Nature was broken only by the brawling waves or the fall of some vast fragment, the thunder sound of the avalanche") + fkSrc("10"), "▶ Go on"),
fzGo("path", "In the morning the rain pours in torrents. Go alone to the foot of the path up Montanvert", { r: 6 }),
fzGo(fkAl(110, -150), "Climb the zig-zag path, through the pines broken by avalanches", { r: 10 }),
fzGo("montanvert", "Climb on to the top of Montanvert, by noon", { r: 12 }),
fzRead("🌫️ The rock above the sea of ice", fkbQs("It was nearly noon when I arrived at the top of the ascent. For some time I sat upon the rock that overlooks the sea of ice. A mist covered both that and the surrounding mountains.") + fkSrc("10"), "▶ Go down onto the ice"),
fzGo("glacier", "Go down onto the glacier, \"rising like the waves of a troubled sea\", and cross it carefully", { r: 16 }),
fzGo("opposite", "Two hours to cross the ice to the far side, opposite Montanvert", { r: 14 }),
fzId("comes", fzRead("⛰️ Wandering spirits", fkbQs("As I said this I suddenly beheld the figure of a man, at some distance, advancing towards me with superhuman speed. He bounded over the crevices in the ice, among which I had walked with caution") + fkSrc("10"), "▶ Face him")),
fzTalk("The creature", "He comes up to you. You curse him; he speaks", ["🗣️ Be calm!", fkbQs("I expected this reception,", "All men hate the wretched; how, then, must I be hated, who am miserable beyond all living things!") + fkSrc("10"), "▶ Go on"]),
fzPuzzle("⚔️ What do you do?", "Rage takes you. You spring at him. And he?", ["He strikes you down", "He easily eludes you, and begs you to hear him", "He runs away"], 1, ["He does not.", "", "He stays."], { yes: "⚔️ " + fkQ("Be calm! I entreat you to hear me before you give vent to your hatred on my devoted head.") }),
fzTalk("The creature", "Hear him out", ["💬 I was benevolent", fkbQs("Believe me, Frankenstein, I was benevolent; my soul glowed with love and humanity; but am I not alone, miserably alone?", "The desert mountains and dreary glaciers are my refuge.") + fkSrc("10"), "▶ Go on"]),
fzPuzzle("🏔️ Will you listen?", "He asks you to come to his hut on the mountain, and hear his story. Why do you go?", ["Curiosity, compassion, and the thought that you owe your creature some happiness", "Because you are lost", "Because he will kill you if you refuse"], 0, ["", "You know the way.", "He has not threatened you, yet."], { yes: "🏔️ " + fkQ("Thus I relieve thee, my creator,") }),
fzId("hut", fzGo("hut", "Follow him across the ice to his hut", { r: 4 })),
fzGo(fkwIn("alps", "hut", 0, 1.2), "Go in. He lights the fire", { r: 2.5 }),
fzHold(fkwIn("alps", "hut", -0.6, 0.6), 8, "Sit by the fire. He begins his tale", { r: 2.5 }),
fzRead("🔥 His story", fkbQs("It is with considerable difficulty that I remember the original era of my being; all the events of that period appear confused and indistinct.") + "<p>From now on, the story is his, and you will live it as him.</p>" + fkSrc("11"), "▶ His story")
] });
fkbCh({ t: "The wood, the fire, the hovel", txt: 14, start: { sc: "cottage", x: 180, z: 300, ry: Math.PI }, jump: 1, tune: "cottage", keep: ["fire", "The beggars' fire", "🔥"],
state: { env: function (s) { return s < 4 ? "night" : (s < 12 ? "winter" : "winter"); }, night: function (s) { return s < 4; }, season: "winter" },
words: "You are the creature. You remember nothing clearly at first: light, dark, cold. You have fled from your maker's rooms at Ingolstadt and wandered into a wood.",
intro: "The wood, at night",
cast: [fkc("shepherd", fkC(-150, 206), { key: "shep", name: "An old shepherd", dress: "fkworn", persona: "You are an old shepherd in Frankenstein (the book only), terrified of the huge creature at your door.", greet: "(He shrieks, and runs across the fields as fast as his old legs can carry him.)", until: "hutin", ry: Math.PI }),
fkc("felix", fkC(-12, 26), { from: "cottagers", ry: 0.5, greet: "(He cannot see you: you are hidden in the hovel.)", mute: true }), fkc("agatha", fkCot(-3.2, 0.6), { from: "cottagers", ry: -Math.PI / 2, mute: true }), fkc("delacey", fkCot(-1.8, -2.2), { from: "cottagers", ry: 0.6, mute: true })],
steps: [
{ k: "read" },
fzHold("wake", 8, "It is dark and cold. Lie at the foot of a tree by a brook, until the light comes", { r: 8 }),
fzRead("🌙 A radiant form", fkbQs("Soon a gentle light stole over the heavens and gave me a sensation of pleasure. I started up and beheld a radiant form rise from among the trees.") + "<p>(The moon.)</p>" + fkSrc("11"), "▶ Go on"),
fzGather("berries", fkC(170, 270), 5, "Berries on the bushes", "Hungry and thirsty: gather berries from the bushes", { spread: 10 }),
fzFind("fire", fkC(140, 220), "A fire left by wandering beggars", "You find a fire left by beggars. Go to it, and feel its warmth"),
fzPuzzle("🔥 The fire", "Delighted by the warmth, you thrust your hand into the live embers. What do you learn?", ["That fire is good to eat", "That the same cause can produce such opposite effects: warmth, and pain", "That fire is alive"], 1, ["No!", "", "No."], { yes: "🔥 And you learn to feed it with wood, and to cook the offals the travellers left, and that roasted nuts and roots taste better." }),
fzGather("wood", fkC(150, 230), 3, "A dry branch", "Gather dry wood to keep the fire alive", { spread: 8 }),
fzGo("shepherd", "Food is scarce. Snow falls. Walk until you find a small hut on rising ground", { r: 6 }),
fzTalk("An old shepherd", "An old man is inside at his fire", ["😱 He runs!", "He turns, sees you, shrieks loudly, and runs across the fields with a speed of which his old frame hardly seemed capable.", "▶ Go in"]),
fzId("hutin", fzGo(fkwIn("cottage", "shep", 0, 1.2), "Go into the hut: dry, warm, and his breakfast on the table", { r: 2.5 })),
fzGather("bread", fkwIn("cottage", "shep", 0.8, 0.4), 3, "The shepherd's breakfast", "Eat his breakfast: bread, cheese, milk, and wine (which you do not like)", { spread: 0.4 }),
fzGo("village", "At noon, walk on until you come to a village", { r: 12 }),
fzGo(fkwIn("cottage", "vil1", 0, 1.4), "Go into one of the best cottages. There is food", { r: 2.5 }),
fzRead("🪨 The village", fkbQs("I had hardly placed my foot within the door before the children shrieked, and one of the women fainted. The whole village was roused; some fled, some attacked me, until, grievously bruised by stones and many other kinds of missile weapons, I escaped to the open country and fearfully took refuge in a low hovel") + fkSrc("11"), "▶ Flee"),
fzId("cottagers", fzGo("hovel", "Take refuge in a low hovel against the back of a cottage, quite bare, and making a wretched appearance", { r: 2.5 })),
fzGather("wood", fkC(-2, 8), 3, "Clean straw", "Carpet the hovel with clean straw and close the entrance with wood", { spread: 2 }),
fzGo("chink", "There is a small chink in the wall where a window once was. Look through it", { r: 1.6 }),
fzRead("🎻 The old man's music", fkbQs("The old man had, in the meantime, been pensive, but on the appearance of his companions he assumed a more cheerful air, and they sat down to eat.") + "<p>You watch: a sweet girl at her work, an old man playing on an instrument, which makes sounds sweeter than the thrush or the nightingale; a young man bringing in wood.</p>" + fkSrc("11"), "▶ Go on"),
fzPuzzle("🕯️ Night", "Night falls; to your wonder, the cottagers have a means of prolonging light. What is it?", ["Fire in the hearth only", "Tapers", "Lamps of whale oil"], 1, ["More than that.", "", "Not here."], { yes: "🕯️ " + fkQ("I found that the cottagers had a means of prolonging light by the use of tapers") })
] });
fkbCh({ t: "The cottagers", txt: 15, start: { sc: "cottage", x: 0, z: 7.6, ry: Math.PI }, jump: 1, tune: "cottage", keep: ["wood", "Wood at their door", "🪵"],
state: { env: function (s) { return s < 12 ? "winter" : "spring"; }, season: function (s) { return s < 12 ? "winter" : "spring"; } },
words: "Winter in the hovel. You watch the cottagers through the chink every day.",
intro: "The hovel",
cast: [fkc("felix", fkC(-12, 26), { ry: 0.5, mute: true }), fkc("agatha", fkCot(-3.2, 0.6), { ry: -Math.PI / 2, mute: true }), fkc("delacey", fkCot(-1.8, -2.2), { ry: 0.6, mute: true })],
steps: [
{ k: "read" },
fzHold("chink", 8, "Watch them through the chink at sunrise: the girl arranges the cottage, the youth goes out to work", { r: 1.6 }),
fzPuzzle("😢 Not entirely happy", "They are kind and gentle, but they often weep. What is the first cause you discover?", ["Illness", "Poverty: the youth gives his food to the old man", "A quarrel"], 1, ["Not that.", "", "They never quarrel."], { yes: "😢 " + fkQ("it was poverty, and they suffered that evil in a very distressing degree.") }),
fzPuzzle("🌰 Your stolen food", "You have been stealing from their store at night. What do you do now you know they are hungry?", ["Steal more", "Stop, and live on berries, nuts, and roots from the wood", "Leave"], 1, ["No.", "", "You stay."], { yes: "🌰 You gather your own food in the wood." }),
fzGather("acorn", fkC(40, -40), 4, "Nuts and roots", "Gather nuts and roots in the wood for yourself", { spread: 14 }),
fzGather("wood", fkC(-20, 40), 4, "A load of firewood", "At night, gather wood for them, enough for several days", { spread: 10 }),
fzGo("woodpile", "Leave the wood at their door before dawn", { r: 3 }),
fzPuzzle("🪵 Good spirit", "In the morning the girl finds the wood. What do they say?", ["They call the police", "They say \"good spirit,\" \"wonderful\"", "Nothing"], 1, ["No.", "", "They are amazed."], { yes: "🪵 You do not yet know what the words mean." }),
fzHold("chink", 10, "Watch and listen, through the winter, as they speak. Learn the sounds", { r: 1.6 }),
fzPuzzle("🔤 Words", "Which are among the first words you learn?", ["Fire, milk, bread, wood", "Ruins, empires, kings", "Thunder, lightning"], 0, ["", "Not yet.", "Not yet."], { yes: "🔤 And their names: father, sister, Agatha, son, Felix, brother." }),
fzRead("💧 A transparent pool", fkbQs("I had admired the perfect forms of my cottagers—their grace, beauty, and delicate complexions; but how was I terrified when I viewed myself in a transparent pool!") + fkSrc("12"), "▶ Go on"),
fzGo("stream", "Go to the stream, and look at your reflection", { r: 8 }),
fzHold("chink", 10, "Spring comes. Keep learning, in the hovel", { r: 1.6 }),
fzRead("🌸 Spring", fkbQs("The pleasant showers and genial warmth of spring greatly altered the aspect of the earth.") + fkSrc("12"), "▶ Go on"),
fzPuzzle("🤝 Your plan", "What do you hope, when you can speak?", ["To frighten them away", "To make them overlook your deformity, by your gentle words, and win their love", "To take the cottage"], 1, ["Never.", "", "Never."], { yes: "🤝 And first you must master their language." })
] });
fkbCh({ t: "Safie", txt: 16, start: { sc: "cottage", x: 0, z: 7.6, ry: Math.PI }, jump: 1, tune: "cottage", keep: ["guitar", "Safie's song", "🎶"], state: { env: "spring", season: "spring" },
words: "Spring. One day a lady on horseback comes to the cottage, in a dark suit and a thick black veil.",
intro: "The hovel, in spring",
cast: [fkc("felix", fkCot(1, 0.2), { ry: Math.PI, mute: true }), fkc("agatha", fkCot(-3.2, 0.6), { ry: -Math.PI / 2, mute: true }), fkc("delacey", fkCot(-1.8, -2.2), { ry: 0.6, mute: true }), fkc("safie", fkCot(2.2, 0.6), { from: "safie", ry: Math.PI, mute: true }),
fkc("safie", fkC(4, 40), { key: "saf0", until: "safie", ry: Math.PI, mute: true })],
steps: [
{ k: "read" },
fzHold("chink", 8, "It is a day of rest. The old man plays his guitar. Watch", { r: 1.6 }),
fzRead("🐎 A lady on horseback", fkbQs("It was a lady on horseback, accompanied by a country-man as a guide. The lady was dressed in a dark suit and covered with a thick black veil.") + fkSrc("13"), "▶ Go on"),
fzId("safie", fzPuzzle("🌹 Felix", "How does Felix greet her?", ["Coldly", "Ravished with delight, every trait of sorrow gone from his face", "He does not see her"], 1, ["No.", "", "He sees her at once."], { yes: "🌹 She is Safie, an Arabian, and she has come to learn their language." })),
fzRead("🎶 Her song", fkbQs("When she had finished, she gave the guitar to Agatha, who at first declined it.") + "<p>Safie sings a song of her own country, and her voice flows in a rich cadence, swelling or dying away like a nightingale of the woods.</p>" + fkSrc("13"), "▶ Go on"),
fzHold("chink", 12, "Listen as Felix teaches Safie their language. Learn with her (faster than she does)", { r: 1.6 }),
fzPuzzle("📖 Volney", "From what book does Felix teach Safie?", ["The Bible", "Volney's Ruins of Empires", "Plutarch's Lives"], 1, ["Not that one.", "", "Later."], { yes: "📖 " + fkQ("The book from which Felix instructed Safie was Volney's Ruins of Empires.") }),
fzRead("🌍 Man", fkbQs("These wonderful narrations inspired me with strange feelings. Was man, indeed, at once so powerful, so virtuous and magnificent, yet so vicious and base?") + fkSrc("13"), "▶ Go on"),
fzPuzzle("❓ What am I?", "You learn that men esteem high descent and riches. What do you ask yourself?", ["\"Where can I buy some?\"", "\"And what was I?\"", "Nothing"], 1, ["You have nothing.", "", "You cannot help asking."], { yes: "❓ " + fkQ("Of what a strange nature is knowledge! It clings to the mind when it has once seized on it like a lichen on the rock.") }),
fzRead("👶 No father", fkbQs("But where were my friends and relations? No father had watched my infant days, no mother had blessed me with smiles and caresses") + fkSrc("13"), "▶ Go on"),
fzHold("garden", 8, "In the evening, walk in the garden while they sleep, among the flowers", { r: 6 })
] });
fkbCh({ t: "The De Laceys' history", txt: 17, start: { sc: "cottage", x: 0, z: 7.6, ry: Math.PI }, jump: 1, tune: "cottage", keep: ["pen", "Copies of Safie's letters", "🪶"], state: { env: "summer", season: "summer" },
words: "Summer at the cottage. Through the chink, and from what they say, you learn your friends' history.",
intro: "The hovel, in summer",
cast: [fkc("felix", fkCot(1, 0.2), { ry: Math.PI, mute: true }), fkc("agatha", fkCot(-3.2, 0.6), { ry: -Math.PI / 2, mute: true }), fkc("delacey", fkCot(-1.8, -2.2), { ry: 0.6, mute: true }), fkc("safie", fkCot(2.2, 0.6), { ry: Math.PI, mute: true })],
steps: [
{ k: "read" },
fzHold("chink", 10, "Listen through the chink to the old man's story", { r: 1.6 }),
fzPuzzle("🇫🇷 De Lacey", "Who was the old man, once?", ["A French peasant", "A gentleman of a good family in France, living in affluence in Paris", "A German soldier"], 1, ["No.", "", "No."], { yes: "🇫🇷 " + fkQ("The name of the old man was De Lacey. He was descended from a good family in France") }),
fzPuzzle("⚖️ Safie's father", "What brought the family to ruin?", ["Gambling", "Felix freed Safie's father, a Turkish merchant unjustly condemned in Paris, and was found out", "A fire"], 1, ["No.", "", "No."], { yes: "⚖️ Felix was present at the trial and could not bear the injustice. He helped the Turk escape from prison." }),
fzPuzzle("💔 The Turk's promise", "The Turk promised Felix his daughter. Did he keep his word?", ["Yes", "No: when Felix lost everything, he told Safie to think no more of him", "He never promised"], 1, ["No.", "", "He did promise."], { yes: "💔 The family was exiled from France and their fortune taken. They found a miserable asylum in this cottage in Germany." }),
fzFind("letter", fkC(-6, 6), "Implements of writing", "Find the pen and paper you have procured, in your hovel"),
fzPuzzle("✍️ Safie's letters", "Safie wrote letters to Felix in her lover's language. Why did she run away from her father?", ["She hated Leghorn", "Her Christian mother had taught her to hope for a free life, and she would not be shut up in a harem in Turkey", "Felix sent for her"], 1, ["No.", "", "She came by herself."], { yes: "✍️ She took jewels and money, and with an attendant found her way across Europe to this cottage." }),
fzRead("🏡 Such were the events", fkbQs("Such were the events that preyed on the heart of Felix and rendered him, when I first saw him, the most miserable of his family.") + fkSrc("14"), "▶ Go on"),
fzHold("garden", 8, "Walk in the garden on a summer night, thinking of them", { r: 6 })
] });
fkbCh({ t: "Paradise Lost, and the old man", txt: 18, start: { sc: "cottage", x: 0, z: 7.6, ry: Math.PI }, jump: 1, tune: "cottage", keep: ["paradise", "Paradise Lost", "📖"],
state: { env: function (s) { return s < 9 ? "autumn" : "winter"; }, season: function (s) { return s < 9 ? "autumn" : "winter"; }, satchelGone: function (s) { return s >= 3; } },
words: "Late summer, then autumn. You find something in the wood.",
intro: "The wood, at night",
cast: [fkc("delacey", fkCot(-1.8, -2.2), { ry: 0.6, greet: "Who is there? Come in." }), fkc("felix", fkC(140, 180), { until: "knock", ry: Math.PI, mute: true }), fkc("agatha", fkC(144, 182), { until: "knock", ry: Math.PI, mute: true }), fkc("safie", fkC(138, 184), { until: "knock", ry: Math.PI, mute: true }),
fkc("felix", fkCot(0.4, 2.6), { key: "fel2", from: "door", ry: Math.PI, mute: true }), fkc("agatha", fkCot(1.4, 3.2), { key: "ag2", from: "door", ry: Math.PI, mute: true }), fkc("safie", fkCot(-0.6, 3.2), { key: "sa2", from: "door", ry: Math.PI, mute: true })],
steps: [
{ k: "read" },
fzGo("satchel", "On your nightly walk for food and firewood, you find something on the ground in the wood", { r: 5 }),
fzRead("🎒 A leathern portmanteau", fkbQs("I found on the ground a leathern portmanteau containing several articles of dress and some books.", "they consisted of Paradise Lost, a volume of Plutarch's Lives, and the Sorrows of Werter.") + fkSrc("15"), "▶ Take it home"),
fzGather("book", fkC(0, 8), 3, "One of the three books", "Take the three books out in the hovel: Paradise Lost, Plutarch's Lives, the Sorrows of Werter", { spread: 1.6 }),
fzPuzzle("📖 Adam", "Reading Paradise Lost as a true history, whom do you resemble?", ["Adam, and yet he was happy and guarded by his Creator, and you wretched and alone; more often, Satan", "Werter", "A Roman hero"], 0, ["", "Not that book.", "Plutarch's men are noble; you are not like them."], { yes: "📖 " + fkQ("Like Adam, I was apparently united by no link to any other being in existence") }),
fzFind("letter", fkC(-1, 7), "Papers in the pocket of the dress you took from the laboratory", "Search the pocket of the dress you took from your maker's laboratory"),
fzRead("📓 Your maker's journal", fkbQs("Hateful day when I received life!", "Accursed creator! Why did you form a monster so hideous that even you turned from me in disgust?") + fkSrc("15") + "<p>It is Victor's journal of the four months before your making. Now you know who made you, and where he lives: Geneva.</p>", "▶ Go on"),
fzPuzzle("🧓 The plan", "When will you dare to speak to them?", ["When they are all at home", "When the blind old man is alone: he cannot see your form", "Never"], 1, ["Too dangerous.", "", "You must."], { yes: "🧓 One day in late autumn, Safie, Agatha and Felix go out for a long walk." }),
fzHold("chink", 8, "Wait: the young ones are going out. Watch them leave", { r: 1.6 }),
fzId("knock", fzGo("cott", "Go round to the cottage door and knock", { r: 2.5 })),
fzTalk("Old De Lacey", "Go in. The old man sits by the fire", ["🧓 Come in", fkbQs("Pardon this intrusion,", "I am a traveller in want of a little rest; you would greatly oblige me if you would allow me to remain a few minutes before the fire.", "Enter,", "and I will try in what manner I can to relieve your wants") + fkSrc("15"), "▶ Sit by the fire"]),
fzPuzzle("💬 What do you tell him?", "How do you speak of the friends you hope to win?", ["You name them at once", "They are the most excellent creatures in the world, but prejudiced against you", "You say you have no friends"], 1, ["Not yet.", "", "That is half true."], { yes: "💬 " + fkQ("To be friendless is indeed to be unfortunate, but the hearts of men, when unprejudiced by any obvious self-interest, are full of brotherly love and charity.") }),
fzTalk("Old De Lacey", "He asks the names of your friends. This is the moment", ["😱 Great God!", fkbQs("Great God!", "Who are you?") + "<p>You seize his hand. \"Now is the time! Save and protect me! You and your family are the friends whom I seek. Do not you desert me in the hour of trial!\"</p>" + fkSrc("15"), "▶ The door opens"]),
fzId("door", fzRead("🚪 Felix", fkbQs("At that instant the cottage door was opened, and Felix, Safie, and Agatha entered. Who can describe their horror and consternation on beholding me?") + "<p>Agatha faints; Safie runs. Felix tears you from his father and strikes you violently with a stick. You could tear him limb from limb; you do not. You flee to the hovel.</p>" + fkSrc("15"), "▶ Flee")),
fzGo("hovel", "Flee back to the hovel, unseen", { r: 2.5 })
] });
fkbCh({ t: "Cursed creator", txt: 19, start: { sc: "cottage", x: 0, z: 7.6, ry: Math.PI }, jump: 1, tune: "dread", keep: ["shot", "The rustic's shot", "🩹"],
state: { env: function (s) { return s < 9 ? "night" : "spring"; }, night: function (s) { return s < 9; }, season: function (s) { return s < 9 ? "winter" : "spring"; }, burnt: function (s) { return s >= 6; } },
words: "Night, after the old man's door. The cottage is quiet. In the days after, two countrymen come to the cottage with Felix.",
intro: "The wood, that night",
cast: [fkc("felix", fkC(4, 30), { from: "felix", until: "gone", ry: Math.PI, greet: "We can never again inhabit your cottage." }), fkc("peasant", fkC(8, 32), { key: "landlord", name: "The landlord", dress: "fkwork", persona: "townfolk", from: "felix", until: "gone", ry: Math.PI, greet: "Three months' rent, and the garden lost? Think again, man." }),
fkc("girl", fkC(190, -268), { key: "girl", name: "A young girl, saved from the river", dress: "fkmaid", persona: "townfolk", sex: "f", from: "girl", until: "shot", lie: true, mute: true }),
fkc("rustic", fkC(170, -250), { key: "rustic", name: "A rustic with a gun", dress: "fkwork", persona: "townfolk", from: "girl", until: "shot", ry: Math.PI, greet: "(He levels his gun at you.)" })],
steps: [
{ k: "read" },
fzRead("🌑 Cursed, cursed creator", fkbQs("Cursed, cursed creator! Why did I live? Why, in that instant, did I not extinguish the spark of existence which you had so wantonly bestowed?") + fkSrc("16"), "▶ Go on"),
fzHold("wake", 8, "Wander in the wood all night, raging", { r: 12 }),
fzId("felix", fzHold("chink", 8, "Creep back to your hovel and wait. They do not come out", { r: 1.6 })),
fzTalk("Felix", "Felix comes with a countryman. Listen, hidden", ["🏚️ We can never again inhabit your cottage", fkbQs("It is utterly useless,", "we can never again inhabit your cottage. The life of my father is in the greatest danger") + fkSrc("16"), "▶ Go on"]),
fzId("gone", fzRead("🔥 Fire", fkbQs("As the night advanced, a fierce wind arose from the woods and quickly dispersed the clouds that had loitered in the heavens") + "<p>They are gone, for ever. You gather combustibles round the cottage, and when the moon sets, you fire the straw and heath and bushes. The wind fans the flames.</p>" + fkSrc("16"), "▶ Go on")),
fzHold(fkC(0, 40), 8, "Watch the cottage burn, then turn away", { r: 8 }),
fzPuzzle("🧭 Whither?", "With the world before you, where will you go?", ["Back to Ingolstadt", "To Geneva, to your creator, who owes you pity and redress", "To the village"], 1, ["He is not there.", "", "Never again."], { yes: "🧭 You travel south-west, by night, as the year turns to winter and to spring." }),
fzId("girl", fzGo("river", "In spring you come to the edge of the wood, skirted by a deep and rapid river", { r: 10 })),
fzRead("🌊 The girl", fkbQs("I was scarcely hid when a young girl came running towards the spot where I was concealed, laughing, as if she ran from someone in sport. She continued her course along the precipitous sides of the river, when suddenly her foot slipped, and she fell into the rapid stream.") + fkSrc("16"), "▶ Save her!"),
fzGo(fkC(192, -270), "Rush into the current and drag her to the shore", { r: 5 }),
fzId("shot", fzRead("💥 The reward", fkbQs("This was then the reward of my benevolence!") + "<p>A rustic tears the girl from your arms and flies. You follow; he fires. The ball enters your shoulder.</p>" + fkSrc("16"), "▶ Go on")),
fzHold("wake", 10, "For weeks you lie in the woods, trying to heal the wound", { r: 14 }),
fzTravel("🏙️ Geneva", "Two months more, and you reach the fields round Geneva. It is evening.", { sc: "geneva", x: -50, z: 420 }, "🌆 <b>The fields of Plainpalais,</b> at evening.", "▶ Go on"),
fzReadA("👦 The child", fkbQs("At this time a slight sleep relieved me from the pain of reflection, which was disturbed by the approach of a beautiful child") + "<p>He sees your face and screams. He calls you a monster, an ogre, and says his papa is M. Frankenstein, a syndic. Rage takes you, and in a moment the child lies dead at your feet.</p>" + fkSrc("16"), fkbQs("At this time a slight sleep relieved me from the pain of reflection, which was disturbed by the approach of a beautiful child") + "<p>He screams at your face, and says his papa is M. Frankenstein. Your enemy's brother. In your rage you do a terrible thing, and the boy is dead.</p>" + fkSrc("16"), "▶ Go on"),
fzRead("🖼️ The portrait", fkbQs("As I fixed my eyes on the child, I saw something glittering on his breast. I took it; it was a portrait of a most lovely woman.") + "<p>Then in a barn you find a young woman asleep (Justine), and you place the portrait in the folds of her dress, so that she will be blamed.</p>" + fkSrc("16"), "▶ Go on"),
fzPuzzle("🤝 What you ask", "Back in the hut on the mountain, at the end of your tale: what do you demand of Victor?", ["Money", "A companion: a female, as hideous as you", "That he kill himself"], 1, ["You have no use for it.", "", "No."], { yes: "🤝 " + fkQ("You must create a female for me with whom I can live in the interchange of those sympathies necessary for my being.") })
] });
fkbCh({ t: "The promise", txt: 20, start: { sc: "alps", x: 520, z: -760, ry: Math.PI }, jump: 1, tune: "ice", keep: ["oath", "The oath on the mountain", "🌄"],
state: { env: function (s) { return s < 7 ? "alpine" : "night"; }, night: function (s) { return s >= 7 && s < 10; } },
words: "The creature has finished. You are Victor again, in the hut on the mountain, and he is waiting for your answer.",
intro: "The hut on the mountain",
cast: [fkc("creature", fkwIn("alps", "hut", 1.6, -1), { ry: Math.PI * 1.3, until: "leaves" })],
steps: [
{ k: "read" },
fzGo(fkwIn("alps", "hut", -0.6, 0.6), "In the hut, by his fire", { r: 2.5 }),
fzTalk("The creature", "He waits for your answer", ["❌ I do refuse it", fkbQs("I do refuse it,", "and no torture shall ever extort a consent from me.", "You are in the wrong,", "and instead of threatening, I am content to reason with you. I am malicious because I am miserable.") + fkSrc("17"), "▶ Go on"]),
fzPuzzle("⚖️ His argument", "What does he say would make him good again?", ["Gold", "The love of another: a companion", "Fame"], 1, ["No.", "", "No."], { yes: "⚖️ " + fkQ("If you consent, neither you nor any other human being shall ever see us again; I will go to the vast wilds of South America.") }),
fzTalk("The creature", "He promises", ["🌄 By the sun", fkbQs("I consent to your demand, on your solemn oath to quit Europe for ever", "I swear,", "by the sun, and by the blue sky of heaven, and by the fire of love that burns my heart") + fkSrc("17"), "▶ Go on"]),
fzId("leaves", fzRead("🦅 He goes", fkbQs("Saying this, he suddenly quitted me, fearful, perhaps, of any change in my sentiments. I saw him descend the mountain with greater speed than the flight of an eagle") + fkSrc("17"), "▶ Go on")),
fzGo("opposite", "The sun is setting. Start down: back across the ice", { r: 16 }),
fzGo("montanvert", "Cross the glacier in the dark, to Montanvert", { r: 14 }),
fzHold("montanvert", 8, "Rest a while among the pines, under the eternal twinkling of the stars", { r: 10 }),
fzGo("chamounix", "Morning dawns before you reach Chamounix", { r: 10 }),
fzTravel("🏡 Home", "You take no rest, but go straight back to Geneva.", { sc: "geneva", x: 404, z: -8, ry: 0 }, "🏡 <b>Belrive.</b>", "▶ To Geneva")
] });
function fkR(x, z, y) { return { sc: "rhine", x: x, z: z, y: y }; }
function fkO(x, z) { return { sc: "orkney", x: x, z: z }; }
function fkIr(x, z) { return { sc: "ireland", x: x, z: z }; }
fkbCh({ t: "Down the Rhine", txt: 21, start: { sc: "geneva", x: 404, z: -8, ry: 0 }, jump: 1, tune: "lake", keep: ["rhine", "Clerval on the Rhine", "🍇"],
state: { env: function (s) { return s < 7 ? "lake" : "autumn"; }, sail: function (s) { return s >= 10; } },
words: "Weeks pass at home, and you cannot bring yourself to begin the work again. Your father thinks it is your old grief, and speaks to you of marrying Elizabeth.",
intro: "Belrive",
cast: [fkc("alphonse", fkG(396, -6), { ry: Math.PI, until: "go" }), fkc("elizabeth", fkG(390, -60), { ry: Math.PI, until: "go" }), fkc("clerval", fkR(29.8, 415.2, 0.65), { from: "rh", ry: Math.PI })],
steps: [
{ k: "read" },
fzRead("🛶 Day after day", fkbQs("Day after day, week after week, passed away on my return to Geneva; and I could not collect the courage to recommence my work.") + fkSrc("18"), "▶ Go on"),
fzHold(fkG(400, -90), 10, "Take the boat out alone on the lake, for whole days", { r: 20 }),
fzTalk("Alphonse Frankenstein", "Your father calls you aside", ["💍 Elizabeth", fkbQs("I confess, my son, that I have always looked forward to your marriage with our dear Elizabeth as the tie of our domestic comfort and the stay of my declining years.", "My dear father, reassure yourself. I love my cousin tenderly and sincerely.") + fkSrc("18"), "▶ Go on"]),
fzPuzzle("⏳ Not yet", "Why can you not marry Elizabeth at once?", ["You do not love her", "You must first keep your promise to the creature, or he will harm them all", "Your father forbids it"], 1, ["You do.", "", "He wishes it."], { yes: "⏳ And you need knowledge from English philosophers for the work. You ask to visit England first." }),
fzTalk("Elizabeth", "Elizabeth, at the landing", ["💛 Go, and come back", "She grieves to see you go, but hides it. Henry Clerval will meet you at Strasburgh, and go with you. It is your father's doing, and you are glad and sorry." + fkSrc("18"), "▶ Go on"]),
fzPuzzle("📦 Your luggage", "Before you leave, what do you pack?", ["Your books of poetry", "Your chemical instruments, for the work", "Nothing at all"], 1, ["Not those.", "", "You must."], { yes: "📦 It is the end of September. You leave home again." }),
fzId("go", fzTravel("🚣 Strasburgh", "You meet Henry at Strasburgh, and you hire a boat to go down the Rhine to Rotterdam, then to London by sea.", { sc: "rhine", x: 29.8, z: 418.8, y: 0.65, ry: Math.PI }, "🚣 <b>The Rhine,</b> below Strasburgh, at the time of the vintage.", "▶ To Strasburgh")),
fzId("rh", fzTalk("Henry Clerval", "Henry, in the boat, alive with the beauty of it", ["🍇 Clerval", fkbQs("We travelled at the time of the vintage and heard the song of the labourers as we glided down the stream.") + "<p>\"Look, Victor! The vines! The castles on the crags! I have seen the mountains of your country, but this, this is like nothing on earth.\"</p>" + fkSrc("18"), "▶ Go on"])),
fzHold(fkR(29.8, 416), 20, "Stay in the boat as it goes down the river, past the vineyards and the ruined castles", { r: 8, tick: function () { } }),
fzRead("🌲 Clerval!", fkbQs("Clerval! Beloved friend! Even now it delights me to record your words and to dwell on the praise of which you are so eminently deserving.") + fkSrc("18"), "▶ Go ashore"),
fzGo("rbank", "Go ashore at a little town", { r: 10 }),
fzGo(fkwIn("rhine", "rinn", 0, 1.6), "Go into the inn for the night", { r: 3 }),
fzGo("castle", "In the morning, climb up to the ruined castle on its crag", { r: 14 }),
fzHold("castle", 10, "Look down the river from the ruins, with Henry", { r: 14 }),
fzGo("vines", "Walk back through the vineyards", { r: 10 }),
fzRead("🗼 London", fkbQs("At length we saw the numerous steeples of London, St. Paul's towering above all, and the Tower famed in English history.") + fkSrc("18"), "▶ Go on")
] });
fkbCh({ t: "The island", txt: 22, start: { sc: "orkney", x: 120, z: 10, ry: -Math.PI / 2 }, jump: 1, tune: "night", keep: ["orkney", "The hut on the island", "🏝️"], state: { env: "grey" },
words: "London, then the long road north with Henry. In Scotland you leave him, and go alone to one of the remotest of the Orkneys.",
intro: "The road north",
cast: [],
steps: [
{ k: "read" },
fzRead("🏙️ London", fkbQs("London was our present point of rest; we determined to remain several months in this wonderful and celebrated city.") + fkSrc("19"), "▶ Go on"),
fzPuzzle("🏛️ Oxford", "At Oxford, whose memory fills your mind?", ["Charles I, who collected his forces there, and Hampden who fell for his country", "Shakespeare", "King Alfred"], 0, ["", "Not there.", "Not there."], { yes: "🏛️ You think: \"I am a blasted tree; the bolt has entered my soul.\"" }),
fzPuzzle("⛰️ Cumberland", "The lakes of Cumberland and Westmorland remind you of what?", ["Ingolstadt", "The mountains of Switzerland", "London"], 1, ["No.", "", "No."], { yes: "⛰️ Henry loves them. But your promise drives you on." }),
fzPuzzle("👋 Perth", "At Perth you leave Henry. Why?", ["You have quarrelled", "You must do the work alone, somewhere remote", "He wants to stay in Edinburgh"], 1, ["Never.", "", "No."], { yes: "👋 He entreats you to write often." }),
fzTravel("🌊 The Orkneys", "You cross the northern highlands and take a boat to one of the remotest of the Orkneys.", { sc: "orkney", x: 120, z: 10, ry: -Math.PI / 2 }, "🌊 <b>An island of the Orkneys.</b> Bare rock, thin grass, the grey sea.", "▶ Cross"),
fzRead("🏝️ Hardly more than a rock", fkbQs("On the whole island there were but three miserable huts, and one of these was vacant when I arrived. This I hired.") + fkSrc("19"), "▶ Go on"),
fzGo("ohuts", "Go up to the three huts", { r: 10 }),
fzGo("olab", "Go to the vacant hut, the one you have hired", { r: 3 }),
fzGo(fkwIn("orkney", "olab2", 0, 1.2), "Go into the inner room, and set up your instruments", { r: 2.5 }),
fzGather("jar", fkwIn("orkney", "olab2", -1, -1.6), 4, "An instrument", "Unpack the chemical instruments onto the bench", { spread: 1.2 }),
fzHold(fkwIn("orkney", "olab2", -0.4, 0.2), 14, "Work in the mornings: the work is horrible to you now", { r: 2.5 }),
fzGo("oshore", "In the evenings, walk on the stony beach of the sea, to listen to the waves", { r: 10 }),
fzHold("oshore", 10, "Walk the shore, and dread what you are making", { r: 12 }),
fzPuzzle("🌊 Fear", "What makes this work worse than the first time?", ["The cold", "Your eyes are open now: you know what you are doing", "No one helps you"], 1, ["Not that.", "", "You never wanted help."], { yes: "🌊 " + fkQ("In the mean time I worked on, and my labour was already considerably advanced.") })
] });
fkbCh({ t: "Your wedding-night", txt: 23, start: { sc: "orkney", x: -372, z: 401.6, y: FKW_RY, ry: 0 }, jump: 1, tune: "dread", keep: ["vow", "\"I shall be with you on your wedding-night\"", "🌙"],
state: { env: function (s) { return s < 12 ? "moon" : "grey"; }, night: function (s) { return s < 12; }, orkFace: function (s) { return s === 2 || s === 3; }, torn: function (s) { return s >= 4; }, orkBoat: function (s) { return s >= 6 && s < 10; } },
words: "One evening in your laboratory, the sun set and the moon just rising from the sea, you stop work and think.",
intro: "The laboratory, moonrise",
cast: [fkc("creature", fkwIn("orkney", "olab", 0.8, -0.4), { from: "come", until: "go", ry: Math.PI }),
fkc("ire1", fkIr(-6, -40), { key: "ir1", name: "A man with a hoarse voice", dress: "fkwork", persona: "townfolk", from: "irish", ry: Math.PI, greet: "You will know that soon enough. Maybe you are come to a place that will not prove much to your taste." })],
steps: [
{ k: "read" },
fzRead("⚖️ A race of devils", fkbQs("I sat one evening in my laboratory; the sun had set, and the moon was just rising from the sea") + "<p>Three years ago you made a fiend. Now you make another, perhaps ten thousand times more malignant. She might not keep his promise; they might have children: a race of devils on the earth.</p>" + fkSrc("20"), "▶ Look up"),
fzRead("🪟 At the casement", fkbQs("I trembled and my heart failed within me, when, on looking up, I saw by the light of the moon the dæmon at the casement.") + fkSrc("20"), "▶ Go on"),
fzPuzzle("💥 What do you do?", "He grins at you through the window. What do you do?", ["Finish the work quickly", "Tear to pieces the thing on which you are engaged", "Run"], 1, ["Never.", "", "Not from this."], { yes: "💥 He sees you destroy the creature on whose future existence he depended for happiness. He withdraws with a howl of devilish despair." }),
fzGo(fkwIn("orkney", "olab", 0, 1.2), "Lock the laboratory, and go into the first room. Watch from the window", { r: 2.5 }),
fzId("come", fzHold(fkwIn("orkney", "olab", -1.6, 0.6), 8, "Wait. Hours pass. You hear a boat at the shore", { r: 2.5 })),
fzTalk("The creature", "The door opens. He is here", ["😠 Do you dare?", fkbQs("You have destroyed the work which you began; what is it that you intend? Do you dare to break your promise?", "Begone! I do break my promise; never will I create another like yourself, equal in deformity and wickedness.") + fkSrc("20"), "▶ Go on"]),
fzTalk("The creature", "He threatens you", ["🌙 Remember", fkbQs("Slave, I before reasoned with you, but you have proved yourself unworthy of my condescension. Remember that I have power", "It is well. I go; but remember, I shall be with you on your wedding-night.") + fkSrc("20"), "▶ Go on"]),
fzId("go", fzPuzzle("🌙 Your wedding-night", "What do you believe he means by it?", ["That he will kill you, on your wedding-night", "That he will come to the wedding as a guest", "Nothing"], 0, ["", "No.", "He means something."], { yes: "🌙 You think it is your own death he means. You do not think of Elizabeth." })),
fzGo("oshore", "The sun rises. Walk on the shore. A boat has brought a letter from Henry", { r: 10 }),
fzRead("✉️ Henry's letter", "<p>Henry writes from Perth: come and join me; we will go south together. You must leave the island.</p>", "▶ Go on"),
fzGather("chain", fkwIn("orkney", "olab2", -0.6, 0.6), 3, "The remains of the half-finished creature", "Pack the remains of your work into a basket, with heavy stones", { spread: 1.2 }),
fzGo("oshore", "Between two and three in the morning, with the moon up, carry the basket down to a little skiff", { r: 10 }),
fzRead("🌊 Into the sea", fkbQs("Between two and three in the morning the moon rose; and I then, putting my basket aboard a little skiff, sailed out about four miles from the shore.") + "<p>You cast the basket into the sea, and lie down in the boat. You sleep, and wake to find the wind has carried you far out on a wild sea.</p>" + fkSrc("20"), "▶ Drift"),
fzId("irish", fzTravel("⛵ Land", "At evening you see land, and steer towards a little town and a good harbour.", { sc: "ireland", x: 0, z: -52, ry: 0 }, "⛵ <b>A harbour,</b> on an unknown coast.", "▶ Make for the harbour")),
fzTalk("A man with a hoarse voice", "People crowd to the boat. Ask the name of the town", ["😠 The custom of the Irish", fkbQs("You will know that soon enough,", "Maybe you are come to a place that will not prove much to your taste", "I do not know,", "what the custom of the English may be, but it is the custom of the Irish to hate villains.") + "<p>You must come to Mr. Kirwin, the magistrate, and give an account of the death of a gentleman who was found murdered here last night.</p>" + fkSrc("20"), "▶ Go on"]),
fzGo("kirwin", "Follow them to Mr. Kirwin's house", { r: 3 })
] });
fkbCh({ t: "Clerval", txt: 24, start: { sc: "ireland", x: -300, z: 302.6, y: FKW_RY, ry: 0 }, jump: 1, tune: "grief", keep: ["clerval", "Henry Clerval", "🕯️"], state: { env: "grey", bierGone: function (s) { return s >= 8; } },
words: "Mr. Kirwin's room. You are accused of a murder; you are innocent, and calm.",
intro: "The magistrate's room",
cast: [fkc("kirwin", fkwIn("ireland", "kirwin", 0, -2.6), { ry: 0 }), fkc("nugent", fkwIn("ireland", "kirwin", -1.8, 1.2), { key: "nug", name: "Daniel Nugent, fisherman", dress: "fkwork", persona: "townfolk", ry: Math.PI, greet: "I saw a boat with a man in it, sir." }),
fkc("nurse", fkwIn("ireland", "icell", 1.2, 0.4), { key: "nurse", name: "An old nurse", dress: "fkmaid", sex: "f", persona: "You are a hired nurse in an Irish prison in Frankenstein (the book only), blunt and unfeeling.", from: "prison", greet: "Are you better now, sir?" }),
fkc("kirwin", fkwIn("ireland", "icell", -1, 1), { key: "k2", from: "kw", ry: Math.PI }), fkc("alphonse", fkwIn("ireland", "icell", 0.4, 1.4), { from: "father", ry: Math.PI })],
steps: [
{ k: "read" },
fzTalk("Mr. Kirwin", "Mr. Kirwin, an old benevolent man, hears the witnesses", ["⚖️ The witnesses", "Fishermen found a young man on the beach the night before, strangled: there was no sign of violence except the black mark of fingers on his neck. You think of William, and your limbs tremble.", "▶ Go on"]),
fzTalk("Daniel Nugent, fisherman", "Daniel Nugent swears to what he saw", ["🛶 A boat", fkbQs("The son confirmed his father's account, but when Daniel Nugent was called he swore positively that just before the fall of his companion, he saw a boat, with a single man in it, at a short distance from the shore") + fkSrc("21"), "▶ Go on"]),
fzPuzzle("🌬️ The wind", "Several men testify about your landing. What do they agree on?", ["You landed by daylight", "With the strong north wind, you had probably beaten about for hours and been forced back near where you set out", "You came from Scotland that day"], 1, ["No.", "", "They think otherwise."], { yes: "🌬️ Mr. Kirwin decides you should be shown the body, to see what effect it has on you." }),
fzGo("iinn", "Go with them to the inn, where the body lies", { r: 3 }),
fzGo(fkwIn("ireland", "iinn", 3.4, 0.6), "Go up to the coffin", { r: 2.5 }),
fzReadA("💀 Henry", fkbQs("I entered the room where the corpse lay and was led up to the coffin. How can I describe my sensations on beholding it?") + "<p>It is Henry Clerval, lifeless, the black marks on his neck. \"Have my murderous machinations deprived you also, my dearest Henry, of life?\"</p>" + fkSrc("21"), fkbQs("I entered the room where the corpse lay and was led up to the coffin. How can I describe my sensations on beholding it?") + "<p>It is Henry Clerval. Your dearest friend is dead.</p>" + fkSrc("21"), "▶ Go on"),
fzId("prison", fzTravel("🔒 Fever", "You are carried out in convulsions. A fever holds you for two months on the point of death; you wake in a prison.", fkwIn("ireland", "icell", -1.4, -0.4), "🔒 <b>A prison cell.</b>", "▶ Wake")),
fzTalk("An old nurse", "An old woman sleeps in the chair beside you; she wakes", ["🧓 Are you better now, sir?", fkbQs("Are you better now, sir?", "For that matter,", "if you mean about the gentleman you murdered, I believe that it were better for you if you were dead") + fkSrc("21"), "▶ Go on"]),
fzHold(fkwIn("ireland", "icell", -1.4, -0.4), 10, "Lie on your wretched bed and slowly mend", { r: 2.5 }),
fzId("kw", fzTalk("Mr. Kirwin", "Mr. Kirwin comes to see you", ["🤝 A friend has come", fkbQs("Your family is perfectly well,", "and someone, a friend, is come to visit you.", "Oh! Take him away! I cannot see him; for God's sake, do not let him enter!") + fkSrc("21"), "▶ Go on"])),
fzId("father", fzTalk("Alphonse Frankenstein", "It is your father", ["🤍 My father!", fkbQs("My father!", "Is my father indeed come? How kind, how very kind! But where is he, why does he not hasten to me?") + fkSrc("21"), "▶ Go on"])),
fzPuzzle("⚖️ The assizes", "You have been three months in prison. At the assizes, what does the grand jury find?", ["You are guilty", "You were on the Orkney islands at the hour the body was found, and are freed", "Nothing yet"], 1, ["No.", "", "They decide."], { yes: "⚖️ Mr. Kirwin has gathered witnesses for you. You are free, and you hurry to leave Ireland." }),
fzGo("iquay", "Go down to the quay with your father, to take ship", { r: 8 }),
fzRead("🌙 Laudanum", fkbQs("Ever since my recovery from the fever, I had been in the custom of taking every night a small quantity of laudanum, for it was by means of this drug only that I was enabled to gain the rest necessary for the preservation of life.") + fkSrc("21"), "▶ Sail")
] });
function fkEv(x, z) { return { sc: "evian", x: x, z: z }; }
function fkCh(x, z) { return { sc: "chase", x: x, z: z }; }
fkbCh({ t: "The wedding", txt: 25, start: { sc: "geneva", x: -167, z: 24, ry: Math.PI }, jump: 1, tune: "lake", keep: ["ring", "Elizabeth's ring", "💍"],
state: { env: function (s) { return s < 14 ? "lake" : "evening"; } },
words: "You land, and go to Paris with your father, to rest before the journey home. You shrink from people: the blood of William, Justine and Henry is on your hands.",
intro: "Paris, then home",
cast: [fkc("alphonse", fkwIn("geneva", "fhouse", 1.6, -1), { ry: -0.8, until: "wed" }), fkc("elizabeth", fkwIn("geneva", "fhouse", -1, -1.6), { ry: Math.PI, until: "wed" }), fkc("ernest", fkwIn("geneva", "fhouse", -2.6, 0.6), { ry: Math.PI / 2, until: "wed" }),
fkc("alphonse", fkG(-260, 80), { key: "a2", from: "wed", until: "boat", ry: 0 }), fkc("elizabeth", fkG(-262, 82), { key: "e2", from: "wed", until: "boat", ry: 0 }), fkc("ernest", fkG(-266, 80), { key: "er2", from: "wed", until: "boat", ry: 0 }),
fkc("elizabeth", { sc: "evian", x: 1.4, z: -40 }, { key: "e3", from: "boat", ry: Math.PI })],
steps: [
{ k: "read" },
fzRead("🗼 Paris", fkbQs("I am not mad,", "the sun and the heavens, who have viewed my operations, can bear witness of my truth. I am the assassin of those most innocent victims; they died by my machinations.") + "<p>Your father thinks your mind is wandering, and changes the subject.</p>" + fkSrc("22"), "▶ Go on"),
fzRead("✉️ Elizabeth's letter", fkbQs("You well know, Victor, that our union had been the favourite plan of your parents ever since our infancy.") + "<p>She asks: do you love another? If so, she will not hold you to it. Do not answer until you come, if it gives you pain.</p>" + fkSrc("22"), "▶ Go on"),
fzPuzzle("🌙 The threat", "Her letter brings back what you had forgotten. What?", ["The creature's words: \"I will be with you on your wedding-night!\"", "A debt in Ingolstadt", "Henry's letter"], 0, ["", "No.", "No."], { yes: "🌙 Very well. If he means to kill you then, so be it: you will fight him, and one of you will die." }),
fzTravel("🏠 Geneva", "In about a week you are home.", { sc: "geneva", x: -167, z: 24, ry: Math.PI }, "🏠 <b>Geneva.</b> Home.", "▶ Home"),
fzGo(fkwIn("geneva", "fhouse", 0, 1.6), "Go into the house", { r: 3 }),
fzTalk("Elizabeth", "Elizabeth welcomes you, with tears in her eyes", ["💛 Elizabeth", "She is thinner, and has lost much of her heavenly vivacity. But her gentleness makes her the fittest companion for one so ruined as you." + fkSrc("22"), "▶ Go on"]),
fzTalk("Alphonse Frankenstein", "Your father speaks of your marriage", ["💍 The day", fkbQs("Have you, then, some other attachment?", "None on earth. I love Elizabeth and look forward to our union with delight. Let the day therefore be fixed; and on it I will consecrate myself, in life or death, to the happiness of my cousin.") + fkSrc("22"), "▶ Go on"]),
fzPuzzle("🔫 Precautions", "How do you guard yourself, now the day is fixed?", ["You carry pistols and a dagger constantly, and watch for any trick", "You tell Elizabeth everything", "You lock yourself in"], 0, ["", "You mean to tell her the day after the wedding.", "No."], { yes: "🔫 You promise Elizabeth to tell her your dreadful secret the day after you are married." }),
fzFind("pistol", fkwIn("geneva", "fhouse", 2.2, -2.2), "Your pistols", "Take your pistols from the drawer"),
fzGo("cathedral", "On the day, go to the cathedral", { r: 6 }),
fzId("wed", fzHold("cathedral", 14, "Stand at the door with Elizabeth while the ceremony is performed", { r: 8 })),
fzRead("⛵ The voyage", fkbQs("After the ceremony was performed a large party assembled at my father's, but it was agreed that Elizabeth and I should commence our journey by water, sleeping that night at Evian and continuing our voyage on the following day.") + fkSrc("22"), "▶ Go on"),
fzGo("shore", "Go down to the lake shore, to the boat", { r: 10 }),
fzId("boat", fzTravel("⛵ The lake", "You sail east along the lake, Elizabeth beside you.", { sc: "evian", x: 0, z: -40, ry: 0 }, "⛵ <b>Évian,</b> at sunset.", "▶ Sail")),
fzTalk("Elizabeth", "Elizabeth, in the boat", ["☀️ What a divine day!", fkbQs("Be happy, my dear Victor,", "there is, I hope, nothing to distress you", "What a divine day! How happy and serene all nature appears!") + fkSrc("22"), "▶ Go on"]),
fzRead("⛰️ The Drance", fkbQs("The sun sank lower in the heavens; we passed the river Drance and observed its path through the chasms of the higher and the glens of the lower hills.", "The spire of Evian shone under the woods that surrounded it") + fkSrc("22"), "▶ Land")
] });
fkbCh({ t: "The wedding-night", txt: 26, start: { sc: "evian", x: 0, z: -40, ry: 0 }, jump: 1, tune: "dread", keep: ["vow2", "The night at Évian", "🕯️"],
state: { env: function (s) { return s < 14 ? "storm" : "grey"; }, night: function (s) { return s < 14; }, evFace: function (s) { return s === 9; } },
words: "Évian. You land at eight o'clock, walk a little on the shore, and go to the inn.",
intro: "Évian, eight o'clock",
cast: [fkc("elizabeth", fkEv(1.4, -38), { until: "inn", ry: Math.PI }), fkc("elizabeth", fkwIn("evian", "einn", 1.2, -1), { key: "e1", from: "inn", until: "bed", ry: Math.PI }),
fkc("elizabeth", fkwIn("evian", "eroom", -1.4, -1.4), { key: "e2", from: "scream", until: "geneva", lie: true, mute: true }),
fkc("ernest", fkwIn("geneva", "fhouse", -1, -1.6), { from: "geneva", ry: Math.PI, greet: "Victor..." }),
fkc("alphonse", fkwIn("geneva", "fhouse", -1.8, -2.6), { key: "a3", from: "geneva", until: "dies", lie: true, greet: "My son..." }),
fkc("magistrate", fkwIn("geneva", "court", 0, -6.2), { key: "mag", name: "A criminal judge of the town", dress: "fkblack", persona: "You are a magistrate of Geneva in the 1790s, in Mary Shelley's Frankenstein (the book only): kind, cautious, and unable to believe a tale of a monster.", from: "mag", greet: "Be assured, sir, no pains shall be spared." })],
steps: [
{ k: "read" },
fzHold("eshore", 8, "Walk on the shore in the last of the light", { r: 12 }),
fzRead("🌬️ The storm", fkbQs("It was eight o'clock when we landed; we walked for a short time on the shore, enjoying the transitory light, and then retired to the inn") + "<p>The wind rises with great violence in the west; the moon is hidden; rain begins to fall.</p>" + fkSrc("23"), "▶ Go in"),
fzId("inn", fzGo("einn", "Go into the inn", { r: 3 })),
fzTalk("Elizabeth", "Elizabeth watches your agitation in fearful silence", ["😟 What is it?", fkbQs("Oh! Peace, peace, my love,", "this night, and all will be safe; but this night is dreadful, very dreadful.") + "<p>You beg her to go to bed; you will not join her until you know where your enemy is.</p>" + fkSrc("23"), "▶ Go on"]),
fzId("bed", fzGo(fkwIn("evian", "epass", -3.6, 1.2), "Take a pistol, and go up to the passages of the house", { r: 2.5 })),
fzHold(fkwIn("evian", "epass", 0, 0), 12, "Walk up and down the passages, searching every corner where he could hide", { r: 6 }),
fzId("scream", fzRead("😱 A scream", fkbQs("suddenly I heard a shrill and dreadful scream. It came from the room into which Elizabeth had retired.") + fkSrc("23"), "▶ Run!")),
fzGo(fkwIn("evian", "eroom", 0, 1.8), "Rush into the room", { r: 2.5 }),
fzReadA("💔 Elizabeth", fkbQs("Great God! Why did I not then expire! Why am I here to relate the destruction of the best hope and the purest creature on earth? She was there, lifeless and inanimate, thrown across the bed") + fkSrc("23"), fkbQs("Great God! Why did I not then expire! Why am I here to relate the destruction of the best hope and the purest creature on earth?") + "<p>Elizabeth is dead. The creature has kept his word.</p>" + fkSrc("23"), "▶ Look up"),
fzRead("🪟 At the open window", fkbQs("The shutters had been thrown back, and with a sensation of horror not to be described, I saw at the open window a figure the most hideous and abhorred. A grin was on the face of the monster") + fkSrc("23"), "▶ Fire!"),
fzPuzzle("🔫 Fire", "He jeers at you, pointing at her body. You draw your pistol and fire. What does he do?", ["He falls dead", "He eludes you, leaps from the window and plunges into the lake", "He surrenders"], 1, ["No.", "", "Never."], { yes: "🔫 The report of the pistol brings a crowd into the room." }),
fzGo("eshore", "Lead them down to the shore, where he went into the water", { r: 12 }),
fzHold("eshore", 12, "Search with the boats. Nets are cast, but in vain", { r: 16 }),
fzRead("🌧️ Home by the lake", fkbQs("I arrived at Geneva. My father and Ernest yet lived, but the former sunk under the tidings that I bore.") + fkSrc("23"), "▶ Go on"),
fzId("geneva", fzTravel("🏠 Geneva", "There are no horses; you must go back by the lake, in torrents of rain.", fkwIn("geneva", "fhouse", 0, 1.6), "🏠 <b>Your father's house.</b>", "▶ Row home")),
fzId("dies", fzReadA("🕯️ Your father", fkbQs("He could not live under the horrors that were accumulated around him; the springs of existence suddenly gave way; he was unable to rise from his bed, and in a few days he died in my arms.") + fkSrc("23"), fkbQs("He could not live under the horrors that were accumulated around him") + "<p>In a few days your father dies.</p>" + fkSrc("23"), "▶ Go on")),
fzRead("⛓️ A solitary cell", fkbQs("For they had called me mad, and during many months, as I understood, a solitary cell had been my habitation.") + fkSrc("23"), "▶ Go on"),
fzGo("court", "Freed at last, go to a criminal judge in the town", { r: 4 }),
fzId("mag", fzGo(fkwIn("geneva", "court", 0, -3), "Go in to the magistrate", { r: 2.5 })),
fzTalk("A criminal judge of the town", "Tell him everything, and ask him to seize the creature", ["⚖️ The magistrate", fkbQs("Be assured, sir,", "no pains or exertions on my part shall be spared to discover the villain.") + "<p>But when you have told your tale, he does not believe that any man could follow such a being across the ice and mountains.</p>" + fkSrc("23"), "▶ Go on"]),
fzPuzzle("🔥 Then I will", "He will do what he can, but he cannot pursue the creature. What do you resolve?", ["To go home and rest", "To pursue him yourself, and devote your life to his destruction", "To leave it to God"], 1, ["Never again.", "", "Not now."], { yes: "🔥 " + fkQ("Man,") + " you cry, " + fkQ("how ignorant art thou in thy pride of wisdom! Cease; you know not what it is you say.") })
] });
fkbCh({ t: "The everlasting ices", txt: 27, start: { sc: "geneva", x: -262, z: 96, ry: Math.PI }, jump: 1, tune: "ice", keep: ["end", "The ice raft", "🌊"],
state: { env: function (s) { return s < 5 ? "moon" : s < 17 ? "snow" : s < 23 ? "icenight" : "ice"; }, night: function (s) { return s < 5 || (s >= 17 && s < 23); }, lead: function (s) { return s >= 26; } },
words: "You leave Geneva for ever, with a sum of money and a few jewels that were your mother's. Before you go, you go at night to the cemetery where William, Elizabeth and your father lie.",
intro: "The graves, at night",
cast: [fkc("peasant", fkwIn("chase", "chut", 1.2, -1), { key: "cpeas", name: "A Russian peasant", dress: "fkpeasant", persona: "townfolk", ry: Math.PI, greet: "A giant? Yes. He took our food. He went north." }),
fkc("peasant", fkwIn("chase", "izba1", 1.4, -1.2), { key: "csell", name: "A man of the hamlet by the sea", dress: "fkpeasant", persona: "townfolk", ry: Math.PI, greet: "He fled across the sea of ice, sir, with our winter store. He will die there." }),
fkc("master", fkA(0.6, -9, FKD), { key: "mast", from: "walton", ry: Math.PI }),
fkc("sailor", fkA(-1.2, 9, FKD), { key: "dep1", name: "The leader of the sailors", dress: "fksailor", persona: "sailor", from: "mutiny", until: "lead", ry: 0, greet: "We ask a promise of you, Captain." }),
fkc("sailor", fkA(0.6, 9.4, FKD), { key: "dep2", name: "A sailor", dress: "fksailor", persona: "sailor", from: "mutiny", until: "lead", ry: 0, greet: "South, sir. If she's freed, south." }),
fkc("victor2", fkA(-1.6, 11.4, FKD), { key: "vbed", from: "walton", lie: true, greet: "Do you, then, really return?" }),
fkc("creature", fkA(-0.6, 11.2, FKD), { key: "cend", from: "midnight", until: "leap", ry: Math.PI / 2 })],
steps: [
{ k: "read" },
fzGo("cathedral", "Go to the graves, in the churchyard of the cathedral", { r: 8 }),
fzHold("cathedral", 10, "Kneel on the grass and kiss the earth", { r: 8 }),
fzRead("🌙 The vow", "<p>By the sacred earth on which you kneel, by the shades that wander near you, by the deep and eternal grief that you feel, you swear to pursue the dæmon until he or you shall perish.</p>" + fkSrc("24"), "▶ Go on"),
fzRead("😈 A laugh", fkbQs("I was answered through the stillness of night by a loud and fiendish laugh.", "I am satisfied, miserable wretch! You have determined to live, and I am satisfied.") + fkSrc("24"), "▶ Follow"),
fzTravel("❄️ The pursuit", "For many months you follow him: down the Rhone, along the Mediterranean, aboard a ship into the Black Sea, through the wilds of Tartary and Russia.", { sc: "chase", x: 0, z: 300, ry: Math.PI }, "❄️ <b>The plains of Russia,</b> under snow.", "▶ On"),
fzGo("chut", "Ask at a peasant's hut whether a giant has passed", { r: 4 }),
fzGo(fkwIn("chase", "chut", 0, 1.4), "Go in", { r: 2.5 }),
fzTalk("A Russian peasant", "The peasant has seen him", ["🧭 He went north", "\"A giant? Yes. He took our food. He went north.\" Sometimes the peasants, scared by this horrid apparition, tell you of his path." + fkSrc("24"), "▶ Go on"]),
fzGo("cmark1", "Follow the track to a tree. Words are cut in the bark", { r: 6 }),
fzRead("🌲 My reign is not yet over", fkbQs("My reign is not yet over", "you live, and my power is complete. Follow me; I seek the everlasting ices of the north, where you will feel the misery of cold and frost, to which I am impassive.") + fkSrc("24"), "▶ Follow"),
fzGo("cmark2", "Words cut in a stone", { r: 6 }),
fzRead("🪨 Prepare!", fkbQs("Prepare! Your toils only begin; wrap yourself in furs and provide food, for we shall soon enter upon a journey where your sufferings will satisfy my everlasting hatred.") + fkSrc("24"), "▶ Go on"),
fzGo("cmark3", "Food left on the snow for you", { r: 6 }),
fzGather("bread", "cmark3", 3, "Food he has left you", "Take the food; you must live, to follow", { spread: 5 }),
fzGo("cvillage", "Reach the hamlet on the shore of the sea", { r: 10 }),
fzGo(fkwIn("chase", "izba1", 0, 1.4), "Go into a cottage, and ask after him", { r: 2.5 }),
fzTalk("A man of the hamlet by the sea", "The villagers tell you", ["🌊 Across the sea of ice", "A gigantic monster came the night before, armed with a gun and many pistols. He carried off their winter store, put it on a sledge, and drove away across the sea in a direction that led to no land." + fkSrc("24"), "▶ Go on"]),
fzPuzzle("🛷 A sledge", "How will you follow him across the Frozen Ocean?", ["On foot", "Exchange your land-sledge for one fashioned for the ice, and buy provisions", "Wait for summer"], 1, ["You would die.", "", "He will be gone."], { yes: "🛷 " + fkQ("I exchanged my land-sledge for one fashioned for the inequalities of the Frozen Ocean, and purchasing a plentiful stock of provisions, I departed from land.") }),
fzGo("cshore", "Go down to the edge of the frozen sea, to the sledge", { r: 8 }),
fzHold("csea", 16, "Drive the dogs out across the frozen sea, for weeks", { r: 30 }),
fzRead("🧊 The ice breaks", "<p>You see him at last, a dark speck on the ice, less than a mile off. Then the sea roars beneath you like thunder; the ice splits; you are left drifting on a scattered piece of it. Then a ship, riding at anchor.</p>" + fkSrc("24"), "▶ Go on"),
fzId("walton", fzTravel("✍️ Walton, in continuation", "Walton writes to his sister, Margaret. You are Walton again, and the strange guest in your cabin has told you his whole story.", { sc: "arctic", x: 1.6, z: 11.6, y: FKD, ry: Math.PI }, "✍️ <b>Walton's cabin.</b> August 26th.", "▶ Go on")),
fzTalk("Victor Frankenstein", "Your guest, on his bed", ["⚠️ Are you mad?", "He has corrected and added to your notes of his story himself. When you ask how he made the creature, he says: \"Are you mad, my friend? Would you also create for yourself and the world a demoniacal enemy?\"" + fkSrc("24"), "▶ Go on"]),
fzId("mutiny", fzRead("⚓ September 5th", fkbQs("I was roused by half a dozen of the sailors, who demanded admission into the cabin.", "They insisted, therefore, that I should engage with a solemn promise that if the vessel should be freed I would instantly direct my course southwards.") + fkSrc("24"), "▶ Go on")),
fzTalk("Victor Frankenstein", "Victor raises himself to speak to the sailors", ["🔥 Did you not call this a glorious expedition?", fkbQs("What do you mean? What do you demand of your captain? Are you, then, so easily turned from your design? Did you not call this a glorious expedition?", "Not because the way was smooth and placid as a southern sea, but because it was full of dangers and terror") + fkSrc("24"), "▶ Go on"]),
fzPuzzle("🧭 September 7th", "The sailors will not go on. What do you do?", ["Force them north", "Consent to turn for home, if the ship is freed", "Leave the ship and go on alone"], 1, ["They would mutiny.", "", "You cannot."], { yes: "🧭 The die is cast. You come back ignorant and disappointed." }),
fzId("lead", fzRead("🧊 September 9th", fkbQs("September 9th, the ice began to move, and roarings like thunder were heard at a distance as the islands split and cracked in every direction.", "on the 11th the passage towards the south became perfectly free.") + fkSrc("24"), "▶ Go on")),
fzGo("rail", "Go on deck. Look at the lane of open water opening to the south", { r: 3 }),
fzGo("berth", "Go back to his bed", { r: 2 }),
fzTalk("Victor Frankenstein", "He is dying", ["🕯️ Do you, then, really return?", fkbQs("Do you, then, really return?", "Alas! Yes; I cannot withstand their demands. I cannot lead them unwillingly to danger, and I must return.", "Do so, if you will; but I will not. You may give up your purpose, but mine is assigned to me by Heaven, and I dare not.") + fkSrc("24"), "▶ Go on"]),
fzReadA("🕊️ His eyes closed for ever", fkbQs("he pressed my hand feebly, and his eyes closed for ever, while the irradiation of a gentle smile passed away from his lips.") + fkSrc("24"), fkbQs("his eyes closed for ever, while the irradiation of a gentle smile passed away from his lips.") + fkSrc("24"), "▶ Go on"),
fzHold("desk", 8, "Sit at your desk and write to Margaret. It is midnight", { r: 2 }),
fzId("midnight", fzRead("🌑 A sound", fkbQs("I am interrupted. What do these sounds portend? It is midnight; the breeze blows fairly, and the watch on deck scarcely stir.") + "<p>A sound as of a human voice, but hoarser, comes from the cabin where the body lies.</p>" + fkSrc("24"), "▶ Go in")),
fzGo("berth", "Go in", { r: 2.2 }),
fzRead("👤 Over him", fkbQs("Over him hung a form which I cannot find words to describe", "gigantic in stature, yet uncouth and distorted in its proportions.") + fkSrc("24"), "▶ Call on him to stay"),
fzTalk("The creature", "He turns from the body", ["💀 That is also my victim!", fkbQs("That is also my victim!", "In his murder my crimes are consummated; the miserable series of my being is wound to its close! Oh, Frankenstein! Generous and self-devoted being!", "Alas! He is cold, he cannot answer me.") + fkSrc("24"), "▶ Go on"]),
fzPuzzle("⚖️ Your repentance", "You remember Victor's last words: destroy him. But he grieves. What do you say?", ["\"Your repentance is now superfluous.\"", "\"You are forgiven.\"", "Nothing"], 0, ["", "Not by you.", "You must speak."], { yes: "⚖️ He answers that he was never dead to agony and remorse, and that his work is nearly complete." }),
fzTalk("The creature", "His farewell", ["🔥 Farewell", fkbQs("But soon,", "I shall die, and what I now feel be no longer felt. Soon these burning miseries will be extinct. I shall ascend my funeral pile triumphantly and exult in the agony of the torturing flames.", "My spirit will sleep in peace, or if it thinks, it will not surely think thus. Farewell.") + fkSrc("24"), "▶ Go on"]),
fzId("leap", fzRead("🌊 The ice raft", fkbQs("He sprang from the cabin-window as he said this, upon the ice raft which lay close to the vessel. He was soon borne away by the waves and lost in darkness and distance.") + fkSrc("24"), "▶ Watch")),
fzHold("rail", 10, "Stand at the rail, and watch the dark water where he went", { r: 4 })
] });
(function () {
function go() { try {
worldCard(null);
if (typeof CT !== "undefined" && CT.run)
ctStop(null);
}
catch (e) { } fkbOpenIn(); }
if (typeof ctsEnter === "function") {
var e0 = ctsEnter;
ctsEnter = function (id) { if (id === "frankenstein") {
go();
return;
} return e0.apply(this, arguments); };
}
if (typeof ctStart === "function") {
var s0 = ctStart;
ctStart = function (id) { if (id === "frankenstein") {
go();
return;
} return s0.apply(this, arguments); };
}
if (typeof ctBoard === "function") {
var b0 = ctBoard;
ctBoard = function (id) {
var r = b0.apply(this, arguments);
try {
if (id === "frankenstein" && WLD.card) {
var e = WLD.card.querySelector("[data-w=enter]");
if (e)
e.innerHTML = "<b>🚪 Step into Frankenstein</b><div style='font-size:12px;opacity:.8'>Mary Shelley's whole book: Walton's four letters and all twenty-four chapters, from the ship in the ice to Geneva, Ingolstadt, the glacier, the cottage, the Rhine, the Orkneys, Ireland, Évian and the frozen sea.</div>";
}
}
catch (e) { }
return r;
};
}
})();
function fkbOpenIn() { if (WLD.on === FKW_KEY) {
fkbOpen();
return;
} fkwEnter({}); }
