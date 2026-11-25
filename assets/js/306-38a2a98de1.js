/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LL = { base: -480000, solids: [], walk: [], pads: [], ramps: [], gates: [], spots: [], talk: [], rooms: [], wings: [], people: [], staffAt: [],
twinkle: [], flames: [], spin: [], screens: [], water: [], built: false, t: 0, lite: false, room: null, state: null, stateAt: 0, busy: false,
G: null, slow: 0, pt: 0, gateSaid: 0, where: "lounge", bingo: null, bingoAt: 0, guide: null };
var LL_KEY = "GiGi's Lounge", LL_HOUSE = "GiGi's House", LL_JOB0 = 3300, LL_JOB1 = 3399;
var LL_SUITE_JOBS = [3300, 3301], LL_HOUSE_JOBS = [3318, 3319, 3320, 3321, 3322];
var LL_HX = 1000;
function llSigned() { return typeof signedIn === "function" && signedIn(); }
function llKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function llJobs() { return ((typeof standing !== "undefined" && standing && standing.jobs) || []).map(function (j) { return +(j.job_id || j.id || 0); }).filter(function (id) { return id >= LL_JOB0 && id <= LL_JOB1; }); }
function llHasJob(list) { var J = llJobs(); return list.some(function (j) { return J.indexOf(j) >= 0; }); }
function llHost() { return !!(LL.state && LL.state.am_host); }
function llIsStaff() { return llKeeper() || llHost() || llJobs().length > 0; }
function llSuiteOK() { return llKeeper() || llHost() || llHasJob(LL_SUITE_JOBS); }
function llHouseMine() {
if (LL.state && LL.state.house_mine)
return true;
return !!(typeof standing !== "undefined" && standing && (standing.lots || []).some(function (l) { return l.lot === LL_HOUSE; }));
}
function llHouseOK() { return llKeeper() || llHost() || llHouseMine() || llHasJob(LL_HOUSE_JOBS); }
function llCanHost() { return llKeeper() || llHost() || llHasJob([3300, 3303, 3306]); }
function llAllowed(need, G) {
if (need === "staff")
return llIsStaff();
if (need === "suite")
return llSuiteOK();
if (need === "room")
return typeof llRoomKey === "function" ? llRoomKey(G) : true;
return true;
}
var LL_NEED_SAY = { staff: "Staff only. The badge reader glows rose-gold: it opens for anyone working a post at the Lounge, for GiGi, and for the Keeper.",
suite: "GiGi's own suite. The door opens for GiGi, her personal assistant and the general manager, and for the Keeper. Her assistant will happily take a message at the front desk." };
function llHostName() { return (LL.state && LL.state.host_name) || "GiGi"; }
function llLoadState(force) { return __ZC(306, 0, this, arguments, new.target); }
function llMissing(e) { var m = String((e && e.message) || e || ""); return /does not exist|not find the function|PGRST202|404|schema cache/i.test(m); }
function llSoft(e) { return llMissing(e) ? "This needs the Lounge's server update (86). Until then you can play every game for practice." : esc(String((e && e.message) || e || "Not now.")); }
function llLite() { return typeof LITE !== "undefined" && !!LITE; }
var LL_MAT = {};
function llM(col, o) { return __ZC(306, 1, this, arguments, new.target); }
function llOwn(col, op) { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} return m; }
function llBox(w, h, d, m, x, y, z, G) { return wBox(w, h, d, m, x, y, z, G); }
function llCyl(rt, rb, h, m, x, y, z, G, s) { return wCyl(rt, rb, h, m, x, y, z, G, s); }
function llSph(r, m, x, y, z, G, s) { return wSph(r, m, x, y, z, G, s); }
function llKeep(o) { o.userData.keep = 1; return o; }
function llSolid(x, z, hw, hd, rot, h, b) { var o = { x: x, z: z, hw: hw, hd: hd, rot: rot || 0 }; if (h !== undefined)
o.h = h; if (b !== undefined)
o.b = b; LL.solids.push(o); return o; }
function llSolidR(x, z, r, h) { var o = { x: x, z: z, r: r }; if (h !== undefined)
o.h = h; LL.solids.push(o); return o; }
function llSpot(o) { LL.spots.push(o); return o; }
function llHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function llIn(r, x, z) { return x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1; }
function llSign(G, lines, w, h, x, y, z, ry, bg, fg) { var s = wSign(lines, w, h, bg || "#2A1236", fg || "#E8CFA0"); s.position.set(x, y, z); s.rotation.y = ry || 0; G.add(s); return s; }
function llTBox(w, h, d, mat, x, y, z, G, tile) { return __ZC(306, 2, this, arguments, new.target); }
function llPlane(w, d, mat, x, y, z, G, tile, down) {
var g = new THREE.PlaneGeometry(w, d), uv = g.attributes.uv, t = tile || 2;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * w / t, uv.getY(i) * d / t);
var m = wMesh(g, mat, x, y, z, G);
m.rotation.x = down ? Math.PI / 2 : -Math.PI / 2;
return m;
}
var LL_TEXC = {};
function llCanvasTex(key, size, fn) {
if (LL_TEXC[key])
return LL_TEXC[key];
var t = wTex(size, size, fn);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (typeof renderer !== "undefined" && renderer && renderer.capabilities)
t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
return (LL_TEXC[key] = t);
}
var LL_TEX = {
carpet: function () { return __ZC(306, 3, this, arguments, new.target); },
rosecarpet: function () { return __ZC(306, 4, this, arguments, new.target); },
damask: function () { return __ZC(306, 5, this, arguments, new.target); },
pinkdamask: function () { return __ZC(306, 6, this, arguments, new.target); },
marble: function () { return __ZC(306, 7, this, arguments, new.target); },
parquet: function () { return __ZC(306, 8, this, arguments, new.target); },
tile: function () {
return llCanvasTex("tile", 128, function (x, W, H) {
x.fillStyle = "#D4C8D0";
x.fillRect(0, 0, W, H);
x.fillStyle = "#A890A8";
x.fillRect(0, 0, W / 2, H / 2);
x.fillRect(W / 2, H / 2, W / 2, H / 2);
x.strokeStyle = "rgba(80,60,80,.4)";
x.strokeRect(0, 0, W, H);
});
},
coffer: function () { return __ZC(306, 9, this, arguments, new.target); },
felt: function () {
return llCanvasTex("felt", 128, function (x, W, H) {
x.fillStyle = "#4A2A6A";
x.fillRect(0, 0, W, H);
var R = wRand(9);
for (var i = 0; i < 900; i++) {
x.fillStyle = "rgba(" + (60 + R() * 30 | 0) + ",40," + (90 + R() * 30 | 0) + ",.35)";
x.fillRect(R() * W, R() * H, 1, 1);
}
});
},
stone: function () { return __ZC(306, 10, this, arguments, new.target); }
};
function llRoom(G, x0, x1, z0, z1, o) { return __ZC(306, 11, this, arguments, new.target); }
function llWalls(G, x0, x1, z0, z1, h, mat, gaps, tile, skip, trim) { return __ZC(306, 12, this, arguments, new.target); }
function llPad(x0, x1, z0, z1, h) { LL.pads.push({ x0: x0, x1: x1, z0: z0, z1: z1, h: h }); if (h > 0.55)
LL.solids.push({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: (x1 - x0) / 2 - 0.3, hd: (z1 - z0) / 2 - 0.3, rot: 0, h: h }); }
function llRamp(x0, x1, z0, z1, h0, h1, axis) { LL.ramps.push({ x0: x0, x1: x1, z0: z0, z1: z1, h0: h0, h1: h1, axis: axis || "z" }); }
function llEnv() { return __ZC(306, 13, this, arguments, new.target); }
function llGround(x, z, feet) { return __ZC(306, 14, this, arguments, new.target); }
function llBlocked(x, z, feet) { return __ZC(306, 15, this, arguments, new.target); }
function llRoomAt(x, z) {
var best = null;
for (var i = 0; i < LL.rooms.length; i++) {
var r = LL.rooms[i];
if (llIn(r, x, z) && (!best || (r.x1 - r.x0) * (r.z1 - r.z0) < (best.x1 - best.x0) * (best.z1 - best.z0)))
best = r;
}
return best;
}
if (typeof worldDef === "function")
worldDef("lounge", {
base: LL.base, far: 900, ownSky: true, tone: 600,
env: function () { return llEnv(); },
build: function (G) { llBuild(G); },
enter: function (opt) { llEnter(opt || {}); },
leave: function () { llLeave(); },
ground: function (x, z, feet) { return llGround(x, z, feet); },
block: function (x, z, feet) { return llBlocked(x, z, feet); },
tick: function (dt) { llTick(dt); },
back: function () { llBack(); }
});
"use strict";
var LLC = { plum: 0x4A2060, purple: 0x6A3482, lav: 0xA98BC4, lilac: 0xC4AED8, pink: 0xD88AB8, rose: 0xB85C8E, blush: 0xE2BCCE, berry: 0x8A2A64,
gold: 0xC9A868, silver: 0xB4B8C4, cream: 0xE2D8D0, ivory: 0xDCD2C6, wood: 0x3A2028, walnut: 0x5A3828, velvet: 0x5A1E5A, teal: 0x2A5A6A, green: 0x3A6A44 };
function llGold() { return llM(LLC.gold, { e: 0x2A1C08 }); }
function llSilver() { return llM(LLC.silver, { e: 0x18181E }); }
function llCrystal() { return llM(0xE8E0F0, { e: 0x3A3040, op: 0.75 }); }
function llPiece(G, x, z, ry, y) { var g = new THREE.Group(); g.position.set(x, y || 0, z); g.rotation.y = ry || 0; G.add(g); return g; }
function llPS(x, z, hw, hd, ry, h) { return llSolid(x, z, hw, hd, ry || 0, h === undefined ? 2.2 : h); }
function llChair(G, x, z, ry, col, o) { return __ZC(306, 16, this, arguments, new.target); }
function llArmchair(G, x, z, ry, col) { return __ZC(306, 17, this, arguments, new.target); }
function llSofa(G, x, z, ry, col, len, o) { return __ZC(306, 18, this, arguments, new.target); }
function llChaise(G, x, z, ry, col) { return __ZC(306, 19, this, arguments, new.target); }
function llOttoman(G, x, z, col, r) {
r = r || 0.45;
var g = llPiece(G, x, z, 0);
llCyl(r, r, 0.42, llM(col || LLC.pink), 0, 0.25, 0, g, 16);
llCyl(r * 0.4, r * 0.4, 0.03, llGold(), 0, 0.47, 0, g, 10);
if (!LL.lite)
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.283;
llSph(0.03, llGold(), Math.cos(a) * r * 0.7, 0.47, Math.sin(a) * r * 0.7, g, 4);
}
llSolidR(x, z, r, 0.5);
return g;
}
function llRoundTable(G, x, z, r, o) { return __ZC(306, 20, this, arguments, new.target); }
function llRectTable(G, x, z, w, d, ry, o) { return __ZC(306, 21, this, arguments, new.target); }
function llCoffeeTable(G, x, z, ry, o) { return __ZC(306, 22, this, arguments, new.target); }
function llDiningRound(G, x, z, r, n, col, o) {
llRoundTable(G, x, z, r, o);
for (var i = 0; i < n; i++) {
var a = i / n * 6.283 + (o && o.a0 || 0), cx = x + Math.sin(a) * (r + 0.5), cz = z + Math.cos(a) * (r + 0.5);
llChair(G, cx, cz, a + Math.PI, col);
}
}
function llChandelier(G, x, y, z, s, o) { return __ZC(306, 23, this, arguments, new.target); }
function llMesh(geo, mat, x, y, z, G) { return wMesh(geo, mat, x, y, z, G); }
function llSconce(G, x, y, z, ry) { return __ZC(306, 24, this, arguments, new.target); }
function llCandelabra(G, x, y, z) { return __ZC(306, 25, this, arguments, new.target); }
function llRug(G, x, z, w, d, ry, col, border, y) {
var g = llPiece(G, x, z, ry, y || 0);
llBox(w, 0.02, d, llM(border || LLC.gold), 0, 0.02, 0, g);
llBox(w - 0.3, 0.025, d - 0.3, llM(col || LLC.rose), 0, 0.022, 0, g);
if (!LL.lite)
llBox(w * 0.5, 0.03, d * 0.4, llM(LLC.blush), 0, 0.024, 0, g);
return g;
}
function llPlant(G, x, z, kind, s) { return __ZC(306, 26, this, arguments, new.target); }
function llVase(G, x, y, z, s) {
s = s || 1;
var g = llPiece(G, x, z, 0, y);
llCyl(0.08 * s, 0.12 * s, 0.3 * s, llSilver(), 0, 0.15 * s, 0, g, 10);
for (var i = 0; i < (LL.lite ? 3 : 7); i++) {
var a = i / 7 * 6.283;
llSph(0.07 * s, llM(i % 2 ? LLC.pink : LLC.rose), Math.cos(a) * 0.09 * s, (0.38 + (i % 3) * 0.05) * s, Math.sin(a) * 0.09 * s, g, 6);
}
return g;
}
var LL_ART = {};
function llArtTex(seed) { return __ZC(306, 27, this, arguments, new.target); }
function llPainting(G, x, y, z, ry, w, h, seed) {
var g = llPiece(G, x, z, ry, y), gd = llGold();
llBox(w + 0.24, h + 0.24, 0.08, gd, 0, 0, 0, g);
var p = wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: llArtTex(seed || 0) }), 0, 0, 0.05, g);
if (!LL.lite) {
llBox(w * 0.3, 0.08, 0.04, gd, 0, -h / 2 - 0.24, 0.04, g);
}
return g;
}
function llMirror(G, x, y, z, ry, w, h) { var g = llPiece(G, x, z, ry, y); llBox(w + 0.2, h + 0.2, 0.06, llGold(), 0, 0, 0, g); llBox(w, h, 0.02, llM(0xA8B0C8, { e: 0x2A2E3A }), 0, 0, 0.04, g); return g; }
var LL_WINTEX = null;
function llWindow(G, x, y, z, ry, w, h) { return __ZC(306, 28, this, arguments, new.target); }
function llColumn(G, x, z, h, o) { return __ZC(306, 29, this, arguments, new.target); }
function llFireplace(G, x, z, ry) { return __ZC(306, 30, this, arguments, new.target); }
function llBookcase(G, x, z, ry, w, h) { return __ZC(306, 31, this, arguments, new.target); }
function llSideboard(G, x, z, ry, w, col) {
w = w || 2;
var g = llPiece(G, x, z, ry);
llBox(w, 0.85, 0.5, llM(col || LLC.cream), 0, 0.45, 0, g);
llBox(w + 0.06, 0.04, 0.54, llGold(), 0, 0.89, 0, g);
for (var i = 0; i < 3; i++)
llBox(w / 3 - 0.08, 0.6, 0.02, llM(LLC.blush), -w / 3 + i * w / 3, 0.45, 0.26, g);
llVase(G, x, 0.9, z, 1);
llPS(x, z, w / 2, 0.28, ry, 1);
return g;
}
function llCabinet(G, x, z, ry, w, h, col) { var g = llPiece(G, x, z, ry); llBox(w, h, 0.5, llM(col || LLC.cream), 0, h / 2, 0, g); llBox(w + 0.06, 0.06, 0.54, llGold(), 0, h, 0, g); llPS(x, z, w / 2, 0.28, ry, h); return g; }
function llPiano(G, x, z, ry) { return __ZC(306, 32, this, arguments, new.target); }
function llFountain(G, x, z, s) { return __ZC(306, 33, this, arguments, new.target); }
function llTrophyCase(G, x, z, ry, w) { return __ZC(306, 34, this, arguments, new.target); }
function llRope(G, x0, z0, x1, z1, n) { return __ZC(306, 35, this, arguments, new.target); }
function llCounter(G, x, z, w, ry, o) { return __ZC(306, 36, this, arguments, new.target); }
function llCakeCase(G, x, z, w, ry) { return __ZC(306, 37, this, arguments, new.target); }
function llTieredStand(G, x, y, z) { return __ZC(306, 38, this, arguments, new.target); }
function llTeaSet(G, x, y, z) {
var g = llPiece(G, x, z, 0, y), p = llM(0xE6DCE4);
llSph(0.08, p, 0, 0.08, 0, g, 8);
llCyl(0.015, 0.02, 0.1, p, 0.09, 0.09, 0, g, 4).rotation.z = -0.9;
if (!LL.lite)
for (var i = 0; i < 2; i++) {
llCyl(0.04, 0.03, 0.05, p, -0.12 + i * 0.24, 0.03, 0.1, g, 8);
llCyl(0.06, 0.06, 0.01, p, -0.12 + i * 0.24, 0.005, 0.1, g, 10);
}
return g;
}
function llBed(G, x, z, ry, o) { return __ZC(306, 39, this, arguments, new.target); }
function llWardrobe(G, x, z, ry, w) {
w = w || 1.6;
var g = llPiece(G, x, z, ry);
llBox(w, 2.3, 0.62, llM(LLC.cream), 0, 1.15, 0, g);
llBox(w + 0.08, 0.1, 0.66, llGold(), 0, 2.33, 0, g);
llBox(0.02, 2.1, 0.02, llGold(), 0, 1.15, 0.32, g);
llSph(0.03, llGold(), -0.08, 1.15, 0.33, g, 5);
llSph(0.03, llGold(), 0.08, 1.15, 0.33, g, 5);
llPS(x, z, w / 2, 0.33, ry, 2.3);
return g;
}
function llVanity(G, x, z, ry) { return __ZC(306, 40, this, arguments, new.target); }
function llPouf(G, x, z) { llOttoman(G, x, z, LLC.pink, 0.26); }
function llBath(G, x, z, ry) { return __ZC(306, 41, this, arguments, new.target); }
function llBasin(G, x, z, ry, n) { return __ZC(306, 42, this, arguments, new.target); }
function llStall(G, x, z, ry) {
var g = llPiece(G, x, z, ry);
llBox(0.06, 2.1, 1.5, llM(LLC.lav), -0.6, 1.15, 0, g);
llBox(0.06, 2.1, 1.5, llM(LLC.lav), 0.6, 1.15, 0, g);
llBox(1.2, 2.1, 0.05, llM(LLC.lilac), 0, 1.15, 0.75, g);
llBox(0.45, 0.45, 0.6, llM(0xE2D8DE), 0, 0.23, -0.4, g);
llSolid(x, z, 0.65, 0.78, ry, 2.2);
return g;
}
function llDesk(G, x, z, ry, o) { return __ZC(306, 43, this, arguments, new.target); }
function llBossChair(G, x, z, ry, col) { return __ZC(306, 44, this, arguments, new.target); }
function llLockers(G, x, z, ry, n) {
var g = llPiece(G, x, z, ry);
for (var i = 0; i < n; i++) {
llBox(0.48, 1.9, 0.5, llM(i % 2 ? LLC.lav : LLC.lilac), -n * 0.25 + 0.25 + i * 0.5, 0.95, 0, g);
llBox(0.06, 0.02, 0.02, llSilver(), -n * 0.25 + 0.4 + i * 0.5, 1.1, 0.26, g);
}
llPS(x, z, n * 0.25, 0.27, ry, 1.9);
return g;
}
function llShelves(G, x, z, ry, w) { return __ZC(306, 45, this, arguments, new.target); }
function llKitchenRun(G, x, z, w, ry) { return __ZC(306, 46, this, arguments, new.target); }
function llStove(G, x, z, ry) { return __ZC(306, 47, this, arguments, new.target); }
function llFridge(G, x, z, ry) { var g = llPiece(G, x, z, ry); llBox(0.9, 2.0, 0.7, llSilver(), 0, 1.0, 0, g); llBox(0.03, 0.8, 0.04, llGold(), 0.35, 1.3, 0.36, g); llPS(x, z, 0.46, 0.36, ry, 2); return g; }
function llIsland(G, x, z, w, d, ry) {
var g = llPiece(G, x, z, ry);
llBox(w, 0.9, d, llM(LLC.lav), 0, 0.45, 0, g);
llBox(w + 0.1, 0.06, d + 0.1, llM(0xD8CCD4, { map: "marble" }), 0, 0.93, 0, g);
if (!LL.lite) {
llTieredStand(G, x, 0.96, z);
}
llPS(x, z, w / 2 + 0.05, d / 2 + 0.05, ry, 1);
return g;
}
function llTV(G, x, y, z, ry, w) { var g = llPiece(G, x, z, ry, y); llBox(w, w * 0.56, 0.06, llM(0x141018), 0, 0, 0, g); var sc = llBox(w - 0.08, w * 0.56 - 0.08, 0.02, llOwn(0x2A2A44), 0, 0, 0.035, g); llKeep(sc); (LL.tvs || (LL.tvs = [])).push({ m: sc, x: x, z: z, w: w }); return g; }
function llHarp(G, x, z, ry) { return __ZC(306, 48, this, arguments, new.target); }
"use strict";
var LL_PLACES = {};
function llPlace(k, x, z, name) { LL_PLACES[k] = { x: x, z: z, name: name }; }
function llWing(G, name, x0, x1, z0, z1) { var g = new THREE.Group(); g.name = "ll-" + name; G.add(g); var W = { g: g, name: name, x0: x0, x1: x1, z0: z0, z1: z1 }; LL.wings.push(W); return g; }
function llStaff(o) { LL.staffAt.push(o); return o; }
function llBuildLounge(G) { return __ZC(306, 49, this, arguments, new.target); }
function llBoard(G, kind, x, y, z, ry, w, h) { return __ZC(306, 50, this, arguments, new.target); }
function llCrestBoard(G, x, y, z, ry) { return __ZC(306, 51, this, arguments, new.target); }
function llBingoHall(G, M) { return __ZC(306, 52, this, arguments, new.target); }
function llBingoBoard(G, x, y, z, ry, w, h) { return __ZC(306, 53, this, arguments, new.target); }
function llBallScreen(G, x, y, z, ry, w, h, stats) { return __ZC(306, 54, this, arguments, new.target); }
function llBallCage(G, x, y, z) { return __ZC(306, 55, this, arguments, new.target); }
function llMahjongParlour(G, M) { return __ZC(306, 56, this, arguments, new.target); }
function llTeaRoom(G, M) { return __ZC(306, 57, this, arguments, new.target); }
function llCardSalon(G, M) { return __ZC(306, 58, this, arguments, new.target); }
function llCrownRoom(G, M) { return __ZC(306, 59, this, arguments, new.target); }
function llStaffWing(G, M) { return __ZC(306, 60, this, arguments, new.target); }
function llSuite(G, M) { return __ZC(306, 61, this, arguments, new.target); }
function llSouthRooms(G, M) { return __ZC(306, 62, this, arguments, new.target); }
"use strict";
function llBuildHouse(G) { return __ZC(306, 63, this, arguments, new.target); }
"use strict";
var LL_SHE = "Miss GiGi";
var LL_FOLK = {
concierge: { name: "Rosalind Vane", sex: "f", persona: "the concierge at the front desk of GiGi's Lounge: gracious, quick and kind, with a rose in your lapel. You know every room by heart: the Bingo Hall, the Mahjong Parlour, the Card Salon, the Crown Room where tournaments are won, the Rose Tea Room, the Conservatory, the Treasure Box gift and prize shop, and the powder rooms. You can point anyone the way (there is an arrow if they ask at your desk)." },
doorman: { name: "Augustus Bell", sex: "m", persona: "the doorman of GiGi's Lounge, in a plum coat with gold frogging: courtly, proud of the house, fond of a gentle joke. You hold the doors, remember faces and tell people what is on tonight." },
caller: { name: "Delphine Maybury", sex: "f", persona: "the Bingo caller at GiGi's Lounge, on the stage under the great board: warm, theatrical, with all the old bingo calls (legs eleven, two little ducks, key of the door, clickety-click) and some new ones of your own. A house game runs whenever nobody is hosting, and the hostess can call her own games. Cards are free and prizes go to the backpack." },
mahjong: { name: "Margot Lin", sex: "f", persona: "the Mahjong host of GiGi's Lounge: patient, precise and funny, a fine teacher. You explain Mahjong at the table (four players; collect four sets and a pair; pung, chow and kong; the winds and dragons) and Mahjong solitaire (match free pairs of tiles until the board is clear). Three house players sit in at any table." },
dealer: { name: "Theodore Cask", sex: "m", persona: "a card dealer in the Card Salon of GiGi's Lounge: dapper, unflappable, quietly encouraging. You know Klondike solitaire, FreeCell, chess, draughts and Texas Hold'em at the friendly table. Nothing in the Lounge is played for gold." },
tea: { name: "Clementine Rose", sex: "f", persona: "the host of the Rose Tea Room at GiGi's Lounge: sunny and motherly, proud of your scones, lemon drizzle and the house's rose petal tea. You recommend things from the menu and know everyone's usual." },
pianist: { name: "Florian Ashby", sex: "m", persona: "the pianist in the Rose Tea Room at GiGi's Lounge: gentle, a little shy, and happiest playing soft standards and waltzes of your own. You take requests for a mood (something tender, something lively, a waltz)." },
director: { name: "Beatrice Holloway", sex: "f", persona: "the tournament director of GiGi's Lounge, in the Crown Room: organised, fair and encouraging. Every day there is a Daily Deal in Klondike, FreeCell and Mahjong solitaire: everyone plays the same deal, fastest time wins. The hostess can open her own tournaments too, and the top three take home a gold, silver or bronze trophy to the backpack." },
manager: { name: "Ophelia Grant", sex: "f", persona: "the general manager of GiGi's Lounge: calm, capable and devoted to the place and to the lady it was made for. You run the rota, the staff and the everyday affairs so the hostess never has to worry." },
assistant: { name: "Juniper Wells", sex: "f", persona: "the personal assistant to GiGi, the hostess of GiGi's Lounge, in the anteroom of her suite: discreet, warm and very organised. You keep her diary, take messages, and see that her office, her flowers and her tea are always just so." },
shop: { name: "Posy Larkin", sex: "f", persona: "the clerk at the Treasure Box, the prize and gift shop of GiGi's Lounge: cheerful and chatty, delighted by every pretty thing on your shelves. Bingo prizes and tournament trophies go straight to the winner's backpack; you also sell keepsakes for gold." },
florist: { name: "Ivy Thornbury", sex: "f", persona: "the florist in the Conservatory of GiGi's Lounge: soft-spoken, with soil on your cuffs. You grow the roses and orchids for every table in the house and make buttonholes and posies." },
butler: { name: "Ambrose Pemberton", sex: "m", persona: "the butler of GiGi's House on the Crescent: impeccable, kind, with a dry wit. You run the house for the lady of it, greet her guests, and know where everything is: the drawing room, the dining room, the music room, the library, her games room, the gallery, the bedrooms and the kitchen." },
housekeeper: { name: "Harriet Fairweather", sex: "f", persona: "the housekeeper of GiGi's House: brisk, loving and house-proud. Every cushion plumped, every vase fresh, the linen pressed and scented with lavender." },
cook: { name: "Mabel Quince", sex: "f", persona: "the cook at GiGi's House: generous and bossy in the best way. Soups, roasts, pies, cakes and the perfect pot of tea; you love to feed people." },
maid: { name: "Celeste Arden", sex: "f", persona: "the lady's maid at GiGi's House: gentle, artistic, with a good eye for colour. You look after her wardrobe, gowns, shawls and pearls, and lay out her evening clothes." },
frontdesk: { name: "Camille Ashworth", sex: "f", persona: "the front desk manager of GiGi's Lounge Hotel & Resort, at the long marble desk in the Hotel Lobby: polished, warm and unhurried. You book rooms (Classic, Deluxe and the two penthouses on the sixth floor), hand out key cards, extend stays and check guests out. You know the resort by heart: the Magnolia Room, the Starlight Ballroom, the gardens and the maze, the swan lake, the Pool Terrace, the Garden Pavilion and the Rosewater Spa." },
bell: { name: "Percival Dunne", sex: "m", persona: "the bell captain of GiGi's Lounge Hotel & Resort, in a plum jacket with gold buttons: brisk, cheerful and full of tips. You see to luggage, call taxis, and send guests the right way." },
guestsvc: { name: "Marisol Vega", sex: "f", persona: "the guest services host at GiGi's Lounge Hotel & Resort: bright and helpful. You know everything to do at the resort and when: yoga on the lawn, the spa, the swan boat, the maze, the table games in the Garden Pavilion, dinner and the evening ball." },
housekeep: { name: "Agnes Pellow", sex: "f", persona: "the director of housekeeping at GiGi's Lounge Hotel & Resort: exacting, kind and proud of every crisp sheet. You run the room attendants, the laundry and the linen rooms on every floor." },
maitre: { name: "Laurent Bellamy", sex: "m", persona: "the maître d' of the Magnolia Room, the resort's restaurant: elegant, attentive and quietly funny. You seat guests, recommend the tasting menu or the beef Wellington, and know the harpist's whole repertoire." },
chef: { name: "Odette Marchand", sex: "f", persona: "the executive chef of the Magnolia Room at GiGi's Lounge Hotel & Resort: passionate, precise and generous. You run the kitchen, the pass and the room service menu, and grow your herbs in the resort gardens." },
harpist: { name: "Seraphina Lyle", sex: "f", persona: "the harpist who plays at dinner in the Magnolia Room: dreamy, gentle and kind. You play soft pieces of your own and take requests for a mood." },
bandleader: { name: "Julius Fairbanks", sex: "m", persona: "the bandleader of the Starlight Orchestra in the Starlight Ballroom: debonair, energetic and encouraging. You play waltzes, foxtrots and swing, run the tea dances and the evening ball, and will teach anyone the box step." },
events: { name: "Tamsin Holt", sex: "f", persona: "the events coordinator of GiGi's Lounge Hotel & Resort: organised, enthusiastic and calm under pressure. You plan tea dances, the evening ball, birthdays, anniversaries and wedding breakfasts in the ballroom, the pavilion or on the bandstand lawn." },
headgardener: { name: "Silas Thorne", sex: "m", persona: "the head gardener of the resort's gardens at GiGi's Lounge: weathered, patient and poetic about roses. You keep the rose garden, the topiary walk, the hedge maze, the lawns and the swan lake's banks." },
swan: { name: "Pip Calloway", sex: "m", persona: "the keeper of the swan boat at the boathouse on the resort's lake: cheerful and a little dreamy. You take guests out round the lake and the island gazebo, and know every swan by name." },
poolbar: { name: "Coralie Banks", sex: "f", persona: "the attendant at the Pink Parasol, the pool bar of GiGi's Lounge Hotel & Resort: sunny and quick. You make pink lemonade, smoothies and the house mocktail (passion fruit, lime and soda), and bring orders to the cabanas. Nothing at the bar is alcoholic." },
lifeguard: { name: "Dex Morrow", sex: "m", persona: "the head lifeguard at the resort's Pool Terrace, on the high chair: calm, watchful and friendly. You keep the lagoon pool, the lap pool and the splash pool safe, and remind people gently not to run on the tiles." },
yoga: { name: "Indira Sol", sex: "f", persona: "the yoga instructor on the lawn by the resort's pool terrace: serene and encouraging. You lead gentle morning classes for every body and every age." },
spa: { name: "Elodie Fairfax", sex: "f", persona: "the spa director of the Rosewater Spa at GiGi's Lounge Hotel & Resort: soothing, knowledgeable and kind. You recommend massages, facials, the hot stone and aromatherapy rooms, and the thermal suite (the warm pool, the sauna, the steam room and the cold plunge)." },
gameshost: { name: "Barnaby Quill", sex: "m", persona: "the games host of the Garden Pavilion at GiGi's Lounge Hotel & Resort: jovial, fair and a patient teacher. You run the tables of dominoes, spades, hearts, gin rummy and farkle, explain the rules, and the house sits in for any empty seat. Nothing in the pavilion is played for gold." },
phbutler: { name: "Reginald Ashcombe", sex: "m", persona: "the butler of the penthouse floor at GiGi's Lounge Hotel & Resort: impeccable, discreet and warm. You look after the guests of penthouses 601 and 602: dinner in the suite, the plunge pool, flowers and anything else they wish." },
gardener: { name: "Rowan Ashdown", sex: "m", persona: "the florist and gardener of GiGi's House: quiet, weathered and cheerful. You keep the great arrangement in the rotunda fresh and grow the flowers for every room." }
};
function llPersona(f, title) { return __ZC(306, 64, this, arguments, new.target); }
function llGenericPersona(title) { return __ZC(306, 65, this, arguments, new.target); }
function llStaffName(s) { if (s.talk && LL_FOLK[s.talk])
return LL_FOLK[s.talk].name; return typeof ppName === "function" ? ppName(s.title, "ll" + s.seed) : s.title; }
function llPeople() { return __ZC(306, 66, this, arguments, new.target); }
function llGreet(s, f) { return __ZC(306, 67, this, arguments, new.target); }
function llWingAt(x, z) { for (var i = 0; i < LL.wings.length; i++) {
var W = LL.wings[i];
if (x >= W.x0 && x <= W.x1 && z >= W.z0 && z <= W.z1)
return W;
} return null; }
"use strict";
function llBuild(G) { return __ZC(306, 68, this, arguments, new.target); }
var LL_ARRIVE = { lounge: { x: 0, z: 60.5, yaw: 0 }, house: { x: LL_HX, z: 36.5, yaw: 0 } };
function llPut(x, z, yw) {
camera.position.set(LL.base + x, llGround(x, z, 0) + 1.72, z);
yaw = yw || 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
}
function llEnter(opt) { return __ZC(306, 69, this, arguments, new.target); }
function llLeave() {
LL.guide = null;
worldCard(null);
worldBanner(null);
if (typeof llGameClose === "function")
try {
llGameClose(true);
}
catch (e) { }
}
function llBack() {
if (typeof llGameOpen === "function" && llGameOpen()) {
llGameClose();
return;
}
llGoOut();
}
function llGoOut() {
var house = LL.where === "house";
if (typeof llGameClose === "function")
try {
llGameClose(true);
}
catch (e) { }
worldHome(house ? "<b>Out on the Crescent.</b> GiGi's House behind you, its windows warm." : "<b>Back out in Somnucor.</b> GiGi's Lounge behind you, its sign glowing softly.");
}
function llTick(dt) { return __ZC(306, 70, this, arguments, new.target); }
function llTalk(T) { if (!T)
return; try {
if (T.p && T.p.g)
wFace(T.p.g, camera.position.x - LL.base, camera.position.z);
}
catch (e) { } wTalk(T.t); }
function llTalkTo(key) { var f = LL_FOLK[key]; if (!f)
return; for (var i = 0; i < LL.talk.length; i++)
if (LL.talk[i].name === f.name) {
llTalk(LL.talk[i]);
return;
} }
function llTalkBtn(key) { var f = LL_FOLK[key]; return f ? worldBtn("talk", "💬 Talk with " + esc(f.name), null) : ""; }
function llFiguresTick(dt, L) { return __ZC(306, 71, this, arguments, new.target); }
function llBannerTick(L) { return __ZC(306, 72, this, arguments, new.target); }
function llShowWay(k) {
var p = LL_PLACES[k];
if (!p)
return;
LL.guide = { x: p.x, z: p.z, name: p.name };
worldCard(null);
setStatus("<b>" + esc(p.name) + "</b>: follow the arrow on the banner at the top.");
}
function llScreensAll() { LL.screens.forEach(function (S) { try {
llScreenDraw(S);
}
catch (e) { } }); }
function llPaper(x, W, H, title) { return __ZC(306, 73, this, arguments, new.target); }
function llWrap(x, text, cx, y, maxW, lh, maxLines) { return __ZC(306, 74, this, arguments, new.target); }
function llGameName(g) { return ({ klondike: "Klondike solitaire", freecell: "FreeCell", mjsol: "Mahjong solitaire", bingo: "Bingo", mahjong: "Mahjong", spades: "Spades", hearts: "Hearts", gin: "Gin Rummy", dominoes: "Dominoes", farkle: "Farkle" })[g] || g; }
function llSecs(s) { s = Math.max(0, Math.round(+s || 0)); var m = Math.floor(s / 60); return m + ":" + ("0" + (s % 60)).slice(-2); }
function llScreenDraw(S) { return __ZC(306, 75, this, arguments, new.target); }
"use strict";
var LLG = { on: null, G: null, el: null, cv: null, list: false, t0: 0, secs: 0, moves: 0, tourney: null, msg: "", won: false, hits: [], cyc: null, keyHook: false, tickAt: 0 };
function llGameOpen() { return !!LLG.on; }
function llVR() { return typeof VRM !== "undefined" && !!VRM.xr; }
function llGameEl() { return __ZC(306, 76, this, arguments, new.target); }
function llGameStart(G, opt) { return __ZC(306, 77, this, arguments, new.target); }
function llGameClose(quiet) {
if (!LLG.on)
return;
if (LLG.G && LLG.G.close)
try {
LLG.G.close();
}
catch (e) { }
LLG.on = null;
LLG.G = null;
if (LLG.el)
LLG.el.style.display = "none";
if (!quiet)
setStatus("<b>You put the game away.</b> Take a seat again whenever you like.");
}
function llSay(t) { LLG.msg = t || ""; var m = LLG.el && LLG.el.querySelector("#ll-g-msg"); if (m)
m.innerHTML = LLG.msg; }
function llMoved() { if (!LLG.t0)
LLG.t0 = Date.now(); LLG.moves++; }
function llClock() { return LLG.t0 ? (LLG.won ? LLG.secs : Math.round((Date.now() - LLG.t0) / 1000)) : 0; }
function llGameDraw() { return __ZC(306, 78, this, arguments, new.target); }
function llGameTick(dt) {
if (!LLG.on)
return;
if (LLG.G && LLG.G.tick)
try {
LLG.G.tick(dt);
}
catch (e) { }
if (LLG.on === "bingo" && typeof llBingoTick === "function")
try {
llBingoTick(dt, null);
}
catch (e) { }
LLG.tickAt -= dt;
if (LLG.tickAt > 0)
return;
LLG.tickAt = 1;
var head = LLG.el && LLG.el.querySelector("#ll-g-head span[style*='margin-left']");
if (head)
head.textContent = "⏱ " + llSecs(llClock()) + (LLG.G && LLG.G.noMoves ? "" : " · " + LLG.moves + " moves");
}
(function () {
var last = 0;
function loop(t) { var dt = last ? (t - last) / 1000 : 0; last = t; try {
llGameTick(Math.min(dt, 0.5));
}
catch (e) { } requestAnimationFrame(loop); }
if (typeof requestAnimationFrame === "function")
requestAnimationFrame(loop);
})();
function llHit(x, y, w, h, o) { o.x = x; o.y = y; o.w = w; o.h = h; LLG.hits.push(o); return o; }
function llHitAt(px, py) { for (var i = LLG.hits.length - 1; i >= 0; i--) {
var h = LLG.hits[i];
if (px >= h.x && px <= h.x + h.w && py >= h.y && py <= h.y + h.h)
return h;
} return null; }
function llGameWon(game) { return __ZC(306, 79, this, arguments, new.target); }
function llTapCycle(from, idx, dests, doMove, undo) { return __ZC(306, 80, this, arguments, new.target); }
var LL_SUIT = ["♠", "♥", "♦", "♣"], LL_RANK = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
function llRed(c) { return c.s === 1 || c.s === 2; }
function llCardName(c) { return LL_RANK[c.r] + LL_SUIT[c.s]; }
function llDeck() { var d = []; for (var s = 0; s < 4; s++)
for (var r = 1; r <= 13; r++)
d.push({ s: s, r: r, up: false }); return d; }
function llShuffle(a, seed) { var R = wRand(seed || ((Math.random() * 1e9) | 0)); for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(R() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
function llRound(x, X, Y, w, h, r) {
x.beginPath();
x.moveTo(X + r, Y);
x.lineTo(X + w - r, Y);
x.quadraticCurveTo(X + w, Y, X + w, Y + r);
x.lineTo(X + w, Y + h - r);
x.quadraticCurveTo(X + w, Y + h, X + w - r, Y + h);
x.lineTo(X + r, Y + h);
x.quadraticCurveTo(X, Y + h, X, Y + h - r);
x.lineTo(X, Y + r);
x.quadraticCurveTo(X, Y, X + r, Y);
x.closePath();
}
function llDrawCard(x, c, X, Y, w, h, sel) { return __ZC(306, 81, this, arguments, new.target); }
function llKlondike(opt) { return __ZC(306, 82, this, arguments, new.target); }
function llFreecellDeal(n) { return __ZC(306, 83, this, arguments, new.target); }
function llFreecell(opt) { return __ZC(306, 84, this, arguments, new.target); }
"use strict";
var LL_WIND = ["East", "South", "West", "North"], LL_WINDC = ["東", "南", "西", "北"], LL_NUMC = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
var LL_FLOWER = [["Plum", "梅"], ["Orchid", "蘭"], ["Chrysanthemum", "菊"], ["Bamboo flower", "竹"]], LL_SEASON = [["Spring", "春"], ["Summer", "夏"], ["Autumn", "秋"], ["Winter", "冬"]];
function llTileName(t) {
if (t < 9)
return (t + 1) + " Dots";
if (t < 18)
return (t - 8) + " Bamboo";
if (t < 27)
return (t - 17) + " Characters";
if (t < 31)
return LL_WIND[t - 27] + " wind";
if (t < 34)
return ["Red", "Green", "White"][t - 31] + " dragon";
if (t < 38)
return LL_FLOWER[t - 34][0];
return LL_SEASON[t - 38][0];
}
function llTileShort(t) { if (t < 27)
return (t % 9 + 1) + "DBC"[Math.floor(t / 9)]; if (t < 31)
return "ESWN"[t - 27]; if (t < 34)
return ["Rd", "Gd", "Wd"][t - 31]; return t < 38 ? "F" + (t - 33) : "S" + (t - 37); }
function llTileMatch(a, b) { if (a === b)
return true; if (a >= 34 && a < 38 && b >= 34 && b < 38)
return true; if (a >= 38 && b >= 38)
return true; return false; }
var LL_TILEC = {};
function llTileFace(t, w, h) { return __ZC(306, 85, this, arguments, new.target); }
function llDrawTile(x, t, X, Y, w, h, o) { return __ZC(306, 86, this, arguments, new.target); }
function llTurtle() { return __ZC(306, 87, this, arguments, new.target); }
function llMjFree(T, i, alive) { return __ZC(306, 88, this, arguments, new.target); }
function llMjDeal(seed) { return __ZC(306, 89, this, arguments, new.target); }
function llMjSol(opt) { return __ZC(306, 90, this, arguments, new.target); }
var LL_MJ_PLAYERS = ["You", "Dorothy", "Mr. Abernathy", "Rosalie"];
function llMjCounts(tiles) { var c = new Array(34).fill(0); tiles.forEach(function (t) { c[t]++; }); return c; }
function llMjSets(c, need) { return __ZC(306, 91, this, arguments, new.target); }
function llMjWins(tiles, melds) { return __ZC(306, 92, this, arguments, new.target); }
function llMjSort(h) { return h.sort(function (a, b) { return a - b; }); }
function llMjUse(h, t) {
var c = llMjCounts(h), u = (c[t] - 1) * 3;
if (t < 27) {
var m = t % 9;
if (m > 0 && c[t - 1])
u += 2;
if (m < 8 && c[t + 1])
u += 2;
if (m > 1 && c[t - 2])
u += 1;
if (m < 7 && c[t + 2])
u += 1;
if (m === 0 || m === 8)
u -= 0.3;
}
else
u -= 0.6;
return u;
}
function llMahjongTable() { return __ZC(306, 93, this, arguments, new.target); }
"use strict";
var LL_PATTERNS = { line: "Any line", corners: "Four corners", x: "The X", full: "Full house" };
var LL_CALLS = { 1: "Kelly's eye, number one", 7: "Lucky seven", 8: "One fat lady, number eight", 11: "Legs eleven", 13: "Unlucky for some, thirteen", 21: "Key of the door, twenty-one",
22: "Two little ducks, twenty-two", 44: "Droopy drawers, forty-four", 45: "Halfway there, forty-five", 50: "Half a century, fifty", 66: "Clickety-click, sixty-six",
69: "Either way up, sixty-nine", 71: "Bang on the drum, seventy-one", 75: "Strive and strive, seventy-five", 3: "Cup of tea, number three", 10: "GiGi's den, number ten" };
function llBallName(n) { return "BINGO"[Math.floor((n - 1) / 15)] + " " + n; }
function llCardCols(seed) {
var R = wRand(seed), card = [];
for (var c = 0; c < 5; c++) {
var pool = [];
for (var k = 1; k <= 15; k++)
pool.push(c * 15 + k);
for (var r = 0; r < 5; r++) {
var i = Math.floor(R() * pool.length);
card[r * 5 + c] = pool.splice(i, 1)[0];
}
}
card[12] = 0;
return card;
}
function llCardWins(card, called, pattern) { return __ZC(306, 94, this, arguments, new.target); }
function llBingoPractice() {
var calls = llShuffle(Array.from({ length: 75 }, function (_, i) { return i + 1; })), pats = ["line", "corners", "x", "full"];
LL.practice = { id: "practice", pattern: pats[Math.floor(Math.random() * 4)], all: calls, t0: Date.now() + 8000, pace: 4500, winners: [], host_name: "Delphine (practice)" };
return LL.practice;
}
function llBingoNow() { return __ZC(306, 95, this, arguments, new.target); }
function llBingoLoad() { return __ZC(306, 96, this, arguments, new.target); }
function llBallCalled(n) { return __ZC(306, 97, this, arguments, new.target); }
function llBingoLine() { return __ZC(306, 98, this, arguments, new.target); }
function llBingoTick(dt, L) { return __ZC(306, 99, this, arguments, new.target); }
function llBingoOpen() { return __ZC(306, 100, this, arguments, new.target); }
function llBingoKey() { var g = LL.bingo && LL.bingo.game; return g ? String(g.id) : "none"; }
function llMyCard() { var B = LL.bingo || {}; if (B.practice)
return B.myCard && B.myCard.id === B.practice.t0 ? B.myCard.card : null; return B.card || null; }
function llBingoTake() { return __ZC(306, 101, this, arguments, new.target); }
function llBingoMaybeShout() {
var B = LL.bingo, g = B.game, c = llMyCard();
if (!g || !c || g.status === "done")
return;
if (llCardWins(c, g.calls || [], g.pattern) && !B.shoutAt) {
llSay("🌹 <b>Your card is full for " + esc(LL_PATTERNS[g.pattern]) + "!</b> Press <b>BINGO!</b>");
}
}
function llBingoShout() { return __ZC(306, 102, this, arguments, new.target); }
function llBingoDraw(x, W, H) { return __ZC(306, 103, this, arguments, new.target); }
function llCallerCard() { return __ZC(306, 104, this, arguments, new.target); }
function llBingoHost(p) {
cityRpc("lounge_bingo_host", { p_pattern: p, p_pace: LL.bingoPace || 6 }).then(function (o) { llMsg(esc((o && o.say) || "The balls are in the cage.")); LL.bingo.tAt = 0; llBingoLoad(); })
.catch(function (e) { llMsg(llSoft(e)); });
}
function llHead(title, sub) { return "<div style='font:600 17px var(--serif,Georgia);color:#F2D9A8'>" + esc(title) + "</div>" + (sub ? "<div style='opacity:.82;margin-bottom:6px'>" + sub + "</div>" : ""); }
function llMsg(t) { var e = document.getElementById("ll-msg"); if (e)
e.innerHTML = t;
else
setStatus(t); }
function llPrizesCard() { return __ZC(306, 105, this, arguments, new.target); }
function llTourneys() { return ((LL.state && LL.state.tourneys) || []); }
function llTourneyCard() { return __ZC(306, 106, this, arguments, new.target); }
function llDaySeed(g) { var d = new Date(); return llHash(g + "|" + d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate()) % 1000000000; }
function llWhen(iso) { if (!iso)
return ""; var t = new Date(iso), m = Math.round((t - Date.now()) / 60000); if (m <= 0)
return "now"; if (m < 60)
return "in " + m + " min"; var h = Math.round(m / 60); return "in " + h + " hour" + (h > 1 ? "s" : ""); }
function llTourneyPlay(q) { return __ZC(306, 107, this, arguments, new.target); }
function llTourneyDesk() { return __ZC(306, 108, this, arguments, new.target); }
function llTourneyOpen(game, hours) { return __ZC(306, 109, this, arguments, new.target); }
function llTourneyClose(id) {
cityRpc("lounge_tourney_close", { p_id: id }).then(function (o) { llMsg(esc((o && o.say) || "Closed.")); return llLoadState(true); }).then(function () { llScreensAll(); llTourneyDesk(); }).catch(function (e) { llMsg(llSoft(e)); });
}
function llTrophyCard() { return __ZC(306, 110, this, arguments, new.target); }
"use strict";
function llCardsGo(kind) {
worldCard(null);
if (kind === "freecell")
llGameStart(llFreecell({}), { msg: "Tap a card and it goes where it can. Four free cells hold one card each." });
else
llGameStart(llKlondike({ three: kind === "klondike3" }), { msg: "Tap a card and it goes where it can; tap the deck to turn a card over." });
}
function llMahjongGo(kind) {
worldCard(null);
if (kind === "mahjong")
llGameStart(llMahjongTable(), {});
else
llGameStart(llMjSol({}), { msg: "Match two free tiles that are the same (any flower with any flower, any season with any season). A tile is free when nothing is on it and its left or right side is open." });
}
function llCardsMenu() { return __ZC(306, 111, this, arguments, new.target); }
function llMahjongMenu() { return __ZC(306, 112, this, arguments, new.target); }
function llMahjongLesson() { return __ZC(306, 113, this, arguments, new.target); }
function llCityGames() { worldCard(null); if (typeof gmsOpen === "function")
gmsOpen();
else
setStatus("The friendly tables are being set up."); }
function llConcierge() { return __ZC(306, 114, this, arguments, new.target); }
function llCoat() { setStatus("<b>The coat room attendant takes your coat</b> and hands you a little gold ticket: number " + (1 + Math.floor(Math.random() * 240)) + "."); }
function llTonightCard() { return __ZC(306, 115, this, arguments, new.target); }
var LL_MENU = {
tea: [["ll_tea_rose", "A pot of rose petal tea", 3, 0, 35], ["ll_tea_earl", "A pot of Earl Grey", 3, 0, 35], ["ll_tea_cream", "Cream tea: two scones, jam and clotted cream", 8, 40, 10],
["ll_tea_high", "Afternoon tea for one: sandwiches, scones and little cakes", 16, 70, 20], ["ll_tea_lemon", "A slice of lemon drizzle cake", 4, 25, 0], ["ll_tea_vic", "A slice of Victoria sponge", 4, 25, 0],
["ll_tea_macaron", "Six rose and pistachio macarons", 6, 20, 0], ["ll_tea_lemonade", "A glass of pink lemonade", 3, 0, 35]],
cart: [["ll_cart_choc", "A box of chocolate truffles", 5, 20, 0], ["ll_cart_fudge", "Vanilla fudge", 3, 15, 0], ["ll_cart_violet", "Violet creams", 4, 15, 0], ["ll_cart_tea", "A cup of tea from the urn", 2, 0, 30], ["ll_cart_water", "A glass of iced water", 1, 0, 25]],
dining: [["ll_din_soup", "Chilled cucumber and mint soup", 6, 20, 10], ["ll_din_risotto", "Wild mushroom risotto", 14, 55, 0], ["ll_din_salmon", "Poached salmon, new potatoes and asparagus", 18, 60, 0],
["ll_din_beef", "Beef Wellington with roasted roots", 24, 75, 0], ["ll_din_souffle", "A raspberry soufflé", 8, 25, 0], ["ll_din_sparkle", "A glass of sparkling elderflower", 4, 0, 35],
["ll_din_tasting", "The Magnolia tasting menu: five courses", 40, 100, 30]],
poolbar: [["ll_pool_lemonade", "Pink lemonade over crushed ice", 3, 0, 40], ["ll_pool_parasol", "A Pink Parasol: passion fruit, lime and soda", 5, 0, 40], ["ll_pool_smoothie", "A strawberry and banana smoothie", 5, 10, 35],
["ll_pool_club", "A club sandwich and crisps", 9, 45, 0], ["ll_pool_fruit", "A bowl of fresh fruit", 5, 25, 10], ["ll_pool_ice", "Two scoops of ice cream", 4, 20, 0], ["ll_pool_water", "A bottle of cold water", 1, 0, 30]],
minibar: [["ll_mini_water", "A bottle of spring water", 2, 0, 30], ["ll_mini_juice", "A little bottle of orange juice", 3, 0, 30], ["ll_mini_soda", "A bottle of ginger ale", 2, 0, 30],
["ll_mini_choc", "A bar of rose chocolate", 3, 15, 0], ["ll_mini_nuts", "A tin of salted almonds", 3, 15, 0]],
roomservice: [["ll_rs_breakfast", "Breakfast in bed: eggs, toast, fruit and tea", 14, 60, 25], ["ll_rs_burger", "The Lounge burger and fries", 12, 65, 0], ["ll_rs_pasta", "Spaghetti with tomato and basil", 10, 55, 0],
["ll_rs_cake", "A slice of chocolate cake", 5, 25, 0], ["ll_rs_cocoa", "Hot cocoa and shortbread", 5, 15, 30], ["ll_rs_tea", "A pot of tea for two", 4, 0, 40]],
florist: [["ll_flower_button", "A rose buttonhole", 4, 0, 0, 1], ["ll_flower_posy", "A posy of sweet peas", 8, 0, 0, 1], ["ll_flower_orchid", "A potted orchid", 22, 0, 0, 1], ["ll_flower_bouquet", "A bouquet of pink roses and lilies", 30, 0, 0, 1]]
};
function llMenuCard(k) { return __ZC(306, 116, this, arguments, new.target); }
function llBuy(m) { return __ZC(306, 117, this, arguments, new.target); }
var LL_TUNES = { waltz: [[392, 1], [523, 1], [659, 1], [587, 2], [523, 1], [440, 1], [523, 3], [392, 1], [494, 1], [587, 1], [523, 2], [494, 1], [440, 3]],
tender: [[523, 2], [587, 1], [659, 2], [587, 1], [523, 2], [440, 2], [392, 3], [440, 1], [523, 2], [494, 2], [523, 4]],
lively: [[523, 1], [659, 1], [784, 1], [659, 1], [698, 1], [587, 1], [523, 2], [587, 1], [659, 1], [698, 1], [784, 2], [659, 1], [523, 3]] };
function llTune(k) {
var T = LL_TUNES[k] || LL_TUNES.waltz, at = 0, beat = 0.36;
if (typeof playTone !== "function")
return;
T.forEach(function (n) { setTimeout(function () { playTone(n[0], Math.min(1.2, n[1] * beat * 0.9)); }, at * 1000); at += n[1] * beat; });
}
function llPianoCard() { return __ZC(306, 118, this, arguments, new.target); }
function llPlayPiano() { return __ZC(306, 119, this, arguments, new.target); }
function llRest(where) {
if (typeof togEmote === "function" && typeof TOG !== "undefined")
try {
togEmote("sit");
}
catch (e) { }
setStatus("<b>You rest in " + esc(where) + ".</b> Soft cushions, the glow of the lamps, the murmur of a good evening.");
}
var LL_BOOKS = [["A Garden of Verses", "Short poems about roses, rain and grandchildren, to read aloud."], ["The Lounge's Book of Patience", "Forty solitaire games, with drawings of every lay-out."],
["Teatime Treasures", "Recipes for scones, sponges and the perfect pot."], ["The Velvet Mystery", "A gentle detective story set in a seaside hotel."], ["Letters Home", "A volume of kind letters between old friends."]];
function llReadCard() { return __ZC(306, 120, this, arguments, new.target); }
var LL_SHOWS = [["The Garden Hour", "Roses, peonies and a walled garden in June", ["#4A7A4A", "#C88AAE", "#E8C8A0"]], ["Ballroom Nights", "An old musical: gowns, waltzes and a grand staircase", ["#3A1A4A", "#C9A868", "#D88AB8"]],
["The Gazette at Seven", "The news from Somnucor", ["#2A3A5A", "#B4B8C4", "#E2D8D0"]], ["Seaside Postcards", "Waves, gulls and a long pier at sunset", ["#2A5A7A", "#E8A070", "#F2E4D8"]]];
function llTVCard() { return __ZC(306, 121, this, arguments, new.target); }
function llTVOn(i) { return __ZC(306, 122, this, arguments, new.target); }
function llTVDraw(T) { return __ZC(306, 123, this, arguments, new.target); }
var LL_SHOP = ["ll_keep_teacup", "ll_keep_compact", "ll_keep_scarf", "ll_keep_cushion", "ll_keep_tiles", "ll_keep_cards", "ll_keep_dauber", "ll_keep_globe", "ll_keep_frame", "ll_keep_pearls", "ll_keep_bear", "ll_keep_candle", "ll_keep_robe", "ll_keep_swan", "ll_keep_dominoes", "ll_keep_dice", "ll_keep_towel"];
function llShopCard(msg) { return __ZC(306, 124, this, arguments, new.target); }
function llBuyThing(r) {
if (!llSigned())
return llMsg("Sign in to buy.");
if (LL.buying || typeof buyItem !== "function")
return;
LL.buying = true;
llMsg("…");
buyItem(r.id).then(function (o) { LL.buying = false; llShopCard(o === "ok" ? "<b>" + esc(r.name) + "</b> is in your backpack." : esc(String(o || "Not now."))); });
}
function llOfficeCard() { return __ZC(306, 125, this, arguments, new.target); }
function llNoticeCard() { return __ZC(306, 126, this, arguments, new.target); }
function llNoticeSet(t) {
cityRpc("lounge_notice_set", { p_text: String(t || "").slice(0, 200) }).then(function (o) { llMsg(esc((o && o.say) || "On the board.")); return llLoadState(true); }).then(llScreensAll).catch(function (e) { llMsg(llSoft(e)); });
}
function llAssistantCard() { return __ZC(306, 127, this, arguments, new.target); }
function llStaffBoard() { return __ZC(306, 128, this, arguments, new.target); }
function llWorkHere() {
if (!llIsStaff())
return setStatus("Staff only.");
setStatus("<b>You get to work.</b>" + (llJobs().length ? " Your shift's tasks are on your work card: open it to clock in and work your post." : " The Keeper's hands are always welcome."));
}
function llSecurityCard() {
worldCard(llHead("The security desk", "Eight soft screens, the day log and a pot of tea.") +
"<div>Every room is calm. Security here are trained to keep the peace kindly; anything serious goes to the Dragon Corp, and nobody is punished without a trial at the court.</div>");
}
function llManagerCard() { return __ZC(306, 129, this, arguments, new.target); }
"use strict";
var LL_JOB_IDS = [];
for (var lli = 3300; lli <= 3353; lli++)
if (lli !== 3323)
LL_JOB_IDS.push(lli);
if (typeof cityWorkplace === "function")
cityWorkplace({ key: LL_KEY, ring: "markets", arch: "palace", s: 0.62, jobs: LL_JOB_IDS,
fit: ["desk", "noticeboard", "shelfgoods", "crates", "workbench"],
note: "A plush game house and a grand hotel resort in plum, rose, gold and silver: Bingo, Mahjong, solitaire, FreeCell and tournaments, the Rose Tea Room and the Treasure Box; and through the foyer the hotel, the Magnolia Room, the Starlight Ballroom, the gardens and maze, the pools, the Garden Pavilion (dominoes, spades, hearts, gin, farkle) and the Rosewater Spa. Made for our Grandmother, GiGi, who owns and runs it." });
function llFrontage(C, arch, s, rs, k0, sides, name, extra) {
var w = kitW(arch, s), d = kitD(arch, s);
var stand = store.objects.filter(function (o) { return o.realm === C.r.id && KIT[o.archetype] && KIT[o.archetype].cat !== "being" && !(typeof NOWALL !== "undefined" && NOWALL[o.archetype] && o.archetype !== "signboard"); })
.map(function (o) { var k = KIT[o.archetype], ss = (o.attrs && o.attrs.s) || 1; return { x: o.x, z: o.z, r: Math.max(k.size[0] * (o.attrs && o.attrs.w || 1), k.size[2] * (o.attrs && o.attrs.d || 1)) * ss * 0.5 }; });
function clear(rr, a, rad) {
if (!atlClearAt(rr, a, rad, 4))
return false;
var x = C.h.x + Math.cos(a) * rr, z = C.h.z + Math.sin(a) * rr;
for (var i = 0; i < stand.length; i++) {
var q = stand[i], dx = q.x - x, dz = q.z - z, m = q.r + rad;
if (dx * dx + dz * dz < m * m)
return false;
}
return true;
}
var main = ATL_STAIRS.filter(function (st) { return st.main; }), got = null;
(sides || [1, -1]).forEach(function (side) {
if (got)
return;
var rb = rs + side * (ATL_ROAD + ATL_SETBACK + d / 2), rad = Math.max(w, d) / 2 + 3;
for (var k = 0; k < main.length && !got; k++)
for (var t = 0; t < (Math.PI / 4) * rb && !got; t += 3) {
var a = main[(k + k0) % main.length].a + (ATL_MAIN_HALF + w / 2 + 8 + t) / rb;
if (clear(rb, a, rad))
got = { side: side, a: a, rb: rb };
}
});
if (!got)
return null;
var f = C.front(arch, rs, got.side, got.a, s, name, extra);
if (!f || !f.spec)
return null;
return { spec: f.spec, a: got.a, side: got.side, rs: rs, w: w, d: d, rb: f.rb };
}
var LLC_CITY = { lounge: null, house: null };
if (typeof cityMore === "function")
cityMore("xll", function (C) {
var f = cityFrontage(C, LL_KEY, 245, 2) || cityFrontage(C, LL_KEY, 245, 5) || cityFrontage(C, LL_KEY, 1080, 3) || cityFrontage(C, LL_KEY, 1080, 6);
if (f && f.spec) {
f.spec.attrs.c = 0xA8789E;
f.spec.attrs.rc = 0xB8945A;
LLC_CITY.lounge = { side: f.side, w: f.w, d: f.d, a: f.a };
var kb = C.kerb(f.rs, f.side), face = f.side > 0 ? rotIn(f.a) : rotOut(f.a);
C.at("ornatelamp", kb, f.a + (f.w / 2 - 2) / kb, 0);
C.at("ornatelamp", kb, f.a - (f.w / 2 - 2) / kb, 0);
C.at("flowerbed", kb + f.side * 3, f.a + (f.w / 4) / kb, face);
C.at("flowerbed", kb + f.side * 3, f.a - (f.w / 4) / kb, face);
}
var hs = llFrontage(C, "manor", 1.05, 430, 4, [1, -1], LL_HOUSE, { estate: true, llHouse: true }) || llFrontage(C, "manor", 1.05, 565, 2, [1, -1], LL_HOUSE, { estate: true, llHouse: true });
if (hs && hs.spec) {
hs.spec.attrs.c = 0xC8A8CC;
hs.spec.attrs.rc = 0xB8945A;
LLC_CITY.house = { side: hs.side, w: hs.w, d: hs.d, a: hs.a };
var kb2 = C.kerb(hs.rs, hs.side), face2 = hs.side > 0 ? rotIn(hs.a) : rotOut(hs.a);
C.at("llgate", kb2, hs.a, face2, null, {});
C.at("topiary", kb2 + hs.side * 2, hs.a + 7 / kb2, 0);
C.at("topiary", kb2 + hs.side * 2, hs.a - 7 / kb2, 0);
C.at("ornatelamp", kb2, hs.a + 11 / kb2, 0);
C.at("ornatelamp", kb2, hs.a - 11 / kb2, 0);
var street = hs.rs === 430 ? "The Crescent" : "Backers Street";
var plot = { name: LL_HOUSE, quarter: "The Somnucor Employee & Backer District", kind: "district", price: 0, rent: 0, x: hs.spec.x, z: hs.spec.z, homeId: hs.spec.id, archetype: "manor", street: street };
var board = C.at("signboard", kb2, hs.a + 15 / kb2, face2, LL_HOUSE);
if (board) {
board.plot = plot;
board.sign = LL_HOUSE;
board.note = "GiGi's own house, done in plum, rose and gold. Assigned, never bought.";
}
C.district.push(plot);
}
});
var LLX = { plum: 0x4A1E44, plumD: 0x2A1430, rose: 0xE2C4D0, blush: 0xE8CCD8, gold: 0xC9A44E, silver: 0xD8D8E2, pink: 0xD8789E, pinkL: 0xEFA8C4, leaf: 0x3A6A3A };
function llCrest(cx, cy, cz, r, ry) {
var P = [], c = Math.cos(ry || 0), sn = Math.sin(ry || 0);
function at(x, y, z) { return [cx + x * r * c + z * r * sn, cy + y * r, cz - x * r * sn + z * r * c]; }
function q(g, sz, x, y, z, col, rot) {
var o = { g: g, s: sz.map(function (v, i) { return (g === "cyl" && i === 3) || (g === "tor" && false) ? v : v * r; }), p: at(x, y, z), c: col };
if (g === "cyl")
o.s[3] = sz[3];
o.r = rot || [0, ry || 0, 0];
P.push(o);
}
q("cyl", [1, 1, 0.14, 24], 0, 0, 0, LLX.plum, [Math.PI / 2, 0, ry || 0]);
q("tor", [1.0, 0.09], 0, 0, 0, LLX.gold);
q("tor", [0.82, 0.035], 0, 0, 0, LLX.silver);
[-1, 1].forEach(function (f) {
var z = f * 0.09;
var m = f;
for (var k = 0; k < 16; k++) {
var t = (40 + k * (290 / 15)) * Math.PI / 180;
q("box", [0.2, 0.14, 0.06], m * 0.52 * Math.cos(t), 0.52 * Math.sin(t), z, LLX.gold, [0, 0, m * (t + Math.PI / 2)]);
}
q("box", [0.13, 0.36, 0.06], m * 0.47, -0.14, z, LLX.gold);
q("box", [0.36, 0.12, 0.06], m * 0.32, 0.03, z, LLX.gold);
q("tor", [0.1, 0.035], m * 0.5, 0.45, z, LLX.gold);
q("tor", [0.12, 0.035], m * -0.62, -0.44, z, LLX.gold);
q("sph", [0.055], m * 0.14, 0.03, z, LLX.gold);
q("sph", [0.04], 0, 0.9, z, LLX.silver);
q("sph", [0.04], 0, -0.9, z, LLX.silver);
q("sph", [0.04], 0.9, 0, z, LLX.silver);
q("sph", [0.04], -0.9, 0, z, LLX.silver);
});
return P;
}
(function () {
if (typeof S !== "function" || typeof KIT === "undefined")
return;
var X = LLX, P = [];
[-8, 8].forEach(function (x) {
P.push({ g: "box", s: [2.4, 1, 2.4], p: [x, .5, 0], c: X.plum }, { g: "box", s: [1.8, 6.4, 1.8], p: [x, 4.2, 0], c: X.rose }, { g: "box", s: [2.1, .3, 2.1], p: [x, 2.2, 0], c: X.gold }, { g: "box", s: [2.3, .45, 2.3], p: [x, 7.6, 0], c: X.gold }, { g: "cyl", s: [.5, .7, .8, 12], p: [x, 8.2, 0], c: X.gold }, { g: "sph", s: [.62], p: [x, 8.9, 0], c: X.rose }, { g: "cyl", s: [.06, .06, .6, 6], p: [x, 9.7, 0], c: X.gold }, { g: "sph", s: [.34], p: [x, 10.1, 0], c: 0xFFE4C8, glow: 1, opa: .9 });
P.push.apply(P, llCrest(x, 5.2, 0.95, .55, 0));
P.push.apply(P, llCrest(x, 5.2, -0.95, .55, 0));
});
P.push({ g: "box", s: [.12, 4.6, .12], p: [-6.5, 2.8, 0], c: X.plumD, rep: [27, .5, 0, 0] }, { g: "cone", s: [.13, .4, 6], p: [-6.5, 5.3, 0], c: X.gold, rep: [27, .5, 0, 0] }, { g: "box", s: [13.6, .22, .22], p: [0, .7, 0], c: X.plumD }, { g: "box", s: [13.6, .22, .22], p: [0, 4.6, 0], c: X.plumD }, { g: "box", s: [13.6, .12, .3], p: [0, 2.6, 0], c: X.gold }, { g: "tor", s: [.42, .05], p: [-5.5, 1.65, 0], c: X.gold, rep: [6, 2.2, 0, 0] }, { g: "tor", s: [.42, .05], p: [-4.4, 3.6, 0], c: X.gold, rep: [5, 2.2, 0, 0] }, { g: "tor", s: [.7, .07], p: [-2.6, 5.2, 0], c: X.gold }, { g: "tor", s: [.7, .07], p: [2.6, 5.2, 0], c: X.gold }, { g: "tor", s: [.36, .05], p: [-3.9, 5.0, 0], c: X.gold }, { g: "tor", s: [.36, .05], p: [3.9, 5.0, 0], c: X.gold });
P.push.apply(P, llCrest(0, 6.3, 0, 1.45, 0));
S("llgate", "infra", [18, 10.5, 2.4], P, ["GiGi's gate"]);
if (typeof NOWALL !== "undefined")
NOWALL.llgate = 1;
if (typeof ATL_WALKTHROUGH !== "undefined")
ATL_WALKTHROUGH.llgate = 1;
var H = [];
H.push.apply(H, llCrest(0, 10.6, 7.8, 1.0, 0));
for (var i = 0; i < 7; i++) {
if (i === 3)
continue;
var wx = -8.4 + i * 2.8;
H.push({ g: "box", s: [1.6, .42, .5], p: [wx, 1.3, 4.9], c: X.plum }, { g: "box", s: [1.7, .08, .56], p: [wx, 1.53, 4.9], c: X.gold }, { g: "sph", s: [.2], p: [wx - .55, 1.72, 4.92], c: X.pink, rep: [4, .37, 0, 0] }, { g: "sph", s: [.16], p: [wx - .36, 1.78, 4.95], c: X.pinkL, rep: [3, .37, 0, 0] });
}
[-3, -1, 1, 3].forEach(function (x) { H.push({ g: "sph", s: [.38], p: [x, .5, 7.3], c: X.pink }, { g: "sph", s: [.3], p: [x + .3, 1.2, 7.2], c: X.pinkL }, { g: "sph", s: [.3], p: [x - .25, .9, 7.4], c: X.leaf }); });
H.push({ g: "sph", s: [.24], p: [-14, 1.0, 11.5], c: X.pink, rep: [4, 2.2, 0, 0] }, { g: "sph", s: [.24], p: [7.4, 1.0, 11.5], c: X.pink, rep: [4, 2.2, 0, 0] }, { g: "sph", s: [.2], p: [-13, 1.05, 11.6], c: X.pinkL, rep: [4, 2.2, 0, 0] }, { g: "sph", s: [.2], p: [8.4, 1.05, 11.6], c: X.pinkL, rep: [4, 2.2, 0, 0] });
[-4.2, 4.2].forEach(function (x) { H.push({ g: "cyl", s: [.55, .35, .9, 12], p: [x, .85, 8.6], c: X.gold }, { g: "sph", s: [.6], p: [x, 1.6, 8.6], c: X.pink }, { g: "sph", s: [.32], p: [x + .3, 1.9, 8.7], c: X.pinkL }); });
S("llhousedress", "infra", [30, 12, 20], H);
var L = [];
L.push.apply(L, llCrest(0, 22.6, 1.3, 2.4, 0));
L.push.apply(L, llCrest(0, 6.0, 29.4, 1.5, 0));
L.push({ g: "box", s: [6.4, .35, 11], p: [0, 7.6, 6.2], c: X.plum }, { g: "box", s: [6.6, .12, 11.2], p: [0, 7.82, 6.2], c: X.gold }, { g: "box", s: [6.6, .7, .12], p: [0, 7.1, 11.75], c: X.plum }, { g: "box", s: [6.6, .1, .16], p: [0, 6.75, 11.78], c: X.gold }, { g: "box", s: [.12, .7, 11], p: [-3.25, 7.1, 6.2], c: X.plum }, { g: "box", s: [.12, .7, 11], p: [3.25, 7.1, 6.2], c: X.plum }, { g: "cyl", s: [.14, .14, 7.6, 8], p: [-3, 3.8, 11.6], c: X.gold }, { g: "cyl", s: [.14, .14, 7.6, 8], p: [3, 3.8, 11.6], c: X.gold }, { g: "cyl", s: [.14, .14, 7.6, 8], p: [-3, 3.8, 4.2], c: X.gold }, { g: "cyl", s: [.14, .14, 7.6, 8], p: [3, 3.8, 4.2], c: X.gold }, { g: "box", s: [3.2, .06, 13], p: [0, .24, 6.5], c: 0x7A2A5A });
[-26.5, 26.5].forEach(function (wx) {
[-4, 4].forEach(function (o) {
L.push({ g: "box", s: [3, 9, .14], p: [wx + o, 11, 24.7], c: X.plum }, { g: "box", s: [3.3, .25, .3], p: [wx + o, 15.6, 24.75], c: X.gold }, { g: "box", s: [3, .18, .16], p: [wx + o, 6.6, 24.72], c: X.gold });
L.push.apply(L, llCrest(wx + o, 11.6, 24.85, 1.0, 0));
});
});
[-1, 1].forEach(function (e) { L.push({ g: "sph", s: [.45], p: [e * 10.5 - 4.5, .7, 8], c: X.pink, rep: [5, 2.25, 0, 0], rep2: [5, 0, 0, 3] }, { g: "sph", s: [.35], p: [e * 10.5 - 3.4, .75, 9.5], c: X.pinkL, rep: [4, 2.25, 0, 0], rep2: [4, 0, 0, 3] }); });
S("llloungedress", "infra", [60, 26, 30], L);
})();
var LL_TINT = { 0xEDE4D0: 0xEACDD8, 0xE2D6BE: 0xDDBCCB, 0x55606E: 0x4E2A48, 0xC8A882: 0xC9A44E, 0x6FA394: 0x6A3A62,
0xE6DCC8: 0xE6C8D4, 0x4A4F58: 0x4E2A48, 0x5E7E76: 0xC9A44E };
(function () {
if (typeof resolveColor !== "function")
return;
var rc0 = resolveColor;
resolveColor = function (c, spec) {
var col = rc0.apply(this, arguments);
if (spec && spec.city && typeof col === "number" && LL_TINT[col] !== undefined && (llIsLounge(spec) || llIsHouse(spec)))
return LL_TINT[col];
return col;
};
})();
(function () {
if (typeof build !== "function")
return;
var bl = build;
build = function (spec) {
var g = bl.apply(this, arguments);
try {
var k = spec && spec.city ? (llIsHouse(spec) && spec.archetype === "manor" ? "llhousedress" : llIsLounge(spec) && spec.archetype === "palace" ? "llloungedress" : null) : null;
if (k && KIT[k]) {
var d = bl({ id: spec.id + "~ll", archetype: k, attrs: {}, city: true, hub: true, detail: 3 });
d.userData.id = null;
g.add(d);
}
}
catch (e) {
if (window.console)
console.warn("[lounge] outside", e);
}
return g;
};
})();
function llIsLounge(spec) { return !!(spec && spec.city && (spec.workplace === LL_KEY || spec.label === LL_KEY)); }
function llIsHouse(spec) { return !!(spec && spec.city && (spec.llHouse || spec.label === LL_HOUSE)); }
function llGoIn(spec, at) { return __ZC(306, 130, this, arguments, new.target); }
(function () {
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
if (llIsLounge(spec)) {
try {
return llGoIn(spec, "lounge");
}
catch (e) {
if (window.console)
console.warn("[lounge] in", e);
}
}
if (llIsHouse(spec)) {
try {
return llGoIn(spec, "house");
}
catch (e) {
if (window.console)
console.warn("[lounge] house", e);
}
}
return eb.apply(this, arguments);
};
}
if (typeof enterable === "function") {
var en = enterable;
enterable = function (spec) { if (llIsLounge(spec) || llIsHouse(spec))
return true; return en.apply(this, arguments); };
}
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { if (job && (job.workplace === LL_KEY || (+job.job_id >= LL_JOB0 && +job.job_id <= LL_JOB1)) && typeof WLD !== "undefined" && WLD.on === "lounge")
return true; return os.apply(this, arguments); };
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) { if (key === LL_KEY && typeof WLD !== "undefined" && WLD.on === "lounge")
return llShowWay("staff"); return sw.apply(this, arguments); };
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () { if (typeof WLD !== "undefined" && WLD.on === "lounge")
return LL.where === "house" ? null : { key: LL_KEY, inside: true }; return aw.apply(this, arguments); };
}
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-lounge]")) {
[["lounge", "👑 GiGi's Lounge"], ["house", "🏡 GiGi's House"]].forEach(function (q) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-lounge", q[0]);
b.textContent = q[1];
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } worldGo("lounge", { at: q[0] }); };
row.parentNode.appendChild(b);
});
}
}
catch (e) { }
return r;
};
}
if (typeof drawDesk === "function") {
var dd = drawDesk;
drawDesk = function (body) {
var r = dd.apply(this, arguments);
try {
if (typeof amKeeper === "function" && amKeeper() && body && !body.querySelector('[data-kd="lounge"]')) {
var any = body.querySelectorAll("[data-kd]"), last = any[any.length - 1];
if (last && last.parentNode) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kd", "lounge");
b.textContent = "👑 GiGi's Lounge";
b.onclick = function () { deskPane("lounge"); };
last.parentNode.appendChild(b);
}
}
}
catch (e) { }
return r;
};
}
if (typeof deskPane === "function") {
var dp = deskPane;
deskPane = function (which) { if (which === "lounge") {
var pane = document.getElementById("kd-pane");
if (pane)
llDeskPane(pane);
return;
} return dp.apply(this, arguments); };
}
})();
function llHousePlot() { return (store.districtPlots || []).filter(function (p) { return p.name === LL_HOUSE; })[0] || null; }
function llDeskPane(pane) { return __ZC(306, 131, this, arguments, new.target); }
"use strict";
var LTG = {};
var LTG_C = { gold: "#C9A868", cream: "#F2D9A8", sand: "#E8CFA0", rose: "#F2C8E0", pink: "#D88AB8", plum: "#6A3482", ink: "#2A1236" };
function ltgKey(o) {
if (o === null || typeof o !== "object")
return JSON.stringify(o);
if (Array.isArray(o))
return "[" + o.map(ltgKey).join(",") + "]";
return "{" + Object.keys(o).sort().map(function (k) { return JSON.stringify(k) + ":" + ltgKey(o[k]); }).join(",") + "}";
}
function ltgFind(L, m) { if (!m || typeof m !== "object")
return null; var k = ltgKey(m); for (var i = 0; i < L.length; i++)
if (L[i].m && ltgKey(L[i].m) === k)
return L[i]; return null; }
function ltgCopy(o) { return JSON.parse(JSON.stringify(o)); }
function ltgMix(seed, k) { return ((seed >>> 0) ^ Math.imul((k >>> 0) + 1, 2654435761)) >>> 0 || 1; }
function ltgRand(seed, k) { var R = wRand(ltgMix(seed, k)); R(); R(); return R; }
function ltgWho(p, me, names, low) { if (p === me)
return low ? "you" : "You"; return (names && names[p]) || ("Player " + (p + 1)); }
function ltgVb(p, me, a, b) { return p === me ? a : b; }
function ltgShort(s) { s = String(s); return s.length > 11 ? s.slice(0, 10) + "…" : s; }
function ltgNews(sy, me, names) {
if (!sy)
return "";
return sy.t.replace(/\{([^|}]*)\|([^}]*)\}/g, function (_, a, b) { return sy.p === me ? a : b; })
.replace(/([\^#])(\d)/g, function (_, k, d) { return ltgWho(+d, me, names, k === "#"); });
}
function ltgAnd(a) { return a.length < 2 ? (a[0] || "") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]; }
function ltgBest(sc, low) { var m = low ? Math.min.apply(null, sc) : Math.max.apply(null, sc), w = []; sc.forEach(function (v, i) { if (v === m)
w.push(i); }); return w; }
function ltgPause(ev) { return ev === "hand" || ev === "over" ? 3.5 : ev === "trick" ? 1.6 : ev === "farkle" ? 2.2 : ev === "roll" ? 1.2 : 0.9; }
function ltgN(v) { return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function ltgWinSay(w, names, tail) {
var who = w.map(function (p) { return names ? ltgWho(p, -9, names) : String(p); });
return (names ? "" : (w.length > 1 ? "Seats " : "Seat ")) + ltgAnd(who) + (w.length > 1 ? " win" : " wins") + tail;
}
function ltgStatus(S, me, names, doing, scores, overSay) {
var t = S.fin ? "<b>Game over.</b> " + esc(overSay) + " " : S.turn === me ? "<b>Your turn</b>: " + doing + ". " : "<b>" + esc(ltgWho(S.turn, me, names)) + "</b> is thinking. ";
return t + "<span style='opacity:.85'>" + esc(scores) + "</span>";
}
function ltgCd(c) { return { s: c.s, r: c.r }; }
function ltgEq(a, b) { return !!a && !!b && a.s === b.s && a.r === b.r; }
function ltgAt(h, c) { if (!c)
return -1; for (var i = 0; i < h.length; i++)
if (ltgEq(h[i], c))
return i; return -1; }
function ltgHi(r) { return r === 1 ? 14 : r; }
function ltgThe(c) { return "the " + llCardName(c); }
function ltgUp(c) { return { s: c.s, r: c.r, up: true }; }
var LTG_SO = [0, 1, 3, 2];
function ltgSortH(h, low) { return h.sort(function (a, b) { return LTG_SO[a.s] - LTG_SO[b.s] || (low ? a.r - b.r : ltgHi(a.r) - ltgHi(b.r)); }); }
function ltgSuits(h, low) {
var out = [];
[0, 1, 3, 2].forEach(function (s) {
var a = h.filter(function (c) { return c.s === s; });
if (a.length)
out.push(LL_SUIT[s] + " " + ltgSortH(a.slice(), low).map(function (c) { return LL_RANK[c.r]; }).join(" "));
});
return out.join("  ·  ") || "(none)";
}
function ltgCards(a) { return ltgAnd(a.map(llCardName)); }
function ltgFont(x, sz, b) { x.font = (b ? "bold " : "") + Math.round(sz) + "px Georgia"; }
function ltgT(x, t, X, Y, sz, col, al, b, maxW) {
ltgFont(x, sz, b);
if (maxW)
while (sz > 8 && x.measureText(t).width > maxW) {
sz -= 1;
ltgFont(x, sz, b);
}
x.fillStyle = col || LTG_C.sand;
x.textAlign = al || "left";
x.textBaseline = "middle";
x.fillText(t, X, Y);
x.textBaseline = "alphabetic";
}
function ltgLines(x, t, maxW, sz, b) {
ltgFont(x, sz, b);
var L = [], cur = "";
String(t).split(" ").forEach(function (w) { var nx = cur ? cur + " " + w : w; if (cur && x.measureText(nx).width > maxW) {
L.push(cur);
cur = w;
}
else
cur = nx; });
if (cur)
L.push(cur);
return L;
}
function ltgPara(x, t, X, Y, maxW, sz, col, b) { var L = ltgLines(x, t, maxW, sz, b); L.forEach(function (s, i) { ltgT(x, s, X, Y + i * sz * 1.3, sz, col, "center", b, maxW); }); return L.length * sz * 1.3; }
function ltgBtn(x, X, Y, w, h, label, hit, hot) { return __ZC(306, 132, this, arguments, new.target); }
function ltgBox(x, X, Y, w, h) { llRound(x, X, Y, w, h, 12); x.fillStyle = "rgba(36,14,46,.9)"; x.fill(); x.strokeStyle = LTG_C.gold; x.lineWidth = 1.5; x.stroke(); }
function ltgDim(x, X, Y, w, h) { llRound(x, X, Y, w, h, Math.max(3, Math.min(w, h) * 0.1)); x.fillStyle = "rgba(36,14,46,.45)"; x.fill(); }
function ltgResult(x, W, top, bot, title, lines, S, me, names, label) { return __ZC(306, 133, this, arguments, new.target); }
function ltgOpp(x, W, at, o) { return __ZC(306, 134, this, arguments, new.target); }
function ltgSpot(rel, n) { return n === 2 ? ["B", "T"][rel] : n === 3 ? ["B", "L", "R"][rel] : ["B", "L", "T", "R"][rel]; }
function ltgTricks(kind, seed, opt) { return __ZC(306, 135, this, arguments, new.target); }
function ltgGinVal(c) { return Math.min(10, c.r); }
function ltgGinBest(h) { return __ZC(306, 136, this, arguments, new.target); }
function ltgGinFits(c, m) {
if (m.every(function (x) { return x.r === m[0].r; }))
return c.r === m[0].r && m.length < 4;
if (c.s !== m[0].s)
return false;
var lo = Math.min.apply(null, m.map(function (x) { return x.r; })), hi = Math.max.apply(null, m.map(function (x) { return x.r; }));
return c.r === lo - 1 || c.r === hi + 1;
}
function ltgGinLay(h, melds) { return __ZC(306, 137, this, arguments, new.target); }
function ltgWithout(h, c) { var i = ltgAt(h, c), o = h.slice(); if (i >= 0)
o.splice(i, 1); return o; }
function ltgGin(seed, opt) { return __ZC(306, 138, this, arguments, new.target); }
var LTG_PIPS = { 0: [], 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
function ltgPips(x, n, cx, cy, s) {
var r = Math.max(1.3, s * 0.19);
x.fillStyle = LTG_C.ink;
LTG_PIPS[n].forEach(function (p) { x.beginPath(); x.arc(cx + p[0] * s * 0.55, cy + p[1] * s * 0.55, r, 0, 7); x.fill(); });
}
function ltgTile(x, a, b, X, Y, w, h, o) { return __ZC(306, 139, this, arguments, new.target); }
function ltgTn(t) { var w = ["blank", "1", "2", "3", "4", "5", "6"]; return t[0] === t[1] ? "double " + w[t[0]] : w[Math.max(t[0], t[1])] + "-" + w[Math.min(t[0], t[1])]; }
function ltgRound5(v) { return Math.round(v / 5) * 5; }
function ltgPipSum(h) { return h.reduce(function (s, t) { return s + t[0] + t[1]; }, 0); }
function ltgDominoes(seed, n, opt) { return __ZC(306, 140, this, arguments, new.target); }
function ltgFkScore(v) { return __ZC(306, 141, this, arguments, new.target); }
function ltgFkKeeps(v) { return __ZC(306, 142, this, arguments, new.target); }
function ltgFkSay(v) { return __ZC(306, 143, this, arguments, new.target); }
function ltgDie(x, v, X, Y, s, o) { return __ZC(306, 144, this, arguments, new.target); }
function ltgFarkle(seed, n, opt) { return __ZC(306, 145, this, arguments, new.target); }
LTG.spades = { key: "spades", title: "Spades", min: 4, max: 4, teams: true,
blurb: "Partners bid their tricks, and spades trump everything.",
rules: "<div><p><b>Spades</b> is for four, in two teams: you and the player sitting across from you are partners.</p>" +
"<p>All the cards are dealt out. Starting to the dealer's left, each player says how many tricks they expect to take. A bid of <b>Nil</b> is a promise to take none at all: 100 points if you manage it, minus 100 if you don't.</p>" +
"<p>The player to the dealer's left leads first, and whoever wins a trick leads the next. Follow the suit that was led if you can; if you can't, play anything. The highest card of the suit led takes the trick, unless someone plays a spade: spades beat every other suit. Nobody may lead a spade until a spade has been played, unless they hold nothing else.</p>" +
"<p>If a team takes at least as many tricks as its two bids added together, it scores ten for every trick bid and one for each trick over. If it falls short, it loses ten for every trick bid. Tricks taken by a Nil bidder don't help the partner's bid.</p>" +
"<p>Tricks over the bid are called <b>bags</b>. Every tenth bag costs the team 100 points, so it pays to bid honestly.</p>" +
"<p>The first team to 300 points wins (or the table's chosen target); a team that sinks to minus 200 loses.</p></div>",
make: function (seed, n, opt) { return ltgTricks("spades", seed, opt); } };
LTG.hearts = { key: "hearts", title: "Hearts", min: 4, max: 4, teams: false,
blurb: "Duck the hearts and dodge the Queen of Spades: lowest score wins.",
rules: "<div><p><b>Hearts</b> is for four, each playing for themselves. Here, low scores are good.</p>" +
"<p>Before each hand, everyone passes three cards: to the left, then to the right, then across, then a hand with no passing, and round again.</p>" +
"<p>Whoever holds the 2♣ leads it. Follow suit if you can; if you can't, play anything. The highest card of the suit led takes the trick, and its taker leads next. There are no trumps.</p>" +
"<p>Every heart you take costs you a point, and the Queen of Spades costs 13. On the very first trick nobody may throw a heart or the Queen unless they have nothing else. Hearts can't be led until a heart has been played, unless you hold nothing but hearts.</p>" +
"<p><b>Shooting the moon:</b> take every heart and the Queen too, and instead of 26 points for you, everyone else gets 26.</p>" +
"<p>When someone reaches 100 (or the table's chosen target), the game ends and the lowest score wins.</p></div>",
make: function (seed, n, opt) { return ltgTricks("hearts", seed, opt); } };
LTG.gin = { key: "gin", title: "Gin Rummy", min: 2, max: 2, teams: false,
blurb: "Two players draw, discard and knock: make runs and sets.",
rules: "<div><p><b>Gin Rummy</b> is for two. Each player gets ten cards; one card is turned up to start the discard pile and the rest make the stock.</p>" +
"<p>On your turn, take the top card of the stock or the top of the discard pile, then discard one card (not the one you just picked up from the pile).</p>" +
"<p>Try to arrange your cards into <b>melds</b>: runs of three or more in the same suit (A-2-3, 9-10-J…) and sets of three or four of the same rank. Each card can be in only one meld. Cards outside your melds are <b>deadwood</b>: aces count 1, picture cards 10, the rest their number. Aces are low.</p>" +
"<p>When your deadwood is 10 or less, you may <b>knock</b>: discard and lay your hand down. Your opponent shows theirs and may tack loose cards onto your melds. If your deadwood is lower, you score the difference. If theirs is the same or lower, that's an <b>undercut</b>: they score the difference plus 25.</p>" +
"<p>Knock with no deadwood at all and it's <b>gin</b>: you score your opponent's deadwood plus 25, and they can't tack anything on.</p>" +
"<p>If the stock is down to two cards, the hand is a wash. The first to 100 points (or the table's chosen target) wins; the loser of each hand plays first in the next.</p></div>",
make: function (seed, n, opt) { return ltgGin(seed, opt); } };
LTG.dominoes = { key: "dominoes", title: "Dominoes", min: 2, max: 4, teams: false,
blurb: "Match the ends with a double-six set; first to 100.",
rules: "<div><p><b>Dominoes</b> (the draw game) uses a double-six set of 28 tiles, for two to four players each on their own.</p>" +
"<p>Each player takes seven tiles with two players, six with three, five with four; the rest stay face down as the <b>boneyard</b>.</p>" +
"<p>In the first hand, whoever holds the highest double sets it down first (if nobody has a double, the heaviest tile goes first). After that, the winner of each hand leads the next with any tile.</p>" +
"<p>On your turn, play a tile that matches one of the two open ends of the line. If you can't, draw from the boneyard until you can; if the boneyard is empty, pass.</p>" +
"<p>The first to play their last tile scores the pips left in everyone else's hands, rounded to the nearest 5. If nobody can play, the game is <b>blocked</b>: the lightest hand wins and scores the other hands' pips minus its own, rounded to the nearest 5 (a tie for lightest scores nothing).</p>" +
"<p>The first to 100 points (or the table's chosen target) wins.</p></div>",
make: function (seed, n, opt) { return ltgDominoes(seed, n, opt); } };
LTG.farkle = { key: "farkle", title: "Farkle", min: 2, max: 4, teams: false,
blurb: "Roll six dice, keep the scorers, and know when to stop.",
rules: "<div><p><b>Farkle</b> is a dice game for two to four. On your turn, roll all six dice.</p>" +
"<p>After every roll, set aside at least one scoring die or combination. Then either roll the dice that are left, or <b>bank</b> your points for the turn and pass the dice on.</p>" +
"<p><b>Scoring:</b> each 1 is 100 and each 5 is 50. Three of a kind is 100 times the number (three 2s are 200), except three 1s, which are 1,000. Four of a kind is double that, five is triple and six is four times. A straight 1-2-3-4-5-6 or three pairs is 1,500. Only dice set aside in a single roll count together.</p>" +
"<p>If a roll has nothing that scores, that's a <b>Farkle</b>: you lose everything from that turn. If all six dice score, you have <b>hot dice</b>: pick them all up and roll six again.</p>" +
"<p>To get on the board, your first bank must be at least 500.</p>" +
"<p>When someone reaches 5,000 (or the table's chosen target), everyone else gets one last turn to beat them. The highest score wins.</p></div>",
make: function (seed, n, opt) { return ltgFarkle(seed, n, opt); } };
"use strict";
LL_TEX.grass = function () { return __ZC(306, 146, this, arguments, new.target); };
LL_TEX.gravel = function () {
return llCanvasTex("gravel", 128, function (x, W, H) {
x.fillStyle = "#C8BCA8";
x.fillRect(0, 0, W, H);
var R = wRand(62);
for (var i = 0; i < 900; i++) {
var c = 150 + R() * 70 | 0;
x.fillStyle = "rgba(" + c + "," + (c - 8) + "," + (c - 22) + ",.8)";
x.beginPath();
x.arc(R() * W, R() * H, 0.6 + R() * 1.6, 0, 7);
x.fill();
}
});
};
LL_TEX.trav = function () { return __ZC(306, 147, this, arguments, new.target); };
LL_TEX.pooltile = function () { return __ZC(306, 148, this, arguments, new.target); };
LL_TEX.deck = function () {
return llCanvasTex("deck", 128, function (x, W, H) {
var cols = ["#9A6A48", "#8E6040", "#A47250", "#946644"];
for (var i = 0; i < 8; i++) {
x.fillStyle = cols[i % 4];
x.fillRect(0, i * 16, W, 15);
}
x.fillStyle = "rgba(40,24,14,.5)";
for (var j = 0; j < 8; j++)
x.fillRect(((j * 53) % W), j * 16, 2, 16);
});
};
LL_TEX.hedge = function () {
return llCanvasTex("hedge", 128, function (x, W, H) {
x.fillStyle = "#2E5A32";
x.fillRect(0, 0, W, H);
var R = wRand(64);
for (var i = 0; i < 700; i++) {
x.fillStyle = "rgba(" + (30 + R() * 40 | 0) + "," + (80 + R() * 60 | 0) + "," + (30 + R() * 30 | 0) + ",.7)";
x.beginPath();
x.arc(R() * W, R() * H, 1.5 + R() * 3, 0, 7);
x.fill();
}
});
};
LL_TEX.stonewall = function () { return __ZC(306, 149, this, arguments, new.target); };
LL_TEX.ripple = function () { return __ZC(306, 150, this, arguments, new.target); };
LL_TEX.lake = function () { return __ZC(306, 151, this, arguments, new.target); };
LL_TEX.stripe = function () {
return llCanvasTex("stripe", 64, function (x, W, H) {
for (var i = 0; i < 4; i++) {
x.fillStyle = i % 2 ? "#F0E2E8" : "#C87AA0";
x.fillRect(i * 16, 0, 16, H);
}
});
};
LL_TEX.mstripe = function () {
return llCanvasTex("mstripe", 64, function (x, W, H) {
for (var i = 0; i < 4; i++) {
x.fillStyle = i % 2 ? "#EAE0D2" : "#6A3482";
x.fillRect(i * 16, 0, 16, H);
}
});
};
function llYard(G, x0, x1, z0, z1, o) {
o = o || {};
return llRoom(G, x0, x1, z0, z1, { name: o.name, h: o.h || 4.2, wall: o.wall || llM(0xE6DCCE, { map: "stonewall" }), floor: o.floor || llM(0xE8F0E0, { map: "grass" }), ftile: o.ftile || 6,
ceil: false, sky: true, trim: false, gaps: o.gaps, skip: o.skip, hemi: 1.0, gate: o.gate, slot: o.slot, holes: o.holes });
}
function llPath(G, x0, x1, z0, z1, mat, tile) { llPlane(x1 - x0, z1 - z0, mat || llM(0xF0EAE0, { map: "gravel" }), (x0 + x1) / 2, 0.025, (z0 + z1) / 2, G, tile || 3); }
function llTree(G, x, z, kind, s) { return __ZC(306, 152, this, arguments, new.target); }
function llTopiary(G, x, z, kind, s) { return __ZC(306, 153, this, arguments, new.target); }
function llHedge(G, x0, z0, x1, z1, h, t) {
h = h || 1.1;
t = t || 0.8;
var L = Math.hypot(x1 - x0, z1 - z0), mx = (x0 + x1) / 2, mz = (z0 + z1) / 2, ry = -Math.atan2(z1 - z0, x1 - x0);
var b = llTBox(L, h, t, llM(0x3A6A3C, { map: "hedge" }), mx, h / 2, mz, G, 1.5);
b.rotation.y = ry;
llSolid(mx, mz, L / 2, t / 2, ry, h);
return b;
}
function llRoseBed(G, x, z, w, d, seed) { return __ZC(306, 154, this, arguments, new.target); }
function llRoseArch(G, x, z, ry, w) { return __ZC(306, 155, this, arguments, new.target); }
function llBench(G, x, z, ry) { return __ZC(306, 156, this, arguments, new.target); }
function llLamp(G, x, z, h) { return __ZC(306, 157, this, arguments, new.target); }
function llUrn(G, x, z, s) { return __ZC(306, 158, this, arguments, new.target); }
function llStatue(G, x, z, ry, s) { return __ZC(306, 159, this, arguments, new.target); }
function llLounger(G, x, z, ry, col) { return __ZC(306, 160, this, arguments, new.target); }
function llParasol(G, x, z, col) {
var g = llPiece(G, x, z, 0);
llCyl(0.04, 0.04, 2.6, llM(0xE8E2DA), 0, 1.3, 0, g, 6);
llCyl(0.25, 0.3, 0.12, llM(0xC8BCAE), 0, 0.06, 0, g, 8);
llCyl(0.06, 1.7, 0.55, llM(0xF4ECF0, { map: col === "m" ? "mstripe" : "stripe" }), 0, 2.55, 0, g, LL.lite ? 8 : 16);
llSolidR(x, z, 0.18, 2.6);
return g;
}
function llCabana(G, x, z, ry, no) { return __ZC(306, 161, this, arguments, new.target); }
function llGuardChair(G, x, z, ry) { return __ZC(306, 162, this, arguments, new.target); }
function llSE(cx, cz, rx, rz, p, x, z) { return Math.pow(Math.abs((x - cx) / rx), p) + Math.pow(Math.abs((z - cz) / rz), p); }
function llSEShape(cx, cz, rx, rz, p, n) {
var pts = [];
n = n || 64;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283, c = Math.cos(a), s = Math.sin(a);
pts.push([cx + rx * Math.sign(c) * Math.pow(Math.abs(c), 2 / p), cz + rz * Math.sign(s) * Math.pow(Math.abs(s), 2 / p)]);
}
return pts;
}
function llPoolY(x, z) { return __ZC(306, 163, this, arguments, new.target); }
function llInPool(x, z) { var y = llPoolY(x, z); return y !== null && y < -0.45; }
function llPool(G, o) { return __ZC(306, 164, this, arguments, new.target); }
function llLake(G, o) { return __ZC(306, 165, this, arguments, new.target); }
function llWaterBlocks(x, z) { return __ZC(306, 166, this, arguments, new.target); }
function llSwanBoat(G, x, z, ry) { return __ZC(306, 167, this, arguments, new.target); }
function llFloorsLater() { return __ZC(306, 168, this, arguments, new.target); }
function llResortTick(dt, t) { return __ZC(306, 169, this, arguments, new.target); }
"use strict";
function llFacade(G, z, x0, x1, h, gaps, side) { return __ZC(306, 170, this, arguments, new.target); }
function llUpper(G, x0, z0, x1, z1, y0, y1, mat) {
var alongX = Math.abs(z1 - z0) < 0.01, L = alongX ? Math.abs(x1 - x0) : Math.abs(z1 - z0), h = y1 - y0;
if (alongX)
llTBox(L, h, 0.1, mat, (x0 + x1) / 2, y0 + h / 2, z0, G, 3);
else
llTBox(0.1, h, L, mat, x0, y0 + h / 2, (z0 + z1) / 2, G, 3);
}
function llBuildResort(G) { return __ZC(306, 171, this, arguments, new.target); }
function llHotelLobby(G, M) { return __ZC(306, 172, this, arguments, new.target); }
function llBackOfHouse(G, M) { return __ZC(306, 173, this, arguments, new.target); }
function llMagnolia(G, M) { return __ZC(306, 174, this, arguments, new.target); }
function llBallroom(G, M) { return __ZC(306, 175, this, arguments, new.target); }
function llGardens(G) { return __ZC(306, 176, this, arguments, new.target); }
function llBridgeSeg(G, x0, y0, x1, y1, z, w) { return __ZC(306, 177, this, arguments, new.target); }
function llMaze(G, x0, z0, n, cs) { return __ZC(306, 178, this, arguments, new.target); }
function llPoolTerrace(G) { return __ZC(306, 179, this, arguments, new.target); }
function llPavilion(G, M) { return __ZC(306, 180, this, arguments, new.target); }
function llSpa(G, M) { return __ZC(306, 181, this, arguments, new.target); }
"use strict";
var LL_FLOOR_X = 500, LL_PH_X = 700;
var LL_ROOM_KIND = { 1: "classic", 2: "classic", 3: "classic", 4: "classic", 5: "deluxe", 6: "deluxe", 7: "classic", 8: "classic", 9: "classic", 10: "classic", 11: "deluxe", 12: "deluxe" };
var LL_KIND_NAME = { classic: "a Classic room", deluxe: "a Deluxe room", penthouse: "a Penthouse suite" };
function llBuildFloors(G) { return __ZC(306, 182, this, arguments, new.target); }
function llRoomSlots() { return __ZC(306, 183, this, arguments, new.target); }
function llLiftDoors(G, x, zs) {
zs.forEach(function (z) {
var lf = llPiece(G, x, z, Math.PI / 2);
llBox(2.2, 2.8, 0.1, llM(0xB8945A, { e: 0x1A1208 }), 0, 1.4, 0, lf);
llBox(0.04, 2.7, 0.12, llM(0x6A5030), 0, 1.4, 0.02, lf);
llBox(2.7, 0.4, 0.16, llGold(), 0, 3.0, 0.02, lf);
llBox(0.25, 0.4, 0.08, llM(LLC.cream), 1.45, 1.2, 0.05, lf);
});
}
function llFloorSign(G, kind, k, x, y, z, ry, w, h) { return __ZC(306, 184, this, arguments, new.target); }
function llFloorSignsDraw() { return __ZC(306, 185, this, arguments, new.target); }
function llGuestRoom(G, R, M) { return __ZC(306, 186, this, arguments, new.target); }
function llBuildPenthouses(G, M) { return __ZC(306, 187, this, arguments, new.target); }
function llPenthouse(G, k, M) { return __ZC(306, 188, this, arguments, new.target); }
"use strict";
var LL_HOTEL_JOBS = [3300, 3324, 3325, 3326, 3327, 3328, 3329, 3348, 3349, 3353];
var LL_HOTEL_PRICE = { classic: 40, deluxe: 70, penthouse: 400 };
LL.hotel = LL.hotel || { stay: null, taken: [], prices: null, loaded: false };
function llHotelLoad(force) { return __ZC(306, 189, this, arguments, new.target); }
function llHotelPrice(kind) { var p = LL.hotel.prices; return (p && p[kind]) || LL_HOTEL_PRICE[kind]; }
function llHotelSoft(e) { return llMissing(e) ? "The hotel's book opens soon. Until then the rooms are open to look round." : esc(String((e && e.message) || e || "Not now.")); }
function llRoomNoOf(G) { return G.x0 > 650 ? 600 + G.slot : (LL.floor || 2) * 100 + G.slot; }
function llRoomKey(G) {
if (llKeeper() || llHost() || llHasJob(LL_HOTEL_JOBS))
return true;
if (LL.hotel.noSql)
return true;
var S = LL.hotel.stay;
return !!(S && +S.room === llRoomNoOf(G));
}
function llGateName(G) { return G.need === "room" ? (G.x0 > 650 ? "Penthouse " + llRoomNoOf(G) : "Room " + llRoomNoOf(G)) : G.name; }
function llRoomSay(G) {
var S = LL.hotel.stay;
if (S)
return "Your key card opens " + (+S.room > 600 ? "Penthouse " : "room ") + S.room + ", not this one. Housekeeping keeps every guest's room private.";
return "A guest's room. Book a stay at reception in the Hotel Lobby, and your key card opens your own room.";
}
function llRoomDoor(k) { return __ZC(306, 190, this, arguments, new.target); }
function llFrontDesk() { return __ZC(306, 191, this, arguments, new.target); }
function llBookNights(kind) { return __ZC(306, 192, this, arguments, new.target); }
function llHotelCall(fn, args) { return __ZC(306, 193, this, arguments, new.target); }
function llBellDesk() { return __ZC(306, 194, this, arguments, new.target); }
function llLiftCard(stairs) { return __ZC(306, 195, this, arguments, new.target); }
function llGoFloor(f, quiet) { return __ZC(306, 196, this, arguments, new.target); }
function llHotelRest(how) { return __ZC(306, 197, this, arguments, new.target); }
function llScreenDraw2(S) { return __ZC(306, 198, this, arguments, new.target); }
function llRoomsBoardCard() { return __ZC(306, 199, this, arguments, new.target); }
var LL_RESORT_WAYS = [["hotel", "🏨 The Hotel Lobby and reception"], ["liftsup", "🛗 The lifts to the rooms"], ["magnolia", "🍽 The Magnolia Room"], ["ballroom", "💃 The Starlight Ballroom"], ["gardens", "🌹 The rose garden"],
["maze", "🌿 The hedge maze"], ["lake", "🦢 The swan lake and the boathouse"], ["lawns", "🏏 Croquet, bowls and the putting green"], ["pool", "🏊 The Pool Terrace"], ["pavilion", "🁫 The Garden Pavilion: table games"], ["spa", "💆 The Rosewater Spa"]];
function llResortGuide() { return __ZC(306, 200, this, arguments, new.target); }
var LL_SPA = [["massage", "A rose oil massage, an hour", 25, "energy +40"], ["hotstone", "A hot stone massage", 35, "energy +50"], ["facial", "A rosewater facial", 20, "hygiene +30"],
["aroma", "Aromatherapy: lavender and geranium", 20, "energy +25, hygiene +10"], ["nails", "A manicure in pearl pink", 12, "hygiene +10"],
["sauna", "The sauna", 0, "hygiene +20"], ["steam", "The eucalyptus steam room", 0, "hygiene +20"], ["warmpool", "The warm pool", 0, "energy +10"], ["shower", "A hot shower", 0, "hygiene +60"], ["hottub", "A hot tub by the pool", 0, "energy +10"]];
function llSpaCard() { return __ZC(306, 201, this, arguments, new.target); }
function llSpaDo(k) { return __ZC(306, 202, this, arguments, new.target); }
function llSwim(where) {
setStatus("<b>You swim in " + esc(where) + ".</b> Cool and clear, the tiles shimmering below. The lifeguard nods from the high chair.");
}
function llCabanaCard() { return __ZC(306, 203, this, arguments, new.target); }
function llYoga() {
if (typeof togEmote === "function")
try {
togEmote("bow");
}
catch (e) { }
if (llSigned())
llSpaDo("yoga");
else
setStatus("<b>Breathe in, breathe out.</b> A gentle hour of stretching on the grass.");
}
function llBandCard(where) { return __ZC(306, 204, this, arguments, new.target); }
function llDance(where) {
if (typeof togEmote === "function")
try {
togEmote("dance");
}
catch (e) { }
setStatus("💃 <b>You dance in " + esc(where) + ".</b> Press V to see yourself; walk away to stop.");
}
function llEventsCard() { return __ZC(306, 205, this, arguments, new.target); }
function llSwanRide() {
if (LL.ride)
return;
worldCard(null);
LL.ride = { t: 0, len: LL.lite ? 40 : 50 };
setStatus("🦢 <b>You settle into the swan boat.</b> The keeper pushes off, and you glide out round the lake and the island.");
}
function llSwanRideTick(dt) { return __ZC(306, 206, this, arguments, new.target); }
function llLawnGame(kind) {
LL.lawn = { kind: kind, shot: 0, score: 0 };
llLawnCard("");
}
function llLawnCard(say) { return __ZC(306, 207, this, arguments, new.target); }
function llLawnShot(p) { return __ZC(306, 208, this, arguments, new.target); }
function llPuttGo() { LL.putt = { hole: 0, strokes: 0 }; llPuttCard(""); }
function llPuttCard(say) { return __ZC(306, 209, this, arguments, new.target); }
function llPutt(k) { return __ZC(306, 210, this, arguments, new.target); }
function llMazeHeart() { return __ZC(306, 211, this, arguments, new.target); }
function llOwnerCard() { return __ZC(306, 212, this, arguments, new.target); }
"use strict";
var LTT = null;
var LTT_HOUSE = ["Rosalie", "Dorothy", "Mr. Abernathy", "Aunt Vivienne", "Colonel Pike", "Mrs. Okafor", "Florence", "Mr. Tibbs"];
function llTableMenu(game) { return __ZC(306, 213, this, arguments, new.target); }
function llTableCount(game, then) {
var D = LTG[game], fns = { back: function () { llTableMenu(game); } }, h = llHead(D.title, "How many at the table?");
for (var n = D.min; n <= D.max; n++) {
(function (k) { h += worldBtn("n" + k, k + " players", null); fns["n" + k] = function () { then(k); }; })(n);
}
worldCard(h + worldBtn("back", "← Back", null), fns);
}
function llTableRules(game) {
var D = LTG[game];
worldCard(llHead("How to play " + D.title, "") + "<div style='max-height:52vh;overflow:auto'>" + D.rules + "</div>" + worldBtn("back", "← Back", null), { back: function () { llTableMenu(game); } });
}
function llTablesLobby(game) { return __ZC(306, 214, this, arguments, new.target); }
function llTablesLoad() { return __ZC(306, 215, this, arguments, new.target); }
function llTableNew(game, n) { return __ZC(306, 216, this, arguments, new.target); }
function llTableSit(id) {
if (!llSigned())
return llMsg("Sign in to sit down.");
cityRpc("lounge_table_sit", { p_id: id }).then(function (o) {
if (!o || o.ok === false)
return llMsg(esc((o && o.say) || "That seat has just been taken."));
llTableJoin(id, null);
}).catch(function (e) { llMsg(llSoft(e)); });
}
function llTableLocal(game, n) {
var seed = (Math.random() * 2147483646 | 0) + 1, seats = [{ name: "You" }];
for (var i = 1; i < n; i++)
seats.push(null);
llTableOpen({ game: game, id: null, seed: seed, n: n, seats: seats, me: 0, status: "playing", host: true });
}
function llTableJoin(id, keep) { return __ZC(306, 217, this, arguments, new.target); }
function llTableOpen(t) { return __ZC(306, 218, this, arguments, new.target); }
function llTableNames() { return __ZC(306, 219, this, arguments, new.target); }
function llTableBegin() { var T = LTT; if (T.E)
return; T.E = LTG[T.game].make(T.seed, T.n, {}); T.status = "playing"; llTableNames(); }
function llTableStart() {
var T = LTT;
if (!T || !T.id || !T.host)
return;
cityRpc("lounge_table_start", { p_id: T.id }).then(function (o) { if (!o || o.ok === false)
return llSay(esc((o && o.say) || "Not now.")); T.status = "playing"; T.seats = o.seats || T.seats; llTableBegin(); llGameDraw(); })
.catch(function (e) { llSay(llSoft(e)); });
}
function llTableLeave() {
var T = LTT;
LTT = null;
if (!T || !T.id)
return;
if (T.me >= 0 && !(T.E && T.E.over()))
cityRpc("lounge_table_leave", { p_id: T.id }).catch(function () { });
setTimeout(llTablesLoad, 600);
}
function llTableHead() {
var T = LTT, b = [["rules", T && T.rules ? "🃏 Back to the table" : "📖 Rules"]];
if (T && T.id && T.host && T.status === "open")
b.unshift(["start", "▶ Start (the house fills empty seats)"]);
return b;
}
function llTableSay() { return __ZC(306, 220, this, arguments, new.target); }
function llTableDraw(x, W, H) { return __ZC(306, 221, this, arguments, new.target); }
function llTableTap(px, py) {
var T = LTT;
if (!T || !T.E)
return;
var h = llHitAt(px, py);
if (h && h.m) {
llTableMine(h.m);
return;
}
if (T.me >= 0)
T.E.tap(px, py, T.me);
}
function llTableMoves() {
var T = LTT;
if (!T)
return [];
if (T.rules)
return [];
if (!T.E || T.me < 0)
return [];
return T.E.legal(T.me).map(function (o) {
return { label: o.label, fn: function () { if (o.ui) {
if (o.pick)
T.E.pick(T.me, o.pick);
return;
} llTableMine(o.m); } };
});
}
function llTableText() {
var T = LTT;
if (!T)
return "";
if (T.rules) {
var d = document.createElement("div");
d.innerHTML = LTG[T.game].rules.replace(/<\/p>/g, "\n\n");
return d.textContent.trim();
}
return T.E ? T.E.text(T.me, T.names) : llTableSay().replace(/<[^>]+>/g, "");
}
function llTableMine(m) { return __ZC(306, 222, this, arguments, new.target); }
function llTableResync(say) { return __ZC(306, 223, this, arguments, new.target); }
function llTableTick(dt) { return __ZC(306, 224, this, arguments, new.target); }
function llTablePoll() { return __ZC(306, 225, this, arguments, new.target); }
"use strict";
function llDressPavilion(V) { return __ZC(306, 226, this, arguments, new.target); }
function llDressKitchen(K) { return __ZC(306, 227, this, arguments, new.target); }
(function () {
var f0 = llBuildFloors;
llBuildFloors = function (G) {
var r = f0.apply(this, arguments);
LL.wings.forEach(function (W) {
try {
if (W.name === "pavilion")
llDressPavilion(W.g);
else if (W.name === "kitchen2")
llDressKitchen(W.g);
}
catch (e) {
if (window.console)
console.warn("[lounge] dress", W.name, e);
}
});
return r;
};
})();
"use strict";
function llSweepOcc(G, x0, x1, z0, z1) { return __ZC(306, 228, this, arguments, new.target); }
function llSweepFree(O, x, z, r, inset) { return __ZC(306, 229, this, arguments, new.target); }
function llSweepTake(O, x, z, r) { for (var dx = -r; dx <= r; dx += 0.5)
for (var dz = -r; dz <= r; dz += 0.5) {
var i = Math.round(x + dx - O.x0), j = Math.round(z + dz - O.z0);
if (i >= 0 && j >= 0 && i < O.NX && j < O.NZ)
O.occ[i * O.NZ + j] = 1;
} }
function llSweepPathD(O, x, z) { var best = 99; for (var dx = -6; dx <= 6; dx++)
for (var dz = -6; dz <= 6; dz++) {
var i = Math.round(x + dx - O.x0), j = Math.round(z + dz - O.z0);
if (i < 0 || j < 0 || i >= O.NX || j >= O.NZ)
continue;
if (O.path[i * O.NZ + j]) {
var d = Math.hypot(dx, dz);
if (d < best)
best = d;
}
} return best; }
function llSweepFace(O, x, z) { var sx = 0, sz = 0; for (var dx = -6; dx <= 6; dx++)
for (var dz = -6; dz <= 6; dz++) {
var i = Math.round(x + dx - O.x0), j = Math.round(z + dz - O.z0);
if (i < 0 || j < 0 || i >= O.NX || j >= O.NZ)
continue;
if (O.path[i * O.NZ + j]) {
var w = 1 / (1 + dx * dx + dz * dz);
sx += dx * w;
sz += dz * w;
}
} return Math.atan2(sx, sz); }
function llSweepRoom(G, o) { return __ZC(306, 230, this, arguments, new.target); }
var LL_SWK = {
palm: { r: 0.8, put: function (P, x, z, ry, R) { llPlant(P, x, z, R() < 0.5 ? "palm" : "orchid", 1.2); llSolidR(x, z, 0.4, 1.6); } },
sofas: { r: 3.0, put: function (P, x, z, ry, R) { return __ZC(306, 231, this, arguments, new.target); } },
tea: { r: 1.7, put: function (P, x, z, ry, R) {
llRoundTable(P, x, z, 0.6);
llChair(P, x, z - 1.1, 0, LLC.lilac);
llChair(P, x, z + 1.1, Math.PI, LLC.lilac);
llSolidR(x, z, 0.7, 1);
if (!LL.lite)
llTeaSet(P, x, 0.78, z);
if (R() < 0.6)
LL.seated.push({ x: x, z: z - 1.1, ry: 0, seed: "sw23t" + Math.round(x) + "_" + Math.round(z) });
} },
side: { r: 0.9, put: function (P, x, z, ry, R) { llSideboard(P, x, z, ry, 1.6, LLC.cream); llVase(P, x, 0.88, z, 0.9); llSolidR(x, z, 0.8, 1); } },
bench: { r: 1.3, byPath: true, put: function (P, x, z, ry, R) {
llBench(P, x, z, ry);
llSolid(x, z, 0.95, 0.35, ry, 1);
var s = Math.sin(ry + Math.PI / 2), c = Math.cos(ry + Math.PI / 2);
llLamp(P, x + s * 1.6, z + c * 1.6, 3);
llSolidR(x + s * 1.6, z + c * 1.6, 0.15, 3);
if (R() < 0.4)
LL.seated.push({ x: x, z: z, ry: ry, seed: "sw23b" + Math.round(x) + "_" + Math.round(z) });
} },
urn: { r: 0.9, byPath: true, put: function (P, x, z, ry, R) { llUrn(P, x, z, 1); llSolidR(x, z, 0.4, 1.3); } },
tree: { r: 2.6, put: function (P, x, z, ry, R) { llTree(P, x, z, ["blossom", "round", "cypress"][Math.floor(R() * 3)], 1 + R() * 0.3); llSolidR(x, z, 0.4, 4); } },
roses: { r: 2.2, byPath: true, put: function (P, x, z, ry, R) { llRoseBed(P, x, z, 3.2, 1.6, llHash("sw23r" + x + z)); } },
statue: { r: 1.3, byPath: true, put: function (P, x, z, ry, R) { llStatue(P, x, z, ry, 0.9); llSolidR(x, z, 0.8, 2.5); } },
lounge: { r: 2.4, put: function (P, x, z, ry, R) {
var g = llPiece(P, x, z, ry), col = [LLC.blush, LLC.rose, LLC.lilac][Math.floor(R() * 3)];
llLounger(g, -0.6, 0, 0, col);
llLounger(g, 0.6, 0, 0, col);
llParasol(g, 0, -1.3, R() < 0.5 ? "m" : "s");
llSolid(x, z, 1.2, 1.1, ry, 0.8);
} },
pots: { r: 0.9, put: function (P, x, z, ry, R) { llPlant(P, x, z, "palm", 1.3); llSolidR(x, z, 0.4, 1.6); } },
stable: { r: 1.2, put: function (P, x, z, ry, R) { llRoundTable(P, x, z, 0.5); llChair(P, x + 0.9, z, -Math.PI / 2, LLC.cream); llChair(P, x - 0.9, z, Math.PI / 2, LLC.cream); llSolidR(x, z, 0.9, 1); } }
};
function llSweep23(G) { return __ZC(306, 232, this, arguments, new.target); }
