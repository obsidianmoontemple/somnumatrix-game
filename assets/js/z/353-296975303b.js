/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(353, function () {
"use strict";
return [
function () {
var N = LBY.N, G = { kind: new Uint8Array(N * N), wall: new Uint8Array(N * N), seem: new Uint8Array(N * N), carve: new Uint8Array(N * N), grow: new Float32Array(N * N).fill(1), trap: new Uint8Array(N * N) };
for (var i = 0; i < N; i++)
for (var j = 0; j < N; j++) {
var k = i * N + j, oi = i & 1, oj = j & 1;
if (oi && oj) {
G.kind[k] = 0;
continue;
}
if (!oi && !oj) {
G.kind[k] = 1;
G.wall[k] = 1;
continue;
}
if (j === N - 1 && i >= LBY_COURT_U.i0 - 1 && i <= LBY_COURT_U.i1 + 1) {
G.kind[k] = 1;
G.wall[k] = 1;
continue;
}
G.kind[k] = lbyMatAt(i, j) === "stone" ? 2 : 3;
G.wall[k] = 1;
}
function open(p) { var k = p[0] * N + p[1]; G.kind[k] = 0; G.wall[k] = 0; }
open(LBY_OPEN.gate);
function carve(ci, cj, hi, hj) {
for (var i = ci - hi; i <= ci + hi; i++)
for (var j = cj - hj; j <= cj + hj; j++) {
if (lbyD(i, j) >= LBY_EDGE - 1)
continue;
var k = i * N + j;
G.kind[k] = 0;
G.wall[k] = 0;
G.carve[k] = 1;
}
}
LBY_CARVE.concat(LBY_HEDGE_CARVE).forEach(function (c) { carve(lbyU(c[1]), lbyU(c[2]), c[3], c[4]); });
LBY_CORE_HALLS.forEach(function (h) { carve(lbyU(h[0]), lbyU(h[1]), 5, 5); });
LBY_TRAPS.forEach(function (t) { G.trap[t[0] * N + t[1]] = 1; });
return G;
},
function (kind, seed, braid, seemP) {
var N = LBY.N, G = LBY.grid, R = wRand(seed * 2654435761 >>> 0 || 1), want = kind === "stone" ? 2 : 3, out = new Uint8Array(N * N), seem = new Uint8Array(N * N);
for (var k = 0; k < N * N; k++)
if (G.kind[k] === want)
out[k] = 1;
var seen = new Uint8Array(N * N), stack = [], root = 0, cells = (N - 1) >> 1;
var dirs = [[2, 0], [-2, 0], [0, 2], [0, -2]], k2 = 0, J = { done: false, res: null };
J.step = function (ms) {
var t0 = performance.now(), n = 0;
for (;;) {
if (++n % 256 === 0 && performance.now() - t0 > ms)
return false;
if (!stack.length) {
while (root < cells * cells) {
var ri = 1 + 2 * ((root / cells) | 0), rj = 1 + 2 * (root % cells);
root++;
if (!seen[lbyIdx(ri, rj)]) {
seen[lbyIdx(ri, rj)] = 1;
stack.push([ri, rj]);
break;
}
}
if (!stack.length)
break;
}
var c = stack[stack.length - 1], opts = [];
for (var q = 0; q < 4; q++) {
var ni = c[0] + dirs[q][0], nj = c[1] + dirs[q][1];
if (ni < 1 || nj < 1 || ni > N - 2 || nj > N - 2 || seen[lbyIdx(ni, nj)])
continue;
var ek = lbyIdx(c[0] + dirs[q][0] / 2, c[1] + dirs[q][1] / 2), kd = G.kind[ek];
if (kd !== want && kd !== 0)
continue;
if (kd === 0 && G.wall[ek])
continue;
opts.push([ni, nj, ek]);
}
if (!opts.length) {
stack.pop();
continue;
}
var o = opts[Math.floor(R() * opts.length)];
out[o[2]] = 0;
seen[lbyIdx(o[0], o[1])] = 1;
stack.push([o[0], o[1]]);
}
for (; k2 < N * N; k2++) {
if (k2 % 4096 === 0 && performance.now() - t0 > ms)
return false;
if (G.kind[k2] !== want || !out[k2])
continue;
var r = R();
if (r < braid)
out[k2] = 0;
else if (r < braid + seemP) {
out[k2] = 0;
seem[k2] = 1;
}
}
J.done = true;
J.res = { wall: out, seem: seem };
return true;
};
return J;
},
function () {
if (!LBY.grid)
return;
var P = LBY.pre || (LBY.pre = {});
["hedge", "stone"].forEach(function (kind) {
var every = kind === "stone" ? LBY_STONE_EVERY : LBY_HEDGE_EVERY, J = P[kind];
if (lbySecsLeft(every) > 30)
return;
var ep = lbyEpoch(every) + 1;
if (!J || J.ep !== ep || J.g !== LBY.grid) {
J = P[kind] = lbyCarveFor(kind, ep);
J.ep = ep;
J.g = LBY.grid;
}
if (!J.done)
J.step(LBY.lite ? 2 : 3);
});
},
function (kind, animate) {
var ep = lbyEpoch(kind === "stone" ? LBY_STONE_EVERY : LBY_HEDGE_EVERY), N = LBY.N;
var J = LBY.pre && LBY.pre[kind];
if (!J || J.ep !== ep || J.g !== LBY.grid) {
J = lbyCarveFor(kind, ep);
J.ep = ep;
}
if (!J.done)
J.step(Infinity);
var M = J.res;
if (LBY.pre)
LBY.pre[kind] = null;
var G = LBY.grid, want = kind === "stone" ? 2 : 3, changed = [];
for (var k = 0; k < N * N; k++) {
if (G.kind[k] !== want)
continue;
var w = M.wall[k] ? 1 : 0;
if (G.wall[k] !== w) {
G.wall[k] = w;
changed.push(k);
if (animate)
G.grow[k] = w ? 0.001 : 0.998;
else
G.grow[k] = w;
}
G.seem[k] = M.seem[k];
}
if (kind === "stone")
LBY.stoneEp = ep;
else
LBY.hedgeEp = ep;
return changed;
},
function (x, z) {
var i0 = lbyU(x), j0 = lbyU(z);
for (var r = 0; r < 12; r++)
for (var di = -r; di <= r; di++)
for (var dj = -r; dj <= r; dj++) {
if (Math.max(Math.abs(di), Math.abs(dj)) !== r)
continue;
var i = i0 + di, j = j0 + dj;
if (lbySolidUnit(i, j))
continue;
if (lbyIn(i, j) ? LBY.grid.wall[lbyIdx(i, j)] : lbyReachWall(i, j))
continue;
return { x: lbyM(i), z: lbyM(j) };
}
return { x: LBY_GATE.x, z: LBY_GATE.z + 20 };
},
function (x0, z0, x1, z1, limit) {
var i0 = lbyU(x0), j0 = lbyU(z0), i1 = lbyU(x1), j1 = lbyU(z1), K = function (i, j) { return i * 131071 + j; }, tk = K(i1, j1);
var prev = new Map(), gs = new Map(), heap = [], n = 0, found = false;
limit = limit || 200000;
function hh(i, j) { return Math.abs(i - i1) + Math.abs(j - j1); }
function push(f, i, j) { heap.push([f, i, j]); var c = heap.length - 1; while (c > 0) {
var p = (c - 1) >> 1;
if (heap[p][0] <= heap[c][0])
break;
var t = heap[p];
heap[p] = heap[c];
heap[c] = t;
c = p;
} }
function pop() { var top = heap[0], last = heap.pop(); if (heap.length) {
heap[0] = last;
var c = 0;
for (;;) {
var l = c * 2 + 1, r = l + 1, m = c;
if (l < heap.length && heap[l][0] < heap[m][0])
m = l;
if (r < heap.length && heap[r][0] < heap[m][0])
m = r;
if (m === c)
break;
var t = heap[m];
heap[m] = heap[c];
heap[c] = t;
c = m;
}
} return top; }
prev.set(K(i0, j0), -1);
gs.set(K(i0, j0), 0);
push(hh(i0, j0), i0, j0);
while (heap.length && n < limit) {
var c = pop(), i = c[1], j = c[2], ck = K(i, j);
n++;
if (ck === tk) {
found = true;
break;
}
var g0 = gs.get(ck);
for (var d = 0; d < 4; d++) {
var ni = i + (d === 0 ? 1 : d === 1 ? -1 : 0), nj = j + (d === 2 ? 1 : d === 3 ? -1 : 0), nk = K(ni, nj);
if (gs.has(nk) || lbySolidUnit(ni, nj))
continue;
gs.set(nk, g0 + 1);
prev.set(nk, ck);
push(g0 + 1 + hh(ni, nj) * 1.2, ni, nj);
}
}
if (!found)
return null;
var out = [], c2 = tk;
while (c2 !== -1 && c2 !== undefined) {
var ii = Math.round(c2 / 131071), jj = c2 - ii * 131071;
out.push({ x: lbyM(ii), z: lbyM(jj) });
c2 = prev.get(c2);
}
return out.reverse();
},
function (bx, by) {
var K = lbyBlockKind(bx, by), eS = lbyEpochKind("stone"), eH = lbyEpochKind("hedge"), ep = eS + ":" + eH, key = bx + "," + by, D = LBY_RCACHE.get(key);
if (D && D.ep === ep)
return D;
var RB = LBY_RB, Oi = bx * RB, Oj = by * RB, wall = new Uint8Array(RB * RB), fix = new Uint8Array(RB * RB), hm = new Uint8Array(RB * RB);
var R = wRand((lbyBlockHash(bx, by, 1) ^ (eS * 2654435761)) >>> 0 || 1), RH = wRand((lbyBlockHash(bx, by, 2) ^ (eH * 2654435761)) >>> 0 || 1);
function L(a, b) { return a * RB + b; }
function isCell(a, b) { var i = Oi + a, j = Oj + b; return (a & 1) && (b & 1) && !lbyCoreU(i, j) && !lbyCourtU(i, j) && !(hall && a >= 5 && a <= 15 && b >= 5 && b <= 15); }
var hall = K.hall;
for (var a = 0; a < RB; a++)
for (var b = 0; b < RB; b++) {
var i = Oi + a, j = Oj + b, k = L(a, b);
if (lbyCoreU(i, j)) {
fix[k] = 3;
continue;
}
if (lbyCourtU(i, j)) {
fix[k] = 2;
continue;
}
if (hall && a >= 4 && a <= 16 && b >= 4 && b <= 16) {
if (a >= 5 && a <= 15 && b >= 5 && b <= 15) {
fix[k] = 2;
continue;
}
fix[k] = 1;
wall[k] = 1;
continue;
}
hm[k] = lbyMatAt(i, j) === "hedge" ? 1 : 0;
if (!(a & 1) && !(b & 1)) {
fix[k] = 1;
wall[k] = 1;
continue;
}
if ((a & 1) && (b & 1)) {
fix[k] = 0;
continue;
}
wall[k] = 1;
}
LBY_COURT_ARCH.forEach(function (A) { var a = A[0] - Oi, b = A[1] - Oj; if (a >= 0 && b >= 0 && a < RB && b < RB) {
fix[L(a, b)] = 2;
wall[L(a, b)] = 0;
} });
var cells = [];
for (var a2 = 1; a2 < RB; a2 += 2)
for (var b2 = 1; b2 < RB; b2 += 2)
if (isCell(a2, b2))
cells.push([a2, b2]);
var dirs = [[2, 0], [-2, 0], [0, 2], [0, -2]];
[0, 1].forEach(function (hk) {
var seen = new Uint8Array(RB * RB), RR = hk ? RH : R;
cells.forEach(function (c0) {
if (seen[L(c0[0], c0[1])])
return;
var st = [c0];
seen[L(c0[0], c0[1])] = 1;
while (st.length) {
var c = st[st.length - 1], o = [];
for (var q = 0; q < 4; q++) {
var na = c[0] + dirs[q][0], nb = c[1] + dirs[q][1];
if (na < 1 || nb < 1 || na >= RB || nb >= RB || seen[L(na, nb)] || !isCell(na, nb))
continue;
var ea = c[0] + dirs[q][0] / 2, eb = c[1] + dirs[q][1] / 2, ek = L(ea, eb);
if (fix[ek] === 1 || fix[ek] === 3 || (!fix[ek] && hm[ek] !== hk))
continue;
o.push([na, nb, ea, eb]);
}
if (!o.length) {
st.pop();
continue;
}
var pk = o[Math.floor(RR() * o.length)];
if (!fix[L(pk[2], pk[3])])
wall[L(pk[2], pk[3])] = 0;
seen[L(pk[0], pk[1])] = 1;
st.push([pk[0], pk[1]]);
}
});
});
for (var a3 = 1; a3 < RB - 1; a3++)
for (var b3 = 1; b3 < RB - 1; b3++) {
var k3 = L(a3, b3);
if (fix[k3] || !wall[k3] || ((a3 & 1) === (b3 & 1)))
continue;
var ca = (a3 & 1) ? [a3, b3 - 1] : [a3 - 1, b3], cb = (a3 & 1) ? [a3, b3 + 1] : [a3 + 1, b3];
if (isCell(ca[0], ca[1]) && isCell(cb[0], cb[1]) && (hm[k3] ? RH : R)() < 0.06)
wall[k3] = 0;
}
[0, 1].forEach(function (side) {
var opts = [];
for (var t = 1; t < RB; t += 2) {
var a = side ? t : 0, b = side ? 0 : t, i = Oi + a, j = Oj + b, k = L(a, b);
if (fix[k])
continue;
var ok = side ? (isCellAt(i, j - 1) && isCell(a, 1)) : (isCellAt(i - 1, j) && isCell(1, b));
if (ok)
opts.push(k);
}
for (var n = 0; n < 2 && opts.length; n++) {
var ix = Math.floor(R() * opts.length);
wall[opts[ix]] = 0;
opts.splice(ix, 1);
}
opts.forEach(function (k) { if (R() < 0.12)
wall[k] = 0; });
});
if (hall) {
var any = false, open = [0, 1, 2, 3].map(function () { var o = R() < 0.6; any = any || o; return o; });
if (!any)
open[Math.floor(R() * 4)] = true;
[[10, 4], [10, 16], [4, 10], [16, 10]].forEach(function (dp, s2) {
if (!open[s2])
return;
var along = s2 < 2;
for (var w = -1; w <= 1; w++) {
var a = along ? dp[0] + w : dp[0], b = along ? dp[1] : dp[1] + w;
fix[L(a, b)] = 2;
wall[L(a, b)] = 0;
}
var oa = along ? dp[0] : dp[0] + (s2 === 2 ? -1 : 1), ob = along ? dp[1] + (s2 === 0 ? -1 : 1) : dp[1];
for (var w2 = -1; w2 <= 1; w2++) {
var a2b = along ? oa + w2 : oa, b2b = along ? ob : ob + w2;
if (fix[L(a2b, b2b)] === 1)
continue;
wall[L(a2b, b2b)] = 0;
}
});
}
function isCellAt(i, j) {
if (!(i & 1) || !(j & 1) || lbyCoreU(i, j) || lbyCourtU(i, j))
return false;
var nbx = Math.floor(i / RB), nby = Math.floor(j / RB), NK = lbyBlockKind(nbx, nby);
if (!NK.hall)
return true;
var na = i - nbx * RB, nb = j - nby * RB;
return !(na >= 5 && na <= 15 && nb >= 5 && nb <= 15);
}
var old = D;
D = { bx: bx, by: by, ep: ep, hall: hall, wall: wall, fix: fix, hm: hm, grow: old ? old.grow : new Float32Array(RB * RB).fill(1), prevWall: old ? old.wall : null };
LBY_RCACHE.set(key, D);
if (LBY_RCACHE.size > 700) {
var it = LBY_RCACHE.keys();
for (var x = 0; x < 200; x++) {
var kk = it.next().value;
if (kk !== key)
LBY_RCACHE.delete(kk);
}
}
return D;
},
function (ep) {
var n = LBY_DEEP.n, R = wRand((ep * 104729 + 33) >>> 0 || 1), seen = {}, open = {}, stack = [[7, 6]];
seen["7,6"] = 1;
while (stack.length) {
var c = stack[stack.length - 1], o = [];
[[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(function (d) { var r2 = c[0] + d[0], c2 = c[1] + d[1]; if (r2 < 0 || c2 < 0 || r2 >= n || c2 >= n || seen[r2 + "," + c2])
return; o.push([r2, c2]); });
if (!o.length) {
stack.pop();
continue;
}
var p = o[Math.floor(R() * o.length)];
seen[p[0] + "," + p[1]] = 1;
open[lbyDoorKey(c[0], c[1], p[0], p[1])] = 1;
stack.push(p);
}
for (var r = 0; r < n; r++)
for (var c2 = 0; c2 < n; c2++) {
if (c2 < n - 1 && R() < 0.22)
open[lbyDoorKey(r, c2, r, c2 + 1)] = 1;
if (r < n - 1 && R() < 0.22)
open[lbyDoorKey(r, c2, r + 1, c2)] = 1;
}
return open;
},
function (name, rep) {
var key = name + ":" + rep;
if (LBY.tex[key])
return LBY.tex[key];
var hi = !LBY.lite, url = "assets/textures/maze/" + name + (hi ? "-1k" : "") + ".jpg";
var t = new THREE.TextureLoader().load(url);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rep, rep);
try {
t.anisotropy = Math.min(LBY.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (LBY.tex[key] = t);
},
function (name, tint, rep, o) {
o = o || {};
var key = name + ":" + tint + ":" + rep + ":" + (o.ds ? 1 : 0);
if (LBY.mats[key])
return LBY.mats[key];
var m;
if (LBY.lite)
m = new THREE.MeshLambertMaterial({ color: tint, map: lbyTex(name, rep) });
else {
m = new THREE.MeshPhongMaterial({ color: tint, map: lbyTex(name, rep), normalMap: lbyNorm(name, rep), shininess: o.shine || 6, specular: o.spec || 0x161410 });
m.normalScale = new THREE.Vector2(o.ns || 1, o.ns || 1);
}
if (o.ds)
m.side = THREE.DoubleSide;
return (LBY.mats[key] = m);
},
function (col, o) {
var k = "c" + col + (o ? JSON.stringify(o) : "");
if (LBY.mats[k])
return LBY.mats[k];
var m = LBY.lite ? wM(col, o) : new THREE.MeshPhongMaterial({ color: col, shininess: (o && o.shine) || 10, specular: 0x1A1814 });
if (!LBY.lite && o) {
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
}
if (o.ds)
m.side = THREE.DoubleSide;
}
return (LBY.mats[k] = m);
},
function (w, h, d, sx, sy, sz, amp, topAmp, round, seed, uvM) {
var g = new THREE.BoxGeometry(w, h, d, sx, sy, sz), p = g.attributes.position, uv = g.attributes.uv, n = g.attributes.normal;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), top = y > h / 2 - 0.01;
var nz = wFbm(x * 0.9 + seed, z * 0.9 + y * 0.7, seed, 2) - 0.5, ny = wFbm(x * 1.3 + y, z * 1.3 - seed, seed + 3, 2) - 0.5;
var ax = Math.abs(x) > w / 2 - 0.01, az = Math.abs(z) > d / 2 - 0.01;
if (ax && y > -h / 2 + 0.05)
p.setX(i, x + Math.sign(x) * nz * amp);
if (az && y > -h / 2 + 0.05)
p.setZ(i, z + Math.sign(z) * ny * amp);
if (top) {
var e = Math.max(Math.abs(x) / (w / 2), Math.abs(z) / (d / 2));
p.setY(i, y + (nz + ny) * topAmp - (round ? e * e * round : 0));
}
}
for (var f = 0; f < uv.count; f++) {
var nx = Math.abs(n.getX(f)), nyv = Math.abs(n.getY(f));
var X = p.getX(f), Y = p.getY(f), Z = p.getZ(f);
if (nyv > 0.5)
uv.setXY(f, X / uvM, Z / uvM);
else if (nx > 0.5)
uv.setXY(f, Z / uvM, Y / uvM);
else
uv.setXY(f, X / uvM, Y / uvM);
}
g.translate(0, h / 2, 0);
g.computeVertexNormals();
g.userData.shared = true;
return g;
},
function () {
if (LBY.pieces)
return LBY.pieces;
var lite = LBY.lite;
LBY.pieces = {
stone: lbyRough(4.04, LBY_STONE_H, 4.04, lite ? 1 : 3, lite ? 2 : 6, lite ? 1 : 3, lite ? 0.08 : 0.16, lite ? 0.18 : 0.32, 0, 7, 3.2),
cap: lbyRough(4.3, 0.5, 4.3, 1, 1, 1, 0.06, 0.08, 0, 9, 1.6),
hedge: lbyRough(4.16, LBY_HEDGE_H, 4.16, lite ? 1 : 4, lite ? 2 : 8, lite ? 1 : 4, lite ? 0.16 : 0.3, lite ? 0.2 : 0.35, 0.55, 11, 2.2)
};
return LBY.pieces;
},
function () {
if (LBY.wm)
return LBY.wm;
LBY.wm = {
stone: lbySurf("wall", 0xD8C4A4, 1, { ns: 1.4 }),
cap: lbySurf("wall", 0xA89880, 1, { ns: 1 }),
hedge: lbySurf("hedge", 0x6E9A58, 1, { ns: 1.6, shine: 3 }),
seem: null
};
var s = LBY.wm.stone.clone();
s.transparent = true;
s.opacity = 1;
s.depthWrite = true;
LBY.wm.seem = s;
return LBY.wm;
},
function (G) {
var N = LBY.N, n = Math.ceil(N / LBY_CS), P = lbyPieces(), M = lbyWallMats(), Gr = LBY.grid;
LBY.slot = new Int32Array(N * N).fill(-1);
LBY.slotC = new Int16Array(N * N).fill(-1);
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color();
for (var a = 0; a < n; a++)
for (var b = 0; b < n; b++) {
var lists = { stone: [], hedge: [] }, caps = [];
for (var i = a * LBY_CS; i < Math.min(N, (a + 1) * LBY_CS); i++)
for (var j = b * LBY_CS; j < Math.min(N, (b + 1) * LBY_CS); j++) {
var k = i * N + j, kind = Gr.kind[k];
if (kind === 0)
continue;
var mat = lbyUnitMat(k);
lists[mat].push(k);
if (mat === "stone")
caps.push(k);
}
var C = { a: a, b: b, x: lbyM(a * LBY_CS + LBY_CS / 2), z: lbyM(b * LBY_CS + LBY_CS / 2), meshes: [], seem: null, list: {} };
["stone", "hedge"].forEach(function (mat) {
var L = lists[mat];
if (!L.length)
return;
var mesh = new THREE.InstancedMesh(P[mat], M[mat], L.length);
mesh.frustumCulled = false;
mesh.name = "lby-" + mat;
mesh.userData.keep = 1;
L.forEach(function (k, idx) { LBY.slot[k] = idx; LBY.slotC[k] = LBY.chunks.length; lbySetInst(mesh, idx, k, m4, q, e, v, s); });
mesh.instanceMatrix.needsUpdate = true;
if (!LBY.lite) {
L.forEach(function (k, idx) { var h = lbyHash(k); col.setRGB(0.88 + 0.12 * ((h & 255) / 255), 0.88 + 0.12 * (((h >> 8) & 255) / 255), 0.86 + 0.12 * (((h >> 16) & 255) / 255)); mesh.setColorAt(idx, col); });
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
}
G.add(mesh);
C.meshes.push(mesh);
C.list[mat] = mesh;
});
if (caps.length && !LBY.lite) {
var cm = new THREE.InstancedMesh(P.cap, M.cap, caps.length);
cm.frustumCulled = false;
cm.userData.keep = 1;
cm.name = "lby-cap";
caps.forEach(function (k, idx) { lbySetCap(cm, idx, k, m4, q, e, v, s); });
cm.instanceMatrix.needsUpdate = true;
C.cap = cm;
C.caps = caps;
G.add(cm);
C.meshes.push(cm);
}
LBY.chunks.push(C);
}
},
function (mesh, idx, k, m4, q, e, v, s) {
var N = LBY.N, i = (k / N) | 0, j = k - i * N, G = LBY.grid, isH = mesh.name === "lby-hedge";
var g = G.kind[k] >= 2 ? (G.wall[k] ? G.grow[k] : G.grow[k]) : 1;
if (G.kind[k] >= 2 && !G.wall[k] && G.grow[k] >= 0.999)
g = 0;
if (G.seem[k])
g = 0;
var hy = lbyHeightOf(k, isH ? "hedge" : "stone") * Math.max(0.0001, g);
e.set(0, ((lbyHash(k) >>> 9) % 4) * Math.PI / 2, 0);
q.setFromEuler(e);
v.set(lbyM(i), g < 0.002 ? -30 : 0, lbyM(j));
s.set(g < 0.002 ? 0.0001 : 1, hy, g < 0.002 ? 0.0001 : 1);
m4.compose(v, q, s);
mesh.setMatrixAt(idx, m4);
},
function (mesh, idx, k, m4, q, e, v, s) {
var N = LBY.N, i = (k / N) | 0, j = k - i * N, G = LBY.grid;
var g = G.kind[k] >= 2 ? G.grow[k] : 1;
if (G.kind[k] >= 2 && !G.wall[k] && G.grow[k] >= 0.999)
g = 0;
if (G.seem[k])
g = 0;
var top = LBY_STONE_H * lbyHeightOf(k, "stone") * g;
e.set(0, (lbyHash(k) % 7) * 0.05, 0);
q.setFromEuler(e);
v.set(lbyM(i), g < 0.002 ? -30 : top - 0.12, lbyM(j));
s.set(g < 0.002 ? 0.0001 : 1, 1, g < 0.002 ? 0.0001 : 1);
m4.compose(v, q, s);
mesh.setMatrixAt(idx, m4);
},
function (k) {
if (!LBY_T.m4) {
LBY_T.m4 = new THREE.Matrix4();
LBY_T.q = new THREE.Quaternion();
LBY_T.e = new THREE.Euler();
LBY_T.v = new THREE.Vector3();
LBY_T.s = new THREE.Vector3();
}
var c = LBY.slotC[k];
if (c < 0)
return;
var C = LBY.chunks[c], T = LBY_T;
var mat = lbyUnitMat(k), mesh = C.list[mat];
if (!mesh)
return;
lbySetInst(mesh, LBY.slot[k], k, T.m4, T.q, T.e, T.v, T.s);
mesh.instanceMatrix.needsUpdate = true;
if (mat === "stone" && C.cap) {
var ci = C.caps.indexOf(k);
if (ci >= 0) {
lbySetCap(C.cap, ci, k, T.m4, T.q, T.e, T.v, T.s);
C.cap.instanceMatrix.needsUpdate = true;
}
}
},
function () {
var N = LBY.N, P = lbyPieces(), M = lbyWallMats(), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3();
LBY.seem = [];
LBY.chunks.forEach(function (C) {
if (C.seem) {
LBY.G.remove(C.seem);
C.meshes.splice(C.meshes.indexOf(C.seem), 1);
C.seem.dispose && C.seem.dispose();
C.seem = null;
}
var L = [];
for (var i = C.a * LBY_CS; i < Math.min(N, (C.a + 1) * LBY_CS); i++)
for (var j = C.b * LBY_CS; j < Math.min(N, (C.b + 1) * LBY_CS); j++) {
var k = i * N + j;
if (LBY.grid.seem[k]) {
L.push(k);
LBY.seem.push({ x: lbyM(i), z: lbyM(j) });
}
}
if (!L.length)
return;
var m = new THREE.InstancedMesh(P.stone, M.seem, L.length);
m.frustumCulled = false;
m.userData.keep = 1;
m.name = "lby-seem";
L.forEach(function (k, idx) { var i = (k / N) | 0, j = k - i * N; v.set(lbyM(i), 0, lbyM(j)); s.set(1, lbyHeightOf(k, "stone"), 1); m4.compose(v, q, s); m.setMatrixAt(idx, m4); });
m.instanceMatrix.needsUpdate = true;
LBY.G.add(m);
C.seem = m;
C.meshes.push(m);
});
},
function (L) {
var far = LBY.lite ? 150 : 380;
if (lbyBelow()) {
LBY.chunks.forEach(function (C) { C.meshes.forEach(function (m) { m.visible = false; }); });
return;
}
LBY.chunks.forEach(function (C) {
var d = Math.max(0, Math.hypot(L.x - C.x, L.z - C.z) - 72), on = d < far;
C.meshes.forEach(function (m) { if (m.visible !== on)
m.visible = on; });
});
},
function (G) {
var lite = LBY.lite, E = lite ? 1400 : 2800, seg = lite ? 70 : 140;
var m = lbySurf("floor", 0xC8B49A, E / 7, { ns: 1.2 }).clone();
m.vertexColors = true;
LBY.mats["earthV"] = m;
var geo = new THREE.PlaneGeometry(E, E, seg, seg);
geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 3), 3));
var s = new THREE.Mesh(geo, m);
s.rotation.x = -Math.PI / 2;
s.position.y = 0;
G.add(s);
s.userData.keep = 1;
LBY.earth = s;
LBY.earthAt = null;
var c = new THREE.Mesh(new THREE.PlaneGeometry(LBY_COURT.x1 - LBY_COURT.x0, LBY_COURT.z1 - LBY_COURT.z0 + 8), lbySurf("plaza", 0xD8CCB8, 36, { ns: 1 }));
c.rotation.x = -Math.PI / 2;
c.position.set((LBY_COURT.x0 + LBY_COURT.x1) / 2, 0.05, (LBY_COURT.z0 + LBY_COURT.z1) / 2 - 4);
G.add(c);
c.userData.keep = 1;
},
function () {
var E = LBY.earth, P = E.geometry.attributes.position, C = E.geometry.attributes.color, ox = E.position.x, oz = E.position.z;
for (var v = 0; v < P.count; v++) {
var x = ox + P.getX(v), z = oz - P.getY(v), t = lbyMatV(x / LBY.U + LBY.C, z / LBY.U + LBY.C);
t = Math.max(0, Math.min(1, (t - 0.4) / 0.2));
t = t * t * (3 - 2 * t);
C.setXYZ(v, 1 - 0.36 * t, 1 - 0.1 * t, 1 - 0.48 * t);
}
C.needsUpdate = true;
},
function (base) {
var g = new THREE.BufferGeometry();
for (var a in base.attributes)
g.setAttribute(a, base.attributes[a]);
if (base.index)
g.setIndex(base.index);
g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 4, 0), 62);
g.boundingBox = new THREE.Box3(new THREE.Vector3(-42, -1, -42), new THREE.Vector3(42, 10, 42));
g.userData.shared = true;
return g;
},
function () {
var P = lbyPieces(), M = lbyWallMats(), n = LBY_RB * LBY_RB, S = { key: null, D: null, ep: null, meshes: [], hall: null };
if (!LBY_RV.geo)
LBY_RV.geo = { stone: lbySlotGeo(P.stone), hedge: lbySlotGeo(P.hedge), cap: lbySlotGeo(P.cap), flat: new THREE.PlaneGeometry(LBY_RB * LBY.U, LBY_RB * LBY.U) };
var G = LBY_RV.geo, root = new THREE.Group();
root.name = "lby-reach";
root.userData.keep = 1;
LBY.G.add(root);
S.root = root;
S.stone = new THREE.InstancedMesh(G.stone, M.stone, n);
S.hedge = new THREE.InstancedMesh(G.hedge, M.hedge, n);
[S.stone, S.hedge].forEach(function (m) { m.count = 0; m.userData.keep = 1; root.add(m); S.meshes.push(m); });
S.stone.name = "lby-stone";
S.hedge.name = "lby-hedge";
if (!LBY.lite)
[S.stone, S.hedge].forEach(function (m) { m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(n * 3).fill(1), 3); });
if (!LBY.lite) {
S.cap = new THREE.InstancedMesh(G.cap, M.cap, n);
S.cap.count = 0;
S.cap.userData.keep = 1;
root.add(S.cap);
S.meshes.push(S.cap);
}
LBY_RV.slots.push(S);
return S;
},
function (S) {
var D = S.D, RB = LBY_RB, Oi = D.bx * RB, Oj = D.by * RB, cx = lbyM(Oi + RB / 2), cz = lbyM(Oj + RB / 2), T = LBY_T;
if (!T.m4) {
T.m4 = new THREE.Matrix4();
T.q = new THREE.Quaternion();
T.e = new THREE.Euler();
T.v = new THREE.Vector3();
T.s = new THREE.Vector3();
}
S.root.position.set(cx, 0, cz);
var cnt = { stone: 0, hedge: 0 }, nc = 0, col = LBY.lite ? null : new THREE.Color();
for (var k = 0; k < RB * RB; k++) {
var f = D.fix[k];
if (f === 2 || f === 3)
continue;
var g = D.wall[k] ? D.grow[k] : (D.grow[k] < 0.999 ? D.grow[k] : 0);
if (g < 0.002)
continue;
var mat = D.hm[k] ? "hedge" : "stone", mesh = S[mat], n = cnt[mat]++;
var a = (k / RB) | 0, b = k - a * RB, gk = (Oi + a) * 131071 + (Oj + b), hy = lbyHeightOf(gk, mat) * g, h = lbyHash(gk);
T.e.set(0, ((h >>> 9) % 4) * Math.PI / 2, 0);
T.q.setFromEuler(T.e);
T.v.set(lbyM(Oi + a) - cx, 0, lbyM(Oj + b) - cz);
T.s.set(1, hy, 1);
T.m4.compose(T.v, T.q, T.s);
mesh.setMatrixAt(n, T.m4);
if (col) {
col.setRGB(0.88 + 0.12 * ((h & 255) / 255), 0.88 + 0.12 * (((h >> 8) & 255) / 255), 0.86 + 0.12 * (((h >> 16) & 255) / 255));
mesh.setColorAt(n, col);
}
if (S.cap && mat === "stone") {
T.e.set(0, (h % 7) * 0.05, 0);
T.q.setFromEuler(T.e);
T.v.set(lbyM(Oi + a) - cx, LBY_STONE_H * hy - 0.12, lbyM(Oj + b) - cz);
T.s.set(1, 1, 1);
T.m4.compose(T.v, T.q, T.s);
S.cap.setMatrixAt(nc++, T.m4);
}
}
[S.stone, S.hedge].forEach(function (m) { m.count = cnt[m === S.stone ? "stone" : "hedge"]; m.instanceMatrix.needsUpdate = true; if (m.instanceColor)
m.instanceColor.needsUpdate = true; });
if (S.cap) {
S.cap.count = nc;
S.cap.instanceMatrix.needsUpdate = true;
}
},
function (L, force) {
var bx = Math.floor(lbyU(L.x) / LBY_RB), by = Math.floor(lbyU(L.z) / LBY_RB), r = lbyReachRadius();
var want = {}, need = [];
for (var a = -r; a <= r; a++)
for (var b = -r; b <= r; b++) {
var X = bx + a, Y = by + b;
if (X >= 0 && X <= 14 && Y >= 0 && Y <= 14)
continue;
want[X + "," + Y] = [X, Y];
}
var free = [];
LBY_RV.slots.forEach(function (S) { if (S.key && want[S.key]) {
var W = want[S.key];
delete want[S.key];
S.keep = W;
}
else
free.push(S); });
Object.keys(want).forEach(function (k) { var S = free.pop() || lbySlotMake(); if (S.hall)
lbyHallDrop(S); S.key = k; S.D = null; S.ep = null; S.keep = want[k]; });
free.forEach(function (S) { S.key = null; S.D = null; S.root.visible = false; if (S.hall)
lbyHallDrop(S); });
LBY_RV.cx = bx;
LBY_RV.cz = by;
LBY_RV.slots.forEach(function (S) {
if (!S.key)
return;
var X = S.keep[0], Y = S.keep[1], D = lbyReachData(X, Y);
if (S.D !== D) {
var near = Math.max(Math.abs(X - bx), Math.abs(Y - by)) <= (LBY.lite ? 1 : 2);
if (S.D && near && D.prevWall && S.D.ep !== D.ep) {
var any = false;
for (var k = 0; k < D.wall.length; k++) {
if (D.fix[k])
continue;
if (D.prevWall[k] !== D.wall[k]) {
D.grow[k] = D.wall[k] ? 0.001 : 0.998;
any = true;
}
}
if (any && LBY_RV.anim.indexOf(S) < 0)
LBY_RV.anim.push(S);
}
D.prevWall = null;
S.D = D;
S.ep = D.ep;
lbySlotFill(S);
}
var hallNear = D.hall && Math.max(Math.abs(X - bx), Math.abs(Y - by)) <= (LBY.lite ? 1 : 2);
if (hallNear && !S.hall)
lbyHallBuildAt(S, X, Y);
else if (!hallNear && S.hall)
lbyHallDrop(S);
});
},
function (dt) {
if (!LBY_RV.anim.length)
return;
LBY_RV.at += dt;
if (LBY_RV.at < 0.08)
return;
var st = LBY_RV.at / LBY_GROW_S;
LBY_RV.at = 0;
LBY_RV.anim = LBY_RV.anim.filter(function (S) {
var D = S.D;
if (!D)
return false;
var more = false;
for (var k = 0; k < D.grow.length; k++) {
var g = D.grow[k];
if (g >= 1)
continue;
if (D.wall[k]) {
g = Math.min(1, g + st);
}
else {
g = g - st;
if (g <= 0.0011)
g = 1;
}
D.grow[k] = g;
if (g < 1)
more = true;
}
lbySlotFill(S);
return more;
});
},
function () {
if (LBY_MIST_TEX)
return LBY_MIST_TEX;
LBY_MIST_TEX = wTex(128, 128, function (x, W, H) { var g = x.createRadialGradient(W / 2, H / 2, 4, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,.75)"); g.addColorStop(0.5, "rgba(255,255,255,.3)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
return LBY_MIST_TEX;
},
function (G) {
var n = LBY.lite ? 10 : 34;
for (var i = 0; i < n; i++) {
var m = new THREE.Sprite(new THREE.SpriteMaterial({ map: lbyMistTex(), color: 0xE8EEE8, transparent: true, opacity: 0.16, depthWrite: false, fog: true }));
m.scale.set(26, 7, 1);
m.visible = false;
G.add(m);
LBY.mist.push({ s: m, x: 0, z: 0, ph: Math.random() * 6, sp: 0.4 + Math.random() * 0.6 });
}
for (var g = 0; g < 8; g++) {
var gs = new THREE.Group();
G.add(gs);
for (var p = 0; p < (LBY.lite ? 3 : 6); p++) {
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: lbyMistTex(), color: 0xF2C860, transparent: true, opacity: 0.32, depthWrite: false, fog: true }));
sp.scale.set(9, 4, 1);
sp.position.set((Math.random() - 0.5) * 5, 1.4 + Math.random() * 1.2, (Math.random() - 0.5) * 5);
gs.add(sp);
}
LBY.gold.push({ g: gs, x: 0, z: 0 });
}
},
function () {
var R = wRand((LBY.hedgeEp * 31 + 7) >>> 0 || 1);
LBY.gold.forEach(function (P) {
for (var t = 0; t < 60; t++) {
var i = LBY.C + ((R() * 2 - 1) * 140 | 0), j = LBY.C + ((R() * 2 - 1) * 140 | 0);
i |= 1;
j |= 1;
if (lbyMatAt(i, j) !== "hedge" || lbySolidUnit(i, j) || LBY.grid.carve[lbyIdx(i, j)])
continue;
P.x = lbyM(i);
P.z = lbyM(j);
P.g.position.set(P.x, 0, P.z);
break;
}
});
},
function (x, z, y, col, parent) {
var g = new THREE.Group();
g.position.set(x, 0, z);
(parent || LBY.G).add(g);
wCyl(0.09, 0.12, y, lbyC(0x2A2622), 0, y / 2, 0, g, 6);
wBox(0.42, 0.5, 0.42, lbyC(0x3A3228), 0, y + 0.2, 0, g);
wBox(0.3, 0.36, 0.3, lbyGlowM(col || 0xFFD490), 0, y + 0.2, 0, g);
var gl = wGlow(col || 0xFFD490, 1.5, 0.3);
gl.position.set(0, y + 0.2, 0);
g.add(gl);
LBY.glows.push(gl);
LBY.solids.push({ x: x, z: z, r: 0.2 });
return g;
},
function (key, x, z, ry, o) {
var F = LBY_FOLK[key], p = wPerson("lby_" + key, { look: F.look || null, title: o && o.title, place: "the Labyrinth" });
p.position.set(x, (o && o.y) || 0, z);
p.rotation.y = ry || 0;
LBY.G.add(p);
var P = { g: p, key: key, wander: o && o.wander };
LBY.people.push(P);
LBY.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (x, z, ry, w, h, mat, parent) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
(parent || LBY.G).add(g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
[-1, 1].forEach(function (k) { wBox(1.6, h, 1.8, mat, k * (w / 2 + 0.8), h / 2, 0, g); var px = x + k * (w / 2 + 0.8) * c, pz = z - k * (w / 2 + 0.8) * s; LBY.solids.push({ x: px, z: pz, r: 1.1 }); });
for (var i = 0; i <= 10; i++) {
var a = i / 10 * Math.PI, b = wBox(1.2, 0.9, 1.8, mat, Math.cos(a) * (w / 2 + 0.6), h + Math.sin(a) * (w / 2 + 0.4), 0, g);
b.rotation.z = a - Math.PI / 2;
}
return g;
},
function (G) {
var stone = lbySurf("wall", 0xD8C4A4, 0.6, { ns: 1.3 }), dark = lbyC(0x4A4036), gx = LBY_GATE.x, gz = LBY_GATE.z;
[-1, 1].forEach(function (k) {
var tx = gx + k * 9;
lbyCylS(4.4, 16, stone, tx, 8, gz + 1, G, true);
var cone = wCone(5, 6, lbySurf("wall", 0x8A7A68, 0.5), tx, 19, gz + 1, G, LBY.lite ? 8 : 16);
for (var b = 0; b < 8; b++) {
var a = b / 8 * Math.PI * 2;
wBox(1.2, 1.2, 1.2, stone, tx + Math.cos(a) * 4.3, 16.6, gz + 1 + Math.sin(a) * 4.3, G);
}
lbyLamp(gx + k * 4.2, gz + 8, 3.2, 0xFFD490, G);
});
lbyBox(14, 4, 3, stone, gx, 10.5, gz, G, false);
lbyArch(gx, gz + 1, 0, 4, 7.4, stone, G);
lbySign(["THE LABYRINTH", "past this gate, nothing is safe"], 6, 1.4, gx, 13.6, gz + 1.6, 0, G);
var za = LBY_COURT.z0, zb = LBY_ARCH_Z - 2.5, zc = LBY_ARCH_Z + 2.5, zd = LBY_COURT.z1;
[LBY_COURT.x0, LBY_COURT.x1].forEach(function (wx, si) {
lbyBox(1.2, 3, zb - za, stone, wx, 1.5, (za + zb) / 2, G, true);
lbyBox(1.2, 3, zd - zc, stone, wx, 1.5, (zc + zd) / 2, G, true);
lbyArch(wx, LBY_ARCH_Z, Math.PI / 2, 4, 4.4, stone, G);
lbySign([si ? "EAST ARCH" : "WEST ARCH", "into the Endless Reaches"], 3.4, 0.9, wx + (si ? -0.8 : 0.8), 6.4, LBY_ARCH_Z, si ? -Math.PI / 2 : Math.PI / 2, G);
});
lbyBox(LBY_COURT.x1 - LBY_COURT.x0, 3, 1.2, stone, 0, 1.5, LBY_COURT.z1, G, true);
for (var x = LBY_COURT.x0 + 12; x < LBY_COURT.x1; x += 24) {
lbyLamp(x, LBY_COURT.z0 + 14, 3.4, 0xFFD490, G);
lbyLamp(x, LBY_COURT.z1 - 10, 3.4, 0xFFD490, G);
}
var hd = new THREE.Group();
hd.position.set(0, 0, LBY_COURT.z1 - 0.8);
G.add(hd);
wBox(3.4, 4.6, 0.4, lbyC(0x3A3026), 0, 2.3, 0, hd);
lbyMarkMesh(hd, 0, 5.6, 0.3, 1.4);
lbySign(["The Way Home", "to Somnucor · press E"], 2.8, 0.7, 0, 7.4, LBY_COURT.z1 - 1.2, Math.PI, G);
LBY.home = { x: 0, z: LBY_COURT.z1 - 3 };
lbyPerson("warden", gx + 7, gz + 14, Math.PI * 0.85);
for (var b2 = 0; b2 < 6; b2++) {
var bx = -70 + b2 * 28, bz = LBY_COURT.z0 + 40 + (b2 % 2) * 30;
lbyBench(G, bx, bz, b2 % 2 ? 0 : Math.PI);
}
var hs = new THREE.Group();
hs.position.set(-30, 0, gz + 30);
G.add(hs);
wCyl(1.6, 2, 0.6, lbyC(0x6A6258), 0, 0.3, 0, hs, 16);
var face = wCyl(1.2, 1.2, 2.6, stone, 0, 1.9, 0, hs, 16);
var dial = new THREE.Mesh(new THREE.CircleGeometry(1.05, 26), new THREE.MeshLambertMaterial({ map: lbyDialTex(), transparent: false }));
dial.position.set(0, 2.4, 1.22);
hs.add(dial);
var dial2 = dial.clone();
dial2.rotation.y = Math.PI;
dial2.position.z = -1.22;
hs.add(dial2);
LBY.solids.push({ x: -30, z: gz + 30, r: 1.9 });
lbySpot(-30, gz + 30, 4, "The Hour Stone", "run the Thirteenth Hour (reach the Heart in thirteen of the maze's hours)", function () { lbyRunCard(); });
var gh = new THREE.Group();
gh.position.set(52, 0, gz + 52);
G.add(gh);
var W = 34, D = 26, H = 11;
lbyBox(W, H, D, stone, 52, H / 2, gz + 52, G, true);
for (var r = 0; r < 2; r++) {
var rf = wBox(W + 1.4, 0.4, D * 0.62, lbySurf("wall", 0x5A5660, 0.4), 0, H + 3.2, (r ? 1 : -1) * D * 0.26, gh);
rf.rotation.x = (r ? -1 : 1) * 0.5;
}
wBox(W, 6, 1.2, stone, 0, H + 2.6, 0, gh);
for (var wx = -12; wx <= 12; wx += 6)
[D / 2 + 0.02, -D / 2 - 0.02].forEach(function (zz) { wBox(1.6, 2.4, 0.1, lbyGlowM(0xE8C890), wx, 6.4, zz, gh); wBox(1.6, 2.4, 0.1, lbyGlowM(0xE8C890), wx, 2.6, zz, gh); });
wBox(3, 4.2, 0.2, lbyC(0x3A2A1E), -W / 2 - 0.1, 2.1, 0, gh).rotation.y = Math.PI / 2;
lbySign(["THE GATEHOUSE", "the Hall of Maps · the Warden's office"], 5, 1.2, 52 - W / 2 - 0.3, 6.6, gz + 52, -Math.PI / 2, G);
lbySpot(52 - W / 2 - 1.6, gz + 52, 3, "The Gatehouse", "go in", function () { lbyInside("gatehouse"); });
lbyCourtCamp(G);
},
function (G) {
if (typeof build !== "function" || typeof KIT === "undefined")
return;
var lite = LBY.lite;
function put(a, x, z, ry, s, r) {
if (!KIT[a])
return null;
var m;
try {
m = build({ id: "lby_" + a + "_" + Math.round(x * 10) + "_" + Math.round(z * 10), archetype: a, label: null, attrs: Object.assign(s && s !== 1 ? { s: s } : {}, a === "hedge" ? { c: 0x3F6E34 } : {}), x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
}
catch (e) {
return null;
}
if (!m)
return null;
m.position.set(x, 0.05, z);
m.rotation.y = ry || 0;
G.add(m);
m.userData.keep = 1;
if (r)
LBY.solids.push({ x: x, z: z, r: r });
return m;
}
[[-74, 700, 0.4], [-60, 706, -0.2], [-78, 684, 1.2], [-46, 698, 0.1]].forEach(function (t, i) { if (lite && i > 1)
return; put("tent", t[0], t[1], t[2], 1, 2.6); });
put("well", -56, 688, 0, 1, 1.4);
for (var i = 0; i < (lite ? 3 : 5); i++) {
var mx = 22 + i * 11;
put("marketstall", mx, 696, Math.PI, 1, 2.0);
}
put("statue", -9, 640, Math.PI / 2, 1, 1.0);
put("statue", 9, 640, -Math.PI / 2, 1, 1.0);
[[-82, 614], [82, 614], [-84, 712], [84, 712]].forEach(function (t, i) { put("tree", t[0], t[1], i * 1.7, 0.9, 0.7); });
},
function (G, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
var wood = lbyC(0x6A4A30), iron = lbyC(0x2A2A2C);
wBox(2.4, 0.1, 0.5, wood, 0, 0.48, 0, g);
wBox(2.4, 0.5, 0.08, wood, 0, 0.85, -0.24, g);
[-1.05, 1.05].forEach(function (k) { wBox(0.1, 0.48, 0.5, iron, k, 0.24, 0, g); });
LBY.solids.push({ x: x, z: z, hw: 1.25, hd: 0.35, rot: ry });
},
function () {
if (LBY_DIAL)
return LBY_DIAL;
LBY_DIAL = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#F0E6CC";
x.beginPath();
x.arc(W / 2, H / 2, W / 2 - 2, 0, 7);
x.fill();
x.strokeStyle = "#5A4630";
x.lineWidth = 6;
x.stroke();
x.fillStyle = "#3A2A1A";
x.font = "bold 22px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
var N = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];
for (var i = 0; i < 13; i++) {
var a = i / 13 * Math.PI * 2 - Math.PI / 2 + Math.PI * 2 / 13;
x.fillText(N[i], W / 2 + Math.cos(a) * 96, H / 2 + Math.sin(a) * 96);
}
x.beginPath();
x.arc(W / 2, H / 2, 8, 0, 7);
x.fill();
});
return LBY_DIAL;
},
function (G) {
var stone = lbySurf("wall", 0xD0BC9C, 0.6, { ns: 1.3 }), R = wRand(707);
var B = lbyCarveAt("reek");
LBY.bog = { x: B.x, z: B.z, hw: B.hw - 4, hd: B.hd - 4, stones: [] };
var bog = new THREE.Mesh(new THREE.PlaneGeometry(B.hw * 2 - 6, B.hd * 2 - 6, LBY.lite ? 1 : 16, LBY.lite ? 1 : 10), new THREE.MeshPhongMaterial({ color: 0x4A5228, shininess: 40, specular: 0x2A3020, transparent: true, opacity: 0.94 }));
bog.rotation.x = -Math.PI / 2;
bog.position.set(B.x, 0.09, B.z);
G.add(bog);
LBY.bogMesh = bog;
for (var s = 0; s < 26; s++) {
var t = s / 25, sx = B.x - B.hw + 6 + t * (B.hw * 2 - 12), sz = B.z + Math.sin(t * 9) * B.hd * 0.45 + (R() - 0.5) * 3;
var st = wCyl(0.9 + R() * 0.3, 1.1, 0.5, lbyC(0x7A7468), sx, 0.2, sz, G, LBY.lite ? 7 : 12);
st.rotation.y = R() * 3;
LBY.bog.stones.push({ x: sx, z: sz, r: 1.05 });
}
for (var b = 0; b < (LBY.lite ? 6 : 18); b++) {
var bb = wSph(0.12 + R() * 0.1, lbyC(0x6A6A3A, { op: 0.8 }), B.x + (R() - 0.5) * B.hw * 1.6, 0.1, B.z + (R() - 0.5) * B.hd * 1.6, G, 8);
LBY.fx.push({ m: bb, k: "bubble", ph: R() * 6, y0: 0.1 });
}
for (var r2 = 0; r2 < (LBY.lite ? 4 : 10); r2++) {
var tree = wCyl(0.25, 0.45, 5 + R() * 3, lbyC(0x3A3226), B.x + (R() - 0.5) * B.hw * 1.8, 2.5, B.z + (R() < 0.5 ? -1 : 1) * (B.hd - 2), G, 7);
tree.rotation.z = (R() - 0.5) * 0.4;
}
lbySign(["THE REEKMIRE", "mind the stones · do not fall in"], 4, 1, B.x + B.hw - 1, 3.2, B.z, -Math.PI / 2, G);
var S = lbyCarveAt("stairs");
lbyBox(28, 22, 28, stone, S.x, 11, S.z - 4, G, true);
[-1, 1].forEach(function (k) { for (var q = -1; q <= 1; q++) {
lbyBox(2, 18, 4, stone, S.x + k * 15, 9, S.z - 4 + q * 9, G, true);
} });
var spire = wCone(16, 14, lbySurf("wall", 0x6A6670, 0.4), S.x, 29, S.z - 4, G, 4);
spire.rotation.y = Math.PI / 4;
for (var w = -1; w <= 1; w++)
wBox(2.6, 7, 0.2, lbyGlowM(0xD8C0FF), S.x + w * 7, 12, S.z + 10.1, G);
wBox(4, 6, 0.3, lbyC(0x2A2030), S.x, 3, S.z + 10.1, G);
lbySign(["THE HALL OF TURNED STAIRS", "up is wherever you stand"], 5, 1.2, S.x, 7.6, S.z + 10.4, 0, G);
lbySpot(S.x, S.z + 12, 3.2, "The Hall of Turned Stairs", "go in", function () { lbyInside("stairs"); });
var H = lbyCarveAt("hands");
LBY.shaft = { x: H.x, z: H.z };
var ring = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.7, 8, LBY.lite ? 18 : 36), stone);
ring.rotation.x = Math.PI / 2;
ring.position.set(H.x, 0.6, H.z);
G.add(ring);
var pit = new THREE.Mesh(new THREE.CircleGeometry(5.8, LBY.lite ? 18 : 36), new THREE.MeshBasicMaterial({ color: 0x050404 }));
pit.rotation.x = -Math.PI / 2;
pit.position.set(H.x, 0.08, H.z);
G.add(pit);
LBY.solids.push({ x: H.x, z: H.z, r: 6.4 });
for (var h = 0; h < (LBY.lite ? 10 : 24); h++) {
var a = h / (LBY.lite ? 10 : 24) * Math.PI * 2, hand = lbyHand(lbyC(0x9A8C7A));
hand.position.set(H.x + Math.cos(a) * 5.6, 0.2, H.z + Math.sin(a) * 5.6);
hand.rotation.y = -a + Math.PI / 2;
hand.rotation.x = -0.5;
G.add(hand);
}
var nx = H.x + 12, nz = H.z;
lbyCylS(3.2, 46, stone, nx, 23, nz, G, true, LBY.lite ? 8 : 14);
wCyl(5, 5, 0.6, stone, nx, 46.3, nz, G, LBY.lite ? 10 : 20);
for (var p = 0; p < 16; p++) {
var ap = p / 16 * Math.PI * 2;
wBox(0.25, 1.1, 0.25, lbyC(0x2A2622), nx + Math.cos(ap) * 4.7, 47.1, nz + Math.sin(ap) * 4.7, G);
}
LBY.lookout = { x: nx, z: nz, y: 46.6 };
lbyFloorAt(nx, nz, 4.6, 4.6, 46.6);
lbySign(["THE SHAFT OF HANDS", "ask them: up, or down"], 4, 1, H.x, 3.4, H.z + 7.4, 0, G);
lbySpot(H.x, H.z, 8.5, "The Shaft of Hands", "speak to the hands", function () { lbyHandsCard(); });
var T = lbyCarveAt("doors");
LBY.twodoors = { x: T.x, z: T.z };
lbyBox(T.hw * 2 - 2, 8, 1.6, stone, T.x, 4, T.z - 6, G, true);
[-1, 1].forEach(function (k) {
var dx = T.x + k * 5;
wBox(3, 5, 0.3, lbyC(k < 0 ? 0x6A2A22 : 0x2A3A5A), dx, 2.5, T.z - 5.1, G);
wSph(0.16, lbyC(0xC8A040), dx + 1, 2.4, T.z - 4.9, G, 8);
var guard = lbyStatue(lbyC(0x8A8070));
guard.position.set(dx + k * 3.4, 0, T.z - 3.6);
G.add(guard);
LBY.solids.push({ x: dx + k * 3.4, z: T.z - 3.6, r: 1 });
});
lbySign(["THE TWO DOORS", "one guard tells the truth, one always lies"], 5, 1.2, T.x, 9.4, T.z - 5.1, 0, G);
lbySpot(T.x, T.z - 2, 5, "The Two Doors", "speak with the guards", function () { lbyDoorsCard(); });
var F = lbyCarveAt("wellcourt");
for (var f = 0; f < 7; f++) {
var drum = wCyl(2.2, 2.2, 2.4, stone, F.x - 4 + f * 2.5, 1.6, F.z + 3 + Math.sin(f) * 0.6, G, LBY.lite ? 8 : 14);
drum.rotation.z = Math.PI / 2;
drum.rotation.y = 0.3;
}
LBY.solids.push({ x: F.x + 3.5, z: F.z + 3, hw: 9, hd: 2.4, rot: 0.3 });
lbyCylS(3, 1, stone, F.x - 6, 0.5, F.z - 6, G, true);
wCyl(0.5, 0.6, 2.6, stone, F.x - 6, 1.8, F.z - 6, G, 10);
for (var rb = 0; rb < (LBY.lite ? 6 : 16); rb++) {
var rk = wBox(0.6 + R(), 0.4 + R() * 0.6, 0.6 + R(), stone, F.x + (R() - 0.5) * 14, 0.3, F.z + (R() - 0.5) * 14, G);
rk.rotation.set(R(), R() * 3, R());
}
var K = lbyCarveAt("statues");
[[-6, -5, 0], [6, -5, 0], [0, 7, 1]].forEach(function (q, i) { var st = lbyStatue(stone); st.scale.setScalar(q[2] ? 1 : 3.4); st.position.set(K.x + q[0], 0, K.z + q[1]); if (q[2]) {
st.rotation.z = Math.PI / 2;
st.position.y = 1.2;
st.scale.setScalar(3);
} G.add(st); LBY.solids.push({ x: K.x + q[0], z: K.z + q[1], r: q[2] ? 4 : 2.4 }); });
var head = wSph(3, stone, K.x + 5, 2.4, K.z + 6, G, LBY.lite ? 10 : 18);
head.scale.set(0.9, 1.1, 1);
LBY.solids.push({ x: K.x + 5, z: K.z + 6, r: 3 });
wBox(3.4, 0.8, 1, lbySurf("wall", 0xC8A040, 0.5), K.x + 5, 5.4, K.z + 6, G).rotation.z = 0.3;
LBY_TRAPS.forEach(function (t) {
var x = lbyM(t[0]), z = lbyM(t[1]);
var tp = wBox(2.6, 0.05, 2.6, lbyC(0x5A4632), x, 0.07, z, G);
wBox(2.7, 0.06, 0.12, lbyC(0x2A2A2A), x, 0.1, z - 0.9, G);
wBox(2.7, 0.06, 0.12, lbyC(0x2A2A2A), x, 0.1, z + 0.9, G);
LBY.traps.push({ x: x, z: z });
});
},
function (mat) {
var g = new THREE.Group();
wBox(1.2, 0.5, 1.2, mat, 0, 0.25, 0, g);
wBox(0.7, 1.1, 0.45, mat, 0, 1.05, 0, g);
wBox(0.9, 1, 0.55, mat, 0, 2.05, 0, g);
wSph(0.32, mat, 0, 2.85, 0, g, 10);
wCone(0.36, 0.5, mat, 0, 3.25, 0, g, 8);
wBox(0.22, 1, 0.25, mat, -0.6, 2, 0, g);
wBox(0.22, 1, 0.25, mat, 0.6, 2, 0, g);
wBox(0.1, 1.6, 0.9, mat, 0.78, 1.6, 0.1, g);
wBox(0.08, 3.4, 0.08, mat, -0.8, 1.7, 0.3, g);
return g;
},
function (G) {
var q = LBY_QUERRA, stone = lbyC(0xA89C88), g = new THREE.Group();
g.position.set(q.x, 0, q.z);
G.add(g);
wBox(7, 1.2, 4, lbySurf("wall", 0xB8AC98, 0.5), 0, 0.6, 0, g);
var body = wSph(1.5, stone, 0, 2.1, 0, g, LBY.lite ? 10 : 18);
body.scale.set(1, 0.8, 2);
var chest = wSph(1.2, stone, 0, 2.6, -2, g, LBY.lite ? 10 : 16);
chest.scale.set(1, 1.1, 0.9);
var head = wSph(0.75, lbyC(0xB8AC98), 0, 3.9, -2.7, g, LBY.lite ? 10 : 16);
head.scale.set(0.9, 1.05, 0.9);
wBox(1.6, 1.2, 0.5, lbyC(0x8A7E6A), 0, 3.6, -2.3, g);
[-1, 1].forEach(function (k) {
var wing = wBox(0.2, 1.6, 3.4, lbyC(0x9A8E7A), k * 1.3, 3.2, 0.4, g);
wing.rotation.z = k * 0.5;
wing.rotation.x = -0.2;
for (var f = 0; f < 4; f++) {
var fe = wBox(0.15, 0.5, 1.4, lbyC(0x8A7E6A), k * (1.6 + f * 0.18), 3.9 + f * 0.2, 0.6 + f * 0.5, g);
fe.rotation.z = k * 0.6;
}
wCyl(0.32, 0.38, 1.6, stone, k * 0.8, 1.4, -2.8, g, 10);
wSph(0.3, stone, k * 0.8, 1.3, -3.6, g, 10);
var eye = wSph(0.08, lbyGlowM(0xF2C860), k * 0.26, 4.0, -3.35, g, 8);
});
var tail = wCyl(0.14, 0.2, 3, stone, 1.4, 1.4, 2.8, g, 8);
tail.rotation.x = 1.2;
tail.rotation.z = 0.4;
LBY.solids.push({ x: q.x, z: q.z, hw: 3.6, hd: 4.2 });
lbySign(["QUERRA'S COURT", "answer, and she will tell you where the Heart's way lies"], 5.6, 1.2, q.x, 6.2, q.z + 3, 0, G);
LBY.talk.push({ x: q.x, z: q.z - 5, r: 5, name: LBY_FOLK.querra.name, verb: "answer her riddle", fn: function () { lbyRiddleCard(); } });
},
function (G0) {
var G = new THREE.Group();
G.position.y = LBY_HEART_Y;
G.name = "lby-heart";
G0.add(G);
LBY.heartG = G;
var up = { solids: LBY.solids, floors: LBY.floors, spots: LBY.spots, talk: LBY.talk };
LBY.hsolids = [];
LBY.hfloors = [];
LBY.hspots = [];
LBY.htalk = [];
LBY.solids = LBY.hsolids;
LBY.floors = LBY.hfloors;
LBY.spots = LBY.hspots;
LBY.talk = LBY.htalk;
try {
lbyHollow(G);
lbyHeart(G);
}
finally {
LBY.solids = up.solids;
LBY.floors = up.floors;
LBY.spots = up.spots;
LBY.talk = up.talk;
}
if (typeof gwBake === "function")
try {
gwBake(G);
}
catch (e) { }
G.userData.keep = 1;
G.visible = false;
},
function (G) {
var lite = LBY.lite, R = wRand(1717), r = LBY_HEART_R + 8;
var fl = new THREE.Mesh(new THREE.CircleGeometry(r + 2, lite ? 32 : 64), lbySurf("plaza", 0xD8CCB4, r / 3, { ns: 1 }));
fl.rotation.x = -Math.PI / 2;
fl.position.y = 0.02;
G.add(fl);
var rock = lbySurf("wall", 0x8A7E6C, 0.25, { ns: 1.4, ds: 1 });
var wall = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 4, 22, lite ? 28 : 56, 1, true), rock);
wall.position.y = 11;
wall.material.side = THREE.DoubleSide;
G.add(wall);
var vault = new THREE.Mesh(new THREE.SphereGeometry(r, lite ? 24 : 48, lite ? 10 : 20, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x141A2A, side: THREE.BackSide, fog: false }));
vault.scale.y = 0.62;
vault.position.y = 21;
G.add(vault);
for (var i = 0; i < (lite ? 24 : 70); i++) {
var a = R() * Math.PI * 2, e = 0.2 + R() * 1.2, x = Math.cos(a) * Math.cos(e) * r * 0.97, z = Math.sin(a) * Math.cos(e) * r * 0.97, y = 21 + Math.sin(e) * r * 0.6;
wSph(0.18 + R() * 0.22, lbyGlowM([0xFFE8B0, 0xC8D8FF, 0xF0F0E0][i % 3]), x, y, z, G, 6);
}
for (var t = 0; t < (lite ? 8 : 22); t++) {
var ta = R() * Math.PI * 2, tr = 20 + R() * (r - 24), rt = wCyl(0.08, 0.35, 6 + R() * 10, lbyC(0x4A3A26), Math.cos(ta) * tr, 34 + R() * 6, Math.sin(ta) * tr, G, 5);
rt.rotation.z = (R() - 0.5) * 0.4;
}
for (var b = 0; b < (lite ? 10 : 24); b++) {
var ba = b / (lite ? 10 : 24) * Math.PI * 2, bx = Math.cos(ba) * (r - 3), bz = Math.sin(ba) * (r - 3);
var bl = wBox(4, 8 + R() * 8, 3, rock, bx, 4, bz, G);
bl.rotation.y = -ba;
}
var sx = 0, sz = LBY_HEART_R - 2;
for (var st = 0; st < 8; st++)
wBox(3, 0.4, 1, lbyC(0x6A6258), sx, 0.2 + st * 0.4, sz + st * 0.6, G);
lbyMarkMesh(G, sx, 5.2, sz + 6.2, 1.4).rotation.y = Math.PI;
lbySpot(sx, sz, 3, "The stair up", "climb (a very long way, back up to the Deep's Stair of the Mark)", function () { lbyToDeep("entry", "<b>Up, and up, and up.</b> The stair from the Heart comes out in the Stair of the Mark, in the Deep. Behind you the rock closes as if there had never been a way."); }, 0);
for (var l = 0; l < (lite ? 6 : 10); l++) {
var gl = wGlow(0xFFD8A0, 10, 0.22);
gl.position.set(Math.cos(l) * 30, 14, Math.sin(l) * 30);
G.add(gl);
}
},
function (G) {
var stone = lbySurf("wall", 0xE0D0B4, 0.5, { ns: 1 }), white = lbySurf("plaza", 0xF0E8DC, 0.6), R = wRand(1313);
var tx = 0, tz = -34;
lbyBox(11, 34, 11, stone, tx, 17, tz, G, true);
lbyBox(13, 1.2, 13, stone, tx, 34.6, tz, G, false);
var roof = wCone(9.4, 12, lbySurf("wall", 0x4A5868, 0.4), tx, 41.2, tz, G, 4);
roof.rotation.y = Math.PI / 4;
LBY.hands = [];
[[0, 5.62, 0], [0, -5.62, Math.PI], [5.62, 0, Math.PI / 2], [-5.62, 0, -Math.PI / 2]].forEach(function (f) {
var dial = new THREE.Mesh(new THREE.CircleGeometry(4.2, LBY.lite ? 24 : 48), new THREE.MeshLambertMaterial({ map: lbyDialTex() }));
dial.position.set(tx + f[0], 27, tz + f[1]);
dial.rotation.y = f[2];
G.add(dial);
var hg = new THREE.Group();
hg.position.copy(dial.position);
hg.rotation.y = f[2];
hg.userData.keep = 1;
G.add(hg);
var hh = new THREE.Group();
hg.add(hh);
wBox(0.3, 2.2, 0.08, lbyC(0x2A2018), 0, 1.1, 0.08, hh);
var mh = new THREE.Group();
hg.add(mh);
wBox(0.18, 3.4, 0.08, lbyC(0x2A2018), 0, 1.7, 0.12, mh);
LBY.hands.push({ h: hh, m: mh });
});
for (var w = 0; w < 4; w++) {
var a = w / 4 * Math.PI * 2;
wBox(1.4, 4, 0.2, lbyGlowM(0xFFE0A0), tx + Math.cos(a) * 5.62, 12, tz + Math.sin(a) * 5.62, G).rotation.y = -a + Math.PI / 2;
}
lbyBox(3, 4.4, 0.3, lbyC(0x3A2A1E), tx, 2.2, tz + 5.7, G, false);
var dx = 0, dz = 14;
for (var s = 0; s < 3; s++) {
lbyCylS(7 - s * 1.8, 0.5, white, dx, 0.25 + s * 0.5, dz, G, false, LBY.lite ? 16 : 32);
}
lbyFloorAt(dx, dz, 6.5, 6.5, 0.5);
lbyFloorAt(dx, dz, 4.6, 4.6, 1.0);
lbyFloorAt(dx, dz, 2.8, 2.8, 1.5);
wCyl(0.5, 0.7, 1.6, stone, dx, 2.3, dz, G, 12);
var cup = new THREE.Group();
cup.position.set(dx, 3.1, dz);
cup.userData.keep = 1;
G.add(cup);
var gold = new THREE.MeshPhongMaterial({ color: 0xE8B850, emissive: 0x7A5010, emissiveIntensity: 0.6, shininess: 90, specular: 0xFFF0C0 });
var bowl = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.12, 0], [0.12, 0.5], [0.5, 0.7], [0.62, 1.3], [0.58, 1.32], [0.5, 0.78], [0.1, 0.62], [0, 0.62]].map(function (p) { return new THREE.Vector2(p[0], p[1]); }), LBY.lite ? 14 : 28), gold);
cup.add(bowl);
[-1, 1].forEach(function (k) { var hd = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 6, 16, Math.PI), gold); hd.position.set(k * 0.64, 1.0, 0); hd.rotation.z = k * -Math.PI / 2; cup.add(hd); });
var flame = wSph(0.26, lbyGlowM(0xFFD890), 0, 1.2, 0, cup, 12);
flame.scale.y = 0.6;
var glow = wGlow(0xFFD890, 2.8, 0.28);
glow.position.set(0, 1.2, 0);
cup.add(glow);
if (!LBY.lite) {
var pl = new THREE.PointLight(0xFFD890, 1.2, 26, 2);
pl.position.set(0, 1.6, 0);
cup.add(pl);
}
LBY.cup = { g: cup, x: dx, z: dz };
LBY.solids.push({ x: dx, z: dz, r: 0.9, h: 3 });
lbySpot(dx, dz, 4, "The Lantern Cup", "touch the cup", function () { lbyCupCard(); });
[[-34, -2], [34, -2], [-34, 34], [34, 34]].forEach(function (p) {
lbyCylS(4, 0.8, white, p[0], 0.4, p[1], G, true, LBY.lite ? 14 : 28);
var water = new THREE.Mesh(new THREE.CircleGeometry(3.6, LBY.lite ? 14 : 28), new THREE.MeshPhongMaterial({ color: 0x6A9AB8, shininess: 80, specular: 0xFFFFFF, transparent: true, opacity: 0.85 }));
water.rotation.x = -Math.PI / 2;
water.position.set(p[0], 0.75, p[1]);
G.add(water);
wCyl(0.35, 0.5, 2.6, white, p[0], 1.9, p[1], G, 10);
wSph(0.7, white, p[0], 3.4, p[1], G, 12);
if (!LBY.lite)
for (var j = 0; j < 6; j++) {
var a = j / 6 * Math.PI * 2, jet = wCyl(0.04, 0.08, 1.2, lbyC(0xC8E0F0, { op: 0.5 }), p[0] + Math.cos(a) * 0.8, 3.5, p[1] + Math.sin(a) * 0.8, G, 5);
jet.rotation.z = Math.cos(a) * 0.6;
jet.rotation.x = -Math.sin(a) * 0.6;
}
});
for (var b = 0; b < 10; b++) {
var a2 = b / 10 * Math.PI * 2 + 0.3, bx = Math.cos(a2) * 48, bz = Math.sin(a2) * 48 + 4;
if (Math.abs(bx) < 8 && bz < -20)
continue;
lbyBench(G, bx, bz, -a2 - Math.PI / 2);
}
for (var l = 0; l < 12; l++) {
var al = l / 12 * Math.PI * 2;
lbyLamp(Math.cos(al) * 54, Math.sin(al) * 54, 3.6, 0xFFD490, G);
}
var soil = lbyC(0x3A2A1C), stem = lbyC(0x4A7A34), leaf = lbyC(0x3E6A2E);
[[-20, -30], [20, -30], [-40, 14], [40, 14], [-18, 40], [18, 40], [-42, -20], [42, -20]].forEach(function (bp, bi) {
if (Math.hypot(bp[0] - tx, bp[1] - tz) < 12 || Math.hypot(bp[0] - dx, bp[1] - dz) < 10)
return;
var col = [0xD84A6A, 0xF0C040, 0x8A5AD8, 0xF08A3A, 0xE8E8F0, 0xE85A9A][bi % 6];
lbyCylS(3.2, 0.4, white, bp[0], 0.2, bp[1], G, true, LBY.lite ? 14 : 24);
wCyl(2.9, 2.9, 0.06, soil, bp[0], 0.42, bp[1], G, LBY.lite ? 14 : 24);
var n = LBY.lite ? 10 : 26;
for (var f = 0; f < n; f++) {
var fa = R() * Math.PI * 2, fr = Math.sqrt(R()) * 2.5, fx = bp[0] + Math.cos(fa) * fr, fz = bp[1] + Math.sin(fa) * fr, fh = 0.35 + R() * 0.35;
if (!LBY.lite)
wCyl(0.025, 0.025, fh, stem, fx, 0.45 + fh / 2, fz, G, 4);
wSph(0.16, leaf, fx, 0.5, fz, G, 5).scale.y = 0.5;
var bl = wSph(0.14 + R() * 0.06, lbyC(col), fx, 0.45 + fh, fz, G, 6);
bl.scale.y = 0.7;
}
});
lbyPerson("clock", 8, -24, Math.PI, { wander: { r: 10, sp: 0.7 }, y: LBY_HEART_Y });
},
function (G) {
LBY.coreHalls = [];
LBY_CORE_HALLS.forEach(function (h) {
var p = { x: lbyM(lbyU(h[0])), z: lbyM(lbyU(h[1])) }, A = lbyAgeDef(h[2]), g = new THREE.Group();
G.add(g);
var pave = new THREE.Mesh(new THREE.PlaneGeometry(44, 44), lbySurf("plaza", 0xC8BEAC, 9, { ns: 1 }));
pave.rotation.x = -Math.PI / 2;
pave.position.set(p.x, 0.04, p.z);
g.add(pave);
try {
lbyRoomShell(p, A, g, [1, 1, 1, 1], 34, 9);
lbyAgeDress(h[2], A, p, g);
}
catch (e) {
if (window.console)
console.warn("[labyrinth] core hall", h[2], e);
}
if (h[3]) {
var hx = p.x + 10, hz = p.z - 10;
wBox(5, 0.3, 5, lbyC(0x1A1612), hx, 0.02, hz, g);
for (var st = 0; st < 5; st++)
wBox(3.6, 0.2, 0.7, lbyC(0x5A544C), hx, -0.1 - st * 0.12, hz - 1.6 + st * 0.7, g);
lbyMarkMesh(g, hx, 2.2, hz - 2.6, 1.2);
LBY.solids.push({ x: hx, z: hz, hw: 2.4, hd: 2.4, b: -6, h: 5.9 });
lbySpot(hx, hz + 3, 3.2, "A stair going down", "go down (into the Deep, Deadly)", function () { lbyToDeepFrom(p.x, p.z, "<b>Down the stair under the Maker's Mark.</b> It winds down through the roots and the old stone, and comes out at the edge of <b>the Deep</b>. It is Deadly here."); });
}
LBY.coreHalls.push({ x: p.x, z: p.z, name: A.name });
});
},
function (G) {
var I = LBY_IN.gatehouse, wall = lbySurf("wall", 0xE0D4C0, 0.4), floor = lbySurf("plaza", 0xB8A890, 0.3), wood = lbyC(0x5A3E28);
var x0 = I.x, z0 = I.z;
lbyFloorAt(x0, z0, 30, 20, 0.1);
lbyBox(60, 0.2, 40, floor, x0, 0, z0, G, false);
lbyBox(60, 0.4, 40, lbyC(0x3A3026), x0, 9, z0, G, false);
[[0, -20, 60, 0.6], [0, 20, 60, 0.6]].forEach(function (w) { lbyBox(w[2], 9, w[3], wall, x0 + w[0], 4.5, z0 + w[1], G, true); });
lbyBox(0.6, 9, 40, wall, x0 - 30, 4.5, z0, G, true);
lbyBox(0.6, 9, 40, wall, x0 + 30, 4.5, z0, G, true);
lbyBox(0.4, 9, 14, wall, x0 + 10, 4.5, z0 - 13, G, true);
lbyBox(0.4, 9, 14, wall, x0 - 10, 4.5, z0 - 13, G, true);
lbyBox(6, 9, 0.4, wall, x0 - 27, 4.5, z0 - 6, G, true);
lbyBox(6, 9, 0.4, wall, x0 - 13, 4.5, z0 - 6, G, true);
lbyBox(6, 9, 0.4, wall, x0 + 13, 4.5, z0 - 6, G, true);
lbyBox(6, 9, 0.4, wall, x0 + 27, 4.5, z0 - 6, G, true);
for (var c = 0; c < 4; c++)
wBox(7, 5, 0.3, lbyGlowM(0xE8D0A0), x0 - 21 + c * 14, 5, z0 - 19.6, G);
lbyRoomAt("the Hall of Maps", x0, z0 + 7, 30, 13, "inside");
lbyRoomAt("the Warden's office", x0 - 20, z0 - 13, 10, 7, "inside");
lbyRoomAt("lost property", x0 + 20, z0 - 13, 10, 7, "inside");
lbyRoomAt("the map room's alcove", x0, z0 - 13, 10, 7, "inside");
lbyBox(10, 1, 6, wood, x0, 0.9, z0 + 6, G, true);
var mapM = new THREE.Mesh(new THREE.PlaneGeometry(9.4, 5.4), new THREE.MeshBasicMaterial({ map: lbyMapTex(), fog: false }));
mapM.rotation.x = -Math.PI / 2;
mapM.position.set(x0, 1.42, z0 + 6);
G.add(mapM);
LBY.mapMesh = mapM;
lbySpot(x0, z0 + 6, 6, "The great map table", "read the map (the maze as it stands this minute)", function () { lbyMapCard(); });
for (var s = 0; s < 6; s++) {
lbyBox(4, 6, 0.8, wood, x0 - 25 + s * 10, 3, z0 + 18.8, G, true);
for (var r = 0; r < 5; r++)
wBox(3.6, 0.1, 0.7, lbyC(0xD8C8A0), x0 - 25 + s * 10, 1 + r * 1.1, z0 + 18.6, G);
}
for (var l = 0; l < 4; l++) {
var gl = wGlow(0xFFD490, 3, 0.5);
gl.position.set(x0 - 21 + l * 14, 7.6, z0 + 6);
G.add(gl);
}
lbyBox(3.4, 1, 1.6, wood, x0 - 20, 0.5, z0 - 14, G, true);
wBox(1.2, 0.6, 0.5, lbyC(0xC8A040), x0 - 20, 1.3, z0 - 14, G);
for (var k = 0; k < 8; k++) {
var cr = lbyBox(1.4, 1.2, 1.4, wood, x0 + 15 + (k % 4) * 2.6, 0.6 + ((k / 4) | 0) * 1.2, z0 - 17, G, (k < 4));
}
lbySpot(x0 + 20, z0 - 13, 5, "Lost property", "look through what the maze gave back", function () { lbyLostCard(); });
lbyPerson("warden", x0 - 20, z0 - 11.5, Math.PI);
wBox(3, 4.2, 0.2, lbyC(0x3A2A1E), x0 - 29.6, 2.1, z0 + 6, G).rotation.y = Math.PI / 2;
lbySpot(x0 - 28, z0 + 6, 3, "The door", "go back out to the court", function () { lbyOut("gatehouse"); });
var S = LBY_IN.stairs, sw = lbySurf("wall", 0xC8B8D8, 0.4, { ns: 1.2 }), sf = lbySurf("plaza", 0xD0C8D8, 0.4), x1 = S.x, z1 = S.z;
lbyBox(70, 0.2, 70, sf, x1, 0, z1, G, false);
lbyFloorAt(x1, z1, 35, 35, 0.1);
lbyBox(70, 0.4, 70, lbyC(0x2A2234), x1, 50, z1, G, false);
[[0, -35, 70, 0.8], [0, 35, 70, 0.8]].forEach(function (w) { lbyBox(w[2], 50, w[3], sw, x1 + w[0], 25, z1 + w[1], G, true); });
lbyBox(0.8, 50, 70, sw, x1 - 35, 25, z1, G, true);
lbyBox(0.8, 50, 70, sw, x1 + 35, 25, z1, G, true);
var R = wRand(4242), stepM = lbySurf("plaza", 0xE0D8E8, 0.5);
for (var f = 0; f < (LBY.lite ? 14 : 34); f++) {
var fl = new THREE.Group(), n = 8 + ((R() * 6) | 0);
for (var st = 0; st < n; st++)
wBox(3, 0.3, 0.9, stepM, 0, st * 0.4, st * 0.8, fl);
wBox(0.2, n * 0.4 + 1, n * 0.8, lbyC(0x6A5A7A), 1.6, n * 0.2, n * 0.4, fl);
wBox(0.2, n * 0.4 + 1, n * 0.8, lbyC(0x6A5A7A), -1.6, n * 0.2, n * 0.4, fl);
fl.position.set(x1 + (R() - 0.5) * 60, 6 + R() * 40, z1 + (R() - 0.5) * 60);
fl.rotation.set((R() < 0.3 ? Math.PI : 0) + (R() - 0.5) * 0.4, R() * Math.PI * 2, (R() < 0.3 ? Math.PI / 2 : 0) + (R() - 0.5) * 0.3);
G.add(fl);
}
for (var dl = 0; dl < 6; dl++) {
var gl2 = wGlow(0xD8C8FF, 6, 0.35);
gl2.position.set(x1 + (R() - 0.5) * 50, 10 + R() * 34, z1 + (R() - 0.5) * 50);
G.add(gl2);
}
LBY.landings = [];
[[0, 0, 0], [-18, -14, 8], [16, -20, 16], [20, 14, 24], [-12, 18, 32], [0, 0, 42]].forEach(function (L, i) {
var lx = x1 + L[0], lz = z1 + L[1], ly = L[2];
if (i) {
lbyBox(10, 0.6, 10, stepM, lx, ly - 0.3, lz, G, false);
lbyFloorAt(lx, lz, 5, 5, ly);
for (var e = 0; e < 4; e++) {
var ea = e / 4 * Math.PI * 2;
wBox(e % 2 ? 0.2 : 10, 1.1, e % 2 ? 10 : 0.2, lbyC(0x4A3A5A), lx + Math.cos(ea) * 5, ly + 0.55, lz + Math.sin(ea) * 5, G);
}
}
var glow = wBox(2.6, 0.12, 1.2, lbyGlowM(0xC8B0FF), lx + (i ? 2.6 : 6), ly + 0.08, lz, G);
LBY.landings.push({ x: lx, z: lz, y: ly });
if (i < 5)
lbySpot(lx + (i ? 2.6 : 6), lz, 1.8, "A turned stair", "step onto it", function () { lbyTurnStair(i + 1); }, ly);
});
var top = LBY.landings[5];
wBox(3, 4, 0.3, lbyC(0x2A2030), top.x, top.y + 2, top.z - 4.8, G);
lbyMarkMesh(G, top.x, top.y + 4.6, top.z - 4.6, 1.2);
lbySpot(top.x, top.z - 3.6, 2.6, "The door at the top", "go through (it opens somewhere in the maze)", function () { lbyStairsTop(); }, top.y);
lbySpot(top.x, top.z + 3, 2.6, "A turned stair down", "step onto it (back to the floor)", function () { lbyTurnStair(0); }, top.y);
wBox(4, 6, 0.3, lbyC(0x2A2030), x1, 3, z1 + 34.5, G);
lbySpot(x1, z1 + 33, 3, "The door", "go back out to the maze", function () { lbyOut("stairs"); });
lbyRoomAt("the Hall of Turned Stairs", x1, z1, 35, 35, "inside");
},
function () {
var cv = LBY.mapCv;
if (!cv || !LBY.grid)
return;
var x = cv.getContext("2d"), W = cv.width, N = LBY.N, px = W / N, G = LBY.grid, mine = LBY.master && LBY.master.mine;
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, W, W);
for (var i = 0; i < N; i++)
for (var j = 0; j < N; j++) {
var k = i * N + j, kd = G.kind[k];
if (kd === 3 || (kd !== 2 && lbyMatAt(i, j) === "hedge")) {
if (mine && G.wall[k]) {
x.fillStyle = "#3E6A30";
x.fillRect(i * px, j * px, Math.ceil(px), Math.ceil(px));
}
else if (!mine && ((i >> 2) + (j >> 2)) % 2 === 0) {
x.fillStyle = "rgba(140,168,128,.55)";
x.fillRect(i * px, j * px, Math.ceil(px), Math.ceil(px));
}
continue;
}
if (G.wall[k] || G.seem[k]) {
x.fillStyle = "#5A4632";
x.fillRect(i * px, j * px, Math.ceil(px), Math.ceil(px));
}
}
x.fillStyle = "rgba(60,70,50,.7)";
x.font = "italic " + Math.round(W / 46) + "px Georgia";
x.textAlign = "center";
x.fillText(mine ? "the whole maze, as the Master sees it" : "(the green is living: never the same twice)", W / 2, W - W / 40);
x.fillStyle = "#A83A2A";
x.beginPath();
x.arc((151 + 0.5) * px, (300 + 0.5) * px, W / 90, 0, 7);
x.fill();
if (LBY.mapTex)
LBY.mapTex.needsUpdate = true;
},
function (G0) {
var G = new THREE.Group();
G.position.y = LBY_DEEP_Y;
G.name = "lby-deep";
G0.add(G);
LBY.deepG = G;
var up = { solids: LBY.solids, floors: LBY.floors, spots: LBY.spots, talk: LBY.talk };
LBY.dsolids = [];
LBY.dfloors = [];
LBY.dspots = [];
LBY.dtalk = [];
LBY.solids = LBY.dsolids;
LBY.floors = LBY.dfloors;
LBY.spots = LBY.dspots;
LBY.talk = LBY.dtalk;
try {
lbyDeepRooms(G);
}
finally {
LBY.solids = up.solids;
LBY.floors = up.floors;
LBY.spots = up.spots;
LBY.talk = up.talk;
}
},
function (p, A, g, doors, size, h) {
var half = size / 2, dw = 6, fm = lbySurf("plaza", A.floor, size / 5), wm = A.brick && typeof texOf === "function" ? lbyBrickM(A.wall) : lbySurf("wall", A.wall, 0.35, { ns: 0.9 }), cm = lbyC(A.trim);
wBox(size, 0.3, size, fm, p.x, -0.15, p.z, g);
wBox(size, 0.4, size, lbyC(lbyDim(A.wall, 0.45)), p.x, h + 0.2, p.z, g);
[[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(function (d, di) {
var along = d[1] !== 0, wx = p.x + d[0] * half, wz = p.z + d[1] * half;
if (!doors[di]) {
lbyBox(along ? size : 0.8, h, along ? 0.8 : size, wm, wx, h / 2, wz, g, true);
return;
}
var seg = (size - dw) / 2;
[-1, 1].forEach(function (k) { var ox = along ? k * (dw / 2 + seg / 2) : 0, oz = along ? 0 : k * (dw / 2 + seg / 2); lbyBox(along ? seg : 0.8, h, along ? 0.8 : seg, wm, wx + ox, h / 2, wz + oz, g, true); });
lbyBox(along ? dw : 0.8, h - 4.6, along ? 0.8 : dw, wm, wx, 4.6 + (h - 4.6) / 2, wz, g, false);
wBox(along ? dw + 0.8 : 0.5, 0.5, along ? 0.5 : dw + 0.8, cm, wx, 4.5, wz, g);
});
[[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(function (d) { var along = d[1] !== 0; wBox(along ? size : 0.3, 0.5, along ? 0.3 : size, cm, p.x + d[0] * (half - 0.5), 0.25, p.z + d[1] * (half - 0.5), g); });
for (var l = 0; l < 4; l++) {
var a = l / 4 * Math.PI * 2 + Math.PI / 4, lx = p.x + Math.cos(a) * (half - 1.2), lz = p.z + Math.sin(a) * (half - 1.2);
wBox(0.5, 0.7, 0.5, lbyGlowM(A.light), lx, 5.6, lz, g);
var gl = wGlow(A.light, 4.4, 0.55);
gl.position.set(lx, 5.6, lz);
g.add(gl);
}
},
function (G) {
var D = LBY_DEEP, n = D.n, half = D.room / 2, h = D.h, dw = 6;
LBY.deepRooms = [];
LBY.deepDoors = {};
LBY.walk = [];
for (var r = 0; r < n; r++)
for (var c = 0; c < n; c++) {
var p = lbyDeepRoomXZ(r, c), age = lbyDeepAge(r, c), A = lbyAgeDef(age), g = new THREE.Group();
G.add(g);
lbyRoomShell(p, A, g, [r > 0, r < n - 1, c > 0, c < n - 1], D.room, h);
LBY.walk.push({ x: p.x, z: p.z, hw: half - 0.3, hd: half - 0.3 });
lbyRoomAt(lbyAgeName(age), p.x, p.z, half, half, "deep");
try {
lbyAgeDress(age, A, p, g);
}
catch (e) {
if (window.console)
console.warn("[labyrinth] room", age, e);
}
var ls = LBY_DEEP_LONG.filter(function (q) { return q[0] === r && q[1] === c; })[0];
if (ls)
lbyLongStair(g, p, ls);
LBY.deepRooms.push({ r: r, c: c, x: p.x, z: p.z, g: g, age: age });
}
var PG = new THREE.Group();
G.add(PG);
LBY.deepPass = PG;
for (var r2 = 0; r2 < n; r2++)
for (var c2 = 0; c2 < n; c2++) {
[[0, 1, "e"], [1, 0, "s"]].forEach(function (q) {
var r3 = r2 + q[0], c3 = c2 + q[1];
if (r3 >= n || c3 >= n)
return;
var a = lbyDeepRoomXZ(r2, c2), b = lbyDeepRoomXZ(r3, c3), along = q[2] === "s", mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2, g = PG;
var len = D.gap + 1.6, wm = lbySurf("wall", 0x8A8478, 0.35, { ns: 0.9 });
wBox(along ? dw : len, 0.3, along ? len : dw, lbySurf("plaza", 0x8A8478, 2), mx, -0.15, mz, g);
wBox(along ? dw + 1.6 : len, 0.4, along ? len : dw + 1.6, lbyC(0x3A3632), mx, 4.8, mz, g);
[-1, 1].forEach(function (k) { lbyBox(along ? 0.8 : len, 4.6, along ? len : 0.8, wm, mx + (along ? k * (dw / 2 + 0.4) : 0), 2.3, mz + (along ? 0 : k * (dw / 2 + 0.4)), g, true); });
var gl = wGlow(0xC8B898, 3, 0.4);
gl.position.set(mx, 4, mz);
g.add(gl);
LBY.walk.push({ x: mx, z: mz, hw: along ? dw / 2 - 0.3 : len / 2 + 0.6, hd: along ? len / 2 + 0.6 : dw / 2 - 0.3 });
var key = r2 + "," + c2 + q[2], seals = new THREE.Group();
seals.userData.keep = 1;
G.add(seals);
var sm = lbySurf("wall", 0x5A5048, 0.4);
[-1, 1].forEach(function (k) {
var sx = mx + (along ? 0 : k * (len / 2 - 0.6)), sz = mz + (along ? k * (len / 2 - 0.6) : 0);
wBox(along ? dw : 0.7, 4.6, along ? 0.7 : dw, sm, sx, 2.3, sz, seals);
lbyMarkMesh(seals, sx + (along ? 0 : -k * 0.37), 2.6, sz + (along ? -k * 0.37 : 0), 1.2).rotation.y = along ? (k > 0 ? Math.PI : 0) : (k > 0 ? -Math.PI / 2 : Math.PI / 2);
});
LBY.deepDoors[key] = { g: seals, x: mx, z: mz, hw: along ? dw / 2 : len / 2, hd: along ? len / 2 : dw / 2, open: true };
});
}
lbyHeartWayBuild(G);
lbyDeepApply(false);
LBY.deepRooms.forEach(function (R) { if (typeof gwBake === "function")
try {
gwBake(R.g);
}
catch (e) { } R.g.userData.keep = 1; });
if (typeof gwBake === "function")
try {
gwBake(PG);
}
catch (e) { }
PG.userData.keep = 1;
},
function (age) {
for (var i = 0; i < LBY_AGES.length; i++)
if (LBY_AGES[i].k === age)
return LBY_AGES[i];
var F = { oubliette: { k: "oubliette", name: "the Oubliette", floor: 0x3A3632, wall: 0x4A4440, trim: 0x2A2622, light: 0xA8A090 },
workshop: { k: "workshop", name: "the Artificer's Workshop", floor: 0x6A5034, wall: 0x8A7458, trim: 0xC89A4A, light: 0xFFD8A0 },
slow: { k: "slow", name: "the Slow Room, where time goes strangely", floor: 0x3A3A5A, wall: 0x4A4A6A, trim: 0xA8A0E0, light: 0xC8C0FF },
entry: { k: "entry", name: "the Stair of the Mark", floor: 0x8A8070, wall: 0x9A9080, trim: 0x4A6A9A, light: 0xC8D8FF },
heartway: { k: "heartway", name: "the Hall of Echoes", floor: 0x6A6A70, wall: 0x7A7A82, trim: 0x9AA8C8, light: 0xD8E0FF } };
return F[age] || LBY_AGES[0];
},
function (age, A, p, g) {
var R = wRand(lbyHash(Math.round(p.x * 7 + p.z * 13))), lite = LBY.lite, x = p.x, z = p.z, trim = lbyC(A.trim), wallC = lbyC(A.wall), stoneW = lbySurf("plaza", 0xE8E4D8, 0.5);
function col(cx, cz, r, ht, m) { lbyCylS(r, ht, m || stoneW, cx, ht / 2, cz, g, true, lite ? 8 : 14); wBox(r * 2.6, 0.4, r * 2.6, m || stoneW, cx, ht - 0.2, cz, g); wBox(r * 2.6, 0.4, r * 2.6, m || stoneW, cx, 0.2, cz, g); }
if (A.water === 1) {
var pool = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshPhongMaterial({ color: age === "sewer" ? 0x3A4A3A : 0x4A8AA8, shininess: 80, specular: 0xFFFFFF, transparent: true, opacity: 0.88 }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(x, 0.05, z);
g.add(pool);
wBox(15, 0.5, 0.6, trim, x, 0.25, z - 5.3, g);
wBox(15, 0.5, 0.6, trim, x, 0.25, z + 5.3, g);
LBY.solids.push({ x: x, z: z, hw: 7, hd: 5 });
}
if (age === "bath") {
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
col(x + Math.cos(a) * 11, z + Math.sin(a) * 11, 0.6, 8.4);
}
}
if (A.cols) {
for (var i2 = -1; i2 <= 1; i2++)
for (var j2 = -1; j2 <= 1; j2++)
if (i2 || j2)
col(x + i2 * 9, z + j2 * 9, 0.75, 8.4);
var st = lbyStatue(stoneW);
st.scale.setScalar(1.6);
st.position.set(x, 0, z);
g.add(st);
LBY.solids.push({ x: x, z: z, r: 1.2 });
}
if (A.fresco) {
var ft = lbyFrescoTex();
[[0, -1], [0, 1]].forEach(function (d) { var m = new THREE.Mesh(new THREE.PlaneGeometry(20, 4), new THREE.MeshLambertMaterial({ map: ft })); m.position.set(x, 4, z + d[1] * 16.55); m.rotation.y = d[1] > 0 ? Math.PI : 0; g.add(m); });
for (var i3 = 0; i3 < 4; i3++) {
var cx = x + (i3 % 2 ? 8 : -8), cz = z + (i3 < 2 ? 8 : -8);
lbyCylS(0.7, 8.4, lbyC(0xA83A2A), cx, 4.2, cz, g, true, lite ? 8 : 12);
wBox(1.8, 0.6, 1.8, lbyC(0x2A2A2A), cx, 8.4, cz, g);
}
}
if (A.tombs) {
for (var t = 0; t < 8; t++) {
var tx = x - 12 + (t % 4) * 8, tz = z + (t < 4 ? -8 : 8);
lbyBox(2.2, 1.1, 4.2, lbyC(0x5A5650), tx, 0.55, tz, g, true);
wBox(2.5, 0.25, 4.5, lbyC(0x4A4640), tx, 1.2, tz, g);
var cnd = wGlow(0xFFC880, 1.4, 0.6);
cnd.position.set(tx + 0.9, 1.6, tz - 1.8);
g.add(cnd);
}
}
if (age === "sewer") {
wBox(32, 0.1, 2, lbyC(0x2A3020), x, 0.02, z + 12, g);
}
if (A.gears) {
for (var q = 0; q < (lite ? 3 : 6); q++) {
var gr = new THREE.Mesh(new THREE.TorusGeometry(2 + R() * 1.6, 0.35, 6, lite ? 12 : 24), lbyC(0xB8863A, { shine: 60 }));
gr.position.set(x - 12 + q * 5, 3 + R() * 3, z - 15.8);
gr.userData.keep = 1;
g.add(gr);
LBY.fx.push({ m: gr, k: "gear", sp: (R() < 0.5 ? -1 : 1) * (0.2 + R() * 0.3) });
for (var tk = 0; tk < 8; tk++) {
var tb = wBox(0.5, 0.6, 0.5, lbyC(0xB8863A), Math.cos(tk / 8 * 6.28) * (gr.geometry.parameters.radius + 0.4), Math.sin(tk / 8 * 6.28) * (gr.geometry.parameters.radius + 0.4), 0, gr);
tb.rotation.z = tk / 8 * 6.28;
}
}
for (var fu = 0; fu < 2; fu++) {
lbyBox(4, 4, 4, lbyC(0x3A3632), x + (fu ? 10 : -10), 2, z + 10, g, true);
wBox(2, 1.4, 0.1, lbyGlowM(0xFF8A3A), x + (fu ? 10 : -10), 1.6, z + 7.95, g);
var fg = wGlow(0xFF9A4A, 4, 0.45);
fg.position.set(x + (fu ? 10 : -10), 1.8, z + 7.6);
g.add(fg);
}
}
if (A.tiles) {
var pit = wBox(34, 0.2, 5, lbyC(0x2A2A28), x, -0.05, z + 12, g);
LBY.solids.push({ x: x - 10.5, z: z + 12, hw: 6.5, hd: 2.5 }, { x: x + 10.5, z: z + 12, hw: 6.5, hd: 2.5 });
wBox(4, 0.3, 5.6, lbyC(0x5A4632), x, 0.12, z + 12, g);
[-1, 1].forEach(function (k) { wBox(0.12, 1, 5.6, lbyC(0x6A6A6E, { shine: 50 }), x + k * 2, 0.7, z + 12, g); LBY.solids.push({ x: x + k * 2, z: z + 12, hw: 0.06, hd: 2.8 }); });
lbyFloorAt(x, z + 12, 2, 2.8, 0.27);
[-1, 1].forEach(function (k) { wBox(34, 0.15, 0.15, lbyC(0x6A6A6E, { shine: 60 }), x, 0.1, z + 12 + k * 0.75, g); });
lbySign(["LINE CLOSED", "no trains will call here"], 4, 1, x, 4.5, z + 16.4, Math.PI, g);
for (var bb = 0; bb < 3; bb++)
lbyBench(g, x - 10 + bb * 10, z + 6, Math.PI);
}
if (A.pillars) {
for (var pi = -1; pi <= 1; pi += 2)
for (var pj = -1; pj <= 1; pj += 2)
lbyBox(1.2, 9, 1.2, lbyC(0x9A9A96), x + pi * 8, 4.5, z + pj * 8, g, true);
for (var ln = -3; ln <= 3; ln++)
wBox(0.15, 0.02, 5, lbyC(0xE8D84A), x + ln * 4, 0.02, z - 11, g);
for (var car = 0; car < 2; car++) {
var cxp = x - 6 + car * 12;
lbyBox(2, 1.2, 4.4, lbyC(car ? 0x6A3A2A : 0x2A4A5A, { shine: 30 }), cxp, 0.8, z - 11, g, true);
wBox(1.8, 0.7, 2.2, lbyC(0x1A1A20, { op: 0.8 }), cxp, 1.7, z - 11.2, g);
}
}
if (A.shelves) {
for (var sh = 0; sh < 6; sh++) {
var sx = x - 14 + sh * 5.6;
lbyBox(1, 6, 8, lbyC(0x4A3020), sx, 3, z, g, true);
for (var rr = 0; rr < (lite ? 3 : 6); rr++) {
var sc = wCyl(0.12, 0.12, 7.6, lbyC(0xE8D8B0), sx, 0.9 + rr * 0.9, z, g, 6);
sc.rotation.x = Math.PI / 2;
}
}
}
if (A.plants) {
var sky = new THREE.Mesh(new THREE.PlaneGeometry(33, 33), wB(0x8AB8E8));
sky.rotation.x = Math.PI / 2;
sky.position.set(x, h_(), z);
g.add(sky);
for (var pl = 0; pl < (lite ? 10 : 26); pl++) {
var px = x + (R() - 0.5) * 28, pz = z + (R() - 0.5) * 28;
if (Math.hypot(px - x, pz - z) < 4)
continue;
wSph(0.6 + R() * 0.8, lbyC([0x4A8A3A, 0x5A9A4A, 0x3A7A3A][pl % 3]), px, 0.6, pz, g, lite ? 6 : 10);
if (R() < 0.4)
wSph(0.25, lbyC(0xF08AA8), px, 1.3, pz, g, 6);
}
lbyCylS(2.2, 0.7, stoneW, x, 0.35, z, g, true);
}
if (A.water === 2) {
var riv = new THREE.Mesh(new THREE.PlaneGeometry(6, 28), new THREE.MeshPhongMaterial({ color: 0x101820, shininess: 90, specular: 0x8AA0C0 }));
riv.rotation.x = -Math.PI / 2;
riv.position.set(x, 0.04, z);
g.add(riv);
[-1, 1].forEach(function (k) { wBox(6.8, 0.5, 0.5, lbyC(0x3A3632), x, 0.25, z + k * 14.2, g); for (var gb = 0; gb < 7; gb++)
wBox(0.08, 0.9, 0.12, lbyC(0x2A2826, { shine: 40 }), x - 2.7 + gb * 0.9, 0.7, z + k * 14.2, g); });
LBY.solids.push({ x: x, z: z - 8, hw: 3, hd: 6 }, { x: x, z: z + 8, hw: 3, hd: 6 });
wBox(7.4, 0.4, 4, lbyC(0x5A4A3A), x, 0.4, z, g);
lbyFloorAt(x, z, 3.7, 2, 0.6);
}
if (A.props) {
for (var pr = 0; pr < 6; pr++) {
var pzp = z - 14 + pr * 5.6;
lbyBox(0.4, 8.4, 0.4, lbyC(0x6A4A2A), x - 15, 4.2, pzp, g, true);
lbyBox(0.4, 8.4, 0.4, lbyC(0x6A4A2A), x + 15, 4.2, pzp, g, true);
wBox(30.8, 0.4, 0.4, lbyC(0x6A4A2A), x, 8.2, pzp, g);
}
lbyBox(1.4, 1, 2.2, lbyC(0x4A4440), x + 3, 0.7, z + 2, g, true);
}
if (A.roots) {
var P = lbyPieces(), hm = lbyWallMats().hedge, sm = lbyWallMats().stone;
for (var hb = 0; hb < (lite ? 5 : 9); hb++) {
var bx2 = x + (R() - 0.5) * 24, bz2 = z + (R() - 0.5) * 24;
if (Math.abs(bx2 - x) < 5 && Math.abs(bz2 - z) < 5)
continue;
var bush = new THREE.Mesh(P.hedge, hm);
bush.scale.set(0.8 + R() * 0.6, 0.3 + R() * 0.5, 0.8 + R() * 0.6);
bush.position.set(bx2, 0, bz2);
bush.rotation.y = R() * 3;
g.add(bush);
LBY.solids.push({ x: bx2, z: bz2, r: 1.6 });
}
for (var fs = 0; fs < (lite ? 3 : 6); fs++) {
var fx2 = x + (R() - 0.5) * 26, fz2 = z + (R() - 0.5) * 26, sb = new THREE.Mesh(P.stone, sm);
sb.scale.set(0.9, 0.22 + R() * 0.2, 0.9);
sb.position.set(fx2, 0, fz2);
sb.rotation.set(0, R() * 3, (R() - 0.5) * 0.3);
g.add(sb);
}
for (var rt = 0; rt < (lite ? 6 : 14); rt++) {
var rr2 = wCyl(0.06, 0.22, 2 + R() * 4, lbyC(0x4A3A26), x + (R() - 0.5) * 30, LBY_DEEP.h - 2, z + (R() - 0.5) * 30, g, 5);
rr2.rotation.z = (R() - 0.5) * 0.5;
}
}
if (age === "oubliette") {
var lad = new THREE.Group();
lad.position.set(x, 0, z - 15.6);
g.add(lad);
[-0.5, 0.5].forEach(function (k) { wBox(0.12, 9, 0.12, lbyC(0x5A4632), k, 4.5, 0, lad); });
for (var rg = 0; rg < 14; rg++)
wBox(1, 0.08, 0.08, lbyC(0x5A4632), 0, 0.5 + rg * 0.6, 0, lad);
var shaft = wGlow(0xC8D0E0, 5, 0.3);
shaft.position.set(x, 8.6, z - 15);
g.add(shaft);
lbySign(["THE OUBLIETTE", "a place for forgetting"], 4, 1, x, 5.6, z - 16.2, 0, g);
lbySpot(x, z - 14, 2.8, "The ladder", "climb up (a long chimney, up into the maze)", function () { var q = lbyRandomStone(false); lbyMove(q.x, q.z, Math.random() * 6.28, "You climb a long, long way up a crooked chimney and push up a stone: <b>you are somewhere in the maze</b>, blinking.", 0); });
for (var bo = 0; bo < (lite ? 4 : 10); bo++) {
var bn = wCyl(0.05, 0.05, 0.6, lbyC(0xD8D0C0), x + (R() - 0.5) * 20, 0.05, z + (R() - 0.5) * 20, g, 5);
bn.rotation.z = Math.PI / 2;
bn.rotation.y = R() * 3;
}
}
if (age === "workshop") {
for (var wb = 0; wb < 3; wb++)
lbyBox(6, 1, 2, lbyC(0x5A3E28), x - 9 + wb * 9, 0.9, z + 8, g, true);
var head = new THREE.Group();
head.position.set(x, 1.4, z + 8);
g.add(head);
wSph(0.5, lbyC(0xC89A4A, { shine: 80 }), 0, 0.6, 0, head, 14);
wBox(0.5, 0.12, 0.1, lbyC(0x2A2018), 0, 0.45, 0.45, head);
[-1, 1].forEach(function (k) { wSph(0.08, lbyGlowM(0x9AD8FF), k * 0.18, 0.7, 0.44, head, 8); });
[-1, 1].forEach(function (k) {
var wg = new THREE.Group();
wg.position.set(x + k * 3, 5, z - 16.3);
g.add(wg);
for (var fe = 0; fe < 9; fe++) {
var f = wBox(0.3, 3.2 - fe * 0.22, 0.06, lbyC(fe % 2 ? 0xE8E0D0 : 0xC8B898), k * (0.4 + fe * 0.42), -fe * 0.1, 0, wg);
f.rotation.z = k * (0.2 + fe * 0.09);
}
});
for (var au = 0; au < 3; au++) {
var at = lbyStatue(lbyC(0x8A6A3A, { shine: 60 }));
at.position.set(x - 12 + au * 4, 0, z - 10);
at.rotation.y = 0.4;
g.add(at);
LBY.solids.push({ x: x - 12 + au * 4, z: z - 10, r: 0.9 });
}
LBY.talk.push({ x: x, z: z + 6, r: 3.4, name: LBY_FOLK.artificer.name, t: { name: LBY_FOLK.artificer.name, persona: LBY_FOLK.artificer.persona, greet: LBY_FOLK.artificer.greet } });
}
if (age === "slow") {
var big = new THREE.Mesh(new THREE.CircleGeometry(5, lite ? 24 : 48), new THREE.MeshLambertMaterial({ map: lbyDialTex() }));
big.position.set(x, 4.6, z - 16.4);
g.add(big);
var sh2 = new THREE.Group();
sh2.position.set(x, 4.6, z - 16.3);
sh2.userData.keep = 1;
g.add(sh2);
wBox(0.16, 4, 0.06, lbyC(0x1A1830), 0, 2, 0, sh2);
LBY.fx.push({ m: sh2, k: "slowhand" });
for (var hg = 0; hg < 5; hg++) {
var hgx = x - 10 + hg * 5;
lbyCylS(0.7, 2.6, lbyC(0x5A4A3A), hgx, 1.3, z + 6, g, true, 8);
var sand = wCone(0.5, 0.9, lbyC(0xE8C880), hgx, 1.6, z + 6, g, 8);
sand.rotation.x = Math.PI;
}
LBY.slowRoom = { x: x, z: z };
}
if (age === "entry") {
for (var sp = 0; sp < 10; sp++)
lbyBox(6, 0.4, 1.4, lbyC(0x9A9080), x, 0.2 + sp * 0.45, z - 10 - sp * 0.6, g, false);
lbyMarkMesh(g, x, 6, z - 16.4, 2.4);
lbySign(["THE STAIR OF THE MARK", "up to the Gatehouse Court"], 4, 1, x, 7.8, z - 16.3, 0, g);
lbySpot(x, z - 11, 3.4, "The Stair of the Mark", "climb to the Gatehouse Court", function () { lbyToCourt("Up and up, round and round: you come out through the Way Home's door into the Gatehouse Court."); });
LBY.deepEntry = { x: x, z: z + 6 };
}
if (age === "heartway") {
for (var ec = 0; ec < 6; ec++) {
var ea = ec / 6 * Math.PI * 2;
col(x + Math.cos(ea) * 12, z + Math.sin(ea) * 12, 0.9, 8.4, lbyC(0x8A8A92));
}
lbySign(["THE HALL OF ECHOES", "say something, and wait"], 4, 1, x, 5.6, z - 16.3, 0, g);
lbySpot(x, z, 4, "The middle of the hall", "call out", function () { setStatus("You call out. A moment later your own voice answers from every side at once, and then, very faintly, from somewhere under your feet, a voice that is not yours: <i>\"deeper\"</i>."); });
}
function h_() { return LBY_DEEP.h - 0.05; }
},
function () {
if (LBY_FRESCO)
return LBY_FRESCO;
LBY_FRESCO = wTex(512, 102, function (x, W, H) {
x.fillStyle = "#E8D0A0";
x.fillRect(0, 0, W, H);
x.fillStyle = "#2A4A8A";
x.fillRect(0, H - 12, W, 12);
x.fillRect(0, 0, W, 8);
for (var i = 0; i < 3; i++) {
var bx = 60 + i * 170;
x.fillStyle = "#7A3A22";
x.beginPath();
x.ellipse(bx, 58, 46, 20, 0, 0, 7);
x.fill();
x.fillRect(bx - 40, 62, 8, 26);
x.fillRect(bx + 30, 62, 8, 26);
x.beginPath();
x.moveTo(bx + 40, 46);
x.lineTo(bx + 60, 30);
x.lineTo(bx + 52, 50);
x.fill();
x.fillStyle = "#C86A3A";
x.save();
x.translate(bx, 26);
x.rotate(-0.6 + i * 0.4);
x.fillRect(-4, -14, 8, 28);
x.beginPath();
x.arc(0, -18, 6, 0, 7);
x.fill();
x.restore();
}
});
return LBY_FRESCO;
},
function (say) {
var ep = lbyEpoch(LBY_DEEP_EVERY), open = lbyDeepDoors(ep), changed = 0;
LBY.deepEp = ep;
lbyHeartWayPlace(ep);
Object.keys(LBY.deepDoors).forEach(function (k) { var d = LBY.deepDoors[k], o = !!open[k]; if (d.open !== o) {
d.open = o;
changed++;
} });
if (say && changed && LBY.zone === "deep")
setStatus("🌀 <b>Somewhere in the Deep, stone grinds on stone.</b> Doors that were open are sealed now, and others stand open that were not.");
},
function (L) {
var here = lbyDeepRoomAt(L.x, L.z), deep = LBY.zone === "deep";
(LBY.deepRooms || []).forEach(function (R) { var on = deep && here && Math.abs(R.r - here.r) <= 1 && Math.abs(R.c - here.c) <= 1; if (R.g.visible !== on)
R.g.visible = on; });
if (LBY.deepPass && LBY.deepPass.visible !== deep)
LBY.deepPass.visible = deep;
for (var k in LBY.deepDoors) {
var d = LBY.deepDoors[k], on2 = deep && !d.open && Math.abs(d.x - L.x) < 80 && Math.abs(d.z - L.z) < 80;
if (d.g.visible !== on2)
d.g.visible = on2;
}
},
function (G) {
var g = new THREE.Group();
g.name = "lby-heartway";
g.userData.keep = 1;
G.add(g);
wCyl(1.5, 1.5, 0.08, lbyC(0x5E584E), 0, 0.04, 0, g, LBY.lite ? 14 : 24);
var m = lbyMarkMesh(g, 0, 0.1, 0, 1.8);
m.rotation.x = -Math.PI / 2;
m.material.opacity = 0;
LBY.hwMark = m;
LBY.heartWayG = g;
LBY.heartWaySpot = lbySpot(0, 0, 2.2, "A round stone, with a spiral in a square cut faint into it", "press it", function () {
lbyMove(0, LBY_HEART_R - 8, Math.PI, "The stone sinks under your hand and turns, and there is a stair under it, going down. <b>Down, and down, past the roots of everything,</b> far below the Deep, to the bottom of the Labyrinth.", LBY_HEART_Y);
});
},
function (ep) {
var n = LBY_DEEP.n, F = LBY_DEEP_FIXED, h = lbyHash((ep * 48271 + 911) >>> 0), r, c, t = 0;
do {
r = (h >>> 3) % n;
c = (h >>> 9) % n;
h = lbyHash(h + (++t));
} while (Object.keys(F).some(function (f) { return F[f][0] === r && F[f][1] === c; }) && t < 40);
var p = lbyDeepRoomXZ(r, c), sx = ((h >>> 4) % 3 - 1) * 10, sz = ((h >>> 12) % 3 - 1) * 10;
if (!sx && !sz)
sz = 10;
return { r: r, c: c, x: p.x + sx, z: p.z + sz };
},
function (g, p, q) {
var dx = q[2], dz = q[3], wx = p.x + dx * 13, wz = p.z + dz * 13, ry = Math.atan2(dx, dz);
var fl = new THREE.Group();
fl.position.set(wx, 0, wz);
fl.rotation.y = ry + Math.PI;
g.add(fl);
for (var st = 0; st < 12; st++)
wBox(4, 0.4, 0.8, lbyC(0x6A6258), 0, 0.2 + st * 0.4, -st * 0.7, fl);
lbySign(["A LONG STAIR", "going up, and far away " + q[4]], 4, 1, p.x + dx * 16.3, 6.6, p.z + dz * 16.3, ry + Math.PI, g);
lbySpot(wx, wz, 3.4, "A long stair", "climb it (it goes up and far out " + q[4] + ", into the Endless Reaches)", function () { lbyReachOut(dx, dz, "<b>Up the long stair.</b> It climbs and climbs, and turns, and climbs, and comes out under the open sky, far out " + q[4] + " in <b>the Endless Reaches</b>. Walls of the maze to every horizon."); });
},
function (x, z, msg) {
var a = Math.atan2(z, x), n = LBY_DEEP.n - 1, best = null, bd = 9;
LBY_DEEP_LONG.forEach(function (q) { var p = lbyDeepRoomXZ(q[0], q[1]), b = Math.atan2(p.z, p.x), d = Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b))); if (d < bd) {
bd = d;
best = q;
} });
var p2 = lbyDeepRoomXZ(best[0], best[1]);
lbyMove(p2.x - best[2] * 6, p2.z - best[3] * 6, Math.atan2(best[2], best[3]) + Math.PI, msg, LBY_DEEP_Y);
},
function (S, X, Y) {
var H = lbyHallOf(X, Y);
if (!H)
return;
var g = new THREE.Group();
g.name = "lby-hall";
LBY.G.add(g);
var A = lbyAgeDef(H.age), p = { x: H.x, z: H.z }, up = { solids: LBY.solids, floors: LBY.floors, spots: LBY.spots, talk: LBY.talk }, f0 = LBY.fx.length;
H.solids = [];
H.floors = [];
H.spots = [];
H.talk = [];
H.name = A.name;
LBY.solids = H.solids;
LBY.floors = H.floors;
LBY.spots = H.spots;
LBY.talk = H.talk;
try {
var pave = new THREE.Mesh(new THREE.PlaneGeometry(44, 44), lbySurf("plaza", 0xC8BEAC, 9, { ns: 1 }));
pave.rotation.x = -Math.PI / 2;
pave.position.set(p.x, 0.04, p.z);
g.add(pave);
lbyRoomShell(p, A, g, [1, 1, 1, 1], 34, 9);
lbyAgeDress(H.age, A, p, g);
if (H.down) {
var hx = p.x + 10, hz = p.z - 10;
wBox(5, 0.3, 5, lbyC(0x1A1612), hx, 0.02, hz, g);
for (var st = 0; st < 5; st++)
wBox(3.6, 0.2, 0.7, lbyC(0x5A544C), hx, -0.1 - st * 0.12, hz - 1.6 + st * 0.7, g);
lbyMarkMesh(g, hx, 2.2, hz - 2.6, 1.2);
H.solids.push({ x: hx, z: hz, hw: 2.4, hd: 2.4, b: -6, h: 5.9 });
lbySpot(hx, hz + 3, 3.2, "A stair going down", "go down (into the Deep, Deadly)", function () { lbyToDeepFrom(p.x, p.z, "<b>Down the stair under the Maker's Mark.</b> It goes down a long way, and comes out at the edge of <b>the Deep</b>, the maze of rooms under the middle of the Labyrinth. It is Deadly here."); });
}
}
catch (e) {
if (window.console)
console.warn("[labyrinth] hall", H.age, e);
}
finally {
LBY.solids = up.solids;
LBY.floors = up.floors;
LBY.spots = up.spots;
LBY.talk = up.talk;
}
H.fx = LBY.fx.slice(f0);
H.fx.forEach(function (f) { f.m.userData.keep = 1; });
if (typeof gwBake === "function")
try {
gwBake(g);
}
catch (e) { }
H.g = g;
H.key = X + "," + Y;
S.hall = H;
LBY.halls[H.key] = H;
},
function (S) {
var H = S.hall;
if (!H)
return;
S.hall = null;
delete LBY.halls[H.key];
if (H.g) {
if (H.g.parent)
H.g.parent.remove(H.g);
H.g.traverse(function (o) { if (o.geometry && o.geometry.dispose && !o.geometry.userData.shared)
o.geometry.dispose(); });
}
if (H.fx && H.fx.length)
LBY.fx = LBY.fx.filter(function (f) { return H.fx.indexOf(f) < 0; });
},
function (x, z, feet) {
if (x > 45000)
return "inside";
if (feet === undefined && typeof camera !== "undefined" && camera)
feet = camera.position.y - 1.72;
if (lbyHeartFeet(feet))
return "heart";
if (lbyDeepFeet(feet))
return "deep";
if (lbyInCourt(x, z))
return "gate";
if (!lbyInGrid(x, z))
return "reach";
return lbyZoneOfUnit(lbyU(x), lbyU(z));
},
function (x, z) {
var z2 = LBY.zone;
if (z2 === "gate")
return "the Gatehouse Court";
if (z2 === "heart")
return "the Heart";
if (z2 === "inside" || z2 === "deep")
return lbyRoomName(x, z) || (z2 === "deep" ? "the Deep" : "inside");
if (z2 === "reach") {
var H = lbyHallAt(x, z);
if (H && Math.abs(x - H.x) < 17.5 && Math.abs(z - H.z) < 17.5)
return H.name + ", a hall standing in the Endless Reaches";
return H ? "a hall's court, in the Endless Reaches" : "the Endless Reaches";
}
if (Math.hypot(x - LBY_QUERRA.x, z - LBY_QUERRA.z) < 20)
return "Querra's Court, in the maze";
for (var i = 0; i < LBY_CARVE.length; i++) {
var c = lbyCarveAt(LBY_CARVE[i][0]);
if (Math.abs(x - c.x) <= c.hw + 2 && Math.abs(z - c.z) <= c.hd + 2)
return c.name + ", in the maze";
}
var CH = LBY.coreHalls || [];
for (var h = 0; h < CH.length; h++) {
var H = CH[h];
if (Math.abs(x - H.x) <= 22 && Math.abs(z - H.z) <= 22)
return Math.abs(x - H.x) < 17.5 && Math.abs(z - H.z) < 17.5 ? H.name + ", a hall standing in the maze" : "a hall's court, in the maze";
}
return Math.hypot(x, z) < 120 ? "the maze, near its middle" : "the maze";
},
function (x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet;
if (lbyHeartFeet(feet) || (feet === 0 && LBY.zone === "heart")) {
var hh = lbyFloorsAt(LBY.hfloors || [], x, z, f === 0 ? 1e9 : f - LBY_HEART_Y);
return LBY_HEART_Y + (hh === null ? 0 : hh);
}
if (lbyDeepFeet(feet) || (feet === 0 && LBY.zone === "deep" && lbyDeepWalkAt(x, z))) {
var d = lbyFloorsAt(LBY.dfloors || [], x, z, f === 0 ? 1e9 : f - LBY_DEEP_Y);
return LBY_DEEP_Y + (d === null ? 0 : d);
}
var best = lbyFloorsAt(LBY.floors, x, z, f);
if (best !== null)
return best;
if (!lbyInGrid(x, z) && !lbyInCourt(x, z) && x < 45000) {
var H = lbyHallAt(x, z);
if (H) {
var hb = lbyFloorsAt(H.floors, x, z, f);
if (hb !== null)
return hb;
}
return 0;
}
var B = LBY.bog;
if (B && Math.abs(x - B.x) < B.hw && Math.abs(z - B.z) < B.hd) {
for (var s = 0; s < B.stones.length; s++) {
var S = B.stones[s];
if (Math.hypot(x - S.x, z - S.z) < S.r)
return 0.45;
}
return -0.55;
}
return 0;
},
function (x, z, feet) {
if (lbyHeartFeet(feet)) {
if (LBY.hsolids && worldSolidAt(LBY.hsolids, x, z, feet - LBY_HEART_Y))
return true;
return Math.hypot(x, z) > LBY_HEART_R;
}
if (lbyDeepFeet(feet)) {
if (LBY.dsolids && worldSolidAt(LBY.dsolids, x, z, feet - LBY_DEEP_Y))
return true;
return !lbyDeepWalkAt(x, z) || lbyDeepSealedAt(x, z);
}
if (x > 45000) {
if (LBY.solids.length && worldSolidAt(LBY.solids, x, z, feet))
return true;
var R = LBY.rooms || [];
for (var i = 0; i < R.length; i++) {
var r0 = R[i];
if (r0.zone === "inside" && Math.abs(x - r0.x) <= r0.hw - 0.3 && Math.abs(z - r0.z) <= r0.hd - 0.3)
return false;
}
return true;
}
if (LBY.solids.length && worldSolidAt(LBY.solids, x, z, feet))
return true;
if (lbyInCourt(x, z))
return false;
var r = 0.32;
if (lbyWallAt(x + r, z) || lbyWallAt(x - r, z) || lbyWallAt(x, z + r) || lbyWallAt(x, z - r))
return true;
if (!lbyInGrid(x, z)) {
var H = lbyHallAt(x, z);
if (H && worldSolidAt(H.solids, x, z, feet))
return true;
}
return false;
},
function (x, z, yawTo, msg, y) {
var v = lbyVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
LBY.moving = true;
setTimeout(function () {
if (WLD.on !== LBY_KEY) {
v.style.opacity = "0";
LBY.moving = false;
return;
}
var gy = y !== undefined ? lbyGround(x, z, y) : lbyGround(x, z);
camera.position.set(LBY.base + x, gy + 1.72, z);
if (yawTo !== undefined && yawTo !== null)
yaw = yawTo;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
LBY.zone = lbyZoneAt(x, z, gy);
LBY.lastUnit = -1;
if (LBY.zone === "reach") {
try {
lbyReachWindow({ x: x, z: z }, true);
}
catch (e) { }
}
if (msg)
setStatus(msg);
setTimeout(function () { v.style.opacity = "0"; LBY.moving = false; }, 120);
}, 720);
},
function (k) {
var I = LBY_IN[k];
if (!I)
return;
LBY.insideFrom = k;
if (k === "gatehouse")
lbyMove(I.x - 26, I.z + 6, -Math.PI / 2, "<b>The Gatehouse.</b> The Hall of Maps: the great table shows the maze as it stands this very minute.");
else
lbyMove(I.x, I.z + 30, 0, "<b>The Hall of Turned Stairs.</b> Stairs go up the walls and down from the ceiling. Step onto a glowing stair and the room turns round you.");
},
function (nearMid, mat) {
var span = nearMid ? 75 : 147;
for (var t = 0; t < 300; t++) {
var i = LBY.C + ((Math.random() * 2 - 1) * span | 0), j = LBY.C + ((Math.random() * 2 - 1) * span | 0);
i |= 1;
j |= 1;
if (lbyD(i, j) >= LBY_EDGE - 1 || lbySolidUnit(i, j) || LBY.grid.carve[lbyIdx(i, j)])
continue;
if (mat && lbyMatAt(i, j) !== mat)
continue;
return { x: lbyM(i), z: lbyM(j) };
}
return { x: LBY_GATE.x, z: LBY_GATE.z - 4 };
},
function () {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Shaft of Hands</div><div style='opacity:.85;margin:4px 0 8px'>Stone hands reach out of the shaft's walls, and the nearest ones crook their fingers into mouths and speak together: <i>\"Up, or down?\"</i></div>" +
worldBtn("up", "Up", "To the Lookout, on the needle of stone, over the whole maze") + worldBtn("down", "Down", "Down the shaft, into the Deep (Deadly)");
worldCard(h, { up: function () { var L = LBY.lookout; lbyMove(L.x, L.z + 1.5, Math.PI, "<b>The Lookout.</b> The hands lift you up the needle of stone and set you down at the top. The whole Labyrinth lies below: stone and hedge tangled together to every horizon, and nowhere any sign of the Heart. By the time you are down again, it will all have moved.", L.y); },
down: function () { lbyToDeep("oubliette", "<b>Down.</b> The hands pass you down, hand to hand, into the dark, and let go. You land softly in the Oubliette, in the Deep."); } });
},
function () {
var ep = LBY.stoneEp, right = lbyHash(ep * 7 + 3) % 2, liar = lbyHash(ep * 11 + 5) % 2, names = ["the red door (left)", "the blue door (right)"], fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Two Doors</div><div style='opacity:.85;margin:4px 0 8px'>" + esc(LBY_DOORS_TALE) + "</div>";
if (LBY.doorsAsked) {
h += "<div style='margin:6px 0;color:#FFE7B0'>" + LBY.doorsAsked + "</div>";
}
else {
h += worldBtn("ask0", "Ask the left guard", "\"Which door would the other guard tell me leads on?\"") + worldBtn("ask1", "Ask the right guard", "\"Which door would the other guard tell me leads on?\"");
[0, 1].forEach(function (g) { fns["ask" + g] = function () { LBY.doorsAsked = "The " + (g ? "right" : "left") + " guard thinks, and points: <b>" + names[1 - right] + "</b>."; lbyDoorsCard(); }; });
}
h += worldBtn("go0", "Open the red door", "on the left") + worldBtn("go1", "Open the blue door", "on the right");
[0, 1].forEach(function (d) {
fns["go" + d] = function () {
LBY.doorsAsked = null;
if (d === right) {
var p = lbyRandomStone(true);
lbyMove(p.x, p.z, 0, "<b>The right door.</b> It opens on a long dark passage, and lets you out deep in the maze, near its middle (though the middle, you will find, is not where the Heart is).");
}
else
lbyToDeep("oubliette", "<b>The wrong door.</b> The floor behind it is not there. You fall, a long way, and land in the Oubliette, in the Deep.");
};
});
worldCard(h, fns);
},
function () {
var ep = LBY.hedgeEp;
if (LBY.riddleEp === ep && LBY.riddleDone) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Querra</div><div style='opacity:.85'>" + LBY.riddleDone + "</div>", {});
return;
}
var n = lbyHash(ep * 13 + (LBY.riddleTry || 0)) % LBY_RIDDLES.length, Q = LBY_RIDDLES[n], ans = [Q[1]].concat(Q[2]), order = [0, 1, 2, 3].sort(function (a, b) { return lbyHash(ep * 17 + a) % 97 - lbyHash(ep * 17 + b) % 97; }), fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Querra, the Riddle-Keeper</div><div style='opacity:.85;margin:4px 0 8px'>The great stone lioness lifts her head. Her golden eyes open, slowly. <i>\"" + esc(Q[0]) + "\"</i></div>";
order.forEach(function (o, i) {
h += worldBtn("a" + i, esc(ans[o]), "");
fns["a" + i] = function () {
LBY.riddleEp = ep;
if (o === 0) {
var side = lbyHeartWayQuarter();
LBY.riddleDone = "\"Well answered.\" Querra closes her eyes. \"The Heart is not up here, whatever they tell you. It lies under everything, under the Deep itself. Its one way down is a round stone in the floor of a room in the Deep's <b>" + side + "</b> quarter, for now. The Deep's doors move in " + lbyMins(lbySecsLeft(LBY_DEEP_EVERY)) + "; when they do, so does the stone.\"";
lbyKeep("🪶", "A feather of stone, from Querra", "for a riddle answered in the maze");
lbyRiddleCard();
}
else {
LBY.riddleDone = "\"No.\" She says it kindly. The hedges lean in and pass you, leaf to leaf, far away into the maze. Come back when the green has moved.";
LBY.riddleTry = (LBY.riddleTry || 0) + 1;
var p = lbyRandomHedgeEdge();
worldCard(null);
lbyMove(p.x, p.z, null, "<b>Wrong.</b> The hedges carry you off, leaf to leaf, and set you down somewhere else in the maze.");
}
};
});
worldCard(h, fns);
},
function () {
var R = LBY.run, fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Hour Stone</div>";
if (R && Date.now() < R.until) {
var hrs = Math.floor((Date.now() - R.start) / 120000) + 1;
h += "<div style='opacity:.85;margin:4px 0 8px'>Your Thirteenth Hour is running: this is hour " + Math.min(13, hrs) + " of 13. Reach the Heart before the thirteenth hour ends.</div>" + worldBtn("stop", "Give it up", "The stone stops counting for you");
fns.stop = function () { LBY.run = null; worldCard(null); setStatus("The Hour Stone stops counting for you."); };
}
else {
h += "<div style='opacity:.85;margin:4px 0 8px'>Thirteen of the maze's hours (each is two minutes of yours: 26 minutes in all) to find your way from this stone to the Heart. The stones will move twice and the hedges thirteen times while you try. Nobody has done it yet that the Warden knows of.</div>" +
worldBtn("go", "Start the Thirteenth Hour", "The stone starts counting now");
fns.go = function () { LBY.run = { start: Date.now(), until: Date.now() + 13 * 120000 }; worldCard(null); setStatus("<b>The Thirteenth Hour begins.</b> The Hour Stone's hand jumps to I. Reach the Heart before it comes round to XIII."); if (typeof playTone === "function")
playTone(220, 0.6); };
}
worldCard(h, fns);
},
function () {
var R = LBY.run, inTime = R && Date.now() < R.until, fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Lantern Cup</div><div style='opacity:.85;margin:4px 0 8px'>A golden cup with a light inside it that is warm to the touch and never goes out. Whoever reaches it may claim the Heart: once a day, a purse from the Treasury for grown-ups who pay their dues" + (inTime ? ", and a second purse for the Thirteenth Hour, run in time" : "") + ". The Keeper's claim is for the honour only.</div>" +
worldBtn("claim", "Touch the cup", "Claim the Heart") + worldBtn("home", "Go home", "Through the Heart's own door, to where you came from");
fns.claim = function () { lbyClaim("heart"); if (inTime) {
lbyClaim("hour");
LBY.run = null;
} };
fns.home = function () { worldCard(null); lbyHome(); };
worldCard(h, fns);
},
function (kind) {
var names = { heart: ["🏆", "An ember of the Lantern Cup", "for reaching the Heart of the Labyrinth"], hour: ["⏳", "The Thirteenth Hour's brass hand", "for reaching the Heart within thirteen hours"], lost: ["🧤", "A lost thing, given back by the maze", ""] };
var N = names[kind];
lbyKeep(N[0], N[1], N[2]);
if (LBY.busy)
return;
LBY.busy = true;
var p = (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()) ? cityRpc("maze_done", { p_kind: kind }) : Promise.resolve(null);
p.then(function (o) {
LBY.busy = false;
setStatus("<b>" + esc(N[0] + " " + N[1]) + "</b>: it is in your 🎒 Backpack." + (o && o.say ? " " + esc(o.say) : "") + (o && o.gold ? " <b>+" + o.gold + " gold</b> from the Treasury." : ""));
}).catch(function () { LBY.busy = false; setStatus("<b>" + esc(N[0] + " " + N[1]) + "</b>: it is in your 🎒 Backpack."); });
},
function () {
lbyMapPaint();
var url = "";
try {
url = LBY.mapCv.toDataURL("image/png");
}
catch (e) { }
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The great map table</div><div style='opacity:.85;margin:4px 0 6px'>The table redraws itself as the stones move. This is the stone of the maze as it stands now; it will change in " + Math.ceil(lbySecsLeft(LBY_STONE_EVERY) / 60) + " minutes. The hedge that grows all through it is drawn only as mist: living hedge will not hold still for a map. The red mark is the gate. There is no Heart on the map: whatever it is, it is not up here." + (LBY.master && LBY.master.mine && LBY.heartWay ? " <b>(The Master's map:</b> the Heart's way down is under room " + (LBY.heartWay.r + 1) + " down, " + (LBY.heartWay.c + 1) + " across, of the Deep, counted from its north-west corner, until its doors next move.)" : "") + "</div>" +
(url ? "<img src='" + url + "' style='width:100%;image-rendering:pixelated;border:1px solid #8FB4E8;border-radius:4px' alt='The maze as it stands now'>" : ""), {});
},
function () {
var day = Math.floor(Date.now() / 86400000), d = lbyData(), item = LBY_LOST[lbyHash(day * 3 + (d.lostN || 0)) % LBY_LOST.length], fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Lost property</div><div style='opacity:.85;margin:4px 0 8px'>Crates of what the maze gave back. Today, on top, there is " + esc(item) + ".</div>";
if (d.lostDay !== day) {
h += worldBtn("take", "Take it", "One a day; the Warden won't mind");
fns.take = function () { d.lostDay = day; d.lostN = (d.lostN || 0) + 1; lbyKeep("🧤", "Lost property: " + item, "given back by the Labyrinth"); worldCard(null); setStatus("You take " + esc(item) + ". It is in your 🎒 Backpack."); };
}
else
h += "<div style='opacity:.7'>You have taken your one thing today.</div>";
worldCard(h, fns);
},
function () {
var L = worldLocal(), any = false;
if (lbyEpoch(LBY_STONE_EVERY) !== LBY.stoneEp) {
lbyAnimate(lbyApply("stone", true), L);
lbySeemDraw();
lbyMapPaint();
any = true;
if (LBY.zone === "maze" || LBY.zone === "reach")
setStatus("🌀 <b>The ground shudders.</b> All round you the stones of the maze grind and slide into new places, through the hedge and under it. Nothing is where it was.");
}
if (lbyEpoch(LBY_HEDGE_EVERY) !== LBY.hedgeEp) {
lbyAnimate(lbyApply("hedge", true), L);
lbyGoldPlace();
any = true;
LBY.riddleDone = null;
if (LBY.zone === "maze" || LBY.zone === "reach")
setStatus("🌿 <b>A sound like wind in leaves.</b> The hedges are moving: they grow across one path and draw back from another, round the stones and between them.");
}
if (lbyEpoch(LBY_DEEP_EVERY) !== LBY.deepEp)
lbyDeepApply(true);
return any;
},
function (dt) {
if (!LBY.anim.length)
return;
var G = LBY.grid, keep = [], step = dt / LBY_GROW_S;
LBY.anim.forEach(function (k) {
if (G.wall[k]) {
G.grow[k] = Math.min(1, G.grow[k] + step);
if (G.grow[k] < 1)
keep.push(k);
}
else {
G.grow[k] = Math.max(0, G.grow[k] - step);
if (G.grow[k] <= 0.0011) {
G.grow[k] = 1;
}
else
keep.push(k);
}
lbyRedrawGrow(k);
});
LBY.anim = keep;
},
function (L) {
var i = lbyU(L.x), j = lbyU(L.z);
if (!lbyIn(i, j)) {
LBY.lastUnit = -1;
return;
}
var k = lbyIdx(i, j);
if (k === LBY.lastUnit)
return;
var prev = LBY.lastUnit;
LBY.lastUnit = k;
if (prev < 0 || LBY.zone !== "maze" || LBY.grid.kind[prev] !== 3 || LBY.grid.wall[prev])
return;
if (LBY.t - (LBY.behindAt || -99) < 25 || Math.random() > 0.22)
return;
LBY.behindAt = LBY.t;
LBY.grid.wall[prev] = 1;
LBY.grid.grow[prev] = 0.001;
LBY.anim.push(prev);
setStatus("🌿 You hear leaves rustle behind you. When you look, <b>the way you came has closed</b>.");
},
function (L) {
if (lbyBelow() || LBY.zone === "gate")
return;
if (!lbySolidUnit(lbyU(L.x), lbyU(L.z)))
return;
var p = lbyNearestOpen(L.x, L.z);
camera.position.x = LBY.base + p.x;
camera.position.z = p.z;
if (LBY.t - LBY.lastNudge > 4) {
LBY.lastNudge = LBY.t;
setStatus("The wall grows where you stood and <b>moves you gently aside</b>.");
}
},
function (dt) {
var L = worldLocal();
LBY.t += dt;
if (LBY.moving)
return;
var zone = lbyZoneAt(L.x, L.z);
LBY.zone = zone;
if (LBY.home && WLD.arrive && (WLD.arrive.x !== LBY.home.x || WLD.arrive.z !== LBY.home.z - 8))
WLD.arrive = { x: LBY.home.x, z: LBY.home.z - 8 };
lbyAnimTick(dt);
lbyReachAnimTick(dt);
lbyFarTick();
lbyPreTick();
LBY.ct = (LBY.ct || 0) + dt;
if (LBY.ct > 1) {
LBY.ct = 0;
lbyChangeTick();
if (!lbyBelow())
lbyReachWindow(L);
lbyMasterTick();
}
LBY.vt = (LBY.vt || 0) + dt;
if (LBY.vt > 0.3) {
LBY.vt = 0;
if (!lbyBelow()) {
var bx = Math.floor(lbyU(L.x) / LBY_RB), by = Math.floor(lbyU(L.z) / LBY_RB);
if (bx !== LBY_RV.cx || by !== LBY_RV.cz)
lbyReachWindow(L);
}
lbyChunkVis(L);
lbyReachVis(L);
lbyDeepVis(L);
if (LBY.heartG && LBY.heartG.visible !== (zone === "heart"))
LBY.heartG.visible = zone === "heart";
lbyMistPlace(L);
lbyEarthTick(L);
}
lbyBehindTick(L);
lbyNudgeTick(L);
lbyFxTick(dt, L);
lbyFlipTick(dt, L);
lbyThreadTick(dt, L);
lbyHeartWayTick(L);
if (zone === "maze" && camera.position.y < 3.5)
for (var t = 0; t < LBY.traps.length; t++) {
var T = LBY.traps[t];
if (Math.abs(L.x - T.x) < 1.1 && Math.abs(L.z - T.z) < 1.1) {
lbyToDeep("oubliette", "<b>Click.</b> The planks tip under you. You slide down a long stone chute into the dark and land, unhurt, in <b>the Oubliette</b>, deep under the maze.");
return;
}
}
var B = LBY.bog;
if (B && zone === "maze" && Math.abs(L.x - B.x) < B.hw && Math.abs(L.z - B.z) < B.hd && lbyGround(L.x, L.z, camera.position.y - 1.72) < 0) {
if (LBY.t - (LBY.reekAt || -99) > 20) {
LBY.reekAt = LBY.t;
setStatus("🤢 <b>The Reekmire.</b> You are knee-deep in it, and the smell is beyond anything. Get back on the stones.");
}
}
if (LBY.run && Date.now() > LBY.run.until) {
LBY.run = null;
setStatus("⏳ <b>The thirteenth hour is over.</b> Far off, the Hour Stone strikes thirteen. The Heart kept its secret this time.");
}
if (LBY.hands) {
var s = Date.now() / 1000, hr = (s / 120) % 13, mn = (s % 120) / 120;
LBY.hands.forEach(function (H) { H.h.rotation.z = -hr / 13 * Math.PI * 2; H.m.rotation.z = -mn * Math.PI * 2; });
}
var hint = zone === "maze" || zone === "reach" ? " · stones move in " + lbyMins(lbySecsLeft(LBY_STONE_EVERY)) + " · hedges in " + lbySecsLeft(LBY_HEDGE_EVERY) + "s" : zone === "deep" ? " · doors move in " + lbyMins(lbySecsLeft(LBY_DEEP_EVERY)) : "";
if (zone === "reach") {
var far = Math.round(Math.hypot(L.x, L.z) / 100) / 10;
hint += " · " + far + " km from the middle";
}
if (LBY.master && LBY.master.name && (zone === "gate" || zone === "heart"))
hint += " · Master: " + esc(LBY.master.name);
var run = LBY.run ? " · ⏳ hour " + Math.min(13, Math.floor((Date.now() - LBY.run.start) / 120000) + 1) + " of 13" : "";
worldBanner("<b>🌀 The Labyrinth</b> · " + esc(lbyPlaceName(L.x, L.z)) + hint + run);
if (zone === "heart" && !LBY.heartSeen) {
LBY.heartSeen = true;
lbyMasterClaim();
setStatus("✨ <b>The Heart of the Labyrinth.</b> You found it, at the very bottom of everything, far under the Deep. A great hollow under a vault of still lights: fountains, a great clock with thirteen hours, and on its dais the Lantern Cup, glowing. Hardly anyone has ever stood here.");
lbyKeep("🌀", "You reached the Heart of the Labyrinth", new Date().toDateString());
}
LBY.pt += dt;
if (LBY.pt < 0.15)
return;
LBY.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
var feet = camera.position.y - 1.72, best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
if (LBY.home && zone === "gate" && Math.hypot(L.x - LBY.home.x, L.z - LBY.home.z) < 3.6)
cand(LBY.home.x, LBY.home.z, 3.6, lbyHome, "<b>The Way Home</b> · <b>press E</b> to go back to Somnucor");
var deep = zone === "deep", hrt = zone === "heart", H = zone === "reach" ? lbyHallAt(L.x, L.z) : null, lf = deep ? feet - LBY_DEEP_Y : hrt ? feet - LBY_HEART_Y : feet;
var talk = deep ? (LBY.dtalk || []) : hrt ? (LBY.htalk || []) : H ? LBY.talk.concat(H.talk) : LBY.talk, spots = deep ? (LBY.dspots || []) : hrt ? (LBY.hspots || []) : H ? LBY.spots.concat(H.spots) : LBY.spots;
talk.forEach(function (T) {
var x = T.p ? T.p.g.position.x : T.x, z = T.p ? T.p.g.position.z : T.z;
if (T.p && Math.abs(T.p.g.position.y - feet) > 3)
return;
cand(x, z, T.r, T.fn ? T.fn : function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to " + (T.verb || "talk"));
});
spots.forEach(function (s) { if (s.y !== undefined && Math.abs(s.y - lf) > 2.5)
return; if (s.y === undefined && lf > 4)
return; cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb)); });
if (LBY.lookout && Math.abs(feet - LBY.lookout.y) < 2 && Math.hypot(L.x - LBY.lookout.x, L.z - LBY.lookout.z) < 5)
cand(LBY.lookout.x, LBY.lookout.z, 5, function () { var S = LBY.shaft; lbyMove(S.x, S.z + 9, 0, "The hands lower you back down to the Shaft of Hands."); }, "<b>The Lookout</b> · <b>press E</b> to be lowered back down");
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
},
function (dt, L) {
LBY.fx.forEach(function (f) {
if (f.k === "bubble") {
f.ph += dt * 0.6;
var t = f.ph % 3;
f.m.position.y = f.y0 + (t < 2.6 ? 0 : 0);
f.m.scale.setScalar(0.4 + Math.min(1, t / 2.6) * 0.8);
}
else if (f.k === "gear")
f.m.rotation.z += dt * f.sp;
else if (f.k === "slowhand")
f.m.rotation.z -= dt * 2.4;
});
LBY.people.forEach(function (P) { if (P.wander) {
var fy = P.g.position.y + 1;
wWander(P.g, dt, function (x, z) { return lbyGround(x, z, fy); }, P.wander);
} });
if (LBY.cup) {
LBY.cup.g.rotation.y += dt * 0.25;
}
if (LBY.wm && LBY.wm.seem && LBY.zone === "maze") {
var nd = 99;
for (var i = 0; i < LBY.seem.length; i++) {
var S = LBY.seem[i], dx = S.x - L.x, dz = S.z - L.z;
if (Math.abs(dx) < 8 && Math.abs(dz) < 8) {
var d = Math.hypot(dx, dz);
if (d < nd)
nd = d;
}
}
var op = Math.max(0.18, Math.min(1, (nd - 1.5) / 4.5)), M = LBY.wm.seem;
if (Math.abs(M.opacity - op) > 0.01) {
M.opacity += (op - M.opacity) * Math.min(1, dt * 3);
M.depthWrite = M.opacity > 0.95;
}
if (nd < 2.6 && LBY.t - (LBY.seemTold || -99) > 40) {
LBY.seemTold = LBY.t;
setStatus("Up close, the wall in front of you is not a wall at all: <b>the stones are set so the opening hides in their shadow</b>. From a few steps back you would swear it was solid.");
}
}
if (LBY.slowRoom) {
var inS = LBY.zone === "deep" && Math.abs(L.x - LBY.slowRoom.x) < 17 && Math.abs(L.z - LBY.slowRoom.z) < 17;
if (inS && !LBY.slowIn) {
LBY.slowIn = Date.now();
setStatus("⌛ <b>The Slow Room.</b> The great clock's hand is racing round. In here, a minute of yours is a whole day of the clock's.");
}
else if (!inS && LBY.slowIn) {
var days = Math.max(1, Math.round((Date.now() - LBY.slowIn) / 60000));
LBY.slowIn = 0;
setStatus("You step out of the Slow Room. By its clock you were in there <b>" + days + " day" + (days > 1 ? "s" : "") + "</b>. By yours, hardly any time at all.");
}
}
},
function (L) {
var on = LBY.zone === "maze";
LBY.mist.forEach(function (M, i) {
if (!on) {
M.s.visible = false;
return;
}
if (!M.s.visible || Math.hypot(M.x - L.x, M.z - L.z) > 70) {
var a = Math.random() * Math.PI * 2, r = 14 + Math.random() * 50;
M.x = L.x + Math.cos(a) * r;
M.z = L.z + Math.sin(a) * r;
M.s.visible = true;
}
M.ph += 0.3 * M.sp;
M.x += Math.sin(M.ph * 0.1) * 0.4;
M.s.position.set(M.x, 1.2 + Math.sin(M.ph * 0.05) * 0.4, M.z);
M.s.material.opacity = 0.12 + 0.06 * Math.sin(M.ph * 0.07);
});
},
function (dt, L) {
var want = 0;
if (LBY.zone === "maze") {
for (var i = 0; i < LBY.gold.length; i++) {
var P = LBY.gold[i];
if (Math.hypot(L.x - P.x, L.z - P.z) < 3.6) {
if (LBY.flipT <= 0) {
LBY.flipT = 9;
setStatus("✨ <b>Golden mist.</b> The world turns over: the sky is under your feet and the hedges hang from it. It will pass.");
if (lbyXR())
LBY.spin = Math.PI;
}
break;
}
}
}
if (LBY.flipT > 0) {
LBY.flipT -= dt;
want = Math.PI;
}
if (lbyXR()) {
if (LBY.spin > 0) {
var st = Math.min(LBY.spin, dt * 1.2);
yaw += st;
LBY.spin -= st;
}
LBY.flip = 0;
return;
}
LBY.flip += (want - LBY.flip) * Math.min(1, dt * 1.4);
if (Math.abs(LBY.flip) < 0.002)
LBY.flip = 0;
if (LBY.flip)
camera.rotation.z = LBY.flip;
},
function (dt, L) {
var on = typeof RAP !== "undefined" && RAP.wield === "thread" && (LBY.zone === "maze" || LBY.zone === "reach");
if (!on) {
if (LBY.line)
LBY.line.visible = false;
return;
}
LBY.lt = (LBY.lt || 0) - dt;
if (LBY.lt > 0 && LBY.line && LBY.line.visible)
return;
LBY.lt = 1.5;
var ek = lbyEpoch(LBY_STONE_EVERY) + ":" + lbyEpoch(LBY_HEDGE_EVERY), TP = LBY.tpath;
if (TP && TP.ek === ek && LBY.line && LBY.line.visible) {
var near = 99;
for (var q = 0; q < Math.min(60, TP.pts.length); q++)
near = Math.min(near, Math.hypot(TP.pts[q].x - L.x, TP.pts[q].z - L.z));
if (near < 6)
return;
}
var tx = LBY_GATE.x, tz = LBY_GATE.z + 2;
if (LBY.zone === "reach") {
var ax = L.x < 0 ? LBY_COURT.x0 - 2 : LBY_COURT.x1 + 2;
if (Math.hypot(L.x - ax, L.z - LBY_ARCH_Z) < Math.hypot(L.x - tx, L.z - tz) + 400) {
tx = ax;
tz = LBY_ARCH_Z;
}
}
var path = lbyPath(L.x, L.z, tx, tz, LBY.lite ? 60000 : 160000);
if (!path) {
if (LBY.line)
LBY.line.visible = false;
LBY.tpath = null;
return;
}
LBY.tpath = { ek: ek, pts: path };
var pts = path.slice(0, 260).map(function (p) { return new THREE.Vector3(p.x, 0.25, p.z); });
if (LBY.line) {
LBY.line.geometry.dispose();
LBY.line.geometry = new THREE.BufferGeometry().setFromPoints(pts);
LBY.line.visible = true;
}
else {
LBY.line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xE0E8F8, transparent: true, opacity: 0.8, fog: false }));
LBY.line.frustumCulled = false;
LBY.G.add(LBY.line);
}
},
function (G) {
LBY.G = G;
LBY.lite = typeof LITE !== "undefined" && !!LITE;
LBY.halls = {};
lbyReachForget();
LBY.solids = [];
LBY.floors = [];
LBY.spots = [];
LBY.talk = [];
LBY.people = [];
LBY.glows = [];
LBY.mist = [];
LBY.gold = [];
LBY.traps = [];
LBY.fx = [];
LBY.walk = [];
LBY.rooms = [];
LBY.chunks = [];
LBY.anim = [];
LBY.hands = null;
LBY.line = null;
LBY.pieces = null;
LBY.wm = null;
LBY.mats = {};
LBY.mapTex = null;
LBY.grid = lbyGridMake();
lbyApply("stone", false);
lbyApply("hedge", false);
lbyGroundBuild(G);
lbyChunks(G);
lbySeemDraw();
lbyCourt(G);
lbyStonewend(G);
lbyQuerraBuild(G);
lbyCoreHalls(G);
lbyInsides(G);
lbyDeepBuild(G);
lbyHeartBuild(G);
lbyMist(G);
lbyGoldPlace();
if (LBY.hands)
LBY.hands.forEach(function (H) { if (H.h.parent)
H.h.parent.userData.keep = 1; });
if (LBY.cup)
LBY.cup.g.userData.keep = 1;
LBY.fx.forEach(function (f) { f.m.userData.keep = 1; });
if (typeof gwBake === "function")
try {
gwBake(G);
}
catch (e) {
if (window.console)
console.warn("[labyrinth] bake", e);
}
LBY.built = true;
},
function (opt) {
opt = opt || {};
LBY.heartSeen = false;
LBY.lastUnit = -1;
LBY.flip = 0;
LBY.flipT = 0;
LBY.mft = 0;
lbyMasterFetch();
if (opt.at === "deep") {
var D = LBY_DEEP_FIXED.entry, p = lbyDeepRoomXZ(D[0], D[1]);
camera.position.set(LBY.base + p.x, LBY_DEEP_Y + 1.72, p.z + 8);
yaw = 0;
pitch = 0;
LBY.zone = "deep";
setStatus("<b>The Labyrinth: the Deep.</b> The stone behind the Maker's Mark swings shut. You are in the Stair of the Mark, under the great maze, among rooms from every age whose doors will not stay as they are. It is <b>Deadly</b> here. The stair goes up to the Gatehouse Court.");
}
else {
var h = LBY.home || { x: 0, z: 715 };
camera.position.set(LBY.base + h.x, 1.72, h.z - 8);
yaw = 0;
pitch = 0;
LBY.zone = "gate";
setStatus("<b>The Labyrinth.</b> The court is a clearing in a maze that fills the whole world and never holds still: old stone that rearranges every twelve minutes, and living hedge grown all through it that moves every two. Through the great gate and the court's side arches it goes on for ever. Somewhere, they say, is the Heart, though not where anyone expects. The court is safe. Past its gate and arches, nothing is.");
}
},
function () {
for (var k in LBY.mats) {
var m = LBY.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in LBY.tex) {
var x = LBY.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
if (LBY.mapTex && LBY.mapTex.dispose)
LBY.mapTex.dispose();
["G", "chunks", "grid", "solids", "floors", "spots", "talk", "people", "glows", "mist", "gold", "traps", "fx", "walk", "rooms", "anim", "hands", "line", "pieces", "wm", "mapTex", "mapCv", "mapMesh",
"deepRooms", "deepDoors", "deepPass", "seem", "cup", "bog", "bogMesh", "home", "lookout", "landings", "shaft", "twodoors", "slowRoom", "slot", "slotC"].forEach(function (k) { LBY[k] = null; });
LBY.mats = {};
LBY.tex = {};
LBY.built = false;
LBY.halls = {};
LBY.dsolids = LBY.dfloors = LBY.dspots = LBY.dtalk = null;
LBY.deepG = null;
LBY.earth = null;
LBY.tpath = null;
lbyReachForget();
},
function () {
var keeper = typeof amKeeper === "function" && amKeeper(), b = "", fns = {};
var rows = [["The maze", "It fills the whole world, one maze with no edges in it: old stone (rearranging every 12 minutes) and living hedge (moving every 2) grown all through each other, with halls from every age standing in it. Far from the middle it becomes the Endless Reaches, and goes on for ever"],
["Below", "The Deep, right under the middle: rooms from every age, their doors sealing and opening every 10 minutes; long stairs climb from it far out into the Reaches"], ["Danger", "The Gatehouse Court and the Heart are safe; the maze is Dangerous; the Deep and the Endless Reaches are Deadly"],
["The Master", "The first to reach the Heart controls the Labyrinth, until someone else reaches it" + (LBY.master && LBY.master.name ? ". Now: " + LBY.master.name : "")],
["The way in", "The Labyrinth's door in the Hall of Doors (and, they say, the Maker's Mark in other worlds)"], ["The Heart", "Nobody the Warden knows of has found it. It is not in the middle"]];
if (WLD.on === LBY_KEY) {
if (LBY.master && LBY.master.mine) {
b += worldBtn("master", "👑 The Master's powers", "You hold the Labyrinth");
fns.master = function () { lbyMasterCard(); };
}
b += worldBtn("home", "Leave the Labyrinth", "Back to where you came from");
fns.home = function () { worldCard(null); lbyHome(); };
}
else {
if (!WLD.on && typeof toHall === "function") {
b += worldBtn("hall", "Take me to the Hall of Doors", "The Labyrinth's door stands among the world doors, opposite the way in");
fns.hall = function () { worldCard(null); toHall(); setStatus("<b>The Hall of Doors.</b> The Labyrinth's door, with a spiral in a square on it, stands across the hall from the way in."); };
}
if (keeper) {
b += worldBtn("go", "Go now (to the gate)", "The Keeper's way: the Heart has no short cut, even for you");
fns.go = function () { worldCard(null); lbyGo({}); };
}
}
b += worldBtn("rumour", "Rumours of the Maker's Mark", "Hidden ways into the Deep");
fns.rumour = function () { worldCard(worldFacts("The Maker's Mark", "A spiral in a square, glowing softly", [], LBY_MARKS.map(function (M) { return "They say there is one " + M.hint + "."; })), {}); };
worldCard(worldFacts("🌀 The Labyrinth", "A world that is one great maze, and the maze is alive", rows, []) + b, fns);
},
function (o) {
if (!o || o.ok === false)
return;
var was = LBY.master && LBY.master.name, sh = +o.shift || 0;
LBY.master = o.name ? { name: o.name, mine: !!o.mine, since: o.since || null } : null;
if (sh !== LBY.shift) {
var first = LBY.shiftKnown !== true;
LBY.shift = sh;
if (!first && WLD.on === LBY_KEY && LBY.zone !== "inside")
setStatus("👑 <b>The Master of the Labyrinth turns the maze.</b> Every wall, stone and hedge, in every part of it, moves at once.");
}
LBY.shiftKnown = true;
if (LBY.master && LBY.master.mine && was !== LBY.master.name && WLD.on === LBY_KEY)
setStatus("👑 <b>You are the Master of the Labyrinth.</b> The maze is yours until someone else reaches the Heart. Your powers are in the Menu (🌀 Labyrinth).");
},
function () {
if (typeof amKeeper === "function" && amKeeper()) {
setStatus("The Heart knows its Keeper, and keeps its own master: <b>the Keeper can never hold the Labyrinth</b>.");
return;
}
if (!(typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()))
return;
cityRpc("maze_heart_claim", {}).then(function (o) { lbyMasterSet(o); if (o && o.say)
setStatus(esc(o.say)); }).catch(function () { });
},
function () {
var M = LBY.master, fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>👑 The Master of the Labyrinth</div>";
if (!M || !M.mine) {
worldCard(h + "<div style='opacity:.85'>" + (M ? esc(M.name) + " holds the Labyrinth. Reach the Heart and it is yours." : "Nobody holds the Labyrinth. The first to reach the Heart will.") + "</div>", {});
return;
}
h += "<div style='opacity:.85;margin:4px 0 8px'>The maze is yours until someone else reaches the Heart. Use it to keep them out.</div>";
h += worldBtn("turn", "Turn the maze", "Every wall in every part of it moves at once, for everyone (once every ten minutes)");
h += worldBtn("way", "The Master's Way", "Straight down to the Heart, from anywhere in the maze or the Deep");
h += worldBtn("map", "The Master's map", "The whole middle as it stands, the hedge too, and which room of the Deep hides the Heart's way down");
h += "<div style='opacity:.75;margin-top:6px'>And the Labyrinth's beasts will not come at you.</div>";
fns.turn = function () { cityRpc("maze_shift", {}).then(function (o) { if (o && o.ok) {
lbyMasterSet(o);
worldCard(null);
}
else
setStatus(esc((o && o.say) || "The maze will not turn just yet.")); }).catch(function () { setStatus("The maze will not turn just now."); }); };
fns.way = function () {
if (LBY.zone === "inside" || LBY.zone === "heart") {
setStatus(LBY.zone === "heart" ? "You are in the Heart already." : "The Master's Way starts in the maze itself, or the Deep.");
return;
}
worldCard(null);
lbyMove(0, 26, 0, "👑 <b>The Master's Way.</b> The walls lean aside for you and the floor opens into a stair, and closes again behind: down past the Deep, you walk straight into <b>the Heart</b>, at the bottom of everything.", LBY_HEART_Y);
};
fns.map = function () { lbyMapCard(); };
worldCard(h, fns);
}
];
});
