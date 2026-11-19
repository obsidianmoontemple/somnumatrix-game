/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var MRW_KEY = "warworlds", MRW_NAME = "The War of the Worlds", MRW_LONG = "The War of the Worlds: Woking, the Thames, the sea, and London's edge";
var MRW = { base: -10900000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], moving: false, ride: null, night: 0, lights: 0, water: [], inst: [], beasts: [], hgt: null, rooms: [], doors: [], envK: null, st: {} };
var MRW_ERA = " It is 1898, in H. G. Wells's book The War of the Worlds (the book only, never any film or radio play). Speak in the manner of an English person of the time, briefly and in character; keep it kind and suitable for all ages, and never give away what happens later in the story.";
var MRW_SC = {
woking: { x: 0, name: "Woking and Horsell Common", bound: 900, env: "heath" },
thames: { x: 6000, name: "Weybridge and Shepperton, on the Thames", bound: 760, env: "river" },
north: { x: 12000, name: "The north road, at Barnet", bound: 700, env: "heath" },
sea: { x: 18000, name: "The Essex coast, and the sea", bound: 900, env: "sea" },
sheen: { x: 24000, name: "Sheen and Putney", bound: 900, env: "red" },
primrose: { x: 30000, name: "Primrose Hill", bound: 700, env: "dusk" }
};
function mrwScAt(x) { var best = null, bd = 1e9; for (var k in MRW_SC) {
var d = Math.abs(x - MRW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 5000 ? best : null; }
var MRW_AT = {};
function mrwAtPt(at) { if (typeof at === "string")
at = MRW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
var MRW_ENV = {
heath: { top: 0x5A90D8, low: 0xE8ECE4, fog: 0xD4DCD0, fogD: 0.0014, sun: 1.05, sunCol: 0xFFF2DC, sunDir: [0.45, 0.8, 0.25], hemi: 0.76, hemiCol: 0xDCE8F4, hemiGround: 0x5A5A34 },
dusk: { top: 0x2A3A6A, low: 0xE8A070, fog: 0xB89078, fogD: 0.0022, sun: 0.62, sunCol: 0xFFA868, sunDir: [-0.75, 0.25, 0.3], hemi: 0.6, hemiCol: 0xE8C0A8, hemiGround: 0x3A2E22 },
dawn: { top: 0x5A6A9A, low: 0xF0C8A8, fog: 0xD0B8A8, fogD: 0.0024, sun: 0.7, sunCol: 0xFFD0A0, sunDir: [0.8, 0.25, 0.2], hemi: 0.66, hemiCol: 0xE8D0C0, hemiGround: 0x3A3428 },
smoke: { top: 0x3A3430, low: 0x7A6A5A, fog: 0x5A5048, fogD: 0.0062, sun: 0.45, sunCol: 0xE8B888, sunDir: [0.3, 0.6, 0.2], hemi: 0.55, hemiCol: 0xA89888, hemiGround: 0x2A241E },
red: { top: 0x6A80A8, low: 0xE0C8B8, fog: 0xC8A898, fogD: 0.0018, sun: 0.95, sunCol: 0xFFE8D0, sunDir: [0.4, 0.75, 0.3], hemi: 0.72, hemiCol: 0xE8D8D0, hemiGround: 0x5A2A22 },
sea: { top: 0x6A94C8, low: 0xE4EAEE, fog: 0xC8D4DC, fogD: 0.0011, sun: 0.95, sunCol: 0xFFF0D8, sunDir: [-0.5, 0.6, 0.3], hemi: 0.76, hemiCol: 0xDCE6F0, hemiGround: 0x4A5A5A },
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
var MRW_Q = [];
function mrQ(s) { MRW_Q.push(s); return "<i>“" + s + "”</i>"; }
function mrQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0'>" + mrQ(s) + "</p>"; }).join(""); }
function mrEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function mrSrc(part) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>H. G. Wells, The War of the Worlds (1898)" + (part ? ", " + part : "") + "</div>"; }
function mrwLite() { return typeof LITE !== "undefined" && !!LITE; }
function mrwPhotoTex(name, mpt, nrm) { return __ZC(504, 0, this, arguments, new.target); }
function mrwS(name, col, mpt, o) { return __ZC(504, 1, this, arguments, new.target); }
function mrwCanvas(key, w, h, fn) { if (MRW.tex[key])
return MRW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (MRW.tex[key] = t); }
function mrwM(key, make) { return MRW.mats[key] || (MRW.mats[key] = make()); }
function mrwLam(col, o) { return __ZC(504, 2, this, arguments, new.target); }
function mrwShine(col, r, mt) { return mrwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function mrwGlowM(col, op) { return mrwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function mrwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function mrwLeafTex() { return mrwPhotoTexAlpha(); }
function mrwPhotoTexAlpha() { var k = "leafpng"; if (MRW.tex[k])
return MRW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (MRW.tex[k] = t); }
function mrwFrondTex(kind) { return __ZC(504, 3, this, arguments, new.target); }
function mrwBambooTex() { return __ZC(504, 4, this, arguments, new.target); }
function mrwReedTex(kind) { return __ZC(504, 5, this, arguments, new.target); }
function mrwGrassTex() { return __ZC(504, 6, this, arguments, new.target); }
function mrwFlowerTex(col) { return __ZC(504, 7, this, arguments, new.target); }
function mrwSkinTex(kind) { return __ZC(504, 8, this, arguments, new.target); }
function mrwRippleTex() { return __ZC(504, 9, this, arguments, new.target); }
function mrwWaterM(col, op) { return mrwM("water" + col + "|" + op, function () { var t = mrwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var MRW_CELL = 48;
function mrwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / MRW_CELL), b = Math.floor(x1 / MRW_CELL), c = Math.floor(z0 / MRW_CELL), d = Math.floor(z1 / MRW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function mrwGridAdd(S) { var g = MRW.sgrid || (MRW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; mrwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function mrwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; MRW.solids.push(S); mrwGridAdd(S); return S; }
function mrwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; MRW.solids.push(S); mrwGridAdd(S); return S; }
function mrwSolidAt(x, z, feet) { return __ZC(504, 10, this, arguments, new.target); }
function mrwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; MRW.floors.push(F); return F; }
function mrwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; MRW.floors.push(F); return F; }
function mrwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function mrwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function mrwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < MRW.floors.length; i++) {
var F = MRW.floors[i];
if (F.off || !mrwFloorIn(F, x, z))
continue;
var y = mrwFloorY(F, x, z);
if (y <= feet + 1.1 && (best === null || y > best))
best = y;
} return best; }
function mrwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; MRW.spots.push(S); return S; }
function mrwPerson(seed, x, z, y, o, ry) { return __ZC(504, 11, this, arguments, new.target); }
function mrwTalk(P, name, persona, greet, r, fn) { MRW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona + MRW_ERA, greet: greet } }); return P; }
function mrwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(504, 12, this, arguments, new.target); }
function mrwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function mrwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = mrwHash(ix, iz), b = mrwHash(ix + 1, iz), c = mrwHash(ix, iz + 1), d = mrwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function mrwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * mrwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function mrwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function mrwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), mrwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); MRW.water.push(m); return m; }
var MRW_GEO = {};
function mrwGeo(k, make) { if (MRW_GEO[k])
return MRW_GEO[k]; var g = make(); g.userData.shared = 1; return (MRW_GEO[k] = g); }
function mrwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function mrwFronds(n, len, wid, droop, y0, ring) { return __ZC(504, 13, this, arguments, new.target); }
function mrwInst(P, geo, mat, list, o) { return __ZC(504, 14, this, arguments, new.target); }
function mrwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function mrwPathD(x, z, pts) { var best = 1e9; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = Math.sqrt(px * px + pz * pz);
if (d < best)
best = d;
} return best; }
function mrwStrip(P, pts, w, hfn, mat, lift) { return __ZC(504, 15, this, arguments, new.target); }
function mrwPlant(P, kind, list, o) { return __ZC(504, 16, this, arguments, new.target); }
function mrwTaper(pts, rads, seg, rs, flat) { return __ZC(504, 17, this, arguments, new.target); }
function mrwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function mrwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function mrwSkinM(kind, col) { return __ZC(504, 18, this, arguments, new.target); }
function mrwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), mrwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function mrwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(504, 19, this, arguments, new.target); }
function mrwBoxG(w, h, d) { return __ZC(504, 20, this, arguments, new.target); }
function mrwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(mrwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !mrwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
mrwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function mrwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(mrwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function mrwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(504, 21, this, arguments, new.target); }
function mrwHouse(P, x, z, w, d, h, o) { return __ZC(504, 22, this, arguments, new.target); }
function mrwLand(x, z) { if (MRW.inRm && mrwRoomAt(x, z))
return -999; return MRW.hgt ? MRW.hgt(x, z) : 0; }
function mrwGround(x, z, feet) { var f = mrwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = mrwLand(x, z); return f === null ? h : Math.max(f, h); }
var MRW_SCN = {};
function mrwSc() { return MRW_SC[MRW.sc] || MRW_SC.woking; }
function mrwSceneDrop() { return __ZC(504, 23, this, arguments, new.target); }
function mrwScene(k) { return __ZC(504, 24, this, arguments, new.target); }
function mrwVeil() { if (MRW.veil)
return MRW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); MRW.veil = v; return v; }
function mrwGo(at, msg, after) { return __ZC(504, 25, this, arguments, new.target); }
function mrwSmoke(P, x, y, z, col, n) { return __ZC(504, 26, this, arguments, new.target); }
function mrwFire(P, x, y, z, s) { return __ZC(504, 27, this, arguments, new.target); }
function mrwLocalSc() { var L = worldLocal(); return { x: L.x - mrwSc().x, z: L.z }; }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
var C = function (o, list) { return list[Math.floor(o.r * list.length) % list.length]; };
Object.assign(DLN_WEAR, {
mrnarr: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth:chain", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xF4F0E6, collar: 0xF8F6F0, tie: 0x3A2A22, vest: 0x5A4A36, coat: 0x6A5A40, trou: 0x5A4A3A }, shoes: 0x2A1A10 };
},
mrarty: function (o) {
return { ids: ["oz:shirt:long:cloth", "oz:collar:high:big", "oz:coat:military:cloth", "oz:trousers:cloth", "oz:belt", "oz:boots"],
col: { shirt: 0xD8D0C0, collar: 0xA8202A, coat: 0x1A2238, trou: 0x1A2238, belt: 0xF0ECE0 }, shoes: 0x0E0E10 };
},
mrartyworn: function (o) {
return { ids: ["oz:shirt:long:worn7", "oz:collar:high:big", "oz:coat:military:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0x8A8270, collar: 0x6A2A2A, coat: 0x22242A, trou: 0x2A2A2E }, shoes: 0x2A2018 };
},
mrhussar: function (o) {
return { ids: ["oz:shirt:long:cloth", "oz:collar:high:big", "oz:coat:military:cloth", "oz:breeches:cloth", "oz:belt", "oz:boots"],
col: { shirt: 0xD8D0C0, collar: 0xE8C040, coat: 0x1A2448, trou: 0x1A2448, belt: 0xE8C040, frogs: 0xE8C040 }, shoes: 0x0E0E10 };
},
mrsailor: function (o) {
return { ids: [o.r < 0.5 ? "oz:shirt:long:stripe" : "oz:shirt:long:cloth", "oz:collar:low:soft", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: C(o, [0xF0ECE0, 0xD8D0C0]), collar: 0xF0ECE0, tie: 0x1A2A4A, coat: C(o, [0x1E2638, 0x2A2E3A]), trou: C(o, [0x1E2638, 0x2A2E3A]) }, shoes: 0x141210 };
},
mrcurate: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:big", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xE8E4DA, collar: 0xF4F2EC, coat: 0x1E1E22, trou: 0x1E1E22 }, shoes: 0x141210 };
}
});
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { mrnarr: [null, "flatcap"], mrarty: ["flatcap"], mrartyworn: [null], mrhussar: ["flatcap"], mrsailor: ["flatcap", null], mrcurate: [null, "clergyhat"] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { mrnarr: [null, "stick"], mrarty: [null], mrartyworn: [null], mrhussar: [null], mrsailor: [null], mrcurate: [null] });
})();
function mrwDressed(seed, dress, o) { return __ZC(504, 28, this, arguments, new.target); }
var MRW_ERA2 = "";
var MRP = {
wife: "You are the narrator's wife, from H. G. Wells's The War of the Worlds (the book only): you live with your husband, a writer on philosophy, in a house on Maybury Hill near Woking, Surrey. Calm, loving, practical; you worry for him." + MRW_ERA2,
ogilvy: "You are Ogilvy, the well-known astronomer of Ottershaw, from H. G. Wells's The War of the Worlds (the book only): you watch Mars through your telescope, you think the flashes on Mars are meteorites or a volcanic outburst, and that the chances against any living thing on Mars are a million to one. Eager, kind, a man of science." + MRW_ERA2,
henderson: "You are Henderson, the London journalist living at Woking, from H. G. Wells's The War of the Worlds (the book only): quick, curious, you were first to wire the news of the cylinder to London. Friendly, a little excited." + MRW_ERA2,
stent: "You are Stent, the Astronomer Royal, from H. G. Wells's The War of the Worlds (the book only): a tall, fair-haired man of science, calm and in charge, directing the workmen at the pit on Horsell Common." + MRW_ERA2,
landlord: "You are the landlord of the Spotted Dog inn near Woking, from H. G. Wells's The War of the Worlds (the book only): a plain Surrey innkeeper, friendly, who lets out his dog-cart, a bit doubtful about all this fuss over the thing on the common." + MRW_ERA2,
arty: "You are the artilleryman, from H. G. Wells's The War of the Worlds (the book only): a young driver of the Royal Artillery whose battery was destroyed by the heat-ray; plain-spoken, quick, practical, a Londoner at heart. Later you dream of living underground in the drains and fighting back." + MRW_ERA2,
curate: "You are the curate of Weybridge, from H. G. Wells's The War of the Worlds (the book only): a young clergyman whose church has been burnt; frightened, querulous, sure the Martians are a punishment, quoting scripture, asking 'Why are these things permitted?'." + MRW_ERA2,
brother: "You are the narrator's younger brother, a medical student in London, from H. G. Wells's The War of the Worlds (the book only): sensible, brave, quick to act; you fled north out of London and helped two ladies on the road." + MRW_ERA2,
mrselph: "You are Mrs. Elphinstone, from H. G. Wells's The War of the Worlds (the book only): a lady from Stanmore whose husband, a surgeon, has gone ahead; frightened, wanting to go back for him; kind." + MRW_ERA2,
misselph: "You are Miss Elphinstone, Mrs. Elphinstone's sister-in-law, from H. G. Wells's The War of the Worlds (the book only): a slender young woman, cool and brave; you drove the chaise and carry a revolver." + MRW_ERA2,
captain: "You are the captain of the paddle steamer off the Essex coast, from H. G. Wells's The War of the Worlds (the book only): a gruff sailor taking refugees across to Ostend, keeping order, watching the ironclads on the horizon." + MRW_ERA2,
cousin: "You are the narrator's cousin at Leatherhead, from H. G. Wells's The War of the Worlds (the book only): a quiet country gentleman who takes in the narrator's wife for safety." + MRW_ERA2,
soldier: "You are a soldier in 1898 Surrey, in H. G. Wells's The War of the Worlds (the book only): you have orders to keep people back from the common; you are brisk, a little scared, and you know nothing more than the rumours." + MRW_ERA2,
townfolk: "You live in the place this world shows, in 1898, in the world of H. G. Wells's The War of the Worlds (the book only). You are going about your own life and work, talking of your town, your trade, the weather, and the strange news." + MRW_ERA2
};
function mrwPersona(k) { return MRP[k] || k || ""; }
var MRW_FOLK = {
wife: { name: "My wife", dress: "lady", sex: "f", hair: 0x5A3A22, persona: "wife", greet: "There you are! Come in, the tea is laid. What is all this talk of a falling star?" },
ogilvy: { name: "Ogilvy", dress: "gent", sex: "m", hair: 0x6A4A2A, beard: "short", persona: "ogilvy", greet: "Come and look! Mars, through the glass. Look at that little red disc. Now watch, and wait for the flash." },
henderson: { name: "Henderson", dress: "gent", sex: "m", hair: 0x3A2A1E, beard: "mustache", persona: "henderson", greet: "Have you heard? Ogilvy's found a thing on the common. I've wired London already." },
stent: { name: "Stent, the Astronomer Royal", dress: "gent", sex: "m", hair: 0xD8C890, persona: "stent", greet: "Keep back, if you please. The thing is still very hot." },
landlord: { name: "The landlord of the Spotted Dog", dress: "worker", sex: "m", hair: 0x8A6A4A, beard: "mustache", persona: "landlord", greet: "Dog-cart? Aye, I can let you have it. Back by midnight, mind." },
arty: { name: "The artilleryman", dress: "mrarty", sex: "m", hair: 0x3A2A1A, persona: "arty", greet: "All right, all right. I'm a man, same as you. Got anything to eat?" },
artyworn: { name: "The artilleryman", dress: "mrartyworn", sex: "m", hair: 0x3A2A1A, beard: "short", persona: "arty", greet: "Stop! Where do you come from? This is my country." },
curate: { name: "The curate", dress: "mrcurate", sex: "m", hair: 0xD8C8A0, persona: "curate", greet: "Why are these things permitted? What sins have we done?" },
brother: { name: "My brother", dress: "gent", sex: "m", hair: 0x5A3A22, persona: "brother", greet: "There you are! I've been wondering what's happened down at Woking. The papers say so little." },
mrselph: { name: "Mrs. Elphinstone", dress: "lady", sex: "f", hair: 0x6A4A30, persona: "mrselph", greet: "George! Where is George? We must go back for him!" },
misselph: { name: "Miss Elphinstone", dress: "lady", sex: "f", hair: 0x2A1A12, persona: "misselph", greet: "Stand away from the pony. I have a revolver, and I can use it." },
captain: { name: "The captain", dress: "mrsailor", sex: "m", hair: 0x8A8478, beard: "full", persona: "captain", greet: "Ostend, if you can pay. Passengers aft, and keep clear of the paddle boxes." },
cousin: { name: "My cousin at Leatherhead", dress: "gent", sex: "m", hair: 0x9A8A7A, persona: "cousin", greet: "Come in, come in. You'll both stay here, of course." }
};
function mrwFolk(key, x, z, ry, o) { return __ZC(504, 29, this, arguments, new.target); }
function mrwCrowd(seed, list, x0, z0, x1, z1, o) { return __ZC(504, 30, this, arguments, new.target); }
function mrwOne(seed, name, sex, dress, x, z, ry, greet, o) { return __ZC(504, 31, this, arguments, new.target); }
var MRW_RY = -80;
function mrwMat(k) { return __ZC(504, 32, this, arguments, new.target); }
function mrwThatchM() { return __ZC(504, 33, this, arguments, new.target); }
function mrwInRoom() { return camera.position.y < MRW_RY + 30; }
function mrwRoomAt(x, z) { for (var i = 0; i < MRW.rooms.length; i++) {
var R = MRW.rooms[i];
if (x > R.x0 - 0.3 && x < R.x1 + 0.3 && z > R.z0 - 0.3 && z < R.z1 + 0.3)
return R;
} return null; }
function mrwRoom(P, key, cx, cz, w, d, o) { return __ZC(504, 34, this, arguments, new.target); }
function mrwDoor(R, name, ox, oz, ory) { return __ZC(504, 35, this, arguments, new.target); }
function mrwIn(sc, key, lx, lz) {
return function () {
var R = MRW.sc === sc ? MRW.rooms.filter(function (r) { return r.key === key; })[0] : null;
if (R)
return { sc: sc, x: R.cx + lx, z: R.cz + lz, y: R.y };
var A = MRW_ROOMXZ[sc] && MRW_ROOMXZ[sc][key];
return A ? { sc: sc, x: A[0] + lx, z: A[1] + lz, y: MRW_RY } : null;
};
}
var MRW_ROOMXZ = {};
function mrwTable(P, x, z, w, d, h, o) { return __ZC(504, 36, this, arguments, new.target); }
function mrwChair(P, x, z, ry, o) { return __ZC(504, 37, this, arguments, new.target); }
function mrwBed(P, x, z, ry, o) { return __ZC(504, 38, this, arguments, new.target); }
function mrwShelves(P, x, z, w, h, ry, o) { return __ZC(504, 39, this, arguments, new.target); }
function mrwHearth(P, x, z, ry, o) { return __ZC(504, 40, this, arguments, new.target); }
function mrwCandle(P, x, y, z, o) { return __ZC(504, 41, this, arguments, new.target); }
function mrwBench(P, x, z, ry, o) { return __ZC(504, 42, this, arguments, new.target); }
function mrwRug(P, x, z, w, d, col) { return __ZC(504, 43, this, arguments, new.target); }
function mrwPicture(P, x, y, z, ry, w, h, draw) { return __ZC(504, 44, this, arguments, new.target); }
function mrwWindowIn(P, x, y, z, ry, w, h, o) { return __ZC(504, 45, this, arguments, new.target); }
function mrwTownHouse(P, x, z, w, d, h, o) { return __ZC(504, 46, this, arguments, new.target); }
function mrwChurch(P, x, z, o) { return __ZC(504, 47, this, arguments, new.target); }
function mrwTownWall(P, x0, z0, x1, z1, h, gate) { return __ZC(504, 48, this, arguments, new.target); }
function mrwConifer(P, list, o) { return __ZC(504, 49, this, arguments, new.target); }
function mrwBirch(P, list) { return __ZC(504, 50, this, arguments, new.target); }
function mrwPeak(P, x, z, r, h, o) { return __ZC(504, 51, this, arguments, new.target); }
function mrwBoat(P, x, y, z, ry, o) { return __ZC(504, 52, this, arguments, new.target); }
var MRW_UP = new THREE.Vector3(0, 1, 0), MRW_V1 = new THREE.Vector3(), MRW_V2 = new THREE.Vector3();
function mrwStick(m, a, b) { MRW_V1.set(b.x - a.x, b.y - a.y, b.z - a.z); var L = MRW_V1.length() || 0.001; m.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); m.quaternion.setFromUnitVectors(MRW_UP, MRW_V1.multiplyScalar(1 / L)); m.scale.set(1, L, 1); return m; }
function mrwVilla(P, x, z, o) { return __ZC(504, 53, this, arguments, new.target); }
function mrwVillaDoor(x, z, o) { o = o || {}; var w = o.w || 9, d = o.d || 8, ry = o.ry || 0, lx = w * 0.25, lz = d / 2 + 1.6; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function mrwShops(P, x, z, n, o) { return __ZC(504, 54, this, arguments, new.target); }
function mrwShopDoor(x, z, n, i, o) { o = o || {}; var sw = o.sw || 6, d = o.d || 9, ry = o.ry || 0, lx = -((n - 1) * sw) / 2 + i * sw + sw / 2 - 0.9, lz = d / 2 + 1.2; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function mrwRailway(P, pts, hfn) { return __ZC(504, 55, this, arguments, new.target); }
function mrwStation(P, x, z, len, name, o) { return __ZC(504, 56, this, arguments, new.target); }
function mrwSignal(P, x, z, hfn) { var g = new THREE.Group(); g.position.set(x, hfn(x, z), z); P.add(g); mrwCyl(g, 0.1, 0.14, 7, mrwLam(0xE8E4D8), 0, 0, 0, 8); var arm = mrwBox(g, 1.4, 0.24, 0.06, mrwLam(0xB82A22), 0.7, 6, 0.1); arm.rotation.z = -0.5; return g; }
function mrwBridge(P, x, z, len, w, y, o) { return __ZC(504, 57, this, arguments, new.target); }
function mrwLamp(P, x, z, hfn, o) { return __ZC(504, 58, this, arguments, new.target); }
function mrwPoles(P, pts, hfn, gap) { return __ZC(504, 59, this, arguments, new.target); }
function mrwPaling(P, pts, hfn, o) { return __ZC(504, 60, this, arguments, new.target); }
function mrwCylinder(P, x, y, z, o) { return __ZC(504, 61, this, arguments, new.target); }
function mrwPit(cx, cz, r, depth) { return function (x, z) { var d = Math.hypot(x - cx, z - cz); if (d > r * 1.5)
return 0; if (d > r)
return Math.max(0, (1 - (d - r) / (r * 0.5)) * 1.4); return -depth * Math.pow(1 - (d / r) * (d / r), 0.8) + 1.4 * (d / r); }; }
function mrwTripod(P, x, z, o) { return __ZC(504, 62, this, arguments, new.target); }
function mrwTripodPose(T, dt) { return __ZC(504, 63, this, arguments, new.target); }
function mrwTripodTick(dt) { return __ZC(504, 64, this, arguments, new.target); }
function mrwRay(T, tx, tz, on) { T.rayTo = { x: tx, z: tz }; T.rayOn = !!on; }
function mrwRayTick(T, dt) { return __ZC(504, 65, this, arguments, new.target); }
function mrwHandler(P, x, y, z, ry) { return __ZC(504, 66, this, arguments, new.target); }
function mrwHandlerTick(dt) { (MRW.handlers || []).forEach(function (H) { H.t += dt; H.legs.forEach(function (L, i) { L.rotation.z = Math.sin(H.t * 2 + i) * 0.25; }); H.g.rotation.y += Math.sin(H.t * 0.3) * dt * 0.2; }); }
function mrwMartian(P, x, y, z, ry, o) { return __ZC(504, 67, this, arguments, new.target); }
function mrwBlackSmoke(P, x, z, r, hfn, o) { return __ZC(504, 68, this, arguments, new.target); }
function mrwRedWeed(P, list) { return __ZC(504, 69, this, arguments, new.target); }
function mrwScorch(P, x, z, r, hfn, fires) { return __ZC(504, 70, this, arguments, new.target); }
function mrwDeadTrees(P, list) { return __ZC(504, 71, this, arguments, new.target); }
function mrwCart(P, x, z, ry, o) { return __ZC(504, 72, this, arguments, new.target); }
function mrwFar(P, hfn, col, o) { return __ZC(504, 73, this, arguments, new.target); }
function mrwPathAt(pts, s) { return __ZC(504, 74, this, arguments, new.target); }
function mrwPathLen(pts) { var L = 0; for (var i = 1; i < pts.length; i++)
L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function mrwStream(P, pts, hfn, o) { return __ZC(504, 75, this, arguments, new.target); }
function mrwCrxKinds() { return __ZC(504, 76, this, arguments, new.target); }
function mrwHorse(P, x, y, z, ry, o) { return __ZC(504, 77, this, arguments, new.target); }
function mrwPlainBeast(P, x, y, z, ry, o) { return __ZC(504, 78, this, arguments, new.target); }
var MRW_WK = { pit: [-220, -330], obs: [60, -690], home: [400, 30], dog: [210, 50], stn: [0, 92], canal: -60, rail: 100, lea: [730, 700] };
function mrwWokH(x, z) { return __ZC(504, 79, this, arguments, new.target); }
var MRW_WK_ROADS = {
stn: [[0, 96], [0, 60], [-40, 0], [-110, -60], [-150, -130], [-190, -230], [-215, -300]],
chob: [[-215, -300], [-300, -360], [-420, -420], [-600, -480], [-880, -520]],
hors: [[-150, -130], [-260, -120], [-380, -110], [-520, -140]],
ott: [[-215, -300], [-120, -420], [0, -560], [60, -660]],
may: [[0, 96], [60, 76], [140, 58], [210, 48], [300, 40], [380, 40], [460, 46], [560, 60]],
lea: [[460, 46], [520, 180], [600, 360], [680, 540], [730, 680], [740, 840]],
byf: [[0, 96], [-60, 160], [-200, 260], [-420, 400], [-640, 520], [-880, 620]],
town: [[-120, 74], [200, 74]]
};
MRW_ROOMXZ.woking = { study: [-860, 860], dining: [-830, 860], obs: [-800, 860], spotted: [-770, 860], booking: [-740, 860], college: [-710, 860], news: [-680, 860], cousin: [-650, 860], cott: [-620, 860] };
Object.assign(MRW_AT, {
obs: { sc: "woking", x: 60, z: -674, name: "Ogilvy's observatory at Ottershaw", ry: Math.PI },
ott: { sc: "woking", x: 20, z: -600, name: "the road down from Ottershaw" },
common: { sc: "woking", x: -180, z: -280, name: "Horsell Common" },
pitrim: { sc: "woking", x: -196, z: -312, name: "the rim of the sand pit" },
pitfar: { sc: "woking", x: -150, z: -262, name: "the heather, a safe way from the pit" },
pines: { sc: "woking", x: -120, z: -200, name: "the pine woods by the common" },
bridge: { sc: "woking", x: -110, z: -60, name: "Horsell bridge, over the canal" },
canal: { sc: "woking", x: -20, z: -52, name: "the towpath of the canal" },
station: { sc: "woking", x: 6, z: 92, name: "Woking station" },
town: { sc: "woking", x: 40, z: 72, name: "the street by the station" },
college: { sc: "woking", x: -74, z: 62, name: "the College Arms" },
spotted: { sc: "woking", x: 210, z: 56, name: "the Spotted Dog" },
home: { sc: "woking", x: 400, z: 44, name: "my house on Maybury Hill", ry: Math.PI },
garden: { sc: "woking", x: 390, z: 10, name: "my garden, behind the house" },
maybury: { sc: "woking", x: 300, z: 44, name: "the Maybury road" },
horsell: { sc: "woking", x: -380, z: -118, name: "Horsell village" },
chobham: { sc: "woking", x: -420, z: -420, name: "the Chobham road" },
learoad: { sc: "woking", x: 600, z: 360, name: "the road to Leatherhead" },
leatherhead: { sc: "woking", x: 730, z: 690, name: "Leatherhead" },
byfleet: { sc: "woking", x: -420, z: 400, name: "the Byfleet road" },
arch: { sc: "woking", x: 150, z: 100, name: "the railway arch at Maybury" }
});
function mrwWokRooms(G) { return __ZC(504, 80, this, arguments, new.target); }
function mrwWokPit(G) { return __ZC(504, 81, this, arguments, new.target); }
function mrwWoking(G) { return __ZC(504, 82, this, arguments, new.target); }
function mrwWokFolk(G) { return __ZC(504, 83, this, arguments, new.target); }
function mrwWokLive(st) { return __ZC(504, 84, this, arguments, new.target); }
MRW_SCN.woking = { start: { x: 60, z: -674, ry: Math.PI }, h: mrwWokH,
wl: function (x, z) { return Math.abs(z - MRW_WK.canal) < 6 ? -0.5 : null; },
build: function (G) { return __ZC(504, 85, this, arguments, new.target); } };
function mrwThZ(x) { return -150 + 40 * Math.sin(x / 260); }
function mrwWeyX(z) { return -200 + 18 * Math.sin(z / 150); }
var MRW_TH = { half: 36, wey: 12, town: [-380, 220], fount: [-360, 200], conf: [-214, -108], shep: [-280, -330], walton: [260, 10], hall: [420, -290], hedge: [470, -372], uh: [500, -540], sun: [720, -320], bridge: [-196, 140], ramp: [-140, 160] };
function mrwThH(x, z) { return __ZC(504, 86, this, arguments, new.target); }
function mrwThWl(x, z) { var d = Math.abs(z - mrwThZ(x)); if (d < MRW_TH.half)
return 0; if (z > mrwThZ(x) && Math.abs(x - mrwWeyX(z)) < MRW_TH.wey)
return 0; return null; }
var MRW_TH_ROADS = {
byf: [[-860, 520], [-700, 420], [-560, 320], [-440, 250], [-380, 220]],
high: [[-520, 220], [-380, 220], [-260, 180], [-196, 140], [-120, 160], [0, 120], [160, 60], [260, 10], [420, 0], [600, -20]],
conf: [[-300, 190], [-250, 60], [-226, -60], [-214, -100]],
chert: [[-520, 220], [-640, 140], [-860, 80]],
shep: [[-280, -226], [-280, -330], [-320, -460], [-360, -620]],
hall: [[300, -228], [420, -290], [560, -300], [720, -320], [860, -330]],
uh: [[420, -290], [460, -400], [500, -520], [520, -680]],
laleham: [[-280, -226], [-480, -240], [-700, -260]]
};
MRW_ROOMXZ.thames = { wshop: [-700, 700], wcott: [-670, 700], ferry: [-640, 700], sinn: [-610, 700], uhouse: [-580, 700], hparl: [-550, 700] };
Object.assign(MRW_AT, {
weybridge: { sc: "thames", x: -380, z: 228, name: "Weybridge" },
fountain: { sc: "thames", x: -356, z: 206, name: "the drinking fountain at Weybridge" },
thbyf: { sc: "thames", x: -700, z: 420, name: "the road from Byfleet" },
wbridge: { sc: "thames", x: -196, z: 146, name: "the bridge over the Wey" },
rampart: { sc: "thames", x: -150, z: 176, name: "the rampart over the bridge" },
conf: { sc: "thames", x: -214, z: -96, name: "the junction of the Wey and the Thames" },
beach: { sc: "thames", x: -208, z: -118, name: "the gravelly beach" },
wade: { sc: "thames", x: -196, z: -136, name: "the shallows" },
ferry: { sc: "thames", x: -232, z: -102, name: "the Shepperton ferry" },
shepbank: { sc: "thames", x: -276, z: -230, name: "the Shepperton landing" },
shepperton: { sc: "thames", x: -282, z: -330, name: "Shepperton" },
walton: { sc: "thames", x: 260, z: 20, name: "Walton" },
hbank: { sc: "thames", x: 330, z: -228, name: "the far bank, below Walton" },
halliford: { sc: "thames", x: 420, z: -296, name: "Halliford" },
hedge: { sc: "thames", x: 470, z: -366, name: "the hedge in the flat meadows" },
meadow: { sc: "thames", x: 500, z: -430, name: "the flat meadows near Halliford" },
uhall: { sc: "thames", x: 500, z: -528, name: "Upper Halliford" },
sunbury: { sc: "thames", x: 720, z: -326, name: "the road to Sunbury" },
chertsey: { sc: "thames", x: -760, z: 100, name: "the Chertsey meadows" },
laleham: { sc: "thames", x: -600, z: -252, name: "Laleham" }
});
function mrwThRooms(G) { return __ZC(504, 87, this, arguments, new.target); }
function mrwThames(G) { return __ZC(504, 88, this, arguments, new.target); }
function mrwThFolk(G) { return __ZC(504, 89, this, arguments, new.target); }
function mrwThLive(st) { (MRW.tripods || []).forEach(function (T) { if (T.dead)
return; T.rayOn = !!st.thray; if (T.rayOn)
T.rayTo = { x: T.x + Math.sin(T.ry) * 90, z: T.z + Math.cos(T.ry) * 90 }; }); }
MRW_SCN.thames = { start: { x: -660, z: 390, ry: -1.0 }, h: mrwThH, wl: mrwThWl,
build: function (G) { return __ZC(504, 90, this, arguments, new.target); } };
var MRW_NO = { road: 0, meet: [-14, 80], corner: [-440, 96], camp: [-250, 40], edg: [-660, 110], hadley: [420, -220], field: [560, -330] };
function mrwNoH(x, z) { var n = mrwFbm(x * 0.006, z * 0.006, 4), h = 4 + n * 9; h += Math.max(0, 1 - Math.hypot(x - 420, z + 260) / 360) * 14; h -= Math.max(0, 1 - Math.abs(x) / 40) * 1.2; return h; }
var MRW_NO_ROADS = {
great: [[0, 700], [0, 400], [4, 200], [0, 80], [-6, -100], [0, -300], [10, -500], [0, -700]],
lane: [[-700, 110], [-560, 104], [-440, 96], [-320, 70], [-250, 52], [-150, 70], [-60, 80], [-14, 80]],
hadley: [[0, -160], [120, -180], [260, -200], [420, -220], [560, -260], [700, -300]],
field: [[560, -260], [566, -330]],
barnet: [[0, -300], [-140, -320], [-260, -340]]
};
MRW_ROOMXZ.north = { edgshop: [-700, 640], corner: [-670, 640], tavern: [-640, 640], hcot: [-610, 640] };
Object.assign(MRW_AT, {
edgware: { sc: "north", x: -660, z: 110, name: "Edgware" },
lane: { sc: "north", x: -560, z: 106, name: "the lane from Edgware" },
ncorner: { sc: "north", x: -440, z: 98, name: "the corner in the lane" },
camp: { sc: "north", x: -250, z: 40, name: "the encampment by the wayside" },
meet: { sc: "north", x: -30, z: 82, name: "where the lane meets the great road" },
gate: { sc: "north", x: -22, z: 94, name: "the gate of the corner house" },
trough: { sc: "north", x: -14, z: 62, name: "the water trough" },
great: { sc: "north", x: -4, z: -20, name: "the Great North Road" },
across: { sc: "north", x: 16, z: -120, name: "the far side of the great road" },
hadley: { sc: "north", x: 420, z: -214, name: "Hadley" },
nfield: { sc: "north", x: 566, z: -330, name: "the field beyond Hadley" },
barnet: { sc: "north", x: -140, z: -320, name: "Barnet" }
});
function mrwNoRooms(G) { return __ZC(504, 91, this, arguments, new.target); }
function mrwNorth(G) { return __ZC(504, 92, this, arguments, new.target); }
function mrwNoFolk(G) { return __ZC(504, 93, this, arguments, new.target); }
MRW_SCN.north = { start: { x: -660, z: 110, ry: -Math.PI / 2 }, h: mrwNoH,
build: function (G) { return __ZC(504, 94, this, arguments, new.target); } };
function mrwEnvNow() { return __ZC(504, 95, this, arguments, new.target); }
function mrwBlockL(x, z, feet) { return __ZC(504, 96, this, arguments, new.target); }
function mrwPlaceName(L) {
if (mrwInRoom()) {
var R = mrwRoomAt(L.x, L.z);
if (R)
return R.name;
}
var best = null, bd = 1e9;
for (var k in MRW_AT) {
var A = MRW_AT[k];
if (A.sc !== MRW.sc)
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A;
}
}
return best && bd < 70 ? best.name : mrwSc().name;
}
function mrwTick(dt) { return __ZC(504, 97, this, arguments, new.target); }
function mrwBuild(G) { MRW.G = G; MRW.lite = mrwLite(); MRW.built = true; }
if (typeof worldDef === "function")
worldDef(MRW_KEY, {
base: MRW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return mrwEnvNow(); },
build: function (G) { mrwBuild(G); },
enter: function (opt) { return __ZC(504, 98, this, arguments, new.target); },
leave: function () { MRW.ride = null; MRW.moving = false; if (MRW.veil)
MRW.veil.style.opacity = "0"; if (typeof mrbLeave === "function")
try {
mrbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = mrwSc(); MRW.inRm = mrwInRoom(); return mrwGround(x - S.x, z, feet); },
block: function (x, z, feet) { var S = mrwSc(); MRW.inRm = mrwInRoom(); return mrwBlockL(x - S.x, z, feet); },
tick: function (dt) { mrwTick(dt); },
back: function () { var D = MRW_SCN[MRW.sc]; mrwGo(D && D.start ? { sc: MRW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "obs"); }
});
function mrwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(MRW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(MRW_KEY) < 0)
WLG.keys.push(MRW_KEY);
function mrwForget() { return __ZC(504, 99, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === MRW_KEY)
mrwForget(); return r; }; })();
function mrwSnowfall(P, n, sp) { return __ZC(504, 100, this, arguments, new.target); }
var MRW_SE = { vil: [0, 420], beach: [40, 10], boat: [30, -6], steam: [80, -150], tc: [-260, -360], m1: [520, -60] };
function mrwSeH(x, z) { return __ZC(504, 101, this, arguments, new.target); }
function mrwSeWl(x, z) { return z < -2 ? 0 : null; }
var MRW_SE_ROADS = { main: [[0, 700], [0, 420], [20, 260], [30, 120], [40, 40]], vil: [[-140, 420], [160, 420]], coast: [[-600, 50], [600, 40]] };
MRW_ROOMXZ.sea = { tinn: [-700, 640], tch: [-670, 640], cabin: [-640, 640] };
Object.assign(MRW_AT, {
tillingham: { sc: "sea", x: 0, z: 426, name: "Tillingham" },
tchurch: { sc: "sea", x: -60, z: 380, name: "Tillingham church" },
marsh: { sc: "sea", x: 30, z: 120, name: "the road over the marshes" },
shore: { sc: "sea", x: 40, z: 12, name: "the shingle beach" },
water: { sc: "sea", x: 34, z: -1, name: "the water's edge" },
deck: { sc: "sea", x: 80, z: -146, y: 3.2, name: "the deck of the paddle-steamer" },
bow: { sc: "sea", x: 80, z: -160, y: 3.2, name: "the bows of the steamer" },
stern: { sc: "sea", x: 80, z: -134, y: 3.2, name: "the stern of the steamer" }
});
function mrwSteamer(P, x, z, ry) { return __ZC(504, 102, this, arguments, new.target); }
function mrwIronclad(P, x, z, ry, o) { return __ZC(504, 103, this, arguments, new.target); }
function mrwShipping(P) { return __ZC(504, 104, this, arguments, new.target); }
function mrwSeaRooms(G) { return __ZC(504, 105, this, arguments, new.target); }
function mrwSea(G) { return __ZC(504, 106, this, arguments, new.target); }
function mrwSeaFolk(G) { return __ZC(504, 107, this, arguments, new.target); }
function mrwSeaLive(st) { var T = MRW.seTC; if (T && st.tcCharge && !st.tcSunk) {
T.userData.sp = 9;
} }
MRW_SCN.sea = { start: { x: 0, z: 440, ry: 0 }, h: mrwSeH, wl: mrwSeWl,
build: function (G) { return __ZC(504, 108, this, arguments, new.target); } };
var MRW_SH = { pit: [0, -60], sc: [0, -4], road: 0, putney: [620, -300], arty: [640, -330], bridge: [660, -720], river: -740, kew: [-760, 40] };
function mrwShH(x, z) { return __ZC(504, 109, this, arguments, new.target); }
function mrwShWl(x, z) { return Math.abs(z - MRW_SH.river - 14 * Math.sin(x / 200)) < 44 ? 0 : null; }
var MRW_SH_ROADS = {
kew: [[-860, 40], [-600, 30], [-400, 20], [-200, 14], [-60, 14], [60, 14], [200, 0], [400, -120], [560, -260], [620, -300]],
mort: [[60, 14], [120, -120], [160, -300], [200, -560], [220, -700]],
putney: [[620, -300], [640, -460], [660, -600], [660, -760], [660, -860]],
wimb: [[620, -300], [700, -100], [760, 200], [800, 500]],
sheen: [[-300, 20], [-300, -200], [-280, -420]]
};
MRW_ROOMXZ.sheen = { villa: [-700, 700], kitchen: [-670, 700], cellar: [-640, 700], arty: [-610, 700], arcell: [-580, 700], pub: [-550, 700] };
Object.assign(MRW_AT, {
kew: { sc: "sheen", x: -760, z: 40, name: "the road from Kew" },
sheen: { sc: "sheen", x: -300, z: 20, name: "Sheen" },
white: { sc: "sheen", x: 20, z: 20, name: "the white house within a wall" },
scull: { sc: "sheen", x: 0, z: -2, name: "the scullery" },
slit: { sc: "sheen", x: 0, z: -8.6, name: "the slit in the scullery wall" },
coal: { sc: "sheen", x: -3.4, z: 1.6, name: "the coal-cellar door" },
pitrim2: { sc: "sheen", x: -30, z: -14, name: "the lip of the great pit" },
pitfloor: { sc: "sheen", x: -14, z: -56, name: "the floor of the pit" },
weed: { sc: "sheen", x: 180, z: -40, name: "the red weed" },
mortlake: { sc: "sheen", x: 160, z: -300, name: "the road towards Mortlake" },
putneyhill: { sc: "sheen", x: 620, z: -300, name: "Putney Hill" },
artyh: { sc: "sheen", x: 640, z: -320, name: "the artilleryman's house" },
roof: { sc: "sheen", x: 648, z: -336, y: 0, name: "the roof of the house on Putney Hill" },
drain: { sc: "sheen", x: 652, z: -344, name: "the drain he was digging" },
pbridge: { sc: "sheen", x: 660, z: -700, name: "Putney Bridge" },
fulham: { sc: "sheen", x: 660, z: -820, name: "the road over the bridge to Fulham" }
});
function mrwShScullery(G) { return __ZC(504, 110, this, arguments, new.target); }
function mrwShRooms(G) { return __ZC(504, 111, this, arguments, new.target); }
function mrwSheen(G) { return __ZC(504, 112, this, arguments, new.target); }
function mrwShFolk(G) { return __ZC(504, 113, this, arguments, new.target); }
MRW_SCN.sheen = { start: { x: -760, z: 40, ry: -Math.PI / 2 }, h: mrwShH, wl: mrwShWl,
build: function (G) { return __ZC(504, 114, this, arguments, new.target); } };
var MRW_PR = { top: [0, -30], pit: [20, -60], canal: 300, park: [0, 600], sjw: [-620, 120] };
function mrwPrH(x, z) { return __ZC(504, 115, this, arguments, new.target); }
function mrwPrWl(x, z) { return Math.abs(z - MRW_PR.canal - 20 * Math.sin(x / 220)) < 6 ? -0.4 : null; }
var MRW_PR_ROADS = {
rpr: [[-760, 240], [-400, 250], [-100, 260], [200, 250], [500, 230], [760, 220]],
sjw: [[-760, 80], [-620, 120], [-480, 180], [-400, 250]],
hill: [[-100, 256], [-60, 160], [-30, 60], [0, -10]],
park: [[0, 320], [0, 500], [0, 760]],
wel: [[-620, 120], [-640, -200], [-660, -500]]
};
MRW_ROOMXZ.primrose = { kind: [-700, 640], kbed: [-670, 640], cab: [-640, 640] };
Object.assign(MRW_AT, {
prfoot: { sc: "primrose", x: -100, z: 250, name: "the foot of Primrose Hill" },
prpath: { sc: "primrose", x: -40, z: 90, name: "the path up the hill" },
prtop: { sc: "primrose", x: -8, z: -6, name: "the top of Primrose Hill" },
redoubt: { sc: "primrose", x: -14, z: -24, name: "the Martians' great pit" },
prpit: { sc: "primrose", x: 12, z: -48, name: "the floor of the great pit" },
prview: { sc: "primrose", x: 30, z: 10, name: "the brow of the hill, looking over London" },
rpark: { sc: "primrose", x: 0, z: 520, name: "Regent's Park" },
canal2: { sc: "primrose", x: -200, z: 286, name: "the Regent's Canal" },
sjw: { sc: "primrose", x: -620, z: 120, name: "St. John's Wood" },
kindh: { sc: "primrose", x: -600, z: 144, name: "the house of the kind people" }
});
function mrwPrRooms(G) { return __ZC(504, 116, this, arguments, new.target); }
function mrwPrSkyline(G) { return __ZC(504, 117, this, arguments, new.target); }
function mrwPrimrose(G) { return __ZC(504, 118, this, arguments, new.target); }
MRW_SCN.primrose = { start: { x: -400, z: 250, ry: -Math.PI / 2 }, h: mrwPrH, wl: mrwPrWl,
build: function (G) { return __ZC(504, 119, this, arguments, new.target); } };
var MRB_CH = [];
var MRB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var MRB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function mrbS() { if (!store.mrbook)
store.mrbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.mrbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function mrbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function mrbStep() { var S = mrbS(), C = MRB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function mrbActive() { var S = mrbS(); return !!(S.started && !S.done && WLD.on === MRW_KEY); }
function mrbKey() { var S = mrbS(); return S.done ? "done" : S.ch + "." + S.s; }
function mrbSay(h) { setStatus(h); }
function mrbQ(s) { return mrQ(s); }
function mrbQs() { return mrQs.apply(null, arguments); }
function mrbPos(at) { return __ZC(504, 120, this, arguments, new.target); }
function mrbScName(k) { return (MRW_SC[k] || {}).name || k; }
function mrbWay(P, L) { return __ZC(504, 121, this, arguments, new.target); }
function mrbBeam() { return __ZC(504, 122, this, arguments, new.target); }
function mrbItemMesh(kind) { return __ZC(504, 123, this, arguments, new.target); }
function mrbItemsClear() { MRB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = MRW.spots.indexOf(I.S); if (j >= 0)
MRW.spots.splice(j, 1); }); MRB.items = []; }
function mrbItemAdd(kind, P, name, verb, onTake) { return __ZC(504, 124, this, arguments, new.target); }
var MRB_TUNES = { home: "assets/westminster/baker-street-air.mp3", lake: "assets/verne/moonlight.mp3", study: "assets/verne/toccata.mp3", dread: "assets/poe/funeral.mp3", night: "assets/erebos/gymnopedie.mp3", ice: "assets/verne/hebrides.mp3", cottage: "assets/neverland/morning-mood.mp3", chase: "assets/neverland/mountain-king.mp3", end: "assets/erebos/gymnopedie.mp3", grief: "assets/poe/funeral.mp3" };
function mrbTune(k) { return __ZC(504, 125, this, arguments, new.target); }
function mrbText(fn) { return __ZC(504, 126, this, arguments, new.target); }
function mrbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function mrbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var MRB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>H. G. Wells's own words (1898).</div>";
function mrbReadAll(i) { return __ZC(504, 127, this, arguments, new.target); }
function mrbChapterCard() { return __ZC(504, 128, this, arguments, new.target); }
function mrbKeeperBtns(fns) { return __ZC(504, 129, this, arguments, new.target); }
function mrbJump(i) { var S = mrbS(); S.ch = Math.max(0, Math.min(MRB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; mrbSave(); mrbChapterBegin(true); }
function mrbStV(v) { return typeof v === "function" ? v(mrbS().s) : v; }
function mrbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function mrbWorldState() {
var S = mrbS(), C = MRB_CH[S.ch] || {}, st = C.state || {};
MRW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
MRW.envK = mrbStV(st.env) || null;
if (typeof mrwStateApply === "function")
try {
mrwStateApply(st, S.s);
}
catch (e) { }
worldEnv(mrwEnvNow());
}
function mrbChapterBegin(place) { return __ZC(504, 130, this, arguments, new.target); }
function mrbStepBegin() { return __ZC(504, 131, this, arguments, new.target); }
function mrbPuzzleCard(b) { return __ZC(504, 132, this, arguments, new.target); }
function mrbStepDone() { return __ZC(504, 133, this, arguments, new.target); }
function mrbFinish() { return __ZC(504, 134, this, arguments, new.target); }
function mrbCastName(c) { return c.name || (MRW_FOLK[c.k] || {}).name || c.k; }
function mrbCastLive(C) { return !!(C && C.g && C.g.parent); }
function mrbCastAdd(c) { return __ZC(504, 135, this, arguments, new.target); }
function mrbCastHide(key) { var C = MRB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); MRW.talk = MRW.talk.filter(function (T) { return T.p !== C.P; }); MRW.people = MRW.people.filter(function (p) { return p !== C.P; }); delete MRB.cast[key]; }
function mrbCastClear() { for (var k in MRB.cast)
mrbCastHide(k); MRB.cast = {}; }
function mrbCastMove(key, at, ry) { var C = MRB.cast[key]; if (!C)
return; var P = mrbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : mrwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function mrbCastTick() { return __ZC(504, 136, this, arguments, new.target); }
function mrbPassTick() { return __ZC(504, 137, this, arguments, new.target); }
var MRB_FOLK_AT = {};
function mrbPopulate() { return __ZC(504, 138, this, arguments, new.target); }
function mrbCastHere(C) { return (C.cast || []).some(function (c) { var P = mrbPos(c.at); return P && P.sc === MRW.sc; }); }
function mrbChapterSc(C) { var P = C && C.start ? mrbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function mrbSceneDrop() { MRB.beam = null; MRB.items = []; MRB.cast = {}; }
function mrbHeard(kind) { MRB.rew[kind] = (MRB.rew[kind] || 0) + 1; }
function mrbNote(kind, title) { mrbHeard(kind); if (title)
mrbHeard("tale:" + title); }
function mrbTalk(T) { return __ZC(504, 139, this, arguments, new.target); }
function mrbSpot(S) { if (!mrbActive() || S.mrb)
return; var b = mrbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = mrbKey(); setTimeout(function () { if (mrbKey() === k)
mrbStepDone(); }, b.wait || 400); }
function mrbIdlePrompt() { worldPrompt("🛸 <b>The War of the Worlds</b> · <b>press E</b> for the book", mrbOpen); }
function mrbTick(dt, L) { return __ZC(504, 140, this, arguments, new.target); }
function mrbOpen() { return __ZC(504, 141, this, arguments, new.target); }
function mrbBegin() { var S = mrbS(); S.started = 1; mrbSave(); if (WLD.on !== MRW_KEY) {
mrwEnter({});
return;
} mrbChapterBegin(true); }
function mrbStartAt() { var S = mrbS(); if (S.started && !S.done) {
var C = MRB_CH[S.ch], P = C && C.start ? mrbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function mrbEnter(opt) { var S = mrbS(); setTimeout(function () { if (WLD.on !== MRW_KEY)
return; if (S.started && !S.done)
mrbChapterBegin(false);
else {
mrbWorldState();
mrbPopulate();
if (!S.started)
mrbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function mrbLeave() { mrbTune(null); mrbItemsClear(); MRB.cast = {}; MRB.beam = null; MRW.bannerBook = false; }
function mzGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function mzTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function mzSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function mzRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function mzFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function mzGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function mzHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function mzUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function mzPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function mzRead(title, html, btn, o) { return mzPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function mzReadA(title, adult, young, btn, o) { var r = mzRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = mrbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function mzMove(at, msg) { return function () { mrwGo(at, msg || null, mrbPopulate); }; }
function mrbNum(i) { return i < 17 ? "Book One, " + (i + 1) : "Book Two, " + (i - 16); }
function mrbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function mrbCh(C) { return __ZC(504, 142, this, arguments, new.target); }
function mrbStepAt(id) { var C = MRB_CH[mrbS().ch]; return C ? mrbS().s >= mrbIdx(C, id) : false; }
function mzId(id, step) { step.id = id; return step; }
var MRW_LIVEK = ["ray", "thray", "steaming", "tcCharge"];
function mrwStateApply(st, s) { return __ZC(504, 143, this, arguments, new.target); }
function mrwRebuild() { var k = MRW.scBuilt; if (!k)
return; var L = mrwLocalSc(), y = camera.position.y; MRW.scBuilt = null; mrwScene(k); var S = mrwSc(); camera.position.set(MRW.base + S.x + L.x, y, L.z); }
function mrwLiveState() { if (MRW.live)
try {
MRW.live(MRW.st);
}
catch (e) { } }
(function () { var s0 = mrwScene; mrwScene = function (k) { var was = MRW.scBuilt; s0.apply(this, arguments); if (was !== MRW.scBuilt && typeof mrbWorldState === "function" && !MRW.rebuilding)
try {
mrbWorldState();
}
catch (e) { } }; })();
function mrc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
function mrBk(ch) { return ch <= 17 ? "Book One, Chapter " + ch : "Book Two, Chapter " + (ch - 17); }
function mrW(x, z, y) { return { sc: "woking", x: x, z: z, y: y }; }
function mrT(x, z, y) { return { sc: "thames", x: x, z: z, y: y }; }
function mrN(x, z, y) { return { sc: "north", x: x, z: z, y: y }; }
function mrSe(x, z, y) { return { sc: "sea", x: x, z: z, y: y }; }
function mrSh(x, z, y) { return { sc: "sheen", x: x, z: z, y: y }; }
function mrP(x, z, y) { return { sc: "primrose", x: x, z: z, y: y }; }
function mzTravel(title, html, at, msg, btn, o) { return mzRead(title, html, btn || "▶ Go", Object.assign({ done: function () { var A = typeof at === "function" ? at() : at; if (A && typeof at === "function" && A.ry == null)
A.ry = Math.PI; mrwGo(A, msg || null, function () { mrbPopulate(); mrbStepBegin(); }); } }, o || {})); }
function mzSay(who, h, title, lines, src, o) { return mzTalk(who, h, [title, mrbQs.apply(null, lines) + mrSrc(src), "▶ Go on"], o); }
function mrwCalm(st, keys) { st = st || {}; for (var i = 0; i < keys.length; i++)
if (st[keys[i]])
return false; return true; }
mrbCh({ t: "The Eve of the War", txt: 0, start: { sc: "woking", x: 60, z: -660, ry: Math.PI }, jump: 1, tune: "night", keep: ["eve", "The flash upon Mars", "🔭"],
state: { env: "night", night: true, cyl: "none" },
words: "Six years ago, as Mars came near, an astronomer in Java saw a huge outbreak of gas on the planet. Your friend Ogilvy has asked you to watch with him tonight at his observatory at Ottershaw.",
intro: "Ottershaw, at night",
cast: [mrc("ogilvy", mrwIn("woking", "obs", -1.2, 0.8), { ry: Math.PI * 0.8, until: "home" }), mrc("wife", mrW(392, 10), { from: "home", ry: Math.PI })],
steps: [
{ k: "read" },
mzRead("🌍 Watched", mrbQs("No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man's and yet as mortal as his own;") + mrSrc(mrBk(1)), "▶ Go on"),
mzGo("obs", "Go up to Ogilvy's observatory on its rise at Ottershaw", { r: 6 }),
mzGo(mrwIn("woking", "obs", 0, 2.6), "Go in, under the dome", { r: 2.5 }),
mzTalk("Ogilvy", "Ogilvy, at the great telescope", ["🔭 Ogilvy", "\"Come and look. There she is: Mars, a little round disc. I've been watching her every night since the news from Java. The wires have been full of it: a huge outbreak of incandescent gas.\"" + mrSrc(mrBk(1)), "▶ Look"]),
mzHold(mrwIn("woking", "obs", 0, -0.2), 12, "Watch Mars through the eyepiece while the clockwork ticks", { r: 2.2 }),
mzRead("🌑 The vigil", mrbQs("In spite of all that has happened since, I still remember that vigil very distinctly: the black and silent observatory, the shadowed lantern throwing a feeble glow upon the floor in the corner, the steady ticking of the clockwork of the telescope, the little slit in the roof--an oblong profundity with the stardust streaked across it.") + mrSrc(mrBk(1)), "▶ Go on"),
mzPuzzle("📏 How far", "How far away from you is Mars tonight?", ["Four thousand miles", "Forty millions of miles, and more", "As far as the sun"], 1, ["Much further.", "", "Not so far."], { yes: "📏 " + mrbQ("Forty millions of miles it was from us--more than forty millions of miles of void.") }),
mzHold(mrwIn("woking", "obs", 0, -0.2), 14, "Keep watching, as the chronometer comes round to midnight", { r: 2.2 }),
mzRead("🔥 A reddish flash", mrbQs("That night, too, there was another jetting out of gas from the distant planet. I saw it. A reddish flash at the edge, the slightest projection of the outline just as the chronometer struck midnight; and at that I told Ogilvy and he took my place.") + mrSrc(mrBk(1)), "▶ Go on"),
mzTalk("Ogilvy", "Ogilvy, at the eyepiece", ["🌌 A million to one", mrbQs("\"The chances against anything manlike on Mars are a million to one,\" he said.") + mrSrc(mrBk(1)), "▶ Go on"]),
mzPuzzle("💭 What is it?", "What does Ogilvy think the flashes are?", ["Signals from people on Mars", "Meteorites falling in a shower on Mars, or a huge volcano", "A fault in his telescope"], 1, ["He scoffs at that.", "", "His telescope is sound."], { yes: "💭 He scoffs at the idea of Martians signalling. But that night another missile starts on its way to the earth." }),
mzGather("note", mrwIn("woking", "obs", -3, 2), 3, "A page of notes", "Copy the night's observations into Ogilvy's book: the time, the flash, the place on the disc", { spread: 1.2 }),
mzGo("ott", "Walk home down the road from Ottershaw, past midnight", { r: 12 }),
mzGo("common", "Cross the edge of Horsell Common in the starlight", { r: 20 }),
mzGo("bridge", "Over Horsell bridge and the canal", { r: 10 }),
mzId("home", mzGo("home", "Up the Maybury road to your house on Maybury Hill", { r: 8 })),
mzTalk("My wife", "Your wife, in the garden", ["✨ The Signs of the Zodiac", "Some nights later you walk out with her under the stars. " + mrbQs("It was starlight and I explained the Signs of the Zodiac to her, and pointed out Mars, a bright dot of light creeping zenithward, towards which so many telescopes were pointed.") + mrSrc(mrBk(1)), "▶ Go on"]),
mzPuzzle("🔴 Which is Mars?", "Which light in the sky is Mars?", ["The steady white one low in the east", "A bright dot of light, reddish, creeping up the sky", "The great bright star overhead"], 1, ["That is Venus.", "", "That is Vega."], { yes: "🔴 It was a warm night. Coming home, a party of excursionists from Chertsey passed, singing and playing music." }),
mzHold("garden", 10, "Stand a while in your garden, under the stars, with your wife", { r: 12 }),
mzRead("🌠 A million to one", mrbQs("Hundreds of observers saw the flame that night and the night after about midnight, and again the night after; and so for ten nights, a flame each night.") + mrSrc(mrBk(1)), "▶ To the next chapter")
] });
mrbCh({ t: "The Falling Star", txt: 1, start: { sc: "woking", x: 60, z: -640, ry: Math.PI }, jump: 1, tune: "study", keep: ["star", "The Thing in the sand pit", "☄️"],
state: { env: function (s) { return s < 3 ? "dawn" : "heath"; }, cyl: "buried" },
words: "Then came the night of the first falling star. Ogilvy saw it, and before dawn he is out on the common to find the meteorite. You are Ogilvy, this morning.",
intro: "Dawn, on Horsell Common",
cast: [mrc("henderson", mrW(-120, 60), { ry: Math.PI / 2, until: "back" })],
steps: [
{ k: "read" },
mzRead("☄️ The first falling star", mrbQs("Then came the night of the first falling star. It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosphere.") + mrSrc(mrBk(2)), "▶ Go on"),
mzGo("ott", "Walk down from the observatory towards the common, at first light", { r: 12 }),
mzGo("common", "Search the common between Horsell, Ottershaw and Woking", { r: 24 }),
mzGather("wood", mrW(-200, -280), 5, "A shivered splinter of fir", "Follow the splinters of a fir tree, shattered in the fall", { spread: 22 }),
mzGo("pitrim", "Come to the edge of the great hole in the sand", { r: 6 }),
mzRead("🕳️ The Thing", mrbQs("The Thing itself lay almost entirely buried in sand, amidst the scattered splinters of a fir tree it had shivered to fragments in its descent.") + mrSrc(mrBk(2)), "▶ Go on"),
mzHold("pitrim", 10, "Stand at the edge of the pit and stare at its strange shape and colour", { r: 8 }),
mzPuzzle("🌡️ Hot", "The ashy crust is falling from the end in flakes. Why can you not go down and touch it?", ["It is too cold", "The heat of it is excessive", "It is buzzing"], 1, ["It is very hot.", "", "Not buzzing: something else."], { yes: "🌡️ A large piece suddenly came off and fell with a sharp noise." }),
mzHold("pitrim", 12, "Watch the end of the cylinder, very closely", { r: 8 }),
mzRead("🔩 Rotating", mrbQs("And then he perceived that, very slowly, the circular top of the cylinder was rotating on its body.") + mrSrc(mrBk(2)), "▶ Go on"),
mzPuzzle("❗ What does it mean?", "A black mark has moved round the end. A grating sound comes from inside. What does Ogilvy cry out?", ["\"A meteorite! A fine one!\"", "\"There's a man in it--men in it! Half roasted to death! Trying to escape!\"", "\"Fire!\""], 1, ["Not now.", "", "No."], { yes: "❗ At once, with a quick mental leap, he linked the Thing with the flash upon Mars." }),
mzGo("bridge", "Run for help, towards Woking: over Horsell bridge", { r: 10 }),
mzGo(mrW(-110, 60), "Find Henderson, the London journalist, in his garden near the station", { r: 10 }),
mzSay("Henderson", "Henderson, with his spade", "📰 Henderson", ["\"Henderson,\" he called, \"you saw that shooting star last night?\"", "\"Well?\" said Henderson.", "\"It's out on Horsell Common now.\"", "\"Good Lord!\" said Henderson. \"Fallen meteorite! That's good.\"", "\"But it's something more than a meteorite. It's a cylinder--an artificial cylinder, man! And there's something inside.\""], mrBk(2)),
mzGo("pitrim", "Hurry back to the common together", { r: 8 }),
mzPuzzle("🪵 Knock", "How do you try to reach the men inside?", ["Prise it open with Henderson's spade", "Rap on the scaly burnt metal with a stick, and listen", "Light a fire under it"], 1, ["It is far too hot to touch.", "", "No!"], { yes: "🪵 " + mrbQ("They listened, rapped on the scaly burnt metal with a stick, and, meeting with no response, they both concluded the man or men inside must be insensible or dead.") }),
mzGo("station", "Go back into the town to raise help: the station and the telegraph", { r: 12 }),
mzId("back", mzGo(mrwIn("woking", "news", 0, 1), "Into the newsagent's, where the news is already going round", { r: 2.5 })),
mzFind("paper", mrwIn("woking", "news", -0.6, -1.4), "The early news", "Pick up the first word of it, a scrawled bill: DEAD MEN FROM MARS", {}),
mzRead("📣 Dead men from Mars", mrbQs("By eight o'clock a number of boys and unemployed men had already started for the common to see the \"dead men from Mars.\" That was the form the story took.") + mrSrc(mrBk(2)), "▶ To the next chapter")
] });
mrbCh({ t: "On Horsell Common", txt: 2, start: { sc: "woking", x: 400, z: 50, ry: Math.PI }, jump: 1, tune: "home", keep: ["common", "The cylinder, uncovered", "⛏️"],
state: { env: "heath", cyl: "buried", crowd: true },
words: "You heard of it first from your newspaper boy at a quarter to nine. You go out at once, and walk down to the common.",
intro: "Maybury Hill, morning",
cast: [mrc("ogilvy", mrW(-210, -318), { ry: Math.PI * 0.3, from: "pit2" }), mrc("henderson", mrW(-226, -322), { ry: 0.4, from: "pit2" }), mrc("stent", mrW(-216, -326), { ry: -0.2, from: "pit2" })],
steps: [
{ k: "read" },
mzGo("maybury", "Walk down the Maybury road", { r: 12 }),
mzGo("arch", "Under the railway arch at Maybury", { r: 10 }),
mzGo("bridge", "Over Horsell bridge", { r: 10 }),
mzGo("pitrim", "To the crowd round the pit", { r: 10 }),
mzRead("👥 The crowd", mrbQs("I found a little crowd of perhaps twenty people surrounding the huge hole in which the cylinder lay.") + mrSrc(mrBk(3)), "▶ Go on"),
mzPuzzle("🪨 The boys", "Some boys are throwing stones at the giant mass. What do you do?", ["Throw one too", "Stop them", "Run home"], 1, ["No!", "", "No."], { yes: "🪨 " + mrbQ("After I had spoken to them about it, they began playing at \"touch\" in and out of the group of bystanders.") }),
mzHold("pitrim", 10, "Look closely at the cylinder: the dull grey of the metal under the crust, the thin line of the lid", { r: 8 }),
mzPuzzle("🔍 Its strangeness", "What strikes you, close to, as truly strange?", ["Its great size", "The yellowish-white metal under the crust, and the strange colour", "That it is red"], 1, ["Not chiefly.", "", "It is not."], { yes: "🔍 You think it must have come from Mars, but that there is nothing living in it. The unscrewing may be automatic." }),
mzGo("town", "Go home to work, and in the afternoon back down to the town for the evening papers", { r: 12 }),
mzFind("paper", mrW(30, 70), "An evening paper", "Buy an evening paper by the station", {}),
mzRead("📰 A message received from Mars", mrbQs("\"A MESSAGE RECEIVED FROM MARS.\"", "\"REMARKABLE STORY FROM WOKING,\"") + mrSrc(mrBk(3)), "▶ Go on"),
mzGo("pitfar", "Out to the common again: flies from the station, a basket-chaise from Chobham, a heap of bicycles", { r: 16 }),
mzId("pit2", mzGo("pitrim", "Push to the edge of the pit", { r: 8 })),
mzTalk("Ogilvy", "Ogilvy, down in the pit with the workmen", ["⛏️ Lord Hilton", "\"Come down! Would you mind going to see Lord Hilton, the lord of the manor? The crowd's a serious hindrance to the digging, especially the boys. We want a light railing put up. There's still a faint stirring inside the case.\"" + mrSrc(mrBk(3)), "▶ I'll go"]),
mzTalk("Stent, the Astronomer Royal", "Stent, tall and fair-haired, directing the spades", ["🔭 Stent", "\"Keep back, if you please. The thing is still very hot. The lid has not moved since the morning; it may be that there is some mechanism inside.\"" + mrSrc(mrBk(3)), "▶ Go on"]),
mzGather("post", mrW(-180, -300), 6, "A stake for the railing", "Set stakes for a light railing round the pit, to keep the people back", { spread: 16 }),
mzGo("station", "Walk to the station: Lord Hilton is expected by the six o'clock train", { r: 12 }),
mzGo(mrwIn("woking", "booking", 0, 1), "Ask in the booking hall", { r: 3 }),
mzRead("🚂 Expected from London", mrbQs("I failed to find Lord Hilton at his house, but I was told he was expected from London by the six o'clock train from Waterloo;") + mrSrc(mrBk(3)), "▶ Go on"),
mzGo("home", "Go home to tea, and then down to the common again", { r: 8 })
] });
mrbCh({ t: "The Cylinder Opens", txt: 3, start: { sc: "woking", x: -150, z: -140, ry: Math.PI * 0.8 }, jump: 1, tune: "dread", keep: ["opens", "The first Martian", "🐙"],
state: { env: "evening", cyl: function (s) { return s < 9 ? "buried" : "open"; }, crowd: true },
words: "When you get back to the common the sun is setting. The crowd round the pit has grown; it stands out black against the lemon-yellow sky.",
intro: "Horsell Common, at sunset",
cast: [mrc("ogilvy", mrW(-200, -306), { ry: Math.PI * 0.3, until: "run" })],
steps: [
{ k: "read" },
mzRead("🌇 Keep back", mrbQs("When I returned to the common the sun was setting.", "\"Keep back! Keep back!\"") + mrSrc(mrBk(4)), "▶ Go on"),
mzTalk("A boy running away", "A boy, running past you", ["🏃 A-movin'", mrbQs("\"It's a-movin',\" he said to me as he passed; \"a-screwin' and a-screwin' out. I don't like it. I'm a-goin' 'ome, I am.\"") + mrSrc(mrBk(4)), "▶ Go on"], { at: mrW(-170, -220), pass: { dress: "boy", sex: "m", child: true, ry: Math.PI } }),
mzGo("pitfar", "On to the crowd: two or three hundred people, elbowing and jostling", { r: 12 }),
mzGo("pitrim", "Elbow your way through to the edge", { r: 7 }),
mzTalk("Ogilvy", "Ogilvy, angry", ["😠 Idiots", mrbQs("\"I say!\" said Ogilvy; \"help keep these idiots back. We don't know what's in the confounded thing, you know!\"") + mrSrc(mrBk(4)), "▶ Go on"]),
mzPuzzle("🧍 The shop assistant", "A young man has been pushed into the pit by the crowd, and stands on the cylinder. What do you do?", ["Push forward to see", "Help keep the crowd back so he can scramble out", "Laugh"], 1, ["They'll push you in too.", "", "No."], { yes: "🧍 Then the end of the cylinder is being screwed out from within. Nearly two feet of shining screw projects." }),
mzHold("pitrim", 12, "Watch the screw come out, turn by turn, with the humming sound in the pit", { r: 9 }),
mzRead("⭕ The lid falls", mrbQs("The end of the cylinder was being screwed out from within. Nearly two feet of shining screw projected.") + mrSrc(mrBk(4)), "▶ Look"),
mzRead("🐙 Something stirring", mrbQs("I think everyone expected to see a man emerge--possibly something a little unlike us terrestrial men, but in all essentials a man. I know I did.") + mrSrc(mrBk(4)), "▶ Go on"),
mzHold("pitrim", 10, "Keep your eyes on the shadow of the open end", { r: 9 }),
mzRead("👁️ It", mrbQs("A big greyish rounded bulk, the size, perhaps, of a bear, was rising slowly and painfully out of the cylinder. As it bulged up and caught the light, it glistened like wet leather.") + mrSrc(mrBk(4)), "▶ Go on"),
mzPuzzle("😨 Its face", "Which of these is NOT how Wells describes the Martian's face?", ["Two large dark-coloured eyes", "A lipless V-shaped mouth that quivered and slavered", "A long beard and a crown"], 2, ["He says just that.", "He says just that.", ""], { yes: "😨 " + mrbQ("Those who have never seen a living Martian can scarcely imagine the strange horror of its appearance.") }),
mzId("run", mzGo("pines", "Run! Make for the first group of trees, a hundred yards away", { r: 14 })),
mzHold("pines", 14, "Stop among the young pines and furze, panting, and watch the pit", { r: 16 }),
mzRead("🌲 Half-fascinated terror", mrbQs("There, among some young pine trees and furze bushes, I stopped, panting, and waited further developments.") + mrSrc(mrBk(4)), "▶ To the next chapter")
] });
mrbCh({ t: "The Heat-Ray", txt: 4, start: { sc: "woking", x: -120, z: -200, ry: Math.PI * 0.8 }, jump: 1, tune: "dread", keep: ["heatray", "The Heat-Ray", "🔥"],
state: { env: function (s) { return s < 8 ? "evening" : "night"; }, cyl: "open", pitray: function (s) { return s >= 8; }, ray: function (s) { return s >= 8 && s < 11; }, burnt: function (s) { return s >= 11; }, night: function (s) { return s >= 12; } },
words: "A kind of fascination holds you. You stand knee-deep in the heather, staring at the mound that hides them.",
intro: "In the heather",
cast: [],
steps: [
{ k: "read" },
mzRead("🌿 Knee-deep in the heather", mrbQs("After the glimpse I had had of the Martians emerging from the cylinder in which they had come to the earth from their planet, a kind of fascination paralysed my actions.") + mrSrc(mrBk(5)), "▶ Go on"),
mzGo(mrW(-150, -250), "Walk in a big curve, seeking a point of vantage", { r: 12 }),
mzTalk("A man near you", "A man beside you in the heather", ["😖 Ugly brutes", mrbQs("\"What ugly brutes!\" he said. \"Good God! What ugly brutes!\" He repeated this over and over again.") + mrSrc(mrBk(5)), "▶ Go on"], { at: mrW(-146, -246), pass: { dress: "worker", sex: "m", ry: Math.PI * 0.7 } }),
mzHold(mrW(-140, -240), 12, "Stand watching side by side as the sunset fades to twilight", { r: 10 }),
mzPuzzle("🏳️ The Deputation", "A little group goes towards the pit with a white flag on a pole. Why?", ["To surrender", "To show the Martians, by signals, that we too are intelligent", "To claim the cylinder"], 1, ["Not yet.", "", "No."], { yes: "🏳️ " + mrbQ("Flutter, flutter, went the flag, first to the right, then to the left.") }),
mzHold(mrW(-140, -240), 10, "Watch the flag go forward against the dark common", { r: 10 }),
mzRead("💚 Green smoke", mrbQs("Suddenly there was a flash of light, and a quantity of luminous greenish smoke came out of the pit in three distinct puffs, which drove up, one after the other, straight into the still air.") + mrSrc(mrBk(5)), "▶ Go on"),
mzRead("🔥 Flame", mrbQs("Forthwith flashes of actual flame, a bright glare leaping from one to another, sprang from the scattered group of men.") + mrSrc(mrBk(5)), "▶ Go on"),
mzHold(mrW(-140, -240), 10, "Stand: you cannot stir, as the invisible sword of heat sweeps round", { r: 12 }),
mzRead("🗡️ The sword of heat", mrbQs("It was sweeping round swiftly and steadily, this flaming death, this invisible, inevitable sword of heat.") + mrSrc(mrBk(5)), "▶ Go on"),
mzPuzzle("😱 Why are you alive?", "The Heat-Ray passed you by. Why?", ["You hid behind a tree", "It did not sweep through a full circle", "You lay down"], 1, ["You stood still.", "", "You stood still."], { yes: "😱 " + mrbQ("It came to me that I was upon this dark common, helpless, unprotected, and alone. Suddenly, like a thing falling upon me from without, came--fear.") }),
mzGo("pitfar", "Run! A stumbling run through the heather, towards Woking", { r: 16 }),
mzGo(mrW(-140, -140), "Keep running, weeping, through the dark", { r: 14 }),
mzRead("🌌 Played with", mrbQs("I remember I felt an extraordinary persuasion that I was being played with, that presently, when I was upon the very verge of safety, this mysterious death--as swift as the passage of light--would leap after me from the pit about the cylinder and strike me down.") + mrSrc(mrBk(5)), "▶ To the next chapter")
] });
mrbCh({ t: "The Heat-Ray in the Chobham Road", txt: 5, start: { sc: "woking", x: -300, z: -370, ry: Math.PI * 0.3 }, jump: 1, tune: "dread", keep: ["chobham", "The Chobham road", "🛣️"],
state: { env: "night", night: true, cyl: "open", burnt: true, pitray: true },
words: "While you ran, another crowd stood on the Chobham road, at the corner of the common: people who had walked out from Woking to see. Here is what happened to them, as you learned afterwards.",
intro: "The Chobham road, that night",
cast: [],
steps: [
{ k: "read" },
mzRead("❓ How they slay", mrbQs("It is still a matter of wonder how the Martians are able to slay men so swiftly and so silently.") + mrSrc(mrBk(6)), "▶ Go on"),
mzPuzzle("🪞 The Heat-Ray", "What does Wells think the Heat-Ray is?", ["A gun firing bullets of fire", "An intense heat, projected in a parallel beam by a polished parabolic mirror", "Lightning"], 1, ["No.", "", "No."], { yes: "🪞 Much as the mirror of a lighthouse projects a beam of light." }),
mzRead("🔥 Forty people", mrbQs("That night nearly forty people lay under the starlight about the pit, charred and distorted beyond recognition, and all night long the common from Horsell to Maybury was deserted and brightly ablaze.") + mrSrc(mrBk(6)), "▶ Go on"),
mzGo("chobham", "Go to the Chobham road, where the crowd stood", { r: 14 }),
mzGather("paper", mrW(-420, -420), 4, "A dropped hat or bill", "Find what the crowd dropped in the road as it fled: hats, a bill, a child's shoe", { spread: 24 }),
mzHold("chobham", 10, "Stand where they stood: the little knots of people peering at the spinning mirror over the sand pits", { r: 14 }),
mzPuzzle("⛰️ Saved", "What saved most of that crowd from the Heat-Ray?", ["They lay flat", "A hummock of heathery sand cut off the lower part of the ray", "The soldiers' shields"], 1, ["They did not.", "", "There were no soldiers yet."], { yes: "⛰️ " + mrbQ("Only the fact that a hummock of heathery sand intercepted the lower part of the Heat-Ray saved them.") }),
mzGo(mrW(-300, -360), "Follow the road the way they fled, towards Woking", { r: 14 }),
mzRead("🏃 They're coming", mrbQs("\"They're coming!\" a woman shrieked, and incontinently everyone was turning and pushing at those behind, in order to clear their way to Woking again.") + mrSrc(mrBk(6)), "▶ Go on"),
mzGo(mrW(-215, -300), "Where the Chobham road meets the way down to the town: the narrowest place, where the crush was worst", { r: 12 }),
mzPuzzle("🕯️ Trampled", "Two women and a little boy were crushed and trampled there. What does the book call the crowd's flight?", ["Brave", "As blind as a flock of sheep", "Orderly"], 1, ["Not that.", "", "Not that."], { yes: "🕯️ They were left to die amid the terror and the darkness." }),
mzHold(mrW(-215, -300), 8, "Stand a moment where they fell", { r: 10 }),
mzGo("bridge", "Go on, to Horsell bridge and the canal", { r: 10 }),
mzRead("🌙 Brightly ablaze", mrbQs("The news of the massacre probably reached Chobham, Woking, and Ottershaw about the same time.") + mrSrc(mrBk(6)), "▶ To the next chapter")
] });
mrbCh({ t: "How I Reached Home", txt: 6, start: { sc: "woking", x: -130, z: -90, ry: Math.PI * 0.8 }, jump: 1, tune: "home", keep: ["reached", "The last civilised dinner", "🍷"],
state: { env: "night", night: true, cyl: "open", burnt: true },
words: "You remember nothing of the flight but blundering against trees and stumbling through the heather. At last you fall by the wayside, near the bridge over the canal.",
intro: "By the canal bridge",
cast: [mrc("wife", mrwIn("woking", "dining", 0.8, -1.4), { ry: Math.PI })],
steps: [
{ k: "read" },
mzRead("😵 By the wayside", mrbQs("At last I could go no further; I was exhausted with the violence of my emotion and of my flight, and I staggered and fell by the wayside.") + mrSrc(mrBk(7)), "▶ Go on"),
mzHold(mrW(-122, -80), 10, "Lie by the bridge a while; then sit up, strangely perplexed", { r: 8 }),
mzGo("bridge", "Walk unsteadily up the steep incline of the bridge", { r: 8 }),
mzPuzzle("👤 A workman", "A man with a basket comes over the bridge in the dusk. What do you do?", ["Grab his arm and tell him everything", "Try to speak, but only turn your head and watch him pass", "Hide"], 1, ["You cannot find the words.", "", "No need."], { yes: "👤 He passes, a little boy runs by. Everything seems commonplace." }),
mzGo("arch", "Go on towards Maybury, under the arch", { r: 10 }),
mzHold("arch", 8, "Watch the train go over the Maybury arch: a long caterpillar of lighted windows, clatter, clatter, clap, rap", { r: 10 }),
mzGo(mrW(300, 46), "Up the Maybury road to a gate where two men and a woman stand talking", { r: 8 }),
mzSay("A woman over the gate", "The people at the gate", "🙄 They laugh", ["\"What news from the common?\" said I.", "\"'Ain't yer just been there?\" asked the men.", "\"People seem fair silly about the common,\" said the woman over the gate. \"What's it all abart?\"", "\"Haven't you heard of the men from Mars?\" said I; \"the creatures from Mars?\"", "\"Quite enough,\" said the woman over the gate. \"Thenks\"; and all three of them laughed."], mrBk(7), { at: mrW(300, 46), pass: { dress: "maid", sex: "f", ry: -Math.PI / 2 } }),
mzRead("😠 You'll hear more", mrbQs("\"You'll hear more yet,\" I said, and went on to my home.") + mrSrc(mrBk(7)), "▶ Go on"),
mzGo("home", "Home", { r: 5 }),
mzGo(mrwIn("woking", "dining", 0, 1.2), "Into the dining-room", { r: 2.5 }),
mzTalk("My wife", "Your wife", ["🍷 Wine", "You startle her at the doorway, so haggard are you. You sit, drink some wine, and tell her what you have seen. " + mrbQs("\"Don't, dear!\" said my wife, knitting her brows and putting her hand on mine.") + mrSrc(mrBk(7)), "▶ Go on"]),
mzPuzzle("🐌 Sluggish", "To calm her, what do you say about the Martians?", ["They will be here by morning", "They are the most sluggish things you ever saw crawl; they cannot get out of the pit", "They are friendly"], 1, ["Not that!", "", "You do not think so."], { yes: "🐌 " + mrbQ("\"They can scarcely move,\" I said.") }),
mzPuzzle("🌍 Gravity", "Which reason did Ogilvy give for why they cannot live here?", ["The earth's gravity: a Martian here weighs three times as much", "The rain", "Our food"], 0, ["", "No.", "No."], { yes: "🌍 You did not consider the oxygen of our air, nor that they might build machines." }),
mzHold(mrwIn("woking", "dining", -0.4, -0.2), 12, "Sit at the table, with the lamp and the wine, and make her smile again", { r: 2.4 }),
mzRead("🐦 The dodo", mrbQs("\"A shell in the pit\" said I, \"if the worst comes to the worst will kill them all.\"", "So some respectable dodo in the Mauritius might have lorded it in his nest, and discussed the arrival of that shipful of pitiless sailors in want of animal food.") + mrSrc(mrBk(7)), "▶ Go on"),
mzRead("🍽️ The last dinner", mrbQs("I did not know it, but that was the last civilised dinner I was to eat for very many strange and terrible days.") + mrSrc(mrBk(7)), "▶ To the next chapter")
] });
mrbCh({ t: "Friday Night", txt: 7, start: { sc: "woking", x: 20, z: 72, ry: Math.PI }, jump: 1, tune: "night", keep: ["friday", "The second star", "🌠"],
state: { env: "night", night: true, cyl: "open", burnt: true, soldiers: function (s) { return s >= 8; } },
words: "The strangest thing of all that Friday is how ordinary everything goes on. A few miles from the pit, people dine and sup; trains stop and go at Woking junction.",
intro: "Woking, Friday night",
cast: [],
steps: [
{ k: "read" },
mzRead("🕰️ The commonplace", mrbQs("The most extraordinary thing to my mind, of all the strange and wonderful things that happened upon that Friday, was the dovetailing of the commonplace habits of our social order with the first beginnings of the series of events that was to topple that social order headlong.") + mrSrc(mrBk(8)), "▶ Go on"),
mzGo("station", "Walk down to Woking junction", { r: 12 }),
mzGo(mrwIn("woking", "booking", 0, 1), "Into the booking hall", { r: 3 }),
mzRead("🚂 Most ordinary", mrbQs("In Woking junction, until a late hour, trains were stopping and going on, others were shunting on the sidings, passengers were alighting and waiting, and everything was proceeding in the most ordinary way.") + mrSrc(mrBk(8)), "▶ Go on"),
mzPuzzle("📰 The canard", "What did the London paper make of Henderson's telegram?", ["Printed it in huge type", "Judged it a canard, and printed nothing", "Sent a reporter"], 1, ["Not yet.", "", "Not that night."], { yes: "📰 Even within five miles, most people were inert." }),
mzGo(mrwIn("woking", "college", 0, 1), "Look into the College Arms, full of talk", { r: 3 }),
mzHold(mrwIn("woking", "college", 0, 0), 10, "Listen to the talk in the bar: a novel and dominant topic, and no one quite believes it", { r: 3 }),
mzGo("bridge", "Go out to Horsell bridge, where a curious crowd lingers", { r: 10 }),
mzRead("💉 A poisoned dart", mrbQs("So you have the state of things on Friday night. In the centre, sticking into the skin of our old planet Earth like a poisoned dart, was this cylinder.") + mrSrc(mrBk(8)), "▶ Go on"),
mzHold("bridge", 10, "Stand on the bridge in the dark and watch the puffs of greenish-white smoke whirl up from the common", { r: 10 }),
mzPuzzle("🎖️ The cordon", "About eleven, who comes through Horsell to form a cordon round the common?", ["A company of soldiers", "The fire brigade", "The Astronomer Royal"], 0, ["", "No.", "No."], { yes: "🎖️ " + mrbQ("Later a second company marched through Chobham to deploy on the north side of the common.") }),
mzGo("horsell", "Walk round by Horsell, where the soldiers are", { r: 14 }),
mzGather("post", mrW(-140, -110), 4, "A sentry's post", "Pass the sentries along the edge of the common", { spread: 30 }),
mzRead("🌠 The second star", mrbQs("A few seconds after midnight the crowd in the Chertsey road, Woking, saw a star fall from heaven into the pine woods to the northwest.") + mrSrc(mrBk(8)), "▶ Go on"),
mzPuzzle("🟢 Its colour", "What colour was the second falling star?", ["White", "Greenish", "Red"], 1, ["No.", "", "No."], { yes: "🟢 It caused a silent brightness like summer lightning. This was the second cylinder." }),
mzGo("home", "Walk home and go to bed, very late", { r: 6 })
] });
mrbCh({ t: "The Fighting Begins", txt: 8, start: { sc: "woking", x: 392, z: 10, ry: Math.PI }, jump: 1, tune: "home", keep: ["fighting", "The dog-cart", "🐎"],
state: { env: function (s) { return s < 14 ? "heath" : "evening"; }, cyl: "open", burnt: true, soldiers: true, crowd: false },
words: "Saturday lives in your memory as a day of suspense: hot and close. You slept little. In the morning the milkman comes as usual.",
intro: "Maybury Hill, Saturday",
cast: [mrc("wife", mrW(394, 6), { ry: Math.PI, until: "cart" }), mrc("landlord", mrwIn("woking", "spotted", 0.4, -1.4), { ry: Math.PI, until: "cart" })],
steps: [
{ k: "read" },
mzTalk("The milkman", "The milkman, at the side gate", ["🥛 Not to be killed", mrbQs("\"They aren't to be killed,\" said the milkman, \"if that can possibly be avoided.\"") + mrSrc(mrBk(9)), "▶ Go on"], { at: mrW(420, 40) }),
mzTalk("A neighbour at his gate", "Your neighbour, gardening", ["🍓 Strawberries", mrbQs("\"It's a pity they make themselves so unapproachable,\" he said. \"It would be curious to know how they live on another planet; we might learn a thing or two.\"") + "<p>He holds out a handful of strawberries over the fence.</p>" + mrSrc(mrBk(9)), "▶ Take them"], { at: mrW(330, 40) }),
mzFind("fruit", mrW(334, 36), "A handful of strawberries", "Take the strawberries he holds out", {}),
mzGo("arch", "After breakfast, walk down towards the common: under the railway bridge", { r: 10 }),
mzSay("A sapper", "The soldiers under the bridge: sappers in small round caps", "🪖 Octopuses", ["\"Crawl up under cover and rush 'em, say I,\" said one.", "\"Get aht!\" said another. \"What's cover against this 'ere 'eat? Sticks to cook yer! What we got to do is to go as near as the ground'll let us, and then drive a trench.\"", "\"Octopuses,\" said he, \"that's what I calls 'em. Talk about fishers of men--fighters of fish it is this time!\""], mrBk(9), { at: mrW(150, 96) }),
mzPuzzle("🎯 Their plan", "What does the little dark man with the pipe want to do?", ["Shell the things straight off and finish them", "Talk to them", "Run"], 0, ["", "No.", "No."], { yes: "🎯 \"Where's your shells?\" says the first. \"There ain't no time.\"" }),
mzGo("station", "Go on to the station for as many morning papers as you can get", { r: 12 }),
mzGather("paper", mrW(10, 80), 3, "A morning paper", "Buy the morning papers", { spread: 12 }),
mzGo("home", "Back home to lunch, about two: hot and dull", { r: 6 }),
mzHold("garden", 12, "About three, the thud of guns at measured intervals from Chertsey: sit in the summerhouse with your wife at tea", { r: 12 }),
mzRead("💥 Maybury Hill", mrbQs("About six in the evening, as I sat at tea with my wife in the summerhouse talking vigorously about the battle that was lowering upon us, I heard a muffled detonation from the common, and immediately after a gust of firing.") + mrSrc(mrBk(9)), "▶ Go on"),
mzPuzzle("🔥 In range", "The college towers have gone. What does this mean?", ["The Heat-Ray can reach the crest of Maybury Hill now", "The soldiers have won", "Nothing"], 0, ["", "No!", "Everything."], { yes: "🔥 You grip your wife's arm and run her out into the road." }),
mzTalk("My wife", "Your wife, in the road", ["🏃 Leatherhead", mrbQs("\"But where are we to go?\" said my wife in terror.", "\"Leatherhead!\" I shouted above the sudden noise.", "\"How are we to get to Leatherhead?\" she said.") + mrSrc(mrBk(9)), "▶ The Spotted Dog!"]),
mzGo("spotted", "Run down to the Spotted Dog: the landlord has a horse and dog-cart", { r: 8 }),
mzGo(mrwIn("woking", "spotted", 0, 1), "In to the landlord", { r: 3 }),
mzSay("The landlord of the Spotted Dog", "The landlord", "🐎 The dog-cart", ["\"I must have a pound,\" said the landlord, \"and I've no one to drive it.\"", "\"I'll give you two,\" said I, over the stranger's shoulder.", "\"And I'll bring it back by midnight,\" I said."], mrBk(9)),
mzId("cart", mzGo("dogcart", "Take the dog-cart out of the yard", { r: 6 })),
mzGather("load", mrW(398, 30), 3, "A bundle", "Load what you can into the cart: some silver, a box, a few things", { spread: 6 }),
mzRead("🌾 Away", mrbQs("In front was a quiet sunny landscape, a wheat field ahead on either side of the road, and the Maybury Inn with its swinging sign.") + mrSrc(mrBk(9)), "▶ Drive")
] });
mrbCh({ t: "In the Storm", txt: 9, start: { sc: "woking", x: 600, z: 360, ry: 0 }, jump: 1, tune: "chase", keep: ["storm", "The fighting-machines, in the lightning", "⚡"],
state: { env: function (s) { return s < 5 ? "evening" : "storm"; }, night: function (s) { return s >= 5; }, cyl: "open", burnt: true, tri: function (s) { return s >= 9 ? "storm" : "none"; } },
words: "Leatherhead is about twelve miles from Maybury Hill. The scent of hay is in the air, and the hedges are gay with dog-roses.",
intro: "The road to Leatherhead",
cast: [mrc("wife", mrwIn("woking", "cousin", 0.6, -1.2), { ry: Math.PI, until: "ret" }), mrc("cousin", mrwIn("woking", "cousin", -0.6, -1.0), { ry: Math.PI, until: "ret" })],
steps: [
{ k: "read" },
mzRead("🌹 Dog-roses", mrbQs("Leatherhead is about twelve miles from Maybury Hill.") + mrSrc(mrBk(10)), "▶ Go on"),
mzGo("leatherhead", "Drive on to Leatherhead", { r: 14 }),
mzGo(mrwIn("woking", "cousin", 0, 1.2), "Into your cousins' house", { r: 2.5 }),
mzTalk("My cousin at Leatherhead", "Your cousin", ["🏠 Stay", "\"Come in, come in. You'll both stay here, of course. Martians! At Woking!\" Your wife is pale and silent; she seems oppressed with forebodings of evil." + mrSrc(mrBk(10)), "▶ Go on"]),
mzPuzzle("🌙 Back", "Why must you go back tonight, about eleven?", ["To fight", "You promised to return the landlord's dog-cart by midnight", "To fetch the cat"], 1, ["No.", "", "No."], { yes: "🌙 Your wife's face is very white as you part. It is very dark." }),
mzId("ret", mzGo("learoad", "Drive back alone through the dark: the road to Woking", { r: 16 })),
mzRead("🟥 The red glare", mrbQs("It was nearly eleven when I started to return. The night was unexpectedly dark;") + mrSrc(mrBk(10)), "▶ Go on"),
mzGo(mrW(520, 180), "On, towards Maybury Hill, as the storm comes up", { r: 16 }),
mzRead("⚡ The first lightning", mrbQs("Close on its apparition, and blindingly violet by contrast, danced out the first lightning of the gathering storm, and the thunder burst like a rocket overhead.") + mrSrc(mrBk(10)), "▶ Hold on"),
mzRead("🗼 A monstrous tripod", mrbQs("And this Thing I saw! How can I describe it? A monstrous tripod, higher than many houses, striding over the young pine trees, and smashing them aside in its career;") + mrSrc(mrBk(10)), "▶ Go on"),
mzHold(mrW(500, 160), 10, "Hold the horse as the Thing strides past", { r: 16 }),
mzPuzzle("🐴 The horse", "A second tripod bursts out of the pine wood ahead. What happens?", ["You turn the cart and escape", "The horse wrenches round and the cart overturns into the ditch", "You fire at it"], 1, ["Too late.", "", "You have nothing to fire."], { yes: "🐴 " + mrbQ("The horse lay motionless (his neck was broken, poor brute!)") }),
mzHold(mrW(480, 150), 12, "Crouch in the ditch under a clump of furze, your feet in the water, and watch", { r: 12 }),
mzRead("🔊 Aloo! Aloo!", mrbQs("As it passed it set up an exultant deafening howl that drowned the thunder--\"Aloo! Aloo!\"--") + mrSrc(mrBk(10)), "▶ Go on"),
mzGo(mrW(440, 120), "Struggle up the bank and make for a little squatter's hut in a potato patch", { r: 12 }),
mzGo(mrW(380, 60), "Push on through the wood towards your own house, in the dark", { r: 14 }),
mzPuzzle("🕴️ In the road", "Near the top of the hill you stumble on something soft. What is it?", ["A sack", "A dead man, the landlord of the Spotted Dog", "A dog"], 1, ["No.", "", "No."], { yes: "🕴️ He had been flung down. His neck was broken. The horse and cart were his." }),
mzGo("college", "Up the hill by the police station and the College Arms", { r: 12 }),
mzGo("home", "Let yourself in with your latchkey, and bolt the door", { r: 5 }),
mzRead("🌧️ Shivering", mrbQs("I crouched at the foot of the staircase with my back to the wall, shivering violently.") + mrSrc(mrBk(10)), "▶ To the next chapter")
] });
mrbCh({ t: "At the Window", txt: 10, start: { sc: "woking", x: 400, z: 36, ry: Math.PI }, jump: 1, tune: "night", keep: ["window", "The artilleryman", "💣"],
state: { env: function (s) { return s < 14 ? "night" : "dawn"; }, night: function (s) { return s < 14; }, cyl: "open", burnt: true, tri: "far", noLandlord: true },
words: "Your storms of emotion exhaust themselves. You are cold and wet. You go upstairs to your study, and look out.",
intro: "Your house, in the night",
cast: [mrc("artyworn", mrW(386, -24), { ry: 0, from: "arty", until: "in" }), mrc("artyworn", mrwIn("woking", "dining", 0.6, -1.0), { ry: Math.PI, from: "in" })],
steps: [
{ k: "read" },
mzGo(mrwIn("woking", "study", 0, 1.2), "Go up to your study", { r: 2.5 }),
mzRead("🔥 The common ablaze", mrbQs("The thunderstorm had passed. The towers of the Oriental College and the pine trees about it had gone, and very far away, lit by a vivid red glare, the common about the sand pits was visible.") + mrSrc(mrBk(11)), "▶ Go on"),
mzHold(mrwIn("woking", "study", 0, -2.8), 14, "Stand at the window and look out over the burning country", { r: 2.2 }),
mzPuzzle("🤖 What are they?", "As you watch the black shapes moving, what do you ask yourself?", ["Whether a Martian sits inside each, directing it, as a man's brain sits in his body", "Whether they are made of wood", "Whether they are friendly"], 0, ["", "No.", "No."], { yes: "🤖 You begin to compare them to human machines: an ironclad, a steam engine." }),
mzRead("🔴 Mars dropping", mrbQs("The storm had left the sky clear, and over the smoke of the burning land the little fading pinpoint of Mars was dropping into the west, when a soldier came into my garden.") + mrSrc(mrBk(11)), "▶ Go on"),
mzId("arty", mzGo("garden", "Go down to the garden quietly", { r: 10 })),
mzSay("The artilleryman", "A soldier, astride your fence", "🤫 Hist", ["\"Hist!\" said I, in a whisper.", "\"Who's there?\" he said, also whispering, standing under the window and peering up.", "\"Where are you going?\" I asked.", "\"God knows.\"", "\"Are you trying to hide?\"", "\"That's it.\"", "\"Come into the house,\" I said."], mrBk(11)),
mzId("in", mzGo(mrwIn("woking", "dining", 0, 1.2), "Let him in, and go into the dining-room", { r: 2.5 })),
mzFind("bottle", mrwIn("woking", "dining", -3.2, 0), "The whiskey", "Find the whiskey on the sideboard", {}),
mzTalk("The artilleryman", "The artilleryman, at the table", ["😭 Wiped out", mrbQs("\"What hasn't?\" In the obscurity I could see he made a gesture of despair. \"They wiped us out--simply wiped us out,\" he repeated again and again.") + mrSrc(mrBk(11)), "▶ Go on"]),
mzTalk("The artilleryman", "The artilleryman, steadier", ["🐴 Under the horse", mrbQs("\"I lay still,\" he said, \"scared out of my wits, with the fore quarter of a horse atop of me. We'd been wiped out.") + "<p>He was a driver in the artillery. His gun was unlimbered near Horsell to command the sand pits; then the Thing rose up on its legs.</p>" + mrSrc(mrBk(11)), "▶ Go on"]),
mzGather("bread", mrwIn("woking", "dining", -1.6, -2.2), 3, "Some food", "Find food in the pantry for him: he has eaten nothing since midday", { spread: 1.6 }),
mzHold(mrwIn("woking", "dining", 0.2, 0), 10, "Sit with him in the dark while he eats, and hear the rest of it", { r: 2.5 }),
mzGo(mrwIn("woking", "study", 0, -2.6), "Go up with him to your study, and look out again as the dawn comes", { r: 2.4 }),
mzRead("🌫️ A valley of ashes", mrbQs("When we had finished eating we went softly upstairs to my study, and I looked again out of the open window. In one night the valley had become a valley of ashes.") + mrSrc(mrBk(11)), "▶ Go on"),
mzRead("🩸 Pillars of bloodshot smoke", mrbQs("Beyond were the pillars of fire about Chobham. They became pillars of bloodshot smoke at the first touch of day.") + mrSrc(mrBk(11)), "▶ To the next chapter")
] });
mrbCh({ t: "What I Saw of the Destruction of Weybridge and Shepperton", txt: 11, start: { sc: "woking", x: 400, z: 44, ry: -Math.PI / 2 }, jump: 1, tune: "chase", keep: ["shepperton", "The fall of a Martian", "💥"],
state: { env: "heath", cyl: "empty", burnt: true, tri: "far", noLandlord: true, thcrowd: true, thtown: function (s) { return s < 16; }, thtri: function (s) { return s >= 19 && s < 23 ? "come" : (s >= 23 ? "storm" : "none"); }, thdead: function (s) { return s >= 22 ? "steam" : null; }, thburnt: function (s) { return s >= 24; }, thray: function (s) { return s >= 23; } },
words: "As the dawn grows brighter you and the artilleryman creep downstairs. The house is no place to stay. He means to make his way Londonward and rejoin his battery; you mean to reach your wife at Leatherhead.",
intro: "Maybury Hill, dawn",
cast: [mrc("artyworn", mrW(404, 52), { ry: Math.PI, until: "wey" }), mrc("artyworn", mrT(-640, 376), { ry: -1, from: "wey", until: "conf" }), mrc("artyworn", mrT(-208, -92), { ry: Math.PI, from: "conf" })],
steps: [
{ k: "read" },
mzTalk("The artilleryman", "The artilleryman, at the door", ["🎒 A flask", "\"Not yet. Get a flask, and food. We'll go through the woods, not the road. I've been in active service and I know.\"" + mrSrc(mrBk(12)), "▶ Go on"]),
mzGather("bread", mrwIn("woking", "dining", -1.4, -2.2), 3, "Food for the road", "Ransack the house for food and a flask", { spread: 1.6 }),
mzGo("maybury", "Go down the lane in the early light", { r: 12 }),
mzGo("byfleet", "Break into the woods at the foot of the hill, and push through towards Byfleet", { r: 16 }),
mzSay("A lieutenant of hussars", "Three cavalry soldiers, riding slowly towards Woking", "🐎 The lieutenant", ["\"You are the first men I've seen coming this way this morning,\" said the lieutenant. \"What's brewing?\"", "\"What the dickens are they like?\" asked the lieutenant.", "\"Giants in armour, sir. Hundred feet high. Three legs and a body like 'luminium, with a mighty great head in a hood, sir.\"", "\"Get out!\" said the lieutenant. \"What confounded nonsense!\"", "\"It's perfectly true,\" I said."], mrBk(12), { at: mrW(-400, 380), pass: { dress: "mrhussar", sex: "m", ry: Math.PI * 0.75 } }),
mzPuzzle("🧭 Half a mile", "Which way is the lieutenant going?", ["Back to London", "South, to see the Martians for himself", "Into the river"], 1, ["No.", "", "No."], { yes: "🧭 " + mrbQ("He thanked me and rode on, and we saw them no more.") }),
mzTalk("A woman clearing a cottage", "Three women and two children, loading a hand-cart", ["🧺 The cottage", "They have got a little hand-cart and are piling it with unclean-looking bundles and shabby furniture. They are too busy to talk to you." + mrSrc(mrBk(12)), "▶ Go on"], { at: mrW(-460, 420), pass: { dress: "maid", sex: "f", ry: Math.PI / 2 } }),
mzId("wey", mzTravel("🌲 Byfleet station", "You come out of the pine trees by Byfleet station, into calm morning sunlight, and on along the road towards Weybridge.", { sc: "thames", x: -660, z: 390, ry: -1.0 }, "🛤️ <b>The road from Byfleet</b> to Weybridge.", "▶ Walk on")),
mzGo(mrT(-560, 320), "On towards Weybridge, past farm waggons creaking along to Addlestone", { r: 14 }),
mzRead("🔫 Guns", mrbQs("\"That's good!\" said I. \"They will get one fair shot, at any rate.\"") + "<p>Through a field gate you see six twelve-pounders standing well apart, the gunners waiting beside them.</p>" + mrSrc(mrBk(12)), "▶ Go on"),
mzGo("wbridge", "To the bridge over the Wey", { r: 10 }),
mzGo("rampart", "Look over the rampart: men in white fatigue jackets digging, and more guns", { r: 12 }),
mzTalk("The artilleryman", "The artilleryman, at the rampart", ["🏹 Bows and arrows", mrbQs("\"It's bows and arrows against the lightning, anyhow,\" said the artilleryman. \"They 'aven't seen that fire-beam yet.\"") + mrSrc(mrBk(12)), "▶ Go on"]),
mzGo("weybridge", "Into Weybridge: hussars hunting people out, carts being loaded", { r: 14 }),
mzTalk("A man with a perambulator full of clocks", "An old man with a dozen orchid pots, and a man with his clocks", ["💀 Death!", mrbQs("\"Do you know what's over there?\" I said, pointing at the pine tops that hid the Martians.", "\"Death!\" I shouted. \"Death is coming! Death!\"") + mrSrc(mrBk(12)), "▶ Go on"], { at: mrW(-400, 220) }),
mzGo(mrwIn("thames", "wshop", 0, 1), "Find an open shop; take what you can", { r: 2.5 }),
mzFind("bread", mrwIn("thames", "wshop", -1, -1.6), "A loaf", "Take a loaf and some cheese from the counter", {}),
mzHold("fountain", 14, "Sit on the step of the drinking fountain and eat, while patrols pass", { r: 6 }),
mzId("conf", mzGo("conf", "At midday, go down to the place near Shepperton Lock where the Wey and Thames join", { r: 12 })),
mzHold("beach", 12, "Wait in the crowd for the ferry: boats piled with luggage, boatmen shouting", { r: 12 }),
mzRead("🔊 Here they are!", mrbQs("\"Here they are!\" shouted a man in a blue jersey. \"Yonder! D'yer see them? Yonder!\"") + mrbQs("Quickly, one after the other, one, two, three, four of the armoured Martians appeared, far away over the little trees, across the flat meadows that stretched towards Chertsey, and striding hurriedly towards the river.") + mrSrc(mrBk(12)), "▶ Go on"),
mzPuzzle("🌊 What do you do?", "The fifth Martian is coming straight at you. What do you shout?", ["\"Run!\"", "\"Get under water!\"", "\"Hide in the houses!\""], 1, ["They cannot outrun it.", "", "The houses will burn."], { yes: "🌊 " + mrbQ("\"Get under water!\" I shouted, unheeded.") }),
mzGo("wade", "Rush down the gravelly beach and headlong into the water", { r: 6 }),
mzRead("💥 Hit!", mrbQs("The shell burst clean in the face of the Thing. The hood bulged, flashed, was whirled off in a dozen tattered fragments of red flesh and glittering metal.", "\"Hit!\" shouted I, with something between a scream and a cheer.") + mrSrc(mrBk(12)), "▶ Go on"),
mzHold("wade", 10, "Stay breast-high in the river as the headless giant reels and falls, and the steam boils up", { r: 8 }),
mzRead("♨️ Boiling", mrbQs("Then suddenly the white flashes of the Heat-Ray came leaping towards me. The houses caved in as they dissolved at its touch, and darted out flames;") + mrSrc(mrBk(12)), "▶ Under!"),
mzPuzzle("🫁 The wave", "The water is near boiling. What do you do?", ["Duck under and blunder ahead holding your breath", "Climb out onto the bank", "Wave to the Martians"], 0, ["", "They are on the bank.", "No!"], { yes: "🫁 " + mrbQ("In another moment the huge wave, well-nigh at the boiling-point had rushed upon me.") }),
mzRead("🌫️ The gravel", mrbQs("I have a dim memory of the foot of a Martian coming down within a score of yards of my head, driving straight into the loose gravel, whirling it this way and that and lifting again;") + mrSrc(mrBk(12)), "▶ To the next chapter")
] });
mrbCh({ t: "How I Fell in with the Curate", txt: 12, start: { sc: "thames", x: 330, z: -232, ry: Math.PI }, jump: 1, tune: "grief", keep: ["curate", "The curate", "⛪"],
state: { env: "heath", thdead: "steam", thburnt: true, thhall: true },
words: "The Martians fall back to Horsell Common with their dead. You drift down the river in a small abandoned boat, half naked, scalded, past Walton, until you come ashore in the flat meadows.",
intro: "Down the river",
cast: [mrc("curate", mrT(474, -366), { ry: Math.PI * 0.7 })],
steps: [
{ k: "read" },
mzRead("🚣 Drifting", mrbQs("I saw an abandoned boat, very small and remote, drifting down-stream; and throwing off the most of my sodden clothes, I went after it, gained it, and so escaped out of that destruction.") + mrSrc(mrBk(13)), "▶ Go on"),
mzHold("hbank", 14, "Lie in the boat on the hot water, past Walton; then come ashore below the bank", { r: 14 }),
mzGo("halliford", "Stumble up through the flat meadows towards Halliford", { r: 14 }),
mzGo("hedge", "Lie down under a hedge in the long grass", { r: 6 }),
mzHold("hedge", 12, "Sleep, or something like it", { r: 8 }),
mzSay("The curate", "A seated figure in soot-smudged shirt sleeves", "💧 Water", ["\"Have you any water?\" I asked abruptly.", "He shook his head.", "\"You have been asking for water for the last hour,\" he said."], mrBk(13)),
mzSay("The curate", "The curate", "❓ Why?", ["\"What does it mean?\" he said. \"What do these things mean?\"", "\"Why are these things permitted? What sins have we done?", "\"What are we?\" I answered, clearing my throat."], mrBk(13)),
mzTalk("The curate", "The curate, pointing towards Weybridge", ["🔥 For ever and ever", mrbQs("\"All the work--all the Sunday schools--What have we done--what has Weybridge done? Everything gone--everything destroyed. The church! We rebuilt it only three years ago. Gone! Swept out of existence! Why?\"", "\"The smoke of her burning goeth up for ever and ever!\" he shouted.") + mrSrc(mrBk(13)), "▶ Go on"]),
mzPuzzle("🧭 Sunbury", "You begin to take his measure. What do you ask, in a matter-of-fact voice?", ["\"Are we far from Sunbury?\"", "\"Are you a soldier?\"", "\"Have you seen my wife?\""], 0, ["", "He is a clergyman.", "He would not know."], { yes: "🧭 He does not answer. \"This must be the beginning of the end,\" he says." }),
mzTalk("The curate", "The curate", ["💪 Be a man", mrbQs("\"Be a man!\" said I. \"You are scared out of your wits! What good is religion if it collapses under calamity?") + mrSrc(mrBk(13)), "▶ Go on"]),
mzSay("The curate", "The curate", "☠️ Killed", ["\"But how can we escape?\" he asked, suddenly. \"They are invulnerable, they are pitiless.\"", "\"Neither the one nor, perhaps, the other,\" I answered.", "\"Killed!\" he said, staring about him. \"How can God's ministers be killed?\""], mrBk(13)),
mzPuzzle("✨ The flicker", "What is the flicker in the sky to the south?", ["Lightning", "The heliograph, signalling: the sign of human help and effort", "A Martian"], 1, ["The sky is clear.", "", "No."], { yes: "✨ " + mrbQ("\"We are in the midst of it,\" I said, \"quiet as it is. That flicker in the sky tells of the gathering storm.") }),
mzHold("hedge", 10, "Listen: the dull resonance of distant guns, a remote weird crying, then stillness", { r: 8 }),
mzRead("🌅 Northward", mrbQs("\"We had better follow this path,\" I said, \"northward.\"") + mrSrc(mrBk(13)), "▶ To the next chapter")
] });
mrbCh({ t: "In London", txt: 13, start: { sc: "thames", x: 470, z: -372, ry: Math.PI }, jump: 1, tune: "study", keep: ["london", "My brother in London", "🗞️"],
state: { env: "evening", thdead: "steam", thburnt: true },
words: "Your younger brother was in London when the Martians fell at Woking, a medical student working for an examination. Here is what he saw, as he told it to you after.",
intro: "London, Saturday to Monday",
cast: [],
steps: [
{ k: "read" },
mzRead("🎓 My brother", mrbQs("My younger brother was in London when the Martians fell at Woking. He was a medical student working for an imminent examination, and he heard nothing of the arrival until Saturday morning.") + mrSrc(mrBk(14)), "▶ Go on"),
mzPuzzle("🚉 Waterloo", "On Saturday night your brother goes to Waterloo to come down to you. Why can't he?", ["The trains do not run to Woking: there has been an accident", "He forgets his ticket", "It rains"], 0, ["", "No.", "It does storm, but that is not why."], { yes: "🚉 Nobody at the station knows any more. He goes back to his rooms." }),
mzPuzzle("🛡️ Personal security", "Why does London take so little notice on Sunday morning?", ["The papers are not printed", "The habit of personal security is deeply fixed in the Londoner's mind", "The police forbid it"], 1, ["They are.", "", "No."], { yes: "🛡️ " + mrbQ("There's fighting going on about Weybridge") }),
mzRead("⛪ The Foundling Hospital", mrbQs("My brother went to church at the Foundling Hospital in the morning, still in ignorance of what had happened on the previous night.") + mrSrc(mrBk(14)), "▶ Go on"),
mzHold("hedge", 8, "(Here at Halliford, you and the curate lie low in the meadows while this happens in London)", { r: 10 }),
mzPuzzle("🚂 Waterloo again", "Who comes in on the trains from Richmond, Putney and Kingston?", ["Soldiers", "People who went boating for the day and found the locks closed", "The Queen"], 1, ["Not those.", "", "No."], { yes: "🚂 " + mrbQ("\"There's hosts of people driving into Kingston in traps and carts and things, with boxes of valuables and all that,\" he said.") }),
mzRead("📰 Wellington Street", mrbQs("In Wellington Street my brother met a couple of sturdy roughs who had just been rushed out of Fleet Street with still-wet newspapers and staring placards.") + mrSrc(mrBk(14)), "▶ Read the paper"),
mzRead("🕷️ Spiderlike machines", mrbQs("They were described as \"vast spiderlike machines, nearly a hundred feet high, capable of the speed of an express train, and able to shoot out a beam of intense heat.\"") + mrSrc(mrBk(14)), "▶ Go on"),
mzPuzzle("🧮 How many?", "How many Martians did the authorities reckon there could be, at the most?", ["Five in each cylinder: fifteen in all", "A hundred", "One"], 0, ["", "Fewer.", "More."], { yes: "🧮 And one, at least, had been killed. The authorities were hopeful." }),
mzPuzzle("🏃 Victoria", "Going along the Strand and down towards Victoria, whom does your brother meet?", ["The Martians", "Fugitives from West Surrey", "The army"], 1, ["Not yet.", "", "Not there."], { yes: "🏃 " + mrbQ("None of them could tell him any news of Woking except one man, who assured him that Woking had been entirely destroyed on the previous night.") }),
mzRead("🔔 Monday, before dawn", mrbQs("\"London in danger of suffocation! The Kingston and Richmond defences forced! Fearful massacres in the Thames Valley!\"") + mrSrc(mrBk(14)), "▶ Go on"),
mzRead("⚫ The dispatch", mrbQs("\"The Martians are able to discharge enormous clouds of a black and poisonous vapour by means of rockets.") + mrSrc(mrBk(14)), "▶ Go on"),
mzPuzzle("💷 What does he take?", "Your brother turns to his room. What does he put in his pockets?", ["His books", "All his available money, some ten pounds", "A revolver"], 1, ["No.", "", "He has none."], { yes: "💷 " + mrbQ("\"Black Smoke!\" the voices cried. \"Fire!\"") }),
mzRead("🌊 Six million", mrbQs("That was all, but it was enough. The whole population of the great six-million city was stirring, slipping, running; presently it would be pouring en masse northward.") + mrSrc(mrBk(14)), "▶ To the next chapter")
] });
mrbCh({ t: "What Had Happened in Surrey", txt: 14, start: { sc: "thames", x: 470, z: -372, ry: Math.PI }, jump: 1, tune: "dread", keep: ["surrey", "The Black Smoke", "⚫"],
state: { env: function (s) { return s < 8 ? "evening" : "night"; }, night: function (s) { return s >= 8; }, thdead: "steam", thburnt: true, thtri: function (s) { return s < 8 ? "sentinel" : "smoke"; } },
words: "While the curate talked so wildly to you under the hedge in the flat meadows near Halliford, the Martians were coming out again from Horsell.",
intro: "The meadows near Halliford",
cast: [mrc("curate", mrT(476, -360), { ry: Math.PI, until: "house" }), mrc("curate", mrwIn("thames", "uhouse", 0.8, -2.2), { ry: Math.PI, from: "house" })],
steps: [
{ k: "read" },
mzRead("🎯 St. George's Hill", mrbQs("It was this howling and firing of the guns at Ripley and St. George's Hill that we had heard at Upper Halliford.") + mrSrc(mrBk(15)), "▶ Go on"),
mzPuzzle("🌲 Hidden guns", "The St. George's Hill gunners hit a Martian. How?", ["They were hidden by a pine wood, and unsuspected", "They charged", "They used rockets"], 0, ["", "No.", "No."], { yes: "🌲 He staggered and went down. The others came to him." }),
mzHold("hedge", 10, "Crouch with the curate behind the hedge as the evening falls", { r: 8 }),
mzRead("🗼 A Martian in the dusk", mrbQs("At this sight the curate cried faintly in his throat, and began running; but I knew it was no good running from a Martian, and I turned aside and crawled through dewy nettles and brambles into the broad ditch by the side of the road.") + mrSrc(mrBk(15)), "▶ Go on"),
mzGo(mrT(450, -400), "Crawl into the broad ditch by the road", { r: 8 }),
mzHold(mrT(450, -400), 12, "Lie in the ditch. The Martians take their places in a great crescent in absolute silence", { r: 8 }),
mzPuzzle("🔫 Minute-guns", "What do you hear, after an interminable time?", ["Thunder", "A sound like the distant concussion of a gun, then another, and another", "A train"], 1, ["No.", "", "No."], { yes: "🔫 " + mrbQ("\"What has happened?\" said the curate, standing up beside me.") }),
mzSay("The curate", "The curate, standing up", "❓ Heaven knows", ["\"What has happened?\" said the curate, standing up beside me.", "\"Heaven knows!\" said I."], mrBk(15)),
mzRead("⛰️ Black kopjes", mrbQs("Moved by a sudden thought, I looked northward, and there I perceived a third of these cloudy black kopjes had risen.") + mrSrc(mrBk(15)), "▶ Go on"),
mzPuzzle("⚫ The Black Smoke", "What were those black hills, as you learned afterwards?", ["Burning houses", "Canisters of heavy black vapour fired from the tubes, that sank and killed all it touched", "Storm clouds"], 1, ["No.", "", "No."], { yes: "⚫ " + mrbQ("It was heavy, this vapour, heavier than the densest smoke,") }),
mzId("house", mzGo("uhall", "Go back, with the curate, to the deserted house at Upper Halliford", { r: 8 })),
mzGo(mrwIn("thames", "uhouse", 0, 1.2), "Inside, to the window that looks south", { r: 2.5 }),
mzHold(mrwIn("thames", "uhouse", 0, -3.2), 14, "Watch from the window in the starlight as the Martians lay the Black Smoke over the country", { r: 2.2 }),
mzRead("🌲 The fourth cylinder", mrbQs("Then the fourth cylinder fell--a brilliant green meteor--as I learned afterwards, in Bushey Park.") + mrSrc(mrBk(15)), "▶ Go on"),
mzPuzzle("🐝 Wasps' nest", "How does the book picture the Martians spreading the smoke?", ["Like gardeners spreading lime", "As methodically as men might smoke out a wasps' nest", "Like a fire brigade"], 1, ["No.", "", "No."], { yes: "🐝 " + mrbQ("By midnight the blazing trees along the slopes of Richmond Park and the glare of Kingston Hill threw their light upon a network of black smoke, blotting out the whole valley of the Thames and extending as far as the eye could reach.") }),
mzGo(mrwIn("thames", "hparl", 0, 1), "Go down to the kitchen; find something to eat", { r: 2.5 }),
mzGather("tin", mrwIn("thames", "hparl", -3.0, 0), 3, "Some food", "Find bread and a tin or two in the kitchen", { spread: 1.2 }),
mzRead("🏙️ Before dawn", mrbQs("Before dawn the black vapour was pouring through the streets of Richmond, and the disintegrating organism of government was, with a last expiring effort, rousing the population of London to the necessity of flight.") + mrSrc(mrBk(15)), "▶ To the next chapter")
] });
mrbCh({ t: "The Exodus from London", txt: 15, start: { sc: "north", x: -660, z: 110, ry: -Math.PI / 2 }, jump: 1, tune: "chase", keep: ["exodus", "The Exodus from London", "🛤️"],
state: { env: "heath", flee: true, stream: function (s) { return s < 10 ? "thin" : "full"; }, chaise: function (s) { return s < 8 ? "ncorner" : (s < 14 ? "camp" : "meet"); } },
words: "Monday. Your brother is out of the panic at Chalk Farm, skirting the Edgware Road. He reaches Edgware about seven, fasting and weary, and you are with him now.",
intro: "Edgware, Monday morning",
cast: [mrc("mrselph", mrN(-436, 100), { ry: -Math.PI / 2, until: "camp" }), mrc("misselph", mrN(-440, 94), { ry: Math.PI / 2, until: "camp" }), mrc("mrselph", mrN(-246, 44), { ry: Math.PI, from: "camp", until: "meet" }), mrc("misselph", mrN(-256, 36), { ry: 0, from: "camp", until: "meet" }), mrc("mrselph", mrN(-30, 90), { ry: Math.PI / 2, from: "meet" }), mrc("misselph", mrN(-26, 84), { ry: Math.PI / 2, from: "meet" })],
steps: [
{ k: "read" },
mzRead("🌊 The roaring wave of fear", mrbQs("So you understand the roaring wave of fear that swept through the greatest city in the world just as Monday was dawning--the stream of flight rising swiftly to a torrent, lashing in a foaming tumult round the railway stations, banked up into a horrible struggle about the shipping in the Thames, and hurrying by every available channel northward and eastward.") + mrSrc(mrBk(16)), "▶ Go on"),
mzGo("edgware", "Come into Edgware, fasting and weary", { r: 14 }),
mzGo(mrwIn("north", "edgshop", 0, 1), "Into the cycle-shop: buy a machine", { r: 2.5 }),
mzPuzzle("🚲 The bicycle", "What happens to the bicycle your brother gets?", ["It is stolen", "The front tyre bursts going through a window, and he must walk", "It carries him to Chelmsford"], 1, ["No.", "", "Not so far."], { yes: "🚲 He goes on afoot, east along the lane towards Barnet." }),
mzGo("lane", "Walk east along the lane", { r: 14 }),
mzRead("😱 Screams", mrbQs("He heard their screams, and, hurrying round the corner, saw a couple of men struggling to drag them out of the little pony-chaise in which they had been driving, while a third with difficulty held the frightened pony's head.") + mrSrc(mrBk(16)), "▶ Run!"),
mzGo("ncorner", "Run round the corner to the pony-chaise", { r: 8 }),
mzPuzzle("👊 The robbers", "What does your brother do?", ["Runs away", "Shouts and goes straight at them", "Offers them money"], 1, ["Not him.", "", "Not him."], { yes: "👊 " + mrbQ("\"Take this!\" said the slender lady, and she gave my brother her revolver.") }),
mzSay("Miss Elphinstone", "The slender lady, with the revolver", "🔫 Give me the reins", ["\"Go back to the chaise,\" said my brother, wiping the blood from his split lip.", "\"I'll sit here,\" said my brother, \"if I may\"; and he got upon the empty front seat.", "\"Give me the reins,\" she said, and laid the whip along the pony's side."], mrBk(16)),
mzId("camp", mzGo("camp", "Ride on with them nearer New Barnet, and make camp by the wayside", { r: 10 })),
mzTalk("Mrs. Elphinstone", "Mrs. Elphinstone, in white", ["😢 George", "\"George! Where is George? We must go back for him!\" Her husband is a surgeon at Stanmore. He sent them on ahead and promised to follow." + mrSrc(mrBk(16)), "▶ Go on"]),
mzSay("Miss Elphinstone", "Miss Elphinstone", "💰 Money", ["\"We have money,\" said the slender woman, and hesitated.", "\"So have I,\" said my brother."], mrBk(16)),
mzPuzzle("🧭 Where?", "Where do you decide to make for?", ["Back to London", "East, to the coast, and a ship across the sea", "Edinburgh"], 1, ["Never.", "", "Too far."], { yes: "🧭 They have thirty pounds in gold, besides a five-pound note." }),
mzHold("camp", 14, "Rest by the wayside while the pony grazes in the hedge, and more and more people pass", { r: 12 }),
mzId("meet", mzGo("meet", "Go on to where the lane meets the great road", { r: 8 })),
mzRead("🌊 A boiling stream", mrbQs("For the main road was a boiling stream of people, a torrent of human beings rushing northward, one pressing on another.") + mrSrc(mrBk(16)), "▶ Go on"),
mzHold("meet", 14, "Stand at the pony's head and watch the torrent go by: cabs, carriages, carts, people on foot", { r: 10 }),
mzRead("📯 Way! Way!", mrbQs("\"Way! Way! The Martians are coming!\"", "\"Eter-nity! Eter-nity!\" came echoing down the road.") + mrSrc(mrBk(16)), "▶ Go on"),
mzSay("A man in a frock coat", "A man pushing through to you", "💧 Lord Garrick", ["\"Where is there any water?\" he said. \"He is dying fast, and very thirsty. It is Lord Garrick.\"", "\"Lord Garrick!\" said my brother; \"the Chief Justice?\"", "\"There may be a tap,\" said my brother, \"in some of the houses. We have no water. I dare not leave my people.\""], mrBk(16), { at: mrN(-24, 70) }),
mzFind("coin", mrN(-8, 60), "Scattered gold", "A bag has split: sovereigns spill in the road, and a man flings himself on them. Pull him out of the way of the wheels", {}),
mzPuzzle("🔫 Into the torrent", "How do you force your way across the road?", ["Wait for it to stop", "Drive the chaise into the stream, with Miss Elphinstone holding the revolver", "Turn back"], 1, ["It never stops.", "", "They are coming."], { yes: "🔫 " + mrbQ("\"Point the revolver at the man behind,\" he said, giving it to her, \"if he presses us too hard. No!--point it at his horse.\"") }),
mzGo("across", "Across the great road, and out of the stream", { r: 12 }),
mzGo("hadley", "East through Hadley", { r: 14 }),
mzGo("nfield", "To a field beyond, to rest", { r: 10 }),
mzHold("nfield", 10, "Halt for the rest of the afternoon: the day has utterly exhausted the women", { r: 12 })
] });
mrbCh({ t: "The \"Thunder Child\"", txt: 16, start: { sc: "sea", x: 0, z: 440, ry: 0 }, jump: 1, tune: "chase", keep: ["thunderchild", "The \"Thunder Child\"", "⚓"],
state: { env: function (s) { return s < 17 ? "sea" : "evening"; }, seCrowd: function (s) { return s < 9; }, onDeck: function (s) { return s >= 9; }, steaming: function (s) { return s >= 12; }, seTri: function (s) { return s < 12 ? "none" : (s < 17 ? "wade" : (s < 19 ? "fight" : "after")); }, tcCharge: function (s) { return s >= 15 && s < 19; }, tcSunk: function (s) { return s >= 19; }, tcAt: function (s) { return s >= 19 ? [40, -300] : null; } },
words: "On Wednesday the three of you reach Chelmsford; on Thursday, Tillingham, and see the sea, and the most amazing crowd of shipping of all sorts that it is possible to imagine.",
intro: "Tillingham, Thursday",
cast: [mrc("mrselph", mrSe(-40, 30), { ry: Math.PI, until: "aboard" }), mrc("misselph", mrSe(-34, 26), { ry: Math.PI, until: "aboard" }), mrc("mrselph", mrSe(78, -138, 3.0), { ry: 0, from: "aboard" }), mrc("misselph", mrSe(82, -140, 3.0), { ry: Math.PI, from: "aboard" }), mrc("captain", mrSe(80, -150, 5.6), { ry: 0, from: "aboard" })],
steps: [
{ k: "read" },
mzRead("💀 Annihilation", mrbQs("Had the Martians aimed only at destruction, they might on Monday have annihilated the entire population of London, as it spread itself slowly through the home counties.") + mrSrc(mrBk(17)), "▶ Go on"),
mzPuzzle("🍞 Chelmsford", "What happens at Chelmsford?", ["A Committee of Public Supply seizes the pony as provisions", "They are given a train", "They stay a week"], 0, ["", "No.", "No."], { yes: "🍞 And gives nothing in exchange for it but the promise of a share in it the next day." }),
mzGo("tillingham", "Walk into Tillingham", { r: 14 }),
mzGo(mrwIn("sea", "tch", 0, 2), "Climb into the church, where people watch for Martians from the tower", { r: 3 }),
mzGo(mrwIn("sea", "tinn", 0, 1), "Into the inn, to buy food at fantastic prices", { r: 3 }),
mzGather("bread", mrwIn("sea", "tinn", -1, -2), 3, "Bread", "Buy what bread you can", { spread: 1.6 }),
mzGo("marsh", "Down the road over the marshes", { r: 14 }),
mzGo("shore", "To the shingle, where the boats are drawn up", { r: 10 }),
mzTalk("Mrs. Elphinstone", "Mrs. Elphinstone, at the sight of the sea", ["😨 Panic", "She has never been out of England. She would rather die than trust herself friendless in a foreign country. She gives way to panic; it is with the greatest difficulty you get her down to the beach." + mrSrc(mrBk(17)), "▶ Go on"]),
mzId("aboard", mzTravel("🚣 Out to the steamer", "A boatman rows you out to a little paddle-steamer from the Thames. You pay your fares at the gangway: fifty-odd shillings apiece.", { sc: "sea", x: 80, z: -146, y: 3.2, ry: 0 }, "🚢 <b>The paddle-steamer,</b> bound for Ostend.", "▶ Row out")),
mzRead("🚢 Aboard", mrbQs("It was about two o'clock when my brother, having paid their fares at the gangway, found himself safely aboard the steamboat with his charges.") + mrSrc(mrBk(17)), "▶ Go on"),
mzHold("deck", 14, "Wait on deck: the captain will not leave till every seat is sold. Gunfire to the south", { r: 6 }),
mzRead("🗼 A Martian", mrbQs("It was the first Martian my brother had seen, and he stood, more amazed than terrified, watching this Titan advancing deliberately towards the shipping, wading farther and farther into the water as the coast fell away.") + mrSrc(mrBk(17)), "▶ Go on"),
mzGo("stern", "Go aft, to watch", { r: 5 }),
mzHold("stern", 12, "Watch the three Martians wade out towards the shipping, as the little steamer flaps her way east", { r: 6 }),
mzRead("⚓ The Thunder Child", mrbQs("She was steaming at such a pace that in a minute she seemed halfway between the steamboat and the Martians--a diminishing black bulk against the receding horizontal expanse of the Essex coast.") + mrSrc(mrBk(17)), "▶ Go on"),
mzPuzzle("🚀 The ram", "What does the ironclad do?", ["Turns and runs", "Charges straight at the Martians, at full speed", "Fires a single shot and sinks"], 1, ["Never.", "", "She does more."], { yes: "🚀 " + mrbQ("Suddenly the foremost Martian lowered his tube and discharged a canister of the black gas at the ironclad.") }),
mzHold("stern", 10, "Hold on to the bulwarks as she goes in", { r: 6 }),
mzRead("💥 Two!", mrbQs("\"Two!\" yelled the captain.") + mrbQs("Everyone was shouting. The whole steamer from end to end rang with frantic cheering that was taken up first by one and then by all in the crowding multitude of ships and boats that was driving out to sea.") + mrSrc(mrBk(17)), "▶ Go on"),
mzHold("bow", 12, "Stand in the bows as the steam hangs on the water, and the little vessel beats its way seaward", { r: 6 }),
mzRead("🌅 The evening star", mrbQs("The sun sank into grey clouds, the sky flushed and darkened, the evening star trembled into sight.") + mrSrc(mrBk(17)), "▶ To Book Two")
] });
var MRW_SC2 = mrSh(0, -2), MRW_SLIT = mrSh(0, -7.6);
mrbCh({ t: "Under Foot", txt: 17, start: { sc: "thames", x: 500, z: -528, ry: 0 }, jump: 1, tune: "grief", keep: ["underfoot", "The fifth cylinder", "🏚️"],
state: { env: function (s) { return s < 14 ? "grey" : "night"; }, night: function (s) { return s >= 14; }, thdead: "steam", thburnt: true, thtri: "sentinel", grey: true, shtri: function (s) { return s >= 9 && s < 12 ? "kew" : "none"; }, shkew: function (s) { return s >= 9 && s < 12; }, shpit: function (s) { return s >= 18; } },
words: "In the first book you wandered so much from your own adventures to tell of your brother's. All this while you and the curate have been lying hidden in the empty house at Halliford.",
intro: "The house at Upper Halliford",
cast: [mrc("curate", mrT(504, -524), { ry: Math.PI, until: "sheen" }), mrc("curate", mrSh(-750, 44), { ry: -Math.PI / 2, from: "sheen", until: "villa" }), mrc("curate", mrwIn("sheen", "villa", 0.8, -1.2), { ry: Math.PI, from: "villa", until: "white" }), mrc("curate", mrSh(4, 0), { ry: Math.PI, from: "white" })],
steps: [
{ k: "read" },
mzRead("😟 My wife", mrbQs("My mind was occupied by anxiety for my wife. I figured her at Leatherhead, terrified, in danger, mourning me already as a dead man.") + mrSrc(mrBk(18)), "▶ Go on"),
mzTalk("The curate", "The curate", ["🙏 Safe here", mrbQs("\"We are safe here,\" he repeated; \"safe here.\"") + "<p>He will not stir. He wanders through the house, talking aloud. You are hemmed in by the Black Smoke all that day and the next.</p>" + mrSrc(mrBk(18)), "▶ Go on"]),
mzPuzzle("💨 The steam", "About midday a Martian comes across the fields with a jet of hissing steam. What is it doing?", ["Burning the houses", "Laying the Black Smoke: it hisses against the walls and the smoke goes", "Watering the fields"], 1, ["No.", "", "No."], { yes: "💨 You are free of the smoke. You resolve to leave him." }),
mzGather("bread", mrwIn("thames", "hparl", -3, 0), 3, "Food and drink", "Wiser now for the artilleryman's teaching, seek out food and drink for the road", { spread: 1.4 }),
mzGo("uhall", "Go out: he comes after you, after all", { r: 8 }),
mzGo("sunbury", "Along the road towards Sunbury", { r: 14 }),
mzRead("☠️ The road", mrbQs("In Sunbury, and at intervals along the road, were dead bodies lying in contorted attitudes, horses as well as men, overturned carts and luggage, all covered thickly with black dust.") + mrSrc(mrBk(18)), "▶ Go on"),
mzId("sheen", mzTravel("🌑 Twickenham and Kew", "Past Hampton Court and through Twickenham, untouched; then on towards Kew in the blackened country.", { sc: "sheen", x: -760, z: 40, ry: -Math.PI / 2 }, "🌑 <b>The road from Kew.</b>", "▶ Walk on")),
mzHold("kew", 8, "Stand still and listen. Nothing; then people running", { r: 12 }),
mzRead("🗼 Kew", mrbQs("Then suddenly, as we approached Kew, came a number of people running, and the upperworks of a Martian fighting-machine loomed in sight over the housetops, not a hundred yards away from us.") + mrSrc(mrBk(18)), "▶ Hide!"),
mzGo(mrSh(-700, -20), "Hide in a ditch by the garden walls", { r: 10 }),
mzHold(mrSh(-700, -20), 14, "Lie hidden until dusk; watch it pick people up and toss them into a great metallic carrier on its back", { r: 12 }),
mzPuzzle("🧺 The carrier", "What do you realise, watching the Martian with its carrier?", ["That it is gathering men for some purpose other than destruction", "That it is lost", "That it is broken"], 0, ["", "No.", "No."], { yes: "🧺 " + mrbQ("It was the first time I realised that the Martians might have any other purpose than destruction with defeated humanity.") }),
mzGo("sheen", "In the dark, creep on to Sheen: silent and deserted", { r: 14 }),
mzId("villa", mzGo(mrwIn("sheen", "villa", 0, 1.2), "Get in through the window of a small semi-detached villa", { r: 2.5 })),
mzGather("tin", mrwIn("sheen", "villa", -3.6, 0), 3, "Food", "Find what food there is: two loaves in a pan, an uncooked steak, half a ham", { spread: 1.2 }),
mzId("white", mzGo("white", "Cross to where the road turns towards Mortlake: a white house within a wall", { r: 8 })),
mzGo(MRW_SC2, "Into the kitchen, in the dark", { r: 3 }),
mzRead("💚 A blinding glare", mrbQs("\"It can't be midnight yet,\" I said, and then came a blinding glare of vivid green light.") + mrSrc(mrBk(18)), "▶ ...")
] });
mrbCh({ t: "What We Saw from the Ruined House", txt: 18, start: { sc: "sheen", x: 0, z: 2, ry: Math.PI }, jump: 1, tune: "dread", keep: ["ruined", "The Martians, close", "👁️"],
state: { env: "grey", grey: true, shpit: true, handler: true, mars: function (s) { return s >= 6 ? 5 : 2; }, guard: function (s) { return s >= 10; }, building: function (s) { return s >= 14; } },
words: "You come to in the dark with a bruise on your temple. The fifth cylinder has struck the house next door and buried you both under the ruins.",
intro: "The scullery",
cast: [mrc("curate", mrSh(3, 1), { ry: Math.PI })],
steps: [
{ k: "read" },
mzSay("The curate", "The curate, whispering", "🤫 Don't move", ["\"Are you better?\" asked the curate in a whisper.", "\"Don't move,\" he said. \"The floor is covered with smashed crockery from the dresser."], mrBk(19)),
mzRead("🕳️ The fifth cylinder", mrbQs("\"The fifth cylinder,\" I whispered, \"the fifth shot from Mars, has struck this house and buried us under the ruins!\"") + mrSrc(mrBk(18)), "▶ Go on"),
mzHold(MRW_SC2, 12, "Lie still in the scullery through the day, hardly daring to breathe", { r: 4 }),
mzGo(MRW_SLIT, "Creep to the triangular slit in the wall, and look out", { r: 1.4 }),
mzRead("🛠️ The handling-machine", mrbQs("The mechanism it certainly was that held my attention first.") + mrbQs("Its motion was so swift, complex, and perfect that at first I did not see it as a machine, in spite of its metallic glitter.") + mrSrc(mrBk(19)), "▶ Go on"),
mzHold(MRW_SLIT, 14, "Watch it working in the pit: taking the cylinder apart, building with its pieces", { r: 1.6 }),
mzRead("🐙 The Martians", mrbQs("They were, I now saw, the most unearthly creatures it is possible to conceive.") + mrSrc(mrBk(19)), "▶ Go on"),
mzPuzzle("🧠 Heads", "What does Wells say the Martians were, in body?", ["Like men in armour", "Heads: merely heads, with a mouth and sixteen whiplike tentacles", "Like spiders"], 1, ["No.", "", "Their machines were."], { yes: "🧠 They did not eat; they took the fresh living blood of other creatures, and injected it into their own veins." }),
mzHold(MRW_SLIT, 12, "Keep watching, though it sickens you", { r: 1.6 }),
mzPuzzle("💤 Sleep", "What else is strange about them?", ["They never slept", "They slept all day", "They sang"], 0, ["", "No.", "No."], { yes: "💤 " + mrbQ("Their organisms did not sleep, any more than the heart of man sleeps.") }),
mzPuzzle("🌹 Red", "Why do the Martians' plants grow red?", ["They are on fire", "On Mars the vegetable kingdom is of a vivid blood-red, not green", "They were painted"], 1, ["No.", "", "No."], { yes: "🌹 The seeds they brought, intentionally or by accident, gave rise to red-coloured growths here: the red weed." }),
mzPuzzle("🦠 No sickness", "Why had the Martians no illness on Mars?", ["They had no bacteria at all: no fevers, no contagions", "Good doctors", "Cold weather"], 0, ["", "No.", "No."], { yes: "🦠 Remember this." }),
mzHold(MRW_SLIT, 12, "Watch as the handling-machine puts together a new piece of apparatus", { r: 1.6 }),
mzGo(MRW_SC2, "Creep back down into the scullery", { r: 3 }),
mzRead("🔩 Aluminium", mrbQs("When I looked again, the busy handling-machine had already put together several of the pieces of apparatus it had taken out of the cylinder into a shape having an unmistakable likeness to its own;") + mrSrc(mrBk(19)), "▶ To the next chapter")
] });
mrbCh({ t: "The Days of Imprisonment", txt: 19, start: { sc: "sheen", x: 0, z: -2, ry: Math.PI }, jump: 1, tune: "dread", keep: ["prison", "The days of imprisonment", "⛓️"],
state: { env: function (s) { return s < 12 ? "grey" : "moon"; }, night: function (s) { return s >= 12; }, grey: true, shpit: true, handler: true, handler2: true, mars: 5, guard: true, building: true },
words: "A second fighting-machine arrives and drives you from the peephole. You and the curate take turns at it, and quarrel in whispers.",
intro: "The scullery",
cast: [mrc("curate", mrSh(3, 1), { ry: Math.PI })],
steps: [
{ k: "read" },
mzRead("😤 Incompatible", mrbQs("The fact is that we had absolutely incompatible dispositions and habits of thought and action, and our danger and isolation only accentuated the incompatibility.") + mrSrc(mrBk(20)), "▶ Go on"),
mzPuzzle("🍞 The food", "The curate eats and drinks without thought for tomorrow. What must you do?", ["Let him", "Ration the food and water, and resort to threats, even blows", "Give him all of it"], 1, ["You will both starve.", "", "No."], { yes: "🍞 " + mrbQ("It is disagreeable for me to recall and write these things, but I set them down that my story may lack nothing.") }),
mzGather("tin", mrSh(4.4, 0.6), 4, "A tin or a bottle", "Gather the food into one place in the scullery and keep it", { spread: 1.0 }),
mzGo(MRW_SLIT, "Take your turn at the slit", { r: 1.4 }),
mzHold(MRW_SLIT, 14, "Watch the new machine digging clay and making bars of aluminium in the pit, all day", { r: 1.6 }),
mzRead("🤖 Clumsy masters", mrbQs("The contrast between the swift and complex movements of these contrivances and the inert panting clumsiness of their masters was acute,") + mrSrc(mrBk(20)), "▶ Go on"),
mzGo(MRW_SC2, "The curate has the slit. Huddle below, listening", { r: 3 }),
mzHold(MRW_SC2, 10, "Listen: he makes a sudden movement backward. Men have been brought to the pit", { r: 3 }),
mzGo(MRW_SLIT, "Take the slit from him", { r: 1.4 }),
mzReadA("😱 The feeding", "<p>You see enough: the green flames, a man lifted, the Martian's tentacles. You do not look any longer.</p>" + mrbQs("I slid down the rubbish, struggled to my feet, clapped my hands over my ears, and bolted into the scullery.") + mrSrc(mrBk(20)), "<p>You see enough to know what the Martians are doing with the men they bring. You will not look again.</p>" + mrSrc(mrBk(20)), "▶ Away"),
mzGo(MRW_SC2, "Back into the scullery, hands over your ears", { r: 3 }),
mzPuzzle("⛏️ Escape", "That night you think of escape. What do you try?", ["Digging a way out through the kitchen", "Shouting for help", "Opening the door"], 0, ["", "They would hear.", "It is buried."], { yes: "⛏️ The rubbish slides; you dare not go on. It falls with a noise that frightens you both." }),
mzHold(MRW_SC2, 12, "Lie in the dark by the curate. The moon shines into the pit", { r: 3 }),
mzRead("🌕 The moon", mrbQs("It was very late in the night, and the moon was shining brightly.") + mrSrc(mrBk(20)), "▶ To the next chapter")
] });
mrbCh({ t: "The Death of the Curate", txt: 20, start: { sc: "sheen", x: 0, z: -2, ry: Math.PI }, jump: 1, tune: "dread", keep: ["death", "The coal-cellar", "🕳️"],
state: { env: "grey", grey: true, shpit: true, handler: true, handler2: true, mars: 5, guard: true, building: true },
words: "It is the sixth day of your imprisonment. When you peep for the last time and turn round, the curate is gone.",
intro: "The scullery",
cast: [mrc("curate", mrSh(-3.4, -1.6), { ry: Math.PI / 2, until: "dead" })],
steps: [
{ k: "read" },
mzRead("🍷 Burgundy", mrbQs("It was on the sixth day of our imprisonment that I peeped for the last time, and presently found myself alone.") + mrSrc(mrBk(21)), "▶ Go on"),
mzGo(mrSh(-3.4, -1.6), "Go to him: he is drinking the burgundy", { r: 2 }),
mzPuzzle("🍾 The bottle", "What do you do?", ["Let him drink", "Snatch at the bottle", "Drink too"], 1, ["You cannot.", "", "No."], { yes: "🍾 " + mrbQ("For a few minutes there was a tussle. The bottle struck the floor and broke, and I desisted and rose.") }),
mzHold(MRW_SC2, 12, "Two vast days of struggle in undertones. You divide the food; he will not keep to it", { r: 3 }),
mzTalk("The curate", "The curate, by the copper, aloud now", ["⚠️ It is just", mrbQs("\"It is just, O God!\" he would say, over and over again. \"It is just. On me and mine be the punishment laid.") + mrSrc(mrBk(21)), "▶ Go on"]),
mzSay("The curate", "The curate, rising to his knees", "📢 Woe", ["\"Be still!\" I implored.", "\"I have been still too long,\" he said, in a tone that must have reached the pit, \"and now I must bear my witness. Woe unto this unfaithful city!", "\"Shut up!\" I said, rising to my feet, and in a terror lest the Martians should hear us."], mrBk(21)),
mzId("dead", mzReadA("🔪 The chopper", mrbQs("I put out my hand and felt the meat chopper hanging to the wall. In a flash I was after him.") + "<p>You strike him with the blunt back of it. He falls headlong and lies still.</p>" + mrSrc(mrBk(21)), "<p>He makes for the door to go out and shout to the Martians. You stop him, hard, and he falls and lies still.</p>" + mrSrc(mrBk(21)), "▶ Go on")),
mzRead("🐍 The tentacle", mrbQs("I turned by an effort, stumbled over the curate, and stopped at the scullery door. The tentacle was now some way, two yards or more, in the room, and twisting and turning, with queer sudden movements, this way and that.") + mrSrc(mrBk(21)), "▶ Hide!"),
mzGo("coal", "Into the coal-cellar! Shut the door", { r: 1.2 }),
mzHold(mrSh(-3.4, 2.6), 14, "Cover yourself with coal and firewood in the dark, and keep still. It is in the kitchen", { r: 1.4 }),
mzRead("🐘 Like an elephant's trunk", mrbQs("In the darkness I could just see the thing--like an elephant's trunk more than anything else--waving towards me and touching and examining the wall, coals, wood and ceiling.") + mrSrc(mrBk(21)), "▶ Go on"),
mzPuzzle("👢 Your boot", "It touches the heel of your boot. What do you do?", ["Scream", "Bite your hand, and keep still", "Kick it"], 1, ["They will have you.", "", "No!"], { yes: "👢 " + mrbQ("Once, even, it touched the heel of my boot. I was on the verge of screaming; I bit my hand.") }),
mzHold(mrSh(-3.4, 2.6), 12, "Lie still. Slowly, slowly it draws near, scratching the walls; then it raps the door and closes it", { r: 1.4 }),
mzRead("❓ Had it gone?", mrbQs("Had it gone?", "At last I decided that it had.") + mrSrc(mrBk(21)), "▶ Go on"),
mzHold(mrSh(-3.4, 2.6), 14, "Lie all the tenth day in the close darkness, buried among coals and firewood", { r: 1.4 }),
mzRead("🌑 The tenth day", mrbQs("It came into the scullery no more; but I lay all the tenth day in the close darkness, buried among coals and firewood, not daring even to crawl out for the drink for which I craved.") + mrSrc(mrBk(21)), "▶ To the next chapter")
] });
mrbCh({ t: "The Stillness", txt: 21, start: { sc: "sheen", x: -3, z: 2, ry: Math.PI }, jump: 1, tune: "night", keep: ["stillness", "The empty pit", "🐦"],
state: { env: "grey", grey: true, shpit: true, weed: function (s) { return s < 9 ? 1 : 2; }, handler: function (s) { return s < 9; }, mars: function (s) { return s < 9 ? 3 : 0; }, guard: function (s) { return s < 9; } },
words: "Your first act is to fasten the door between the kitchen and the scullery. But the pantry is empty: every scrap of food has gone. The Martian took it all.",
intro: "The scullery",
cast: [],
steps: [
{ k: "read" },
mzRead("🍽️ Empty", mrbQs("My first act before I went into the pantry was to fasten the door between the kitchen and the scullery. But the pantry was empty; every scrap of food had gone.") + mrSrc(mrBk(22)), "▶ Go on"),
mzHold(MRW_SC2, 12, "Sit in the darkness of the scullery: the eleventh day, without food, without water", { r: 3 }),
mzFind("jar", mrSh(3.4, -4.6), "The rain-water pump", "On the twelfth day, take the chance: work the creaking rain-water pump by the sink", {}),
mzRead("💧 Water", mrbQs("On the twelfth day my throat was so painful that, taking the chance of alarming the Martians, I attacked the creaking rain-water pump that stood by the sink, and got a couple of glassfuls of blackened and tainted rain water.") + mrSrc(mrBk(22)), "▶ Go on"),
mzHold(MRW_SC2, 12, "Doze; think of the curate and the manner of his death", { r: 3 }),
mzGo(MRW_SLIT, "On the fourteenth day go into the kitchen: the red weed has grown across the hole", { r: 1.4 }),
mzRead("🌿 Red light", mrbQs("On the fourteenth day I went into the kitchen, and I was surprised to find that the fronds of the red weed had grown right across the hole in the wall, turning the half-light of the place into a crimson-coloured obscurity.") + mrSrc(mrBk(22)), "▶ Go on"),
mzPuzzle("🐕 A dog", "Early on the fifteenth day, a dog's head is pushed in through the weed. What do you think?", ["To make a friend of it", "To catch it, and eat it, if you can", "To shout"], 1, ["You are starving.", "", "They might hear."], { yes: "🐕 " + mrbQ("I crept forward, saying \"Good dog!\" very softly; but he suddenly withdrew his head and disappeared.") }),
mzHold(MRW_SLIT, 12, "Listen. The pit is still. Only crows, and the flutter of wings", { r: 1.6 }),
mzRead("🕳️ Empty", mrbQs("I stared about me, scarcely believing my eyes. All the machinery had gone.") + mrSrc(mrBk(22)), "▶ Go on"),
mzGo(mrSh(0, -9.5), "Thrust yourself out through the red weed", { r: 2 }),
mzGo("pitrim2", "Scramble to the top of the mound of rubble", { r: 8 }),
mzHold("pitrim2", 12, "Look about you: no Martian to the south, none to the north. Sheen, as you never saw it", { r: 10 }),
mzRead("☀️ Dazzlingly bright", mrbQs("The day seemed, by contrast with my recent confinement, dazzlingly bright, the sky a glowing blue.") + mrSrc(mrBk(22)), "▶ To the next chapter")
] });
mrbCh({ t: "The Work of Fifteen Days", txt: 22, start: { sc: "sheen", x: -30, z: -14, ry: Math.PI }, jump: 1, tune: "night", keep: ["fifteen", "The red weed", "🌺"],
state: { env: function (s) { return s < 12 ? "red" : "dusk"; }, grey: true, shpit: true, weed: 3 },
words: "For some time you stand tottering on the mound. Within that den you had thought only of your own safety. Now you feel as a rabbit might, returning to his burrow to find it gone.",
intro: "The mound over the pit",
cast: [],
steps: [
{ k: "read" },
mzRead("🐇 Dethroned", mrbQs("For that moment I touched an emotion beyond the common range of men, yet one that the poor brutes we dominate know only too well. I felt as a rabbit might feel returning to his burrow and suddenly confronted by the work of a dozen busy navvies digging the foundations of a house.") + mrSrc(mrBk(23)), "▶ Go on"),
mzPuzzle("👑 Dethroned", "What do you understand, standing there?", ["That you are a king", "That man is no longer master, but an animal among the animals, under the Martian heel", "That the war is won"], 1, ["No.", "", "Not yet."], { yes: "👑 Then hunger takes you: your long and dismal fast." }),
mzGo("weed", "Wade through the red weed towards a garden, in search of food", { r: 12 }),
mzGather("fruit", mrSh(200, -60), 5, "Food", "Dig up young onions, gladiolus bulbs, unripe carrots; and mushrooms in a grassy place", { spread: 30 }),
mzGo(mrSh(160, -300), "Go on towards Mortlake, where a brown sheet of water floods the road", { r: 14 }),
mzRead("🌊 The red weed in the water", mrbQs("At Putney, as I afterwards saw, the bridge was almost lost in a tangle of this weed, and at Richmond, too, the Thames water poured in a broad and shallow stream across the meadows of Hampton and Twickenham.") + mrSrc(mrBk(23)), "▶ Go on"),
mzPuzzle("🦠 The canker", "What will at last kill the red weed?", ["The winter", "A cankering disease, caused it is believed by bacteria", "Men with scythes"], 1, ["Too slow.", "", "Too few."], { yes: "🦠 " + mrbQ("In the end the red weed succumbed almost as quickly as it had spread.") }),
mzFind("jar", mrSh(170, -320), "Water", "Slake your thirst at the water", {}),
mzHold(mrSh(170, -320), 10, "Gnaw a few fronds of the weed: watery, sickly, metallic", { r: 10 }),
mzGo(mrSh(300, -120), "On along the road towards Putney, among the wreckage of the familiar", { r: 16 }),
mzPuzzle("🐕 Dogs", "What living things do you meet, all this time?", ["Crowds", "No people, no Martians: only a couple of hungry dogs, who hurry away", "Soldiers"], 1, ["No.", "", "No."], { yes: "🐕 Near Roehampton you saw two human skeletons, not bodies, picked clean." }),
mzGo("putneyhill", "After sunset, struggle on up to the top of Putney Hill", { r: 12 }),
mzRead("🧍 The last man", mrbQs("For a time I believed that mankind had been swept out of existence, and that I stood there alone, the last man left alive.") + mrSrc(mrBk(23)), "▶ Go on"),
mzGo(mrwIn("sheen", "pub", 0, 1), "Go into the inn at the top of the hill", { r: 3 }),
mzGather("bread", mrwIn("sheen", "pub", -1.4, -2.4), 3, "Food", "Find bread, a tin of pineapple, a little food in the bar", { spread: 1.6 }),
mzHold(mrwIn("sheen", "pub", 2, 1), 12, "Sleep in a made bed for the first time since your flight to Leatherhead", { r: 3 })
] });
mrbCh({ t: "The Man on Putney Hill", txt: 23, start: { sc: "sheen", x: 610, z: -280, ry: Math.PI }, jump: 1, tune: "cottage", keep: ["putney", "The artilleryman's drain", "⛏️"],
state: { env: function (s) { return s < 16 ? "heath" : "night"; }, night: function (s) { return s >= 17; }, grey: true, shpit: true, weed: 3, shtri: function (s) { return s >= 17 ? "still" : "none"; } },
words: "You spent the night in the inn at the top of Putney Hill. Three things struggle for your mind: the killing of the curate, where the Martians are, and what has become of your wife.",
intro: "Putney Hill, morning",
cast: [mrc("artyworn", mrSh(700, -200), { ry: -Math.PI / 2, until: "house" }), mrc("artyworn", mrwIn("sheen", "arcell", 0.6, -1.0), { ry: Math.PI, from: "house", until: "roof" }), mrc("artyworn", mrSh(650, -334), { ry: 0, from: "roof", until: "cards" }), mrc("artyworn", mrwIn("sheen", "arty", 0.7, 0.8), { ry: Math.PI, from: "cards" })],
steps: [
{ k: "read" },
mzRead("🌄 Morning", mrbQs("The morning was bright and fine, and the eastern sky glowed pink, and was fretted with little golden clouds.") + mrSrc(mrBk(24)), "▶ Go on"),
mzGo(mrSh(680, -210), "Walk out towards Wimbledon Common: a man is standing there, with a cutlass", { r: 10 }),
mzSay("The artilleryman", "A man as dusty and filthy as yourself", "✋ Stop!", ["\"Stop!\" he cried, when I was within ten yards of him, and I stopped. His voice was hoarse. \"Where do you come from?\" he said.", "\"I come from Mortlake,\" I said. \"I was buried near the pit the Martians made about their cylinder. I have worked my way out and escaped.\"", "\"There is no food about here,\" he said. \"This is my country."], mrBk(24)),
mzSay("The artilleryman", "The man, staring", "🤝 You!", ["\"It is you,\" said he; \"the man from Woking. And you weren't killed at Weybridge?\"", "\"You are the artilleryman who came into my garden.\"", "\"Good luck!\" he said. \"We are lucky ones! Fancy you!\""], mrBk(24)),
mzSay("The artilleryman", "The artilleryman, in the bushes", "🐜 Eatable ants", ["\"This isn't a war,\" said the artilleryman. \"It never was a war, any more than there's war between man and ants.\"", "\"We're eatable ants.\""], mrBk(24)),
mzPuzzle("✈️ Fly", "What does he say the Martians have built, over Hampstead way?", ["A city", "A flying-machine, that they are learning to fly", "A wall"], 1, ["No.", "", "No."], { yes: "✈️ " + mrbQ("\"It is all over with humanity,\" I said. \"If they can do that they will simply go round the world.\"") }),
mzTalk("The artilleryman", "The artilleryman", ["🕳️ Under their feet", mrbQs("\"I do. I'm going on, under their feet. I've got it planned; I've thought it out. We men are beat. We don't know enough. We've got to learn before we've got a chance.") + "<p>Drains, sewers, the underground railways: a life down there, out of their way. Books, science, men who will learn to work the machines.</p>" + mrSrc(mrBk(24)), "▶ Go on"]),
mzRead("💪 A man indeed", mrbQs("\"Great God!\" cried I. \"But you are a man indeed!\" And suddenly I gripped his hand.") + mrSrc(mrBk(24)), "▶ Go on"),
mzId("house", mzGo("artyh", "Go with him to the house where he is working", { r: 8 })),
mzGo(mrwIn("sheen", "arcell", 0, 1), "Down the cellar steps, to the drain", { r: 2.5 }),
mzFind("spade", mrwIn("sheen", "arcell", 2.2, 0.2), "A spade", "Take up a spade", {}),
mzHold(mrwIn("sheen", "arcell", 0, -2.4), 16, "Dig with him all the morning: ten yards of tunnel he has made in a week", { r: 2.4 }),
mzPuzzle("📏 Ten yards", "Then you see it. How far has he dug, in a week?", ["To the main sewer", "About ten yards: you could do as much in a day", "Half a mile"], 1, ["Not close.", "", "No."], { yes: "📏 " + mrbQ("\"Oh, one can't always work,\" he said, and in a flash I saw the man plain.") }),
mzId("roof", mzGo("roof", "Go up with him to the roof, to reconnoitre", { r: 3 })),
mzHold("roof", 14, "Look out over London: the river, a bubbly mass of red weed; Lambeth flooded; no Martians", { r: 4 }),
mzId("cards", mzGo(mrwIn("sheen", "arty", 0, 1.2), "Go down to the house: he is host today", { r: 2.5 })),
mzSay("The artilleryman", "The artilleryman, with a bottle", "🍾 Champagne", ["\"There's some champagne in the cellar,\" he said.", "\"We can dig better on this Thames-side burgundy,\" said I.", "\"No,\" said he; \"I am host today. Champagne!"], mrBk(24)),
mzPuzzle("🃏 Euchre", "After the meal, what does he teach you?", ["Chess", "Euchre, and you divide London between you", "Whist"], 1, ["Not that.", "", "Not that."], { yes: "🃏 " + mrbQ("Strange mind of man!") }),
mzHold(mrwIn("sheen", "arty", 0, 0), 14, "Play cards, then poker, then chess, into the evening", { r: 2.5 }),
mzGo("roof", "Go up to the roof alone, as he smokes and drinks", { r: 3 }),
mzRead("🌌 Over London", mrbQs("I remained a very long time upon the roof, wondering at the grotesque changes of the day.") + mrSrc(mrBk(24)), "▶ To the next chapter")
] });
mrbCh({ t: "Dead London", txt: 24, start: { sc: "sheen", x: 650, z: -460, ry: Math.PI }, jump: 1, tune: "end", keep: ["deadlondon", "The Martians, dead", "🕊️"],
state: { env: function (s) { return s < 17 ? "red" : (s < 23 ? "dusk" : "dawn"); }, night: function (s) { return s >= 19 && s < 23; }, grey: true, shpit: true, weed: 3, prhowl: function (s) { return s < 20; }, prdead: function (s) { return s >= 20; }, drunk: function (s) { return s >= 2 && s < 6; } },
words: "You part from the artilleryman and go down the hill, and by the High Street across the bridge to Fulham.",
intro: "Putney, then London",
cast: [],
steps: [
{ k: "read" },
mzGo("pbridge", "Down the hill and across Putney Bridge: the red weed is tumultuous", { r: 12 }),
mzRead("🌺 The bridge", mrbQs("After I had parted from the artilleryman, I went down the hill, and by the High Street across the bridge to Fulham.") + mrSrc(mrBk(25)), "▶ Go on"),
mzGo("fulham", "On, past the end of the bridge", { r: 12 }),
mzPuzzle("🍺 A man lying", "At the corner of the lane to Putney Bridge station you find a man lying, black as a sweep with the black dust. What is wrong with him?", ["He is dead", "He is helplessly drunk, and curses you", "He is a Martian"], 1, ["He is alive.", "", "No."], { yes: "🍺 You leave him. There is black dust along the roadway from the bridge, thicker in Fulham." }),
mzRead("🏚️ Fulham", mrbQs("Where there was no black powder, it was curiously like a Sunday in the City, with the closed shops, the houses locked up and the blinds drawn, the desertion, and the stillness.") + mrSrc(mrBk(25)), "▶ Go on"),
mzRead("🔊 Ulla", mrbQs("In South Kensington the streets were clear of dead and of black powder. It was near South Kensington that I first heard the howling.") + mrbQs("\"Ulla, ulla, ulla, ulla,\" wailed that superhuman note--great waves of sound sweeping down the broad, sunlit roadway, between the tall buildings on each side.") + mrSrc(mrBk(25)), "▶ Go on"),
mzPuzzle("🧭 Which way?", "Where does the howling seem to come from?", ["The river", "The district about Regent's Park", "The east"], 1, ["No.", "", "No."], { yes: "🧭 You turn north, towards the iron gates of Hyde Park." }),
mzRead("🌳 Hyde Park", mrbQs("It was already past noon. Why was I wandering alone in this city of the dead?") + mrSrc(mrBk(25)), "▶ Go on"),
mzRead("🏛️ Marble Arch", mrbQs("I came into Oxford Street by the Marble Arch, and here again were black powder and several bodies, and an evil, ominous smell from the gratings of the cellars of some of the houses.") + mrSrc(mrBk(25)), "▶ Go on"),
mzPuzzle("🍷 Rest", "Hot and tired, what do you do in Oxford Street?", ["Run on", "Break into a public-house, eat and drink, and sleep on a sofa", "Shout for help"], 1, ["You cannot.", "", "No one would come."], { yes: "🍷 You wake at dusk with the howling still in your ears." }),
mzRead("🤖 The handling-machine", mrbQs("I came upon the wrecked handling-machine halfway to St. John's Wood station. At first I thought a house had fallen across the road.") + mrSrc(mrBk(25)), "▶ Go on"),
mzTravel("🌉 The canal", "On, through St. John's Wood, to the Regent's Canal, and the foot of Primrose Hill.", { sc: "primrose", x: -200, z: 268, ry: Math.PI }, "🌳 <b>The foot of Primrose Hill.</b> \"Ulla, ulla, ulla, ulla.\"", "▶ Walk on"),
mzGo("prfoot", "Over the canal bridge, towards the hill", { r: 10 }),
mzRead("🤫 Silence", mrbQs("As I crossed the bridge, the sound of \"Ulla, ulla, ulla, ulla,\" ceased. It was, as it were, cut off. The silence came like a thunderclap.") + mrSrc(mrBk(25)), "▶ Go on"),
mzHold("prfoot", 12, "Stand in the dusk among the tall dim houses. The windows are like the eye-sockets of skulls", { r: 12 }),
mzGo(mrwIn("primrose", "cab", 0, 1), "Shelter the night in a cabman's shelter at the corner", { r: 2.5 }),
mzHold(mrwIn("primrose", "cab", 0, 0), 12, "Sit out the night: an insane resolve comes to you, to walk up to the Martians and end it", { r: 2.5 }),
mzGo("prpath", "At dawn, march up the hill, through the red weed", { r: 10 }),
mzGo("prtop", "To the top: the great redoubt", { r: 8 }),
mzGo("redoubt", "Scramble up the earthen rampart and look down", { r: 5 }),
mzRead("💀 Dead!", mrbQs("In another moment I had scrambled up the earthen rampart and stood upon its crest, and the interior of the redoubt was below me.") + mrSrc(mrBk(25)), "▶ Go on"),
mzPuzzle("🦠 What killed them?", "What slew the Martians, after all man's devices had failed?", ["The guns", "The putrefactive and disease bacteria against which their systems were unprepared", "The cold"], 1, ["Never.", "", "No."], { yes: "🦠 " + mrbQ("For so it had come about, as indeed I and many men might have foreseen had not terror and disaster blinded our minds.") }),
mzHold("redoubt", 14, "Stand staring into the pit, as the rising sun strikes the world to fire", { r: 6 }),
mzGo("prview", "Turn and look out over London from the brow of the hill", { r: 6 }),
mzRead("🏙️ The Mother of Cities", mrbQs("All about the pit, and saved as by a miracle from everlasting destruction, stretched the great Mother of Cities.") + mrSrc(mrBk(25)), "▶ Go on"),
mzHold("prview", 12, "Look: the dome of St. Paul's dark against the sunrise; the Albert Hall; the Crystal Palace far off", { r: 8 }),
mzRead("💔 My wife", mrbQs("With overwhelming force came the thought of myself, of my wife, and the old life of hope and tender helpfulness that had ceased for ever.") + mrSrc(mrBk(25)), "▶ To the next chapter")
] });
mrbCh({ t: "Wreckage", txt: 25, start: { sc: "primrose", x: -600, z: 162, ry: Math.PI }, jump: 1, tune: "cottage", keep: ["wreckage", "Home", "🏡"],
state: { env: "heath", prdead: true, after: true, prkind: function (s) { return s < 6; }, prpeople: true, cyl: "empty", burnt: true, weed: true, tri: "fallen" },
words: "And now comes the strangest thing in your story. You remember all that you did that day until you stood weeping on Primrose Hill. And then you forget.",
intro: "St. John's Wood",
cast: [mrc("wife", mrW(392, 4), { ry: Math.PI, from: "fw" }), mrc("cousin", mrW(398, 6), { ry: Math.PI, from: "fw" })],
steps: [
{ k: "read" },
mzRead("🌫️ Three days", mrbQs("Of the next three days I know nothing.") + mrSrc(mrBk(26)), "▶ Go on"),
mzGo(mrwIn("primrose", "kbed", 0, 1), "You wake in a room in St. John's Wood", { r: 2.5 }),
mzGo(mrwIn("primrose", "kind", 0, 1.2), "Go down to the kind people of the house", { r: 2.5 }),
mzTalk("The man of the house", "The man of the house", ["🕊️ Leatherhead", "Very gently, when your mind is assured again, they tell you what they have learned of the fate of Leatherhead. Two days after you were imprisoned it was destroyed, with every soul in it, by a Martian." + mrSrc(mrBk(26)), "▶ Go on"]),
mzRead("😔 A lonely man", mrbQs("I was a lonely man, and they were very kind to me. I was a lonely man and a sad one, and they bore with me.") + mrSrc(mrBk(26)), "▶ Go on"),
mzHold(mrwIn("primrose", "kind", 0, 0), 12, "Stay with them four days after your recovery; then you must go", { r: 2.5 }),
mzGo("prfoot", "Go out into the streets: already busy with returning people", { r: 12 }),
mzFind("paper", mrP(-220, 260), "The first newspaper", "A placard against the red weed: the Daily Mail, the first paper to come out again", {}),
mzPuzzle("🍞 Food", "What has come into London, as the first news says?", ["Nothing yet", "Food: from France, Belgium, Ireland, and the ships coming in", "More Martians"], 1, ["It has.", "", "No."], { yes: "🍞 You go down to Waterloo, and find the trains running to Woking, for nothing." }),
mzTravel("🚂 To Byfleet", "The line on the London side of Woking station is still under repair, so you get down at Byfleet and take the road to Maybury.", { sc: "woking", x: -420, z: 400, ry: -Math.PI * 0.75 }, "🛤️ <b>Byfleet,</b> and the road home.", "▶ Go"),
mzGo(mrW(-200, 260), "On past where you and the artilleryman spoke to the hussars", { r: 16 }),
mzGo("common", "Turn aside to the common, to the pit", { r: 24 }),
mzHold("pitrim", 10, "Look into the pit at Horsell, where it began", { r: 10 }),
mzGo("spotted", "Back through the pine wood, neck-high with red weed, past the Spotted Dog", { r: 10 }),
mzGo("college", "Home past the College Arms", { r: 12 }),
mzGo("home", "To your house: the door has been forced", { r: 5 }),
mzGo(mrwIn("woking", "study", 0, 1.2), "Up to your study", { r: 2.5 }),
mzFind("note", mrwIn("woking", "study", 1.6, -2.3), "Your page", "On the writing-table, under the selenite paperweight, the sheet you left on the afternoon the cylinder opened", {}),
mzRead("📄 Moral ideas", mrbQs("I followed them to my study, and found lying on my writing-table still, with the selenite paper weight upon it, the sheet of work I had left on the afternoon of the opening of the cylinder.") + mrSrc(mrBk(26)), "▶ Go on"),
mzGo(mrwIn("woking", "dining", 0, 1.2), "Down to the dining-room: the mutton and bread just as you and the artilleryman left them", { r: 2.5 }),
mzRead("🏚️ Desolate", mrbQs("My home was desolate.") + mrSrc(mrBk(26)), "▶ The French window"),
mzId("fw", mzGo("garden", "Step to the open French window, and look out", { r: 8 })),
mzTalk("My wife", "Your wife and your cousin, at the window", ["💛 \"I came\"", mrbQs("And there, amazed and afraid, even as I stood amazed and afraid, were my cousin and my wife--my wife white and tearless. She gave a faint cry.", "\"I came,\" she said. \"I knew--knew----\"") + mrSrc(mrBk(26)), "▶ Go on"]),
mzRead("🤍 In my arms", mrbQs("She put her hand to her throat--swayed. I made a step forward, and caught her in my arms.") + mrSrc(mrBk(26)), "▶ To the Epilogue")
] });
mrbCh({ t: "The Epilogue", txt: 26, start: { sc: "woking", x: 400, z: 44, ry: Math.PI }, jump: 1, tune: "study", keep: ["epilogue", "The Epilogue", "📖"],
state: { env: function (s) { return s < 8 ? "heath" : "evening"; }, cyl: "empty", tri: "fallen" },
words: "You cannot but regret, now you are concluding your story, how little you can contribute to the questions still unsettled.",
intro: "Your study, after",
cast: [mrc("wife", mrW(392, 10), { ry: Math.PI })],
steps: [
{ k: "read" },
mzGo(mrwIn("woking", "study", 0, 1.2), "Sit down in your study to write it all", { r: 2.5 }),
mzPuzzle("🦠 The cause", "What was the cause of the Martians' death, as you write it?", ["The guns of the army", "Disease: no bacteria except the terrestrial were found in their bodies", "They starved"], 1, ["No.", "", "No."], { yes: "🦠 They did not bury their dead, and slaughtered recklessly: they knew nothing of putrefaction." }),
mzPuzzle("⚫ The Black Smoke", "What is the Black Smoke, as far as men know?", ["Coal smoke", "Still unknown: it may be a compound of argon with some unknown element", "Steam"], 1, ["No.", "", "No."], { yes: "⚫ And the Heat-Ray generator remains a puzzle." }),
mzPuzzle("🏛️ A specimen", "Where can everyone see an almost complete Martian, preserved?", ["In spirits at the Natural History Museum", "At the zoo", "In St. Paul's"], 0, ["", "No.", "No."], { yes: "🏛️ And countless drawings." }),
mzPuzzle("🔭 Again?", "What does Wells think men must watch for now?", ["Nothing", "Another attack: with every opposition of Mars, a watch on the planet", "The sea"], 1, ["He thinks otherwise.", "", "No."], { yes: "🔭 " + mrbQ("A question of graver and universal interest is the possibility of another attack from the Martians.") }),
mzPuzzle("🪐 Venus", "Where may the Martians have landed instead?", ["The moon", "Venus", "Jupiter"], 1, ["No.", "", "No."], { yes: "🪐 Lessing has advanced excellent reasons." }),
mzRead("🌍 Our views", mrbQs("At any rate, whether we expect another invasion or not, our views of the human future must be greatly modified by these events.") + mrSrc(mrBk(27)), "▶ Go on"),
mzHold(mrwIn("woking", "study", 0, -2.8), 12, "Look out of the study window: the healing valley below", { r: 2.2 }),
mzRead("🔥 Doubt", mrbQs("I must confess the stress and danger of the time have left an abiding sense of doubt and insecurity in my mind.") + mrSrc(mrBk(27)), "▶ Go on"),
mzGo("pitrim", "Walk once more to Horsell Common", { r: 12 }),
mzHold("pitrim", 10, "Stand at the pit where the first cylinder lay, in the evening", { r: 10 }),
mzGo("garden", "Home, to the garden", { r: 10 }),
mzTalk("My wife", "Your wife", ["🤍 Her hand", mrbQs("And strangest of all is it to hold my wife's hand again, and to think that I have counted her, and that she has counted me, among the dead.") + mrSrc(mrBk(27)), "▶ The end"])
] });
(function () {
function go() { try {
worldCard(null);
if (typeof CT !== "undefined" && CT.run)
ctStop(null);
}
catch (e) { } mrbOpenIn(); }
if (typeof ctsEnter === "function") {
var e0 = ctsEnter;
ctsEnter = function (id) { if (id === "martians") {
go();
return;
} return e0.apply(this, arguments); };
}
if (typeof ctStart === "function") {
var s0 = ctStart;
ctStart = function (id) { if (id === "martians") {
go();
return;
} return s0.apply(this, arguments); };
}
if (typeof ctBoard === "function") {
var b0 = ctBoard;
ctBoard = function (id) {
var r = b0.apply(this, arguments);
try {
if (id === "martians" && WLD.card) {
var e = WLD.card.querySelector("[data-w=enter]");
if (e)
e.innerHTML = "<b>🚪 Step into The War of the Worlds</b><div style='font-size:12px;opacity:.8'>H. G. Wells's whole book: both Books and all twenty-seven chapters, from Ogilvy's telescope and the cylinder on Horsell Common to Weybridge, the Thames, the flight to the sea, the ruined house at Sheen, and the silence on Primrose Hill.</div>";
}
}
catch (e) { }
return r;
};
}
})();
function mrbOpenIn() { if (WLD.on === MRW_KEY) {
mrbOpen();
return;
} mrwEnter({}); }
