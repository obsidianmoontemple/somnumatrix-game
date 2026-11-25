/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SPT_SCHOOLS0 = [
["city", "The City School", "Somnucor Night Owls", "Night Owls", "owl", "#1E2E6A", "#E8B83A", "#FFFFFF", "Somnucor, Academy Row", 74],
["commons", "The Commons School", "Commons Foxes", "Foxes", "fox", "#1F5A3A", "#E8782A", "#FFF4E0", "Somnucor, the Commons", 71],
["greenwold", "Greenwold High", "Greenwold Stags", "Stags", "stag", "#5A3A1E", "#D8C08A", "#F4ECD8", "Greenwold", 69],
["jubilee", "Jubilee Academy", "Jubilee Comets", "Comets", "comet", "#4A2A7A", "#C8CCD8", "#FFFFFF", "Jubilee", 70],
["london", "London Grammar", "London Lions", "Lions", "lion", "#A01E28", "#F4F0E8", "#1A1A2A", "London", 72],
["guildlands", "Guildlands Tech", "Guildlands Bears", "Bears", "bear", "#3A4048", "#E87A1E", "#F0F0F0", "the Guildlands", 68],
["harbour", "Harbourside High", "Harbour Mariners", "Mariners", "anchor", "#0E6A72", "#F4F4F4", "#0A2A3A", "Somnucor, the Harbour", 67],
["northgate", "Northgate Prep", "Northgate Wolves", "Wolves", "wolf", "#16161E", "#B8C0CC", "#5AA0E8", "Northgate", 66]
];
var SPT_EMBLEMS = [["owl", "Owl"], ["fox", "Fox"], ["stag", "Stag"], ["comet", "Comet"], ["lion", "Lion"], ["bear", "Bear"], ["anchor", "Anchor"], ["wolf", "Wolf"],
["eagle", "Eagle"], ["star", "Star"], ["shield", "Shield"], ["bolt", "Lightning bolt"], ["crown", "Crown"], ["moon", "Moon"]];
var SPT_SPORTS = {
fb: { name: "Football", icon: "🏈", q: 12, breakQ: 120, half: 900, ot: 0, players: 11, day: 5, hour: 19, min: 0 },
bb: { name: "Basketball", icon: "🏀", q: 8, breakQ: 60, half: 600, ot: 4, players: 5, day: 2, hour: 18, min: 30 }
};
var SPT_SECTIONS = [["student", "Student section", 0], ["upper", "Upper bowl", 15], ["lower", "Lower bowl", 30], ["club", "Club seats", 75], ["court", "Courtside / sideline", 150]];
function sptMerge(c) { return __ZC(412, 0, this, arguments, new.target); }
function sptSchoolsOn(C) { return C.schools.filter(function (s) { return s.on; }); }
function sptHash(str) { var h = 2166136261 >>> 0; str = String(str); for (var i = 0; i < str.length; i++) {
h ^= str.charCodeAt(i);
h = Math.imul(h, 16777619) >>> 0;
} return h >>> 0; }
function sptRng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function sptBell(R, mean, sd) { return mean + sd * ((R() + R() + R() + R() - 2) * 1.732); }
function sptAZ(y, m, d, h, mi) { return Date.UTC(y, m, d, h + 7, mi || 0); }
function sptAZParts(ms) { var d = new Date(ms - 7 * 3600000); return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), wd: d.getUTCDay(), h: d.getUTCHours(), mi: d.getUTCMinutes() }; }
function sptSeasonYear(sport, now) { var p = sptAZParts(now || Date.now()); if (sport === "fb")
return p.m >= 6 ? p.y : p.y - 1; return p.m >= 6 ? p.y : p.y - 1; }
function sptRoundRobin(ids) {
var t = ids.slice();
if (t.length % 2)
t.push(null);
var n = t.length, rounds = [];
for (var r = 0; r < n - 1; r++) {
var games = [];
for (var i = 0; i < n / 2; i++) {
var a = t[i], b = t[n - 1 - i];
if (a && b)
games.push((r + i) % 2 ? [b, a] : [a, b]);
}
rounds.push(games);
t.splice(1, 0, t.pop());
}
return rounds;
}
function sptFixtures(sport, year, C) { return __ZC(412, 1, this, arguments, new.target); }
function sptWhen(ms) {
var p = sptAZParts(ms), D = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var h = p.h % 12 || 12;
return D[p.wd] + " " + M[p.m] + " " + p.d + ", " + h + (p.mi ? ":" + ("0" + p.mi).slice(-2) : "") + (p.h < 12 ? " am" : " pm") + " Arizona time";
}
function sptMoney(n) { return n > 0 ? n.toLocaleString() + " gold" : "free"; }
function sptPriceFor(C, f, sec) { var p = C.prices[sec] || 0; if (f && f.kind === "final")
p = Math.round(p * C.finalX); return p; }
var SPT = { key: "sports", base: -4400000, cfg: null, cfgAt: 0, board: null, boardAt: 0, busy: false, G: null, K: null, built: false, lite: false, t: 0, pt: 0,
mats: {}, geos: {}, myFn: null, game: null, watch: {}, results: {}, posted: {}, sims: {}, emb: {}, wantAt: null, msg: "" };
function sptCfg() {
if (!SPT.cfg || Date.now() - SPT.cfgAt > 20000) {
var c = (typeof cloudSetting === "function") ? cloudSetting("sports") : null;
SPT.cfg = sptMerge(c);
SPT.cfgAt = Date.now();
}
return SPT.cfg;
}
function sptLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); }
function sptKeeper() { try {
return typeof isKeeperNow === "function" && isKeeperNow();
}
catch (e) {
return false;
} }
function sptSigned() { return typeof signedIn === "function" && signedIn(); }
function sptEsc(s) { return (typeof esc === "function") ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function sptSay(h, secs) { return __ZC(412, 2, this, arguments, new.target); }
function sptSchool(id) { var C = sptCfg(); return C.schools.filter(function (s) { return s.id === id; })[0] || C.schools[0]; }
function sptMyCampus() { try {
var s = localStorage.getItem("spt_campus");
if (s && sptCfg().schools.some(function (x) { return x.id === s; }))
return s;
}
catch (e) { } var B = SPT.board && SPT.board.me; if (B && B.fb)
return B.fb.school; return "city"; }
function sptRpc(name, body) { return __ZC(412, 3, this, arguments, new.target); }
function sptLoad(force) { return __ZC(412, 4, this, arguments, new.target); }
var SPT_FIRST = ["Avery", "Jordan", "Riley", "Quinn", "Morgan", "Casey", "Rowan", "Emerson", "Hayden", "Parker", "Reese", "Skyler", "Dakota", "Jamie", "Kendall", "Logan", "Micah", "Peyton", "Sawyer", "Taylor",
"Marcus", "Elena", "Theo", "Imani", "Diego", "Priya", "Malik", "Sofia", "Kofi", "Hana", "Luca", "Amara", "Mateo", "Zara", "Isaac", "Nia", "Ezra", "Leila", "Owen", "Maya"];
var SPT_LAST = ["Okafor", "Reyes", "Lindqvist", "Nakamura", "Brennan", "Castillo", "Adeyemi", "Holloway", "Kowalski", "Delgado", "Mbeki", "Sterling", "Fairweather", "Ashby", "Quintero", "Whitlock",
"Moreau", "Haddad", "Petrov", "Calloway", "Osei", "Varga", "Thornton", "Sato", "Abernathy", "Ferreira", "Kincaid", "Duval", "Novak", "Iwu"];
var SPT_FB_POS = ["QB", "RB", "WR", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT", "DE", "DT", "DT", "DE", "LB", "LB", "LB", "CB", "CB", "S", "S", "K"];
var SPT_BB_POS = ["PG", "SG", "SF", "PF", "C", "G", "F", "C", "G", "F"];
function sptSquad(school, sport, season) { return __ZC(412, 5, this, arguments, new.target); }
function sptP(squad, pos, n) { var k = 0; for (var i = 0; i < squad.length; i++)
if (squad[i].pos === pos) {
if (k === (n || 0))
return squad[i];
k++;
} return squad[0]; }
function sptPN(P) { return P ? P.name.split(" ").slice(-1)[0] : "the player"; }
function sptSeason(sport, year) { return __ZC(412, 6, this, arguments, new.target); }
function sptFinal(f, now) { if (SPT.results[f.id])
return SPT.results[f.id]; var S = sptSim(f); if (!S)
return null; if ((now || Date.now()) < f.kick + S.end * 1000)
return null; return S.sc; }
function sptWinner(f) { var s = sptFinal(f); if (!s)
return null; return s[0] > s[1] ? f.home : f.away; }
function sptTable(sport, reg, now) { return __ZC(412, 7, this, arguments, new.target); }
function sptAtVenue(venue, now) { return __ZC(412, 8, this, arguments, new.target); }
function sptNext(filter, n) { return __ZC(412, 9, this, arguments, new.target); }
function sptSim(f) { return __ZC(412, 10, this, arguments, new.target); }
function sptSimFb(f, rh, ra, qm) { return __ZC(412, 11, this, arguments, new.target); }
function sptSimBb(f, rh, ra, qm) { return __ZC(412, 12, this, arguments, new.target); }
function sptSimAt(S, secs) {
var lo = 0, hi = S.ev.length - 1, i = -1;
while (lo <= hi) {
var m = (lo + hi) >> 1;
if (S.ev[m].t <= secs) {
i = m;
lo = m + 1;
}
else
hi = m - 1;
}
return i;
}
function sptCall(f, e) { return __ZC(412, 13, this, arguments, new.target); }
function sptClock(s) { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
function sptMat(col, tex, o) { return __ZC(412, 14, this, arguments, new.target); }
function sptBasic(col, op) { var k = "b|" + col + "|" + op; if (!SPT.mats[k])
SPT.mats[k] = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op }); return SPT.mats[k]; }
function sptCanvas(w, h, draw) { var cv = document.createElement("canvas"); cv.width = w; cv.height = h; var x = cv.getContext("2d"); try {
draw(x, w, h);
}
catch (e) {
if (window.console)
console.warn("[sports] paint", e);
} return cv; }
function sptCanvasMat(key, w, h, draw, o) { return __ZC(412, 15, this, arguments, new.target); }
function sptPar() { return (SPT.K && SPT.K.F) || SPT.G; }
function sptBox(w, h, d, mat, x, y, z, parent) {
var k = w.toFixed(2) + "," + h.toFixed(2) + "," + d.toFixed(2), g = SPT.geos[k];
if (!g) {
g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
SPT.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || sptPar()).add(m);
return m;
}
function sptCyl(r, h, mat, x, y, z, parent, seg, r2) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, h, seg || 12), mat); m.position.set(x, y, z); (parent || sptPar()).add(m); return m; }
function sptPlane(w, h, mat, x, y, z, ry, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry || 0; (parent || sptPar()).add(m); return m; }
function sptFlat(w, d, mat, x, y, z, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); (parent || sptPar()).add(m); return m; }
function sptGroup(x, y, z, parent) { var g = new THREE.Group(); g.position.set(x, y || 0, z); (parent || sptPar()).add(g); return g; }
function sptCtx() { return { F: null, solids: [], tiers: [], floors: [], spots: [], rooms: [], venues: {}, boards: [], gates: [] }; }
function sptSolid(x, z, hw, hd, h, b) { var S = { x: x, z: z, hw: hw, hd: hd, h: h || 4, b: b || 0 }; SPT.K.solids.push(S); return S; }
function sptTier(T) { T.y0 = T.y0 || 0; T.side = T.side || "all"; T.gaps = T.gaps || []; T.out = T.rows * T.dep; SPT.K.tiers.push(T); return T; }
function sptTierE(T, x, z) { return __ZC(412, 16, this, arguments, new.target); }
function sptGround(x, z, feet) { return __ZC(412, 17, this, arguments, new.target); }
function sptBlocked(x, z, feet) { return __ZC(412, 18, this, arguments, new.target); }
function sptWall(dir, a, b, c, y, h, t, mat, opens) { return __ZC(412, 19, this, arguments, new.target); }
function sptSpot(x, z, r, name, verb, fn, o) { o = o || {}; var S = { x: x, z: z, r: r, y: o.y || 0, name: name, verb: verb, fn: fn, when: o.when || null, venue: o.venue || "" }; SPT.K.spots.push(S); return S; }
function sptArea(x0, z0, x1, z1, name, venue) { SPT.K.rooms.push({ x0: Math.min(x0, x1), z0: Math.min(z0, z1), x1: Math.max(x0, x1), z1: Math.max(z0, z1), name: name, venue: venue || "" }); }
function sptAreaAt(x, z) { var best = null; (SPT.K ? SPT.K.rooms : []).forEach(function (r) { if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1 && (!best || (r.x1 - r.x0) * (r.z1 - r.z0) < (best.x1 - best.x0) * (best.z1 - best.z0)))
best = r; }); return best; }
function sptEmblem(x, S, size, cx, cy) { return __ZC(412, 20, this, arguments, new.target); }
function sptLogo(S) { return __ZC(412, 21, this, arguments, new.target); }
function sptBadge(x, S, size, cx, cy) { sptEmblem(x, S, size, cx, cy); var im = sptLogo(S); if (im) {
try {
x.save();
x.beginPath();
x.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
x.clip();
x.drawImage(im, cx - size * 0.42, cy - size * 0.42, size * 0.84, size * 0.84);
x.restore();
}
catch (e) { }
} }
var SPT_YD = 0.9144, SPT_FL = 120 * 0.9144, SPT_FW = 160 / 3 * 0.9144;
function sptFieldMat(S) { return __ZC(412, 22, this, arguments, new.target); }
var SPT_CL = 84 * 0.3048, SPT_CW = 50 * 0.3048, SPT_HOOP = SPT_CL / 2 - (4 + 0.75) * 0.3048, SPT_ARC = (19 + 9 / 12) * 0.3048;
function sptCourtMat(S, big) { return __ZC(412, 23, this, arguments, new.target); }
function sptBoard(w, h, x, y, z, ry, venue, parent) { return __ZC(412, 24, this, arguments, new.target); }
function sptBoardPaint(B, st) { return __ZC(412, 25, this, arguments, new.target); }
var SPT_ARENA = { bowl: { x: 0, z: -300 }, hall: { x: 300, z: -300 }, plaza: { x: 150, z: -300 } };
function sptCampusAt(i) { return { x: -540 + (i % 4) * 360, z: 200 + Math.floor(i / 4) * 330 }; }
function sptBuildAll(G) { return __ZC(412, 26, this, arguments, new.target); }
function sptRows(T, mats) { return __ZC(412, 27, this, arguments, new.target); }
function sptPosts(cx, cz, col) { return __ZC(412, 28, this, arguments, new.target); }
function sptLightTower(x, z, h) {
var m = sptMat(0x8A9098, "metal");
sptCyl(0.35, h, m, x, h / 2, z, null, 8, 0.25);
sptSolid(x, z, 0.4, 0.4, h);
sptBox(4, 2.2, 0.5, m, x, h + 1, z);
sptBox(3.6, 1.8, 0.2, sptBasic(0xFFF6DC), x, h + 1, z + (z > 0 ? -0.36 : 0.36));
}
function sptVenue(id, o) { o.id = id; SPT.K.venues[id] = o; return o; }
function sptBowl() { return __ZC(412, 29, this, arguments, new.target); }
function sptHall() { return __ZC(412, 30, this, arguments, new.target); }
function sptHoops(cx, cz) { return __ZC(412, 31, this, arguments, new.target); }
function sptPlaza() { return __ZC(412, 32, this, arguments, new.target); }
function sptLeagueMat() {
var cv = sptCanvas(1024, 512, function () { }), t = new THREE.CanvasTexture(cv), m = new THREE.MeshBasicMaterial({ map: t });
SPT.leagueCv = { cv: cv, t: t, last: "" };
sptLeaguePaint();
return m;
}
function sptLeaguePaint() { return __ZC(412, 33, this, arguments, new.target); }
function sptFameMat() { return __ZC(412, 34, this, arguments, new.target); }
function sptChampions() { return __ZC(412, 35, this, arguments, new.target); }
function sptStadium(S, cx, cz) { return __ZC(412, 36, this, arguments, new.target); }
function sptGym(S, cx, cz) { return __ZC(412, 37, this, arguments, new.target); }
function sptCoach(S, x, z, sport) { return __ZC(412, 38, this, arguments, new.target); }
function sptKit(S, sport, i, ref) { return __ZC(412, 39, this, arguments, new.target); }
function sptMover(g, x, z, sp) { return { g: g, x: x, z: z, tx: x, tz: z, sp: sp || 6.5, ph: Math.random() * 6, v: 0, face: null }; }
function sptMove(a, dt, y) { return __ZC(412, 40, this, arguments, new.target); }
function sptBallMesh(sport) {
var m = sport === "fb" ? sptMat(0x7A3A1A, null, { phong: 30 }) : sptMat(0xE07020, null, { phong: 20 });
var b = new THREE.Mesh(new THREE.SphereGeometry(sport === "fb" ? 0.11 : 0.12, 12, 8), m);
if (sport === "fb")
b.scale.set(1.6, 1, 1);
b.raycast = function () { };
return b;
}
function sptCrowd(V, f, fill) { return __ZC(412, 41, this, arguments, new.target); }
function sptShowFor(V) { var W = SPT.watch[V.id]; return W || null; }
function sptShowStart(V, f) { return __ZC(412, 42, this, arguments, new.target); }
function sptShowStop(id) {
var W = SPT.watch[id];
if (!W)
return;
if (W.root && W.root.parent)
W.root.parent.remove(W.root);
W.root.traverse(function (o) { if (o.isInstancedMesh) {
o.geometry.dispose();
o.material.dispose();
} });
delete SPT.watch[id];
}
function sptDir(f, e) { var q = e.q || 1, s = f.sport === "fb" ? (q % 2 ? 1 : -1) : (q <= 2 ? 1 : -1); return e.off === "h" ? s : -s; }
function sptShowTick(W, dt, now) { return __ZC(412, 43, this, arguments, new.target); }
function sptShowState(W, e, secs) { return __ZC(412, 44, this, arguments, new.target); }
function sptTicker(h) { return __ZC(412, 45, this, arguments, new.target); }
function sptWarmup(W) {
var V = W.V, fb = W.f.sport === "fb", L = fb ? SPT_FL / 2 - 12 : SPT_CL / 2 - 4;
W.h.forEach(function (a, i) { a.tx = V.cx - L * 0.5 + (i % 4) * 3; a.tz = V.cz - 6 + Math.floor(i / 4) * 4; });
W.a.forEach(function (a, i) { a.tx = V.cx + L * 0.5 - (i % 4) * 3; a.tz = V.cz - 6 + Math.floor(i / 4) * 4; });
W.holder = W.h[0];
W.flight = null;
}
var SPT_FB_OFF = [[-5, 0], [-7, 0], [-1, -18], [-1, 18], [-1.5, -9], [-0.8, 4.2], [-0.8, -2.6], [-0.8, -1.3], [-0.8, 0], [-0.8, 1.3], [-0.8, 2.6]];
var SPT_FB_DEF = [[1, -4], [1, -1.4], [1, 1.4], [1, 4], [5, -5], [5, 0], [5, 5], [6, -17], [6, 17], [12, -8], [12, 8]];
function sptLosX(W, e, spot) { return W.V.cx + sptDir(W.f, e) * (spot - 50) * SPT_YD; }
function sptShowEvent(W, e, i) { return __ZC(412, 46, this, arguments, new.target); }
function sptShowPhase(W, e, u) { return __ZC(412, 47, this, arguments, new.target); }
function sptBallTick(W, dt, secs) { return __ZC(412, 48, this, arguments, new.target); }
var SPT_LEN = { real: 1, short: 0.5, quick: 0.25 };
function sptGameStart(sport, venueId, opp, len, mine) { return __ZC(412, 49, this, arguments, new.target); }
function sptMySkill() { var B = SPT.board && SPT.board.skills; var s = { shoot: 0, three: 0, ft: 0, pass: 0, run: 0, kick: 0, catch_: 0, tackle: 0 }; if (B)
for (var k in s)
s[k] = Math.max(0, Math.min(20, +B[k] || 0)); return s; }
function sptGameEnd(quiet) { return __ZC(412, 50, this, arguments, new.target); }
function sptGameRecord(G) {
var secs = Math.round((Date.now() - G.t0) / 1000);
if (!sptSigned())
return;
sptRpc("sports_game_done", { p_sport: G.sport, p_school: G.H.id, p_opp: G.A.id, p_us: G.sc[0], p_them: G.sc[1], p_secs: secs, p_len: G.len }).then(function (r) { if (r && r.say)
sptSay("📋 " + sptEsc(r.say), 6); sptLoad(true); }, function () { });
}
function sptGameOver(G) { return __ZC(412, 51, this, arguments, new.target); }
function sptHud() { return __ZC(412, 52, this, arguments, new.target); }
function sptHudPaint(G) { return __ZC(412, 53, this, arguments, new.target); }
function sptYdL(G, s) { s = Math.round(s); return s === 50 ? "midfield" : s < 50 ? "your own " + s : "their " + (100 - s); }
var SPT_KEYFN = null;
function sptGameKeys(on) { return __ZC(412, 54, this, arguments, new.target); }
function sptGameKey(k) { return __ZC(412, 55, this, arguments, new.target); }
function sptMeTick(G, dt) { return __ZC(412, 56, this, arguments, new.target); }
function sptPutMe(G, x, z, faceX) { camera.position.set(SPT.base + x, 1.72, z); if (typeof yaw !== "undefined")
yaw = faceX > 0 ? -Math.PI / 2 : Math.PI / 2; if (typeof pitch !== "undefined")
pitch = -0.05; G.lastP = { x: x, z: z }; if (G.me) {
G.me.x = x;
G.me.z = z;
} }
function sptFwd() { var y = typeof yaw !== "undefined" ? yaw : 0; return [-Math.sin(y), -Math.cos(y)]; }
function sptBallInHand(G) { var P = worldLocal(), f = sptFwd(); G.ball.position.set(P.x + f[0] * 0.55, P.y - 0.55, P.z + f[1] * 0.55); }
function sptNearest(list, x, z, not) { var b = null, bd = 1e9; list.forEach(function (a) { if (a === not)
return; var d = Math.hypot(a.x - x, a.z - z); if (d < bd) {
bd = d;
b = a;
} }); return { a: b, d: bd }; }
function sptMeter(G, on, label) { return __ZC(412, 57, this, arguments, new.target); }
function sptMeterAt(G, dt) { G.mt = (G.mt || 0) + dt; var k = (Math.sin(G.mt * 2.6) + 1) / 2, el = document.getElementById("spt-mk"); if (el)
el.style.left = "calc(" + (k * 100) + "% - 3px)"; return k; }
function sptMeterScore(G) { var k = (Math.sin((G.mt || 0) * 2.6) + 1) / 2; return 1 - Math.min(1, Math.abs(k - 0.5) * 2); }
var SPT_BB_SPOTS = [[-7.2, 0], [-5.6, -4.4], [-5.6, 4.4], [-1.2, -6.6], [-1.6, 2.4]];
function sptBbSetup(G) { return __ZC(412, 58, this, arguments, new.target); }
function sptBbHoop(G, side) { var dir = (side === "h" ? 1 : -1) * (G.q <= 2 || G.q > 4 && G.q % 2 ? 1 : -1); return { x: G.V.cx + dir * SPT_HOOP, z: G.V.cz, dir: dir }; }
function sptBbGive(G, a, why) { G.holder = a; G.flight = null; var side = G.h.indexOf(a) >= 0 ? "h" : "a"; if (side !== G.poss) {
G.poss = side;
G.shot = 35;
G.back = sptBbInBack(G, a) ? 10 : 0;
} G.dec = 0.6; if (why)
G.note = why; }
function sptBbInBack(G, a) { var H = sptBbHoop(G, G.h.indexOf(a) >= 0 ? "h" : "a"); return (a.x - G.V.cx) * H.dir < 0; }
function sptBbTeam(G, a) { return G.h.indexOf(a) >= 0 ? "h" : "a"; }
function sptBbDead(G, secs, then, why) { G.state = "dead"; G.timer = secs; G.then = then; if (why) {
G.note = why;
sptSay("🏀 " + why, 4);
} }
function sptBbTick(G, dt) { return __ZC(412, 59, this, arguments, new.target); }
function sptBbBall(G, dt) { return __ZC(412, 60, this, arguments, new.target); }
function sptBbLand(G, F) { return __ZC(412, 61, this, arguments, new.target); }
function sptBbShoot(G, a) { return __ZC(412, 62, this, arguments, new.target); }
function sptBbPass(G, from, to) { return __ZC(412, 63, this, arguments, new.target); }
function sptBbTurn(G, why) {
var other = G.poss === "h" ? G.a : G.h;
G.flight = null;
G.holder = null;
sptBbDead(G, 2.5, function () { var V = G.V, a = other[0]; if (a.human)
sptPutMe(G, G.me.x, V.cz + (G.me.z > V.cz ? 1 : -1) * (SPT_CW / 2 - 0.4), G.me.x > V.cx ? -1 : 1); sptBbGive(G, a); }, why);
}
function sptBbPeriodEnd(G) { return __ZC(412, 64, this, arguments, new.target); }
function sptBbFts(G, shooter, n, team) { return __ZC(412, 65, this, arguments, new.target); }
function sptBbFtTick(G, dt) {
var F = G.ft;
if (!F)
return;
if (G.ftMe)
sptMeterAt(G, dt);
if (G.flight)
return;
F.wait -= dt;
if (F.wait > 0)
return;
if (!G.ftMe) {
sptBbFtShot(G, Math.random() < 0.68 + ((F.team === "h" ? G.H : G.A).rating - 70) * 0.004);
}
}
function sptBbFtShot(G, made) { return __ZC(412, 66, this, arguments, new.target); }
function sptBbAI(G, dt) { return __ZC(412, 67, this, arguments, new.target); }
function sptBbKey(G, k) { return __ZC(412, 68, this, arguments, new.target); }
var SPT_PLAYS = [["run", "Run inside", "the ball carrier up the middle"], ["sweep", "Run outside", "the ball carrier round the end"], ["quick", "Quick pass", "short routes, the ball out fast"],
["deep", "Deep pass", "long routes down the field"], ["punt", "Punt", "kick it away (4th down)"], ["fg", "Field goal", "the kick for three"], ["kneel", "Take a knee", "run the clock"]];
var SPT_DEFS = [["base", "Base defence"], ["blitz", "Blitz (rush the passer)"], ["prevent", "Prevent (stop the long pass)"]];
function sptFbSetup(G) { return __ZC(412, 69, this, arguments, new.target); }
function sptFbDir(G, side) { var s = G.q > 4 ? 1 : (G.q % 2 ? 1 : -1); return side === "h" ? s : -s; }
function sptFbX(G, side, spot) { return G.V.cx + sptFbDir(G, side) * (spot - 50) * SPT_YD; }
function sptFbSpot(G, side, x) { return 50 + sptFbDir(G, side) * (x - G.V.cx) / SPT_YD; }
function sptFbTeam(G, side) { return side === "h" ? G.h : G.a; }
function sptFbSetMe(G, a) { if (G.me && G.me.g)
G.me.g.visible = true; G.me = a; a.g.visible = false; sptPutMe(G, a.x, a.z, sptFbDir(G, sptFbSide(G, a))); }
function sptFbSide(G, a) { return G.h.indexOf(a) >= 0 ? "h" : "a"; }
function sptFbDead(G, secs, then, why) { G.state = "dead"; G.timer = secs; G.then = then; if (why) {
G.note = "";
sptSay("🏈 " + why, 5);
} }
function sptFbKickoff(G, kicker, from) { return __ZC(412, 70, this, arguments, new.target); }
function sptFbHuddle(G, admin) { return __ZC(412, 71, this, arguments, new.target); }
function sptFbChains(G) {
if (!G.lines) {
G.lines = [sptFlat(0.35, SPT_FW, sptBasic(0x3A6AE8, 0.85), 0, 0.04, G.V.cz, G.root), sptFlat(0.35, SPT_FW, sptBasic(0xF0D020, 0.85), 0, 0.045, G.V.cz, G.root)];
}
G.lines[0].position.x = G.losX;
G.lines[1].position.x = G.gainX;
G.lines[1].visible = G.togo < 100 - G.spot && G.q <= 4;
}
function sptFbCallPanel(G, on) { return __ZC(412, 72, this, arguments, new.target); }
function sptFbChoose(G, i) { return __ZC(412, 73, this, arguments, new.target); }
function sptFbSnap(G) { return __ZC(412, 74, this, arguments, new.target); }
function sptFbAiCall(G) { return __ZC(412, 75, this, arguments, new.target); }
function sptFbTick(G, dt) { return __ZC(412, 76, this, arguments, new.target); }
function sptFbBall(G, dt) { return __ZC(412, 77, this, arguments, new.target); }
function sptFbPlayTick(G, dt) { return __ZC(412, 78, this, arguments, new.target); }
function sptFbChase(G, O, D, dt) { return __ZC(412, 79, this, arguments, new.target); }
function sptFbAiThrow(G, O, D, d) {
var best = null, bs = -1;
[2, 3, 4, 5, 1].forEach(function (j) { var r = O[j]; var n = sptNearest(D, r.x, r.z).d, ahead = (r.x - G.play.los) * d; var s = n + (ahead > 0 ? ahead * 0.05 : -2) + Math.random() * 1.5; if (s > bs) {
bs = s;
best = r;
} });
if (!best)
return;
sptFbThrow(G, O[0], best);
}
function sptFbThrow(G, qb, r) { return __ZC(412, 80, this, arguments, new.target); }
function sptFbLand(G, F) { return __ZC(412, 81, this, arguments, new.target); }
function sptFbEnd(G, a, how, by) { return __ZC(412, 82, this, arguments, new.target); }
function sptFbNext(G, why) { return __ZC(412, 83, this, arguments, new.target); }
function sptFbTry(G, side) { return __ZC(412, 84, this, arguments, new.target); }
function sptFbAfterScore(G, side) { G.two = false; if (G.q > 4)
return sptFbOtNext(G); if (G.clk <= 0 && G.q <= 4) {
G.clk = 0;
return sptFbPeriodEnd(G);
} sptFbKickoff(G, side, 40); }
function sptFbPeriodEnd(G) { return __ZC(412, 85, this, arguments, new.target); }
function sptFbOtNext(G, first) { return __ZC(412, 86, this, arguments, new.target); }
function sptFbKey(G, k) { return __ZC(412, 87, this, arguments, new.target); }
var SPT_ARRIVE = { plaza: [150, -230, 0], bowl: [0, -300 + SPT_FW / 2 + 30, 0, "seat"], field: [-30, -300, -Math.PI / 2], hall: [300 - 40, -300, -Math.PI / 2], hallseat: [300, -300 + SPT_CW / 2 + 10, 0] };
function sptArrive(at) { return __ZC(412, 88, this, arguments, new.target); }
function sptBuild(G) { return __ZC(412, 89, this, arguments, new.target); }
function sptForget() { return __ZC(412, 90, this, arguments, new.target); }
var SPT_ENV = { top: 0x3070C8, low: 0xB0C8E0, fog: 0xC0D0E0, fogD: 0.0008, sun: 1.05, sunCol: 0xFFF0D8, sunDir: [-0.4, 0.8, -0.4], hemi: 0.6, hemiCol: 0xD0E0F0, hemiGround: 0x5A6A40 };
function sptMayGo() { if (sptKeeper())
return ""; return sptCfg().open ? "" : "The sports grounds are closed for now by the Keeper."; }
function sptGo(at) {
at = at || "plaza";
var why = sptMayGo();
if (why) {
sptSay("🏟️ <b>" + sptEsc(why) + "</b>");
return false;
}
SPT.wantAt = at;
sptLoad();
if (WLD.on === SPT.key) {
worldCard(null);
sptArrive(at);
return true;
}
return worldGo(SPT.key, { fromName: "the city" });
}
function sptLeave() { if (SPT.game)
sptGameEnd(true); worldCard(null); worldHome("🏟️ <b>Back from the sports grounds.</b>"); }
if (typeof worldDef === "function")
worldDef(SPT.key, {
base: SPT.base, far: 2600, ownSky: true, tone: 240,
env: function () { return SPT_ENV; },
build: function (G) { sptBuild(G); },
enter: function () { return __ZC(412, 91, this, arguments, new.target); },
leave: function () { worldCard(null); if (SPT.game)
sptGameEnd(true); Object.keys(SPT.watch).forEach(sptShowStop); var t = document.getElementById("spt-tick"); if (t)
t.style.display = "none"; sptFbCallPanel(null, false); },
ground: function (x, z, feet) { return sptGround(x, z, feet); },
block: function (x, z, feet) { return sptBlocked(x, z, feet); },
tick: function (dt) { sptTick(dt); },
back: function () { sptLeave(); }
});
if (typeof WLG !== "undefined" && WLG.keys.indexOf(SPT.key) < 0)
WLG.keys.push(SPT.key);
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === SPT.key)
sptForget(); return r; }; })();
if (typeof DGR_W !== "undefined" && !DGR_W[SPT.key]) {
if (typeof DGR_WORLDS !== "undefined")
DGR_WORLDS.push([SPT.key, "The Universal Sports Arena", 0, "city"]);
DGR_W[SPT.key] = { id: SPT.key, name: "The Universal Sports Arena", def: 0, group: "city" };
}
function sptTick(dt) { return __ZC(412, 92, this, arguments, new.target); }
function C0() { return sptCfg(); }
function sptHasTicket(fid) { var T = (SPT.board && SPT.board.tickets) || []; return T.filter(function (t) { return t.fixture === fid; })[0] || null; }
function sptGateShut(venue) {
var C = sptCfg();
if (!C.tickets || sptKeeper())
return false;
var f = sptAtVenue(venue);
if (!f || !f.big)
return false;
return !sptHasTicket(f.id);
}
function sptBigGames() { return sptNext(function (f) { return f.big; }, 8); }
function sptBoxOffice() { return __ZC(412, 93, this, arguments, new.target); }
function sptBuy(g, sec) { return __ZC(412, 94, this, arguments, new.target); }
function sptLeagueCard(sport) { return __ZC(412, 95, this, arguments, new.target); }
function sptFameCard() { var rows = sptChampions(); worldCard(worldFacts("🏆 The Hall of Fame", sptCfg().league + ": the champions", [], rows.length ? rows : ["The first champions are still to be crowned: the football championship is the Somnucor Bowl in November, basketball's is in the winter."]), {}); }
function sptVenueCard(vid) { return __ZC(412, 96, this, arguments, new.target); }
function sptPlayCard(vid) { return __ZC(412, 97, this, arguments, new.target); }
function sptJoinCard(vid) { return __ZC(412, 98, this, arguments, new.target); }
var SPT_DRILLS = { bb: [["ft", "Free throws", "ten from the line, by the timing bar", "ft"], ["three", "Three-point shooting", "five spots round the arc", "three"], ["sprint", "Court sprints", "baseline to baseline and back, four times", "run"]],
fb: [["fg", "Field goals", "five kicks, from 20 to 45 yards", "kick"], ["dash", "The 40-yard dash", "run it as fast as you can", "run"], ["catch", "Catching", "ten passes from the coach's machine", "catch_"]] };
function sptDrillCard(vid) { return __ZC(412, 99, this, arguments, new.target); }
function sptDrillStart(vid, d) { return __ZC(412, 100, this, arguments, new.target); }
function sptDrillSpot(G) { var s = G.spots[G.n]; var x = G.V.cx + SPT_HOOP + s[0], z = G.V.cz + s[1]; sptPutMe(G, x, z, 1); if (typeof yaw !== "undefined")
yaw = Math.atan2(-(G.V.cx + SPT_HOOP - x), -(G.V.cz - z)); G.frozen = [x, z]; sptMeter(G, true, "Three " + (G.n + 1) + " of 5: press E in the green"); }
function sptDrillKickSpot(G) { var dist = G.dists[G.n], x = G.V.cx + SPT_FL / 2 - 10 * SPT_YD - (dist - 17) * SPT_YD; sptPutMe(G, x, G.V.cz, 1); G.frozen = [x, G.V.cz]; sptMeter(G, true, "A " + dist + "-yard field goal: press E in the green"); }
function sptDrillTick(G, dt) { return __ZC(412, 101, this, arguments, new.target); }
function sptDrillKey(G, k) { return __ZC(412, 102, this, arguments, new.target); }
function sptDrillDone(G, score, line) { return __ZC(412, 103, this, arguments, new.target); }
(function () { var gk = sptGameKey; sptGameKey = function (k) { var G = SPT.game; if (G && G.drill) {
if (k === "quit") {
sptGameEnd(true);
sptSay("Practice stopped.", 3);
return;
}
sptDrillKey(G, k);
return;
} return gk.apply(this, arguments); }; })();
function sptDirectory() { return __ZC(412, 104, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-sports"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-sports";
b.title = "School sports and the Universal Sports Arena";
b.textContent = "🏟️ Sports";
b.onclick = function () { sptDirectory(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 2000);
if (typeof PS_EXTRAS !== "undefined" && !PS_EXTRAS.some(function (e) { return e.id === "spt-ps"; }))
PS_EXTRAS.push({ id: "spt-ps", label: "🏟️ The Universal Sports Arena", show: function () { return true; }, run: function () { setTimeout(sptDirectory, 10); } });
if (typeof PS_SECTIONS !== "undefined") {
var pl = PS_SECTIONS.filter(function (s) { return s.k === "places"; })[0];
if (pl && pl.ids.indexOf("spt-ps") < 0)
pl.ids.push("spt-ps");
}
})();
(function () {
if (typeof eduPaint !== "function")
return;
var ep = eduPaint;
eduPaint = function () {
var r = ep.apply(this, arguments);
try {
var el = document.getElementById("sch-panel");
if (!el || el.style.display !== "block" || el.querySelector("[data-spt]"))
return r;
var w = typeof eduWhere === "function" ? eduWhere() : null;
if (!w || !(w.id === "gym" || w.id === "reception" || w.id === "atrium" || w.id === "coach"))
return r;
var lab = (typeof INT !== "undefined" && INT && INT.spec) ? String(INT.spec.workplace || INT.spec.label || "") : "", id = /commons/i.test(lab) ? "commons" : "city", S = sptSchool(id);
el.insertAdjacentHTML("beforeend", '<div class="row" style="margin-top:6px;gap:6px;flex-wrap:wrap"><button class="btn" data-spt-go="' + id + '-gym">🏀 The ' + sptEsc(S.team) + ' gym</button><button class="btn" data-spt-go="' + id + '">🏈 The stadium</button><button class="btn" data-spt-go="plaza">🏟️ The Arena</button></div>');
}
catch (e) { }
return r;
};
addEventListener("click", function (e) { var b = e.target && e.target.closest ? e.target.closest("[data-spt-go]") : null; if (!b)
return; e.preventDefault(); var at = b.getAttribute("data-spt-go"); try {
localStorage.setItem("spt_campus", at.replace(/-gym$/, ""));
}
catch (x) { } sptGo(at); });
})();
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
var B = SPT.board || {}, me = B.me || {};
(B.tickets || []).forEach(function (t) { if (new Date(t.kick).getTime() + 4 * 3600000 < Date.now())
return; h += '<div style="margin:3px 0">🎟️ ' + sptEsc(t.title || "A big game") + ": " + sptEsc(t.seat) + '</div>'; });
["fb", "bb"].forEach(function (sp) { if (me[sp])
h += '<div style="margin:3px 0">' + SPT_SPORTS[sp].icon + ' ' + sptEsc(sptSchool(me[sp].school).team) + ", " + sptEsc(me[sp].pos) + (me[sp].number ? " #" + me[sp].number : "") + '</div>'; });
}
catch (e) { }
return h;
};
})();
(function () {
if (typeof ktPane !== "function")
return;
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-spt]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-spt", "1");
b.textContent = "🏟️ The Universal Sports Arena";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } sptGo("plaza"); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
})();
setTimeout(function () {
try {
var m = /[?&]ksports=([a-z0-9-]+)/.exec(location.search);
if (!m)
return;
var where = m[1];
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!sptKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
sptGo(where);
try {
var q = new URLSearchParams(location.search);
q.delete("ksports");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
setInterval(function () {
try {
if (!sptSigned() || typeof document !== "undefined" && document.hidden)
return;
var now = Date.now();
["fb", "bb"].forEach(function (sp) {
sptSeason(sp).forEach(function (f) {
if (!f.ready || SPT.results[f.id] || SPT.posted[f.id])
return;
var S = sptSim(f);
if (!S)
return;
var end = f.kick + S.end * 1000;
if (now < end + 60000 || now > end + 14 * 86400000)
return;
SPT.posted[f.id] = 1;
sptRpc("sports_result_post", { p_fixture: f.id, p_sport: f.sport, p_season: f.season, p_home: f.home, p_away: f.away, p_hs: S.sc[0], p_as: S.sc[1], p_kick: new Date(f.kick).toISOString() }).then(function () { SPT.results[f.id] = S.sc; }, function () { });
});
});
}
catch (e) { }
}, 90000);
function sptDress(G) { return __ZC(412, 105, this, arguments, new.target); }
function sptRowsPeople(L, H, cols) { return __ZC(412, 106, this, arguments, new.target); }
(function () {
var b = sptBuildAll;
sptBuildAll = function (G) { var r = b.apply(this, arguments); try {
sptDress(G);
}
catch (e) {
if (window.console)
console.warn("[sports] dress", e);
} return r; };
})();
var SPT_FIG = null;
function sptFigMerge(list) { return __ZC(412, 107, this, arguments, new.target); }
function sptFigLimb(r0, r1, h, x, y, z, rx, rz) { var g = new THREE.CylinderGeometry(r0, r1, h, 6, 1, true); if (rx)
g.rotateX(rx); if (rz)
g.rotateZ(rz); g.translate(x, y, z); return g; }
function sptFigBall(r, x, y, z, sx, sy, sz, seg) { var g = new THREE.SphereGeometry(r, seg || 6, seg ? Math.max(4, seg - 2) : 5); g.scale(sx || 1, sy || 1, sz || 1); g.translate(x, y, z); return g; }
function sptFigTorso(y0, h, lean) {
var pts = [], w = [0.15, 0.18, 0.2, 0.21, 0.19, 0.12, 0.05];
for (var i = 0; i < w.length; i++)
pts.push(new THREE.Vector2(w[i], h * i / (w.length - 1)));
var g = new THREE.LatheGeometry(pts, 8);
g.scale(1, 1, 0.64);
if (lean)
g.rotateX(lean);
g.translate(0, y0, 0);
return g;
}
function sptFigGeo() { return __ZC(412, 108, this, arguments, new.target); }
var SPT_FIG_LEGS = [0x2A2E3A, 0x3A3A40, 0x22324A, 0x4A4038, 0x1E1E22, 0x5A5A60, 0x3A4A5A];
var SPT_FIG_SKIN = [0x6A4028, 0x8A5A3A, 0xB07A52, 0xD0A07A, 0xE8C0A0, 0x4A2E1E, 0xC89068, 0xF2D2B6];
var SPT_FIG_HAIR = [0x1A1410, 0x2E2016, 0x4A3020, 0x6A4A2A, 0xA07A40, 0xC8A870, 0x8A8A88, 0xD8D8D0, 0x5A2A18];
(function () {
if (typeof sptCrowd !== "function")
return;
sptCrowd = function (V, f, fill) {
var K = SPT.K, tiers = K.tiers.filter(function (T) { return T.cx === V.cx && T.cz === V.cz; }), spots = [];
var H = f ? sptSchool(f.home) : null, A = f ? sptSchool(f.away) : null, R = sptRng(sptHash((f ? f.id : V.id) + "crowd")), max = SPT.lite ? 500 : 1800;
tiers.forEach(function (T) {
var sides = (T.side === "z" ? ["s", "n"] : ["s", "n", "e", "w"]).filter(function (sd) { return !T.only || sd === T.only; });
for (var r = 0; r < T.rows; r++)
sides.forEach(function (sd) {
var long = sd === "s" || sd === "n", half = long ? (T.len ? T.len / 2 : T.ix + r * T.dep) : (T.iz + r * T.dep), off = (long ? T.iz : T.ix) + r * T.dep + T.dep * 0.5, sg = sd === "s" || sd === "e" ? 1 : -1;
for (var p = -half + 0.5; p < half; p += 0.62) {
if (R() > fill)
continue;
var x = long ? T.cx + p : T.cx + sg * off, z = long ? T.cz + sg * off : T.cz + p;
if (sptTierE(T, x, z) < 0)
continue;
spots.push([x, T.y0 + (r + 1) * T.rise, z, sd, T.dep]);
}
});
});
for (var i = spots.length - 1; i > 0; i--) {
var j = Math.floor(R() * (i + 1)), t = spots[i];
spots[i] = spots[j];
spots[j] = t;
}
spots = spots.slice(0, max);
if (!spots.length)
return null;
var F = sptFigGeo(), g = new THREE.Group();
g.name = "spt-crowd";
var parts = ["shirt", "legs", "skin", "hair"].map(function (k) { var m = new THREE.InstancedMesh(F[k].clone(), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), spots.length); m.name = "spt-crowd-" + k; m.frustumCulled = false; g.add(m); return m; });
var M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color(), nh = 0;
spots.forEach(function (sp, i) {
var face = sp[3] === "s" ? Math.PI : sp[3] === "n" ? 0 : sp[3] === "e" ? -Math.PI / 2 : Math.PI / 2, k = 0.9 + R() * 0.18;
var fx = Math.sin(face), fz = Math.cos(face), back = Math.min(0.18, (sp[4] || 0.85) * 0.2);
p.set(sp[0] - fx * back, sp[1] - 0.46 * k, sp[2] - fz * back);
e.set(0, face + (R() - 0.5) * 0.5, 0);
q.setFromEuler(e);
s.set(k, k, k);
M.compose(p, q, s);
parts.forEach(function (m) { m.setMatrixAt(i, M); });
var homeSide = V.kind === "gym" && V.school ? sp[3] === "s" : sp[2] > V.cz, S = f ? (homeSide ? H : A) : null;
col.set(S ? (R() < 0.6 ? S.c1 : S.c2) : ["#3A5A8A", "#8A3A3A", "#E8E0D0", "#4A6A3A", "#2A2A2A", "#C8A040", "#5A3A6A"][Math.floor(R() * 7)]);
parts[0].setColorAt(i, col);
col.setHex(SPT_FIG_LEGS[Math.floor(R() * SPT_FIG_LEGS.length)]);
parts[1].setColorAt(i, col);
col.setHex(SPT_FIG_SKIN[Math.floor(R() * SPT_FIG_SKIN.length)]);
parts[2].setColorAt(i, col);
col.setHex(SPT_FIG_HAIR[Math.floor(R() * SPT_FIG_HAIR.length)]);
parts[3].setColorAt(i, col);
});
parts.forEach(function (m) { m.instanceMatrix.needsUpdate = true; if (m.instanceColor)
m.instanceColor.needsUpdate = true; });
g.traverse(function (o) { o.raycast = function () { }; });
return g;
};
})();
function sptGymMerge(P, bag) {
Object.keys(bag).forEach(function (c) { var g = sptFigMerge(bag[c]); var m = new THREE.Mesh(g, sptMat(+c)); m.name = "spt-gym-dress"; P.add(m); });
}
function sptGymDress(S, cx, cz) { return __ZC(412, 109, this, arguments, new.target); }
(function () {
if (typeof sptGym !== "function")
return;
var f = sptGym;
sptGym = function (S, cx, cz) { var r = f.apply(this, arguments); try {
sptGymDress(S, cx, cz);
}
catch (e) {
if (window.console)
console.warn("[sports] gym dress", e);
} return r; };
})();
(window.GLF_KEEP = window.GLF_KEEP || {}).sports = function (x, z) { return __ZC(412, 110, this, arguments, new.target); };
