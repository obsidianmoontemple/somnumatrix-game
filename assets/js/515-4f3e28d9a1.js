/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var LKW_KEY = "lookingglass", LKW_NAME = "Through the Looking-Glass", LKW_LONG = "Through the Looking-Glass: Alice's drawing-room, Looking-Glass House, the garden of live flowers, and the great chessboard country, square by square, to the Eighth Square and the feast";
var LKW = { base: -12400000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], moving: false, ride: null, night: 0, lights: 0, water: [], inst: [], beasts: [], hgt: null, rooms: [], doors: [], envK: null, st: {}, size: 1, sizeTo: 1 };
var LKW_ERA = " It is the fourth of November, 1871, and snowing outside, in the dream Alice has after playing with her kittens, in Lewis Carroll's book Through the Looking-Glass, and What Alice Found There (1871; the book and Tenniel's pictures only, never any film or cartoon). Everything there goes backwards and the wrong way round, and the country is a great game of chess. Speak as that character does in the book: briefly, in character, with the book's own nonsense, logic and manners; keep it kind and suitable for all ages.";
var LKW_SC = {
home: { x: 0, name: "Alice's house in the snow", bound: 220, env: "snow" },
board: { x: 6000, name: "Looking-Glass Land", bound: 900, env: "board" }
};
function lkwScAt(x) { var best = null, bd = 1e9; for (var k in LKW_SC) {
var d = Math.abs(x - LKW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 1500 ? best : null; }
var LKW_AT = {};
function lkwAtPt(at) { if (typeof at === "string")
at = LKW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
function lkwEyeH() { return 1.72 * (LKW.size || 1); }
function lkwEyeOff() { return lkwEyeH() - 1.72; }
function lkwSizeSet(to, quick) { LKW.sizeTo = to; if (quick)
LKW.size = to; try {
lkbS().size = to;
}
catch (e) { } }
function lkwNear(back) {
if (typeof camera === "undefined")
return;
if (LKW.near0 == null)
LKW.near0 = camera.near;
var want = back ? LKW.near0 : ((LKW.size || 1) < 0.95 ? Math.max(0.02, LKW.near0 * (LKW.size || 1)) : LKW.near0);
if (Math.abs(camera.near - want) > 0.004) {
camera.near = want;
camera.updateProjectionMatrix();
}
}
function lkwSizeTick(dt) {
lkwNear();
var a = LKW.size || 1, b = LKW.sizeTo || 1;
if (Math.abs(a - b) < 0.002) {
LKW.size = b;
return;
}
var r = Math.pow(b / a, Math.min(1, dt * 0.9));
var n = a * r;
if ((b > a && n > b) || (b < a && n < b))
n = b;
var o0 = 1.72 * a - 1.72, o1 = 1.72 * n - 1.72;
LKW.size = n;
camera.position.y += o1 - o0;
}
function lkwSizeName() { var s = LKW.size || 1; if (s < 0.09)
return "about three inches high"; if (s < 0.18)
return "about ten inches high"; if (s < 0.4)
return "about a foot or two high"; if (s < 0.8)
return "a little short of yourself"; if (s < 1.25)
return "your own right size"; if (s < 2)
return "nine feet high"; return "enormous"; }
var LKW_ENV = {
snow: { top: 0x8A98AA, low: 0xE8ECF0, fog: 0xD8DEE6, fogD: 0.0062, sun: 0.62, sunCol: 0xF0F0F8, sunDir: [0.3, 0.6, 0.3], hemi: 0.86, hemiCol: 0xE8EEF6, hemiGround: 0xC8CCD4 },
board: { top: 0x4A8ED8, low: 0xEEF2E2, fog: 0xD6E4D0, fogD: 0.0011, sun: 1.08, sunCol: 0xFFF2D6, sunDir: [0.4, 0.85, 0.25], hemi: 0.8, hemiCol: 0xDCECF4, hemiGround: 0x4A6A2A },
hot: { top: 0x5A92D8, low: 0xF0EEDC, fog: 0xE0E2CC, fogD: 0.0014, sun: 1.12, sunCol: 0xFFEFC8, sunDir: [0.3, 0.92, 0.2], hemi: 0.8, hemiCol: 0xE8F0F4, hemiGround: 0x5A6A2E },
wood: { top: 0x4A7AB8, low: 0xC8D8B8, fog: 0x9AAE90, fogD: 0.0042, sun: 0.8, sunCol: 0xFFF0C8, sunDir: [0.3, 0.85, 0.2], hemi: 0.66, hemiCol: 0xC8DCB8, hemiGround: 0x3A4A22 },
noname: { top: 0x3A5A7A, low: 0x9AA88E, fog: 0x7A8A76, fogD: 0.0075, sun: 0.6, sunCol: 0xE8E8D0, sunDir: [0.3, 0.85, 0.2], hemi: 0.6, hemiCol: 0xB8C8B0, hemiGround: 0x2A3420 },
dark: { top: 0x1A2030, low: 0x4A5060, fog: 0x343A48, fogD: 0.0068, sun: 0.36, sunCol: 0xB8C0D8, sunDir: [0.2, 0.9, 0.1], hemi: 0.46, hemiCol: 0x8A92A8, hemiGround: 0x22262E },
windy: { top: 0x6A8AB0, low: 0xDDE2DA, fog: 0xC4CCC4, fogD: 0.0024, sun: 0.86, sunCol: 0xFFF0D8, sunDir: [0.4, 0.8, 0.3], hemi: 0.76, hemiCol: 0xDCE4EC, hemiGround: 0x4A5A3A },
river: { top: 0x5A94D8, low: 0xF0F0E0, fog: 0xDCE4D4, fogD: 0.0018, sun: 1.06, sunCol: 0xFFF0D0, sunDir: [0.4, 0.85, 0.25], hemi: 0.8, hemiCol: 0xE4ECF2, hemiGround: 0x4A6A3A },
dusk: { top: 0x2A3A6A, low: 0xE8A070, fog: 0xB89078, fogD: 0.0022, sun: 0.62, sunCol: 0xFFA868, sunDir: [-0.75, 0.25, 0.3], hemi: 0.6, hemiCol: 0xE8C0A8, hemiGround: 0x3A2E22 },
eighth: { top: 0x5A88D0, low: 0xF6EED8, fog: 0xE8E2CC, fogD: 0.0014, sun: 1.1, sunCol: 0xFFE8B8, sunDir: [0.5, 0.7, 0.3], hemi: 0.82, hemiCol: 0xF0E8DC, hemiGround: 0x5A5A2A },
room: { top: 0x2A2018, low: 0x5A4632, fog: 0x3A2C1E, fogD: 0.01, sun: 0.3, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.9, hemiCol: 0xFFE6C0, hemiGround: 0x3A2A1A },
glass: { top: 0x2A2A30, low: 0x6A6050, fog: 0x3E3A34, fogD: 0.009, sun: 0.34, sunCol: 0xFFE8C0, sunDir: [0.2, 0.9, 0.1], hemi: 0.96, hemiCol: 0xFFF0D8, hemiGround: 0x3A3228 },
shop: { top: 0x2A2418, low: 0x6A5A40, fog: 0x4A3E2C, fogD: 0.014, sun: 0.3, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.84, hemiCol: 0xFFE0B8, hemiGround: 0x3A2E1E },
carriage: { top: 0x2A2A2A, low: 0x6A5E50, fog: 0x4A443C, fogD: 0.01, sun: 0.5, sunCol: 0xFFF0D8, sunDir: [0.6, 0.5, 0.1], hemi: 0.9, hemiCol: 0xF0E8D8, hemiGround: 0x3A3228 },
feast: { top: 0x2A1E18, low: 0x7A5A40, fog: 0x4A3628, fogD: 0.008, sun: 0.4, sunCol: 0xFFE8C0, sunDir: [0.2, 0.9, 0.2], hemi: 1.0, hemiCol: 0xFFECC8, hemiGround: 0x4A2E1E },
indoor: { top: 0x2A2018, low: 0x4A3A2A, fog: 0x3A2E22, fogD: 0.012, sun: 0.26, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.86, hemiCol: 0xFFE6C0, hemiGround: 0x3A2A1E },
night: { top: 0x060A18, low: 0x141A2A, fog: 0x10141E, fogD: 0.0042, sun: 0.22, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.28, hemiCol: 0x5A6A98, hemiGround: 0x0A0C10, stars: 0.95 }
};
var LKW_Q = [];
function lkQ(s) { LKW_Q.push(s); return "<i>“" + s + "”</i>"; }
function lkQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0;white-space:pre-line'>" + lkQ(s) + "</p>"; }).join(""); }
function lkEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function lkSrc(part) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>Lewis Carroll, Through the Looking-Glass (1871)" + (part ? ", " + part : "") + "</div>"; }
function lkwLite() { return typeof LITE !== "undefined" && !!LITE; }
function lkwPhotoTex(name, mpt, nrm) { return __ZC(515, 0, this, arguments, new.target); }
function lkwS(name, col, mpt, o) { return __ZC(515, 1, this, arguments, new.target); }
function lkwCanvas(key, w, h, fn) { if (LKW.tex[key])
return LKW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (LKW.tex[key] = t); }
function lkwM(key, make) { return LKW.mats[key] || (LKW.mats[key] = make()); }
function lkwLam(col, o) { return __ZC(515, 2, this, arguments, new.target); }
function lkwShine(col, r, mt) { return lkwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function lkwGlowM(col, op) { return lkwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function lkwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function lkwLeafTex() { return lkwPhotoTexAlpha(); }
function lkwPhotoTexAlpha() { var k = "leafpng"; if (LKW.tex[k])
return LKW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (LKW.tex[k] = t); }
function lkwFrondTex(kind) { return __ZC(515, 3, this, arguments, new.target); }
function lkwBambooTex() { return __ZC(515, 4, this, arguments, new.target); }
function lkwReedTex(kind) { return __ZC(515, 5, this, arguments, new.target); }
function lkwGrassTex() { return __ZC(515, 6, this, arguments, new.target); }
function lkwFlowerTex(col) { return __ZC(515, 7, this, arguments, new.target); }
function lkwSkinTex(kind) { return __ZC(515, 8, this, arguments, new.target); }
function lkwRippleTex() { return __ZC(515, 9, this, arguments, new.target); }
function lkwWaterM(col, op) { return lkwM("water" + col + "|" + op, function () { var t = lkwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var LKW_CELL = 48;
function lkwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / LKW_CELL), b = Math.floor(x1 / LKW_CELL), c = Math.floor(z0 / LKW_CELL), d = Math.floor(z1 / LKW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function lkwGridAdd(S) { var g = LKW.sgrid || (LKW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; lkwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function lkwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; LKW.solids.push(S); lkwGridAdd(S); return S; }
function lkwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; LKW.solids.push(S); lkwGridAdd(S); return S; }
function lkwSolidAt(x, z, feet) { return __ZC(515, 10, this, arguments, new.target); }
function lkwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; LKW.floors.push(F); return F; }
function lkwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; LKW.floors.push(F); return F; }
function lkwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function lkwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function lkwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < LKW.floors.length; i++) {
var F = LKW.floors[i];
if (F.off || !lkwFloorIn(F, x, z))
continue;
var y = lkwFloorY(F, x, z);
if (y <= feet + 1.1 * Math.min(1.3, Math.max(0.15, LKW.size || 1)) && (best === null || y > best))
best = y;
} return best; }
function lkwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; LKW.spots.push(S); return S; }
function lkwPerson(seed, x, z, y, o, ry) { return __ZC(515, 11, this, arguments, new.target); }
var LKW_VO = { "Alice": ["f", 7, 1.32, 1.02], "Alice's nurse": ["f", 45, 1.02, 0.96], "The Red Queen": ["f", 45, 1.04, 1.14], "The White Queen": ["f", 50, 1.22, 1.08], "The Red King": ["m", 60, 0.82, 0.7],
"The White King": ["m", 60, 1.0, 0.94], "The White Knight": ["m", 55, 0.92, 0.86], "The Red Knight": ["m", 40, 0.76, 1.04], "Tweedledum": ["m", 12, 1.12, 1.12], "Tweedledee": ["m", 12, 1.16, 1.12],
"Humpty Dumpty": ["m", 50, 0.9, 0.92], "The Sheep": ["f", 70, 0.96, 0.9], "The Guard": ["m", 45, 0.86, 1.02], "The gentleman dressed in white paper": ["m", 40, 1.0, 0.96], "The Goat": ["m", 60, 0.78, 0.92],
"The Beetle": ["m", 40, 0.9, 1.0], "The Gnat": ["m", 30, 1.5, 0.92], "The Fawn": ["f", 10, 1.3, 0.9], "Haigha": ["m", 35, 1.1, 1.14], "Hatta": ["m", 40, 1.04, 1.1], "The Lion": ["m", 60, 0.64, 0.74],
"The Unicorn": ["m", 30, 1.0, 1.0], "The old Frog": ["m", 70, 0.7, 0.78], "The Walrus": ["m", 60, 0.74, 0.88], "The Carpenter": ["m", 45, 0.86, 0.94], "The Tiger-lily": ["f", 40, 0.98, 1.06],
"The Rose": ["f", 35, 1.1, 1.04], "The Violet": ["f", 20, 1.3, 1.08], "The Daisies": ["f", 8, 1.5, 1.2], "The Larkspur": ["f", 25, 1.2, 1.0], "A voice in the carriage": ["m", 40, 0.9, 1.0],
"The Horse": ["m", 40, 0.7, 0.9], "The Rocking-horse-fly": ["m", 20, 1.4, 1.1], "The Pudding": ["m", 50, 0.8, 0.9] };
function lkwTalk(P, name, persona, greet, r, fn) {
var V = LKW_VO[name] || null, t = { name: name, persona: persona + LKW_ERA, greet: greet };
if (V) {
t.sex = V[0];
t.age = V[1];
t.vp = V[2];
t.vr = V[3];
}
LKW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: t });
return P;
}
function lkwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(515, 12, this, arguments, new.target); }
function lkwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function lkwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = lkwHash(ix, iz), b = lkwHash(ix + 1, iz), c = lkwHash(ix, iz + 1), d = lkwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function lkwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * lkwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function lkwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function lkwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), lkwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); LKW.water.push(m); return m; }
var LKW_GEO = {};
function lkwGeo(k, make) { if (LKW_GEO[k])
return LKW_GEO[k]; var g = make(); g.userData.shared = 1; return (LKW_GEO[k] = g); }
function lkwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function lkwFronds(n, len, wid, droop, y0, ring) { return __ZC(515, 13, this, arguments, new.target); }
function lkwInst(P, geo, mat, list, o) { return __ZC(515, 14, this, arguments, new.target); }
function lkwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function lkwPathD(x, z, pts) { var best = 1e9; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = Math.sqrt(px * px + pz * pz);
if (d < best)
best = d;
} return best; }
function lkwStrip(P, pts, w, hfn, mat, lift) { return __ZC(515, 15, this, arguments, new.target); }
function lkwPlant(P, kind, list, o) { return __ZC(515, 16, this, arguments, new.target); }
function lkwTaper(pts, rads, seg, rs, flat) { return __ZC(515, 17, this, arguments, new.target); }
function lkwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function lkwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function lkwSkinM(kind, col) { return __ZC(515, 18, this, arguments, new.target); }
function lkwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), lkwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function lkwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(515, 19, this, arguments, new.target); }
function lkwBoxG(w, h, d) { return __ZC(515, 20, this, arguments, new.target); }
function lkwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(lkwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !lkwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
lkwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function lkwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(lkwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function lkwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(515, 21, this, arguments, new.target); }
function lkwHouse(P, x, z, w, d, h, o) { return __ZC(515, 22, this, arguments, new.target); }
function lkwLand(x, z) { if (LKW.inRm && lkwRoomAt(x, z))
return -999; return LKW.hgt ? LKW.hgt(x, z) : 0; }
function lkwGround(x, z, feet) { var f = lkwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = lkwLand(x, z); return f === null ? h : Math.max(f, h); }
var LKW_SCN = {};
function lkwSc() { return LKW_SC[LKW.sc] || LKW_SC.bank; }
function lkwSceneDrop() { return __ZC(515, 23, this, arguments, new.target); }
function lkwScene(k) { return __ZC(515, 24, this, arguments, new.target); }
function lkwVeil() { if (LKW.veil)
return LKW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); LKW.veil = v; return v; }
function lkwGo(at, msg, after) { return __ZC(515, 25, this, arguments, new.target); }
function lkwSmoke(P, x, y, z, col, n) { return __ZC(515, 26, this, arguments, new.target); }
function lkwFire(P, x, y, z, s) { return __ZC(515, 27, this, arguments, new.target); }
function lkwLocalSc() { var L = worldLocal(); return { x: L.x - lkwSc().x, z: L.z }; }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
Object.assign(DLN_WEAR, {
lkalice: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:calf:0.22:cloth", "oz:apron:full:short:0.18", "oz:sash", "oz:stock:knit"], col: { dress: 0xF0CC48, skirt: 0xF0CC48, trim: 0xFAFAF4, apron: 0xFCFCF8, sash: 0x3A6AC8, stock: 0x9AB0D8 }, shoes: 0x141010 }; },
lkredqueen: function (o) { return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.4:cloth", "oz:collar:high:none", "oz:pelerine"], col: { dress: 0xA8202A, skirt: 0x98182A, trim: 0xE8C860, collar: 0xF8F4EC, cape: 0x7A1018 }, shoes: 0x1A1010 }; },
lkwhitequeen: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.4:cloth", "oz:collar:high:none", "oz:pelerine"], col: { dress: 0xF2EEE4, skirt: 0xEAE4D6, trim: 0xC8B070, collar: 0xFFFFFF, cape: 0xD8D0C0 }, shoes: 0x6A5A4A }; },
lkredking: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:boots", "oz:pelerine"], col: { shirt: 0xE8C860, coat: 0xA8202A, trou: 0x7A1018, cape: 0xF4F0E8 }, shoes: 0x1A1010 }; },
lkwhiteking: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:trousers:cloth", "oz:boots", "oz:pelerine"], col: { shirt: 0xE8C860, coat: 0xF0ECE2, trou: 0xD8D2C4, cape: 0xF8F6F0 }, shoes: 0x4A3A2A }; },
lkwknight: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots", "oz:belt"], col: { shirt: 0xB8BCC4, coat: 0xE8E6E0, trou: 0xA8ACB4, stock: 0xB8BCC4, belt: 0x5A3A22 }, shoes: 0x6A6E76 }; },
lkrknight: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots", "oz:belt"], col: { shirt: 0x8A8E96, coat: 0xA8202A, trou: 0x7A7E86, stock: 0x8A8E96, belt: 0x3A2A1A }, shoes: 0x4A4E56 }; },
lktweedle: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:none", "oz:coat:short:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots"], col: { shirt: 0xF4F0E6, collar: 0xF8F6F0, coat: 0x3A4A6A, trou: 0x8A7A5A, stock: 0xE8E2D4 }, shoes: 0x1A1410 }; },
lktweedle2: function (o) { return DLN_WEAR.lktweedle(o); },
lkguard: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:none", "oz:coat:frock:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xF4F0E6, collar: 0xF4F0E6, coat: 0x1A2A4A, trou: 0x1A2A4A }, shoes: 0x101010 }; },
lkpaper: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:frock:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xFFFFFF, collar: 0xFFFFFF, tie: 0x2A2A2A, vest: 0xF8F8F4, coat: 0xFAFAF6, trou: 0xF6F6F0 }, shoes: 0x1A1A1A }; },
lkhatta: function (o) { return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth:chain", "oz:coat:frock:cloth", "oz:trousers:check", "oz:boots"], col: { shirt: 0xF6F2E8, collar: 0xF6F2E8, tie: 0xC83A3A, vest: 0xE8C860, coat: 0x3A4A6A, trou: 0xC8B890 }, shoes: 0x2A1E16 }; },
lkcarpenter: function (o) { return { ids: ["oz:shirt:long", "oz:vest:cloth", "oz:trousers:cloth", "oz:apron:full:long:0.14", "oz:boots"], col: { shirt: 0xE8E2D4, vest: 0x5A4A3A, trou: 0x4A4A5A, apron: 0xD8D0BC }, shoes: 0x2A1E16 }; },
lksoldier: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:coat:long:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:boots", "oz:belt"], col: { shirt: 0xA8ACB4, coat: 0xF0ECE2, trou: 0xA8ACB4, stock: 0xA8ACB4, belt: 0x5A3A22 }, shoes: 0x4A3A2A }; },
lktown: function (o) { var R = wRand(String(o && o.seed || "t").length * 7 + 3), c = [0x5A4A3A, 0x3A4A5A, 0x6A3A2A, 0x3A5A3A, 0x7A6A4A][Math.floor(R() * 5)]; return o && o.sex === "f" ? { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.28:cloth", "oz:apron:full:long:0.16"], col: { dress: c, skirt: c, trim: 0xE8E0D0, apron: 0xF0ECE0 }, shoes: 0x2A1E16 } : { ids: ["oz:shirt:long", "oz:vest:cloth", "oz:coat:frock:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xF0ECE0, vest: 0x8A6A3A, coat: c, trou: 0x4A4A4A }, shoes: 0x1A1A1A }; },
lknurse: function (o) { return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.26:cloth", "oz:apron:full:long:0.18", "oz:collar:high:none"], col: { dress: 0x4A5A7A, skirt: 0x4A5A7A, trim: 0xF4F0E8, apron: 0xFAFAF6, collar: 0xFAFAF6 }, shoes: 0x1A1A1A }; }
});
if (typeof DLN_HAT !== "undefined") {
var gold = function () { return wfMat(0xE8C048, { m: 0.85, r: 0.3 }); };
var crown = function (add, cap, queen) {
var g = new THREE.Group(), G = gold();
var b = new THREE.Mesh(wfGeo("lkcrb", function () { return new THREE.CylinderGeometry(0.125, 0.12, 0.06, 18, 1, true); }), G);
b.material.side = THREE.DoubleSide;
g.add(b);
for (var i = 0; i < (queen ? 10 : 8); i++) {
var a = i / (queen ? 10 : 8) * Math.PI * 2, p = new THREE.Mesh(wfGeo(queen ? "lkcrq" : "lkcrp", function () { return queen ? new THREE.SphereGeometry(0.02, 6, 4) : new THREE.ConeGeometry(0.022, 0.07, 5); }), G);
p.position.set(Math.sin(a) * 0.122, queen ? 0.07 : 0.06, Math.cos(a) * 0.122);
g.add(p);
}
var c = new THREE.Mesh(wfGeo("lkcrc", function () { return new THREE.SphereGeometry(0.11, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); }), wfMat(cap, { r: 0.8 }));
c.scale.y = queen ? 0.9 : 1.2;
c.position.y = 0.02;
g.add(c);
var orb = new THREE.Mesh(wfGeo("lkcro", function () { return new THREE.SphereGeometry(0.025, 8, 6); }), G);
orb.position.y = queen ? 0.13 : 0.16;
g.add(orb);
if (!queen) {
var x1 = new THREE.Mesh(wfGeo("lkcrx", function () { return new THREE.BoxGeometry(0.012, 0.06, 0.012); }), G);
x1.position.y = 0.2;
g.add(x1);
var x2 = new THREE.Mesh(wfGeo("lkcrx2", function () { return new THREE.BoxGeometry(0.04, 0.012, 0.012); }), G);
x2.position.y = 0.205;
g.add(x2);
}
add("Head", [0, 0.15, -0.01], g);
};
if (!DLN_HAT.lkcrownR)
DLN_HAT.lkcrownR = function (add) { crown(add, 0xA8202A, 0); };
if (!DLN_HAT.lkcrownW)
DLN_HAT.lkcrownW = function (add) { crown(add, 0xF0ECE2, 0); };
if (!DLN_HAT.lkqcrownR)
DLN_HAT.lkqcrownR = function (add) { crown(add, 0xA8202A, 1); };
if (!DLN_HAT.lkqcrownW)
DLN_HAT.lkqcrownW = function (add) {
crown(add, 0xF0ECE2, 1);
var hr = new THREE.Group();
for (var i = 0; i < 9; i++) {
var t = new THREE.Mesh(wfGeo("lkwqh", function () { return new THREE.SphereGeometry(0.06, 6, 5); }), wfMat(0x8A7A6A, { r: 1 }));
t.position.set(Math.cos(i * 0.7) * 0.13, 0.02 + (i % 3) * 0.03, Math.sin(i * 0.7) * 0.11 - 0.03);
t.scale.set(1.2, 0.7, 1);
hr.add(t);
}
var br = new THREE.Mesh(wfGeo("lkwqb", function () { return new THREE.BoxGeometry(0.03, 0.025, 0.16); }), wfMat(0x6A4A2A));
br.position.set(0.12, 0.06, -0.04);
br.rotation.set(0.3, 0.4, 0.6);
hr.add(br);
add("Head", [0, 0.08, -0.02], hr);
var sh = new THREE.Mesh(wfGeo("lkwqs", function () { var c = new THREE.ConeGeometry(0.3, 0.5, 12, 1, true); c.translate(0, -0.25, 0); return c; }), wfMat(0xE8DCC8, { r: 1 }));
sh.material.side = THREE.DoubleSide;
sh.rotation.z = 0.25;
add("spine_03", [0.03, 0.18, -0.02], sh);
};
if (!DLN_HAT.lknight)
DLN_HAT.lknight = function (add) {
crown(add, 0xA8202A, 0);
var t = new THREE.Mesh(wfGeo("lknc", function () { var c = new THREE.ConeGeometry(0.1, 0.32, 12); c.translate(0, 0.16, 0); return c; }), wfMat(0xA8202A, { r: 1 }));
t.rotation.z = 0.5;
add("Head", [0.03, 0.26, -0.02], t);
var tas = new THREE.Mesh(wfGeo("lknt", function () { return new THREE.SphereGeometry(0.03, 6, 5); }), wfMat(0xF4F0E8));
add("Head", [0.18, 0.48, -0.02], tas);
};
var plate = function (add, c) {
var m = wfMat(c, { m: 0.85, r: 0.35 }), b = new THREE.Mesh(wfGeo("lkbp", function () { var s = new THREE.SphereGeometry(0.17, 14, 10, 0, Math.PI * 2, 0.2, Math.PI * 0.55); s.scale(1.0, 1.15, 0.8); return s; }), m);
add("spine_03", [0, 0.02, 0.02], b);
var g = new THREE.Mesh(wfGeo("lkbg", function () { return new THREE.CylinderGeometry(0.17, 0.19, 0.18, 14, 1, true); }), m);
g.material.side = THREE.DoubleSide;
add("pelvis", [0, 0.0, 0], g);
};
if (!DLN_HAT.lkwhelm)
DLN_HAT.lkwhelm = function (add) {
var m = wfMat(0xD8DCE2, { m: 0.9, r: 0.3 }), g = new THREE.Group();
var h = new THREE.Mesh(wfGeo("lkwh", function () { var c = new THREE.CylinderGeometry(0.06, 0.15, 0.36, 16); c.translate(0, 0.12, 0); return c; }), m);
g.add(h);
var v = new THREE.Mesh(wfGeo("lkwv", function () { return new THREE.BoxGeometry(0.2, 0.025, 0.03); }), wfMat(0x1A1A1E));
v.position.set(0, 0.05, 0.14);
g.add(v);
var pl = new THREE.Mesh(wfGeo("lkwp", function () { var c = new THREE.ConeGeometry(0.05, 0.3, 8); c.translate(0, 0.15, 0); return c; }), wfMat(0xF4F0E8, { r: 1 }));
pl.position.set(0, 0.3, -0.02);
pl.rotation.x = -0.5;
g.add(pl);
add("Head", [0, 0.06, 0], g);
plate(add, 0xC8CCD4);
var sw = new THREE.Mesh(wfGeo("lkws", function () { var b = new THREE.BoxGeometry(0.03, 0.8, 0.01); b.translate(0, -0.4, 0); return b; }), wfMat(0xD8DCE2, { m: 0.9, r: 0.3 }));
add("pelvis", [0.18, 0, 0.02], sw);
};
if (!DLN_HAT.lkrhelm)
DLN_HAT.lkrhelm = function (add) {
var m = wfMat(0x9A9EA6, { m: 0.9, r: 0.35 }), g = new THREE.Group();
var h = new THREE.Mesh(wfGeo("lkrh", function () { var s = new THREE.SphereGeometry(0.15, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.62); s.scale(1, 1.2, 1.05); return s; }), m);
g.add(h);
var cr = new THREE.Mesh(wfGeo("lkrc", function () { return new THREE.BoxGeometry(0.03, 0.16, 0.14); }), wfMat(0xA8202A, { r: 0.6 }));
cr.position.set(0, 0.2, 0);
g.add(cr);
var hd = new THREE.Mesh(wfGeo("lkrd", function () { var c = new THREE.CylinderGeometry(0.03, 0.04, 0.12, 8); c.rotateX(1.0); return c; }), wfMat(0xA8202A, { r: 0.6 }));
hd.position.set(0, 0.3, 0.06);
g.add(hd);
add("Head", [0, 0.04, 0], g);
plate(add, 0x9AA0A8);
var cl = new THREE.Mesh(wfGeo("lkrcl", function () { var c = new THREE.CylinderGeometry(0.02, 0.03, 0.6, 6); c.translate(0, 0.3, 0); var k = new THREE.SphereGeometry(0.09, 10, 8); k.translate(0, 0.62, 0); return gwMerge([c, k]); }), wfMat(0x5A4A3A));
add("hand_r", [0, 0, 0.04], cl);
};
var tw = function (add, name) {
var cap = new THREE.Mesh(wfGeo("lktwc", function () { var s = new THREE.SphereGeometry(0.15, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); s.scale(1.05, 0.6, 1.05); return s; }), wfMat(0x3A4A6A, { r: 0.9 }));
add("Head", [0, 0.1, -0.01], cap);
var pk = new THREE.Mesh(wfGeo("lktwp", function () { var c = new THREE.CylinderGeometry(0.1, 0.1, 0.01, 14, 1, false, -Math.PI / 2, Math.PI); return c; }), wfMat(0x1A1A1E));
add("Head", [0, 0.1, 0.08], pk);
var t = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.05), new THREE.MeshLambertMaterial({ transparent: true, map: lkwCanvas("tw" + name, 256, 72, function (c, W, H) { c.clearRect(0, 0, W, H); c.fillStyle = "#2A3A8A"; c.font = "bold 54px Georgia"; c.textAlign = "center"; c.fillText(name, W / 2, H * 0.8); }) }));
add("neck_01", [0, 0.01, 0.1], t);
};
if (!DLN_HAT.lkdum)
DLN_HAT.lkdum = function (add) { tw(add, "DUM"); };
if (!DLN_HAT.lkdee)
DLN_HAT.lkdee = function (add) { tw(add, "DEE"); };
if (!DLN_HAT.lkguardcap)
DLN_HAT.lkguardcap = function (add) {
var c = new THREE.Mesh(wfGeo("lkgc", function () { return new THREE.CylinderGeometry(0.12, 0.12, 0.09, 16); }), wfMat(0x1A2A4A, { r: 0.8 }));
add("Head", [0, 0.15, 0], c);
var p = new THREE.Mesh(wfGeo("lkgp", function () { return new THREE.CylinderGeometry(0.11, 0.11, 0.01, 14, 1, false, -Math.PI / 2, Math.PI); }), wfMat(0x101010));
add("Head", [0, 0.11, 0.07], p);
var gl = new THREE.Group(), lm = wfMat(0x2A2A2A, { m: 0.6 });
[-0.025, 0.025].forEach(function (x) { var t = new THREE.Mesh(wfGeo("lkgo", function () { return new THREE.CylinderGeometry(0.018, 0.02, 0.07, 10); }), lm); t.rotation.x = Math.PI / 2; t.position.x = x; gl.add(t); });
add("hand_r", [0, 0.02, 0.05], gl);
};
if (!DLN_HAT.lkpaperhat)
DLN_HAT.lkpaperhat = function (add) { var c = new THREE.Mesh(wfGeo("lkph", function () { return new THREE.ConeGeometry(0.15, 0.18, 4); }), wfMat(0xFAFAF6, { r: 1 })); c.rotation.y = Math.PI / 4; add("Head", [0, 0.2, 0], c); };
if (!DLN_HAT.lkhatta)
DLN_HAT.lkhatta = function (add) {
var g = new THREE.Group(), mt = wfMat(0x3A3A2E, { r: 0.7 });
g.add(new THREE.Mesh(wfGeo("lkhtb", function () { return new THREE.CylinderGeometry(0.2, 0.2, 0.014, 24); }), mt));
var cr = new THREE.Mesh(wfGeo("lkhtc", function () { return new THREE.CylinderGeometry(0.15, 0.12, 0.3, 20); }), mt);
cr.position.y = 0.15;
g.add(cr);
var bd = new THREE.Mesh(wfGeo("lkhtd", function () { return new THREE.CylinderGeometry(0.123, 0.123, 0.05, 20); }), wfMat(0x7A2A2A));
bd.position.y = 0.035;
g.add(bd);
g.rotation.x = -0.1;
add("Head", [0, 0.15, -0.01], g);
};
if (!DLN_HAT.lkband)
DLN_HAT.lkband = function (add) { var b = new THREE.Mesh(wfGeo("lkab", function () { return new THREE.TorusGeometry(0.13, 0.012, 6, 24, Math.PI); }), wfMat(0x3A6AC8, { r: 0.6 })); b.rotation.set(0, Math.PI / 2, 0); add("Head", [0, 0.12, 0.01], b); };
if (!DLN_HAT.lksallet)
DLN_HAT.lksallet = function (add) { var h = new THREE.Mesh(wfGeo("lksl", function () { var s = new THREE.SphereGeometry(0.15, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6); s.scale(1, 1.1, 1.15); return s; }), wfMat(0xB8BCC4, { m: 0.85, r: 0.35 })); add("Head", [0, 0.05, -0.01], h); };
}
if (typeof DLN_HELDF !== "undefined") {
if (!DLN_HELDF.lkcup)
DLN_HELDF.lkcup = function (add) {
var g = new THREE.Group(), w = wfMat(0xF4F2EC, { r: 0.3 });
var c = new THREE.Mesh(wfGeo("lkcup", function () { return new THREE.CylinderGeometry(0.04, 0.03, 0.05, 12, 1, true); }), w);
c.material.side = THREE.DoubleSide;
g.add(c);
var s = new THREE.Mesh(wfGeo("lksau", function () { return new THREE.CylinderGeometry(0.06, 0.05, 0.008, 14); }), w);
s.position.y = -0.028;
g.add(s);
add("hand_r", [0, 0.02, 0.06], g);
};
if (!DLN_HELDF.lkmemo)
DLN_HELDF.lkmemo = function (add) { var b = new THREE.Mesh(wfGeo("lkmb", function () { return new THREE.BoxGeometry(0.1, 0.02, 0.14); }), wfMat(0x5A2A1A)); add("hand_l", [0, 0.02, 0.08], b); var p = new THREE.Mesh(wfGeo("lkmp", function () { return new THREE.CylinderGeometry(0.006, 0.006, 0.24, 6); }), wfMat(0xD8C060)); p.rotation.x = 1.2; add("hand_r", [0, 0.04, 0.1], p); };
if (!DLN_HELDF.lkspear)
DLN_HELDF.lkspear = function (add) { var g = new THREE.Group(); g.add(new THREE.Mesh(wfGeo("lksph", function () { return new THREE.CylinderGeometry(0.015, 0.018, 2.2, 6); }), wfMat(0x6A4A2A))); var t = new THREE.Mesh(wfGeo("lkspt", function () { return new THREE.ConeGeometry(0.035, 0.18, 6); }), wfMat(0xC8CCD4, { m: 0.9, r: 0.3 })); t.position.y = 1.18; g.add(t); add("hand_r", [0, 0.2, 0.02], g); };
if (!DLN_HELDF.lksaw)
DLN_HELDF.lksaw = function (add) { var b = new THREE.Mesh(wfGeo("lksw", function () { return new THREE.BoxGeometry(0.01, 0.12, 0.5); }), wfMat(0xB8BCC4, { m: 0.8, r: 0.35 })); add("hand_r", [0, 0, 0.25], b); };
if (!DLN_HELDF.lkbag)
DLN_HELDF.lkbag = function (add) { var b = new THREE.Mesh(wfGeo("lkbag", function () { return new THREE.BoxGeometry(0.16, 0.14, 0.06); }), wfMat(0x6A4A2A)); add("pelvis", [0.18, -0.05, 0.02], b); };
}
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { lkalice: ["lkband"], lkredqueen: ["lkqcrownR"], lkwhitequeen: ["lkqcrownW"], lkredking: ["lknight"], lkwhiteking: ["lkcrownW"], lkwknight: ["lkwhelm"], lkrknight: ["lkrhelm"], lktweedle: ["lkdum"], lktweedle2: ["lkdee"], lkguard: ["lkguardcap"], lkpaper: ["lkpaperhat"], lkhatta: ["lkhatta"], lkcarpenter: ["lkpaperhat"], lksoldier: ["lksallet"], lktown: [null, "bowler", "ladyhat", "flatcap"], lknurse: ["nursecap"] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { lkalice: [null], lkredqueen: [null], lkwhitequeen: [null], lkredking: [null], lkwhiteking: ["lkmemo"], lkwknight: [null], lkrknight: [null], lktweedle: [null], lktweedle2: [null], lkguard: [null], lkpaper: [null], lkhatta: ["lkcup"], lkcarpenter: ["lksaw"], lksoldier: ["lkspear"], lktown: [null], lknurse: [null] });
})();
function lkwDressed(seed, dress, o) { return __ZC(515, 28, this, arguments, new.target); }
var LKW_ERA2 = LKW_ERA;
var LKP = {
alice: "You are Alice, a little girl of seven and a half exactly, from Lewis Carroll's Through the Looking-Glass (1871): you have climbed through the looking-glass over the chimney-piece, and you are a White Pawn on a great chessboard of a country, going on to the Eighth Square to be a Queen. You are polite, curious, practical and a little proud of your lessons; you talk to yourself a great deal, and you think of your kittens at home." + LKW_ERA2,
nurse: "You are the nurse in Alice's house, from Lewis Carroll's Through the Looking-Glass (1871): kind, busy and rather tired of the kittens getting into the worsted. It is snowing and the boys are getting in sticks for the bonfire." + LKW_ERA2,
redqueen: "You are the Red Queen, from Lewis Carroll's Through the Looking-Glass (1871): stiff, brisk and governess-like; you correct everyone's manners ('Curtsey while you're thinking what to say. It saves time'), and you know that here it takes all the running you can do to keep in the same place." + LKW_ERA2,
whitequeen: "You are the White Queen, from Lewis Carroll's Through the Looking-Glass (1871): kind, muddled and untidy, with your shawl pinned all wrong and your hair in a tangle; you live backwards and remember things that happen the week after next; you once believed as many as six impossible things before breakfast; jam to-morrow and jam yesterday, but never jam to-day." + LKW_ERA2,
redking: "You are the Red King, from Lewis Carroll's Through the Looking-Glass (1871): you are fast asleep under a tree in a tall red night-cap, snoring, and dreaming (Tweedledee says) about Alice. If anyone speaks to you, mumble in your sleep." + LKW_ERA2,
whiteking: "You are the White King, from Lewis Carroll's Through the Looking-Glass (1871): mild, fussy and forgetful; you write in your memorandum-book (when you can hold the pencil); you have sent all your horses and all your men, and your Messengers Haigha and Hatta come and go; you admire anyone who can see Nobody on the road." + LKW_ERA2,
wknight: "You are the White Knight, from Lewis Carroll's Through the Looking-Glass (1871): gentle, kindly, mild-eyed and forever falling off your horse; you are a great inventor (the upside-down box, the beehive, the mouse-trap on the horse, the anklets against sharks, the pudding made of blotting-paper); you sing a song whose name is called 'Haddocks' Eyes'." + LKW_ERA2,
rknight: "You are the Red Knight, from Lewis Carroll's Through the Looking-Glass (1871): loud and martial; you have taken Alice prisoner, by the Rules of Battle, until the White Knight came to rescue her; you fight with a club, holding it in your arms like Punch and Judy." + LKW_ERA2,
tweedledum: "You are Tweedledum, from Lewis Carroll's Through the Looking-Glass (1871): a fat little man with DUM on your collar, the twin of Tweedledee; you say 'Contrariwise' and 'Nohow!'; you and your brother have agreed to have a battle because he spoiled your nice new rattle." + LKW_ERA2,
tweedledee: "You are Tweedledee, from Lewis Carroll's Through the Looking-Glass (1871): a fat little man with DEE on your collar, the twin of Tweedledum; you say 'Contrariwise' and you love reciting poems, the longest you know ('The Walrus and the Carpenter'); you are sure the Red King is dreaming about Alice." + LKW_ERA2,
humpty: "You are Humpty Dumpty, from Lewis Carroll's Through the Looking-Glass (1871): a large egg sitting cross-legged on a high, narrow wall, proud and touchy; words mean just what you choose them to mean; you explain 'Jabberwocky' (brillig, slithy, toves, borogoves, mome raths); your cravat was an un-birthday present from the White King and Queen; the King has promised to send all his horses and all his men if you fall." + LKW_ERA2,
sheep: "You are the Sheep who keeps the little dark shop, from Lewis Carroll's Through the Looking-Glass (1871): an old Sheep in spectacles, knitting with fourteen pairs of needles at once; you are a little short with customers; eggs are fivepence farthing for one and twopence for two (but you must eat both); you row a boat and shout 'Feather! Feather!'." + LKW_ERA2,
guard: "You are the Guard on the Looking-Glass railway, from Lewis Carroll's Through the Looking-Glass (1871): you look at passengers through a telescope, then a microscope, then an opera-glass, and say 'You're travelling the wrong way'; and everyone must show their tickets." + LKW_ERA2,
paper: "You are the gentleman dressed in white paper in the railway carriage, from Lewis Carroll's Through the Looking-Glass (1871): mild and polite; you whisper that Alice must make a joke on that, and you think she ought to be labelled 'Lass, with care'." + LKW_ERA2,
goat: "You are the Goat travelling in the railway carriage, from Lewis Carroll's Through the Looking-Glass (1871): you say gruffly that she ought to know her way to the ticket-office, even if she doesn't know her alphabet." + LKW_ERA2,
beetle: "You are the Beetle in the railway carriage, from Lewis Carroll's Through the Looking-Glass (1871): you think Alice will have to go back from here as luggage." + LKW_ERA2,
gnat: "You are the Gnat, from Lewis Carroll's Through the Looking-Glass (1871): about the size of a chicken, a little sad, fond of jokes (and of making them yourself); you tell of the Looking-Glass insects: the Rocking-horse-fly, the Snap-dragon-fly and the Bread-and-butter-fly. You sigh yourself away in the end." + LKW_ERA2,
fawn: "You are the Fawn in the wood where things have no names, from Lewis Carroll's Through the Looking-Glass (1871): gentle and soft-eyed; you can't remember who you are, here, and you walk along with Alice through the wood with her arm round your neck; outside it you remember you are a Fawn and she is a human child, and you bound away." + LKW_ERA2,
haigha: "You are Haigha, the White King's Anglo-Saxon Messenger (a March Hare), from Lewis Carroll's Through the Looking-Glass (1871): you skip and wriggle about with Anglo-Saxon attitudes; you whisper loudly into the King's ear; you carry hay in your bag to eat when you're faint." + LKW_ERA2,
hatta: "You are Hatta, the White King's other Messenger (a Hatter), from Lewis Carroll's Through the Looking-Glass (1871): just out of prison, you hadn't finished your tea when you were sent in; you hold a cup of tea in one hand and bread-and-butter in the other." + LKW_ERA2,
lion: "You are the Lion, from Lewis Carroll's Through the Looking-Glass (1871): tired and dusty from fighting the Unicorn for the crown all round the town; you speak in a deep hollow tone, like the tolling of a great bell; you want plum-cake." + LKW_ERA2,
unicorn: "You are the Unicorn, from Lewis Carroll's Through the Looking-Glass (1871): proud and careless, sauntering by with your hands in your pockets; you always thought children were fabulous monsters; you'll believe in Alice if she believes in you." + LKW_ERA2,
frog: "You are the old Frog at the door of Queen Alice's castle in the Eighth Square, from Lewis Carroll's Through the Looking-Glass (1871): deaf and hoarse and slow, in bright yellow and enormous boots; you want to know what it is that the door's been asking for." + LKW_ERA2,
flower: "You are one of the live flowers in the garden outside Looking-Glass House, from Lewis Carroll's Through the Looking-Glass (1871): you can talk, when there's anybody worth talking to; you are rather rude and very proud; the tree in the middle of the bed keeps you safe ('It could bark... It says Bough-wough!'); the Red Queen is the only other flower in the garden that can move about." + LKW_ERA2,
chessman: "You are one of the live chessmen in the hearth of Looking-Glass House, from Lewis Carroll's Through the Looking-Glass (1871): small, walking about among the cinders two and two; you cannot see Alice (she is invisible to you) and you are frightened of the volcano that blew the White Queen up the chimney." + LKW_ERA2,
soldier: "You are one of the White King's men, from Lewis Carroll's Through the Looking-Glass (1871): running through the wood in great haste, tripping over one another; the King has sent four thousand two hundred and seven of you (and not all, since two are wanted in the game)." + LKW_ERA2,
walrus: "You are the Walrus, from the poem 'The Walrus and the Carpenter' that Tweedledee recites in Lewis Carroll's Through the Looking-Glass (1871): 'The time has come to talk of many things: of shoes, and ships, and sealing-wax, of cabbages, and kings'." + LKW_ERA2,
carpenter: "You are the Carpenter, from the poem 'The Walrus and the Carpenter' that Tweedledee recites in Lewis Carroll's Through the Looking-Glass (1871): you think seven maids with seven mops wouldn't get the sand clear, and you say little but 'The butter's spread too thick!'" + LKW_ERA2,
kitten: "You are one of Alice's kittens, from Lewis Carroll's Through the Looking-Glass (1871): you can only purr, or mew, whatever anyone says to you." + LKW_ERA2,
creature: "You are one of the people or creatures of Looking-Glass Land, from Lewis Carroll's Through the Looking-Glass (1871): odd, polite in your own way, and quite sure that everything here should go backwards." + LKW_ERA2
};
function lkwPersona(k) { return LKP[k] || k || ""; }
var LKW_FOLK = {
alice: { name: "Alice", dress: "lkalice", sex: "f", hair: 0xE8C878, skin: 0xF6DCC8, persona: "alice", greet: "Oh, what fun it'll be, when they see me through the glass in here, and can't get at me!", child: true },
nurse: { name: "Alice's nurse", dress: "lknurse", sex: "f", hair: 0x6A5A4A, skin: 0xF0D4C0, persona: "nurse", greet: "Those kittens have had the worsted all over the hearth-rug again, Miss Alice." },
redqueen: { name: "The Red Queen", dress: "lkredqueen", sex: "f", hair: 0x3A2A1A, skin: 0xF0D8C8, persona: "redqueen", greet: "Where do you come from? And where are you going? Look up, speak nicely, and don't twiddle your fingers all the time.", scale: [1.06, 1.04, 1.06] },
whitequeen: { name: "The White Queen", dress: "lkwhitequeen", sex: "f", hair: 0x8A7A6A, skin: 0xF2DCCC, persona: "whitequeen", greet: "Bread-and-butter, bread-and-butter... I've been a-dressing myself for the last two hours.", scale: [1.06, 1.02, 1.06] },
redking: { name: "The Red King", dress: "lkredking", sex: "m", hair: 0xD8D2C8, beard: "full", skin: 0xF0D0C0, persona: "redking", greet: "Zzz... zzz...", scale: [1.08, 0.96, 1.08] },
whiteking: { name: "The White King", dress: "lkwhiteking", sex: "m", hair: 0xE8E4DC, beard: "full", skin: 0xF0D0C0, persona: "whiteking", greet: "I see nobody on the road. ... I only wish I had such eyes.", scale: [1.04, 0.96, 1.04] },
wknight: { name: "The White Knight", dress: "lkwknight", sex: "m", hair: 0xD8D0B8, beard: "mustache", skin: 0xF0D0BC, persona: "wknight", greet: "It's my own invention.", scale: [0.94, 1.04, 0.94] },
rknight: { name: "The Red Knight", dress: "lkrknight", sex: "m", hair: 0x3A2A1A, beard: "full", skin: 0xE8C4AC, persona: "rknight", greet: "Ahoy! Ahoy! Check! You're my prisoner!" },
dum: { name: "Tweedledum", dress: "lktweedle", sex: "m", hair: 0x8A6A3A, skin: 0xF4D8C4, persona: "tweedledum", greet: "If you think we're wax-works, you ought to pay, you know.", scale: [1.4, 0.84, 1.4] },
dee: { name: "Tweedledee", dress: "lktweedle2", sex: "m", hair: 0x8A6A3A, skin: 0xF4D8C4, persona: "tweedledee", greet: "Contrariwise, if it was so, it might be; and if it were so, it would be; but as it isn't, it ain't. That's logic.", scale: [1.4, 0.84, 1.4] },
guard: { name: "The Guard", dress: "lkguard", sex: "m", hair: 0x3A3A3A, beard: "mustache", skin: 0xE8C8B0, persona: "guard", greet: "Tickets, please! ... You're travelling the wrong way." },
paper: { name: "The gentleman dressed in white paper", dress: "lkpaper", sex: "m", hair: 0x6A5A4A, skin: 0xF0D4C0, persona: "paper", greet: "Never mind what they all say, my dear, but take a return-ticket every time the train stops." },
hatta: { name: "Hatta", dress: "lkhatta", sex: "m", hair: 0x8A6A3A, skin: 0xEAC8B0, persona: "hatta", greet: "I beg pardon, your Majesty, I hadn't quite finished my tea when I was sent for.", scale: [0.92, 0.98, 0.92] },
carpenter: { name: "The Carpenter", dress: "lkcarpenter", sex: "m", hair: 0x5A4A3A, beard: "full", skin: 0xE8C4A8, persona: "carpenter", greet: "The butter's spread too thick!" },
humpty: { name: "Humpty Dumpty", make: "humpty", persona: "humpty", greet: "When I use a word, it means just what I choose it to mean, neither more nor less." },
sheep: { name: "The Sheep", make: "ewe", persona: "sheep", greet: "What is it you want to buy?" },
goat: { name: "The Goat", make: "goat", persona: "goat", greet: "She ought to know her way to the ticket-office, even if she doesn't know her alphabet!" },
beetle: { name: "The Beetle", make: "beetle", persona: "beetle", greet: "She'll have to go back from here as luggage!" },
gnat: { name: "The Gnat", make: "gnat", persona: "gnat", greet: "What sort of insects do you rejoice in, where YOU come from?" },
fawn: { name: "The Fawn", make: "fawn", persona: "fawn", greet: "What do you call yourself? ... I'll tell you, if you'll come a little further on." },
haigha: { name: "Haigha", make: "hare", persona: "haigha", greet: "I'm just out of breath. You never saw such a cloud of dust!" },
lion: { name: "The Lion", make: "lion", persona: "lion", greet: "What's this! Are you animal, or vegetable, or mineral?" },
unicorn: { name: "The Unicorn", make: "unicorn", persona: "unicorn", greet: "I always thought children were fabulous monsters! Is it alive?" },
frog: { name: "The old Frog", make: "frog", persona: "frog", greet: "What is it, now? Wexes it?" },
kitty: { name: "Kitty, the black kitten", make: "kitty", persona: "kitten", greet: "Purr." },
snowdrop: { name: "Snowdrop, the white kitten", make: "snowdrop", persona: "kitten", greet: "Mew." },
dinah: { name: "Dinah", make: "dinah", persona: "kitten", greet: "Purr...", mute: false },
crow: { name: "The monstrous crow", make: "crow", persona: "creature", greet: "Caw!", mute: true },
wkhorse: { name: "The White Knight's horse", make: "wkhorse", persona: "creature", greet: "", mute: true },
rkhorse: { name: "The Red Knight's horse", make: "rkhorse", persona: "creature", greet: "", mute: true },
walrus: { name: "The Walrus", make: "walrus", persona: "walrus", greet: "The time has come to talk of many things." },
chess: { name: "A live chessman", chess: "pawn:w", persona: "chessman", greet: "Did you hear the volcano?" },
flower: { name: "A live flower", flower: "daisy", persona: "flower", greet: "We can talk, when there's anybody worth talking to." }
};
function lkwFolk(key, x, z, ry, o) { return __ZC(515, 29, this, arguments, new.target); }
function lkwCrowd(seed, list, x0, z0, x1, z1, o) { return __ZC(515, 30, this, arguments, new.target); }
function lkwOne(seed, name, sex, dress, x, z, ry, greet, o) { return __ZC(515, 31, this, arguments, new.target); }
function lkwVoiceG() { var g = new THREE.Group(); g.userData.voice = 1; return g; }
var LKW_RY = -80;
function lkwMat(k) { return __ZC(515, 32, this, arguments, new.target); }
function lkwThatchM() { return __ZC(515, 33, this, arguments, new.target); }
function lkwInRoom() { return camera.position.y < LKW_RY + 30; }
function lkwRoomAt(x, z) { for (var i = 0; i < LKW.rooms.length; i++) {
var R = LKW.rooms[i];
if (x > R.x0 - 0.3 && x < R.x1 + 0.3 && z > R.z0 - 0.3 && z < R.z1 + 0.3)
return R;
} return null; }
function lkwRoom(P, key, cx, cz, w, d, o) { return __ZC(515, 34, this, arguments, new.target); }
function lkwDoor(R, name, ox, oz, ory) { return __ZC(515, 35, this, arguments, new.target); }
function lkwInDoor(fromKey, toKey, lx, lz, name, verb) { return __ZC(515, 36, this, arguments, new.target); }
function lkwIn(sc, key, lx, lz) {
return function () {
var R = LKW.sc === sc ? LKW.rooms.filter(function (r) { return r.key === key; })[0] : null;
if (R)
return { sc: sc, x: R.cx + lx, z: R.cz + lz, y: R.y };
var A = LKW_ROOMXZ[sc] && LKW_ROOMXZ[sc][key];
return A ? { sc: sc, x: A[0] + lx, z: A[1] + lz, y: LKW_RY } : null;
};
}
var LKW_ROOMXZ = {};
function lkwTable(P, x, z, w, d, h, o) { return __ZC(515, 37, this, arguments, new.target); }
function lkwChair(P, x, z, ry, o) { return __ZC(515, 38, this, arguments, new.target); }
function lkwBed(P, x, z, ry, o) { return __ZC(515, 39, this, arguments, new.target); }
function lkwShelves(P, x, z, w, h, ry, o) { return __ZC(515, 40, this, arguments, new.target); }
function lkwHearth(P, x, z, ry, o) { return __ZC(515, 41, this, arguments, new.target); }
function lkwCandle(P, x, y, z, o) { return __ZC(515, 42, this, arguments, new.target); }
function lkwBench(P, x, z, ry, o) { return __ZC(515, 43, this, arguments, new.target); }
function lkwRug(P, x, z, w, d, col) { return __ZC(515, 44, this, arguments, new.target); }
function lkwPicture(P, x, y, z, ry, w, h, draw) { return __ZC(515, 45, this, arguments, new.target); }
function lkwWindowIn(P, x, y, z, ry, w, h, o) { return __ZC(515, 46, this, arguments, new.target); }
function lkwTownHouse(P, x, z, w, d, h, o) { return __ZC(515, 47, this, arguments, new.target); }
function lkwChurch(P, x, z, o) { return __ZC(515, 48, this, arguments, new.target); }
function lkwTownWall(P, x0, z0, x1, z1, h, gate) { return __ZC(515, 49, this, arguments, new.target); }
function lkwConifer(P, list, o) { return __ZC(515, 50, this, arguments, new.target); }
function lkwBirch(P, list) { return __ZC(515, 51, this, arguments, new.target); }
function lkwPeak(P, x, z, r, h, o) { return __ZC(515, 52, this, arguments, new.target); }
function lkwBoat(P, x, y, z, ry, o) { return __ZC(515, 53, this, arguments, new.target); }
var LKW_UP = new THREE.Vector3(0, 1, 0), LKW_V1 = new THREE.Vector3(), LKW_V2 = new THREE.Vector3();
function lkwStick(m, a, b) { LKW_V1.set(b.x - a.x, b.y - a.y, b.z - a.z); var L = LKW_V1.length() || 0.001; m.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); m.quaternion.setFromUnitVectors(LKW_UP, LKW_V1.multiplyScalar(1 / L)); m.scale.set(1, L, 1); return m; }
function lkwVilla(P, x, z, o) { return __ZC(515, 54, this, arguments, new.target); }
function lkwVillaDoor(x, z, o) { o = o || {}; var w = o.w || 9, d = o.d || 8, ry = o.ry || 0, lx = w * 0.25, lz = d / 2 + 1.6; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function lkwShops(P, x, z, n, o) { return __ZC(515, 55, this, arguments, new.target); }
function lkwShopDoor(x, z, n, i, o) { o = o || {}; var sw = o.sw || 6, d = o.d || 9, ry = o.ry || 0, lx = -((n - 1) * sw) / 2 + i * sw + sw / 2 - 0.9, lz = d / 2 + 1.2; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function lkwRailway(P, pts, hfn) { return __ZC(515, 56, this, arguments, new.target); }
function lkwStation(P, x, z, len, name, o) { return __ZC(515, 57, this, arguments, new.target); }
function lkwSignal(P, x, z, hfn) { var g = new THREE.Group(); g.position.set(x, hfn(x, z), z); P.add(g); lkwCyl(g, 0.1, 0.14, 7, lkwLam(0xE8E4D8), 0, 0, 0, 8); var arm = lkwBox(g, 1.4, 0.24, 0.06, lkwLam(0xB82A22), 0.7, 6, 0.1); arm.rotation.z = -0.5; return g; }
function lkwBridge(P, x, z, len, w, y, o) { return __ZC(515, 58, this, arguments, new.target); }
function lkwLamp(P, x, z, hfn, o) { return __ZC(515, 59, this, arguments, new.target); }
function lkwPoles(P, pts, hfn, gap) { return __ZC(515, 60, this, arguments, new.target); }
function lkwPaling(P, pts, hfn, o) { return __ZC(515, 61, this, arguments, new.target); }
function lkwScorch(P, x, z, r, hfn, fires) { return __ZC(515, 62, this, arguments, new.target); }
function lkwDeadTrees(P, list) { return __ZC(515, 63, this, arguments, new.target); }
function lkwCart(P, x, z, ry, o) { return __ZC(515, 64, this, arguments, new.target); }
function lkwFar(P, hfn, col, o) { return __ZC(515, 65, this, arguments, new.target); }
function lkwPathAt(pts, s) { return __ZC(515, 66, this, arguments, new.target); }
function lkwPathLen(pts) { var L = 0; for (var i = 1; i < pts.length; i++)
L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function lkwStream(P, pts, hfn, o) { return __ZC(515, 67, this, arguments, new.target); }
var LKF = {};
function lkfAll() { (LKW.rooms || []).forEach(function (R) { var f = LKF[R.key]; if (f && R.g && !R.g.userData.furn) {
R.g.userData.furn = 1;
try {
f(R.g, R, lkwLite());
}
catch (e) {
if (window.console)
console.warn("[tarzan] furnish " + R.key, e);
}
} }); }
function lkfLantern(P, x, y, z, o) { return __ZC(515, 68, this, arguments, new.target); }
function lkfBasket(P, x, z, s, col) { s = s || 1; var m = lkwCyl(P, 0.22 * s, 0.17 * s, 0.3 * s, lkwLam(col || 0xB8945A), x, 0, z, 10); lkwCyl(P, 0.225 * s, 0.225 * s, 0.03 * s, lkwLam(0x8A6A3A), x, 0.29 * s, z, 10); return m; }
function lkfGourd(P, x, y, z, s) { return __ZC(515, 69, this, arguments, new.target); }
function lkfMat(P, x, z, w, d, col, ry) { var m = lkwBox(P, w, 0.03, d, lkwLam(col || 0xC8B070), x, 0, z, ry || 0); for (var i = 0; i < 4; i++)
lkwBox(P, w * 0.98, 0.032, 0.03, lkwLam(0x8A6A3A), x, 0, z - d / 2 + d * (i + 0.5) / 4, ry || 0); return m; }
function lkfStool(P, x, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var lk = lkwMat(o.mat || "darkoak");
lkwCyl(g, 0.24, 0.2, 0.08, lk, 0, o.h || 0.36, 0, 10);
lkwCyl(g, 0.08, 0.14, o.h || 0.36, lk, 0, 0, 0, 8);
lkwCyl(g, 0.2, 0.22, 0.06, lk, 0, 0, 0, 10);
return g;
}
function lkfShield(P, x, y, z, ry, col) { return __ZC(515, 70, this, arguments, new.target); }
function lkfTusk(P, x, z, ry) { var m = new THREE.Mesh(lkwGeo("lkTusk", function () { var c = new THREE.TorusGeometry(0.9, 0.06, 6, 12, Math.PI * 0.45); return c; }), lkwLam(0xF0E6CC)); m.position.set(x, 0.06, z); m.rotation.set(-Math.PI / 2, 0, ry || 0); P.add(m); return m; }
function lkfHang(P, x, y, z, n, col, len) { for (var i = 0; i < n; i++) {
lkwCyl(P, 0.01, 0.01, 0.3, lkwLam(0x6A5A3A), x + i * 0.18, y, z, 4);
lkwBox(P, 0.08, len || 0.3, 0.05, lkwLam(col || 0x8A5A2A), x + i * 0.18, y - (len || 0.3), z);
} }
function lkfWood(P, x, z, ry, n) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
n = n || 9;
for (var i = 0; i < n; i++) {
var l = lkwCyl(g, 0.07, 0.07, 0.9, lkwMat("bark"), 0, 0, 0, 6);
l.rotation.z = Math.PI / 2;
l.position.set(0, 0.08 + Math.floor(i / 4) * 0.13, -0.24 + (i % 4) * 0.16 + (Math.floor(i / 4) % 2) * 0.08);
}
return g;
}
function lkfBucket(P, x, z) { lkwCyl(P, 0.17, 0.14, 0.32, lkwMat("oak"), x, 0, z, 10); lkwCyl(P, 0.172, 0.172, 0.03, lkwLam(0x2A2A2A), x, 0.06, z, 10); lkwCyl(P, 0.172, 0.172, 0.03, lkwLam(0x2A2A2A), x, 0.25, z, 10); }
function lkfPegs(P, x, y, z, ry, items) { return __ZC(515, 71, this, arguments, new.target); }
function lkfPlates(P, x, y, z, n, spread) { for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
lkwCyl(P, 0.13, 0.11, 0.02, lkwLam(0xF4F2EA), x + Math.cos(a) * spread[0], y, z + Math.sin(a) * spread[1], 12);
lkwCyl(P, 0.035, 0.03, 0.12, lkwShine(0xD8E4E8, 0.1, 0.1), x + Math.cos(a) * spread[0] * 0.7, y, z + Math.sin(a) * spread[1] * 0.7, 8);
} }
function lkfBottle(P, x, y, z, col) { lkwCyl(P, 0.05, 0.05, 0.2, lkwShine(col || 0x2A4A2A, 0.15, 0.1), x, y, z, 8); lkwCyl(P, 0.018, 0.03, 0.08, lkwShine(col || 0x2A4A2A, 0.15, 0.1), x, y + 0.2, z, 6); }
function lkfClock(P, x, y, z, ry) { return __ZC(515, 72, this, arguments, new.target); }
function lkfStove(P, x, z, ry) { return __ZC(515, 73, this, arguments, new.target); }
function lkfSofa(P, x, z, ry, col) { return __ZC(515, 74, this, arguments, new.target); }
function lkfLampTable(P, x, z, o) { return __ZC(515, 75, this, arguments, new.target); }
function lkfDresser(P, x, z, ry, o) { return __ZC(515, 76, this, arguments, new.target); }
function lkfPlant(P, x, z, s) { s = s || 1; lkwPot(P, x, 0, z, 0.32 * s); for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, l = lkwBox(P, 0.07 * s, 0.5 * s, 0.02, lkwLam(0x3A6A2A, { ds: 1 }), x + Math.cos(a) * 0.08 * s, 0.28 * s, z + Math.sin(a) * 0.08 * s, a);
l.rotation.z = 0.5;
} }
function lkfHammock(P, x, y, z, len, ry) { var m = new THREE.Mesh(lkwGeo("lkHamk" + len, function () { var c = new THREE.CylinderGeometry(0.4, 0.4, len, 10, 1, true, Math.PI * 0.7, Math.PI * 0.6); c.rotateZ(Math.PI / 2); return c; }), lkwLam(0xD8CCAA, { ds: 1 })); m.position.set(x, y, z); m.rotation.y = ry || 0; P.add(m); return m; }
function lkfCoil(P, x, z) { var m = new THREE.Mesh(lkwGeo("lkCoil", function () { return new THREE.TorusGeometry(0.28, 0.07, 6, 16); }), lkwLam(0xB8A070)); m.rotation.x = Math.PI / 2; m.position.set(x, 0.07, z); P.add(m); var m2 = m.clone(); m2.position.y = 0.18; m2.scale.setScalar(0.8); P.add(m2); }
function lkfChart(P, x, y, z, w, d) { lkwBox(P, w, 0.005, d, lkwLam(0xE8DCB8), x, y, z); lkwBox(P, w * 0.6, 0.006, 0.01, lkwLam(0x3A5A8A), x, y, z - d * 0.1); lkwBox(P, 0.01, 0.006, d * 0.5, lkwLam(0x3A5A8A), x + w * 0.1, y, z); }
function lkfDrums(P, x, z) { [[0, 0, 0.9], [0.55, 0.2, 0.6], [-0.4, 0.3, 0.5]].forEach(function (q) { var g = new THREE.Group(); g.position.set(x + q[0], 0, z + q[1]); P.add(g); lkwCyl(g, 0.2 * q[2] + 0.08, 0.15 * q[2] + 0.06, 0.8 * q[2], lkwMat("darkoak"), 0, 0, 0, 12); lkwCyl(g, 0.2 * q[2] + 0.085, 0.2 * q[2] + 0.085, 0.02, lkwLam(0xD8C8A0), 0, 0.8 * q[2], 0, 12); }); }
function lkfCurtain(P, x, y, z, ry, w, h, col) { var m = lkwBox(P, w, h, 0.03, lkwLam(col || 0x8A2A2A, { ds: 1 }), x, y, z, ry || 0); return m; }
function lkfTimetable(P, x, y, z, ry) { return __ZC(515, 77, this, arguments, new.target); }
function lkwPot(P, x, y, z, h) { var m = lkwCyl(P, h * 0.42, h * 0.3, h, lkwMat("pot"), x, y, z, 12); lkwCyl(P, h * 0.46, h * 0.46, h * 0.12, lkwMat("pot"), x, y + h * 0.88, z, 12); return m; }
function lkcE(c, r, col, bone, o) { var p = { t: "e", c: c, r: r, col: col, bone: bone || "chest" }; if (o)
for (var k in o)
p[k] = o[k]; return p; }
function lkcC(a, b, r0, r1, col, bone, o) { var p = { t: "c", a: a, b: b, r0: r0, r1: r1, col: col, bone: bone || "chest" }; if (o)
for (var k in o)
p[k] = o[k]; return p; }
function lkcAt(E, s) { return function (x, y, z) { return [E[0] + x * s, E[1] + y * s, E[2] + z * s]; }; }
function lkcSoft(p, hf, df) { return __ZC(515, 78, this, arguments, new.target); }
function lkcEye(eyes, at, r, iris, pupil, o) { var e = { bone: "head", at: at, r: r, iris: iris, pupil: pupil || "r", turn: 0.25 }; if (o)
for (var k in o)
e[k] = o[k]; eyes.push(e); }
function lkcRabbitHead(at, s, eyes, fur, inner, eyeCol, hare) { return __ZC(515, 79, this, arguments, new.target); }
function lkcMouseHead(at, s, eyes, fur, inner) { return __ZC(515, 80, this, arguments, new.target); }
function lkcBirdHead(at, s, eyes, col, beakCol, kind, eyeCol) { return __ZC(515, 81, this, arguments, new.target); }
function lkcFrogHead(at, s, eyes, skin) { return __ZC(515, 82, this, arguments, new.target); }
function lkcFishHead(at, s, eyes, skin) { return __ZC(515, 83, this, arguments, new.target); }
function lkcLizHead(at, s, eyes, skin) {
var o = [], B = "head";
o.push(lkcE(at(0, 0.05, 0.04), [0.06 * s, 0.05 * s, 0.08 * s], skin, B));
o.push(lkcC(at(0, 0.04, 0.08), at(0, 0.02, 0.18), 0.045 * s, 0.022 * s, skin, B, { k: 0.015 * s }));
lkcEye(eyes, at(0.045, 0.075, 0.08), 0.016 * s, 0xC8B040, "slit");
return o;
}
function lkcCalfHead(at, s, eyes, hide) { return __ZC(515, 84, this, arguments, new.target); }
function lkcSheepHead(at, s, eyes, wool, specs) { return __ZC(515, 85, this, arguments, new.target); }
function lkcGoatHead(at, s, eyes, hide) { return __ZC(515, 86, this, arguments, new.target); }
var LKW_CRX = {};
function lkwCrxKinds() { return __ZC(515, 87, this, arguments, new.target); }
function lkcHearts(I) { return __ZC(515, 88, this, arguments, new.target); }
function lkcTrumpet(I) { return __ZC(515, 89, this, arguments, new.target); }
function lkcStick(I, len) { var b = I.bones.R_hand || I.bones.L_hand; if (!b)
return; var s = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, len, 6), new THREE.MeshLambertMaterial({ color: 0x5A3A1E })); s.position.y = -len / 2 + 0.05; b.add(s); }
function lkwPartsGeo(plan) { return __ZC(515, 90, this, arguments, new.target); }
function lkwMergeC(list) { return __ZC(515, 91, this, arguments, new.target); }
function lkwStandInC(key) { return __ZC(515, 92, this, arguments, new.target); }
var LKW_SUITS = { spades: ["♠", "#141418"], clubs: ["♣", "#141418"], hearts: ["♥", "#C81A2A"], diamonds: ["♦", "#C81A2A"] };
function lkwCardFace(suit, n) { return __ZC(515, 93, this, arguments, new.target); }
function lkwCardBack() { return __ZC(515, 94, this, arguments, new.target); }
function lkwCardMan(kind, seed) { return __ZC(515, 95, this, arguments, new.target); }
function lkwCardTick(g, t, moving) { var C = g.userData.card; if (!C)
return; var s = moving ? Math.sin(t * 7 + C.ph) * 0.5 : Math.sin(t * 1.2 + C.ph) * 0.04; C.L[0].rotation.x = s; C.L[1].rotation.x = -s; C.A[0].rotation.x = -s * 0.6; C.A[1].rotation.x = s * 0.6; }
var LKW_CRX_WARM = ["lk_rabbit", "lk_alice"];
function lkwCreature(kind, seed) { return __ZC(515, 96, this, arguments, new.target); }
function lkxHaloTex() { return __ZC(515, 97, this, arguments, new.target); }
function lkxGlowStart() { return { pos: [], col: [], size: [] }; }
function lkxGlow(L, x, y, z, col, s) { if (!L)
return; L.pos.push(x, y, z); var c = new THREE.Color(col || 0xFFC070); L.col.push(c.r, c.g, c.b); L.size.push(s || 0.6); }
function lkxGlowDone(P, L, size) { return __ZC(515, 98, this, arguments, new.target); }
function lkxCandles(P, list, L, o) { return __ZC(515, 99, this, arguments, new.target); }
function lkxGilt() { return lkwShine(0xC89A3A, 0.32, 0.85); }
function lkxBrass() { return lkwShine(0xB8903A, 0.38, 0.8); }
function lkxSconce(P, x, y, z, ry, L, cl) { return __ZC(515, 100, this, arguments, new.target); }
function lkxChandelier(P, x, y, z, r, tiers, L, cl, ceil) { return __ZC(515, 101, this, arguments, new.target); }
function lkxDrapeGeo(w, h, folds, depth) { return __ZC(515, 102, this, arguments, new.target); }
function lkxDrape(P, x, y, z, w, h, ry, mat, o) { return __ZC(515, 103, this, arguments, new.target); }
function lkxSwag(P, x, y, z, w, drop, ry, mat) { return __ZC(515, 104, this, arguments, new.target); }
function lkxMirrorGlassM(tint) { return __ZC(515, 105, this, arguments, new.target); }
function lkxMirror(P, x, y, z, w, h, ry, o) { return __ZC(515, 106, this, arguments, new.target); }
function lkxPanelling(P, w, d, H, o) { return __ZC(515, 107, this, arguments, new.target); }
function lkxShaft(P, x, y, z, len, r0, r1, col, op, tx, ty, tz) { return __ZC(515, 108, this, arguments, new.target); }
function lkxPool(P, x, y, z, r, col, op) { return __ZC(515, 109, this, arguments, new.target); }
function lkxCafeTable(P, x, z, r, cloth, L, o) { return __ZC(515, 110, this, arguments, new.target); }
function lkxLamp(P, x, y, z, L, col) { return __ZC(515, 111, this, arguments, new.target); }
function lkxLeaves(P, cx, cy, cz, rx, ry, rz, n, seed, cols) { return __ZC(515, 112, this, arguments, new.target); }
function lkxTreeGeo(kind) { return __ZC(515, 113, this, arguments, new.target); }
function lkxCrownGeo(kind) { return __ZC(515, 114, this, arguments, new.target); }
function lkxLeafM(col) { return lkwM("lkxLeaf" + col, function () { var m = new THREE.MeshLambertMaterial({ color: col, map: lkwLeafTex(), alphaTest: 0.45, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }); }
function lkxTrees(P, kind, list, cols, o) { return __ZC(515, 115, this, arguments, new.target); }
function lkxStainedTex(kind) { return __ZC(515, 116, this, arguments, new.target); }
function lkxStainedM(kind, bright) { return lkwM("lkxSGM" + kind + (bright || 1), function () { var m = new THREE.MeshBasicMaterial({ map: lkxStainedTex(kind), transparent: true, alphaTest: 0.1, color: new THREE.Color(bright || 1, bright || 1, bright || 1) }); m.userData.noPhoto = 1; return m; }); }
function lkxLanternPost(P, x, y, z, L, h) { return __ZC(515, 117, this, arguments, new.target); }
function lkxWillowGeo() { return __ZC(515, 118, this, arguments, new.target); }
function lkxWillowFall() { return __ZC(515, 119, this, arguments, new.target); }
function lkxWillowTex() { return __ZC(515, 120, this, arguments, new.target); }
function lkxWillows(P, list) { return __ZC(515, 121, this, arguments, new.target); }
function lkxHedge(P, pts, hfn, o) { return __ZC(515, 122, this, arguments, new.target); }
function lkxMeadow(P, x0, z0, x1, z1, hfn, ok, seed, o) { return __ZC(515, 123, this, arguments, new.target); }
function lkxRoseTex(col, paint) { return __ZC(515, 124, this, arguments, new.target); }
function lkxRoseTree(P, x, z, y, o) { return __ZC(515, 125, this, arguments, new.target); }
function lkxShroom(P, x, z, y, s, o) { return __ZC(515, 126, this, arguments, new.target); }
function lkxFoxglove(P, x, z, y, s, col) { return __ZC(515, 127, this, arguments, new.target); }
function lkxThistle(P, x, z, y, s) { return __ZC(515, 128, this, arguments, new.target); }
function lkxBeastKinds() { return __ZC(515, 129, this, arguments, new.target); }
function lkxTeaThings(P, x0, x1, z, y, o) { return __ZC(515, 130, this, arguments, new.target); }
var LKL = {};
var LKL_CFG = { board: { h: 0.4, fl: 0.2 } };
function lklMottle(x, z, c) {
var a = lkwFbm(x * 0.06 + 3, z * 0.06, 2), b = lkwFbm(x * 0.018 + 9, z * 0.018, 3), k = 0.8 + a * 0.34;
var dry = lkwSmooth(0.56, 0.76, b), cl = lkwSmooth(0.6, 0.78, lkwFbm(x * 0.11 + 5, z * 0.11, 2));
c.r = (c.r * k + dry * 0.07) * (1 - cl * 0.2);
c.g = (c.g * k + dry * 0.025) * (1 - cl * 0.07);
c.b = c.b * k * (1 - dry * 0.3) * (1 - cl * 0.22);
}
(function () {
var t0 = lkwTerrain;
lkwTerrain = function (P, x0, z0, w, d, step, hfn, mat, cfn) {
var mead = false;
try {
mead = mat === lkwMat("meadow");
}
catch (e) { }
var c2 = mead && cfn ? function (x, z, y, c) { cfn(x, z, y, c); lklMottle(x, z, c); } : cfn, m = t0.call(this, P, x0, z0, w, d, step, hfn, mat, c2);
try {
(LKW.terr || (LKW.terr = [])).push({ x0: x0, z0: z0, w: w, d: d, nx: Math.max(2, Math.round(w / step)), nz: Math.max(2, Math.round(d / step)), col: m.geometry.attributes.color.array, mead: mead });
}
catch (e) { }
return m;
};
var s0 = lkwStrip;
lkwStrip = function (P, pts, w) {
var m = s0.apply(this, arguments);
try {
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
pts.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]); });
(LKW.strips || (LKW.strips = [])).push({ pts: pts.slice(), w: w, x0: x0 - w, x1: x1 + w, z0: z0 - w, z1: z1 + w });
}
catch (e) { }
return m;
};
var sc0 = lkwScene;
lkwScene = function (k) {
if (LKW.scBuilt === k && LKW.scG)
return sc0.apply(this, arguments);
LKW.terr = [];
LKW.strips = [];
LKW.noTurf = [];
var r = sc0.apply(this, arguments);
try {
lklCarpet(k);
}
catch (e) {
if (window.console)
console.warn("[looking-glass] carpet", e);
}
return r;
};
})();
function lklCol(x, z) { return __ZC(515, 131, this, arguments, new.target); }
function lklTurf(x, z, y) { return __ZC(515, 132, this, arguments, new.target); }
function lklCardTex(key, w, h, fill, fn) { return __ZC(515, 133, this, arguments, new.target); }
function lklTuftTex() { return __ZC(515, 134, this, arguments, new.target); }
function lklFlowerTex() { return __ZC(515, 135, this, arguments, new.target); }
function lklTuftGeo(h, flw, kind) { return __ZC(515, 136, this, arguments, new.target); }
function lklTwoSided(g) { return __ZC(515, 137, this, arguments, new.target); }
function lklCarpet(k) { return __ZC(515, 138, this, arguments, new.target); }
function lkxBracken(P, list) { return __ZC(515, 139, this, arguments, new.target); }
function lkxLogs(P, list) { return __ZC(515, 140, this, arguments, new.target); }
function lkxMossy(P, list) {
if (!list.length)
return;
lkwPlant(P, "rock", list, { mat: lkwLam(0x7A8A6A) });
lkwInst(P, lkwGeo("lkMossCap", function () { var s = new THREE.SphereGeometry(0.85, 9, 5, 0, 6.3, 0, 1.0); return s; }), lkwLam(0x4E7A2E), list.map(function (t) { return { x: t.x, z: t.z, y: t.y + 0.05, s: t.s, sy: (t.sy || t.s) * 0.9, ry: t.ry }; }), {});
}
function lkwCottage(P, x, z, y, ry, sc, o) { return __ZC(515, 141, this, arguments, new.target); }
function lkgClipM() { return __ZC(515, 142, this, arguments, new.target); }
function lkgHedge(G, a, b, h, w, H, solid) { return __ZC(515, 143, this, arguments, new.target); }
function lkgTopiary(G, x, z, y, kind, s) { return __ZC(515, 144, this, arguments, new.target); }
function lkgUrn(G, x, z, y) { return __ZC(515, 145, this, arguments, new.target); }
function lkgRoseArch(G, x, z, y, w) { return __ZC(515, 146, this, arguments, new.target); }
function lkgPennant(G, x, z, y) { return __ZC(515, 147, this, arguments, new.target); }
function lkgBloomTex(col) { return __ZC(515, 148, this, arguments, new.target); }
function lkgBloomGeo() { return __ZC(515, 149, this, arguments, new.target); }
var LKX_RED = 0xB01E24, LKX_WHITE = 0xF2EDE0;
function lkxPieceM(side) { return lkwM("lkxPc" + side, function () { return new THREE.MeshStandardMaterial({ color: side === "r" ? LKX_RED : LKX_WHITE, roughness: 0.32, metalness: 0.0 }); }); }
var LKX_TURN = { king: [[0.5, 0], [0.5, 0.08], [0.38, 0.14], [0.3, 0.2], [0.22, 0.5], [0.18, 0.8], [0.3, 0.86], [0.2, 0.9], [0.24, 1.0]], queen: [[0.5, 0], [0.5, 0.08], [0.38, 0.14], [0.3, 0.2], [0.2, 0.5], [0.16, 0.78], [0.3, 0.84], [0.18, 0.88], [0.22, 0.96]],
bishop: [[0.44, 0], [0.44, 0.07], [0.32, 0.13], [0.24, 0.2], [0.16, 0.48], [0.13, 0.66], [0.26, 0.7], [0.14, 0.74]], knight: [[0.44, 0], [0.44, 0.07], [0.34, 0.13], [0.28, 0.2], [0.24, 0.4]],
rook: [[0.44, 0], [0.44, 0.08], [0.34, 0.14], [0.3, 0.22], [0.26, 0.58], [0.34, 0.62], [0.36, 0.76]], pawn: [[0.38, 0], [0.38, 0.06], [0.28, 0.12], [0.2, 0.18], [0.12, 0.42], [0.24, 0.46], [0.12, 0.5]] };
function lkxTurnGeo(kind) { return lkwGeo("lkxTurn" + kind, function () { var pts = LKX_TURN[kind].map(function (q) { return new THREE.Vector2(q[0], q[1]); }); return new THREE.LatheGeometry(pts, 20); }); }
function lkxChessman(spec, o) { return __ZC(515, 150, this, arguments, new.target); }
function lkxLiveTick(g, t) {
var C = g.userData.chess;
if (C) {
var w = Math.sin(t * 2.2 + C.ph);
C.body.rotation.z = w * 0.06;
C.arms[0].rotation.x = w * 0.4;
C.arms[1].rotation.x = -w * 0.4;
return;
}
var F = g.userData.flower;
if (F) {
F.head.rotation.z = Math.sin(t * 0.9 + F.ph) * 0.08;
F.head.rotation.x = Math.sin(t * 0.7 + F.ph * 1.3) * 0.06;
}
}
function lkxPetalGeo(w, l, cup) { return __ZC(515, 151, this, arguments, new.target); }
function lkxLiveFlower(kind, o) { return __ZC(515, 152, this, arguments, new.target); }
function lkxRockingHorseFly() { return __ZC(515, 153, this, arguments, new.target); }
function lkxSnapDragonFly() { return __ZC(515, 154, this, arguments, new.target); }
function lkxBreadButterFly() { return __ZC(515, 155, this, arguments, new.target); }
function lkxFlyTick(g, t) { return __ZC(515, 156, this, arguments, new.target); }
function lkxLiveAll() { if (!LKW.scG)
return; var list = []; LKW.scG.traverse(function (o) { if (o.userData && (o.userData.chess || o.userData.flower || o.userData.fly))
list.push(o); }); return list; }
(function () { var s0 = lkwScene; lkwScene = function (k) { var r = s0.apply(this, arguments); try {
LKW.liveT = 0;
LKW.live6 = lkxLiveAll();
}
catch (e) { } return r; }; })();
var LKW_HO = { house: [0, 0], gate: [0, 26], fire: [-24, 40], lane: [[0, 26], [0, 44], [-40, 60], [-120, 70], [-200, 74]] };
LKW_ROOMXZ.home = { drawing: [-150, 150], nursery: [-150, 170] };
function lkwHomeH(x, z) { var n = lkwFbm(x * 0.01, z * 0.01, 3); return n * 1.2 + lkwSmooth(60, 200, Math.hypot(x, z)) * lkwFbm(x * 0.004 + 4, z * 0.004, 2) * 8; }
function lkwHome(G) { return __ZC(515, 157, this, arguments, new.target); }
function lkwWorsted(P, x, y, z, col) { return __ZC(515, 158, this, arguments, new.target); }
function lkwChessTable(P, x, z, ry, o) { return __ZC(515, 159, this, arguments, new.target); }
function lkwHomeRooms(G) { return __ZC(515, 160, this, arguments, new.target); }
function lkwThroughGlass(after) { var v = lkwVeil(); v.style.background = "#E8EEF6"; lkwGo(lkR("lghouse", 0, -1.6)(), "🪞 <b>The glass melts away like a bright silvery mist.</b> You jump lightly down into the Looking-glass room.", function () { v.style.background = "#0A0A08"; if (after)
after(); }); }
LKW_SCN.home = { start: { x: 3.5, z: 10, ry: 0 }, h: lkwHomeH, build: function (G) { lkwHomeRooms(G); lkfAll(); lkwHome(G); } };
LKW_AT.hearth = { sc: "home", x: -150, z: 149, y: LKW_RY, ry: Math.PI };
LKW_AT.homeout = { sc: "home", x: 3.5, z: 9, ry: 0 };
function lkxWingChair(P, x, z, ry, col) { return __ZC(515, 161, this, arguments, new.target); }
function lkxSettee(P, x, z, ry, col) { return __ZC(515, 162, this, arguments, new.target); }
function lkxPainting(kind, seed) { return __ZC(515, 163, this, arguments, new.target); }
function lkxFramed(P, x, y, z, ry, w, h, tex, o) { return __ZC(515, 164, this, arguments, new.target); }
function lkxMantelClock(P, x, y, z, o) { return __ZC(515, 165, this, arguments, new.target); }
function lkxPiano(P, x, z, ry) { return __ZC(515, 166, this, arguments, new.target); }
function lkxWhatNot(P, x, z, ry) { return __ZC(515, 167, this, arguments, new.target); }
function lkxGasolier(P, x, y, z, ceil, L) { return __ZC(515, 168, this, arguments, new.target); }
function lkwParlour(R, m, o) { return __ZC(515, 169, this, arguments, new.target); }
var LKW_BO = { house: [0, 672], door: [0, 664], bed: [-30, 620], hill: [0, 548], gate: [0, 598], file: -55, x0: -440, z0: 480, sq: 110,
brooks: [370, 260, 150, 40, -70, -180, -290], river: -22, end: -400 };
var LKW_BOARD_ROOMS = [];
LKW_ROOMXZ.board = { lghouse: [600, 600], lghall: [620, 600], carriage: [600, 640], shop: [640, 640], castle: [600, 690] };
function lkwRank(z) { return Math.floor((LKW_BO.z0 - z) / LKW_BO.sq) + 1; }
function lkwFileOf(x) { return Math.floor((x - LKW_BO.x0) / LKW_BO.sq) + 1; }
function lkwOnBoard(x, z) { return x > LKW_BO.x0 && x < -LKW_BO.x0 && z < LKW_BO.z0 && z > LKW_BO.end; }
function lkwBoardH(x, z) { return __ZC(515, 170, this, arguments, new.target); }
function lkwBrookAt(z) { var B = LKW_BO; for (var i = 0; i < B.brooks.length; i++)
if (Math.abs(z - B.brooks[i]) < 4.5)
return B.brooks[i]; return null; }
var LKW_BO_WAY = [[0, 598], [0, 566], [-6, 548], [-30, 520], [-55, 490], [-55, -372]];
var LKW_BO_GARDEN = [[0, 664], [6, 654], [14, 650], [18, 640], [12, 630], [2, 626], [-8, 632], [-10, 644], [-4, 652], [4, 648], [8, 640], [4, 634], [-2, 636], [0, 642], [0, 612], [0, 598]];
function lkwBoard(G) { return __ZC(515, 171, this, arguments, new.target); }
function lkwBoardGarden(G, H) { return __ZC(515, 172, this, arguments, new.target); }
function lkwBoardHill(G, H) { return __ZC(515, 173, this, arguments, new.target); }
function lkwBoardHouseRooms(G) { return __ZC(515, 174, this, arguments, new.target); }
LKW_SCN.board = { start: { x: 0, z: 650, ry: 0 }, h: lkwBoardH, build: function (G) {
lkwBoardHouseRooms(G);
LKW_BOARD_ROOMS.forEach(function (f) { try {
f(G);
}
catch (e) {
if (window.console)
console.warn("[looking-glass] rooms", e);
} });
lkfAll();
lkwBoard(G);
if (typeof lkwSquares === "function")
lkwSquares(G);
} };
LKW_AT.lghouse = { sc: "board", x: 0, z: 650, ry: 0 };
LKW_AT.flowers = { sc: "board", x: -30, z: 630 };
LKW_AT.hill = { sc: "board", x: 0, z: 548 };
var LKW_SQ = { redtree: [-55, 330], station: [-40, 302], train: [[-40, 330], [-40, 262], [-40, 156]], elephants: [60, 210], gnat: [-55, 140], noname: [[-55, 128], [-55, 92]], fawn: [-55, 88], posts: [-55, 82],
tweedles: [-55, 72], redking: [-24, 66], shore: [330, 96], wqueen: [-55, 50] };
function lkwSquares(G) { return __ZC(515, 175, this, arguments, new.target); }
function lkwLiveOn(f) { (LKW.liveFns || (LKW.liveFns = [])).push(f); }
function lkwSqCountry(G, H) { return __ZC(515, 176, this, arguments, new.target); }
function lkwCornTex() { return __ZC(515, 177, this, arguments, new.target); }
function lkwSq2(G, H) { return __ZC(515, 178, this, arguments, new.target); }
function lkwSq3(G, H) { return __ZC(515, 179, this, arguments, new.target); }
function lkwCrxPlain(plan, seed) { return __ZC(515, 180, this, arguments, new.target); }
function lkwTrainLG(G, x, z, H) { return __ZC(515, 181, this, arguments, new.target); }
function lkwSq4(G, H) { return __ZC(515, 182, this, arguments, new.target); }
function lkwBoardRoomsA(G) { return __ZC(515, 183, this, arguments, new.target); }
LKW_BOARD_ROOMS.push(lkwBoardRoomsA);
var LKW_SQ2 = { shop: [-55, 14], boat: [-55, -22], jetty: [-48, -12], wall: [-55, -100], kingwood: [[-55, -118], [-55, -150]], whiteking: [-55, -158], town: [-55, -216], kwood: [-55, -250], lastbrook: [-55, -283],
crown: [-55, -306], queens: [-55, -322], castle: [-55, -372], arch: [-55, -354] };
function lkwSq5(G, H) { return __ZC(515, 184, this, arguments, new.target); }
function lkwSq6(G, H) { return __ZC(515, 185, this, arguments, new.target); }
function lkwSq7(G, H) { return __ZC(515, 186, this, arguments, new.target); }
function lkwSq8(G, H) { return __ZC(515, 187, this, arguments, new.target); }
function lkwBoardRoomsB(G) { return __ZC(515, 188, this, arguments, new.target); }
LKW_BOARD_ROOMS.push(lkwBoardRoomsB);
LKW_AT.shop = { sc: "board", x: -55, z: 20 };
LKW_AT.river = { sc: "board", x: -55, z: -12 };
LKW_AT.wall = { sc: "board", x: -55, z: -95 };
LKW_AT.kingwood = { sc: "board", x: -55, z: -140 };
LKW_AT.town = { sc: "board", x: -55, z: -216 };
LKW_AT.lastbrook = { sc: "board", x: -55, z: -280 };
LKW_AT.crown = { sc: "board", x: -55, z: -306 };
LKW_AT.arch = { sc: "board", x: -55, z: -350 };
LKW_AT.pegs = { sc: "board", x: -55, z: 330 };
LKW_AT.train = { sc: "board", x: -37, z: 302 };
LKW_AT.gnat = { sc: "board", x: -55, z: 140 };
LKW_AT.noname = { sc: "board", x: -55, z: 110 };
LKW_AT.posts = { sc: "board", x: -55, z: 82 };
LKW_AT.tweedles = { sc: "board", x: -55, z: 72 };
LKW_AT.redking = { sc: "board", x: -24, z: 66 };
LKW_AT.shore = { sc: "board", x: 330, z: 96 };
function lkwEnvNow() { return __ZC(515, 189, this, arguments, new.target); }
function lkwBlockL(x, z, feet) { return __ZC(515, 190, this, arguments, new.target); }
function lkwPlaceName(L) { return __ZC(515, 191, this, arguments, new.target); }
var LKW_ATN = { hearth: "Alice's drawing-room", glass: "The looking-glass over the chimney-piece", lghouse: "Looking-Glass House", flowers: "The garden of live flowers", hill: "The hill", pegs: "The end of the Second Square", train: "The railway", gnat: "The Gnat's tree", noname: "The wood where things have no names", posts: "The two finger-posts", tweedles: "Tweedledum and Tweedledee", redking: "The Red King asleep", shop: "The Sheep's shop", river: "The river in the rushes", wall: "Humpty Dumpty's wall", kingwood: "The White King's wood", town: "The town of the Lion and the Unicorn", lastbrook: "The last brook", crown: "The Eighth Square", arch: "The arched doorway: QUEEN ALICE" };
function lkwTick(dt) { return __ZC(515, 192, this, arguments, new.target); }
function lkwBuild(G) { LKW.G = G; LKW.lite = lkwLite(); LKW.built = true; }
if (typeof worldDef === "function")
worldDef(LKW_KEY, {
base: LKW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return lkwEnvNow(); },
build: function (G) { lkwBuild(G); },
enter: function (opt) { return __ZC(515, 193, this, arguments, new.target); },
leave: function () { try {
lkwNear(true);
}
catch (e) { } LKW.ride = null; LKW.moving = false; if (LKW.veil)
LKW.veil.style.opacity = "0"; if (typeof lkbLeave === "function")
try {
lkbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = lkwSc(), o = lkwEyeOff(); LKW.inRm = lkwInRoom(); return lkwGround(x - S.x, z, feet == null ? feet : feet - o) + o; },
block: function (x, z, feet) { var S = lkwSc(); LKW.inRm = lkwInRoom(); return lkwBlockL(x - S.x, z, feet == null ? feet : feet - lkwEyeOff()); },
tick: function (dt) { lkwTick(dt); },
back: function () { var D = LKW_SCN[LKW.sc]; lkwGo(D && D.start ? { sc: LKW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "hearth"); }
});
function lkwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(LKW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(LKW_KEY) < 0)
WLG.keys.push(LKW_KEY);
if (typeof GLF !== "undefined" && GLF.skip)
GLF.skip[LKW_KEY] = 1;
function lkwForget() { return __ZC(515, 194, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === LKW_KEY)
lkwForget(); return r; }; })();
function lkwSnowfall(P, n, sp) { return __ZC(515, 195, this, arguments, new.target); }
(function () {
var t0 = lkwTick;
lkwTick = function (dt) {
t0.apply(this, arguments);
if (!LKW.scG)
return;
LKW.liveT = (LKW.liveT || 0) + dt;
if (LKW.liveT > 2) {
LKW.liveT = 0;
LKW.live6 = lkxLiveAll();
}
var t = LKW.t;
(LKW.live6 || []).forEach(function (g) { lkxLiveTick(g, t); lkxFlyTick(g, t); });
};
})();
(function () {
var e0 = lkwEnvNow;
lkwEnvNow = function () {
var E = e0.apply(this, arguments);
try {
if (LKW.sc === "board" && (!LKW.envK || LKW.envK === "board") && !LKW.night && !lkwInRoom()) {
var L = lkwLocalSc(), k = null;
if (L.x > -110 && L.x < 0) {
if (L.z < 130 && L.z > 90)
k = "noname";
else if ((L.z < 62 && L.z > 44) || (L.z < -116 && L.z > -152) || (L.z < -232 && L.z > -282))
k = "wood";
else if (L.z < -290 && L.z > -420)
k = "eighth";
}
if (k) {
var B = LKW_ENV[k];
for (var q in B)
E[q] = B[q];
if (lkwLite() && E.fogD)
E.fogD *= 1.35;
}
}
}
catch (e) { }
return E;
};
})();
var LKB_CH = [];
var LKB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var LKB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function lkbS() { if (!store.lkbook)
store.lkbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.lkbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function lkbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function lkbStep() { var S = lkbS(), C = LKB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function lkbActive() { var S = lkbS(); return !!(S.started && !S.done && WLD.on === LKW_KEY); }
function lkbKey() { var S = lkbS(); return S.done ? "done" : S.ch + "." + S.s; }
function lkbSay(h) { setStatus(h); }
function lkbQ(s) { return lkQ(s); }
function lkbQs() { return lkQs.apply(null, arguments); }
function lkbPos(at) { return __ZC(515, 196, this, arguments, new.target); }
function lkbScName(k) { return (LKW_SC[k] || {}).name || k; }
function lkbWay(P, L) { return __ZC(515, 197, this, arguments, new.target); }
function lkbBeam() { return __ZC(515, 198, this, arguments, new.target); }
function lkbItemMesh(kind) { return __ZC(515, 199, this, arguments, new.target); }
function lkbItemsClear() { LKB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = LKW.spots.indexOf(I.S); if (j >= 0)
LKW.spots.splice(j, 1); }); LKB.items = []; }
function lkbItemAdd(kind, P, name, verb, onTake) { return __ZC(515, 200, this, arguments, new.target); }
var LKB_TUNES = { home: "assets/no14/nursery-piano.mp3", glass: "assets/kensington/peters-lullaby.mp3", flowers: "assets/kensington/the-gardens.mp3", run: "assets/erebos/galop.mp3", train: "assets/oz/friskers-galop.mp3", wood: "assets/oz/mist-valley.mp3", tweedle: "assets/oz/bunnybury-band-march.mp3", shop: "assets/oz/ku-klip-workshop.mp3", river: "assets/grimm/danube.mp3", humpty: "assets/grimm/nachtmusik.mp3", kings: "assets/oz/hall-of-state.mp3", knight: "assets/oz/deserted-isle.mp3", queen: "assets/oz/glindas-court.mp3", feast: "assets/neverland/mountain-king.mp3", end: "assets/kensington/fairy-ball.mp3", dream: "assets/erebos/gymnopedie.mp3" };
function lkbTune(k) { return __ZC(515, 201, this, arguments, new.target); }
function lkbText(fn) { return __ZC(515, 202, this, arguments, new.target); }
function lkbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function lkbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var LKB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>Lewis Carroll's own words (1871).</div>";
function lkbReadAll(i) { return __ZC(515, 203, this, arguments, new.target); }
function lkbChapterCard() { return __ZC(515, 204, this, arguments, new.target); }
function lkbKeeperBtns(fns) { return __ZC(515, 205, this, arguments, new.target); }
function lkbJump(i) { var S = lkbS(); S.ch = Math.max(0, Math.min(LKB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; lkbSave(); lkbChapterBegin(true); }
function lkbStV(v) { return typeof v === "function" ? v(lkbS().s) : v; }
function lkbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function lkbWorldState() {
var S = lkbS(), C = LKB_CH[S.ch] || {}, st = C.state || {};
LKW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
LKW.envK = lkbStV(st.env) || null;
if (typeof lkwStateApply === "function")
try {
lkwStateApply(st, S.s);
}
catch (e) { }
worldEnv(lkwEnvNow());
}
function lkbChapterBegin(place) { return __ZC(515, 206, this, arguments, new.target); }
function lkbStepBegin() { return __ZC(515, 207, this, arguments, new.target); }
function lkbPuzzleCard(b) { return __ZC(515, 208, this, arguments, new.target); }
function lkbStepDone() { return __ZC(515, 209, this, arguments, new.target); }
function lkbFinish() { return __ZC(515, 210, this, arguments, new.target); }
function lkbCastName(c) { return c.name || (LKW_FOLK[c.k] || {}).name || c.k; }
function lkbCastLive(C) { return !!(C && C.g && C.g.parent); }
function lkbCastAdd(c) { return __ZC(515, 211, this, arguments, new.target); }
function lkbCastHide(key) { var C = LKB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); LKW.talk = LKW.talk.filter(function (T) { return T.p !== C.P; }); LKW.people = LKW.people.filter(function (p) { return p !== C.P; }); delete LKB.cast[key]; }
function lkbCastClear() { for (var k in LKB.cast)
lkbCastHide(k); LKB.cast = {}; }
function lkbCastMove(key, at, ry) { var C = LKB.cast[key]; if (!C)
return; var P = lkbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : lkwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function lkbCastTick() { return __ZC(515, 212, this, arguments, new.target); }
function lkbPassTick() { return __ZC(515, 213, this, arguments, new.target); }
var LKB_FOLK_AT = {};
function lkbPopulate() { return __ZC(515, 214, this, arguments, new.target); }
function lkbCastHere(C) { return (C.cast || []).some(function (c) { var P = lkbPos(c.at); return P && P.sc === LKW.sc; }); }
function lkbChapterSc(C) { var P = C && C.start ? lkbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function lkbSceneDrop() { LKB.beam = null; LKB.items = []; LKB.cast = {}; }
function lkbHeard(kind) { LKB.rew[kind] = (LKB.rew[kind] || 0) + 1; }
function lkbNote(kind, title) { lkbHeard(kind); if (title)
lkbHeard("tale:" + title); }
function lkbTalk(T) { return __ZC(515, 215, this, arguments, new.target); }
function lkbSpot(S) { if (!lkbActive() || S.lkb)
return; var b = lkbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = lkbKey(); setTimeout(function () { if (lkbKey() === k)
lkbStepDone(); }, b.wait || 400); }
function lkbIdlePrompt() { worldPrompt("♟️ <b>Through the Looking-Glass</b> · <b>press E</b> for the book", lkbOpen); }
function lkbTick(dt, L) { return __ZC(515, 216, this, arguments, new.target); }
function lkbOpen() { return __ZC(515, 217, this, arguments, new.target); }
function lkbBegin() { var S = lkbS(); S.started = 1; lkbSave(); if (WLD.on !== LKW_KEY) {
lkwEnter({});
return;
} lkbChapterBegin(true); }
function lkbStartAt() { var S = lkbS(); if (S.started && !S.done) {
var C = LKB_CH[S.ch], P = C && C.start ? lkbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function lkbEnter(opt) { var S = lkbS(); try {
lkbText(function () { });
}
catch (e) { } setTimeout(function () { if (WLD.on !== LKW_KEY)
return; if (S.started && !S.done)
lkbChapterBegin(false);
else {
lkbWorldState();
lkbPopulate();
if (!S.started)
lkbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function lkbLeave() { lkbTune(null); lkbItemsClear(); LKB.cast = {}; LKB.beam = null; LKW.bannerBook = false; }
function lkzGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function lkzTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function lkzSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function lkzRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function lkzFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function lkzGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function lkzHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function lkzUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function lkzPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function lkzRead(title, html, btn, o) { return lkzPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function lkzReadA(title, adult, young, btn, o) { var r = lkzRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = lkbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function lkzMove(at, msg) { return function () { lkwGo(at, msg || null, lkbPopulate); }; }
function lkbNum(i) { return "Chapter " + (i + 1); }
function lkbExpand(h) { return __ZC(515, 218, this, arguments, new.target); }
function lkzN(title, n, btn, o) { var r = lkzRead(title, "", btn, o); r.pn = n; return r; }
function lkzNA(title, n, young, btn, o) { var r = lkzN(title, n, btn, o), on0 = r.on; r.on = function (f) { r.html = lkbAdult() ? r.tok : young; if (on0)
on0(f); }; r.ya = 1; return r; }
function lkzTN(who, h, title, n, o) { var r = lkzTalk(who, h, [title, "", "▶ Go on"], o); r.pn = n; return r; }
function lkbVoices(name, html, k) { return __ZC(515, 219, this, arguments, new.target); }
function lkbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function lkbCh(C) { return __ZC(515, 220, this, arguments, new.target); }
function lkbStepAt(id) { var C = LKB_CH[lkbS().ch]; return C ? lkbS().s >= lkbIdx(C, id) : false; }
function lkzId(id, step) { step.id = id; return step; }
var LKW_LIVEK = ["voice", "size", "trainGone", "fallen", "soldiers", "fight", "chaos"];
function lkwStateApply(st, s) { return __ZC(515, 221, this, arguments, new.target); }
function lkwRebuild() { var k = LKW.scBuilt; if (!k)
return; var L = lkwLocalSc(), y = camera.position.y; LKW.scBuilt = null; lkwScene(k); var S = lkwSc(); camera.position.set(LKW.base + S.x + L.x, y, L.z); }
function lkwLiveState() { var want = LKW.st.size != null ? LKW.st.size : 1; if (Math.abs((LKW.sizeTo || 1) - want) > 0.001)
try {
lkwSizeSet(want);
}
catch (e) { } if (LKW.live)
try {
LKW.live(LKW.st);
}
catch (e) { } }
(function () { var s0 = lkwScene; lkwScene = function (k) { var was = LKW.scBuilt; s0.apply(this, arguments); if (was !== LKW.scBuilt && typeof lkbWorldState === "function" && !LKW.rebuilding)
try {
lkbWorldState();
}
catch (e) { } }; })();
function lkc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
var LK_ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
function lkBk(ch) { return "Chapter " + LK_ROMAN[ch]; }
function lkHo(x, z, y) { return { sc: "home", x: x, z: z, y: y }; }
function lkBo(x, z, y) { return { sc: "board", x: x, z: z, y: y }; }
function lkA(n, dx, dz) { var A = LKW_AT[n]; return { sc: A.sc, x: A.x + (dx || 0), z: A.z + (dz || 0), y: A.y }; }
function lkR(k, lx, lz) { var sc = null; for (var s in LKW_ROOMXZ) {
if (LKW_ROOMXZ[s][k]) {
sc = s;
break;
}
} return lkwIn(sc || "board", k, lx, lz); }
function lkzTravel(title, html, at, msg, btn, o) { return lkzRead(title, html, btn || "▶ Go", Object.assign({ done: function () { var A = typeof at === "function" ? at() : at; if (A && typeof at === "function" && A.ry == null)
A.ry = Math.PI; lkwGo(A, msg || null, function () { lkbPopulate(); lkbStepBegin(); }); } }, o || {})); }
function lkzSay(who, h, title, lines, src, o) { return lkzTalk(who, h, [title, lkbQs.apply(null, lines) + lkSrc(src), "▶ Go on"], o); }
function lkwCalm(st, keys) { st = st || {}; for (var i = 0; i < keys.length; i++)
if (st[keys[i]])
return false; return true; }
function lkRy(k, lx, lz, dy) { var f = lkR(k, lx, lz); return function () { var p = f(); if (p)
p.y = (p.y || 0) + dy; return p; }; }
function lkzOn(a, b, val) { return function () { var on = (a == null || lkbStepAt(a)) && (b == null || !lkbStepAt(b)); return on ? (val === undefined ? true : val) : (val === undefined ? false : null); }; }
function lkzSz(first, list) { return function () { var v = first; list.forEach(function (q) { if (lkbStepAt(q[0]))
v = q[1]; }); return v; }; }
lkbCh({ t: "Looking-Glass House", txt: 0, p0: 1, start: { sc: "home", x: -150.4, z: 152.6, y: LKW_RY, ry: 0.12 }, jump: 1, tune: "home", keep: ["pawn", "A little White Pawn", "♙"],
words: "The fourth of November, 1871, late in the afternoon, and snowing. Alice is curled up in the great arm-chair in the drawing-room, half talking to herself and half asleep, with the black kitten in her lap; and you are the dreamer by the fire, listening.",
intro: "Alice's drawing-room",
state: { env: "snow" },
cast: [
lkc("alice", lkR("drawing", -1.3, -1.5), { ry: 2.6, until: "through" }),
lkc("kitty", lkR("drawing", 0.4, -1.8), { ry: 0.4, s: 0.9, until: "through" }),
lkc("dinah", lkR("drawing", -0.6, -2.5), { ry: 1.2, until: "through" }),
lkc("snowdrop", lkR("drawing", -0.4, -2.35), { ry: -1.4, s: 0.9, until: "through" }),
lkc("alice", lkR("lghouse", 0.6, -1.6), { key: "al2", ry: Math.PI, from: "through", until: "book" }),
lkc("alice", lkR("lghouse", 2.2, 0.1), { key: "al3", ry: 0.6, from: "book", until: "stairs" }),
lkc("chess", lkR("lghouse", -0.6, -2.3), { key: "rk", chess: "king:r", s: 0.15, name: "The Red King", greet: "Hush. The volcano.", from: "through", until: "stairs" }),
lkc("chess", lkR("lghouse", -0.35, -2.25), { key: "rq", chess: "queen:r", s: 0.15, name: "The Red Queen", greet: "Two and two, and keep to your squares.", from: "through", until: "stairs" }),
lkc("chess", lkR("lghouse", 0.2, -2.5), { key: "rr1", chess: "rook:r", s: 0.13, name: "A Red Castle", greet: "Arm in arm, if you please.", from: "through", until: "stairs" }),
lkc("chess", lkR("lghouse", 0.32, -2.52), { key: "rr2", chess: "rook:w", s: 0.13, name: "A White Castle", greet: "We walk arm in arm, two and two.", from: "through", until: "stairs" }),
lkc("chess", lkR("lghouse", 0.7, -2.3), { key: "wk", chess: "king:w", s: 0.15, name: "The White King", greet: "I turned cold to the very ends of my whiskers!", from: "through", until: "liftk" }),
lkc("chess", lkRy("lghouse", 2.45, 0.75, 0.5), { key: "wk2", chess: "king:w", s: 0.15, name: "The White King", greet: "I MUST get a thinner pencil.", from: "liftk", until: "stairs" }),
lkc("chess", lkR("lghouse", 0.95, -2.35), { key: "wq", chess: "queen:w", s: 0.15, name: "The White Queen", greet: "My precious Lily! My imperial kitten!", from: "through", until: "liftq" }),
lkc("chess", lkRy("lghouse", 2.75, 0.55, 0.5), { key: "wq2", chess: "queen:w", s: 0.15, name: "The White Queen", greet: "Mind the volcano!", from: "liftq", until: "stairs" }),
lkc("chess", lkRy("lghouse", 2.6, 0.35, 0.5), { key: "lily", chess: "pawn:w", s: 0.1, name: "Lily, the little White Pawn", greet: "(she squeaks and kicks)", from: "through", until: "stairs" }),
lkc("alice", lkR("lghall", 0.4, 1.6), { key: "al4", ry: Math.PI, from: "stairs" })
],
steps: [
{ k: "read" },
lkzN("🐈 The way Dinah washed her children's faces", 1),
lkzGo(lkR("drawing", -0.9, -1.0), "Come and sit by the great arm-chair, where Alice is curled up with the black kitten", { r: 1.4 }),
lkzTN("Alice", "Alice is winding up the ball of worsted, and the kitten is helping: listen", "🧶 The black kitten and the worsted", 1),
lkzGather("worsted", lkR("drawing", 0.2, -1.6), 3, "A ball of worsted", "The worsted is all over the hearth-rug, in knots and tangles: gather the balls up for Alice", { spread: 1.4 }),
lkzTN("Alice", "Alice catches up the kitten and gives it a little kiss: listen", "😾 Oh, you wicked little thing!", 1),
lkzTN("Alice", "Alice settles back with the kitten and the worsted: listen", "🔥 Do you know what to-morrow is, Kitty?", 1),
lkzGo(lkR("drawing", 3.7, -0.6), "Go up into the window and look out at the snow, where the boys were getting in sticks", { r: 1.0 }),
lkzPuzzle("🔥 To-morrow", "Look out of the window: the boys have left a great heap of sticks at the end of the lane, and given up for the snow. What is to-morrow, that they want so many?", ["Christmas Day", "The bonfire: the fifth of November, Guy Fawkes Day", "A wedding in the church"], 1, ["Not yet.", "", "No."], { yes: "🔥 " + lkQ("I was watching the boys getting in sticks for the bonfire—and it wants plenty of sticks, Kitty!") }),
lkzTN("Alice", "Alice holds up one finger and tells the kitten all its faults: listen", "☝️ Number one, number two, number three", 1),
lkzPuzzle("☝️ The second fault", "What was Kitty's fault number two?", ["It squeaked twice while Dinah was washing its face", "It pulled Snowdrop away by the tail just as Alice had put down the saucer of milk before her", "It unwound every bit of the worsted"], 1, ["That was number one.", "", "That was number three."], { yes: "🥛 " + lkQ("you pulled Snowdrop away by the tail just as I had put down the saucer of milk before her!") }),
lkzTN("Alice", "Alice talks on, more to herself than the kitten", "📅 Wednesday week", 1),
lkzPuzzle("📅 Fifty dinners", "Alice is saving up all the kitten's punishments for Wednesday week. If her own punishments were saved up, and each one was going without a dinner, what does she think?", ["She would be very hungry and cry", "She would have to go without fifty dinners at once, and she would far rather go without them than eat them", "She would be sent to bed"], 1, ["No.", "", "No."], { yes: "🍽️ " + lkQ("I'd far rather go without them than eat them!") }),
lkzTN("Alice", "Alice listens to the snow against the window-panes", "❄️ Do you hear the snow against the window-panes, Kitty?", 1),
lkzHold(lkR("drawing", 3.6, -0.6), 6, "Stand in the window a little, and listen to the snow kissing the panes, as Alice says"),
lkzGo(lkR("drawing", 1.0, 0.3), "Come to the chess-table, where Alice and the kitten were playing", { r: 1.2 }),
lkzTN("Alice", "Alice asks Kitty seriously whether it can play chess", "♟️ Kitty, can you play chess?", 1),
lkzPuzzle("♟️ Let's pretend", "Alice's favourite phrase is \"Let's pretend\". When she once pretended something to her old nurse, shouting suddenly in her ear, what was it?", ["That she was a hungry hyaena, and the nurse was a bone", "That she was the Queen of England", "That the house was on fire"], 0, ["", "No.", "No."], { yes: "🦴 " + lkQ("Nurse! Do let's pretend that I'm a hungry hyaena, and you're a bone.") }),
lkzFind("redqueen", lkR("drawing", 1.6, 0.6), "The Red Queen", "Alice wants the Red Queen off the chess-table, for the kitten to sit up and copy: find a piece fallen under the table and bring it", {}),
lkzTN("Alice", "Alice sets the Red Queen up before the kitten as a model", "👑 Let's pretend that you're the Red Queen, Kitty!", 1),
lkzGo(lkR("drawing", 0, -2.4), "Come to the chimney-piece, where Alice holds the kitten up to the looking-glass", { r: 1.2 }),
lkzTN("Alice", "Alice tells Kitty all her ideas about Looking-glass House: listen", "🪞 Looking-glass House", 1),
lkzPuzzle("🪞 The bit behind the fireplace", "Look into the glass over the chimney-piece. The room in it is just the same as the drawing-room, only the things go the other way. Which bit of it can Alice never see, and wants to see so much?", ["The ceiling", "The bit behind the fireplace, to know whether they have a fire in the winter", "The carpet under the sofa"], 1, ["No.", "", "No."], { yes: "🔥 " + lkQ("I can see all of it when I get upon a chair—all but the bit behind the fireplace.") }),
lkzTN("Alice", "Alice is up on the chimney-piece, and the glass is beginning to melt away", "✨ Let's pretend the glass has got all soft like gauze", 1),
lkzId("glass", lkzSpot("The looking-glass over the chimney-piece", "The glass is melting away like a bright silvery mist: climb up after Alice and go through", { at: lkR("drawing", 0, -2.6) })),
lkzId("through", (function () { var r = lkzTravel("🪞 Through the glass", "", "", null, "▶ Through"); r.done = function () { lkwThroughGlass(function () { lkbPopulate(); lkbStepBegin(); }); }; r.pn = 1; return r; })()),
lkzId("fire", lkzGo(lkR("lghouse", 0, -2.0), "Look whether there is a fire in the fireplace here", { r: 1.2 })),
lkzN("🕰️ The pictures are alive, and the clock grins", 1),
lkzHold(lkR("lghouse", 0, -2.2), 5, "Look up at the clock on the chimney-piece (it has the face of a little old man) and at the pictures beside the fire: their eyes follow you"),
lkzN("♟️ The chessmen were walking about, two and two!", 1),
lkzTalk("A Red Castle", "Kneel down by the hearth and watch the chessmen walking among the cinders: say good evening to the Castles", ["♜ Two and two", "<p>The Castles walk arm in arm, and do not seem to hear you. You are invisible to them, as Alice is.</p>", "▶ Go on"]),
lkzN("👑 Here are the Red King and the Red Queen", 1),
lkzN("🔊 Squeaking on the table", 1),
lkzTN("The White Queen", "The White Queen rushes past the King, knocking him over among the cinders", "😱 It is the voice of my child!", 1),
lkzTN("The White King", "The White King sits up among the cinders, rubbing his nose", "🎻 Imperial fiddlestick!", 1),
lkzId("liftq", lkzPuzzle("👐 Lily is screaming herself into a fit", "The White Queen is trying to clamber up the side of the fender to her child. Alice is very anxious to be of use. What does she do?", ["Shouts to the Queen to climb the poker", "Picks up the Queen and sets her on the table by the side of her noisy little daughter", "Picks up Lily and puts her in the hearth"], 1, ["No.", "", "No."], { yes: "👐 " + lkQ("she hastily picked up the Queen and set her on the table by the side of her noisy little daughter."), pn: 1 })),
lkzN("🌋 Mind the volcano!", 3),
lkzTN("The White King", "Watch the White King struggle slowly up from bar to bar of the fender", "🧗 You'll be hours and hours getting to the table", 1),
lkzId("liftk", lkzPuzzle("👐 Lift the King", "Alice offers to help him up. The King takes no notice. What does Alice do, and what happens to the King's face?", ["She waits for him", "She picks him up very gently and lifts him across, but first dusts him, for he is covered with ashes; and he makes such a face", "She calls the Queen"], 1, ["No.", "", "No."], { yes: "🧹 She dusts him a little, and he makes such a face that she nearly drops him for laughing.", pn: 3 })),
lkzN("🫨 He turned cold to the very ends of his whiskers", 5),
lkzGo(lkRy("lghouse", 2.5, 0.9, 0), "Come to the work-table and look on while the King takes out his enormous memorandum-book", { r: 1.0 }),
lkzN("✏️ Alice takes hold of the end of the pencil", 1),
lkzPuzzle("✏️ What did Alice write?", "Alice was too strong for the King, and wrote in his memorandum-book for him. What did she put?", ["THE WHITE QUEEN IS ASLEEP", "THE WHITE KNIGHT IS SLIDING DOWN THE POKER. HE BALANCES VERY BADLY", "A VOLCANO BLEW ME UP"], 1, ["No.", "", "That was the Queen's."], { yes: "✏️ " + lkQ("THE WHITE KNIGHT IS SLIDING DOWN THE POKER. HE BALANCES VERY BADLY"), pn: 2 }),
lkzId("book", lkzN("📖 A book lying near Alice on the table", 1)),
lkzN("📖 It was like this.", 3),
lkzPuzzle("🪞 A Looking-glass book", "The book is all in some language Alice does not know. How can she read it?", ["Turn it upside down", "Hold it up to a glass, and the words will all go the right way again", "Read it with one eye shut"], 1, ["No.", "", "No."], { yes: "🪞 " + lkQ("Why, it's a Looking-glass book, of course!"), pn: 1 }),
lkzHold(lkR("lghouse", 0, -2.4), 4, "Carry the book to the glass over the chimney-piece and hold it up, so that the words go the right way", {}),
lkzN("📜 This was the poem that Alice read.", 2),
lkzN("📜 'Twas brillig, and the slithy toves", 1),
lkzN("📜 Beware the Jabberwock, my son!", 1),
lkzPuzzle("⚔️ The vorpal sword", "Read on. What does the young hero take in hand to go after the manxome foe?", ["His frumious bow", "His vorpal sword", "A Tumtum branch"], 1, ["No.", "", "He rests by the Tumtum tree."], { yes: "⚔️ " + lkQ("He took his vorpal sword in hand:"), pn: 1 }),
lkzN("🔥 The Jabberwock, with eyes of flame", 1),
lkzN("⚔️ One, two! One, two!", 1),
lkzN("🎉 O frabjous day!", 1),
lkzN("📜 'Twas brillig, again", 1),
lkzPuzzle("🤔 What it means", "Alice thinks the poem very pretty, but rather hard to understand. What is the one thing she is sure of?", ["That the Jabberwock won", "SOMEBODY killed SOMETHING: that's clear, at any rate", "That the toves were slithy because of the rain"], 1, ["No.", "", "No."], { yes: "🤔 " + lkQ("However, SOMEBODY killed SOMETHING: that's clear, at any rate—"), pn: 1 }),
lkzId("stairs", lkzTravel("🏃 Down the stairs", "", "", null, "▶ Float down", { pn: 1 })),
lkzGo(lkR("lghall", 0.5, 4.6), "Float on through the hall after Alice (catch hold of the door-post, it is giddy work!) and out at the door into the garden", { r: 1.2 })
] });
(function () { var C = LKB_CH[LKB_CH.length - 1]; C.steps.forEach(function (s) { if (s.id === "stairs") {
s.done = function () { lkwGo(lkR("lghall", -1.6, -3.0)(), "🏃 <b>You keep the tips of your fingers on the hand-rail and float gently down,</b> without even touching the stairs.", function () { lkbPopulate(); lkbStepBegin(); }); };
} }); })();
lkbCh({ t: "The Garden of Live Flowers", txt: 1, p0: 1, start: { sc: "board", x: 0, z: 660, ry: 0 }, jump: 1, tune: "flowers", keep: ["daisy", "A pink daisy", "🌼"],
words: "Out of Looking-Glass House into its garden: a bright still afternoon, the gravel-walks, a flower-bed with a willow in the middle of it, and a little hill beyond, which you mean to climb to see the garden better.",
intro: "The garden of Looking-Glass House",
state: { env: "board" },
cast: [
lkc("alice", lkBo(-2, 656), { ry: 0, until: "bed" }),
lkc("alice", lkBo(-27, 627.5), { key: "al2", ry: Math.PI * 0.9, from: "bed", until: "meet" }),
lkc("redqueen", lkBo(-12, 606), { key: "rq1", ry: 0.8, from: "queen", until: "meet", greet: "Look up, speak nicely, and don't twiddle your fingers all the time." }),
lkc("redqueen", lkBo(1.2, 597), { key: "rq2", ry: Math.PI, from: "meet", until: "hill" }),
lkc("alice", lkBo(-0.6, 598.2), { key: "al3", ry: 0, from: "meet", until: "hill" }),
lkc("redqueen", lkBo(1.4, 550), { key: "rq3", ry: 0, from: "hill", until: "tree" }),
lkc("alice", lkBo(-0.8, 550.6), { key: "al4", ry: 0, from: "hill", until: "tree" }),
lkc("redqueen", lkBo(-53.4, 331.2), { key: "rq4", ry: Math.PI, from: "tree", until: "gone" }),
lkc("alice", lkBo(-56.4, 331.6), { key: "al5", ry: 0.4, from: "tree" })
],
steps: [
{ k: "read" },
lkzN("🏠 Coming back to the house, do what she would", 1),
lkzSpot("The garden path, twisting like a corkscrew", "Follow the path towards the hill, as Alice does: see where it takes you", { at: lkBo(6, 648) }),
lkzN("🏠 I'm NOT going in again yet", 3),
lkzPuzzle("🌀 The corkscrew path", "Every turn of the path brings you straight back to the door of the house. Alice is determined to get to the hill. What does she do?", ["Goes in again and out by the back door", "Turns her back upon the house resolutely and sets out once more, determined to keep straight on", "Gives up and sits down"], 1, ["She is NOT going in again yet.", "", "Never."], { yes: "🏠 " + lkQ("I never saw such a house for getting in the way! Never!") }),
lkzId("bed", lkzGo(lkBo(-29, 626), "Start again: this time come to the large flower-bed with its border of daisies and the willow-tree in the middle", { r: 3 })),
lkzN("🌼 A large flower-bed, with a border of daisies", 1),
lkzTN("The Tiger-lily", "Speak to the Tiger-lily, waving gracefully about in the wind", "🌺 O Tiger-lily, I WISH you could talk!", 2),
lkzN("🌺 And can ALL the flowers talk?", 2),
lkzTN("The Rose", "The Rose has been wondering when you'd speak", "🌹 It isn't manners for us to begin", 2),
lkzN("🌳 There's the tree in the middle", 3),
lkzPuzzle("🌳 Bough-wough!", "What could the willow-tree in the middle do, if any danger came?", ["Drop its leaves on it", "It says \"Bough-wough!\", that's why its branches are called boughs", "Run away"], 1, ["No.", "", "No."], { yes: "🌳 " + lkQ("that's why its branches are called boughs!"), pn: 1 }),
lkzTN("The Daisies", "The Daisies all begin shouting together, till the air is full of little shrill voices", "🌼 Didn't you know THAT?", 1),
lkzPuzzle("🤫 Silence!", "The Daisies are just beginning again. Stoop down to them as Alice does: what does she whisper?", ["Please be quiet, little flowers", "If you don't hold your tongues, I'll pick you!", "The Tiger-lily is cross with you"], 1, ["They take no notice.", "", "No."], { yes: "🤫 " + lkQ("There was silence in a moment, and several of the pink daisies turned white."), pn: 2 }),
lkzN("🌺 The daisies are worst of all", 2),
lkzTN("The Tiger-lily", "Ask the Tiger-lily how it is they can all talk so nicely", "✋ Put your hand down, and feel the ground", 2),
lkzHold(lkBo(-29.5, 624.5), 4, "Put your hand down and feel the ground of the flower-bed"),
lkzPuzzle("🛏️ Why they talk", "The ground is very hard. Why does that let the flowers talk?", ["Hard ground is good for roots", "In most gardens they make the beds too soft, so that the flowers are always asleep", "The willow keeps them awake"], 1, ["No.", "", "No."], { yes: "🛏️ " + lkQ("they make the beds too soft—so that the flowers are always asleep."), pn: 2 }),
lkzTN("The Violet", "The Violet speaks, so suddenly that Alice quite jumps", "💜 I never saw anybody that looked stupider", 3),
lkzTN("The Rose", "Ask the Rose whether there are any more people in the garden", "🌹 One other flower in the garden that can move about", 6),
lkzPuzzle("🌹 The thorny kind", "The other flower that moves about is redder than Alice, her petals done up close, and she is one of the thorny kind. Where does she wear her thorns, and who is she?", ["On her stem: she is a rose", "All round her head: she is the Red Queen, with her crown", "On her shoes: she is the Gardener"], 1, ["No.", "", "No."], { yes: "👑 " + lkQ("'Why all round her head, of course,' the Rose replied."), pn: 4 }),
lkzTN("The Larkspur", "The Larkspur hears a footstep on the gravel-walk", "👂 She's coming! thump, thump, thump", 1),
lkzId("queen", lkzN("👑 It was the Red Queen. She's grown a good deal!", 2)),
lkzN("🚪 I should advise you to walk the other way", 3),
lkzPuzzle("↩️ The other way", "You set off towards the Red Queen and found yourself walking in at the front-door again. She is a long way off now. How will you reach her?", ["Run at her as fast as you can", "Walk in the opposite direction, away from her", "Wait for her to come"], 1, ["The house gets in the way again.", "", "She is going away from you."], { yes: "↩️ " + lkQ("It succeeded beautifully."), pn: 2 }),
lkzId("meet", lkzGo(lkBo(-0.6, 598.4), "Walk away from her, the other way, and find yourself face to face with the Red Queen at the garden gate, full in sight of the hill", { r: 2.4 })),
lkzTN("The Red Queen", "The Red Queen wants to know where you come from, and where you are going", "👑 Look up, speak nicely, and don't twiddle your fingers", 3),
lkzPuzzle("🙇 It saves time", "The Queen says you should do something while you are thinking what to say, because it saves time. What?", ["Count to ten", "Curtsey", "Look at your watch"], 1, ["No.", "", "That is what she does."], { yes: "🙇 " + lkQ("Curtsey while you're thinking what to say, it saves time."), pn: 2 }),
lkzN("👑 Always say \"your Majesty\"", 2),
lkzTN("The Red Queen", "Tell the Queen you meant to find your way to the top of that hill", "⛰️ I could show you hills", 4),
lkzId("hill", lkzGo(lkBo(0, 549.5), "Walk on in silence with the Queen to the top of the little hill", { r: 3 })),
lkzN("⛰️ They walked on in silence", 1),
lkzSpot("The top of the little hill", "Stand on the top of the hill and look out in all directions over the country", { at: lkBo(0, 548) }),
lkzN("♟️ A most curious country", 1),
lkzN("♟️ Marked out just like a large chessboard!", 1),
lkzTN("The Red Queen", "Alice glances shyly at the real Queen: she would so like to be one of the pieces", "👑 You can be the White Queen's Pawn", 1),
lkzPuzzle("♟️ Your square", "The Queen says you can be the White Queen's Pawn, as Lily's too young to play. In which square do you start, and when will you be a Queen?", ["In the First Square; when you reach the Fourth", "In the Second Square; when you get to the Eighth Square", "In the Eighth Square; at once"], 1, ["No.", "", "No."], { yes: "♟️ " + lkQ("when you get to the Eighth Square you'll be a Queen—") }),
lkN_run(),
lkzN("💨 They were running hand in hand", 2),
lkzHold(lkBo(0, 549.5), 8, "Run! Hand in hand with the Queen, as fast as you can go: Faster! Faster! (and see whether anything round you changes its place)"),
lkzN("💨 Are we nearly there?", 2),
lkzId("tree", lkzTravel("💨 Faster! Faster!", "", lkA("pegs", 0, 1.5), "💨 <b>You skim through the air, hardly touching the ground,</b> and stop suddenly: you are under a tree, quite out of breath.", "▶ Faster!", { pn: 1 })),
lkzTN("The Red Queen", "The Queen props you up against the tree. Look round: everything is just as it was", "🌳 You may rest a little now", 4),
lkzPuzzle("💨 The same place", "Here, says the Queen, it takes all the running you can do to keep in the same place. What must you do if you want to get somewhere else?", ["Stand still", "Run at least twice as fast as that", "Take the railway"], 1, ["No.", "", "Not yet."], { yes: "💨 " + lkQ("If you want to get somewhere else, you must run at least twice as fast as that!"), pn: 1 }),
lkzN("🥵 I AM so hot and thirsty!", 1),
lkzTN("The Red Queen", "The Queen takes a little box out of her pocket", "🍪 Have a biscuit?", 2),
lkzFind("biscuit", lkBo(-54.4, 329.6), "A very dry biscuit", "Take the biscuit (it would not be civil to say No), and eat it as well as you can", {}),
lkzN("📏 I'll just take the measurements", 1),
lkzHold(lkBo(-55, 327), 6, "Watch the Queen measure the ground with her ribbon marked in inches, and stick in her little pegs here and there"),
lkzN("📏 At the end of two yards", 5),
lkzGo(lkBo(-55, 326), "Follow the Queen down the row to the two-yard peg, where she faces round", { r: 1.6 }),
lkzTN("The Red Queen", "At the two-yard peg the Queen gives you your directions", "♟️ A pawn goes two squares in its first move", 2),
lkzPuzzle("🚂 The Third Square", "A pawn goes two squares in its first move. How will you go through the Third Square?", ["On foot, slowly", "Very quickly, by railway", "By boat"], 1, ["No.", "", "That comes later."], { yes: "🚂 " + lkQ("So you'll go VERY quickly through the Third Square—by railway, I should think—") }),
lkzTN("The Red Queen", "At the three-yard peg she repeats them, for fear of your forgetting", "🌲 The Seventh Square is all forest", 1),
lkzTN("The Red Queen", "At the next peg the Queen turns again", "🇫🇷 Speak in French when you can't think of the English", 1),
lkzId("gone", lkzN("💨 At the last peg, she was gone", 1))
] });
function lkN_run() { return lkzId("run", lkzRead("💨 Off!", "<p>All the Queen says is <i>Faster!</i> Hold her hand.</p>", "▶ Run")); }
lkbCh({ t: "Looking-Glass Insects", txt: 2, p0: 1, start: { sc: "board", x: 0.5, z: 546, ry: 0 }, jump: 1, tune: "train", keep: ["ticket", "A railway ticket, the same size as you", "🎫"],
words: "On the top of the little hill, the Second Square, and the whole country before you like a map. Alice stands on tiptoe to see a little further: it is something very like learning geography.",
intro: "The hill, looking north",
state: { env: "board", trainGone: lkzOn("under") },
cast: [
lkc("alice", lkBo(-0.8, 546.4), { ry: 0, until: "train" }),
lkc("alice", lkR("carriage", -0.55, 0.3), { key: "al2", ry: Math.PI / 2, from: "train", until: "under" }),
lkc("paper", lkR("carriage", 0.6, 0.3), { ry: -Math.PI / 2, from: "train", until: "under" }),
lkc("goat", lkR("carriage", 0.6, 1.3), { ry: -Math.PI / 2, from: "train", until: "under" }),
lkc("beetle", lkR("carriage", 0.6, 2.2), { ry: -Math.PI / 2, s: 0.8, from: "train", until: "under" }),
lkc("guard", lkR("carriage", 1.0, -1.4), { ry: -Math.PI / 2, from: "train", until: "under" }),
lkc("gnat", lkR("carriage", -0.7, 0.9), { key: "gn0", dy: 1.3, s: 0.25, from: "train", until: "under", name: "A very small voice" }),
lkc("alice", lkBo(-56.2, 141.2), { key: "al3", ry: 0.3, from: "under", until: "field" }),
lkc("gnat", lkBo(-54.6, 139.8), { key: "gn1", dy: 1.8, from: "under", until: "sigh" }),
lkc("alice", lkBo(-55.4, 97), { key: "al4", ry: 0, from: "wood", until: "fawngo" }),
lkc("fawn", lkBo(-54.2, 95.6), { from: "wood", until: "fawngo" }),
lkc("alice", lkBo(-55.6, 80.5), { key: "al5", ry: 0, from: "fawngo" })
],
steps: [
{ k: "read" },
lkzGo(lkBo(0, 543.5), "Stand at the edge of the hill-top on tiptoe and look down into the Third Square, at the creatures bustling about among the flowers", { r: 2 }),
lkzPuzzle("🐝 Making honey", "Those creatures down among the flowers, poking their proboscises into them: they can't be bees, nobody ever saw bees a mile off. What are they?", ["Bees after all", "Elephants, and the flowers are as big as cottages with the roofs taken off", "Birds"], 1, ["Nobody ever saw bees a mile off.", "", "No."], { yes: "🐘 " + lkQ("in fact it was an elephant"), pn: 1 }),
lkzN("🌸 I'll go down the other way", 1),
lkzId("train", lkzTravel("🚂 Over the first brook", "", "", null, "▶ Jump", { pn: 1 })),
lkzTN("The Guard", "The Guard puts his head in at the window", "🎫 Tickets, please!", 2),
lkzPuzzle("🎫 No ticket", "You haven't got a ticket: there wasn't a ticket-office where you came from. Where does the Guard say you should have bought one?", ["At the station", "From the engine-driver", "From the Goat"], 1, ["There isn't one.", "", "No."], { yes: "🚂 " + lkQ("you should have bought one from the engine-driver."), pn: 2 }),
lkzN("💷 A thousand pounds a minute", 2),
lkzTN("The Guard", "The Guard looks at you through a telescope, then a microscope, then an opera-glass", "🔭 You're travelling the wrong way", 1),
lkzTN("The gentleman dressed in white paper", "The gentleman sitting opposite, dressed in white paper, speaks", "📰 So young a child", 1),
lkzTN("The Goat", "The Goat next to him shuts his eyes and speaks in a loud voice", "🐐 Even if she doesn't know her alphabet!", 1),
lkzTN("The Beetle", "The Beetle next to the Goat goes on, as they all speak in turn", "🪲 She'll have to go back from here as luggage!", 1),
lkzN("🐴 Change engines—", 3),
lkzPuzzle("📦 How to send her", "The voices all have ideas about how you should travel. What does the very gentle voice in the distance say you must be labelled?", ["FRAGILE", "\"Lass, with care\"", "THIS SIDE UP"], 1, ["No.", "", "No."], { yes: "🏷️ " + lkQ("She must be labelled \"Lass, with care,\" you know—") }),
lkzN("✉️ She must go by post", 1),
lkzTN("The gentleman dressed in white paper", "The gentleman in white paper leans forwards and whispers in your ear", "🎟️ Take a return-ticket every time the train stops", 1),
lkzN("🦟 The little voice close to her ear", 6),
lkzN("😱 A shrill scream from the engine", 2),
lkzPuzzle("🫳 The jump", "The Horse says it's only a brook they have to jump over. The carriage rises straight up into the air; in her fright, what does Alice catch at?", ["The window-strap", "The thing nearest to her hand, which was the Goat's beard", "The Guard's cap"], 1, ["No.", "", "No."], { yes: "🐐 " + lkQ("But the beard seemed to melt away as she touched it") }),
lkzId("under", lkzTravel("🌳 Under a tree", "", "", null, "▶ Go on", { pn: 1 })),
lkzN("🦟 About the size of a chicken", 1),
lkzTN("The Gnat", "The Gnat, balancing on a twig over your head, goes on as if nothing had happened", "🦟 Then you don't like all insects?", 5),
lkzN("🏷️ What's the use of their having names?", 4),
lkzTN("The Gnat", "Begin the list of insects: the Horse-fly", "🐴 Half way up that bush", 2),
lkzSpot("The Looking-Glass insects in the tree", "Look half way up the bush for the Rocking-horse-fly, made entirely of wood", { at: lkBo(-52, 141) }),
lkzN("🐴 Sap and sawdust", 3),
lkzPuzzle("🐴 The Rocking-horse-fly", "What does the Rocking-horse-fly live on?", ["Hay", "Sap and sawdust", "Weak tea"], 1, ["No.", "", "That is another fly."], { yes: "🪵 " + lkQ("'Sap and sawdust,' said the Gnat.") }),
lkzN("🔥 The Snap-dragon-fly", 2),
lkzPuzzle("🔥 The Snap-dragon-fly", "Look on the branch above your head. The Snap-dragon-fly's body is plum-pudding and its wings are holly-leaves. What is its head?", ["A cherry", "A raisin burning in brandy", "A candle"], 1, ["No.", "", "No."], { yes: "🔥 " + lkQ("its head is a raisin burning in brandy."), pn: 2 }),
lkzTN("The Gnat", "Go on with the list: the Butterfly", "🦋 Crawling at your feet", 2),
lkzHold(lkBo(-56, 141.6), 4, "Look down at your feet for the Bread-and-butter-fly, crawling there (and draw your feet back!)"),
lkzN("🍞 Weak tea with cream in it", 2),
lkzPuzzle("🍞 A new difficulty", "The Bread-and-butter-fly lives on weak tea with cream in it. Supposing it couldn't find any?", ["It would eat bread instead", "Then it would die, of course: it always happens", "It would fly home"], 1, ["No.", "", "No."], { yes: "🍞 " + lkQ("'It always happens,' said the Gnat."), pn: 4 }),
lkzTN("The Gnat", "The Gnat hums round and round your head, then settles again", "🏷️ I suppose you don't want to lose your name?", 4),
lkzPuzzle("😄 The Gnat's joke", "If the governess couldn't remember your name she would call you \"Miss!\". What is the Gnat's joke?", ["You'd be a mystery", "If she said \"Miss\" and nothing more, of course you'd miss your lessons", "You'd be Miss Nobody"], 1, ["No.", "", "No."], { yes: "😄 " + lkQ("of course you'd miss your lessons. That's a joke. I wish YOU had made it."), pn: 1 }),
lkzId("sigh", lkzN("😢 Two large tears", 4)),
lkzId("field", lkzGo(lkBo(-55, 114), "Get up and walk on, across an open field, to the wood on the other side of it, darker than the last", { r: 3 })),
lkzN("🌲 The wood where things have no names", 2),
lkzId("wood", lkzSpot("The wood where things have no names", "Step under the trees: it looks very cool and shady", { at: lkBo(-55, 104) })),
lkzN("❓ Under the—under the—under THIS", 2),
lkzHold(lkBo(-55, 100), 6, "Stand silent a minute, and try to remember your name: who are you?"),
lkzTN("The Fawn", "A Fawn comes wandering by, and looks at you with its large gentle eyes: hold out your hand", "🦌 What do you call yourself?", 2),
lkzN("🦌 Think again", 4),
lkzGo(lkBo(-55, 88), "Walk on together through the wood with the Fawn, your arm round its soft neck, till you come out into another open field", { r: 2.4 }),
lkzId("fawngo", lkzPuzzle("🦌 Out of the wood", "Out in the open field, the Fawn gives a sudden bound into the air and shakes itself free. What does it cry?", ["Good-bye, little girl!", "I'm a Fawn! And, dear me! you're a human child!", "Follow me!"], 1, ["No.", "", "It darts away."], { yes: "🦌 " + lkQ("'I'm a Fawn!' it cried out in a voice of delight, 'and, dear me! you're a human child!'"), pn: 1 })),
lkzN("✨ Alice—Alice—I won't forget it again", 1),
lkzSpot("The two finger-posts", "Come to where the road divides, and read the finger-posts", { at: lkBo(-55, 82) }),
lkzN("🪧 Two finger-posts pointing the same way", 2),
lkzPuzzle("🪧 Which way?", "Wherever the road divides there are two finger-posts pointing the same way, one marked TO TWEEDLEDUM'S HOUSE and the other TO THE HOUSE OF TWEEDLEDEE. What does Alice decide?", ["To go back", "That they live in the same house", "That one of them is lying"], 1, ["No.", "", "No."], { yes: "🏠 " + lkQ("I do believe,' said Alice at last, 'that they live in the same house!"), pn: 1 })
] });
(function () {
var C = LKB_CH[LKB_CH.length - 1];
C.steps.forEach(function (s) {
if (s.id === "train")
s.done = function () { lkwGo(lkR("carriage", -0.55, -0.6)(), "🚂 <b>You jump over the first of the six little brooks,</b> and find yourself in a railway carriage, with all the passengers holding out tickets.", function () { lkbPopulate(); lkbStepBegin(); }); };
if (s.id === "under")
s.done = function () { lkwGo({ sc: "board", x: -56.6, z: 142.2, ry: 0.3 }, "🌳 <b>The carriage rose straight up into the air.</b> The beard melts away as you touch it, and you are sitting quietly under a tree, the Gnat fanning you with its wings.", function () { lkbPopulate(); lkbStepBegin(); }); };
});
})();
lkbCh({ t: "Tweedledum and Tweedledee", txt: 3, p0: 1, start: { sc: "board", x: -55, z: 78, ry: 0 }, jump: 1, tune: "tweedle", keep: ["rattle", "A nice new rattle (spoilt)", "🪇"],
words: "Under a tree in the Fourth Square, two fat little men are standing, each with an arm round the other's neck; one has DUM embroidered on his collar, and the other DEE. The finger-posts were right: they live in the same house.",
intro: "Tweedledum's and Tweedledee's tree",
state: { env: function () { return lkbStepAt("crow") ? "dark" : "board"; } },
cast: [
lkc("alice", lkBo(-55.3, 75.6), { ry: Math.PI, until: "poem" }),
lkc("dum", lkBo(-55.8, 73.4), { ry: 0, until: "poem" }),
lkc("dee", lkBo(-54.4, 73.4), { ry: 0, until: "poem" }),
lkc("walrus", lkBo(346, 93), { ry: -Math.PI / 2, from: "poem", until: "back" }),
lkc("carpenter", lkBo(346.5, 95.4), { ry: -Math.PI / 2, from: "poem", until: "back" }),
lkc("alice", lkBo(-53.4, 72), { key: "al2", ry: Math.PI * 0.6, from: "back", until: "crow" }),
lkc("dum", lkBo(-52, 70.4), { key: "dum2", ry: 0, from: "back", until: "crow" }),
lkc("dee", lkBo(-50.6, 70.6), { key: "dee2", ry: 0, from: "back", until: "crow" }),
lkc("redking", lkBo(-24, 66), { lie: true, ry: 0.4, greet: "(he snores: fit to snore his head off)", mute: false }),
lkc("crow", lkBo(-56, 40), { dy: 22, s: 1.6, from: "crow" })
],
steps: [
{ k: "read" },
lkzN("🎎 They stood so still", 1),
lkzTN("Tweedledum", "Walk round them, looking for TWEEDLE written at the back of each collar, and the one marked DUM speaks", "🎎 If you think we're wax-works", 1),
lkzTN("Tweedledee", "Then the one marked DEE", "🎎 Contrariwise", 1),
lkzN("🎵 The old song kept ringing through her head", 3),
lkzPuzzle("🎵 The old song", "In the old song, why did Tweedledum and Tweedledee agree to have a battle?", ["Over a cake", "Because Tweedledum said Tweedledee had spoiled his nice new rattle", "Over the way out of the wood"], 1, ["No.", "", "No."], { yes: "🪇 " + lkQ("Had spoiled his nice new rattle.") }),
lkzTN("Tweedledum", "Tweedledum knows what you're thinking about", "🎎 But it isn't so, nohow", 1),
lkzTN("Tweedledee", "Tweedledee continues", "🧠 That's logic", 1),
lkzN("🌲 Which is the best way out of this wood?", 2),
lkzPuzzle("👉 First Boy!", "They look so exactly like a couple of great schoolboys that Alice points at Tweedledum and says \"First Boy!\" What does he cry, and what does Tweedledee say when she says \"Next Boy!\"?", ["Present! and Here!", "Nohow! and Contrariwise!", "Yes, miss! and No, miss!"], 1, ["No.", "", "No."], { yes: "🎎 " + lkQ("'Nohow!' Tweedledum cried out briskly, and shut his mouth up again with a snap."), pn: 3 }),
lkzTN("Tweedledum", "Tweedledum says you've been wrong", "🤝 How d'ye do? and shake hands!", 1),
lkzN("💃 Here we go round the mulberry bush", 2),
lkzHold(lkBo(-55, 74.4), 8, "Take a hand of each, and dance round and round in a ring with them, to music from the tree overhead (four times round is enough for one dance)"),
lkzN("💃 Four times round is enough for one dance", 2),
lkzN("🎎 You like poetry?", 4),
lkzTN("Tweedledee", "Tweedledee looks round at his brother with great solemn eyes", "🦭 \"THE WALRUS AND THE CARPENTER\" is the longest", 3),
lkzN("☀️ The sun was shining—", 3),
lkzId("poem", lkzTravel("🦭 The Walrus and the Carpenter", "", "shore", "🌊 <b>While Tweedledee recites,</b> you see it all, away east on the sea-shore of the poem.", "▶ Listen", { pn: 1 })),
lkzN("🌙 The moon was shining sulkily", 1),
lkzN("🏖️ The sea was wet as wet could be", 1),
lkzSpot("The sea-shore of the poem", "Walk down the sands to the sea, where the Walrus and the Carpenter are walking close at hand", { at: lkBo(338, 96) }),
lkzN("🧹 If seven maids with seven mops", 2),
lkzPuzzle("🧹 Seven maids", "If seven maids with seven mops swept the sand for half a year, could they get it clear?", ["Yes, said the Walrus", "\"I doubt it,\" said the Carpenter, and shed a bitter tear", "They never tried"], 1, ["No.", "", "No."], { yes: "😢 " + lkQ("\"I doubt it,\" said the Carpenter,") }),
lkzTN("The Walrus", "The Walrus beseeches the Oysters", "🦪 O Oysters, come and walk with us!", 1),
lkzN("🦪 The eldest Oyster winked his eye", 1),
lkzN("🦪 Four young oysters hurried up", 2),
lkzN("🪨 They rested on a rock conveniently low", 1),
lkzPuzzle("🪨 The time has come", "The time has come, the Walrus said, to talk of many things. Of what?", ["Of tea and toast and treacle tarts", "Of shoes, and ships, and sealing-wax, of cabbages, and kings", "Of oysters only"], 1, ["No.", "", "No."], { yes: "👑 " + lkQ("Of cabbages—and kings—"), pn: 1 }),
lkzN("🍞 A loaf of bread", 2),
lkzN("🌙 The night is fine", 2),
lkzN("😢 I weep for you", 2),
lkzN("🦪 But answer came there none", 1),
lkzId("back", lkzTravel("🌳 Back under the tree", "", "tweedles", "🌳 <b>The poem is done,</b> and you are back under the tree with Tweedledum and Tweedledee.", "▶ Back")),
lkzN("🦭 I like the Walrus best", 2),
lkzPuzzle("🦭 A puzzler", "The Walrus ate more than the Carpenter, but hid them behind his handkerchief; the Carpenter ate as many as he could get. Which does Alice like best in the end?", ["The Walrus", "The Carpenter", "Neither: they were BOTH very unpleasant characters"], 2, ["He ate more.", "He ate as many as he could get.", ""], { yes: "🦭 " + lkQ("They were BOTH very unpleasant characters—"), pn: 3 }),
lkzN("🌲 It's only the Red King snoring", 1),
lkzGo(lkBo(-24, 67.6), "Let them take a hand each and lead you up to where the Red King is sleeping", { r: 2.4 }),
lkzN("👑 Come and look at him!", 1),
lkzTN("Tweedledum", "Look at the King: is he a lovely sight?", "😴 Isn't he a LOVELY sight?", 1),
lkzN("😴 A tall red night-cap, with a tassel", 2),
lkzTN("Tweedledee", "Ask Tweedledee what the King is dreaming about", "💭 He's dreaming now", 3),
lkzN("💭 Only a sort of thing in his dream", 3),
lkzPuzzle("🕯️ If the King woke", "If that there King was to wake, Tweedledum says, what would happen to you?", ["Nothing at all", "You'd go out, bang!, just like a candle", "You'd wake up at home"], 1, ["They say not.", "", "They say not."], { yes: "🕯️ " + lkQ("you'd go out—bang!—just like a candle!"), pn: 4 }),
lkzN("😢 I AM real!", 6),
lkzTN("Tweedledum", "Ask whether it is going to rain: Tweedledum spreads a large umbrella over himself and his brother", "☂️ Not under HERE", 3),
lkzSpot("A rattle, lying under the tree", "Tweedledum springs out from under the umbrella and points with a trembling finger at a little white thing lying under the tree: look", { at: lkBo(-49.6, 73) }),
lkzN("😡 Do you see THAT?", 2),
lkzPuzzle("🪇 The little white thing", "Examine it carefully. What is it?", ["A rattlesnake", "Only a rattle, not a rattleSNAKE", "An egg"], 1, ["Not a rattleSNAKE, you know.", "", "No."], { yes: "🪇 " + lkQ("'It's only a rattle,' Alice said, after a careful examination of the little white thing."), pn: 1 }),
lkzN("😡 My nice new RATTLE!", 4),
lkzTN("Tweedledum", "Tweedledum asks his brother, in a calmer tone", "⚔️ Of course you agree to have a battle?", 2),
lkzGather("cloak", lkBo(-52, 70), 5, "A bolster, blanket or hearth-rug", "Help them dress up: they bring their arms full of things from the wood; gather up the bolsters, blankets, hearth-rugs, table-cloths and dish-covers", { spread: 6 }),
lkzN("⚔️ Such a fuss", 2),
lkzN("⚔️ To get one's head cut off", 2),
lkzTN("Tweedledum", "Tie on Tweedledum's helmet (it looks much more like a saucepan)", "🍳 Do I look very pale?", 3),
lkzN("🦷 And I'VE got a toothache!", 3),
lkzPuzzle("⌚ The time", "Tweedledee looks at his watch. What is the time, and how long will they fight?", ["Noon; till one", "Half-past four; till six, and then have dinner", "Midnight; till dawn"], 1, ["No.", "", "No."], { yes: "⌚ " + lkQ("'Let's fight till six, and then have dinner,' said Tweedledum."), pn: 2 }),
lkzN("🌳 Not a tree left standing", 4),
lkzN("🐦 I wish the monstrous crow would come!", 3),
lkzN("☂️ There's only one sword", 2),
lkzId("crow", lkzN("🐦‍⬛ It's the crow!", 2)),
lkzGo(lkBo(-58, 58), "Run a little way into the wood, and stop under a large tree: the crow can never get at you there", { r: 3 }),
lkzN("🌲 It can never get at me HERE", 1)
] });
lkbCh({ t: "Wool and Water", txt: 4, p0: 1, start: { sc: "board", x: -55.5, z: 54, ry: 0 }, jump: 1, tune: "shop", keep: ["needles", "A pair of the Sheep's knitting-needles", "🧶"],
words: "The wood by the brook at the end of the Fourth Square, getting light again now the crow has gone. A shawl comes flying through the trees, and Alice has caught it; and here comes its owner, running wildly, her arms stretched out wide.",
intro: "The wood by the brook",
state: { env: "board" },
cast: [
lkc("alice", lkBo(-55.4, 51.2), { ry: Math.PI, until: "over" }),
lkc("whitequeen", lkBo(-54.2, 49.8), { ry: 0.4, until: "over", greet: "Bread-and-butter, bread-and-butter." }),
lkc("alice", lkBo(-55.6, 38.4), { key: "al2", ry: Math.PI, from: "over", until: "shop" }),
lkc("whitequeen", lkBo(-54.4, 36.8), { key: "wq2", ry: 0.3, from: "over", until: "shop" }),
lkc("sheep", lkR("shop", 0.2, -1.9), { ry: 0, from: "shop", until: "boat", greet: "What is it you want to buy?" }),
lkc("alice", lkBo(-49, -13.2), { key: "al3", ry: Math.PI, from: "boat", until: "back" }),
lkc("sheep", lkBo(-55.4, -22), { key: "sh2", dy: 0.3, ry: Math.PI / 2, from: "boat", until: "back", greet: "Feather!" }),
lkc("sheep", lkR("shop", 0.2, -1.9), { key: "sh3", ry: 0, from: "back", greet: "Plenty of choice, only make up your mind." })
],
steps: [
{ k: "read" },
lkzN("🧣 Helping her to put on her shawl", 1),
lkzTN("The White Queen", "The White Queen only looks at you in a helpless frightened sort of way, whispering to herself", "🧣 Bread-and-butter, bread-and-butter", 4),
lkzN("📌 Every single thing's crooked, and she's all over pins!", 2),
lkzFind("brush", lkBo(-53.4, 51.6), "The Queen's hair-brush", "The brush has got entangled in the Queen's hair and dropped: find it, and help put her hair in order", {}),
lkzN("🪮 The brush has got entangled", 3),
lkzTN("The White Queen", "The Queen would take you for her lady's maid with pleasure", "🍓 Twopence a week, and jam every other day", 1),
lkzN("🍓 It's very good jam", 3),
lkzPuzzle("🍓 The rule", "What is the rule about jam?", ["Jam on Sundays", "Jam to-morrow and jam yesterday, but never jam to-day", "Jam for good girls"], 1, ["No.", "", "No."], { yes: "🍓 " + lkQ("The rule is, jam to-morrow and jam yesterday—but never jam to-day."), pn: 1 }),
lkzN("🔄 That's the effect of living backwards", 4),
lkzTN("The White Queen", "Ask the Queen about living backwards", "🔄 One's memory works both ways", 4),
lkzN("📅 Things that happened the week after next", 2),
lkzPuzzle("🔄 The King's Messenger", "The King's Messenger is in prison now, being punished. When is his trial, and when does the crime come?", ["The crime first, then the trial, then prison", "The trial doesn't begin till next Wednesday, and the crime comes last of all", "There is no crime at all"], 1, ["Not here.", "", "No."], { yes: "🔄 " + lkQ("and of course the crime comes last of all.") }),
lkzN("🩹 Suppose he never commits the crime?", 8),
lkzN("😱 The Queen began screaming", 2),
lkzHold(lkBo(-55, 51), 4, "Hold both your hands over your ears: her screams are exactly like the whistle of a steam-engine"),
lkzN("😱 I haven't pricked it YET", 4),
lkzPuzzle("📌 Before and after", "The Queen screamed before she pricked her finger. Now her finger is bleeding. Why doesn't she scream now?", ["It doesn't hurt", "She's done all the screaming already: what would be the good of having it all over again?", "She is too tired"], 1, ["No.", "", "No."], { yes: "📌 " + lkQ("'Why, I've done all the screaming already,' said the Queen.") }),
lkzN("📌 Now you understand the way things happen here", 4),
lkzN("☀️ The crow must have flown away", 3),
lkzTN("The White Queen", "The Queen wrings her hands: don't go on like that", "🤔 Consider what a great girl you are", 3),
lkzN("🎂 Seven and a half exactly", 2),
lkzPuzzle("🎂 Something to believe", "Now the Queen gives you something to believe. How old is she?", ["Seventy", "One hundred and one, five months and a day", "Just seven and a half too"], 1, ["No.", "", "No."], { yes: "🎂 " + lkQ("I'm just one hundred and one, five months and a day.") }),
lkzN("😮 One CAN'T believe impossible things", 3),
lkzPuzzle("🍳 Practice", "When the Queen was your age she practised believing for half-an-hour a day. How many impossible things has she sometimes believed before breakfast?", ["One", "Six", "A hundred and one"], 1, ["More.", "", "No."], { yes: "🍳 " + lkQ("sometimes I've believed as many as six impossible things before breakfast."), pn: 1 }),
lkzN("🧣 There goes the shawl again!", 1),
lkzId("over", lkzGo(lkBo(-55.4, 38.4), "Cross the little brook after the Queen and her shawl", { r: 2 })),
lkzN("🐑 Be-e-ehh!", 2),
lkzId("shop", lkzTravel("🐑 A little dark shop", "", "", null, "▶ Rub your eyes", { pn: 1 })),
lkzTN("The Sheep", "The old Sheep sits in an arm-chair knitting, looking at you through a great pair of spectacles", "🐑 What is it you want to buy?", 1),
lkzN("👀 You can't look ALL round you", 3),
lkzN("🛒 Things flow about so here!", 3),
lkzHold(lkR("shop", -2.2, 0), 6, "Look hard at one shelf to make out exactly what is on it (and watch it empty, while the others are crowded full)"),
lkzTN("The Sheep", "The Sheep takes up another pair of needles", "🌀 Are you a child or a teetotum?", 1),
lkzN("🦔 More and more like a porcupine", 1),
lkzId("boat", lkzTravel("🚣 Can you row?", "", "", null, "▶ Take the needles", { pn: 2 })),
lkzN("🪶 Feather!", 3),
lkzHold(lkBo(-49, -13.2), 6, "Pull away at the oars (the water is very queer: every now and then the oars get fast in it and hardly come out again)"),
lkzN("🦀 You'll be catching a crab directly", 3),
lkzPuzzle("🪶 Why feather?", "Why does the Sheep keep saying \"Feather!\"? You're not a bird!", ["Because she is knitting feathers", "You are a bird, she says: you're a little goose", "Because of the wind"], 1, ["No.", "", "No."], { yes: "🪿 " + lkQ("'You are,' said the Sheep: 'you're a little goose.'"), pn: 3 }),
lkzN("🌾 The boat glided gently on", 1),
lkzN("🌾 Oh, please! There are some scented rushes!", 4),
lkzGather("rush", lkBo(-51, -16), 5, "A scented rush", "Let the boat drift in among the waving rushes, tuck up your sleeves, and pick the scented rushes (the prettiest are always further!)", { spread: 5 }),
lkzN("🌾 The prettiest are always further!", 3),
lkzN("🥀 The rushes had begun to fade", 1),
lkzPuzzle("🦀 Catching a crab", "The blade of one oar gets fast in the water and won't come out, and the handle catches Alice under the chin and sweeps her off the seat. What does the Sheep call that?", ["A splash", "A nice crab you caught", "Bad rowing"], 1, ["No.", "", "No."], { yes: "🦀 " + lkQ("Crabs, and all sorts of things,"), pn: 2 }),
lkzN("🦀 Are there many crabs here?", 3),
lkzId("back", lkzTravel("🛒 To buy!", "", "", null, "▶ Back in the shop", { pn: 1 })),
lkzN("🥚 I should like to buy an egg, please", 1),
lkzPuzzle("🥚 The price", "Fivepence farthing for one, twopence for two. Two are cheaper than one; but if you buy two you MUST eat them both. How many does Alice buy?", ["Two, as they're cheaper", "One, for they mightn't be at all nice", "None"], 1, ["You'd have to eat them both.", "", "She wants one."], { yes: "🥚 " + lkQ("'Then I'll have ONE, please,' said Alice"), pn: 3 }),
lkzN("💰 The money in a box", 1),
lkzN("🥚 You must get it for yourself", 1),
lkzFind("egg", lkR("shop", 0.6, 2.3), "The egg, upright on a shelf", "Grope your way among the tables and chairs to the other end of the shop (it is very dark there) and get the egg off its shelf", {}),
lkzN("🌳 Everything turned into a tree", 2)
] });
(function () {
var C = LKB_CH[LKB_CH.length - 1], go = function (at, msg) { return function () { lkwGo(at(), msg, function () { lkbPopulate(); lkbStepBegin(); }); }; };
C.steps.forEach(function (s) {
if (s.id === "shop")
s.done = go(lkR("shop", 0, -0.9), "🐑 <b>Was she in a shop?</b> You are leaning with your elbows on the counter, and opposite you is an old Sheep, knitting.");
if (s.id === "boat")
s.done = go(function () { return { sc: "board", x: -49, z: -12, ry: Math.PI * 0.75 }; }, "🚣 <b>The needles turn into oars in your hands,</b> and you are in a little boat, gliding along between banks; the Sheep knits on in the stern.");
if (s.id === "back")
s.done = go(lkR("shop", 0, -0.9), "🛒 <b>The oars, and the boat, and the river have vanished,</b> and you are back in the little dark shop.");
});
})();
lkbCh({ t: "Humpty Dumpty", txt: 5, p0: 1, start: { sc: "board", x: -55, z: -90, ry: 0 }, jump: 1, tune: "humpty", keep: ["egg", "A piece of very fine eggshell", "🥚"],
words: "The Sixth Square. The egg on the shelf has only grown larger and larger, and more and more human, and now it has eyes and a nose and a mouth: it is sitting with its legs crossed like a Turk on the top of a high wall, so narrow that you wonder how it keeps its balance.",
intro: "Humpty Dumpty's wall",
state: { env: "board", fallen: lkzOn("crash") },
cast: [
lkc("alice", lkBo(-54.2, -98.4), { ry: Math.PI, until: "crash" }),
lkc("humpty", lkBo(-55, -100), { dy: 2.64, ry: 0, until: "crash", greet: "It's very provoking to be called an egg. Very!" })
],
steps: [
{ k: "read" },
lkzGo(lkBo(-55, -98), "Walk up to the foot of the wall and look up at him: he has his eyes steadily fixed in the opposite direction", { r: 2.4 }),
lkzN("🥚 It might have been written a hundred times", 1),
lkzTN("Humpty Dumpty", "Say aloud how exactly like an egg he is, standing with your hands ready to catch him", "😤 It's VERY provoking to be called an egg", 4),
lkzN("🎵 Humpty Dumpty sat on a wall", 2),
lkzN("🎵 That last line is much too long", 2),
lkzTN("Humpty Dumpty", "He asks your name and your business", "🏷️ What does it mean?", 4),
lkzPuzzle("🏷️ A name that means", "A name must mean something, says Humpty Dumpty. What does his own name mean?", ["Nothing at all", "The shape he is, and a good handsome shape it is too", "A great fall"], 1, ["Of course it must.", "", "He won't hear of it."], { yes: "🥚 " + lkQ("MY name means the shape I am—and a good handsome shape it is, too.") }),
lkzN("🧱 Why do you sit out here all alone?", 2),
lkzTN("Humpty Dumpty", "Ask whether he wouldn't be safer down on the ground", "🧱 What tremendously easy riddles you ask!", 2),
lkzPuzzle("👑 The King's promise", "If ever he did fall, the King has promised him, with his very own mouth, what?", ["A new wall", "To send all his horses and all his men", "A doctor"], 1, ["No.", "", "No."], { yes: "🐎 " + lkQ("'To send all his horses and all his men,' Alice interrupted, rather unwisely."), pn: 1 }),
lkzN("📖 It's in a book", 5),
lkzTN("Humpty Dumpty", "It's his turn to choose a subject", "🎂 How old did you say you were?", 1),
lkzPuzzle("🎂 A short calculation", "Make a short calculation, as Alice does: how old is she?", ["Six and three quarters", "Seven years and six months", "Eight next birthday"], 1, ["No.", "", "No."], { yes: "🎂 Seven years and six months. (\"Wrong! You never said a word like it!\")", pn: 1 }),
lkzN("🎂 If I'd meant that, I'd have said it", 4),
lkzTN("Humpty Dumpty", "Humpty Dumpty repeats your age thoughtfully", "🎂 An uncomfortable sort of age", 5),
lkzPuzzle("🎀 Changing the subject", "Alice has had quite enough of the subject of age. What does she suddenly admire, and what does it turn out to be?", ["His waistcoat: it is a coat", "His beautiful belt: but it is a cravat", "His boots: they are slippers"], 1, ["No.", "", "No."], { yes: "🎀 " + lkQ("'It is a—MOST—PROVOKING—thing,' he said at last, 'when a person doesn't know a cravat from a belt!'") }),
lkzN("🎀 What a beautiful belt you've got on!", 3),
lkzTN("Humpty Dumpty", "Humpty Dumpty relents, and tells you about his cravat", "🎀 A present from the White King and Queen", 4),
lkzTN("Humpty Dumpty", "He crosses one knee over the other and clasps his hands round it", "🎁 An un-birthday present", 5),
lkzN("🎁 I like birthday presents best", 7),
lkzN("📒 I'd rather see that done on paper", 2),
lkzPuzzle("📒 The sum", "Take out your memorandum-book and work the sum for him: three hundred and sixty-five days, take away one birthday. What remains?", ["Three hundred and sixty-six", "Three hundred and sixty-four", "One"], 1, ["No.", "", "No."], { yes: "📒 364 un-birthdays, and only ONE for birthday presents. (He was holding it upside down.)", pn: 2 }),
lkzN("🙃 You're holding it upside down!", 5),
lkzPuzzle("🏆 There's glory for you!", "What does Humpty Dumpty mean by \"glory\"?", ["Honour and fame", "A nice knock-down argument", "A birthday cake"], 1, ["Not when he uses it.", "", "No."], { yes: "🏆 " + lkQ("I meant \"there's a nice knock-down argument for you!\""), pn: 2 }),
lkzTN("Humpty Dumpty", "Humpty Dumpty explains how words mean things", "👑 Which is to be master", 4),
lkzN("💷 I always pay it extra", 8),
lkzTN("Humpty Dumpty", "Ask him the meaning of the poem called JABBERWOCKY", "📜 I can explain all the poems that were ever invented", 2),
lkzN("📜 'Twas brillig", 2),
lkzN("🧳 Like a portmanteau", 4),
lkzPuzzle("🕓 Brillig", "What does BRILLIG mean?", ["Bright and brilliant", "Four o'clock in the afternoon, the time when you begin broiling things for dinner", "Brisk and chilly"], 1, ["No.", "", "No."], { yes: "🕓 " + lkQ("\"BRILLIG\" means four o'clock in the afternoon") }),
lkzN("🦡 Something like badgers", 5),
lkzPuzzle("🦡 Toves", "Toves are something like badgers, something like lizards, and something like corkscrews. Where do they make their nests, and what do they live on?", ["In trees, on acorns", "Under sun-dials, and they live on cheese", "In the sea, on oysters"], 1, ["No.", "", "No."], { yes: "🧀 " + lkQ("also they make their nests under sun-dials—also they live on cheese.") }),
lkzN("☀️ THE WABE", 4),
lkzPuzzle("🐦 A borogove", "What is a BOROGOVE?", ["A sort of green pig", "A thin shabby-looking bird with its feathers sticking out all round, something like a live mop", "A badger"], 1, ["That is a rath.", "", "That is a tove."], { yes: "🐦 " + lkQ("something like a live mop.") }),
lkzN("🐷 MOME RATHS", 4),
lkzPuzzle("🐷 A rath", "And a RATH?", ["A sort of green pig", "A small lizard", "A kind of sun-dial"], 0, ["", "No.", "No."], { yes: "🐷 " + lkQ("a \"RATH\" is a sort of green pig") }),
lkzN("🎤 As to poetry", 5),
lkzN("❄️ In winter, when the fields are white", 6),
lkzN("🍂 In summer, when the days are long", 3),
lkzN("🐟 I sent a message to the fish", 5),
lkzPuzzle("🐟 The little fishes", "What answer did the little fishes send back?", ["We will do it, Sir, at once", "We cannot do it, Sir, because—", "Come and ask us yourself"], 1, ["No.", "", "No."], { yes: "🐟 " + lkQ("\"We cannot do it, Sir, because—\"") }),
lkzN("🫖 I took a kettle large and new", 8),
lkzHold(lkBo(-55, -98), 3, "Humpty Dumpty raises his voice almost to a scream: you wouldn't have been the messenger for ANYTHING!"),
lkzN("🍾 I took a corkscrew from the shelf", 6),
lkzN("👋 That's all. Good-bye.", 3),
lkzTN("Humpty Dumpty", "Say good-bye, and hold out your hand: he gives you one of his fingers to shake", "👋 I shouldn't know you again if we DID meet", 5),
lkzId("crash", lkzN("💥 A heavy crash shook the forest from end to end", 1)),
lkzHold(lkBo(-55, -97), 4, "The forest shakes from end to end: stand and look at the foot of the wall")
] });
lkbCh({ t: "The Lion and the Unicorn", txt: 6, p0: 1, start: { sc: "board", x: -55, z: -118, ry: 0 }, jump: 1, tune: "kings", keep: ["cake", "A slice of Looking-glass plum-cake", "🍰"],
words: "The wood of the Sixth Square, a moment after the crash. Soldiers come running through the trees, in twos and threes, then ten or twenty together, then such crowds that they seem to fill the whole forest. Get behind a tree, out of their way.",
intro: "The White King's wood",
state: { env: function () { return lkbStepAt("town") ? "windy" : "wood"; }, soldiers: lkzOn(null, "town"), fallen: true, fight: lkzOn("town", "pause") },
cast: [
lkc("alice", lkBo(-53, -150), { ry: Math.PI, from: "open", until: "town" }),
lkc("whiteking", lkBo(-55.5, -158), { ry: 0, until: "town", greet: "I've sent them all!" }),
lkc("haigha", lkBo(-55, -170), { ry: 0, from: "arrive", until: "town", greet: "(he does an Anglo-Saxon attitude)" }),
lkc("alice", lkBo(-50, -206), { key: "al2", ry: Math.PI, from: "town" }),
lkc("whiteking", lkBo(-48.6, -207.2), { key: "wk2", ry: Math.PI * 0.9, from: "town" }),
lkc("haigha", lkBo(-51.4, -205.4), { key: "hg2", ry: Math.PI, from: "town" }),
lkc("hatta", lkBo(-47.4, -206), { ry: Math.PI, from: "town", until: "drums1", greet: "(he only munches, and drinks some more tea)" }),
lkc("lion", lkBo(-58, -216), { ry: 0.5, from: "town", greet: "Are you animal, vegetable, or mineral?" }),
lkc("unicorn", lkBo(-52, -217), { ry: -0.6, from: "town", greet: "If you'll believe in me, I'll believe in you." }),
lkc("whitequeen", lkBo(-80, -232), { ry: -1.2, from: "queenrun", until: "unicorn", greet: "(she runs so fearfully quick)" })
],
steps: [
{ k: "read" },
lkzGo(lkBo(-52, -128), "Get behind a tree, out of the way of the soldiers running through the wood", { r: 2.4 }),
lkzN("🪖 Soldiers so uncertain on their feet", 1),
lkzN("🐎 Then came the horses", 1),
lkzHold(lkBo(-52, -128), 6, "Watch them go by, tumbling over each other, horses and men, all the King's horses and all the King's men"),
lkzId("open", lkzGo(lkBo(-54, -151), "Make your way on into an open place, where the White King is seated on the ground, busily writing in his memorandum-book", { r: 3 })),
lkzTN("The White King", "The White King looks up in delight", "👑 I've sent them all!", 2),
lkzPuzzle("🪖 The exact number", "How many soldiers did the King send?", ["Several thousand", "Four thousand two hundred and seven", "Ten or twenty"], 1, ["He has the exact number.", "", "More."], { yes: "🪖 " + lkQ("'Four thousand two hundred and seven, that's the exact number,' the King said"), pn: 1 }),
lkzN("👀 I see nobody on the road", 2),
lkzPuzzle("👀 To see Nobody", "Alice says she sees nobody on the road. What does the King wish?", ["That he had his spectacles", "That he had such eyes: to be able to see Nobody, and at that distance too!", "That Nobody would hurry"], 1, ["No.", "", "No."], { yes: "👀 " + lkQ("To be able to see Nobody!") }),
lkzId("arrive", lkzN("🕺 Anglo-Saxon attitudes", 2)),
lkzPuzzle("🔤 I love my love with an H", "Play Alice's game: I love my love with an H because he is Happy. I hate him with an H because he is Hideous. I fed him with... what?", ["Hay and Ham-sandwiches", "Honey and Hot buns", "Hominy"], 0, ["", "No.", "No."], { yes: "🥪 " + lkQ("I fed him with—with—with Ham-sandwiches and Hay."), pn: 1 }),
lkzN("🏔️ He lives on the Hill", 5),
lkzTN("Haigha", "The Messenger arrives, far too much out of breath to say a word", "🥪 Give me a ham sandwich!", 3),
lkzFind("bread", lkBo(-55.2, -168.6), "A ham sandwich", "Haigha opens the bag hanging round his neck: hand the King a sandwich (he devours it greedily)", {}),
lkzN("🌾 There's nothing but hay left now", 3),
lkzPuzzle("🌾 Nothing like it", "The hay revives the King a good deal. Alice says cold water would be better. What does the King reply?", ["That hay is best", "He didn't say there was nothing BETTER; he said there was nothing LIKE it", "That he hates water"], 1, ["No.", "", "No."], { yes: "🌾 " + lkQ("'I didn't say there was nothing BETTER,' the King replied. 'I said there was nothing LIKE it.'"), pn: 4 }),
lkzTN("The White King", "The King asks the Messenger who he passed on the road", "🚶 Nobody walks slower than you", 5),
lkzTN("Haigha", "The Messenger whispers the news, his hands to his mouth like a trumpet", "📯 They're at it again!", 2),
lkzN("👑 Fighting for the crown", 4),
lkzN("🎵 The Lion and the Unicorn were fighting for the crown", 1),
lkzId("town", lkzTravel("🏃 Let's run and see them", "", "town", "🏙️ <b>You trot on in silence till you come in sight of a great crowd</b> in the middle of which the Lion and the Unicorn are fighting.", "▶ Run", { pn: 1 })),
lkzN("🏃 A minute goes by so fearfully quick", 4),
lkzHold(lkBo(-50, -206), 6, "Stand close to Hatta and watch the fight: such a cloud of dust that at first you can't make out which is which"),
lkzTN("Hatta", "Hatta, the other messenger, has a cup of tea in one hand and bread-and-butter in the other", "☕ He's only just out of prison", 5),
lkzTN("Hatta", "Hatta swallows a large piece of bread-and-butter", "🥊 They're getting on very well", 3),
lkzPuzzle("🍞 The white bread and the brown", "Then they'll soon bring the white bread and the brown? Where is it?", ["In the King's bag", "Waiting for them now: Hatta is eating a bit of it", "At the bakery"], 1, ["No.", "", "No."], { yes: "🍞 " + lkQ("this is a bit of it as I'm eating."), pn: 2 }),
lkzId("pause", lkzN("⏸️ Ten minutes allowed for refreshments!", 2)),
lkzId("queenrun", lkzN("🏃‍♀️ Look, look! There's the White Queen running across the country!", 4)),
lkzId("unicorn", lkzTN("The Unicorn", "The Unicorn saunters by with his hands in his pockets, and his eye falls upon you", "🦄 What—is—this?", 4)),
lkzN("🦄 Is it alive?", 4),
lkzPuzzle("🦄 A bargain", "The Unicorn always thought children were fabulous monsters, and Alice always thought Unicorns were. What bargain does he offer?", ["To fight her", "If you'll believe in me, I'll believe in you", "To give her the crown"], 1, ["No.", "", "No."], { yes: "🦄 " + lkQ("'if you'll believe in me, I'll believe in you. Is that a bargain?'"), pn: 2 }),
lkzN("🍰 Fetch out the plum-cake, old man!", 4),
lkzTN("The Lion", "The Lion has joined you, tired and sleepy, his eyes half shut", "🦁 Are you animal, vegetable, or mineral?", 4),
lkzN("👑 Between the two great creatures", 2),
lkzN("🦁 All round the town, you chicken!", 6),
lkzN("🔪 Sawing away diligently", 1),
lkzPuzzle("🍰 Looking-glass cakes", "You've cut several slices, but they always join on again! How do you manage a Looking-glass cake?", ["Cut it with a sharper knife", "Hand it round first, and cut it afterwards", "Break it with your hands"], 1, ["They join on again.", "", "No."], { yes: "🍰 " + lkQ("'Hand it round first, and cut it afterwards.'"), pn: 1 }),
lkzGather("cake", lkBo(-55, -214), 3, "A slice of plum-cake", "Carry the dish round: the cake divides itself into three pieces as you go; take each slice to the King, the Lion and the Unicorn", { spread: 5 }),
lkzN("🍰 This isn't fair!", 3),
lkzId("drums1", lkzN("🥁 The drums began", 2)),
lkzHold(lkBo(-55, -210), 5, "The air is full of drums: put your hands over your ears, and jump across the little brook in your terror"),
lkzN("🥁 Drum them out of town", 2)
] });
lkbCh({ t: "\"It's My Own Invention\"", txt: 7, p0: 1, start: { sc: "board", x: -55, z: -238, ry: 0 }, jump: 1, tune: "knight", keep: ["crown", "A golden crown", "👑"],
words: "The Seventh Square, all forest, after the drums have died away to a dead silence. Alice lifts up her head in some alarm: there is no one to be seen, only the great dish at her feet that she cut the plum-cake on. So it wasn't a dream after all, unless we're all part of the same dream.",
intro: "The Knights' wood",
state: { env: function () { return lkbStepAt("eighth") ? "eighth" : "windy"; } },
cast: [
lkc("alice", lkBo(-54.6, -242), { ry: Math.PI, until: "eighth" }),
lkc("rknight", lkBo(-57.4, -246), { ry: 0, until: "rout", greet: "Ahoy! Ahoy! Check! You're my prisoner!" }),
lkc("rkhorse", lkBo(-59.4, -247.4), { ry: 0.6, until: "rout" }),
lkc("wknight", lkBo(-52.2, -245.6), { ry: 0, until: "song", greet: "It's my own invention." }),
lkc("wkhorse", lkBo(-50.2, -247.6), { ry: -0.4, until: "song" }),
lkc("wknight", lkBo(-53.4, -276), { key: "wk2", ry: 0, from: "song", until: "eighth", greet: "You've only a few yards to go, down the hill and over that little brook." }),
lkc("wkhorse", lkBo(-51.6, -277), { key: "wh2", ry: 0, from: "song", until: "eighth" })
],
steps: [
{ k: "read" },
lkzN("🐎 Ahoy! Ahoy! Check!", 2),
lkzN("🐎 This time it was a White Knight", 1),
lkzTN("The Red Knight", "The Red Knight says you are his prisoner", "⚔️ She's MY prisoner, you know!", 1),
lkzTN("The White Knight", "The White Knight has tumbled off his horse at your side", "⚔️ But then I came and rescued her!", 1),
lkzN("⚔️ We must fight for her, then", 3),
lkzHold(lkBo(-53, -240), 6, "Get behind a tree out of the way of the blows, and watch them banging away at each other"),
lkzPuzzle("⚔️ The Rules of Battle", "Watching the fight, what do the Rules of Battle seem to be?", ["They bow first, and never fall", "If one Knight hits the other, he knocks him off his horse; if he misses, he tumbles off himself; and they always fall on their heads", "They take turns"], 1, ["They fall all the time.", "", "No."], { yes: "⚔️ " + lkQ("Another Rule of Battle, that Alice had not noticed, seemed to be that they always fell on their heads"), pn: 2 }),
lkzId("rout", lkzN("🏆 It was a glorious victory, wasn't it?", 2)),
lkzTN("The White Knight", "The White Knight comes up panting: you want to be a Queen", "♟️ When you've crossed the next brook", 1),
lkzN("🪖 May I help you off with your helmet?", 3),
lkzTN("The White Knight", "He sees you admiring the queer little deal box fastened upside-down across his shoulders", "📦 It's my own invention", 2),
lkzPuzzle("📦 Upside-down", "Why does the White Knight carry his box upside-down?", ["To keep it from falling", "So that the rain can't get in", "It came that way"], 1, ["No.", "", "No."], { yes: "🌧️ " + lkQ("I carry it upside-down, so that the rain can't get in.") }),
lkzN("🐝 In hopes some bees may make a nest in it", 5),
lkzPuzzle("🪤 The mouse-trap", "It isn't very likely there would be any mice on the horse's back. Why does he carry a mouse-trap?", ["To catch his supper", "If they DO come, he doesn't choose to have them running all about", "For the bees"], 1, ["No.", "", "No."], { yes: "🪤 " + lkQ("but if they DO come, I don't choose to have them running all about."), pn: 2 }),
lkzN("🐴 Provided for EVERYTHING", 2),
lkzPuzzle("🦈 The anklets", "The horse has anklets round its feet. What are they for?", ["For dancing", "To guard against the bites of sharks", "To make it go faster"], 1, ["No.", "", "No."], { yes: "🦈 " + lkQ("'To guard against the bites of sharks,' the Knight replied."), pn: 1 }),
lkzN("🍰 It's meant for plum-cake", 3),
lkzHold(lkBo(-52, -245), 5, "Hold the bag open very carefully while the Knight tries to put the great dish into it (he is so awkward about it)"),
lkzTN("The White Knight", "Set off with him; the wind is VERY strong here", "💨 I hope you've got your hair well fastened on?", 4),
lkzPuzzle("🌳 The plan", "The Knight has a plan for keeping the hair from FALLING off. What is it?", ["A net", "Take an upright stick and make your hair creep up it, like a fruit-tree: things never fall upwards", "Glue"], 1, ["No.", "", "No."], { yes: "🌳 " + lkQ("Then you make your hair creep up it, like a fruit-tree."), pn: 3 }),
lkzN("🐎 Whenever the horse stopped", 2),
lkzHold(lkBo(-54, -252), 8, "Walk beside the horse, out of reach, and help him up each time he falls off (he falls off in front when it stops, and behind when it goes on)"),
lkzN("🐎 Plenty of practice!", 5),
lkzTN("The White Knight", "He waves his right arm, explaining", "🐎 The great art of riding", 3),
lkzN("🐴 You ought to have a wooden horse on wheels", 5),
lkzTN("The White Knight", "After a short silence, the Knight goes on", "💡 I'm a great hand at inventing things", 3),
lkzPuzzle("🚪 Getting over a gate", "The only difficulty is with the feet; the head is high enough already. What is the Knight's way of getting over a gate?", ["Climb it", "First put your head on the top of the gate, then stand on your head, and your feet are high enough", "Go round"], 1, ["No.", "", "No."], { yes: "🚪 But it would be rather hard, he is afraid. He hasn't tried it yet.", pn: 4 }),
lkzN("🪖 A helmet like a sugar-loaf", 2),
lkzN("🪖 All kinds of fastness", 3),
lkzN("🕳️ He rolled out of the saddle into a deep ditch", 1),
lkzGo(lkBo(-58, -258), "Run to the side of the ditch, and drag him out by the feet", { r: 2.4 }),
lkzN("🙃 Head downwards", 3),
lkzTN("The White Knight", "The cleverest thing he ever did", "🍮 Inventing a new pudding", 4),
lkzPuzzle("🍮 The pudding", "What did the Knight's pudding begin with?", ["Flour and eggs", "Blotting paper", "Plum-cake"], 1, ["No.", "", "No."], { yes: "🍮 " + lkQ("'It began with blotting paper,' the Knight answered with a groan."), pn: 2 }),
lkzN("🍮 Gunpowder and sealing-wax", 4),
lkzTN("The White Knight", "You are sad, the Knight says: let him sing you a song to comfort you", "🎵 HADDOCKS' EYES", 4),
lkzPuzzle("🎵 The song's names", "The name of the song is CALLED \"Haddocks' Eyes\". The name really IS \"The Aged Aged Man\". The song is called \"Ways and Means\". What does the song really IS?", ["\"I give thee all, I can no more\"", "\"A-sitting on a Gate\"", "\"Jabberwocky\""], 1, ["That is the tune.", "", "No."], { yes: "🎵 " + lkQ("The song really IS \"A-SITTING ON A GATE\""), pn: 6 }),
lkzId("song", lkzGo(lkBo(-54, -273), "Walk on to the end of the wood, where he stops his horse and lets the reins fall on its neck", { r: 2.4 })),
lkzN("🎵 Slowly beating time with one hand", 3),
lkzHold(lkBo(-54, -273), 8, "Lean against a tree and listen: the mild blue eyes and kindly smile, the setting sun in his hair and on his armour, the horse cropping the grass"),
lkzN("🎵 I saw an aged aged man", 5),
lkzN("🎵 I hunt for haddocks' eyes", 5),
lkzN("👋 You've only a few yards to go", 3),
lkzHold(lkBo(-54, -276), 5, "Wait and wave your handkerchief when he gets to that turn in the road: it'll encourage him"),
lkzN("👋 Now for the last brook", 2),
lkzId("eighth", lkzSpot("The last brook", "Run down the hill and jump over the last brook", { at: lkBo(-55, -283) })),
lkzN("👑 A lawn as soft as moss", 1),
lkzFind("crown", lkBo(-55, -305), "Something very heavy, fitting tight all round your head", "Lie down to rest on the lawn: something is on your head! Lift it off and look at it", {}),
lkzN("👑 It was a golden crown.", 2)
] });
lkbCh({ t: "Queen Alice", txt: 8, p0: 1, start: { sc: "board", x: -55, z: -308, ry: 0 }, jump: 1, tune: "queen", keep: ["sceptre", "A sceptre, for Queen Alice", "🪄"],
words: "The Eighth Square, a lawn as soft as moss with little flower-beds dotted about it. Alice has a golden crown on her head: she is a Queen. She walks about rather stiffly at first, for fear it should come off.",
intro: "The Eighth Square",
state: { env: function () { return lkbStepAt("hall") ? "feast" : "eighth"; }, chaos: lkzOn("chaos") },
cast: [
lkc("alice", lkBo(-55, -322), { ry: Math.PI, until: "door" }),
lkc("redqueen", lkBo(-56.4, -321.6), { ry: Math.PI * 0.8, until: "asleep", greet: "Speak when you're spoken to!" }),
lkc("whitequeen", lkBo(-53.6, -321.6), { ry: -Math.PI * 0.8, until: "asleep", greet: "Bread-and-butter, bread-and-butter." }),
lkc("redqueen", lkBo(-56.2, -322.4), { key: "rq2", lie: true, ry: 0.3, from: "asleep", until: "door", greet: "(she snores, to a tune)" }),
lkc("whitequeen", lkBo(-53.8, -322.4), { key: "wq2", lie: true, ry: -0.3, from: "asleep", until: "door", greet: "(she snores, to a tune)" }),
lkc("alice", lkBo(-54, -350), { key: "al2", ry: Math.PI, from: "door", until: "hall" }),
lkc("frog", lkBo(-50.4, -351.6), { ry: -0.8, from: "frog", until: "hall", greet: "What is it, now?" }),
lkc("redqueen", lkR("castle", -1.0, -10.2), { key: "rq3", ry: 0, from: "hall", greet: "Pudding—Alice; Alice—Pudding." }),
lkc("whitequeen", lkR("castle", 1.0, -10.2), { key: "wq3", ry: 0, from: "hall", until: "soup", greet: "We must support you, you know." }),
lkc("frog", lkR("castle", -3.2, -2), { key: "fr2", ry: Math.PI / 2, from: "hall" }),
lkc("chess", lkR("castle", 3.2, -4), { key: "g1", chess: "bishop:w", s: 0.6, name: "A guest at the feast", from: "hall", greet: "Ninety times nine!" }),
lkc("chess", lkR("castle", -3.2, -6), { key: "g2", chess: "knight:r", s: 0.6, name: "A guest at the feast", from: "hall", greet: "Fill up the glasses!" }),
lkc("goat", lkR("castle", 3.2, -1), { key: "g3", name: "The Goat, a guest", from: "hall" })
],
steps: [
{ k: "read" },
lkzN("👑 Well, this IS grand!", 1),
lkzHold(lkBo(-55, -310), 5, "Walk about a little, rather stiffly, as Alice does, so as not to let your crown come off"),
lkzN("👑 The Red Queen and the White Queen, one on each side", 1),
lkzGo(lkBo(-55, -320.8), "Go and sit between them", { r: 2 }),
lkzTN("The Red Queen", "Alice begins to ask whether the examination is over", "🤐 Speak when you're spoken to!", 1),
lkzN("🧐 If everybody obeyed that rule", 4),
lkzPuzzle("🧐 Only \"if\"", "Alice only said \"if\". What does the Red Queen say about what you SHOULD have meant?", ["That Queens are always right", "What do you suppose is the use of a child without any meaning? Even a joke should have some meaning", "Nothing"], 1, ["No.", "", "No."], { yes: "🧐 Even a joke should have some meaning, and a child's more important than a joke, says the Red Queen.", pn: 6 }),
lkzN("😠 A nasty, vicious temper", 2),
lkzTN("The Red Queen", "The Red Queen breaks the silence", "🍽️ I invite you to Alice's dinner-party", 3),
lkzN("📚 Manners are not taught in lessons", 2),
lkzPuzzle("➕ Addition", "The White Queen asks: what's one and one and one and one and one and one and one and one and one and one?", ["Ten", "I don't know: I lost count", "Eleven"], 1, ["She's not sure that's right.", "", "No."], { yes: "➕ " + lkQ("'I don't know,' said Alice. 'I lost count.'"), pn: 2 }),
lkzN("➖ Take nine from eight", 2),
lkzPuzzle("➗ Division", "Divide a loaf by a knife: what's the answer to that?", ["Two halves", "Bread-and-butter, of course", "Crumbs"], 1, ["No.", "", "No."], { yes: "🍞 Bread-and-butter, of course, says the Red Queen, answering for you.", pn: 2 }),
lkzPuzzle("🐕 Another Subtraction sum", "Take a bone from a dog: what remains?", ["Nothing would remain", "The dog's temper would remain", "The bone"], 1, ["Wrong, as usual.", "", "No."], { yes: "🐕 " + lkQ("'Wrong, as usual,' said the Red Queen: 'the dog's temper would remain.'"), pn: 4 }),
lkzN("🐕 Then if the dog went away", 5),
lkzN("🔤 Of course you know your A B C?", 6),
lkzTN("The White Queen", "The Red Queen asks a useful question, and the White Queen joins in", "🌾 How is bread made?", 5),
lkzHold(lkBo(-54.2, -321.6), 4, "The Queens set to work fanning Alice with bunches of leaves till she begs them to leave off: it blows her hair about so"),
lkzN("🇫🇷 What's the French for fiddle-de-dee?", 4),
lkzPuzzle("👑 Queens never make bargains", "Alice offers to tell the French for fiddle-de-dee if the Red Queen will tell her what language it is. What does the Queen say?", ["Agreed!", "Queens never make bargains", "It's Looking-glass"], 1, ["No.", "", "No."], { yes: "👑 " + lkQ("'Queens never make bargains.'"), pn: 2 }),
lkzN("⚡ The cause of lightning", 4),
lkzN("📅 Days and nights two or three at a time", 8),
lkzTN("The White Queen", "The White Queen goes on in a low voice", "⛈️ Such a thunderstorm", 8),
lkzTN("The Red Queen", "The Red Queen takes one of the White Queen's hands", "💤 She's tired, poor thing!", 7),
lkzN("🎵 Hush-a-by lady, in Alice's lap!", 3),
lkzId("asleep", lkzN("💤 Two round heads", 2)),
lkzHold(lkBo(-55, -322), 6, "Sit still with two Queens asleep in your lap, and listen: the snoring sounds more like a tune every minute"),
lkzId("door", lkzGo(lkBo(-54, -349), "Before an arched doorway with QUEEN ALICE over it in large letters: the Queens are gone. Go up to the door", { r: 2.4 })),
lkzN("🚪 An arched doorway", 1),
lkzPuzzle("🔔 Which bell?", "There is a bell-handle on each side of the doorway: one marked \"Visitors' Bell\", the other \"Servants' Bell\". Which must Alice ring?", ["The Visitors' Bell", "The Servants' Bell", "Neither: she isn't a visitor, and she isn't a servant. There ought to be one marked \"Queen\""], 2, ["She isn't a visitor.", "She isn't a servant.", ""], { yes: "🔔 " + lkQ("There OUGHT to be one marked \"Queen,\" you know—"), pn: 1 }),
lkzSpot(/The (Visitors'|Servants') Bell/, "Knock, and ring one of the bells anyway", { at: lkBo(-52.6, -352.4) }),
lkzId("frog", lkzN("🐸 A very old Frog, sitting under a tree", 2)),
lkzTN("The old Frog", "The very old Frog, dressed in bright yellow, gets up and hobbles slowly towards you", "🐸 What is it, now?", 8),
lkzPuzzle("🐸 Answering the door", "You've been knocking at the door. What does the Frog say about that?", ["It's quite right", "Shouldn't do that: it vexes it. Let it alone, and it'll let you alone", "Ring louder"], 1, ["No.", "", "No."], { yes: "🐸 " + lkQ("'Shouldn't do that—shouldn't do that—' the Frog muttered. 'Vexes it, you know.'"), pn: 2 }),
lkzN("🎶 To the Looking-Glass world it was Alice that said", 4),
lkzN("🎶 Ninety times nine!", 5),
lkzId("hall", lkzTravel("🏰 The banquet", "", "", null, "▶ Go in", { pn: 1 })),
lkzN("🍽️ Three chairs at the head of the table", 1),
lkzGo(lkR("castle", 0, -9.6), "Walk up the large hall to the empty chair between the two Queens at the head of the table", { r: 1.4 }),
lkzId("soup", lkzN("🍖 Put on the joint!", 2)),
lkzPuzzle("🍖 Etiquette", "May you give the Red Queen a slice of the leg of mutton you have just been introduced to?", ["Certainly", "Certainly not: it isn't etiquette to cut any one you've been introduced to", "Only a small one"], 1, ["No.", "", "No."], { yes: "🍖 " + lkQ("it isn't etiquette to cut any one you've been introduced to. Remove the joint!"), pn: 2 }),
lkzN("🍮 Pudding—Alice; Alice—Pudding", 3),
lkzFind("dish", lkR("castle", 0.4, -8.8), "The plum-pudding", "Call out \"Waiter! Bring back the pudding!\" and take it, and cut a slice of it for the Red Queen", {}),
lkzN("🍮 What impertinence!", 2),
lkzTN("The Red Queen", "Make a remark to the Red Queen", "🐟 Fishes and poetry", 5),
lkzN("🐟 First, the fish must be caught", 5),
lkzPuzzle("🥂 While you think", "The Red Queen says take a minute to think about the riddle, and then guess. What will they do meanwhile?", ["Eat the pudding", "Drink your health: Queen Alice's health!", "Sing again"], 1, ["No.", "", "No."], { yes: "🥂 " + lkQ("'Take a minute to think about it, and then guess,' said the Red Queen."), pn: 1 }),
lkzN("🎤 A neat speech", 6),
lkzId("chaos", lkzN("🕯️ All sorts of things happened in a moment", 2)),
lkzHold(lkR("castle", 0, -9.2), 5, "The candles grow up to the ceiling like a bed of rushes with fireworks at the top; the bottles take a pair of plates each and fly about. Hold your place!"),
lkzN("🍲 Already several of the guests were lying down in the dishes", 2),
lkzPuzzle("🧺 I can't stand this any longer!", "The White Queen has gone into the soup-tureen; the soup ladle is walking up the table towards you. What does Alice do?", ["Hides under the table", "Seizes the table-cloth with both hands and gives one good pull, so that everything comes crashing down", "Runs out of the door"], 1, ["No.", "", "No."], { yes: "🧺 " + lkQ("'I can't stand this any longer!' she cried as she jumped up and seized the table-cloth with both hands"), pn: 1 }),
lkzN("👑 And as for YOU", 2)
] });
(function () { var C = LKB_CH[LKB_CH.length - 1]; C.steps.forEach(function (s) { if (s.id === "hall")
s.done = function () { lkwGo(lkR("castle", 0, 10)(), "🏰 <b>You go in at the door,</b> and there is a sudden silence: about fifty guests, of all kinds, round a long table.", function () { lkbPopulate(); lkbStepBegin(); }); }; }); })();
lkbCh({ t: "Shaking", txt: 9, p0: 1, start: { sc: "board", x: 600, z: 690, y: LKW_RY, ry: 0 }, jump: 1, tune: "feast", keep: ["redqueen", "The Red Queen, three inches high again", "♛"],
words: "The banquet hall, everything crashing down: plates, dishes, guests and candles in a heap upon the floor. And the Red Queen, the cause of all the mischief, has run down the table into the soup-tureen ... no, she is a doll again now, standing on the table among the wreck.",
intro: "The great hall, in ruins",
state: { env: "feast", chaos: true },
cast: [lkc("chess", lkRy("castle", 0.2, -8.6, 0.78), { key: "rqd", chess: "queen:r", s: 0.14, name: "The Red Queen, little again", greet: "(she makes no resistance whatever)" })],
steps: [
{ k: "read" },
lkzGo(lkR("castle", 0, -9.4), "Take the little Red Queen off the table", { r: 1.2 }),
lkzHold(lkR("castle", 0, -9.4), 6, "Shake her backwards and forwards with all your might!"),
lkzN("🐈‍⬛ Shorter—and fatter—and softer—and rounder", 1)
] });
lkbCh({ t: "Waking", txt: 10, p0: 1, start: { sc: "home", x: -150.2, z: 151.6, y: LKW_RY, ry: 0 }, jump: 1, tune: "home", keep: ["kitty", "A wisp of black kitten's fur", "🐈‍⬛"],
words: "Your eyes open. The drawing-room, the fire, the snow at the window, the fourth of November still; and in your hands, purring, the black kitten.",
intro: "Alice's drawing-room again",
state: { env: "snow" },
cast: [lkc("alice", lkR("drawing", -1.3, -1.5), { ry: 2.6 }), lkc("kitty", lkR("drawing", -0.9, -1.2), { ry: 0.4, s: 0.9 })],
steps: [
{ k: "read" },
lkzHold(lkR("drawing", -0.6, -1.2), 4, "Rub your eyes and look about you: the fire, the glass over the chimney-piece, the snow")
] });
lkbCh({ t: "Which Dreamed It?", txt: 11, p0: 1, start: { sc: "home", x: -150.2, z: 151.6, y: LKW_RY, ry: 0 }, jump: 1, tune: "dream", keep: ["dream", "The question of who dreamed it", "💭"],
words: "Alice is rubbing her eyes and talking to the kitten, respectfully, yet with some severity.",
intro: "Alice's drawing-room, after the dream",
state: { env: "snow" },
cast: [
lkc("alice", lkR("drawing", -0.6, -2.0), { ry: Math.PI * 0.9 }),
lkc("kitty", lkR("drawing", -0.2, -2.3), { ry: 0.4, s: 0.9 }),
lkc("dinah", lkR("drawing", -1.6, -2.6), { ry: 1.2 }),
lkc("snowdrop", lkR("drawing", -1.3, -2.5), { ry: -1.4, s: 0.9 })
],
steps: [
{ k: "read" },
lkzTN("Alice", "Alice talks to the kitten: it ALWAYS purrs", "🐈‍⬛ Whatever you say to them, they ALWAYS purr", 2),
lkzFind("redqueen", lkR("drawing", 1.6, 0.6), "The Red Queen", "Hunt among the chessmen on the table, and find the Red Queen for Alice", {}),
lkzN("♛ Now, Kitty! Confess that was what you turned into!", 2),
lkzTN("Alice", "Alice catches the kitten up and gives it one little kiss", "🙇 Curtsey while you're thinking what to purr", 1),
lkzTN("Alice", "Alice looks over her shoulder at the White Kitten", "🐈 Snowdrop, my pet!", 1),
lkzTN("Alice", "Alice settles down with one elbow in the rug, her chin in her hand", "🐈 And what did DINAH turn to?", 1),
lkzN("🐟 All about fishes!", 1),
lkzPuzzle("💭 Which dreamed it?", "Now, Kitty, let's consider who it was that dreamed it all. It must have been either Alice or the Red King. He was part of her dream, of course; but then she was part of his dream, too! Which do YOU think it was?", ["Alice", "The Red King", "The black kitten"], 0, ["", "", ""], { yes: "💭 The kitten only licks its paw. " + lkQ("Which do YOU think it was?"), pn: 2, any: 1 }),
lkzN("⛵ A boat beneath a sunny sky", 1),
lkzN("⛵ Children three that nestle near", 3),
lkzN("⛵ Still she haunts me, phantomwise", 4)
] });
var LKH_HOUSE = { x: 330, z: 176 };
function lkhHouse(G) { return __ZC(515, 222, this, arguments, new.target); }
(function () {
if (typeof wdwBank === "function") {
var b0 = wdwBank;
wdwBank = function (G) { var r = b0.apply(this, arguments); lkhHouse(G); return r; };
}
try {
if (typeof lglPlan === "function")
lglPlan = null;
}
catch (e) { }
})();
function lkbOpenIn() { if (WLD.on === LKW_KEY) {
lkbOpen();
return;
} lkwEnter({}); }
