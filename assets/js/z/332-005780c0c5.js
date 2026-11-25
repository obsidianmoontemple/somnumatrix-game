/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(332, function () {
return [
function (x, z) {
var G = WLD.w && WLD.w.g;
if (!G)
return null;
var best = null;
for (var i = 0; i < WGRD.list.length; i++) {
var m = wgrdMesh(WGRD.list[i]);
if (!m)
continue;
var D = m.userData.wgd;
var up = m, mine = false, shown = true;
while (up) {
if (!up.visible)
shown = false;
if (up === G)
mine = true;
up = up.parent;
}
if (!mine || !shown)
continue;
var e = m.matrixWorld.elements;
if (Math.abs(e[0] - 1) > 1e-6 || Math.abs(e[5] - 1) > 1e-6 || Math.abs(e[10] - 1) > 1e-6 || e[1] || e[2] || e[4] || e[6] || e[8] || e[9])
continue;
var lx = x - e[12] + D.s / 2, lz = z - e[14] + D.s / 2;
if (lx < 0 || lz < 0 || lx >= D.s || lz >= D.s)
continue;
var gx = lx / D.cell, gz = lz / D.cell, ix = Math.min(D.n - 1, Math.floor(gx)), iz = Math.min(D.n - 1, Math.floor(gz)), u = gx - ix, v = gz - iz;
var Y = m.geometry.attributes.position.array, row = D.n + 1;
var ha = Y[(iz * row + ix) * 3 + 1], hb = Y[((iz + 1) * row + ix) * 3 + 1], hc = Y[((iz + 1) * row + ix + 1) * 3 + 1], hd = Y[(iz * row + ix + 1) * 3 + 1];
var h = (u + v <= 1) ? ha + (hd - ha) * u + (hb - ha) * v : hc + (hb - hc) * (1 - u) + (hd - hc) * (1 - v);
h += e[13];
if (best === null || h > best)
best = h;
}
return best;
}
];
});
