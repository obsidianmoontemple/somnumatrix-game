/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(74, function () {
"use strict";
return [
function (ax, az, bx, bz) {
var goal = freeNear(bx, bz);
bx = goal.x;
bz = goal.z;
if (lineClear(ax, az, bx, bz))
return [{ x: bx, z: bz }];
var m = 40, x0 = Math.min(ax, bx) - m, z0 = Math.min(az, bz) - m, x1 = Math.max(ax, bx) + m, z1 = Math.max(az, bz) + m;
var W = Math.ceil((x1 - x0) / NAV_CELL), H = Math.ceil((z1 - z0) / NAV_CELL);
if (W * H > NAV_MAXCELLS) {
var k = Math.sqrt(W * H / NAV_MAXCELLS);
W = Math.floor(W / k);
H = Math.floor(H / k);
}
var cw = (x1 - x0) / W, ch = (z1 - z0) / H;
function cx(i) { return x0 + (i + .5) * cw; }
function cz(j) { return z0 + (j + .5) * ch; }
var blocked = new Uint8Array(W * H), known = new Uint8Array(W * H);
function isB(i, j) { var k = j * W + i; if (!known[k]) {
known[k] = 1;
blocked[k] = navBlocked(cx(i), cz(j)) ? 1 : 0;
} return blocked[k]; }
var si = Math.min(W - 1, Math.max(0, Math.floor((ax - x0) / cw))), sj = Math.min(H - 1, Math.max(0, Math.floor((az - z0) / ch)));
var gi = Math.min(W - 1, Math.max(0, Math.floor((bx - x0) / cw))), gj = Math.min(H - 1, Math.max(0, Math.floor((bz - z0) / ch)));
var g = new Float32Array(W * H).fill(1e9), from = new Int32Array(W * H).fill(-1), shut = new Uint8Array(W * H);
var open = [[0, si, sj]];
g[sj * W + si] = 0;
var steps = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]], found = false, guard = 0;
while (open.length && guard++ < 40000) {
var best = 0;
for (var q = 1; q < open.length; q++)
if (open[q][0] < open[best][0])
best = q;
var cur = open[best];
open[best] = open[open.length - 1];
open.pop();
var i = cur[1], j = cur[2], ck = j * W + i;
if (shut[ck])
continue;
shut[ck] = 1;
if (i === gi && j === gj) {
found = true;
break;
}
for (var s = 0; s < 8; s++) {
var ni = i + steps[s][0], nj = j + steps[s][1];
if (ni < 0 || nj < 0 || ni >= W || nj >= H)
continue;
var nk = nj * W + ni;
if (shut[nk] || isB(ni, nj))
continue;
if (steps[s][2] > 1 && (isB(i + steps[s][0], j) || isB(i, j + steps[s][1])))
continue;
var ng = g[ck] + steps[s][2];
if (ng < g[nk]) {
g[nk] = ng;
from[nk] = ck;
open.push([ng + Math.hypot(ni - gi, nj - gj), ni, nj]);
}
}
}
if (!found)
return [{ x: bx, z: bz }];
var cells = [], k2 = gj * W + gi;
while (k2 !== -1) {
cells.push({ x: cx(k2 % W), z: cz(Math.floor(k2 / W)) });
k2 = from[k2];
}
cells.reverse();
cells[cells.length - 1] = { x: bx, z: bz };
var out = [], at = { x: ax, z: az }, idx = 0;
while (idx < cells.length - 1) {
var far = idx + 1;
for (var t = cells.length - 1; t > idx; t--)
if (lineClear(at.x, at.z, cells[t].x, cells[t].z)) {
far = t;
break;
}
out.push(cells[far]);
at = cells[far];
idx = far;
}
if (!out.length)
out.push({ x: bx, z: bz });
return out;
}
];
});
