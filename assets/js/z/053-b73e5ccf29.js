/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(53, function () {
"use strict";
return [
function () {
if (surfAt > 0 && performance.now() - surfAt < 500)
return SURF;
surfAt = performance.now();
SURF = [];
var here = store.here || 0;
store.objects.forEach(function (o) {
var S = SURFACE[o.archetype];
if (!S)
return;
if ((o.realm || 0) !== here)
return;
if (typeof isHidden === "function" && isHidden(o))
return;
var d = KIT[o.archetype];
if (!d)
return;
var a = o.attrs || {}, s = a.s || 1, g = meshes[o.id];
var live = g && typeof g.position.x === "number";
var top = S.top;
if (S.roof)
top = d.size[1] * s * (a.h || 1) * (a.lv ? Math.max(1, a.lv * 3.2 / d.size[1]) : 1);
SURF.push({ x: live ? g.position.x : o.x, z: live ? g.position.z : o.z,
rot: (live && typeof g.rotation.y === "number") ? g.rotation.y : (o.rot || 0),
hw: d.size[0] * s * (a.w || 1) / 2, hd: d.size[2] * s * (a.d || 1) / 2,
top: (top || 0) * (S.roof ? 1 : s), ramp: S.ramp, mound: S.mound, board: S.board, s: s, kind: o.archetype,
b: (typeof terrainY === "function") ? terrainY(o.x, o.z) : 0 });
});
return SURF;
},
function (x, z, feet) {
var best = (typeof terrainY === "function") ? terrainY(x, z) : 0, list = surfaceList(), reach = feet + STEP_UP + 0.02;
for (var i = 0; i < list.length; i++) {
var w = list[i], dx = x - w.x, dz = z - w.z;
if (Math.abs(dx) > w.hw + w.hd + 2 || Math.abs(dz) > w.hw + w.hd + 2)
continue;
var c = Math.cos(-w.rot), sn = Math.sin(-w.rot), lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
var h = null;
if (w.mound) {
var r = Math.hypot(lx, lz) / (w.mound[0] / 2 * w.s);
if (r < 1)
h = w.mound[1] * w.s * (1 - r * r);
}
else if (Math.abs(lx) < w.hw - 0.1 && Math.abs(lz) < w.hd - 0.1) {
if (w.ramp) {
var t = (lz + w.hd) / (2 * w.hd);
h = w.ramp[0] + (w.ramp[1] - w.ramp[0]) * Math.max(0, Math.min(1, t)) * w.s;
}
else {
h = w.top;
if (w.board && lz < -w.hd + 3.5)
h = Math.max(0, w.top * (lz + w.hd) / 3.5);
}
}
if (h === null)
continue;
h += (w.b || 0);
if (h > best && h <= reach)
best = h;
}
return best;
},
function (P, feet) {
if (!INT)
return null;
var best = null;
for (var i = 0; i < (INT.stairs || []).length; i++) {
var st = INT.stairs[i];
var dx = P.x - st.x, dz = P.z - st.z;
var c = Math.cos(-(st.rot || 0)), sn = Math.sin(-(st.rot || 0));
var lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
if (Math.abs(lx) > st.hw || Math.abs(lz) > st.hd)
continue;
var t = Math.max(0, Math.min(1, (lz + st.hd) / (2 * st.hd)));
var h = st.from * INT.floor + t * INT.floor;
if (h > feet + STEP_UP + 0.3)
continue;
if (h < feet - 0.05 && verticalStop(P.x, P.z, feet + 0.02, h) !== null)
continue;
if (best === null || Math.abs(h - feet) < Math.abs(best - feet))
best = h;
}
return best;
},
function (x, z, Hb) {
if (!INT)
return true;
var L = Math.round(Hb / INT.floor);
if (L <= 0 || L >= INT.levels)
return false;
var open = false;
(INT.holes || []).forEach(function (h) {
if (h.level !== L)
return;
if (Math.abs(x - h.x) <= h.hw && Math.abs(z - h.z) <= h.hd)
open = true;
});
(INT.lifts || []).forEach(function (l) { if (Math.hypot(x - l.x, z - l.z) < 1.8)
open = true; });
return open;
},
function (x, z, fromFeet, toFeet) {
if (!INT || fromFeet === toFeet)
return null;
var up = toFeet > fromFeet, lo = Math.min(fromFeet, toFeet), hi = Math.max(fromFeet, toFeet), first = null;
for (var L = 0; L <= INT.levels; L++) {
var Hb = L * INT.floor;
if (Hb <= lo + 1e-6 || Hb >= hi - 1e-6)
continue;
if (floorOpenAt(x, z, Hb))
continue;
if (first === null || (up ? Hb < first : Hb > first))
first = Hb;
}
return first;
}
];
});
