/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var ROWL = { lots: [], gate: null, cur: {}, t: 0, ct: 0, near: null, swim: null, builds: 0, drops: 0, warned: false, plan: 0 };
var RLF_STEP = 26;
var RLF_SEQ = ["cafe", "park", "shop", "plaza", "museum", "cafe", "lido", "shop", "cinema", "library", "playground", "shop", "cafe", "hotel", "garden", "shop",
"plaza", "cafe", "park", "shop", "lido", "cafe", "playground", "shop", "garden", "cafe", "museum", "shop", "plaza", "library", "park", "cafe"];
var RLF_K = { cafe: 1, shop: 1, library: 1, park: 2, plaza: 2, museum: 2, cinema: 2, hotel: 2, playground: 2, garden: 2, lido: 3, gate: 2 };
var RLF_CAFES = [["Café Aurora", "coffee, pastries and the morning papers"], ["The Copper Kettle", "tea, toast and cake all day"], ["Café Lumen", "espresso, gelato and a long terrace"],
["The Daily Grind", "coffee roasted on the premises"], ["Bistro Somnia", "lunch, wine and a table in the sun"], ["The Lantern Tea Room", "tea in china cups and scones"],
["Café Belle Époque", "hot chocolate, croissants and a piano"], ["The Corner Crêperie", "crêpes sweet and savoury"], ["Café Meridian", "breakfast until noon"], ["The Bluebird Café", "sandwiches and soup"]];
var RLF_SHOPS = [["The Ice Cream Parlour", "thirty flavours, cones and sundaes"], ["The Row Bakery", "bread from four in the morning"], ["Petals Florist", "flowers by the stem or the armful"],
["The Turning Page", "new and second-hand books"], ["The Toy Box", "toys, kites and board games"], ["The Sweet Jar", "sweets by the quarter"], ["The Deli on the Row", "cheeses, olives and cold meats"],
["Spin Records", "vinyl, old and new"], ["The Swimwear Shop", "costumes, towels and goggles for the Lido"], ["The Camera Shop", "cameras, film and prints"],
["The Gift Shop", "cards, candles and keepsakes"], ["The Bike Shop", "bicycles to buy and to hire"], ["The Fishmonger", "the morning's catch on ice"], ["The Tailor's", "suits made and mended"]];
var RLF_NAMES = { park: ["Linden Park", "The Pleasance", "Willow Green", "Chestnut Park", "Fountain Park"], plaza: ["Lantern Square", "Market Square", "Clocktower Plaza", "Bellflower Square", "Mosaic Plaza"],
museum: ["The Museum of the City", "The Museum of Light and Time"], cinema: ["The Picture House"], library: ["The Row Library", "The Reading Rooms"], hotel: ["The Grand Hotel on the Row"],
playground: ["The Splash Garden", "Adventure Playground"], garden: ["The Rose Garden", "The Topiary Garden"], lido: ["The Temple Row Lido", "The Sunlight Lido"] };
function rlfName(kind, n) { var L = RLF_NAMES[kind]; return L ? L[n % L.length] : kind; }
function rlfPlan(C, slots) {
ROWL.lots = [];
ROWL.gate = null;
ROWL.plan++;
var kb = function (rs, side) { return rs + side * (ATL_ROAD + 1.5); };
var runs = [], cur = null;
slots.forEach(function (s) {
if (rlfInPark(s)) {
cur = null;
return;
}
if (cur && cur.rs === s.rs && cur.side === s.side && Math.abs(atlWrap(s.a - cur.last.a) * s.rb - RLF_STEP) < 3) {
cur.s.push(s);
cur.last = s;
}
else {
cur = { rs: s.rs, side: s.side, s: [s], last: s };
runs.push(cur);
}
});
var gi = -1, gj = -1, gd = 1e9;
runs.forEach(function (R, i) { if (R.rs !== 740 || R.side !== 1)
return; for (var j = 0; j + 1 < R.s.length; j++) {
var d = Math.abs(atlWrap(R.s[j].a - (0.19 + 0.6)));
if (d < gd) {
gd = d;
gi = i;
gj = j;
}
} });
var n = {}, seq = 0;
function count(k) { return (n[k] = (n[k] || 0) + 1) - 1; }
runs.forEach(function (R, ri) {
var i = 0;
while (i < R.s.length) {
var left = R.s.length - i, kind;
if (ri === gi && i === gj) {
kind = "gate";
}
else {
kind = RLF_SEQ[seq % RLF_SEQ.length];
seq++;
if (RLF_K[kind] > left || (ri === gi && i < gj && i + RLF_K[kind] > gj))
kind = (left >= 1 && (seq % 3 === 0)) ? "shop" : "cafe";
}
var k = RLF_K[kind], first = R.s[i], last = R.s[i + k - 1];
var mid = first.a + atlWrap(last.a - first.a) / 2, K = kb(R.rs, R.side), depth = rlfDepth(R.rs, R.side);
var L = { kind: kind, rs: R.rs, side: R.side, a: mid, kb: K, W: k * RLF_STEP, D: depth, face: R.side > 0 ? rotIn(mid) : rotOut(mid), i: ROWL.lots.length, n: count(kind) };
L.h = { x: C.h.x, z: C.h.z };
L.cx = L.h.x + Math.cos(mid) * (K + R.side * depth / 2);
L.cz = L.h.z + Math.sin(mid) * (K + R.side * depth / 2);
L.r = Math.hypot(L.W, L.D) / 2;
try {
rlfLay(C, L);
}
catch (e) {
if (window.console)
console.warn("[row-life] lot", kind, e);
}
ROWL.lots.push(L);
if (kind === "gate")
ROWL.gate = L;
i += k;
}
});
}
function rlfDepth(rs, side) { if (rs === 740 && side > 0)
return 34; if (rs === 740)
return 30; return 30; }
function rlfInPark(s) {
if (typeof spkSites !== "function" || typeof SPK_R0 === "undefined")
return false;
var L = spkSites(), v0 = s.rb - 14, v1 = s.rb + 14;
for (var i = 0; i < L.length; i++) {
var S = L[i], u = atlWrap(s.a - S.mid) * SPK_RM;
if (Math.abs(u) < S.U + 14 && v1 > SPK_R0 && v0 < SPK_R1)
return true;
}
return false;
}
function rlfAt(L, u, v) { var r = L.kb + L.side * v, a = L.a + u / r; return { r: r, a: a, x: Math.cos(a) * r, z: Math.sin(a) * r }; }
function rlfFront(C, L, arch, u, w, d, name, extra, sb) {
var K = KIT[arch];
if (!K)
return null;
var s = Math.min(w / K.size[0], d / K.size[2], 1.4);
s = Math.round(s * 100) / 100;
var v = (sb === undefined ? 3.5 : sb) + K.size[2] * s / 2, p = rlfAt(L, u, v);
var ex = { rowlife: true };
if (extra)
for (var k in extra)
ex[k] = extra[k];
return C.put(arch, p.x, p.z, L.face, name, s !== 1 ? { s: s } : {}, ex);
}
function rlfPut(C, L, arch, u, v, rot, name, attrs) { var p = rlfAt(L, u, v); return C.put(arch, p.x, p.z, rot === undefined ? L.face : L.face + rot, name || null, attrs || null, { rowlife: true }); }
function rlfSign(C, L, u, title, note) { var p = rlfAt(L, u, 0.6); var sg = C.put("signboard", p.x, p.z, L.face, title, null, { rowlife: true }); if (sg) {
sg.sign = title;
sg.note = note || "";
} return sg; }
function rlfLay(C, L) {
var W = L.W, D = L.D, h = W / 2, nm;
if (L.kind === "gate") {
L.name = "The Stair to the Heavens";
rlfSign(C, L, -h + 4, L.name, "A stair of cloud and gold, up to the Heavens, where every power the Atlas knows now keeps a palace in their own country. Walk up the steps, or press E at the gate.");
rlfPut(C, L, "ornatelamp", -h + 2, 1.5);
rlfPut(C, L, "ornatelamp", h - 2, 1.5);
rlfPut(C, L, "flowerbed", -h + 6, 4, 0);
rlfPut(C, L, "flowerbed", h - 6, 4, 0);
return;
}
if (L.kind === "cafe") {
var cf = RLF_CAFES[L.n % RLF_CAFES.length];
L.name = cf[0];
rlfFront(C, L, "shop", -6, 12, 16, cf[0], { signName: cf[0], evb: { theme: "imcafehouse" } });
rlfSign(C, L, 6, cf[0], "A café: " + cf[1] + ". Tables out on the terrace when it is fine; go in for the café and the rooms behind it.");
rlfPut(C, L, "festoonlights", 6, 4.5, 0);
rlfPut(C, L, "festoonlights", 6, 11, 0);
rlfPut(C, L, "pottedplant", 1.2, 2);
rlfPut(C, L, "pottedplant", 12, 2);
rlfPut(C, L, "tree", 9, D - 5);
return;
}
if (L.kind === "shop") {
var sh = RLF_SHOPS[L.n % RLF_SHOPS.length];
L.name = sh[0];
rlfFront(C, L, "shop", -3.5, 12, 16, sh[0], { signName: sh[0] });
rlfSign(C, L, 6, sh[0], sh[1] + ".");
rlfPut(C, L, "bench", 8, 3, Math.PI);
rlfPut(C, L, "tree", 9, D - 6);
rlfPut(C, L, "ornatelamp", 11.5, 1.6);
return;
}
if (L.kind === "library") {
nm = L.name = rlfName("library", L.n);
rlfFront(C, L, "library", 0, 23, 22, nm);
rlfSign(C, L, -11, nm, "Free to everyone: the reading room, the stacks, the children's corner and the papers.");
rlfPut(C, L, "bench", -10, 2.4, Math.PI);
rlfPut(C, L, "bench", 10, 2.4, Math.PI);
return;
}
if (L.kind === "museum") {
nm = L.name = rlfName("museum", L.n);
rlfFront(C, L, "museum", -4, 32, 22, nm, { evb: { theme: "museum" } });
rlfSign(C, L, -20, nm, "The city's own collections: galleries, a great hall and a café. Free on every day of the week.");
rlfPut(C, L, "herostatue", 17, 9);
rlfPut(C, L, "tree", 22, D - 6);
rlfPut(C, L, "bench", 16, 3, Math.PI);
rlfPut(C, L, "ornatelamp", 12, 1.6);
rlfPut(C, L, "ornatelamp", -21, 1.6);
return;
}
if (L.kind === "cinema") {
nm = L.name = rlfName("cinema", L.n);
rlfFront(C, L, "picturehouse", -3, 30, 26, nm, { evb: { theme: "cinema" } });
rlfSign(C, L, -19, nm, "Films every evening, matinées at the weekend; the foyer bar is open all day.");
rlfPut(C, L, "bench", 18, 3, Math.PI);
rlfPut(C, L, "tree", 21, D - 6);
rlfPut(C, L, "ornatelamp", 14, 1.6);
return;
}
if (L.kind === "hotel") {
nm = L.name = rlfName("hotel", L.n);
rlfFront(C, L, "hotel", -6, 28, 24, nm);
rlfSign(C, L, -21, nm, "Rooms by the night or the week, a dining room and a bar; the doorman will take your bags.");
rlfPut(C, L, "tierfountain", 17, 10, 0, null, { s: 0.6 });
rlfPut(C, L, "ornatelamp", 13, 1.6);
rlfPut(C, L, "ornatelamp", 23, 1.6);
rlfPut(C, L, "topiary", 13, D - 4);
rlfPut(C, L, "topiary", 23, D - 4);
return;
}
if (L.kind === "park") {
nm = L.name = rlfName("park", L.n);
rlfSign(C, L, -h + 5, nm, "A park: lawns, a bandstand, flower beds and shade. The gates are never locked.");
rlfPut(C, L, "gazebo", 0, D / 2 + 2);
[[-19, 8], [-17, D - 6], [17, 8], [19, D - 6], [-7, D - 3], [8, D - 3]].forEach(function (q, i) { rlfPut(C, L, i % 3 === 2 ? "palm" : "tree", q[0], q[1]); });
[[-9, 6], [9, 6]].forEach(function (q) { rlfPut(C, L, "flowerbed", q[0], q[1], 0); });
[[-10, D / 2 + 2], [10, D / 2 + 2], [-21, D / 2], [21, D / 2]].forEach(function (q) { rlfPut(C, L, "bench", q[0], q[1], q[0] < 0 ? Math.PI / 2 : -Math.PI / 2); });
rlfPut(C, L, "ornatelamp", -h + 2, 1.6);
rlfPut(C, L, "ornatelamp", h - 2, 1.6);
rlfPut(C, L, "ornatelamp", 0, D - 1.5);
return;
}
if (L.kind === "plaza") {
nm = L.name = rlfName("plaza", L.n);
rlfSign(C, L, -h + 5, nm, "A square for everyone: the fountain, the market stalls, the buskers and somewhere to sit.");
rlfPut(C, L, "tierfountain", 0, D / 2 + 1);
[[-17, 7], [-17, D - 7], [17, 7], [17, D - 7]].forEach(function (q, i) { rlfPut(C, L, "marketstall", q[0], q[1], q[0] < 0 ? Math.PI / 2 : -Math.PI / 2, null, { c: [0xC0392B, 0x2E7AB8, 0x3A8A4A, 0xE0A030][i] }); });
[[-8, 4], [8, 4], [-8, D - 3], [8, D - 3]].forEach(function (q) { rlfPut(C, L, "bench", q[0], q[1], q[1] < D / 2 ? Math.PI : 0); });
[[-23, 3], [23, 3], [-23, D - 3], [23, D - 3]].forEach(function (q) { rlfPut(C, L, "tree", q[0], q[1]); });
[[-12, D / 2 + 1], [12, D / 2 + 1]].forEach(function (q) { rlfPut(C, L, "ornatelamp", q[0], q[1]); });
rlfPut(C, L, "festoonlights", 0, 6, 0);
rlfPut(C, L, "festoonlights", 0, D - 6, 0);
return;
}
if (L.kind === "playground") {
nm = L.name = rlfName("playground", L.n);
rlfSign(C, L, -h + 5, nm, "Swings, slides and the climbing frame, and the splash pad's fountains in summer. Grown-ups sit on the benches.");
rlfPut(C, L, "playground", -11, D / 2 + 2);
[[-23, 5], [23, D - 4], [-23, D - 4]].forEach(function (q) { rlfPut(C, L, "tree", q[0], q[1]); });
[[2, 4], [2, D - 3], [22, 5]].forEach(function (q) { rlfPut(C, L, "bench", q[0], q[1], q[1] < D / 2 ? Math.PI : 0); });
rlfPut(C, L, "ornatelamp", 0, D / 2);
return;
}
if (L.kind === "garden") {
nm = L.name = rlfName("garden", L.n);
rlfSign(C, L, -h + 5, nm, "Clipped hedges, roses in their beds and a long still pool. Quiet, please, for the birds.");
rlfPut(C, L, "reflectpool", 0, D / 2 + 1, Math.PI / 2);
[[-14, 7], [14, 7], [-14, D - 6], [14, D - 6], [-6, D - 3], [6, D - 3]].forEach(function (q) { rlfPut(C, L, "flowerbed", q[0], q[1], 0); });
[[-22, 4], [22, 4], [-22, D - 3], [22, D - 3], [-8, 4], [8, 4]].forEach(function (q) { rlfPut(C, L, "topiary", q[0], q[1]); });
[[-19, D / 2 + 1], [19, D / 2 + 1]].forEach(function (q) { rlfPut(C, L, "bench", q[0], q[1], q[0] < 0 ? Math.PI / 2 : -Math.PI / 2); });
return;
}
if (L.kind === "lido") {
nm = L.name = rlfName("lido", L.n);
rlfSign(C, L, -h + 4, nm, "The open-air pool: fifty metres of warm blue water, the diving board, loungers and parasols, and the Lido Café. Press E at the water's edge to swim a length.");
rlfFront(C, L, "shop", h - 8, 12, 16, "The Lido Café", { signName: "The Lido Café", evb: { theme: "imcafehouse" } });
rlfPut(C, L, "palm", -h + 2, D - 3);
rlfPut(C, L, "palm", h - 16, D - 3);
rlfPut(C, L, "ornatelamp", -h + 1.5, 1.6);
return;
}
}
function rlfLite() { return typeof LITE !== "undefined" && !!LITE; }
function rlfY(x, z) { return typeof terrainY === "function" ? (terrainY(x, z) || 0) : 0; }
function rlfW(L, u, v) { var r = L.kb + L.side * v, a = L.a + u / r; return { x: L.h.x + Math.cos(a) * r, z: L.h.z + Math.sin(a) * r, a: a }; }
function rlfUV(L, x, z) { var dx = x - L.h.x, dz = z - L.h.z, r = Math.sqrt(dx * dx + dz * dz); return { u: atlWrap(Math.atan2(dz, dx) - L.a) * r, v: (r - L.kb) * L.side }; }
function rlfRot(L, u) { var a = L.a + u / (L.kb + L.side * L.D / 2); return L.side > 0 ? rotIn(a) : rotOut(a); }
var RLF_TEX = {}, RLF_GEO = {}, RLF_MAT = {};
function rlfTex(k, fn, rep) { return __ZC(447, 0, this, arguments, new.target); }
function rlfSpeck(x, W, H, n, cols, r0, r1, seed) { var R = wRand(seed); for (var i = 0; i < n; i++) {
x.fillStyle = cols[Math.floor(R() * cols.length)];
x.beginPath();
x.arc(R() * W, R() * H, r0 + R() * (r1 - r0), 0, 7);
x.fill();
} }
function rlfGroundTex(k) { return __ZC(447, 1, this, arguments, new.target); }
function rlfMat(k, col, o) { return __ZC(447, 2, this, arguments, new.target); }
function rlfGeo(k) { return __ZC(447, 3, this, arguments, new.target); }
function rlfStripeMat(a, b) { return __ZC(447, 4, this, arguments, new.target); }
function rlfUp(g) { g.computeVertexNormals(); var n = g.attributes.normal; if (n && n.count && n.getY(0) < 0) {
var ix = g.index.array;
for (var i = 0; i < ix.length; i += 3) {
var t = ix[i + 1];
ix[i + 1] = ix[i + 2];
ix[i + 2] = t;
}
g.index.needsUpdate = true;
g.computeVertexNormals();
} return g; }
function rlfPatch(P, u0, u1, v0, v1, mat, tile, dy) { return __ZC(447, 5, this, arguments, new.target); }
var RLF_FAR = {
lido: [[-0.5, 0.5, 0, 0xE6E0D2], ["pool"]],
cafe: [[0, 0.5, 15, 0xC89A6A]], shop: [[0.05, 0.5, 6, 0xCFC6B8]], library: [[-0.5, 0.5, 3.6, 0xCFC6B8]],
museum: [[-0.5, 0.5, 0, 0xD4CCBE]], cinema: [[-0.5, 0.5, 4, 0xCFC6B8]], hotel: [[-0.5, 0.5, 0, 0xC8A07A]],
park: [["path", 0xD8C8A0]], garden: [["path", 0xD8C8A0]],
plaza: [[-0.5, 0.5, 0, 0xCBC2B2], ["mid", 0xB88A5E]],
playground: [["rub", 0xD8603A], ["splash", 0x7CC8EA]],
gate: [[-0.5, 0.5, 0, 0xF4F2EE]]
};
function rlfFarBuild() {
var pos = [], col = [], idx = [], c = new THREE.Color();
function quad(L, u0, u1, v0, v1, hex, dy) {
var nu = Math.max(1, Math.ceil((u1 - u0) / 12)), base = pos.length / 3;
c.setHex(hex);
for (var j = 0; j <= 1; j++)
for (var i = 0; i <= nu; i++) {
var p = rlfW(L, u0 + (u1 - u0) * i / nu, j ? v1 : v0);
pos.push(p.x, rlfY(p.x, p.z) + 0.15 + (dy || 0), p.z);
col.push(c.r, c.g, c.b);
}
for (var i2 = 0; i2 < nu; i2++) {
var a = base + i2, b = a + 1, cc = a + nu + 1, d = cc + 1;
if (L.side > 0)
idx.push(a, cc, b, b, cc, d);
else
idx.push(a, b, cc, b, d, cc);
}
}
ROWL.lots.forEach(function (L) {
var h = L.W / 2, D = L.D;
(RLF_FAR[L.kind] || []).forEach(function (q) {
if (typeof q[0] === "number")
quad(L, q[0] * L.W + 0.5, q[1] * L.W - 0.5, 0.4, q[2] || D - 0.5, q[3]);
else if (q[0] === "pool") {
var pu0 = -h + 5;
quad(L, pu0 - 1, pu0 + 51, 7, 23, 0xF4F2EC, 0.01);
quad(L, pu0, pu0 + 50, 8, 22, 0x2E9BD0, 0.02);
}
else if (q[0] === "path") {
quad(L, -2, 2, 0.4, D - 1, q[1]);
quad(L, -h + 1, h - 1, D / 2 - 0.5, D / 2 + 4.5, q[1], 0.005);
}
else if (q[0] === "mid")
quad(L, -9, 9, D / 2 - 8, D / 2 + 10, q[1], 0.01);
else if (q[0] === "rub")
quad(L, -20, -2, 4, D - 3, q[1]);
else if (q[0] === "splash")
quad(L, 6, 20, 6, 20, q[1]);
});
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true, side: THREE.DoubleSide }));
m.name = "row life far";
m.receiveShadow = true;
m.raycast = function () { };
m.userData.plan = ROWL.plan;
return m;
}
function rlfFarTick(on) {
if (ROWL.far && (ROWL.far.userData.plan !== ROWL.plan || !on)) {
if (ROWL.far.parent)
ROWL.far.parent.remove(ROWL.far);
ROWL.far.geometry.dispose();
ROWL.far.material.dispose();
ROWL.far = null;
}
if (on && !ROWL.far && ROWL.lots.length) {
try {
ROWL.far = rlfFarBuild();
scene.add(ROWL.far);
}
catch (e) {
if (window.console && !ROWL.warned) {
ROWL.warned = true;
console.warn("[row-life] far", e);
}
}
}
}
function rlfBox(P, u, v, y, w, h, d, mat, rot, geo) {
var p = rlfW(P.L, u, v), m = new THREE.Mesh(rlfGeo(geo || "box"), mat);
m.scale.set(w, h, d);
m.position.set(p.x - P.ox, rlfY(p.x, p.z) + y, p.z - P.oz);
m.rotation.y = rlfRot(P.L, u) + (rot || 0);
m.castShadow = !P.small;
P.G.add(m);
return m;
}
function rlfBatch(P, key, geo, mat) { var B = P.batch[key] || (P.batch[key] = { geo: rlfGeo(geo), mat: mat, list: [] }); return B; }
function rlfPiece(P, key, geo, mat, u, v, y, sx, sy, sz, rot) { var p = rlfW(P.L, u, v); rlfBatch(P, key, geo, mat).list.push([p.x - P.ox, rlfY(p.x, p.z) + y, p.z - P.oz, rlfRot(P.L, u) + (rot || 0), sx, sy, sz]); }
function rlfFlush(P) { return __ZC(447, 6, this, arguments, new.target); }
function rlfSolid(P, u, v, r) { P.cc.push({ u: u, v: v, r: r }); }
function rlfSolidBox(P, u0, u1, v0, v1) { P.cb.push({ u0: Math.min(u0, u1), u1: Math.max(u0, u1), v0: Math.min(v0, v1), v1: Math.max(v0, v1) }); }
function rlfTable(P, u, v, sm, parasol) { return __ZC(447, 7, this, arguments, new.target); }
function rlfLounger(P, u, v, col, rot) {
rlfPiece(P, "lframe", "box", rlfMat("lam", 0xE8E4DC), u, v, 0.2, 0.7, 0.12, 1.9, rot);
rlfPiece(P, "lcush" + col, "box", rlfMat("lam", col), u, v, 0.3, 0.66, 0.08, 1.4, rot);
var b = rlfW(P.L, u, v);
rlfPiece(P, "lback" + col, "box", rlfMat("lam", col), u, v - 0.95 * Math.cos(rot || 0), 0.5, 0.66, 0.08, 0.6, rot);
rlfSolid(P, u, v, 0.5);
}
function rlfPerson(P, seed, u, v, o) { return __ZC(447, 8, this, arguments, new.target); }
function rlfBuildLot(L) { return __ZC(447, 9, this, arguments, new.target); }
function rlfDropLot(P) { return __ZC(447, 10, this, arguments, new.target); }
var RLF_STRIPES = [["#C0392B", "#F6EFE2"], ["#1F5E8A", "#F6EFE2"], ["#2E7A4A", "#F2E8D2"], ["#D88A1E", "#FFF6E0"], ["#7A3A6A", "#F4ECE4"], ["#2A2A2A", "#F2F0EA"]];
var RLF_DRESS = {
gate: function (P, W, D, h, small) { return __ZC(447, 11, this, arguments, new.target); },
cafe: function (P, W, D, h, small) { return __ZC(447, 12, this, arguments, new.target); },
shop: function (P, W, D, h, small) { rlfPatch(P, 2.5, h - 0.5, 0.4, 6, rlfMat("tex", "paving"), 4); rlfPerson(P, 1, 6, 4, { walk: 1 }); },
library: function (P, W, D, h, small) { rlfPatch(P, -h + 0.5, h - 0.5, 0.4, 3.6, rlfMat("tex", "paving"), 4); rlfPerson(P, 1, -6, 2.5, { walk: 1 }); },
museum: function (P, W, D, h, small) { rlfPatch(P, -h + 0.5, h - 0.5, 0.4, D - 1, rlfMat("tex", "paving"), 5); rlfPerson(P, 1, 10, 3, { walk: 1 }); rlfPerson(P, 2, 18, 5, {}); },
cinema: function (P, W, D, h, small) { rlfPatch(P, -h + 0.5, h - 0.5, 0.4, 4, rlfMat("tex", "paving"), 4); rlfPatch(P, 13, h - 0.5, 4, D - 1, rlfMat("tex", "paving"), 4); rlfPerson(P, 1, -4, 2.6, {}); rlfPerson(P, 2, 15, 3, { walk: 1 }); },
hotel: function (P, W, D, h, small) { rlfPatch(P, -h + 0.5, h - 0.5, 0.4, D - 1, rlfMat("tex", "terrace"), 5); rlfPerson(P, 1, -6, 2.5, { title: "Doorman", place: "hotel" }); rlfPerson(P, 2, 16, 6, { walk: 1 }); },
park: function (P, W, D, h, small) { return __ZC(447, 13, this, arguments, new.target); },
plaza: function (P, W, D, h, small) { return __ZC(447, 14, this, arguments, new.target); },
playground: function (P, W, D, h, small) { return __ZC(447, 15, this, arguments, new.target); },
garden: function (P, W, D, h, small) {
rlfPatch(P, -h + 0.5, h - 0.5, 0.4, D - 0.5, rlfMat("tex", "lawn"), 6, 0.04);
rlfPatch(P, -h + 1, h - 1, 1, 4, rlfMat("tex", "gravel"), 4, 0.07);
rlfPatch(P, -h + 1, h - 1, D / 2 - 2, D / 2 + 4, rlfMat("tex", "gravel"), 4, 0.075);
rlfPerson(P, 1, -10, D / 2 + 1, { walk: 1 });
rlfPerson(P, 2, 16, 8, { rot: 1.2 });
},
lido: function (P, W, D, h, small) { return __ZC(447, 16, this, arguments, new.target); }
};
function rlfSwimStart(P, dive) { return __ZC(447, 17, this, arguments, new.target); }
function rlfSwimTick(dt) { return __ZC(447, 18, this, arguments, new.target); }
function rlfPrompt(html, fn, key) {
if (!html) {
if (ROWL.near) {
ROWL.near = null;
if (typeof worldPromptCity === "function")
worldPromptCity(null);
}
return;
}
if (ROWL.near !== key) {
if (!ROWL.near && typeof WCITY !== "undefined" && WCITY.fn)
return;
ROWL.near = key;
worldPromptCity(html, function () { worldPromptCity(null); ROWL.near = null; fn(); });
}
}
function rlfInCity() {
if (typeof ATLC === "undefined" || !ATLC || !ROWL.lots.length)
return false;
if (typeof WLD !== "undefined" && WLD.on)
return false;
if (typeof store !== "undefined" && store.inside)
return false;
if (typeof careInCity === "function" && !careInCity())
return false;
if (typeof FLK_ROW !== "undefined" && FLK_ROW && FLK_ROW.hidden)
return false;
return true;
}
function rlfWallAt(P, x, z) { return __ZC(447, 19, this, arguments, new.target); }
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (!ROWL.swim && !(typeof INT !== "undefined" && INT) && !(typeof WLD !== "undefined" && WLD.on)) {
for (var k in ROWL.cur) {
var P = ROWL.cur[k];
try {
if (rlfWallAt(P, x, z))
return true;
}
catch (e) { }
}
}
return ba.apply(this, arguments);
};
})();
function rlfTick(dt) {
ROWL.t += dt;
ROWL.ct -= dt;
var on = rlfInCity(), c = camera.position;
if (ROWL.ct <= 0) {
ROWL.ct = 0.6;
rlfFarTick(on);
var want = {}, n = 0, cap = rlfLite() ? 4 : 9, near = [];
if (on)
ROWL.lots.forEach(function (L) { var d = Math.hypot(L.cx - c.x, L.cz - c.z) - L.r, keep = ROWL.cur[L.i] ? 240 : 170; if (d < keep)
near.push([d, L]); });
near.sort(function (a, b) { return a[0] - b[0]; });
near.slice(0, cap).forEach(function (q) { want[q[1].i] = q[1]; });
for (var k in ROWL.cur) {
if (!want[k] || ROWL.cur[k].plan !== ROWL.plan) {
rlfDropLot(ROWL.cur[k]);
delete ROWL.cur[k];
}
}
for (var k2 in want) {
if (ROWL.cur[k2])
continue;
try {
var P = rlfBuildLot(want[k2]);
P.plan = ROWL.plan;
ROWL.cur[k2] = P;
}
catch (e) {
if (window.console && !ROWL.warned) {
ROWL.warned = true;
console.warn("[row-life] build", e);
}
}
break;
}
}
if (!on) {
rlfPrompt(null);
return;
}
var t = ROWL.t;
for (var key in ROWL.cur) {
var P2 = ROWL.cur[key];
P2.anim.forEach(function (f) { try {
f(t);
}
catch (e) { } });
P2.walkers.forEach(function (M) { rlfWalk(P2, M, dt); });
}
if (ROWL.swim) {
rlfSwimTick(dt);
return;
}
if (typeof walkMode !== "undefined" && !walkMode) {
rlfPrompt(null);
return;
}
if (typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block") {
rlfPrompt(null);
return;
}
var best = null, bd = 1e9;
for (var k3 in ROWL.cur) {
var P3 = ROWL.cur[k3], me = rlfUV(P3.L, c.x, c.z);
P3.acts.forEach(function (a, j) { var d = Math.hypot(a.u - me.u, a.v - me.v); if (d < a.r && d < bd && (!a.only || a.only())) {
bd = d;
best = { key: P3.L.i + ":" + j, txt: a.txt, fn: a.fn };
} });
}
if (best)
rlfPrompt(best.txt, best.fn, best.key);
else
rlfPrompt(null);
}
function rlfWalk(P, M, dt) { return __ZC(447, 20, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
rlfTick(dt);
}
catch (e) {
if (window.console && !ROWL.warnT) {
ROWL.warnT = true;
console.warn("[row-life] tick", e);
}
} };
})();
function rlfStats() { return __ZC(447, 21, this, arguments, new.target); }
