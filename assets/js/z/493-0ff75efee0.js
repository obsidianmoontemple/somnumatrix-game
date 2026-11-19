/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(493, function () {
"use strict";
return [
function () {
return { name: "", size: "medium", shape: "branch", party: "1", diff: "fair", theme: "crypt", decor: "furnished", sets: null, light: "torch",
beasts: null, many: "some", traps: ["spikes", "fire", "darts"], often: "few", puzzles: ["levers", "key", "riddle"], puzN: 1, loot: "fair", secret: true,
boss: { on: true, kind: null, name: "", size: "huge", tricks: ["slam", "rage"] }, seed: 0 };
},
function (a, b) {
var ox0 = Math.max(a.x, b.x), ox1 = Math.min(a.x + a.w, b.x + b.w), oz0 = Math.max(a.z, b.z), oz1 = Math.min(a.z + a.l, b.z + b.l), m;
if (ox1 - ox0 >= 2) {
m = Math.floor((ox0 + ox1) / 2) - 1;
if (a.z + a.l <= b.z)
return [{ x: m, z: a.z + a.l, w: 2, l: b.z - (a.z + a.l) }];
if (b.z + b.l <= a.z)
return [{ x: m, z: b.z + b.l, w: 2, l: a.z - (b.z + b.l) }];
return null;
}
if (oz1 - oz0 >= 2) {
m = Math.floor((oz0 + oz1) / 2) - 1;
if (a.x + a.w <= b.x)
return [{ x: a.x + a.w, z: m, w: b.x - (a.x + a.w), l: 2 }];
if (b.x + b.w <= a.x)
return [{ x: b.x + b.w, z: m, w: a.x - (b.x + b.w), l: 2 }];
return null;
}
var ax = Math.floor(a.x + a.w / 2) - 1, bz = Math.floor(b.z + b.l / 2) - 1;
var zs = b.z + b.l / 2 < a.z + a.l / 2 ? -1 : 1, xs = b.x + b.w / 2 < a.x + a.w / 2 ? -1 : 1;
var z0 = zs < 0 ? a.z : a.z + a.l, z1 = bz + (zs < 0 ? 0 : 2);
var leg1 = zs < 0 ? { x: ax, z: Math.min(z0, bz), w: 2, l: z0 - Math.min(z0, bz) } : { x: ax, z: z0, w: 2, l: Math.max(0, z1 - z0) };
var x0 = xs < 0 ? ax : ax + 2, x1 = xs < 0 ? b.x + b.w : b.x;
var leg2 = xs < 0 ? { x: x1, z: bz, w: x0 - x1, l: 2 } : { x: x0, z: bz, w: x1 - x0, l: 2 };
if (leg1.l < 0 || leg2.w < 1)
return null;
return [leg1, leg2];
},
function (S) {
var R = S.rooms, i, j;
for (i = 0; i < R.length; i++)
for (j = i + 1; j < R.length; j++)
if (dmkHit(dmkGrow(R[i], 1), R[j]))
return "Two rooms are too close: " + dmkRoomName(S, i) + " and " + dmkRoomName(S, j) + ".";
for (i = 0; i < S.links.length; i++) {
var L = S.links[i], a = R[L[0]], b = R[L[1]];
if (!a || !b)
return "A passage leads nowhere.";
var C = dmkCorr(a, b);
if (!C)
return "There is no way to join " + dmkRoomName(S, L[0]) + " and " + dmkRoomName(S, L[1]) + ".";
for (var c = 0; c < C.length; c++)
for (j = 0; j < R.length; j++) {
if (j === L[0] || j === L[1])
continue;
if (dmkHit(dmkGrow(C[c], 0), R[j]))
return "A passage would cut through " + dmkRoomName(S, j) + ".";
}
}
var seen = { 0: 1 }, q = [0];
while (q.length) {
var k = q.shift();
S.links.forEach(function (L) { var o = L[0] === k ? L[1] : L[1] === k ? L[0] : -1; if (o >= 0 && !seen[o]) {
seen[o] = 1;
q.push(o);
} });
}
for (i = 0; i < R.length; i++)
if (!seen[i])
return dmkRoomName(S, i) + " cannot be reached.";
return "";
},
function (R, k, cave) {
var K = dmkKind(k);
if (K.boss)
return [dmkInt(R, 13, 17), dmkInt(R, 13, 18)];
if (K.big)
return [dmkInt(R, 10, 13), dmkInt(R, 10, 14)];
if (K.long) {
return R() < 0.5 ? [dmkInt(R, 4, 5), dmkInt(R, 11, 15)] : [dmkInt(R, 11, 15), dmkInt(R, 4, 5)];
}
if (K.k === "entry")
return [9, 9];
if (K.hidden)
return [dmkInt(R, 4, 6), dmkInt(R, 4, 6)];
if (cave)
return [dmkInt(R, 5, 12), dmkInt(R, 5, 12)];
return [dmkInt(R, 6, 10), dmkInt(R, 6, 10)];
},
function (S, p, n, d, R) {
var a = S.rooms[p], D = DMK_DIRS[d], tries = 6;
while (tries--) {
var g = dmkInt(R, 2, 5), q = { x: 0, z: 0, w: n.w, l: n.l };
if (D[1]) {
q.z = D[1] < 0 ? a.z - g - n.l : a.z + a.l + g;
q.x = dmkInt(R, a.x - n.w + 2, a.x + a.w - 2);
}
else {
q.x = D[0] < 0 ? a.x - g - n.w : a.x + a.w + g;
q.z = dmkInt(R, a.z - n.l + 2, a.z + a.l - 2);
}
if (p === 0 && d === "S")
return null;
var ok = true;
for (var i = 0; i < S.rooms.length && ok; i++)
if (dmkHit(dmkGrow(S.rooms[i], 1), q))
ok = false;
if (!ok)
continue;
var C = dmkCorr(a, q);
if (!C)
continue;
for (var c = 0; c < C.length && ok; c++)
for (var j = 0; j < S.rooms.length && ok; j++) {
if (j === p)
continue;
if (dmkHit(C[c], S.rooms[j]))
ok = false;
}
if (ok)
for (var l = 0; l < S.links.length && ok; l++) {
var C2 = dmkCorr(S.rooms[S.links[l][0]], S.rooms[S.links[l][1]]) || [];
for (var c2 = 0; c2 < C2.length && ok; c2++)
if (dmkHit(dmkGrow(q, 1), C2[c2]))
ok = false;
}
if (!ok)
continue;
n.x = q.x;
n.z = q.z;
return n;
}
return null;
},
function (opt) {
opt = JSON.parse(JSON.stringify(opt || dmkDefaults()));
if (!opt.seed)
opt.seed = 1 + Math.floor(Math.random() * 999999);
var R = dmkRng(opt.seed * 7919 + 13), T = dmkTheme(opt.theme), N = dmkPick(DMK_SIZES, opt.size).rooms, shape = opt.shape, cave = shape === "cavern" || !!T.cave;
var S = { v: 1, opt: opt, seed: opt.seed, rooms: [], links: [] };
S.rooms.push({ x: -4, z: -4, w: 9, l: 9, k: "entry" });
var guard = 0, kinds = ["chamber", "chamber", "chamber", "hall", "corridor", "library", "armoury", "crypt", "den", "barracks", "prison", "chamber", "shrine", "throne", "chamber", "den"];
while (S.rooms.length < N && guard++ < N * 40) {
var p, L = S.rooms.length, k = kinds[dmkInt(R, 0, kinds.length - 1)];
if (shape === "hub" && L === 1)
k = "hall";
if (shape === "winding")
p = R() < 0.82 ? L - 1 : dmkInt(R, 0, L - 1);
else if (shape === "branch") {
var c = [];
for (var i = Math.max(0, L - 5); i < L; i++)
if (dmkDegree(S, i) < 3)
c.push(i);
p = c.length ? c[dmkInt(R, 0, c.length - 1)] : dmkInt(R, 0, L - 1);
}
else if (shape === "hub")
p = L === 1 ? 0 : (R() < 0.6 ? 1 : dmkInt(R, 1, L - 1));
else if (shape === "wings") {
if (L < 3)
p = L === 1 ? 0 : 1;
else {
var side = L % 2, last = -1;
for (var w = L - 1; w >= 1; w--)
if ((S.rooms[w].wing | 0) === side) {
last = w;
break;
}
p = last > 0 ? last : 1;
}
}
else
p = dmkInt(R, 0, L - 1);
var dims = dmkRoomDims(R, k, cave), n = { x: 0, z: 0, w: dims[0], l: dims[1], k: k };
if (shape === "wings" && L >= 2)
n.wing = L % 2;
var dirs = dmkShuffle(R, ["N", "E", "W", "S"]);
if (shape === "winding" || shape === "wings")
dirs = R() < 0.6 ? ["N"].concat(dirs.filter(function (x) { return x !== "N"; })) : dirs;
var placed = null;
for (var di = 0; di < dirs.length && !placed; di++)
placed = dmkPlace(S, p, n, dirs[di], R);
if (!placed)
continue;
S.rooms.push(placed);
S.links.push([p, S.rooms.length - 1]);
}
if (shape === "maze" || shape === "cavern" || shape === "wings") {
var want = shape === "wings" ? 3 : Math.ceil(S.rooms.length / 4);
for (var a = 1; a < S.rooms.length && want > 0; a++)
for (var b = a + 1; b < S.rooms.length && want > 0; b++) {
if (S.links.some(function (L) { return (L[0] === a && L[1] === b) || (L[0] === b && L[1] === a); }))
continue;
var A = S.rooms[a], B = S.rooms[b], gap = Math.max(B.x - (A.x + A.w), A.x - (B.x + B.w), B.z - (A.z + A.l), A.z - (B.z + B.l));
if (gap < 2 || gap > 7)
continue;
S.links.push([a, b]);
if (dmkCheck(S)) {
S.links.pop();
continue;
}
if (R() < 0.75)
want--;
else {
S.links.pop();
}
}
}
dmkAssign(S, R);
return S;
},
function (S, R) {
var opt = S.opt, d = dmkDepths(S), n = S.rooms.length, i;
var far = 0;
for (i = 1; i < n; i++)
if ((d[i] || 0) > (d[far] || 0))
far = i;
if (opt.boss && opt.boss.on && n > 1) {
var r = S.rooms[far], keep = { x: r.x, z: r.z, w: r.w, l: r.l };
for (var grow = 5; grow >= 0; grow--) {
r.x = keep.x - Math.floor(grow / 2);
r.z = keep.z - Math.floor(grow / 2);
r.w = keep.w + grow;
r.l = keep.l + grow;
if (!dmkCheck(S))
break;
r.x = keep.x;
r.z = keep.z;
r.w = keep.w;
r.l = keep.l;
}
r.k = "boss";
}
if (opt.secret && n > 4) {
var leaves = [];
for (i = 1; i < n; i++)
if (dmkDegree(S, i) === 1 && S.rooms[i].k !== "boss")
leaves.push(i);
if (leaves.length) {
var sr = leaves[dmkInt(R, 0, leaves.length - 1)];
S.rooms[sr].k = "secret";
}
}
var free = [];
for (i = 1; i < n; i++)
if (["boss", "secret", "hall"].indexOf(S.rooms[i].k) < 0)
free.push(i);
dmkShuffle(R, free);
var tn = Math.max(1, Math.round(n / 9 * dmkPick(DMK_LOOT, opt.loot).m));
free.slice(0, tn).forEach(function (k) { S.rooms[k].k = "treasure"; });
free = free.slice(tn);
var puz = (opt.puzzles || []).slice(), pn = Math.min(puz.length ? (opt.puzN | 0) : 0, free.length);
var deep = free.filter(function (k) { return S.links.some(function (L) { return L[0] === k && (d[L[1]] || 0) > (d[k] || 0); }); });
for (i = 0; i < pn && deep.length; i++) {
var pr = deep.shift();
free.splice(free.indexOf(pr), 1);
S.rooms[pr].k = "puzzle";
S.rooms[pr].puz = puz[i % puz.length];
}
var often = dmkPick(DMK_OFTEN, opt.often).m, traps = opt.traps || [];
if (traps.length && often > 0)
free.forEach(function (k) { if (R() < often) {
var rr = S.rooms[k];
if (R() < 0.35 && rr.k === "chamber")
rr.k = "trap";
rr.trap = traps[dmkInt(R, 0, traps.length - 1)];
} });
S.rooms.forEach(function (rr, k) { rr.mobs = dmkMobsFor(S, rr, R); });
},
function (S, r, R) {
var K = dmkKind(r.k);
if (K.safe || K.boss || K.hidden)
return 0;
var area = r.w * r.l * DMK_CELL * DMK_CELL, base = area / 70, m = dmkPick(DMK_MANY, S.opt.many).m * Math.sqrt(dmkPick(DMK_PARTY, S.opt.party).mul);
if (K.den)
base *= 1.7;
if (r.k === "treasure" || r.k === "puzzle")
base *= 0.6;
var n = Math.round(base * m * (0.75 + (R ? R() : 0.5) * 0.5));
return Math.max(r.k === "chamber" || K.den ? 1 : 0, Math.min(12, n));
},
function (fn, i) {
var S = DMK.edit;
if (!S)
return "Build a dungeon first.";
if (i !== undefined && !S.rooms[i])
return "Choose a room on the map first.";
var before = JSON.stringify(S), why = fn(S) || dmkCheck(S);
if (why) {
DMK.edit = JSON.parse(before);
return why;
}
DMK.undo.push(before);
if (DMK.undo.length > 40)
DMK.undo.shift();
S.made = Date.now();
return "";
},
function (i, d, k) {
return dmkTry(function (S) {
var R = dmkRng(Date.now()), dims = dmkRoomDims(R, k || "chamber", S.opt.shape === "cavern"), n = { x: 0, z: 0, w: dims[0], l: dims[1], k: k || "chamber" };
if (S.rooms.length >= 40)
return "Forty rooms is the most a dungeon can hold.";
var p = dmkPlace(S, i, n, d, R);
if (!p)
return "There is no room on that side. Try another side, or make a room nearby smaller.";
S.rooms.push(p);
S.links.push([i, S.rooms.length - 1]);
p.mobs = dmkMobsFor(S, p, R);
return "";
}, i);
},
function (i) {
return dmkTry(function (S) {
if (i === 0)
return "The way in stays.";
var lk = S.links.filter(function (L) { return L[0] === i || L[1] === i; });
S.links = S.links.filter(function (L) { return !(L[0] === i || L[1] === i); });
S.rooms.splice(i, 1);
S.links = S.links.map(function (L) { return [L[0] > i ? L[0] - 1 : L[0], L[1] > i ? L[1] - 1 : L[1]]; });
var why = dmkCheck(S);
if (why)
return "Taking it away would cut off other rooms. Take away the rooms beyond it first.";
return "";
}, i);
},
function (i, dw, dl) {
return dmkTry(function (S) {
var r = S.rooms[i];
if (i === 0)
return "The way in keeps its size.";
var w = r.w + dw, l = r.l + dl;
if (w < 4 || l < 4)
return "That is as small as a room goes.";
if (w > 22 || l > 22)
return "That is as big as a room goes.";
r.x -= Math.round(dw / 2);
r.z -= Math.round(dl / 2);
r.w = w;
r.l = l;
r.mobs = Math.min(12, r.mobs == null ? 0 : r.mobs);
return "";
}, i);
},
function (i, k) {
return dmkTry(function (S) {
var r = S.rooms[i];
if (i === 0 && k !== "entry")
return "The way in stays the way in.";
if (k === "entry" && i !== 0)
return "There is one way in.";
if (k === "boss")
S.rooms.forEach(function (o) { if (o.k === "boss")
o.k = "chamber"; });
r.k = k;
if (k === "puzzle" && !r.puz)
r.puz = (S.opt.puzzles && S.opt.puzzles[0]) || "levers";
if (k !== "puzzle")
delete r.puz;
if (dmkKind(k).safe || dmkKind(k).boss)
r.mobs = 0;
else if (!r.mobs)
r.mobs = dmkMobsFor(S, r, Math.random);
return "";
}, i);
},
function (a, b) {
if (!DMK.edit || !DMK.edit.rooms[a] || !DMK.edit.rooms[b])
return "Choose two rooms.";
return dmkTry(function (S) {
if (a === b)
return "Choose another room.";
if (S.links.some(function (L) { return (L[0] === a && L[1] === b) || (L[0] === b && L[1] === a); }))
return "They are joined already.";
S.links.push([a, b]);
return "";
});
},
function (S) {
var F = {}, A = [], key = function (x, z) { return x + "," + z; };
S.rooms.forEach(function (r, i) { A.push({ room: i, r: r, h: dmkRoomH(r) }); for (var x = r.x; x < r.x + r.w; x++)
for (var z = r.z; z < r.z + r.l; z++)
F[key(x, z)] = i; });
S.links.forEach(function (L, li) {
var C = dmkCorr(S.rooms[L[0]], S.rooms[L[1]]) || [];
var id = A.length;
A.push({ link: li, rects: C, h: 4.6 });
C.forEach(function (c) { for (var x = c.x; x < c.x + c.w; x++)
for (var z = c.z; z < c.z + c.l; z++) {
var k = key(x, z);
if (F[k] === undefined)
F[k] = id;
} });
});
return { F: F, A: A };
},
function (T, part) {
var lite = dmkLite(), hi = lite ? "" : "-1k";
var wallPic = { crypt: "maze/wall", temple: "photo/marble", dwarf: "photo/stone", spider: "maze/wall", frost: "photo/stone", fungal: "photo/earth", tomb: "photo/sand", ossuary: "maze/wall", cellar: "photo/brick", wizard: "maze/wall", forge: "photo/slate", ruin: "maze/wall", clock: "photo/brick", smuggler: "photo/stone" }[T.k] || "maze/wall";
var floorPic = { crypt: "photo/paving", temple: "photo/marble", dwarf: "photo/paving", spider: "photo/earth", frost: "photo/slate", fungal: "photo/earth", tomb: "photo/sand", ossuary: "photo/paving", cellar: "photo/brick", wizard: "photo/floortile", forge: "photo/slate", ruin: "maze/floor", clock: "photo/metal", smuggler: "photo/sand" }[T.k] || "maze/floor";
var pic = part === "wall" ? wallPic : part === "floor" ? floorPic : "photo/concrete";
var url = "assets/textures/" + pic + (pic.indexOf("maze/") === 0 ? (lite ? "" : "-1k") : hi) + ".jpg";
var nrm = null;
if (pic.indexOf("maze/") === 0)
nrm = "assets/textures/" + pic + "-n.jpg";
else {
var nk = { stone: "stone", brick: "brick", slate: "slate", paving: "paving" }[pic.split("/")[1]];
if (nk)
nrm = "assets/textures/pbr/" + nk + "-nr" + (lite ? "" : "-1k") + ".jpg";
}
return { map: dmkTexLoad(url), nrm: (nrm && !lite) ? dmkTexLoad(nrm) : null };
},
function (col, o) {
o = o || {};
var m = new THREE.MeshStandardMaterial({ color: col, roughness: o.r !== undefined ? o.r : 0.85, metalness: o.m || 0 });
if (o.map)
m.map = o.map;
if (o.nrm) {
m.normalMap = o.nrm;
m.normalScale = new THREE.Vector2(o.ns || 0.9, o.ns || 0.9);
}
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = !!o.dw;
}
if (o.side)
m.side = THREE.DoubleSide;
return m;
},
function (B, x0, x1, y0, y1, z0, z1, tile) {
tile = tile || 4;
var faces = [
[[1, 0, 0], [[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], "zy"], [[-1, 0, 0], [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], "zy"],
[[0, 1, 0], [[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], "xz"], [[0, -1, 0], [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], "xz"],
[[0, 0, 1], [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], "xy"], [[0, 0, -1], [[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], "xy"]
];
faces.forEach(function (f) {
var n = f[0], V = f[1], base = B.c;
V.forEach(function (v) {
B.p.push(v[0], v[1], v[2]);
B.n.push(n[0], n[1], n[2]);
var u = f[2] === "zy" ? v[2] : v[0], w = f[2] === "xz" ? v[2] : v[1];
B.u.push(u / tile, w / tile);
B.c++;
});
B.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
});
},
function (B, mat, G) {
if (!B.c)
return null;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(B.p, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(B.n, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(B.u, 2));
g.setIndex(B.i);
g.computeBoundingSphere();
var m = new THREE.Mesh(g, mat);
G.add(m);
return m;
},
function (G, S) {
var T = dmkTheme(S.opt.theme), lite = dmkLite(), C = DMK_CELL, FL = dmkFloor(S), F = FL.F, A = FL.A;
DMKW.R = [];
DMKW.gates = [];
DMKW.chests = [];
DMKW.traps = [];
DMKW.puz = [];
DMKW.props = [];
DMKW.torches = [];
DMKW.lights = [];
DMKW.spec = S;
DMKW.floor = FL;
DMKW.rooms = [];
DMKW.key = null;
DMKW.secret = [];
DMKW.books = [];
DMKW.anim = [];
DMKW.th = { spin: [], bob: [], swing: [] };
var stoneW = dmkStone(T, "wall"), stoneF = dmkStone(T, "floor"), tint = new THREE.Color(T.stone), tintF = new THREE.Color(T.floor);
var wallMat = dmkMat("wall", function () { return dmkStd(tint.clone().lerp(new THREE.Color(0xFFFFFF), 0.35).getHex(), { map: stoneW.map, nrm: stoneW.nrm, r: 0.92 }); });
var floorMat = dmkMat("floor", function () { return dmkStd(tintF.clone().lerp(new THREE.Color(0xFFFFFF), 0.3).getHex(), { map: stoneF.map, nrm: stoneF.nrm, r: 0.9 }); });
var ceilMat = dmkMat("ceil", function () { return dmkStd(tint.clone().multiplyScalar(0.5).getHex(), { map: stoneW.map, r: 1 }); });
var trimMat = dmkMat("trim", function () { return dmkStd(tint.clone().multiplyScalar(1.15).getHex(), { map: stoneW.map, nrm: stoneW.nrm, r: 0.8 }); });
var Bw = dmkBoxes(), Bf = dmkBoxes(), Bc = dmkBoxes(), Bt = dmkBoxes();
function areaAt(x, z) { var k = F[x + "," + z]; return k === undefined ? null : A[k]; }
S.rooms.forEach(function (r, i) {
var h = A[i].h;
dmkBoxAdd(Bf, r.x * C, (r.x + r.w) * C, -0.3, 0, r.z * C, (r.z + r.l) * C, 4);
dmkBoxAdd(Bc, r.x * C, (r.x + r.w) * C, h, h + 0.5, r.z * C, (r.z + r.l) * C, 5);
if (!T.cave) {
var t = 0.35;
dmkBoxAdd(Bt, r.x * C, (r.x + r.w) * C, h - 0.45, h, r.z * C, r.z * C + t, 3);
dmkBoxAdd(Bt, r.x * C, (r.x + r.w) * C, h - 0.45, h, (r.z + r.l) * C - t, (r.z + r.l) * C, 3);
dmkBoxAdd(Bt, r.x * C, r.x * C + t, h - 0.45, h, r.z * C, (r.z + r.l) * C, 3);
dmkBoxAdd(Bt, (r.x + r.w) * C - t, (r.x + r.w) * C, h - 0.45, h, r.z * C, (r.z + r.l) * C, 3);
}
DMKW.rooms.push({ i: i, r: r, x0: r.x * C, x1: (r.x + r.w) * C, z0: r.z * C, z1: (r.z + r.l) * C, cx: (r.x + r.w / 2) * C, cz: (r.z + r.l / 2) * C, h: h, spawned: false, mobs: [], seen: false });
});
A.forEach(function (a) { if (!a.rects)
return; a.rects.forEach(function (c) { dmkBoxAdd(Bf, c.x * C, (c.x + c.w) * C, -0.3, 0, c.z * C, (c.z + c.l) * C, 4); dmkBoxAdd(Bc, c.x * C, (c.x + c.w) * C, a.h, a.h + 0.5, c.z * C, (c.z + c.l) * C, 5); }); });
var keys = Object.keys(F), wt = 0.5;
keys.forEach(function (k) {
var p = k.split(","), x = +p[0], z = +p[1], me = A[F[k]];
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
var o = areaAt(x + d[0], z + d[1]);
var y0 = 0, y1 = me.h;
if (o) {
if (o.h >= me.h - 0.01)
return;
y0 = o.h;
}
if (y1 - y0 < 0.05)
return;
var ex = d[0] > 0 ? (x + 1) * C : d[0] < 0 ? x * C : 0, ez = d[1] > 0 ? (z + 1) * C : d[1] < 0 ? z * C : 0;
if (d[0])
dmkBoxAdd(Bw, d[0] > 0 ? ex : ex - wt, d[0] > 0 ? ex + wt : ex, y0, y1, z * C - (o ? 0 : 0.02), (z + 1) * C + (o ? 0 : 0.02), 4);
else
dmkBoxAdd(Bw, x * C - (o ? 0 : 0.02), (x + 1) * C + (o ? 0 : 0.02), y0, y1, d[1] > 0 ? ez : ez - wt, d[1] > 0 ? ez + wt : ez, 4);
});
});
dmkBoxMesh(Bw, wallMat, G);
dmkBoxMesh(Bf, floorMat, G);
dmkBoxMesh(Bc, ceilMat, G);
dmkBoxMesh(Bt, trimMat, G);
if (T.cave)
dmkCaveRock(G, S, T, F, A);
dmkArches(G, S, T, F, A, trimMat);
var e = S.rooms[0], ex0 = (e.x + e.w / 2) * C, ez1 = (e.z + e.l) * C;
for (var s = 0; s < 8; s++)
wBox(4.2, 0.36 * (s + 1), 0.55, trimMat, ex0, 0.18 * (s + 1), ez1 - 0.3 - s * 0.5, G);
var sg = wSign([S.opt.name || "A dreamer's dungeon", "↑ E: climb back up"], 5, 1.25, "#1A1612", "#E8D8A8");
sg.position.set(ex0, 5.2, ez1 - 0.12);
sg.rotation.y = Math.PI;
G.add(sg);
DMKW.stair = { x: ex0, z: ez1 - 2.2 };
for (var q = 0; q < 8; q++)
DMKW.R.push({ x: ex0 - 1.6 + q * 0.45, z: ez1 - 1.2, r: 0.4 });
dmkLights(G, S, T);
S.rooms.forEach(function (r, i) { try {
dmkDress(G, S, T, i);
}
catch (err) {
if (window.console)
console.warn("dungeon room", i, err);
} });
dmkGates(G, S, T, F, A, trimMat, wallMat);
if (typeof dmkTrapsBuild === "function")
dmkTrapsBuild(G, S, T);
if (typeof dmkPuzBuild === "function")
dmkPuzBuild(G, S, T);
},
function (G, S, T, F, A, mat) {
var C = DMK_CELL, lite = dmkLite(), Ba = dmkBoxes();
function sb(w, h, d, x, y, z) { dmkBoxAdd(Ba, x - w / 2, x + w / 2, y - h / 2, y + h / 2, z - d / 2, z + d / 2, 2.5); }
S.links.forEach(function (L) {
var Cr = dmkCorr(S.rooms[L[0]], S.rooms[L[1]]) || [];
[L[0], L[1]].forEach(function (ri) {
var r = S.rooms[ri];
Cr.forEach(function (c) {
var h = 4.6, vert = c.w === 2 && c.l !== 2 ? true : (c.l === 2 && c.w !== 2 ? false : null);
if (vert === null)
vert = c.w <= c.l;
if (vert && !(c.x < r.x + r.w && c.x + c.w > r.x))
return;
if (!vert && !(c.z < r.z + r.l && c.z + c.l > r.z))
return;
if (vert) {
var zt = c.z === r.z + r.l ? c.z : (c.z + c.l === r.z ? c.z + c.l : null);
if (zt === null)
return;
var x0 = c.x * C, x1 = (c.x + c.w) * C, zz = zt * C;
sb(0.55, h, 0.9, x0 - 0.27, h / 2, zz);
sb(0.55, h, 0.9, x1 + 0.27, h / 2, zz);
sb(x1 - x0 + 1.1, 0.7, 0.9, (x0 + x1) / 2, h + 0.35, zz);
DMKW.R.push({ x: x0 - 0.27, z: zz, r: 0.3 }, { x: x1 + 0.27, z: zz, r: 0.3 });
}
else {
var xt = c.x === r.x + r.w ? c.x : (c.x + c.w === r.x ? c.x + c.w : null);
if (xt === null)
return;
var z0 = c.z * C, z1 = (c.z + c.l) * C, xx = xt * C;
sb(0.9, h, 0.55, xx, h / 2, z0 - 0.27);
sb(0.9, h, 0.55, xx, h / 2, z1 + 0.27);
sb(0.9, 0.7, z1 - z0 + 1.1, xx, h + 0.35, (z0 + z1) / 2);
DMKW.R.push({ x: xx, z: z0 - 0.27, r: 0.3 }, { x: xx, z: z1 + 0.27, r: 0.3 });
}
});
});
});
dmkBoxMesh(Ba, mat, G);
},
function (G, S, T, F, A) {
var C = DMK_CELL, R = wRand(S.seed * 3 + 7), lite = dmkLite(), rock = dmkMat("rock", function () { var st = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).multiplyScalar(0.9).getHex(), { map: st.map, nrm: st.nrm, r: 0.95 }); });
var geo = new THREE.DodecahedronGeometry(1, lite ? 0 : 1);
S.rooms.forEach(function (r) {
var per = Math.min(lite ? 8 : 18, Math.round((r.w + r.l) * 0.8));
for (var i = 0; i < per; i++) {
var side = Math.floor(R() * 4), t = R(), x, z;
if (side < 2) {
x = (r.x + t * r.w) * C;
z = side === 0 ? r.z * C + 0.4 : (r.z + r.l) * C - 0.4;
}
else {
z = (r.z + t * r.l) * C;
x = side === 2 ? r.x * C + 0.4 : (r.x + r.w) * C - 0.4;
}
var cx = Math.floor(x / C), cz = Math.floor(z / C), clear = true;
[[0, 1], [0, -1], [1, 0], [-1, 0], [0, 0]].forEach(function (d) { var k = (cx + d[0]) + "," + (cz + d[1]); var a = F[k]; if (a !== undefined && A[a] && A[a].link !== undefined)
clear = false; });
if (!clear)
continue;
var s = 0.7 + R() * 1.3, m = new THREE.Mesh(geo, rock);
m.position.set(x, s * 0.4, z);
m.scale.set(s * (0.8 + R() * 0.6), s * (0.6 + R() * 0.8), s * (0.8 + R() * 0.6));
m.rotation.set(R() * 3, R() * 3, R() * 3);
G.add(m);
DMKW.R.push({ x: x, z: z, r: s * 0.7 });
if (R() < 0.4) {
var st = new THREE.Mesh(new THREE.ConeGeometry(0.3 + R() * 0.4, 1 + R() * 2.2, lite ? 5 : 7), rock);
st.rotation.x = Math.PI;
st.position.set(x + (R() - 0.5) * 2, dmkRoomH(r) - 0.8, z + (R() - 0.5) * 2);
G.add(st);
}
}
});
},
function (G, S, T) {
var Lc = dmkPick(DMK_LIGHT, S.opt.light), lite = dmkLite();
var hm = new THREE.HemisphereLight(0x8890A8, 0x201814, Lc.amb);
G.add(hm);
var n = lite ? 3 : 6;
for (var i = 0; i < n; i++) {
var pl = new THREE.PointLight(T.light, Lc.pt * 1.2, lite ? 26 : 30, 1.7);
pl.position.set(0, -50, 0);
G.add(pl);
DMKW.lights.push(pl);
}
if (Lc.lantern) {
var lt = new THREE.PointLight(0xFFD8A0, 1.2, 16, 1.6);
G.add(lt);
DMKW.lantern = lt;
}
},
function (lx, lz) {
var Ts = DMKW.torches, Ls = DMKW.lights;
if (!Ls.length)
return;
if (!DMKW.lt || DMKW.lt++ > 8) {
DMKW.lt = 1;
var near = Ts.map(function (t) { return [Math.hypot(t.x - lx, t.z - lz), t]; }).sort(function (a, b) { return a[0] - b[0]; }).slice(0, Ls.length);
Ls.forEach(function (L, i) { var t = near[i] && near[i][1]; if (t) {
L.position.set(t.x, t.y, t.z);
if (t.col !== undefined)
L.color.setHex(t.col);
}
else
L.position.set(0, -50, 0); });
}
if (DMKW.lantern)
DMKW.lantern.position.set(lx, 2.1, lz);
},
function (G, S, T, F, A, trim, wall) {
var C = DMK_CELL, d = dmkDepths(S), iron = dmkMat("iron", function () { return dmkStd(0x2E2A28, { m: 0.75, r: 0.45 }); });
S.links.forEach(function (L, li) {
var a = L[0], b = L[1], ra = S.rooms[a], rb = S.rooms[b], from, to;
if ((d[a] || 0) <= (d[b] || 0)) {
from = a;
to = b;
}
else {
from = b;
to = a;
}
var rf = S.rooms[from], rt = S.rooms[to], kind = null;
if (rt.k === "secret")
kind = "secret";
else if (rf.k === "puzzle")
kind = "puzzle";
else if (rt.k === "boss" && rt.lock)
kind = "lock";
else if (rt.lock)
kind = "lock";
if (!kind)
return;
var Cr = dmkCorr(ra, rb);
if (!Cr)
return;
var c = Cr[0], cells = [], gx, gz, vert = c.w <= c.l;
var nearRoom = S.rooms[from];
if (Cr.length > 1 && !(c.z === nearRoom.z + nearRoom.l || c.z + c.l === nearRoom.z || c.x === nearRoom.x + nearRoom.w || c.x + c.w === nearRoom.x))
c = Cr[1];
if (vert) {
var zz = c.z === nearRoom.z + nearRoom.l ? c.z : c.z + c.l - 1;
for (var x = c.x; x < c.x + c.w; x++)
cells.push([x, zz]);
gx = (c.x + c.w / 2) * C;
gz = (zz + (c.z === nearRoom.z + nearRoom.l ? 0.15 : 0.85)) * C;
}
else {
var xx = c.x === nearRoom.x + nearRoom.w ? c.x : c.x + c.w - 1;
for (var z = c.z; z < c.z + c.l; z++)
cells.push([xx, z]);
gx = (xx + (c.x === nearRoom.x + nearRoom.w ? 0.15 : 0.85)) * C;
gz = (c.z + c.l / 2) * C;
}
var g = new THREE.Group();
g.position.set(gx, 0, gz);
if (!vert)
g.rotation.y = Math.PI / 2;
G.add(g);
var W = c.w <= c.l ? c.w * C : c.l * C;
if (kind === "secret") {
wBox(W, 4.6, 0.5, wall, 0, 2.3, 0, g);
var away = vert ? c.z === nearRoom.z + nearRoom.l : c.x === nearRoom.x + nearRoom.w;
var ls = wBox(0.6, 0.35, 0.3, trim, 0.6, 1.3, away ? -0.3 : 0.3, g);
ls.userData.loose = 1;
}
else {
for (var i = 0; i <= Math.round(W / 0.32); i++) {
wBox(0.07, 4.4, 0.07, iron, -W / 2 + i * 0.32, 2.2, 0, g);
wCone(0.06, 0.2, iron, -W / 2 + i * 0.32, 0.05, 0, g, 4);
}
for (var j = 0; j < 5; j++)
wBox(W, 0.08, 0.08, iron, 0, 0.4 + j * 0.95, 0, g);
if (kind === "lock") {
var lk = wBox(0.4, 0.5, 0.2, dmkMat("brass", function () { return dmkStd(0xB8903A, { m: 0.85, r: 0.35 }); }), 0, 1.2, 0.12, g);
}
}
DMKW.gates.push({ li: li, kind: kind, cells: cells, g: g, open: false, from: from, to: to, t: 0, x: gx, z: gz, room: from });
});
},
function (S, i) {
var r = S.rooms[i], C = DMK_CELL, F = DMKW.floor.F, A = DMKW.floor.A, wall = [], mid = [];
function mouth(x, z) { for (var dx = -2; dx <= 2; dx++)
for (var dz = -2; dz <= 2; dz++) {
var a = F[(x + dx) + "," + (z + dz)];
if (a !== undefined && A[a].link !== undefined)
return true;
} return false; }
for (var x = r.x; x < r.x + r.w; x++) {
if (!mouth(x, r.z))
wall.push({ x: (x + 0.5) * C, z: r.z * C + 0.75, a: 0 });
if (!mouth(x, r.z + r.l - 1) && !(i === 0))
wall.push({ x: (x + 0.5) * C, z: (r.z + r.l) * C - 0.75, a: Math.PI });
}
for (var z = r.z; z < r.z + r.l; z++) {
if (!mouth(r.x, z))
wall.push({ x: r.x * C + 0.75, z: (z + 0.5) * C, a: Math.PI / 2 });
if (!mouth(r.x + r.w - 1, z))
wall.push({ x: (r.x + r.w) * C - 0.75, z: (z + 0.5) * C, a: -Math.PI / 2 });
}
for (var mx = r.x + 2; mx < r.x + r.w - 2; mx += 2)
for (var mz = r.z + 2; mz < r.z + r.l - 2; mz += 2)
mid.push({ x: (mx + 1) * C, z: (mz + 1) * C, a: 0 });
if (i === 0) {
var sx = DMKW.stair.x, sz = DMKW.stair.z;
wall = wall.filter(function (p) { return Math.hypot(p.x - sx, p.z - sz) > 5; });
mid = mid.filter(function (p) { return Math.hypot(p.x - sx, p.z - sz) > 6.5; });
}
var R = wRand((S.seed * 31 + i * 977) >>> 0);
dmkShuffle(R, wall);
dmkShuffle(R, mid);
return { wall: wall, mid: mid, R: R };
},
function (G, x, y, z, a, col, crystal) {
var lite = dmkLite(), iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = a;
G.add(g);
if (crystal) {
var cm = dmkM("crystal", col, { e: col, ei: 0.9, r: 0.2, op: 0.85 });
for (var i = 0; i < 3; i++) {
var c = dmkMesh(dmkGeo("cry", function () { return new THREE.OctahedronGeometry(0.22, 0); }), cm, (i - 1) * 0.18, 0.1 * i, 0.15, g);
c.scale.set(0.6, 1.8 + i * 0.3, 0.6);
c.rotation.z = (i - 1) * 0.4;
}
}
else {
wBox(0.08, 0.08, 0.4, iron, 0, 0, 0.2, g);
var h = wCyl(0.07, 0.05, 0.5, dmkWood(), 0, 0.2, 0.4, g, 6);
h.rotation.x = -0.3;
var fl = dmkMesh(dmkGeo("flame", function () { return new THREE.ConeGeometry(0.11, 0.34, 7); }), dmkM("flame", 0xFFC070, { e: 0xFF8A30, ei: 1.6 }), 0, 0.58, 0.47, g);
DMKW.anim.push({ m: fl, k: "flame", p: Math.random() * 6 });
}
var gl = wGlow(col, crystal ? 2.2 : 2.6, crystal ? 0.35 : 0.5);
gl.position.set(0, 0.6, 0.45);
g.add(gl);
var wp = new THREE.Vector3(0, 0.7, 0.8).applyAxisAngle(new THREE.Vector3(0, 1, 0), a);
DMKW.torches.push({ x: x + wp.x, y: y + wp.y, z: z + wp.z, col: col });
},
function (G, S, T, i) {
var r = S.rooms[i], K = dmkKind(r.k), lite = dmkLite(), C = DMK_CELL, sp = dmkSpots(S, i), R = sp.R, Lc = dmkPick(DMK_LIGHT, S.opt.light);
var dens = dmkPick(DMK_DECOR, r.decor || S.opt.decor).m * (lite ? 0.6 : 1);
var area = r.w * r.l, h = dmkRoomH(r);
function takeWall() { return sp.wall.shift() || null; }
function takeMid() { return sp.mid.shift() || null; }
var nT = Math.max(2, Math.round(area / (Lc.k === "dim" || Lc.k === "dark" ? 60 : 30)));
if (lite)
nT = Math.min(nT, 4);
for (var t = 0; t < nT; t++) {
var p = takeWall();
if (!p)
break;
dmkTorch(G, p.x - Math.sin(p.a) * 0.45, 2.6, p.z - Math.cos(p.a) * 0.45, p.a, T.light, !!Lc.crystal);
}
if (Lc.k === "fire") {
var fb = takeMid();
if (fb)
dmkProp.brazier(G, fb, T, R);
}
var sets = (r.sets && r.sets.length ? r.sets : null) || K.sets.concat((S.opt.sets || T.sets).filter(function (s) { return K.sets.indexOf(s) < 0; }).slice(0, K.sets.length ? 2 : 4));
if (r.sets && r.sets.length)
sets = r.sets;
if (K.k === "crypt" || (K.k === "chamber" && T.k === "crypt"))
for (var c = 0; c < Math.min(lite ? 2 : 4, Math.round(area / 25)); c++) {
var cp = takeMid() || takeWall();
if (cp)
dmkProp.coffin(G, cp, T, R);
}
if (K.k === "throne" || K.boss) {
var tp = { x: (r.x + r.w / 2) * C, z: r.z * C + 2.2, a: 0 };
dmkProp.throne(G, tp, T, R);
}
if (K.k === "shrine") {
var sh = { x: (r.x + r.w / 2) * C, z: (r.z + r.l / 2) * C, a: 0 };
dmkProp.altar(G, sh, T, R);
sp.mid = sp.mid.filter(function (q) { return Math.hypot(q.x - sh.x, q.z - sh.z) > 3; });
}
if (K.k === "library")
for (var b = 0; b < Math.round(area / 14 * dens); b++) {
var bp = takeWall();
if (bp)
dmkProp.books(G, bp, T, R);
}
if (K.k === "armoury")
for (var a2 = 0; a2 < Math.round(area / 18 * dens); a2++) {
var ap = takeWall();
if (ap)
dmkProp.racks(G, ap, T, R);
}
if (K.k === "barracks")
for (var bb = 0; bb < Math.round(area / 16 * dens); bb++) {
var bp2 = takeWall();
if (bp2)
dmkProp.bed(G, bp2, T, R);
}
if (K.k === "prison")
for (var pc = 0; pc < Math.round(area / 20 * dens) + 1; pc++) {
var pp = takeWall();
if (pp)
dmkProp.cages(G, pp, T, R);
}
var n = Math.round(area / 9 * dens);
for (var k = 0; k < n; k++) {
var s = sets[k % sets.length];
if (!s || !dmkProp[s])
continue;
var onWall = { banners: 1, books: 1, racks: 1, tapestry: 1, chains: 1, barrels: 1, statues: 1, candles: 1, cages: 1 }[s], spot = onWall ? takeWall() : (R() < 0.7 ? takeMid() : takeWall());
if (!spot)
continue;
try {
dmkProp[s](G, spot, T, R, r);
}
catch (e) { }
}
var nc = (K.chest || 0) + (R() < 0.18 * dmkPick(DMK_LOOT, S.opt.loot).m && !K.safe ? 1 : 0);
if (r.chests !== undefined)
nc = r.chests | 0;
for (var q = 0; q < nc; q++) {
var chp = takeWall();
if (chp)
dmkChest(G, chp, S, i, R);
}
dmkThemeDress(G, S, T, i, sp);
if (K.boss) {
var dm = dmkMat("dais", function () { var st = dmkStone(T, "floor"); return dmkStd(new THREE.Color(T.stone).multiplyScalar(0.85).getHex(), { map: st.map, nrm: st.nrm, r: 0.6, m: 0.1 }); });
var bx = (r.x + r.w / 2) * C, bz = (r.z + r.l / 2) * C;
wCyl(Math.min(r.w, r.l) * 0.32, Math.min(r.w, r.l) * 0.34, 0.4, dm, bx, 0.2, bz, G, lite ? 16 : 32);
DMKW.bossAt = { x: bx, z: bz, r: Math.min(r.w, r.l) * 0.33, room: i };
}
},
function (G, p, T, R) {
var cols = [0x7A1A1A, 0x1A2A6A, 0x1A4A2A, 0x5A1A5A, 0x6A4A10];
var cl = dmkM("ban" + (p.x | 0) % 5, cols[Math.floor(R() * cols.length)], { r: 0.9, side: true });
var g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.5, 0, p.z - Math.cos(p.a) * 0.5);
g.rotation.y = p.a;
G.add(g);
wCyl(0.04, 0.04, 1.4, dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), 0, 5.2, 0.1, g, 6).rotation.z = Math.PI / 2;
var b = new THREE.Mesh(dmkGeo("banner", function () { var s = new THREE.Shape(); s.moveTo(-0.6, 0); s.lineTo(0.6, 0); s.lineTo(0.6, -2.6); s.lineTo(0, -2.1); s.lineTo(-0.6, -2.6); return new THREE.ShapeGeometry(s); }), cl);
b.position.set(0, 5.2, 0.12);
g.add(b);
var em = wSph(0.22, dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), 0, 4.3, 0.14, g, 8);
em.scale.z = 0.2;
},
function (G, p, T, R) {
var wax = dmkM("wax", 0xEDE4CC, { r: 0.7 }), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
G.add(g);
var iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 });
wCyl(0.04, 0.18, 1.5, iron, 0, 0.75, 0, g, 8);
wCyl(0.35, 0.35, 0.04, iron, 0, 1.5, 0, g, 10);
for (var i = 0; i < (dmkLite() ? 3 : 5); i++) {
var a = i / 5 * Math.PI * 2, hh = 0.15 + R() * 0.2;
wCyl(0.035, 0.035, hh, wax, Math.cos(a) * 0.25, 1.52 + hh / 2, Math.sin(a) * 0.25, g, 6);
var f = dmkMesh(dmkGeo("cflame", function () { return new THREE.ConeGeometry(0.03, 0.09, 5); }), dmkM("flame", 0xFFC070, { e: 0xFF8A30, ei: 1.6 }), Math.cos(a) * 0.25, 1.57 + hh, Math.sin(a) * 0.25, g);
}
var gl = wGlow(0xFFC880, 1.6, 0.45);
gl.position.set(0, 1.75, 0);
g.add(gl);
DMKW.torches.push({ x: p.x, y: 2, z: p.z, col: 0xFFC080 });
dmkSolid(p.x, p.z, 0.35);
},
function (G, p, T, R) {
var bone = dmkM("bone", 0xD8CCB0, { r: 0.75 });
for (var i = 0; i < (dmkLite() ? 4 : 9); i++) {
var b = wCyl(0.035, 0.045, 0.35 + R() * 0.3, bone, p.x + (R() - 0.5) * 1.6, 0.05, p.z + (R() - 0.5) * 1.6, G, 5);
b.rotation.set(Math.PI / 2, R() * 3, 0);
}
for (var j = 0; j < 2; j++) {
var s = dmkMesh(dmkGeo("skull", function () { var g = new THREE.SphereGeometry(0.13, 10, 8); g.scale(1, 0.9, 1.15); return g; }), bone, p.x + (R() - 0.5) * 1.2, 0.12, p.z + (R() - 0.5) * 1.2, G);
s.rotation.y = R() * 6;
}
},
function (G, p, T, R) {
var w = dmkWood(), hoop = dmkM("hoop", 0x3A3430, { m: 0.6, r: 0.5 });
var n = 1 + Math.floor(R() * 3);
for (var i = 0; i < n; i++) {
var x = p.x + (i - (n - 1) / 2) * 0.95 * Math.cos(p.a), z = p.z - (i - (n - 1) / 2) * 0.95 * Math.sin(p.a);
if (R() < 0.55) {
var b = dmkMesh(dmkGeo("barrel", function () { return new THREE.CylinderGeometry(0.4, 0.4, 1.0, dmkLite() ? 8 : 14); }), w, x, 0.5, z, G);
b.scale.set(1, 1, 1);
wCyl(0.43, 0.43, 0.05, hoop, x, 0.2, z, G, 12);
wCyl(0.43, 0.43, 0.05, hoop, x, 0.8, z, G, 12);
}
else {
var c = wBox(0.85, 0.75, 0.85, w, x, 0.375, z, G);
c.rotation.y = R() * 0.4;
if (R() < 0.4)
wBox(0.6, 0.5, 0.6, w, x, 1.0, z, G).rotation.y = R();
}
dmkSolid(x, z, 0.5);
}
},
function (G, p, T, R) {
var w = dmkWood(), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.05, 0, p.z - Math.cos(p.a) * 0.05);
g.rotation.y = p.a;
G.add(g);
wBox(1.8, 3.0, 0.08, w, 0, 1.5, -0.3, g);
wBox(0.08, 3.0, 0.6, w, -0.9, 1.5, 0, g);
wBox(0.08, 3.0, 0.6, w, 0.9, 1.5, 0, g);
var cols = [0x6A1A1A, 0x1A3A5A, 0x2A4A2A, 0x5A4A2A, 0x3A1A3A, 0x8A6A3A];
for (var s = 0; s < 5; s++) {
wBox(1.8, 0.06, 0.6, w, 0, 0.1 + s * 0.7, 0, g);
var x = -0.82;
while (x < 0.78) {
var bw = 0.05 + R() * 0.07, bh = 0.38 + R() * 0.2;
wBox(bw, bh, 0.38, dmkM("bk" + (s % 6), cols[(s + Math.floor(x * 10)) & 3 ? (Math.floor(R() * 6)) : 0], { r: 0.85 }), x + bw / 2, 0.13 + s * 0.7 + bh / 2, 0.02, g);
x += bw + 0.01;
if (dmkLite() && R() < 0.3)
x += 0.12;
}
}
dmkSolid(p.x, p.z, 0.95);
if (DMKW.books)
DMKW.books.push({ x: p.x + Math.sin(p.a) * 0.9, z: p.z + Math.cos(p.a) * 0.9, done: false });
},
function (G, p, T, R) {
var st = dmkMat("statue", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).lerp(new THREE.Color(0xFFFFFF), 0.4).getHex(), { map: s.map, nrm: s.nrm, r: 0.7 }); });
var g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.2, 0, p.z - Math.cos(p.a) * 0.2);
g.rotation.y = p.a;
G.add(g);
wBox(1.1, 0.9, 1.1, st, 0, 0.45, 0, g);
var robe = dmkMesh(dmkGeo("robe", function () { return new THREE.LatheGeometry([new THREE.Vector2(0.45, 0), new THREE.Vector2(0.4, 0.5), new THREE.Vector2(0.3, 1.2), new THREE.Vector2(0.24, 1.7), new THREE.Vector2(0.27, 1.85), new THREE.Vector2(0, 1.9)], dmkLite() ? 8 : 16); }), st, 0, 0.9, 0, g);
var hd = dmkMesh(dmkGeo("shead", function () { return new THREE.SphereGeometry(0.17, 12, 10); }), st, 0, 3.0, 0, g);
hd.scale.set(1, 1.15, 1);
var arm = wCyl(0.07, 0.07, 0.8, st, 0.28, 2.35, 0.15, g, 6);
arm.rotation.x = -0.9;
var arm2 = wCyl(0.07, 0.07, 0.8, st, -0.28, 2.35, 0.15, g, 6);
arm2.rotation.x = -0.9;
if (R() < 0.5) {
var sw = wBox(0.08, 1.4, 0.04, st, 0, 2.0, 0.55, g);
}
dmkSolid(p.x, p.z, 0.75);
},
function (G, p, T, R) {
var gm = dmkM("gold", 0xD8A838, { m: 0.9, r: 0.28 }), lite = dmkLite();
var hp = dmkMesh(dmkGeo("heap2", function () {
var q = new THREE.SphereGeometry(0.9, lite ? 12 : 22, lite ? 6 : 10, 0, Math.PI * 2, 0, Math.PI / 2), v = q.attributes.position, rr = wRand(91);
for (var i = 0; i < v.count; i++) {
var y = v.getY(i), n = 1 + (rr() - 0.5) * 0.22;
v.setXYZ(i, v.getX(i) * n, y * (0.55 + (rr() - 0.5) * 0.12), v.getZ(i) * n);
}
q.computeVertexNormals();
return q;
}), dmkMat("goldheap", function () { return dmkStd(0xD8A838, { m: 0.9, r: 0.35, nrm: dmkCoinNrm() }); }), p.x, 0, p.z, G);
hp.scale.set(0.8 + R() * 0.6, 0.8 + R() * 0.5, 0.8 + R() * 0.6);
hp.rotation.y = R() * 6;
var coin = dmkGeo("coin", function () { return new THREE.CylinderGeometry(0.08, 0.08, 0.015, 10); });
for (var i = 0; i < (lite ? 10 : 26); i++) {
var a = R() * 6.28, d = 0.4 + R() * 1.3, c = new THREE.Mesh(coin, gm);
c.position.set(p.x + Math.cos(a) * d, 0.01 + (d < 0.9 ? 0.35 * (0.9 - d) : 0), p.z + Math.sin(a) * d);
c.rotation.set((R() - 0.5) * 0.8, R() * 3, (R() - 0.5) * 0.8);
G.add(c);
}
var gob = dmkMesh(dmkGeo("goblet", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.1, 0), new THREE.Vector2(0.03, 0.03), new THREE.Vector2(0.03, 0.16), new THREE.Vector2(0.1, 0.22), new THREE.Vector2(0.11, 0.34), new THREE.Vector2(0.1, 0.34)], lite ? 8 : 14); }), gm, p.x + 0.75, 0.0, p.z + 0.2, G);
gob.rotation.z = R() < 0.4 ? 1.4 : 0;
var gems = [dmkM("ruby", 0xA01830, { m: 0.3, r: 0.15, e: 0x300008 }), dmkM("emerald", 0x20A060, { e: 0x10A040, ei: 0.4, r: 0.1 }), dmkM("sapph", 0x1A40B0, { r: 0.1, m: 0.3, e: 0x081840 })];
for (var g = 0; g < (lite ? 2 : 4); g++) {
var gm2 = dmkMesh(dmkGeo("gem", function () { return new THREE.OctahedronGeometry(0.07, 0); }), gems[g % 3], p.x + (R() - 0.5) * 1.1, 0.3 + R() * 0.2, p.z + (R() - 0.5) * 1.1, G);
gm2.scale.y = 1.4;
}
dmkSolid(p.x, p.z, 0.9);
},
function (G, p, T, R, r) {
var iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 }), h = dmkRoomH(r || { k: "chamber", w: 8, l: 8 });
var x = p.x - Math.sin(p.a) * 0.3, z = p.z - Math.cos(p.a) * 0.3, len = 1.5 + R() * 2.5;
for (var i = 0; i < len / 0.2; i++) {
var l = dmkMesh(dmkGeo("link", function () { return new THREE.TorusGeometry(0.07, 0.02, 5, 8); }), iron, x, h - 0.1 - i * 0.17, z, G);
l.rotation.y = i % 2 ? Math.PI / 2 : 0;
}
var sh = dmkMesh(dmkGeo("shack", function () { return new THREE.TorusGeometry(0.12, 0.03, 5, 10); }), iron, x, h - 0.1 - len - 0.1, z, G);
},
function (G, p, T, R) {
var w = dmkWood(), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = R() < 0.5 ? 0 : Math.PI / 2;
G.add(g);
wBox(2.4, 0.1, 1.0, w, 0, 0.82, 0, g);
[[-1.05, -0.4], [1.05, -0.4], [-1.05, 0.4], [1.05, 0.4]].forEach(function (q) { wBox(0.1, 0.8, 0.1, w, q[0], 0.4, q[1], g); });
wBox(2.2, 0.08, 0.35, w, 0, 0.46, 0.85, g);
wBox(2.2, 0.08, 0.35, w, 0, 0.46, -0.85, g);
[[-0.95, 0.85], [0.95, 0.85], [-0.95, -0.85], [0.95, -0.85]].forEach(function (q) { wBox(0.08, 0.44, 0.3, w, q[0], 0.22, q[1], g); });
var mug = dmkM("pewter", 0x8A8A88, { m: 0.7, r: 0.4 });
for (var i = 0; i < 3; i++)
wCyl(0.05, 0.05, 0.12, mug, -0.8 + i * 0.7, 0.93, (R() - 0.5) * 0.5, g, 8);
if (R() < 0.6) {
var cdl = dmkM("wax", 0xEDE4CC, { r: 0.7 });
wCyl(0.04, 0.04, 0.2, cdl, 0.2, 0.97, 0, g, 6);
var gl = wGlow(0xFFC880, 0.8, 0.5);
gl.position.set(0.2, 1.12, 0);
g.add(gl);
}
dmkSolid(p.x, p.z, 1.35);
},
function (G, p, T, R) {
var w = dmkWood(), steel = dmkM("steel", 0xB8BCC4, { m: 0.9, r: 0.25 }), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.1, 0, p.z - Math.cos(p.a) * 0.1);
g.rotation.y = p.a;
G.add(g);
wBox(1.8, 0.1, 0.3, w, 0, 1.8, -0.1, g);
wBox(1.8, 0.1, 0.3, w, 0, 0.6, -0.1, g);
wBox(0.1, 2, 0.1, w, -0.85, 1, -0.2, g);
wBox(0.1, 2, 0.1, w, 0.85, 1, -0.2, g);
for (var i = 0; i < 4; i++) {
var x = -0.6 + i * 0.4;
if (R() < 0.5) {
wBox(0.05, 1.3, 0.02, steel, x, 1.25, 0.02, g);
wBox(0.22, 0.04, 0.05, w, x, 0.62, 0.02, g);
}
else {
wCyl(0.02, 0.02, 2.2, w, x, 1.1, 0.02, g, 5);
wCone(0.05, 0.25, steel, x, 2.3, 0.02, g, 5);
}
}
dmkSolid(p.x, p.z, 0.95);
},
function (G, p, T, R) {
var water = dmkM("water", 0x1A3A44, { r: 0.05, m: 0.4, op: 0.85 }), rim = dmkMat("trim2", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).getHex(), { map: s.map, r: 0.8 }); });
var rr = 1.2 + R() * 0.9;
wCyl(rr + 0.25, rr + 0.3, 0.35, rim, p.x, 0.17, p.z, G, dmkLite() ? 12 : 24);
var wt = new THREE.Mesh(new THREE.CircleGeometry(rr, dmkLite() ? 12 : 24), water);
wt.rotation.x = -Math.PI / 2;
wt.position.set(p.x, 0.3, p.z);
G.add(wt);
dmkSolid(p.x, p.z, rr + 0.25);
},
function (G, p, T, R) {
var stem = dmkM("stem", 0xD8D0B8, { r: 0.8 }), cap = dmkM("cap", 0x5AC8A0, { e: 0x2A8A6A, ei: 0.8, r: 0.5 });
for (var i = 0; i < (dmkLite() ? 2 : 4); i++) {
var s = 0.5 + R() * 1.4, x = p.x + (R() - 0.5) * 2, z = p.z + (R() - 0.5) * 2;
wCyl(0.08 * s, 0.12 * s, 1.4 * s, stem, x, 0.7 * s, z, G, 7);
var c = dmkMesh(dmkGeo("cap", function () { return new THREE.SphereGeometry(0.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), cap, x, 1.38 * s, z, G);
c.scale.setScalar(s);
}
var gl = wGlow(0x7AFFC0, 1.8, 0.2);
gl.position.set(p.x, 1.3, p.z);
G.add(gl);
DMKW.torches.push({ x: p.x, y: 1.6, z: p.z, col: 0x7AFFC0 });
dmkSolid(p.x, p.z, 0.6);
},
function (G, p, T, R) {
var st = dmkMat("statue", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).lerp(new THREE.Color(0xFFFFFF), 0.4).getHex(), { map: s.map, nrm: s.nrm, r: 0.7 }); });
var g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = p.a;
G.add(g);
wBox(2.2, 1.0, 1.1, st, 0, 0.5, 0, g);
wBox(2.4, 0.12, 1.3, st, 0, 1.06, 0, g);
wBox(1.8, 0.02, 1.32, dmkM("altarcloth", 0x6A1A1A, { r: 0.9 }), 0, 1.13, 0, g);
var wax = dmkM("wax", 0xEDE4CC, { r: 0.7 });
[-0.8, 0.8].forEach(function (x) { wCyl(0.06, 0.06, 0.35, wax, x, 1.3, 0, g, 8); var gl = wGlow(0xFFC880, 0.9, 0.5); gl.position.set(x, 1.55, 0); g.add(gl); });
wSph(0.18, dmkM("gold", 0xD8A838, { m: 0.9, r: 0.28 }), 0, 1.32, 0, g, 10);
DMKW.torches.push({ x: p.x, y: 1.8, z: p.z, col: 0xFFC080 });
dmkSolid(p.x, p.z, 1.2);
},
function (G, p, T, R) {
var t = dmkRugTex(R);
var m = dmkMat("tap" + t.k, function () { return dmkStd(0xFFFFFF, { map: t.t, r: 1, side: true }); });
var g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.48, 0, p.z - Math.cos(p.a) * 0.48);
g.rotation.y = p.a;
G.add(g);
var pl = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.2), m);
pl.position.set(0, 3.4, 0.06);
g.add(pl);
wCyl(0.04, 0.04, 2.6, dmkWood(), 0, 5.05, 0.08, g, 6).rotation.z = Math.PI / 2;
},
function (G, p, T, R) {
var cloth = dmkM("roll", 0x5A4A3A, { r: 1 }), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
G.add(g);
for (var i = 0; i < 2; i++) {
var b = wCyl(0.25, 0.25, 1.8, cloth, (i - 0.5) * 1.6, 0.18, 0.9, g, 8);
b.rotation.z = Math.PI / 2;
b.rotation.y = (i - 0.5) * 0.5;
}
var st = dmkM("rubble", 0x5A5650, { r: 1 });
for (var j = 0; j < 7; j++) {
var a = j / 7 * Math.PI * 2;
wSph(0.12, st, Math.cos(a) * 0.45, 0.08, Math.sin(a) * 0.45 - 0.6, g, 6);
}
for (var k = 0; k < 3; k++) {
var l = wCyl(0.05, 0.05, 0.7, dmkWood(), 0, 0.12, -0.6, g, 5);
l.rotation.set(Math.PI / 2, k * 1.05, 0.3);
}
var f = dmkMesh(dmkGeo("fire", function () { return new THREE.ConeGeometry(0.22, 0.6, 7); }), dmkM("flame", 0xFFC070, { e: 0xFF8A30, ei: 1.6 }), 0, 0.32, -0.6, g);
DMKW.anim.push({ m: f, k: "flame", p: R() * 6 });
var gl = wGlow(0xFFA050, 2.6, 0.5);
gl.position.set(0, 0.6, -0.6);
g.add(gl);
DMKW.torches.push({ x: p.x, y: 1.2, z: p.z - 0.6, col: 0xFFA050 });
dmkSolid(p.x, p.z - 0.6, 0.6);
},
function (G, p, T, R) {
var iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 }), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.3, 0, p.z - Math.cos(p.a) * 0.3);
G.add(g);
var n = dmkLite() ? 8 : 12;
wCyl(0.75, 0.75, 0.08, iron, 0, 0.04, 0, g, n);
wCyl(0.75, 0.75, 0.08, iron, 0, 2.0, 0, g, n);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
wCyl(0.025, 0.025, 2, iron, Math.cos(a) * 0.72, 1.0, Math.sin(a) * 0.72, g, 4);
}
if (R() < 0.5)
dmkProp.bones(G, { x: g.position.x, z: g.position.z, a: 0 }, T, R);
dmkSolid(g.position.x, g.position.z, 0.8);
},
function (G, p, T, R, r) {
var h = dmkRoomH(r || { k: "chamber", w: 8, l: 8 }), pm = dmkMat("pillar" + Math.round(h), function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).multiplyScalar(1.1).getHex(), { map: dmkTexRep(s.map, 1.5, Math.max(1, Math.round(h / 2.5))), nrm: dmkTexRep(s.nrm, 1.5, Math.max(1, Math.round(h / 2.5))), r: 0.75 }); }), pb = dmkMat("pillarb", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).multiplyScalar(1.1).getHex(), { map: dmkTexRep(s.map, 0.5, 0.25), r: 0.75 }); });
wCyl(0.5, 0.6, h, pm, p.x, h / 2, p.z, G, dmkLite() ? 8 : 16);
wBox(1.4, 0.45, 1.4, pb, p.x, 0.22, p.z, G);
wBox(1.3, 0.45, 1.3, pb, p.x, h - 0.22, p.z, G);
dmkSolid(p.x, p.z, 0.75);
},
function (G, p, T, R) {
var st = dmkMat("rock", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).multiplyScalar(0.9).getHex(), { map: s.map, r: 0.95 }); });
for (var i = 0; i < (dmkLite() ? 3 : 6); i++) {
var b = wBox(0.3 + R() * 0.7, 0.2 + R() * 0.4, 0.3 + R() * 0.6, st, p.x + (R() - 0.5) * 1.8, 0.15, p.z + (R() - 0.5) * 1.8, G);
b.rotation.set(R() * 0.4, R() * 3, R() * 0.4);
}
dmkSolid(p.x, p.z, 0.8);
},
function (G, p, T, R) {
var w = dmkWood(), st = dmkMat("statue", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).lerp(new THREE.Color(0xFFFFFF), 0.4).getHex(), { map: s.map, nrm: s.nrm, r: 0.7 }); });
var g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = p.a + (R() < 0.5 ? 0 : Math.PI / 2);
G.add(g);
if (R() < 0.5) {
wBox(1.0, 0.9, 2.3, st, 0, 0.45, 0, g);
wBox(1.1, 0.15, 2.4, st, 0, 0.97, 0, g);
var eff = wBox(0.5, 0.12, 1.6, st, 0, 1.1, 0, g);
}
else {
wBox(0.75, 0.5, 2.0, w, 0, 0.25, 0, g);
var lid = wBox(0.8, 0.08, 2.05, w, 0.15, 0.55, 0, g);
lid.rotation.z = 0.12;
}
dmkSolid(p.x, p.z, 1.15);
},
function (G, p, T, R) {
var gm = dmkM("gold", 0xD8A838, { m: 0.9, r: 0.28 }), st = dmkMat("statue", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).lerp(new THREE.Color(0xFFFFFF), 0.4).getHex(), { map: s.map, nrm: s.nrm, r: 0.7 }); });
var g = new THREE.Group();
g.position.set(p.x, 0, p.z);
G.add(g);
wBox(4, 0.4, 2.6, st, 0, 0.2, 0, g);
wBox(3, 0.4, 2.0, st, 0, 0.6, 0, g);
wBox(1.4, 0.6, 1.0, dmkM("altarcloth", 0x6A1A1A, { r: 0.9 }), 0, 1.1, 0.1, g);
wBox(1.4, 2.6, 0.25, gm, 0, 2.1, -0.45, g);
wBox(0.2, 0.9, 1.0, gm, -0.7, 1.35, 0.05, g);
wBox(0.2, 0.9, 1.0, gm, 0.7, 1.35, 0.05, g);
dmkSolid(p.x, p.z, 1.8);
},
function (G, p, T, R) {
var iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 });
wCyl(0.6, 0.3, 0.5, iron, p.x, 1.05, p.z, G, 12);
wCyl(0.1, 0.15, 0.85, iron, p.x, 0.42, p.z, G, 6);
var f = dmkMesh(dmkGeo("bfire", function () { return new THREE.ConeGeometry(0.4, 0.9, 8); }), dmkM("flame", 0xFFC070, { e: 0xFF8A30, ei: 1.6 }), p.x, 1.7, p.z, G);
DMKW.anim.push({ m: f, k: "flame", p: R() * 6 });
var gl = wGlow(T.light, 4, 0.5);
gl.position.set(p.x, 1.9, p.z);
G.add(gl);
DMKW.torches.push({ x: p.x, y: 2.2, z: p.z, col: T.light });
dmkSolid(p.x, p.z, 0.7);
},
function (G, p, T, R) {
var w = dmkWood(), cloth = dmkM("roll", 0x5A4A3A, { r: 1 }), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.5, 0, p.z - Math.cos(p.a) * 0.5);
g.rotation.y = p.a + Math.PI / 2;
G.add(g);
wBox(2.0, 0.4, 0.9, w, 0, 0.2, 0, g);
wBox(1.9, 0.15, 0.85, cloth, 0, 0.47, 0, g);
wBox(0.4, 0.12, 0.6, dmkM("pillow", 0xD8D0C0, { r: 1 }), -0.7, 0.6, 0, g);
dmkSolid(g.position.x, g.position.z, 1.0);
},
function (R) {
var k = Math.floor(R() * DMK_RUGS.length);
DMKW.rugs = DMKW.rugs || {};
if (DMKW.rugs[k])
return { k: k, t: DMKW.rugs[k] };
var P = DMK_RUGS[k], hx = function (c) { return "#" + ("000000" + c.toString(16)).slice(-6); }, S = dmkLite() ? 128 : 256;
var t = wTex(S, S, function (x, W, H) {
x.fillStyle = hx(P[0]);
x.fillRect(0, 0, W, H);
x.strokeStyle = hx(P[1]);
x.lineWidth = W / 24;
x.strokeRect(W * 0.06, H * 0.06, W * 0.88, H * 0.88);
x.lineWidth = W / 64;
x.strokeRect(W * 0.14, H * 0.14, W * 0.72, H * 0.72);
x.fillStyle = hx(P[2]);
for (var i = 0; i < 5; i++)
for (var j = 0; j < 5; j++) {
x.save();
x.translate(W * (0.24 + i * 0.13), H * (0.24 + j * 0.13));
x.rotate(Math.PI / 4);
x.fillRect(-W * 0.03, -W * 0.03, W * 0.06, W * 0.06);
x.restore();
}
x.fillStyle = hx(P[1]);
x.beginPath();
x.arc(W / 2, H / 2, W * 0.1, 0, Math.PI * 2);
x.fill();
for (var n = 0; n < 1400; n++) {
x.fillStyle = "rgba(0,0,0," + (Math.random() * 0.12) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 1, 1);
}
});
DMKW.rugs[k] = t;
return { k: k, t: t };
},
function (G, p, S, i, R) {
var w = dmkWood(), band = dmkM("hoop", 0x3A3430, { m: 0.6, r: 0.5 }), gold = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 });
var g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.2, 0, p.z - Math.cos(p.a) * 0.2);
g.rotation.y = p.a;
G.add(g);
wBox(1.1, 0.6, 0.7, w, 0, 0.3, 0, g);
[-0.4, 0.4].forEach(function (x) { wBox(0.08, 0.62, 0.72, band, x, 0.3, 0, g); });
var lid = new THREE.Group();
lid.position.set(0, 0.6, -0.35);
g.add(lid);
var lt = wCyl(0.35, 0.35, 1.1, w, 0, 0, 0.35, lid, 10);
lt.rotation.z = Math.PI / 2;
lt.scale.set(1, 1, 1);
wBox(0.15, 0.15, 0.06, gold, 0, 0.05, 0.72, lid);
DMKW.chests.push({ g: g, lid: lid, x: g.position.x, z: g.position.z, room: i, open: false, t: 0, id: "c" + i + "_" + DMKW.chests.length });
dmkSolid(g.position.x, g.position.z, 0.65);
},
function () {
return dmkMat("webtex", function () {
var t = wTex(256, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var c = W / 2, n = 11, rr = wRand(7);
x.strokeStyle = "rgba(235,230,240,0.85)";
x.lineWidth = 1.3;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + rr() * 0.2;
x.beginPath();
x.moveTo(c, c);
x.lineTo(c + Math.cos(a) * W * 0.5, c + Math.sin(a) * W * 0.5);
x.stroke();
}
x.lineWidth = 0.9;
for (var r = 8; r < W * 0.47; r += 6 + r * 0.06) {
x.beginPath();
for (var k = 0; k <= n; k++) {
if (rr() < 0.07) {
x.stroke();
x.beginPath();
continue;
}
var a2 = k / n * Math.PI * 2, px = c + Math.cos(a2) * r, py = c + Math.sin(a2) * r;
if (k === 0)
x.moveTo(px, py);
else
x.quadraticCurveTo(c + Math.cos(a2 - Math.PI / n) * r * 0.93, c + Math.sin(a2 - Math.PI / n) * r * 0.93, px, py);
}
x.stroke();
}
x.globalCompositeOperation = "destination-in";
var g = x.createRadialGradient(c, c, W * 0.3, c, c, W * 0.5);
g.addColorStop(0, "rgba(0,0,0,1)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
});
var m = new THREE.MeshStandardMaterial({ map: t, transparent: true, alphaTest: 0.05, side: THREE.DoubleSide, roughness: 1, depthWrite: false });
return m;
});
},
function () {
DMKW.coinN = DMKW.coinN || null;
if (DMKW.coinN)
return DMKW.coinN;
var t = wTex(128, 128, function (x, W, H) {
x.fillStyle = "rgb(128,128,255)";
x.fillRect(0, 0, W, H);
var rr = wRand(5);
for (var i = 0; i < 140; i++) {
var cx = rr() * W, cy = rr() * H, r = 5 + rr() * 5, g = x.createRadialGradient(cx - r * 0.4, cy - r * 0.4, 1, cx, cy, r);
g.addColorStop(0, "rgb(90,90,255)");
g.addColorStop(0.7, "rgb(170,170,255)");
g.addColorStop(1, "rgb(128,128,255)");
x.fillStyle = g;
x.beginPath();
x.arc(cx, cy, r, 0, Math.PI * 2);
x.fill();
}
}, [3, 3]);
DMKW.coinN = t;
return t;
},
function (key, W, H, draw, o) {
o = o || {};
return dmkMat(key, function () {
var t = wTex(W, H, draw);
try {
t.colorSpace = THREE.SRGBColorSpace;
}
catch (e) { }
var m = dmkStd(0xFFFFFF, { map: t, r: o.r !== undefined ? o.r : 0.9, m: o.m || 0 });
if (o.alpha) {
m.transparent = true;
m.alphaTest = 0.08;
m.side = THREE.DoubleSide;
}
if (o.glow) {
m.emissive = new THREE.Color(o.glow);
m.emissiveMap = t;
m.emissiveIntensity = o.ei || 1.2;
}
return m;
});
},
function (x, W, H) {
x.fillStyle = "#C8A878";
x.fillRect(0, 0, W, H);
var band = function (y, h, cols) { var n = cols.length, sw = W / 16; for (var i = 0; i < 16; i++) {
x.fillStyle = cols[i % n];
x.fillRect(i * sw, y, sw, h);
} };
band(0, H * 0.07, ["#1E4E8C", "#C8A040", "#8C2A1E", "#C8A040"]);
band(H * 0.93, H * 0.07, ["#1E4E8C", "#C8A040", "#8C2A1E", "#C8A040"]);
x.fillStyle = "#3A2A1A";
x.fillRect(0, H * 0.075, W, H * 0.012);
x.fillRect(0, H * 0.913, W, H * 0.012);
for (var f = 0; f < 2; f++) {
var cx = W * (0.28 + f * 0.5), base = H * 0.86, sc = H / 256;
x.fillStyle = f ? "#8C3A1E" : "#A0522D";
x.beginPath();
x.ellipse(cx, base - 150 * sc, 13 * sc, 15 * sc, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#1A1410";
x.beginPath();
x.moveTo(cx - 14 * sc, base - 160 * sc);
x.lineTo(cx + 8 * sc, base - 168 * sc);
x.lineTo(cx + 4 * sc, base - 136 * sc);
x.lineTo(cx - 18 * sc, base - 130 * sc);
x.fill();
x.fillStyle = f ? "#8C3A1E" : "#A0522D";
x.fillRect(cx - 12 * sc, base - 134 * sc, 24 * sc, 52 * sc);
x.fillStyle = "#F0E8D0";
x.beginPath();
x.moveTo(cx - 14 * sc, base - 84 * sc);
x.lineTo(cx + 14 * sc, base - 84 * sc);
x.lineTo(cx + 20 * sc, base - 30 * sc);
x.lineTo(cx - 20 * sc, base - 30 * sc);
x.fill();
x.fillStyle = f ? "#8C3A1E" : "#A0522D";
x.fillRect(cx - 12 * sc, base - 30 * sc, 8 * sc, 30 * sc);
x.fillRect(cx + 6 * sc, base - 30 * sc, 8 * sc, 30 * sc);
x.strokeStyle = f ? "#8C3A1E" : "#A0522D";
x.lineWidth = 6 * sc;
x.beginPath();
x.moveTo(cx - 8 * sc, base - 124 * sc);
x.lineTo(cx - 34 * sc, base - 100 * sc);
x.moveTo(cx + 8 * sc, base - 124 * sc);
x.lineTo(cx + 36 * sc, base - 130 * sc);
x.stroke();
x.strokeStyle = "#C8A040";
x.lineWidth = 5 * sc;
x.beginPath();
x.moveTo(cx + 36 * sc, base - 150 * sc);
x.lineTo(cx + 36 * sc, base - 10 * sc);
x.stroke();
x.beginPath();
x.arc(cx + 36 * sc, base - 158 * sc, 8 * sc, 0, Math.PI * 2);
x.stroke();
x.fillStyle = "#1E4E8C";
x.fillRect(cx - 14 * sc, base - 120 * sc, 28 * sc, 6 * sc);
}
for (var c = 0; c < 3; c++) {
var gx = W * (0.04 + c * 0.46) + W * 0.02, y = H * 0.13;
x.strokeStyle = "#2A1E14";
x.lineWidth = 2;
x.strokeRect(gx - 4, y - 4, W * 0.09 + 8, H * 0.72 + 8);
for (var g = 0; g < 7; g++) {
var gy = y + g * H * 0.1, k = (g * 7 + c * 3) % 5;
x.fillStyle = ["#1A1410", "#1E4E8C", "#8C2A1E", "#1A1410", "#C8A040"][k];
if (k === 0) {
x.beginPath();
x.ellipse(gx + W * 0.045, gy + H * 0.04, W * 0.03, H * 0.02, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#C8A878";
x.beginPath();
x.arc(gx + W * 0.045, gy + H * 0.04, H * 0.01, 0, Math.PI * 2);
x.fill();
}
else if (k === 1) {
for (var w2 = 0; w2 < 3; w2++) {
x.fillRect(gx + w2 * W * 0.03, gy + H * 0.03 + (w2 % 2) * 4, W * 0.025, 4);
}
}
else if (k === 2) {
x.beginPath();
x.moveTo(gx + W * 0.01, gy + H * 0.07);
x.quadraticCurveTo(gx + W * 0.045, gy, gx + W * 0.08, gy + H * 0.07);
x.fill();
}
else if (k === 3) {
x.fillRect(gx + W * 0.035, gy + H * 0.005, W * 0.02, H * 0.075);
x.fillRect(gx + W * 0.015, gy + H * 0.02, W * 0.06, H * 0.012);
}
else {
x.beginPath();
x.arc(gx + W * 0.045, gy + H * 0.04, H * 0.03, 0, Math.PI * 2);
x.fill();
}
}
}
for (var n = 0; n < 2600; n++) {
x.fillStyle = "rgba(" + (Math.random() < 0.5 ? "60,40,20" : "255,240,210") + "," + (Math.random() * 0.12) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
}
},
function (x, W, H) {
x.fillStyle = "#2A2420";
x.fillRect(0, 0, W, H);
var rows = 5, rh = H / rows;
for (var r = 0; r < rows; r++) {
var y = r * rh;
if (r % 2 === 1) {
for (var b = 0; b < 9; b++) {
var by = y + rh * 0.12 + b * rh * 0.085;
var gr = x.createLinearGradient(0, by, 0, by + rh * 0.07);
gr.addColorStop(0, "#E4D8BC");
gr.addColorStop(1, "#9A8E74");
x.fillStyle = gr;
x.fillRect(0, by, W, rh * 0.065);
for (var e = 0; e < 6; e++) {
var ex = (e * W / 5 + (b % 2) * W / 10) % W;
x.beginPath();
x.arc(ex, by + rh * 0.033, rh * 0.05, 0, Math.PI * 2);
x.fill();
}
}
continue;
}
for (var s = 0; s < 6; s++) {
var cx = (s + 0.5 + (r % 4 === 2 ? 0.5 : 0)) * W / 6 % W, cy = y + rh * 0.52, sw = W / 6 * 0.42;
var g = x.createRadialGradient(cx - sw * 0.2, cy - rh * 0.15, 2, cx, cy, sw * 1.1);
g.addColorStop(0, "#F2E8D0");
g.addColorStop(1, "#8E8268");
x.fillStyle = g;
x.beginPath();
x.ellipse(cx, cy - rh * 0.05, sw, rh * 0.4, 0, 0, Math.PI * 2);
x.fill();
x.fillRect(cx - sw * 0.55, cy + rh * 0.18, sw * 1.1, rh * 0.2);
x.fillStyle = "#120E0C";
x.beginPath();
x.ellipse(cx - sw * 0.42, cy, sw * 0.26, rh * 0.12, 0.2, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.ellipse(cx + sw * 0.42, cy, sw * 0.26, rh * 0.12, -0.2, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.moveTo(cx, cy + rh * 0.06);
x.lineTo(cx - sw * 0.1, cy + rh * 0.18);
x.lineTo(cx + sw * 0.1, cy + rh * 0.18);
x.fill();
for (var t = 0; t < 6; t++)
x.fillRect(cx - sw * 0.48 + t * sw * 0.18, cy + rh * 0.26, 2, rh * 0.1);
}
}
for (var n = 0; n < 3000; n++) {
x.fillStyle = "rgba(0,0,0," + (Math.random() * 0.18) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
}
},
function (x, W, H) {
x.clearRect(0, 0, W, H);
for (var i = 0; i < 70; i++) {
var cx = Math.random() * W, h = H * (0.3 + Math.random() * 0.7), w = 6 + Math.random() * 24;
var g = x.createLinearGradient(0, H, 0, H - h);
g.addColorStop(0, "rgba(30,70,40,0.85)");
g.addColorStop(0.6, "rgba(40,90,50,0.45)");
g.addColorStop(1, "rgba(40,90,50,0)");
x.fillStyle = g;
x.fillRect(cx, H - h, w, h);
}
var g2 = x.createLinearGradient(0, H, 0, H * 0.6);
g2.addColorStop(0, "rgba(20,50,30,0.9)");
g2.addColorStop(1, "rgba(20,50,30,0)");
x.fillStyle = g2;
x.fillRect(0, H * 0.6, W, H * 0.4);
},
function (x, W, H) {
x.clearRect(0, 0, W, H);
for (var v = 0; v < 5; v++) {
var vx = Math.random() * W, y = 0;
x.strokeStyle = "#3A2E1E";
x.lineWidth = 3;
x.beginPath();
x.moveTo(vx, 0);
while (y < H) {
vx += (Math.random() - 0.5) * 30;
y += 18;
x.lineTo(vx, y);
for (var l = 0; l < 3; l++) {
x.save();
x.translate(vx + (Math.random() - 0.5) * 26, y + (Math.random() - 0.5) * 14);
x.rotate(Math.random() * 6);
x.fillStyle = ["#2E5A22", "#3E6E2A", "#4A7A30", "#28501E"][Math.floor(Math.random() * 4)];
x.beginPath();
x.moveTo(0, -9);
x.quadraticCurveTo(9, -3, 0, 9);
x.quadraticCurveTo(-9, -3, 0, -9);
x.fill();
x.restore();
}
}
x.stroke();
}
},
function (x, W, H) {
x.fillStyle = "#141A3A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C8A040";
x.lineWidth = 4;
x.strokeRect(6, 6, W - 12, H - 12);
x.lineWidth = 1;
x.beginPath();
x.arc(W / 2, H / 2, W * 0.42, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.arc(W / 2, H / 2, W * 0.3, 0, Math.PI * 2);
x.stroke();
for (var a = 0; a < 12; a++) {
x.beginPath();
x.moveTo(W / 2 + Math.cos(a / 12 * Math.PI * 2) * W * 0.3, H / 2 + Math.sin(a / 12 * Math.PI * 2) * W * 0.3);
x.lineTo(W / 2 + Math.cos(a / 12 * Math.PI * 2) * W * 0.42, H / 2 + Math.sin(a / 12 * Math.PI * 2) * W * 0.42);
x.stroke();
}
var pts = [];
for (var s = 0; s < 90; s++) {
var px = W * 0.1 + Math.random() * W * 0.8, py = H * 0.1 + Math.random() * H * 0.8;
x.fillStyle = "rgba(255,240,200," + (0.5 + Math.random() * 0.5) + ")";
x.beginPath();
x.arc(px, py, 1 + Math.random() * 2.2, 0, Math.PI * 2);
x.fill();
if (s < 14)
pts.push([px, py]);
}
x.strokeStyle = "rgba(220,200,140,0.7)";
x.beginPath();
pts.forEach(function (p, i) { if (i % 5 === 0)
x.moveTo(p[0], p[1]);
else
x.lineTo(p[0], p[1]); });
x.stroke();
x.fillStyle = "#E8C860";
x.beginPath();
x.arc(W / 2, H / 2, W * 0.06, 0, Math.PI * 2);
x.fill();
},
function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "#C8A8FF";
x.shadowColor = "#9A70FF";
x.shadowBlur = 10;
var c = W / 2;
[0.47, 0.4, 0.24].forEach(function (r) { x.lineWidth = r === 0.4 ? 2 : 4; x.beginPath(); x.arc(c, c, W * r, 0, Math.PI * 2); x.stroke(); });
x.lineWidth = 3;
x.beginPath();
for (var k = 0; k <= 5; k++) {
var a = k * 4 / 5 * Math.PI * 2 - Math.PI / 2;
x[k ? "lineTo" : "moveTo"](c + Math.cos(a) * W * 0.4, c + Math.sin(a) * W * 0.4);
}
x.stroke();
x.font = "bold " + Math.round(W / 16) + "px serif";
x.fillStyle = "#E0D0FF";
x.textAlign = "center";
x.textBaseline = "middle";
var R = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";
for (var i = 0; i < 16; i++) {
var a2 = i / 16 * Math.PI * 2;
x.save();
x.translate(c + Math.cos(a2) * W * 0.435, c + Math.sin(a2) * W * 0.435);
x.rotate(a2 + Math.PI / 2);
x.fillText(R[i % R.length], 0, 0);
x.restore();
}
},
function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "#8A7A5A";
x.lineWidth = 3;
for (var i = -H; i < W + H; i += 26) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i + H * 0.9, H);
x.stroke();
x.beginPath();
x.moveTo(i, H);
x.lineTo(i + H * 0.9, 0);
x.stroke();
}
x.globalCompositeOperation = "destination-in";
var g = x.createRadialGradient(W / 2, H * 0.3, 10, W / 2, H * 0.5, W * 0.6);
g.addColorStop(0, "rgba(0,0,0,1)");
g.addColorStop(0.8, "rgba(0,0,0,1)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
},
function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#DCEEFF");
g.addColorStop(1, "#8CB8E0");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(255,255,255,0.7)";
for (var i = 0; i < 40; i++) {
x.lineWidth = 0.5 + Math.random() * 1.5;
x.beginPath();
var px = Math.random() * W, py = Math.random() * H;
x.moveTo(px, py);
for (var k = 0; k < 4; k++) {
px += (Math.random() - 0.5) * 60;
py += (Math.random() - 0.5) * 60;
x.lineTo(px, py);
}
x.stroke();
}
for (var n = 0; n < 600; n++) {
x.fillStyle = "rgba(255,255,255," + (Math.random() * 0.3) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
}
},
function (x, W, H) {
var sky = x.createLinearGradient(0, 0, 0, H);
sky.addColorStop(0, "#3A3020");
sky.addColorStop(1, "#1A140C");
x.fillStyle = sky;
x.fillRect(0, 0, W, H);
x.fillStyle = "#2A1E14";
x.beginPath();
x.ellipse(W / 2, H * 0.95, W * 0.38, H * 0.42, 0, Math.PI, 0);
x.fill();
x.fillStyle = "#C8A888";
x.beginPath();
x.ellipse(W / 2, H * 0.4, W * 0.15, H * 0.15, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#3A2A1A";
x.beginPath();
x.ellipse(W / 2, H * 0.32, W * 0.17, H * 0.1, 0, Math.PI, 0);
x.fill();
x.fillStyle = "#F0E8D8";
x.fillRect(W * 0.42, H * 0.56, W * 0.16, H * 0.06);
for (var n = 0; n < 1500; n++) {
x.fillStyle = "rgba(0,0,0," + (Math.random() * 0.15) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
}
},
function (r, teeth, th) {
return dmkGeo("gear" + r + "-" + teeth, function () {
var s = new THREE.Shape(), n = teeth * 2;
for (var i = 0; i <= n * 2; i++) {
var a = i / (n * 2) * Math.PI * 2, rr = (Math.floor(i / 2) % 2) ? r : r * 0.86;
s[i ? "lineTo" : "moveTo"](Math.cos(a) * rr, Math.sin(a) * rr);
}
var hole = new THREE.Path();
hole.absarc(0, 0, r * 0.22, 0, Math.PI * 2, true);
s.holes.push(hole);
for (var k = 0; k < 5; k++) {
var a2 = k / 5 * Math.PI * 2 + 0.3, h = new THREE.Path();
h.absarc(Math.cos(a2) * r * 0.55, Math.sin(a2) * r * 0.55, r * 0.16, 0, Math.PI * 2, true);
s.holes.push(h);
}
var g = new THREE.ExtrudeGeometry(s, { depth: th || 0.12, bevelEnabled: false, curveSegments: dmkLite() ? 4 : 8 });
g.translate(0, 0, -(th || 0.12) / 2);
return g;
});
},
function (G, x, z, h, kind, T, R) {
var lite = dmkLite(), g = new THREE.Group();
g.position.set(x, h - 2.4, z);
G.add(g);
var metal = kind === "gilt" ? dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }) : kind === "bone" ? dmkM("bone", 0xD8CCB0, { r: 0.75 }) : kind === "brass" ? dmkM("brass", 0xB08A40, { m: 0.85, r: 0.3 }) : kind === "ice" ? dmkM("iceglass", 0xCFE8FF, { r: 0.05, m: 0.1, op: 0.75, e: 0x406080, ei: 0.4 }) : dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 });
var link = dmkGeo("link", function () { return new THREE.TorusGeometry(0.07, 0.02, 5, 8); });
for (var c = 0; c < (lite ? 4 : 9); c++) {
var l = new THREE.Mesh(link, dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 }));
l.position.set(0, 0.4 + c * 0.22, 0);
l.rotation.y = c % 2 ? Math.PI / 2 : 0;
g.add(l);
}
var rr = kind === "bone" ? 1.1 : 1.3, ring = new THREE.Mesh(dmkGeo("chring" + rr, function () { return new THREE.TorusGeometry(rr, 0.07, 6, lite ? 14 : 28); }), metal);
ring.rotation.x = Math.PI / 2;
g.add(ring);
var ring2 = new THREE.Mesh(dmkGeo("chring" + (rr * 0.55), function () { return new THREE.TorusGeometry(rr * 0.55, 0.05, 6, lite ? 10 : 20); }), metal);
ring2.rotation.x = Math.PI / 2;
ring2.position.y = -0.35;
g.add(ring2);
wCyl(0.06, 0.06, 0.8, metal, 0, 0, 0, g, 6);
for (var s = 0; s < 4; s++) {
var sp = wCyl(0.025, 0.025, rr, metal, Math.cos(s * Math.PI / 2) * rr / 2, 0.05, Math.sin(s * Math.PI / 2) * rr / 2, g, 4);
sp.rotation.z = Math.PI / 2;
sp.rotation.y = -s * Math.PI / 2;
}
if (kind === "bone")
for (var k = 0; k < (lite ? 6 : 12); k++) {
var a = k / (lite ? 6 : 12) * Math.PI * 2, sk = dmkMesh(dmkGeo("skull", function () { var q = new THREE.SphereGeometry(0.13, 10, 8); q.scale(1, 0.9, 1.15); return q; }), metal, Math.cos(a) * rr, -0.14, Math.sin(a) * rr, g);
sk.rotation.y = -a + Math.PI / 2;
}
if (kind === "ice")
for (var j = 0; j < (lite ? 6 : 14); j++) {
var a3 = j / (lite ? 6 : 14) * Math.PI * 2, ic = dmkMesh(dmkGeo("icicle", function () { var q = new THREE.ConeGeometry(0.08, 0.9, 5); q.rotateX(Math.PI); return q; }), metal, Math.cos(a3) * rr, -0.45 - (j % 3) * 0.15, Math.sin(a3) * rr, g);
ic.scale.y = 0.6 + (j % 4) * 0.25;
}
var n = lite ? 5 : 10, wax = dmkM("wax", 0xEDE4CC, { r: 0.7 }), fl = dmkM("flame", 0xFFC070, { e: 0xFF8A30, ei: 1.6 });
if (kind !== "ice")
for (var i = 0; i < n; i++) {
var a2 = i / n * Math.PI * 2;
wCyl(0.04, 0.04, 0.22, wax, Math.cos(a2) * rr, 0.16, Math.sin(a2) * rr, g, 6);
var f = dmkMesh(dmkGeo("cflame", function () { return new THREE.ConeGeometry(0.03, 0.09, 5); }), fl, Math.cos(a2) * rr, 0.32, Math.sin(a2) * rr, g);
}
var gl = wGlow(kind === "ice" ? 0xBFE4FF : 0xFFC880, 4.2, 0.55);
gl.position.set(0, 0.1, 0);
g.add(gl);
DMKW.torches.push({ x: x, y: h - 2.3, z: z, col: kind === "ice" ? 0xBFE4FF : 0xFFC080 });
},
function (G, r, T, R, col) {
var C = DMK_CELL, along = r.w >= r.l, len = (along ? r.w : r.l) * C - 3.2;
if (len < 4)
return;
var t = dmkRugTex(R), m = dmkMat("rug" + t.k, function () { return dmkStd(0xFFFFFF, { map: t.t, r: 1 }); });
var rg = wBox(along ? len : 2.2, 0.025, along ? 2.2 : len, m, (r.x + r.w / 2) * C, 0.013, (r.z + r.l / 2) * C, G);
var gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 });
[-1.15, 1.15].forEach(function (o) { wBox(along ? len : 0.08, 0.03, along ? 0.08 : len, gilt, (r.x + r.w / 2) * C + (along ? 0 : o), 0.016, (r.z + r.l / 2) * C + (along ? o : 0), G); });
},
function (G, r, h, mat) {
var C = DMK_CELL, x0 = r.x * C, x1 = (r.x + r.w) * C, z0 = r.z * C, z1 = (r.z + r.l) * C, y = h - 1.0;
wBox(x1 - x0, 0.18, 0.08, mat, (x0 + x1) / 2, y, z0 + 0.04, G);
wBox(x1 - x0, 0.18, 0.08, mat, (x0 + x1) / 2, y, z1 - 0.04, G);
wBox(0.08, 0.18, z1 - z0, mat, x0 + 0.04, y, (z0 + z1) / 2, G);
wBox(0.08, 0.18, z1 - z0, mat, x1 - 0.04, y, (z0 + z1) / 2, G);
wBox(x1 - x0, 0.08, 0.06, mat, (x0 + x1) / 2, y - 0.32, z0 + 0.03, G);
wBox(x1 - x0, 0.08, 0.06, mat, (x0 + x1) / 2, y - 0.32, z1 - 0.03, G);
wBox(0.06, 0.08, z1 - z0, mat, x0 + 0.03, y - 0.32, (z0 + z1) / 2, G);
wBox(0.06, 0.08, z1 - z0, mat, x1 - 0.03, y - 0.32, (z0 + z1) / 2, G);
},
function (c) {
var bone = dmkM("bone", 0xD8CCB0, { r: 0.75 }), dark = dmkM("niche", 0x0E0C0A, { r: 1 }), st = dmkStoneMat(c.T, "crypt", 1.05);
c.cells.forEach(function (p, k) {
if (k % Math.max(1, 4 - c.lvl))
return;
var g = dmkOnWall(c.G, p, 0, 0.03);
for (var row = 0; row < (c.lvl >= 2 ? 2 : 1); row++) {
var y = 1.3 + row * 1.4;
dmkPlane(g, dark, 1.5, 0.85, 0, y, 0.01);
wBox(1.7, 0.12, 0.3, st, 0, y - 0.48, 0.1, g);
wBox(1.7, 0.12, 0.3, st, 0, y + 0.48, 0.1, g);
var sk = dmkMesh(dmkGeo("skull", function () { var q = new THREE.SphereGeometry(0.13, 10, 8); q.scale(1, 0.9, 1.15); return q; }), bone, (c.R() - 0.5) * 0.8, y - 0.3, 0.12, g);
var b = wCyl(0.03, 0.04, 0.6, bone, 0.2, y - 0.36, 0.1, g, 5);
b.rotation.z = Math.PI / 2;
}
});
for (var e = 0; e < c.n(0.6, 1.2, c.lvl >= 2); e++) {
var p = c.mid();
if (!p)
break;
dmkProp.effigy(c.G, p, c.T, c.R);
}
},
function (c) {
var alg = dmkPlaneTex("art-algae", 256, 256, DMK_WALLART.algae, { alpha: 1 });
c.cells.forEach(function (p) { var g = dmkOnWall(c.G, p, 0, 0.04); dmkPlane(g, alg, 2.02, 2.2, 0, 1.1, 0); });
var water = dmkM("puddle", 0x10241E, { r: 0.04, m: 0.5, op: 0.8 });
for (var i = 0; i < c.n(1, 1.5); i++) {
var q = c.mid();
if (!q)
break;
var pd = new THREE.Mesh(dmkGeo("puddle", function () { return new THREE.CircleGeometry(1, 16); }), water);
pd.rotation.x = -Math.PI / 2;
pd.position.set(q.x + (c.R() - 0.5) * 2, 0.02, q.z + (c.R() - 0.5) * 2);
pd.scale.set(1 + c.R() * 1.4, 1 + c.R(), 1);
c.G.add(pd);
}
for (var d = 0; d < c.n(0.6, 1); d++) {
var q2 = c.mid();
if (!q2)
break;
dmkProp.drum(c.G, q2, c.T, c.R);
}
if (c.lvl >= 2)
for (var s = 0; s < c.n(0, 0.5, 1); s++) {
var q3 = c.wall();
if (!q3)
break;
dmkProp.idol(c.G, q3, c.T, c.R);
}
},
function (c) {
var gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), st = dmkStoneMat(c.T, "dwarf", 0.95);
c.cells.forEach(function (p, k) { if (k % 2)
return; var g = dmkOnWall(c.G, p, 0, 0.05); wBox(1.9, 0.5, 0.1, st, 0, 3.4, 0, g); for (var r2 = 0; r2 < 4; r2++)
wBox(0.22, 0.28, 0.04, gilt, -0.66 + r2 * 0.44, 3.4, 0.07, g); });
for (var a = 0; a < c.n(0.6, 1); a++) {
var p = c.mid();
if (!p)
break;
dmkProp.anvil(c.G, p, c.T, c.R);
}
for (var f = 0; f < c.n(0.3, 0.6, c.lvl >= 1); f++) {
var w = c.wall();
if (!w)
break;
dmkProp.hearth(c.G, w, c.T, c.R);
}
if (c.lvl >= 2)
for (var k2 = 0; k2 < c.n(0, 0.4, 1); k2++) {
var w2 = c.wall();
if (!w2)
break;
dmkProp.kingstatue(c.G, w2, c.T, c.R);
}
if (c.lvl >= 3)
for (var g2 = 0; g2 < c.n(0, 0.6); g2++) {
var q = c.mid();
if (!q)
break;
dmkProp.ingots(c.G, q, c.T, c.R);
}
},
function (c) {
var ice = dmkPlaneTex("art-ice", 256, 256, DMK_WALLART.ice, { r: 0.12, m: 0.1 }), glass = dmkM("iceglass", 0xCFE8FF, { r: 0.05, m: 0.1, op: 0.75, e: 0x406080, ei: 0.4 });
c.cells.forEach(function (p, k) { if (k % Math.max(1, 3 - c.lvl))
return; var g = dmkOnWall(c.G, p, 0, 0.05); var hh = Math.round(3 + c.R() * 3); dmkPlane(g, ice, 2.02, hh, 0, hh / 2, 0); });
var ic = dmkGeo("icicle", function () { var q = new THREE.ConeGeometry(0.08, 0.9, 5); q.rotateX(Math.PI); return q; });
for (var i = 0; i < c.n(8, 12); i++) {
var x = (c.r.x + 0.3 + c.R() * (c.r.w - 0.6)) * DMK_CELL, z = (c.r.z + 0.3 + c.R() * (c.r.l - 0.6)) * DMK_CELL, s = 0.8 + c.R() * 2.2;
var m = new THREE.Mesh(ic, glass);
m.position.set(x, c.h - 0.45 * s, z);
m.scale.set(s * 0.8, s, s * 0.8);
c.G.add(m);
}
for (var k = 0; k < c.n(1, 1.5); k++) {
var p = c.R() < 0.5 ? c.wall() : c.mid();
if (!p)
break;
dmkProp.icecrystals(c.G, p, c.T, c.R);
}
for (var f = 0; f < c.n(0.5, 0.8); f++) {
var q = c.mid();
if (!q)
break;
var fr = new THREE.Mesh(dmkGeo("puddle", function () { return new THREE.CircleGeometry(1, 16); }), dmkM("frostfloor", 0xDDEEFF, { r: 0.08, m: 0.2, op: 0.7 }));
fr.rotation.x = -Math.PI / 2;
fr.position.set(q.x, 0.02, q.z);
fr.scale.set(1.5 + c.R() * 1.5, 1 + c.R(), 1);
c.G.add(fr);
}
if (c.lvl >= 2)
for (var w = 0; w < c.n(0, 0.4, 1); w++) {
var q2 = c.mid();
if (!q2)
break;
dmkProp.frozen(c.G, q2, c.T, c.R);
}
},
function (c) {
for (var i = 0; i < c.n(0.8, 1.4); i++) {
var p = c.mid() || c.wall();
if (!p)
break;
dmkProp.bigshroom(c.G, p, c.T, c.R, c.lvl);
}
var moss = dmkM("glowmoss", 0x2E5A32, { e: 0x1A5A30, ei: 0.35, r: 1 });
for (var m = 0; m < c.n(2, 3); m++) {
var x = (c.r.x + 0.5 + c.R() * (c.r.w - 1)) * DMK_CELL, z = (c.r.z + 0.5 + c.R() * (c.r.l - 1)) * DMK_CELL, d = new THREE.Mesh(dmkGeo("puddle", function () { return new THREE.CircleGeometry(1, 16); }), moss);
d.rotation.x = -Math.PI / 2;
d.position.set(x, 0.015 + m * 0.0005, z);
d.scale.set(0.6 + c.R() * 1.4, 0.5 + c.R(), 1);
c.G.add(d);
}
dmkRoots(c, c.n(2, 3), 0x4A3A28);
},
function (c) {
var fr = dmkArtMat("tomb");
dmkBand(c.G, c.cells, fr, c.lvl >= 2 ? 2.6 : 2.2, c.lvl >= 2 ? 2.2 : 1.6);
for (var j = 0; j < c.n(1, 1.5); j++) {
var p = c.wall();
if (!p)
break;
dmkProp.jars(c.G, p, c.T, c.R);
}
if (c.lvl >= 1)
for (var s = 0; s < c.n(0, 0.4, 1); s++) {
var q = c.wall();
if (!q)
break;
dmkProp.mummycase(c.G, q, c.T, c.R);
}
if (c.lvl >= 2)
for (var o = 0; o < c.n(0, 0.4); o++) {
var q2 = c.mid();
if (!q2)
break;
dmkProp.obelisk(c.G, q2, c.T, c.R);
}
if (c.lvl >= 3) {
for (var g = 0; g < c.n(0, 0.6); g++) {
var q3 = c.mid();
if (!q3)
break;
dmkProp.gold(c.G, q3, c.T, c.R);
}
}
},
function (c) {
var sk = dmkArtMat("ossuary");
dmkBand(c.G, c.cells, sk, c.lvl >= 1 ? 2.4 : 1.6, c.lvl >= 1 ? 3.6 : 2.2);
for (var i = 0; i < c.n(0.6, 1); i++) {
var p = c.mid() || c.wall();
if (!p)
break;
dmkProp.bonepile(c.G, p, c.T, c.R);
}
if (c.lvl >= 2)
for (var k = 0; k < c.n(0, 0.4); k++) {
var q = c.mid();
if (!q)
break;
dmkProp.skullpillar(c.G, q, c.T, c.R, c.h);
}
},
function (c) {
for (var i = 0; i < c.n(0.8, 1.3); i++) {
var p = c.wall();
if (!p)
break;
dmkProp.winerack(c.G, p, c.T, c.R);
}
for (var k = 0; k < c.n(0.6, 1); k++) {
var q = c.wall();
if (!q)
break;
dmkProp.cask(c.G, q, c.T, c.R);
}
if (c.lvl >= 1)
for (var a = 0; a < c.n(0, 0.6); a++) {
var q2 = c.mid();
if (!q2)
break;
dmkProp.armchair(c.G, q2, c.T, c.R);
}
if (c.lvl >= 2) {
var pm = dmkArtMat("portrait", { w: 128, h: 160 }), gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 });
c.cells.forEach(function (p, k) { if (k % (c.lvl >= 3 ? 3 : 5))
return; var g = dmkOnWall(c.G, p, 0, 0.05); wBox(1.3, 1.6, 0.08, gilt, 0, 3.6, 0, g); dmkPlane(g, pm, 1.1, 1.4, 0, 3.6, 0.05); });
}
},
function (c) {
var rm = dmkPlaneTex("art-runes", dmkLite() ? 256 : 512, dmkLite() ? 256 : 512, DMK_WALLART.runes, { alpha: 1, glow: 0xB89AFF, ei: 1.4 });
for (var i = 0; i < c.n(0.4, 0.7, 1); i++) {
var p = c.mid();
if (!p)
break;
var d = dmkPlane(c.G, rm, 4.2, 4.2, p.x, 0.03, p.z);
d.rotation.x = -Math.PI / 2;
var gl = wGlow(0xB89AFF, 3, 0.3);
gl.position.set(p.x, 0.4, p.z);
c.G.add(gl);
DMKW.torches.push({ x: p.x, y: 0.8, z: p.z, col: 0xB89AFF });
}
for (var k = 0; k < c.n(0.8, 1.3); k++) {
var q = c.mid() || c.wall();
if (!q)
break;
dmkProp.floatcrystal(c.G, q, c.T, c.R);
}
for (var a = 0; a < c.n(0.5, 0.9); a++) {
var w = c.wall();
if (!w)
break;
dmkProp.alchemy(c.G, w, c.T, c.R);
}
var sm = dmkArtMat("stars", { w: 256, h: 256 });
c.cells.forEach(function (p, k) { if (k % Math.max(2, 6 - c.lvl * 1))
return; var g = dmkOnWall(c.G, p, 0, 0.05); dmkPlane(g, sm, 1.8, 1.8, 0, 3.8, 0); });
if (c.lvl >= 3) {
var q2 = c.mid();
if (q2)
dmkProp.armillary(c.G, q2, c.T, c.R);
}
},
function (c) {
var lava = dmkM("lava", 0xFF6A20, { e: 0xFF4A10, ei: 1.6, r: 0.6 }), rim = dmkStoneMat(c.T, "forge", 0.7);
c.cells.forEach(function (p, k) {
if (k % Math.max(1, 3 - c.lvl))
return;
var g = dmkOnWall(c.G, p, 0, 0.4);
wBox(2.02, 0.06, 0.5, lava, 0, 0.02, 0, g);
wBox(2.02, 0.14, 0.1, rim, 0, 0.07, 0.3, g);
if (k % 2 === 0) {
var gl = wGlow(0xFF6A20, 2.4, 0.45);
gl.position.set(0, 0.4, 0.1);
g.add(gl);
}
});
var lv = c.cells.filter(function (p, k) { return k % Math.max(1, 3 - c.lvl) === 0; });
lv.forEach(function (p, k) { if (k % 3 === 0)
DMKW.torches.push({ x: p.x + Math.sin(p.a) * 0.4, y: 0.6, z: p.z + Math.cos(p.a) * 0.4, col: 0xFF6A20 }); });
for (var a = 0; a < c.n(0.6, 1); a++) {
var q = c.mid();
if (!q)
break;
dmkProp.anvil(c.G, q, c.T, c.R);
}
for (var u = 0; u < c.n(0.3, 0.6); u++) {
var q2 = c.mid() || c.wall();
if (!q2)
break;
dmkProp.crucible(c.G, q2, c.T, c.R);
}
if (c.lvl >= 2)
for (var f = 0; f < c.n(0, 0.4, 1); f++) {
var w = c.wall();
if (!w)
break;
dmkProp.hearth(c.G, w, c.T, c.R, 1);
}
},
function (c) {
dmkRoots(c, c.n(2, 4), 0x5A4630);
var ivy = dmkPlaneTex("art-ivy", 256, 256, DMK_WALLART.ivy, { alpha: 1 });
c.cells.forEach(function (p, k) { if (k % Math.max(1, 3 - c.lvl))
return; var g = dmkOnWall(c.G, p, 0, 0.06); var hh = Math.round(4 + c.R() * 2); dmkPlane(g, ivy, 2.4, hh, 0, c.h - hh / 2, 0); });
for (var i = 0; i < c.n(0.6, 1); i++) {
var p = c.mid();
if (!p)
break;
dmkProp.drum(c.G, p, c.T, c.R);
}
var moss = dmkM("moss", 0x3E5A28, { r: 1 });
for (var m = 0; m < c.n(2, 3); m++) {
var x = (c.r.x + 0.5 + c.R() * (c.r.w - 1)) * DMK_CELL, z = (c.r.z + 0.5 + c.R() * (c.r.l - 1)) * DMK_CELL, d = new THREE.Mesh(dmkGeo("puddle", function () { return new THREE.CircleGeometry(1, 16); }), moss);
d.rotation.x = -Math.PI / 2;
d.position.set(x, 0.015 + m * 0.0005, z);
d.scale.set(0.8 + c.R() * 1.6, 0.6 + c.R(), 1);
c.G.add(d);
}
if (c.lvl >= 3 && c.r.w >= 5 && c.r.l >= 5)
dmkProp.tree(c.G, { x: (c.r.x + c.r.w / 2) * DMK_CELL + 2.5, z: (c.r.z + c.r.l / 2) * DMK_CELL + 2.5 }, c.T, c.R, c.h);
},
function (c) {
var brass = dmkM("brass", 0xB08A40, { m: 0.85, r: 0.3 }), iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 }), copper = dmkM("copper", 0x9A5A38, { m: 0.85, r: 0.35 }), th = dmkTh();
c.cells.forEach(function (p, k) {
if (k % Math.max(1, 4 - c.lvl))
return;
var g = dmkOnWall(c.G, p, 0, 0.12);
var r1 = 0.5 + c.R() * 0.7, gm = new THREE.Mesh(dmkGearGeo(Math.round(r1 * 10) / 10, 10 + Math.round(r1 * 8)), k % 2 ? brass : iron);
gm.position.set((c.R() - 0.5) * 0.6, 2.8 + c.R() * 2.2, 0);
g.add(gm);
th.spin.push({ m: gm, s: (k % 2 ? 1 : -1) * (0.25 / r1) });
if (c.lvl >= 1 && k % 2 === 0) {
var r2 = 0.3 + c.R() * 0.3, g2 = new THREE.Mesh(dmkGearGeo(Math.round(r2 * 10) / 10, 8 + Math.round(r2 * 8)), copper);
g2.position.set(gm.position.x + r1 + r2 * 0.85, gm.position.y + 0.2, 0.05);
g.add(g2);
th.spin.push({ m: g2, s: (k % 2 ? -1 : 1) * (0.25 / r2) });
}
});
c.cells.forEach(function (p, k) { if (k % 2)
return; var g = dmkOnWall(c.G, p, 0, 0.22); var pp = wCyl(0.09, 0.09, 2.02, copper, 0, c.h - 1.6, 0, g, 8); pp.rotation.z = Math.PI / 2; if (c.lvl >= 2) {
var p2 = wCyl(0.06, 0.06, 2.02, brass, 0, c.h - 1.95, 0.05, g, 8);
p2.rotation.z = Math.PI / 2;
} });
for (var i = 0; i < c.n(0.3, 0.6); i++) {
var q = c.wall();
if (!q)
break;
dmkProp.pendulum(c.G, q, c.T, c.R);
}
if (c.lvl >= 2) {
var q2 = c.mid();
if (q2)
dmkProp.biggear(c.G, q2, c.T, c.R);
}
},
function (c) {
for (var i = 0; i < c.n(1, 1.6); i++) {
var x = (c.r.x + 0.5 + c.R() * (c.r.w - 1)) * DMK_CELL, z = (c.r.z + 0.5 + c.R() * (c.r.l - 1)) * DMK_CELL;
dmkProp.lantern(c.G, { x: x, z: z }, c.T, c.R, c.h);
}
var net = dmkPlaneTex("art-net", 256, 256, DMK_WALLART.net, { alpha: 1 });
c.cells.forEach(function (p, k) { if (k % Math.max(2, 5 - c.lvl))
return; var g = dmkOnWall(c.G, p, 0, 0.08); dmkPlane(g, net, 2.4, 2.4, 0, 3.2, 0).rotation.z = (c.R() - 0.5) * 0.3; });
for (var k = 0; k < c.n(0.8, 1.3); k++) {
var q = c.wall();
if (!q)
break;
dmkProp.cratestack(c.G, q, c.T, c.R);
}
if (c.lvl >= 1)
for (var b = 0; b < c.n(0, 0.3, 1); b++) {
var q2 = c.mid();
if (!q2)
break;
dmkProp.rowboat(c.G, q2, c.T, c.R);
}
for (var r2 = 0; r2 < c.n(0.4, 0.6); r2++) {
var q3 = c.mid() || c.wall();
if (!q3)
break;
dmkProp.rope(c.G, q3, c.T, c.R);
}
if (c.lvl >= 3)
for (var g2 = 0; g2 < c.n(0, 0.6); g2++) {
var q4 = c.mid();
if (!q4)
break;
dmkProp.gold(c.G, q4, c.T, c.R);
}
},
function (c, n, col) {
var bark = dmkM("root" + col, col, { r: 0.95 }), lite = dmkLite();
for (var i = 0; i < n; i++) {
var x = (c.r.x + 0.5 + c.R() * (c.r.w - 1)) * DMK_CELL, z = (c.r.z + 0.5 + c.R() * (c.r.l - 1)) * DMK_CELL, pts = [], y = c.h, dx = (c.R() - 0.5) * 0.6, dz = (c.R() - 0.5) * 0.6, len = 2 + c.R() * (c.h * 0.55);
for (var k = 0; k < 5; k++) {
pts.push(new THREE.Vector3(x + dx * k + (c.R() - 0.5) * 0.4, y - len * k / 4, z + dz * k + (c.R() - 0.5) * 0.4));
}
var tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), lite ? 6 : 12, 0.06 + c.R() * 0.12, lite ? 4 : 6, false), bark);
c.G.add(tube);
}
},
function (G, p, T, R) {
var st = dmkStoneMat(T, "eff", 1.25), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = R() < 0.5 ? 0 : Math.PI / 2;
G.add(g);
wBox(2.5, 0.9, 1.15, st, 0, 0.45, 0, g);
wBox(2.7, 0.12, 1.3, st, 0, 0.96, 0, g);
wBox(2.7, 0.14, 1.3, st, 0, 0.07, 0, g);
var body = wBox(1.7, 0.22, 0.5, st, -0.05, 1.13, 0, g);
var hd = wSph(0.17, st, 1.0, 1.18, 0, g, 10);
var hands = wBox(0.18, 0.3, 0.18, st, 0.15, 1.33, 0, g);
var sw = wBox(1.2, 0.04, 0.1, st, -0.2, 1.26, 0, g);
var pil = wBox(0.4, 0.12, 0.6, st, 1.05, 1.07, 0, g);
dmkSolid(p.x, p.z, 1.35);
},
function (G, p, T, R) {
var st = dmkStoneMat(T, "drum", 1.15), n = 1 + Math.floor(R() * 3);
for (var i = 0; i < n; i++) {
var d = wCyl(0.55, 0.55, 1.1, st, p.x + (i - 1) * 1.0, 0.55, p.z + (R() - 0.5) * 1.2, G, dmkLite() ? 10 : 18);
d.rotation.z = Math.PI / 2;
d.rotation.y = R() * 3;
d.position.y = 0.55;
}
if (R() < 0.5)
wCyl(0.55, 0.6, 0.9 + R() * 1.5, st, p.x + 1.4, 0.6, p.z - 0.8, G, dmkLite() ? 10 : 18);
dmkSolid(p.x, p.z, 1.3);
},
function (G, p, T, R) {
var gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), st = dmkStoneMat(T, "idolb", 0.9), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.1, 0, p.z - Math.cos(p.a) * 0.1);
g.rotation.y = p.a;
G.add(g);
wBox(1.4, 1.2, 1.2, st, 0, 0.6, 0, g);
wBox(1.6, 0.15, 1.4, st, 0, 1.27, 0, g);
var body = dmkMesh(dmkGeo("idolb", function () { return new THREE.LatheGeometry([new THREE.Vector2(0.55, 0), new THREE.Vector2(0.5, 0.4), new THREE.Vector2(0.32, 1.1), new THREE.Vector2(0.38, 1.5), new THREE.Vector2(0.2, 1.65), new THREE.Vector2(0, 1.7)], dmkLite() ? 8 : 16); }), gilt, 0, 1.35, 0, g);
var hd = wSph(0.27, gilt, 0, 3.25, 0, g, 12);
var cr = wCone(0.22, 0.45, gilt, 0, 3.62, 0, g, 8);
[-1, 1].forEach(function (s) { var a = wCyl(0.08, 0.07, 0.9, gilt, s * 0.45, 2.6, 0.2, g, 6); a.rotation.z = s * 0.5; a.rotation.x = -0.5; });
var gem = wSph(0.08, dmkM("emerald", 0x20A060, { e: 0x10A040, ei: 1.2, r: 0.1 }), 0, 3.3, 0.25, g, 8);
var gl = wGlow(0x7AFFC0, 1.6, 0.5);
gl.position.set(0, 3.3, 0.35);
g.add(gl);
dmkSolid(g.position.x, g.position.z, 0.9);
},
function (G, p, T, R) {
var iron = dmkM("anvil", 0x3A3A3C, { m: 0.85, r: 0.35 }), w = dmkWood(), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = R() * 3;
G.add(g);
wCyl(0.4, 0.45, 0.6, w, 0, 0.3, 0, g, 10);
wBox(0.35, 0.25, 0.3, iron, 0, 0.72, 0, g);
wBox(0.9, 0.22, 0.36, iron, 0.05, 0.95, 0, g);
var h = wCone(0.17, 0.4, iron, 0.65, 0.95, 0, g, 8);
h.rotation.z = -Math.PI / 2;
var hm = wBox(0.08, 0.08, 0.45, w, -0.2, 1.12, 0.1, g);
hm.rotation.y = 0.5;
wBox(0.12, 0.12, 0.2, iron, -0.3, 1.12, 0.28, g).rotation.y = 0.5;
dmkSolid(p.x, p.z, 0.7);
},
function (G, p, T, R, big) {
var st = dmkStoneMat(T, "hearth", 0.8), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.2, 0, p.z - Math.cos(p.a) * 0.2);
g.rotation.y = p.a;
G.add(g);
var s = big ? 1.4 : 1;
wBox(2.4 * s, 0.5, 1.2, st, 0, 0.25, 0, g);
wBox(0.4, 2.2 * s, 1.2, st, -1.0 * s, 1.35 * s, 0, g);
wBox(0.4, 2.2 * s, 1.2, st, 1.0 * s, 1.35 * s, 0, g);
wBox(2.4 * s, 0.5, 1.3, st, 0, 2.4 * s, 0, g);
wCyl(0.6 * s, 0.9 * s, 2.5, st, 0, 3.9 * s, -0.2, g, 8);
var coal = dmkM("coal", 0x1A1210, { r: 1 });
for (var i = 0; i < 8; i++)
wSph(0.12, coal, (R() - 0.5) * 1.2 * s, 0.55, (R() - 0.5) * 0.6, g, 5);
var f = dmkMesh(dmkGeo("fire", function () { return new THREE.ConeGeometry(0.22, 0.6, 7); }), dmkM("flame", 0xFFC070, { e: 0xFF8A30, ei: 1.6 }), 0, 0.85, 0, g);
f.scale.set(2 * s, 1.4 * s, 1.4);
DMKW.anim.push({ m: f, k: "flame", p: R() * 6 });
var gl = wGlow(0xFF8A30, 3.2 * s, 0.6);
gl.position.set(0, 1.0, 0.2);
g.add(gl);
var wp = new THREE.Vector3(0, 1, 0.9).applyAxisAngle(new THREE.Vector3(0, 1, 0), p.a);
DMKW.torches.push({ x: g.position.x + wp.x, y: 1.2, z: g.position.z + wp.z, col: 0xFF8A40 });
dmkSolid(g.position.x, g.position.z, 1.3 * s);
},
function (G, p, T, R) {
var st = dmkStoneMat(T, "king", 1.15), gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.1, 0, p.z - Math.cos(p.a) * 0.1);
g.rotation.y = p.a;
G.add(g);
wBox(1.6, 0.8, 1.4, st, 0, 0.4, 0, g);
wBox(1.3, 1.6, 0.9, st, 0, 1.6, 0, g);
wBox(1.5, 0.9, 1.0, st, 0, 2.75, 0, g);
var hd = wSph(0.38, st, 0, 3.6, 0, g, 12);
var beard = wCone(0.42, 1.3, st, 0, 2.8, 0.35, g, 8);
beard.rotation.x = Math.PI;
var crown = wCyl(0.4, 0.36, 0.3, gilt, 0, 4.0, 0, g, 10);
var ax = wBox(0.08, 2.4, 0.08, st, 0.75, 2.0, 0.4, g);
wBox(0.6, 0.5, 0.06, st, 0.75, 3.1, 0.4, g);
wBox(1.4, 0.12, 0.06, gilt, 0, 2.25, 0.52, g);
dmkSolid(g.position.x, g.position.z, 0.95);
},
function (G, p, T, R) {
var gold = dmkM("gold", 0xD8A838, { m: 0.9, r: 0.28 }), geo = dmkGeo("ingot", function () { return new THREE.BoxGeometry(0.3, 0.1, 0.14); });
for (var l = 0; l < 4; l++)
for (var i = 0; i < 4 - l; i++)
for (var j = 0; j < 3; j++) {
var m = new THREE.Mesh(geo, gold);
m.position.set(p.x + (i - (3 - l) / 2) * 0.32, 0.05 + l * 0.1, p.z + (j - 1) * 0.16);
m.rotation.y = l % 2 ? 0 : 0;
G.add(m);
}
dmkSolid(p.x, p.z, 0.8);
},
function (G, p, T, R) {
var egg = dmkM("eggsac", 0xE8E2D0, { r: 0.6, op: 0.9, e: 0x403828, ei: 0.3 }), geo = dmkGeo("egg", function () { var q = new THREE.SphereGeometry(0.3, dmkLite() ? 6 : 10, dmkLite() ? 5 : 8); q.scale(1, 1.3, 1); return q; });
for (var i = 0; i < (dmkLite() ? 4 : 9); i++) {
var m = new THREE.Mesh(geo, egg);
m.position.set(p.x + (R() - 0.5) * 1.3, 0.3 + R() * 0.3, p.z + (R() - 0.5) * 1.3);
m.scale.setScalar(0.6 + R() * 0.7);
G.add(m);
}
var s = new THREE.Mesh(dmkGeo("webpl", function () { return new THREE.PlaneGeometry(2.6, 2.6); }), dmkWebMat());
s.position.set(p.x, 0.9, p.z);
s.rotation.set(-1.1, R() * 3, 0);
G.add(s);
dmkSolid(p.x, p.z, 0.8);
},
function (G, p, T, R, h) {
var silk = dmkM("cocoon", 0xD8D0C0, { r: 0.8 }), y = h - 1.6 - R() * 1.5, g = new THREE.Group();
g.position.set(p.x + (R() - 0.5), y, p.z + (R() - 0.5));
G.add(g);
var c = dmkMesh(dmkGeo("cocoon", function () { var q = new THREE.SphereGeometry(0.35, dmkLite() ? 6 : 12, dmkLite() ? 6 : 10); q.scale(1, 2.8, 1); return q; }), silk, 0, 0, 0, g);
c.rotation.z = (R() - 0.5) * 0.3;
wCyl(0.015, 0.015, h - y, dmkM("web", 0xE8E0F0, { op: 0.5, side: true, r: 1 }), 0, (h - y) / 2 + 0.8, 0, g, 3);
},
function (G, p, T, R) {
var glass = dmkM("iceglass", 0xCFE8FF, { r: 0.05, m: 0.1, op: 0.75, e: 0x406080, ei: 0.4 }), geo = dmkGeo("icecr", function () { var q = new THREE.OctahedronGeometry(0.4, 0); q.scale(0.6, 2.4, 0.6); return q; });
for (var i = 0; i < (dmkLite() ? 3 : 7); i++) {
var m = new THREE.Mesh(geo, glass);
var s = 0.5 + R() * 1.2;
m.position.set(p.x + (R() - 0.5) * 1.2, 0.4 * s, p.z + (R() - 0.5) * 1.2);
m.scale.setScalar(s);
m.rotation.set((R() - 0.5) * 0.8, R() * 3, (R() - 0.5) * 0.8);
G.add(m);
}
var gl = wGlow(0xA8D8FF, 2.2, 0.3);
gl.position.set(p.x, 0.9, p.z);
G.add(gl);
dmkSolid(p.x, p.z, 0.8);
},
function (G, p, T, R) {
var glass = dmkM("iceblock", 0xBFE0FF, { r: 0.05, m: 0.1, op: 0.45, dw: 0 }), st = dmkStoneMat(T, "frz", 0.6), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = R() * 3;
G.add(g);
var robe = dmkMesh(dmkGeo("robe", function () { return new THREE.LatheGeometry([new THREE.Vector2(0.45, 0), new THREE.Vector2(0.4, 0.5), new THREE.Vector2(0.3, 1.2), new THREE.Vector2(0.24, 1.7), new THREE.Vector2(0.27, 1.85), new THREE.Vector2(0, 1.9)], dmkLite() ? 8 : 16); }), dmkM("frozenfig", 0x4A5A6A, { r: 0.5 }), 0, 0, 0, g);
wSph(0.17, dmkM("frozenfig", 0x4A5A6A, { r: 0.5 }), 0, 2.05, 0, g, 10);
var sw = wBox(0.06, 1.4, 0.04, dmkM("steel", 0xB8BCC4, { m: 0.9, r: 0.25 }), 0.35, 1.4, 0.2, g);
sw.rotation.z = 0.3;
var bl = wBox(1.5, 2.7, 1.3, glass, 0, 1.35, 0, g);
bl.rotation.y = 0.2;
bl.renderOrder = 2;
dmkSolid(p.x, p.z, 0.95);
},
function (G, p, T, R, lvl) {
var stem = dmkM("bstem", 0x9A9078, { r: 0.95 }), caps = [dmkM("capb", 0x4AA888, { e: 0x1A6A5A, ei: 0.5, r: 0.55 }), dmkM("capv", 0x7A4AA8, { e: 0x3A1A6A, ei: 0.5, r: 0.55 }), dmkM("capo", 0xB07A3A, { e: 0x4A2A08, ei: 0.4, r: 0.55 })];
var s = 1.6 + R() * (1.2 + lvl * 0.9), cap = caps[Math.floor(R() * 3)], gill = dmkM("gill", 0x6A5A48, { r: 1 });
wCyl(0.12 * s, 0.2 * s, 1.6 * s, stem, p.x, 0.8 * s, p.z, G, 8);
var c = dmkMesh(dmkGeo("bcap", function () { return new THREE.SphereGeometry(0.75, dmkLite() ? 10 : 18, dmkLite() ? 5 : 9, 0, Math.PI * 2, 0, Math.PI / 2); }), cap, p.x, 1.55 * s, p.z, G);
c.scale.set(s, s * 0.6, s);
var u = new THREE.Mesh(dmkGeo("bgill", function () { return new THREE.CircleGeometry(0.75, dmkLite() ? 10 : 18); }), gill);
u.rotation.x = Math.PI / 2;
u.position.set(p.x, 1.55 * s, p.z);
u.scale.setScalar(s);
G.add(u);
for (var i = 0; i < (dmkLite() ? 3 : 6); i++) {
var ss = 0.3 + R() * 0.6;
wCyl(0.05 * ss, 0.08 * ss, 0.8 * ss, stem, p.x + (R() - 0.5) * 2.4, 0.4 * ss, p.z + (R() - 0.5) * 2.4, G, 6);
var cc = dmkMesh(dmkGeo("cap", function () { return new THREE.SphereGeometry(0.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), cap, p.x + (R() - 0.5) * 2.4, 0.8 * ss, p.z + (R() - 0.5) * 2.4, G);
cc.scale.setScalar(ss * 0.6);
}
var gl = wGlow(cap.emissive.getHex(), 1.4 * s, 0.16);
gl.position.set(p.x, 1.3 * s, p.z);
G.add(gl);
DMKW.torches.push({ x: p.x, y: 1.2 * s, z: p.z, col: cap.color.getHex() });
dmkSolid(p.x, p.z, 0.3 * s);
},
function (G, p, T, R) {
var cl = [dmkM("jar1", 0xC8B890, { r: 0.6 }), dmkM("jar2", 0x7A9AA0, { r: 0.4, m: 0.1 })], gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.2, 0, p.z - Math.cos(p.a) * 0.2);
g.rotation.y = p.a;
G.add(g);
wBox(1.8, 0.6, 0.7, dmkStoneMat(T, "jart", 1.1), 0, 0.3, 0, g);
for (var i = 0; i < 4; i++) {
var x = -0.66 + i * 0.44, m = cl[i % 2];
dmkMesh(dmkGeo("jar", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.14, 0.02), new THREE.Vector2(0.17, 0.25), new THREE.Vector2(0.11, 0.45), new THREE.Vector2(0.08, 0.48), new THREE.Vector2(0, 0.5)], dmkLite() ? 8 : 12); }), m, x, 0.6, 0, g);
var hd = wSph(0.1, i % 2 ? gilt : m, x, 1.17, 0, g, 8);
}
var urn = dmkMesh(dmkGeo("urn", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.25, 0.05), new THREE.Vector2(0.38, 0.5), new THREE.Vector2(0.2, 0.95), new THREE.Vector2(0.26, 1.05), new THREE.Vector2(0, 1.05)], dmkLite() ? 8 : 14); }), dmkM("urnc", 0x8A4A2A, { r: 0.7 }), 1.3, 0, 0, g);
dmkSolid(g.position.x, g.position.z, 1.1);
},
function (G, p, T, R) {
var gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), blue = dmkM("lapis", 0x1E4E8C, { r: 0.4, m: 0.2 }), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.25, 0, p.z - Math.cos(p.a) * 0.25);
g.rotation.y = p.a;
G.add(g);
var b = dmkMesh(dmkGeo("mcase", function () { var q = new THREE.CylinderGeometry(0.42, 0.32, 2.3, dmkLite() ? 10 : 18); q.scale(1, 1, 0.55); return q; }), gilt, 0, 1.25, 0, g);
var hd = wSph(0.42, gilt, 0, 2.45, 0, g, 12);
hd.scale.set(1, 1.15, 0.6);
for (var s = 0; s < 4; s++)
wBox(0.8, 0.07, 0.02, blue, 0, 1.9 - s * 0.3, 0.24, g);
[-1, 1].forEach(function (s2) { wBox(0.22, 0.9, 0.04, blue, s2 * 0.32, 2.25, 0.1, g); });
var face = wBox(0.32, 0.4, 0.04, dmkM("face", 0xC8946A, { r: 0.5 }), 0, 2.48, 0.23, g);
wBox(1.2, 0.12, 0.8, dmkStoneMat(T, "mcb", 0.9), 0, 0.06, 0, g);
dmkSolid(g.position.x, g.position.z, 0.6);
},
function (G, p, T, R) {
var st = dmkStoneMat(T, "obel", 1.0), gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), fr = dmkArtMat("tomb");
wBox(1.4, 0.4, 1.4, st, p.x, 0.2, p.z, G);
var o = wCyl(0.32, 0.5, 5, st, p.x, 2.9, p.z, G, 4);
o.rotation.y = Math.PI / 4;
var tip = wCone(0.34, 0.6, gilt, p.x, 5.7, p.z, G, 4);
tip.rotation.y = Math.PI / 4;
dmkSolid(p.x, p.z, 0.8);
},
function (G, p, T, R) {
var bone = dmkM("bone", 0xD8CCB0, { r: 0.75 }), sk = dmkGeo("skull", function () { var q = new THREE.SphereGeometry(0.13, 10, 8); q.scale(1, 0.9, 1.15); return q; });
var n = dmkLite() ? 3 : 5;
for (var l = 0; l < n; l++) {
var k = n - l, rr = 0.18 * k;
for (var i = 0; i < k * 3; i++) {
var a = i / (k * 3) * Math.PI * 2, m = new THREE.Mesh(sk, bone);
m.position.set(p.x + Math.cos(a) * rr, 0.12 + l * 0.22, p.z + Math.sin(a) * rr);
m.rotation.y = -a + Math.PI / 2;
G.add(m);
}
}
dmkSolid(p.x, p.z, 0.9);
},
function (G, p, T, R) {
var w = dmkWood(), glass = [dmkM("bottle1", 0x1E3A1E, { r: 0.15, m: 0.2 }), dmkM("bottle2", 0x3A1018, { r: 0.15, m: 0.2 })], g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.2, 0, p.z - Math.cos(p.a) * 0.2);
g.rotation.y = p.a;
G.add(g);
wBox(1.8, 2.4, 0.06, w, 0, 1.2, -0.3, g);
wBox(0.08, 2.4, 0.6, w, -0.9, 1.2, 0, g);
wBox(0.08, 2.4, 0.6, w, 0.9, 1.2, 0, g);
var bg = dmkGeo("bottle", function () { var q = new THREE.CylinderGeometry(0.07, 0.07, 0.5, dmkLite() ? 5 : 8); q.rotateX(Math.PI / 2); return q; });
for (var r = 0; r < 5; r++) {
wBox(1.8, 0.04, 0.6, w, 0, 0.2 + r * 0.45, 0, g);
for (var b = 0; b < (dmkLite() ? 5 : 9); b++) {
if (R() < 0.15)
continue;
var m = new THREE.Mesh(bg, glass[(r + b) % 2]);
m.position.set(-0.75 + b * (1.5 / ((dmkLite() ? 5 : 9) - 1)), 0.31 + r * 0.45, 0.05);
g.add(m);
}
}
dmkSolid(g.position.x, g.position.z, 0.95);
},
function (G, p, T, R) {
var w = dmkWood(), hoop = dmkM("hoop", 0x3A3430, { m: 0.6, r: 0.5 }), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.1, 0, p.z - Math.cos(p.a) * 0.1);
g.rotation.y = p.a;
G.add(g);
wBox(1.6, 0.3, 0.2, w, 0, 0.15, -0.4, g);
wBox(1.6, 0.3, 0.2, w, 0, 0.15, 0.4, g);
var c = wCyl(0.7, 0.7, 1.5, w, 0, 0.95, 0, g, dmkLite() ? 10 : 16);
c.rotation.z = Math.PI / 2;
[-0.6, 0, 0.6].forEach(function (x) { var h = wCyl(0.72, 0.72, 0.06, hoop, x, 0.95, 0, g, 16); h.rotation.z = Math.PI / 2; });
wCyl(0.05, 0.05, 0.2, w, 0.78, 0.7, 0, g, 6).rotation.z = Math.PI / 2;
dmkSolid(g.position.x, g.position.z, 0.9);
},
function (G, p, T, R) {
var w = dmkWood(), cl = dmkM("velvet", [0x5A1A1A, 0x1A3A2A, 0x2A1A4A][Math.floor(R() * 3)], { r: 0.95 }), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = R() * 6;
G.add(g);
wBox(0.9, 0.45, 0.9, cl, 0, 0.32, 0, g);
wBox(0.9, 1.0, 0.2, cl, 0, 0.9, -0.4, g);
wBox(0.18, 0.35, 0.9, cl, -0.45, 0.65, 0, g);
wBox(0.18, 0.35, 0.9, cl, 0.45, 0.65, 0, g);
[[-0.38, -0.38], [0.38, -0.38], [-0.38, 0.38], [0.38, 0.38]].forEach(function (q) { wBox(0.08, 0.12, 0.08, w, q[0], 0.06, q[1], g); });
var tb = wCyl(0.35, 0.35, 0.05, w, 1.0, 0.65, 0.2, g, 12);
wCyl(0.05, 0.08, 0.62, w, 1.0, 0.32, 0.2, g, 6);
wCyl(0.04, 0.04, 0.2, dmkM("wax", 0xEDE4CC, { r: 0.7 }), 1.0, 0.78, 0.2, g, 6);
var gl = wGlow(0xFFC880, 0.9, 0.5);
gl.position.set(1.0, 0.95, 0.2);
g.add(gl);
dmkSolid(p.x, p.z, 1.0);
},
function (G, p, T, R) {
var cm = dmkM("crystal", 0xB89AFF, { e: 0xB89AFF, ei: 0.9, r: 0.2, op: 0.85 }), st = dmkStoneMat(T, "fcp", 1.1);
wCyl(0.4, 0.5, 0.9, st, p.x, 0.45, p.z, G, 8);
var c = dmkMesh(dmkGeo("fcry", function () { var q = new THREE.OctahedronGeometry(0.35, 0); q.scale(0.7, 1.6, 0.7); return q; }), cm, p.x, 1.8, p.z, G);
dmkTh().bob.push({ m: c, y0: 1.8, p: R() * 6 });
var gl = wGlow(0xB89AFF, 2.4, 0.4);
gl.position.set(p.x, 1.8, p.z);
G.add(gl);
DMKW.torches.push({ x: p.x, y: 1.8, z: p.z, col: 0xB89AFF });
dmkSolid(p.x, p.z, 0.6);
},
function (G, p, T, R) {
var w = dmkWood(), cols = [0x40C080, 0xC04060, 0x4080E0, 0xE0B040, 0x9A60E0], g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.15, 0, p.z - Math.cos(p.a) * 0.15);
g.rotation.y = p.a;
G.add(g);
wBox(2.0, 0.1, 0.8, w, 0, 0.9, 0, g);
[[-0.9, -0.32], [0.9, -0.32], [-0.9, 0.32], [0.9, 0.32]].forEach(function (q) { wBox(0.08, 0.88, 0.08, w, q[0], 0.44, q[1], g); });
for (var i = 0; i < (dmkLite() ? 4 : 7); i++) {
var c = cols[i % 5], m = dmkM("potion" + (i % 5), c, { e: c, ei: 0.5, r: 0.1, op: 0.85 }), x = -0.8 + i * 0.27;
if (i % 3 === 0) {
wSph(0.12, m, x, 1.07, 0, g, 10);
wCyl(0.03, 0.03, 0.18, m, x, 1.25, 0, g, 6);
}
else
wCyl(0.05, 0.07, 0.22 + R() * 0.15, m, x, 1.07, (R() - 0.5) * 0.4, g, 8);
}
var bk = wBox(0.4, 0.08, 0.3, dmkM("bk1", 0x6A1A1A, { r: 0.85 }), 0.6, 1.0, 0.2, g);
bk.rotation.y = 0.3;
var gl = wGlow(0x80FFC0, 1.2, 0.3);
gl.position.set(-0.4, 1.2, 0);
g.add(gl);
dmkSolid(g.position.x, g.position.z, 1.1);
},
function (G, p, T, R) {
var gilt = dmkM("gilt", 0xB8903A, { m: 0.8, r: 0.3 }), st = dmkStoneMat(T, "arm", 1.1), g = new THREE.Group();
g.position.set(p.x, 2.2, p.z);
G.add(g);
wCyl(0.5, 0.7, 1.2, st, p.x, 0.6, p.z, G, 10);
wCyl(0.05, 0.05, 1.0, gilt, p.x, 1.6, p.z, G, 6);
for (var i = 0; i < 3; i++) {
var r = new THREE.Mesh(dmkGeo("arm" + i, function () { return new THREE.TorusGeometry(0.9 - i * 0.12, 0.03, 5, dmkLite() ? 16 : 32); }), gilt);
r.rotation.set(i * 0.9, i * 0.6, 0);
g.add(r);
dmkTh().spin.push({ m: r, s: 0.2 + i * 0.12, ax: "y" });
}
wSph(0.18, dmkM("sun", 0xFFD060, { e: 0xFFA020, ei: 1.2 }), 0, 0, 0, g, 12);
dmkSolid(p.x, p.z, 0.9);
},
function (G, p, T, R) {
var iron = dmkM("anvil", 0x3A3A3C, { m: 0.85, r: 0.35 }), lava = dmkM("lava", 0xFF6A20, { e: 0xFF4A10, ei: 1.6, r: 0.6 });
var c = wCyl(0.7, 0.5, 1.0, iron, p.x, 0.6, p.z, G, dmkLite() ? 10 : 16);
var top = wCyl(0.62, 0.62, 0.04, lava, p.x, 1.09, p.z, G, dmkLite() ? 10 : 16);
wBox(1.8, 0.1, 0.1, iron, p.x, 1.4, p.z, G);
[-0.9, 0.9].forEach(function (x) { wBox(0.1, 1.4, 0.1, iron, p.x + x, 0.7, p.z, G); });
var gl = wGlow(0xFF6A20, 2.6, 0.5);
gl.position.set(p.x, 1.3, p.z);
G.add(gl);
DMKW.torches.push({ x: p.x, y: 1.5, z: p.z, col: 0xFF7030 });
dmkSolid(p.x, p.z, 0.95);
},
function (G, p, T, R, h) {
var bark = dmkM("bark", 0x4A3A2A, { r: 0.95 }), leaf = dmkM("leaf", 0x3A5A28, { r: 0.9 }), lite = dmkLite();
var t = wCyl(0.35, 0.6, h, bark, p.x, h / 2, p.z, G, lite ? 8 : 12);
for (var b = 0; b < (lite ? 3 : 6); b++) {
var a = b / 6 * Math.PI * 2, br = wCyl(0.08, 0.18, 2.6, bark, p.x + Math.cos(a) * 0.9, h * 0.55 + b * 0.35, p.z + Math.sin(a) * 0.9, G, 6);
br.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9);
}
for (var l = 0; l < (lite ? 4 : 9); l++) {
var s = wSph(1.2 + R() * 0.8, leaf, p.x + (R() - 0.5) * 3.4, h - 1.4 - R() * 1.6, p.z + (R() - 0.5) * 3.4, G, lite ? 6 : 9);
s.scale.y = 0.7;
}
for (var r = 0; r < (lite ? 3 : 6); r++) {
var a2 = r / 6 * Math.PI * 2, rt = wCyl(0.08, 0.25, 1.6, bark, p.x + Math.cos(a2) * 0.8, 0.2, p.z + Math.sin(a2) * 0.8, G, 5);
rt.rotation.set(Math.sin(a2) * 1.2, 0, -Math.cos(a2) * 1.2);
}
var sh = wGlow(0xFFF0C0, 6, 0.3);
sh.position.set(p.x, h - 0.5, p.z);
G.add(sh);
DMKW.torches.push({ x: p.x, y: h - 1, z: p.z, col: 0xFFF0C0 });
dmkSolid(p.x, p.z, 0.8);
},
function (G, p, T, R) {
var brass = dmkM("brass", 0xB08A40, { m: 0.85, r: 0.3 }), w = dmkWood(), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.25, 0, p.z - Math.cos(p.a) * 0.25);
g.rotation.y = p.a;
G.add(g);
wBox(1.0, 3.6, 0.6, w, 0, 1.8, 0, g);
wBox(1.2, 0.2, 0.7, w, 0, 3.7, 0, g);
var face = wCyl(0.4, 0.4, 0.05, dmkM("dial", 0xEDE4CC, { r: 0.6 }), 0, 3.0, 0.31, g, 24);
face.rotation.x = Math.PI / 2;
var hd = wCyl(0.44, 0.44, 0.04, brass, 0, 3.0, 0.3, g, 24);
hd.rotation.x = Math.PI / 2;
wBox(0.03, 0.32, 0.02, dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 }), 0, 3.08, 0.34, g);
dmkMesh(dmkGeo("glassp", function () { return new THREE.PlaneGeometry(0.7, 1.8); }), dmkM("glassc", 0xAACCDD, { r: 0.05, op: 0.25 }), 0, 1.6, 0.31, g);
var pg = new THREE.Group();
pg.position.set(0, 2.5, 0.2);
g.add(pg);
wCyl(0.015, 0.015, 1.4, brass, 0, -0.7, 0, pg, 4);
var bob = wCyl(0.17, 0.17, 0.04, brass, 0, -1.45, 0, pg, 16);
bob.rotation.x = Math.PI / 2;
dmkTh().swing.push({ m: pg, p: R() * 6 });
dmkSolid(g.position.x, g.position.z, 0.7);
},
function (G, p, T, R) {
var brass = dmkM("brass", 0xB08A40, { m: 0.85, r: 0.3 }), iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 });
wBox(0.5, 3.6, 0.5, iron, p.x - 0.4, 1.8, p.z, G);
wBox(0.5, 3.6, 0.5, iron, p.x + 0.4, 1.8, p.z, G);
var gm = new THREE.Mesh(dmkGearGeo(2.6, 28, 0.3), dmkM("brassd", 0x8A6A30, { m: 0.7, r: 0.5 }));
gm.position.set(p.x, 2.8, p.z + 0.45);
G.add(gm);
dmkTh().spin.push({ m: gm, s: 0.12 });
var g2 = new THREE.Mesh(dmkGearGeo(1.2, 14, 0.25), iron);
g2.position.set(p.x + 3.5, 3.5, p.z + 0.45);
G.add(g2);
dmkTh().spin.push({ m: g2, s: -0.26 });
dmkSolid(p.x, p.z, 0.9);
},
function (G, p, T, R, h) {
var iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 }), glass = dmkM("lglass", 0xFFD890, { e: 0xFFA040, ei: 1.2, op: 0.85 }), y = h - 1.6 - R() * 1.5;
wCyl(0.012, 0.012, h - y, iron, p.x, y + (h - y) / 2, p.z, G, 3);
wCyl(0.16, 0.2, 0.36, glass, p.x, y, p.z, G, 6);
wCone(0.22, 0.18, iron, p.x, y + 0.27, p.z, G, 6);
wCyl(0.2, 0.2, 0.04, iron, p.x, y - 0.19, p.z, G, 6);
var gl = wGlow(0xFFC070, 2.4, 0.55);
gl.position.set(p.x, y, p.z);
G.add(gl);
DMKW.torches.push({ x: p.x, y: y, z: p.z, col: 0xFFB060 });
},
function (G, p, T, R) {
var w = dmkWood(), rope = dmkM("rope", 0x9A8458, { r: 1 }), g = new THREE.Group();
g.position.set(p.x - Math.sin(p.a) * 0.25, 0, p.z - Math.cos(p.a) * 0.25);
g.rotation.y = p.a;
G.add(g);
var lay = [[-0.5, 0.4, 0], [0.5, 0.4, 0], [0, 1.2, 0]];
if (R() < 0.5)
lay.push([0.5, 1.2, 0.05]);
lay.forEach(function (q, k) { var c = wBox(0.85, 0.8, 0.85, w, q[0], q[1], q[2], g); c.rotation.y = (R() - 0.5) * 0.25; wBox(0.87, 0.06, 0.87, rope, q[0], q[1], q[2], g).rotation.y = c.rotation.y; wBox(0.06, 0.82, 0.87, rope, q[0], q[1], q[2], g).rotation.y = c.rotation.y; });
dmkSolid(g.position.x, g.position.z, 1.0);
},
function (G, p, T, R) {
var w = dmkWood(), g = new THREE.Group();
g.position.set(p.x, 0.35, p.z);
g.rotation.set(0, R() * 6, 0.12);
G.add(g);
var hull = dmkMesh(dmkGeo("hull", function () { var q = new THREE.SphereGeometry(1, dmkLite() ? 10 : 18, dmkLite() ? 5 : 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); q.scale(2.0, 0.55, 0.75); return q; }), dmkM("hullw", 0x6A4A2E, { r: 0.85, side: true }), 0, 0.35, 0, g);
wBox(0.14, 0.06, 1.35, w, 0.5, 0.25, 0, g);
wBox(0.14, 0.06, 1.25, w, -0.7, 0.25, 0, g);
for (var o = 0; o < 2; o++) {
var oar = wBox(2.6, 0.05, 0.12, w, 0, 0.4 + o * 0.05, (o ? 0.3 : -0.3), g);
oar.rotation.y = (o ? 0.1 : -0.1);
}
dmkSolid(p.x, p.z, 1.6);
},
function (G, p, T, R) {
var rope = dmkM("rope", 0x9A8458, { r: 1 });
for (var i = 0; i < 4; i++) {
var t = new THREE.Mesh(dmkGeo("coil", function () { return new THREE.TorusGeometry(0.4, 0.06, 5, dmkLite() ? 10 : 18); }), rope);
t.rotation.x = Math.PI / 2;
t.position.set(p.x, 0.06 + i * 0.11, p.z);
t.scale.setScalar(1 - i * 0.08);
G.add(t);
}
var a = dmkM("anchor", 0x3A3A3C, { m: 0.8, r: 0.4 });
if (R() < 0.5) {
wBox(0.12, 1.4, 0.12, a, p.x + 0.9, 0.7, p.z, G).rotation.z = 0.4;
}
dmkSolid(p.x, p.z, 0.5);
},
function (G, S, T, i, sp) {
var r = S.rooms[i], K = dmkKind(r.k), lvl = DMK_LVL[r.decor || S.opt.decor];
if (lvl === undefined)
lvl = 2;
var lite = dmkLite(), C = DMK_CELL, area = r.w * r.l, h = dmkRoomH(r);
var R = wRand((S.seed * 53 + i * 331) >>> 0), mul = [0.35, 0.75, 1.1, 1.6][lvl] * (lite ? 0.55 : 1);
var c = { G: G, S: S, T: T, r: r, K: K, lvl: lvl, R: R, h: h, cells: dmkWallCells(S, i),
wall: function () { return sp.wall.shift() || null; }, mid: function () { return sp.mid.shift() || null; },
n: function (lo, hi, force) { var v = Math.round((lo + (hi - lo) * Math.min(1, lvl / 3)) * mul * Math.max(0.5, area / 50) * 1.4); return Math.max(force ? 1 : 0, v); } };
var f = DMK_THEME_DRESS[T.k];
if (f)
try {
f(c);
}
catch (e) {
if (window.console)
console.warn("dungeon theme", T.k, e);
}
if (lvl >= 3 && !K.safe && area >= 16) {
var ck = DMK_CHANDELIER[T.k];
if (ck && !T.cave)
dmkChandelier(G, (r.x + r.w / 2) * C, (r.z + r.l / 2) * C, h, ck, T, R);
if (area >= 30 && ck && !T.cave && r.w >= 6 && r.l >= 6) {
var off = Math.min(r.w, r.l) * C * 0.28;
dmkChandelier(G, (r.x + r.w / 2) * C + (r.w >= r.l ? off : 0), (r.z + r.l / 2) * C + (r.w >= r.l ? 0 : off), h, ck, T, R);
if (!lite)
dmkChandelier(G, (r.x + r.w / 2) * C - (r.w >= r.l ? off : 0), (r.z + r.l / 2) * C - (r.w >= r.l ? 0 : off), h, ck, T, R);
}
if (["crypt", "temple", "dwarf", "tomb", "cellar", "wizard", "clock"].indexOf(T.k) >= 0 && !K.boss)
dmkRunner(G, r, T, R);
if (!T.cave && ["ruin", "forge", "frost", "ossuary"].indexOf(T.k) < 0)
dmkGiltTrim(G, r, h, dmkM(T.k === "clock" ? "brass" : "gilt", T.k === "clock" ? 0xB08A40 : 0xB8903A, { m: 0.8, r: 0.3 }));
}
},
function (dt) {
var th = DMKW.th;
if (!th)
return;
th.spin.forEach(function (s) { if (s.ax === "y")
s.m.rotation.y += s.s * dt;
else
s.m.rotation.z += s.s * dt; });
th.bob.forEach(function (b) { b.p += dt * 1.4; b.m.position.y = b.y0 + Math.sin(b.p) * 0.18; b.m.rotation.y += dt * 0.6; });
th.swing.forEach(function (w) { w.p += dt * 2.6; w.m.rotation.z = Math.sin(w.p) * 0.28; });
},
function (sym, lit) {
DMKW.rt = DMKW.rt || {};
var k = sym + (lit ? 1 : 0);
if (DMKW.rt[k])
return DMKW.rt[k];
var t = wTex(128, 128, function (x, W, H) {
x.fillStyle = lit ? "#3A3020" : "#2A2622";
x.fillRect(0, 0, W, H);
x.strokeStyle = lit ? "#FFD890" : "#8A7A60";
x.lineWidth = 5;
x.strokeRect(6, 6, W - 12, H - 12);
x.fillStyle = lit ? "#FFE8B0" : "#C8B898";
x.font = "bold 76px Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(sym, W / 2, H / 2 + 4);
});
DMKW.rt[k] = t;
return t;
},
function (G, S, T) {
var C = DMK_CELL, lite = dmkLite();
S.rooms.forEach(function (r, i) {
if (!r.trap)
return;
var K = dmkKind(r.k), sp = dmkSpots(S, i), n = Math.max(2, Math.min(lite ? 4 : 6, Math.round(r.w * r.l / (K.trap ? 14 : 28)))), D = dmkTrapDef(r.trap);
for (var j = 0; j < n; j++) {
var p = r.trap === "darts" ? sp.wall.shift() : sp.mid.shift();
if (!p)
break;
var tr = { k: r.trap, x: p.x, z: p.z, a: p.a, room: i, ph: j * 0.7, dmg: D.dmg, hitT: 0, g: new THREE.Group() };
tr.g.position.set(p.x, 0, p.z);
G.add(tr.g);
dmkTrapMake(tr, T, r);
DMKW.traps.push(tr);
}
});
},
function (tr, T, r) {
var g = tr.g, iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 }), steel = dmkM("steel", 0xB8BCC4, { m: 0.9, r: 0.25 }), lite = dmkLite();
if (tr.k === "spikes") {
wBox(1.9, 0.04, 1.9, iron, 0, 0.02, 0, g);
tr.sp = new THREE.Group();
g.add(tr.sp);
for (var i = 0; i < (lite ? 9 : 16); i++) {
var n = lite ? 3 : 4, a = (i % n) / (n - 1) - 0.5, b = Math.floor(i / n) / (n - 1) - 0.5;
dmkMesh(dmkGeo("spike", function () { return new THREE.ConeGeometry(0.06, 0.55, 5); }), steel, a * 1.5, 0.27, b * 1.5, tr.sp);
}
tr.sp.position.y = -0.6;
tr.per = 3.2;
tr.on = 0.9;
tr.rad = 1.0;
}
else if (tr.k === "fire") {
wBox(1.2, 0.05, 1.2, iron, 0, 0.02, 0, g);
for (var k = 0; k < 5; k++)
wBox(1.1, 0.06, 0.06, dmkM("hoop", 0x3A3430, { m: 0.6, r: 0.5 }), 0, 0.06, -0.45 + k * 0.22, g);
tr.fl = dmkMesh(dmkGeo("jet", function () { return new THREE.ConeGeometry(0.45, 2.6, 9); }), dmkM("jetfire", 0xFFB050, { e: 0xFF6A20, ei: 1.8, op: 0.85 }), 0, 1.3, 0, g);
tr.fl.scale.set(1, 0.01, 1);
tr.gl = wGlow(0xFF8A30, 3, 0);
tr.gl.position.y = 1.2;
g.add(tr.gl);
tr.per = 4;
tr.on = 1.3;
tr.rad = 0.8;
}
else if (tr.k === "gas") {
wCyl(0.5, 0.5, 0.06, iron, 0, 0.03, 0, g, 10);
tr.cl = dmkMesh(dmkGeo("gas", function () { return new THREE.SphereGeometry(1, 12, 8); }), dmkM("gas", 0x8AD860, { op: 0.22, e: 0x2A5A10, ei: 0.5 }), 0, 0.6, 0, g);
tr.cl.scale.set(0.01, 0.01, 0.01);
tr.per = 7;
tr.on = 3.2;
tr.rad = 1.9;
tr.dot = 1;
}
else if (tr.k === "stones") {
var crack = new THREE.Mesh(new THREE.CircleGeometry(1.2, 10), dmkM("crack", 0x1A1612, { op: 0.5 }));
crack.rotation.x = -Math.PI / 2;
crack.position.y = 0.02;
g.add(crack);
tr.st = wBox(0.9, 0.7, 0.8, dmkMat("rock", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).multiplyScalar(0.9).getHex(), { map: s.map, r: 0.95 }); }), 0, dmkRoomH(r) - 0.6, 0, g);
tr.st.visible = false;
tr.rad = 1.3;
tr.h = dmkRoomH(r);
}
else if (tr.k === "blades") {
wCyl(0.18, 0.22, 1.1, iron, 0, 0.55, 0, g, 8);
tr.arm = new THREE.Group();
tr.arm.position.y = 0.75;
g.add(tr.arm);
wBox(2.4, 0.06, 0.05, iron, 1.2, 0, 0, tr.arm);
var bl = new THREE.Mesh(dmkGeo("blade", function () { var s = new THREE.Shape(); s.moveTo(0, 0); s.quadraticCurveTo(0.5, 0.45, 1.1, 0); s.quadraticCurveTo(0.5, 0.15, 0, 0); return new THREE.ShapeGeometry(s); }), dmkM("bladem", 0xC8CCD4, { m: 0.95, r: 0.2, side: true }));
bl.position.set(1.6, 0, 0);
bl.rotation.x = Math.PI / 2;
tr.arm.add(bl);
tr.rad = 2.6;
tr.spin = 1.6 + Math.random() * 0.6;
}
else if (tr.k === "darts") {
var plate = wBox(1.2, 0.8, 0.08, iron, 0, 1.3, 0, g);
g.rotation.y = tr.a;
g.position.x -= Math.sin(tr.a) * 0.45;
g.position.z -= Math.cos(tr.a) * 0.45;
for (var h = 0; h < 6; h++)
wCyl(0.03, 0.03, 0.1, dmkM("crack", 0x1A1612, { op: 0.5 }), -0.4 + (h % 3) * 0.4, 1.1 + Math.floor(h / 3) * 0.4, 0.05, g, 5).rotation.x = Math.PI / 2;
tr.dart = dmkMesh(dmkGeo("dart", function () { return new THREE.ConeGeometry(0.03, 0.35, 5); }), steel, 0, 1.3, 0, g);
tr.dart.rotation.x = Math.PI / 2;
tr.dart.visible = false;
tr.per = 2.8;
tr.on = 0.6;
tr.rad = 0;
}
},
function (dt, lx, lz) {
var now = DMK.run ? DMK.run.t : 0;
DMKW.traps.forEach(function (tr) {
var d = Math.hypot(lx - tr.x, lz - tr.z);
if (d > 40)
return;
tr.hitT = Math.max(0, tr.hitT - dt);
var D = dmkTrapDef(tr.k), name = D.n.replace(/s$/, "");
if (tr.per) {
var t = (now + tr.ph) % tr.per, on = t < tr.on;
if (tr.k === "spikes") {
tr.sp.position.y = on ? Math.min(0, -0.6 + t * 6) : Math.max(-0.6, -(t - tr.on) * 2);
if (on && t > 0.1 && Math.abs(lx - tr.x) < tr.rad && Math.abs(lz - tr.z) < tr.rad && tr.hitT <= 0) {
tr.hitT = tr.per;
dmkHurtMe(tr.dmg, "The spikes");
}
}
else if (tr.k === "fire") {
var s = on ? Math.min(1, t * 5) : Math.max(0.01, 1 - (t - tr.on) * 5);
tr.fl.scale.set(1, s, 1);
tr.fl.position.y = 1.3 * s;
tr.gl.material.opacity = 0.5 * s;
if (on && d < tr.rad && tr.hitT <= 0) {
tr.hitT = 0.9;
dmkHurtMe(tr.dmg, "The fire jet");
}
}
else if (tr.k === "gas") {
var g = on ? Math.min(1, t * 1.5) : Math.max(0.01, 1 - (t - tr.on) * 1.2);
tr.cl.scale.set(tr.rad * g, tr.rad * 0.6 * g, tr.rad * g);
if (on && d < tr.rad * g && tr.hitT <= 0) {
tr.hitT = 1;
dmkHurtMe(tr.dmg, "The poison gas");
}
}
else if (tr.k === "darts") {
if (on) {
var reach = t * 16;
tr.dart.visible = true;
tr.dart.position.z = reach;
var fx = tr.g.position.x + Math.sin(tr.a) * reach, fz = tr.g.position.z + Math.cos(tr.a) * reach;
if (Math.hypot(lx - fx, lz - fz) < 0.8 && tr.hitT <= 0) {
tr.hitT = tr.per;
dmkHurtMe(tr.dmg, "A dart");
}
}
else
tr.dart.visible = false;
}
}
if (tr.k === "blades") {
tr.ang = (tr.ang || 0) + dt * tr.spin;
tr.arm.rotation.y = tr.ang;
if (d < tr.rad && d > 0.4) {
var pa = Math.atan2(-(lz - tr.z), lx - tr.x), diff = Math.atan2(Math.sin(pa - tr.ang), Math.cos(pa - tr.ang));
if (Math.abs(diff) < 0.28 && tr.hitT <= 0) {
tr.hitT = 1.2;
dmkHurtMe(tr.dmg, "The sweeping blade");
}
}
}
if (tr.k === "stones") {
if (!tr.fall && d < tr.rad && tr.hitT <= 0) {
tr.fall = 0.0001;
tr.st.visible = true;
tr.st.position.y = tr.h - 0.6;
if (typeof playTone === "function")
playTone(120, 0.3);
dmkSay("<b>A crack in the ceiling groans.</b> Move!");
}
if (tr.fall) {
tr.fall += dt;
if (tr.fall > 0.8) {
var y = Math.max(0.35, tr.h - 0.6 - (tr.fall - 0.8) * (tr.fall - 0.8) * 30);
tr.st.position.y = y;
if (y <= 0.35 && !tr.landed) {
tr.landed = true;
if (d < tr.rad)
dmkHurtMe(tr.dmg, "A falling stone");
}
if (tr.fall > 3.5) {
tr.fall = 0;
tr.landed = false;
tr.st.visible = false;
tr.hitT = 4;
}
}
}
}
});
},
function (G, S, T) {
var C = DMK_CELL, d = dmkDepths(S), needKey = false;
S.rooms.forEach(function (r, i) {
if (r.k !== "puzzle" || !r.puz)
return;
var P = { k: r.puz, room: i, solved: false, parts: [], g: G }, sp = dmkSpots(S, i), R = sp.R;
var gates = DMKW.gates.filter(function (Gt) { return Gt.from === i && Gt.kind === "puzzle"; });
P.gates = gates;
var gate = gates[0], gx = gate ? gate.x : (r.x + r.w / 2) * C, gz = gate ? gate.z : (r.z + 1) * C;
if (r.puz === "levers" || r.puz === "runes" || r.puz === "braziers" || r.puz === "plates") {
var n = dmkLite() ? 3 : 4, syms = dmkShuffle(R, DMK_RUNES.slice()).slice(0, n);
P.order = dmkShuffle(R, syms.slice());
P.got = [];
for (var j = 0; j < n; j++) {
var p = (r.puz === "plates" || r.puz === "braziers") ? (sp.mid.shift() || sp.wall.shift()) : sp.wall.shift();
if (!p)
break;
var part = { i: j, sym: syms[j], x: p.x, z: p.z, a: p.a, state: 0, g: new THREE.Group() };
part.g.position.set(p.x, 0, p.z);
part.g.rotation.y = p.a;
G.add(part.g);
dmkPuzPart(P, part, T);
P.parts.push(part);
}
if (r.puz === "levers" || r.puz === "runes") {
var tab = wSign([r.puz === "levers" ? "Pull in this order" : "Set the stones to", P.order.join("  ")], 2.4, 1.0, "#2A2420", "#E8D8B0");
tab.position.set(gx, 5.2, gz);
if (gate && gate.g.rotation.y)
tab.rotation.y = Math.PI / 2;
G.add(tab);
if (r.puz === "runes")
P.want = P.parts.map(function (pt) { return P.order[pt.i]; });
}
if (r.puz === "plates")
P.win = 25;
}
if (r.puz === "key")
needKey = true;
if (r.puz === "riddle") {
var Rd = DMK_RIDDLES[Math.floor(R() * DMK_RIDDLES.length)];
P.riddle = Rd;
var mouthSign = wSign(["The door speaks", "press E to hear it"], 2.2, 0.8, "#2A2420", "#E8D8B0");
mouthSign.position.set(gx, 5.2, gz);
if (gate && gate.g.rotation.y)
mouthSign.rotation.y = Math.PI / 2;
G.add(mouthSign);
}
DMKW.puz.push(P);
});
if (DMKW.gates.some(function (Gt) { return Gt.kind === "lock"; }))
needKey = true;
if (needKey) {
var barred = {};
DMKW.gates.forEach(function (Gt) { barred[Gt.to] = 1; });
var reach = { 0: 1 }, q = [0];
while (q.length) {
var k = q.shift();
S.links.forEach(function (L, li) { var o = L[0] === k ? L[1] : L[1] === k ? L[0] : -1; if (o < 0 || reach[o])
return; var Gt = DMKW.gates.filter(function (x) { return x.li === li; })[0]; if (Gt)
return; reach[o] = 1; q.push(o); });
}
var cands = Object.keys(reach).map(Number).filter(function (i) { return i > 0 && S.rooms[i].k !== "puzzle"; });
if (!cands.length)
cands = [0];
var kr = cands[(S.seed + 7) % cands.length], ks = dmkSpots(S, kr), kp = ks.mid.shift() || ks.wall.shift() || { x: DMKW.rooms[kr].cx, z: DMKW.rooms[kr].cz };
var kg = new THREE.Group();
kg.position.set(kp.x, 0, kp.z);
G.add(kg);
wBox(0.7, 0.9, 0.7, dmkMat("statue", function () { var s = dmkStone(T, "wall"); return dmkStd(new THREE.Color(T.stone).lerp(new THREE.Color(0xFFFFFF), 0.4).getHex(), { map: s.map, nrm: s.nrm, r: 0.7 }); }), 0, 0.45, 0, kg);
var key = new THREE.Group();
key.position.y = 1.15;
kg.add(key);
var km = dmkM("gold", 0xD8A838, { m: 0.9, r: 0.28 });
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 6, 14), km);
ring.position.x = -0.14;
key.add(ring);
wBox(0.24, 0.03, 0.03, km, 0.04, 0, 0, key);
wBox(0.03, 0.07, 0.03, km, 0.14, -0.04, 0, key);
var gl = wGlow(0xFFD890, 1.2, 0.5);
gl.position.y = 1.15;
kg.add(gl);
DMKW.key = { g: kg, obj: key, x: kp.x, z: kp.z, room: kr, have: false };
dmkSolid(kp.x, kp.z, 0.45);
}
},
function (P, part, T) {
var g = part.g, iron = dmkM("iron2", 0x26221E, { m: 0.7, r: 0.5 }), w = dmkWood();
if (P.k === "levers") {
g.position.x -= Math.sin(part.a) * 0.4;
g.position.z -= Math.cos(part.a) * 0.4;
wBox(0.5, 0.7, 0.1, iron, 0, 1.4, 0, g);
var sym = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.45), dmkRuneMat(part.sym, false));
sym.position.set(0, 2.05, 0.06);
g.add(sym);
part.h = new THREE.Group();
part.h.position.set(0, 1.4, 0.1);
g.add(part.h);
wCyl(0.03, 0.03, 0.6, w, 0, 0.3, 0, part.h, 6);
wSph(0.06, dmkM("brass", 0xB8903A, { m: 0.85, r: 0.35 }), 0, 0.6, 0, part.h, 8);
part.h.rotation.x = 0.6;
}
else if (P.k === "runes") {
g.position.x -= Math.sin(part.a) * 0.2;
g.position.z -= Math.cos(part.a) * 0.2;
wBox(0.9, 1.2, 0.6, dmkStd(new THREE.Color(T.stone).getHex(), { r: 0.8 }), 0, 0.6, 0, g);
part.state = 0;
part.face = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), dmkRuneMat(DMK_RUNES[0], false));
part.face.position.set(0, 0.75, 0.31);
g.add(part.face);
dmkSolid(part.x, part.z, 0.55);
}
else if (P.k === "plates") {
part.pl = wBox(1.4, 0.08, 1.4, dmkM("plate", 0x5A5248, { m: 0.3, r: 0.6 }), 0, 0.04, 0, g);
var s = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), dmkRuneMat(part.sym, false));
s.rotation.x = -Math.PI / 2;
s.position.y = 0.09;
g.add(s);
part.sy = s;
}
else if (P.k === "braziers") {
wCyl(0.45, 0.25, 0.4, iron, 0, 1.0, 0, g, 10);
wCyl(0.08, 0.12, 0.8, iron, 0, 0.4, 0, g, 6);
part.fl = dmkMesh(dmkGeo("bfire", function () { return new THREE.ConeGeometry(0.4, 0.9, 8); }), dmkM("flame", 0xFFC070, { e: 0xFF8A30, ei: 1.6 }), 0, 1.55, 0, g);
part.fl.visible = false;
dmkSolid(part.x, part.z, 0.5);
}
},
function (P, msg) {
if (P.solved)
return;
P.solved = true;
if (P.gates.length)
P.gates.forEach(function (Gt) { dmkGateOpen(Gt, null); });
else {
var r = DMKW.rooms[P.room];
dmkChest(P.g, { x: r.cx, z: r.cz, a: 0 }, DMKW.spec, P.room, Math.random);
}
dmkSay("🧩 <b>" + (msg || "Solved!") + "</b> " + (P.gates.length ? "With a grinding of iron, the gate lifts." : "A chest rises from the floor."));
if (typeof playTone === "function") {
playTone(523, 0.25);
setTimeout(function () { playTone(659, 0.25); }, 180);
setTimeout(function () { playTone(784, 0.4); }, 360);
}
if (DMK.run)
DMK.run.puz++;
},
function (P, part) {
if (P.solved)
return;
if (P.k === "levers") {
if (part.state)
return;
part.state = 1;
part.h.rotation.x = -0.6;
P.got.push(part.sym);
var ok = P.got.every(function (s, i) { return s === P.order[i]; });
if (!ok) {
dmkSay("The lever clunks, and every lever <b>snaps back up</b>. That was not the order carved by the door.");
P.got = [];
P.parts.forEach(function (pt) { pt.state = 0; pt.h.rotation.x = 0.6; });
if (typeof playTone === "function")
playTone(140, 0.3);
return;
}
if (typeof playTone === "function")
playTone(300 + P.got.length * 60, 0.15);
if (P.got.length === P.order.length)
dmkPuzSolve(P, "The levers are pulled in order.");
}
else if (P.k === "runes") {
part.state = (part.state + 1) % DMK_RUNES.length;
part.face.material = dmkRuneMat(DMK_RUNES[part.state], false);
if (typeof playTone === "function")
playTone(260, 0.08);
if (P.parts.every(function (pt) { return DMK_RUNES[pt.state] === P.want[pt.i]; })) {
P.parts.forEach(function (pt) { pt.face.material = dmkRuneMat(DMK_RUNES[pt.state], true); });
dmkPuzSolve(P, "The runes match the carving.");
}
}
else if (P.k === "braziers") {
if (part.state)
return;
part.state = 1;
part.fl.visible = true;
DMKW.torches.push({ x: part.x, y: 2, z: part.z, col: 0xFFA050 });
DMKW.anim.push({ m: part.fl, k: "flame", p: 0 });
if (typeof playTone === "function")
playTone(330, 0.2);
if (P.parts.every(function (pt) { return pt.state; }))
dmkPuzSolve(P, "Every brazier burns.");
}
},
function (dt, lx, lz) {
DMKW.puz.forEach(function (P) {
if (P.solved || P.k !== "plates")
return;
P.parts.forEach(function (pt) {
if (!pt.state && Math.abs(lx - pt.x) < 0.8 && Math.abs(lz - pt.z) < 0.8) {
pt.state = 1;
pt.pl.position.y = -0.03;
pt.sy.material = dmkRuneMat(pt.sym, true);
if (!P.t0)
P.t0 = DMK.run.t;
if (typeof playTone === "function")
playTone(350 + P.parts.filter(function (q) { return q.state; }).length * 50, 0.12);
dmkSay("A plate sinks under your feet. <b>" + P.parts.filter(function (q) { return q.state; }).length + " of " + P.parts.length + "</b>: step on the rest before they rise again.");
}
});
if (P.parts.every(function (pt) { return pt.state; }))
dmkPuzSolve(P, "Every plate is down.");
else if (P.t0 && DMK.run.t - P.t0 > P.win) {
P.t0 = 0;
P.parts.forEach(function (pt) { pt.state = 0; pt.pl.position.y = 0.04; pt.sy.material = dmkRuneMat(pt.sym, false); });
dmkSay("With a hiss, <b>the plates rise again</b>. Faster this time.");
}
});
},
function (P) {
var Rd = P.riddle, fns = {}, b = "";
var opts = Rd.o.slice();
dmkShuffle(Math.random, opts);
opts.forEach(function (o, i) {
b += worldBtn("o" + i, o, "");
fns["o" + i] = function () {
worldCard(null);
if (Rd.a.some(function (a) { return o.toLowerCase().indexOf(a) >= 0; }))
dmkPuzSolve(P, "“" + o + ".” The door laughs, and opens.");
else {
dmkSay("“" + dmkEsc(o) + "?” <b>The door is silent.</b> Think again, and ask it once more.");
if (typeof playTone === "function")
playTone(140, 0.3);
}
};
});
worldCard("<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>The door speaks</div><p style='font-style:italic'>“" + dmkEsc(Rd.q) + "”</p>" + b, fns);
},
function (spec, o) {
o = o || {};
if (!spec || !spec.rooms || !spec.rooms.length)
return;
var why = dmkCheck(spec);
if (why) {
dmkSay("That dungeon cannot be built: " + dmkEsc(why));
return;
}
var sig = JSON.stringify(spec).length + ":" + spec.seed + ":" + (spec.made || 0) + ":" + (o.id || "");
if (WORLDS.dmk && WORLDS.dmk.g && DMKW.sig !== sig) {
if (WLD.on === "dmk")
worldOff(true);
try {
worldLetGo("dmk");
}
catch (e) { }
}
DMKW.sig = sig;
DMK.play = spec;
DMK.run = { t: 0, kills: 0, chests: 0, puz: 0, downs: 0, secret: false, vig: 100, cool: 0, calm: 0, mobs: [], boss: null, won: false, id: o.id || null, design: o.design != null ? o.design : null, from: o.from || null, sid: null, drops: 0, bolts: [], pouches: [] };
if (DMK.open)
dmkClose();
worldGo("dmk", o.from === "crawl" ? { keepFrom: true } : {});
if (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()) {
var R = DMK.run;
cityRpc("dmk_run_start", { p_dungeon: o.id || null, p_rooms: spec.rooms.length }).then(function (x) { if (x && x.ok && DMK.run === R)
R.sid = x.run; }).catch(function () { });
}
},
function () {
var S = DMK.play, C = DMK_CELL, e = S.rooms[0], P = camera.position, B = WORLDS.dmk.base;
P.set(B + (e.x + e.w / 2) * C, 1.72, (e.z + e.l) * C - 5);
yaw = 0;
pitch = 0;
WLD.arrive = { x: (e.x + e.w / 2) * C, z: (e.z + e.l) * C - 5 };
var T = dmkTheme(S.opt.theme), D = dmkPick(DMK_DIFF, S.opt.diff), Pt = dmkPick(DMK_PARTY, S.opt.party);
dmkSay("<b>" + dmkEsc(S.opt.name || "A dreamer's dungeon") + "</b>: " + dmkEsc(T.n) + ", " + S.rooms.length + " rooms, " + D.n.toLowerCase() + ", made for " + Pt.sub + "." + (DMK.run.id ? "" : " <i>Your own design: walk it, and once you have beaten it you may send it to the Dungeon Crawlers.</i>"));
if (dmkFighting())
try {
cbtRegisterWorld("dmk", { name: "the dungeon", lv: D.lv + 1, safe: function () { return dmkSafeHere(); } });
}
catch (err) { }
},
function () {
var R = DMK.run;
if (R) {
(R.mobs || []).forEach(function (M) { if (M.g && M.g.parent)
M.g.parent.remove(M.g); });
R.mobs = [];
if (R.boss && R.boss.g && R.boss.g.parent)
R.boss.g.parent.remove(R.boss.g);
R.boss = null;
}
DMKW.rooms.forEach(function (rm) { rm.spawned = false; rm.mobs = []; });
var h = document.getElementById("dmk-hud");
if (h)
h.style.display = "none";
var sb = document.getElementById("dmk-strike");
if (sb)
sb.style.display = "none";
},
function () {
worldPrompt(null);
var R = DMK.run;
if (R && R.from === "crawl" && WORLDS.crawl) {
worldGo("crawl", { keepFrom: true, at: "stair" });
return;
}
worldHome("<b>You climb back up into the light.</b>" + (R && R.design != null ? " Your design waits in the 🏰 Dungeon Maker." : ""));
if (R && R.design != null)
setTimeout(function () { dmkOpen(); }, 600);
},
function (x, z) {
var C = DMK_CELL, cx = Math.floor(x / C), cz = Math.floor(z / C), F = DMKW.floor && DMKW.floor.F;
if (!F)
return true;
var m = 0.32;
for (var dx = -1; dx <= 1; dx++)
for (var dz = -1; dz <= 1; dz++) {
var qx = Math.floor((x + dx * m) / C), qz = Math.floor((z + dz * m) / C);
if (F[qx + "," + qz] === undefined)
return true;
if (dmkGateAt(qx, qz))
return true;
}
var R = DMKW.R;
for (var i = 0; i < R.length; i++) {
var q = R[i];
var ddx = x - q.x, ddz = z - q.z;
if (ddx * ddx + ddz * ddz < (q.r + 0.28) * (q.r + 0.28))
return true;
}
return false;
},
function (K, boss) {
var S = DMK.play, D = dmkPick(DMK_DIFF, S.opt.diff), Pt = dmkPick(DMK_PARTY, S.opt.party);
var hp = Math.round((K.hp || 60) * D.hp * Math.sqrt(Pt.mul)), dmg = Math.max(2, Math.round((K.dmg || 8) * D.dmg));
if (boss) {
hp = Math.round((K.hp || 120) * D.hp * Pt.mul * 6 + 300 * D.hp);
dmg = Math.round(dmg * 1.6);
}
return { hp: hp, dmg: dmg };
},
function (rm) {
if (rm.spawned)
return;
rm.spawned = true;
var S = DMK.play, r = rm.r, R = DMK.run, G = WORLDS.dmk.g, n = r.mobs | 0, kinds = dmkKindsFor(r), rnd = wRand((S.seed * 13 + rm.i * 7) >>> 0);
if (dmkLite())
n = Math.min(n, 6);
for (var i = 0; i < n && kinds.length; i++) {
var k = kinds[Math.floor(rnd() * kinds.length)], K = dmkBeast(k);
if (!K)
continue;
var x = 0, z = 0, ok = false;
for (var t = 0; t < 20 && !ok; t++) {
x = rm.x0 + 2 + rnd() * (rm.x1 - rm.x0 - 4);
z = rm.z0 + 2 + rnd() * (rm.z1 - rm.z0 - 4);
ok = !dmkBlock(x, z);
}
if (!ok)
continue;
var g = dgbBody(K, "dmk" + S.seed + rm.i + "_" + i);
g.position.set(x, 0, z);
g.rotation.y = rnd() * 6;
G.add(g);
var st = dmkMobStats(K, false), champ = i === 0 && dmkPick(DMK_DIFF, S.opt.diff).lv >= 2 && /den|hall|throne|barracks/.test(r.k);
if (champ) {
st.hp = Math.round(st.hp * 2.2);
st.dmg = Math.round(st.dmg * 1.35);
g.scale.multiplyScalar(1.3);
try {
var cg = wGlow(dmkTheme(S.opt.theme).light, 3, 0.3);
cg.position.y = 1.6;
g.add(cg);
}
catch (e) { }
}
var M = { K: K, kind: k, g: g, hp: st.hp, max: st.hp, dmg: st.dmg, st: "idle", cool: 1 + rnd(), ph: 0, room: rm.i, champ: champ, name: champ ? "Champion " + String(K.name || "beast").replace(/^(The|A|An) /, "") : null };
R.mobs.push(M);
rm.mobs.push(M);
}
if (dmkKind(r.k).boss && !R.boss) {
var B = S.opt.boss || {}, bk = (r.beast || B.kind || dmkTheme(S.opt.theme).boss), BK = dmkBeast(bk) || dmkBeast("restless");
var bg = dgbBody(BK, "dmkboss" + S.seed), sc = dmkPick(DMK_BOSS_SIZES, B.size || "huge").s;
bg.scale.multiplyScalar(sc);
try {
var gl = wGlow(dmkTheme(S.opt.theme).light, 4, 0.22);
gl.position.y = 2.2;
bg.add(gl);
}
catch (e) { }
try {
if (typeof sgaBossDress === "function")
sgaBossDress(bg, { boss: { glow: dmkTheme(S.opt.theme).light, kind: bk } });
}
catch (e) { }
var at = DMKW.bossAt || { x: rm.cx, z: rm.cz };
bg.position.set(at.x, 0.4, at.z);
G.add(bg);
var bs = dmkMobStats(BK, true);
R.boss = { K: BK, kind: bk, g: bg, hp: bs.hp, max: bs.hp, dmg: bs.dmg, st: "sleep", cool: 2, ph: 0, room: rm.i, boss: true, scale: sc, name: (B.name || "").trim() || BK.name, tricks: B.tricks || [], slam: 0, called: false, raged: false, shieldT: 0 };
}
},
function (M, d) {
var R = DMK.run;
if (!R || !M || M.st === "dead")
return;
d = Math.max(0, +d || 0);
if (!d)
return;
if (M.boss && M.shieldT > 0)
d = Math.round(d / 2);
M.hp -= d;
if (M.st === "idle" || M.st === "sleep")
M.st = "come";
if (typeof harmKnock === "function" && M.K.body === "person")
try {
harmKnock(M.g, false);
}
catch (e) { }
if (M.hp <= 0)
dmkFell(M);
},
function (M) {
var R = DMK.run;
M.st = "dead";
M.deadT = 0;
M.hp = 0;
R.kills++;
if (typeof bwAct === "function")
try {
bwAct(M.g, "fall", 3000);
}
catch (e) { }
if (typeof playTone === "function")
playTone(M.boss ? 196 : 520, M.boss ? 0.9 : 0.18);
try {
if (window.cbtKilled)
cbtKilled({ name: M.name || M.K.name, lv: dmkLv(M.room) + (M.boss ? 10 : M.champ ? 3 : 0), boss: !!M.boss });
}
catch (e) { }
dmkPouch(M.g.position.x, M.g.position.z, M.boss ? "boss" : M.kind, M);
if (M.boss)
dmkWon();
else if (!dmkHasBoss() && dmkAllDown())
dmkWon();
},
function (d, name) {
var R = DMK.run;
if (!R || R.won && !R.boss)
return;
var safe = (typeof dgrProtected === "function" && dgrProtected()) || (typeof isKeeperNow === "function" && isKeeperNow());
if (safe) {
if (!R.toldSafe || R.t - R.toldSafe > 12) {
R.toldSafe = R.t;
dmkSay("<b>" + dmkEsc(name) + "</b> cannot touch you: the young are never hurt here.");
}
return;
}
if (typeof cbtHarm === "function")
try {
var c = +cbtHarm(d);
if (isFinite(c))
d = Math.max(0, Math.round(c));
}
catch (e) { }
else if (typeof spellHarm === "function")
try {
var w = +spellHarm(d);
if (isFinite(w))
d = Math.max(0, Math.round(w));
}
catch (e) { }
if (!d)
return;
R.vig -= d;
R.calm = 0;
if (typeof playTone === "function")
playTone(150, 0.12);
if (R.vig <= 0) {
R.vig = 100;
R.downs++;
var S = DMK.play, e = S.rooms[0], P = camera.position;
P.set(WORLDS.dmk.base + (e.x + e.w / 2) * DMK_CELL, 1.72, (e.z + e.l) * DMK_CELL - 5);
yaw = 0;
dmkSay("<b>" + dmkEsc(name) + "</b> knocks you down. You come to at the foot of the stair, whole. The dungeon remembers what you have done; go on when you are ready.");
}
},
function () {
var R = DMK.run;
if (!R || R.cool > 0 || WLD.on !== "dmk")
return;
R.cool = 0.55;
var P = camera.position, lx = P.x - WORLDS.dmk.base, lz = P.z, fx = -Math.sin(yaw), fz = -Math.cos(yaw), best = null, bs = 1e9;
dmkFoes().forEach(function (M) {
var dx = M.g.position.x - lx, dz = M.g.position.z - lz, d = Math.hypot(dx, dz), reach = M.boss ? 3 + M.scale : 3.2;
if (d > reach)
return;
var face = d > 0.01 ? (dx * fx + dz * fz) / d : 1;
if (face < 0.2 && d > 1.4)
return;
if (!dmkSees(lx, lz, M.g.position.x, M.g.position.z))
return;
if (d < bs) {
bs = d;
best = M;
}
});
if (typeof playTone === "function")
playTone(best ? 260 : 200, 0.06);
if (best)
dmkDamage(best, typeof dgbMyDmg === "function" ? dgbMyDmg() : 12);
},
function (room) {
var S = DMK.play, D = dmkPick(DMK_DIFF, S.opt.diff), base = D.lv * 8 - 4, deep = 0;
try {
if (room != null) {
if (DMKW.depFor !== S) {
var d = dmkDepths(S), mx = 1;
Object.keys(d).forEach(function (k) { mx = Math.max(mx, d[k] || 0); });
DMKW.dep = d;
DMKW.depMax = mx;
DMKW.depFor = S;
}
deep = Math.round(4 * (DMKW.dep[room] || 0) / DMKW.depMax);
}
}
catch (e) { }
return Math.max(1, base + deep);
},
function (x, z, foe, M) {
var R = DMK.run, G = WORLDS.dmk.g;
if (!R || !G)
return;
var g = new THREE.Group();
g.position.set(x, 0, z);
G.add(g);
var sack = wSph(0.22, dmkM("sack", 0x8A6A40, { r: 0.95 }), 0, 0.2, 0, g, 10);
sack.scale.y = 1.2;
wCyl(0.06, 0.1, 0.12, dmkM("sack", 0x8A6A40, { r: 0.95 }), 0, 0.44, 0, g, 8);
var gl = wGlow(0xFFD890, 1.1, 0.45);
gl.position.y = 0.4;
g.add(gl);
R.pouches.push({ g: g, x: x, z: z, foe: foe, t: 0, M: M || null });
},
function (p) {
var R = DMK.run;
if (p.g.parent)
p.g.parent.remove(p.g);
var M = p.M || {}, src = M.boss ? "boss" : M.champ ? "champ" : "beast", lv = dmkLv(M.room) + (M.boss ? 10 : M.champ ? 3 : 0);
if (R.sid)
R.drops++;
if (typeof playTone === "function")
playTone(520, 0.12);
var nm = String(M.name || (M.K && M.K.name) || "the beast").replace(/^(The|A|An) /, "");
if (typeof dglTake === "function")
dglTake("dmk", R.sid, { src: src, lv: lv, kind: p.foe, K: M.K, theme: DMK.play.opt.theme, where: DMK.play.opt.name || "a dungeon", at: { x: WORLDS.dmk.base + p.x, y: 0, z: p.z }, heal: function (n) { R.vig = Math.min(100, R.vig + n); } }, (M.boss ? "💀 " : "👝 ") + "<b>" + dmkEsc(M.boss ? (M.name || nm) + "'s hoard" : "What the " + nm.toLowerCase() + " left") + "</b> <span style='opacity:.7;font-weight:400'>· level " + lv + "</span>");
},
function () {
var R = DMK.run;
if (R.won)
return;
R.won = true;
var S = DMK.play, mins = Math.round(R.t / 60), fns = {}, b = "";
var h = "<div style='font:600 18px var(--serif,Georgia);color:#FFE7B0'>🏆 " + dmkEsc(S.opt.name || "The dungeon") + " is beaten</div>" +
"<div style='margin:6px 0;opacity:.9'>" + mins + " minute" + (mins === 1 ? "" : "s") + " · " + R.kills + " beast" + (R.kills === 1 ? "" : "s") + " · " + R.chests + " chest" + (R.chests === 1 ? "" : "s") + " · " + R.puz + " puzzle" + (R.puz === 1 ? "" : "s") + (R.secret ? " · the secret room found" : "") + (R.downs ? " · knocked down " + R.downs + "×" : "") + "</div>";
if (R.design != null) {
var mine = dmkMine();
if (mine[R.design]) {
mine[R.design].cleared = Date.now();
mine[R.design].best = Math.min(mine[R.design].best || 1e9, Math.round(R.t));
dmkSaveMine(mine);
}
h += "<p>You have beaten your own dungeon. If it is something special, send it to the <b>Dungeon Crawlers</b>: once the Keeper approves it, everyone can play it, and you earn gold each time another dreamer clears it.</p>";
b += worldBtn("send", "⚒️ Send it to the Dungeon Crawlers", "From the Dungeon Maker");
fns.send = function () { worldCard(null); DMK.sel = -1; dmkSubmit(R.design); };
b += worldBtn("maker", "Back to the Dungeon Maker", "Change it room by room");
fns.maker = function () { worldCard(null); dmkOpen(); };
}
else if (R.id) {
h += "<p id='dmk-clear-say' style='opacity:.85'>The Crawlers' Hall is told…</p><div style='margin:6px 0'>Rate it:</div><div style='display:flex;gap:6px;flex-wrap:wrap'>" + [1, 2, 3, 4, 5].map(function (n) { return "<button class='btn' data-w='rate" + n + "' data-dmk-rate='" + n + "'>" + "★".repeat(n) + "</button>"; }).join("") + "</div>";
[1, 2, 3, 4, 5].forEach(function (n) { fns["rate" + n] = function () { dmkRate(R.id, n); document.querySelectorAll("[data-dmk-rate]").forEach(function (x) { x.style.opacity = +x.getAttribute("data-dmk-rate") <= n ? "1" : "0.45"; }); }; });
if (R.sid && typeof cityRpc === "function")
cityRpc("dmk_run_clear", { p_run: R.sid, p_kills: R.kills, p_chests: R.chests }).then(function (o) { var el = document.getElementById("dmk-clear-say"); if (el)
el.innerHTML = dmkEsc((o && o.say) || "Cleared."); }).catch(function () { });
else
setTimeout(function () { var el = document.getElementById("dmk-clear-say"); if (el)
el.textContent = "Sign in, and your clears are counted in the Hall."; }, 50);
}
b += worldBtn("out", "Climb back up", "Or stay and look round; the stair is where you came in");
fns.out = function () { worldCard(null); dmkOut(); };
worldCard(h + b, fns);
if (typeof playTone === "function") {
playTone(392, 0.4);
setTimeout(function () { playTone(523, 0.4); }, 250);
setTimeout(function () { playTone(659, 0.7); }, 500);
}
},
function (dt) {
var R = DMK.run, S = DMK.play;
if (!R || !S || !DMKW.floor)
return;
R.t += dt;
R.cool = Math.max(0, R.cool - dt);
R.calm += dt;
if (R.calm > 6 && R.vig < 100)
R.vig = Math.min(100, R.vig + dt * 4);
if (R.boss && R.boss.g && R.boss.st !== "dead" && typeof sgaBossDressTick === "function")
try {
sgaBossDressTick(R.boss.g, dt, R.t);
}
catch (e) { }
var P = camera.position, lx = P.x - WORLDS.dmk.base, lz = P.z;
var here = dmkRoomAtXZ(lx, lz);
DMKW.rooms.forEach(function (rm) { if (rm.spawned)
return; var dx = Math.max(rm.x0 - lx, 0, lx - rm.x1), dz = Math.max(rm.z0 - lz, 0, lz - rm.z1); if (Math.hypot(dx, dz) < 9)
dmkSpawnRoom(rm); });
if (here && !here.seen) {
here.seen = true;
if (here.r.k === "secret" && !R.secret) {
R.secret = true;
dmkSay("🗝️ <b>A secret room!</b> Nobody has stood here in a long time.");
}
}
dmkLightTick(lx, lz);
dmkGatesTick(dt);
dmkTrapsTick(dt, lx, lz);
dmkPuzTick(dt, lx, lz);
DMKW.anim.forEach(function (a) { a.p += dt * 9; a.m.scale.y = 0.88 + Math.sin(a.p) * 0.08 + Math.sin(a.p * 2.3) * 0.04; });
dmkThemeTick(dt);
R.mobs.forEach(function (M) { dmkMobTick(M, dt, lx, lz, here); });
if (R.boss)
dmkBossTick(R.boss, dt, lx, lz, here);
R.bolts = R.bolts.filter(function (b) {
b.t += dt;
var k = Math.min(1, b.t / b.T);
b.s.position.set(b.x0 + (b.x1 - b.x0) * k, 1.3, b.z0 + (b.z1 - b.z0) * k);
if (k >= 1) {
if (Math.hypot(lx - b.x1, lz - b.z1) < 0.9)
dmkHurtMe(b.d, b.n);
if (b.s.parent)
b.s.parent.remove(b.s);
return false;
}
return true;
});
R.pouches = R.pouches.filter(function (p) { p.t += dt; p.g.rotation.y += dt; if (p.t > 0.6 && Math.hypot(lx - p.x, lz - p.z) < 1.3) {
dmkPouchTake(p);
return false;
} return true; });
dmkPromptTick(lx, lz);
dmkHud();
},
function (M, dt, lx, lz, here) {
var g = M.g;
if (M.st === "dead") {
M.deadT += dt;
if (M.deadT < 1.2)
g.rotation.x = Math.min(1.5, M.deadT * 3);
if (M.deadT > 3 && g.parent)
g.parent.remove(g);
return;
}
var dx = lx - g.position.x, dz = lz - g.position.z, d = Math.hypot(dx, dz);
var safe = here && dmkKind(here.r.k).safe;
if (M.st === "idle" && !safe && ((d < 6 && dmkSees(g.position.x, g.position.z, lx, lz)) || (d < 15 && here && here.i === M.room)))
M.st = "come";
if (M.st !== "come")
return;
if (d > 26 || safe) {
if (safe && d < 14) { }
M.st = d > 26 ? "idle" : "come";
if (safe)
return;
}
var reach = (M.K.reach || 2) * (M.K.scale && M.K.body !== "person" ? Math.min(1.4, M.K.scale / 2.4) : 1);
g.rotation.y = Math.atan2(dx, dz);
var shot = M.K.shot;
if (shot && d < shot.r && d > reach + 1.5 && (M.seeT = (M.seeT || 0) - dt) <= 0) {
M.seeT = 0.3;
M.sees = dmkSees(g.position.x, g.position.z, lx, lz);
}
if (shot && d < shot.r && d > reach + 1.5 && M.sees) {
M.cool -= dt;
if (M.cool <= 0) {
M.cool = 2.2 + Math.random();
dmkBolt(M, lx, lz, shot.c);
}
return;
}
if (d > reach * 0.9) {
var sp = (M.K.spd || 3.5) * 0.72, st = Math.min(d - reach * 0.8, sp * dt), nx = g.position.x + dx / d * st, nz = g.position.z + dz / d * st;
if (!dmkBlock(nx, nz)) {
g.position.x = nx;
g.position.z = nz;
}
else if (!dmkBlock(nx, g.position.z))
g.position.x = nx;
else if (!dmkBlock(g.position.x, nz))
g.position.z = nz;
M.ph += dt * 8;
}
M.cool -= dt;
if (d <= reach + 0.25 && M.cool <= 0) {
M.cool = 1.4 + Math.random() * 0.7;
dmkHurtMe(M.dmg, M.K.name);
if (typeof bwAct === "function")
try {
bwAct(g, "swing", 500);
}
catch (e) { }
}
var L = g.userData.limbs;
if (L && L.ll) {
var s = Math.sin(M.ph) * 0.4;
L.ll.rotation.x = s;
L.rl.rotation.x = -s;
}
},
function (Bo, dt, lx, lz, here) {
if (Bo.st === "dead") {
Bo.deadT = (Bo.deadT || 0) + dt;
Bo.g.rotation.x = Math.min(1.4, Bo.deadT * 1.2);
return;
}
var bx = lx - Bo.g.position.x, bz = lz - Bo.g.position.z, bd = Math.hypot(bx, bz);
if (Bo.st === "sleep") {
if (here && here.i === Bo.room && bd < 22) {
Bo.st = "come";
dmkSay("💀 <b>" + dmkEsc(Bo.name) + "</b> wakes.");
if (typeof playTone === "function")
playTone(110, 0.8);
}
return;
}
Bo.shieldT = Math.max(0, Bo.shieldT - dt);
var tr = Bo.tricks, rage = Bo.raged ? 1.45 : 1;
if (tr.indexOf("rage") >= 0 && !Bo.raged && Bo.hp < Bo.max / 2) {
Bo.raged = true;
dmkSay("💀 <b>" + dmkEsc(Bo.name) + " rages!</b> Faster now, and harder.");
}
if (tr.indexOf("call") >= 0 && !Bo.called && Bo.hp < Bo.max * 0.7) {
Bo.called = true;
dmkCallKin(Bo);
}
if (tr.indexOf("shield") >= 0) {
Bo.sht = (Bo.sht || 0) + dt;
if (Bo.sht > 18) {
Bo.sht = 0;
Bo.shieldT = 5;
dmkSay("💀 <b>" + dmkEsc(Bo.name) + "</b>'s skin turns to stone: hits do half for a while.");
}
}
Bo.g.rotation.y = Math.atan2(bx, bz);
var reach = 2.2 + Bo.scale;
if (bd > reach) {
var sp = 2.4 * rage, st = Math.min(bd - reach * 0.8, sp * dt), nx = Bo.g.position.x + bx / bd * st, nz = Bo.g.position.z + bz / bd * st;
if (!dmkBlock(nx, nz)) {
Bo.g.position.x = nx;
Bo.g.position.z = nz;
}
}
var at = DMKW.bossAt;
Bo.g.position.y = at && Math.hypot(Bo.g.position.x - at.x, Bo.g.position.z - at.z) < at.r ? 0.4 : 0;
Bo.cool -= dt;
if (bd <= reach + 0.3 && Bo.cool <= 0) {
Bo.cool = 2.2 / rage;
dmkHurtMe(Math.round(Bo.dmg * rage), Bo.name);
}
if (tr.indexOf("slam") >= 0) {
var R = DMK.run;
Bo.slam += dt;
if (Bo.slam > 12 / rage && !R.ring) {
Bo.slam = 0;
var ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.6, 48), dmkM("ring", 0xFF5A3A, { op: 0.35, e: 0xFF3A1A, side: true }));
ring.rotation.x = -Math.PI / 2;
ring.position.set(Bo.g.position.x, 0.08, Bo.g.position.z);
WORLDS.dmk.g.add(ring);
R.ring = { m: ring, t: 0 };
dmkSay("💀 <b>" + dmkEsc(Bo.name) + "</b> rears up: <b>get clear of the red ring!</b>");
}
if (R.ring) {
R.ring.t += dt;
var rr = Math.min(7, 0.6 + R.ring.t * 3.2);
R.ring.m.scale.set(rr / 0.6, rr / 0.6, 1);
if (R.ring.t > 2) {
if (Math.hypot(lx - R.ring.m.position.x, lz - R.ring.m.position.z) < 7)
dmkHurtMe(Bo.dmg + 8, Bo.name);
if (R.ring.m.parent)
R.ring.m.parent.remove(R.ring.m);
R.ring.m.geometry.dispose();
R.ring = null;
}
}
}
},
function (Bo) {
var R = DMK.run, rm = DMKW.rooms[Bo.room], kinds = dmkKindsFor(rm.r), G = WORLDS.dmk.g;
if (!kinds.length)
kinds = dmkTheme(DMK.play.opt.theme).beasts;
for (var i = 0; i < 2; i++) {
var K = dmkBeast(kinds[i % kinds.length]);
if (!K)
continue;
var a = i * Math.PI + 0.5, x = Bo.g.position.x + Math.cos(a) * 4, z = Bo.g.position.z + Math.sin(a) * 4;
if (dmkBlock(x, z)) {
x = rm.cx;
z = rm.cz;
}
var g = dgbBody(K, "dmkcall" + i);
g.position.set(x, 0, z);
G.add(g);
var st = dmkMobStats(K, false);
R.mobs.push({ K: K, kind: kinds[i % kinds.length], g: g, hp: st.hp, max: st.hp, dmg: st.dmg, st: "come", cool: 1.5, ph: 0, room: Bo.room });
}
dmkSay("💀 <b>" + dmkEsc(Bo.name) + "</b> calls, and its kin come.");
},
function (lx, lz) {
var best = null, bd = 1e9, R = DMK.run;
function cand(x, z, rad, label, fn) { var d = Math.hypot(lx - x, lz - z); if (d < rad && d < bd) {
bd = d;
best = { label: label, fn: fn };
} }
if (DMKW.stair)
cand(DMKW.stair.x, DMKW.stair.z, 3, "<b>The stair</b> · <b>press E</b> to climb back up", dmkOut);
DMKW.chests.forEach(function (c) { if (!c.open)
cand(c.x, c.z, 2, "<b>A chest</b> · <b>press E</b> to open it", function () { dmkChestOpen(c); }); });
if (DMKW.key && !DMKW.key.have)
cand(DMKW.key.x, DMKW.key.z, 2, "<b>A golden key</b> · <b>press E</b> to take it", function () { var K = DMKW.key; K.have = true; if (K.obj.parent)
K.obj.parent.remove(K.obj); dmkSay("🗝️ <b>You take the golden key.</b> It will open a locked door."); if (typeof playTone === "function")
playTone(660, 0.3); worldPrompt(null); });
DMKW.gates.forEach(function (Gt) {
if (Gt.open)
return;
if (Gt.kind === "secret")
cand(Gt.x, Gt.z, 2.6, "<b>One stone sticks out a little</b> · <b>press E</b> to push it", function () { dmkGateOpen(Gt, "🗝️ <b>The stone sinks in</b>, and the wall slides down into the floor."); worldPrompt(null); });
else if (Gt.kind === "lock")
cand(Gt.x, Gt.z, 2.8, DMKW.key && DMKW.key.have ? "<b>A locked gate</b> · <b>press E</b> to use the golden key" : "<b>A locked gate</b>: the key is somewhere in the dungeon", function () { if (DMKW.key && DMKW.key.have) {
dmkGateOpen(Gt, "🗝️ <b>The key turns.</b> The gate lifts.");
worldPrompt(null);
}
else
dmkSay("It is locked. <b>Find the golden key.</b>"); });
else {
var P = dmkPuzOf(Gt);
if (!P)
return;
if (P.k === "riddle")
cand(Gt.x, Gt.z, 2.8, "<b>The door speaks</b> · <b>press E</b> to hear its riddle", function () { worldPrompt(null); dmkRiddle(P); });
else if (P.k === "key")
cand(Gt.x, Gt.z, 2.8, DMKW.key && DMKW.key.have ? "<b>A locked gate</b> · <b>press E</b> to use the golden key" : "<b>A locked gate</b>: find the golden key", function () { if (DMKW.key && DMKW.key.have) {
worldPrompt(null);
dmkPuzSolve(P, "The key turns.");
}
else
dmkSay("It is locked. <b>Find the golden key</b>; it lies somewhere you have been, or could go."); });
else
cand(Gt.x, Gt.z, 2.4, "<b>An iron gate</b>: " + dmkEsc(dmkPuzDef(P.k).sub), function () { dmkSay("🧩 " + dmkEsc(dmkPuzDef(P.k).sub) + "."); });
}
});
(DMKW.books || []).forEach(function (bk) { if (!bk.done)
cand(bk.x, bk.z, 2.2, "<b>A bookcase</b> · <b>press E</b> to search the shelves", function () { dmkBooks(bk); }); });
DMKW.puz.forEach(function (P) {
if (P.solved)
return;
P.parts.forEach(function (pt) {
if (P.k === "levers" && !pt.state)
cand(pt.x, pt.z, 2, "<b>A lever</b> marked " + pt.sym + " · <b>press E</b> to pull it", function () { dmkPuzUse(P, pt); });
if (P.k === "runes")
cand(pt.x, pt.z, 2, "<b>A rune stone</b> · <b>press E</b> to turn it", function () { dmkPuzUse(P, pt); });
if (P.k === "braziers" && !pt.state)
cand(pt.x, pt.z, 2, "<b>A cold brazier</b> · <b>press E</b> to light it", function () { dmkPuzUse(P, pt); });
});
});
var label = best ? best.label : null;
if (label !== DMKW.plabel) {
DMKW.plabel = label;
worldPrompt(label, best ? best.fn : null);
}
else if (best && WLD.promptFn !== best.fn)
WLD.promptFn = best.fn;
},
function (c) {
if (c.open)
return;
c.open = true;
DMK.run.chests++;
worldPrompt(null);
DMKW.plabel = null;
var t0 = performance.now();
(function lift() { var k = Math.min(1, (performance.now() - t0) / 600); c.lid.rotation.x = -k * 1.6; if (k < 1)
requestAnimationFrame(lift); })();
var gl = wGlow(0xFFD890, 1.8, 0.6);
gl.position.set(0, 0.8, 0);
c.g.add(gl);
if (typeof playTone === "function") {
playTone(587, 0.3);
setTimeout(function () { playTone(784, 0.35); }, 160);
}
var R = DMK.run, rk = c.room != null && DMK.play.rooms[c.room] ? DMK.play.rooms[c.room].k : "chamber";
var src = rk === "secret" ? "secret" : rk === "treasure" ? "treasure" : rk === "armoury" ? "armoury" : "chest";
var lv = dmkLv(c.room) + (src === "secret" ? 4 : src === "treasure" ? 2 : 0);
var title = { secret: "🗝️ <b>The secret room's chest</b>", treasure: "💰 <b>A treasure chest</b>", armoury: "🗡️ <b>An armoury chest</b>", chest: "💰 <b>A chest</b>" }[src] + " <span style='opacity:.7;font-weight:400'>· level " + lv + "</span>";
if (typeof dglTake === "function")
dglTake("dmk", R.sid, { src: src, lv: lv, kind: "chest", theme: DMK.play.opt.theme, where: DMK.play.opt.name || "a dungeon", at: { x: WORLDS.dmk.base + c.x, y: 0, z: c.z + 0.9 }, heal: function (n) { R.vig = Math.min(100, R.vig + n); } }, title);
else
dmkSay("💰 <b>The chest creaks open.</b>");
},
function (bk) {
if (bk.done)
return;
bk.done = true;
worldPrompt(null);
DMKW.plabel = null;
if (typeof playTone === "function")
playTone(300, 0.15);
var S = DMK.play, R = DMK.run, P = camera.position, B = WORLDS.dmk.base, lx = P.x - B, lz = P.z, C = DMK_CELL, clue = null;
DMKW.told = DMKW.told || {};
function far(x, z) { var d = Math.round(Math.hypot(x - lx, z - lz)); return d < 8 ? "close by" : "about " + d + " paces"; }
var tries = [
function () {
var K = DMKW.key;
if (!K || K.have || DMKW.told.key)
return null;
DMKW.told.key = 1;
return "📜 <b>A page torn from a steward's ledger:</b> <i>“The golden key was left " + far(K.x, K.z) + " to the " + dmkDirWord(K.x - lx, K.z - lz) + " of this shelf.”</i>";
},
function () {
var Gt = DMKW.gates.filter(function (g) { return g.kind === "secret" && !g.open; })[0];
if (!Gt || DMKW.told.secret)
return null;
DMKW.told.secret = 1;
return "📜 <b>A note in a margin:</b> <i>“One stone in the wall sticks out a little. Push it. It lies " + far(Gt.x, Gt.z) + " to the " + dmkDirWord(Gt.x - lx, Gt.z - lz) + ".”</i>";
},
function () {
var Pz = DMKW.puz.filter(function (q) { return !q.solved && !DMKW.told["p" + q.room]; })[0];
if (!Pz)
return null;
DMKW.told["p" + Pz.room] = 1;
var t = Pz.k === "riddle" && Pz.riddle ? "The answer to the speaking door is <b>" + dmkEsc(Pz.riddle.o.filter(function (o) { return Pz.riddle.a.some(function (a) { return o.toLowerCase().indexOf(a) >= 0; }); })[0] || Pz.riddle.a[0]) + "</b>."
: Pz.order && (Pz.k === "levers" || Pz.k === "runes") ? "The carving over the iron gate reads <b>" + Pz.order.join(" ") + "</b>: " + (Pz.k === "levers" ? "pull the levers in that order." : "turn each stone to its rune.")
: Pz.k === "braziers" ? "Every brazier in that room must burn at once."
: Pz.k === "plates" ? "Step on every plate quickly, before the first rises again."
: Pz.k === "key" ? "The locked gate wants the golden key." : null;
return t ? "📜 <b>A scholar's note:</b> <i>" + t + "</i>" : null;
},
function () {
if (DMKW.told.boss)
return null;
DMKW.told.boss = 1;
var o = S.opt.boss || {}, tr = (o.tricks || []).map(function (k) { var d = DMK_BOSS_TRICKS.filter(function (t) { return t[0] === k; })[0]; return d ? d[1] : null; }).filter(Boolean);
return "📜 <b>A warning in a shaky hand:</b> <i>“" + dmkEsc(o.name || "The master of this place") + (tr.length ? " knows these tricks: " + tr.join("; ").toLowerCase() + "." : " fights with nothing but strength. Keep your vigour up.") + "”</i>";
}
];
for (var i = 0; i < tries.length && !clue; i++) {
try {
clue = tries[i]();
}
catch (e) {
clue = null;
}
}
var find = !clue || Math.random() < 0.35;
if (clue)
dmkSay(clue);
if (find && typeof dglTake === "function") {
var rm = dmkRoomAtXZ(bk.x, bk.z), lv = dmkLv(rm ? DMKW.rooms.indexOf(rm) : null);
dglTake("dmk", R && R.sid, { src: "chest", lv: lv, kind: "chest", theme: S.opt.theme, where: S.opt.name || "a dungeon", at: { x: B + bk.x, y: 0, z: bk.z }, heal: function (n) { R.vig = Math.min(100, R.vig + n); } }, "📚 <b>Tucked behind the books</b>");
}
else if (!clue)
dmkSay("📚 <b>Old books</b>, crumbling. Nothing more here.");
},
function () {
var R = DMK.run, el = document.getElementById("dmk-hud");
if (!el) {
el = document.createElement("div");
el.id = "dmk-hud";
el.style.cssText = "position:fixed;z-index:42;left:50%;transform:translateX(-50%);top:calc(58px + env(safe-area-inset-top,0px));width:min(460px,calc(100vw - 32px));font:600 12.5px var(--sans,system-ui);color:#F2E6C4;pointer-events:none;text-align:center";
document.body.appendChild(el);
var sb = document.createElement("div");
sb.id = "dmk-strike";
sb.textContent = "⚔️ Strike";
sb.setAttribute("role", "button");
sb.style.cssText = "position:fixed;z-index:43;right:16px;bottom:calc(150px + env(safe-area-inset-bottom,0px));padding:14px 16px;border-radius:30px;background:rgba(120,30,20,.85);border:1px solid #F0A080;color:#FFE8D8;font:700 14px var(--sans,system-ui);cursor:pointer;user-select:none;display:none";
sb.addEventListener("pointerdown", function (e) { e.preventDefault(); e.stopPropagation(); dmkStrike(); });
document.body.appendChild(sb);
}
var h = "", Bo = R.boss;
if (Bo && Bo.st !== "sleep") {
var f = Math.max(0, Bo.hp) / Bo.max;
h += "<div style='text-shadow:0 1px 3px #000'>💀 " + dmkEsc(Bo.name) + (Bo.st === "dead" ? " · beaten" : "") + (Bo.shieldT > 0 ? " · stone skin" : "") + "</div><div style='height:9px;border-radius:5px;background:rgba(30,20,20,.8);overflow:hidden;margin-top:3px;border:1px solid rgba(255,200,160,.4)'><div style='height:100%;width:" + (f * 100).toFixed(1) + "%;background:linear-gradient(90deg,#A02A1A,#E0603A)'></div></div>";
}
var seen = DMKW.rooms.filter(function (r) { return r.seen; }).length;
if (!dmkFighting())
h += "<div style='margin-top:6px;display:flex;align-items:center;gap:6px;justify-content:center;text-shadow:0 1px 3px #000'>Vigour<div style='width:130px;height:7px;border-radius:4px;background:rgba(20,30,20,.8);overflow:hidden'><div style='height:100%;width:" + Math.max(0, R.vig).toFixed(0) + "%;background:#6AC07A'></div></div></div>";
else if (R.vig < 100)
h += "<div style='margin-top:6px;text-shadow:0 1px 3px #000'>Vigour " + Math.max(0, Math.round(R.vig)) + "</div>";
h += "<div style='margin-top:3px;opacity:.85;text-shadow:0 1px 3px #000'>Rooms " + seen + "/" + DMKW.rooms.length + " · beasts down " + R.kills + (DMKW.key && DMKW.key.have ? " · 🗝️" : "") + (R.won ? " · beaten" : "") + "</div>";
if (el.dataset.h !== h) {
el.dataset.h = h;
el.innerHTML = h;
}
el.style.display = walkMode ? "block" : "none";
var sb2 = document.getElementById("dmk-strike");
if (sb2)
sb2.style.display = !dmkFighting() && walkMode && ("ontouchstart" in window || navigator.maxTouchPoints > 0) ? "block" : "none";
},
function () {
if (document.getElementById("dmk-css"))
return;
var s = document.createElement("style");
s.id = "dmk-css";
s.textContent = "#dmk-panel{position:fixed;z-index:60;inset:max(10px,env(safe-area-inset-top)) 10px 10px 10px;max-width:820px;margin:0 auto;background:rgba(22,18,16,.97);border:1px solid #6A5A44;border-radius:10px;color:#EFE4CC;font:13px var(--sans,system-ui);display:flex;flex-direction:column;box-shadow:0 10px 40px rgba(0,0,0,.6)}" +
"#dmk-panel .dh{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #4A3E30}#dmk-panel .dh b{font:600 17px var(--serif,Georgia);color:#FFE7B0;flex:1}" +
"#dmk-panel .tabs{display:flex;gap:4px;padding:6px 10px;border-bottom:1px solid #3A3028;flex-wrap:wrap}#dmk-panel .tab{padding:6px 10px;border-radius:6px;cursor:pointer;border:1px solid transparent}#dmk-panel .tab.on{background:#3A2E22;border-color:#8A7254;color:#FFE7B0}" +
"#dmk-panel .db{flex:1;overflow:auto;padding:10px 12px;-webkit-overflow-scrolling:touch}#dmk-panel .df{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #4A3E30;flex-wrap:wrap}" +
"#dmk-panel h4{margin:12px 0 4px;font:600 13.5px var(--serif,Georgia);color:#E8D2A0}#dmk-panel .sub{opacity:.7;font-size:12px;margin-bottom:4px}" +
"#dmk-panel .chips{display:flex;flex-wrap:wrap;gap:5px}#dmk-panel .chip{padding:5px 9px;border-radius:14px;border:1px solid #5A4A38;background:#2A221C;cursor:pointer;user-select:none;font-size:12.5px}#dmk-panel .chip.on{background:#6A4A22;border-color:#E0B060;color:#FFF0D0}" +
"#dmk-panel .chip small{opacity:.7;margin-left:4px}#dmk-panel button.bt{padding:8px 12px;border-radius:7px;border:1px solid #8A7254;background:#3A2E22;color:#FFE7B0;font:600 13px var(--sans,system-ui);cursor:pointer}#dmk-panel button.bt.go{background:#6A3A1A;border-color:#E09050}" +
"#dmk-panel button.bt:disabled{opacity:.45;cursor:default}#dmk-panel input[type=text],#dmk-panel select{background:#1A1612;color:#EFE4CC;border:1px solid #5A4A38;border-radius:6px;padding:6px 8px;font:13px var(--sans,system-ui)}" +
"#dmk-panel .say{margin:6px 0;padding:6px 9px;border-radius:6px;background:#3A2418;border:1px solid #8A5A3A}#dmk-panel .map{display:flex;gap:10px;flex-wrap:wrap}#dmk-panel canvas{align-self:flex-start;height:auto;background:#0E0C0A;border:1px solid #4A3E30;border-radius:6px;touch-action:none;max-width:100%}" +
"#dmk-panel .room{flex:1;min-width:250px}#dmk-panel .card{border:1px solid #4A3E30;border-radius:8px;padding:8px 10px;margin:6px 0;background:#1E1915}#dmk-panel .row{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:4px 0}";
document.head.appendChild(s);
},
function (tab) {
dmkCss();
DMK.open = true;
if (tab)
DMK.tab = tab;
if (!DMK.opt)
DMK.opt = dmkDefaults();
var el = document.getElementById("dmk-panel");
if (!el) {
el = document.createElement("div");
el.id = "dmk-panel";
document.body.appendChild(el);
el.addEventListener("click", dmkClick);
el.addEventListener("change", dmkChange);
el.addEventListener("input", dmkInput);
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
}
el.style.display = "flex";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
dmkPaint();
if (DMK.tab === "mine")
dmkMineFetch();
},
function () {
var el = document.getElementById("dmk-panel");
if (!el || !DMK.open)
return;
var keepScroll = el.querySelector(".db"), st = keepScroll ? keepScroll.scrollTop : 0;
var h = "<div class='dh'><span style='font-size:20px'>🏰</span><b>The Dungeon Maker</b>" + (WLD.on !== "crawl" && WLD.on !== "dmk" ? "<button class='bt' data-a='hall'>🏛️ The Crawlers' Hall</button>" : "") + "<button class='bt' data-a='close'>✕</button></div>";
h += "<div class='tabs'>" + [["make", "⚒️ Make"], ["map", "🗺️ Room by room"], ["mine", "📜 My dungeons"]].map(function (t) { return "<span class='tab" + (DMK.tab === t[0] ? " on" : "") + "' data-tab='" + t[0] + "'>" + t[1] + "</span>"; }).join("") + "</div>";
h += "<div class='db'>" + (DMK.say ? "<div class='say'>" + DMK.say + "</div>" : "") + (DMK.tab === "make" ? dmkMakeHtml() : DMK.tab === "map" ? dmkMapHtml() : dmkMineHtml()) + "</div>";
h += "<div class='df'>" + dmkFootHtml() + "</div>";
el.innerHTML = h;
var nb = el.querySelector(".db");
if (nb)
nb.scrollTop = st;
if (DMK.tab === "map")
dmkDrawMap();
},
function () {
var has = !!DMK.edit;
if (DMK.tab === "make")
return "<button class='bt go' data-a='build'>⚒️ Build it</button>" + (has ? "<button class='bt' data-a='tab-map'>🗺️ Change it room by room</button><button class='bt' data-a='walk'>🔦 Walk it</button>" : "") + "<span style='flex:1'></span><button class='bt' data-a='fate'>🎲 Let fate choose everything</button>";
if (DMK.tab === "map")
return has ? "<button class='bt go' data-a='walk'>🔦 Walk it</button><button class='bt' data-a='savedesign'>💾 Keep it</button><button class='bt' data-a='undo'" + (DMK.undo.length ? "" : " disabled") + ">↶ Undo</button><button class='bt' data-a='reroll'>🎲 Same choices, new layout</button>" : "<button class='bt go' data-a='tab-make'>⚒️ Make one first</button>";
return "<button class='bt go' data-a='tab-make'>⚒️ Make a new one</button><span style='flex:1'></span><span style='opacity:.7;align-self:center'>" + dmkMine().length + " of " + DMK_MAX_MINE + " kept on this device</span>";
},
function () {
var o = DMK.opt, T = dmkTheme(o.theme), h = "";
h += "<div style='display:flex;gap:8px;flex-wrap:wrap;margin:2px 0 10px;padding:10px;border:1px solid #C9A868;border-radius:10px;background:rgba(201,168,104,.12)'>" +
"<button class='bt go' data-a='rand-go' style='font-size:15px'>🎲 Generate a random dungeon and go down</button>" +
"<button class='bt' data-a='rand'>🎲 Generate one to look at first</button>" +
"<div class='sub' style='flex-basis:100%'>Fate picks everything (size, theme, beasts, traps, puzzles, treasure, the boss) and builds it. Or choose each thing yourself below.</div></div>";
h += "<h4>Its name</h4><input type='text' data-o='name' maxlength='48' placeholder='The Halls of Whatever You Like' value='" + dmkEsc(o.name || "") + "' style='width:min(420px,100%)'>";
h += "<h4>Size</h4>" + dmkChips("size", DMK_SIZES, o.size) + "<div class='sub'>" + dmkEsc(dmkPick(DMK_SIZES, o.size).sub) + "</div>";
h += "<h4>Shape</h4>" + dmkChips("shape", DMK_SHAPES, o.shape) + "<div class='sub'>" + dmkEsc(dmkPick(DMK_SHAPES, o.shape).sub) + "</div>";
h += "<h4>How many dreamers it is made for</h4>" + dmkChips("party", DMK_PARTY, o.party) + "<div class='sub'>More dreamers: more beasts, and tougher ones.</div>";
h += "<h4>Difficulty</h4>" + dmkChips("diff", DMK_DIFF, o.diff) + "<div class='sub'>" + dmkEsc(dmkPick(DMK_DIFF, o.diff).sub) + "</div>";
h += "<h4>Theme</h4>" + dmkChips("theme", DMK_THEMES, o.theme) + "<div class='sub'>" + dmkEsc(T.sub) + "</div>";
h += "<h4>Decor style</h4>" + dmkChips("decor", DMK_DECOR, o.decor) + "<div class='sub'>" + dmkEsc(dmkPick(DMK_DECOR, o.decor).sub) + "</div>";
var sets = o.sets || T.sets;
h += "<h4>What stands in the rooms</h4><div class='sub'>" + (o.sets ? "Your own choice" : "The " + dmkEsc(T.n.toLowerCase()) + "'s own things") + " (each room's kind adds its own too). <span class='chip' data-a='sets-theme'>use the theme's</span></div><div class='chips'>" + DMK_SETS.map(function (s) { return dmkChip("sets", s[0], dmkEsc(s[1]), sets.indexOf(s[0]) >= 0); }).join("") + "</div>";
h += "<h4>Light</h4>" + dmkChips("light", DMK_LIGHT, o.light) + "<div class='sub'>" + dmkEsc(dmkPick(DMK_LIGHT, o.light).sub) + "</div>";
var bl = dmkBeastList(), bsel = o.beasts || T.beasts;
h += "<h4>Beasts</h4><div class='sub'>" + (o.beasts ? "Your own choice" : "The " + dmkEsc(T.n.toLowerCase()) + "'s own beasts") + ". <span class='chip' data-a='beasts-theme'>use the theme's</span></div><div class='chips'>" + bl.map(function (b) { return dmkChip("beasts", b[0], dmkEsc(b[1]), bsel.indexOf(b[0]) >= 0); }).join("") + "</div>";
h += "<div class='sub' style='margin-top:6px'>How many:</div>" + dmkChips("many", DMK_MANY, o.many);
h += "<h4>Traps</h4><div class='chips'>" + DMK_TRAPS.map(function (t) { return dmkChip("traps", t.k, dmkEsc(t.n), (o.traps || []).indexOf(t.k) >= 0); }).join("") + "</div><div class='sub' style='margin-top:6px'>How often:</div>" + dmkChips("often", DMK_OFTEN, o.often);
h += "<h4>Puzzles</h4><div class='chips'>" + DMK_PUZZLES.map(function (t) { return dmkChip("puzzles", t.k, dmkEsc(t.n), (o.puzzles || []).indexOf(t.k) >= 0); }).join("") + "</div><div class='sub' style='margin-top:6px'>How many puzzle rooms:</div><div class='chips'>" + [0, 1, 2, 3, 4].map(function (n) { return dmkChip("puzN", n, n ? String(n) : "None", (o.puzN | 0) === n); }).join("") + "</div>";
h += "<h4>Treasure</h4>" + dmkChips("loot", DMK_LOOT, o.loot) + "<div class='chips' style='margin-top:6px'>" + dmkChip("secret", "1", "🗝️ A secret room", !!o.secret) + "</div>";
var B = o.boss || {};
h += "<h4>The boss</h4><div class='chips'>" + dmkChip("bosson", "1", "💀 A boss at the end", !!B.on) + "</div>";
if (B.on) {
h += "<div class='row'><span>Its beast:</span><select data-o='bosskind'><option value=''>the theme's own (" + dmkEsc((dmkBeast(T.boss) || {}).name || "") + ")</option>" + bl.map(function (b) { return "<option value='" + b[0] + "'" + (B.kind === b[0] ? " selected" : "") + ">" + dmkEsc(b[1]) + "</option>"; }).join("") + "</select></div>";
h += "<div class='row'><span>Its name:</span><input type='text' data-o='bossname' maxlength='40' placeholder='The Thing Below' value='" + dmkEsc(B.name || "") + "'></div>";
h += "<div class='sub'>Its size:</div>" + dmkChips("bosssize", DMK_BOSS_SIZES, B.size || "huge");
h += "<div class='sub' style='margin-top:6px'>Its tricks:</div><div class='chips'>" + DMK_BOSS_TRICKS.map(function (t) { return dmkChip("tricks", t[0], dmkEsc(t[1]), (B.tricks || []).indexOf(t[0]) >= 0); }).join("") + "</div>";
}
h += "<h4>Seed</h4><div class='row'><input type='text' data-o='seed' inputmode='numeric' style='width:120px' placeholder='any number' value='" + (o.seed || "") + "'><span class='sub'>The same seed and the same choices always build the same dungeon. Leave it empty for a new one each time.</span></div>";
return h;
},
function () {
var S = DMK.edit;
if (!S)
return "<p>Build a dungeon on the ⚒️ Make page first; then every room of it can be changed here.</p>";
var why = dmkCheck(S);
var h = "<div class='sub'>" + dmkEsc(S.opt.name || "Your dungeon") + ": " + S.rooms.length + " rooms. Tap a room to change it. " + (DMK.joinFrom != null ? "<b>Now tap the room to join it to.</b> <span class='chip' data-a='joincancel'>cancel</span>" : "") + "</div>";
if (why)
h += "<div class='say'>" + dmkEsc(why) + "</div>";
h += "<div class='map'><canvas id='dmk-map' width='420' height='420'></canvas><div class='room'>" + dmkRoomHtml() + "</div></div>";
return h;
},
function () {
var S = DMK.edit, i = DMK.sel;
if (i < 0 || !S.rooms[i])
return "<div class='card'>No room chosen. Tap one on the map.<div class='sub' style='margin-top:6px'>🚪 is the way in (and the stair out). 💀 is the boss's hall. Grey lines are passages; a bar across one is a gate.</div></div>";
var r = S.rooms[i], K = dmkKind(r.k), h = "<div class='card'>";
h += "<div class='row'><b style='font:600 15px var(--serif,Georgia);color:#FFE7B0'>" + K.icon + " " + dmkEsc(dmkRoomName(S, i)) + "</b></div>";
h += "<div class='row'><input type='text' data-r='name' maxlength='40' placeholder='Give it a name' value='" + dmkEsc(r.name || "") + "'></div>";
if (i !== 0) {
h += "<div class='sub'>What it is:</div><div class='chips'>" + DMK_KINDS.filter(function (k) { return k.k !== "entry"; }).map(function (k) { return dmkChip("rk", k.k, k.icon + " " + dmkEsc(k.n), r.k === k.k); }).join("") + "</div>";
}
h += "<div class='sub' style='margin-top:6px'>Size: " + (r.w * DMK_CELL) + " × " + (r.l * DMK_CELL) + " m</div>";
if (i !== 0)
h += "<div class='row'><button class='bt' data-a='w-'>narrower</button><button class='bt' data-a='w+'>wider</button><button class='bt' data-a='l-'>shorter</button><button class='bt' data-a='l+'>longer</button></div><div class='row'><span class='sub'>Move:</span><button class='bt' data-a='mv-N'>↑</button><button class='bt' data-a='mv-S'>↓</button><button class='bt' data-a='mv-W'>←</button><button class='bt' data-a='mv-E'>→</button></div>";
h += "<div class='sub'>Add a room off this one:</div><div class='row'><button class='bt' data-a='add-N'>＋ north</button><button class='bt' data-a='add-S'" + (i === 0 ? " disabled" : "") + ">＋ south</button><button class='bt' data-a='add-W'>＋ west</button><button class='bt' data-a='add-E'>＋ east</button></div>";
if (!K.safe && !K.boss) {
var bl = dmkBeastList();
h += "<div class='sub' style='margin-top:6px'>Beasts here: <b>" + (r.mobs | 0) + "</b></div><div class='row'><button class='bt' data-a='mob-'>fewer</button><button class='bt' data-a='mob+'>more</button><select data-r='beast'><option value=''>the dungeon's beasts</option>" + bl.map(function (b) { return "<option value='" + b[0] + "'" + (r.beast === b[0] ? " selected" : "") + ">only " + dmkEsc(b[1]) + "</option>"; }).join("") + "</select></div>";
}
if (K.boss) {
var bl2 = dmkBeastList();
h += "<div class='sub' style='margin-top:6px'>The boss here:</div><div class='row'><select data-r='beast'><option value=''>as chosen on the Make page</option>" + bl2.map(function (b) { return "<option value='" + b[0] + "'" + (r.beast === b[0] ? " selected" : "") + ">" + dmkEsc(b[1]) + "</option>"; }).join("") + "</select></div>";
}
if (i !== 0) {
h += "<div class='sub' style='margin-top:6px'>A trap:</div><div class='chips'>" + dmkChip("rtrap", "", "none", !r.trap) + DMK_TRAPS.map(function (t) { return dmkChip("rtrap", t.k, dmkEsc(t.n), r.trap === t.k); }).join("") + "</div>";
if (r.k === "puzzle")
h += "<div class='sub' style='margin-top:6px'>Its puzzle (it bars the way on until solved):</div><div class='chips'>" + DMK_PUZZLES.map(function (t) { return dmkChip("rpuz", t.k, dmkEsc(t.n), r.puz === t.k); }).join("") + "</div>";
h += "<div class='chips' style='margin-top:6px'>" + dmkChip("rlock", "1", "🔒 Its door is locked (needs the golden key)", !!r.lock) + "</div>";
}
h += "<div class='sub' style='margin-top:6px'>Chests: <b>" + (r.chests != null ? r.chests : (K.chest || 0)) + "</b></div><div class='row'><button class='bt' data-a='ch-'>fewer</button><button class='bt' data-a='ch+'>more</button></div>";
h += "<div class='sub' style='margin-top:6px'>Decor here:</div><div class='chips'>" + dmkChip("rdecor", "", "as the dungeon", !r.decor) + DMK_DECOR.map(function (d) { return dmkChip("rdecor", d.k, dmkEsc(d.n), r.decor === d.k); }).join("") + "</div>";
var rs = r.sets || [];
h += "<div class='sub' style='margin-top:6px'>Things in it " + (rs.length ? "(your choice)" : "(chosen by its kind)") + ":</div><div class='chips'>" + DMK_SETS.map(function (s) { return dmkChip("rsets", s[0], dmkEsc(s[1]), rs.indexOf(s[0]) >= 0); }).join("") + "</div>";
h += "<div class='row' style='margin-top:8px'><button class='bt' data-a='join'>🔗 Join it to another room</button><button class='bt' data-a='part'>✂️ Part it from…</button>" + (i !== 0 ? "<button class='bt' data-a='remove'>🗑️ Take this room away</button>" : "") + "</div>";
return h + "</div>";
},
function (S) {
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
S.rooms.forEach(function (r) { x0 = Math.min(x0, r.x); x1 = Math.max(x1, r.x + r.w); z0 = Math.min(z0, r.z); z1 = Math.max(z1, r.z + r.l); });
var cv = document.getElementById("dmk-map"), W = cv ? cv.width : 420, H = cv ? cv.height : 420, pad = 14, s = Math.min((W - pad * 2) / (x1 - x0 || 1), (H - pad * 2) / (z1 - z0 || 1));
return { s: s, ox: pad + ((W - pad * 2) - (x1 - x0) * s) / 2 - x0 * s, oz: pad + ((H - pad * 2) - (z1 - z0) * s) / 2 - z0 * s };
},
function () {
var cv = document.getElementById("dmk-map"), S = DMK.edit;
if (!cv || !S)
return;
var box = cv.parentNode.getBoundingClientRect(), side = Math.max(260, Math.min(520, (box.width || 420) > 560 ? 420 : (box.width || 420) - 4));
cv.width = side;
cv.height = side;
var x = cv.getContext("2d"), V = dmkMapView(S), T = dmkTheme(S.opt.theme), d = dmkDepths(S);
x.fillStyle = "#0E0C0A";
x.fillRect(0, 0, cv.width, cv.height);
S.links.forEach(function (L) {
var C = dmkCorr(S.rooms[L[0]], S.rooms[L[1]]);
x.fillStyle = "#5A5248";
(C || []).forEach(function (c) { x.fillRect(V.ox + c.x * V.s, V.oz + c.z * V.s, c.w * V.s, c.l * V.s); });
var a = S.rooms[L[0]], b = S.rooms[L[1]], from = (d[L[0]] || 0) <= (d[L[1]] || 0) ? a : b, to = from === a ? b : a;
if (to.k === "secret" || from.k === "puzzle" || to.lock) {
var c0 = C && C[0];
if (c0) {
x.fillStyle = to.k === "secret" ? "#8A7A60" : to.lock ? "#E0B040" : "#C86A3A";
x.fillRect(V.ox + (c0.x + c0.w / 2) * V.s - 4, V.oz + (c0.z + c0.l / 2) * V.s - 4, 8, 8);
}
}
});
S.rooms.forEach(function (r, i) {
var K = dmkKind(r.k), X = V.ox + r.x * V.s, Z = V.oz + r.z * V.s, W = r.w * V.s, Hh = r.l * V.s;
x.fillStyle = K.boss ? "#5A2018" : K.safe ? "#2A3A2A" : r.k === "secret" ? "#3A3428" : r.k === "treasure" ? "#4A3A18" : r.k === "trap" || r.trap ? "#4A2A1A" : r.k === "puzzle" ? "#2A2A4A" : "#3A332B";
x.fillRect(X, Z, W, Hh);
x.strokeStyle = i === DMK.sel ? "#FFD070" : "#8A7A60";
x.lineWidth = i === DMK.sel ? 3 : 1;
x.strokeRect(X + 0.5, Z + 0.5, W - 1, Hh - 1);
x.font = Math.max(11, Math.min(22, Math.min(W, Hh) * 0.45)) + "px system-ui";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = "#fff";
x.fillText(K.icon, X + W / 2, Z + Hh / 2 - (Hh > 34 ? 6 : 0));
if (Hh > 34) {
x.font = "10px system-ui";
x.fillStyle = "#E8D8B0";
x.fillText((r.mobs | 0) ? "🐾" + (r.mobs | 0) : "", X + W / 2, Z + Hh / 2 + 12);
}
if (r.trap) {
x.font = "10px system-ui";
x.fillText("⚠️", X + 8, Z + 9);
}
});
var e = S.rooms[0];
x.fillStyle = "#E8D8B0";
x.font = "10px system-ui";
x.fillText("stair", V.ox + (e.x + e.w / 2) * V.s, V.oz + (e.z + e.l) * V.s - 6);
cv.onclick = function (ev) {
var b = cv.getBoundingClientRect(), mx = (ev.clientX - b.left) * cv.width / b.width, mz = (ev.clientY - b.top) * cv.height / b.height, hit = -1;
S.rooms.forEach(function (r, i) { var X = V.ox + r.x * V.s, Z = V.oz + r.z * V.s; if (mx >= X && mx <= X + r.w * V.s && mz >= Z && mz <= Z + r.l * V.s)
hit = i; });
if (hit < 0)
return;
if (DMK.joinFrom != null) {
var why = DMK.joinMode === "part" ? dmkEdPart(DMK.joinFrom, hit) : dmkEdJoin(DMK.joinFrom, hit);
DMK.joinFrom = null;
DMK.say = why ? dmkEsc(why) : (DMK.joinMode === "part" ? "Parted." : "Joined: a new passage runs between them.");
DMK.sel = hit;
dmkPaint();
return;
}
DMK.sel = hit;
DMK.say = "";
dmkPaint();
};
},
function () {
var m = dmkMine(), sv = DMK.mineSrv || {};
if (!m.length)
return "<p>Nothing kept yet. Make a dungeon, walk it, and keep it here. Beat it once, and you can send it to the <b>Dungeon Crawlers</b>: once the Keeper approves it, everyone can play it, and you earn gold each time another dreamer clears it.</p>";
return m.map(function (d, i) {
var S = d.spec, T = dmkTheme(S.opt.theme), srv = d.sid ? sv[d.sid] : null;
var status = srv ? ({ waiting: "⏳ waiting for the Keeper", approved: "✅ in the Dungeon Crawlers' Hall", featured: "🌟 featured in the Crawlers' Hall", returned: "↩️ sent back by the Keeper", down: "⛔ taken down" }[srv.status] || srv.status) : (d.sid ? "sent" : "");
return "<div class='card'><div class='row'><b style='font:600 14.5px var(--serif,Georgia);color:#FFE7B0'>" + dmkEsc(S.opt.name || "Untitled dungeon") + "</b><span class='sub'>" + dmkEsc(T.n) + " · " + S.rooms.length + " rooms · " + dmkEsc(dmkPick(DMK_DIFF, S.opt.diff).n) + " · " + dmkEsc(dmkPick(DMK_PARTY, S.opt.party).sub) + "</span></div>" +
"<div class='sub'>" + (d.cleared ? "🏆 beaten" + (d.best ? " in " + Math.max(1, Math.round(d.best / 60)) + " min" : "") : "not beaten yet") + (status ? " · " + status : "") + (srv && srv.clears ? " · cleared " + srv.clears + "×" : "") + (srv && srv.stars ? " · " + (+srv.stars).toFixed(1) + "★ (" + srv.votes + ")" : "") + (srv && srv.gold ? " · you have earned " + srv.gold + " gold" : "") + (srv && srv.note ? " · the Keeper says: “" + dmkEsc(srv.note) + "”" : "") + "</div>" +
"<div class='row'><button class='bt go' data-a='m-walk' data-i='" + i + "'>🔦 Walk it</button><button class='bt' data-a='m-edit' data-i='" + i + "'>🗺️ Change it</button><button class='bt' data-a='m-send' data-i='" + i + "'" + (d.cleared && !(srv && /approved|featured|waiting/.test(srv.status)) ? "" : " disabled") + ">⚒️ Send to the Dungeon Crawlers</button><button class='bt' data-a='m-del' data-i='" + i + "'>🗑️</button></div></div>";
}).join("") +
"<div class='sub'>Only a dungeon you have beaten yourself can be sent. Changing a design after sending it means sending it again.</div>";
},
function (e) {
var t = e.target.closest("[data-tab],[data-a],[data-g]");
if (!t)
return;
e.stopPropagation();
if (t.dataset.tab) {
DMK.tab = t.dataset.tab;
DMK.say = "";
DMK.joinFrom = null;
dmkPaint();
if (DMK.tab === "mine")
dmkMineFetch();
return;
}
var o = DMK.opt, T = dmkTheme(o.theme);
if (t.dataset.g) {
var g = t.dataset.g, v = t.dataset.v;
if ({ size: 1, shape: 1, party: 1, diff: 1, theme: 1, decor: 1, light: 1, many: 1, often: 1, loot: 1 }[g])
o[g] = v;
else if (g === "sets")
o.sets = dmkToggle(o.sets || T.sets, v);
else if (g === "beasts") {
o.beasts = dmkToggle(o.beasts || T.beasts, v);
if (!o.beasts.length)
o.beasts = null;
}
else if (g === "traps")
o.traps = dmkToggle(o.traps, v);
else if (g === "puzzles")
o.puzzles = dmkToggle(o.puzzles, v);
else if (g === "puzN")
o.puzN = +v;
else if (g === "secret")
o.secret = !o.secret;
else if (g === "bosson") {
o.boss = o.boss || {};
o.boss.on = !o.boss.on;
}
else if (g === "bosssize") {
o.boss.size = v;
}
else if (g === "tricks") {
o.boss.tricks = dmkToggle(o.boss.tricks, v);
}
else if (DMK.edit && DMK.sel >= 0) {
var i = DMK.sel, why = "";
if (g === "rk")
why = dmkEdKind(i, v);
else if (g === "rtrap")
why = dmkEdSet(i, "trap", v || null);
else if (g === "rpuz")
why = dmkEdSet(i, "puz", v);
else if (g === "rlock")
why = dmkEdSet(i, "lock", DMK.edit.rooms[i].lock ? null : true);
else if (g === "rdecor")
why = dmkEdSet(i, "decor", v || null);
else if (g === "rsets") {
var ns = dmkToggle(DMK.edit.rooms[i].sets, v);
why = dmkEdSet(i, "sets", ns.length ? ns : null);
}
DMK.say = why ? dmkEsc(why) : "";
}
dmkPaint();
return;
}
var a = t.dataset.a, S = DMK.edit, i2 = DMK.sel, why2 = "";
if (a === "close") {
dmkClose();
return;
}
if (a === "hall") {
dmkClose();
dmkCrawlGo();
return;
}
if (a === "tab-map") {
DMK.tab = "map";
dmkPaint();
return;
}
if (a === "tab-make") {
DMK.tab = "make";
dmkPaint();
return;
}
if (a === "sets-theme") {
o.sets = null;
dmkPaint();
return;
}
if (a === "beasts-theme") {
o.beasts = null;
dmkPaint();
return;
}
if (a === "rand" || a === "rand-go") {
dmkRandom(a === "rand-go");
return;
}
if (a === "fate") {
dmkFate();
dmkPaint();
return;
}
if (a === "build") {
dmkBuildFromChoices();
return;
}
if (a === "reroll") {
var keepSeed = o.seed;
o.seed = 0;
dmkBuildFromChoices();
o.seed = keepSeed;
return;
}
if (a === "walk") {
if (!S)
return;
var di = dmkKeep();
if (di < 0)
return;
dmkPlay(S, { design: di });
return;
}
if (a === "savedesign") {
var k = dmkKeep();
if (k >= 0) {
DMK.say = "Kept in 📜 My dungeons.";
dmkPaint();
}
return;
}
if (a === "undo") {
dmkUndo();
DMK.say = "";
dmkPaint();
return;
}
if (a === "joincancel") {
DMK.joinFrom = null;
dmkPaint();
return;
}
if (a === "m-walk") {
var d = dmkMine()[+t.dataset.i];
if (d)
dmkPlay(d.spec, { design: +t.dataset.i });
return;
}
if (a === "m-edit") {
var d2 = dmkMine()[+t.dataset.i];
if (d2) {
DMK.edit = JSON.parse(JSON.stringify(d2.spec));
DMK.opt = JSON.parse(JSON.stringify(d2.spec.opt));
DMK.editIdx = +t.dataset.i;
DMK.undo = [];
DMK.sel = -1;
DMK.tab = "map";
DMK.say = "";
dmkPaint();
}
return;
}
if (a === "m-send") {
dmkSubmit(+t.dataset.i);
return;
}
if (a === "m-del") {
var m = dmkMine(), di2 = +t.dataset.i;
if (t.dataset.sure !== "1") {
t.dataset.sure = "1";
t.textContent = "🗑️ Sure?";
return;
}
m.splice(di2, 1);
dmkSaveMine(m);
if (DMK.editIdx === di2)
DMK.editIdx = null;
else if (DMK.editIdx > di2)
DMK.editIdx--;
dmkPaint();
return;
}
if (!S || i2 < 0)
return;
var m2 = /^(w|l)([+-])$/.exec(a);
if (m2)
why2 = dmkEdResize(i2, m2[1] === "w" ? (m2[2] === "+" ? 2 : -2) : 0, m2[1] === "l" ? (m2[2] === "+" ? 2 : -2) : 0);
var mv = /^mv-([NSEW])$/.exec(a);
if (mv) {
var D = DMK_DIRS[mv[1]];
why2 = dmkEdMove(i2, D[0], D[1]);
}
var ad = /^add-([NSEW])$/.exec(a);
if (ad) {
why2 = dmkEdAdd(i2, ad[1], "chamber");
if (!why2) {
DMK.sel = S.rooms.length - 1;
S = DMK.edit;
DMK.sel = DMK.edit.rooms.length - 1;
}
}
if (a === "mob-" || a === "mob+")
why2 = dmkEdSet(i2, "mobs", Math.max(0, Math.min(12, (S.rooms[i2].mobs | 0) + (a === "mob+" ? 1 : -1))));
if (a === "ch-" || a === "ch+") {
var cur = S.rooms[i2].chests != null ? S.rooms[i2].chests : (dmkKind(S.rooms[i2].k).chest || 0);
why2 = dmkEdSet(i2, "chests", Math.max(0, Math.min(4, cur + (a === "ch+" ? 1 : -1))));
}
if (a === "remove") {
why2 = dmkEdRemove(i2);
if (!why2)
DMK.sel = -1;
}
if (a === "join" || a === "part") {
DMK.joinFrom = i2;
DMK.joinMode = a;
DMK.say = a === "join" ? "Tap the room to join it to." : "Tap the room to part it from.";
dmkPaint();
return;
}
DMK.say = why2 ? dmkEsc(why2) : "";
dmkPaint();
},
function (e) {
var t = e.target, o = DMK.opt;
if (t.dataset.o === "name")
o.name = t.value.slice(0, 48);
if (t.dataset.o === "bossname")
o.boss.name = t.value.slice(0, 40);
if (t.dataset.o === "seed")
o.seed = Math.max(0, Math.min(99999999, parseInt(t.value, 10) || 0));
if (t.dataset.r === "name" && DMK.edit && DMK.sel >= 0) {
var r = DMK.edit.rooms[DMK.sel];
if (t.value)
r.name = t.value.slice(0, 40);
else
delete r.name;
}
if (DMK.edit && (t.dataset.o === "name"))
DMK.edit.opt.name = o.name;
},
function () {
var R = Math.random, pick = function (L) { return L[Math.floor(R() * L.length)].k; }, o = DMK.opt;
o.size = pick(DMK_SIZES.slice(0, 5));
o.shape = pick(DMK_SHAPES);
o.party = pick(DMK_PARTY);
o.diff = pick(DMK_DIFF.slice(0, 4));
o.theme = pick(DMK_THEMES);
o.decor = pick(DMK_DECOR.slice(1));
o.light = pick(DMK_LIGHT);
o.sets = null;
o.beasts = null;
o.many = pick(DMK_MANY.slice(0, 3));
o.often = pick(DMK_OFTEN);
o.loot = pick(DMK_LOOT);
o.traps = DMK_TRAPS.filter(function () { return R() < 0.5; }).map(function (t) { return t.k; });
o.puzzles = DMK_PUZZLES.filter(function () { return R() < 0.5; }).map(function (t) { return t.k; });
if (!o.puzzles.length)
o.puzzles = ["levers"];
o.puzN = Math.floor(R() * 3);
o.secret = R() < 0.7;
o.boss = { on: true, kind: null, name: "", size: pick(DMK_BOSS_SIZES), tricks: DMK_BOSS_TRICKS.filter(function () { return R() < 0.5; }).map(function (t) { return t[0]; }) };
o.seed = 0;
var A = ["The", "The", "Halls of", "Vaults of", "Pits of", "Tomb of", "Cellars of"], N = ["Ash", "Whispers", "the Lost King", "Grey Teeth", "Ember", "the Pale Hand", "Sorrow", "Old Iron", "the Drowned", "Stillness"];
o.name = A[Math.floor(R() * A.length)] + " " + N[Math.floor(R() * N.length)];
},
function () {
var o = DMK.opt;
if (!o.name)
o.name = dmkPick(DMK_THEMES, o.theme).n.replace(/^Old |^Sunken /, "") + " of " + ["Ash", "Echoes", "the Deep", "Bones", "Shadows", "Gold"][Math.floor(Math.random() * 6)];
var S = dmkGenerate(o), why = dmkCheck(S);
if (why) {
DMK.say = "That layout did not come out right; trying another: " + dmkEsc(why);
S = dmkGenerate(Object.assign({}, o, { seed: 0 }));
}
DMK.edit = S;
DMK.editIdx = null;
DMK.undo = [];
DMK.sel = -1;
DMK.tab = "map";
DMK.say = "⚒️ Built: <b>" + dmkEsc(S.opt.name) + "</b>, " + S.rooms.length + " rooms (seed " + S.seed + "). Tap any room to change it, or <b>🔦 Walk it</b>.";
dmkPaint();
},
function (go) {
if (!DMK.opt)
DMK.opt = dmkDefaults();
dmkFate();
dmkBuildFromChoices();
var S = DMK.edit;
if (!S)
return;
DMK.say = "🎲 <b>Fate built " + dmkEsc(S.opt.name) + "</b>: " + S.rooms.length + " rooms, " + dmkEsc(dmkTheme(S.opt.theme).n.toLowerCase()) + ", " + dmkEsc(dmkPick(DMK_DIFF, S.opt.diff).n.toLowerCase()) + ". <b>🔦 Walk it</b>, change any room, or roll again.";
if (!go) {
DMK.tab = "map";
dmkPaint();
return;
}
var di = dmkKeep(), o = di >= 0 ? { design: di } : {};
if (typeof WLD !== "undefined" && WLD.on === "crawl")
o.from = "crawl";
dmkPlay(S, o);
},
function () {
var S = DMK.edit;
if (!S)
return -1;
var m = dmkMine();
S.opt.name = S.opt.name || DMK.opt.name || "Untitled dungeon";
var rec = { spec: JSON.parse(JSON.stringify(S)), saved: Date.now(), cleared: 0 };
if (DMK.editIdx != null && m[DMK.editIdx]) {
var old = m[DMK.editIdx];
var same = JSON.stringify(old.spec) === JSON.stringify(rec.spec);
rec.cleared = same ? old.cleared : 0;
rec.best = same ? old.best : null;
rec.sid = old.sid || null;
m[DMK.editIdx] = rec;
}
else {
if (m.length >= DMK_MAX_MINE) {
DMK.say = "You keep " + DMK_MAX_MINE + " designs already. Delete one in 📜 My dungeons first.";
dmkPaint();
return -1;
}
m.push(rec);
DMK.editIdx = m.length - 1;
}
dmkSaveMine(m);
return DMK.editIdx;
},
function (G) {
var lite = dmkLite(), W = DMKC_W, L = DMKC_L, H = 14;
DMKC.R = [];
DMKC.spots = [];
DMKC.folk = [];
DMKC.g = G;
var T = { k: "dwarf", stone: 0x9A8C7E, floor: 0x7A6E62 };
var sw = dmkStone({ k: "crypt" }, "wall"), sf = dmkStone({ k: "dwarf" }, "floor");
var wall = dmkStd(0xB8A898, { map: sw.map, nrm: sw.nrm, r: 0.9 }), floor = dmkStd(0xB8A898, { map: sf.map, nrm: sf.nrm, r: 0.85 }), wood = dmkWood(), dark = dmkStd(0x3A2A1E, { map: (function () { try {
return texOf("wood");
}
catch (e) {
return null;
} })(), r: 0.8 });
var Bw = dmkBoxes(), Bf = dmkBoxes();
dmkBoxAdd(Bf, -W / 2, W / 2, -0.3, 0, -L, 0, 4);
dmkBoxAdd(Bw, -W / 2 - 0.6, -W / 2, 0, H, -L, 0, 4);
dmkBoxAdd(Bw, W / 2, W / 2 + 0.6, 0, H, -L, 0, 4);
dmkBoxAdd(Bw, -W / 2, W / 2, 0, H, -L - 0.6, -L, 4);
dmkBoxAdd(Bw, -W / 2, W / 2, 0, H, 0, 0.6, 4);
dmkBoxMesh(Bf, floor, G);
wBox(W, 0.5, L, dmkStd(0x5A4E44, { map: sw.map, r: 1 }), 0, H + 0.25, -L / 2, G);
for (var z = -4; z > -L; z -= 8) {
wBox(W, 0.6, 0.7, dark, 0, H - 0.3, z, G);
[-1, 1].forEach(function (s) { var b = wBox(0.7, 4, 0.7, dark, s * (W / 2 - 1.6), H - 2.2, z, G); b.rotation.z = s * 0.7; });
[-1, 1].forEach(function (s) { var px = s * (W / 2 - 0.7); dmkBoxAdd(Bw, px - 0.7, px + 0.7, 0, H, z - 0.7, z + 0.7, 4); DMKC.R.push({ x: px, z: z, r: 1.0 }); });
}
dmkBoxMesh(Bw, wall, G);
var rt = dmkRugTex(function () { return 0.05; });
wBox(5, 0.03, L - 10, dmkStd(0xFFFFFF, { map: rt.t, r: 1 }), 0, 0.015, -L / 2 - 2, G);
wBox(5, 7, 0.3, dark, 0, 3.5, -0.2, G);
var sg = wSign(["THE DUNGEON CRAWLERS' HALL", "every dungeon here was made by a dreamer"], 8, 1.6, "#1E1814", "#E8D2A0");
sg.position.set(0, 9, -0.35);
sg.rotation.y = Math.PI;
G.add(sg);
DMKC.door = { x: 0, z: -1.5 };
var iron = dmkStd(0x26221E, { m: 0.7, r: 0.5 }), wax = dmkStd(0xEDE4CC, { r: 0.7 });
[-12, -30, -48].forEach(function (z) {
var g = new THREE.Group();
g.position.set(0, H - 3.5, z);
G.add(g);
var ring = new THREE.Mesh(new THREE.TorusGeometry(2, 0.07, 6, lite ? 18 : 32), iron);
ring.rotation.x = Math.PI / 2;
g.add(ring);
for (var i = 0; i < (lite ? 8 : 14); i++) {
var a = i / (lite ? 8 : 14) * Math.PI * 2;
wCyl(0.05, 0.05, 0.3, wax, Math.cos(a) * 2, 0.2, Math.sin(a) * 2, g, 6);
}
wCyl(0.02, 0.02, 3.5, iron, 0, 1.75, 0, g, 4);
var gl = wGlow(0xFFD8A0, 6, 0.4);
gl.position.y = 0.4;
g.add(gl);
var pl = new THREE.PointLight(0xFFD8A0, lite ? 1.1 : 0.9, lite ? 34 : 30, 1.5);
pl.position.set(0, H - 4, z);
G.add(pl);
});
G.add(new THREE.HemisphereLight(0xFFE8D0, 0x2A2018, 0.55));
for (var tz = -8; tz > -L; tz -= 8) {
[-1, 1].forEach(function (s) {
var g = new THREE.Group();
g.position.set(s * (W / 2 - 0.2), 3.2, tz + 4);
g.rotation.y = -s * Math.PI / 2;
G.add(g);
wBox(0.08, 0.08, 0.4, iron, 0, 0, 0.2, g);
var f = wCone(0.11, 0.34, dmkStd(0xFFC070, { e: 0xFF8A30, ei: 1.6 }), 0, 0.58, 0.47, g, 7);
var gl = wGlow(0xFFB070, 2.4, 0.5);
gl.position.set(0, 0.6, 0.45);
g.add(gl);
});
}
var bg = new THREE.Group();
bg.position.set(0, 0, -L + 0.8);
G.add(bg);
wBox(12, 7, 0.4, dark, 0, 4.6, 0, bg);
wBox(11.2, 6.2, 0.1, dmkStd(0x8A6A48, { r: 1 }), 0, 4.6, 0.25, bg);
var R = wRand(77);
for (var p = 0; p < (lite ? 14 : 28); p++) {
var pw = 0.7 + R() * 0.5, ph = 0.9 + R() * 0.5, pp = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), dmkStd(0xE8DCC0, { r: 1 }));
pp.position.set(-5 + R() * 10, 2.2 + R() * 4.8, 0.32);
pp.rotation.z = (R() - 0.5) * 0.15;
bg.add(pp);
wSph(0.04, dmkStd(0xA02020, { r: 0.5 }), pp.position.x, pp.position.y + ph / 2 - 0.08, 0.34, bg, 6);
}
var bs = wSign(["THE BOARD", "press E: every dungeon in the Hall"], 5, 1.0, "#1E1814", "#E8D2A0");
bs.position.set(0, 8.8, 0.3);
bg.add(bs);
DMKC.R.push({ x: -3, z: -L + 0.8, r: 3.2 }, { x: 3, z: -L + 0.8, r: 3.2 });
DMKC.spots.push({ x: 0, z: -L + 3, r: 3.5, label: "<b>The Board</b> · <b>press E</b> to choose a dungeon", fn: function () { dmkBoard(); } });
[-1, 1].forEach(function (s) {
var x = s * 11, g = new THREE.Group();
g.position.set(x, 0, -L + 0.2);
G.add(g);
wBox(1, 6, 1, wall, -2.4, 3, 0, g);
wBox(1, 6, 1, wall, 2.4, 3, 0, g);
wBox(5.8, 1, 1, wall, 0, 6.2, 0, g);
wBox(3.8, 5.6, 0.2, dmkStd(0x0A0806, { r: 1 }), 0, 2.8, 0.2, g);
for (var st = 0; st < 5; st++)
wBox(3.8, 0.2, 0.5, floor, 0, 0.1 - st * 0.2, 0.6 - st * 0.5, g);
var ss = wSign(["⬇ THE WAY DOWN", "choose your dungeon at the Board"], 3.6, 0.9, "#1E1814", "#E8D2A0");
ss.position.set(0, 7.2, 0.55);
g.add(ss);
DMKC.R.push({ x: x, z: -L + 0.6, r: 2.6 });
DMKC.spots.push({ x: x, z: -L + 3, r: 2.8, label: "<b>The way down</b> · <b>press E</b>: choose a dungeon at the Board", fn: function () { dmkBoard(); } });
});
var mt = new THREE.Group();
mt.position.set(-11, 0, -30);
G.add(mt);
wBox(4, 0.15, 8, wood, 0, 1.0, 0, mt);
[[-1.8, -3.8], [1.8, -3.8], [-1.8, 3.8], [1.8, 3.8]].forEach(function (q) { wBox(0.2, 1, 0.2, wood, q[0], 0.5, q[1], mt); });
for (var m = 0; m < 6; m++) {
var mp = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.9), dmkStd(0xE8DCC0, { r: 1 }));
mp.rotation.x = -Math.PI / 2;
mp.rotation.z = (R() - 0.5) * 0.6;
mp.position.set(-1.2 + (m % 2) * 2.2, 1.085, -3 + Math.floor(m / 2) * 2.6);
mt.add(mp);
}
var model = new THREE.Group();
model.position.set(0, 1.08, 0);
mt.add(model);
var stn = dmkStd(0x8A8070, { r: 0.9 });
[[0, 0, 1.2, 1.2], [0, -1.4, 0.4, 1], [0, -2.4, 1.4, 1], [1.1, 0, 0.8, 0.4], [1.9, 0, 0.9, 0.9]].forEach(function (b) { wBox(b[2], 0.25, b[3], stn, b[0], 0.12, b[1], model); });
for (var bk = 0; bk < 5; bk++)
wBox(0.3, 0.06, 0.22, dmkStd([0x6A1A1A, 0x1A3A5A, 0x2A4A2A, 0x5A4A2A, 0x3A1A3A][bk], { r: 0.8 }), -1.6 + bk * 0.1, 1.11 + bk * 0.06, 3.4, mt);
for (var ch = 0; ch < 6; ch++) {
var cx = ch < 3 ? -2.4 : 2.4, cz = -2.6 + (ch % 3) * 2.6;
wBox(0.6, 0.08, 0.6, wood, cx, 0.55, cz, mt);
wBox(0.08, 0.55, 0.6, wood, cx + (ch < 3 ? -0.3 : 0.3), 0.83, cz, mt);
}
var ms = wSign(["THE MAKERS' TABLE", "press E: make your own dungeon"], 4, 0.9, "#1E1814", "#E8D2A0");
ms.position.set(-W / 2 + 0.4, 5.2, -30);
ms.rotation.y = Math.PI / 2;
G.add(ms);
DMKC.R.push({ x: -11, z: -30, r: 0 }, { x: -11, z: -27, r: 2.3 }, { x: -11, z: -30, r: 2.3 }, { x: -11, z: -33, r: 2.3 });
DMKC.spots.push({ x: -11, z: -30, r: 4.5, label: "<b>The Makers' Table</b> · <b>press E</b> to make your own dungeon", fn: function () { worldPrompt(null); dmkOpen(); } });
var bar = new THREE.Group();
bar.position.set(13, 0, -22);
G.add(bar);
wBox(1.2, 1.2, 10, dark, 0, 0.6, 0, bar);
wBox(1.5, 0.1, 10.2, wood, 0, 1.25, 0, bar);
for (var sh = 0; sh < 3; sh++)
wBox(0.5, 0.08, 9, wood, 4.2, 1.6 + sh * 0.8, 0, bar);
for (var bt = 0; bt < 12; bt++)
wCyl(0.06, 0.07, 0.32, dmkStd([0x2A5A2A, 0x6A2A1A, 0x3A3A6A][bt % 3], { r: 0.2, m: 0.1, op: 0.85 }), 4.2, 1.82 + Math.floor(bt / 4) * 0.8, -3.5 + (bt % 4) * 2.2, bar, 8);
for (var bb = 0; bb < 4; bb++) {
wCyl(0.5, 0.5, 1.1, wood, 4, 0.55, -4 + bb * 2.6, bar, lite ? 8 : 14);
}
DMKC.R.push({ x: 13, z: -17.5, r: 0.9 }, { x: 13, z: -20, r: 0.9 }, { x: 13, z: -22.5, r: 0.9 }, { x: 13, z: -25, r: 0.9 }, { x: 13, z: -27, r: 0.9 });
[-8, -14, -38, -44].forEach(function (z, ti) { var x = ti < 2 ? 8 : 9; dmkProp.tables(G, { x: x, z: z, a: 0 }, T, R); });
var fp = new THREE.Group();
fp.position.set(W / 2 - 0.3, 0, -40);
fp.rotation.y = -Math.PI / 2;
G.add(fp);
wBox(4.4, 4.2, 1.2, wall, 0, 2.1, 0.2, fp);
wBox(3, 2.4, 1.25, dmkStd(0x0E0A08, { r: 1 }), 0, 1.2, 0.25, fp);
wBox(5, 0.4, 1.6, wall, 0, 4.3, 0.3, fp);
for (var lg = 0; lg < 3; lg++) {
var l = wCyl(0.15, 0.15, 1.6, wood, 0, 0.2 + lg * 0.15, 0.6, fp, 6);
l.rotation.z = Math.PI / 2;
l.rotation.y = (lg - 1) * 0.3;
}
var fire = wCone(0.7, 1.4, dmkStd(0xFFC070, { e: 0xFF7A20, ei: 1.7, op: 0.9 }), 0, 0.9, 0.6, fp, 9);
DMKC.fire = fire;
var fgl = wGlow(0xFF9040, 5, 0.55);
fgl.position.set(0, 1.1, 0.9);
fp.add(fgl);
var fl = new THREE.PointLight(0xFF9A50, 1.2, 20, 1.6);
fl.position.set(W / 2 - 2, 1.5, -40);
G.add(fl);
DMKC.R.push({ x: W / 2 - 1, z: -40, r: 2.4 });
var rs = wSign(["THE CRAWLERS' REST", "ale, stew and tall tales"], 4, 0.9, "#1E1814", "#E8D2A0");
rs.position.set(W / 2 - 0.4, 5.2, -22);
rs.rotation.y = -Math.PI / 2;
G.add(rs);
var hf = new THREE.Group();
hf.position.set(-W / 2 + 0.4, 0, -8);
hf.rotation.y = Math.PI / 2;
G.add(hf);
wBox(6, 3.2, 0.15, dark, 0, 3.2, 0, hf);
for (var pq = 0; pq < 8; pq++)
wBox(1.2, 0.6, 0.06, dmkStd(0xB8903A, { m: 0.85, r: 0.35 }), -2.1 + (pq % 4) * 1.4, 4.2 - Math.floor(pq / 4) * 1.2, 0.1, hf);
var hs = wSign(["THE HALL OF FAME", "press E: the makers whose dungeons are cleared most"], 5, 0.9, "#1E1814", "#E8D2A0");
hs.position.set(0, 5.5, 0.1);
hf.add(hs);
DMKC.spots.push({ x: -W / 2 + 2.2, z: -8, r: 3, label: "<b>The Hall of Fame</b> · <b>press E</b> to read it", fn: function () { dmkFame(); } });
var lc = new THREE.Group();
lc.position.set(-6, 0, -L + 5);
G.add(lc);
wBox(0.6, 1.1, 0.6, dark, 0, 0.55, 0, lc);
var top = wBox(0.9, 0.08, 0.7, dark, 0, 1.2, 0, lc);
top.rotation.x = -0.35;
wBox(0.6, 0.03, 0.45, dmkStd(0xE8DCC0, { r: 1 }), 0, 1.26, 0, lc).rotation.x = -0.35;
DMKC.R.push({ x: -6, z: -L + 5, r: 0.6 });
DMKC.spots.push({ x: -6, z: -L + 5, r: 2, label: "<b>The Keeper's lectern</b> · <b>press E</b>", fn: function () { dmkKeeperCard(); }, keeper: 1 });
for (var bn = 0; bn < 6; bn++) {
var bz = -14 - bn * 8;
dmkProp.banners(G, { x: bn % 2 ? W / 2 - 0.5 : -W / 2 + 0.5, z: bz, a: bn % 2 ? -Math.PI / 2 : Math.PI / 2 }, T, R);
}
dmkProp.barrels(G, { x: -W / 2 + 1.2, z: -50, a: Math.PI / 2 }, T, R);
dmkProp.barrels(G, { x: -W / 2 + 1.2, z: -46, a: Math.PI / 2 }, T, R);
dmkProp.racks(G, { x: -W / 2 + 0.8, z: -56, a: Math.PI / 2 }, T, R);
DMKC.R = DMKC.R.concat(DMKW.R.splice(0));
DMKC.anims = DMKW.anim.splice(0);
dmkCrawlFolk(G);
},
function (G) {
var lite = dmkLite();
DMKC.folk = [];
DMKC_FOLK.forEach(function (f, i) {
if (lite && i >= 5)
return;
var p = null;
try {
p = wPerson("crawl" + i, { title: f.t === "barkeep" ? "bartender" : f.t === "healer" ? "nurse" : "", sex: /Ysolde|Mag|Tamsin|Elowen/.test(f.n) ? "f" : "m" });
}
catch (e) {
p = new THREE.Group();
}
p.position.set(f.x, 0, f.z);
p.rotation.y = Math.atan2(-f.x, -(f.z + 30));
G.add(p);
DMKC.folk.push({ f: f, g: p });
DMKC.spots.push({ x: f.x, z: f.z, r: 2.4, label: "<b>" + dmkEsc(f.n) + "</b> · <b>press E</b> to talk", fn: function () { worldPrompt(null); if (typeof wTalk === "function")
wTalk({ name: f.n, persona: f.p, greet: f.g }); }, person: p });
DMKC.R.push({ x: f.x, z: f.z, r: 0.45 });
});
},
function (dt) {
var P = camera.position, lx = P.x - WORLDS.crawl.base, lz = P.z, best = null, bd = 1e9, keeper = typeof amKeeper === "function" && amKeeper();
DMKC.spots.forEach(function (s) { if (s.keeper && !keeper)
return; var d = Math.hypot(lx - s.x, lz - s.z); if (d < s.r && d < bd) {
bd = d;
best = s;
} });
if (lz > -3.2 && Math.abs(lx) < 3) {
best = { label: "<b>The door</b> · <b>press E</b> to go back through to the Hall of Doors", fn: function () { worldPrompt(null); worldHome("<b>Back through the door.</b>"); } };
}
var label = best ? best.label : null;
if (label !== DMKC.plabel) {
DMKC.plabel = label;
worldPrompt(label, best ? best.fn : null);
}
(DMKC.anims || []).forEach(function (a) { a.p += dt * 9; a.m.scale.y = 0.88 + Math.sin(a.p) * 0.08; });
if (DMKC.fire) {
DMKC.ft = (DMKC.ft || 0) + dt * 7;
DMKC.fire.scale.y = 0.9 + Math.sin(DMKC.ft) * 0.07 + Math.sin(DMKC.ft * 2.7) * 0.04;
}
DMKC.folk.forEach(function (F) { var d = Math.hypot(lx - F.g.position.x, lz - F.g.position.z); if (d < 6) {
var want = Math.atan2(lx - F.g.position.x, lz - F.g.position.z), cur = F.g.rotation.y, df = Math.atan2(Math.sin(want - cur), Math.cos(want - cur));
F.g.rotation.y = cur + df * Math.min(1, dt * 3);
} });
},
function (G) {
var keep = { mats: DMKW.mats, geo: DMKW.geo, R: DMKW.R, anim: DMKW.anim, torches: DMKW.torches, rugs: DMKW.rugs };
DMKW.mats = {};
DMKW.geo = {};
DMKW.R = [];
DMKW.anim = [];
DMKW.torches = [];
DMKW.rugs = {};
try {
dmkCrawlBuild(G);
}
finally {
for (var k in keep)
DMKW[k] = keep[k];
}
},
function (opt) {
var P = camera.position, B = WORLDS.crawl.base;
if (opt && opt.at === "stair") {
P.set(B + 11, 1.72, -DMKC_L + 5);
yaw = Math.PI;
dmkSay("<b>The Dungeon Crawlers' Hall.</b> You climb up into the warm, out of the dark.");
}
else {
P.set(B, 1.72, -4);
yaw = 0;
dmkSay("<b>The Dungeon Crawlers' Hall.</b> Every dungeon here was made by a dreamer. The Board at the far end holds them all; the Makers' Table on the left is where you make your own.");
}
pitch = 0;
DMKC.plabel = null;
dmkBoardFetch(DMK.boardTab);
},
function (tab, cb) {
if (typeof cityRpc !== "function" || typeof signedIn !== "function" || !signedIn()) {
DMK.board = { rows: [], off: true };
if (cb)
cb();
return;
}
cityRpc("dmk_board", { p_tab: tab || "best" }).then(function (o) { DMK.board = o && o.ok ? o : { rows: [], err: (o && o.say) || "" }; DMK.board.tab = tab; if (cb)
cb(); }).catch(function (e) { DMK.board = { rows: [], err: String(e && e.message || e).slice(0, 120) }; if (cb)
cb(); });
},
function (tab) {
tab = tab || DMK.boardTab || "best";
DMK.boardTab = tab;
var paint = function () {
var B = DMK.board || { rows: [] }, fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>📜 The Board</div><div style='opacity:.8;font-size:12px;margin-bottom:6px'>Every dungeon here was made by a dreamer and approved by the Keeper.</div>";
h += "<div style='display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px'>" + [["featured", "🌟 Featured"], ["best", "★ Best rated"], ["most", "🏆 Most cleared"], ["newest", "✨ Newest"]].map(function (t) { return "<span data-w='t_" + t[0] + "' style='padding:4px 9px;border-radius:12px;border:1px solid " + (tab === t[0] ? "#E0B060;background:#6A4A22" : "#5A4A38") + "'>" + t[1] + "</span>"; }).join("") + "</div>";
["featured", "best", "most", "newest"].forEach(function (t) { fns["t_" + t] = function () { dmkBoard(t); }; });
if (B.off)
h += "<p>Sign in to see the Board and go down.</p>";
else if (B.err)
h += "<p>The Board could not be read just now: " + dmkEsc(B.err) + "</p>";
else if (!B.rows.length)
h += "<p>" + (tab === "featured" ? "Nothing featured yet." : "The Board is bare: no dungeon has been approved yet. Be the first: the Makers' Table is on the left.") + "</p>";
(B.rows || []).slice(0, 30).forEach(function (r, i) {
var T = dmkTheme(r.theme), D = dmkPick(DMK_DIFF, r.diff), Pt = dmkPick(DMK_PARTY, r.party);
h += worldBtn("d" + i, (r.featured ? "🌟 " : "") + dmkEsc(r.name), "by " + dmkEsc(r.maker || "a dreamer") + " · " + dmkEsc(T.n) + " · " + r.rooms + " rooms · " + dmkEsc(D.n) + " · " + dmkEsc(Pt.sub) + " · " + (r.votes ? (+r.stars).toFixed(1) + "★ (" + r.votes + ")" : "not rated yet") + " · cleared " + (r.clears || 0) + "×");
fns["d" + i] = function () { dmkGoDown(r.id); };
});
h += worldBtn("make", "⚒️ Make your own", "The Dungeon Maker");
fns.make = function () { worldCard(null); dmkOpen(); };
h += worldBtn("rand", "🎲 A random dungeon", "Fate builds one, and down you go");
fns.rand = function () { worldCard(null); dmkRandom(true); };
worldCard(h, fns);
};
if (!DMK.board || DMK.board.tab !== tab)
dmkBoardFetch(tab, paint);
else {
paint();
dmkBoardFetch(tab, function () { if (WLD.card && WLD.card.style.display !== "none" && /The Board/.test(WLD.card.innerHTML))
paint(); });
}
},
function (id) {
worldCard(null);
dmkSay("Down the stair…");
cityRpc("dmk_get", { p_id: id }).then(function (o) {
if (!o || !o.ok || !o.spec) {
dmkSay(dmkEsc((o && o.say) || "That dungeon could not be read."));
return;
}
var S = o.spec;
S.opt = S.opt || dmkDefaults();
S.opt.name = o.row && o.row.name || S.opt.name;
dmkPlay(S, { id: id, from: WLD.on === "crawl" ? "crawl" : null });
}).catch(function (e) { dmkSay("That dungeon could not be read: " + dmkEsc(String(e && e.message || e).slice(0, 100))); });
},
function () {
var paint = function () {
var M = (DMK.board && DMK.board.makers) || [], h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🏆 The Hall of Fame</div><div style='opacity:.8;font-size:12px;margin-bottom:6px'>The makers whose dungeons are cleared most.</div>";
h += M.length ? "<table style='width:100%;font-size:13px'>" + M.map(function (m, i) { return "<tr><td>" + (i + 1) + ".</td><td><b>" + dmkEsc(m.name || "a dreamer") + "</b></td><td style='opacity:.8'>" + m.dungeons + " dungeon" + (m.dungeons == 1 ? "" : "s") + "</td><td style='opacity:.8'>" + (m.clears || 0) + " clears</td></tr>"; }).join("") + "</table>" : "<p>No names on the plaques yet. Yours could be the first.</p>";
worldCard(h, {});
};
if (!DMK.board)
dmkBoardFetch("best", paint);
else
paint();
},
function (i) {
var m = dmkMine(), d = m[i];
if (!d) {
return;
}
if (!d.cleared) {
DMK.say = "Beat it yourself first: walk it to the end, and then it can be sent.";
dmkOpen("mine");
return;
}
if (typeof cityRpc !== "function" || typeof signedIn !== "function" || !signedIn()) {
DMK.say = "Sign in first, so the dungeon is yours.";
dmkOpen("mine");
return;
}
var S = d.spec;
DMK.say = "Sending…";
dmkOpen("mine");
cityRpc("dmk_submit", { p_name: S.opt.name || "", p_spec: S, p_old: d.sid || null }).then(function (o) {
if (o && o.ok) {
d.sid = o.id;
d.sent = Date.now();
dmkSaveMine(m);
}
DMK.say = dmkEsc((o && o.say) || "That did not go through.");
dmkPaint();
dmkMineFetch();
}).catch(function (e) { DMK.say = "That did not go through: " + dmkEsc(String(e && e.message || e).slice(0, 120)); dmkPaint(); });
},
function (st) {
if (!(typeof amKeeper === "function" && amKeeper()))
return;
st = st || "waiting";
cityRpc("dmk_keeper_list", { p_status: st }).then(function (o) {
var rows = (o && o.rows) || [], fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🏰 The Dungeon Crawlers: for the Keeper</div>";
h += "<div style='display:flex;gap:5px;flex-wrap:wrap;margin:6px 0'>" + [["waiting", "⏳ Waiting"], ["approved", "✅ In the Hall"], ["featured", "🌟 Featured"], ["returned", "↩️ Sent back"], ["down", "⛔ Down"]].map(function (t) { return "<span data-w='s_" + t[0] + "' style='padding:4px 9px;border-radius:12px;border:1px solid " + (st === t[0] ? "#E0B060;background:#6A4A22" : "#5A4A38") + "'>" + t[1] + "</span>"; }).join("") + "</div>";
["waiting", "approved", "featured", "returned", "down"].forEach(function (t) { fns["s_" + t] = function () { dmkKeeperCard(t); }; });
if (!o || !o.ok)
h += "<p>" + dmkEsc((o && o.say) || "Could not read the list.") + "</p>";
else if (!rows.length)
h += "<p>None.</p>";
rows.forEach(function (r, i) {
var T = dmkTheme(r.theme);
h += "<div style='border:1px solid #4A3E30;border-radius:6px;padding:6px 8px;margin:6px 0'><b>" + dmkEsc(r.name) + "</b> <span style='opacity:.75'>by " + dmkEsc(r.maker) + " · " + dmkEsc(T.n) + " · " + r.rooms + " rooms · " + dmkEsc(dmkPick(DMK_DIFF, r.diff).n) + " · cleared " + r.clears + "× · " + (r.votes ? (+r.stars).toFixed(1) + "★" : "no stars") + "</span>" +
"<div style='display:flex;gap:5px;flex-wrap:wrap;margin-top:5px'><span data-w='w" + i + "' style='padding:3px 8px;border:1px solid #8A7254;border-radius:5px'>🔦 Walk it</span>" +
(r.status !== "approved" ? "<span data-w='a" + i + "' style='padding:3px 8px;border:1px solid #6AA060;border-radius:5px'>✅ Approve</span>" : "") +
(r.status !== "featured" ? "<span data-w='f" + i + "' style='padding:3px 8px;border:1px solid #E0B060;border-radius:5px'>🌟 Feature</span>" : "") +
"<span data-w='r" + i + "' style='padding:3px 8px;border:1px solid #C08050;border-radius:5px'>↩️ Send back</span><span data-w='x" + i + "' style='padding:3px 8px;border:1px solid #A04040;border-radius:5px'>⛔ Take down</span></div></div>";
fns["w" + i] = function () { dmkGoDown(r.id); };
var set = function (s, note) { cityRpc("dmk_keeper_set", { p_id: r.id, p_status: s, p_note: note || null }).then(function (x) { dmkSay(dmkEsc((x && x.say) || "")); dmkKeeperCard(st); }).catch(function () { }); };
fns["a" + i] = function () { set("approved"); };
fns["f" + i] = function () { set("featured"); };
fns["x" + i] = function () { set("down"); };
fns["r" + i] = function () { dmkKeeperNote(r, function (n) { set("returned", n); }); };
});
worldCard(h, fns);
}).catch(function () { dmkSay("The list could not be read."); });
},
function (r, done) {
var h = "<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>Send back: " + dmkEsc(r.name) + "</div><div style='opacity:.8;font-size:12px'>A note for its maker (what to change):</div><textarea id='dmk-note' maxlength='300' style='width:100%;height:80px;margin:6px 0;background:#1A1612;color:#EFE4CC;border:1px solid #5A4A38;border-radius:6px'></textarea>" + worldBtn("ok", "↩️ Send it back", "");
worldCard(h, { ok: function () { var t = document.getElementById("dmk-note"); done(t ? t.value : ""); } });
setTimeout(function () { var t = document.getElementById("dmk-note"); if (t) {
t.addEventListener("keydown", function (e) { e.stopPropagation(); });
t.focus();
} }, 50);
}
];
});
