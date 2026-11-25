/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var CVW_KEY = "cthulhu", CVW_NAME = "The Call of Cthulhu", CVW_LONG = "The Call of Cthulhu: Providence, the swamp, the sea and R'lyeh";
var CVW = { base: -13000000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, geos: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], moving: false, ride: null, night: 0, lights: 0, water: [], inst: [], beasts: [], hgt: null, rooms: [], doors: [], envK: null, st: {} };
var CVW_ERA = " It is the 1920s (or 1907-08 in Louisiana and St. Louis), in H. P. Lovecraft's story The Call of Cthulhu. Speak in the manner of a person of that time and place, briefly and in character; never give away what happens later in the story; keep it suitable for a general audience.";
var CVW_SC = {
providence: { x: 0, name: "Providence, Rhode Island", bound: 620, env: "prov" },
bayou: { x: 6000, name: "The swamps south of New Orleans", bound: 620, env: "swampdusk" },
harbour: { x: 12000, name: "Sydney Cove, New South Wales", bound: 520, env: "harbour" },
oslo: { x: 18000, name: "Oslo, under the Egeberg", bound: 460, env: "oslo" },
sea: { x: 24000, name: "The South Pacific", bound: 700, env: "sea" },
rlyeh: { x: 30000, name: "R'lyeh", bound: 620, env: "rlyeh" }
};
function cvwScAt(x) { var best = null, bd = 1e9; for (var k in CVW_SC) {
var d = Math.abs(x - CVW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 5000 ? best : null; }
var CVW_AT = {};
function cvwAtPt(at) { if (typeof at === "string")
at = CVW_AT[at]; if (typeof at === "function")
at = at(); if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
var CV_LOOK = { stone: 0x40554A, stoneD: 0x26342C, fleck: 0xC8B060, ooze: 0x3E5A34, oozeHi: 0x6A8A4A, murk: 0x0C0A14, murkLow: 0x1E2A26, glow: 0x7AD8A8, sky: 0x05040C };
var CVW_ENV = {
prov: { top: 0x6A84A8, low: 0xD8D4CC, fog: 0xB8B6B0, fogD: 0.0026, sun: 0.72, sunCol: 0xF4ECDC, sunDir: [0.4, 0.55, 0.3], hemi: 0.72, hemiCol: 0xD0D6E0, hemiGround: 0x4A4438 },
provspring: { top: 0x5A8CD0, low: 0xE6E8E2, fog: 0xC8D0D0, fogD: 0.0018, sun: 0.98, sunCol: 0xFFF2DC, sunDir: [0.4, 0.75, 0.3], hemi: 0.76, hemiCol: 0xDCE6F0, hemiGround: 0x4A5A34 },
provnight: { top: 0x060A18, low: 0x1E2232, fog: 0x161A26, fogD: 0.0045, sun: 0.24, sunCol: 0xB8C4E8, sunDir: [-0.3, 0.7, -0.4], hemi: 0.32, hemiCol: 0x5A6A98, hemiGround: 0x0C0E12, stars: 0.7 },
winter: { top: 0x7C94B8, low: 0xEAD8CA, fog: 0xCAC6C8, fogD: 0.0032, sun: 0.55, sunCol: 0xE8ECF4, sunDir: [0.3, 0.4, -0.5], hemi: 0.62, hemiCol: 0xC8D0DC, hemiGround: 0x6A6E70 },
swampdusk: { top: 0x3A4A6A, low: 0xC88A5A, fog: 0x6A6A50, fogD: 0.0068, sun: 0.55, sunCol: 0xFFB070, sunDir: [-0.75, 0.22, 0.3], hemi: 0.6, hemiCol: 0xC8B898, hemiGround: 0x2A2A1A },
swampnight: { top: 0x04060C, low: 0x1A1410, fog: 0x12120E, fogD: 0.0085, sun: 0.16, sunCol: 0xB8C0E0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.26, hemiCol: 0x4A5A6A, hemiGround: 0x0A0A06, stars: 0.5 },
swampfire: { top: 0x0E0A12, low: 0x4A2412, fog: 0x341C10, fogD: 0.007, sun: 0.3, sunCol: 0xFF9A50, sunDir: [0.2, 0.5, 0.1], hemi: 0.46, hemiCol: 0xD08A5A, hemiGround: 0x24140A, stars: 0.4 },
swampday: { top: 0x6A8AA8, low: 0xD8D8C0, fog: 0x9AA088, fogD: 0.0055, sun: 0.8, sunCol: 0xFFF0D0, sunDir: [0.3, 0.85, 0.2], hemi: 0.68, hemiCol: 0xC8D4B8, hemiGround: 0x3A3A20 },
harbour: { top: 0x5A86C4, low: 0xF2D8B4, fog: 0xDCCCB4, fogD: 0.0014, sun: 1.15, sunCol: 0xFFC890, sunDir: [0.7, 0.38, 0.3], hemi: 0.74, hemiCol: 0xF0DCC0, hemiGround: 0x5A4A3A },
oslo: { top: 0x6A84A8, low: 0xE0D8C8, fog: 0xC8C0B0, fogD: 0.0024, sun: 0.74, sunCol: 0xFFD8A8, sunDir: [0.5, 0.45, 0.2], hemi: 0.68, hemiCol: 0xE0D8C8, hemiGround: 0x5A4A2A },
sea: { top: 0x4A7AB8, low: 0xDCE6EE, fog: 0xB8C8D4, fogD: 0.0011, sun: 0.95, sunCol: 0xFFF0D8, sunDir: [-0.5, 0.6, 0.3], hemi: 0.76, hemiCol: 0xDCE6F0, hemiGround: 0x2A4A5A },
storm: { top: 0x1A2028, low: 0x46505A, fog: 0x36404A, fogD: 0.0062, sun: 0.3, sunCol: 0xB8C0D0, sunDir: [0.2, 0.9, 0.1], hemi: 0.48, hemiCol: 0x8A94A8, hemiGround: 0x14181C },
rlyeh: { top: 0x14261C, low: 0x6A9A6A, fog: 0x4E7A56, fogD: 0.0052, sun: 0.9, sunCol: 0xDCE8A4, sunDir: [0.5, 0.42, -0.3], hemi: 0.9, hemiCol: 0xA0C49C, hemiGround: 0x1E2A1A, stars: 0.2 },
rlyehdark: { top: 0x0A1610, low: 0x34583C, fog: 0x28462E, fogD: 0.0068, sun: 0.62, sunCol: 0xB4CC84, sunDir: [0.5, 0.42, -0.3], hemi: 0.72, hemiCol: 0x84AA84, hemiGround: 0x101A10, stars: 0.2 },
dream: { top: 0x05031A, low: 0x24104A, fog: 0x140C24, fogD: 0.0062, sun: 0.3, sunCol: 0x9AC8B0, sunDir: [0.2, 0.8, -0.2], hemi: 0.46, hemiCol: 0x8A7AB8, hemiGround: 0x080A0A, stars: 1 },
indoor: { top: 0x2A2018, low: 0x4A3A2A, fog: 0x3A2E22, fogD: 0.012, sun: 0.24, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 0.8, hemiCol: 0xFFE6C0, hemiGround: 0x3A2A1E },
study: { top: 0x221A14, low: 0x3A2E22, fog: 0x2E241A, fogD: 0.013, sun: 0.22, sunCol: 0xFFD090, sunDir: [0.2, 0.9, 0.1], hemi: 0.72, hemiCol: 0xFFDDB0, hemiGround: 0x2A1E14 },
garret: { top: 0x140E0A, low: 0x2A1E14, fog: 0x1E160E, fogD: 0.016, sun: 0.12, sunCol: 0xFFC890, sunDir: [0.2, 0.9, 0.1], hemi: 0.55, hemiCol: 0xFFD0A0, hemiGround: 0x1A120A },
cell: { top: 0x0E0E10, low: 0x2A2A2E, fog: 0x1A1A1E, fogD: 0.02, sun: 0.12, sunCol: 0xD8D8E8, sunDir: [0.3, 0.9, 0.1], hemi: 0.48, hemiCol: 0xB8B8C8, hemiGround: 0x1A1A1A },
hall: { top: 0x2A2620, low: 0x4A443A, fog: 0x3A362E, fogD: 0.009, sun: 0.3, sunCol: 0xFFE8C8, sunDir: [0.2, 0.9, 0.1], hemi: 0.86, hemiCol: 0xFFF0D8, hemiGround: 0x3A3228 }
};
var CVW_Q = [];
function cvQ(s) { CVW_Q.push(s); return "<i>“" + s + "”</i>"; }
function cvQs() { return Array.prototype.slice.call(arguments).map(function (s) { return "<p style='margin:6px 0'>" + cvQ(s) + "</p>"; }).join(""); }
function cvEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function cvSrc(part) { return "<div style='font-size:11px;opacity:.65;margin-top:4px'>H. P. Lovecraft, The Call of Cthulhu (1928)" + (part ? ", " + part : "") + "</div>"; }
function cvwLite() { return typeof LITE !== "undefined" && !!LITE; }
function cvwPhotoTex(name, mpt, nrm) { return __ZC(526, 0, this, arguments, new.target); }
function cvwS(name, col, mpt, o) { return __ZC(526, 1, this, arguments, new.target); }
function cvwCanvas(key, w, h, fn) { if (CVW.tex[key])
return CVW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (CVW.tex[key] = t); }
function cvwM(key, make) { return CVW.mats[key] || (CVW.mats[key] = make()); }
function cvwLam(col, o) { return __ZC(526, 2, this, arguments, new.target); }
function cvwShine(col, r, mt) { return cvwM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function cvwGlowM(col, op) { return cvwM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function cvwNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function cvwLeafTex() { return cvwPhotoTexAlpha(); }
function cvwPhotoTexAlpha() { var k = "leafpng"; if (CVW.tex[k])
return CVW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (CVW.tex[k] = t); }
function cvwFrondTex(kind) { return __ZC(526, 3, this, arguments, new.target); }
function cvwBambooTex() { return __ZC(526, 4, this, arguments, new.target); }
function cvwReedTex(kind) { return __ZC(526, 5, this, arguments, new.target); }
function cvwGrassTex() { return __ZC(526, 6, this, arguments, new.target); }
function cvwFlowerTex(col) { return __ZC(526, 7, this, arguments, new.target); }
function cvwSkinTex(kind) { return __ZC(526, 8, this, arguments, new.target); }
function cvwRippleTex() { return __ZC(526, 9, this, arguments, new.target); }
function cvwWaterM(col, op) { return cvwM("water" + col + "|" + op, function () { var t = cvwRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var CVW_CELL = 48;
function cvwKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / CVW_CELL), b = Math.floor(x1 / CVW_CELL), c = Math.floor(z0 / CVW_CELL), d = Math.floor(z1 / CVW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function cvwGridAdd(S) { var g = CVW.sgrid || (CVW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; cvwKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function cvwSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; CVW.solids.push(S); cvwGridAdd(S); return S; }
function cvwRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; CVW.solids.push(S); cvwGridAdd(S); return S; }
function cvwSolidAt(x, z, feet) { return __ZC(526, 10, this, arguments, new.target); }
function cvwFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; CVW.floors.push(F); return F; }
function cvwRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; CVW.floors.push(F); return F; }
function cvwFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function cvwFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function cvwFloorAt(x, z, feet) { var best = null; for (var i = 0; i < CVW.floors.length; i++) {
var F = CVW.floors[i];
if (F.off || !cvwFloorIn(F, x, z))
continue;
var y = cvwFloorY(F, x, z);
if (y <= feet + 1.1 && (best === null || y > best))
best = y;
} return best; }
function cvwSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; CVW.spots.push(S); return S; }
function cvwPerson(seed, x, z, y, o, ry) { return __ZC(526, 11, this, arguments, new.target); }
function cvwTalk(P, name, persona, greet, r, fn) { CVW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona + CVW_ERA, greet: greet } }); return P; }
function cvwTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(526, 12, this, arguments, new.target); }
function cvwHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function cvwNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = cvwHash(ix, iz), b = cvwHash(ix + 1, iz), c = cvwHash(ix, iz + 1), d = cvwHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function cvwFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * cvwNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function cvwSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function cvwWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), cvwWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); CVW.water.push(m); return m; }
var CVW_GEO = {};
function cvwGeo(k, make) { if (CVW_GEO[k])
return CVW_GEO[k]; var g = make(); g.userData.shared = 1; return (CVW_GEO[k] = g); }
function cvwVcM(k) { return cvwM(k, function () { var m = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }); }
function cvwBlade(pos, col, idx, bx, bz, h, w, ry, lx, lz, c0, c1) { return __ZC(526, 13, this, arguments, new.target); }
function cvwReedClumpGeo() { return __ZC(526, 14, this, arguments, new.target); }
function cvwCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function cvwFronds(n, len, wid, droop, y0, ring) { return __ZC(526, 15, this, arguments, new.target); }
function cvwInst(P, geo, mat, list, o) { return __ZC(526, 16, this, arguments, new.target); }
function cvwScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function cvwPathD(x, z, pts) { return __ZC(526, 17, this, arguments, new.target); }
function cvwStrip(P, pts, w, hfn, mat, lift) { return __ZC(526, 18, this, arguments, new.target); }
function cvwPlant(P, kind, list, o) { return __ZC(526, 19, this, arguments, new.target); }
function cvwTaper(pts, rads, seg, rs, flat) { return __ZC(526, 20, this, arguments, new.target); }
function cvwEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function cvwPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function cvwSkinM(kind, col) { return __ZC(526, 21, this, arguments, new.target); }
function cvwEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), cvwShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function cvwLeg(P, mat, x, y, z, len, thick, o) { return __ZC(526, 22, this, arguments, new.target); }
function cvwBoxG(w, h, d) { return __ZC(526, 23, this, arguments, new.target); }
function cvwBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(cvwBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !cvwLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
cvwSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function cvwCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(cvwGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function cvwSign(P, text, w, h, x, y, z, ry, o) { return __ZC(526, 24, this, arguments, new.target); }
function cvwHouse(P, x, z, w, d, h, o) { return __ZC(526, 25, this, arguments, new.target); }
function cvwLand(x, z) { if (CVW.inRm && cvwRoomAt(x, z))
return -999; return CVW.hgt ? CVW.hgt(x, z) : 0; }
function cvwGround(x, z, feet) { var f = cvwFloorAt(x, z, feet === undefined ? 1e4 : feet), h = cvwLand(x, z); return f === null ? h : Math.max(f, h); }
var CVW_SCN = {};
function cvwSc() { return CVW_SC[CVW.sc] || CVW_SC.providence; }
function cvwSceneDrop() { return __ZC(526, 26, this, arguments, new.target); }
function cvwScene(k) { return __ZC(526, 27, this, arguments, new.target); }
function cvwVeil() { if (CVW.veil)
return CVW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); CVW.veil = v; return v; }
function cvwGo(at, msg, after) { return __ZC(526, 28, this, arguments, new.target); }
function cvwSmoke(P, x, y, z, col, n) { return __ZC(526, 29, this, arguments, new.target); }
function cvwFire(P, x, y, z, s) { return __ZC(526, 30, this, arguments, new.target); }
function cvwLocalSc() { var L = worldLocal(); return { x: L.x - cvwSc().x, z: L.z }; }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
var C = function (o, list) { return list[Math.floor(o.r * list.length) % list.length]; };
Object.assign(DLN_WEAR, {
cvsailor: function (o) {
return { ids: [o.r < 0.5 ? "oz:shirt:long:stripe" : "oz:shirt:long:cloth", "oz:collar:low:soft", o.r < 0.6 ? "oz:coat:jacket:cloth" : "oz:vest:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: C(o, [0x1E2638, 0xE8E4DA, 0x2A2E3A, 0x5A4A3A]), collar: 0x1E2638, tie: 0x1A2A4A, vest: 0x2A2E3A, coat: C(o, [0x1E2638, 0x2A2E3A, 0x22262E]), trou: C(o, [0x2A3448, 0x3A3A40, 0x4A4438]) }, shoes: 0x141210 };
},
cvsquatter: function (o) {
return { ids: ["oz:shirt:long:worn7", "oz:collar:low:soft", "oz:trousers:cloth", "oz:boots"].concat(o.r < 0.5 ? ["oz:vest:cloth"] : []),
col: { shirt: C(o, [0xC8B898, 0x9AA4A8, 0xB8A07A, 0xD8D0C0]), collar: 0xC8B898, vest: C(o, [0x5A4A3A, 0x4A4A40]), trou: C(o, [0x5A5040, 0x4A4438, 0x6A5A40]) }, shoes: 0x3A2A1A };
},
cvsquatterf: function (o) {
return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.16:cloth", "oz:apron:half:long:0.14"],
col: { dress: C(o, [0xB8A890, 0x8A9AA8, 0xC8B8A0]), skirt: C(o, [0x6A5A48, 0x5A6070, 0x7A6A50]), trim: 0xE8E0D0, apron: 0xE0D8C4 }, shoes: 0x2A1E16 };
},
cvpolice: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:big", "oz:coat:military:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0x1A2238, collar: 0x1A2238, coat: 0x18203A, trou: 0x18203A, belt: 0x141010 }, shoes: 0x0E0E0E };
},
cvcult: function (o) {
return { ids: ["oz:shirt:long:worn7", "oz:trousers:cloth"],
col: { shirt: C(o, [0x3A3428, 0x2A2620, 0x4A3A2A, 0x34302A]), trou: C(o, [0x2A2620, 0x3A3020, 0x24201A]) }, shoes: 0x1A140E };
},
cvartist: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:apron:full:long:0.08", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xE8E2D4, collar: 0xE8E2D4, tie: 0x2A2A2A, apron: 0xC8C0B0, trou: 0x2A2A2E }, shoes: 0x141010 };
},
cvwidow: function (o) {
return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.16:cloth", "oz:collar:high:none"],
col: { dress: 0x141418, skirt: 0x141418, trim: 0x2A2A2E, collar: 0x1A1A1E }, shoes: 0x101010 };
},
cvprof: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth:chain", "oz:coat:frock:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xF8F6F0, collar: 0xFAFAF6, tie: 0x1A1A22, vest: C(o, [0x2A2A30, 0x3A3428]), coat: C(o, [0x1E1E24, 0x2A2A30, 0x2E2A26]), trou: 0x2A2A30 }, shoes: 0x101010 };
}
});
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { cvsailor: ["flatcap", null, "flatcap"], cvsquatter: [null, "flatcap", null], cvsquatterf: [null], cvpolice: ["bowler", "flatcap"], cvcult: [null], cvartist: [null], cvwidow: [null], cvprof: [null, "bowler"] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { cvsailor: [null], cvsquatter: [null], cvsquatterf: [null], cvpolice: [null], cvcult: [null], cvartist: [null], cvwidow: [null], cvprof: [null, "stick"] });
})();
function cvwDressed(seed, dress, o) { return __ZC(526, 31, this, arguments, new.target); }
var CVP = {
thurston: "You are Francis Wayland Thurston of Boston, grand-nephew, heir and executor of the late Professor George Gammell Angell, from H. P. Lovecraft's The Call of Cthulhu (the story only): a careful, rational anthropologist, sceptical at first, slowly and unwillingly coming to fear what the papers show.",
angell: "You are George Gammell Angell, Professor Emeritus of Semitic languages at Brown University, Providence, from H. P. Lovecraft's The Call of Cthulhu (the story only): a learned, courteous old scholar, an authority on ancient inscriptions, privately and intensely curious about a cult you met once before.",
wilcox: "You are Henry Anthony Wilcox, a young sculptor of the Rhode Island School of Design living in the Fleur-de-Lys Building, from H. P. Lovecraft's The Call of Cthulhu (the story only): thin, dark, dreamy, a little affected, speaking in a poetic, stilted way of strange dreams of a city of green stone.",
tobey: "You are Dr. Tobey of Thayer Street, Providence, from H. P. Lovecraft's The Call of Cthulhu (the story only): a sensible physician, troubled by the young sculptor Wilcox's fever and the things he says in it.",
legrasse: "You are Inspector John Raymond Legrasse of the New Orleans police, from H. P. Lovecraft's The Call of Cthulhu (the story only): a commonplace-looking, steady, middle-aged policeman, brave and dutiful, with no interest in archaeology except what helps your case.",
webb: "You are William Channing Webb, professor of anthropology at Princeton, from H. P. Lovecraft's The Call of Cthulhu (the story only): an explorer who, forty-eight years ago in West Greenland, met a strange devil-worshipping cult and copied its chant.",
castro: "You are old Castro, an immensely aged prisoner taken in the swamp raid of 1907, from H. P. Lovecraft's The Call of Cthulhu (the story only): you speak in whispers of the Great Old Ones, R'lyeh and the stars coming right, and you refuse to tell certain things.",
galvez: "You are Joseph D. Galvez, a New Orleans policeman of Spanish blood, from H. P. Lovecraft's The Call of Cthulhu (the story only): excitable and imaginative; you are sure you heard far answering voices and the beating of great wings in the swamp.",
squatter: "You live in the squatters' settlement in the swamp and lagoon country south of New Orleans in 1907, from H. P. Lovecraft's The Call of Cthulhu (the story only): poor, good-natured, terrified of the drums in the haunted woods; you will not go a step nearer.",
johansen: "You are Gustaf Johansen, a Norwegian, second mate of the schooner Emma of Auckland, from H. P. Lovecraft's The Call of Cthulhu (the story only): a sober, worthy, plain-spoken seaman.",
sailor: "You are a seaman of the 1920s in the world of H. P. Lovecraft's The Call of Cthulhu (the story only), plain-spoken and practical, talking of ships, weather and ports.",
widow: "You are the widow of Gustaf Johansen, in Oslo's Old Town, from H. P. Lovecraft's The Call of Cthulhu (the story only): sad-faced, in black, speaking halting English; your husband came home from the sea broken and is dead.",
curator: "You are a museum curator in the world of H. P. Lovecraft's The Call of Cthulhu (the story only): learned, courteous, puzzled by a strange stone image in your keeping.",
townfolk: "You live in the place this world shows, in the 1920s (or 1907 in Louisiana), in the world of H. P. Lovecraft's The Call of Cthulhu (the story only). You are going about your own life and work, talking of your town, your trade and the weather; you know nothing of any cult."
};
function cvwPersona(k) { return CVP[k] || k || ""; }
var CVW_FOLK = {
thurston: { name: "Francis Wayland Thurston", dress: "gent", sex: "m", hair: 0x3A2A1A, persona: "thurston", greet: "You've come about my grand-uncle's papers? Then sit. There is one box I would show to no one else." },
angell: { name: "Professor Angell", dress: "cvprof", sex: "m", hair: 0xE8E4DC, beard: "full", persona: "angell", greet: "Good day. Inscriptions, is it? Sit down; I am never too old for an inscription." },
wilcox: { name: "Henry Anthony Wilcox", dress: "cvartist", sex: "m", hair: 0x1A1410, persona: "wilcox", greet: "I made it last night, in a dream of strange cities." },
wilcoxmother: { name: "Mrs. Wilcox", dress: "lady", sex: "f", hair: 0x8A7A6A, persona: "townfolk", greet: "He cried out in the night. The doctor is with him." },
tobey: { name: "Dr. Tobey", dress: "doctor", sex: "m", hair: 0x5A4A3A, beard: "mustache", persona: "tobey", greet: "You're asking after young Wilcox? Sit down. It's an odd case." },
legrasse: { name: "Inspector Legrasse", dress: "gent", sex: "m", hair: 0x3A2A1A, beard: "mustache", persona: "legrasse", greet: "Legrasse, New Orleans police. I've come a long way for an answer." },
webb: { name: "Professor Webb", dress: "cvprof", sex: "m", hair: 0xC8C0B0, beard: "short", persona: "webb", greet: "Greenland, forty-eight years ago. I have not thought of it in years." },
galvez: { name: "Joseph D. Galvez", dress: "cvpolice", sex: "m", hair: 0x141414, beard: "mustache", persona: "galvez", greet: "You hear that? Far off, answering. Tell me you hear it too." },
guide: { name: "The squatter who brought word", dress: "cvsquatter", sex: "m", hair: 0x5A4A3A, beard: "short", persona: "squatter", greet: "They took them in the night. The drums never stop." },
castro: { name: "Old Castro", dress: "cvcult", sex: "m", hair: 0xE8E4DC, beard: "full", persona: "castro", greet: "...I have sailed to strange ports. I will tell some things. Not all." },
curator: { name: "The curator", dress: "cvprof", sex: "m", hair: 0x8A7A6A, beard: "mustache", persona: "curator", greet: "Welcome. You'll forgive the dust; this is where we keep what we have no room to show." },
hydecurator: { name: "The curator at Hyde Park", dress: "cvprof", sex: "m", hair: 0xB8A890, persona: "curator", greet: "The image from the Alert? Geologists find it a monstrous puzzle. Come and see." },
widow: { name: "Mrs. Johansen", dress: "cvwidow", sex: "f", hair: 0xD8C8A0, persona: "widow", greet: "Yes? ...Gustaf? Gustaf is no more." },
johansen: { name: "Gustaf Johansen", dress: "cvsailor", sex: "m", hair: 0xE8D890, beard: "short", persona: "johansen", greet: "Second mate of the Emma. Fair wind, if this sea will give us one." },
collins: { name: "Captain Collins", dress: "cvsailor", sex: "m", hair: 0x6A5A4A, beard: "full", persona: "sailor", greet: "Callao's our port, and we'll make it, storm or no storm." },
green: { name: "Mr. Green, first mate", dress: "cvsailor", sex: "m", hair: 0x8A6A4A, beard: "mustache", persona: "sailor", greet: "Mind the sheets. She's in ballast and lively." },
briden: { name: "William Briden", dress: "cvsailor", sex: "m", hair: 0x5A4A3A, persona: "sailor", greet: "Briden. Able seaman. What d'you want?" },
donovan: { name: "Donovan", dress: "cvsailor", sex: "m", hair: 0x8A3A1A, persona: "sailor", greet: "Donovan. I've good hands for a fiddly job." },
rodriguez: { name: "Rodriguez", dress: "cvsailor", sex: "m", hair: 0x141414, beard: "mustache", persona: "sailor", greet: "Rodriguez. Portuguese, and the best climber aboard." },
hawkins: { name: "Hawkins", dress: "cvsailor", sex: "m", hair: 0x6A5A3A, persona: "sailor", greet: "Hawkins. Quick ears, they say." },
parker: { name: "Parker", dress: "cvsailor", sex: "m", hair: 0x3A2A1A, persona: "sailor", greet: "Parker." },
guerrera: { name: "Guerrera", dress: "cvsailor", sex: "m", hair: 0x1A1410, beard: "short", persona: "sailor", greet: "Guerrera." },
angstrom: { name: "Angstrom", dress: "cvsailor", sex: "m", hair: 0xE8D8A0, persona: "sailor", greet: "Angstrom. A Swede, and a long way from home." }
};
function cvwFolk(key, x, z, ry, o) { return __ZC(526, 32, this, arguments, new.target); }
function cvwCrowd(seed, list, x0, z0, x1, z1, o) { return __ZC(526, 33, this, arguments, new.target); }
function cvwOne(seed, name, sex, dress, x, z, ry, greet, o) { return __ZC(526, 34, this, arguments, new.target); }
function cvwIdolHeld(g) { var I = cvwIdol(0.32); I.position.set(0.0, 1.02, 0.26); g.add(I); return I; }
var CVW_RY = -80;
function cvwMat(k) { return __ZC(526, 35, this, arguments, new.target); }
function cvwThatchM() { return __ZC(526, 36, this, arguments, new.target); }
function cvwInRoom() { return camera.position.y < CVW_RY + 30; }
function cvwRoomAt(x, z) { for (var i = 0; i < CVW.rooms.length; i++) {
var R = CVW.rooms[i];
if (x > R.x0 - 0.3 && x < R.x1 + 0.3 && z > R.z0 - 0.3 && z < R.z1 + 0.3)
return R;
} return null; }
function cvwRoom(P, key, cx, cz, w, d, o) { return __ZC(526, 37, this, arguments, new.target); }
function cvwDoor(R, name, ox, oz, ory) { return __ZC(526, 38, this, arguments, new.target); }
function cvwInDoor(fromKey, toKey, lx, lz, name, verb) { return __ZC(526, 39, this, arguments, new.target); }
function cvwIn(sc, key, lx, lz) {
return function () {
var R = CVW.sc === sc ? CVW.rooms.filter(function (r) { return r.key === key; })[0] : null;
if (R)
return { sc: sc, x: R.cx + lx, z: R.cz + lz, y: R.y };
var A = CVW_ROOMXZ[sc] && CVW_ROOMXZ[sc][key];
return A ? { sc: sc, x: A[0] + lx, z: A[1] + lz, y: CVW_RY } : null;
};
}
var CVW_ROOMXZ = {};
function cvwTable(P, x, z, w, d, h, o) { return __ZC(526, 40, this, arguments, new.target); }
function cvwChair(P, x, z, ry, o) { return __ZC(526, 41, this, arguments, new.target); }
function cvwBed(P, x, z, ry, o) { return __ZC(526, 42, this, arguments, new.target); }
function cvwShelves(P, x, z, w, h, ry, o) { return __ZC(526, 43, this, arguments, new.target); }
function cvwHearth(P, x, z, ry, o) { return __ZC(526, 44, this, arguments, new.target); }
function cvwCandle(P, x, y, z, o) { return __ZC(526, 45, this, arguments, new.target); }
function cvwBench(P, x, z, ry, o) { return __ZC(526, 46, this, arguments, new.target); }
function cvwRug(P, x, z, w, d, col) { return __ZC(526, 47, this, arguments, new.target); }
function cvwPicture(P, x, y, z, ry, w, h, draw) { return __ZC(526, 48, this, arguments, new.target); }
function cvwWindowIn(P, x, y, z, ry, w, h, o) { return __ZC(526, 49, this, arguments, new.target); }
function cvwTownHouse(P, x, z, w, d, h, o) { return __ZC(526, 50, this, arguments, new.target); }
function cvwChurch(P, x, z, o) { return __ZC(526, 51, this, arguments, new.target); }
function cvwTownWall(P, x0, z0, x1, z1, h, gate) { return __ZC(526, 52, this, arguments, new.target); }
function cvwConifer(P, list, o) { return __ZC(526, 53, this, arguments, new.target); }
function cvwBirch(P, list) { return __ZC(526, 54, this, arguments, new.target); }
function cvwPeak(P, x, z, r, h, o) { return __ZC(526, 55, this, arguments, new.target); }
function cvwBoat(P, x, y, z, ry, o) { return __ZC(526, 56, this, arguments, new.target); }
var CVW_UP = new THREE.Vector3(0, 1, 0), CVW_V1 = new THREE.Vector3(), CVW_V2 = new THREE.Vector3();
function cvwStick(m, a, b) { CVW_V1.set(b.x - a.x, b.y - a.y, b.z - a.z); var L = CVW_V1.length() || 0.001; m.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); m.quaternion.setFromUnitVectors(CVW_UP, CVW_V1.multiplyScalar(1 / L)); m.scale.set(1, L, 1); return m; }
function cvwVilla(P, x, z, o) { return __ZC(526, 57, this, arguments, new.target); }
function cvwVillaDoor(x, z, o) { o = o || {}; var w = o.w || 9, d = o.d || 8, ry = o.ry || 0, lx = w * 0.25, lz = d / 2 + 1.6; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function cvwShops(P, x, z, n, o) { return __ZC(526, 58, this, arguments, new.target); }
function cvwShopDoor(x, z, n, i, o) { o = o || {}; var sw = o.sw || 6, d = o.d || 9, ry = o.ry || 0, lx = -((n - 1) * sw) / 2 + i * sw + sw / 2 - 0.9, lz = d / 2 + 1.2; return { x: x + Math.cos(ry) * lx + Math.sin(ry) * lz, z: z - Math.sin(ry) * lx + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function cvwRailway(P, pts, hfn) { return __ZC(526, 59, this, arguments, new.target); }
function cvwStation(P, x, z, len, name, o) { return __ZC(526, 60, this, arguments, new.target); }
function cvwSignal(P, x, z, hfn) { var g = new THREE.Group(); g.position.set(x, hfn(x, z), z); P.add(g); cvwCyl(g, 0.1, 0.14, 7, cvwLam(0xE8E4D8), 0, 0, 0, 8); var arm = cvwBox(g, 1.4, 0.24, 0.06, cvwLam(0xB82A22), 0.7, 6, 0.1); arm.rotation.z = -0.5; return g; }
function cvwBridge(P, x, z, len, w, y, o) { return __ZC(526, 61, this, arguments, new.target); }
function cvwLamp(P, x, z, hfn, o) { return __ZC(526, 62, this, arguments, new.target); }
function cvwPoles(P, pts, hfn, gap) { return __ZC(526, 63, this, arguments, new.target); }
function cvwPaling(P, pts, hfn, o) { return __ZC(526, 64, this, arguments, new.target); }
function cvwScorch(P, x, z, r, hfn, fires) { return __ZC(526, 65, this, arguments, new.target); }
function cvwDeadTrees(P, list) { return __ZC(526, 66, this, arguments, new.target); }
function cvwCart(P, x, z, ry, o) { return __ZC(526, 67, this, arguments, new.target); }
function cvwFar(P, hfn, col, o) { return __ZC(526, 68, this, arguments, new.target); }
function cvwPathAt(pts, s) { return __ZC(526, 69, this, arguments, new.target); }
function cvwPathLen(pts) { var L = 0; for (var i = 1; i < pts.length; i++)
L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function cvwStream(P, pts, hfn, o) { return __ZC(526, 70, this, arguments, new.target); }
(function () {
var m0 = cvwMat;
cvwMat = function (k) {
switch (k) {
case "rlstone": return typeof cvdWetStoneM === "function" ? cvdWetStoneM() : cvwS("b:strata", CV_LOOK.stone, 9, { n: 1.6 });
case "rlstoneD": return cvwS("b:strata", CV_LOOK.stoneD, 7, { n: 1.6 });
case "rlcarve": return cvwRlCarveM();
case "ooze": return cvwM("ooze", function () { var m = cvwLite() ? new THREE.MeshLambertMaterial({ color: CV_LOOK.ooze, map: cvwPhotoTex("b:moss", 3) }) : new THREE.MeshPhongMaterial({ color: CV_LOOK.ooze, map: cvwPhotoTex("b:moss", 3), shininess: 80, specular: 0x6A8A5A }); m.userData.noPhoto = 1; return m; });
case "mud": return cvwS("earth", 0x4A4430, 4, { vc: 1 });
case "weed": return cvwLam(0x2E3A1E, { ds: 1 });
case "clap": return cvwS("siding", 0xF2EEE4, 2.2);
case "clapgrey": return cvwS("siding", 0xC8C8C0, 2.2);
case "clapyel": return cvwS("siding", 0xE8D8A8, 2.2);
case "sandstone": return cvwS("b:ashlar", 0xE0C890, 2.4);
case "redbrick": return cvwS("brick", 0xA85A44, 1.4);
case "cobbles": return cvwS("b:slate", 0x6E6A64, 1.0);
case "asphalt": return cvwS("asphalt", 0x5A5A5A, 3);
case "swampwater": return cvwWaterM(0x2E3A22, 0.92);
case "cypress": return cvwS("bark", 0x6A5A48, 2.2);
case "white": return cvwS("plaster", 0xF6F4EE, 3);
case "idol": return cvwIdolM();
case "clay": return cvwS("b:stucco", 0x9A7A5A, 0.3);
}
return m0(k);
};
})();
function cvwGlyphDraw(c, W, H, seed, ink, bg) { return __ZC(526, 71, this, arguments, new.target); }
function cvwGlyphTex(seed, ink, bg) { return cvwCanvas("glyph" + seed + (ink || "") + (bg || ""), 256, 128, function (c, W, H) { cvwGlyphDraw(c, W, H, seed, ink, bg || "rgba(0,0,0,0)"); }); }
function cvwFigureDraw(c, W, H, o) { return __ZC(526, 72, this, arguments, new.target); }
function cvwBasRelief(P, x, y, z, ry, o) { return __ZC(526, 73, this, arguments, new.target); }
function cvwIdolM() { return __ZC(526, 74, this, arguments, new.target); }
function cvwRlCarveM() { return __ZC(526, 75, this, arguments, new.target); }
function cvwSquidHeadG(lite) { return __ZC(526, 76, this, arguments, new.target); }
function cvwForm(mat, o) { return __ZC(526, 77, this, arguments, new.target); }
function cvwIdol(s, o) { return __ZC(526, 78, this, arguments, new.target); }
function cvwThing(P, x, y, z, ry, s) { return __ZC(526, 79, this, arguments, new.target); }
function cvwFormTick(g, t, amp) { return __ZC(526, 80, this, arguments, new.target); }
function cvwTitan(P, w, h, d, x, y, z, ry, o) { return __ZC(526, 81, this, arguments, new.target); }
function cvwOozeOn(P, x, y, z, w, h, ry) { return __ZC(526, 82, this, arguments, new.target); }
function cvwVoidSky(P, o) { return __ZC(526, 83, this, arguments, new.target); }
function cvwTinBox(P, x, y, z, ry, o) { return __ZC(526, 84, this, arguments, new.target); }
function cvwBox3(P, w, h, d, mat, x, y, z) { var m = new THREE.Mesh(cvwBoxG(w, h, d), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function cvwPapers(P, x, y, z, n, R) { R = R || wRand(Math.round(x * 31 + z * 17)); for (var i = 0; i < (n || 8); i++) {
var p = cvwBox3(P, 0.21, 0.003, 0.28, cvwLam([0xF0EAD8, 0xE8E0C8, 0xF4F0E4][i % 3]), x + (R() - 0.5) * 0.5, y + i * 0.004, z + (R() - 0.5) * 0.3);
p.rotation.y = (R() - 0.5) * 0.8;
} }
function cvwHullGeo(L, B, D) { return __ZC(526, 85, this, arguments, new.target); }
function cvwShip(P, x, wy, z, ry, o) { return __ZC(526, 86, this, arguments, new.target); }
function cvwName(g, name, B, L, fb) { if (!name)
return; [-1, 1].forEach(function (k) { var sg = cvwSign(g, name, 3.2, 0.6, k * (B / 2 * 0.95 + 0.04), -0.5, L * 0.33, k * Math.PI / 2, { bg: "#1A1A1E", ink: "#E8D8A0" }); }); }
function cvwSteamer(P, x, wy, z, ry, o) { return __ZC(526, 87, this, arguments, new.target); }
function cvwColonial(P, x, z, o) { return __ZC(526, 88, this, arguments, new.target); }
function cvwColDoor(x, z, o) { o = o || {}; var d = o.d || 8, ry = o.ry || 0, lz = d / 2 + 1.3; return { x: x + Math.sin(ry) * lz, z: z + Math.cos(ry) * lz, ry: ry + Math.PI }; }
function cvwBrick(P, x, z, o) { return __ZC(526, 89, this, arguments, new.target); }
function cvwSedanWheelG() { return __ZC(526, 90, this, arguments, new.target); }
function cvwSedanTireG() { return cvwGeo("sedTire", function () { var t = new THREE.TorusGeometry(0.355, 0.075, 8, 22); t.rotateY(Math.PI / 2); return t; }); }
function cvwSedanWingG() { return cvwGeo("sedWing", function () { var c = new THREE.CylinderGeometry(0.47, 0.47, 0.34, 16, 1, true, -Math.PI * 0.14, Math.PI * 1.28); c.rotateZ(Math.PI / 2); return c; }); }
function cvwAuto(P, x, z, ry, o) { return __ZC(526, 91, this, arguments, new.target); }
function cvwElmGeo() { return __ZC(526, 92, this, arguments, new.target); }
function cvwElms(P, list, leaf) { return __ZC(526, 93, this, arguments, new.target); }
function cvwELamp(P, x, z, hfn, o) { return __ZC(526, 94, this, arguments, new.target); }
function cvwSidewalks(P, pts, w, hfn, o) { return __ZC(526, 95, this, arguments, new.target); }
function cvwCrxKinds() { return __ZC(526, 96, this, arguments, new.target); }
function cvwHorse(P, x, y, z, ry, o) { return __ZC(526, 97, this, arguments, new.target); }
function cvwPlainBeast(P, x, y, z, ry, o) { return __ZC(526, 98, this, arguments, new.target); }
function cvwSheep(P, x, y, z, ry) { return __ZC(526, 99, this, arguments, new.target); }
var CV_PV = { angell: [60, 74], fleur: [-250, -146], meeting: [-302, -196], club: [-218, -146], wilcox: [130, -214], tobey: [214, -120], uhall: [120, -96], risd: [-200, -90], wharf: -372 };
function cvwPvH(x, z) {
var n = cvwFbm(x * 0.008, z * 0.008, 3);
if (x < -385)
return -3;
var t = cvwSmooth(-340, -40, x), h = 1.6 + t * 30 + cvwSmooth(-40, 380, x) * 7 + n * 2.2 * t;
if (x < -360)
h = 1.6;
return h;
}
var CV_PV_ROADS = {
main: [[-345, -560], [-345, 560]],
williams: [[-345, 60], [-200, 60], [-60, 60], [120, 60], [420, 60]],
benefit: [[-170, -560], [-170, 560]],
thomas: [[-345, -160], [-170, -160]],
waterman: [[-345, -200], [-170, -200], [0, -200], [200, -200], [420, -200]],
college: [[-170, -60], [0, -60], [60, -60]],
thayer: [[200, -560], [200, 560]],
prospect: [[30, -560], [30, 560]]
};
var CV_PV_COURTS = [[-345, 32], [-300, 30], [-262, 36], [-226, 28], [-190, 34], [-150, 40], [-90, 52]];
CVW_ROOMXZ.providence = { angell: [-560, 820], angellhall: [-530, 820], fleur: [-500, 820], fleur26: [-470, 820], wilbed: [-440, 820], tobey: [-410, 820], boston: [-380, 820], paterson: [-350, 820], club: [-320, 820] };
Object.assign(CVW_AT, {
provIn: { sc: "providence", x: 52, z: 52, name: "Williams Street, Providence", ry: Math.PI },
angellDoor: { sc: "providence", x: 60, z: 64, name: "Professor Angell's door, Williams Street" },
hillStreet: { sc: "providence", x: -250, z: 60, name: "the steep hill street, Williams Street below Benefit" },
courts: { sc: "providence", x: -262, z: 36, name: "the queer dark courts on the hillside" },
waterfront: { sc: "providence", x: -352, z: 60, name: "the waterfront, where the Newport boat comes in" },
wharf: { sc: "providence", x: -372, z: 90, name: "the wharf of the Newport boat" },
benefit: { sc: "providence", x: -176, z: 0, name: "Benefit Street" },
thomas: { sc: "providence", x: -250, z: -160, name: "Thomas Street" },
fleurDoor: { sc: "providence", x: -250, z: -153, name: "the door of the Fleur-de-Lys Building" },
meeting: { sc: "providence", x: -302, z: -176, name: "the First Baptist Meeting House" },
club: { sc: "providence", x: -218, z: -153, name: "the Providence Art Club" },
risd: { sc: "providence", x: -200, z: -80, name: "the Rhode Island School of Design" },
waterman: { sc: "providence", x: 130, z: -200, name: "Waterman Street" },
wilcoxDoor: { sc: "providence", x: 130, z: -206, name: "the Wilcox house, Waterman Street" },
thayer: { sc: "providence", x: 205, z: -120, name: "Thayer Street" },
tobeyDoor: { sc: "providence", x: 206, z: -120, name: "Dr. Tobey's office, Thayer Street" },
green: { sc: "providence", x: 110, z: -70, name: "the college green, Brown University" },
uhall: { sc: "providence", x: 120, z: -86, name: "University Hall, Brown University" },
gates: { sc: "providence", x: 54, z: -60, name: "the gates of Brown University, College Street" },
prospect: { sc: "providence", x: 30, z: 0, name: "Prospect Street, on the brow of the hill" }
});
function cvwPvRooms(G) { return __ZC(526, 100, this, arguments, new.target); }
function cvwFleurDeLys(G, x, z, H) { return __ZC(526, 101, this, arguments, new.target); }
function cvwMeetingHouse(G, x, z, H) { return __ZC(526, 102, this, arguments, new.target); }
function cvwProvidence(G) { return __ZC(526, 103, this, arguments, new.target); }
function cvwPvFolk(G) { return __ZC(526, 104, this, arguments, new.target); }
CVW_SCN.providence = { start: { x: 52, z: 52, ry: Math.PI }, h: cvwPvH,
wl: function (x, z) { return x < -386 ? 0.2 : null; },
build: function (G) { cvwPvRooms(G); cvwProvidence(G); cvwPvFolk(G); } };
var CV_BY = { road: [0, 470], carriages: [14, 440], huts: [70, 250], glade: [0, -250], lakeZ: -560 };
function cvwByH(x, z) { return __ZC(526, 105, this, arguments, new.target); }
var CV_BY_TRAIL = [[0, 470], [6, 400], [-14, 330], [30, 280], [70, 250], [50, 170], [-10, 100], [-40, 20], [-20, -60], [10, -140], [0, -210]];
CVW_ROOMXZ.bayou = { hq: [-560, 820], cells: [-530, 820], stlouis: [-500, 820], legrasse: [-470, 820] };
Object.assign(CVW_AT, {
roadEnd: { sc: "bayou", x: 0, z: 466, name: "the end of the passable road", ry: Math.PI },
carriages: { sc: "bayou", x: 14, z: 440, name: "the carriages and the automobile" },
cypress: { sc: "bayou", x: -14, z: 330, name: "the cypress woods" },
stones: { sc: "bayou", x: 24, z: 300, name: "a pile of dank stones, a fragment of rotting wall" },
huts: { sc: "bayou", x: 70, z: 250, name: "the squatter settlement" },
arcades: { sc: "bayou", x: -10, z: 100, name: "the black arcades of the forest" },
morass: { sc: "bayou", x: -40, z: 20, name: "the black morass" },
thinner: { sc: "bayou", x: -20, z: -150, name: "where the trees were thinner" },
gladeEdge: { sc: "bayou", x: 0, z: -200, name: "the edge of the glade" },
island: { sc: "bayou", x: 0, z: -232, name: "the grassy island in the glade" },
monolith: { sc: "bayou", x: 0, z: -250, name: "the granite monolith" },
farWood: { sc: "bayou", x: -30, z: -330, name: "toward the far, unillumined wood" }
});
function cvwByRooms(G) { return __ZC(526, 106, this, arguments, new.target); }
function cvwCypressGeo() { return __ZC(526, 107, this, arguments, new.target); }
function cvwMossTex() { return __ZC(526, 108, this, arguments, new.target); }
function cvwCypress(P, list) { return __ZC(526, 109, this, arguments, new.target); }
function cvwHut(P, x, z, ry, o) { return __ZC(526, 110, this, arguments, new.target); }
function cvwPirogue(P, x, z, ry) { return __ZC(526, 111, this, arguments, new.target); }
function cvwBayou(G) { return __ZC(526, 112, this, arguments, new.target); }
function cvwByFolk(G) { return __ZC(526, 113, this, arguments, new.target); }
CVW_SCN.bayou = { start: { x: 0, z: 466, ry: Math.PI }, h: cvwByH,
build: function (G) { cvwByRooms(G); cvwBayou(G); cvwByFolk(G); } };
function cvwSwampWaterM(fire) { return __ZC(526, 114, this, arguments, new.target); }
function cvwHbH(x, z) { if (z < -46)
return -4; var t = cvwSmooth(-40, 300, z); return 1.4 + t * 16 + cvwFbm(x * 0.01, z * 0.01, 2) * 2 * t; }
var CV_HB_ROADS = { quay: [[-420, -34], [-200, -30], [0, -22], [200, -30], [420, -34]], george: [[-80, -30], [-80, 500]], pitt: [[80, -30], [80, 500]], college: [[160, 200], [160, 500]], bridge: [[-420, 120], [420, 120]], park: [[80, 260], [300, 260]] };
CVW_ROOMXZ.harbour = { dunedin: [-560, 720], auckland: [-530, 720], court: [-500, 720], museum: [-470, 720] };
Object.assign(CVW_AT, {
quayIn: { sc: "harbour", x: 0, z: -20, name: "Circular Quay, Sydney Cove", ry: 0 },
alertQuay: { sc: "harbour", x: -120, z: -36, name: "the Alert, at Circular Quay" },
ferries: { sc: "harbour", x: 120, z: -36, name: "the ferry jetties" },
courtDoor: { sc: "harbour", x: -80, z: 120, name: "the vice-admiralty court" },
museumDoor: { sc: "harbour", x: 160, z: 290, name: "the Museum in College Street, at Hyde Park" },
hydePark: { sc: "harbour", x: 220, z: 300, name: "Hyde Park" },
darling: { sc: "harbour", x: -380, z: -36, name: "the wharf at Darling Harbour" }
});
function cvwHbRooms(G) { return __ZC(526, 115, this, arguments, new.target); }
function cvwBondStore(P, x, z, o) { return __ZC(526, 116, this, arguments, new.target); }
function cvwHarbour(G) { return __ZC(526, 117, this, arguments, new.target); }
function cvwHbFolk(G) { return __ZC(526, 118, this, arguments, new.target); }
CVW_SCN.harbour = { start: { x: 0, z: -20, ry: 0 }, h: cvwHbH,
wl: function (x, z) { return z < -46 ? 0.2 : null; },
build: function (G) { return __ZC(526, 119, this, arguments, new.target); } };
function cvwOsH(x, z) { if (z < -60)
return -4; var n = cvwFbm(x * 0.01, z * 0.01, 3); return 1.4 + cvwSmooth(80, 420, x) * 60 * (0.7 + 0.3 * n) + n * 1.6 + cvwSmooth(-40, 300, z) * 4; }
var CV_OS_ROADS = { quay: [[-460, -50], [460, -50]], old: [[-120, -50], [-120, 120], [-60, 200], [40, 240]], lane: [[-300, -50], [-300, 60]], cross: [[-300, 60], [-120, 80], [60, 90]], egeberg: [[40, 240], [160, 200], [300, 140]] };
CVW_ROOMXZ.oslo = { johansen: [-420, 620], londonboat: [-390, 620] };
Object.assign(CVW_AT, {
osloIn: { sc: "oslo", x: -40, z: -40, name: "the trim wharves, Oslo", ry: Math.PI },
oldTown: { sc: "oslo", x: -120, z: 110, name: "the Old Town" },
johansenDoor: { sc: "oslo", x: -100, z: 150, name: "Johansen's door, in the Old Town" },
gothenburg: { sc: "oslo", x: -300, z: 20, name: "the narrow lane near the Gothenburg dock" },
egeberg: { sc: "oslo", x: 200, z: 180, name: "the slope of the Egeberg" },
londonBoat: { sc: "oslo", x: -200, z: -44, name: "the London boat" }
});
function cvwOsRooms(G) { return __ZC(526, 120, this, arguments, new.target); }
function cvwOslo(G) { return __ZC(526, 121, this, arguments, new.target); }
function cvwOsFolk(G) { return __ZC(526, 122, this, arguments, new.target); }
CVW_SCN.oslo = { start: { x: -40, z: -40, ry: Math.PI }, h: cvwOsH,
wl: function (x, z) { return z < -60 ? 0.2 : null; },
build: function (G) { cvwOsRooms(G); cvwOslo(G); cvwOsFolk(G); } };
function cvwSeaH(x, z) { return -30; }
CVW_ROOMXZ.sea = { alertcabin: [-300, 560], engine: [-270, 560], emmacabin: [-240, 560] };
Object.assign(CVW_AT, {
emmaDeck: { sc: "sea", x: 0, z: 4, name: "the deck of the Emma", y: null },
emmaBow: { sc: "sea", x: 0, z: -12, name: "the Emma's bow" },
emmaWheel: { sc: "sea", x: 0, z: 11, name: "the Emma's wheel" },
alertDeck: { sc: "sea", x: -30, z: 0, name: "the deck of the Alert" },
alertBow: { sc: "sea", x: -30, z: -15, name: "the Alert's bow" },
alertWheel: { sc: "sea", x: -30, z: 13, name: "the Alert's wheel" }
});
function cvwSeaShips() { var st = CVW.st; return { emma: !st.alertOurs, alert: !!(st.alertNear || st.alertOurs), alertX: st.alertOurs ? 0 : -30 }; }
function cvwSeaRooms(G) { return __ZC(526, 123, this, arguments, new.target); }
function cvwSea(G) { return __ZC(526, 124, this, arguments, new.target); }
function cvwSeaLive(st) { return __ZC(526, 125, this, arguments, new.target); }
CVW_SCN.sea = { start: { x: 0, z: 4, ry: Math.PI }, h: cvwSeaH,
wl: function (x, z) { return 0; },
build: function (G) { return __ZC(526, 126, this, arguments, new.target); } };
var CV_RL = { door: [0, -128], mono: [0, -176], bank: [0, 206], alert: [34, 330], boat: [6, 226] };
function cvwRlH(x, z) { return __ZC(526, 127, this, arguments, new.target); }
var CV_RL_PATH = [[6, 226], [0, 190], [-20, 150], [10, 110], [-16, 60], [14, 20], [-10, -30], [0, -80], [0, -112]];
Object.assign(CVW_AT, {
rlBank: { sc: "rlyeh", x: 6, z: 214, name: "the sloping mud-bank", ry: Math.PI },
rlBoat: { sc: "rlyeh", x: 6, z: 226, name: "the boat, at the mud-bank" },
rlBlocks: { sc: "rlyeh", x: -20, z: 150, name: "the titan oozy blocks" },
rlAngles: { sc: "rlyeh", x: 10, z: 110, name: "among the crazily elusive angles" },
rlTerrace: { sc: "rlyeh", x: -16, z: 60, name: "a terrace of carven rock" },
rlReliefs: { sc: "rlyeh", x: 14, z: 20, name: "the colossal bas-reliefs" },
rlHigh: { sc: "rlyeh", x: -10, z: -30, name: "high on the citadel" },
rlMono: { sc: "rlyeh", x: -6, z: -100, name: "the foot of the monolith" },
rlDoor: { sc: "rlyeh", x: 0, z: -112, name: "the great carved door" },
rlCorner: { sc: "rlyeh", x: -34, z: 70, name: "an angle of masonry which shouldn't have been there" }
});
function cvwRlyeh(G) { return __ZC(526, 128, this, arguments, new.target); }
function cvwRlLive(st) { return __ZC(526, 129, this, arguments, new.target); }
CVW_SCN.rlyeh = { start: { x: 6, z: 214, ry: Math.PI }, h: cvwRlH,
wl: function (x, z) { return cvwRlH(x, z) < 0 ? 0 : null; },
build: function (G) { return __ZC(526, 130, this, arguments, new.target); } };
function cvdInst(G, list, geo, mat) { if (list.length)
cvwInst(G, geo, mat, list, {}); }
function cvdGlow(G, x, y, z, col, size, op) { if (typeof wGlow !== "function")
return; var g = wGlow(col, size, op); g.position.set(x, y, z); G.add(g); return g; }
function cvdFog(G, x, y, z, w, h, ry, col, op) { return __ZC(526, 131, this, arguments, new.target); }
function cvdFacadeM(col) { return __ZC(526, 132, this, arguments, new.target); }
function cvdBlock(G, x, y, z, w, d, h, col, ry) { return __ZC(526, 133, this, arguments, new.target); }
function cvdTower(G, x, y, z, w, h, d, ry, lean, i, lite) { return __ZC(526, 134, this, arguments, new.target); }
function cvdPicketGeo() { return __ZC(526, 135, this, arguments, new.target); }
function cvdBenchGeo() { return __ZC(526, 136, this, arguments, new.target); }
function cvdWetStoneM() { return __ZC(526, 137, this, arguments, new.target); }
function cvdWeedGeo(w) { return __ZC(526, 138, this, arguments, new.target); }
function cvdAlong(pts, every, off, side) { var out = []; for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uz = (b[1] - a[1]) / L;
for (var u = every / 2; u < L; u += every) {
out.push({ x: a[0] + ux * u - uz * off * side, z: a[1] + uz * u + ux * off * side, ry: Math.atan2(ux, uz) });
}
} return out; }
function cvdCrates(G, x, y, z, n, R) { for (var i = 0; i < n; i++) {
var s = 0.9 + R() * 0.5;
cvwBox3(G, s, s * 0.8, s, cvwMat("planks"), x + (i % 3) * 1.3, y + (i > 2 ? s * 0.8 : 0), z + ((i * 7) % 2) * 1.2);
} }
function cvdBarrels(G, x, y, z, n) { for (var i = 0; i < n; i++)
cvwCyl(G, 0.38, 0.42, 1.0, cvwMat("oak"), x + (i % 4) * 0.9, y, z + Math.floor(i / 4) * 0.9, 10); }
(function () {
var b0 = CVW_SCN.providence.build;
CVW_SCN.providence.build = function (G) {
b0.apply(this, arguments);
var lite = cvwLite(), H = cvwPvH, st = CVW.st, win = st.season === "winter", R = wRand(9191);
if (win) {
var piles = [];
["williams", "benefit", "thomas", "waterman", "thayer", "prospect"].forEach(function (k) { var w = k === "thomas" || k === "prospect" ? 6 : 8; [-1, 1].forEach(function (sd) { cvdAlong(CV_PV_ROADS[k], lite ? 5 : 2.6, w / 2 + 0.5, sd).forEach(function (p) { if (R() < 0.25)
return; piles.push({ x: p.x, z: p.z, y: H(p.x, p.z) - 0.05, sx: 1.1 + R() * 0.8, sy: 0.35 + R() * 0.3, sz: 0.7 + R() * 0.5, ry: p.ry }); }); }); });
cvdInst(G, piles, cvwGeo("snowpile", function () { return new THREE.SphereGeometry(1, 9, 5, 0, Math.PI * 2, 0, Math.PI / 2); }), cvwLam(0xDCE2EA));
}
[-1, 1].forEach(function (sd) {
var pts = [];
cvdAlong(CV_PV_ROADS.williams, lite ? 3.2 : 2.0, 8.6, sd).forEach(function (p) { if (p.x < -80 && sd < 0)
return; if (Math.abs(p.x - CV_PV.angell[0]) < 4 || Math.abs(p.x + 170) < 9 || Math.abs(p.x - 30) < 8 || Math.abs(p.x - 200) < 8)
return; if (((p.x + 400) % 14.5) < 1.6)
return; pts.push({ x: p.x, z: p.z, y: H(p.x, p.z), ry: p.ry }); });
cvdInst(G, pts, cvdPicketGeo(), cvwMat("white"));
});
if (win)
cvwSnowfall(G, lite ? 240 : 1400, 0.9);
if (win) {
var n = 0;
for (var x = -300; x < 410 && n < (lite ? 6 : 22); x += lite ? 110 : 32) {
var z = 60 + (n % 2 ? 14 : -14) + (n % 2 ? 4 : -4);
if (x < -80 && z < 60)
z = 78;
cvwSmoke(G, x, H(x, z) + (2 + (n % 2)) * 3.1 + 4.4, z, 0x8A8C90, lite ? 4 : 6);
n++;
}
}
var cars = [];
cvdAlong(CV_PV_ROADS.williams, lite ? 60 : 26, 2.9, 1).forEach(function (p, i) { if (i % 2 && !lite)
cars.push([p.x, p.z, p.ry + Math.PI / 2]); });
cvdAlong(CV_PV_ROADS.williams, lite ? 70 : 30, 2.9, -1).forEach(function (p, i) { if (i % 3 === 1)
cars.push([p.x, p.z, p.ry - Math.PI / 2]); });
cars.forEach(function (c, k) { if (Math.abs(c[0] + 170) < 10 || Math.abs(c[0] - 30) < 8 || Math.abs(c[0] - 200) < 8 || Math.abs(c[0] - CV_PV.angell[0]) < 5)
return; cvwAuto(G, c[0], c[1], c[2] + Math.PI / 2, { col: [0x14161A, 0x1A1A22, 0x2A1E16, 0x1E2A22, 0x3A2A1A][k % 5], lit: false }); });
cvdAlong(CV_PV_ROADS.williams, lite ? 60 : 30, 5.2, 1).forEach(function (p, i) { if (i % 2)
cvwELamp(G, p.x, p.z, H, { lit: win || CVW.night }); });
cvwCrowd("pvwilliams", [["A lady in a fur collar", "f", "lady", win ? "Mind the ice, it's treacherous on this hill." : "Lovely afternoon."], ["A gentleman in an ulster", "m", "gent", "Up from the Newport boat? It's a climb."], ["A delivery man with a crate", "m", "worker", "Coal for number twelve."], ["A college man", "m", "gent", "Brown's up the top. Keep climbing."], ["A housemaid on an errand", "f", "lady", "Butter and eggs, and back before she misses me."], ["A patrolman", "m", "police", "Evening. Watch your step."], ["A boy with a sled", "m", "boy", "Best hill in Providence for sledding!", null, true], ["A girl in a red muffler", "f", "girl", "Look, it's snowing again!", null, true], ["An old clergyman", "m", "gent", "God keep you on this cold day."], ["A coalman with his sack", "m", "worker", "Mind the chute, ma'am."], ["A mother and her shopping", "f", "lady", "Two pounds of sugar and the paper. That's all."], ["A man shovelling his walk", "m", "worker", "Third time this week!"], ["A Brown student in a raccoon coat", "m", "gent", "Hockey on the pond Saturday, if it holds."]], -125, 55, -30, 66, { wander: 4 });
[["A lady with a hatbox", "f", "lady", -121, 65.4, "The milliner's is warm, at least."], ["A gentleman reading the Journal", "m", "gent", -118, 61.5, "The thermometer says four above."], ["A grocer's boy with a basket", "m", "boy", -116, 65.8, "Delivery for Prospect Street!", 1], ["Two neighbours talking", "f", "lady", -113, 54.6, "Did you hear the professor's ill?"], ["A patrolman on his beat", "m", "police", -111, 63, "Keep to the sidewalk, it's slippery."], ["A man with a coal shovel", "m", "worker", -108, 65.4, "Last of the coal, till the truck comes."], ["A schoolgirl with her satchel", "f", "girl", -105, 58.6, "We're reading Hawthorne this term.", 1], ["An old man with a stick", "m", "gent", -102, 65.6, "Seventy winters on this hill, and every one colder."], ["A woman with a market basket", "f", "lady", -99, 54.4, "The fish man's late again."], ["A telegraph boy", "m", "boy", -95, 62.4, "Wire for Thayer Street!", 1], ["A lady and her terrier", "f", "lady", -91, 65.2, "Come along, Toby, it's too cold to dawdle."], ["Two students arguing", "m", "gent", -86, 54.8, "Einstein, I tell you. Space bends."]].forEach(function (p, i) { if (lite && i % 2)
return; cvwOne("pvfix" + i, p[0], p[1], p[2], p[3], p[4], (i % 2 ? -1 : 1) * 1.2 + Math.PI / 2, p[5], { child: !!p[6] }); });
};
})();
(function () {
var b0 = CVW_SCN.bayou.build;
CVW_SCN.bayou.build = function (G) {
b0.apply(this, arguments);
var lite = cvwLite(), H = cvwByH, st = CVW.st, R = wRand(8181), gx = CV_BY.glade[0], gz = CV_BY.glade[1];
var wet = function (x, z) { return H(x, z) < 0.05 && Math.hypot(x - gx, z - gz) > 34 && cvwPathD(x, z, CV_BY_TRAIL) > 2.4; };
var pads = cvwScatter(8301, lite ? 260 : 900, -160, -420, 160, 480, wet, function () { return 0.05; }, 0.5, 1.2);
cvdInst(G, pads, cvwGeo("lily", function () { var c = new THREE.CircleGeometry(0.5, 10, 0.3, 5.7); c.rotateX(-Math.PI / 2); return c; }), cvwLam(0x3A5A2A, { ds: 1 }));
cvdInst(G, pads.filter(function (p, i) { return i % 7 === 0; }).map(function (p) { return { x: p.x + 0.2, y: 0.12, z: p.z, s: p.s }; }), cvwGeo("lilyF", function () { return new THREE.SphereGeometry(0.1, 6, 4); }), cvwLam(0xF4F0E8, { e: 0x3A3A34 }));
cvwPlant(G, "reeds", cvwScatter(8302, lite ? 160 : 520, -120, -330, 120, 480, function (x, z) { var d = cvwPathD(x, z, CV_BY_TRAIL), g = Math.hypot(x - gx, z - gz); return (d > 2 && d < 9) || (g > 30 && g < 40); }, H, 0.9, 1.5), { keepAll: !lite });
var near = cvwScatter(8303, lite ? 60 : 180, -130, -340, 130, 470, function (x, z) { var d = cvwPathD(x, z, CV_BY_TRAIL), g = Math.hypot(x - gx, z - gz); return ((d > 5.5 && d < 16) || (g > 47 && g < 64)) && Math.hypot(x - CV_BY.huts[0], z - CV_BY.huts[1]) > 32 && !(z > 420 && Math.abs(x) < 30); }, function (x, z) { return H(x, z) - 0.2; }, 0.8, 1.25);
var nearG = cvwScatter(8305, lite ? 8 : 24, gx - 46, gz + 18, gx + 46, gz + 48, function (x, z) { var g = Math.hypot(x - gx, z - gz); return g > 27 && g < 46 && cvwPathD(x, z, CV_BY_TRAIL) > 4.5; }, function (x, z) { return H(x, z) - 0.2; }, 0.8, 1.15);
var frame = [[-11, -204], [10, -207], [-15, -192], [13, -196], [-8, -186], [9, -184], [-19, -212], [17, -214]].map(function (p, i) { return { x: p[0], z: p[1], y: H(p[0], p[1]) - 0.2, s: 0.9 + (i % 3) * 0.12, ry: i * 1.7 }; });
near = near.concat(nearG, frame);
cvwPlant(G, "reeds", [[-6.5, -205], [5.5, -208], [-7, -197], [6.2, -199], [-9, -212], [8, -214], [-5, -190], [5, -192]].reduce(function (a, p, i) { for (var k = 0; k < 6; k++)
a.push({ x: p[0] + ((k * 37 + i) % 7 - 3) * 0.35, z: p[1] + ((k * 53 + i) % 7 - 3) * 0.35, y: H(p[0], p[1]), s: 1.0 + (k % 3) * 0.2, ry: k }); return a; }, []), { keepAll: true });
cvwCypress(G, near);
near.forEach(function (t) { cvwRound(t.x, t.z, 1.0 * t.s); });
cvwPlant(G, "fern", cvwScatter(8304, lite ? 60 : 200, -90, -320, 90, 470, function (x, z) { var d = cvwPathD(x, z, CV_BY_TRAIL); return d > 2.5 && d < 12 && H(x, z) > -0.1; }, H, 0.6, 1.0), {});
var fogC = st.rite ? 0x6A4A3A : 0x9AA090;
for (var f = 0; f < (lite ? 10 : 28); f++) {
var tp = CV_BY_TRAIL[f % CV_BY_TRAIL.length], a = R() * 6.283, r = 10 + R() * 30;
cvdFog(G, tp[0] + Math.cos(a) * r, 1.0 + R() * 1.2, tp[1] + Math.sin(a) * r, 30 + R() * 30, 5, R() * 3, fogC, 0.16);
}
for (f = 0; f < (lite ? 5 : 12); f++) {
var a2 = f / 12 * 6.283;
cvdFog(G, gx + Math.cos(a2) * 56, 1.4, gz + Math.sin(a2) * 56, 44, 6, -a2 + Math.PI / 2, fogC, 0.14);
}
if (st.rite) {
for (var gl = 0; gl < (lite ? 8 : 16); gl++) {
var ga = gl / (lite ? 8 : 16) * 6.283 + 0.3, gr = 34 + (gl % 3) * 9;
cvdGlow(G, gx + Math.cos(ga) * gr, 0.12, gz + Math.sin(ga) * gr, 0xFFA050, 2.2 + (gl % 2), 0.22);
}
cvdGlow(G, gx, H(gx, gz) + 4, gz, 0xFF8A3A, 40, 0.32);
cvdGlow(G, gx, H(gx, gz) + 10, gz, 0xFF6A2A, 90, 0.14);
}
};
})();
(function () {
var b0 = CVW_SCN.harbour.build;
CVW_SCN.harbour.build = function (G) {
b0.apply(this, arguments);
var lite = cvwLite(), H = cvwHbH, R = wRand(7272), q = CV_HB_ROADS.quay;
var bol = cvdAlong(q, lite ? 14 : 7, 8.4, -1).map(function (p) { return { x: p.x, z: p.z, y: H(p.x, p.z) }; });
cvdInst(G, bol, cvwGeo("bollard", function () { var parts = [], c = new THREE.CylinderGeometry(0.22, 0.28, 0.8, 10); c.translate(0, 0.4, 0); parts.push(c.toNonIndexed()); var t = new THREE.SphereGeometry(0.3, 10, 6); t.scale(1, 0.5, 1); t.translate(0, 0.82, 0); parts.push(t.toNonIndexed()); return gwMerge(parts); }), cvwLam(0x1E2022));
for (var k = 0; k < (lite ? 8 : 22); k++) {
var p = cvdAlong(q, 30, 2 + R() * 4, -1)[k % 28];
if (!p || Math.abs(p.x) < 14)
continue;
if (k % 3 === 0)
cvdBarrels(G, p.x, H(p.x, p.z), p.z, 4 + (k % 4));
else
cvdCrates(G, p.x, H(p.x, p.z), p.z, 3 + (k % 4), R);
}
[[-60, -40], [40, -38], [-200, -42], [260, -42]].forEach(function (c, i) { if (lite && i > 1)
return; var cg = new THREE.Group(); cg.position.set(c[0], H(c[0], c[1]), c[1]); G.add(cg); [-1, 1].forEach(function (s) { cvwBox(cg, 0.4, 7, 0.4, cvwMat("iron"), s * 2, 0, -1.4); cvwBox(cg, 0.4, 7, 0.4, cvwMat("iron"), s * 2, 0, 1.4); }); cvwBox(cg, 4.6, 1.4, 3.4, cvwLam(0x3A2A22), 0, 7, 0); cvwBox(cg, 1.8, 1.6, 1.8, cvwLam(0x2A2A2A), 0, 8.4, 0); var jib = cvwBox(cg, 0.5, 0.5, 16, cvwMat("iron"), 0, 9.4, -7); jib.rotation.x = -0.42; cvwBox(cg, 0.04, 6, 0.04, cvwMat("rope"), 0, 6, -13.6); cvwRound(c[0], c[1], 2.8); });
for (var b = 0; b < (lite ? 3 : 8); b++) {
var bx = -300 + b * 80 + (b % 2) * 14;
if (Math.abs(bx + 120) < 26 || Math.abs(bx - 100) < 60)
continue;
var bt = new THREE.Group();
bt.position.set(bx, 0.3, -54);
G.add(bt);
cvwBoat(bt, 0, 0, 0, 0.2 * b, {});
}
cvdAlong(q, lite ? 80 : 40, 5, 1).forEach(function (p, i) { cvwELamp(G, p.x, p.z, H, {}); });
var prom = q.map(function (p) { return [p[0], p[1] - 13]; });
cvwStrip(G, prom, 15, H, cvwMat("paving"), 0.1);
var clear = function (x) { return Math.abs(x - 60) > 9 && Math.abs(x - 120) > 9 && Math.abs(x - 180) > 9 && Math.abs(x + 112) > 6 && Math.abs(x + 120) > 8 && Math.abs(x) > 6; };
var figs = cvdAlong(prom, lite ? 60 : 30, -4, 1).filter(function (p) { return clear(p.x); }).map(function (p) { return { x: p.x, z: p.z, y: H(p.x, p.z), s: 1.35 + ((p.x * 7) % 5 + 5) % 5 * 0.06, ry: p.x }; });
cvwPlant(G, "tree", figs, { col: 0x2A4426 });
figs.forEach(function (t) { cvwRound(t.x, t.z, 0.8); });
var bn = cvdAlong(prom, lite ? 40 : 15, 2.5, 1).filter(function (p) { return clear(p.x) && figs.every(function (t) { return Math.abs(t.x - p.x) > 3; }); }).map(function (p) { return { x: p.x, z: p.z, y: H(p.x, p.z) + 0.05, ry: p.ry + Math.PI / 2 }; });
cvdInst(G, bn, cvdBenchGeo(), cvwMat("darkoak"));
cvdAlong(prom, lite ? 60 : 30, -6.5, 1).forEach(function (p, i) { if (clear(p.x))
cvwELamp(G, p.x, p.z, H, {}); });
(function () {
var kx = 32, kz = -37, ky = H(kx, kz), k = new THREE.Group();
k.position.set(kx, ky, kz);
k.rotation.y = Math.PI;
G.add(k);
var gr = cvwLam(0x2A4A34), cr = cvwLam(0xE8E0C8);
cvwBox(k, 2.6, 2.5, 2.0, gr, 0, 0, 0);
cvwBox(k, 1.8, 0.9, 0.06, cvwMat("pane"), 0, 1.2, 1.01);
cvwBox(k, 2.0, 0.08, 0.4, cr, 0, 1.12, 1.2);
var rf = new THREE.Mesh(cvwGeo("kroof", function () { var c = new THREE.ConeGeometry(2.1, 0.9, 4); c.rotateY(Math.PI / 4); return c; }), cvwLam(0x6A2A22));
rf.position.y = 2.95;
k.add(rf);
cvwSign(k, "FERRIES · TICKETS", 2.2, 0.36, 0, 2.25, 1.04, 0, { bg: "#1E2A22", ink: "#F0D890" });
cvwSign(k, "MANLY  ·  MOSMAN  ·  NEUTRAL BAY", 1.8, 0.3, 0, 0.55, 1.04, 0, { bg: "#E8E0C8", ink: "#1E2A22" });
cvwSolid(kx, kz, 2.8, 2.2, ky - 1, ky + 3, 0);
})();
var RB = wRand(7373), cols = [0xD8B888, 0xB86A4E, 0x9A5A44, 0xC8C0B0, 0xE0C898, 0x8A5A48];
for (var bx = -420; bx <= 420; bx += lite ? 96 : 48)
for (var bz = 56; bz <= 440; bz += lite ? 100 : 50) {
var jx = bx + (RB() - 0.5) * 10, jz = bz + (RB() - 0.5) * 8, w = 24 + RB() * 12, dd = 22 + RB() * 10;
if (Math.abs(jx + 80) < 32 || Math.abs(jx - 80) < 32 || Math.abs(jz - 120) < 24 || (jx > 70 && jx < 320 && jz > 190) || (Math.abs(jx) < 36 && jz < 60))
continue;
var hh = 10 + RB() * 8 + cvwSmooth(40, 400, jz) * 14 + (RB() < 0.15 ? 12 : 0);
cvdBlock(G, jx, H(jx, jz) - 0.5, jz, w, dd, hh, cols[Math.floor(RB() * cols.length)], 0);
}
var trees = [];
for (var tx = -400; tx <= 400; tx += lite ? 44 : 22) {
if (Math.abs(tx + 80) < 14 || Math.abs(tx - 80) < 14)
continue;
[-1, 1].forEach(function (s) { trees.push({ x: tx, z: 120 + s * 8.5, y: H(tx, 120 + s * 8.5), s: 0.8 + RB() * 0.3, ry: RB() * 6 }); });
}
for (var tz = 150; tz <= 480; tz += lite ? 60 : 30)
[-1, 1].forEach(function (s) { trees.push({ x: -80 + s * 8.5, z: tz, y: H(-80 + s * 8.5, tz), s: 0.8 + RB() * 0.3, ry: RB() * 6 }); });
cvwPlant(G, "tree", trees, { col: 0x2E4A2A });
[[-40, -210, 0.3, "s", { L: 62, B: 10, name: "MARELLA", house: 0xF0E8D8, funnel: 0x1A1A1A, band: 0xC8A040, free: 2.4 }], [250, -170, -0.4, "s", { L: 40, B: 8, name: "BARAGOOLA", house: 0xF4F0E0, funnel: 0xE8C850, band: 0x1A1A1A, masts: false, free: 1.8 }], [110, -280, 1.2, "k", { L: 34, B: 7, D: 3, free: 1.6, masts: [-6, 6], mastH: 18, sails: false, name: "WANDERER", hullCol: 0x2A2A2E, stripe: 0xE8E0D0 }], [-230, -250, -0.2, "s", { L: 80, B: 13, name: "ORMISTON", house: 0xE8E0D0, funnel: 0x1A1A1A, band: 0xC83A2A, free: 3 }], [360, -260, 0.8, "s", { L: 36, B: 8, name: "KOOMPARTOO", house: 0xF4F0E0, funnel: 0xE8C850, band: 0x1A1A1A, masts: false, free: 1.8 }]].forEach(function (v, i) { if (lite && i > 1)
return; if (v[3] === "s")
cvwSteamer(G, v[0], 0.2, v[1], v[2], v[4]);
else
cvwShip(G, v[0], 0.2, v[1], v[2], v[4]); });
cvwCrowd("hbdock", [["A stevedore with a hook", "m", "worker", "Wool for London, that lot. Mind your feet."], ["A tally clerk", "m", "gent", "Forty-two bales... forty-three..."], ["A carter", "m", "worker", "Where's this lot going, then?"], ["A ferry passenger", "f", "lady", "Is this the Mosman boat?"], ["A sailor on shore leave", "m", "cvsailor", "First pint's on me, mate."], ["A Salvation Army lass", "f", "lady", "God bless you, sir."], ["A newsboy", "m", "boy", "Herald! Read all about it!", null, true], ["A customs officer", "m", "police", "Papers, please."], ["A woman with a market basket", "f", "lady", "Fresh from the Rocks this morning."], ["A ship's engineer", "m", "cvsailor", "Boilers like a kettle in this heat."], ["A ferry hand with a rope", "m", "cvsailor", "Stand clear of the gangway!"], ["A family off the Manly boat", "f", "lady", "Hold my hand on the steps, love."], ["A small boy with a kite", "m", "boy", "Look how high it goes!", null, true], ["A gentleman in a boater", "m", "gent", "Office by nine, and it's ten to."], ["A fruit seller with her barrow", "f", "lady", "Oranges! Penny each!"], ["A waterside worker", "m", "worker", "Smoko in five."]], -12, -38, 60, -26, { wander: 4 });
[["A ferry passenger with a portmanteau", "m", "gent", -6, -31, "Neutral Bay, and then the office."], ["A nursemaid with a pram", "f", "lady", 2, -27, "Shh, he's only just asleep."], ["A wharfie on his break", "m", "worker", 8, -36, "Hot one today."], ["A girl with a straw hat", "f", "girl", 14, -29, "Can we go on the ferry, Mum?", 1], ["A sailor with his kit bag", "m", "cvsailor", 20, -34, "Six months at sea and she's not changed a bit."], ["A lady with a parasol", "f", "lady", 28, -31, "The harbour's like glass this afternoon."], ["A man with a sandwich board", "m", "worker", -2, -37, "Eat at Sargent's! Best pies in Sydney!"], ["Two clerks with their lunch", "m", "gent", 11, -32, "The Herald says the Alert's come in with a queer cargo."], ["A woman selling flowers", "f", "lady", 24, -37, "Boronia! Fresh boronia!"], ["A policeman by the gates", "m", "police", 33, -27, "Ferries to the left, please."], ["A boy selling newspapers", "m", "boy", 38, -35, "Evening News! Read all about it!", 1], ["An old couple off the boat", "f", "lady", 44, -29, "Taronga next Sunday, Albert, you promised."]].forEach(function (p, i) { if (lite && i % 2)
return; cvwOne("hbfix" + i, p[0], p[1], p[2], p[3], p[4], -1.2 + (i % 3) * 0.9, p[5], { child: !!p[6] }); });
};
})();
(function () {
var b0 = CVW_SCN.oslo.build;
CVW_SCN.oslo.build = function (G) {
b0.apply(this, arguments);
var lite = cvwLite(), H = cvwOsH, R = wRand(6363);
var cols = ["planks", "oak", "planks", "render"];
for (var i = 0; i < (lite ? 5 : 12); i++) {
var x = -420 + i * 72 + ((i * 13) % 9);
if ([-380, -210, -40, 130, 300].some(function (w) { return Math.abs(x - w) < 24; }))
continue;
cvwTownHouse(G, x, -30, 12, 9, 6.4, { wall: cols[i % 4], roof: i % 2 ? "tile" : "slate", ry: Math.PI, shut: [0x7A2A1E, 0x2A3A4A, 0xA8782A][i % 3] });
}
for (var b = 0; b < (lite ? 4 : 12); b++) {
var bx = -430 + b * 72 + ((b * 17) % 20);
if (Math.abs(bx + 200) < 44 || Math.abs(bx - 120) < 24 || Math.abs(bx - 320) < 36)
continue;
var bt = new THREE.Group();
bt.position.set(bx, 0.3, -64 - (b % 2) * 3);
G.add(bt);
cvwBoat(bt, 0, 0, 0, Math.PI / 2 + (b % 3 - 1) * 0.15, {});
}
var netM = cvwM("osnet", function () { var t = cvwCanvas("osnetT", 64, 64, function (c, W, Hh) { c.clearRect(0, 0, W, Hh); c.strokeStyle = "rgba(60,50,40,.9)"; c.lineWidth = 1.4; for (var k = 0; k < W; k += 6) {
c.beginPath();
c.moveTo(k, 0);
c.lineTo(k + 3, Hh);
c.stroke();
c.beginPath();
c.moveTo(0, k);
c.lineTo(W, k + 3);
c.stroke();
} }); t.repeat.set(3, 2); var m = new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.3, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
for (var n = 0; n < (lite ? 4 : 10); n++) {
var nx = -400 + n * 84 + 20, nz = -44;
var rg = new THREE.Group();
rg.position.set(nx, H(nx, nz), nz);
G.add(rg);
[-1, 1].forEach(function (s) { cvwCyl(rg, 0.07, 0.07, 2.4, cvwMat("darkbark"), s * 2, 0, 0, 6); });
cvwBox(rg, 4.2, 0.08, 0.08, cvwMat("darkbark"), 0, 2.3, 0);
var net = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), netM);
net.position.set(0, 1.3, 0.05);
rg.add(net);
cvdBarrels(G, nx + 4, H(nx + 4, nz + 3), nz + 3, 3);
cvdCrates(G, nx - 5, H(nx - 5, nz + 2), nz + 2, 2, R);
}
var RT = wRand(6464), paint = [0xB8432E, 0xE0BC68, 0xF2EEE4, 0x7A94A8, 0xC8783A, 0x9A3A2A], nH = 0;
for (var t = 0; t < (lite ? 40 : 120) && nH < (lite ? 9 : 26); t++) {
var hx = 90 + RT() * 260, hz = -6 + RT() * 230;
if (cvwPathD(hx, hz, CV_OS_ROADS.egeberg) < 10 || Math.hypot(hx - 200, hz - 180) < 16)
continue;
nH++;
cvwTownHouse(G, hx, hz, 9 + RT() * 3, 7 + RT() * 2, 6 + RT() * 2.4, { wallM: cvwS("siding", paint[Math.floor(RT() * paint.length)], 2.2), roof: RT() < 0.5 ? "tile" : "slate", ry: Math.PI + (RT() - 0.5) * 0.5, shut: 0xF2EEE4 });
}
[-64, -40, -16, 8, 32, 56, 80].forEach(function (hx, i) { if (lite && i % 2)
return; cvwTownHouse(G, hx, 6 + (i % 2) * 3, 10, 8, 6.6 + (i % 3) * 0.8, { wallM: cvwS("siding", paint[(i * 2 + 1) % paint.length], 2.2), roof: i % 2 ? "tile" : "slate", ry: Math.PI, shut: 0xF2EEE4 }); });
cvwStrip(G, [[-120, -4], [100, -4]], 6, H, cvwMat("cobbles"), 0.09);
[-104, -88, -72].forEach(function (hx, i) { cvwTownHouse(G, hx, -12, 10, 7, 6.4 + i * 0.6, { wallM: cvwS("siding", paint[(i * 3 + 2) % paint.length], 2.2), roof: i % 2 ? "slate" : "tile", ry: Math.PI, shut: 0xF2EEE4 }); });
cvwStrip(G, [[-122, -35], [-58, -35]], 12.6, H, cvwMat("cobbles"), 0.09);
cvdBarrels(G, -114, H(-114, -38), -38, 5);
cvdCrates(G, -97, H(-97, -39), -39, 3, wRand(6470));
cvwCart(G, -78, -37, 0.3, { seat: true, len: 2.2, w: 1.4, hcol: 0x2A1A10 });
var fence = [];
for (var fx = -111; fx < 96; fx += 2.05) {
if (Math.abs(fx + 40) < 18 && fx > -58 && fx < -22)
continue;
if (Math.abs(((fx + 111) % 16) - 8) < 1.1)
continue;
fence.push({ x: fx, z: 0.4, y: H(fx, 0.4), ry: 0 });
if (fx < -62)
fence.push({ x: fx, z: -27.6, y: H(fx, -27.6), ry: 0 });
}
cvdInst(G, fence, cvdPicketGeo(), cvwMat("white"));
cvwPlant(G, "bush", cvwScatter(6466, lite ? 14 : 40, -110, 1.2, 96, 3.4, null, H, 0.4, 0.7), { col: 0x4A6A3A });
cvwPlant(G, "bush", cvwScatter(6467, lite ? 10 : 28, -110, -26.6, -64, -17, null, H, 0.4, 0.8), { col: 0x5A7A3A });
cvwPlant(G, "flowers", cvwScatter(6469, lite ? 10 : 30, -110, -26.6, -64, -18, null, H, 0.6, 1), {});
if (typeof cvwPlant === "function")
cvwPlant(G, "flowers", cvwScatter(6468, lite ? 10 : 30, -110, 1.2, 96, 3.6, null, H, 0.6, 1), {});
[["A woman at her garden gate", "f", "lady", -100, -29.2, "The wind brings the coal dust off the boats."], ["A boy with a hoop", "m", "boy", -92, -31.5, "Watch out!", 1], ["A postman", "m", "worker", -84, -30.4, "Two for you, Fru Hansen."], ["Two old neighbours at a gate", "f", "cvwidow", -76, -1.6, "The Johansen woman's husband is home, they say. White as a sheet."], ["A sailor going home", "m", "cvsailor", -66, -5, "Six weeks to Rio and back."], ["A girl skipping", "f", "girl", -58, -3.4, "One, two, three!", 1]].forEach(function (p, i) { if (lite && i % 2)
return; cvwOne("osst" + i, p[0], p[1], p[2], p[3], p[4], i % 2 ? Math.PI / 2 : -Math.PI / 2, p[5], { child: !!p[6] }); });
(function () {
var cx = -30, cz = 34, cy = H(cx, cz);
cvwTownHouse(G, cx, cz + 6, 12, 22, 9, { wall: "render", roof: "slate", ry: Math.PI, shut: 0x2A3A4A });
var tw = new THREE.Group();
tw.position.set(cx, cy, cz - 8);
G.add(tw);
cvwBox(tw, 6.4, 19, 6.4, cvwMat("render"), 0, 0, 0);
cvwBox(tw, 6.9, 0.5, 6.9, cvwMat("ashlar"), 0, 19, 0);
for (var k = 0; k < 4; k++) {
var a = k * Math.PI / 2;
cvwBox(tw, 1.2, 2.4, 0.1, cvwLam(0x1A1A1A), Math.sin(a) * 3.25, 15, Math.cos(a) * 3.25).rotation.y = a;
}
var sp = new THREE.Mesh(cvwGeo("osspire", function () { return new THREE.ConeGeometry(4.2, 20, 8); }), cvwLam(0x5E8A72));
sp.position.y = 29.5;
tw.add(sp);
var cr = new THREE.Mesh(cvwBoxG(0.2, 2.2, 0.2), cvwLam(0xC8A040));
cr.position.y = 40.4;
tw.add(cr);
cvwSolid(cx, cz - 8, 7, 7, cy - 1, cy + 40, 0);
})();
[["A docker with a sack-truck", "m", "worker", -92, -44, "Coffee from Santos. Heavy stuff."], ["A fisherman with his catch", "m", "cvsailor", -84, -52, "Makrell! Mackerel, still kicking."], ["A lady with her umbrella", "f", "lady", -76, -41, "The Bergen boat is always late."], ["Two sailors talking", "m", "cvsailor", -68, -50, "They say the Emma's mate came home alone."], ["A girl with a basket of eggs", "f", "girl", -60, -43, "For the ship's cook!", 1], ["A harbour policeman", "m", "police", -52, -48, "Keep the gangway clear."], ["A porter with a trunk", "m", "worker", -46, -42, "Second class this way."], ["A woman mending a net", "f", "cvsquatterf", -38, -51, "Every winter the same holes."]].forEach(function (p, i) { if (lite && i % 2)
return; cvwOne("osfix" + i, p[0], p[1], p[2], p[3], p[4], 1.6 + (i % 3 - 1) * 0.9, p[5], { child: !!p[6] }); });
cvwCrowd("osdock", [["A fisherman mending a net", "m", "cvsailor", "Torsk, good cod this week."], ["A fish-wife with her basket", "f", "cvsquatterf", "Fersk sild! Fresh herring!"], ["A stevedore", "m", "worker", "Mind your back!"], ["A lady off the Bergen boat", "f", "lady", "Is there a cab to the Old Town?"], ["A young sailor", "m", "cvsailor", "London tonight, and then who knows?"], ["An old harbour master", "m", "gent", "Tide turns at four."], ["A boy with a fishing line", "m", "boy", "I caught one this big!", null, true], ["A passenger with his trunk", "m", "gent", "London, second class. Is this the gangway?"], ["A girl selling flowers", "f", "girl", "Blomster! Flowers!", null, true], ["A customs man", "m", "police", "Papers, please."], ["A woman seeing someone off", "f", "lady", "Write when you get there."]], -200, -50, -125, -38, { wander: 4 });
};
})();
(function () {
var b0 = CVW_SCN.rlyeh.build;
CVW_SCN.rlyeh.build = function (G) {
b0.apply(this, arguments);
var lite = cvwLite(), H = cvwRlH, st = CVW.st, R = wRand(5353), dream = !!st.dream;
var oz = cvwMat("ooze");
if (oz.emissive)
oz.emissive.setHex(0x0C2A10);
for (var i = 0; i < (lite ? 10 : 30); i++) {
var a = R() * 6.283, r = 30 + R() * 200, x = Math.cos(a) * r, z = Math.sin(a) * r - 20, y = Math.max(0, H(x, z));
cvdFog(G, x, y + 2 + R() * 6, z, 40 + R() * 50, 8 + R() * 6, R() * 3, 0x6AA078, 0.12);
if (i % 2 === 0)
cvdGlow(G, x, y + 1.5, z, CV_LOOK.glow, 10 + R() * 14, 0.18);
}
CV_RL_PATH.forEach(function (p, k) {
if (k === 0 || k === CV_RL_PATH.length - 1)
return;
var s = k % 2 ? 1 : -1, bx = p[0] + s * 24, bz = p[1] - 4, by = H(bx, bz) - 1;
var th = 16 + k % 3 * 4, tt = cvwTitan(G, 18, th, 6, bx, by, bz, s * 0.3, { mat: [cvdWetStoneM(), cvdWetStoneM(), cvwMat("ooze"), cvwMat("rlstoneD"), cvwMat("rlcarve"), cvwMat("rlcarve")], sx: s * 0.1, solid: true });
var wg = new THREE.Group();
wg.position.set(bx, by, bz);
wg.rotation.y = s * 0.3;
G.add(wg);
[-1, 1].forEach(function (f) { var wm = new THREE.Mesh(cvdWeedGeo(6), cvwVcM("weedVC")); wm.position.set(f * (9.08) + s * 0.1 * th, th - 0.2, 0); wm.rotation.y = Math.PI / 2; wg.add(wm); var wm2 = new THREE.Mesh(cvdWeedGeo(6), cvwVcM("weedVC")); wm2.position.set(f * 9.05 + s * 0.1 * th * 0.55, th * 0.55, 0); wm2.rotation.y = Math.PI / 2; wm2.scale.set(1, 0.6, 1); wg.add(wm2); });
cvwBasRelief(G, bx - s * 0.2, by + 4, bz + 3.2, s * 0.3, { s: 9, flat: 1, wet: 1 });
cvwOozeOn(G, bx, by + 10, bz + 3.4, 12, 14, s * 0.3);
});
if (!lite)
[[-40, 140, 0.6, 18], [46, 60, -0.7, 22], [-56, -30, 0.8, 26], [60, -70, -0.9, 30]].forEach(function (q) { var sg = new THREE.Group(), y = H(q[0], q[1]) - 1; sg.position.set(q[0], y, q[1]); sg.rotation.set(0.1, q[2] + Math.PI, -0.08); G.add(sg); cvwTitan(sg, q[3] * 0.6, q[3] * 0.3, q[3] * 0.5, 0, 0, 0, 0, { carve: 1 }); var F = cvwForm(cvwMat("rlstone"), { dark: cvwMat("rlstoneD"), feelers: 8, seg: 12, big: 1 }); F.scale.setScalar(q[3] * 0.5); F.position.y = q[3] * 0.3; sg.add(F); cvwSolid(q[0], q[1], q[3] * 0.6, q[3] * 0.5, y - 1, y + q[3] * 1.4, q[2]); });
[[-70, -215, 70, 40, 30, 0.25, -0.06], [60, -225, 90, 46, 34, -0.3, 0.05], [-20, -260, 120, 56, 40, 0.1, 0.04], [110, -180, 60, 36, 28, 0.5, -0.08], [-120, -180, 56, 34, 30, -0.45, 0.07], [30, -300, 140, 70, 40, 0.2, -0.03], [-90, -280, 96, 48, 36, -0.2, 0.06], [140, -260, 80, 40, 30, 0.6, 0.05], [-150, -240, 70, 40, 30, -0.6, -0.05]].forEach(function (q, i) { if (lite && i % 2)
return; cvdTower(G, q[0], H(q[0], q[1]) - 4, q[1], q[3], q[2], q[4], q[5], q[6], i, lite); });
var dy = H(CV_RL.door[0], CV_RL.door[1]);
[-1, 1].forEach(function (s) { var sg = new THREE.Group(), x = CV_RL.door[0] + s * 36, z = CV_RL.door[1] + 2; sg.position.set(x, dy - 1, z); sg.rotation.y = -s * 0.35; G.add(sg); cvwTitan(sg, 16, 8, 14, 0, 0, 0, 0, { carve: 1 }); var F = cvwForm(cvwMat("rlstone"), { dark: cvwMat("rlstoneD"), feelers: lite ? 6 : 10, seg: 12, big: 1 }); F.scale.setScalar(16); F.position.y = 8; sg.add(F); cvwSolid(x, z, 16, 14, dy - 2, dy + 40, 0); });
cvdGlow(G, CV_RL.door[0], dy + 3, CV_RL.door[1] + 6, CV_LOOK.glow, 36, dream ? 0.3 : 0.22);
cvdGlow(G, CV_RL.door[0], dy + 30, CV_RL.door[1] - 4, 0x9AE8B8, 70, 0.08);
[[-17, 2.6, 14], [-14.4, 1.4, 22], [14.2, 2.2, 10], [16.8, 1.4, 18]].forEach(function (o, d) { if (lite && d % 2)
return; cvwOozeOn(G, CV_RL.door[0] + o[0], dy + 30 - o[2] / 2, CV_RL.door[1] + 2.6, o[1], o[2], 0); });
var ws = [cvdWetStoneM(), cvdWetStoneM(), cvwMat("ooze"), cvwMat("rlstoneD"), cvwMat("rlcarve"), cvwMat("rlcarve")], wsd = [cvwMat("rlstoneD"), cvwMat("rlstoneD"), cvwMat("ooze"), cvwMat("rlstoneD"), cvdWetStoneM(), cvdWetStoneM()];
var away = function (x, z) { return cvwPathD(x, z, CV_RL_PATH) > 14 && Math.hypot(x - CV_RL.door[0], z - CV_RL.door[1]) > 48 && Math.hypot(x - CV_RL.mono[0], z - CV_RL.mono[1]) > 30; };
CV_RL_PATH.forEach(function (p, k) {
if (k === 0)
return;
if (lite && k % 2)
return;
[-1, 1].forEach(function (s) {
var x = p[0] + s * (34 + (k * 7) % 12), z = p[1] + ((k * 13) % 10) - 5;
if (away(x, z) && H(x, z) > -2) {
var hh = 14 + (k * 5) % 10, sl = cvwTitan(G, 7, hh, 2.4, x, H(x, z) - 1.5, z, s * 0.6 + k * 0.3, { mat: ws, mpt: 5 });
sl.rotation.x = 0.22 * s + 0.06 * k % 0.2;
sl.rotation.z = -s * 0.32;
sl.position.y = H(x, z) - 1.5 + hh / 2 * Math.cos(0.32);
cvwSolid(x, z, 7, 4, H(x, z) - 1, H(x, z) + hh, s * 0.6 + k * 0.3);
}
var dx = p[0] - s * (44 + (k * 11) % 10), dz = p[1] + ((k * 7) % 12) - 6;
if (k % 2 === 0 && away(dx, dz) && H(dx, dz) > -2) {
var fr = new THREE.Group(), fy = H(dx, dz) - 1;
fr.position.set(dx, fy, dz);
fr.rotation.set(0.12 * s, -s * 0.9 + k * 0.2, 0.2 * s);
G.add(fr);
cvwTitan(fr, 2.6, 15, 3, -4.2, 0, 0, 0, { mat: ws, sx: 0.12 });
cvwTitan(fr, 2.6, 13, 3, 4.2, 0, 0, 0, { mat: ws, sx: 0.2 });
var li = cvwTitan(fr, 13, 2.8, 3.6, 0.9, 13.4, 0, 0, { mat: ws, mpt: 5 });
li.rotation.z = -0.16;
var rc = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 12.6), cvwLam(0x050806));
rc.position.set(1.0, 6.6, -0.6);
rc.rotation.z = -0.1;
fr.add(rc);
cvwSolid(dx, dz, 12, 5, fy, fy + 16, -s * 0.9 + k * 0.2);
}
var ox = p[0] + s * (58 + (k * 5) % 14), oz = p[1] - ((k * 9) % 14);
if (k % 2 === 1 && away(ox, oz) && H(ox, oz) > -2) {
var oy = H(ox, oz) - 2, og = new THREE.Group();
og.position.set(ox, oy, oz);
og.rotation.y = k * 0.7 + s * 0.4;
G.add(og);
[[0, 0, 12, 8, 10], [-s * 3, 8, 13, 6, 11], [-s * 7, 14, 14, 5, 9], [-s * 10.5, 19, 12, 4, 8]].forEach(function (b, j) { if (lite && j === 3)
return; var m = cvwTitan(og, b[2], b[3], b[4], b[0], b[1], j % 2 ? 1.5 : -1, j * 0.18, { mat: j % 2 ? wsd : ws, tw: 0.02 * j }); m.rotation.z = -s * 0.05 * j; });
cvwSolid(ox, oz, 14, 12, oy, oy + 24, k * 0.7 + s * 0.4);
}
});
});
[[20, -30, "slab", 0.5, 1], [-22, -8, "door", 1, -1], [-26, -46, "slab", -0.6, -1], [24, -62, "over", 0.9, 1], [-20, 22, "door", -0.4, 1]].forEach(function (q, i) {
if (lite && i % 2)
return;
var x = q[0], z = q[1], s = q[4], gy = H(x, z);
if (cvwPathD(x, z, CV_RL_PATH) < 14)
return;
if (q[2] === "slab") {
var hh = 22, sl = cvwTitan(G, 8, hh, 2.6, x, gy - 1.5, z, q[3], { mat: ws });
sl.rotation.x = 0.18 * s;
sl.rotation.z = -s * 0.36;
sl.position.y = gy - 1.5 + hh / 2 * Math.cos(0.36);
cvwSolid(x, z, 9, 5, gy - 1, gy + hh, q[3]);
}
else if (q[2] === "door") {
var fr = new THREE.Group();
fr.position.set(x, gy - 1, z);
fr.rotation.set(0.1 * s, q[3], 0.22 * s);
G.add(fr);
cvwTitan(fr, 3, 18, 3.4, -5, 0, 0, 0, { mat: ws, sx: 0.14 });
cvwTitan(fr, 3, 15, 3.4, 5, 0, 0, 0, { mat: ws, sx: 0.24 });
var li = cvwTitan(fr, 15.5, 3.2, 4, 1.2, 15.6, 0, 0, { mat: ws });
li.rotation.z = -0.18;
var rc = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 14.6), cvwLam(0x040705));
rc.position.set(1.2, 7.6, -0.8);
rc.rotation.z = -0.12;
fr.add(rc);
cvwSolid(x, z, 14, 6, gy - 1, gy + 19, q[3]);
}
else {
var og = new THREE.Group();
og.position.set(x, gy - 2, z);
og.rotation.y = q[3];
G.add(og);
[[0, 0, 12, 8, 10], [-s * 3, 8, 13, 6, 11], [-s * 7, 14, 14, 5, 9], [-s * 10.5, 19, 12, 4, 8]].forEach(function (b, j) { var m = cvwTitan(og, b[2], b[3], b[4], b[0], b[1], j % 2 ? 1.5 : -1, j * 0.18, { mat: j % 2 ? wsd : ws, tw: 0.02 * j }); m.rotation.z = -s * 0.05 * j; });
cvwSolid(x, z, 14, 12, gy - 2, gy + 24, q[3]);
}
});
var weed = cvwScatter(5354, lite ? 40 : 140, -50, 150, 60, 240, function (x, z) { return H(x, z) > -0.6 && cvwPathD(x, z, CV_RL_PATH) > 2.5; }, function (x, z) { return H(x, z) + 0.04; }, 0.8, 2.4);
cvdInst(G, weed, cvwGeo("rlweed", function () { var c = new THREE.CircleGeometry(1, 9); c.rotateX(-Math.PI / 2); var pa = c.attributes.position; for (var v = 1; v < pa.count; v++) {
var k = 0.6 + ((v * 37) % 11) / 14;
pa.setX(v, pa.getX(v) * k);
pa.setZ(v, pa.getZ(v) * k * 0.7);
} return c; }), cvwLam(0x1C2818));
};
})();
(function () {
if (typeof cvwTick !== "function")
return;
var t0 = cvwTick, acc = 0;
cvwTick = function (dt) { var r = t0.apply(this, arguments); acc += dt || 0; if (acc > 1) {
acc = 0;
for (var i = 0; i < CVW.people.length; i++) {
var g = CVW.people[i].g;
if (g)
g.traverse(function (m) { if (m.isSkinnedMesh && m.frustumCulled)
m.frustumCulled = false; });
}
} return r; };
})();
(function () {
var b0 = CVW_SCN.sea.build;
CVW_SCN.sea.build = function (G) {
b0.apply(this, arguments);
var E = CVW.emma;
if (!E)
return;
var g = E.g, lite = cvwLite(), oak = cvwMat("oak"), dk = cvwMat("darkoak"), iron = cvwMat("iron");
var foamT = function (k, draw) { return cvwM("emFoam" + k, function () { var t = cvwCanvas("emFoamT" + k, 128, 256, draw); var m = new THREE.MeshLambertMaterial({ color: 0xF8FAFC, map: t, transparent: true, depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }); m.userData.noPhoto = 1; return m; }); };
var fo = function (m) { m.renderOrder = 5; return m; };
var spray = function (c, W, H, edge) { var R = wRand(edge ? 505 : 506); c.clearRect(0, 0, W, H); for (var i = 0; i < 900; i++) {
var y = R() * H, x = edge ? (R() < 0.5 ? R() * W * 0.22 : W - R() * W * 0.22) : (W / 2 + (R() - 0.5) * W * (0.2 + 0.8 * y / H)), r = 1 + R() * 4, a = edge ? 0.7 : 0.75 * (1 - y / H);
c.fillStyle = "rgba(255,255,255," + (a * (0.4 + R() * 0.6)).toFixed(2) + ")";
c.beginPath();
c.arc(x, y, r, 0, 7);
c.fill();
} };
var wy = -1.7, ring = new THREE.Mesh(cvwGeo("emFoamOv3", function () { var c = new THREE.CircleGeometry(1, 40); c.scale(12, 27, 1); return c; }), foamT("oval3", function (c, W, H) { var R = wRand(508); c.clearRect(0, 0, W, H); for (var i = 0; i < 3800; i++) {
var a = R() * 6.283, r = Math.sqrt(R()), x = W / 2 + Math.cos(a) * r * W / 2, y = H / 2 + Math.sin(a) * r * H / 2, f = r < 0.3 ? 0 : Math.max(0, Math.min(1, (r - 0.3) / 0.06) * Math.pow(Math.max(0, 1 - (r - 0.3) / 0.5), 1.6)), rr = 1 + R() * 3.5;
if (f < R() * 0.8)
continue;
c.fillStyle = "rgba(255,255,255," + (0.3 + 0.6 * f).toFixed(2) + ")";
c.save();
c.translate(x, y);
c.scale(0.6, 1.6);
c.beginPath();
c.arc(0, 0, rr, 0, 7);
c.fill();
c.restore();
} }));
ring.rotation.x = -Math.PI / 2;
ring.position.set(0, wy, -0.5);
g.add(fo(ring));
[-1, 1].forEach(function (k) { var wk = new THREE.Mesh(new THREE.PlaneGeometry(7, 40), foamT("wake", function (c, W, H) { spray(c, W, H, false); })); wk.rotation.x = -Math.PI / 2; wk.rotation.z = k * 0.38; wk.position.set(k * 7.2, wy + 0.02, 1); g.add(fo(wk)); });
[-1, 1].forEach(function (k) {
var bw = new THREE.Mesh(cvwGeo("emBowW", function () { var gg = new THREE.PlaneGeometry(9, 1.6, 12, 3), pa = gg.attributes.position; for (var v = 0; v < pa.count; v++) {
var x = pa.getX(v), y = pa.getY(v), t = (4.5 - x) / 9;
pa.setZ(v, (y + 0.8) * 0.5 * (1 - t * 0.6));
pa.setY(v, y * (1 - t * 0.75) + 0.8 * (1 - t) * 0.4);
} gg.computeVertexNormals(); return gg; }), foamT("bw", function (c, W, H) { var R = wRand(507); c.clearRect(0, 0, W, H); for (var i = 0; i < 700; i++) {
var x = R() * W, y = H * Math.pow(R(), 0.6), r = 1 + R() * 4;
c.fillStyle = "rgba(255,255,255," + (0.25 + 0.6 * (y / H)).toFixed(2) + ")";
c.beginPath();
c.arc(x, y, r, 0, 7);
c.fill();
} }));
bw.position.set(k * 1.4, wy + 0.1, -12.7);
bw.rotation.y = Math.PI / 2 + k * 0.32;
if (k < 0)
bw.scale.z = -1;
g.add(fo(bw));
});
var bow = new THREE.Mesh(cvwGeo("emBowF", function () { return new THREE.CircleGeometry(4, 24); }), foamT("oval3", null));
bow.rotation.x = -Math.PI / 2;
bow.position.set(0, wy + 0.03, -18.2);
g.add(fo(bow));
[[2.5, -4.2], [-2.4, -2.6], [1.9, -9.4], [-2.0, 1.6], [2.6, 2.4]].forEach(function (p, i) { if (lite && i > 2)
return; for (var r = 0; r < 3; r++) {
var tor = new THREE.Mesh(cvwGeo("coil" + r, function () { var t = new THREE.TorusGeometry(0.42 - r * 0.1, 0.05, 6, 20); t.rotateX(Math.PI / 2); return t; }), cvwMat("rope"));
tor.position.set(p[0], 0.06 + r * 0.07, p[1]);
g.add(tor);
} });
[[-2.9, -7.4], [-2.9, -6.5], [-2.1, -7.0], [2.9, -0.6], [2.9, 0.3]].forEach(function (p, i) { if (lite && i % 2)
return; cvwCyl(g, 0.36, 0.4, 0.95, oak, p[0], 0, p[1], 10); cvwCyl(g, 0.41, 0.41, 0.05, iron, p[0], 0.2, p[1], 10); cvwCyl(g, 0.41, 0.41, 0.05, iron, p[0], 0.75, p[1], 10); });
var dh = new THREE.Group();
dh.position.set(0, 0, -1.6);
g.add(dh);
cvwBox(dh, 2.4, 2.0, 2.4, cvwS("b:oak", 0xE8E2D4, 1.2), 0, 0, 0);
cvwBox(dh, 2.6, 0.12, 2.6, dk, 0, 2.0, 0);
cvwBox(dh, 0.8, 1.7, 0.06, dk, 0.3, 0, 1.21);
cvwBox(dh, 0.06, 0.06, 0.08, cvwMat("brass"), 0.6, 0.9, 1.26);
cvwBox(dh, 0.5, 0.4, 0.05, cvwMat("pane"), -0.6, 1.2, 1.21);
[-1, 1].forEach(function (k) { cvwBox(dh, 0.05, 0.4, 0.5, cvwMat("pane"), k * 1.21, 1.2, 0); });
cvwCyl(dh, 0.1, 0.1, 0.9, cvwLam(0x1A1A1A), -0.7, 2.1, -0.5, 8);
var dw = E.at(0, -1.6);
cvwSolid(dw.x, dw.z, 2.5, 2.5, E.deckY - 1, E.deckY + 2.2, 0);
var bd = new THREE.Group();
bd.position.set(-3.1, 0, -4.4);
g.add(bd);
[-1.6, 1.6].forEach(function (z) { cvwCyl(bd, 0.07, 0.09, 2.6, iron, 0, 0, z, 8); var arm = cvwCyl(bd, 0.06, 0.06, 1.2, iron, -0.45, 2.4, z, 8); arm.rotation.z = Math.PI / 2; cvwBox(bd, 0.02, 0.9, 0.02, cvwMat("rope"), -0.9, 1.6, z); });
var bt = new THREE.Group();
bt.position.set(-0.9, 0.9, 0);
bd.add(bt);
cvwBoat(bt, 0, 0, 0, 0, {});
bt.scale.set(0.8, 0.8, 0.75);
if (!cvwBookHere()) {
[["A seaman hauling on a line", "m", "cvsailor", -2.6, -8.6, "Two-six, heave!"], ["A seaman coiling down", "m", "cvsailor", 2.0, -5.2, "Every line in its place, the mate says."], ["A boy scrubbing the deck", "m", "boy", -1.0, 0.6, "Holystone, holystone, all day long.", 1], ["A seaman at the hatch", "m", "cvsailor", 1.2, -7.0, "Water casks are low."], ["The bosun", "m", "cvsailor", -1.4, -11.0, "Look lively there!"]].forEach(function (p, i) { if (lite && i % 2)
return; var w = E.at(p[3], p[4]); cvwOne("emwork" + i, p[0], p[1], p[2], w.x, w.z, i % 2 ? Math.PI : 0, p[5], { child: !!p[6], y: E.deckY + 0.02 }); });
}
};
})();
function cvwEnvNow() { return __ZC(526, 139, this, arguments, new.target); }
function cvwBlockL(x, z, feet) { return __ZC(526, 140, this, arguments, new.target); }
function cvwPlaceName(L) {
if (cvwInRoom()) {
var R = cvwRoomAt(L.x, L.z);
if (R)
return R.name;
}
var best = null, bd = 1e9;
for (var k in CVW_AT) {
var A = CVW_AT[k];
if (A.sc !== CVW.sc)
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A;
}
}
return best && bd < 70 ? best.name : cvwSc().name;
}
function cvwTick(dt) { return __ZC(526, 141, this, arguments, new.target); }
function cvwBuild(G) { CVW.G = G; CVW.lite = cvwLite(); CVW.built = true; }
if (typeof worldDef === "function")
worldDef(CVW_KEY, {
base: CVW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return cvwEnvNow(); },
build: function (G) { cvwBuild(G); },
enter: function (opt) { return __ZC(526, 142, this, arguments, new.target); },
leave: function () { CVW.ride = null; CVW.moving = false; if (CVW.veil)
CVW.veil.style.opacity = "0"; if (typeof cvbLeave === "function")
try {
cvbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = cvwSc(); CVW.inRm = cvwInRoom(); return cvwGround(x - S.x, z, feet); },
block: function (x, z, feet) { var S = cvwSc(); CVW.inRm = cvwInRoom(); return cvwBlockL(x - S.x, z, feet); },
tick: function (dt) { cvwTick(dt); },
back: function () { var D = CVW_SCN[CVW.sc]; cvwGo(D && D.start ? { sc: CVW.sc, x: D.start.x, z: D.start.z, ry: D.start.ry } : "provIn"); }
});
function cvwEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(CVW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(CVW_KEY) < 0)
WLG.keys.push(CVW_KEY);
function cvwForget() { return __ZC(526, 143, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === CVW_KEY)
cvwForget(); return r; }; })();
function cvwSnowfall(P, n, sp) { return __ZC(526, 144, this, arguments, new.target); }
(function () {
var t0 = cvwTick;
cvwTick = function (dt) {
t0.apply(this, arguments);
if (!CVW.built || !CVW.scG)
return;
var t = CVW.t;
(CVW.fx || []).forEach(function (F) { if (F.userData.kind !== "float")
return; F.position.y = F.userData.y0 + Math.sin(t * 0.15 + F.userData.ph) * 6; F.rotation.y += dt * 0.004; });
(CVW.beasts || []).forEach(function (g) {
if (!g.parent)
return;
if (g.userData.form)
cvwFormTick(g, t - (g.userData.t0 || 0), g === CVW.thing ? 1.4 : 0.6);
var G = g.userData.goal;
if (G) {
var dx = G[0] - g.position.x, dy = G[1] - g.position.y, dz = G[2] - g.position.z, d = Math.hypot(dx, dy, dz);
if (d > 0.05) {
var sp = Math.min(d, dt * (g.userData.sp || 4));
g.position.x += dx / d * sp;
g.position.y += dy / d * sp;
g.position.z += dz / d * sp;
if (Math.hypot(dx, dz) > 1)
g.rotation.y += (Math.atan2(dx, dz) - g.rotation.y) * Math.min(1, dt * 0.3);
}
}
});
var D = CVW.rlDoor;
if (D && D.parent && D.userData.goal != null) {
var a = D.rotation.x, b = D.userData.goal;
if (Math.abs(b - a) > 0.002)
D.rotation.x = a + (b - a) * Math.min(1, dt * 0.35);
}
};
})();
var CVB_CH = [];
var CVB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var CVB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function cvbS() { if (!store.cvbook)
store.cvbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.cvbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function cvbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function cvbStep() { var S = cvbS(), C = CVB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function cvbActive() { var S = cvbS(); return !!(S.started && !S.done && WLD.on === CVW_KEY); }
function cvbKey() { var S = cvbS(); return S.done ? "done" : S.ch + "." + S.s; }
function cvbSay(h) { setStatus(h); }
function cvbQ(s) { return cvQ(s); }
function cvbQs() { return cvQs.apply(null, arguments); }
function cvbPos(at) { return __ZC(526, 145, this, arguments, new.target); }
function cvbScName(k) { return (CVW_SC[k] || {}).name || k; }
function cvbWay(P, L) { return __ZC(526, 146, this, arguments, new.target); }
function cvbBeam() { return __ZC(526, 147, this, arguments, new.target); }
function cvbItemMesh(kind) { return __ZC(526, 148, this, arguments, new.target); }
function cvbItemsClear() { CVB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = CVW.spots.indexOf(I.S); if (j >= 0)
CVW.spots.splice(j, 1); }); CVB.items = []; }
function cvbItemAdd(kind, P, name, verb, onTake) { return __ZC(526, 149, this, arguments, new.target); }
var CVB_TUNES = { home: "assets/westminster/baker-street-air.mp3", study: "assets/verne/toccata.mp3", dread: "assets/poe/funeral.mp3", night: "assets/erebos/gymnopedie.mp3", sea: "assets/verne/hebrides.mp3", swamp: "assets/erebos/funeral-march.mp3", chase: "assets/poe/danse.mp3", dream: "assets/poe/moonlight.mp3", rite: "assets/erebos/seikilos.mp3", end: "assets/erebos/gymnopedie.mp3" };
function cvbTune(k) { return __ZC(526, 150, this, arguments, new.target); }
function cvbText(fn) { return __ZC(526, 151, this, arguments, new.target); }
function cvbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function cvbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var CVB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>H. P. Lovecraft's own words (1928).</div>";
function cvbSec(B, C) { if (!B || !B.ch || !C || C.txt == null)
return null; var t = C.txt, P = B.ch[t[0]]; if (!P)
return null; return { src: P.src, p: P.p.slice(t[1], t[2] + 1) }; }
function cvbReadAll(i) { return __ZC(526, 152, this, arguments, new.target); }
function cvbChapterCard() { return __ZC(526, 153, this, arguments, new.target); }
function cvbKeeperBtns(fns) { return __ZC(526, 154, this, arguments, new.target); }
function cvbJump(i) { var S = cvbS(); S.ch = Math.max(0, Math.min(CVB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; cvbSave(); cvbChapterBegin(true); }
function cvbStV(v) { return typeof v === "function" ? v(cvbS().s) : v; }
function cvbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function cvbWorldState() {
var S = cvbS(), C = CVB_CH[S.ch] || {}, st = C.state || {};
CVW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
CVW.envK = cvbStV(st.env) || null;
if (typeof cvwStateApply === "function")
try {
cvwStateApply(st, S.s);
}
catch (e) { }
worldEnv(cvwEnvNow());
}
function cvbChapterBegin(place) { return __ZC(526, 155, this, arguments, new.target); }
function cvbStepBegin() { return __ZC(526, 156, this, arguments, new.target); }
function cvbPuzzleCard(b) { return __ZC(526, 157, this, arguments, new.target); }
function cvbStepDone() { return __ZC(526, 158, this, arguments, new.target); }
function cvbFinish() { return __ZC(526, 159, this, arguments, new.target); }
function cvbCastName(c) { return c.name || (CVW_FOLK[c.k] || {}).name || c.k; }
function cvbCastLive(C) { return !!(C && C.g && C.g.parent); }
function cvbCastAdd(c) { return __ZC(526, 160, this, arguments, new.target); }
function cvbCastHide(key) { var C = CVB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); CVW.talk = CVW.talk.filter(function (T) { return T.p !== C.P; }); CVW.people = CVW.people.filter(function (p) { return p !== C.P; }); delete CVB.cast[key]; }
function cvbCastClear() { for (var k in CVB.cast)
cvbCastHide(k); CVB.cast = {}; }
function cvbCastMove(key, at, ry) { var C = CVB.cast[key]; if (!C)
return; var P = cvbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : cvwGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function cvbCastTick() { return __ZC(526, 161, this, arguments, new.target); }
function cvbPassTick() { return __ZC(526, 162, this, arguments, new.target); }
var CVB_FOLK_AT = {};
function cvbPopulate() { return __ZC(526, 163, this, arguments, new.target); }
function cvbCastHere(C) { return (C.cast || []).some(function (c) { var P = cvbPos(c.at); return P && P.sc === CVW.sc; }); }
function cvbChapterSc(C) { var P = C && C.start ? cvbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function cvbSceneDrop() { CVB.beam = null; CVB.items = []; CVB.cast = {}; }
function cvbHeard(kind) { CVB.rew[kind] = (CVB.rew[kind] || 0) + 1; }
function cvbNote(kind, title) { cvbHeard(kind); if (title)
cvbHeard("tale:" + title); }
function cvbTalk(T) { return __ZC(526, 164, this, arguments, new.target); }
function cvbSpot(S) { if (!cvbActive() || S.cvb)
return; var b = cvbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = cvbKey(); setTimeout(function () { if (cvbKey() === k)
cvbStepDone(); }, b.wait || 400); }
function cvbIdlePrompt() { worldPrompt("🐙 <b>The Call of Cthulhu</b> · <b>press E</b> for the book", cvbOpen); }
function cvbTick(dt, L) { return __ZC(526, 165, this, arguments, new.target); }
function cvbOpen() { return __ZC(526, 166, this, arguments, new.target); }
function cvbBegin() { var S = cvbS(); S.started = 1; cvbSave(); if (WLD.on !== CVW_KEY) {
cvwEnter({});
return;
} cvbChapterBegin(true); }
function cvbStartAt() { var S = cvbS(); if (S.started && !S.done) {
var C = CVB_CH[S.ch], P = C && C.start ? cvbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function cvbEnter(opt) { var S = cvbS(); setTimeout(function () { if (WLD.on !== CVW_KEY)
return; if (S.started && !S.done)
cvbChapterBegin(false);
else {
cvbWorldState();
cvbPopulate();
if (!S.started)
cvbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function cvbLeave() { cvbTune(null); cvbItemsClear(); CVB.cast = {}; CVB.beam = null; CVW.bannerBook = false; }
function cvzGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function cvzTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function cvzSpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function cvzRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function cvzFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function cvzGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function cvzHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function cvzUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function cvzPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function cvzRead(title, html, btn, o) { return cvzPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function cvzReadA(title, adult, young, btn, o) { var r = cvzRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = cvbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function cvzMove(at, msg) { return function () { cvwGo(at, msg || null, cvbPopulate); }; }
function cvbNum(i) { return String(i + 1); }
function cvbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function cvbCh(C) {
var R = function (v) { return typeof v === "string" ? cvbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
CVB_CH.push(C);
return C;
}
function cvbStepAt(id) { var C = CVB_CH[cvbS().ch]; return C ? cvbS().s >= cvbIdx(C, id) : false; }
function cvzId(id, step) { step.id = id; return step; }
var CVW_LIVEK = ["chase", "doorOpen", "thing", "sway"];
function cvwStateApply(st, s) { return __ZC(526, 167, this, arguments, new.target); }
function cvwRebuild() { var k = CVW.scBuilt; if (!k)
return; var L = cvwLocalSc(), y = camera.position.y; CVW.scBuilt = null; cvwScene(k); var S = cvwSc(); camera.position.set(CVW.base + S.x + L.x, y, L.z); }
function cvwLiveState() { if (CVW.live)
try {
CVW.live(CVW.st);
}
catch (e) { } }
(function () { var s0 = cvwScene; cvwScene = function (k) { var was = CVW.scBuilt; s0.apply(this, arguments); if (was !== CVW.scBuilt && typeof cvbWorldState === "function" && !CVW.rebuilding)
try {
cvbWorldState();
}
catch (e) { } }; })();
function cvc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
function cvBk(i) { return ["1. The Horror in Clay", "2. The Tale of Inspector Legrasse", "3. The Madness from the Sea"][i] || ""; }
function cvP(x, z, y) { return { sc: "providence", x: x, z: z, y: y }; }
function cvL(x, z, y) { return { sc: "bayou", x: x, z: z, y: y }; }
function cvH(x, z, y) { return { sc: "harbour", x: x, z: z, y: y }; }
function cvO(x, z, y) { return { sc: "oslo", x: x, z: z, y: y }; }
function cvS(x, z, y) { return { sc: "sea", x: x, z: z, y: y }; }
function cvR(x, z, y) { return { sc: "rlyeh", x: x, z: z, y: y }; }
function cvzTravel(title, html, at, msg, btn, o) { return cvzRead(title, html, btn || "▶ Go", Object.assign({ done: function () { var A = typeof at === "function" ? at() : at; if (A && typeof at === "function" && A.ry == null)
A.ry = Math.PI; cvwGo(A, msg || null, function () { cvbPopulate(); cvbStepBegin(); }); } }, o || {})); }
function cvzSay(who, h, title, lines, src, o) { return cvzTalk(who, h, [title, cvbQs.apply(null, lines) + cvSrc(src), "▶ Go on"], o); }
function cvwCalm(st, keys) { st = st || {}; for (var i = 0; i < keys.length; i++)
if (st[keys[i]])
return false; return true; }
function cvEnv(map) { return function () { return map[CVW.sc] || null; }; }
function cvwBookHere() { try {
var S = cvbS(), C = CVB_CH[S.ch];
return !!(S.started && !S.done && C && cvbCastHere(C));
}
catch (e) {
return false;
} }
var CVI = function (sc, k, x, z) { return cvwIn(sc, k, x, z); };
var CVPI = function (k, x, z) { return cvwIn("providence", k, x, z); };
Object.assign(CVW_FOLK, {
jostler: { name: "A seaman from the dark courts", dress: "cvsailor", sex: "m", hair: 0x141414, persona: "sailor", greet: "..." },
witness: { name: "A lady on the hill", dress: "lady", sex: "f", hair: 0x6A5A4A, persona: "townfolk", greet: "I saw it all. He went down like a felled tree." },
physician: { name: "A physician", dress: "doctor", sex: "m", hair: 0x8A8A8A, beard: "mustache", persona: "tobey", greet: "Stand back, please. Give him air." },
neighbour: { name: "An artist of the Fleur-de-Lys", dress: "cvartist", sex: "m", hair: 0x8A5A2A, persona: "wilcox", greet: "Wilcox? He woke the whole building, shrieking in the night." },
poet: { name: "A poet of Benefit Street", dress: "gent", sex: "m", hair: 0x2A1A10, persona: "wilcox", greet: "You've come about the dreams. I did write to the old professor. I wish I hadn't dreamed them." },
painter: { name: "A painter at the Art Club", dress: "cvartist", sex: "f", hair: 0x3A2A1A, persona: "wilcox", greet: "Those weeks in March? I painted nothing but stone, and could not stop." },
merchant: { name: "A merchant of Westminster Street", dress: "gent", sex: "m", hair: 0x5A4A3A, beard: "mustache", persona: "townfolk", greet: "Dreams? I sleep like a top. Always have." },
scientist: { name: "A geologist at Brown", dress: "cvprof", sex: "m", hair: 0x6A6A6A, beard: "short", persona: "curator", greet: "I answered the professor's letter. A landscape, I said: strange, and nothing more. Though there was a dread in it." }
});
cvbCh({ t: "The Tin Box", txt: [0, 0, 6], start: "wharf", jump: 1, tune: "study", keep: ["box", "The professor's locked box", "🗝️"],
state: { env: cvEnv({ providence: "winter" }), season: "winter", boxOpen: function () { return cvbStepAt("open"); } },
words: "Providence, Rhode Island, in the winter of 1926-27. The Newport boat is coming in to the wharf below College Hill, and an old man of ninety-two, Professor Angell of Brown University, is aboard her.",
intro: "The waterfront, Providence, winter 1926-27",
cast: [cvc("angell", "wharf", { ry: Math.PI / 2, until: "hill" }), cvc("angell", "hillStreet", { from: "hill", until: "fell", ry: 0 }), cvc("jostler", "courts", { until: "fell", ry: Math.PI / 2 }),
cvc("witness", cvP(-246, 64), { from: "fell", ry: -Math.PI / 2 }), cvc("physician", cvP(-252, 58), { from: "fell", ry: Math.PI / 2 }),
cvc("thurston", CVPI("angell", 0.4, -1.8), { until: "boston" }), cvc("thurston", CVPI("boston", 1.6, -2.4), { from: "boston" })],
steps: [
{ k: "read" },
cvzRead("🌑 A placid island", cvbQs("The most merciful thing in the world, I think, is the inability of the human mind to correlate all its contents. We live on a placid island of ignorance in the midst of black seas of infinity, and it was not meant that we should voyage far.") + cvSrc(cvBk(0)), "▶ Go on"),
cvzRead("🏛️ Professor Angell", cvbQs("My knowledge of the thing began in the winter of 1926-27 with the death of my grand-uncle, George Gammell Angell, Professor Emeritus of Semitic languages in Brown University, Providence, Rhode Island.", "Professor Angell was widely known as an authority on ancient inscriptions, and had frequently been resorted to by the heads of prominent museums;") + cvSrc(cvBk(0)), "▶ Go on"),
cvzGo("wharf", "Down to the wharf, where the Newport boat is warping in", { r: 12 }),
cvzHold("wharf", 8, "Stand on the wharf in the cold while the Newport boat makes fast and her passengers come down the gangway", { r: 14 }),
cvzTalk("Professor Angell", "Professor Angell, off the Newport boat", ["🎩 The professor", "A tall, stooped old man in a black overcoat, with a white beard and a stick. \"Rough, the bay, this time of year,\" he says. \"But I am home. Up the hill, and a fire, and my papers.\" He glances once over his shoulder, toward the dark courts on the hillside.", "▶ Walk with him"]),
cvzPuzzle("🧭 The way home", "He is ninety-two, and the hill is steep. Which way does he go home to Williams Street?", ["Round by the long carriage road", "The short cut, up through the queer dark courts on the hillside", "Back aboard the boat"], 1, ["Not he: it is the long way round.", "", "He is home."], { yes: "🧭 " + cvbQ("one of the queer dark courts on the precipitous hillside which formed a short cut from the waterfront to the deceased's home in Williams Street.") }),
cvzGo("courts", "Follow him up into the courts", { r: 8 }),
cvzId("hill", cvzGo("hillStreet", "On up the steep hill street, a little behind him", { r: 8 })),
cvzId("fell", cvzReadA("🕯️ On the hill", cvbQs("The professor had been stricken whilst returning from the Newport boat;") + "<p>A seaman comes out of one of the dark courts, shoulders past him on the narrow pavement, and is gone downhill. The old man stops, puts a hand to his breast, and falls on the steep street. By the time you reach him he is dead.</p>" + cvSrc(cvBk(0)), "<p>A seaman comes out of one of the dark courts and shoulders past him. The old man stops, puts a hand to his breast, and sinks down on the steep street. By the time you reach him he has died.</p>" + cvSrc(cvBk(0)), "▶ Go on")),
cvzTalk("A lady on the hill", "A lady on the hill, who saw it", ["👁️ A witness", "\"A sailor, by his clothes,\" she says. \"Came out of that court there as though he'd been waiting, pushed past the old gentleman, and went off down toward the water. Never stopped. And the professor just... went down.\"", "▶ Go on"]),
cvzTalk("A physician", "A physician, kneeling by him", ["🩺 No visible disorder", cvbQs("Physicians were unable to find any visible disorder, but concluded after perplexed debate that some obscure lesion of the heart, induced by the brisk ascent of so steep a hill by so elderly a man, was responsible for the end.") + cvSrc(cvBk(0)), "▶ Go on"]),
cvzPuzzle("❓ The cause", "What did the doctors set down as the cause of death?", ["A blow, from the man who pushed him", "Some obscure lesion of the heart, brought on by the steep climb", "Poison"], 1, ["No one saw a blow. Not yet.", "", "No one says that. Not yet."], { yes: "❓ " + cvbQ("At the time I saw no reason to dissent from this dictum, but latterly I am inclined to wonder--and more than wonder.") }),
cvzGo("angellDoor", "Up to the professor's house in Williams Street, where his heir has come", { r: 4 }),
cvzGo(CVPI("angell", 0, 2), "In at the door, and through to the study", { r: 2.5 }),
cvzTalk("Francis Wayland Thurston", "Francis Wayland Thurston, his grand-nephew", ["📚 The heir", cvbQs("As my granduncle's heir and executor, for he died a childless widower, I was expected to go over his papers with some thoroughness;") + cvSrc(cvBk(0)), "▶ Help him"]),
cvzGather("load", CVPI("angell", -2.6, -1.6), 4, "A box of the professor's files", "Carry the professor's files and boxes out to the carrier's van", { spread: 1.4, eachSay: "Another box for the van." }),
cvzId("boston", cvzTravel("🚚 To Boston", cvbQs("and for that purpose moved his entire set of files and boxes to my quarters in Boston.") + cvSrc(cvBk(0)), CVPI("boston", 0, 2), "🚚 <b>Thurston's quarters in Boston.</b>", "▶ To Boston")),
cvzHold(CVPI("boston", 0, 0.4), 8, "Sit with Thurston while he sorts the papers, box by box", { r: 2.5 }),
cvzPuzzle("🔒 One box", "One box is locked, and there is no key with it. Where is the key?", ["Nowhere: break it open with the poker", "On the personal ring the professor carried always in his pocket", "In the desk at Williams Street"], 1, ["Thurston will not break his uncle's box.", "", "It is not there."], { yes: "🗝️ " + cvbQ("It had been locked, and I did not find the key till it occurred to me to examine the personal ring which the professor carried always in his pocket.") }),
cvzFind("chain", CVPI("boston", 2.4, -2.4), "The professor's key ring", "Find the professor's personal ring among the things the hospital sent back"),
cvzId("open", cvzRead("🔓 The box", cvbQs("Then, indeed, I succeeded in opening it, but when I did so seemed only to be confronted by a greater and more closely locked barrier.") + cvSrc(cvBk(0)), "▶ Look inside")),
cvzRead("🗿 The bas-relief", cvbQs("The bas-relief was a rough rectangle less than an inch thick and about five by six inches in area; obviously of modern origin.", "And writing of some kind the bulk of these designs seemed certainly to be;") + cvSrc(cvBk(0)), "▶ Go on"),
cvzPuzzle("👁️ The figure", "Above the writing is a figure. What does it put you in mind of?", ["A winged lion", "An octopus, a dragon and a man, all at once", "A coiled serpent"], 1, ["No: worse than that.", "", "Not quite."], { yes: "👁️ " + cvbQ("A pulpy, tentacled head surmounted a grotesque and scaly body with rudimentary wings; but it was the general outline of the whole which made it most shockingly frightful.") }),
cvzFind("paper", CVPI("boston", -0.2, -1.2), "The manuscript in the professor's hand", "Lift out the manuscript beneath the bas-relief"),
cvzRead("📜 CTHULHU CULT", cvbQs("What seemed to be the main document was headed \"CTHULHU CULT\" in characters painstakingly printed to avoid the erroneous reading of a word so unheard-of.") + cvSrc(cvBk(0)), "▶ Go on"),
cvzPuzzle("📑 Two sections", "The manuscript is in two sections. What are they?", ["A Wilcox's dreams of 1925, and Inspector Legrasse's narrative of 1908", "A diary, and a will", "Two lectures on Semitic grammar"], 0, ["", "There is no will in this box.", "Not these."], { yes: "📑 " + cvbQ("This manuscript was divided into two sections, the first of which was headed \"1925--Dream and Dream Work of H. A. Wilcox, 7 Thomas St., Providence, R. I.,\" and the second, \"Narrative of Inspector John R. Legrasse, 121 Bienville St., New Orleans, La., at 1908 A. A. S. Mtg--Notes on Same, & Prof. Webb's Acct.\"") }),
cvzTalk("Francis Wayland Thurston", "Thurston, the bas-relief in his hand", ["🔎 The sculptor", cvbQs("Had my uncle, in his latter years, become credulous of the most superficial impostures? I resolved to search out the eccentric sculptor responsible for this apparent disturbance of an old man's peace of mind.") + cvSrc(cvBk(0)), "▶ To the next part"])
] });
cvbCh({ t: "The Sculptor's Dream", txt: [0, 7, 10], start: CVPI("fleur", 0, 1.6), jump: 1, tune: "dream", keep: ["dream", "The damp clay tablet", "🏺"],
state: { env: cvEnv({ providence: "winter" }), season: "winter", night: true, nightUntil: "morning" },
words: "The night of February 28th, 1925, in the Fleur-de-Lys Building on Thomas Street. There has been an earthquake tremor, the strongest felt in New England for some years. In his rooms, a young sculptor is working in his sleep.",
intro: "Wilcox's rooms, the Fleur-de-Lys Building",
cast: [cvc("wilcox", CVPI("fleur", 0.4, -0.6), { until: "carry", ry: 0 }), cvc("wilcox", cvP(-246, -148), { from: "carry", until: "call" }), cvc("wilcox", CVPI("angell", -2.0, 1.2), { from: "call", ry: Math.PI / 2 }), cvc("angell", CVPI("angell", 0.4, -1.6))],
steps: [
{ k: "read" },
cvzRead("🌊 The first half", cvbQs("The first half of the principal manuscript told a very peculiar tale.", "His card bore the name of Henry Anthony Wilcox,") + "<p>Now walk inside the tale it tells: the night before he called.</p>" + cvSrc(cvBk(0)), "▶ Go on"),
cvzRead("〰️ The tremor", cvbQs("There had been a slight earthquake tremor the night before, the most considerable felt in New England for some years; and Wilcox's imagination had been keenly affected.") + cvSrc(cvBk(0)), "▶ Go on"),
cvzHold(CVPI("fleur", 0, 1.2), 8, "Stand in the cold room. The windows have stopped rattling; the building is quiet. Wilcox has gone back to bed", { r: 2.5 }),
cvzTalk("Henry Anthony Wilcox", "Wilcox, at the modelling stand in his nightclothes", ["😴 Asleep on his feet", "He is standing at the modelling stand in his nightshirt, barefoot on the cold boards, working the wet clay with his thumbs. His eyes are open, but he is not awake. He is murmuring the same two words over and over.", "▶ Listen"]),
cvzPuzzle("🗣️ What he says", "What is he saying, in his sleep?", ["\"Cthulhu fhtagn\"", "\"Nevermore\"", "\"Babylon, Babylon\""], 0, ["", "Not that.", "Not that, though he will speak of Babylon in the morning."], { yes: "🗣️ " + cvbQ("from some undetermined point below had come a voice that was not a voice; a chaotic sensation which only fancy could transmute into sound, but which he attempted to render by the almost unpronounceable jumble of letters, \"Cthulhu fhtagn\".") }),
cvzRead("🏙️ His dream", cvbQs("Upon retiring, he had had an unprecedented dream of great Cyclopean cities of Titan blocks and sky-flung monoliths, all dripping with green ooze and sinister with latent horror.", "Hieroglyphics had covered the walls and pillars,") + cvSrc(cvBk(0)), "▶ Go on"),
cvzHold(CVPI("fleur", 0.4, 0.6), 10, "Watch the shapes come out of the clay under his hands: rows of writing, and a figure above them", { r: 2 }),
cvzId("morning", cvzRead("🌅 Waking", cvbQs("the bas-relief on which the youth had found himself working, chilled and clad only in his nightclothes, when waking had stolen bewilderingly over him.") + cvSrc(cvBk(0)), "▶ It is morning")),
cvzFind("skin", CVPI("fleur", 1.6, -2.6), "A damp cloth", "Find a cloth to wrap the wet tablet in, so it will travel"),
cvzId("carry", cvzGo("fleurDoor", "Out with him into Thomas Street, the tablet wrapped under his arm", { r: 5 })),
cvzGo("benefit", "Along Benefit Street, under the old houses", { r: 10 }),
cvzGo("prospect", "Up to Prospect Street, on the brow of the hill", { r: 10 }),
cvzGo("angellDoor", "To Professor Angell's door in Williams Street", { r: 4 }),
cvzId("call", cvzGo(CVPI("angell", 0, 2), "In with him to the professor's study", { r: 2.5 })),
cvzTalk("Professor Angell", "Professor Angell, at his desk", ["🔍 The tablet", "The old man unwraps the cloth and looks at the tablet. Then he looks at Wilcox. \"This is wet,\" he says. \"It was made this week.\"", "▶ Go on"]),
cvzPuzzle("😠 Sharpness", "The professor answers him sharply. Why?", ["The tablet is plainly new: still wet, nothing archaeological about it", "Wilcox has come without an appointment", "The professor dislikes artists"], 0, ["", "He would see anyone with an inscription.", "He has no quarrel with art."], { yes: "😠 " + cvbQ("my uncle showed some sharpness in replying, for the conspicuous freshness of the tablet implied kinship with anything but archeology.") }),
cvzSay("Henry Anthony Wilcox", "Wilcox, in his dreamy, stilted way", "🌙 A dream of strange cities", ["He said, \"It is new, indeed, for I made it last night in a dream of strange cities; and dreams are older than brooding Tyre, or the contemplative Sphinx, or garden-girdled Babylon.\""], cvBk(0)),
cvzRead("🗝️ The key to a memory", cvbQs("This verbal jumble was the key to the recollection which excited and disturbed Professor Angell. He questioned the sculptor with scientific minuteness;") + cvSrc(cvBk(0)), "▶ Go on"),
cvzFind("flask", CVPI("angell", -4.2, -1.2), "The professor's reading glass", "Fetch the reading glass from his shelves"),
cvzHold(CVPI("angell", 0.6, 0.2), 10, "Wait while he studies the bas-relief with almost frantic intensity, glass in hand", { r: 2.5 }),
cvzPuzzle("🤫 His questions", "Many of the professor's questions puzzle Wilcox. What does he keep asking?", ["Whether he belongs to some cult or secret society", "Whether he could carve marble as well", "What he paid for the clay"], 0, ["", "Not that.", "Not that."], { yes: "🤫 " + cvbQ("Wilcox could not understand the repeated promises of silence which he was offered in exchange for an admission of membership in some widespread mystical or paganly religious body.") }),
cvzRead("📅 Daily calls", cvbQs("This bore regular fruit, for after the first interview the manuscript records daily calls of the young man, during which he related startling fragments of nocturnal imagery whose burden was always some terrible Cyclopean vista of dark and dripping stone,") + cvSrc(cvBk(0)), "▶ Go on"),
cvzGather("note", CVPI("angell", 0.4, -0.6), 5, "A day's dream, written down", "Take down each day's dream for the professor's file: five calls, five pages", { spread: 1.6, eachSay: "Another day's dream." }),
cvzPuzzle("🔤 Two sounds", "Read back through the pages. Which two sounds come again and again?", ["\"Cthulhu\" and \"R'lyeh\"", "\"Tyre\" and \"Babylon\"", "\"Sphinx\" and \"Nile\""], 0, ["", "Those are his own words, awake.", "Not those."], { yes: "🔤 " + cvbQ("The two sounds most frequently repeated are those rendered by the letters \"Cthulhu\" and \"R'lyeh\".") }),
cvzTalk("Professor Angell", "Professor Angell, the pages in his hand", ["🕰️ Once before", "He is very still. \"I have heard that word before,\" he says, \"seventeen years ago, in St. Louis. Come tomorrow, Mr. Wilcox. And the day after. Tell me every dream.\"", "▶ To the next part"])
] });
cvbCh({ t: "The Fever", txt: [0, 11, 12], start: "fleurDoor", jump: 1, tune: "dread", keep: ["fever", "The thing \"miles high\"", "🌡️"],
state: { env: cvEnv({ providence: "winter", rlyeh: "dream" }), season: function () { return cvbStepAt("april") ? "spring" : "winter"; }, dream: function () { return cvbStepAt("dream") && !cvbStepAt("wake"); },
thing: function () { return cvbStepAt("miles") && !cvbStepAt("wake") ? 2 : 0; } },
words: "March 23rd, 1925. Wilcox has not come to the professor's study today. In the Fleur-de-Lys Building, the other artists are talking in low voices on the stair.",
intro: "Thomas Street, March 23rd, 1925",
cast: [cvc("neighbour", cvP(-244, -148), { ry: Math.PI }), cvc("wilcoxmother", cvP(134, -200), { ry: Math.PI, until: "bed" }), cvc("wilcoxmother", CVPI("wilbed", 2.4, 0.8), { from: "bed", ry: -Math.PI / 2 }),
cvc("wilcox", CVPI("wilbed", -0.6, -1.2), { ry: Math.PI / 2 }), cvc("tobey", CVPI("tobey", 0, -2.2), { until: "bed" }), cvc("tobey", CVPI("wilbed", 0.6, 0.4), { from: "bed", until: "dream" }), cvc("tobey", CVPI("wilbed", 0.6, 0.4), { from: "wake" }), cvc("angell", CVPI("tobey", 0.4, 0.2), { until: "bed", ry: Math.PI }), cvc("angell", CVPI("wilbed", 1.6, -1.6), { from: "april", ry: -Math.PI / 2 })],
steps: [
{ k: "read" },
cvzRead("🚪 He failed to appear", cvbQs("On March 23rd, the manuscript continued, Wilcox failed to appear; and inquiries at his quarters revealed that he had been stricken with an obscure sort of fever and taken to the home of his family in Waterman Street.") + cvSrc(cvBk(0)), "▶ Go on"),
cvzTalk("An artist of the Fleur-de-Lys", "An artist of the Fleur-de-Lys, on the step", ["😱 In the night", cvbQs("He had cried out in the night, arousing several other artists in the building, and had manifested since then only alternations of unconsciousness and delirium.") + cvSrc(cvBk(0)), "▶ Go on"]),
cvzPuzzle("📞 What the professor does", "The professor hears of it within the hour. What does he do?", ["Waits for Wilcox to write", "Telephones the family at once, and keeps close watch on the case", "Goes to the police"], 1, ["He will not wait.", "", "There is nothing for the police."], { yes: "📞 " + cvbQ("My uncle at once telephoned the family, and from that time forward kept close watch of the case; calling often at the Thayer Street office of Dr. Tobey, whom he learned to be in charge.") }),
cvzGo("thayer", "Across the hill to Thayer Street", { r: 10 }),
cvzGo("tobeyDoor", "To Dr. Tobey's door", { r: 4 }),
cvzGo(CVPI("tobey", 0, 2), "Into his office", { r: 2.5 }),
cvzTalk("Dr. Tobey", "Dr. Tobey, at his desk", ["🩺 An odd case", "\"Not greatly above normal, his temperature,\" says the doctor. \"Yet every other sign is of a true fever, not a madness. And the things he says...\" He shudders, and does not finish.", "▶ Go on"]),
cvzId("miles", cvzTalk("Dr. Tobey", "Dr. Tobey", ["🏔️ Miles high", cvbQs("They included not only a repetition of what he had formerly dreamed, but touched wildly on a gigantic thing \"miles high\" which walked or lumbered about.") + cvSrc(cvBk(0)), "▶ Go on"])),
cvzPuzzle("🗿 The thing", "The professor listens to the doctor's account of the raving. What is he sure of?", ["That the thing must be the same monstrosity as on the bas-relief", "That Wilcox is shamming", "That it is a symptom of the influenza"], 0, ["", "Not he.", "He knows better."], { yes: "🗿 " + cvbQ("occasional frantic words, as repeated by Dr. Tobey, convinced the professor that it must be identical with the nameless monstrosity he had sought to depict in his dream-sculpture.") }),
cvzGo("waterman", "To Waterman Street, to the Wilcox house", { r: 10 }),
cvzTalk("Mrs. Wilcox", "Mrs. Wilcox, at her door", ["🏠 His mother", "\"He doesn't know us,\" she says. \"He talks of stone, and water, and something that walks. Come up, if the doctor says you may.\"", "▶ Go up"]),
cvzId("bed", cvzGo(CVPI("wilbed", 0, 2), "Up to his bedroom", { r: 2.5 })),
cvzHold(CVPI("wilbed", 0.4, 0.4), 10, "Sit by the bed while he mutters and turns. His face is wet; his hands move as if shaping clay", { r: 2.5 }),
cvzRead("💤 Lethargy", cvbQs("Reference to this object, the doctor added, was invariably a prelude to the young man's subsidence into lethargy.") + "<p>He goes quiet. His eyes close. And because this is the Void's dream, you can follow him where he has gone.</p>" + cvSrc(cvBk(0)), "▶ Follow him"),
cvzId("dream", cvzTravel("🌀 Into his dream", "<p>Cold; wet stone under your feet; a sky that is the Void's own dark, with its far islands drifting. A city of titan blocks, dripping with green ooze, and from somewhere below a voice that is not a voice.</p>" + cvbQs("some terrible Cyclopean vista of dark and dripping stone, with a subterrene voice or intelligence shouting monotonously in enigmatical sense-impacts uninscribable save as gibberish.") + cvSrc(cvBk(0)), "rlTerrace", "🌀 <b>The dream-city.</b>", "▶ Dream")),
cvzGo("rlReliefs", "Climb the wet stone among the carvings: the writing is the writing on the bas-relief", { r: 10 }),
cvzHold("rlHigh", 10, "Stand high on the citadel and listen to the voice below: Cthulhu, R'lyeh, Cthulhu", { r: 12 }),
cvzRead("🏔️ Something walks", "<p>Far off, across the city, something moves that is as tall as the monolith. It does not hurry. You cannot look at it for long, and you do not want to.</p>" + cvbQs("a gigantic thing \"miles high\" which walked or lumbered about.") + cvSrc(cvBk(0)), "▶ Wake"),
cvzId("wake", cvzTravel("🛏️ Waking", "<p>You are back in the bedroom in Waterman Street; it is days later. The doctor is there.</p>", CVPI("wilbed", 0.6, 1.4), "🛏️ <b>Waterman Street.</b>", "▶ Wake")),
cvzHold(CVPI("wilbed", 0.6, 1.0), 8, "Wait out the days with the family: March 24th, March 30th, April 1st", { r: 2.5 }),
cvzId("april", cvzRead("☀️ April 2nd", cvbQs("On April 2nd at about 3 p. m. every trace of Wilcox's malady suddenly ceased. He sat upright in bed, astonished to find himself at home and completely ignorant of what had happened in dream or reality since the night of March 22nd.") + cvSrc(cvBk(0)), "▶ Go on")),
cvzTalk("Henry Anthony Wilcox", "Wilcox, sitting up", ["😶 Nothing", "\"Home? Why am I at home?\" He looks at you, at the doctor, at his mother. \"I don't remember anything. I've been asleep, I suppose. It's spring outside.\"", "▶ Go on"]),
cvzPuzzle("📅 The dates", "Count back. When did the delirium begin, and when did it end?", ["March 1st to March 22nd", "The night of March 22nd to April 2nd", "April 2nd to April 12th"], 1, ["That was the dreaming, before the fever.", "", "No."], { yes: "📅 " + cvbQ("Pronounced well by his physician, he returned to his quarters in three days; but to Professor Angell he was of no further assistance.") }),
cvzTalk("Professor Angell", "Professor Angell, at the window", ["🌸 Gone", "\"Gone,\" says the old man, \"every trace of it. He dreams like anyone now.\" He folds the last of the dream-pages into his case.", "▶ To the next part"])
] });
cvbCh({ t: "The Dreamers' Letters", txt: [0, 13, 15], start: CVPI("boston", 0, 2), jump: 1, tune: "study", keep: ["letters", "The dreamers' letters", "✉️"],
state: { env: cvEnv({ providence: "winter" }), season: "winter", boxOpen: true },
words: "Boston, the winter of 1927. Thurston has the professor's notes spread on his desk: a digest of hundreds of answers to one question, from people all over the country: what did you dream, and when?",
intro: "Thurston's quarters in Boston, 1927",
cast: [cvc("thurston", CVPI("boston", 0.2, -2.2), { until: "club" }), cvc("thurston", "club", { from: "club", until: "brown" }), cvc("thurston", "green", { from: "brown" }),
cvc("painter", CVPI("club", -2.4, -1.4), { ry: Math.PI / 4 }), cvc("poet", cvP(-178, 10), { ry: -Math.PI / 2 }), cvc("merchant", cvP(-170, 30), { ry: Math.PI / 2 }), cvc("scientist", "uhall", { ry: Math.PI })],
steps: [
{ k: "read" },
cvzRead("✉️ A far-flung inquiry", cvbQs("My uncle, it seems, had quickly instituted a prodigiously far-flung body of inquiries amongst nearly all the friends whom he could question without impertinence, asking for nightly reports of their dreams, and the dates of any notable visions for some time past.") + cvSrc(cvBk(0)), "▶ Go on"),
cvzGather("letter", CVPI("boston", 0, -1.0), 6, "A page of the professor's digest", "Gather the pages of the professor's digest from the desk", { spread: 1.6, eachSay: "Another page." }),
cvzPuzzle("🧾 Who dreamed?", "The digest sorts the answers into three kinds of people. Which kind dreamed most?", ["Average people in society and business", "Scientific men", "Artists and poets"], 2, ["They gave an almost completely negative result.", "Little more affected: four vague cases.", ""], { yes: "🎨 " + cvbQ("It was from the artists and poets that the pertinent answers came, and I know that panic would have broken loose had they been able to compare notes.") }),
cvzTalk("Francis Wayland Thurston", "Thurston, frowning over the pages", ["🤨 Leading questions?", cvbQs("As it was, lacking their original letters, I half suspected the compiler of having asked leading questions, or of having edited the correspondence in corroboration of what he had latently resolved to see.") + cvSrc(cvBk(0)), "▶ Go on"]),
cvzRead("🔢 By number, not by name", cvbQs("Had my uncle referred to these cases by name instead of merely by number, I should have attempted some corroboration and personal investigation; but as it was, I succeeded in tracing down only a few. All of these, however, bore out the notes in full.") + "<p>Go with him to Providence, and find the few he traced.</p>" + cvSrc(cvBk(0)), "▶ To Providence"),
cvzId("club", cvzTravel("🚂 To Providence", "<p>The train down from Boston, and a walk up from the station to the Providence Art Club on Thomas Street.</p>", "club", "🚂 <b>Thomas Street, Providence.</b>", "▶ Go")),
cvzGo(CVPI("club", 0, 2), "Into the Art Club", { r: 2.5 }),
cvzTalk("A painter at the Art Club", "A painter at the Art Club", ["🖼️ Stone", "\"Yes, I wrote to him. From the end of February I dreamed of a city: green stone, too big, wet, and the angles wrong. Then, from the twenty-third of March, something in it that moved. I woke screaming more than once. On the second of April it stopped, as if a door had shut.\"", "▶ Go on"]),
cvzPuzzle("📅 When?", "Over what days did the artists' dreams run, and when were they strongest?", ["February 28th to April 2nd: strongest during the sculptor's delirium", "All through the summer", "Only on the night of the tremor"], 0, ["", "No: it ended in spring.", "No: it went on for weeks."], { yes: "📅 " + cvbQ("From February 28th to April 2nd a large proportion of them had dreamed very bizarre things, the intensity of the dreams being immeasurably the stronger during the period of the sculptor's delirium.") }),
cvzGo("benefit", "Down to Benefit Street, to call on a poet and a merchant", { r: 10 }),
cvzTalk("A poet of Benefit Street", "A poet of Benefit Street", ["🖋️ Half-sounds", "\"I heard it before I saw anything: a calling, from under. I tried to set it down in verse. It would not go into words.\"", "▶ Go on"]),
cvzTalk("A merchant of Westminster Street", "A merchant, on his way down the hill", ["💼 The salt of the earth", cvbQs("Average people in society and business--New England's traditional \"salt of the earth\"--gave an almost completely negative result, though scattered cases of uneasy but formless nocturnal impressions appear here and there, always between March 23rd and April 2nd--the period of young Wilcox's delirium.") + cvSrc(cvBk(0)), "▶ Go on"]),
cvzId("brown", cvzGo("green", "Up to the college green at Brown", { r: 10 })),
cvzTalk("A geologist at Brown", "A geologist, by University Hall", ["🔬 Scientific men", cvbQs("Scientific men were little more affected, though four cases of vague description suggest fugitive glimpses of strange landscapes, and in one case there is mentioned a dread of something abnormal.") + cvSrc(cvBk(0)), "▶ Go on"]),
cvzReadA("🏛️ The architect", cvbQs("The subject, a widely known architect with leanings toward theosophy and occultism, went violently insane on the date of young Wilcox's seizure, and expired several months later after incessant screamings to be saved from some escaped denizen of hell.") + cvSrc(cvBk(0)), "<p>One of the dreamers, an architect, fell very ill in his mind on the same day as Wilcox's fever, and never recovered.</p>" + cvSrc(cvBk(0)), "▶ Go on"),
cvzTalk("Francis Wayland Thurston", "Thurston, on the green", ["📰 The cuttings", "\"And there are the press cuttings,\" he says. \"Hundreds of them. He must have employed a cutting bureau. Help me sort them, back in Boston: what happened where.\"", "▶ Back to Boston"]),
cvzTravel("🚂 Back to Boston", cvbQs("The press cuttings, as I have intimated, touched on cases of panic, mania, and eccentricity during the given period. Professor Angell must have employed a cutting bureau, for the number of extracts was tremendous, and the sources scattered throughout the globe.") + cvSrc(cvBk(0)), CVPI("boston", 0, 2), "🚂 <b>Boston.</b>", "▶ Go"),
cvzGather("paper", CVPI("boston", -2.6, 1.2), 6, "A press cutting", "Gather the cuttings from the boxes: London, South America, California, India, Haiti, New York", { spread: 1.8, eachSay: "Another cutting." }),
cvzPuzzle("🌍 Where?", "Match the cutting. Where did the hysterical crowd mob the police on the night of March 22-23?", ["London", "New York", "Paris"], 1, ["In London a lone sleeper leaped from a window.", "", "In Paris, a painter hung a Dream Landscape in the spring salon of 1926."], { yes: "🌍 New York: the police mobbed by a hysterical crowd on the night of March 22-23." }),
cvzPuzzle("🖼️ The painter", "And the painter who hung a blasphemous Dream Landscape in the Paris spring salon of 1926?", ["Ardois-Bonnot", "Angarola", "Sime"], 0, ["", "Angarola is named elsewhere in the papers, but not for this.", "Not Sime."], { yes: "🖼️ " + cvbQ("a fantastic painter named Ardois-Bonnot hangs a blasphemous Dream Landscape in the Paris spring salon of 1926.") }),
cvzTalk("Francis Wayland Thurston", "Thurston, setting the cuttings aside", ["🧊 Rationalism", cvbQs("A weird bunch of cuttings, all told; and I can at this date scarcely envisage the callous rationalism with which I set them aside. But I was then convinced that young Wilcox had known of the older matters mentioned by the professor.") + cvSrc(cvBk(0)), "▶ To the next part: the older matters"])
] });
var CVBI = function (k, x, z) { return cvwIn("bayou", k, x, z); };
Object.assign(CVW_FOLK, {
member1: { name: "A member from Harvard", dress: "cvprof", sex: "m", hair: 0x9A9A9A, beard: "full", persona: "curator", greet: "Nothing like it in the Peabody. Nothing like it anywhere." },
member2: { name: "A member from the Smithsonian", dress: "gent", sex: "m", hair: 0x5A4A3A, beard: "mustache", persona: "curator", greet: "Pass it here, would you? I should like a second look at that stone." },
sergeant: { name: "A sergeant of police", dress: "cvpolice", sex: "m", hair: 0x3A2A1A, beard: "mustache", persona: "galvez", greet: "Twenty men, two carriages and the automobile, Inspector. Ready when you are." },
squatterwife: { name: "A squatter woman", dress: "cvsquatterf", sex: "f", hair: 0x2A1A10, persona: "squatter", greet: "You won't get us one step further. Not one." },
fainter: { name: "A young patrolman", dress: "cvpolice", sex: "m", hair: 0x8A6A3A, persona: "galvez", greet: "I'm all right. I'm all right." },
prisoner: { name: "A prisoner", dress: "cvcult", sex: "m", hair: 0x1A1410, beard: "short", persona: "castro", greet: "...In his house at R'lyeh. That is all I will say." },
survivor: { name: "A survivor of the raid", dress: "cvcult", sex: "m", hair: 0xB8B0A0, beard: "short", persona: "castro", greet: "That was nineteen years ago. I was young. I remember the fire." }
});
cvbCh({ t: "St. Louis, 1908", txt: [1, 0, 12], start: CVBI("stlouis", 0, 4.6), jump: 1, tune: "study", keep: ["idol", "The image from the swamp", "🗿"],
state: { env: cvEnv({ bayou: "swampday" }) },
words: "St. Louis, 1908: the annual meeting of the American Archaeological Society. Professor Angell is here, seventeen years younger. And a commonplace-looking man has come all the way up the river from New Orleans with something wrapped in a cloth.",
intro: "The American Archaeological Society, St. Louis, 1908",
cast: [cvc("legrasse", CVBI("stlouis", 0, -3.0), { ry: 0 }), cvc("angell", CVBI("stlouis", -2.4, -2.2), { ry: Math.PI / 4 }), cvc("webb", CVBI("stlouis", 2.6, -2.0), { ry: -Math.PI / 4 }), cvc("member1", CVBI("stlouis", -4.2, -1.2), { ry: Math.PI / 2 }), cvc("member2", CVBI("stlouis", 4.4, -1.0), { ry: -Math.PI / 2 })],
steps: [
{ k: "read" },
cvzRead("🕰️ Once before", cvbQs("Once before, it appears, Professor Angell had seen the hellish outlines of the nameless monstrosity, puzzled over the unknown hieroglyphics, and heard the ominous syllables which can be rendered only as \"Cthulhu\";") + cvSrc(cvBk(1)), "▶ Go on"),
cvzRead("🏛️ The meeting", cvbQs("This earlier experience had come in 1908, seventeen years before, when the American Archeological Society held its annual meeting in St. Louis.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzGo(CVBI("stlouis", 0, 0.6), "Up the hall between the rows of chairs, toward the table", { r: 2.5 }),
cvzTalk("Inspector Legrasse", "Inspector Legrasse, at the table", ["👮 An inspector of police", cvbQs("His name was John Raymond Legrasse, and he was by profession an inspector of police. With him he bore the subject of his visit, a grotesque, repulsive, and apparently very ancient stone statuette whose origin he was at a loss to determine.") + cvSrc(cvBk(1)), "▶ Go on"]),
cvzPuzzle("❓ Why he has come", "Legrasse has no interest in archaeology. Why has he come all this way?", ["To sell the statuette", "For professional reasons: to place the image, and through it track the cult", "For the dinner"], 1, ["He would never sell it.", "", "No."], { yes: "❓ " + cvbQ("hence the anxiety of the police for any antiquarian lore which might help them to place the frightful symbol, and through it track down the cult to its fountain-head.") }),
cvzTalk("Professor Angell", "Professor Angell, seventeen years younger", ["🎓 The professor", "\"Unwrap it, Inspector,\" says Angell. \"Here, on the cloth. Let us all see.\"", "▶ Go on"]),
cvzRead("😨 The sensation", cvbQs("One sight of the thing had been enough to throw the assembled men of science into a state of tense excitement, and they lost no time in crowding around him to gaze at the diminutive figure whose utter strangeness and air of genuinely abysmal antiquity hinted so potently at unopened and archaic vistas.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzFind("idol", CVBI("stlouis", 0.4, -3.6), "The statuette", "Take the image from the table, to pass it from man to man"),
cvzTalk("A member from Harvard", "A member from Harvard", ["🔎 Passed slowly", "He turns it in his hands a long time, and passes it on without a word.", "▶ Pass it on"]),
cvzTalk("A member from the Smithsonian", "A member from the Smithsonian", ["🔎 Passed slowly", "\"No school of sculpture I know,\" he says. \"None.\" He passes it back to you.", "▶ Go on"]),
cvzPuzzle("🗿 The figure", "How high is it, and what does it squat upon?", ["A foot high, on a round drum", "Between seven and eight inches, on a rectangular block covered with undecipherable characters", "Two feet high, on a throne"], 1, ["That is another image, yet to be found.", "", "No."], { yes: "🗿 " + cvbQ("The figure, which was finally passed slowly from man to man for close and careful study, was between seven and eight inches in height, and of exquisitely artistic workmanship.") }),
cvzRead("👁️ Close study", cvbQs("It represented a monster of vaguely anthropoid outline, but with an octopuslike head whose face was a mass of feelers, a scaly, rubbery-looking body, prodigious claws on hind and fore feet, and long, narrow wings behind.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzPuzzle("🪨 The stone", "What is it made of?", ["Common granite", "A soapy, greenish-black stone with golden or iridescent flecks, like nothing in geology", "Jade"], 1, ["Nothing so common.", "", "No."], { yes: "🪨 " + cvbQ("Totally separate and apart, its very material was a mystery; for the soapy, greenish-black stone with its golden or iridescent flecks and striations resembled nothing familiar to geology or mineralogy.") }),
cvzTalk("Professor Webb", "Professor Webb of Princeton", ["🧊 Greenland", cvbQs("Professor Webb had been engaged, forty-eight years before, in a tour of Greenland and Iceland in search of some Runic inscriptions which he failed to unearth;") + "<p>\"High on the west coast,\" he says, \"a tribe kept a crude bas-relief of stone, and danced around it when the aurora leaped. A picture, and writing. Like this. Very like this.\"</p>" + cvSrc(cvBk(1)), "▶ Go on"]),
cvzPuzzle("❄️ What they worshipped", "What did Webb's Greenland cult address its rituals to?", ["The sun", "A supreme elder devil, or tornasuk", "The sea"], 1, ["No.", "", "No."], { yes: "❄️ " + cvbQ("Besides nameless rites and human sacrifices there were certain queer hereditary rituals addressed to a supreme elder devil or tornasuk;") }),
cvzRead("📝 The comparison", cvbQs("There then followed an exhaustive comparison of details, and a moment of really awed silence when both detective and scientist agreed on the virtual identity of the phrase common to two hellish rituals so many worlds of distance apart.") + cvSrc(cvBk(1)), "▶ Compare"),
cvzPuzzle("🗣️ The chant", "Legrasse reads from his notebook; Webb from his memory. Which is the phrase they both have?", ["Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.", "Cthulhu fhtagn ph'nglui R'lyeh mglw'nafh wgah'nagl.", "R'lyeh wgah'nagl Cthulhu ph'nglui fhtagn mglw'nafh."], 0, ["", "The words are right but the order is wrong.", "The order is wrong."], { yes: "🗣️ " + cvbQ("\"Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.\"") }),
cvzPuzzle("📖 What it means", "Legrasse's prisoners told him what the words meant. Which?", ["\"Glory to the stars that return.\"", "\"In his house at R'lyeh dead Cthulhu waits dreaming.\"", "\"Come up from the sea.\""], 1, ["No.", "", "No."], { yes: "📖 " + cvbQ("\"In his house at R'lyeh dead Cthulhu waits dreaming.\"") }),
cvzHold(CVBI("stlouis", 0, -1.4), 8, "Stand in the silence of the hall with them", { r: 3 }),
cvzTalk("Inspector Legrasse", "Inspector Legrasse", ["🌿 The swamp", cvbQs("And now, in response to a general urgent demand, Inspector Legrasse related as fully as possible his experience with the swamp worshipers;") + "<p>\"It was the first of November,\" he begins. \"Last year.\"</p>" + cvSrc(cvBk(1)), "▶ To the next part"])
] });
cvbCh({ t: "Into the Swamp", txt: [1, 13, 16], start: CVBI("hq", 0, 3.6), jump: 1, tune: "swamp", keep: ["summons", "The squatter's summons", "🥁"],
state: { env: function () { return CVW.sc === "bayou" ? (cvbStepAt("dark") ? "swampnight" : "swampdusk") : null; }, lanterns: function () { return cvbStepAt("road"); } },
words: "New Orleans, November 1st, 1907: police headquarters, late in the day. A man has come in from the swamp and lagoon country to the south, wet to the waist, shaking.",
intro: "Police headquarters, New Orleans, November 1st, 1907",
cast: [cvc("legrasse", CVBI("hq", 0, -1.6), { until: "road", ry: 0 }), cvc("guide", CVBI("hq", -1.4, 0.2), { until: "road", ry: Math.PI / 2 }), cvc("sergeant", CVBI("hq", 2.4, 0.8), { until: "road", ry: -Math.PI / 2 }),
cvc("legrasse", "carriages", { from: "road", until: "walk" }), cvc("guide", "roadEnd", { from: "road", until: "walk" }), cvc("sergeant", cvL(20, 444), { from: "road", until: "walk" }),
cvc("legrasse", "huts", { from: "walk" }), cvc("guide", cvL(76, 244), { from: "walk" }), cvc("squatterwife", cvL(64, 258), { from: "walk" }), cvc("galvez", cvL(58, 240), { from: "walk" }), cvc("sergeant", cvL(80, 258), { from: "walk" })],
steps: [
{ k: "read" },
cvzTalk("The squatter who brought word", "The squatter who brought word", ["🥁 The summons", cvbQs("The squatters there, mostly primitive but good-natured descendants of Lafitte's men, were in the grip of stark terror from an unknown thing which had stolen upon them in the night.") + cvSrc(cvBk(1)), "▶ Go on"]),
cvzReadA("😱 Taken", cvbQs("It was voodoo, apparently, but voodoo of a more terrible sort than they had ever known; and some of their women and children had disappeared since the malevolent tom-tom had begun its incessant beating far within the black haunted woods where no dweller ventured.") + cvSrc(cvBk(1)), "<p>Some of the squatters have gone missing since a drum began beating, night after night, far in the haunted woods. The people are terrified.</p>" + cvSrc(cvBk(1)), "▶ Go on"),
cvzTalk("Inspector Legrasse", "Inspector Legrasse", ["👮 Twenty men", "\"Twenty men,\" says Legrasse. \"Two carriages and the automobile. We go this afternoon, and he comes with us to show the way.\"", "▶ Go on"]),
cvzPuzzle("🚓 How many?", "How does the party go out?", ["Twenty police in two carriages and an automobile", "Two policemen on horseback", "A hundred men by boat"], 0, ["", "Not against this.", "No."], { yes: "🚓 " + cvbQ("So a body of twenty police, filling two carriages and an automobile, had set out in the late afternoon with the shivering squatter as a guide.") }),
cvzFind("lantern", CVBI("hq", -3.4, -2.6), "A police lantern", "Take a lantern from the rack"),
cvzId("road", cvzTravel("🐴 South", cvbQs("At the end of the passable road they alighted,") + "<p>Hours south, out of the city, along shell roads and then mud ones, to where the road gives out.</p>" + cvSrc(cvBk(1)), "roadEnd", "🐴 <b>The end of the passable road.</b>", "▶ Go")),
cvzTalk("A sergeant of police", "A sergeant, at the carriages", ["🔦 Lanterns", "\"Lanterns lit, men. Revolvers ready. And keep together.\"", "▶ Go on"]),
cvzId("walk", cvzGo("cypress", "On foot into the cypress woods, in silence", { r: 10 })),
cvzRead("🌳 Where day never came", cvbQs("for miles splashed on in silence through the terrible cypress woods where day never came. Ugly roots and malignant hanging nooses of Spanish moss beset them,") + cvSrc(cvBk(1)), "▶ Go on"),
cvzGo("stones", "On, past a pile of dank stones and a fragment of rotting wall", { r: 8 }),
cvzPuzzle("🧱 The stones", "What do the dank stones and the rotting wall make you feel?", ["Hope: someone lived here once", "A hint of morbid habitation, deepening the gloom", "Nothing at all"], 1, ["Not hope.", "", "You feel it."], { yes: "🧱 " + cvbQ("now and then a pile of dank stones or fragments of a rotting wall intensified by its hint of morbid habitation a depression which every malformed tree and every fungous islet combined to create.") }),
cvzId("dark", cvzGo("huts", "On to the squatter settlement, as the light goes", { r: 12 })),
cvzRead("🏚️ The settlement", cvbQs("At length the squatter settlement, a miserable huddle of huts, hove in sight; and hysterical dwellers ran out to cluster around the group of bobbing lanterns.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzHold("huts", 10, "Stand among the huts and listen: far, far ahead, the muffled beat of tom-toms", { r: 14 }),
cvzPuzzle("🔴 Ahead", "What else is there, ahead in the night?", ["A reddish glare, filtering through the pale undergrowth", "The lights of a town", "Nothing but dark"], 0, ["", "There is no town.", "Look again."], { yes: "🔴 " + cvbQ("A reddish glare, too, seemed to filter through the pale undergrowth beyond endless avenues of forest night.") }),
cvzTalk("A squatter woman", "A squatter woman, clutching her shawl", ["🌫️ The hidden lake", cvbQs("There were legends of a hidden lake unglimpsed by mortal sight, in which dwelt a huge, formless white polypous thing with luminous eyes; and squatters whispered that bat-winged devils flew up out of caverns in inner earth to worship it at midnight.") + cvSrc(cvBk(1)), "▶ Go on"]),
cvzTalk("The squatter who brought word", "The guide, at the edge of the huts", ["🚫 Not one inch", "He will not go a step further. None of them will. He points into the dark, toward the red glare, and sits down by the fire with his back to it.", "▶ Go on"]),
cvzPuzzle("🚶 Who goes on?", "The squatters refuse point-blank to go on. Who goes?", ["No one: they turn back", "Legrasse and his nineteen colleagues, unguided", "Only Legrasse"], 1, ["Not Legrasse.", "", "He does not go alone."], { yes: "🚶 " + cvbQ("so Inspector Legrasse and his nineteen colleagues plunged on unguided into black arcades of horror that none of them had ever trod before.") }),
cvzTalk("Joseph D. Galvez", "Joseph D. Galvez, a patrolman", ["👂 Listen", "\"You hear that?\" Galvez whispers. \"The drums, and something else. A voice answering, deeper in.\"", "▶ Go on"]),
cvzRead("☠️ To see it was to die", cvbQs("They said it had been there before D'Iberville, before La Salle, before the Indians, and before even the wholesome beasts and birds of the woods. It was nightmare itself, and to see it was to die. But it made men dream, and so they knew enough to keep away.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzGo("arcades", "On into the black arcades of the forest, lanterns low", { r: 12 }),
cvzHold("arcades", 8, "Stand in the dark under the trees while the men close up behind you", { r: 14, h2: "▶ To the next part" })
] });
cvbCh({ t: "The Ring of Fire", txt: [1, 17, 22], start: "arcades", jump: 1, tune: "rite", keep: ["rite", "The glade in the swamp", "🔥"],
state: { env: function () { return cvbStepAt("thinner") ? "swampfire" : "swampnight"; }, lanterns: true, rite: function () { return !cvbStepAt("after"); }, raid: function () { return cvbStepAt("raid"); }, taken: function () { return cvbStepAt("taken"); }, ashes: function () { return cvbStepAt("after"); } },
words: "Deep in the swamp, near midnight, November 1st, 1907. Ahead, through the trees, a red glare and the beat of drums. Legrasse and his nineteen men push on through the black morass.",
intro: "The black morass",
cast: [cvc("legrasse", cvL(-36, 30), { until: "thinner" }), cvc("legrasse", cvL(-14, -160), { from: "thinner", until: "raid" }), cvc("legrasse", cvL(-4, -224), { from: "raid" }),
cvc("galvez", cvL(-46, 24), { until: "thinner" }), cvc("galvez", cvL(-28, -156), { from: "thinner" }), cvc("fainter", cvL(-24, -146), { from: "thinner", until: "raid" }), cvc("sergeant", cvL(-30, 34), { until: "thinner" }), cvc("sergeant", cvL(10, -214), { from: "raid" }),
cvc("prisoner", cvL(16, -210), { from: "taken" })],
steps: [
{ k: "read" },
cvzGo("morass", "On through the black morass toward the glare", { r: 12 }),
cvzRead("🐺 The noises", cvbQs("There are vocal qualities peculiar to men, and vocal qualities peculiar to beasts; and it is terrible to hear the one when the source should yield the other.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzHold("morass", 10, "Stand still in the morass and listen, until the howling stops and the chant begins", { r: 14 }),
cvzPuzzle("🗣️ The chant", "Out of the dark rises a drilled chorus of hoarse voices. What are they chanting?", ["Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.", "Cthulhu R'lyeh fhtagn mglw'nafh.", "Iä! Iä!"], 0, ["", "Not in that order.", "Not that."], { yes: "🗣️ " + cvbQ("\"Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.\"") }),
cvzTalk("Inspector Legrasse", "Legrasse, in the morass", ["🤫 Quiet", "\"Quiet now. Toward the light.\"", "▶ Go on"]),
cvzId("thinner", cvzGo("thinner", "To where the trees grow thinner", { r: 10 })),
cvzReadA("😵 The spectacle", cvbQs("Then the men, having reached a spot where the trees were thinner, came suddenly in sight of the spectacle itself. Four of them reeled, one fainted, and two were shaken into a frantic cry which the mad cacophony of the orgy fortunately deadened.") + cvSrc(cvBk(1)), "<p>The men come out where the trees thin, and see what is in the glade. Some of them stagger. One faints.</p>" + cvSrc(cvBk(1)), "▶ Go on"),
cvzFind("jar", cvL(-12, -166), "Swamp water, in a dipper", "Fetch swamp water for the man who fainted"),
cvzTalk("A young patrolman", "The young patrolman, coming round", ["💧 Swamp water", cvbQs("Legrasse dashed swamp water on the face of the fainting man, and all stood trembling and nearly hypnotized with horror.") + cvSrc(cvBk(1)), "▶ Go on"]),
cvzGo("gladeEdge", "Creep to the edge of the glade", { r: 8 }),
cvzRead("🔥 The island in the glade", cvbQs("In a natural glade of the swamp stood a grassy island of perhaps an acre's extent, clear of trees and tolerably dry.", "in the center of which, revealed by occasional rifts in the curtain of flame, stood a great granite monolith some eight feet in height; on top of which, incongruous in its diminutiveness, rested the noxious carven statuette.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzReadA("🪢 The scaffolds", cvbQs("From a wide circle of ten scaffolds set up at regular intervals with the flame-girt monolith as a center hung, head downward, the oddly marred bodies of the helpless squatters who had disappeared.") + cvSrc(cvBk(1)), "<p>Around the fire stand ten wooden scaffolds. The missing squatters are there. They are beyond help.</p>" + cvSrc(cvBk(1)), "▶ Go on"),
cvzPuzzle("🔄 Which way?", "Between the ring of fire and the ring of scaffolds the worshippers leap and roar. Which way does the mass move?", ["Right to left", "Left to right", "They stand still"], 1, ["The other way.", "", "They never stand still."], { yes: "🔄 " + cvbQ("It was inside this circle that the ring of worshipers jumped and roared, the general direction of the mass motion being from left to right in endless bacchanale between the ring of bodies and the ring of fire.") }),
cvzTalk("Joseph D. Galvez", "Galvez, staring past the fire", ["🦇 Antiphonal", cvbQs("It may have been only imagination and it may have been only echoes which induced one of the men, an excitable Spaniard, to fancy he heard antiphonal responses to the ritual from some far and unillumined spot deeper within the wood of ancient legendry and horror.") + cvSrc(cvBk(1)), "▶ Go on"]),
cvzHold("gladeEdge", 8, "Look where Galvez is looking, into the far unlit wood. Is something white and vast out there, beyond the trees?", { r: 12 }),
cvzPuzzle("⚖️ Duty", "There are twenty of you and nearly a hundred of them. What does Legrasse do?", ["Retreats for help", "Duty first: the men trust their firearms and go in", "Waits for morning"], 1, ["Not with those bodies on the scaffolds.", "", "There is no waiting."], { yes: "⚖️ " + cvbQs("Duty came first;", "the police relied on their firearms and plunged determinedly into the nauseous rout.") }),
cvzId("raid", cvzGo("island", "Into the glade, onto the island", { r: 10 })),
cvzRead("💥 Five minutes", cvbQs("For five minutes the resultant din and chaos were beyond description. Wild blows were struck, shots were fired, and escapes were made;") + cvSrc(cvBk(1)), "▶ Go on"),
cvzGather("chain", cvL(8, -214), 4, "Handcuffs", "Bring the handcuffs to the sergeant, for the prisoners", { spread: 6, eachSay: "Another pair." }),
cvzPuzzle("🔢 The count", "When it is over, how many prisoners does Legrasse count?", ["Seven", "Forty-seven", "A hundred"], 1, ["More.", "", "Not so many: many escaped."], { yes: "🔢 " + cvbQ("but in the end Legrasse was able to count some forty-seven sullen prisoners,") }),
cvzId("taken", cvzFind("idol", cvL(0, -249), "The image on the monolith", "Lift the image down from the monolith for Legrasse", { y: null })),
cvzRead("🗿 Carried back", cvbQs("The image on the monolith, of course, was carefully removed and carried back by Legrasse.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzId("after", cvzHold("island", 10, "Stand on the island while the fire burns down to ash and the line of prisoners forms between two rows of policemen", { r: 12 })),
cvzTalk("Inspector Legrasse", "Legrasse, the image wrapped in his coat", ["🌅 Back", "\"Back to the city,\" he says. \"All of them. And this.\"", "▶ To the next part"])
] });
cvbCh({ t: "Old Castro", txt: [1, 23, 33], start: CVBI("cells", 2, 3), jump: 1, tune: "dread", keep: ["castro", "Old Castro's tale", "📜"],
state: { env: cvEnv({ bayou: "swampday" }), taken: true, ashes: true },
words: "Police headquarters, New Orleans, in the days after the raid. The prisoners are questioned one by one in the cells. Most will say little. One immensely aged man, Castro, will say more.",
intro: "The cells at headquarters, New Orleans",
cast: [cvc("legrasse", CVBI("cells", 2, 1.8), { ry: Math.PI, until: "meet" }), cvc("prisoner", CVBI("cells", -2.6, -2.4), { ry: 0 }), cvc("castro", CVBI("cells", -1.0, -2.6), { ry: 0 }),
cvc("legrasse", CVBI("stlouis", 0, -3.0), { from: "meet", ry: 0 }), cvc("webb", CVBI("stlouis", 2.6, -2.0), { from: "meet", ry: -Math.PI / 4 }), cvc("angell", CVBI("stlouis", -2.4, -2.2), { from: "meet", ry: Math.PI / 4 })],
steps: [
{ k: "read" },
cvzRead("🔍 Something deeper", cvbQs("Degraded and ignorant as they were, the creatures held with surprizing consistency to the central idea of their loathsome faith.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzGo(CVBI("cells", 0, 0.4), "Into the cell block", { r: 2.5 }),
cvzTalk("A prisoner", "A prisoner, behind the bars", ["⭐ The Great Old Ones", cvbQs("They worshiped, so they said, the Great Old Ones who lived ages before there were any men, and who came to the young world out of the sky.") + cvSrc(cvBk(1)), "▶ Go on"]),
cvzPuzzle("🌊 Where are they now?", "Where are the Old Ones now, the prisoners say?", ["In heaven", "Gone inside the earth and under the sea", "In the swamp"], 1, ["No.", "", "Not there."], { yes: "🌊 " + cvbQ("Those Old Ones were gone now, inside the earth and under the sea; but their dead bodies had told their secrets in dreams to the first man, who formed a cult which had never died.") }),
cvzRead("✨ When the stars are ready", cvbQs("Some day he would call, when the stars were ready, and the secret cult would always be waiting to liberate him.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzPuzzle("🤐 The secret", "What is the secret even torture cannot get out of them?", ["The chant", "Something never spoken aloud, only whispered", "Where they hid their money"], 1, ["The chant is not the secret.", "", "No."], { yes: "🤐 " + cvbQ("The chanted ritual was not the secret--that was never spoken aloud, only whispered.") }),
cvzReadA("⚖️ What became of them", cvbQs("Only two of the prisoners were found sane enough to be hanged, and the rest were committed to various institutions.", "All denied a part in the ritual murders, and averred that the killing had been done by Black-winged Ones which had come to them from their immemorial meeting-place in the haunted wood.") + cvSrc(cvBk(1)), "<p>Most of the prisoners are sent away to asylums. They all say the killing was done by black-winged things that came out of the haunted wood.</p>" + cvSrc(cvBk(1)), "▶ Go on"),
cvzTalk("Old Castro", "Old Castro, on his bench", ["🧓 Castro", "<p>An immensely aged man named Castro,</p>" + cvbQs("who claimed to have sailed to strange ports and talked with undying leaders of the cult in the mountains of China.") + cvSrc(cvBk(1)), "▶ Sit with him"]),
cvzFind("bread", CVBI("cells", 2.2, 0.8), "Bread and coffee", "Bring the old man bread and coffee from the desk"),
cvzSay("Old Castro", "Old Castro, eating slowly", "🏝️ Cyclopean stones", ["There had been eons when other Things ruled on the earth, and They had had great cities."], cvBk(1)),
cvzPuzzle("⭐ Where from?", "Where did They come from, Castro says?", ["From the deep sea", "From the stars, and They brought Their images with Them", "From Greenland"], 1, ["They went into the sea later.", "", "No."], { yes: "⭐ " + cvbQ("They had, indeed, come themselves from the stars, and brought Their images with Them.") }),
cvzRead("🌀 Not flesh", cvbQs("These Great Old Ones, Castro continued, were not composed altogether of flesh and blood. They had shape--for did not this star-fashioned image prove it?--but that shape was not made of matter.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzPuzzle("🛌 Why They cannot rise", "The spells that keep Them whole in R'lyeh also hold Them. What do They need?", ["Nothing: They will rise when They please", "Some force from outside, to liberate Their bodies", "Rain"], 1, ["Not so.", "", "No."], { yes: "🛌 " + cvbQ("But at that time some force from outside must serve to liberate Their bodies.") }),
cvzSay("Old Castro", "Old Castro", "💭 Dreams", ["When, after infinities of chaos, the first men came, the Great Old Ones spoke to the sensitive among them by molding their dreams; for only thus could Their language reach the fleshly minds of mammals."], cvBk(1)),
cvzRead("🌊 The city sank", cvbQs("The great stone city R'lyeh, with its monoliths and sepulchers, had sunk beneath the waves; and the deep waters, full of the one primal mystery through which not even thought can pass, had cut off the spectral intercourse.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzTalk("Old Castro", "Old Castro, turning his face away", ["🤐 No more", "He stops. He will not say what came out of the earth after, nor how large the Old Ones are. \"No more,\" he says. \"No more.\"", "▶ Go on"]),
cvzPuzzle("📕 The couplet", "There is a book with double meanings for those who know: the Necronomicon of the mad Arab. Which is its couplet?", ["\"That is not dead which can eternal lie, And with strange eons even death may die.\"", "\"What has risen may sink, and what has sunk may rise.\"", "\"In his house at R'lyeh dead Cthulhu waits dreaming.\""], 0, ["", "That is said by someone else, much later.", "That is the chant's meaning."], { yes: "📕 " + cvbQ("\"That is not dead which can eternal lie, And with strange eons even death may die.\"") }),
cvzRead("🏛️ No light", cvbQs("The authorities at Tulane University could shed no light upon either cult or image, and now the detective had come to the highest authorities in the country and met with no more than the Greenland tale of Professor Webb.") + cvSrc(cvBk(1)), "▶ Back to St. Louis"),
cvzId("meet", cvzTravel("🏛️ St. Louis, 1908", "<p>Back in the hall at St. Louis, where Legrasse has finished his story.</p>", CVBI("stlouis", 0, 0.6), "🏛️ <b>St. Louis, 1908.</b>", "▶ Go")),
cvzRead("📨 Caution", cvbQs("The feverish interest aroused at the meeting by Legrasse's tale, corroborated as it was by the statuette, is echoed in the subsequent correspondence of those who attended, although scant mention occurs in the formal publication of the society.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzTalk("Professor Webb", "Professor Webb, taking the image", ["🗿 Lent", "\"I'll take great care of it, Inspector,\" says Webb, and wraps it in the cloth.", "▶ Go on"]),
cvzPuzzle("🗿 Where is it now?", "Webb borrowed the image. Where is it in Thurston's day?", ["In a museum at Princeton", "Back with Legrasse, after Webb's death", "Lost"], 1, ["Not there.", "", "No: Thurston saw it."], { yes: "🗿 " + cvbQ("Legrasse for some time lent the image to Professor Webb, but at the latter's death it was returned to him and remains in his possession, where I viewed it not long ago.") }),
cvzTalk("Professor Angell", "Professor Angell, putting away his notes", ["📓 Seventeen years", "\"Cthulhu,\" the old man murmurs, writing it carefully in capitals. He will not hear it again for seventeen years, until a young sculptor says it in his study.", "▶ To the next part"])
] });
cvbCh({ t: "The Sculptor and the Inspector", txt: [1, 34, 41], start: "thomas", jump: 1, tune: "study", keep: ["statue", "Wilcox's statue", "🗿"],
state: { env: cvEnv({ providence: "winter", bayou: "swampday" }), season: "winter", taken: true, ashes: true },
words: "1927. Thurston has studied the manuscript again, and has come down to Providence to see the sculptor and give him the rebuke he thinks proper for imposing on a learned and aged man.",
intro: "Thomas Street, Providence, 1927",
cast: [cvc("thurston", cvP(-246, -162), { until: "rooms" }), cvc("thurston", CVPI("fleur26", -1.6, 1.0), { from: "rooms", until: "nola" }), cvc("wilcox", CVPI("fleur26", 1.6, -2.0), { ry: Math.PI }),
cvc("thurston", CVBI("legrasse", -1.6, 1.6), { from: "nola", until: "cells" }), cvc("legrasse", CVBI("legrasse", 0.8, -0.4), { until: "cells" }), cvc("survivor", CVBI("cells", -2.6, -2.4), { from: "cells" }), cvc("thurston", CVBI("cells", 1.4, 1.2), { from: "cells", until: "hill" }),
cvc("thurston", "hillStreet", { from: "hill" })],
steps: [
{ k: "read" },
cvzRead("🤨 A rebuke", cvbQs("So, after thoroughly studying the manuscript again and correlating the theosophical and anthropological notes with the cult narrative of Legrasse, I made a trip to Providence to see the sculptor and give him the rebuke I thought proper for so boldly imposing upon a learned and aged man.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzTalk("Francis Wayland Thurston", "Thurston, in Thomas Street", ["🏚️ The Fleur-de-Lys", cvbQs("Wilcox still lived alone in the Fleur-de-Lys Building in Thomas Street, a hideous Victorian imitation of Seventeenth Century Breton architecture which flaunts its stuccoed front amidst the lovely Colonial houses on the ancient hill, and under the very shadow of the finest Georgian steeple in America.") + cvSrc(cvBk(1)), "▶ Go on"]),
cvzPuzzle("⛪ The steeple", "The finest Georgian steeple in America stands over Thomas Street. Whose is it?", ["The First Baptist Meeting House", "University Hall", "The State House"], 0, ["", "University Hall has no steeple.", "Not here."], { yes: "⛪ The Meeting House, built in 1775, its white steeple high over the old hill." }),
cvzGo("meeting", "Look up at the steeple from the Meeting House", { r: 10 }),
cvzGo("fleurDoor", "To the door of the Fleur-de-Lys Building", { r: 4 }),
cvzId("rooms", cvzTravel("🚪 Up the stair", "<p>Up the stair to his rooms. A knock.</p>", CVPI("fleur26", 0, 2), "🚪 <b>Wilcox's rooms.</b>", "▶ Knock")),
cvzTalk("Henry Anthony Wilcox", "Wilcox, at his work", ["🎨 Without rising", cvbQs("Dark, frail, and somewhat unkempt in aspect, he turned languidly at my knock and asked me my business without rising.") + cvSrc(cvBk(1)), "▶ Go on"]),
cvzPuzzle("🤔 Subtlety", "He is curious why the professor questioned him so. What does Thurston tell him?", ["Everything: the cult, Legrasse, St. Louis", "Nothing more: he draws Wilcox out with some subtlety", "That the professor thought him mad"], 1, ["Thurston does not enlarge his knowledge.", "", "Not that."], { yes: "🤔 " + cvbQ("I did not enlarge his knowledge in this regard, but sought with some subtlety to draw him out.") }),
cvzGo(CVPI("fleur26", 2.6, 0.8), "Look at the statue in the corner", { r: 2 }),
cvzRead("🗿 A morbid statue", cvbQs("he showed me a morbid statue whose contours almost made me shake with the potency of its black suggestion. He could not recall having seen the original of this thing except in his own dream bas-relief, but the outlines had formed themselves insensibly under his hands.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzSay("Henry Anthony Wilcox", "Wilcox, of his dreams", "🏙️ All wrong", ["making me see with terrible vividness the damp Cyclopean city of slimy green stone--whose geometry, he oddly said, was all wrong--and hear with frightened expectancy the ceaseless, half-mental calling from underground: \"Cthulhu fhtagn,\" \"Cthulhu fhtagn.\""], cvBk(1)),
cvzPuzzle("⚖️ Thurston's verdict", "What does Thurston conclude about Wilcox?", ["He is a fraud", "He is sincere: he must have heard of the cult somewhere and forgotten it", "He is a member of the cult"], 1, ["Not after this.", "", "He knows nothing of it."], { yes: "⚖️ " + cvbQ("The youth was of a type, at once slightly affected and slightly ill-mannered, which I could never like; but I was willing enough now to admit both his genius and his honesty.") }),
cvzId("nola", cvzTravel("🚂 New Orleans", cvbQs("I visited New Orleans, talked with Legrasse and others of that old-time raiding-party, saw the frightful image,") + cvSrc(cvBk(1)), CVBI("legrasse", 0, 2.6), "🚂 <b>121 Bienville Street, New Orleans.</b>", "▶ Go")),
cvzTalk("Inspector Legrasse", "Legrasse, older now", ["🗿 Still here", "\"Webb had it till he died,\" Legrasse says. \"Then it came back to me. There, on the shelf. I don't look at it much.\"", "▶ Go on"]),
cvzGo(CVBI("legrasse", 0, -2.8), "Go to the shelf and look at the image", { r: 1.6 }),
cvzRead("🗿 Truly terrible", cvbQs("It is truly a terrible thing, and unmistakably akin to the dream-sculpture of young Wilcox.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzId("cells", cvzTravel("🔒 The survivors", "<p>Legrasse takes you to see one of the old prisoners who still survives.</p>", CVBI("cells", 0, 1.8), "🔒 <b>Headquarters.</b>", "▶ Go")),
cvzTalk("A survivor of the raid", "A survivor of the raid, grey now", ["🔥 Nineteen years", "\"I remember the fire,\" he says. \"I remember the chant. Castro? Castro's dead. Years dead.\"", "▶ Go on"]),
cvzPuzzle("🧓 Castro", "And old Castro?", ["Still in the asylum", "Dead for some years", "Escaped to China"], 1, ["No.", "", "No."], { yes: "🧓 " + cvbQ("Old Castro, unfortunately, had been dead for some years.") }),
cvzRead("🏆 Fame", cvbQs("for I felt sure that I was on the track of a very real, very secret, and very ancient religion whose discovery would make me an anthropologist of note.") + cvSrc(cvBk(1)), "▶ Go on"),
cvzId("hill", cvzTravel("🧭 Back to the hill", cvbQs("One thing which I began to suspect, and which I now fear I know, is that my uncle's death was far from natural.") + cvSrc(cvBk(1)), "hillStreet", "🧭 <b>The hill street, Providence.</b>", "▶ Go")),
cvzGo("courts", "Look into the dark courts, where the seaman came from", { r: 8 }),
cvzPuzzle("💉 How?", "What does Thurston begin to fear?", ["That the old man simply slipped on the ice", "Secret methods and poison needles, as old as the cult's rites", "That the doctors were careless"], 1, ["He no longer believes that.", "", "No."], { yes: "💉 " + cvbQ("and would not be surprized to learn of secret methods and poison needles as ruthless and as anciently known as the cryptic rites and beliefs.") }),
cvzTalk("Francis Wayland Thurston", "Thurston, on the hill street", ["🕯️ Too much", cvbQs("Might not the deeper inquiries of my uncle after encountering the sculptor's data have come to sinister ears?", "Whether I shall go as he did remains to be seen, for I have learned much now.") + cvSrc(cvBk(1)), "▶ To the next part: the madness from the sea"])
] });
var CVHI = function (k, x, z) { return cvwIn("harbour", k, x, z); };
var CVOI = function (k, x, z) { return cvwIn("oslo", k, x, z); };
var CVSI = function (k, x, z) { return cvwIn("sea", k, x, z); };
Object.assign(CVW_FOLK, {
tavern: { name: "The tavern keeper", dress: "worker", sex: "m", hair: 0x6A5A4A, beard: "full", persona: "sailor", greet: "What'll it be? We don't ask questions here, and we don't answer many." },
wharfhand: { name: "An old wharf hand", dress: "cvsailor", sex: "m", hair: 0xC8C0B0, beard: "short", persona: "sailor", greet: "The Alert? Island trader. Bad lot, that crew." },
clerk: { name: "A shipping clerk", dress: "gent", sex: "m", hair: 0x3A2A1A, persona: "townfolk", greet: "Johansen? Yes, I knew him. Sober and worthy, if ever a man was." },
quayman: { name: "A seaman at Circular Quay", dress: "cvsailor", sex: "m", hair: 0x5A3A1A, persona: "sailor", greet: "That's her, the yacht they towed in. Sold now. Carries cargo up the coast." },
courtclerk: { name: "A clerk of the vice-admiralty court", dress: "gent", sex: "m", hair: 0x8A7A6A, beard: "mustache", persona: "curator", greet: "The Alert inquiry? Closed, sir, months ago." },
driver: { name: "The taxi driver", dress: "worker", sex: "m", hair: 0xD8C890, persona: "townfolk", greet: "The Old Town? Get in." },
raider: { name: "A man of the Alert's crew", dress: "cvcult", sex: "m", hair: 0x141414, beard: "short", persona: "castro", greet: "Turn back." }
});
var CVD = function (x, z) { return cvS(x, z); };
cvbCh({ t: "The Sydney Bulletin", txt: [2, 0, 19], start: CVPI("paterson", 0, 2.4), jump: 1, tune: "study", keep: ["bulletin", "The Sydney Bulletin, April 18, 1925", "📰"],
state: { season: "winter" },
words: "Paterson, New Jersey. Thurston has largely given over his inquiries into the Cthulhu Cult, and is visiting a learned friend: the curator of a local museum, and a mineralogist of note. In the rear room, the reserve specimens sit on the shelves on old newspapers.",
intro: "The rear room of the museum, Paterson",
cast: [cvc("curator", CVPI("paterson", -2.4, 1.2), { ry: Math.PI / 2 }), cvc("thurston", CVPI("paterson", 1.4, 1.6), { ry: -Math.PI / 2 })],
steps: [
{ k: "read" },
cvzRead("📰 A stray piece of shelf-paper", cvbQs("If heaven ever wishes to grant me a boon, it will be a total effacing of the results of a mere chance which fixed my eye on a certain stray piece of shelf-paper.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzTalk("The curator", "The curator", ["🪨 Reserve specimens", "\"The reserve specimens,\" he says. \"Set out roughly, I'm afraid. Look all you like; my friends abroad send me all sorts of stones, and all sorts of newspapers to pack them in.\"", "▶ Go on"]),
cvzHold(CVPI("paterson", 0, 0.4), 8, "Walk along the storage shelves, looking at the specimens", { r: 3 }),
cvzPuzzle("👁️ Under the stones", "Something under one of the stones catches your eye. What?", ["A half-tone picture of a hideous stone image, in an old paper", "A banknote", "A letter"], 0, ["", "No.", "No."], { yes: "👁️ " + cvbQ("and the picture was a half-tone cut of a hideous stone image almost identical with that which Legrasse had found in the swamp.") }),
cvzGather("shell", CVPI("paterson", 1.5, -1.6), 4, "A mineral specimen", "Lift the stones off the paper, carefully, one by one", { spread: 0.7, eachSay: "One more off." }),
cvzFind("paper", CVPI("paterson", 1.5, -1.6), "The Sydney Bulletin, April 18, 1925", "Take up the paper"),
cvzRead("📰 MYSTERY DERELICT FOUND AT SEA", cvbQs("MYSTERY DERELICT FOUND AT SEA", "Vigilant Arrives With Helpless Armed New Zealand Yacht in Tow. One Survivor and Dead Man Found Aboard. Tale of Desperate Battle and Deaths at Sea. Rescued Seaman Refuses Particulars of Strange Experience. Odd Idol Found in His Possession. Inquiry to Follow.") + cvSrc(cvBk(2)), "▶ Read on"),
cvzRead("🚢 The Vigilant", cvbQs("The Morrison Co.'s freighter Vigilant, bound from Valparaiso, arrived this morning at its wharf in Darling Harbour, having in tow the battled and disabled but heavily armed steam yacht Alert of Dunedin, N. Z., which was sighted April 12th in S. Latitude 34° 21', W. Longitude 152° 17', with one living and one dead man aboard.") + cvSrc(cvBk(2)), "▶ Read on"),
cvzPuzzle("⛈️ Driven south", "Why was the Vigilant so far south of her course?", ["She was looking for the Alert", "She was driven south by exceptionally heavy storms and monster waves on April 2nd", "Her captain was lost"], 1, ["She came on it by chance.", "", "No."], { yes: "⛈️ " + cvbQ("The Vigilant left Valparaiso March 25th, and on April 2d was driven considerably south of her course by exceptionally heavy storms and monster waves.") }),
cvzRead("🗿 The idol", cvbQs("The living man was clutching a horrible stone idol of unknown origin, about a foot in height, regarding whose nature authorities at Sydney University, the Royal Society, and the Museum in College Street all profess complete bafflement, and which the survivor says he found in the cabin of the yacht, in a small carved shrine of common pattern.") + cvSrc(cvBk(2)), "▶ Read on"),
cvzPuzzle("🧔 The survivor", "Who is the survivor?", ["William Briden, able seaman", "Gustaf Johansen, a Norwegian, second mate of the schooner Emma of Auckland", "Captain Collins"], 1, ["Briden is the dead man.", "", "Collins was killed."], { yes: "🧔 " + cvbQ("He is Gustaf Johansen, a Norwegian of some intelligence, and had been second mate of the two-masted schooner Emma of Auckland, which sailed for Callao February 20th, with a complement of eleven men.") }),
cvzRead("💥 The Alert", cvbQs("Being ordered peremptorily to turn back, Capt. Collins refused; whereupon the strange crew began to fire savagely and without warning upon the schooner with a peculiarly heavy battery of brass cannon forming part of the yacht's equipment.") + cvSrc(cvBk(2)), "▶ Read on"),
cvzRead("🏝️ An island", cvbQs("The next day, it appears, they raised and landed on a small island, although none is known to exist in that part of the ocean; and six of the men somehow died ashore, though Johansen is queerly reticent about this part of his story and speaks only of their falling into a rock chasm.") + cvSrc(cvBk(2)), "▶ Read on"),
cvzPuzzle("🔢 Eleven men", "The Emma sailed with eleven. Three died fighting the Alert. Six died on the island. How many were left?", ["Two: Johansen and Briden", "Five", "None"], 0, ["", "Count again.", "One lived to be found."], { yes: "🔢 " + cvbQ("Later, it seems, he and one companion boarded the yacht and tried to manage her, but were beaten about by the storm of April 2nd.") }),
cvzRead("🌋 Dunedin", cvbQs("Cable advices from Dunedin report that the Alert was well known there as an island trader, and bore an evil reputation along the waterfront.", "and it had set sail in great haste just after the storm and earth tremors of March 1st.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzTalk("Francis Wayland Thurston", "Thurston, the paper shaking in his hands", ["📅 The dates", "\"The dates,\" he says. \"Look at the dates.\"", "▶ Go on"]),
cvzPuzzle("📅 March 1st", "What happened on March 1st (February 28th, across the date line)?", ["The earthquake and storm; the Alert darted out of Dunedin; the dreams began; Wilcox made the bas-relief", "The Emma sailed", "The Vigilant found the Alert"], 0, ["", "She sailed on February 20th.", "That was April 12th."], { yes: "📅 " + cvbQ("From Dunedin the Alert and her noisome crew had darted eagerly forth as if imperiously summoned, and on the other side of the earth poets and artists had begun to dream of a strange, dank Cyclopean city whilst a young sculptor had molded in his sleep the form of the dreaded Cthulhu.") }),
cvzPuzzle("📅 March 23rd", "And March 23rd?", ["The Emma's men landed on the unknown island, and six died; the dreams darkened; the architect went mad; Wilcox fell into delirium", "The Alert was sold", "Johansen reached Oslo"], 0, ["", "Much later.", "Much later."], { yes: "📅 " + cvbQ("March 23rd the crew of the Emma landed on an unknown island and left six men dead; and on that date the dreams of sensitive men assumed a heightened vividness and darkened with dread of a giant monster's malign pursuit,") }),
cvzPuzzle("📅 April 2nd", "And April 2nd?", ["The storm: the date on which all dreams of the dank city ceased, and Wilcox woke well", "The Bulletin was printed", "The court sat"], 0, ["", "That was April 18th.", "Later."], { yes: "📅 " + cvbQ("And what of this storm of April 2nd--the date on which all dreams of the dank city ceased, and Wilcox emerged unharmed from the bondage of strange fever?") }),
cvzTalk("The curator", "The curator", ["🚂 Adieu", cvbQs("That evening, after a day of hurried cabling and arranging, I bade my host adieu and took a train for San Francisco.") + cvSrc(cvBk(2)), "▶ To the next part"])
] });
cvbCh({ t: "Dunedin, Auckland, Sydney", txt: [2, 20, 22], start: CVHI("dunedin", 0, 3.4), jump: 1, tune: "sea", keep: ["museum", "The great image at Hyde Park", "🏛️"],
state: { env: cvEnv({ harbour: "harbour" }) },
words: "In less than a month Thurston is in Dunedin, New Zealand, asking along the waterfront about the Alert and the men who sailed her.",
intro: "An old sea tavern, Dunedin",
cast: [cvc("thurston", CVHI("dunedin", 1.4, 1.6), { until: "auck" }), cvc("tavern", CVHI("dunedin", 0, -3.0), { ry: 0 }), cvc("wharfhand", CVHI("dunedin", -3.4, -0.8), { ry: Math.PI / 2 }),
cvc("clerk", CVHI("auckland", 0, -1.8), { ry: 0 }), cvc("thurston", CVHI("auckland", 1.4, 0.8), { from: "auck", until: "syd" }),
cvc("quayman", cvH(-112, -30), { ry: Math.PI }), cvc("thurston", "alertQuay", { from: "syd", until: "court" }), cvc("courtclerk", CVHI("court", 0, -3.8)), cvc("thurston", CVHI("court", 2, 1), { from: "court", until: "museum" }),
cvc("hydecurator", CVHI("museum", 1.8, -2.6), { ry: -Math.PI / 4 }), cvc("thurston", CVHI("museum", -1.6, 0), { from: "museum" })],
steps: [
{ k: "read" },
cvzRead("🍺 Dunedin", cvbQs("In less than a month I was in Dunedin; where, however, I found that little was known of the strange cult-members who had lingered in the old sea taverns.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzTalk("The tavern keeper", "The tavern keeper", ["🍺 Waterfront scum", "\"That lot from the Alert? Drank here, now and then. Kept to themselves. We get all sorts. You'll not get much more from anyone.\"", "▶ Go on"]),
cvzTalk("An old wharf hand", "An old wharf hand, by the fire", ["🔥 The hills", "<p>\"They went inland once, that crew,\" he says. \"Up into the hills, by night. Folk saw red fire up there, and heard drums, faint, a long way off.\"</p>" + cvSrc(cvBk(2)), "▶ Go on"]),
cvzPuzzle("🔥 Drums", "Where else have you heard of drumming and red flame, and men gone into the woods by night?", ["In the Louisiana swamp, in 1907", "In Paterson", "In Boston"], 0, ["", "No.", "No."], { yes: "🔥 The same cult; the other side of the world." }),
cvzId("auck", cvzTravel("⛴️ Auckland", "<p>North by the coastal steamer to Auckland, where the Emma sailed from.</p>", CVHI("auckland", 0, 2.4), "⛴️ <b>A shipping office, Auckland.</b>", "▶ Go")),
cvzTalk("A shipping clerk", "A shipping clerk", ["⚓ Johansen", cvbQs("In Auckland I learned that Johansen had returned with yellow hair turned white after a perfunctory and inconclusive questioning at Sydney, and had thereafter sold his cottage in West Street and sailed with his wife to his old home in Oslo.") + cvSrc(cvBk(2)), "▶ Go on"]),
cvzPuzzle("🏠 Where is he?", "Where has Johansen gone?", ["Back to sea", "To Oslo, his old home, with his wife", "To Sydney"], 1, ["Not he.", "", "He left Sydney."], { yes: "🏠 " + cvbQ("Of his stirring experience he would tell his friends no more than he had told the admiralty officials, and all they could do was to give me his Oslo address.") }),
cvzFind("letter", CVHI("auckland", 0.6, -1.4), "Johansen's Oslo address", "Take the slip of paper with his address in Oslo"),
cvzId("syd", cvzTravel("⛴️ Sydney", "<p>Across the Tasman to Sydney, and down to Circular Quay.</p>", "quayIn", "⛴️ <b>Circular Quay, Sydney.</b>", "▶ Go")),
cvzGo("alertQuay", "Along the quay to the yacht they towed in", { r: 10 }),
cvzTalk("A seaman at Circular Quay", "A seaman at Circular Quay", ["🛥️ The Alert", cvbQs("I saw the Alert, now sold and in commercial use, at Circular Quay in Sydney Cove, but gained nothing from its non-committal bulk.") + cvSrc(cvBk(2)), "▶ Go on"]),
cvzHold("alertQuay", 8, "Stand on the quay and look at her: the black hull, the brass of her guns gone, the scars along her side", { r: 10 }),
cvzId("court", cvzGo("courtDoor", "Up to the vice-admiralty court", { r: 5 })),
cvzGo(CVHI("court", 0, 4.0), "Inside, among the benches", { r: 3 }),
cvzTalk("A clerk of the vice-admiralty court", "A clerk of the court", ["⚖️ Profitless", cvbQs("After that I went to Sydney and talked profitlessly with seamen and members of the vice-admiralty court.") + "<p>\"He said what he'd said before,\" the clerk tells you. \"Ruthless, the court thought them. The men of the Emma. But they were defending themselves, and the Alert's men were... very strange.\"</p>" + cvSrc(cvBk(2)), "▶ Go on"]),
cvzGo("hydePark", "Across to Hyde Park", { r: 12 }),
cvzId("museum", cvzGo("museumDoor", "To the Museum in College Street", { r: 5 })),
cvzGo(CVHI("museum", 0, 4.4), "In, to the gallery where they keep it", { r: 3 }),
cvzGo(CVHI("museum", 0, -1.6), "Up to the glass case", { r: 2 }),
cvzRead("🗿 The crouching image", cvbQs("The crouching image with its cuttlefish head, dragon body, scaly wings, and hieroglyphed pedestal, was preserved in the Museum at Hyde Park; and I studied it long and well, finding it a thing of balefully exquisite workmanship,") + cvSrc(cvBk(2)), "▶ Go on"),
cvzHold(CVHI("museum", 0, -1.4), 10, "Study it long and well, as Thurston did: the head, the folded wings, the pedestal's writing", { r: 2 }),
cvzPuzzle("🪨 What rock?", "What do the geologists say of its stone?", ["Common basalt", "That the world holds no rock like it", "Jade from China"], 1, ["No.", "", "No."], { yes: "🪨 " + cvbQ("Geologists, the curator told me, had found it a monstrous puzzle; for they vowed that the world held no rock like it.") }),
cvzTalk("The curator at Hyde Park", "The curator at Hyde Park", ["⭐ From the stars", cvbQs("Then I thought with a shudder of what old Castro had told Legrasse about the primal Great Ones: \"They had come from the stars, and had brought Their images with Them.\"") + cvSrc(cvBk(2)), "▶ To the next part"])
] });
cvbCh({ t: "Oslo", txt: [2, 23, 28], start: "osloIn", jump: 1, tune: "night", keep: ["manuscript", "Johansen's manuscript", "📓"],
state: { env: cvEnv({ oslo: "oslo" }) },
words: "Oslo, one autumn day. Thurston has sailed for London and re-embarked at once for the Norwegian capital. The trim wharves lie in the shadow of the Egeberg.",
intro: "The trim wharves, Oslo",
cast: [cvc("driver", cvO(-64, -36), { ry: Math.PI / 2, until: "taxi" }), cvc("thurston", "osloIn", { until: "taxi" }), cvc("thurston", cvO(-104, 146), { from: "taxi", until: "in" }), cvc("widow", cvO(-108, 150), { until: "in", ry: -Math.PI / 2 }),
cvc("widow", CVOI("johansen", 0.9, -0.4), { from: "in", ry: -Math.PI / 2 }), cvc("thurston", CVOI("johansen", -0.9, -0.2), { from: "in", until: "lane" }), cvc("thurston", "gothenburg", { from: "lane", until: "boat" }), cvc("thurston", CVOI("londonboat", 1.6, -0.8), { from: "boat" })],
steps: [
{ k: "read" },
cvzRead("⛰️ The Egeberg", cvbQs("Shaken with such a mental revolution as I had never before known, I now resolved to visit Mate Johansen in Oslo. Sailing for London, I re-embarked at once for the Norwegian capital; and one autumn day landed at the trim wharves in the shadow of the Egeberg.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzHold("osloIn", 8, "Stand on the quay and look up at the Egeberg, wooded and gold with autumn", { r: 12 }),
cvzPuzzle("🏘️ The Old Town", "Johansen's address is in the old town that kept the name of Oslo alive while the greater city called itself what?", ["Bergen", "Christiania", "Trondheim"], 1, ["Another city altogether.", "", "Another city."], { yes: "🏘️ " + cvbQ("Johansen's address, I discovered, lay in the Old Town of King Harold Haardrada, which kept alive the name of Oslo during all the centuries that the greater city masqueraded as \"Christiania.\"") }),
cvzTalk("The taxi driver", "The taxi driver", ["🚕 A taxicab", "\"Gamlebyen, the Old Town. Not far.\" He opens the door for you.", "▶ Get in"]),
cvzId("taxi", cvzTravel("🚕 By taxicab", cvbQs("I made the brief trip by taxicab,") + cvSrc(cvBk(2)), "oldTown", "🚕 <b>The Old Town.</b>", "▶ Go")),
cvzGo("johansenDoor", "To the door of a neat and ancient building with plastered front", { r: 4 }),
cvzTalk("Mrs. Johansen", "A sad-faced woman in black", ["🖤 No more", cvbQs("A sad-faced woman in black answered my summons, and I was stung with disappointment when she told me in halting English that Gustaf Johansen was no more.") + cvSrc(cvBk(2)), "▶ Go in"]),
cvzId("in", cvzGo(CVOI("johansen", 0, 2.4), "Into the parlour", { r: 2.5 })),
cvzTalk("Mrs. Johansen", "Mrs. Johansen", ["📓 Technical matters", cvbQs("He had told her no more than he had told the public, but had left a long manuscript--of \"technical matters\" as he said--written in English, evidently in order to safeguard her from the peril of casual perusal.") + cvSrc(cvBk(2)), "▶ Go on"]),
cvzPuzzle("📦 How he died", "How did Johansen die?", ["At sea", "In a narrow lane near the Gothenburg dock, knocked down by a bundle of papers falling from an attic window", "Of fever"], 1, ["He never went to sea again.", "", "No."], { yes: "📦 " + cvbQ("During a walk through a narrow lane near the Gothenburg dock, a bundle of papers falling from an attic window had knocked him down.") }),
cvzReadA("🚑 Two sailors", "<p>Two sailors at once helped him to his feet,</p>" + cvbQs("but before the ambulance could reach him he was dead. Physicians found no adequate cause for the end, and laid it to heart trouble and a weakened constitution.") + cvSrc(cvBk(2)), "<p>Two sailors helped him up at once, but by the time the ambulance came he had died. The doctors said it was his heart.</p>" + cvSrc(cvBk(2)), "▶ Go on"),
cvzPuzzle("🕯️ Again", "Where have you heard this before?", ["Professor Angell: jostled by a seaman on the hill street, dead, and the doctors said his heart", "Nowhere", "Wilcox's fever"], 0, ["", "Think again: Providence.", "Wilcox lived."], { yes: "🕯️ " + cvbQ("I now felt gnawing at my vitals that dark terror which will never leave me till I, too, am at rest; \"accidentally\" or otherwise.") }),
cvzPuzzle("📓 The manuscript", "How does Thurston get the manuscript?", ["He steals it", "He persuades the widow that his connection with her husband's technical matters entitles him to it", "He buys it"], 1, ["Never.", "", "She does not sell."], { yes: "📓 " + cvbQ("Persuading the widow that my connection with her husband's \"technical matters\" was sufficient to entitle me to his manuscript, I bore the document away and began to read it on the London boat.") }),
cvzFind("book", CVOI("johansen", 0.2, 0.1), "Johansen's manuscript", "Take the manuscript from the table, where she has set it beside the tin box"),
cvzId("lane", cvzTravel("🏚️ The Gothenburg dock", "<p>Before the boat sails, walk down to the lane where it happened.</p>", "gothenburg", "🏚️ <b>The lane near the Gothenburg dock.</b>", "▶ Go")),
cvzHold("gothenburg", 8, "Stand in the narrow lane and look up at the attic windows. All shut now", { r: 8 }),
cvzGo("londonBoat", "Down to the London boat", { r: 10 }),
cvzId("boat", cvzTravel("🛳️ The London boat", "<p>Your cabin; the engines; the sound of the water against the side.</p>", CVOI("londonboat", 0, 1.6), "🛳️ <b>A cabin on the London boat.</b>", "▶ Aboard")),
cvzRead("📓 A simple, rambling thing", cvbQs("It was a simple, rambling thing--a naive sailor's effort at a post-facto diary--and strove to recall day by day that last awful voyage.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzPuzzle("🌊 The water", "Why does Thurston stop his ears with cotton?", ["The engines are loud", "The sound of the water against the vessel's sides has become unendurable to him", "He is seasick"], 1, ["Not that.", "", "Not that."], { yes: "🌊 " + cvbQ("but I will tell its gist enough to show why the sound of the water against the vessel's sides became so unendurable to me that I stopped my ears with cotton.") }),
cvzTalk("Francis Wayland Thurston", "Thurston, the manuscript open", ["📖 Read it", "\"Johansen, thank God, did not know quite all,\" he says. \"But read it. Read it as he lived it.\"", "▶ To the next part: the voyage"])
] });
cvbCh({ t: "The Emma and the Alert", txt: [2, 29, 29], start: "emmaDeck", jump: 1, tune: "sea", keep: ["emma", "The Emma of Auckland", "⛵"],
state: { env: function () { return cvbStepAt("storm") && !cvbStepAt("calm") ? "storm" : "sea"; }, storm: function () { return cvbStepAt("storm") && !cvbStepAt("calm"); }, alertNear: function () { return cvbStepAt("sail"); }, battle: function () { return cvbStepAt("guns"); }, sinking: function () { return cvbStepAt("sink"); }, alertOurs: function () { return cvbStepAt("ours"); } },
words: "February 20th, 1925. The two-masted schooner Emma clears Auckland in ballast for Callao, with eleven men. You sail in her. The second mate is Gustaf Johansen.",
intro: "The deck of the Emma, out of Auckland",
cast: [cvc("johansen", CVD(0.8, 9), { until: "ours" }), cvc("collins", CVD(-1.2, 11), { until: "fallen" }), cvc("green", CVD(1.6, -4), { until: "fallen" }), cvc("briden", CVD(-1.8, 2), { until: "ours" }), cvc("donovan", CVD(1.8, 0), { until: "ours" }),
cvc("rodriguez", CVD(-1.4, -8), { until: "ours" }), cvc("hawkins", CVD(1.4, 4), { until: "ours" }), cvc("parker", CVD(-2.0, 6), { until: "ours" }),
cvc("raider", cvS(-30, 0), { from: "sail", until: "ours" }),
cvc("johansen", CVD(0.8, 12), { from: "ours" }), cvc("briden", CVD(-1.8, 2), { from: "ours" }), cvc("donovan", CVD(1.8, 0), { from: "ours" }), cvc("rodriguez", CVD(-1.4, -8), { from: "ours" }), cvc("hawkins", CVD(1.4, 4), { from: "ours" }), cvc("parker", CVD(-2.0, 6), { from: "ours" }), cvc("guerrera", CVD(-1.0, -12), { from: "ours" }), cvc("angstrom", CVD(1.0, -2), { from: "ours" })],
steps: [
{ k: "read" },
cvzRead("⛵ In ballast", cvbQs("Johansen's voyage had begun just as he told it to the vice-admiralty. The Emma, in ballast, had cleared Auckland on February 20th,") + cvSrc(cvBk(2)), "▶ Go on"),
cvzTalk("Captain Collins", "Captain Collins, at the wheel", ["🧭 Callao", "\"Callao,\" says the captain. \"East-north-east, and a long way of it. She's light in ballast; she'll be lively.\"", "▶ Go on"]),
cvzTalk("Gustaf Johansen", "Gustaf Johansen, second mate", ["👋 The second mate", "\"Johansen.\" He shakes your hand. Yellow-haired, steady, quiet. \"Mind the main sheet when we come about.\"", "▶ Go on"]),
cvzGather("chain", CVD(0, -2), 4, "A loose line", "Coil down the loose lines on deck, as the mate asks", { spread: 3, eachSay: "Coiled." }),
cvzId("storm", cvzRead("⛈️ March 1st", cvbQs("and had felt the full force of that earthquake-born tempest which must have heaved up from the sea-bottom the horrors that filled men's dreams.") + cvSrc(cvBk(2)), "▶ Hold on")),
cvzHold("emmaWheel", 10, "Hold on by the wheel with the captain while the tempest throws her about", { r: 4 }),
cvzPuzzle("⛈️ The storm", "What does the storm of March 1st do to the Emma?", ["Drives her widely south of her course", "Sinks her", "Nothing"], 0, ["", "Not yet.", "It does a great deal."], { yes: "⛈️ " + cvbQ("The Emma, he says, was delayed and thrown widely south of her course by the great storm of March 1st,") }),
cvzId("calm", cvzRead("🌤️ Under control", cvbQs("Once more under control, the ship was making good progress") + "<p>Three weeks on, south of her course in a grey empty sea, March 22nd.</p>" + cvSrc(cvBk(2)), "▶ Go on")),
cvzId("sail", cvzGo("emmaBow", "Forward to the bow: a sail, or a smoke, to port", { r: 4 })),
cvzHold("emmaBow", 8, "Watch her come up: a black steam yacht, guns at her rail, heading straight for you", { r: 5 }),
cvzTalk("A man of the Alert's crew", "A man at the Alert's rail, shouting across", ["✋ Turn back", "\"Turn back!\" he shouts. \"Turn back! You go no further!\"", "▶ Go on"]),
cvzPuzzle("⚓ The captain's answer", "The yacht orders you peremptorily to turn back. What does Captain Collins answer?", ["He turns back", "He refuses", "He offers to trade"], 1, ["Not Collins.", "", "" + "No."], { yes: "⚓ " + cvbQ("Being ordered peremptorily to turn back, Capt. Collins refused;") }),
cvzId("guns", cvzReadA("💥 The guns", cvbQs("whereupon the strange crew began to fire savagely and without warning upon the schooner with a peculiarly heavy battery of brass cannon forming part of the yacht's equipment.") + cvSrc(cvBk(2)), "<p>The yacht opens fire without warning with her heavy brass cannon.</p>" + cvSrc(cvBk(2)), "▶ Go on")),
cvzId("sink", cvzRead("🌊 Holed", cvbQs("The Emma's men showed fight, says the survivor, and though the schooner began to sink from shots beneath the waterline they managed to heave alongside their enemy and board her,") + cvSrc(cvBk(2)), "▶ Go on")),
cvzPuzzle("🛟 What now?", "The Emma is sinking under you. What can the men do?", ["Take to the boat and row away", "Heave alongside the yacht and board her", "Surrender"], 1, ["The yacht would shoot them in the water.", "", "Not these men."], { yes: "🛟 They heave the sinking schooner alongside and go over the rail." }),
cvzReadA("⚔️ The fight", cvbQs("grappling with the savage crew on the yacht's deck, and being forced to kill them all, the number being slightly superior, because of their particularly abhorrent and desperate though rather clumsy mode of fighting.") + cvSrc(cvBk(2)), "<p>There is a desperate fight on the yacht's deck. When it is over, the Alert's crew are all gone.</p>" + cvSrc(cvBk(2)), "▶ Go on"),
cvzId("fallen", cvzReadA("🕯️ Three", cvbQs("Three of the Emma's men, including Capt. Collins and First Mate Green, were killed;") + cvSrc(cvBk(2)), "<p>Three of the Emma's men are lost, Captain Collins and Mr. Green among them.</p>" + cvSrc(cvBk(2)), "▶ Go on")),
cvzId("ours", cvzRead("🛥️ The Alert is theirs", cvbQs("and the remaining eight under Second Mate Johansen proceeded to navigate the captured yacht, going ahead in their original direction to see if any reason for their ordering back had existed.") + "<p>The Emma goes down astern. You stand on the Alert's deck now.</p>" + cvSrc(cvBk(2)), "▶ Go on")),
cvzPuzzle("🧭 Which way?", "Johansen has the yacht. Which way does he take her?", ["Home to Auckland", "On, in their original direction, to see why they were ordered back", "To Dunedin, to report"], 1, ["Not yet.", "", "No."], { yes: "🧭 " + cvbQ("Then, driven ahead by curiosity in their captured yacht under Johansen's command,") }),
cvzTravel("🚪 The cabin", "<p>Down to the yacht's cabin.</p>", CVSI("alertcabin", 0, 2), "🚪 <b>The Alert's cabin.</b>", "▶ Go below"),
cvzGo(CVSI("alertcabin", 0, -1.6), "To the little carved shrine against the bulkhead", { r: 1.6 }),
cvzPuzzle("🗿 The shrine", "What is in the shrine?", ["A ship's Bible", "A stone idol, about a foot high: the image again", "Gold"], 1, ["No.", "", "No."], { yes: "🗿 " + cvbQ("which the survivor says he found in the cabin of the yacht, in a small carved shrine of common pattern.") }),
cvzTravel("⬆️ On deck", "<p>Back up on deck, where Johansen has the wheel.</p>", "emmaWheel", "⬆️ <b>The deck of the Alert.</b>", "▶ Go up"),
cvzTalk("Gustaf Johansen", "Johansen, at the Alert's wheel", ["🌊 Onward", "\"Get steam up,\" he says. \"We'll see what they were guarding.\"", "▶ To the next part"])
] });
var CVRD = function (x, z) { return cvR(x, z); };
cvbCh({ t: "The Pillar and the Shore", txt: [2, 29, 33], start: "emmaWheel", jump: 1, tune: "dread", keep: ["shore", "The coast of R'lyeh", "🏝️"],
state: { env: cvEnv({ sea: "sea", rlyeh: "rlyeh" }), alertOurs: true, steam: true, pillar: function () { return cvbStepAt("pillar"); }, rlyehWater: function () { return cvbStepAt("pillar"); } },
words: "The Alert, under Johansen, steaming on in the direction she had ordered the Emma away from. March 23rd, 1925. There are eight of you left.",
intro: "The deck of the Alert",
cast: [cvc("johansen", CVD(0.8, 12), { until: "land" }), cvc("briden", CVD(-1.8, 2), { until: "land" }), cvc("rodriguez", CVD(-1.4, -12), { until: "land" }), cvc("donovan", CVD(1.8, 0), { until: "land" }), cvc("hawkins", CVD(1.4, 4), { until: "land" }), cvc("parker", CVD(-2, 6), { until: "land" }), cvc("guerrera", CVD(-1, -6), { until: "land" }), cvc("angstrom", CVD(1, -2), { until: "land" }),
cvc("johansen", CVRD(2, 206), { from: "land", until: "climb" }), cvc("briden", CVRD(-4, 210), { from: "land", until: "climb" }), cvc("donovan", CVRD(8, 208), { from: "land", until: "climb" }), cvc("rodriguez", CVRD(-8, 200), { from: "land", until: "climb" }),
cvc("johansen", CVRD(6, 106), { from: "climb" }), cvc("briden", CVRD(-2, 112), { from: "climb" }), cvc("donovan", CVRD(16, 114), { from: "climb" }), cvc("rodriguez", CVRD(-10, 62), { from: "climb" }), cvc("hawkins", CVRD(12, 64), { from: "climb" }), cvc("parker", CVRD(-30, 72), { from: "climb" }), cvc("guerrera", CVRD(18, 24), { from: "climb" }), cvc("angstrom", CVRD(10, 16), { from: "climb" })],
steps: [
{ k: "read" },
cvzTalk("Gustaf Johansen", "Johansen, at the wheel", ["🧭 South and east", "\"Keep a good lookout,\" he says. \"There's nothing on the chart here. Nothing at all.\"", "▶ Go on"]),
cvzId("pillar", cvzGo("emmaBow", "Forward to the bow, to keep the lookout", { r: 4 })),
cvzHold("emmaBow", 8, "Watch the sea ahead. Something stands up out of it, to the south-east", { r: 5 }),
cvzRead("🗿 A pillar", cvbQs("the men sight a great stone pillar sticking out of the sea,") + cvSrc(cvBk(2)), "▶ Go on"),
cvzPuzzle("🗺️ The position", "Johansen takes a sight and works out the position. Where is it?", ["S. Latitude 34° 21', W. Longitude 152° 17'", "S. Latitude 47° 9', W. Longitude 126° 43'", "S. Latitude 49° 51', W. Longitude 128° 34'"], 1, ["That is where the Vigilant will find you, much later.", "", "That is where you met the Alert."], { yes: "🗺️ " + cvbQ("and in S. Latitude 47° 9', W. Longitude 126° 43' come upon a coastline of mingled mud, ooze, and weedy Cyclopean masonry") }),
cvzRead("🏙️ The corpse-city", cvbQs("which can be nothing less than the tangible substance of earth's supreme terror--the nightmare corpse-city of R'lyeh, that was built in measureless eons behind history by the vast, loathsome shapes that seeped down from the dark stars.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzPuzzle("🏔️ How much of it?", "How much of the city has come up out of the sea?", ["All of it, for miles", "Only a single mountain-top: the monolith-crowned citadel where great Cthulhu was buried", "None: it is a reef"], 1, ["Thurston thinks not.", "", "It is no reef."], { yes: "🏔️ " + cvbQ("I suppose that only a single mountain-top, the hideous monolith-crowned citadel whereon great Cthulhu was buried, actually emerged from the waters.") }),
cvzTalk("Gustaf Johansen", "Johansen", ["🚣 The boat", "\"Lower the boat. All hands. We'll go and look.\"", "▶ Lower away"]),
cvzId("land", cvzTravel("🚣 Ashore", cvbQs("Johansen and his men landed at a sloping mud-bank on this monstrous Acropolis,") + cvSrc(cvBk(2)), "rlBank", "🚣 <b>The sloping mud-bank.</b>", "▶ Row ashore")),
cvzRead("😶 Awe", cvbQs("Awe at the unbelievable size of the greenish stone blocks, at the dizzying height of the great carven monolith, and at the stupefying identity of the colossal statues and bas-reliefs with the queer image found in the shrine on the Alert, is poignantly visible in every line of the mate's frightened description.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzHold("rlBank", 8, "Stand on the mud-bank and look up: block on block, ooze and weed, and the monolith over all", { r: 10 }),
cvzTalk("William Briden", "William Briden, on the mud", ["😨 Briden", "\"I don't like it,\" Briden says. \"I don't like any of it. Look at the size of them.\"", "▶ Go on"]),
cvzId("climb", cvzGo("rlBlocks", "Clamber up over the titan oozy blocks", { r: 10 })),
cvzRead("🧗 No mortal staircase", cvbQs("and clambered slipperily up over titan oozy blocks which could have been no mortal staircase.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzGo("rlAngles", "On up, among the angles", { r: 10 }),
cvzRead("☀️ The sun", cvbQs("The very sun of heaven seemed distorted when viewed through the polarizing miasma welling out from this sea-soaked perversion,") + cvSrc(cvBk(2)), "▶ Look up"),
cvzHold("rlAngles", 8, "Look hard at the carven rock beside you, and then look again", { r: 10 }),
cvzPuzzle("📐 The angles", "You looked once, and then a second time. What did you see?", ["The same, both times", "Convexity the first time, concavity the second", "A door"], 1, ["Not here.", "", "Not yet."], { yes: "📐 " + cvbQ("twisted menace and suspense lurked leeringly in those crazily elusive angles of carven rock where a second glance showed concavity after the first showed convexity.") }),
cvzRead("📏 Non-Euclidean", cvbQs("He had said that the geometry of the dream-place he saw was abnormal, non-Euclidean, and loathsomely redolent of spheres and dimensions apart from ours. Now an unlettered seaman felt the same thing whilst gazing at the terrible reality.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzGo("rlTerrace", "Up to a terrace of carven rock", { r: 10 }),
cvzGo("rlReliefs", "Among the colossal bas-reliefs", { r: 10 }),
cvzPuzzle("🗿 The statues", "The colossal statues on the terraces: what are they like?", ["Men in armour", "The image from the Alert's shrine, the Legrasse image, the clay bas-relief: the same, but huge", "Birds"], 1, ["No.", "", "No."], { yes: "🗿 The same crouching shape, as big as houses." }),
cvzHold("rlReliefs", 10, "Search the carvings for some portable souvenir to bear away, as the men are doing", { r: 14 }),
cvzRead("🫥 Vainly", cvbQs("Something very like fright had come over all the explorers before anything more definite than rock and ooze and weed was seen. Each would have fled had he not feared the scorn of the others, and it was only half-heartedly that they searched--vainly, as it proved--for some portable souvenir to bear away.") + cvSrc(cvBk(2)), "▶ To the next part")
] });
var CVEDGE = function (i) { return function () { var e = (CVW.rlEdge || [])[i]; return e ? { sc: "rlyeh", x: e.x, z: e.z } : { sc: "rlyeh", x: -15 + i * 6, z: -125 }; }; };
cvbCh({ t: "The Door", txt: [2, 34, 37], start: "rlHigh", jump: 1, tune: "dread", keep: ["door", "The great carved door", "🚪"],
state: { env: function () { return cvbStepAt("gives") ? "rlyehdark" : "rlyeh"; }, doorOpen: function () { return cvbStepAt("gives"); }, thing: function () { return cvbStepAt("it") ? 1 : 0; } },
words: "High on the citadel of R'lyeh. The men have searched for a souvenir, and found nothing. Then Rodriguez, the best climber of them, calls from the foot of the monolith.",
intro: "High on the citadel",
cast: [cvc("rodriguez", CVRD(-12, -104), { until: "door" }), cvc("rodriguez", CVRD(-12, -110), { from: "door" }), cvc("johansen", CVRD(-4, -36), { until: "door" }), cvc("johansen", CVRD(6, -108), { from: "door" }),
cvc("briden", CVRD(4, -30), { until: "door" }), cvc("briden", CVRD(-6, -114), { from: "door" }), cvc("donovan", CVRD(10, -28), { until: "door" }), cvc("donovan", CVRD(10, -116), { from: "door", until: "edge" }), cvc("donovan", CVRD(16, -118), { from: "gives" }),
cvc("hawkins", CVRD(-12, -22), { until: "door" }), cvc("hawkins", CVRD(-16, -108), { from: "door" }), cvc("parker", CVRD(-20, -104), { from: "door" }), cvc("guerrera", CVRD(20, -102), { from: "door" }), cvc("angstrom", CVRD(14, -100), { from: "door" })],
steps: [
{ k: "read" },
cvzTalk("Rodriguez", "Rodriguez, shouting from the foot of the monolith", ["📣 Here!", cvbQs("It was Rodriguez the Portuguese who climbed up the foot of the monolith and shouted of what he had found.") + cvSrc(cvBk(2)), "▶ Go up"]),
cvzGo("rlMono", "Up to the foot of the monolith", { r: 10 }),
cvzId("door", cvzGo("rlDoor", "Follow him to what he has found", { r: 8 })),
cvzRead("🚪 The door", cvbQs("The rest followed him, and looked curiously at the immense carved door with the now familiar squid-dragon bas-relief. It was, Johansen said, like a great barn-door;") + cvSrc(cvBk(2)), "▶ Go on"),
cvzPuzzle("📐 Which way does it lie?", "Look at the door. Does it lie flat like a trap-door, or slantwise like an outside cellar-door?", ["Flat, like a trap-door", "Slantwise, like a cellar-door", "You cannot decide: the geometry of the place is all wrong"], 2, ["Look again: it is not flat.", "Look again: it is not slantwise.", ""], { yes: "📐 " + cvbQ("As Wilcox would have said, the geometry of the place was all wrong. One could not be sure that the sea and the ground were horizontal, hence the relative position of everything else seemed fantasmally variable.") }),
cvzTalk("William Briden", "Briden, pushing at the stone", ["✋ Briden pushes", cvbQs("Briden pushed at the stone in several places without result.") + cvSrc(cvBk(2)), "▶ Go on"]),
cvzTalk("Donovan", "Donovan", ["🤲 Good hands", "\"Let me,\" says Donovan. \"There'll be a catch. Or a balance. Feel along the edge with me, point by point.\"", "▶ Feel along the edge"]),
cvzId("edge", cvzFind("note", CVEDGE(0), "A point on the door's edge", "Press the first point along the edge", { verb: "press" })),
cvzFind("note", CVEDGE(1), "A point on the door's edge", "Press the next point, a little further along the grotesque molding", { verb: "press" }),
cvzFind("note", CVEDGE(2), "A point on the door's edge", "And the next, separately, as Donovan does", { verb: "press" }),
cvzFind("note", CVEDGE(3), "A point on the door's edge", "And the next: climbing, if it can be called climbing", { verb: "press" }),
cvzFind("note", CVEDGE(4), "A point on the door's edge", "And the next", { verb: "press" }),
cvzFind("note", CVEDGE(5), "A point on the door's edge", "And the last point, at the far jamb", { verb: "press" }),
cvzRead("🧗 Interminably", cvbQs("Then Donovan felt over it delicately around the edge, pressing each point separately as he went. He climbed interminably along the grotesque stone molding--that is, one would call it climbing if the thing was not after all horizontal--and the men wondered how any door in the universe could be so vast.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzId("gives", cvzRead("⚖️ Balanced", cvbQs("Then, very softly and slowly, the acre-great panel began to give inward at the top; and they saw that it was balanced.") + cvSrc(cvBk(2)), "▶ Watch")),
cvzHold("rlDoor", 10, "Stand back with the others and watch it move: diagonally, so that all the rules of matter and perspective seem upset", { r: 12 }),
cvzPuzzle("↗️ How it moved", "How does the portal move as it opens?", ["Straight back, like any door", "Anomalously, in a diagonal way", "It does not move"], 1, ["Nothing here is like any door.", "", "It moves."], { yes: "↗️ " + cvbQ("In this fantasy of prismatic distortion it moved anomalously in a diagonal way, so that all the rules of matter and perspective seemed upset.") }),
cvzRead("🌑 The darkness", cvbQs("The aperture was black with a darkness almost material. That tenebrousness was indeed a positive quality; for it obscured such parts of the inner walls as ought to have been revealed, and actually burst forth like smoke from its eon-long imprisonment, visibly darkening the sun as it slunk away into the shrunken and gibbous sky on flapping membranous wings.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzHold("rlDoor", 8, "Watch the darkness rise out of the doorway and go up into the sky, toward the Void's far islands", { r: 14 }),
cvzTalk("Hawkins", "Hawkins, quick-eared, his head on one side", ["👂 Hawkins", "\"Hush. Listen. Down there.\"", "▶ Listen"]),
cvzPuzzle("👂 What Hawkins hears", "What does Hawkins think he hears, down in the dark?", ["Water dripping", "A nasty, slopping sound", "Voices chanting"], 1, ["Worse than that.", "", "Not that."], { yes: "👂 " + cvbQ("The odor arising from the newly opened depths was intolerable, and at length the quick-eared Hawkins thought he heard a nasty, slopping sound down there.") }),
cvzHold("rlDoor", 8, "Everyone listens. Everyone is listening still when", { r: 14 }),
cvzId("it", cvzRead("🟢 It", cvbQs("Everyone listened, and everyone was listening still when It lumbered slobberingly into sight and gropingly squeezed Its gelatinous green immensity through the black doorway into the tainted outside air of that poison city of madness.") + cvSrc(cvBk(2)), "▶ To the next part"))
] });
cvbCh({ t: "The Thing Wakes", txt: [2, 38, 42], start: "rlMono", jump: 1, tune: "chase", keep: ["thing", "Great Cthulhu, loose", "🐙"],
state: { env: function () { return CVW.sc === "sea" ? "rlyehdark" : "rlyehdark"; }, doorOpen: true, boatGone: function () { return cvbStepAt("row"); },
thing: function () { return cvbStepAt("edgewater") ? 3 : (cvbStepAt("run") ? 2 : 1); }, alertOurs: true, steam: true, rlyehWater: true, chase: function () { return cvbStepAt("ram") ? 3 : (cvbStepAt("reverse") ? 2 : (cvbStepAt("row") ? 1 : 0)); } },
words: "At the door of R'lyeh. It has come out.",
intro: "The foot of the monolith",
cast: [cvc("johansen", CVRD(-2, -96), { until: "run" }), cvc("briden", CVRD(-8, -94), { until: "run" }), cvc("parker", CVRD(-14, -92), { until: "run" }), cvc("johansen", CVRD(4, 214), { from: "run", until: "row" }), cvc("briden", CVRD(-2, 216), { from: "run", until: "row" }),
cvc("johansen", CVD(0.8, 12), { from: "row" }), cvc("briden", CVD(-1.6, 8), { from: "row" })],
steps: [
{ k: "read" },
cvzReadA("🟢 A mountain walked", cvbQs("The Thing can not be described--there is no language for such abysms of shrieking and immemorial lunacy, such eldritch contradictions of all matter, force, and cosmic order. A mountain walked or stumbled.") + cvSrc(cvBk(2)), cvbQs("A mountain walked or stumbled.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzRead("🌍 Across the earth", cvbQs("What wonder that across the earth a great architect went mad, and poor Wilcox raved with fever in that telepathic instant?") + cvSrc(cvBk(2)), "▶ Go on"),
cvzPuzzle("⭐ Why now?", "Why has It woken now?", ["The cult's rites, at last", "The stars were right again, and a band of innocent sailors opened the door by accident", "It was always awake"], 1, ["The cult failed.", "", "It was asleep, dreaming."], { yes: "⭐ " + cvbQ("The stars were right again, and what an age-old cult had failed to do by design, a band of innocent sailors had done by accident.") }),
cvzReadA("🕯️ Three men", cvbQs("Three men were swept up by the flabby claws before anybody turned. God rest them, if there be any rest in the universe. They were Donovan, Guerrera and Angstrom.") + cvSrc(cvBk(2)), "<p>Before anyone can turn, three men are lost: Donovan, Guerrera and Angstrom.</p>" + cvSrc(cvBk(2)), "▶ Run"),
cvzId("run", cvzGo("rlHigh", "Run! Down from the citadel, over the green-crusted rock", { r: 12 })),
cvzGo("rlCorner", "Down past the corner of masonry, where Parker is running", { r: 10 }),
cvzPuzzle("📐 Parker", "Parker slips at the corner. What takes him?", ["The Thing's claw", "An angle of masonry which shouldn't have been there: acute, but behaving as if it were obtuse", "The sea"], 1, ["It was not near him.", "", "Not the sea."], { yes: "📐 " + cvbQ("Parker slipped as the other three were plunging frenziedly over endless vistas of green-crusted rock to the boat, and Johansen swears he was swallowed up by an angle of masonry which shouldn't have been there; an angle which was acute, but behaved as if it were obtuse.") }),
cvzGo("rlAngles", "Down, down, among the angles", { r: 12 }),
cvzGo("rlBlocks", "Over the titan blocks", { r: 12 }),
cvzGo("rlBoat", "To the boat at the mud-bank", { r: 6 }),
cvzId("edgewater", cvzRead("🚣 Two", cvbQs("So only Briden and Johansen reached the boat, and pulled desperately for the Alert as the mountainous monstrosity flopped down the slimy stones and hesitated floundering at the edge of the water.") + cvSrc(cvBk(2)), "▶ Pull")),
cvzId("row", cvzTravel("🚣 To the Alert", "<p>Pull for the yacht. Do not look back.</p>", "emmaDeck", "🚣 <b>The deck of the Alert.</b>", "▶ Pull for the Alert")),
cvzRead("♨️ Steam", cvbQs("Steam had not been suffered to go down entirely, despite the departure of all hands for the shore; and it was the work of only a few moments of feverish rushing up and down between wheels and engines to get the Alert under way.") + cvSrc(cvBk(2)), "▶ Below!"),
cvzTravel("♨️ The engine room", "<p>Down the ladder to the engines.</p>", CVSI("engine", 0, 1.6), "♨️ <b>The engine room.</b>", "▶ Down"),
cvzFind("spade", CVSI("engine", -1.2, 1.8), "The stoking shovel", "Take up the shovel"),
cvzHold(CVSI("engine", -2, 1.6), 10, "Stoke the furnace; watch the gauges climb", { r: 2 }),
cvzTravel("⬆️ The wheel", "<p>Back up to the wheel.</p>", "emmaWheel", "⬆️ <b>The wheel.</b>", "▶ Up"),
cvzReadA("🪐 Polypheme", cvbQs("whilst on the masonry of that charnel shore that was not of earth the titan Thing from the stars slavered and gibbered like Polypheme cursing the fleeing ship of Odysseus. Then, bolder than the storied Cyclops, great Cthulhu slid greasily into the water and began to pursue with vast wave-raising strokes of cosmic potency.") + cvSrc(cvBk(2)), cvbQs("Then, bolder than the storied Cyclops, great Cthulhu slid greasily into the water and began to pursue with vast wave-raising strokes of cosmic potency.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzHold("emmaWheel", 8, "Look astern. It is coming", { r: 5 }),
cvzTalk("William Briden", "Briden, at the rail", ["😂 Briden", cvbQs("Briden looked back and went mad, laughing shrilly as he kept on laughing at intervals till death found him one night in the cabin whilst Johansen was wandering deliriously.") + cvSrc(cvBk(2)), "▶ Go on"]),
cvzPuzzle("⚙️ A desperate chance", "It will overtake you before steam is fully up. What does Johansen do?", ["Abandons ship", "Sets the engine for full speed, runs on deck, and reverses the wheel: to drive the yacht head on at It", "Hides below"], 1, ["There is nowhere to go.", "", "He does not hide."], { yes: "⚙️ " + cvbQ("Knowing that the Thing could surely overtake the Alert until steam was fully up, he resolved on a desperate chance; and, setting the engine for full speed, ran lightning-like on deck and reversed the wheel.") }),
cvzId("reverse", cvzHold("emmaWheel", 10, "Hold the wheel hard over with Johansen as she comes round, head on", { r: 4 })),
cvzRead("🌊 The demon galleon", cvbQs("There was a mighty eddying and foaming in the noisome brine, and as the steam mounted higher and higher the brave Norwegian drove his vessel head on against the pursuing jelly which rose above the unclean froth like the stern of a demon galleon.") + cvSrc(cvBk(2)), "▶ Drive on"),
cvzGo("emmaBow", "Forward to the bow: the squid-head is coming nearly up to the bowsprit", { r: 5 }),
cvzId("ram", cvzReadA("💥 The ram", cvbQs("There was a bursting as of an exploding bladder, a slushy nastiness as of a cloven sunfish, a stench as of a thousand opened graves, and a sound that the chronicler would not put on paper.") + cvSrc(cvBk(2)), "<p>The yacht drives straight into it. There is a burst, a stench, and a sound Johansen would not write down.</p>" + cvSrc(cvBk(2)), "▶ Go on")),
cvzHold("emmaWheel", 8, "Look astern again, as the Alert gathers way", { r: 5 }),
cvzRead("🫧 Recombining", cvbQs("and then there was only a venomous seething astern; where--God in heaven!--the scattered plasticity of that nameless sky-spawn was nebulously recombining in its hateful original form, whilst its distance widened every second as the Alert gained impetus from its mounting steam.") + cvSrc(cvBk(2)), "▶ To the next part")
] });
cvbCh({ t: "The Storm of April 2nd", txt: [2, 43, 46], start: "emmaWheel", jump: 1, tune: "end", keep: ["tinbox", "Thurston's tin box", "📦"],
state: { env: function () { if (CVW.sc !== "sea")
return null; return cvbStepAt("storm") && !cvbStepAt("rescue") ? "dream" : "sea"; }, alertOurs: true, storm: function () { return cvbStepAt("storm") && !cvbStepAt("rescue"); }, dreamstorm: function () { return cvbStepAt("storm") && !cvbStepAt("rescue"); }, vigilant: function () { return cvbStepAt("rescue"); }, season: "spring", boxOpen: true },
words: "The Alert, alone on the sea, after the flight. Johansen does not try to navigate any more. In the cabin there is the idol, and a man who will not stop laughing.",
intro: "The deck of the Alert, drifting",
cast: [cvc("johansen", CVSI("alertcabin", -1.2, 0.4), { until: "rescue", ry: Math.PI / 2 }), cvc("briden", CVSI("alertcabin", 2.4, -0.8), { until: "briden", ry: -Math.PI / 2 }), cvc("johansen", CVD(0, 4), { from: "rescue", until: "home" }),
cvc("widow", CVOI("johansen", 0.9, -0.4), { from: "home", until: "boston" }), cvc("thurston", CVPI("boston", 0.2, -2.2), { from: "boston" })],
steps: [
{ k: "read" },
cvzRead("🫥 That was all", cvbQs("That was all. After that Johansen only brooded over the idol in the cabin and attended to a few matters of food for himself and the laughing maniac by his side.") + cvSrc(cvBk(2)), "▶ Go below"),
cvzTravel("🚪 The cabin", "<p>Below, to the cabin and the shrine.</p>", CVSI("alertcabin", 0, 2), "🚪 <b>The Alert's cabin.</b>", "▶ Go"),
cvzFind("bread", CVSI("alertcabin", 0.4, 0.2), "Ship's biscuit", "Bring food for the two of them"),
cvzTalk("Gustaf Johansen", "Johansen, by the shrine", ["🗿 Brooding", "He is sitting by the shrine with the idol in his hands. He does not look up. \"The reaction,\" he says at last, \"has taken something out of my soul.\"", "▶ Go on"]),
cvzId("briden", cvzReadA("🕯️ Briden", cvbQs("From that time till his rescue on the 12th, the man remembers little, and he does not even recall when William Briden, his companion, died.") + cvSrc(cvBk(2)), "<p>Some time in the days that follow, Briden dies. Johansen does not know when.</p>" + cvSrc(cvBk(2)), "▶ Go on")),
cvzId("storm", cvzTravel("⛈️ April 2nd", cvbQs("Then came the storm of April 2nd, and a gathering of the clouds about his consciousness.") + cvSrc(cvBk(2)), "emmaDeck", "⛈️ <b>The storm of April 2nd.</b>", "▶ Up on deck")),
cvzRead("🌌 Spectral whirling", cvbQs("There is a sense of spectral whirling through liquid gulfs of infinity, of dizzying rides through reeling universes on a comet's tail, and of hysterical plunges from the pit to the moon and from the moon back again to the pit,") + "<p>Over the storm the sky has become the Void's: its stars, its islands adrift, and far off the Lamplighter's lamp. This is where the dream of R'lyeh comes from, and where it goes back.</p>" + cvSrc(cvBk(2)), "▶ Go on"),
cvzHold("emmaDeck", 12, "Hold on in the storm under the Void's sky until it passes", { r: 6 }),
cvzPuzzle("☀️ In Providence", "On this same day, April 2nd, at about three in the afternoon, what happens in Waterman Street, Providence?", ["Wilcox sits up in bed, well, remembering nothing", "Professor Angell dies", "Nothing"], 0, ["", "He dies much later, in 1926.", "Something does."], { yes: "☀️ " + cvbQ("On April 2nd at about 3 p. m. every trace of Wilcox's malady suddenly ceased.") }),
cvzId("rescue", cvzRead("🚢 Rescue", cvbQs("Out of that dream came rescue--the Vigilant, the vice-admiralty court, the streets of Dunedin, and the long voyage back home to the old house by the Egeberg.") + cvSrc(cvBk(2)), "▶ Go on")),
cvzHold("emmaBow", 8, "Watch the Vigilant come up, a freighter out of Valparaiso, and her boat put out for you", { r: 6 }),
cvzPuzzle("🤐 Why he wrote it in English", "Why will Johansen write it all down in English, and call it technical matters?", ["To sell it", "So his wife will not read it", "For the court"], 1, ["Never.", "", "The court heard little."], { yes: "🤐 " + cvbQ("He could not tell--they would think him mad. He would write of what he knew before death came, but his wife must not guess.") }),
cvzId("home", cvzTravel("🏠 The old house by the Egeberg", "<p>Oslo. The parlour where he wrote it, and where she gave it to Thurston.</p>", CVOI("johansen", 0, 2.4), "🏠 <b>The Johansens' parlour, Oslo.</b>", "▶ Go")),
cvzTalk("Mrs. Johansen", "Mrs. Johansen", ["🖤 Technical matters", "\"He wrote and wrote,\" she says. \"In English. He said it was technical matters. He would not let me read it. I did not want to.\"", "▶ Go on"]),
cvzId("boston", cvzTravel("📦 Boston", "<p>Thurston's quarters in Boston. The tin box on the desk, open.</p>", CVPI("boston", 0, 2), "📦 <b>Boston.</b>", "▶ Go")),
cvzFind("book", CVPI("boston", 0.4, -1.0), "Johansen's manuscript", "Take up Johansen's manuscript from the desk"),
cvzFind("letter", CVPI("boston", -1.0, -1.6), "Thurston's own record", "And Thurston's own record, the pages he has written"),
cvzGo(CVPI("boston", -0.6, -0.6), "Lay them in the tin box, beside the bas-relief and the professor's papers", { r: 1.4 }),
cvzRead("📦 The tin box", cvbQs("That was the document I read, and now I have placed it in the tin box beside the bas-relief and the papers of Professor Angell. With it shall go this record of mine--this test of my own sanity, wherein is pieced together that which I hope may never be pieced together again.") + cvSrc(cvBk(2)), "▶ Go on"),
cvzTalk("Francis Wayland Thurston", "Thurston, closing the box", ["🕯️ I know too much", cvbQs("But I do not think my life will be long. As my uncle went, as poor Johansen went, so I shall go. I know too much, and the cult still lives.") + cvSrc(cvBk(2)), "▶ Go on"]),
cvzPuzzle("🌊 The city", "Where is R'lyeh now?", ["Still above the sea, for any ship to find", "Sunken once more: the Vigilant sailed over the spot after the April storm", "Nobody knows"], 1, ["No.", "", "Thurston knows."], { yes: "🌊 " + cvbQ("His accursed city is sunken once more, for the Vigilant sailed over the spot after the April storm;") }),
cvzRead("🐙 Waits and dreams", cvbQs("Who knows the end? What has risen may sink, and what has sunk may rise. Loathsomeness waits and dreams in the deep, and decay spreads over the tottering cities of men.") + cvSrc(cvBk(2)), "▶ Shut the box")
] });
(function () {
function go() { try {
worldCard(null);
if (typeof CT !== "undefined" && CT.run && typeof ctStop === "function")
ctStop(null);
}
catch (e) { } cvbOpenIn(); }
if (typeof ctsEnter === "function") {
var e0 = ctsEnter;
ctsEnter = function (id) { if (id === "cthulhu") {
go();
return;
} return e0.apply(this, arguments); };
}
if (typeof ctStart === "function") {
var s0 = ctStart;
ctStart = function (id) { if (id === "cthulhu") {
go();
return;
} return s0.apply(this, arguments); };
}
})();
function cvbOpenIn() { if (WLD.on === CVW_KEY) {
cvbOpen();
return;
} cvwEnter({ fromName: "the Void" }); }
function cvbBackToVoid() { if (typeof worldHome === "function")
worldHome("🌑 <b>The Void.</b> You wake before the carved stone. The Lamplighter's light is still burning."); }
function cvRlFar(o) { return __ZC(526, 168, this, arguments, new.target); }
(function () {
if (typeof DKW_SCN === "undefined" || !DKW_SCN.void)
return;
var b0 = DKW_SCN.void.build;
DKW_SCN.void.build = function (G) {
b0.apply(this, arguments);
try {
var lite = typeof dkwLite === "function" && dkwLite(), R = wRand(4848);
var far = cvRlFar({ lite: lite, s: 1.2 });
far.position.set(20, -70, -760);
far.rotation.y = 0.3;
G.add(far);
var carve = cvwMat("rlcarve"), st = cvwMat("rlstone");
for (var i = 0; i < (lite ? 3 : 7); i++) {
var a = -1.2 + R() * 2.4, r = 120 + R() * 160, w = 6 + R() * 10, h = 4 + R() * 8, d = 5 + R() * 8;
var bl = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [st, st, cvwMat("ooze"), st, carve, carve]);
bl.position.set(Math.sin(a) * r, 10 + R() * 50, -Math.cos(a) * r - 60);
bl.rotation.set((R() - 0.5) * 0.5, R() * 6, (R() - 0.5) * 0.5);
G.add(bl);
bl.userData.kind = "float";
bl.userData.y0 = bl.position.y;
bl.userData.amp = 2.5;
bl.userData.f = 0.05;
bl.userData.ph = R() * 6;
if (typeof DKW !== "undefined" && DKW.bob)
DKW.bob.push(bl);
}
var n = lite ? 60 : 180, pos = new Float32Array(n * 3);
for (var m = 0; m < n; m++) {
pos[m * 3] = (R() - 0.5) * 400;
pos[m * 3 + 1] = -20 + R() * 90;
pos[m * 3 + 2] = -60 - R() * 400;
}
var gg = new THREE.BufferGeometry();
gg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var pm = new THREE.PointsMaterial({ color: CV_LOOK.glow, size: lite ? 2.2 : 1.6, sizeAttenuation: false, transparent: true, opacity: 0.5, depthWrite: false });
var pts = new THREE.Points(gg, pm);
pts.frustumCulled = false;
G.add(pts);
}
catch (e) {
if (window.console)
console.warn("[cthulhu-void] drakkyn void", e);
}
};
})();
(function () {
if (typeof LD_SETS === "undefined" || !LD_SETS.void)
return;
var v0 = LD_SETS.void;
LD_SETS.void = function (P) {
v0(P);
var L = "the Void", SX = -40, SZ = -150;
(P.items || []).forEach(function (it) { if (it.t === "path" && it.col === 0x5A5A8A)
it.col = 0x262C30; });
P.make(7, -20, 0, 0.1, function (g, o) { cvwVoidFlags(g, o, [[0, 6], [0, -60], [30, -110]], 7, -20); });
P.path([[0, -60], [-14, -100], [SX + 4, SZ + 12]], 2.5, 0x3A4A44);
P.make(SX, SZ, 0.25, 5, function (g) { cvwVoidStone(g); }, { hw: 2.2, hd: 1.4, h: 4.6 });
P.fact(SX, SZ + 3, 3.6, "The carved stone that sends strange dreams", "dream", { cthulhu: 1 });
[[-22, -170, 0.5, 1], [-60, -176, 1.4, 1.3], [-70, -136, 2.2, 0.9], [-16, -128, 3.1, 0.8], [-52, -196, 0.2, 1.6]].forEach(function (b, i) { P.make(b[0], b[1], b[2], 2.5 * b[3], function (g) { cvwVoidBlock(g, b[3], i); }, { r: 1.6 * b[3], h: 2.4 * b[3] }); });
P.make(-20, -245, 0.4, 4, function (g) { var f = cvRlFar({ lite: P.lite, s: 0.5, fog: true, seed: 5151 }); f.position.y = -6; g.add(f); });
P.make(3.6, 1, -0.5, 2, function (g) { g.scale.setScalar(1.35); cvwVoidWaymark(g); }, { r: 1.1, h: 4 });
P.make(-4.5, -3, 0.9, 2.2, function (g) { cvwVoidBlock(g, 1.0, 5); }, { r: 1.5, h: 2 });
P.make(7, -9, 2.0, 2, function (g) { cvwVoidBlock(g, 0.8, 2); }, { r: 1.2, h: 1.8 });
P.make(-9, -16, 0.4, 2, function (g) { cvwVoidBlock(g, 1.3, 3); }, { r: 1.8, h: 2.4 });
var segs = [[[0, 6], [0, -60]], [[0, -60], [30, -110]], [[0, -60], [-14, -100]], [[-14, -100], [SX + 4, SZ + 12]]], spots = [];
segs.forEach(function (sg, si) { var a = sg[0], b = sg[1], L2 = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L2, uz = (b[1] - a[1]) / L2; for (var d = si === 0 ? 20 : 8; d < L2 - 4; d += P.lite ? 18 : 9) {
var side = ((d / 9 | 0) + si) % 2 ? 1 : -1, off = 4.6 + ((d * 7 + si * 3) % 5) * 0.5;
spots.push([a[0] + ux * d - uz * side * off, a[1] + uz * d + ux * side * off, (d * 13 + si) % 7, side]);
} });
spots.forEach(function (q, i) {
var ry = q[2] * 0.9;
if (i % 3 === 1)
P.make(q[0], q[1], ry, 1.4, function (g) { cvwVoidGlyphStone(g, i); }, { r: 0.8, h: 1.6 });
else
P.make(q[0], q[1], ry, 1.6, function (g) { cvwVoidPillar(g, i); }, { r: 0.9, h: i % 2 ? 5 : 2.6 });
});
P.make(4, -50, 0, 70, function (g) { cvwVoidMotes(g, P.lite); });
if (typeof REALMS !== "undefined" && REALMS.void && !REALMS.void.cvLift) {
REALMS.void.cvLift = 1;
REALMS.void.amb = 0.68;
REALMS.void.light = 0xA8B4D8;
}
[-1, 1].forEach(function (s) { P.make(s * 2.9, -6, s * 0.08, 1.2, function (g) { cvwVoidGatePost(g, s); }, { r: 0.8, h: 6 }); });
P.make(0, -6, 0, 4, function (g) { cvwVoidGateTop(g); });
[[-7.4, -22, 0.12, 7, 1.9], [7.8, -27, -0.1, 8, 1.4], [-8.2, -38, -0.18, 6, 2.4], [8.6, -44, 0.2, 5, 1.1], [-7.6, -52, 0.08, 7, 1.6]].forEach(function (w, i) { if (P.lite && i % 2)
return; P.make(w[0], w[1], w[2], w[3] / 2 + 0.5, function (g) { cvwVoidWall(g, w[3], w[4], i); }, { hw: w[3] / 2, hd: 0.5, h: w[4] }); });
P.make(-12.5, -30, 0.5, 3, function (g) { cvwVoidStair(g); }, { hw: 2, hd: 2.4, h: 2.4 });
[[-3.6, 3.5, 0.4], [5.6, -3.4, -0.5], [-5.8, -10, 0.9], [4.6, -14, -0.8], [-4.4, -19, 0.2], [5.2, -21, -0.3]].forEach(function (q, i) { if (P.lite && i % 2)
return; P.make(q[0], q[1], q[2], 1.4, function (g) { cvwVoidGlyphStone(g, 20 + i); }, { r: 0.8, h: 1.6 }); });
P.make(0, -26, 0, 40, function (g) { cvwVoidPlants(g, P.lite); });
P.make(0, -8, 0, 20, function (g) { cvwVoidMotes(g, P.lite, 1); });
P.person("cvdreamer1", SX + 5, SZ + 6, -2.4, { sex: "m", look: { top: 0x5A4A3A, topKind: "coat", bottom: 0x2A2A2A, shoes: 0x1A1A1A, skin: 0xE0C0A0, hair: 0x1A1410, hairStyle: "short" } }, ldWho("Henry, a dreamer from Providence", L, "a thin, dark young sculptor from Providence who falls asleep beside the carved stone and dreams of a city of titan blocks; dreamy, poetic, never unkind, and never frightening younger players", "It is new, the stone. I made it last night, in a dream. Or it made me. Put your hand on it, and you'll see the city too."));
P.person("cvdreamer2", SX - 6, SZ + 5, 2.2, { sex: "m", look: { top: 0x2A3A5A, topKind: "jumper", bottom: 0x2A2A3A, shoes: 0x1A1A1A, skin: 0xE8C8A8, hair: 0xE8E0C8, hairStyle: "short", hat: "cap", hatColor: 0x1A1A2A } }, ldWho("Gustaf, an old sailor", L, "a quiet Norwegian sailor, white-haired, who once saw a city rise out of the sea and now dreams of it by the carved stone; he speaks in few words and keeps it suitable for all ages", "I was second mate once. Of a schooner, the Emma. The stone knows the place. Don't go in alone. Or go: but come back."), { r: 5 });
P.person("cvdreamer3", SX + 8, SZ - 2, -1.4, { sex: "f", look: { top: 0x3A2A4A, topKind: "dress", bottom: 0x3A2A4A, shoes: 0x1A1A1A, skin: 0xD8B898, hair: 0x6A4A2A, hairStyle: "bun" } }, ldWho("Ada, a scholar of inscriptions", L, "a scholar of ancient inscriptions who sits by the carved stone copying its writing into a notebook; precise, curious, kind, and careful with younger players", "Look at the writing. No language on earth. And yet I've seen it before, in an old professor's papers from Providence."));
};
})();
function cvwVoidStone(g) { return __ZC(526, 169, this, arguments, new.target); }
function cvwVoidBlock(g, s, i) { return __ZC(526, 170, this, arguments, new.target); }
function cvwVoidWaymark(g) { return __ZC(526, 171, this, arguments, new.target); }
function cvwVoidFlags(g, o, pts, ox, oz) { return __ZC(526, 172, this, arguments, new.target); }
if (typeof ldUse === "function")
(function () { var lu = ldUse; ldUse = function (T) { if (T && T.card && T.card.cthulhu) {
if (typeof LD !== "undefined") {
LD.near = null;
if (LD.prompted && typeof worldPrompt === "function") {
worldPrompt(null);
LD.prompted = false;
}
}
cvbOpenIn();
return;
} return lu.apply(this, arguments); }; })();
function cvwVoidPillar(g, i) { return __ZC(526, 173, this, arguments, new.target); }
function cvwLiteN(a, b) { return cvwLite() ? a : b; }
function cvwVoidGlyphM() { return __ZC(526, 174, this, arguments, new.target); }
function cvwVoidGlyphStone(g, i) { return __ZC(526, 175, this, arguments, new.target); }
function cvwVoidPool(g, x, z, r, op) { return __ZC(526, 176, this, arguments, new.target); }
function cvwVoidMotes(g, lite, near) { return __ZC(526, 177, this, arguments, new.target); }
function cvwVoidGatePost(g, s) { return __ZC(526, 178, this, arguments, new.target); }
function cvwVoidGateTop(g) { return __ZC(526, 179, this, arguments, new.target); }
function cvwVoidWall(g, w, h, i) { return __ZC(526, 180, this, arguments, new.target); }
function cvwVoidStair(g) { return __ZC(526, 181, this, arguments, new.target); }
function cvwVoidPlants(g, lite) { return __ZC(526, 182, this, arguments, new.target); }
