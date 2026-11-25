/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(468, function () {
"use strict";
return [
function (spec) {
var h = dfhHash(spec && spec.id), B = DFH_BREEDS[h % DFH_BREEDS.length], cock = (h >>> 5) % 6 === 0;
var RED = 0xC8221E, YEL = 0xE8B030, k = cock ? 1.12 : 1;
var g = new THREE.Group(), body = new THREE.Group();
g.add(body);
body.scale.setScalar(k);
if (cock)
B = { body: 0x7A2E16, wing: 0x5A2A12, tail: 0x14261E, neck: 0xD89A30 };
dfhPut(dfhSph(0.16), B.body, 0, 0.23, -0.01, 0.86, 0.8, 1.22, -0.16, 0, 0, body);
dfhPut(dfhSph(0.12), B.body, 0, 0.22, 0.09, 0.92, 1, 0.9, 0, 0, 0, body);
dfhPut(dfhSph(0.1), B.body, 0, 0.17, -0.03, 1.05, 0.7, 1.2, 0, 0, 0, body);
[-1, 1].forEach(function (sd) {
dfhPut(dfhSph(0.11), B.wing, sd * 0.118, 0.245, -0.02, 0.32, 0.62, 1.12, -0.18, sd * 0.06, 0, body);
dfhPut(dfhSph(0.06), B.wing, sd * 0.112, 0.215, -0.13, 0.3, 0.5, 1.0, -0.4, 0, 0, body);
});
for (var i = -2; i <= 2; i++)
dfhPut(dfhSph(0.085), B.tail, i * 0.022, 0.34, -0.17, 0.16, 1, 0.42, -0.42, 0, i * 0.2, body);
if (cock) {
for (var j = -1; j <= 1; j++) {
var arc = new THREE.Mesh(new THREE.TorusGeometry(0.13 + Math.abs(j) * 0.02, 0.012, 5, 14, Math.PI * 0.95), dfhMat(0x10261C));
arc.position.set(j * 0.03, 0.32, -0.24);
arc.rotation.set(0, Math.PI / 2, 0.15 + j * 0.12);
arc.scale.set(1, 1.15, 1);
body.add(arc);
}
}
[-1, 1].forEach(function (sd) {
dfhPut(dfhSph(0.055), B.body, sd * 0.05, 0.14, 0.0, 0.9, 1.1, 1, 0, 0, 0, body);
dfhPut(dfhCyl(0.011, 0.012, 0.12, 6), YEL, sd * 0.05, 0.065, 0.01, 1, 1, 1, 0, 0, 0, body);
[-0.5, 0, 0.5].forEach(function (a) { dfhPut(dfhCyl(0.006, 0.008, 0.07, 5), YEL, sd * 0.05 + Math.sin(a) * 0.03, 0.006, 0.01 + Math.cos(a) * 0.03, 1, 1, 1, Math.PI / 2, 0, -a, body); });
dfhPut(dfhCyl(0.006, 0.008, 0.04, 5), YEL, sd * 0.05, 0.008, -0.012, 1, 1, 1, -Math.PI / 2 + 0.2, 0, 0, body);
});
var nk = new THREE.Group();
nk.position.set(0, 0.3, 0.12);
body.add(nk);
dfhPut(dfhSph(0.072), B.neck, 0, 0.045, 0.01, 0.9, 1.25, 0.95, 0.3, 0, 0, nk);
dfhPut(dfhSph(0.052), B.neck, 0, 0.11, 0.045, 1, 1, 1.05, 0, 0, 0, nk);
dfhPut(dfhCone(0.015, 0.045), YEL, 0, 0.104, 0.11, 1, 1, 1, Math.PI / 2, 0, 0, nk);
dfhPut(dfhCone(0.012, 0.03), 0xC8901E, 0, 0.096, 0.105, 1, 0.7, 1, Math.PI / 2 + 0.25, 0, 0, nk);
[-1, 1].forEach(function (sd) {
dfhPut(dfhSph(0.011, 8, 6), 0xD8781E, sd * 0.042, 0.122, 0.07, 1, 1, 1, 0, 0, 0, nk);
dfhPut(dfhSph(0.007, 8, 6), 0x101010, sd * 0.047, 0.123, 0.075, 1, 1, 1, 0, 0, 0, nk);
dfhPut(dfhSph(cock ? 0.024 : 0.016, 8, 6), RED, sd * 0.012, 0.066, 0.098, 0.6, 1.5, 0.8, 0, 0, 0, nk);
dfhPut(dfhSph(0.012, 8, 6), 0xE8E0D0, sd * 0.05, 0.105, 0.04, 0.4, 1, 1, 0, 0, 0, nk);
});
var cn = cock ? 6 : 5, cs = cock ? 1.5 : 1;
for (var c = 0; c < cn; c++) {
var t = c / (cn - 1), y = 0.155 + Math.sin(t * Math.PI) * 0.018 * cs;
dfhPut(dfhSph(0.017 * cs, 8, 6), RED, 0, y, 0.085 - t * 0.075, 0.45, 1.2, 0.8, 0, 0, 0, nk);
}
dfhPut(dfhSph(0.03, 8, 6), RED, 0, 0.148, 0.05, 0.4, 0.45, 1.3, 0, 0, 0, nk);
var seed = (h % 1000) / 100;
g.userData.anim = function (t) {
var p = (t * 0.6 + seed) % 7;
if (p < 1.2) {
var q = Math.sin(p / 1.2 * Math.PI);
nk.rotation.x = q * 1.05;
nk.position.z = 0.12 + q * 0.03;
}
else {
nk.rotation.x = Math.sin(t * 3 + seed) * 0.06;
nk.position.z = 0.12;
}
};
g.userData.hen = 1;
return g;
}
];
});
