/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BLOCK = 90, STREET = 18, PITCH = BLOCK + STREET, LOTS = 20;
function blockOrigin(bx, bz) { return { x: bx * PITCH, z: bz * PITCH }; }
function lotKey(bx, bz, k) { return bx + ":" + bz + ":" + k; }
function lotFree(bx, bz, k) {
if (!store.lots)
store.lots = {};
return !store.lots[lotKey(bx, bz, k)];
}
function takeLot(bx, bz, k, id) {
if (!store.lots)
store.lots = {};
store.lots[lotKey(bx, bz, k)] = id;
}
function freeLotNear(bx, bz, k) { return __ZC(45, 0, this, arguments, new.target); }
var SPATIAL = [
[/\b(?:on|at)\s+the\s+(?:other|opposite)\s+side(?:\s+of\s+the\s+(?:street|road))?\b/, "opposite", 1],
[/\bacross\s+(?:the\s+(?:street|road)\s+)?from\b/, "opposite", 1],
[/\bopposite\b/, "opposite", 1],
[/\b(?:two|2)\s+blocks?\b/, "blocks", 2],
[/\b(?:three|3)\s+blocks?\b/, "blocks", 3],
[/\b(?:four|4)\s+blocks?\b/, "blocks", 4],
[/\b(?:a|one|1)\s+block\b/, "blocks", 1],
[/\bblocks?\s+(?:down|over|away|up)\b/, "blocks", 1],
[/\baround\s+the\s+corner\b/, "corner", 1],
[/\bon\s+the\s+corner\b/, "cornerlot", 1],
[/\bat\s+the\s+(?:end|bottom|top)\s+of\s+the\s+(?:street|road|block)\b/, "end", 1],
[/\b(?:next\s+to|beside|alongside|adjacent\s+to|right\s+by)\b/, "next", 1],
[/\b(?:behind|at\s+the\s+back\s+of|round\s+the\s+back)\b/, "behind", 1],
[/\b(?:further\s+)?(?:down|along|up)\s+the\s+(?:street|road)\b/, "along", 2]
];
function spatialIn(text) {
if (!text)
return null;
var low = " " + String(text).toLowerCase() + " ";
for (var i = 0; i < SPATIAL.length; i++)
if (SPATIAL[i][0].test(low))
return { rel: SPATIAL[i][1], n: SPATIAL[i][2] };
return null;
}
function stepLot(dir, from) { return __ZC(45, 1, this, arguments, new.target); }
function relativeLot(dirs, from) {
if (!from || from.lot === undefined || from.lot === null)
return null;
if (!dirs || !dirs.length)
return null;
var at = { bx: from.bx, bz: from.bz, lot: from.lot };
for (var i = 0; i < dirs.length; i++)
at = stepLot(dirs[i], at);
return freeLotNear(at.bx, at.bz, at.lot);
}
function nextLot(dir, arch, attrs) { return __ZC(45, 2, this, arguments, new.target); }
function lotSpot(bx, bz, k) {
var o = blockOrigin(bx, bz);
var side = Math.floor(k / 5) % 4, i = k % 5;
var off = -36 + i * 18, back = 30;
if (side === 0)
return { x: o.x + off, z: o.z + back, rot: 0 };
if (side === 1)
return { x: o.x + back, z: o.z - off, rot: Math.PI / 2 };
if (side === 2)
return { x: o.x - off, z: o.z - back, rot: Math.PI };
return { x: o.x - back, z: o.z + off, rot: -Math.PI / 2 };
}
function ensureStreets(bx, bz) {
var k = bx + ":" + bz;
if (store.streets.indexOf(k) > -1)
return;
store.streets.push(k);
var o = blockOrigin(bx, bz), h = (BLOCK + STREET) / 2;
drawStreet(o.x - h, o.z + h, o.x + h, o.z + h);
drawStreet(o.x - h, o.z - h, o.x + h, o.z - h);
drawStreet(o.x + h, o.z - h, o.x + h, o.z + h);
drawStreet(o.x - h, o.z - h, o.x - h, o.z + h);
}
function outward(base, dist, along) {
var r = base.rot, a = along || 0;
if (Math.abs(r) < 0.01)
return { x: base.x + a, z: base.z + dist };
if (Math.abs(r - Math.PI / 2) < 0.01)
return { x: base.x + dist, z: base.z - a };
if (Math.abs(Math.abs(r) - Math.PI) < 0.01)
return { x: base.x - a, z: base.z - dist };
return { x: base.x - dist, z: base.z + a };
}
function spotFor(arch, dir, attrs) {
var def = KIT[arch] || KIT.house, cat = def.cat;
var g = store.grid, o = blockOrigin(g.bx, g.bz);
if (cat === "structure")
return nextLot(dir, arch, attrs);
var base = lotSpot(g.bx, g.bz, Math.max(0, g.lot - 1));
base.addr = addressOf(g.bx, g.bz, Math.max(0, g.lot - 1));
var jitter = function () { return (Math.random() - 0.5) * 14; };
if (cat === "vehicle") {
if (ROADGOING[arch])
return vehicleSpot(arch);
var v = outward(base, BLOCK / 2 + STREET / 2 - 4, jitter() * 1.6);
return { x: v.x, z: v.z, rot: base.rot, addr: base.addr };
}
if (arch === "dragon" || def.big) {
store.open = (store.open || 0) + 1;
var hd = heartOf(store.here || 0), an = store.open * 2.39996, rd = 160 + (store.open % 4) * 40;
return { x: hd.x + Math.cos(an) * rd, z: hd.z + Math.sin(an) * rd, rot: Math.random() * 6.283, addr: base.addr };
}
if (cat === "being") {
var b = outward(base, BLOCK / 2 - 3, jitter());
return { x: b.x, z: b.z, rot: Math.random() * 6.283, addr: base.addr };
}
if (cat === "infra") {
var i = outward(base, BLOCK / 2 - 1.5, jitter());
return { x: i.x, z: i.z, rot: base.rot, addr: base.addr };
}
if (def.size[0] > 25) {
store.open++;
var h = heartOf(store.here || 0), townR = 50;
(store.streets || []).forEach(function (k) {
var p = k.split(":"), bo = blockOrigin(+p[0], +p[1]);
townR = Math.max(townR, Math.sqrt((bo.x - h.x) * (bo.x - h.x) + (bo.z - h.z) * (bo.z - h.z)) + 60);
});
var ang = store.open * 2.39996, rad = townR + 40 + def.size[0] * 0.5 + (store.open % 4) * 35;
return { x: h.x + Math.cos(ang) * rad, z: h.z + Math.sin(ang) * rad, rot: Math.random() * 6.283, addr: base.addr };
}
var n = outward(base, BLOCK / 2 - 6, jitter());
return { x: n.x + jitter() * 0.4, z: n.z + jitter() * 0.4, rot: Math.random() * 6.283, addr: base.addr };
}
function applyLook(spec, look, sex) {
if (!PEOPLE[spec.archetype])
return;
lookOf(spec);
if (sex)
setLook(spec, "sex", sex, "stated");
if (look)
for (var k in look)
setLook(spec, k, look[k], "stated");
}
function place(arch, label, attrs, opts) { return __ZC(45, 3, this, arguments, new.target); }
