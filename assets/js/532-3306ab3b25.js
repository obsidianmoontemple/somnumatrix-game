/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GH = { lite: false, fairies: [], dust: null, bulbs: [], env: null, envDone: false, gilt: [], water: [], seatAt: 0, t: 0 };
var GH_OPEN = { x0: 3536, x1: 3790, z0: -130, z1: 100 };
function ghLite() { return typeof LITE !== "undefined" && !!LITE; }
function ghIsOpen(x, z) { return x >= GH_OPEN.x0 && x <= GH_OPEN.x1 && z >= GH_OPEN.z0 && z <= GH_OPEN.z1; }
GH.tex = {};
function ghCanvas(N, M) { var c = document.createElement("canvas"); c.width = N; c.height = M || N; return c; }
function ghTexOf(kind, fn, N, M, noRep) {
if (GH.tex[kind])
return GH.tex[kind];
var c = ghCanvas(N || 512, M), x = c.getContext("2d");
fn(x, c.width, c.height, ppRand(ppHash("gh-" + kind)));
var t = new THREE.CanvasTexture(c);
if (!noRep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
}
t.anisotropy = ghLite() ? 2 : 8;
GH.tex[kind] = t;
return t;
}
function ghSpeck(x, W, H, r, n, cols, a0, a1, s0, s1) { for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + cols[(r() * cols.length) | 0] + "," + (a0 + r() * (a1 - a0)).toFixed(3) + ")";
var s = s0 + r() * (s1 - s0);
x.fillRect(r() * W, r() * H, s, s);
} }
var GH_TEX = {
gilt: function () { return __ZC(532, 0, this, arguments, new.target); },
panel: function () { return __ZC(532, 1, this, arguments, new.target); },
damask: function () { return __ZC(532, 2, this, arguments, new.target); },
parquet: function () { return __ZC(532, 3, this, arguments, new.target); },
checker: function () { return __ZC(532, 4, this, arguments, new.target); },
coffer: function () { return __ZC(532, 5, this, arguments, new.target); },
dome: function () { return __ZC(532, 6, this, arguments, new.target); },
curtain: function () { return __ZC(532, 7, this, arguments, new.target); },
backdrop: function () { return __ZC(532, 8, this, arguments, new.target); },
hedge: function () { return __ZC(532, 9, this, arguments, new.target); },
grass: function () { return __ZC(532, 10, this, arguments, new.target); },
gravel: function () { return __ZC(532, 11, this, arguments, new.target); },
stone: function () { return __ZC(532, 12, this, arguments, new.target); },
velvet: function () {
return ghTexOf("velvet", function (x, W, H, r) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#A01C2C");
g.addColorStop(0.5, "#7A1020");
g.addColorStop(1, "#5A0A16");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
ghSpeck(x, W, H, r, 1500, ["200,60,80", "40,0,8"], 0.08, 0.2, 1, 2);
}, 128);
},
wing: function () { return __ZC(532, 13, this, arguments, new.target); },
pool: function () {
return ghTexOf("pool", function (x, W, H) {
var g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
g.addColorStop(0, "rgba(255,214,150,.55)");
g.addColorStop(0.4, "rgba(255,190,110,.22)");
g.addColorStop(1, "rgba(255,170,90,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
}, 128, 128, true);
}
};
GH.mats = {};
function ghMat(key, make) { return GH.mats[key] || (GH.mats[key] = make()); }
function ghLam(key, col, map, o) { return __ZC(532, 14, this, arguments, new.target); }
function ghGold() { return ghLam("gold", 0xFFE2A0, GH_TEX.gilt(), { e: 0x3A2606, shine: 0.34 }); }
function ghGoldDark() { return ghLam("golddk", 0xC8A060, GH_TEX.gilt(), { e: 0x221404, shine: 0.22 }); }
function ghMirrorTex() { return __ZC(532, 15, this, arguments, new.target); }
function ghMirror() { return ghLam("mirror", 0xFFFFFF, ghMirrorTex(), { e: 0x14100A, shine: 0.88 }); }
function ghBasic(key, col, o) { o = o || {}; return ghMat(key, function () { var m = new THREE.MeshBasicMaterial({ color: col, map: o.map || null, fog: o.fog !== false }); if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
} if (o.add)
m.blending = THREE.AdditiveBlending; if (o.ds)
m.side = THREE.DoubleSide; return m; }); }
function ghPlane(G, w, h, u, v, mat, x, y, z, ry, rx) {
var g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * w / u, uv.getY(i) * h / v);
var m = wMesh(g, mat, x, y, z, G);
if (rx)
m.rotation.x = rx;
if (ry)
m.rotation.y = ry;
return m;
}
function ghFloor(G, x0, x1, z0, z1, mat, u, y) { return ghPlane(G, x1 - x0, z1 - z0, u || 2, u || 2, mat, (x0 + x1) / 2, (y || 0) + 0.012, (z0 + z1) / 2, 0, -Math.PI / 2); }
function ghCeil(G, x0, x1, z0, z1, h, mat, u) { return ghPlane(G, x1 - x0, z1 - z0, u || 3, u || 3, mat, (x0 + x1) / 2, h, (z0 + z1) / 2, 0, Math.PI / 2); }
function ghBox(G, w, h, d, mat, x, y, z, u, ry) { return __ZC(532, 16, this, arguments, new.target); }
function ghWalls(G, x0, x1, z0, z1, h, mat, gaps, u, v, noSolid) { return __ZC(532, 17, this, arguments, new.target); }
function ghDoorFrame(G, x, z, alongX, w, h) { return __ZC(532, 18, this, arguments, new.target); }
function ghSph0(G, r, m, x, y, z) { return wSph(r, m, x, y, z, G, 10); }
function ghColumn(G, x, z, h, r, shaft, y0) {
y0 = y0 || 0;
var g = ghGold();
ghBox(G, r * 2.6, 0.4, r * 2.6, shaft, x, y0 + 0.2, z);
wCyl(r * 1.15, r * 1.3, 0.35, g, x, y0 + 0.55, z, G, 16);
wCyl(r * 0.9, r, h - 1.4, shaft, x, y0 + 0.7 + (h - 1.4) / 2, z, G, ghLite() ? 10 : 18);
wCyl(r * 1.35, r * 0.9, 0.5, g, x, y0 + h - 0.45, z, G, 16);
ghBox(G, r * 2.8, 0.25, r * 2.8, g, x, y0 + h - 0.1, z);
}
function ghPool(G, x, z, s, y, op) { var m = ghPlane(G, s, s, s, s, ghBasic("pool" + (op || 1), 0xFFFFFF, { map: GH_TEX.pool(), op: op || 0.85, add: true }), x, (y || 0) + 0.03, z, 0, -Math.PI / 2); m.userData.keep = 1; m.renderOrder = 2; return m; }
var GH_GOWNS = [0x8A1A2A, 0x1A2A6A, 0x0E4A3A, 0xE8D8B8, 0x5A1A5A, 0xC8A040, 0x101014, 0xD86A8A, 0x2A6A8A, 0xF0E8E0];
function ghGuest(seed, i, o) { return __ZC(532, 19, this, arguments, new.target); }
(function () {
if (typeof PP === "undefined" || typeof PP_ZONES === "undefined")
return;
PP_ZONES.hall.x0 = 3330;
PP_ZONES.hall.x1 = 3790;
PP_ZONES.hall.z0 = -130;
PP_ZONES.hall.z1 = 100;
PP_DOORS.hall.in = [3500, 60, 0];
ppHallInside = function (G) { ghInside(G); };
ppHallOutside = function (G, L) { ghOutside(G, L); };
var env0 = ppEnv;
ppEnv = function () {
var E = env0.apply(this, arguments);
if (PP.zone === "hall" && typeof WLD !== "undefined" && WLD.on === "party") {
var L = worldLocal();
if (ghIsOpen(L.x, L.z))
return { top: 0x120838, low: 0x3A1E52, fog: 0x1E1230, fogD: 0.0035, sun: 0.42, sunCol: 0xD8D0FF, sunDir: [-0.4, 0.7, -0.5], hemi: 0.82, hemiCol: 0xE8DCFF, hemiGround: 0x2A2A3A, stars: 0 };
return Object.assign({}, E, { fog: 0x2A1C0C, fogD: 0.0022, hemi: 1.0, hemiCol: 0xFFE6C4, hemiGround: 0x5A3A20, sun: 0.35, sunCol: 0xFFE0B0 });
}
return E;
};
var in0 = ppGoIn;
ppGoIn = function (k) {
if (k !== "hall")
return in0.apply(this, arguments);
if (typeof playTone === "function") {
playTone(523, 0.18);
setTimeout(function () { playTone(659, 0.18); }, 180);
setTimeout(function () { playTone(784, 0.3); }, 360);
}
ppPut(PP_DOORS.hall.in[0], PP_DOORS.hall.in[1], PP_DOORS.hall.in[2]);
setStatus("<b>The Gilded Hall.</b> Gold and candlelight. The Opera House is through the doors on your left, the Grand Ballroom straight ahead (and the garden through its glass doors), the Banquet Hall beyond it. The stair climbs to the gallery and the Grand Tier. Back takes you outside.");
};
if (typeof arafClass === "function") {
var ac0 = arafClass;
arafClass = function (spec, L, kid, fo) {
var id = String(spec && (spec.id || spec.name) || "");
if (!kid && /^w_gh_/.test(id) && !/server|usher|steward|keeper|conductor|musician/i.test(String(spec.title || spec.role || ""))) {
var f = L && L.sex !== "m";
return f ? ((ppHash(id) % 3 === 2) ? "goddess" : "gown") : "suit";
}
return ac0.apply(this, arguments);
};
}
var pe0 = ppPeople;
ppPeople = function () {
pe0.apply(this, arguments);
PP.people = PP.people.filter(function (p) { if (p.zone === "hall" && GH.people.indexOf(p) < 0) {
if (p.g && p.g.parent)
p.g.parent.remove(p.g);
return false;
} return true; });
(GH.people || []).forEach(function (p) { PP.people.push(p); });
(GH.players || []).forEach(function (p) { PP.players.push(p); });
(GH.dancers || []).forEach(function (d) { d.bpm = typeof ppBpmAt === "function" ? ppBpmAt("hall", d.lx, d.lz) : 90; PP.dancers.push(d); });
};
var bl0 = ppBlocked;
ppBlocked = function (x, z, feet) { var L = worldLocal(), far = Math.abs(L.x - x) > 3 || Math.abs(L.z - z) > 3, said = PP.gateSaid; if (far)
PP.gateSaid = Date.now(); var r = bl0.apply(this, arguments); if (far)
PP.gateSaid = said; return r; };
var tick0 = ppTick;
ppTick = function (dt) { tick0.apply(this, arguments); try {
ghTick(dt);
}
catch (e) {
if (!GH.err) {
GH.err = 1;
console.warn("gilded hall", e);
}
} };
PP_MENU.gala = [["pp_gala_champ", "Glass of champagne", 14, 0, 25, 1], ["pp_gala_kir", "Kir royale", 12, 0, 25, 1], ["pp_gala_elder", "Sparkling elderflower (no alcohol)", 6, 0, 30, 0],
["pp_gala_tea", "Pot of tea and petits fours", 6, 20, 20, 0], ["pp_gala_canape", "Canapés from the silver tray", 8, 30, 0, 0], ["pp_gala_supper", "Supper at the round tables: three courses", 24, 70, 10, 0],
["pp_gala_ice", "Rose and pistachio ice cream", 5, 20, 5, 0]];
PP_PLACES.hall.name = "The Gilded Hall: opera, ballroom, banquet and the fairy garden";
})();
function ghWinTex() { return __ZC(532, 20, this, arguments, new.target); }
function ghArchGeo(w, h) {
var g = new THREE.ShapeGeometry(ghArchShape(w, h), 12), p = g.attributes.position, uv = g.attributes.uv;
for (var i = 0; i < p.count; i++)
uv.setXY(i, (p.getX(i) + w / 2) / w, p.getY(i) / h);
uv.needsUpdate = true;
return g;
}
function ghArchShape(w, h) { var s = new THREE.Shape(), r = w / 2; s.moveTo(-r, 0); s.lineTo(-r, h - r); s.absarc(0, h - r, r, Math.PI, 0, true); s.lineTo(r, 0); s.lineTo(-r, 0); return s; }
function ghStatue(G, x, y, z, s, ry) { return __ZC(532, 21, this, arguments, new.target); }
function ghLantern(G, L, x, z, h) { return __ZC(532, 22, this, arguments, new.target); }
function ghLimeTree(G, x, z, s, seed, bulbs) { return __ZC(532, 23, this, arguments, new.target); }
var GH_LEAF = {};
function ghLeafGeo(seed, r) {
var k = Math.abs(seed | 0) % 12, u = GH_LEAF[k] || (GH_LEAF[k] = (typeof grJitter === "function" ? grJitter(new THREE.IcosahedronGeometry(1, GH.lite ? 1 : 2), 0.42, seed) : new THREE.IcosahedronGeometry(1, 1)));
var g = u.clone();
g.scale(r, 0.75 * r, r);
return g;
}
function ghOutside(G, L) { return __ZC(532, 24, this, arguments, new.target); }
function ghBulbs(G, pts, zone, col) { return __ZC(532, 25, this, arguments, new.target); }
GH.cry = [];
GH.cand = [];
function ghChandelier(G, L, x, y, z, s, hang) { return __ZC(532, 26, this, arguments, new.target); }
function ghCrystals(G) { return __ZC(532, 27, this, arguments, new.target); }
function ghChair(G, x, z, ry, y) { return __ZC(532, 28, this, arguments, new.target); }
function ghRoundTable(G, L, x, z, r, n, flames) { return __ZC(532, 29, this, arguments, new.target); }
function ghInside(G) { return __ZC(532, 30, this, arguments, new.target); }
function ghFoyer(R, L) { return __ZC(532, 31, this, arguments, new.target); }
function ghBallroom(R, L) { return __ZC(532, 32, this, arguments, new.target); }
function ghBanquet(R, L) { return __ZC(532, 33, this, arguments, new.target); }
function ghPortrait(i) { return __ZC(532, 34, this, arguments, new.target); }
function ghSideRooms(R, L) { return __ZC(532, 35, this, arguments, new.target); }
var GH_OPERAS = [
["La traviata", "Giuseppe Verdi, 1853", "Violetta's party in Paris, the drinking song, and a love that costs her everything."],
["The Magic Flute", "Wolfgang Amadeus Mozart, 1791", "Tamino, the enchanted flute, Papageno the bird-catcher and the Queen of the Night's high Fs."],
["Carmen", "Georges Bizet, 1875", "Seville, the cigarette girls, the Toreador Song and a rose thrown at a soldier's feet."],
["La bohème", "Giacomo Puccini, 1896", "Four friends in a Paris garret, a lost key in the dark, and 'Your tiny hand is frozen'."],
["The Marriage of Figaro", "Wolfgang Amadeus Mozart, 1786", "One mad day in the Count's house, a wedding, and a garden full of mistaken lovers by night."],
["Die Fledermaus", "Johann Strauss II, 1874", "Prince Orlofsky's masked ball, champagne in every song, and a waltz to end the night."],
["Roméo et Juliette", "Charles Gounod, 1867", "A masked ball in Verona, the balcony by moonlight, and Juliet's waltz song."]
];
function ghOperaTonight() { return GH_OPERAS[new Date().getDay()]; }
function ghOperaCard() { return __ZC(532, 36, this, arguments, new.target); }
function ghSeatGeo() { return __ZC(532, 37, this, arguments, new.target); }
function ghOpera(R, L) { return __ZC(532, 38, this, arguments, new.target); }
function ghWaterTex() { return __ZC(532, 39, this, arguments, new.target); }
function ghRoses(G, x0, x1, z0, z1, n, seed) { return __ZC(532, 40, this, arguments, new.target); }
function ghBench(G, x, z, ry) { return __ZC(532, 41, this, arguments, new.target); }
function ghString(pts, a, b, sag, step) {
var L = Math.hypot(b[0] - a[0], b[2] - a[2]), n = Math.max(2, Math.round(L / (step || 0.5)));
for (var i = 0; i <= n; i++) {
var f = i / n;
pts.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f - Math.sin(f * Math.PI) * sag, a[2] + (b[2] - a[2]) * f]);
}
}
function ghMarbleStatue(G, x, z, ry, seed) { return __ZC(532, 42, this, arguments, new.target); }
function ghGarden(R, L) { return __ZC(532, 43, this, arguments, new.target); }
function ghGazebo(R, L, x, z, bulbs) { return __ZC(532, 44, this, arguments, new.target); }
function ghOak(R, x, z, bulbs) { return __ZC(532, 45, this, arguments, new.target); }
function ghBackdropTrees(R) { return __ZC(532, 46, this, arguments, new.target); }
function ghWish(where) { return __ZC(532, 47, this, arguments, new.target); }
var GH_MAZE = { x0: 3640, z0: -50, n: 25, c: 4 };
function ghMazeCells() { return __ZC(532, 48, this, arguments, new.target); }
function ghLabyrinth(R, L) { return __ZC(532, 49, this, arguments, new.target); }
function ghHeart(R, L) { return __ZC(532, 50, this, arguments, new.target); }
function ghSky(L) { return __ZC(532, 51, this, arguments, new.target); }
function ghSparkTex() { return __ZC(532, 52, this, arguments, new.target); }
var GH_FAIRY_COLS = [0xFFE6A8, 0xF8C8F0, 0xC8E8FF, 0xD8FFD0, 0xFFD0B0];
function ghFairies(L) { return __ZC(532, 53, this, arguments, new.target); }
function ghDustSpawn(p, x, y, z, burst) {
p.x = x + (Math.random() - 0.5) * 0.2;
p.y = y;
p.z = z + (Math.random() - 0.5) * 0.2;
p.age = 0;
p.life = burst ? 2.5 + Math.random() * 3 : 3 + Math.random() * 4;
p.vx = (Math.random() - 0.5) * (burst ? 0.9 : 0.12);
p.vy = burst ? 0.3 + Math.random() * 0.9 : -(0.12 + Math.random() * 0.25);
p.vz = (Math.random() - 0.5) * (burst ? 0.9 : 0.12);
}
function ghTick(dt) { return __ZC(532, 54, this, arguments, new.target); }
function ghReflect() { return __ZC(532, 55, this, arguments, new.target); }
