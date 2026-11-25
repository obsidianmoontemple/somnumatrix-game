/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(521, function () {
"use strict";
return [
function (G) {
if (typeof swkTree !== "function")
return;
var W = WORLDS.northpole, gr = function (x, z) { try {
return W.ground ? (W.ground(x, z, 0.5) || 0) : 0;
}
catch (e) {
return 0;
} };
var D = new THREE.Group();
D.name = "npd-dress";
G.add(D);
var snow = swkM(0xE8EEF4, "snow"), fir = 0x2E5A3A;
function firs(x, z, n, s) {
for (var i = 0; i < n; i++) {
if (!swkKeep(i))
continue;
var r = swkR(Math.round(x * 7 + z * 3) + i), tx = x + (r() - 0.5) * 10, tz = z + (r() - 0.5) * 10, sc = (s || 0.8) * (0.7 + r() * 0.5);
var T = swkTree(D, tx, tz, { kind: "conifer", s: sc, c: fir, y: gr(tx, tz) });
var cap = swkMesh(T, new THREE.ConeGeometry(1.2 * sc * 1.4, 1.6 * sc, 9), snow, 0, 9 * sc * 0.3 + 3 * 9 * sc * 0.17 + 0.6, 0);
}
}
function lantern(x, z) { swkLamp(D, x, z, { h: 3.4, y: gr(x, z), post: 0x1E1A18, c: 0xFFD898 }); }
function sledge(x, z, ry) {
var S = swkAt(D, x, gr(x, z), z, ry), w = swkM(0x8A2A22, "wood");
swkBox(S, 1.0, 0.12, 2.0, w, 0, 0.45, 0);
[-0.45, 0.45].forEach(function (e) { swkBox(S, 0.06, 0.06, 2.3, swkM(0x8A8A8A, "metal"), e, 0.08, 0.05); swkBox(S, 0.06, 0.4, 0.06, w, e, 0.25, -0.7); swkBox(S, 0.06, 0.4, 0.06, w, e, 0.25, 0.7); });
for (var p = 0; p < 3; p++)
swkBox(S, 0.42, 0.32, 0.42, swkM([0xC83A3A, 0x2A6A3A, 0xE8C040][p]), -0.2 + p * 0.2, 0.67 + (p === 1 ? 0.3 : 0), -0.4 + p * 0.4);
return S;
}
function snowman(x, z) {
var M = swkAt(D, x, gr(x, z), z, swkR(x | 0)() * 6);
swkBall(M, 0.55, snow, 0, 0.5, 0, 2);
swkBall(M, 0.4, snow, 0, 1.25, 0, 2);
swkBall(M, 0.28, snow, 0, 1.8, 0, 2);
swkMesh(M, new THREE.ConeGeometry(0.05, 0.3, 6), swkM(0xE86A1A), 0, 1.8, 0.38).rotation.x = Math.PI / 2;
swkCyl(M, 0.2, 0.2, 0.3, swkM(0x1A1A1A), 0, 2.15, 0, 10);
}
function parcels(x, z) { var P = swkAt(D, x, gr(x, z), z, 0.3); [[0, 0, 0.8, 0xC83A3A], [0.7, 0, 0.6, 0x2A6A3A], [0.3, 0.65, 0.5, 0xE8C040], [-0.6, 0.1, 0.5, 0x3A5AA8]].forEach(function (q) { swkBox(P, q[2], q[2] * 0.8, q[2], swkM(q[3]), q[0], (q[1] > 0 ? 0.64 : 0) + q[2] * 0.4, q[1] > 0 ? 0 : 0.1 * q[0]); swkBox(P, q[2] + 0.02, 0.06, 0.1, swkM(0xF0E8D0), q[0], (q[1] > 0 ? 0.64 : 0) + q[2] * 0.8, q[1] > 0 ? 0 : 0.1 * q[0]); }); }
firs(-150, 20, 6, 0.9);
firs(-170, 70, 5, 0.8);
firs(-120, 95, 4, 0.7);
[[-90, 45], [-120, 45], [-150, 45], [-120, 70]].forEach(function (p) { lantern(p[0], p[1]); });
swkBench(D, -105, 52, Math.PI, gr(-105, 52));
swkBench(D, -135, 52, Math.PI, gr(-135, 52));
snowman(-140, 62);
sledge(-128, 30, 0.6);
parcels(-82, 118);
var Wp = swkAt(D, -160, gr(-160, 48), 48, Math.PI / 2);
swkBox(Wp, 4, 0.1, 2, swkM(0x5A3A22, "wood"), 0, 2.2, 0);
[-1.9, 1.9].forEach(function (e) { swkBox(Wp, 0.12, 2.2, 0.12, swkM(0x5A3A22, "wood"), e, 1.1, -0.9); swkBox(Wp, 0.12, 2.2, 0.12, swkM(0x5A3A22, "wood"), e, 1.1, 0.9); });
swkBox(Wp, 4, 0.12, 2.1, snow, 0, 2.31, 0);
for (var l = 0; l < (swkLite() ? 6 : 14); l++) {
var lg = swkCyl(Wp, 0.16, 0.16, 1.6, swkM(0x7A5A3A, "bark"), -1.6 + (l % 7) * 0.5, 0.18 + Math.floor(l / 7) * 0.32, 0, 8);
lg.rotation.x = Math.PI / 2;
}
var bx = -35, bz = 165;
[[-18, -6], [-16, -3], [-18, -0.5]].forEach(function (p, i) { var H = swkAt(D, bx + p[0], gr(bx + p[0], bz + p[1]), bz + p[1], i * 0.3); swkBox(H, 1.2, 0.6, 0.8, swkM(0xC8A858, "thatch"), 0, 0.3 + (i === 1 ? 0.6 : 0), 0); });
var Tr = swkAt(D, bx - 14, gr(bx - 14, bz - 12), bz - 12, 0.2);
swkBox(Tr, 2.4, 0.5, 0.7, swkM(0x6A4A2E, "wood"), 0, 0.25, 0);
swkBox(Tr, 2.2, 0.06, 0.5, swkM(0x8A9A6A, "foliage"), 0, 0.48, 0);
sledge(bx + 16, bz - 14, -0.4);
lantern(bx - 20, bz - 16);
lantern(bx + 18, bz - 18);
firs(bx + 28, bz + 4, 4, 0.8);
var ox = 20, oz = -115;
for (var s = 0; s < (swkLite() ? 3 : 6); s++) {
var Sk = swkAt(D, ox - 6 + s * 0.8, gr(ox - 6, oz + 16), oz + 16 + (s % 2) * 0.6, s);
var b = swkBall(Sk, 0.4, swkM(0xA89878, "plaster"), 0, 0.38, 0, 1);
b.scale.set(1, 1.1, 0.8);
}
var Pb = swkAt(D, ox + 8, gr(ox + 8, oz + 16), oz + 16, 0);
swkCyl(Pb, 0.35, 0.35, 1.5, swkM(0xB82A22, "metal"), 0, 0.75, 0, 14);
swkBall(Pb, 0.36, swkM(0xB82A22, "metal"), 0, 1.5, 0, 1).scale.y = 0.5;
swkBox(Pb, 0.4, 0.06, 0.05, swkM(0x1A1A1A), 0, 1.2, 0.34);
lantern(ox - 12, oz + 18);
lantern(ox + 14, oz + 18);
swkBench(D, ox + 2, oz + 22, Math.PI, gr(ox + 2, oz + 22));
parcels(ox - 14, oz + 10);
snowman(ox + 24, oz + 26);
firs(ox - 30, oz + 20, 4, 0.8);
var L = [], elf = { top: 0x2A6A3A, bottom: 0xC83A3A, hat: "pixie", hatColor: 0xC83A3A };
[[-120, 58, 0, 1], [-140, 36, 2, 1], [-95, 100, 1, 0], [-50, 145, 3, 1], [ox - 4, oz + 19, 2, 1], [ox + 6, oz + 20, -1, 1], [ox, oz + 26, 0, 0], [-160, 60, 1, 0], [-30, 120, 2, 1], [60, 40, 3, 1]].forEach(function (p, i) {
L.push([p[0], p[1], p[2], p[3] ? "elf" : "", { walk: i % 3 === 0 ? 0 : 6, child: !!p[3], look: p[3] ? elf : { top: 0x8A2A2A, layer: "coat", layerColor: 0x5A3A2A, hat: "beanie", hatColor: 0xE8E0D0 } }]);
});
swkPeople(D, "npd", L, gr);
}
];
});
