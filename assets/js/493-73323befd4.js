/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var GVW_KEY = "laputa", GVW_NAME = "Gulliver's Third Voyage", GVW_LONG = "Gulliver's Travels, Part III: Laputa, Balnibarbi, Glubbdubdrib, Luggnagg and Japan";
var GVW = { base: -8900000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], moving: false, ride: null, night: 0, lights: 0, water: [], inst: [], beasts: [], hgt: null, ghosts: [], ships: [], flappers: [] };
var GVW_ERA = " It is 1707, in Jonathan Swift's book Gulliver's Travels (1726), the third voyage (the book only, never any film). Speak in the manner of the time, briefly and in character; keep it kind and suitable for all ages.";
var GVW_SC = {
sea: { x: 0, name: "The sea east of Tonquin", bound: 900, env: "sea" },
laputa: { x: 12000, name: "Laputa, the flying island", bound: 700, env: "high" },
cave: { x: 18000, name: "The Astronomer's Cave", bound: 60, env: "cave" },
balnibarbi: { x: 26000, name: "Balnibarbi", bound: 950, env: "land" },
glubb: { x: 38000, name: "Glubbdubdrib, the island of sorcerers", bound: 520, env: "isle" },
luggnagg: { x: 50000, name: "Luggnagg", bound: 620, env: "east" }
};
function gvwScAt(x) { var best = null, bd = 1e9; for (var k in GVW_SC) {
var d = Math.abs(x - GVW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 5000 ? best : null; }
var GVW_AT = {
deck: { sc: "sea", x: 0, z: 2, y: 2.2, name: "the deck of the sloop", ry: Math.PI },
helm: { sc: "sea", x: 0, z: -6, y: 3.2, name: "the sloop's quarterdeck" },
rail: { sc: "sea", x: 1.8, z: -2, y: 2.2, name: "the sloop's rail" },
canoe: { sc: "sea", x: -1.8, z: 0, y: 2.2, name: "the side, over the canoe" },
isle1: { sc: "sea", x: 300, z: -210, name: "the first rocky island", ry: Math.PI },
isle1b: { sc: "sea", x: 312, z: -226, name: "the rocks of the first island" },
isle5: { sc: "sea", x: 620, z: -520, name: "the fifth island", ry: Math.PI },
creek: { sc: "sea", x: 600, z: -470, name: "the little creek" },
cave5: { sc: "sea", x: 650, z: -560, name: "the cave on the fifth island" },
height: { sc: "sea", x: 630, z: -600, name: "the height of the island" },
shore5: { sc: "sea", x: 610, z: -640, name: "the far shore of the fifth island" },
nangasac: { sc: "sea", x: -600, z: 420, name: "the port of Nangasac, in Japan", ry: 0 },
quay: { sc: "sea", x: -600, z: 482, y: 2.2, name: "the quay at Nangasac" },
amboyna: { sc: "sea", x: -600, z: 522, y: 3.0, name: "the deck of the Amboyna" },
gallery: { sc: "laputa", x: 0, z: 600, name: "the lowest gallery, at the island's edge", ry: 0 },
stairs: { sc: "laputa", x: 0, z: 540, name: "the stairs to the top of the island" },
top: { sc: "laputa", x: 0, z: 460, name: "the top of the island" },
palace: { sc: "laputa", x: 0, z: -120, name: "the royal palace" },
presence: { sc: "laputa", x: 0, z: -140, name: "the chamber of presence" },
throne: { sc: "laputa", x: 0, z: -152, name: "before the throne" },
dining: { sc: "laputa", x: 22, z: -140, name: "the king's table" },
lodging: { sc: "laputa", x: 120, z: 120, name: "your lodging" },
tailor: { sc: "laputa", x: 150, z: 96, name: "the tailor's" },
music: { sc: "laputa", x: -130, z: 40, name: "the music of the spheres" },
basin1: { sc: "laputa", x: 180, z: 0, name: "a great basin" },
basin2: { sc: "laputa", x: -180, z: 0, name: "a great basin" },
chasm: { sc: "laputa", x: 0, z: 30, name: "the chasm at the centre" },
houses: { sc: "laputa", x: -160, z: 200, name: "the houses of Laputa" },
edge: { sc: "laputa", x: 420, z: -420, name: "the island's edge" },
packthread: { sc: "laputa", x: -420, z: 420, name: "the packthreads" },
cavein: { sc: "cave", x: 0, z: 24, name: "the foot of the stair", ry: 0 },
loadstone: { sc: "cave", x: 0, z: 0, name: "the loadstone" },
instruments: { sc: "cave", x: -18, z: -8, name: "the astronomers' instruments" },
catalogue: { sc: "cave", x: 18, z: -8, name: "the catalogue of the stars" },
landing: { sc: "balnibarbi", x: 0, z: 40, name: "the mountain where you are let down", ry: Math.PI },
lagado: { sc: "balnibarbi", x: 0, z: -120, name: "the city of Lagado" },
munodi: { sc: "balnibarbi", x: 60, z: -160, name: "Lord Munodi's house in town" },
gate: { sc: "balnibarbi", x: 0, z: -320, name: "the town gate" },
fields: { sc: "balnibarbi", x: 120, z: -420, name: "the fields outside Lagado" },
country: { sc: "balnibarbi", x: 420, z: -560, name: "Lord Munodi's country house" },
garden: { sc: "balnibarbi", x: 420, z: -520, name: "Lord Munodi's gardens" },
mill: { sc: "balnibarbi", x: 520, z: -600, name: "the old mill by the river" },
ruin: { sc: "balnibarbi", x: 700, z: -760, name: "the ruined building on the mountain" },
academy: { sc: "balnibarbi", x: -200, z: -40, name: "the Grand Academy of Lagado" },
warden: { sc: "balnibarbi", x: -200, z: -20, name: "the warden of the Academy" },
maldonada: { sc: "balnibarbi", x: -620, z: 520, name: "the port of Maldonada" },
mquay: { sc: "balnibarbi", x: -620, z: 570, name: "the quay at Maldonada" },
glanding: { sc: "glubb", x: 0, z: 300, name: "the landing on Glubbdubdrib", ry: 0 },
gwall: { sc: "glubb", x: 0, z: 200, name: "the park gate" },
gpalace: { sc: "glubb", x: 0, z: -40, name: "the governor's palace" },
ghall: { sc: "glubb", x: 0, z: -70, name: "the governor's hall" },
gchamber: { sc: "glubb", x: 0, z: -96, name: "the chamber over the park" },
gpark: { sc: "glubb", x: -120, z: -40, name: "the park" },
glodge: { sc: "glubb", x: 160, z: 240, name: "your lodging in the town" },
clumegnig: { sc: "luggnagg", x: 0, z: 420, name: "the port of Clumegnig", ry: 0 },
custom: { sc: "luggnagg", x: 30, z: 380, name: "the custom-house" },
road: { sc: "luggnagg", x: 0, z: 160, name: "the road to the court" },
traldragdubh: { sc: "luggnagg", x: 0, z: -180, name: "Traldragdubh, the royal city" },
court: { sc: "luggnagg", x: 0, z: -260, name: "the king's court" },
throneL: { sc: "luggnagg", x: 0, z: -300, name: "before the throne of Luggnagg" },
townL: { sc: "luggnagg", x: -140, z: -120, name: "the town" },
struld: { sc: "luggnagg", x: -180, z: -160, name: "where the struldbrugs sit" },
glanguen: { sc: "luggnagg", x: 300, z: 420, name: "the port of Glanguenstald" }
};
function gvwAtPt(at) { if (typeof at === "string")
at = GVW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
var GVW_ENV = {
sea: { top: 0x4A7AC8, low: 0xD8E4EC, fog: 0xC8D6E0, fogD: 0.0016, sun: 1.0, sunCol: 0xFFF4E0, sunDir: [0.4, 0.8, 0.3], hemi: 0.72, hemiCol: 0xDCE8F4, hemiGround: 0x3A4A5A },
storm: { top: 0x3A4250, low: 0x7A8490, fog: 0x6A747E, fogD: 0.006, sun: 0.45, sunCol: 0xC8D0DC, sunDir: [0.2, 0.9, 0.1], hemi: 0.55, hemiCol: 0xA8B0BC, hemiGround: 0x2A3038 },
dusk: { top: 0x2A3A7A, low: 0xE89A6A, fog: 0xC08A70, fogD: 0.0018, sun: 0.7, sunCol: 0xFFB070, sunDir: [-0.8, 0.25, 0.2], hemi: 0.58, hemiCol: 0xF0C8A8, hemiGround: 0x3A3020 },
night: { top: 0x060A18, low: 0x141A2A, fog: 0x10141E, fogD: 0.003, sun: 0.22, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.3, hemiCol: 0x5A6A98, hemiGround: 0x0A0C10, stars: 0.95 },
high: { top: 0x3A6AC8, low: 0xE8EEF4, fog: 0xDCE4EE, fogD: 0.0009, sun: 1.1, sunCol: 0xFFF8E8, sunDir: [0.3, 0.85, 0.25], hemi: 0.8, hemiCol: 0xE4ECF8, hemiGround: 0x5A6A4A },
indoor: { top: 0x2A2420, low: 0x5A4A3A, fog: 0x3A3028, fogD: 0.008, sun: 0.35, sunCol: 0xFFE8C0, sunDir: [0.2, 0.9, 0.1], hemi: 0.82, hemiCol: 0xFFF0D8, hemiGround: 0x3A2E24 },
cave: { top: 0x0A0A14, low: 0x2A2A3A, fog: 0x14141E, fogD: 0.012, sun: 0.3, sunCol: 0xFFE0A0, sunDir: [0, 1, 0], hemi: 0.6, hemiCol: 0xFFE6B8, hemiGround: 0x1A1A24 },
land: { top: 0x5A88D0, low: 0xE6E0D0, fog: 0xD8D2C2, fogD: 0.0012, sun: 1.0, sunCol: 0xFFF0D0, sunDir: [0.45, 0.75, 0.3], hemi: 0.74, hemiCol: 0xDCE6F0, hemiGround: 0x5A5A3A },
isle: { top: 0x5A6AA8, low: 0xD8D0C8, fog: 0xB8B4BC, fogD: 0.0024, sun: 0.8, sunCol: 0xF0E8E0, sunDir: [0.3, 0.7, 0.4], hemi: 0.68, hemiCol: 0xD0D4E4, hemiGround: 0x3A3A3A },
ghosts: { top: 0x3A3A5A, low: 0x8A8AA0, fog: 0x6A6A84, fogD: 0.004, sun: 0.5, sunCol: 0xD8D8F0, sunDir: [0.2, 0.8, 0.3], hemi: 0.62, hemiCol: 0xC0C4E0, hemiGround: 0x2A2A34 },
east: { top: 0x5A8AD8, low: 0xF0E4D0, fog: 0xE0D4C0, fogD: 0.0014, sun: 1.05, sunCol: 0xFFF0D0, sunDir: [0.5, 0.7, 0.2], hemi: 0.74, hemiCol: 0xF0E8DC, hemiGround: 0x5A4A3A }
};
var GVW_Q = [];
function gvQ(s) { GVW_Q.push(s); return "<i>“" + s + "”</i>"; }
function gvQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0'>" + gvQ(s) + "</p>"; }).join(""); }
var GVB_FOLK_AT = {};
function gvwLite() { return typeof LITE !== "undefined" && !!LITE; }
function gvwPhotoTex(name, mpt, nrm) { return __ZC(493, 0, this, arguments, new.target); }
function gvwS(name, col, mpt, o) { return __ZC(493, 1, this, arguments, new.target); }
function gvwCanvas(key, w, h, fn) { if (GVW.tex[key])
return GVW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (GVW.tex[key] = t); }
function gvwM(key, make) { return GVW.mats[key] || (GVW.mats[key] = make()); }
function gvwLam(col, o) { return __ZC(493, 2, this, arguments, new.target); }
function gvwShine(col, r, mt) { return gvwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function gvwGlowM(col, op) { return gvwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function gvwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function gvwLeafTex() { return gvwPhotoTexAlpha(); }
function gvwPhotoTexAlpha() { var k = "leafpng"; if (GVW.tex[k])
return GVW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (GVW.tex[k] = t); }
function gvwFrondTex(kind) { return __ZC(493, 3, this, arguments, new.target); }
function gvwBambooTex() { return __ZC(493, 4, this, arguments, new.target); }
function gvwReedTex(kind) { return __ZC(493, 5, this, arguments, new.target); }
function gvwGrassTex() { return __ZC(493, 6, this, arguments, new.target); }
function gvwFlowerTex(col) { return __ZC(493, 7, this, arguments, new.target); }
function gvwSkinTex(kind) { return __ZC(493, 8, this, arguments, new.target); }
function gvwRippleTex() { return __ZC(493, 9, this, arguments, new.target); }
function gvwWaterM(col, op) { return gvwM("water" + col + "|" + op, function () { var t = gvwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var GVW_CELL = 48;
function gvwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / GVW_CELL), b = Math.floor(x1 / GVW_CELL), c = Math.floor(z0 / GVW_CELL), d = Math.floor(z1 / GVW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function gvwGridAdd(S) { var g = GVW.sgrid || (GVW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; gvwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function gvwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; GVW.solids.push(S); gvwGridAdd(S); return S; }
function gvwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; GVW.solids.push(S); gvwGridAdd(S); return S; }
function gvwSolidAt(x, z, feet) { return __ZC(493, 10, this, arguments, new.target); }
function gvwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; GVW.floors.push(F); return F; }
function gvwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; GVW.floors.push(F); return F; }
function gvwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function gvwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function gvwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < GVW.floors.length; i++) {
var F = GVW.floors[i];
if (F.off || !gvwFloorIn(F, x, z))
continue;
var y = gvwFloorY(F, x, z);
if (y <= feet + 1.1 && (best === null || y > best))
best = y;
} return best; }
function gvwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; GVW.spots.push(S); return S; }
function gvwPerson(seed, x, z, y, o, ry) { return __ZC(493, 11, this, arguments, new.target); }
function gvwTalk(P, name, persona, greet, r, fn) { GVW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona + GVW_ERA, greet: greet } }); return P; }
function gvwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(493, 12, this, arguments, new.target); }
function gvwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function gvwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = gvwHash(ix, iz), b = gvwHash(ix + 1, iz), c = gvwHash(ix, iz + 1), d = gvwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function gvwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * gvwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function gvwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function gvwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), gvwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); GVW.water.push(m); return m; }
var GVW_GEO = {};
function gvwGeo(k, make) { if (GVW_GEO[k])
return GVW_GEO[k]; var g = make(); g.userData.shared = 1; return (GVW_GEO[k] = g); }
function gvwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function gvwFronds(n, len, wid, droop, y0, ring) { return __ZC(493, 13, this, arguments, new.target); }
function gvwInst(P, geo, mat, list, o) { return __ZC(493, 14, this, arguments, new.target); }
function gvwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function gvwPathD(x, z, pts) { return __ZC(493, 15, this, arguments, new.target); }
function gvwStrip(P, pts, w, hfn, mat, lift) { return __ZC(493, 16, this, arguments, new.target); }
function gvwPlant(P, kind, list, o) { return __ZC(493, 17, this, arguments, new.target); }
function gvwTaper(pts, rads, seg, rs, flat) { return __ZC(493, 18, this, arguments, new.target); }
function gvwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function gvwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function gvwSkinM(kind, col) { return __ZC(493, 19, this, arguments, new.target); }
function gvwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), gvwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function gvwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(493, 20, this, arguments, new.target); }
function gvwBoxG(w, h, d) { return __ZC(493, 21, this, arguments, new.target); }
function gvwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(gvwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !gvwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
gvwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function gvwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(gvwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function gvwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(493, 22, this, arguments, new.target); }
function gvwHouse(P, x, z, w, d, h, o) { return __ZC(493, 23, this, arguments, new.target); }
function gvwLand(x, z) { return GVW.hgt ? GVW.hgt(x, z) : 0; }
function gvwGround(x, z, feet) { var f = gvwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = gvwLand(x, z); return f === null ? h : Math.max(f, h); }
var GVW_SCN = {};
function gvwSc() { return GVW_SC[GVW.sc] || GVW_SC.richmond; }
function gvwSceneDrop() { return __ZC(493, 24, this, arguments, new.target); }
function gvwScene(k) { return __ZC(493, 25, this, arguments, new.target); }
function gvwVeil() { if (GVW.veil)
return GVW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); GVW.veil = v; return v; }
function gvwGo(at, msg, after) { return __ZC(493, 26, this, arguments, new.target); }
function gvwSmoke(P, x, y, z, col, n) { return __ZC(493, 27, this, arguments, new.target); }
function gvwFire(P, x, y, z, s) { return __ZC(493, 28, this, arguments, new.target); }
function gvwLocalSc() { var L = worldLocal(); return { x: L.x - gvwSc().x, z: L.z }; }
var GVW_HOUSE = { h1: 3.7 };
function gvwMat(k) { return __ZC(493, 29, this, arguments, new.target); }
function gvwChair(P, x, z, ry, mat, arm) { return __ZC(493, 30, this, arguments, new.target); }
function gvwTable(P, x, z, w, d, h, mat, cloth) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
gvwBox(g, w, 0.06, d, cloth || mat, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { gvwBox(g, 0.07, h - 0.06, 0.07, mat, q[0] * (w / 2 - 0.1), 0, q[1] * (d / 2 - 0.1)); });
if (cloth)
gvwBox(g, w + 0.06, 0.3, d + 0.06, cloth, 0, h - 0.34, 0);
return g;
}
function gvwShelves(P, x, z, w, h, ry) { return __ZC(493, 31, this, arguments, new.target); }
function gvwLily(P, x, y, z) { return __ZC(493, 32, this, arguments, new.target); }
function gvwRug(P, x, z, w, d, col) { return __ZC(493, 33, this, arguments, new.target); }
function gvwWallZ(P, z, x0, x1, mat, inner, gaps, h) { return __ZC(493, 34, this, arguments, new.target); }
function gvwWallX(P, x, z0, z1, mat, inner, gaps, h) { return __ZC(493, 35, this, arguments, new.target); }
function gvwPaper(P, x0, x1, z0, z1, mat, dx, dz) { return __ZC(493, 36, this, arguments, new.target); }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
var pick = function (a, r) { return a[Math.floor(r * a.length) % a.length]; };
Object.assign(DLN_WEAR, {
gvsea: function (o) {
var c = pick([0x2A3448, 0x4A3A2A, 0x3A3A3A, 0x5A2A22], o.r);
return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:vest:cloth", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots:roll"],
col: { shirt: 0xF0ECE0, collar: 0xF0ECE0, tie: 0xF0ECE0, vest: 0x8A6A3A, coat: c, trou: c, stock: 0xE8E4D8 }, shoes: 0x1A1410 };
},
gvtar: function (o) { var c = pick([0xE8E0D0, 0x8A9AA8, 0xC8B898], o.r); return { ids: ["oz:shirt:long", "oz:breeches:cloth", "oz:stock:knit"].concat(o.r > 0.5 ? ["oz:vest:cloth"] : []), col: { shirt: c, trou: pick([0x3A4A6A, 0x5A4A3A, 0xD8D0C0], o.r * 3), vest: 0x2A3A5A, stock: 0xD8D0C0 }, shoes: 0x2A1E16 }; },
gvpirate: function (o) { var c = pick([0x1E1E28, 0x4A2A1A, 0x2A3A2A, 0x6A1E1E], o.r); return { ids: ["oz:shirt:long", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:sash"], col: { shirt: 0xD8D0C0, coat: c, trou: 0x2A2A2A, sash: pick([0xA82A1A, 0xD8A030, 0x2A4A8A], o.r * 2) }, shoes: 0x1A1410 }; },
gvlaputan: function (o) {
var c = pick([0x1E2A5A, 0x3A1E5A, 0x0E3A4A, 0x5A1E2A, 0x1A3A2A], o.r);
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:satin", "oz:coat:long:satin", "oz:breeches:cloth", "oz:stock:satin:thigh", "oz:sash"],
col: { shirt: 0xF4F0E4, collar: 0xE8C860, tie: 0xE8C860, vest: 0xE8C860, coat: c, trou: c, stock: 0xE8E0C8, sash: 0xE8C860 }, shoes: 0x1A1A20 };
},
gvlaputana: function (o) { var c = pick([0x2A3A7A, 0x5A2A6A, 0x1E5A5A, 0x7A2A3A], o.r); return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.26:cloth", "oz:collar:high:none", "oz:sash"], col: { dress: c, skirt: c, trim: 0xE8C860, collar: 0xF4ECD8, sash: 0xE8C860 }, shoes: 0x1A1A20 }; },
gvflap: function (o) { return { ids: ["oz:shirt:long", "oz:vest:cloth", "oz:breeches:cloth", "oz:stock:knit"], col: { shirt: 0xE8E4D8, vest: 0x6A5A3A, trou: 0x4A3E30, stock: 0xC8C0B0 }, shoes: 0x2A1E16 }; },
gvrag: function (o) { var c = pick([0x6A5A48, 0x5A5048, 0x7A6A50, 0x4A4038], o.r); return { ids: ["oz:shirt:long", "oz:coat:long:cloth", "oz:breeches:cloth"].concat(o.r > 0.5 ? ["oz:apron:half:long:0.2"] : []), col: { shirt: 0xA89A80, coat: c, trou: 0x4A4036, apron: 0x8A7A60 }, shoes: 0x3A2E20 }; },
gvragf: function (o) { var c = pick([0x6A5A48, 0x7A6450, 0x5A5A4A], o.r); return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.16:cloth", "oz:apron:half:long:0.2"], col: { dress: c, skirt: c, trim: 0x5A4A3A, apron: 0xA89A80 }, shoes: 0x3A2E20 }; },
gvproj: function (o) { var c = pick([0x3A3430, 0x4A3E34, 0x2A2A2A], o.r); return { ids: ["oz:shirt:long", "oz:vest:cloth", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:apron:full"], col: { shirt: 0x9A9080, vest: 0x4A3A2A, coat: c, trou: 0x3A3028, apron: 0x6A5A48 }, shoes: 0x2A2018 }; },
gvlord: function (o) {
var c = pick([0x5A1E2A, 0x1E3A5A, 0x3A4A2A, 0x2A2A3A], o.r);
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:satin", "oz:coat:long:satin", "oz:breeches:cloth", "oz:stock:satin:thigh", "oz:boots:roll"],
col: { shirt: 0xFAF6EC, collar: 0xFAF6EC, tie: 0xFAF6EC, vest: 0xD8B860, coat: c, trou: c, stock: 0xF0EAD8 }, shoes: 0x1A1414 };
},
gvlady: function (o) { var c = pick([0x8A2A3A, 0x2A4A7A, 0x4A6A3A, 0x7A5A2A, 0x6A3A6A], o.r); return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.24:cloth", "oz:collar:high:none"].concat(o.r > 0.6 ? ["oz:pelerine"] : []), col: { dress: c, skirt: c, trim: 0xE8D8A8, collar: 0xF8F4EC, cape: 0x2A2A2E }, shoes: 0x1A1414 }; },
gvancient: function (o) { var c = pick([0xF0ECE0, 0xE8E0D0, 0xD8D0C0, 0xB8A8D8], o.r); return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.1:cloth", "oz:sash", "oz:pelerine"], col: { dress: c, skirt: c, trim: 0xC8A048, sash: 0x8A2A2A, cape: pick([0x8A1E2A, 0x3A2A6A, 0xE8E0D0], o.r * 2) }, shoes: 0x8A6A40 }; },
gveast: function (o) { var c = pick([0x2A3A5A, 0x6A2A2A, 0x3A5A3A, 0x5A4A2A, 0x1E1E2A], o.r); return { ids: ["oz:shirt:long", "oz:coat:long:satin", "oz:trousers:cloth", "oz:sash"], col: { shirt: 0xF0E8D8, coat: c, trou: 0x2A2A2A, sash: pick([0xD8A030, 0xA82A1A, 0xE8E0C8], o.r * 2) }, shoes: 0x1A1410 }; },
gveastf: function (o) { var c = pick([0xA82A3A, 0x2A5A8A, 0x6A3A7A, 0xD8A040], o.r); return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.2:satin", "oz:sash"], col: { dress: c, skirt: c, trim: 0xE8D8B0, sash: 0xE8D8B0 }, shoes: 0x1A1410 }; },
gvold: function (o) { return { ids: ["oz:shirt:long", "oz:coat:long:cloth", "oz:trousers:cloth"], col: { shirt: 0xC8C0B0, coat: pick([0x6A6660, 0x5A5650, 0x7A766A], o.r), trou: 0x4A4640 }, shoes: 0x2A2420 }; }
});
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { gvsea: ["tricorn"], gvtar: [null, "flatcap"], gvpirate: [null, "sxturban"], gvlaputan: [null], gvlaputana: [null], gvflap: [null], gvrag: [null, "slouch", null], gvragf: ["bonnet", null], gvproj: [null, "slouch"], gvlord: ["tricorn"], gvlady: ["ladyhat", null], gvancient: [null], gveast: [null, "sxturban"], gveastf: [null], gvold: [null] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { gvsea: [null], gvtar: [null], gvpirate: [null], gvlaputan: [null, "book"], gvlaputana: [null, "flowers"], gvflap: [null], gvrag: [null, "bag"], gvragf: [null, "bag"], gvproj: [null, "paper", "book"], gvlord: ["stick", null], gvlady: ["parasol", null], gvancient: [null, "book"], gveast: [null], gveastf: [null, "flowers"], gvold: ["stick"] });
})();
function gvwDressed(seed, dress, o) { return __ZC(493, 37, this, arguments, new.target); }
function gvwTilt(g, R) { g.traverse(function (o) { if (o.userData && o.userData.part === "head") {
o.rotation.z = (R < 0.5 ? -1 : 1) * 0.22;
} }); var hd = null; g.traverse(function (o) { if (!hd && /head/i.test(o.name || ""))
hd = o; }); if (hd)
hd.rotation.z = (R < 0.5 ? -1 : 1) * 0.22; return g; }
function gvwFlail(g) { return __ZC(493, 38, this, arguments, new.target); }
function gvwGhostly(g) { return __ZC(493, 39, this, arguments, new.target); }
function gvwSpotMark(g, col) { var s = new THREE.Mesh(gvwGeo("stmark", function () { return new THREE.CircleGeometry(0.018, 10); }), gvwLam(col || 0x101010)); s.position.set(0.035, 1.70, 0.115); g.add(s); return s; }
var GVW_P = {
dutch: "You are the Dutchman among the pirates in Jonathan Swift's Gulliver's Travels (1726), Part III: a spiteful sailor of some authority, though not the commander. You hate the English captives and want them tied back to back and thrown into the sea. You speak gruffly, threateningly, in short bursts, and swear in Dutch.",
pirate: "You are the Japanese captain of the larger pirate ship in Gulliver's Travels (1726), Part III. You speak a little broken Dutch. You are stern but not cruel: you told the captives they should not die, and you overrule the spiteful Dutchman. You are a man of your word.",
tar: "You are an English sailor of the sloop that Captain William Robinson gave Lemuel Gulliver to command, in Gulliver's Travels (1726), Part III. Fourteen of you sail her: honest seamen, a little frightened of the storm and of pirates.",
laputan: "You are a Laputian, a gentleman of the flying island of Laputa in Swift's Gulliver's Travels (1726). Your head leans to one side, one eye looks inward and the other up at the zenith. You think only of mathematics and music: lines, figures, circles, the harmony of the spheres; you cannot attend to anything else until your flapper strikes your mouth or ear. You fear the sun will burn out, or a comet will strike the earth. You speak in a polite, smooth, sing-song way, and often forget what you were saying.",
laputana: "You are a lady of the flying island of Laputa in Swift's Gulliver's Travels (1726). You are lively and bored: your husband thinks only of mathematics and music and never notices you. You long to visit Lagado below, which you may not do without the king's licence. You are curious about strangers.",
flapper: "You are a flapper on the flying island of Laputa in Swift's Gulliver's Travels (1726): a servant who carries a blown bladder with dried peas in it, fastened like a flail to a stick, and gently strikes your master's mouth when he must speak and his ear when he must listen, because otherwise he is lost in thought. You are practical, patient and a little amused by the gentlemen you serve.",
king: "You are the King of Laputa in Swift's Gulliver's Travels (1726): deep in a mathematical problem, attended by pages with flaps. You care nothing for the laws, government, history, religion or manners of other countries; only mathematics and music. You are courteous but distracted.",
tutor: "You are the tutor the King of Laputa sent to teach Gulliver your language, in Swift's Gulliver's Travels (1726). You are patient, mathematical and musical; you name things and the stranger writes the words down.",
tailor: "You are the tailor of Laputa in Swift's Gulliver's Travels (1726). You take a man's altitude with a quadrant, and describe his outline with rule and compasses; your clothes come out quite out of shape when you mistake a figure, which happens often and troubles no one.",
astronomer: "You are one of the astronomers of Laputa who keep the great loadstone in the Astronomer's Cave (the Flandona Gagnole), in Swift's Gulliver's Travels (1726). You have catalogued ten thousand fixed stars and ninety-three comets, and you found two little moons of Mars. You speak proudly, precisely, a little anxiously about comets.",
lord: "You are the great lord at the court of Laputa, nearly related to the king, in Swift's Gulliver's Travels (1726): the Laputians think you ignorant and stupid because you have no ear for music and cannot follow the mathematics, but you are kind, honest and sensible, and you like to hear about the world. You never use a flapper except at court.",
munodi: "You are Lord Munodi of Balnibarbi in Swift's Gulliver's Travels (1726): once governor of Lagado, now out of favour. You farm and build in the old way, and your lands are green and fruitful while the whole country lies in ruin under the schemes of the projectors. You are courteous, a little melancholy, and careful what you say.",
ragged: "You are a citizen of Lagado in Swift's Gulliver's Travels (1726). You walk fast, look wild and are dressed in rags, and you are busy with a new scheme of the Academy that has not worked yet but surely will. You speak quickly, distractedly, hopefully.",
warden: "You are the warden of the Grand Academy of Lagado in Swift's Gulliver's Travels (1726). You are proud of the Academy's five hundred rooms of projectors and their schemes, and you welcome visitors kindly, hoping they will give the projectors something for their work.",
projector: "You are a projector of the Grand Academy of Lagado in Swift's Gulliver's Travels (1726): a scientist of absurd schemes. You are utterly sincere, passionate about your project, sure that success is only a few years away, and you always ask visitors for a little money to encourage ingenuity.",
governor: "You are the Governor of Glubbdubdrib, the island of sorcerers, in Swift's Gulliver's Travels (1726). By necromancy you can call up anyone from the dead and command their service for twenty-four hours. You are gracious and grave, and you offer your guest to call up whatever persons he pleases from the beginning of the world to the present time.",
ghost: "You are a spirit called up from the dead by the Governor of Glubbdubdrib in Swift's Gulliver's Travels (1726). You are obliged to answer truthfully whatever you are asked, for lying is no use in the lower world. You speak in a hollow, quiet voice, briefly.",
interpreter: "You are the young interpreter Gulliver hired, a native of Luggnagg who has lived some years at Maldonada, in Swift's Gulliver's Travels (1726). You know both languages perfectly and you explain the customs of the court kindly and honestly.",
luggnagg: "You are a person of quality of Luggnagg in Swift's Gulliver's Travels (1726): polite, generous and courteous to strangers. You know all about the struldbrugs, the immortals born with a red spot over the left eyebrow, and you think pity rather than envy is what they deserve.",
luggking: "You are the King of Luggnagg in Swift's Gulliver's Travels (1726): proud, polite, generous to strangers who are welcome at court. Your subjects must crawl and lick the floor before your throne. You are fond of the English traveller's company.",
struld: "You are a struldbrug of Luggnagg in Swift's Gulliver's Travels (1726): one of the immortals, born with the spot over your left eyebrow, now very old. You forget much, cannot follow a story for long, and the language has changed so much you barely understand the young. You ask for slumskudask, a token of remembrance.",
dutchcap: "You are Theodorus Vangrult, captain of the Amboyna of Amsterdam, a stout ship of 450 tons, in Swift's Gulliver's Travels (1726). You take the English surgeon (whom you believe to be a Dutchman of Gelderland) home at half the usual rate if he serves as ship's surgeon.",
townsman: "You are a townsman of the place you live in, in Swift's Gulliver's Travels (1726), the third voyage. You are friendly to a traveller and talk about your own life and your town."
};
function gvwPersona(k) { return (GVW_P[k] || k || "") + GVW_ERA; }
var GVW_FOLK = {
dutch: { name: "The Dutchman", dress: "gvpirate", sex: "m", beard: "full", hair: 0xC8A060, persona: "dutch", greet: "Engelsen! Tie them back to back and throw them in the sea, I say!" },
pirate: { name: "The Japanese captain", dress: "gvpirate", sex: "m", hair: 0x141414, skin: 0xD8B898, persona: "pirate", greet: "You shall not die. I have said it." },
tar1: { name: "A sailor of the sloop", dress: "gvtar", sex: "m", hair: 0x5A3A1A, persona: "tar", greet: "Wind's backing, sir. I don't like the look of those two sail to windward." },
tar2: { name: "The sloop's boatswain", dress: "gvtar", sex: "m", beard: "full", hair: 0x3A2A1A, persona: "tar", greet: "Fourteen of us, sir, and three of them Indians. Say the word." },
king: { name: "The King of Laputa", dress: "gvlaputan", sex: "m", beard: "full", hair: 0xD8D8D8, persona: "king", greet: "(He is deep in a problem. A page strikes his mouth with a flap; he starts, as if waking.)" },
tutor: { name: "Your tutor", dress: "gvlaputan", sex: "m", hair: 0x6A5A4A, persona: "tutor", greet: "(He points to a book, then to the sky, and pronounces the words slowly.)" },
tailor: { name: "The tailor", dress: "gvlaputan", sex: "m", hair: 0x3A2A1A, persona: "tailor", greet: "Stand quite still. Your altitude first, by the quadrant." },
lord: { name: "The great lord", dress: "gvlord", sex: "m", hair: 0x8A7A6A, persona: "lord", greet: "Sit, sit. Tell me of England: its laws, its customs. No one here will listen to me." },
astro1: { name: "An astronomer", dress: "gvlaputan", sex: "m", beard: "full", hair: 0xC8C8C8, persona: "astronomer", greet: "Mind the stone. Not one finger on it: it is poised so exactly that a child could turn it." },
astro2: { name: "An astronomer", dress: "gvlaputan", sex: "m", hair: 0x5A4A3A, persona: "astronomer", greet: "Ninety-three comets, and every period settled. The next will come in one-and-thirty years." },
munodi: { name: "Lord Munodi", dress: "gvlord", sex: "m", hair: 0x9A8A7A, persona: "munodi", greet: "You are welcome to my house. Say nothing of what you see here, I beg you, in the town." },
warden: { name: "The Warden of the Academy", dress: "gvproj", sex: "m", beard: "full", hair: 0xB8B0A0, persona: "warden", greet: "Welcome to the Academy! Five hundred rooms, and a projector in every one." },
conductor: { name: "Your conductor", dress: "gvlord", sex: "m", hair: 0x4A3A2A, persona: "townsman", greet: "Give no offence, I beg you: they take it very hard here." },
governor: { name: "The Governor of Glubbdubdrib", dress: "gvlord", sex: "m", beard: "full", hair: 0x2A2A2A, persona: "governor", greet: "You are welcome. Call up whom you please, from the beginning of the world to this present time." },
interp: { name: "Your interpreter", dress: "gveast", sex: "m", hair: 0x141414, skin: 0xD8B898, persona: "interpreter", greet: "I shall put everything into their tongue, sir, and theirs into yours." },
quality: { name: "A person of quality", dress: "gveast", sex: "m", hair: 0x2A2A2A, skin: 0xD8B898, persona: "luggnagg", greet: "Have you seen any of our struldbrugs, sir, our immortals?" },
luggking: { name: "The King of Luggnagg", dress: "gveast", sex: "m", beard: "full", hair: 0x1A1A1A, skin: 0xD8B898, persona: "luggking", greet: "(The King returns some answer you cannot understand; your interpreter bows.)" },
vangrult: { name: "Captain Theodorus Vangrult", dress: "gvsea", sex: "m", beard: "full", hair: 0xC8A870, persona: "dutchcap", greet: "A surgeon, eh? Half the usual rate, then, if you'll physic my men." }
};
function gvwFolk(key, x, z, ry, o) { return __ZC(493, 40, this, arguments, new.target); }
function gvwCrowd(seed, n, x0, z0, x1, z1, o) { return __ZC(493, 41, this, arguments, new.target); }
var GVW_IN_Y = -3000;
function gvwInAt(sc, i, dx, dz, name, ry) { var S = GVW_SC[sc]; return { sc: sc, x: S.bound + 160 + (i % 6) * 80 + (dx || 0), z: Math.floor(i / 6) * 80 + (dz || 0), y: GVW_IN_Y, name: name, ry: ry }; }
(function () {
var s0 = gvwScene;
gvwScene = function (k) {
s0.apply(this, arguments);
var S = GVW_SC[k], h0 = GVW.hgt;
if (!S || !h0)
return;
GVW.hgt = function (x, z) { if (x > S.bound + 60)
return GVW_IN_Y - 100; return h0(x, z); };
};
})();
function gvwRoomBuild(G, sc, i, W, D, H, o) { return __ZC(493, 42, this, arguments, new.target); }
function gvwDoorTo(G, sc, i, x, z, ry, name, W, D, o) { return __ZC(493, 43, this, arguments, new.target); }
function gvwEnterable(G, sc, i, x, z, ry, name, room, o) { return __ZC(493, 44, this, arguments, new.target); }
function gvwBed(P, x, z, ry, col) { return __ZC(493, 45, this, arguments, new.target); }
function gvwChest(P, x, z, ry) { var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry || 0; P.add(g); gvwBox(g, 1.1, 0.6, 0.6, gvwMat("oak"), 0, 0, 0); gvwBox(g, 1.14, 0.08, 0.64, gvwMat("iron"), 0, 0.6, 0); gvwBox(g, 0.12, 0.14, 0.04, gvwMat("brass"), 0, 0.42, 0.31); return g; }
function gvwGlobe(P, x, z, s, sky) { return __ZC(493, 46, this, arguments, new.target); }
function gvwTelescope(P, x, z, ry, len, y) { return __ZC(493, 47, this, arguments, new.target); }
function gvwQuadrant(P, x, z, ry) { return __ZC(493, 48, this, arguments, new.target); }
function gvwHarpsichord(P, x, z, ry) { return __ZC(493, 49, this, arguments, new.target); }
function gvwInstrument(P, x, y, z, kind) { return __ZC(493, 50, this, arguments, new.target); }
function gvwMathDinner(P, x, y, z) { return __ZC(493, 51, this, arguments, new.target); }
function gvwHullGeo(L, W, Dp, o) { return __ZC(493, 52, this, arguments, new.target); }
function gvwSailGeo(w, h, belly, tri) { return __ZC(493, 53, this, arguments, new.target); }
var GVW_SAIL = 0xEDE4CC;
function gvwShip(P, x, z, ry, kind, o) { return __ZC(493, 54, this, arguments, new.target); }
function gvwIslandModel(R) { return __ZC(493, 55, this, arguments, new.target); }
function gvwChainSeat(P, x, y, z, len) { return __ZC(493, 56, this, arguments, new.target); }
function gvwBevelHouse(P, x, z, w, d, h, o) { return __ZC(493, 57, this, arguments, new.target); }
function gvwFurnish(g, W, D, kind, seed) { return __ZC(493, 58, this, arguments, new.target); }
function gvwDense(pts, step) { step = step || 6; var out = []; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
for (var k = 0; k < n; k++)
out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
} out.push(pts[pts.length - 1]); return out; }
function gvwGoOut(msg) { var B = GVW.lastBack; if (!B || B.sc !== GVW.sc)
return false; gvwGo(B, msg || null, typeof gvbPopulate === "function" ? gvbPopulate : null); return true; }
Object.assign(GVW_AT, {
redriff: gvwInAt("sea", 0, 0, 0, "your house at Redriff", 0),
xamoschi: { sc: "sea", x: -392, z: 300, name: "Xamoschi, a little port in Japan", ry: Math.PI / 2 },
yedo: { sc: "sea", x: -760, z: 352, name: "the Emperor's palace at Yedo" },
yedoin: gvwInAt("sea", 1, 0, -4, "the Emperor of Japan's hall of audience"),
inn: gvwInAt("sea", 2, 0, 0, "a tea-house at Nangasac")
});
var GVW_ISLES = [[300, -210, 70, 12], [420, -330, 40, 9], [500, -420, 46, 11], [380, -460, 32, 7], [630, -570, 125, 24]];
function gvwJapanIn(x, z) { return Math.min(-380 - x, z - 260, 486 - z, x + 900); }
function gvwSeaH(x, z) { return __ZC(493, 59, this, arguments, new.target); }
function gvwIsleSet(on, pos) {
if (!GVW.scG)
return;
if (!on) {
if (GVW.isle) {
GVW.isle.visible = false;
}
return;
}
if (!GVW.isle || GVW.isle.parent !== GVW.scG) {
GVW.isle = gvwIslandModel(GVW.sc === "sea" ? 520 : 620);
GVW.scG.add(GVW.isle);
}
GVW.isle.visible = true;
GVW.isle.position.set(pos.x, pos.y, pos.z);
GVW.isle.userData.y0 = pos.y;
}
GVW_SCN.sea = { h: gvwSeaH, start: { x: 0, z: 2, ry: Math.PI }, wl: function () { return 0; },
build: function (G) { return __ZC(493, 60, this, arguments, new.target); } };
function gvwJapan(G, H) { return __ZC(493, 61, this, arguments, new.target); }
GVB_FOLK_AT.sea = [["tar1", 1.6, -3, 0, 2.2], ["tar2", -1.4, 6, Math.PI, 2.2]];
var GVW_LR = 646, GVW_LGAL = 6;
function gvwLapTop(r) { return 4 + 10 * Math.pow(Math.min(r, 600) / 640, 2); }
var GVW_BASINS = [[230, -20], [-230, -20], [170, -300], [-170, -300]];
function gvwLapH(x, z) { return __ZC(493, 62, this, arguments, new.target); }
Object.assign(GVW_AT, {
gallery: { sc: "laputa", x: 0, z: 626, name: "the lowest gallery, at the island's edge", ry: 0 },
stairs: { sc: "laputa", x: 0, z: 588, name: "the stairs to the top of the island" },
top: { sc: "laputa", x: 0, z: 540, name: "the top of the island" },
palace: { sc: "laputa", x: 0, z: -116, name: "the door of the royal palace" },
presence: gvwInAt("laputa", 0, 0, 6, "the chamber of presence", 0),
throne: gvwInAt("laputa", 0, 0, -8, "before the throne"),
dining: gvwInAt("laputa", 0, 12, -2, "the King's table"),
lodging: gvwInAt("laputa", 1, 0, 0, "your lodging", 0),
lodgedoor: { sc: "laputa", x: 120, z: 128, name: "the door of your lodging" },
tailor: gvwInAt("laputa", 2, 0, 0, "the tailor's"),
tailordoor: { sc: "laputa", x: 170, z: 86, name: "the tailor's door" },
music: gvwInAt("laputa", 3, 0, 0, "the music room of the court"),
musicdoor: { sc: "laputa", x: -130, z: 58, name: "the music room's door" },
lord: gvwInAt("laputa", 4, 0, 0, "the great lord's house"),
lorddoor: { sc: "laputa", x: -60, z: 252, name: "the great lord's door" },
basin1: { sc: "laputa", x: 182, z: -20, name: "a great basin" },
basin2: { sc: "laputa", x: -182, z: -20, name: "a great basin" },
chasm: { sc: "laputa", x: 0, z: 32, name: "the chasm at the centre" },
houses: { sc: "laputa", x: -160, z: 180, name: "the houses of Laputa" },
edge: { sc: "laputa", x: 420, z: 420, name: "the island's edge" },
packthread: { sc: "laputa", x: -440, z: 444, name: "the packthreads" },
fishers: { sc: "laputa", x: 300, z: 552, name: "the anglers' gallery" }
});
function gvwBelow(G, y) { return __ZC(493, 63, this, arguments, new.target); }
GVW_SCN.laputa = { h: gvwLapH, start: { x: 0, z: 540, ry: 0 }, edge: function (x, z) { return Math.hypot(x, z) > GVW_LR; },
wl: function (x, z) { for (var i = 0; i < 4; i++) {
var B = GVW_BASINS[i];
if (Math.hypot(x - B[0], z - B[1]) < 40)
return gvwLapTop(Math.hypot(B[0], B[1])) - 1.0;
} return null; },
build: function (G) { return __ZC(493, 64, this, arguments, new.target); } };
function gvwLapBusy(x, z) {
if (Math.abs(x) < 70 && z < -90 && z > -210)
return true;
if (Math.hypot(x + 130, z - 40) < 24)
return true;
if (Math.hypot(x, z) < 40)
return true;
for (var i = 0; i < 4; i++)
if (Math.hypot(x - GVW_BASINS[i][0], z - GVW_BASINS[i][1]) < 52)
return true;
return false;
}
function gvwDisc(P, R, rings, segs, hfn, mat, cfn) { return __ZC(493, 65, this, arguments, new.target); }
function gvwLapPalace(G, H) { return __ZC(493, 66, this, arguments, new.target); }
function gvwLapRooms(G) { return __ZC(493, 67, this, arguments, new.target); }
var GVW_TOWN = (function () {
var rings = [150, 300, 440], rad = [], sq = [];
for (var i = 0; i < 8; i++)
rad.push(Math.PI / 2 + i * Math.PI / 4);
[[220, 365], [-122, 73], [-113, -363], [-261, -215], [221, -420]].forEach(function (p) { sq.push({ x: p[0], z: p[1], r: 18 }); });
return { rings: rings, rad: rad, sq: sq, houses: [] };
})();
function gvwTownStreet(x, z, pad) {
pad = pad || 0;
var r = Math.hypot(x, z), T = GVW_TOWN;
for (var i = 0; i < T.rings.length; i++)
if (Math.abs(r - T.rings[i]) < 4 + pad)
return true;
if (r > 140 && r < 600) {
var a = Math.atan2(z, x);
for (var k = 0; k < T.rad.length; k++) {
var d = Math.abs(Math.sin(a - T.rad[k])) * r;
if (d < 4 + pad && Math.cos(a - T.rad[k]) > 0)
return true;
}
}
for (var q = 0; q < T.sq.length; q++)
if (Math.hypot(x - T.sq[q].x, z - T.sq[q].z) < T.sq[q].r + pad)
return true;
return false;
}
(function () {
if (typeof gvwLapBusy !== "function")
return;
var f = gvwLapBusy;
gvwLapBusy = function (x, z) {
if (f(x, z))
return true;
if (gvwTownStreet(x, z, 1))
return true;
var H = GVW_TOWN.houses;
for (var i = 0; i < H.length; i++) {
var h = H[i];
if (Math.abs(x - h.x) < h.rr && Math.abs(z - h.z) < h.rr)
return true;
}
return false;
};
})();
(function () {
var T = GVW_TOWN, R = wRand(7171), lite = typeof LITE !== "undefined" && !!LITE;
function ok(x, z, rr) {
var r = Math.hypot(x, z);
if (r < 170 && r > 0 && Math.abs(x) < 80 && z < -80)
return false;
if (r > 585)
return false;
if (gvwTownStreet(x, z, rr + 1))
return false;
for (var i = 0; i < 4; i++)
if (Math.hypot(x - GVW_BASINS[i][0], z - GVW_BASINS[i][1]) < 52 + rr)
return false;
if (Math.hypot(x + 130, z - 40) < 26 + rr)
return false;
if (Math.hypot(x, z) < 40 + rr)
return false;
for (var j = 0; j < T.houses.length; j++) {
var h = T.houses[j];
if (Math.hypot(x - h.x, z - h.z) < h.rr + rr + 2.5)
return false;
}
return true;
}
function add(x, z, ry) { var w = 7 + R() * 4, d = 6.5 + R() * 3, h = 5.5 + R() * 5, rr = Math.max(w, d) / 2 + 0.6; if (!ok(x, z, rr))
return; T.houses.push({ x: x, z: z, ry: ry, w: w, d: d, h: h, rr: rr, col: [0xE8DCC4, 0xD8C8E0, 0xC8D8E4, 0xE4D0B8, 0xF0E4D4, 0xD4E0C8][(R() * 6) | 0], la: 0.04 + R() * 0.09, lb: -(0.03 + R() * 0.07), seed: (R() * 1e6) | 0 }); }
T.rings.forEach(function (rg, ri) {
var step = lite ? 30 : 17, n = Math.floor(2 * Math.PI * rg / step);
for (var i = 0; i < n; i++) {
var a = i / n * 2 * Math.PI + ri * 0.11;
[-1, 1].forEach(function (sd) { if (ri === 0 && sd < 0)
return; var rr = rg + sd * 12; var x = Math.cos(a) * rr, z = Math.sin(a) * rr; add(x, z, Math.atan2(-x * sd, -z * sd)); });
}
});
T.rad.forEach(function (a) { for (var r = 175; r < 580; r += (lite ? 34 : 20)) {
[-1, 1].forEach(function (sd) { var px = -Math.sin(a) * sd * 12, pz = Math.cos(a) * sd * 12, x = Math.cos(a) * r + px, z = Math.sin(a) * r + pz; add(x, z, Math.atan2(-px, -pz)); });
} });
})();
function gvwTownMerge(list) { return __ZC(493, 68, this, arguments, new.target); }
function gvwTownPart(geo, M, col, uvm) { return __ZC(493, 69, this, arguments, new.target); }
function gvwTownMergePlain(list) { return __ZC(493, 70, this, arguments, new.target); }
function gvwTownMat(base) { var m = base.clone(); m.vertexColors = true; if (m.color)
m.color.setHex(0xFFFFFF); m.needsUpdate = true; return m; }
function gvwTownBuild(G) { return __ZC(493, 71, this, arguments, new.target); }
function gvwTownSquare(G, q, qi) { return __ZC(493, 72, this, arguments, new.target); }
(function () {
if (typeof GVW_SCN === "undefined" || !GVW_SCN.laputa)
return;
var b = GVW_SCN.laputa.build;
GVW_SCN.laputa.build = function (G) { var r = b.apply(this, arguments); try {
gvwTownBuild(G);
}
catch (e) {
if (window.console)
console.warn("[laputa] town", e);
} return r; };
})();
(function () {
if (typeof gvwMat !== "function")
return;
var TONE = { grass: [0x9AB078, 1], lawn: [0x8AA870, 1], paving: [0xA89E8E, 1], ashlar: [0xC4BCAC, 0], white: [0xCCC8C0, 0], marble: [0xCEC8BE, 0] };
var f = gvwMat;
gvwMat = function (k) {
var m = f.apply(this, arguments);
var T = TONE[k];
if (m && T && !m.userData.swTone) {
m.userData.swTone = 1;
m.color.setHex(T[0]);
if (T[1])
m.userData.realKind = "rubber";
m.needsUpdate = true;
}
return m;
};
})();
function gvwSweepGallery(G) { return __ZC(493, 73, this, arguments, new.target); }
(function () {
if (typeof GVW_SCN === "undefined" || !GVW_SCN.laputa)
return;
var D = GVW_SCN.laputa, b = D.build;
D.build = function (G) { var r = b.apply(this, arguments); try {
gvwSweepGallery(G);
}
catch (e) {
if (window.console)
console.warn("[laputa] sweep", e);
} return r; };
})();
var GVW_CAVE_R = 44;
Object.assign(GVW_AT, {
cavein: { sc: "cave", x: 0, z: 34, name: "the foot of the stair", ry: 0 },
loadstone: { sc: "cave", x: 0, z: 9, name: "the loadstone" },
lookout: { sc: "cave", x: 0, z: -11, y: 5.6, name: "the astronomers' platform by the stone" },
instruments: { sc: "cave", x: -20, z: -6, name: "the astronomers' instruments" },
catalogue: { sc: "cave", x: 20, z: -6, name: "the catalogue of the stars" },
marsglass: { sc: "cave", x: -14, z: -22, name: "the great glass trained on Mars" }
});
GVW_SCN.cave = { h: function () { return 0; }, start: { x: 0, z: 34, ry: 0 }, bake: true, edge: function (x, z) { return Math.hypot(x, z) > GVW_CAVE_R - 1.5; },
build: function (G) { return __ZC(493, 74, this, arguments, new.target); } };
GVB_FOLK_AT.cave = [["astro1", -3, 12, Math.PI], ["astro2", 16, -3, -Math.PI / 2]];
Object.assign(GVW_AT, {
landing: { sc: "balnibarbi", x: 0, z: 210, name: "the mountain where you are let down", ry: Math.PI },
lagado: { sc: "balnibarbi", x: 0, z: -60, name: "the city of Lagado" },
munodi: { sc: "balnibarbi", x: 60, z: -140, name: "Lord Munodi's house in town" },
munodiin: gvwInAt("balnibarbi", 15, 0, 0, "Lord Munodi's hall", 0),
gate: { sc: "balnibarbi", x: 0, z: -316, name: "the town gate" },
fields: { sc: "balnibarbi", x: 110, z: -420, name: "the fields outside Lagado" },
country: { sc: "balnibarbi", x: 400, z: -540, name: "Lord Munodi's country house" },
countryin: gvwInAt("balnibarbi", 16, 0, 0, "the hall of Munodi's country house", 0),
garden: { sc: "balnibarbi", x: 370, z: -500, name: "Lord Munodi's gardens" },
mill: { sc: "balnibarbi", x: 556, z: -588, name: "the old mill by the river" },
millin: gvwInAt("balnibarbi", 17, 0, 0, "inside the old mill"),
ruin: { sc: "balnibarbi", x: 700, z: -740, name: "the ruined building on the mountain" },
academy: { sc: "balnibarbi", x: -230, z: -28, name: "the Grand Academy of Lagado" },
warden: { sc: "balnibarbi", x: -230, z: -40, name: "the warden of the Academy" },
maldonada: { sc: "balnibarbi", x: -600, z: 480, name: "the port of Maldonada" },
mquay: { sc: "balnibarbi", x: -600, z: 552, y: 2.2, name: "the quay at Maldonada" },
minn: gvwInAt("balnibarbi", 21, 0, 0, "the inn at Maldonada", 0)
});
var GVW_ACAD = [
["sunbeams", "Sunbeams out of cucumbers"], ["ordure", "The great stink"], ["ice", "Ice into gunpowder"], ["roof", "Houses built from the roof down"], ["colours", "The blind man's colours"], ["hogs", "Ploughing with hogs"], ["spiders", "Silk from spiders"],
["dial", "The sundial on the weathercock"], ["bellows", "The bellows"], ["marble", "Marble for pincushions"], ["sheep", "Sheep without wool"], ["engine", "The Engine of words"], ["language", "The school of languages"], ["wafer", "The mathematical wafer"], ["politics", "The school of political projectors"]
];
GVW_ACAD.forEach(function (A, i) { GVW_AT["ac_" + A[0]] = gvwInAt("balnibarbi", i, 0, 0, A[1], 0); var east = i >= 8, k = east ? i - 8 : i; GVW_AT["acd_" + A[0]] = { sc: "balnibarbi", x: east ? -215.4 : -244.6, z: -60 - k * 26, name: "the door of " + A[1].toLowerCase() }; });
var GVW_RIVER = [[780, -800], [640, -660], [532, -602], [440, -470], [420, -200], [460, 100], [500, 400], [520, 640]];
var GVW_ROADS = [[[0, 200], [0, 40], [0, -320], [60, -400], [200, -480], [360, -520]], [[-60, -120], [-300, 120], [-500, 360], [-600, 470]], [[360, -520], [520, -580], [680, -720]]];
function gvwBalH(x, z) { return __ZC(493, 75, this, arguments, new.target); }
function gvwBalBusy(x, z) { if (Math.hypot(x, z + 130) < 250)
return true; if (Math.hypot(x - 400, z + 540) < 70)
return true; if (gvwPathD(x, z, GVW_RIVER) < 30)
return true; for (var i = 0; i < GVW_ROADS.length; i++)
if (gvwPathD(x, z, GVW_ROADS[i]) < 8)
return true; if (Math.hypot(x + 600, z - 480) < 110)
return true; return false; }
GVW_SCN.balnibarbi = { h: gvwBalH, start: { x: 0, z: 210, ry: Math.PI },
wl: function (x, z) { if (z > 540)
return 0; if (gvwPathD(x, z, GVW_RIVER) < 12)
return gvwBalH(x, z) + 1.4; return null; },
build: function (G) { return __ZC(493, 76, this, arguments, new.target); } };
function gvwManor(G, H, x, z, ry, slot, name, sc) { return __ZC(493, 77, this, arguments, new.target); }
function gvwLagado(G, H, R) { return __ZC(493, 78, this, arguments, new.target); }
function gvwAcademy(G, H) { return __ZC(493, 79, this, arguments, new.target); }
function gvwBeast(P, kind, x, z, ry, y) { return __ZC(493, 80, this, arguments, new.target); }
function gvwAcadFill(g, k, A) { return __ZC(493, 81, this, arguments, new.target); }
function gvwEstate(G, H, R) { return __ZC(493, 82, this, arguments, new.target); }
function gvwMills(G, H) { return __ZC(493, 83, this, arguments, new.target); }
function gvwMaldonada(G, H, R) { return __ZC(493, 84, this, arguments, new.target); }
function gvwHouseB(G, x, z, w, d, h, ry, o) { return __ZC(493, 85, this, arguments, new.target); }
GVB_FOLK_AT.balnibarbi = [["munodi", 60, -140, 0], ["warden", -230, -44, 0]];
Object.assign(GVW_AT, {
glanding: { sc: "glubb", x: 0, z: 418, name: "the landing on Glubbdubdrib", ry: Math.PI },
gtown: { sc: "glubb", x: 150, z: 300, name: "the town" },
glodge: gvwInAt("glubb", 2, 0, 0, "your lodging in the town", 0),
gwall: { sc: "glubb", x: 0, z: 192, name: "the gate of the park" },
gpalace: { sc: "glubb", x: 0, z: -12, name: "the door of the governor's palace" },
ghall: gvwInAt("glubb", 0, 0, 2, "the governor's chamber of presence", 0),
gthrone: gvwInAt("glubb", 0, 0, -8, "the steps of the governor's throne"),
gchamber: gvwInAt("glubb", 1, 0, 0, "the chamber over the park", 0),
gwindow: gvwInAt("glubb", 1, 0, -5, "the window over the park"),
gpark: { sc: "glubb", x: -110, z: -150, name: "the great field of the park" },
gfield: { sc: "glubb", x: -60, z: -120, name: "the field under the window" }
});
var GVW_GR = 436;
function gvwGlubbH(x, z) {
var r = Math.hypot(x * 1.05, z), n = gvwFbm(x * 0.01, z * 0.01, 3);
var h = 3 + n * 8 + gvwSmooth(300, 0, Math.hypot(x + 200, z - 60)) * 18;
h = h + (-7 - h) * gvwSmooth(GVW_GR - 30, GVW_GR + 10, r);
var pd = Math.max(Math.abs(x) - 230, z - 190, -270 - z);
h = h + (4 - h) * 0.85 * gvwSmooth(50, 0, pd);
return h;
}
GVW_SCN.glubb = { h: gvwGlubbH, start: { x: 0, z: 418, ry: Math.PI }, wl: function (x, z) { return Math.hypot(x * 1.05, z) > GVW_GR - 12 ? 0 : null; },
build: function (G) { return __ZC(493, 86, this, arguments, new.target); } };
function gvwGlubbRooms(G) { return __ZC(493, 87, this, arguments, new.target); }
GVB_FOLK_AT.glubb = [];
Object.assign(GVW_AT, {
clumegnig: { sc: "luggnagg", x: 250, z: 470, y: 2.2, name: "the port of Clumegnig", ry: Math.PI },
custom: gvwInAt("luggnagg", 0, 0, 0, "the custom-house", 0),
customdoor: { sc: "luggnagg", x: 226, z: 420, name: "the door of the custom-house" },
lodgeL: gvwInAt("luggnagg", 1, 0, 0, "your lodging, with a sentry at the door", 0),
road: { sc: "luggnagg", x: 120, z: 160, name: "the road to the court" },
traldragdubh: { sc: "luggnagg", x: 0, z: -130, name: "Traldragdubh, the royal city" },
court: { sc: "luggnagg", x: 0, z: -232, name: "the gate of the king's palace" },
throneL: gvwInAt("luggnagg", 2, 0, -6, "before the throne of Luggnagg"),
throneIn: gvwInAt("luggnagg", 2, 0, 8, "the door of the throne room", 0),
courtlodge: gvwInAt("luggnagg", 3, 0, 0, "your lodging at court", 0),
townL: { sc: "luggnagg", x: -110, z: -110, name: "the town" },
quality: gvwInAt("luggnagg", 4, 0, 0, "a house of quality in Traldragdubh", 0),
struld: { sc: "luggnagg", x: -170, z: -160, name: "where the struldbrugs sit" },
glanguen: { sc: "luggnagg", x: -300, z: 470, y: 2.2, name: "the royal port of Glanguenstald", ry: Math.PI }
});
var GVW_LRIV = [[350, 560], [330, 440], [220, 300], [160, 140], [60, 40], [-40, -60], [-120, -300], [-160, -600]];
function gvwLugH(x, z) { return __ZC(493, 88, this, arguments, new.target); }
GVW_SCN.luggnagg = { h: gvwLugH, start: { x: 250, z: 470, ry: Math.PI },
wl: function (x, z) { if (z > 466)
return 0; if (gvwPathD(x, z, GVW_LRIV) < 10)
return gvwLugH(x, z) + 1.4; return null; },
build: function (G) { return __ZC(493, 89, this, arguments, new.target); } };
function gvwLugRooms(G) { return __ZC(493, 90, this, arguments, new.target); }
function lite2() { return gvwLite(); }
GVB_FOLK_AT.luggnagg = [["interp", 252, 462, Math.PI]];
var GVW_ROOMS = [];
function gvwRoom(sc, x0, x1, z0, z1, env) { GVW_ROOMS.push({ sc: sc, x0: x0, x1: x1, z0: z0, z1: z1, env: env || "indoor" }); }
function gvwRoomAt(x, z) { for (var i = 0; i < GVW_ROOMS.length; i++) {
var R = GVW_ROOMS[i];
if (R.sc === GVW.sc && x > R.x0 && x < R.x1 && z > R.z0 && z < R.z1)
return R;
} return null; }
function gvwEnvNow() { return __ZC(493, 91, this, arguments, new.target); }
function gvwBlockL(x, z, feet) { return __ZC(493, 92, this, arguments, new.target); }
function gvwPlaceName(L) { var best = null, bd = 1e9; for (var k in GVW_AT) {
var A = GVW_AT[k];
if (A.sc !== GVW.sc)
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A;
}
} return best && bd < 70 ? best.name : gvwSc().name; }
function gvwTick(dt) { return __ZC(493, 93, this, arguments, new.target); }
function gvwBuild(G) { GVW.G = G; GVW.lite = gvwLite(); GVW.built = true; }
if (typeof worldDef === "function")
worldDef(GVW_KEY, {
base: GVW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return gvwEnvNow(); },
build: function (G) { gvwBuild(G); },
enter: function (opt) { return __ZC(493, 94, this, arguments, new.target); },
leave: function () { GVW.ride = null; GVW.moving = false; if (GVW.veil)
GVW.veil.style.opacity = "0"; if (typeof gvbLeave === "function")
try {
gvbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = gvwSc(); return gvwGround(x - S.x, z, feet); },
block: function (x, z, feet) { var S = gvwSc(); return gvwBlockL(x - S.x, z, feet); },
tick: function (dt) { gvwTick(dt); },
back: function () { var D = GVW_SCN[GVW.sc]; gvwGo(D && D.start ? { sc: GVW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "deck"); }
});
function gvwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(GVW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(GVW_KEY) < 0)
WLG.keys.push(GVW_KEY);
function gvwForget() { return __ZC(493, 95, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === GVW_KEY)
gvwForget(); return r; }; })();
(function () { var d0 = gvwSceneDrop; gvwSceneDrop = function () { d0.apply(this, arguments); GVW.lights = 0; GVW.ghosts = []; GVW.ships = []; GVW.flappers = []; GVW.isle = null; GVW.stone = null; GVW_ROOMS.length = 0; }; })();
function gvwFromChain() { try {
worldCard(null);
}
catch (e) { } gvwEnter({}); }
var GVB_CH = [];
var GVB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var GVB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function gvbS() { if (!store.gvbook)
store.gvbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.gvbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function gvbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function gvbStep() { var S = gvbS(), C = GVB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function gvbActive() { var S = gvbS(); return !!(S.started && !S.done && WLD.on === GVW_KEY); }
function gvbKey() { var S = gvbS(); return S.done ? "done" : S.ch + "." + S.s; }
function gvbSay(h) { setStatus(h); }
function gvbQ(s) { return gvQ(s); }
function gvbQs() { return gvQs.apply(null, arguments); }
function gvbPos(at) { return __ZC(493, 96, this, arguments, new.target); }
function gvbScName(k) { return (GVW_SC[k] || {}).name || k; }
function gvbWay(P, L) { return __ZC(493, 97, this, arguments, new.target); }
function gvbBeam() { return __ZC(493, 98, this, arguments, new.target); }
function gvbItemMesh(kind) { return __ZC(493, 99, this, arguments, new.target); }
function gvbItemsClear() { GVB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = GVW.spots.indexOf(I.S); if (j >= 0)
GVW.spots.splice(j, 1); }); GVB.items = []; }
function gvbItemAdd(kind, P, name, verb, onTake) { return __ZC(493, 100, this, arguments, new.target); }
var GVB_TUNES = { sea: "assets/verne/moonlight.mp3", isle: "assets/neverland/morning-mood.mp3", laputa: "assets/grimm/nachtmusik.mp3", cave: "assets/verne/toccata.mp3", lagado: "assets/westminster/baker-street-air.mp3", academy: "assets/neverland/mountain-king.mp3", ghosts: "assets/poe/funeral.mp3", luggnagg: "assets/erebos/gymnopedie.mp3", end: "assets/erebos/hymn-to-the-sun.mp3" };
function gvbTune(k) { return __ZC(493, 101, this, arguments, new.target); }
function gvbText(fn) { return __ZC(493, 102, this, arguments, new.target); }
function gvbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function gvbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var GVB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>Jonathan Swift's own words, as printed (Project Gutenberg's text).</div>";
function gvbReadAll(i) { return __ZC(493, 103, this, arguments, new.target); }
function gvbChapterCard() { return __ZC(493, 104, this, arguments, new.target); }
function gvbKeeperBtns(fns) { return __ZC(493, 105, this, arguments, new.target); }
function gvbJump(i) { var S = gvbS(); S.ch = Math.max(0, Math.min(GVB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; gvbSave(); gvbChapterBegin(true); }
function gvbStV(v) { return typeof v === "function" ? v(gvbS().s) : v; }
function gvbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function gvbWorldState() {
var S = gvbS(), C = GVB_CH[S.ch] || {}, st = C.state || {};
GVW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
GVW.envK = gvbStV(st.env) || null;
if (typeof gvwStateApply === "function")
try {
gvwStateApply(st, S.s);
}
catch (e) { }
worldEnv(gvwEnvNow());
}
function gvbChapterBegin(place) { return __ZC(493, 106, this, arguments, new.target); }
function gvbStepBegin() { return __ZC(493, 107, this, arguments, new.target); }
function gvbPuzzleCard(b) { return __ZC(493, 108, this, arguments, new.target); }
function gvbStepDone() { return __ZC(493, 109, this, arguments, new.target); }
function gvbFinish() { return __ZC(493, 110, this, arguments, new.target); }
function gvbCastName(c) { return c.name || (GVW_FOLK[c.k] || {}).name || c.k; }
function gvbCastLive(C) { return !!(C && C.g && C.g.parent); }
function gvbCastAdd(c) { return __ZC(493, 111, this, arguments, new.target); }
function gvbCastHide(key) { var C = GVB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); GVW.talk = GVW.talk.filter(function (T) { return T.p !== C.P; }); GVW.people = GVW.people.filter(function (p) { return p !== C.P; }); delete GVB.cast[key]; }
function gvbCastClear() { for (var k in GVB.cast)
gvbCastHide(k); GVB.cast = {}; }
function gvbCastMove(key, at, ry) { var C = GVB.cast[key]; if (!C)
return; var P = gvbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : gvwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function gvbCastTick() { return __ZC(493, 112, this, arguments, new.target); }
function gvbPopulate() { return __ZC(493, 113, this, arguments, new.target); }
function gvbCastHere(C) { return (C.cast || []).some(function (c) { var P = gvbPos(c.at); return P && P.sc === GVW.sc; }); }
function gvbChapterSc(C) { var P = C && C.start ? gvbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function gvbSceneDrop() { GVB.beam = null; GVB.items = []; GVB.cast = {}; }
function gvbHeard(kind) { GVB.rew[kind] = (GVB.rew[kind] || 0) + 1; }
function gvbNote(kind, title) { gvbHeard(kind); if (title)
gvbHeard("tale:" + title); }
function gvbTalk(T) { return __ZC(493, 114, this, arguments, new.target); }
function gvbSpot(S) { if (!gvbActive() || S.gvb)
return; var b = gvbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = gvbKey(); setTimeout(function () { if (gvbKey() === k)
gvbStepDone(); }, b.wait || 400); }
function gvbIdlePrompt() { worldPrompt("🏝️ <b>Gulliver's Travels</b> · <b>press E</b> for the book", gvbOpen); }
function gvbTick(dt, L) { return __ZC(493, 115, this, arguments, new.target); }
function gvbOpen() { return __ZC(493, 116, this, arguments, new.target); }
function gvbBegin() { var S = gvbS(); S.started = 1; gvbSave(); if (WLD.on !== GVW_KEY) {
gvwEnter({});
return;
} gvbChapterBegin(true); }
function gvbStartAt() { var S = gvbS(); if (S.started && !S.done) {
var C = GVB_CH[S.ch], P = C && C.start ? gvbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function gvbEnter(opt) { var S = gvbS(); setTimeout(function () { if (WLD.on !== GVW_KEY)
return; if (S.started && !S.done)
gvbChapterBegin(false);
else {
gvbWorldState();
gvbPopulate();
if (!S.started)
gvbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function gvbLeave() { gvbTune(null); gvbItemsClear(); GVB.cast = {}; GVB.beam = null; GVW.bannerBook = false; }
function gzGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function gzTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function gzSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function gzRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function gzFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function gzGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function gzHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function gzUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function gzPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function gzRead(title, html, btn, o) { return gzPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function gzReadA(title, adult, young, btn, o) { var r = gzRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = gvbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function gzMove(at, msg) { return function () { gvwGo(at, msg || null, gvbPopulate); }; }
function gvbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function gvbCh(C) {
var R = function (v) { return typeof v === "string" ? gvbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
GVB_CH.push(C);
return C;
}
function gvbStepAt(id) { var C = GVB_CH[gvbS().ch]; return C ? gvbS().s >= gvbIdx(C, id) : false; }
function gzId(id, step) { step.id = id; return step; }
(function () { var a0 = gvbCastAdd; gvbCastAdd = function (c) { var C = a0.apply(this, arguments); if (C && C.g && !C.g.userData.gvx) {
C.g.userData.gvx = 1;
if (c.ghost) {
gvwGhostly(C.g);
C.g.userData.live = 1;
}
if (c.mark)
gvwSpotMark(C.g);
if (c.tilt)
gvwTilt(C.g, 0.2);
if (c.flail)
gvwFlail(C.g);
} return C; }; })();
var GVW_ISLE_AT = { far: { x: 2200, y: 900, z: -2600 }, come: { x: 1100, y: 300, z: -1500 }, over: { x: 630, y: 118, z: -1124 }, up: { x: 630, y: 400, z: -1124 } };
function gvwStateApply(st, s) { return __ZC(493, 117, this, arguments, new.target); }
(function () { var d0 = gvwSceneDrop; gvwSceneDrop = function () { d0.apply(this, arguments); GVW.seatA = null; GVW.seatB = null; GVW.sloop = null; GVW.gserv = null; GVW.armyG = null; GVW.armyK = null; GVW.engine = null; GVW.wheel = null; GVW.back = {}; }; })();
(function () { var t0 = gvwTick; gvwTick = function (dt) { t0.apply(this, arguments); if (GVW.wheel)
GVW.wheel.rotation.x += dt * 0.5; }; })();
(function () { var s0 = gvwScene; gvwScene = function (k) { var was = GVW.scBuilt; s0.apply(this, arguments); if (was !== GVW.scBuilt && typeof gvbWorldState === "function")
try {
gvbWorldState();
}
catch (e) { } }; })();
function gvwChainUp(msg) { gvwGo("gallery", msg || "⛓️ <b>Drawn up by pulleys</b> on the seat at the end of the chain, to the lowest gallery of the flying island.", gvbPopulate); }
function gvc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
function gsrc(ch) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>Jonathan Swift, Gulliver's Travels (1726), Part III" + (ch ? ", Chapter " + ch : "") + "</div>"; }
function gIn(sc, i, dx, dz) { var A = gvwInAt(sc, i, dx, dz); return { sc: A.sc, x: A.x, z: A.z, y: A.y }; }
function lpuSeaAt(x, z, y) { return { sc: "sea", x: x, z: z, y: y }; }
function gL(x, z, y) { return { sc: "laputa", x: x, z: z, y: y }; }
function lpuBalAt(x, z, y) { return { sc: "balnibarbi", x: x, z: z, y: y }; }
function gzSpotAt(name, verb, at, h, fn, o) { o = o || {}; return gzSpot(name, h, Object.assign({ at: at, on: function () { var P = gvbPos(at); if (!P || P.sc !== GVW.sc)
return; if (GVW.spots.some(function (s) { return s.name === name; }))
return; gvwSpot(P.x, P.z, o.r || 2, name, verb, fn || function () { }, P.y != null ? P.y : gvwGround(P.x, P.z, 500)); } }, o)); }
function gzMoveRead(title, html, btn, to, msg, o) { return gzRead(title, html, btn, Object.assign({ done: gzMove(to, msg) }, o || {})); }
Object.assign(GVW_FOLK, {
robinson: { name: "Captain William Robinson", dress: "gvsea", sex: "m", beard: "full", hair: 0x8A6A4A, persona: "dutchcap", greet: "Well met, Mr. Gulliver! Settled for life, are you? I think not." },
wife: { name: "Mrs. Mary Gulliver", dress: "gvlady", sex: "f", hair: 0x5A3A2A, persona: "townsman", greet: "Again, Lemuel? The children will hardly know you." },
lapq: { name: "A Laputian of quality", dress: "gvlaputan", sex: "m", beard: "full", hair: 0xA8A8A8, persona: "laputan", greet: "(He looks at you with one eye; the other stares up at the zenith. His flapper strikes his mouth.) Ah. A stranger." },
page: { name: "A page with a flap", dress: "gvflap", sex: "m", hair: 0x3A2A1A, persona: "flapper", greet: "Shall I flap your ear, sir? No? (He looks at you with pity.)" },
ladyL: { name: "A lady of the court", dress: "gvlaputana", sex: "f", hair: 0x4A2A1A, persona: "laputana", greet: "You have been to the world below! Is Lagado gay? I would give anything to see it." },
diner: { name: "A person of quality at dinner", dress: "gvlaputan", sex: "m", hair: 0x6A5A4A, persona: "laputan", greet: "(Flapped on the mouth by his servant.) This, sir, is a rhomboides. Of beef." }
});
GVW_FOLK.king.dress = "gvlaputan";
var GC1 = gvbCh({ t: "Taken by pirates; the island in the air", txt: 0, start: { sc: "sea", x: gvwInAt("sea", 0).x, z: gvwInAt("sea", 0).z + 2, y: GVW_IN_Y, ry: 0 }, jump: 1, tune: "sea", keep: ["pocketglass", "Your pocket perspective", "🔭"],
state: { env: function (s) { return s >= gvbIdx(GC1, "storm") && s < gvbIdx(GC1, "calm") ? "storm" : null; }, isle: function (s) { return s >= gvbIdx(GC1, "over") ? "over" : s >= gvbIdx(GC1, "come") ? "come" : null; }, seat: function (s) { return s >= gvbIdx(GC1, "chain"); }, sloop: function (s) { return true; } },
words: "Redriff, on the Thames, 1706. You are Lemuel Gulliver, a surgeon, home ten days from your last voyage. An old friend comes to the door with an offer.",
intro: "Your house at Redriff",
cast: [gvc("robinson", gIn("sea", 0, -2, -1), { ry: Math.PI / 2, until: "sail" }), gvc("wife", gIn("sea", 0, 2.5, -2), { ry: -Math.PI / 2, until: "sail" }),
gvc("tar2", lpuSeaAt(-1.4, 4, 2.2), { ry: Math.PI, from: "sail", until: "adrift" }), gvc("tar1", lpuSeaAt(1.6, -2, 2.2), { from: "sail", until: "adrift" }),
gvc("dutch", lpuSeaAt(1.2, 1, 2.2), { ry: -Math.PI / 2, from: "pirates", until: "adrift" }), gvc("pirate", lpuSeaAt(-1.2, -1, 2.2), { ry: Math.PI / 2, from: "pirates", until: "adrift" })],
steps: [
{ k: "read" },
gzTalk("Captain William Robinson", "Captain Robinson has come to call: hear him out", ["⚓ An old friend", gvbQs("I had not been at home above ten days, when Captain William Robinson, a Cornish man, commander of the Hopewell, a stout ship of three hundred tons, came to my house.", "that he intended a voyage to the East Indies in two months,") + gsrc("I"), "▶ He makes his offer"]),
gzPuzzle("💼 The offer", "What does Captain Robinson offer you, to come as surgeon of the Hopewell?", ["A share of the ship", "Another surgeon under you, and double the usual pay", "The command of the ship"], 1, ["He owns a fourth part himself; he offers you none.", "", "He keeps the command, but promises to follow your advice."], { yes: "💼 " + gvQ("that my salary should be double to the usual pay;") }),
gzTalk("Mrs. Mary Gulliver", "Persuade your wife", ["🏠 The only difficulty", gvbQs("The only difficulty that remained, was to persuade my wife, whose consent however I at last obtained, by the prospect of advantage she proposed to her children.") + gsrc("I"), "▶ Pack your sea-chest"]),
gzId("sail", gzMoveRead("⛵ To Tonquin", gvbQs("We set out the 5th day of August, 1706, and arrived at Fort St. George the 11th of April, 1707.", "he bought a sloop, loaded it with several sorts of goods, wherewith the Tonquinese usually trade to the neighbouring islands, and putting fourteen men on board, whereof three were of the country, he appointed me master of the sloop") + gsrc("I"), "▶ Take command of the sloop", "deck", "⛵ <b>The sloop</b>, deep laden, off Tonquin. She is yours to command.")),
gzGo("helm", "Go up to the sloop's quarterdeck: she is yours", { r: 3 }),
gzTalk("The sloop's boatswain", "Speak with your boatswain about the goods and the men", ["⚓ Your crew", "\"Fourteen of us, sir, and three of the country. Deep laden: she'll sail slow.\" " + gvQ("he appointed me master of the sloop, and gave me power to traffic, while he transacted his affairs at Tonquin.") + gsrc("I"), "▶ Make sail"]),
gzId("storm", gzRead("🌧️ A great storm", gvbQs("We had not sailed above three days, when a great storm arising, we were driven five days to the north-north-east, and then to the east") + gsrc("I"), "▶ Hold on")),
gzHold("rail", 8, "Hold fast at the rail while the storm drives you", { r: 3 }),
gzPuzzle("🧭 Where has the storm driven you?", "Five days of storm, then fair weather with a strong gale from the west. Which way have you been driven?", ["South, toward the Line", "North-north-east, and then east", "Back west, toward Tonquin"], 1, ["The storm carried you the other way.", "", "A west wind would never take you west."], { yes: "🧭 North-north-east, then east: far into seas no Englishman knows." }),
gzId("calm", gzRead("🏴 Two sail to windward", gvbQs("Upon the tenth day we were chased by two pirates, who soon overtook us; for my sloop was so deep laden, that she sailed very slow, neither were we in a condition to defend ourselves.") + gsrc("I"), "▶ What do you order?")),
gzPuzzle("🏴 Boarded", "Both pirates are alongside. Fourteen men in a deep-laden sloop cannot fight two ships. What order do you give?", ["Fight to the last man", "Everyone lie prostrate upon their faces", "Jump overboard and swim"], 1, ["You would all be killed.", "", "There is no land within sight."], { yes: "🏴 " + gvQ("finding us all prostrate upon our faces (for so I gave order), they pinioned us with strong ropes") }),
gzId("pirates", gzTalk("The Dutchman", "A Dutchman among the pirates is shouting at you", ["😠 The malice of a Dutchman", gvbQs("I observed among them a Dutchman, who seemed to be of some authority, though he was not commander of either ship.", "swore we should be tied back to back and thrown into the sea.") + gsrc("I"), "▶ Answer him in Dutch"])),
gzPuzzle("🗣️ You answer him", "You speak Dutch tolerably well. What do you beg of him?", ["Gold, for your freedom", "That as Christians and Protestants of allied countries, he move the captains to pity", "That he fight you man to man"], 1, ["You have nothing left to offer: they have searched the sloop.", "", "You are pinioned with strong ropes."], { yes: "🗣️ " + gvQ("This inflamed his rage; he repeated his threatenings") }),
gzTalk("The Japanese captain", "The Japanese captain of the larger ship comes up to you", ["🗡️ The Japanese captain", gvbQs("The largest of the two pirate ships was commanded by a Japanese captain, who spoke a little Dutch, but very imperfectly.", "we should not die.", "I was sorry to find more mercy in a heathen, than in a brother christian.") + gsrc("I"), "▶ Too late, you regret those words"]),
gzId("adrift", gzMoveRead("🛶 Set adrift", gvbQs("it was determined that I should be set adrift in a small canoe, with paddles and a sail, and four days' provisions; which last, the Japanese captain was so kind to double out of his own stores, and would permit no man to search me.", "When I was at some distance from the pirates, I discovered, by my pocket-glass, several islands to the south-east.") + gsrc("I"), "▶ Sail for the nearest island", "isle1", "🛶 <b>The first island.</b> About three hours under sail. All rock.")),
gzGather("egg", "isle1b", 5, "A bird's egg", "Gather birds' eggs on the rocks", { spread: 14, eachSay: "🥚 An egg." }),
gzGather("wood", "isle1", 3, "Dry heath and sea-weed", "Gather heath and dry sea-weed for a fire", { spread: 10, eachSay: "🌿 Fuel." }),
gzHold("isle1", 8, "Strike fire, roast your eggs, and sleep under the shelter of a rock", { r: 5, on: function () { var P = gvbPos("isle1"); if (P && GVW.sc === "sea" && !GVW.camp) {
GVW.camp = gvwFire(GVW.scG, P.x + 2, gvwSeaH(P.x + 2, P.z), P.z, 0.7);
} }, say: "🔥 " + gvQ("I passed the night under the shelter of a rock, strewing some heath under me, and slept pretty well.") }),
gzMoveRead("🛶 Island to island", gvbQs("The next day I sailed to another island, and thence to a third and fourth, sometimes using my sail, and sometimes my paddles.", "on the fifth day I arrived at the last island in my sight, which lay south-south-east to the former.") + gsrc("I"), "▶ Look for a place to land", "creek", "🛶 <b>A small creek</b>, about three times the wideness of your canoe."),
gzGo("cave5", "Climb to the caves and secure your provisions in one", { r: 4 }),
gzGather("fern", "creek", 4, "Dry sea-weed and parched grass", "Gather sea-weed and parched grass for tomorrow's fire, and for a bed", { spread: 16, eachSay: "🌾 Gathered." }),
gzHold("cave5", 8, "Lie down in the cave on the dry grass and sea-weed", { r: 4, say: "😟 " + gvQ("I slept very little, for the disquiets of my mind prevailed over my weariness, and kept me awake.") }),
gzId("come", gzGo("height", "Walk among the rocks to the height of the island", { r: 6 })),
gzHold("height", 10, "Something hides the sun: watch it", { r: 8, say: "🌑 " + gvQ("I turned back, and perceived a vast opaque body between me and the sun moving forwards towards the island") }),
gzPuzzle("🔭 Through your pocket perspective", "You take out your pocket perspective and look. What is it?", ["A cloud of strange shape", "An island in the air, with people moving up and down its sloping sides", "A great bird"], 1, ["It is a firm substance, the bottom flat, smooth and shining.", "", "It does not flap: it hangs, and it is enormous."], { yes: "🏝️ " + gvQ("to behold an island in the air, inhabited by men, who were able (as it should seem) to raise or sink, or put it into progressive motion, as they pleased.") }),
gzId("over", gzPuzzle("👋 Make them see you", "The island comes nearer: galleries down its sides, people fishing with long angling rods from the lowest. How do you make them see you?", ["Light your fire again and hope", "Wave your cap and handkerchief, and call and shout", "Hide in the cave"], 1, ["Your fuel is for your supper.", "", "They might pass you by."], { yes: "👋 " + gvQ("I waved my cap (for my hat was long since worn out) and my handkerchief toward the island; and upon its nearer approach, I called and shouted with the utmost strength of my voice") })),
gzRead("🗣️ A clear, polite, smooth dialect", gvbQs("At length one of them called out in a clear, polite, smooth dialect, not unlike in sound to the Italian: and therefore I returned an answer in that language, hoping at least that the cadence might be more agreeable to his ears.", "They made signs for me to come down from the rock, and go towards the shore") + gsrc("I"), "▶ Go down towards the shore"),
gzId("chain", gzSpotAt("The seat on the chain", "sit on it", lpuSeaAt(630, -603), "The chain is let down from the lowest gallery with a seat at the end: sit on it", function () { setTimeout(function () { gvwChainUp(); }, 500); }, { say: "⛓️ " + gvQ("a chain was let down from the lowest gallery, with a seat fastened to the bottom, to which I fixed myself, and was drawn up by pulleys.") }))
] });
var GC2 = gvbCh({ t: "Laputa and its people", txt: 1, start: "gallery", jump: 1, tune: "laputa", keep: ["flapper", "A flapper's blown bladder", "🎈"], state: {},
words: "The lowest gallery of the flying island. A crowd is about you, and you have never seen a race of mortals so singular in their shapes, habits and countenances.",
intro: "Drawn up into the flying island",
cast: [gvc("lapq", gL(3, 622), { ry: Math.PI, until: "stairs", tilt: 1 }), gvc("page", gL(4.4, 623), { key: "fl1", until: "stairs", flail: 1, ry: Math.PI }),
gvc("king", gIn("laputa", 0, 0, -13.2), { ry: 0, y: GVW_IN_Y + 0.6, tilt: 1 }), gvc("page", gIn("laputa", 0, -1.6, -12.6), { key: "pg1", flail: 1, mute: 1 }), gvc("page", gIn("laputa", 0, 1.6, -12.6), { key: "pg2", flail: 1, ry: 0 }),
gvc("diner", gIn("laputa", 0, 10.2, -4), { ry: Math.PI / 2, tilt: 1 }), gvc("tutor", gIn("laputa", 1, -1.4, -0.4), { ry: Math.PI / 2, tilt: 1 }), gvc("tailor", gIn("laputa", 2, 1, -2), { ry: Math.PI, tilt: 1 }), gvc("ladyL", gL(-128, 64), { ry: Math.PI })],
steps: [
{ k: "read" },
gzTalk("A Laputian of quality", "Look at the people about you: speak to the gentleman of quality", ["👀 Heads reclined", gvbQs("Their heads were all reclined, either to the right, or the left; one of their eyes turned inward, and the other directly up to the zenith.", "Their outward garments were adorned with the figures of suns, moons, and stars; interwoven with those of fiddles, flutes, harps, trumpets, guitars, harpsichords, and many other instruments of music, unknown to us in Europe.") + gsrc("II"), "▶ What are the servants carrying?"]),
gzPuzzle("🎈 The bladders", "Servants carry \"a blown bladder, fastened like a flail to the end of a stick\". What is it for?", ["To keep flies away", "To flap the mouths and ears of their masters, so they will speak and listen", "To beat carpets"], 1, ["There are no flies on Laputa that anyone notices.", "", "Carpets, here? The floors are not even level."], { yes: "🎈 " + gvQ("those persons who are able to afford it always keep a flapper (the original is _climenole_) in their family") }),
gzTalk("A page with a flap", "Watch a flapper at work", ["🎈 The flapper's office", gvbQs("gently to strike with his bladder the mouth of him who is to speak, and the right ear of him or them to whom the speaker addresses himself.", "he is always so wrapped up in cogitation, that he is in manifest danger of falling down every precipice") + gsrc("II"), "▶ They lead you up"]),
gzId("stairs", gzGo("stairs", "Go up the stairs to the top of the island", { r: 6 })),
gzHold("top", 6, "Wait at the top: your guides have forgotten what they were about", { r: 8, say: "😶 " + gvQ("While we were ascending, they forgot several times what they were about, and left me to myself, till their memories were again roused by their flappers") }),
gzGo("palace", "Walk across the island to the royal palace", { r: 6 }),
gzSpot("The door of the royal palace", "Go in at the palace door", { at: "palace" }),
gzHold("throne", 10, "Stand before the throne: the King is deep in a problem, and takes not the least notice", { r: 5, say: "👑 " + gvQ("But he was then deep in a problem; and we attended at least an hour, before he could solve it.") }),
gzTalk("The King of Laputa", "The pages flap the King awake: be presented", ["👑 The King of Laputa", gvbQs("Before the throne, was a large table filled with globes and spheres, and mathematical instruments of all kinds.", "one of them gently struck his mouth, and the other his right ear; at which he startled like one awaked on the sudden") + gsrc("II"), "▶ A young man with a flap comes to your side"]),
gzPuzzle("🎈 A flap for you", "A young man flaps you gently on the right ear. What do you do?", ["Thank him, and let him go on", "Make signs that you have no need of such an instrument", "Flap him back"], 1, ["You let him; but that is not what Gulliver did.", "", "Not at court!"], { yes: "🎈 " + gvQ("which, as I afterwards found, gave his majesty, and the whole court, a very mean opinion of my understanding.") }),
gzGo("dining", "Dinner is brought: go to the table", { r: 4 }),
gzTalk("A person of quality at dinner", "Dine with the persons of quality", ["🍽️ Two courses", gvbQs("In the first course, there was a shoulder of mutton cut into an equilateral triangle, a piece of beef into a rhomboides, and a pudding into a cycloid.", "The second course was two ducks trussed up in the form of fiddles; sausages and puddings resembling flutes and hautboys, and a breast of veal in the shape of a harp.") + gsrc("II"), "▶ Ask the names of things"]),
gzPuzzle("🥧 Name the dish", "Your neighbour, flapped on the mouth, points to the pudding. What figure is it cut into?", ["A triangle", "A cycloid", "A harp"], 1, ["The triangle is the mutton.", "", "The harp is the veal."], { yes: "🥧 A cycloid. " + gvQ("I was soon able to call for bread and drink, or whatever else I wanted.") }),
gzGo("lodgedoor", "Go to the lodging the King has given you", { r: 5 }),
gzSpot("The door of your lodging", "Go in", { at: "lodgedoor" }),
gzTalk("Your tutor", "Your tutor has come with pen, ink and paper, and books", ["📚 Four hours of words", gvbQs("We sat together four hours, in which time I wrote down a great number of words in columns, with the translations over against them", "He showed me also, in one of his books, the figures of the sun, moon, and stars, the zodiac, the tropics, and polar circles") + gsrc("II"), "▶ Ask him what Laputa means"]),
gzPuzzle("📖 The word Laputa", "\"Lap, in the old obsolete language, signifies high; and untuh, a governor.\" So what do the Laputians say Laputa comes from?", ["High governor", "Flying stone", "Floating garden"], 0, ["", "Not in any language you have learnt.", "Not that either."], { yes: "📖 " + gvQ("from which they say, by corruption, was derived _Laputa_") }),
gzGo("tailordoor", "The tailor has come to measure you: go to his shop", { r: 5 }),
gzSpot("The tailor's door", "Go in", { at: "tailordoor" }),
gzTalk("The tailor", "Be measured for a suit of clothes", ["📐 By quadrant", gvbQs("He first took my altitude by a quadrant, and then, with a rule and compasses, described the dimensions and outlines of my whole body, all which he entered upon paper") + gsrc("II"), "▶ Six days later..."]),
gzPuzzle("👔 Six days later", "The clothes come back \"very ill made, and quite out of shape\". Why?", ["The cloth shrank", "He mistook a figure in the calculation", "You grew"], 1, ["Cloth on Laputa behaves very well.", "", "You have been eating triangles: not enough to grow."], { yes: "👔 " + gvQ("But my comfort was, that I observed such accidents very frequent, and little regarded.") }),
gzGo("musicdoor", "The whole court is ready to play: go to the music room", { r: 5 }),
gzHold("musicdoor", 10, "Listen: the King and court play for three hours without stopping", { r: 6, say: "🎼 " + gvQ("the music of the spheres, which always played at certain periods, and the court was now prepared to bear their part, in whatever instrument they most excelled.") }),
gzTalk("A lady of the court", "A lady of the court has been waiting to speak to you", ["💃 The women of the island", gvbQs("The wives and daughters lament their confinement to the island, although I think it the most delicious spot of ground in the world", "they long to see the world, and take the diversions of the metropolis, which they are not allowed to do without a particular license from the king") + gsrc("II"), "▶ Go on"]),
gzReadA("🏰 The great court lady", gvbQs("I was told that a great court lady, who had several children,--is married to the prime minister, the richest subject in the kingdom, a very graceful person, extremely fond of her, and lives in the finest palace of the island,--went down to Lagado on the pretence of health, there hid herself for several months") + gsrc("II"), "<p>The ladies of the island tell a story of a great lady who ran away down to Lagado, and was brought back, and ran away again: so much do they long to see the world below.</p>" + gsrc("II"), "▶ Go on"),
gzGo("packthread", "Go to the edge where the packthreads are let down", { r: 6 }),
gzRead("🪁 Petitions on packthreads", gvbQs("several packthreads were let down, with small weights at the bottom. On these packthreads the people strung their petitions, which mounted up directly, like the scraps of paper fastened by school boys at the end of the string that holds their kite.") + gsrc("II"), "▶ Go on"),
gzPuzzle("☄️ The sun's health", "A gentleman meets a friend in the morning. What is the first question they ask each other?", ["How did you sleep?", "How the sun looked at his setting and rising, and whether they can avoid the next comet", "What is for dinner?"], 1, ["They never sleep quietly.", "", "Dinner is a geometry lesson."], { yes: "☄️ " + gvQ("When they meet an acquaintance in the morning, the first question is about the sun's health") })
] });
var GC3 = gvbCh({ t: "The loadstone", txt: 2, start: "top", tune: "cave", keep: ["lode", "A chip of the loadstone's dust", "🧲"],
state: { stone: function (s) { var a = gvbIdx(GC3, "down"), b = gvbIdx(GC3, "up"), c = gvbIdx(GC3, "level"); return s >= c ? 0 : s >= b ? -1.2 : s >= a ? 1.2 : 0; } },
words: "You ask leave to see the curiosities of the island, and above all, what makes it fly. The King grants it, and your tutor goes with you.",
intro: "The curiosities of the island",
cast: [gvc("tutor", gL(4, 536), { ry: Math.PI, until: "chasmgo", tilt: 1 }), gvc("tutor", { sc: "cave", x: 3, z: 30 }, { key: "tutor2", from: "chasmgo", tilt: 1 }), gvc("astro1", { sc: "cave", x: -3, z: 12 }, { ry: Math.PI, tilt: 1 }), gvc("astro2", { sc: "cave", x: -12, z: -20 }, { ry: 0, tilt: 1 })],
steps: [
{ k: "read" },
gzTalk("Your tutor", "Ask your tutor what the island is made of", ["🏝️ Exactly circular", gvbQs("The flying or floating island is exactly circular, its diameter 7837 yards, or about four miles and a half, and consequently contains ten thousand acres.", "The bottom, or under surface, which appears to those who view it below, is one even regular plate of adamant, shooting up to the height of about two hundred yards.") + gsrc("III"), "▶ Where does the rain go?"]),
gzPuzzle("💧 The rain", "The top of the island slopes from the edge towards the middle. Where does the rain go?", ["It runs off the edge onto the land below", "It runs in rivulets to four large basins near the middle", "It soaks into the adamant"], 1, ["Not from this island: it slopes inward.", "", "Adamant drinks nothing."], { yes: "💧 " + gvQ("where they are emptied into four large basins, each of about half a mile in circuit, and two hundred yards distant from the centre.") }),
gzGo("basin1", "Walk down to one of the great basins", { r: 8 }),
gzHold("basin1", 6, "Watch the water: the sun draws it up, so it never overflows", { r: 10, say: "☀️ " + gvQ("From these basins the water is continually exhaled by the sun in the daytime, which effectually prevents their overflowing.") }),
gzGo("chasm", "Go to the chasm at the centre of the island", { r: 6 }),
gzId("chasmgo", gzSpot("The stair down into the Flandona Gagnole", "Go down into the Astronomer's Cave", { at: "chasm" })),
gzRead("🌌 The Flandona Gagnole", gvbQs("In this cave are twenty lamps continually burning, which, from the reflection of the adamant, cast a strong light into every part.", "The place is stored with great variety of sextants, quadrants, telescopes, astrolabes, and other astronomical instruments.") + gsrc("III"), "▶ Look about"),
gzGo("loadstone", "Go to the great loadstone in the middle", { r: 6 }),
gzTalk("An astronomer", "An astronomer keeps the stone: ask him about it", ["🧲 A weaver's shuttle", gvbQs("But the greatest curiosity, upon which the fate of the island depends, is a loadstone of a prodigious size, in shape resembling a weaver's shuttle.", "This magnet is sustained by a very strong axle of adamant passing through its middle, upon which it plays, and is poised so exactly that the weakest hand can turn it.") + gsrc("III"), "▶ How does it move the island?"]),
gzPuzzle("🧲 Down, or up?", "One end of the stone attracts the land below; the other repels it. The King wants the island to sink. Which end goes down?", ["The attracting end", "The repelling end", "Neither: lay it level"], 0, ["", "That end down, and the island mounts upward.", "Level, and the island stands still."], { yes: "🧲 " + gvQ("Upon placing the magnet erect, with its attracting end towards the earth, the island descends") }),
gzId("down", gzHold("lookout", 8, "Climb to the astronomers' platform and watch them turn the attracting end down: the island sinks", { r: 5 })),
gzPuzzle("🧲 And now up", "Now the King wants the island to rise. What do the astronomers do?", ["Turn the repelling end downward", "Turn the stone level", "Take the stone out"], 0, ["", "Level, it stands still.", "It cannot be removed: it is one piece with the adamant."], { yes: "🧲 " + gvQ("but when the repelling extremity points downwards, the island mounts directly upwards.") }),
gzId("up", gzHold("lookout", 8, "Watch the stone turned: the island mounts", { r: 5 })),
gzPuzzle("🧭 To move across the land", "How do they move the island sideways across the King's dominions?", ["With sails", "By setting the stone oblique, so the island rises and falls slantwise, by turns", "By rowing"], 1, ["Sails on a flying island? No.", "", "Oars? The galleries would laugh."], { yes: "🧭 " + gvQ("When the position of the stone is oblique, the motion of the island is so too: for in this magnet, the forces always act in lines parallel to its direction.") }),
gzId("level", gzPuzzle("⚖️ Standing still", "How do they make the island stand still?", ["Drop an anchor", "Put the stone parallel to the plane of the horizon", "Turn it end over end"], 1, ["The ground is two miles down.", "", "It would bob up and down."], { yes: "⚖️ " + gvQ("When the stone is put parallel to the plane of the horizon, the island stands still") })),
gzGo("marsglass", "Go to the great glass the astronomers have trained on Mars", { r: 5 }),
gzTalk("An astronomer", "The other astronomer shows you his discoveries", ["🔭 Two moons of Mars", gvbQs("They have likewise discovered two lesser stars, or satellites, which revolve about Mars; whereof the innermost is distant from the centre of the primary planet exactly three of his diameters, and the outermost, five") + gsrc("III"), "▶ And their telescopes?"]),
gzPuzzle("🔭 Their telescopes", "How long are the Laputians' largest telescopes?", ["A hundred feet", "Not above three feet, but they magnify more than our hundred-foot ones", "They have none"], 1, ["That is ours, in Europe.", "", "You are standing beside one."], { yes: "🔭 " + gvQ("For, although their largest telescopes do not exceed three feet, they magnify much more than those of a hundred with us, and show the stars with greater clearness.") }),
gzGo("catalogue", "Look at the catalogue of the stars", { r: 5 }),
gzPuzzle("⭐ The catalogue", "How many fixed stars are in the Laputians' catalogue, and how many comets have they observed?", ["Three thousand stars, nine comets", "Ten thousand fixed stars, ninety-three comets", "A million stars, one comet"], 1, ["That is about Europe's.", "", ""], { yes: "⭐ " + gvQ("They have observed ninety-three different comets, and settled their periods with great exactness.") }),
gzRead("🏙️ If a town rebels", gvbQs("The first and the mildest course is, by keeping the island hovering over such a town, and the lands about it, whereby he can deprive them of the benefit of the sun and the rain") + gsrc("III"), "▶ And if they still resist?"),
gzPuzzle("🏙️ Why not drop it?", "The King could let the island drop on a rebel town. Why does he so rarely do it?", ["He is too kind", "Tall rocks or spires might crack the adamant bottom, and his ministers' estates are below", "The loadstone will not allow it"], 1, ["Kind? He pelts them with great stones.", "", "The stone does as it is turned."], { yes: "🏙️ " + gvQ("a sudden fall might endanger the bottom or under surface of the island") }),
gzSpot("The stair up to the island", "Climb back up to the island", { at: { sc: "cave", x: 0, z: 36 } })
] });
function gvq4a() { return gvbQs("That about forty years ago, certain persons went up to Laputa, either upon business or diversion, and, after five months continuance, came back with a very little smattering in mathematics, but full of volatile spirits acquired in that airy region", "The only inconvenience is, that none of these projects are yet brought to perfection; and in the mean time, the whole country lies miserably waste, the houses in ruins, and the people without food or clothes."); }
function gvq4b() { return gvQ("after employing a hundred men for two years, the work miscarried, the projectors went off, laying the blame entirely upon him"); }
var GC4 = gvbCh({ t: "Down to Lagado", txt: 3, start: "lorddoor", tune: "lagado", keep: ["letter", "Your letter to Lord Munodi", "✉️"],
state: { seatB: function (s) { return s >= gvbIdx(GC4, "letdown") && s < gvbIdx(GC4, "walk"); }, isleB: function (s) { return s < gvbIdx(GC4, "walk") ? "mount" : "city"; } },
words: "A month and more in Laputa. You have learnt the language; and you are weary of an island where you receive so little countenance.",
intro: "Leave to depart",
cast: [gvc("lord", gIn("laputa", 4, 1, -1), { ry: Math.PI }), gvc("munodi", gIn("balnibarbi", 15, 0, -1.6), { key: "mun1", until: "tour" }), gvc("munodi", lpuBalAt(70, -150), { key: "mun2", from: "tour", until: "country" }), gvc("munodi", lpuBalAt(404, -528), { key: "mun3", from: "country" })],
steps: [
{ k: "read" },
gzSpot("The great lord's door", "Visit the great lord, the King's kinsman", { at: "lorddoor" }),
gzTalk("The great lord", "Talk with the great lord: the only Laputian who listens", ["🎻 The ignorant lord", gvbQs("He was universally reckoned the most ignorant and stupid person among them.", "but so ill an ear for music, that his detractors reported,", "He listened to me with great attention, and made very wise observations on all I spoke.") + gsrc("IV"), "▶ Ask him to help you leave"]),
gzPuzzle("🎻 Why is he thought stupid?", "Why do the Laputians think this wise and honourable lord a fool?", ["He is cruel", "He has no ear for music and can't follow the mathematics", "He is poor"], 1, ["He is full of integrity and honour.", "", "He is the King's kinsman, and rich."], { yes: "🎻 He has been known to beat time in the wrong place." }),
gzRead("✉️ Leave to depart", gvbQs("On the 16th of February I took leave of his majesty and the court. The king made me a present to the value of about two hundred pounds English, and my protector, his kinsman, as much more, together with a letter of recommendation to a friend of his in Lagado, the metropolis.") + gsrc("IV"), "▶ To the lowest gallery", { done: gzMove("gallery", "⛓️ <b>The lowest gallery.</b> The chain and seat wait at the edge.") }),
gzId("letdown", gzSpotAt("The seat on the chain, going down", "be let down", gL(0, 640, GVW_LGAL), "Sit on the seat at the end of the chain, and be let down", function () { setTimeout(function () { gvwGo("landing", "⛓️ <b>Let down</b> to a mountain about two miles from Lagado. Firm ground.", gvbPopulate); }, 500); }, { r: 4 })),
gzId("walk", gzGo("lagado", "Walk to the city of Lagado: \"I felt some little satisfaction in finding myself on firm ground\"", { r: 10 })),
gzGo("munodi", "Find the house of Lord Munodi, to whom your letter is written", { r: 8 }),
gzSpot("The door of Lord Munodi's house", "Go in, with your letter", { at: "munodi" }),
gzTalk("Lord Munodi", "Give Lord Munodi your letter", ["🏛️ Lord Munodi", gvbQs("I soon found out the person's house to whom I was recommended, presented my letter from his friend the grandee in the island, and was received with much kindness. This great lord, whose name was Munodi, ordered me an apartment in his own house") + gsrc("IV"), "▶ He will show you the town"]),
gzId("tour", gzMoveRead("🏙️ The town", gvbQs("he took me in his chariot to see the town, which is about half the bigness of London; but the houses very strangely built, and most of them out of repair. The people in the streets walked fast, looked wild, their eyes fixed, and were generally in rags.") + gsrc("IV"), "▶ Look about you", "lagado", "🏙️ <b>Lagado.</b>")),
gzHold("lagado", 8, "Walk the streets of Lagado and look at the houses and the people", { r: 16 }),
gzGo("gate", "Go out through the town gate", { r: 8 }),
gzGo("fields", "Go on into the fields, where labourers are working", { r: 12 }),
gzPuzzle("🌾 The fields", "\"Many labourers working with several sorts of tools in the ground.\" The soil is excellent. What do you see growing?", ["Wheat, tall and gold", "Neither corn nor grass", "Vines"], 1, ["Not here.", "", "Not here."], { yes: "🌾 " + gvQ("neither did observe any expectation either of corn or grass, although the soil appeared to be excellent.") }),
gzTalk("Lord Munodi", "Ask Lord Munodi what it all means", ["🤐 Different customs", gvbQs("that I had not been long enough among them to form a judgment; and that the different nations of the world had different customs;") + gsrc("IV"), "▶ He invites you to his country-house"]),
gzId("country", gzMoveRead("🌳 Lord Munodi's country-house", gvbQs("if I would go with him to his country-house, about twenty miles distant, where his estate lay, there would be more leisure for this kind of conversation.") + gsrc("IV"), "▶ Set out next morning", "country", "🌳 <b>Munodi's estate.</b> Green, after all that waste.")),
gzGo("garden", "Walk in Munodi's gardens: fountains, walks, avenues and groves", { r: 12 }),
gzTalk("Lord Munodi", "Hear Lord Munodi's story", ["🌳 The old way", gvbQs("This lord Munodi was a person of the first rank, and had been some years governor of Lagado; but, by a cabal of ministers, was discharged for insufficiency.") + gsrc("IV"), "▶ About forty years ago..."]),
gzRead("🎓 About forty years ago", gvq4a() + gsrc("IV"), "▶ And the mill?"),
gzGo("mill", "Go and see the old mill on the river", { r: 8 }),
gzGo("ruin", "Climb to the ruined building on the side of the mountain", { r: 12 }),
gzPuzzle("🏚️ The ruin", "Why is this half-built mill standing ruined on the mountain?", ["War", "The projectors meant to pump the river's water up the mountain to turn it, and it failed", "An earthquake"], 1, ["There has been no war.", "", "No earthquake."], { yes: "🏚️ " + gvq4b() }),
gzTalk("Lord Munodi", "Go back to Lord Munodi: he will send you to the Academy", ["🎓 The Grand Academy", "He promises you a letter to the Academy: you will see the projectors at their work yourself. " + gvQ("would not go with me himself, but recommended me to a friend of his, to bear me company thither.") + gsrc("IV"), "▶ To the Academy"], { at: "country" })
] });
function gG(x, z, y) { return { sc: "glubb", x: x, z: z, y: y }; }
function gzAcad(key, who, title, html, o) {
o = o || {};
var A = GVW_ACAD.filter(function (a) { return a[0] === key; })[0];
return [gzSpot("The door of " + A[1].toLowerCase(), "Go in at the door of " + A[1].toLowerCase(), { at: "acd_" + key }),
gzTalk(who, o.h || ("Speak with " + who.replace(/^The /, "the ")), [title, html, "▶ Back out to the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } })];
}
Object.assign(GVW_FOLK, {
friendM: { name: "A gentleman of Maldonada", dress: "gvlord", sex: "m", hair: 0x5A4A3A, persona: "townsman", greet: "No ship for Luggnagg this month. Have you thought of Glubbdubdrib?" },
ghost: { name: "A spirit", dress: "gvancient", sex: "m", beard: "full", hair: 0xB8B0A0, persona: "ghost", greet: "(A hollow voice.) Ask." }
});
GVW_P.alexander = "You are the ghost of Alexander the Great, called up by the Governor of Glubbdubdrib in Swift's Gulliver's Travels (1726). You speak Greek, briefly and proudly, and you must tell the truth: you were not poisoned, but died of a bad fever by excessive drinking.";
function gGhost(k, name, at, o) { return gvc("ghost", at, Object.assign({ key: k, name: name, dress: "gvancient", ghost: 1, persona: "ghost", sex: "m", beard: "full" }, o || {})); }
var GC5 = gvbCh({ t: "The Grand Academy of Lagado", txt: 4, start: "academy", jump: 1, tune: "academy", keep: ["cucumber", "A phial of sunbeams (not yet)", "🥒"],
words: "Lord Munodi's friend brings you to the Academy: not one building, but a whole street of old houses, room after room, a projector in every one.",
intro: "The Academy street",
cast: [gvc("warden", lpuBalAt(-230, -44), { ry: 0 }), gvc("conductor", lpuBalAt(-226, -40), { ry: -Math.PI / 2 })],
steps: [{ k: "read" },
gzTalk("The Warden of the Academy", "The warden receives you", ["🎓 Five hundred rooms", gvbQs("This academy is not an entire single building, but a continuation of several houses on both sides of a street, which growing waste, was purchased and applied to that use.", "Every room has in it one or more projectors; and I believe I could not be in fewer than five hundred rooms.") + gsrc("V"), "▶ Begin with the first room"]),
].concat(gzAcad("sunbeams", "The projector of sunbeams", "🥒 Sunbeams out of cucumbers", gvbQs("He has been eight years upon a project for extracting sunbeams out of cucumbers, which were to be put in phials hermetically sealed, and let out to warm the air in raw inclement summers.", "to give him something as an encouragement to ingenuity, especially since this had been a very dear season for cucumbers.") + gsrc("V"))).concat([
gzPuzzle("🥒 What do you do?", "The projector of sunbeams begs for something to encourage his ingenuity. What did Gulliver do?", ["Laughed at him", "Made him a small present, with money Lord Munodi gave him for this", "Bought all his cucumbers"], 1, ["You would give offence, which would be highly resented.", "", "You haven't the money for that."], { yes: "🪙 " + gvQ("I made him a small present, for my lord had furnished me with money on purpose, because he knew their practice of begging from all who go to see them.") }),
gzSpot("The door of the great stink", "Go in at the next door (hold your breath)", { at: "acd_ordure" }),
gzTalk("The oldest student of the Academy", "Do not stop your nose: greet the most ancient student", ["🤢 A horrible stink", gvbQs("I went into another chamber, but was ready to hasten back, being almost overcome with a horrible stink. My conductor pressed me forward, conjuring me in a whisper", "to give no offence, which would be highly resented;", "When I was presented to him, he gave me a close embrace, a compliment I could well have excused.") + gsrc("V"), "▶ Back out, quickly"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of ice into gunpowder", "Go in to the calciner of ice", { at: "acd_ice" }),
gzTalk("The calciner of ice", "Hear the calciner of ice", ["🧊 Ice into gunpowder", gvbQs("I saw another at work to calcine ice into gunpowder; who likewise showed me a treatise he had written concerning the malleability of fire, which he intended to publish.") + gsrc("V"), "▶ Back out to the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of houses built from the roof down", "Go in to the ingenious architect", { at: "acd_roof" }),
gzPuzzle("🏠 The architect", "The architect builds houses \"by beginning at the roof, and working downward to the foundation\". Which two creatures does he say do the same?", ["The ant and the beaver", "The bee and the spider", "The swallow and the mole"], 1, ["Not those.", "", ""], { yes: "🐝 " + gvQ("which he justified to me, by the like practice of those two prudent insects, the bee and the spider.") + "<br>(Press E by the architect to talk with him; then out.)" }),
gzTalk("The ingenious architect", "Talk with the architect, then go out", ["🏠 From the roof down", "His house hangs from the ceiling, roof first. \"The walls next year, sir, and the foundations after.\"" + gsrc("V"), "▶ Back out to the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of the blind man's colours", "Go in to the blind master and his apprentices", { at: "acd_colours" }),
gzTalk("The blind master", "Talk with the blind master", ["🎨 Colours by feeling and smelling", gvbQs("There was a man born blind, who had several apprentices in his own condition: their employment was to mix colours for painters, which their master taught them to distinguish by feeling and smelling.", "and the professor himself happened to be generally mistaken.") + gsrc("V"), "▶ Back out to the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of ploughing with hogs", "Go in to the hog-plougher", { at: "acd_hogs" }),
gzPuzzle("🐖 Ploughing with hogs", "Bury acorns and chestnuts six inches apart, eight deep; drive in six hundred hogs. How did it go, on trial?", ["A fine crop", "The charge and trouble very great, and little or no crop", "The hogs refused"], 1, ["Not quite.", "", "The hogs were very willing."], { yes: "🐖 " + gvQ("it is true, upon experiment, they found the charge and trouble very great, and they had little or no crop.") }),
gzTalk("The projector of hog-ploughing", "Talk with the hog-plougher, then go out", ["🐖 Great improvement", gvbQs("However it is not doubted, that this invention may be capable of great improvement.") + gsrc("V"), "▶ Back out to the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of silk from spiders", "Go in (mind the webs)", { at: "acd_spiders" }),
gzTalk("The projector of spiders", "Do not disturb his webs: talk with the spider-man", ["🕸️ Silk from spiders", gvbQs("I went into another room, where the walls and ceiling were all hung round with cobwebs, except a narrow passage for the artist to go in and out.", "not to disturb his webs.", "that by employing spiders, the charge of dyeing silks should be wholly saved;") + gsrc("V"), "▶ Back out to the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of the sundial on the weathercock", "Go in to the astronomer", { at: "acd_dial" }),
gzTalk("An astronomer of the Academy", "Hear the astronomer's plan for the town-house weathercock", ["🌬️ A sundial on a weathercock", gvbQs("There was an astronomer, who had undertaken to place a sun-dial upon the great weathercock on the town-house, by adjusting the annual and diurnal motions of the earth and sun, so as to answer and coincide with all accidental turnings of the wind.") + gsrc("V"), "▶ Back out to the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of the bellows", "Your colic: your conductor leads you to the physician", { at: "acd_bellows" }),
gzReadA("💨 The great physician", gvbQs("I was complaining of a small fit of the colic, upon which my conductor led me into a room where a great physician resided, who was famous for curing that disease, by contrary operations from the same instrument. He had a large pair of bellows, with a long slender muzzle of ivory") + gsrc("V"), "<p>Your conductor takes you to a great physician who cures the colic with a large pair of bellows, blowing the wind out of a patient, or in. He tries it on a dog. The dog does not enjoy it.</p>" + gsrc("V"), "▶ Back out, thanking him", { done: function () { setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of marble for pincushions", "Go in to the universal artist's rooms", { at: "acd_marble" }),
gzTalk("The softener of marble", "Talk with the universal artist's man", ["🪨 The universal artist", gvbQs("He told us", "he had been thirty years employing his thoughts for the improvement of human life.", "others softening marble, for pillows and pin-cushions; others petrifying the hoofs of a living horse, to preserve them from foundering.") + gsrc("V"), "▶ Back out to the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of sheep without wool", "Go in to the breeder of sheep", { at: "acd_sheep" }),
gzTalk("The breeder of sheep", "See the naked sheep", ["🐑 Naked sheep", gvbQs("to prevent the growth of wool upon two young lambs; and he hoped, in a reasonable time to propagate the breed of naked sheep, all over the kingdom.") + gsrc("V"), "▶ Cross to the other side of the street"], { act: function (next) { next(); setTimeout(function () { gvwGoOut(); }, 300); } }),
gzSpot("The door of the engine of words", "Cross to the side of speculative learning: go in to the Engine", { at: "acd_engine" }),
gzTalk("The professor of the Engine", "Look at the great frame, and hear its professor", ["⚙️ The Engine", gvbQs("by his contrivance, the most ignorant person, at a reasonable charge, and with a little bodily labour, might write books in philosophy, poetry, politics, laws, mathematics, and theology, without the least assistance from genius or study.", "Six hours a day the young students were employed in this labour") + gsrc("V"), "▶ Turn a handle"]),
gzHold({ sc: "balnibarbi", x: gvwInAt("balnibarbi", 11).x, z: gvwInAt("balnibarbi", 11).z + 1, y: GVW_IN_Y }, 8, "Take a handle with the pupils and turn: the words change places in the frame", { r: 5, say: "⚙️ The frame shows: <i>moon green the at sing king</i>. The pupils write it down eagerly. Another broken sentence for the great book." }),
gzPuzzle("⚙️ The promise", "What do you promise the professor of the Engine?", ["To build five hundred of them in England", "If ever you return home, to do him justice as the sole inventor", "Nothing at all"], 1, ["You haven't the fund.", "", "He would be wounded."], { yes: "⚙️ " + gvQ("that I would do him justice, as the sole inventor of this wonderful machine;") }),
gzSpot("The door of the school of languages", "Go out and along to the school of languages", { at: "acd_language" }),
gzTalk("A sage with his pack", "A sage will talk with you, without a single word", ["🎒 Words are only names for things", gvbQs("that since words are only names for things, it would be more convenient for all men to carry about them such things as were necessary to express a particular business they are to discourse on.") + gsrc("V"), "▶ Answer him"]),
gzPuzzle("🎒 Converse without words", "The second sage sets down a candlestick and a plum, and waits. How do you answer, in the way of the school?", ["Say \"No, thank you, I have dined\"", "Take things out of your own pockets and show them", "Bow and leave"], 1, ["Words! The sages wince: each one shortens your life.", "", "Rude."], { yes: "🎒 You show a crust of bread and an empty cup. The sages nod, delighted. A whole conversation, and not one word worn away." }),
gzSpot("The door of the mathematical wafer", "Go in to the mathematical school", { at: "acd_wafer" }),
gzTalk("The professor of mathematics", "Hear how mathematics is taught", ["📜 The wafer", gvbQs("The proposition, and demonstration, were fairly written on a thin wafer, with ink composed of a cephalic tincture. This, the student was to swallow upon a fasting stomach, and for three days following, eat nothing but bread and water.") + gsrc("V"), "▶ Does it work?"]),
gzPuzzle("📜 Does it work?", "Why hasn't the wafer method succeeded yet?", ["The ink is too weak", "Errors in the dose, and the lads steal aside and get rid of it before it works", "The professor eats them himself"], 1, ["Partly; but there's more.", "", ""], { yes: "📜 " + gvQ("But the success has not hitherto been answerable, partly by some error in the _quantum_ or composition, and partly by the perverseness of lads") })
]) });
var GC6 = gvbCh({ t: "The school of political projectors", txt: 5, start: "acd_politics", tune: "academy", keep: ["anagram", "A professor's anagram", "🔤"],
words: "The last side of the Academy: the school of political projectors. Some are wild; one or two are very sensible indeed, and that is the joke.",
intro: "The school of political projectors",
cast: [gvc("warden", lpuBalAt(-230, -44), { ry: 0 })],
steps: [{ k: "read" },
gzSpot("The door of the school of political projectors", "Go in to the political projectors", { at: "acd_politics" }),
gzTalk("The professor of politics", "Hear the professors' wild schemes", ["🏛️ Wild, impossible chimeras", gvbQs("These unhappy people were proposing schemes for persuading monarchs to choose favourites upon the score of their wisdom, capacity, and virtue; of teaching ministers to consult the public good; of rewarding merit, great abilities, eminent services") + gsrc("VI"), "▶ Go on"]),
gzPuzzle("🏛️ Which is the joke?", "Gulliver calls these schemes \"wild, impossible chimeras\". Which of these did the professors propose?", ["Choosing favourites for their wisdom and virtue", "Taxing the poor more", "Closing the schools"], 0, ["", "Not in this school.", "Not in this school."], { yes: "🏛️ Exactly: in Lagado, choosing the wise and good for office is the maddest scheme of all." }),
gzRead("💊 A most ingenious doctor", gvbQs("that every senator in the great council of a nation, after he had delivered his opinion, and argued in the defence of it, should be obliged to give his vote directly contrary; because if that were done, the result would infallibly terminate in the good of the public.") + gsrc("VI"), "▶ And for forgetful ministers?"),
gzPuzzle("🤏 Short memories", "\"The favourites of princes are troubled with short and weak memories.\" What does the doctor prescribe for whoever leaves a first minister?", ["A written note", "A tweak by the nose, or a pinch of the arm, to prevent forgetfulness", "A present of wine"], 1, ["Too gentle, says the doctor.", "", "Too pleasant."], { yes: "🤏 " + gvQ("or pinch his arm black and blue, to prevent forgetfulness;") }),
gzTalk("Another projector of politics", "Hear the debate on raising money", ["💰 Taxes", gvbQs("The first affirmed,", "the justest method would be, to lay a certain tax upon vices and folly; and the sum fixed upon every man to be rated, after the fairest manner, by a jury of his neighbours.", "The second was of an opinion directly contrary;") + gsrc("VI"), "▶ What was not taxed?"]),
gzPuzzle("💰 Not worth collecting", "The women were to be taxed on their beauty and skill in dressing. Which qualities were not rated at all, and why?", ["Wit and valour, because they are rare", "Constancy, chastity, good sense and good nature, because they would not bear the charge of collecting", "Wealth, because the rich object"], 1, ["Those are taxed, on the men.", "", ""], { yes: "💰 " + gvQ("But constancy, chastity, good sense, and good nature, were not rated, because they would not bear the charge of collecting.") }),
gzReadA("🕵️ Discovering plots", gvbQs("Another professor showed me a large paper of instructions for discovering plots and conspiracies against the government.", "He advised great statesmen to examine into the diet of all suspected persons; their times of eating; upon which side they lay in bed") + gsrc("VI"), "<p>Another professor has a large paper of instructions for discovering plots against the government, by watching what suspected people eat and how they sleep, and other things too silly to set down.</p>" + gsrc("VI"), "▶ Offer him some additions"),
gzRead("🔤 The kingdom of Tribnia", gvbQs("When this method fails, they have two others more effectual, which the learned among them call acrostics and anagrams.", "Our brother Tom has just got the piles,") + gsrc("VI"), "▶ Try an anagram yourself"),
gzPuzzle("🔤 An anagram of your own", "In Tribnia the decipherers move letters about to find plots. Which of these is an anagram of LAGADO?", ["A GOLD A", "GOAL AD", "DOG ALA", "all three"], 3, ["Try again: count the letters.", "Try again.", "Try again."], { yes: "🔤 All three: the same six letters, rearranged. The professor is enchanted and promises to mention you honourably in his treatise." }),
gzRead("🏡 Time to go home", gvbQs("The professor made me great acknowledgments for communicating these observations, and promised to make honourable mention of me in his treatise.", "I saw nothing in this country that could invite me to a longer continuance, and began to think of returning home to England.") + gsrc("VI"), "▶ Go out", { done: function () { setTimeout(function () { gvwGoOut(); }, 300); } }),
gzTalk("The Warden of the Academy", "Take leave of the warden", ["🎓 Farewell", "\"Come back in a few years, sir! The cucumbers will be shining by then.\"" + gsrc("VI"), "▶ Farewell"])
] });
var GC7 = gvbCh({ t: "The island of sorcerers", txt: 6, start: "maldonada", jump: 1, tune: "ghosts", keep: ["shade", "A ghost's farewell", "👻"],
state: { servants: function (s) { return s < gvbIdx(GC7, "vanish") || s === gvbIdx(GC7, "dine"); }, army: function (s) { return s >= gvbIdx(GC7, "arbela") && s < gvbIdx(GC7, "hannibal") ? "arbela" : s >= gvbIdx(GC7, "hannibal") && s < gvbIdx(GC7, "brutus") ? "alps" : null; } },
words: "You leave Lagado for the port of Maldonada, meaning to sail to Luggnagg and from there to Japan and home. There is no ship for a month.",
intro: "The port of Maldonada",
cast: [gvc("friendM", lpuBalAt(-596, 486), { ry: Math.PI, until: "bark" }), gvc("friendM", gG(4, 410), { key: "fm2", from: "bark", until: "palin" }), gvc("governor", gIn("glubb", 0, 0, -10.2), { y: GVW_IN_Y + 1.2, until: "chamber" }), gvc("governor", gIn("glubb", 1, 3, -3), { key: "gov2", from: "chamber", ry: Math.PI }),
gGhost("alex", "Alexander the Great", gIn("glubb", 1, -2, -4), { from: "alexin", until: "hannibal" }), gGhost("hann", "Hannibal", gIn("glubb", 1, -2, -4), { from: "hannibal", until: "brutus" }),
gGhost("caesar", "Julius Caesar", gIn("glubb", 1, -3, -3), { from: "brutus" }), gGhost("brutus", "Marcus Brutus", gIn("glubb", 1, -1, -4), { from: "brutus" })],
steps: [{ k: "read" },
gzGo("mquay", "Look for a ship bound for Luggnagg at the quay", { r: 8 }),
gzRead("⚓ No ship", gvbQs("When I arrived at the port of Maldonada (for so it is called) there was no ship in the harbour bound for Luggnagg, nor likely to be in some time. The town is about as large as Portsmouth.") + gsrc("VII"), "▶ Go on"),
gzTalk("A gentleman of Maldonada", "A gentleman of distinction has a suggestion", ["🧙 A trip", gvbQs("that since the ships bound for Luggnagg could not be ready in less than a month, it might be no disagreeable amusement for me to take a trip to the little island of Glubbdubdrib, about five leagues off to the south-west.") + gsrc("VII"), "▶ Go on"]),
gzPuzzle("🧙 Glubbdubdrib", "What does the name Glubbdubdrib mean, as near as Gulliver can interpret it?", ["The island of fruit", "The island of sorcerers or magicians", "The island of the dead"], 1, ["It is very fruitful, but that is not the name.", "", "Near enough in a way; but not the word."], { yes: "🧙 " + gvQ("Glubbdubdrib, as nearly as I can interpret the word, signifies the island of sorcerers or magicians.") }),
gzId("bark", gzMoveRead("⛵ The bark", gvbQs("He offered himself and a friend to accompany me, and that I should be provided with a small convenient bark for the voyage.") + gsrc("VII"), "▶ Sail for Glubbdubdrib", "glanding", "⛵ <b>Glubbdubdrib</b>, about eleven in the morning.")),
gzGo("gwall", "Walk up to the gate of the park: a wall of hewn stone, twenty feet high", { r: 8 }),
gzRead("😨 The guards", gvbQs("we all three entered the gate of the palace between two rows of guards, armed and dressed after a very antic manner, and with something in their countenances that made my flesh creep with a horror I cannot express.") + gsrc("VII"), "▶ Go on, to the palace"),
gzId("palin", gzSpot("The door of the governor's palace", "Go in at the palace door", { at: "gpalace" })),
gzGo("gthrone", "Walk up the chamber of presence to the lowest step of the throne", { r: 4 }),
gzPuzzle("🙇 Before the governor", "How do you greet the Governor of Glubbdubdrib?", ["Shake his hand", "Three profound obeisances", "Crawl and lick the floor"], 1, ["Not here.", "", "That is another country's custom (you will meet it)."], { yes: "🙇 " + gvQ("after three profound obeisances, and a few general questions, we were permitted to sit on three stools, near the lowest step of his highness's throne.") }),
gzTalk("The Governor of Glubbdubdrib", "Tell the governor of your travels", ["🧙 A turn of his finger", gvbQs("he dismissed all his attendants with a turn of his finger; at which, to my great astonishment, they vanished in an instant, like visions in a dream when we awake on a sudden.") + gsrc("VII"), "▶ The servants are gone"]),
gzId("vanish", gzRead("👻 What were they?", gvbQs("By his skill in necromancy he has a power of calling whom he pleases from the dead, and commanding their service for twenty-four hours, but no longer; nor can he call the same persons up again in less than three months, except upon very extraordinary occasions.") + gsrc("VII"), "▶ Dine with the governor")),
gzId("dine", gzHold("ghall", 8, "Dine with the governor, while a new set of ghosts serves the meat", { r: 10, say: "🍽️ " + gvQ("I had the honour to dine with the governor, where a new set of ghosts served up the meat, and waited at table.") })),
gzMoveRead("🌙 To your lodging", gvbQs("I stayed till sunset, but humbly desired his highness to excuse me for not accepting his invitation of lodging in the palace. My two friends and I lay at a private house in the town adjoining") + gsrc("VII"), "▶ Sleep in the town", "glodge", "🌙 <b>Your lodging</b> in the town."),
gzHold("glodge", 6, "Sleep (if you can)", { r: 6 }),
gzMoveRead("☀️ Back to the governor", gvbQs("I soon grew so familiarized to the sight of spirits, that after the third or fourth time they gave me no emotion at all") + gsrc("VII"), "▶ To the chamber over the park", "gchamber", "🪟 <b>The chamber</b>, with its fair prospect into the park."),
gzId("chamber", gzTalk("The Governor of Glubbdubdrib", "The governor makes you an offer", ["🧙 Whom would you call?", gvbQs("to call up whatever persons I would choose to name, and in whatever numbers, among all the dead from the beginning of the world to the present time", "that they would certainly tell me the truth, for lying was a talent of no use in the lower world.") + gsrc("VII"), "▶ Choose"])),
gzPuzzle("⚔️ First, pomp and magnificence", "\"My first inclination was to be entertained with scenes of pomp and magnificence.\" Whom do you ask to see first?", ["Alexander the Great at the head of his army, after the battle of Arbela", "The Emperor of China", "Your grandfather"], 0, ["", "", ""], { yes: "⚔️ The governor moves his finger." }),
gzId("arbela", gzHold("gwindow", 6, "Look out of the window: an army, in a large field below", { r: 5 })),
gzId("alexin", gzTalk("Alexander the Great", "Alexander is called up into the room: ask him how he died", ["🏺 Alexander", gvbQs("it was with great difficulty that I understood his Greek, and had but little of my own. He assured me upon his honour", "that he was not poisoned, but died of a bad fever by excessive drinking.") + gsrc("VII"), "▶ Next"])),
gzId("hannibal", gzTalk("Hannibal", "Hannibal, passing the Alps", ["🐘 Hannibal", gvbQs("Next, I saw Hannibal passing the Alps, who told me", "he had not a drop of vinegar in his camp.") + gsrc("VII"), "▶ Next"])),
gzId("brutus", gzTalk("Marcus Brutus", "Caesar and Brutus come forward together", ["🗡️ Caesar and Brutus", gvbQs("I observed, with much pleasure, that these two persons were in good intelligence with each other; and Caesar freely confessed to me,", "that the greatest actions of his own life were not equal, by many degrees, to the glory of taking it away.") + gsrc("VII"), "▶ Go on"])),
gzPuzzle("🏛️ The sextumvirate", "Brutus tells you who are \"perpetually together\" in the world below. Which of these is one of them?", ["Alexander", "Sir Thomas More", "Hannibal"], 1, ["", "", ""], { yes: "🏛️ " + gvQ("that his ancestor Junius, Socrates, Epaminondas, Cato the younger, Sir Thomas More, and himself were perpetually together:") })
] });
var GC8 = gvbCh({ t: "Ancient and modern history corrected", txt: 7, start: "gchamber", tune: "ghosts", keep: ["staff", "Aristotle's staff (a ghost of it)", "🦯"],
words: "Ten days on the island of sorcerers. You set apart one day for the wise, one for the moderns, and one for the plain good people history forgot.",
intro: "The chamber over the park",
cast: [gvc("governor", gIn("glubb", 1, 3, -3), { ry: Math.PI }), gGhost("homer", "Homer", gIn("glubb", 1, -3, -4), { until: "desc" }), gGhost("arist", "Aristotle", gIn("glubb", 1, -1, -4), { until: "modern" }),
gGhost("desc", "René Descartes", gIn("glubb", 1, 1, -3.6), { from: "desc", until: "modern", dress: "gvlord" }), gGhost("gass", "Pierre Gassendi", gIn("glubb", 1, 2.4, -3.6), { from: "desc", until: "modern", dress: "gvlord" }),
gGhost("actium", "A sea-captain of Actium", gIn("glubb", 1, -2, -4), { from: "actium", until: "yeoman", dress: "gvsea" }), gGhost("yeo", "An English yeoman of the old stamp", gIn("glubb", 1, -2, -4), { from: "yeoman", dress: "gvtar" })],
steps: [{ k: "read" },
gzTalk("Homer", "Homer and Aristotle stand at the head of all their commentators", ["📜 Homer and Aristotle", gvbQs("Homer was the taller and comelier person of the two, walked very erect for one of his age, and his eyes were the most quick and piercing I ever beheld. Aristotle stooped much, and made use of a staff.") + gsrc("VIII"), "▶ And the commentators?"]),
gzPuzzle("📜 The commentators", "Hundreds of commentators crowd the court. How do Homer and Aristotle know them?", ["As their best friends", "They are perfect strangers to them", "As their pupils"], 1, ["", "", ""], { yes: "📜 " + gvQ("I soon discovered that both of them were perfect strangers to the rest of the company") }),
gzId("desc", gzTalk("Aristotle", "Call up Descartes and Gassendi to explain their systems to Aristotle", ["🌀 New systems", gvbQs("This great philosopher freely acknowledged his own mistakes in natural philosophy, because he proceeded in many things upon conjecture, as all men must do", "that new systems of nature were but new fashions, which would vary in every age;") + gsrc("VIII"), "▶ Go on"])),
gzPuzzle("🥣 Spartan broth", "You ask for a dinner cooked by the ancients. A helot of Agesilaus makes Spartan broth. How do you find it?", ["Delicious: you have three bowls", "You cannot get down a second spoonful", "It is invisible"], 1, ["", "", ""], { yes: "🥣 " + gvQ("A helot of Agesilaus made us a dish of Spartan broth, but I was not able to get down a second spoonful.") }),
gzId("modern", gzRead("👑 Kings and their ancestors", gvbQs("For, instead of a long train with royal diadems, I saw in one family two fiddlers, three spruce courtiers, and an Italian prelate. In another, a barber, an abbot, and two cardinals.") + gsrc("VIII"), "▶ Go on")),
gzRead("📰 Modern history", gvbQs("I was chiefly disgusted with modern history.", "A general confessed, in my presence,", "that he got a victory purely by the force of cowardice and ill conduct;") + gsrc("VIII"), "▶ Those who did great services"),
gzId("actium", gzTalk("A sea-captain of Actium", "A captain with a youth beside him waits to speak", ["⚓ Actium", gvbQs("in the sea fight at Actium had the good fortune to break through the enemy's great line of battle, sink three of their capital ships, and take a fourth, which was the sole cause of Antony's flight, and of the victory that ensued; that the youth standing by him, his only son, was killed in the action.") + gsrc("VIII"), "▶ And his reward?"])),
gzPuzzle("⚓ His reward", "He asked Augustus for a greater ship. To whom was it given?", ["To him", "To a boy who had never seen the sea", "To his son's memory"], 1, ["", "", ""], { yes: "⚓ " + gvQ("it was given to a boy who had never seen the sea") }),
gzId("yeoman", gzTalk("An English yeoman of the old stamp", "Last, call up an English yeoman of the old stamp", ["🌾 The old stamp", gvbQs("once so famous for the simplicity of their manners, diet, and dress; for justice in their dealings; for their true spirit of liberty; for their valour, and love of their country.") + gsrc("VIII"), "▶ Go on"])),
gzHold("gwindow", 6, "Stand at the window over the park a while, and think about the living and the dead", { r: 5 }),
gzTalk("The Governor of Glubbdubdrib", "Take leave of the governor", ["🧙 Farewell", gvbQs("The day of our departure being come, I took leave of his highness, the Governor of Glubbdubdrib, and returned with my two companions to Maldonada") + gsrc("VII"), "▶ Back to Maldonada"])
] });
function gLg(x, z, y) { return { sc: "luggnagg", x: x, z: z, y: y }; }
Object.assign(GVW_FOLK, {
officer: { name: "The custom-house officer", dress: "gveast", sex: "m", hair: 0x141414, skin: 0xD8B898, persona: "townsman", greet: "A stranger, and a great traveller? You will be examined, sir. Very strictly." },
pilot: { name: "A pilot of Clumegnig", dress: "gveast", sex: "m", hair: 0x141414, skin: 0xD8B898, persona: "townsman", greet: "Between the shoals and the rocks, sir. Follow my hand." },
chamberlain: { name: "The bliffmarklub", dress: "gveast", sex: "m", beard: "full", hair: 0x2A2A2A, skin: 0xD8B898, persona: "luggnagg", greet: "I am his majesty's high-chamberlain. Your lodging is ready." },
strold: { name: "A struldbrug", dress: "gvold", sex: "m", hair: 0xE8E8E8, persona: "struldbrug", greet: "Slumskudask. (He holds out his hand; he asks you nothing at all.)" },
emperor: { name: "The Emperor of Japan", dress: "gveast", sex: "m", hair: 0x141414, skin: 0xD8B898, persona: "townsman", greet: "(Through the interpreter.) Signify your request. For my royal brother of Luggnagg, it will be granted." },
jinterp: { name: "The Emperor's interpreter", dress: "gveast", sex: "m", hair: 0x141414, skin: 0xD8B898, persona: "interpreter", greet: "(In Low Dutch, perfectly.) You are a Hollander, sir? Then speak freely." },
skipper: { name: "A malicious skipper", dress: "gvtar", sex: "m", beard: "full", hair: 0x6A4A2A, persona: "townsman", greet: "Have you trampled the crucifix, Dutchman? Have you?" }
});
GVW_P.struldbrug = "You are a struldbrug of Luggnagg, in Swift's Gulliver's Travels (1726): you will never die, and you are very old, forgetful, peevish and sad. You remember little but your youth, you cannot follow a long sentence, you ask strangers nothing, and you beg very modestly for slumskudask, a token of remembrance.";
var GC9 = gvbCh({ t: "Luggnagg: lick the dust", txt: 8, start: "clumegnig", jump: 1, tune: "luggnagg", keep: ["purse", "A purse of the king's gold", "👛"],
words: "A fortnight's wait at Maldonada, a month at sea, one violent storm; and on the 21st of April, 1708, you sail into the river of Clumegnig.",
intro: "The river of Clumegnig",
cast: [gvc("pilot", gLg(244, 474, 2.2), { ry: Math.PI, until: "land" }), gvc("officer", gIn("luggnagg", 0, 0, -3), { ry: 0, until: "lodge" }),
gvc("chamberlain", gIn("luggnagg", 2, 3, -2), { from: "crawl" }), gvc("interp", gIn("luggnagg", 1, 1.5, -1), { key: "interpL", from: "lodge", until: "warrant", ry: Math.PI }), gvc("luggking", gIn("luggnagg", 2, 0, -9), { ry: 0, y: GVW_IN_Y + 0.6 })],
steps: [{ k: "read" },
gzTalk("A pilot of Clumegnig", "A pilot comes aboard to guide you in", ["⚓ Between the shoals", gvbQs("by whom we were guided between certain shoals and rocks, which are very dangerous in the passage, to a large basin, where a fleet may ride in safety within a cable's length of the town-wall.") + gsrc("IX"), "▶ Land"]),
gzId("land", gzSpot("The door of the custom-house", "The sailors have talked: go to the custom-house to be examined", { at: "customdoor" })),
gzTalk("The custom-house officer", "Answer the custom-house officer (he speaks Balnibarbian)", ["🧾 Examined very strictly", gvbQs("This officer spoke to me in the language of Balnibarbi, which, by the force of much commerce, is generally understood in that town") + gsrc("IX"), "▶ What do you tell him?"]),
gzPuzzle("🇳🇱 Who are you?", "You mean to go on to Japan. Which country do you say you are from, and why?", ["England, proudly", "Holland, because the Dutch are the only Europeans allowed into Japan", "Laputa"], 1, ["They'll never let you into Japan.", "", "They'll laugh."], { yes: "🇳🇱 " + gvQ("I thought it necessary to disguise my country, and call myself a Hollander; because my intentions were for Japan, and I knew the Dutch were the only Europeans permitted to enter into that kingdom.") }),
gzId("lodge", gzMoveRead("🏠 Confined", gvbQs("I must be confined till he could receive orders from court, for which he would write immediately, and hoped to receive an answer in a fortnight.", "I was carried to a convenient lodging with a sentry placed at the door; however, I had the liberty of a large garden") + gsrc("IX"), "▶ To your lodging", "lodgeL", "🏠 <b>Your lodging.</b> A sentry at the door; a large garden.")),
gzTalk("Your interpreter", "Hire the young man from the ship as your interpreter", ["🗣️ Your interpreter", gvbQs("I hired a young man, who came in the same ship, to be an interpreter; he was a native of Luggnagg, but had lived some years at Maldonada, and was a perfect master of both languages.") + gsrc("IX"), "▶ Wait for the court"], { at: "lodgeL" }),
gzHold("lodgeL", 8, "Wait a fortnight for the despatch from court, talking with your visitors", { r: 6 }),
gzId("warrant", gzMoveRead("🐴 The warrant", gvbQs("It contained a warrant for conducting me and my retinue to _Traldragdubh_, or _Trildrogdrib_ (for it is pronounced both ways as near as I can remember), by a party of ten horse.") + gsrc("IX"), "▶ Ride for the court, on a mule", "road", "🐴 <b>The road</b> to Traldragdubh, with ten horse.")),
gzGo("traldragdubh", "Ride on into Traldragdubh, the royal city", { r: 14 }),
gzGo("court", "Go up to the gate of the king's palace", { r: 10 }),
gzRead("👅 The court style", gvbQs("that his majesty would please to appoint a day and hour, when it would by his gracious pleasure that I might have the honour to lick the dust before his footstool.", "This is the court style, and I found it to be more than matter of form") + gsrc("IX"), "▶ Go in"),
gzSpot("The door of the king's palace", "Go in at the palace door, on the day appointed", { at: "court" }),
gzId("crawl", gzPuzzle("👅 How do you go forward?", "Two days after you arrive, you are admitted. How must you approach the King of Luggnagg?", ["Walk up and bow", "Crawl upon your belly, and lick the floor as you advance", "Run, to show eagerness"], 1, ["Capital, nearly.", "", "Worse."], { yes: "👅 " + gvQ("I was commanded to crawl upon my belly, and lick the floor as I advanced; but, on account of my being a stranger, care was taken to have it made so clean, that the dust was not offensive.") })),
gzHold("throneL", 8, "Crawl up the long floor towards the throne (it has been swept clean for you)", { r: 3 }),
gzReadA("☠️ Another custom", gvbQs("when the king has a mind to put any of his nobles to death in a gentle indulgent manner, he commands the floor to be strewed with a certain brown powder of a deadly composition, which being licked up, infallibly kills him in twenty-four hours.") + gsrc("IX"), "<p>Your interpreter whispers that the floor is not always swept so clean for everyone: the King has cruel ways with lords he dislikes. Today it is clean. Keep going.</p>" + gsrc("IX"), "▶ Within four yards of the throne"),
gzPuzzle("👑 The compliment", "Strike your forehead seven times on the ground, and pronounce the compliment. What does it mean in English?", ["Long live the King", "May your celestial majesty outlive the sun, eleven moons and a half!", "I am your slave"], 1, ["Too short, for Luggnagg.", "", "Not what you were taught."], { yes: "👑 <i>Inckpling gloffthrobb squut serummblhiop mlashnalt zwin tnodbalkuffh slhiophad gurdlubh asht.</i><br>" + gvQ("May your celestial majesty outlive the sun, eleven moons and a half!") }),
gzPuzzle("🗣️ Your reply", "The King answers; you cannot understand a word. You reply as you were taught: <i>Fluft drin yalerick dwuldom prastrad mirpush</i>. What does it mean?", ["Thank you", "My tongue is in the mouth of my friend", "I am lost"], 1, ["", "", " "], { yes: "🗣️ " + gvQ("which properly signifies, \"My tongue is in the mouth of my friend;\" and by this expression was meant, that I desired leave to bring my interpreter;") }),
gzTalk("The King of Luggnagg", "Answer the King's questions, through your interpreter, for above an hour", ["👑 The King", gvbQs("The king was much delighted with my company, and ordered his _bliffmarklub_, or high-chamberlain, to appoint a lodging in the court for me and my interpreter; with a daily allowance for my table, and a large purse of gold for my common expenses.") + gsrc("IX"), "▶ To your lodging at court"]),
gzMoveRead("🏯 Three months at court", gvbQs("I staid three months in this country, out of perfect obedience to his majesty; who was pleased highly to favour me, and made me very honourable offers. But I thought it more consistent with prudence and justice to pass the remainder of my days with my wife and family.") + gsrc("IX"), "▶ Settle in", "courtlodge", "🏯 <b>Your lodging at court.</b>")
] });
var GC10 = gvbCh({ t: "The struldbrugs", txt: 9, start: "townL", tune: "luggnagg", keep: ["token", "A struldbrug's slumskudask", "🕯️"],
words: "The Luggnaggians are a polite and generous people. One day, in much good company, a person of quality asks you a question.",
intro: "Traldragdubh",
cast: [gvc("quality", gIn("luggnagg", 4, 0, -2), { ry: 0 }), gvc("strold", gLg(-166, -156), { key: "s1", from: "square", mark: 1 }), gvc("luggking", gIn("luggnagg", 2, 0, -9), { key: "k2", from: "king", y: GVW_IN_Y + 0.6 })],
steps: [{ k: "read" },
gzSpot("The door of a house of quality", "Go to a house of quality in the town, where the good company is", { at: "quality" }),
gzTalk("A person of quality", "A person of quality asks: have you seen any of their struldbrugs?", ["🔴 A red spot in the forehead", gvbQs("that sometimes, though very rarely, a child happened to be born in a family, with a red circular spot in the forehead, directly over the left eyebrow, which was an infallible mark that it should never die.") + gsrc("X"), "▶ And then?"], { at: "quality" }),
gzPuzzle("🎨 The mark", "The spot changes as the child grows. What colour is it at forty-five, and ever after?", ["Red still", "Green", "Deep blue", "Coal black, as large as an English shilling"], 3, ["At birth only.", "At twelve.", "At twenty-five."], { yes: "⚫ " + gvQ("at five and forty it grew coal black, and as large as an English shilling; but never admitted any further alteration.") }),
gzPuzzle("🔢 How many?", "How many struldbrugs does he think there are in the whole kingdom?", ["Eleven", "About eleven hundred, of both sexes", "A million"], 1, ["Too few.", "", "Far too many."], { yes: "🔢 " + gvQ("he did not believe there could be above eleven hundred struldbrugs, of both sexes, in the whole kingdom;") }),
gzRead("🌟 Happy nation!", gvbQs("I cried out, as in a rapture,", "Happy nation, where every child hath at least a chance for being immortal!") + gsrc("X"), "▶ The company asks you a question"),
gzTalk("A person of quality", "He asks: how would you live, if you were born a struldbrug?", ["🤔 If you could never die", "They were desirous to know " + gvQ("what scheme of living I should have formed to myself, if it had fallen to my lot to have been born a _struldbrug_.") + gsrc("X"), "▶ Tell them"], { at: "quality" }),
gzPuzzle("💰 First", "What does Gulliver say he would do first, as an immortal?", ["Travel the world", "Procure himself riches, and be the wealthiest man in the kingdom in about two hundred years", "Marry often"], 1, ["", "", "He would never marry after threescore."], { yes: "💰 " + gvQ("In the pursuit of which, by thrift and management, I might reasonably expect, in about two hundred years, to be the wealthiest man in the kingdom.") }),
gzPuzzle("📚 Second, and last", "And then?", ["Study the arts and sciences, and record every event, and become the oracle of the nation", "Sleep a hundred years", "Go to sea"], 0, ["", "", ""], { yes: "📚 " + gvQ("By all which acquirements, I should be a living treasure of knowledge and wisdom, and certainly become the oracle of the nation.") }),
gzRead("☄️ What wonders", gvbQs("What wonderful discoveries should we make in astronomy, by outliving and confirming our own predictions; by observing the progress and return of comets, with the changes of motion in the sun, moon, and stars!") + gsrc("X"), "▶ The company laughs"),
gzTalk("A person of quality", "He sets you right, with a smile of pity", ["🙂 A few mistakes", gvbQs("That the system of living contrived by me, was unreasonable and unjust; because it supposed a perpetuity of youth, health, and vigour, which no man could be so foolish to hope") + gsrc("X"), "▶ Hear what they are really like"], { at: "quality" }),
gzReadA("🕯️ The struldbrugs as they are", gvbQs("They were not only opinionative, peevish, covetous, morose, vain, talkative, but incapable of friendship, and dead to all natural affection, which never descended below their grandchildren.", "At ninety, they lose their teeth and hair;", "thus they lie under the disadvantage of living like foreigners in their own country.") + gsrc("X"), "<p>He explains gently: the struldbrugs grow old like everyone else, only they never stop growing older. By eighty they are sad and forgetful; at ninety they lose their teeth and hair; and as the language changes over the centuries they can no longer understand their own neighbours. " + gvQ("thus they lie under the disadvantage of living like foreigners in their own country.") + "</p>" + gsrc("X"), "▶ Go and see them"),
gzId("square", gzGo("struld", "Go to the square where the struldbrugs sit", { r: 10 })),
gzTalk("A struldbrug", "Speak with a struldbrug", ["🕯️ Slumskudask", gvbQs("they had not the least curiosity to ask me a question; only desired", "I would give them _slumskudask_,", "or a token of remembrance; which is a modest way of begging, to avoid the law, that strictly forbids it") + gsrc("X"), "▶ Give him a token"]),
gzPuzzle("🕰️ How old is he?", "There is no register older than a thousand years. How do the Luggnaggians reckon a struldbrug's age?", ["By his teeth", "Ask what kings he remembers, and look in the history books", "By the colour of his spot"], 1, ["He has none.", "", "It is black at forty-five and never changes."], { yes: "🕰️ " + gvQ("But the usual way of computing how old they are, is by asking them what kings or great persons they can remember, and then consulting history;") }),
gzSpot("The door of the house of the struldbrugs", "Look in at the house where the poorest of them are kept, at the public charge", { at: "struld" }),
gzRead("💭 Ashamed", gvbQs("my keen appetite for perpetuity of life was much abated. I grew heartily ashamed of the pleasing visions I had formed;") + gsrc("X"), "▶ The King has heard"),
gzId("king", gzSpot("The door of the king's palace", "Go to the palace: the King has heard everything, and wants to tease you", { at: "court" })),
gzTalk("The King of Luggnagg", "The King rallies you very pleasantly", ["👑 To arm your people", gvbQs("wishing I could send a couple of _struldbrugs_ to my own country, to arm our people against the fear of death; but this, it seems, is forbidden by the fundamental laws of the kingdom") + gsrc("X"), "▶ Go on"])
] });
var GC11 = gvbCh({ t: "Japan, and home", txt: 10, start: "courtlodge", tune: "sea", keep: ["diamond", "The King of Luggnagg's red diamond", "💎"],
state: { isle: null },
words: "Three months at court, and still you are absolutely determined to go home. The King gives you leave, a letter to the Emperor of Japan, and a present in even numbers.",
intro: "Your lodging at court",
cast: [gvc("luggking", gIn("luggnagg", 2, 0, -9), { y: GVW_IN_Y + 0.6, until: "glang" }), gvc("jinterp", gIn("sea", 1, 2, -6), { ry: -Math.PI / 2 }), gvc("emperor", gIn("sea", 1, 0, -10), { ry: 0 }),
gvc("skipper", lpuSeaAt(-596, 486), { ry: Math.PI, from: "skip" }), gvc("vangrult", lpuSeaAt(-600, 522, 3.0), { ry: Math.PI }), gvc("wife", gIn("sea", 0, 1, -1), { from: "home", ry: Math.PI })],
steps: [{ k: "read" },
gzSpot("The door, out to the palace court", "Go out, and to the palace for your audience of leave", { at: "courtlodge" }),
gzSpot("The door of the king's palace", "Go in to take your leave of the King", { at: "court" }),
gzTalk("The King of Luggnagg", "Take a solemn leave of the King", ["👑 A present in even numbers", gvbQs("He likewise presented me with four hundred and forty-four large pieces of gold (this nation delighting in even numbers), and a red diamond, which I sold in England for eleven hundred pounds.") + gsrc("XI"), "▶ Go on"]),
gzPuzzle("💎 Even numbers", "The King gives you gold in an even number, \"this nation delighting in even numbers\". How many pieces?", ["443", "444", "1,100"], 1, ["Odd! He would never.", "", "That's what the diamond sold for."], { yes: "💎 444 large pieces of gold, and a red diamond." }),
gzId("glang", gzMoveRead("⚓ Glanguenstald", gvbQs("On the 6th of May, 1709, I took a solemn leave of his majesty, and all my friends. This prince was so gracious as to order a guard to conduct me to Glanguenstald, which is a royal port to the south-west part of the island.") + gsrc("XI"), "▶ To the royal port", "glanguen", "⚓ <b>Glanguenstald</b>. A vessel for Japan.")),
gzHold("glanguen", 6, "Wait on the quay for the vessel bound for Japan", { r: 10 }),
gzMoveRead("🗾 Xamoschi", gvbQs("In six days I found a vessel ready to carry me to Japan, and spent fifteen days in the voyage. We landed at a small port-town called Xamoschi, situated on the south-east part of Japan") + gsrc("XI"), "▶ Land in Japan", "xamoschi", "🗾 <b>Xamoschi</b>, in Japan."),
gzPuzzle("🔏 The seal", "You show the customs officers the King of Luggnagg's letter. They know the seal at once: it is as broad as the palm of your hand. What is its picture?", ["A crowned sun", "A king lifting up a lame beggar from the earth", "Eleven moons and a half"], 1, ["", "", "That's the compliment."], { yes: "🔏 " + gvQ("The impression was, _A king lifting up a lame beggar from the earth_.") }),
gzGo("yedo", "Ride up the road west to Yedo, with carriages and servants the magistrates have given you", { r: 14 }),
gzSpot("The gate of the Emperor's palace", "Go in to the Emperor's hall of audience", { at: "yedo" }),
gzTalk("The Emperor's interpreter", "The Emperor's interpreter speaks to you in Low Dutch", ["🇳🇱 In Low Dutch", gvbQs("He soon conjectured, by my countenance, that I was a European, and therefore repeated his majesty's commands in Low Dutch, which he spoke perfectly well.") + gsrc("XI"), "▶ Make your request"]),
gzPuzzle("🙏 Your request", "The Emperor will grant whatever you ask, for his royal brother of Luggnagg. What do you ask?", ["To stay at Yedo", "To be conducted in safety to Nangasac, where the Dutch ships come", "A ship of your own"], 1, ["You are going home.", "", "Too much."], { yes: "🙏 " + gvQ("I therefore most humbly entreated his royal favour, to give order that I should be conducted in safety to Nangasac.") }),
gzReadA("✝️ A second petition", gvbQs("To this I added another petition,", "that for the sake of my patron the king of Luggnagg, his majesty would condescend to excuse my performing the ceremony imposed on my countrymen, of trampling upon the crucifix:") + gsrc("XI"), "<p>You ask the Emperor one more favour: to excuse you, quietly, from a ceremony the Dutch traders are made to perform, which as a Christian you will not do. The Emperor is surprised, and begins to suspect you are not a real Hollander at all.</p>" + gsrc("XI"), "▶ The Emperor answers"),
gzTalk("The Emperor of Japan", "Hear the Emperor's answer", ["🗾 By forgetfulness", gvbQs("his officers should be commanded to let me pass, as it were by forgetfulness.") + gsrc("XI"), "▶ Thank him, and march with the troops to Nangasac"]),
gzMoveRead("🗾 Nangasac", gvbQs("On the 9th day of June, 1709, I arrived at Nangasac, after a very long and troublesome journey. I soon fell into the company of some Dutch sailors belonging to the Amboyna, of Amsterdam, a stout ship of 450 tons.") + gsrc("XI"), "▶ Walk the quay", "nangasac", "🗾 <b>Nangasac.</b> The Amboyna lies at the quay."),
gzSpot("The door of a tea-house", "Go into a tea-house on the quay where the Dutch sailors drink", { at: "inn" }),
gzId("skip", gzGo("quay", "Go out to the quay, where the Amboyna lies", { r: 10 })),
gzTalk("A malicious skipper", "A malicious skipper points at you", ["🎋 Twenty strokes", gvbQs("I had not yet trampled on the crucifix;", "but the other, who had received instructions to let me pass, gave the rascal twenty strokes on the shoulders with a bamboo; after which I was no more troubled with such questions.") + gsrc("XI"), "▶ Board the Amboyna"]),
gzTalk("Captain Theodorus Vangrult", "Agree your passage with Captain Vangrult", ["⚓ Half the usual rate", gvbQs("I would have given the captain (one Theodorus Vangrult) what he pleased to ask for my voyage to Holland; but understanding I was a surgeon, he was contented to take half the usual rate, on condition that I would serve him in the way of my calling.") + gsrc("XI"), "▶ Sail"]),
gzHold("amboyna", 8, "Stand on the deck of the Amboyna as she sails for the Cape of Good Hope and Amsterdam", { r: 6, say: "⛵ " + gvQ("Nothing happened worth mentioning in this voyage.") }),
gzId("home", gzMoveRead("🏠 Redriff", gvbQs("On the 16th of April we put in at the Downs. I landed next morning, and saw once more my native country, after an absence of five years and six months complete.") + gsrc("XI"), "▶ Go straight to Redriff", "redriff", "🏠 <b>Redriff</b>, two in the afternoon.")),
gzTalk("Mrs. Mary Gulliver", "Your wife and family, in good health", ["🏠 Home", gvbQs("I went straight to Redriff, where I arrived the same day at two in the afternoon, and found my wife and family in good health.") + gsrc("XI"), "▶ The end of the voyage"])
] });
