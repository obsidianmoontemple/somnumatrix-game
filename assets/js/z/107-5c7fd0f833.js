/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(107, function () {
"use strict";
return [
function () {
var now = performance.now();
if (LITE_KEEP && now - LITE_KEEP_F < 40)
return LITE_KEEP;
LITE_KEEP_F = now;
var n = (typeof FIGGEO !== "undefined" ? Object.keys(FIGGEO).length : 0) + (typeof GEOCACHE !== "undefined" ? Object.keys(GEOCACHE).length : 0) + (typeof DL_GEO !== "undefined" ? Object.keys(DL_GEO).length : 0);
if (LITE_KEEP && n === LITE_KEEP_N)
return LITE_KEEP;
LITE_KEEP = new Set();
LITE_KEEP_N = n;
[typeof FIGGEO !== "undefined" ? FIGGEO : {}, typeof GEOCACHE !== "undefined" ? GEOCACHE : {}, typeof DL_GEO !== "undefined" ? DL_GEO : {}, typeof SIGN_GEO !== "undefined" ? SIGN_GEO : {}].forEach(function (o) { Object.keys(o).forEach(function (k) { LITE_KEEP.add(o[k]); }); });
return LITE_KEEP;
},
function (root) {
var keep = liteShared();
root.traverse(function (m) {
if (m.material) {
(Array.isArray(m.material) ? m.material : [m.material]).forEach(function (mt) { if (mt && mt.dispose && !(mt.map && typeof SIGN_TEX !== "undefined" && bakeIsSign && bakeIsSign(mt.map)))
mt.dispose(); });
}
if (m.geometry && !keep.has(m.geometry) && m.geometry.dispose)
m.geometry.dispose();
if (m.isInstancedMesh && m.dispose)
m.dispose();
});
}
];
});
