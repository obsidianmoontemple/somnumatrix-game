/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var WQW_KEY = "winters-heart", WQW_NAME = "Winter's Heart", WQW_LONG = "Winter's Heart: the Snow Queen's true story";
var WQW = { base: -9650000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], moving: false, ride: null, night: 0, lights: 0, water: [], inst: [], beasts: [], hgt: null, ghosts: [], ships: [], flappers: [], spin: [], bob: [], sky: null, foes: [] };
var WQW_ERA = " This is the book Winter's Heart, A Snow Queen Tale, by S. Nightwell: the true story of the Snow Queen, as Kael the Ice King tells it. Glacia is Winter, eldest of five sister goddesses of the seasons (Talia is Spring, Alessia Summer, Cora Autumn, Marina Water); a demon, Malakar, forged a mirror that shattered and lodged a shard in her heart; Kael was Old Man Winter, cursed by the sorceress Gerda into a great white bear. Speak briefly and in character, warmly and plainly, as the people of the book do. Never criticise the book or change its story.";
var WQW_SC = {
palace: { x: -40000, name: "The Winter Palace, in the far north", bound: 1100, env: "frost" },
border: { x: -36000, name: "The boundary woods, where autumn meets winter", bound: 520, env: "borderwood" },
forge: { x: -32000, name: "Malakar's cold forge, in the deeps of Erebos", bound: 260, env: "forge", under: 1 },
valley: { x: -28000, name: "The valley of ancient ice", bound: 620, env: "blueice" },
sky: { x: -24000, name: "The heights, toward the divine barrier", bound: 900, env: "heights" },
autumn: { x: -20000, name: "Cora's realm of Autumn", bound: 700, env: "golden" },
spring: { x: -16000, name: "Talia's realm of Spring", bound: 700, env: "springday" },
crater: { x: -12000, name: "The crater in the foothills", bound: 700, env: "dusksnow" }
};
function wqwScAt(x) { var best = null, bd = 1e9; for (var k in WQW_SC) {
var d = Math.abs(x - WQW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 2000 ? best : null; }
var WQW_AT = {};
function wqwAtPt(at) { if (typeof at === "string")
at = WQW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
var WQW_ENV = {
land: { top: 0x5A7AB0, low: 0xE0ECF8, fog: 0xD0DCEA, fogD: 0.0018, sun: 0.9, sunCol: 0xF0F6FF, sunDir: [0.3, 0.5, -0.6], hemi: 0.82, hemiCol: 0xE8F0FF, hemiGround: 0x8A9AB0 },
frost: { top: 0x3A5A94, low: 0xDCE8F6, fog: 0xC8D6E8, fogD: 0.0016, sun: 0.95, sunCol: 0xFFF0E0, sunDir: [0.55, 0.28, -0.5], hemi: 0.78, hemiCol: 0xDCE8FF, hemiGround: 0x7A8AA4 },
frostnight: { top: 0x050A1E, low: 0x1A3050, fog: 0x14223A, fogD: 0.0022, sun: 0.32, sunCol: 0xB8D8FF, sunDir: [-0.3, 0.7, -0.4], hemi: 0.44, hemiCol: 0x6A8AC8, hemiGround: 0x14202E, stars: 1 },
aurora: { top: 0x040A1A, low: 0x1A3450, fog: 0x122438, fogD: 0.0016, sun: 0.4, sunCol: 0xD0E8FF, sunDir: [0.1, 0.8, -0.5], hemi: 0.55, hemiCol: 0x9AB4D8, hemiGround: 0x101C24, stars: 1 },
borderwood: { top: 0x6A84A8, low: 0xE0C8A8, fog: 0xC8B8A4, fogD: 0.0026, sun: 0.66, sunCol: 0xFFE0B0, sunDir: [0.6, 0.35, 0.2], hemi: 0.6, hemiCol: 0xF0DCC0, hemiGround: 0x5A4030 },
forge: { top: 0x04060E, low: 0x1A2A4A, fog: 0x14203A, fogD: 0.0065, sun: 0.45, sunCol: 0x9AC8FF, sunDir: [0.3, 1, 0.2], hemi: 0.75, hemiCol: 0x7A9AD8, hemiGround: 0x101828 },
blueice: { top: 0x0A1830, low: 0x2A4A7A, fog: 0x18304E, fogD: 0.0048, sun: 0.42, sunCol: 0xA8C8FF, sunDir: [0.2, 0.6, -0.6], hemi: 0.6, hemiCol: 0x8AACE0, hemiGround: 0x0A1424 },
heights: { top: 0x060E3A, low: 0x8AA8E8, fog: 0x9AB0E0, fogD: 0.0009, sun: 0.7, sunCol: 0xF0F4FF, sunDir: [0.2, 0.5, -0.8], hemi: 0.58, hemiCol: 0xC8D4F8, hemiGround: 0x6A7AA8, stars: 1 },
barrier: { top: 0x0A0A3A, low: 0xE8D8FF, fog: 0xC8C0F0, fogD: 0.0014, sun: 0.75, sunCol: 0xFFF8F0, sunDir: [0.1, 0.9, -0.4], hemi: 0.6, hemiCol: 0xE0D8F8, hemiGround: 0x6A5A98, stars: 1 },
golden: { top: 0x4A6AA8, low: 0xF0B868, fog: 0xD89A5A, fogD: 0.0022, sun: 0.85, sunCol: 0xFFB860, sunDir: [-0.75, 0.22, 0.3], hemi: 0.62, hemiCol: 0xFFD8A8, hemiGround: 0x6A3A1A },
autumnwither: { top: 0x3A4A6A, low: 0xA88A6A, fog: 0x8A7A6A, fogD: 0.003, sun: 0.55, sunCol: 0xE8C8A0, sunDir: [-0.75, 0.22, 0.3], hemi: 0.56, hemiCol: 0xC8B8A8, hemiGround: 0x3A2A1A },
springday: { top: 0x3A7AD8, low: 0xE8F4E8, fog: 0xD8ECD8, fogD: 0.0013, sun: 0.9, sunCol: 0xFFF6E0, sunDir: [0.3, 0.8, 0.3], hemi: 0.66, hemiCol: 0xE8F4E0, hemiGround: 0x4A7A3A },
springcold: { top: 0x5A6A8A, low: 0xB8C8C8, fog: 0xA8B8B8, fogD: 0.0024, sun: 0.6, sunCol: 0xE0E8F0, sunDir: [0.1, 0.95, 0.2], hemi: 0.6, hemiCol: 0xC8D8E0, hemiGround: 0x2A3A2A },
summer: { top: 0x2A6AD0, low: 0xFFF0C8, fog: 0xF0E0B8, fogD: 0.0012, sun: 1.3, sunCol: 0xFFF4D8, sunDir: [0.2, 0.95, 0.1], hemi: 0.9, hemiCol: 0xFFF8E0, hemiGround: 0x8A6A3A },
dusksnow: { top: 0x1A2450, low: 0xB8A0B0, fog: 0x8A8AA0, fogD: 0.0022, sun: 0.5, sunCol: 0xFFC8A8, sunDir: [-0.8, 0.18, 0.3], hemi: 0.56, hemiCol: 0xB8B8D8, hemiGround: 0x3A3A4A },
snownight: { top: 0x04081A, low: 0x182238, fog: 0x101A2C, fogD: 0.0028, sun: 0.26, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.38, hemiCol: 0x5A6A98, hemiGround: 0x0A0C14, stars: 1 },
icehall: { top: 0x14283E, low: 0x5A8AB0, fog: 0x24425E, fogD: 0.006, sun: 0.55, sunCol: 0xD8F0FF, sunDir: [0, 1, 0], hemi: 0.86, hemiCol: 0xD0ECFF, hemiGround: 0x2A4A6A },
coldfire: { top: 0x0E1E30, low: 0x3A6A8A, fog: 0x1A3044, fogD: 0.007, sun: 0.45, sunCol: 0xB8E8FF, sunDir: [0, 1, 0], hemi: 0.8, hemiCol: 0xB8E8FF, hemiGround: 0x1A3048 },
indoor: { top: 0x2A2420, low: 0x5A4A3A, fog: 0x3A3028, fogD: 0.008, sun: 0.35, sunCol: 0xFFE8C0, sunDir: [0.2, 0.9, 0.1], hemi: 0.82, hemiCol: 0xFFF0D8, hemiGround: 0x3A2E24 },
cottage: { top: 0x2A2018, low: 0x6A4A2A, fog: 0x3A2A1E, fogD: 0.008, sun: 0.4, sunCol: 0xFFC890, sunDir: [0.2, 0.9, 0.1], hemi: 0.78, hemiCol: 0xFFE0B8, hemiGround: 0x3A2818 },
enight: { top: 0x04060E, low: 0x10141E, fog: 0x0C0E14, fogD: 0.003, sun: 0.22, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.34, hemiCol: 0x5A6A98, hemiGround: 0x0A0C10, stars: 1 }
};
var WQW_Q = [];
function wqQ(s) { WQW_Q.push(s); return "<i>“" + String(s).replace(/\u0002/g, "-") + "”</i>"; }
function wqQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0'>" + wqQ(s) + "</p>"; }).join(""); }
var WQB_FOLK_AT = {};
function wqwLite() { return typeof LITE !== "undefined" && !!LITE; }
function wqwPhotoTex(name, mpt, nrm) { return __ZC(502, 0, this, arguments, new.target); }
function wqwS(name, col, mpt, o) { return __ZC(502, 1, this, arguments, new.target); }
function wqwCanvas(key, w, h, fn) { if (WQW.tex[key])
return WQW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (WQW.tex[key] = t); }
function wqwM(key, make) { return WQW.mats[key] || (WQW.mats[key] = make()); }
function wqwLam(col, o) { return __ZC(502, 2, this, arguments, new.target); }
function wqwShine(col, r, mt) { return wqwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function wqwGlowM(col, op) { return wqwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function wqwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function wqwLeafTex() { return wqwPhotoTexAlpha(); }
function wqwPhotoTexAlpha() { var k = "leafpng"; if (WQW.tex[k])
return WQW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (WQW.tex[k] = t); }
function wqwFrondTex(kind) { return __ZC(502, 3, this, arguments, new.target); }
function wqwBambooTex() { return __ZC(502, 4, this, arguments, new.target); }
function wqwReedTex(kind) { return __ZC(502, 5, this, arguments, new.target); }
function wqwGrassTex() { return __ZC(502, 6, this, arguments, new.target); }
function wqwFlowerTex(col) { return __ZC(502, 7, this, arguments, new.target); }
function wqwSkinTex(kind) { return __ZC(502, 8, this, arguments, new.target); }
function wqwRippleTex() { return __ZC(502, 9, this, arguments, new.target); }
function wqwWaterM(col, op) { return wqwM("water" + col + "|" + op, function () { var t = wqwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var WQW_CELL = 48;
function wqwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / WQW_CELL), b = Math.floor(x1 / WQW_CELL), c = Math.floor(z0 / WQW_CELL), d = Math.floor(z1 / WQW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function wqwGridAdd(S) { var g = WQW.sgrid || (WQW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; wqwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function wqwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; WQW.solids.push(S); wqwGridAdd(S); return S; }
function wqwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; WQW.solids.push(S); wqwGridAdd(S); return S; }
function wqwSolidAt(x, z, feet) { return __ZC(502, 10, this, arguments, new.target); }
function wqwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; WQW.floors.push(F); return F; }
function wqwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; WQW.floors.push(F); return F; }
function wqwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function wqwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function wqwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < WQW.floors.length; i++) {
var F = WQW.floors[i];
if (F.off || !wqwFloorIn(F, x, z))
continue;
var y = wqwFloorY(F, x, z);
if (y <= feet + 1.1 && (best === null || y > best))
best = y;
} return best; }
function wqwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; WQW.spots.push(S); return S; }
function wqwPerson(seed, x, z, y, o, ry) { return __ZC(502, 11, this, arguments, new.target); }
function wqwTalk(P, name, persona, greet, r, fn) { WQW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona + WQW_ERA, greet: greet } }); return P; }
function wqwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(502, 12, this, arguments, new.target); }
function wqwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function wqwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = wqwHash(ix, iz), b = wqwHash(ix + 1, iz), c = wqwHash(ix, iz + 1), d = wqwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function wqwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * wqwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function wqwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function wqwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), wqwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); WQW.water.push(m); return m; }
var WQW_GEO = {};
function wqwGeo(k, make) { if (WQW_GEO[k])
return WQW_GEO[k]; var g = make(); g.userData.shared = 1; return (WQW_GEO[k] = g); }
function wqwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function wqwFronds(n, len, wid, droop, y0, ring) { return __ZC(502, 13, this, arguments, new.target); }
function wqwInst(P, geo, mat, list, o) { return __ZC(502, 14, this, arguments, new.target); }
function wqwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function wqwPathD(x, z, pts) { var best = 1e9; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = Math.sqrt(px * px + pz * pz);
if (d < best)
best = d;
} return best; }
function wqwStrip(P, pts, w, hfn, mat, lift) { return __ZC(502, 15, this, arguments, new.target); }
function wqwPlant(P, kind, list, o) { return __ZC(502, 16, this, arguments, new.target); }
function wqwTaper(pts, rads, seg, rs, flat) { return __ZC(502, 17, this, arguments, new.target); }
function wqwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function wqwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function wqwSkinM(kind, col) { return __ZC(502, 18, this, arguments, new.target); }
function wqwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), wqwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function wqwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(502, 19, this, arguments, new.target); }
function wqwBoxG(w, h, d) { return __ZC(502, 20, this, arguments, new.target); }
function wqwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(wqwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !wqwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
wqwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function wqwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(wqwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function wqwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(502, 21, this, arguments, new.target); }
function wqwHouse(P, x, z, w, d, h, o) { return __ZC(502, 22, this, arguments, new.target); }
function wqwLand(x, z) { return WQW.hgt ? WQW.hgt(x, z) : 0; }
function wqwGround(x, z, feet) { var f = wqwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = wqwLand(x, z); return f === null ? h : Math.max(f, h); }
var WQW_SCN = {};
function wqwSc() { return WQW_SC[WQW.sc] || WQW_SC.richmond; }
function wqwSceneDrop() { return __ZC(502, 23, this, arguments, new.target); }
function wqwScene(k) { return __ZC(502, 24, this, arguments, new.target); }
function wqwVeil() { if (WQW.veil)
return WQW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); WQW.veil = v; return v; }
function wqwGo(at, msg, after) { return __ZC(502, 25, this, arguments, new.target); }
function wqwSmoke(P, x, y, z, col, n) { return __ZC(502, 26, this, arguments, new.target); }
function wqwFire(P, x, y, z, s) { return __ZC(502, 27, this, arguments, new.target); }
function wqwLocalSc() { var L = worldLocal(); return { x: L.x - wqwSc().x, z: L.z }; }
var WQW_HOUSE = { h1: 3.7 };
function wqwMat(k) { return __ZC(502, 28, this, arguments, new.target); }
function wqwChair(P, x, z, ry, mat, arm) { return __ZC(502, 29, this, arguments, new.target); }
function wqwTable(P, x, z, w, d, h, mat, cloth) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
wqwBox(g, w, 0.06, d, cloth || mat, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { wqwBox(g, 0.07, h - 0.06, 0.07, mat, q[0] * (w / 2 - 0.1), 0, q[1] * (d / 2 - 0.1)); });
if (cloth)
wqwBox(g, w + 0.06, 0.3, d + 0.06, cloth, 0, h - 0.34, 0);
return g;
}
function wqwShelves(P, x, z, w, h, ry) { return __ZC(502, 30, this, arguments, new.target); }
function wqwLily(P, x, y, z) { return __ZC(502, 31, this, arguments, new.target); }
function wqwRug(P, x, z, w, d, col) { return __ZC(502, 32, this, arguments, new.target); }
function wqwWallZ(P, z, x0, x1, mat, inner, gaps, h) { return __ZC(502, 33, this, arguments, new.target); }
function wqwWallX(P, x, z0, z1, mat, inner, gaps, h) { return __ZC(502, 34, this, arguments, new.target); }
function wqwPaper(P, x0, x1, z0, z1, mat, dx, dz) { return __ZC(502, 35, this, arguments, new.target); }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
var pick = function (a, r) { return a[Math.floor(r * a.length) % a.length]; };
Object.assign(DLN_WEAR, {
wqqueen: function (o) { return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.26:satin", "oz:pelerine"], col: { dress: 0xF4F8FC, skirt: 0xE8F2FA, trim: 0xBFE0F8, cape: 0xFFFFFF }, shoes: 0xD8E8F4 }; },
wqwinter: function (o) { return { ids: ["oz:shirt:long:fur", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:belt", "oz:boots"], col: { shirt: 0xE8ECF0, coat: 0x8A96A4, trou: 0x4A5460, belt: 0x2A3038 }, shoes: 0x2A3038 }; },
wqfur: function (o) { var c = pick([0x6A5040, 0x5A4A3A, 0x7A6A58, 0x4A4038, 0x8A6A4A], o.r); return { ids: ["oz:shirt:long:fur", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:belt", "oz:boots"], col: { shirt: 0xD8CCB8, coat: c, trou: 0x3A3028, belt: 0x1E1610 }, shoes: 0x2A1E14 }; },
wqfurf: function (o) { var c = pick([0x7A3A2A, 0x3A5A6A, 0x6A5A3A, 0x5A3A4A, 0x4A6A5A], o.r); return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.16:cloth", "oz:pelerine"], col: { dress: c, skirt: c, trim: 0xE8E0D0, cape: 0xD8CCB8 }, shoes: 0x2A1E14 }; },
wqspring: function (o) { return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.22:satin", "oz:sash"], col: { dress: 0x8AC88A, skirt: 0xA8D8A0, trim: 0xF8C8D8, sash: 0xF8B8D0 }, shoes: 0xE8D8C0 }; },
wqsummer: function (o) { return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.22:satin", "oz:sash"], col: { dress: 0xF0C850, skirt: 0xF8D870, trim: 0xFFF0C0, sash: 0xE89030 }, shoes: 0xD8B070 }; },
wqautumn: function (o) { return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.22:satin", "oz:sash"], col: { dress: 0xA8381A, skirt: 0xC85A20, trim: 0xE8A040, sash: 0x6A2A10 }, shoes: 0x4A2A14 }; },
wqcabaret: function (o) { var c = pick([0x8A0A1A, 0x1A0A14, 0x6A1A4A, 0xC8A040], o.r); return { ids: ["oz:bodice:long:satin", "oz:skirt:knee:0.12:satin", "oz:sash"], col: { dress: c, skirt: c, trim: 0xE8C860, sash: 0x0A0A0A }, shoes: 0x0A0A0A }; },
wqsea: function (o) { return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.24:satin", "oz:sash"], col: { dress: 0x2A6A9A, skirt: 0x3A8AB0, trim: 0xBFE8F0, sash: 0xE8F0F4 }, shoes: 0xC8D8E0 }; },
wqdemon: function (o) { return { ids: ["oz:shirt:long:leather", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:belt", "oz:boots"], col: { shirt: 0x140A0A, coat: 0x1A0A0A, trou: 0x0A0A0A, belt: 0x8A2A0A }, shoes: 0x0A0A0A }; },
wqwitch: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.2:cloth", "oz:pelerine"], col: { dress: 0x3A1A4A, skirt: 0x2A1438, trim: 0x8A6AA8, cape: 0x1A0E22 }, shoes: 0x1A1018 }; },
wqservant: function (o) { var c = pick([0xBFD8EC, 0xA8C0D8, 0xD8E4F0], o.r); return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.14:cloth", "oz:apron:half"], col: { dress: c, skirt: c, trim: 0xFFFFFF, apron: 0xFFFFFF }, shoes: 0x4A5460 }; },
wqgala: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:satin", "oz:coat:tails:cloth", "oz:trousers:cloth"], col: { shirt: 0xFAF8F2, collar: 0xFAF8F2, tie: 0x6A0A14, vest: 0x2A0A10, coat: 0x0E0A10, trou: 0x0E0A10 }, shoes: 0x0A0A0C }; },
wqgown: function (o) { var c = pick([0x5A0A14, 0x0E0A14, 0x2A0A3A, 0x1A1A2A, 0xC8B8D8], o.r); return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.18:satin"], col: { dress: c, skirt: c, trim: 0xC8A860 }, shoes: 0x1A1414 }; },
wqfae: function (o) { var c = pick([0x8AE8B8, 0xE8B8E8, 0xF0D878, 0xB8D8F8, 0xF8C8A8, 0xC8F0A0], o.r); return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.22:satin", "oz:sash"], col: { dress: c, skirt: c, trim: 0xFFF0C0, sash: pick([0xE8C860, 0xFFFFFF, 0x8AC8A8], o.r * 3) }, shoes: 0xD8C8A8 }; },
wqelf: function (o) { return { ids: ["oz:shirt:long:satin", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:sash"], col: { shirt: 0xE8ECF4, coat: pick([0xC8D0E0, 0xA8B4C8, 0xE0E4EC], o.r), trou: 0xB8C0D0, sash: 0x8A9AC8 }, shoes: 0xC8C8D0 }; },
wqelff: function (o) { var c = pick([0xD8E0F0, 0xC0C8E0, 0xE8E8F4], o.r); return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.2:satin", "oz:sash"], col: { dress: c, skirt: c, trim: 0xA8B8E8, sash: 0x8A9AC8 }, shoes: 0xC8C8D0 }; },
wqfrost: function (o) { return { ids: ["oz:shirt:long:fur", "oz:coat:military:cloth", "oz:trousers:cloth", "oz:belt", "oz:boots"], col: { shirt: 0xF0F4F8, coat: 0xD8E4F0, trou: 0x8AA4C0, belt: 0x4A5A6A }, shoes: 0x3A4A5A }; },
wqfrostcourt: function (o) { var c = pick([0xC8E0F8, 0xE8F0FA, 0x8AB0D8], o.r); return { ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.22:satin", "oz:pelerine"], col: { dress: c, skirt: c, trim: 0xFFFFFF, cape: 0xF4F8FC }, shoes: 0xD8E0E8 }; },
wqfrostlord: function (o) { return { ids: ["oz:shirt:long:satin", "oz:vest:satin", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xF4F8FC, vest: 0x8AB0D8, coat: 0xE8F0FA, trou: 0x5A7A9A }, shoes: 0x3A4A5A }; },
wqmage: function (o) { var c = o.c != null ? o.c : pick([0x2A3A7A, 0x4A2A6A, 0x1A4A5A], o.r); return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:sash"], col: { shirt: 0xE8E4D8, coat: c, trou: 0x2A2A34, sash: 0xC8A860 }, shoes: 0x2A2018 }; },
wqrobe: function (o) { var c = o.c != null ? o.c : pick([0x2A6A9A, 0x8A2A1A, 0x3A6A2A, 0xD8D8E8], o.r); return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.18:cloth", "oz:sash"], col: { dress: c, skirt: c, trim: 0xE8D8A0, sash: 0xC8A860 }, shoes: 0x5A4030 }; },
wqtown: function (o) { var c = pick([0x6A5A3A, 0x3A5A6A, 0x7A3A2A, 0x4A6A3A], o.r); return { ids: ["oz:shirt:long:cloth", "oz:vest:cloth", "oz:trousers:cloth", "oz:belt"], col: { shirt: 0xE0D8C8, vest: c, trou: 0x4A4034, belt: 0x2A1E14 }, shoes: 0x3A2A1E }; },
wqtownf: function (o) { var c = pick([0x8A5A3A, 0x3A6A8A, 0xA83A3A, 0x5A7A4A, 0xC8A860], o.r); return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.16:cloth", "oz:apron:half"], col: { dress: c, skirt: c, trim: 0xF0E8D8, apron: 0xF0EAD8 }, shoes: 0x3A2A1E }; },
wqcorasuit: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:satin", "oz:coat:long:cloth", "oz:trousers:cloth"], col: { shirt: 0xF4E8D8, collar: 0xF4E8D8, tie: 0x6A0A14, vest: 0x5A0A1A, coat: 0x9A0E1A, trou: 0x7A0A14 }, shoes: 0x1A0A08 }; },
wqhealer: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.18:cloth", "oz:sash"], col: { dress: 0x5A9A5A, skirt: 0x4A8A6A, trim: 0xE8E0A8, sash: 0xC8A0E8 }, shoes: 0x6A5030 }; }
});
var all = ["wqqueen", "wqwinter", "wqfur", "wqfurf", "wqspring", "wqsummer", "wqautumn", "wqcabaret", "wqsea", "wqdemon", "wqwitch", "wqservant", "wqgala", "wqgown", "wqfae", "wqelf", "wqelff", "wqfrost", "wqfrostcourt", "wqfrostlord", "wqmage", "wqrobe", "wqtown", "wqtownf", "wqhealer", "wqcorasuit"];
var H = {}, Hd = {};
all.forEach(function (k) { H[k] = [null]; Hd[k] = [null]; });
Hd.wqhealer = [null, "flowers"];
Hd.wqspring = [null, "flowers"];
Hd.wqfur = [null, "stick"];
Hd.wqwinter = ["stick"];
Hd.wqfrost = [null, "stick"];
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, H);
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, Hd);
})();
function wqwGhostly(g) { return __ZC(502, 36, this, arguments, new.target); }
function wqwCrx(key, s) { return __ZC(502, 37, this, arguments, new.target); }
function wqwDressed(seed, dress, o) { return __ZC(502, 38, this, arguments, new.target); }
var WQW_P = {
village: "You live in a village at the edge of the Winter Wastes, in furs and wool, where the winters are long and everyone has heard of the Snow Queen in her palace of ice. You are wary of strangers and kind to those who are cold.",
crater: "You live in the village hidden in the crater, sheltered from the winds of the wastes. You remember the Snow Queen's lightning bolt that made it, and you do not speak of her lightly.",
palace: "You serve in the Snow Queen's Winter Palace: polished ice, cold fire in the grand hearth, silence in the halls. You are loyal, careful, and a little afraid of her moods, but you have seen her kindness too.",
spring: "You live in Talia's realm of Spring: blossom, birdsong, rain on new leaves. You love your queen, who is gentle and fierce about her sisters.",
summer: "You live in Alessia's realm of Summer: long gold days, warm fields, wild sea. You are proud and merry and quick to laugh.",
autumn: "You live in Cora's realm of Autumn: red and amber leaves, harvest, woodsmoke. Your queen is sharp, clever and fiercely loyal, and The Threshold is her cabaret, where anything can be said aloud.",
threshold: "You work at The Threshold, Cora's cabaret in the realm of Autumn: velvet, candlelight, music and secrets. You are worldly, amused and discreet.",
sea: "You live in Marina's realm of the sea, among the tides and the deep blue halls.",
hunt: "You live in a small village in the far north. You are frightened: people are vanishing, and they say the Snow Queen has been seen hunting."
};
function wqwPersona(k) { return (WQW_P[k] || k || "") + WQW_ERA; }
var WQW_FOLK = {};
function wqwFolk(key, x, z, ry, o) { return __ZC(502, 39, this, arguments, new.target); }
function wqwCrowd(seed, n, x0, z0, x1, z1, o) { return __ZC(502, 40, this, arguments, new.target); }
var WQW_SKINS = [0xF0D8C8, 0xE8C8B0, 0xD8B090, 0xC09070, 0xA87858, 0x8A5A3A, 0x6A4228, 0x4A2E1E];
var WQW_IN_Y = -3000;
function wqwInAt(sc, i, dx, dz, name, ry) { var S = WQW_SC[sc]; return { sc: sc, x: S.bound + 160 + (i % 6) * 80 + (dx || 0), z: Math.floor(i / 6) * 80 + (dz || 0), y: WQW_IN_Y, name: name, ry: ry }; }
(function () {
var s0 = wqwScene;
wqwScene = function (k) {
s0.apply(this, arguments);
var S = WQW_SC[k], h0 = WQW.hgt;
if (!S || !h0)
return;
WQW.hgt = function (x, z) { if (x > S.bound + 60)
return WQW_IN_Y - 100; return h0(x, z); };
};
})();
function wqwRoomBuild(G, sc, i, W, D, H, o) { return __ZC(502, 41, this, arguments, new.target); }
function wqwDoorTo(G, sc, i, x, z, ry, name, W, D, o) { return __ZC(502, 42, this, arguments, new.target); }
function wqwEnterable(G, sc, i, x, z, ry, name, room, o) { return __ZC(502, 43, this, arguments, new.target); }
function wqwBed(P, x, z, ry, col) { return __ZC(502, 44, this, arguments, new.target); }
function wqwChest(P, x, z, ry) { var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry || 0; P.add(g); wqwBox(g, 1.1, 0.6, 0.6, wqwMat("oak"), 0, 0, 0); wqwBox(g, 1.14, 0.08, 0.64, wqwMat("iron"), 0, 0.6, 0); wqwBox(g, 0.12, 0.14, 0.04, wqwMat("brass"), 0, 0.42, 0.31); return g; }
function wqwGlobe(P, x, z, s, sky) { return __ZC(502, 45, this, arguments, new.target); }
function wqwTelescope(P, x, z, ry, len, y) { return __ZC(502, 46, this, arguments, new.target); }
function wqwQuadrant(P, x, z, ry) { return __ZC(502, 47, this, arguments, new.target); }
function wqwFurnish(g, W, D, kind, seed) { return __ZC(502, 48, this, arguments, new.target); }
function wqwDense(pts, step) { step = step || 6; var out = []; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
for (var k = 0; k < n; k++)
out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
} out.push(pts[pts.length - 1]); return out; }
function wqwGoOut(msg) { var B = WQW.lastBack; if (!B || B.sc !== WQW.sc)
return false; wqwGo(B, msg || null, typeof wqbPopulate === "function" ? wqbPopulate : null); return true; }
function wqwMerge(list) { return __ZC(502, 49, this, arguments, new.target); }
function wqcMoons(P, o) { return __ZC(502, 50, this, arguments, new.target); }
function wqcCrystal(P, x, y, z, h, col, o) { return __ZC(502, 51, this, arguments, new.target); }
function wqcGlowTrees(P, list, o) { return __ZC(502, 52, this, arguments, new.target); }
function wqcFlowers(P, list, cols) { return __ZC(502, 53, this, arguments, new.target); }
function wqcRune(P, x, z, h, col, ry, o) { return __ZC(502, 54, this, arguments, new.target); }
function wqcMotes(P, n, x, z, r, y0, y1, col) { return __ZC(502, 55, this, arguments, new.target); }
function wqcPortal(P, x, y, z, r, col, ry) { return __ZC(502, 56, this, arguments, new.target); }
function wqxHaloTex() { return __ZC(502, 57, this, arguments, new.target); }
function wqxGlowStart() { return { pos: [], col: [], size: [] }; }
function wqxGlow(L, x, y, z, col, s) { if (!L)
return; L.pos.push(x, y, z); var c = new THREE.Color(col || 0xFFC070); L.col.push(c.r, c.g, c.b); L.size.push(s || 0.6); }
function wqxGlowDone(P, L, size) { return __ZC(502, 58, this, arguments, new.target); }
function wqxCandles(P, list, L, o) { return __ZC(502, 59, this, arguments, new.target); }
function wqxGilt() { return wqwShine(0xC89A3A, 0.32, 0.85); }
function wqxBrass() { return wqwShine(0xB8903A, 0.38, 0.8); }
function wqxSconce(P, x, y, z, ry, L, cl) { return __ZC(502, 60, this, arguments, new.target); }
function wqxChandelier(P, x, y, z, r, tiers, L, cl, ceil) { return __ZC(502, 61, this, arguments, new.target); }
function wqxDrapeGeo(w, h, folds, depth) { return __ZC(502, 62, this, arguments, new.target); }
function wqxDrape(P, x, y, z, w, h, ry, mat, o) { return __ZC(502, 63, this, arguments, new.target); }
function wqxSwag(P, x, y, z, w, drop, ry, mat) { return __ZC(502, 64, this, arguments, new.target); }
function wqxMirrorGlassM(tint) { return __ZC(502, 65, this, arguments, new.target); }
function wqxMirror(P, x, y, z, w, h, ry, o) { return __ZC(502, 66, this, arguments, new.target); }
function wqxPanelling(P, w, d, H, o) { return __ZC(502, 67, this, arguments, new.target); }
function wqxShaft(P, x, y, z, len, r0, r1, col, op, tx, ty, tz) { return __ZC(502, 68, this, arguments, new.target); }
function wqxPool(P, x, y, z, r, col, op) { return __ZC(502, 69, this, arguments, new.target); }
function wqxCafeTable(P, x, z, r, cloth, L, o) { return __ZC(502, 70, this, arguments, new.target); }
function wqxLamp(P, x, y, z, L, col) { return __ZC(502, 71, this, arguments, new.target); }
function wqxLeaves(P, cx, cy, cz, rx, ry, rz, n, seed, cols) { return __ZC(502, 72, this, arguments, new.target); }
function wqxTreeGeo(kind) { return __ZC(502, 73, this, arguments, new.target); }
function wqxCrownGeo(kind) { return __ZC(502, 74, this, arguments, new.target); }
function wqxLeafM(col) { return wqwM("wqxLeaf" + col, function () { var m = new THREE.MeshLambertMaterial({ color: col, map: wqwLeafTex(), alphaTest: 0.45, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }); }
function wqxTrees(P, kind, list, cols, o) { return __ZC(502, 75, this, arguments, new.target); }
function wqxStainedTex(kind) { return __ZC(502, 76, this, arguments, new.target); }
function wqxStainedM(kind, bright) { return wqwM("wqxSGM" + kind + (bright || 1), function () { var m = new THREE.MeshBasicMaterial({ map: wqxStainedTex(kind), transparent: true, alphaTest: 0.1, color: new THREE.Color(bright || 1, bright || 1, bright || 1) }); m.userData.noPhoto = 1; return m; }); }
function wqxLanternPost(P, x, y, z, L, h) { return __ZC(502, 77, this, arguments, new.target); }
var WQF_U = { time: { value: 0 } };
function wqfFlameGeo() { return __ZC(502, 78, this, arguments, new.target); }
function wqfFlameMat(k) { return __ZC(502, 79, this, arguments, new.target); }
function wqfFlame(P, x, y, z, w, h, k) {
var f = new THREE.Mesh(wqfFlameGeo(), wqfFlameMat(k));
f.scale.set(w, h, w);
f.position.set(x, y, z);
f.rotation.y = (x * 7.3 + z * 3.1) % 6.28;
f.onBeforeRender = function () { WQF_U.time.value = performance.now() / 1000; };
P.add(f);
return f;
}
function wqiIceTex(kind) { return __ZC(502, 80, this, arguments, new.target); }
function wqiIce(col, o) { return __ZC(502, 81, this, arguments, new.target); }
function wqiSnowM() { return wqwS("snow", 0xFFFFFF, 5, { vc: 1 }); }
function wqiSpireGeo(tw) { return __ZC(502, 82, this, arguments, new.target); }
function wqiSpire(P, x, y, z, r, h, mat, tw) { var m = new THREE.Mesh(wqiSpireGeo(tw || 3), mat); m.scale.set(r, h, r); m.position.set(x, y, z); P.add(m); return m; }
function wqiIcicles(P, x0, x1, y, z, ry, n, len, mat) { return __ZC(502, 83, this, arguments, new.target); }
function wqiCarvedTex() { return __ZC(502, 84, this, arguments, new.target); }
Object.assign(WQW_AT, {
road: { sc: "palace", x: 23, z: 1000, name: "the ice road from the North Pole", ry: 0 },
gates: { sc: "palace", x: 0, z: 150, name: "the gates of the Winter Palace", ry: 0 },
gatesIn: { sc: "palace", x: 0, z: 92, name: "inside the gates" },
court: { sc: "palace", x: 0, z: 46, name: "the courtyard" },
fall: { sc: "palace", x: 0, z: 24, name: "the frozen waterfall" },
sleigh: { sc: "palace", x: 54, z: 40, name: "the ice sleigh" },
doors: { sc: "palace", x: 0, z: -58, name: "the great doors of the palace" },
wastesN: { sc: "palace", x: -260, z: 420, name: "the wastes" },
wastesE: { sc: "palace", x: 380, z: 200, name: "the wastes, east" },
hall: wqwInAt("palace", 2, 0, 24, "the great hall", 0),
hallThrone: wqwInAt("palace", 2, 0, -20, "the throne of ice"),
hearth: wqwInAt("palace", 0, 0, 18, "the hall of the grand hearth", 0),
hearthFire: wqwInAt("palace", 0, 0, -14, "the grand hearth"),
shards: wqwInAt("palace", 1, 0, 8, "the shard chamber", 0),
shardBox: wqwInAt("palace", 1, 0, -1, "the silver box on its pedestal"),
library: wqwInAt("palace", 3, 0, 6, "the library of ancient tomes", 0),
bower: wqwInAt("palace", 4, 0, 5, "Glacia's chamber", 0)
});
function wqiPalaceH(x, z) { return __ZC(502, 85, this, arguments, new.target); }
var WQI = {};
WQW_SCN.palace = { h: wqiPalaceH, start: { x: 23, z: 1000, ry: 0 },
build: function (G) { return __ZC(502, 86, this, arguments, new.target); } };
WQB_FOLK_AT.palace = [];
(function () { var b0 = WQW_SCN.palace.build; WQW_SCN.palace.build = function (G) { b0(G); wqiRooms(G); }; })();
function wqiRoomIce(o) { return Object.assign({ wall: wqiIce(0xCFE6F8, { rep: 0.1 }), floor: wqiIce(0xB8D6EE, { rep: 0.08, e: 0x183858 }), ceil: wqiIce(0xE0F0FC, { rep: 0.08 }), day: 0xD8F0FF, env: "icehall" }, o || {}); }
function wqiRoomDoor(g, A, lx, lz, ry, name, to, msg) { return __ZC(502, 87, this, arguments, new.target); }
function wqiRooms(G) { return __ZC(502, 88, this, arguments, new.target); }
Object.assign(WQW_AT, {
borderIn: { sc: "border", x: -40, z: 300, name: "the winter side of the woods", ry: 0 },
borderFrost: { sc: "border", x: -30, z: 180, name: "where the frost spreads" },
rabbit: { sc: "border", x: -18, z: 96, name: "the frozen rabbit" },
borderLine: { sc: "border", x: 0, z: 20, name: "the boundary, where autumn meets winter" },
coraWalk: { sc: "border", x: 14, z: 10, name: "Cora, among the falling leaves" },
borderFar: { sc: "border", x: 4, z: -180, name: "the path along the boundary" }
});
function wqtBorderH(x, z) { return wqwFbm(x * 0.012, z * 0.012, 4) * 6 + wqwFbm(x * 0.05, z * 0.05, 2) * 0.8 + Math.max(0, Math.hypot(x, z) - 420) * 0.6; }
function wqtSnowK(x, z) { return wqwSmooth(10, -14, x + Math.sin(z * 0.03) * 10 + wqwFbm(x * 0.05, z * 0.05, 2) * 10); }
WQW_SCN.border = { h: wqtBorderH, start: { x: -40, z: 300, ry: 0 },
build: function (G) { return __ZC(502, 89, this, arguments, new.target); } };
var WQW_RABBIT = null;
WQB_FOLK_AT.border = [["fox", -20, 250, 1.2], ["hare", 30, 210, -0.6], ["stag", -90, 180, 0.4], ["hare", 50, 270, 2]];
function wqiFreeze(g) { return __ZC(502, 90, this, arguments, new.target); }
Object.assign(WQW_AT, {
forgeIn: { sc: "forge", x: 0, z: 150, name: "the way down into the pit", ry: 0 },
forgeFire: { sc: "forge", x: 0, z: 30, name: "the cold fires" },
forgeAnvil: { sc: "forge", x: 0, z: -10, name: "the anvil of black ice" },
forgeMirror: { sc: "forge", x: -14, z: -40, name: "the mirror, finished" }
});
function wqtForgeH(x, z) { var r = Math.hypot(x, z); return -Math.min(r, 200) * 0.05 + wqwFbm(x * 0.06, z * 0.06, 2) * 1.4 + Math.max(0, r - 200) * 1.6; }
WQW_SCN.forge = { h: wqtForgeH, start: { x: 0, z: 150, ry: 0 },
build: function (G) { return __ZC(502, 91, this, arguments, new.target); } };
var WQW_FORGE_MIRROR = null;
WQB_FOLK_AT.forge = [["malakar", 4, -14, Math.PI * 0.9]];
function wqtMirror(P, x, y, z, ry, o) { return __ZC(502, 92, this, arguments, new.target); }
Object.assign(WQW_AT, {
valleyIn: { sc: "valley", x: 0, z: 520, name: "the mouth of the valley", ry: 0 },
valleyMid: { sc: "valley", x: -10, z: 240, name: "the valley floor" },
valleyDeep: { sc: "valley", x: 6, z: 40, name: "the deepest part of the valley" },
mirrorAt: { sc: "valley", x: 14, z: -30, name: "something lying on the ice" },
valleyWings: { sc: "valley", x: 0, z: -120, name: "the head of the valley, under the open sky" }
});
function wqtValleyH(x, z) { var w = 60 + Math.max(0, z) * 0.12, d = Math.abs(x + Math.sin(z * 0.01) * 30); return wqwFbm(x * 0.02, z * 0.02, 3) * 2 + Math.max(0, d - w) * 0.9 + Math.pow(Math.max(0, d - w) / 60, 2) * 20 + Math.max(0, -z - 200) * 0.7; }
WQW_SCN.valley = { h: wqtValleyH, start: { x: 0, z: 520, ry: 0 },
build: function (G) { return __ZC(502, 93, this, arguments, new.target); } };
var WQW_VALLEY_MIRROR = null;
WQB_FOLK_AT.valley = [["wolfwild", -110, 330, 0.8], ["fox", 60, 430, -1.4]];
Object.assign(WQW_AT, {
skyLow: { sc: "sky", x: 0, z: 720, name: "above the clouds", ry: 0 },
skyHigh: { sc: "sky", x: -20, z: 320, name: "past the clouds, among the stars" },
skyThin: { sc: "sky", x: 10, z: -40, name: "where the air grows thin" },
barrier: { sc: "sky", x: 0, z: -300, name: "the shimmering barrier" }
});
function wqtSkyH(x, z) { return -400; }
function wqtSkyY(z) { return 40 + Math.max(0, (760 - z)) * 0.16; }
WQW_SCN.sky = { h: wqtSkyH, start: { x: 0, z: 720, ry: 0 },
edge: function (x, z) { return Math.abs(x) > 70 || z < -330 || z > 800; },
build: function (G) { return __ZC(502, 94, this, arguments, new.target); } };
WQB_FOLK_AT.sky = [];
Object.assign(WQW_AT, {
autumnIn: { sc: "autumn", x: 0, z: 320, name: "the edge of Cora's realm", ry: 0 },
coraGarden: { sc: "autumn", x: 0, z: 60, name: "Cora's garden of roses" },
coraRoses: { sc: "autumn", x: 6, z: 48, name: "the roses" },
coraKneel: { sc: "autumn", x: -4, z: 56, name: "where Cora falls to her knees" },
autumnWood: { sc: "autumn", x: -120, z: -60, name: "the blazing forest" }
});
function wqrAutumnH(x, z) { return wqwFbm(x * 0.008, z * 0.008, 4) * 10 + wqwFbm(x * 0.04, z * 0.04, 2) * 1.0 + Math.max(0, Math.hypot(x, z) - 560) * 0.5 - wqwSmooth(80, 30, Math.hypot(x, z - 60)) * 2; }
WQW_SCN.autumn = { h: wqrAutumnH, start: { x: 0, z: 320, ry: 0 },
build: function (G) { return __ZC(502, 95, this, arguments, new.target); } };
var WQW_ROSES = null, WQW_ASH = null;
WQB_FOLK_AT.autumn = [["cora", -2, 58, 0.2], ["faem", 140, -20, 0.4], ["fae", -90, 120, -1]];
(function () {
var a0 = wqwStateApply;
wqwStateApply = function (st, s) {
a0.apply(this, arguments);
var V = function (v) { return typeof v === "function" ? v(s) : v; };
if (WQW_ROSES && WQW_ROSES.parent) {
var ash = !!V(st.ash);
WQW_ROSES.visible = !ash;
WQW_ASH.visible = ash;
}
};
})();
Object.assign(WQW_AT, {
springIn: { sc: "spring", x: 0, z: 360, name: "the shimmer at the edge of the meadow", ry: 0 },
meadow: { sc: "spring", x: 0, z: 180, name: "the flower meadow" },
danceRing: { sc: "spring", x: -40, z: 60, name: "the ring where the nymphs dance" },
fountain: { sc: "spring", x: 40, z: -20, name: "the fountain" },
cottage: { sc: "spring", x: 0, z: -96, name: "Talia's cottage" },
orchard: { sc: "spring", x: -150, z: -120, name: "the apple orchard" }
});
function wqrSpringH(x, z) { return wqwFbm(x * 0.006, z * 0.006, 4) * 12 + wqwFbm(x * 0.04, z * 0.04, 2) * 0.6 + Math.max(0, Math.hypot(x, z) - 560) * 0.5 - wqwSmooth(60, 20, Math.hypot(x + 40, z - 60)) * 1.2; }
WQW_SCN.spring = { h: wqrSpringH, start: { x: 0, z: 360, ry: 0 },
build: function (G) { return __ZC(502, 96, this, arguments, new.target); } };
WQB_FOLK_AT.spring = [["talia", -40, 60, 0], ["nymph", -50, 66, 1], ["nymph", -30, 68, -1], ["nymph", -44, 48, 2.6], ["nymph", -150, -100, 0.5]];
Object.assign(WQW_AT, {
craterMid: { sc: "crater", x: 0, z: 0, name: "the bottom of the crater", ry: Math.PI },
craterRim: { sc: "crater", x: 0, z: 46, name: "the rim of the crater" },
craterSouth: { sc: "crater", x: 0, z: 38, name: "the slope where the young man climbs down" },
craterOut: { sc: "crater", x: -30, z: -260, name: "the frozen night, north, away from the village" },
village: { sc: "crater", x: 20, z: 200, name: "the village below the foothills" }
});
function wqdCraterH(x, z) {
var r = Math.hypot(x, z), base = wqwFbm(x * 0.008, z * 0.008, 4) * 10 + Math.max(0, -z - 120) * 0.35 + wqwFbm(x * 0.05, z * 0.05, 2) * 0.6;
var bowl = r < 44 ? -9 * Math.cos(r / 44 * Math.PI / 2) : 0, lip = r >= 36 && r < 70 ? Math.sin((r - 36) / 34 * Math.PI) * 3.2 : 0;
return base + bowl + lip - wqwSmooth(160, 100, Math.hypot(x - 20, z - 200)) * 3;
}
WQW_SCN.crater = { h: wqdCraterH, start: { x: 0, z: 46, ry: 0 },
build: function (G) { return __ZC(502, 97, this, arguments, new.target); } };
WQB_FOLK_AT.crater = [["villager", 10, 200, 0.3], ["villagerf", -20, 214, 2], ["villager", 40, 226, -1], ["villagerf", 60, 212, 1], ["child", -4, 220, 0.5], ["villager", 24, 262, 3]];
(function () { var b0 = WQW_SCN.crater.build; WQW_SCN.crater.build = function (G) { b0(G); var H = wqdCraterH; wqwCrowd(7710, wqwLite() ? 5 : 10, -50, 180, 80, 300, { dress: "wqfur", dressF: "wqfurf", ok: function (x, z) { return !wqwSolidAt(x, z, H(x, z)); }, names: ["A villager", "A woodcutter", "A goatherd", "A trapper", "The miller"], persona: "village", says: ["Did you hear it? Like the sky breaking.", "Every window on the lane, gone.", "Something fell up there, by the trees. A star, my boy says.", "Stay in tonight. Something's wrong in the cold."] }); }; })();
Object.assign(WQW_SC, {
north: { x: -8000, name: "The northern reaches, where the auroras dance", bound: 900, env: "aurora" },
south: { x: -4000, name: "The southern valleys, and the eastern steppes", bound: 900, env: "lateautumn" }
});
Object.assign(WQW_ENV, {
lateautumn: { top: 0x6A88B8, low: 0xE8DCC8, fog: 0xC8C0B0, fogD: 0.0017, sun: 0.8, sunCol: 0xFFE8C8, sunDir: [0.5, 0.45, 0.3], hemi: 0.62, hemiCol: 0xF0E8D8, hemiGround: 0x5A4A30 },
firstfrost: { top: 0x4A6A9A, low: 0xE8EEF4, fog: 0xD0D8E4, fogD: 0.0019, sun: 0.7, sunCol: 0xF4F0F0, sunDir: [0.5, 0.3, 0.3], hemi: 0.6, hemiCol: 0xE4ECF8, hemiGround: 0x6A7488 },
steppe: { top: 0x6A8AC8, low: 0xF0E4C8, fog: 0xD8CCB0, fogD: 0.0011, sun: 0.82, sunCol: 0xFFECCA, sunDir: [-0.6, 0.35, 0.2], hemi: 0.6, hemiCol: 0xF4ECD8, hemiGround: 0x7A6A40 },
steppesnow: { top: 0x3A5A8A, low: 0xDCE6F0, fog: 0xC8D2E0, fogD: 0.0016, sun: 0.6, sunCol: 0xE8F0FF, sunDir: [-0.6, 0.35, 0.2], hemi: 0.58, hemiCol: 0xDCE6F8, hemiGround: 0x5A6478 },
tear: { top: 0x1A0628, low: 0x2A5A3A, fog: 0x2A1A3A, fogD: 0.0022, sun: 0.4, sunCol: 0xC88AFF, sunDir: [0.2, 0.8, -0.5], hemi: 0.5, hemiCol: 0x9A6AD8, hemiGround: 0x0A1A10 },
blizzard: { top: 0x5A6478, low: 0xB8C0CC, fog: 0xC0C8D4, fogD: 0.012, sun: 0.5, sunCol: 0xE0E8F0, sunDir: [0.2, 0.8, -0.3], hemi: 0.62, hemiCol: 0xDCE4EE, hemiGround: 0x7A8494 },
towerroom: { top: 0x1A1014, low: 0x3A2228, fog: 0x24161A, fogD: 0.006, sun: 0.5, sunCol: 0xFFC8A8, sunDir: [0.2, 0.9, 0.1], hemi: 1.0, hemiCol: 0xF0C8B8, hemiGround: 0x2A1A1C },
greyroom: { top: 0x202024, low: 0x48484C, fog: 0x303034, fogD: 0.008, sun: 0.3, sunCol: 0xD8D8DC, sunDir: [0.2, 0.9, 0.1], hemi: 0.62, hemiCol: 0xC8C8CC, hemiGround: 0x28282A }
});
Object.assign(WQW_AT, {
northIn: { sc: "north", x: 0, z: 260, name: "the northern reaches", ry: 0 },
glacierFoot: { sc: "north", x: 0, z: -104, name: "the foot of the glacier" },
glacierWork: { sc: "north", x: -6, z: -98, name: "where you are working the glacier" },
gerdaAt: { sc: "north", x: 30, z: -88, name: "the edge of your working" },
towerPath: { sc: "north", x: 200, z: -10, name: "the path up to the tower" },
towerDoor: { sc: "north", x: 286, z: -20, name: "the door of Gerda's tower" },
towerOut: { sc: "north", x: 280, z: -20, name: "the foot of the ruined tower", ry: -Math.PI / 2 },
stormFar: { sc: "north", x: -60, z: 300, name: "out in the storm, away from the tower" },
towerRoom: Object.assign(wqwInAt("north", 0, 0, 2), { name: "the upper chamber of Gerda's tower" }),
towerBed: Object.assign(wqwInAt("north", 0, 4, -2), { name: "Gerda's bed" }),
towerWindow: Object.assign(wqwInAt("north", 0, 0, -4.6), { name: "the window of the upper chamber" }),
towerVase: Object.assign(wqwInAt("north", 0, -4.4, 1), { name: "the vase of mountain lilies" }),
southIn: { sc: "south", x: -200, z: 300, name: "the head of the southern valley", ry: 0 },
valleyFields: { sc: "south", x: -160, z: 120, name: "the waiting fields" },
valleyOrchard: { sc: "south", x: -260, z: 40, name: "the orchard by the river" },
valleyVillage: { sc: "south", x: -140, z: -40, name: "the village in the valley" },
steppeIn: { sc: "south", x: 320, z: 120, name: "the edge of the eastern steppes", ry: Math.PI / 2 },
steppe: { sc: "south", x: 480, z: 40, name: "the open steppe" }
});
function wqeNorthH(x, z) { return __ZC(502, 98, this, arguments, new.target); }
var WQE_TOWER = { x: 300, z: -20 };
function wqeAurora(G, n, z0, y0) { return __ZC(502, 99, this, arguments, new.target); }
WQW_SCN.north = { h: wqeNorthH, start: { x: 0, z: 260, ry: 0 },
build: function (G) { return __ZC(502, 100, this, arguments, new.target); } };
WQB_FOLK_AT.north = [["fox", -140, 140, 1.2], ["hare", 120, 180, -0.6], ["wolfwild", -260, -40, 0.8], ["stag", 180, 260, 2]];
function wqeSouthH(x, z) { return __ZC(502, 101, this, arguments, new.target); }
WQW_SCN.south = { h: wqeSouthH, start: { x: -200, z: 300, ry: 0 },
build: function (G) { return __ZC(502, 102, this, arguments, new.target); } };
WQB_FOLK_AT.south = [["villager", -160, -20, 0.3], ["villagerf", -120, -50, 2], ["villager", -190, -100, -1], ["child", -140, -30, 0.5], ["villagerf", -250, 50, 1.4], ["villager", -150, 110, 0.2], ["steppeman", 530, 30, -1], ["steppewoman", 548, 90, 2]];
(function () { var b0 = WQW_SCN.south.build; WQW_SCN.south.build = function (G) { b0(G); var H = wqeSouthH; wqwCrowd(8910, wqwLite() ? 4 : 8, -220, -140, -80, 0, { dress: "town", dressF: "townf", ok: function (x, z) { return !wqwSolidAt(x, z, H(x, z)); }, names: ["A farmer", "A shepherd", "A miller's wife", "A carter", "The smith"], persona: "village", says: ["The frost's late this year. The beasts know it.", "Every year it comes by now. Every year.", "My gran says winter's forgotten us.", "If it doesn't freeze soon the grubs'll have the seed."] }); }; })();
Object.assign(WQW_SC, { coast: { x: 0, name: "The frozen coast, the tundra, and a village at the margin of the maps", bound: 900, env: "coastday" } });
Object.assign(WQW_ENV, {
coastday: { top: 0x8A9AB8, low: 0xE4E8EE, fog: 0xCED6E0, fogD: 0.0017, sun: 0.6, sunCol: 0xF4F0EC, sunDir: [0.4, 0.25, -0.6], hemi: 0.62, hemiCol: 0xE0E6F0, hemiGround: 0x6A7484 },
oldice: { top: 0x7A8698, low: 0xC8D0DA, fog: 0xB8C2CE, fogD: 0.0024, sun: 0.48, sunCol: 0xE0E4EA, sunDir: [0.4, 0.25, -0.6], hemi: 0.6, hemiCol: 0xD0D6E0, hemiGround: 0x5A6270 },
sunsetvillage: { top: 0x2A2A58, low: 0xF0A878, fog: 0xB89098, fogD: 0.0021, sun: 0.62, sunCol: 0xFFB078, sunDir: [-0.85, 0.12, 0.2], hemi: 0.55, hemiCol: 0xE8C0C0, hemiGround: 0x3A3040 },
cottagecold: { top: 0x2A2420, low: 0x5A4A3A, fog: 0x3A3028, fogD: 0.008, sun: 0.3, sunCol: 0xD8E8FF, sunDir: [0.2, 0.9, 0.1], hemi: 0.78, hemiCol: 0xE0E8F0, hemiGround: 0x3A2E24 }
});
Object.assign(WQW_AT, {
coastIn: { sc: "coast", x: 200, z: 120, name: "the tundra by the frozen coast", ry: 0 },
shore: { sc: "coast", x: 160, z: -160, name: "the shore, where the sea ice begins" },
seals: { sc: "coast", x: 120, z: -300, name: "the seals' hauling-out on the ice" },
wolves: { sc: "coast", x: 240, z: -60, name: "the open tundra by the coast" },
wolvesAlpha: { sc: "coast", x: 246, z: -54, name: "the open tundra by the coast" },
bearFall: { sc: "coast", x: 236, z: -50, name: "where you fell" },
pathA: { sc: "coast", x: 300, z: 40, name: "where the snow is less deep" },
pathB: { sc: "coast", x: 420, z: 60, name: "east, where the wind is gentler" },
pathC: { sc: "coast", x: 560, z: 20, name: "on, east, a little further" },
marginIn: { sc: "coast", x: -420, z: 420, name: "the edge of the village at the margin of the maps", ry: 0 },
marginSquare: { sc: "coast", x: -360, z: 330, name: "the village square" },
marginHouse: { sc: "coast", x: -300, z: 262, name: "the small house at the edge of the settlement" },
marginRoom: Object.assign(wqwInAt("coast", 0, 0, 0.6), { name: "inside the small house" }),
marginMother: Object.assign(wqwInAt("coast", 0, -1.6, -1.8), { name: "by the fire" }),
marginOut: { sc: "coast", x: -200, z: 180, name: "the frozen wasteland beyond the village" }
});
function wqfCoastH(x, z) { return __ZC(502, 103, this, arguments, new.target); }
function wqeSeal(g, s) { return __ZC(502, 104, this, arguments, new.target); }
WQW_SCN.coast = { h: wqfCoastH, start: { x: 200, z: 120, ry: 0 },
build: function (G) { return __ZC(502, 105, this, arguments, new.target); } };
var WQW_SEALS = [], WQW_MARGIN_FIRE = null;
WQB_FOLK_AT.coast = [["fox", 300, 200, 1.2], ["hare", 420, 160, -0.6], ["fox", -100, 60, 2]];
(function () { var b0 = WQW_SCN.coast.build; WQW_SCN.coast.build = function (G) { b0(G); var H = wqfCoastH; wqwCrowd(9910, wqwLite() ? 4 : 9, -430, 250, -250, 400, { dress: "wqfur", dressF: "wqfurf", ok: function (x, z) { return !wqwSolidAt(x, z, H(x, z)); }, names: ["A woman with a bucket", "A trapper", "An old man", "A boy with a sled", "A fisherman"], persona: "village", says: ["The stories say she comes for the ones the storm touched.", "Bar your door tonight.", "My grandfather saw her once. He never spoke above a whisper after.", "Don't look at her. Don't look at her eyes."] }); }; })();
(function () { var a0 = wqwStateApply; wqwStateApply = function (st, s) { a0.apply(this, arguments); var V = function (v) { return typeof v === "function" ? v(s) : v; }; if (WQW_MARGIN_FIRE && WQW_MARGIN_FIRE.parent)
WQW_MARGIN_FIRE.intensity = V(st.marginFrost) ? 0.35 : 1.1; }; })();
Object.assign(WQW_AT, {
courtBear: { sc: "palace", x: 2, z: 34, name: "where the bear fell" },
courtAway: { sc: "palace", x: -4, z: 18, name: "three steps away" },
hearthBear: wqwInAt("palace", 0, 0, -5, "before the cold fire, on the white fur"),
hearthSeat: wqwInAt("palace", 0, -5, -10, "your back to the hearth"),
hearthScratch: wqwInAt("palace", 0, 8, 2, "a clear stretch of the ice floor"),
hearthSealAt: wqwInAt("palace", 0, 3, -2, "before the hearth"),
woundThroat: wqwInAt("palace", 0, -1.2, -5, "the wound on his throat"),
woundHaunch: wqwInAt("palace", 0, 1.8, -6.2, "the wound on his haunch"),
woundFlank: wqwInAt("palace", 0, 0.6, -4.2, "the wound on his flank"),
fiftyCopse: { sc: "south", x: -60, z: -190, name: "a copse of trees outside the village" },
fiftyHouse: { sc: "south", x: -236, z: -150, name: "a house near the centre of the village, flower boxes in its windows" },
fiftyRoom: Object.assign(wqwInAt("south", 0, 0, 1.2), { name: "inside the house" }),
fiftyBack: Object.assign(wqwInAt("south", 0, 0, -1.8), { name: "the back of the room" }),
fiftyDoor: Object.assign(wqwInAt("south", 0, 0, 2.6), { name: "the doorway" })
});
(function () {
var a0 = wqwStateApply;
wqwStateApply = function (st, s) {
a0.apply(this, arguments);
var V = function (v) { return typeof v === "function" ? v(s) : v; };
var on = st.coldfire === undefined ? true : !!V(st.coldfire);
if (WQI.coldFire)
WQI.coldFire.visible = on;
if (WQI.coldLight)
WQI.coldLight.intensity = on ? 1.6 : 0;
};
})();
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var A = WQW_AT.hearthScratch, sm = function (ch) {
return wqwM("scratch" + ch, function () {
var t = wqwCanvas("scratchT" + ch, 128, 128, function (c, W, H) { c.clearRect(0, 0, W, H); c.strokeStyle = "rgba(235,248,255,.95)"; c.lineWidth = 7; c.lineCap = "round"; c.font = "bold 104px serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.strokeText(ch, W / 2, H / 2 + 6); c.strokeStyle = "rgba(150,190,230,.6)"; c.lineWidth = 2; c.strokeText(ch, W / 2 + 2, H / 2 + 8); });
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false });
m.userData.noPhoto = 1;
return m;
});
};
"KAEL".split("").forEach(function (ch, i) { var p = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), sm(ch)); p.rotation.x = -Math.PI / 2; p.position.set(A.x - 2.4 + i * 1.6, WQW_IN_Y + 0.03, A.z); G.add(p); wqwShow("scratch" + i, p, false); });
};
})();
(function () { var m0 = wqbItemMesh; wqbItemMesh = function (kind) { if (kind !== "seal")
return m0.apply(this, arguments); var g = new THREE.Group(); wqeSeal(g, 0.9); g.rotation.z = 1.2; g.userData.keep = 1; return g; }; })();
function wqpLying(g) { g.rotation.z = Math.PI / 2 * 0.92; g.position.y += 1.1; }
(function () {
var b0 = WQW_SCN.south.build;
WQW_SCN.south.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqeSouthH, R = wRand(8920), n = 0;
var cols = [0xE8DCC0, 0xD8C8A8, 0xF0E4CC, 0xE4D4B8, 0xDCCCB0], boxM = wqwS("b:planks", 0x6A4A2A, 2), flowerC = [0xE84A5A, 0xF0C040, 0xA858C8, 0xF4F0EC];
var addHouse = function (x, z, ry, big) {
var y = H(x, z), w = big ? 10 : 8 + R() * 2, d = big ? 8 : 6.5 + R() * 1.5, h = 3.6 + R() * 0.8;
wqwHouse(G, x, z, w, d, h, { y: y - 0.2, ry: ry, col: cols[n % cols.length] });
wqwSmoke(G, x + Math.cos(ry) * 1.5, y + h + 2.6, z, 0xB8B0A8, 4);
wqwSolid(x, z, w + 0.4, d + 0.4, y - 1, y + h + 3, ry);
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
[-w * 0.28, w * 0.28].forEach(function (wx) { wqwBox(g, 1.4, 0.24, 0.3, boxM, wx, 1.0, d / 2 + 0.18); for (var f = 0; f < 5; f++) {
var fl = new THREE.Mesh(wqwGeo("boxFl", function () { return new THREE.IcosahedronGeometry(0.09, 0); }), wqwLam(flowerC[(n + f) % 4]));
fl.position.set(wx - 0.5 + f * 0.25, 1.32, d / 2 + 0.18);
g.add(fl);
} });
wqwBox(g, 1.1, 1.0, 0.08, wqwGlowM(0xFFB860, 0.85), -w * 0.28, 1.4, d / 2 + 0.03);
wqwBox(g, 1.1, 1.0, 0.08, wqwGlowM(0xFFB860, 0.85), w * 0.28, 1.4, d / 2 + 0.03);
n++;
return { x: x, z: z, y: y, w: w, d: d };
};
var tries = 0;
while (n < (lite ? 24 : 43) && tries < 900) {
tries++;
var x = -440 + R() * 400, z = -250 + R() * 230;
if (Math.abs(z - 60 + Math.sin(x * 0.01) * 16) < 26)
continue;
if (Math.hypot(x - WQW_AT.fiftyHouse.x, z - WQW_AT.fiftyHouse.z) < 20)
continue;
if (Math.hypot(x + 60, z + 190) < 30)
continue;
if (wqwSolidAt(x, z, H(x, z)))
continue;
var ok = true;
for (var dx = -8; dx <= 8 && ok; dx += 4)
for (var dz = -8; dz <= 8 && ok; dz += 4)
if (wqwSolidAt(x + dx, z + dz, H(x + dx, z + dz)))
ok = false;
if (!ok)
continue;
addHouse(x, z, Math.round(R() * 4) * Math.PI / 2 + (R() - 0.5) * 0.2, false);
}
var F = WQW_AT.fiftyHouse, hz = F.z - 6, hy = H(F.x, hz);
addHouse(F.x, hz, 0, true);
wqwDoorTo(G, "south", 0, F.x, hz + 4.1, 0, "The door of the house with the flower boxes", 10, 8, { col: 0x3A5A3A, y: hy });
var gR = wqwRoomBuild(G, "south", 0, 10, 8, 3.2, { wall: wqwS("b:stucco", 0xEADCC4, 3), floor: wqwMat("planks"), ceil: wqwS("b:planks", 0x8A6A4A, 2), env: "cottage", doorName: "The door, out into the lane" });
wqwTable(gR, 0, -0.6, 2.4, 1.1, 0.78, wqwMat("oak"));
[-1, 1].forEach(function (k) { wqwChair(gR, k * 1.5, -0.6, k * Math.PI / 2, wqwMat("oak")); wqwChair(gR, k * 0.6, -1.5, 0, wqwMat("oak")); });
wqwBox(gR, 2.4, 1.4, 0.7, wqwMat("stone"), -3.4, 0, -3.5);
wqwFire(gR, -3.4, 0.2, -3.2, 0.6);
var fl = new THREE.PointLight(0xFFA060, 1.0, 12);
fl.position.set(-3.4, 1, -2.8);
gR.add(fl);
wqwShelves(gR, 4.6, -1, 2.4, 2.0, -Math.PI / 2);
wqwRug(gR, 0, -0.6, 4, 2.6, 0x6A2A2A);
wqwPlant(G, "conifer", wqwScatter(8921, lite ? 8 : 16, -90, -215, -30, -165, function (x, z) { return Math.hypot(x + 60, z + 190) > 7; }, H, 0.8, 1.1), { col: 0x4A6A4A });
wqwStrip(G, [[-60, -190], [-120, -170], [-180, -155], [F.x, F.z + 2], [-300, -140], [-380, -120]], 3.4, function (x, z) { return H(x, z) + 0.06; }, wqwS("earth", 0x8A7A5A, 3), 0.06);
};
})();
Object.assign(WQW_FOLK, {
father: { name: "The father", dress: "town", sex: "m", beard: "short", hair: 0x5A4A3A, persona: "village", greet: "No. No, please, not here. Not my family." },
wife: { name: "His wife", dress: "townf", sex: "f", hair: 0x6A4A2A, persona: "village", greet: "Please. Please." },
eldest: { name: "Their eldest son", dress: "town", sex: "m", hair: 0x6A4A2A, persona: "village", greet: "Please. I don't want to die." },
small: { name: "A younger child", dress: "town", sex: "f", child: 1, hair: 0x6A4A2A, persona: "village", greet: "(She hides behind her mother.)" }
});
Object.assign(WQW_AT, {
springLand: { sc: "spring", x: 8, z: 470, name: "the meadow's edge, where the sleigh came down", ry: Math.PI },
shimmerOut: { sc: "spring", x: 0, z: 398, name: "before the shimmer" },
wiltPath: { sc: "spring", x: -6, z: 270, name: "halfway across the meadow" },
cottageDoor: { sc: "spring", x: 0, z: -110, name: "the cottage door, open in welcome" },
cottageTable: Object.assign(wqwInAt("spring", 0, 0, 0), { name: "the table, laden with food" }),
cottageFloor: Object.assign(wqwInAt("spring", 0, 2.6, 0.6), { name: "the floor beside the table" }),
guestRoom: Object.assign(wqwInAt("spring", 1, 0, 1), { name: "the guest chamber" }),
guestRug: Object.assign(wqwInAt("spring", 1, 1.6, -0.6), { name: "the soft rugs on the floor" }),
tulips: { sc: "spring", x: 26, z: -60, name: "the bed of tulips" },
gardenWalk: { sc: "spring", x: -60, z: -30, name: "the jasmine walk" }
});
function wqhSleigh(G, x, z, ry, y) { return __ZC(502, 106, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.spring.build;
WQW_SCN.spring.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqrSpringH, R = wRand(7701);
var mud = wqwScatter(7702, lite ? 40 : 110, -300, 392, 300, 640, null, H, 1, 2.2);
mud.forEach(function (t) { var m = new THREE.Mesh(wqwGeo("mudP", function () { var g = new THREE.CircleGeometry(1, 9); g.rotateX(-Math.PI / 2); return g; }), wqwS("earth", 0x5A4632, 2)); m.position.set(t.x, t.y + 0.05, t.z); m.scale.set(t.s * 2.6, 1, t.s * 1.8); m.rotation.y = t.ry; G.add(m); });
var snow = wqwScatter(7703, lite ? 14 : 36, -300, 420, 300, 640, null, H, 1, 2);
snow.forEach(function (t) { var m = new THREE.Mesh(wqwGeo("snowP", function () { var g = new THREE.CircleGeometry(1, 10); g.rotateX(-Math.PI / 2); return g; }), wqwLam(0xE8ECF0)); m.position.set(t.x, t.y + 0.07, t.z); m.scale.set(t.s * 2, 1, t.s * 1.4); G.add(m); });
var early = wqwScatter(7704, lite ? 120 : 360, -300, 392, 300, 640, null, H, 0.5, 0.8);
["#F8F0A0", "#C8A8F0", "#FFFFFF"].forEach(function (c, k) { wqwPlant(G, "flowers", early.filter(function (t, i) { return i % 3 === k; }), { col: c }); });
wqwPlant(G, "grass", wqwScatter(7705, lite ? 200 : 600, -300, 392, 300, 640, null, H, 0.5, 0.9), { col: 0x8A9A5A });
wqwPlant(G, "conifer", wqwScatter(7706, lite ? 10 : 26, -420, 520, 420, 680, function (x, z) { return Math.abs(x) > 40; }, H, 0.9, 1.3), { col: 0x3A5A3A });
wqhSleigh(G, WQW_AT.springLand.x - 4, WQW_AT.springLand.z + 4, 0.3, H(WQW_AT.springLand.x - 4, WQW_AT.springLand.z + 4));
var wg = new THREE.Group();
G.add(wg);
var wlt = [];
for (var z = 390; z > -100; z -= 3) {
var x = Math.sin(z * 0.02) * 6 - 6 + (R() - 0.5) * 1.4;
wlt.push({ x: x, z: z, y: H(x, z), s: 0.9, ry: R() * 6 });
}
wlt.forEach(function (t) { var m = new THREE.Mesh(wqwGeo("wiltP", function () { var g = new THREE.CircleGeometry(0.9, 8); g.rotateX(-Math.PI / 2); return g; }), wqwLam(0x8A6A3A)); m.position.set(t.x, t.y + 0.06, t.z); wg.add(m); var f = new THREE.Mesh(wqwGeo("frostP", function () { var g = new THREE.CircleGeometry(0.6, 8); g.rotateX(-Math.PI / 2); return g; }), wqwLam(0xE8F4FC)); f.position.set(t.x + 0.2, t.y + 0.08, t.z + 0.1); wg.add(f); });
wqwShow("wilt", wg, false);
var tul = [];
for (var i = 0; i < 10; i++)
for (var j = 0; j < 4; j++)
tul.push({ x: 20 + i * 1.3, z: -62 + j * 1.2, y: H(20 + i * 1.3, -62 + j * 1.2), s: 0.9, ry: R() * 6 });
["#E83A4A", "#F8D040", "#F4F0EC", "#C858A8"].forEach(function (c, k) { wqwPlant(G, "flowers", tul.filter(function (t, i) { return i % 4 === k; }), { col: c }); });
wqwBox(G, 14, 0.25, 5.6, wqwS("earth", 0x5A4A3A, 2), 26.4, H(26, -60) - 0.1, -60.2);
wqwPlant(G, "flowers", wqwScatter(7707, lite ? 40 : 120, -90, -50, -30, -10, null, H, 0.7, 1), { col: "#FFFFF0" });
wqwDoorTo(G, "spring", 0, 0, -115.4, 0, "The door of Talia's cottage", 12, 9, { col: 0x6A8A3A, frame: wqwMat("oak"), y: H(0, -115.4), hide: 1 });
var gR = wqwRoomBuild(G, "spring", 0, 12, 9, 3.6, { wall: wqwS("b:stucco", 0xF4ECDC, 3), floor: wqwMat("planks"), ceil: wqwS("b:planks", 0x9A7A52, 2), env: "cottage", doorName: "The door, out into the garden", day: 0xFFF4D0 });
wqwTable(gR, 0, 0, 3.2, 1.4, 0.8, wqwMat("oak"), wqwLam(0xF4F0E4));
[-1.1, 1.1].forEach(function (x) { wqwChair(gR, x, -1.1, 0, wqwMat("oak")); });
var food = [[-1.0, 0.1, 0xC8904A, "loaf"], [-0.4, -0.2, 0xC8904A, "loaf"], [0.3, 0.2, 0xF0C040, "honey"], [0.9, -0.1, 0x8A2A4A, "berries"], [1.3, 0.3, 0x3A6AC8, "berries"], [-1.4, -0.3, 0x6A9A3A, "greens"], [0.0, -0.4, 0xF8F4E8, "butter"]];
food.forEach(function (f) {
var m;
if (f[3] === "loaf") {
m = new THREE.Mesh(wqwGeo("loaf", function () { var g = new THREE.SphereGeometry(0.22, 12, 8); g.scale(1.5, 0.8, 1); return g; }), wqwLam(f[2]));
m.position.set(f[0], 0.92, f[1]);
}
else if (f[3] === "berries") {
m = new THREE.Group();
var bw = new THREE.Mesh(wqwGeo("bowl", function () { return new THREE.CylinderGeometry(0.18, 0.12, 0.1, 14); }), wqwLam(0xE8E0D0));
m.add(bw);
for (var k = 0; k < 7; k++) {
var b = new THREE.Mesh(wqwGeo("berry", function () { return new THREE.SphereGeometry(0.04, 6, 5); }), wqwLam(f[2]));
b.position.set((R() - 0.5) * 0.2, 0.06, (R() - 0.5) * 0.2);
m.add(b);
}
m.position.set(f[0], 0.86, f[1]);
}
else {
m = new THREE.Mesh(wqwGeo("pot", function () { return new THREE.CylinderGeometry(0.09, 0.1, 0.16, 12); }), wqwLam(f[2]));
m.position.set(f[0], 0.88, f[1]);
}
gR.add(m);
});
[[-0.2, 0.45], [1.0, 0.45]].forEach(function (p) { var pc = new THREE.Mesh(wqwGeo("pitcher", function () { return new THREE.CylinderGeometry(0.08, 0.11, 0.3, 12); }), wqiIce(0xE8F6FF, { op: 0.7 })); pc.position.set(p[0], 0.95, p[1]); gR.add(pc); });
wqwBox(gR, 2.6, 1.6, 0.8, wqwMat("stone"), -4.4, 0, -3.9);
wqwFire(gR, -4.4, 0.2, -3.5, 0.7);
var fl = new THREE.PointLight(0xFFA060, 1.1, 14);
fl.position.set(-4.4, 1.1, -3);
gR.add(fl);
wqwShelves(gR, 5.4, -1.5, 2.4, 2.0, -Math.PI / 2);
wqwRug(gR, 2.6, 1.4, 3, 2.4, 0x3A6A3A);
for (var k = 0; k < 6; k++) {
var v = new THREE.Mesh(wqwGeo("vaseF", function () { return new THREE.IcosahedronGeometry(0.1, 0); }), wqwLam([0xF4B8D0, 0xF8F0A0, 0xC8A8F0][k % 3]));
v.position.set(-5.2, 1.9 + (k % 2) * 0.1, -1 + k * 0.4);
gR.add(v);
}
var gG = wqwRoomBuild(G, "spring", 1, 9, 8, 3.4, { wall: wqwS("b:stucco", 0xF8F0E4, 3), floor: wqwMat("planks"), ceil: wqwS("b:planks", 0x9A7A52, 2), env: "cottage", doorName: "Back into the cottage", out: { x: WQW_AT.cottageTable.x, z: WQW_AT.cottageTable.z - 2.6, ry: Math.PI }, day: 0xFFF4D0 });
wqwBed(gG, -2.4, -2, 0, 0x8AA86A);
wqwBed(gG, -0.8, -2, 0, 0x8AA86A);
wqwRug(gG, 1.8, -0.6, 3.4, 2.8, 0xA8784A);
wqwRug(gG, 2.2, 1.4, 2.6, 2, 0x6A8A9A);
wqwBox(gG, 2.2, 1.6, 0.06, wqwGlowM(0xFFF4D0, 0.9), 0, 1.0, -3.95);
wqwSpot(WQW_AT.cottageTable.x, WQW_AT.cottageTable.z - 3.6, 1.4, "The guest chamber", "go through", function () { var A = WQW_AT.guestRoom; wqwGo({ sc: "spring", x: A.x, z: A.z, y: WQW_IN_Y, ry: 0 }, "🛏️ <b>The guest chamber</b>", typeof wqbPopulate === "function" ? wqbPopulate : null); }, WQW_IN_Y);
};
})();
Object.assign(WQW_ENV, { dreamvoid: { top: 0x02030A, low: 0x0A1020, fog: 0x04060E, fogD: 0.03, sun: 0.25, sunCol: 0x8AB0E8, sunDir: [0.1, 0.9, 0.2], hemi: 0.55, hemiCol: 0x6A88C0, hemiGround: 0x02030A } });
Object.assign(WQW_AT, {
dreamFall: Object.assign(wqwInAt("palace", 5, 0, 8), { name: "falling, through nothing" }),
dreamMirror: Object.assign(wqwInAt("palace", 5, 0, -2), { name: "before the mirror" }),
oldVillage: { sc: "north", x: -230, z: 200, name: "a remote village, half-buried in snow" },
oldDoor: { sc: "north", x: -250, z: 186, name: "the old man's door" },
oldRoom: Object.assign(wqwInAt("north", 1, 0, 0.6), { name: "inside the old man's cottage" }),
forestEdge: { sc: "north", x: -300, z: -30, name: "the edge of the forest" },
motherDoor: { sc: "north", x: -318, z: -44, name: "the cottage at the forest's edge" },
motherRoom: Object.assign(wqwInAt("north", 2, 0, 1.4), { name: "inside the cottage" }),
motherCradle: Object.assign(wqwInAt("north", 2, -2.4, -1.8), { name: "the cradle by the fire" }),
sleighNorth: { sc: "north", x: -200, z: 120, name: "the sleigh, waiting in the snow" }
});
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var lite = wqwLite(), R = wRand(9501), A = wqwInAt("palace", 5);
var g = new THREE.Group();
g.position.set(A.x, WQW_IN_Y, A.z);
G.add(g);
wqwFloor(A.x, A.z, 30, 30, WQW_IN_Y);
wqwRoom("palace", A.x - 15, A.x + 15, A.z - 15, A.z + 15, "dreamvoid");
var black = wqwLam(0x020206);
[[0, -0.1, 0, 30, 0.1, 30], [0, 14, 0, 30, 0.1, 30], [0, 0, -15, 30, 14, 0.1], [0, 0, 15, 30, 14, 0.1], [-15, 0, 0, 0.1, 14, 30], [15, 0, 0, 0.1, 14, 30]].forEach(function (b) { wqwBox(g, b[3], b[4], b[5], black, b[0], b[1], b[2]); });
var mt = wqwCanvas("voidMirror", 256, 384, function (c, W, H) {
c.fillStyle = "#0A0E18";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 26; i++) {
var x = (i * 53) % W, y = (i * 97) % H, s = 26 + (i % 5) * 10;
c.save();
c.translate(x, y);
c.rotate((i % 7) * 0.5);
c.strokeStyle = "rgba(180,210,240," + (0.25 + (i % 3) * 0.15) + ")";
c.lineWidth = 2;
c.strokeRect(-s / 2, -s / 2, s, s);
c.fillStyle = i % 4 === 0 ? "rgba(240,244,250,.55)" : "rgba(140,170,200,.35)";
c.beginPath();
c.ellipse(0, -s * 0.15, s * 0.12, s * 0.16, 0, 0, 7);
c.fill();
c.beginPath();
c.ellipse(0, s * 0.18, s * 0.2, s * 0.22, 0, 0, 7);
c.fill();
c.restore();
}
var gr = c.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, H / 2);
gr.addColorStop(0, "rgba(120,160,220,.25)");
gr.addColorStop(1, "rgba(0,0,0,.6)");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
});
var mir = new THREE.Group();
mir.position.set(0, 6.5, -8);
g.add(mir);
WQI.voidMirror = mir;
var face = new THREE.Mesh(new THREE.PlaneGeometry(6, 9), wqwM("voidMirM", function () { var m = new THREE.MeshBasicMaterial({ map: mt }); m.userData.noPhoto = 1; return m; }));
mir.add(face);
var thorn = wqwLam(0x1A1418);
for (var k = 0; k < 40; k++) {
var a = k / 40 * Math.PI * 2, r = 1, px = Math.cos(a) * 3.3, py = Math.sin(a) * 4.8, t = new THREE.Mesh(wqwGeo("vthorn", function () { return new THREE.ConeGeometry(0.16, 1.2, 5); }), thorn);
t.position.set(px, py, 0.05);
t.rotation.z = a - Math.PI / 2 + (R() - 0.5) * 0.8;
mir.add(t);
}
var rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.18, 8, 48), thorn);
rim.scale.set(3.2, 4.7, 1);
mir.add(rim);
wqwShow("mirrorWhole", mir, true);
var sh = new THREE.Group();
g.add(sh);
var shM = wqiIce(0xD8ECFF, { op: 0.85, e: 0x3A6A9A });
for (k = 0; k < (lite ? 60 : 180); k++) {
var s = new THREE.Mesh(wqwGeo("vshard", function () { var gg = new THREE.TetrahedronGeometry(0.4, 0); gg.scale(0.5, 1.6, 0.12); return gg; }), shM);
s.position.set((R() - 0.5) * 24, 1 + R() * 12, (R() - 0.5) * 24);
s.rotation.set(R() * 6, R() * 6, R() * 6);
s.scale.setScalar(0.5 + R() * 1.4);
sh.add(s);
}
wqwShow("mirrorBurst", sh, false);
var L = new THREE.PointLight(0x8AB0E8, 1.4, 30);
L.position.set(0, 8, -4);
g.add(L);
if (typeof wqcMotes === "function")
wqcMotes(g, lite ? 40 : 120, 0, 0, 14, 1, 13, 0x8AB0E8);
};
})();
(function () {
var b0 = WQW_SCN.north.build;
WQW_SCN.north.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqeNorthH, R = wRand(9601);
var logs = wqwS("b:planks", 0x6A4A30, 2), snowM = wqwLam(0xF0F4F8);
var spots = [[-230, 230, 0.2], [-200, 212, -0.5], [-270, 214, 0.9], [-214, 170, 2.6], [-262, 170, -2.2], [-190, 250, 0.1]];
spots.forEach(function (p, i) {
var y = H(p[0], p[1]);
wqwHouse(G, p[0], p[1], 7, 6, 3.4, { y: y - 0.4, ry: p[2], wall: logs, roof: wqwS("b:slate", 0x4A4A50, 2) });
wqwSolid(p[0], p[1], 7.4, 6.4, y - 1, y + 6, p[2]);
var d = new THREE.Mesh(wqwGeo("drift", function () { var gg = new THREE.SphereGeometry(1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2); return gg; }), snowM);
d.position.set(p[0] + Math.sin(p[2] + 1.6) * 3.4, y - 0.4, p[1] + Math.cos(p[2] + 1.6) * 3.4);
d.scale.set(3.4, 1.6, 2.2);
d.rotation.y = p[2];
G.add(d);
if (i % 3 === 0)
wqwSmoke(G, p[0], y + 6, p[1], 0xB8B8C0, 5);
});
var ox = -254, oz = 180, oy = H(ox, oz);
wqwHouse(G, ox, oz, 7, 6, 3.2, { y: oy - 0.6, ry: 0, wall: logs, roof: wqwS("b:slate", 0x4A4A50, 2) });
wqwSolid(ox, oz, 7.4, 6.4, oy - 1, oy + 6, 0);
[[-3.8, 0, 1.2, 2.8], [3.8, 0, 1.2, 2.8], [0, -3.4, 3.6, 1.4]].forEach(function (b) { var d = new THREE.Mesh(wqwGeo("drift", function () { return new THREE.SphereGeometry(1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), snowM); d.position.set(ox + b[0], oy - 0.5, oz + b[1]); d.scale.set(b[2] * 1.6, 2.4, b[3] * 1.6); G.add(d); });
wqwDoorTo(G, "north", 1, ox, oz + 3.1, 0, "The door of the old man's cottage", 7, 6, { col: 0x3A2A1A, frame: logs, y: oy - 0.4 });
var r1 = wqwRoomBuild(G, "north", 1, 7, 6, 2.8, { wall: logs, floor: wqwMat("planks"), ceil: wqwS("b:planks", 0x5A4030, 2), env: "cottagecold", doorName: "The door, out into the snow" });
wqwBox(r1, 1.8, 1.3, 0.6, wqwMat("stone"), -2.4, 0, -2.6);
wqwFire(r1, -2.4, 0.2, -2.3, 0.45);
var l1 = new THREE.PointLight(0xFFA060, 0.7, 8);
l1.position.set(-2.4, 1, -2);
r1.add(l1);
wqwBed(r1, 2.2, -1.6, 0, 0x5A5A6A);
wqwChair(r1, -1, -0.4, 0.6, wqwMat("oak"));
wqwTable(r1, -0.2, -1.2, 1.2, 0.8, 0.74, wqwMat("oak"));
wqwShelves(r1, 3.3, 1.2, 1.4, 1.6, -Math.PI / 2);
wqwBox(r1, 0.3, 0.4, 0.04, wqwLam(0x8A6A3A), 3.2, 1.7, 1.0);
wqwPlant(G, "conifer", wqwScatter(9602, lite ? 60 : 180, -560, -240, -330, 160, function (x, z) { return Math.hypot(x + 318, z + 44) > 14; }, H, 0.9, 1.5), { col: 0x2E4A36 });
var mx = -318, mz = -50, my = H(mx, mz);
wqwHouse(G, mx, mz, 8, 6.5, 3.4, { y: my - 0.2, ry: 0.4, wall: logs, roof: wqwS("b:slate", 0x4A4A50, 2), shut: 0x5A2A1A });
wqwSolid(mx, mz, 8.4, 6.9, my - 1, my + 6, 0.4);
wqwSmoke(G, mx - 2, my + 6, mz, 0xB8B0A8, 5);
wqwBox(G, 1.0, 0.9, 0.08, wqwGlowM(0xFFB860, 0.85), mx + Math.sin(0.4) * 3.3 - 1.6, my + 1.3, mz + Math.cos(0.4) * 3.3);
wqwDoorTo(G, "north", 2, mx + Math.sin(0.4) * 3.35, mz + Math.cos(0.4) * 3.35, 0.4, "The door of the cottage at the forest's edge", 8, 6.5, { col: 0x4A3020, frame: logs, y: my });
var r2 = wqwRoomBuild(G, "north", 2, 8, 6.5, 3, { wall: wqwS("b:stucco", 0xE8DCC4, 3), floor: wqwMat("planks"), ceil: wqwS("b:planks", 0x7A5A3A, 2), env: "cottage", doorName: "The door, out to the forest" });
wqwBox(r2, 2, 1.5, 0.7, wqwMat("stone"), -2.4, 0, -2.9);
wqwFire(r2, -2.4, 0.2, -2.6, 0.55);
var l2 = new THREE.PointLight(0xFFA060, 1.0, 10);
l2.position.set(-2.4, 1, -2.2);
r2.add(l2);
var crib = new THREE.Group();
crib.position.set(-2.4, 0, -1.6);
r2.add(crib);
wqwBox(crib, 1.0, 0.5, 0.6, wqwMat("oak"), 0, 0.15, 0);
wqwBox(crib, 0.9, 0.1, 0.5, wqwLam(0xE8E0D0), 0, 0.6, 0);
wqwBox(crib, 0.84, 0.06, 0.3, wqwLam(0xC8D8E8), 0, 0.68, 0.08);
wqwTable(r2, 1.4, -1.4, 1.6, 0.9, 0.76, wqwMat("oak"));
wqwChair(r2, 1.4, -0.6, Math.PI, wqwMat("oak"));
wqwBed(r2, 2.8, 1.2, Math.PI / 2, 0x8A4A4A);
wqwRug(r2, -0.6, 0.4, 2.6, 2, 0x8A5A3A);
var loaf = new THREE.Mesh(wqwGeo("loaf", function () { var gg = new THREE.SphereGeometry(0.22, 12, 8); gg.scale(1.5, 0.8, 1); return gg; }), wqwLam(0xC8904A));
loaf.position.set(1.2, 0.9, -1.4);
r2.add(loaf);
wqhSleigh(G, WQW_AT.sleighNorth.x + 3, WQW_AT.sleighNorth.z, 0.6, H(WQW_AT.sleighNorth.x + 3, WQW_AT.sleighNorth.z));
};
})();
Object.assign(WQW_FOLK, {
oldman: { name: "The old man", dress: "wqfur", sex: "m", beard: "long", hair: 0xD8D8D8, persona: "You are an old man alone in a cottage half-buried in snow; your wife is dead, your children grown and gone to the cities. You are tired, and not afraid.", greet: "I wondered when you'd come for me." },
woodmother: { name: "The young woman", dress: "wqfurf", sex: "f", hair: 0x5A3A1A, persona: "You are a young mother in a cottage at the edge of a forest; your baby sleeps in a cradle by the fire.", greet: "Please. Just don't hurt my baby." }
});
Object.assign(WQW_SC, { summer: { x: 4000, name: "Alessia's realm of Summer", bound: 900, env: "summer" } });
Object.assign(WQW_ENV, {
goldeve: { top: 0x3A4A9A, low: 0xFFC078, fog: 0xE8B888, fogD: 0.0016, sun: 1.0, sunCol: 0xFFB060, sunDir: [-0.8, 0.18, 0.3], hemi: 0.82, hemiCol: 0xFFE0B8, hemiGround: 0x5A4A2A },
summerroom: { top: 0x5A4A30, low: 0xE8D0A0, fog: 0xC8A878, fogD: 0.004, sun: 0.7, sunCol: 0xFFE8C0, sunDir: [0.3, 0.8, 0.4], hemi: 1.0, hemiCol: 0xFFF0D8, hemiGround: 0x6A5A3A }
});
var WQJ_PAL = { x: 0, z: -90 };
Object.assign(WQW_AT, {
summerIn: { sc: "summer", x: 0, z: 372, name: "the hidden portal, into Summer", ry: 0 },
summerMeet: { sc: "summer", x: 0, z: 330, name: "where the heat hits you" },
summerOrchard: { sc: "summer", x: 30, z: 180, name: "the orchards, heavy with peaches and plums" },
summerSteps: { sc: "summer", x: 0, z: -40, name: "the steps of the golden palace" },
summerCourt: { sc: "summer", x: 0, z: -70, name: "the courtyard of fountains" },
summerArch: { sc: "summer", x: 0, z: -104, name: "the archway into the cool room" },
summerRoom: Object.assign(wqwInAt("summer", 0, 0, 1), { name: "the cool, spacious room" }),
summerWindow: Object.assign(wqwInAt("summer", 0, 0, -3.6), { name: "the window over the gardens" }),
summerRug: Object.assign(wqwInAt("summer", 0, 2, -1), { name: "the thick rugs on the floor" }),
pavilion: { sc: "summer", x: 96, z: -10, name: "the pavilion, open to the gardens" },
pavilionSeat: { sc: "summer", x: 93, z: -8, name: "the floor beside her place at the table" },
firepit: { sc: "summer", x: -96, z: -10, name: "the fire pit in the garden" },
firepitSeat: { sc: "summer", x: -96, z: -3, name: "beside Glacia, at the fire" },
twilightWalk: { sc: "summer", x: -60, z: 120, name: "the garden walk, under the golden twilight" }
});
function wqjSummerH(x, z) {
var n = wqwFbm(x * 0.005 + 7, z * 0.005, 4);
var h = n * 14 + wqwFbm(x * 0.03, z * 0.03, 2) * 0.8;
h *= wqwSmooth(60, 200, Math.hypot((x - WQJ_PAL.x) * 0.8, z - WQJ_PAL.z));
h += wqwSmooth(560, 820, Math.hypot(x, z)) * 120 * (0.5 + n);
return h;
}
WQW_SCN.summer = { h: wqjSummerH, start: { x: 0, z: 372, ry: 0 },
build: function (G) { return __ZC(502, 107, this, arguments, new.target); } };
WQB_FOLK_AT.summer = [["summerfolk", 20, 150, 0.4], ["summerfolk", -30, 90, 2.2], ["summerfolk", 90, -2, -1.2], ["summerfolk", 100, -16, 1.4], ["summerfolk", -14, -70, 0.8], ["summerfolk", 16, -60, -2.4], ["summerfolk", -60, 200, 1], ["summerfolk", 50, 250, -0.6]];
WQW_AT.summerOut = { sc: "summer", x: 0, z: 404, name: "the mortal side of the portal" };
WQW_AT.summerSleigh = { sc: "summer", x: 8, z: 440, name: "the sleigh" };
(function () {
var b0 = WQW_SCN.summer.build;
WQW_SCN.summer.build = function (G) {
b0(G);
var H = wqjSummerH, lite = wqwLite();
wqhSleigh(G, 12, 444, 0.4, H(12, 444));
var dry = wqwScatter(7811, lite ? 200 : 600, -300, 392, 300, 700, null, H, 0.6, 1);
wqwPlant(G, "grass", dry, { col: 0xA89A5A });
wqwPlant(G, "tree", wqwScatter(7812, lite ? 16 : 40, -400, 420, 400, 720, function (x, z) { return Math.abs(x) > 30; }, H, 0.8, 1.2), { col: 0xA8803A });
};
})();
Object.assign(WQW_AT, {
restClear: { sc: "border", x: -120, z: 236, name: "a small clearing, to rest" },
restFire: { sc: "border", x: -116, z: 232, name: "the cold fire she made" },
emptyVillage: { sc: "south", x: 250, z: -130, name: "an abandoned village, frost over everything" },
emptySquare: { sc: "south", x: 250, z: -176, name: "the town square" },
emptySleigh: { sc: "south", x: 250, z: -110, name: "the sleigh, in the empty street" },
oakClear: { sc: "border", x: 150, z: -150, name: "a clearing surrounded by ancient oaks" },
oakSleigh: { sc: "border", x: 142, z: -140, name: "the sleigh, among the oaks" },
threshold: { sc: "border", x: 170, z: -186, name: "the hidden cave mouth: the threshold" }
});
function wqkColdFire(G, x, y, z, s) { return __ZC(502, 108, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.border.build;
WQW_SCN.border.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqtBorderH, R = wRand(7901);
var c = WQW_AT.restFire;
wqkColdFire(G, c.x, H(c.x, c.z), c.z, 0.9);
wqwPlant(G, "conifer", wqwScatter(7902, lite ? 10 : 24, -170, 190, -70, 290, function (x, z) { return Math.hypot(x + 118, z - 234) > 12; }, H, 0.9, 1.3), { col: 0x3A5A44 });
var O = WQW_AT.oakClear, oaks = [];
for (var k = 0; k < 14; k++) {
var a = k / 14 * Math.PI * 2 + R() * 0.2, r = 20 + R() * 6, x = O.x + Math.cos(a) * r, z = O.z + Math.sin(a) * r;
oaks.push({ x: x, z: z, y: H(x, z), s: 1.7 + R() * 0.5, ry: R() * 6 });
wqwRound(x, z, 1.1);
}
wqwPlant(G, "tree", oaks.filter(function (t, i) { return i % 3 === 0; }), { col: 0xC8401A });
wqwPlant(G, "tree", oaks.filter(function (t, i) { return i % 3 === 1; }), { col: 0xE8A020 });
wqwPlant(G, "tree", oaks.filter(function (t, i) { return i % 3 === 2; }), { col: 0xB86A1A });
var litter = [];
for (k = 0; k < (lite ? 160 : 480); k++) {
var a2 = R() * Math.PI * 2, r2 = Math.sqrt(R()) * 30;
litter.push({ x: O.x + Math.cos(a2) * r2, z: O.z + Math.sin(a2) * r2, s: 0.6 + R() * 0.6 });
}
var lc = [0xC8401A, 0xE8A020, 0xB86A1A, 0x8A3A1A];
lc.forEach(function (col, i) { wqwInst(G, wqwGeo("leafL", function () { var g = new THREE.PlaneGeometry(0.3, 0.22); g.rotateX(-Math.PI / 2); return g; }), wqwLam(col), litter.filter(function (t, j) { return j % 4 === i; }).map(function (t) { return { x: t.x, z: t.z, y: H(t.x, t.z) + 0.04, s: t.s, ry: t.s * 9 }; }), {}); });
wqhSleigh(G, WQW_AT.oakSleigh.x + 3, WQW_AT.oakSleigh.z, -0.4, H(WQW_AT.oakSleigh.x + 3, WQW_AT.oakSleigh.z));
var T = WQW_AT.threshold, ty = H(T.x, T.z - 4), rk = wqwMat("rock");
[[-3.4, 0, 1.6, 4.2], [3.4, 0, 1.8, 4.6], [0, 4.4, 4.6, 1.4], [-5.6, -1, 2.4, 2.6], [5.8, -1, 2.2, 2.4]].forEach(function (b) { var m = new THREE.Mesh(wqwGeo("caveRock", function () { return new THREE.DodecahedronGeometry(1, 1); }), rk); m.position.set(T.x + b[0], ty + b[1] + b[3] * 0.5, T.z - 5); m.scale.set(b[2], b[3], 2.6); G.add(m); });
wqwBox(G, 5, 4.4, 0.4, wqwLam(0x060404), T.x, ty, T.z - 6.6);
wqwSolid(T.x, T.z - 6, 14, 4, ty - 1, ty + 8, 0);
var sh = wqwCanvas("thrsh", 128, 128, function (cx, W, Hh) { var g = cx.createRadialGradient(W / 2, Hh / 2, 4, W / 2, Hh / 2, W / 2); g.addColorStop(0, "rgba(255,170,80,.7)"); g.addColorStop(1, "rgba(160,60,20,0)"); cx.fillStyle = g; cx.fillRect(0, 0, W, Hh); });
var p = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 4.2), wqwM("thrshM", function () { var m = new THREE.MeshBasicMaterial({ map: sh, transparent: true, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
p.position.set(T.x, ty + 2.1, T.z - 6.3);
G.add(p);
var roots = wqwS("b:oak", 0x4A3020, 1.4);
for (k = 0; k < 8; k++) {
var rt = new THREE.Mesh(wqwGeo("root", function () { var cv = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.6, 1.4, 0.3), new THREE.Vector3(1.6, 2.6, 0), new THREE.Vector3(3, 3.2, -0.4)]); return new THREE.TubeGeometry(cv, 12, 0.16, 5, false); }), roots);
rt.position.set(T.x + (k < 4 ? -5 : 5) + (R() - 0.5), ty, T.z - 5 + (R() - 0.5) * 2);
rt.rotation.y = (k < 4 ? 0 : Math.PI) + (R() - 0.5);
G.add(rt);
}
};
})();
(function () {
var b0 = WQW_SCN.south.build;
WQW_SCN.south.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqeSouthH, R = wRand(9701), V = WQW_AT.emptyVillage, S = WQW_AT.emptySquare;
var frost = wqwLam(0xE8F0F6), dark = wqwLam(0x0A0806), cols = [0xD8D0C4, 0xC8C0B4, 0xE0D8CC];
var hs = [[-26, -16, 0.1], [-12, -24, 0], [6, -24, 0.05], [22, -16, -0.1], [-28, 10, Math.PI / 2], [28, 6, -Math.PI / 2], [-14, 28, Math.PI], [10, 28, Math.PI], [-30, 40, Math.PI / 2], [32, 40, -Math.PI / 2]];
hs.forEach(function (h, i) {
var x = S.x + h[0], z = S.z + h[1], y = H(x, z), ry = h[2] + Math.PI;
wqwHouse(G, x, z, 8, 6.5, 3.6, { y: y - 0.2, ry: ry, wall: wqwS("b:planks", [0x6A5040, 0x5A4A3A, 0x7A6050][i % 3], 2), roof: wqwS("b:slate", 0xD8E0E8, 2), shut: 0x3A2A1A });
wqwSolid(x, z, 8.4, 6.9, y - 1, y + 7, ry);
var dx = x + Math.sin(ry) * 3.3, dz = z + Math.cos(ry) * 3.3;
var d = new THREE.Group();
d.position.set(dx, y, dz);
d.rotation.y = ry;
G.add(d);
wqwBox(d, 1.3, 2.3, 0.08, dark, 0, 0, 0.02);
var lf = wqwBox(d, 0.1, 2.3, 1.2, wqwLam(0x4A3420), 0.65, 0, 0.62);
lf.rotation.y = 0.2;
});
var drop = [];
for (var k = 0; k < (lite ? 16 : 40); k++)
drop.push({ x: S.x + (R() - 0.5) * 50, z: S.z + (R() - 0.5) * 60, k: k % 5 });
drop.forEach(function (d) {
if (Math.hypot(d.x - S.x, d.z - S.z) < 5)
return;
var y = H(d.x, d.z), m;
if (d.k === 0)
m = wqwBox(G, 0.6, 0.4, 0.5, wqwLam(0x8A6A4A), d.x, y, d.z, R() * 6);
else if (d.k === 1)
m = wqwCyl(G, 0.3, 0.24, 0.36, wqwLam(0xA88A5A), d.x, y, d.z, 10);
else if (d.k === 2)
m = wqwBox(G, 0.8, 0.12, 0.6, wqwLam([0x8A3A3A, 0x3A5A8A, 0x6A6A4A][R() * 3 | 0]), d.x, y, d.z, R() * 6);
else if (d.k === 3)
m = wqwBox(G, 0.22, 0.12, 0.1, wqwLam(0x3A2A1A), d.x, y, d.z, R() * 6);
else
m = wqwBox(G, 0.4, 0.6, 0.14, wqwLam(0xC8A890), d.x, y, d.z, R() * 6);
});
var cart = new THREE.Group();
cart.position.set(S.x + 12, H(S.x + 12, S.z + 8), S.z + 8);
cart.rotation.set(0, 0.6, 1.3);
G.add(cart);
wqwBox(cart, 2.4, 0.6, 1.4, wqwMat("planks"), 0, 0.6, 0);
[-0.8, 0.8].forEach(function (z) { var w = wqwCyl(cart, 0.6, 0.6, 0.1, wqwMat("oak"), 0.8, 0.6, z, 14); });
var fp = wqwScatter(9702, lite ? 30 : 90, S.x - 50, S.z - 50, S.x + 50, S.z + 60, null, H, 1, 2.4);
fp.forEach(function (t) { var m = new THREE.Mesh(wqwGeo("frostG", function () { var g = new THREE.CircleGeometry(1, 10); g.rotateX(-Math.PI / 2); return g; }), frost); m.position.set(t.x, t.y + 0.06, t.z); m.scale.set(t.s * 2.4, 1, t.s * 1.6); m.rotation.y = t.ry; G.add(m); });
var wy = H(S.x + 6, S.z - 6);
wqwCyl(G, 1.1, 1.1, 0.9, wqwMat("stone"), S.x + 6, wy, S.z - 6, 14);
wqwRound(S.x + 6, S.z - 6, 1.2, wy - 1, wy + 2);
[-0.9, 0.9].forEach(function (o) { wqwBox(G, 0.14, 2.2, 0.14, wqwMat("oak"), S.x + 6 + o, wy, S.z - 6); });
wqwBox(G, 2, 0.14, 0.14, wqwMat("oak"), S.x + 6, wy + 2.2, S.z - 6);
wqhSleigh(G, WQW_AT.emptySleigh.x + 3, WQW_AT.emptySleigh.z, 0.2, H(WQW_AT.emptySleigh.x + 3, WQW_AT.emptySleigh.z));
};
})();
Object.assign(WQW_FOLK, {
thomas: { name: "Thomas, frozen where he stood", dress: "town", sex: "m", hair: 0x6A4A2A, persona: "village", greet: "(He is frozen solid, his face locked in terror.)", look: function (g) { wqiFreeze(g); } }
});
var WQL = { x: -40, z: 28, ry: Math.PI * 0.35 };
Object.assign(WQW_AT, {
autumnCave: { sc: "autumn", x: 0, z: 352, name: "the cave mouth, out of the dark", ry: 0 },
autumnMusic: { sc: "autumn", x: -10, z: 180, name: "the oaks and maples, following the music" },
thresholdOut: { sc: "autumn", x: WQL.x + Math.sin(WQL.ry) * 30, z: WQL.z + Math.cos(WQL.ry) * 30, name: "before The Threshold", ry: WQL.ry },
cabaret: Object.assign(wqwInAt("autumn", 0, 0, 4), { name: "inside The Threshold" }),
cabaretTable: Object.assign(wqwInAt("autumn", 0, 7, 4.6), { name: "a table near the back" }),
cabaretStage: Object.assign(wqwInAt("autumn", 0, 0, -6), { name: "the stage" }),
coraDine: Object.assign(wqwInAt("autumn", 1, 0, 1.2), { name: "the private dining room" }),
coraDineSeat: Object.assign(wqwInAt("autumn", 1, 1.8, 0.6), { name: "beside Glacia's chair" }),
coraBed: Object.assign(wqwInAt("autumn", 2, 1.4, 0.4), { name: "the floor beside the bed" }),
coraWindow: Object.assign(wqwInAt("autumn", 2, -2, -3.2), { name: "the window on the falling leaves" })
});
Object.assign(WQW_ENV, {
cabaret: { top: 0x1A0808, low: 0x5A1A14, fog: 0x2A0C0A, fogD: 0.012, sun: 0.35, sunCol: 0xFFB070, sunDir: [0.1, 0.9, 0.2], hemi: 0.9, hemiCol: 0xFFC890, hemiGround: 0x3A0E0A },
greysky: { top: 0x6A707A, low: 0xB8BCC2, fog: 0xA8ACB2, fogD: 0.0022, sun: 0.4, sunCol: 0xD8DCE2, sunDir: [0.3, 0.6, 0.3], hemi: 0.7, hemiCol: 0xD0D4DA, hemiGround: 0x4A4A44 }
});
(function () {
var b0 = WQW_SCN.autumn.build;
WQW_SCN.autumn.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqrAutumnH, R = wRand(7701);
(function () {
var x = 0, z = 360, y = H(x, z), rk = wqwMat("rock");
[[-3.6, 0, 1.8, 4.4], [3.6, 0, 2, 4.6], [0, 4.6, 4.8, 1.5], [-6, -1, 2.6, 2.8], [6, -1, 2.4, 2.6]].forEach(function (b) { var m = new THREE.Mesh(wqwGeo("caveRock", function () { return new THREE.DodecahedronGeometry(1, 1); }), rk); m.position.set(x + b[0], y + b[1] + b[3] * 0.5, z); m.scale.set(b[2], b[3], 2.8); G.add(m); });
wqwBox(G, 5, 4.4, 0.4, wqwLam(0x060404), x, y, z - 1.4);
wqwSolid(x, z + 1, 15, 4, y - 1, y + 8, 0);
var p = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 4.2), wqwM("autCaveSh", function () { var m = new THREE.MeshBasicMaterial({ color: 0xFFAA50, transparent: true, opacity: 0.35, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
p.position.set(x, y + 2.1, z - 1.1);
G.add(p);
})();
var X = WQL.x, Z = WQL.z, ry = WQL.ry, y = H(X, Z), W = 26, D = 20, Ht = 9, wood = wqwS("b:planks", 0x2E1A10, 1.6), beam = wqwS("b:oak", 0x1E0E06, 1.4), woodD = wqwS("b:oak", 0x24120A, 1.4, { shine: 30 }), stone = wqwS("b:ashlar", 0x8A7A6A, 2.2), gO = wqxGlowStart();
var g = new THREE.Group();
g.position.set(X, y - 0.3, Z);
g.rotation.y = ry;
G.add(g);
wqwSolid(X, Z, W + 0.4, D + 0.4, y - 1, y + Ht + 6, ry);
wqwBox(g, W + 1, 0.9, D + 1, stone, 0, 0, 0);
wqwBox(g, W, Ht, D, wood, 0, 0.9, 0);
[-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) { wqwBox(g, 0.7, Ht + 0.2, 0.7, beam, sx * W / 2, 0.9, sz * D / 2); }); });
[-11, -7, -3, 3, 7, 11].forEach(function (x) { wqwBox(g, 0.4, Ht, 0.3, beam, x, 0.9, D / 2 + 0.1); });
[-8, -4, 0, 4, 8].forEach(function (z) { [-1, 1].forEach(function (s) { wqwBox(g, 0.3, Ht, 0.4, beam, s * (W / 2 + 0.1), 0.9, z); }); });
wqwBox(g, W + 0.6, 0.4, D + 0.6, beam, 0, 5.4, 0);
wqwBox(g, W + 1.2, 0.5, D + 1.2, beam, 0, Ht + 0.6, 0);
var slate = wqwS("b:slate", 0x2E2A30, 1.6), rh = 7.5, rl = Math.hypot(W / 2 + 1.4, rh);
[-1, 1].forEach(function (s) { var r = new THREE.Mesh(wqwBoxG(rl, 0.3, D + 2.4), slate); r.position.set(s * (W / 2 + 1.4) / 2, Ht + 1.1 + rh / 2, 0); r.rotation.z = -s * Math.atan2(rh, W / 2 + 1.4); g.add(r); });
var gab = new THREE.Shape();
gab.moveTo(-W / 2, 0);
gab.lineTo(W / 2, 0);
gab.lineTo(0, rh);
gab.closePath();
[-1, 1].forEach(function (s) { var gm = new THREE.Mesh(new THREE.ShapeGeometry(gab), wood); gm.position.set(0, Ht + 1.1, s * (D / 2 + 0.02)); if (s < 0)
gm.rotation.y = Math.PI; g.add(gm); });
var rose = new THREE.Mesh(new THREE.CircleGeometry(1.8, 32), wqxStainedM("autumnRose", 1.25));
rose.position.set(0, Ht + 3.6, D / 2 + 0.06);
g.add(rose);
var rr = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.16, 8, 32), beam);
rr.position.copy(rose.position);
g.add(rr);
wqxGlow(gO, 0, Ht + 3.6, D / 2 + 0.4, 0xFFB060, 5);
wqwBox(g, 1.6, 5, 1.6, stone, W / 2 - 4, Ht + 2, -4);
wqwSmoke(G, X + Math.cos(ry) * (W / 2 - 4) + Math.sin(ry) * -4, y + Ht + 7.4, Z - Math.sin(ry) * (W / 2 - 4) + Math.cos(ry) * -4, 0x8A7A6A, 8);
var sgM = wqxStainedM("autumn", 1.3);
function win(x, z, ryw) {
var wg = new THREE.Group();
wg.position.set(x, 2.0, z);
wg.rotation.y = ryw;
g.add(wg);
var p = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 5.4), sgM);
p.position.set(0, 2.7, 0.12);
wg.add(p);
wqwBox(wg, 2.7, 0.3, 0.4, beam, 0, -0.1, 0.1);
[-1, 1].forEach(function (s) { wqwBox(wg, 0.25, 5.5, 0.36, beam, s * 1.22, 0, 0.1); });
var arch = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.14, 6, 16, Math.PI), beam);
arch.position.set(0, 4.5, 0.14);
wg.add(arch);
var v = new THREE.Vector3(0, 2.7, 1.2).applyAxisAngle(new THREE.Vector3(0, 1, 0), ryw).add(new THREE.Vector3(x, 2.0, z));
wqxGlow(gO, v.x, v.y, v.z, 0xFFA040, 3.6);
var pl = new THREE.Vector3(0, 0, 3.2).applyAxisAngle(new THREE.Vector3(0, 1, 0), ryw).add(new THREE.Vector3(x, 0.95, z));
wqxPool(g, pl.x, pl.y, pl.z, 2.6, 0xFF9A40, 0.38);
}
[-9, -5, 5, 9].forEach(function (wx) { win(wx, D / 2, 0); });
[-6, -2, 2, 6].forEach(function (wz) { win(W / 2, wz, Math.PI / 2); win(-W / 2, wz, -Math.PI / 2); });
[-8, -3, 3, 8].forEach(function (wx) { win(wx, -D / 2, Math.PI); });
var pg = new THREE.Group();
pg.position.set(0, 0, D / 2);
g.add(pg);
[-1.9, 1.9].forEach(function (px) { wqwCyl(pg, 0.18, 0.22, 4.4, woodD, px, 0.9, 3.2, 10); });
var pr = new THREE.Mesh(wqwBoxG(5.2, 0.25, 3.8), slate);
pr.position.set(0, 5.5, 1.8);
pr.rotation.x = 0.18;
pg.add(pr);
wqwBox(pg, 4.6, 0.3, 0.3, beam, 0, 5.1, 3.3);
for (var st = 0; st < 3; st++)
wqwBox(pg, 4.6 - st * 0.3, 0.3, 1.0, stone, 0, st * 0.3, 3.6 - st * 0.8);
wqwBox(pg, 3.4, 4.4, 0.3, beam, 0, 0.9, 0.06);
[-0.8, 0.8].forEach(function (dx) { wqwBox(pg, 1.5, 4.0, 0.12, woodD, dx, 0.95, 0.24); wqwBox(pg, 0.06, 0.5, 0.06, wqxBrass(), dx > 0 ? 0.25 : -0.25, 2.6, 0.34); for (var pnl = 0; pnl < 3; pnl++)
wqwBox(pg, 1.1, 1.0, 0.04, beam, dx, 1.2 + pnl * 1.25, 0.31); });
var dArch = new THREE.Mesh(new THREE.CircleGeometry(1.5, 24, 0, Math.PI), sgM);
dArch.position.set(0, 4.95, 0.25);
pg.add(dArch);
[-2.6, 2.6].forEach(function (lx) { wqxLanternPost(pg, lx, 0.9, 3.9, gO, 2.4); });
var br = new THREE.Mesh(wqwBoxG(0.08, 0.08, 1.6), wqwShine(0x141414, 0.5, 0.7));
br.position.set(0, 6.3, 1.1);
pg.add(br);
var sgn = wqwCanvas("thresholdIron", 512, 160, function (c, Wc, Hc) {
c.clearRect(0, 0, Wc, Hc);
c.strokeStyle = "#141414";
c.lineWidth = 7;
c.lineCap = "round";
c.beginPath();
c.moveTo(20, 20);
c.bezierCurveTo(140, 0, 370, 0, 492, 20);
c.stroke();
c.beginPath();
c.moveTo(20, 140);
c.bezierCurveTo(140, 160, 370, 160, 492, 140);
c.stroke();
[[20, 20], [492, 20], [20, 140], [492, 140]].forEach(function (p) { c.beginPath(); c.arc(p[0], p[1], 12, 0, 5.5); c.stroke(); });
c.font = "italic bold 70px Georgia";
c.textAlign = "center";
c.textBaseline = "middle";
c.lineWidth = 10;
c.strokeStyle = "#141414";
c.strokeText("The Threshold", Wc / 2, Hc / 2 + 4);
c.fillStyle = "#F0C060";
c.fillText("The Threshold", Wc / 2, Hc / 2 + 4);
});
var sm = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.3), wqwM("thresholdIronM", function () { var m = new THREE.MeshBasicMaterial({ map: sgn, transparent: true, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
sm.position.set(0, 5.6, 1.9);
pg.add(sm);
wqxGlow(gO, 0, 5.6, D / 2 + 2.0, 0xFFC060, 2.4);
var lamp = new THREE.PointLight(0xFFB060, 1.6, 22);
lamp.position.set(0, 4, D / 2 + 3);
g.add(lamp);
wqxGlowDone(g, gO, 1.2);
var fa = WQW_AT.thresholdOut;
wqwDoorTo(G, "autumn", 0, X + Math.sin(ry) * (D / 2 + 0.5), Z + Math.cos(ry) * (D / 2 + 0.5), ry, "The door of The Threshold", 30, 22, { col: 0x4A1A0E, frame: woodD, y: y + 0.3, hide: 1 });
(function () {
var near = wqwScatter(7711, lite ? 90 : 260, -200, -160, 160, 360, function (x, z) { var dPath = Math.abs(x - Math.sin(z * 0.01) * 20); return Math.hypot(x - X, z - Z) > 30 && dPath > 6 && Math.hypot(x, z - 60) > 26; }, H, 0.9, 1.4);
wqxTrees(G, "maple", near.filter(function (t, i) { return i % 3 !== 2; }), [0xC8301A, 0xE07A1A, 0xA8200E, 0xE8A030]);
wqxTrees(G, "oak", near.filter(function (t, i) { return i % 3 === 2; }), [0xC8901A, 0x9A5A1A, 0xB8701A]);
var lp = [];
for (var z2 = 330; z2 >= 40; z2 -= 26) {
var px2 = Math.sin(z2 * 0.01) * 20;
[-1, 1].forEach(function (s) { var lx = px2 + s * 3.4; if (Math.hypot(lx - X, z2 - Z) > 16)
lp.push([lx, z2]); });
}
var gF = wqxGlowStart();
lp.forEach(function (q, i) { if (i % 2 === 0 || !lite)
wqxLanternPost(G, q[0], H(q[0], q[1]), q[1], gF, 2.6); });
wqxGlowDone(G, gF, 1.2);
wqxLeaves(G, X, y + 1, Z, 40, 12, 40, lite ? 60 : 200, 7712);
})();
var Hh = 10, velvet = wqwS("b:velvet", 0x8A1420, 1.6), damask = wqwS("b:damask", 0x7A1420, 1.8), oakD = wqwS("b:oak", 0x2A1408, 1.4, { shine: 40, spec: 0x3A2A1A });
var gR = wqwRoomBuild(G, "autumn", 0, 30, 22, Hh, { wall: damask, floor: oakD, ceil: wqwS("b:oak", 0x1E0E06, 1.4), env: "cabaret", doorName: "The door, out into the forest", day: 0xFFB060 });
var gl = wqxGlowStart(), cl = [], gi = wqxGilt(), A0r = gR.userData.A;
wqxPanelling(gR, 30, 22, Hh, { h0: 1.3, step: 4, skip: [["s", 0, 1.4], ["w", -2, 1.2], ["n", 0, 8.6]] });
var gY = 4.6, gD = 2.6, bal = [], cols = [];
[["w", -15 + gD / 2, 0, 22, Math.PI / 2], ["e", 15 - gD / 2, 0, 22, -Math.PI / 2], ["s", 0, 11 - gD / 2, 30, Math.PI]].forEach(function (S) {
var isX = S[0] !== "s";
wqwBox(gR, isX ? gD : S[3], 0.3, isX ? S[3] - 0.2 : gD, oakD, S[1], gY, S[2]);
var fx = isX ? (S[0] === "w" ? -15 + gD : 15 - gD) : 0, fz = isX ? 0 : 11 - gD;
wqwBox(gR, isX ? 0.16 : S[3] - gD * 2, 0.12, isX ? S[3] - gD * 2 - 0.2 : 0.16, gi, fx, gY + 1.0, fz);
wqwBox(gR, isX ? 0.2 : S[3] - gD * 2, 0.26, isX ? S[3] - gD * 2 - 0.2 : 0.2, gi, fx, gY + 0.28, fz);
var n = Math.floor((S[3] - gD * 2) / 0.32);
for (var i = 0; i < n; i++) {
var u = -(S[3] - gD * 2) / 2 + 0.16 + i * 0.32;
bal.push(isX ? { x: fx, y: gY + 0.54, z: u } : { x: u, y: gY + 0.54, z: fz });
}
for (var c = -(S[3] - gD * 2) / 2 + 1; c < (S[3] - gD * 2) / 2; c += 4) {
cols.push(isX ? { x: fx, z: c } : { x: c, z: fz });
}
for (c = -(S[3] - gD * 2) / 2 + 2; c < (S[3] - gD * 2) / 2 - 1; c += 4) {
var bx = isX ? (S[0] === "w" ? -15 + 0.4 : 15 - 0.4) : c, bz = isX ? c : 11 - 0.4;
wqxDrape(gR, isX ? bx : bx - 0.9, gY + 3.4, isX ? bz - 0.9 : bz, 0.9, 3.0, S[4], velvet, { fringe: 1, tie: 1 });
wqxDrape(gR, isX ? bx : bx + 0.9, gY + 3.4, isX ? bz + 0.9 : bz, 0.9, 3.0, S[4], velvet, { fringe: 1, tie: 1 });
var lx = isX ? bx + (S[0] === "w" ? 0.9 : -0.9) : bx, lz = isX ? bz : bz - 0.9;
wqxLamp(gR, lx, gY + 0.3, lz, gl);
}
});
wqwInst(gR, wqwGeo("wqxBaluster", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.07, 0), new THREE.Vector2(0.05, 0.08), new THREE.Vector2(0.035, 0.2), new THREE.Vector2(0.07, 0.32), new THREE.Vector2(0.03, 0.44), new THREE.Vector2(0.06, 0.5), new THREE.Vector2(0, 0.5)], 8); }), gi, bal);
cols.forEach(function (c) { wqwCyl(gR, 0.18, 0.22, gY, gi, c.x, 0, c.z, 14); wqwBox(gR, 0.6, 0.3, 0.6, gi, c.x, gY - 0.3, c.z); wqwRound(A0r.x + c.x, A0r.z + c.z, 0.25, WQW_IN_Y - 1, WQW_IN_Y + gY); wqxSconce(gR, c.x + (c.x < -5 ? 0.24 : c.x > 5 ? -0.24 : 0), 2.6, c.z + (Math.abs(c.x) < 5 ? -0.24 : 0), c.x < -5 ? Math.PI / 2 : c.x > 5 ? -Math.PI / 2 : Math.PI, gl, cl); });
[-8, -4, 4, 8].forEach(function (z) { wqxMirror(gR, -14.86, 1.5, z, 1.5, 2.6, Math.PI / 2); wqxMirror(gR, 14.86, 1.5, z + (z > 0 ? -1 : 0), 1.5, 2.6, -Math.PI / 2); wqxMirror(gR, -14.86, gY + 1.2, z, 1.3, 2.2, Math.PI / 2, { oval: 1 }); wqxMirror(gR, 14.86, gY + 1.2, z, 1.3, 2.2, -Math.PI / 2, { oval: 1 }); });
[-10, -6, 6, 10].forEach(function (x) { wqxMirror(gR, x, 1.5, 10.86, 1.5, 2.6, Math.PI); });
var sg = wqxStainedM("autumn", 1.3);
[-6, -2, 2, 6].forEach(function (z) { [-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.8), sg); p.position.set(s * 14.9, gY + 3.8, z); p.rotation.y = -s * Math.PI / 2; gR.add(p); wqxShaft(gR, s * 14.6, gY + 4.6, z, 9, 0.6, 1.6, 0xFFB060, 0.07, s * 6, 0, z * 0.6); }); });
var apr = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 1.2, 32, 1, false, -Math.PI / 2, Math.PI), wqwS("b:oak", 0x2A1206, 1.4, { shine: 50 }));
apr.position.set(0, 0.6, -5);
gR.add(apr);
wqwFloor(A0r.x, A0r.z - 3.2, 6, 3.6, WQW_IN_Y + 1.2);
var lip = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.06, 6, 32, Math.PI), gi);
lip.rotation.set(Math.PI / 2, 0, Math.PI);
lip.position.set(0, 1.2, -5);
gR.add(lip);
for (var fl = 0; fl < 11; fl++) {
var a = Math.PI + fl / 10 * Math.PI, fx2 = Math.cos(a) * 3.95, fz2 = -5 - Math.sin(a) * 3.95;
var sh2 = new THREE.Mesh(wqwGeo("footShell", function () { return new THREE.SphereGeometry(0.12, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2); }), wqxBrass());
sh2.position.set(fx2, 1.2, fz2);
gR.add(sh2);
wqxGlow(gl, fx2, 1.3, fz2, 0xFFD8A0, 0.8);
}
[-1, 1].forEach(function (s) {
wqwCyl(gR, 0.36, 0.42, 7.4, gi, s * 8.6, 1.2, -5.2, 16);
wqwBox(gR, 1.2, 0.6, 1.2, gi, s * 8.6, 0.6, -5.2);
wqxDrape(gR, s * 7.2, 8.6, -5.6, 3.2, 7.4, 0, velvet, { fringe: 1, depth: 0.22, fold: 2 });
wqxDrape(gR, s * 11.6, Hh - 0.3, -5.4, 5.8, Hh - 1.6, 0, velvet, { fringe: 1, depth: 0.18 });
});
wqwBox(gR, 18.4, 1.0, 0.6, gi, 0, 8.6, -5.2);
var crest = new THREE.Mesh(wqwGeo("wqxStCrest", function () { return new THREE.TorusKnotGeometry(0.5, 0.12, 60, 8, 2, 5); }), gi);
crest.position.set(0, 9.4, -5);
crest.scale.set(1.6, 0.8, 0.3);
gR.add(crest);
for (var sw = 0; sw < 4; sw++)
wqxSwag(gR, -6.6 + sw * 4.4, 8.5, -5.0, 4.4, 0.9, 0, velvet);
wqxDrape(gR, 0, 8.6, -10.8, 16, 7.4, 0, wqwS("b:velvet", 0x5A0A14, 1.6), { depth: 0.16, fold: 2 });
var spot = new THREE.SpotLight(0xD0203A, wqwLite() ? 2.2 : 3.2, 26, 0.36, 0.6);
spot.position.set(0, gY + 0.8, 6);
spot.target.position.set(0, 1.2, -7);
gR.add(spot);
gR.add(spot.target);
WQI.cabaretSpot = spot;
wqxShaft(gR, 0, gY + 0.8, 6.4, 15, 0.2, 2.2, 0xC0182A, 0.11, 0, 1.2, -7.4);
wqxPool(gR, 0, 1.22, -7.4, 3.2, 0xC0203A, 0.55);
var red = new THREE.PointLight(0xB0182A, 0.9, 14);
red.position.set(0, 3, -8);
gR.add(red);
var mic = wqwCyl(gR, 0.03, 0.05, 1.6, wqwShine(0xC0C0C8, 0.3, 0.9), 0, 1.2, -7.4, 8);
var mh = new THREE.Mesh(wqwGeo("micHead", function () { return new THREE.SphereGeometry(0.06, 10, 8); }), wqwShine(0xC0C0C8, 0.3, 0.9));
mh.position.set(0, 2.86, -7.4);
gR.add(mh);
(function () {
var pg = new THREE.Group();
pg.position.set(-6.2, 1.2, -8.6);
pg.rotation.y = 0.5;
gR.add(pg);
var lac = wqwShine(0x0A0808, 0.15, 0.3);
var sh = new THREE.Shape();
sh.moveTo(-0.75, 0);
sh.lineTo(0.75, 0);
sh.lineTo(0.75, -1.0);
sh.bezierCurveTo(0.75, -1.9, -0.1, -1.6, -0.3, -2.2);
sh.lineTo(-0.75, -2.2);
sh.closePath();
var body = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.32, bevelEnabled: false }), lac);
body.rotation.x = Math.PI / 2;
body.position.y = 0.95;
pg.add(body);
var lid = new THREE.Mesh(new THREE.ShapeGeometry(sh), lac);
lid.rotation.set(Math.PI / 2 - 0.75, 0, 0);
lid.position.set(0, 0.98, 0);
pg.add(lid);
[[-0.6, -0.1], [0.6, -0.1], [-0.4, -2.0]].forEach(function (l) { wqwCyl(pg, 0.06, 0.05, 0.65, lac, l[0], 0, l[1], 8); });
wqwBox(pg, 1.4, 0.1, 0.25, wqwLam(0xF0ECE0), 0, 0.86, 0.18);
wqwBox(pg, 0.9, 0.5, 0.4, wqwS("b:velvet", 0x5A0A14, 1.6), 0, 0, 0.8);
})();
(function () {
var bg = new THREE.Group();
bg.position.set(6.4, 1.2, -8.8);
bg.rotation.y = -0.4;
gR.add(bg);
var wd = wqwShine(0x6A2A0E, 0.3, 0.1);
var bd = new THREE.Mesh(wqwGeo("bassBody", function () { var g = new THREE.SphereGeometry(0.4, 14, 10); g.scale(1, 1.5, 0.35); return g; }), wd);
bd.position.y = 0.75;
bg.add(bd);
var bd2 = new THREE.Mesh(wqwGeo("bassBody", null), wd);
bd2.scale.set(0.8, 0.7, 1);
bd2.position.y = 1.3;
bg.add(bd2);
wqwCyl(bg, 0.03, 0.04, 1.1, wqwLam(0x0A0806), 0, 1.5, 0.06, 6);
for (var s2 = 0; s2 < 4; s2++)
wqwCyl(bg, 0.004, 0.004, 1.7, wqwShine(0xD8D0C0, 0.3, 0.9), -0.045 + s2 * 0.03, 0.6, 0.15, 3);
var tr = new THREE.Mesh(wqwGeo("trumpet", function () { var pts = []; for (var i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(new THREE.Vector2(0.012 + Math.pow(t, 4) * 0.09, t * 0.55));
} return new THREE.LatheGeometry(pts, 14); }), wqxBrass());
tr.rotation.z = Math.PI / 2;
tr.position.set(1.4, 0.7, 0.2);
bg.add(tr);
wqwChair(bg, 1.4, 0, 0, wqwS("b:velvet", 0x6A1018, 1.6));
})();
var tables = [];
for (var tx = -10; tx <= 10; tx += 5)
for (var tz = -1; tz <= 8; tz += 3.4) {
if (Math.abs(tx) < 3 && tz < 1)
continue;
tables.push([tx + (R() - 0.5) * 0.8, tz + (R() - 0.5) * 0.6]);
}
var clothM = [wqwS("b:velvet", 0x3A060C, 1.2), wqwS("b:damask", 0x1A0A0A, 1.2)];
tables.forEach(function (t, i) {
wqxCafeTable(gR, t[0], t[1], 0.6, clothM[i % 2], gl);
wqwRound(A0r.x + t[0], A0r.z + t[1], 0.85, WQW_IN_Y - 1, WQW_IN_Y + 1);
for (var c2 = 0; c2 < 3; c2++) {
var a3 = c2 / 3 * Math.PI * 2 + R();
wqwChair(gR, t[0] + Math.cos(a3) * 1.15, t[1] + Math.sin(a3) * 1.15, -a3 - Math.PI / 2, wqwS("b:velvet", 0x6A1018, 1.6), 1);
}
});
wqwRug(gR, 0, 6, 3, 9, 0x5A0A10);
(function () {
var x = 11.4;
wqwBox(gR, 0.9, 1.1, 7, wqwS("b:oak", 0x1E0C04, 1.4, { shine: 60 }), x, 0, 5.6, 0, 1);
wqwBox(gR, 1.1, 0.08, 7.2, wqwShine(0x2A1206, 0.25, 0.2), x, 1.1, 5.6);
var rl = wqwCyl(gR, 0.035, 0.035, 7, wqxBrass(), x - 0.6, 0.25, 5.6, 8);
rl.rotation.x = Math.PI / 2;
rl.position.y = 0.25;
wqxMirror(gR, 14.86, 1.3, 5.6, 5, 1.6, -Math.PI / 2);
var bots = [];
for (var sh = 0; sh < 3; sh++) {
wqwBox(gR, 0.4, 0.05, 6, wqwS("b:oak", 0x1E0C04, 1.4), 14.6, 1.3 + sh * 0.55 + (sh ? 0.4 : 0), 5.6);
for (var b = 0; b < 16; b++)
bots.push({ x: 14.6, y: 1.36 + sh * 0.55 + (sh ? 0.4 : 0), z: 2.9 + b * 0.36 + (R() - 0.5) * 0.08, s: 0.9 + R() * 0.3 });
}
var bc = [0x9A3A0A, 0x5A0A14, 0x2A4A1A, 0xC88A2A];
bc.forEach(function (col, ci) { wqwInst(gR, wqwGeo("wqxBottle", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.05, 0), new THREE.Vector2(0.05, 0.2), new THREE.Vector2(0.02, 0.27), new THREE.Vector2(0.015, 0.34), new THREE.Vector2(0, 0.34)], 8); }), wqiIce(col, { op: 0.85, e: col }), bots.filter(function (b2, i) { return i % 4 === ci; })); });
for (var k = 0; k < 4; k++) {
cl.push({ x: x, y: 1.18, z: 3 + k * 1.8, h: 0.12 });
}
})();
[[-8, 3], [0, 1.5], [8, 3]].forEach(function (p, i) { wqxChandelier(gR, p[0], Hh - 1.6, p[1], i === 1 ? 1.8 : 1.4, 3, gl, cl, Hh); });
for (var cx = -12; cx <= 12; cx += 4)
wqwBox(gR, 0.24, 0.3, 22, gi, cx, Hh - 0.3, 0);
for (var cz = -9; cz <= 9; cz += 3)
wqwBox(gR, 30, 0.3, 0.24, gi, 0, Hh - 0.3, cz);
var rose = new THREE.Mesh(wqwGeo("wqxRose", function () { return new THREE.TorusGeometry(1.2, 0.18, 8, 40); }), gi);
rose.rotation.x = Math.PI / 2;
rose.position.set(0, Hh - 0.2, 1.5);
gR.add(rose);
var warm = new THREE.PointLight(0xFFB070, 1.6, 30);
warm.position.set(0, 6, 2);
gR.add(warm);
var warm2 = new THREE.PointLight(0xFF9A50, 0.8, 18);
warm2.position.set(-9, 3, 4);
gR.add(warm2);
wqxLeaves(gR, 0, 2, 1, 13, 6, 9, wqwLite() ? 30 : 90, 7714);
wqxCandles(gR, cl, gl);
wqxGlowDone(gR, gl, 0.7);
var A0 = gR.userData.A, A1 = wqwInAt("autumn", 1), A2 = wqwInAt("autumn", 2);
wqwBox(gR, 1.6, 2.6, 0.06, wqwShine(0xC8982A, 0.35, 0.8), -14.9, 0, -2, Math.PI / 2);
wqwSpot(A0.x - 14, A0.z - 2, 1.6, "A door that wasn't there before", "go through", function () { wqwGo({ sc: "autumn", x: A1.x, z: A1.z + 3, y: WQW_IN_Y, ry: 0 }, "🕯️ <b>The private dining room</b>", typeof wqbPopulate === "function" ? wqbPopulate : null); }, WQW_IN_Y);
var sunsetV = wqwM("sunsetVelvet", function () {
var t = wqwCanvas("sunsetVelT", 64, 256, function (c, W, H) { var g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, "#C8501A"); g.addColorStop(0.5, "#7A1420"); g.addColorStop(1, "#C8902A"); c.fillStyle = g; c.fillRect(0, 0, W, H); for (var i = 0; i < W; i += 4) {
c.fillStyle = "rgba(0,0,0," + (0.08 + 0.1 * Math.abs(Math.sin(i * 0.3))) + ")";
c.fillRect(i, 0, 2, H);
} });
t.wrapS = THREE.RepeatWrapping;
t.wrapT = THREE.ClampToEdgeWrapping;
t.repeat.set(1, 1.2 / 5.3);
var m = new THREE.MeshPhongMaterial({ map: t, shininess: 24, specular: 0x3A2010 });
m.userData.noPhoto = 1;
return m;
});
var dR = wqwRoomBuild(G, "autumn", 1, 12, 10, 5.6, { wall: wqwS("b:damask", 0x8A2A14, 1.6), floor: wqwS("b:oak", 0x2A1408, 1.4, { shine: 40 }), ceil: wqwS("b:oak", 0x1E0E06, 1.4), env: "cabaret", doorName: "Back into the cabaret", out: { x: A0.x - 13, z: A0.z - 2, ry: -Math.PI / 2 }, day: 0xFFB060 });
var gl2 = wqxGlowStart(), cl2 = [];
[[0, -4.85, 0, 11.6], [0, 4.85, Math.PI, 11.6]].forEach(function (w) { for (var k3 = 0; k3 < 4; k3++) {
var u = -4.35 + k3 * 2.9;
if (w[1] > 0 && Math.abs(u) < 1.4)
continue;
wqxDrape(dR, u, 5.4, w[1] + (w[1] < 0 ? 0.14 : -0.14), 2.8, 5.3, w[2], sunsetV, { depth: 0.14, fold: 2.4 });
} });
[[-5.85, Math.PI / 2], [5.85, -Math.PI / 2]].forEach(function (w) { for (var k3 = 0; k3 < 3; k3++) {
var u = -3.2 + k3 * 3.2;
if (w[0] > 0 && Math.abs(u + 2) < 1.2)
continue;
var d = wqxDrape(dR, w[0] + (w[0] < 0 ? 0.14 : -0.14), 5.4, u, 3, 5.3, w[1], sunsetV, { depth: 0.14, fold: 2.4 });
} });
wqwBox(dR, 12, 0.3, 0.2, wqxGilt(), 0, 5.2, -4.8);
wqwBox(dR, 12, 0.3, 0.2, wqxGilt(), 0, 5.2, 4.8);
wqwBox(dR, 0.2, 0.3, 10, wqxGilt(), -5.8, 5.2, 0);
wqwBox(dR, 0.2, 0.3, 10, wqxGilt(), 5.8, 5.2, 0);
var tcl = wqwS("b:damask", 0x7A1420, 1.0);
wqwTable(dR, 0, -0.6, 5.2, 1.9, 0.82, wqwS("b:oak", 0x2A1206, 1.4, { shine: 50 }), tcl);
wqwBox(dR, 4.4, 0.012, 0.5, wqwS("b:velvet", 0xC8902A, 1.0), 0, 0.825, -0.6);
var carveM = wqwM("leafCarve", function () {
var t = wqwCanvas("leafCarveT", 128, 256, function (c, W, H) {
c.fillStyle = "#3A1A0A";
c.fillRect(0, 0, W, H);
var R2 = wRand(55);
c.strokeStyle = "#C8902A";
c.lineCap = "round";
function br(x, y, a, l, w, d) { if (d > 5)
return; var x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l; c.lineWidth = w; c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke(); br(x2, y2, a - 0.5, l * 0.7, w * 0.7, d + 1); br(x2, y2, a + 0.45, l * 0.7, w * 0.7, d + 1); }
br(W / 2, H, -Math.PI / 2, 60, 6, 0);
c.fillStyle = "#E0A83A";
for (var i = 0; i < 26; i++) {
var x = R2() * W, y = R2() * H * 0.8;
c.save();
c.translate(x, y);
c.rotate(R2() * 6);
c.beginPath();
c.ellipse(0, 0, 7, 3.5, 0, 0, 7);
c.fill();
c.restore();
}
c.strokeStyle = "#C8902A";
c.lineWidth = 6;
c.strokeRect(4, 4, W - 8, H - 8);
});
var m = new THREE.MeshPhongMaterial({ map: t, shininess: 30, specular: 0x5A4020 });
m.userData.noPhoto = 1;
return m;
});
[[-3.0, -0.6, Math.PI / 2], [3.0, -0.6, -Math.PI / 2], [-1.1, -2.0, 0], [1.1, -2.0, 0], [-1.1, 0.8, Math.PI], [1.1, 0.8, Math.PI]].forEach(function (c, i) {
var th = new THREE.Group();
th.position.set(c[0], 0, c[1]);
th.rotation.y = c[2];
dR.add(th);
var wd = wqwS("b:oak", 0x2A1206, 1.4, { shine: 40 });
wqwBox(th, 0.8, 0.5, 0.7, wd, 0, 0, 0);
wqwBox(th, 0.72, 0.12, 0.62, wqwS("b:velvet", 0x8A1420, 1.4), 0, 0.5, 0);
var bk = new THREE.Mesh(wqwBoxG(0.82, i < 2 ? 2.3 : 1.9, 0.1), [wd, wd, wd, wd, carveM, carveM]);
[-0.43, 0.43].forEach(function (ex) { wqwBox(th, 0.06, i < 2 ? 2.3 : 1.9, 0.14, wqxGilt(), ex, 0.5, -0.32); });
bk.position.set(0, 0.5 + (i < 2 ? 2.3 : 1.9) / 2, -0.32);
th.add(bk);
var fin = new THREE.Mesh(wqwGeo("thrFin", function () { return new THREE.ConeGeometry(0.08, 0.3, 8); }), wqxGilt());
[-0.36, 0.36].forEach(function (fx) { var f2 = fin.clone(); f2.position.set(fx, 0.5 + (i < 2 ? 2.3 : 1.9) + 0.15, -0.32); th.add(f2); });
});
var feast = [[-1.7, 0.1, "roast"], [-0.5, 0.25, "loaf"], [0.5, -0.15, "pears"], [1.3, 0.2, "apples"], [1.9, -0.2, "decanter"], [-1.1, -0.3, "roots"], [0.0, 0.3, "decanter"], [-2.2, -0.25, "decanter"], [2.3, 0.25, "roots"]];
feast.forEach(function (f) {
var m;
if (f[2] === "roast") {
m = new THREE.Group();
var pl = new THREE.Mesh(wqwGeo("platter", function () { return new THREE.CylinderGeometry(0.42, 0.36, 0.04, 24); }), wqxGilt());
m.add(pl);
var rs = new THREE.Mesh(wqwGeo("roast", function () { var gg = new THREE.SphereGeometry(0.2, 14, 8); gg.scale(1.3, 0.6, 0.9); return gg; }), wqwShine(0x6A2A0E, 0.35, 0.05));
rs.scale.setScalar(1.05);
rs.position.y = 0.09;
m.add(rs);
for (var h = 0; h < 8; h++) {
var hb = new THREE.Mesh(wqwGeo("herb", function () { return new THREE.SphereGeometry(0.025, 5, 4); }), wqwLam(0x3A6A1A));
hb.position.set((Math.random() - 0.5) * 0.5, 0.24, (Math.random() - 0.5) * 0.3);
m.add(hb);
}
}
else if (f[2] === "loaf") {
m = new THREE.Group();
var lf = new THREE.Mesh(wqwGeo("loaf", function () { var gg = new THREE.SphereGeometry(0.15, 14, 8); gg.scale(1.5, 0.75, 1); return gg; }), wqwShine(0xB87A3A, 0.6, 0));
lf.position.y = 0.06;
m.add(lf);
wqwSmoke(dR, f[0], 1.1, f[1] - 0.6, 0xF0E8E0, 3);
}
else if (f[2] === "decanter") {
m = new THREE.Mesh(wqwGeo("decanter", function () { var pts = [new THREE.Vector2(0, 0), new THREE.Vector2(0.14, 0), new THREE.Vector2(0.16, 0.12), new THREE.Vector2(0.05, 0.3), new THREE.Vector2(0.05, 0.42)]; return new THREE.LatheGeometry(pts, 16); }), wqiIce(0x8A1A2A, { op: 0.8, e: 0x2A0408 }));
}
else {
m = new THREE.Group();
var bw = new THREE.Mesh(wqwGeo("fbowl", function () { return new THREE.SphereGeometry(0.26, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), wqxGilt());
bw.position.y = 0.22;
m.add(bw);
for (var k2 = 0; k2 < 9; k2++) {
var fr = new THREE.Mesh(wqwGeo("fruitS", function () { return new THREE.SphereGeometry(0.08, 10, 8); }), wqwShine(f[2] === "pears" ? 0xC8B040 : f[2] === "apples" ? 0xA81A12 : 0xC86A2A, 0.4, 0));
fr.position.set(Math.cos(k2 * 2.4) * 0.13 * (k2 < 6 ? 1 : 0.4), 0.16 + (k2 < 6 ? 0 : 0.12), Math.sin(k2 * 2.4) * 0.13 * (k2 < 6 ? 1 : 0.4));
m.add(fr);
}
}
m.position.set(f[0], 0.86, f[1] - 0.6);
dR.add(m);
});
[[-0.9, -1.3], [0.9, -1.3], [-0.9, 0.1], [0.9, 0.1], [-2.5, -0.6], [2.5, -0.6]].forEach(function (p) { var gs = new THREE.Mesh(wqwGeo("gob", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.045, 0), new THREE.Vector2(0.008, 0.012), new THREE.Vector2(0.008, 0.1), new THREE.Vector2(0.05, 0.14), new THREE.Vector2(0.055, 0.22)], 12); }), wqiIce(0x8A1A24, { op: 0.75 })); gs.position.set(p[0], 0.86, p[1]); dR.add(gs); });
for (var k4 = 0; k4 < (lite ? 14 : 34); k4++)
cl2.push({ x: (R() - 0.5) * 10, y: 2.6 + R() * 2.0, z: (R() - 0.5) * 8, h: 0.14 + R() * 0.12 });
wqxCandles(dR, cl2, gl2);
wqxGlowDone(dR, gl2, 0.7);
wqwRug(dR, 0, -0.6, 7, 4, 0x6A1410);
var sb = new THREE.Group();
sb.position.set(0, 0, -4.3);
dR.add(sb);
wqwBox(sb, 3.6, 0.95, 0.6, wqwS("b:oak", 0x2A1206, 1.4, { shine: 50 }), 0, 0, 0);
wqwBox(sb, 3.8, 0.06, 0.7, wqxGilt(), 0, 0.95, 0);
[-1.2, 0, 1.2].forEach(function (x) { var p2 = new THREE.Mesh(wqwGeo("pumpkin", function () { var gg = new THREE.SphereGeometry(0.2, 12, 8); gg.scale(1.3, 0.85, 1.3); return gg; }), wqwShine(0xD8701A, 0.5, 0)); p2.position.set(x, 1.12, 0); sb.add(p2); });
var dl = new THREE.PointLight(0xFFB060, 1.3, 14);
dl.position.set(0, 3.4, 0);
dR.add(dl);
wqwBox(dR, 1.6, 2.6, 0.06, wqxGilt(), 5.75, 0, -2, -Math.PI / 2);
wqwSpot(A1.x + 5.2, A1.z - 2, 1.5, "A door, appearing as she nears it", "go through", function () { wqwGo({ sc: "autumn", x: A2.x, z: A2.z + 2, y: WQW_IN_Y, ry: 0 }, "🛏️ <b>The bedroom</b>", typeof wqbPopulate === "function" ? wqbPopulate : null); }, WQW_IN_Y);
var bR = wqwRoomBuild(G, "autumn", 2, 10, 9, 4.6, { wall: wqwS("b:damask", 0x7A3A1A, 1.6), floor: wqwS("b:oak", 0x3A1E0E, 1.4, { shine: 30 }), ceil: wqwS("b:oak", 0x2A140A, 1.4), env: "cabaret", doorName: "Back to the dining room", out: { x: A1.x + 4.6, z: A1.z - 2, ry: Math.PI / 2 }, day: 0xFFB060 });
var gl3 = wqxGlowStart(), cl3 = [];
wqxPanelling(bR, 10, 9, 4.6, { h0: 1.0, step: 3.4, trim: wqwShine(0x8A5A2A, 0.4, 0.5), skip: [["s", 0, 1.2], ["n", -2, 1.4], ["n", 2, 1.4]] });
(function () {
var bg = new THREE.Group();
bg.position.set(-0.4, 0, -2.2);
bR.add(bg);
var wd = wqwS("b:oak", 0x2A1206, 1.4, { shine: 40 });
wqwBox(bg, 2.6, 0.5, 2.4, wd, 0, 0, 0);
wqwBox(bg, 2.5, 0.3, 2.3, wqwLam(0xF0E6D4), 0, 0.5, 0);
wqwBox(bg, 2.7, 1.5, 0.14, carveM, 0, 0.2, -1.18);
[[-1.25, -1.15], [1.25, -1.15], [-1.25, 1.15], [1.25, 1.15]].forEach(function (p) { wqwCyl(bg, 0.07, 0.08, 3.4, wd, p[0], 0, p[1], 10); });
wqwBox(bg, 2.7, 0.16, 2.5, wd, 0, 3.4, 0);
wqxDrape(bg, -1.2, 3.4, 0, 2.4, 3.1, Math.PI / 2, wqwS("b:velvet", 0x7A1A14, 1.4), { depth: 0.1, tie: 1 });
wqxDrape(bg, 1.2, 3.4, 0, 2.4, 3.1, -Math.PI / 2, wqwS("b:velvet", 0x7A1A14, 1.4), { depth: 0.1, tie: 1 });
wqxDrape(bg, 0, 3.4, -1.1, 2.6, 3.1, 0, wqwS("b:velvet", 0x7A1A14, 1.4), { depth: 0.1 });
wqwBox(bg, 2.5, 0.12, 2.2, wqwS("b:quilt", 0xC86A2A, 0.8), 0, 0.8, 0.05);
[[-1.27, 0], [1.27, 0]].forEach(function (q) { var sd = new THREE.Mesh(wqwBoxG(0.04, 0.55, 2.2), wqwS("b:quilt", 0xC86A2A, 0.8)); sd.position.set(q[0], 0.62, 0.05); bg.add(sd); });
var ft = new THREE.Mesh(wqwBoxG(2.5, 0.5, 0.04), wqwS("b:quilt", 0xC86A2A, 0.8));
ft.position.set(0, 0.62, 1.16);
bg.add(ft);
var bc = [0xE8A030, 0xA8281A, 0x6A2A10, 0xD8B060, 0x8A3A1A, 0xC8501A];
for (var k5 = 0; k5 < 6; k5++) {
var bl = new THREE.Mesh(wqwGeo("blanketPile", function () { var gg = new THREE.SphereGeometry(0.5, 16, 8); gg.scale(1.1, 0.22, 0.8); return gg; }), wqwS("b:quilt", bc[k5], 0.6));
bl.position.set(-0.6 + (k5 % 3) * 0.6, 0.95 + Math.floor(k5 / 3) * 0.12, 0.1 + (k5 % 2) * 0.45);
bl.rotation.y = (k5 - 2.5) * 0.3;
bg.add(bl);
}
[[-0.6, -0.85], [0.6, -0.85]].forEach(function (p) { var pw = new THREE.Mesh(wqwGeo("pillow", function () { var gg = new THREE.SphereGeometry(0.3, 12, 8); gg.scale(1.4, 0.45, 0.8); return gg; }), wqwLam(0xE8D8B8)); pw.position.set(p[0], 1.5, p[1]); bg.add(pw); });
[-1.75, 1.75].forEach(function (x) { wqwBox(bg, 0.6, 0.62, 0.5, wd, x, 0, -0.9); wqxLamp(bg, x, 0.62, -0.9, null); wqxGlow(gl3, -0.4 + x, 0.86, -3.1, 0xFFB050, 1.0); });
})();
var twi = wqwM("twilightWin", function () {
var t = wqwCanvas("twilightWinT", 256, 320, function (c, W, H) {
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#3A2A5A");
g.addColorStop(0.5, "#C8603A");
g.addColorStop(0.75, "#E8A050");
g.addColorStop(1, "#3A1A0E");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
var R3 = wRand(81);
for (var i = 0; i < 14; i++) {
var x = R3() * W, h = 120 + R3() * 120;
c.fillStyle = "rgba(30,14,8,.85)";
c.fillRect(x - 3, H - h, 6, h);
c.fillStyle = ["rgba(150,40,20,.8)", "rgba(200,120,30,.8)", "rgba(120,30,20,.8)"][i % 3];
c.beginPath();
c.ellipse(x, H - h, 26 + R3() * 20, 34 + R3() * 20, 0, 0, 7);
c.fill();
}
for (i = 0; i < 60; i++) {
c.fillStyle = ["#C8301A", "#E0A030", "#B85A1A"][i % 3];
c.save();
c.translate(R3() * W, R3() * H * 0.8);
c.rotate(R3() * 6);
c.fillRect(-3, -1.5, 6, 3);
c.restore();
}
c.strokeStyle = "#2A1A0A";
c.lineWidth = 8;
c.strokeRect(0, 0, W, H);
c.beginPath();
c.moveTo(W / 2, 0);
c.lineTo(W / 2, H);
c.moveTo(0, H * 0.45);
c.lineTo(W, H * 0.45);
c.stroke();
});
var m = new THREE.MeshBasicMaterial({ map: t });
m.userData.noPhoto = 1;
return m;
});
[-2, 2].forEach(function (x) { var w = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 2.6), twi); w.position.set(x + 2.2, 2.4, -4.44); bR.add(w); wqwBox(bR, 2.3, 0.14, 0.3, wqwShine(0x8A5A2A, 0.4, 0.5), x + 2.2, 1.0, -4.35); wqxDrape(bR, x + 2.2 - 1.2, 4.4, -4.3, 0.8, 3.6, 0, wqwS("b:velvet", 0x8A2A14, 1.4), { tie: 1 }); wqxDrape(bR, x + 2.2 + 1.2, 4.4, -4.3, 0.8, 3.6, 0, wqwS("b:velvet", 0x8A2A14, 1.4), { tie: 1 }); wqxShaft(bR, x + 2.2, 3.4, -4.2, 4.4, 0.9, 1.6, 0xFFA050, 0.06, x + 1.6, 0, -1.2); });
wqwRug(bR, 1.4, 0.4, 3.4, 2.6, 0x8A2A10);
var ac = wqwChair(bR, 3.4, 2.6, -2.4, wqwS("b:velvet", 0xA8501A, 1.4), 1);
wqwBox(bR, 1.4, 2.2, 0.6, wqwS("b:oak", 0x2A1206, 1.4, { shine: 40 }), -4.4, 0, 2.2, Math.PI / 2);
for (var k6 = 0; k6 < (lite ? 8 : 18); k6++)
cl3.push({ x: (R() - 0.5) * 8.6, y: 3.6 + R() * 0.6, z: (R() - 0.5) * 7.6, h: 0.14 });
wqxCandles(bR, cl3, gl3);
wqxGlowDone(bR, gl3, 0.7);
var bl2 = new THREE.PointLight(0xFFB060, 1.5, 14);
bl2.position.set(0, 3.4, 0);
bR.add(bl2);
};
})();
Object.assign(WQW_FOLK, {
corasuit: { name: "Cora", dress: "wqcorasuit", sex: "f", hair: 0xC81A1A, skin: 0xF0D8C8, persona: "You are Cora, Autumn, goddess of thresholds and transitions, owner of The Threshold: short crimson pixie hair, a smoky voice, a tailored suit that changes colour when no one is quite looking. You call people darling and sweetheart. You understand endings.", greet: "Darlings. You came." },
patron: { name: "One of The Threshold's guests", dress: "wqgown", sex: "f", hair: 0x2A1A1A, persona: "threshold", greet: "Shh. She's about to sing." },
patronm: { name: "A gentleman with eyes that know too much", dress: "wqgala", sex: "m", hair: 0x1A1A1A, persona: "threshold", greet: "I come for the truth in the songs." },
server: { name: "A server with autumn leaves for hair", dress: "wqcabaret", sex: "f", hair: 0xC86A1A, persona: "threshold", greet: "Spiced wine. You didn't need to ask.", look: function (g) { wqfWings(g, 0xE8A04A); } }
});
WQW_AT.cabaretDoor = Object.assign(wqwInAt("autumn", 0, -14, -2), { name: "a door that wasn't there before" });
WQW_AT.bedDoor = Object.assign(wqwInAt("autumn", 1, 5.2, -2), { name: "a door, appearing as she nears it" });
WQW_AT.autumnOutside = { sc: "autumn", x: 4, z: 396, name: "the mortal side of the cave, under a grey sky" };
WQW_AT.autumnSleigh = { sc: "autumn", x: 10, z: 420, name: "the sleigh" };
(function () { var b0 = WQW_SCN.autumn.build; WQW_SCN.autumn.build = function (G) { b0(G); wqhSleigh(G, 14, 424, 0.3, wqrAutumnH(14, 424)); }; })();
(function () {
var A = wqwInAt("autumn", 0), q = [["fae", -10, -2, 0.6], ["patronm", -9, 0, 2.4], ["patron", -5, -1.4, 0.2], ["fae", -4, 0.6, 2.8], ["patronm", 5, -2, -0.4], ["patron", 6, 0.2, -2.6], ["fae", 10, -1.6, -0.8], ["patron", -10, 3, 0.8], ["patronm", -6, 3.6, 2.6], ["fae", 4, 3, -2.4], ["patron", 10, 3.4, -1.4], ["patronm", -1, 4.4, 3.0], ["server", 3, 6, 1.2], ["faem", -6.4, -8, 0], ["faem", 6.4, -8, 0]];
WQB_FOLK_AT.autumn = (WQB_FOLK_AT.autumn || []).concat(q.map(function (p) { return [p[0], A.x + p[1], A.z + p[2], p[3], WQW_IN_Y + (Math.abs(p[2] + 8) < 1 ? 1.2 : 0)]; }));
})();
Object.assign(WQW_AT, {
carverLand: { sc: "crater", x: 128, z: 322, name: "the edge of the village, where the sleigh came down" },
carverDoor: { sc: "crater", x: 112, z: 300, name: "the workshop at the edge of the village" },
carverRoom: Object.assign(wqwInAt("crater", 6, 0, 1.4), { name: "inside the workshop" }),
carverBench: Object.assign(wqwInAt("crater", 6, 0.4, -1.4), { name: "beside the workbench" }),
iceWall: wqwInAt("palace", 0, -2, -1, "where the wall of ice rose"),
woodsHut: { sc: "border", x: -210, z: 120, name: "a hut alone in the woods" },
woodsLand: { sc: "border", x: -196, z: 140, name: "the sleigh, among the trees" }
});
function wqmCarouselHorse(P, x, y, z, ry, s, col) { return __ZC(502, 109, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.crater.build;
WQW_SCN.crater.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqdCraterH, R = wRand(9801);
var x = 112, z = 294, ry = Math.PI * 0.9, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var wd = wqwS("b:planks", 0x7A5A3A, 2);
wqwBox(g, 11, 3.4, 7, wd, 0, 0, 0);
var rf = new THREE.Mesh(wqwGeo("gableW", function () { var s = new THREE.Shape(); s.moveTo(-6, 0); s.lineTo(0, 3); s.lineTo(6, 0); s.lineTo(-6, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 8, bevelEnabled: false }); e.translate(0, 0, -4); e.rotateY(Math.PI / 2); return e; }), wqwS("b:slate", 0xD8DCE0, 2));
rf.rotation.y = Math.PI / 2;
rf.position.y = 3.4;
g.add(rf);
[-3.4, 3.4].forEach(function (wx) { wqwBox(g, 1.4, 1.2, 0.08, wqwGlowM(0xFFB860, 0.9), wx, 1.2, 3.52); });
wqwBox(g, 0.9, 2.8, 0.9, wqwMat("stone"), -4, 3.4, -1.6);
wqwSmoke(g, -4, 6.4, -1.6, 0xA8A098, 5);
wqwBox(g, 3, 2.4, 2.4, wqwS("b:planks", 0x5A4030, 2), 7, 0, 0);
for (var k = 0; k < 8; k++)
wqwCyl(g, 0.12, 0.12, 2.6, wqwMat("bark"), 6 + (k % 4) * 0.3, 0.2 + Math.floor(k / 4) * 0.26, -1 + k * 0.1, 6).rotation.z = Math.PI / 2;
wqwSolid(x, z, 14, 7.4, y - 1, y + 7, ry);
var dx = x + Math.sin(ry) * 3.7, dz = z + Math.cos(ry) * 3.7;
wqwDoorTo(G, "crater", 6, dx, dz, ry, "The door of the woodcarver's workshop", 10, 7, { col: 0x5A3A1E, frame: wd, y: y });
var gR = wqwRoomBuild(G, "crater", 6, 10, 7, 3.2, { wall: wqwS("b:planks", 0xA88A64, 2), floor: wqwMat("planks"), ceil: wqwS("b:planks", 0x8A6A4A, 2), env: "cottage", doorName: "The door, out to the snow" });
wqwTable(gR, 0.4, -2.2, 3.4, 1.0, 0.9, wqwS("b:oak", 0x8A6A42, 1.4));
var tools = [[-0.8, 0x6A6A70], [-0.5, 0x7A7A80], [0.9, 0x6A6A70], [1.3, 0x5A3A1E]];
tools.forEach(function (t) { wqwBox(gR, 0.04, 0.03, 0.3, wqwLam(t[1]), t[0], 0.9, -2.0); });
var sh = [];
for (k = 0; k < (lite ? 30 : 80); k++)
sh.push({ x: 0.4 + (R() - 0.5) * 3, y: 0.02, z: -1.8 + (R() - 0.5) * 1.6, s: 0.6 + R() * 0.6, ry: R() * 6 });
wqwInst(gR, wqwGeo("shaving", function () { var gg = new THREE.TorusGeometry(0.04, 0.012, 4, 8, Math.PI * 1.4); gg.rotateX(Math.PI / 2); return gg; }), wqwLam(0xE8C890), sh, {});
var horse = wqmCarouselHorse(gR, 0.4, 0.9, -2.2, 0.4, 1.2, 0xD8B07A);
WQI.carvingHorse = horse;
var lamp = new THREE.PointLight(0xFFC070, 1.1, 10);
lamp.position.set(0.4, 2.4, -1.6);
gR.add(lamp);
var lb = new THREE.Mesh(wqwGeo("rlamp", function () { return new THREE.SphereGeometry(0.16, 10, 8); }), wqwGlowM(0xFFE0A0));
lb.position.set(0.4, 2.4, -1.6);
gR.add(lb);
wqwBox(gR, 1.8, 1.4, 0.6, wqwMat("stone"), -4, 0, -2.9);
wqwFire(gR, -4, 0.2, -2.6, 0.45);
var fl = new THREE.PointLight(0xFFA060, 0.8, 8);
fl.position.set(-4, 1, -2.2);
gR.add(fl);
[[4.8, -1.6, -Math.PI / 2], [4.8, 1.2, -Math.PI / 2], [-4.8, 0.6, Math.PI / 2]].forEach(function (s, i) { wqwShelves(gR, s[0], s[1], 2.4, 2.4, s[2]); });
var wdC = [0xC89A62, 0xA8784A, 0xD8B07A, 0x8A5A32], cv = [];
for (k = 0; k < (lite ? 18 : 40); k++) {
var side = k % 3, sx = side === 2 ? -4.6 : 4.6, sz = (side === 0 ? -1.6 : side === 1 ? 1.2 : 0.6) + ((k / 3 | 0) % 5 - 2) * 0.42, sy = 0.45 + ((k / 15 | 0) % 4) * 0.55;
cv.push([sx, sy, sz, k % 4]);
}
cv.forEach(function (c, i) {
var col = wdC[i % 4], m;
if (c[3] === 0) {
m = wqmCarouselHorse(gR, c[0], c[1], c[2], Math.PI / 2, 0.45, col);
}
else if (c[3] === 1) {
m = wqwBox(gR, 0.3, 0.18, 0.22, wqwLam(col), c[0], c[1], c[2]);
}
else if (c[3] === 2) {
var bird = new THREE.Mesh(wqwGeo("cvBird", function () { var gg = new THREE.SphereGeometry(0.08, 8, 6); gg.scale(1.6, 1, 1); return gg; }), wqwLam(col));
bird.position.set(c[0], c[1] + 0.08, c[2]);
gR.add(bird);
}
else {
var bear = new THREE.Mesh(wqwGeo("cvBear", function () { var gg = new THREE.SphereGeometry(0.1, 8, 6); gg.scale(1.5, 1, 1); return gg; }), wqwLam(col));
bear.position.set(c[0], c[1] + 0.1, c[2]);
gR.add(bear);
}
});
for (k = 0; k < 5; k++) {
var st = wqwCyl(gR, 0.025, 0.025, 1.4, wqwLam(0x8A5A32), -2 + k * 0.2, 0, 3.2, 6);
st.rotation.z = 0.12;
var bh = new THREE.Mesh(wqwGeo("cvBird", null), wqwLam(0x6A4A2A));
bh.position.set(-2 + k * 0.2 + 0.16, 1.4, 3.2);
gR.add(bh);
}
wqwChair(gR, 0.4, -1.2, Math.PI, wqwMat("oak"));
wqhSleigh(G, WQW_AT.carverLand.x + 3, WQW_AT.carverLand.z, 0.8, H(WQW_AT.carverLand.x + 3, WQW_AT.carverLand.z));
};
})();
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var A = WQW_AT.iceWall, R = wRand(9811);
var w = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 0.5), wqiIce(0xD8EEFC, { op: 0.75, e: 0x2A5A8A }));
w.position.set(A.x, WQW_IN_Y + 2, A.z);
G.add(w);
wqwShow("iceWall", w, false);
var br = new THREE.Group();
G.add(br);
for (var k = 0; k < 24; k++) {
var s = new THREE.Mesh(wqwGeo("iceChunk", function () { return new THREE.TetrahedronGeometry(0.4, 0); }), wqiIce(0xD8EEFC, { op: 0.8 }));
s.position.set(A.x + (R() - 0.5) * 7, WQW_IN_Y + 0.2, A.z + (R() - 0.5) * 3);
s.rotation.set(R() * 6, R() * 6, R() * 6);
s.scale.setScalar(0.5 + R());
br.add(s);
}
wqwShow("iceWallBroken", br, false);
};
})();
(function () {
var b0 = WQW_SCN.border.build;
WQW_SCN.border.build = function (G) {
b0(G);
var H = wqtBorderH, x = -214, z = 114, y = H(x, z);
wqwHouse(G, x, z, 6, 5, 3, { y: y - 0.2, ry: 0.6, wall: wqwS("b:planks", 0x5A4030, 2), roof: wqwS("b:slate", 0xD8E0E8, 2) });
wqwSolid(x, z, 6.4, 5.4, y - 1, y + 6, 0.6);
wqwSmoke(G, x, y + 5.6, z, 0xA8A098, 4);
var wp = [];
for (var k = 0; k < 12; k++)
wp.push({ x: x + 4, y: y + 0.2 + (k % 4) * 0.24, z: z - 2 + (k / 4 | 0) * 0.3 });
wp.forEach(function (p) { var l = wqwCyl(G, 0.12, 0.12, 1.2, wqwMat("bark"), p.x, p.y, p.z, 6); l.rotation.z = Math.PI / 2; });
wqhSleigh(G, WQW_AT.woodsLand.x + 3, WQW_AT.woodsLand.z, 0.2, H(WQW_AT.woodsLand.x + 3, WQW_AT.woodsLand.z));
};
})();
Object.assign(WQW_FOLK, {
woodcarver: { name: "The woodcarver", dress: "wqfur", sex: "m", beard: "short", hair: 0xD8D4CC, persona: "You are an old woodcarver in a remote village; your eyes are kind, crinkled from years of smiling. You are carving a carousel horse for your great-granddaughter, who turns six next month and loves horses.", greet: "Ah. The Snow Queen. I wondered if you'd come for me eventually." },
hermit: { name: "An old man, alone in the woods", dress: "wqfur", sex: "m", beard: "long", hair: 0xC8C8C8, persona: "You are an old man who lives alone in the woods.", greet: "..." }
});
(function () { var m0 = wqbItemMesh; wqbItemMesh = function (kind) { if (kind !== "carousel")
return m0.apply(this, arguments); var g = new THREE.Group(); wqmCarouselHorse(g, 0, 0, 0, 0, 1.4, 0xD8B07A); g.userData.keep = 1; return g; }; })();
WQW_AT.coraChamber = wqwInAt("palace", 1, 4, 3, "where Cora steps through the shimmer");
WQW_AT.chamberTable = wqwInAt("palace", 1, -3, 4, "the table that appeared");
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var A = wqwInAt("palace", 1), R = wRand(9821), g = new THREE.Group();
g.position.set(A.x, WQW_IN_Y, A.z);
G.add(g);
var cols = [0xC8401A, 0xE8A030, 0x8A1A2A, 0xD86A1A, 0xB8902A];
for (var k = 0; k < (wqwLite() ? 40 : 110); k++) {
var a = R() * Math.PI * 2, r = 7.5 + R() * 1.2, l = new THREE.Mesh(wqwGeo("bloomLeaf", function () { return new THREE.PlaneGeometry(0.5, 0.36); }), wqwGlowM(cols[k % 5], 0.55));
l.position.set(Math.cos(a) * r, 0.4 + R() * 6, Math.sin(a) * r);
l.rotation.set(R() * 6, R() * 6, R() * 6);
g.add(l);
}
var L = new THREE.PointLight(0xFFA040, 1.6, 22);
L.position.set(0, 4, 0);
g.add(L);
var sh = new THREE.Mesh(new THREE.PlaneGeometry(3, 5), wqwM("coraShim", function () { var m = new THREE.MeshBasicMaterial({ color: 0xFFB060, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
sh.position.set(6, 2.5, 1);
sh.rotation.y = -0.8;
g.add(sh);
var T = wqwInAt("palace", 1, -3, 4);
wqwTable(g, -3, 4, 2.2, 1.1, 0.8, wqwS("b:oak", 0x5A3A1E, 1.4), wqwLam(0x6A1A14));
[-1, 1].forEach(function (s) { wqwChair(g, -3 + s * 1.4, 4, s > 0 ? -Math.PI / 2 : Math.PI / 2, wqwS("b:velvet", 0x8A2A10, 2)); });
var bw = wqwCyl(g, 0.3, 0.24, 0.14, wqwS("b:oak", 0x6A4A2A, 1.4), -3.6, 0.8, 4.2, 14);
var wg = new THREE.Mesh(wqwGeo("goblet", function () { var pts = [new THREE.Vector2(0, 0), new THREE.Vector2(0.08, 0), new THREE.Vector2(0.02, 0.04), new THREE.Vector2(0.02, 0.14), new THREE.Vector2(0.09, 0.2), new THREE.Vector2(0.1, 0.3)]; return new THREE.LatheGeometry(pts, 12); }), wqwShine(0xC8902A, 0.3, 0.8));
wg.position.set(-2.6, 0.8, 3.8);
g.add(wg);
for (k = 0; k < 6; k++) {
var f = new THREE.Mesh(wqwGeo("fruitS", function () { return new THREE.SphereGeometry(0.09, 8, 6); }), wqwLam([0xB8281A, 0xC8B040, 0xC86A2A][k % 3]));
f.position.set(-2.4 + (k % 3) * 0.18, 0.88, 4.3 + (k > 2 ? 0.16 : 0));
g.add(f);
}
var lf = new THREE.Mesh(wqwGeo("loaf", function () { var gg = new THREE.SphereGeometry(0.22, 12, 8); gg.scale(1.5, 0.8, 1); return gg; }), wqwLam(0xC8904A));
lf.position.set(-3.2, 0.9, 3.7);
g.add(lf);
wqwShow("autumnBloom", g, false);
};
})();
Object.assign(WQW_AT, {
frostWall: wqwInAt("palace", 0, 13, 2, "the wall where frost had gathered", -Math.PI / 2),
hearthMid: wqwInAt("palace", 0, 4, -2, "the centre of the room, where the firelight is strongest")
});
var WQN_WORDS = ["TODAY", "NO MORE TIME", "GETTING WORSE", "GLACIA", "AFRAID", "LOSING MYSELF", "DON'T WANT TO HURT YOU"];
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var A = wqwInAt("palace", 0), R = wRand(9901);
var fr = new THREE.Mesh(new THREE.PlaneGeometry(12, 7), wqwM("wallFrost", function () { var t = wqwCanvas("wallFrostT", 256, 160, function (c, W, H) { c.clearRect(0, 0, W, H); for (var i = 0; i < 900; i++) {
c.fillStyle = "rgba(240,250,255," + (0.05 + Math.random() * 0.15) + ")";
c.fillRect(Math.random() * W, Math.random() * H, 1 + Math.random() * 3, 1 + Math.random() * 3);
} }); var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
fr.position.set(A.x + 35.85, WQW_IN_Y + 3.6, A.z + 2);
fr.rotation.y = -Math.PI / 2;
G.add(fr);
WQN_WORDS.forEach(function (w, i) {
var t = wqwCanvas("frostWord" + i, 512, 64, function (c, W, H) { c.clearRect(0, 0, W, H); c.font = "bold 44px serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.strokeStyle = "rgba(230,246,255,.95)"; c.lineWidth = 4; c.lineCap = "round"; c.strokeText(w, W / 2, H / 2 + 2); c.strokeStyle = "rgba(120,170,220,.6)"; c.lineWidth = 1.5; c.strokeText(w, W / 2 + 2, H / 2 + 4); });
var p = new THREE.Mesh(new THREE.PlaneGeometry(8, 1), wqwM("frostWordM" + i, function () { var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
p.position.set(A.x + 35.8, WQW_IN_Y + 6.2 - i * 0.85, A.z + 2);
p.rotation.y = -Math.PI / 2;
G.add(p);
wqwShow("word" + i, p, false);
});
var cg = new THREE.Group();
cg.userData.keep = 1;
G.add(cg);
var cm = wqwLam(0x7AA8D0, { op: 0.7 }), B = WQW_AT.hearthBear;
for (var k = 0; k < 14; k++) {
var a = k / 14 * Math.PI * 2 + R() * 0.3, x = B.x, z = B.z, len = 0;
for (var s = 0; s < 7; s++) {
var l = 1.6 + R() * 2.2;
var m = new THREE.Mesh(new THREE.PlaneGeometry(0.05 + 0.04 * (7 - s) / 7, l), cm);
m.rotation.x = -Math.PI / 2;
m.rotation.z = -a;
m.position.set(x + Math.sin(a) * l / 2, WQW_IN_Y + 0.02, z + Math.cos(a) * l / 2);
cg.add(m);
x += Math.sin(a) * l;
z += Math.cos(a) * l;
a += (R() - 0.5) * 0.9;
}
}
for (k = 0; k < 26; k++) {
var ch = new THREE.Mesh(wqwGeo("iceChunk", function () { return new THREE.TetrahedronGeometry(0.4, 0); }), wqiIce(0xD8EEFC, { op: 0.85 }));
ch.position.set(A.x + (R() - 0.5) * 34, WQW_IN_Y + 0.2, A.z + (R() - 0.5) * 36);
ch.rotation.set(R() * 6, R() * 6, R() * 6);
ch.scale.setScalar(0.6 + R() * 1.6);
cg.add(ch);
}
wqwShow("cracks", cg, false);
var M = new THREE.Group();
M.userData.keep = 1;
M.position.set(A.x - 6, WQW_IN_Y, A.z + 4);
M.rotation.y = Math.PI / 2 + 0.35;
G.add(M);
var silver = wqwShine(0xD8DCE4, 0.25, 0.95), glass = wqwShine(0xA8B8C8, 0.05, 1.0);
var face = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 4.2), glass);
face.position.y = 2.6;
M.add(face);
var fm = new THREE.Mesh(new THREE.TorusGeometry(1, 0.12, 8, 48), silver);
fm.scale.set(1.42, 2.2, 1);
fm.position.y = 2.6;
M.add(fm);
for (k = 0; k < 22; k++) {
var a2 = k / 22 * Math.PI * 2, o = new THREE.Mesh(wqwGeo("mirOrn", function () { return new THREE.TorusKnotGeometry(0.12, 0.035, 24, 5, 2, 3); }), silver);
o.position.set(Math.cos(a2) * 1.5, 2.6 + Math.sin(a2) * 2.3, 0.05);
M.add(o);
}
wqwBox(M, 1.8, 0.3, 0.7, silver, 0, 0, 0);
wqwShow("mirrorComplete", M, false);
var sw = new THREE.Group();
sw.userData.keep = 1;
sw.position.copy(M.position);
G.add(sw);
var shM = wqiIce(0xD8ECFF, { op: 0.85, e: 0x3A6A9A });
for (k = 0; k < (wqwLite() ? 50 : 140); k++) {
var a3 = R() * Math.PI * 2, r3 = 1 + R() * 4, s2 = new THREE.Mesh(wqwGeo("vshard", function () { var gg = new THREE.TetrahedronGeometry(0.4, 0); gg.scale(0.5, 1.6, 0.12); return gg; }), shM);
s2.position.set(Math.cos(a3) * r3, 1 + R() * 5, Math.sin(a3) * r3);
s2.rotation.set(R() * 6, R() * 6, R() * 6);
s2.scale.setScalar(0.4 + R() * 0.6);
sw.add(s2);
}
wqwShow("shardSwirl", sw, false);
};
})();
WQW_AT.mirrorStand = wqwInAt("palace", 0, -6, 6.5, "before the mirror, whole at last");
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var B = WQW_AT.hearthBear, R = wRand(7717);
var st = new THREE.Group();
st.userData.keep = 1;
st.position.set(B.x, WQW_IN_Y, B.z);
G.add(st);
var snM = wqwLam(0xF4FAFF, { e: 0x8AB8E8 }), crM = wqiIce(0xE0F2FF, { op: 0.8, e: 0x5A9ADA });
for (var k = 0; k < (wqwLite() ? 120 : 360); k++) {
var t = k / 40, a = t * Math.PI * 2 + R() * 0.4, r = 1.2 + R() * 3.4, f = new THREE.Mesh(wqwGeo("snowFlake", function () { return new THREE.IcosahedronGeometry(0.06, 0); }), snM);
f.position.set(Math.cos(a) * r, 0.2 + R() * 6, Math.sin(a) * r);
st.add(f);
}
for (k = 0; k < 40; k++) {
var a1 = R() * Math.PI * 2, r1 = 1 + R() * 3, c = new THREE.Mesh(wqwGeo("vshard", function () { var gg = new THREE.TetrahedronGeometry(0.4, 0); gg.scale(0.5, 1.6, 0.12); return gg; }), crM);
c.position.set(Math.cos(a1) * r1, 0.5 + R() * 4.5, Math.sin(a1) * r1);
c.rotation.set(R() * 6, R() * 6, R() * 6);
c.scale.setScalar(0.3 + R() * 0.5);
st.add(c);
}
var bolt = wqwLam(0xFFFFFF, { e: 0xE8F4FF });
for (k = 0; k < 9; k++) {
var p0 = new THREE.Vector3((R() - 0.5) * 5, 1 + R() * 4, (R() - 0.5) * 5), p1 = new THREE.Vector3((R() - 0.5) * 5, 1 + R() * 4, (R() - 0.5) * 5), d = p0.distanceTo(p1), l = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, d, 4), bolt);
l.position.copy(p0).add(p1).multiplyScalar(0.5);
l.lookAt(p1);
l.rotateX(Math.PI / 2);
st.add(l);
}
var gl = new THREE.PointLight(0xCFE6FF, 2.2, 22);
gl.position.y = 3;
st.add(gl);
wqwShow("rebirthStorm", st, false);
var fp = new THREE.Mesh(new THREE.CircleGeometry(9, 48), wqwM("frostArt", function () {
var t = wqwCanvas("frostArtT", 512, 512, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "rgba(235,248,255,.7)";
c.lineCap = "round";
var Rr = wRand(311);
function br(x, y, a, len, w, dep) { if (dep > 6 || len < 4)
return; var x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; c.lineWidth = w; c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke(); br(x2, y2, a + 0.5 + Rr() * 0.3, len * 0.68, w * 0.7, dep + 1); br(x2, y2, a - 0.5 - Rr() * 0.3, len * 0.68, w * 0.7, dep + 1); br(x2, y2, a + (Rr() - 0.5) * 0.2, len * 0.75, w * 0.8, dep + 1); }
for (var i = 0; i < 12; i++)
br(W / 2, H / 2, i / 12 * Math.PI * 2, 60, 4, 0);
});
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false });
m.userData.noPhoto = 1;
return m;
}));
fp.rotation.x = -Math.PI / 2;
fp.position.set(B.x, WQW_IN_Y + 0.03, B.z);
G.add(fp);
wqwShow("frostArt", fp, false);
};
})();
var WQO = { x: -400, z: -320 };
Object.assign(WQW_AT, {
bowerWindow: wqwInAt("palace", 4, 0, -5, "the window of your chamber"),
palaceSteps: { sc: "palace", x: 0, z: -48, name: "the palace steps" },
widowDoor: { sc: "crater", x: -0.6, z: 227.6, name: "the family's door" },
orphansHall: wqwInAt("palace", 2, 0, 6, "the great hall, full of children"),
orphansFire: wqwInAt("palace", 0, -2, -8, "by the fire, with the children"),
bindPlain: { sc: "palace", x: WQO.x, z: WQO.z + 62, name: "the heart of the frozen wastes" },
bindCentre: { sc: "palace", x: WQO.x, z: WQO.z, name: "the heart of the plain, among the standing stones of ice" },
bindEast: { sc: "palace", x: WQO.x + 16, z: WQO.z, name: "the east of the circle" },
bindSouth: { sc: "palace", x: WQO.x, z: WQO.z + 16, name: "the south of the circle" },
bindWest: { sc: "palace", x: WQO.x - 16, z: WQO.z, name: "the west of the circle" },
bindMirror: { sc: "palace", x: WQO.x + 5, z: WQO.z - 9, name: "before the Mirror of Truth" },
bindDance: { sc: "palace", x: WQO.x, z: WQO.z - 26, name: "the ice cathedral, where the sisters dance" },
awenGate: { sc: "palace", x: WQO.x, z: WQO.z - 38, name: "the threshold the binding opened, into Awen" }
});
Object.assign(WQW_FOLK, {
widow: { name: "The woodcarver's granddaughter-in-law", dress: "wqfurf", sex: "f", hair: 0x6A4A2A, persona: "You are the widow in the woodcarver's family; the Snow Queen killed the old man. You are afraid and grieving and angry, and you love your little girl.", greet: "I know who you are." },
carvergirl: { name: "The woodcarver's great-granddaughter", dress: "wqfurf", sex: "f", hair: 0x8A5A2A, child: 1, persona: "You are six, and you love horses more than anything.", greet: "Horsie!" },
orphan: { name: "One of the palace children", dress: "wqtown", sex: "m", child: 1, persona: "You are one of the children Glacia brought home to the ice palace; you have a room, lessons, and somebody who reads to you by the fire.", greet: "Are you coming to the snow games?" },
orphanf: { name: "One of the palace children", dress: "wqtownf", sex: "f", child: 1, persona: "You are one of the children Glacia brought home to the ice palace.", greet: "Lady Glacia says we can stay up for the aurora!" },
jayke: { name: "Jayke", dress: "wqfrostlord", sex: "m", child: 1, hair: 0xE8ECF4, persona: "You are Jayke, five, son of Kael and Glacia; frost crystals dance between your small fingers.", greet: "Look! Look what I can do!" }
});
WQB_FOLK_AT.palace = (WQB_FOLK_AT.palace || []);
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqiPalaceH, R = wRand(9951), O = WQO, oy = H(O.x, O.z);
var ice = wqiIce(0xD8EEFC), iceG = wqiIce(0xE8F6FF, { op: 0.85, e: 0x4A8ACA }), iceB = wqiIce(0xA8D0F0, { e: 0x204A70 });
var pp = [];
for (var k = 0; k < (lite ? 40 : 120); k++) {
var a = R() * Math.PI * 2, r = 20 + Math.sqrt(R()) * 120;
pp.push({ x: O.x + Math.cos(a) * r, z: O.z + Math.sin(a) * r });
}
pp.forEach(function (p) { var m = new THREE.Mesh(wqwGeo("oldIce", function () { var g = new THREE.CircleGeometry(1, 9); g.rotateX(-Math.PI / 2); return g; }), wqiIce(0x9AC4E8, { op: 0.9, kind: "deep" })); m.position.set(p.x, H(p.x, p.z) + 0.05, p.z); m.scale.set(2 + R() * 5, 1, 1.5 + R() * 3); m.rotation.y = R() * 6; G.add(m); });
var glow = new THREE.Group();
glow.userData.keep = 1;
G.add(glow);
for (k = 0; k < 18; k++) {
var a1 = k / 18 * Math.PI * 2, r1 = 38 + (k % 3) * 2, x = O.x + Math.cos(a1) * r1, z = O.z + Math.sin(a1) * r1, y = H(x, z), h = 7 + R() * 7, w = 1.6 + R() * 1.2;
var st = new THREE.Mesh(wqwGeo("stoneIce", function () { var g = new THREE.CylinderGeometry(0.42, 0.5, 1, 6, 4); var p = g.attributes.position; for (var i = 0; i < p.count; i++) {
var yy = p.getY(i);
p.setX(i, p.getX(i) * (1 - 0.25 * (yy + 0.5)));
} g.translate(0, 0.5, 0); g.computeVertexNormals(); return g; }), iceB);
st.scale.set(w * 2, h, w * 1.4);
st.position.set(x, y - 0.6, z);
st.rotation.set((R() - 0.5) * 0.12, a1 + R() * 0.6, (R() - 0.5) * 0.12);
G.add(st);
wqwSolid(x, z, w * 1.8, w * 1.8, y - 1, y + h, 0);
var core = new THREE.Mesh(wqwGeo("stoneCore", function () { var g = new THREE.CylinderGeometry(0.18, 0.22, 1, 6); g.translate(0, 0.5, 0); return g; }), wqwGlowM(0x8AD0FF, 0.9));
core.scale.set(w * 2, h * 0.8, w * 1.4);
core.position.set(x, y, z);
core.rotation.y = st.rotation.y;
glow.add(core);
}
wqwShow("stonesGlow", glow, false);
var plat = new THREE.Group();
plat.userData.keep = 1;
plat.position.set(O.x, oy, O.z);
G.add(plat);
wqwCyl(plat, 11, 12.5, 1.4, ice, 0, -0.2, 0, 32);
wqwCyl(plat, 9, 9, 0.06, iceG, 0, 1.2, 0, 32);
var pat = new THREE.Mesh(new THREE.CircleGeometry(9, 48), wqwM("frostArt", null));
pat.rotation.x = -Math.PI / 2;
pat.position.y = 1.28;
plat.add(pat);
for (k = 0; k < 6; k++) {
var a2 = k / 6 * Math.PI * 2;
wqwBox(plat, 2.4, 0.7, 1.2, ice, Math.cos(a2) * 11.6, 0, Math.sin(a2) * 11.6, -a2);
}
wqwShow("bindPlatform", plat, false);
var cat = new THREE.Group();
cat.userData.keep = 1;
cat.position.set(O.x, oy, O.z);
G.add(cat);
for (k = 0; k < 14; k++) {
var a3 = k / 14 * Math.PI * 2, r3 = 24;
wqiSpire(cat, Math.cos(a3) * r3, 0, Math.sin(a3) * r3, 2.2 + R(), 26 + R() * 18, k % 2 ? ice : iceG, 3 + (k % 3));
}
for (k = 0; k < 7; k++) {
var a4 = k / 7 * Math.PI * 2 + 0.2, r4 = 15;
wqiSpire(cat, Math.cos(a4) * r4, 0, Math.sin(a4) * r4, 1.4, 18 + R() * 8, iceG, 2);
}
wqiSpire(cat, 0, 0, -30, 5, 64, ice, 4);
wqiSpire(cat, -9, 0, -28, 3, 44, iceG, 3);
wqiSpire(cat, 9, 0, -28, 3, 44, iceG, 3);
for (k = 0; k < 14; k++) {
var b1 = k / 14 * Math.PI * 2, b2 = (k + 1) / 14 * Math.PI * 2, ar = new THREE.Mesh(wqwGeo("catArch", function () { var g = new THREE.TorusGeometry(5.3, 0.45, 6, 20, Math.PI); return g; }), iceG);
ar.position.set((Math.cos(b1) + Math.cos(b2)) * 12, 18, (Math.sin(b1) + Math.sin(b2)) * 12);
ar.rotation.y = -(b1 + b2) / 2 + Math.PI / 2;
cat.add(ar);
}
var vault = new THREE.Mesh(new THREE.SphereGeometry(26, 24, 10, 0, Math.PI * 2, 0, Math.PI * 0.32), wqiIce(0xE8F6FF, { op: 0.35, e: 0x3A6A9A }));
vault.position.y = 4;
vault.material.side = THREE.DoubleSide;
cat.add(vault);
var cl = new THREE.PointLight(0xBFE0FF, 1.6, 90);
cl.position.y = 16;
cat.add(cl);
wqwShow("iceCathedral", cat, false);
var cr = new THREE.Mesh(new THREE.CylinderGeometry(46, 52, 30, 48, 1, true), wqwM("auroraCrown", function () { var m = new THREE.MeshBasicMaterial({ map: wqwCanvas("aurora", 256, 128, null), transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }); m.userData.noPhoto = 1; return m; }));
cr.position.set(O.x, oy + 70, O.z);
G.add(cr);
wqwShow("auroraCrown", cr, false);
var MT = new THREE.Group();
MT.userData.keep = 1;
MT.position.set(O.x + 5, oy + 1.3, O.z - 12);
MT.rotation.y = -0.3;
G.add(MT);
var gold = wqwShine(0xE8B848, 0.3, 0.95), rose = wqwLam(0xB8142A), leaf = wqwLam(0x2A5A2A), thorn = wqwShine(0x8A6A2A, 0.4, 0.6);
var glass = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 4.4), wqwShine(0xC8D4E0, 0.04, 1.0));
glass.position.y = 2.6;
MT.add(glass);
var fr = new THREE.Mesh(new THREE.TorusGeometry(1, 0.14, 10, 64), gold);
fr.scale.set(1.55, 2.35, 1);
fr.position.y = 2.6;
MT.add(fr);
for (k = 0; k < 34; k++) {
var t = k / 34 * Math.PI * 2, px = Math.cos(t) * 1.62, py = 2.6 + Math.sin(t) * 2.45;
var vine = new THREE.Mesh(wqwGeo("thornVine", function () { return new THREE.TorusKnotGeometry(0.1, 0.025, 20, 4, 2, 5); }), gold);
vine.position.set(px, py, 0.06);
vine.rotation.z = t;
MT.add(vine);
var th = new THREE.Mesh(wqwGeo("thorn", function () { return new THREE.ConeGeometry(0.03, 0.16, 5); }), thorn);
th.position.set(px * 1.06, py + (Math.sin(t) * 0.12), 0.08);
th.rotation.z = t - Math.PI / 2;
MT.add(th);
if (k % 3 === 0) {
var rs = new THREE.Mesh(wqwGeo("roseHead", function () { var g = new THREE.SphereGeometry(0.11, 10, 8); g.scale(1, 0.8, 1); return g; }), k % 2 ? rose : gold);
rs.position.set(px * 1.02, py, 0.14);
MT.add(rs);
var lf = new THREE.Mesh(wqwGeo("roseLeaf", function () { var g = new THREE.SphereGeometry(0.08, 6, 4); g.scale(1.6, 0.25, 0.9); return g; }), leaf);
lf.position.set(px * 1.1, py - 0.1, 0.1);
lf.rotation.z = t;
MT.add(lf);
}
}
wqwBox(MT, 2.2, 0.3, 0.9, gold, 0, -1.3 + 1.3, 0);
wqwShow("mirrorTruth", MT, false);
var rc = new THREE.Group();
rc.userData.keep = 1;
G.add(rc);
for (k = 0; k < (lite ? 60 : 200); k++) {
var a5 = R() * Math.PI * 2, r5 = 4 + Math.sqrt(R()) * 30, x5 = O.x + Math.cos(a5) * r5, z5 = O.z + Math.sin(a5) * r5, y5 = H(x5, z5), kind = k % 4, s;
if (kind === 0) {
s = new THREE.Mesh(wqwGeo("icefl", function () { var g = new THREE.ConeGeometry(0.12, 0.22, 6, 1, true); g.rotateX(Math.PI); return g; }), iceG);
s.position.set(x5, y5 + 0.2, z5);
}
else if (kind === 1) {
s = new THREE.Mesh(wqwGeo("icestar", function () { return new THREE.OctahedronGeometry(0.14, 0); }), iceG);
s.position.set(x5, y5 + 0.15, z5);
s.scale.set(1, 0.3, 1);
}
else if (kind === 2) {
s = new THREE.Mesh(wqwGeo("icebird", function () { var g = new THREE.SphereGeometry(0.1, 6, 5); g.scale(1.6, 0.8, 0.8); return g; }), ice);
s.position.set(x5, y5 + 0.12, z5);
}
else {
s = new THREE.Mesh(wqwGeo("iceknot", function () { return new THREE.TorusKnotGeometry(0.08, 0.02, 24, 4); }), iceG);
s.position.set(x5, y5 + 0.14, z5);
}
s.rotation.y = R() * 6;
rc.add(s);
}
[[-6, -20], [6, -20], [-10, -14], [10, -14]].forEach(function (p, i) {
var hg = new THREE.Group();
hg.position.set(O.x + p[0], oy, O.z + p[1]);
hg.rotation.y = i % 2 ? -0.5 : 0.5;
rc.add(hg);
var arc = new THREE.Mesh(wqwGeo("harpArc", function () { return new THREE.TorusGeometry(0.8, 0.06, 6, 16, Math.PI * 0.75); }), iceG);
arc.position.y = 1.2;
arc.rotation.z = 0.4;
hg.add(arc);
wqwBox(hg, 0.12, 1.9, 0.12, iceG, -0.5, 0, 0);
for (var s2 = 0; s2 < 8; s2++) {
var str = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.4 + s2 * 0.14, 3), wqwGlowM(0xFFE8A0, 1));
str.position.set(-0.4 + s2 * 0.11, 0.6 + (0.4 + s2 * 0.14) / 2, 0);
hg.add(str);
}
});
wqwShow("reception", rc, false);
var T = new THREE.Group();
T.userData.keep = 1;
var ty = H(O.x, O.z - 60);
T.position.set(O.x, ty, O.z - 60);
G.add(T);
for (var sd = -1; sd <= 1; sd += 2) {
wqiSpire(T, sd * 6.4, 0, 0, 1.8, 20, ice, 3);
wqiSpire(T, sd * 8.6, 0, 1.4, 1.1, 13, iceG, 4);
wqiSpire(T, sd * 10.4, 0, 2.6, 0.7, 8, iceG, 5);
for (var cr = 0; cr < (lite ? 4 : 9); cr++) {
var cs = wqiSpire(T, sd * (6.4 + R() * 4), 0, 2 + R() * 4, 0.25 + R() * 0.35, 1.5 + R() * 3, iceB, 3);
cs.rotation.z = sd * (0.1 + R() * 0.3);
}
}
var ta = new THREE.Mesh(new THREE.TorusGeometry(6.4, 0.75, 10, 40, Math.PI), iceG);
ta.position.y = 12;
T.add(ta);
var tb = new THREE.Mesh(new THREE.TorusGeometry(7.3, 0.3, 8, 40, Math.PI), wqwGlowM(0xCFE8FF, 0.55));
tb.position.set(0, 12, 0.2);
T.add(tb);
for (k = 0; k < 15; k++) {
var an = k / 14 * Math.PI, ic = wqiSpire(T, Math.cos(an) * 7.2, 12 + Math.sin(an) * 7.2, 0, 0.3, 2.2 + R() * 1.6, iceG, 3);
ic.rotation.z = an - Math.PI / 2;
}
var keyst = new THREE.Mesh(new THREE.OctahedronGeometry(1.1, 0), wqwGlowM(0xFFE8B0, 0.9));
keyst.position.set(0, 19.6, 0);
keyst.scale.set(0.8, 1.3, 0.4);
T.add(keyst);
for (k = 0; k < 6; k++)
wqwBox(T, 14 - k * 0.9, 0.35, 1.6, iceB, 0, k * 0.35, 5.6 + (5 - k) * 1.6);
var sh = new THREE.Mesh(new THREE.PlaneGeometry(12.6, 18), wqwM("awenSh2", function () {
var t2 = wqwCanvas("awenShT2", 256, 384, function (c, W, Hh) {
var g = c.createLinearGradient(0, Hh, 0, 0);
g.addColorStop(0, "rgba(255,226,170,.95)");
g.addColorStop(0.35, "rgba(240,190,220,.85)");
g.addColorStop(0.7, "rgba(150,170,255,.75)");
g.addColorStop(1, "rgba(90,110,200,.55)");
c.fillStyle = g;
c.fillRect(0, 0, W, Hh);
c.globalAlpha = 0.5;
for (var r2 = 0; r2 < 3; r2++) {
c.strokeStyle = ["#7CFFC8", "#9AD8FF", "#E8A8FF"][r2];
c.lineWidth = 10 - r2 * 2;
c.beginPath();
for (var x = 0; x <= W; x += 8) {
var y = 60 + r2 * 28 + Math.sin(x / 37 + r2) * 18;
if (x === 0)
c.moveTo(x, y);
else
c.lineTo(x, y);
}
c.stroke();
}
c.globalAlpha = 1;
var base = Hh * 0.78;
c.fillStyle = "rgba(70,80,140,.85)";
[[30, 90, 10], [60, 150, 14], [95, 120, 9], [128, 230, 18], [160, 140, 10], [190, 175, 13], [222, 100, 9]].forEach(function (t) { c.beginPath(); c.moveTo(t[0] - t[2], base); c.lineTo(t[0] - t[2] * 0.6, base - t[1] * 0.75); c.lineTo(t[0], base - t[1]); c.lineTo(t[0] + t[2] * 0.6, base - t[1] * 0.75); c.lineTo(t[0] + t[2], base); c.fill(); });
c.fillRect(0, base, W, Hh - base);
for (var i = 0; i < 90; i++) {
c.fillStyle = "rgba(255,226,150," + (0.5 + Math.random() * 0.5) + ")";
var wx = 20 + Math.random() * (W - 40), wy = base - Math.random() * 150;
c.fillRect(wx, wy, 2, 3);
}
for (i = 0; i < 160; i++) {
c.fillStyle = "rgba(255,255,255," + Math.random() * 0.8 + ")";
c.fillRect(Math.random() * W, Math.random() * Hh, 1.5, 1.5);
}
});
var m = new THREE.MeshBasicMaterial({ map: t2, transparent: true, depthWrite: false, side: THREE.DoubleSide, opacity: 0.92 });
m.userData.noPhoto = 1;
return m;
}));
sh.position.y = 9;
T.add(sh);
var lt = new THREE.PointLight(0xFFD8A8, lite ? 1.4 : 2.4, 48);
lt.position.set(0, 8, 4);
T.add(lt);
var mo = new THREE.Group();
T.add(mo);
var moM = wqwGlowM(0xFFF0C8, 0.85);
for (k = 0; k < (lite ? 40 : 120); k++) {
var mt = new THREE.Mesh(wqwGeo("awMote", function () { return new THREE.OctahedronGeometry(0.07, 0); }), moM);
mt.position.set((R() - 0.5) * 12, 0.5 + R() * 16, R() * 14);
mo.add(mt);
}
wqwShow("awenThreshold", T, false);
};
})();
(function () {
var b0 = WQW_SCN.crater.build;
WQW_SCN.crater.build = function (G) {
b0(G);
var A = wqwInAt("crater", 6);
if (WQI.carvingHorse)
wqwShow("horseRaw", WQI.carvingHorse, true);
var g = new THREE.Group();
g.userData.keep = 1;
g.position.set(A.x, WQW_IN_Y, A.z);
G.add(g);
var h = wqmCarouselHorse(g, 0.4, 0.9, -2.2, 0.4, 1.2, 0xEEF2F8);
var sf = wqwM("hsnow", function () { var t = wqwCanvas("hsnowT", 64, 64, function (c, W, H2) { c.clearRect(0, 0, W, H2); c.strokeStyle = "rgba(120,170,230,.95)"; c.lineWidth = 3; for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
c.beginPath();
c.moveTo(W / 2, H2 / 2);
c.lineTo(W / 2 + Math.cos(a) * 28, H2 / 2 + Math.sin(a) * 28);
c.stroke();
} }); var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
[[0.05, 0.45, 0.18], [-0.12, 0.5, 0.17], [0.2, 0.4, -0.17], [-0.05, 0.42, -0.18]].forEach(function (p) { var m = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.12), sf); m.position.set(p[0], p[1], p[2]); h.add(m); });
wqwShow("horseDone", g, false);
};
})();
function wqqFrostTex() { return __ZC(502, 110, this, arguments, new.target); }
function wqqFrostM(op) { return wqwM("wqqFrostM" + (op || 0.6), function () { var t = wqqFrostTex(); var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: op || 0.6, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xBFE4FF }); m.userData.noPhoto = 1; return m; }); }
function wqqCausticM() { return __ZC(502, 111, this, arguments, new.target); }
function wqqLancet(P, x, y, z, ry, w, h, L, o) { return __ZC(502, 112, this, arguments, new.target); }
function wqqChandelier(P, x, y, z, r, tiers, L, ceil) {
var cl = [];
var g = wqxChandelier(P, x, y, z, r, tiers, L, cl, ceil);
g.traverse(function (o) { if (o.isMesh && o.material === wqxBrass())
o.material = wqiIce(0xE8F6FF, { e: 0x3A6A9A }); });
wqxCandles(P, cl, L, { wax: 0xE8F4FF, flame: 0xCFF0FF, halo: 0x9AD8FF });
return g;
}
function wqqBrazier(P, x, y, z, L, s) { return __ZC(502, 113, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqiPalaceH, R = wRand(9971), ice = wqiIce(0xD8EEFC), iceB = wqiIce(0xA8D0F0, { e: 0x204A70 }), iceC = wqiIce(0xE8F6FF, { op: 0.82, e: 0x3A6A9A }), gO = wqxGlowStart();
var X = 0, Z = -160, Y = H(X, Z);
for (var e = 0; e < 4; e++) {
var n = e < 2 ? 12 : 16;
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, px, pz;
if (e < 2) {
px = -60 + t * 120;
pz = Z + (e ? -85 : 85);
}
else {
px = e === 2 ? -60 : 60;
pz = Z - 85 + t * 170;
}
wqiSpire(G, px, Y + 36, pz, 0.9 + R() * 0.8, 8 + R() * 18, i % 3 ? ice : iceC, 2 + R() * 3);
}
}
for (i = 0; i < 6; i++) {
[-1, 1].forEach(function (s) { var bz = Z - 70 + i * 28, a = new THREE.Mesh(new THREE.TorusGeometry(10, 0.9, 6, 20, Math.PI / 2), iceB); a.position.set(s * 60, Y + 18, bz); a.rotation.y = s > 0 ? 0 : Math.PI; G.add(a); wqwBox(G, 3, 22, 3, iceB, s * 72, Y, bz); wqwRound(s * 72, bz, 2.2); wqiSpire(G, s * 72, Y + 22, bz, 1.4, 9, ice, 3); });
}
[-1, 1].forEach(function (s) { for (var k = 0; k < 6; k++) {
var w = new THREE.Mesh(new THREE.PlaneGeometry(26, 30), wqqCausticM());
w.position.set(s * 60.6, Y + 16, Z - 72 + k * 29);
w.rotation.y = s * Math.PI / 2;
G.add(w);
} });
var fc = new THREE.Mesh(new THREE.PlaneGeometry(116, 34), wqqCausticM());
fc.position.set(0, Y + 18, Z + 85.6);
G.add(fc);
[-1, 1].forEach(function (s) { for (var k = 0; k < 4; k++) {
wqqLancet(G, s * (16 + k * 11), Y + 4, Z + 85.9, 0, 5, 18, gO);
} });
for (var st = 0; st < 10; st++)
wqwBox(G, 34 - st * 0.6, 0.28, 1.4, wqiIce(0xC8E0F4, { rep: 0.05 }), 0, H(0, -60) - 0.1 + st * 0.28, -60 - st * 1.4);
for (var bz = 96; bz >= -50; bz -= 18) {
if (Math.abs(bz - 10) < 20)
continue;
[-1, 1].forEach(function (s) { wqqBrazier(G, s * 12, H(s * 12, bz), bz, gO, 1.3); });
}
[-1, 1].forEach(function (s) { wqqBrazier(G, s * 20, H(0, -74), -73, gO, 2); });
for (i = 0; i < (lite ? 20 : 60); i++) {
var a2 = R() * Math.PI, r2 = 6 + R() * 9;
wqxGlow(gO, Math.cos(a2) * r2 - 0, H(0, 10) + 0.6 + R() * 3, 10 + 4 + Math.sin(a2) * r2 * 0.6, 0xBFE8FF, 0.6 + R() * 0.8);
}
var wl = new THREE.PointLight(0x9AD8FF, lite ? 1.2 : 1.8, 60);
wl.position.set(0, H(0, 10) + 8, 24);
G.add(wl);
wqxPool(G, 0, H(0, 10) + 0.2, 14, 14, 0x7AC8FF, 0.35);
var dl = new THREE.PointLight(0xBFE6FF, 1.4, 60);
dl.position.set(0, H(0, -74) + 10, -66);
G.add(dl);
[["stag", -34, 60, 1.2, 0.6], ["stag", 34, 60, 1.2, -0.6], ["fox", -26, -30, 1.6, 1], ["fox", 26, -30, 1.6, -1], ["rabbit", -48, 20, 2.2, 0.4], ["rabbit", 48, 20, 2.2, -0.4]].forEach(function (q) { var y = H(q[1], q[2]); wqwBox(G, 4, 1.4, 4, iceB, q[1], y, q[2]); var cg = wqwCrx(q[0], q[3]); if (!cg)
return; cg.traverse(function (o) { if (o.isMesh)
o.material = iceC; }); cg.position.set(q[1], y + 1.4, q[2]); cg.rotation.y = q[4]; G.add(cg); wqwRound(q[1], q[2], 2.4); });
var vp = wqwScatter(9973, lite ? 90 : 300, -420, 380, 420, 1090, function (x, z) { var d = Math.abs(x + Math.sin(z * 0.004) * 30 * wqwSmooth(150, 400, z)); return d > 16 && d < 330; }, H, 0.8, 1.5);
wqxTrees(G, "pine", vp, [0x2A4A3A, 0xE8F0F4, 0x34503E], { noSolid: 1 });
wqxGlowDone(G, gO, 2.0);
function room(i) { var A = wqwInAt("palace", i), g = new THREE.Group(); g.position.set(A.x, WQW_IN_Y, A.z); G.add(g); g.userData.A = A; return g; }
var floorM = wqwM("wqqMirrorFloor", function () {
var t = wqwCanvas("wqqFloorT", 256, 256, function (c, W, Hh) { var g = c.createLinearGradient(0, 0, W, Hh); g.addColorStop(0, "#9AC0E0"); g.addColorStop(0.5, "#C8E2F6"); g.addColorStop(1, "#8AB4D8"); c.fillStyle = g; c.fillRect(0, 0, W, Hh); c.strokeStyle = "rgba(255,255,255,.25)"; c.lineWidth = 2; for (var k = 0; k <= W; k += 64) {
c.beginPath();
c.moveTo(k, 0);
c.lineTo(k, Hh);
c.moveTo(0, k);
c.lineTo(W, k);
c.stroke();
} });
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(4, 8);
var m = new THREE.MeshStandardMaterial({ map: t, roughness: 0.06, metalness: 0.35, color: 0xFFFFFF });
m.userData.noPhoto = 1;
return m;
});
(function () {
var g = room(2), L = wqxGlowStart();
var f = new THREE.Mesh(new THREE.PlaneGeometry(27.6, 55.6), floorM);
f.rotation.x = -Math.PI / 2;
f.position.y = 0.02;
g.add(f);
for (var k = 0; k < 5; k++) {
[-1, 1].forEach(function (s) { var z = -20 + k * 10; wqqLancet(g, s * 13.9, 6, z, -s * Math.PI / 2, 3.2, 11, L); wqxShaft(g, s * 13.4, 15, z, 18, 0.6, 2.6, 0xBFE4FF, 0.06, s * 2, 0, z + 4); });
}
[-1, 1].forEach(function (s) { for (var k2 = 0; k2 < 6; k2++) {
var fz = new THREE.Mesh(new THREE.PlaneGeometry(8, 3), wqqFrostM(0.5));
fz.position.set(s * 13.95, 17.5, -22 + k2 * 9);
fz.rotation.y = -s * Math.PI / 2;
g.add(fz);
} });
for (k = 0; k < 3; k++)
wqqChandelier(g, 0, 15, -16 + k * 14, 2.0, 3, L, 20);
wqxShaft(g, 0, 19.5, -24, 20, 0.5, 3.2, 0xD8F0FF, 0.12, 0, 0, -24);
wqxPool(g, 0, 0.05, -24, 5, 0xBFE8FF, 0.4);
wqxGlow(L, 0, 4, -26, 0x9AD8FF, 6);
for (k = 0; k < 8; k++)
wqxGlow(L, (k % 2 ? 6 : -6), 1.6, -18 + Math.floor(k / 2) * 11, 0x9AE0FF, 2.6);
[-1, 1].forEach(function (s2) { wqqLancet(g, s2 * 7.5, 4, 27.9, Math.PI, 3.4, 12, L); var fz2 = new THREE.Mesh(new THREE.PlaneGeometry(26, 3), wqqFrostM(0.5)); fz2.position.set(0, 17.5, 27.95); fz2.rotation.y = Math.PI; g.add(fz2); });
var hl = new THREE.PointLight(0xBFE6FF, 1.2, 40);
hl.position.set(0, 12, -4);
g.add(hl);
wqxGlowDone(g, L, 1.2);
})();
(function () {
var g = room(0), L = wqxGlowStart();
var f = new THREE.Mesh(new THREE.PlaneGeometry(71.6, 75.6), floorM);
f.rotation.x = -Math.PI / 2;
f.position.y = 0.02;
g.add(f);
var tap = wqwM("wqqTapestry", function () { var t = wqiCarvedTex(); var m = new THREE.MeshPhongMaterial({ map: t, color: 0xCFE4F8, emissive: 0x1A3A5A, emissiveIntensity: 0.4, shininess: 20 }); m.userData.noPhoto = 1; return m; });
[-1, 1].forEach(function (s) { [-16, 0, 16].forEach(function (z) { var tp = new THREE.Mesh(new THREE.PlaneGeometry(9, 13), tap); tp.position.set(s * 35.9, 24.5, z); tp.rotation.y = -s * Math.PI / 2; g.add(tp); wqwBox(g, 0.3, 0.3, 9.6, wqiIce(0xE8F6FF, { e: 0x3A6A9A }), s * 35.8, 31.1, z); }); });
wqqChandelier(g, -16, 30, 4, 3.2, 3, L, 44);
wqqChandelier(g, 16, 30, 4, 3.2, 3, L, 44);
wqqChandelier(g, 0, 32, 20, 2.6, 3, L, 44);
for (var k = 0; k < 9; k++)
wqxGlow(L, -16 + k * 4, 6 + (k % 3) * 3, -24, 0x7AC8FF, 12);
wqxPool(g, 0, 0.05, -14, 18, 0x4A9CFF, 0.32);
var furs = [[-6, 4, 0.4], [6, 4, -0.4], [0, 8, 0.1]];
furs.forEach(function (q) { var fu = new THREE.Mesh(wqwGeo("wqqFur", function () { var gg = new THREE.CircleGeometry(1, 24); var p = gg.attributes.position; for (var i = 1; i < p.count; i++) {
var a = Math.atan2(p.getY(i), p.getX(i));
var rr = 1 + Math.sin(a * 5) * 0.12 + Math.sin(a * 11) * 0.06;
p.setXY(i, p.getX(i) * rr, p.getY(i) * rr);
} return gg; }), wqwS("b:quilt", 0xF4F0E8, 0.5)); fu.rotation.x = -Math.PI / 2; fu.rotation.z = q[2]; fu.scale.set(2.2, 1.6, 1); fu.position.set(q[0], 0.03, q[1]); g.add(fu); });
[-1, 1].forEach(function (s) { wqwBox(g, 2.2, 0.12, 9.6, wqwS("b:quilt", 0xF0ECE4, 0.5), s * 12, 0.9, -4); for (var c = 0; c < 6; c++)
wqqBrazier(g, s * 18, 0, -14 + c * 9, L, 1.4); });
var mc = [];
for (k = 0; k < 15; k++)
mc.push({ x: -28 + k * 4, y: 29.4, z: -21.6, h: 0.8, s: 3 });
wqxCandles(g, mc, L, { wax: 0xE8F4FF, flame: 0xCFF0FF, halo: 0x9AD8FF, hs: 1.2 });
wqxGlowDone(g, L, 1.2);
})();
(function () {
var g = room(1), L = wqxGlowStart();
var wall = new THREE.Mesh(new THREE.CylinderGeometry(12.4, 12.4, 7.2, 48, 1, true), wqiIce(0xCFE6F9, { rep: 0.1, ds: 1 }));
wall.position.y = 3.6;
g.add(wall);
var ov = new THREE.Mesh(new THREE.CylinderGeometry(12.3, 12.3, 7, 48, 1, true), wqqCausticM());
ov.position.y = 3.6;
g.add(ov);
var man = new THREE.Mesh(new THREE.CircleGeometry(9, 48), wqqFrostM(0.7));
man.rotation.x = -Math.PI / 2;
man.position.y = 0.04;
g.add(man);
var mf = new THREE.Mesh(new THREE.CircleGeometry(12.3, 48), floorM);
mf.rotation.x = -Math.PI / 2;
mf.position.y = 0.02;
g.add(mf);
wqxShaft(g, 0, 13, -1, 12, 0.3, 2.2, 0xD8E8FF, 0.14, 0, 0, -1);
wqxPool(g, 0, 0.06, -1, 3, 0xBFE0FF, 0.5);
wqxGlow(L, 0, 2, -1, 0xCFE8FF, 4);
wqxGlow(L, 0, 2.3, -1, 0xE8F0FF, 1.4);
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2 + Math.PI / 12;
wqqBrazier(g, Math.cos(a) * 10.6, 0, Math.sin(a) * 10.6 - 0, L, 0.8);
}
var sl = new THREE.PointLight(0xBFE0FF, 1.0, 24);
sl.position.set(0, 6, -1);
g.add(sl);
wqxGlowDone(g, L, 1.0);
})();
(function () {
var g = room(3), L = wqxGlowStart();
var wd = wqiIce(0xB8D6EE, { e: 0x183858 });
var lad = new THREE.Group();
lad.position.set(-8.6, 0, 0);
lad.rotation.z = -0.12;
g.add(lad);
[-0.3, 0.3].forEach(function (z) { wqwBox(lad, 0.08, 6.6, 0.08, wd, 0, 0, z); });
for (var r = 0; r < 14; r++)
wqwBox(lad, 0.06, 0.06, 0.62, wd, 0, 0.3 + r * 0.45, 0);
var rail = wqwBox(g, 0.06, 0.06, 15, wqxBrass(), -9.1, 6.8, 0);
var lec = new THREE.Group();
lec.position.set(4, 0, 2);
lec.rotation.y = -0.6;
g.add(lec);
wqwCyl(lec, 0.12, 0.25, 1.1, wd, 0, 0, 0, 10);
var top = new THREE.Mesh(wqwBoxG(0.9, 0.06, 0.6), wd);
top.position.y = 1.2;
top.rotation.x = -0.35;
lec.add(top);
var pg = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), wqwM("wqqPage", function () { var t = wqwCanvas("wqqPageT", 256, 160, function (c, W, Hh) { c.fillStyle = "#EDE6D2"; c.fillRect(0, 0, W, Hh); c.fillStyle = "#5A4A3A"; for (var y = 14; y < Hh - 10; y += 9) {
c.fillRect(10, y, W / 2 - 20, 2);
c.fillRect(W / 2 + 10, y, W / 2 - 20, 2);
} c.fillStyle = "#8A1A1A"; c.fillRect(12, 10, 14, 18); c.strokeStyle = "#9A8A70"; c.beginPath(); c.moveTo(W / 2, 0); c.lineTo(W / 2, Hh); c.stroke(); }); var m = new THREE.MeshLambertMaterial({ map: t }); m.userData.noPhoto = 1; return m; }));
pg.rotation.x = -Math.PI / 2 - 0.35 + Math.PI;
pg.rotation.set(-Math.PI / 2 + 0.35, 0, 0);
pg.position.set(0, 1.25, 0);
lec.add(pg);
var gb = new THREE.Group();
gb.position.set(-4, 0, 3);
g.add(gb);
wqwCyl(gb, 0.25, 0.35, 0.9, wd, 0, 0, 0, 10);
var sp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 16), wqiIce(0xCFE8FF, { op: 0.85, e: 0x3A6A9A }));
sp.position.y = 1.4;
gb.add(sp);
var mer = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.03, 6, 32), wqxBrass());
mer.position.y = 1.4;
mer.rotation.y = 0.4;
gb.add(mer);
var cc = [{ x: -0.9, y: 0.9, z: -1 }, { x: 0.9, y: 0.9, z: -1 }, { x: 0, y: 0.9, z: -0.6 }];
wqxCandles(g, cc, L, { wax: 0xE8F4FF, flame: 0xCFF0FF, halo: 0x9AD8FF });
for (var k = 0; k < 6; k++) {
var bk = new THREE.Group();
bk.position.set(-1.2 + k * 0.35, 0.92, -1.3);
bk.rotation.y = (k - 3) * 0.2;
g.add(bk);
wqwBox(bk, 0.28, 0.06 + 0.02 * (k % 3), 0.2, wqwLam([0x3A5A8A, 0x6A2A3A, 0x2A4A3A, 0x8A7A5A][k % 4]), 0, 0, 0);
}
wqqLancet(g, -5, 2, 7.9, Math.PI, 2.6, 5.4, L);
wqqLancet(g, 5, 2, 7.9, Math.PI, 2.6, 5.4, L);
wqqChandelier(g, 0, 6.4, -1, 1.0, 2, L, 8);
var ll = new THREE.PointLight(0xBFE6FF, 0.9, 18);
ll.position.set(0, 5, 0);
g.add(ll);
wqxGlowDone(g, L, 1.0);
})();
(function () {
var g = room(4), L = wqxGlowStart();
var lace = wqwM("wqqLace", function () { var t = wqqFrostTex(); var m = new THREE.MeshLambertMaterial({ map: t, color: 0xF4FAFF, transparent: true, opacity: 0.7, side: THREE.DoubleSide, emissive: 0x2A4A6A }); m.userData.noPhoto = 1; return m; });
[[-1.9, -6.5], [1.9, -6.5], [-1.9, -2.3], [1.9, -2.3]].forEach(function (p) { wqiSpire(g, p[0], 0, p[1], 0.18, 4.6, wqiIce(0xE8F6FF, { e: 0x3A6A9A }), 2); });
var cn = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.6), lace);
cn.rotation.x = -Math.PI / 2;
cn.position.set(0, 4.4, -4.4);
g.add(cn);
[-1, 1].forEach(function (s) { var d = wqxDrape(g, s * 2.0, 4.4, -4.4, 4.2, 3.8, Math.PI / 2, lace, { depth: 0.08 }); });
for (var k = 0; k < 4; k++) {
var fu = new THREE.Mesh(wqwGeo("wqqFurPile", function () { var gg = new THREE.SphereGeometry(0.6, 16, 8); gg.scale(1.4, 0.25, 1); return gg; }), wqwS("b:quilt", 0xF6F4F0, 0.5));
fu.position.set(-0.8 + (k % 2) * 1.6, 0.95 + Math.floor(k / 2) * 0.12, -4.6 + Math.floor(k / 2) * 1.2);
fu.rotation.y = k * 0.4;
g.add(fu);
}
var vn = new THREE.Group();
vn.position.set(-6.6, 0, -1);
vn.rotation.y = Math.PI / 2;
g.add(vn);
wqwBox(vn, 2, 0.8, 0.7, wqiIce(0xD8EEFC), 0, 0, 0);
wqxMirror(vn, 0, 0.9, -0.3, 1.1, 1.6, 0, { oval: 1, tint: "cold" });
var cv = [{ x: -0.8, y: 0.8, z: 0.1 }, { x: 0.8, y: 0.8, z: 0.1 }];
wqxCandles(vn, cv, null, { wax: 0xE8F4FF, flame: 0xCFF0FF });
wqxGlow(L, -6.5, 1.1, -1.8, 0x9AD8FF, 0.8);
wqxGlow(L, -6.5, 1.1, -0.2, 0x9AD8FF, 0.8);
wqwBox(g, 2.6, 3.6, 1, wqiIce(0xB8D6EE, { e: 0x183858 }), 5.8, 0, 4.6, 0, 1);
wqwBox(g, 0.04, 3.2, 0.02, wqiIce(0xE8F6FF, { e: 0x3A6A9A }), 5.8, 0.2, 4.08);
var ch = new THREE.Group();
ch.position.set(4.4, 0, -0.4);
ch.rotation.y = -0.8;
g.add(ch);
wqwBox(ch, 2.2, 0.45, 0.8, wqiIce(0xD8EEFC), 0, 0, 0);
wqwBox(ch, 2.0, 0.14, 0.7, wqwS("b:quilt", 0xF4F0EA, 0.5), 0, 0.45, 0);
var hb = new THREE.Mesh(wqwBoxG(0.3, 0.7, 0.8), wqiIce(0xD8EEFC));
hb.position.set(-1, 0.75, 0);
hb.rotation.z = 0.4;
ch.add(hb);
wqxShaft(g, 7.4, 5, -1, 6, 0.7, 1.8, 0xBFE0FF, 0.08, 2, 0, -1);
wqqChandelier(g, 0, 5.6, 0.5, 0.9, 2, L, 7);
var bl = new THREE.PointLight(0xCFE6FF, 0.9, 16);
bl.position.set(0, 4, 0);
g.add(bl);
wqxGlowDone(g, L, 1.0);
})();
};
})();
function wqsThatchM() { return __ZC(502, 114, this, arguments, new.target); }
function wqsCottage(G, x, z, y) { return __ZC(502, 115, this, arguments, new.target); }
function wqsButterflies(P, list) { return __ZC(502, 116, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.spring.build;
WQW_SCN.spring.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqrSpringH, R = wRand(7821), L = wqxGlowStart();
wqsCottage(G, 0, -120, H(0, -120));
var lane = [];
for (var z = 340; z > -80; z -= 12) {
var px = Math.sin(z * 0.02) * 6 - 6;
[-1, 1].forEach(function (s) { var x = px + s * (7 + R() * 3); lane.push({ x: x, z: z + (R() - 0.5) * 4, y: H(x, z), s: 0.75 + R() * 0.3, ry: R() * 6 }); });
}
wqxTrees(G, "maple", lane.filter(function (t, i) { return i % 3 !== 2; }), [0xF8D8E8, 0xFFFFFF, 0xF4B8D0]);
wqxTrees(G, "oak", lane.filter(function (t, i) { return i % 3 === 2; }), [0x6AA84A, 0x8AC060]);
var fruit = [];
lane.forEach(function (t, i) { if (i % 3 !== 2)
return; for (var k = 0; k < 14; k++)
fruit.push({ x: t.x + (R() - 0.5) * 6 * t.s, y: t.y + (8 + R() * 5) * t.s, z: t.z + (R() - 0.5) * 6 * t.s, s: 1 }); });
wqwInst(G, wqwGeo("apple", function () { return new THREE.SphereGeometry(0.12, 8, 6); }), wqwLam(0xD8301A), fruit, {});
var more = wqwScatter(7822, lite ? 900 : 3200, -260, -90, 240, 380, function (x, z) { return Math.abs(x - (Math.sin(z * 0.02) * 6 - 6)) > 2.2; }, H, 0.8, 1.4);
["#F8F0A0", "#C8A8F0", "#FFFFFF", "#F8D040", "#8A6AE0", "#F4F4FF"].forEach(function (c, k) { wqwPlant(G, "flowers", more.filter(function (t, i) { return i % 6 === k; }), { col: c, keepAll: lite ? 0 : 1 }); });
var grove = wqwScatter(7823, lite ? 60 : 220, -680, -680, 680, 680, function (x, z) { var r = Math.hypot(x, z); return r > 280 && r < 680; }, H, 0.9, 1.5);
wqxTrees(G, "maple", grove.filter(function (t, i) { return i % 2; }), [0xF8D8E8, 0xFFFFFF, 0x7AB850], { noSolid: 1 });
wqxTrees(G, "birch", grove.filter(function (t, i) { return !(i % 2); }), [0x8AC060, 0xA8D070], { noSolid: 1 });
wqsButterflies(G, wqwScatter(7824, lite ? 60 : 240, -200, -140, 200, 360, null, H, 1, 1).map(function (t) { t.y += 0.6 + R() * 1.6; t.rx = (R() - 0.5) * 0.6; return t; }));
var sh = new THREE.Mesh(new THREE.PlaneGeometry(1200, 46), wqwM("wqsShimmer", function () {
var t = wqwCanvas("wqsShimT", 512, 128, function (c, W, Hh) { for (var x = 0; x < W; x++) {
var hu = (x * 1.7) % 360;
var gg = c.createLinearGradient(0, 0, 0, Hh);
gg.addColorStop(0, "hsla(" + hu + ",90%,80%,0)");
gg.addColorStop(0.5, "hsla(" + hu + ",90%,75%,.45)");
gg.addColorStop(1, "hsla(" + hu + ",90%,80%,0)");
c.fillStyle = gg;
c.fillRect(x, 0, 1, Hh);
} });
t.wrapS = THREE.RepeatWrapping;
t.repeat.set(8, 1);
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
}));
sh.position.set(0, H(0, 382) + 20, 382);
G.add(sh);
wqxGlowDone(G, L, 1.2);
(function () {
var A = wqwInAt("spring", 0), g = new THREE.Group();
g.position.set(A.x, WQW_IN_Y, A.z);
G.add(g);
var L2 = wqxGlowStart(), beam = wqwS("b:oak", 0x5A3A22, 1.4);
for (var bx = -5; bx <= 5; bx += 2.5)
wqwBox(g, 0.3, 0.3, 9, beam, bx, 3.3, 0);
wqxPanelling(g, 12, 9, 3.6, { h0: 1.0, step: 3, wood: wqwS("b:oak", 0x7A5A3A, 1.4), trim: beam, skip: [["s", 0, 1.2], ["n", 0, 1.4]] });
wqwBox(g, 3.4, 0.25, 1.0, beam, -4.4, 1.6, -3.8);
for (var k = 0; k < 5; k++) {
var cp = new THREE.Mesh(wqwGeo("wqsPan", function () { return new THREE.CylinderGeometry(0.16, 0.12, 0.12, 14); }), wqwShine(0xC8703A, 0.3, 0.9));
cp.position.set(-2.6 + k * 0.5, 2.9, -4.1);
cp.rotation.x = Math.PI / 2;
g.add(cp);
}
for (k = 0; k < 8; k++) {
var hb = new THREE.Mesh(wqwGeo("wqsHerb", function () { var c = new THREE.ConeGeometry(0.1, 0.4, 6); c.rotateX(Math.PI); return c; }), wqwLam([0x6A8A3A, 0x8A9A4A, 0xB89A5A][k % 3]));
hb.position.set(1 + k * 0.5, 3.0, -3.0);
g.add(hb);
}
var dr = new THREE.Group();
dr.position.set(5.6, 0, 1.6);
dr.rotation.y = -Math.PI / 2;
g.add(dr);
wqwBox(dr, 2.4, 0.9, 0.6, beam, 0, 0, 0);
wqwBox(dr, 2.4, 1.4, 0.3, beam, 0, 0.9, -0.15);
for (k = 0; k < 6; k++) {
var pl = new THREE.Mesh(wqwGeo("wqsPlate", function () { return new THREE.CircleGeometry(0.17, 18); }), wqwLam([0xF4F0E8, 0x6A8AC8][k % 2]));
pl.position.set(-0.95 + k * 0.38, 1.3 + (k % 2) * 0.45, 0.02);
dr.add(pl);
}
[[-3.4, 2.6, 0.6], [-1.6, 3.2, -0.5]].forEach(function (c) { wqwChair(g, c[0], c[1], c[2], wqwS("b:quilt", 0xC86A5A, 0.8), 1); });
var fc = [{ x: -0.9, y: 0.8, z: 0.2 }, { x: 0.9, y: 0.8, z: -0.2 }];
wqxCandles(g, fc, L2);
wqxGlow(L2, -4.4, 0.8, -3.4, 0xFF9A40, 3.4);
wqxShaft(g, -3.6, 2.5, 4.4, 4, 0.6, 1.4, 0xFFE8B0, 0.08, -2.6, 0, 1.6);
wqxShaft(g, 3.6, 2.5, 4.4, 4, 0.6, 1.4, 0xFFE8B0, 0.08, 2.6, 0, 1.6);
[[-3.6, 4.44], [3.6, 4.44]].forEach(function (p) { var w = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.5), wqwM("wqsGlass", null)); w.position.set(p[0], 1.8, p[1]); w.rotation.y = Math.PI; g.add(w); });
wqxGlowDone(g, L2, 1.0);
})();
(function () {
var A = wqwInAt("spring", 1), g = new THREE.Group();
g.position.set(A.x, WQW_IN_Y, A.z);
G.add(g);
var beam = wqwS("b:oak", 0x5A3A22, 1.4);
for (var bx = -3.6; bx <= 3.6; bx += 2.4)
wqwBox(g, 0.26, 0.26, 8, beam, bx, 3.14, 0);
[-2.4, -0.8].forEach(function (x) { wqwBox(g, 1.0, 0.1, 1.5, wqwS("b:quilt", 0xE8A0A8, 0.8), x, 0.62, -1.6); wqwBox(g, 0.9, 0.4, 0.4, beam, x, 0, -0.6); });
var jug = new THREE.Mesh(wqwGeo("pitcher", function () { return new THREE.CylinderGeometry(0.08, 0.11, 0.3, 12); }), wqwLam(0x6A8AC8));
jug.position.set(-1.6, 0.55, -3.4);
g.add(jug);
wqwBox(g, 0.6, 0.55, 0.5, beam, -1.6, 0, -3.5);
wqwPlant(g, "flowers", [{ x: -1.62, y: 0.8, z: -3.4, s: 0.5, ry: 0 }, { x: -1.55, y: 0.82, z: -3.38, s: 0.45, ry: 1.5 }], { col: "#F4B8D0", keepAll: 1 });
wqxShaft(g, 0, 2.4, -3.9, 3.6, 0.9, 1.6, 0xFFE8B0, 0.09, 0.8, 0, -1.0);
wqxPool(g, 0.6, 0.02, -1.4, 1.6, 0xFFE8B0, 0.18);
})();
};
})();
WQW_ENV.coragold = { top: 0x8A7090, low: 0xF8C070, fog: 0xE0A060, fogD: 0.0042, sun: 0.95, sunCol: 0xFFB050, sunDir: [-0.8, 0.18, 0.35], hemi: 0.75, hemiCol: 0xFFD090, hemiGround: 0x7A3A14 };
WQW_SC.autumn.env = "coragold";
function wqaPathX(z) { return Math.sin(z * 0.01) * 20; }
(function () {
var b0 = WQW_SCN.autumn.build;
WQW_SCN.autumn.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqrAutumnH, R = wRand(7901), L = wqxGlowStart();
function clear(x, z) {
return Math.abs(x - wqaPathX(z)) > 6 && Math.hypot(x, z - 60) > 26 && Math.hypot(x - WQL.x, z - WQL.z) > 24 && Math.hypot(x, z - 360) > 12 &&
Math.hypot(x - (WQL.x + Math.sin(WQL.ry) * 15), z - (WQL.z + Math.cos(WQL.ry) * 15)) > 14 && Math.hypot(x - 160, z + 40) > 14;
}
var wood = wqwScatter(7902, lite ? 260 : 1100, -300, -260, 300, 400, clear, H, 0.9, 1.6);
wqxTrees(G, "maple", wood.filter(function (t, i) { return i % 5 < 2; }), [0xD8381A, 0xF0901A, 0xB8200E, 0xE8B030]);
wqxTrees(G, "oak", wood.filter(function (t, i) { return i % 5 === 2 || i % 5 === 3; }), [0xC8801A, 0xA85A14, 0xD8A030]);
wqxTrees(G, "birch", wood.filter(function (t, i) { return i % 5 === 4; }), [0xF0C030, 0xE8A820]);
var drift = wqwScatter(7903, lite ? 1400 : 5200, -160, -120, 160, 380, function (x, z) { return Math.abs(x - wqaPathX(z)) > 1.4; }, H, 0.8, 1.6).map(function (t) { t.y += 0.05; t.rx = -Math.PI / 2 + (R() - 0.5) * 0.5; t.rz = t.ry; return t; });
[0xC8401A, 0xE8A028, 0x8A2A10, 0xD87A28, 0xB85A14, 0xF0C040].forEach(function (col, k) { wqwInst(G, wqwGeo("leafP", function () { return new THREE.PlaneGeometry(0.22, 0.16); }), wqwLam(col, { ds: 1 }), drift.filter(function (t, i) { return i % 6 === k; }), {}); });
var mound = wqwScatter(7904, lite ? 120 : 420, -200, -160, 200, 380, clear, H, 0.8, 1.8);
[0xB8501A, 0xD88A2A, 0x8A3A12].forEach(function (col, k) { wqwInst(G, wqwGeo("wqaMound", function () { var c = new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1.2, 0.22, 1); var p = c.attributes.position, r2 = wRand(5); for (var i = 0; i < p.count; i++)
p.setY(i, p.getY(i) * (0.7 + r2() * 0.6)); c.computeVertexNormals(); return c; }), wqwS("b:quilt", col, 0.6), mound.filter(function (t, i) { return i % 3 === k; }), {}); });
var brk = wqwScatter(7905, lite ? 220 : 900, -220, -180, 220, 390, function (x, z) { return Math.abs(x - wqaPathX(z)) > 2.4 && clear(x, z) || Math.abs(x - wqaPathX(z)) > 2.4 && Math.abs(x - wqaPathX(z)) < 6; }, H, 0.7, 1.4);
[0xA8501A, 0xC87A2A, 0x7A4A1A].forEach(function (col, k) { wqwInst(G, wqwGeo("wqaBracken", function () { var parts = []; for (var i = 0; i < 7; i++) {
var p = new THREE.PlaneGeometry(0.3, 1.1, 1, 4);
p.translate(0, 0.55, 0);
var pa = p.attributes.position;
for (var j = 0; j < pa.count; j++) {
var t = pa.getY(j) / 1.1;
pa.setZ(j, -0.5 * t * t);
}
p.rotateY(i / 7 * Math.PI * 2);
parts.push(p.toNonIndexed());
} var g = gwMerge(parts); g.computeVertexNormals(); return g; }), wqxLeafM(col), brk.filter(function (t, i) { return i % 3 === k; }), {}); });
var logs = wqwScatter(7906, lite ? 16 : 50, -180, -140, 180, 380, clear, H, 0.8, 1.4);
logs.forEach(function (t) { t.rz = Math.PI / 2; t.y += 0.32 * t.s; });
wqwInst(G, wqwGeo("wqaLog", function () { var c = new THREE.CylinderGeometry(0.34, 0.4, 4.4, 10); return c; }), wqwMat("bark"), logs, {});
wqwInst(G, wqwGeo("wqaMoss", function () { var c = new THREE.CylinderGeometry(0.36, 0.42, 4.0, 10, 1, true, 0, Math.PI * 0.8); return c; }), wqwLam(0x5A6A22), logs, {});
var shrooms = [];
logs.forEach(function (t) { for (var k = 0; k < 6; k++) {
shrooms.push({ x: t.x + (R() - 0.5) * 3, z: t.z + (R() - 0.5) * 1.4, y: t.y - 0.32 * t.s, s: 0.6 + R() * 0.8, ry: R() * 6 });
} });
wqwInst(G, wqwGeo("wqaStem", function () { var c = new THREE.CylinderGeometry(0.03, 0.04, 0.18, 6); c.translate(0, 0.09, 0); return c; }), wqwLam(0xF0E6D0), shrooms, {});
wqwInst(G, wqwGeo("wqaCap", function () { var c = new THREE.SphereGeometry(0.1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1, 0.6, 1); c.translate(0, 0.17, 0); return c; }), wqwLam(0xB8301A, { e: 0x2A0804 }), shrooms, {});
wqwPlant(G, "rock", wqwScatter(7907, lite ? 30 : 110, -200, -160, 200, 380, clear, H, 0.4, 1.2), { mat: wqwS("b:ashlar", 0x8A7A5A, 1.6) });
var apt = [];
for (var z = 330; z > 90; z -= 26) {
var s = (z / 26 | 0) % 2 ? 1 : -1, x = wqaPathX(z) + s * (9 + R() * 4);
apt.push({ x: x, z: z, y: H(x, z), s: 0.75 + R() * 0.2, ry: R() * 6 });
}
wqxTrees(G, "oak", apt, [0x8A8A2A, 0xA89A30]);
var fruit = [];
apt.forEach(function (t) { for (var k = 0; k < 22; k++)
fruit.push({ x: t.x + (R() - 0.5) * 6 * t.s, y: t.y + (7 + R() * 5) * t.s, z: t.z + (R() - 0.5) * 6 * t.s, s: 1.1 }); for (k = 0; k < 8; k++)
fruit.push({ x: t.x + (R() - 0.5) * 7, y: H(t.x, t.z) + 0.1, z: t.z + (R() - 0.5) * 7, s: 1 }); });
wqwInst(G, wqwGeo("apple", function () { return new THREE.SphereGeometry(0.12, 8, 6); }), wqwLam(0xC8201A, { e: 0x200404 }), fruit, {});
var shafts = wqwScatter(7908, lite ? 10 : 34, -120, -80, 120, 360, function (x, z) { return Math.abs(x - wqaPathX(z)) < 30; }, H, 1, 1);
shafts.forEach(function (t) { wqxShaft(G, t.x + 16, t.y + 26, t.z - 6, 30, 0.8, 4.2, 0xFFB050, lite ? 0.06 : 0.08, t.x, t.y, t.z); });
for (var mz = 320; mz >= 0; mz -= 80)
wqcMotes(G, lite ? 60 : 220, wqaPathX(mz), mz, 40, 1, 16, [0xE86A20, 0xF0B030, 0xC8301A][(mz / 80 | 0) % 3]);
wqcMotes(G, lite ? 60 : 200, WQL.x, WQL.z, 34, 1, 14, 0xF8C860);
[[wqaPathX(300), 300], [wqaPathX(220), 220], [wqaPathX(140), 140], [WQL.x, WQL.z], [0, 60]].forEach(function (c, ci) {
var grp = new THREE.Group();
grp.position.set(c[0], H(c[0], c[1]), c[1]);
grp.userData.sp = 0.05 + ci * 0.01;
G.add(grp);
WQW.spin.push(grp);
var fl = [];
for (var k = 0; k < (lite ? 50 : 180); k++) {
var a = R() * Math.PI * 2, r = 2 + R() * 26;
fl.push({ x: Math.cos(a) * r, y: 0.6 + R() * 12, z: Math.sin(a) * r, s: 1 + R() * 0.8, rx: R() * 6, ry: R() * 6, rz: R() * 6 });
}
[0xE05A1A, 0xF0A828, 0xB8200E].forEach(function (col, k) { wqwInst(grp, wqwGeo("leafP", null), wqwLam(col, { ds: 1 }), fl.filter(function (t, i) { return i % 3 === k; }), { cull: false }); });
});
for (z = 340; z > 40; z -= 14) {
var s2 = (z / 14 | 0) % 2 ? 1 : -1, lx = wqaPathX(z) + s2 * 3.4;
wqwCyl(G, 0.02, 0.02, 0.6, wqwLam(0x2A1A10), lx, H(lx, z) + 3.2, z, 4);
var lan = new THREE.Mesh(wqwGeo("wqaLan", function () { return new THREE.SphereGeometry(0.22, 10, 8); }), wqwGlowM(0xFFA040, 1));
lan.position.set(lx, H(lx, z) + 3.0, z);
G.add(lan);
wqxGlow(L, lx, H(lx, z) + 3.0, z, 0xFFA040, 2.4);
}
[[60, 200], [-70, 140], [90, 40], [-110, 260]].forEach(function (p) { wqwSmoke(G, p[0], H(p[0], p[1]) + 2, p[1], 0xC8A07A, lite ? 3 : 6); });
wqxGlowDone(G, L, 1.2);
};
})();
function wqtArchWin(P, x, y, z, ry, w, h, L) { return __ZC(502, 117, this, arguments, new.target); }
function wqtClimb(P, x, y, z, ry, w, h, n, seed, bloomCol) { return __ZC(502, 118, this, arguments, new.target); }
function wqtUrnTree(P, x, y, z, s, fruitCol) { return __ZC(502, 119, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.summer.build;
WQW_SCN.summer.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqjSummerH, R = wRand(7951), P = WQJ_PAL, ty = WQW.summerY, L = wqxGlowStart();
var gold = wqwS("b:ashlar", 0xF0CC78, 2.4), marble = wqwMat("marble");
var lane = [];
for (var z = 350; z > -10; z -= 11) {
[-1, 1].forEach(function (s) { var x = s * (6.5 + R() * 1.5); lane.push({ x: x, z: z + (R() - 0.5) * 2, y: H(x, z), s: 0.62 + R() * 0.12, ry: R() * 6 }); });
}
wqxTrees(G, "oak", lane, [0x4A8A2A, 0x5A9A30, 0x3A7A22]);
var fr = [[], [], []];
lane.forEach(function (t, i) { for (var k = 0; k < 26; k++)
fr[(i + k) % 3].push({ x: t.x + (R() - 0.5) * 5.4 * t.s, y: t.y + (6 + R() * 5) * t.s, z: t.z + (R() - 0.5) * 5.4 * t.s, s: 1.1 }); for (k = 0; k < 5; k++)
fr[k % 3].push({ x: t.x + (R() - 0.5) * 5, y: t.y + 0.1, z: t.z + (R() - 0.5) * 5, s: 1 }); });
[0xF8903A, 0x6A1A5A, 0xD8201A].forEach(function (c, i) { wqwInst(G, wqwGeo("fruit" + i, function () { return new THREE.SphereGeometry(0.15, 8, 6); }), wqwLam(c, { e: 0x1A0804 }), fr[i], {}); });
var bd = [];
for (z = 360; z > -30; z -= 0.9) {
[-1, 1].forEach(function (s) { for (var k = 0; k < 2; k++) {
var x = s * (3 + R() * 2.6);
bd.push({ x: x, z: z + (R() - 0.5) * 0.8, y: H(x, z), s: 0.8 + R() * 0.5, ry: R() * 6 });
} });
}
["#F02A2A", "#F8C020", "#F050A0", "#7A3AE0", "#FFFFFF", "#F87A1A", "#2A7AF0", "#FF3A6A"].forEach(function (c, k) { wqwPlant(G, "flowers", bd.filter(function (t, i) { return i % 8 === k; }), { col: c, keepAll: 1 }); });
var lav = [];
for (z = 360; z > -30; z -= 1.6) {
[-1, 1].forEach(function (s) { var x = s * (2.7 + R() * 0.3); lav.push({ x: x, z: z, y: H(x, z), s: 0.8 + R() * 0.3, ry: R() * 6 }); });
}
wqwInst(G, wqwGeo("wqtLav", function () { var parts = [], r = wRand(31); for (var i = 0; i < 9; i++) {
var c = new THREE.CylinderGeometry(0.015, 0.02, 0.7, 4);
c.translate(0, 0.35, 0);
c.rotateZ((r() - 0.5) * 0.6);
c.rotateY(r() * 6);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), wqwLam(0x5A7A3A), lav, {});
wqwInst(G, wqwGeo("wqtLavF", function () { var parts = [], r = wRand(31); for (var i = 0; i < 9; i++) {
var c = new THREE.SphereGeometry(0.05, 5, 4);
c.scale(1, 2.6, 1);
c.translate(0, 0.72, 0);
c.rotateZ((r() - 0.5) * 0.6);
c.rotateY(r() * 6);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), wqwLam(0x8A5AD8, { e: 0x1A0A30 }), lav, {});
wqwPlant(G, "grass", wqwScatter(7953, lite ? 600 : 2200, -80, -30, 80, 370, function (x, z) { return Math.abs(x) > 3; }, H, 1.0, 1.6), { col: 0x7AA840 });
if (typeof wqsButterflies === "function")
wqsButterflies(G, wqwScatter(7954, lite ? 60 : 260, -60, -30, 60, 360, null, H, 1, 1).map(function (t) { t.y += 0.6 + R() * 1.8; t.rx = (R() - 0.5) * 0.6; return t; }));
for (var wx = -16; wx <= 16; wx += 8) {
if (Math.abs(wx) < 4)
continue;
wqtArchWin(G, P.x + wx, ty + 2, P.z - 15.95, 0, 2.4, 7, L);
wqtClimb(G, P.x + wx, ty, P.z - 15.9, 0, 3.2, 4.6, lite ? 40 : 120, 7960 + wx, 0xF04A6A);
}
for (var lx = -18; lx <= 18; lx += 4)
wqwBox(G, 0.7, 15, 0.3, gold, P.x + lx, ty, P.z - 15.85);
wqwBox(G, 41, 0.8, 1.0, gold, P.x, ty + 14.2, P.z - 15.6);
wqwBox(G, 41, 0.4, 0.6, marble, P.x, ty + 10.4, P.z - 15.7);
wqtArchWin(G, P.x, ty + 9, P.z - 15.95, 0, 3.6, 4.4, L);
[-1, 1].forEach(function (s) {
var cx = P.x + s * 32;
for (var k = -6; k <= 6; k += 4)
wqtArchWin(G, cx + k, ty + 0.8, P.z + 1.06, 0, 1.8, 3.0, L);
wqtClimb(G, cx, ty, P.z + 1.05, 0, 17, 11, lite ? 120 : 420, 7970 + s, s > 0 ? 0xF8A040 : 0xE83A6A);
wqtClimb(G, P.x + s * 39, ty, P.z - 21.4, 0, 4.6, 20, lite ? 60 : 200, 7975 + s, 0xF8F0F0);
for (var h = 4; h < 20; h += 5)
wqtArchWin(G, P.x + s * 39, ty + h, P.z - 21.35, 0, 0.9, 1.8, L);
for (var lv = 0; lv < 2; lv++) {
var by = ty + 4 + lv * 4.4, sp = [];
for (var k2 = 0; k2 < (lite ? 30 : 90); k2++)
sp.push({ x: cx - 8 + R() * 16, y: by + 0.6 - R() * 2.6 * Math.pow(R(), 0.5), z: P.z + 3.4 + R() * 0.3, s: 0.8 + R() * 0.6 });
wqwInst(G, wqwGeo("wqsRose", null), wqwLam([0xD81A6A, 0xF04A9A][lv], { e: 0x2A0418 }), sp, {});
}
});
(function () {
var fz = P.z + 6, m = new THREE.Mesh(new THREE.CircleGeometry(14, 48), wqwM("wqtMosaic", function () {
var t = wqwCanvas("wqtMosT", 512, 512, function (c, W, Hh) {
c.fillStyle = "#E8C878";
c.fillRect(0, 0, W, Hh);
c.translate(W / 2, Hh / 2);
c.fillStyle = "#B89858";
c.fillRect(-W / 2, -Hh / 2, W, Hh);
for (var r = 30; r < 256; r += 5) {
var band = Math.floor(r / 16);
for (var a = 0; a < Math.PI * 2; a += 4.6 / r) {
c.fillStyle = ["#2A5AA8", "#F0D890", "#C8902A", "#F4ECD8", "#3A8AC8", "#E8B850"][(band + (band % 3 === 0 ? Math.floor(a * 8 / Math.PI) : 0)) % 6];
c.fillRect(Math.cos(a) * r - 2, Math.sin(a) * r - 2, 4, 4);
}
}
for (var k = 0; k < 12; k++) {
c.save();
c.rotate(k / 12 * Math.PI * 2);
c.fillStyle = "#C87A1A";
c.beginPath();
c.moveTo(0, -60);
c.quadraticCurveTo(30, -150, 0, -240);
c.quadraticCurveTo(-30, -150, 0, -60);
c.fill();
c.restore();
}
});
var mm = new THREE.MeshLambertMaterial({ map: t });
mm.userData.noPhoto = 1;
return mm;
}));
m.rotation.x = -Math.PI / 2;
m.position.set(P.x, ty + 0.02, fz);
G.add(m);
[[-24, 22], [24, 22], [-24, -8], [24, -8], [-8, 26], [8, 26], [-36, 10], [36, 10]].forEach(function (p, i) { wqtUrnTree(G, P.x + p[0], ty, P.z + p[1], 1.1, i % 2 ? 0xF0D020 : 0xF08A10); wqwRound(P.x + p[0], P.z + p[1], 0.8, ty - 1, ty + 3); });
[[-36, 26], [36, 26]].forEach(function (p) { var x = P.x + p[0], z = P.z + p[1]; wqwCyl(G, 2.2, 2.4, 0.7, marble, x, ty, z, 24); wqwWater(G, x, z, 4, 4, ty + 0.6, 0x4AA0D8, 0.85); wqwCyl(G, 0.3, 0.4, 1.8, marble, x, ty, z, 10); wqwRound(x, z, 2.4, ty - 1, ty + 1); wqxGlow(L, x, ty + 2, z, 0xE8F6FF, 1.4); });
for (var k = 0; k < 30; k++) {
var a = R() * Math.PI * 2, r = 1 + R() * 4;
wqxGlow(L, P.x + Math.cos(a) * r, ty + 1 + R() * 5, fz + Math.sin(a) * r, 0xFFF4D8, 0.4 + R() * 0.5);
}
})();
for (var ax = -42; ax <= 42; ax += 12)
wqxShaft(G, P.x + ax - 10, ty + 18, P.z + 42, 22, 0.6, 2.6, 0xFFC060, lite ? 0.05 : 0.07, P.x + ax, ty, P.z + 28);
for (ax = -42; ax <= 42; ax += 6) {
[33, -33].forEach(function (zz) { var lan = new THREE.Mesh(wqwGeo("wqaLan", function () { return new THREE.SphereGeometry(0.22, 10, 8); }), wqwGlowM(0xFFB050, 1)); lan.position.set(P.x + ax + 3, ty + 9.6, P.z + zz); G.add(lan); wqxGlow(L, P.x + ax + 3, ty + 9.6, P.z + zz, 0xFFB050, 2.0); });
}
var warm = new THREE.PointLight(0xFFC070, 1.0, 60);
warm.position.set(P.x, ty + 8, P.z);
G.add(warm);
(function () {
var x = 96, z = -10, y = H(x, z) + 0.4;
[[-7.4, -5.4], [0, -5.4], [7.4, -5.4], [-7.4, 5.4], [0, 5.4], [7.4, 5.4]].forEach(function (c, i) { wqtClimb(G, x + c[0], y, z + c[1] + (c[1] > 0 ? 0.2 : -0.2), c[1] > 0 ? 0 : Math.PI, 1.0, 5, lite ? 20 : 60, 7980 + i, 0xF8F0D0); });
for (var k = 0; k < 9; k++) {
var lx2 = x - 6 + k * 1.5, lan = new THREE.Mesh(wqwGeo("wqaLan", null), wqwGlowM(0xFFB050, 1));
lan.position.set(lx2, y + 4.0, z + (k % 2 ? 1.2 : -1.2));
G.add(lan);
wqxGlow(L, lx2, y + 4.0, z + (k % 2 ? 1.2 : -1.2), 0xFFB050, 2.2);
}
var cd = [];
for (k = 0; k < 8; k++)
cd.push({ x: x - 3.8 + k * 1.1, y: y + 0.84, z: z });
wqxCandles(G, cd, L, { hs: 0.3 });
var pl = new THREE.PointLight(0xFFB060, 0.9, 20);
pl.position.set(x, y + 3.4, z);
G.add(pl);
})();
(function () {
var A = wqwInAt("summer", 0), g = new THREE.Group();
g.position.set(A.x, WQW_IN_Y, A.z);
G.add(g);
var L2 = wqxGlowStart(), gauze = wqwLam(0xFFF4E0, { op: 0.55 }), silk = wqwS("b:velvet", 0xD8782A, 1);
[-4, 0, 4].forEach(function (x) { [-1, 1].forEach(function (s) { wqxDrape(g, x + s * 1.5, 3.0, -4.75, 0.9, 3.0, 0, gauze, { depth: 0.08 }); }); wqxShaft(g, x, 2.6, -4.8, 4.2, 1.0, 1.8, 0xFFE8B0, 0.08, x + 0.4, 0, -1.6); wqxPool(g, x + 0.4, 0.02, -1.8, 1.4, 0xFFE0A0, 0.16); });
[[-6.4, 0], [6.4, 0]].forEach(function (p) { wqwBox(g, 0.9, 0.45, 3.2, silk, p[0], 0, p[1]); for (var k = 0; k < 3; k++) {
var cu = new THREE.Mesh(wqwGeo("wqtCush", function () { var c = new THREE.SphereGeometry(0.3, 10, 6); c.scale(1, 0.5, 1); return c; }), wqwS("b:velvet", [0xC83A1A, 0xE8A030, 0x8A2A5A][k], 1));
cu.position.set(p[0], 0.6, p[1] - 1 + k);
g.add(cu);
} });
[-4.8].forEach(function (bx) { [-1, 1].forEach(function (s) { [-1, 1].forEach(function (t) { wqwCyl(g, 0.05, 0.05, 3.2, wqxGilt(), bx + s * 1.6, 0, -2.6 + t * 1.2, 8); }); }); wqxDrape(g, bx, 3.2, -1.3, 3.4, 2.6, 0, gauze, { depth: 0.1 }); wqwBox(g, 3.4, 0.06, 2.6, gauze, bx, 3.2, -2.6); });
var bowl = new THREE.Mesh(wqwGeo("bowl", function () { return new THREE.CylinderGeometry(0.18, 0.12, 0.1, 14); }), wqwShine(0xE8C060, 0.3, 0.8));
bowl.position.set(2, 0.62, 2);
g.add(bowl);
wqwCyl(g, 0.4, 0.4, 0.6, marble, 2, 0, 2, 16);
for (var k = 0; k < 7; k++) {
var f = new THREE.Mesh(wqwGeo("fruit" + (k % 3), function () { return new THREE.SphereGeometry(0.15, 8, 6); }), wqwLam([0xF8903A, 0x6A1A5A, 0xD8201A][k % 3]));
f.scale.setScalar(0.5);
f.position.set(2 + (R() - 0.5) * 0.2, 0.72, 2 + (R() - 0.5) * 0.2);
g.add(f);
}
wqxGlowDone(g, L2, 1.0);
})();
wqxGlowDone(G, L, 1.2);
};
})();
function wquHouse(G, x, z, ry, y, k, L, lite) { return __ZC(502, 120, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.crater.build;
WQW_SCN.crater.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqdCraterH, R = wRand(7991), L = wqxGlowStart();
var C = { x: 20, z: 225 };
var old = [[-10, 170], [30, 160], [60, 190], [-40, 205], [0, 235], [45, 240], [80, 230], [-60, 245], [20, 280], [-20, 300]];
function free(x, z) {
if (Math.hypot(x - C.x, z - C.z) < 16)
return false;
if (Math.hypot(x - 128, z - 322) < 26)
return false;
if (Math.abs(x - 20) < 6 && z > 150)
return false;
for (var i = 0; i < old.length; i++)
if (Math.hypot(x - old[i][0], z - old[i][1]) < 13)
return false;
for (i = 0; i < hs.length; i++)
if (Math.hypot(x - hs[i][0], z - hs[i][1]) < 12.5)
return false;
return true;
}
var hs = [], tries = 0, want = lite ? 16 : 40;
while (hs.length < want && tries < 4000) {
tries++;
var a = R() * Math.PI * 2, r = 18 + Math.pow(R(), 0.8) * 120, x = C.x + Math.cos(a) * r * 1.15, z = C.z + Math.sin(a) * r * 0.9;
if (z < 150)
continue;
if (!free(x, z))
continue;
hs.push([x, z, Math.atan2(C.x - x, C.z - z) + (R() - 0.5) * 0.4]);
}
hs.forEach(function (q, k) { wquHouse(G, q[0], q[1], q[2], H(q[0], q[1]) - 0.15, k, L, lite); });
[[[C.x, C.z], [-30, 250], [-70, 270], [-110, 280]], [[C.x, C.z], [60, 250], [100, 280], [128, 320]], [[C.x, C.z], [-20, 200], [-70, 190], [-120, 180]], [[C.x, C.z], [70, 205], [120, 190]], [[C.x, C.z], [10, 280], [0, 330]]].forEach(function (p) { wqwStrip(G, p, 3, function (x, z) { return H(x, z) + 0.05; }, wqwS("snow", 0xC8CCD4, 3), 0.05); });
(function () {
var y = H(C.x, C.z), st = wqwMat("stone"), oak = wqwMat("oak");
var sq = new THREE.Mesh(new THREE.CircleGeometry(14, 40), wqwS("b:ashlar", 0x9A948C, 3));
sq.rotation.x = -Math.PI / 2;
sq.position.set(C.x, y + 0.06, C.z);
G.add(sq);
wqwCyl(G, 1.3, 1.4, 1.0, st, C.x, y, C.z, 16);
wqwRound(C.x, C.z, 1.5, y - 1, y + 1.2);
[-1, 1].forEach(function (s) { wqwBox(G, 0.2, 2.6, 0.2, oak, C.x + s * 1.2, y + 1, C.z); });
var wr = new THREE.Mesh(new THREE.ConeGeometry(1.9, 1.0, 4), wqwS("snow", 0xF6F8FC, 3));
wr.rotation.y = Math.PI / 4;
wr.position.set(C.x, y + 4.0, C.z);
G.add(wr);
wqwCyl(G, 0.08, 0.08, 2.4, oak, C.x, y + 3.0, C.z, 6).rotation.z = Math.PI / 2;
[[-8, 4, 0.4], [8, -5, -0.6]].forEach(function (t) { var g = new THREE.Group(); g.position.set(C.x + t[0], y, C.z + t[1]); g.rotation.y = t[2]; G.add(g); wqwBox(g, 2.6, 0.7, 0.8, oak, 0, 0, 0); var ice = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), wqiIce(0xCFE6F9, { op: 0.85 })); ice.rotation.x = -Math.PI / 2; ice.position.y = 0.62; g.add(ice); wqwRound(C.x + t[0], C.z + t[1], 1.4, y - 1, y + 0.8); });
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2 + 0.2, lx = C.x + Math.cos(a) * 13, lz = C.z + Math.sin(a) * 13;
wqxLanternPost(G, lx, H(lx, lz), lz, L, 3.2);
}
var cart = new THREE.Group();
cart.position.set(C.x - 6, y, C.z - 8);
cart.rotation.y = 0.8;
G.add(cart);
wqwBox(cart, 2.4, 0.5, 1.4, oak, 0, 0.7, 0);
[-1, 1].forEach(function (s) { var wh = wqwCyl(cart, 0.5, 0.5, 0.1, wqwMat("darkbark"), -0.6, 0.5, s * 0.78, 14); wh.rotation.x = Math.PI / 2; });
wqwBox(cart, 2.4, 0.3, 1.4, wqwS("snow", 0xF6F8FC, 3), 0, 1.2, 0);
wqwRound(C.x - 6, C.z - 8, 1.4, y - 1, y + 1.4);
for (k = 0; k < 5; k++)
wqwCyl(G, 0.36, 0.32, 0.9, wqwMat("oak"), C.x + 9 + (k % 2) * 0.8, y, C.z + 6 + k * 0.6, 10);
})();
var drift = wqwScatter(7992, lite ? 60 : 200, -120, 140, 170, 360, function (x, z) { return free(x, z) || true; }, H, 0.8, 2.0);
wqwInst(G, wqwGeo("wquDrift", function () { var c = new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1.8, 0.35, 1); return c; }), wqwS("snow", 0xF6F8FC, 3), drift.map(function (t) { t.y -= 0.05; return t; }), {});
wqxTrees(G, "pine", wqwScatter(7993, lite ? 60 : 200, -180, 100, 220, 420, function (x, z) { var r = Math.hypot(x - C.x, z - C.z); return (r > 120 || Math.hypot(x - 128, z - 322) < 24 && Math.hypot(x - 128, z - 322) > 8) && free(x, z); }, H, 0.8, 1.4), [0x2A4A3A, 0x3A5A44]);
wqcMotes(G, lite ? 80 : 240, C.x, C.z, 120, 1, 24, 0xFFFFFF);
wqxGlowDone(G, L, 1.2);
};
})();
(function () {
var b0 = WQW_SCN.valley.build;
WQW_SCN.valley.build = function (G) {
b0(G);
var lite = wqwLite(), H = wqtValleyH, R = wRand(7997), L = wqxGlowStart();
var mid = function (z) { return -Math.sin(z * 0.01) * 30; }, half = function (z) { return 60 + Math.max(0, z) * 0.12; };
var deep = wqiIce(0x1A3458, { kind: "deep", e: 0x050F22, rep: 0.04 }), pale = wqiIce(0x8AB8E0, { e: 0x163A60 }), glass = wqiIce(0x0E1E36, { kind: "deep", op: 0.92, e: 0x02060E });
for (var z = -160; z < 500; z += lite ? 70 : 34) {
[-1, 1].forEach(function (s) {
if (R() < 0.3)
return;
var x = mid(z) + s * (half(z) + 4 + R() * 6), y = H(x, z) - 2, hgt = 26 + R() * 30, g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
for (var k = 0; k < (lite ? 4 : 9); k++) {
var r = 0.6 + R() * 1.4, c = wqwCyl(g, r * 0.35, r, hgt * (0.6 + R() * 0.4), k % 3 ? pale : deep, (R() - 0.5) * 6, 0, (R() - 0.5) * 3, 9);
}
wqxGlow(L, x - s * 3, y + 6, z, 0x5AA0E8, 7);
});
}
for (z = -120; z < 460; z += lite ? 160 : 90) {
[-1, 1].forEach(function (s) {
var x = mid(z) + s * (half(z) + 2), y = H(x, z), m = new THREE.Mesh(wqwGeo("wqvCave", function () { var c = new THREE.CircleGeometry(1, 24, 0, Math.PI); return c; }), wqwGlowM(0x2A6AB8, 0.75));
m.scale.set(5, 7, 1);
m.position.set(x, y - 0.5, z);
m.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2;
G.add(m);
var arch = new THREE.Mesh(wqwGeo("wqvArch", function () { return new THREE.TorusGeometry(1, 0.18, 8, 20, Math.PI); }), deep);
arch.scale.set(5.4, 7.4, 5);
arch.position.set(x - s * 0.2, y - 0.5, z);
arch.rotation.y = m.rotation.y;
G.add(arch);
wqxGlow(L, x - s * 2, y + 2, z, 0x3A8AE8, 8);
});
}
var ser = wqwScatter(7998, lite ? 40 : 130, -140, -180, 140, 500, function (x, z) { var d = Math.abs(x - mid(z)); return d < half(z) - 6 && Math.hypot(x - 14, z + 30) > 16 && Math.abs(x - mid(z)) > 10; }, H, 0.8, 2.6);
wqwInst(G, wqwGeo("wqvSerac", function () { var g = new THREE.DodecahedronGeometry(1.4, 0), p = g.attributes.position, r2 = wRand(61); for (var i = 0; i < p.count; i++) {
p.setY(i, p.getY(i) * (1.2 + r2() * 0.6));
} g.computeVertexNormals(); g.translate(0, 0.8, 0); return g; }), pale, ser.filter(function (t, i) { return i % 2; }), {});
wqwInst(G, wqwGeo("wqvSerac", null), deep, ser.filter(function (t, i) { return !(i % 2); }), {});
ser.forEach(function (t) { wqwRound(t.x, t.z, 1.3 * t.s, t.y - 1, t.y + 3 * t.s); });
var sas = wqwScatter(7999, lite ? 120 : 420, -140, -200, 140, 520, function (x, z) { return Math.abs(x - mid(z)) < half(z) - 4; }, H, 0.6, 1.6).map(function (t) { t.ry = 0.3 + (R() - 0.5) * 0.3; t.y -= 0.15; return t; });
wqwInst(G, wqwGeo("wqvSastrugi", function () { var c = new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(3.2, 0.45, 0.7); return c; }), wqwS("snow", 0xE0ECF8, 3), sas, {});
for (var i = 0; i < (lite ? 10 : 26); i++) {
var gz = -160 + R() * 640, gx = mid(gz) + (R() - 0.5) * 80;
var p = new THREE.Mesh(new THREE.CircleGeometry(4 + R() * 9, 28), glass);
p.rotation.x = -Math.PI / 2;
p.scale.y = 0.5 + R() * 0.6;
p.position.set(gx, H(gx, gz) + 0.04, gz);
G.add(p);
}
var fr = [];
for (z = -200; z < 520; z += lite ? 3 : 1.4) {
[-1, 1].forEach(function (s) { var x = mid(z) + s * (half(z) + 14), y = H(x, z) - 0.5; fr.push({ x: x, y: y, z: z, s: 1 + R() * 3 }); });
}
wqwInst(G, wqwGeo("wquIcicle", function () { var c = new THREE.ConeGeometry(0.05, 0.5, 5); c.rotateX(Math.PI); c.translate(0, -0.25, 0); return c; }), pale, fr, {});
var aur = new THREE.Mesh(new THREE.PlaneGeometry(900, 90, 1, 1), wqwM("wqvAurora", function () {
var t = wqwCanvas("wqvAurT", 512, 128, function (c, W, Hh) { for (var x = 0; x < W; x++) {
var a = 0.5 + 0.5 * Math.sin(x * 0.05) * Math.sin(x * 0.013 + 1);
var g = c.createLinearGradient(0, 0, 0, Hh);
g.addColorStop(0, "rgba(120,80,220,0)");
g.addColorStop(0.35, "rgba(120,90,230," + (0.35 * a) + ")");
g.addColorStop(0.75, "rgba(60,230,170," + (0.6 * a) + ")");
g.addColorStop(1, "rgba(60,230,170,0)");
c.fillStyle = g;
c.fillRect(x, 0, 1, Hh);
} });
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false });
m.userData.noPhoto = 1;
return m;
}));
aur.position.set(0, 190, 150);
aur.rotation.x = -0.35;
G.add(aur);
WQW.spin = WQW.spin || [];
for (z = -120; z < 480; z += lite ? 140 : 70)
wqxShaft(G, mid(z) + 20, 90, z - 20, 95, 1.2, 9, 0x7AB0F0, lite ? 0.04 : 0.06, mid(z) - 6, H(mid(z), z), z + 10);
(function () {
var x = 14, z = -30, y = H(x, z);
var spikes = [];
for (var k = 0; k < (lite ? 40 : 120); k++) {
var a = R() * Math.PI * 2, r = 1.2 + Math.pow(R(), 0.6) * 9;
spikes.push({ x: x + Math.cos(a) * r, y: H(x + Math.cos(a) * r, z + Math.sin(a) * r), z: z + Math.sin(a) * r, s: 0.3 + (1 - r / 10) * 1.4, ry: R() * 6, rz: -Math.cos(a) * 0.5, rx: Math.sin(a) * 0.5 });
}
wqwInst(G, wqwGeo("wqvSpike", function () { var c = new THREE.ConeGeometry(0.08, 1.0, 4); c.translate(0, 0.5, 0); return c; }), pale, spikes, {});
for (k = 0; k < 16; k++)
wqxGlow(L, x + (R() - 0.5) * 3, y + 0.2 + R() * 0.8, z + (R() - 0.5) * 3, k % 3 ? 0xC8D8FF : 0xE85A6A, 0.5 + R() * 0.5);
var cl = new THREE.PointLight(0x9AB8FF, 0.8, 24);
cl.position.set(x, y + 3, z);
G.add(cl);
})();
wqxGlowDone(G, L, 1.4);
};
})();
function wqzFill(G, H, o) { return __ZC(502, 121, this, arguments, new.target); }
function wqzCarpetTex(cols, seed) { return __ZC(502, 122, this, arguments, new.target); }
function wqzCarpet(G, H, o) { return __ZC(502, 123, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.spring.build;
WQW_SCN.spring.build = function (G) {
b0(G);
var H = wqrSpringH;
var clear = function (x, z) { return Math.abs(x - (Math.sin(z * 0.02) * 6 - 6)) > 5 && Math.hypot(x, z + 120) > 24 && Math.hypot(x + 40, z - 60) > 16 && Math.hypot(x - 40, z + 20) > 9 && Math.hypot(x, z - 370) > 14; };
wqzFill(G, H, { seed: 8101, x0: -560, z0: -560, x1: 560, z1: 420, keep: clear,
grass: { n: 26000, cols: [0x9ACC70, 0xB8D880, 0x7AB850] },
flowers: { drifts: 520, per: 60, cols: ["#F8E040", "#9A6AE0", "#FFFFFF", "#F4A8C8", "#F8F0A0", "#C8A8F0", "#FF7AA0"] },
shrubs: { n: 500, col: 0x6AA84A },
trees: [{ kind: "maple", groves: 60, per: 9, r: 26, cols: [0xF8D8E8, 0xFFFFFF, 0xF4B8D0], s0: 0.7, s1: 1.2 },
{ kind: "oak", groves: 30, per: 7, r: 24, cols: [0xFFFFFF, 0xF8E8F0], s0: 0.6, s1: 0.9, fruit: 0xD8301A },
{ kind: "birch", groves: 40, per: 8, r: 20, cols: [0x9AD060, 0xB8E070] },
{ kind: "oak", groves: 24, per: 6, r: 30, cols: [0x5A9A3A, 0x7AB850], s0: 1.0, s1: 1.6 }] });
wqzCarpet(G, H, { seed: 8111, n: 1400, x0: -520, z0: -520, x1: 520, z1: 400, r0: 5, r1: 14, keep: clear, sets: [["#F8E040", "#FFFFFF", "#F8F0A0"], ["#9A6AE0", "#C8A8F0", "#FFFFFF"], ["#F4A8C8", "#FF7AA0", "#FFFFFF"], ["#F8E040", "#9A6AE0", "#FFFFFF", "#F4A8C8"]] });
};
})();
(function () {
var b0 = WQW_SCN.summer.build;
WQW_SCN.summer.build = function (G) {
b0(G);
var H = wqjSummerH, P = WQJ_PAL;
var clear = function (x, z) { return Math.abs(x) > 9 && Math.abs(x - P.x) + Math.abs(z - P.z) > 80 && Math.hypot(x - 96, z + 10) > 18 && Math.hypot(x + 96, z + 10) > 18 && Math.hypot(x, z - 384) > 14; };
wqzFill(G, H, { seed: 8201, x0: -620, z0: -560, x1: 560, z1: 420, keep: clear, maxY: 60,
grass: { n: 24000, cols: [0xA8C050, 0x8AB040, 0xC0C860] },
flowers: { drifts: 460, per: 60, cols: ["#F02A1A", "#F8C020", "#F87A1A", "#FFFFFF", "#8A4AD8", "#F050A0"] },
shrubs: { n: 400, col: 0x5A8A3A }, rocks: { n: 120, mat: wqwS("b:limestone", 0xE8DCC0, 1.6) },
trees: [{ kind: "oak", groves: 50, per: 9, r: 28, cols: [0x8A9A6A, 0xA0A880], s0: 0.6, s1: 0.9 },
{ kind: "pine", groves: 36, per: 6, r: 20, cols: [0x2A4A2A, 0x3A5A30], s0: 1.0, s1: 1.6 },
{ kind: "maple", groves: 40, per: 8, r: 24, cols: [0x4A8A2A, 0x5A9A30], s0: 0.7, s1: 1.0, fruit: 0xF8903A },
{ kind: "maple", groves: 30, per: 8, r: 24, cols: [0x3A7A22, 0x4A8A2A], s0: 0.7, s1: 1.0, fruit: 0x6A1A5A }] });
wqzCarpet(G, H, { seed: 8211, n: 1100, x0: -560, z0: -520, x1: 520, z1: 400, r0: 6, r1: 16, keep: clear, sets: [["#E8201A", "#F04A2A", "#F8C020"], ["#F8C020", "#F87A1A", "#FFFFFF"], ["#8A4AD8", "#A87AE8", "#F050A0"]] });
};
})();
(function () {
var b0 = WQW_SCN.autumn.build;
WQW_SCN.autumn.build = function (G) {
b0(G);
var H = wqrAutumnH;
var clear = function (x, z) { return Math.abs(x - wqaPathX(z)) > 7 && Math.hypot(x, z - 60) > 26 && Math.hypot(x - WQL.x, z - WQL.z) > 26 && Math.hypot(x, z - 360) > 14 && Math.hypot(x - 160, z + 40) > 14 && Math.hypot(x - (WQL.x + Math.sin(WQL.ry) * 15), z - (WQL.z + Math.cos(WQL.ry) * 15)) > 16; };
wqzFill(G, H, { seed: 8301, x0: -600, z0: -600, x1: 600, z1: 440, keep: clear,
grass: { n: 30000, cols: [0xB8862A, 0xA86A20, 0x8A7A30] },
flowers: { drifts: 200, per: 40, cols: ["#C8301A", "#E8901A", "#F0C040"] },
shrubs: { n: 600, col: 0x9A3A12 }, rocks: { n: 160, mat: wqwS("b:ashlar", 0x8A7A5A, 1.6) },
trees: [{ kind: "maple", groves: 70, per: 10, r: 30, cols: [0xD8381A, 0xF0901A, 0xB8200E, 0xE8B030], s0: 0.9, s1: 1.6 },
{ kind: "oak", groves: 60, per: 9, r: 30, cols: [0xC8801A, 0xA85A14, 0xD8A030], s0: 1.0, s1: 1.7 },
{ kind: "birch", groves: 30, per: 8, r: 20, cols: [0xF0C030, 0xE8A820] }] });
wqzCarpet(G, H, { seed: 8311, n: 1300, x0: -560, z0: -560, x1: 560, z1: 420, r0: 5, r1: 14, keep: function (x, z) { return Math.abs(x - wqaPathX(z)) > 3; }, sets: [["#C8401A", "#E8A028", "#8A2A10"], ["#D87A28", "#F0C040", "#B85A14"]] });
};
})();
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var H = wqiPalaceH;
wqzFill(G, H, { seed: 8401, x0: -900, z0: -300, x1: 900, z1: 1060, maxY: 140, keep: function (x, z) { return Math.hypot(x, z) > 280 && Math.abs(x + Math.sin(z * 0.004) * 30 * wqwSmooth(150, 400, z)) > 16 && Math.abs(x - 23) > 12; },
shrubs: { n: 300, col: 0x3A5A44 }, rocks: { n: 300, mat: wqwS("b:slate", 0x6A6E78, 2) },
trees: [{ kind: "pine", groves: 80, per: 12, r: 34, cols: [0x2A4A3A, 0x3A5A44, 0xDDE8F0], s0: 0.9, s1: 1.8 }, { kind: "birch", groves: 20, per: 8, r: 20, cols: [0xDDE8F0] }] });
};
})();
(function () {
var b0 = WQW_SCN.border.build;
WQW_SCN.border.build = function (G) {
b0(G);
var H = wqtBorderH;
var clear = function (x, z) { return Math.abs(x + 40) > 7 && Math.hypot(x + 18, z - 96) > 10 && Math.hypot(x - 14, z - 10) > 14 && Math.abs(z - 20) > 6; };
wqzFill(G, H, { seed: 8501, x0: 10, z0: -480, x1: 480, z1: 480, keep: function (x, z) { return clear(x, z) && wqtSnowK(x, z) < 0.2; },
grass: { n: 24000, cols: [0xB8862A, 0x9A7A30] }, shrubs: { n: 700, col: 0x9A3A12 },
trees: [{ kind: "maple", groves: 110, per: 11, r: 26, cols: [0xD8381A, 0xF0901A, 0xB8200E] }, { kind: "oak", groves: 80, per: 9, r: 26, cols: [0xC8801A, 0xA85A14, 0xD8A030] }] });
wqzCarpet(G, H, { seed: 8511, n: 1800, x0: 0, z0: -480, x1: 480, z1: 480, r0: 5, r1: 14, keep: function (x, z) { return wqtSnowK(x, z) < 0.3; }, sets: [["#C8401A", "#E8A028", "#8A2A10"], ["#D87A28", "#F0C040", "#B85A14"]] });
wqzFill(G, H, { seed: 8521, x0: -480, z0: -480, x1: -10, z1: 480, keep: function (x, z) { return clear(x, z) && wqtSnowK(x, z) > 0.85; }, rocks: { n: 120, mat: wqwS("b:slate", 0x6A6E78, 2) },
trees: [{ kind: "pine", groves: 110, per: 11, r: 26, cols: [0x2A4A3A, 0xDDE8F0, 0x3A5A44] }, { kind: "birch", groves: 50, per: 8, r: 20, cols: [0xE8EEF4] }] });
};
})();
(function () {
var b0 = WQW_SCN.crater.build;
WQW_SCN.crater.build = function (G) {
b0(G);
var H = wqdCraterH;
wqzFill(G, H, { seed: 8601, x0: -680, z0: -680, x1: 680, z1: 680, maxY: 120, keep: function (x, z) { return Math.hypot(x, z) > 160 && Math.hypot(x - 20, z - 225) > 150 && Math.hypot(x - 128, z - 322) > 20 && Math.abs(x + 30 * Math.min(1, Math.max(0, -z / 260))) > 10; },
rocks: { n: 200, mat: wqwS("b:slate", 0x6A6E78, 2) },
trees: [{ kind: "pine", groves: 170, per: 12, r: 34, cols: [0x2A4A3A, 0x3A5A44, 0xDDE8F0], s0: 0.9, s1: 1.7 }, { kind: "birch", groves: 24, per: 8, r: 20, cols: [0xDDE8F0] }] });
};
})();
(function () {
var b0 = WQW_SCN.coast.build;
WQW_SCN.coast.build = function (G) {
b0(G);
var H = wqfCoastH;
var land = function (x, z) { return z > -60 + Math.sin(x * 0.006) * 40 && Math.hypot(x + 340, z - 300) > 120 && Math.hypot(x - 240, z + 60) > 20 && Math.hypot(x - 200, z - 120) > 12; };
wqzFill(G, H, { seed: 8701, x0: -860, z0: -80, x1: 860, z1: 860, maxY: 120, keep: land,
grass: { n: 40000, cols: [0xA8A070, 0x8A8A60, 0xB8A878] }, shrubs: { n: 1400, col: 0x5A5A3A }, rocks: { n: 300, mat: wqwS("b:slate", 0x6A6E74, 3) },
trees: [{ kind: "pine", groves: 90, per: 9, r: 22, cols: [0x2A4A3A, 0xDDE8F0], s0: 0.5, s1: 0.9 }] });
wqzCarpet(G, H, { seed: 8711, n: 2400, x0: -860, z0: -80, x1: 860, z1: 860, r0: 5, r1: 14, keep: land, sets: [["#8A4A7A", "#A85A8A", "#6A5A3A"], ["#B8582A", "#8A6A3A", "#C8B890"]] });
};
})();
(function () {
var b0 = WQW_SCN.south.build;
WQW_SCN.south.build = function (G) {
b0(G);
var H = wqeSouthH;
var clear = function (x, z) { return Math.hypot(x + 140, z + 40) > 80 && Math.hypot(x + 200, z - 300) > 14 && Math.hypot(x - 320, z - 120) > 14; };
wqzFill(G, H, { seed: 8801, x0: -700, z0: -500, x1: 700, z1: 500, maxY: 120, keep: clear,
grass: { n: 40000, cols: [0x9AB060, 0xB8B870, 0x8AA050] }, shrubs: { n: 900, col: 0x4A7A3A }, rocks: { n: 120, mat: wqwS("b:ashlar", 0x9A948C, 2) },
flowers: { drifts: 200, per: 40, cols: ["#F8E040", "#FFFFFF", "#8A6AE0", "#E83A3A"] },
trees: [{ kind: "oak", groves: 100, per: 9, r: 28, cols: [0x6A8A3A, 0x8A9A4A, 0xC8A040] }, { kind: "birch", groves: 70, per: 8, r: 20, cols: [0xC8B040, 0x9AB050] }] });
wqzCarpet(G, H, { seed: 8811, n: 1600, x0: -700, z0: -500, x1: 700, z1: 500, r0: 5, r1: 14, keep: clear, sets: [["#F8E040", "#FFFFFF", "#8A6AE0"], ["#E83A3A", "#F8E040", "#FFFFFF"]] });
};
})();
var WQW_ROOMS = [];
function wqwRoom(sc, x0, x1, z0, z1, env) { WQW_ROOMS.push({ sc: sc, x0: x0, x1: x1, z0: z0, z1: z1, env: env || "indoor" }); }
function wqwRoomAt(x, z) { for (var i = 0; i < WQW_ROOMS.length; i++) {
var R = WQW_ROOMS[i];
if (R.sc === WQW.sc && x > R.x0 && x < R.x1 && z > R.z0 && z < R.z1)
return R;
} return null; }
function gS0(k) { return WQW_SC[k] || {}; }
function wqwEnvNow() { return __ZC(502, 124, this, arguments, new.target); }
function wqwBlockL(x, z, feet) { return __ZC(502, 125, this, arguments, new.target); }
function wqwPlaceName(L) { var best = null, bd = 1e9; for (var k in WQW_AT) {
var A = WQW_AT[k];
if (A.sc !== WQW.sc)
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A;
}
} return best && bd < 70 ? best.name : wqwSc().name; }
function wqwTick(dt) { return __ZC(502, 126, this, arguments, new.target); }
function wqwBuild(G) { WQW.G = G; WQW.lite = wqwLite(); WQW.built = true; }
if (typeof worldDef === "function")
worldDef(WQW_KEY, {
base: WQW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return wqwEnvNow(); },
build: function (G) { wqwBuild(G); },
enter: function (opt) { return __ZC(502, 127, this, arguments, new.target); },
leave: function () { WQW.ride = null; WQW.moving = false; if (WQW.veil)
WQW.veil.style.opacity = "0"; if (typeof wqbLeave === "function")
try {
wqbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = wqwSc(); return wqwGround(x - S.x, z, feet); },
block: function (x, z, feet) { var S = wqwSc(); return wqwBlockL(x - S.x, z, feet); },
tick: function (dt) { wqwTick(dt); },
back: function () { var D = WQW_SCN[WQW.sc]; wqwGo(D && D.start ? { sc: WQW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "gates"); }
});
function wqwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(WQW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(WQW_KEY) < 0)
WLG.keys.push(WQW_KEY);
function wqwForget() { return __ZC(502, 128, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === WQW_KEY)
wqwForget(); return r; }; })();
(function () { var d0 = wqwSceneDrop; wqwSceneDrop = function () { d0.apply(this, arguments); WQW.lights = 0; WQW.ghosts = []; WQW.ships = []; WQW.flappers = []; WQW.bob = []; WQW.spin = []; WQW.sky = null; WQW.branch = null; WQW.alp = null; WQW.moon = null; WQW.curtain = null; WQW_ROOMS.length = 0; }; })();
function wqwFromRoad() { try {
worldCard(null);
}
catch (e) { } return wqwEnter({}); }
var WQB_CH = [];
var WQB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var WQB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function wqbS() { if (!store.wqbook)
store.wqbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.wqbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function wqbLabel(i) { var C = WQB_CH[i]; if (!C)
return ""; return esc((C.n ? C.n + ": " : "") + C.t); }
function wqbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function wqbStep() { var S = wqbS(), C = WQB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function wqbActive() { var S = wqbS(); return !!(S.started && !S.done && WLD.on === WQW_KEY); }
function wqbKey() { var S = wqbS(); return S.done ? "done" : S.ch + "." + S.s; }
function wqbSay(h) { setStatus(h); }
function wqbQ(s) { return wqQ(s); }
function wqbQs() { return wqQs.apply(null, arguments); }
function wqbPos(at) { return __ZC(502, 129, this, arguments, new.target); }
function wqbScName(k) { return (WQW_SC[k] || {}).name || k; }
function wqbWay(P, L) { return __ZC(502, 130, this, arguments, new.target); }
function wqbBeam() { return __ZC(502, 131, this, arguments, new.target); }
function wqbItemMesh(kind) { return __ZC(502, 132, this, arguments, new.target); }
function wqbItemsClear() { WQB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = WQW.spots.indexOf(I.S); if (j >= 0)
WQW.spots.splice(j, 1); }); WQB.items = []; }
function wqbItemAdd(kind, P, name, verb, onTake) { return __ZC(502, 133, this, arguments, new.target); }
var WQB_TUNES = { glade: "assets/sound/stair-of-light.mp3", lab: "assets/poe/toccata.mp3", garden: "assets/kensington/peters-lullaby.mp3", void: "assets/erebos/funeral-march.mp3",
diner: "assets/oz/ragtime-phonograph.mp3", night: "assets/sound/highway-down.mp3", battle: "assets/neverland/mountain-king.mp3", lake: "assets/oz/under-the-lake.mp3",
frost: "assets/oz/glindas-court.mp3", cells: "assets/poe/gymnopedie.mp3", wardens: "assets/oz/hall-of-state.mp3", clan: "assets/poe/moonlight.mp3",
court: "assets/kensington/fairy-ball.mp3", elves: "assets/oz/magic-flower.mp3", dwarves: "assets/oz/nome-anvils.mp3", desert: "assets/oz/over-the-desert.mp3",
swamp: "assets/oz/speckled-alligator.mp3", quarter: "assets/no14/barrel-organ.mp3", festival: "assets/oz/merry-go-round.mp3", sky: "assets/oz/flight-of-birds.mp3",
fire: "assets/oz/dragons-cavern.mp3", mourn: "assets/poe/funeral.mp3", end: "assets/sound/magnificat.mp3" };
function wqbTune(k) { return __ZC(502, 134, this, arguments, new.target); }
function wqbText(fn) { return __ZC(502, 135, this, arguments, new.target); }
function wqbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function wqbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var WQB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>The book's own words, as S. Nightwell wrote them.</div>";
function wqbReadAll(i) { return __ZC(502, 136, this, arguments, new.target); }
function wqbChapterCard() { return __ZC(502, 137, this, arguments, new.target); }
function wqbKeeperBtns(fns) { return __ZC(502, 138, this, arguments, new.target); }
function wqbJump(i) { var S = wqbS(); S.ch = Math.max(0, Math.min(WQB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; wqbSave(); wqbChapterBegin(true); }
function wqbStV(v) { return typeof v === "function" ? v(wqbS().s) : v; }
function wqbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function wqbWorldState() {
var S = wqbS(), C = WQB_CH[S.ch] || {}, st = C.state || {};
WQW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
WQW.envK = wqbStV(st.env) || null;
if (typeof wqwStateApply === "function")
try {
wqwStateApply(st, S.s);
}
catch (e) { }
worldEnv(wqwEnvNow());
}
function wqbChapterBegin(place) { return __ZC(502, 139, this, arguments, new.target); }
function wqbStepBegin() { return __ZC(502, 140, this, arguments, new.target); }
function wqbPuzzleCard(b) { return __ZC(502, 141, this, arguments, new.target); }
function wqbStepDone() { return __ZC(502, 142, this, arguments, new.target); }
function wqbFinish() { return __ZC(502, 143, this, arguments, new.target); }
function wqbCastName(c) { return c.name || (WQW_FOLK[c.k] || {}).name || c.k; }
function wqbCastLive(C) { return !!(C && C.g && C.g.parent); }
function wqbCastAdd(c) { return __ZC(502, 144, this, arguments, new.target); }
function wqbCastHide(key) { var C = WQB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); WQW.talk = WQW.talk.filter(function (T) { return T.p !== C.P; }); WQW.people = WQW.people.filter(function (p) { return p !== C.P; }); delete WQB.cast[key]; }
function wqbCastClear() { for (var k in WQB.cast)
wqbCastHide(k); WQB.cast = {}; }
function wqbCastMove(key, at, ry) { var C = WQB.cast[key]; if (!C)
return; var P = wqbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : wqwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function wqbCastTick() { return __ZC(502, 145, this, arguments, new.target); }
function wqbPopulate() { return __ZC(502, 146, this, arguments, new.target); }
function wqbCastHere(C) { return (C.cast || []).some(function (c) { var P = wqbPos(c.at); return P && P.sc === WQW.sc; }); }
function wqbChapterSc(C) { var P = C && C.start ? wqbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function wqbSceneDrop() { WQB.beam = null; WQB.items = []; WQB.cast = {}; }
function wqbHeard(kind) { WQB.rew[kind] = (WQB.rew[kind] || 0) + 1; }
function wqbNote(kind, title) { wqbHeard(kind); if (title)
wqbHeard("tale:" + title); }
function wqbTalk(T) { return __ZC(502, 147, this, arguments, new.target); }
function wqbSpot(S) { if (!wqbActive() || S.arb)
return; var b = wqbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = wqbKey(); setTimeout(function () { if (wqbKey() === k)
wqbStepDone(); }, b.wait || 400); }
function wqbIdlePrompt() { worldPrompt("❄️ <b>Winter's Heart</b> · <b>press E</b> for the book", wqbOpen); }
function wqbTick(dt, L) { return __ZC(502, 148, this, arguments, new.target); }
function wqbOpen() { return __ZC(502, 149, this, arguments, new.target); }
function wqbBegin() { var S = wqbS(); S.started = 1; wqbSave(); if (WLD.on !== WQW_KEY) {
wqwEnter({});
return;
} wqbChapterBegin(true); }
function wqbStartAt() { var S = wqbS(); if (S.started && !S.done) {
var C = WQB_CH[S.ch], P = C && C.start ? wqbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function wqbEnter(opt) { var S = wqbS(); setTimeout(function () { if (WLD.on !== WQW_KEY)
return; if (S.started && !S.done)
wqbChapterBegin(false);
else {
wqbWorldState();
wqbPopulate();
if (!S.started)
wqbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function wqbLeave() { wqbTune(null); wqbItemsClear(); WQB.cast = {}; WQB.beam = null; WQW.bannerBook = false; }
function wvGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function wvTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function wvSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function wvRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function wvFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function wvGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function wvHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function wvUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function wvPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function wvRead(title, html, btn, o) { return wvPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function wvReadA(title, adult, young, btn, o) { var r = wvRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = wqbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function wvMove(at, msg) { return function () { wqwGo(at, msg || null, wqbPopulate); }; }
function wqbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function wqbCh(C) { return __ZC(502, 150, this, arguments, new.target); }
function wqbStepAt(id) { var C = WQB_CH[wqbS().ch]; return C ? wqbS().s >= wqbIdx(C, id) : false; }
function wvId(id, step) { step.id = id; return step; }
(function () {
var a0 = wqbCastAdd;
wqbCastAdd = function (c) {
var C = a0.apply(this, arguments);
if (C && C.g && !C.g.userData.wqx) {
C.g.userData.wqx = 1;
var F = WQW_FOLK[c.k] || {};
if (c.look)
try {
c.look(C.g);
}
catch (e) { }
else if (F.look && c.dress)
try {
F.look(C.g);
}
catch (e) { }
if (c.ghost || F.ghost) {
wqwGhostly(C.g);
C.g.userData.live = 1;
}
}
return C;
};
})();
function wqwStateApply(st, s) { return __ZC(502, 151, this, arguments, new.target); }
function wqwShow(k, g, def) { g.userData.keep = 1; g.userData.def = !!def; g.visible = !!def; WQW.shows[k] = g; return g; }
(function () { var d0 = wqwSceneDrop; wqwSceneDrop = function () { d0.apply(this, arguments); WQW.stateFns = []; WQW.back = {}; WQW.shows = {}; }; })();
WQW.shows = WQW.shows || {};
(function () {
var t0 = wqwTick;
wqwTick = function (dt) {
t0.apply(this, arguments);
if (WQW.spin)
WQW.spin.forEach(function (g) { if (g.userData.axis === "z")
g.rotation.z += dt * (g.userData.sp || 0.2);
else
g.rotation.y += dt * (g.userData.sp || 0.2); });
};
})();
(function () { var s0 = wqwScene; wqwScene = function (k) { var was = WQW.scBuilt; s0.apply(this, arguments); if (was !== WQW.scBuilt && typeof wqbWorldState === "function")
try {
wqbWorldState();
}
catch (e) { } }; })();
var WQX = { as: null, fight: null, fightT: 0, foes: [], follow: {} };
var WQX_HEROES = {
glacia: { name: "Glacia, the Snow Queen", icon: "❄️", pow: [
{ k: "ice", n: "Lances of ice", d: 9, say: "Ice answers you before you have finished the thought: lances of it, blue-white and sharp." },
{ k: "wall", n: "A wall of ice", d: 4, guard: 1, say: "A wall of ice rises between you and the blow, clear as glass." },
{ k: "storm", n: "The blizzard", d: 13, say: "You open your hands, and the wastes come with you: wind and snow, white and blinding." },
{ k: "thread", n: "Frost-thread", d: 11, from: "thread", say: "Threads of frost spin from your fingers, fine as silk and hard as steel, and bind what they touch." },
{ k: "ember", n: "The ember's warmth", d: 0, heal: 14, from: "ember", say: "The ember in your chest glows, and warmth that is yours alone steadies you." }
] },
bear: { name: "the great white bear", icon: "🐻‍❄️", pow: [
{ k: "claw", n: "Claws", d: 10, say: "You rise on your hind legs and strike, and the claws find their mark." },
{ k: "maul", n: "Your weight", d: 13, say: "Half a ton of bear comes down on it." },
{ k: "roar", n: "Roar", d: 4, guard: 1, say: "You roar, and the sound rolls across the snow like thunder; it falls back." }
] },
kael: { name: "Old Man Winter", icon: "🌨️", pow: [
{ k: "storm", n: "The storm", d: 12, say: "You are winter's hand. The sky darkens at your word and the storm comes down." },
{ k: "staff", n: "The storm staff", d: 10, say: "Your staff strikes, and frost races out across the ground from where it lands." },
{ k: "wall", n: "A wall of wind and snow", d: 4, guard: 1, say: "Wind and snow wrap round you like a cloak." }
] },
iceking: { name: "Kael, the Ice King", icon: "👑", pow: [
{ k: "storm", n: "Winter's hand", d: 15, say: "Every storm you ever brought is in your hand, and you bring it now." },
{ k: "ice", n: "Spears of ice", d: 12, say: "Ice spears up out of the ground at your command." },
{ k: "wall", n: "Winter's shield", d: 5, guard: 1, say: "A shield of hard, clear ice turns the blow." }
] },
cora: { name: "Cora, Queen of Autumn", icon: "🍂", pow: [
{ k: "wind", n: "The autumn wind", d: 10, say: "The wind comes at your call, full of red and gold leaves, sharp as knives." },
{ k: "flame", n: "Harvest fire", d: 12, say: "Fire, the colour of the leaves, kindles in your palm and flies." },
{ k: "veil", n: "A veil of falling leaves", d: 4, guard: 1, say: "Leaves whirl round you and you are hard to find in them." }
] },
talia: { name: "Talia, Queen of Spring", icon: "🌸", pow: [
{ k: "thorn", n: "Thorns", d: 10, say: "Briars burst from the ground at your word, thick with thorns." },
{ k: "vine", n: "Vines", d: 8, say: "Green vines whip up and bind." },
{ k: "heal", n: "New growth", d: 0, heal: 16, say: "Spring runs through you like sap, and the hurt closes." }
] },
alessia: { name: "Alessia, Queen of Summer", icon: "☀️", pow: [
{ k: "sun", n: "Sunfire", d: 13, say: "Summer's full sun blazes out of your hands." },
{ k: "heat", n: "A wall of heat", d: 4, guard: 1, say: "The air shimmers with heat round you; the blow slides off." }
] },
servant: { name: "the palace servant", icon: "🧹", pow: [
{ k: "wit", n: "Your wits", d: 6, say: "You have been overlooked all your life. You are cleverer than they know." }
] }
};
function wqxHas(from) { var S = wqbS(); S.pw = S.pw || {}; return !!S.pw[from]; }
function wqxGain(from, msg) { var S = wqbS(); S.pw = S.pw || {}; if (S.pw[from])
return; S.pw[from] = 1; wqbSave(); if (msg)
wqbSay(msg); }
function wqxAs() { var b = wqbStep(), C = WQB_CH[wqbS().ch]; return (b && b.as) || (C && C.as) || "glacia"; }
function wqxStepBegin(b) { WQX.as = wqxAs(); }
(function () {
var wb = null;
var t0 = wqbTick;
wqbTick = function (dt, L) {
t0.apply(this, arguments);
if (!wqbActive())
return;
var H = WQX_HEROES[wqxAs()];
if (!H)
return;
try {
if (WLD.hud && WLD.hud.innerHTML && WLD.hud.innerHTML.indexOf("data-wqx") < 0)
WLD.hud.innerHTML = "<span data-wqx style='opacity:.85'>" + H.icon + " as <b>" + esc(H.name) + "</b> · </span>" + WLD.hud.innerHTML;
}
catch (e) { }
wqxFollowTick(dt, L);
wqxFoeTick(dt);
};
})();
function wqxFollowTick(dt, L) { return __ZC(502, 152, this, arguments, new.target); }
var WQX_FOES = {
wolf: { name: "An ice wolf", hp: 24, weak: ["claw", "maul", "fire", "flame", "sun", "storm"], strong: ["ice"], hit: "It lunges, jaws first, out of the snow.", make: function (g) { wqxBeast(g, "wolf", 1.15, function () { wqxWolf(g, 1.2, 0xE8EEF4, 0x8AE8FF); }); } },
alpha: { name: "The alpha of the pack", hp: 46, weak: ["claw", "maul", "flame", "sun"], strong: ["ice", "wall"], hit: "The alpha's jaws close on you, and its weight drives you into the snow.", make: function (g) { wqxBeast(g, "wolf", 1.6, function () { wqxWolf(g, 1.7, 0xD8DEE6, 0xFFD86A); }); } },
shade: { name: "A shard-shade", hp: 26, weak: ["ember", "flame", "sun", "heal", "thorn"], strong: ["ice", "storm", "claw"], hit: "Cold dark fingers rake at you, and for a moment you want nothing at all.", make: function (g) { wqxShadowFoe(g); } },
wraith: { name: "A wraith of the mirror", hp: 52, weak: ["ember", "flame", "sun", "thread"], strong: ["ice", "storm", "claw"], hit: "Its touch is the mirror's cold; your heart slows.", make: function (g) { wqxBeast(g, "wraith", 1.2, function () { wqxWraith(g); }); } },
golem: { name: "An ice golem", hp: 30, weak: ["flame", "sun", "maul"], strong: ["ice", "storm", "claw"], hit: "A fist of ice the size of a barrel comes down.", make: function (g) { wqxBeast(g, "golem", 1.1, function () { wqxGolem(g, 0xCFE6F6, true); }); } },
imp: { name: "One of Malakar's imps", hp: 22, weak: ["ice", "storm", "thread", "thorn"], strong: ["flame", "sun"], hit: "Claws and sulphur and a cackle.", make: function (g) { wqxBeast(g, "imp", 1, function () { wqxImp(g); }); } },
demon: { name: "Malakar", hp: 90, weak: ["ember", "thread", "ice", "storm"], strong: ["flame", "sun", "claw"], hit: "Hellfire, and a voice like a forge: you were made for me.", make: function (g) { wqxPersonFoe(g, "wqdemon", 0x6A2A1A); var e = g.userData.person; if (typeof wqfHorns === "function")
wqfHorns(e, 0x1A0A0A); if (typeof wqfEyes === "function")
wqfEyes(e, 0xFF4A1A); g.scale.setScalar(1.25); } },
witch: { name: "Gerda the sorceress", hp: 60, weak: ["ice", "storm", "claw", "maul", "thread"], strong: ["wit"], hit: "Purple fire, and a curse spat through her teeth.", make: function (g) { wqxPersonFoe(g, "wqwitch"); if (typeof wqfGlow === "function")
wqfGlow(g.userData.person, 0x8A4AE8); } }
};
function wqxBeast(g, key, s, plain) { var ok = false; try {
ok = typeof crxOn === "function" && crxOn() && crxHas(key);
}
catch (e) { } if (!ok) {
plain();
return;
} var c = crxBuild(key); c.scale.multiplyScalar(s || 1); g.add(c); g.userData.crxAct = c.userData.crxAct; g.userData.beast = 1; }
function wqxImp(g) { return __ZC(502, 153, this, arguments, new.target); }
function wqxPersonFoe(g, dress, skin) { var p = wqwDressed("foe" + dress + (skin || ""), dress, { sex: "m", skin: skin }); g.add(p); g.userData.person = p; }
function wqxShadowFoe(g) { return __ZC(502, 154, this, arguments, new.target); }
function wqxWolf(g, s, col, eye) { return __ZC(502, 155, this, arguments, new.target); }
function wqxWraith(g) { return __ZC(502, 156, this, arguments, new.target); }
function wqxGolem(g, col, ice) { return __ZC(502, 157, this, arguments, new.target); }
function wqxFoeAdd(kind, P) { return __ZC(502, 158, this, arguments, new.target); }
function wqxFoesClear() { WQX.foes.forEach(function (o) { if (o.g.parent)
o.g.parent.remove(o.g); }); WQX.foes = []; }
function wqxFoeTick(dt) { return __ZC(502, 159, this, arguments, new.target); }
(function () { var d0 = wqwSceneDrop; wqwSceneDrop = function () { d0.apply(this, arguments); WQX.foes = []; WQX.fight = null; }; })();
(function () { var c0 = wqbItemsClear; wqbItemsClear = function () { c0.apply(this, arguments); var b = wqbStep(); if (!b || b.k !== "fight")
wqxFoesClear(); }; })();
function wqxFightCard(b) { return __ZC(502, 160, this, arguments, new.target); }
function wvFight(foe, at, h, o) { return Object.assign({ k: "fight", foe: foe, at: at, h: h }, o || {}); }
function wvAsk(who, h, title, intro, opts, o) { return __ZC(502, 161, this, arguments, new.target); }
function wqxShelf(title) { return __ZC(502, 162, this, arguments, new.target); }
function wqxFinishGift() { var S = wqbS(); if (S.gift)
return; S.gift = 1; wqbSave(); wqbSay("❄️ <b>Winter's Heart.</b> You have finished the book."); }
function wvc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
function wvsrc(ch) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>S. Nightwell, Winter's Heart" + (ch ? ", " + (typeof ch === "number" ? "Chapter " + ch : ch) : "") + "</div>"; }
function wvIn(sc, i, dx, dz) { var A = wqwInAt(sc, i, dx, dz); return { sc: A.sc, x: A.x, z: A.z, y: A.y }; }
function wvP(sc, x, z, y) { return { sc: sc, x: x, z: z, y: y }; }
function wvSpotAt(name, verb, at, h, fn, o) { o = o || {}; return wvSpot(name, h, Object.assign({ at: at, on: function () { var P = wqbPos(at); if (!P || P.sc !== WQW.sc)
return; if (WQW.spots.some(function (s) { return s.name === name; }))
return; wqwSpot(P.x, P.z, o.r || 2, name, verb, fn || function () { }, P.y != null ? P.y : wqwGround(P.x, P.z, 500)); } }, o)); }
function wvMoveRead(title, html, btn, to, msg, o) { return wvRead(title, html, btn, Object.assign({ done: wvMove(to, msg) }, o || {})); }
function wvMoveReadA(title, adult, young, btn, to, msg, o) { return wvReadA(title, adult, young, btn, Object.assign({ done: wvMove(to, msg) }, o || {})); }
function wqfEyes(g, col, s) { s = s || 1; [-1, 1].forEach(function (k) { var e = new THREE.Mesh(wqwGeo("wqeye", function () { return new THREE.SphereGeometry(0.012, 8, 6); }), wqwGlowM(col || 0xFFC040, 1)); e.position.set(k * 0.032 * s, 1.632 * s, 0.098 * s); g.add(e); }); }
function wqfWings(g, col, s) { return __ZC(502, 163, this, arguments, new.target); }
function wqfTendrils(g) { for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, t = new THREE.Mesh(wqwTaper([[Math.cos(a) * 0.14, 1.0, Math.sin(a) * 0.1], [Math.cos(a) * 0.16, 1.25, Math.sin(a) * 0.12], [Math.cos(a) * 0.08, 1.48, Math.sin(a) * 0.1]], [0.006, 0.006, 0.004], 6, 4), wqwGlowM(0x6AC8FF, 0.9));
g.add(t);
} }
function wqfHorns(g, col) { [-1, 1].forEach(function (k) { var h = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.16, 6), wqwLam(col || 0x1A1A1A)); h.position.set(k * 0.06, 1.8, -0.01); h.rotation.z = -k * 0.4; h.rotation.x = -0.3; g.add(h); }); }
function wqfScales(g, col) { var M = wqwShine(col, 0.3, 0.5); for (var i = 0; i < 8; i++) {
var s = new THREE.Mesh(wqwGeo("scaleG", function () { return new THREE.SphereGeometry(0.018, 6, 4); }), M);
s.scale.set(1, 0.5, 0.4);
s.position.set((i % 2 ? 1 : -1) * (0.07 + i * 0.005), 1.55 - i * 0.03, 0.06);
g.add(s);
} }
function wqfGlow(g, col) { var gl = wGlow(col, 0.5, 1.4); gl.position.y = 1.2; g.add(gl); }
function wqfCrown(g, col) { var M = wqwShine(col || 0xD8F0FF, 0.08, 0.2); for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2, h = 0.08 + (i % 3 === 0 ? 0.1 : 0.03);
var c = new THREE.Mesh(new THREE.ConeGeometry(0.012, h, 5), M);
c.position.set(Math.sin(a) * 0.085, 1.74 + h / 2, Math.cos(a) * 0.085 - 0.01);
g.add(c);
} }
function wqfFrost(g) { var gl = wGlow(0xBFE8FF, 0.35, 1.0); gl.position.y = 1.3; g.add(gl); }
Object.assign(WQW_FOLK, {
glacia: { name: "Glacia", dress: "wqqueen", sex: "f", hair: 0xF4F6FA, skin: 0xF2EEF0, persona: "You are Glacia, Winter, eldest of the five sisters of the seasons, the Snow Queen: white-haired, regal, cold of manner, with a shard of a demon's mirror in your chest that hungers for the rest of itself. You hunt the shards and take them with Winter's Kiss, and every one costs a life, and you hate it. Beneath the ice you are lonely and you feel far more than you show. Speak briefly, coolly, with a queen's courtesy.", greet: "You are far from the villages. The wastes do not forgive the lost.", look: function (g) { wqfCrown(g); wqfFrost(g); } },
glaciaw: { name: "Glacia", dress: "wqqueen", sex: "f", hair: 0xF4F6FA, skin: 0xF2EEF0, persona: "You are Glacia, Winter, before the mirror: eldest of the five sisters, lonely, kind, sure no one loves the cold.", greet: "Do you think winter can be beautiful?", look: function (g) { wqfWings(g, 0xE8F4FF); wqfFrost(g); } },
talia: { name: "Talia", dress: "wqspring", sex: "f", hair: 0xC8904A, skin: 0xF4DCC8, persona: "You are Talia, Spring, sister of Glacia: flowers in your hair, green eyes, a dress of petals. You are warm and bright and you forget things, because you cannot hold a dark thought for long. You love Glacia dearly.", greet: "Oh! Visitors! Come in, come in, the kettle's on.", look: function (g) { wqfWings(g, 0xF8C8D8); } },
alessia: { name: "Alessia", dress: "wqsummer", sex: "f", hair: 0xC87A2A, skin: 0xD8A878, persona: "You are Alessia, Summer, Queen of Summer: golden skin, copper-gold hair, amber eyes, a dress of light. Proud, blunt, and deeply loving under it. You planted an ember in Glacia's heart the day the mirror shattered.", greet: "You're Winter. Act like it.", look: function (g) { wqfWings(g, 0xF8D870); wqfGlow(g, 0xFFD870); } },
cora: { name: "Cora", dress: "wqautumn", sex: "f", hair: 0xA82A1A, skin: 0xF0D8C8, persona: "You are Cora, Autumn, goddess of thresholds and transitions, Glacia's closest sister: short crimson hair, a smoky voice, a crimson suit embroidered with gold leaves one moment and something else the next. You run The Threshold, a cabaret. You are wise about endings and rest and letting go.", greet: "Darling. You came. Sit, sit. Let me look at you.", look: function (g) { wqfWings(g, 0xE8782A); } },
marina: { name: "Marina", dress: "wqsea", sex: "f", hair: 0x1A2A3A, skin: 0xE8E0D8, persona: "You are Marina, Water, youngest of the five sisters, who flows between the realms.", greet: "Glacia? You look cold. Colder than usual." },
kael: { name: "Old Man Winter", dress: "wqwinter", sex: "m", hair: 0xF4F4F8, beard: "full", persona: "You are Kael, Old Man Winter, Winter's Hand, Walker of Snows: a primordial force of winter given form, white-haired, glacial-blue eyes, wild and old and not quite human. You bring the cold and the snow each year.", greet: "The north wind brought you here. Mind it does not take you away again.", look: function (g) { wqfFrost(g); } },
fox: { name: "A fox in the snow", crx: "fox", cs: 1, persona: "You are a wild fox. You cannot speak. You answer with a look, a flick of the ears, or by trotting off.", greet: "(The fox stops, one paw raised, and watches you.)" },
hare: { name: "A snow hare", crx: "rabbit", cs: 1, persona: "You are a wild hare. You cannot speak. You answer by freezing, twitching your nose, or bounding away.", greet: "(The hare sits up, ears high, and does not move.)" },
stag: { name: "A stag of the woods", crx: "stag", cs: 1, persona: "You are a wild stag. You cannot speak. You answer with a toss of the antlers or a long look.", greet: "(The stag lifts its head, breath smoking, and watches you.)" },
wolfwild: { name: "A lone wolf", crx: "wolf", cs: 1, persona: "You are a wild wolf of the ice. You cannot speak. You answer with a low growl, a look, or by turning away.", greet: "(The wolf watches you from a distance, then turns its head away.)" },
bear: { name: "The great white bear", crx: "snowbear", cs: 1.9, persona: "You are a great white bear, huge and scarred, with eyes that are not an animal's. You cannot speak. You answer with a nod, a look, a low rumble, or by scratching in the snow.", greet: "(The bear looks at you with eyes that are far too old, far too knowing, for a beast.)" },
iceking: { name: "Kael, the Ice King", dress: "wqfrostlord", sex: "m", hair: 0xF8F8FC, persona: "You are Kael, reborn: the Ice King, once Old Man Winter and a polar bear for a century, now a man again with waterfall-white hair, both eyes whole, a coat of frost. You love Glacia more than anything. Warm, a little dramatic, plain-spoken.", greet: "Just Kael. I've had enough titles for one lifetime.", look: function (g) { wqfFrost(g); } },
gerda: { name: "Gerda", dress: "wqwitch", sex: "f", hair: 0x1A1210, persona: "You are Gerda of the Arcane Tower, a sorceress of red-gold-black magic, dark-haired, in furs and leather; you were Kael's lover once, and you cursed him. Proud, clever, wounded, and in the end just.", greet: "I've been hunting you. Did you know that?", look: function (g) { wqfGlow(g, 0xC84A2A); } },
malakar: { name: "Malakar", dress: "wqdemon", sex: "m", hair: 0x0A0A0A, skin: 0x8A3A2A, persona: "You are Malakar, the demon, Architect of Sorrow, Lord of Reflection, who forged the mirror in the cold fires of the underworld. Patient, cruel, delighted by despair.", greet: "Every mirror wants to be whole. So does every heart.", look: function (g) { wqfHorns(g, 0x1A0A0A); wqfEyes(g, 0xFF4A1A); } },
villager: { name: "A villager", dress: "wqfur", sex: "m", persona: "village", greet: "You shouldn't be out alone. Not with her about." },
villagerf: { name: "A village woman", dress: "wqfurf", sex: "f", persona: "village", greet: "Come in out of the wind, if you're coming." },
youngman: { name: "A young man of the village", dress: "wqfur", sex: "m", hair: 0x5A3A1E, persona: "You are a young man of a village near the foothills who saw a woman fall from the sky into the snow, and ran to help her.", greet: "Are you hurt? I saw you fall. I saw the light." },
mother: { name: "The young mother", dress: "wqfurf", sex: "f", hair: 0x8A5A2A, persona: "You are a young mother in a cottage at the edge of the wastes, singing your daughter to sleep by the fire.", greet: "Hush now. She's only just gone down." },
daughter: { name: "The little girl", dress: "wqfurf", sex: "f", hair: 0x8A5A2A, child: 1, persona: "You are a little girl half asleep by the fire while your mother sings.", greet: "(She yawns.) Sing it again, Mama." },
woodcarver: { name: "The old woodcarver", dress: "wqfur", sex: "m", hair: 0xE8E8E8, beard: "full", persona: "You are an old woodcarver in a lamplit workshop full of carved animals and toys; you are carving a carousel horse for your great-granddaughter, who turns six. You are not afraid of the Snow Queen; you are kind to her.", greet: "Come in, come in. Mind the shavings." },
oldman: { name: "An old man alone", dress: "wqfur", sex: "m", hair: 0xD8D8D8, beard: "full", persona: "You are an old man living alone in the woods, who has long known that one day the Snow Queen would come for you.", greet: "I wondered when you'd come for me." },
servant: { name: "A palace servant", dress: "wqservant", sex: "f", persona: "palace", greet: "Begging your pardon. I'll be out of your way." },
baker: { name: "The baker", dress: "wqtownf", sex: "f", persona: "village", greet: "She was trying to save herself. All that time, she was fighting." },
child: { name: "A child", dress: "wqtown", sex: "m", child: 1, persona: "village", greet: "Is it true? Is it really all true?" },
nymph: { name: "A nymph of the orchard", dress: "wqspring", sex: "f", hair: 0x7A9A3A, persona: "spring", greet: "The apples are always ripe here. Take one!", look: function (g) { wqfWings(g, 0xC8F0A0); } },
summerfolk: { name: "One of Summer's people", dress: "wqgown", sex: "f", hair: 0xC8A040, persona: "summer", greet: "The feast's in the pavilion. You'll want to be early." },
fae: { name: "A fae of The Threshold", dress: "wqcabaret", sex: "f", hair: 0xC8702A, persona: "threshold", greet: "First time at The Threshold? Then the first drink's on the house.", look: function (g) { wqfWings(g, 0xE8A04A); } },
faem: { name: "A fae musician", dress: "wqgala", sex: "m", hair: 0x3A2A1A, persona: "threshold", greet: "(He tunes a fiddle of living wood.) Request?", look: function (g) { wqfWings(g, 0xC8A060); } }
});
Object.assign(WQX_HEROES, {
guest: { name: "a guest at the gates", icon: "🕯️", pow: [{ k: "wit", n: "Listen", d: 1, say: "You listen." }] },
malakar: { name: "Malakar", icon: "👹", pow: [{ k: "flame", n: "Cold fire", d: 12, say: "The cold fire answers its maker." }] }
});
(function () {
var m0 = wqbItemMesh;
wqbItemMesh = function (kind) {
if (kind !== "mirror" && kind !== "shard")
return m0.apply(this, arguments);
var g = new THREE.Group();
if (kind === "mirror") {
var mm = wqtMirror(g, 0, 0, 0, 0, { lie: 1, s: 0.35 });
mm.position.y = 0.1;
}
else {
var s = new THREE.Mesh(new THREE.TetrahedronGeometry(0.06, 0), wqwShine(0xE8F4FF, 0.05, 0.9));
s.position.y = 0.08;
s.scale.set(1, 2.2, 0.4);
g.add(s);
}
var gl = wGlow(0xD8ECFF, 0.55, 0.5);
gl.position.y = 0.3;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
};
})();
(function () {
var p0 = wqbPuzzleCard;
wqbPuzzleCard = function (b) {
if (!b.compel)
return p0.apply(this, arguments);
WQB.puzOpen = 1;
WQB.puzT = performance.now();
var k = wqbKey(), n = 0;
var show = function (extra) {
var fns = {}, h = WQB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + (extra || "") + "</div>";
if (n < b.holds.length) {
h += worldBtn("hold", b.holdBtn || "Hold back", "");
fns.hold = function () { var line = b.holds[n]; n++; show("<p style='margin:6px 0;color:#BFE0FF'>" + line + "</p>"); };
}
else {
h += worldBtn("go", b.btn || "▶ Go on", "");
fns.go = function () { worldCard(null); if (wqbKey() === k)
wqbStepDone(); };
}
worldCard(h, fns);
};
show();
};
})();
function wvCompel(title, html, holds, btn, o) { return Object.assign({ k: "puzzle", compel: 1, title: title, html: html, holds: holds, btn: btn, answers: [], right: 0 }, o || {}); }
function wqpFrozenAt(key) { var C = WQB.cast[key]; if (C && C.g && !C.g.userData.frozen) {
wqiFreeze(C.g);
WQW.talk = WQW.talk.filter(function (T) { return T.p !== C.P; });
C.P.o = {};
} }
Object.assign(WQW_FOLK, {
listener: { name: "A listener", dress: "wqfurf", sex: "f", persona: "village", greet: "Shh. He's about to begin." },
nymphrun: { name: "A nymph, running after you", dress: "wqspring", sex: "f", hair: 0x9AB84A, persona: "spring", greet: "My lady? Are you well? You look pale.", look: function (g) { wqfWings(g, 0xC8F0A0); } },
listenerm: { name: "A listener", dress: "wqfur", sex: "m", persona: "village", greet: "I've heard it told the other way all my life." }
});
WQB_FOLK_AT.palace = [];
var WC0 = wqbCh({ n: "Prologue", t: "Kael's Tale", txt: 0, as: "guest", start: "road", jump: 1, tune: "frost",
words: "Centuries after it all, on the anniversary of their freedom, Kael, the Ice King, tells the true story of the Snow Queen. You have come up the ice road from the North Pole to hear it, at the gates of the Winter Palace where it happened.",
intro: "The ice road to the Winter Palace", keep: ["tale", "Kael's Tale", "📖"],
cast: [wvc("iceking", "gates", { key: "k", ry: Math.PI, oz: -8 }), wvc("glacia", "gates", { key: "g", ry: Math.PI, ox: 6, oz: -12 }),
wvc("child", { sc: "palace", x: -3, z: 156 }, { key: "c1", ry: Math.PI, mute: 1 }), wvc("listener", { sc: "palace", x: 3, z: 158 }, { key: "l1", ry: Math.PI }), wvc("listenerm", { sc: "palace", x: -6, z: 160 }, { key: "l2", ry: Math.PI }), wvc("child", { sc: "palace", x: 1, z: 154 }, { key: "c2", ry: Math.PI, mute: 1 })],
steps: [
{ k: "read" },
wvGo("gates", "Walk up the ice road, between the cairns of ice, to the gates of the Winter Palace", { r: 14, say: "❄️ " + wqQ("I've been told I have a flair for the dramatic.") }),
wvTalk("Kael, the Ice King", "The Ice King stands before the gates, the crowd round him: go and listen", ["👑 Kael, the Ice King", wqQs("I've been told I have a flair for the dramatic.", "My queen—my beloved Glacia—says it's because I spent too many centuries as a force of nature rather than a man, and forces of nature don't do anything by halves.", "She's probably right. She usually is.") + wvsrc("Prologue"), "▶ Listen"]),
wvPuzzle("📖 The one you think you already know", "He looks at the children in the front row. \"You know about the Snow Queen, don't you?\" What does everyone know?", ["The ice witch who stole a boy named Kai, and brave little Gerda who saved him", "A queen who brought summer to the north", "A sorceress who turned a king into a bear"], 0, ["", "Not this one.", "Not yet. That comes later."], { at: "gates", r: 16, yes: "📖 " + wqQ("It's a good story. Simple. Clean. A villain defeated, a hero triumphant, love conquering all.") + " " + wqQ("It's also almost entirely wrong.") }),
wvAsk("Kael, the Ice King", "Ask the Ice King about the true story", "👑 \"That gets your attention, doesn't it?\"", wqQ("The real story is so much stranger, so much more complicated, and so much more beautiful than the tale the world has told itself for the past century."), [
["\"What is the true story?\"", wqQs("It involves not one curse but two, not one magical artifact but a mirror forged in hell itself, not one immortal being but six—four sister goddesses of the seasons, a sorceress, and one very old, very foolish force of winter who didn't understand what love was until it was almost too late.")],
["\"Who are you?\"", wqQs("That would be me, in case you're wondering. My name is Kael. I am the Ice King of Frostspire, husband to Queen Glacia, and once upon a time I was something else entirely. Something ancient and wild and not quite human.", "Old Man Winter, they called me. A primordial force given form and consciousness, tasked with bringing the cold and snow to the world each year. I was also, for a very long time, a polar bear.")],
["\"Then who was the hero?\"", wqQs("That part of the story, at least, they got right. But Gerda wasn't the hero. Glacia wasn't the villain. And the love story everyone remembers? It wasn't even the right one.", "This is the right one. Mine and Glacia's. A tale of how winter learned to love, and how love learned to forgive itself.")]
], { btn: "Look to the queen" }),
wvTalk("Glacia", "He glances up at his queen: go to Glacia", ["❄️ Glacia", wqQs("I glance up at the dais where my queen sits, serene and radiant in her gown of ice and starlight, and she meets my eyes with the smallest smile—the kind only I can read after all our years together. She's given me permission to tell this tale, though it costs her something to have her pain laid bare. But she agrees it's time.", "Time for the truth.") + wvsrc("Prologue"), "▶ Time for the truth"]),
wvRead("📖 Time for the truth", wqQs("Time for you to understand that the Snow Queen never stole anyone. That she was a victim long before she was ever called a villain. That the mirror shard in young Kai's eye was only one piece of a much larger, much more terrible puzzle—and that the real question was never how to save a boy from the Snow Queen, but how to save the Snow Queen herself.", "These are not simple questions. The answers required sacrifice.", "Blood. Death. Transformation.") + wvsrc("Prologue"), "▶ Settle in"),
wvHold("gates", 6, "Settle in with the others at the gates, and listen", { r: 16, say: "🕯️ " + wqQ("So settle in, my friends. Pour another cup of wine. Pull the little ones onto your laps and stoke the fires high, because this is a tale of winter, and winter is never brief.") }),
wvRead("📖 The truth of winter", wqQs("This is a story that spans centuries, that crosses realms, that involves goddesses and demons and magic both beautiful and terrible. This is the story of how the Snow Queen found her heart.", "And how I found mine.", "Let me tell you how it really happened, starting not with Gerda or Kai or even with me, but with five sisters and a mirror that should never have been made. Let me tell you about the day winter itself shattered, and how we spent the next hundred years trying to piece it back together.", "Let me tell you the truth of winter.") + wvsrc("Prologue"), "▶ The tale begins")
] });
var WC1 = wqbCh({ n: "Chapter 1", t: "The Reflection", txt: 1, as: "glacia", start: "borderIn", jump: 1, tune: "glade", keep: ["rabbit", "The rabbit she wept over", "🐇"],
words: "This is how it all began. Five sisters, old when the world was young: Talia, Spring; Alessia, Summer; Cora, Autumn; Marina, Water; and Glacia, Winter, the eldest, who thought she only ever brought death. You are Glacia, walking where autumn meets winter.",
intro: "The boundary woods, where autumn meets winter",
cast: [wvc("cora", "coraWalk", { key: "cora", from: "cora", until: "forge", ry: -1.2 })],
steps: [
{ k: "read" },
wvRead("📖 This is how it all began", wqQs("This is how it all began...", "The sisters were old when the world was young. Not goddesses, exactly—they would have bristled at the word—but something close enough that mortals couldn't tell the difference and good enough for our purposes.", "And then there was Glacia. Winter. The eldest, though she never claimed the authority that should have come with age. The most powerful, though she wielded that power with reluctance. The most necessary, though she could never quite believe it.") + wvsrc("Chapter 1"), "▶ You are Glacia"),
wvGo("borderFrost", "You are Glacia, Winter. Walk on through the woods: everywhere you step, frost spreads", { r: 8, say: "❄️ " + wqQ("She'd been walking through a forest in early autumn—Cora's time, really, but the seasons weren't so rigidly defined back then—and everywhere she stepped, frost spread like a disease.") }),
wvSpotAt("The frozen rabbit", "look at the rabbit", "rabbit", "Something small lies in the frost ahead: go to it", function () { }, { r: 2.4 }),
wvRead("🐇 The rabbit", wqQs("Flowers blackened. Leaves fell. A rabbit, too slow to flee, had frozen solid mid-hop. She'd wept over that rabbit for three days.", "\"I thought I was broken,\" she told me, her voice barely a whisper. \"I thought something had gone wrong when I was made. That I was supposed to be like Talia, bringing life, but instead I only brought death.\"") + wvsrc("Chapter 1"), "▶ Kneel by it"),
wvHold("rabbit", 5, "Kneel by the rabbit a while", { r: 4, say: "❄️ " + wqQ("The tragedy of Glacia was that she never saw herself clearly. She saw only what she took away, never what she gave.") }),
wvPuzzle("☀️ Your sisters", "Your sisters tried to help, in their way. What did Alessia, Queen of Summer, tell you?", ["\"You're Winter. Act like it.\"", "\"Spring always follows winter.\"", "\"You're the pause between breaths.\""], 0, ["", "That was Talia's comfort.", "That was Cora."], { yes: "☀️ " + wqQ("Alessia, in her direct way, told Glacia to take pride in her power, to stop apologizing for what she was. \"You're Winter,\" she'd said, golden and glorious and utterly certain. \"Act like it.\"") }),
wvId("cora", wvGo("borderLine", "Only Cora understood. Go to the boundary, where your realms touch", { r: 8 })),
wvTalk("Cora", "Cora waits among the falling leaves: walk with her", ["🍂 Cora", wqQs("But Glacia didn't want to be Winter. She wanted to be anything else. Only Cora seemed to understand, because Cora also dealt in endings.", "\"You're not death,\" Cora told her once. \"You're rest. You're the pause between breaths. You are a necessity.\"") + wvsrc("Chapter 1"), "▶ Walk together"], { as: "glacia" }),
wvHold("borderFar", 10, "Walk with Cora along the boundary, where leaves fall on one side and snow on the other; you need not talk", { r: 12, say: "🍂 " + wqQ("They didn't always talk. Sometimes they just existed together in comfortable silence, two sisters who understood that not everything needed to be fixed or explained or made better.") }),
wvRead("📖 The centuries pass", wqQs("The sisters saw each other less and less as the centuries passed.", "And Glacia... Glacia retreated into her winter realm and tried to make herself smaller, tried to make her season shorter, tried to be less of what she was.") + wvsrc("Chapter 1"), "▶ Below the world, someone is watching"),
wvId("forge", wvMoveRead("👹 The spaces beneath the world", wqQs("That's when the demon made his move. His name was Malakar: an ancient thing from the spaces beneath the world, from the cracks between realms where darkness pools and festers. He was old and patient and cruel, and he understood desire the way a jeweler understands gems.") + wvsrc("Chapter 1") + "<p>You are Malakar now, in your forge in the deepest pits of Erebos.</p>", "▶ Down into the pit", "forgeIn", "👹 <b>Malakar's cold forge, in the deeps of Erebos</b>", { as: "malakar" })),
wvGo("forgeFire", "Go down among your fires, the fires that burn cold instead of hot", { r: 7, as: "malakar", say: "🔥 " + wqQ("He forged a mirror in the deepest pits of the underworld, in fires that burned cold instead of hot.") }),
wvPuzzle("👹 The making", "What do you make the mirror from?", ["Ice that will never melt and silver that will never tarnish", "Gold and the tears of the gods", "Black glass from the bottom of the sea"], 0, ["", "Not gold. Gold is warm.", "Not that."], { at: "forgeAnvil", r: 6, as: "malakar", yes: "👹 " + wqQ("He made it from ice that would never melt and silver that would never tarnish, and he poured into it every twisted, corrupting enchantment he knew.") }),
wvSpotAt("The mirror, finished", "look into the mirror", "forgeMirror", "Go and look at what you have made", function () { }, { as: "malakar", r: 2.6 }),
wvRead("🪞 The mirror", wqQs("It was beautiful—achingly, impossibly beautiful—with a frame of silver thorns and a surface that reflected not what was, but what the viewer most desperately wanted to see.", "It showed you what you wanted, and in showing you, it made you want it more. It amplified longing until it became obsession. It took natural desire and twisted it into something hungry and desperate and ultimately corrupting.", "The demon left it where Glacia would find it.") + wvsrc("Chapter 1"), "▶ Leave it for her", { as: "malakar" }),
wvId("valley", wvMoveRead("❄️ The valley of ancient ice", wqQs("She told me later that she'd been walking through a part of her realm she rarely visited—a deep valley where the ice was ancient and blue-black, where even she felt the cold.", "She'd gone there because she wanted to be alone, because Talia had sent another cheerful message about spring preparations and Glacia couldn't bear the reminder that her time was ending again, that she would once more give way to her sister's warmth and growth and life.") + wvsrc("Chapter 1") + "<p>You are Glacia again.</p>", "▶ Into the valley", "valleyIn", "❄️ <b>The valley of ancient ice</b>", { as: "glacia" })),
wvGo("valleyDeep", "Walk down into the deepest part of the valley, where even you feel the cold", { r: 12 }),
wvFind("mirror", "mirrorAt", "Something half-buried in the snow", "Something lies on the ice ahead, half-buried in snow: go to it, and pick it up", { verb: "pick it up", on: function () { if (WQW_VALLEY_MIRROR)
WQW_VALLEY_MIRROR.visible = false; }, say: "🪞 " + wqQ("The mirror was lying on the ice, half-buried in snow, as if it had been there forever. As if it had been waiting.") }),
wvRead("🪞 She looked into the mirror", wqQs("The silver thorns bit into her palms, drawing blood that froze before it could fall. She looked into the mirror. And she saw winter as she'd always dreamed it could be.", "She saw peace. She saw a world blanketed in pristine snow, every surface softened and gentled. She saw ice crystals catching the light like diamonds, turning the world into something magical.", "She saw winter not as death but as rest. Not as ending but as pause. Not as something to be endured but as something to be cherished. She saw herself not as a monster but as a blessing.") + wvsrc("Chapter 1"), "▶ What if winter didn't have to end?"),
wvPuzzle("🪞 What if winter didn't have to end?", "The thought comes to you fully formed. What will you do?", ["Take the mirror to the heavens, and show the gods", "Throw it down, and walk away", "Take it to your sisters"], 0, ["The thorns are in your palms. You cannot let go of it.", "She didn't tell her sisters where she was going. She was afraid they would try to stop her."], { yes: "🪞 " + wqQ("She would take the mirror to the heavens. She would show the gods what she'd seen.") }),
wvGo("valleyWings", "Walk out to the head of the valley, under the open sky, and spread your wings", { r: 12, say: "❄️ " + wqQ("Glacia spread her wings—great wings, pristine, and white as snow that could carry her between realms—and clutched the mirror tight.") }),
wvRead("🕊️ Toward the realm of the gods", wqQs("She launched herself into the sky, flying higher and higher, past the clouds, past the stars, toward the realm of the gods themselves.", "Below her, in the mortal world, the first unnatural cold began to spread. In her realm, the ice grew thicker, darker, colder. And in the spaces between realms, something ancient and patient smiled.") + wvsrc("Chapter 1"), "▶ Fly")
] });
var WC2 = wqbCh({ n: "Chapter 2", t: "The Shattering", txt: 2, as: "glacia", start: "skyLow", jump: 1, tune: "sky", keep: ["shard", "The first shard", "🔹"],
words: "Glacia flies higher than any of the sisters had ever dared, the mirror against her chest, toward the shimmering barriers between the mortal realm and the divine. Then everything starts to go wrong.",
intro: "The heights, toward the divine barrier",
cast: [wvc("faem", { sc: "autumn", x: -14, z: 70 }, { key: "fm", from: "autumn", until: "spring", ry: 2.2 }), wvc("nymphrun", "springIn", { key: "nr", from: "nymph", until: "crater", oz: -6, ry: 0 }),
wvc("nymph", "danceRing", { key: "n1", from: "spring", until: "crater", ox: 4, oz: 3, ry: -1 }), wvc("nymph", "danceRing", { key: "n2", from: "spring", until: "crater", ox: -4, oz: 2, ry: 1 }), wvc("nymph", "danceRing", { key: "n3", from: "spring", until: "crater", ox: 0, oz: -5, ry: 3 }),
wvc("youngman", "craterSouth", { key: "young", from: "man", ry: Math.PI })],
state: { env: function (s) { return __ZC(502, 164, this, arguments, new.target); },
ash: function (s) { return s > wqbIdx(WC2, "wither"); } },
steps: [
{ k: "read" },
wvRead("🕊️ Her wings", wqQs("Glacia flew higher than any of the sisters had ever dared.", "Her wings—gods, her wings were magnificent. Each feather was formed of crystallized snow that never melted, white as fresh powder, edged with frost that caught the light and threw it back in prismatic colors.", "She didn't know, as she climbed toward heaven, that she would never fly with them again.") + wvsrc("Chapter 2"), "▶ Higher"),
wvGo("skyHigh", "Fly on, up the road of the air, past the clouds, toward the stars", { r: 16, say: "✨ " + wqQ("Higher. Higher still. The air grew thin, the stars closer.") }),
wvGo("skyThin", "Higher still: you can see the boundaries now, shimmering ahead", { r: 16, say: "✨ " + wqQ("She could see the boundaries now, the places where the mortal realm ended and the divine began. Shimmering barriers of pure magic, the walls between what was and what should never be touched.") }),
wvId("barrier", wvGo("barrier", "Fly straight at the barrier; you do not hesitate", { r: 30, say: "⚠️ " + wqQ("She didn't hesitate. She flew straight toward them. That's when everything started to go wrong.") })),
wvRead("🪞 The mirror rippled", wqQs("The mirror began to vibrate in her hands. She looked down at it, confused, and saw that the surface was no longer smooth. It rippled like water, like something was moving beneath the glass. The reflection it showed her was changing—her face flickering between the hopeful goddess and something else. Something with eyes too cold, features too sharp, a smile too cruel. \"No,\" she whispered. \"No, you're supposed to show the truth—\"", "The mirror showed her the truth. It showed her what she was becoming.") + wvsrc("Chapter 2"), "▶ Turn back"),
wvCompel("🕊️ Turn back", "You try to turn back, to dive, to flee from the barrier.", ["The barrier recognized what she carried.", "She tried to throw it away. Her fingers wouldn't open.", "The mirror had her now, held her fast."], "Violently.", { yes: "" }),
wvRead("💥 The mirror exploded", wqQs("The mirror exploded.", "It didn't just break. It detonated. Shards of corrupted glass erupted outward in all directions, each piece carrying a fragment of the demon's curse, each one seeking a home in the world below.", "They scattered like falling stars, like a plague of frozen rain, spreading across the mortal realm in a pattern too perfect to be random. The demon had planned this. Had always planned this.") + wvsrc("Chapter 2"), "▶ ..."),
wvReadA("💥 The largest shard", wqQs("Glacia screamed. The force of the explosion threw her backward, but worse—so much worse—the shards tore through her as they scattered. Her wings, those beautiful wings of crystallized snow, were shredded.", "But the largest shard, the piece that had been at the mirror's heart, the fragment that contained the deepest concentration of demonic magic—that shard drove straight into her chest.", "She felt it pierce her skin, felt it slide between her ribs, and burrow deep into her flesh like a living thing seeking her heart. It stopped just short, embedded so close to that vital organ that she could feel it pulse with every beat.") + wvsrc("Chapter 2"), "<p>The mirror explodes, and its shards scatter across the whole world like falling stars. Her beautiful wings are torn to ribbons, and the largest shard of all lodges in her chest, close to her heart.</p>" + wqQs("Cold. So cold. Colder than winter had ever been, colder than death, colder than the spaces between the stars.") + wvsrc("Chapter 2"), "▶ And then she fell"),
wvId("autumn", wvMoveRead("🍂 In her autumn realm", wqQs("In her autumn realm, Cora gasped and clutched her chest. The bond she shared with Glacia, that thread of understanding between the two who knew what it meant to be endings and silence, went taut and then screamed with agony that wasn't her own.") + wvsrc("Chapter 2") + "<p>You are Cora now, in your garden of roses.</p>", "▶ To Cora's garden", "coraGarden", "🍂 <b>Cora's realm of Autumn</b>", { as: "cora" })),
wvSpot("The roses", "You are Cora. Something tears in your chest: go to your roses", { at: "coraRoses", as: "cora" }),
wvId("wither", wvRead("🥀 \"Glacia\"", wqQs("\"Glacia,\" she whispered, and the roses around her withered and turned to ash, crumbling to nothing as if winter had come and gone in an instant, as if they'd skipped straight past death to dust.") + wvsrc("Chapter 2"), "▶ Reach for her", { as: "cora" })),
wvHold("coraKneel", 8, "Kneel where Cora knelt, and reach along the thread to your sister; send warmth, send anything", { r: 5, as: "cora", say: "🍂 " + wqQ("She reached out with her magic, trying to send warmth, trying to send help, trying to send anything that might ease what she felt screaming through their connection. But it was like trying to grasp smoke, like trying to hold water in her hands.") }),
wvRead("🍂 Someone help her", wqQs("\"No, no, no—\" Cora's voice broke.", "\"Someone help her,\" she whispered to the dying garden, to the autumn wind, to anyone who might hear. \"Please, someone help her.\"", "But there was no answer. Only the sound of leaves falling and the terrible, aching silence where her sister's essence should have been.") + wvsrc("Chapter 2"), "▶ In the spring realm", { as: "cora" }),
wvId("spring", wvMoveRead("🌸 In the spring realm", wqQs("In the spring realm, Talia felt it too, though less clearly. She was dancing with her nymphs when the music suddenly soured, when the flowers around her drooped and the air grew cold.") + wvsrc("Chapter 2") + "<p>You are Talia now, dancing in your meadow.</p>", "▶ To Talia's meadow", "meadow", "🌸 <b>Talia's realm of Spring</b>", { as: "talia" })),
wvHold("danceRing", 6, "Dance with your nymphs in the ring of white flowers", { r: 9, as: "talia" }),
wvId("chill", wvRead("🌸 Something's wrong", wqQs("She stopped mid-step, her bare feet suddenly chilled against grass that had been warm moments before. Something was wrong. Something was very, very wrong.", "\"Sisters?\" she called out, her voice uncertain. The nymphs had stopped dancing, were looking at her with worried eyes. \"Do you feel that? Something's—\" But even as she spoke, the feeling was already slipping away from her, becoming vague and undefined.") + wvsrc("Chapter 2"), "▶ Hold on to it", { as: "talia" })),
wvRead("🌸 To Glacia", wqQs("She needed to go—where? To Glacia. Yes, to Glacia. Something was wrong with Glacia.") + wvsrc("Chapter 2"), "▶ Go", { as: "talia" }),
wvId("nymph", wvGo("springIn", "Go to Glacia: walk toward the shimmer at the edge of your realm, before the thought slips away", { r: 40, as: "talia" })),
wvTalk("A nymph, running after you", "One of the nymphs has run after you and touches your arm", ["🌸 A nymph", wqQs("\"My lady? Are you well? You look pale.\"", "Talia blinked, looking down at the nymph. \"I... yes. I think so. I was just...\"") + wvsrc("Chapter 2"), "▶ What were you doing?"], { as: "talia", at: "springIn" }),
wvPuzzle("🌸 What had she been doing?", "There was something you needed to remember, something urgent. What was it?", ["Something about... winter? It's gone.", "The orchard needs tending", "A dance for the nymphs"], 0, ["", "No. That isn't it.", "No. That isn't it."], { as: "talia", yes: "🌸 " + wqQ("By the time she remembered clearly enough to act, it would be far, far too late.") }),
wvId("crater", wvMoveRead("❄️ The crater", wqQs("She crashed into the mortal realm at the foothills of her mountain domain, near a small village whose name I never learned. The impact carved a crater in the frozen ground, sent shockwaves rippling outward that shattered windows and knocked mortals from their feet. Trees snapped. The earth itself groaned.", "Glacia didn't know how long she lay in the crater.") + wvsrc("Chapter 2") + "<p>You are Glacia, at the bottom of the crater.</p>", "▶ Wake", "craterMid", "❄️ <b>The crater in the foothills</b>", { as: "glacia" })),
wvHold("craterMid", 6, "Push yourself up to sitting, slowly; everything hurts", { r: 6, say: "❄️ " + wqQ("Slowly, agonizingly, she pushed herself up to sitting. Her hands were cut, bleeding ichor.") }),
wvSpotAt("Your reflection in the shard", "look into the shard in your chest", "craterMid", "Look down at the shard in your chest; you can see your face in it", function () { }, { r: 3 }),
wvRead("🪞 What have I done?", wqQs("She looked down at her chest and saw the shard. It protruded from her flesh just left of center, a jagged piece of mirror glass that pulsed with dark light as it sank deeper into her flesh. She could briefly see her reflection in it, distorted and wrong.", "\"What have I done?\" she whispered.", "The shard pulsed in response, and she felt the corruption spread a little further. It was in her blood now, in her bones, in her very essence. And with it came a terrible clarity. She could feel the other shards, scattered across the world.") + wvsrc("Chapter 2"), "▶ All of them"),
wvId("man", wvTalk("A young man of the village", "\"Miss? Miss, are you hurt?\" A young man is climbing down the side of the crater toward you", ["🧑 A young man of the village", wqQs("Glacia's head snapped up. A young man stood at the edge of the crater, looking down at her with concern. He was mortal, perhaps twenty years old, with kind eyes and work-roughened hands.", "\"It's alright,\" he said gently. \"You're safe now. Let me help you back to the village. We have a healer—\"") + wvsrc("Chapter 2"), "▶ And that's when Glacia saw it"])),
wvCompel("🪞 Take it", "The shard. It is so small, barely visible, embedded in his left eye. The piece in your chest burns with sudden, fierce need. " + wqQ("Take it, the corruption whispered. Retrieve what was lost. Gather the pieces. Make yourself whole."), ["\"No,\" Glacia breathed.", "Glacia tried to resist. Tried to hold onto herself, onto the goddess she'd been just hours ago.", "She didn't want to hurt him. He was kind. He was trying to help."], "\"I'm sorry,\" Glacia whispered", { holdBtn: "Hold back" }),
wvReadA("❄️ The Winter's Kiss", wqQs("She kissed him.", "It was called the Winter's Kiss, though she didn't know that yet. Didn't know that this would become her curse, her method, the terrible thing she would do again and again in the years to come. All she knew was that her lips touched his, and frost spread from the point of contact.", "It happened fast. Too fast for him to scream, though not fast enough to spare him the knowledge of what was happening.") + wvsrc("Chapter 2"), "<p>She kisses him, and frost spreads from her lips. It is called the Winter's Kiss, though she does not know it yet. In a moment he is still, turned to ice where he knelt, and a single frozen tear forms in his left eye.</p>" + wvsrc("Chapter 2"), "▶ ...", { done: function () { wqpFrozenAt("young"); } }),
wvFind("shard", { sc: "crater", x: 0, z: 36 }, "The shard", "A single frozen tear has formed in his eye, and the shard has come free with it: take it", { verb: "take the shard", say: "🔹 " + wqQ("The tiny piece of mirror glass, embedded in his eye, was pushed out by the ice. It fell into Glacia's palm, cold and sharp and wrong.") }),
wvRead("❄️ The Snow Queen was born", wqQs("\"No,\" she whispered. \"No, no, no—\"", "\"I'm sorry,\" she said again, but her voice was colder now. Harder. She turned away from him, from the crater, from the village. Her wings were ruined, but she could still walk. And she could feel the other shards calling to her, pulling her forward.", "The Snow Queen had been born in that moment of terrible violence. Born from a goddess's good intentions and a demon's corruption. Born from a kiss that killed and a compulsion that couldn't be denied. And she had so many more shards to collect.") + wvsrc("Chapter 2"), "▶ Walk into the night"),
wvGo("craterOut", "Walk away into the frozen night, north, away from the village", { r: 14, say: "❄️ " + wqQ("The Snow Queen walked alone into winter, and the world grew colder in her wake.") })
] });
var WQN = { pts: [[-14, -150], [-22, -230], [-34, -330], [-40, -460], [-40, -600], [-40, -720]] };
function wqnBuild(G) { return __ZC(502, 165, this, arguments, new.target); }
(function () { if (typeof npBuild !== "function")
return; var b0 = npBuild; npBuild = function (G) { var r = b0.apply(this, arguments); try {
wqnBuild(G);
}
catch (e) {
if (window.console)
console.warn("[winters-heart] road", e);
} return r; }; })();
function wqwToNorthPole() { if (typeof worldGo !== "function")
return; worldGo("northpole"); setTimeout(function () { try {
var e = WQN.pts[WQN.pts.length - 1];
camera.position.set(NP.base + e[0], npHeight(e[0], e[1] + 8) + 1.72, e[1] + 8);
yaw = Math.PI;
}
catch (err) { } }, 500); }
(function () { var b0 = WQW_SCN.palace.build; WQW_SCN.palace.build = function (G) { b0(G); var A = WQW_AT.road; wqwSpot(A.x, A.z + 40, 8, "The ice road, back to the North Pole", "walk back down the road to Santa's village", function () { wqwToNorthPole(); }, wqiPalaceH(A.x, A.z + 40)); }; })();
Object.assign(WQW_FOLK, {
steppeman: { name: "A herdsman of the steppe", dress: "wqfur", sex: "m", beard: "short", persona: "village", greet: "The grass should be white by now. The horses keep looking north." },
steppewoman: { name: "A woman of the steppe", dress: "wqfurf", sex: "f", persona: "village", greet: "We've waited at the winter camp a week already. Where is the cold?" }
});
if (WQW_FOLK.kael)
delete WQW_FOLK.kael.beard;
var WC3 = wqbCh({ n: "Chapter 3", t: "Old Man Winter", txt: 3, as: "kael", start: "northIn", jump: 1, tune: "frost", keep: ["eye", "The splinter in his eye", "👁️"],
words: "Before the mirror shard found him, Kael was Old Man Winter: winter's hand in the mortal world, the blizzard that buried mountains, the frost that split stone. About a year before the shattering he met Gerda. You are Kael, in the northern reaches, where the auroras dance.",
intro: "The northern reaches, where the auroras dance",
cast: [wvc("gerda", "gerdaAt", { key: "gerda", from: "gerda", until: "tower", ry: -2.2 }),
wvc("gerda", "towerVase", { key: "gerdaT", from: "tower", ry: 0.6 }),
wvc("villager", "valleyFields", { key: "farmer", from: "south", until: "steppe", ox: 8, oz: -4, ry: 0.6 }),
wvc("steppeman", "steppe", { key: "herd", from: "steppe", until: "back", ox: 6, oz: 4, ry: -1 })],
state: {
env: function (s) { return __ZC(502, 166, this, arguments, new.target); },
working: function (s) { return s >= wqbIdx(WC3, "work") && s <= wqbIdx(WC3, "work") + 1; },
frostV: function (s) { return s >= wqbIdx(WC3, "frosted"); },
frostS: function (s) { return s >= wqbIdx(WC3, "steppeFrost"); },
tearSky: function (s) { return s >= wqbIdx(WC3, "tear") && s < wqbIdx(WC3, "calm"); },
torn: function (s) { return s >= wqbIdx(WC3, "tear"); }, tornOut: function (s) { return s >= wqbIdx(WC3, "tear"); }
},
steps: [
{ k: "read" },
wvRead("🌨️ Old Man Winter", wqQs("I should tell you what I was before the mirror shard found me. Before everything changed. Before I became the beast in the story everyone thinks they know. I was once called Old Man Winter.", "I was old. Ancient beyond mortal reckoning, though I didn't appear so. I took the form of a man in his prime when I chose to be seen at all—tall and imposing, with hair the color of moonlit snow that fell past my shoulders.", "Where I walked, breath froze in lungs. Where I gestured, storms were born. I painted continents white and made the very air sharp enough to cut. But I wasn't winter itself. That was Glacia's domain.") + wvsrc("Chapter 3"), "▶ You are Kael"),
wvGo("glacierFoot", "You are Kael, Old Man Winter, winter's hand. Walk north over the old snow to the foot of the glacier", { r: 20, say: "🌌 " + wqQ("She found me in the northern reaches, where the auroras danced and the snow never fully melted even in summer.") }),
wvPuzzle("🌨️ Winter's body", "You and Glacia were complementary forces, two halves of a cosmic whole. Which were you?", ["Winter's body: the weather, the storms, the frost", "Winter's soul: rest, dormancy, the quiet before rebirth", "Neither: you served the gods"], 0, ["", "That was Glacia.", "You served no one."], { yes: "🌨️ " + wqQ("She was winter's soul; I was winter's body.") }),
wvId("work", wvHold("glacierWork", 12, "Craft the glacier: stand where the ice meets the bedrock, and coax it up, shaping it into rivers of frozen time", { r: 10, say: "❄️ " + wqQ("I was crafting a glacier—coaxing ice from the bedrock, shaping it into rivers of frozen time that would flow for millennia.") })),
wvRead("🔥 A pulse of magic", wqQs("That's when I felt her. A pulse of magic so powerful it made the air itself recoil. Not mortal magic—or at least, not entirely. Something older. Something that tasted of blood and binding and ancient, hungry things.", "She wore furs and leather that writhed with their own life, and the magic that radiated from her was intoxicating and wrong in equal measure.") + wvsrc("Chapter 3"), "▶ Turn"),
wvId("gerda", wvTalk("Gerda", "There she is, at the edge of your working, utterly unafraid of the cold: go to her", ["🔥 Gerda", wqQs("\"Old Man Winter,\" she said, and her voice carried over the howling wind as if the storm itself dared not drown her out. \"I've been hunting you.\"", "Not \"looking for.\" Hunting. I should have paid attention to that word.") + wvsrc("Chapter 3"), "▶ \"Have you?\""])),
wvAsk("Gerda", "Answer her", "🔥 Gerda", wqQ("She smiled, and it was like watching a wolf bare its teeth."), [
["\"And what does a mortal want with winter's hand?\"", wqQs("\"To understand it. To touch it. To possess it.\" The last word should have been a warning. Instead, it was a challenge.")],
["\"Many have tried. None have succeeded.\"", wqQs("She stepped forward, into the heart of my power, and didn't even flinch. Her own magic rose to meet mine—red and gold and colors that shouldn't exist in a mortal's repertoire.")],
["Let your power unfurl round you", wqQs("\"I don't want to control winter, Old Man. I want to bind myself to it. To you.\"", "And gods help me, I was intrigued.")]
], { btn: "▶ Go on" }),
wvReadA("🌪️ A collision", wqQs("What followed was not a relationship in any mortal sense. It was a collision. A conflagration. Two vast powers circling each other, testing boundaries, pushing limits.", "When we came together, it was like two weather systems colliding—violent, intense, reality-bending. The sex was apocalyptic. We'd couple in the heart of blizzards, our powers intertwining and feeding off each other until the very air around us screamed.", "It was intoxicating. Addictive. For the first time in my endless existence, I'd found something—someone—who could match my power, who could stand in the full force of what I was and not be destroyed.") + wvsrc("Chapter 3"), "<p>What followed was not a friendship, and not a romance in any mortal sense. " + wqQ("It was a collision. A conflagration. Two vast powers circling each other, testing boundaries, pushing limits.") + "</p>" + wqQs("It was intoxicating. Addictive. For the first time in my endless existence, I'd found something—someone—who could match my power, who could stand in the full force of what I was and not be destroyed.") + wvsrc("Chapter 3"), "▶ Her tower"),
wvGo("towerPath", "Walk with her up the ridge to the east, toward her tower", { r: 16, say: "🗼 " + wqQ("a structure of black stone that jutted from the mountainside like a talon") }),
wvGo("towerDoor", "Go up the steps to the door of the tower", { r: 8 }),
wvId("tower", wvGo("towerRoom", "Go in, and up the stair to her chamber", { r: 6, say: "🔥 The upper chamber: furs, dark stone, red light at the windows." })),
wvRead("🕸️ Tethering", wqQs("The first time I tried to leave to attend to my duties, she stopped me. Not with words. With magic.", "Threads of her power, woven through mine while I'd been distracted. Not quite binding, not quite controlling, but... tethering. Anchoring.") + wvsrc("Chapter 3"), "▶ \"The southern valleys need their first frost.\""),
wvTalk("Gerda", "Gerda is watching you: tell her you must go", ["🔥 Gerda", wqQs("\"Let someone else bring it.\" She moved closer, and her magic pressed against mine, invasive and possessive. \"Stay.\"", "\"There is no one else. I am winter's hand. This is what I am.\"", "\"And what am I?\" Her eyes flashed with something dangerous, something that made the air in the room feel suddenly thin. \"A distraction? A momentary amusement?\"") + wvsrc("Chapter 3"), "▶ \"You know that's not—\""]),
wvCompel("🕸️ \"Then stay.\"", wqQ("\"Then stay.\" The threads tightened. Not painful, not yet, but the intent was clear. \"Prove that I matter more than your endless duties. That I'm worth more than frost and snow.\""), [wqQ("I could have broken free. Should have."), wqQ("But breaking free would have meant shattering the threads entirely. Severing whatever this was between us."), wqQ("And despite the warning bells ringing in the back of my mind, I wasn't ready to do that.")], "So I stayed", { holdBtn: "Pull against the threads" }),
wvRead("🌨️ The southern valleys waited", wqQs("So I stayed. For three days, then four, while the southern valleys waited for winter that didn't come. While the seasonal order strained and groaned under the disruption.", "When I finally did leave, tearing free of her threads with more force than I'd intended, I could feel her fury following me like a cold wind.") + wvsrc("Chapter 3"), "▶ Tear free"),
wvId("south", wvMoveRead("🌾 The southern valleys", wqQs("My duties took me everywhere—across continents and oceans, to mountains and valleys, forests and tundras. I would arrive with the first frost, reshape the world in ice and snow, and then move on when my work was done.") + wvsrc("Chapter 3") + "<p>The southern valleys, late, waiting for their first frost.</p>", "▶ Down into the valley", "southIn", "🌾 <b>The southern valleys</b>")),
wvGo("valleyFields", "Walk down among the waiting fields; the stubble is still brown, the river still open", { r: 22 }),
wvTalk("A villager", "A farmer at the edge of his field is looking at the sky", ["🧑‍🌾 A farmer", "\"The frost's four days late. Never in my life. If it doesn't come the grubs'll have the seed, and the river won't freeze for the carts.\" He doesn't see you. Mortals rarely did.", "▶ Bring it"], { at: "valleyFields" }),
wvId("frosted", wvHold("valleyFields", 10, "Bring the first frost: raise your hand over the valley, and let the cold come down", { r: 30, say: "❄️ " + wqQ("I was winter's hand in the mortal realm—the blizzard that buried mountains, the frost that split stone, the ice that locked rivers in crystalline sleep.") })),
wvGo("valleyOrchard", "Walk on down the river to the orchard; frost spreads from your feet, white on the grass", { r: 18 }),
wvRead("🕸️ \"You belong to me\"", wqQs("\"You belong to me,\" she'd say, her magic wrapping around me like chains. \"Winter belongs to me.\" \"I belong to no one. I am a force of nature, not a possession.\"", "\"Everything can be possessed. Everything can be owned. Even you.\"", "The worst part was that I couldn't quite bring myself to end it.", "And beneath it all, I was lonely. Had been lonely for longer than I cared to admit.") + wvsrc("Chapter 3"), "▶ East, to the steppes"),
wvId("steppe", wvMoveRead("🐎 The eastern steppes", wqQs("The day of the shattering, I'd been gone for two weeks. Two weeks of bringing winter to the eastern steppes, of painting the world in frost and ice, of doing what I was meant to do.") + wvsrc("Chapter 3"), "▶ Out onto the steppe", "steppeIn", "🐎 <b>The eastern steppes</b>")),
wvTalk("A herdsman of the steppe", "The herdsmen at their winter camp are waiting for the cold", ["🐎 A herdsman", "\"The grass should be white by now. The horses keep looking north.\" He pulls his coat closer, though he cannot tell why.", "▶ Out onto the open steppe"], { at: "steppe" }),
wvId("steppeFrost", wvHold("steppe", 12, "Paint the steppe in frost and ice, to the edge of the world", { r: 40, say: "❄️ " + wqQ("Two weeks of feeling Gerda's fury like a distant storm on the horizon, growing darker with each passing day.") })),
wvId("back", wvMoveRead("🗼 Back to the tower", wqQs("When I returned to her tower, I could feel her magic before I even entered—roiling, furious, barely contained. She was waiting in the upper chamber, and the air around her crackled with power.") + wvsrc("Chapter 3"), "▶ Go up", "towerRoom", "🔥 <b>Gerda's tower, the upper chamber</b>")),
wvTalk("Gerda", "Gerda is waiting for you, very still", ["🔥 Gerda", wqQs("\"Two weeks,\" she said, and her voice was deadly calm. Worse than rage. \"Two weeks, Kael.\"", "\"I had duties—\" \"Duties.\" She laughed, and the sound made the windows rattle.", "\"Always duties. Always the world needing you more than I do.\"") + wvsrc("Chapter 3"), "▶ \"It's not about need.\""]),
wvPuzzle("🔥 \"What am I to you?\"", wqQ("\"And what am I?\" Her magic exploded outward, slamming into mine with enough force to crack the stone floor. \"What am I to you?\""), ["\"I don't know.\"", "\"Everything.\"", "\"Nothing.\""], 0, ["", "You could have lied. Should have, perhaps. But you are tired of the binding.", "Not that. Not yet."], { yes: "🔥 " + wqQ("The truth hung between us like a blade.") }),
wvRead("🕸️ True binding", wqQs("\"I have given you everything. Opened myself to you. Bound myself to you. And you don't even know what I am to you?\"", "\"No.\" Her magic flared, red and gold and black, colors that definitely shouldn't exist in mortal sorcery. \"No more excuses. No more duties. You will stay, Kael. You will be mine. I will bind you so thoroughly that you'll never leave again.\"") + wvsrc("Chapter 3"), "▶ Summon your full power"),
wvHold("towerRoom", 6, "The threads lash out: summon your full power, and do not be caged", { r: 8, say: "🌨️ " + wqQ("\"I am not yours to bind!\" My voice carried the weight of glaciers, the cold of the void between stars. \"I am winter's hand, a primordial force, and I will not be caged!\"") }),
wvId("tear", wvRead("🌌 The sky tore open", wqQs("Our powers collided with a sound like reality breaking. And then the sky tore open.", "It started with a sound that shouldn't exist—a ripping, tearing noise that came from everywhere and nowhere, from the fabric of existence itself. The tower shook. The windows exploded. The air shrieked.") + wvsrc("Chapter 3"), "▶ Throw up a shield of ice")),
wvSpot("The window", "Gerda is already at the shattered window: go and look out", { at: "towerWindow" }),
wvRead("🌌 The storm", wqQs("The sky was wrong. Fundamentally, cosmically wrong. Reality itself had been slashed open, torn like cloth, and through the wounds I could see colors that hurt to perceive—purples that burned, greens that screamed, blacks that devoured light and meaning and hope.", "This wasn't weather. This was the death of natural law.") + wvsrc("Chapter 3"), "▶ Reach for Glacia"),
wvHold("towerWindow", 6, "Reach out with your senses, across the whole world, for Glacia", { r: 5, say: "🌌 " + wqQ("But there was nothing. Not just absence. A void.") }),
wvTalk("Gerda", "Gerda grips your arm", ["🔥 Gerda", wqQs("\"Glacia,\" I whispered, and my voice shook. \"She's gone. She's—\"", "\"What is this?\" Gerda's hand gripped my arm, her fingers digging in with desperate strength.", "\"Than the world,\" I finished, still searching desperately for any trace of the Horai.", "\"Can you stop it?\"", "\"I don't know!\"") + wvsrc("Chapter 3"), "▶ Try"]),
wvRead("👁️ Something struck my eye", wqQs("That's when it happened. Something struck my eye. The pain was immediate and absolute—like a shard of frozen starlight had been driven directly into my skull, into my brain, into my very essence.", "\"My eye,\" I gasped. The pain was already transforming into something else—a burning, itching feeling, like something foreign had lodged itself where it absolutely should not be. \"Something struck my eye.\"") + wvsrc("Chapter 3"), "▶ ..."),
wvTalk("Gerda", "Gerda pulls your hands from your face", ["🔥 Gerda", wqQs("\"There's nothing there,\" she said. \"No wound, no debris. Your eye looks—\"", "\"It's not fine!\" I blinked rapidly, desperately, trying to dislodge whatever had embedded itself in my vision. \"There's something in it. I can feel it.\"", "\"Kael.\" Gerda's voice was strange now, distant. \"The storm.\"") + wvsrc("Chapter 3"), "▶ Turn"]),
wvId("calm", wvRead("🌌 Over", wqQs("The storm was ending. Not gradually, not naturally, but all at once—like someone had simply erased it from existence. The tears in reality sealed themselves. The impossible colors faded. The wind died to nothing.", "\"It felt old,\" she whispered. \"Ancient. Like something from before the world was made.\"") + wvsrc("Chapter 3"), "▶ Check the damage")),
wvHold("towerRoom", 8, "Go round the wrecked chamber with her and check the damage; make sure the tower is stable", { r: 8, say: "🗼 " + wqQ("Whatever that storm had been, physical destruction hadn't been its primary purpose. It had been delivering something. Distributing something. Planting something.") }),
wvSpotAt("Gerda's bed", "lie down", "towerBed", "Lie down beside her; you will not sleep", function () { }, { r: 2.4 }),
wvRead("👁️ Nothing", wqQs("Tried to ignore the strange, cold feeling that had settled in my chest—colder than anything I'd ever created.", "Tried to ignore the small, insistent voice in the back of my mind that whispered something was very, very wrong. I reached out one more time with my senses, searching for Glacia across the vast distances that separated us. Searching for any trace of winter's essence, winter's soul.", "Nothing.") + wvsrc("Chapter 3"), "▶ Close the chapter")
] });
var WC4 = wqbCh({ n: "Chapter 4", t: "The Poison and The Curse", txt: 4, as: "kael", start: "towerRoom", jump: 1, tune: "frost", keep: ["curse", "Gerda's curse", "🐻‍❄️"],
words: "The mirror shard wasn't just lodged in Kael's eye; it was lodged in his perception. Over a few weeks the world turned grey, and the first to suffer for it was Gerda. You are Kael, in her tower.",
intro: "Gerda's tower, weeks after the storm",
cast: [wvc("gerda", "towerVase", { key: "gerda", until: "out", ry: 0.6 })],
state: { torn: 1, tornOut: 1, vaseWhole: function (s) { return s < wqbIdx(WC4, "vase"); }, vaseBroken: function (s) { return s >= wqbIdx(WC4, "vase"); },
env: function (s) { return s >= wqbIdx(WC4, "out") ? "blizzard" : null; } },
steps: [
{ k: "read" },
wvRead("👁️ Grey", wqQs("The mirror shard wasn't just lodged in my eye; it was lodged in my perception.", "It didn't burn, it didn't ache; it simply shifted my vision. Slowly, subtly, everything became gray. Not physically, not at first, but morally.", "My primordial nature, which had always balanced the whole, was now hyper-focused on one truth: Winter is the only clean slate. Silence is the only perfection.") + wvsrc("Chapter 4"), "▶ Gerda"),
wvPuzzle("👁️ What the shard shows you", "Look at the seasons through the shard. What do you see in Talia's spring now?", ["Chaos", "Hope, messy growth", "Rest"], 0, ["", "That is what you used to see.", "That is winter, and only winter."], { yes: "👁️ " + wqQ("I saw Talia's spring as chaos, Alessia's summer as exhausting excess, and Cora's autumn as decay.") }),
wvTalk("Gerda", "Gerda comes to you, looking for the man she knew", ["🔥 Gerda", wqQs("\"You're cold,\" she said one evening, sliding into the immense bed beside me, her own magic seeking the familiar blend with mine.", "\"I am cold,\" I replied, without turning my head. \"It is my nature.\"", "\"No. This is different. You're distant. Like the moon.\"") + wvsrc("Chapter 4"), "▶ \"The storm was tiresome.\""]),
wvRead("👁️ A problem to be managed", wqQs("\"The storm was tiresome. Our time is better spent rebuilding.\" I said it with clinical detachment. The shard in my eye presented her as a problem to be managed, a distraction from the work of restoring order.", "Her confusion soon turned to heartbreak, and then, inevitably, to fury.") + wvsrc("Chapter 4"), "▶ ..."),
wvId("vase", wvTalk("Gerda", "Gerda turns on you, the vase of withered lilies in her hand", ["🔥 Gerda", "<p style='margin:6px 0'>" + wqQ("What happened that night?\" she screamed one night, throwing a vase of withered mountain lilies against the stone wall.") + "</p>" + wqQs("\"Nothing happened,\" I said, looking right through her, my glacial eyes utterly empty of emotion. \"You are overreacting. Perhaps you lack the fortitude for the truly ancient things.\"", "\"I lack fortitude? I faced that chaotic horror beside you, Kael! I saw the fear in your eyes when you realized Glacia was gone! Don't you dare insult me with your cold detachment.\"") + wvsrc("Chapter 4"), "▶ Rise from your seat"])),
wvSpotAt("The broken vase", "look at the broken vase", "towerVase", "The vase lies in pieces against the wall: look at it, and feel nothing", function () { }, { r: 2.6 }),
wvTalk("Gerda", "She will not let you go", ["🔥 Gerda", wqQs("\"I have no time for your tantrums, Gerda,\" I stated, rising from my seat. \"The world needs Winter. I need to leave.\" \"No!\"", "\"You will not leave until you look at me and tell me what you see! Tell me that I matter more than the frost!\"") + wvsrc("Chapter 4"), "▶ Turn your full attention to her"]),
wvCompel("👁️ The shard gives them voice", wqQ("I finally turned my full attention to her, letting my own cold power—now enhanced by the demonic shard") + " " + wqQ("—flow outward.") + "<p>Words are rising in you, cold and cruel. Try to hold them back.</p>", [wqQ("\"I see a flawed creature attempting to possess a primordial power,\" I said, my voice cutting through the air like a sheet of ice. \"I see a distraction. I see an end that should have come sooner.\""), "You try to stop there. The shard does not.", wqQ("The words, cold and cruel, were not entirely mine, but the shard gave them voice.")], "\"You were momentary amusement, Gerda.\"", { holdBtn: "Hold back the words" }),
wvRead("💔 Momentary amusement", wqQs("I took a step toward her, forcing her to shrink back. \"You were momentary amusement, Gerda. Nothing more. Now, release the binding and stand aside.\"", "Gerda looked utterly destroyed. Her power, which had been burning with fierce rage, sputtered and died, leaving her exposed and shaking.", "\"Momentary amusement,\" she repeated, the sound thin and broken.") + wvsrc("Chapter 4"), "▶ ..."),
wvRead("🔥 The curse", wqQs("\"Only 'true love and devotion' can break this.\" The voice was not mine. It was hers, but ancient, powerful, resonant—the voice of a high sorceress whose heart had just been shattered by a demon-poisoned primordial force.", "\"You wished to be only Winter's Hand? Then Winter's Hand you shall be.\"", "\"You will not return to this form, you will not reclaim your strength, and you will not regain your memory, until you prove what you swore you already possessed.\"") + wvsrc("Chapter 4"), "▶ Fight her"),
wvCompel("🔥 Fight her", "Her magic wraps round your limbs, your body, your very essence.", [wqQ("I tried to move, tried to fight her, but her magic—the ancient, binding magic that had always felt suffocating"), wqQ("—now felt absolute."), wqQ("It was an unbreakable prison forged of pure, agonizing emotional rejection.")], "It begins", { holdBtn: "Fight" }),
wvRead("🐻‍❄️ The bear", wqQs("I felt the transformation begin. It was not gentle. It felt like my very essence—the cosmic code that defined me as Old Man Winter—was being violently rewritten. My limbs cracked and strained. My skin thickened and turned to massive white fur. My mind clouded, the complexity of millennia collapsing into simple, primal instinct.") + wvsrc("Chapter 4"), "▶ ..."),
wvMoveRead("🐻‍❄️ \"Go\"", wqQs("\"Go,\" she commanded, tears finally mixing with the terrible light in her eyes. \"Go, and be the beast you have become in your heart. Only true love and devotion can break the curse and return you to Kael, the Ice King.\"") + wvsrc("Chapter 4") + "<p>You are the bear now.</p>", "▶ Out", "towerOut", "🐻‍❄️ <b>Out of the ruined tower, into a storm</b>", { as: "bear" }),
wvId("out", wvGo("stormFar", "Flee: out into the storm, away from the tower, away from the woman whose heart you broke", { r: 30, as: "bear", say: "🌨️ " + wqQ("I fled into a storm I had not created, leaving behind the shattered sorceress") })),
wvRead("🌨️ Wandering the world alone", wqQs("Gerda, seeing the result of her despair, slumped against the cold stone, immediately consumed by regret. The curse was set. Unbreakable. Unchangeable. The curse required the impossible. And the two most powerful beings in all of Winter—Glacia, corrupted by the mirror, and Kael, cursed by his love—were now broken, cast out, and wandering the world alone.") + wvsrc("Chapter 4"), "▶ A century passes", { as: "bear" })
] });
function wqpFallen(key) { var C = WQB.cast[key]; if (!C || !C.g || C.g.userData.fallen)
return; C.g.userData.fallen = 1; C.g.rotation.x = -Math.PI / 2; C.g.position.y += 0.25; wqiFreeze(C.g); WQW.talk = WQW.talk.filter(function (T) { return T.p !== C.P; }); C.P.o = {}; }
var WC5 = wqbCh({ n: "Chapter 5", t: "The Snow Queen's Quest", txt: 5, as: "glacia", start: "court", jump: 1, tune: "frost", keep: ["count", "Four hundred and sixty-three", "🔢"],
words: "A century after the shattering. Glacia has hunted shards for over a hundred years, and this is what those years have made of her: magnificent, terrible, dangerous, and utterly alone. You are the Snow Queen, in your palace.",
intro: "The Winter Palace, a century after the shattering",
cast: [wvc("mother", "marginMother", { key: "mother", from: "house", ry: Math.PI * 0.85 }), wvc("daughter", { sc: "coast", x: WQW_AT.marginMother.x - 0.9, z: WQW_AT.marginMother.z + 0.3 }, { key: "girl", from: "house", ry: 2.6, mute: 1 })],
state: { coldfire: 0, env: function (s) { var v = wqbIdx(WC5, "village"), b = wqbIdx(WC5, "back"); return s >= v && s < b ? "sunsetvillage" : null; }, marginFrost: function (s) { return s >= wqbIdx(WC5, "house") + 2; } },
steps: [
{ k: "read" },
wvReadA("❄️ What those years had made of her", wqQs("By the time I found her palace, Glacia had been hunting shards for over a century. This is what those years had made of her.", "For over a hundred years, she had walked the earth with a single purpose. The shard in her chest called to its scattered siblings, and she answered that call with the mechanical precision of a clock striking the hour.", "She had killed hundreds. Most didn't survive the Winter's Kiss.", "She felt nothing about it. The shard in her chest had seen to that.") + wvsrc("Chapter 5"), wqQs("By the time I found her palace, Glacia had been hunting shards for over a century. This is what those years had made of her.", "For over a hundred years, she had walked the earth with a single purpose. The shard in her chest called to its scattered siblings, and she answered that call with the mechanical precision of a clock striking the hour.") + "<p>Many did not survive her kiss. She felt nothing about it; the shard had seen to that.</p>" + wvsrc("Chapter 5"), "▶ Her palace"),
wvGo("fall", "You are the Snow Queen. Walk through your courtyard, past the waterfall frozen mid-fall", { r: 12, say: "❄️ " + wqQ("In the central courtyard, a waterfall hung suspended mid-cascade, each droplet frozen in its descent, creating a sculpture of motion arrested, of time itself held captive.") }),
wvGo("hall", "Go in, through halls that could hold a thousand revelers; you feel nothing at their emptiness", { r: 10, say: "❄️ " + wqQ("Wind howled through the corridors. Snow fell in the courtyards. It was magnificent. It was perfect. It was utterly, devastatingly empty.") }),
wvGo("shards", "Go to the round chamber at the heart of the palace", { r: 8, say: "✨ " + wqQ("The room was circular, its walls rising up into a dome of ice so clear it revealed the stars beyond. In the center stood a pedestal of frozen crystal, and on that pedestal rested a silver box, its surface etched with patterns that shifted and writhed when viewed directly.") }),
wvSpot("The silver box", "Stand before the pedestal, hands folded at your waist", { at: "shardBox" }),
wvRead("🪞 The shards", wqQs("Inside the box were the shards. Hundreds of them. Tiny fragments of the Winter's Heart Mirror, each one pulsing with its own corrupt heartbeat, each one singing its poisonous song.", "But it was her eyes that truly showed what she had become. They were pale blue, almost colorless, like looking into a frozen lake in the depths of winter.") + wvsrc("Chapter 5"), "▶ ..."),
wvCompel("✋ A tremor", "Something flickers across your face. A micro-expression, gone almost before it registers.", [wqQ("Her left hand trembled—just once, just slightly—before she pressed it flat against her thigh, forcing it still."), wqQ("The shard in her chest pulsed, and the moment passed.")], "Turn away", { holdBtn: "Let it tremble" }),
wvRead("🧭 Another shard", wqQs("She had felt it an hour ago—the pull of another shard, distant but distinct, calling to the piece embedded near her heart. The compulsion rose in her like a tide, irresistible, undeniable. She would go. She would find the victim. She would take the shard. She always did.") + wvsrc("Chapter 5"), "▶ Go"),
wvId("village", wvMoveRead("🏘️ The village at the margin", wqQs("The village was small, unremarkable, the kind of place that existed in the margins of maps and the edges of memory.") + wvsrc("Chapter 5"), "▶ Into the village", "marginIn", "🏘️ <b>A village at the margin of the maps</b>")),
wvGo("marginSquare", "Walk through the snow-covered streets as the sun sets; frost spreads across the windows as you pass", { r: 16, say: "🏘️ " + wqQ("People saw her and fled indoors, slamming shutters, barring doors, gathering children close. They knew what she was.") }),
wvGo("marginHouse", "Follow the pull of the shard, past the square, to a small house at the edge of the settlement", { r: 8, say: "🧭 " + wqQ("Glacia felt their fear like a distant echo, something that registered but did not touch her.") }),
wvId("house", wvGo("marginRoom", "The door is open: go in", { r: 4, say: "🕯️ " + wqQ("The door was open. Inside, a young woman sat by the fire, rocking a child who couldn't have been more than two years old.") })),
wvTalk("The young mother", "She is singing, softly, something about stars and safety and morning coming soon", ["🕯️ The young mother", wqQs("She looked up as Glacia's shadow fell across the threshold, and her voice died. The shard was in her left eye.", "\"No,\" the woman whispered. She clutched the child tighter. \"No, please. Not yet. Not—I have a daughter. Please.\"") + wvsrc("Chapter 5"), "▶ Step into the house"]),
wvCompel("❄️ \"Put the child down\"", wqQ("Glacia stepped into the house. Ice spread from where her feet touched the floor, creeping across the wooden planks in crystalline patterns. The fire in the hearth guttered and dimmed, unable to withstand her presence."), [wqQ("\"Please,\" the woman said again. Tears were streaming down her face now, freezing on her cheeks. \"Please, I'll do anything. Just—just let me say goodbye. Let me—\""), "Something in you would let her. The shard will not."], "\"Put the child down,\" Glacia said", { holdBtn: "Wait" }),
wvPuzzle("❄️ \"Will it hurt?\"", wqQ("\"Will it hurt?\" the woman asked. Her voice was steadier now, resigned."), ["\"Yes. But not for long.\"", "\"No.\"", "Say nothing"], 0, ["", "The shard does not let you lie, or comfort.", "She asked. You answer."], { yes: "🕯️ " + wqQ("\"Then do it quickly. Please. Before she's old enough to remember.\"") }),
wvReadA("❄️ The Winter's Kiss", wqQs("\"I'm sorry,\" Glacia whispered, and somewhere deep beneath the ice, beneath the shard's corruption, beneath a hundred years of numbness, something screamed.", "Then she leaned in and pressed her lips to the woman's mouth. The cold came instantly, violently, spreading from the point of contact like poison through veins.", "That was the cruelty of it—the victim had to remain conscious, had to feel every moment of the process, because the magic required awareness to complete the extraction.", "Behind them, the child was screaming, a high, piercing wail that should have shattered something in Glacia's chest. It didn't.", "The shard came free with a sound like breaking glass. It was small—no larger than a coin of the realm—but it pulsed with malevolent light, singing its corrupt song.") + wvsrc("Chapter 5"), wqQs("\"I'm sorry,\" Glacia whispered, and somewhere deep beneath the ice, beneath the shard's corruption, beneath a hundred years of numbness, something screamed.") + "<p>Then she kisses her, and the cold takes the young mother, and the shard comes free from her eye, small as a coin and singing its corrupt song. Behind them, the child is crying.</p>" + wvsrc("Chapter 5"), "▶ ...", { done: function () { wqpFallen("mother"); } }),
wvRead("🪞 One more piece", wqQs("Glacia stood over the body, the shard clutched in her hand, and felt nothing. No guilt. No remorse. No satisfaction.", "The child was reaching toward the body on the floor, calling for her mama, not understanding why mama wouldn't get up, wouldn't answer, wouldn't hold her.") + wvsrc("Chapter 5"), "▶ ..."),
wvCompel("🔥 This is wrong", wqQ("—Glacia's hand trembled. Her fingers tightened around the shard until the edges cut into her palm, drawing golden blood that froze before it could fall."), [wqQ("This is wrong, a voice whispered from somewhere deep inside her, from the place where Alessia's ember still burned, hidden and waiting."), "This is wrong, this is wrong, this is—"], "The shard in her chest pulsed", { holdBtn: "Listen to it", yes: "❄️ " + wqQ("The shard in her chest pulsed, and the thought shattered like ice under a hammer.") }),
wvGo("marginOut", "Turn away from the screaming child, and walk out, through the streets, into the frozen wasteland beyond", { r: 20, say: "❄️ " + wqQ("She walked until the village was lost behind her, until there was nothing but snow and ice and the endless, empty sky. And she felt nothing.") }),
wvId("back", wvMoveRead("🏰 Home", wqQs("The return to the palace was automatic, her feet following paths worn by a century of repetition. She passed through the gates—massive structures of ice carved with scenes of winter's beauty, now looking more like monuments to winter's cruelty—and into the vast, silent halls.") + wvsrc("Chapter 5"), "▶ Through the gates", "gates", "🏰 <b>The Winter Palace</b>")),
wvGo("shards", "Through the silent halls to the central chamber, and the pedestal with its silver box", { r: 8 }),
wvSpot("The silver box", "Open the lid with hands that do not shake, and put the new shard inside with the others", { at: "shardBox" }),
wvPuzzle("🔢 The count", "You know the count without thinking. How many now?", ["Four hundred and sixty-three", "Four hundred and sixty-two", "Five hundred"], 0, ["", "One more than that.", "Not yet. Not for a long time yet."], { yes: "🔢 " + wqQ("Four hundred and sixty-three.") }),
wvRead("❄️ This was the Snow Queen", wqQs("She didn't know why she needed to gather them. The compulsion didn't explain itself, didn't justify its demands. It simply was, as inevitable as winter itself, as undeniable as the cold.", "It was a monument built for a goddess who had died a century ago but whose body still walked, still hunted, still killed.", "I tell you this so you understand the magnitude of what Alessia had preserved, hidden deep in Glacia's frozen heart—that last ember of warmth, that final spark of the goddess she had been.", "But I'm getting ahead of myself.") + wvsrc("Chapter 5"), "▶ Close the chapter")
] });
var WC6 = wqbCh({ n: "Chapter 6", t: "The Wounded Beast", txt: 6, as: "bear", start: "coastIn", jump: 1, tune: "frost", keep: ["ear", "The torn ear of the alpha", "🐺"],
words: "Kael was a bear for nearly a century, a hundred years in a form that wasn't his, with a mind that couldn't hold onto who he'd been. He remembers enough. You are the great white bear, on the frozen coast.",
intro: "The frozen coast, nearly a century after the curse",
cast: [wvc("glacia", "court", { key: "g", from: "glacia", oz: -14, ry: 0 })],
state: { coldfire: 0, env: function (s) { return s < wqbIdx(WC6, "palace") ? "oldice" : "frostnight"; }, night: 0 },
steps: [
{ k: "read" },
wvRead("🐻‍❄️ This is what I remember", wqQs("My memories of that time are... difficult.", "Fragmented.", "Like trying to recall a dream weeks after waking, where you remember the feeling more than the details, the shape of things rather than their substance.", "This is what I remember.") + wvsrc("Chapter 6"), "▶ You are the bear"),
wvHold("coastIn", 10, "Wander the frozen wastes, with no purpose, no direction; the cold feels like home", { r: 30, say: "🐻‍❄️ " + wqQ("The frost that formed on my white fur each morning felt like a greeting. The wind that howled across the tundra felt like a song I'd once known. But I couldn't remember the words.") }),
wvRead("🐻‍❄️ Alone", wqQs("I was massive, even for a polar bear. Easily twice the size of any natural creature, with paws that could crush bone and jaws that could snap a seal's spine with a single bite.", "I was powerful. I was also utterly, devastatingly alone. The other bears avoided me.", "I didn't have the words for grief. Didn't have the capacity for mourning. But somewhere deep in my chest, in the place where the curse had buried my true self, something ached.") + wvsrc("Chapter 6"), "▶ The coast"),
wvGo("shore", "Follow the coast north, to where the sea ice begins, searching for seals", { r: 20 }),
wvGo("seals", "Out on the ice the seals lie hauled out by their breathing holes: creep closer, low and slow", { r: 14 }),
wvHold("seals", 5, "Wait, flat on the ice, downwind of them", { r: 16, say: "🦭 The seals lift their heads, sniff, and settle again." }),
wvRead("🐺 Their scent on the wind", wqQs("The wolves came on a day when the sky was the color of old ice. I'd been following the coast, searching for seals, when I caught their scent on the wind.", "the sharp tang of starvation, the musk of fear-driven aggression.", "There were eight of them. Lean, rangy creatures with ribs showing through their fur and eyes that gleamed with hunger and calculation.") + wvsrc("Chapter 6"), "▶ Turn to face them"),
wvGo("wolves", "Go up off the ice onto the open tundra; they are spreading round you in a circle", { r: 16 }),
wvHold("wolves", 3, "Rise up on your hind legs, towering over them, and roar", { r: 18, say: "🐻‍❄️ " + wqQ("The sound echoed across the tundra, primal and terrible, carrying in it some fragment of the power I'd lost.") }),
wvFight("wolf", "wolves", "Hunger overrides their caution, and they attack: fight", { n: 4, as: "bear", intro: wqQ("Then hunger overrode caution, and they attacked."), yes: "🐺 " + wqQ("I killed three of them. Wounded two more badly enough that they fled, limping and bleeding.") }),
wvFight("alpha", "wolvesAlpha", "The alpha, the scarred male with one torn ear, comes for your throat", { as: "bear", intro: wqQ("The alpha got his jaws around my throat."), yes: "🐺 " + wqQ("I threw myself backward, crushing him beneath my weight, felt something in him break.") }),
wvRead("🩸 They fled", wqQs("The remaining wolves looked at each other. Looked at their dead and dying packmates. Looked at me, still standing, still dangerous despite my wounds. They turned and fled.", "Then my legs gave out and I collapsed into the snow, my blood spreading around me in a crimson pool that steamed in the frigid air.") + wvsrc("Chapter 6"), "▶ ..."),
wvHold("bearFall", 8, "Lie in the snow. Something keeps you breathing; something whispers that you must move. Get up", { r: 10, say: "🐻‍❄️ " + wqQ("But I didn't die. Something kept me breathing. Something kept my heart beating.") }),
wvPuzzle("🧭 This way", "The thought exists in your mind, more feeling than words: this way. Which way is the snow least deep?", ["Straight ahead, where it barely reaches your haunches", "Left, where it comes up to your chest", "Right, where it reaches your shoulders"], 0, ["", "Too deep. You cannot.", "Deep still."], { yes: "🧭 " + wqQ("I went straight ahead.") }),
wvGo("pathA", "Go on, straight ahead, where the snow is least deep", { r: 12 }),
wvPuzzle("🧭 The wind", "Which way is the wind gentlest?", ["East, toward the rising sun", "North", "South"], 0, ["", "It cuts through your fur like knives.", "It merely stings."], { yes: "🧭 " + wqQ("When I faced east, toward the rising sun, it felt almost... gentle. I went east.") }),
wvGo("pathB", "East: a patch of ice slightly less slick, a drift slightly more packed", { r: 14 }),
wvGo("pathC", "Keep going; one paw in front of the other", { r: 14, say: "🐻‍❄️ " + wqQ("Something kept pulling me forward, kept whispering not yet, not yet, just a little further. So I kept walking.") }),
wvId("palace", wvMoveRead("🏰 The palace", wqQs("I saw the palace through a haze of pain and exhaustion. At first, I thought it was a hallucination.", "But even through the fog of my fading consciousness, even trapped in a mind that couldn't hold complex thoughts, I felt something when I looked at it. Recognition.") + wvsrc("Chapter 6"), "▶ Stumble on", "road", "🏰 <b>The Winter Palace</b>")),
wvGo("gates", "Stumble up the road to the gates; they are open", { r: 14, say: "🏰 " + wqQ("The gates were open. I don't know if they'd been open before or if they opened for me.") }),
wvGo("court", "Drag yourself over the threshold, into the courtyard of ice and starlight", { r: 14 }),
wvHold("court", 5, "The world tilts. Your legs give out", { r: 16, say: "🐻‍❄️ " + wqQ("The world tilted.") }),
wvId("glacia", wvRead("❄️ I know you", wqQs("This is it, I thought, in the last moment of clarity I had. This is where I die. And then, through the blur of my failing vision, I saw her.", "She was the most beautiful thing I'd ever seen. She was terrifying. She was... Familiar.", "The last thing I saw before the world went black was her face, beautiful and terrible and cold as death, leaning down to look at me.", "Something that whispered, even as consciousness fled: I know you. Then darkness took me, and I knew nothing at all.") + wvsrc("Chapter 6"), "▶ Close the chapter"))
] });
var WQP_LIE = function (g) { wqpLying(g); };
var WC7 = wqbCh({ n: "Chapter 7", t: "The First Signs of Thaw", txt: 7, as: "glacia", start: "court", jump: 1, tune: "frost", keep: ["fire", "The cold fire, lit again", "🔥"],
words: "The Snow Queen stands over the fallen bear in her courtyard, and the silence is absolute. You are Glacia.",
intro: "The courtyard of the Winter Palace",
cast: [wvc("bear", "courtBear", { key: "bearC", until: "carry", ry: 1.2, look: WQP_LIE, mute: 1 }), wvc("bear", "hearthBear", { key: "bearH", from: "carry", ry: -1.4, look: WQP_LIE, mute: 1 })],
state: { coldfire: function (s) { return s >= wqbIdx(WC7, "lit"); }, env: function (s) { return "frostnight"; } },
steps: [
{ k: "read" },
wvRead("❄️ The fallen bear", wqQs("The Snow Queen stood over the fallen bear, and the silence of the courtyard was absolute. Even the perpetual wind that howled through her realm seemed to hold its breath.", "The shard in her chest had long ago extinguished such inconvenient emotions. Glacia saw only an object. A magnificent object, to be sure.") + wvsrc("Chapter 7"), "▶ Look at it"),
wvSpotAt("The fallen bear", "kneel beside it", "courtBear", "Kneel beside the animal, and find the wound on its throat", function () { }, { r: 4 }),
wvRead("❄️ Kael", wqQs("Beneath the physical structure of muscle, bone, and blood, there was a vast, ancient power coiled within the bear. It was a coldness that resonated with her own, a fundamental force that spoke of blizzards, glaciers, and gale force winds. This was not an animal. This was something primordial. Kael.", "The name whispered through the deep, frozen caverns of her mind, unbidden and unwelcome.", "'Why would I think that?'") + wvsrc("Chapter 7"), "▶ Pull your hand back"),
wvGo("courtAway", "Stand, and turn away from the bear with mechanical grace; walk back toward your halls", { r: 4, say: "❄️ " + wqQ("She stood, turning away from the bear with mechanical grace. She made it three steps before she stopped.") }),
wvCompel("❄️ Leave it", wqQ("Leave it, the shard commanded, cold and absolute. Save it, something else whispered, warm as the bright sun on a snowy day."), [wqQ("Glacia's hands trembled harder. She pressed them flat against her thighs, trying to still them, trying to suppress whatever this was."), wqQ("So why did the thought of leaving this creature to die make something in her chest ache?"), wqQ("Winter creatures. She'd always had a fondness for winter creatures.")], "Turn back", { holdBtn: "Keep walking" }),
wvRead("🔥 The ember", wqQs("The shard pulsed again, trying to push the memories back down, trying to restore the numbness. But the ember—Alessia's hidden gift—burned brighter, and for once, the warmth was stronger than the cold. Glacia knelt beside the bear again, and this time, her hand didn't hesitate.") + wvsrc("Chapter 7"), "▶ Lift him"),
wvHold("courtBear", 6, "Wrap him in threads of ice and winter wind, and lift him as gently as you can", { r: 6, say: "❄️ " + wqQ("Moving him was harder than she'd expected. Even with magic, even with power that could reshape glaciers and summon blizzards, the sheer mass of the creature made it difficult.") }),
wvId("carry", wvMoveRead("❄️ Through the silent halls", wqQs("She'd never brought anything living here before. Not in a century. The palace was a mausoleum, a monument, a place for the dead and the dying. Life had no place in these halls.") + wvsrc("Chapter 7"), "▶ To the grand hearth", "hearthSeat", "🔥 <b>The hall of the grand hearth</b>")),
wvRead("🔥 The grand hearth", wqQs("The hearth itself was enormous—large enough to burn logs the size of full grown trees, built from ice that had never melted and never would. It had been cold and dark for over a century, as dead as everything else in this place.", "This is madness, the shard whispered. Leave him. Return to your purpose.") + wvsrc("Chapter 7"), "▶ But the ember burned"),
wvHold("hearthFire", 6, "Raise your hands to the dead hearth, and call the winter that heals, the winter that preserves", { r: 12, say: "❄️ " + wqQ("The magic came reluctantly, as if it had forgotten how to answer her call. But it came.") }),
wvId("lit", wvRead("🔥 The cold fire", wqQs("Blue-white flames erupted in the hearth. They burned with an impossible light, cold as the void but radiating a warmth that had nothing to do with heat. The flames danced and twisted, beautiful and contradictory, fire that was ice and ice that was fire.", "The bear's body responded immediately. His breathing deepened slightly, his massive chest rising and falling with more strength.") + wvsrc("Chapter 7"), "▶ Heal him")),
wvSpotAt("The wound on his throat", "knit it closed", "woundThroat", "Lower your hands to his fur; find the wound on his throat first, the deepest", function () { }, { r: 1.6, say: "❄️ " + wqQ("Live, she thought, and was surprised by the fierceness of it. Live.") }),
wvSpotAt("The wound on his haunch", "knit it closed", "woundHaunch", "The wound on his haunch next", function () { }, { r: 1.6 }),
wvSpotAt("The wound on his flank", "knit it closed", "woundFlank", "And his flank: broken ribs beneath, bleeding inside", function () { }, { r: 1.6, say: "❄️ " + wqQ("But he wasn't mortal. The divine nature within him fought alongside her magic, responding to her touch, healing faster than should be possible.") }),
wvRead("❄️ He was no longer dying", wqQs("Hours passed. Or maybe days. Time lost meaning as she worked, her focus absolute, her hands steady despite the trembling that wanted to return.", "She sat back on her heels, staring at him. He was magnificent.", "What are you? she wondered, reaching out to touch his fur again.", "She'd forgotten what it felt like to touch something living. To feel warmth that wasn't her own. To want to touch something not because she had to, but because she wanted to.") + wvsrc("Chapter 7"), "▶ Why can't I leave?"),
wvHold("hearthSeat", 10, "Settle on the ice floor beside him, your back against the hearth, and keep vigil", { r: 4, say: "🔥 " + wqQ("The cold fire burned behind her, warming her in ways she didn't understand, and she watched the rise and fall of his chest with an intensity that should have frightened her.") }),
wvRead("❄️ \"Who are you?\"", wqQs("\"What are you?\" she whispered into the silence. The bear didn't answer.", "Kael.", "\"Who are you?\" she asked, her voice barely audible. \"Why did you come here? Why do I...\"", "\"I don't understand,\" she whispered. \"I don't understand any of this.\"") + wvsrc("Chapter 7"), "▶ Reach out one more time"),
wvHold("hearthBear", 5, "Lay your hand gently on his fur, and let it rest there", { r: 4, say: "❄️ " + wqQ("\"Stay,\" she whispered, though she didn't know if she was talking to him or to herself. \"Please stay.\"") }),
wvRead("🔥 To thaw", wqQs("And for the first time in forever, Glacia felt something that might have been hope. She didn't move. Didn't leave. Just sat there beside him as the cold fire burned and the hours passed and something in her frozen heart began—slowly, impossibly—to thaw.") + wvsrc("Chapter 7"), "▶ Close the chapter")
] });
var WC8 = wqbCh({ n: "Chapter 8", t: "Beauty and the Beast", txt: 8, as: "bear", start: "hearthBear", jump: 1, tune: "frost", keep: ["name", "KAEL, scratched in the ice", "✍️"],
words: "Kael wakes before the cold fire, healed, a bear, and also himself. Beside him, asleep against the hearth, is Glacia. You are the bear; you cannot speak. You can nod, shake your head, follow her, and, if you try very hard, scratch letters in the ice.",
intro: "The hall of the grand hearth",
cast: [wvc("glacia", "hearthSeat", { key: "g1", until: "guard", ry: 0.6 }), wvc("glacia", "shardBox", { key: "g2", from: "guard", until: "tour", oz: 2, ry: Math.PI }), wvc("glacia", "hearthSeat", { key: "g3", from: "tour", until: "another", ry: 0.6 }),
wvc("glacia", "shardBox", { key: "g4", from: "another", until: "dawn", oz: 2, ry: Math.PI }), wvc("glacia", "gates", { key: "g5", from: "dawn", until: "gone", oz: -6, ry: 0 })],
state: { coldfire: 1, env: "frostnight", scratch0: function (s) { return s > wqbIdx(WC8, "K"); }, scratch1: function (s) { return s > wqbIdx(WC8, "K") + 1; }, scratch2: function (s) { return s > wqbIdx(WC8, "K") + 2; }, scratch3: function (s) { return s > wqbIdx(WC8, "K") + 3; } },
steps: [
{ k: "read" },
wvRead("🔥 I woke up to fire", wqQs("I woke up to fire.", "It was a cold fire—blue-white, dancing impossibly high in a hearth built of ice that should have melted centuries ago.", "Then the next piece of consciousness hit, jarring and sickening: I was a bear, but I was also me.", "Kael.", "The name echoed in my mind. Not a roar, but a thought. This is not right. This is not my body.") + wvsrc("Chapter 8"), "▶ Look around"),
wvHold("hearthBear", 4, "Rise onto all fours; the pain is gone", { r: 5, say: "🐻‍❄️ " + wqQ("I was magnificent. I was a god-beast.") }),
wvRead("❄️ Glacia", wqQs("She was sitting beside me on the ice floor, her back propped against the base of the frozen hearth, as if she had fallen asleep waiting for something.", "Glacia.", "She woke the moment I shifted my weight, her colorless eyes snapping open with instantaneous, chilling alertness.") + wvsrc("Chapter 8"), "▶ ..."),
wvTalk("Glacia", "She is awake, watching you like a specimen", ["❄️ Glacia", wqQs("\"You are awake,\" Glacia said. Her voice was the sound of wind over frozen glass—soft, empty, perfectly pitched. \"I suspected you would recover quickly.\"", "\"The healing was successful,\" she said, more to herself than to me. \"Your uncanny nature responded well to the magic. The wounds are completely closed. No scarring.\"", "\"You are no ordinary bear,\" she said. \"I sensed it when I found you. There is something ancient in you. Something that speaks of winter.\"") + wvsrc("Chapter 8"), "▶ Try to answer"]),
wvPuzzle("🐻‍❄️ You cannot speak", "Words are in you, but all that comes out is a low rumble. How do you answer her?", ["Toss your head in a nod", "Roar", "Look away"], 0, ["", "A roar is not what you mean.", "You want her to see you understand."], { yes: "❄️ " + wqQ("\"You understand me,\" she said. It wasn't a question. \"Not the words, perhaps. But the meaning. The feeling.\"") }),
wvRead("❄️ \"You will stay\"", wqQs("\"Interesting.\" She circled me slowly, studying me from every angle. \"You will stay.\"", "\"You may be useful,\" she continued, her voice flat and cold. \"I have a collection that requires guarding. And a purpose that demands my absence from this place. You will remain here and ensure nothing disturbs what I have gathered.\"") + wvsrc("Chapter 8"), "▶ Follow her"),
wvId("guard", wvGo("shards", "Follow her, your paws silent on the ice, to the round chamber you remember from your dying vision", { r: 8 })),
wvTalk("Glacia", "She stands by the silver box", ["❄️ Glacia", wqQs("\"This,\" Glacia said, gesturing to the box, \"contains fragments of something that was broken. I gather them. I retrieve them. And I keep them here, safe, until I have collected them all.\"", "\"If you prove useless,\" she said softly, \"I will likely kill you.\"", "\"Come,\" she said. \"I will show you the rest of the palace. You should know what you are guarding.\"") + wvsrc("Chapter 8"), "▶ Hold her gaze"]),
wvGo("hall", "Follow her through the palace's vast, empty halls", { r: 10, say: "❄️ " + wqQ("\"The architecture here defies natural law,\" she said once, gesturing to a bridge that spanned an impossible distance. \"It exists because I will it to exist. Because winter itself bends to my command.\" A pause. \"Or it did, once. Now I'm not certain which of us is in command.\"") }),
wvGo("library", "On, into the tower of the ancient tomes", { r: 8, say: "❄️ " + wqQ("\"I built this palace over centuries. Every spire, every hall, every impossible angle. It was meant to be beautiful. A monument to winter's perfection.\"") + " " + wqQ("\"I don't remember why that mattered.\"") }),
wvId("tour", wvGo("hearthBear", "Go back to the hearth chamber and curl up before the fire", { r: 6 })),
wvHold("hearthBear", 6, "Sleep. The fire dies down to embers; when you wake, it is burning high again", { r: 5, say: "🔥 " + wqQ("Seen her notice I was uncomfortable and do something about it, even though she'd never admit it mattered.") }),
wvFind("seal", "hearthSealAt", "A seal", "The second day: she tosses a seal onto the ice in front of you. Eat", { verb: "eat", say: "❄️ " + wqQ("\"Eat,\" she commanded. \"You need to maintain your strength if you are to be useful.\"") }),
wvPuzzle("❄️ \"Was it sufficient?\"", "She stayed while you ate, watching. \"Was it sufficient?\"", ["Nod", "Shake your head"], 0, ["", "It was. Tell her so."], { yes: "❄️ " + wqQ("I nodded, and something that might have been satisfaction flickered in her eyes before the emptiness returned.") }),
wvRead("📖 The third day", wqQs("On the third day, she was reading in the hearth chamber—an ancient tome written in a language I couldn't identify, though something about the script felt familiar.", "\"You're always watching,\" she observed. \"Why?\" I couldn't answer.", "She returned to her reading, but I noticed she positioned herself so I could see the pages, as if she didn't mind my observation.") + wvsrc("Chapter 8"), "▶ An urge"),
wvGo("hearthScratch", "Stand, and go to a clear stretch of the ice floor; she is across the hall, her back to you", { r: 3 }),
wvId("K", wvHold("hearthScratch", 4, "Press your silver claws against the ice and drag them, in careful, deliberate lines: K", { r: 3, say: "✍️ " + wqQ("The letter took forever. My paw slipped twice, and I had to start over.") })),
wvHold("hearthScratch", 3, "A", { r: 3, say: "✍️ " + wqQ("Easier this time. I was getting the feel of it.") }),
wvHold("hearthScratch", 3, "E", { r: 3, say: "✍️ " + wqQ("My paw was aching, the strain of such fine motor control in this body almost overwhelming. But I couldn't stop.") }),
wvHold("hearthScratch", 3, "L", { r: 3, say: "✍️ " + wqQ("This was important. This mattered.") }),
wvTalk("Glacia", "\"What are you doing?\" She has come to see", ["❄️ Glacia", wqQs("I turned to find her standing a few feet away, staring at the scratches in the ice.", "\"Kael,\" she whispered.", "The moment she spoke it, something happened. The ember in her chest flared—I could see it, a brief golden light beneath her icy gown.", "\"Kael,\" she said again, and this time her voice shook. \"Why do I... why does that name...\"") + wvsrc("Chapter 8"), "▶ ..."], { at: "hearthScratch" }),
wvRead("❄️ The shard pulsed", wqQs("Then the shard in her chest pulsed. I felt it like a physical blow—a wave of cold so intense it drove the air from my lungs.", "My own mind fractured at the same moment.", "\"Return to the hearth. Rest. We will not speak of this again.\"") + wvsrc("Chapter 8"), "▶ Return to the hearth"),
wvHold("hearthBear", 6, "Lie down by the hearth, but keep your eyes on her distant figure", { r: 5, say: "❄️ " + wqQ("She didn't move for a long time. Just stood there, one hand pressed to her chest, staring at nothing.") }),
wvRead("🔥 Vigil, again", wqQs("The fire burned brighter when I was near. I noticed it, and I think she did too, though neither of us acknowledged it.", "\"I was merely ensuring you were still breathing,\" she said, her voice flat. \"You are valuable. It would be inconvenient if you died.\"", "She'd been keeping vigil. Again.") + wvsrc("Chapter 8"), "▶ The fifth day"),
wvId("another", wvGo("shards", "On the fifth day she stops in a corridor, hand to her chest: follow her to the silver box", { r: 8, say: "❄️ " + wqQ("\"A shard,\" she explained, her voice returning to its usual emptiness. \"I can feel it calling. Distant, but distinct. I must retrieve it.\"") })),
wvPuzzle("❄️ \"Do you understand?\"", wqQ("\"You will remain here. You will guard the collection. You will guard the palace. Nothing and no one is to disturb what I have gathered. Do you understand?\""), ["Nod", "Shake your head"], 0, ["", "You understand. You do not want to."], { yes: "❄️ " + wqQ("\"Do not fail me, beast,\" she said finally, and turned away.") }),
wvId("dawn", wvGo("gates", "She leaves at dawn: follow her to the palace gates", { r: 12 })),
wvTalk("Glacia", "She pauses at the threshold and turns back to look at you", ["❄️ Glacia", wqQs("\"Guard well,\" she said. \"I will know if you fail.\" But there was something in her eyes as she said it—not warmth, exactly, but something that might have been concern."), "▶ Watch her go"]),
wvId("gone", wvGo("hearthBear", "She is gone into the white. Go back to the hearth, to the fire she made for you", { r: 6, say: "🐻‍❄️ " + wqQ("The palace felt different without her. Emptier.") })),
wvRead("🐻‍❄️ To remember", wqQs("I'd been alone for a century. Had wandered the frozen wastes with no companion, no purpose, no memory of anything beyond survival. But I hadn't been lonely then, because I hadn't been aware enough to understand what loneliness was. Now I was aware.", "And Gerda.", "Two cursed creatures, two fragments of what we'd once been, drawn together by forces neither of us understood. I waited.") + wvsrc("Chapter 8"), "▶ Close the chapter")
] });
var WC9 = wqbCh({ n: "Chapter 9", t: "Winter's Doubt", txt: 9, as: "bear", start: "hearthBear", jump: 1, tune: "frost", keep: ["sleigh", "A ride in the ice sleigh", "🛷"],
words: "The palace is silent without her. Three days, or is it four? The cold fire works on the bear's mind, melting Gerda's curse bit by bit. You are the bear, and she is coming back.",
intro: "The Winter Palace, waiting",
cast: [wvc("glacia", "shardBox", { key: "g1", from: "back", until: "week", oz: 1.4, ry: Math.PI }), wvc("glacia", "hearthSeat", { key: "g2", from: "week", until: "south", ry: 0.6 }),
wvc("glacia", "sleigh", { key: "g3", from: "sleigh", until: "fifty", ox: -3, ry: 0 }),
wvc("glacia", "fiftyCopse", { key: "g4", from: "fifty", until: "door", ox: 4, ry: Math.PI }), wvc("glacia", "fiftyRoom", { key: "g5", from: "door", until: "fled", ry: Math.PI }),
wvc("father", "fiftyDoor", { key: "father", from: "fifty", ry: Math.PI }), wvc("wife", "fiftyRoom", { key: "wife", from: "fifty", ox: -1.6, ry: Math.PI }),
wvc("small", "fiftyRoom", { key: "c1", from: "fifty", ox: -2.6, oz: -1, ry: Math.PI, mute: 1 }), wvc("small", "fiftyRoom", { key: "c2", from: "fifty", ox: 2.4, oz: -1, ry: Math.PI, mute: 1 }),
wvc("eldest", "fiftyBack", { key: "eldest", from: "fifty", ry: 0 }),
wvc("glacia", "shardBox", { key: "g6", from: "home", until: "later", oz: 1.4, ry: Math.PI }), wvc("glacia", "hearthSeat", { key: "g7", from: "later", ry: 0.6 })],
state: { coldfire: 1, scratch0: 1, scratch1: 1, scratch2: 1, scratch3: 1, env: function (s) { var f = wqbIdx(WC9, "fifty"), h = wqbIdx(WC9, "home"); return s >= f && s < h ? "sunsetvillage" : "frostnight"; } },
steps: [
{ k: "read" },
wvRead("🐻‍❄️ Silent without her", wqQs("The palace was silent without her.", "The fire helped. I could feel it working on my mind, melting the ice of Gerda's curse bit by bit, like spring thaw revealing what had been buried beneath winter's grip.", "What had happened to her? What had turned winter's gentle soul into this creature of ice and death?") + wvsrc("Chapter 9"), "▶ Wait"),
wvHold("hearthBear", 6, "Lie before the hearth, your head on your paws, and piece the fragments together", { r: 5, say: "❄️ " + wqQ("The cold intensified.") }),
wvRead("❄️ She was back", wqQs("Not the comfortable cold of the palace, the cold that felt like home. This was different—sharper, more aggressive, like the leading edge of a blizzard.", "She was back.") + wvsrc("Chapter 9"), "▶ Go and see"),
wvGo("hall", "Go toward the entrance hall; keep to the shadows by the great crystalline pillars", { r: 10, say: "❄️ " + wqQ("She didn't see me. Didn't look around. Just walked with rigid purpose toward the chamber where the silver box waited.") }),
wvId("back", wvGo("shards", "Follow at a distance, quietly, to the round chamber", { r: 8 })),
wvPuzzle("🔢 Another", "She takes a shard from her gown, still pulsing with a faint, sickly light, and lays it among the others. How many now?", ["Four hundred and sixty-four", "Four hundred and sixty-three", "Five hundred"], 0, ["", "One more than that, now.", "Not yet."], { yes: "🔢 " + wqQ("Four hundred and sixty-four.") }),
wvRead("❄️ \"I'm sorry\"", wqQs("Just stood there, her hands resting on the closed box, her head bowed. For a long moment, nothing happened. Then I saw it—her hands began to tremble.", "\"I'm sorry.\"", "The words were barely a whisper, broken and raw. Her face—that perfect, cold, emotionless face—cracked.", "She lowered her hands slowly, her breathing steadying, her posture straightening. The Snow Queen was back, the moment of weakness erased.") + wvsrc("Chapter 9"), "▶ The week after"),
wvId("week", wvRead("❄️ The week after", wqQs("She allowed my constant presence, though she pretended annoyance. \"Must you follow me everywhere, beast?\" she'd ask, but there was no real heat in it. And she never actually sent me away.", "But there was tension too. She avoided eye contact more than before.") + wvsrc("Chapter 9"), "▶ The seventh day")),
wvGo("hearthBear", "On the seventh day she comes back to the hearth chamber with one of her tomes: lie by the fire", { r: 6, say: "📖 " + wqQ("We sat in silence for a long time. The fire crackled. The ice sang its high, crystalline note.") }),
wvHold("hearthBear", 5, "Stand as she stood in the shard chamber: head bowed, your paws pressed to your chest", { r: 5, say: "❄️ " + wqQ("I heard her sharp intake of breath.") }),
wvTalk("Glacia", "\"What are you doing?\"", ["❄️ Glacia", wqQs("\"What are you doing?\" Her voice was sharp, but there was something underneath it. Something that might have been fear.", "She stood abruptly, the book falling forgotten to the ice. \"You were spying on me?\"") + wvsrc("Chapter 9"), "▶ Answer her"]),
wvPuzzle("🐻‍❄️ Spying?", "You cannot speak. Answer her.", ["Shake your head", "Nod", "Look away"], 0, ["", "That is not what you meant at all.", "Do not let her hide."], { yes: "❄️ " + wqQ("\"You had no right—\" She stopped, her hands clenching into fists at her sides. \"You don't understand. You can't understand.\"") }),
wvCompel("❄️ \"Stop\"", wqQ("\"Stop,\" she commanded, but her voice cracked slightly. \"Just stop.\""), [wqQ("I didn't stop. I came to stand directly in front of her, close enough that she had to look up to meet my eyes."), wqQ("And I held her gaze, refusing to let her look away, refusing to let her hide behind the Snow Queen's mask.")], "Her anger cracked", { holdBtn: "Come closer" }),
wvRead("❄️ \"This one...\"", wqQs("\"You don't understand,\" she said again, but this time it came out almost pleading. \"The extraction was... it was difficult. The victim was young. Younger than most. It took longer than it should have.\"", "A pause. \"This one... screamed for their mother.\"", "\"I don't know why it's becoming harder.\"", "Then, so quietly I almost didn't hear it: \"I don't know why you being here makes it harder.\"") + wvsrc("Chapter 9"), "▶ ..."),
wvRead("❄️ Starting to care", wqQs("She moved toward me—not away, toward—and sank down onto the ice floor beside me.", "\"But I think...\" Her voice dropped to barely a whisper. \"I think I'm starting to care anyway.\"", "\"It doesn't matter,\" she said, but her voice shook. \"I have a purpose. The shards must be gathered. All of them. That's all that matters. That's all that can matter.\"") + wvsrc("Chapter 9"), "▶ Three days later"),
wvId("south", wvGo("shards", "Three days later, in the shard chamber, she stiffens: another is calling", { r: 8, say: "❄️ " + wqQ("\"There's another,\" she said, more to herself than to me. \"Far to the south.\"") })),
wvId("sleigh", wvGo("sleigh", "Follow her out to the great courtyard, to something you have never seen", { r: 8, say: "🛷 " + wqQ("The sleigh was magnificent and terrible in equal measure. It looked like it had been carved from a single massive piece of ice, all flowing curves and sharp angles.") })),
wvTalk("Glacia", "She runs her hand along its side, and turns to you", ["❄️ Glacia", wqQs("\"You're going to follow me regardless, aren't you?\"", "I nodded.", "\"The sleigh can carry your weight,\" she said. \"If you insist on coming.\"", "\"You'll see what I do,\" she continued, her voice hardening. \"What I must do. Don't interfere.\"") + wvsrc("Chapter 9"), "▶ Climb in"]),
wvRead("🛷 \"Hold on\"", wqQs("I climbed into the sleigh, my massive weight making it sink slightly into the snow. She took her position at the front, her hands resting on rails that seemed to form themselves from the ice.", "\"Hold on,\" she said, and the sleigh launched into the air.", "Flying in the sleigh was like being inside a blizzard and outside it at the same time.") + wvsrc("Chapter 9"), "▶ Fly"),
wvHold("sleigh", 8, "Fly: over the frozen wasteland, the stars wheeling overhead; listen to her", { r: 8, say: "🛷 " + wqQ("\"I can feel them,\" she said, her voice carrying easily despite the wind. \"The shards. Each one calls to me, a pull I can't ignore. Like thirst. Like drowning and knowing air is just out of reach.\"") }),
wvRead("🛷 \"You're listening\"", wqQs("\"Now I... wonder. Why? What happens when I have them all? What purpose does this serve?\"", "She glanced back again, and something flickered in her eyes. \"You're listening,\" she said, and there was wonder in her voice. \"You actually understand, don't you? Not just the feelings, but the words. The meaning.\"", "We flew over a frozen lake, its surface smooth as glass. \"I used to love winter,\" she said quietly.", "Her voice dropped even lower. \"I don't see that anymore. Now I only see the cold. The emptiness. The death.\"") + wvsrc("Chapter 9"), "▶ She shivers"),
wvHold("sleigh", 6, "She shivers, once. Press your bulk against her back, and share your heat", { r: 8, say: "🛷 " + wqQ("\"Thank you,\" she whispered, so quietly I almost didn't hear it.") }),
wvId("fifty", wvMoveRead("🏘️ The valley of fifty houses", wqQs("We reached the village as evening fell.", "It was small—maybe fifty houses clustered together in a valley, smoke rising from chimneys, warm light glowing in windows. The kind of place where everyone knew everyone, where life moved at the pace of seasons and harvests.", "The kind of place that would be devastated by what was about to happen.") + wvsrc("Chapter 9"), "▶ Land in the copse", "fiftyCopse", "🏘️ <b>A village in a valley, far to the south</b>")),
wvTalk("Glacia", "\"Wait here with the sleigh,\" she commands, not looking at you", ["❄️ Glacia", wqQs("\"Wait here with the sleigh,\" she commanded, not looking at me.", "I climbed out after her.", "She turned, her eyes flashing with anger. \"I said wait—\"", "I met her gaze and held it. *No.*", "\"Stay back, then,\" she said finally. \"And don't interfere. No matter what you see.\"") + wvsrc("Chapter 9"), "▶ Follow at a distance"]),
wvGo("fiftyHouse", "Follow her at a distance, keeping to the shadows, to a house with flower boxes in its windows", { r: 8, say: "🏘️ " + wqQ("Through the windows, I could see movement. A family gathered around a table. Warm. Safe. Alive.") }),
wvId("door", wvGo("fiftyRoom", "The door opens before she can knock; she goes in. Come to the doorway", { r: 4 })),
wvTalk("The father", "The father stands in her way", ["🧑 The father", wqQs("\"No,\" he breathed. \"No, please, not here. Not my family.\"", "\"The shard must be removed,\" Glacia said, her voice flat and empty. \"Stand aside.\"", "\"Please,\" the man begged. \"They're just children. They haven't done anything wrong. Please.\"", "The family didn't move. The man spread his arms, blocking the doorway. \"You'll have to go through me first.\"") + wvsrc("Chapter 9"), "▶ ..."]),
wvRead("❄️ Living statues", wqQs("Glacia raised her hand, and frost spread from her fingers. The man gasped as ice crept up his legs, freezing him in place. Not harming him—she wasn't cruel, just efficient—but immobilizing him completely.", "Only the victim remained unfrozen, standing at the back of the room, trembling.", "\"Please,\" he whispered. \"I don't want to die. Please, I don't want to die.\"") + wvsrc("Chapter 9"), "▶ ...", { done: function () { ["father", "wife", "c1", "c2"].forEach(wqpFrozenAt); } }),
wvHold("fiftyDoor", 3, "You can't bear it. Come out of the shadows with a low, distressed roar", { r: 4, say: "🐻‍❄️ " + wqQ("Glacia stopped. Turned. Our eyes met across the distance.") }),
wvReadA("❄️ The extraction", wqQs("For a moment—just a moment—I saw something in her face. Hesitation. Uncertainty. The ember fighting against the shard's compulsion.", "Then the shard in her chest pulsed, visible now through her gown, and her face went blank again.", "\"No!\" he screamed. \"No, please, someone help me! Mother! Father!\"", "She leaned in and pressed her lips to his.", "But he didn't die.", "\"Mother,\" he gasped at one point, his voice barely audible. \"Mother, it hurts. It hurts so much.\"", "The boy collapsed, his body hitting the floor with a sickening thud. But his chest still rose and fell. Shallow breaths. Barely there. But alive.", "He would survive. But he would never be the same.") + wvsrc("Chapter 9"), wqQs("For a moment—just a moment—I saw something in her face. Hesitation. Uncertainty. The ember fighting against the shard's compulsion.", "Then the shard in her chest pulsed, visible now through her gown, and her face went blank again.") + "<p>She takes the shard from the young man's eye with her kiss. It takes a long time. He lives, but the cold will never fully leave him.</p>" + wqQs("He would survive. But he would never be the same.") + wvsrc("Chapter 9"), "▶ ...", { done: function () { var C = WQB.cast.eldest; if (C && C.g && !C.g.userData.fallen) {
C.g.userData.fallen = 1;
C.g.rotation.x = -Math.PI / 2;
C.g.position.y += 0.25;
WQW.talk = WQW.talk.filter(function (T) { return T.p !== C.P; });
} } }),
wvHold("fiftyRoom", 4, "Step over the threshold, between her and the family; growl low: stay back, don't hurt her", { r: 4, say: "🐻‍❄️ " + wqQ("I still moved to protect her.") }),
wvSpotAt("Glacia", "touch her hand", "fiftyRoom", "Reach out with your muzzle, and gently touch her hand, the one holding the shard", function () { }, { r: 2.4 }),
wvId("fled", wvRead("❄️ \"Don't\"", wqQs("She jerked away as if I'd burned her. \"Don't,\" she said again, backing toward the door. \"This is what I am. What I do. Don't... don't try to make it something it's not.\"", "She turned and fled, moving with inhuman speed, disappearing into the night.", "So I turned and followed her into the darkness.") + wvsrc("Chapter 9"), "▶ Follow her")),
wvGo("fiftyCopse", "Out, through the dark lanes, back to the copse and the sleigh", { r: 10, say: "❄️ " + wqQ("\"Get in,\" she said, her voice flat. \"We're leaving.\"") }),
wvId("home", wvMoveRead("🛷 The flight home", wqQs("But it was a different kind of silence than before. Heavy. Oppressive. Filled with things neither of us could say.", "We landed in the palace courtyard as dawn was breaking—or what passed for dawn this far north, a slight lightening of the perpetual twilight.") + wvsrc("Chapter 9"), "▶ Follow her in", "shards", "✨ <b>The shard chamber</b>")),
wvPuzzle("🔢 Again", "She opens the silver box and lays the new shard among the others. How many now?", ["Four hundred and sixty-five", "Four hundred and sixty-four", "Five hundred"], 0, ["", "One more, now.", "Not yet."], { yes: "🔢 " + wqQ("Four hundred and sixty-five.") }),
wvHold("shardBox", 6, "\"Why do you stay? Why do you... care?\" Go to her, and lean against her gently", { r: 4, say: "❄️ " + wqQ("For a moment she stood rigid, resisting. Then, slowly, her hand came up to rest on my fur.") }),
wvId("later", wvGo("hearthBear", "Later, by the hearth: she sits closer than ever before", { r: 6 })),
wvRead("🔥 By the hearth", wqQs("\"I've done this hundreds of times,\" she said finally. \"Felt nothing. Questioned nothing.", "She turned back to the fire. \"Now I feel it. The horror of it. The wrongness. That child tonight—he'll live, but he'll never be whole again. Never be warm again. He'll carry winter in his bones for the rest of his life, and it's because of me.\"", "\"I don't know what's happening to me,\" she whispered. \"I don't know why you make it harder and easier at the same time. I don't know why I can't bear the thought of you leaving, or why your presence makes this cursed existence less overwhelming.\"", "\"I don't know if I can stop,\" she said.") + wvsrc("Chapter 9"), "▶ ..."),
wvHold("hearthBear", 8, "Rest your head against her, and offer what comfort you can", { r: 5, say: "🔥 " + wqQ("She couldn't finish. Just pressed her face against my fur, her shoulders shaking with silent sobs.") }),
wvRead("🪞 The first crack", wqQs("The doubt had taken root. And though neither of us knew it yet, that doubt would be the first crack in the mirror's hold over her frozen heart.") + wvsrc("Chapter 9"), "▶ Close the chapter")
] });
var WC10 = wqbCh({ n: "Chapter 10", t: "What a Strange Garden", txt: 10, as: "bear", start: "springLand", jump: 1, tune: "garden", keep: ["blessing", "Talia's flower, perfectly preserved", "🌸"],
words: "Weeks of hearth and hunt. Then a shard calls from far to the south, past the pine forests, past the foothills, into a meadow where spring has come too early. You are the bear.",
intro: "A meadow, far to the south",
cast: [wvc("glacia", "springLand", { key: "gF", until: "rest", follow: 1 }), wvc("glacia", "guestRoom", { key: "gR", from: "rest", until: "morning", ox: -2.4, oz: -2, ry: 0.4 }), wvc("glacia", "tulips", { key: "gF2", from: "morning", until: "alone", follow: 1 }), wvc("glacia", "gardenWalk", { key: "gF3", from: "walk", follow: 1 }),
wvc("talia", "springIn", { key: "tal1", from: "talia", until: "cottage", oz: -4, ry: Math.PI }), wvc("talia", "cottageTable", { key: "tal2", from: "cottage", until: "rest", ox: 1.1, oz: 1.1, ry: Math.PI }),
wvc("talia", "tulips", { key: "tal3", from: "morning", until: "walk", ox: 4, ry: -1.2 }), wvc("talia", "cottageTable", { key: "tal4", from: "lastday", until: "leave", ox: 1.4, ry: Math.PI })],
state: { env: function (s) { return s < wqbIdx(WC10, "through") || s >= wqbIdx(WC10, "out") ? "lateautumn" : null; }, wilt: function (s) { return s >= wqbIdx(WC10, "through"); } },
steps: [
{ k: "read" },
wvRead("🐻‍❄️ The weeks that followed", wqQs("The weeks that followed were a study in contrasts—moments of quiet companionship at the palace hearth interrupted by the inevitable pull of the shards, the terrible necessity of the hunt.", "By my count—and I was counting now, scratching marks into the ice when she wasn't looking—there were perhaps a dozen shards left to gather. Maybe fewer.", "\"South,\" Glacia said, her voice flat with exhaustion. \"Far south. Past the pine forests, past the foothills. I can feel it pulling.\"") + wvsrc("Chapter 10"), "▶ Fly south"),
wvRead("🛷 Muffled", wqQs("\"It's strange,\" Glacia said at one point, more to herself than to me. \"The call feels... different. Muffled somehow. As if something is interfering with it.\"", "The landscape below us had changed dramatically. Snow gave way to muddy earth, then to the first hints of green.", "Glacia brought the sleigh down at the meadow's edge. We landed softly, and I climbed out, my paws sinking slightly into earth that was soft and rich, nothing like the permafrost of the north.") + wvsrc("Chapter 10"), "▶ Climb out"),
wvGo("shimmerOut", "Walk with her across the meadow, toward the shimmer in the air, like heat rising from sun-warmed stone", { r: 6, say: "🌼 " + wqQ("The flowers brushed against my fur, and their scent was overwhelming after so long in the sterile cold of the palace.") }),
wvRead("❄️ \"Even here\"", wqQs("Glacia walked beside me, her ice-crystal gown leaving frost on the flowers she passed. They wilted at her touch, their petals browning and curling, and I saw her notice it with a tightening around her eyes.", "\"I kill everything I touch,\" she murmured. \"Even here.\"", "I wanted to tell her that wasn't true, that she'd saved me, that her touch had brought me back from the edge of death. But I had no voice, so I just pressed closer to her side as we walked.") + wvsrc("Chapter 10"), "▶ Through the shimmer"),
wvId("through", wvGo("wiltPath", "Go through the shimmer, into the meadow beyond, and on", { r: 8, say: "✨ " + wqQ("The shimmer grew stronger as we approached. It hung in the air like a curtain, and through it I could see more meadow, more flowers, more impossible beauty.") })),
wvPuzzle("🐻‍❄️ A thought", "The flowers out of season, everywhere. What do you think, looking at it all?", ["What a strange garden", "Nothing; you have no words", "This is dangerous"], 0, ["", "You have words. Try them.", "Not yet."], { yes: "🗣️ " + wqQ("\"What a strange garden,\" I said.") }),
wvRead("🗣️ \"You're speaking\"", wqQs("The words came out clear and perfect, and for a moment neither of us registered what had happened. Glacia nodded absently, still focused on the shimmer.", "\"Glacia,\" I said, testing it, and her name came out in my voice—not a bear's rumble, but the voice I'd had before the curse, deep and resonant and unmistakably human.", "\"You're speaking,\" she whispered. \"You're... how are you speaking?\"", "\"We're not in the mortal realm anymore,\" Glacia said slowly, realization dawning on her face. \"We crossed a boundary. This is... this is one of the seasonal realms.\"") + wvsrc("Chapter 10"), "▶ The warmth"),
wvHold("wiltPath", 5, "The warmth rolls over you both like a wave. Stay beside her while she staggers", { r: 6, say: "❄️ " + wqQ("She was caught between them, and the war was tearing her apart.") }),
wvRead("🗣️ \"We should go back\"", wqQs("\"We should go back,\" I said, my new voice urgent. \"This is hurting you.\"", "\"No.\" She straightened with visible effort, her jaw set. \"The shard is here. I can feel it. I have to—\"", "\"Sister?\"", "The voice came from everywhere and nowhere, warm as summer honey and bright as morning sun.") + wvsrc("Chapter 10"), "▶ Turn"),
wvId("talia", wvGo("springIn", "Go back toward the voice; a woman steps out of the shimmer as if she'd always been there", { r: 8 })),
wvTalk("Talia", "Talia, Queen of Spring", ["🌸 Talia", wqQs("\"Glacia?\" The woman's face lit up with joy, then immediately crumpled into distress. \"Oh, sister, what happened to you?\"", "\"A shard?\" Talia pulled back, her brow furrowed in confusion. \"What shard? Why would you be... oh, but you're here! It's been so long! I've been meaning to visit but I...\" She trailed off, her expression going distant. \"Why haven't I visited? I can't quite...\"", "\"And Old Man Winter!\" She turned to me, her smile returning. \"Though why are you...?\" She tilted her head, studying my bear form with obvious confusion. \"This isn't your usual shape. Did you and Glacia come together? How wonderful! But why a bear? Is this some new fashion?\"", "\"You must stay!\" she declared, clapping her hands together. \"Both of you!") + wvsrc("Chapter 10"), "▶ Follow her"]),
wvGo("cottageDoor", "Follow her through gardens that defy description, to the cottage", { r: 6, say: "🌳 " + wqQ("Trees heavy with fruit lined paths of soft grass, and the air hummed with bees and butterflies and the songs of birds I'd never heard before.") }),
wvRead("🏡 The cottage", wqQs("\"Here we are!\" Talia announced, and a cottage appeared before us.", "It was perfect! Thatched roof, climbing roses, windows that gleamed in the eternal noon sun. Smoke curled from the chimney, and the door stood open in welcome.", "\"I can speak,\" I said quietly, still amazed by it. \"Glacia, I can actually speak to you.\"", "She glanced at me, and something complicated crossed her face—wonder and pain and something that might have been joy. \"The realm's magic,\" she said. \"It must grant speech to animals. A gift of spring, perhaps.\"") + wvsrc("Chapter 10"), "▶ Go in"),
wvId("cottage", wvMoveRead("🍞 The table", wqQs("The interior was as warm and welcoming as the exterior promised. A fire burned in the hearth—real fire, not the cold flames of Glacia's palace—and the room was filled with comfortable furniture and the smell of baking bread.", "\"Sister?\" Talia touched her arm gently. \"When did you last eat?\"", "\"I...\" Glacia's voice was barely a whisper. \"I don't remember. I haven't needed to. The shard...\"") + wvsrc("Chapter 10"), "▶ Sit", "cottageFloor", "🏡 <b>Talia's cottage</b>")),
wvFind("fruit", "cottageFloor", "Bread and honey and berries", "Talia pushes a plate toward you. Eat", { verb: "eat", say: "🍯 " + wqQ("It was the best meal I'd had in a century, made better by the simple fact of sharing it with others.") }),
wvRead("🍞 Almost", wqQs("Glacia picked up a piece of bread with trembling hands. She stared at it for a long moment, then slowly brought it to her lips.", "\"Good?\" Talia asked gently.", "Glacia nodded, not trusting her voice, and took another bite.", "We ate in relative silence, Talia's chatter fading to a comfortable quiet. And for a little while, in that warm cottage with food and company, we were almost normal. Almost a family sharing a meal.", "Almost.") + wvsrc("Chapter 10"), "▶ Time moved strangely"),
wvId("rest", wvSpotAt("The guest chamber", "go through", "cottageTable", "Talia gives you a room: go through to the guest chamber", function () { }, { r: 4 })),
wvGo("guestRug", "Settle on the soft rugs on the floor", { r: 2.4, say: "🛏️ " + wqQ("The first night (if it could be called night), Glacia sat on the edge of the bed, staring at nothing.") }),
wvAsk("Glacia", "Glacia sits on the edge of the bed", ["❄️ \"I'd forgotten\""][0], wqQ("\"I'd forgotten,\" she said quietly. \"What it feels like to eat. To taste something. To sit at a table with others.\""), [
["You're remembering now.", wqQs("\"You're remembering now,\" I said, and the sound of my own voice still startled me. \"That's what matters.\"", "She looked at me, really looked at me, and I saw tears gathering in her eyes. \"Is it? Does it matter if I remember what I've lost when I can't get it back? When I'm still compelled to hunt, still forced to kill?\"")],
["Your heart is fighting.", wqQs("\"Your heart is fighting,\" I said. \"I can see it, Glacia. Every day it grows stronger. You're not lost. Not completely.\"", "She turned away, but not before I saw one tear escape, freezing on her cheek before it could fall.")]
], { btn: "Sleep" }),
wvHold("guestRug", 5, "Sleep, when you are tired; the sun never moves from noon", { r: 3 }),
wvId("morning", wvGo("tulips", "In the morning (or what passes for it), find Talia in her garden, tending a bed of tulips", { r: 6 })),
wvTalk("Talia", "\"There you are!\"", ["🌸 Talia", wqQs("\"There you are! I was just thinking about you. Or was I? Sometimes thoughts slip away like water.\" She frowned, then smiled again. \"No matter. You're here now. Come, walk with me.\"") + wvsrc("Chapter 10"), "▶ Walk with her"]),
wvGo("fountain", "Walk with her through the gardens, to the fountain", { r: 6 }),
wvRead("⛲ \"Something terrible happened\"", wqQs("\"Sister,\" she said at one point, stopping beside a fountain. \"Something terrible happened. I felt it. A long time ago, but I can't... I can't quite remember what it was.\"", "Glacia's hands clenched at her sides. \"The mirror,\" she said. \"A demon's mirror. It shattered, and the shards scattered across the world. One of them lodged in my chest.\"", "Talia's face crumpled with distress. \"Oh, Glacia. That's... that's terrible. We should help you. We should—\" She paused, her expression going distant. \"What were we talking about? Oh, look at these roses! Aren't they beautiful?\"", "\"But you're my sister,\" Talia whispered, tears streaming down her face. \"I should have found you. Should have...\" She blinked, and the tears stopped as suddenly as they'd started.") + wvsrc("Chapter 10"), "▶ Sit by the fountain"),
wvAsk("Glacia", "The three of you, by the fountain", ["❄️ By the fountain"][0], wqQ("We were sitting by the fountain, the three of us, when I finally asked the question that had been burning in me since I'd regained the ability to speak."), [
["Who were you, before the mirror?", wqQs("\"I was... gentler. I think. I struggled with my purpose—winter always seemed like death to me, while my sisters brought life. But I tried to find beauty in it anyway.\"", "\"You did more than try,\" Talia said, her voice unusually focused. \"You created the most beautiful things, sister. Do you remember? The frost patterns on windows. You'd spend days on a single pane of glass, creating scenes of such delicate beauty that children would press their faces against the cold just to see them better.\"", "\"And the ice sculptures,\" Talia continued, her eyes distant with memory. \"In the forests, where no one would see them but the animals. Deer made of ice that caught the moonlight. Wolves frozen mid-leap. Birds with wings spread wide. You said they were gifts. That winter could give gifts too, not just take them away.\"")],
["The shard does that. Not you.", wqQs("\"The shard,\" I said firmly. \"The shard does that. Not you.\"", "\"Does it matter?\" She turned to me, her face twisted with anguish. \"The hands are still mine. The lips that kiss death into people are still mine. I feel them die, Kael. I feel their warmth leave them, feel their hearts stop beating. And I can't stop. I can't—\"")],
["But you want to.", wqQs("\"But you want to,\" I said. \"That's what matters. The shard compels you, but you're fighting it. Every time it gets harder, that's you fighting. Every time you hesitate, every time you feel guilt or grief or doubt—that's the real you, breaking through.\"", "\"He's right,\" Talia said softly. \"I can see it, sister. Even through my scattered thoughts, I can see you're still in there. The Glacia who loved winter creatures and created beauty from ice. She's not gone.\"")]
], { btn: "Comfort her" }),
wvHold("fountain", 6, "Rest your head against her knee, and stay like that until her tears stop", { r: 6, say: "⛲ " + wqQ("She leaned into her sister's warmth and wept—for the century lost, for the lives taken, for the self she'd forgotten.") }),
wvId("alone", wvAsk("Talia", "Later, when Glacia has gone to rest, Talia examines you", ["🌸 Old Man Winter"][0], wqQ("\"Old Man Winter,\" she said, walking around me in a slow circle. \"I remember you, you know. Proud and powerful and utterly sure of yourself. What happened?\""), [
["A curse, from Gerda.", wqQs("\"A curse,\" I said. \"From a sorceress named Gerda. I... I hurt her. Said terrible things. The shard in my eye made me cruel, and she cursed me for it.\"", "Talia's expression grew troubled. \"Gerda. Yes, I remember her. Powerful. Possessive. She loved you desperately, didn't she?\"", "\"It's strong,\" she said. \"Bound with heartbreak and rage and very specific conditions. I can't break it. I'm sorry.\"")],
["Can you tell me anything about it?", wqQs("She frowned, concentrating. \"Curses born of heartbreak require heartbreak's opposite to break. Love, true and freely given. But there's something else...\" She trailed off, her attention drifting to a nearby butterfly.", "She blinked, focusing on me again. \"Something about... frozen hearts? The wording is strange. You must be loved by someone whose heart you've frozen. But that's impossible, isn't it? How can someone whose heart you've frozen love you?\"")]
], { btn: "Think", at: "tulips" })),
wvPuzzle("🐻‍❄️ The curse", "Say back to yourself what must break Gerda's curse.", ["Love, true and freely given, from someone whose heart you've frozen", "Gerda's forgiveness", "The last of the shards gathered"], 0, ["", "Talia said nothing of Gerda's forgiving.", "That is Glacia's quest, not your curse."], { yes: "🐻‍❄️ " + wqQ("My mind raced. Someone whose heart I'd frozen. But I'd never frozen anyone's heart. That was Glacia's curse, not mine. Unless...") }),
wvId("walk", wvGo("gardenWalk", "That evening, walk with Glacia alone through the gardens, the air sweet with jasmine", { r: 6, say: "🌼 " + wqQ("\"I can't stay much longer,\" Glacia said quietly. \"The shard is calling again. And I'm afraid... I'm afraid I'm hurting this place just by being here.\"") })),
wvRead("🗣️ \"Then tell me\"", wqQs("\"I've wanted to talk to you for so long,\" I said. \"There's so much I need to tell you. So much I've observed, so much I've felt.\"", "She stopped walking, turning to face me. \"Then tell me. While you still can.\"", "\"I was vain,\" I admitted. \"Before the curse. Proud and powerful and utterly sure of my own importance. The shard made me cruel, but the capacity for cruelty was already there. I hurt Gerda badly, and I deserved what she did to me.\"", "\"No one deserves to lose themselves,\" Glacia said softly.") + wvsrc("Chapter 10"), "▶ Tell her"),
wvCompel("🗣️ Devotion", wqQ("\"Maybe not,\" I said. \"But I'm learning things in this form that I never would have learned otherwise. Humility. Patience. The value of silence and observation.\" I paused. \"The meaning of devotion.\""), [wqQ("\"I'm devoted to you,\" I said simply. \"Not because of a curse or compulsion, but because I choose to be. I see you, Glacia. Not the Snow Queen, not the corrupted goddess, but you. And I'm not leaving.\""), wqQ("\"You're not a monster,\" I said firmly. \"You're a victim. And you're fighting. That's all anyone can ask.\"")], "Say it", { holdBtn: "Say it" }),
wvRead("❄️ The seed of it", wqQs("\"Then let me say this while I can.\" She took a shaky breath. \"Thank you. For staying. For seeing me. For making this bearable.", "\"You're stronger than you think,\" I said.", "\"Only because you're there,\" she whispered.", "It wasn't love. Not yet. But it was the seed of it, planted in frozen ground, waiting for the right moment to bloom.") + wvsrc("Chapter 10"), "▶ The last day"),
wvId("lastday", wvMoveRead("🏡 The last day", wqQs("On what we decided would be our last day in Talia's realm, we found her in the cottage, preparing a final meal.", "\"You're leaving,\" she said, not quite a question. \"I can feel it. Winter is restless here.\"") + wvsrc("Chapter 10"), "▶ Go to her", "cottageFloor", "🏡 <b>Talia's cottage</b>")),
wvTalk("Talia", "Talia, preparing a final meal", ["🌸 Talia", wqQs("\"I understand. But promise me you'll finish this. Gather all the shards. Something important waits at the end—I can feel it, even if I can't quite grasp what it is.\"", "\"And visit the others,\" Talia added, her expression growing distant. \"Alessia knows more than she says. She always does. She sees things clearly, our summer sister. And Cora... Cora remembers how to let things go. She understands transitions, thresholds. You'll need that wisdom.\"", "Then she turned to me, her expression unusually focused. \"Take care of my sister, Old Man Winter. Even in that form, you're still winter's hand. You belong together, you two. You always have.\"", "\"I will,\" I promised.") + wvsrc("Chapter 10"), "▶ ..."]),
wvId("blessing", wvFind("flower", "cottageFloor", "Talia's flower", "She presses something into Glacia's hand: a small flower, perfectly preserved", { verb: "look at", say: "🌸 " + wqQ("\"My blessing,\" she said. \"May you remember warmth even in the deepest cold.\"") })),
wvRead("🌸 \"It will cost you\"", wqQs("\"The last shard will be the hardest,\" she said as we prepared to leave. \"Or was it the first? Time is strange, and I can't quite... but something about the last one. It will cost you. Both of you.\"", "\"What do you mean?\" Glacia asked, but Talia's attention had already drifted.", "\"Look at the apple blossoms,\" she said dreamily. \"Aren't they beautiful?\"") + wvsrc("Chapter 10"), "▶ Leave her in her garden"),
wvId("leave", wvGo("springIn", "Walk back across the meadow toward the shimmering boundary", { r: 8, say: "❄️ " + wqQ("\"I don't want to go,\" Glacia admitted quietly. \"I don't want to go back to the cold and the hunting and the killing.\"") })),
wvRead("🗣️ Before we cross", wqQs("\"Kael,\" Glacia said, stopping just before the shimmer. \"Before we cross. Before you lose your voice again. I need you to know...\" She struggled with the words. \"These days have meant everything to me. Talking to you. Hearing your voice. Relearning who you are beneath the beast. I won't forget it.\"", "\"Neither will I,\" I said. \"And Glacia? When this is over, when the shards are gathered and the compulsion is broken—I'll find a way to speak to you again. I'll find a way to tell you everything I'm thinking, everything I'm feeling. I promise.\"", "She smiled, and it was the first real smile I'd seen from her—sad and small, but genuine. \"I'll hold you to that.\"") + wvsrc("Chapter 10"), "▶ Step through"),
wvId("out", wvGo("shimmerOut", "Step through the shimmer after her", { r: 6, say: "🐻‍❄️ " + wqQ("I tried to speak, to say one last thing, but my voice was gone. The words died in my throat, coming out as nothing but a bear's rumble.") })),
wvHold("shimmerOut", 4, "Move to her side; she rests her hand on your head", { r: 5, say: "❄️ " + wqQ("\"I know,\" she said softly, as if she could hear the words I couldn't speak. \"I know.\"") }),
wvGo("springLand", "Back to the sleigh; the shard's call pulls south and east", { r: 6 }),
wvRead("🌸 Even the longest winter", wqQs("We flew in silence, but it was a different silence than before. We'd been changed by those strange days in spring—reminded of what we'd lost, yes, but also given hope that it might be found again.", "The hunt continued. The compulsion drove us forward. But now we knew—both of us—that winter didn't have to last forever.", "Even the longest, coldest, cruelest winter eventually yields to spring.") + wvsrc("Chapter 10"), "▶ Close the chapter")
] });
var WC11 = wqbCh({ n: "Chapter 11", t: "The Bear Truth", txt: 11, as: "bear", start: "dreamFall", jump: 1, tune: "void", keep: ["eyefrost", "The frost around his eye", "👁️"],
words: "The bear dreams of falling, and of the mirror; he wakes with a roar that shakes the palace walls, and the shard in his eye is waking too. You are the bear.",
intro: "Falling, through nothing",
cast: [wvc("glacia", "hearthSeat", { key: "g1", from: "wake", until: "north", ry: 0.6 }), wvc("glacia", "sleighNorth", { key: "g2", from: "north", until: "home", follow: 1 }),
wvc("oldman", "oldRoom", { key: "oldman", from: "north", until: "woman", oz: -1.6, ry: 0 }), wvc("woodmother", "motherRoom", { key: "wm", from: "woman", until: "home", ox: 0.8, oz: -1.2, ry: 0 }),
wvc("glacia", "shardBox", { key: "g3", from: "home", until: "hearth", oz: 1.4, ry: Math.PI }), wvc("glacia", "hearthSeat", { key: "g4", from: "hearth", until: "dawn", ry: 0.6 }), wvc("glacia", "gates", { key: "g5", from: "dawn", oz: -3, ry: 0 })],
state: { coldfire: 1, scratch0: 1, scratch1: 1, scratch2: 1, scratch3: 1, mirrorWhole: function (s) { return s < wqbIdx(WC11, "hit"); }, mirrorBurst: function (s) { return s >= wqbIdx(WC11, "hit"); },
env: function (s) { return s >= wqbIdx(WC11, "north") && s < wqbIdx(WC11, "home") ? "aurora" : "frostnight"; } },
steps: [
{ k: "read" },
wvRead("🕳️ I was falling", wqQs("I was falling.", "—just falling through nothing. Through void. Through darkness so complete it had weight, pressing against me from all sides like a living thing.", "I tried to roar, to make some sound, but the void swallowed it. Swallowed everything. I was tumbling end over end through emptiness, and I couldn't tell if I was bear or man or something else entirely.", "Then I saw it.", "The mirror.") + wvsrc("Chapter 11"), "▶ Look at it"),
wvSpotAt("The mirror", "look into it", "dreamMirror", "It hangs suspended in the nothing: go toward it, and look", function () { }, { r: 6, say: "🪞 " + wqQ("All of me. Every version. Every choice. Every failure.") }),
wvId("hit", wvHold("dreamMirror", 4, "Reach for it: paws become hands become paws again; the distance collapses", { r: 6, say: "💥 " + wqQ("The impact was soundless but catastrophic. The mirror exploded outward in a storm of shards, each piece razor-sharp and glittering with malice.") })),
wvRead("🪞 My eye", wqQs("My eye.", "Over and over, the shard pierced my eye. I felt it enter, felt the cold corruption spread, felt myself changing. And each time it happened, I heard laughter.", "Gerda's laughter.", "\"You wished to be only Winter's Hand,\" her voice whispered from everywhere and nowhere. \"Now you shall be winter's beast.\"") + wvsrc("Chapter 11"), "▶ Wake"),
wvId("wake", wvMoveRead("🔥 I woke with a roar", wqQs("I woke with a roar that shook the palace walls.", "The pain in my eye was immediate and excruciating. Not the dull ache I'd grown accustomed to over the years, but a sharp, stabbing agony that felt like the shard was burrowing deeper, trying to reach my brain.", "The cold fire in the hearth flickered and flared in response to my distress, casting wild shadows across the ice walls.") + wvsrc("Chapter 11"), "▶ Press your paw to it", "hearthBear", "🔥 <b>The hall of the grand hearth</b>")),
wvHold("hearthBear", 4, "Press your paw against your eye socket, trying to ease the pressure", { r: 5, say: "👁️ " + wqQ("I'd known about it for a long time. How could I not?") }),
wvRead("❄️ Deterioration", wqQs("The weeks after Talia's realm were a study in deterioration.", "We continued the hunt, of course. The compulsion drove Glacia forward with relentless force, and I followed because I couldn't imagine doing anything else. The shard count climbed steadily: four hundred seventy, eighty, ninety.", "I won't describe them all in detail. You don't need to hear every horror, and I don't need to relive them. But I'll tell you about a few, so you understand what we were living through.") + wvsrc("Chapter 11"), "▶ The old man"),
wvId("north", wvMoveRead("🏚️ A remote village", wqQs("There was an old man in a remote village, his cottage half-buried in snow. He was alone—his wife dead, his children grown and gone to the cities.") + wvsrc("Chapter 11"), "▶ Follow her", "sleighNorth", "🌌 <b>The far north, a remote village</b>")),
wvGo("oldDoor", "Follow her to the cottage half-buried in snow", { r: 5 }),
wvGo("oldRoom", "She is at the door. Come in behind her", { r: 3, say: "👴 " + wqQ("When Glacia appeared at his door, he didn't run. Just looked at her with tired eyes and said, \"I wondered when you'd come for me.\"") }),
wvHold("oldRoom", 6, "She stands in his doorway for nearly five minutes, her hands trembling. Watch; you cannot speak", { r: 4, say: "❄️ " + wqQ("Finally, the compulsion won. It always did.") }),
wvReadA("❄️ The Winter's Kiss", wqQs("She performed the Winter's Kiss, and I watched the old man's eyes frost over, watched his body go rigid with cold. He survived—barely. When she pulled away, he was still breathing, but his skin had taken on a bluish tint that would never fully fade. He'd carry winter in his bones for whatever time he had left.", "Glacia retrieved the shard from his eye with shaking hands. She didn't look at him as she left, didn't acknowledge his gasped \"thank you\" for letting him live.", "But I saw her hands. They didn't stop trembling for hours.") + wvsrc("Chapter 11"), "<p>She takes the shard from the old man's eye. He lives, though the cold will stay in his bones; as she leaves, he whispers thank you.</p>" + wqQs("But I saw her hands. They didn't stop trembling for hours.") + wvsrc("Chapter 11"), "▶ Out to the sleigh", { done: function () { wqpFrozenAt("oldman"); } }),
wvGo("sleighNorth", "Back to the sleigh", { r: 6 }),
wvHold("sleighNorth", 5, "The flight home: the pain spikes, and you see double; two Glacias, two sleighs, two moons", { r: 8 }),
wvPuzzle("❄️ \"Are you all right?\"", wqQ("\"Kael?\" Her voice was sharp with concern. \"Are you all right?\""), ["Make a reassuring sound", "Roar", "Turn away"], 0, ["", "Not at her.", "She will only worry more."], { yes: "❄️ " + wqQ("I made a sound that I hoped was reassuring, but I could tell she didn't believe it.") }),
wvId("woman", wvGo("motherDoor", "The second I'll tell you about was worse: a young woman, in a cottage at the edge of a forest", { r: 6 })),
wvGo("motherRoom", "Behind Glacia, into the doorway", { r: 3, say: "👶 " + wqQ("She had a shard in her eye, and she had a baby—maybe six months old, sleeping in a cradle by the fire.") }),
wvRead("👶 \"Please\"", wqQs("When Glacia entered, the woman didn't beg for her own life. She begged for her child's.", "\"Please,\" she whispered, backing away with her hands raised. \"Please, I'll do anything. Just don't hurt my baby. She's innocent. She doesn't have a shard. Please.\"", "Glacia stood frozen in the doorway. I was behind her, and I could see her shoulders shaking.") + wvsrc("Chapter 11"), "▶ ..."),
wvHold("motherRoom", 3, "Your eye flares with pain so intense you nearly collapse", { r: 4, say: "👁️ " + wqQ("The world tilted sideways, and I stumbled, my shoulder hitting the doorframe.") }),
wvReadA("❄️ \"I'm sorry\"", wqQs("\"I'm sorry,\" Glacia whispered, and I couldn't tell if she was talking to the woman or to me or to herself.", "The extraction was quick but brutal. The woman fought, which made it worse. She clawed at Glacia's arms, tried to pull away, screamed for her baby. But the Winter's Kiss is inescapable once it begins. The cold spread through her body, freezing her from the inside out.", "She died. Not immediately—it took almost a minute, which is an eternity when you're watching someone's life drain away. Her eyes stayed open the whole time, fixed on the cradle where her baby was starting to wake and cry.") + wvsrc("Chapter 11"), wqQs("\"I'm sorry,\" Glacia whispered, and I couldn't tell if she was talking to the woman or to me or to herself.") + "<p>The Winter's Kiss is inescapable once it begins. The young mother does not live through it, and her baby wakes, and cries.</p>" + wvsrc("Chapter 11"), "▶ ...", { done: function () { wqpFallen("wm"); } }),
wvRead("👶 That sound", wqQs("I wanted to go to the child, to do something, but what could I do? I was a bear. I couldn't pick up a baby, couldn't feed it, couldn't comfort it. So I followed Glacia out into the snow, leaving the baby crying in a cottage with its dead mother.", "That sound followed us for miles.") + wvsrc("Chapter 11"), "▶ Home"),
wvId("home", wvMoveRead("✨ The circular chamber", wqQs("At the palace, Glacia went straight to the circular chamber and placed the shard in the box with all the others.") + wvsrc("Chapter 11"), "▶ Watch from the doorway", "shards", "✨ <b>The shard chamber</b>")),
wvPuzzle("🔢 How many now?", "She stands there, staring at the collection. How many?", ["Four hundred ninety-six", "Four hundred sixty-five", "Five hundred"], 0, ["", "Many more than that, now.", "Not yet."], { yes: "❄️ " + wqQ("\"Four hundred ninety-six,\" she said aloud, her voice hollow. \"How many more? How many more lives? How many more children left alone?\"") }),
wvCompel("👁️ Something else took over", wqQs("I looked at Glacia and felt... nothing.", "She was weak. Pathetic. Crying over mortals who meant nothing, who were less than insects in the span of eternity.", "She should be stronger. Colder. More like the true Snow Queen—the one who killed without hesitation, without remorse, without this ridiculous display of emotion."), [wqQ("Her voice was small, frightened, and some distant part of me recognized that I was scaring her."), wqQ("Then, like a wave crashing over me, the real me surged back."), wqQ("But I welcomed it. Anything was better than that cold, cruel clarity.")], "Fight it", { holdBtn: "Push the shard back down" }),
wvRead("❄️ \"Let me see\"", wqQs("\"Kael!\" Glacia was beside me in an instant, her hands hovering over me, uncertain. \"What's wrong? What happened?\"", "\"Let me see,\" she said softly.", "\"Kael, please. Let me help you.\"") + wvsrc("Chapter 11"), "▶ ..."),
wvPuzzle("👁️ Let her see?", "You are ashamed, and terrified of what you almost did. She persists, gently.", ["Slowly move your paw away from your eye", "Pull away from her", "Hide your face against the floor"], 0, ["", "She will not let you go.", "She is still there."], { yes: "❄️ " + wqQ("The area around my eye had changed. Frost patterns spread from the socket like cracks in ice, delicate and beautiful and wrong.") }),
wvTalk("Glacia", "She touches your face, just beside the eye", ["❄️ Glacia", wqQs("\"I know what this is,\" she whispered.", "\"You have a shard. Don't you?\"", "\"And you didn't... you couldn't tell me.\" Understanding, not accusation. \"Oh, Kael.\"", "\"We'll fix this,\" she said, her voice muffled against my fur. \"I don't know how yet, but we will.\"") + wvsrc("Chapter 11"), "▶ Nuzzle against her"], { at: "shards" }),
wvId("hearth", wvGo("hearthBear", "Follow her to the hearth; she gentles the cold fire to a soft blue", { r: 6, say: "🔥 " + wqQ("\"Come,\" she said. \"Rest by the fire. Let me help with the pain.\"") })),
wvHold("hearthBear", 6, "Lie down, your head on your paws, while her hand moves through your fur", { r: 5, say: "❄️ " + wqQ("\"I know what that's like,\" she whispered. \"The thoughts that aren't yours. The coldness that feels so right in the moment and so horrifying after. Fighting against your own mind, your own heart.\"") }),
wvRead("❄️ \"I don't know what I would do without you\"", wqQs("\"I don't know what I would do without you.\"", "\"Talia said to visit the others,\" Glacia said eventually. \"Alessia especially. She said Alessia knows more than she says, that she sees things clearly.\"", "\"And there's a shard calling from that direction anyway. South and west. Toward summer.\" She paused, her hand resuming its gentle stroking. \"We'll go to Alessia. She's powerful. If anyone can help you, it's her.\"") + wvsrc("Chapter 11"), "▶ ..."),
wvPuzzle("❄️ \"Can you travel?\"", wqQ("\"Can you travel?\" Glacia asked, studying my face with concern. \"Is it too much?\""), ["Shake your head firmly", "Nod", "Look away"], 0, ["", "It is not too much.", "For her, you could do anything."], { yes: "❄️ " + wqQ("She touched my face gently, her cold fingers tracing the frost patterns around my eye. \"Then we go at dawn.\"") }),
wvHold("hearthBear", 8, "That night, neither of you sleeps. Lean into her touch", { r: 5, say: "❄️ " + wqQ("\"Kael,\" she said quietly, breaking the long silence. \"Whatever happens. Whatever we find out. Thank you for staying.\"") }),
wvId("dawn", wvGo("gates", "First light through the ice walls: follow her to the palace gates", { r: 10 })),
wvRead("☀️ Toward summer", wqQs("At the palace gates, she paused and turned to me. Her hand came up to rest on my head, and we stood like that for a long moment—a goddess and a beast, a victim and a victim, two broken things trying to become whole.", "\"Let's go find some answers,\" she said.", "We flew toward summer, toward answers, toward whatever fate awaited us.", "Together.") + wvsrc("Chapter 11"), "▶ Close the chapter")
] });
var WC12 = wqbCh({ n: "Chapter 12", t: "The Summer Palace", txt: 12, as: "bear", start: "summerIn", jump: 1, tune: "court", keep: ["ember", "The ember, burning brighter", "🔆"],
words: "South and west, toward summer, toward Alessia: the sister who sees through illusions, the sister who planted the ember. You are the bear, and here you can speak.",
intro: "The realm of Summer",
cast: [wvc("glacia", "summerIn", { key: "gF", until: "room", follow: 1 }), wvc("glacia", "summerWindow", { key: "gW", from: "room", until: "feast", ry: Math.PI }), wvc("glacia", "pavilion", { key: "gP", from: "feast", until: "fire", ox: -2, oz: -1.4, ry: 0 }),
wvc("glacia", "firepitSeat", { key: "gFi", from: "fire", until: "walk", ox: -1.4, ry: Math.PI }), wvc("glacia", "twilightWalk", { key: "gT", from: "walk", follow: 1 }),
wvc("alessia", "summerMeet", { key: "a1", from: "meet", until: "palace", oz: -5, ry: Math.PI }), wvc("alessia", "pavilion", { key: "a2", from: "feast", until: "fire", ox: 2, oz: 1.4, ry: Math.PI }),
wvc("alessia", "firepit", { key: "a3", from: "fire", until: "walk", oz: -6, ry: 0 }), wvc("alessia", "summerOrchard", { key: "a4", from: "morning", oz: -3, ry: Math.PI })],
state: { env: function (s) { if (s >= wqbIdx(WC12, "out"))
return "lateautumn"; if (s >= wqbIdx(WC12, "feast") && s < wqbIdx(WC12, "morning"))
return "goldeve"; return null; } },
steps: [
{ k: "read" },
wvRead("🛷 We flew for hours", wqQs("We flew for hours.", "My eye throbbed with each beat of my heart, a steady reminder of the corruption growing inside me.", "\"The shard is pulling south and west. But there's something else.\" She paused, her hands tightening on the sleigh's reins. \"Talia said we should visit the others. Alessia and Cora. I think... I think we need to find Alessia.\"", "\"There,\" she said finally, pointing ahead.", "I followed, and the world changed.") + wvsrc("Chapter 12"), "▶ Into the heat"),
wvId("meet", wvGo("summerMeet", "Through the portal: the heat hits you like a physical blow. Stay at her side", { r: 6, say: "☀️ " + wqQ("She staggered, her hand flying to her chest where the shard rested.") })),
wvTalk("Alessia", "\"I've been waiting for you\"", ["☀️ Alessia", wqQs("\"I've been waiting for you.\"", "\"Sister.\" She moved forward with purpose, her hands already rising. \"A century is far too long.\"", "\"I know,\" she said quietly. \"I know what you carry. What he did to you. Hold still.\"", "Alessia turned to me, and recognition flashed immediately in her eyes. \"Old Man Winter,\" she said, and there was respect in her voice. \"Ice King. Winter's Hand.\"", "\"There,\" Alessia said, lowering her hands. \"You can breathe now. Both of you.\"") + wvsrc("Chapter 12"), "▶ ..."]),
wvHold("summerMeet", 4, "Hold still as she examines you; her hand comes up toward your eye", { r: 6, say: "☀️ " + wqQ("\"You both carry his corruption,\" she said, and her voice was heavy with old anger. \"This is worse than I feared it would be.\"") }),
wvPuzzle("🗣️ Words", "You open your mouth, desperate to ask, to beg for help. What do you say?", ["Can you help us?", "(Roar)", "Nothing"], 0, ["", "Words, this time. They are there.", "Not now."], { yes: "🗣️ " + wqQ("My voice. My actual voice, deep and resonant and unmistakably human. The relief that flooded through me was so intense I nearly collapsed.") }),
wvRead("☀️ \"I cannot break this\"", wqQs("Alessia looked at me with something that might have been sympathy. \"I can ease your suffering. But the curse...\"", "\"I cannot break this,\" she said finally. \"The conditions must be met. But I can ease the pain somewhat.\"", "\"The shard and the curse are tangled together,\" Alessia continued, her voice troubled. \"They're feeding each other, making both worse. Breaking one might affect the other, but I can't predict how.\"") + wvsrc("Chapter 12"), "▶ Follow her"),
wvGo("summerOrchard", "Follow her through gardens that defy description", { r: 8, say: "🍑 " + wqQ("Bees moved lazily from flower to flower, and cicadas sang in the trees, and somewhere in the distance I could hear the splash of fountains.") }),
wvId("palace", wvGo("summerSteps", "On, until the palace rises before you", { r: 8 })),
wvRead("🏛️ The palace", wqQs("It was made of golden stone that seemed to glow from within, all soaring columns and graceful arches open to the sky. Fountains played in courtyards, and gardens grew everywhere—climbing up walls, spilling over balconies, woven into the very architecture.", "It was a place of power and abundance, of life celebrated and cherished. Everything Glacia's ice palace was not.", "I glanced at her and saw her staring at it with an expression I couldn't quite read—wonder and pain and something that might have been longing.") + wvsrc("Chapter 12"), "▶ Go up"),
wvGo("summerCourt", "Up the steps, into the courtyard of fountains", { r: 6 }),
wvGo("summerArch", "Through an archway into a cool, spacious room", { r: 4 }),
wvId("room", wvMoveRead("🛏️ The cool room", wqQs("The room was large and comfortable, with soft furnishings in warm colors and windows that looked out over the gardens. There was a bed for Glacia and thick rugs on the floor where I could rest.", "\"I'll leave you to settle in,\" Alessia said. \"We'll eat at sunset. Well—\" she smiled slightly, \"what passes for sunset here. The sun never quite sets in summer, but it knows how to make a beautiful evening.\"") + wvsrc("Chapter 12"), "▶ ...", "summerRug", "🛏️ <b>The guest room in the Summer Palace</b>")),
wvAsk("Glacia", "She turns from the window, tears on her face", ["❄️ \"I'd forgotten\""][0], wqQ("\"I'd forgotten,\" she whispered. \"What it was like to be in a place like this. To be welcomed. To be...\" She couldn't finish."), [
["(Press against her)", wqQs("I moved to her side and pressed against her leg, and she sank down to sit on the floor beside me, her hand coming up to rest on my head.", "\"Thank you,\" she said quietly. \"For being here. For staying.\"")],
["There's nowhere else I would rather be.", wqQs("\"There's nowhere else I would rather be,\" I said, and the words felt like a gift I'd been waiting to give her. \"I would follow you to the end of the world if you asked.\"", "She looked at me, her eyes bright with tears. \"You already have.\"")]
], { btn: "To the feast" }),
wvId("feast", wvMoveRead("🍷 The feast", wqQs("The evening light was golden and soft, the sun hanging at that perfect angle that makes everything beautiful. We gathered in an outdoor pavilion, open to the gardens, with a table laden with food that made my mouth water.", "Summer's abundance was on full display: ripe fruits cut open to show their jewel-like flesh, grilled meats fragrant with herbs, fresh vegetables in colors I'd almost forgotten existed.") + wvsrc("Chapter 12"), "▶ Sit", "pavilionSeat", "🍷 <b>The pavilion</b>")),
wvFind("fruit", "pavilionSeat", "A plate of your own", "On the floor beside her, a plate of your own: eat", { verb: "eat", say: "🍑 " + wqQ("It was strange and wonderful to eat real food again, to taste something other than raw meat.") }),
wvAsk("Alessia", "\"Tell me about your journey\"", ["☀️ Over the meal"][0], wqQ("\"Tell me about your journey,\" Alessia said as we ate. \"How did you find each other?\""), [
["(Glacia tells her)", wqQs("So Glacia told her—haltingly at first, then with more confidence. About finding me wounded at her gates, about the cold fire and the healing, about the weeks that followed.", "\"And Talia?\" she asked. \"How was she?\"", "\"Scattered,\" Glacia said softly.")],
["More each day.", wqQs("She turned to me. \"And you, Ice King? What do you remember of before?\"", "\"More each day,\" I said, still marveling at the ability to speak. \"The cold fire helped. Being in the magic realms helps. But there are still gaps. Still pieces missing.\"", "\"Did she?\" Alessia looked at me thoughtfully. \"You're here. You stayed with Glacia when you could have run. You've been fighting the corruption in your eye, fighting to remember, fighting to help. That doesn't sound like a mindless beast to me.\"")]
], { btn: "Go on" }),
wvRead("❄️ Three seconds of snow", wqQs("\"Do you remember,\" she said to Glacia, \"when you were young—well, younger—and you tried to make it snow in my realm?\"", "\"It snowed. For exactly three seconds. Three perfect, beautiful seconds of snowflakes in summer.\" Alessia laughed, and the sound was warm and genuine. \"Then they melted, of course. But you were so proud. You danced around like you'd conquered the world.\"", "Something crossed Glacia's face—surprise, then wonder, then something that might have been joy. And then, impossibly, she laughed.", "Alessia smiled, and there was triumph in it. \"There you are, sister. Still in there, I see.\"") + wvsrc("Chapter 12"), "▶ To the fire"),
wvId("fire", wvGo("firepitSeat", "Follow Alessia to the fire pit in the garden, and settle close beside Glacia", { r: 4, say: "🔥 " + wqQ("\"Now,\" she said, her voice losing its lightness, becoming serious. \"Let me tell you about the demon who destroyed my sister.\"") })),
wvRead("🔥 Malakar", wqQs("\"His name is Malakar,\" Alessia began. \"The Architect of Sorrow. The Lord of Reflection. He is a high-ranking demon whose domain is distortion, obsession, and perpetual doubt. He doesn't destroy through raw power", "\"Why?\" Glacia's voice was barely a whisper. \"Why me?\"", "Alessia's expression was full of sorrow and anger. \"Because you were vulnerable, sister. Because you struggled with your purpose, saw winter as death while the rest of us brought life. That self-doubt, that insecurity—it was the crack he needed.\"") + wvsrc("Chapter 12"), "▶ The mirror"),
wvAsk("Alessia", "Across the fire from you", ["🪞 The mirror"][0], wqQ("\"The mirror,\" I said. \"Tell us about the mirror.\""), [
["What is it?", wqQs("Alessia nodded. \"The Speculum Aeterna. The Eternal Mirror. Or, more accurately, the Mirror of Unattainable Desires.\" She paused, letting the words sink in. \"It doesn't show reality, Glacia. It shows what the viewer most desperately wants to see. What they want so badly they'll do anything to have it.\"")],
["The perfect winter. It wasn't real?", wqQs("\"It was a lie,\" Alessia said gently. \"A beautiful, terrible lie designed specifically for you.")],
["The shattering?", wqQs("\"The shattering wasn't an accident,\" Glacia whispered. \"It was the plan.\"", "\"Yes,\" Alessia confirmed. \"The shards scattered across the mortal world, lodging in people's eyes, corrupting their perceptions. And the largest shard—the command center—lodged in your chest.\"")]
], { btn: "..." }),
wvRead("❄️ \"For his power\"", wqQs("\"It compels you to gather the others,\" Alessia said. \"You've been completing the ritual of your own enslavement.", "She stood abruptly, frost spreading from her feet despite Alessia's shield. \"I've murdered hundreds for his amusement!\"", "\"For his power,\" Alessia corrected, standing as well. \"Your suffering, their deaths, the chaos you've spread—it all feeds him. Makes him stronger.\"") + wvsrc("Chapter 12"), "▶ Go to her"),
wvHold("firepitSeat", 5, "Rise and go to her; press your bulk against her back", { r: 4, say: "❄️ " + wqQ("She grabbed my fur with both hands, holding on as if I were the only solid thing in a world that had turned to quicksand.") }),
wvRead("☀️ \"I don't know\"", wqQs("\"The curse and the shard are feeding each other,\" Alessia said. \"That's why your condition is deteriorating. They're tangled together, each making the other stronger.\"", "Glacia looked down at me, her eyes wide with fear. \"What do we do? If gathering the shards enslaves me completely, if his shard is killing him—what do we do?\"", "Alessia's face was troubled. \"I don't know.\"", "The admission hung in the air like a death sentence.") + wvsrc("Chapter 12"), "▶ ..."),
wvRead("🔆 The ember", wqQs("\"There is one thing,\" she said. \"Something Malakar doesn't know about.\"", "She raised her hand, and golden light gathered in her palm. \"I reached across dimensions, found your heart in the moment of corruption, and I planted something. A seed. An ember of pure summer warmth.\"", "She gestured between us. \"Every day you've spent together, every moment of care and companionship—it's made the ember burn brighter. You're waking up, Glacia. Coming back to yourself.\"", "\"Love is the opposite of corruption,\" Alessia said simply. \"Malakar thought he'd won. But he didn't count on you being loved.\"") + wvsrc("Chapter 12"), "▶ ..."),
wvCompel("🗣️ Strong enough", wqQ("But Alessia's expression remained troubled. \"I don't know if it's enough. The compulsion is still there. You still have to complete the mirror. I don't know what happens at the end, whether the ember is strong enough to save you.\""), [wqQ("\"Then we make it strong enough,\" I said, turning to look at Alessia. \"We have time before the last shard. We use it.\""), wqQ("Alessia studied me for a long moment, then nodded slowly. \"Yes. Perhaps that's exactly what you need to do.\"")], "Say it", { holdBtn: "Say it" }),
wvId("walk", wvGo("twilightWalk", "Later, walk with Glacia through the gardens under the golden twilight", { r: 8, say: "❄️ " + wqQ("\"I've been a weapon,\" Glacia said quietly. \"A tool. For a century.\"") })),
wvAsk("Glacia", "She stops walking, and turns to face you", ["❄️ Under the twilight"][0], wqQ("\"I want to believe that. I want to believe there's still something worth saving underneath all this ice and death.\""), [
["You've been a victim.", wqQs("\"You've been a victim,\" I said.", "\"Does it matter? The people are still dead.\"", "\"It matters. Intent matters. The you beneath the corruption wouldn't have done those things.\"")],
["There is. I've seen her.", wqQs("\"There is,\" I said firmly. \"I've seen her. The woman who saved a wounded bear. Who created cold fire just to keep him warm. Who sits by the hearth and talks to him even though he can't answer. Who cries for the people she's forced to kill. That woman is worth saving.\"")],
["It's been growing since the night you saved me.", wqQs("\"Alessia said the ember grows with love,\" she whispered.", "\"I think,\" I said carefully, \"it's been growing since the night you saved me.\"", "Her eyes were bright with tears. \"When this is over. If we survive this. I want—\"", "\"Me too,\" I said quietly, understanding what she couldn't say.")]
], { btn: "..." }),
wvHold("twilightWalk", 6, "She leans forward and presses her forehead against yours", { r: 5, say: "🔆 " + wqQ("a goddess and a cursed force of nature, two broken things trying to become whole, love growing in the warmth of summer's garden.") }),
wvId("morning", wvGo("summerOrchard", "In the morning, Alessia finds you in the gardens", { r: 8 })),
wvTalk("Alessia", "\"You need to see Cora\"", ["☀️ Alessia", wqQs("\"You need to continue your journey,\" she said without preamble. \"You need to see Cora.\"", "\"She understands endings. Transitions. Thresholds. The space between what was and what will be.\"", "She turned to me. \"Your shard will worsen too. The corruption will try to take you completely. Be prepared.\"", "She turned to me. \"Protect her, Ice King. Not just from others, but from herself when the compulsion overwhelms. And let her protect you too. You'll need each other for what's coming.\"") + wvsrc("Chapter 12"), "▶ ..."]),
wvFind("jar", "summerOrchard", "Summer's supplies", "She gives you supplies: food that won't spoil, water that never runs dry, small magics for the journey", { verb: "take" }),
wvId("out", wvGo("summerIn", "Back through the gardens to the hidden portal", { r: 6, say: "☀️ " + wqQ("\"Never,\" Alessia said fiercely. \"You're my sister. I will never give up on you.\"") })),
wvGo("summerOut", "Step through the portal", { r: 6, say: "🐻‍❄️ " + wqQ("The heat vanished instantly, replaced by the cooler air of the mortal realm. Alessia's shields disappeared, and I felt the loss of my voice like a physical blow.") }),
wvGo("summerSleigh", "To the sleigh", { r: 6 }),
wvPuzzle("❄️ \"Together?\"", wqQ("\"West and north,\" she said, her hand coming to rest on my head. \"To autumn's realm. To Cora. To learn how this ends.\""), ["Nod, and press closer to her side", "Shake your head", "Look back at Summer"], 0, ["", "Never that.", "Summer is behind you now."], { yes: "❄️ " + wqQ("\"Together,\" she affirmed.") }),
wvRead("🔆 Maybe enough", wqQs("The ember was growing. Love was growing. And maybe") + wqQs("—just maybe—it would be enough.") + wvsrc("Chapter 12"), "▶ Close the chapter")
] });
var WC13 = wqbCh({ n: "Chapter 13", t: "The Burden of Knowing", txt: 13, as: "bear", start: "summerOut", jump: 1, tune: "frost", keep: ["resolve", "\"Whatever price must be paid\"", "⚖️"],
words: "Back in the mortal realm, your voice is gone again, and Glacia knows now what she has been made to do. Five days west and north, toward Cora. You are the bear.",
intro: "The mortal side of Summer's portal",
cast: [wvc("glacia", "summerOut", { key: "gF", follow: 1 }), wvc("thomas", "emptySquare", { key: "thomas", from: "village", until: "oaks", ry: 0.4, mute: 1 })],
state: { env: function (s) { var r = wqbIdx(WC13, "rest"), v = wqbIdx(WC13, "village"), o = wqbIdx(WC13, "oaks"); if (s >= o)
return "golden"; if (s >= v)
return "firstfrost"; if (s >= r)
return "frostnight"; return "lateautumn"; } },
steps: [
{ k: "read" },
wvRead("🐻‍❄️ A door slamming shut", wqQs("The moment we crossed back into the mortal realm, the weight of everything Alessia had told us settled over Glacia like a shroud.", "I felt the loss of my voice like a door slamming shut.", "\"A century,\" she whispered. \"A century of being his puppet. His weapon. His tool.\"") + wvsrc("Chapter 13"), "▶ Go to her"),
wvHold("summerOut", 4, "Move to her side and press against her shoulder", { r: 5, say: "❄️ " + wqQ("\"Every death. Every scream. Every child left orphaned.\" Her voice was hollow, empty of everything except grief.") }),
wvGo("summerSleigh", "She turns from the portal at last, moving like someone much older; follow her to the sleigh", { r: 6 }),
wvRead("❄️ \"How do I live with this?\"", wqQs("\"How do I live with this?\" she asked quietly. \"How do I keep going, knowing what I've done? What I've been made to do?\"", "She looked up at me, and something in her expression cracked. \"You can't even answer me anymore. Can't tell me it will be alright. Can't tell me I'm not a monster.\"") + wvsrc("Chapter 13"), "▶ Hold her gaze"),
wvHold("summerSleigh", 5, "Hold her gaze, and try to say everything you cannot", { r: 6, say: "🐻‍❄️ " + wqQ("*You're not a monster. You're a victim. You're fighting back. You're still in there, still fighting, still worth saving.*") }),
wvId("rest", wvMoveRead("🛷 West and north", wqQs("Frost on fields that should have been green. Ice forming on rivers that shouldn't freeze for months yet. Trees with leaves that had turned brown and brittle, falling too early, dying too fast.", "\"It's spreading,\" Glacia said on the second day, her voice tight with fresh guilt. \"My corruption. My winter. It's bleeding into the world, making everything colder, harsher. Killing things that should still be alive.\"") + wvsrc("Chapter 13"), "▶ The third day", "restClear", "🌲 <b>A small clearing, to rest</b>")),
wvGo("restFire", "Lie down by the cold fire she has made, and try to will the pain away", { r: 3 }),
wvPuzzle("❄️ \"It's getting worse again\"", wqQ("\"It's getting worse again,\" she said softly. \"Isn't it?\""), ["Nod, just once", "Shake your head", "Turn away"], 0, ["", "You can't lie to her.", "You can't pretend."], { yes: "❄️ " + wqQ("Her expression crumpled. \"This is my fault. If I hadn't been so weak and easy to corrupt, if I hadn't shattered the mirror, you wouldn't have a shard in your eye.") }),
wvHold("restFire", 4, "Push yourself up and press your forehead against hers", { r: 4, say: "❄️ " + wqQ("\"I can't lose you,\" she whispered against my fur. \"I can't. You're the only thing keeping me sane. The only thing that makes this bearable.") }),
wvRead("❄️ That night", wqQs("That night, as we rested under a sky heavy with premature snow clouds, Glacia talked to me.", "\"Part of me wants to fight it. Wants to refuse. To say no, I won't be his puppet anymore, I won't kill another person for his amusement.\" Her voice hardened. \"I'm so angry, Kael. So furious that he did this to me.", "The anger in her voice was new. Raw. Alive in a way the cold emptiness had never been.", "\"How do I atone for that? How do I make amends for a century of murder? Even if it wasn't my choice, even if I was corrupted—they're still dead. Still gone. Still never coming back because of me.\"") + wvsrc("Chapter 13"), "▶ Let her cry"),
wvHold("restFire", 8, "Hold still, and let her speak her grief and guilt and rage into the darkness", { r: 4, say: "🐻‍❄️ " + wqQ("So I just held still and let her cry, let her speak her grief and guilt and rage into the darkness, let her use me as the anchor she needed.") }),
wvId("village", wvMoveRead("🏚️ The fourth day", wqQs("On the fourth day, we flew over a village that had been abandoned. The houses stood empty, doors hanging open, possessions scattered in the streets as if the inhabitants had fled in panic. Frost covered everything, and in the town square, there was a statue.", "Not a statue. A person. Frozen solid, their face locked in an expression of terror.") + wvsrc("Chapter 13"), "▶ Follow her", "emptySleigh", "🏚️ <b>An abandoned village</b>")),
wvGo("emptySquare", "She walks to the frozen figure without a word; follow her into the square", { r: 6 }),
wvRead("❄️ Thomas", wqQs("\"I remember this one,\" she said quietly. \"Three years ago. Maybe four. The shard was in his right eye. He ran when he saw me coming. Tried to hide in his home. Barricaded the door.\"", "\"His name was Thomas. He had a wife. Two daughters. They watched me kill him. Watched me freeze him from the inside out. Watched me take the shard from his eye and leave his body standing there like a monument to my cruelty.\"", "\"This is what I am,\" she said. \"This is what I've done. And knowing it was a demon's plan doesn't change the fact that Thomas is dead.") + wvsrc("Chapter 13"), "▶ Go to her"),
wvGo("emptySleigh", "She walks back to the sleigh, mechanical. Climb up beside her", { r: 5 }),
wvHold("emptySleigh", 5, "Press your bulk against her side; she buries her face in your fur", { r: 6, say: "❄️ " + wqQ("\"I don't know if I can do this,\" she whispered. \"I don't know if I'm strong enough to keep going, knowing what I know. Knowing what's waiting at the end.\"") }),
wvHold("emptySleigh", 6, "Pull back enough to look at her face, and pour everything you feel into your gaze", { r: 6, say: "❄️ " + wqQ("\"You're the only good thing in my life,\" she said, her voice breaking.") }),
wvRead("⚖️ Determination", wqQs("\"I don't know what we are to each other. I don't know if what I feel is love or just desperate gratitude that I'm not alone anymore. But I know that losing you would destroy me. That you matter more than anything else in this cursed existence.\"", "When we finally continued our journey, something had shifted. The grief was still there, the guilt still crushing. But underneath it, there was something else. Determination.", "\"Even if it costs me everything,\" she continued. \"Even if it means my own destruction. I won't let him win. I won't let this century of death be for nothing.\"") + wvsrc("Chapter 13"), "▶ The fifth day"),
wvId("oaks", wvMoveRead("🍂 Where autumn still held sway", wqQs("By the fifth day, the landscape had changed again. The premature winter gave way to something else—a place where autumn still held sway. The trees here were dressed in gold and crimson and deep orange, their leaves falling in gentle spirals. The air smelled of earth and woodsmoke and the rich decay of the season's end.", "Glacia brought the sleigh down in a clearing surrounded by ancient oaks.") + wvsrc("Chapter 13"), "▶ Climb down", "oakSleigh", "🍂 <b>A clearing of ancient oaks</b>")),
wvCompel("👁️ The cruel thoughts", wqQ("My eye was worse than ever. The pain had become a constant companion, and the distorted flashes were coming more frequently. I'd catch myself looking at Glacia and thinking cruel thoughts—that she was weak, pathetic, unworthy of my time."), [wqQ("Then the real me would surge back, horrified, and I'd have to fight to push the corruption down again."), wqQ("It was exhausting. Terrifying. And getting harder every day.")], "Push it down", { holdBtn: "Fight it" }),
wvSpotAt("The threshold", "look, the way she looks", "threshold", "\"There,\" she says, pointing: walk with her toward a particular copse of trees, and look", function () { }, { r: 7, say: "🍂 " + wqQ("A cave mouth, hidden in the space between what was and what would be. A threshold that existed only for those who knew how to look.") }),
wvRead("🍂 Cora's realm", wqQs("\"Cora's realm,\" Glacia said softly. \"The space between summer and winter. The place where things end so other things can begin.\"", "She stood before the hidden entrance, and I saw her hesitate. Just for a moment. Just long enough for me to see the fear in her eyes.", "\"Whatever she tells us, whatever price must be paid—we face it together. Yes?\"") + wvsrc("Chapter 13"), "▶ ..."),
wvId("resolve", wvPuzzle("❄️ *Together?*", "She rests her hand on your head: the same question she asked when you left summer's realm.", ["Nod", "Shake your head", "Step back"], 0, ["", "Never.", "Not now; not ever."], { yes: "❄️ " + wqQ("\"Together,\" she said.") })),
wvRead("🍂 Into autumn's realm", wqQs("She took a breath, squared her shoulders, and stepped toward the threshold. I followed, staying close to her side, and together we crossed into autumn's realm.") + wvsrc("Chapter 13"), "▶ Close the chapter")
] });
var WC14 = wqbCh({ n: "Chapter 14", t: "The Truth of Twilight", txt: 14, as: "bear", start: "autumnCave", jump: 1, tune: "court", keep: ["door", "\"Welcome... to the final door\"", "🚪"],
words: "Through the threshold into Cora's realm, perpetual golden hour, and the sound of a trumpet through the oaks. You are the bear, and here your voice returns.",
intro: "Out of the cave, into the realm of Autumn",
cast: [wvc("glacia", "autumnCave", { key: "gF", until: "in", follow: 1 }), wvc("glacia", "cabaretTable", { key: "gT", from: "in", until: "dine", ox: -1.2, ry: Math.PI }), wvc("glacia", "coraDine", { key: "gD", from: "dine", until: "bed", ox: -2.6, oz: -1.8, ry: Math.PI / 2 }),
wvc("glacia", "coraBed", { key: "gB", from: "bed", until: "morning", ox: -1.2, oz: -0.4, ry: 0 }), wvc("glacia", "coraWindow", { key: "gW", from: "morning", until: "out", ry: Math.PI }), wvc("glacia", "thresholdOut", { key: "gO", from: "out", follow: 1 }),
wvc("corasuit", "cabaretStage", { key: "c1", from: "song", until: "beside", ry: 0, y: WQW_IN_Y + 1.2 }), wvc("corasuit", "cabaretTable", { key: "c2", from: "beside", until: "dine", ox: 1.4, ry: Math.PI }),
wvc("corasuit", "coraDine", { key: "c3", from: "dine", until: "bed", ox: 2.6, oz: -1.8, ry: -Math.PI / 2 }), wvc("corasuit", "coraBed", { key: "c4", from: "breakfast", until: "out", ox: 2, oz: 1.6, ry: Math.PI }), wvc("corasuit", "autumnCave", { key: "c5", from: "out", until: "through", oz: -6, ry: Math.PI })],
state: { env: function (s) { return s >= wqbIdx(WC14, "through") ? "greysky" : null; } },
steps: [
{ k: "read" },
wvRead("🍂 Golden hour", wqQs("The world changed the moment we crossed the threshold.", "The air was cool but not cold, carrying the scent of woodsmoke and ripe apples and something spiced I couldn't quite name.", "\"It's beautiful,\" I said, and my voice—my voice, returned again—sounded hushed in the stillness.", "Glacia looked at me, and I saw relief flash across her face at the sound of my words. \"It always was,\" she said softly. \"Cora's realm. I'd forgotten how much I loved it here.\"", "Then we heard the music.") + wvsrc("Chapter 14"), "▶ Follow the sound"),
wvGo("autumnMusic", "Follow the sound through a forest of oak and maple", { r: 10, say: "🎺 " + wqQ("The music grew louder with each step, the bass line becoming a heartbeat, the trumpet a voice calling us forward.") }),
wvGo("thresholdOut", "On, until the trees open up", { r: 8 }),
wvRead("🎭 The Threshold", wqQs("The music poured from inside, rich and full and alive.", "\"A cabaret?,\" I said, wonder coloring my voice.", "\"Burlesque,\" Glacia corrected, and there was affection in her tone. \"Cora always did love a good show.\"") + wvsrc("Chapter 14"), "▶ Go in"),
wvSpot("The door of The Threshold", "Push through the entrance", { at: "thresholdOut" }),
wvId("in", wvGo("cabaretTable", "Find a table near the back", { r: 3, say: "🍷 " + wqQ("We found a table near the back, and a server appeared—a fae woman with autumn leaves for hair—and placed drinks before us without being asked.") })),
wvId("song", wvRead("🎤 She commanded it absolutely", wqQs("She commanded it absolutely.", "\"She's incredible,\" I breathed.", "On stage, Cora began to sing.", "The velvet night is breathing in deep,", "A secret the sun was too afraid to keep.", "The air is pure silk, running cool on your skin,", "Tempting you, darling, to let the dark in.") + wvsrc("Chapter 14"), "▶ Listen")),
wvRead("🎤 To us", wqQs("\"She's singing to us,\" Glacia whispered, and I heard the tremor in her voice.", "Look close at the fruit, and you'll see the slow rot,", "The truth that desire can never be bought.", "Strip away the grief, that desperate, fast life,", "I'm sharing the promise that sharpened the knife.", "It's not just falling, it's a deliberate grace,", "The most beautiful surrender you'll find in this place.") + wvsrc("Chapter 14"), "▶ ..."),
wvHold("cabaretTable", 5, "Time slows. Not for the audience; for you two. Her eyes find you across the room", { r: 4, say: "🎤 " + wqQ("When she sang the next verse, I felt each word like a physical blow.") }),
wvRead("🚪 The final door", wqQs("You brought your sweet heat, and you brought your bright core,", "The ledger is marked, and it cries out for more.", "You must choose what to sacrifice for what lies before.", "Glacia's hand found mine under the table, her fingers ice-cold and trembling.", "\"Welcome... to the final door.\"") + wvsrc("Chapter 14"), "▶ The applause"),
wvId("beside", wvTalk("Cora", "In the space between one blink and the next, she is standing beside your table", ["🍂 Cora", wqQs("\"Darlings,\" she said, and her voice was warm and rich and full of affection. \"You came.\"", "\"Cora,\" she whispered. \"I've missed you.\"", "\"Old Man Winter,\" she said, and there was respect in her voice. \"The Ice King himself. What an honor.\"", "\"The honor is mine,\" I said, inclining my head. \"Your performance was... extraordinary.\"", "\"Oh, you're sweet.\" She grinned, and it transformed her face from beautiful to devastating. \"But we both know it was more than just a performance, don't we love? Come. Let's eat.") + wvsrc("Chapter 14"), "▶ Follow her"])),
wvSpot("A door that wasn't there before", "Follow her to a door that simply appears in the wall when she approaches it", { at: "cabaretDoor" }),
wvId("dine", wvGo("coraDineSeat", "The private dining room: settle beside Glacia's chair", { r: 3, say: "🕯️ " + wqQ("Candles floated in the air, their flames steady despite having no visible means of support.") })),
wvRead("🍷 \"To reunions\"", wqQs("\"To reunions,\" she said. \"To truth. And to the courage to face what must be faced.\"", "\"So,\" Cora said, settling back in her chair with the easy confidence of someone completely at home in their own skin. \"Tell me everything. How did you two find each other? What have my sisters told you? And more importantly—\" her eyes sparkled with mischief, \"—when did you fall in love?\"", "Glacia choked on her wine.", "I felt heat rise in my face—an odd sensation for a creature of winter.") + wvsrc("Chapter 14"), "▶ ..."),
wvRead("🍂 \"Doomed?\"", wqQs("\"Only to anyone with eyes,\" Cora said cheerfully. \"But don't worry. It's beautiful. Tragic and doomed, but absolutely beautiful. My favorite kind of love story.\"", "\"Doomed?\" I asked, and my voice came out rougher than I intended.", "Cora's expression softened. \"All love stories are doomed in one way or another, my sweet. That's what makes them worth telling. But we'll get to that. First, eat. Tell me about your journey. I want to hear everything.\"") + wvsrc("Chapter 14"), "▶ Eat"),
wvFind("fruit", "coraDineSeat", "Food that tastes like autumn itself", "Eat, and tell her everything", { verb: "eat" }),
wvAsk("Cora", "\"Let me tell you about death\"", ["🍂 Endings"][0], wqQ("\"Let me tell you about death,\" Cora said, settling back into her chair. \"Not the corrupted kind, not the murder and the horror that Glacia has been forced to commit. Real death. Natural death. The kind that's necessary for anything to grow.\""), [
["Then what is winter?", wqQs("\"It's the pause,\" Cora said. \"The rest. The necessary ending that allows for new beginnings. You can't have spring without winter. You can't have growth without dormancy. You can't have transformation without death.\"", "\"The end of summer,\" I said slowly. \"The beginning of winter.\"", "She turned back to Glacia. \"Winter isn't death, darling. Winter is rest. It's the world taking a breath, gathering strength, preparing for rebirth.")],
["But she has killed so many.", wqQs("Glacia's eyes were bright with tears. \"But I've killed so many people. Hundreds. How is that beautiful? How is that necessary?\"", "\"It's not,\" Cora said bluntly. \"That's the corruption. That's Malakar twisting your nature into something it was never meant to be. He took your power—the power to bring rest, to allow transformation—and turned it into murder. That's not you, Glacia. That's him.\"")],
["What price?", wqQs("\"What price?\" I asked, though I thought I already knew.", "Cora turned to me, and her eyes were ancient and knowing. \"That's not for me to say, Ice King. The threshold shows you the door, but you have to choose whether to walk through it. You have to choose what you're willing to sacrifice.\"")]
], { btn: "..." }),
wvRead("🎭 Shedding", wqQs("\"Let me tell you about the burlesque,\" she said, and her voice took on a different quality—still warm, still rich, but with an edge of something deeper. \"Do you know what it really is? What it represents?\"", "\"Performance,\" Glacia said. \"Transformation.\"", "\"But transformation requires death,\" I said, understanding dawning. \"The death of what we were.\"", "\"Yes.\" Cora's smile was sad and beautiful. \"And sometimes, darling, that death is literal.\"") + wvsrc("Chapter 14"), "▶ ..."),
wvCompel("🍂 \"What would you sacrifice?\"", wqQ("\"That kind of devotion,\" Cora said softly, \"is powerful magic. More powerful than any curse. More powerful than any demon's corruption. Love like that can break anything. Save anything. Transform anything.\" She paused."), [wqQ("\"I would,\" I said, and I meant it with every fiber of my being. \"For her, I would give up everything.\""), wqQ("—love and fear and desperate hope. \"Anything,\" she whispered. \"Everything. I would rather die than lose him.\"")], "Say it", { holdBtn: "Say it" }),
wvRead("🚪 One of two things", wqQs("\"Here's what I can tell you,\" Cora said. \"The mirror must be completed. The compulsion cannot be stopped. Glacia will gather the remaining shards because she has no choice. And when the last shard is placed, one of two things will happen.\"", "She held up one finger. \"Either Malakar's hold becomes absolute, and Glacia is lost forever, enslaved to a demon's will, an engine of death and suffering for all eternity.\"", "\"Just a chance?\" I asked.", "\"That's all anyone ever gets, darling.\" Cora's smile was sad. \"But it's a better chance than you had before. And it's a chance worth taking.\"") + wvsrc("Chapter 14"), "▶ ..."),
wvRead("🍂 \"You are not a monster\"", wqQs("\"I was closest to you,\" Cora said to Glacia, her voice soft. \"Before the shattering. Do you remember why?\"", "\"Because we understood each other,\" Cora said. \"We were the necessary darkness, the pause, the breath before the world began again. And we were beautiful, Glacia. So beautiful. We brought transformation. We brought change. We brought the death that allows for life.\"") + wvsrc("Chapter 14"), "▶ Go to her"),
wvHold("coraDineSeat", 6, "Glacia breaks down; Cora holds her. Press against her other side", { r: 4, say: "🍂 " + wqQ("\"Never,\" Cora said fiercely. \"You're my sister. I will never give up on you.\" She looked at me. \"And you, Ice King. Take care of her. Love her. And when the moment comes, be brave enough to do what must be done.\"") }),
wvSpot("A door, appearing as she nears it", "\"It's late. You should rest.\" Follow her through another door that appears", { at: "bedDoor" }),
wvId("bed", wvGo("coraBed", "A bedroom, intimate and cozy: settle on the floor beside the bed", { r: 3, say: "🛏️ " + wqQ("\"Sleep,\" Cora said. \"Dream. And in the morning, I'll send you on your way with my blessing.\"") })),
wvAsk("Glacia", "She turns to you; Cora has gone", ["❄️ \"I'm scared\""][0], wqQ("—fear and love and desperate hope. \"I'm scared,\" she whispered."), [
["So am I.", wqQs("\"So am I,\" I admitted. \"But we're together. That has to count for something.\"")],
["I know.", wqQs("She sank down onto the floor beside me, her hand coming up to rest on my head. \"When this is over—if we survive this—I want to tell you something. Something I should have said already.\"", "\"I know,\" I said softly. \"I know, Glacia. And I feel the same way.\"")]
], { btn: "..." }),
wvHold("coraBed", 8, "Forehead to forehead; then sleep, close enough that she can rest her hand in your fur", { r: 3, say: "🛏️ " + wqQ("Whatever was coming, whatever price had to be paid, we would face it together.") }),
wvId("morning", wvRead("🍂 Morning", wqQs("Morning came softly to autumn's realm—not a sunrise, exactly, but a gradual brightening of the golden light, a subtle shift in the quality of the air.", "\"Did you sleep?\" I asked.", "\"And I'm ready.\" She moved away from the window and knelt beside me, her hand coming up to cup my face.") + wvsrc("Chapter 14"), "▶ A knock")),
wvId("breakfast", wvTalk("Cora", "She sweeps in with breakfast", ["🍂 Cora", wqQs("\"Good morning, darlings,\" she said cheerfully. \"I hope you slept well. We have a few things to discuss before you go.\"") + wvsrc("Chapter 14"), "▶ Eat together"], { at: "coraBed" })),
wvId("out", wvMoveRead("🍂 The threshold back", wqQs("When we'd finished, Cora stood and gestured for us to follow. She led us back through the building—which seemed to shift and change as we walked, rooms appearing and disappearing, hallways leading to places they shouldn't—and out into the forest.") + wvsrc("Chapter 14"), "▶ To the cave", "thresholdOut", "🍂 <b>The forest of Autumn</b>")),
wvGo("autumnCave", "Back through the oaks to the cave, the threshold a shimmer in the air", { r: 8 }),
wvTalk("Cora", "\"This is where I leave you\"", ["🍂 Cora", wqQs("\"This is where I leave you,\" she said. \"Where you go next, I cannot follow. But I want you to remember something.\"", "She stepped back, and I saw tears in her eyes. \"When you reach the final door, when you're standing at the threshold, remember: transformation requires death. But death is not the end. It's the beginning. The pause before the world begins again. The rest before the rebirth.\"", "When they pulled apart, Cora turned to me and, to my surprise, embraced me as well. \"Take care of her,\" she whispered in my ear. \"Love her. And when the moment comes, be brave enough to let go.\"", "\"Glacia,\" Cora called, and we looked back. She was smiling, sad and beautiful and somehow hopeful. \"Winter always ends. But it also always returns. Remember that.\"") + wvsrc("Chapter 14"), "▶ Step through"]),
wvId("through", wvGo("autumnOutside", "Step through the shimmer, back into the mortal realm", { r: 6, say: "🐻‍❄️ " + wqQ("The change was immediate and jarring. The golden light of autumn vanished, replaced by the grey, overcast sky of the mortal world.") })),
wvPuzzle("❄️ Together?", "\"West and north. Back to the palace. To face whatever comes next.\" Her hand on your fur asks the same question as before.", ["Press closer to her side", "Turn away", "Look back at the cave"], 0, ["", "Never.", "Cora is behind you now."], { yes: "❄️ " + wqQ("Together.") }),
wvGo("autumnSleigh", "To the sleigh", { r: 6 }),
wvMoveRead("🛷 Toward the palace", wqQs("But also evidence of what she was fighting. Because I could see it now—the places where the frost was lighter, where the ice was thinner, where winter's grip wasn't quite as strong.", "\"Cora was right,\" she continued, her voice barely audible over the wind. \"Transformation requires sacrifice. Death requires courage. And love—\" her voice broke, \"—love requires everything.\"", "The ice palace appeared on the horizon, its spires catching what little light filtered through the clouds.") + wvsrc("Chapter 14"), "▶ Land", "court", "🏰 <b>The Winter Palace</b>"),
wvRead("🏰 Soon", wqQs("We landed in the courtyard, and Glacia sat for a long moment, staring at her palace, at the monument to her century of suffering.", "\"Soon,\" she whispered. \"Soon this will all be over. One way or another.\"") + wvsrc("Chapter 14"), "▶ Close the chapter")
] });
(function () { var p0 = wqbPopulate; wqbPopulate = function () { p0.apply(this, arguments); var S = wqbS(), i = WQB_CH.indexOf(WC14); if (i >= 0 && S.ch >= i && WQB.cast.f_cora)
wqbCastHide("f_cora"); }; })();
var WC15 = wqbCh({ n: "Chapter 15", t: "The Eye of Winter", txt: 15, as: "bear", start: "hearthBear", jump: 1, tune: "frost", keep: ["carousel", "The carousel horse, to be finished", "🎠"],
words: "Home again, and the pain behind the bear's left eye will not let him rest. The darkness is spreading. You are the bear; when the shard takes you, fight your way back.",
intro: "The hall of the grand hearth",
cast: [wvc("glacia", "hearthSeat", { key: "g1", until: "day2", ry: 0.6 }), wvc("glacia", "shards", { key: "g2", from: "day2", until: "window", oz: 8, ry: Math.PI }), wvc("glacia", "hearthSeat", { key: "g3", from: "window", until: "south", ry: 0.6 }),
wvc("glacia", "carverLand", { key: "g4", from: "south", until: "inside", follow: 1 }), wvc("glacia", "carverBench", { key: "g5", from: "inside", until: "home", ox: -1.2, ry: Math.PI }), wvc("woodcarver", "carverBench", { key: "carver", from: "inside", until: "home", ox: 0.8, oz: -0.2, ry: Math.PI }),
wvc("glacia", "shardBox", { key: "g6", from: "home", until: "night", oz: 1.4, ry: Math.PI }), wvc("glacia", "hearthSeat", { key: "g7", from: "night", until: "east", ry: 0.6 }), wvc("glacia", "iceWall", { key: "g8", from: "episode", until: "east", oz: -3, ry: 0 }),
wvc("glacia", "woodsLand", { key: "g9", from: "east", until: "last", follow: 1 }), wvc("hermit", "woodsHut", { key: "hermit", from: "east", until: "last", ox: 3, oz: 3, ry: 0.6 }), wvc("glacia", "hearthSeat", { key: "g10", from: "last", ry: 0.6 })],
state: { coldfire: 1, scratch0: 1, scratch1: 1, scratch2: 1, scratch3: 1, mirrorWhole: 1, mirrorBurst: 0, iceWall: function (s) { var a = wqbIdx(WC15, "wall"); return s >= a && s < a + 1; }, iceWallBroken: function (s) { var a = wqbIdx(WC15, "wall"); return s >= a + 1 && s < wqbIdx(WC15, "east"); },
env: function (s) { var a = wqbIdx(WC15, "south"), b = wqbIdx(WC15, "home"); return s >= a && s < b ? "dusksnow" : "frostnight"; } },
steps: [
{ k: "read" },
wvRead("👁️ The pain", wqQs("The pain started within hours of our return.", "It felt like something was pressing against the inside of my skull. Not gradually increasing, but pulsing—sharp spikes of agony that made my vision blur and my breath catch. Each pulse sent darkness spreading across my sight, like ink dropped into water.", "I tried to hide it. Tried to keep my movements steady, my breathing even. But Glacia knew me too well now.") + wvsrc("Chapter 15"), "▶ ..."),
wvPuzzle("❄️ \"It's worse, isn't it?\"", wqQ("\"Kael?\" She knelt beside me where I lay by the cold fire, her hand coming to rest on my head. \"Your eye. It's worse, isn't it?\""), ["Nod", "Shake your head", "Turn away"], 0, ["", "You couldn't lie to her. Not anymore.", "Not anymore."], { yes: "❄️ " + wqQ("\"The darkness,\" she whispered. \"It's spreading. I can see it clouding over the eye.\"") }),
wvHold("hearthBear", 5, "You can't find a way to say how bad the pain is. Press your head against her hand", { r: 5, say: "❄️ " + wqQ("\"We'll figure this out,\" she said, but her voice shook. \"We have to. I can't—\" She stopped, swallowed hard. \"I won't lose you to this.\"") }),
wvId("day2", wvRead("👁️ The second day", wqQs("The corruption came for me on the second day.", "The pain spiked suddenly, so intense I couldn't breathe. Couldn't think. Couldn't—", "And then something else took over.", "I heard footsteps and turned to see Glacia returning. She looked tired. Worn. Fragile.", "Pathetic.") + wvsrc("Chapter 15"), "▶ ...")),
wvCompel("👁️ Clarity", wqQs("Everything. You're what's wrong. Weak. Broken. Pathetic creature crying over every kill.", "\"Kael, that's not you. That's the shard—\"", "You think love will save you? You think this bear, this cursed beast, means anything?", "\"I'm going to complete the mirror,\" she said quietly, not backing down. \"I'm going to become his slave. And maybe I deserve it for what I've done. But you don't deserve this, Kael. You don't deserve what the shard is doing to you.\""), [wqQ("No, this wasn't me. This wasn't—"), wqQ("I fought. Clawed my way back through the darkness, through the corruption, through the cold clarity that wanted to consume me."), wqQ("I had her."), wqQ("And slowly, agonizingly, I pushed the corruption back.")], "Spring", { holdBtn: "Fight it: focus on her" }),
wvHold("hearthBear", 4, "Drop to the floor; press your head against the ice in submission, in apology, in horror", { r: 6, say: "❄️ " + wqQ("\"It's getting worse,\" she whispered. \"Kael, it's getting so much worse.\"") }),
wvRead("❄️ Running out of time", wqQs("That I loved her.", "When she finally pulled back, she touched my face gently, examining my eye. The darkness had spread, clouding more of my vision. I could barely see out of it now, just shapes and shadows.", "\"We're running out of time,\" she said quietly. \"Both of us.\"") + wvsrc("Chapter 15"), "▶ Three days later"),
wvId("window", wvTalk("Glacia", "Three days later: her hand to her chest, her face tight with pain", ["❄️ Glacia", wqQs("\"Another shard,\" she said when she saw me watching. \"Close. Maybe a day's flight south.\"", "\"Kael, please. You're in so much pain. I can do this alone.\"", "\"Together, then,\" she whispered. \"Always together.\"") + wvsrc("Chapter 15"), "▶ To the sleigh"], { at: "hearthSeat" })),
wvGo("sleigh", "Go out to the sleigh before her", { r: 8 }),
wvId("south", wvMoveRead("🛷 The flight south was agony", wqQs("The flight south was agony.", "\"It's getting harder,\" she said at one point, her voice barely audible over the wind. \"Every time, it's harder to do this. The ember fights back. Makes me feel everything. Makes me remember that these are people, not just—not just vessels for shards.\"", "The village appeared below us as the sun began to set. Small. Remote. The kind of place where people lived simple lives, far from the concerns of gods and demons and corrupted mirrors.") + wvsrc("Chapter 15"), "▶ Land", "carverLand", "🏘️ <b>A small, remote village</b>")),
wvRead("❄️ \"He's creating something beautiful\"", wqQs("\"I can feel it,\" she said. \"In the workshop at the edge of the village. An old man. A woodcarver.\" Her voice broke. \"He's alone. Working on something. I can sense—\" She pressed her hand to her chest. \"He's creating something beautiful.\"", "\"But I don't want to,\" she whispered. \"Gods, I don't want to.\"", "\"Stay here,\" she said. \"Please. You don't need to see this.\"") + wvsrc("Chapter 15"), "▶ Follow anyway"),
wvGo("carverDoor", "Follow her anyway: to the workshop, lamplight spilling from its windows", { r: 5, say: "🪵 " + wqQ("Around him, the walls were lined with his work—carved animals, intricate boxes, toys for children, walking sticks with handles shaped like birds.") }),
wvId("inside", wvGo("carverRoom", "The compulsion pushes the door open; go in behind her", { r: 3 })),
wvTalk("The old woodcarver", "He sets down his carving tools", ["🪵 The woodcarver", wqQs("\"Ah,\" he said softly, setting down his carving tools. \"The Snow Queen. I wondered if you'd come for me eventually.\"", "\"I know,\" he said gently. He stood slowly, his joints stiff with age, and gestured to the carving on his workbench. \"Would you like to see what I was making? Before—well. Before.\"", "\"For my great-granddaughter,\" he said. \"She's turning six next month. She loves horses.\" He smiled, though his eyes were wet. \"I suppose I won't finish it now.\"", "\"That someone would finish it for her. That she'd have something to remember me by. Something beautiful, not—\" He gestured vaguely. \"Not just the memory of how I died.\"") + wvsrc("Chapter 15"), "▶ ..."]),
wvSpotAt("The carousel horse", "look at it, then at her", "carverBench", "Push past Glacia to stand beside the workbench. Look at the horse, then the old man, then back at her", function () { }, { r: 2.4, say: "❄️ " + wqQ("She understood.") }),
wvRead("🎠 \"There's time\"", wqQs("\"You want—\" Her voice was barely audible. \"You want time to tell me how to finish it?\"", "\"There's time,\" she said, and her voice was fierce despite the tears. \"Tell me. Show me. I'll finish it. I promise.\"", "So he did. For twenty minutes, while the compulsion burned in Glacia's chest and made her shake with the effort of resisting, the old man taught her how to finish the carousel horse. Where to carve the final details. How to sand it smooth. What oil to use to bring out the grain.") + wvsrc("Chapter 15"), "▶ Listen with her"),
wvPuzzle("🎠 What he taught her", "She listens to every word, memorizing it all. What three things does he teach her?", ["Where to carve the final details, how to sand it smooth, what oil to use to bring out the grain", "How to paint it, gild it, and hang it on a carousel", "How to carve a new one from the beginning"], 0, ["", "He said nothing of paint.", "There isn't time for that."], { yes: "🪵 " + wqQ("\"There,\" he said finally. \"That's everything. You'll do it justice. I can tell. You have the hands of a creator, not a destroyer. Whatever's making you do this—it hasn't taken that from you.\"") }),
wvReadA("❄️ \"I forgive you\"", wqQs("\"I'm ready now.\"", "\"I'm sorry,\" she said one more time.", "\"I know,\" he said gently. \"It's all right. I forgive you.\"", "It was worse than any extraction I'd witnessed before. The ember was fighting back with everything it had, making the process slower, more painful. The old man's breath came in gasps as frost spread across his skin, as ice formed in his veins, as the cold reached deeper and deeper.", "\"It's all right,\" he whispered as the cold reached his heart. \"You're not a monster. You're just—trapped. Like I am now. But you—you can still—\"", "The shard released from his eye, and he went still.") + wvsrc("Chapter 15"), wqQs("\"I'm ready now.\"", "\"I know,\" he said gently. \"It's all right. I forgive you.\"") + "<p>The cold takes him gently, his eyes on her face, nothing in them but compassion. The shard comes free, and he is still.</p>" + wvsrc("Chapter 15"), "▶ Go to her", { done: function () { wqpFallen("carver"); } }),
wvHold("carverBench", 6, "Go to her and press against her; she holds your fur with both hands", { r: 3, say: "❄️ " + wqQ("\"He forgave me,\" she whispered. \"He forgave me, and I killed him anyway.") }),
wvFind("carousel", "carverBench", "The carousel horse", "Pick up the carousel horse from the floor, for her", { verb: "pick up", say: "🎠 " + wqQ("\"I'll finish it,\" she said to the old man's body. \"I promise. She'll have something beautiful. Something that shows how much you loved her.\"") }),
wvId("home", wvMoveRead("✨ Four hundred and ninety-seven", wqQs("The flight back to the palace was silent except for Glacia's quiet weeping.", "When we reached the palace, she went straight to the mirror chamber and placed the shard with all the others. Four hundred and ninety-seven pieces of a demon's trap, each one bought with blood and suffering.", "\"How many more?\" she whispered", "\"How many more people have to die?\"") + wvsrc("Chapter 15"), "▶ ...", "shards", "✨ <b>The shard chamber</b>")),
wvId("night", wvGo("hearthBear", "That night, by the cold fire, she examines your eye", { r: 6, say: "❄️ " + wqQ("\"It's almost completely dark,\" she said quietly. \"I can barely see your eye anymore. Just—just shadow and corruption.\"") })),
wvRead("❄️ No direction", wqQs("\"I'm losing you,\" she whispered. \"Piece by piece, I'm losing you to this thing. And I don't know how to stop it.\"", "\"But I can't sense where the remaining ones are,\" she said, her voice tight with confusion. \"The compulsion is so strong, pulling me forward, telling me I'm almost done. But there's nothing. No direction. No pull toward the next shard.\"", "\"But whatever it is,\" she whispered, \"we'll face it together.\"") + wvsrc("Chapter 15"), "▶ ..."),
wvRead("🔆 \"I love you\"", wqQs("\"I love you.\"", "The words hung in the air between us, and she stared at me with wide eyes, as if she'd surprised herself. As if she was hearing the truth of it for the first time.", "\"How did I not see it before?\" she whispered. \"All this time, I thought—I thought it was just the ember fighting the shard. Just warmth against cold. But it's not. It's you. It's been you all along.\"", "\"I love you,\" she said again, and this time it came easier, more certain. \"And I'm going to fight for you. For us. No matter what it costs.\"") + wvsrc("Chapter 15"), "▶ Press your head against her hand"),
wvHold("hearthBear", 8, "Press your head against her hand, and hope she feels it; sit with her for hours", { r: 5 }),
wvId("episode", wvRead("👁️ Six days later", wqQs("The next episode came six days later.", "It was worse than the first. So much worse.", "I saw Glacia enter the room, and I didn't see the woman I loved. I saw an enemy. A threat. Something that needed to be eliminated.", "\"Kael, stop. This isn't you. You're stronger than this.\"") + wvsrc("Chapter 15"), "▶ ...")),
wvId("wall", wvSpotAt("The wall of ice", "shatter it", "iceWall", "You lunge; she throws up a wall of ice between you", function () { }, { r: 4, say: "💥 " + wqQ("I lunged, and she threw up a wall of ice between us. I shattered it with one blow, the impact sending shards flying.") })),
wvCompel("👁️ \"Fight it, Kael\"", wqQs("\"Fight it,\" she said, and her voice was steady despite the fear in her eyes. \"I know you're in there. I know you can hear me. Fight it, Kael.\"", "There's nothing to fight. This is clarity. This is truth. You're weak, and you're going to fail, and you're going to drag everyone down with you.", "Her hand came up and pressed against my face, right over my corrupted eye."), [wqQ("Love."), wqQ("I loved her."), wqQ("I loved her. I loved her. I loved her."), wqQ("The mantra became my anchor, and I used it to claw my way back.")], "Strike", { holdBtn: "I loved her" }),
wvRead("👁️ A thin ring", wqQs("\"You came back,\" she whispered. \"You came back to me.\"", "But we both knew it had been close. Too close.", "My left eye was almost completely dark now. Just a thin ring of color around the edge, the rest consumed by shadow.", "I was running out of time.") + wvsrc("Chapter 15"), "▶ Four days later"),
wvId("east", wvMoveRead("🌲 East, half a day", wqQs("\"I have to go,\" she said, her voice tight with agony. \"East. Not far. Maybe half a day.\"", "She didn't argue. Just helped me climb in, then took the reins with shaking hands.", "This extraction was faster than the last. The victim was an old man, alone in the woods, no family to mourn him. The shard came free quickly, and he died without much suffering.") + wvsrc("Chapter 15"), "▶ ...", "woodsLand", "🌲 <b>The woods to the east</b>", { done: function () { setTimeout(function () { wqpFallen("hermit"); }, 400); } })),
wvRead("❄️ Still murder", wqQs("But it didn't matter. Fast or slow, alone or surrounded by family—it was still death. Still murder. Still another piece of Malakar's trap falling into place.", "Four hundred and ninety-eight shards.") + wvsrc("Chapter 15"), "▶ Home"),
wvId("last", wvMoveRead("🔥 Where are they?", wqQs("\"Four hundred and ninety-eight,\" she said when she returned. \"I've collected four hundred and ninety-eight shards.\"", "\"But I can't sense them. I can't feel any shards calling. The compulsion is quiet. It's like—it's like there's nothing left to find.\"", "\"Where are they?\" she whispered. \"Where are the last shards?\"") + wvsrc("Chapter 15"), "▶ ...", "hearthBear", "🔥 <b>The hall of the grand hearth</b>")),
wvPuzzle("❄️ The last shards", "She reaches out and touches your face, near your corrupted eye. Where are the last shards?", ["One in your eye, and one in her heart", "Still out in the world, hidden", "In Gerda's tower"], 0, ["", "She can feel none calling.", "No."], { yes: "❄️ " + wqQ("\"There are no more shards to find,\" she whispered. \"Just yours. And mine.\"") }),
wvRead("🪞 Only two remained", wqQs("The mirror was nearly complete. Four hundred and ninety-eight pieces gathered and placed.", "Only two remained.", "The one in my eye.", "And the one in her heart.") + wvsrc("Chapter 15"), "▶ Close the chapter")
] });
var WC16 = wqbCh({ n: "Chapter 16", t: "The Final Shard", txt: 16, as: "bear", start: "shards", jump: 1, tune: "frost", keep: ["choice", "His choice", "🗝️"],
words: "Two days, like a slow death. There are no more shards to find; only his, and hers. You are the bear, and you cannot say what must be done. You can only show her.",
intro: "The shard chamber",
cast: [wvc("glacia", "shardBox", { key: "g1", until: "cora", oz: 2.4, ry: Math.PI }), wvc("glacia", "chamberTable", { key: "g2", from: "cora", until: "gone", ox: -1.4, ry: Math.PI / 2 }), wvc("corasuit", "coraChamber", { key: "cora", from: "cora", until: "gone", ry: -2.2 }),
wvc("glacia", "shardBox", { key: "g3", from: "gone", until: "alone", oz: 2.4, ry: Math.PI }), wvc("glacia", "hearthSeat", { key: "g4", from: "alone", ry: 0.6 })],
state: { coldfire: 1, scratch0: 1, scratch1: 1, scratch2: 1, scratch3: 1, mirrorWhole: 1, autumnBloom: function (s) { return s >= wqbIdx(WC16, "cora") && s < wqbIdx(WC16, "gone"); }, env: "frostnight" },
steps: [
{ k: "read" },
wvRead("👁️ Two days", wqQs("Two days passed like a slow death.", "I tried to tell her. Tried to make her understand what needed to happen.", "And every time, she would turn away.", "\"No,\" she said the first time, her voice breaking. \"Don't ask me to do this.\"") + wvsrc("Chapter 16"), "▶ The third day"),
wvGo("shardBox", "The third day: stand with her before the pedestal and its four hundred and ninety-eight pieces", { r: 4, say: "🪞 " + wqQ("Two more. Just two more, and Malakar's trap would spring shut forever.") }),
wvPuzzle("🐻‍❄️ Show her", "You plant yourself between her and the door. How do you show her what must happen?", ["Point at your eye; point at the mirror; nod", "Roar at her", "Walk away"], 0, ["", "Never at her.", "You cannot leave her with this."], { yes: "❄️ " + wqQ("\"I won't,\" she said, and her voice was steel wrapped in anguish. \"I won't do it, Kael. I can't. Don't ask me to kill you.\"") }),
wvHold("shardBox", 4, "Press your forehead against her chest, right where the ember burns", { r: 4, say: "❄️ " + wqQ("\"Then I'll stay cursed!\" Her voice rose, echoing off the ice walls.") }),
wvHold("shardBox", 6, "She sinks to the floor against the pedestal. Lay your head in her lap", { r: 4, say: "❄️ " + wqQ("\"I finally found you,\" she whispered. \"After a century of being alone, of being lost, I finally found someone who sees me. Who stays. Who loves me despite everything I've done. And now you want me to—\"") }),
wvId("cora", wvRead("🍂 The air shimmered", wqQs("The air shimmered like heat rising from summer pavement, but the warmth that flooded the chamber was autumn—rich and complex and alive with change.", "And then she was there.", "\"Well,\" she said, her voice rich and theatrical, \"isn't this a pretty little tragedy we've stumbled into?\"") + wvsrc("Chapter 16"), "▶ ...")),
wvRead("🗣️ My voice", wqQs("\"Glacia,\" I said, and my voice—my actual voice—filled the chamber.", "She turned to me, her eyes going wide. \"Kael—\"", "\"I can speak,\" I said, and the wonder of it nearly brought me to my knees. \"Gods, I can speak.\"", "I moved to her, and she met me halfway, her hands coming up to touch my face as if she couldn't quite believe it. \"Your voice. I can hear your voice.\"") + wvsrc("Chapter 16"), "▶ Sit"),
wvGo("chamberTable", "A table has appeared. \"Sit. Please. Death deserves more ceremony than standing in the cold.\"", { r: 3, say: "🍷 " + wqQ("\"To endings,\" she said softly. \"And to what comes after.\"") }),
wvAsk("Cora", "\"You've realized the truth\"", ["🍂 Endings"][0], wqQ("\"Yes,\" Glacia whispered."), [
["What is he?", wqQs("\"Primordial,\" I said quietly. \"Winter's essence given form.\"", "—and they might survive. Many don't, but some do.\" She stopped pacing and looked at me, and her eyes were ancient and sad. \"But you, my dear winter king, are not human. You're not flesh and blood in any conventional sense. You're magic given consciousness.")],
["What are you saying?", wqQs("\"I'm saying, darling, that the shard isn't just in him. It's part of him now. A century of fusion, of interweaving, of becoming inseparable from his essential nature.\"", "\"It will kill him,\" I said quietly.", "\"Completely,\" Cora confirmed. \"Absolutely. Finally.\"")],
["Is there no other way?", wqQs("\"There is no other way. I've looked at every door, every threshold, every possible path forward. And they all require the same price.\"", "\"To free yourself, sister, you must do exactly what Malakar designed this trap to make you do.\"", "\"Complete the mirror,\" I said.")]
], { btn: "..." }),
wvRead("🍂 The perfect trap", wqQs("\"Brava.\" Cora's smile was bitter. \"Take the final shard. Place it with all the others. And in doing so, kill the man you love.\"", "Your love for Kael is what makes you vulnerable. Malakar knew that if you ever found something worth more than your own freedom, you would refuse to take the final step. You would rather remain enslaved than hurt what you love.", "\"But the ember,\" I said. \"Alessia planted it to counter him.\"", "\"It can transform what comes after,\" Cora said gently. \"But darling, it can't change what must happen first.\"") + wvsrc("Chapter 16"), "▶ ..."),
wvCompel("🗣️ What I choose", wqQs("\"Then I choose not to,\" she said. \"I choose to stay cursed. I choose—\"", "\"You choose slavery,\" I said, and my voice was gentle but firm."), [wqQ("\"Then let me tell you what I choose,\" I said quietly. \"I choose your freedom. I choose to give you back your life, your self, your future. I choose to end your suffering, even if it costs me everything.\""), wqQ("\"I've lived for millennia, Glacia.\" I reached up and touched her face, wiping away her tears with my paw."), wqQ("I pressed my forehead to hers. \"But I've only truly lived since I met you. Since I woke up in your palace and saw you sitting by that cold fire."), wqQ("\"You gave me back my name,\" I continued. \"You gave me purpose. You gave me love. And now I'm giving you the only gift I have left to give. My life for your freedom. It's not a sacrifice, Glacia. It's a choice. My choice. And I make it gladly.\"")], "Say it", { holdBtn: "Tell her" }),
wvRead("❄️ \"I can't\"", wqQs("\"I'm not asking,\" I said gently. \"I'm begging. Please, Glacia. Please let me save you.\"", "\"No,\" Cora said. \"It can't save him. Some transformations require death, Glacia. All gates have a price. And this one—\" She looked at me with infinite sadness. \"This one requires everything.\"", "I came and laid beside her. \"I know. I know it's impossible. I know it's cruel. But Glacia—\" I waited until she looked at me. \"I would rather die by your hand, knowing I freed you, than live forever watching you suffer.\"", "\"And I would rather be his slave for eternity than live without you,\" she said fiercely.") + wvsrc("Chapter 16"), "▶ ..."),
wvRead("🍂 \"I'll return when you're ready\"", wqQs("\"Then you remain as you are,\" Cora said simply. \"The Snow Queen and her bear. Hunting shards that don't exist. Trapped in a curse that can't be broken. Until the end of time.\"", "Then she turned to Glacia. \"But love also means letting go sometimes. Accepting sacrifice. Trusting that the ending, however painful, is necessary for the transformation to come.\"", "She raised her hand in farewell. \"I'll return when you're ready. Or I won't. Either way, I'll love you both. And I'll remember what you chose, and why.\"") + wvsrc("Chapter 16"), "▶ ..."),
wvId("gone", wvHold("shardBox", 6, "She is gone, and the warmth and your voice with her. Hold still and let Glacia cry", { r: 4, say: "❄️ " + wqQ("\"No,\" she whispered. \"No, I just got you back. I just—\"") })),
wvRead("❄️ \"I won't kill you\"", wqQs("\"Please don't make me do this,\" she whispered. \"Please, Kael. Please.\"", "\"I won't do it,\" she said, and her voice was steady now. Resolved. \"I don't care what Cora says. I don't care what the cost is. I won't kill you.\"", "I shook my head, trying to make her understand. But she just stood and walked away, leaving me alone in the chamber with the chest of shards.") + wvsrc("Chapter 16"), "▶ Alone with the shards"),
wvId("alone", wvSpotAt("The chest of shards", "stand before it", "shardBox", "Alone, move closer to the chest; feel the pulsing call", function () { }, { r: 3, say: "🪞 " + wqQ("The demon's masterwork. The trap that had taken a century to spring.") })),
wvPuzzle("🗝️ What you have to do", "She would rather stay trapped forever than spring it. What do you know you have to do?", ["Make her use Winter's Kiss, in a way that keeps her love intact", "Leave her, so she cannot be asked", "Go to Malakar yourself"], 0, ["", "She would only hunt shards that don't exist, alone, forever.", "You do not know the way."], { yes: "🗝️ " + wqQ("Winter's Kiss.") }),
wvGo("hearthBear", "Follow her scent through the palace, to your chamber by the cold fire", { r: 6, say: "❄️ " + wqQ("\"Kael,\" she whispered. \"I can't do this. I can't.\"") }),
wvHold("hearthBear", 8, "Lay your head in her lap; let her believe, for one more night, that there is another way", { r: 5, say: "❄️ " + wqQ("\"I love you,\" she said. \"I love you so much. And I can't—I won't—\"") }),
wvRead("🗝️ Tomorrow", wqQs("Tomorrow, I would find a way.", "Tomorrow, I would make it so she had no choice.", "Tomorrow, I would free her—even if it cost me everything.", "I held her that night, and I made my choice.", "Tomorrow, I would make her make hers.") + wvsrc("Chapter 16"), "▶ Close the chapter")
] });
(function () { var t0 = wqbTick; wqbTick = function (dt, L) { t0.apply(this, arguments); try {
var sw = WQW.shows && WQW.shows.shardSwirl;
if (sw && sw.visible)
sw.rotation.y += dt * 1.6;
}
catch (e) { } }; })();
var WQG = { as: "glacia" };
var WC17 = wqbCh({ n: "Chapter 17", t: "Winter's Kiss, Winter's Death", txt: 17, as: "bear", start: "hearthBear", jump: 1, tune: "frost", keep: ["mirror", "The mirror, complete", "🪞"],
words: "The day arrives, pale and colourless. You are the bear, and you have made your decision in the dark hours of the night. Today. It has to be today.",
intro: "The hall of the grand hearth",
cast: [wvc("glacia", "hearthSeat", { key: "g1", until: "w0", ry: 0.6 }), wvc("glacia", "hearthMid", { key: "g2", from: "w0", until: "death", ox: 2.2, oz: 1.4, ry: -2.2 }),
wvc("bear", "hearthBear", { key: "bearD", from: "death", ry: -1.4, look: WQP_LIE, mute: 1 })],
state: { coldfire: 1, scratch0: 1, scratch1: 1, scratch2: 1, scratch3: 1,
word0: function (s) { return s >= wqbIdx(WC17, "w0"); }, word1: function (s) { return s >= wqbIdx(WC17, "w1"); }, word2: function (s) { return s >= wqbIdx(WC17, "w2"); }, word3: function (s) { return s >= wqbIdx(WC17, "w3"); },
word4: function (s) { return s >= wqbIdx(WC17, "w4"); }, word5: function (s) { return s >= wqbIdx(WC17, "w4"); }, word6: function (s) { return s >= wqbIdx(WC17, "w4"); },
cracks: function (s) { return s >= wqbIdx(WC17, "grief"); }, shardSwirl: function (s) { return s >= wqbIdx(WC17, "swirl") && s < wqbIdx(WC17, "mirror"); }, mirrorComplete: function (s) { return s >= wqbIdx(WC17, "mirror"); },
env: function (s) { return s >= wqbIdx(WC17, "grief") ? "blizzard" : "frostnight"; } },
steps: [
{ k: "read" },
wvRead("🐻‍❄️ The last time", wqQs("The day arrived with the pale, colorless light that passes for dawn in the far north.", "I memorized it. The curve of her cheek. The way her white hair fell across her shoulder. The slight parting of her lips as she breathed.", "This would be the last time I saw her like this.", "I had made my decision in the dark hours of the night. Today. It had to be today.") + wvsrc("Chapter 17"), "▶ She wakes"),
wvRead("❄️ \"Did you sleep well?\"", wqQs("\"Good morning,\" she whispered, and forced a smile that didn't reach her eyes. Her fingers tightened in my fur. \"Did you sleep well?\"", "The question was so painfully normal. So deliberately ordinary.", "I shook my head slowly.", "I shook my head again, more firmly.", "There was no more time.") + wvsrc("Chapter 17"), "▶ ..."),
wvGo("hearthMid", "She busies herself with the cold flames. Move to the centre of the room, where the firelight is strongest, and wait until she turns", { r: 3, say: "❄️ " + wqQ("\"What?\" she asked, and there was an edge of panic in her voice. \"Why are you looking at me like that?\"") }),
wvId("w0", wvHold("frostWall", 4, "Go to the wall where frost has gathered. Raise your paw and scratch, one hard letter at a time: TODAY", { r: 4, say: "❄️ " + wqQ("\"I'm not ready. I need more time. We need more time.\"") })),
wvId("w1", wvHold("frostWall", 4, "Scratch again, claws scraping the ice: NO MORE TIME", { r: 4, say: "❄️ " + wqQ("\"You're still here. You're still you. You fought off the corruption last time, and you can do it again. You're strong enough. I know you are.\"") })),
wvId("w2", wvHold("frostWall", 4, "Shake your head, and add another word: GETTING WORSE", { r: 4, say: "❄️ " + wqQ("\"Then we'll find a way to make it better!\"") })),
wvId("w3", wvHold("frostWall", 3, "Just her name: GLACIA", { r: 4, say: "❄️ " + wqQ("Just her name. But she stopped mid-sentence, her breath catching.") })),
wvHold("hearthMid", 5, "Go back to her, and press your head against her chest, right where the ember burns", { r: 4, say: "❄️ " + wqQ("\"Please don't ask me to do this. Not today. Not—not yet. Just give me a little more time. A few more days. A week. Please, Kael.\"") }),
wvId("w4", wvHold("frostWall", 6, "Back to the wall, your paw trembling now. Each letter is harder than the last: AFRAID · LOSING MYSELF · DON'T WANT TO HURT YOU", { r: 4, say: "❄️ " + wqQ("\"Stop. Just stop. I can't—I can't think about this right now. I can't—\"") })),
wvRead("❄️ \"You want me to kill you\"", wqQs("\"You want me to kill you,\" she said, her voice raw and accusing.", "I pressed my forehead to hers, and I felt wetness on my own face. Tears. I was crying too.", "Because I was asking her to do the impossible. To choose my death over my corruption. To love me enough to let me go.", "But I was also asking her to save herself. To break free of Malakar's trap. To have a chance at the life she deserved.", "\"Kael,\" she sobbed, reaching for me. \"Please don't. Please don't make me. I love you. I love you so much. That's why I can't—\"", "And that's when the darkness surged up and swallowed me whole.") + wvsrc("Chapter 17"), "▶ The darkness"),
wvId("dark", wvRead("👁️ Like an avalanche", wqQs("The corruption hit like a avalanche.", "Weak, the darkness whispered. Pathetic. Begging her to kill you like some mewling mortal.", "She's corrupted. Tainted. The shard in her chest makes her less than nothing. Why are you wasting your essence on her?", "My body moved without my permission.", "She should fear you. She should understand what you are. What you could do to her.", "\"Kael?\" Her voice was small. Frightened. \"Kael, no. Fight it. I know you can fight it.\"") + wvsrc("Chapter 17"), "▶ Fight it")),
wvCompel("👁️ No", wqQs("I took a step toward her, and she backed away.", "No."), [wqQ("The thought came from somewhere deep inside. From the part of me that was still myself. Still Kael. Still the one who loved her more than anything in any world."), wqQ("No. I won't hurt her. I won't."), wqQ("I fought. Oh, how I fought. Every muscle in my body locked up as I battled against the corruption's control."), wqQ("Don't let me become this. Please. If you love me, don't let me become this.")], "Hold on", { holdBtn: "Fight" }),
wvPuzzle("❄️ \"I understand what you need\"", wqQ("\"Kael,\" she whispered, and her voice was steady now. Certain. Broken but sure. \"I understand. I understand what you need.\"") + "<br>The corruption screams at you to run. To attack. What do you do?", ["Do not move. Let her come", "Run", "Lunge"], 0, ["", "You would leave her trapped forever.", "Never. Never her."], { yes: "❄️ " + wqQ("\"I'm sorry,\" she said, and she was crying again. \"I'm so sorry. I love you. I love you so much.\"") }),
wvHold("hearthMid", 6, "Stand. She takes your massive head between her hands; press into her touch", { r: 4, say: "❄️ " + wqQ("\"I love you,\" she said again. \"I will always love you. And I'm so sorry. I'm so, so sorry.\"") }),
wvId("kiss", wvHold("hearthMid", 5, "She leans in and presses her lips to your forehead, right over your corrupted eye", { r: 4, say: "❄️ " + wqQ("And the world turned to ice.") })),
wvReadA("❄️ Winter's Kiss", wqQs("The cold was immediate and absolute.", "It spread from the point of contact like frost racing across glass—beautiful and terrible and utterly inevitable. I felt it sink into my skin, into my blood, into the very essence of what I was.", "It hurt.", "Gods, it hurt. Like being unmade from the inside out. Like every piece of me was being carefully, deliberately taken apart.", "But it was also mercy.", "The corruption screamed as the cold reached it.", "I felt the shard in my eye—the thing that had been killing me slowly for so long—begin to loosen.", "I was dying.", "I was afraid. I won't lie to you about that. I was terrified.", "But I was also resolved.", "And because I loved her. My Gods, how I loved her.") + wvsrc("Chapter 17"), wqQs("The cold was immediate and absolute.", "But it was also mercy.", "I felt the shard in my eye—the thing that had been killing me slowly for so long—begin to loosen.", "But I was also resolved.", "And because I loved her. My Gods, how I loved her.") + wvsrc("Chapter 17"), "▶ ..."),
wvRead("🐻‍❄️ Free", wqQs("She was so beautiful. So strong. So much braver than she'd ever given herself credit for.", "Felt the shard finally, finally pull free.", "For just a moment—one perfect, crystalline moment—I was myself again. Completely. Wholly. Free.", "Thank you, I told her with everything I had left. Thank you for loving me. Thank you for being strong enough to let me go. Thank you for being you.") + wvsrc("Chapter 17"), "▶ ..."),
wvRead("🐻‍❄️ I love you", wqQs("Then the darkness came.", "Not the corruption's darkness. Something else. Something vast and quiet and strangely peaceful.", "I wasn't afraid anymore.", "My last thought wasn't of fear or pain or loss.", "It was of her.", "The woman who had chosen love anyway.", "You're magnificent, I thought as the darkness closed in. You always were. I just wish you could have seen it sooner.", "I love you.", "I love—") + wvsrc("Chapter 17"), "▶ ..."),
wvId("death", wvRead("❄️ Glacia", wqQs("Glacia felt the exact moment he died.", "She felt the shard come free, cold and sharp and terrible in her hand.", "And she felt her heart shatter into a thousand pieces.", "\"No,\" she whispered against his forehead. \"No, no, no—\"", "But he was already gone.", "Just a body. Just a shell.", "Just gone.") + wvsrc("Chapter 17") + "<p>You are Glacia now.</p>", "▶ ...", WQG)),
wvId("grief", wvHold("hearthBear", 8, "Collapse over him, your arms round his neck, your face in his fur", Object.assign({ r: 5, say: "❄️ " + wqQ("And the palace answered.") }, WQG))),
wvRead("🌨️ Winter was mourning", wqQs("The ice beneath her feet cracked—a sound like thunder, like the world breaking apart. Fissures spread across the floor in jagged lines, racing outward from where she knelt.", "Outside, the wind rose to a shriek.", "\"I'm sorry,\" she sobbed into his fur, and the palace shuddered again. More cracks appeared in the walls. More ice fell from the ceiling.", "Winter was mourning. The realm itself was breaking apart, responding to its goddess's shattered heart.", "She'd killed him.") + wvsrc("Chapter 17"), "▶ ...", WQG),
wvId("ember", wvHold("hearthBear", 6, "Hold him. Something warm stirs in your chest: the ember, flaring bright", Object.assign({ r: 5, say: "🔥 " + wqQ("It flared bright and hot and alive, responding to her shattered heart.") }, WQG))),
wvRead("🔥 The shard in her chest", wqQs("And the shard in her chest—the one that had been there for a century, the one that had controlled her and compelled her and forced her to kill—began to melt.", "It hurt.", "But she barely registered the pain. Barely cared. Because Kael was dead, and nothing else mattered. Not freedom. Not the curse. Not anything.", "The shard pulled free from her chest with a sensation like tearing, and she gasped.", "She opened her hand reflexively, and both shards—his and hers—lifted into the air.") + wvsrc("Chapter 17"), "▶ ...", WQG),
wvId("swirl", wvRead("🪞 Five hundred", wqQs("Four hundred and ninety-eight shards inside.", "Two shards arriving.", "Five hundred total.", "Complete.", "The chest exploded.", "They rose into the air—all five hundred of them—and began to swirl.", "They fit together like a puzzle. Like they'd been waiting for this moment since the day they'd shattered.") + wvsrc("Chapter 17"), "▶ ...", WQG)),
wvId("mirror", wvRead("🪞 The mirror", wqQs("Within seconds, the mirror was complete.", "It hung in the air for a moment—perfect and terrible and beautiful. The frame was silver, ornate, covered in patterns that hurt to look at. The glass was flawless, reflecting the room with impossible clarity.", "Then it descended slowly to the floor and settled there, standing upright. Waiting.", "The palace was silent.", "No demonic voice. No triumphant laughter. No sense of presence or power or victory.", "Just... silence.", "And the mirror.") + wvsrc("Chapter 17"), "▶ ...", WQG)),
wvHold("hearthBear", 8, "Hold him, and tell him", Object.assign({ r: 5, say: "❄️ " + wqQ("\"I did it,\" she whispered to him, even though he couldn't hear. Even though he was gone. \"I completed it. Just like you wanted. Just like you asked.\"") }, WQG)),
wvRead("❄️ Never more cold", wqQs("She couldn't finish. Could only hold him and cry and feel the terrible, crushing weight of what she'd done.", "The ember in her chest burned bright and warm and alive.", "But Kael was dead.", "And Glacia had never felt more cold.") + wvsrc("Chapter 17"), "▶ Close the chapter", WQG)
] });
var WC18 = wqbCh({ n: "Chapter 18", t: "The Ice King Rises", txt: 18, as: "glacia", start: "hearthBear", jump: 1, tune: "frost", keep: ["free", "Free", "❤️"],
words: "He is gone, and you hold him, and the storm screams round your palace. But a voice is coming, formal and ancient, and with it the last of the curse.",
intro: "The mirror chamber",
cast: [wvc("bear", "hearthBear", { key: "bearD", until: "storm", ry: -1.4, look: WQP_LIE, mute: 1 }),
wvc("gerda", "hearthMid", { key: "gerda", from: "gerda", until: "gone", ox: -2, oz: 2, ry: 2.4 }),
wvc("iceking", "hearthBear", { key: "kaelL", from: "man", until: "kiss", ry: -1.4, look: WQP_LIE, mute: 1 }),
wvc("iceking", "hearthBear", { key: "kael", from: "kiss", until: "out", ox: 1, ry: -2.4 }),
wvc("iceking", "court", { key: "kaelO", from: "out", ox: 1.4, ry: Math.PI, follow: 1 })],
state: { coldfire: 1, cracks: function (s) { return s < wqbIdx(WC18, "out"); }, mirrorComplete: function (s) { return s < wqbIdx(WC18, "gone"); },
rebirthStorm: function (s) { return s >= wqbIdx(WC18, "storm") && s < wqbIdx(WC18, "man"); }, frostArt: function (s) { return s >= wqbIdx(WC18, "storm"); },
env: function (s) { return s >= wqbIdx(WC18, "out") ? "aurora" : s >= wqbIdx(WC18, "gone") ? "frostnight" : "blizzard"; } },
steps: [
{ k: "read" },
wvRead("🐻‍❄️ In the darkness", wqQs("In the darkness, I heard her.", "Then I felt her tears. Each one landed like a spark of warmth in the endless cold, like stars appearing in a void.", "But I was scattered. Dissolved.", "Still, I heard her. And in that darkness, her voice was everything.") + wvsrc("Chapter 18"), "▶ Glacia"),
wvHold("hearthBear", 8, "Hold him. Time has no meaning; the storm still rages", { r: 5, say: "❄️ " + wqQ("\"I killed you,\" she whispered into Kael's fur. \"I killed you, and I don't—I don't know how to—\"") }),
wvRead("🪞 Silence, and the mirror", wqQs("But inside the mirror chamber, there was only silence.", "And the mirror.", "She should have felt the compulsion release. Should have felt Malakar's hold snap free now that his masterwork was complete.", "But she felt nothing. Nothing but the crushing weight of what she'd done.", "\"Please,\" she whispered. \"Please, I can't—I can't do this without you. I can't—\"") + wvsrc("Chapter 18"), "▶ ..."),
wvRead("🔔 The voice", wqQs("The voice came like thunder.", "\"Love freely given by one who knows your true nature.\"", "\"Willingly receiving Winter's Kiss knowing death will follow showing true devotion.\"", "\"Both conditions have been met. Both sacrifices made. Both hearts proven true.\"", "\"What—\" Glacia's voice came out as barely a whisper. \"What is this?\"") + wvsrc("Chapter 18"), "▶ Light gathers"),
wvId("gerda", wvTalk("Gerda", "Light gathers in the centre of the chamber and takes shape: a woman, tall, dark-haired, in robes of crimson and gold", ["✨ Gerda", wqQs("\"Gerda,\" she whispered.", "The sorceress inclined her head. \"Yes.\"", "Gerda's expression softened. \"I'm here because the curse has been fulfilled. Because two souls have proven themselves worthy of transformation.\""), "..."], { at: "hearthMid" })),
wvAsk("Gerda", "\"My curse tested him\"", "✨ Gerda", wqQ("\"He's dead,\" Glacia said, and the words tore at her throat. \"Your curse killed him.\""), [
["Your curse killed him", wqQs("\"No.\" Gerda knelt beside them, and her eyes were bright with unshed tears. \"My curse tested him. And he passed. He chose love over pride.", "She reached out and placed a hand on Kael's head, her touch gentle. \"When I cursed him, I was angry. Hurt. Possessive. I wanted to own him, to keep him, to make him need me the way I needed him.\"")],
["What is true love?", wqQs("\"True love,\" Gerda continued, \"requires freedom. It requires trust. It requires the willingness to let go, even when it breaks you.\"")],
["But I killed him", wqQs("\"You freed him,\" Gerda corrected gently. \"You loved him enough to let him go. To grant him the mercy he begged for. To choose his peace over your own heart.\"")]
], { btn: "..." }),
wvRead("✨ \"Be reborn\"", wqQs("She raised her hands, and her voice rang out with authority.", "\"Kael Frostspire. Old Man Winter. Winter's Hand. You have met the conditions of your curse.", "\"I, Gerda of the Arcane Tower, release you from your binding. I lift the curse I placed upon you in anger and pain. I acknowledge my own failings and grant you freedom.\"", "She brought her hands together, and the sound was like a bell tolling.", "\"Be free. Be whole. Be reborn.\"") + wvsrc("Chapter 18"), "▶ The storm"),
wvId("storm", wvHold("hearthMid", 8, "Scramble back from the blizzard round him, and hold your ground while winter is unmade and remade", { r: 6, say: "🌨️ " + wqQ("Not violently. Not with pain or destruction. It simply... came apart. His fur became snow. His body became wind. His essence scattered into the storm, joining with it, becoming part of the wild magic that filled the chamber.") })),
wvRead("🔥 What comes after", wqQs("This was Winter's Hand being unmade and remade. This was transformation. This was rebirth.", "The ember transforms what comes after death.", "And then it began to settle.", "And there, where Kael's bear form had been, lay a man.") + wvsrc("Chapter 18"), "▶ Look at him"),
wvId("man", wvRead("👑 The Ice King", wqQs("He was magnificent.", "His eyes were closed, his lashes pale against his cheeks, but Glacia could see that both eyes were whole now. The corruption was gone.", "This was Kael Frostspire. The Ice King. Winter's Hand reborn.", "But he wasn't moving. Wasn't breathing.") + wvsrc("Chapter 18"), "▶ ...")),
wvPuzzle("✨ \"Something only you can give\"", wqQ("\"He needs one more thing,\" Gerda said softly.") + "<br>What does he need?", ["True love's kiss", "Winter's Kiss, again", "Time"], 0, ["", "\"That was Winter's Kiss... The magic Malakar twisted into a weapon.\"", "He has had a century of time."], { yes: "✨ " + wqQ("\"That was Winter's Kiss,\" Gerda interrupted gently. \"The power of your curse. The magic Malakar twisted into a weapon.\" She gestured toward Kael. \"This is different. This is just... a kiss. Given freely. With love.\"") }),
wvGo("hearthBear", "His chest is moving. He is breathing. Go to him", { r: 3, say: "❄️ " + wqQ("\"Kael,\" she whispered. \"Please. Please come back to me.\"") }),
wvId("kiss", wvHold("hearthBear", 5, "Cup his face in your hands, and kiss him", { r: 3, say: "✨ " + wqQ("The moment her lips touched his, the world exploded into light.") })),
wvRead("❤️ Free", wqQs("And the corruption shattered.", "She was free.", "Just... herself. Glacia. Winter. Whole and awake and alive.", "And Kael was kissing her back.", "\"Glacia,\" he breathed.", "His voice. His actual voice. Deep and rich and warm, with an undertone like wind through winter trees.") + wvsrc("Chapter 18"), "▶ ..."),
wvTalk("Kael, the Ice King", "Kael, whole, holding you", ["👑 \"You freed me\"", wqQs("\"You did it,\" he said, his voice rough with emotion. \"You saved me. You saved us both.\"", "\"You freed me.\" He pressed his forehead to hers, his eyes closing. \"You loved me enough to let me go. To grant me mercy. To choose my peace over your own heart.\"", "\"I know.\" He pulled her closer, wrapping his arms around her fully. \"I was in the darkness. Scattered. Dissolved. But I heard you. Every word. Every tear. You were the light that kept me from being lost completely.\"", "\"I'm here,\" he kept saying. \"I'm here, and I'm whole, and I'm never leaving you again.\""), "..."], { at: "hearthBear" }),
wvRead("👑 \"The Ice King\"", wqQs("When she finally calmed enough to speak, she pulled back to look at him. Really look at him. \"You're beautiful,\" she whispered.", "\"The Ice King,\" she said softly.", "\"Your power,\" she said.", "\"Gone.\" She pressed a hand to her chest, feeling the steady warmth of the ember. \"Broken. When I kissed you, it just... shattered. I'm free, Kael. Truly free.\"", "His smile was radiant. \"Then we both are.\"") + wvsrc("Chapter 18"), "▶ Gerda"),
wvTalk("Gerda", "Gerda, beside the mirror", ["✨ \"This is my burden now\"", wqQs("Then Kael moved forward and hugged Gerda out of nowhere. \"Thank you.\"", "\"No.\" Gerda shook her head firmly. \"No, you were right to leave. I was trying to cage you. To own you. That's not love—that's fear.\"", "Glacia stepped forward, still holding Kael's hand. \"Thank you,\" she said softly. \"For lifting the curse. For giving him back to me.\"", "Gerda smiled through her tears. \"You earned him. Both of you earned this.\" She turned to the mirror, and her expression hardened. \"And this... this is my burden now.\"", "\"He failed,\" Glacia said firmly."), "..."], { at: "mirrorStand" }),
wvId("gone", wvRead("✨ \"Live well. Love freely.\"", wqQs("\"We will,\" Glacia promised.", "Gerda nodded once, then began to fade. The mirror faded with her, its silver frame growing translucent, its glass becoming mist.", "Kael and Glacia stood alone in the chamber.", "\"It's over,\" she whispered. \"It's really over.\"", "She laughed—a sound she hadn't made in over a century. Pure and bright and full of joy. \"Anything we want.\"", "\"I want...\" She paused, thinking. \"I want to see the stars. Real stars, not through walls of ice. I want to feel the night air. I want to be outside, in the world, with you.\"", "His smile was brilliant. \"Then let's go.\"") + wvsrc("Chapter 18"), "▶ Out into the night")),
wvId("out", wvGo("court", "Take his hand, and walk out through your palace, no longer a prison, through the great doors, and out into the winter night", { r: 10, say: "🌌 " + wqQ("Oh, the stars.") })),
wvHold("court", 8, "Stand in the snow beside him and look up: the stars, the full moon, the aurora on the northern horizon", { r: 12, say: "🌌 " + wqQ("\"I'd forgotten,\" she whispered. \"How beautiful the world could be.\"") }),
wvRead("🌌 \"I love you\"", wqQs("\"You're staring,\" he said, smiling without looking at her.", "\"You're worth staring at.\"", "\"I love you.\"", "\"I love you too,\" she said. \"I think I have since the moment you woke up in my palace and looked at me like I was something precious instead of something terrifying.\"", "\"You were a victim,\" he corrected firmly. \"Forced to do terrible things by a demon's curse. That's not the same as being a monster.\"", "\"Luck had nothing to do with it.\" He kissed her softly. \"This was always meant to be. Winter and Winter. The goddess and her hand. Two halves of the same whole, finally reunited.\"") + wvsrc("Chapter 18"), "▶ ..."),
wvReadA("❤️ Under the stars", wqQs("\"I want you,\" she said simply. \"Here. Now. Under the stars.\"", "His eyes darkened with desire. \"Are you sure?\"", "\"I've never been more sure of anything.\" She reached up and began unfastening his frost-touched coat. \"I want to celebrate. I want to feel alive. I want to make love to you in the realm I've been trapped in for a century and reclaim it as ours.\"", "—if we join together like this—it will bind us. Not with curses or compulsion, but with choice. With love. We'll be connected in ways that go beyond the physical.\"", "\"Good,\" she said firmly. \"I want to be bound to you. I choose it. Freely. Completely.\"", "His smile was radiant. \"Then I'm yours. And you're mine. For as long as winter exists.\"", "\"Forever, then.\"", "\"Forever.\"", "The pleasure crested, and they fell over the edge together.", "They collapsed together, tangled in each other's arms, breathing hard. The magic settled slowly, the light fading, the snow gentling to soft flurries once more.", "\"Perfect,\" she finished. \"That was perfect.\"") + wvsrc("Chapter 18"), wqQs("\"Good,\" she said firmly. \"I want to be bound to you. I choose it. Freely. Completely.\"", "His smile was radiant. \"Then I'm yours. And you're mine. For as long as winter exists.\"", "\"Forever, then.\"", "\"Forever.\"") + wvsrc("Chapter 18"), "▶ ..."),
wvAsk("Kael, the Ice King", "Lying in the snow with him, watching the stars wheel overhead", "👑 Tomorrow", wqQ("\"What do we do now?\" Glacia asked eventually. \"Tomorrow, I mean. And all the days after.\""), [
["What do we build?", wqQs("Kael was quiet for a moment, thinking. \"We build something new. A kingdom, maybe. A place where winter is celebrated, not feared. Where the cold is beautiful instead of deadly.\"", "\"A home,\" she said softly.", "\"A home,\" he agreed. \"For both of us. Together.\"")],
["Your sisters?", wqQs("\"We'll need to visit your sisters,\" he continued. \"Let them know you're free. Let them meet me properly, not as a cursed bear but as myself.\"", "\"And Cora will probably write a song about us,\" Kael added with a laugh.", "\"Definitely.\" Glacia laughed too, the sound bright and free. \"A very dramatic, very theatrical song with at least three costume changes.\"")],
["Thank you", wqQs("\"Thank you. For everything. For finding me. For staying with me. For loving me enough to die for me.\"", "He pulled back enough to look at her, his expression serious. \"I would do it again. A thousand times over. You're worth everything, Glacia.")]
], { btn: "...", at: "court" }),
wvRead("🌌 Together", wqQs("\"Then we're both very lucky,\" he said softly.", "\"The luckiest,\" she agreed.", "They kissed again, slow and sweet and full of promise. Around them, the winter night sang its approval, and the stars blazed overhead like blessings.", "They were free. They were whole. They were together") + wvsrc("Chapter 18"), "▶ Close the chapter")
] });
var WC19 = wqbCh({ n: "Chapter 19", t: "The Frozen Reception", txt: 19, as: "iceking", start: "bower", jump: 1, tune: "court", keep: ["binding", "Winter, whole", "💍"],
words: "Two weeks after your resurrection. You are Kael, the Ice King, in your true form at last; Talia is already planning the flowers. But Glacia stands at the window, and something heavier than sadness is in her face.",
intro: "Glacia's chamber in the Winter Palace",
cast: [wvc("glacia", "bowerWindow", { key: "g1", until: "away", oz: -0.8, ry: Math.PI }),
wvc("widow", "widowDoor", { key: "widow", from: "door", until: "orphans", oz: -1.6, ry: 0 }), wvc("carvergirl", "widowDoor", { key: "girl", from: "door", until: "orphans", ox: 0.8, oz: -1.9, ry: -0.2 }),
wvc("glacia", "orphansHall", { key: "g2", from: "orphans", until: "bind", oz: -2, ry: Math.PI }),
wvc("orphan", "orphansHall", { key: "o1", from: "orphans", until: "bind", ox: 3, oz: 2, ry: 2 }), wvc("orphanf", "orphansHall", { key: "o2", from: "orphans", until: "bind", ox: -3, oz: 3, ry: -2 }), wvc("orphan", "orphansHall", { key: "o3", from: "orphans", until: "bind", ox: 5, oz: -6, ry: 1 }),
wvc("orphanf", "orphansFire", { key: "o4", from: "orphans", until: "bind", ox: 1.4, oz: 1, ry: Math.PI }), wvc("orphan", "orphansFire", { key: "o5", from: "orphans", until: "bind", ox: -1.4, oz: 1.2, ry: Math.PI }), wvc("orphanf", "orphansFire", { key: "o6", from: "orphans", until: "bind", ox: 0, oz: 2, ry: Math.PI }),
wvc("glacia", "bindCentre", { key: "g3", from: "her", oz: -2.6, ry: 0 }),
wvc("talia", "bindEast", { key: "talia", from: "sisters", ry: -Math.PI / 2 }), wvc("alessia", "bindSouth", { key: "alessia", from: "sisters", ry: Math.PI }), wvc("cora", "bindWest", { key: "cora", from: "sisters", ry: Math.PI / 2 }),
wvc("gerda", "bindMirror", { key: "gerda", from: "gerda", until: "party", ox: 2, ry: -1.2 }),
wvc("orphan", "bindDance", { key: "p1", from: "party", ox: 4, oz: 2, ry: 2 }), wvc("orphanf", "bindDance", { key: "p2", from: "party", ox: -4, oz: 1, ry: -2 }), wvc("orphan", "bindDance", { key: "p3", from: "party", ox: 6, oz: -4, ry: 1 }), wvc("orphanf", "bindDance", { key: "p4", from: "party", ox: -6, oz: -3, ry: -1 }),
wvc("faem", "bindDance", { key: "m1", from: "party", ox: -6, oz: 6, ry: 0.5 }), wvc("faem", "bindDance", { key: "m2", from: "party", ox: 6, oz: 6, ry: -0.5 }), wvc("fae", "bindDance", { key: "m3", from: "party", ox: 0, oz: 8, ry: Math.PI })],
state: { coldfire: 1, horseRaw: function (s) { return s < wqbIdx(WC19, "done"); }, horseDone: function (s) { return s >= wqbIdx(WC19, "done"); },
stonesGlow: function (s) { return s >= wqbIdx(WC19, "her"); }, bindPlatform: function (s) { return s >= wqbIdx(WC19, "rise"); }, iceCathedral: function (s) { return s >= wqbIdx(WC19, "rise"); },
frostArt: function (s) { return s >= wqbIdx(WC19, "rise"); }, auroraCrown: function (s) { return s >= wqbIdx(WC19, "whole"); }, mirrorTruth: function (s) { return s > wqbIdx(WC19, "gerda"); },
reception: function (s) { return s >= wqbIdx(WC19, "party"); }, awenThreshold: function (s) { return s >= wqbIdx(WC19, "party"); },
env: function (s) { return s >= wqbIdx(WC19, "bind") ? "aurora" : null; } },
steps: [
{ k: "read" },
wvRead("👑 Two weeks after", wqQs("Two weeks after my resurrection, Glacia stood at the window of our chamber, staring out at the frozen landscape with an expression I'd come to recognize. Not quite sadness. Not quite guilt. Something heavier than both.", "\"The invitations should go out soon,\" I said, coming up behind her. \"Talia's already started planning the flowers. Apparently she has very strong opinions about seasonal arrangements.\"", "She smiled, but it didn't reach her eyes. \"Of course she does.\"") + wvsrc("Chapter 19"), "▶ Go to her"),
wvGo("bowerWindow", "Come up behind her at the window, and wrap your arms round her", { r: 3, say: "❄️ " + wqQ("\"Nothing's wrong.\" But her voice was too careful. Too controlled.") }),
wvAsk("Glacia", "At the window, the frozen landscape beyond", "❄️ \"I keep thinking about them\"", wqQ("\"I know.\" She pressed her hands to my chest. \"I know it wasn't entirely me. But it was my hands. My power. My kiss that killed them. And knowing why doesn't make them any less dead.\""), [
["What do you need?", wqQs("I cupped her face in my hands, making her look at me. \"What do you need?\"", "\"I don't know.\" The tears spilled over. \"I don't know how to live with this. How to move forward. How to—\"")],
["What about the carousel horse?", wqQs("\"The woodcarver,\" I said. \"The one who was making the carousel horse for his great-granddaughter. Remember? How it was unfinished.\"", "\"You can't undo what was done,\" I said. \"But you can finish what he started. You can give that little girl the gift her great-grandfather wanted her to have.\"", "\"No.\" I brushed away her tears with my thumbs. \"But it's something. Something real. Something tangible. A way to honor what he was making instead of only remembering how he died.\"")],
["His workshop?", wqQs("She stared at me for a long moment, and I could see her mind working. Considering. \"His workshop,\" she whispered. \"It would still be there. Frozen. Untouched.\"", "\"And then I could give it to her. To his family.\" Her hands tightened on my chest. \"They'll hate me. They should hate me.\"", "\"Maybe,\" I said honestly. \"But you'll have given them something anyway. Not because it earns forgiveness. Not because it makes things right. But because it's the right thing to do.\"")]
], { btn: "...", at: "bowerWindow" }),
wvRead("❄️ \"I need to do this alone\"", wqQs("She was quiet for a long time, and I could feel her trembling slightly. Finally, she nodded. \"I need to do this alone.\"", "\"I know.\"", "\"Will you—\" She looked up at me. \"Will you be here when I get back?\"", "I kissed her forehead. \"Always.\"") + wvsrc("Chapter 19"), "▶ The next morning"),
wvId("away", wvMoveRead("🌬️ South, on her own winds", wqQs("She left the next morning, flying south on winds that answered to her command now instead of compelling her.", "I had work to do. Wedding preparations, for one thing") + wvsrc("Chapter 19"), "▶ The palace steps", "palaceSteps", "🏰 The palace steps")),
wvHold("palaceSteps", 5, "Watch from the palace steps until she disappears into the distance", { r: 6, say: "👑 " + wqQ("It was going to be interesting.") }),
wvId("carve", wvMoveRead("🎠 The workshop", wqQs("Glacia told me later what happened.", "The carousel horse sat on the workbench, half-finished.", "She'd stood there for a long time, just looking at it. Remembering his face. His kindness. The way he'd forgiven her even as she killed him.", "But then she'd taken a breath, picked up his tools, and began to work.") + wvsrc("Chapter 19") + "<p>You are Glacia, as she told it.</p>", "▶ His tools", "carverRoom", "🪵 The woodcarver's workshop, frozen in time", WQG)),
wvHold("carverBench", 6, "Take up his tools. Sand and carve and shape, following the patterns he started", Object.assign({ r: 3, say: "🪵 " + wqQ("She told me how she'd sanded and carved and shaped, following the patterns he'd started.") }, WQG)),
wvHold("carverBench", 6, "Now your magic, carefully, precisely, to enhance rather than overwhelm: snowflakes and frost patterns", Object.assign({ r: 3, say: "❄️ " + wqQ("How she'd used her magic carefully, precisely, to enhance rather than overwhelm.") }, WQG)),
wvId("done", wvHold("carverBench", 6, "All day and into the night: oil it, and finish it", Object.assign({ r: 3, say: "🎠 " + wqQ("It took her all day and into the night. When she finally finished, the carousel horse was a masterpiece. Sturdy enough to last generations. Beautiful enough to take your breath away.") }, WQG))),
wvFind("carousel", "carverBench", "The carousel horse", "Take the finished horse in your arms", Object.assign({ verb: "hold it", say: "🎠 " + wqQ("She'd held it in her arms and wept.") }, WQG)),
wvId("door", wvGo("widowDoor", "The next morning: to the family's home, the horse in your arms", Object.assign({ r: 4, say: "🚪 " + wqQ("\"I know who you are,\" the woman had said, her voice shaking.") }, WQG))),
wvAsk("The woodcarver's granddaughter-in-law", "Hold out the carousel horse", "🎠 The door", wqQ("The woman had stared at the horse, then at Glacia, then back at the horse. \"You killed him.\""), [
["I wanted to finish what he started", wqQs("\"I know.\" Glacia had held out the carousel horse. \"I wanted to finish what he started. For your daughter. For him.\"")],
["I did", wqQs("\"I did.\" Glacia's voice had been steady despite the tears streaming down her face. \"I can't undo that. I can't bring him back. I can't make it right. But I can give you this. The gift he wanted to give.\"")],
["Because he loved her", wqQs("\"Why?\" The word was almost a sob. \"Why would you—\"", "\"Because he loved her,\" Glacia had said simply. \"And she deserves to have something made with that love.\"")]
], Object.assign({ btn: "...", at: "widowDoor" }, WQG)),
wvId("girl", wvHold("widowDoor", 5, "She peeks round her mother's skirts. Kneel down to the child's level", Object.assign({ r: 4, say: "🎠 " + wqQ("\"Horsie!\" she'd squealed, reaching for it.") }, WQG))),
wvRead("🎠 \"Grampy made it?\"", wqQs("Glacia had knelt down, bringing herself to the child's level. \"Yes, sweetheart. It's a horsie. From your Grampy. He made it for you because he loved you very much.\"", "The child had taken the horse with reverent care, her face lighting up with pure joy. \"Grampy made it?\"", "\"He did.\" Glacia's voice had broken. \"He wanted you to have it.\"", "The little girl had hugged the horse tight, then—with the unselfconscious affection of a child—had hugged Glacia too. \"Thank you!\"", "Glacia told me she'd nearly shattered right there.") + wvsrc("Chapter 19"), "▶ ...", WQG),
wvRead("🏠 \"I've blessed your home\"", wqQs("She'd stood, facing the mother again. \"I've blessed your home,\" she'd said quietly. \"You and your family will never want for anything.", "\"Thank you,\" the woman had finally whispered. \"For finishing it. For—\" She'd looked at her daughter, happily rocking on her new horse. \"For giving her that.\"", "Glacia had left then, tears streaming down her face, her heart both lighter and heavier than before.") + wvsrc("Chapter 19"), "▶ ...", WQG),
wvId("orphans", wvMoveRead("🧒 The orphans", wqQs("But that was just the beginning.", "Some accepted. Some refused. Some screamed at her or wept or slammed doors in her face.", "She accepted all of it. Every reaction. Every bit of rage or grief or fear.", "And then she found the orphans.", "She found them all.", "And she brought them home.") + wvsrc("Chapter 19") + "<p>You are Kael again.</p>", "▶ Home", "orphansHall", "🏰 The great hall, full of children")),
wvTalk("Glacia", "Glacia, among the children", ["❄️ \"I'm adopting them\"", wqQs("\"I'm adopting them,\" she told me one evening, her voice firm despite the uncertainty in her eyes. \"All of them. Every child I orphaned.", "She gave them beautiful rooms in the palace. Hired teachers and caretakers. Made sure they had everything they needed. But more than that, she gave them her time. Her attention. Her love."), "..."], { at: "orphansHall" }),
wvHold("orphansFire", 8, "Sit by the fire while she reads to them; watch her dry tears and soothe nightmares", { r: 5, say: "🧒 " + wqQ("The ice palace filled with the sound of children's laughter.") }),
wvRead("❄️ \"I'm ready now\"", wqQs("And Glacia—my beautiful, broken, healing Glacia—bloomed.", "The wedding kept getting delayed. First one week, then another. But I didn't mind.", "\"I'm ready now,\" she said.", "I pulled her close. \"Then let's get married.\"", "\"Yes,\" she whispered against my chest. \"Let's.\"") + wvsrc("Chapter 19"), "▶ The day of our binding"),
wvId("bind", wvMoveRead("💍 The heart of the frozen wastes", wqQs("The day of our binding arrived with the winter sun barely cresting the horizon, painting the sky in shades of silver and blood-red.", "We didn't prepare in the palace. This ceremony couldn't be contained by walls, no matter how magnificent. This was something older. Something fundamental.", "The aurora already danced overhead, green and violet and blue, moving in patterns that seemed almost purposeful. Waiting.") + wvsrc("Chapter 19"), "▶ Walk there", "bindPlain", "❄️ The heart of the frozen wastes")),
wvGo("bindCentre", "Walk alone into the circle of standing ice, dressed simply in white and silver, covered in frost. No crown", { r: 6, say: "🌬️ " + wqQ("The wind howled around me, but it wasn't hostile. It was excited. Anticipatory. The realm itself knew what was coming.") }),
wvId("her", wvRead("❄️ Then I felt her approach", wqQs("Then I felt her approach.", "Glacia emerged from the white like a vision from before the world was made.", "She wore ice.", "She was terrifying. She was magnificent. She was mine.", "The standing stones of ice around us began to glow from within, pulsing with ancient magic.") + wvsrc("Chapter 19"), "▶ ...")),
wvId("sisters", wvRead("🌸☀️🍂 The three sisters", wqQs("\"They're coming,\" she said quietly, and I felt it too.", "Reality shimmered.", "Talia arrived first, stepping through spring into winter without transition.", "Alessia came next, summer fire blazing around her like a living thing.", "Cora arrived last, and with her came autumn's twilight.", "The three sisters. The three seasons. Anchoring reality so that winter—divided for so long—could finally become whole.", "\"We bear witness,\" they said in unison, their voices harmonizing in a way that made the air vibrate. \"We anchor. We stabilize. We hold the world steady while winter remembers itself.\"") + wvsrc("Chapter 19"), "▶ ...")),
wvRead("☀️ \"Speak your truth\"", wqQs("\"Speak your truth,\" Alessia commanded, her voice cutting through the wind like a blade. \"Let the realm hear what you are. What you choose. What you will become.\"", "\"I am Winter's soul,\" she said, and her voice resonated with power that made the ice beneath us crack and reform.", "\"I am the goddess who forgot herself. Who was corrupted and lost and broken.\" Her voice didn't waver. \"Who killed and destroyed and became a monster in children's stories.\"", "\"But I am also the goddess who remembered. Who chose love over emptiness. Who sacrificed everything to save what mattered most.\"") + wvsrc("Chapter 19"), "▶ My turn"),
wvCompel("👑 My turn", wqQ("My turn."), [wqQ("I took a breath, feeling my power surge in response to hers. \"I am Winter's hand,\" I said, and my voice carried the weight of millennia."), wqQ("\"I am the primordial who forgot his purpose. Who was cursed and corrupted and reduced to beast.\""), wqQ("\"But I am also the primordial who was saved. Who learned that strength without love is just destruction. Who died and was reborn into something greater.\"")], "Speak", { holdBtn: "Speak" }),
wvId("rise", wvRead("⛪ The world exploded", wqQs("The moment our powers fully touched, the world exploded.", "Not with destruction—with transformation.", "The ice beneath us shattered and reformed in an instant, creating a platform that rose from the frozen plain.", "\"Join hands,\" Cora commanded, her voice cutting through the chaos. \"Let the merging begin.\"") + wvsrc("Chapter 19"), "▶ Join hands")),
wvId("merge", wvHold("bindCentre", 6, "Reach out. Glacia reaches out. Your fingers touch", { r: 5, say: "✨ " + wqQ("The world went white.") })),
wvRead("✨ One", wqQs("I felt her essence pour into me—not invading, merging.", "And I felt myself pour into her.", "For a moment—an eternity—we weren't separate beings. We were one. Winter, whole and complete and perfect.", "We understood each other completely. Perfectly. Without words or explanation or doubt.", "And then, slowly, we separated.") + wvsrc("Chapter 19"), "▶ ..."),
wvId("whole", wvRead("👑 Winter is whole", wqQs("The aurora settled into a pattern overhead that looked almost like a crown, blessing us from the sky itself.", "\"It is done,\" Talia whispered. \"Winter is whole.\"", "\"The binding is complete,\" Alessia said, her voice rough with emotion. \"Soul and hand, merged and separate, forever changed.\"", "\"You are married,\" Cora said, and smiled through her tears.", "\"Hello, husband,\" she said, and her voice carried harmonics that hadn't been there before—echoes of my own power woven through hers.", "\"Hello, wife,\" I replied, and heard her essence in my voice—her warmth, her love, her strength.", "We kissed, and the realm sang.") + wvsrc("Chapter 19"), "▶ The gifts")),
wvTalk("Talia", "Talia, to the east", ["🌸 Renewal", wqQs("\"There are gifts to be given,\" Talia said formally.", "\"I give you the blessing of Renewal,\" she said, her voice resonating with divine authority. \"May your love never grow stale or tired or old. May it renew itself with each passing season, finding new depths, new expressions, new ways to grow. May you always see each other with fresh eyes. May you always find new reasons to choose each other.\""), "..."], { at: "bindEast" }),
wvTalk("Alessia", "Alessia, to the south", ["☀️ Passion", wqQs("Alessia stepped forward next, summer fire blazing around her. \"I give you the blessing of Passion,\" she said, and her voice was fierce. \"May your love burn eternal. May it never dim or fade or cool. May you always desire each other—not just physically, but in every way. May you hunger for each other's presence, each other's thoughts, each other's very existence. May you be each other's obsession in the best possible way.\""), "..."], { at: "bindSouth" }),
wvTalk("Cora", "Cora, to the west", ["🍂 Transformation", wqQs("Cora approached last, and autumn's twilight swirled around her. \"I give you the blessing of Transformation,\" she said, her voice carrying the weight of endings and beginnings. \"May you embrace change without fear. May you transform together, not apart. May you accept that love is not static—it is a living thing that grows and changes and sometimes dies and is reborn into something new. May you have the courage to let each other change. May you have the wisdom to change together.\"", "And we would do it together.", "\"That's what family does,\" Talia said simply, and embraced us both."), "..."], { at: "bindWest" }),
wvId("gerda", wvRead("✨ The air shimmered", wqQs("The air shimmered.", "Gerda stepped through a portal that looked like it was made of starlight.", "She carried something large, wrapped in cloth.", "\"Forgive my intrusion,\" she said, her voice carrying easily across the frozen plain. \"But I have traveled far to bring you a gift. A final piece of the story. A transformation to match your own.\"") + wvsrc("Chapter 19"), "▶ ...")),
wvGo("bindMirror", "She sets down her burden and pulls away the cloth. Go and look", { r: 4, say: "🪞 " + wqQ("But transformed beyond recognition.") }),
wvTalk("Gerda", "Gerda, beside the mirror", ["🌹 The Mirror of Truth", wqQs("The frame was no longer silver—it was gold, warm and bright, worked into patterns of thorns and roses so intricate they almost looked alive.", "\"The Mirror of Truth,\" Gerda said formally, and her voice carried the weight of ritual. \"Purged of all demonic corruption. Cleansed of Malakar's influence.", "\"It will show you only truth,\" she continued. \"Good or bad. Beautiful or painful. It will never lie, never deceive, never show you what you wish to see instead of what is.\""), "..."], { at: "bindMirror" }),
wvRead("✨ \"Goodbye, Kael\"", wqQs("Glacia stepped forward and embraced Gerda. \"Thank you,\" she whispered. \"For this. For Kael. For giving us both the chance to become who we were meant to be.\"", "\"Goodbye, Kael,\" she said softly. \"I'm glad you found what I couldn't give you.\"", "\"Goodbye, Gerda,\" I replied. \"Thank you. For everything.\"", "She nodded once, then stepped through the portal and was gone.", "The mirror remained, standing on the ice, reflecting our merged forms back at us with perfect, painful clarity.") + wvsrc("Chapter 19"), "▶ The celebration"),
wvId("party", wvRead("🎶 The whole realm celebrated", wqQs("The celebration that followed wasn't a reception in any traditional sense.", "The whole realm celebrated.", "—they transformed into tiny ice sculptures. Flowers and animals and abstract patterns that covered every surface in beauty.", "Music filled the air summoned by Cora with a snap of her fingers.") + wvsrc("Chapter 19"), "▶ ...")),
wvGo("bindDance", "Through the ice cathedral, where the sisters dance and the seasons blend, and the children run", { r: 8, say: "🎶 " + wqQ("Glacia and I moved through it all in a daze.") }),
wvAsk("Glacia", "Glacia, her hand in yours, watching the children play", "❄️ \"Can you feel it?\"", wqQ("\"Can you feel it?\" she asked at one point, her hand in mine as we watched the children play."), [
["The realm?", wqQs("\"The realm?\" I asked. \"Yes. It's... happy. Relieved. Like it's been holding its breath for a century and can finally exhale.\"")],
["Us?", wqQs("\"Not just the realm,\" she said, and pressed my hand to her chest, over the ember. \"Us. Can you feel how we're different now?\"", "We were separate. We were together. We were two. We were one.", "We were whole.")]
], { btn: "...", at: "bindDance" }),
wvGo("awenGate", "Where the cathedral's far arch stands, the binding has opened a threshold, and light beyond it: Awen, and the place that will be Frostspire", { r: 6, say: "✨ The threshold into Awen." })
] });
function wqeGoAwen(at, fb) {
return function () {
try {
if (typeof WORLDS !== "undefined" && WORLDS.drakkyn && typeof worldGo === "function" && worldGo("drakkyn", { at: at }) !== false)
return;
}
catch (e) { }
if (WLD.on === WQW_KEY && fb)
wvMove(fb, null)();
};
}
(function () {
var ws = wqbWorldState;
wqbWorldState = function () { if (WLD.on && WLD.on !== WQW_KEY)
return; return ws.apply(this, arguments); };
setInterval(function () {
try {
if (typeof store === "undefined" || !store.wqbook)
return;
var S = wqbS();
if (!S.started || S.done || !WLD.on || WLD.on === WQW_KEY)
return;
var C = WQB_CH[S.ch];
if (!C || !C.away)
return;
var b = wqbStep();
if (!b)
return;
if (b.k === "read") {
if (!WQB.readOpen && !WQB.readAsk)
wqbChapterCard();
return;
}
if (b.k === "puzzle" && (!WQB.puzOpen || performance.now() - (WQB.puzT || 0) > 3000))
wqbPuzzleCard(b);
}
catch (e) { }
}, 900);
})();
var WCE = wqbCh({ n: "Epilogue", t: "Winter's Truth", txt: 20, as: "iceking", start: "awenGate", jump: 1, away: 1, tune: "court", keep: ["truth", "Winter's Truth", "📖"],
words: "Centuries later. You are Kael, in the square of Frostspire, and you have told them everything: the truth you promised in the beginning.",
intro: "Frostspire, in Awen",
state: { reception: 1, iceCathedral: 1, bindPlatform: 1, stonesGlow: 1, auroraCrown: 1, awenThreshold: 1, mirrorTruth: 1, env: "aurora" },
steps: [
{ k: "read" },
wvRead("✨ Through the threshold", "<p>You step through the threshold the binding opened, into Awen. Around the ice cathedral, over the centuries, Frostspire has grown.</p>" + wqQ("But that was centuries ago.") + wvsrc("Epilogue"), "▶ Frostspire", { done: wqeGoAwen("fSquare", "bindDance") }),
wvRead("📖 \"The truth about winter\"", wqQs("I stand now in the village square—the same place where the ice cathedral first erupted from the frozen earth during our binding ceremony. The cathedral still stands, of course, but it's been joined by homes and shops and gardens. By life.", "The crowd before me is silent, waiting. They've been listening for hours as I told them everything. The truth I promised in the beginning.", "\"And that,\" I say quietly, \"is the truth about winter.\"", "For a moment, no one moves. No one speaks.") + wvsrc("Epilogue"), "▶ ..."),
wvPuzzle("🥖 The baker", wqQ("Then a woman in the front row—a baker, I think, with flour still dusting her apron—wipes tears from her cheeks. \"She was trying to save herself,\" she whispers. \"All that time, she was fighting.\"") + "<br>What do you tell her?", ["She was. And she won. We won. Together.", "She was the villain of the story.", "It was only a tale."], 0, ["", "That was never the truth.", "You promised them the truth."], { yes: "👑 " + wqQ("\"She was,\" I confirm. \"And she won. We won. Together.\"") }),
wvRead("❄️ \"That's love\"", wqQs("A man near the back, one of the fae who'd traveled from Talia's realm for the celebration, shakes his head in wonder. \"A century of corruption, and she still came back. That's... that's extraordinary.\"", "\"That's love,\" says another voice, and I turn to see Glacia standing at the edge of the crowd, our son Jayke perched on her hip.", "The crowd parts for her, and I see it in their faces. Not fear. Not anymore. Understanding. Compassion. Love.", "They know her now. The real her. Not the Snow Queen of nightmares, but Glacia. Winter's soul. The goddess who fought her way back from corruption and chose love over isolation.") + wvsrc("Epilogue"), "▶ Slip away"),
wvRead("🏰 The path up to the palace", wqQs("The celebration resumes, music and dancing and joy filling the square.", "But we slip away quietly, the three of us, walking the familiar path back up to the palace.", "\"Did you tell it right?\" Glacia asks, linking her arm through mine while Jayke runs ahead, leaving frost\u0002patterns in his wake.", "\"I told it true,\" I say. \"That's all I promised.\"", "She leans her head against my shoulder. \"They really do understand now, don't they? It's not just tolerance. They actually love winter.\"", "\"They love you,\" I correct. \"Winter is just part of the package.\"") + wvsrc("Epilogue"), "▶ The mirror chamber", { done: wqeGoAwen("fPalace", "bindMirror") }),
wvRead("🧹 The mirror chamber", wqQs("The mirror chamber was empty.", "Had slipped away from the crowd with practiced ease, the kind that came from a lifetime of being overlooked.", "And at the center of it all, hanging on the far wall, was the mirror.", "She approached slowly, her heart pounding. She'd heard the stories, of course. Everyone had. The Mirror of Truth, forged from the shattered pieces of a demon's corruption, purified by love and sacrifice. A mirror that showed things as they truly were, stripped of illusion and lies.") + wvsrc("Epilogue") + "<p>You are a servant of Frostspire.</p>", "▶ ...", { as: "servant" }),
wvRead("🧹 \"I deserve more than this\"", wqQs("Her hands clenched at her sides. \"I deserve more than this. I deserve to be seen. To be recognized. To be powerful.\"", "Surely the mirror would show her that. Would reveal the path to the power and recognition she craved.", "She stepped closer, close enough now to see every detail of her reflection. The plain dress. The work-roughened hands. The face that no one ever looked at twice.") + wvsrc("Epilogue"), "▶ ...", { as: "servant" }),
wvPuzzle("🪞 Show me", wqQ("\"Show me,\" she breathed. \"Show me what I could be. What I should be. Show me how to rise above this.\"") + "<br>Her hand reaches out, trembling, toward the flawless glass. What does she say?", ["Mirror, Mirror on the Wall.", "Nothing. She turns away.", "Show me Kael and Glacia."], 0, ["", "Not tonight. Not her.", "It is herself she wants to see."], { as: "servant", yes: "🪞 " + wqQ("\"Mirror, Mirror on the Wall.\"") }),
wvRead("🪞 \"Mirror, Mirror on the Wall\"", wqQs("Her hand reached out, trembling slightly, fingers stretching toward the flawless glass.", "And then, with all the desperate hope and bitter ambition of a woman who'd spent her life being invisible, she spoke the words that would change everything:", "\"Mirror, Mirror on the Wall.\"") + wvsrc("Epilogue"), "▶ The end", { as: "servant" })
] });
function wqrDone() { var S = wqbS(); return !!S.done || (typeof isKeeperNow === "function" && isKeeperNow()); }
function wqrMirrorVoid() { return __ZC(502, 167, this, arguments, new.target); }
var WQR_CRUEL = [wqQ("Weak, the darkness whispered. Pathetic. Begging her to kill you like some mewling mortal."), wqQ("She's corrupted. Tainted. The shard in her chest makes her less than nothing. Why are you wasting your essence on her?"), wqQ("She should fear you. She should understand what you are. What you could do to her.")];
var WQR_HOLD = [wqQ("No. I won't hurt her. I won't."), wqQ("Don't let me become this. Please. If you love me, don't let me become this."), wqQ("I fought. Oh, how I fought. Every muscle in my body locked up as I battled against the corruption's control.")];
function wqrLastHold() { return __ZC(502, 168, this, arguments, new.target); }
(function () {
var b0 = WQW_SCN.palace.build;
WQW_SCN.palace.build = function (G) {
b0(G);
var V = WQW_AT.dreamMirror, H = wqwInAt("palace", 0, -15, 12);
wqwSpot(V.x, V.z, 4, "The Mirror Void", "step into the glass", wqrMirrorVoid, WQW_IN_Y);
wqwSpot(H.x, H.z, 3, "The Last Hold", "go into the grey, and hold on", wqrLastHold, WQW_IN_Y);
};
})();
