/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var SPK = { cur: null, key: null, t: 0, ct: 0, near: null, said: {}, maze: null, warned: false, builds: 0, drops: 0 };
var SPK_RM = 810, SPK_R0 = 786, SPK_R1 = 868;
var SPK_PARKS = {
Winter: { k: "winter", title: "The Winter Garden", sub: "Midwinter, and it stays midwinter here", ground: "snow", path: "#B8C4D0", edge: "#E8EEF4",
hedge: 0x2E4A3A, hedgeTop: 0xF2F6FA, rail: 0x1E2228, lamp: 0xFFE6B0, tree: "pine", leaves: [0x2E5A40, 0x3A6A4A, 0x24503A, 0xDDE8EC],
landmark: "The Great Yule Tree", west: "The Frozen Lake", east: "The Winter Market",
stalls: [["The Hot Chocolate Hut", "thick and sweet, with cream on top", "🍫", "You wrap both hands round a cup of hot chocolate. It is far too hot, and perfect."],
["Roasted Chestnuts", "hot from the brazier", "🌰", "A paper cone of chestnuts, split and steaming. You burn your fingers on the first one, as everybody does."],
["The Gingerbread Stall", "houses, stars and little men", "🍪", "A gingerbread star, iced in white, with your initial on it."],
["Candles and Lanterns", "light for the longest night", "🕯️", "A beeswax candle for the window, to light somebody home."],
["Woollens", "scarves, mittens, hats with bobbles", "🧣", "A striped scarf, long enough to go round three times."],
["Toys and Ornaments", "glass baubles and wooden toys", "🎄", "A glass bauble with a snowy village painted inside it."]],
find: ["frost star", "frost stars", "❄️", 0xBFE6FF],
lines: ["Snow on every path, and it never melts.", "The Great Yule Tree is lit all night, every night.", "Skate the Frozen Lake: the ice will hold."] },
Spring: { k: "spring", title: "The Spring Garden", sub: "The eggs are painted and the fire is lit", ground: "blossom", path: "#A89A7C", edge: "#F2E6D4",
hedge: 0x3A6A34, hedgeTop: 0x4E8A40, rail: 0x2A3A2A, lamp: 0xFFF0C8, tree: "blossom", leaves: [0xF4B8CC, 0xF8E8EE, 0xEEA0BC, 0xB8E0A0],
landmark: "The Great Maypole", west: "The Duck Pond", east: "The Tulip Gardens",
stalls: [["The Flower Cart", "daffodils, tulips, lilac", "💐", "A bunch of daffodils, wrapped in paper, still wet from the bucket."],
["Lemonade and Hot Cross Buns", "fresh this morning", "🍋", "A glass of cloudy lemonade and a hot cross bun, split and buttered."]],
find: ["painted egg", "painted eggs", "🥚", 0xF8D040],
lines: ["The blossom is always out here.", "Dance round the Great Maypole: twelve ribbons, twelve colours.", "Sit by the Duck Pond and watch the ducks."] },
Summer: { k: "summer", title: "The Summer Garden", sub: "The longest day, held", ground: "lawn", path: "#B4A47E", edge: "#F4ECD4",
hedge: 0x2E5A28, hedgeTop: 0x3E7A34, rail: 0x24382A, lamp: 0xFFF4D8, tree: "oak", leaves: [0x3A7A2A, 0x2E6A24, 0x4A8A30, 0x5A9A3A],
landmark: "The Bandstand", west: "The Fountain Lake", east: "The Sunflower Field",
stalls: [["The Ice Cream Cart", "vanilla, strawberry, chocolate", "🍦", "A cone with two scoops, already melting down your wrist."],
["The Lemonade Stand", "ice cold", "🥤", "Lemonade so cold it hurts your teeth, with a slice of lemon floating in it."]],
find: ["lost kite", "lost kites", "🪁", 0xFF5A5A],
lines: ["Long grass, long light, and the band plays in the evening.", "Take a swan boat round the Fountain Lake.", "Get lost in the sunflowers: they are taller than you."] },
Autumn: { k: "autumn", title: "The Autumn Garden", sub: "The harvest in, and the dead remembered", ground: "leaves", path: "#8A765C", edge: "#D8C0A0",
hedge: 0x5A4A20, hedgeTop: 0x8A6A28, rail: 0x1E1A16, lamp: 0xFFC880, tree: "maple", leaves: [0xC8401A, 0xE07A20, 0xE8B030, 0x9A3A1A, 0xD86A28],
landmark: "The Harvest Feast", west: "The Hay Maze", east: "The Pumpkin Patch",
stalls: [["Cider and Apples", "pressed here, this morning", "🍎", "A cup of warm spiced cider and a crisp red apple for the way home."],
["The Pie Stall", "pumpkin, apple, blackberry", "🥧", "A slice of pumpkin pie, still warm, with a dollop of cream."]],
find: ["golden leaf", "golden leaves", "🍂", 0xF0C030],
lines: ["The leaves fall all year here, and never run out.", "Find the middle of the Hay Maze and ring the bell.", "Pick a pumpkin from the patch (they grow back by morning)."] }
};
var SPK_ORDER = ["Winter", "Spring", "Summer", "Autumn"];
function spkLite() { return typeof LITE !== "undefined" && !!LITE; }
function spkPhone() { return typeof LOOK_PHONE !== "undefined" ? !!LOOK_PHONE : /Android|iPhone|iPad|Mobile|Quest|OculusBrowser/i.test(navigator.userAgent || ""); }
function spkSmall() { return spkLite() || spkPhone(); }
function spkY(x, z) { return typeof terrainY === "function" ? terrainY(x, z) : 0; }
function spkHash(a, b) { var h = ((a * 73856093) ^ (b * 19349663) ^ 0x2c1b3c6d) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h ^ (h >>> 16)) >>> 0; }
function spkSites() {
if (SPK.sites && SPK.sites.c === ATLC)
return SPK.sites.L;
var L = [];
if (typeof atlGaps === "function" && typeof SEASON_GARDENS !== "undefined" && typeof ATLC !== "undefined" && ATLC) {
var wide = atlGaps(SPK_RM, 18, 6), narrow = atlGaps(SPK_RM, 40, 6);
SEASON_GARDENS.forEach(function (g, i) {
var gw = wide[i * 4 + 2], gn = narrow[i * 4 + 2], D = SPK_PARKS[g.name];
if (!gw || !gn || !D)
return;
L.push({ name: g.name, D: D, i: i, mid: gn.mid, U: Math.min(128, Math.floor((gw.a1 - gw.a0) / 2 * SPK_RM) - 2), g: g });
});
}
SPK.sites = { c: ATLC, L: L };
return L;
}
function spkW(S, u, v) { var a = S.mid + u / SPK_RM; return { x: ATLC.x + Math.cos(a) * v, z: ATLC.z + Math.sin(a) * v, a: a }; }
function spkUV(S, x, z) { var dx = x - ATLC.x, dz = z - ATLC.z; return { u: atlWrap(Math.atan2(dz, dx) - S.mid) * SPK_RM, v: Math.sqrt(dx * dx + dz * dz) }; }
function spkFace(dx, dz) { return Math.atan2(dx, dz); }
function spkOutRot(a) { return spkFace(Math.cos(a), Math.sin(a)); }
function spkAlongRot(a) { return spkFace(-Math.sin(a), Math.cos(a)); }
var SPK_TEX = {};
function spkTex(key, w, h, fn, rep) { return __ZC(412, 0, this, arguments, new.target); }
function spkSpeck(x, W, H, n, cols, rmin, rmax, seed, ell) { return __ZC(412, 1, this, arguments, new.target); }
function spkGroundTex(k) { return __ZC(412, 2, this, arguments, new.target); }
function spkPathTex(col) {
return spkTex("p" + col, 128, 128, function (x, W, H) { x.fillStyle = col; x.fillRect(0, 0, W, H); spkSpeck(x, W, H, 700, ["rgba(255,255,255,.09)", "rgba(40,30,20,.22)", "rgba(0,0,0,.12)"], 0.6, 1.8, 91); });
}
function spkSignTex(title, sub, col, bg) { return __ZC(412, 3, this, arguments, new.target); }
function spkStripeTex(a, b) { return spkTex("st" + a + b, 128, 64, function (x, W, H) { for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? b : a;
x.fillRect(i * W / 8, 0, W / 8, H);
} x.fillStyle = "rgba(0,0,0,.15)"; x.fillRect(0, H * 0.8, W, H * 0.2); }); }
function spkHayTex() { return __ZC(412, 4, this, arguments, new.target); }
function spkCheckTex() { return spkTex("check", 64, 64, function (x, W, H) { x.fillStyle = "#F4F0E8"; x.fillRect(0, 0, W, H); x.fillStyle = "rgba(200,40,40,.75)"; for (var i = 0; i < 4; i++) {
x.fillRect(i * 16, 0, 8, H);
x.fillRect(0, i * 16, W, 8);
} }); }
var SPK_GEO = {};
function spkMerge(parts) { return __ZC(412, 5, this, arguments, new.target); }
function spkBox(w, h, d, x, y, z) { var g = new THREE.BoxGeometry(w, h, d); g.translate(x || 0, y || 0, z || 0); return g; }
function spkGeo(k) { return __ZC(412, 6, this, arguments, new.target); }
var SPK_MAT = {};
function spkMat(k, col, opt) { return __ZC(412, 7, this, arguments, new.target); }
var SPK_O = new THREE.Object3D(), SPK_C = new THREE.Color();
function spkInst(G, geo, mat, list, cols) { return __ZC(412, 8, this, arguments, new.target); }
function spkBoxes(G, mat, list, cols) { return __ZC(412, 9, this, arguments, new.target); }
function spkModels(G, file, want, list, alive, then) { return __ZC(412, 10, this, arguments, new.target); }
function spkMine(m) { m.userData.spkMine = true; m.raycast = function () { }; return m; }
function spkDrop(G) { return __ZC(412, 11, this, arguments, new.target); }
var SPK_LOOP = { vIn: 797, vOut: 857, rc: 12 }, SPK_MID = { u: 0, v: 827, ru: 16, rv: 15 }, SPK_WING = 66;
var SPK_SLOTS = { A: [-25, 809], B: [25, 809], C: [-25, 845], D: [25, 845], E: [0, 804], F: [-17, 846], G: [17, 846] };
function spkLoopPts(S) { return __ZC(412, 12, this, arguments, new.target); }
function spkEllPts(cu, cv, ru, rv, n) { var p = []; for (var i = 0; i <= n; i++) {
var t = i / n * Math.PI * 2;
p.push([cu + Math.cos(t) * ru, cv + Math.sin(t) * rv]);
} return p; }
function spkPaths(S) { return __ZC(412, 13, this, arguments, new.target); }
function spkWing(k, sd) { return __ZC(412, 14, this, arguments, new.target); }
function spkSegDist(u, v, a, b) { var du = b[0] - a[0], dv = b[1] - a[1], L = du * du + dv * dv, t = L ? Math.max(0, Math.min(1, ((u - a[0]) * du + (v - a[1]) * dv) / L)) : 0; return Math.hypot(u - a[0] - t * du, v - a[1] - t * dv); }
function spkPathDist(paths, u, v) { var best = 1e9; paths.forEach(function (p) { for (var i = 0; i + 1 < p.pts.length; i++) {
var d = spkSegDist(u, v, p.pts[i], p.pts[i + 1]) - p.w / 2;
if (d < best)
best = d;
} }); return best; }
function spkRibbon(S, A, pts, w, yo) { return __ZC(412, 15, this, arguments, new.target); }
function spkSurfMesh(A, mat) { return __ZC(412, 16, this, arguments, new.target); }
function spkSurfMat(tex, off) {
var key = "surf" + tex.uuid;
if (SPK_MAT[key])
return SPK_MAT[key];
return (SPK_MAT[key] = new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -off, polygonOffsetUnits: -off * 2 }));
}
function spkRect(S, u0, u1, v0, v1, yo, mat, scale) { return __ZC(412, 17, this, arguments, new.target); }
function spkEll(S, cu, cv, ru, rv, yo, mat, scale) { return __ZC(412, 18, this, arguments, new.target); }
function spkBuild(S) { return __ZC(412, 19, this, arguments, new.target); }
function spkFallbackTrees(G, D, list) {
spkInst(G, spkGeo("trunk"), spkMat("lam", 0x5A3A22), list);
spkInst(G, spkGeo(D.tree === "pine" ? "pinecrown" : "crown"), spkMat("lam", 0xFFFFFF), list, true);
}
function spkDropPark() { return __ZC(412, 20, this, arguments, new.target); }
function spkStall(P, st, u, v, rot, j) { return __ZC(412, 21, this, arguments, new.target); }
SPK_O.rotation.order = "YXZ";
var SPK_BULBS = [0xE83A3A, 0xF8D040, 0x3A8AE8, 0xF4F4F4, 0xE87AE0, 0x5AD06A];
function spkOwnMesh(P, geo, mat) { var m = spkMine(new THREE.Mesh(geo, mat)); return m; }
function spkPlace(P, o, u, v, dy, rot) { var p = spkW(P.S, u, v); o.position.set(p.x, spkY(p.x, p.z) + (dy || 0), p.z); o.rotation.y = rot === undefined ? spkOutRot(p.a) : rot; P.G.add(o); return o; }
function spkRec(P, u, v, dy, rot, s, col, sy, rx) { var p = spkW(P.S, u, v); return [p.x, spkY(p.x, p.z) + (dy || 0), p.z, rot === undefined ? spkOutRot(p.a) : rot, s || 1, col, sy, rx]; }
function spkString(P, list, a, b, n, sag, cols) {
for (var i = 1; i < n; i++) {
var t = i / n, u = a[0] + (b[0] - a[0]) * t, v = a[1] + (b[1] - a[1]) * t, y = a[2] + (b[2] - a[2]) * t - Math.sin(t * Math.PI) * sag;
list.push(spkRec(P, u, v, y, 0, 1, cols[i % cols.length]));
}
}
function spkSprite(P, col, size, u, v, y) { var s = wGlow(col, size, 0.7); (P.own = P.own || []).push(s.material); spkPlace(P, s, u, v, y, 0); s.raycast = function () { }; return s; }
function spkLandmark(P, k) { return __ZC(412, 22, this, arguments, new.target); }
function spkWingBuild(P, Wg, sd) { return __ZC(412, 23, this, arguments, new.target); }
function spkMaze(P, cu, cv) { return __ZC(412, 24, this, arguments, new.target); }
function spkToday() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function spkMem() { var m = null; try {
m = JSON.parse(localStorage.getItem("spk_mem") || "null");
}
catch (e) { } if (!m || typeof m !== "object")
m = {}; if (m.day !== spkToday()) {
m.day = spkToday();
m.got = {};
m.pumpkin = false;
} m.got = m.got || {}; return m; }
function spkMemSave(m) { try {
localStorage.setItem("spk_mem", JSON.stringify(m));
}
catch (e) { } }
function spkHuntPlace(P) { return __ZC(412, 25, this, arguments, new.target); }
function spkHuntDraw(P, tm) { return __ZC(412, 26, this, arguments, new.target); }
function spkHuntTake(P, h) { return __ZC(412, 27, this, arguments, new.target); }
function spkRideStart(P, o) {
if (SPK.ride)
return;
var me = spkUV(P.S, camera.position.x, camera.position.z), a0 = Math.atan2((me.v - o.cv) / o.rv, (me.u - o.cu) / o.ru);
SPK.ride = { P: P, o: o, t: 0, a0: a0 };
worldCard(null);
setStatus("<b>Off you go</b> round " + o.label + ". Press <b>E</b> to stop early.");
}
function spkRideTick(dt) { return __ZC(412, 28, this, arguments, new.target); }
function spkRideEnd(whole) { var R = SPK.ride; if (!R)
return; SPK.ride = null; spkPrompt(null); setStatus(whole ? R.o.done : "You stop and step off."); }
function spkLandCard(P, title, sub, notes) { worldCard(worldFacts(title, sub, [], notes), {}); }
function spkStallCard(P, st) { worldCard(worldFacts(st[2] + " " + st[0], st[1], [], [st[3]]), {}); setStatus(st[2] + " " + st[3]); }
function spkBoardCard(P) { return __ZC(412, 29, this, arguments, new.target); }
function spkBandCard(P) { return __ZC(412, 30, this, arguments, new.target); }
function spkPickPumpkin(P) { return __ZC(412, 31, this, arguments, new.target); }
function spkClock(s) { s = Math.round(s); return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }
function spkMazeBest() { try {
return +localStorage.getItem("spk_maze") || 0;
}
catch (e) {
return 0;
} }
function spkMazeBell(P) { return __ZC(412, 32, this, arguments, new.target); }
function spkPrompt(html, fn, key) {
if (!html) {
if (SPK.near) {
SPK.near = null;
if (typeof worldPromptCity === "function")
worldPromptCity(null);
}
return;
}
if (SPK.near !== key) {
if (!SPK.near && typeof WCITY !== "undefined" && WCITY.fn)
return;
SPK.near = key;
worldPromptCity(html, function () { worldPromptCity(null); SPK.near = null; fn(); });
}
}
function spkWallAt(P, u, v) { return __ZC(412, 33, this, arguments, new.target); }
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
var P = SPK.cur;
if (P && !SPK.ride && typeof ATLC !== "undefined" && ATLC && !(typeof store !== "undefined" && store.inside) && (typeof INT === "undefined" || !INT)) {
try {
var q = spkUV(P.S, x, z);
if (spkWallAt(P, q.u, q.v))
return true;
}
catch (e) { }
}
return ba.apply(this, arguments);
};
if (typeof supportAt !== "function")
return;
var sa = supportAt;
supportAt = function (x, z, feet) {
var h = sa.apply(this, arguments), P = SPK.cur;
if (P && P.plat && typeof ATLC !== "undefined" && ATLC && !(typeof store !== "undefined" && store.inside)) {
var q = spkUV(P.S, x, z);
if (Math.hypot(q.u - P.plat.u, q.v - P.plat.v) < P.plat.r) {
var top = spkY(x, z) + P.plat.h;
if (top > h && feet + (typeof STEP_UP !== "undefined" ? STEP_UP : 0.6) + 0.02 >= top)
return top;
}
}
return h;
};
})();
function spkWant() {
if (typeof careInCity !== "function" || !careInCity() || typeof ATLC === "undefined" || !ATLC)
return null;
var c = camera.position, best = null, cur = SPK.cur && SPK.cur.S;
spkSites().forEach(function (S) { var q = spkUV(S, c.x, c.z), reach = S === cur ? 240 : 160; if (Math.abs(q.u) < S.U + reach && q.v > SPK_R0 - reach * 0.7 && q.v < SPK_R1 + reach * 0.7)
best = S; });
return best;
}
function spkTick(dt) {
SPK.t += dt;
SPK.ct -= dt;
if (SPK.ct <= 0) {
SPK.ct = 0.5;
var want = spkWant(), cur = SPK.cur && SPK.cur.S;
if (want !== cur || (want && SPK.cur && SPK.cur.c !== ATLC)) {
spkDropPark();
if (want && !SPK.failed) {
try {
var P = spkBuild(want);
P.c = ATLC;
}
catch (e) {
spkDropPark();
SPK.failed = String(e && e.stack || e);
throw e;
}
}
}
if (SPK.cur) {
var night = typeof nightGlowIsNight === "function" ? nightGlowIsNight() : 0, L = SPK.cur.lampMat;
if (L) {
L.color.setHex(SPK.cur.S.D.lamp);
L.color.multiplyScalar(0.45 + 0.55 * night);
}
}
}
var P2 = SPK.cur;
if (!P2)
return;
P2.anim.forEach(function (f) { f(SPK.t); });
spkHuntDraw(P2, SPK.t);
if (SPK.ride) {
spkRideTick(dt);
return;
}
var c = camera.position, me = spkUV(P2.S, c.x, c.z), walking = typeof walkMode === "undefined" || walkMode;
if (P2.maze) {
var Mz = P2.maze, inM = me.u > Mz.u0 && me.u < Mz.u1 && me.v > Mz.v0 && me.v < Mz.v1;
if (inM && !SPK.maze)
SPK.maze = { at: performance.now() };
if (!inM && SPK.maze && me.v > Mz.v1 + 3)
SPK.maze = null;
}
if (!walking || (typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block")) {
spkPrompt(null);
return;
}
var got = spkMem().got[P2.S.D.k] || [], best = null, bd = 1e9;
P2.hunt.forEach(function (h) { if (got.indexOf(h.i) >= 0)
return; var d = Math.hypot(h.u - me.u, h.v - me.v); if (d < 2.4 && d < bd && (h.y < 2 || P2.S.D.k === "summer")) {
bd = d;
best = { key: "h" + h.i, txt: P2.S.D.find[2] + " <b>A " + P2.S.D.find[0] + "!</b> · <b>press E</b> to pick it up", fn: function () { spkHuntTake(P2, h); } };
} });
if (!best)
P2.acts.forEach(function (a, j) {
var d, inside;
if (a.ru) {
var x = (me.u - a.u) / a.ru, y = (me.v - a.v) / a.rv;
inside = x * x + y * y < 1;
d = Math.sqrt(x * x + y * y) * a.ru;
}
else {
d = Math.hypot(a.u - me.u, a.v - me.v);
inside = d < a.r;
}
if (inside && d < bd) {
bd = d;
best = { key: "a" + j, txt: a.txt, fn: a.fn };
}
});
if (best)
spkPrompt(best.txt, best.fn, best.key);
else
spkPrompt(null);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
spkTick(dt);
}
catch (e) {
if (window.console && !SPK.warned) {
SPK.warned = true;
console.warn("season parks:", e);
}
} };
})();
function spkStats() { return __ZC(412, 34, this, arguments, new.target); }
