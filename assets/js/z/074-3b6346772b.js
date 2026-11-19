/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(74, function () {
"use strict";
return [
function () { return F([P(box(.95, .1, 2), mL(WHITEISH), 0, .65, 0), P(box(.9, .12, 1.9), mL(0xDCE8F0), 0, .76, 0), P(box(.05, .65, .05), mL(METAL), -.45, .32, -.95), P(box(.05, .65, .05), mL(METAL), .45, .32, -.95), P(box(.05, .65, .05), mL(METAL), -.45, .32, .95), P(box(.05, .65, .05), mL(METAL), .45, .32, .95), P(box(.05, 2, .8), mL(0x9FC8C0), .7, 1, 0)]); },
function () {
var g = new THREE.Group(), n = 14, r = STAIR_RISE / n, run = STAIR_RUN / n, ang = Math.atan2(STAIR_RISE, STAIR_RUN), len = Math.hypot(STAIR_RUN, STAIR_RISE);
for (var i = 0; i < n; i++) {
g.add(P(box(1.3, r, run * 1.08), mL(WOOD), 0, (i + .5) * r, -i * run));
}
g.add(P(box(.06, .06, len), mL(DARKWOOD), .68, STAIR_RISE / 2 + .95, -STAIR_RUN / 2, ang));
g.add(P(box(.06, .06, len), mL(DARKWOOD), -.68, STAIR_RISE / 2 + .95, -STAIR_RUN / 2, ang));
return g;
},
function (spec) {
if (typeof addSciFurniture === "function")
addSciFurniture();
if (PLANS[spec.archetype])
return PLANS[spec.archetype];
var d = KIT[spec.archetype] || KIT.house, a = spec.attrs || {}, sc = a.s || 1;
var w = Math.max(6, Math.min(30, d.size[0] * sc * 0.8)), dp = Math.max(6, Math.min(34, d.size[2] * sc * 0.8));
var floorArea = w * dp;
if (floorArea > 360)
return { mode: "mixed", ground: "lobby", w: w, d: dp, upper: ["bedroom", "office", "bathroom", "chamber"],
wall: 0xDCD4C4, floor: "wood", lift: d.size[1] > 40 };
if (floorArea > 150)
return { mode: "rooms", rooms: ["living", "kitchen", "bedroom", "bedroom", "bathroom"], wall: 0xDCD4C4, floor: "wood" };
return { mode: "hall", w: w, d: dp, fill: "cozy", wall: 0xDCD4C4, floor: "wood" };
},
function (rooms, levels) {
var out = [];
for (var i = 0; i < levels; i++)
out.push([]);
var ground = [], upper = [];
rooms.forEach(function (r) { (GROUND_ROOMS[r] ? ground : upper).push(r); });
if (!ground.length)
ground = upper.splice(0, Math.max(1, Math.ceil(upper.length / levels)));
out[0] = ground;
var per = Math.max(1, Math.ceil(upper.length / Math.max(1, levels - 1)));
for (var L = 1; L < levels; L++)
out[L] = upper.splice(0, per);
for (var L2 = 1; L2 < levels; L2++)
if (!out[L2].length)
out[L2] = ["bedroom", "bathroom"];
return out;
},
function (text) {
if (!text)
return;
(text.match(/[^.!?]+[.!?]?/g) || []).forEach(function (sent) {
var s = " " + deaccent(sent).toLowerCase() + " ";
if (!INSIDE_CUE.test(s))
return;
var b = insideOwner(s);
if (!b)
return;
var I = b.inside || (b.inside = { rooms: [], items: [] });
var roomHere = null;
ROOMWORDS.forEach(function (r) { if (r[1].test(s)) {
roomHere = r[0];
if (I.rooms.indexOf(r[0]) === -1)
I.rooms.push(r[0]);
} });
ITEMWORDS.forEach(function (it) { if (it[1].test(s) && !I.items.some(function (x) { return x.k === it[0] && x.room === roomHere; }))
I.items.push({ k: it[0], room: roomHere }); });
var m = /\b([a-z]+) (walls|wallpaper)\b/.exec(s) || /\bwalls were ([a-z]+)\b/.exec(s) || /\bpainted ([a-z]+)\b/.exec(s);
if (m && NAMED[m[1]] !== undefined)
I.wall = NAMED[m[1]];
FLOORWORD.forEach(function (f) { if (f[1].test(s))
I.floor = f[0]; });
if (/\b(bigger|larger) (on the )?inside|\bbigger than it looked|\bmuch bigger inside\b/.test(s))
I.big = true;
if (/\b(endless|never-ending|went on forever|kept going|more and more rooms|rooms that went on)\b/.test(s))
I.endless = true;
if (meshes && INT && INT.spec === b)
rebuildInterior();
});
},
function (s) {
var best = null;
store.objects.forEach(function (o) {
var d = KIT[o.archetype];
if (!d || d.cat !== "structure" || o.filler)
return;
if ((VOCAB[o.archetype] || []).some(function (w) { return s.indexOf(" " + w + " ") > -1; }))
best = o;
});
if (best)
return best;
var last = store.lastId ? specById(store.lastId) : null;
return last && KIT[last.archetype] && KIT[last.archetype].cat === "structure" ? last : null;
},
function (spec) {
if (typeof addSciFurniture === "function")
addSciFurniture();
var plan = planOf(spec), I = spec.inside || { rooms: [], items: [] };
var H = plan.h || INT_H, big = I.big ? 1.6 : (plan.big || 1);
var FP = (function () {
try {
var d0 = KIT[spec.archetype] || KIT.house, a0 = spec.attrs || {}, s0 = a0.s || 1, B0 = bodyOf(levelParts(d0, spec));
if (!B0)
return { w: 0, d: 0 };
return { w: Math.min(56, B0.w * s0 * (a0.w || 1) * 0.86), d: Math.min(56, B0.d * s0 * (a0.d || 1) * 0.86) };
}
catch (e) {
return { w: 0, d: 0 };
}
})();
var ox = INT_X0 - intSlot(spec) * 500, oz = 0;
var root = new THREE.Group();
root.position.set(ox, 0, oz);
var wallCol = I.wall !== undefined ? I.wall : plan.wall, floorKind = I.floor || plan.floor;
var wallMat = new THREE.MeshLambertMaterial({ color: wallCol, side: THREE.DoubleSide });
var walls = [], spots = [], items = [], lights = [], windows = [];
var yOff = 0, lvl = 0;
function wallBox(x, z, w, d, h) {
var hh = h || ((typeof FLOOR !== "undefined") ? FLOOR : H);
var m = P(box(w, hh, d), wallMat, x, yOff + hh / 2, z);
root.add(m);
walls.push({ x: ox + x, z: oz + z, rot: 0, hw: w / 2, hd: d / 2, h: hh, level: lvl });
}
function wallLine(x1, z1, x2, z2, gaps, gw) {
gw = gw || 1.4;
var horiz = Math.abs(z1 - z2) < 0.01, a = horiz ? Math.min(x1, x2) : Math.min(z1, z2), b = horiz ? Math.max(x1, x2) : Math.max(z1, z2);
var cuts = (gaps || []).slice().sort(function (p, q) { return p - q; }), at = a;
cuts.concat([null]).forEach(function (c) {
var end = c === null ? b : c - gw / 2;
if (end - at > 0.05) {
var mid = (at + end) / 2, len = end - at;
if (horiz)
wallBox(mid, z1, len, .2);
else
wallBox(x1, mid, .2, len);
}
if (c !== null) {
var lint = P(box(horiz ? gw : .2, H - 2.3, horiz ? .2 : gw), wallMat, horiz ? c : x1, yOff + 2.3 + (H - 2.3) / 2, horiz ? z1 : c);
root.add(lint);
at = c + gw / 2;
}
});
}
var keepouts = [];
function keepoutAt(k, x, z) {
if (k === "stairs")
return null;
for (var i = 0; i < keepouts.length; i++) {
var o = keepouts[i];
if (o.level !== lvl)
continue;
if (Math.abs(x - o.x) < o.hw && Math.abs(z - o.z) < o.hd)
return o;
}
return null;
}
var wpKey = (typeof workplaceKeyOf === "function") ? workplaceKeyOf(spec) : null;
var wpSaved = (wpKey && typeof workplaceDecor === "function") ? workplaceDecor(wpKey) : null;
var asBuilt = [];
var media = (typeof homeMediaWanted === "function") && homeMediaWanted(spec), mediaSet = false;
function put(k, x, z, rot) {
if (!FURN[k])
return;
if (k !== "stairs" && !FIXED_FURN[k]) {
asBuilt.push({ k: k, x: +x.toFixed(2), z: +z.toFixed(2), r: +(rot || 0).toFixed(3), l: lvl });
if (wpSaved)
return;
}
realPut(k, x, z, rot);
}
function realPut(k, x, z, rot) {
if (!FURN[k])
return;
var block = keepoutAt(k, x, z);
if (block) {
if (block.lift)
x = (x <= block.x) ? (block.x - block.hw - 0.6) : (block.x + block.hw + 0.6);
else
z = (z <= block.z) ? (block.z - block.hd - 1.1) : (block.z + block.hd + 1.1);
z = Math.max(-D / 2 + 0.4, Math.min(D / 2 - 0.4, z));
}
var it = FURN[k]();
it.userData.furn = k;
it.position.set(x, yOff, z);
it.rotation.y = rot || 0;
root.add(it);
if (SOLIDFURN[k]) {
var bb = furnBox(k);
var c = Math.abs(Math.cos(rot || 0)), s = Math.abs(Math.sin(rot || 0));
walls.push({ x: ox + x, z: oz + z, rot: 0, hw: (c * bb[0] + s * bb[1]) / 2, hd: (s * bb[0] + c * bb[1]) / 2, h: 1.2, level: lvl });
}
items.push(it);
return it;
}
var W, D, exitZ, levels = levelsOf(spec), FLOOR = H + 0.5, stairsAt = [];
var lifts = [], holes = [], slabs = [];
STAIR_RISE = FLOOR;
STAIR_RUN = FLOOR * 1.15;
function fitStairs() {
var room = Math.min(W || 99, D || 99);
STAIR_RISE = FLOOR;
STAIR_RUN = Math.max(2.8, Math.min(FLOOR * 1.15, room * 0.72));
}
function flight(xc, zHead, from, wide) {
fitStairs();
var hw = (wide || 1.5) / 2, hd = STAIR_RUN / 2, zc = zHead + hd;
lvl = from;
yOff = from * FLOOR;
put("stairs", xc, zc + hd, 0);
stairsAt.push({ x: ox + xc, z: oz + zc, from: from, rot: Math.PI, hw: hw + 0.35, hd: hd });
holes.push({ level: from + 1, x: xc, z: zc, hw: hw + 0.35, hd: hd + 0.25 });
}
function planSlab(L, Wf, Df, y) { slabs.push({ L: L, W: Wf, D: Df, y: y }); }
function buildSlabs() { slabs.forEach(function (s) { slab(s.L, s.W, s.D, s.y); }); }
function slab(L, Wf, Df, y) {
var mat = new THREE.MeshLambertMaterial({ color: FLOORCOL[floorKind] || 0x7A5634 });
var cut = holes.filter(function (h) { return h.level === L; });
if (!cut.length) {
root.add(P(box(Wf, .12, Df), mat, 0, y, 0));
return;
}
var h = cut[0];
var z0 = Math.max(-Df / 2, h.z - h.hd), z1 = Math.min(Df / 2, h.z + h.hd);
if (z0 + Df / 2 > 0.05)
root.add(P(box(Wf, .12, z0 + Df / 2), mat, 0, y, (-Df / 2 + z0) / 2));
if (Df / 2 - z1 > 0.05)
root.add(P(box(Wf, .12, Df / 2 - z1), mat, 0, y, (z1 + Df / 2) / 2));
var xL = h.x - h.hw, xR = h.x + h.hw, band = z1 - z0, bz = (z0 + z1) / 2;
if (xL + Wf / 2 > 0.05)
root.add(P(box(xL + Wf / 2, .12, band), mat, (-Wf / 2 + xL) / 2, y, bz));
if (Wf / 2 - xR > 0.05)
root.add(P(box(Wf / 2 - xR, .12, band), mat, (xR + Wf / 2) / 2, y, bz));
}
function roomFloor(L, here, Wf, Df, rw, rd, hall, wayOut) {
lvl = L;
yOff = L * FLOOR;
var zTop = -Df / 2, zFront = Df / 2, left = [], right = [];
here.forEach(function (r, i) { (i % 2 ? right : left).push(r); });
if (wayOut)
wallLine(-Wf / 2, zFront, Wf / 2, zFront, [0], 1.8);
else
wallLine(-Wf / 2, zFront, Wf / 2, zFront);
wallLine(-Wf / 2, zTop, Wf / 2, zTop);
wallLine(-Wf / 2, zTop, -Wf / 2, zFront);
wallLine(Wf / 2, zTop, Wf / 2, zFront);
[[left, -1], [right, 1]].forEach(function (side) {
var list = side[0], sd = side[1], gaps = [];
list.forEach(function (r, i) {
var z0 = zTop + i * rd, zc = z0 + rd / 2, xc = sd * (hall / 2 + rw / 2);
gaps.push(zc);
if (i > 0)
wallLine(sd * hall / 2, z0, sd * Wf / 2, z0);
furnishRoom(r, xc, zc, rw, rd, sd, put);
if (media && !mediaSet && r === "living") {
mediaSet = true;
homeMediaRoom(realPut, xc, zc, rw, rd, sd);
}
spots.push({ x: xc, z: zc + rd * .2, room: r, level: L });
spots.push({ x: xc + sd * 1.2, z: zc - rd * .25, room: r, level: L });
lights.push({ x: xc, z: zc, y: yOff });
windows.push({ x: sd * (Wf / 2 - .12), z: zc, ry: sd > 0 ? -Math.PI / 2 : Math.PI / 2, y: yOff, big: (r === "office" || r === "techoffice") });
});
if (list.length)
wallLine(sd * hall / 2, zTop + list.length * rd, sd * Wf / 2, zTop + list.length * rd);
wallLine(sd * hall / 2, zTop, sd * hall / 2, zTop + list.length * rd, gaps);
});
for (var hz = zTop + 3; hz < zFront - 3; hz += 6)
lights.push({ x: 0, z: hz, y: yOff });
spots.push({ x: 0, z: zFront - 4, room: "hallway", level: L });
if (L > 0)
planSlab(L, Wf, Df, yOff - 0.06);
return { zTop: zTop, zFront: zFront };
}
function sideRooms(list, Wf, Df, L) {
if (!list || !list.length)
return;
lvl = L;
yOff = L * FLOOR;
var depth = 4.6, n = list.length, along = (Df - 4) / n;
list.forEach(function (r, i) {
var sd = i % 2 ? 1 : -1, k = Math.floor(i / 2);
var zc = -Df / 2 + 2 + along * (k + 0.5) * 2;
if (zc > Df / 2 - 2)
zc = Df / 2 - 2 - along * 0.5;
var xc = sd * (Wf / 2 + depth / 2);
wallLine(sd * Wf / 2, zc - along * 0.9, sd * (Wf / 2 + depth), zc - along * 0.9);
wallLine(sd * Wf / 2, zc + along * 0.9, sd * (Wf / 2 + depth), zc + along * 0.9);
wallLine(sd * (Wf / 2 + depth), zc - along * 0.9, sd * (Wf / 2 + depth), zc + along * 0.9);
wallLine(sd * Wf / 2, zc - along * 0.9, sd * Wf / 2, zc + along * 0.9, [zc], 1.6);
furnishRoom(r, xc, zc, depth, along * 1.6, sd, put);
spots.push({ x: xc, z: zc, room: r, level: L });
lights.push({ x: xc, z: zc, y: yOff });
});
}
function stairLaneX(SL) { return (SL % 2 ? 1 : -1) * 1.75; }
function stairKeepouts() {
fitStairs();
for (var SL = 0; SL < levels - 1; SL++) {
var zc = D / 2 - 2.2 - STAIR_RUN / 2, x = stairLaneX(SL);
keepouts.push({ level: SL, x: x, z: zc, hw: 0.7 + 0.6, hd: STAIR_RUN / 2 + 0.6 });
keepouts.push({ level: SL + 1, x: x, z: zc, hw: 0.7 + 0.6, hd: STAIR_RUN / 2 + 0.6 });
}
}
function liftKeepouts() {
if (!(plan.lift && levels > 2))
return;
for (var L = 0; L < levels; L++)
keepouts.push({ level: L, x: plan.liftLeft ? (-W / 2 + 2.2) : 0, z: -D / 2 + 1.45, hw: 1.9, hd: 1.9, lift: true });
}
function liftShaft(Wf, Df, levels) {
var lx = plan.liftLeft ? (-Wf / 2 + 2.2) : 0, lz = -Df / 2 + 1.45, doorGap = 0.55, doorW = (2.6 - doorGap) / 2;
for (var L = 0; L < levels; L++) {
lvl = L;
yOff = L * FLOOR;
root.add(P(box(2.6, .12, 2.6), new THREE.MeshLambertMaterial({ color: 0x4A4E56 }), lx, yOff + .04, lz));
[-1, 1].forEach(function (sd) { root.add(P(box(.14, H - .4, 2.6), new THREE.MeshLambertMaterial({ color: 0x6A6E76 }), lx + sd * 1.3, yOff + (H - .4) / 2, lz)); });
root.add(P(box(2.6, H - .4, .14), new THREE.MeshLambertMaterial({ color: 0x6A6E76 }), lx, yOff + (H - .4) / 2, lz - 1.3));
var doorH = H - .7, doorY = yOff + doorH / 2 + .15, doorMat = new THREE.MeshLambertMaterial({ color: 0x9AA0AA });
root.add(P(box(doorW, doorH, .1), doorMat, lx - doorGap / 2 - doorW / 2, doorY, lz + 1.28));
root.add(P(box(doorW, doorH, .1), doorMat, lx + doorGap / 2 + doorW / 2, doorY, lz + 1.28));
root.add(P(box(2.6, .08, .1), new THREE.MeshLambertMaterial({ color: 0x5A5E68 }), lx, yOff + doorH + .19, lz + 1.28));
root.add(P(box(.5, .22, .1), mG(0xFFD08A, 1), lx + 1.0, yOff + 1.5, lz + 1.3));
for (var d = 0; d < levels; d++) {
root.add(P(box(.16, .16, .06), mG(d === L ? 0xFFD08A : 0x3A3E48, 1), lx - 1.0, yOff + 1.1 + d * 0.22, lz + 1.3));
}
walls.push({ x: ox + lx, z: oz + lz - 1.3, rot: 0, hw: 1.3, hd: .1, h: H, level: L });
}
lifts.push({ x: ox + lx, z: oz + lz });
lvl = 0;
yOff = 0;
}
if (plan.mode === "rooms" || plan.mode === "mixed") {
var isMixed = plan.mode === "mixed";
var rooms = (isMixed ? (plan.upper || ["office"]) : plan.rooms).slice();
(I.rooms || []).forEach(function (r) { if (rooms.indexOf(r) === -1)
rooms.push(r); });
(I.items || []).forEach(function (it) { if (it.room && rooms.indexOf(it.room) === -1)
rooms.push(it.room); });
if (I.endless)
for (var e = 0; e < 8; e++)
rooms.push(["bedroom", "study", "hallway", "living"][e % 4]);
var rw = 7 * big, rd = 6 * big, hall = 5.2;
if (isMixed) {
W = Math.max(plan.w * big, hall + rw * 2, FP.w);
D = Math.max(plan.d * big, Math.ceil(rooms.length / 2) * rd + 7, FP.d);
var moreUp = ["office", "meeting", "office", "archive", "kitchenette", "bathroom"];
for (var mi = 0; Math.ceil(rooms.length / 2) * rd + 7 < D - rd && mi < 24; mi++)
rooms.push(moreUp[mi % moreUp.length]);
stairKeepouts();
liftKeepouts();
var zTop0 = -D / 2, zFront0 = D / 2;
lvl = 0;
yOff = 0;
wallLine(-W / 2, zFront0, W / 2, zFront0, [0], 2.2);
wallLine(-W / 2, zTop0, W / 2, zTop0);
wallLine(-W / 2, zTop0, -W / 2, zFront0);
wallLine(W / 2, zTop0, W / 2, zFront0);
fillHall(plan.ground || "lobby", W, D, put, spots);
spots.forEach(function (q) { if (q.level === undefined)
q.level = 0; });
for (var glz = -D / 2 + 4; glz < D / 2 - 2; glz += 7)
for (var glx = -W / 2 + 4; glx < W / 2 - 2; glx += 8)
lights.push({ x: glx, z: glz, y: 0 });
for (var gwz = -D / 2 + 3; gwz < D / 2 - 2; gwz += 5) {
windows.push({ x: -W / 2 + .12, z: gwz, ry: Math.PI / 2, y: 0 });
windows.push({ x: W / 2 - .12, z: gwz, ry: -Math.PI / 2, y: 0 });
}
for (var L2 = 1; L2 < levels; L2++) {
if (plan.locked && L2 === plan.locked.level) {
lvl = L2;
yOff = L2 * FLOOR;
wallLine(-W / 2, D / 2, W / 2, D / 2);
wallLine(-W / 2, -D / 2, W / 2, -D / 2);
wallLine(-W / 2, -D / 2, -W / 2, D / 2);
wallLine(W / 2, -D / 2, W / 2, D / 2);
fillHall("penthouse", W, D, put, spots);
spots.forEach(function (q) { if (q.level === undefined)
q.level = L2; });
for (var pz = -D / 2 + 4; pz < D / 2 - 2; pz += 6)
lights.push({ x: 0, z: pz, y: yOff });
for (var pw = -D / 2 + 3; pw < D / 2 - 2; pw += 4) {
windows.push({ x: -W / 2 + .12, z: pw, ry: Math.PI / 2, y: yOff, big: true });
windows.push({ x: W / 2 - .12, z: pw, ry: -Math.PI / 2, y: yOff, big: true });
}
planSlab(L2, W, D, yOff - 0.06);
}
else
roomFloor(L2, rooms, W, D, rw, rd, hall, false);
}
exitZ = zFront0;
}
else {
var moreRm = ["bedroom", "bathroom", "study", "living", "bedroom", "dining", "nursery", "bedroom"];
for (var mr = 0; Math.ceil(rooms.length / (2 * levels)) * rd + 7 < FP.d - rd && mr < 24; mr++)
rooms.push(moreRm[mr % moreRm.length]);
var byLevel = roomsByLevel(rooms, levels);
var widest = 0;
byLevel.forEach(function (list) { widest = Math.max(widest, Math.ceil(list.length / 2)); });
W = hall + rw * 2;
D = Math.max(2, widest) * rd + 7;
stairKeepouts();
liftKeepouts();
for (var L = 0; L < levels; L++)
roomFloor(L, byLevel[L], W, D, rw, rd, hall, L === 0);
if (levels) {
lvl = 0;
yOff = 0;
furnishRoom("hallway", 0, D / 2 - 2.5, hall, 4, 1, put);
}
exitZ = D / 2;
}
fitStairs();
for (var SL = 0; SL < levels - 1; SL++)
flight(stairLaneX(SL), D / 2 - 2.2 - STAIR_RUN, SL, 1.4);
if (plan.lift && levels > 2)
liftShaft(W, D, levels);
lvl = 0;
yOff = 0;
}
else if (plan.mode === "estate" && typeof estateBuild === "function") {
var ES = estateBuild({ plan: plan, spec: spec, levels: levels, FLOOR: FLOOR, H: H, root: root, wallMat: wallMat,
size: function (w, d) { W = w; D = d; },
level: function (L) { lvl = L; yOff = L * FLOOR; },
wall: wallLine, put: put, slab: planSlab, keepouts: keepouts, lights: lights, windows: windows, spots: spots,
solid: function (x, z, hw, hd, h) { walls.push({ x: ox + x, z: oz + z, rot: 0, hw: hw, hd: hd, h: h || 1.2, level: lvl }); },
stairs: function (xc, zHead, from, wide) { flight(xc, zHead, from, wide); },
run: function () { fitStairs(); return STAIR_RUN; },
tv: function (x, z, rot, rx, rz, rrot) { if (!media || mediaSet)
return; mediaSet = true; realPut("hometv", x, z, rot); realPut("homeradio", rx, rz, rrot); } });
W = ES.W;
D = ES.D;
exitZ = ES.exitZ;
lvl = 0;
yOff = 0;
}
else {
W = Math.max(plan.w * big, FP.w);
D = Math.max(plan.d * big, FP.d);
if (I.endless)
D *= 3;
liftKeepouts();
for (var HL = 0; HL < levels; HL++) {
lvl = HL;
yOff = HL * FLOOR;
if (HL === 0)
wallLine(-W / 2, D / 2, W / 2, D / 2, [0], 2.2);
else
wallLine(-W / 2, D / 2, W / 2, D / 2);
wallLine(-W / 2, -D / 2, W / 2, -D / 2);
wallLine(-W / 2, -D / 2, -W / 2, D / 2);
wallLine(W / 2, -D / 2, W / 2, D / 2);
if (HL < levels - 1) {
fitStairs();
var khw2 = 1.8 / 2, khd2 = STAIR_RUN / 2, farCornerK = HL % 2 === 0;
var kx = farCornerK ? (W / 2 - 2.4) : (-W / 2 + 2.4), kzh = farCornerK ? (-D / 2 + 2.4) : (D / 2 - 2.4 - STAIR_RUN);
keepouts.push({ level: HL, x: kx, z: kzh + khd2, hw: khw2 + 0.6, hd: khd2 + 0.6 });
}
fillHall(HL === 0 ? plan.fill : (plan.fill === "church" || plan.fill === "castle" ? plan.fill : "office"), W, D, put, spots);
spots.forEach(function (q) { if (q.level === undefined)
q.level = HL; });
(function () {
var pw = plan.w * big / 2, pd = plan.d * big / 2;
if (W / 2 < pw + 3 && D / 2 < pd + 3)
return;
var kind = HL === 0 ? plan.fill : "office";
var SET = { castle: ["hallbanner", "greatpillar", "benchin", "torch", "armchair", "hallbanner", "displaycase"], church: ["pew", "candles", "plant", "pew"],
library: ["bookshelf", "bookshelf", "table", "lamp"], shop: ["shelfgoods", "shelfgoods", "displaycase"], works: ["workbench", "crates", "barrel", "machine"],
bank: ["counterbank", "plant", "armchair"], court: ["benchin", "plant"], office: ["desk", "chair", "plant", "filecabinet"] }[kind] || ["plant", "benchin", "lamp", "rug", "armchair"];
var n = 0, wall = function (x, z, r) { put(SET[n++ % SET.length], x, z, r); };
for (var zz = -D / 2 + 3; zz < D / 2 - 4; zz += 4.5) {
if (W / 2 > pw + 2.5) {
wall(-W / 2 + 1.1, zz, Math.PI / 2);
wall(W / 2 - 1.1, zz, -Math.PI / 2);
}
}
for (var xx = -W / 2 + 4; xx < W / 2 - 4; xx += 5) {
if (Math.abs(xx) < 3)
continue;
if (D / 2 > pd + 2.5)
wall(xx, -D / 2 + 1.1, 0);
}
if (W > 24 && D > 24)
for (var gx = -W / 2 + 7; gx < W / 2 - 6; gx += 9)
for (var gz = -D / 2 + 7; gz < D / 2 - 8; gz += 9) {
if (Math.abs(gx) < pw && Math.abs(gz) < pd)
continue;
put(kind === "castle" ? "greatpillar" : "plant", gx, gz, 0);
}
})();
for (var lz = -D / 2 + 4; lz < D / 2 - 2; lz += 7)
for (var lx = -W / 2 + 4; lx < W / 2 - 2; lx += 8)
lights.push({ x: lx, z: lz, y: yOff });
var officeFloor = HL > 0 && plan.fill !== "church" && plan.fill !== "castle";
for (var wz = -D / 2 + 3; wz < D / 2 - 2; wz += 5) {
windows.push({ x: -W / 2 + .12, z: wz, ry: Math.PI / 2, y: yOff, big: officeFloor });
windows.push({ x: W / 2 - .12, z: wz, ry: -Math.PI / 2, y: yOff, big: officeFloor });
}
if (HL < levels - 1) {
fitStairs();
var farCorner = HL % 2 === 0;
if (farCorner)
flight(W / 2 - 2.4, -D / 2 + 2.4, HL, 1.8);
else
flight(-W / 2 + 2.4, D / 2 - 2.4 - STAIR_RUN, HL, 1.8);
}
lvl = HL;
yOff = HL * FLOOR;
if (HL > 0)
planSlab(HL, W, D, yOff - 0.06);
}
sideRooms(plan.side, W, D, 0);
if (plan.lift && levels > 2)
liftShaft(W, D, levels);
lvl = 0;
yOff = 0;
exitZ = D / 2;
}
if (wpSaved) {
var keepL = lvl, keepY = yOff;
wpSaved.forEach(function (p) {
if (!p || !FURN[p.k] || p.k === "stairs" || FIXED_FURN[p.k])
return;
var L = Math.max(0, Math.min(levels - 1, p.l | 0));
lvl = L;
yOff = L * FLOOR;
realPut(p.k, +p.x || 0, +p.z || 0, +p.r || 0);
});
lvl = keepL;
yOff = keepY;
}
else if (wpKey && !/^lot:/.test(wpKey) && typeof workplaceFit === "function") {
var keepL2 = lvl, keepY2 = yOff;
lvl = 0;
yOff = 0;
workplaceFit(wpKey, W, D, asBuilt).forEach(function (p) { asBuilt.push(p); realPut(p.k, p.x, p.z, p.r); });
lvl = keepL2;
yOff = keepY2;
}
if (media && !mediaSet && plan.mode !== "rooms") {
var keepL3 = lvl, keepY3 = yOff;
lvl = 0;
yOff = 0;
mediaSet = true;
homeMediaHall(realPut, W, D, items.filter(function (o) { return Math.abs(o.position.y) < 0.5; }));
lvl = keepL3;
yOff = keepY3;
}
var stage = spec.dpInside ? { n: 0, fire: false } : null;
(I.items || []).forEach(function (it, i) {
if (stage && !it.room) {
lvl = 0;
yOff = 0;
var zb = -D / 2;
if (it.k === "fireplace" && !stage.fire) {
stage.fire = true;
put(it.k, 0, zb + .45, 0);
}
else if (it.k === "goldpile")
put(it.k, 0, zb + 3.6, 0);
else {
var j = stage.n++, side = j % 2 ? 1 : -1, row = Math.floor(j / 2);
put(it.k, side * (2.6 + row * 1.9), zb + 2.2 + row * .9, 0);
}
var last = items[items.length - 1];
if (last && last.userData.furn === it.k)
last.userData.dpDream = 1;
return;
}
var sp = spots.filter(function (p) { return it.room && p.room === it.room; })[0] || spots[i % Math.max(1, spots.length)] || { x: 0, z: 0 };
put(it.k, sp.x + ((i * 37) % 5 - 2) * .6, sp.z - 1.2 - ((i * 13) % 3) * .5, 0);
});
var fl = P(box(W, .1, D), new THREE.MeshLambertMaterial({ color: FLOORCOL[floorKind] || 0x7A5634 }), 0, -.05, 0);
var tx = typeof texOf === "function" ? texOf((floorKind === "checker" || floorKind === "tile") ? "floortile" : floorKind === "carpet" ? null : floorKind) : null;
if (tx) {
fl.material.map = tx;
fl.material.needsUpdate = true;
}
root.add(fl);
if (floorKind === "checker")
for (var ci = 0; ci < Math.min(W * D / 4, 900); ci++) {
var cx = -W / 2 + 1 + (ci % Math.floor(W / 2)) * 2, cz = -D / 2 + 1 + Math.floor(ci / Math.floor(W / 2)) * 2;
if (cz > D / 2)
break;
if (((Math.round(cx / 2) + Math.round(cz / 2)) & 1) === 0)
root.add(P(box(2, .02, 2), mL(0x1A1A1E), cx, .01, cz));
}
root.add(P(box(W + 1.2, .3, D + 1.2), new THREE.MeshLambertMaterial({ color: shade(wallCol, -.12), side: THREE.DoubleSide }), 0, (levels - 1) * FLOOR + H + .15, 0));
var winMats = [], winGlints = [];
root.add(P(box(W + 2.4, .4, D + 2.4), new THREE.MeshLambertMaterial({ color: FLOORCOL[floorKind] || 0x7A5634 }), 0, -0.2, 0));
windows.forEach(function (w) {
var big = !!w.big, pw = big ? 2.6 : 1.9, ph = big ? 3.0 : 2.0, midY = big ? 1.9 : 1.75;
var wm = new THREE.MeshPhongMaterial({ color: 0xCFE0F0, shininess: 70, specular: 0x889AB0 });
winMats.push(wm);
var wp = P(new THREE.PlaneGeometry(pw, ph), wm, w.x, (w.y || 0) + midY, w.z);
wp.rotation.y = w.ry;
root.add(wp);
var gm = new THREE.MeshBasicMaterial({ color: 0xFFC98A, transparent: true, opacity: 0 });
winGlints.push(gm);
var gp = P(new THREE.PlaneGeometry(pw, ph * 0.22), gm, w.x + Math.sin(w.ry) * 0.01, (w.y || 0) + midY + ph * 0.42, w.z + Math.cos(w.ry) * 0.01);
gp.rotation.y = w.ry;
root.add(gp);
});
lights.forEach(function (l) { root.add(P(sph(.14), mG(0xFFF0D0, 1), l.x, (l.y || 0) + H - .12, l.z)); });
var lightPool = [];
for (var lpi = 0; lpi < 10; lpi++) {
var lpl = new THREE.PointLight(0xFFE2B8, 0, 16, 1.6);
root.add(lpl);
lightPool.push(lpl);
}
var lightFill = new THREE.PointLight(0xFFF0DC, 0, Math.max(W, D) * 1.3, 1.1);
root.add(lightFill);
var ex = P(box(1.7, 2.25, .12), mL(0x5A3A22), 0, 1.12, exitZ - .1);
root.add(ex);
walls.push({ x: ox, z: oz + exitZ + 0.35, rot: 0, hw: 1.6, hd: .15, h: FLOOR, level: 0 });
var amb = new THREE.HemisphereLight(0xFFF0D8, 0x2A2018, .3);
amb.position.set(0, H, 0);
root.add(amb);
buildSlabs();
lvl = 0;
yOff = 0;
var holesOut = holes.map(function (h) { return { level: h.level, x: ox + h.x, z: oz + h.z, hw: h.hw, hd: h.hd }; });
var floorNames = [];
(function () {
function cap(s) { return s ? (s.charAt(0).toUpperCase() + s.slice(1)) : s; }
for (var L = 0; L < levels; L++) {
if (plan.locked && L === plan.locked.level) {
floorNames[L] = cap((plan.locked.what || "the penthouse").replace(/^the /, ""));
continue;
}
if (L === 0) {
var g = (plan.mode === "mixed") ? (plan.ground || "lobby") : (plan.mode === "hall" ? plan.fill : null);
floorNames[L] = g ? cap(ROOMNAME[g] || g) : "Ground floor";
continue;
}
if (plan.mode === "mixed") {
floorNames[L] = "Offices";
continue;
}
if (plan.mode === "hall") {
floorNames[L] = (plan.fill === "church" || plan.fill === "castle") ? cap(ROOMNAME[plan.fill] || plan.fill) : "Offices";
continue;
}
floorNames[L] = "Floor " + (L + 1);
}
})();
return { spec: spec, root: root, walls: walls, spots: spots, ox: ox, oz: oz, exit: { x: ox, z: oz + exitZ - 1.0 }, start: { x: ox, z: oz + exitZ - 2.4 },
winMats: winMats, winGlints: winGlints, W: W, D: D, levels: levels, floor: FLOOR, stairs: stairsAt, lifts: lifts, level: 0, holes: holesOut,
locked: plan.locked || null, unlocked: false, floorNames: floorNames,
asBuilt: asBuilt, wpKey: wpKey, wpSaved: !!wpSaved, homeMedia: !!(media && mediaSet),
lightSpots: lights, lightPool: lightPool, lightFill: lightFill, ceilH: H, lightAt: -1, lightLevel: -1 };
},
function (dt) {
if (!INT || !INT.lightPool)
return;
var L = INT.level || 0, now = performance.now();
if (L === INT.lightLevel && now - INT.lightAt < 500)
return;
INT.lightLevel = L;
INT.lightAt = now;
var F = INT.floor, H = INT.ceilH || 3, rp = INT.root.position, P = camera.position, cx = P.x - rp.x, cz = P.z - rp.z;
var spots = (INT.lightSpots || []).filter(function (l) { return Math.round((l.y || 0) / F) === L; });
if (spots.length < 4) {
var nx = Math.max(2, Math.round(INT.W / 7)), nz = Math.max(2, Math.round(INT.D / 7));
for (var i = 0; i < nx; i++)
for (var j = 0; j < nz; j++)
spots.push({ x: -INT.W / 2 + INT.W * (i + 0.5) / nx, z: -INT.D / 2 + INT.D * (j + 0.5) / nz, y: L * F });
}
spots.sort(function (a, b) { return Math.hypot(a.x - cx, a.z - cz) - Math.hypot(b.x - cx, b.z - cz); });
INT.lightPool.forEach(function (pl, i) {
var s = spots[i];
if (!s) {
pl.intensity = 0;
return;
}
pl.position.set(s.x, L * F + H - 0.3, s.z);
pl.intensity = INT_LAMP;
});
INT.lightFill.position.set(0, L * F + H * 0.8, 0);
INT.lightFill.intensity = INT_FILL;
},
function (k) {
var s = { bed: [1.6, 2.1], sofa: [2.3, .9], table: [1.4, .9], longtable: [4.4, 2.4], counter: [2.4, .7], piano: [1.5, .8], wardrobe: [1.3, .6], bookshelf: [1.6, .4],
fireplace: [2, .6], stove: [.8, .7], fridge: [.75, .7], bathtub: [1.7, .8], desk: [1.4, .7], pew: [3.4, .6], altarinside: [2.3, 1], throneseat: [1.4, 1.4], shelfgoods: [2.4, .5], till: [2, .7],
hospitalbed: [1, 2], crates: [2, 1.1], machine: [2, 1.4], judgebench: [3.6, 1.2], counterbank: [5, .7], sarcophagus: [1.1, 2.4] };
return s[k] || [1, 1];
},
function (kind, xc, zc, w, d, sd, put) {
if (kind === "hallway") {
put("rug", xc, zc, 0);
put("painting", xc - w / 2 + .12, zc - .6, Math.PI / 2);
put("plant", xc + w / 2 - .45, zc - 1.6, 0);
return;
}
var list = ROOMFURN[kind] || ROOMFURN.living, far = xc + sd * (w / 2 - .6);
if (kind === "cell" && FURN.cellbars) {
var bx = xc - sd * (w / 2 - .5);
if (d >= 6) {
put("cellbars", bx, zc - 1.55, Math.PI / 2);
put("cellbars", bx, zc + 1.55, Math.PI / 2);
}
else
put("cellbars", bx, zc, Math.PI / 2);
}
list.forEach(function (k, i) {
if (k === "rug" || k === "chandelier") {
put(k, xc, zc, 0);
return;
}
if (k === "painting" || k === "wallmirror" || k === "wallscreen") {
put(k, xc, zc - d / 2 + .15, 0);
return;
}
if (k === "bed" || k === "hospitalbed") {
put(k, far - sd * .4, zc - d / 2 + 1.3, 0);
return;
}
if (k === "bookshelf" || k === "wardrobe" || k === "fridge" || k === "shelfgoods") {
put(k, xc + (i % 2 ? 1 : -1) * 1.6, zc - d / 2 + .35, 0);
return;
}
if (k === "fireplace") {
put(k, far - sd * .35, zc, sd > 0 ? -Math.PI / 2 : Math.PI / 2);
return;
}
if (k === "counter" || k === "stove" || k === "sink") {
put(k, xc - 1.6 + i * .9, zc - d / 2 + .4, 0);
return;
}
var a = i * 1.9, r = Math.min(w, d) * .22;
put(k, xc + Math.cos(a) * r, zc + Math.sin(a) * r, -a);
});
},
function (kind, W, D, put, spots) {
var i, z;
if (kind === "church") {
for (z = -D / 2 + 6; z < D / 2 - 4; z += 1.6) {
put("pew", -W / 4 - .3, z, Math.PI);
put("pew", W / 4 + .3, z, Math.PI);
}
put("runner", 0, D / 8, 0);
put("altarinside", 0, -D / 2 + 2, Math.PI);
put("pulpit", W / 4, -D / 2 + 4, Math.PI);
put("candles", -W / 4, -D / 2 + 1.2, 0);
put("candles", W / 4 - 1, -D / 2 + 1.2, 0);
put("chandelier", 0, 0, 0);
spots.push({ x: 0, z: -D / 2 + 3.4, room: "nave" }, { x: 2, z: D / 4, room: "nave" });
}
else if (kind === "library") {
for (z = -D / 2 + 3; z < D / 2 - 6; z += 3)
for (i = -1; i <= 1; i += 2) {
put("bookshelf", i * W / 4 - .9, z, 0);
put("bookshelf", i * W / 4 + .9, z, 0);
}
put("table", 0, D / 2 - 5, 0);
put("lamp", 1, D / 2 - 5, 0);
put("desk", -W / 4, D / 2 - 3, Math.PI);
spots.push({ x: 0, z: D / 2 - 6, room: "stacks" }, { x: -W / 4, z: D / 2 - 4, room: "desk" });
}
else if (kind === "school") {
put("blackboard", 0, -D / 2 + .2, 0);
put("desk", 0, -D / 2 + 2, Math.PI);
for (z = -D / 2 + 4; z < D / 2 - 3; z += 2)
for (i = -2; i <= 2; i++)
put("schooldesk", i * 2, z, Math.PI);
spots.push({ x: 0, z: -D / 2 + 2.8, room: "classroom" });
}
else if (kind === "shop") {
put("till", 0, -D / 2 + 3, Math.PI);
for (z = -D / 2 + 1; z < D / 2 - 2; z += 2.6) {
put("shelfgoods", -W / 2 + .4, z, Math.PI / 2);
put("shelfgoods", W / 2 - .4, z, -Math.PI / 2);
}
put("shelfgoods", 0, D / 6, 0);
spots.push({ x: 0, z: -D / 2 + 1.8, room: "counter" });
}
else if (kind === "hospital") {
for (z = -D / 2 + 2; z < D / 2 - 4; z += 3) {
put("hospitalbed", -W / 2 + 1.2, z, Math.PI / 2);
put("hospitalbed", W / 2 - 1.2, z, -Math.PI / 2);
}
put("till", 0, D / 2 - 4, 0);
spots.push({ x: 0, z: D / 2 - 5, room: "reception" }, { x: 0, z: 0, room: "ward" });
}
else if (kind === "bank") {
put("counterbank", 0, -D / 6, 0);
put("vaultround", 0, -D / 2 + .2, 0);
put("plant", -W / 2 + 1, D / 2 - 2, 0);
put("plant", W / 2 - 1, D / 2 - 2, 0);
put("chandelier", 0, D / 6, 0);
spots.push({ x: 0, z: -D / 6 - 1.4, room: "counter" });
}
else if (kind === "penthouse") {
put("desk", 0, -D / 2 + 3, Math.PI);
put("chair", 0, -D / 2 + 5, 0);
put("monitor", -.9, -D / 2 + 3, Math.PI);
put("wallscreen", -W / 4, -D / 2 + .15, 0);
put("maptable", W / 4, -D / 4, 0);
put("sofa", -W / 4, D / 8, 0.4);
put("armchair", W / 4 - 1.6, D / 8, -0.5);
put("armchair", -W / 4 - 1.8, D / 6 + 2, 0.9);
put("table", -W / 6, D / 8, 0);
put("lamp", W / 4, D / 8 + 1.7, 0);
put("rug", -W / 6, D / 8, 0);
put("bookshelf", -W / 2 + 1.2, -D / 6, Math.PI / 2);
put("bookshelf", -W / 2 + 1.2, -D / 6 + 4, Math.PI / 2);
put("wardrobe", W / 2 - 1.3, D / 4, -Math.PI / 2);
put("wallmirror", W / 2 - .15, -D / 6, -Math.PI / 2);
put("chandelier", 0, 0, 0);
put("candles", -W / 6 + 1, D / 8, 0);
put("plant", W / 2 - 1.4, -D / 2 + 1.6, 0);
put("plant", -W / 2 + 1.4, -D / 2 + 1.6, 0);
put("plant", 0, D / 2 - 2, 0);
put("painting", 0, -D / 2 + .2, 0);
put("painting", -W / 2 + .15, D / 2 - 4, Math.PI / 2);
spots.push({ x: 0, z: -D / 2 + 4.4, room: "the office" }, { x: -W / 4, z: D / 8, room: "the office" });
}
else if (kind === "lobby") {
put("till", 0, -D / 2 + 2.2, Math.PI);
put("armchair", -W / 4, D / 6, 0.6);
put("armchair", -W / 4 + 2, D / 6 - 1.4, -0.8);
put("table", -W / 4 + 1, D / 6 - 0.7, 0);
put("plant", -W / 2 + 1.2, -D / 2 + 1.4, 0);
put("plant", W / 2 - 1.2, -D / 2 + 1.4, 0);
put("rug", 0, D / 6, 0);
put("chandelier", 0, 0, 0);
put("painting", 0, -D / 2 + .2, 0);
spots.push({ x: 0, z: -D / 2 + 3.4, room: "lobby", level: 0 }, { x: -W / 4, z: D / 6, room: "lobby", level: 0 }, { x: W / 4, z: -D / 6, room: "lobby", level: 0 });
}
else if (kind === "station") {
put("till", -W / 2 + 3, -D / 2 + 2, 0);
for (i = -1; i <= 1; i++)
put("benchin", i * 5, 0, 0);
put("clock", W / 2 - .5, -D / 2 + .4, 0);
spots.push({ x: 0, z: 1.5, room: "waiting room" });
}
else if (kind === "court") {
put("judgebench", 0, -D / 2 + 2, Math.PI);
for (z = 0; z < D / 2 - 3; z += 1.8) {
put("pew", -W / 4, z, Math.PI);
put("pew", W / 4, z, Math.PI);
}
spots.push({ x: 0, z: -D / 2 + 3.5, room: "court" });
}
else if (kind === "works") {
for (i = 0; i < 6; i++)
put(i % 2 ? "machine" : "crates", -W / 2 + 3 + (i % 3) * (W / 3), -D / 2 + 3 + Math.floor(i / 3) * (D / 2.5), 0);
put("barrel", W / 2 - 2, D / 2 - 3, 0);
spots.push({ x: 0, z: D / 4, room: "floor" });
}
else if (kind === "lab") {
for (z = -D / 2 + 3; z < D / 2 - 4; z += 4) {
put("labbench", -W / 4, z, 0);
put("labbench", W / 4, z, 0);
}
put("bigconsole", 0, -D / 2 + 1.2, Math.PI);
put("podbed", W / 2 - 1.6, D / 2 - 3, Math.PI / 2);
put("podbed", -W / 2 + 1.6, D / 2 - 3, -Math.PI / 2);
spots.push({ x: 0, z: -D / 2 + 2.6, room: "the laboratory", level: 0 });
}
else if (kind === "barn") {
put("crates", -W / 2 + 2, -D / 2 + 2, 0);
put("barrel", W / 2 - 1.5, -D / 2 + 1.5, 0);
put("barrel", W / 2 - 2.5, -D / 2 + 1.5, 0);
spots.push({ x: 0, z: 0, room: "barn" });
}
else if (kind === "castle") {
put("throneseat", 0, -D / 2 + 2, Math.PI);
put("longtable", 0, 0, Math.PI / 2);
put("fireplace", -W / 2 + .4, -D / 4, Math.PI / 2);
for (z = -D / 2 + 3; z < D / 2 - 3; z += 6) {
put("banner", -W / 2 + .2, z, Math.PI / 2);
put("banner", W / 2 - .2, z, -Math.PI / 2);
}
put("chandelier", 0, -D / 4, 0);
put("chandelier", 0, D / 4, 0);
spots.push({ x: 0, z: -D / 2 + 4, room: "throne room" }, { x: 2, z: D / 4, room: "hall" });
}
else if (kind === "tower") {
put("spiralstair", 0, -1, 0);
put("table", W / 4, W / 4, 0);
put("chair", W / 4 + .8, W / 4, 0);
spots.push({ x: -W / 4, z: W / 4, room: "tower" });
}
else if (kind === "crypt") {
for (z = -D / 2 + 2; z < D / 2 - 3; z += 3) {
put("sarcophagus", -W / 4, z, 0);
put("sarcophagus", W / 4, z, 0);
}
put("candles", 0, -D / 2 + .6, 0);
spots.push({ x: 0, z: 0, room: "crypt" });
}
else {
put("rug", 0, 0, 0);
put("table", 0, -D / 4, 0);
put("lamp", W / 2 - 1, -D / 2 + 1, 0);
put("chair", 1, -D / 4, Math.PI);
spots.push({ x: 0, z: D / 6, room: "room" });
}
},
function (spec) {
if (INT)
exitInterior(true);
INT = makeInterior(spec);
scene.add(INT.root);
store.inside = spec.id;
intCool = 1.2;
wallsAt = -1;
INT.outside = { x: camera.position.x, z: camera.position.z, y: camera.position.y, here: store.here || 0 };
camera.position.set(INT.start.x, 1.72, INT.start.z);
yaw = 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof pinnedLevel !== "undefined")
pinnedLevel = null;
bringOccupants();
setStatus("<b>Inside " + esc(placeName(spec)) + ".</b> Walk back out through the door you came in by.");
},
function (quiet) {
if (!INT)
return;
var spec = INT.spec;
scene.remove(INT.root);
INT = null;
store.inside = null;
wallsAt = -1;
intCool = 1.2;
if (typeof pinnedLevel !== "undefined")
pinnedLevel = null;
var D = doorWorld(spec);
var lx0 = D.x + D.out.x * 2.2, lz0 = D.z + D.out.z * 2.2, gy0 = (typeof terrainY === "function" && (typeof atlOn !== "function" || atlOn())) ? (terrainY(lx0, lz0) || 0) : 0;
camera.position.set(lx0, gy0 + 1.72, lz0);
yaw = Math.atan2(-D.out.x, -D.out.z);
pitch = 0;
if (!quiet)
setStatus("Back outside " + esc(placeName(spec)) + ".");
if (typeof moveEveryone === "function")
moveEveryone(dreamHour(), daylight(dreamHour()));
},
function (I, to) {
if (!INT || INT !== I)
return;
INT.unlocked = true;
penthouseCleared = (typeof session !== "undefined" && session && session.user) ? session.user.id : null;
setStatus("<b>The door opens.</b> Somnucor, " + esc(INT.locked.what) + ".");
if (inLift()) {
INT.level = to;
camera.position.y = 1.72 + to * INT.floor;
liftCool = 0.7;
wallsAt = -1;
setStatus("<b>The door opens.</b> Floor " + (to + 1) + " of " + INT.levels + " — " + esc(INT.locked.what) + ".");
}
else {
var P = camera.position, near = (INT.stairs || []).some(function (st) { return st.from === to - 1 && Math.abs(P.x - st.x) < st.hw + 1.5 && Math.abs(P.z - st.z) < st.hd + 2; });
if (near) {
INT.level = to;
camera.position.y = 1.72 + to * INT.floor;
if (typeof flyY !== "undefined")
flyY = 0;
pinnedLevel = null;
wallsAt = -1;
setStatus("<b>The door opens.</b> Floor " + (to + 1) + " of " + INT.levels + " — " + esc(INT.locked.what) + ".");
}
}
},
function (to) {
var I = INT;
if (penthouseAsking || !I)
return;
if (Date.now() - penthouseRefusedAt < 4000)
return;
if (!(typeof signedIn === "function" && signedIn())) {
penthouseRefusedAt = Date.now();
setStatus("<b>The door does not know you.</b> Sign in first — the penthouse admits people by account.");
return;
}
penthouseAsking = true;
setStatus("<b>The door is looking at you…</b>");
cityRpc("enter_penthouse", { p_code: null }).then(function (r) {
if (r && r.ok) {
penthouseAsking = false;
penthouseLetIn(I, to);
return;
}
if (r && r.need_mfa) {
setStatus("<b>" + esc(r.why) + "</b>");
return secondStepHere().then(function (ok) {
penthouseAsking = false;
if (ok) {
penthouseRefusedAt = 0;
askPenthouse(to);
}
else {
penthouseRefusedAt = Date.now();
setStatus("You step back from the door.");
}
});
}
var why = (r && r.why) || "";
if (!/not the one/i.test(why)) {
penthouseAsking = false;
penthouseRefusedAt = Date.now();
setStatus("<b>" + esc(why || "The door will not open.") + "</b>");
return;
}
var tries = (typeof prompt === "function") ? prompt("The way to " + I.locked.what + " is locked.\nCode:") : null;
if (tries === null || !String(tries).trim()) {
penthouseAsking = false;
penthouseRefusedAt = Date.now();
setStatus("You step back from the door.");
return;
}
return cityRpc("enter_penthouse", { p_code: String(tries).trim() }).then(function (r2) {
penthouseAsking = false;
if (r2 && r2.ok)
penthouseLetIn(I, to);
else {
penthouseRefusedAt = Date.now();
setStatus(esc((r2 && r2.why) || "That code is not the one."));
}
});
}).catch(function () {
penthouseAsking = false;
penthouseRefusedAt = Date.now();
setStatus("The penthouse door does not answer just now. Try again in a moment.");
});
},
function (qr, secret, first) {
return new Promise(function (done) {
var bg = document.createElement("div");
bg.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(5,6,10,.82);display:grid;place-items:center;padding:16px";
var qrSrc = qr ? (/^data:/.test(qr) ? qr : "data:image/svg+xml;charset=utf-8," + encodeURIComponent(qr)) : "";
bg.innerHTML = "<div style='width:min(380px,100%);background:rgba(10,12,18,.97);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:20px;font:14px var(--sans);color:var(--bone);line-height:1.55'>" +
"<div style='font-family:var(--serif);font-size:19px;margin-bottom:6px'>Your authenticator code</div>" +
(first ? "<p style='color:var(--dim);margin:0 0 8px'>The cash system is on, so this needs a second step. Open an authenticator app on your phone (Google Authenticator, Microsoft Authenticator, Authy or 1Password), add an account and scan this. You only do this once.</p>" +
"<div style='background:#fff;padding:8px;display:inline-block'><img src='" + qrSrc + "' width='170' height='170' alt='Code to scan'></div>" +
"<p style='color:var(--dim);font-size:12px;margin:6px 0'>Can't scan? Type this key into the app: <code style='color:var(--bone);word-break:break-all'>" + esc(secret || "") + "</code></p>"
: "<p style='color:var(--dim);margin:0 0 8px'>Enter the six-digit code your authenticator app shows for Somnucor.</p>") +
"<input id='mfa-in' inputmode='numeric' autocomplete='one-time-code' maxlength='6' placeholder='123456' style='width:100%;box-sizing:border-box;background:#07080B;border:1px solid var(--line);color:var(--bone);padding:9px 10px;font-size:16px;margin:6px 0 10px'>" +
"<div id='mfa-err' style='color:#C0603A;font-size:12.5px;min-height:16px'></div>" +
"<div style='display:flex;gap:8px;margin-top:6px'><button class='btn' id='mfa-ok'>Confirm</button><button class='btn' id='mfa-no'>Cancel</button></div></div>";
document.body.appendChild(bg);
var inp = bg.querySelector("#mfa-in");
setTimeout(function () { inp.focus(); }, 30);
function finish(v) { bg.remove(); done(v); }
bg.querySelector("#mfa-no").onclick = function () { finish(null); };
bg.querySelector("#mfa-ok").onclick = function () { var c = (inp.value || "").replace(/\D/g, ""); if (c.length !== 6) {
bg.querySelector("#mfa-err").textContent = "The code is six digits.";
return;
} finish({ code: c, box: bg }); };
inp.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Enter")
bg.querySelector("#mfa-ok").click(); if (e.key === "Escape")
finish(null); };
});
},
function () {
return freshToken().then(function (tok) {
if (!tok)
return false;
return authGet("user", tok).then(function (u) {
var all = (u && u.factors) || [];
var good = all.filter(function (f) { return f.factor_type === "totp" && f.status === "verified"; })[0];
var ready = good ? Promise.resolve({ id: good.id, first: false }) :
Promise.all(all.filter(function (f) { return f.status !== "verified"; }).map(function (f) {
return fetch(authUrl("factors/" + f.id), { method: "DELETE", headers: authHeaders(tok) }).catch(function () { });
})).then(function () {
return authPost("factors", { factor_type: "totp", friendly_name: "Somnucor " + Date.now().toString(36) }, tok);
}).then(function (e) { return { id: e.id, first: true, qr: e.totp && e.totp.qr_code, secret: e.totp && e.totp.secret }; });
return ready.then(function (f) {
function attempt() {
return mfaBox(f.qr, f.secret, f.first).then(function (got) {
if (!got)
return false;
return authPost("factors/" + f.id + "/challenge", {}, tok).then(function (ch) {
return authPost("factors/" + f.id + "/verify", { challenge_id: ch.id, code: got.code }, tok);
}).then(function (j) {
keepSession({ access_token: j.access_token, refresh_token: j.refresh_token, user: j.user || session.user, at: Date.now() });
setStatus("<b>Authenticator code accepted.</b>");
return true;
}).catch(function () { setStatus("<b>That code didn't match.</b> Codes change every 30 seconds; try the newest one."); return attempt(); });
});
}
return attempt();
});
});
}).catch(function (e) { setStatus(esc((e && (e.msg || e.message || e.error_description)) || "The second step could not start.")); return false; });
},
function (to) {
if (!INT)
return true;
if (INT.locked && to > 0 && towerRule("towerOpen") === "lobby" && !(typeof amKeeper === "function" && amKeeper())) {
setStatus("<b>The lift will not go up.</b> Somnucor has the upper floors closed today.");
return false;
}
if (!INT.locked)
return true;
if (to !== INT.locked.level)
return true;
var me = (typeof session !== "undefined" && session && session.user) ? session.user.id : null;
if (INT.unlocked && me && penthouseCleared === me)
return true;
if (me && penthouseCleared === me) {
INT.unlocked = true;
return true;
}
INT.unlocked = false;
askPenthouse(to);
return false;
},
function (dir) {
if (!INT || liftCool > 0 || !inLift())
return false;
var to = (INT.level || 0) + dir;
if (to < 0 || to > INT.levels - 1)
return false;
if (!levelAllowed(to)) {
liftCool = 1.2;
return false;
}
INT.level = to;
camera.position.y = 1.72 + to * INT.floor;
liftCool = 0.7;
wallsAt = -1;
setStatus("<b>Floor " + (to + 1) + " of " + INT.levels + ".</b>");
return true;
},
function (to) {
if (!INT || liftCool > 0 || !inLift())
return false;
to = Math.max(0, Math.min(INT.levels - 1, to | 0));
if (to === (INT.level || 0))
return true;
if (!levelAllowed(to)) {
liftCool = 1.2;
return false;
}
INT.level = to;
camera.position.y = 1.72 + to * INT.floor;
liftCool = 0.7;
wallsAt = -1;
setStatus("<b>Floor " + (to + 1) + " of " + INT.levels + ".</b>");
return true;
},
function () {
if (!INT)
return;
var used = {}, n = 0;
var mine = store.characters.filter(function (c) { return c.objId && c.atId === INT.spec.id; });
mine.forEach(function (c) {
var g = meshes[c.objId];
if (!g)
return;
var want = ROLE_ROOM[c.role] || null;
var free = INT.spots.filter(function (q, i) { return !used[i]; });
var pick = -1;
INT.spots.forEach(function (q, i) { if (pick < 0 && !used[i] && want && q.room === want)
pick = i; });
if (pick < 0)
INT.spots.forEach(function (q, i) { if (pick < 0 && !used[i])
pick = i; });
if (pick < 0)
pick = n % Math.max(1, INT.spots.length);
used[pick] = 1;
var sp = INT.spots[pick] || { x: 0, z: 0, level: 0 };
var lift = (sp.level || 0) * INT.floor;
var x = INT.ox + sp.x + ((n % 3) - 1) * .5, z = INT.oz + sp.z + (((n >> 1) % 3) - 1) * .5;
n++;
g.position.x = x;
g.position.z = z;
if (g.position.y !== undefined)
g.position.y = lift;
g.userData.target = { x: x, z: z };
g.userData.path = null;
g.visible = true;
c.x = x;
c.z = z;
c.insideAt = INT.spec.id;
c.onLevel = sp.level || 0;
});
}
];
});
