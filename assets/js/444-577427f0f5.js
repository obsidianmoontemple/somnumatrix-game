/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var ILF = { on: true, geo: {}, mat: {}, tex: {}, n: 0 };
function ilfLite() { return typeof LITE !== "undefined" && !!LITE; }
function ilfHash(s) { s = String(s); var h = 2166136261 >>> 0; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619) >>> 0;
} return h; }
function ilfRng(seed) { var a = ilfHash(seed) || 1; return function () { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return (a % 100000) / 100000; }; }
function ilfCanvasTex(key, w, h, paint, rep) { return __ZC(444, 0, this, arguments, new.target); }
function ilfM(c, o) { return __ZC(444, 1, this, arguments, new.target); }
function ilfG(key, make) { var g = ILF.geo[key]; if (!g) {
g = make();
if (g.index)
g = g.toNonIndexed();
g.userData.shared = true;
ILF.geo[key] = g;
} return g; }
function ilfBox() { return ilfG("box", function () { return new THREE.BoxGeometry(1, 1, 1); }); }
function ilfCyl(s) { s = s || 10; return ilfG("cyl" + s, function () { return new THREE.CylinderGeometry(0.5, 0.5, 1, s); }); }
function ilfCone(s) { s = s || 10; return ilfG("cone" + s, function () { return new THREE.CylinderGeometry(0, 0.5, 1, s); }); }
function ilfTaper(r, s) { s = s || 10; return ilfG("tp" + r + "|" + s, function () { return new THREE.CylinderGeometry(0.5 * r, 0.5, 1, s); }); }
function ilfSph(s) { s = s || 10; return ilfG("sph" + s, function () { return new THREE.SphereGeometry(0.5, s, Math.max(6, s * 0.7 | 0)); }); }
function ilfHemi() { return ilfG("hemi", function () { return new THREE.SphereGeometry(0.5, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2); }); }
function ilfTor(arc, s) { s = s || 16; return ilfG("tor" + (arc || 0) + "|" + s, function () { return new THREE.TorusGeometry(0.5, 0.08, 6, s, arc || Math.PI * 2); }); }
function ilfPlane() { return ilfG("plane", function () { return new THREE.PlaneGeometry(1, 1); }); }
function ilfTurned() {
return ilfG("turned", function () {
var p = [[0.28, 0], [0.42, 0.04], [0.3, 0.1], [0.22, 0.3], [0.36, 0.48], [0.5, 0.55], [0.36, 0.62], [0.2, 0.8], [0.3, 0.9], [0.34, 0.97], [0.0, 1]];
return new THREE.LatheGeometry(p.map(function (q) { return new THREE.Vector2(q[0], q[1]); }), 8).translate(0, -0.5, 0);
});
}
function ilfLancet() {
return ilfG("lancet", function () {
var s = new THREE.Shape();
s.moveTo(-0.5, -0.5);
s.lineTo(0.5, -0.5);
s.lineTo(0.5, 0.12);
s.quadraticCurveTo(0.48, 0.38, 0, 0.5);
s.quadraticCurveTo(-0.48, 0.38, -0.5, 0.12);
s.lineTo(-0.5, -0.5);
return ilfUV01(new THREE.ShapeGeometry(s, 6));
});
}
function ilfUV01(g) { var uv = g.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) + 0.5, uv.getY(i) + 0.5); return g; }
function ilfRound() {
return ilfG("roundarch", function () {
var s = new THREE.Shape();
s.moveTo(-0.5, -0.5);
s.lineTo(0.5, -0.5);
s.lineTo(0.5, 0.0);
s.absarc(0, 0, 0.5, 0, Math.PI, false);
s.lineTo(-0.5, -0.5);
return ilfUV01(new THREE.ShapeGeometry(s, 10));
});
}
function ilfCtx(I, name, parent) { return __ZC(444, 2, this, arguments, new.target); }
function ilfMats() { return __ZC(444, 3, this, arguments, new.target); }
function ilfAshlar(mesh, o) { return __ZC(444, 4, this, arguments, new.target); }
function ilfHex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
function ilfShade(hex, f) {
var c = parseInt(hex.slice(1), 16), r = c >> 16 & 255, g = c >> 8 & 255, b = c & 255;
if (f < 0) {
r *= 1 + f;
g *= 1 + f;
b *= 1 + f;
}
else {
r += (255 - r) * f;
g += (255 - g) * f;
b += (255 - b) * f;
}
return "rgb(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + ")";
}
function ilfSpinesTex(v) { return __ZC(444, 5, this, arguments, new.target); }
function ilfRugTex(v) { return __ZC(444, 6, this, arguments, new.target); }
function ilfTapestryTex(v, col) { return __ZC(444, 7, this, arguments, new.target); }
function ilfPaintingTex(v) { return __ZC(444, 8, this, arguments, new.target); }
function ilfStainedTex(v, day) { return __ZC(444, 9, this, arguments, new.target); }
function ilfLeadedTex(day) { return __ZC(444, 10, this, arguments, new.target); }
function ilfBeamTex() { return __ZC(444, 11, this, arguments, new.target); }
function ilfChalkTex(lines, seed) { return __ZC(444, 12, this, arguments, new.target); }
function ilfPosterTex(k) { return __ZC(444, 13, this, arguments, new.target); }
function ilfBoardTex(v) { return __ZC(444, 14, this, arguments, new.target); }
function ilfChartTex(k) { return __ZC(444, 15, this, arguments, new.target); }
function ilfTexMat(t, o) { o = o || {}; o.map = t; return ilfM(o.col || 0xFFFFFF, o); }
function ilfCandle(K, x, y, z, h, r) {
var M = ilfMats();
h = h || 0.22;
r = r || 0.025;
K.cyl(r, h, M.wax, x, y, z, 8);
K.geo(ilfCone(6), M.flame, x, y + h + 0.04, z, r * 1.6, 0.08, r * 1.6);
K.sph(0.012, M.flameCore, x, y + h + 0.025, z, 1, 1.6, 1, 6);
if (!K.lite)
K.sph(0.07, M.halo, x, y + h + 0.05, z, 1, 1.3, 1, 8);
}
function ilfCandlestick(K, x, y, z, h) { var M = ilfMats(); K.cyl(0.06, 0.02, M.brass, x, y, z, 10); K.turned(0.03, (h || 0.22), M.brass, x, y + 0.02, z); K.cyl(0.04, 0.015, M.brass, x, y + 0.02 + (h || 0.22), z, 10); ilfCandle(K, x, y + 0.035 + (h || 0.22), z); }
function ilfCandelabra(K, x, y, z, arms) { return __ZC(444, 16, this, arguments, new.target); }
function ilfBookStack(K, x, y, z, n, ry) { return __ZC(444, 17, this, arguments, new.target); }
function ilfOpenBook(K, x, y, z, ry) {
var M = ilfMats();
K.box(0.36, 0.02, 0.25, M.leather, x, y, z, ry);
K.boxc(0.17, 0.018, 0.23, M.paper, x - 0.085, y + 0.035, z, ry, 0, 0.08);
K.boxc(0.17, 0.018, 0.23, M.paper, x + 0.085, y + 0.035, z, ry, 0, -0.08);
}
function ilfInkQuill(K, x, y, z) { var M = ilfMats(); K.cyl(0.025, 0.05, M.ink, x, y, z, 8); K.boxc(0.006, 0.22, 0.03, M.quill, x + 0.02, y + 0.12, z, 0.3, 0, -0.35); }
function ilfDesk(K, o) { return __ZC(444, 18, this, arguments, new.target); }
function ilfChair(K, o) { return __ZC(444, 19, this, arguments, new.target); }
function ilfBench(K, len, o) {
o = o || {};
var M = ilfMats(), wood = o.wood || M.oakD;
K.box(len, 0.06, 0.36, wood, 0, 0.42, 0);
for (var x = -len / 2 + 0.2; x <= len / 2 - 0.19; x += Math.max(0.8, (len - 0.4) / Math.ceil((len - 0.4) / 1.4)))
K.box(0.06, 0.42, 0.3, wood, x, 0, 0);
K.solid(0, 0, len / 2, 0.18, 0.48);
}
function ilfBookcase(K, o) { return __ZC(444, 20, this, arguments, new.target); }
function ilfChandelier(K, y, top, o) { return __ZC(444, 21, this, arguments, new.target); }
function ilfRug(K, w, d, v) { var m = ilfTexMat(ilfRugTex(v || 0)); K.plane(w, d, m, 0, 0.012, 0, 0, -Math.PI / 2); }
function ilfTapestry(K, w, h, y, v, col) {
var M = ilfMats();
K.plane(w, h, ilfTexMat(ilfTapestryTex(v || 0, col), { ds: false }), 0, y + h / 2, 0.03, 0);
K.cylc(0.03, w + 0.24, M.brass, 0, y + h + 0.04, 0.04, 8, 0, 0, Math.PI / 2);
K.sph(0.05, M.brass, -w / 2 - 0.13, y + h + 0.04, 0.04);
K.sph(0.05, M.brass, w / 2 + 0.13, y + h + 0.04, 0.04);
}
function ilfPainting(K, w, h, y, v) { return __ZC(444, 22, this, arguments, new.target); }
function ilfWindow(K, w, h, y, o) { return __ZC(444, 23, this, arguments, new.target); }
function ilfPlant(K, s, o) { return __ZC(444, 24, this, arguments, new.target); }
function ilfGlobe(K) { var M = ilfMats(); K.turned(0.12, 0.8, M.oakD, 0, 0, 0); K.sph(0.24, ilfTexMat(ilfChartTex("map")), 0, 1.05, 0, 1, 1, 1, 16); K.ring(0.27, 0.015, M.brass, 0, 1.05, 0, 0.4, 0); K.solid(0, 0, 0.2, 0.2, 1.2); }
function ilfCauldron(K, col) { return __ZC(444, 25, this, arguments, new.target); }
function ilfPotionShelf(K, w) { return __ZC(444, 26, this, arguments, new.target); }
function ilfCrystalBall(K, col) { var M = ilfMats(); K.turned(0.2, 0.8, M.walnut, 0, 0, 0); K.cyl(0.14, 0.06, M.brass, 0, 0.8, 0, 12); K.sph(0.13, ilfM(col || 0xB8C8FF, { glow: 1, op: 0.75 }), 0, 0.98, 0, 1, 1, 1, 14); K.solid(0, 0, 0.2, 0.2, 1.1); }
function ilfScrollRack(K, w) {
var M = ilfMats();
K.box(w, 1.6, 0.35, M.oakD, 0, 0, -0.02);
for (var y = 0.15; y < 1.5; y += 0.17)
for (var x = -w / 2 + 0.1; x < w / 2 - 0.05; x += 0.1) {
K.cylc(0.04, 0.33, (((x + y) * 13) | 0) % 3 ? M.parch : ilfM(0xD8C090), x, y + 0.05, 0.0, 8, 0, Math.PI / 2);
}
K.solid(0, 0, w / 2, 0.2, 1.6);
}
function ilfTrunk(K, col) {
var M = ilfMats();
K.box(0.9, 0.5, 0.5, col || M.leather, 0, 0, 0);
K.cylc(0.25, 0.9, col || M.leather, 0, 0.5, 0, 10, 0, 0, Math.PI / 2);
K.box(0.92, 0.04, 0.52, M.brass, 0, 0.24, 0);
K.box(0.06, 0.12, 0.02, M.brass, 0, 0.38, 0.26);
K.solid(0, 0, 0.45, 0.25, 0.75);
}
function ilfColumn(K, r, h, mat) {
var M = ilfMats();
mat = mat || M.stone;
K.box(r * 2.6, 0.3, r * 2.6, mat, 0, 0, 0);
K.cyl(r * 1.15, 0.18, mat, 0, 0.3, 0, 16);
K.cyl(r, h - 0.9, mat, 0, 0.48, 0, 16);
K.taper(r * 1.5, r, 0.3, mat, 0, h - 0.42, 0, 16);
K.box(r * 2.8, 0.14, r * 2.8, mat, 0, h - 0.14, 0);
K.solid(0, 0, r * 1.3, r * 1.3, h);
}
function ilfFlowers(K, x, y, z, o) { return __ZC(444, 27, this, arguments, new.target); }
function ilfPlace(K, x, y, z, seed) {
var M = ilfMats(), r = ilfRng("pl" + seed);
K.cyl(0.13, 0.015, M.pewter, x, y, z, 12);
K.sph(0.05, M.food[(r() * 6) | 0], x + 0.02, y + 0.03, z, 1.4, 0.6, 1.2, 6);
K.cyl(0.03, 0.01, M.gold, x + 0.18, y, z - 0.1, 8);
K.cyl(0.008, 0.08, M.gold, x + 0.18, y + 0.01, z - 0.1, 6);
K.taper(1.3, 0.6, 0.07, M.gold, x + 0.18, y + 0.09, z - 0.1, 8);
}
function ilfPlatter(K, x, y, z, seed) { return __ZC(444, 28, this, arguments, new.target); }
function ilfPew(K, len, o) { return __ZC(444, 29, this, arguments, new.target); }
function ilfCross(K, h, mat) { var M = ilfMats(); mat = mat || M.gold; K.box(0.06, h, 0.05, mat, 0, 0, 0); K.box(h * 0.55, 0.06, 0.05, mat, 0, h * 0.68, 0); }
function ilfAltar(K, o) { return __ZC(444, 30, this, arguments, new.target); }
function ilfReredos(K, w, h) { return __ZC(444, 31, this, arguments, new.target); }
function ilfOrgan(K, w) { return __ZC(444, 32, this, arguments, new.target); }
function ilfFont(K) { var M = ilfMats(); K.box(0.7, 0.12, 0.7, M.stone, 0, 0, 0); K.turned(0.32, 0.7, M.stone, 0, 0.12, 0); K.cyl(0.42, 0.24, M.stone, 0, 0.82, 0, 8); K.cylc(0.36, 0.01, ilfM(0x8AB8D8, { shine: 90 }), 0, 1.02, 0, 16); K.solid(0, 0, 0.42, 0.42, 1.05); }
function ilfVotive(K, w) { return __ZC(444, 33, this, arguments, new.target); }
function ilfLecternEagle(K) {
var M = ilfMats();
K.box(0.5, 0.08, 0.5, M.brass, 0, 0, 0);
K.turned(0.12, 1.0, M.brass, 0, 0.08, 0);
K.sph(0.18, M.brass, 0, 1.2, 0, 1.4, 0.8, 1, 10);
K.boxc(0.8, 0.03, 0.4, M.brass, 0, 1.28, 0.05, 0, -0.2, 0);
ilfOpenBook(K, 0, 1.3, 0.06, 0);
K.solid(0, 0, 0.3, 0.3, 1.4);
}
function ilfPupilDesk(K, o) { return __ZC(444, 34, this, arguments, new.target); }
function ilfLockers(K, n, col) { return __ZC(444, 35, this, arguments, new.target); }
function ilfCubbies(K, w) { return __ZC(444, 36, this, arguments, new.target); }
function ilfTeacherDesk(K, o) { return __ZC(444, 37, this, arguments, new.target); }
function ilfBoard(K, w, h, y, tex) {
var M = ilfMats();
K.plane(w, h, ilfTexMat(tex), 0, y + h / 2, 0.03, 0);
K.box(w + 0.08, 0.04, 0.04, M.oak, 0, y - 0.04, 0.0);
K.box(w + 0.08, 0.04, 0.04, M.oak, 0, y + h, 0.0);
K.box(0.04, h, 0.04, M.oak, -w / 2 - 0.02, y, 0);
K.box(0.04, h, 0.04, M.oak, w / 2 + 0.02, y, 0);
K.box(w, 0.03, 0.08, M.oak, 0, y - 0.05, 0.05);
}
function ilfPoster(K, k, w, y) { var M = ilfMats(); w = w || 0.9; K.plane(w, w * 0.75, ilfTexMat(ilfPosterTex(k)), 0, y + w * 0.375, 0.02, 0); }
function ilfWallClock(K, y) { var M = ilfMats(); K.cylc(0.2, 0.05, ilfM(0xF8F8F4), 0, y, 0.03, 20, 0, Math.PI / 2); K.ring(0.2, 0.025, M.black, 0, y, 0.05, 0, 0); K.boxc(0.012, 0.14, 0.005, M.black, 0, y + 0.05, 0.06); K.boxc(0.1, 0.012, 0.005, M.black, 0.04, y, 0.065); }
function ilfBeanbag(K, col) { K.sph(0.38, col, 0, 0.25, 0, 1, 0.62, 1, 10); K.sph(0.3, col, 0, 0.42, -0.15, 1, 0.6, 0.8, 8); }
function ilfLowShelf(K, w) {
var M = ilfMats(), wood = ilfM(0xC8A878, { map: "wood" });
K.box(w, 0.9, 0.32, wood, 0, 0, 0);
[0.12, 0.5].forEach(function (y, i) { K.box(w - 0.06, 0.33, 0.2, M.ebony, 0, y, -0.03); K.plane(w - 0.06, 0.33, ilfTexMat(ilfSpinesTex(i + 3)), 0, y + 0.165, 0.071, 0); });
K.solid(0, 0, w / 2, 0.16, 0.9);
}
function ilfTrophyCase(K, w) { return __ZC(444, 38, this, arguments, new.target); }
var ILF_PEOPLE = { pc: 8, lite: 3 };
function ilfRoom(I, key, x0, x1, z0, z1, seats, o) {
if (!I.ilf)
I.ilf = { rooms: [], cur: null, figs: [], queue: [], at: 0 };
var r = { key: key, x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), seats: seats || [], max: (o && o.max) || 0, level: (o && o.level) || 0 };
I.ilf.rooms.push(r);
return r;
}
function ilfLookFor(id, who, col) { return __ZC(444, 39, this, arguments, new.target); }
function ilfFigure(I, room, s, i) { return __ZC(444, 40, this, arguments, new.target); }
function ilfPeopleTick(dt) {
if (typeof INT === "undefined" || !INT || !INT.ilf || !INT.root)
return;
var S = INT.ilf;
S.at -= dt;
if (S.at > 0)
return;
S.at = 0.3;
var P = camera.position, lx = P.x - INT.root.position.x, lz = P.z - INT.root.position.z, lv = INT.level || 0, here = null;
for (var i = 0; i < S.rooms.length; i++) {
var r = S.rooms[i];
if (r.level === lv && lx >= r.x0 - 0.5 && lx <= r.x1 + 0.5 && lz >= r.z0 - 0.5 && lz <= r.z1 + 0.5) {
if (!here || (r.x1 - r.x0) * (r.z1 - r.z0) < (here.x1 - here.x0) * (here.z1 - here.z0))
here = r;
}
}
if (here !== S.cur) {
S.figs.forEach(function (g) { if (g.parent)
g.parent.remove(g); });
S.figs = [];
S.queue = [];
S.cur = here;
if (here) {
var cap = Math.min(here.max || 99, ilfLite() ? ILF_PEOPLE.lite : ILF_PEOPLE.pc), list = here.seats.slice();
list.sort(function (a, b) { return (b.must ? 1 : 0) - (a.must ? 1 : 0); });
var must = list.filter(function (s) { return s.must; }), rest = list.filter(function (s) { return !s.must; }), step = Math.max(1, rest.length / Math.max(1, cap - must.length));
S.queue = must.slice(0, cap);
for (var k = 0; S.queue.length < cap && k < rest.length; k++) {
var s = rest[Math.floor(k * step)];
if (!s)
break;
S.queue.push(s);
}
}
}
if (S.queue.length && S.cur && typeof buildFigure === "function") {
var s2 = S.queue.shift();
try {
var g = ilfFigure(INT, S.cur, s2, S.figs.length);
INT.root.add(g);
S.figs.push(g);
}
catch (e) {
S.queue = [];
if (window.console)
console.warn("[interior-life] figure", e);
}
S.at = 0.12;
}
}
var ILF_HOUSES = [0x6A1E22, 0x1E4A2A, 0x1E2A5A, 0x7A5A1A];
function ilfAcSide(r) { var west = r.x1 <= 0 && r.x0 < -20 && !r.down; return { west: west, out: west ? r.x0 : r.x1, inn: west ? r.x1 : r.x0, s: west ? 1 : -1 }; }
function ilfAcClearDesks(I, r) { return __ZC(444, 41, this, arguments, new.target); }
function ilfAcWalls(K, r, o) { return __ZC(444, 42, this, arguments, new.target); }
function ilfAcBeams(K, r, H) { var M = ilfMats(); if (K.lite)
return; for (var x = r.x0 + 2; x < r.x1 - 1; x += 3.6) {
K.box(0.34, 0.4, r.z1 - r.z0 - 0.2, M.walnut, x, H - 0.45, (r.z0 + r.z1) / 2);
} }
function ilfAcCorners(K, r, kinds) { return __ZC(444, 43, this, arguments, new.target); }
function ilfAcDesks(K, r, gone, seats, o) { return __ZC(444, 44, this, arguments, new.target); }
function ilfAcBenchDesks(K, r, seats, n) { return __ZC(444, 45, this, arguments, new.target); }
function ilfAcademy(I) { return __ZC(444, 46, this, arguments, new.target); }
var ILF_CHURCH_OLD = { pew: 1, altarinside: 1, pulpit: 1, candles: 1, chandelier: 1, runner: 1 };
function ilfDayNow() { var h = (typeof cityHourNow === "function") ? cityHourNow() : (typeof dreamHour === "function" ? dreamHour() : 12); return h >= 7 && h < 18.5; }
function ilfClearFurn(I, kinds, within) { return __ZC(444, 47, this, arguments, new.target); }
function ilfStoneWalls(I, o) { return __ZC(444, 48, this, arguments, new.target); }
function ilfChurch(I, o) { return __ZC(444, 49, this, arguments, new.target); }
var ILF_BOARD = {
ela: { el: ["Reading Time", "Our letter today: B", "b is for book, ball, bee"], hs: ["Literature", "Theme: what the story is really about", "Find three quotes that show it"] },
math: { el: ["Math", "3 + 4 = 7", "7 - 4 = 3"], hs: ["Algebra", "2x + 5 = 17", "2x = 12   so   x = 6"] },
sci: { el: ["Science", "Plants need: sun, water, air", "Draw a seed growing"], hs: ["Biology", "Cell: nucleus, membrane, cytoplasm", "Lab 4: osmosis in potato slices"] },
soc: { el: ["Our Community", "Who helps us?", "firefighter, nurse, teacher, baker"], hs: ["World History", "Causes of the First World War", "alliances, empires, nationalism"] },
lang: { el: ["Hola!", "uno, dos, tres", "rojo, azul, verde"], hs: ["Español", "¿Cómo estás?", "Estoy bien, gracias"] },
art: { el: ["Art", "Primary colours:", "red, yellow, blue"], hs: ["Studio Art", "Perspective: one vanishing point", "Sketch the corridor"] },
mus: { el: ["Music", "Clap the beat!", "ta  ta  ti-ti  ta"], hs: ["Music Theory", "C major: C D E F G A B C", "Key signature: no sharps"] },
pe: { el: ["Health", "Wash your hands", "Eat a rainbow"], hs: ["Health", "Heart rate: count for 15 s, x 4", "Rest vs. after exercise"] },
cs: { el: ["Coding", "forward, turn, repeat", "Help the robot home"], hs: ["Computer Science", "for (i = 0; i < 10; i++)", "Loops repeat a block"] }
};
var ILF_POSTERS = { ela: ["read", "abc"], math: ["math", "nums"], sci: ["periodic", "planets"], soc: ["world", "kind"], lang: ["world", "read"], art: ["arts", "kind"], mus: ["arts", "kind"], pe: ["kind", "read"], cs: ["math", "planets"] };
function ilfMarkerTex(lines, key) { return __ZC(444, 50, this, arguments, new.target); }
function ilfBunting(K, x0, x1, z, y) { return __ZC(444, 51, this, arguments, new.target); }
function ilfSchoolClass(K, r) { return __ZC(444, 52, this, arguments, new.target); }
function ilfSchoolHall(K, h) { return __ZC(444, 53, this, arguments, new.target); }
function ilfSchool(I) { return __ZC(444, 54, this, arguments, new.target); }
function ilfSchoolHallBuild(h) { return __ZC(444, 55, this, arguments, new.target); }
function ilfSchoolSurfaces(I) { return __ZC(444, 56, this, arguments, new.target); }
function ilfSchoolSurfaceMat(mat) { return __ZC(444, 57, this, arguments, new.target); }
function ilfSchoolFurniture(I) { return __ZC(444, 58, this, arguments, new.target); }
function ilfTileTex(v) { return __ZC(444, 59, this, arguments, new.target); }
function ilfPrayerTex() { return __ZC(444, 60, this, arguments, new.target); }
function ilfLatticeTex(day) { return __ZC(444, 61, this, arguments, new.target); }
function ilfHorseshoe() {
return ilfG("horseshoe", function () {
var s = new THREE.Shape();
s.moveTo(-0.5, -0.5);
s.lineTo(0.5, -0.5);
s.lineTo(0.5, -0.05);
s.absarc(0, 0.05, 0.5, -0.2, Math.PI + 0.2, false);
s.lineTo(-0.5, -0.5);
return ilfUV01(new THREE.ShapeGeometry(s, 12));
});
}
function ilfLampRing(K, y, top, r, n) { return __ZC(444, 62, this, arguments, new.target); }
function ilfReadingStand(K) {
var M = ilfMats();
K.boxc(0.36, 0.02, 0.42, M.walnut, 0, 0.16, -0.1, 0, 0.85, 0);
K.boxc(0.36, 0.02, 0.42, M.walnut, 0, 0.16, 0.1, 0, -0.85, 0);
K.boxc(0.34, 0.012, 0.26, M.velvetG, 0, 0.3, -0.08, 0, -0.6, 0);
K.boxc(0.34, 0.012, 0.26, M.paper, 0, 0.3, 0.08, 0, 0.6, 0);
}
function ilfMosque(I) { return __ZC(444, 63, this, arguments, new.target); }
var ILF_KIND = { church: "church", cathedral: "church" };
function ilfWhich(I) { return __ZC(444, 64, this, arguments, new.target); }
function ilfDress(I) { return __ZC(444, 65, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
if (typeof PLANS !== "undefined" && PLANS.church && !PLANS.church.h)
PLANS.church.h = 7;
var ILF_PLANS = { grandcathedral: { mode: "hall", w: 24, d: 44, fill: "church", wall: 0xCCC4B4, floor: "marble", h: 11, side: ["chapel", "chapel", "vestry", "chapel", "archive"] },
chapel: { mode: "hall", w: 11, d: 18, fill: "church", wall: 0xD8D0C0, floor: "stone", h: 6, side: ["vestry"] },
mosque: { mode: "hall", w: 24, d: 24, fill: "mosque", wall: 0xE8E0CE, floor: "stone", h: 9, side: ["office", "archive"] } };
if (typeof planOf === "function" && typeof PLANS !== "undefined") {
var po = planOf;
planOf = function (spec) {
var p = po.apply(this, arguments), a = spec && spec.archetype;
if (!a || !ILF_PLANS[a] || PLANS[a] || !p || spec.workplace || spec.psInside || (spec.dlRooms && spec.dlRooms.length) || (spec.inside && spec.inside.rooms && spec.inside.rooms.length))
return p;
if (!((p.mode === "mixed" && p.ground === "lobby") || (p.mode === "rooms" && !p.fill)))
return p;
var th = null;
try {
th = (typeof evbThemeKey === "function") ? evbThemeKey(spec) : null;
}
catch (e) { }
return th ? p : ILF_PLANS[a];
};
}
var mi = makeInterior;
makeInterior = function (spec) {
var I = mi.apply(this, arguments);
try {
ilfDress(I);
}
catch (e) {
if (window.console)
console.warn("[interior-life]", e);
}
return I;
};
if (typeof interiorTick === "function") {
var it = interiorTick;
interiorTick = function (dt) { var r = it.apply(this, arguments); try {
ilfPeopleTick(dt || 0.016);
}
catch (e) { } return r; };
}
})();
var ILF_CLINICAL = /hospital|clinic|surgery|apothecary|laboratory|lab\b|dairy/i;
function ilfCivic(I) { return __ZC(444, 66, this, arguments, new.target); }
