/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(45, function () {
"use strict";
return [
function (bx, bz, k) {
if (lotFree(bx, bz, k))
return { bx: bx, bz: bz, k: k };
var side = Math.floor(k / 5) % 4, i = k % 5;
for (var d = 1; d < 5; d++) {
if (i + d < 5 && lotFree(bx, bz, side * 5 + i + d))
return { bx: bx, bz: bz, k: side * 5 + i + d };
if (i - d >= 0 && lotFree(bx, bz, side * 5 + i - d))
return { bx: bx, bz: bz, k: side * 5 + i - d };
}
for (var j = 0; j < LOTS; j++)
if (lotFree(bx, bz, j))
return { bx: bx, bz: bz, k: j };
for (var r = 1; r < 4; r++) {
for (var dx = -r; dx <= r; dx++)
for (var dz = -r; dz <= r; dz++) {
if (Math.abs(dx) !== r && Math.abs(dz) !== r)
continue;
for (var m = 0; m < LOTS; m++)
if (lotFree(bx + dx, bz + dz, m))
return { bx: bx + dx, bz: bz + dz, k: m };
}
}
return { bx: bx, bz: bz, k: k };
},
function (dir, from) {
var bx = from.bx, bz = from.bz, k = from.lot;
var side = Math.floor(k / 5) % 4, i = k % 5;
if (dir.rel === "opposite") {
var ob = { 0: [0, 1, 2], 1: [1, 0, 3], 2: [0, -1, 0], 3: [-1, 0, 1] }[side];
return { bx: bx + ob[0], bz: bz + ob[1], lot: ob[2] * 5 + (4 - i) };
}
if (dir.rel === "blocks") {
var step = (side === 0 || side === 2) ? [dir.n, 0] : [0, dir.n];
return { bx: bx + step[0], bz: bz + step[1], lot: k };
}
if (dir.rel === "along")
return { bx: bx, bz: bz, lot: side * 5 + Math.min(4, i + dir.n) };
if (dir.rel === "corner")
return { bx: bx, bz: bz, lot: ((side + 1) % 4) * 5 + 0 };
if (dir.rel === "cornerlot")
return { bx: bx, bz: bz, lot: side * 5 + (i < 2 ? 0 : 4) };
if (dir.rel === "end")
return { bx: bx, bz: bz, lot: side * 5 + 4 };
if (dir.rel === "next")
return { bx: bx, bz: bz, lot: side * 5 + Math.min(4, i + 1) };
if (dir.rel === "behind")
return { bx: bx, bz: bz, lot: ((side + 2) % 4) * 5 + (4 - i) };
return { bx: bx, bz: bz, lot: k };
},
function (dir, arch, attrs) {
var g = store.grid;
var slot = null;
if (dir && store.lastLot)
slot = relativeLot(dir, store.lastLot);
if (!slot)
slot = freeLotNear(g.bx, g.bz, g.lot);
var fit = fitStructure(arch || "house", attrs || {}, slot, store.here || 0);
ensureStreets(fit.bx, fit.bz);
var spot = { x: fit.x, z: fit.z, rot: fit.rot };
spot.addr = addressOf(fit.bx, fit.bz, fit.k);
spot.lot = fit.k;
spot.bx = fit.bx;
spot.bz = fit.bz;
g.bx = fit.bx;
g.bz = fit.bz;
g.lot = fit.k + 1;
if (g.lot >= LOTS) {
g.lot = 0;
if (Math.random() < 0.5)
g.bx += (Math.random() < 0.5 ? 1 : -1);
else
g.bz += (Math.random() < 0.5 ? 1 : -1);
}
return spot;
},
function (arch, label, attrs, opts) {
if (!KIT[arch])
arch = "house";
opts = opts || {};
var awayFrom = (opts.away && typeof stepAway === "function") ? stepAway(opts.away) : null;
if (KIT[arch].cat === "being" && !opts.forceNew) {
var ch = resolveCharacter(arch, label, attrs);
if (ch.objId) {
var ex = specById(ch.objId);
if (ex) {
ex.attrs = Object.assign({}, ex.attrs, attrs || {});
if (ch.awake)
ex.solid = true;
applyLook(ex, opts.look, opts.sex);
refresh(ex);
save();
return ex;
}
}
}
var s = spotFor(arch, opts.dir, attrs);
if (awayFrom && opts.away && (opts.away.blocks || 0) >= 1 && KIT[arch].cat === "structure") {
var ref = store.lastId ? specById(store.lastId) : null;
var from = (ref && (ref.realm || 0) === (store.here || 0)) ? { x: ref.x, z: ref.z } : blockOrigin(awayFrom.bx, awayFrom.bz);
var want = (opts.away.blocks) * PITCH * 0.85;
var dx = s.x - from.x, dz = s.z - from.z, got = Math.hypot(dx, dz);
if (got < want) {
var k = want / (got || 1);
if (!got) {
dx = 0;
dz = -want;
k = 1;
}
s.x = from.x + dx * k;
s.z = from.z + dz * k;
s.bx = Math.round(s.x / PITCH);
s.bz = Math.round(s.z / PITCH);
s.lot = undefined;
s.addr = addressOf(s.bx, s.bz, 0);
ensureStreets(s.bx, s.bz);
}
}
var spec = { id: uid(), archetype: arch, label: label || arch, attrs: attrs || {},
x: s.x, z: s.z, rot: s.rot, sign: opts.sign || null, note: opts.note || null,
solid: !!opts.solid, detail: 1, addr: s.addr || null, name: null, nights: [store.session],
bx: s.bx, bz: s.bz, lot: (s.lot === undefined ? null : s.lot) };
if (opts.name) {
spec.name = opts.name;
spec.named = "stated";
}
else {
spec.name = nameFor(spec, s.addr || { num: 1, street: streetName("ns", 0) });
spec.named = "provisional";
}
markStale(spec.x, spec.z);
if (KIT[arch].cat === "structure" && s.lot !== undefined) {
claimLots(spec);
store.lastLot = { bx: s.bx, bz: s.bz, lot: s.lot };
}
if (PEOPLE[arch])
applyLook(spec, opts.look, opts.sex);
if (store.here)
spec.realm = store.here;
viewAt = null;
if (typeof cfg === "function" && cfg().solidAll !== false && KIT[arch].cat !== "being")
spec.solid = true;
if (awayFrom && typeof stepBack === "function")
stepBack(awayFrom);
if (opts.away && opts.away.why)
spec.awayNote = opts.away.why;
store.objects.push(spec);
if (s.home) {
var hm = specById(s.home);
if (hm)
hm.parked = spec.id;
}
addMesh(spec);
if (KIT[arch].cat === "being") {
clearFillersNear(spec.x, spec.z, 12);
var c = opts.forceNew ? newCharacter(arch, label, attrs) : resolveCharacter(arch, label, attrs);
c.objId = spec.id;
c.x = spec.x;
c.z = spec.z;
c.anchor = { x: spec.x, z: spec.z };
if (attrs && attrs.ridden)
c.rider = "dreamt";
spec.charId = c.id;
}
if (KIT[arch].cat === "structure") {
store.lastId = spec.id;
if (typeof housePeople === "function")
housePeople(spec);
}
if (KIT[arch].cat !== "being" && KIT[arch].cat !== "vehicle")
store.lastAny = spec.id;
updateCount();
save();
return spec;
}
];
});
