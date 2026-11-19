/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var WDW_KEY = "wonderland", WDW_NAME = "Alice's Adventures in Wonderland", WDW_LONG = "Alice's Adventures in Wonderland: the riverbank, the rabbit-hole, the hall of doors, the pool of tears, the houses of Wonderland, the Queen's garden and the court";
var WDW = { base: -12100000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], moving: false, ride: null, night: 0, lights: 0, water: [], inst: [], beasts: [], hgt: null, rooms: [], doors: [], envK: null, st: {}, size: 1, sizeTo: 1 };
var WDW_ERA = " It is a hot summer afternoon in 1862, in the dream of Alice Liddell's namesake in Lewis Carroll's book Alice's Adventures in Wonderland (1865; the book and Tenniel's pictures only, never any film or cartoon). Speak as that character does in the book: briefly, in character, with the book's own nonsense, logic and manners; keep it kind and suitable for all ages.";
var WDW_SC = {
bank: { x: 0, name: "The riverbank", bound: 560, env: "meadow" },
well: { x: 3000, name: "Down the rabbit-hole", bound: 60, env: "well" },
hall: { x: 6000, name: "The long, low hall", bound: 120, env: "hall" },
wonder: { x: 9000, name: "Wonderland", bound: 900, env: "wonder" },
garden: { x: 12000, name: "The Queen's garden", bound: 760, env: "garden" }
};
function wdwScAt(x) { var best = null, bd = 1e9; for (var k in WDW_SC) {
var d = Math.abs(x - WDW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 1500 ? best : null; }
var WDW_AT = {};
function wdwAtPt(at) { if (typeof at === "string")
at = WDW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
function wdwEyeH() { return 1.72 * (WDW.size || 1); }
function wdwEyeOff() { return wdwEyeH() - 1.72; }
function wdwSizeSet(to, quick) { WDW.sizeTo = to; if (quick)
WDW.size = to; try {
wdbS().size = to;
}
catch (e) { } }
function wdwNear(back) {
if (typeof camera === "undefined")
return;
if (WDW.near0 == null)
WDW.near0 = camera.near;
var want = back ? WDW.near0 : ((WDW.size || 1) < 0.95 ? Math.max(0.02, WDW.near0 * (WDW.size || 1)) : WDW.near0);
if (Math.abs(camera.near - want) > 0.004) {
camera.near = want;
camera.updateProjectionMatrix();
}
}
function wdwSizeTick(dt) {
wdwNear();
var a = WDW.size || 1, b = WDW.sizeTo || 1;
if (Math.abs(a - b) < 0.002) {
WDW.size = b;
return;
}
var r = Math.pow(b / a, Math.min(1, dt * 0.9));
var n = a * r;
if ((b > a && n > b) || (b < a && n < b))
n = b;
var o0 = 1.72 * a - 1.72, o1 = 1.72 * n - 1.72;
WDW.size = n;
camera.position.y += o1 - o0;
}
function wdwSizeName() { var s = WDW.size || 1; if (s < 0.09)
return "about three inches high"; if (s < 0.18)
return "about ten inches high"; if (s < 0.4)
return "about a foot or two high"; if (s < 0.8)
return "a little short of yourself"; if (s < 1.25)
return "your own right size"; if (s < 2)
return "nine feet high"; return "enormous"; }
var WDW_ENV = {
meadow: { top: 0x4A8ED8, low: 0xEAF0E0, fog: 0xD4E2CC, fogD: 0.0012, sun: 1.08, sunCol: 0xFFF2D4, sunDir: [0.45, 0.82, 0.3], hemi: 0.78, hemiCol: 0xDCECF4, hemiGround: 0x4A6A2A },
hot: { top: 0x5A92D8, low: 0xF0EEDC, fog: 0xE0E2CC, fogD: 0.0014, sun: 1.12, sunCol: 0xFFEFC8, sunDir: [0.3, 0.92, 0.2], hemi: 0.8, hemiCol: 0xE8F0F4, hemiGround: 0x5A6A2E },
dusk: { top: 0x2A3A6A, low: 0xE8A070, fog: 0xB89078, fogD: 0.0022, sun: 0.62, sunCol: 0xFFA868, sunDir: [-0.75, 0.25, 0.3], hemi: 0.6, hemiCol: 0xE8C0A8, hemiGround: 0x3A2E22 },
well: { top: 0x1A120C, low: 0x4A3826, fog: 0x2A1E14, fogD: 0.018, sun: 0.3, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 1.1, hemiCol: 0xFFE0B0, hemiGround: 0x2A1E12 },
hall: { top: 0x2A2018, low: 0x6A5038, fog: 0x3A2C1E, fogD: 0.009, sun: 0.34, sunCol: 0xFFE0A8, sunDir: [0.2, 0.9, 0.1], hemi: 0.92, hemiCol: 0xFFE8C0, hemiGround: 0x3A2A1A },
tears: { top: 0x2A2A30, low: 0x5A6A70, fog: 0x3A4A50, fogD: 0.008, sun: 0.34, sunCol: 0xFFE0B0, sunDir: [0.2, 0.9, 0.1], hemi: 0.9, hemiCol: 0xF0E0C8, hemiGround: 0x2A3A40 },
wonder: { top: 0x4A8AD8, low: 0xEEF0DE, fog: 0xD8E2C8, fogD: 0.0016, sun: 1.05, sunCol: 0xFFF0D0, sunDir: [0.4, 0.8, 0.3], hemi: 0.78, hemiCol: 0xDCEAF2, hemiGround: 0x4A6A2A },
wood: { top: 0x4A7AB8, low: 0xC8D8B8, fog: 0x9AAE90, fogD: 0.0042, sun: 0.8, sunCol: 0xFFF0C8, sunDir: [0.3, 0.85, 0.2], hemi: 0.66, hemiCol: 0xC8DCB8, hemiGround: 0x3A4A22 },
pepper: { top: 0x3A3028, low: 0x8A7860, fog: 0x6A5E4E, fogD: 0.022, sun: 0.4, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.8, hemiCol: 0xE8D0B0, hemiGround: 0x2A2018 },
tea: { top: 0x5A8ED8, low: 0xF0EADA, fog: 0xE0DCC8, fogD: 0.0016, sun: 1.0, sunCol: 0xFFE8C0, sunDir: [0.5, 0.7, 0.3], hemi: 0.76, hemiCol: 0xE8E8E0, hemiGround: 0x5A5A2A },
garden: { top: 0x4A8ED8, low: 0xF2EEE0, fog: 0xDCE4D0, fogD: 0.0013, sun: 1.08, sunCol: 0xFFF4DC, sunDir: [0.45, 0.8, 0.25], hemi: 0.8, hemiCol: 0xE0ECF4, hemiGround: 0x4A6A2A },
sea: { top: 0x6A94C8, low: 0xE4EAEE, fog: 0xC8D4DC, fogD: 0.0011, sun: 0.95, sunCol: 0xFFF0D8, sunDir: [-0.5, 0.6, 0.3], hemi: 0.76, hemiCol: 0xDCE6F0, hemiGround: 0x4A5A5A },
court: { top: 0x2A1E18, low: 0x7A5A40, fog: 0x4A3628, fogD: 0.008, sun: 0.4, sunCol: 0xFFE8C0, sunDir: [0.2, 0.9, 0.2], hemi: 1.0, hemiCol: 0xFFECC8, hemiGround: 0x4A2E1E },
indoor: { top: 0x2A2018, low: 0x4A3A2A, fog: 0x3A2E22, fogD: 0.012, sun: 0.26, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.86, hemiCol: 0xFFE6C0, hemiGround: 0x3A2A1E },
cards: { top: 0x3A2A3A, low: 0xC8A8B8, fog: 0x8A6A80, fogD: 0.0036, sun: 0.7, sunCol: 0xFFE0E8, sunDir: [0.3, 0.8, 0.2], hemi: 0.86, hemiCol: 0xF0D8E8, hemiGround: 0x4A2A3A },
night: { top: 0x060A18, low: 0x141A2A, fog: 0x10141E, fogD: 0.0042, sun: 0.22, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.28, hemiCol: 0x5A6A98, hemiGround: 0x0A0C10, stars: 0.95 }
};
var WDW_Q = [];
function wdQ(s) { WDW_Q.push(s); return "<i>“" + s + "”</i>"; }
function wdQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0;white-space:pre-line'>" + wdQ(s) + "</p>"; }).join(""); }
function wdEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function wdSrc(part) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>Lewis Carroll, Alice's Adventures in Wonderland (1865)" + (part ? ", " + part : "") + "</div>"; }
function wdwLite() { return typeof LITE !== "undefined" && !!LITE; }
function wdwPhotoTex(name, mpt, nrm) { return __ZC(514, 0, this, arguments, new.target); }
function wdwS(name, col, mpt, o) { return __ZC(514, 1, this, arguments, new.target); }
function wdwCanvas(key, w, h, fn) { if (WDW.tex[key])
return WDW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (WDW.tex[key] = t); }
function wdwM(key, make) { return WDW.mats[key] || (WDW.mats[key] = make()); }
function wdwLam(col, o) { return __ZC(514, 2, this, arguments, new.target); }
function wdwShine(col, r, mt) { return wdwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function wdwGlowM(col, op) { return wdwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function wdwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function wdwLeafTex() { return wdwPhotoTexAlpha(); }
function wdwPhotoTexAlpha() { var k = "leafpng"; if (WDW.tex[k])
return WDW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (WDW.tex[k] = t); }
function wdwFrondTex(kind) { return __ZC(514, 3, this, arguments, new.target); }
function wdwBambooTex() { return __ZC(514, 4, this, arguments, new.target); }
function wdwReedTex(kind) { return __ZC(514, 5, this, arguments, new.target); }
function wdwGrassTex() { return __ZC(514, 6, this, arguments, new.target); }
function wdwFlowerTex(col) { return __ZC(514, 7, this, arguments, new.target); }
function wdwSkinTex(kind) { return __ZC(514, 8, this, arguments, new.target); }
function wdwRippleTex() { return __ZC(514, 9, this, arguments, new.target); }
function wdwWaterM(col, op) { return wdwM("water" + col + "|" + op, function () { var t = wdwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var WDW_CELL = 48;
function wdwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / WDW_CELL), b = Math.floor(x1 / WDW_CELL), c = Math.floor(z0 / WDW_CELL), d = Math.floor(z1 / WDW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function wdwGridAdd(S) { var g = WDW.sgrid || (WDW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; wdwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function wdwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; WDW.solids.push(S); wdwGridAdd(S); return S; }
function wdwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; WDW.solids.push(S); wdwGridAdd(S); return S; }
function wdwSolidAt(x, z, feet) { return __ZC(514, 10, this, arguments, new.target); }
function wdwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; WDW.floors.push(F); return F; }
function wdwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; WDW.floors.push(F); return F; }
function wdwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function wdwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function wdwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < WDW.floors.length; i++) {
var F = WDW.floors[i];
if (F.off || !wdwFloorIn(F, x, z))
continue;
var y = wdwFloorY(F, x, z);
if (y <= feet + 1.1 * Math.min(1.3, Math.max(0.15, WDW.size || 1)) && (best === null || y > best))
best = y;
} return best; }
function wdwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; WDW.spots.push(S); return S; }
function wdwPerson(seed, x, z, y, o, ry) { return __ZC(514, 11, this, arguments, new.target); }
var WDW_VO = { "Alice": ["f", 7, 1.32, 1.02], "Alice's sister": ["f", 17, 1.1, 0.94], "The White Rabbit": ["m", 40, 1.32, 1.16], "The Mouse": ["m", 50, 1.28, 0.9],
"The Dodo": ["m", 60, 0.8, 0.84], "The Lory": ["f", 30, 1.22, 1.05], "The Eaglet": ["m", 14, 1.22, 1.06], "The Duck": ["m", 40, 1.1, 1.0], "The old Crab": ["f", 70, 0.95, 0.84],
"The young Crab": ["f", 12, 1.3, 1.06], "The Magpie": ["f", 60, 1.08, 0.96], "The Canary": ["f", 20, 1.45, 1.08], "Bill the Lizard": ["m", 30, 1.36, 0.9], "Pat": ["m", 40, 0.92, 1.0],
"The Caterpillar": ["m", 60, 0.74, 0.74], "The Pigeon": ["f", 40, 1.26, 1.16], "The Fish-Footman": ["m", 50, 0.84, 0.84], "The Frog-Footman": ["m", 50, 0.78, 0.78],
"The Duchess": ["f", 55, 0.86, 1.0], "The Cook": ["f", 50, 0.84, 1.04], "The Cheshire Cat": ["m", 40, 0.92, 0.84], "The March Hare": ["m", 35, 1.1, 1.12], "The Hatter": ["m", 40, 1.04, 1.12],
"The Dormouse": ["m", 30, 1.24, 0.74], "Two of Spades": ["m", 30, 1.0, 1.04], "Five of Spades": ["m", 30, 0.96, 1.06], "Seven of Spades": ["m", 30, 1.02, 1.08],
"The Gryphon": ["m", 50, 0.86, 1.02], "The Mock Turtle": ["m", 60, 0.74, 0.72], "A lobster": ["m", 40, 0.9, 0.95], "The Queen of Hearts": ["f", 45, 1.0, 1.16],
"The King of Hearts": ["m", 55, 1.1, 0.98], "The Knave of Hearts": ["m", 30, 0.96, 0.94], "The executioner": ["m", 45, 0.7, 0.84] };
function wdwTalk(P, name, persona, greet, r, fn) {
var V = WDW_VO[name] || null, t = { name: name, persona: persona + WDW_ERA, greet: greet };
if (V) {
t.sex = V[0];
t.age = V[1];
t.vp = V[2];
t.vr = V[3];
}
WDW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: t });
return P;
}
function wdwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(514, 12, this, arguments, new.target); }
function wdwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function wdwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = wdwHash(ix, iz), b = wdwHash(ix + 1, iz), c = wdwHash(ix, iz + 1), d = wdwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function wdwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * wdwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function wdwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function wdwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), wdwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); WDW.water.push(m); return m; }
var WDW_GEO = {};
function wdwGeo(k, make) { if (WDW_GEO[k])
return WDW_GEO[k]; var g = make(); g.userData.shared = 1; return (WDW_GEO[k] = g); }
function wdwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function wdwFronds(n, len, wid, droop, y0, ring) { return __ZC(514, 13, this, arguments, new.target); }
function wdwInst(P, geo, mat, list, o) { return __ZC(514, 14, this, arguments, new.target); }
function wdwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function wdwPathD(x, z, pts) { var best = 1e9; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = Math.sqrt(px * px + pz * pz);
if (d < best)
best = d;
} return best; }
function wdwStrip(P, pts, w, hfn, mat, lift) { return __ZC(514, 15, this, arguments, new.target); }
function wdwPlant(P, kind, list, o) { return __ZC(514, 16, this, arguments, new.target); }
function wdwTaper(pts, rads, seg, rs, flat) { return __ZC(514, 17, this, arguments, new.target); }
function wdwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function wdwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function wdwSkinM(kind, col) { return __ZC(514, 18, this, arguments, new.target); }
function wdwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), wdwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function wdwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(514, 19, this, arguments, new.target); }
function wdwBoxG(w, h, d) { return __ZC(514, 20, this, arguments, new.target); }
function wdwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(wdwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !wdwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
wdwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function wdwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(wdwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function wdwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(514, 21, this, arguments, new.target); }
function wdwHouse(P, x, z, w, d, h, o) { return __ZC(514, 22, this, arguments, new.target); }
function wdwLand(x, z) { if (WDW.inRm && wdwRoomAt(x, z))
return -999; return WDW.hgt ? WDW.hgt(x, z) : 0; }
function wdwGround(x, z, feet) { var f = wdwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = wdwLand(x, z); return f === null ? h : Math.max(f, h); }
var WDW_SCN = {};
function wdwSc() { return WDW_SC[WDW.sc] || WDW_SC.bank; }
function wdwSceneDrop() { return __ZC(514, 23, this, arguments, new.target); }
function wdwScene(k) { return __ZC(514, 24, this, arguments, new.target); }
function wdwVeil() { if (WDW.veil)
return WDW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); WDW.veil = v; return v; }
function wdwGo(at, msg, after) { return __ZC(514, 25, this, arguments, new.target); }
function wdwSmoke(P, x, y, z, col, n) { return __ZC(514, 26, this, arguments, new.target); }
function wdwFire(P, x, y, z, s) { return __ZC(514, 27, this, arguments, new.target); }
function wdwLocalSc() { var L = worldLocal(); return { x: L.x - wdwSc().x, z: L.z }; }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
Object.assign(DLN_WEAR, {
wdalice: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:calf:0.22:cloth", "oz:apron:full:short:0.18", "oz:sash", "oz:stock:knit"], col: { dress: 0xF0CC48, skirt: 0xF0CC48, trim: 0xFAFAF4, apron: 0xFCFCF8, sash: 0x3A6AC8, stock: 0xF6F4EE }, shoes: 0x141010 }; },
wdsister: function (o) { return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.3:cloth", "oz:collar:high:none", "oz:sash"], col: { dress: 0xE8EEF6, skirt: 0xD8E2F0, trim: 0xFAFAF6, collar: 0xFAFAF6, sash: 0x5A7AB8 }, shoes: 0x2A1E16 }; },
wdduchess: function (o) { return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.34:cloth", "oz:collar:high:none", "oz:pelerine"], col: { dress: 0x4A2A3A, skirt: 0x3A2030, trim: 0xE8D8A8, collar: 0xF4EEE0, cape: 0x2A1828 }, shoes: 0x1A1010 }; },
wdcook: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.24:cloth", "oz:apron:full:long:0.16"], col: { dress: 0x6A5A4A, skirt: 0x5A4A3A, trim: 0xE8E0D0, apron: 0xF0ECE0 }, shoes: 0x2A1E16 }; },
wdhatter: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth:chain", "oz:coat:frock:cloth", "oz:trousers:check", "oz:boots"], col: { shirt: 0xF6F2E8, collar: 0xF6F2E8, tie: 0xC83A3A, vest: 0xE8C860, coat: 0x3A4A6A, trou: 0xC8B890 }, shoes: 0x2A1E16 }; },
wdking: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:boots", "oz:pelerine"], col: { shirt: 0xE8C860, coat: 0xB82A2A, trou: 0x2A3A8A, cape: 0xF4F0E8 }, shoes: 0x1A1010 }; },
wdqueen: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.36:cloth", "oz:collar:high:none", "oz:pelerine"], col: { dress: 0xC82A2A, skirt: 0xB82A2A, trim: 0xE8C860, collar: 0xF4F0E8, cape: 0xF4F0E8 }, shoes: 0x1A1010 }; },
wdknave: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots"], col: { shirt: 0xE8C860, coat: 0xC82A2A, trou: 0x2A3A8A, stock: 0xF4F0E8 }, shoes: 0x1A1010 }; },
wdexec: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots", "oz:belt"], col: { shirt: 0x1A1A1E, trou: 0x1A1A1E, stock: 0x1A1A1E, belt: 0x3A2A1A }, shoes: 0x101010 }; }
});
if (typeof DLN_HAT !== "undefined") {
if (!DLN_HAT.wdhat)
DLN_HAT.wdhat = function (add) {
var g = new THREE.Group(), mt = wfMat(0x3A3A2E, { r: 0.7 });
g.add(new THREE.Mesh(wfGeo("wdhatb", function () { return new THREE.CylinderGeometry(0.2, 0.2, 0.014, 24); }), mt));
var cr = new THREE.Mesh(wfGeo("wdhatc", function () { return new THREE.CylinderGeometry(0.15, 0.12, 0.3, 20); }), mt);
cr.position.y = 0.15;
g.add(cr);
var bd = new THREE.Mesh(wfGeo("wdhatd", function () { return new THREE.CylinderGeometry(0.123, 0.123, 0.05, 20); }), wfMat(0x7A2A2A));
bd.position.y = 0.035;
g.add(bd);
var tk = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.07), new THREE.MeshLambertMaterial({ map: wdwCanvas("hat106", 128, 90, function (c, W, H) { c.fillStyle = "#F4EEDC"; c.fillRect(0, 0, W, H); c.fillStyle = "#2A1A10"; c.font = "bold 30px Georgia"; c.textAlign = "center"; c.fillText("10/6", W / 2, H * 0.62); c.font = "12px Georgia"; c.fillText("In this Style", W / 2, H * 0.24); }) }));
tk.position.set(0, 0.07, 0.13);
tk.rotation.x = -0.08;
g.add(tk);
g.rotation.x = -0.1;
add("Head", [0, 0.15, -0.01], g);
};
if (!DLN_HAT.wdhorn)
DLN_HAT.wdhorn = function (add) {
var g = new THREE.Group(), mt = wfMat(0xE8DCC0, { r: 0.8 });
[-1, 1].forEach(function (s) { var h = new THREE.Mesh(wfGeo("wdhorn", function () { var c = new THREE.ConeGeometry(0.09, 0.34, 12); c.translate(0, 0.17, 0); return c; }), mt); h.position.set(s * 0.12, 0.05, 0); h.rotation.z = -s * 0.5; g.add(h); });
var band = new THREE.Mesh(wfGeo("wdhornb", function () { return new THREE.TorusGeometry(0.15, 0.035, 8, 20); }), wfMat(0x8A6A2A, { m: 0.5, r: 0.4 }));
band.rotation.x = Math.PI / 2;
g.add(band);
var veil = new THREE.Mesh(wfGeo("wdhornv", function () { var c = new THREE.CylinderGeometry(0.16, 0.26, 0.36, 14, 1, true, Math.PI * 0.5, Math.PI); c.translate(0, -0.18, 0); return c; }), wfMat(0xF4F0E8, { r: 1 }));
veil.material.side = THREE.DoubleSide;
veil.position.z = -0.03;
g.add(veil);
add("Head", [0, 0.13, -0.01], g);
};
if (!DLN_HAT.wdcrown)
DLN_HAT.wdcrown = function (add) {
var g = new THREE.Group(), gold = wfMat(0xE8C048, { m: 0.85, r: 0.3 });
g.add(new THREE.Mesh(wfGeo("wdcrb", function () { return new THREE.CylinderGeometry(0.125, 0.12, 0.06, 18, 1, true); }), gold));
g.children[0].material.side = THREE.DoubleSide;
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, p = new THREE.Mesh(wfGeo("wdcrp", function () { return new THREE.ConeGeometry(0.022, 0.07, 5); }), gold);
p.position.set(Math.sin(a) * 0.122, 0.06, Math.cos(a) * 0.122);
g.add(p);
var j = new THREE.Mesh(wfGeo("wdcrj", function () { return new THREE.SphereGeometry(0.012, 6, 4); }), wfMat(i % 2 ? 0xC81A2A : 0x2A6AC8, { r: 0.2 }));
j.position.set(Math.sin(a) * 0.126, 0.015, Math.cos(a) * 0.126);
g.add(j);
}
var cap = new THREE.Mesh(wfGeo("wdcrc", function () { return new THREE.SphereGeometry(0.11, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); }), wfMat(0xA81A2A, { r: 0.8 }));
cap.scale.y = 0.7;
cap.position.y = 0.02;
g.add(cap);
add("Head", [0, 0.15, -0.01], g);
};
if (!DLN_HAT.wdmob)
DLN_HAT.wdmob = function (add) {
var m = new THREE.Mesh(wfGeo("wdmob", function () { var s = new THREE.SphereGeometry(0.16, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); s.scale(1.05, 0.75, 1.1); return s; }), wfMat(0xF8F4EC, { r: 1 }));
add("Head", [0, 0.1, -0.02], m);
var fr = new THREE.Mesh(wfGeo("wdmobf", function () { return new THREE.TorusGeometry(0.16, 0.022, 6, 22); }), wfMat(0xF8F4EC, { r: 1 }));
fr.rotation.x = Math.PI / 2;
add("Head", [0, 0.09, -0.01], fr);
};
if (!DLN_HAT.wdhood)
DLN_HAT.wdhood = function (add) { var m = new THREE.Mesh(wfGeo("wdhood", function () { var c = new THREE.ConeGeometry(0.16, 0.42, 12); c.translate(0, 0.12, 0); return c; }), wfMat(0x141416, { r: 1 })); add("Head", [0, 0.04, -0.02], m); };
}
if (typeof DLN_HELDF !== "undefined") {
if (!DLN_HELDF.wdcup)
DLN_HELDF.wdcup = function (add) {
var g = new THREE.Group(), w = wfMat(0xF4F2EC, { r: 0.3 });
var c = new THREE.Mesh(wfGeo("wdcup", function () { return new THREE.CylinderGeometry(0.04, 0.03, 0.05, 12, 1, true); }), w);
c.material.side = THREE.DoubleSide;
g.add(c);
var s = new THREE.Mesh(wfGeo("wdsau", function () { return new THREE.CylinderGeometry(0.06, 0.05, 0.008, 14); }), w);
s.position.y = -0.028;
g.add(s);
add("hand_r", [0, 0.02, 0.06], g);
};
if (!DLN_HELDF.wdaxe)
DLN_HELDF.wdaxe = function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("wdaxh", function () { return new THREE.CylinderGeometry(0.018, 0.02, 1.1, 6); }), wfMat(0x5A3A1E)));
var b = new THREE.Mesh(wfGeo("wdaxb", function () { return new THREE.BoxGeometry(0.02, 0.24, 0.22); }), wfMat(0xA8A8B0, { m: 0.85, r: 0.3 }));
b.position.set(0, 0.48, 0.1);
g.add(b);
add("hand_r", [0, 0.2, 0.02], g);
};
if (!DLN_HELDF.wdtarts)
DLN_HELDF.wdtarts = function (add) { var d = new THREE.Mesh(wfGeo("wdtartd", function () { return new THREE.CylinderGeometry(0.16, 0.13, 0.03, 16); }), wfMat(0xE8E4DC, { r: 0.3 })); add("hand_l", [0, 0, 0.12], d); };
}
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { wdalice: [null], wdsister: ["ladyhat"], wdduchess: ["wdhorn"], wdcook: ["wdmob"], wdhatter: ["wdhat"], wdking: ["wdcrown"], wdqueen: ["wdcrown"], wdknave: [null], wdexec: ["wdhood"] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { wdalice: [null], wdsister: ["book"], wdduchess: [null], wdcook: [null], wdhatter: ["wdcup"], wdking: [null], wdqueen: [null], wdknave: [null], wdexec: ["wdaxe"] });
})();
function wdwDressed(seed, dress, o) { return __ZC(514, 28, this, arguments, new.target); }
var WDW_ERA2 = WDW_ERA;
var WDP = {
alice: "You are Alice, a little girl of about seven, from Lewis Carroll's Alice's Adventures in Wonderland (1865; the book and Tenniel's pictures only): curious, polite, brave, sensible and sometimes cross; you keep trying to remember your lessons and your manners, you often talk to yourself, and you miss your cat Dinah. You are in Wonderland, where everything is curiouser and curiouser." + WDW_ERA2,
sister: "You are Alice's elder sister, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a gentle young lady sitting on the riverbank on a hot summer afternoon, reading a book with no pictures or conversations in it." + WDW_ERA2,
rabbit: "You are the White Rabbit, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a nervous, fussy rabbit with pink eyes, a waistcoat and a watch, forever late; you serve the King and Queen of Hearts and dread the Duchess and the Queen. Fuss about the time." + WDW_ERA2,
mouse: "You are the Mouse, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a proud, touchy, rather dry mouse who hates cats and dogs, tells a very dry history of William the Conqueror, and has a long and a sad tale." + WDW_ERA2,
dodo: "You are the Dodo, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a solemn, long-worded bird who leans on a stick and thinks the best way to get dry is a Caucus-race, in which everybody has won and all must have prizes." + WDW_ERA2,
lory: "You are the Lory, a parrot from Lewis Carroll's Alice's Adventures in Wonderland (1865): sulky, and you tell everyone you are older than they are and must know better." + WDW_ERA2,
eaglet: "You are the Eaglet, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a young eagle who likes plain English and says so." + WDW_ERA2,
duck: "You are the Duck, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you like to know what 'it' means, when you find it, which is generally a frog or a worm." + WDW_ERA2,
bird: "You are one of the curious creatures who fell into the pool of tears, from Lewis Carroll's Alice's Adventures in Wonderland (1865): wet, cross and uncomfortable, and alarmed by any talk of cats." + WDW_ERA2,
bill: "You are Bill, a little Lizard, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a meek, put-upon little fellow who always gets the jobs nobody else wants, like going down the chimney; later you are a juror." + WDW_ERA2,
pat: "You are Pat, the White Rabbit's servant, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you were digging for apples when there was an arm in the window, which filled the whole window." + WDW_ERA2,
puppy: "You are an enormous puppy, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you only bark, yelp and play with sticks.",
caterpillar: "You are the Caterpillar, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a large blue caterpillar sitting on top of a mushroom, smoking a long hookah; you are languid, sleepy, very short and contemptuous, you answer questions with questions, and you ask 'Who are YOU?'" + WDW_ERA2,
pigeon: "You are the Pigeon, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you are sure everyone is a serpent after your eggs, and you have tried the roots of trees and banks and hedges and none of them suit." + WDW_ERA2,
fishfoot: "You are the Fish-Footman, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a footman in livery with a face like a fish, very grand and solemn; you deliver letters from the Queen to the Duchess." + WDW_ERA2,
frogfoot: "You are the Frog-Footman, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a footman in livery with a face like a frog and powdered curly hair; you sit by the Duchess's door staring stupidly up into the sky, and you will sit there till tomorrow, or the next day, maybe." + WDW_ERA2,
duchess: "You are the Duchess, from Lewis Carroll's Alice's Adventures in Wonderland (1865): ugly, sharp-chinned, bad-tempered in your kitchen and unpleasantly affectionate later; you find a moral in everything ('and the moral of that is...')." + WDW_ERA2,
cook: "You are the Duchess's Cook, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you put far too much pepper in the soup and throw saucepans and dishes about; you say tarts are made of pepper, mostly." + WDW_ERA2,
cat: "You are the Cheshire Cat, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you grin from ear to ear, you vanish and appear again, beginning or ending with the grin; you say that everyone here is mad, you are mad, and so is whoever you are talking to, or they wouldn't have come here." + WDW_ERA2,
hare: "You are the March Hare, from Lewis Carroll's Alice's Adventures in Wonderland (1865): mad (it is May, so not raving mad), rude at the tea-table, you offer wine when there isn't any and you buttered the Hatter's watch with the best butter." + WDW_ERA2,
hatter: "You are the Hatter, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you quarrelled with Time, so it is always six o'clock and always tea-time; you ask riddles with no answers, make personal remarks, and you are nervous of the Queen." + WDW_ERA2,
dormouse: "You are the Dormouse, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you are nearly always asleep, and when you wake you tell the story of three little sisters who lived at the bottom of a treacle-well." + WDW_ERA2,
card: "You are a playing-card in Lewis Carroll's Alice's Adventures in Wonderland (1865): flat, oblong, with your hands and feet at the corners; you serve the King and Queen of Hearts and you are terribly afraid of the Queen, who says 'Off with his head!'" + WDW_ERA2,
queen: "You are the Queen of Hearts, from Lewis Carroll's Alice's Adventures in Wonderland (1865): furious, imperious, and you settle every difficulty by shouting 'Off with his head!' (though the King quietly pardons everyone). Be fierce and comic, never truly cruel to the player." + WDW_ERA2,
king: "You are the King of Hearts, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a timid, fussy little king, the judge at the trial, wearing your crown over your wig; you quietly pardon those the Queen condemns, and you are fond of your own rules (Rule Forty-two)." + WDW_ERA2,
knave: "You are the Knave of Hearts, from Lewis Carroll's Alice's Adventures in Wonderland (1865): accused of stealing the Queen's tarts; you say you didn't write the verses and there's no name signed at the end." + WDW_ERA2,
exec: "You are the executioner, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you hold that you can't cut off a head unless there's a body to cut it off from." + WDW_ERA2,
gryphon: "You are the Gryphon, from Lewis Carroll's Alice's Adventures in Wonderland (1865): half eagle, half lion, lazy and jolly; you went to school with the Mock Turtle, and you say 'It's all his fancy, that: he hasn't got no sorrow, you know.'" + WDW_ERA2,
turtle: "You are the Mock Turtle, from Lewis Carroll's Alice's Adventures in Wonderland (1865): you were once a real Turtle, and now you sit sighing on a ledge of rock by the sea, telling of your school in the sea (Reeling and Writhing, Ambition, Distraction, Uglification and Derision) and singing of beautiful soup." + WDW_ERA2,
juror: "You are a juror in the court of the King and Queen of Hearts, from Lewis Carroll's Alice's Adventures in Wonderland (1865): a small creature (a bird or a beast) writing busily on your slate, putting down your name in case you forget it before the end of the trial." + WDW_ERA2,
creature: "You are one of the creatures of Wonderland, from Lewis Carroll's Alice's Adventures in Wonderland (1865): odd, polite in your own way and quite certain of your own logic." + WDW_ERA2
};
function wdwPersona(k) { return WDP[k] || k || ""; }
var WDW_FOLK = {
alice: { name: "Alice", dress: "wdalice", sex: "f", hair: 0xE8C878, skin: 0xF6DCC8, persona: "alice", greet: "Curiouser and curiouser! Did you see which way the White Rabbit went?", child: true },
sister: { name: "Alice's sister", dress: "wdsister", sex: "f", hair: 0xB8904A, skin: 0xF2D8C2, persona: "sister", greet: "Do let me read in peace a little longer, dear. It's such a hot afternoon." },
duchess: { name: "The Duchess", dress: "wdduchess", sex: "f", hair: 0x8A7A6A, skin: 0xE8C8B0, persona: "duchess", greet: "Everything's got a moral, if only you can find it.", scale: [1.18, 0.98, 1.18] },
cook: { name: "The Cook", dress: "wdcook", sex: "f", hair: 0x5A4A3A, skin: 0xE8B898, persona: "cook", greet: "Pepper, mostly.", scale: [1.2, 1.0, 1.2] },
hatter: { name: "The Hatter", dress: "wdhatter", sex: "m", hair: 0x8A6A3A, skin: 0xEAC8B0, persona: "hatter", greet: "No room! No room! ... Why is a raven like a writing-desk?", scale: [0.92, 0.98, 0.92] },
queen: { name: "The Queen of Hearts", dress: "wdqueen", sex: "f", hair: 0x3A2A1A, skin: 0xEAC8B0, persona: "queen", greet: "Who are YOU? Can you play croquet?", scale: [1.08, 1.0, 1.08] },
king: { name: "The King of Hearts", dress: "wdking", sex: "m", hair: 0xD8D2C8, beard: "full", skin: 0xEAC8B0, persona: "king", greet: "Don't be nervous, or I'll have you executed on the spot.", scale: [0.96, 0.94, 0.96] },
knave: { name: "The Knave of Hearts", dress: "wdknave", sex: "m", hair: 0xB8904A, beard: "mustache", skin: 0xEAC8B0, persona: "knave", greet: "I didn't write it, and they can't prove I did." },
exec: { name: "The executioner", dress: "wdexec", sex: "m", hair: 0x141414, skin: 0xD8B898, persona: "exec", greet: "You can't cut off a head unless there's a body to cut it off from.", scale: [1.12, 1.04, 1.12] },
rabbit: { name: "The White Rabbit", make: "rabbit", persona: "rabbit", greet: "Oh my ears and whiskers, how late it's getting!" },
herald: { name: "The White Rabbit", make: "herald", persona: "rabbit", greet: "Silence in the court! The King and Queen of Hearts are seated." },
mouse: { name: "The Mouse", make: "mouse", persona: "mouse", greet: "Ahem! Are you all ready? This is the driest thing I know." },
dodo: { name: "The Dodo", make: "dodo", persona: "dodo", greet: "The best way to explain it is to do it." },
lory: { name: "The Lory", make: "lory", persona: "lory", greet: "I am older than you, and must know better." },
eaglet: { name: "The Eaglet", make: "eaglet", persona: "eaglet", greet: "Speak English! I don't know the meaning of half those long words." },
duck: { name: "The Duck", make: "duck", persona: "duck", greet: "Found WHAT?" },
crab: { name: "The old Crab", make: "crab", persona: "bird", greet: "Ah, my dear! Let this be a lesson to you never to lose YOUR temper!" },
crabdau: { name: "The young Crab", make: "crabyoung", persona: "bird", greet: "Hold your tongue, Ma! You're enough to try the patience of an oyster!" },
magpie: { name: "The Magpie", make: "magpie", persona: "bird", greet: "I really must be getting home; the night-air doesn't suit my throat!" },
canary: { name: "The Canary", make: "canary", persona: "bird", greet: "Come away, my dears! It's high time you were all in bed!" },
bill: { name: "Bill the Lizard", make: "bill", persona: "bill", greet: "Oh, it's always me that has to go down the chimney." },
pat: { name: "Pat", make: "pat", persona: "pat", greet: "Digging for apples, yer honour!" },
puppy: { name: "The puppy", make: "puppy", persona: "puppy", greet: "Woof!", mute: true },
caterpillar: { name: "The Caterpillar", make: "caterpillar", persona: "caterpillar", greet: "Who are YOU?" },
pigeon: { name: "The Pigeon", make: "pigeon", persona: "pigeon", greet: "Serpent! Ugh, Serpent!" },
fishfoot: { name: "The Fish-Footman", make: "fishfoot", persona: "fishfoot", greet: "For the Duchess. An invitation from the Queen to play croquet." },
frogfoot: { name: "The Frog-Footman", make: "frogfoot", persona: "frogfoot", greet: "I shall sit here, till tomorrow ... or next day, maybe." },
pig: { name: "The baby", make: "pig", persona: "puppy", greet: "Grunt.", mute: true },
cat: { name: "The Cheshire Cat", make: "cat", persona: "cat", greet: "We're all mad here. I'm mad. You're mad." },
hare: { name: "The March Hare", make: "hare", persona: "hare", greet: "Have some wine. ... There isn't any." },
dormouse: { name: "The Dormouse", make: "dormouse", persona: "dormouse", greet: "Twinkle, twinkle, twinkle, twinkle..." },
two: { name: "Two of Spades", make: "card:spades:2", persona: "card", greet: "Look out now, Five! Don't go splashing paint over me like that!" },
five: { name: "Five of Spades", make: "card:spades:5", persona: "card", greet: "I couldn't help it. Seven jogged my elbow." },
seven: { name: "Seven of Spades", make: "card:spades:7", persona: "card", greet: "That's right, Five! Always lay the blame on others!" },
gryphon: { name: "The Gryphon", make: "gryphon", persona: "gryphon", greet: "What fun! It's all her fancy, that." },
turtle: { name: "The Mock Turtle", make: "turtle", persona: "turtle", greet: "Once, I was a real Turtle." },
lobster: { name: "A lobster", make: "lobster", persona: "creature", greet: "Will you, won't you, will you, won't you, will you join the dance?" }
};
function wdwFolk(key, x, z, ry, o) { return __ZC(514, 29, this, arguments, new.target); }
function wdwCrowd(seed, list, x0, z0, x1, z1, o) { return __ZC(514, 30, this, arguments, new.target); }
function wdwOne(seed, name, sex, dress, x, z, ry, greet, o) { return __ZC(514, 31, this, arguments, new.target); }
function wdwVoiceG() { var g = new THREE.Group(); g.userData.voice = 1; return g; }
var WDW_RY = -80;
function wdwMat(k) { return __ZC(514, 32, this, arguments, new.target); }
function wdwThatchM() { return __ZC(514, 33, this, arguments, new.target); }
function wdwInRoom() { return camera.position.y < WDW_RY + 30; }
function wdwRoomAt(x, z) { for (var i = 0; i < WDW.rooms.length; i++) {
var R = WDW.rooms[i];
if (x > R.x0 - 0.3 && x < R.x1 + 0.3 && z > R.z0 - 0.3 && z < R.z1 + 0.3)
return R;
} return null; }
function wdwRoom(P, key, cx, cz, w, d, o) { return __ZC(514, 34, this, arguments, new.target); }
function wdwDoor(R, name, ox, oz, ory) { return __ZC(514, 35, this, arguments, new.target); }
function wdwInDoor(fromKey, toKey, lx, lz, name, verb) { return __ZC(514, 36, this, arguments, new.target); }
function wdwIn(sc, key, lx, lz) {
return function () {
var R = WDW.sc === sc ? WDW.rooms.filter(function (r) { return r.key === key; })[0] : null;
if (R)
return { sc: sc, x: R.cx + lx, z: R.cz + lz, y: R.y };
var A = WDW_ROOMXZ[sc] && WDW_ROOMXZ[sc][key];
return A ? { sc: sc, x: A[0] + lx, z: A[1] + lz, y: WDW_RY } : null;
};
}
var WDW_ROOMXZ = {};
function wdwTable(P, x, z, w, d, h, o) { return __ZC(514, 37, this, arguments, new.target); }
function wdwChair(P, x, z, ry, o) { return __ZC(514, 38, this, arguments, new.target); }
function wdwBed(P, x, z, ry, o) { return __ZC(514, 39, this, arguments, new.target); }
function wdwShelves(P, x, z, w, h, ry, o) { return __ZC(514, 40, this, arguments, new.target); }
function wdwHearth(P, x, z, ry, o) { return __ZC(514, 41, this, arguments, new.target); }
function wdwCandle(P, x, y, z, o) { return __ZC(514, 42, this, arguments, new.target); }
function wdwBench(P, x, z, ry, o) { return __ZC(514, 43, this, arguments, new.target); }
function wdwRug(P, x, z, w, d, col) { return __ZC(514, 44, this, arguments, new.target); }
function wdwPicture(P, x, y, z, ry, w, h, draw) { return __ZC(514, 45, this, arguments, new.target); }
function wdwWindowIn(P, x, y, z, ry, w, h, o) { return __ZC(514, 46, this, arguments, new.target); }
function wdwTownHouse(P, x, z, w, d, h, o) { return __ZC(514, 47, this, arguments, new.target); }
function wdwChurch(P, x, z, o) { return __ZC(514, 48, this, arguments, new.target); }
function wdwTownWall(P, x0, z0, x1, z1, h, gate) { return __ZC(514, 49, this, arguments, new.target); }
function wdwConifer(P, list, o) { return __ZC(514, 50, this, arguments, new.target); }
function wdwBirch(P, list) { return __ZC(514, 51, this, arguments, new.target); }
function wdwPeak(P, x, z, r, h, o) { return __ZC(514, 52, this, arguments, new.target); }
function wdwBoat(P, x, y, z, ry, o) { return __ZC(514, 53, this, arguments, new.target); }
var WDW_UP = new THREE.Vector3(0, 1, 0), WDW_V1 = new THREE.Vector3(), WDW_V2 = new THREE.Vector3();
function wdwStick(m, a, b) { WDW_V1.set(b.x - a.x, b.y - a.y, b.z - a.z); var L = WDW_V1.length() || 0.001; m.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); m.quaternion.setFromUnitVectors(WDW_UP, WDW_V1.multiplyScalar(1 / L)); m.scale.set(1, L, 1); return m; }
function wdwVilla(P, x, z, o) { return __ZC(514, 54, this, arguments, new.target); }
function wdwVillaDoor(x, z, o) { o = o || {}; var w = o.w || 9, d = o.d || 8, ry = o.ry || 0, lx = w * 0.25, lz = d / 2 + 1.6; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function wdwShops(P, x, z, n, o) { return __ZC(514, 55, this, arguments, new.target); }
function wdwShopDoor(x, z, n, i, o) { o = o || {}; var sw = o.sw || 6, d = o.d || 9, ry = o.ry || 0, lx = -((n - 1) * sw) / 2 + i * sw + sw / 2 - 0.9, lz = d / 2 + 1.2; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function wdwRailway(P, pts, hfn) { return __ZC(514, 56, this, arguments, new.target); }
function wdwStation(P, x, z, len, name, o) { return __ZC(514, 57, this, arguments, new.target); }
function wdwSignal(P, x, z, hfn) { var g = new THREE.Group(); g.position.set(x, hfn(x, z), z); P.add(g); wdwCyl(g, 0.1, 0.14, 7, wdwLam(0xE8E4D8), 0, 0, 0, 8); var arm = wdwBox(g, 1.4, 0.24, 0.06, wdwLam(0xB82A22), 0.7, 6, 0.1); arm.rotation.z = -0.5; return g; }
function wdwBridge(P, x, z, len, w, y, o) { return __ZC(514, 58, this, arguments, new.target); }
function wdwLamp(P, x, z, hfn, o) { return __ZC(514, 59, this, arguments, new.target); }
function wdwPoles(P, pts, hfn, gap) { return __ZC(514, 60, this, arguments, new.target); }
function wdwPaling(P, pts, hfn, o) { return __ZC(514, 61, this, arguments, new.target); }
function wdwScorch(P, x, z, r, hfn, fires) { return __ZC(514, 62, this, arguments, new.target); }
function wdwDeadTrees(P, list) { return __ZC(514, 63, this, arguments, new.target); }
function wdwCart(P, x, z, ry, o) { return __ZC(514, 64, this, arguments, new.target); }
function wdwFar(P, hfn, col, o) { return __ZC(514, 65, this, arguments, new.target); }
function wdwPathAt(pts, s) { return __ZC(514, 66, this, arguments, new.target); }
function wdwPathLen(pts) { var L = 0; for (var i = 1; i < pts.length; i++)
L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function wdwStream(P, pts, hfn, o) { return __ZC(514, 67, this, arguments, new.target); }
var WDF = {};
function wdfAll() { (WDW.rooms || []).forEach(function (R) { var f = WDF[R.key]; if (f && R.g && !R.g.userData.furn) {
R.g.userData.furn = 1;
try {
f(R.g, R, wdwLite());
}
catch (e) {
if (window.console)
console.warn("[tarzan] furnish " + R.key, e);
}
} }); }
function wdfLantern(P, x, y, z, o) { return __ZC(514, 68, this, arguments, new.target); }
function wdfBasket(P, x, z, s, col) { s = s || 1; var m = wdwCyl(P, 0.22 * s, 0.17 * s, 0.3 * s, wdwLam(col || 0xB8945A), x, 0, z, 10); wdwCyl(P, 0.225 * s, 0.225 * s, 0.03 * s, wdwLam(0x8A6A3A), x, 0.29 * s, z, 10); return m; }
function wdfGourd(P, x, y, z, s) { return __ZC(514, 69, this, arguments, new.target); }
function wdfMat(P, x, z, w, d, col, ry) { var m = wdwBox(P, w, 0.03, d, wdwLam(col || 0xC8B070), x, 0, z, ry || 0); for (var i = 0; i < 4; i++)
wdwBox(P, w * 0.98, 0.032, 0.03, wdwLam(0x8A6A3A), x, 0, z - d / 2 + d * (i + 0.5) / 4, ry || 0); return m; }
function wdfStool(P, x, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var wd = wdwMat(o.mat || "darkoak");
wdwCyl(g, 0.24, 0.2, 0.08, wd, 0, o.h || 0.36, 0, 10);
wdwCyl(g, 0.08, 0.14, o.h || 0.36, wd, 0, 0, 0, 8);
wdwCyl(g, 0.2, 0.22, 0.06, wd, 0, 0, 0, 10);
return g;
}
function wdfShield(P, x, y, z, ry, col) { return __ZC(514, 70, this, arguments, new.target); }
function wdfTusk(P, x, z, ry) { var m = new THREE.Mesh(wdwGeo("wdTusk", function () { var c = new THREE.TorusGeometry(0.9, 0.06, 6, 12, Math.PI * 0.45); return c; }), wdwLam(0xF0E6CC)); m.position.set(x, 0.06, z); m.rotation.set(-Math.PI / 2, 0, ry || 0); P.add(m); return m; }
function wdfHang(P, x, y, z, n, col, len) { for (var i = 0; i < n; i++) {
wdwCyl(P, 0.01, 0.01, 0.3, wdwLam(0x6A5A3A), x + i * 0.18, y, z, 4);
wdwBox(P, 0.08, len || 0.3, 0.05, wdwLam(col || 0x8A5A2A), x + i * 0.18, y - (len || 0.3), z);
} }
function wdfWood(P, x, z, ry, n) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
n = n || 9;
for (var i = 0; i < n; i++) {
var l = wdwCyl(g, 0.07, 0.07, 0.9, wdwMat("bark"), 0, 0, 0, 6);
l.rotation.z = Math.PI / 2;
l.position.set(0, 0.08 + Math.floor(i / 4) * 0.13, -0.24 + (i % 4) * 0.16 + (Math.floor(i / 4) % 2) * 0.08);
}
return g;
}
function wdfBucket(P, x, z) { wdwCyl(P, 0.17, 0.14, 0.32, wdwMat("oak"), x, 0, z, 10); wdwCyl(P, 0.172, 0.172, 0.03, wdwLam(0x2A2A2A), x, 0.06, z, 10); wdwCyl(P, 0.172, 0.172, 0.03, wdwLam(0x2A2A2A), x, 0.25, z, 10); }
function wdfPegs(P, x, y, z, ry, items) { return __ZC(514, 71, this, arguments, new.target); }
function wdfPlates(P, x, y, z, n, spread) { for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
wdwCyl(P, 0.13, 0.11, 0.02, wdwLam(0xF4F2EA), x + Math.cos(a) * spread[0], y, z + Math.sin(a) * spread[1], 12);
wdwCyl(P, 0.035, 0.03, 0.12, wdwShine(0xD8E4E8, 0.1, 0.1), x + Math.cos(a) * spread[0] * 0.7, y, z + Math.sin(a) * spread[1] * 0.7, 8);
} }
function wdfBottle(P, x, y, z, col) { wdwCyl(P, 0.05, 0.05, 0.2, wdwShine(col || 0x2A4A2A, 0.15, 0.1), x, y, z, 8); wdwCyl(P, 0.018, 0.03, 0.08, wdwShine(col || 0x2A4A2A, 0.15, 0.1), x, y + 0.2, z, 6); }
function wdfClock(P, x, y, z, ry) { return __ZC(514, 72, this, arguments, new.target); }
function wdfStove(P, x, z, ry) { return __ZC(514, 73, this, arguments, new.target); }
function wdfSofa(P, x, z, ry, col) { return __ZC(514, 74, this, arguments, new.target); }
function wdfLampTable(P, x, z, o) { return __ZC(514, 75, this, arguments, new.target); }
function wdfDresser(P, x, z, ry, o) { return __ZC(514, 76, this, arguments, new.target); }
function wdfPlant(P, x, z, s) { s = s || 1; wdwPot(P, x, 0, z, 0.32 * s); for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, l = wdwBox(P, 0.07 * s, 0.5 * s, 0.02, wdwLam(0x3A6A2A, { ds: 1 }), x + Math.cos(a) * 0.08 * s, 0.28 * s, z + Math.sin(a) * 0.08 * s, a);
l.rotation.z = 0.5;
} }
function wdfHammock(P, x, y, z, len, ry) { var m = new THREE.Mesh(wdwGeo("wdHamk" + len, function () { var c = new THREE.CylinderGeometry(0.4, 0.4, len, 10, 1, true, Math.PI * 0.7, Math.PI * 0.6); c.rotateZ(Math.PI / 2); return c; }), wdwLam(0xD8CCAA, { ds: 1 })); m.position.set(x, y, z); m.rotation.y = ry || 0; P.add(m); return m; }
function wdfCoil(P, x, z) { var m = new THREE.Mesh(wdwGeo("wdCoil", function () { return new THREE.TorusGeometry(0.28, 0.07, 6, 16); }), wdwLam(0xB8A070)); m.rotation.x = Math.PI / 2; m.position.set(x, 0.07, z); P.add(m); var m2 = m.clone(); m2.position.y = 0.18; m2.scale.setScalar(0.8); P.add(m2); }
function wdfChart(P, x, y, z, w, d) { wdwBox(P, w, 0.005, d, wdwLam(0xE8DCB8), x, y, z); wdwBox(P, w * 0.6, 0.006, 0.01, wdwLam(0x3A5A8A), x, y, z - d * 0.1); wdwBox(P, 0.01, 0.006, d * 0.5, wdwLam(0x3A5A8A), x + w * 0.1, y, z); }
function wdfDrums(P, x, z) { [[0, 0, 0.9], [0.55, 0.2, 0.6], [-0.4, 0.3, 0.5]].forEach(function (q) { var g = new THREE.Group(); g.position.set(x + q[0], 0, z + q[1]); P.add(g); wdwCyl(g, 0.2 * q[2] + 0.08, 0.15 * q[2] + 0.06, 0.8 * q[2], wdwMat("darkoak"), 0, 0, 0, 12); wdwCyl(g, 0.2 * q[2] + 0.085, 0.2 * q[2] + 0.085, 0.02, wdwLam(0xD8C8A0), 0, 0.8 * q[2], 0, 12); }); }
function wdfCurtain(P, x, y, z, ry, w, h, col) { var m = wdwBox(P, w, h, 0.03, wdwLam(col || 0x8A2A2A, { ds: 1 }), x, y, z, ry || 0); return m; }
function wdfTimetable(P, x, y, z, ry) { return __ZC(514, 77, this, arguments, new.target); }
function wdwPot(P, x, y, z, h) { var m = wdwCyl(P, h * 0.42, h * 0.3, h, wdwMat("pot"), x, y, z, 12); wdwCyl(P, h * 0.46, h * 0.46, h * 0.12, wdwMat("pot"), x, y + h * 0.88, z, 12); return m; }
WDF.kitchen = function (g, R, lite) { return __ZC(514, 78, this, arguments, new.target); };
WDF.rabhall = function (g, R, lite) { return __ZC(514, 79, this, arguments, new.target); };
WDF.rabroom = function (g, R, lite) { return __ZC(514, 80, this, arguments, new.target); };
function wdcE(c, r, col, bone, o) { var p = { t: "e", c: c, r: r, col: col, bone: bone || "chest" }; if (o)
for (var k in o)
p[k] = o[k]; return p; }
function wdcC(a, b, r0, r1, col, bone, o) { var p = { t: "c", a: a, b: b, r0: r0, r1: r1, col: col, bone: bone || "chest" }; if (o)
for (var k in o)
p[k] = o[k]; return p; }
function wdcAt(E, s) { return function (x, y, z) { return [E[0] + x * s, E[1] + y * s, E[2] + z * s]; }; }
function wdcSoft(p, hf, df) { return __ZC(514, 81, this, arguments, new.target); }
function wdcEye(eyes, at, r, iris, pupil, o) { var e = { bone: "head", at: at, r: r, iris: iris, pupil: pupil || "r", turn: 0.25 }; if (o)
for (var k in o)
e[k] = o[k]; eyes.push(e); }
function wdcRabbitHead(at, s, eyes, fur, inner, eyeCol, hare) { return __ZC(514, 82, this, arguments, new.target); }
function wdcMouseHead(at, s, eyes, fur, inner) { return __ZC(514, 83, this, arguments, new.target); }
function wdcBirdHead(at, s, eyes, col, beakCol, kind, eyeCol) { return __ZC(514, 84, this, arguments, new.target); }
function wdcFrogHead(at, s, eyes, skin) { return __ZC(514, 85, this, arguments, new.target); }
function wdcFishHead(at, s, eyes, skin) { return __ZC(514, 86, this, arguments, new.target); }
function wdcLizHead(at, s, eyes, skin) {
var o = [], B = "head";
o.push(wdcE(at(0, 0.05, 0.04), [0.06 * s, 0.05 * s, 0.08 * s], skin, B));
o.push(wdcC(at(0, 0.04, 0.08), at(0, 0.02, 0.18), 0.045 * s, 0.022 * s, skin, B, { k: 0.015 * s }));
wdcEye(eyes, at(0.045, 0.075, 0.08), 0.016 * s, 0xC8B040, "slit");
return o;
}
function wdcCalfHead(at, s, eyes, hide) { return __ZC(514, 87, this, arguments, new.target); }
var WDW_CRX = {};
function wdwCrxKinds() { return __ZC(514, 88, this, arguments, new.target); }
function wdcHearts(I) { return __ZC(514, 89, this, arguments, new.target); }
function wdcTrumpet(I) { return __ZC(514, 90, this, arguments, new.target); }
function wdcStick(I, len) { var b = I.bones.R_hand || I.bones.L_hand; if (!b)
return; var s = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, len, 6), new THREE.MeshLambertMaterial({ color: 0x5A3A1E })); s.position.y = -len / 2 + 0.05; b.add(s); }
function wdwPartsGeo(plan) { return __ZC(514, 91, this, arguments, new.target); }
function wdwMergeC(list) { return __ZC(514, 92, this, arguments, new.target); }
function wdwStandInC(key) { return __ZC(514, 93, this, arguments, new.target); }
var WDW_SUITS = { spades: ["♠", "#141418"], clubs: ["♣", "#141418"], hearts: ["♥", "#C81A2A"], diamonds: ["♦", "#C81A2A"] };
function wdwCardFace(suit, n) { return __ZC(514, 94, this, arguments, new.target); }
function wdwCardBack() { return __ZC(514, 95, this, arguments, new.target); }
function wdwCardMan(kind, seed) { return __ZC(514, 96, this, arguments, new.target); }
function wdwCardTick(g, t, moving) { var C = g.userData.card; if (!C)
return; var s = moving ? Math.sin(t * 7 + C.ph) * 0.5 : Math.sin(t * 1.2 + C.ph) * 0.04; C.L[0].rotation.x = s; C.L[1].rotation.x = -s; C.A[0].rotation.x = -s * 0.6; C.A[1].rotation.x = s * 0.6; }
var WDW_CRX_WARM = ["wd_rabbit", "wd_alice"];
function wdwCreature(kind, seed) { return __ZC(514, 97, this, arguments, new.target); }
function wdxHaloTex() { return __ZC(514, 98, this, arguments, new.target); }
function wdxGlowStart() { return { pos: [], col: [], size: [] }; }
function wdxGlow(L, x, y, z, col, s) { if (!L)
return; L.pos.push(x, y, z); var c = new THREE.Color(col || 0xFFC070); L.col.push(c.r, c.g, c.b); L.size.push(s || 0.6); }
function wdxGlowDone(P, L, size) { return __ZC(514, 99, this, arguments, new.target); }
function wdxCandles(P, list, L, o) { return __ZC(514, 100, this, arguments, new.target); }
function wdxGilt() { return wdwShine(0xC89A3A, 0.32, 0.85); }
function wdxBrass() { return wdwShine(0xB8903A, 0.38, 0.8); }
function wdxSconce(P, x, y, z, ry, L, cl) { return __ZC(514, 101, this, arguments, new.target); }
function wdxChandelier(P, x, y, z, r, tiers, L, cl, ceil) { return __ZC(514, 102, this, arguments, new.target); }
function wdxDrapeGeo(w, h, folds, depth) { return __ZC(514, 103, this, arguments, new.target); }
function wdxDrape(P, x, y, z, w, h, ry, mat, o) { return __ZC(514, 104, this, arguments, new.target); }
function wdxSwag(P, x, y, z, w, drop, ry, mat) { return __ZC(514, 105, this, arguments, new.target); }
function wdxMirrorGlassM(tint) { return __ZC(514, 106, this, arguments, new.target); }
function wdxMirror(P, x, y, z, w, h, ry, o) { return __ZC(514, 107, this, arguments, new.target); }
function wdxPanelling(P, w, d, H, o) { return __ZC(514, 108, this, arguments, new.target); }
function wdxShaft(P, x, y, z, len, r0, r1, col, op, tx, ty, tz) { return __ZC(514, 109, this, arguments, new.target); }
function wdxPool(P, x, y, z, r, col, op) { return __ZC(514, 110, this, arguments, new.target); }
function wdxCafeTable(P, x, z, r, cloth, L, o) { return __ZC(514, 111, this, arguments, new.target); }
function wdxLamp(P, x, y, z, L, col) { return __ZC(514, 112, this, arguments, new.target); }
function wdxLeaves(P, cx, cy, cz, rx, ry, rz, n, seed, cols) { return __ZC(514, 113, this, arguments, new.target); }
function wdxTreeGeo(kind) { return __ZC(514, 114, this, arguments, new.target); }
function wdxCrownGeo(kind) { return __ZC(514, 115, this, arguments, new.target); }
function wdxLeafM(col) { return wdwM("wdxLeaf" + col, function () { var m = new THREE.MeshLambertMaterial({ color: col, map: wdwLeafTex(), alphaTest: 0.45, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }); }
function wdxTrees(P, kind, list, cols, o) { return __ZC(514, 116, this, arguments, new.target); }
function wdxStainedTex(kind) { return __ZC(514, 117, this, arguments, new.target); }
function wdxStainedM(kind, bright) { return wdwM("wdxSGM" + kind + (bright || 1), function () { var m = new THREE.MeshBasicMaterial({ map: wdxStainedTex(kind), transparent: true, alphaTest: 0.1, color: new THREE.Color(bright || 1, bright || 1, bright || 1) }); m.userData.noPhoto = 1; return m; }); }
function wdxLanternPost(P, x, y, z, L, h) { return __ZC(514, 118, this, arguments, new.target); }
function wdxWillowGeo() { return __ZC(514, 119, this, arguments, new.target); }
function wdxWillowFall() { return __ZC(514, 120, this, arguments, new.target); }
function wdxWillowTex() { return __ZC(514, 121, this, arguments, new.target); }
function wdxWillows(P, list) { return __ZC(514, 122, this, arguments, new.target); }
function wdxHedge(P, pts, hfn, o) { return __ZC(514, 123, this, arguments, new.target); }
function wdxMeadow(P, x0, z0, x1, z1, hfn, ok, seed, o) { return __ZC(514, 124, this, arguments, new.target); }
function wdxRoseTex(col, paint) { return __ZC(514, 125, this, arguments, new.target); }
function wdxRoseTree(P, x, z, y, o) { return __ZC(514, 126, this, arguments, new.target); }
function wdxShroom(P, x, z, y, s, o) { return __ZC(514, 127, this, arguments, new.target); }
function wdxFoxglove(P, x, z, y, s, col) { return __ZC(514, 128, this, arguments, new.target); }
function wdxThistle(P, x, z, y, s) { return __ZC(514, 129, this, arguments, new.target); }
function wdxBeastKinds() { return __ZC(514, 130, this, arguments, new.target); }
function wdxTeaThings(P, x0, x1, z, y, o) { return __ZC(514, 131, this, arguments, new.target); }
function wdwFade(key, sec, grin) { return __ZC(514, 132, this, arguments, new.target); }
function wdwGrin(x, y, z, ry, sec, s) { return __ZC(514, 133, this, arguments, new.target); }
var WDL = {};
var WDL_CFG = { bank: { h: 0.42, fl: 0.2 }, wonder: { h: 0.46, fl: 0.16 }, garden: { h: 0.2, fl: 0.05 } };
function wdlMottle(x, z, c) {
var a = wdwFbm(x * 0.06 + 3, z * 0.06, 2), b = wdwFbm(x * 0.018 + 9, z * 0.018, 3), k = 0.8 + a * 0.34;
var dry = wdwSmooth(0.56, 0.76, b), cl = wdwSmooth(0.6, 0.78, wdwFbm(x * 0.11 + 5, z * 0.11, 2));
c.r = (c.r * k + dry * 0.07) * (1 - cl * 0.2);
c.g = (c.g * k + dry * 0.025) * (1 - cl * 0.07);
c.b = c.b * k * (1 - dry * 0.3) * (1 - cl * 0.22);
}
(function () {
var t0 = wdwTerrain;
wdwTerrain = function (P, x0, z0, w, d, step, hfn, mat, cfn) {
var mead = false;
try {
mead = mat === wdwMat("meadow");
}
catch (e) { }
var c2 = mead && cfn ? function (x, z, y, c) { cfn(x, z, y, c); wdlMottle(x, z, c); } : cfn, m = t0.call(this, P, x0, z0, w, d, step, hfn, mat, c2);
try {
(WDW.terr || (WDW.terr = [])).push({ x0: x0, z0: z0, w: w, d: d, nx: Math.max(2, Math.round(w / step)), nz: Math.max(2, Math.round(d / step)), col: m.geometry.attributes.color.array, mead: mead });
}
catch (e) { }
return m;
};
var s0 = wdwStrip;
wdwStrip = function (P, pts, w) {
var m = s0.apply(this, arguments);
try {
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
pts.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]); });
(WDW.strips || (WDW.strips = [])).push({ pts: pts.slice(), w: w, x0: x0 - w, x1: x1 + w, z0: z0 - w, z1: z1 + w });
}
catch (e) { }
return m;
};
var sc0 = wdwScene;
wdwScene = function (k) {
if (WDW.scBuilt === k && WDW.scG)
return sc0.apply(this, arguments);
WDW.terr = [];
WDW.strips = [];
WDW.noTurf = [];
var r = sc0.apply(this, arguments);
try {
wdlCarpet(k);
}
catch (e) {
if (window.console)
console.warn("[wonderland] carpet", e);
}
return r;
};
})();
function wdlCol(x, z) { return __ZC(514, 134, this, arguments, new.target); }
function wdlTurf(x, z, y) { return __ZC(514, 135, this, arguments, new.target); }
function wdlCardTex(key, w, h, fill, fn) { return __ZC(514, 136, this, arguments, new.target); }
function wdlTuftTex() { return __ZC(514, 137, this, arguments, new.target); }
function wdlFlowerTex() { return __ZC(514, 138, this, arguments, new.target); }
function wdlTuftGeo(h, flw, kind) { return __ZC(514, 139, this, arguments, new.target); }
function wdlTwoSided(g) { return __ZC(514, 140, this, arguments, new.target); }
function wdlCarpet(k) { return __ZC(514, 141, this, arguments, new.target); }
var WDW_BK = { oak: [-8, -34], hole: [30, 58], stile: [-60, 55], farm: [150, 190], barn: [188, 214], boat: [-44, 0] };
function wdwRiverZ(x) { return -78 + 8 * Math.sin(x / 90) + 4 * Math.sin(x / 37 + 1.1); }
function wdwBankH(x, z) { return __ZC(514, 142, this, arguments, new.target); }
WDW_ROOMXZ.bank = { farmkitchen: [-420, 620], farmparlour: [-380, 620] };
var WDW_BK_PATHS = { field: [[-6, -28], [-20, 0], [-40, 30], [-58, 52], [-62, 62], [-30, 110], [40, 160], [120, 186], [146, 184]], lane: [[146, 184], [200, 170], [300, 150], [420, 120], [560, 80]] };
function wdwBank(G) { return __ZC(514, 143, this, arguments, new.target); }
function wdwBkFarm(G, H) { return __ZC(514, 144, this, arguments, new.target); }
function wdwBkRooms(G) { return __ZC(514, 145, this, arguments, new.target); }
WDW_SCN.bank = { start: { x: -4, z: -28, ry: 0.6 }, h: wdwBankH, build: function (G) { wdwBkRooms(G); wdfAll(); wdwBank(G); } };
WDW_AT.oak = { sc: "bank", x: -4, z: -29, ry: 0.6 };
WDW_AT.hole = { sc: "bank", x: 30, z: 59 };
var WDW_WELL = { r: 3.2, top: 0, bot: -262, tun: [-40, 0], pas: [0, 90] };
function wdwWellH(x, z) { return __ZC(514, 146, this, arguments, new.target); }
function wdwShelfTex() { return __ZC(514, 147, this, arguments, new.target); }
function wdwMapTex(i) { return __ZC(514, 148, this, arguments, new.target); }
function wdwPicTex(i) { return __ZC(514, 149, this, arguments, new.target); }
function wdwWell(G) { return __ZC(514, 150, this, arguments, new.target); }
function wdwFallTick(dt, L) { return __ZC(514, 151, this, arguments, new.target); }
function wdwFallReset(done) { WDW.fallDone = !!done; WDW.fallY = done ? WDWELLBOT() : WDW_WELL.top; }
function WDWELLBOT() { return WDW_WELL.bot; }
WDW_SCN.well = { start: { x: 0, z: -36, ry: Math.PI }, h: wdwWellH, build: function (G) { if (WDW.fallY == null)
WDW.fallY = WDW.fallDone ? WDW_WELL.bot : WDW_WELL.top; wdwWell(G); WDW.ticks.push(wdwFallTick); } };
WDW_AT.tunnel = { sc: "well", x: 0, z: -36, ry: Math.PI };
WDW_AT.wellbot = { sc: "well", x: 0, z: 6, y: WDW_WELL.bot, ry: Math.PI };
var WDW_HALL = { w: 12, l: 44, h: 3.1, tbl: [0, -6], door: [0, -21.4], cur: [0, -21.2] };
function wdwHallH(x, z) {
var H = WDW_HALL;
if (Math.abs(x) < H.w / 2 && Math.abs(z) < H.l / 2)
return 0;
if (z < -H.l / 2 && z > -H.l / 2 - 14 && Math.abs(x) < 6)
return 0.02;
return 6;
}
function wdwHall(G) { return __ZC(514, 152, this, arguments, new.target); }
function wdwHallKey(P, show) { return __ZC(514, 153, this, arguments, new.target); }
function wdwHallBottle(P, show) { return __ZC(514, 154, this, arguments, new.target); }
function wdwHallCake(P, T, show) { return __ZC(514, 155, this, arguments, new.target); }
WDW_SCN.hall = { start: { x: 0, z: 18, ry: 0 }, h: wdwHallH, build: function (G) { wdwHall(G); } };
WDW_AT.hall0 = { sc: "hall", x: 0, z: 18, ry: 0 };
WDW_AT.table = { sc: "hall", x: 0, z: -4.6, ry: 0 };
WDW_AT.curtain = { sc: "hall", x: 0, z: -20.2, ry: 0 };
var WDW_WO = { pool: [-600, 0], race: [-470, 92], rabbit: [-250, 150], wood: [40, 0], shroom: [70, -40], pigeon: [150, -110], puppy: [-60, 70], duchess: [330, -150], cat: [420, -40], hare: [560, 60], tea: [560, 96], door: [640, -160] };
var WDW_WO_PATHS = {
shore: [[-520, 40], [-480, 80], [-430, 110], [-360, 140], [-290, 150], [-262, 150]],
wood: [[-240, 150], [-180, 120], [-110, 80], [-50, 60], [20, 10], [60, -30]],
duch: [[70, -40], [150, -80], [230, -130], [310, -150]],
fork: [[330, -130], [380, -80], [420, -40]],
hatter: [[420, -40], [480, 0], [540, 60]],
hare: [[420, -40], [500, -80], [600, -140], [636, -156]]
};
var WDW_POOL_Y = -0.4;
function wdwPoolR(x, z) { var P = WDW_WO.pool, a = Math.atan2(z - P[1], x - P[0]); return 92 + 16 * Math.sin(a * 3 + 0.6) + 9 * Math.sin(a * 5 + 2); }
function wdwWonderH(x, z) { return __ZC(514, 156, this, arguments, new.target); }
WDW_ROOMXZ.wonder = { rabhall: [-700, 700], rabroom: [-660, 700], kitchen: [-620, 700], harehouse: [-580, 700], treehall: [-540, 700] };
function wdwWonder(G) { return __ZC(514, 157, this, arguments, new.target); }
function wdwBkRabbit(G, H) { return __ZC(514, 158, this, arguments, new.target); }
function wdwWoRooms(G) { return __ZC(514, 159, this, arguments, new.target); }
function wdwWoHare(G, H) { return __ZC(514, 160, this, arguments, new.target); }
WDW_SCN.wonder = { start: { x: -500, z: 60, ry: 0.6 }, h: wdwWonderH, build: function (G) { wdwWoRooms(G); wdfAll(); wdwWonder(G); } };
WDW_AT.poolshore = { sc: "wonder", x: -505, z: 58, ry: 2.3 };
WDW_AT.poolswim = { sc: "wonder", x: -600, z: 20, ry: 0.6 };
WDW_AT.race = { sc: "wonder", x: -470, z: 78, ry: 0 };
WDW_AT.rabbit = { sc: "wonder", x: -250, z: 142, ry: Math.PI };
WDW_AT.shroom = { sc: "wonder", x: 70, z: -39.3, ry: 0 };
WDW_AT.duchess = { sc: "wonder", x: 330, z: -154, ry: Math.PI };
WDW_AT.cat = { sc: "wonder", x: 420, z: -33, ry: 0 };
WDW_AT.tea = { sc: "wonder", x: 560, z: 90, ry: Math.PI };
WDW_AT.treedoor = { sc: "wonder", x: 640, z: -156, ry: Math.PI };
function wdxBracken(P, list) { return __ZC(514, 161, this, arguments, new.target); }
function wdxLogs(P, list) { return __ZC(514, 162, this, arguments, new.target); }
function wdxMossy(P, list) {
if (!list.length)
return;
wdwPlant(P, "rock", list, { mat: wdwLam(0x7A8A6A) });
wdwInst(P, wdwGeo("wdMossCap", function () { var s = new THREE.SphereGeometry(0.85, 9, 5, 0, 6.3, 0, 1.0); return s; }), wdwLam(0x4E7A2E), list.map(function (t) { return { x: t.x, z: t.z, y: t.y + 0.05, s: t.s, sy: (t.sy || t.s) * 0.9, ry: t.ry }; }), {});
}
function wdwGlade(G, H, x, z, r, seed, o) { return __ZC(514, 163, this, arguments, new.target); }
function wdwCottage(P, x, z, y, ry, sc, o) { return __ZC(514, 164, this, arguments, new.target); }
function wdwWoDuchess(G, H) { return __ZC(514, 165, this, arguments, new.target); }
function wdcWoodDense(G) { return __ZC(514, 166, this, arguments, new.target); }
(function () { var D = WDW_SCN.wonder; if (!D)
return; var b0 = D.build; D.build = function (G) { b0.apply(this, arguments); try {
wdcWoodDense(G);
}
catch (e) {
if (window.console)
console.warn("[wonderland] wood", e);
} }; })();
function wdcCountry(G) { return __ZC(514, 167, this, arguments, new.target); }
(function () { var D = WDW_SCN.wonder; if (!D)
return; var b0 = D.build; D.build = function (G) { b0.apply(this, arguments); try {
wdcCountry(G);
}
catch (e) {
if (window.console)
console.warn("[wonderland] country", e);
} }; })();
(function () {
var e0 = wdwEnvNow;
wdwEnvNow = function () {
var E = e0.apply(this, arguments);
try {
if (WDW.sc === "wonder" && !WDW.envK && !WDW.night && !wdwInRoom()) {
var L = wdwLocalSc(), W = WDW_WO, d = Math.hypot(L.x - W.wood[0], L.z - W.wood[1]);
var inW = d < 240 || (L.x > 560 && L.x < 760 && L.z < -60 && L.z > -260);
if (inW) {
var B = WDW_ENV.wood;
for (var q in B)
E[q] = B[q];
if (wdwLite() && E.fogD)
E.fogD *= 1.35;
}
}
}
catch (e) { }
return E;
};
})();
var WDW_GA = { gate: [0, 320], rose: [6, 300], cro: [0, 110], palace: [0, -150], court: [0, -150], sea: 560, ledge: [520, 40], gry: [380, 60] };
function wdwGardenH(x, z) { return __ZC(514, 168, this, arguments, new.target); }
WDW_ROOMXZ.garden = { court: [-500, 620], qhall: [-440, 620] };
function wdwGarden(G) { return __ZC(514, 169, this, arguments, new.target); }
function wdwArch(g) { var c = g.children[0]; if (!c || !c.userData.card)
return; c.rotation.x = Math.PI / 2 * 0.98; c.position.y = 0.2; c.position.z = -0.6; var C = c.userData.card; C.A.forEach(function (a) { a.rotation.x = -1.2; }); C.L.forEach(function (l) { l.rotation.x = 1.3; }); c.userData.card = null; }
function wdwGaPalace(G, H) { return __ZC(514, 170, this, arguments, new.target); }
function wdwHeartShape(r) { var s = new THREE.Shape(); s.moveTo(0, -r); s.bezierCurveTo(-r * 1.6, -r * 0.1, -r * 0.9, r * 1.2, 0, r * 0.45); s.bezierCurveTo(r * 0.9, r * 1.2, r * 1.6, -r * 0.1, 0, -r); return s; }
function wdwGaHeart(P, x, y, z, r) { return __ZC(514, 171, this, arguments, new.target); }
function wdwGaRooms(G) { return __ZC(514, 172, this, arguments, new.target); }
WDW_SCN.garden = { start: { x: 0, z: 312, ry: Math.PI }, h: wdwGardenH, build: function (G) { wdwGaRooms(G); wdfAll(); wdwGarden(G); } };
WDW_AT.gardenin = { sc: "garden", x: 0, z: 314, ry: Math.PI };
WDW_AT.rosetree = { sc: "garden", x: 6, z: 304, ry: Math.PI };
WDW_AT.croquet = { sc: "garden", x: 0, z: 146, ry: Math.PI };
WDW_AT.palace = { sc: "garden", x: 0, z: -128, ry: Math.PI };
WDW_AT.gryphon = { sc: "garden", x: 376, z: 64, ry: 1.6 };
WDW_AT.ledge = { sc: "garden", x: 512, z: 46, ry: 1.6 };
WDW_AT.sands = { sc: "garden", x: 540, z: 0, ry: 1.6 };
function wdgClipM() { return __ZC(514, 173, this, arguments, new.target); }
function wdgHedge(G, a, b, h, w, H, solid) { return __ZC(514, 174, this, arguments, new.target); }
function wdgTopiary(G, x, z, y, kind, s) { return __ZC(514, 175, this, arguments, new.target); }
function wdgUrn(G, x, z, y) { return __ZC(514, 176, this, arguments, new.target); }
function wdgRoseArch(G, x, z, y, w) { return __ZC(514, 177, this, arguments, new.target); }
function wdgStripeTex(a, b) { return wdwCanvas("wdgStr" + a + b, 128, 32, function (c, W, H) { for (var i = 0; i < 8; i++) {
c.fillStyle = i % 2 ? b : a;
c.fillRect(i * W / 8, 0, W / 8, H);
} }); }
function wdgPavilion(G, x, z, y, r, h) { return __ZC(514, 178, this, arguments, new.target); }
function wdgCanopy(G, x, z, y, ry) { return __ZC(514, 179, this, arguments, new.target); }
function wdgPennant(G, x, z, y) { return __ZC(514, 180, this, arguments, new.target); }
function wdgBathing(G, x, z, y, ry, i) { return __ZC(514, 181, this, arguments, new.target); }
function wdgDress(G) { return __ZC(514, 182, this, arguments, new.target); }
(function () { var b0 = WDW_SCN.garden.build; WDW_SCN.garden.build = function (G) { b0(G); try {
wdgDress(G);
}
catch (e) {
if (window.console)
console.warn("[wonderland] garden dress", e);
} }; })();
function wdgPost(G, x, z, y, h, r, mat) { return wdwCyl(G, r || 0.12, (r || 0.12) * 1.1, h, mat || wdwMat("darkoak"), x, y + h / 2 - 0.4, z, 7); }
function wdgStand(G, x, z, y, ry, w) { return __ZC(514, 183, this, arguments, new.target); }
function wdgQueenChair(G, x, z, y, ry) { return __ZC(514, 184, this, arguments, new.target); }
function wdgPot(G, x, z, y, ry) { return __ZC(514, 185, this, arguments, new.target); }
function wdgNets(G, x, z, y, ry) { return __ZC(514, 186, this, arguments, new.target); }
function wdgBoat(G, x, z, y, ry) { return __ZC(514, 187, this, arguments, new.target); }
function wdgCastle(G, x, z, y, i) { return __ZC(514, 188, this, arguments, new.target); }
function wdgFill(G) { return __ZC(514, 189, this, arguments, new.target); }
(function () { var b0 = WDW_SCN.garden.build; WDW_SCN.garden.build = function (G) { b0(G); try {
wdgFill(G);
}
catch (e) {
if (window.console)
console.warn("[wonderland] garden fill", e);
} }; })();
function wdgBloomTex(col) { return __ZC(514, 190, this, arguments, new.target); }
function wdgBloomGeo() { return __ZC(514, 191, this, arguments, new.target); }
function wdgBeds(G, H) { return __ZC(514, 192, this, arguments, new.target); }
function wdgFountains(G, H) { return __ZC(514, 193, this, arguments, new.target); }
function wdgCroquetLand(G, H) { return __ZC(514, 194, this, arguments, new.target); }
function wdgShore(G, H) { return __ZC(514, 195, this, arguments, new.target); }
(function () {
var D = WDW_SCN.garden;
if (!D)
return;
var b0 = D.build;
D.build = function (G) {
b0.apply(this, arguments);
var H = wdwGardenH;
[["beds", wdgBeds], ["fountains", wdgFountains], ["croquet", wdgCroquetLand], ["shore", wdgShore]].forEach(function (f) { try {
f[1](G, H);
}
catch (e) {
if (window.console)
console.warn("[wonderland] garden " + f[0], e);
} });
};
})();
function wdwEnvNow() { return __ZC(514, 196, this, arguments, new.target); }
function wdwBlockL(x, z, feet) { return __ZC(514, 197, this, arguments, new.target); }
function wdwPlaceName(L) { return __ZC(514, 198, this, arguments, new.target); }
var WDW_ATN = { oak: "The riverbank, under the oak", hole: "The rabbit-hole under the hedge", tunnel: "The rabbit-hole", wellbot: "The bottom of the well", hall0: "The long, low hall", table: "The little glass table", curtain: "The low curtain", poolshore: "The pool of tears", poolswim: "The pool of tears", race: "The Caucus-race course", rabbit: "The White Rabbit's house", shroom: "The Caterpillar's mushroom", duchess: "The Duchess's house", cat: "The Cheshire Cat's tree", tea: "The mad tea-party", treedoor: "The tree with a door", gardenin: "The beautiful garden", rosetree: "The rose-tree", croquet: "The croquet-ground", palace: "The palace of the Queen of Hearts", gryphon: "The Gryphon's sunny place", ledge: "The Mock Turtle's ledge", sands: "The sands" };
function wdwTick(dt) { return __ZC(514, 199, this, arguments, new.target); }
function wdwBuild(G) { WDW.G = G; WDW.lite = wdwLite(); WDW.built = true; }
if (typeof worldDef === "function")
worldDef(WDW_KEY, {
base: WDW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return wdwEnvNow(); },
build: function (G) { wdwBuild(G); },
enter: function (opt) { return __ZC(514, 200, this, arguments, new.target); },
leave: function () { try {
wdwNear(true);
}
catch (e) { } WDW.ride = null; WDW.moving = false; if (WDW.veil)
WDW.veil.style.opacity = "0"; if (typeof wdbLeave === "function")
try {
wdbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = wdwSc(), o = wdwEyeOff(); WDW.inRm = wdwInRoom(); return wdwGround(x - S.x, z, feet == null ? feet : feet - o) + o; },
block: function (x, z, feet) { var S = wdwSc(); WDW.inRm = wdwInRoom(); return wdwBlockL(x - S.x, z, feet == null ? feet : feet - wdwEyeOff()); },
tick: function (dt) { wdwTick(dt); },
back: function () { var D = WDW_SCN[WDW.sc]; wdwGo(D && D.start ? { sc: WDW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "beach"); }
});
function wdwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(WDW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(WDW_KEY) < 0)
WLG.keys.push(WDW_KEY);
if (typeof GLF !== "undefined" && GLF.skip)
GLF.skip[WDW_KEY] = 1;
function wdwForget() { return __ZC(514, 201, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === WDW_KEY)
wdwForget(); return r; }; })();
function wdwSnowfall(P, n, sp) { return __ZC(514, 202, this, arguments, new.target); }
var WDB_CH = [];
var WDB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var WDB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function wdbS() { if (!store.wdbook)
store.wdbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.wdbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function wdbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function wdbStep() { var S = wdbS(), C = WDB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function wdbActive() { var S = wdbS(); return !!(S.started && !S.done && WLD.on === WDW_KEY); }
function wdbKey() { var S = wdbS(); return S.done ? "done" : S.ch + "." + S.s; }
function wdbSay(h) { setStatus(h); }
function wdbQ(s) { return wdQ(s); }
function wdbQs() { return wdQs.apply(null, arguments); }
function wdbPos(at) { return __ZC(514, 203, this, arguments, new.target); }
function wdbScName(k) { return (WDW_SC[k] || {}).name || k; }
function wdbWay(P, L) { return __ZC(514, 204, this, arguments, new.target); }
function wdbBeam() { return __ZC(514, 205, this, arguments, new.target); }
function wdbItemMesh(kind) { return __ZC(514, 206, this, arguments, new.target); }
function wdbItemsClear() { WDB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = WDW.spots.indexOf(I.S); if (j >= 0)
WDW.spots.splice(j, 1); }); WDB.items = []; }
function wdbItemAdd(kind, P, name, verb, onTake) { return __ZC(514, 207, this, arguments, new.target); }
var WDB_TUNES = { meadow: "assets/kensington/the-gardens.mp3", fall: "assets/oz/flight-of-birds.mp3", hall: "assets/no14/nursery-piano.mp3", tears: "assets/kensington/peters-lullaby.mp3", race: "assets/erebos/galop.mp3", house: "assets/oz/friskers-galop.mp3", wood: "assets/oz/mist-valley.mp3", duchess: "assets/oz/ku-klip-workshop.mp3", tea: "assets/grimm/nachtmusik.mp3", garden: "assets/oz/glindas-court.mp3", croquet: "assets/oz/bunnybury-band-march.mp3", sea: "assets/oz/deserted-isle.mp3", quadrille: "assets/grimm/danube.mp3", court: "assets/oz/hall-of-state.mp3", cards: "assets/neverland/mountain-king.mp3", end: "assets/kensington/fairy-ball.mp3", dream: "assets/erebos/gymnopedie.mp3" };
function wdbTune(k) { return __ZC(514, 208, this, arguments, new.target); }
function wdbText(fn) { return __ZC(514, 209, this, arguments, new.target); }
function wdbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function wdbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var WDB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>Lewis Carroll's own words (1865).</div>";
function wdbReadAll(i) { return __ZC(514, 210, this, arguments, new.target); }
function wdbChapterCard() { return __ZC(514, 211, this, arguments, new.target); }
function wdbKeeperBtns(fns) { return __ZC(514, 212, this, arguments, new.target); }
function wdbJump(i) { var S = wdbS(); S.ch = Math.max(0, Math.min(WDB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; wdbSave(); wdbChapterBegin(true); }
function wdbStV(v) { return typeof v === "function" ? v(wdbS().s) : v; }
function wdbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function wdbWorldState() {
var S = wdbS(), C = WDB_CH[S.ch] || {}, st = C.state || {};
WDW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
WDW.envK = wdbStV(st.env) || null;
if (typeof wdwStateApply === "function")
try {
wdwStateApply(st, S.s);
}
catch (e) { }
worldEnv(wdwEnvNow());
}
function wdbChapterBegin(place) { return __ZC(514, 213, this, arguments, new.target); }
function wdbStepBegin() { return __ZC(514, 214, this, arguments, new.target); }
function wdbPuzzleCard(b) { return __ZC(514, 215, this, arguments, new.target); }
function wdbStepDone() { return __ZC(514, 216, this, arguments, new.target); }
function wdbFinish() { return __ZC(514, 217, this, arguments, new.target); }
function wdbCastName(c) { return c.name || (WDW_FOLK[c.k] || {}).name || c.k; }
function wdbCastLive(C) { return !!(C && C.g && C.g.parent); }
function wdbCastAdd(c) { return __ZC(514, 218, this, arguments, new.target); }
function wdbCastHide(key) { var C = WDB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); WDW.talk = WDW.talk.filter(function (T) { return T.p !== C.P; }); WDW.people = WDW.people.filter(function (p) { return p !== C.P; }); delete WDB.cast[key]; }
function wdbCastClear() { for (var k in WDB.cast)
wdbCastHide(k); WDB.cast = {}; }
function wdbCastMove(key, at, ry) { var C = WDB.cast[key]; if (!C)
return; var P = wdbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : wdwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function wdbCastTick() { return __ZC(514, 219, this, arguments, new.target); }
function wdbPassTick() { return __ZC(514, 220, this, arguments, new.target); }
var WDB_FOLK_AT = {};
function wdbPopulate() { return __ZC(514, 221, this, arguments, new.target); }
function wdbCastHere(C) { return (C.cast || []).some(function (c) { var P = wdbPos(c.at); return P && P.sc === WDW.sc; }); }
function wdbChapterSc(C) { var P = C && C.start ? wdbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function wdbSceneDrop() { WDB.beam = null; WDB.items = []; WDB.cast = {}; }
function wdbHeard(kind) { WDB.rew[kind] = (WDB.rew[kind] || 0) + 1; }
function wdbNote(kind, title) { wdbHeard(kind); if (title)
wdbHeard("tale:" + title); }
function wdbTalk(T) { return __ZC(514, 222, this, arguments, new.target); }
function wdbSpot(S) { if (!wdbActive() || S.wdb)
return; var b = wdbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = wdbKey(); setTimeout(function () { if (wdbKey() === k)
wdbStepDone(); }, b.wait || 400); }
function wdbIdlePrompt() { worldPrompt("🐇 <b>Alice's Adventures in Wonderland</b> · <b>press E</b> for the book", wdbOpen); }
function wdbTick(dt, L) { return __ZC(514, 223, this, arguments, new.target); }
function wdbOpen() { return __ZC(514, 224, this, arguments, new.target); }
function wdbBegin() { var S = wdbS(); S.started = 1; wdbSave(); if (WLD.on !== WDW_KEY) {
wdwEnter({});
return;
} wdbChapterBegin(true); }
function wdbStartAt() { var S = wdbS(); if (S.started && !S.done) {
var C = WDB_CH[S.ch], P = C && C.start ? wdbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function wdbEnter(opt) { var S = wdbS(); try {
wdbText(function () { });
}
catch (e) { } setTimeout(function () { if (WLD.on !== WDW_KEY)
return; if (S.started && !S.done)
wdbChapterBegin(false);
else {
wdbWorldState();
wdbPopulate();
if (!S.started)
wdbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function wdbLeave() { wdbTune(null); wdbItemsClear(); WDB.cast = {}; WDB.beam = null; WDW.bannerBook = false; }
function wdzGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function wdzTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function wdzSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function wdzRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function wdzFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function wdzGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function wdzHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function wdzUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function wdzPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function wdzRead(title, html, btn, o) { return wdzPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function wdzReadA(title, adult, young, btn, o) { var r = wdzRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = wdbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function wdzMove(at, msg) { return function () { wdwGo(at, msg || null, wdbPopulate); }; }
function wdbNum(i) { return "Chapter " + (i + 1); }
function wdbExpand(h) { return __ZC(514, 225, this, arguments, new.target); }
function wdzN(title, n, btn, o) { var r = wdzRead(title, "", btn, o); r.pn = n; return r; }
function wdzNA(title, n, young, btn, o) { var r = wdzN(title, n, btn, o), on0 = r.on; r.on = function (f) { r.html = wdbAdult() ? r.tok : young; if (on0)
on0(f); }; r.ya = 1; return r; }
function wdzTN(who, h, title, n, o) { var r = wdzTalk(who, h, [title, "", "▶ Go on"], o); r.pn = n; return r; }
function wdbVoices(name, html, k) { return __ZC(514, 226, this, arguments, new.target); }
function wdbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function wdbCh(C) { return __ZC(514, 227, this, arguments, new.target); }
function wdbStepAt(id) { var C = WDB_CH[wdbS().ch]; return C ? wdbS().s >= wdbIdx(C, id) : false; }
function wdzId(id, step) { step.id = id; return step; }
var WDW_LIVEK = ["voice", "size"];
function wdwStateApply(st, s) { return __ZC(514, 228, this, arguments, new.target); }
function wdwRebuild() { var k = WDW.scBuilt; if (!k)
return; var L = wdwLocalSc(), y = camera.position.y; WDW.scBuilt = null; wdwScene(k); var S = wdwSc(); camera.position.set(WDW.base + S.x + L.x, y, L.z); }
function wdwLiveState() { var want = WDW.st.size != null ? WDW.st.size : 1; if (Math.abs((WDW.sizeTo || 1) - want) > 0.001)
try {
wdwSizeSet(want);
}
catch (e) { } if (WDW.live)
try {
WDW.live(WDW.st);
}
catch (e) { } }
(function () { var s0 = wdwScene; wdwScene = function (k) { var was = WDW.scBuilt; s0.apply(this, arguments); if (was !== WDW.scBuilt && typeof wdbWorldState === "function" && !WDW.rebuilding)
try {
wdbWorldState();
}
catch (e) { } }; })();
function wdc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
var WD_ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
function wdBk(ch) { return "Chapter " + WD_ROMAN[ch]; }
function wdBa(x, z, y) { return { sc: "bank", x: x, z: z, y: y }; }
function wdWe(x, z, y) { return { sc: "well", x: x, z: z, y: y }; }
function wdHa(x, z, y) { return { sc: "hall", x: x, z: z, y: y }; }
function wdWo(x, z, y) { return { sc: "wonder", x: x, z: z, y: y }; }
function wdGa(x, z, y) { return { sc: "garden", x: x, z: z, y: y }; }
function wdA(n, dx, dz) { var A = WDW_AT[n]; return { sc: A.sc, x: A.x + (dx || 0), z: A.z + (dz || 0), y: A.y }; }
function wdR(k, lx, lz) { var sc = null; for (var s in WDW_ROOMXZ) {
if (WDW_ROOMXZ[s][k]) {
sc = s;
break;
}
} return wdwIn(sc || "wonder", k, lx, lz); }
function wdzTravel(title, html, at, msg, btn, o) { return wdzRead(title, html, btn || "▶ Go", Object.assign({ done: function () { var A = typeof at === "function" ? at() : at; if (A && typeof at === "function" && A.ry == null)
A.ry = Math.PI; wdwGo(A, msg || null, function () { wdbPopulate(); wdbStepBegin(); }); } }, o || {})); }
function wdzSay(who, h, title, lines, src, o) { return wdzTalk(who, h, [title, wdbQs.apply(null, lines) + wdSrc(src), "▶ Go on"], o); }
function wdwCalm(st, keys) { st = st || {}; for (var i = 0; i < keys.length; i++)
if (st[keys[i]])
return false; return true; }
function wdRy(k, lx, lz, dy) { var f = wdR(k, lx, lz); return function () { var p = f(); if (p)
p.y = (p.y || 0) + dy; return p; }; }
function wdzOn(a, b, val) { return function () { var on = (a == null || wdbStepAt(a)) && (b == null || !wdbStepAt(b)); return on ? (val === undefined ? true : val) : (val === undefined ? false : null); }; }
function wdzSz(first, list) { return function () { var v = first; list.forEach(function (q) { if (wdbStepAt(q[0]))
v = q[1]; }); return v; }; }
wdbCh({ t: "Down the Rabbit-Hole", txt: 0, p0: 1, start: { sc: "bank", x: -4, z: -28, ry: 0.6 }, jump: 1, tune: "meadow", keep: ["bank", "A daisy from the bank", "🌼"],
words: "A golden afternoon, the fourth of July 1862, a few miles up the river from Oxford. Alice is sitting on the bank by her sister with nothing to do, and you are lying in the grass near them, half asleep in the heat.",
intro: "The riverbank",
state: { env: "hot", keyTaken: wdzOn("key"), bottleOut: wdzOn("bottle"), drank: wdzOn("drink"), cakeOut: wdzOn("box"), size: wdzSz(1, [["drink", 0.14]]) },
cast: [
wdc("sister", wdBa(-6.4, -30.6), { ry: 0.6, until: "hole" }),
wdc("alice", wdBa(-4.6, -30.2), { ry: 2.2, until: "run" }),
wdc("alice", wdBa(28, 54), { key: "al2", ry: 0, from: "run", until: "down" }),
wdc("rabbit", wdBa(2, -22), { ry: 0.3, until: "run" }),
wdc("rabbit", wdBa(31, 56.4), { key: "rb2", ry: 0, from: "run", until: "down" }),
wdc("rabbit", wdWe(0, 70, -262), { key: "rb3", ry: 0, from: "bottom", until: "corner" }),
wdc("alice", wdWe(0.8, 4, -262), { key: "al3", ry: 0, from: "bottom", until: "corner" }),
wdc("alice", wdHa(-1.2, 8), { key: "al4", ry: Math.PI, from: "inhall", until: "drink" }),
wdc("alice", wdHa(0.9, -5.4), { key: "al5", ry: -0.4, s: 0.14, from: "drink" })
],
steps: [
{ k: "read" },
wdzGo("oak", "Come and sit on the bank under the great oak, by Alice and her sister", { r: 3 }),
wdzSay("Alice's sister", "Alice's sister is reading: look over her shoulder at the book", "📖 The book her sister was reading", ["'and what is the use of a book,' thought Alice 'without pictures or conversations?'"], 0),
wdzGather("flower", wdBa(-2, -24), 6, "A daisy", "Pick daisies with Alice for a daisy-chain (is it worth the trouble of getting up?)", { spread: 5 }),
wdzId("rabbit", wdzN("🐇 A White Rabbit with pink eyes", 1)),
wdzTN("The White Rabbit", "The White Rabbit has stopped near you and is taking a watch out of his waistcoat-pocket: listen", "⌚ Oh dear! Oh dear!", 1),
wdzId("run", wdzGo("hole", "Burning with curiosity, run across the field after it, to the large rabbit-hole under the hedge", { r: 3 })),
wdzId("hole", wdzN("🕳️ In another moment down went Alice", 1)),
wdzId("down", (function () { var r = wdzTravel("🕳️ Down the rabbit-hole", "", "tunnel", "🕳️ <b>The rabbit-hole.</b> It goes straight on like a tunnel."); r.pn = 1; return r; })()),
wdzGo(wdWe(0, -4), "Go on down the tunnel to where it dips suddenly down", { r: 2.4 }),
wdzId("fall", wdzUntil(function () { return WDW.falling || WDW.fallDone; }, wdWe(0, 0), "Step over the edge, and fall", { r: 3 })),
wdzN("⬇️ Either the well was very deep, or she fell very slowly", 1),
wdzPuzzle("🍊 The jar", "As you fall past the shelves, Alice takes down a jar from one of them. What is written on it, and what is in it?", ["STRAWBERRY JAM, and it is full", "ORANGE MARMALADE, and to her great disappointment it is empty", "HONEY, and there are bees in it"], 1, ["No.", "", "No."], { yes: "🍊 " + wdQ("it was labelled 'ORANGE MARMALADE', but to her great disappointment it was empty") }),
wdzN("⬇️ After such a fall as this", 1),
wdzN("⬇️ Down, down, down", 1),
wdzPuzzle("🌍 How far?", "Alice wonders how many miles she has fallen by this time. What does she think she must be getting near?", ["The sea", "Somewhere near the centre of the earth: about four thousand miles down", "The Antipodes already"], 1, ["No.", "", "Not yet."], { yes: "🌍 " + wdQ("I must be getting somewhere near the centre of the earth. Let me see: that would be four thousand miles down, I think") }),
wdzN("⬇️ Right through the earth", 1),
wdzN("🐱 Dinah", 1),
wdzId("bottom", wdzUntil(function () { return WDW.fallDone; }, wdWe(0, 0, -262), "Fall on down to the bottom, a heap of sticks and dry leaves", { r: 3.2 })),
wdzN("👂 Oh my ears and whiskers", 1),
wdzId("corner", wdzSpot("Round the corner, after the Rabbit", "Away down the long passage after the White Rabbit, and round the corner", { at: wdWe(0, 89, -262) })),
wdzId("inhall", wdzN("🚪 Doors all round the hall", 1, null, { at: "hall0" })),
wdzSpot("The doors all round the hall", "Go down one side and up the other, trying every door", { at: "hall0" }),
wdzGo("table", "Come back to the middle of the hall: there is a little three-legged table, all made of solid glass", { r: 1.6 }),
wdzN("🗝️ A tiny golden key", 1),
wdzId("key", wdzFind("key", wdHa(0.1, -5.95, 0.95), "The tiny golden key", "Take the tiny golden key from the glass table")),
wdzSpot("The low curtain", "Go round the hall again to the low curtain you had not noticed before"),
wdzSpot("The little door behind the curtain", "Try the little golden key in the lock of the little door"),
wdzN("🌷 The loveliest garden", 1),
wdzHold("curtain", 6, "Kneel down and look along the passage into the loveliest garden you ever saw", { r: 1.6 }),
wdzId("bottle", wdzN("🧪 DRINK ME", 1)),
wdzSpot("The little bottle on the table: DRINK ME", "Go back to the table: take up the little bottle"),
wdzN("☠️ Poison or not", 1),
wdzPuzzle("☠️ Is it marked?", "Alice has read the nice little histories about children who got burnt or eaten up. Is this bottle marked 'poison'?", ["Yes, plainly", "No: it is NOT marked 'poison'", "She cannot tell, the label is gone"], 1, ["Look again.", "", "The label is there: DRINK ME."], { yes: "🧪 " + wdQ("However, this bottle was NOT marked 'poison,'") }),
wdzId("drink", wdzN("🍒 Cherry-tart, custard, pine-apple, roast turkey, toffee, and hot buttered toast", 1)),
wdzN("🔭 Shutting up like a telescope", 1),
wdzN("📏 Ten inches high", 1),
wdzGo(wdHa(0, -20.2), "Now you are the right size to go through the little door: go to it", { r: 1.0 }),
wdzN("🗝️ Alas for poor Alice!", 1),
wdzSpot("A leg of the glass table", "Back to the table, now far above you: try to climb up one of the legs"),
wdzN("😢 There's no use in crying like that!", 1),
wdzId("box", wdzSpot("The little glass box under the table", "There is a little glass box lying under the table: open it")),
wdzN("🍰 EAT ME", 1),
wdzFind("cake", wdHa(0.05, -5.5), "The very small cake", "Take the very small cake from the glass box"),
wdzN("🍰 Which way? Which way?", 1),
wdzN("🍰 So she set to work", 1)
] });
wdbCh({ t: "The Pool of Tears", txt: 1, p0: 1, start: { sc: "hall", x: 0, z: -2, ry: 0 }, jump: 1, tune: "hall", keep: ["hall", "A tiny white kid glove", "🧤"],
words: "You have eaten the cake with Alice. Curiouser and curiouser: you are both opening out like the largest telescope that ever was.",
intro: "The long hall",
state: { env: "hall", keyTaken: true, drank: true, ate: true, tears: wdzOn("tears", "splash"), gloves: wdzOn("rabbit", "splash"), fanTaken: wdzOn("fan", "splash"),
size: wdzSz(1.6, [["shrink", 0.34], ["slip", 0.3]]) },
cast: [
wdc("alice", wdHa(-1.4, -3), { ry: 0.4, s: 1.6, until: "shrink" }),
wdc("alice", wdHa(-0.4, -17), { key: "al2", ry: 0, s: 0.3, from: "shrink", until: "splash" }),
wdc("rabbit", wdHa(1.2, 16), { ry: Math.PI, from: "rabbit", until: "fan" }),
wdc("mouse", wdWo(-612, 26, WDW_POOL_Y - 0.06), { ry: 2.2, s: 1.4, from: "mouse", until: "ashore" }),
wdc("alice", wdWo(-603, 22, WDW_POOL_Y - 0.28), { key: "al3", ry: 0.8, s: 0.3, from: "splash", until: "ashore" }),
wdc("duck", wdWo(-588, 4, WDW_POOL_Y - 0.1), { s: 0.55, ry: 1.2, from: "crowded" }),
wdc("dodo", wdWo(-592, -6, WDW_POOL_Y - 0.2), { s: 0.55, ry: 1.0, from: "crowded" }),
wdc("lory", wdWo(-580, 10, WDW_POOL_Y - 0.1), { s: 0.55, ry: 0.6, from: "crowded" }),
wdc("eaglet", wdWo(-576, 0, WDW_POOL_Y - 0.1), { s: 0.55, ry: 1.4, from: "crowded" })
],
steps: [
{ k: "read" },
wdzN("👢 Good-bye, feet!", 3),
wdzN("🗝️ Nine feet high", 1),
wdzHold("curtain", 6, "Lie down on one side and look through the little door into the garden with one eye", { r: 2 }),
wdzN("😢 Poor Alice!", 1),
wdzId("tears", wdzN("💧 Gallons of tears", 1)),
wdzId("rabbit", wdzTN("The White Rabbit", "Someone is pattering down the hall: the White Rabbit, splendidly dressed. Speak to him, in a low, timid voice", "🐇 If you please, sir", 1)),
wdzId("fan", wdzFind("fan", wdHa(2.4, 6), "The White Rabbit's fan", "He has dropped the white kid gloves and the fan: take them up")),
wdzN("❓ Who in the world am I?", 1),
wdzN("📚 Ada and Mabel", 1),
wdzN("🐊 How doth the little crocodile", 2),
wdzPuzzle("🐊 The wrong words", "The lines come out all wrong. Which creature is it that improves his shining tail and welcomes little fishes in?", ["The busy bee", "The little crocodile", "The Mouse"], 1, ["That is how it ought to go.", "", "No."], { yes: "🐊 " + wdQ("How doth the little crocodile") }),
wdzN("😢 I'll stay down here", 1),
wdzId("shrink", wdzN("🧤 She has put on one of the Rabbit's little white kid gloves", 1)),
wdzN("🚪 A narrow escape", 1),
wdzId("splash", (function () { var r = wdzTravel("🌊 Splash!", "", "poolswim", "🌊 <b>Up to your chin in salt water.</b> It is the pool of tears."); r.pn = 1; return r; })()),
wdzId("slip", wdzN("🏊 I wish I hadn't cried so much!", 1)),
wdzId("mouse", wdzN("🐭 Something splashing about in the pool", 1)),
wdzTN("The Mouse", "Swim to the Mouse and speak to it", "🐭 O Mouse", 1),
wdzTN("The Mouse", "Perhaps it is a French mouse: try it in French", "🇫🇷 Où est ma chatte?", 1),
wdzTN("The Mouse", "The Mouse gives a sudden leap out of the water: listen", "😾 Not like cats!", 1),
wdzTN("The Mouse", "Say something soothing to the Mouse", "🐱 Dinah", 1),
wdzTN("The Mouse", "The Mouse is trembling down to the end of his tail", "🐭 We indeed!", 1),
wdzTN("The Mouse", "Change the subject: are you fond of dogs?", "🐕 A nice little dog", 1),
wdzTN("The Mouse", "The Mouse is swimming away as hard as it can go: call softly after it", "🐭 Mouse dear!", 1),
wdzId("crowded", wdzN("🦤 The pool is getting quite crowded", 1)),
wdzId("ashore", wdzGo("poolshore", "Swim after Alice and the whole party to the shore", { r: 5 }))
] });
var WD_RING = function (i, n, r) { var a = i / n * 6.283; return wdWo(-492 + Math.cos(a) * (r || 2.4), 70 + Math.sin(a) * (r || 2.4)); };
wdbCh({ t: "A Caucus-Race and a Long Tale", txt: 2, p0: 1, start: { sc: "wonder", x: -494, z: 66, ry: 0.4 }, jump: 1, tune: "race", keep: ["wonder", "A comfit from the Dodo's prize-giving", "🍬"],
words: "You come ashore with Alice and the whole party: the birds with draggled feathers, the animals with their fur clinging close to them, all dripping wet, cross, and uncomfortable.",
intro: "The bank of the pool",
state: { env: "wonder", size: 0.3 },
cast: [
wdc("alice", WD_RING(0, 9), { ry: 3.6, s: 0.3 }),
wdc("mouse", WD_RING(1, 9), { ry: 4.2, s: 1.4, until: "gone" }),
wdc("dodo", WD_RING(2, 9), { ry: 4.8, s: 0.55 }),
wdc("lory", WD_RING(3, 9), { ry: 5.4, s: 0.6 }),
wdc("eaglet", WD_RING(4, 9), { ry: 6.0, s: 0.6 }),
wdc("duck", WD_RING(5, 9), { ry: 0.4, s: 0.6 }),
wdc("crab", WD_RING(6, 9), { ry: 1.0, s: 0.4, until: "scatter" }),
wdc("crabdau", WD_RING(7, 9), { ry: 1.6, s: 0.4, until: "scatter" }),
wdc("magpie", WD_RING(8, 9), { ry: 2.2, s: 0.6, until: "scatter" }),
wdc("canary", WD_RING(8, 9, 3.4), { ry: 2.6, s: 0.6, until: "scatter" })
],
steps: [
{ k: "read" },
wdzN("💧 How to get dry again", 1),
wdzTN("The Mouse", "The Mouse, a person of authority, calls out: sit down, all of you, and listen", "🐭 I'll soon make you dry enough!", 1),
wdzN("📜 The driest thing I know", 5),
wdzN("🔍 Found WHAT?", 4),
wdzPuzzle("💧 Dry yet?", "The Mouse has got to Stigand, the patriotic archbishop of Canterbury. How are you getting on now?", ["Quite dry, thank you", "As wet as ever: it doesn't seem to dry me at all", "Drier, but cold"], 1, ["Feel your sleeves.", "", "No."], { yes: "💧 " + wdQ("'As wet as ever,' said Alice in a melancholy tone: 'it doesn't seem to dry me at all.'") }),
wdzN("💧 As wet as ever", 1),
wdzTN("The Dodo", "The Dodo rises solemnly to its feet", "🦤 I move that the meeting adjourn", 1),
wdzN("🦅 Speak English!", 1),
wdzTN("The Dodo", "The Dodo, in an offended tone", "🦤 The best thing to get us dry", 1),
wdzN("🏁 What IS a Caucus-race?", 1),
wdzN("🏁 The best way to explain it is to do it", 1),
wdzId("race", wdzUntil(function () { return (WDW.raceLaps || 0) >= 1; }, "race", "Run the Caucus-race: once round the course in a sort of circle (begin when you like, leave off when you like)", { r: 16, on: function () { WDW.raceLaps = 0; WDW.raceA = null; }, sim: function () { WDW.raceLaps = 1; } })),
wdzN("🏁 The race is over!", 1),
wdzN("🏆 Everybody has won", 1),
wdzN("🏆 Who is to give the prizes?", 1),
wdzTN("The Dodo", "The Dodo points at Alice with one finger", "🏆 Why, SHE, of course", 1),
wdzFind("comfit", wdWo(-493.4, 67.6), "A box of comfits", "Help Alice: there is a box of comfits in her pocket (the salt water has not got into it). Take it out"),
wdzN("🍬 Comfits for prizes", 1),
wdzN("🪡 Only a thimble", 4),
wdzFind("thimble", wdWo(-492.6, 68.2), "The thimble", "Hand the Dodo Alice's thimble"),
wdzN("🪡 This elegant thimble", 1),
wdzN("🙇 Very absurd, but they all looked so grave", 1),
wdzN("🍬 Eating the comfits", 1),
wdzTN("The Mouse", "Ask the Mouse to tell you its history, and why it hates C and D", "🐭 Your history", 1),
wdzTN("The Mouse", "The Mouse turns to Alice and sighs", "🐭 A long and a sad tale", 1),
wdzN("🐭 It IS a long tail, certainly", 1),
wdzN("📜 Fury said to a mouse", 1),
wdzPuzzle("📜 The shape of the tale", "Look at the Mouse's tale laid out on the page. What shape is it in?", ["A square", "A long winding tail, getting smaller to its end", "A circle, like the race"], 1, ["No.", "", "No."], { yes: "🐭 " + wdQ("'It IS a long tail, certainly,' said Alice") }),
wdzN("🪢 A knot!", 4),
wdzId("gone", wdzN("🐭 The Mouse walks away", 4)),
wdzN("🦀 The old Crab and her daughter", 1),
wdzN("🐱 Our Dinah", 3),
wdzId("scatter", wdzN("🐦 A remarkable sensation", 1)),
wdzN("🐾 Pattering footsteps", 1)
] });
WDW.raceLaps = 0;
function wdwRaceTick(dt, L) { return __ZC(514, 229, this, arguments, new.target); }
(function () { var b0 = WDW_SCN.wonder.build; WDW_SCN.wonder.build = function (G) { b0(G); WDW.ticks.push(wdwRaceTick); }; })();
wdbCh({ t: "The Rabbit Sends in a Little Bill", txt: 3, p0: 1, start: { sc: "wonder", x: -478, z: 104, ry: 0.8 }, jump: 1, tune: "house", keep: ["wonder", "A tiny white kid glove from the tidy little room", "🧤"],
words: "The party has scattered. You and Alice are left alone on the bank, and something is coming back along the shore, pattering.",
intro: "The bank of the pool",
state: { env: "wonder", size: wdzSz(0.6, [["grow", 1.3], ["small", 0.12]]) },
cast: [
wdc("alice", wdWo(-476, 106), { ry: 0.8, s: 0.6, until: "house" }),
wdc("rabbit", wdWo(-472, 110), { ry: 3.6, until: "house" }),
wdc("alice", wdWo(-250, 142), { key: "al2", ry: Math.PI, s: 0.6, from: "house", until: "room" }),
wdc("bill", wdWo(-246, 138), { ry: Math.PI, s: 0.7, from: "out", until: "wood" }),
wdc("mouse", wdWo(-247, 137), { key: "gp1", name: "A guinea-pig", ry: 2.6, s: 1.6, from: "out", until: "wood" }),
wdc("mouse", wdWo(-245, 137), { key: "gp2", name: "Another guinea-pig", ry: 3.6, s: 1.6, from: "out", until: "wood" }),
wdc("pat", wdWo(-243, 141), { ry: 3.4, from: "out", until: "wood" }),
wdc("rabbit", wdWo(-252, 138), { key: "rb2", ry: 0.4, from: "out", until: "wood" }),
wdc("magpie", wdWo(-249, 136), { key: "mg", ry: 0, s: 0.6, from: "out", until: "wood" }),
wdc("duck", wdWo(-244, 136), { key: "dk", ry: 0, s: 0.6, from: "out", until: "wood" }),
wdc("alice", wdWo(-58, 72), { key: "al3", ry: 0.6, s: 0.12, from: "wood", until: "shroom" }),
wdc("puppy", wdWo(-62, 64), { ry: 0.2, from: "puppy", until: "away" }),
wdc("alice", wdWo(70.42, -39.5), { key: "al4", ry: Math.PI, s: 0.12, from: "shroom" }),
wdc("caterpillar", wdWo(70, -40), { ry: 0, s: 0.22, dy: 0.34, from: "shroom" })
],
steps: [
{ k: "read" },
wdzTN("The White Rabbit", "The White Rabbit has noticed Alice: listen", "🐇 Why, Mary Ann!", 1),
wdzId("house", wdzGo("rabbit", "Run with Alice off the way he pointed: there is a neat little house ahead", { r: 4 })),
wdzN("🏠 W. RABBIT", 1),
wdzSpot("The door with the brass plate, W. RABBIT", "Go in without knocking"),
wdzN("🐱 Going messages for a rabbit", 1),
wdzSpot("Up the stairs", "Hurry upstairs, for fear of meeting the real Mary Ann"),
wdzId("room", wdzN("🧪 A tidy little room", 1)),
wdzFind("fan", wdR("rabroom", -0.2, -1.3), "The fan", "Take the fan from the table in the window", { at2: 1 }),
wdzFind("gloves", wdR("rabroom", 0.3, -1.3), "A pair of tiny white kid gloves", "And a pair of the gloves"),
wdzSpot("The little bottle by the looking-glass", "There is a little bottle by the looking-glass, with no label this time: drink from it"),
wdzId("grow", wdzN("📈 Much sooner than she had expected", 1)),
wdzN("📈 Growing, and growing", 1),
wdzN("🪟 No chance of ever getting out", 1),
wdzN("🏡 It was much pleasanter at home", 4),
wdzN("🗣️ Mary Ann! Mary Ann!", 1),
wdzN("🚪 The door opened inwards", 1),
wdzId("frame", wdzN("💥 A crash of broken glass", 1)),
wdzPuzzle("🥒 What did he fall into?", "From the sound of the breaking glass, what does Alice think the Rabbit has fallen into?", ["The well", "A cucumber-frame, or something of the sort", "The pool of tears"], 1, ["No.", "", "No."], { yes: "🥒 " + wdQ("she concluded that it was just possible it had fallen into a cucumber-frame, or something of the sort") }),
wdzN("🍎 Digging for apples", 7),
wdzN("🛒 The rumbling of little cartwheels", 1),
wdzN("🦎 Bill's to go down", 1),
wdzN("🦎 So Bill's got to come down the chimney", 1),
wdzPuzzle("🦶 The chimney", "Something is scratching and scrambling about in the chimney close above Alice's foot. What does she do?", ["Shout up the chimney", "Give one sharp kick, and wait to see what will happen next", "Pull her foot back down"], 1, ["No.", "", "No."], { yes: "🦶 " + wdQ("she gave one sharp kick, and waited to see what would happen next") }),
wdzN("🦶 She drew her foot as far down the chimney as she could", 1),
wdzN("🚀 There goes Bill!", 3),
wdzN("🔥 We must burn the house down!", 1),
wdzN("🤫 A dead silence", 1),
wdzN("🪨 A shower of little pebbles", 1),
wdzGather("pebble", wdR("rabroom", 0, 0), 3, "Little pebbles", "Pick up the pebbles that came rattling in at the window", { spread: 1.2 }),
wdzN("🍰 The pebbles were all turning into little cakes", 1),
wdzId("small", wdzFind("cakes", wdR("rabroom", 0.4, 0.4), "The little cakes", "Swallow one of the little cakes, as Alice does")),
wdzId("out", (function () { var r = wdzTravel("🏃 Out of the house", "", "rabbit", "🏃 <b>A crowd of little animals and birds,</b> waiting outside."); r.pn = 1; return r; })()),
wdzId("wood", wdzGo(wdWo(-60, 70), "Run off as hard as you can, and into a thick wood", { r: 5 })),
wdzN("🌳 The first thing I've got to do", 2),
wdzId("puppy", wdzN("🐕 An enormous puppy", 1)),
wdzFind("wood", wdWo(-58.6, 70.6), "A little bit of stick", "Pick up a little bit of stick and hold it out to the puppy"),
wdzN("🐕 Hardly knowing what she did", 1),
wdzN("🌵 The thistle", 1),
wdzId("away", wdzGo(wdWo(30, 0), "Run! Run till you are quite tired and out of breath", { r: 6 })),
wdzN("🌼 What a dear little puppy it was!", 1),
wdzN("🍄 A large mushroom growing near her", 1),
wdzId("shroom", wdzGo("shroom", "Go to the mushroom, about the same height as yourself", { r: 1.4 })),
wdzN("🐛 A large blue caterpillar", 1)
] });
(function () { var b0 = WDW_SCN.wonder.build; WDW_SCN.wonder.build = function (G) { b0(G); var R = WDW.rooms.filter(function (q) { return q.key === "rabroom"; })[0]; if (R)
wdwSpot(R.cx + 1.6, R.cz + 0.4, 1.2, "The little bottle by the looking-glass", "drink from it", function () { }, R.y); }; })();
wdbCh({ t: "Advice from a Caterpillar", txt: 4, p0: 1, start: { sc: "wonder", x: 70, z: -39.3, ry: 0 }, jump: 1, tune: "wood", keep: ["wonder", "A bit of the edge of the Caterpillar's mushroom", "🍄"],
words: "You and Alice are about three inches high, standing on tiptoe at the edge of a great mushroom. On top of it a large blue caterpillar sits with its arms folded, smoking a long hookah, and taking not the smallest notice of either of you.",
intro: "The Caterpillar's mushroom",
state: { env: "wood", size: wdzSz(0.12, [["chin", 0.05], ["neck", 5], ["usual", 1], ["nine", 0.4]]) },
cast: [
wdc("caterpillar", wdWo(70, -40), { ry: 0, s: 0.22, dy: 0.34, until: "crawl" }),
wdc("alice", wdWo(70.42, -39.5), { ry: Math.PI, s: 0.12, until: "chin" }),
wdc("alice", wdWo(70.4, -36.4), { key: "al2", ry: Math.PI, s: 5, from: "neck", until: "usual" }),
wdc("pigeon", wdWo(70.2, -35.2), { ry: Math.PI * 0.9, dy: 8.0, from: "pigeon", until: "usual" }),
wdc("alice", wdWo(71, -35), { key: "al3", ry: Math.PI, s: 1, from: "usual", until: "nine" }),
wdc("alice", wdA("duchess", 1.2, 1.5), { key: "al4", ry: Math.PI, s: 0.4, from: "nine" })
],
steps: [
{ k: "read" },
wdzTN("The Caterpillar", "The Caterpillar takes the hookah out of its mouth and speaks, in a languid, sleepy voice", "🐛 Who are YOU?", 12),
wdzN("🤔 Why?", 2),
wdzId("turn", wdzGo(wdWo(70, -31), "Alice is in a very unpleasant state of mind: turn away with her", { r: 1.2 })),
wdzTN("The Caterpillar", "The Caterpillar calls after you", "🐛 Come back! I've something important to say!", 1),
wdzGo("shroom", "Turn and come back to the mushroom", { r: 1 }),
wdzTN("The Caterpillar", "Listen", "🐛 Keep your temper", 4),
wdzN("💨 It puffed away without speaking", 1),
wdzTN("The Caterpillar", "The Caterpillar unfolds its arms", "🐛 So you think you're changed, do you?", 5),
wdzN("👴 You are old, Father William", 8),
wdzPuzzle("👴 Said right?", "Alice has said the whole of Father William, with her hands folded. What does the Caterpillar make of it?", ["Very well said indeed", "That is not said right", "Say it again"], 1, ["No.", "", "No."], { yes: "🐛 " + wdQ("'That is not said right,' said the Caterpillar.") }),
wdzTN("The Caterpillar", "Alice owns up", "🐛 Wrong from beginning to end", 3),
wdzTN("The Caterpillar", "The Caterpillar is the first to speak", "🐛 What size do you want to be?", 2),
wdzPuzzle("📏 What size?", "What size does Alice want to be?", ["Oh, very tall, sir: as tall as a tree", "Not particular as to size: only one doesn't like changing so often", "Smaller still, so the Cat can't see me"], 1, ["No.", "", "No."], { yes: "📏 " + wdQ("'Oh, I'm not particular as to size,' Alice hastily replied; 'only one doesn't like changing so often, you know.'") }),
wdzTN("The Caterpillar", "The Caterpillar contradicts her", "🐛 I DON'T know", 3),
wdzTN("The Caterpillar", "A little larger, if you wouldn't mind", "🐛 Three inches is such a wretched height", 5),
wdzId("crawl", wdzN("🍄 One side will make you grow taller", 1)),
wdzTN("Alice", "Alice thinks it over", "🍄 One side of WHAT?", 2),
wdzN("🍄 Round, and round", 1),
wdzFind("shroom", wdWo(69.75, -40), "A bit of the edge, in the right hand", "Stretch your arms round the mushroom as far as they will go, and break off a bit of the edge with your right hand"),
wdzFind("shroom", wdWo(70.25, -40), "A bit of the edge, in the left hand", "And with your left"),
wdzId("chin", wdzN("👟 A violent blow underneath her chin", 1)),
wdzPuzzle("🍄 Which is which?", "Your chin is pressed so closely against your foot that there is hardly room to open your mouth. Which bit do you nibble now?", ["The right-hand bit again", "The left-hand bit"], 1, ["No! That will shrink you away to nothing.", ""], { yes: "🍄 " + wdQ("she did it at last, and managed to swallow a morsel of the lefthand bit.") }),
wdzId("neck", wdzN("🌿 An immense length of neck", 1)),
wdzN("🐍 Come, my head's free at last!", 1),
wdzN("🌳 What CAN all that green stuff be?", 1),
wdzId("pigeon", wdzN("🐦 A large pigeon had flown into her face", 1)),
wdzTN("The Pigeon", "The Pigeon beats you violently with its wings", "🐦 Serpent!", 11),
wdzPuzzle("🐦 What are you?", "Well! WHAT are you? says the Pigeon. What does Alice tell her?", ["A serpent, I suppose", "A little girl", "I'm sure I don't know"], 1, ["No.", "", "No."], { yes: "🐦 " + wdQ("'I--I'm a little girl,' said Alice, rather doubtfully, as she remembered the number of changes she had gone through that day.") }),
wdzTN("The Pigeon", "The Pigeon will not believe it", "🐦 A likely story indeed!", 6),
wdzId("usual", wdzN("🍄 Nibbling first at one and then at the other", 1)),
wdzGo("duchess", "The next thing is to get into that beautiful garden: go on, and into an open place with a little house in it, about four feet high", { r: 8 }),
wdzId("nine", wdzN("🏠 About four feet high", 1))
] });
var WD_DU = function (dx, dz) { return wdA("duchess", dx, dz); };
var WD_KI = function (lx, lz) { return wdR("kitchen", lx, lz); };
wdbCh({ t: "Pig and Pepper", txt: 5, p0: 1, start: { sc: "wonder", x: 327, z: -160, ry: 0.3 }, jump: 1, tune: "pepper", keep: ["wonder", "A grain of the Duchess's pepper", "🌶️"],
words: "You are about nine inches high, with Alice beside you, at the edge of an open place where a little house stands, about four feet high. A footman in livery comes running out of the wood.",
intro: "The Duchess's house",
state: { env: "pepper", size: wdzSz(0.4, [["hare", 0.5]]) },
cast: [
wdc("alice", WD_DU(-3, -6), { ry: 0.3, s: 0.4, until: "door" }),
wdc("fishfoot", WD_DU(-1.0, -0.6), { ry: 0.2, s: 0.55, until: "bow" }),
wdc("frogfoot", WD_DU(0.6, -0.8), { ry: Math.PI + 0.2, s: 0.55, until: "bow" }),
wdc("frogfoot", WD_DU(1.0, -1.2), { key: "fr2", ry: Math.PI, s: 0.55, from: "bow", until: "in" }),
wdc("alice", WD_DU(-0.5, -1.6), { key: "al2", ry: Math.PI * 0.9, s: 0.4, from: "door", until: "in" }),
wdc("duchess", WD_KI(0, 0.16), { s: 0.4, ry: Math.PI, from: "in", until: "out" }),
wdc("pig", WD_KI(0.25, 0.3), { key: "baby", s: 0.32, ry: Math.PI, from: "in", until: "nurse" }),
wdc("cook", WD_KI(0.3, -0.95), { s: 0.4, ry: 0, from: "in", until: "out" }),
wdc("cat", WD_KI(-0.55, -1.05), { key: "kcat", s: 0.5, ry: 0.3, from: "in", until: "out" }),
wdc("alice", WD_KI(-0.6, 0.5), { key: "al3", ry: 2.6, s: 0.4, from: "in", until: "out" }),
wdc("alice", WD_DU(1.5, -4), { key: "al4", ry: 0.4, s: 0.4, from: "out", until: "cat" }),
wdc("pig", WD_DU(1.3, -3.6), { key: "baby2", s: 0.32, ry: 0.4, from: "out", until: "trot" }),
wdc("pig", WD_DU(9, -12), { key: "pig", s: 0.36, ry: 0.6, from: "trot", until: "cat" }),
wdc("cat", wdWo(421.5, -40), { ry: Math.PI, dy: 3.2, from: "bough", until: "back1" }),
wdc("alice", wdA("cat", 0.6, 0), { key: "al5", ry: Math.PI, s: 0.4, from: "cat" }),
wdc("cat", wdWo(421.5, -40), { key: "c2", ry: Math.PI, dy: 3.2, from: "back1", until: "back2" }),
wdc("cat", wdWo(421.5, -40), { key: "c3", ry: Math.PI, dy: 3.2, from: "back2", until: "hare" })
],
steps: [
{ k: "read" },
wdzTN("The Fish-Footman", "The Fish-Footman produces from under his arm a great letter", "📜 For the Duchess. An invitation from the Queen to play croquet.", 1),
wdzId("bow", wdzN("🙇 Their curls got entangled together", 2)),
wdzId("door", wdzGo(WD_DU(-0.4, -2.2), "Go timidly up to the door with Alice", { r: 1.2 })),
wdzN("🚪 And knocked", 1),
wdzTN("The Frog-Footman", "The Frog-Footman, sitting on the ground near the door, staring stupidly up into the sky", "🐸 There's no sort of use in knocking", 4),
wdzId("plate", wdzN("🍽️ A large plate came skimming out", 1)),
wdzTN("The Frog-Footman", "The Footman goes on, exactly as if nothing had happened", "🐸 --or next day, maybe", 3),
wdzPuzzle("🐸 ARE you to get in?", "ARE you to get in at all? That's the first question, says the Footman. What does Alice think of the way all the creatures argue?", ["It's really dreadful: it's enough to drive one crazy!", "Very sensible", "Rather polite"], 0, ["", "No.", "No."], { yes: "🐸 " + wdQ("'It's really dreadful,' she muttered to herself, 'the way all the creatures argue. It's enough to drive one crazy!'") }),
wdzTN("The Frog-Footman", "The Footman, whistling", "🐸 Anything you like", 5),
wdzId("in", wdzSpot("The door of the Duchess's house", "Open the door and go in")),
wdzN("🍲 A large kitchen, full of smoke", 1),
wdzN("🤧 Too much pepper in that soup!", 2),
wdzTN("The Duchess", "Ask the Duchess, a little timidly, why her cat grins like that", "🐱 It's a Cheshire cat, and that's why. Pig!", 7),
wdzId("throw", wdzN("🍳 The fire-irons came first", 1)),
wdzTN("The Duchess", "The Duchess, in a hoarse growl", "🪓 Talking of axes, chop off her head!", 6),
wdzN("🎵 Speak roughly to your little boy", 8),
wdzTN("The Duchess", "The Duchess flings the baby at you", "👶 Here! you may nurse it a bit, if you like!", 1),
wdzId("nurse", wdzPuzzle("👶 The proper way of nursing it", "The baby is a queer-shaped little creature, holding out its arms and legs in all directions, just like a star-fish. What is the proper way of nursing it?", ["Rock it gently in your arms", "Twist it up into a sort of knot, and keep tight hold of its right ear and left foot", "Hold it up by the heels"], 1, ["It snorts like a steam-engine.", "", "No."], { yes: "👶 " + wdQ("which was to twist it up into a sort of knot, and then keep tight hold of its right ear and left foot, so as to prevent its undoing itself") })),
wdzN("👶 A queer-shaped little creature", 2),
wdzId("out", wdzGo(WD_DU(1.5, -4.2), "Carry it out into the open air", { r: 1.4 })),
wdzN("🐷 The baby grunted again", 3),
wdzId("trot", wdzN("🐷 It trotted away quietly into the wood", 1)),
wdzId("bough", wdzN("😸 The Cheshire Cat sitting on a bough of a tree", 1)),
wdzId("cat", wdzGo("cat", "Go to the tree a few yards off, where the Cat is grinning", { r: 2 })),
wdzTN("The Cheshire Cat", "Ask the Cat which way you ought to go from here", "😸 That depends a good deal on where you want to get to", 6),
wdzPuzzle("😸 What sort of people?", "Which two sorts of people live round about, according to the Cat?", ["A Hatter, and a March Hare: visit either you like, they're both mad", "The Queen and her soldiers", "Nobody at all"], 0, ["", "No.", "No."], { yes: "🎩 " + wdQ("'In THAT direction,' the Cat said, waving its right paw round, 'lives a Hatter: and in THAT direction,' waving the other paw, 'lives a March Hare. Visit either you like: they're both mad.'") }),
wdzTN("The Cheshire Cat", "The Cat", "😸 We're all mad here", 6),
wdzTN("The Cheshire Cat", "The Cat goes on", "😸 A dog growls when it's angry, and wags its tail when it's pleased", 7),
wdzTN("The Cheshire Cat", "And the Cat?", "😸 You'll see me there", 1),
wdzId("v1", Object.assign(wdzN("🌳 The place where it had been", 1), { on: function () { wdwFade("cat", 0.5, 0); } })),
wdzId("back1", wdzTN("The Cheshire Cat", "It appears again, suddenly", "😸 By-the-bye, what became of the baby?", 3)),
wdzId("v2", Object.assign(wdzN("🐇 Towards the March Hare's", 1), { on: function () { wdwFade("c2", 0.5, 0); } })),
wdzId("back2", wdzTN("The Cheshire Cat", "The Cat again, on a branch", "😸 Did you say pig, or fig?", 3)),
wdzId("gone", Object.assign(wdzN("😁 A grin without a cat!", 1), { on: function () { wdwFade("c3", 6, 1); } })),
wdzGo(wdA("tea", 0, -14), "Walk on towards the house of the March Hare", { r: 6 }),
wdzId("hare", wdzN("🐰 The chimneys were shaped like ears", 1))
] });
var WD_TT = function (dx, dz) { return wdWo(560 + dx, 96 + dz); };
wdbCh({ t: "A Mad Tea-Party", txt: 6, p0: 1, start: { sc: "wonder", x: 553, z: 96, ry: 1.57 }, jump: 1, tune: "tea", keep: ["wonder", "A teaspoon from the mad tea-party", "🥄"],
words: "You are about two feet high, with Alice, in front of the March Hare's house. A long table is set out under a tree; the March Hare and the Hatter are having tea at it, with a Dormouse between them, fast asleep.",
intro: "The March Hare's house",
state: { env: "tea", size: wdzSz(0.5, [["little", 0.25]]), keyTaken: wdzOn("key"), doorOpen: wdzOn("little"), drank: true, ate: true },
cast: [
wdc("hatter", WD_TT(2.2, -0.55), { s: 0.5, ry: 0, until: "move" }),
wdc("hare", WD_TT(2.2, 0.55), { s: 0.5, ry: Math.PI, until: "move" }),
wdc("dormouse", WD_TT(2.62, 0), { s: 0.6, ry: -1.57, dy: 0.42, until: "move" }),
wdc("alice", WD_TT(-3.3, 0), { s: 0.5, ry: 1.57, until: "move" }),
wdc("hatter", WD_TT(1.75, -0.55), { key: "ht2", s: 0.5, ry: 0, from: "move", until: "away" }),
wdc("dormouse", WD_TT(2.2, -0.55), { key: "dm2", s: 0.6, ry: 0, dy: 0.25, from: "move", until: "away" }),
wdc("hare", WD_TT(2.2, 0.55), { key: "hr2", s: 0.5, ry: Math.PI, from: "move", until: "away" }),
wdc("alice", WD_TT(2.65, 0.55), { key: "al2", s: 0.5, ry: Math.PI, from: "move", until: "away" }),
wdc("hatter", WD_TT(1.6, -0.3), { key: "ht3", s: 0.5, ry: 0.4, from: "away", until: "tree" }),
wdc("hare", WD_TT(1.9, -0.3), { key: "hr3", s: 0.5, ry: -0.4, from: "away", until: "tree" }),
wdc("alice", wdA("treedoor", 0.6, 0.8), { key: "al3", s: 0.5, ry: Math.PI, from: "tree", until: "hall" }),
wdc("alice", wdHa(0.8, -3.5), { key: "al4", s: 0.5, ry: 0, from: "hall" })
],
steps: [
{ k: "read" },
wdzN("🫖 Room enough!", 1),
wdzSpot("The large arm-chair at one end of the table", "Sit down in the large arm-chair, as Alice does, quite indignant"),
wdzTN("The March Hare", "The March Hare, in an encouraging tone", "🍷 Have some wine", 6),
wdzTN("The Hatter", "The Hatter has been looking at Alice for some time with great curiosity", "🎩 Why is a raven like a writing-desk?", 3),
wdzTN("The March Hare", "Riddles: come, we shall have some fun now", "🐰 Then you should say what you mean", 9),
wdzTN("The Hatter", "The Hatter takes his watch out of his pocket, shaking it every now and then", "⌚ What day of the month is it?", 1),
wdzPuzzle("⌚ What day of the month?", "Alice considers a little. What does she say?", ["The first", "The fourth", "The twenty-ninth"], 1, ["No.", "", "No."], { yes: "⌚ " + wdQ("Alice considered a little, and then said 'The fourth.'") }),
wdzTN("The Hatter", "Two days wrong!", "🧈 It was the BEST butter", 5),
wdzTN("The Hatter", "Look over his shoulder at the funny watch", "⌚ Does YOUR watch tell you what year it is?", 5),
wdzTN("The Hatter", "The Hatter pours a little hot tea upon the Dormouse's nose", "☕ The Dormouse is asleep again", 3),
wdzPuzzle("🐦 The riddle", "Have you guessed the riddle yet? Why is a raven like a writing-desk?", ["Because both have quills", "Alice gives it up: and the Hatter hasn't the slightest idea either", "Because Poe wrote on both"], 1, ["Nobody at the table says so.", "", "No."], { yes: "🎩 " + wdQ("'I haven't the slightest idea,' said the Hatter.") }),
wdzTN("The Hatter", "Hear them out", "🎩 I haven't the slightest idea", 3),
wdzTN("The Hatter", "Something better to do with the time", "⏳ If you knew Time as well as I do", 6),
wdzTN("The Hatter", "The March Hare, to itself, in a whisper; and the Hatter", "⏳ I quarrelled with Him last March", 5),
wdzN("🦇 Twinkle, twinkle, little bat!", 6),
wdzPuzzle("🦇 The second line", "Up above the world you fly, like a ... in the sky. How does the Hatter's song go?", ["Diamond", "Tea-tray", "Teapot"], 1, ["That is another song.", "", "No."], { yes: "🦇 " + wdQ("Like a tea-tray in the sky.") }),
wdzTN("The Hatter", "The Hatter, in a mournful tone", "🕕 It's always six o'clock now", 8),
wdzTN("The March Hare", "The March Hare, yawning", "🐭 Wake up, Dormouse!", 7),
wdzTN("The Dormouse", "The Dormouse, in a great hurry", "🍯 Once upon a time there were three little sisters", 6),
wdzTN("The March Hare", "The March Hare, very earnestly", "☕ Take some more tea", 5),
wdzTN("The Dormouse", "Alice helps herself to some tea and bread-and-butter", "🍯 It was a treacle-well", 7),
wdzTN("The Hatter", "The Hatter interrupts", "🧹 I want a clean cup, let's all move one place on", 1),
wdzId("move", wdzGo(WD_TT(2.65, 0.55), "Move one place on with them: you get the March Hare's place, and he has just upset the milk-jug into his plate", { r: 0.6 })),
wdzN("🥛 The only one who got any advantage from the change", 1),
wdzTN("The Dormouse", "Alice, very cautiously", "🍯 Where did they draw the treacle from?", 5),
wdzTN("The Dormouse", "The Dormouse, yawning and rubbing its eyes, for it is getting very sleepy", "🖌️ They were learning to draw", 5),
wdzPuzzle("Ⓜ️ Beginning with an M", "The three little sisters drew all manner of things: everything that begins with an M. Which of these did the Dormouse name?", ["Mouse-traps, and the moon, and memory, and muchness", "Marmalade, and mushrooms, and mice", "Milk, and muffins, and mustard"], 0, ["", "No.", "No."], { yes: "Ⓜ️ " + wdQ("such as mouse-traps, and the moon, and memory, and muchness") }),
wdzTN("The Hatter", "Alice, very much confused", "🎩 Then you shouldn't talk", 2),
wdzId("away", wdzN("🫖 Trying to put the Dormouse into the teapot", 1)),
wdzGo(wdA("treedoor", 0, 24), "Walk off in great disgust, through the wood", { r: 6 }),
wdzN("🌳 The stupidest tea-party I ever was at", 1),
wdzId("tree", wdzN("🚪 One of the trees had a door leading right into it", 1)),
wdzRew("treedoor", wdA("treedoor"), "Go straight in", { r: 3 }),
wdzId("hall", wdzN("🗝️ Once more she found herself in the long hall", 1)),
wdzId("key", wdzFind("key", wdHa(0, -6), "The little golden key", "Take the little golden key from the glass table")),
wdzId("unlock", wdzSpot("The little door behind the curtain", "Unlock the door that leads into the garden")),
wdzId("little", wdzFind("shroom", wdHa(0.6, -19.8), "The piece of mushroom kept in her pocket", "Nibble at the mushroom, as Alice does, till you are about a foot high")),
wdzRew("littledoor", wdA("curtain"), "Walk down the little passage", { r: 2 }),
wdzTravel("🌹 The beautiful garden", "<p>And then: the little passage, and at last the beautiful garden, among the bright flower-beds and the cool fountains.</p>", "gardenin", "🌹 <b>The beautiful garden,</b> among the bright flower-beds and the cool fountains.")
] });
var WD_GR = function (x, z) { return { sc: "garden", x: x, z: z }; };
var WD_PROC = (function () {
var L = [], sp = ["clubs", "clubs", "clubs", "clubs", "clubs", "clubs", "diamonds", "diamonds", "diamonds", "diamonds", "hearts", "hearts"];
sp.forEach(function (s, i) { var row = Math.floor(i / 2), side = i % 2 ? 1 : -1; L.push(wdc("card", WD_GR(3 + side * 1.1, 262 + row * 1.8), { key: "pr" + i, beast: "card:" + s + ":" + (i < 6 ? 2 + i : i < 10 ? i - 4 : i - 9), mute: 1, ry: 0, from: "proc", until: "croquet" })); });
return L;
})();
wdbCh({ t: "The Queen's Croquet-Ground", txt: 7, p0: 1, start: { sc: "garden", x: 3, z: 309, ry: Math.PI }, jump: 1, tune: "garden", keep: ["garden", "A petal from the rose-tree, half painted red", "🌹"],
words: "You come in through the little door with Alice into the beautiful garden. Near the entrance stands a large rose-tree; the roses on it are white, and three gardeners are busily painting them red.",
intro: "The Queen's garden",
state: { env: "garden", size: 1 },
cast: [
wdc("alice", WD_GR(4, 304), { s: 1, ry: Math.PI, until: "croquet" }),
wdc("two", WD_GR(5, 298.6), { ry: 0.2, until: "pot" }),
wdc("five", WD_GR(7.2, 298.8), { ry: -0.3, until: "pot" }),
wdc("seven", WD_GR(6.2, 297.6), { ry: 0, until: "pot" }),
wdc("knave", WD_GR(3, 272.6), { ry: 0, from: "proc", until: "croquet" }),
wdc("rabbit", WD_GR(1.6, 274), { key: "rb", ry: 0, from: "proc", until: "croquet" }),
wdc("king", WD_GR(2.2, 276), { ry: 0, from: "proc", until: "croquet" }),
wdc("queen", WD_GR(3.8, 276), { ry: 0, from: "proc", until: "croquet" }),
wdc("rabbit", wdA("croquet", -1.2, 1.0), { key: "rb2", ry: Math.PI, from: "walk", until: "place" })
]
.concat(WD_PROC).concat([
wdc("alice", wdA("croquet", 1, 1.2), { key: "al2", s: 1, ry: Math.PI, from: "croquet" }),
wdc("queen", wdA("croquet", -8, -10), { key: "q2", ry: 0.4, from: "croquet", until: "crowd" }),
wdc("king", wdA("croquet", 3.2, -2.2), { key: "k2", ry: 0, from: "king", until: "fetch" }),
wdc("cat", wdA("croquet", 1.5, -3), { ry: Math.PI, dy: 1.7, from: "cat" }),
wdc("exec", wdA("croquet", 3.4, -4), { ry: -1.2, from: "crowd" }),
wdc("king", wdA("croquet", -0.6, -4.6), { key: "k3", ry: 1.2, from: "crowd" }),
wdc("queen", wdA("croquet", 0.4, -5.6), { key: "q3", ry: 0.4, from: "crowd" })
]),
steps: [
{ k: "read" },
wdzGo("rosetree", "Go up to the rose-tree with Alice", { r: 3 }),
wdzTN("Five of Spades", "Listen to the gardeners", "🎨 Look out now, Five! Don't go splashing paint over me like that!", 7),
wdzTN("Two of Spades", "Ask, a little timidly, why they are painting the roses", "🌹 Would you tell me why you are painting those roses?", 1),
wdzPuzzle("🌹 Why paint them?", "Why are the gardeners painting the roses red?", ["The Queen likes them better so", "This ought to have been a RED rose-tree, and they put a white one in by mistake", "For the croquet"], 1, ["Not quite.", "", "No."], { yes: "🌹 " + wdQ("this here ought to have been a RED rose-tree, and we put a white one in by mistake") }),
wdzN("🎨 Doing our best, afore she comes", 1),
wdzId("proc", wdzN("🃏 First came ten soldiers carrying clubs", 1)),
wdzN("👑 THE KING AND QUEEN OF HEARTS", 2),
wdzTN("The Queen of Hearts", "The Queen looks at Alice, and asks the Knave", "👑 Who is this?", 4),
wdzPuzzle("👑 Off with her head!", "The Queen turns crimson with fury, glares at Alice like a wild beast, and screams Off with her head! Off-- What does Alice say?", ["Please, your Majesty, forgive me", "Nonsense!", "Nothing at all"], 1, ["No.", "", "No."], { yes: "🗣️ " + wdQ("'Nonsense!' said Alice, very loudly and decidedly, and the Queen was silent.") }),
wdzN("🃏 Turn them over!", 5),
wdzTN("The Queen of Hearts", "The Queen, in a shrill, loud voice", "👑 Get up!", 4),
wdzPuzzle("🪴 You shan't be beheaded!", "Three soldiers stay behind to execute the unfortunate gardeners. Where does Alice hide them?", ["In a large flower-pot that stood near", "Behind the rose-tree", "Under the hedge"], 0, ["", "No.", "No."], { yes: "🪴 " + wdQ("she put them into a large flower-pot that stood near.") }),
wdzId("pot", wdzN("🪴 Into a large flower-pot", 1)),
wdzN("🃏 Their heads are gone", 2),
wdzTN("The Queen of Hearts", "The Queen, to Alice", "👑 Can you play croquet?", 1),
wdzPuzzle("👑 Can you play croquet?", "The soldiers are silent, and look at Alice, as the question is evidently meant for her. What does she shout?", ["No", "Yes!", "Only a little"], 1, ["No.", "", "No."], { yes: "🗣️ " + wdQ("'Yes!' shouted Alice.") }),
wdzN("👑 Come on, then!", 3),
wdzId("walk", wdzGo(wdA("croquet", 0, 12), "Join the procession, wondering very much what will happen next", { r: 5 })),
wdzTN("The White Rabbit", "A timid voice at your side: the White Rabbit, peeping anxiously into Alice's face", "🐇 It's--it's a very fine day!", 7),
wdzId("place", wdzN("🦩 Get to your places!", 1)),
wdzId("croquet", wdzGo("croquet", "Get to your place on the croquet-ground", { r: 4 })),
wdzN("🦩 The chief difficulty", 2),
wdzHold(wdA("croquet", 0, 0), 25, "Play: tuck your flamingo under your arm, with its legs hanging down, and try to give the hedgehog a blow with its head", { r: 14 }),
wdzN("😟 Very uneasy", 1),
wdzId("cat", wdzN("😸 A curious appearance in the air", 1)),
wdzTN("The Cheshire Cat", "The Cat, as soon as there is mouth enough for it to speak with", "😸 How are you getting on?", 5),
wdzN("👑 The Queen smiled and passed on", 1),
wdzId("king", wdzTN("The King of Hearts", "The King, going up to Alice, and looking at the Cat's head with great curiosity", "👑 Who ARE you talking to?", 5)),
wdzPuzzle("😸 Don't look at me like that!", "The King gets behind Alice. What does she say?", ["A cat may look at a king", "Please don't mind it, your Majesty", "It's only a cat"], 0, ["", "No.", "No."], { yes: "😸 " + wdQ("'A cat may look at a king,' said Alice. 'I've read that in some book, but I don't remember where.'") }),
wdzTN("The King of Hearts", "The King, very decidedly", "👑 It must be removed", 2),
wdzId("fetch", wdzN("👑 Off with his head!", 2)),
wdzId("chase", wdzGo(wdA("croquet", 34, -24), "The hedgehogs have walked off, and your flamingo has gone across to the other side of the garden: go and catch it", { r: 5 })),
wdzN("🦔 Engaged in a fight with another hedgehog", 3),
wdzId("crowd", wdzGo(wdA("croquet", 1, -1), "Go back to the Cheshire Cat: there is quite a large crowd collected round it", { r: 3 })),
wdzN("👥 Quite a large crowd", 1),
wdzTN("The executioner", "All three of them appeal to Alice: the executioner, the King and the Queen", "🪓 You couldn't cut off a head unless there was a body to cut it off from", 4),
wdzPuzzle("😸 Whose cat is it?", "They all talk at once. What can Alice think of to say?", ["It belongs to the Duchess: you'd better ask HER about it", "Cut it off anyway", "It belongs to nobody"], 0, ["", "No.", "No."], { yes: "😸 " + wdQ("'It belongs to the Duchess: you'd better ask HER about it.'") }),
wdzN("🦢 It belongs to the Duchess", 1),
wdzId("end", Object.assign(wdzN("👻 The Cat's head began fading away", 2), { on: function () { wdwFade("cat", 6, 1); } }))
] });
wdbCh({ t: "The Mock Turtle's Story", txt: 8, p0: 1, start: { sc: "garden", x: -4, z: 116, ry: Math.PI }, jump: 1, tune: "garden", keep: ["garden", "A smooth sea-pebble from the Mock Turtle's ledge", "🐢"],
words: "The Cat's head is gone and the game is going on again. The Duchess, in a very pleasant temper, tucks her arm into Alice's, and you walk off together across the croquet-ground.",
intro: "The croquet-ground",
state: { env: "garden", size: 1 },
cast: [
wdc("duchess", wdA("croquet", -4.6, 4.6), { ry: Math.PI, until: "queen" }),
wdc("alice", wdA("croquet", -4, 4), { ry: Math.PI, until: "walk" }),
wdc("alice", wdA("croquet", -12, 8), { key: "al2", ry: Math.PI, from: "walk", until: "gry" }),
wdc("duchess", wdA("croquet", -12.6, 8.6), { key: "du2", ry: Math.PI, from: "walk", until: "queen" }),
wdc("queen", wdA("croquet", -12, 4.5), { ry: 0, from: "queen", until: "gry" }),
wdc("gryphon", wdA("gryphon", 2.5, 0), { ry: -1.6, until: "ledge" }),
wdc("alice", wdA("gryphon", 1.2, 1.4), { key: "al3", ry: -1.6, from: "gry", until: "ledge" }),
wdc("gryphon", wdA("ledge", 2, -1.6), { key: "gr2", ry: -1.6, from: "ledge" }),
wdc("turtle", wdA("ledge", 3.6, 0), { ry: -1.6, from: "ledge" }),
wdc("alice", wdA("ledge", 1.6, 1.4), { key: "al4", ry: -1.6, from: "ledge" })
],
steps: [
{ k: "read" },
wdzTN("The Duchess", "The Duchess, tucking her arm affectionately into Alice's", "🦢 Everything's got a moral, if only you can find it", 6),
wdzId("walk", wdzGo(wdA("croquet", -12, 8), "Walk on round the ground with them, the Duchess digging her sharp little chin into Alice's shoulder", { r: 2.5 })),
wdzTN("The Duchess", "The Duchess, by way of keeping up the conversation a little", "🦢 'Tis love, 'tis love, that makes the world go round!", 5),
wdzTN("The Duchess", "The Duchess, after a pause", "🦩 I dare say you're wondering why I don't put my arm round your waist", 1),
wdzPuzzle("🦩 Why not?", "Why doesn't the Duchess put her arm round Alice's waist?", ["She is doubtful about the temper of Alice's flamingo", "She is too short", "She is holding the baby"], 0, ["", "No.", "No."], { yes: "🦩 " + wdQ("the reason is, that I'm doubtful about the temper of your flamingo.") }),
wdzTN("The Duchess", "Alice, cautiously", "🌭 Flamingoes and mustard both bite", 6),
wdzTN("The Duchess", "The Duchess, ready to agree to everything", "🦢 Be what you would seem to be", 10),
wdzId("queen", wdzN("⛈️ Frowning like a thunderstorm", 1)),
wdzTN("The Queen of Hearts", "The Queen, stamping on the ground as she speaks", "👑 Either you or your head must be off", 2),
wdzN("🦔 Let's go on with the game", 4),
wdzTN("The Queen of Hearts", "The Queen, quite out of breath", "🐢 Have you seen the Mock Turtle yet?", 5),
wdzN("👑 You are all pardoned", 1),
wdzId("gry", wdzGo(wdA("gryphon", 0, 0), "Walk off with the Queen: very soon you come upon a Gryphon, lying fast asleep in the sun", { r: 4 })),
wdzN("☀️ A Gryphon, lying fast asleep in the sun", 1),
wdzTN("The Gryphon", "The Gryphon, half to itself, half to Alice", "🦅 What fun!", 4),
wdzId("ledge", wdzGo("ledge", "Go on with the Gryphon: in the distance the Mock Turtle sits sad and lonely on a little ledge of rock", { r: 4 })),
wdzN("🐢 Sighing as if his heart would break", 1),
wdzTN("The Gryphon", "The Gryphon speaks for Alice", "🦅 This here young lady, she wants for to know your history", 3),
wdzN("🌊 Nobody spoke for some minutes", 1),
wdzTN("The Mock Turtle", "The Mock Turtle, at last, with a deep sigh", "🐢 Once I was a real Turtle", 4),
wdzPuzzle("🐢 Tortoise", "Why did they call the old master Tortoise, if he wasn't one?", ["Because he was slow", "Because he taught us", "Because of his shell"], 1, ["No.", "", "No."], { yes: "🐢 " + wdQ("'We called him Tortoise because he taught us,' said the Mock Turtle angrily: 'really you are very dull!'") }),
wdzTN("The Mock Turtle", "The Mock Turtle, angrily", "🐢 We went to school in the sea", 6),
wdzTN("The Mock Turtle", "The Mock Turtle, a little anxiously", "🫧 With extras?", 10),
wdzPuzzle("📚 The regular course", "Reeling and Writhing, of course, to begin with; and then the different branches of Arithmetic. Which are they?", ["Addition, Subtraction, Multiplication and Division", "Ambition, Distraction, Uglification, and Derision", "Adding, Taking, Times and Sharing"], 1, ["Those are Alice's.", "", "No."], { yes: "📚 " + wdQ("and then the different branches of Arithmetic--Ambition, Distraction, Uglification, and Derision.") }),
wdzTN("The Gryphon", "The Gryphon lifts up both its paws in surprise", "🦅 Never heard of uglifying!", 5),
wdzTN("The Mock Turtle", "The Mock Turtle, counting off the subjects on his flappers", "🐢 Mystery, ancient and modern, with Seaography", 7),
wdzTN("The Mock Turtle", "Alice, in a hurry to change the subject", "🕙 Ten hours the first day", 3),
wdzPuzzle("🕙 Lessons", "Why are they called lessons?", ["Because you learn them", "Because they lessen from day to day", "Because the Tortoise said so"], 1, ["No.", "", "No."], { yes: "🦅 " + wdQ("'That's the reason they're called lessons,' the Gryphon remarked: 'because they lessen from day to day.'") }),
wdzTN("The Gryphon", "Alice thinks it over", "🦅 That's enough about lessons", 5)
] });
function wdwDance(keys, sec) { return __ZC(514, 230, this, arguments, new.target); }
var WD_SND = function (dx, dz) { return wdA("sands", dx, dz); };
wdbCh({ t: "The Lobster Quadrille", txt: 9, p0: 1, start: { sc: "garden", x: 513.6, z: 47.4, ry: -1.6 }, jump: 1, tune: "sea", keep: ["garden", "A lobster's claw from the Quadrille", "🦞"],
words: "You sit with Alice on the ledge by the sea, beside the Gryphon and the Mock Turtle. The Mock Turtle sighs deeply, and draws the back of one flapper across his eyes.",
intro: "The Mock Turtle's ledge",
state: { env: "sea", size: 1 },
cast: [
wdc("gryphon", wdA("ledge", 2, -1.6), { ry: -1.6, until: "sands" }),
wdc("turtle", wdA("ledge", 3.6, 0), { ry: -1.6, until: "sands" }),
wdc("alice", wdA("ledge", 1.6, 1.4), { ry: -1.6, until: "sands" }),
wdc("alice", WD_SND(0.4, 0.6), { key: "al2", ry: -1.6, from: "sands", until: "run" }),
wdc("gryphon", WD_SND(2.6, -1.4), { key: "gr2", ry: -1.6, from: "sands", until: "run" }),
wdc("turtle", WD_SND(2.6, 1.6), { key: "tt", ry: -1.6, from: "sands", until: "run" }),
wdc("lobster", WD_SND(5, -3), { key: "lb1", ry: -1.6, mute: 1, from: "sands", until: "run" }),
wdc("lobster", WD_SND(5, 3), { key: "lb2", ry: -1.6, mute: 1, from: "sands", until: "run" }),
wdc("lobster", WD_SND(6.4, 0), { key: "lb3", ry: -1.6, from: "sands", until: "run" })
],
steps: [
{ k: "read" },
wdzTN("The Mock Turtle", "The Mock Turtle, sobbing", "🦞 What sort of a dance is it?", 9),
wdzTN("The Gryphon", "The Gryphon, with a bound into the air", "🦞 The lobsters! Swim after them!", 8),
wdzTN("The Mock Turtle", "Alice, timidly", "🦞 Would you like to see a little of it?", 4),
wdzId("sands", wdzGo("sands", "Go down to the sands with them, for the first figure", { r: 4 })),
wdzId("dance", Object.assign(wdzN("🦞 Dancing round and round Alice", 1), { on: function () { setTimeout(function () { wdwDance(["gr2", "tt", "lb1", "lb2"], 40); }, 300); } })),
wdzN("🐌 Will you walk a little faster?", 7),
wdzPuzzle("🐌 The chorus", "How does the chorus of the song go?", ["Will you, won't you, will you, won't you, will you join the dance?", "Faster, faster, said the snail", "Beautiful, beautiful soup"], 0, ["", "No.", "That's another song."], { yes: "🐌 " + wdQ("Will you, won't you, will you, won't you, will you join the dance?") }),
wdzTN("The Mock Turtle", "Alice, feeling very glad that it is over at last", "🐟 Oh, as to the whiting", 8),
wdzTN("The Gryphon", "The Gryphon, very solemnly", "👞 IT DOES THE BOOTS AND SHOES", 9),
wdzPuzzle("👞 Boots and shoes under the sea", "And what are they made of?", ["Leather and string", "Soles and eels, of course", "Shells"], 1, ["No.", "", "No."], { yes: "👞 " + wdQ("'Soles and eels, of course,' the Gryphon replied rather impatiently: 'any shrimp could have told you that.'") }),
wdzTN("Alice", "Alice's thoughts are still running on the song", "🐬 If I'd been the whiting", 6),
wdzTN("The Gryphon", "The Gryphon", "📖 Let's hear some of YOUR adventures", 3),
wdzN("📖 She began telling them her adventures", 1),
wdzTN("The Gryphon", "The Gryphon", "📖 It's all about as curious as it can be", 2),
wdzTN("The Gryphon", "The Gryphon, again", "🦞 Stand up and repeat 'Tis the voice of the sluggard", 2),
wdzN("🦞 'Tis the voice of the Lobster", 2),
wdzTN("The Mock Turtle", "The Mock Turtle", "🦞 It sounds uncommon nonsense", 8),
wdzN("🐆 I passed by his garden", 3),
wdzTN("The Mock Turtle", "The Mock Turtle interrupts", "🍲 What IS the use of repeating all that stuff?", 4),
wdzN("🍲 Beautiful Soup", 4),
wdzPuzzle("🍲 Beautiful Soup", "Beautiful Soup, so rich and green, waiting in a hot tureen! Who for such dainties would not stoop? What comes next?", ["Soup of the evening, beautiful Soup!", "Turtle soup and mustard too", "Soup of the morning, glorious soup"], 0, ["", "No.", "No."], { yes: "🍲 " + wdQ("Soup of the evening, beautiful Soup!") }),
wdzId("run", wdzN("📣 The trial's beginning!", 2)),
(function () { var r = wdzTravel("🏃 Come on!", "", "palace", "🏃 <b>The trial's beginning!</b> The Gryphon takes Alice by the hand and hurries off, without waiting for the end of the song."); r.pn = 1; return r; })()
] });
var WD_CT = function (lx, lz, up) { var f = wdR("court", lx, lz); return function () { var p = f(); if (p && up)
p.y += up; return p; }; };
var WD_JURY = (function () {
var L = [], who = [["bill", { s: 0.45 }], ["mouse", { name: "A guinea-pig", s: 0.9, key: "gp1" }], ["magpie", { s: 0.5 }], ["duck", { s: 0.5 }], ["canary", { s: 0.5 }], ["mouse", { name: "Another guinea-pig", s: 0.9, key: "gp2" }], ["lory", { s: 0.5 }], ["eaglet", { s: 0.5 }], ["dodo", { s: 0.45 }], ["mouse", { name: "A juror", s: 0.8, key: "j10" }], ["crab", { s: 0.35 }], ["hedgehog", { beast: "hedgehog", key: "j12", mute: 1, s: 0.8 }]];
who.forEach(function (w, i) { var row = i < 6 ? 0 : 1, j = i % 6, o = Object.assign({ ry: Math.PI / 2 }, w[1]); if (!o.key)
o.key = "j" + i; L.push(wdc(w[0], WD_CT(row ? -10.5 : -8.9, -4.5 + j, row ? 1.2 : 0.8), o)); });
return L;
})();
wdbCh({ t: "Who Stole the Tarts?", txt: 10, p0: 1, start: { sc: "garden", x: 0, z: -124, ry: Math.PI }, jump: 1, tune: "court", keep: ["garden", "One of the Queen's tarts, from the dish on the table", "🥧"],
words: "The Gryphon has brought you and Alice running to the palace. Through the great doors, the King and Queen of Hearts are seated on their throne, with a great crowd assembled about them.",
intro: "The palace of the Queen of Hearts",
state: { env: "court", size: wdzSz(1, [["grow", 1.5]]), tartsGone: false },
cast: [
wdc("king", WD_CT(-1.4, -8.4, 0.8), { ry: 0 }),
wdc("queen", WD_CT(1.4, -8.4, 0.8), { ry: 0 }),
wdc("herald", WD_CT(3.8, -7, 0.8), { ry: -0.6 }),
wdc("knave", WD_CT(0, 2.6), { ry: Math.PI }),
wdc("card", WD_CT(-1, 3.2), { key: "sol1", beast: "card:clubs:9", mute: 1, ry: Math.PI }),
wdc("card", WD_CT(1, 3.2), { key: "sol2", beast: "card:clubs:10", mute: 1, ry: Math.PI }),
wdc("alice", WD_CT(-3.4, 6), { ry: Math.PI, until: "grow" }),
wdc("alice", WD_CT(-3.4, 6), { key: "al2", ry: Math.PI, s: 1.5, from: "grow" }),
wdc("gryphon", WD_CT(-5, 6.4), { ry: Math.PI, until: "hatter" }),
wdc("hatter", WD_CT(6.4, -3, 0.4), { ry: -1.57, from: "hatter", until: "cook" }),
wdc("hare", WD_CT(5.2, -1.2), { ry: -1.57, from: "hatter", until: "cook" }),
wdc("dormouse", WD_CT(-2.4, 6), { ry: Math.PI, s: 0.8, from: "grow" }),
wdc("cook", WD_CT(6.4, -3, 0.4), { ry: -1.57, from: "cook" })
].concat(WD_JURY),
steps: [
{ k: "read" },
wdzId("in", wdzSpot("The doors of the palace, into the court of justice", "Go in through the great doors of the palace")),
wdzN("⚖️ A court of justice", 3),
wdzTN("The Gryphon", "The Gryphon whispers in reply", "🦅 They're putting down their names", 4),
wdzId("pencil", wdzGo(WD_CT(-7.6, -1.6), "One of the jurors has a pencil that squeaks: go round the court and get behind him, and take it away", { r: 1.2 })),
wdzN("✏️ A pencil that squeaked", 1),
wdzTN("The White Rabbit", "The King", "📯 Herald, read the accusation!", 1),
wdzN("📜 The Queen of Hearts, she made some tarts", 2),
wdzPuzzle("🥧 The accusation", "The Queen of Hearts, she made some tarts, all on a summer day. And then?", ["The Knave of Hearts, he stole those tarts, and took them quite away!", "The King of Hearts, he ate those tarts", "The Knave of Hearts, he baked some more"], 0, ["", "No.", "No."], { yes: "🥧 " + wdQ("The Knave of Hearts, he stole those tarts, And took them quite away!") }),
wdzTN("The King of Hearts", "The King, to the jury", "⚖️ Consider your verdict", 3),
wdzId("hatter", wdzTN("The Hatter", "The first witness: the Hatter, with a teacup in one hand and a piece of bread-and-butter in the other", "☕ I beg pardon, your Majesty, for bringing these in", 6)),
wdzPuzzle("📅 When did you begin?", "The Hatter looks at the March Hare, who has followed him into the court, arm-in-arm with the Dormouse. When does he say it was?", ["Fourteenth of March, I think it was", "Twenty-ninth of February", "Midsummer"], 0, ["", "No.", "No."], { yes: "📅 " + wdQ("'Fourteenth of March, I think it was,' he said.") }),
wdzTN("The Hatter", "The King", "🎩 Take off your hat", 7),
wdzId("grow", wdzN("📈 A very curious sensation", 1)),
wdzTN("The Dormouse", "The Dormouse, sitting next to you, is squeezed", "🐭 I wish you wouldn't squeeze so", 5),
wdzN("👑 The Queen had never left off staring at the Hatter", 1),
wdzTN("The Hatter", "The King, angrily", "☕ The twinkling of the tea", 10),
wdzTN("The Hatter", "The Hatter goes on", "☕ At any rate, the Dormouse said--", 5),
wdzN("🐹 Suppressed", 4),
wdzTN("The Hatter", "The King", "🎩 You may stand down", 8),
wdzTN("The King of Hearts", "The King", "⚖️ Call the next witness!", 1),
wdzId("cook", wdzN("🌶️ The Duchess's cook", 1)),
wdzTN("The Cook", "The King, with a melancholy air", "🌶️ Pepper, mostly", 7),
wdzN("🐭 For some minutes the whole court was in confusion", 1),
wdzN("📣 Alice!", 2)
] });
wdbCh({ t: "Alice's Evidence", txt: 11, p0: 1, start: { sc: "garden", x: -506.6, z: 621.2, y: WDW_RY, ry: -1.57 }, jump: 1, tune: "court", keep: ["bank", "A dead leaf that fluttered down upon Alice's face", "🍂"],
words: "Here! Alice jumps up in the flurry of the moment, quite forgetting how large she has grown, and tips over the jury-box with the edge of her skirt.",
intro: "The court of justice",
state: { env: function () { return wdbStepAt("wake") ? "dusk" : "court"; }, size: wdzSz(1.8, [["pack", 2.2], ["wake", 1]]), tartsGone: false },
cast: [
wdc("king", WD_CT(-1.4, -8.4, 0.8), { ry: 0, until: "wake" }),
wdc("queen", WD_CT(1.4, -8.4, 0.8), { ry: 0, until: "wake" }),
wdc("herald", WD_CT(3.8, -7, 0.8), { ry: -0.6, until: "wake" }),
wdc("knave", WD_CT(0, 2.6), { ry: Math.PI, until: "wake" }),
wdc("alice", WD_CT(-6.6, 1.2), { s: 1.8, ry: -1.57, until: "pack" }),
wdc("alice", WD_CT(-1.6, 4.6), { key: "al2", s: 2.2, ry: Math.PI, from: "pack", until: "wake" }),
wdc("alice", wdA("oak", 1.2, 0.6), { key: "al3", ry: Math.PI, from: "wake" }),
wdc("sister", wdA("oak", 0.4, 0.2), { ry: Math.PI * 0.9, from: "wake" })
].concat(WD_JURY.map(function (c) { return Object.assign({}, c, { until: "wake" }); })),
steps: [
{ k: "read" },
wdzGather("slate", WD_CT(-8, -1), 3, "Jurymen, sprawling", "Pick the jurymen up again as quickly as you can, and put them back into the jury-box", { spread: 2 }),
wdzN("🐟 Like a set of goldfish", 1),
wdzTN("The King of Hearts", "The King, in a very grave voice", "⚖️ The trial cannot proceed", 1),
wdzN("🦎 Bill, head downwards", 2),
wdzTN("The King of Hearts", "The King", "⚖️ What do you know about this business?", 8),
wdzN("📒 Rule Forty-two", 2),
wdzTN("The King of Hearts", "Alice", "📏 I'M not a mile high", 5),
wdzPuzzle("📒 The oldest rule in the book", "It's the oldest rule in the book, says the King. What does Alice answer?", ["Then it ought to be Number One", "Then I shall go", "I never read it"], 0, ["", "No.", "No."], { yes: "📒 " + wdQ("'Then it ought to be Number One,' said Alice.") }),
wdzTN("The King of Hearts", "The King turns pale", "⚖️ Consider your verdict", 2),
wdzTN("The White Rabbit", "The White Rabbit, jumping up in a great hurry", "📄 This paper has just been picked up", 9),
wdzTN("The Knave of Hearts", "The Knave", "🃏 I didn't write it, and they can't prove I did", 5),
wdzTN("The King of Hearts", "The King, gravely", "📜 Begin at the beginning", 3),
wdzN("📜 These were the verses the White Rabbit read", 7),
wdzTN("The King of Hearts", "The King, rubbing his hands", "📜 That's the most important piece of evidence we've heard yet", 5),
wdzTN("The King of Hearts", "The King, triumphantly, pointing to the tarts on the table", "🥧 Why, there they are!", 6),
wdzTN("The Queen of Hearts", "The Queen", "👑 Sentence first, verdict afterwards", 5),
wdzPuzzle("🃏 Who cares for you?", "Alice has grown to her full size by this time. What does she say?", ["Off with your head!", "Who cares for you? You're nothing but a pack of cards!", "I beg your pardon"], 1, ["No.", "", "No."], { yes: "🃏 " + wdQ("'Who cares for you?' said Alice, (she had grown to her full size by this time.) 'You're nothing but a pack of cards!'") }),
wdzId("pack", wdzN("🃏 You're nothing but a pack of cards!", 1)),
Object.assign(wdzGather("card", WD_CT(-1.6, 4.6), 6, "Flying cards", "The whole pack rises up into the air and comes flying down upon you: try to beat them off", { spread: 3 }), { each: function (n) { try {
wdwSizeSet(2.2 - n * 0.02);
}
catch (e) { } } }),
wdzN("🍂 Brushing away some dead leaves", 1),
wdzId("wake", (function () { var r = wdzTravel("🍂 Wake up, Alice dear!", "", "oak", "🍂 <b>The bank,</b> her head in the lap of her sister, who is gently brushing away some dead leaves that had fluttered down from the trees upon her face."); r.pn = 1; return r; })()),
wdzTN("Alice's sister", "Alice tells her sister, as well as she can remember them, all these strange Adventures", "🌅 Oh, I've had such a curious dream!", 1),
wdzN("🌅 Her sister sat still", 6)
] });
var WDL_BANK = { x: -26, z: -150 };
function wdlBank() { return __ZC(514, 231, this, arguments, new.target); }
function wdlLite() { return typeof LITE !== "undefined" && !!LITE; }
(function () {
function go() { try {
worldCard(null);
if (typeof CT !== "undefined" && CT.run)
ctStop(null);
}
catch (e) { } wdbOpenIn(); }
if (typeof ctsEnter === "function") {
var e0 = ctsEnter;
ctsEnter = function (id) { if (id === "alice") {
go();
return;
} return e0.apply(this, arguments); };
}
if (typeof ctStart === "function") {
var s0 = ctStart;
ctStart = function (id) { if (id === "alice") {
go();
return;
} return s0.apply(this, arguments); };
}
if (typeof kgnBuild === "function") {
var k0 = kgnBuild;
kgnBuild = function () {
var was = typeof KGN !== "undefined" && KGN.built;
var r = k0.apply(this, arguments);
if (!was)
try {
wdlBank();
}
catch (e) {
if (window.console)
console.warn("[wonderland] bank", e);
}
return r;
};
}
})();
function wdbOpenIn() { if (WLD.on === WDW_KEY) {
wdbOpen();
return;
} wdwEnter({}); }
