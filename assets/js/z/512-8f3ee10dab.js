/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(512, function () {
"use strict";
return [
function (G) {
if (typeof swkTree !== "function")
return;
var seen = {};
G.traverse(function (o) {
var m = o.material;
if (!o.isMesh || !m || Array.isArray(m) || !m.color || m.map || m.transparent || m.isMeshBasicMaterial || seen[m.uuid])
return;
var h = m.color.getHex();
if (h === 0xD8E0EA) {
seen[m.uuid] = 1;
m.color.setHex(0x8C98AA);
var t = typeof texOf === "function" && texOf("metal");
if (t)
m.map = t;
m.needsUpdate = true;
}
else if (h === 0xC8CCD4 || h === 0xE8ECF0 || h === 0xF0F0F0 || h === 0xFFFFFF) {
var hsl = {};
m.color.getHSL(hsl);
if (hsl.l > 0.75) {
seen[m.uuid] = 1;
m.color.multiplyScalar(0.82);
var t2 = typeof texOf === "function" && texOf("metal");
if (t2)
m.map = t2;
m.needsUpdate = true;
}
}
});
var D = new THREE.Group();
D.name = "std-dress";
G.add(D);
var L = swkAt(D, 19, 0, 10, 0), sofa = swkM(0x2A3A5A, "plaster"), frame = swkM(0x3A4250, "metal");
swkRug(L, 0, 0, 7, 5, 0x3A4A6A);
[[0, -2.2, 0], [0, 2.2, Math.PI]].forEach(function (s) { var S = swkAt(L, s[0], 0, s[1], s[2]); swkBox(S, 3.2, 0.45, 0.9, sofa, 0, 0.32, 0); swkBox(S, 3.2, 0.6, 0.25, sofa, 0, 0.75, -0.38); swkBox(S, 0.25, 0.3, 0.9, sofa, -1.6, 0.6, 0); swkBox(S, 0.25, 0.3, 0.9, sofa, 1.6, 0.6, 0); swkBox(S, 3.3, 0.1, 1.0, frame, 0, 0.06, 0); });
swkBox(L, 1.8, 0.08, 0.9, swkM(0x8A9098, "metal"), 0, 0.45, 0);
swkBox(L, 1.6, 0.4, 0.7, frame, 0, 0.2, 0);
swkBox(L, 0.3, 0.12, 0.2, swkM(0xD8D0C0), 0.4, 0.55, 0.1);
swkCyl(L, 0.05, 0.05, 0.12, swkM(0x8A3A2A), -0.4, 0.55, 0, 8);
[[-4.6, -2], [4.6, -2], [4.6, 2.6]].forEach(function (p, i) {
if (!swkKeep(i))
return;
var P = swkAt(L, p[0], 0, p[1], 0);
swkCyl(P, 0.35, 0.28, 0.7, swkM(0xE0E4EA, "plaster"), 0, 0.35, 0, 12);
for (var k = 0; k < 5; k++) {
var b = swkBall(P, 0.3, swkM([0x3E7A3A, 0x4E8A44, 0x2E6A30][k % 3], "foliage"), Math.cos(k * 1.3) * 0.22, 0.95 + k * 0.12, Math.sin(k * 1.3) * 0.22, 1);
b.scale.y = 1.3;
}
});
[[-20, 20, 0], [-22.5, 18, 0.4], [-18, 16.5, -0.2]].forEach(function (p, i) {
if (!swkKeep(i) && i === 2)
return;
var C = swkAt(D, p[0], 0, p[1], p[2]);
swkBox(C, 1.4, 0.9, 1.0, swkM(0x5A6A7A, "metal"), 0, 0.45, 0);
swkBox(C, 1.2, 0.8, 0.9, swkM(0x8A6A3A, "metal"), 0.1, 1.3, 0.05);
swkBox(C, 1.42, 0.1, 1.02, swkM(0xE8B030), 0, 0.7, 0);
});
var T = swkAt(D, -16, 0, 21, 0.3);
swkBox(T, 1.8, 0.1, 1.0, swkM(0x4A5260, "metal"), 0, 0.35, 0);
[[-0.8, -0.4], [0.8, -0.4], [-0.8, 0.4], [0.8, 0.4]].forEach(function (w) { swkCyl(T, 0.12, 0.12, 0.08, swkM(0x1A1A1A), w[0], 0.12, w[1], 10).rotation.x = Math.PI / 2; });
swkBox(T, 0.08, 0.9, 1.0, swkM(0x4A5260, "metal"), -0.9, 0.8, 0);
swkBox(T, 1.0, 0.6, 0.8, swkM(0x3A5A7A, "metal"), 0.2, 0.7, 0);
var P = [], cols = [0x2A4A7A, 0x2A4A7A, 0x5A6A7A, 0x8A2A2A, 0x2A5A4A];
for (var n = 0; n < (swkLite() ? 5 : 10); n++) {
var r = swkR(n * 29 + 5);
P.push([-20 + r() * 40, -22 + r() * 40, r() * 6.28, n % 4 === 0 ? "engineer" : n % 3 === 0 ? "pilot" : "crew", { walk: n % 3 === 2 ? 0 : 5, look: { top: cols[n % cols.length], bottom: 0x2A2E36 } }]);
}
P.push([15.6, 9.4, -1.4, "pilot", { look: { top: 0x2A4A7A } }]);
P.push([15.8, 11, -1.9, "crew", { look: { top: 0x5A6A7A } }]);
swkPeople(D, "std_crew", P, function () { return 0; });
}
];
});
