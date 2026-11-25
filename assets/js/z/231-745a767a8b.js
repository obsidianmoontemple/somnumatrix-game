/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(231, function () {
"use strict";
return [
function (ids) {
if (!AWL.ok || AWL.asking || !ids.length || Date.now() - AWL.at < 15000)
return;
AWL.asking = true;
AWL.at = Date.now();
cityRpc("away_plans", { p_ids: ids }).then(function (rows) {
var m = {};
(rows || []).forEach(function (r) { if (r && r.user_id)
m[r.user_id] = r; });
AWL.plans = m;
}).catch(function (e) {
if (/function|not find|404|PGRST/i.test(String(e && e.message || e)))
AWL.ok = false;
}).then(function () { AWL.asking = false; });
},
function (name) {
if (!name)
return null;
var plots = (store.plots || []).concat(store.districtPlots || []), p = null;
for (var i = 0; i < plots.length; i++)
if (plots[i].name === name) {
p = plots[i];
break;
}
if (!p)
return null;
if (p.homeId)
for (var k = 0; k < store.objects.length; k++)
if (store.objects[k].id === p.homeId)
return store.objects[k];
return p.x !== undefined ? { x: p.x, z: p.z, rot: p.rot || 0, archetype: p.archetype || "house", id: p.homeId } : null;
},
function (A, B) {
if (typeof ATLC === "undefined" || !ATLC)
return [A, B];
var pol = function (p) { return { r: Math.hypot(p.x - ATLC.x, p.z - ATLC.z), a: Math.atan2(p.z - ATLC.z, p.x - ATLC.x) }; };
var xy = function (r, a) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; };
var streets = [];
if (typeof ATL_STREETS !== "undefined")
Object.keys(ATL_STREETS).forEach(function (k) { (ATL_STREETS[k] || []).forEach(function (s) { streets.push(s); }); });
var road = function (r) { var b = r; streets.forEach(function (s) { if (Math.abs(s - r) < Math.abs(b - r))
b = s; }); return b; };
var pa = pol(A), pb = pol(B), ra = road(pa.r), rb = road(pb.r), out = [A];
var arc = function (r, a0, a1) { var d = Math.atan2(Math.sin(a1 - a0), Math.cos(a1 - a0)), n = Math.max(1, Math.ceil(Math.abs(d) * r / 20)); for (var i = 1; i <= n; i++)
out.push(xy(r, a0 + d * i / n)); };
out.push(xy(ra, pa.a));
if (Math.abs(ra - rb) < 1) {
arc(ra, pa.a, pb.a);
}
else {
var stair = pa.a, best = 1e9;
if (typeof ATL_STAIRS !== "undefined")
ATL_STAIRS.forEach(function (s) { var d = Math.abs(Math.atan2(Math.sin(s.a - pa.a), Math.cos(s.a - pa.a))) + Math.abs(Math.atan2(Math.sin(s.a - pb.a), Math.cos(s.a - pb.a))); if (d < best) {
best = d;
stair = s.a;
} });
arc(ra, pa.a, stair);
out.push(xy(rb, stair));
arc(rb, stair, pb.a);
}
out.push(B);
return out;
},
function (pts, f) {
var L = [0], T = 0;
for (var i = 1; i < pts.length; i++) {
T += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z);
L.push(T);
}
var want = Math.max(0, Math.min(1, f)) * T;
for (var j = 1; j < pts.length; j++)
if (L[j] >= want) {
var seg = L[j] - L[j - 1] || 1, k = (want - L[j - 1]) / seg, a = pts[j - 1], b = pts[j];
return { x: a.x + (b.x - a.x) * k, z: a.z + (b.z - a.z) * k, rot: Math.atan2(-(b.x - a.x), -(b.z - a.z)) };
}
var e = pts[pts.length - 1];
return { x: e.x, z: e.z, rot: 0 };
},
function (row, prefer) {
var S = (INT && INT.spots) || [];
if (!S.length)
return { x: INT.ox, y: 0, z: INT.oz, level: 0 };
var pool = S.filter(function (s) { return prefer.indexOf(s.room) >= 0; });
if (!pool.length)
pool = S.filter(function (s) { return s.room !== "cell"; });
if (!pool.length)
pool = S;
var h = awlHash(row.user_id), sp = pool[h % pool.length], lv = sp.level || 0;
return { x: INT.ox + sp.x + ((h >> 3) % 3 - 1) * 0.6, y: lv * INT.floor, z: INT.oz + sp.z + ((h >> 5) % 3 - 1) * 0.6, level: lv };
}
];
});
