/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(46, function () {
"use strict";
return [
function (arch, attrs, bx, bz, side, wantOff, boxes) {
var fp0 = footprint(arch, attrs, 0);
if (fp0.hw > EDGE - 0.5 || fp0.hd * 2 > EDGE * 2 - FRONT - 0.5)
return null;
var rot = [0, Math.PI / 2, Math.PI, -Math.PI / 2][side], fp = footprint(arch, attrs, rot);
var lim = EDGE - fp0.hw - 0.5, offs = [], step = 3;
for (var d = 0; d <= EDGE * 2; d += step) {
if (wantOff + d <= lim)
offs.push(wantOff + d);
if (d && wantOff - d >= -lim)
offs.push(wantOff - d);
if (wantOff + d > lim && wantOff - d < -lim)
break;
}
for (var i = 0; i < offs.length; i++) {
var p = sidePlacement(bx, bz, side, offs[i], fp0), box = boxOf(p.x, p.z, fp);
if (insideBlock(box, bx, bz) && clearOf(box, boxes))
return { x: p.x, z: p.z, rot: p.rot, bx: bx, bz: bz, k: lotNearest(bx, bz, p.x, p.z) };
}
return null;
},
function (arch, attrs, want, realm) {
var boxes = standingBoxes(null, realm);
var fp0 = footprint(arch, attrs, 0), big = fp0.hw > EDGE - 0.5 || fp0.hd * 2 > EDGE * 2 - FRONT - 0.5;
var side = Math.floor(want.k / 5) % 4, i = want.k % 5, off = -36 + i * 18;
for (var ring = 0; ring < 6; ring++) {
for (var dx = -ring; dx <= ring; dx++)
for (var dz = -ring; dz <= ring; dz++) {
if (Math.max(Math.abs(dx), Math.abs(dz)) !== ring)
continue;
var bx = want.bx + dx, bz = want.bz + dz;
if (big) {
var wb = fitWholeBlock(arch, attrs, bx, bz, boxes);
if (wb)
return wb;
continue;
}
var order = ring === 0 ? [side, (side + 1) % 4, (side + 3) % 4, (side + 2) % 4] : [0, 1, 2, 3];
for (var s = 0; s < order.length; s++) {
var r = fitOnSide(arch, attrs, bx, bz, order[s], (ring === 0 && order[s] === side) ? off : 0, boxes);
if (r)
return r;
}
}
}
var p = lotSpot(want.bx, want.bz, want.k);
return { x: p.x, z: p.z, rot: p.rot, bx: want.bx, bz: want.bz, k: want.k };
},
function (arch, attrs, x, z, realm, skipId) {
var boxes = standingBoxes(skipId, realm), best = null, bd = Infinity;
var bx0 = Math.round(x / PITCH), bz0 = Math.round(z / PITCH);
var fp0 = footprint(arch, attrs, 0), big = fp0.hw > EDGE - 0.5 || fp0.hd * 2 > EDGE * 2 - FRONT - 0.5;
for (var dx = -1; dx <= 1; dx++)
for (var dz = -1; dz <= 1; dz++) {
var bx = bx0 + dx, bz = bz0 + dz;
if (big) {
var wb = fitWholeBlock(arch, attrs, bx, bz, boxes);
if (wb) {
var dw = (wb.x - x) * (wb.x - x) + (wb.z - z) * (wb.z - z);
if (dw < bd) {
bd = dw;
best = wb;
}
}
continue;
}
for (var side = 0; side < 4; side++) {
var o = blockOrigin(bx, bz);
var along = side === 0 ? x - o.x : side === 1 ? -(z - o.z) : side === 2 ? -(x - o.x) : (z - o.z);
var r = fitOnSide(arch, attrs, bx, bz, side, Math.round(along / 3) * 3, boxes);
if (r) {
var d = (r.x - x) * (r.x - x) + (r.z - z) * (r.z - z);
if (d < bd) {
bd = d;
best = r;
}
}
}
}
return best && bd < 120 * 120 ? best : null;
},
function (spec) {
var fp = footprint(spec.archetype, spec.attrs, spec.rot), box = boxOf(spec.x, spec.z, fp), keys = [];
var bx0 = Math.round(spec.x / PITCH), bz0 = Math.round(spec.z / PITCH);
for (var dx = -1; dx <= 1; dx++)
for (var dz = -1; dz <= 1; dz++) {
for (var k = 0; k < LOTS; k++) {
var s = lotSpot(bx0 + dx, bz0 + dz, k);
if (s.x >= box.x0 - 2 && s.x <= box.x1 + 2 && s.z >= box.z0 - 2 && s.z <= box.z1 + 2) {
var key = lotKey(bx0 + dx, bz0 + dz, k);
store.lots[key] = spec.id;
keys.push(key);
}
}
}
if (spec.lot !== null && spec.lot !== undefined && spec.bx !== undefined) {
var own = lotKey(spec.bx, spec.bz, spec.lot);
if (keys.indexOf(own) === -1) {
store.lots[own] = spec.id;
keys.push(own);
}
}
spec.lots = keys;
},
function (spec) {
if (!store.lots)
return;
(spec.lots || []).forEach(function (k) { if (store.lots[k] === spec.id)
delete store.lots[k]; });
if (spec.lot !== null && spec.lot !== undefined && spec.bx !== undefined) {
var own = lotKey(spec.bx, spec.bz, spec.lot);
if (store.lots[own] === spec.id)
delete store.lots[own];
}
spec.lots = [];
spec.lot = null;
}
];
});
