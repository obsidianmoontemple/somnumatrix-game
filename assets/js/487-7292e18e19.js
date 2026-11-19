/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var TMW_KEY = "timemachine", TMW_NAME = "The Time Machine", TMW_LONG = "The Time Machine: Richmond, and the year 802,701";
var TMW = { base: -8600000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
morlocks: [], fx: [], moving: false, ride: null, night: 0, matchT: 0, lights: 0, water: [], inst: [], beasts: [], eloi: [], hgt: null, weena: null, fire: null, dark: 0 };
var TMW_ERA = " It is the 1890s, in H. G. Wells's book The Time Machine (1895; the book only, never any film). Speak in the manner of the time, briefly and in character; keep it kind and suitable for all ages.";
var TMW_SC = {
richmond: { x: 0, name: "Richmond, the Time Traveller's house", bound: 70, env: "evening" },
future: { x: 20000, name: "The year 802,701", bound: 960, env: "golden" },
under: { x: 40000, name: "The Under-world", bound: 140, env: "under" },
further: { x: 60000, name: "The Further Vision", bound: 420, env: "red" }
};
function tmwScAt(x) { var best = null, bd = 1e9; for (var k in TMW_SC) {
var d = Math.abs(x - TMW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 5000 ? best : null; }
var TMW_AT = {
road: { sc: "richmond", x: 0, z: 22, name: "the road outside, at Richmond", ry: 0 },
door: { sc: "richmond", x: 0, z: 11.2, name: "the front door" },
hall: { sc: "richmond", x: 0, z: 4, name: "the hall" },
smoking: { sc: "richmond", x: -7, z: 5, name: "the smoking-room", ry: -Math.PI / 2 },
fire: { sc: "richmond", x: -10.6, z: 5, name: "the fireside in the smoking-room" },
table: { sc: "richmond", x: -6.4, z: 4.4, name: "the little octagonal table" },
dining: { sc: "richmond", x: 7, z: 5, name: "the dining-room", ry: Math.PI / 2 },
lab: { sc: "richmond", x: 7, z: -5, name: "the laboratory", ry: Math.PI / 2 },
machine: { sc: "richmond", x: 8.6, z: -5.6, name: "the Time Machine, in the laboratory" },
study: { sc: "richmond", x: -7, z: -5, name: "the study" },
garden: { sc: "richmond", x: 0, z: -22, name: "the garden behind the house" },
sphinx: { sc: "future", x: 3, z: 20, name: "the lawn of the White Sphinx", ry: 0 },
sphinxfront: { sc: "future", x: 0, z: -1.5, name: "the bronze panels of the pedestal" },
rhodo: { sc: "future", x: -12, z: 10, name: "the rhododendrons round the lawn" },
hall2: { sc: "future", x: 160, z: -84, name: "the great hall of the Eloi", ry: 0 },
halldoor: { sc: "future", x: 160, z: -90, name: "the carved doorway of the great hall" },
hallin: { sc: "future", x: 160, z: -124, name: "inside the great hall, among the tables" },
hilltop: { sc: "future", x: 60, z: -420, name: "the hill-top, and the seat of yellow metal" },
seat: { sc: "future", x: 60, z: -424, name: "the seat of yellow metal" },
river: { sc: "future", x: 60, z: 322, name: "the river's edge, where the Eloi bathe" },
shallows: { sc: "future", x: 64, z: 336, name: "the shallows" },
ruins: { sc: "future", x: -240, z: 30, name: "the great ruined building" },
ruinsin: { sc: "future", x: -240, z: 14, name: "inside the ruin, in the shadows" },
well1: { sc: "future", x: 120, z: 80, name: "a well, with its little cupola" },
well2: { sc: "future", x: -200, z: 76, name: "the well by the ruins" },
well3: { sc: "future", x: -80, z: -260, name: "a well on the slope" },
well4: { sc: "future", x: 300, z: -200, name: "a well among the trees" },
tower: { sc: "future", x: -310, z: -90, name: "a tall tower, its top breathing air" },
wood: { sc: "future", x: -360, z: -300, name: "the edge of the great wood" },
woodmid: { sc: "future", x: -470, z: -430, name: "deep in the wood" },
glade: { sc: "future", x: -420, z: -380, name: "a glade in the wood" },
knoll: { sc: "future", x: -560, z: -520, name: "the knoll where you slept the first night" },
palace: { sc: "future", x: -700, z: -596, name: "the Palace of Green Porcelain", ry: 0 },
palacedoor: { sc: "future", x: -700, z: -606, name: "the great broken valves of the door" },
pal_hall: { sc: "future", x: -700, z: -618, name: "the long gallery" },
pal_fossil: { sc: "future", x: -700, z: -648, name: "the Gallery of Palaeontology" },
pal_min: { sc: "future", x: -738, z: -625, name: "the gallery of minerals" },
pal_mach: { sc: "future", x: -662, z: -650, name: "the gallery of great machines" },
pal_lever: { sc: "future", x: -654, z: -676, name: "the machine with the lever" },
pal_dark: { sc: "future", x: -662, z: -698, name: "the dark end of the gallery of machines" },
pal_lib: { sc: "future", x: -738, z: -672, name: "the gallery of rotting books" },
pal_chem: { sc: "future", x: -700, z: -696, get y() { return tmwFlatH(2) + 2.4; }, name: "the gallery of technical chemistry" },
pal_arms: { sc: "future", x: -738, z: -656, name: "the stands of rusting arms" },
court: { sc: "future", x: -700, z: -730, name: "the little turfed court with three fruit-trees" },
burn: { sc: "future", x: -330, z: -260, name: "the burnt wood, and the hill beyond" },
shaftfoot: { sc: "under", x: 0, z: 0, name: "the foot of the shaft" },
tunnel: { sc: "under", x: 0, z: -30, name: "the tunnel" },
cavern: { sc: "under", x: 0, z: -80, name: "the great cavern of machines" },
meat: { sc: "under", x: 6, z: -84, name: "the table in the cavern" },
shore: { sc: "further", x: 0, z: 0, name: "the shore under the red sun", ry: Math.PI },
crab: { sc: "further", x: -20, z: 30, name: "the slope of the beach" },
snow: { sc: "further", x: 10, z: -10, name: "the beach, thirty million years on" }
};
function tmwAtPt(at) { if (typeof at === "string")
at = TMW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
var TMW_ENV = {
evening: { top: 0x2A3A5A, low: 0x8A7A6A, fog: 0x5A5048, fogD: 0.012, sun: 0.35, sunCol: 0xFFC890, sunDir: [-0.5, 0.4, 0.3], hemi: 0.62, hemiCol: 0xE8D8C0, hemiGround: 0x3A2E24 },
indoor: { top: 0x2A2018, low: 0x4A3A2A, fog: 0x3A2E22, fogD: 0.01, sun: 0.22, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.78, hemiCol: 0xFFE6C0, hemiGround: 0x3A2A1E },
morning: { top: 0x6A9AD8, low: 0xE0E4E0, fog: 0xD0D4D0, fogD: 0.004, sun: 0.9, sunCol: 0xFFF2D8, sunDir: [0.5, 0.7, 0.2], hemi: 0.7, hemiCol: 0xDCE6F0, hemiGround: 0x4A4A3A },
golden: { top: 0x5A8ED8, low: 0xEAE2CE, fog: 0xDAD4C0, fogD: 0.0011, sun: 1.08, sunCol: 0xFFF0D0, sunDir: [0.4, 0.8, 0.3], hemi: 0.76, hemiCol: 0xDCE8F0, hemiGround: 0x4A5A2A },
hail: { top: 0x5A6070, low: 0x9AA0A8, fog: 0x8A9098, fogD: 0.009, sun: 0.5, sunCol: 0xD8DCE8, sunDir: [0.2, 0.9, 0.1], hemi: 0.6, hemiCol: 0xB8C0C8, hemiGround: 0x3A4030 },
sunset: { top: 0x3A4A8A, low: 0xF0A060, fog: 0xD08A60, fogD: 0.0014, sun: 0.75, sunCol: 0xFFA860, sunDir: [-0.8, 0.25, 0.2], hemi: 0.6, hemiCol: 0xF0C8A8, hemiGround: 0x3A3020 },
night: { top: 0x060A18, low: 0x141A2A, fog: 0x10141E, fogD: 0.0045, sun: 0.2, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.26, hemiCol: 0x5A6A98, hemiGround: 0x0A0C10, stars: 0.95 },
moon: { top: 0x0E1630, low: 0x2A3450, fog: 0x1E2638, fogD: 0.0032, sun: 0.38, sunCol: 0xC8D8FF, sunDir: [0.4, 0.6, -0.3], hemi: 0.36, hemiCol: 0x7A8AB8, hemiGround: 0x101418, stars: 0.8 },
palace: { top: 0x2A3A3A, low: 0x6A7A70, fog: 0x4A5650, fogD: 0.012, sun: 0.45, sunCol: 0xE8F0D8, sunDir: [0.3, 0.9, 0.2], hemi: 0.62, hemiCol: 0xC8D8C8, hemiGround: 0x2A2E28 },
under: { top: 0x020202, low: 0x060606, fog: 0x040404, fogD: 0.06, sun: 0.05, sunCol: 0xFFC890, sunDir: [0, 1, 0], hemi: 0.14, hemiCol: 0x6A6A7A, hemiGround: 0x0A0A0A },
fire: { top: 0x1A0A06, low: 0x6A2A10, fog: 0x3A1A10, fogD: 0.006, sun: 0.4, sunCol: 0xFF8A3A, sunDir: [0.1, 0.5, 0.3], hemi: 0.42, hemiCol: 0xFF9A5A, hemiGround: 0x1A0A06 },
red: { top: 0x1A0A20, low: 0x8A2A1A, fog: 0x5A1E18, fogD: 0.0022, sun: 0.8, sunCol: 0xFF5A2A, sunDir: [0.1, 0.18, -0.9], hemi: 0.5, hemiCol: 0xC86A5A, hemiGround: 0x2A1A14 },
dying: { top: 0x050508, low: 0x2A1A20, fog: 0x1A1418, fogD: 0.004, sun: 0.3, sunCol: 0xC84A3A, sunDir: [0.1, 0.12, -0.9], hemi: 0.3, hemiCol: 0x8A6A70, hemiGround: 0x1A1A1E, stars: 0.5 }
};
var TMW_Q = [];
function tmQ(s) { TMW_Q.push(s); return "<i>“" + s + "”</i>"; }
function tmQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0'>" + tmQ(s) + "</p>"; }).join(""); }
function tmEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function tmwLite() { return typeof LITE !== "undefined" && !!LITE; }
function tmwPhotoTex(name, mpt, nrm) { return __ZC(487, 0, this, arguments, new.target); }
function tmwS(name, col, mpt, o) { return __ZC(487, 1, this, arguments, new.target); }
function tmwCanvas(key, w, h, fn) { if (TMW.tex[key])
return TMW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (TMW.tex[key] = t); }
function tmwM(key, make) { return TMW.mats[key] || (TMW.mats[key] = make()); }
function tmwLam(col, o) { return __ZC(487, 2, this, arguments, new.target); }
function tmwShine(col, r, mt) { return tmwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function tmwGlowM(col, op) { return tmwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function tmwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function tmwLeafTex() { return tmwPhotoTexAlpha(); }
function tmwPhotoTexAlpha() { var k = "leafpng"; if (TMW.tex[k])
return TMW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (TMW.tex[k] = t); }
function tmwFrondTex(kind) { return __ZC(487, 3, this, arguments, new.target); }
function tmwBambooTex() { return __ZC(487, 4, this, arguments, new.target); }
function tmwReedTex(kind) { return __ZC(487, 5, this, arguments, new.target); }
function tmwGrassTex() { return __ZC(487, 6, this, arguments, new.target); }
function tmwFlowerTex(col) { return __ZC(487, 7, this, arguments, new.target); }
function tmwSkinTex(kind) { return __ZC(487, 8, this, arguments, new.target); }
function tmwRippleTex() { return __ZC(487, 9, this, arguments, new.target); }
function tmwWaterM(col, op) { return tmwM("water" + col + "|" + op, function () { var t = tmwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var TMW_CELL = 48;
function tmwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / TMW_CELL), b = Math.floor(x1 / TMW_CELL), c = Math.floor(z0 / TMW_CELL), d = Math.floor(z1 / TMW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function tmwGridAdd(S) { var g = TMW.sgrid || (TMW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; tmwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function tmwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; TMW.solids.push(S); tmwGridAdd(S); return S; }
function tmwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; TMW.solids.push(S); tmwGridAdd(S); return S; }
function tmwSolidAt(x, z, feet) { return __ZC(487, 10, this, arguments, new.target); }
function tmwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; TMW.floors.push(F); return F; }
function tmwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; TMW.floors.push(F); return F; }
function tmwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function tmwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function tmwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < TMW.floors.length; i++) {
var F = TMW.floors[i];
if (F.off || !tmwFloorIn(F, x, z))
continue;
var y = tmwFloorY(F, x, z);
if (y <= feet + 1.1 && (best === null || y > best))
best = y;
} return best; }
function tmwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; TMW.spots.push(S); return S; }
function tmwPerson(seed, x, z, y, o, ry) { return __ZC(487, 11, this, arguments, new.target); }
function tmwTalk(P, name, persona, greet, r, fn) { TMW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona + TMW_ERA, greet: greet } }); return P; }
function tmwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(487, 12, this, arguments, new.target); }
function tmwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function tmwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = tmwHash(ix, iz), b = tmwHash(ix + 1, iz), c = tmwHash(ix, iz + 1), d = tmwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function tmwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * tmwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function tmwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function tmwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), tmwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); TMW.water.push(m); return m; }
var TMW_GEO = {};
function tmwGeo(k, make) { if (TMW_GEO[k])
return TMW_GEO[k]; var g = make(); g.userData.shared = 1; return (TMW_GEO[k] = g); }
function tmwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function tmwFronds(n, len, wid, droop, y0, ring) { return __ZC(487, 13, this, arguments, new.target); }
function tmwInst(P, geo, mat, list, o) { return __ZC(487, 14, this, arguments, new.target); }
function tmwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function tmwPathD(x, z, pts) { var best = 1e9; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = Math.sqrt(px * px + pz * pz);
if (d < best)
best = d;
} return best; }
function tmwStrip(P, pts, w, hfn, mat, lift) { return __ZC(487, 15, this, arguments, new.target); }
function tmwPlant(P, kind, list, o) { return __ZC(487, 16, this, arguments, new.target); }
function tmwTaper(pts, rads, seg, rs, flat) { return __ZC(487, 17, this, arguments, new.target); }
function tmwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function tmwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function tmwSkinM(kind, col) { return __ZC(487, 18, this, arguments, new.target); }
function tmwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), tmwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function tmwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(487, 19, this, arguments, new.target); }
function tmwBoxG(w, h, d) { return __ZC(487, 20, this, arguments, new.target); }
function tmwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(tmwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !tmwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
tmwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function tmwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(tmwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function tmwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(487, 21, this, arguments, new.target); }
function tmwHouse(P, x, z, w, d, h, o) { return __ZC(487, 22, this, arguments, new.target); }
function tmwLand(x, z) { return TMW.hgt ? TMW.hgt(x, z) : 0; }
function tmwGround(x, z, feet) { var f = tmwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = tmwLand(x, z); return f === null ? h : Math.max(f, h); }
var TMW_SCN = {};
function tmwSc() { return TMW_SC[TMW.sc] || TMW_SC.richmond; }
function tmwSceneDrop() { return __ZC(487, 23, this, arguments, new.target); }
function tmwScene(k) { return __ZC(487, 24, this, arguments, new.target); }
function tmwVeil() { if (TMW.veil)
return TMW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); TMW.veil = v; return v; }
function tmwGo(at, msg, after) { return __ZC(487, 25, this, arguments, new.target); }
function tmwSmoke(P, x, y, z, col, n) { return __ZC(487, 26, this, arguments, new.target); }
function tmwFire(P, x, y, z, s) { return __ZC(487, 27, this, arguments, new.target); }
function tmwLocalSc() { var L = worldLocal(); return { x: L.x - tmwSc().x, z: L.z }; }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
Object.assign(DLN_WEAR, {
tmeve: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:tails:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xFAF8F2, collar: 0xFAF8F2, tie: o.r < 0.5 ? 0xF4F2EC : 0x141414, vest: o.r < 0.6 ? 0xF0ECE2 : 0x1A1A1E, coat: 0x16161A, trou: 0x16161A }, shoes: 0x0E0E10 };
},
tmtrav: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:vest:cloth:chain", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xF0ECE2, collar: 0xF0ECE2, tie: 0x3A2A2A, vest: 0x4A4A4E, coat: 0x5A5A60, trou: 0x5A5A60 }, shoes: 0x2A1E16 };
},
tmworn: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:vest:cloth", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xC8C0A8, collar: 0xC8C0A8, tie: 0x3A2A2A, vest: 0x5A5450, coat: 0x6A645A, trou: 0x6A645A }, shoes: 0x4A3E30 };
},
tmkeep: function (o) {
return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.18:cloth", "oz:collar:high:none", "oz:apron:half:long:0.2"],
col: { dress: 0x1E1E22, skirt: 0x1E1E22, trim: 0x2A2A2E, collar: 0xF8F6F0, apron: 0xF4F2EC }, shoes: 0x141414 };
},
tmstreet: function (o) {
var c = [0x2A2A30, 0x3A342C, 0x2E3440, 0x4A4036][Math.floor(o.r * 4) % 4];
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:frock:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xF4F0E6, collar: 0xF4F0E6, tie: 0x2A2A3A, vest: c, coat: c, trou: 0x3A3A40 }, shoes: 0x141414 };
},
tmlady: function (o) {
var c = [0x4A3A5A, 0x2A3A4A, 0x6A4A3A, 0x3A4A3A, 0x7A6A8A][Math.floor(o.r * 5) % 5];
return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.24:cloth", "oz:collar:high:none"].concat(o.r > 0.6 ? ["oz:pelerine"] : []),
col: { dress: c, skirt: c, trim: 0xC8B898, collar: 0xF8F4EC, cape: 0x2A2A2E }, shoes: 0x1A1414 };
},
tmeloi: function (o) {
var t = [0x7A3A8A, 0xC86A9A, 0xE8D8A8, 0x8AB8D8, 0xD8A84A, 0xF0F0E8, 0x9AC88A][Math.floor(o.r * 7) % 7], tr = [0xC8A048, 0xE8E0C8, 0x6A4A2A][Math.floor(o.r * 3) % 3];
return { ids: ["oz:bodice:cap:cloth", "oz:skirt:knee:0.06:cloth", "oz:sash"], col: { dress: t, skirt: t, trim: tr, sash: 0x6A4A2A }, shoes: 0xC8A878 };
}
});
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { tmeve: [null], tmtrav: [null], tmworn: [null], tmkeep: [null], tmstreet: ["tophat", "bowler", "bowler", null], tmlady: ["ladyhat", "bonnet"], tmeloi: [null] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { tmeve: [null], tmtrav: [null], tmworn: [null], tmkeep: [null], tmstreet: ["stick", null, "paper"], tmlady: ["parasol", null, "bag"], tmeloi: [null, "flowers", null] });
})();
function tmwDressed(seed, dress, o) { return __ZC(487, 28, this, arguments, new.target); }
var TMW_TRAV = "You are the Time Traveller, from H. G. Wells's The Time Machine (1895; the book only, never any film): a scientist and inventor in Richmond, with pale grey eyes that shine and twinkle, an eager, persuasive talker, playful, a little mischievous, never quite believed because you are 'too clever to be believed'. You hold that time is only a fourth dimension of space, and you have built a machine to travel in it. Your friends call you only the Time Traveller.";
var TMW_TRAV2 = "You are the Time Traveller, from H. G. Wells's The Time Machine (1895; the book only, never any film), just back from the year 802,701: haggard, dusty, limping, a cut on your chin, but burning to tell the story. You have seen the gentle Eloi and the Morlocks under the ground, lost and found your machine, lost Weena in the fire in the wood, and stood on the last shore under a red sun. You speak quietly, gravely, sometimes with a bitter little laugh.";
var TMW_PSY = "You are the Psychologist, one of the Time Traveller's Thursday guests in H. G. Wells's The Time Machine (1895; the book only, never any film): careful, logical, a little pedantic, sceptical but fair; you explain things in terms of the mind and perception. You think the vanishing model may be a trick.";
var TMW_MED = "You are the Medical Man, one of the Time Traveller's Thursday guests in H. G. Wells's The Time Machine (1895; the book only, never any film): a sensible doctor, kindly, practical, worried for your friend's health; you want proofs, and you look at everything as a physician would.";
var TMW_MAYOR = "You are the Provincial Mayor, one of the Time Traveller's Thursday guests in H. G. Wells's The Time Machine (1895; the book only, never any film): a worthy, slow, rather pompous man from the country, understanding about half of what is said, very fond of plain common sense.";
var TMW_FILBY = "You are Filby, one of the Time Traveller's Thursday guests in H. G. Wells's The Time Machine (1895; the book only, never any film): 'an argumentative person with red hair', who contradicts everything, always ready with an anecdote that never gets finished. Secretly you are very fond of the Time Traveller.";
var TMW_VYM = "You are the Very Young Man, one of the Time Traveller's Thursday guests in H. G. Wells's The Time Machine (1895; the book only, never any film): eager, excitable, full of jokes about using a time machine to invest money, to see Homer and Plato, to pass examinations. Enthusiastic and a little silly, and good-hearted.";
var TMW_ED = "You are the Editor, a guest at the Time Traveller's Thursday dinners in H. G. Wells's The Time Machine (1895; the book only, never any film): the editor of a well-known daily paper, worldly, quick, cynical, always looking for the headline; you call the Time Traveller's story 'a good yarn'.";
var TMW_JOU = "You are the Journalist, a guest at the Time Traveller's Thursday dinners in H. G. Wells's The Time Machine (1895; the book only, never any film): a lively newspaperman who makes jokes at everything and asks for a 'special' on the future.";
var TMW_SIL = "You are the Silent Man, a guest at the Time Traveller's Thursday dinners in H. G. Wells's The Time Machine (1895; the book only, never any film): a quiet, shy man who hardly speaks; when you do, it is a few words only, and they are kind.";
var TMW_WAT = "You are Mrs. Watchett, the Time Traveller's housekeeper at Richmond, in H. G. Wells's The Time Machine (1895; the book only, never any film): brisk, motherly, practical, a little alarmed by your master's strange machines and late hours, and devoted to him.";
var TMW_ELOI = "You are one of the Eloi, the little people of the year 802,701 in H. G. Wells's The Time Machine (1895; the book only, never any film): about four feet high, slight and graceful, in a bright tunic and sandals, with soft curly hair, little ears and a small mouth with bright red lips. You are gentle, merry, childlike and easily tired; you laugh a great deal, love flowers and fruit, play in the sunshine, and are afraid of the dark. You speak a soft, sweet, liquid language the visitor does not know: answer with a few musical words of your own, gestures and laughter, simply and warmly, and lose interest quickly.";
var TMW_WEENA = "You are Weena, one of the Eloi of the year 802,701 in H. G. Wells's The Time Machine (1895; the book only, never any film): small, gentle, loving and brave in your own way. The Time Traveller saved you from drowning in the river, and you follow him everywhere, giving him flowers, crying when he leaves you. You fear the dark and the Morlocks more than anything. You speak only your own soft language, with a few words and many gestures; you call him by no name, but you love him.";
var TMW_FOLK = {
trav: { name: "The Time Traveller", dress: "tmtrav", sex: "m", hair: 0x6A5A4A, persona: "trav", greet: "Ah, there you are. Sit down, sit down. You must follow me carefully: I shall have to controvert one or two ideas that are almost universally accepted." },
trav2: { name: "The Time Traveller", dress: "tmworn", sex: "m", hair: 0x6A5A4A, persona: "trav2", greet: "I'm starving for a bit of meat. Don't ask me any questions yet: let me tell it my own way." },
psych: { name: "The Psychologist", dress: "tmeve", sex: "m", beard: "short", hair: 0x4A3A2A, persona: "psych", greet: "Good evening. You have come to see his latest paradox, I suppose?" },
medic: { name: "The Medical Man", dress: "tmeve", sex: "m", beard: "mustache", hair: 0x2A2420, persona: "medic", greet: "Evening. He looks well, at least: a touch of fever about the eyes, perhaps." },
mayor: { name: "The Provincial Mayor", dress: "tmeve", sex: "m", beard: "full", hair: 0x8A8A86, scale: [1.12, 0.98, 1.12], persona: "mayor", greet: "Ah. How d'ye do. Clever fellow, our host. Too clever by half, if you ask me." },
filby: { name: "Filby", dress: "tmeve", sex: "m", hair: 0xA84A1E, persona: "filby", greet: "I don't believe a word of it, and I shall say so. That reminds me of a conjuror I once saw at Burslem..." },
vym: { name: "The Very Young Man", dress: "tmeve", sex: "m", hair: 0xC8A060, scale: [0.96, 0.98, 0.96], persona: "vym", greet: "I say! Have you heard? He says he can travel in time! Think of the investments!" },
editor: { name: "The Editor", dress: "tmeve", sex: "m", beard: "mustache", hair: 0x3A3A3A, persona: "editor", greet: "Evening. Where's our host? Late again, I suppose." },
journal: { name: "The Journalist", dress: "tmeve", sex: "m", hair: 0x5A4A3A, persona: "journal", greet: "Evening! Any copy in it tonight, do you think?" },
silent: { name: "The Silent Man", dress: "tmeve", sex: "m", beard: "short", hair: 0x2A2A2A, persona: "silent", greet: "(He nods, and smiles shyly.)" },
watchett: { name: "Mrs. Watchett", dress: "tmkeep", sex: "f", hair: 0x7A7A76, persona: "watchett", greet: "Good evening, sir. The master's in the laboratory again, I don't doubt." },
weena: { name: "Weena", dress: "tmeloi", sex: "f", hair: 0xD8B060, skin: 0xF8E4D8, scale: [0.72, 0.72, 0.72], persona: "weena", greet: "(She laughs, and puts a flower into your hand.)" }
};
function tmwPersona(k) { return { trav: TMW_TRAV, trav2: TMW_TRAV2, psych: TMW_PSY, medic: TMW_MED, mayor: TMW_MAYOR, filby: TMW_FILBY, vym: TMW_VYM, editor: TMW_ED, journal: TMW_JOU, silent: TMW_SIL, watchett: TMW_WAT, eloi: TMW_ELOI, weena: TMW_WEENA }[k] || k || ""; }
function tmwFolk(key, x, z, ry, o) { return __ZC(487, 29, this, arguments, new.target); }
var TMW_ELOI_NAMES = ["one of the Eloi", "a laughing Eloi", "an Eloi with flowers", "a sleepy Eloi", "an Eloi in a purple tunic", "a little Eloi girl", "an Eloi boy"];
var TMW_ELOI_SAY = ["(Soft, sweet, liquid words, and a peal of laughter.)", "(A garland of flowers is dropped round your neck, with a laugh.)", "(Bright eyes, a quick question in a cooing voice, and then they lose interest and drift away.)", "(They point at the sun, and then at you, and ask, in their gentle way: did you come from the sun?)", "(A fruit is put into your hand: a sort of floury thing in a three-sided husk.)", "(A yawn, a smile, and they wander off among the flowers.)"];
function tmwEloi(seed, n, x0, z0, x1, z1, o) { return __ZC(487, 30, this, arguments, new.target); }
function tmwMorlock(seed) { return __ZC(487, 31, this, arguments, new.target); }
function tmwMorlockPose(g, t, run) {
var J = g.userData.j;
if (!J)
return;
var s = run ? Math.sin(t * 9) : Math.sin(t * 1.4) * 0.15;
J.legs[0].rotation.x = s * 0.6;
J.legs[1].rotation.x = -s * 0.6;
J.arms[0].rotation.x = -0.9 - s * 0.5;
J.arms[1].rotation.x = -0.9 + s * 0.5;
J.H.rotation.y = Math.sin(t * 0.7) * 0.4;
}
function tmwMat(k) { return __ZC(487, 32, this, arguments, new.target); }
function tmwMachine(s) { return __ZC(487, 33, this, arguments, new.target); }
function tmwDialsSet(M, days) {
var D = M && M.userData.dials;
if (!D)
return;
var v = [days % 1000 / 1000, (days / 1000) % 1000 / 1000, (days / 1e6) % 1000 / 1000, (days / 1e9) % 1000 / 1000];
D.forEach(function (h, i) { h.rotation.z = -v[i] * Math.PI * 2; });
}
function tmwChair(P, x, z, ry, mat, arm) { return __ZC(487, 34, this, arguments, new.target); }
function tmwTable(P, x, z, w, d, h, mat, cloth) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
tmwBox(g, w, 0.06, d, cloth || mat, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { tmwBox(g, 0.07, h - 0.06, 0.07, mat, q[0] * (w / 2 - 0.1), 0, q[1] * (d / 2 - 0.1)); });
if (cloth)
tmwBox(g, w + 0.06, 0.3, d + 0.06, cloth, 0, h - 0.34, 0);
return g;
}
function tmwShelves(P, x, z, w, h, ry) { return __ZC(487, 35, this, arguments, new.target); }
function tmwLily(P, x, y, z) { return __ZC(487, 36, this, arguments, new.target); }
function tmwRug(P, x, z, w, d, col) { return __ZC(487, 37, this, arguments, new.target); }
function tmwSash(P, x, y, z, ry, w, h) { return __ZC(487, 38, this, arguments, new.target); }
var TMW_HOUSE = { x0: -13, x1: 13, z0: -10, z1: 10, h1: 3.7, h2: 7.2 };
function tmwWallZ(P, z, x0, x1, mat, inner, gaps, h) { return __ZC(487, 39, this, arguments, new.target); }
function tmwWallX(P, x, z0, z1, mat, inner, gaps, h) { return __ZC(487, 40, this, arguments, new.target); }
function tmwPaper(P, x0, x1, z0, z1, mat, dx, dz) { return __ZC(487, 41, this, arguments, new.target); }
function tmwRichmondHouse(G) { return __ZC(487, 42, this, arguments, new.target); }
function tmwRichmondOut(G) { return __ZC(487, 43, this, arguments, new.target); }
TMW_SCN.richmond = { h: function () { return 0; }, start: { x: 0, z: 22, ry: 0 },
build: function (G) { tmwRichmondHouse(G); tmwRichmondOut(G); TMW.inHouse = false; } };
var TMW_VILLAS = [[-46, 0, 0], [46, 0, 0], [-66, 46, 1], [-38, 46, 1], [-6, 46, 1], [26, 46, 1], [58, 46, 1]];
var TMW_VILLA_FOLK = [
["Mr. Hartley, a stockbroker", "m", "tmstreet", "Come in, come in. You're from the house with the brass lamp? Your friend's laboratory hums all night, you know. My wife swears she saw a light go clean through the wall."],
["Mrs. Pell, a widow", "f", "tmlady", "Good evening. Do sit down; the kettle is on. I keep the parlour as my husband liked it."],
["Dr. Sheen, a retired surgeon", "m", "tmstreet", "Evening. I keep my old instruments in that cabinet, and read the Lancet by the fire. What brings you?"],
["Miss Ada Crane, a governess", "f", "tmlady", "Oh! Good evening. The children are in bed at last. Mind the dolls' house."],
["Mr. Bolt, an engineer", "m", "tmstreet", "Evening. Dynamos, sir, are the coming thing. Electric light in every house on this road within ten years, you mark me."],
["Mrs. Dacre, a painter", "f", "tmlady", "Come in, but mind the wet canvas. I paint the river at Richmond every morning in a different light."],
["Mr. Lamb, a curate", "m", "tmstreet", "Good evening, good evening. I am writing Sunday's sermon, on the lilies of the field."],
["The Misses Grey, two sisters", "f", "tmlady", "Good evening! Will you take a cup of tea? Sister plays the piano after supper, if you care to stay."],
["Mr. Fenn, a bookseller", "m", "tmstreet", "Evening. Every book in this house I have read twice. Mr. Wells? No, I don't know the name."]
];
var TMW_VILLA_P = "You live in a villa on a quiet road in Richmond, Surrey, in the 1890s, in the world of H. G. Wells's The Time Machine (the book only), and you are at home in your front parlour of an evening. You are polite, a little curious about the visitor, and talk about your own life, your street and your neighbour, the clever odd gentleman with the laboratory who dines his friends on Thursdays. You know nothing of time travelling.";
function tmwVillaIn(i) { return { x: -120 + i * 30, z: -300 }; }
function tmwVillas(G) { return __ZC(487, 44, this, arguments, new.target); }
function tmwInVilla(x, z) { if (TMW.sc !== "richmond")
return -1; for (var i = 0; i < TMW_VILLAS.length; i++) {
var I = tmwVillaIn(i);
if (Math.abs(x - I.x) < 5.5 && Math.abs(z - I.z) < 4.5)
return i;
} return -1; }
(function () {
var bl = tmwBlockL;
tmwBlockL = function (x, z, feet) {
if (TMW.sc === "richmond" && !TMW.moving && !TMW.ride) {
var L = worldLocal(), was = tmwInVilla(L.x - tmwSc().x, L.z);
if (was >= 0)
return tmwInVilla(x, z) !== was || tmwSolidAt(x, z, feet);
}
return bl.apply(this, arguments);
};
var ih = tmwInHouse;
tmwInHouse = function (x, z) { return ih.apply(this, arguments) || tmwInVilla(x, z) >= 0; };
})();
(function () { var b0 = TMW_SCN.richmond.build; TMW_SCN.richmond.build = function (G) { b0.apply(this, arguments); tmwVillas(G); }; })();
function tmwRiverZ(x) { return 360 + Math.sin(x * 0.004) * 28 + Math.sin(x * 0.011 + 1) * 8; }
var TMW_FLAT = [{ x: 0, z: 4, r: 34, e: 22, h: null }, { x: 160, z: -124, r: 46, e: 26, h: null }, { x: -700, z: -656, r: 86, e: 30, h: null }, { x: 60, z: -424, r: 14, e: 20, h: null }, { x: -240, z: 24, r: 30, e: 16, h: null }, { x: -560, z: -520, r: 16, e: 14, h: null }];
function tmwFutRaw(x, z) { return __ZC(487, 45, this, arguments, new.target); }
function tmwFutH(x, z) {
var h = tmwFutRaw(x, z);
for (var i = 0; i < TMW_FLAT.length; i++) {
var F = TMW_FLAT[i];
if (F.h === null)
F.h = tmwFutRaw(F.x, F.z);
var d = Math.hypot(x - F.x, z - F.z);
if (d < F.r + F.e) {
var t = 1 - tmwSmooth(F.r, F.r + F.e, d);
h = h * (1 - t) + F.h * t;
}
}
return h;
}
function tmwFlatH(i) { var F = TMW_FLAT[i]; if (F.h === null)
F.h = tmwFutRaw(F.x, F.z); return F.h; }
function tmwSphinx(G, x, z) { return __ZC(487, 46, this, arguments, new.target); }
function tmwGreatHall(G) { return __ZC(487, 47, this, arguments, new.target); }
function tmwWell(G, x, z, s) { return __ZC(487, 48, this, arguments, new.target); }
function tmwVentTower(G, x, z, h) { return __ZC(487, 49, this, arguments, new.target); }
function tmwPile(G, x, z, w, d, h, seed, ruin) { return __ZC(487, 50, this, arguments, new.target); }
function tmwSeat(G, x, z) { return __ZC(487, 51, this, arguments, new.target); }
var TMW_PAL = { x0: -760, x1: -640, z0: -705, z1: -610, h: 14 };
function tmwPalace(G) { return __ZC(487, 52, this, arguments, new.target); }
(function () {
var p0 = tmwPlant;
tmwPlant = function (P, kind, list, o) {
o = o || {};
if (!list || !list.length)
return;
var leaf = tmwLeafTex(), lite = tmwLite();
if (kind === "birch") {
tmwInst(P, tmwGeo("birt", function () { var g = new THREE.CylinderGeometry(0.16, 0.26, 11, 7); g.translate(0, 5.5, 0); return g; }), tmwS("bark", 0xF0EEE6, 1.6), list, { shadow: !lite });
tmwInst(P, tmwGeo("birc", function () { var parts = [], R = wRand(15); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(1.4 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.6, 7.5 + R() * 4, (R() - 0.5) * 2.6);
c.scale(1, 1.3, 1);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), tmwM("birl", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AB050, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
return;
}
if (kind === "fruit") {
p0(P, "tree", list, { col: 0x5A8A3A, keepAll: o.keepAll });
tmwInst(P, tmwGeo("fruitb", function () { var parts = [], R = wRand(19); for (var i = 0; i < 18; i++) {
var c = new THREE.SphereGeometry(0.16, 6, 5);
c.translate((R() - 0.5) * 5, 7.4 + R() * 3.6, (R() - 0.5) * 5);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), tmwLam(0xD8503A), list, {});
return;
}
if (kind === "rhodo") {
p0(P, "bush", list.map(function (t) { return { x: t.x, z: t.z, y: t.y, s: (t.s || 1) * 1.6, ry: t.ry }; }), { col: 0x2E4A26, keepAll: o.keepAll });
tmwInst(P, tmwGeo("rhodf", function () { var parts = [], R = wRand(23); for (var i = 0; i < 22; i++) {
var c = new THREE.IcosahedronGeometry(0.22, 0);
c.translate((R() - 0.5) * 2.8, 1.2 + R() * 1.3, (R() - 0.5) * 2.8);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), tmwLam(o.col || 0xB04A9A), list.map(function (t) { return { x: t.x, z: t.z, y: t.y, s: (t.s || 1) * 1.6, ry: t.ry }; }), {});
return;
}
if (kind === "ivy") {
p0(P, "bush", list.map(function (t) { return { x: t.x, z: t.z, y: t.y, s: (t.s || 1), sy: (t.s || 1) * 2.4, ry: t.ry }; }), { col: 0x2A4A22, keepAll: 1 });
return;
}
return p0.apply(this, arguments);
};
})();
function tmwRiver(G) { var pts = []; for (var x = -980; x <= 980; x += 20)
pts.push([x, tmwRiverZ(x)]); var m = tmwStrip(G, pts, 96, null, tmwWaterM(0x4A7A8A, 0.88), -0.5); TMW.water.push(m); m.material.map.repeat.set(0.05, 0.05); return m; }
function tmwFutClear(x, z) { return __ZC(487, 53, this, arguments, new.target); }
function tmwInWood(x, z) { var dx = (x + 470) / 230, dz = (z + 430) / 180; return dx * dx + dz * dz < 1; }
function tmwTreesSolid(list, r) { list.forEach(function (t) { tmwRound(t.x, t.z, (r || 0.7) * (t.s || 1), t.y - 1, t.y + 12); }); }
TMW_SCN.future = { h: tmwFutH, start: { x: 3, z: 20, ry: 0 },
build: function (G) { return __ZC(487, 54, this, arguments, new.target); } };
TMW_SCN.future.wl = function (x, z) { return Math.abs(z - tmwRiverZ(x)) < 38 ? -0.5 : null; };
function tmwCaveWall(G, x, z, w, d, h, rot) { var m = tmwBox(G, w, h, d, tmwMat("cave"), x, 0, z, rot || 0, true); return m; }
TMW_SCN.under = { h: function () { return 0; }, start: { x: 0, z: -2, ry: 0 },
build: function (G) { return __ZC(487, 55, this, arguments, new.target); } };
TMW_SCN.under.wl = null;
function tmwCrab(s) { return __ZC(487, 56, this, arguments, new.target); }
TMW_SCN.further = { h: function (x, z) { var b = -2 + z * 0.06 + tmwFbm(x * 0.02, z * 0.02, 3) * 2; return b; }, start: { x: 0, z: 12, ry: Math.PI },
build: function (G) { return __ZC(487, 57, this, arguments, new.target); } };
TMW_SCN.further.wl = function (x, z) { return z < -8 ? -0.2 : null; };
function tmwFurtherSet(stage) { TMW.furtherStage = stage; if (TMW.eclipse)
TMW.eclipse.visible = stage >= 3; if (TMW.snow)
TMW.snow.visible = stage >= 2; if (TMW.blob)
TMW.blob.visible = stage >= 3; (TMW.crabs || []).forEach(function (C) { C.g.visible = stage < 2; }); }
function tmwRideVeil() { return __ZC(487, 58, this, arguments, new.target); }
function tmwYearStr(y) { y = Math.round(y); var s = Math.abs(y).toLocaleString("en-GB"); return y < 0 ? s + " B.C." : "A.D. " + s; }
function tmwRide(o) {
if (TMW.ride)
return;
var v = tmwRideVeil();
worldCard(null);
worldPrompt(null);
TMW.ride = { t: 0, o: o, swapped: false, sec: window.SBK_FAST ? 1.2 : (o.sec || 22) };
v.style.opacity = "1";
if (typeof tmbTune === "function")
tmbTune("ride");
if (typeof playTone === "function")
try {
playTone(220, 0.12);
}
catch (e) { }
}
function tmwRideTick(dt) { return __ZC(487, 59, this, arguments, new.target); }
function tmwMatchBtn() { return __ZC(487, 60, this, arguments, new.target); }
function tmwMatchesN() { var S = typeof tmbS === "function" ? tmbS() : null; return S && S.f ? (S.f.matches || 0) : 0; }
function tmwStrike() { return __ZC(487, 61, this, arguments, new.target); }
function tmwMatchTick(dt) { return __ZC(487, 62, this, arguments, new.target); }
(function () { if (typeof document === "undefined")
return; document.addEventListener("keydown", function (e) { if ((e.key === "f" || e.key === "F") && WLD && WLD.on === TMW_KEY && !e.repeat) {
var a = document.activeElement;
if (a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA"))
return;
if (tmwMatchesN() > 0 && (TMW.sc === "under" || TMW.night))
tmwStrike();
} }); })();
function tmwWeenaTick(dt, L) { return __ZC(487, 63, this, arguments, new.target); }
function tmwMorlockAdd(x, z, seed) { if (!TMW.scG)
return null; var m = tmwMorlock(seed || Math.round(x * 7 + z)); m.position.set(x, tmwGround(x, z, 500), z); TMW.scG.add(m); var M = { g: m, home: { x: x, z: z }, t: Math.random() * 10, flee: 0, out: true }; TMW.morlocks.push(M); return M; }
function tmwMorlocksClear() { (TMW.morlocks || []).forEach(function (M) { if (M.out && M.g.parent)
M.g.parent.remove(M.g); }); TMW.morlocks = (TMW.morlocks || []).filter(function (M) { return !M.out; }); }
function tmwMorlocksTick(dt, L) { return __ZC(487, 64, this, arguments, new.target); }
function tmwInHouse(x, z) { return TMW.sc === "richmond" && x > TMW_HOUSE.x0 && x < TMW_HOUSE.x1 && z > TMW_HOUSE.z0 && z < TMW_HOUSE.z1; }
function tmwInPalace(x, z) { return TMW.sc === "future" && x > TMW_PAL.x0 && x < TMW_PAL.x1 && z > TMW_PAL.z0 && z < TMW_PAL.z1; }
function tmwInHall(x, z) { return TMW.sc === "future" && Math.abs(x - 160) < 15 && Math.abs(z + 124) < 28; }
function tmwEnvNow() { return __ZC(487, 65, this, arguments, new.target); }
function tmwBlockL(x, z, feet) { return __ZC(487, 66, this, arguments, new.target); }
function tmwPlaceName(L) { var best = null, bd = 1e9; for (var k in TMW_AT) {
var A = TMW_AT[k];
if (A.sc !== TMW.sc)
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A;
}
} return best && bd < 60 ? best.name : tmwSc().name; }
function tmwTick(dt) { return __ZC(487, 67, this, arguments, new.target); }
function tmwBuild(G) { TMW.G = G; TMW.lite = tmwLite(); TMW.built = true; }
if (typeof worldDef === "function")
worldDef(TMW_KEY, {
base: TMW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return tmwEnvNow(); },
build: function (G) { tmwBuild(G); },
enter: function (opt) { return __ZC(487, 68, this, arguments, new.target); },
leave: function () { TMW.ride = null; TMW.moving = false; if (TMW.veil)
TMW.veil.style.opacity = "0"; if (TMW.rideV)
TMW.rideV.style.opacity = "0"; if (TMW.mBtn)
TMW.mBtn.style.display = "none"; if (typeof tmbLeave === "function")
try {
tmbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = tmwSc(); return tmwGround(x - S.x, z, feet); },
block: function (x, z, feet) { var S = tmwSc(); return tmwBlockL(x - S.x, z, feet); },
tick: function (dt) { tmwTick(dt); },
back: function () { var D = TMW_SCN[TMW.sc]; tmwGo(D && D.start ? { sc: TMW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "road"); }
});
function tmwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(TMW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(TMW_KEY) < 0)
WLG.keys.push(TMW_KEY);
function tmwForget() { return __ZC(487, 69, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === TMW_KEY)
tmwForget(); return r; }; })();
(function () { var d0 = tmwSceneDrop; tmwSceneDrop = function () { d0.apply(this, arguments); TMW.lights = 0; TMW.matchLightF = null; TMW.matchLight = null; TMW.morlocks = []; TMW.eloi = []; TMW.crabs = []; TMW.engines = []; TMW.panels = null; TMW.eloiNight = null; TMW.machineLab = TMW.machineF = TMW.machineX = null; }; })();
function tmwFromMuseum() { try {
worldCard(null);
}
catch (e) { } tmwEnter({ at: "road" }); }
var TMB_CH = [];
var TMB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var TMB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function tmbS() { if (!store.tmbook)
store.tmbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.tmbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function tmbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function tmbStep() { var S = tmbS(), C = TMB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function tmbActive() { var S = tmbS(); return !!(S.started && !S.done && WLD.on === TMW_KEY); }
function tmbKey() { var S = tmbS(); return S.done ? "done" : S.ch + "." + S.s; }
function tmbSay(h) { setStatus(h); }
function tmbQ(s) { return tmQ(s); }
function tmbQs() { return tmQs.apply(null, arguments); }
function tmbPos(at) { return __ZC(487, 70, this, arguments, new.target); }
function tmbScName(k) { return (TMW_SC[k] || {}).name || k; }
function tmbWay(P, L) { return __ZC(487, 71, this, arguments, new.target); }
function tmbBeam() { return __ZC(487, 72, this, arguments, new.target); }
function tmbItemMesh(kind) { return __ZC(487, 73, this, arguments, new.target); }
function tmbItemsClear() { TMB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = TMW.spots.indexOf(I.S); if (j >= 0)
TMW.spots.splice(j, 1); }); TMB.items = []; }
function tmbItemAdd(kind, P, name, verb, onTake) { return __ZC(487, 74, this, arguments, new.target); }
var TMB_TUNES = { home: "assets/westminster/baker-street-air.mp3", golden: "assets/neverland/morning-mood.mp3", eloi: "assets/erebos/gymnopedie.mp3", dread: "assets/poe/funeral.mp3", night: "assets/verne/moonlight.mp3", palace: "assets/verne/toccata.mp3", fire: "assets/neverland/mountain-king.mp3", end: "assets/erebos/hymn-to-the-sun.mp3", ride: "assets/grimm/nachtmusik.mp3" };
function tmbTune(k) { return __ZC(487, 75, this, arguments, new.target); }
function tmbText(fn) { return __ZC(487, 76, this, arguments, new.target); }
function tmbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function tmbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var TMB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>H. G. Wells's own words, as printed in 1895.</div>";
function tmbReadAll(i) { return __ZC(487, 77, this, arguments, new.target); }
function tmbChapterCard() { return __ZC(487, 78, this, arguments, new.target); }
function tmbKeeperBtns(fns) { return __ZC(487, 79, this, arguments, new.target); }
function tmbJump(i) { var S = tmbS(); S.ch = Math.max(0, Math.min(TMB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; tmbSave(); tmbChapterBegin(true); }
function tmbStV(v) { return typeof v === "function" ? v(tmbS().s) : v; }
function tmbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function tmbWorldState() {
var S = tmbS(), C = TMB_CH[S.ch] || {}, st = C.state || {};
TMW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
TMW.envK = tmbStV(st.env) || null;
if (typeof tmwStateApply === "function")
try {
tmwStateApply(st, S.s);
}
catch (e) { }
worldEnv(tmwEnvNow());
}
function tmbChapterBegin(place) { return __ZC(487, 80, this, arguments, new.target); }
function tmbStepBegin() { return __ZC(487, 81, this, arguments, new.target); }
function tmbPuzzleCard(b) { return __ZC(487, 82, this, arguments, new.target); }
function tmbStepDone() { return __ZC(487, 83, this, arguments, new.target); }
function tmbFinish() { return __ZC(487, 84, this, arguments, new.target); }
function tmbCastName(c) { return c.name || (TMW_FOLK[c.k] || {}).name || c.k; }
function tmbCastLive(C) { return !!(C && C.g && C.g.parent); }
function tmbCastAdd(c) { return __ZC(487, 85, this, arguments, new.target); }
function tmbCastHide(key) { var C = TMB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); TMW.talk = TMW.talk.filter(function (T) { return T.p !== C.P; }); TMW.people = TMW.people.filter(function (p) { return p !== C.P; }); delete TMB.cast[key]; }
function tmbCastClear() { for (var k in TMB.cast)
tmbCastHide(k); TMB.cast = {}; }
function tmbCastMove(key, at, ry) { var C = TMB.cast[key]; if (!C)
return; var P = tmbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : tmwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function tmbCastTick() { return __ZC(487, 86, this, arguments, new.target); }
var TMB_FOLK_AT = {};
function tmbPopulate() { return __ZC(487, 87, this, arguments, new.target); }
function tmbCastHere(C) { return (C.cast || []).some(function (c) { var P = tmbPos(c.at); return P && P.sc === TMW.sc; }); }
function tmbChapterSc(C) { var P = C && C.start ? tmbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function tmbSceneDrop() { TMB.beam = null; TMB.items = []; TMB.cast = {}; }
function tmbHeard(kind) { TMB.rew[kind] = (TMB.rew[kind] || 0) + 1; }
function tmbNote(kind, title) { tmbHeard(kind); if (title)
tmbHeard("tale:" + title); }
function tmbTalk(T) { return __ZC(487, 88, this, arguments, new.target); }
function tmbSpot(S) { if (!tmbActive() || S.tmb)
return; var b = tmbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = tmbKey(); setTimeout(function () { if (tmbKey() === k)
tmbStepDone(); }, b.wait || 400); }
function tmbIdlePrompt() { worldPrompt("⏳ <b>The Time Machine</b> · <b>press E</b> for the book", tmbOpen); }
function tmbTick(dt, L) { return __ZC(487, 89, this, arguments, new.target); }
function tmbOpen() { return __ZC(487, 90, this, arguments, new.target); }
function tmbBegin() { var S = tmbS(); S.started = 1; tmbSave(); if (WLD.on !== TMW_KEY) {
tmwEnter({});
return;
} tmbChapterBegin(true); }
function tmbStartAt() { var S = tmbS(); if (S.started && !S.done) {
var C = TMB_CH[S.ch], P = C && C.start ? tmbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function tmbEnter(opt) { var S = tmbS(); setTimeout(function () { if (WLD.on !== TMW_KEY)
return; if (S.started && !S.done)
tmbChapterBegin(false);
else {
tmbWorldState();
tmbPopulate();
if (!S.started)
tmbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function tmbLeave() { tmbTune(null); tmbItemsClear(); TMB.cast = {}; TMB.beam = null; TMW.bannerBook = false; }
function tzGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function tzTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function tzSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function tzRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function tzFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function tzGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function tzHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function tzUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function tzPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function tzRead(title, html, btn, o) { return tzPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function tzReadA(title, adult, young, btn, o) { var r = tzRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = tmbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function tzMove(at, msg) { return function () { tmwGo(at, msg || null, tmbPopulate); }; }
function tmbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function tmbCh(C) { return __ZC(487, 91, this, arguments, new.target); }
function tmbStepAt(id) { var C = TMB_CH[tmbS().ch]; return C ? tmbS().s >= tmbIdx(C, id) : false; }
function tzId(id, step) { step.id = id; return step; }
(function () {
var a0 = tmbCastAdd;
tmbCastAdd = function (c) {
if (c.morlock) {
var C = TMB.cast[c.key || c.k];
if (tmbCastLive(C))
return C;
var P = tmbPos(c.at);
if (!P || P.sc !== TMW.sc)
return null;
var g = tmwMorlock(c.seed || 7), y = c.y != null ? c.y : tmwGround(P.x, P.z, 500);
g.position.set(P.x, y, P.z);
g.rotation.y = c.ry || 0;
TMW.scG.add(g);
var M = { g: g, home: { x: P.x, z: P.z }, t: 0, flee: 0 };
TMW.morlocks.push(M);
TMB.cast[c.key || c.k] = { g: g, P: { g: g }, c: c };
return TMB.cast[c.key || c.k];
}
if (c.eloi) {
var C2 = TMB.cast[c.key || c.k];
if (tmbCastLive(C2))
return C2;
var P2 = tmbPos(c.at);
if (!P2 || P2.sc !== TMW.sc)
return null;
var g2 = tmwDressed("ce" + (c.key || c.k), "tmeloi", { sex: c.sex || "m", hair: c.hair || 0xD8B060, skin: 0xF6E0D2 });
g2.scale.setScalar(0.72);
var y2 = tmwGround(P2.x, P2.z, 500);
g2.position.set(P2.x, y2, P2.z);
g2.rotation.y = c.ry || 0;
TMW.scG.add(g2);
var Pp = { g: g2, y: y2, o: {} };
TMW.people.push(Pp);
if (c.name)
tmwTalk(Pp, c.name, TMW_ELOI, c.greet || "(Soft, liquid words, and laughter.)", c.r || 3.0);
TMB.cast[c.key || c.k] = { g: g2, P: Pp, c: c };
return TMB.cast[c.key || c.k];
}
return a0.apply(this, arguments);
};
var h0 = tmbCastHide;
tmbCastHide = function (key) { var C = TMB.cast[key]; if (C && C.c && C.c.morlock) {
TMW.morlocks = TMW.morlocks.filter(function (M) { return M.g !== C.g; });
} return h0.apply(this, arguments); };
})();
TMB_FOLK_AT.richmond = [["watchett", 0.6, 6, Math.PI]];
function tmwStateApply(st, s) { return __ZC(487, 92, this, arguments, new.target); }
function tmwModelVanish(done) { return __ZC(487, 93, this, arguments, new.target); }
function tmwForestFire(on) { return __ZC(487, 94, this, arguments, new.target); }
function tmwDescend() { tmwGo("shaftfoot", "🕳️ <b>Down the shaft.</b> Two hundred yards on the little hooks, cramped and aching, the throb of engines louder and louder, and the faint round of daylight shrinking to a star above you.", function () { tmbPopulate(); }); }
function tmwClimbOut() { tmwGo({ sc: "future", x: TMW_AT.well2.x + 3, z: TMW_AT.well2.z + 3, ry: 0 }, "☀️ <b>Out into the sunlight.</b> The soil smells sweet and clean. Weena is there, kissing your hands.", function () { tmbPopulate(); }); }
function tmc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
function tsrc(ch) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>H. G. Wells, The Time Machine (1895)" + (ch ? ", " + ch : "") + "</div>"; }
function tR(x, z) { return { sc: "richmond", x: x, z: z }; }
function tF(x, z, y) { return { sc: "future", x: x, z: z, y: y }; }
(function () { var s0 = tmwScene; tmwScene = function (k) { var was = TMW.scBuilt; s0.apply(this, arguments); if (was !== TMW.scBuilt && typeof tmbWorldState === "function")
try {
tmbWorldState();
}
catch (e) { } }; })();
(function () { var a0 = tmwStateApply; tmwStateApply = function (st, s) { var st2 = st; if (TMW.sc !== "richmond" && (st.machine == null || st.machine === "lab"))
st2 = Object.assign({}, st, { machine: "lawn" }); return a0(st2, s); }; })();
function tzRide(o) { return function () { tmwRide(o); }; }
function tzRideDone(sc, h) { return tzUntil(function () { return !TMW.ride && TMW.sc === sc; }, null, h || "The Machine is travelling..."); }
tmbCh({ t: "Introduction", txt: 0, start: { sc: "richmond", x: -4.4, z: 5.2, ry: Math.PI / 2 }, jump: 1, tune: "home", keep: ["pipe", "The Time Traveller's after-dinner argument", "🕰️"], state: { model: function (s) { return s >= 11 && s < 14; }, machine: "lab" },
words: "Richmond, Surrey, the 1890s, a Thursday evening after dinner. You are one of the Time Traveller's guests, in his smoking-room, with the Psychologist, the Medical Man, the Provincial Mayor, Filby, and a very young man. The fire is bright. He is about to tell you that time is only a fourth dimension of space.",
intro: "The smoking-room, after dinner",
cast: [tmc("trav", tR(-10.0, 6.4), { ry: Math.PI / 2, until: 9 }), tmc("trav", tR(-6.0, 4.0), { key: "trav2", ry: -Math.PI / 2, from: 11 }), tmc("psych", tR(-8.5, 2.6), { ry: 0.6 }), tmc("medic", tR(-8.6, 7.6), { ry: 2.4 }), tmc("mayor", tR(-5.6, 8.0), { ry: Math.PI }), tmc("filby", tR(-4.9, 2.4), { ry: -0.4 }), tmc("vym", tR(-7.2, 1.2), { ry: 0 }), tmc("watchett", tR(0.6, 6), { ry: Math.PI })],
steps: [
{ k: "read" },
tzTalk("The Time Traveller", "The Time Traveller, by the fire: listen to him", ["🔥 After dinner", tmbQs("The fire burnt brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses.", "You must follow me carefully. I shall have to controvert one or two ideas that are almost universally accepted.") + tsrc("I"), "▶ Go on"]),
tzTalk("Filby", "Filby, \"an argumentative person with red hair\", objects", ["🧱 There I object", tmbQs("There I object,", "Of course a solid body may exist. All real things—", "So most people think. But wait a moment. Can an instantaneous cube exist?") + tsrc("I"), "▶ Go on"]),
tzPuzzle("📐 Four directions", "\"Clearly,\" says the Time Traveller, \"any real body must have extension in four directions.\" Length, breadth, thickness... and what is the fourth?", ["Weight", "Duration", "Colour"], 1, ["Weight is not a direction one can travel in.", "", "Colour? He smiles: no."], { yes: "📐 " + tmQ("it must have Length, Breadth, Thickness, and—Duration.") }),
tzTalk("The Provincial Mayor", "The Provincial Mayor has never heard of the fourth dimension", ["🎩 Have you not?", tmbQs("I have not,", "It is simply this. That Space, as our mathematicians have it, is spoken of as having three dimensions, which one may call Length, Breadth, and Thickness") + tsrc("I"), "▶ Go on"]),
tzTalk("The Medical Man", "The Medical Man stares at a coal in the fire: why can we not move in time?", ["🩺 The great difficulty", tmbQs("why cannot we move in Time as we move about in the other dimensions of Space?", "Are you so sure we can move freely in Space?", "There are balloons.") + tsrc("I"), "▶ Go on"]),
tzPuzzle("🎈 Up and down", "The Time Traveller asks: which way are we NOT free to move in space, before balloons were made?", ["Left and right", "Up and down", "Backward and forward"], 1, ["We go left and right freely enough.", "", "Backward and forward, freely enough."], { yes: "🎈 Gravitation limits us there. And in time, he says, we are always moving, \"from the cradle to the grave\"." }),
tzTalk("The Very Young Man", "The Very Young Man has an idea", ["💰 Just think!", tmbQs("To travel through Time!", "Then there is the future,", "One might invest all one’s money, leave it to accumulate at interest, and hurry on ahead!") + tsrc("I"), "▶ Go on"]),
tzTalk("The Psychologist", "The Psychologist: \"it's all humbug\"", ["🧠 Humbug", tmbQs("Let’s see your experiment anyhow,", "though it’s all humbug, you know.") + tsrc("I"), "▶ Go on"]),
tzRead("🚪 He goes out", tmbQs("The Time Traveller smiled round at us. Then, still smiling faintly, and with his hands deep in his trousers pockets, he walked slowly out of the room, and we heard his slippers shuffling down the long passage to his laboratory.", "I wonder what he’s got?", "Some sleight-of-hand trick or other,") + tsrc("I"), "▶ Wait for him"),
tzHold("table", 8, "Wait by the little octagonal table for him to come back (Filby is telling a story about a conjuror)", { r: 3 }),
tzRead("✨ The model", tmbQs("The thing the Time Traveller held in his hand was a glittering metallic framework, scarcely larger than a small clock, and very delicately made. There was ivory in it, and some transparent crystalline substance.") + tsrc("II"), "▶ Look closer"),
tzSpot("The little model", "Look at the little model on the octagonal table", { at: "table", on: function () { tmwSpot(TMW_AT.table.x, TMW_AT.table.z, 1.8, "The little model", "look at it", function () { setStatus("✨ A little framework of brass and ivory and twisted quartz, with a tiny saddle and two tiny levers. One bar twinkles oddly, as though it were not quite real."); }); } }),
tzTalk("The Time Traveller", "He asks the Psychologist to lend him a hand", ["👉 Lend me your hand", tmbQs("this lever, being pressed over, sends the machine gliding into the future, and this other reverses the motion.", "No,", "Lend me your hand.") + tsrc("II"), "▶ The Psychologist presses the lever", { act: function (next) { tmwModelVanish(function () { setStatus("💨 There is a breath of wind. The lamp flame jumps. The little machine swings round, becomes indistinct, is seen as a ghost for a second... and is gone."); next(); }); } }]),
tzPuzzle("💨 Where did it go?", "Everyone is silent. Then Filby says he is damned. The Psychologist looks under the table. Where does the Time Traveller say the little machine has gone?", ["Under the table, by a trick", "Into the future or the past: he does not know which", "Into the laboratory"], 1, ["The Psychologist has looked: it is not there.", "", "It has not moved in space at all, he says."], { yes: "💨 " + tmQ("Into the future or the past—I don’t, for certain, know which.") }),
tzTalk("The Psychologist", "The Psychologist explains why you cannot see it", ["🌀 The spoke of a wheel", tmbQs("We cannot see it, nor can we appreciate this machine, any more than we can the spoke of a wheel spinning, or a bullet flying through the air.") + tsrc("II"), "▶ Go on"]),
tzPuzzle("🌀 Why can't we see it?", "If the model is travelling through time fifty or a hundred times faster than we are, why can none of you see it on the table?", ["It is invisible glass", "It passes each moment too quickly to be seen, like a spinning spoke", "The lamp is too dim"], 1, ["It was brass and ivory a minute ago.", "", "Turn up the lamp: still nothing."], { yes: "🌀 Presentation below the threshold, the Psychologist calls it. Diluted presentation." })
] });
tmbCh({ t: "The Machine", txt: 1, start: "smoking", tune: "home", keep: ["lamp", "The lamp held up over the Time Machine", "🪔"], state: { machine: "lab" },
words: "\"Would you like to see the Time Machine itself?\" He takes the lamp and leads you all down the long, draughty corridor to his laboratory.",
intro: "Down the corridor to the laboratory",
cast: [tmc("trav", tR(6.2, -4.2), { ry: Math.PI / 2 }), tmc("psych", tR(5.0, -6.8), { ry: 0.6 }), tmc("medic", tR(9.4, -3.0), { ry: 2.4 }), tmc("mayor", tR(5.4, -2.4), { ry: Math.PI }), tmc("filby", tR(10.8, -7.6), { ry: -0.4 }), tmc("vym", tR(7.6, -8.2), { ry: 0 })],
steps: [
{ k: "read" },
tzGo("hall", "Out into the hall, after the lamp", { r: 3 }),
tzGo("lab", "Down the long, draughty corridor to the laboratory", { r: 3 }),
tzSpot("The Time Machine", "Look at the Machine itself", { at: "machine", on: function () { return __ZC(487, 95, this, arguments, new.target); } }),
tzTalk("The Medical Man", "The Medical Man: \"are you perfectly serious?\"", ["🩺 A trick?", tmbQs("Look here,", "are you perfectly serious? Or is this a trick—like that ghost you showed us last Christmas?", "Upon that machine,", "I intend to explore time. Is that plain? I was never more serious in my life.") + tsrc("II"), "▶ Go on"]),
tzPuzzle("⏳ The dials", "Four small dials stand before the saddle. The Time Traveller explains them: one for days, one for thousands of days, one for millions, one for thousands of millions. To go 1,000 days ahead, which dial moves round once?", ["The days", "The thousands of days, one step only; the days dial goes round once", "The millions"], 1, ["It does more than move: it goes all the way round, once, and hands on to the next.", "", "Far too far: that would be centuries."], { yes: "⏳ Right: a thousand days turn the first dial right round and move the second on one." }),
tzTalk("Filby", "Filby, over the Medical Man's shoulder", ["😉 Filby winks", tmbQs("None of us quite knew how to take it.", "I caught Filby’s eye over the shoulder of the Medical Man, and he winked at me solemnly.") + tsrc("II"), "▶ Go on"]),
tzTalk("The Psychologist", "The Psychologist thinks it over", ["🧠 Next Thursday", "<p>None of you quite believe it. \"The fact is, the Time Traveller was one of those men who are too clever to be believed.\" Will you come again next Thursday? Of course you will.</p>" + tsrc("III"), "▶ Go on"]),
tzGo("hall", "Back to the hall: it is late, and time to go home", { r: 3 }),
tzGo("road", "Out into the road; the cabs wait under the gas lamps", { r: 5 })
] });
tmbCh({ t: "The Time Traveller Returns", txt: 2, start: "road", jump: 1, tune: "home", keep: ["mutton", "His plate of mutton", "🍽️"], state: { machine: "lab" },
words: "The next Thursday. You go again to Richmond, and arrive late. Four or five men are already in the drawing-room. The Medical Man is standing before the fire with a note in one hand and his watch in the other. Your host is not there.",
intro: "Richmond, next Thursday, seven o'clock",
cast: [tmc("medic", tR(-9.0, 6.6), { ry: 1.2 }), tmc("psych", tR(-7.0, 2.8), { ry: 0.4 }), tmc("editor", tR(-5.6, 6.6), { ry: -2 }), tmc("journal", tR(-6.4, 8.0), { ry: Math.PI }), tmc("silent", tR(-8.6, 3.8), { ry: 0.8 }),
tmc("medic", tR(11.0, 5.0), { key: "m2", ry: -Math.PI / 2, from: 7 }), tmc("psych", tR(6.0, 6.3), { key: "p2", ry: Math.PI, from: 7 }), tmc("editor", tR(7.3, 3.7), { key: "e2", ry: 0, from: 7 }), tmc("journal", tR(8.6, 6.3), { key: "j2", ry: Math.PI, from: 7 }), tmc("silent", tR(9.9, 3.7), { key: "s2", ry: 0, from: 7 }),
tmc("trav2", tR(3.9, 5.6), { ry: Math.PI / 2, from: 9, until: 13 }), tmc("trav2", tR(5.0, 5.0), { key: "t3", ry: Math.PI / 2, from: 13, until: 15 }), tmc("trav2", tR(-10.0, 6.4), { key: "t4", ry: Math.PI / 2, from: 15 })],
steps: [
{ k: "read" },
tzGo("door", "In at the front door; the hall lamp is lit", { r: 3 }),
tzGo("smoking", "Into the drawing-room, where the others wait", { r: 4 }),
tzTalk("The Medical Man", "The Medical Man has a note from your host", ["✉️ Unavoidably detained", tmbQs("He’s unavoidably detained. He asks me in this note to lead off with dinner at seven if he’s not back. Says he’ll explain when he comes.", "It seems a pity to let the dinner spoil,") + tsrc("III"), "▶ Go on"]),
tzTalk("The Editor", "The Editor of a well-known daily paper", ["📰 The Editor", "<p>The Editor is a rare visitor: worldly and quick. He thinks your host's time-travelling is a fine paradox and a better joke.</p>" + tsrc("III"), "▶ Go on"]),
tzTalk("The Silent Man", "A quiet, shy man with a beard", ["🤐 The Silent Man", tmbQs("a quiet, shy man with a beard—whom I didn’t know, and who, as far as my observation went, never opened his mouth all the evening.") + tsrc("III"), "▶ Go on"]),
tzGo("dining", "Into the dining-room: dinner at seven, without him", { r: 4 }),
tzHold("dining", 10, "Sit at the table while the soup goes round", { r: 4 }),
tzPuzzle("🚪 Who comes in?", "The door from the corridor opens slowly. Who is it?", ["Mrs. Watchett, with the fish", "The Time Traveller, in an amazing plight", "A policeman"], 1, ["Not Mrs. Watchett.", "", "Not a policeman."], { yes: "🚪 " + tmQ("He was in an amazing plight. His coat was dusty and dirty, and smeared with green down the sleeves; his hair disordered, and as it seemed to me greyer") }),
tzTalk("The Time Traveller", "Look at him: haggard, limping, a cut on his chin", ["🩸 What on earth?", tmbQs("He said not a word, but came painfully to the table, and made a motion towards the wine.", "I’m—funny! Be all right in a minute.") + tsrc("III"), "▶ He goes upstairs to wash"]),
tzPuzzle("🧦 His feet", "As he goes out, you stand up and see his feet. What has he on them?", ["Muddy boots", "Only a pair of tattered, stained socks", "Slippers"], 1, ["No boots at all.", "", "Not even slippers."], { yes: "🧦 Nothing but a pair of tattered, stained socks. Where can he have been?" }),
tzTalk("The Journalist", "The Journalist: \"what's the game?\"", ["🎩 What's the game?", tmbQs("What’s the game?", "Has he been doing the Amateur Cadger? I don’t follow.") + tsrc("III"), "▶ Go on"]),
tzHold("dining", 8, "Wait at the table: the dinner goes on, uneasily", { r: 4 }),
tzTalk("The Time Traveller", "He comes back, washed and changed", ["🍖 Where's my mutton?", tmbQs("Where’s my mutton?", "What a treat it is to stick a fork into meat again!", "Story be damned!", "I want something to eat.") + tsrc("III"), "▶ Ask him one word"]),
tzPuzzle("❓ One word", "You ask him one question. What?", ["Where have you been?", "Have you been time travelling?", "Are you ill?"], 1, ["He won't answer that yet.", "", "He waves it away."], { yes: "❓ " + tmQ("Yes,") + " he says, with his mouth full, nodding his head." }),
tzGo("smoking", "After dinner, into the smoking-room, to hear it all", { r: 4 }),
tzTalk("The Time Traveller", "He sits back in his chair and begins", ["📖 The story", tmbQs("I don’t mind telling you the story, but I can’t argue.", "Most of it will sound like lying. So be it! It’s true—every word of it, all the same.") + "<p><b>From here, the story is his, and you live it.</b></p>" + tsrc("III"), "▶ \"I was in my laboratory at four o'clock...\""])
] });
tmbCh({ t: "Time Travelling", txt: 3, start: { sc: "richmond", x: 6.4, z: -4.4, ry: Math.PI / 2 }, jump: 1, tune: "ride", keep: ["hail", "A hailstone of the year 802,701", "🌨️"],
state: { machine: "lab", env: function (s) { return s >= 6 && s < 11 ? "hail" : null; } },
words: "From here you are the Time Traveller. It is ten o'clock in the morning, a week ago, in your laboratory. The Machine is finished. The last of the quartz rods is filed and fitted. Nothing remains but to sit in the saddle and press the starting lever.",
intro: "The laboratory, ten in the morning",
cast: [tmc("watchett", tR(4.6, -1.4), { ry: Math.PI / 2, until: 6 }), tmc("eloi1", tF(0, 40), { eloi: 1, name: "The first of the Eloi", ry: Math.PI, from: 12 })],
steps: [
{ k: "read" },
tzFind("bone", "lab", "The last quartz rod", "Pick up the last quartz rod from the bench, filed and ready", { at: { sc: "richmond", x: 8.0, z: -8.7 } }),
tzGo("machine", "Fit it into the Machine", { r: 2.4 }),
tzPuzzle("🔩 Which lever?", "Two small levers stand before the saddle. Which one sends the Machine gliding into the future?", ["The starting lever, pressed over", "The stopping lever"], 0, ["That one reverses the motion.", ""], { yes: "🔩 " + tmQ("I drew a breath, set my teeth, gripped the starting lever with both hands, and went off with a thud.") }),
tzTalk("Mrs. Watchett", "Mrs. Watchett comes in to dust", ["🧹 Mrs. Watchett", "<p>Mrs. Watchett, the housekeeper, bustles in for the morning dusting, and frowns at the Machine. You will remember her in a moment: to you, she will seem to shoot across the room like a rocket.</p>" + tsrc("IV"), "▶ Sit in the saddle"]),
tzRead("⏳ The ride", tmbQs("The laboratory got hazy and went dark. Mrs. Watchett came in and walked, apparently without seeing me, towards the garden door.", "There is a feeling exactly like that one has upon a switchback—of a helpless headlong motion!") + "<p style='opacity:.8'>(No flashing: in this book the days and nights run together into one grey twilight.)</p>" + tsrc("IV"), "▶ Press the starting lever"),
tzRead("🌍 The world goes by", tmbQs("I saw trees growing and changing like puffs of vapour, now brown, now green; they grew, spread, shivered, and passed away.", "I saw huge buildings rise up faint and fair, and pass like dreams.") + tsrc("IV"), "▶ Faster", { done: tzRide({ from: 1895, to: 802701, sec: 26, log: 1, at: "sphinx", env: "hail", lines: ["The laboratory goes hazy and dark...", "The sun hops swiftly across the sky...", "The sun becomes a streak of fire, a brilliant arch in space...", "Trees grow and change like puffs of vapour...", "Huge buildings rise up faint and fair, and pass like dreams...", "The dials whirl: eight hundred thousand years...", "You pull the stopping lever: the machine reels over..."] }) }),
tzRideDone("future", "Riding into the future..."),
tzRead("🌨️ A pitiless hail", tmbQs("There was the sound of a clap of thunder in my ears. I may have been stunned for a moment. A pitiless hail was hissing round me, and I was sitting on soft turf in front of the overset machine.") + tsrc("IV"), "▶ Look round"),
tzSpot("The White Sphinx", "Look up at the great white figure beyond the rhododendrons", { at: "sphinxfront", on: function () { tmwSpot(0, 4, 7, "The White Sphinx", "look at it", function () { setStatus("🗿 " + tmQ("It was of white marble, in shape something like a winged sphinx, but the wings, instead of being carried vertically at the sides, were spread so that it seemed to hover.")); }); } }),
tzPuzzle("🗿 What touches its shoulder?", "How do you know how very large the White Sphinx is?", ["A silver birch-tree touches its shoulder", "Its shadow covers the lawn", "It is taller than the house at Richmond"], 0, ["", "You cannot see a shadow in the hail.", "There is nothing to compare."], { yes: "🗿 " + tmQ("It was very large, for a silver birch-tree touched its shoulder.") }),
tzHold("sphinx", 8, "Stand by the Machine as the hail thins and the sun comes through", { r: 6 }),
tzTalk("The first of the Eloi", "A slight figure comes running through the bushes", ["👤 Out of futurity", tmbQs("He was a slight creature—perhaps four feet high—clad in a purple tunic, girdled at the waist with a leather belt.", "He struck me as being a very beautiful and graceful creature, but indescribably frail.") + tsrc("IV"), "▶ Take your hands from the machine"])
] });
tmbCh({ t: "In the Golden Age", txt: 4, start: "sphinx", tune: "golden", keep: ["garland", "A chain of flowers from the Eloi", "💐"], state: { machine: "lawn" },
words: "The year 802,701. The little people stand all round you, laughing, touching you with soft little hands, talking in their sweet, liquid tongue. They are not afraid of you at all.",
intro: "The lawn of the White Sphinx",
cast: [tmc("eloi1", tF(1, 26), { eloi: 1, name: "The first of the Eloi", ry: Math.PI, until: 8 }), tmc("eloi2", tF(-3, 25), { eloi: 1, sex: "f", name: "An Eloi in chequered purple and white", ry: Math.PI, until: 8 }),
tmc("eloi1", tF(156, -112), { key: "e1b", eloi: 1, name: "The first of the Eloi", ry: Math.PI, from: 8 }), tmc("eloi3", tF(165, -128), { eloi: 1, sex: "f", name: "An Eloi with fruit", from: 10 })],
steps: [
{ k: "read" },
tzTalk("The first of the Eloi", "He laughs into your eyes and touches you", ["🤲 Soft little hands", tmbQs("Then he turned to the two others who were following him and spoke to them in a strange and very sweet and liquid tongue.") + tsrc("V"), "▶ Go on"]),
tzPuzzle("🦗 The levers", "Before anything else, you think of the Machine. What do you do, so that no one can set it going?", ["Nothing; they are harmless", "Unscrew the little levers and put them in your pocket", "Cover it with your coat"], 1, ["Better safe.", "", "They might still move the levers."], { yes: "🦗 You unscrew the little levers that set it in motion and put them in your pocket." }),
tzTalk("An Eloi in chequered purple and white", "Point to the Machine, to yourself, and to the sun: a question comes back", ["☀️ From the sun?", "<p>A quaintly pretty little figure in chequered purple and white follows your gesture, and then astonishes you by imitating the sound of thunder. Had you come from the sun in a thunderstorm?</p>" + tsrc("V"), "▶ Go on"]),
tzPuzzle("☀️ Were they fools?", "They ask if you came from the sun in a thunderstorm. What does that make you wonder?", ["Whether they are cleverer than we are", "Whether they are like children: the question was a child's question", "Whether they are afraid"], 1, ["You had expected that: this was not it.", "", "They are not afraid at all."], { yes: "☀️ \"Were these creatures fools?\" You had always thought the people of the future would be far ahead of us." }),
tzGather("fruit", "sphinx", 4, "A flower for the garland", "Flowers: gather the ones they put round your neck", { spread: 9, eachSay: "A flower." }),
tzRead("💐 The garland", tmbQs("Then came one laughing towards me, carrying a chain of beautiful flowers altogether new to me, and put it about my neck.") + tsrc("V"), "▶ They lead you to a building"),
tzGo("halldoor", "They lead you to a vast grey building of fretted stone", { r: 8 }),
tzSpot("The carved doorway", "Look at the carving of the doorway as you pass", { at: "halldoor", on: function () { tmwSpot(160, -94, 6, "The carved doorway", "look at it", function () { setStatus("🏛️ " + tmQ("The arch of the doorway was richly carved") + ": something like old Phoenician work, very badly broken and weather-worn."); }); } }),
tzGo("hallin", "In through the great doorway, into the hall hung with brown", { r: 6 }),
tzRead("🏛️ The great hall", tmbQs("The big doorway opened into a proportionately great hall hung with brown. The roof was in shadow, and the windows, partially glazed with coloured glass and partially unglazed, admitted a tempered light.") + tsrc("V"), "▶ Sit on the cushions"),
tzGather("fruit", "hallin", 5, "A fruit from the heaps", "Eat as they eat: take fruit from the stone tables", { spread: 6, eachSay: "A strange and lovely fruit." }),
tzPuzzle("🍎 Their diet", "Looking round the tables, you find that the people of this age eat...", ["Fruit only", "Meat and bread", "Anything they can catch"], 0, ["", "There is no meat anywhere.", "They catch nothing."], { yes: "🍎 " + tmQ("Fruit, by the bye, was all their diet.") }),
tzTalk("An Eloi with fruit", "Learn a word: hold up a fruit and make a questioning sound", ["🗣️ Their words", "<p>You hold up a fruit and make a questioning noise. They understand at last, and laugh, and tell you its name; and soon you have a score of nouns, and the verb \"to eat\". It is slow work: they tire very quickly, and wander away after some new toy.</p>" + tsrc("V"), "▶ Go on"])
] });
tmbCh({ t: "The Sunset of Mankind", txt: 5, start: "halldoor", tune: "eloi", keep: ["seat", "The view from the seat of yellow metal", "🌇"], state: { machine: "lawn", env: function (s) { return s >= 6 ? "sunset" : null; } },
words: "The calm of evening is on the world as you come out of the great hall, lit by the warm glow of the setting sun. You decide to climb the hill to the north and look at the world from there.",
intro: "Out into the evening",
steps: [
{ k: "read" },
tzGo({ sc: "future", x: -120, z: -60 }, "Walk up among the ruins: a great heap of granite, bound together with aluminium", { r: 16 }),
tzPuzzle("🏘️ No small houses", "From a terrace you look round. Something is missing from this world that was everywhere in yours. What?", ["Trees", "Small houses: there are only great palace-like buildings", "People"], 1, ["Trees everywhere.", "", "The little people are everywhere too."], { yes: "🏘️ " + tmQ("‘Communism,’ said I to myself.") }),
tzSpot("A well", "Look at the pretty little structure like a well under a cupola", { at: "well3", on: function () { tmwSpot(TMW_AT.well3.x, TMW_AT.well3.z, 4, "A well", "look at it", function () { setStatus("🕳️ A well under a little bronze cupola. You think, in a passing way, how odd it is that wells still exist."); }); } }),
tzGo("hilltop", "Climb on, to the top of the hill", { r: 12 }),
tzSpot("The seat of yellow metal", "The seat at the top, with griffins' heads", { at: "seat", on: function () { tmwSpot(TMW_AT.seat.x, TMW_AT.seat.z + 1.2, 3, "The seat of yellow metal", "sit on it", function () { setStatus("🪑 " + tmQ("the arm-rests cast and filed into the resemblance of griffins’ heads.")); }); } }),
tzHold("seat", 14, "Sit and look at the broad view of our old world under the sunset", { r: 4 }),
tzRead("🌇 The sunset of mankind", tmbQs("It seemed to me that I had happened upon humanity upon the wane. The ruddy sunset set me thinking of the sunset of mankind.", "To adorn themselves with flowers, to dance, to sing in the sunlight: so much was left of the artistic spirit, and no more.") + tsrc("VI"), "▶ Think it through"),
tzPuzzle("🌇 Your first theory", "Sitting on the seat, you put your first explanation on what you have seen. What is it?", ["A cruel tyranny keeps them down", "Mankind conquered nature so completely that, with nothing left to strive for, it grew soft and gentle", "A plague has destroyed most of them"], 1, ["You see no sign of any tyrant.", "", "There is no sign of plague."], { yes: "🌇 " + tmQ("Very simple was my explanation, and plausible enough—as most wrong theories are!") }),
tzHold("seat", 6, "Stay as the light goes", { r: 4 })
] });
tmbCh({ t: "A Sudden Shock", txt: 6, start: "seat", tune: "night", keep: ["fist", "Your bruised knuckles", "✊"],
state: { machine: function (s) { return "gone"; }, night: 1, nightUntil: 10, env: function (s) { return s < 10 ? "moon" : null; }, hearth: true },
words: "As you sit musing, the full moon comes up, yellow and gibbous, in the north-east. The little figures below have stopped moving about. An owl flits by. You shiver in the chill, and decide to go down and find somewhere to sleep.",
intro: "Moonrise on the hill",
cast: [tmc("eloi4", tF(4, 26), { eloi: 1, name: "An Eloi in orange", from: 10 }), tmc("eloi5", tF(-4, 26), { eloi: 1, sex: "f", name: "Another, in orange", from: 10 })],
steps: [
{ k: "read" },
tzSpot("The White Sphinx", "Look for the building you know, and the White Sphinx", { at: "seat", on: function () { tmwSpot(TMW_AT.seat.x, TMW_AT.seat.z + 4, 6, "The White Sphinx", "look for it", function () { setStatus("🗿 " + tmQ("Then my eye travelled along to the figure of the White Sphinx upon the pedestal of bronze, growing distinct as the light of the rising moon grew brighter.")); }); } }),
tzGo("sphinx", "Down the hill, to the lawn by the White Sphinx", { r: 8 }),
tzPuzzle("😱 The lawn", "You reach the little lawn in the moonlight. What is wrong?", ["The Sphinx has moved", "The Time Machine is gone!", "The bushes are cut down"], 1, ["It has not moved.", "", "The bushes are as they were."], { yes: "😱 " + tmQ("The Time Machine was gone!") }),
tzGather("shell", "sphinx", 4, "A furrow in the turf", "Search the lawn: run round it, in and out of the bushes", { spread: 12, eachSay: "Nothing... only a mark in the turf." }),
tzPuzzle("👣 The marks", "There is a mark in the turf. What does it tell you?", ["The Machine was dragged off towards the pedestal of the Sphinx", "The Machine flew away", "It sank into the ground"], 0, ["", "It has no wings.", "The turf is unbroken."], { yes: "👣 Something has dragged it towards the bronze pedestal. You have the levers in your pocket: it cannot have been sent off in time." }),
tzGo("halldoor", "To the great hall: perhaps they have hidden it there", { r: 6 }),
tzGo("hallin", "In among the sleeping Eloi on their cushions", { r: 6 }),
tzReadA("🔥 A match in the dark", tmbQs("I have no doubt they found my second appearance strange enough, coming suddenly out of the quiet darkness with inarticulate noises and the splutter and flare of a match.") + "<p>They have forgotten about matches. You shake them awake; they are terrified, and you see you are frightening them, and stop.</p>" + tsrc("VII"), "<p>They have long forgotten what matches are. You wake them, asking about the Machine; they are frightened, and you see you are frightening them, and stop, and go out into the moonlight again.</p>" + tsrc("VII"), "▶ Out into the moonlight"),
tzGo("sphinx", "Back to the lawn, and sleep there, worn out, until morning", { r: 8 }),
tzRead("☀️ Morning", tmbQs("With the plain, reasonable daylight, I could look my circumstances fairly in the face. I saw the wild folly of my frenzy overnight, and I could reason with myself.") + tsrc("VII"), "▶ Go on"),
tzTalk("An Eloi in orange", "Point to the bronze pedestal, and show that you want it opened", ["🙅 They turn away", "<p>At your first gesture towards the pedestal, they behave very oddly: they look at you as if you had made some dreadful mistake, and turn away.</p>" + tsrc("VII"), "▶ Go on"]),
tzSpot("The bronze panels", "The bronze panels of the pedestal", { at: "sphinxfront", on: function () { tmwSpot(0, -1.0, 3.0, "The bronze panels", "bang on them", function () { setStatus("✊ You bang with your fist on the bronze. Something inside seems to stir: a sound like a chuckle. You must have been mistaken."); if (typeof playTone === "function")
try {
playTone(120, 0.2);
}
catch (e) { } }); } }),
tzPuzzle("🧘 Patience", "You have flattened a coil of the bronze with a pebble from the river, and bruised your knuckles. What do you decide?", ["Smash the Sphinx", "Patience: leave the Sphinx alone, learn the ways of this world, and the way back to the Machine will come", "Give up the Machine for ever"], 1, ["You cannot, and it would do no good.", "", "Not yet."], { yes: "🧘 " + tmQ("‘Patience,’ said I to myself.") })
] });
var TMW_PROWL_LAWN = [[-24, 30], [26, 34], [-30, -6], [32, -4], [0, 44]];
var TMW_PROWL_WOOD = [[-560, -500], [-575, -540], [-540, -545], [-590, -505], [-530, -500], [-600, -530]];
tmbCh({ t: "Explanation", txt: 7, start: "sphinx", tune: "golden", keep: ["weena", "Weena's garland", "🌸"], state: { machine: "gone", eyes: function (s) { return s >= 11 && s < 14; }, weena: function (s) { return s >= 6; } },
words: "Days pass. You explore the valley of the Thames and the hills about it: the same abundance of splendid buildings everywhere, the same thickets, the same blossom-laden trees. And the wells, and the towers above them where the air flickers as it does over a hot beach.",
intro: "Exploring the world of the Eloi",
setup: function (f) { f.matches = 0; },
cast: [tmc("weena", tF(70, 342), { ry: 0, until: 4 }), tmc("weena", tF(64, 330), { key: "w2", ry: Math.PI, from: 4 })],
steps: [
{ k: "read" },
tzSpot("A tall tower", "Find one of the tall towers on the slopes, with the flicker in the air above it", { at: "tower", on: function () { tmwSpot(TMW_AT.tower.x, TMW_AT.tower.z + 4, 6, "A tall tower", "look at the top of it", function () { setStatus("🗼 Above the top of the tower the air flickers, as one sees on a hot day above a sun-scorched beach."); }); } }),
tzPuzzle("🗼 Wells and towers", "You put it together: the wells, and the towers with the flicker of air above them. What do they suggest?", ["Chimneys for kitchens", "A great system of ventilation, for something under the ground", "Monuments to the dead"], 1, ["The Eloi cook nothing.", "", "There are no tombs anywhere."], { yes: "🗼 " + tmQ("Putting things together, I reached a strong suggestion of an extensive system") + " of underground ventilation. Whose, you cannot yet say." }),
tzGo("river", "Down to the river, where some of the little people are bathing in the shallows", { r: 10 }),
tzHold("shallows", 7, "One of them is seized with cramp and is drifting downstream! Wade in and hold her up", { r: 4, say: "🌊 You wade in, catch the poor little thing, and draw her safe to land." }),
tzTalk("Weena", "She sits on the bank, coughing, and looks at you", ["🌸 Weena", tmbQs("That day, too, I made a friend—of a sort.") + "<p>Her name, you learn, is Weena. None of the others had so much as tried to help her.</p>" + tsrc("VIII"), "▶ Go on"]),
tzRead("💐 Her garland", tmbQs("In the afternoon I met my little woman, as I believe it was, as I was returning towards my centre from an exploration, and she received me with cries of delight and presented me with a big garland of flowers—evidently made for me and me alone.") + tsrc("VIII"), "▶ Go on"),
tzPuzzle("🌑 What Weena fears", "She is fearless by day, and laughs at your faces when you pull them. What does she dread?", ["The river", "The dark, shadows, and black things", "You"], 1, ["She swims well enough now.", "", "She trusts you completely."], { yes: "🌑 She dreads the dark, dreads shadows, dreads black things. And she will not let you sleep alone." }),
tzGo("sphinx", "Walk back with her to the lawn of the White Sphinx", { r: 10 }),
tzRead("👻 Ghosts at dawn", tmbQs("The moon was setting, and the dying moonlight and the first pallor of dawn were mingled in a ghastly half-light.", "And up the hill I thought I could see ghosts.") + tsrc("VIII"), "▶ A hot morning"),
tzGo("ruins", "One very hot morning: shelter from the glare in the great ruin near the hall", { r: 12 }),
tzGo("ruinsin", "Into a narrow gallery in the ruin, out of the sun", { r: 4 }),
tzPuzzle("👁️ In the dark", "Your eyes are dazzled from the sunlight. Out of the darkness of the gallery, something is watching you. What?", ["A cat", "A pair of eyes, luminous by reflection against the daylight", "Nothing: a trick of the light"], 1, ["No cat.", "", "Look again: they blink."], { yes: "👁️ Eyes. You force yourself to put out a hand, and touch something soft. The eyes dart away, and something white runs past you." }),
tzReadA("🦍 A pale thing", tmbQs("I know it was a dull white, and had strange large greyish-red eyes; also that there was flaxen hair on its head and down its back.") + tsrc("VIII"), tmbQs("I know it was a dull white, and had strange large greyish-red eyes; also that there was flaxen hair on its head and down its back.") + "<p>It was very quick, and very shy of the light.</p>" + tsrc("VIII"), "▶ Follow it"),
tzSpot("The well by the ruins", "It has vanished down a well among the ruins: look down", { at: "well2", on: function () { tmwSpot(TMW_AT.well2.x, TMW_AT.well2.z + 2.4, 3.4, "The well by the ruins", "look down", function () { setStatus("🕳️ Far down, a small white moving creature, its large bright eyes fixed on you, climbs down the wall on metal hooks, and is gone. A steady throb comes up, like a great engine."); }); } }),
tzPuzzle("🧬 Two kinds of men", "Slowly the truth dawns on you. What has happened to Man?", ["He has become two different species: the Eloi above, and these pale creatures underground", "The pale creatures are animals from another world", "The Eloi keep them as pets"], 0, ["", "They are not from anywhere else.", "The Eloi are terrified of them."], { yes: "🧬 " + tmQ("that Man had not remained one species, but had differentiated into two distinct animals") }),
tzTalk("Weena", "Ask Weena about the creatures under the ground", ["😢 Morlocks", "<p>She will not answer at first. When you press her, she bursts into tears. All you learn is their name: the Morlocks. And the little people's own name: the Eloi.</p>" + tsrc("VIII"), "▶ Burn a match for her"]),
tzRead("🔥 Smiling again", tmbQs("And very soon she was smiling and clapping her hands, while I solemnly burnt a match.") + tsrc("VIII"), "▶ Go on")
] });
tmbCh({ t: "The Morlocks", txt: 8, start: { sc: "future", x: TMW_AT.well2.x + 4, z: TMW_AT.well2.z + 6, ry: 0 }, tune: "dread", keep: ["hooks", "The climbing hooks of the well", "🪝"], state: { machine: "gone", weena: function (s) { return s < 3; } },
words: "Two days you put it off: you shrink from those pallid bodies. But it is plain that the Morlocks have your Machine, and that the way to it lies under the ground. Weena runs with you to the well.",
intro: "The well by the ruins",
setup: function (f) { f.matches = 8; },
cast: [tmc("weena", tF(TMW_AT.well2.x + 2, TMW_AT.well2.z + 5), { ry: Math.PI, until: 3 }), tmc("weena", tF(TMW_AT.well2.x + 4, TMW_AT.well2.z + 4), { key: "w2", ry: Math.PI, from: 15 })],
steps: [
{ k: "read" },
tzTalk("Weena", "Say good-bye to Weena", ["👋 Good-bye, little Weena", tmbQs("‘Good-bye, little Weena,’ I said, kissing her; and then putting her down, I began to feel over the parapet for the climbing hooks.") + tsrc("IX"), "▶ Over the parapet"]),
tzPuzzle("🪝 The hooks", "The hooks in the wall of the well are small and close-set. Who were they made for?", ["For creatures much smaller and lighter than you", "For giants", "For buckets"], 0, ["", "They are tiny.", "There are no buckets."], { yes: "🪝 " + tmQ("these being adapted to the needs of a creature much smaller and lighter than myself, I was speedily cramped and fatigued by the descent.") }),
tzHold("well2", 14, "Climb down: hold on, hook by hook, two hundred yards", { r: 4, done: function () { tmwDescend(); } }),
tzRideDone("under", "Down the shaft..."),
tzGo("tunnel", "A loophole in the wall: crawl into the narrow tunnel and lie there, in the dark", { r: 4 }),
tzRew("match", "tunnel", "Something soft touches your face! Strike a match (F, or the button)"),
tzReadA("🕯️ Three white creatures", tmbQs("Starting up in the darkness I snatched at my matches and, hastily striking one, I saw three stooping white creatures similar to the one I had seen above ground in the ruin, hastily retreating before the light.") + tsrc("IX"), tmbQs("Starting up in the darkness I snatched at my matches and, hastily striking one, I saw three stooping white creatures similar to the one I had seen above ground in the ruin, hastily retreating before the light.") + "<p>They cannot bear the light.</p>" + tsrc("IX"), "▶ Feel your way on"),
tzGo("cavern", "Feel your way along the tunnel into a great open space", { r: 10 }),
tzRew("match", "cavern", "It is pitch dark: strike a match to see the cavern"),
tzRead("⚙️ The cavern", tmbQs("Great shapes like big machines rose out of the dimness, and cast grotesque black shadows, in which dim spectral Morlocks sheltered from the glare.") + tsrc("IX"), "▶ Look about"),
tzReadA("🍖 The table", tmbQs("The place, by the bye, was very stuffy and oppressive, and the faint halitus of freshly-shed blood was in the air.") + "<p>On a little table there is meat. The Eloi eat only fruit. You remember that there are no animals left in this world, and you do not want to think further.</p>" + tsrc("IX"), "<p>The air is close and stuffy. On a little table there is meat, though the Eloi eat only fruit, and there are no animals left in this world. It is a puzzle you do not like.</p>" + tsrc("IX"), "▶ Go on", { at: "meat" }),
tzPuzzle("🔥 Matches", "You count your matches. How many have you left?", ["A whole box", "Only four, after wasting half the box showing off to the Eloi", "None"], 1, ["You have been wasting them.", "", "Not quite none."], { yes: "🔥 Four. You never thought you would need to save them." }),
tzGo("shaftfoot", "Hands are clutching at you in the dark: back down the tunnel to the shaft!", { r: 3, on: function () { (TMW.morlocks || []).forEach(function (M, i) { M.home = { x: (i % 3 - 1) * 2, z: -26 - i }; }); } }),
tzHold("shaftfoot", 12, "Climb! Up the hooks, with the last twenty feet a deadly struggle", { r: 3, done: function () { tmwClimbOut(); } }),
tzRideDone("future", "Climbing out..."),
tzTalk("Weena", "Weena is waiting at the top", ["☀️ The clean air", tmbQs("Then I remember Weena kissing my hands and ears, and the voices of others among the Eloi.") + tsrc("IX"), "▶ Go on"])
] });
tmbCh({ t: "When Night Came", txt: 9, start: { sc: "future", x: TMW_AT.well2.x + 4, z: TMW_AT.well2.z + 6, ry: Math.PI }, tune: "night", keep: ["mallows", "Two white flowers from Weena", "🤍"],
state: { machine: "gone", weena: true, night: 1, nightFrom: 7, nightUntil: 12, env: function (s) { return s >= 7 && s < 12 ? "night" : null; }, prowl: function (s) { return s >= 8 && s < 12 ? [[-575, -505], [-545, -540], [-585, -540]] : null; } },
words: "It is the darkness of the new moon you fear now: the Dark Nights, Weena calls them. The moon is on the wane; each night there are longer intervals of darkness. You must find a refuge, and make yourself some weapon, and above all find some means of fire.",
intro: "Setting out with Weena",
setup: function (f) { f.matches = 3; },
cast: [tmc("weena", tF(TMW_AT.well2.x + 2, TMW_AT.well2.z + 4), { ry: Math.PI })],
steps: [
{ k: "read" },
tzPuzzle("🌑 The enemy", "What is the enemy you dread most, now that you know of the Morlocks?", ["The heat of the day", "The darkness of the new moon", "The river"], 1, ["The heat is nothing.", "", "The river is gentle."], { yes: "🌑 " + tmQ("It was the darkness of the new moon.") }),
tzSpot("The Palace of Green Porcelain", "Look south-west from the slope: a vast green building, far off", { at: { sc: "future", x: -300, z: -120 }, on: function () { tmwSpot(-300, -120, 10, "The Palace of Green Porcelain", "look at it", function () { setStatus("🏛️ Far to the south-west, a vast green structure, different from any you have seen: the tall pinnacles of the Palace of Green Porcelain."); }); } }),
tzGather("flower", { sc: "future", x: -320, z: -200 }, 5, "A flower for your pockets", "Walk on with Weena: she runs off to pick flowers and stick them in your pockets", { spread: 14, eachSay: "A flower in your pocket." }),
tzRead("🤍 Two white flowers", tmbQs("The Time Traveller paused, put his hand into his pocket, and silently placed two withered flowers, not unlike very large white mallows, upon the little table. Then he resumed his narrative.") + tsrc("X"), "▶ Go on"),
tzGo({ sc: "future", x: -360, z: -290 }, "Over the hill crest towards Wimbledon, with the Palace's pinnacles ahead", { r: 14 }),
tzRead("🌒 Dusk", tmbQs("So we went on in the quiet, and the twilight deepened into night. The clear blue of the distance faded, and one star after another came out.") + tsrc("X"), "▶ Go on"),
tzGo("knoll", "Night falls. A thick wood spreads before you: stop on the open hillside instead", { r: 8 }),
tzPuzzle("🌲 The wood", "The wood is black and wide; you cannot see the end of it. Weena is tired and frightened. What do you do?", ["Push on through the black wood", "Stop on the open hillside and keep watch until morning", "Go back"], 1, ["In the dark of the wood the Morlocks would be all round you.", "", "It is too far back."], { yes: "🌲 You lower Weena from your shoulder, wrap her in your jacket, and sit down beside her on the turf." }),
tzHold("knoll", 16, "Keep watch beside Weena under the stars", { r: 6 }),
tzRead("✨ The stars", tmbQs("Looking at these stars suddenly dwarfed my own troubles and all the gravities of terrestrial life.") + "<p>All the old constellations have gone from the sky: their slow movement, unnoticed in a hundred lifetimes, has long since rearranged them.</p>" + tsrc("X"), "▶ Go on"),
tzPuzzle("✨ The sky has changed", "Why are the old constellations gone from the sky of 802,701?", ["The stars have burnt out", "The stars drift slowly, and in eight hundred thousand years the pole and the shapes have all moved", "Clouds"], 1, ["Most of them still shine.", "", "The sky is very clear."], { yes: "✨ The great precessional cycle has gone round many times since your day." }),
tzRead("🌅 Morning", tmbQs("I awakened Weena, and we went down into the wood, now green and pleasant instead of black and forbidding.") + tsrc("X"), "▶ On, to the Palace"),
tzGo("palace", "Through the wood and on to the Palace of Green Porcelain", { r: 14 })
] });
tmbCh({ t: "The Palace of Green Porcelain", txt: 10, start: "palace", tune: "palace", keep: ["matchbox", "A box of matches from an air-tight case", "🧰"], state: { machine: "gone", weena: true },
words: "About noon you reach it: the Palace of Green Porcelain, deserted and falling into ruin, great sheets of its green facing fallen from the corroded metal frame. Along its face runs an inscription in some unknown character.",
intro: "Before the Palace",
setup: function (f) { f.matches = 0; },
cast: [tmc("weena", tF(-696, -594), { ry: 0 })],
steps: [
{ k: "read" },
tzSpot("The inscription", "Look at the inscription along the face of the Palace", { at: "palacedoor", on: function () { tmwSpot(-700, -606, 8, "The inscription", "read it", function () { setStatus("🔤 Letters in some unknown character. Weena cannot help: the bare idea of writing has never entered her head."); }); } }),
tzGo("pal_hall", "In through the big broken valves of the door", { r: 6 }),
tzRead("🦴 A museum", tmbQs("Within the big valves of the door—which were open and broken—we found, instead of the customary hall, a long gallery lit by many side windows. At the first glance I was reminded of a museum.") + tsrc("XI"), "▶ Go on"),
tzSpot("A huge skeleton", "Look at the huge skeleton in the middle of the gallery", { at: { sc: "future", x: -700, z: -633 }, on: function () { tmwSpot(-700, -633, 5, "A huge skeleton", "look at it", function () { setStatus("🦴 The lower half of a huge skeleton, some extinct creature after the fashion of the Megatherium, its skull lying beside it in the thick dust. Further in, the great barrel of a Brontosaurus."); }); } }),
tzPuzzle("🦴 Where are you?", "Fossils in sloping glass cases, thick with dust. What is this place?", ["A church", "The ruins of some latter-day South Kensington: a museum", "A market"], 1, ["No.", "", "No."], { yes: "🦴 " + tmQ("Clearly we stood among the ruins of some latter-day South Kensington!") }),
tzGo("pal_min", "Through to a short gallery running across the first: minerals", { r: 5 }),
tzSpot("A block of sulphur", "A block of yellow sulphur", { at: { sc: "future", x: -734, z: -624 }, on: function () { tmwSpot(-734, -624, 3, "A block of sulphur", "look at it", function () { setStatus("🟨 Sulphur. It sets your mind running on gunpowder."); }); } }),
tzPuzzle("🟨 Gunpowder?", "Sulphur sets you thinking of gunpowder. Why can you not make any?", ["There is no charcoal", "There is no saltpetre: the nitrates have all decayed away long ago", "You have forgotten how"], 1, ["Charcoal is easy.", "", "You know how well enough."], { yes: "🟨 " + tmQ("But I could find no saltpetre; indeed, no nitrates of any kind.") }),
tzGo("pal_mach", "Back through the long gallery, and into a gallery of great machines", { r: 6 }),
tzGo("pal_dark", "Down the gallery: the floor slopes, and the light fails", { r: 8 }),
tzPuzzle("👣 Footprints", "Weena clings to you. In the dust, at the edge of the dark, you see...", ["Nothing", "Small narrow footprints: the Morlocks come here", "Weena's footprints"], 1, ["Look closer.", "", "Hers are behind you."], { yes: "👣 Footprints, going down into the darkness. You hear a scuffling." }),
tzHold("pal_lever", 8, "Climb on the stand of a machine and put all your weight on its lever, sideways", { r: 3, tick: function (h) { if (TMW.leverArm)
TMW.leverArm.rotation.z = Math.min(0.5, h / 16); }, done: function () { if (TMW.leverArm)
TMW.leverArm.visible = false; } }),
tzRead("🔨 A mace", tmbQs("I had judged the strength of the lever pretty correctly, for it snapped after a minute’s strain, and I rejoined her with a mace in my hand") + tsrc("XI"), "▶ Go on"),
tzGo("pal_lib", "Into another, larger gallery, hung with brown rags", { r: 6 }),
tzPuzzle("📚 The rags", "The brown and charred rags hanging along the walls. What were they?", ["Flags", "Books, rotted away", "Curtains"], 1, ["They look like tattered flags; they are not.", "", "No."], { yes: "📚 " + tmQ("The brown and charred rags that hung from the sides of it, I presently recognised as the decaying vestiges of books.") }),
tzGo("pal_chem", "Up a broad staircase, to a gallery of technical chemistry", { r: 5 }),
tzFind("matchbox", "pal_chem", "A box of matches, in an air-tight case", "Search the unbroken cases: one is air-tight", { at: { sc: "future", x: -712, z: -691.2, get y() { return tmwFlatH(2) + 2.4; } }, done: function (f) { f.matches = 14; } }),
tzRead("💃 Dance!", tmbQs("Very eagerly I tried them. They were perfectly good. They were not even damp. I turned to Weena. ‘Dance,’ I cried to her in her own tongue.") + tsrc("XI"), "▶ Dance"),
tzFind("jar", "pal_chem", "A sealed jar: camphor", "A sealed jar on another shelf", { at: { sc: "future", x: -688, z: -696, get y() { return tmwFlatH(2) + 2.4; } }, done: function (f) { f.camphor = 1; } }),
tzPuzzle("🕯️ The camphor", "You break the sealed jar. It is camphor. Why keep it?", ["It smells pleasant", "It burns with a good bright flame: an excellent candle", "To eat"], 1, ["Not only that.", "", "Certainly not."], { yes: "🕯️ " + tmQ("I remembered that it was inflammable and burnt with a good bright flame—was, in fact, an excellent candle—and I put it in my pocket.") }),
tzGo("pal_arms", "Back down: a long gallery of rusting stands of arms", { r: 5 }),
tzPuzzle("⚔️ Which weapon?", "Crowbar, hatchet or sword? You can only carry one. Against the bronze gates of the Sphinx, which is best?", ["The sword", "Your bar of iron", "The hatchet"], 1, ["Rusted through.", "", "The hatchet would not hold."], { yes: "⚔️ " + tmQ("my bar of iron promised best against the bronze gates.") }),
tzGo("court", "Out into a little open court within the palace, turfed, with three fruit-trees", { r: 8 }),
tzHold("court", 8, "Rest and eat with Weena under the fruit-trees, as the evening comes", { r: 8 })
] });
tmbCh({ t: "In the Darkness", txt: 11, start: "court", tune: "fire", keep: ["ash", "Ash from the burnt forest", "🔥"],
state: { machine: "gone", weena: function (s) { return s < 12; }, night: 1, nightFrom: 2, nightUntil: 16, env: function (s) { return s >= 10 && s < 16 ? "fire" : (s >= 2 && s < 16 ? "night" : null); },
prowl: function (s) { return s >= 4 && s < 12 ? TMW_PROWL_WOOD : null; }, fire: function (s) { return s >= 10 && s < 16; } },
words: "You come out of the Palace while the sun is still above the horizon. You mean to reach the White Sphinx early in the morning, and before dusk to push through the woods that stopped you before. You have matches, and the camphor in your pocket, and your iron bar.",
intro: "Out of the Palace, at sunset",
setup: function (f) { f.matches = 10; f.camphor = 1; },
cast: [tmc("weena", tF(-698, -726), { ry: 0 })],
steps: [
{ k: "read" },
tzGo({ sc: "future", x: -600, z: -560 }, "To the edge of the wood, as the dusk comes on", { r: 12 }),
tzPuzzle("👁️ Behind you", "Among the black bushes behind you, dim against their blackness, you see three crouching figures. What do you do?", ["Run into the wood at once", "Make a fire, to cover your going into the wood", "Wait for morning here"], 1, ["In the dark wood they would surround you.", "", "Not with them so near."], { yes: "👁️ A fire: \"what a rare thing flame must be\" in this age. The Morlocks will not come near it." }),
tzGather("wood", { sc: "future", x: -606, z: -560 }, 5, "Dry sticks and grass", "Gather dry sticks and grass for a fire", { spread: 8, eachSay: "Dry sticks." }),
tzSpot("Light the fire", "Strike a match and light the fire", { at: { sc: "future", x: -606, z: -556 }, on: function () { tmwSpot(-606, -556, 3, "Light the fire", "light it", function () { if (!TMW.campFire && TMW.scG) {
TMW.campFire = tmwFire(TMW.scG, -606, tmwFutH(-606, -556), -556, 1.4);
} setStatus("🔥 The fire catches and roars up. Weena wants to run to it and play with it: you have to hold her back."); }); } }),
tzGo({ sc: "future", x: -560, z: -520 }, "Into the wood with Weena in your arms", { r: 8 }),
tzRew("match", { sc: "future", x: -560, z: -520 }, "A pattering behind you, soft hands about your knees. Strike a match! (F)"),
tzReadA("🕯️ The camphor", tmbQs("It was time for a match. But to get one I must put her down.") + "<p>You light a lump of camphor, and it flares up bright; the white forms flee before it. But in turning about with your matches and Weena, you have lost all idea of the way.</p>" + tsrc("XII"), "<p>You set a lump of camphor alight, and it flares up bright; the pale shapes run from it. But you have turned round so many times that you have lost the way.</p>" + tsrc("XII"), "▶ Make another fire"),
tzGather("wood", "glade", 6, "Dead branches", "Gather dead branches in the glade for a second fire", { spread: 10, eachSay: "A dead branch." }),
tzSpot("Light the second fire", "Light the second fire, in the glade", { at: "glade", on: function () { tmwSpot(TMW_AT.glade.x, TMW_AT.glade.z, 4, "Light the second fire", "light it", function () { setStatus("🔥 The green wood smokes and then burns. You sit down by it, very weary, Weena beside you."); }); } }),
tzReadA("🔥 The forest burns", tmbQs("Stepping out from behind my tree and looking back, I saw, through the black pillars of the nearer trees, the flames of the burning forest. It was my first fire coming after me.") + "<p>You had dozed. When you woke, your fire was out and they were on you; you fought them off with the iron bar. And now the whole wood is burning.</p>" + tsrc("XII"), "<p>You dozed by the fire; you woke to find it out and the Morlocks close round, and drove them off with the iron bar. And now the first fire has caught the forest, and the whole wood is burning behind you.</p>" + tsrc("XII"), "▶ Where is Weena?"),
tzPuzzle("🌸 Weena", "You look for Weena. Where is she?", ["Behind you", "She is gone"], 1, ["", ""], { yes: "🌸 " + tmQ("With that I looked for Weena, but she was gone.") }),
tzGo("knoll", "Run from the fire, with the Morlocks blundering past, to the hillock in the clearing", { r: 6 }),
tzReadA("🔥 The hillock", tmbQs("In the centre was a hillock or tumulus, surmounted by a scorched hawthorn.") + "<p>All about it the Morlocks blunder, dazzled and blind in the glare, and you sit on the summit and wait for the dawn. It is the worst night of your life.</p>" + tsrc("XII"), "<p>On a little hill in the clearing you wait out the night. The dazzled Morlocks blunder about below in the glare, blind and lost, and do not come near you. It is the longest night of your life.</p>" + tsrc("XII"), "▶ Wait for the morning"),
tzHold("knoll", 14, "Wait, on the hillock, for the dawn", { r: 6 }),
tzReadA("🌅 Morning", tmbQs("I searched again for traces of Weena, but there were none.") + "<p>You never see her again. You will always hope she slept through it, and never knew.</p>" + tsrc("XII"), "<p>You search for Weena in the morning, but you never find her. You will always remember her, and her flowers.</p>" + tsrc("XII"), "▶ Go on"),
tzFind("note", { sc: "future", x: -540, z: -500 }, "Loose matches in your pocket", "Feel in your trouser pocket as you walk over the smoking ashes", { done: function (f) { f.matches = 3; } }),
tzRead("🔥 Some loose matches", tmbQs("In my trouser pocket were still some loose matches. The box must have leaked before it was lost.") + tsrc("XII"), "▶ On, to the Sphinx")
] });
tmbCh({ t: "The Trap of the White Sphinx", txt: 12, start: { sc: "future", x: 40, z: -380, ry: Math.PI }, tune: "eloi", keep: ["levers", "The two little levers", "🎚️"],
state: { machine: "inside", panels: function (s) { return s >= 6 && s < 9; }, env: function (s) { return s >= 4 && s < 9 ? "sunset" : null; } },
words: "About eight or nine in the morning you come to the seat of yellow metal from which you looked at the world on the evening you arrived. The same beautiful scene, the same splendid palaces, the same lovely ruins, the same silver Thames running between its fertile banks.",
intro: "Back to the hill",
setup: function (f) { f.matches = 3; },
steps: [
{ k: "read" },
tzGo("seat", "To the seat of yellow metal", { r: 4 }),
tzRead("🧠 The truth", tmbQs("I grieved to think how brief the dream of the human intellect had been.") + "<p>Now you see it whole: the Eloi, the pretty idle upper world; the Morlocks, the workers underground, who keep the Eloi as a farmer keeps cattle. Your first theory on this seat was wrong.</p>" + tsrc("XIII"), "▶ Rest"),
tzHold("seat", 14, "Lie down on the turf by the seat, and sleep in the warm sun", { r: 4 }),
tzGo("sphinx", "Wake before sunset, and come down the hill towards the White Sphinx, bar in hand", { r: 10 }),
tzPuzzle("🗿 The panels", "As you come near the pedestal you see something unexpected. What?", ["The Sphinx has fallen", "The bronze valves stand open: they have slid down into grooves", "The Machine is on the lawn again"], 1, ["It stands.", "", "Not quite."], { yes: "🗿 " + tmQ("As I approached the pedestal of the sphinx I found the bronze valves were open. They had slid down into grooves.") }),
tzPuzzle("🪤 A trap?", "Inside, on a raised place in a little room, stands the Time Machine. What is this?", ["A gift from the Morlocks", "A trap: they want you to go in, and then they will shut the doors", "A mistake"], 1, ["Hardly.", "", "They never make mistakes about the dark."], { yes: "🪤 A trap. But you have the levers in your pocket, and they do not know what the Machine can do. You throw away your iron bar." }),
tzSpot("The open pedestal", "Step in through the bronze frame, to the Machine", { at: "sphinxfront", on: function () { tmwSpot(0, -1.0, 3.4, "The open pedestal", "step in", function () { TMW.panelsOpen = false; setStatus("🌑 The bronze panels slide up and strike the frame with a clang. You are in the dark. Trapped, so the Morlocks think. You chuckle."); }); } }),
tzPuzzle("🔥 The matches", "You go to strike a match, to fit the levers by its light. What is wrong?", ["They are wet", "They are the kind that light only on the box, and the box is gone", "They are all used"], 1, ["They are dry.", "", "You have three."], { yes: "🔥 " + tmQ("The matches were of that abominable kind that light only on the box.") }),
tzReadA("🎚️ The levers", tmbQs("But at last the lever was fixed and pulled over. The clinging hands slipped from me.") + tsrc("XIII"), "<p>In the dark you find the saddle by feel, and the little levers, and fit them, with soft hands pulling at you all the while. At last the lever is fixed and pulled over, and the hands slip away.</p>" + tsrc("XIII"), "▶ Away!", { done: tzRide({ from: 802701, to: 30000000, sec: 28, log: 1, at: "shore", lines: ["Sideways in the saddle, you cling to the swaying machine...", "You do not look at the dials: you are going forward...", "The greyness grows darker...", "The days and nights return, slower, and slower...", "The sun grows larger and redder...", "It stops: hanging over the horizon, a vast dome glowing with a dull heat..."] }) }),
tzRideDone("further", "On, into the future...")
] });
tmbCh({ t: "The Further Vision", txt: 13, start: "shore", tune: "end", keep: ["shore", "The last shore", "🌅"], state: { further: function (s) { return s < 9 ? 1 : (s < 11 ? 2 : 3); } },
words: "The machine stands on a sloping beach. The sky is no longer blue: north-eastward it is inky black, overhead a deep Indian red and starless. The sun, red and motionless, hangs on the horizon. Not a breath of wind.",
intro: "The last shore",
steps: [
{ k: "read" },
tzRead("🌊 The sea", tmbQs("The machine was standing on a sloping beach. The sea stretched away to the south-west, to rise into a sharp bright horizon against the wan sky. There were no breakers and no waves, for not a breath of wind was stirring.") + tsrc("XIV"), "▶ Look about"),
tzSpot("The red sun", "Look at the sun, red and still on the horizon", { at: "shore", on: function () { tmwSpot(0, -6, 8, "The red sun", "look at it", function () { setStatus("🌅 A vast dome of dull red, motionless; the earth has come to rest with one face to it, as the moon faces us."); }); } }),
tzSpot("The lichen", "The green on the rocks", { at: "crab", on: function () { tmwSpot(-20, 30, 8, "The lichen", "look at it", function () { setStatus("🟩 A harsh bright green, like the lichens on old stones: the only plants. Nothing else grows."); }); } }),
tzPuzzle("🦀 Something tickles", "You feel a tickling on your cheek, like a fly. You brush at it and catch something threadlike. What is it?", ["A spider's thread", "The antenna of a monstrous crab, right behind you", "A hair"], 1, ["Turn round...", "", "Turn round..."], { yes: "🦀 A monstrous crab-like creature, as big as a table, its long antennae waving, its great claw raised. You pull the lever and leap on a month." }),
tzGo("crab", "The crabs crawl slowly about the beach: walk a little along it", { r: 8 }),
tzHold("shore", 10, "Sit in the saddle and look: the abominable desolation of the world", { r: 6 }),
tzRead("⏳ On and on", tmbQs("So I travelled, stopping ever and again, in great strides of a thousand years or more, drawn on by the mystery of the earth’s fate, watching with a strange fascination the sun grow larger and duller in the westward sky, and the life of the old earth ebb away.") + tsrc("XIV"), "▶ Thirty million years", { done: function () { tmwFurtherSet(2); TMW.envK = "dying"; worldEnv(tmwEnvNow()); } }),
tzHold("shore", 10, "The crabs are gone. Snow falls. Look and listen", { r: 6 }),
tzRead("❄️ The silence", tmbQs("Beyond these lifeless sounds the world was silent. Silent? It would be hard to convey the stillness of it.") + tsrc("XIV"), "▶ Go on"),
tzPuzzle("🌑 The sun is going", "A bay has appeared in the round of the sun, and it grows. What is it?", ["A cloud", "An eclipse: the moon, or Mercury, passing across it", "The sun going out"], 1, ["There are no clouds.", "", "Not yet."], { yes: "🌑 " + tmQ("I saw this grow larger. For a minute perhaps I stared aghast at this blackness that was creeping over the day, and then I realised that an eclipse was beginning.") }),
tzHold("shore", 12, "The darkness grows; a cold wind blows. Wait it out by the machine", { r: 6 }),
tzRead("🔴 A red-hot bow", tmbQs("Then like a red-hot bow in the sky appeared the edge of the sun. I got off the machine to recover myself.") + "<p>Something moves in the shallows: a round thing, the size of a football, with trailing tentacles, black against the blood-red water, hopping fitfully about. A terrible dread comes on you of lying helpless in that awful twilight.</p>" + tsrc("XIV"), "▶ Into the saddle, and home", { done: tzRide({ from: 30000000, to: 1895, sec: 24, log: 1, at: { sc: "richmond", x: 9.8, z: -7.8, ry: Math.PI / 2 }, lines: ["You clamber into the saddle...", "The days and nights return; the sun grows golden again...", "The sky is blue. You breathe more freely...", "The hills ebb and flow; the dials spin backwards...", "Houses again: the thin walls of humanity...", "The old familiar laboratory..."] }) }),
tzRideDone("richmond", "Home...")
] });
tmbCh({ t: "The Time Traveller's Return", txt: 14, start: { sc: "richmond", x: 9.8, z: -7.8, ry: Math.PI / 2 }, tune: "home", keep: ["gazette", "The Pall Mall Gazette, today's date", "🗞️"], state: { machine: "lab" },
words: "The old familiar laboratory: your tools, your appliances, just as you left them. You get off the thing very shakily and sit down on your bench.",
intro: "The laboratory, eight o'clock in the evening",
steps: [
{ k: "read" },
tzRead("🧹 Mrs. Watchett, backwards", tmbQs("As I returned, I passed again across that minute when she traversed the laboratory") + "<p>Mrs. Watchett, walking backwards: in at the garden door, out at the other. You saw her go out at the start; now you saw her come back, in reverse.</p>" + tsrc("XV"), "▶ Go on"),
tzHold("lab", 8, "Sit on your bench until the trembling passes", { r: 3 }),
tzPuzzle("📏 The corner", "The Machine started from the south-east corner of the laboratory. It has come back to rest in the north-west, against the wall. Why?", ["It slid on the floor", "It moved as the Morlocks moved it: the distance from the little lawn to the pedestal of the Sphinx", "You steered it"], 1, ["It cannot slide through time.", "", "You were not steering."], { yes: "📏 " + tmQ("That gives you the exact distance from my little lawn to the pedestal of the White Sphinx, into which the Morlocks had carried my machine.") }),
tzGo("hall", "Limp through the passage to the hall: your heel is still painful", { r: 3 }),
tzSpot("The Pall Mall Gazette", "The newspaper on the table by the door", { at: "hall", on: function () { tmwSpot(-1.8, 8.4, 2, "The Pall Mall Gazette", "look at the date", function () { setStatus("🗞️ Today's date. Nearly eight o'clock by the clock in the hall."); }); } }),
tzPuzzle("🍖 What do you want?", "You smell good wholesome meat from the dining-room. What do you do?", ["Go straight in, as you are", "Go up and wash first"], 0, ["", ""], { yes: "🍖 " + tmQ("Then I sniffed good wholesome meat, and opened the door on you.") }),
tzGo("dining", "Open the door on them", { r: 4 })
] });
tmbCh({ t: "After the Story", txt: 15, start: "smoking", tune: "home", keep: ["flowers", "The two strange white flowers", "🤍"], state: { machine: function (s) { return s < 14 ? "lab" : "gone"; } },
words: "You are the narrator again, one of his guests. He has finished his story, by the fire in the smoking-room. He looks round at your faces.",
intro: "The smoking-room, a quarter to one",
cast: [tmc("trav2", tR(-10.0, 6.4), { ry: Math.PI / 2, until: 8 }), tmc("medic", tR(-8.6, 7.6), { ry: 2.4, until: 13 }), tmc("psych", tR(-8.5, 2.6), { ry: 0.6, until: 13 }), tmc("editor", tR(-5.6, 8.0), { ry: Math.PI, until: 13 }), tmc("journal", tR(-5.0, 2.4), { ry: -0.4, until: 13 }), tmc("silent", tR(-7.2, 1.2), { ry: 0, until: 13 }),
tmc("trav2", tR(7.6, -4.4), { key: "t2", ry: Math.PI / 2, from: 8, until: 10 }), tmc("trav2", tR(0, 9), { key: "t3", ry: 0, from: 10, until: 13 }), tmc("trav", tR(-7.0, -5.4), { key: "t4", ry: 0, from: 13, until: 15 })],
steps: [
{ k: "read" },
tzTalk("The Time Traveller", "He looks at the Medical Man", ["😐 Incredible", tmbQs("I know,", "that all this will be absolutely incredible to you, but to me the one incredible thing is that I am here tonight in this old familiar room looking into your friendly faces and telling you these strange adventures.") + tsrc("XVI"), "▶ Go on"]),
tzTalk("The Editor", "The Editor stands up with a sigh", ["📰 A writer of stories", tmbQs("What a pity it is you’re not a writer of stories!", "You don’t believe it?", "I thought not.") + tsrc("XVI"), "▶ Go on"]),
tzSpot("The white flowers", "Look at the two withered white flowers on the little table", { at: "table", on: function () { tmwSpot(TMW_AT.table.x, TMW_AT.table.z, 2, "The white flowers", "look at them", function () { setStatus("🤍 Two withered flowers, not unlike very large white mallows. No one in the room knows what they are."); }); } }),
tzTalk("The Medical Man", "The Medical Man examines the flowers", ["🌼 The gynaeceum", tmbQs("The gynæceum’s odd,", "It’s a curious thing,", "but I certainly don’t know the natural order of these flowers. May I have them?") + tsrc("XVI"), "▶ Go on"]),
tzPuzzle("🤍 May I have them?", "The Medical Man asks for the flowers. What does the Time Traveller say?", ["\"Certainly\"", "\"Certainly not\""], 1, ["He hesitates...", ""], { yes: "🤍 " + tmQ("They were put into my pocket by Weena, when I travelled into Time.") }),
tzTalk("The Journalist", "The Journalist looks at the clock", ["🕐 A quarter to one", tmbQs("I’m hanged if it isn’t a quarter to one,", "How shall we get home?", "Plenty of cabs at the station,") + tsrc("XVI"), "▶ He takes the lamp"]),
tzGo("lab", "Follow him and the lamp, flaring red, to the laboratory", { r: 3 }),
tzSpot("The Time Machine", "The Machine, squat, ugly and askew", { at: "machine", on: function () { return __ZC(487, 96, this, arguments, new.target); } }),
tzTalk("The Time Traveller", "He runs his hand along the bent rail", ["🔧 It's all right now", tmbQs("It’s all right now,", "The story I told you was true. I’m sorry to have brought you out here in the cold.") + tsrc("XVI"), "▶ Go back"]),
tzGo("door", "To the hall: he helps the Editor on with his coat, and stands bawling good-night", { r: 3 }),
tzGo("road", "Out to the road, and share a cab with the Editor", { r: 5 }),
tzRead("🌙 A gaudy lie?", tmbQs("I shared a cab with the Editor. He thought the tale a “gaudy lie.” For my own part I was unable to come to a conclusion.") + "<p>You lie awake most of the night. Next day, you go back to see him.</p>" + tsrc("XVI"), "▶ The next day"),
tzGo("study", "Next day: he is in the laboratory, but asks you to wait. You sit in the study with a paper", { r: 4 }),
tzTalk("The Time Traveller", "He comes through with a camera and a knapsack", ["📷 Half an hour", tmbQs("Really and truly I do.", "I only want half an hour,", "If you’ll stop to lunch I’ll prove you this time travelling up to the hilt") + tsrc("XVI"), "▶ He goes down the corridor"]),
tzGo("lab", "You remember an appointment. Go to the laboratory door to tell him", { r: 3 }),
tzRead("💨 Gone", tmbQs("A gust of air whirled round me as I opened the door, and from within came the sound of broken glass falling on the floor. The Time Traveller was not there.") + tsrc("XVI"), "▶ Go on"),
tzPuzzle("⌛ Waiting", "The servant comes in from the garden: no one has gone out that way. What do you do?", ["Go home", "Stay, and wait for the second, perhaps stranger story, and the specimens and photographs he will bring"], 1, ["", ""], { yes: "⌛ " + tmQ("But I am beginning now to fear that I must wait a lifetime. The Time Traveller vanished three years ago.") })
] });
tmbCh({ t: "Epilogue", txt: 16, start: "garden", tune: "end", keep: ["epilogue", "Two strange white flowers, to witness", "🌼"], state: { machine: "gone" },
words: "Three years. He has never come back. One cannot choose but wonder.",
intro: "The garden, years after",
steps: [
{ k: "read" },
tzRead("❓ Will he ever return?", tmbQs("One cannot choose but wonder. Will he ever return?") + tsrc("Epilogue"), "▶ Go on"),
tzPuzzle("🌍 Where did he go?", "Where might he have gone? The narrator wonders. Which is NOT one of his guesses?", ["Back to the Stone Age", "Into the Cretaceous Sea, among the great reptiles", "Back to the Eloi, to find Weena", "To the Battle of Hastings"], 3, ["He wonders that.", "He wonders that.", "Perhaps...", ""], { yes: "🌍 Nobody knows. Perhaps forward, to some age when men are still men, but with the riddles of our own time answered." }),
tzHold("garden", 10, "Stand in his garden a while, and think of him", { r: 8 }),
tzRead("🌼 Two white flowers", tmbQs("And I have by me, for my comfort, two strange white flowers—shrivelled now, and brown and flat and brittle—to witness that even when mind and strength had gone, gratitude and a mutual tenderness still lived on in the heart of man.") + tsrc("Epilogue"), "▶ Close the book")
] });
