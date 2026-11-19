/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FL = { base: -520000, solids: [], walk: [], pads: [], ramps: [], gates: [], spots: [], talk: [], rooms: [], wings: [], people: [], staffAt: [],
twinkle: [], flames: [], spin: [], screens: [], water: [], built: false, t: 0, lite: false, room: null, busy: false,
G: null, slow: 0, gateSaid: 0, where: "wed", guide: null, kids: [], kidsAt: 0 };
var FL_WED = "The Everbloom Wedding House", FL_FAM = "Hearthside Family House";
var FL_JOB0 = 3400, FL_JOB1 = 3499, FL_FX = 1000;
function flSigned() { return typeof signedIn === "function" && signedIn(); }
function flKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function flJobs() { return ((typeof standing !== "undefined" && standing && standing.jobs) || []).map(function (j) { return +(j.job_id || j.id || 0); }).filter(function (id) { return id >= FL_JOB0 && id <= FL_JOB1; }); }
function flStaffWed() { return flKeeper() || flJobs().some(function (j) { return j < 3450; }); }
function flStaffFam() { return flKeeper() || flJobs().some(function (j) { return j >= 3450; }); }
function flCouple() { var W = typeof FW !== "undefined" && FW.wed; return !!(W && W.bookings && W.bookings.some(function (b) { return Math.abs(new Date(b.starts_at) - Date.now()) < 6 * 3600000; })); }
function flAllowed(need) {
if (need === "wstaff")
return flStaffWed();
if (need === "fstaff")
return flStaffFam();
if (need === "couple")
return flStaffWed() || flCouple();
return true;
}
var FL_NEED_SAY = { wstaff: "Staff only. The badge reader opens for anyone working a post at the Everbloom, and for the Keeper.",
fstaff: "Staff only. The badge reader opens for Family Services staff, and for the Keeper. The children's records and the offices are kept private.",
couple: "Kept for the couple marrying today, and their planner. Your planner at the front desk can show you round." };
function flLite() { return typeof LITE !== "undefined" && !!LITE; }
var FL_MAT = {};
function flM(col, o) { return __ZC(311, 0, this, arguments, new.target); }
function flOwn(col, op) { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} return m; }
function flBox(w, h, d, m, x, y, z, G) { return wBox(w, h, d, m, x, y, z, G); }
function flCyl(rt, rb, h, m, x, y, z, G, s) { return wCyl(rt, rb, h, m, x, y, z, G, s); }
function flSph(r, m, x, y, z, G, s) { return wSph(r, m, x, y, z, G, s); }
function flKeep(o) { o.userData.keep = 1; return o; }
function flSolid(x, z, hw, hd, rot, h, b) { var o = { x: x, z: z, hw: hw, hd: hd, rot: rot || 0 }; if (h !== undefined)
o.h = h; if (b !== undefined)
o.b = b; FL.solids.push(o); return o; }
function flSolidR(x, z, r, h) { var o = { x: x, z: z, r: r }; if (h !== undefined)
o.h = h; FL.solids.push(o); return o; }
function flSpot(o) { FL.spots.push(o); return o; }
function flHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function flIn(r, x, z) { return x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1; }
function flSign(G, lines, w, h, x, y, z, ry, bg, fg) { var s = wSign(lines, w, h, bg || "#2A1236", fg || "#E8CFA0"); s.position.set(x, y, z); s.rotation.y = ry || 0; G.add(s); return s; }
function flTBox(w, h, d, mat, x, y, z, G, tile) { return __ZC(311, 1, this, arguments, new.target); }
function flPlane(w, d, mat, x, y, z, G, tile, down) {
var g = new THREE.PlaneGeometry(w, d), uv = g.attributes.uv, t = tile || 2;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * w / t, uv.getY(i) * d / t);
var m = wMesh(g, mat, x, y, z, G);
m.rotation.x = down ? Math.PI / 2 : -Math.PI / 2;
return m;
}
var FL_TEXC = {};
function flCanvasTex(key, size, fn) {
if (FL_TEXC[key])
return FL_TEXC[key];
var t = wTex(size, size, fn);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (typeof renderer !== "undefined" && renderer && renderer.capabilities)
t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
return (FL_TEXC[key] = t);
}
var FL_TEX = {
carpet: function () { return __ZC(311, 2, this, arguments, new.target); },
rosecarpet: function () { return __ZC(311, 3, this, arguments, new.target); },
damask: function () { return __ZC(311, 4, this, arguments, new.target); },
pinkdamask: function () { return __ZC(311, 5, this, arguments, new.target); },
marble: function () { return __ZC(311, 6, this, arguments, new.target); },
parquet: function () { return __ZC(311, 7, this, arguments, new.target); },
tile: function () {
return flCanvasTex("tile", 128, function (x, W, H) {
x.fillStyle = "#D0C8BC";
x.fillRect(0, 0, W, H);
x.fillStyle = "#8A9A84";
x.fillRect(0, 0, W / 2, H / 2);
x.fillRect(W / 2, H / 2, W / 2, H / 2);
x.strokeStyle = "rgba(80,60,80,.4)";
x.strokeRect(0, 0, W, H);
});
},
coffer: function () { return __ZC(311, 8, this, arguments, new.target); },
felt: function () {
return flCanvasTex("felt", 128, function (x, W, H) {
x.fillStyle = "#4A5A44";
x.fillRect(0, 0, W, H);
var R = wRand(9);
for (var i = 0; i < 900; i++) {
x.fillStyle = "rgba(" + (60 + R() * 30 | 0) + ",80," + (60 + R() * 30 | 0) + ",.35)";
x.fillRect(R() * W, R() * H, 1, 1);
}
});
},
stone: function () { return __ZC(311, 9, this, arguments, new.target); }
};
function flRoom(G, x0, x1, z0, z1, o) { return __ZC(311, 10, this, arguments, new.target); }
function flWalls(G, x0, x1, z0, z1, h, mat, gaps, tile, skip, trim) { return __ZC(311, 11, this, arguments, new.target); }
function flPad(x0, x1, z0, z1, h) { FL.pads.push({ x0: x0, x1: x1, z0: z0, z1: z1, h: h }); if (h > 0.55)
FL.solids.push({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: (x1 - x0) / 2 - 0.3, hd: (z1 - z0) / 2 - 0.3, rot: 0, h: h }); }
function flRamp(x0, x1, z0, z1, h0, h1, axis) { FL.ramps.push({ x0: x0, x1: x1, z0: z0, z1: z1, h0: h0, h1: h1, axis: axis || "z" }); }
function flEnv() { return __ZC(311, 12, this, arguments, new.target); }
function flGround(x, z, feet) { return __ZC(311, 13, this, arguments, new.target); }
function flBlocked(x, z, feet) { return __ZC(311, 14, this, arguments, new.target); }
function flRoomAt(x, z) {
var best = null;
for (var i = 0; i < FL.rooms.length; i++) {
var r = FL.rooms[i];
if (flIn(r, x, z) && (!best || (r.x1 - r.x0) * (r.z1 - r.z0) < (best.x1 - best.x0) * (best.z1 - best.z0)))
best = r;
}
return best;
}
if (typeof worldDef === "function")
worldDef("family", {
base: FL.base, far: 900, ownSky: true, tone: 600,
env: function () { return flEnv(); },
build: function (G) { flBuild(G); },
enter: function (opt) { flEnter(opt || {}); },
leave: function () { flLeave(); },
ground: function (x, z, feet) { return flGround(x, z, feet); },
block: function (x, z, feet) { return flBlocked(x, z, feet); },
tick: function (dt) { flTick(dt); },
back: function () { flBack(); }
});
"use strict";
var FLC = { plum: 0x4E5A44, purple: 0x7A8A6E, lav: 0xBCB8C8, lilac: 0xCEC6D4, pink: 0xDDB0B4, rose: 0xBE8088, blush: 0xDCC8C2, berry: 0x86484E,
gold: 0xC9A868, silver: 0xB4B8C4, cream: 0xD8CEBE, ivory: 0xD2C8B8, wood: 0x4A3426, walnut: 0x5A3828, velvet: 0x5E6E52, teal: 0x2A5A6A, green: 0x3A6A44,
sage: 0x8A9A7E, sky: 0x8AA8C4, butter: 0xD8C484, oak: 0x9A7A54, pine: 0xB89A6A };
function flGold() { return flM(FLC.gold, { e: 0x2A1C08 }); }
function flSilver() { return flM(FLC.silver, { e: 0x18181E }); }
function flCrystal() { return flM(0xE8E0F0, { e: 0x3A3040, op: 0.75 }); }
function flPiece(G, x, z, ry, y) { var g = new THREE.Group(); g.position.set(x, y || 0, z); g.rotation.y = ry || 0; G.add(g); return g; }
function flPS(x, z, hw, hd, ry, h) { return flSolid(x, z, hw, hd, ry || 0, h === undefined ? 2.2 : h); }
function flChair(G, x, z, ry, col, o) { return __ZC(311, 15, this, arguments, new.target); }
function flArmchair(G, x, z, ry, col) { return __ZC(311, 16, this, arguments, new.target); }
function flSofa(G, x, z, ry, col, len, o) { return __ZC(311, 17, this, arguments, new.target); }
function flChaise(G, x, z, ry, col) { return __ZC(311, 18, this, arguments, new.target); }
function flOttoman(G, x, z, col, r) {
r = r || 0.45;
var g = flPiece(G, x, z, 0);
flCyl(r, r, 0.42, flM(col || FLC.pink), 0, 0.25, 0, g, 16);
flCyl(r * 0.4, r * 0.4, 0.03, flGold(), 0, 0.47, 0, g, 10);
if (!FL.lite)
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.283;
flSph(0.03, flGold(), Math.cos(a) * r * 0.7, 0.47, Math.sin(a) * r * 0.7, g, 4);
}
flSolidR(x, z, r, 0.5);
return g;
}
function flRoundTable(G, x, z, r, o) { return __ZC(311, 19, this, arguments, new.target); }
function flRectTable(G, x, z, w, d, ry, o) { return __ZC(311, 20, this, arguments, new.target); }
function flCoffeeTable(G, x, z, ry, o) { return __ZC(311, 21, this, arguments, new.target); }
function flDiningRound(G, x, z, r, n, col, o) {
flRoundTable(G, x, z, r, o);
for (var i = 0; i < n; i++) {
var a = i / n * 6.283 + (o && o.a0 || 0), cx = x + Math.sin(a) * (r + 0.5), cz = z + Math.cos(a) * (r + 0.5);
flChair(G, cx, cz, a + Math.PI, col);
}
}
function flChandelier(G, x, y, z, s, o) { return __ZC(311, 22, this, arguments, new.target); }
function flMesh(geo, mat, x, y, z, G) { return wMesh(geo, mat, x, y, z, G); }
function flSconce(G, x, y, z, ry) { return __ZC(311, 23, this, arguments, new.target); }
function flCandelabra(G, x, y, z) { return __ZC(311, 24, this, arguments, new.target); }
function flRug(G, x, z, w, d, ry, col, border, y) {
var g = flPiece(G, x, z, ry, y || 0);
flBox(w, 0.02, d, flM(border || FLC.gold), 0, 0.02, 0, g);
flBox(w - 0.3, 0.025, d - 0.3, flM(col || FLC.rose), 0, 0.022, 0, g);
if (!FL.lite)
flBox(w * 0.5, 0.03, d * 0.4, flM(FLC.blush), 0, 0.024, 0, g);
return g;
}
function flPlant(G, x, z, kind, s) { return __ZC(311, 25, this, arguments, new.target); }
function flVase(G, x, y, z, s) {
s = s || 1;
var g = flPiece(G, x, z, 0, y);
flCyl(0.08 * s, 0.12 * s, 0.3 * s, flSilver(), 0, 0.15 * s, 0, g, 10);
for (var i = 0; i < (FL.lite ? 3 : 7); i++) {
var a = i / 7 * 6.283;
flSph(0.07 * s, flM(i % 2 ? FLC.pink : FLC.rose), Math.cos(a) * 0.09 * s, (0.38 + (i % 3) * 0.05) * s, Math.sin(a) * 0.09 * s, g, 6);
}
return g;
}
var FL_ART = {};
function flArtTex(seed) { return __ZC(311, 26, this, arguments, new.target); }
function flPainting(G, x, y, z, ry, w, h, seed) {
var g = flPiece(G, x, z, ry, y), gd = flGold();
flBox(w + 0.24, h + 0.24, 0.08, gd, 0, 0, 0, g);
var p = wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: flArtTex(seed || 0) }), 0, 0, 0.05, g);
if (!FL.lite) {
flBox(w * 0.3, 0.08, 0.04, gd, 0, -h / 2 - 0.24, 0.04, g);
}
return g;
}
function flMirror(G, x, y, z, ry, w, h) { var g = flPiece(G, x, z, ry, y); flBox(w + 0.2, h + 0.2, 0.06, flGold(), 0, 0, 0, g); flBox(w, h, 0.02, flM(0xA8B0C8, { e: 0x2A2E3A }), 0, 0, 0.04, g); return g; }
var FL_WINTEX = null;
function flWindow(G, x, y, z, ry, w, h) { return __ZC(311, 27, this, arguments, new.target); }
function flColumn(G, x, z, h, o) { return __ZC(311, 28, this, arguments, new.target); }
function flFireplace(G, x, z, ry) { return __ZC(311, 29, this, arguments, new.target); }
function flBookcase(G, x, z, ry, w, h) { return __ZC(311, 30, this, arguments, new.target); }
function flSideboard(G, x, z, ry, w, col) {
w = w || 2;
var g = flPiece(G, x, z, ry);
flBox(w, 0.85, 0.5, flM(col || FLC.cream), 0, 0.45, 0, g);
flBox(w + 0.06, 0.04, 0.54, flGold(), 0, 0.89, 0, g);
for (var i = 0; i < 3; i++)
flBox(w / 3 - 0.08, 0.6, 0.02, flM(FLC.blush), -w / 3 + i * w / 3, 0.45, 0.26, g);
flVase(G, x, 0.9, z, 1);
flPS(x, z, w / 2, 0.28, ry, 1);
return g;
}
function flCabinet(G, x, z, ry, w, h, col) { var g = flPiece(G, x, z, ry); flBox(w, h, 0.5, flM(col || FLC.cream), 0, h / 2, 0, g); flBox(w + 0.06, 0.06, 0.54, flGold(), 0, h, 0, g); flPS(x, z, w / 2, 0.28, ry, h); return g; }
function flPiano(G, x, z, ry) { return __ZC(311, 31, this, arguments, new.target); }
function flFountain(G, x, z, s) { return __ZC(311, 32, this, arguments, new.target); }
function flTrophyCase(G, x, z, ry, w) { return __ZC(311, 33, this, arguments, new.target); }
function flRope(G, x0, z0, x1, z1, n) { return __ZC(311, 34, this, arguments, new.target); }
function flCounter(G, x, z, w, ry, o) { return __ZC(311, 35, this, arguments, new.target); }
function flCakeCase(G, x, z, w, ry) { return __ZC(311, 36, this, arguments, new.target); }
function flTieredStand(G, x, y, z) { return __ZC(311, 37, this, arguments, new.target); }
function flTeaSet(G, x, y, z) {
var g = flPiece(G, x, z, 0, y), p = flM(0xE6DCE4);
flSph(0.08, p, 0, 0.08, 0, g, 8);
flCyl(0.015, 0.02, 0.1, p, 0.09, 0.09, 0, g, 4).rotation.z = -0.9;
if (!FL.lite)
for (var i = 0; i < 2; i++) {
flCyl(0.04, 0.03, 0.05, p, -0.12 + i * 0.24, 0.03, 0.1, g, 8);
flCyl(0.06, 0.06, 0.01, p, -0.12 + i * 0.24, 0.005, 0.1, g, 10);
}
return g;
}
function flBed(G, x, z, ry, o) { return __ZC(311, 38, this, arguments, new.target); }
function flWardrobe(G, x, z, ry, w) {
w = w || 1.6;
var g = flPiece(G, x, z, ry);
flBox(w, 2.3, 0.62, flM(FLC.cream), 0, 1.15, 0, g);
flBox(w + 0.08, 0.1, 0.66, flGold(), 0, 2.33, 0, g);
flBox(0.02, 2.1, 0.02, flGold(), 0, 1.15, 0.32, g);
flSph(0.03, flGold(), -0.08, 1.15, 0.33, g, 5);
flSph(0.03, flGold(), 0.08, 1.15, 0.33, g, 5);
flPS(x, z, w / 2, 0.33, ry, 2.3);
return g;
}
function flVanity(G, x, z, ry) { return __ZC(311, 39, this, arguments, new.target); }
function flPouf(G, x, z) { flOttoman(G, x, z, FLC.pink, 0.26); }
function flBath(G, x, z, ry) { return __ZC(311, 40, this, arguments, new.target); }
function flBasin(G, x, z, ry, n) { return __ZC(311, 41, this, arguments, new.target); }
function flStall(G, x, z, ry) {
var g = flPiece(G, x, z, ry);
flBox(0.06, 2.1, 1.5, flM(FLC.lav), -0.6, 1.15, 0, g);
flBox(0.06, 2.1, 1.5, flM(FLC.lav), 0.6, 1.15, 0, g);
flBox(1.2, 2.1, 0.05, flM(FLC.lilac), 0, 1.15, 0.75, g);
flBox(0.45, 0.45, 0.6, flM(0xE2D8DE), 0, 0.23, -0.4, g);
flSolid(x, z, 0.65, 0.78, ry, 2.2);
return g;
}
function flDesk(G, x, z, ry, o) { return __ZC(311, 42, this, arguments, new.target); }
function flBossChair(G, x, z, ry, col) { return __ZC(311, 43, this, arguments, new.target); }
function flLockers(G, x, z, ry, n) {
var g = flPiece(G, x, z, ry);
for (var i = 0; i < n; i++) {
flBox(0.48, 1.9, 0.5, flM(i % 2 ? FLC.lav : FLC.lilac), -n * 0.25 + 0.25 + i * 0.5, 0.95, 0, g);
flBox(0.06, 0.02, 0.02, flSilver(), -n * 0.25 + 0.4 + i * 0.5, 1.1, 0.26, g);
}
flPS(x, z, n * 0.25, 0.27, ry, 1.9);
return g;
}
function flShelves(G, x, z, ry, w) { return __ZC(311, 44, this, arguments, new.target); }
function flKitchenRun(G, x, z, w, ry) { return __ZC(311, 45, this, arguments, new.target); }
function flStove(G, x, z, ry) { return __ZC(311, 46, this, arguments, new.target); }
function flFridge(G, x, z, ry) { var g = flPiece(G, x, z, ry); flBox(0.9, 2.0, 0.7, flSilver(), 0, 1.0, 0, g); flBox(0.03, 0.8, 0.04, flGold(), 0.35, 1.3, 0.36, g); flPS(x, z, 0.46, 0.36, ry, 2); return g; }
function flIsland(G, x, z, w, d, ry) {
var g = flPiece(G, x, z, ry);
flBox(w, 0.9, d, flM(FLC.lav), 0, 0.45, 0, g);
flBox(w + 0.1, 0.06, d + 0.1, flM(0xD8CCD4, { map: "marble" }), 0, 0.93, 0, g);
if (!FL.lite) {
flTieredStand(G, x, 0.96, z);
}
flPS(x, z, w / 2 + 0.05, d / 2 + 0.05, ry, 1);
return g;
}
function flTV(G, x, y, z, ry, w) { var g = flPiece(G, x, z, ry, y); flBox(w, w * 0.56, 0.06, flM(0x141018), 0, 0, 0, g); var sc = flBox(w - 0.08, w * 0.56 - 0.08, 0.02, flOwn(0x2A2A44), 0, 0, 0.035, g); flKeep(sc); (FL.tvs || (FL.tvs = [])).push({ m: sc, x: x, z: z, w: w }); return g; }
function flHarp(G, x, z, ry) { return __ZC(311, 47, this, arguments, new.target); }
"use strict";
var FL_PLACES = {};
function flPlace(k, x, z, name) { FL_PLACES[k] = { x: x, z: z, name: name }; }
function flWing(G, name, x0, x1, z0, z1) { var g = new THREE.Group(); g.name = "fl-" + name; G.add(g); var W = { g: g, name: name, x0: x0, x1: x1, z0: z0, z1: z1 }; FL.wings.push(W); return g; }
function flStaff(o) { FL.staffAt.push(o); return o; }
FL_TEX.lawn = function () { return __ZC(311, 48, this, arguments, new.target); };
FL_TEX.gravel = function () {
return flCanvasTex("gravel", 128, function (x, W, H) {
x.fillStyle = "#A89C88";
x.fillRect(0, 0, W, H);
var R = wRand(17);
for (var i = 0; i < 900; i++) {
var c = 130 + R() * 70 | 0;
x.fillStyle = "rgba(" + c + "," + (c - 8) + "," + (c - 20) + ",.8)";
x.beginPath();
x.arc(R() * W, R() * H, 0.8 + R() * 1.6, 0, 7);
x.fill();
}
});
};
FL_TEX.play = function () { return __ZC(311, 49, this, arguments, new.target); };
FL_TEX.lino = function () {
return flCanvasTex("lino", 128, function (x, W, H) {
x.fillStyle = "#B8B0A0";
x.fillRect(0, 0, W, H);
var R = wRand(5);
for (var i = 0; i < 400; i++) {
x.fillStyle = "rgba(120,110,96,.18)";
x.fillRect(R() * W, R() * H, 2, 2);
}
x.strokeStyle = "rgba(80,70,60,.25)";
x.strokeRect(0, 0, W, H);
});
};
FL_TEX.plaster = function () {
return flCanvasTex("plaster", 128, function (x, W, H) {
x.fillStyle = "#CFC4B0";
x.fillRect(0, 0, W, H);
var R = wRand(23);
for (var i = 0; i < 700; i++) {
x.fillStyle = "rgba(" + (170 + R() * 40 | 0) + "," + (160 + R() * 40 | 0) + "," + (140 + R() * 30 | 0) + ",.25)";
x.fillRect(R() * W, R() * H, 3, 3);
}
});
};
FL_TEX.brick = function () { return __ZC(311, 50, this, arguments, new.target); };
function flPhoto(kind, col, fallback) { try {
if (typeof texOf === "function") {
var t = texOf(kind);
if (t) {
var m = new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t });
return m;
}
}
}
catch (e) { } return flM(col || 0xD8D0C2, { map: fallback }); }
function flPew(G, x, z, ry, len) { return __ZC(311, 51, this, arguments, new.target); }
function flAltar(G, x, z, ry) { return __ZC(311, 52, this, arguments, new.target); }
function flArch(G, x, z, ry, w, h) { return __ZC(311, 53, this, arguments, new.target); }
function flOrgan(G, x, z, ry) { return __ZC(311, 54, this, arguments, new.target); }
var FL_GLASS = {};
function flGlassTex(seed) { return __ZC(311, 55, this, arguments, new.target); }
function flStained(G, x, y, z, ry, w, h, seed) { return __ZC(311, 56, this, arguments, new.target); }
function flWeddingCake(G, x, y, z, s) { return __ZC(311, 57, this, arguments, new.target); }
function flDanceFloor(G, x, z, w, d) { return __ZC(311, 58, this, arguments, new.target); }
function flBandStage(G, x, z, ry, w) { return __ZC(311, 59, this, arguments, new.target); }
function flBar(G, x, z, w, ry) { return __ZC(311, 60, this, arguments, new.target); }
function flGown(G, x, z, ry, col) { return __ZC(311, 61, this, arguments, new.target); }
function flGownRail(G, x, z, ry, w, suits) { return __ZC(311, 62, this, arguments, new.target); }
function flRingCase(G, x, z, w, ry) { return __ZC(311, 63, this, arguments, new.target); }
function flHedge(G, x, z, w, d, h) { var g = flPiece(G, x, z, 0); flBox(w, h || 1.4, d, flM(0x3E5A34), 0, (h || 1.4) / 2, 0, g); if (!FL.lite)
flBox(w - 0.1, 0.1, d - 0.1, flM(0x4A6A3E), 0, (h || 1.4) + 0.04, 0, g); flSolid(x, z, w / 2, d / 2, 0, h || 1.4); return g; }
function flTree(G, x, z, s) {
s = s || 1;
var g = flPiece(G, x, z, 0);
flCyl(0.18 * s, 0.26 * s, 2.4 * s, flM(0x5A4632), 0, 1.2 * s, 0, g, 7);
[[0, 3.1, 0, 1.5], [0.7, 2.7, 0.3, 1.0], [-0.6, 2.8, -0.4, 1.1], [0.1, 3.6, -0.3, 1.0]].forEach(function (q) { flSph(q[3] * s, flM(0x4A6A3A), q[0] * s, q[1] * s, q[2] * s, g, FL.lite ? 6 : 9); });
flSolidR(x, z, 0.35 * s, 3);
return g;
}
function flGazebo(G, x, z, r) { return __ZC(311, 64, this, arguments, new.target); }
function flGardenChair(G, x, z, ry) { return __ZC(311, 65, this, arguments, new.target); }
function flLamp(G, x, z) {
var g = flPiece(G, x, z, 0), bk = flM(0x2A2A2A);
flCyl(0.06, 0.09, 3.2, bk, 0, 1.6, 0, g, 6);
flBox(0.36, 0.45, 0.36, flM(0xE8D8B0, { e: 0x5A4A2A, op: 0.85 }), 0, 3.4, 0, g);
flBox(0.42, 0.06, 0.42, bk, 0, 3.66, 0, g);
var gl = wGlow(0xFFE2B0, 1.6, 0.3);
gl.position.set(x, 3.4, z);
G.add(flKeep(gl));
flSolidR(x, z, 0.15, 3);
return g;
}
function flKidBed(G, x, z, ry, quilt) { return __ZC(311, 66, this, arguments, new.target); }
function flBunk(G, x, z, ry) { return __ZC(311, 67, this, arguments, new.target); }
function flCrib(G, x, z, ry) { return __ZC(311, 68, this, arguments, new.target); }
function flToyBox(G, x, z, ry) { return __ZC(311, 69, this, arguments, new.target); }
function flBlocks(G, x, z) { var g = flPiece(G, x, z, 0), R = wRand(flHash("bk" + x + z)); for (var i = 0; i < (FL.lite ? 4 : 9); i++) {
var b = flBox(0.16, 0.16, 0.16, flM([FLC.sky, FLC.butter, FLC.sage, FLC.pink, 0xB86A5A][i % 5]), (R() - 0.5) * 0.8, 0.08 + (i > 5 ? 0.16 : 0), (R() - 0.5) * 0.8, g);
b.rotation.y = R() * 3;
} return g; }
function flBeanbag(G, x, z, col) { var g = flPiece(G, x, z, 0); var b = flSph(0.42, flM(col || FLC.sage), 0, 0.3, 0, g, 10); b.scale.y = 0.7; flSolidR(x, z, 0.45, 0.6); return g; }
function flKidTable(G, x, z, ry, n) { return __ZC(311, 70, this, arguments, new.target); }
function flWhiteboard(G, x, y, z, ry, w) {
var g = flPiece(G, x, z, ry, y);
flBox(w, w * 0.5, 0.04, flM(0xD0CCC4), 0, 0, 0, g);
flBox(w + 0.08, 0.06, 0.08, flSilver(), 0, -w * 0.25 - 0.03, 0.03, g);
if (!FL.lite)
for (var i = 0; i < 4; i++)
flBox(w * (0.3 + 0.12 * (i % 3)), 0.02, 0.01, flM([0x3A5A8A, 0x6A2A2A, 0x2A5A3A, 0x2A2A2A][i]), -w * 0.15, w * 0.15 - i * 0.1, 0.025, g);
return g;
}
function flFiling(G, x, z, ry, n) {
var g = flPiece(G, x, z, ry);
for (var i = 0; i < (n || 2); i++) {
flBox(0.48, 1.32, 0.62, flM(0x8A8E8A), -((n || 2) - 1) * 0.25 + i * 0.5, 0.66, 0, g);
for (var d = 0; d < 4; d++)
flBox(0.18, 0.03, 0.03, flSilver(), -((n || 2) - 1) * 0.25 + i * 0.5, 0.3 + d * 0.3, 0.32, g);
}
flPS(x, z, (n || 2) * 0.25, 0.33, ry, 1.3);
return g;
}
function flComputer(G, x, y, z, ry) { var g = flPiece(G, x, z, ry, y); flBox(0.55, 0.34, 0.04, flM(0x1A1A1E), 0, 0.3, -0.1, g); flBox(0.5, 0.29, 0.01, flM(0x4A6A8A, { e: 0x1A2A3A }), 0, 0.3, -0.078, g); flBox(0.05, 0.12, 0.05, flM(0x2A2A2A), 0, 0.08, -0.1, g); flBox(0.45, 0.02, 0.15, flM(0x2A2A2A), 0, 0.01, 0.12, g); return g; }
function flSwings(G, x, z, ry) { return __ZC(311, 71, this, arguments, new.target); }
function flSlide(G, x, z, ry) { return __ZC(311, 72, this, arguments, new.target); }
function flClimber(G, x, z) { return __ZC(311, 73, this, arguments, new.target); }
function flSandpit(G, x, z, w) {
var g = flPiece(G, x, z, 0);
flBox(w, 0.3, w, flM(FLC.pine), 0, 0.15, 0, g);
flBox(w - 0.3, 0.31, w - 0.3, flM(0xD0BC8A), 0, 0.155, 0, g);
if (!FL.lite) {
flCyl(0.12, 0.1, 0.15, flM(0xB86A5A), 0.4, 0.38, 0.2, g, 8);
flBox(0.06, 0.02, 0.3, flM(FLC.sky), -0.3, 0.33, -0.2, g);
}
return g;
}
function flRoundabout(G, x, z) { return __ZC(311, 74, this, arguments, new.target); }
function flBench(G, x, z, ry, len) { return __ZC(311, 75, this, arguments, new.target); }
"use strict";
function flBuildWedding(G) { return __ZC(311, 76, this, arguments, new.target); }
function flBoard(G, kind, x, y, z, ry, w, h) { return __ZC(311, 77, this, arguments, new.target); }
function flScreenDraw(S) { return __ZC(311, 78, this, arguments, new.target); }
function flScreensAll() { FL.screens.forEach(function (S) { try {
flScreenDraw(S);
}
catch (e) { } }); }
function flTune(notes, gap) { if (typeof playTone !== "function")
return; notes.forEach(function (n, i) { setTimeout(function () { try {
playTone(n, 0.5);
}
catch (e) { } }, i * (gap || 420)); }); }
function flOrganPlay() { setStatus("<b>The organist plays</b> a slow processional of their own, the low notes humming in the floor."); flTune([262, 330, 392, 523, 392, 440, 349, 392], 520); }
function flBandPlay() { setStatus("<b>The band strikes up</b> a waltz of their own. Couples drift onto the dance floor."); flTune([392, 494, 587, 494, 440, 523, 659, 523, 392], 360); }
function flWedDirectory() { return __ZC(311, 79, this, arguments, new.target); }
"use strict";
function flBuildHearth(G) { return __ZC(311, 80, this, arguments, new.target); }
function flCourse() { return __ZC(311, 81, this, arguments, new.target); }
"use strict";
var FL_FOLK = {
planner: { name: "Celandine Marsh", sex: "f", persona: "the senior wedding planner at the Everbloom Wedding House: warm, unflappable and organised to the minute. You know every room (the Chapel for 120, the Garden under the rose arch, the Rose Room for 20, the Grand Hall for the reception) and every package (the ceremony only, a wedding breakfast for 20, a reception for 60, a grand reception for 120). The licence is 60 gold. Couples book in the Family panel (Menu, then Family) or at your desk, and on the day both say I do at the venue." },
wreception: { name: "Arlo Penhallow", sex: "m", persona: "the receptionist at the Everbloom Wedding House: cheerful and helpful. You tell visitors where everything is: the Ring Counter and the Rose Room to the west, the Bridal Boutique and the cloakroom to the east, the Chapel straight ahead, the Grand Hall off the Chapel's left side and the Garden off its right." },
jeweller: { name: "Isidore Quell", sex: "m", persona: "the jeweller at the Ring Counter of the Everbloom Wedding House: precise, gentle and a little romantic. You explain the engagement rings (solitaire, halo, vintage sapphire, emerald cut) and the wedding bands (gold, white gold, rose gold, platinum). A ring can be given with a proposal: it passes to the one who says yes." },
consultant: { name: "Odette Varley", sex: "f", persona: "the bridal consultant in the Everbloom's Bridal Boutique: kind, honest and delighted by every couple. You help with gowns, suits, veils and flowers, and always say the best outfit is the one a person feels like themselves in." },
wflorist: { name: "Bryony Ashcombe", sex: "f", persona: "the florist at the Everbloom Wedding House: soft-spoken and creative. You make the bouquets, buttonholes and the arches of roses, and you love peonies, sweet peas and eucalyptus." },
officiant: { name: "the Reverend Lysander Hale", sex: "m", persona: "the officiant at the Everbloom Chapel: warm, calm and quietly funny. You marry couples of every kind who are grown up and free to marry. You lead the vows: each says I do, and then you declare them married by the power of the city of Somnucor. You never rush anyone." },
organist: { name: "Philippa Strand", sex: "f", persona: "the organist at the Everbloom Chapel: devoted to the old organ, which you call the Old Lady. You play processionals and recessionals of your own and take requests for a mood." },
photographer: { name: "Kit Morrow", sex: "f", persona: "the wedding photographer at the Everbloom: lively, always moving for the best angle. You love candid laughter more than stiff poses. The grand reception package includes you and a wedding album." },
band: { name: "Duke Albany", sex: "m", persona: "the band leader in the Everbloom's Grand Hall: smooth, funny and full of stories. The band plays waltzes, swing and soft ballads of its own for the first dance and the party after." },
wbar: { name: "Fen Okoro", sex: "m", persona: "the bartender in the Everbloom's Grand Hall: friendly and quick. You serve sparkling elderflower, coffee and water, and canapés come from the servers. You never serve anyone who has had enough." },
maitred: { name: "Margaux Pell", sex: "f", persona: "the maître d' of the Everbloom's Grand Hall: elegant and exacting. You seat the guests, run the three courses and the cake, and make sure every table has its centrepiece." },
chef: { name: "Rafferty Cole", sex: "m", persona: "the banquet chef of the Everbloom Wedding House: big-hearted and loud in the kitchen, calm everywhere else. Three courses for 120 is a normal Saturday for you." },
baker: { name: "Hettie Bramble", sex: "f", persona: "the cake baker at the Everbloom Wedding House: patient and proud of your sugar roses. You make three-tier wedding cakes in lemon, vanilla, chocolate or carrot." },
hair: { name: "Jessamy Lorne", sex: "f", persona: "the hair and make-up artist in the Everbloom's bridal suite: gentle and reassuring, good at calming nerves." },
wmanager: { name: "Barnaby Thorne", sex: "m", persona: "the general manager of the Everbloom Wedding House: calm, courteous and devoted to making every wedding go right." },
wgarden: { name: "Ottilie Fairbairn", sex: "f", persona: "the gardener of the Everbloom's walled garden: weathered, cheerful and proud of the roses on the arch and the hedges." },
freception: { name: "Nell Tremaine", sex: "f", persona: "the receptionist at Hearthside Family House, Somnucor Family Services: warm, patient, good with nervous visitors and with children. You explain how fostering and adoption work: carers are 21 and over, with dues paid, a bedroom free for the child, no bills past due, and enough coming in each fortnight to cover rent, bills and the child's keep. The home study room checks it all. The Family panel (Menu, then Family) shows the children waiting." },
social: { name: "Ambrose Kettering", sex: "m", persona: "a senior social worker at Hearthside Family House: kind, careful and honest. You visit the families who foster and adopt, and you always put the child first. You never share a child's private records." },
study: { name: "Priya Lowell", sex: "f", persona: "the social worker who runs home studies at Hearthside Family House: thorough and encouraging. You check a carer's age (21 and over), their dues, their home (a bedroom free for each child; a little one can have the nursery), their bills (none past due) and their money (what comes in over two weeks against rent, bills and each child's keep)." },
officer: { name: "Marcus Ellery", sex: "m", persona: "the fostering and adoption officer at Hearthside: practical and warm. You run the short course for new carers and explain the keep (140 gold a fortnight for under-fives, 120 for 5 to 11, 160 for 12 to 17), the court fees for adoption (300 after a week of fostering, 500 straight away) and what happens if things go wrong (a letter first; then the child comes back to Hearthside, safe)." },
counsellor: { name: "Dr Imogen Sato", sex: "f", persona: "the family counsellor at Hearthside: gentle and wise. You help children and families through the big changes of fostering and adoption." },
registrar: { name: "Horace Pennywhistle", sex: "m", persona: "the registrar at the Registry Office in Hearthside Family House: formal, precise and secretly sentimental. You conduct civil weddings for up to twelve, keep the register, and file divorces (150 gold) with care and kindness." },
director: { name: "Evangeline Ashford", sex: "f", persona: "the Director of Family Services at Hearthside: firm, fair and fiercely protective of the children in your care." },
houseparent: { name: "Gus Whitlow", sex: "m", persona: "a house parent at Hearthside: big, gentle and good at bedtime stories. You know every child's favourite food and every child's worries." },
cook: { name: "Dot Merriweather", sex: "f", persona: "the cook at Hearthside: generous and no-nonsense. Shepherd's pie, fish on Fridays, a cake on every birthday." },
play: { name: "Sunny Achebe", sex: "f", persona: "the play worker at Hearthside: energetic and endlessly patient, full of games." },
tutor: { name: "Mr Felix Grange", sex: "m", persona: "the homework tutor at Hearthside: calm and encouraging. Spelling, sums, science projects; you believe every child can get there." },
nurse: { name: "Sister Maeve Dunmore", sex: "f", persona: "the children's nurse at Hearthside: brisk and kind. Plasters, check-ups and the occasional cuddle." }
};
function flPersona(f) { return __ZC(311, 82, this, arguments, new.target); }
function flGenericPersona(title, fam) { return __ZC(311, 83, this, arguments, new.target); }
function flStaffName(s) { if (s.talk && FL_FOLK[s.talk])
return FL_FOLK[s.talk].name; return typeof ppName === "function" ? ppName(s.title, "fl" + s.seed) : s.title; }
function flGreet(s, f) { return __ZC(311, 84, this, arguments, new.target); }
function flPeople() { return __ZC(311, 85, this, arguments, new.target); }
function flWingAt(x, z) { for (var i = 0; i < FL.wings.length; i++) {
var W = FL.wings[i];
if (x >= W.x0 && x <= W.x1 && z >= W.z0 && z <= W.z1)
return W;
} return null; }
function flKidFigure(seed, c) { return __ZC(311, 86, this, arguments, new.target); }
var FL_KID_SPOTS = [[FL_FX - 8, -3], [FL_FX + 6, -7], [FL_FX + 9, -8], [FL_FX + 8, 4], [FL_FX - 6, 6], [FL_FX + 30, -5], [FL_FX + 44, 10], [FL_FX + 42, 9], [FL_FX + 36, -10],
[FL_FX + 84, -28], [FL_FX + 92, -14], [FL_FX + 80, -6], [FL_FX + 104, -6], [FL_FX + 92, 2], [FL_FX - 46, -4], [FL_FX - 44, 2], [FL_FX - 52, -37], [FL_FX - 44, -30], [FL_FX + 66, -8], [FL_FX + 26, -12]];
function flKidsPaint() { return __ZC(311, 87, this, arguments, new.target); }
function flKidGreet(c) { return __ZC(311, 88, this, arguments, new.target); }
"use strict";
function flBuild(G) { return __ZC(311, 89, this, arguments, new.target); }
var FL_ARRIVE = { wed: { x: 0, z: 56.5, yaw: 0 }, fam: { x: FL_FX, z: 56.5, yaw: 0 } };
function flPut(x, z, yw) {
camera.position.set(FL.base + x, flGround(x, z, 0) + 1.72, z);
yaw = yw || 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
}
function flEnter(opt) { return __ZC(311, 90, this, arguments, new.target); }
function flLeave() { FL.guide = null; worldCard(null); worldBanner(null); }
function flBack() { flGoOut(); }
function flGoOut() {
var fam = FL.where === "fam";
worldHome(fam ? "<b>Back out in Somnucor.</b> Hearthside Family House behind you, a child waving from an upstairs window." : "<b>Back out in Somnucor.</b> The Everbloom Wedding House behind you, its roses climbing the walls.");
}
function flTick(dt) { return __ZC(311, 91, this, arguments, new.target); }
function flTalk(T) { if (!T)
return; try {
if (T.p && T.p.g)
wFace(T.p.g, camera.position.x - FL.base, camera.position.z);
}
catch (e) { } wTalk(T.t); }
function flFiguresTick(dt, L) { return __ZC(311, 92, this, arguments, new.target); }
function flBannerTick(L) { return __ZC(311, 93, this, arguments, new.target); }
function flShowWay(k) {
var p = FL_PLACES[k];
if (!p)
return;
FL.guide = { x: p.x, z: p.z, name: p.name };
worldCard(null);
setStatus("<b>" + esc(p.name) + "</b>: follow the arrow on the banner at the top.");
}
"use strict";
var FW = { open: false, tab: "wed", sub: null, wed: null, fam: null, at: 0, busy: false, say: "", missing: false,
pick: { venue: "chapel", pkg: "classic", when: 2, guests: [], ring: "", tier: "classic", culture: "classic", off: "", spot: null }, child: null, study: null, friends: null };
function fwMissing(e) { var m = String((e && e.message) || e || ""); return /does not exist|not find the function|PGRST202|404|schema cache/i.test(m); }
function fwErr(e) { if (fwMissing(e)) {
FW.missing = true;
return "Marriage and families open soon.";
} var m = String((e && e.message) || e || "Not now."); try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { } return m; }
function fwHomeArgs() {
try {
if (typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec && typeof hlPlotOf === "function") {
var pl = hlPlotOf(INT.spec), lot = pl && typeof lotByName === "function" ? lotByName(pl.name) : null;
if (pl && lot && lot.lot_id)
return { p_lot: lot.lot_id, p_arch: pl.archetype || null };
}
}
catch (e) { }
return { p_lot: null, p_arch: null };
}
function fwLoad(force) {
if (!flSigned())
return Promise.resolve(null);
if (FW.busy)
return FW.busy;
if (!force && Date.now() - FW.at < 30000)
return Promise.resolve(FW);
if (FW.missing && !force && Date.now() - FW.at < 300000)
return Promise.resolve(FW);
FW.at = Date.now();
FW.busy = Promise.all([cityRpc("wed_board", {}).catch(function (e) { return { err: e }; }), cityRpc("fam_board", fwHomeArgs()).catch(function (e) { return { err: e }; })]).then(function (r) {
FW.busy = false;
if (r[0] && r[0].err) {
FW.say = fwErr(r[0].err);
}
else {
FW.wed = r[0];
FW.missing = false;
}
if (r[1] && !r[1].err) {
FW.fam = r[1];
}
if (typeof fhLookSync === "function")
try {
fhLookSync();
}
catch (e) { }
if (FW.open)
fwPaint();
return FW;
});
return FW.busy;
}
function fwOpen(tab, sub) { return __ZC(311, 94, this, arguments, new.target); }
function fwClose() { FW.open = false; fwPaint(); }
function fwAct(name, body, after) { return __ZC(311, 95, this, arguments, new.target); }
var FW_VENUE_ICON = { chapel: "⛪", garden: "🌹", rose: "🌸", registry: "🏛️", spot: "📍" };
function fwB(act, label, o) { return __ZC(311, 96, this, arguments, new.target); }
function fwHead(t) { return "<div style='font:600 15px var(--serif,Georgia);color:#F0DEB0;margin:12px 0 4px'>" + t + "</div>"; }
function fwDim(t) { return "<div style='opacity:.78;font-size:12.5px;line-height:1.5;margin:2px 0 6px'>" + t + "</div>"; }
function fwWhen(iso) { try {
var d = new Date(iso);
return d.toLocaleString([], { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}
catch (e) {
return String(iso || "");
} }
function fwFriends() { var d = typeof PFR !== "undefined" && PFR.list; return (d && d.ok && d.friends) || []; }
function fwRings() { return (typeof myThings !== "undefined" ? myThings : []).filter(function (t) { return /^wed_ring_/.test(t.archetype || ""); }); }
var FW_WHEN = [["In half an hour", 0.5], ["In two hours", 2], ["This time tomorrow", 24], ["In three days", 72], ["In a week", 168]];
function fwHtml() { return __ZC(311, 97, this, arguments, new.target); }
function fwWedHtml() { return __ZC(311, 98, this, arguments, new.target); }
function fwChildLine(c) {
var bits = [c.age + " years old", c.status === "adopted" ? "adopted" : c.status === "fostered" ? "fostered" : "waiting", "keep " + c.keep + " gold a fortnight"];
return esc(c.name) + " · " + bits.join(" · ");
}
function fwFamHtml() { return __ZC(311, 99, this, arguments, new.target); }
function fwPaint() { return __ZC(311, 100, this, arguments, new.target); }
function fwGo(where, venue) { return __ZC(311, 101, this, arguments, new.target); }
function fwClick(e) { return __ZC(311, 102, this, arguments, new.target); }
function fwCelebrate() { return __ZC(311, 103, this, arguments, new.target); }
function fwShop(kind) { return __ZC(311, 104, this, arguments, new.target); }
function fwVow(venue) { return __ZC(311, 105, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-family"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-family";
b.title = "Marriage, weddings, fostering and adoption";
b.textContent = "💍 Family";
b.onclick = function () { fwOpen(); };
var pk = document.getElementById("me-pack");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!FW.open; }, close: function () { fwClose(); } });
"use strict";
var FN = { energy: null, hygiene: null, rest: null, where: null, inn: null, said: {} };
if (typeof NEEDS_PLACES !== "undefined")
NEEDS_PLACES[FL_WED] = "Canapés, cake and drinks";
function fnExempt() { return typeof NEEDS !== "undefined" && NEEDS.exempt; }
(function () {
if (typeof needsGot !== "function")
return;
var ng = needsGot;
needsGot = function (o) {
if (o && o.ok !== false && o.energy !== undefined) {
var was = FN.rest;
FN.energy = +o.energy;
FN.hygiene = +o.hygiene;
FN.rest = o.rest || null;
FN.where = o.rest_where || null;
FN.inn = o.inn_until || null;
if (was && !FN.rest)
setStatus(was === "wash" ? "<b>Clean and fresh.</b> Hygiene is full again." : "<b>You wake refreshed.</b>" + (was === "nap" ? " A good nap." : " Energy is full again."));
fnNudge();
}
return ng.apply(this, arguments);
};
})();
function fnNudge() { return __ZC(311, 106, this, arguments, new.target); }
function fnCol(k, v) { return v < 15 ? "#D0553F" : k === "energy" ? "#C8B456" : "#5FB8A8"; }
(function () {
if (typeof needsPaint !== "function")
return;
var np = needsPaint;
needsPaint = function () {
var r = np.apply(this, arguments);
try {
var d = typeof NEEDS !== "undefined" && NEEDS.el;
if (!d || !NEEDS.shown || FN.energy == null)
return r;
var ex = fnExempt(), e = ex ? 100 : FN.energy, hy = ex ? 100 : FN.hygiene;
var more = "<div class='nr' data-fn='1'><span class='nl'>Energy</span><span class='nb'><span class='nf' style='display:block;width:" + Math.max(0, Math.min(100, e)) + "%;background:" + fnCol("energy", e) + "'></span></span><span class='nv'>" + (FN.rest === "sleep" || FN.rest === "nap" ? "💤" : Math.round(e)) + "</span></div>" +
"<div class='nr' data-fn='1'><span class='nl'>Hygiene</span><span class='nb'><span class='nf' style='display:block;width:" + Math.max(0, Math.min(100, hy)) + "%;background:" + fnCol("hygiene", hy) + "'></span></span><span class='nv'>" + (FN.rest === "wash" ? "🛁" : Math.round(hy)) + "</span></div>";
var base = d.dataset.h || "";
if (d.dataset.fn !== more || d.innerHTML.indexOf("data-fn") < 0) {
var i = base.indexOf("<div class='ns'");
d.innerHTML = i >= 0 ? base.slice(0, i) + more + base.slice(i) : base + more;
d.dataset.fn = more;
}
}
catch (x) { }
return r;
};
})();
function fnInside() { return typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.root; }
function fnEyrieMine() {
if (typeof eydHereNum !== "function" || typeof CORP === "undefined" || !CORP.data)
return false;
var n = eydHereNum();
return !!(n && CORP.data.apartment === n);
}
function fnDreamHome() { return __ZC(311, 107, this, arguments, new.target); }
function fnHomeHere() { return __ZC(311, 108, this, arguments, new.target); }
function fnHomeWhere() {
if (!fnHomeHere())
return null;
try {
if (fnEyrieMine())
return "eyrie";
if (fnDreamHome())
return "dream";
}
catch (e) { }
return "home";
}
function fnInnHere() { return fnInside() && INT.spec && (INT.spec.workplace === "The Somnucor Inn" || INT.spec.label === "The Somnucor Inn"); }
var FN_BED = /^(bed|bunk|cot|crib|podbed|fourposter|doublebed|singlebed|bedroll|futon|hammock)$/, FN_NAP = /^(sofa|couch|armchair|chaise|daybed)$/, FN_WASH = /^(bathtub|bath|shower|tub|sink|basin|washbasin|washstand)$/;
var FN_SLEEP2 = /^(es|gp|wg|gmw|vc)?(bed|bunk|cot|crib|cradle|podbed|fourposter|doublebed|singlebed|bedroll|futon|hammock|beddouble|bedsingle|bedbunk|bedking|bedqueen|bedtwin\d*)$/;
var FN_NAP2 = /^(es|vc)?(sofa|couch|armchair|chaise|daybed|settee|loveseat|recliner|lounger|loungesofa|loungesofalong|loungesofacorner|loungechair|loungechairrelax|loungedesignsofa|loungedesignsofacorner|loungedesignchair|couch(large|medium|small)?\d*|couchl)$/;
var FN_WASH2 = /^(es|gp|vc)?(bathtub|bath|shower|tub|sink|basin|washbasin|washstand|bathfree|basinrow|sauna|bathroomsink|bathroomsinksquare|bathroombathtub|bathroomshower\d*)$/;
function fnFurnHow(k) { return __ZC(311, 109, this, arguments, new.target); }
function fnNearFurn() { return __ZC(311, 110, this, arguments, new.target); }
function fnRest(how, where) { return __ZC(311, 111, this, arguments, new.target); }
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
try {
if (typeof tsPrompt === "function" && !(typeof WLD !== "undefined" && WLD && WLD.on) && FN.energy != null && !fnExempt()) {
var home = fnHomeWhere(), inn = !home && fnInnHere();
if (home || inn) {
var f = fnNearFurn();
if (f) {
var where = home || "inn";
if (FN.rest && FN.rest !== "wash" === (f.how !== "wash")) {
tsPrompt("<b>" + (FN.rest === "wash" ? "Washing" : "Resting") + "</b> · <b>press E</b> (or tap here) to get up", function () { fnRest("stop"); });
return;
}
var say = f.how === "sleep" ? "<b>A bed</b> · <b>press E</b> (or tap here) to sleep" + (inn ? " (a room is 14 gold a night)" : "") + " · energy " + Math.round(FN.energy) :
f.how === "nap" ? "<b>A " + esc(f.k) + "</b> · <b>press E</b> (or tap here) for a nap · energy " + Math.round(FN.energy) :
"<b>A " + esc(f.k) + "</b> · <b>press E</b> (or tap here) to wash · hygiene " + Math.round(FN.hygiene);
tsPrompt(say, function () { fnRest(f.how, where); });
return;
}
}
}
}
catch (e) { }
return tt.apply(this, arguments);
};
})();
(function () {
if (typeof needsCardHtml !== "function")
return;
var ch = needsCardHtml, cf = needsCardFns;
needsCardHtml = function () {
var h = ch.apply(this, arguments);
if (FN.energy == null || NEEDS.missing)
return h;
var ex = fnExempt(), home = fnHomeHere(), inn = fnInnHere(), extra = "";
var rows = "<div style='margin:6px 0 2px'><b>Energy</b> " + (ex ? 100 : Math.round(FN.energy)) + " of 100" + (FN.rest === "sleep" ? " · asleep" : FN.rest === "nap" ? " · napping" : FN.energy < 15 && !ex ? " · exhausted (you walk slower)" : FN.energy < 30 && !ex ? " · tired" : "") + "<br>" +
"<b>Hygiene</b> " + (ex ? 100 : Math.round(FN.hygiene)) + " of 100" + (FN.rest === "wash" ? " · washing" : FN.hygiene < 15 && !ex ? " · grubby (colds catch you more easily)" : FN.hygiene < 30 && !ex ? " · could do with a wash" : "") + "</div>" +
"<div style='opacity:.8;font-size:12px'>Energy lasts about 16 hours of play and comes back by sleeping in a bed (about 25 minutes from empty) or a nap on a sofa. Hygiene lasts about 12 hours and comes back with a bath or a shower (about 8 minutes). At home, or at the Somnucor Inn (14 gold a night).</div>";
if (!ex) {
if (FN.rest)
extra += worldBtn("fnstop", "Get up", "stop " + (FN.rest === "wash" ? "washing" : "resting"));
else if (home || inn) {
extra += worldBtn("fnsleep", "😴 Sleep here", inn ? "14 gold for a room tonight, unless you have one" : "in your own bed") + worldBtn("fnwash", "🛁 Wash here", inn ? "the Inn's baths" : "your bath or shower");
}
else
extra += worldBtn("fnhome", "Show me the way home", "your bed and your bath") + worldBtn("fninn", "Show me the way to the Somnucor Inn", "a room for the night, 14 gold");
}
var i = h.lastIndexOf("</div>");
return i > 0 ? h.slice(0, i) + rows + extra + h.slice(i) : h + rows + extra;
};
needsCardFns = function () {
var f = cf.apply(this, arguments);
f.fnstop = function () { worldCard(null); NEEDS.open = null; fnRest("stop"); };
f.fnsleep = function () { worldCard(null); NEEDS.open = null; fnRest("sleep", fnHomeWhere() || (fnInnHere() ? "inn" : "home")); };
f.fnwash = function () { worldCard(null); NEEDS.open = null; fnRest("wash", fnHomeWhere() || (fnInnHere() ? "inn" : "home")); };
f.fninn = function () { worldCard(null); NEEDS.open = null; showTheWay("The Somnucor Inn"); };
f.fnhome = function () {
worldCard(null);
NEEDS.open = null;
var l = ((typeof standing !== "undefined" && standing && standing.lots) || [])[0], H = FW.fam && FW.fam.house;
if (l && typeof showTheWay === "function")
showTheWay(l.lot);
else if (H && H.name && typeof showTheWay === "function")
showTheWay(H.name);
else
setStatus("You have no home of your own yet. The Land Office has homes; until then the Somnucor Inn has rooms.");
};
return f;
};
})();
(function () {
if (typeof harmPace !== "function")
return;
var hp = harmPace;
harmPace = function () { var k = hp.apply(this, arguments); if (!fnExempt() && FN.energy != null && FN.energy < 15)
k *= 0.82; return k; };
})();
(function () {
if (typeof addEventListener !== "function")
return;
addEventListener("keydown", function (e) {
if (!FN.rest || !/^(KeyW|KeyA|KeyS|KeyD|ArrowUp|ArrowDown|ArrowLeft|ArrowRight)$/.test(e.code || ""))
return;
if (document.activeElement && /TEXTAREA|INPUT/.test(document.activeElement.tagName))
return;
FN.rest = null;
fnRest("stop");
});
})();
var FNW = { fn: null };
function fnWorldKey() {
if (typeof WLD === "undefined" || !WLD || !WLD.on)
return null;
var k = WLD.on;
if (k === "surface")
k = typeof whSurfKey === "function" ? whSurfKey() : null;
return k === "aurora" ? "station" : k;
}
(function () {
if (typeof whFurnish !== "function")
return;
var wf = whFurnish;
whFurnish = function (g, S, W, D, seed) {
var r = wf.apply(this, arguments);
try {
var x = -W / 2 + 0.35, z = 0.2, por = wM(0xB4AEA4), chrome = wM(0x8A9098), mir = wM(0x5E6A74);
wCyl(0.08, 0.11, 0.74, por, x, 0.37, z, g, 10);
var bw = wCyl(0.21, 0.15, 0.14, por, x, 0.8, z, g, 14);
wCyl(0.17, 0.17, 0.02, wM(0x8AA4AE), x, 0.86, z, g, 14);
wCyl(0.018, 0.018, 0.2, chrome, x - 0.16, 0.96, z, g, 6);
wBox(0.12, 0.03, 0.03, chrome, x - 0.1, 1.05, z, g);
wCyl(0.025, 0.025, 0.5, chrome, x - 0.2, 1.12, z, g, 6);
wBox(0.05, 0.62, 0.46, wM(0x5A4632), x - 0.21, 1.62, z, g);
wBox(0.02, 0.54, 0.38, mir, x - 0.18, 1.62, z, g);
}
catch (e) { }
return r;
};
})();
function fnWorldHomeHere() { return __ZC(311, 112, this, arguments, new.target); }
function fnWorldHomeMine(h) { return __ZC(311, 113, this, arguments, new.target); }
function fnWorldTick() { return __ZC(311, 114, this, arguments, new.target); }
(function () {
if (typeof worldTick !== "function")
return;
var wt = worldTick;
worldTick = function () { var r = wt.apply(this, arguments); try {
if (WLD.on)
fnWorldTick();
}
catch (e) { } return r; };
})();
function fnSeatRest() {
if (FN.energy == null || fnExempt())
return null;
var where = fnHomeWhere() || (fnInnHere() ? "inn" : null);
if (!where)
return null;
var f = fnNearFurn();
return f ? { how: f.how, k: f.k, where: where } : null;
}
(function hook() {
if (typeof sofChip !== "function" || typeof sofSit !== "function" || typeof sofStand !== "function") {
hook.n = (hook.n || 0) + 1;
if (hook.n < 240)
setTimeout(hook, 500);
return;
}
var sc = sofChip, ss = sofSit, st = sofStand;
sofChip = function () {
var r = sc.apply(this, arguments);
try {
var el = document.getElementById("sof-chip");
if (!el || el.style.display === "none")
return r;
var b = el.querySelector("[data-fnrest]"), R = fnSeatRest();
if (!R) {
if (b)
b.remove();
return r;
}
if (!b) {
b = document.createElement("button");
b.type = "button";
b.setAttribute("data-fnrest", "1");
b.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); var q = fnSeatRest(); if (q)
fnRest(q.how, q.where); });
el.insertBefore(b, el.querySelector(".sof-k"));
}
b.textContent = R.how === "sleep" ? "😴 Sleep" : R.how === "nap" ? "😌 Nap" : "🛁 Wash";
}
catch (e) { }
return r;
};
sofSit = function (s, how) {
var R = null;
try {
R = fnSeatRest();
}
catch (e) { }
var r = ss.apply(this, arguments);
try {
if (r && how === "lie" && R && R.how !== "wash" && !FN.rest) {
FNW.seat = 1;
fnRest(R.how, R.where);
}
}
catch (e) { }
return r;
};
sofStand = function () {
var r = st.apply(this, arguments);
try {
if (FNW.seat) {
FNW.seat = 0;
if (FN.rest && FN.rest !== "wash")
fnRest("stop");
}
}
catch (e) { }
return r;
};
})();
"use strict";
var FH = { root: null, figs: [], walk: null, walkKey: "", lookKey: null };
function fhMine() { return ((typeof FW !== "undefined" && FW.fam && FW.fam.mine) || []); }
function fhSchoolNow() {
var d = new Date(), day = d.getDay();
if (day === 0 || day === 6)
return false;
var h = typeof cityHourNow === "function" ? cityHourNow() : d.getHours() + d.getMinutes() / 60;
return h >= 8.5 && h < 15;
}
function fhAtSchool(c) { return c.age >= 5 && fhSchoolNow(); }
function fhClear() { FH.figs.forEach(function (f) { if (f.g.parent)
f.g.parent.remove(f.g); }); FH.figs = []; }
function fhTalkTo(c) { return __ZC(311, 115, this, arguments, new.target); }
function fhHomeTick() {
var inside = typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.root;
var root = inside && typeof fnHomeHere === "function" && fnHomeHere() ? INT.root : null;
var mine = fhMine().filter(function (c) { return !c.out && !fhAtSchool(c); });
var key = (root ? root.uuid : "") + "|" + mine.map(function (c) { return c.id + ":" + c.age; }).join(",");
if (key === FH.homeKey)
return;
FH.homeKey = key;
fhClear();
FH.root = root;
if (!root || !mine.length)
return;
var beds = [], cribs = [];
root.children.forEach(function (c) {
var f = typeof fnFurnHow === "function" ? fnFurnHow(c.userData && c.userData.furn) : null;
if (f && f.how === "sleep")
(f.k === "cot" ? cribs : beds).push(c);
});
var spots = [];
mine.forEach(function (c, i) {
var at = null;
if (c.age < 3 && cribs.length)
at = cribs[i % cribs.length];
else if (beds.length > 1)
at = beds[1 + (i % (beds.length - 1))];
else if (beds.length)
at = beds[0];
var x = at ? at.position.x + 0.9 : (i - mine.length / 2) * 1.2, z = at ? at.position.z + 0.6 : 1.5, y = at ? at.position.y : 0;
spots.push([x, y, z]);
try {
var g = flKidFigure("home" + c.id, c);
g.position.set(x, y, z);
g.rotation.y = (i * 1.3) % 6.28;
try {
var tg = makeTag(String(c.name).split(" ")[0], false);
tg.position.y = c.age < 5 ? 1.2 : c.age < 13 ? 1.6 : 1.95;
g.add(tg);
}
catch (e) { }
root.add(g);
FH.figs.push({ g: g, c: c });
}
catch (e) {
if (window.console)
console.warn("[family] home child", e);
}
});
}
function fhNearKid() {
if (!FH.figs.length || !FH.root || typeof INT === "undefined" || !INT)
return null;
var P = camera.position, best = null, bd = 2.4;
FH.figs.forEach(function (f) { var d = Math.hypot(P.x - (INT.ox + f.g.position.x), P.z - (INT.oz + f.g.position.z)); if (d < bd) {
bd = d;
best = f;
} });
return best;
}
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
try {
if (typeof tsPrompt === "function" && !(typeof WLD !== "undefined" && WLD && WLD.on)) {
var f = fhNearKid();
if (f) {
tsPrompt("<b>" + esc(String(f.c.name).split(" ")[0]) + "</b> · <b>press E</b> (or tap here) to talk; ☰ Menu, 💍 Family to look after them", function () { fhTalkTo(f.c); });
return;
}
}
}
catch (e) { }
return tt.apply(this, arguments);
};
})();
function fhWalker() { var m = fhMine(); for (var i = 0; i < m.length; i++)
if (m[i].out)
return m[i]; return null; }
function fhLookSync() {
var c = fhWalker(), L = typeof meLook === "function" ? meLook() : null;
if (!L)
return;
var want = c ? { n: String(c.name).split(" ")[0].slice(0, 20), s: c.sex === "f" ? "f" : "m", a: Math.max(0, Math.min(17, +c.age || 8)), id: c.id } : null;
if (JSON.stringify(L.kid || null) === JSON.stringify(want))
return;
if (want)
L.kid = want;
else
delete L.kid;
if (typeof publishMyLook === "function")
publishMyLook();
}
function fhWalkTick(dt) {
var c = fhWalker(), key = c ? c.id + "|" + c.age : "";
if (key !== FH.walkKey) {
if (FH.walk && FH.walk.parent)
FH.walk.parent.remove(FH.walk);
FH.walk = null;
FH.walkKey = key;
if (c && typeof scene !== "undefined" && scene) {
try {
FH.walk = flKidFigure("walk" + c.id, c);
FH.walk.visible = false;
scene.add(FH.walk);
}
catch (e) { }
}
}
var g = FH.walk;
if (!g)
return;
var show = typeof walkMode !== "undefined" && walkMode && !(typeof DRIVE !== "undefined" && DRIVE && DRIVE.on) && !fhAtSchool(c);
g.visible = show;
if (!show) {
g.userData.placed = false;
return;
}
var P = camera.position, feet = P.y - 1.72, fy = -Math.sin(yaw), fz = -Math.cos(yaw);
var tx = P.x + fy * 0.4 + fz * 0.9, tz = P.z + fz * 0.4 - fy * 0.9;
var u = g.userData, d = Math.hypot(tx - g.position.x, tz - g.position.z);
if (!u.placed || d > 30 || Math.abs(g.position.y - feet) > 8) {
g.position.set(tx, feet, tz);
u.placed = true;
d = 0;
}
if (d > 0.2) {
var step = Math.min(d, Math.max(2.4, d * 3) * dt);
g.position.x += (tx - g.position.x) / d * step;
g.position.z += (tz - g.position.z) / d * step;
g.rotation.y = Math.atan2(tx - g.position.x, tz - g.position.z) || g.rotation.y;
}
else
g.rotation.y = yaw + Math.PI;
var sup = typeof supportAt === "function" ? supportAt(g.position.x, g.position.z, g.position.y + 0.3) : feet;
if (Math.abs(sup - feet) > 2.5)
sup = feet;
g.position.y += (sup - g.position.y) * Math.min(1, dt * 10);
}
(function () {
if (typeof presenceGroupFor !== "function")
return;
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg(row), k = row && !row.away && row.look && row.look.kid;
if (k && typeof k === "object" && /^[mf]$/.test(k.s || "") && +k.a >= 0 && +k.a < 18) {
try {
var v = flKidFigure("other" + row.user_id + (k.id || ""), { age: +k.a, sex: k.s });
v.position.set(-0.9, 0, -0.4);
g.add(v);
g.userData.flKid = v;
try {
var tg = makeTag(String(k.n || "").slice(0, 20), false);
tg.position.y = +k.a < 5 ? 1.2 : +k.a < 13 ? 1.6 : 1.95;
tg.scale.multiplyScalar(0.8);
v.add(tg);
}
catch (e) { }
}
catch (e) { }
}
return g;
};
})();
(function () {
var last = 0;
function frame(t) {
requestAnimationFrame(frame);
var dt = last ? Math.min(0.1, (t - last) / 1000) : 0.016;
last = t;
if (document.hidden || typeof camera === "undefined" || !camera)
return;
try {
fhWalkTick(dt);
}
catch (e) {
if (!FH.warned && window.console) {
FH.warned = 1;
console.warn("[family]", e);
}
}
}
requestAnimationFrame(frame);
setInterval(function () {
if (document.hidden)
return;
try {
fhHomeTick();
}
catch (e) { }
if (!(typeof signedIn === "function" && signedIn()) || FW.missing)
return;
var wait = FH.root ? 60000 : 240000;
if (Date.now() - FW.at > wait)
fwLoad(false);
}, 2000);
})();
"use strict";
var FL_WED_JOBS = [], FL_FAM_JOBS = [];
for (var fli = 3400; fli <= 3419; fli++)
FL_WED_JOBS.push(fli);
for (var flj = 3450; flj <= 3463; flj++)
FL_FAM_JOBS.push(flj);
if (typeof cityWorkplace === "function") {
cityWorkplace({ key: FL_WED, ring: "markets", arch: "palace", s: 0.58, jobs: FL_WED_JOBS, fit: ["desk", "noticeboard", "shelfgoods", "crates", "workbench"],
note: "The Everbloom Wedding House: the Chapel for 120, the walled Garden, the Rose Room, the Grand Hall for receptions, the Ring Counter and the Bridal Boutique. Proposals, bookings and the vows." });
cityWorkplace({ key: FL_FAM, ring: "markets", arch: "manor", s: 0.7, jobs: FL_FAM_JOBS, fit: ["desk", "noticeboard", "shelfgoods", "crates", "workbench"],
note: "Hearthside Family House: Somnucor Family Services, the children's home and the Registry Office. Fostering, adoption, civil weddings and divorces." });
}
if (typeof cityMore === "function")
cityMore("xfl", function (C) {
var f = cityFrontage(C, FL_WED, 1080, 4) || cityFrontage(C, FL_WED, 1080, 7) || cityFrontage(C, FL_WED, 245, 6);
if (f && f.spec) {
f.spec.attrs.c = 0xD2C8B6;
f.spec.attrs.rc = 0x6A7A5E;
var kb = C.kerb(f.rs, f.side), face = f.side > 0 ? rotIn(f.a) : rotOut(f.a);
C.at("ornatelamp", kb, f.a + (f.w / 2 - 2) / kb, 0);
C.at("ornatelamp", kb, f.a - (f.w / 2 - 2) / kb, 0);
C.at("flowerbed", kb + f.side * 3, f.a + (f.w / 4) / kb, face);
C.at("flowerbed", kb + f.side * 3, f.a - (f.w / 4) / kb, face);
C.at("topiary", kb + f.side * 2, f.a, 0);
}
var h = cityFrontage(C, FL_FAM, 1080, 5) || cityFrontage(C, FL_FAM, 1080, 8) || cityFrontage(C, FL_FAM, 245, 7);
if (h && h.spec) {
h.spec.attrs.c = 0xB89880;
h.spec.attrs.rc = 0x5A4A44;
var kb2 = C.kerb(h.rs, h.side), face2 = h.side > 0 ? rotIn(h.a) : rotOut(h.a);
C.at("flowerbed", kb2 + h.side * 3, h.a + (h.w / 4) / kb2, face2);
C.at("flowerbed", kb2 + h.side * 3, h.a - (h.w / 4) / kb2, face2);
C.at("ornatelamp", kb2, h.a, 0);
}
});
function flIsWed(spec) { return !!(spec && spec.city && (spec.workplace === FL_WED || spec.label === FL_WED)); }
function flIsFam(spec) { return !!(spec && spec.city && (spec.workplace === FL_FAM || spec.label === FL_FAM)); }
function flGoIn(spec, at) { return __ZC(311, 116, this, arguments, new.target); }
(function () {
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
if (flIsWed(spec)) {
try {
return flGoIn(spec, "wed");
}
catch (e) {
if (window.console)
console.warn("[family] in", e);
}
}
if (flIsFam(spec)) {
try {
return flGoIn(spec, "fam");
}
catch (e) {
if (window.console)
console.warn("[family] in", e);
}
}
return eb.apply(this, arguments);
};
}
if (typeof enterable === "function") {
var en = enterable;
enterable = function (spec) { if (flIsWed(spec) || flIsFam(spec))
return true; return en.apply(this, arguments); };
}
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { if (job && (job.workplace === FL_WED || job.workplace === FL_FAM || (+job.job_id >= FL_JOB0 && +job.job_id <= FL_JOB1)) && typeof WLD !== "undefined" && WLD.on === "family")
return true; return os.apply(this, arguments); };
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) { if ((key === FL_WED || key === FL_FAM) && typeof WLD !== "undefined" && WLD.on === "family")
return flShowWay(key === FL_FAM ? "lobby" : "foyer"); return sw.apply(this, arguments); };
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () { if (typeof WLD !== "undefined" && WLD.on === "family") {
var L = worldLocal();
return { key: L.x > FL_FX * 0.5 ? FL_FAM : FL_WED, inside: true };
} return aw.apply(this, arguments); };
}
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-family]")) {
[["wed", "💍 The Everbloom Wedding House"], ["fam", "👪 Hearthside Family House"]].forEach(function (q) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-family", q[0]);
b.textContent = q[1];
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } worldGo("family", { at: q[0] }); };
row.parentNode.appendChild(b);
});
}
}
catch (e) { }
return r;
};
}
})();
function flTest() { return { FL: FL, FW: FW, FN: FN, FH: FH }; }
