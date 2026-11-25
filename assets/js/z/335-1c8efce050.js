/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(335, function () {
"use strict";
return [
function (r1, r2, len, seg) {
var pts = [], n = 6;
for (var i = 0; i <= n; i++) {
var a = -Math.PI / 2 + i / n * Math.PI / 2;
pts.push(new THREE.Vector2(Math.cos(a) * r1, -len / 2 + Math.sin(a) * r1));
}
for (var j = 0; j <= n; j++) {
var b = j / n * Math.PI / 2;
pts.push(new THREE.Vector2(Math.cos(b) * r2, len / 2 + Math.sin(b) * r2));
}
return new THREE.LatheGeometry(pts, mmSeg(seg || 14));
},
function (P, mat, pts, depth, x, y, z, rx, ry, rz) {
var s = new THREE.Shape();
s.moveTo(pts[0][0], pts[0][1]);
for (var i = 1; i < pts.length; i++)
s.lineTo(pts[i][0], pts[i][1]);
var bev = Math.min(depth * 0.45, 0.25);
var g = new THREE.ExtrudeGeometry(s, { depth: depth, bevelEnabled: !mmLite(), bevelThickness: bev, bevelSize: bev, bevelSegments: 2 });
g.translate(0, 0, -depth / 2);
mmUv(g, 0.22);
var m = mmMesh(g, mat, x, y, z, P);
m.rotation.set(rx || 0, ry || 0, rz || 0);
return m;
},
function (P, mat, pts, r0, x, y, z) {
var c = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); })), n = mmLite() ? 6 : 10, G = new THREE.Group();
G.position.set(x || 0, y || 0, z || 0);
P.add(G);
for (var i = 0; i < n; i++) {
var a = c.getPoint(i / n), b = c.getPoint((i + 1) / n), L = a.distanceTo(b), r1 = r0 * (1 - i / n), r2 = r0 * (1 - (i + 1) / n);
var m = mmMesh(new THREE.CylinderGeometry(Math.max(0.01, r2), r1, L * 1.04, mmSeg(10)), mat, (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2, G);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
}
return G;
},
function (P, mat, a, b, r1, r2, seg) {
var A = new THREE.Vector3(a[0], a[1], a[2]), B = new THREE.Vector3(b[0], b[1], b[2]), L = A.distanceTo(B) || 0.001;
var m = mmMesh(new THREE.CylinderGeometry(r2 === undefined ? r1 : r2, r1, L, mmSeg(seg || 10)), mat, (A.x + B.x) / 2, (A.y + B.y) / 2, (A.z + B.z) / 2, P);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
return m;
},
function (P, hous, rod, a, b, r) {
var A = new THREE.Vector3(a[0], a[1], a[2]), B = new THREE.Vector3(b[0], b[1], b[2]), M = A.clone().lerp(B, 0.58);
mmRod(P, hous, a, [M.x, M.y, M.z], r, r * 0.9, 12);
mmRod(P, rod, [M.x, M.y, M.z], b, r * 0.5, r * 0.5, 10);
var c = A.clone().lerp(B, 0.6);
mmRod(P, hous, [c.x, c.y, c.z], [M.x + (B.x - A.x) * 0.04, M.y + (B.y - A.y) * 0.04, M.z + (B.z - A.z) * 0.04], r * 1.15, r * 1.15, 12);
},
function () {
var g = new THREE.Group(), brass = mmMat(0xB8873A, { shine: 60, tex: "brass", spec: 0xE8C890 }), dark = mmMat(0x3A3026, { shine: 30, tex: "worn" }), iron = mmMat(0x5A5650, { shine: 40, tex: "plate" }), copper = mmMat(0xB0643A, { shine: 50 }), lamp = mmMat(0xFFC878, { e: 0xFFA040, ei: 0.9 }), glass = mmMat(0xF0B860, { glow: 1, op: 0.55 });
var body = mmG(g, 0, 7, 0);
mmEll(body, brass, 5.2, 3.6, 7.2, 0, 0.4, 5.2, 22);
mmEll(body, dark, 4.4, 0.6, 6.6, 0, -2.8, 5.2, 18);
for (var b = 0; b < 5; b++)
mmTorus(body, copper, 4.95 - Math.abs(b - 2) * 0.55, 0.16, 0, 0.4, 1.8 + b * 1.7, 0, 0, 0);
var th = mmEll(body, brass, 4.2, 3.0, 4.6, 0, 0.9, -3.6, 22);
mmEll(body, iron, 3.6, 0.5, 4.0, 0, -1.8, -3.6, 16);
for (var w = 0; w < 7; w++) {
var a = -0.9 + w * 0.3;
mmCyl(body, glass, 0.42, 0.42, 0.12, Math.sin(a) * 3.7, 1.5, -3.6 - Math.cos(a) * 4.0, Math.PI / 2, 0, -a, 12);
mmTorus(body, copper, 0.48, 0.08, Math.sin(a) * 3.75, 1.5, -3.6 - Math.cos(a) * 4.08, 0, a, 0);
}
[-1, 1].forEach(function (s) {
mmHorn(body, iron, [[s * 1.4, -0.6, -7.6], [s * 1.9, -1.6, -9.2], [s * 1.2, -2.6, -10.4]], 0.45, 0, 0, 0);
mmCyl(body, copper, 0.55, 0.7, 0.8, s * 2.2, -0.2, -7.7, Math.PI / 2, 0, 0, 14);
mmMesh(new THREE.CircleGeometry(0.5, mmSeg(14)), lamp, s * 2.2, -0.2, -8.12, body).rotation.y = Math.PI;
});
[-1.6, 1.6].forEach(function (x) { mmCyl(body, dark, 0.5, 0.6, 3.6, x, 4.4, 7.6, 0, 0, 0, 14); mmTorus(body, copper, 0.58, 0.12, x, 6.2, 7.6, Math.PI / 2, 0, 0); });
var tur = mmG(body, 0, 3.6, 2.4);
mmLathe(tur, iron, [[0, 0], [2.6, 0], [2.8, 0.6], [2.4, 1.5], [1.4, 2.0], [0, 2.1]], 0, 0, 0, 20);
[-0.8, 0.8].forEach(function (x) { mmCyl(tur, dark, 0.32, 0.38, 5.2, x, 1.1, -3.6, Math.PI / 2, 0, 0, 12); mmCyl(tur, copper, 0.46, 0.46, 0.6, x, 1.1, -6.0, Math.PI / 2, 0, 0, 12); });
var legs = [], lite = mmLite(), chrome = mmMat(0xD8D4CC, { shine: 100, metal: 0.95, rough: 0.15 });
[-1, 1].forEach(function (s) {
[[-5.6, -0.95], [-2.6, -0.35], [0.6, 0.35], [3.4, 0.95]].forEach(function (q, i) {
var z = q[0], fan = q[1], G = mmG(body, s * 3.4, -0.6, z);
G.rotation.y = (s > 0 ? 0 : Math.PI) + (s > 0 ? -fan : fan);
var kx = 6.2, ky = 3.6, fx = 12.4 - (i === 0 || i === 3 ? 0 : 0.6), fy = -6.35;
mmEll(G, copper, 0.9, 0.9, 0.9, 0, 0, 0, 14);
mmCaps(G, brass, 0.62, 0.48, Math.hypot(kx, ky) - 0.6, kx / 2, ky / 2, 0, 0, 0, -Math.atan2(kx, ky), lite ? 10 : 14);
if (!lite) {
mmPiston(G, iron, chrome, [0.4, -0.7, 0], [kx * 0.62, ky * 0.62 - 0.55, 0], 0.22);
mmTube(G, copper, [[0.2, 0.5, 0.35], [kx * 0.5, ky * 0.5 + 0.55, 0.42], [kx - 0.4, ky + 0.3, 0.3]], 0.09, 0, 0, 0, 12);
}
mmEll(G, iron, 0.7, 0.7, 0.7, kx, ky, 0, 12);
mmTorus(G, copper, 0.72, 0.12, kx, ky, 0, 0, 0, 0);
var tl = Math.hypot(fx - kx, ky - fy), ta = Math.atan2(fx - kx, ky - fy);
mmCaps(G, iron, 0.24, 0.46, tl - 0.4, (kx + fx) / 2, (ky + fy) / 2, 0, 0, 0, ta, lite ? 10 : 14);
for (var bnd = 0; bnd < (lite ? 2 : 4); bnd++) {
var u = 0.18 + bnd * 0.2;
mmTorus(G, brass, 0.48 - u * 0.2, 0.07, kx + (fx - kx) * u, ky + (fy - ky) * u, 0, 0, 0, -ta + Math.PI / 2);
}
if (!lite)
mmPiston(G, iron, chrome, [kx + 0.3, ky - 0.6, 0.3], [kx + (fx - kx) * 0.55, ky + (fy - ky) * 0.55, 0.3], 0.14);
mmCone(G, dark, 0.42, 1.4, fx, fy + 0.55, 0, Math.PI, 0, 0, 10);
legs.push({ G: G, y0: G.rotation.y, s: s, ph: (i % 2 === 0) === (s > 0) ? 0 : Math.PI });
});
});
function mmSph(P, mat, r) { return mmEll(P, mat, r, r, r, 0, 0, 0, 12); }
var steam = [];
if (typeof wGlow === "function")
[-1.6, 1.6].forEach(function (x) { for (var q = 0; q < 3; q++) {
var s2 = wGlow(0xD8D4CC, 2.2 + q, 0.12);
s2.material.blending = THREE.NormalBlending;
s2.position.set(x, 6.6 + q * 1.6, 7.6);
body.add(s2);
steam.push({ s: s2, x: x, q: q });
} });
return { g: g, h: 12, seat: [0, -5.8], muzzles: [[-0.8, 10.7, -3.8], [0.8, 10.7, -3.8]], turret: tur,
anim: function (dt, mv, st) {
st.ph = (st.ph || 0) + mv * 0.55;
st.t = (st.t || 0) + dt;
var mvg = Math.min(1, mv * 20);
legs.forEach(function (L) { var c = Math.sin(st.ph + L.ph); L.G.rotation.z = Math.max(0, c) * 0.1 * mvg; L.G.rotation.y = L.y0 + Math.cos(st.ph + L.ph) * 0.12 * mvg * L.s; });
body.position.y = 7 + Math.abs(Math.sin(st.ph)) * 0.12;
steam.forEach(function (S) { var u = ((st.t * 0.25 + S.q / 3) % 1); S.s.position.y = 6.6 + u * 5; S.s.material.opacity = 0.16 * Math.sin(u * Math.PI); S.s.scale.setScalar(2 + u * 4); });
} };
},
function () {
var g = new THREE.Group(), hull = mmMat(0xC8C4BA, { shine: 30, tex: "worn", rep: 2 }), grey = mmMat(0x8A8A86, { shine: 30, tex: "plate" }), dark = mmMat(0x3A3C40, { shine: 20 }), red = mmMat(0xB4482E, { shine: 20, tex: "worn" }), glass = mmMat(0x9ACBE0, { shine: 90, e: 0x2A5A70, ei: 0.5 }), eng = mmMat(0x8AD0FF, { glow: 1, op: 0.85 });
var H = mmG(g, 0, 2.8, 0);
mmLathe(H, hull, [[0, -1.5], [6.5, -1.3], [9.4, -0.5], [9.8, 0], [9.4, 0.5], [6.5, 1.2], [2.6, 1.7], [0, 1.8]], 0, 0, 0, 40);
[-1, 1].forEach(function (s) { var p = mmSlab(H, hull, 3.0, 1.3, 8.5, s * 2.9, 0, -11.0); p.rotation.y = s * -0.04; mmSlab(H, grey, 2.2, 0.3, 7.6, s * 2.9, 0.72, -11.0); mmSlab(H, red, 0.5, 0.32, 6.0, s * 2.9, 0.82, -10.4); });
mmSlab(H, dark, 3.4, 0.9, 2.0, 0, -0.1, -8.6);
var C = mmG(H, -8.6, 0.2, -6.6);
mmCaps(C, hull, 1.05, 1.05, 6.4, 0, 0, 1.4, Math.PI / 2, 0, 0, 16);
mmLathe(C, glass, [[0, 0], [1.05, 0], [0.98, 0.6], [0.7, 1.3], [0.3, 1.7], [0, 1.8]], 0, 0, -1.8, 16).rotation.x = -Math.PI / 2;
for (var f = 0; f < 4; f++)
mmTorus(C, dark, 1.0 - f * 0.08, 0.05, 0, 0, -1.9 - f * 0.42, 0, 0, 0);
var T = mmG(H, 0, 1.8, 0.6);
mmLathe(T, grey, [[0, 0], [1.6, 0], [1.5, 0.6], [1.0, 1.1], [0, 1.2]], 0, 0, 0, 18);
mmEll(T, glass, 0.8, 0.5, 0.8, 0, 0.85, -0.6, 12);
[-0.45, 0.45].forEach(function (x) { mmCyl(T, dark, 0.12, 0.14, 2.8, x, 0.6, -2.2, Math.PI / 2, 0, 0, 10); });
mmTorus(H, dark, 9.3, 0.62, 0, 0, 0, Math.PI / 2, 0, 0.6, Math.PI * 0.62).rotation.set(Math.PI / 2, 0, Math.PI * 0.19);
var band = mmTorus(H, eng, 9.62, 0.28, 0, 0, 0, Math.PI / 2, 0, 0, Math.PI * 0.55);
band.rotation.set(Math.PI / 2, 0, Math.PI * 0.225);
mmGlow(H, 0x8AD0FF, 9, 0.18, 0, 0, 9.6);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2 + 0.2;
mmSlab(H, i % 3 ? grey : red, 1.6, 0.18, 2.4, Math.cos(a) * 5.2, 1.32, Math.sin(a) * 5.2, 0, -a, 0);
}
var dish = mmG(H, 3.6, 1.6, -2.4);
mmLathe(dish, grey, [[0, 0], [1.4, 0.25], [1.6, 0.5]], 0, 0, 0, 16).rotation.x = 0.5;
mmCyl(dish, dark, 0.08, 0.08, 0.8, 0, -0.3, 0, 0, 0, 0, 6);
[[0, -5], [-4.4, 3.4], [4.4, 3.4]].forEach(function (q) { mmCyl(H, dark, 0.18, 0.24, 2.2, q[0], -2.2, q[1], 0, 0, 0, 8); mmCyl(H, grey, 0.7, 0.8, 0.2, q[0], -3.2, q[1], 0, 0, 0, 12); });
var lite = mmLite(), chrome = mmMat(0xD8DCE0, { shine: 100, metal: 0.95, rough: 0.15 });
mmLathe(H, grey, [[6.6, 1.22], [7.0, 1.16], [7.0, 1.26], [6.6, 1.32]], 0, 0, 0, 40);
mmLathe(H, dark, [[3.0, 1.72], [3.3, 1.68], [3.3, 1.8], [3.0, 1.84]], 0, 0, 0, 32);
if (!lite)
for (var hp = 0; hp < 14; hp++) {
var ha = hp / 14 * Math.PI * 2;
mmSlab(H, hp % 4 ? grey : hull, 2.0, 0.12, 1.4, Math.cos(ha) * 7.9, 0.62, Math.sin(ha) * 7.9, 0.12 * Math.sin(ha) * 0, -ha, -0.2);
}
var VT = mmG(H, 0, -1.5, 0.6);
mmLathe(VT, grey, [[0, 0], [1.4, 0], [1.3, -0.5], [0.9, -0.9], [0, -1.0]], 0, 0, 0, 16);
[-0.4, 0.4].forEach(function (x) { mmCyl(VT, dark, 0.11, 0.13, 2.4, x, -0.5, -1.9, Math.PI / 2, 0, 0, 10); });
var TB = mmG(H, 0, 0, 8.4);
mmSlab(TB, dark, 7.6, 1.4, 1.6, 0, 0, 0);
mmSlab(TB, grey, 7.8, 0.2, 1.7, 0, 0.75, 0);
for (var tn = 0; tn < 6; tn++) {
var tx = -3.1 + tn * 1.24;
mmCyl(TB, grey, 0.42, 0.56, 0.9, tx, 0, 0.95, Math.PI / 2, 0, 0, 14);
mmMesh(new THREE.CircleGeometry(0.4, mmSeg(14)), eng, tx, 0, 1.42, TB);
}
if (!lite)
for (var cr = 0; cr < 5; cr++)
mmTorus(C, grey, 1.08, 0.06, 0, 0, 2.6 - cr * 0.9, 0, 0, 0);
mmLamp(C, dark, 0xFFF0D0, 0.18, 0.7, -0.6, -1.2, 0, 0);
var MS = mmG(H, -3.0, 1.7, 2.6);
mmCyl(MS, dark, 0.1, 0.14, 2.4, 0, 1.2, 0, 0, 0, 0, 8);
mmEll(MS, glass, 0.28, 0.28, 0.28, 0, 2.5, 0, 10);
if (!lite) {
mmRod(MS, grey, [0, 2.0, 0], [0.9, 2.4, 0], 0.03, 0.03, 5);
mmRod(MS, grey, [0, 1.6, 0], [-0.8, 2.1, 0.3], 0.03, 0.03, 5);
}
if (!lite)
[[0, -5], [-4.4, 3.4], [4.4, 3.4]].forEach(function (q) { mmPiston(H, dark, chrome, [q[0], -1.4, q[1]], [q[0] + 0.4, -3.0, q[1] + 0.4], 0.14); });
[[-9.7, 0, 0, 0xD83A2A], [9.7, 0, 0, 0x3AD86A], [0, 0, 9.6, 0xF0F0E8]].forEach(function (L) { mmMesh(new THREE.SphereGeometry(0.18, 8, 6), mmMat(L[3], { glow: 1 }), L[0], L[1], L[2], H); });
return { g: g, h: 5, seat: [-8.6, -7.6], muzzles: [[-0.45, 5.2, -1.8], [0.45, 5.2, -1.8]], turret: T,
anim: function (dt, mv, st) {
st.t = (st.t || 0) + dt;
var air = st.alt > 0.6;
H.position.y = 2.8 + (air ? Math.sin(st.t * 1.3) * 0.12 : 0);
H.rotation.z = air ? THREE.MathUtils.lerp(H.rotation.z, -(st.turn || 0) * 0.25, Math.min(1, dt * 3)) : 0;
} };
},
function () {
var g = new THREE.Group(), pod = mmMat(0x5A6270, { shine: 70, tex: "plate" }), dark = mmMat(0x24262C, { shine: 40 }), vane = mmMat(0x2A3040, { shine: 90, spec: 0x6A7AA0 }), rib = mmMat(0x8A92A0, { shine: 60 }), glass = mmMat(0x2A3A4A, { shine: 120, e: 0x0A3A5A, ei: 0.5 }), eng = mmMat(0x9AFF8A, { glow: 1, op: 0.8 });
var H = mmG(g, 0, 3.0, 0);
mmLathe(H, pod, [[0, -1.6], [1.1, -1.35], [1.55, -0.6], [1.6, 0.2], [1.3, 1.4], [0.8, 2.3], [0.5, 2.6]], 0, 0, 0, 22).rotation.x = Math.PI / 2;
var eye = mmMesh(new THREE.SphereGeometry(1.2, mmSeg(18), mmSeg(10), 0, Math.PI * 2, 0, Math.PI / 2.6), glass, 0, 0, -1.12, H);
eye.rotation.x = -Math.PI / 2;
for (var s = 0; s < 6; s++) {
var a = s / 6 * Math.PI * 2;
mmCyl(H, dark, 0.04, 0.04, 1.6, Math.cos(a) * 0.55, Math.sin(a) * 0.55, -1.95, Math.PI / 2 + Math.sin(a) * 0.3, 0, 0, 4);
}
mmTorus(H, dark, 1.18, 0.09, 0, 0, -1.36, 0, 0, 0);
[-0.5, 0.5].forEach(function (x) { mmCyl(H, dark, 0.1, 0.13, 1.6, x, -1.05, -1.6, Math.PI / 2, 0, 0, 10); });
mmCyl(H, dark, 0.55, 0.45, 0.5, 0, 0, 2.7, Math.PI / 2, 0, 0, 14);
mmMesh(new THREE.CircleGeometry(0.4, mmSeg(14)), eng, 0, 0, 2.96, H);
mmGlow(H, 0x9AFF8A, 2.2, 0.25, 0, 0, 3.3);
[-1, 1].forEach(function (sd) {
mmCyl(H, pod, 0.32, 0.42, 2.6, sd * 2.6, 0, 0.1, 0, 0, Math.PI / 2, 12);
mmEll(H, dark, 0.5, 0.5, 0.7, sd * 3.9, 0, 0.1, 12);
var V = mmG(H, sd * 4.3, 0, 0.1);
mmFlat(V, vane, [[0, 5.0], [0.0, 5.0], [2.1, 3.0], [2.4, -2.6], [0, -5.0], [-2.4, -2.6], [-2.1, 3.0]], 0.16, 0, 0, 0, 0, Math.PI / 2, 0);
mmFlat(V, rib, [[0, 5.2], [2.3, 3.05], [2.6, -2.65], [0, -5.25], [-2.6, -2.65], [-2.3, 3.05]], 0.06, sd * 0.12, 0, 0, 0, Math.PI / 2, 0).scale.set(1, 1.0, 1.0);
for (var r = -3; r <= 3; r++)
mmSlab(V, rib, 0.14, 0.12, 4.2 - Math.abs(r) * 0.35, sd * 0.05, r * 1.25, 0);
mmSlab(V, rib, 0.16, 9.4, 0.18, sd * 0.05, 0, 0);
});
var lite = mmLite();
mmTorus(H, rib, 1.24, 0.06, 0, 0, -1.25, 0, 0, 0);
if (!lite)
for (var ar = 0; ar < 6; ar++) {
var aa = ar / 6 * Math.PI * 2 + 0.5;
mmSlab(H, ar % 2 ? pod : dark, 0.9, 0.1, 1.6, Math.cos(aa) * 1.5, Math.sin(aa) * 1.5, 0.6, 0, 0, aa + Math.PI / 2);
}
mmCyl(H, dark, 0.62, 0.62, 0.18, 0, 0, 2.2, Math.PI / 2, 0, 0, 16);
mmTorus(H, rib, 0.62, 0.05, 0, 0, 2.3, 0, 0, 0);
[-1, 1].forEach(function (sd) {
mmSlab(H, dark, 1.8, 0.5, 0.7, sd * 2.6, 0.32, 0.1);
mmCyl(H, rib, 0.42, 0.42, 0.12, sd * 2.6, 0, 1.45, Math.PI / 2, 0, 0, 14);
var WC = mmG(H, sd * 3.9, -0.6, -0.4);
mmCyl(WC, dark, 0.08, 0.11, 2.0, 0, 0, -1.0, Math.PI / 2, 0, 0, 8);
mmCyl(WC, rib, 0.13, 0.13, 0.4, 0, 0, 0.1, Math.PI / 2, 0, 0, 8);
var ed = [[0, 5.15], [2.25, 3.05], [2.55, -2.6], [0, -5.15]].map(function (p) { return [sd * 4.3 + sd * 0.2, p[1], 0.1 + p[0]]; }), ed2 = ed.map(function (p) { return [p[0], p[1], 0.2 - (p[2] - 0.1)]; });
if (!lite) {
mmSeam(H, 0x9AFF8A, ed, 0.04);
mmSeam(H, 0x9AFF8A, ed2, 0.04);
}
});
mmEll(H, dark, 0.5, 0.3, 0.6, 0, -1.3, -0.4, 10);
mmLamp(H, dark, 0xC8FFD0, 0.12, 0, -1.4, -0.95, 0.4, 0);
return { g: g, h: 8, seat: [0, -0.3], muzzles: [[-0.5, 1.95, -2.5], [0.5, 1.95, -2.5]],
anim: function (dt, mv, st) {
st.t = (st.t || 0) + dt;
var air = st.alt > 0.6;
H.position.y = 3.0 + (air ? Math.sin(st.t * 1.6) * 0.1 : 0);
H.rotation.z = air ? THREE.MathUtils.lerp(H.rotation.z, -(st.turn || 0) * 0.4, Math.min(1, dt * 3)) : 0;
} };
},
function () {
var lite = mmLite(), g = new THREE.Group(), pearl = mmMat(0xEEE6F2, { shine: 110, tex: "pearl", spec: 0xC8B8E8 }), pearl2 = mmMat(0xB4A8CC, { shine: 90, tex: "pearl" }), dusk = mmMat(0x3E3458, { shine: 60, metal: 0.7, rough: 0.35 }), steel = mmMat(0x8A86A0, { shine: 80, tex: "plate", metal: 0.85, rough: 0.3 }), dome = mmMat(0xE2D2FF, { shine: 120, op: 0.42, spec: 0xFFFFFF }), win = mmMat(0xFFE2A8, { glow: 1 }), vio = mmMat(0xB88AFF, { glow: 1, op: 0.8 }), fireC = mmMat(0xCFE6FF, { glow: 1 }), fireO0 = new THREE.MeshBasicMaterial({ color: 0x7A8CFF, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }), fireH0 = new THREE.MeshBasicMaterial({ color: 0x5A5AE0, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending }), fireI0 = new THREE.MeshBasicMaterial({ color: 0xE8F0FF, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending }), grass = mmMat(0x4E9A3A, { rough: 0.95, metal: 0 }), grass2 = mmMat(0x6AB84A, { rough: 0.95, metal: 0 }), leaf = mmMat(0x2E7A30, { rough: 0.9, metal: 0 }), leaf2 = mmMat(0x4A9A3A, { rough: 0.9, metal: 0 }), bark = mmMat(0x6A4A2E, { rough: 0.9, metal: 0 }), pond = mmMat(0x5AA8D8, { shine: 120, metal: 0.2, rough: 0.1 }), rock = mmMat(0x9A9488, { rough: 0.9, metal: 0 });
var ramp = MM_BUILD.__dsRamp;
if (!ramp) {
var cv = document.createElement("canvas");
cv.width = 4;
cv.height = 64;
var cx = cv.getContext("2d"), gr = cx.createLinearGradient(0, 0, 0, 64);
gr.addColorStop(0, "#000");
gr.addColorStop(0.55, "#444");
gr.addColorStop(0.85, "#bbb");
gr.addColorStop(1, "#fff");
cx.fillStyle = gr;
cx.fillRect(0, 0, 4, 64);
ramp = MM_BUILD.__dsRamp = new THREE.CanvasTexture(cv);
}
var fireO = new THREE.MeshBasicMaterial({ color: 0x7A88F0, map: ramp, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }), fireI = new THREE.MeshBasicMaterial({ color: 0xC8D8FF, map: ramp, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
var H = mmG(g, 0, 4.2, 0), R = wRand(77);
var prof = [[0, -21], [2.4, -20.2], [4.4, -17.6], [5.7, -13], [6.4, -7], [6.7, -1], [6.6, 5], [6.2, 11], [5.6, 15.5], [5.2, 18], [0, 18.6]];
var hull = mmLathe(H, pearl, prof, 0, 0, 0, lite ? 20 : 36);
hull.rotation.x = Math.PI / 2;
hull.scale.set(1.7, 1, 0.56);
var hw = function (z) { for (var i = 1; i < prof.length; i++) {
if (z <= prof[i][1]) {
var a = prof[i - 1], b = prof[i], u = (z - a[1]) / (b[1] - a[1]);
return (a[0] + (b[0] - a[0]) * u);
}
} return 0; };
var keel = mmLathe(H, dusk, [[0, -17], [3.6, -14], [4.6, -6], [4.6, 8], [3.8, 15], [0, 17]], 0, -1.7, 0, lite ? 14 : 24);
keel.rotation.x = Math.PI / 2;
keel.scale.set(1.5, 1, 0.25);
if (!lite)
[-1, 1].forEach(function (s) { mmSeam(H, 0xB88AFF, [[s * 4.0, -0.2, -18.6], [s * 8.2, 0.1, -12], [s * 10.8, 0.2, -4], [s * 11.2, 0.2, 4], [s * 10.4, 0.1, 11], [s * 9.0, 0, 16]], 0.07); });
var DZ = -4.5, DY = 2.0, DR = 8.6;
mmLathe(H, steel, [[DR - 0.4, 0], [DR + 0.9, 0], [DR + 1.1, 0.5], [DR + 0.5, 1.0], [DR - 0.2, 1.1]], 0, DY - 0.4, DZ, lite ? 20 : 40);
mmTorus(H, vio, DR + 0.55, 0.12, 0, DY + 0.65, DZ, Math.PI / 2, 0, 0);
mmMesh(new THREE.CylinderGeometry(DR, DR, 0.5, mmSeg(36)), grass, 0, DY + 0.55, DZ, H);
var DM = mmMesh(new THREE.SphereGeometry(DR, mmSeg(36), mmSeg(18), 0, Math.PI * 2, 0, Math.PI / 2), dome, 0, DY + 0.75, DZ, H);
DM.scale.y = 1.3;
mmGlow(H, 0xD8C0FF, DR * 2.6, 0.12, 0, DY + DR * 0.8, DZ);
for (var m = 0; m < (lite ? 4 : 11); m++) {
var ma = R() * Math.PI * 2, md = R() * 5.6;
mmEll(H, m % 2 ? grass2 : grass, 1.6 + R() * 1.4, 0.35 + R() * 0.35, 1.4 + R() * 1.2, Math.cos(ma) * md, DY + 0.8, DZ + Math.sin(ma) * md, 12);
}
mmEll(H, pond, 1.5, 0.06, 1.0, 1.6, DY + 0.86, DZ + 1.8, 16);
if (!lite)
for (var st2 = 0; st2 < 5; st2++) {
var sa = st2 / 5 * Math.PI * 2;
mmEll(H, rock, 0.25, 0.18, 0.22, 1.6 + Math.cos(sa) * 1.6, DY + 0.9, DZ + 1.8 + Math.sin(sa) * 1.1, 6);
}
var trees = lite ? 8 : 24;
for (var t = 0; t < trees; t++) {
var ta = R() * Math.PI * 2, td = 1.4 + R() * 6.2;
if (Math.hypot(Math.cos(ta) * td - 1.6, Math.sin(ta) * td - 1.8) < 2.0)
td = 4.6;
var tx = Math.cos(ta) * td, tz = DZ + Math.sin(ta) * td, th = 1.2 + R() * 2.2 * (1 - td / 7);
if (th < 1.1)
th = 1.1;
mmCyl(H, bark, 0.1, 0.16, th, tx, DY + 0.8 + th / 2, tz, 0, 0, 0, 6);
if (t % 3 === 0)
mmCone(H, leaf, 0.75 + R() * 0.4, th * 1.3, tx, DY + 0.8 + th + th * 0.45, tz, 0, 0, 0, 8);
else {
mmEll(H, t % 2 ? leaf : leaf2, 0.9 + R() * 0.5, 0.8 + R() * 0.4, 0.9 + R() * 0.5, tx, DY + 0.9 + th + 0.4, tz, 10);
if (!lite)
mmEll(H, leaf2, 0.6, 0.5, 0.6, tx + 0.4, DY + 1.3 + th + 0.4, tz - 0.3, 8);
}
}
if (!lite) {
var fc = [0xF0D060, 0xE878A8, 0xF4F0E8, 0xB89AF0];
for (var f = 0; f < 60; f++) {
var fa = R() * Math.PI * 2, fd = R() * 7.6;
mmEll(H, mmMat(fc[f % 4], { glow: 1 }), 0.09, 0.09, 0.09, Math.cos(fa) * fd, DY + 0.95, DZ + Math.sin(fa) * fd, 5);
}
}
mmGlow(H, 0xFFF0C8, 14, 0.16, 0, DY + 3.2, DZ);
var PV = mmG(H, -2.2, DY + 0.95, DZ - 1.6);
mmCyl(PV, pearl, 1.9, 2.1, 0.35, 0, 0, 0, 0, 0, 0, lite ? 10 : 20);
for (var pc = 0; pc < (lite ? 4 : 6); pc++) {
var pa = pc / (lite ? 4 : 6) * Math.PI * 2;
mmCyl(PV, pearl, 0.09, 0.11, 2.1, Math.cos(pa) * 1.6, 1.2, Math.sin(pa) * 1.6, 0, 0, 0, 6);
}
mmEll(PV, pearl, 1.9, 0.8, 1.9, 0, 2.3, 0, lite ? 10 : 18);
mmGlow(PV, 0xFFE0A8, 4, 0.3, 0, 1.2, 0);
var cry = mmMat(0xA8F0FF, { e: 0x4AA8D8, ei: 0.8 }), cry2 = mmMat(0xE8A8FF, { e: 0xA05AD8, ei: 0.8 });
for (var cs = 0; cs < (lite ? 3 : 7); cs++) {
var ca = R() * Math.PI * 2, cd = 3 + R() * 4.4, ch = 1.2 + R() * 1.6;
mmCone(H, cs % 2 ? cry2 : cry, 0.32, ch, Math.cos(ca) * cd, DY + 0.85 + ch / 2, DZ + Math.sin(ca) * cd, 0, 0, (R() - 0.5) * 0.3, 6);
}
[-1, 1].forEach(function (s) {
var W = [[5.2, 4.5], [14.5, 0.5], [24.6, -14], [25.6, -18.5], [19.5, -17.6], [5.0, -12.8]].map(function (p) { return [s * p[0], p[1]]; });
mmFlat(H, pearl2, W, 0.75, 0, -0.1, 0, -Math.PI / 2, 0, 0);
mmSeam(H, 0xB88AFF, [[s * 5.6, 0.35, -4.4], [s * 13, 0.35, -0.5], [s * 24.6, 0.35, 14]], 0.12);
if (!lite)
for (var r = 0; r < 3; r++)
mmSlab(H, dusk, 5.5 - r, 0.12, 0.5, s * (10 + r * 3.2), 0.42, 4 + r * 3.2, 0, s * -0.52, 0);
var P = mmG(H, s * 24.8, 0, 15.2);
mmCyl(P, pearl, 0.75, 1.0, 9, 0, 0, 0, Math.PI / 2, 0, 0, lite ? 10 : 18);
mmCone(P, pearl, 0.75, 2.6, 0, 0, -5.8, -Math.PI / 2, 0, 0, lite ? 10 : 18);
mmEll(P, mmMat(s < 0 ? 0xFF6A5A : 0x6AFF9A, { glow: 1 }), 0.32, 0.32, 0.32, 0, 0, -7.1, 8);
mmGlow(P, s < 0 ? 0xFF6A5A : 0x6AFF9A, 2.4, 0.35, 0, 0, -7.1);
var n = lite ? 8 : 16;
for (var i = 0; i < n; i++) {
var z = -15 + i * (27 / n), x = hw(z) * 1.7 - 0.12;
[0.55, -0.45].forEach(function (y, k) { if (k && i % 2)
return; var b = mmMesh(new THREE.BoxGeometry(0.16, 0.32, 0.75), win, s * x * Math.sqrt(1 - Math.pow(y / (hw(z) * 0.56), 2)), y, z, H); });
}
});
mmFlat(H, pearl2, [[7.5, 2.4], [16.5, 2.4], [20.2, 10.5], [17.8, 11.2], [12, 5.5]], 0.6, 0, 0, 0, 0, -Math.PI / 2, 0);
mmSeam(H, 0xB88AFF, [[0, 2.9, 8.2], [0, 7.2, 13.2], [0, 11, 18]], 0.07);
[-1, 1].forEach(function (s) { var K = mmFlat(H, pearl2, [[9, -1.8], [16.5, -1.8], [19, -6.4], [16.8, -6.8]], 0.5, s * 2.6, 0, 0, 0, -Math.PI / 2, 0); K.rotation.z = s * 0.35; });
var eng = function (x, y, z, r, L) {
var E = mmG(H, x, y, z);
mmCyl(E, pearl, r * 1.06, r, L, 0, 0, 0, Math.PI / 2, 0, 0, lite ? 14 : 28);
mmTorus(E, steel, r * 1.02, r * 0.16, 0, 0, -L / 2, 0, 0, 0);
mmCyl(E, dusk, r * 0.82, r * 0.82, 0.4, 0, 0, -L / 2 - 0.05, Math.PI / 2, 0, 0, lite ? 12 : 24);
mmTorus(E, vio, r * 1.07, r * 0.05, 0, 0, L * 0.18, 0, 0, 0);
mmCyl(E, steel, r * 0.92, r * 1.25, r * 1.1, 0, 0, L / 2 + r * 0.5, Math.PI / 2, 0, 0, lite ? 14 : 28);
mmCyl(E, fireC, r * 0.9, r * 0.9, 0.12, 0, 0, L / 2 + r * 1.0, Math.PI / 2, 0, 0, lite ? 12 : 24);
mmCone(E, fireI, r * 0.62, r * 3.4, 0, 0, L / 2 + r * 1.0 + r * 1.7, Math.PI / 2, 0, 0, lite ? 10 : 20);
mmCone(E, fireO, r * 0.98, r * 7.5, 0, 0, L / 2 + r * 1.0 + r * 3.75, Math.PI / 2, 0, 0, lite ? 10 : 24);
mmGlow(E, 0x8AA8FF, r * 4.5, 0.35, 0, 0, L / 2 + r * 1.3);
return E;
};
eng(-4.6, 0.6, 14.5, 2.7, 13);
eng(4.6, 0.6, 14.5, 2.7, 13);
var cowl = mmLathe(H, pearl, [[0, 0], [2.9, 0.4], [3.4, 4], [3.3, 9], [2.9, 12.4], [0, 12.6]], 0, 0.4, 8.2, lite ? 14 : 28);
cowl.rotation.x = Math.PI / 2;
cowl.scale.set(2.5, 1, 0.62);
mmSlab(H, steel, 5.6, 0.25, 6, 0, 3.0, 17.2, 0, 0, 0);
mmSlab(H, dusk, 5.6, 0.25, 6, 0, -2.2, 17.2, 0, 0, 0);
eng(-12.6, 0.1, 11.5, 1.8, 10);
eng(12.6, 0.1, 11.5, 1.8, 10);
var turret = function (x, y, z, flip) {
var T = mmG(H, x, y, z);
if (flip)
T.rotation.z = Math.PI;
mmEll(T, dusk, 1.5, 0.6, 1.5, 0, 0, 0, lite ? 10 : 16);
mmSlab(T, pearl, 2.2, 1.0, 2.6, 0, 0.75, 0.2, 0, 0, 0);
mmEll(T, pearl, 1.1, 0.55, 1.3, 0, 1.25, 0.2, lite ? 8 : 14);
[-0.5, 0.5].forEach(function (b) { mmCyl(T, steel, 0.17, 0.22, 4.2, b, 0.8, -2.6, Math.PI / 2, 0, 0, 8); mmTorus(T, vio, 0.2, 0.06, b, 0.8, -4.7, 0, 0, 0); });
return T;
};
turret(-6.4, 2.5, 8.2);
turret(6.4, 2.5, 8.2);
turret(-4.2, 2.4, -15.2);
turret(4.2, 2.4, -15.2);
turret(0, -3.4, 11, true);
[-1, 1].forEach(function (s) {
mmCyl(H, steel, 0.32, 0.45, 9, s * 12.2, -0.55, -3.2, Math.PI / 2, 0, 0, lite ? 8 : 12);
mmCyl(H, dusk, 0.62, 0.62, 2.2, s * 12.2, -0.55, 0.6, Math.PI / 2, 0, 0, lite ? 8 : 12);
mmTorus(H, vio, 0.38, 0.08, s * 12.2, -0.55, -7.7, 0, 0, 0);
});
var pods = [], podM = mmMat(0xC8BEDC, { shine: 100, tex: "pearl" });
var podGlass = mmMat(0xC8E0FF, { shine: 120, op: 0.35, spec: 0xFFFFFF }), podSkin = mmMat(0xC89878, { rough: 0.8, metal: 0 }), podHelm = mmMat(0xE8E4F0, { shine: 90 }), podSuit = mmMat(0x5A4A8A, { rough: 0.7, metal: 0.1 }), podVisor = mmMat(0xFFC870, { glow: 1 });
for (var pi = 0; pi < 8; pi++) {
var px = (pi % 2 ? 1 : -1) * 2.9, pz = -9 + (pi >> 1) * 4.6;
mmSlab(H, dusk, 0.5, 0.9, 2.4, px, -2.4, pz, 0, 0, 0);
var PD = mmG(H, px, -3.6, pz), PB = mmG(PD, 0, 0, 0);
mmCyl(PB, podM, 0.75, 0.75, 2.6, 0, 0, 0, Math.PI / 2, 0, 0, lite ? 8 : 14);
mmEll(PB, podM, 0.75, 0.75, 1.1, 0, 0, -1.3, lite ? 8 : 12);
mmCone(PB, dusk, 0.75, 0.8, 0, 0, 1.7, Math.PI / 2, 0, 0, lite ? 8 : 12);
mmTorus(PB, vio, 0.77, 0.06, 0, 0, -0.3, 0, 0, 0);
mmSlab(PB, dusk, 0.7, 0.12, 1.5, 0, 0.62, -0.5, 0, 0, 0);
mmEll(PB, podSkin, 0.17, 0.2, 0.17, 0, 0.8, -0.55, lite ? 6 : 10);
mmEll(PB, podHelm, 0.21, 0.17, 0.22, 0, 0.87, -0.55, lite ? 6 : 10);
if (!lite) {
mmEll(PB, podSuit, 0.3, 0.16, 0.2, 0, 0.62, -0.45, 8);
mmSlab(PB, podVisor, 0.24, 0.07, 0.02, 0, 0.8, -0.74, 0, 0, 0);
mmEll(PB, win, 0.08, 0.05, 0.04, 0.2, 0.7, -1.05, 6);
}
mmEll(PB, podGlass, 0.46, 0.45, 0.95, 0, 0.62, -0.6, lite ? 8 : 14);
if (!lite)
[0, 1, 2].forEach(function (f2) { var a = f2 / 3 * Math.PI * 2; mmSlab(PB, dusk, 0.06, 0.6, 0.9, Math.cos(a) * 0.9, Math.sin(a) * 0.9, 1.0, 0, 0, a); });
var PF = mmCone(PB, fireI, 0.45, 2.4, 0, 0, 3.3, Math.PI / 2, 0, 0, 8);
PF.visible = false;
pods.push({ G: PD, F: PF, x: px, z: pz, t: -1, d: pi * 0.18 });
}
var podT = 0, podLast = 0, podAuto = true;
var podTick = function (dt) {
if (podT <= 0)
return;
podT += dt;
pods.forEach(function (P) {
var t = podT - P.d;
if (t < 0)
return;
var s = P.x > 0 ? 1 : -1;
if (t < 0.9) {
var e = t / 0.9;
P.G.position.set(P.x + s * e * 1.5, -3.6 - e * e * 9, P.z);
P.F.visible = false;
}
else if (t < 5.5) {
var f = t - 0.9;
P.G.position.set(P.x + s * (1.5 + f * f * 1.2), -12.6 + f * 1.2, P.z - f * f * 7);
P.F.visible = true;
}
else if (t < 6.2) {
P.G.visible = false;
P.F.visible = false;
}
else {
P.G.visible = true;
P.G.position.set(P.x, -3.6, P.z);
}
});
if (podT > 6.2 + 1.5) {
podT = 0;
pods.forEach(function (P) { P.G.visible = true; P.G.position.set(P.x, -3.6, P.z); P.F.visible = false; });
}
};
pods[0].G.children[0].children[0].onBeforeRender = function () { if (!podAuto)
return; var n = performance.now(), dt = podLast ? Math.min(0.1, (n - podLast) / 1000) : 0; podLast = n; podTick(dt); };
mmEll(H, mmMat(0xC8A8FF, { glow: 1 }), 0.7, 0.45, 0.4, 0, 0.3, -20.8, 12);
mmGlow(H, 0xC8A8FF, 3, 0.4, 0, 0.3, -21);
[-1, 1].forEach(function (s) { mmCyl(H, steel, 0.28, 0.4, 4, s * 2.6, -0.6, -19.6, Math.PI / 2, 0, 0, 10); mmTorus(H, dusk, 0.42, 0.08, s * 2.6, -0.6, -21.4, 0, 0, 0); });
return { g: g, h: 13, seat: [0, -12.2], muzzles: [[-2.6, 3.6, -21.6], [2.6, 3.6, -21.6], [-4.7, 7.4, -19.9], [3.7, 7.4, -19.9]],
drop: function () { if (podT <= 0)
podT = 0.0001; }, podTick: function (dt) { podAuto = false; podTick(dt); }, pods: pods,
anim: function (dt, mv, st) {
st.t = (st.t || 0) + dt;
H.position.y = 4.2 + (st.alt > 0.6 ? Math.sin(st.t * 0.9) * 0.2 : 0.06 * Math.sin(st.t * 0.6));
H.rotation.z = st.alt > 0.6 ? THREE.MathUtils.lerp(H.rotation.z, -(st.turn || 0) * 0.2, Math.min(1, dt * 2)) : 0;
} };
},
function () {
var lite = mmLite(), g = new THREE.Group(), olive = mmMat(0x4E5A3E, { shine: 20, tex: "worn", rep: 2, metal: 0.35, rough: 0.7 }), olive2 = mmMat(0x5E6A48, { shine: 20, tex: "plate", metal: 0.35, rough: 0.65 }), dark = mmMat(0x2A2C28, { shine: 20, metal: 0.5, rough: 0.6 }), steel = mmMat(0x7A7C76, { shine: 60, tex: "plate", metal: 0.85, rough: 0.38 }), bright = mmMat(0xC8CCD0, { shine: 90, metal: 0.95, rough: 0.18 }), rubber = mmMat(0x1E1E1C, { metal: 0, rough: 0.95 }), tread = mmMat(0x6A6A66, { shine: 30, tex: "tread", rep: 1, metal: 0.7, rough: 0.55 }), grille = mmMat(0x5A5A56, { tex: "grille", metal: 0.6, rough: 0.6 }), tan = mmMat(0x8A7A5A, { shine: 10, metal: 0, rough: 0.9 }), lens = mmMat(0x6AC8E8, { e: 0x2A6A8A, ei: 0.6 }), amber = 0xE8A040;
var H = mmG(g, 0, 0, 0);
mmFlat(H, olive, [[-5.0, 1.0], [-3.4, 2.3], [3.8, 2.3], [4.8, 1.6], [4.6, 0.7], [-4.4, 0.6]], 3.4, 0, 0, 0, 0, -Math.PI / 2, 0);
mmSlab(H, olive2, 5.6, 0.22, 8.6, 0, 2.38, 0.1);
mmFlat(H, olive2, [[-5.05, 1.02], [-3.45, 2.32], [-3.0, 2.32], [-4.5, 1.0]], 3.6, 0, 0.04, 0, 0, -Math.PI / 2, 0);
var dh = mmG(H, 0.9, 2.5, -3.0);
mmCyl(dh, olive, 0.5, 0.55, 0.18, 0, 0, 0, 0, 0, 0, 16);
if (!lite)
for (var pz = 0; pz < 3; pz++)
mmSlab(dh, dark, 0.22, 0.14, 0.12, -0.34 + pz * 0.34, 0.12, -0.55);
mmVents(H, dark, grille, 3.2, 1.6, lite ? 4 : 7, 0, 2.52, 3.0, -Math.PI / 2, 0, 0);
if (!lite) {
mmSlab(H, dark, 1.2, 0.12, 1.0, -1.6, 2.52, 1.4);
mmSlab(H, dark, 1.2, 0.12, 1.0, 1.6, 2.52, 1.4);
}
var wheels = [], RW = 0.66, zs = [-3.3, -2.2, -1.1, 0, 1.1, 2.2, 3.3];
[-1, 1].forEach(function (s) {
var X = s * 2.45, T = mmG(H, X, 0, 0);
var o = new THREE.Shape(), hole = new THREE.Path(), r1 = 0.78, r0 = 0.5;
o.moveTo(-4.0, 0.0);
o.lineTo(3.9, 0.0);
o.absarc(3.9, 0.8, 0.8, -Math.PI / 2, Math.PI / 2, false);
o.lineTo(-4.3, 1.75);
o.absarc(-4.3, 1.0, 0.75, Math.PI / 2, Math.PI * 1.25, false);
o.lineTo(-4.0, 0.0);
hole.moveTo(-3.9, 0.18);
hole.lineTo(3.9, 0.18);
hole.absarc(3.9, 0.8, 0.62, -Math.PI / 2, Math.PI / 2, false);
hole.lineTo(-4.3, 1.58);
hole.absarc(-4.3, 1.0, 0.58, Math.PI / 2, Math.PI * 1.25, false);
hole.lineTo(-3.9, 0.18);
o.holes.push(hole);
var bg = new THREE.ExtrudeGeometry(o, { depth: 0.95, bevelEnabled: false, curveSegments: lite ? 6 : 12 });
bg.translate(0, 0, -0.475);
mmUv(bg, 0.5);
var belt = mmMesh(bg, tread, 0, 0, 0, T);
belt.rotation.y = Math.PI / 2;
belt.scale.x = -1;
zs.forEach(function (z) {
var W = mmG(T, 0, RW, z);
wheels.push(W);
mmCyl(W, rubber, RW, RW, 0.8, 0, 0, 0, 0, 0, Math.PI / 2, lite ? 12 : 20);
mmCyl(W, steel, RW * 0.78, RW * 0.78, 0.84, 0, 0, 0, 0, 0, Math.PI / 2, lite ? 10 : 18);
mmCyl(W, dark, RW * 0.3, RW * 0.3, 0.9, 0, 0, 0, 0, 0, Math.PI / 2, 10);
if (!lite)
for (var k = 0; k < 6; k++) {
var an = k / 6 * Math.PI * 2;
mmCyl(W, bright, 0.05, 0.05, 0.92, 0, Math.cos(an) * RW * 0.5, Math.sin(an) * RW * 0.5, 0, 0, Math.PI / 2, 6);
}
});
var SP = mmG(T, 0, 0.8, 3.9);
wheels.push(SP);
mmCyl(SP, steel, 0.6, 0.6, 0.86, 0, 0, 0, 0, 0, Math.PI / 2, 16);
mmCyl(SP, dark, 0.25, 0.25, 0.9, 0, 0, 0, 0, 0, Math.PI / 2, 10);
for (var t = 0; t < (lite ? 6 : 12); t++) {
var at = t / (lite ? 6 : 12) * Math.PI * 2;
mmSlab(SP, steel, 0.86, 0.16, 0.16, 0, Math.cos(at) * 0.64, Math.sin(at) * 0.64, at, 0, 0);
}
var ID = mmG(T, 0, 1.0, -4.3);
wheels.push(ID);
mmCyl(ID, steel, 0.55, 0.55, 0.8, 0, 0, 0, 0, 0, Math.PI / 2, 16);
mmCyl(ID, dark, 0.22, 0.22, 0.86, 0, 0, 0, 0, 0, Math.PI / 2, 10);
if (!lite)
[-1.8, 0, 1.8].forEach(function (z) { mmCyl(T, steel, 0.2, 0.2, 0.4, 0, 1.55, z, 0, 0, Math.PI / 2, 10); });
for (var p = 0; p < 5; p++) {
var z0 = -3.6 + p * 1.72;
mmSlab(T, p % 2 ? olive : olive2, 0.14, 1.0, 1.66, s * 0.56, 1.55, z0, 0, 0, s * 0.05);
}
mmSlab(T, olive2, 0.14, 0.9, 1.2, s * 0.56, 1.62, -4.85, -0.5, 0, s * 0.05);
mmSlab(T, dark, 0.2, 0.1, 8.8, s * 0.58, 2.08, -0.4);
if (!lite) {
mmSlab(H, tan, 0.9, 0.5, 1.6, s * 2.3, 2.62, -1.2);
mmTube(H, dark, [[s * 2.95, 2.3, -3.8], [s * 3.0, 2.35, -1], [s * 3.0, 2.35, 2], [s * 2.95, 2.3, 3.6]], 0.06, 0, 0, 0, 24);
}
});
[-1, 1].forEach(function (s) {
mmLamp(H, dark, 0xFFE8B0, 0.16, s * 1.9, 2.05, -4.25, -0.3, 0);
if (!lite)
mmTorus(H, dark, 0.26, 0.03, s * 1.9, 2.08, -4.42, 0.2, 0, 0);
mmLamp(H, dark, 0xC83A2A, 0.1, s * 2.1, 1.95, 4.4, 0, Math.PI);
});
var T = mmG(H, 0, 2.5, 0.6);
var top = [[0, 3.5], [1.0, 3.6], [2.45, 2.2], [2.7, -0.4], [2.5, -2.6], [1.8, -3.6], [-1.8, -3.6], [-2.5, -2.6], [-2.7, -0.4], [-2.45, 2.2], [-1.0, 3.6]];
var ts = new THREE.Shape();
ts.moveTo(top[0][0], top[0][1]);
for (var i = 1; i < top.length; i++)
ts.lineTo(top[i][0], top[i][1]);
var tg = mmUv(new THREE.ExtrudeGeometry(ts, { depth: 1.05, bevelEnabled: !lite, bevelThickness: 0.3, bevelSize: 0.3, bevelSegments: 3 }), 0.22);
var tm = mmMesh(tg, olive, 0, 0.12, 0, T);
tm.rotation.x = -Math.PI / 2;
tm.scale.set(0.95, 0.95, 1);
mmCyl(T, dark, 2.35, 2.45, 0.22, 0, 0.05, 0, 0, 0, 0, lite ? 18 : 32);
if (!lite)
mmTorus(T, mmMat(amber, { glow: 1, op: 0.75 }), 2.47, 0.035, 0, 0.04, 0, Math.PI / 2, 0, 0);
if (!lite) {
for (var bx = 0; bx < 6; bx++)
mmRod(T, dark, [-2.0 + bx * 0.8, 0.3, 3.55], [-2.0 + bx * 0.8, 1.3, 4.3], 0.035, 0.035, 6);
mmRod(T, dark, [-2.0, 1.3, 4.3], [2.0, 1.3, 4.3], 0.04, 0.04, 6);
mmSlab(T, tan, 3.6, 0.7, 0.6, 0, 0.75, 4.0);
}
mmSlab(T, olive2, 2.2, 1.1, 0.9, 0, 0.82, -3.6);
[-0.55, 0.55].forEach(function (x) {
mmCyl(T, steel, 0.24, 0.3, 6.4, x, 0.9, -5.4, Math.PI / 2, 0, 0, lite ? 10 : 16);
mmCyl(T, dark, 0.36, 0.36, 1.0, x, 0.9, -5.6, Math.PI / 2, 0, 0, lite ? 10 : 16);
mmCyl(T, dark, 0.36, 0.36, 0.32, x, 0.9, -8.2, Math.PI / 2, 0, 0, 12);
mmCyl(T, dark, 0.36, 0.36, 0.32, x, 0.9, -8.7, Math.PI / 2, 0, 0, 12);
mmCyl(T, steel, 0.2, 0.2, 0.3, x, 0.9, -8.45, Math.PI / 2, 0, 0, 10);
mmSlab(T, olive, 0.9, 0.9, 1.2, x, 0.9, -2.9);
});
var cup = mmG(T, -1.1, 1.6, 0.8);
mmCyl(cup, olive, 0.62, 0.72, 0.6, 0, 0.3, 0, 0, 0, 0, 16);
mmEll(cup, lens, 0.5, 0.15, 0.5, 0, 0.62, 0, 12);
if (!lite)
for (var pp = 0; pp < 6; pp++) {
var aa = pp / 6 * Math.PI * 2;
mmSlab(cup, dark, 0.2, 0.16, 0.12, Math.sin(aa) * 0.66, 0.42, Math.cos(aa) * 0.66, 0, aa, 0);
}
var sb = mmG(T, 1.2, 1.62, -1.6);
mmSlab(sb, olive2, 0.9, 0.7, 0.9, 0, 0.35, 0);
mmLamp(sb, dark, 0x6AC8E8, 0.17, 0, 0.38, -0.5, 0, 0);
if (!lite) {
var rw = mmG(T, 1.0, 1.7, 1.2);
mmCyl(rw, dark, 0.3, 0.34, 0.3, 0, 0.15, 0, 0, 0, 0, 12);
mmCyl(rw, steel, 0.05, 0.05, 1.4, 0.1, 0.42, -0.7, Math.PI / 2, 0, 0, 8);
mmSlab(rw, olive, 0.36, 0.3, 0.5, 0.1, 0.42, 0.05);
}
[-1, 1].forEach(function (s) { for (var d = 0; d < 4; d++)
mmCyl(T, dark, 0.12, 0.12, 0.5, s * (2.0 + d * 0.1), 0.9 + d * 0.22, -1.9, -0.6, 0, s * 0.2, 8); });
if (!lite) {
mmRod(T, dark, [1.6, 1.4, 2.6], [1.7, 4.0, 2.8], 0.03, 0.012, 5);
mmRod(T, dark, [-1.6, 1.4, 2.8], [-1.8, 3.4, 3.0], 0.03, 0.012, 5);
}
return { g: g, h: 4.6, seat: [0, -2.2], muzzles: [[-0.55, 3.4, -8.9], [0.55, 3.4, -8.9]], turret: T, steer: 1,
anim: function (dt, mv, st) { wheels.forEach(function (w) { w.rotation.x -= mv * 1.6; }); } };
},
function () {
var K = { g: new THREE.Group(), parts: [] };
K.part = function (x, y, z, rx, ry, rz, limb, extra) {
var m = mmG(K.g, x, y, z, rx || 0, ry || 0, rz || 0);
var P = { m: m, home: { p: [x, y, z], r: [rx || 0, ry || 0, rz || 0], s: extra ? 0.001 : 1 }, limb: limb, extra: !!extra };
if (extra)
m.scale.setScalar(0.001);
K.parts.push(P);
return m;
};
K.limbSwing = function (m, amt) { m.userData.swing = amt; };
return K;
},
function (K, st, dt, mv) {
st.ph = (st.ph || 0) + mv * 0.9;
st.t = (st.t || 0) + dt;
var moving = Math.min(1, mv * 25);
K.parts.forEach(function (P) {
var m = P.m, u = m.userData, h = P.home.r;
if (u.swing) {
m.rotation.x = h[0] + Math.sin(st.ph + (u.phase || 0)) * u.swing * moving;
}
if (u.wing) {
var fl = st.alt > 0.6;
m.rotation.z = h[2] + (fl ? (u.wing * (0.95 + Math.sin(st.t * 1.6) * 0.35)) : 0);
}
});
},
function (P, mat, r, t, a0, a1, len, x, y, z, rx, ry, rz) {
var s = new THREE.Shape();
if (a1 - a0 >= MM_PI * 2 - 0.01) {
s.absarc(0, 0, r + t, 0, MM_PI * 2, false);
var h = new THREE.Path();
h.absarc(0, 0, r, 0, MM_PI * 2, true);
s.holes.push(h);
}
else {
s.absarc(0, 0, r + t, a0, a1, false);
s.absarc(0, 0, r, a1, a0, true);
}
var b = Math.min(t * 0.4, 0.06), g = new THREE.ExtrudeGeometry(s, { depth: Math.max(0.01, len - b * 2), bevelEnabled: !mmLite(), bevelThickness: b, bevelSize: b, bevelSegments: 1, curveSegments: mmLite() ? 8 : 16 });
g.translate(0, 0, -(len - b * 2) / 2);
mmUv(g, 0.3);
var m = mmMesh(g, mat, x, y, z, P);
m.rotation.set(rx || 0, ry || 0, rz || 0);
return m;
},
function (P, mat, len, w, x, y, z, dir, spin) {
var q = [[0, 0], [w * 0.32, len * 0.1], [w * 0.5, len * 0.42], [w * 0.42, len * 0.78], [w * 0.14, len], [-w * 0.06, len * 0.98], [-w * 0.34, len * 0.84], [-w * 0.48, len * 0.48], [-w * 0.3, len * 0.12]];
var s = new THREE.Shape();
s.moveTo(q[0][0], q[0][1]);
for (var i = 1; i < q.length; i++)
s.lineTo(q[i][0], q[i][1]);
var G = mmG(P, x, y, z), m = mmMesh(new THREE.ShapeGeometry(s), mat, 0, 0, 0, G);
m.rotation.y = spin || 0;
G.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dir[0], dir[1], dir[2]).normalize());
return G;
},
function (P, mat, len, w, curl, x, y, z, dir) {
var n = mmLite() ? 3 : 5, Lp = [], Rp = [];
for (var i = 0; i < n; i++) {
var t = i / n, cx = curl * t * t * len, hw = w * (1 - t * 0.6) / 2 * (i === 0 ? 0.8 : 1);
Lp.push([cx - hw, t * len]);
Rp.push([cx + hw, t * len]);
}
var s = new THREE.Shape();
s.moveTo(Lp[0][0], Lp[0][1]);
for (i = 1; i < n; i++)
s.lineTo(Lp[i][0], Lp[i][1]);
s.lineTo(curl * len, len);
for (i = n - 1; i >= 0; i--)
s.lineTo(Rp[i][0], Rp[i][1]);
var G = mmG(P, x, y, z), g1 = new THREE.ShapeGeometry(s);
mmMesh(g1, mat, 0, 0, 0, G);
if (!mmLite())
mmMesh(g1.clone(), mat, 0, 0, 0, G).rotation.y = MM_H;
G.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dir[0], dir[1], dir[2]).normalize());
return G;
},
function (P, mats, pts, len, w, rings, per) {
var c = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); })), up = new THREE.Vector3(0, 1, 0);
rings = mmN(rings);
per = mmN(per);
for (var i = 0; i < rings; i++) {
var t = 0.08 + i / (rings - 1 || 1) * 0.9, p = c.getPoint(t), tg = c.getTangent(t), a = new THREE.Vector3().crossVectors(tg, up).normalize(), b = new THREE.Vector3().crossVectors(a, tg).normalize();
for (var j = 0; j < per; j++) {
var an = j / per * MM_PI * 2 + i * 0.7, rd = a.clone().multiplyScalar(Math.cos(an)).add(b.clone().multiplyScalar(Math.sin(an))), d = tg.clone().add(rd.multiplyScalar(0.75));
mmLock(P, mats[(i >= rings - 2) ? mats.length - 1 : j % Math.max(1, mats.length - 1)], len * (0.75 + 0.4 * Math.sin(t * MM_PI)), w, (j % 2 ? 0.2 : -0.2), p.x, p.y, p.z, [d.x, d.y, d.z]);
}
}
},
function (F, steel, col, trim, glow, side) {
mmFlat(F, steel, [[-2.5, -0.55], [2.2, -0.55], [2.35, 0.15], [1.4, 0.62], [-0.4, 0.78], [-1.9, 0.35]], 3.0, 0, 0, 0, 0, -MM_H, 0);
for (var i = 0; i < 3; i++)
mmArc(F, i % 2 ? trim : col, 0.78 + i * 0.06, 0.12, 0.04 * MM_PI, 0.96 * MM_PI, 0.62, 0, 0.02 + i * 0.1, -2.1 + i * 0.56).scale.x = 2.0;
mmCyl(F, col, 1.25, 1.5, 0.95, 0, 1.1, 0.45, 0, 0, 0, 18);
mmTorus(F, trim, 1.32, 0.1, 0, 1.58, 0.45, MM_H, 0, 0);
mmTorus(F, trim, 1.5, 0.08, 0, 0.66, 0.45, MM_H, 0, 0);
mmSlab(F, steel, 1.7, 0.9, 1.0, 0, 0.05, 2.05);
mmSeam(F, glow, [[side * 1.72, 0.1, -1.7], [side * 1.75, 0.22, 0.3], [side * 1.55, 0.28, 1.9]], 0.05);
},
function (K, o) {
[[1, o.fz, 0], [-1, o.fz, 0], [1, o.hz, 1], [-1, o.hz, 1]].forEach(function (q) {
var s = q[0], hind = q[2], fr = hind ? o.limbH : o.limbF, len = o.len, f = o.fat, bz = hind ? 0.28 : 0;
var L = K.part(s * o.sx, o.py, q[1], 0, 0, 0, fr(s));
mmEll(L, o.mat, f * 1.2, len * 0.22, f * (hind ? 1.6 : 1.3), 0, len * 0.02, bz * 0.6, 14);
mmCaps(L, o.mat, f * 0.8, f * 0.6, len * 0.3, 0, -len * 0.38, bz, hind ? 0.26 : -0.06, 0, 0, 12);
var jz = hind ? bz + 0.3 : 0.02, lz = hind ? bz + 0.16 : 0.04;
mmEll(L, o.mat, f * 0.55, f * 0.62, f * 0.6, 0, -len * 0.56, jz, 10);
mmCaps(L, o.mat, f * 0.5, f * 0.4, len * 0.28, 0, -len * 0.75, lz, hind ? -0.22 : 0.03, 0, 0, 10);
if (o.hoof) {
mmLathe(L, o.dark, [[0, -len], [f * 0.66, -len], [f * 0.62, -len * 0.95], [f * 0.48, -len * 0.9], [0, -len * 0.9]], 0, 0, 0, 14);
if (o.fur)
for (var k = 0; k < mmN(7); k++) {
var an = k / mmN(7) * MM_PI * 2;
mmLock(L, o.fur, len * 0.11, 0.42, 0.15, Math.sin(an) * f * 0.42, -len * 0.85, Math.cos(an) * f * 0.42, [Math.sin(an) * 0.35, -1, Math.cos(an) * 0.35]);
}
}
else {
mmEll(L, o.mat, f * 0.64, f * 0.36, f * 0.95, 0, -len * 0.96, -f * 0.22, 12);
for (var c = -1; c <= 1; c++) {
mmEll(L, o.mat, f * 0.24, f * 0.21, f * 0.32, c * f * 0.4, -len * 0.975, -f * 0.98, 8);
mmCone(L, o.claw || o.dark, 0.08, 0.42, c * f * 0.4, -len * 0.985, -f * 1.32, -MM_H, 0, 0, 6);
}
if (o.fur)
mmLock(L, o.fur, len * 0.16, 0.4, 0.15, 0, -len * 0.5, jz + f * 0.4, [0, -0.6, 1]);
}
if (o.armour) {
mmArc(L, o.armour, f * 0.5, 0.08, 0.1 * MM_PI, 0.9 * MM_PI, len * 0.24, 0, -len * 0.74, lz, -MM_H, 0, 0);
mmEll(L, o.armour, f * 0.4, f * 0.42, f * 0.28, 0, -len * 0.56, jz - f * 0.52, 10);
mmArc(L, o.armour, f * 0.84, 0.1, 0.08 * MM_PI, 0.92 * MM_PI, len * 0.18, 0, -len * 0.32, bz, -MM_H, 0, 0);
}
L.userData.swing = 0.42;
L.userData.phase = (s > 0) !== !!hind ? 0 : MM_PI;
});
},
function (k, grp, c) {
var K = mmBeastKit(), fur = mmMat(c.col, { tex: "fur", rep: 4, metal: 0.8, rough: 0.34 }), pale = mmMat(c.trim, { tex: "fur", rep: 4, metal: 0.8, rough: 0.34 }), lockB = mmMat(new THREE.Color(c.col).multiplyScalar(0.85).getHex(), { metal: 0.8, rough: 0.34, ds: 1 }), lockW = mmMat(c.trim, { metal: 0.8, rough: 0.34, ds: 1 }), steel = mmMat(0xC4D0DC, { tex: "plate", metal: 0.9, rough: 0.26 }), enamel = mmMat(0x1E3A78, { tex: "plate", metal: 0.7, rough: 0.35 }), dark = mmMat(0x1A1E26, { metal: 0.3, rough: 0.6 }), eyeM = mmMat(c.eye, { glow: 1 }), fang = mmMat(0xF4F8FA, { shine: 90, metal: 0.2, rough: 0.3 });
var side = grp === "legR" ? 1 : -1;
var B = K.part(0, 6.2, 0.4, 0, 0, 0, { grp: grp, p: [0, -4.6, 0], r: [MM_H, 0, 0], s: 0.9 });
var PR = [[0, -4.7], [1.0, -4.5], [1.55, -3.6], [1.7, -1.8], [1.8, 0.2], [2.1, 2.0], [2.15, 3.3], [1.8, 4.3], [1.05, 4.85], [0, 5.0]];
mmTorso(B, fur, PR, 0, 0, 0, 0.95, 1.02);
mmTorso(B, pale, [[0, -3.0], [1.2, -2.6], [1.45, 0], [1.75, 2.4], [1.55, 4.0], [0, 4.6]], 0, -0.4, 0, 0.85, 0.95);
for (var i = 0; i < 4; i++) {
var f = 3.1 - i * 1.45, r = mmRadAt(PR, f);
mmArc(B, i % 2 ? enamel : steel, r * 0.98, 0.14, 0.2 * MM_PI, 0.8 * MM_PI, 1.25, 0, 0, -f).scale.set(0.95, 1.02, 1);
}
mmSeam(B, c.eye, [[0, 2.4, -3.3], [0, 2.25, -1.4], [0, 2.0, 0.4], [0, 1.85, 1.6]], 0.045);
mmRuff(B, [lockW, lockB], 0, -0.1, -3.95, 1.85, 2.0, -0.2 * MM_PI, 1.2 * MM_PI, 14, 1.7, 0.55, 0.75, 0.1);
for (var t = 0; t < mmN(5); t++)
mmLock(B, lockW, 1.2, 0.45, (t % 2 ? 0.2 : -0.2), (t - 2) * 0.35, -1.75, -3.5, [0, -1, 0.35]);
var Hd = K.part(0, 7.4, -5.2, 0, 0, 0, { grp: grp, p: [0, -9.4, -1.9], r: [0.15, 0, 0], s: 0.75 });
mmEll(Hd, fur, 1.25, 1.12, 1.35, 0, 0.2, 0, 18);
mmTorso(Hd, fur, [[0, 0], [0.8, 0.1], [0.74, 0.9], [0.58, 1.8], [0.42, 2.4], [0, 2.55]], 0, -0.25, -0.7, 0.95, 0.8);
mmTorso(Hd, pale, [[0, 0], [0.58, 0.1], [0.48, 1.2], [0.32, 2.0], [0, 2.1]], 0, -0.8, -0.8, 0.9, 0.55);
mmEll(Hd, dark, 0.3, 0.22, 0.24, 0, -0.08, -3.22, 10);
[-1, 1].forEach(function (s) {
mmCone(Hd, fang, 0.1, 0.5, s * 0.3, -0.82, -2.6, MM_PI, 0, 0, 6);
mmCone(Hd, fang, 0.07, 0.3, s * 0.42, -0.8, -1.9, MM_PI, 0, 0, 5);
mmEll(Hd, eyeM, 0.21, 0.1, 0.13, s * 0.62, 0.42, -1.08, 8);
mmFlat(Hd, fur, [[-0.42, 0], [0.42, 0], [0.05, 1.5]], 0.16, s * 0.72, 1.2, 0.3, -0.25, 0, s * -0.3);
mmFlat(Hd, dark, [[-0.24, 0.1], [0.24, 0.1], [0.03, 1.05]], 0.06, s * 0.72, 1.22, 0.2, -0.25, 0, s * -0.3);
mmLock(Hd, lockW, 1.1, 0.45, 0.2 * s, s * 1.1, -0.25, -0.3, [s * 0.9, -0.2, 0.6]);
});
mmArc(Hd, steel, 1.17, 0.1, 0.16 * MM_PI, 0.84 * MM_PI, 1.5, 0, 0.25, 0.05);
mmArc(Hd, steel, 0.6, 0.08, 0.24 * MM_PI, 0.76 * MM_PI, 1.7, 0, -0.22, -1.75);
mmFlat(Hd, enamel, [[-0.9, 0], [0.9, 0], [0.6, 0.35], [-0.6, 0.5]], 0.12, 0, 1.38, 0, 0, -MM_H, 0);
mmSeam(Hd, c.eye, [[-0.95, 0.72, -0.66], [0, 0.98, -0.76], [0.95, 0.72, -0.66]], 0.035);
mmRuff(Hd, [lockB, lockW], 0, 0.15, 0.85, 1.15, 1.05, 0.02 * MM_PI, 0.98 * MM_PI, 10, 1.6, 0.5, 1.0, 0.1);
mmGlow(Hd, c.eye, 1.6, 0.25, 0, 0.45, -1.3);
mmQuadLegs(K, { mat: fur, dark: dark, claw: fang, armour: steel, fur: lockB, sx: 1.35, fz: -3.3, hz: 3.4, py: 5.6, len: 5.6, fat: 0.72, hoof: false,
limbF: function (s) { return { grp: grp, p: [s * 0.75, -9.4, -0.5], r: [0, 0, 0], s: 1.05 }; },
limbH: function (s) { return { grp: grp, p: [s * 0.85, -9.7, 0.85], r: [0.08, 0, 0], s: 1.0 }; } });
var T = K.part(0, 6.8, 4.9, 0, 0, 0, { grp: grp, p: [0, -14.6, 1.8], r: [-1.2, 0, 0], s: 0.6 });
var tp = [[0, 0, 0], [0, 0.6, 1.4], [0, 0.4, 2.8], [0, -0.4, 3.8]];
mmTube(T, fur, tp, 0.4, 0, 0, 0, 14);
mmBushy(T, [lockB, lockW], tp, 1.3, 0.55, 7, 5);
mmArc(T, steel, 0.45, 0.08, 0, MM_PI * 2, 0.5, 0, 0.25, 0.6, -0.4, 0, 0);
var F = K.part(0, 6.2, 0.4, 0, 0, 0, { grp: grp, p: [0, -14.9, -0.6], r: [0, 0, 0], s: 1 }, true);
mmSabaton(F, steel, enamel, steel, c.eye, side);
mmBakeParts(K);
return { g: K.g, K: K, h: 9, seat: [0, -5.2], muzzles: [[0, 7.0, -8.6]], anim: function (dt, mv, s2) { mmBeastAnim(K, s2, dt, mv); } };
},
function () {
var grp = "legL", K = mmBeastKit(), fur = mmMat(0x7A3AB8, { tex: "fur", rep: 4, metal: 0.8, rough: 0.34 }), gold = mmMat(0xE8C060, { tex: "plate", metal: 0.95, rough: 0.22 }), goldS = mmMat(0xE8C060, { shine: 100, metal: 0.85, rough: 0.3 }), dark = mmMat(0x2A1E38, { metal: 0.3, rough: 0.55 }), eyeM = mmMat(0xC8A0FF, { glow: 1 }), stripe = mmMat(0x3A2A6A, { tex: "plate", metal: 0.5, rough: 0.4 }), mane = mmMat(0x4A2272, { metal: 0.8, rough: 0.34, ds: 1 }), mane2 = mmMat(0x9A5AD8, { metal: 0.8, rough: 0.34, ds: 1 }), fGold = mmMat(0xE8C060, { tex: "feather", rep: 1, metal: 0.8, rough: 0.34, ds: 1 }), fVio = mmMat(0x9A5AD8, { tex: "feather", rep: 1, metal: 0.8, rough: 0.34, ds: 1 }), fDeep = mmMat(0x5A2A9A, { tex: "feather", rep: 1, metal: 0.8, rough: 0.34, ds: 1 });
var B = K.part(0, 5.8, 0.6, 0, 0, 0, { grp: grp, p: [0, -4.6, 0], r: [MM_H, 0, 0], s: 0.9 });
var PR = [[0, -4.7], [1.1, -4.5], [1.8, -3.3], [1.95, -1.0], [2.05, 1.2], [2.3, 2.8], [2.2, 4.0], [1.4, 4.7], [0, 4.9]];
mmTorso(B, fur, PR, 0, 0, 0, 1, 1);
for (var i = 0; i < 4; i++) {
var f = 2.9 - i * 1.4, r = mmRadAt(PR, f);
mmArc(B, i % 2 ? stripe : gold, r * 0.98, 0.14, 0.18 * MM_PI, 0.82 * MM_PI, 1.2, 0, 0, -f);
}
mmSeam(B, 0xC8A0FF, [[0, 2.5, -3.2], [0, 2.35, -1.4], [0, 2.15, 0.2], [0, 2.0, 1.4]], 0.045);
mmEll(B, gold, 1.85, 1.65, 0.62, 0, -0.35, -4.15, 16);
mmTorus(B, goldS, 1.75, 0.09, 0, -0.35, -4.45, 0, 0, 0);
for (var b = 0; b < 2; b++)
mmTorus(B, stripe, 2.0 - b * 0.08, 0.11, 0, -0.1, 0.6 + b * 1.3, 0, 0, 0);
var Hd = K.part(0, 8.6, -4.6, 0, 0, 0, { grp: grp, p: [0, -9.4, -1.9], r: [0.1, 0, 0], s: 0.8 });
mmLathe(Hd, stripe, [[0, 2.0], [0.9, 1.9], [1.4, 1.0], [2.0, -0.6], [2.1, -1.6], [1.0, -1.6]], 0, 0, 0.3, 20);
mmEll(Hd, gold, 0.95, 1.2, 0.95, 0, 0.2, -0.4, 18);
mmEll(Hd, gold, 0.3, 0.48, 0.32, 0, -0.05, -1.25, 10);
mmCaps(Hd, gold, 0.16, 0.1, 0.9, 0, -1.35, -0.95, 0.25, 0, 0, 8);
mmEll(Hd, dark, 0.32, 0.07, 0.1, 0, -0.62, -1.25, 8);
[-1, 1].forEach(function (s) {
mmEll(Hd, eyeM, 0.2, 0.08, 0.06, s * 0.36, 0.45, -1.28, 8);
mmCaps(Hd, gold, 0.08, 0.08, 0.5, s * 0.36, 0.62, -1.25, 0, 0, MM_H, 6);
mmSlab(Hd, stripe, 0.6, 2.4, 0.26, s * 1.35, -1.4, -0.5, 0.1, 0, s * 0.05);
for (var l = 0; l < 4; l++)
mmSlab(Hd, goldS, 0.62, 0.08, 0.28, s * 1.35, -0.5 - l * 0.55, -0.52, 0.1, 0, s * 0.05);
});
mmTorus(Hd, goldS, 1.0, 0.12, 0, 1.4, 0.1, MM_H, 0, 0);
mmEll(Hd, mmMat(0xC8A0FF, { e: 0x8A5AD8, ei: 0.9 }), 0.22, 0.3, 0.12, 0, 1.5, -0.9, 10);
mmRuff(Hd, [mane, mane2], 0, -0.3, 1.4, 2.0, 1.7, -0.15 * MM_PI, 1.15 * MM_PI, 16, 2.0, 0.6, 1.1, 0.25);
mmGlow(Hd, 0xC8A0FF, 1.4, 0.22, 0, 0.45, -1.4);
[-1, 1].forEach(function (s) {
var W = K.part(s * 1.6, 7.8, 0.6, 0, 0, s * -0.2, { grp: grp, p: [s * 1.9, -1.6, 0], r: [0, 0, s * -0.15], s: 0.55 });
mmCaps(W, fur, 0.2, 0.12, 4.6, s * 2.5, 0.1, -0.7, 0, 0, s * MM_H, 10);
for (var a = 0; a < mmN(4); a++)
mmArc(W, a % 2 ? goldS : gold, 0.2, 0.07, 0, MM_PI, 0.9, s * (0.9 + a * 1.05), 0.1, -0.7, 0, MM_H, 0);
var u;
for (u = 0.5; u <= 5.6; u += mmLite() ? 0.9 : 0.45) {
var al = 0.06 + Math.max(0, u - 3.4) * 0.32;
mmWingFeather(W, u > 3.4 ? (Math.round(u * 2) % 2 ? fVio : fGold) : fDeep, u > 3.4 ? 2.6 + (u - 3.4) * 0.25 : 2.1, 0.62, s * u, -0.02, -0.55, s * Math.sin(al), Math.cos(al));
}
for (u = 0.4; u <= 4.8; u += mmLite() ? 0.9 : 0.45)
mmWingFeather(W, Math.round(u * 2) % 2 ? fGold : fVio, 1.15, 0.55, s * u, 0.1, -0.65, s * 0.12, 1);
});
mmQuadLegs(K, { mat: fur, dark: dark, claw: goldS, armour: gold, fur: mane, sx: 1.4, fz: -3.2, hz: 3.4, py: 5.2, len: 5.2, fat: 0.78, hoof: false,
limbF: function (s) { return { grp: grp, p: [s * 0.75, -9.6, -0.5], r: [0, 0, 0], s: 1.1 }; },
limbH: function (s) { return { grp: grp, p: [s * 0.85, -9.8, 0.85], r: [0.08, 0, 0], s: 1.05 }; } });
var T = K.part(0, 6.2, 5.0, 0, 0, 0, { grp: grp, p: [0, -14.6, 1.8], r: [-1.2, 0, 0], s: 0.6 });
mmTube(T, fur, [[0, 0, 0], [0, -1.2, 1.0], [0, -1.6, 2.6], [0, -0.6, 3.6]], 0.24, 0, 0, 0, 14);
mmArc(T, goldS, 0.26, 0.07, 0, MM_PI * 2, 0.4, 0, -1.2, 2.8, -0.2, 0, 0);
for (var q = 0; q < mmN(9); q++) {
var aq = q / mmN(9) * MM_PI * 2;
mmLock(T, q % 2 ? mane : mane2, 0.9, 0.4, 0.15, 0, -0.6, 3.6, [Math.cos(aq) * 0.6, 0.5 + Math.sin(aq) * 0.6, 0.9]);
}
var F = K.part(0, 5.8, 0.6, 0, 0, 0, { grp: grp, p: [0, -14.9, -0.6], r: [0, 0, 0], s: 1 }, true);
mmSabaton(F, dark, stripe, goldS, 0xC8A0FF, -1);
mmBakeParts(K);
return { g: K.g, K: K, h: 10.5, seat: [0, -4.8], muzzles: [[0, 8.8, -6.4]], anim: function (dt, mv, s2) { mmBeastAnim(K, s2, dt, mv); } };
},
function () {
var grp = "armR", K = mmBeastKit(), coat = mmMat(0xF29AC8, { tex: "fur", rep: 6, metal: 0.8, rough: 0.34 }), silver = mmMat(0xE8E8F0, { tex: "plate", metal: 0.95, rough: 0.18 }), silverS = mmMat(0xE8E8F0, { shine: 110, metal: 0.9, rough: 0.2 }), dark = mmMat(0x3A2A36, { metal: 0.3, rough: 0.5 }), hornM = mmMat(0xFFF4FA, { shine: 120, e: 0xF0A8D8, ei: 0.45, metal: 0.3, rough: 0.15 }), eyeM = mmMat(0xFFB8E8, { glow: 1 }), maneA = mmMat(0xFFF0FA, { metal: 0.8, rough: 0.34, ds: 1 }), maneB = mmMat(0xE860B0, { metal: 0.8, rough: 0.34, ds: 1 }), maneC = mmMat(0xB83A8A, { metal: 0.8, rough: 0.34, ds: 1 });
var B = K.part(0, 6.6, 0.2, 0, 0, 0, { grp: grp, p: [0, -3.9, 0], r: [MM_H, 0, 0], s: 0.8 });
var PR = [[0, -4.4], [1.05, -4.2], [1.65, -3.0], [1.75, -1.0], [1.8, 1.0], [1.95, 2.6], [1.85, 3.8], [1.15, 4.6], [0, 4.8]];
mmTorso(B, coat, PR, 0, 0, 0, 0.9, 1.1);
[-3.0, -1.85, 0.1].forEach(function (f, i) { var r = mmRadAt(PR, f); mmArc(B, i === 2 ? silverS : silver, r * 0.98, 0.13, 0.16 * MM_PI, 0.84 * MM_PI, i === 2 ? 1.6 : 1.1, 0, 0, -f).scale.set(0.9, 1.1, 1); });
mmArc(B, silver, 1.55, 0.14, -0.25 * MM_PI, 1.25 * MM_PI, 1.2, 0, -0.2, -3.85, 0, 0, 0).scale.set(0.95, 1.08, 1);
mmArc(B, silverS, 1.68, 0.06, -0.25 * MM_PI, 1.25 * MM_PI, 0.2, 0, -0.2, -4.5, 0, 0, 0).scale.set(0.95, 1.08, 1);
mmSeam(B, 0xFFB8E8, [[-1.4, 1.55, -0.9], [0, 2.15, -0.9], [1.4, 1.55, -0.9]], 0.04);
mmSeam(B, 0xFFB8E8, [[-1.4, 1.5, 0.9], [0, 2.15, 0.9], [1.4, 1.5, 0.9]], 0.04);
var N = K.part(0, 8.4, -3.6, -0.75, 0, 0, { grp: grp, p: [0, 1.6, 0], r: [0, 0, MM_H], s: 0.75 });
mmCaps(N, coat, 1.0, 0.72, 3.2, 0, 1.2, 0, 0, 0, 0, 16);
for (var c = 0; c < 4; c++)
mmArc(N, c % 2 ? silverS : silver, 0.98 - c * 0.07, 0.09, 0.95 * MM_PI, 2.05 * MM_PI, 0.62, 0, 0.15 + c * 0.68, 0, MM_H, 0, 0);
for (var m = 0; m < mmN(11); m++) {
var my = -0.3 + m * (mmLite() ? 0.62 : 0.31);
mmLock(N, [maneA, maneB, maneC][m % 3], 2.1 - m * 0.06, 0.6, (m % 2 ? 0.3 : -0.3), (m % 2 ? 0.18 : -0.18), my, 0.72 - m * 0.02, [(m % 2 ? 0.35 : -0.35), -0.55, 1]);
}
var Hd = K.part(0, 10.8, -5.0, 0.25, 0, 0, { grp: grp, p: [1.3, 0.7, 0], r: [0, -MM_H, 0], s: 0.85 });
mmEll(Hd, coat, 0.9, 0.95, 1.2, 0, 0, 0.2, 16);
var Mz = mmG(Hd, 0, -0.2, -0.5, -0.35, 0, 0);
mmTorso(Mz, coat, [[0, 0], [0.72, 0.1], [0.66, 0.9], [0.55, 1.6], [0.5, 2.0], [0, 2.15]], 0, 0, 0, 0.92, 0.95);
mmArc(Mz, silver, 0.62, 0.07, 0.22 * MM_PI, 0.78 * MM_PI, 1.7, 0, 0.05, -0.9);
[-1, 1].forEach(function (s) {
mmEll(Mz, dark, 0.12, 0.08, 0.06, s * 0.25, -0.05, -2.08, 6);
mmFlat(Hd, coat, [[-0.25, 0], [0.25, 0], [0, 0.9]], 0.14, s * 0.5, 0.9, 0.4, 0, 0, s * -0.2);
mmFlat(Hd, maneB, [[-0.14, 0.08], [0.14, 0.08], [0, 0.62]], 0.05, s * 0.5, 0.92, 0.33, 0, 0, s * -0.2);
mmEll(Hd, eyeM, 0.16, 0.1, 0.1, s * 0.66, 0.15, -0.55, 8);
});
mmArc(Hd, silver, 0.93, 0.08, 0.2 * MM_PI, 0.8 * MM_PI, 1.0, 0, 0.05, -0.15);
for (var fl = 0; fl < mmN(4); fl++)
mmLock(Hd, [maneA, maneB][fl % 2], 1.0, 0.4, 0.2, (fl - 1.5) * 0.18, 0.85, -0.15, [0, -0.5, -1]);
mmGlow(Hd, 0xFFB8E8, 1.4, 0.2, 0, 0.2, -0.8);
var Hn = K.part(0, 11.6, -5.7, -1.05, 0, 0, { grp: grp, p: [0, -13.6, -1.2], r: [-MM_H, 0, 0], s: 4.4 });
mmCone(Hn, hornM, 0.24, 2.7, 0, 1.35, 0, 0, 0, 0, 16);
var hx = [];
for (var hi = 0; hi <= 28; hi++) {
var ht = hi / 28, ha = ht * MM_PI * 2 * 4;
hx.push([Math.cos(ha) * (0.24 * (1 - ht) + 0.012), ht * 2.62, Math.sin(ha) * (0.24 * (1 - ht) + 0.012)]);
}
mmTube(Hn, silverS, hx, 0.022, 0, 0, 0, 56);
mmTorus(Hn, silverS, 0.25, 0.05, 0, 0.04, 0, MM_H, 0, 0);
mmGlow(Hn, 0xF8C8E8, 1.2, 0.22, 0, 2.2, 0);
var Ht = K.part(0, 6.6, 0.2, 0, 0, 0, { grp: grp, p: [0, -13.6, 0], r: [0, 0, 0], s: 1 }, true);
mmFlat(Ht, silver, [[-1.9, -0.1], [-0.4, -0.25], [0.4, -0.25], [1.9, -0.1], [1.6, 0.35], [0.5, 0.25], [-0.5, 0.25], [-1.6, 0.35]], 0.7, 0, 0, -0.8);
mmCyl(Ht, dark, 0.3, 0.3, 2.0, 0, 0, 0.3, MM_H, 0, 0, 12);
for (var w = 0; w < 5; w++)
mmTorus(Ht, silverS, 0.31, 0.04, 0, 0, -0.5 + w * 0.4, 0, 0, 0);
mmEll(Ht, silver, 0.55, 0.55, 0.55, 0, 0, 1.45, 12);
mmEll(Ht, mmMat(0xFF8AD8, { e: 0xE860B0, ei: 0.9 }), 0.25, 0.25, 0.12, 0, 0, 1.95, 10);
mmQuadLegs(K, { mat: coat, dark: silverS, armour: silver, fur: maneA, sx: 1.15, fz: -3.2, hz: 3.3, py: 5.9, len: 5.9, fat: 0.55, hoof: true,
limbF: function (s) { return { grp: grp, p: [s * 0.55, -7.6, 0], r: [0, 0, 0], s: 0.95 }; },
limbH: function (s) { return { grp: grp, p: [s * 0.45, -12.0, -0.3], r: [0.4, 0, 0], s: 0.45 }; } });
var T = K.part(0, 7.6, 4.4, 0.6, 0, 0, { grp: grp, p: [0, -7.2, 1.3], r: [0.5, 0, 0], s: 0.7 });
mmEll(T, coat, 0.4, 0.4, 0.55, 0, 0, 0, 10);
for (var q = 0; q < mmN(12); q++)
mmLock(T, [maneA, maneB, maneC][q % 3], 3.0 + (q % 4) * 0.25, 0.6, (q % 2 ? 0.35 : -0.35), ((q % 5) - 2) * 0.12, -0.1, 0.1 + (q % 3) * 0.1, [((q % 5) - 2) * 0.08, -1, 0.3]);
var Fi = K.part(0, 6.6, 0.2, 0, 0, 0, { grp: grp, p: [0, -13.4, 0], r: [0, 0, 0], s: 1 }, true);
mmEll(Fi, coat, 1.1, 1.0, 1.2, 0, 0, 0, 14);
for (var kn = 0; kn < 3; kn++)
mmArc(Fi, kn % 2 ? silverS : silver, 1.0 - kn * 0.05, 0.1, -0.1 * MM_PI, 1.1 * MM_PI, 0.42, 0, 0.05, -0.6 + kn * 0.45);
mmCyl(Fi, silver, 1.05, 1.2, 0.8, 0, 0.95, 0, 0, 0, 0, 16);
mmBakeParts(K);
return { g: K.g, K: K, h: 12, seat: [0, -5.6], muzzles: [[0, 13.8, -7.6]], anim: function (dt, mv, s2) { mmBeastAnim(K, s2, dt, mv); } };
},
function () {
var grp = "armL", K = mmBeastKit(), black = mmMat(0x24222A, { tex: "scale", rep: 3, metal: 0.55, rough: 0.32 }), belly = mmMat(0x4A3A5A, { tex: "plate", metal: 0.4, rough: 0.45 }), obs = mmMat(0x2E2A38, { tex: "plate", metal: 0.92, rough: 0.22 }), vio = mmMat(0x8A5AD8, { shine: 60, e: 0x4A2A8A, ei: 0.5 }), dark = mmMat(0x141218, { metal: 0.3, rough: 0.5 }), mem = mmMat(0x4A2A5E, { metal: 0.8, rough: 0.34, ds: 1 }), eyeM = mmMat(0xC08AFF, { glow: 1 }), claw = mmMat(0xD8D0E0, { shine: 90, metal: 0.3, rough: 0.25 });
var B = K.part(0, 6.2, 0.2, 0, 0, 0, { grp: grp, p: [0, -3.9, 0], r: [MM_H, 0, 0], s: 0.78 });
var PR = [[0, -5.2], [1.2, -4.9], [2.0, -3.6], [2.3, -1.4], [2.4, 1.0], [2.3, 3.2], [1.7, 4.6], [1.0, 5.2], [0, 5.4]];
mmTorso(B, black, PR, 0, 0, 0, 1, 0.95);
for (var i = 0; i < mmN(7); i++) {
var f = 3.6 - i * (mmLite() ? 2.2 : 1.1), r = mmRadAt(PR, f);
mmArc(B, belly, r * 0.97, 0.12, 1.2 * MM_PI, 1.8 * MM_PI, 0.95, 0, 0, -f).scale.y = 0.95;
}
for (var a = 0; a < 3; a++) {
var f2 = 2.6 - a * 1.9, r2 = mmRadAt(PR, f2);
mmArc(B, obs, r2 * 0.99, 0.15, 0.22 * MM_PI, 0.78 * MM_PI, 1.5, 0, 0, -f2).scale.y = 0.95;
}
mmSeam(B, 0xC08AFF, [[-1.3, 1.9, -2.6], [0, 2.42, -2.6], [1.3, 1.9, -2.6]], 0.045);
mmSeam(B, 0xC08AFF, [[-1.3, 1.95, 1.2], [0, 2.45, 1.2], [1.3, 1.95, 1.2]], 0.045);
for (var sp = 0; sp < mmN(9); sp++) {
var fs = 4.0 - sp * (mmLite() ? 2.0 : 1.0), rs = mmRadAt(PR, fs) * 0.95;
mmCone(B, dark, 0.22, 0.9 - sp * 0.04, 0, rs + 0.55, -fs, 0.45, 0, 0, 6);
}
var N = K.part(0, 8.2, -4.4, -0.9, 0, 0, { grp: grp, p: [0, 1.6, 0], r: [0, 0, MM_H], s: 0.7 });
mmCaps(N, black, 1.0, 0.7, 3.6, 0, 1.4, 0, 0, 0, 0, 16);
for (var n = 0; n < mmN(5); n++)
mmArc(N, belly, 0.92 - n * 0.06, 0.08, 1.15 * MM_PI, 1.85 * MM_PI, 0.5, 0, -0.2 + n * 0.75, 0, MM_H, 0, 0);
for (var ns = 0; ns < mmN(5); ns++)
mmCone(N, dark, 0.16, 0.7, 0, -0.1 + ns * 0.75, 0.85 - ns * 0.05, MM_H - 0.4, 0, 0, 6);
mmArc(N, obs, 1.02, 0.12, 0.0, MM_PI * 2, 0.5, 0, -0.35, 0, MM_H, 0, 0);
var Hd = K.part(0, 10.6, -6.4, 0.15, 0, 0, { grp: grp, p: [-1.4, 0.8, 0], r: [0, MM_H, 0], s: 0.85 });
mmEll(Hd, black, 1.0, 0.88, 1.25, 0, 0, 0.2, 16);
mmTorso(Hd, black, [[0, 0], [0.75, 0.1], [0.7, 1.0], [0.55, 1.9], [0.42, 2.4], [0, 2.6]], 0, -0.15, -0.45, 1, 0.72);
mmTorso(Hd, belly, [[0, 0], [0.6, 0.1], [0.5, 1.2], [0.36, 2.0], [0, 2.2]], 0, -0.68, -0.5, 0.92, 0.5);
mmArc(Hd, obs, 0.97, 0.1, 0.18 * MM_PI, 0.82 * MM_PI, 1.2, 0, 0.08, 0.15);
mmSeam(Hd, 0xC08AFF, [[-0.8, 0.62, -0.42], [0, 0.95, -0.5], [0.8, 0.62, -0.42]], 0.03);
[-1, 1].forEach(function (s) {
mmHorn(Hd, claw, [[s * 0.5, 0.6, 0.6], [s * 0.9, 1.1, 1.6], [s * 1.0, 1.0, 2.6]], 0.22, 0, 0, 0);
mmHorn(Hd, claw, [[s * 0.75, 0.2, 0.6], [s * 1.2, 0.35, 1.3], [s * 1.4, 0.3, 1.9]], 0.12, 0, 0, 0);
mmCaps(Hd, black, 0.18, 0.12, 0.9, s * 0.55, 0.45, -0.75, 0, 0, MM_H, 8);
mmEll(Hd, eyeM, 0.18, 0.09, 0.14, s * 0.6, 0.25, -0.78, 8);
for (var t = 0; t < 3; t++)
mmCone(Hd, claw, 0.07, 0.32, s * 0.32, -0.6, -1.6 - t * 0.45, MM_PI, 0, 0, 5);
var fr = [[0, 0], [0.9, 0.5], [1.6, 0.2], [1.5, -0.5], [0.8, -0.8]], sh = new THREE.Shape();
sh.moveTo(0, 0);
fr.forEach(function (p) { sh.lineTo(s * p[0], p[1]); });
var fm = mmMesh(new THREE.ShapeGeometry(sh), mem, s * 0.75, 0.0, 0.4, Hd);
fm.rotation.y = -s * 0.9;
mmRod(Hd, dark, [s * 0.75, 0, 0.4], [s * (0.75 + 0.9 * 0.62), 0.5, 0.4 + 0.9 * 0.78], 0.05, 0.02, 5);
mmRod(Hd, dark, [s * 0.75, 0, 0.4], [s * (0.75 + 1.6 * 0.62), 0.2, 0.4 + 1.6 * 0.78], 0.05, 0.02, 5);
});
mmGlow(Hd, 0xA070FF, 1.6, 0.25, 0, -0.4, -2.4);
[-1, 1].forEach(function (s) {
var W = K.part(s * 1.7, 8.0, -1.4, 0, 0, s * 0.95, { grp: grp, p: [-1.9, -10.2, 0.1], r: [0, 0, MM_H], s: 0.62 });
W.userData.wing = -s * 0.9;
var wr = [s * 3.4, 0.15, -0.7], tips = [[s * 9.4, 0.1, -0.5], [s * 8.4, 0, 2.0], [s * 6.6, 0, 3.6], [s * 4.4, 0, 4.3]];
var pts = [[0, 0.1], [3.4, -0.7], [9.4, -0.5], [8.1, 0.6], [8.4, 2.0], [7.0, 2.5], [6.6, 3.6], [5.2, 3.6], [4.4, 4.3], [2.6, 3.4], [1.0, 2.6], [0, 1.6]];
var ms = new THREE.Shape();
ms.moveTo(s * pts[0][0], pts[0][1]);
for (var pi = 1; pi < pts.length; pi++)
ms.lineTo(s * pts[pi][0], pts[pi][1]);
mmMesh(new THREE.ShapeGeometry(ms), mem, 0, 0, 0, W).rotation.x = MM_H;
mmRod(W, black, [0, 0, 0], wr, 0.34, 0.24, 10);
mmEll(W, obs, 0.32, 0.32, 0.32, wr[0], wr[1], wr[2], 10);
mmCaps(W, obs, 0.3, 0.26, 2.4, s * 1.7, 0.25, -0.4, 0, 0, s * MM_H, 10);
tips.forEach(function (tp, ti) { mmRod(W, black, wr, tp, 0.17 - ti * 0.015, 0.05, 8); });
mmCone(W, claw, 0.12, 0.6, wr[0], wr[1] + 0.3, wr[2] - 0.2, -0.6, 0, 0, 6);
});
mmQuadLegs(K, { mat: black, dark: dark, claw: claw, armour: obs, sx: 1.6, fz: -3.0, hz: 3.4, py: 4.8, len: 4.8, fat: 0.85, hoof: false,
limbF: function (s) { return { grp: grp, p: [s * 0.55, -7.7, 0], r: [0, 0, 0], s: 1.1 }; },
limbH: function (s) { return { grp: grp, p: [s * 0.5, -12.6, -0.3], r: [0.4, 0, 0], s: 0.5 }; } });
var T = K.part(0, 6.4, 5.2, 0, 0, 0, { grp: grp, p: [0, -7.0, 1.3], r: [0.6, 0, 0], s: 0.45 });
var tp = [[0, 0, 0], [0.4, -0.6, 2.6], [-0.6, -1.4, 5.4], [0.2, -2.2, 8.0]];
mmHorn(T, black, tp, 0.62, 0, 0, 0);
var tc = new THREE.CatmullRomCurve3(tp.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
for (var ts = 0; ts < mmN(7); ts++) {
var tt = 0.06 + ts / mmN(7) * 0.84, tq = tc.getPoint(tt);
mmCone(T, dark, 0.14 * (1 - tt * 0.6), 0.6 * (1 - tt * 0.5), tq.x, tq.y + 0.55 * (1 - tt * 0.7), tq.z, 0.5, 0, 0, 5);
}
mmFlat(T, vio, [[0, 0], [0.9, 0.9], [0, 2.0], [-0.9, 0.9]], 0.16, 0.2, -2.2, 8.4, MM_H, 0, 0);
var Bo = K.part(0, 6.2, 0.2, 0, 0, 0, { grp: grp, p: [-2.2, -10.2, 0], r: [0, 0, MM_H], s: 1 }, true);
mmLathe(Bo, obs, [[0, 1.15], [0.55, 1.08], [1.05, 0.7], [1.3, 0.15], [1.35, 0], [0, 0]], 0, 0, 0, 22);
mmTorus(Bo, claw, 1.3, 0.12, 0, 0.05, 0, MM_H, 0, 0);
mmEll(Bo, mmMat(0xC08AFF, { e: 0x8A4AFF, ei: 0.9 }), 0.4, 0.2, 0.4, 0, 1.12, 0, 12);
for (var bs = 0; bs < 6; bs++) {
var ba = bs / 6 * MM_PI * 2;
mmCone(Bo, claw, 0.12, 0.7, Math.cos(ba) * 1.15, 0.4, Math.sin(ba) * 1.15, 0, 0, 0, 6).rotation.set(Math.sin(ba) * 1.1, 0, -Math.cos(ba) * 1.1);
}
var Fi = K.part(0, 6.2, 0.2, 0, 0, 0, { grp: grp, p: [0, -13.4, 0], r: [0, 0, 0], s: 1 }, true);
mmEll(Fi, black, 1.1, 1.0, 1.2, 0, 0, 0, 14);
mmArc(Fi, obs, 1.02, 0.1, -0.1 * MM_PI, 1.1 * MM_PI, 0.9, 0, 0.1, -0.2);
mmCyl(Fi, obs, 1.05, 1.2, 0.8, 0, 0.95, 0, 0, 0, 0, 16);
for (var c = -1; c <= 1; c++)
mmCone(Fi, claw, 0.14, 0.8, c * 0.45, -0.9, -0.6, MM_PI - 0.4, 0, 0, 6);
mmBakeParts(K);
return { g: K.g, K: K, h: 12, seat: [0, -6.8], muzzles: [[0, 10.0, -9.2]], anim: function (dt, mv, s2) { mmBeastAnim(K, s2, dt, mv); } };
},
function () {
var K = mmBeastKit(), red = mmMat(0xD8342A, { tex: "feather", rep: 4, metal: 0.8, rough: 0.34 }), gold = mmMat(0xF2B23A, { tex: "plate", metal: 0.95, rough: 0.2 }), goldS = mmMat(0xF2B23A, { shine: 100, metal: 0.9, rough: 0.25 }), dark = mmMat(0x3A1A14, { metal: 0.3, rough: 0.5 }), eyeM = mmMat(0xFFE08A, { glow: 1 }), steel = mmMat(0x4A4A50, { tex: "plate", metal: 0.9, rough: 0.3 }), fRed = mmMat(0xD8342A, { tex: "feather", rep: 1, metal: 0.8, rough: 0.34, ds: 1 }), fGold = mmMat(0xF2B23A, { tex: "feather", rep: 1, metal: 0.8, rough: 0.34, ds: 1 }), fEmber = mmMat(0xFF9A4A, { tex: "feather", rep: 1, e: 0xFF6A2A, ei: 0.45, metal: 0.8, rough: 0.34, ds: 1 });
var B = K.part(0, 6.0, 0.4, 0.2, 0, 0, { grp: "wings", p: [0, -1.6, 0.7], r: [MM_H * 0.9, 0, 0], s: 0.85 });
var PR = [[0, -3.0], [0.9, -2.8], [1.45, -1.8], [1.65, -0.2], [1.75, 1.0], [1.6, 2.2], [1.1, 3.0], [0, 3.3]];
mmTorso(B, red, PR, 0, 0, 0, 1, 1.12);
mmEll(B, gold, 1.45, 1.5, 0.62, 0, -0.25, -2.55, 16);
mmTorus(B, goldS, 1.32, 0.08, 0, -0.25, -2.88, 0, 0, 0);
mmArc(B, steel, 1.62, 0.13, 0.2 * MM_PI, 0.8 * MM_PI, 1.6, 0, 0, 0.3).scale.y = 1.12;
mmSeam(B, 0xFFB060, [[-1.1, 1.4, 0.3], [0, 1.95, 0.3], [1.1, 1.4, 0.3]], 0.045);
for (var r = 0; r < 2; r++)
for (var cI = 0; cI < mmN(7); cI++) {
var ang = 0.15 * MM_PI + cI / (mmN(7) - 1) * 0.7 * MM_PI, rr = mmRadAt(PR, 1.6 - r * 0.9);
mmFeather(B, r ? fGold : fEmber, 1.3, 0.5, Math.cos(ang) * rr, Math.sin(ang) * rr * 1.12 + 0.05, -1.6 + r * 0.9, [Math.cos(ang) * 0.25, Math.sin(ang) * 0.2, 1], 0);
}
var Hd = K.part(0, 8.8, -3.2, 0, 0, 0, { grp: "head", p: [0, 3.2, 0.3], r: [0, 0, 0], s: 0.8 });
mmCaps(Hd, red, 0.7, 0.55, 1.6, 0, -0.8, 0.4, 0.6, 0, 0, 12);
mmEll(Hd, red, 0.85, 0.85, 1.0, 0, 0.2, 0, 16);
mmHorn(Hd, goldS, [[0, 0.15, -0.6], [0, 0.05, -1.45], [0, -0.42, -1.9]], 0.4, 0, 0, 0);
mmHorn(Hd, gold, [[0, -0.2, -0.55], [0, -0.3, -1.2]], 0.24, 0, 0, 0);
mmArc(Hd, gold, 0.84, 0.07, 0.25 * MM_PI, 0.75 * MM_PI, 0.9, 0, 0.25, -0.25);
[-1, 1].forEach(function (s) { mmEll(Hd, eyeM, 0.16, 0.12, 0.1, s * 0.55, 0.35, -0.55, 8); });
for (var c = 0; c < mmN(7); c++) {
var sw = (c - 3) * 0.12;
mmFeather(Hd, c % 2 ? fGold : fEmber, 2.4 + c * 0.18, 0.42, sw * 0.8, 0.8, 0.0 + c * 0.12, [sw, 0.75, 0.9 + c * 0.06], MM_H);
}
for (var hk = 0; hk < mmN(8); hk++) {
var ha = -0.1 * MM_PI + hk / (mmN(8) - 1) * 1.2 * MM_PI;
mmFeather(Hd, hk % 2 ? fRed : fEmber, 1.3, 0.45, Math.cos(ha) * 0.75, Math.sin(ha) * 0.6 - 0.2, 0.55, [Math.cos(ha) * 0.4, -0.6, 1], 0);
}
mmGlow(Hd, 0xFFB060, 1.8, 0.22, 0, 0.6, 0);
[-1, 1].forEach(function (s) {
var W = K.part(s * 1.3, 7.2, -0.6, 0, 0, s * 0.85, { grp: "wings", p: [s * 1.6, 1.2, 0.4], r: [0.2, 0, s * 0.55], s: 1.35 });
W.userData.wing = -s * 0.8;
mmCaps(W, gold, 0.24, 0.18, 3.4, s * 1.8, 0.05, 0, 0, 0, s * MM_H, 10);
mmCaps(W, gold, 0.18, 0.1, 4.4, s * 5.8, 0.05, 0.1, 0, 0, s * MM_H, 10);
mmEll(W, goldS, 0.3, 0.3, 0.3, s * 3.6, 0.05, 0.02, 10);
for (var lm = 0; lm < mmN(6); lm++)
mmArc(W, steel, 0.24, 0.06, 0.0, MM_PI, 0.42, s * (0.6 + lm * 1.3), 0.05, 0.0, 0, MM_H, 0);
var u;
for (u = 0.4; u <= 8.4; u += mmLite() ? 0.8 : 0.4) {
var al = Math.max(0, u - 5.0) * 0.22, prim = u > 5.0;
mmWingFeather(W, prim ? (Math.round(u * 2.5) % 2 ? fGold : fEmber) : (Math.round(u * 2.5) % 2 ? fRed : fEmber), prim ? 3.0 + (u - 5) * 0.35 : 2.6, prim ? 0.7 : 0.75, s * u, -0.03, 0.05, s * Math.sin(al), Math.cos(al));
}
for (u = 0.3; u <= 7.6; u += mmLite() ? 0.8 : 0.4)
mmWingFeather(W, Math.round(u * 2.5) % 2 ? fGold : fRed, 1.3, 0.55, s * u, 0.06, 0.0, s * 0.1, 1);
});
[-1, 1].forEach(function (s) {
var Tp = K.part(s * 0.55, 5.6, 3.4, MM_H + 0.35, 0, 0, { grp: "torso", p: [s * 3.6, 14.6, 1.0], r: [-MM_H, 0, 0], s: 1.2 });
mmCaps(Tp, steel, 0.42, 0.32, 3.6, 0, 1.4, 0, 0, 0, 0, 14);
mmCyl(Tp, goldS, 0.48, 0.48, 0.5, 0, 0.2, 0, 0, 0, 0, 14);
mmCyl(Tp, goldS, 0.38, 0.38, 0.2, 0, 2.9, 0, 0, 0, 0, 12);
mmCyl(Tp, dark, 0.2, 0.2, 0.4, 0, 3.4, 0, 0, 0, 0, 10);
mmSeam(Tp, 0xFFB060, [[0.43, 0.6, 0], [0.36, 2.6, 0]], 0.04);
for (var p = 0; p < mmN(4); p++)
mmFeather(Tp, p % 2 ? fGold : fEmber, 3.6 + p * 0.5, 0.7, s * (0.2 + p * 0.12), 0.6, 0.25, [s * (0.1 + p * 0.12), 1, 0.3 + p * 0.08], MM_H);
});
[-1, 1].forEach(function (s) {
var L = K.part(s * 0.8, 4.8, 0.6, 0, 0, 0, { grp: "wings", p: [s * 0.6, -3.2, 0.9], r: [0.4, 0, 0], s: 0.45 });
mmEll(L, red, 0.55, 0.7, 0.6, 0, -0.1, 0, 10);
mmCaps(L, gold, 0.3, 0.24, 2.8, 0, -1.6, 0, 0, 0, 0, 10);
for (var sc = 0; sc < mmN(5); sc++)
mmTorus(L, goldS, 0.3 - sc * 0.012, 0.04, 0, -0.6 - sc * 0.45, 0, MM_H, 0, 0);
for (var t = -1; t <= 1; t++)
mmCone(L, dark, 0.12, 0.9, t * 0.35, -3.0, -0.4, -MM_H + 0.3, t * 0.3, 0, 6);
mmCone(L, dark, 0.1, 0.6, 0, -3.0, 0.35, MM_H - 0.3, 0, 0, 6);
L.userData.swing = 0.35;
L.userData.phase = s > 0 ? 0 : MM_PI;
});
mmBakeParts(K);
return { g: K.g, K: K, h: 10, seat: [0, -3.4], muzzles: [[-0.55, 8.4, -5.0], [0.55, 8.4, -5.0]], anim: function (dt, mv, s2) { mmBeastAnim(K, s2, dt, mv); } };
},
function () {
var K = mmBeastKit(), hide = mmMat(0xE07A22, { tex: "fur", rep: 4, metal: 0.8, rough: 0.34 }), iron = mmMat(0x3A3A40, { tex: "plate", metal: 0.9, rough: 0.3 }), gold = mmMat(0xE8C060, { shine: 110, metal: 0.95, rough: 0.2 }), horn = mmMat(0xF0E6D0, { shine: 90, metal: 0.1, rough: 0.35 }), eyeM = mmMat(0xFFB060, { glow: 1 }), core = mmMat(0xFFC070, { e: 0xFF8A2A, ei: 0.9 }), shag = mmMat(0x6A3210, { metal: 0.8, rough: 0.34, ds: 1 }), shag2 = mmMat(0xA8521A, { metal: 0.8, rough: 0.34, ds: 1 }), dark = mmMat(0x2A1A10, { metal: 0.2, rough: 0.6 });
var C = K.part(0, 9.6, 0, 0, 0, 0, { grp: "torso", p: [0, 9.6, 0], r: [0, 0, 0], s: [1.55, 1.45, 1.5] });
mmEll(C, hide, 3.3, 2.6, 2.1, 0, 0, 0, 22);
[-1, 1].forEach(function (s) { mmEll(C, hide, 1.5, 1.4, 1.6, s * 3.2, 0.9, 0, 14); mmEll(C, hide, 1.35, 0.95, 0.7, s * 1.3, 0.5, -1.55, 12); });
mmEll(C, iron, 2.55, 1.55, 0.85, 0, 0.55, -1.5, 20);
mmTorus(C, gold, 0.82, 0.1, 0, 0.3, -2.3, 0, 0, 0);
mmCyl(C, core, 0.7, 0.7, 0.3, 0, 0.3, -2.2, MM_H, 0, 0, 16);
mmGlow(C, 0xFFA040, 2.4, 0.22, 0, 0.3, -2.5);
mmSeam(C, 0xFFB060, [[-2.3, 1.0, -1.25], [-1.0, 1.75, -1.85], [1.0, 1.75, -1.85], [2.3, 1.0, -1.25]], 0.05);
for (var ab = 0; ab < 3; ab++)
[-1, 1].forEach(function (s) { mmEll(C, hide, 0.55, 0.38, 0.35, s * 0.6, -1.15 - ab * 0.55, -1.85 + ab * 0.1, 8); });
for (var mt = 0; mt < mmN(16); mt++) {
var mx = -2.9 + mt * (5.8 / (mmN(16) - 1));
mmLock(C, mt % 2 ? shag : shag2, 1.9, 0.7, (mt % 2 ? 0.25 : -0.25), mx, 2.2 - Math.abs(mx) * 0.18, 0.5 + (mt % 3) * 0.3, [mx * 0.12, -0.25, 1]);
}
var A = K.part(0, 7.0, 0, 0, 0, 0, { grp: "torso", p: [0, 3.6, 0], r: [0, 0, 0], s: 1.55 });
mmEll(A, iron, 2.3, 1.5, 1.7, 0, 0, 0, 18);
mmTorus(A, gold, 2.2, 0.2, 0, -0.6, 0, MM_H, 0, 0);
for (var st = 0; st < mmN(12); st++) {
var sa = st / mmN(12) * MM_PI * 2;
mmEll(A, gold, 0.12, 0.12, 0.08, Math.cos(sa) * 2.38, -0.6, Math.sin(sa) * 1.62, 6);
}
[[0, -1.75, 0], [-1.6, -1.2, 0.8], [1.6, -1.2, -0.8]].forEach(function (q) { mmSlab(A, iron, 1.4, 1.3, 0.22, q[0], -1.4, q[1], 0.18, q[2], 0); });
for (var lc = 0; lc < mmN(7); lc++)
mmLock(A, lc % 2 ? shag : shag2, 1.5, 0.6, (lc % 2 ? 0.2 : -0.2), -1.1 + lc * 0.37, -1.0, -1.85, [0, -1, -0.15]);
var Hd = K.part(0, 12.4, -0.3, 0, 0, 0, { grp: "head", p: [0, 0.4, -0.2], r: [0, 0, 0], s: 1.7 });
mmEll(Hd, hide, 1.05, 1.1, 1.15, 0, 0, 0, 18);
mmTorso(Hd, hide, [[0, 0], [0.85, 0.1], [0.82, 0.6], [0.7, 1.1], [0, 1.25]], 0, -0.5, -0.55, 1.1, 0.85);
mmEll(Hd, dark, 0.55, 0.32, 0.3, 0, -0.55, -1.72, 10);
[-1, 1].forEach(function (s) { mmEll(Hd, mmMat(0x120A06, { metal: 0, rough: 0.8 }), 0.12, 0.08, 0.06, s * 0.24, -0.45, -1.98, 6); });
mmTorus(Hd, gold, 0.26, 0.05, 0, -0.95, -1.85, 0, 0, 0);
mmArc(Hd, iron, 1.04, 0.1, 0.15 * MM_PI, 0.85 * MM_PI, 0.7, 0, 0.15, -0.1);
mmSeam(Hd, 0xFFB060, [[-0.9, 0.65, -0.45], [0, 1.0, -0.55], [0.9, 0.65, -0.45]], 0.035);
[-1, 1].forEach(function (s) {
mmHorn(Hd, horn, [[s * 0.8, 0.5, 0], [s * 2.0, 0.9, -0.2], [s * 2.6, 1.8, -0.9], [s * 2.3, 2.8, -1.6]], 0.36, 0, 0, 0);
mmTorus(Hd, gold, 0.33, 0.06, s * 1.15, 0.62, -0.06, 0, MM_H, 0.3 * s);
mmEll(Hd, eyeM, 0.18, 0.1, 0.1, s * 0.5, 0.25, -0.95, 8);
mmFlat(Hd, hide, [[0, 0], [0.7, 0.2], [0.3, 0.5]], 0.1, s * 1.0, 0.2, 0.2, 0, s > 0 ? 0 : MM_PI, 0);
mmSlab(Hd, iron, 0.18, 0.9, 0.9, s * 0.98, -0.25, -0.35, 0, 0, s * 0.12);
});
for (var fl = 0; fl < mmN(6); fl++)
mmLock(Hd, fl % 2 ? shag : shag2, 0.9, 0.4, 0.2, (fl - 2.5) * 0.22, 1.05, -0.35, [(fl - 2.5) * 0.1, 0.3, -1]);
for (var bd = 0; bd < mmN(5); bd++)
mmLock(Hd, bd % 2 ? shag : shag2, 1.0, 0.4, 0.15, (bd - 2) * 0.2, -1.0, -1.1, [0, -1, -0.2]);
mmGlow(Hd, 0xFFA040, 1.2, 0.2, 0, 0.25, -1.1);
[-1, 1].forEach(function (s) {
var Ar = K.part(s * 3.5, 10.6, 0, 0, 0, s * 0.12, { grp: "torso", p: [s * 6.4, 12.4, 0], r: [0, 0, s * MM_H], s: 0.62 });
mmEll(Ar, hide, 1.15, 1.2, 1.1, 0, -0.6, 0, 12);
mmCaps(Ar, hide, 0.95, 0.78, 3.0, 0, -1.9, 0, 0, 0, 0, 14);
mmEll(Ar, iron, 0.75, 0.75, 0.75, 0, -3.6, 0, 12);
mmCaps(Ar, hide, 0.78, 0.65, 2.6, 0, -5.2, -0.2, 0.1, 0, 0, 14);
mmArc(Ar, iron, 0.74, 0.1, -0.05 * MM_PI, 1.05 * MM_PI, 2.0, 0, -5.3, -0.15, -MM_H, 0, 0);
mmTorus(Ar, gold, 0.82, 0.08, 0, -4.4, -0.1, MM_H, 0, 0);
mmEll(Ar, iron, 0.95, 0.9, 1.0, 0, -7.0, -0.3, 12);
for (var kn = 0; kn < 3; kn++)
mmEll(Ar, gold, 0.14, 0.14, 0.12, (kn - 1) * 0.4, -7.2, -1.2, 6);
for (var ab2 = 0; ab2 < mmN(5); ab2++) {
var aa = ab2 / mmN(5) * MM_PI * 2;
mmLock(Ar, ab2 % 2 ? shag : shag2, 0.8, 0.4, 0.15, Math.cos(aa) * 1.0, -1.2, Math.sin(aa) * 1.0, [Math.cos(aa) * 0.6, -1, Math.sin(aa) * 0.6]);
}
Ar.userData.swing = 0.32;
Ar.userData.phase = s > 0 ? MM_PI : 0;
});
[-1, 1].forEach(function (s) {
var L = K.part(s * 1.4, 6.6, 0, 0, 0, 0, { grp: "torso", p: [s * 2.8, 1.0, -0.2], r: [0, 0, s * 0.12], s: 0.48 });
mmCaps(L, hide, 1.05, 0.85, 3.0, 0, -1.6, 0, 0, 0, 0, 14);
mmEll(L, iron, 0.8, 0.8, 0.8, 0, -3.3, 0, 12);
mmEll(L, iron, 0.5, 0.55, 0.35, 0, -3.3, -0.7, 10);
mmCaps(L, hide, 0.8, 0.7, 2.6, 0, -4.9, 0.1, -0.06, 0, 0, 14);
mmArc(L, iron, 0.76, 0.1, 0.05 * MM_PI, 0.95 * MM_PI, 2.0, 0, -4.9, 0.05, -MM_H, 0, 0);
mmLathe(L, dark, [[0, -6.75], [0.95, -6.75], [0.9, -6.3], [0.7, -5.95], [0, -5.95]], 0, 0, -0.1, 14);
for (var hl = 0; hl < mmN(6); hl++) {
var ha = hl / mmN(6) * MM_PI * 2;
mmLock(L, hl % 2 ? shag : shag2, 0.8, 0.35, 0.12, Math.sin(ha) * 0.7, -5.85, Math.cos(ha) * 0.7 - 0.1, [Math.sin(ha) * 0.7, -1, Math.cos(ha) * 0.7]);
}
L.userData.swing = 0.38;
L.userData.phase = s > 0 ? 0 : MM_PI;
});
var E = K.part(0, 9.6, 0, 0, 0, 0, { grp: "torso", p: [0, 10.4, -3.25], r: [0, 0, 0], s: 1 }, true);
mmFlat(E, gold, [[0, 2.2], [0.7, 0.6], [2.0, 0.4], [1.0, -0.6], [1.4, -2.0], [0, -1.2], [-1.4, -2.0], [-1.0, -0.6], [-2.0, 0.4], [-0.7, 0.6]], 0.3, 0, 0, 0);
mmCyl(E, iron, 0.72, 0.8, 0.3, 0, 0.05, -0.2, MM_H, 0, 0, 18);
mmEll(E, mmMat(0xFFD08A, { e: 0xFF9A3A, ei: 0.95 }), 0.55, 0.55, 0.2, 0, 0.05, -0.4, 14);
mmTorus(E, gold, 0.78, 0.07, 0, 0.05, -0.36, 0, 0, 0);
[-1, 1].forEach(function (s) {
var Pa = K.part(0, 9.6, 0, 0, 0, 0, { grp: "torso", p: [s * 7.0, 14.6, 0], r: [0, 0, -s * 0.3], s: 1 }, true);
mmLathe(Pa, hide, [[0, 1.4], [1.6, 1.2], [2.6, 0.3], [2.8, -0.6], [2.4, -1.0]], 0, 0, 0, 18).scale.set(1, 1, 0.9);
mmTorus(Pa, gold, 2.5, 0.14, 0, -0.7, 0, MM_H, 0, 0);
for (var lm = 0; lm < 3; lm++)
mmArc(Pa, iron, 2.3 + lm * 0.1, 0.14, MM_PI * (s > 0 ? -0.5 : 0.5), MM_PI * (s > 0 ? 0.5 : 1.5), 0.5, 0, -1.1 - lm * 0.5, 0, MM_H, 0, 0);
mmCone(Pa, gold, 0.3, 1.4, 0, 1.9, 0, 0, 0, 0, 10);
mmSeam(Pa, 0xFFB060, [[s * 2.6, -0.65, -1.2], [s * 2.85, -0.6, 0], [s * 2.6, -0.65, 1.2]], 0.05);
});
var Cr = K.part(0, 12.4, -0.3, 0, 0, 0, { grp: "head", p: [0, 1.15, -0.25], r: [0, 0, 0], s: 1.7 }, true);
mmTorus(Cr, gold, 1.08, 0.1, 0, 0, 0, MM_H, 0, 0);
for (var cp = 0; cp < 7; cp++) {
var ca = MM_PI * (0.15 + cp * 0.7 / 6) + MM_PI;
mmCone(Cr, gold, 0.12, 0.55 + (cp === 3 ? 0.35 : 0), Math.cos(ca) * 1.08, 0.3 + (cp === 3 ? 0.17 : 0), Math.sin(ca) * 1.08, 0, 0, 0, 6);
}
mmEll(Cr, mmMat(0xFFD08A, { e: 0xFF9A3A, ei: 0.95 }), 0.16, 0.2, 0.1, 0, 0.15, -1.12, 8);
var Ts = K.part(0, 7.0, 0, 0, 0, 0, { grp: "torso", p: [0, 1.9, 0], r: [0, 0, 0], s: 1 }, true);
mmTorus(Ts, gold, 3.5, 0.22, 0, 0.2, 0, MM_H, 0, 0).scale.set(1.05, 0.8, 1);
[1.5, 1.22, 1.78, 0.96, 2.04].forEach(function (c) { mmArc(Ts, iron, 3.35, 0.2, (c - 0.12) * MM_PI, (c + 0.12) * MM_PI, 2.6, 0, -1.2, 0, MM_H, 0, 0).scale.set(1.05, 0.8, 1); });
[1.5, 0.96, 2.04].forEach(function (c) { mmSeam(Ts, 0xFFB060, [[Math.cos((c - 0.1) * MM_PI) * 3.65 * 1.05, -0.2, Math.sin((c - 0.1) * MM_PI) * 3.65 * 0.8], [Math.cos(c * MM_PI) * 3.7 * 1.05, -0.2, Math.sin(c * MM_PI) * 3.7 * 0.8], [Math.cos((c + 0.1) * MM_PI) * 3.65 * 1.05, -0.2, Math.sin((c + 0.1) * MM_PI) * 3.65 * 0.8]], 0.05); });
mmBakeParts(K);
return { g: K.g, K: K, h: 15, seat: [0, -1.5], muzzles: [[0, 12.4, -2.4]], anim: function (dt, mv, s2) { mmBeastAnim(K, s2, dt, mv); } };
},
function (d) {
var key = d.k + "@" + d.at + "@" + (typeof WLD !== "undefined" && WLD.w ? (WLD.w.g && WLD.w.g.uuid) : "");
var c = MM.spots[d.k];
if (c && c.key === key)
return c;
var s = mmSeed(d), need = d.r + 4, best = null;
if (d.at === "sea") {
best = { x: s[0], z: s[1], y: mmGround(s[0], s[1]) };
}
else
for (var rad = 0; rad <= 150 && !best; rad += 6) {
var n = rad ? Math.max(8, Math.round(rad / 4)) : 1;
for (var q = 0; q < n && !best; q++) {
var a = q / n * Math.PI * 2 + mmHash(d.k) % 7, x = s[0] + Math.cos(a) * rad, z = s[1] + Math.sin(a) * rad, y = mmGround(x, z), lo = y, hi = y, ok = y > -500;
if (ok && d.at === "neverland" && y < 2)
ok = false;
for (var u = -1; u <= 1 && ok; u++)
for (var v = -1; v <= 1 && ok; v++) {
var px = x + u * need * 0.7, pz = z + v * need * 0.7, py = mmGround(px, pz);
lo = Math.min(lo, py);
hi = Math.max(hi, py);
if (py < -500 || mmBlockL(px, pz, py))
ok = false;
if (d.at === "neverland" && py < 2)
ok = false;
}
if (ok && hi - lo < (d.lair === "maze" ? 2.2 : 3.2))
best = { x: x, z: z, y: lo };
}
}
if (!best)
best = { x: s[0], z: s[1], y: mmGround(s[0], s[1]) };
best.yaw = Math.atan2(-best.x, -best.z);
best.key = key;
MM.spots[d.k] = best;
return best;
},
function (d) {
var k = "clue:" + d.k, key = d.at + "@" + (typeof WLD !== "undefined" && WLD.w ? (WLD.w.g && WLD.w.g.uuid) : "");
var c = MM.spots[k];
if (c && c.key === key)
return c;
var s = d.clueAt;
if (d.at === "underdark")
s = MM_UD_CLUE;
if (d.at === "sea") {
var L = (typeof SEA_PLACES !== "undefined") ? SEA_PLACES.filter(function (p) { return p.k === "lotus"; })[0] : null;
s = L ? [L.land.x + 16, L.land.z + 22] : [0, 0];
}
var W = WLD.w, F = null;
try {
if (typeof dkFreeNear === "function" && W)
F = dkFreeNear(W, s[0], s[1], 2.2, 0.8);
}
catch (e) { }
if (!F)
F = { x: s[0], z: s[1], y: mmGround(s[0], s[1]) };
c = { x: F.x, z: F.z, y: F.y !== undefined ? F.y : mmGround(F.x, F.z), key: key };
MM.spots[k] = c;
return c;
},
function (seed, detail) {
var g = new THREE.IcosahedronGeometry(1, mmLite() ? 1 : (detail || 2)), p = g.attributes.position, R = wRand(seed), v = new THREE.Vector3();
var bumps = [];
for (var i = 0; i < 6; i++)
bumps.push([R() * 2 - 1, R() * 2 - 1, R() * 2 - 1, 0.1 + R() * 0.18]);
for (var j = 0; j < p.count; j++) {
v.fromBufferAttribute(p, j);
var n = v.clone().normalize(), k = 1;
bumps.forEach(function (b) { var d = n.x * b[0] + n.y * b[1] + n.z * b[2]; k += b[3] * Math.max(0, d); });
k += (wNoise(n.x * 3 + seed % 13, n.z * 3 + n.y * 2, seed) - 0.5) * 0.22;
v.copy(n).multiplyScalar(k);
p.setXYZ(j, v.x, v.y, v.z);
}
g.computeVertexNormals();
return g;
},
function (G, d, sol) {
var rock = mmMat(0x8A3E22, { shine: 8 }), rock2 = mmMat(0xA85A34, { shine: 8 }), R = wRand(11);
[-1, 1].forEach(function (s) {
for (var i = 0; i < 5; i++) {
var z = -24 + i * 10, x = s * (15 + R() * 2), h = 16 + R() * 8;
mmRock(G, i % 2 ? rock : rock2, 7 + R() * 3, h, 7 + R() * 3, x, h * 0.55, z, 31 + i * 7 + (s > 0 ? 3 : 0), R() * 3);
sol.push({ x: x, z: z, r: 7 });
}
mmRock(G, rock, 5, 3, 26, s * 9, 23, -6, 91 + (s > 0 ? 1 : 0)).rotation.z = s * 0.5;
});
mmRock(G, rock2, 16, 12, 8, 0, 8, -30, 77);
sol.push({ x: 0, z: -30, r: 12 });
},
function (G, d, sol) {
var ice = mmMat(0xC8E0F0, { shine: 110, op: 0.82, ds: 1, spec: 0xFFFFFF }), deep = mmMat(0x8AB0D0, { shine: 60 }), R = wRand(12);
var dome = mmMesh(new THREE.SphereGeometry(20, mmSeg(26), mmSeg(12), MM_MOUTH[0], MM_MOUTH[1], 0, Math.PI / 2), ice, 0, -1, 0, G);
dome.scale.set(1.15, 0.7, 1.3);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2;
if (Math.abs(Math.sin(a / 2)) < 0.18)
continue;
var x = Math.sin(a) * 23, z = Math.cos(a) * 26;
sol.push({ x: x, z: z, r: 4 });
mmRock(G, deep, 4 + R() * 3, 5 + R() * 5, 4 + R() * 3, x, 2, z, 201 + i, R() * 3);
}
for (var c = 0; c < 10; c++)
mmCone(G, ice, 0.6 + R() * 0.6, 3 + R() * 4, (R() - 0.5) * 26, 11.5 - R() * 2, (R() - 0.5) * 26, Math.PI, 0, 0, 7);
},
function (G, d, sol) {
var dust = mmMat(0x6A6660, { shine: 6 }), dk = mmMat(0x3A3836, { shine: 4 }), R = wRand(13);
for (var i = 0; i < 22; i++) {
var a = i / 22 * Math.PI * 2;
if (Math.abs(Math.sin(a / 2)) < 0.15)
continue;
var x = Math.sin(a) * 24, z = Math.cos(a) * 24;
mmRock(G, i % 3 ? dust : dk, 6 + R() * 4, 4 + R() * 4, 6 + R() * 4, x, 1.5, z, 301 + i, R() * 3);
sol.push({ x: x, z: z, r: 5 });
}
mmRock(G, dk, 12, 7, 9, -6, 4, -18, 388);
},
function (G, d, sol) {
var c1 = mmMat(0xC8A8FF, { shine: 120, e: 0x6A3AA8, ei: 0.5, op: 0.9 }), c2 = mmMat(0xA8F0FF, { shine: 120, e: 0x2A8AA8, ei: 0.5, op: 0.9 }), R = wRand(14);
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2 + R() * 0.2;
if (Math.abs(Math.sin(a / 2)) < 0.2)
continue;
var rr = 24 + R() * 6, x = Math.sin(a) * rr, z = Math.cos(a) * rr, h = 14 + R() * 16;
mmCone(G, i % 2 ? c1 : c2, 1.4 + R() * 1.2, h, x, h / 2, z, (R() - 0.5) * 0.2, 0, (R() - 0.5) * 0.2, 6);
sol.push({ x: x, z: z, r: 2 });
}
},
function (G, d, sol) {
var st = mmMat(0x5A5450, { shine: 10, tex: "plate" }), dk = mmMat(0x2A2624, { shine: 8 }), gold = mmMat(0xB89048, { shine: 60 });
[-1, 1].forEach(function (s) { mmSlab(G, st, 2, 14, 26, s * 10, 7, 0); sol.push({ x: s * 10, z: 0, hw: 1.2, hd: 13 }); });
mmSlab(G, st, 22, 14, 2, 0, 7, -13);
sol.push({ x: 0, z: -13, hw: 11, hd: 1.2 });
mmSlab(G, dk, 22, 1.2, 28, 0, 14.4, 0);
var arch = mmTorus(G, st, 8, 1.2, 0, 7, 13, 0, 0, 0, Math.PI);
[-1, 1].forEach(function (s) { var D = mmG(G, s * 8.6, 0, 15); mmCyl(D, st, 1.1, 1.4, 1.2, 0, 0.6, 0, 0, 0, 0, 12); mmEll(D, st, 0.9, 1.4, 0.7, 0, 2.6, 0, 12); mmEll(D, st, 0.5, 0.55, 0.5, 0, 4.4, 0, 10); mmCyl(D, gold, 0.12, 0.12, 4.4, s * -0.9, 2.6, 0, 0, 0, 0, 6); sol.push({ x: s * 8.6, z: 15, r: 1.4 }); });
},
function (G, d, sol) {
var rock = mmMat(0x5A6A5A, { shine: 10 }), moss = mmMat(0x4A7A3A, { shine: 6 }), R = wRand(16);
for (var i = 0; i < 9; i++) {
var a = -1.9 + i * 0.47, x = Math.sin(a) * 16, z = -Math.cos(a) * 14;
mmRock(G, i % 2 ? rock : moss, 6, 14 + R() * 6, 6, x, 8, z, 601 + i, R() * 3);
sol.push({ x: x, z: z, r: 5.5 });
}
mmRock(G, rock, 18, 5, 12, 0, 22, -4, 690);
var wm = new THREE.MeshBasicMaterial({ color: 0xBFE8FF, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false });
var tex = document.createElement("canvas");
tex.width = 64;
tex.height = 256;
var cx = tex.getContext("2d");
for (var y = 0; y < 256; y++) {
for (var x = 0; x < 64; x += 4) {
var v = 180 + Math.floor(70 * Math.abs(Math.sin(x * 0.7 + y * 0.11)));
cx.fillStyle = "rgba(" + v + "," + (v + 10) + ",255," + (0.35 + 0.4 * Math.abs(Math.sin(x + y * 0.05))) + ")";
cx.fillRect(x, y, 4, 1);
}
}
var t = new THREE.CanvasTexture(tex);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(4, 1);
wm.map = t;
var sheet = mmMesh(new THREE.PlaneGeometry(22, 20), wm, 0, 10, 9, G);
sheet.userData.mmFlow = t;
for (var p = 0; p < 5; p++)
mmEll(G, mmMat(0x9ACBE0, { op: 0.6, shine: 90 }), 5, 0.3, 3, (p - 2) * 4.4, 0.1, 12, 12);
},
function (G, d, sol) {
var bas = mmMat(0x1E1A18, { shine: 50, spec: 0x6A5A4A }), glass = mmMat(0x2A1A2A, { shine: 140, spec: 0xC8A0FF }), R = wRand(17);
var hill = mmMesh(new THREE.SphereGeometry(22, mmSeg(24), mmSeg(12), MM_MOUTH[0], MM_MOUTH[1], 0, Math.PI / 2), mmMat(0x3A2A1A, { shine: 6, ds: 1 }), 0, -2, -2, G);
hill.scale.set(1.1, 0.75, 1.0);
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2;
if (Math.abs(Math.sin(a / 2)) < 0.22)
continue;
var x = Math.sin(a) * 23, z = Math.cos(a) * 21 - 2;
sol.push({ x: x, z: z, r: 4 });
mmCyl(G, i % 2 ? bas : glass, 1 + R(), 1.4 + R(), 4 + R() * 8, x + R() * 3, 2, z, (R() - 0.5) * 0.3, 0, (R() - 0.5) * 0.3, 6);
}
},
function (G, d, sol) {
var rk = mmMat(0x4A4440, { shine: 8 }), dk = mmMat(0x2A2624, { shine: 6 }), R = wRand(18);
var S = mmG(G, -8, 0, -8);
for (var i = 0; i < 7; i++) {
var t = i / 6;
mmRock(S, i % 2 ? rk : dk, 6 - t * 4, 5, 6 - t * 4, Math.sin(t * 2.4) * 8 * t, 3 + i * 6, t * t * 10, 801 + i);
}
sol.push({ x: -8, z: -8, r: 6 });
for (var j = 0; j < 10; j++) {
var a = j / 10 * Math.PI * 2;
if (Math.abs(Math.sin(a / 2)) < 0.2)
continue;
var x = Math.sin(a) * 20, z = Math.cos(a) * 20;
mmRock(G, rk, 4 + R() * 2, 3 + R() * 3, 4 + R() * 2, x, 1, z, 851 + j, R() * 3);
sol.push({ x: x, z: z, r: 3.6 });
}
},
function (G, d, sol) {
var snow = mmMat(0xC8D0D8, { shine: 10, spec: 0x8A949E }), rk = mmMat(0x6A7480, { shine: 10 }), ice = mmMat(0x9AB8D0, { shine: 60, op: 0.85 }), R = wRand(19);
var mound = mmMesh(new THREE.SphereGeometry(18, mmSeg(24), mmSeg(12), MM_MOUTH[0], MM_MOUTH[1], 0, Math.PI / 2), mmMat(0xB8C2CC, { shine: 6, ds: 1 }), 0, -1, -2, G);
mound.scale.set(1.2, 0.75, 1.1);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2;
if (Math.abs(Math.sin(a / 2)) < 0.2)
continue;
var x = Math.sin(a) * 21, z = Math.cos(a) * 20 - 2;
sol.push({ x: x, z: z, r: 4 });
mmRock(G, i % 3 ? snow : rk, 5, 3 + R() * 3, 5, x, 1, z, 901 + i, R() * 3);
}
for (var c = 0; c < 8; c++)
mmCone(G, ice, 0.4, 2 + R() * 2, (R() - 0.5) * 20, 9 - R(), (R() - 0.5) * 18, Math.PI, 0, 0, 6);
},
function (G, d, sol) {
var st = mmMat(0xA89C80, { shine: 6 }), R = wRand(20);
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2;
if (Math.abs(Math.sin(a / 2)) < 0.2)
continue;
var x = Math.sin(a) * 20, z = Math.cos(a) * 20, h = 3 + R() * 8;
mmCyl(G, st, 0.9, 1.0, h, x, h / 2, z, 0, 0, 0, 14);
mmSlab(G, st, 2.4, 0.6, 2.4, x, h + 0.3, z);
sol.push({ x: x, z: z, r: 1.2 });
}
mmSlab(G, st, 16, 0.5, 22, 0, 0.25, 0);
},
function (G, d, sol) {
var hedge = mmMat(0x3A6A2A, { shine: 6 }), hedge2 = mmMat(0x4A7A32, { shine: 6 }), N = 9, C = 8, R = wRand(21), seen = {}, walls = {};
function wk(a, b, c, e) { return a < c || a === c && b < e ? a + "," + b + "|" + c + "," + e : c + "," + e + "|" + a + "," + b; }
for (var i = 0; i < N; i++)
for (var j = 0; j < N; j++) {
if (i < N - 1)
walls[wk(i, j, i + 1, j)] = 1;
if (j < N - 1)
walls[wk(i, j, i, j + 1)] = 1;
}
var mid = function (i, j) { return i >= 3 && i <= 5 && j >= 3 && j <= 5; };
for (var a = 3; a <= 5; a++)
for (var b = 3; b <= 5; b++) {
if (a < 5)
delete walls[wk(a, b, a + 1, b)];
if (b < 5)
delete walls[wk(a, b, a, b + 1)];
}
var stack = [[0, 8]];
seen["0,8"] = 1;
while (stack.length) {
var c = stack[stack.length - 1], nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(function (q) { return [c[0] + q[0], c[1] + q[1]]; }).filter(function (q) { return q[0] >= 0 && q[1] >= 0 && q[0] < N && q[1] < N && !seen[q[0] + "," + q[1]] && !mid(q[0], q[1]); });
if (!nb.length) {
stack.pop();
continue;
}
var n = nb[Math.floor(R() * nb.length)];
delete walls[wk(c[0], c[1], n[0], n[1])];
seen[n[0] + "," + n[1]] = 1;
stack.push(n);
}
delete walls[wk(4, 5, 4, 6)];
delete walls["4,6|4,7"];
if (!seen["4,6"])
delete walls[wk(4, 6, 3, 6)];
var off = -N * C / 2, H = 4.2, T = 1.4, put = function (x, z, w, dd) { (R() < 0.5 ? mmSlab(G, hedge, w, H, dd, x, H / 2, z) : mmSlab(G, hedge2, w, H, dd, x, H / 2, z)); sol.push({ x: x, z: z, hw: w / 2, hd: dd / 2 }); };
Object.keys(walls).forEach(function (k) {
var p = k.split("|").map(function (s) { return s.split(",").map(Number); }), A = p[0], B = p[1];
if (A[0] !== B[0]) {
var x = off + (Math.max(A[0], B[0])) * C, z = off + A[1] * C + C / 2;
put(x, z, T, C + T);
}
else {
var z2 = off + (Math.max(A[1], B[1])) * C, x2 = off + A[0] * C + C / 2;
put(x2, z2, C + T, T);
}
});
for (var e = 0; e < N; e++) {
put(off + e * C + C / 2, off, C + T, T);
if (e !== 0)
put(off + e * C + C / 2, off + N * C, C + T, T);
put(off, off + e * C + C / 2, T, C + T);
put(off + N * C, off + e * C + C / 2, T, C + T);
}
var mt = mmMat(0x8A5A3A, { shine: 20 });
mmCyl(G, mt, 0.12, 0.12, 2.2, off + C / 2 - 3, 1.1, off + N * C + 2.4, 0, 0, 0, 6);
var sg = wSign(["The Old Maze", "nobody tends it now"], 3, 0.9, "#2A2018", "#E8D8A8");
sg.position.set(off + C / 2 - 3, 2.4, off + N * C + 2.4);
G.add(sg);
},
function (d) {
var g = new THREE.Group(), paper = mmMat(0xE8DCC0, { e: 0x6A5A3A, ei: 0.35, ds: 1 }), post = mmMat(0x5A4030, { shine: 10 }), glass = mmMat(0x8AD0B0, { shine: 120, op: 0.7, e: 0x2A6A50, ei: 0.4 });
if (d.at === "sea") {
mmCaps(g, glass, 0.12, 0.08, 0.45, 0, 0.15, 0, MM_H, 0.4, 0, 10);
mmCyl(g, post, 0.05, 0.05, 0.12, 0, 0.15, 0.36, MM_H, 0, 0, 6);
}
else if (d.at === "greenwold") {
mmEll(g, mmMat(0xC8282A, { shine: 30 }), 0.22, 0.22, 0.22, 0, 0.25, 0, 10);
mmTorus(g, mmMat(0xC8282A), 0.25, 0.03, 0, 0.25, 0, 0.6, 0, 0);
}
else {
mmCyl(g, post, 0.06, 0.07, 1.0, 0, 0.5, 0, 0, 0, 0, 8);
var pg = mmMesh(new THREE.PlaneGeometry(0.42, 0.56), paper, 0, 1.0, 0.07, g);
pg.rotation.x = -0.3;
}
mmGlow(g, 0xF0D8A0, 0.7, 0.1, 0, 0.7, 0);
g.userData.noCull = 1;
return g;
},
function (d) {
var seen = mmCluesSeen();
if (!seen[d.k]) {
seen[d.k] = Date.now();
try {
localStorage.setItem("mm.clues", JSON.stringify(seen));
}
catch (e) { }
mmTone(660, 0.18);
}
worldCard("<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>" + mmEsc(d.clue[0]) + "</div><div style='margin:8px 0;font-style:italic;line-height:1.6'>" + mmEsc(d.clue[1]) + "</div>" +
"<div style='opacity:.85;font-size:13px;margin-bottom:6px'>Whatever it is, it won't be standing in plain sight. When you reach the place, look closely at everything.</div>" +
"<div style='opacity:.75;font-size:12px'>Kept in your Backpack, under Mythic machines, so you can read it again.</div>", {});
},
function (k) {
var d = MM.list[k], r = MM.rows[k] || {}, me = mmMe(), mine = r.owner && r.owner === me, fns = {}, h = "";
h += worldFacts(d.name, d.part ? "A beast engine: in the Mythic Sovereign, the " + d.part : ({ walker: "A walking fortress", ship: "A ship that flies", tank: "A heavy tank" })[d.kind] || "", [["Pace", d.spd + " times a walk" + (d.fly ? ", and it flies" : "")], ["Arms", d.gun + ", " + mmPower(d) + " a shot (they fire only in Ironfray)"], ["Inside", d.rooms.join(", ")], ["Owner", r.owner ? (mine ? "You" : (r.owner_name || "another dreamer")) : "Nobody yet"]], [d.about]);
if (!r.owner) {
if (!MM.rowsOk)
h += "<div style='margin-top:8px;opacity:.85'>" + (mmSigned() ? "The way to claim it isn't open yet. Come back soon." : "Sign in to claim it.") + "</div>";
else if (mmKeeper())
h += "<div style='margin-top:8px;opacity:.85'>The Keeper leaves it for a dreamer to find.</div>";
else {
h += worldBtn("claim", "✨ Claim " + mmEsc(d.short), "There is only one in the whole universe. It will be yours, and never sold");
fns.claim = function () { worldCard(null); mmClaim(k); };
}
}
else if (mine) {
h += worldBtn("ride", "Climb in and take the controls", d.fly ? "Walk to drive · Space and C (Up and Down on a phone) to fly" : "Walk to drive it");
fns.ride = function () { worldCard(null); mmMount(k); };
}
if (mine) {
h += worldBtn("release", "Send it back into hiding", "Found one you like better? It goes back to where it was hidden, sealed, for the next explorer");
fns.release = function () { mmReleaseCard(k); };
}
h += worldBtn("inside", mine ? "Walk inside" : "Look inside", "Every room, walked through: " + mmEsc(d.rooms.slice(0, 3).join(", ")) + "…");
fns.inside = function () { worldCard(null); mmGoInside(k, false); };
if (mmKeeper()) {
h += "<div style='margin-top:10px;opacity:.7;font-size:12px'>The Keeper</div>";
h += worldBtn("khide", "Send it back into hiding", r.owner ? "It leaves its owner and waits to be found again" : "It is already waiting to be found");
fns.khide = function () { worldCard(null); mmKeeperReset(k); };
}
worldCard(h, fns);
},
function (k) {
if (MM.busy)
return;
var d = MM.list[k];
if (!mmSigned()) {
mmSay("Sign in to claim " + mmEsc(d.name) + ".");
return;
}
MM.busy = true;
mmRpc("mythic_claim", { p_key: k, p_place: MM.place }).then(function (o) {
MM.busy = false;
if (!o || !o.ok) {
mmSay(mmEsc((o && o.say) || "Not now."));
mmLoad(MM.place);
return;
}
var r = MM.rows[k] = MM.rows[k] || { k: k };
r.owner = mmMe();
r.here = true;
r.mine = true;
MM.mineAt = 0;
mmTone(523, 0.2);
setTimeout(function () { mmTone(659, 0.2); }, 180);
setTimeout(function () { mmTone(784, 0.35); }, 360);
mmSay("<b>" + mmEsc(d.name) + " is yours.</b> It's in your Backpack under Mythic machines; nobody can buy or sell it, and you can call it to wherever you stand.");
mmMount(k);
}).catch(function (e) { MM.busy = false; mmSay(mmMissing(e) ? "The way to claim it isn't open yet. Come back soon." : "Couldn't reach the city. Try again in a moment."); });
},
function (k, quiet) {
var I = MM.meshes[k];
if (!I || MM.ride)
return;
if ((MM.cool[k] || 0) > Date.now()) {
mmSay("Its shields are still cooling. " + Math.ceil((MM.cool[k] - Date.now()) / 1000) + " seconds.");
return;
}
var d = I.d, b = mmBase();
if (!b)
return;
var c = Math.cos(I.yaw), s = Math.sin(I.yaw), sx = I.B.seat[0], sz = I.B.seat[1];
camera.position.set(b.x + I.x + sx * c + sz * s, I.y + d.eye, b.z + I.z - sx * s + sz * c);
yaw = I.yaw;
pitch = 0;
MM.ride = { k: k, d: d, I: I, prev: { speed: rideSpeed, fly: canFly }, shot: 0, mz: 0, last: { x: I.x, z: I.z }, sentAt: MM.t, alt: 0, vz: 0 };
rideSpeed = d.spd;
canFly = false;
if (typeof flyY !== "undefined")
flyY = camera.position.y - 1.72;
flyVz = 0;
mmHideAround(I);
MM.shield = mmHp(d);
if (!quiet)
mmSay("<b>You take the controls of " + mmEsc(d.name) + ".</b> Walk to drive" + (d.fly ? "; " + (mmTouch() ? "<b>Up</b> and <b>Down</b>" : "<b>Space</b> and <b>C</b>") + " to fly" : "") +
"; " + (mmTouch() ? "<b>Fire</b>" : mmVR() ? "the trigger" : "<b>F</b>") + " fires in Ironfray; " + (mmTouch() ? "<b>Get out</b>" : mmVR() ? "the grip" : "<b>G</b>") + " climbs out.");
mmTone(220, 0.4);
if (mmSigned() && MM.rowsOk)
mmRpc("mythic_ride", { p_key: k, p_place: MM.place }).catch(function () { });
mmPub();
},
function (I) {
I.hid = [];
I.g.updateMatrixWorld(true);
var cp = camera.position, sp = new THREE.Sphere();
I.g.traverse(function (o) {
if (!o.isMesh && !o.isSprite)
return;
if (!o.geometry)
return;
if (!o.geometry.boundingSphere)
o.geometry.computeBoundingSphere();
sp.copy(o.geometry.boundingSphere).applyMatrix4(o.matrixWorld);
if (sp.containsPoint(cp) || (sp.radius < 3 && sp.distanceToPoint(cp) < 3.2)) {
o.visible = false;
I.hid.push(o);
}
});
},
function (force, why) {
var R = MM.ride;
if (!R)
return false;
var I = R.I, d = R.d;
if (!force && (R.alt || 0) > 1.2) {
mmSay("Land first: " + (mmTouch() ? "hold <b>Down</b>" : "hold <b>C</b>") + " until you touch the ground.");
return false;
}
if (MM.form && !force) {
mmSay("Split the Sovereign first.");
return false;
}
MM.ride = null;
mmShowAround(I);
rideSpeed = R.prev.speed || 1;
canFly = !!R.prev.fly;
if (typeof flyY !== "undefined") {
flyY = 0;
}
flyVz = 0;
var b = mmBase();
if (I.k === "sovereign") {
mmDrop(I);
}
else if (b) {
var gy = mmGround(I.x, I.z);
I.y = gy;
I.g.position.y = gy;
I.st.alt = 0;
var out = null;
for (var q = 0; q < 8 && !out; q++) {
var a = I.yaw + Math.PI / 2 + q * Math.PI / 4, ox = I.x - Math.cos(a) * (d.r + 2.2) * 1, oz = I.z + Math.sin(a) * (d.r + 2.2);
var y = mmGround(ox, oz);
if (y > -500 && !mmBlockL(ox, oz, y))
out = { x: ox, z: oz, y: y };
}
if (out) {
camera.position.set(b.x + out.x, out.y + 1.72, b.z + out.z);
}
else
camera.position.y = gy + 1.72;
if (typeof flyY !== "undefined")
flyY = camera.position.y - 1.72;
var r = MM.rows[I.k] = MM.rows[I.k] || { k: I.k };
r.x = I.x;
r.z = I.z;
r.y = gy;
r.yaw = I.yaw;
r.place = MM.place;
r.here = true;
r.hidden = false;
r.riding = false;
if (why === "beaten") {
MM.cool[I.k] = Date.now() + 60000;
}
if (mmSigned() && MM.rowsOk && MM.place)
mmRpc("mythic_park", { p_key: I.k, p_place: MM.place, p_x: +I.x.toFixed(2), p_y: +gy.toFixed(2), p_z: +I.z.toFixed(2), p_yaw: +I.yaw.toFixed(3) }).catch(function () { });
}
if (why !== "gone" && why !== "inside")
mmSay(why === "beaten" ? "<b>Its shields fail.</b> It shuts down to cool for a minute, and you climb out." : "You climb down. " + mmEsc(d.short) + " waits here for you.");
mmTone(180, 0.3);
mmHud();
mmPub();
return true;
},
function (dt) {
var R = MM.ride, I = R.I, d = R.d, B = I.B, b = mmBase();
if (!b)
return;
var cp = camera.position, rate = d.kind === "ship" ? 2.6 : d.kind === "tank" ? 0.9 : d.k === "sovereign" ? 0.8 : 1.5;
var want = yaw, dy = mmAng(want - I.yaw), step = Math.max(-rate * dt, Math.min(rate * dt, dy));
I.yaw = mmAng(I.yaw + step);
I.st.turn = dt > 0 ? step / dt : 0;
var c = Math.cos(I.yaw), s = Math.sin(I.yaw), sx = B.seat[0], sz = B.seat[1];
var cx = cp.x - b.x - (sx * c + sz * s), cz = cp.z - b.z - (-sx * s + sz * c), cy = cp.y - d.eye;
var mv = Math.hypot(cx - R.last.x, cz - R.last.z);
R.last.x = cx;
R.last.z = cz;
I.x = cx;
I.z = cz;
I.y = cy;
I.g.position.set(b.x + cx, cy, b.z + cz);
I.g.rotation.y = I.yaw;
I.st.alt = R.alt || 0;
if (d.fly) {
var up = keys["Space"] ? 1 : 0, dn = (keys["KeyC"] || keys["ControlLeft"]) ? 1 : 0;
R.vz += ((up - dn) * 14 - R.vz) * Math.min(1, dt * 4);
if (!up && !dn && Math.abs(R.vz) < 0.05)
R.vz = 0;
var a0 = R.alt;
R.alt = Math.max(0, Math.min(320, R.alt + R.vz * dt));
if (R.alt === 0 && R.vz < 0)
R.vz = 0;
if (R.alt < a0) {
cp.y -= a0 - R.alt;
if (typeof standFall !== "undefined")
standFall = 0;
}
if (typeof WLD !== "undefined") {
WLD.hop = 0;
WLD.hv = 0;
}
}
if (B.turret)
B.turret.rotation.y = mmAng(yaw - I.yaw);
if (d.fly && typeof BW !== "undefined" && WLD.on === "battle" && BW.crouch) {
keys["KeyC"] = true;
try {
bwCrouch(false);
}
catch (e) { }
}
try {
if (B.anim)
B.anim(dt, mv, I.st);
}
catch (e) { }
R.shot = Math.max(0, R.shot - dt);
if (MM.t - R.sentAt > 45 && mmSigned() && MM.rowsOk && I.k !== "sovereign") {
R.sentAt = MM.t;
mmRpc("mythic_ride", { p_key: I.k, p_place: MM.place, p_x: +cx.toFixed(1), p_z: +cz.toFixed(1) }).catch(function () { });
}
if (MM.firing)
mmFire();
},
function () {
var R = MM.ride;
if (!R || R.shot > 0)
return;
if (!mmArmed()) {
if (MM.t - (MM.warned || 0) > 4) {
MM.warned = MM.t;
mmSay("The guns are locked: they fire only in Ironfray, where fighting is allowed." + (typeof WLD !== "undefined" && WLD.on === "battle" ? " (Not on the Truce Ground.)" : ""));
}
return;
}
var d = R.d, I = R.I, mz = I.mz || [];
if (!mz.length)
return;
var m = mz[R.mz % mz.length];
R.mz++;
var from = new THREE.Vector3();
m.getWorldPosition(from);
var dir = bwAim();
try {
if (typeof bwAimAssist === "function")
dir = bwAimAssist(dir, from, 0.07, 200, null);
}
catch (e) { }
var heavy = d.shot === "shell" || d.shot === "star2";
var arm = { p: d.shot, spd: heavy ? 85 : d.shot === "laser" ? 140 : 110, splash: (heavy ? 5 : d.shot === "ion" || d.shot === "orb" ? 3 : 0) + 2, kind: "gun" };
try {
bwShoot({ from: from, dir: dir, arm: arm, dmg: mmPower(d), team: typeof bwMyTeam === "function" ? bwMyTeam() : "me", owner: "me" });
}
catch (e) { }
R.shot = (heavy ? 1.1 : d.kind === "ship" ? 0.28 : 0.45) * 0.7;
mmTone(heavy ? 110 : d.shot === "laser" ? 880 : 440, 0.08);
},
function () {
if (document.getElementById("mm-css"))
return;
var st = document.createElement("style");
st.id = "mm-css";
st.textContent =
"#mm-hud{position:fixed;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(170px + env(safe-area-inset-bottom,0px));z-index:44;width:min(280px,calc(100vw - 24px));box-sizing:border-box;" +
"background:rgba(10,12,22,.88);border:1px solid rgba(200,168,96,.7);border-radius:10px;padding:12px 14px;font:13px/1.35 var(--sans,system-ui);color:#F0E8D8;box-shadow:0 4px 18px rgba(0,0,0,.35)}" +
"#mm-hud .mm-name{font:600 15px var(--serif,Georgia);color:#FFE7B0;display:flex;align-items:center;gap:8px}" +
"#mm-hud .mm-chip{margin-left:auto;font:600 11px var(--sans,system-ui);padding:3px 8px;border-radius:10px;white-space:nowrap}" +
"#mm-hud .mm-chip.on{background:rgba(122,200,160,.18);color:#9EE0BE;border:1px solid rgba(122,200,160,.5)}" +
"#mm-hud .mm-chip.off{background:rgba(160,160,170,.12);color:#C8C4BC;border:1px solid rgba(160,160,170,.35)}" +
"#mm-hud .mm-gauges{display:grid;grid-template-columns:1fr auto;gap:6px 12px;align-items:center;margin:10px 0 4px}" +
"#mm-hud .mm-lab{font-size:11px;letter-spacing:.06em;text-transform:uppercase;opacity:.7}" +
"#mm-hud .mm-bar{height:9px;background:#2A2A30;border-radius:5px;overflow:hidden}" +
"#mm-hud .mm-bar>i{display:block;height:100%;background:#7AC8A0;border-radius:5px}" +
"#mm-hud .mm-num{font:600 15px var(--sans,system-ui);text-align:right;min-width:52px}" +
"#mm-hud .mm-sec{margin-top:10px;padding-top:10px;border-top:1px solid rgba(200,168,96,.25)}" +
"#mm-hud .mm-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}" +
"#mm-hud .mm-b,#mm-pad .mm-b{display:flex;align-items:center;justify-content:center;gap:6px;min-height:40px;padding:6px 10px;box-sizing:border-box;border:1px solid rgba(200,168,96,.65);border-radius:8px;" +
"background:rgba(200,168,96,.12);color:#F4E6C4;font:600 13px var(--sans,system-ui);cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:none;text-align:center}" +
"#mm-hud .mm-b.wide{grid-column:1 / -1}" +
"#mm-hud .mm-b.gold{background:rgba(200,168,96,.28);border-color:#E8C66A}" +
"#mm-hud .mm-keys{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:12px;opacity:.85}" +
"#mm-hud .mm-keys kbd{font:600 11px var(--sans,system-ui);padding:1px 6px;border:1px solid rgba(240,232,216,.4);border-radius:4px;background:rgba(255,255,255,.06);white-space:nowrap}" +
"#mm-hud.touch{width:min(240px,calc(100vw - 24px));padding:10px 12px}" +
"@media (max-width:620px){#mm-hud.touch{width:min(190px,calc(50vw - 20px))}#mm-hud.touch .mm-row{grid-template-columns:1fr}#mm-hud.touch .mm-name{flex-wrap:wrap}#mm-hud.touch .mm-chip{margin-left:0}}" +
"#mm-hud.touch .mm-b{min-height:48px;font-size:14px}" +
"#mm-pad{position:fixed;right:calc(16px + env(safe-area-inset-right,0px));bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:46;display:flex;align-items:flex-end;gap:12px}" +
"#mm-pad .mm-col{display:flex;flex-direction:column;gap:12px}" +
"#mm-pad .mm-b{width:64px;height:64px;border-radius:50%;padding:0;font-size:13px;flex-direction:column;gap:0;background:rgba(20,16,8,.86)}" +
"#mm-pad .mm-b.fire{width:88px;height:88px;font-size:15px;border-width:2px;border-color:#E8C66A;background:rgba(120,40,20,.78)}" +
"#mm-pad .mm-b.held{background:rgba(201,160,64,.9);color:#17120A}" +
"#mm-pad .mm-b span{font-size:20px;line-height:1}";
document.head.appendChild(st);
},
function (box) {
box.addEventListener("pointerdown", function (e) {
var b = e.target.closest && e.target.closest("[data-mm]");
if (!b)
return;
e.preventDefault();
e.stopPropagation();
var n = b.getAttribute("data-mm");
if (n === "fire" || n === "up" || n === "down")
b.classList.add("held");
if (n === "fire") {
if (MM.form && MM.form.crewOf)
mmCrewFire();
else {
MM.firing = true;
mmFire();
}
}
else if (n === "up")
keys["Space"] = true;
else if (n === "down")
keys["KeyC"] = true;
else if (n === "out")
mmOff(false);
else if (n === "in")
mmGoInside(MM.ride && MM.ride.k, true);
else if (n === "unite")
mmUniteCard();
else if (n === "split")
mmSplit(false);
else if (n === "crewout")
mmCrewLeave();
else if (n === "special")
mmSpecial();
else if (n === "card")
mmPilotCard();
}, true);
var up = function () { MM.firing = false; keys["Space"] = false; keys["KeyC"] = false; Array.prototype.forEach.call(box.querySelectorAll(".held"), function (b) { b.classList.remove("held"); }); };
box.addEventListener("pointerup", up, true);
box.addEventListener("pointercancel", up, true);
box.addEventListener("pointerleave", up, true);
},
function () {
var R = MM.ride;
if (!R)
return;
var d = R.d, fns = {}, h = "<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>" + mmEsc(d.name) + "</div>";
h += "<div style='opacity:.8;margin-bottom:6px'>" + (mmArmed() ? "Guns ready: " + (mmVR() ? "the trigger" : mmTouch() ? "the Fire button" : "F or a click") + " fires." : "The guns fire only in Ironfray.") + "</div>";
if (MM.form) {
h += worldBtn("split", "Split apart", "The six beasts unlock and stand on their own again");
fns.split = function () { worldCard(null); mmSplit(false); };
}
else {
h += worldBtn("out", "Climb out", "It stands here and waits for you");
fns.out = function () { worldCard(null); mmOff(false); };
if (d.k !== "sovereign") {
h += worldBtn("in", "Walk inside", "The rooms within");
fns.in = function () { worldCard(null); mmGoInside(d.k, true); };
}
if (d.k !== "sovereign") {
h += worldBtn("release", "Send it back into hiding", "It goes back to where it was hidden, for the next explorer");
fns.release = function () { mmReleaseCard(d.k); };
}
if (d.kind === "beast") {
h += worldBtn("unite", "⚜️ Unite into the Mythic Sovereign", "All six beasts lock together");
fns.unite = function () { mmUniteCard(); };
}
}
worldCard(h, fns);
},
function (k) {
var d = MM.list[k];
worldCard(worldFacts("Send " + d.short + " back?", "", [], ["It goes back to where it was first hidden, sealed away again, and the next explorer to find it can claim it. It stops being yours, and you'd have to find it again yourself to win it back."]) +
worldBtn("yes", "Yes, send it back", "It leaves you now") + worldBtn("no", "Keep it", ""), { yes: function () { worldCard(null); mmRelease(k); }, no: function () { worldCard(null); } });
},
function (k) {
var d = MM.list[k];
if (MM.busy)
return;
if (MM.form) {
mmSay("Split the Sovereign first.");
return;
}
if (MM.ride && MM.ride.k === k && !mmOff(false))
return;
MM.busy = true;
mmRpc("mythic_release", { p_key: k }).then(function (o) {
MM.busy = false;
if (!o || o.ok === false) {
mmSay(mmEsc((o && o.say) || "Not now."));
return;
}
delete MM.rows[k];
MM.mine = (MM.mine || []).filter(function (r) { return r.k !== k; });
MM.mineAt = -99;
MM.rowsAt = -99;
var op = mmOpened();
delete op[k];
try {
localStorage.setItem("mm.open", JSON.stringify(op));
}
catch (e) { }
if (MM.meshes[k]) {
mmDrop(MM.meshes[k]);
delete MM.meshes[k];
}
mmTone(330, 0.4);
mmSay("<b>" + mmEsc(d.name) + "</b> goes back to where it was hidden, sealed away again for the next explorer.");
if (typeof bkpPaint === "function")
try {
bkpPaint();
}
catch (e) { }
}).catch(function (e) { MM.busy = false; mmSay(mmMissing(e) ? "Sending it back isn't open yet. Come back soon." : "Couldn't reach the city. Try again in a moment."); });
},
function () {
var S = new THREE.Group(), SG = {}, iron = mmMat(0x34343A, { shine: 60, tex: "plate" }), gold = mmMat(0xE8C060, { shine: 110 });
Object.keys(MM_SOV_GROUPS).forEach(function (n) { var p = MM_SOV_GROUPS[n]; SG[n] = mmG(S, p[0], p[1], p[2]); });
var F = SG.torso;
mmEll(F, iron, 3.6, 1.6, 2.0, 0, 0.8, 0, 16);
mmCyl(F, iron, 1.1, 1.3, 8, 0, 6, 0, 0, 0, 0, 14);
mmCyl(SG.head, iron, 1.0, 1.2, 2.2, 0, -1.6, 0, 0, 0, 0, 14);
mmTorus(SG.head, gold, 1.25, 0.16, 0, -0.7, 0, MM_H, 0, 0);
[-1, 1].forEach(function (s) { mmEll(F, iron, 1.5, 1.5, 1.5, s * 3.4, 0.5, 0, 12); mmEll(F, iron, 1.6, 1.6, 1.6, s * 7.6, 13, 0, 12); });
return { S: S, SG: SG };
},
function () {
var F = mmSovFrame(), kits = {};
MM_BEASTS.forEach(function (k) {
var B = MM_BUILD[k](), K = B.K;
kits[k] = K;
K.parts.forEach(function (P) { var L = P.limb; if (!L || !F.SG[L.grp]) {
P.m.visible = false;
return;
} F.SG[L.grp].add(P.m); mmLimbM(L).decompose(P.m.position, P.m.quaternion, P.m.scale); });
});
return mmSovDriver(F, kits);
},
function (F, kits) {
var SG = F.SG, st0 = {};
return { g: F.S, F: F, kits: kits, h: 36, seat: [0, -1.4],
muzzles: [[3.6, 29.6, -1.2], [-3.6, 29.6, -1.2], [0, 32, -2.2]],
anim: function (dt, mv, st) {
st.ph = (st.ph || 0) + mv * 0.32;
st.t = (st.t || 0) + dt;
var go = Math.min(1, mv * 12);
SG.legR.rotation.x = Math.sin(st.ph) * 0.32 * go;
SG.legL.rotation.x = -Math.sin(st.ph) * 0.32 * go;
SG.armR.rotation.x = -Math.sin(st.ph) * 0.22 * go;
SG.armL.rotation.x = Math.sin(st.ph) * 0.22 * go;
SG.torso.position.y = MM_SOV_GROUPS.torso[1] + Math.abs(Math.sin(st.ph)) * 0.25 * go;
SG.wings.rotation.x = Math.sin(st.t * 0.6) * 0.04;
} };
},
function (at, from, back, done) {
var F = mmSovFrame(), S = F.S, parts = [], kits = {}, glow = null;
S.position.set(at.x, at.y, at.z);
S.rotation.y = at.yaw;
scene.add(S);
S.updateMatrixWorld(true);
MM_BEASTS.forEach(function (k, bi) {
var B = MM_BUILD[k](), K = B.K, f = from[k] || [MM_RING[k][0], MM_RING[k][1], 0];
kits[k] = K;
K.g.position.set(f[0], 0, f[1]);
K.g.rotation.y = f[2] || 0;
S.add(K.g);
K.g.updateMatrixWorld(true);
K.parts.forEach(function (P) {
var home = new THREE.Matrix4().multiplyMatrices(K.g.matrix, P.m.matrix), L = P.limb, tgt = null;
if (L && F.SG[L.grp]) {
tgt = new THREE.Matrix4().multiplyMatrices(F.SG[L.grp].matrix, mmLimbM(L));
}
if (!tgt) {
P.m.visible = false;
return;
}
var a = { p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3() }, b = { p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3() };
home.decompose(a.p, a.q, a.s);
tgt.decompose(b.p, b.q, b.s);
if (P.extra)
a.s.setScalar(0.001);
S.add(P.m);
parts.push({ P: P, grp: L.grp, a: back ? b : a, b: back ? a : b, delay: bi * 0.28 + (P.extra ? (back ? 0 : 2.6) : 0), extra: P.extra, k: k });
});
K.rest = [];
K.g.children.slice().forEach(function (c) { if (!K.parts.some(function (P) { return P.m === c; }))
K.rest.push(c); });
});
var frame = [];
Object.keys(F.SG).forEach(function (n) { F.SG[n].children.forEach(function (c) { if (c.isMesh) {
frame.push(c);
c.visible = !!back;
} }); });
if (typeof wGlow === "function") {
glow = wGlow(0xFFE0A0, 40, 0);
glow.position.set(0, 20, 0);
S.add(glow);
}
MM.morph = { S: S, F: F, parts: parts, kits: kits, t: 0, back: !!back, glow: glow, done: done, frame: frame };
mmTone(back ? 330 : 196, 0.6);
},
function (dt) {
var M = MM.morph;
if (!M)
return;
M.t += dt;
var T = MM_MORPH_T - 2;
M.parts.forEach(function (q) {
var u = mmSmooth((M.t - q.delay) / T), m = q.P.m;
m.position.lerpVectors(q.a.p, q.b.p, u);
m.position.y += Math.sin(u * Math.PI) * 5;
m.quaternion.copy(q.a.q).slerp(q.b.q, u);
m.scale.lerpVectors(q.a.s, q.b.s, q.extra ? Math.pow(u, 3) : u);
});
(M.frame || []).forEach(function (c) { c.visible = M.back ? M.t < MM_MORPH_T * 0.4 : M.t > MM_MORPH_T * 0.7; });
Object.keys(M.kits).forEach(function (k) { (M.kits[k].rest || []).forEach(function (c) { c.visible = M.back ? M.t > MM_MORPH_T * 0.6 : M.t < MM_MORPH_T * 0.35; }); });
if (M.glow) {
var g = M.t - (MM_MORPH_T - 1.6);
M.glow.material.opacity = g < 0 ? 0 : g < 1.5 ? 0.3 * (g / 1.5) : Math.max(0, 0.3 * (1 - (g - 1.5) / 2));
}
if (M.t >= MM_MORPH_T + 0.2) {
var S = M.S;
if (!M.back) {
M.parts.forEach(function (q) { var L = q.P.limb; M.F.SG[L.grp].add(q.P.m); mmLimbM(L).decompose(q.P.m.position, q.P.m.quaternion, q.P.m.scale); });
Object.keys(M.kits).forEach(function (k) { if (M.kits[k].g.parent)
M.kits[k].g.parent.remove(M.kits[k].g); });
}
if (M.glow && M.glow.parent) {
M.glow.parent.remove(M.glow);
M.glow = null;
}
MM.morph = null;
if (M.done)
M.done(M);
}
},
function () {
var R = MM.ride, fns = {}, h = "<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>⚜️ The Mythic Sovereign</div>";
h += "<div style='opacity:.85;margin:4px 0 8px'>The six beasts lock together into one giant: Blazehorn the body and head, Frostfang and Riddlecrown the legs, Rosehorn the right arm and sword, Nightwyrm the left arm and shield, Emberwing the wings, the crest and the cannons.</div>";
if (!R || R.d.kind !== "beast") {
h += "<div>Climb into one of the six beasts first.</div>";
worldCard(h, fns);
return;
}
if (mmMineAll()) {
h += worldBtn("solo", "Unite all six now", "The other five are yours: they come to you, and you lead");
fns.solo = function () { worldCard(null); mmUniteSolo(); };
}
else {
var have = (MM.mine || []).filter(function (r) { return MM_BEASTS.indexOf(r.k) >= 0; }).length;
h += "<div style='opacity:.85'>You hold " + have + " of the six. With six pilots, each on a different beast, standing together, everyone presses Unite. Blazehorn's pilot leads; the rest ride along at their stations.</div>";
h += worldBtn("vote", MM.vote ? "Waiting for the others… (" + (MM.uniteN || 1) + " of 6 ready)" : "I'm ready to unite", "Everyone must agree");
fns.vote = function () { worldCard(null); mmUniteVote(true); };
if (MM.vote) {
h += worldBtn("unvote", "Never mind", null);
fns.unvote = function () { worldCard(null); mmUniteVote(false); };
}
}
worldCard(h, fns);
},
function () {
var R = MM.ride;
if (!R || MM.morph || MM.form)
return;
if (R.I.st.alt > 1.2) {
mmSay("Land first.");
return;
}
var I = R.I, c = Math.cos(I.yaw), s = Math.sin(I.yaw), from = {};
var lx = I.x, lz = I.z;
var cx = lx - (MM_RING[I.k][0] * c + MM_RING[I.k][1] * s), cz = lz - (-MM_RING[I.k][0] * s + MM_RING[I.k][1] * c);
MM_BEASTS.forEach(function (k) { from[k] = [MM_RING[k][0], MM_RING[k][1], 0]; });
mmFormBegin({ x: cx, y: mmGround(cx, cz), z: cz, yaw: I.yaw }, from, { solo: true, lead: true });
MM_BEASTS.forEach(function (k) { if (k !== I.k && mmSigned() && MM.rowsOk)
mmRpc("mythic_ride", { p_key: k, p_place: MM.place, p_x: +cx.toFixed(1), p_z: +cz.toFixed(1) }).catch(function () { }); });
},
function (at, from, o) {
var R = MM.ride, b = mmBase();
if (!R || !b)
return;
var keepK = R.k;
mmShowAround(R.I);
mmDrop(R.I);
delete MM.meshes[keepK];
MM.ride = null;
canFly = true;
if (typeof flyY !== "undefined")
flyY = camera.position.y - 1.72;
MM.form = { lead: !!o.lead, solo: !!o.solo, k: keepK, at: at, crew: o.crew || [], cam0: camera.position.y, morphing: true };
var wAt = { x: b.x + at.x, y: at.y, z: b.z + at.z, yaw: at.yaw };
mmMorphStart(wAt, from, false, function (M) {
var B = mmSovDriver(M.F, M.kits), I = { k: "sovereign", d: MM_SOV, B: B, g: M.S, x: at.x, y: at.y, z: at.z, yaw: at.yaw, st: { alt: 0 }, mv: 0 };
mmMuzzles(I);
MM.meshes.sovereign = I;
MM.form.morphing = false;
var c = Math.cos(at.yaw), s = Math.sin(at.yaw), sx = B.seat[0], sz = B.seat[1];
camera.position.set(b.x + at.x + sx * c + sz * s, at.y + MM_SOV.eye, b.z + at.z - sx * s + sz * c);
yaw = at.yaw;
pitch = 0;
MM.ride = { k: "sovereign", d: MM_SOV, I: I, prev: MM.form.prev || { speed: 1, fly: false }, shot: 0, mz: 0, last: { x: at.x, z: at.z }, sentAt: MM.t };
rideSpeed = MM_SOV.spd;
canFly = false;
mmHideAround(I);
MM.shield = mmHp(MM_SOV);
mmSay("<b>The Mythic Sovereign stands.</b> Walk to stride; the guns and the great sword fire in Ironfray. <b>Split apart</b> when you're done.");
mmPub();
});
MM.form.prev = R.prev;
},
function (dt) {
mmMorphTick(dt);
var F = MM.form;
if (!F)
return;
if (F.crewOf) {
mmCrewTick(dt);
return;
}
if (F.morphing) {
var u = mmSmooth((MM.morph ? MM.morph.t : MM_MORPH_T) / MM_MORPH_T), b = mmBase();
if (!b)
return;
camera.position.y = F.cam0 + (F.at.y + MM_SOV.eye - F.cam0) * u;
var dx = b.x + F.at.x - camera.position.x, dz = b.z + F.at.z - camera.position.z;
camera.position.x += dx * Math.min(1, dt * 0.6) * u;
camera.position.z += dz * Math.min(1, dt * 0.6) * u;
if (typeof flyY !== "undefined")
flyY = camera.position.y - 1.72;
}
if (F.lead && !F.solo && !F.morphing && MM.t - (F.chk || 0) > 4) {
F.chk = MM.t;
mmUniteCheck();
}
},
function (force) {
var F = MM.form;
if (!F)
return;
if (F.crewOf) {
mmCrewLeave();
return;
}
if (F.morphing && !force)
return;
var R = MM.ride, b = mmBase(), I = R && R.I;
F.prev = (R && R.prev) || F.prev;
var at = I ? { x: I.x, y: mmGround(I.x, I.z), z: I.z, yaw: I.yaw } : F.at;
if (R) {
mmShowAround(I);
MM.ride = null;
if (I.g.parent)
I.g.parent.remove(I.g);
delete MM.meshes.sovereign;
}
rideSpeed = 1;
canFly = true;
if (typeof flyY !== "undefined")
flyY = camera.position.y - 1.72;
flyVz = 0;
var from = {};
MM_BEASTS.forEach(function (k) { from[k] = [MM_RING[k][0], MM_RING[k][1], 0]; });
MM.form = null;
if (!b)
return;
mmMorphStart({ x: b.x + at.x, y: at.y, z: b.z + at.z, yaw: at.yaw }, from, true, function (M) {
if (M.S.parent)
M.S.parent.remove(M.S);
var c = Math.cos(at.yaw), s = Math.sin(at.yaw);
MM_BEASTS.forEach(function (k) {
var mine = F.solo || k === F.k;
if (!mine)
return;
var lx = at.x + MM_RING[k][0] * c + MM_RING[k][1] * s, lz = at.z - MM_RING[k][0] * s + MM_RING[k][1] * c, gy = mmGround(lx, lz);
var r = MM.rows[k] = MM.rows[k] || { k: k };
r.k = k;
r.owner = mmMe();
r.here = true;
r.riding = false;
r.hidden = false;
r.place = MM.place;
r.x = lx;
r.z = lz;
r.y = gy;
r.yaw = at.yaw;
if (mmSigned() && MM.rowsOk && MM.place)
mmRpc("mythic_park", { p_key: k, p_place: MM.place, p_x: +lx.toFixed(2), p_y: +gy.toFixed(2), p_z: +lz.toFixed(2), p_yaw: +at.yaw.toFixed(3) }).catch(function () { });
});
setTimeout(function () { canFly = false; if (MM.meshes[F.k])
mmMount(F.k, true); if (MM.ride)
MM.ride.prev = F.prev || { speed: 1, fly: false };
else {
canFly = !!(F.prev && F.prev.fly);
camera.position.y = mmGround(mmL().x, mmL().z) + 1.72;
} }, 60);
});
if (!F.solo && MM.rowsOk)
mmRpc("mythic_unite", { p_key: F.k, p_place: MM.place, p_x: 0, p_z: 0, p_on: false }).catch(function () { });
MM.vote = false;
MM.uniteN = 0;
mmSay("The Sovereign comes apart; the six beasts stand on their own again.");
mmPub();
},
function (on) {
var R = MM.ride;
if (on && (!R || R.d.kind !== "beast"))
return;
if (!mmSigned() || !MM.rowsOk) {
mmSay("Uniting with other pilots needs the city: sign in, or come back soon.");
return;
}
MM.vote = !!on;
var k = R ? R.k : null;
mmRpc("mythic_unite", { p_key: k || "", p_place: MM.place || "", p_x: R ? +R.I.x.toFixed(1) : 0, p_z: R ? +R.I.z.toFixed(1) : 0, p_on: !!on }).then(function (o) { mmUniteSeen(o); }).catch(function (e) { MM.vote = false; mmSay(mmMissing(e) ? "Uniting isn't open yet. Come back soon." : "Couldn't reach the city."); });
if (on)
mmSay("<b>Ready to unite.</b> When all six beasts here are ready, the Sovereign forms. Blazehorn's pilot leads.");
},
function (o) {
if (!o)
return;
MM.uniteN = o.n || 0;
var F = MM.form;
if (F && F.lead && !F.solo) {
if (!o.form)
mmSplit(true);
return;
}
if (!o.form || F)
return;
var me = mmMe();
if (o.leader === me && MM.ride && MM.ride.k === "blazehorn") {
var I = MM.ride.I, c = Math.cos(I.yaw), s = Math.sin(I.yaw), from = {};
(o.crew || []).forEach(function (q) { var dx = (+q.x || 0) - I.x, dz = (+q.z || 0) - I.z; from[q.k] = [dx * c - dz * s, dx * s + dz * c, 0]; });
from.blazehorn = [0, 0, 0];
mmFormBegin({ x: I.x, y: mmGround(I.x, I.z), z: I.z, yaw: I.yaw }, from, { lead: true, crew: o.crew || [] });
}
else if (MM.ride && o.leader) {
mmCrewJoin(o.leader, o.leader_name, MM.ride.k);
}
},
function (leader, name, k) {
var R = MM.ride;
if (!R)
return;
mmShowAround(R.I);
mmDrop(R.I);
delete MM.meshes[k];
MM.ride = null;
rideSpeed = 1;
canFly = true;
if (typeof flyY !== "undefined")
flyY = camera.position.y - 1.72;
MM.form = { crewOf: leader, k: k, at: { x: 0, y: 0, z: 0, yaw: 0 }, prev: R.prev };
mmSay("<b>The Sovereign forms</b>, led by " + mmEsc(name || "Blazehorn's pilot") + ". You ride at " + mmEsc(MM.list[k].short) + "'s station" + (mmArmed() ? "; fire with " + (mmTouch() ? "the Fire button" : "F") : "") + ". <b>Split off</b> to leave.");
mmPub();
},
function (dt) {
var F = MM.form;
if (!F || !F.crewOf)
return;
var p = (typeof presenceOthers !== "undefined") ? presenceOthers[F.crewOf] : null;
if (!p || !p.group) {
if (MM.t - (F.lost || (F.lost = MM.t)) > 12)
mmCrewLeave();
return;
}
F.lost = 0;
var g = p.group, hd = MM_STATION.blazehorn, se = (typeof MM_SEAT !== "undefined" && MM_SEAT[F.k]) || [0, 0, 0], st = [hd[0] + se[0], hd[1] + se[1], hd[2] + se[2]], c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y);
var m = g.userData.mmMach, ox = m ? m.position.x : 0, oz = m ? m.position.z : 0, oy = m ? m.position.y : 0;
var lx = ox + st[0], lz = oz + st[2];
camera.position.set(g.position.x + lx * c + lz * s, g.position.y + oy + st[1], g.position.z - lx * s + lz * c);
if (typeof flyY !== "undefined")
flyY = camera.position.y - 1.72;
if (typeof mmBridgeCrew === "function")
mmBridgeCrew(dt, g);
if (MM.t - (F.chk || 0) > 4) {
F.chk = MM.t;
mmRpc("mythic_unite_state", { p_place: MM.place || "", p_key: F.k }).then(function (o) { if (MM.form === F && o && !o.form)
mmCrewLeave(); }).catch(function () { });
}
},
function () {
var F = MM.form;
if (!F || !F.crewOf)
return;
MM.form = null;
MM.vote = false;
MM.act = null;
if (typeof mmBridgeCrewDrop === "function")
mmBridgeCrewDrop();
canFly = !!(F.prev && F.prev.fly);
rideSpeed = (F.prev && F.prev.speed) || 1;
var L = mmL(), gy = mmGround(L.x, L.z), k = F.k;
camera.position.y = gy + 1.72;
if (typeof flyY !== "undefined")
flyY = gy;
var lx = L.x + MM.list[k].r + 3, lz = L.z;
var r = MM.rows[k] = MM.rows[k] || { k: k };
r.owner = mmMe();
r.here = true;
r.riding = false;
r.hidden = false;
r.place = MM.place;
r.x = lx;
r.z = lz;
r.y = mmGround(lx, lz);
r.yaw = yaw;
if (MM.rowsOk && MM.place) {
mmRpc("mythic_unite", { p_key: k, p_place: MM.place, p_x: 0, p_z: 0, p_on: false }).catch(function () { });
mmRpc("mythic_park", { p_key: k, p_place: MM.place, p_x: +lx.toFixed(2), p_y: +r.y.toFixed(2), p_z: +lz.toFixed(2), p_yaw: +yaw.toFixed(3) }).catch(function () { });
}
mmSay("You split off. " + mmEsc(MM.list[k].short) + " stands beside you.");
mmPub();
},
function () {
var F = MM.form;
if (!F || !F.crewOf || !mmArmed())
return;
if (MM.t - (F.shotAt || 0) < 0.6)
return;
F.shotAt = MM.t;
var d = MM.list[F.k], dir = bwAim(), from = camera.position.clone().addScaledVector(dir, 4);
try {
bwShoot({ from: from, dir: dir, arm: { p: d.shot, spd: 110, splash: 4, kind: "gun" }, dmg: mmPower(d), team: typeof bwMyTeam === "function" ? bwMyTeam() : "me", owner: "me" });
}
catch (e) { }
},
function (k, fromSeat) {
if (!k)
return;
var d = MM.list[k];
if (!d)
return;
var I = MM.meshes[k];
if (MM.form) {
mmSay("Split the Sovereign first.");
return;
}
if (MM.ride) {
if (MM.ride.I.st.alt > 1.2) {
mmSay("Land first.");
return;
}
mmOff(true, "inside");
I = MM.meshes[k];
}
var b = mmBase();
if (!b)
return;
MMI.ret = { place: MM.place, w: (typeof WLD !== "undefined" && WLD.on) || null, sub: (typeof WLD !== "undefined" && WLD.on === "surface" && typeof SF !== "undefined") ? SF.k : null,
k: k, x: I ? I.x : mmL().x, z: I ? I.z : mmL().z, yaw: I ? I.yaw : yaw, r: d.r, mine: !!(MM.rows[k] && MM.rows[k].owner === mmMe()) };
MMI.k = k;
if (WORLDS.mmin && WORLDS.mmin.g) {
mmInDrop();
}
worldGo("mmin", { keepFrom: !!(typeof WLD !== "undefined" && WLD.on) });
},
function (toSeat) {
var R = MMI.ret;
worldPrompt(null);
if (!R) {
worldHome();
return;
}
if (R.w && WORLDS[R.w])
worldGo(R.w, { keepFrom: true, k: R.sub });
else
worldHome();
var k = R.k, go = function () {
var b = mmBase();
if (!b)
return;
var a = R.yaw + Math.PI / 2, ox = R.x - Math.cos(a) * (R.r + 2.4), oz = R.z + Math.sin(a) * (R.r + 2.4), y = mmGround(ox, oz);
camera.position.set(b.x + ox, y + 1.72, b.z + oz);
yaw = R.yaw;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
if (toSeat) {
var tries = 0, t = setInterval(function () { tries++; if (MM.meshes[k]) {
clearInterval(t);
mmMount(k);
}
else if (tries > 40)
clearInterval(t); }, 100);
}
};
setTimeout(go, 30);
setTimeout(function () { mmInDrop(); }, 400);
},
function (d) {
var rooms = d.rooms.slice(), n = rooms.length, D = 8.4, RW = 9, CW = 3.8;
var side = rooms.slice(1), pairs = Math.ceil(side.length / 2), L = Math.max(2, pairs) * D;
var out = { D: D, RW: RW, CW: CW, L: L, W: CW + RW * 2, rooms: [] };
out.rooms.push({ name: rooms[0], x0: -out.W / 2, x1: out.W / 2, z0: -L / 2 - 10, z1: -L / 2, door: "s", pilot: true });
side.forEach(function (nm, i) {
var left = i % 2 === 0, j = Math.floor(i / 2);
out.rooms.push({ name: nm, x0: left ? -out.W / 2 : CW / 2, x1: left ? -CW / 2 : out.W / 2, z0: -L / 2 + j * D, z1: -L / 2 + (j + 1) * D, door: left ? "e" : "w" });
});
out.z0 = -L / 2 - 10;
out.z1 = L / 2 + 3;
return out;
},
function (col, tx, o) {
o = o || {};
var key = "in|" + col + "|" + tx + "|" + (o.e || 0);
if (MM_MATS[key])
return MM_MATS[key];
var m = mmLite() ? new THREE.MeshLambertMaterial({ color: col }) : new THREE.MeshPhongMaterial({ color: col, shininess: o.shine || 20 });
if (tx && typeof texOf === "function") {
try {
var t = texOf(tx);
if (t) {
m.map = t;
}
}
catch (e) { }
}
if (o.e) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
MM_MATS[key] = m;
return m;
},
function (G) {
var k = MMI.k, d = MM.list[k];
if (!d)
return;
var S = mmInStyle(d), pl = mmInPlan(d), H = 3.4, lite = mmLite();
MMI.solids = [];
MMI.spots = [];
MMI.W = pl.W;
MMI.plan = pl;
var wall = mmInMat(S.wall, S.wt), floor = mmInMat(S.floor, S.ft), trim = mmInMat(S.trim, null, { shine: 80 }), ceil = mmInMat(new THREE.Color(S.wall).multiplyScalar(0.8).getHex(), null);
var lamp = mmInMat(0xFFFFFF, null, { e: S.glow, ei: 0.9 });
var sol = function (x, z, hw, hd) { MMI.solids.push({ x: x, z: z, hw: hw, hd: hd }); };
var wallX = function (x, z0, z1, gap) {
var segs = gap == null ? [[z0, z1]] : [[z0, gap - 1.1], [gap + 1.1, z1]];
segs.forEach(function (q) { var len = q[1] - q[0]; if (len <= 0.05)
return; mmBox(G, 0.25, H, len, wall, x, H / 2, (q[0] + q[1]) / 2); sol(x, (q[0] + q[1]) / 2, 0.15, len / 2); });
if (gap != null) {
mmBox(G, 0.25, H - 2.4, 2.2, wall, x, 2.4 + (H - 2.4) / 2, gap);
mmBox(G, 0.3, 0.12, 2.4, trim, x, 2.42, gap);
}
};
var wallZ = function (z, x0, x1, gap) {
var segs = gap == null ? [[x0, x1]] : [[x0, gap - 1.1], [gap + 1.1, x1]];
segs.forEach(function (q) { var len = q[1] - q[0]; if (len <= 0.05)
return; mmBox(G, len, H, 0.25, wall, (q[0] + q[1]) / 2, H / 2, z); sol((q[0] + q[1]) / 2, z, len / 2, 0.15); });
if (gap != null) {
mmBox(G, 2.2, H - 2.4, 0.25, wall, gap, 2.4 + (H - 2.4) / 2, z);
mmBox(G, 2.4, 0.12, 0.3, trim, gap, 2.42, z);
}
};
var Lz = pl.z1 - pl.z0, cz = (pl.z0 + pl.z1) / 2;
mmBox(G, pl.W, 0.2, Lz, floor, 0, -0.1, cz);
mmBox(G, pl.W, 0.2, Lz, ceil, 0, H + 0.1, cz);
wallX(-pl.W / 2, pl.z0, pl.z1, null);
wallX(pl.W / 2, pl.z0, pl.z1, null);
wallZ(pl.z1, -pl.W / 2, pl.W / 2, null);
mmBox(G, 1.6, 0.03, pl.z1 + pl.L / 2, mmInMat(new THREE.Color(S.trim).multiplyScalar(0.55).getHex(), null), 0, 0.02, (pl.z1 - pl.L / 2) / 2);
for (var lz = pl.z0 + 3; lz < pl.z1; lz += 4) {
mmBox(G, 1.2, 0.06, 0.5, lamp, 0, H - 0.03, lz);
}
pl.rooms.forEach(function (r, i) {
var cx = (r.x0 + r.x1) / 2, czr = (r.z0 + r.z1) / 2, w = r.x1 - r.x0, dd = r.z1 - r.z0;
if (r.door === "e")
wallX(r.x1, r.z0, r.z1, czr);
else if (r.door === "w")
wallX(r.x0, r.z0, r.z1, czr);
else
wallZ(r.z1, r.x0, r.x1, 0);
if (!r.pilot)
wallZ(r.z1, r.x0, r.x1, null);
var sg = wSign([r.name], 2.6, 0.55, "#1A1814", "#F0E2B8");
if (r.door === "e") {
sg.position.set(r.x1 + 0.16, 2.95, czr);
sg.rotation.y = Math.PI / 2;
}
else if (r.door === "w") {
sg.position.set(r.x0 - 0.16, 2.95, czr);
sg.rotation.y = -Math.PI / 2;
}
else {
sg.position.set(0, 2.95, r.z1 + 0.16);
}
G.add(sg);
mmBox(G, 1.6, 0.06, 1.6, lamp, cx, H - 0.03, czr);
if (!lite)
mmGlow(G, S.glow, 4, 0.12, cx, H - 0.4, czr);
try {
mmInFurnish(G, d, r, S, cx, czr, w, dd, H);
}
catch (e) {
if (window.console)
console.warn("[mm] room", r.name, e);
}
});
var hz = pl.z1 - 0.3;
mmBox(G, 1.8, 2.4, 0.15, mmInMat(0x3A3A3A, "metal"), 0, 1.2, hz);
mmTorus(G, trim, 0.5, 0.06, 0.5, 1.25, hz - 0.1, 0, 0, 0);
var hs = wSign(["The hatch", "climb out"], 2.2, 0.6, "#1A1814", "#F0E2B8");
hs.position.set(0, 2.85, hz - 0.12);
hs.rotation.y = Math.PI;
G.add(hs);
MMI.spots.push({ x: 0, z: hz - 1.4, r: 2.2, label: "🚪 <b>The hatch</b> · <b>press E</b> to climb out", fn: function () { mmInLeave(false); } });
},
function (G, d, r, S, cx, cz, w, dd, H) {
var n = r.name.toLowerCase(), dark = mmInMat(0x2A2A2E, "metal"), trim = mmInMat(S.trim, null, { shine: 80 }), screen = mmInMat(0x0A1A24, null, { e: S.glow, ei: 0.45 }), glass = mmMat(0x9AC8E8, { op: 0.35, shine: 120 });
var inX = function (f) { return r.door === "e" ? r.x0 + f : r.door === "w" ? r.x1 - f : cx; };
var face = r.door === "e" ? Math.PI / 2 : r.door === "w" ? -Math.PI / 2 : 0;
if (r.pilot) {
var cv = document.createElement("canvas");
cv.width = 8;
cv.height = 128;
var x = cv.getContext("2d"), gr = x.createLinearGradient(0, 0, 0, 128);
gr.addColorStop(0, S.view[0]);
gr.addColorStop(1, S.view[1]);
x.fillStyle = gr;
x.fillRect(0, 0, 8, 128);
var view = new THREE.Mesh(new THREE.PlaneGeometry(w - 2, 2.2), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv) }));
view.position.set(0, 1.9, r.z0 + 0.2);
G.add(view);
mmBox(G, w - 2, 0.1, 0.3, trim, 0, 0.75, r.z0 + 0.2);
mmBox(G, w - 2, 0.1, 0.3, trim, 0, 3.05, r.z0 + 0.2);
for (var p = -2; p <= 2; p++) {
var a = p * 0.32;
mmBox(G, 1.8, 0.9, 0.7, dark, Math.sin(a) * 3.4, 0.45, r.z0 + 2.4 - Math.cos(a) * 0.2 + Math.abs(p) * 0.5, -a);
var sc = mmBox(G, 1.5, 0.7, 0.06, screen, Math.sin(a) * 3.4, 1.25, r.z0 + 2.1 + Math.abs(p) * 0.5, -a);
sc.rotation.x = -0.5;
}
var C = mmG(G, 0, 0, r.z0 + 4.6);
mmCyl(C, dark, 0.25, 0.35, 0.5, 0, 0.25, 0, 0, 0, 0, 10);
mmSlab(C, trim, 1.1, 0.25, 1.0, 0, 0.62, 0);
mmSlab(C, trim, 1.1, 1.3, 0.22, 0, 1.3, 0.45);
mmSlab(C, dark, 0.22, 0.5, 0.9, -0.65, 0.95, 0);
mmSlab(C, dark, 0.22, 0.5, 0.9, 0.65, 0.95, 0);
MMI.solids.push({ x: 0, z: r.z0 + 4.6, r: 0.6 });
[-1, 1].forEach(function (s) { mmFurn(G, "monitor", s * (w / 2 - 1.2), 0, r.z0 + 5.5, s > 0 ? -Math.PI / 2 : Math.PI / 2) || mmBox(G, 0.8, 1.2, 1.4, dark, s * (w / 2 - 0.8), 0.6, r.z0 + 5.5); });
mmFurn(G, "maptable", 0, 0, r.z1 - 2.2, 0, 0.8);
MMI.solids.push({ x: 0, z: r.z1 - 2.2, r: 1.0 });
MMI.spots.push({ x: 0, z: r.z0 + 4.6, r: 1.9, label: MMI.ret && MMI.ret.mine ? "🎛️ <b>The pilot's seat</b> · <b>press E</b> to take the controls" : "🎛️ <b>The pilot's seat</b> · only its owner can take the controls",
fn: function () { if (MMI.ret && MMI.ret.mine)
mmInLeave(true);
else
mmSay("Only its owner can take the controls."); } });
return;
}
var put = function (name, fx, fz, ry, s, rad) { var x = r.door ? inX(fx) : cx + fx, z = r.z0 + fz; var g = mmFurn(G, name, x, 0, z, (ry || 0) + face, s); if (g && rad)
MMI.solids.push({ x: x, z: z, r: rad }); return g; };
if (/bunk|quarters/.test(n)) {
for (var b = 0; b < 3; b++) {
var z = r.z0 + 1.6 + b * 2.6;
[0, 1.25].forEach(function (y) { var g = mmFurn(G, "bed", inX(1.2), y, z, face + Math.PI / 2, 0.9); });
mmBox(G, 0.08, 2.4, 2.2, dark, inX(2.3), 1.2, z);
MMI.solids.push({ x: inX(1.2), z: z, hw: 1.1, hd: 1.1 });
}
put("wardrobe", w - 2.6, dd - 0.8, Math.PI, 1, 0.7);
put("lamp", w - 2.4, 1.0, 0, 1);
}
else if (/cabin/.test(n)) {
put("bed", 1.4, 2.2, Math.PI / 2, 1, 1.2);
put("desk", w - 3, 1.2, 0, 1, 0.8);
put("chair", w - 3, 2.2, Math.PI, 1);
put("bookshelf", 1.0, dd - 1.0, Math.PI, 1, 0.6);
put("lamp", w - 3.4, 1.0, 0, 1);
put("rug", 3.4, dd / 2, 0, 1);
}
else if (/lounge|galley/.test(n)) {
put("table", w / 2 - 0.6, dd / 2, 0, 1, 1.0);
[-1, 1].forEach(function (s) { put("chair", w / 2 - 0.6 + s * 1.2, dd / 2, s * Math.PI / 2, 1); });
put("sofa", 1.2, dd / 2, Math.PI / 2, 1, 1.0);
put("counter", w - 2.5, dd - 1.0, Math.PI, 1, 0.8);
put("plant", w - 2.2, 0.8, 0, 1);
}
else if (/boiler|engine|reactor|heart|core|furnace|ember/.test(n)) {
put("boiler", 2.0, dd / 2, 0, 1, 1.4) || put("machine", 2.0, dd / 2, 0, 1, 1.4);
put("flywheel", w - 3, 2.0, 0, 1, 1.0);
put("piston", w - 3, dd - 2.0, 0, 1, 0.8);
put("pipes", 1.0, 1.0, 0, 1);
put("pipes", 1.0, dd - 1.0, 0, 1);
var cc = r.door ? inX(w / 2 - 0.4) : cx, cm = mmCyl(G, mmInMat(0xFFE8C0, null, { e: S.glow, ei: 0.8 }), 0.7, 0.7, 2.4, cc, 1.5, cz, 0, 0, 0, 16);
mmTorus(G, trim, 1.3, 0.06, cc, 1.0, cz, Math.PI / 2, 0, 0);
mmGlow(G, S.glow, 4.5, 0.16, cc, 1.6, cz);
MMI.solids.push({ x: cc, z: cz, r: 1.4 });
}
else if (/gun|turret|lance|shell|artillery/.test(n)) {
for (var c = 0; c < 2; c++) {
var gz = r.z0 + 2.2 + c * 4;
var gx = inX(1.6);
mmCyl(G, dark, 0.35, 0.42, 3.6, gx, 1.4, gz, 0, 0, Math.PI / 2, 12);
mmSlab(G, trim, 1.6, 1.0, 1.4, inX(3.4), 0.9, gz);
mmFurn(G, "seat", inX(4.6), 0, gz, face - Math.PI / 2);
MMI.solids.push({ x: inX(2.6), z: gz, hw: 1.8, hd: 0.8 });
}
put("weaponrack", w - 1.8, dd - 0.8, Math.PI, 1, 0.6);
put("crates", w - 2.2, 1.0, 0, 1, 0.8);
}
else if (/hold/.test(n)) {
for (var q = 0; q < 6; q++) {
put(q % 3 ? "crates" : "barrel", 1.2 + (q % 3) * 1.6, 1.2 + Math.floor(q / 3) * 2.2, q * 0.4, 1, 0.7);
}
if (/secret/.test(n)) {
var hx = r.door ? inX(w - 3) : cx, hz2 = r.z0 + dd - 2;
mmBox(G, 1.4, 0.04, 1.4, dark, hx, 0.03, hz2);
mmTorus(G, trim, 0.3, 0.04, hx, 0.07, hz2, Math.PI / 2, 0, 0);
}
}
else if (/crawl|gear|spar|avionic|spine/.test(n)) {
put("servertower", 1.0, 1.4, 0, 1, 0.6);
put("servertower", 1.0, 3.0, 0, 1, 0.6);
put("pipes", w - 2, dd / 2, 0, 1);
put("machine", w - 3, dd - 1.6, 0, 1, 1.0);
put("flywheel", w - 3, 1.6, 0, 0.8, 0.8);
}
else if (/link chamber|six stations|heart of the six/.test(n)) {
var lx = r.door ? inX(w / 2 - 0.4) : cx;
mmTorus(G, trim, 1.8, 0.18, lx, 0.1, cz, Math.PI / 2, 0, 0);
mmCyl(G, mmInMat(0x2A2A30, null, { e: 0xE8C060, ei: 0.35 }), 1.4, 1.4, 0.08, lx, 0.05, cz, 0, 0, 0, 24);
var ps = wSign(["Here it locks to the Mythic Sovereign"], 3.2, 0.5, "#1A1814", "#F0E2B8");
ps.position.set(lx, 2.2, r.z0 + 0.2);
G.add(ps);
put("monitor", w - 1.6, 1.2, 0, 1);
put("seat", w - 2.4, dd - 1.6, Math.PI, 1);
}
else if (/cupola|driver|cradle/.test(n)) {
put("seat", w / 2, dd / 2, 0, 1, 0.6);
var pe = mmCyl(G, dark, 0.12, 0.12, 1.4, r.door ? inX(w / 2) : cx, 2.4, cz, 0, 0, 0, 10);
put("monitor", w - 1.6, 1.2, 0, 1);
}
else if (/dome|garden/.test(n)) {
for (var cr = 0; cr < 5; cr++) {
var g2 = put("crystal", 1.4 + cr * 1.5, 1.4 + (cr % 2) * 4.8, cr, 1.2, 0.5);
}
put("plant", w - 1.6, dd / 2, 0, 1.2);
put("benchin", w / 2, dd / 2, 0, 1, 0.8);
}
else {
put("longtable", w / 2 - 0.6, dd / 2, Math.PI / 2, 0.8, 1.2) || put("table", w / 2 - 0.6, dd / 2, 0, 1, 1.0);
for (var ch = 0; ch < 4; ch++)
put("chair", w / 2 - 1.8 + ch * 1.2, dd / 2 - 1.2, 0, 1);
put("banner", 0.3, dd / 2, Math.PI / 2, 1);
put("painting", w - 0.3, dd / 2, -Math.PI / 2, 1);
put("plant", 1.0, 1.0, 0, 1);
}
},
function () {
var pl = MMI.plan;
if (!pl) {
return;
}
camera.position.set(MM_IN_BASE, 1.72, pl.z1 - 3);
yaw = 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
var d = MM.list[MMI.k];
mmSay("<b>Inside " + mmEsc(d.name) + ".</b> " + mmEsc(d.rooms.join(", ")) + ". The hatch behind you leads out" + (MMI.ret && MMI.ret.mine ? "; the pilot's seat at the front takes you to the controls." : "."));
},
function (dt) {
var P = camera.position, x = P.x - MM_IN_BASE, z = P.z, best = null;
MMI.spots.forEach(function (s) { if (Math.hypot(x - s.x, z - s.z) < s.r && !best)
best = s; });
if (best !== MMI.near) {
MMI.near = best;
worldPrompt(best ? best.label : null, best ? best.fn : null);
}
var pl = MMI.plan, rm = null;
if (pl)
pl.rooms.forEach(function (r) { if (x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1)
rm = r; });
worldBanner("<b>" + mmEsc(MM.list[MMI.k].name) + "</b> · " + mmEsc(rm ? rm.name : "the passage"));
},
function (w, h, planet) {
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d");
var gr = x.createLinearGradient(0, 0, 0, h);
gr.addColorStop(0, "#05040C");
gr.addColorStop(0.6, "#0C0820");
gr.addColorStop(1, "#1A0E2E");
x.fillStyle = gr;
x.fillRect(0, 0, w, h);
var R = wRand(4242);
for (var i = 0; i < w * h / 900; i++) {
var a = 0.3 + R() * 0.7, s = R() < 0.06 ? 1.6 : 0.8;
x.fillStyle = "rgba(" + (200 + R() * 55 | 0) + "," + (200 + R() * 55 | 0) + ",255," + a.toFixed(2) + ")";
x.fillRect(R() * w, R() * h, s, s);
}
for (var n = 0; n < 3; n++) {
var nx = R() * w, ny = R() * h * 0.7, nr = w * 0.12 + R() * w * 0.1, ng = x.createRadialGradient(nx, ny, 0, nx, ny, nr);
ng.addColorStop(0, n % 2 ? "rgba(180,110,220,0.18)" : "rgba(90,140,230,0.16)");
ng.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = ng;
x.fillRect(0, 0, w, h);
}
if (planet) {
var px = w * 0.78, py = h * 0.72, pr = h * 0.32, pg = x.createLinearGradient(px - pr, py - pr, px + pr, py + pr);
x.save();
x.beginPath();
x.arc(px, py, pr, 0, Math.PI * 2);
x.clip();
for (var b = 0; b < 14; b++) {
x.fillStyle = ["#D8B088", "#B8865A", "#E8D0B0", "#C89A70", "#A87050"][b % 5];
x.fillRect(px - pr, py - pr + b * (2 * pr / 14), 2 * pr, 2 * pr / 14 + 1);
}
var sh = x.createRadialGradient(px - pr * 0.4, py - pr * 0.4, pr * 0.2, px, py, pr * 1.05);
sh.addColorStop(0, "rgba(0,0,0,0)");
sh.addColorStop(1, "rgba(0,0,0,0.75)");
x.fillStyle = sh;
x.fillRect(px - pr, py - pr, 2 * pr, 2 * pr);
x.restore();
}
var t = new THREE.CanvasTexture(cv);
return t;
},
function (G) {
var d = MM.list.domeship, lite = mmLite();
ASH_IN.anim = [];
ASH_IN.walkers = [];
ASH_IN.holo = null;
MMI.solids = [];
MMI.spots = [];
var pl = { W: 52, z0: -51, z1: 46, L: 97, rooms: [] };
MMI.plan = pl;
MMI.W = pl.W;
var pearlS = mmInMat(0xC4BCD2, null, { shine: 90 }), pearl = mmInMat(0xC8C0D4, "plaster", { shine: 30 }), pearl2 = mmInMat(0x9A90B0, "plaster"), floor = mmInMat(0xB8B0C8, "marble", { shine: 50 }), dkfloor = mmInMat(0x3A3248, "marble", { shine: 50 }), vio = mmInMat(0xB88AFF, null, { e: 0x8A5AD8, ei: 0.9 }), soft = mmInMat(0xFFF0DC, null, { e: 0xFFE8C8, ei: 0.85 }), dark = mmInMat(0x2A2434, "metal"), steel = mmInMat(0x8A86A0, "metal", { shine: 60 }), screen = mmInMat(0x0A1A24, null, { e: 0x6AC8FF, ei: 0.5 }), screen2 = mmInMat(0x1A0A24, null, { e: 0xC88AFF, ei: 0.5 });
var scr = function (seed, hue) {
var w = 512, h = 288, cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d"), Rs = wRand(seed), c1 = hue ? "#C88AFF" : "#6AD8FF", c2 = hue ? "#FFC8F4" : "#C8F4FF";
x.fillStyle = "#050914";
x.fillRect(0, 0, w, h);
x.strokeStyle = c1;
x.lineWidth = 1;
x.globalAlpha = 0.1;
for (var gx = 0; gx < w; gx += 16) {
x.beginPath();
x.moveTo(gx, 0);
x.lineTo(gx, h);
x.stroke();
}
for (var gy = 0; gy < h; gy += 16) {
x.beginPath();
x.moveTo(0, gy);
x.lineTo(w, gy);
x.stroke();
}
x.globalAlpha = 0.85;
x.lineWidth = 2;
x.strokeRect(5, 5, w - 10, h - 10);
x.beginPath();
x.moveTo(5, 34);
x.lineTo(w - 5, 34);
x.stroke();
x.fillStyle = c2;
for (var tt = 0; tt < 5; tt++)
x.fillRect(14 + tt * 46, 14, 34 * (0.5 + Rs() * 0.5), 8);
x.beginPath();
for (var i = 0; i < w * 0.46; i += 3) {
var yy = h * 0.34 + Math.sin(i * 0.045 + seed) * h * 0.09 + Math.sin(i * 0.17) * h * 0.03;
if (i === 0)
x.moveTo(14 + i, yy);
else
x.lineTo(14 + i, yy);
}
x.stroke();
for (var b = 0; b < 10; b++) {
var bh = h * 0.3 * (0.2 + Rs() * 0.8);
x.fillStyle = b % 3 ? c1 : c2;
x.globalAlpha = 0.75;
x.fillRect(w * 0.56 + b * w * 0.04, h * 0.52 - bh, w * 0.026, bh);
}
x.globalAlpha = 0.85;
x.strokeStyle = c2;
[0.18, 0.11, 0.05].forEach(function (r) { x.beginPath(); x.arc(w * 0.24, h * 0.74, h * r, 0, Math.PI * 2); x.stroke(); });
x.beginPath();
x.moveTo(w * 0.24, h * 0.74);
x.lineTo(w * 0.24 + h * 0.15, h * 0.74 - h * 0.1);
x.stroke();
x.fillStyle = c1;
for (var bl = 0; bl < 5; bl++)
x.fillRect(w * 0.24 + (Rs() - 0.5) * h * 0.3, h * 0.74 + (Rs() - 0.5) * h * 0.3, 4, 4);
x.fillStyle = c2;
x.globalAlpha = 0.7;
for (var l = 0; l < 7; l++)
x.fillRect(w * 0.56, h * 0.6 + l * h * 0.05, w * 0.36 * (0.35 + Rs() * 0.65), h * 0.02);
return new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), color: 0xD8D8E8, fog: false });
};
var SCR = [scr(11, 0), scr(12, 1), scr(13, 0), scr(14, 1), scr(15, 0), scr(16, 1)];
var plate = function (rep) {
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = 256;
var x = cv.getContext("2d");
x.fillStyle = "#A69EBC";
x.fillRect(0, 0, 256, 256);
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var px = i * 128, py = j * 128;
x.fillStyle = (i + j) % 2 ? "#ACA4C2" : "#9E96B4";
x.fillRect(px + 3, py + 3, 122, 122);
x.fillStyle = "rgba(255,255,255,0.18)";
x.fillRect(px + 3, py + 3, 122, 3);
x.fillRect(px + 3, py + 3, 3, 122);
x.fillStyle = "rgba(0,0,0,0.2)";
x.fillRect(px + 3, py + 122, 122, 3);
x.fillRect(px + 122, py + 3, 3, 122);
x.fillStyle = "#6A6480";
[[12, 12], [112, 12], [12, 112], [112, 112]].forEach(function (q) { x.beginPath(); x.arc(px + q[0], py + q[1], 3, 0, Math.PI * 2); x.fill(); });
x.strokeStyle = "rgba(60,50,90,0.35)";
x.lineWidth = 1;
for (var k = 0; k < 6; k++) {
x.beginPath();
x.moveTo(px + 30, py + 30 + k * 12);
x.lineTo(px + 98, py + 30 + k * 12);
x.stroke();
}
}
x.fillStyle = "#3A3448";
x.fillRect(0, 0, 256, 3);
x.fillRect(0, 0, 3, 256);
x.fillRect(0, 127, 256, 2);
x.fillRect(127, 0, 2, 256);
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rep[0], rep[1]);
t.anisotropy = 4;
return mmLite() ? new THREE.MeshLambertMaterial({ map: t }) : new THREE.MeshStandardMaterial({ map: t, metalness: 0.55, roughness: 0.42 });
};
var sol = function (x, z, hw, hd, rot) { MMI.solids.push({ x: x, z: z, hw: hw, hd: hd, rot: rot || 0 }); };
var solR = function (x, z, r) { MMI.solids.push({ x: x, z: z, r: r }); };
var wall = function (x0, z0, x1, z1, h, mat, gaps) {
var L = Math.hypot(x1 - x0, z1 - z0);
if (L < 0.05)
return;
var ux = (x1 - x0) / L, uz = (z1 - z0) / L, th = -Math.atan2(uz, ux);
var cuts = [[0, L]];
(gaps || []).forEach(function (gp) { var o = []; cuts.forEach(function (c) { var a = gp[0] - gp[1] / 2, b = gp[0] + gp[1] / 2; if (b <= c[0] || a >= c[1])
o.push(c);
else {
if (a > c[0])
o.push([c[0], a]);
if (b < c[1])
o.push([b, c[1]]);
} }); cuts = o; });
cuts.forEach(function (c) {
var l = c[1] - c[0];
if (l < 0.05)
return;
var m = (c[0] + c[1]) / 2, cx = x0 + ux * m, cz = z0 + uz * m;
var b = mmBox(G, l, h, 0.3, mat || pearl, cx, h / 2, cz);
b.rotation.y = th;
sol(cx, cz, l / 2, 0.15, th);
if (!lite) {
var s = mmBox(G, l, 0.12, 0.34, vio, cx, 1.0, cz);
s.rotation.y = th;
}
});
(gaps || []).forEach(function (gp) {
var cx = x0 + ux * gp[0], cz = z0 + uz * gp[0], dh = gp[2] || 3.6;
if (h > dh) {
var t = mmBox(G, gp[1], h - dh, 0.3, mat || pearl, cx, dh + (h - dh) / 2, cz);
t.rotation.y = th;
}
var tr = mmBox(G, gp[1] + 0.4, 0.18, 0.4, vio, cx, dh + 0.05, cz);
tr.rotation.y = th;
});
};
var arc = function (cx, cz, r, a0, a1, h, mat, gaps) {
var n = Math.max(6, Math.ceil((a1 - a0) / (lite ? 0.26 : 0.16)));
for (var i = 0; i < n; i++) {
var aa = a0 + (a1 - a0) * i / n, bb = a0 + (a1 - a0) * (i + 1) / n, m = (aa + bb) / 2, skip = false;
(gaps || []).forEach(function (gp) { if (Math.abs(Math.atan2(Math.sin(m - gp[0]), Math.cos(m - gp[0]))) < gp[1])
skip = true; });
if (skip)
continue;
wall(cx + Math.cos(aa) * r, cz + Math.sin(aa) * r, cx + Math.cos(bb) * r, cz + Math.sin(bb) * r, h, mat);
}
};
var sign = function (txt, x, y, z, ry, w) { var s = wSign([txt], w || 3.4, 0.6, "#1A1428", "#F0E2FF"); s.position.set(x, y, z); s.rotation.y = ry || 0; G.add(s); return s; };
var glow = function (col, sz, op, x, y, z) { if (!lite)
mmGlow(G, col, sz, op, x, y, z); };
var room = function (name, x0, x1, z0, z1) { pl.rooms.push({ name: name, x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1) }); };
var crew = [];
var person = function (seed, title, x, z, ry, look) { if (lite && crew.length >= 6)
return null; var g = null; try {
g = wPerson("ash_" + seed, { title: title, place: "Ashvaal, the Pearl Domeship", look: look });
}
catch (e) { } if (!g)
return null; g.position.set(x, 0, z); g.rotation.y = ry || 0; G.add(g); crew.push(g); solR(x, z, 0.35); return g; };
var veyari = function (x, z, ry, walk) { if (typeof sfVeyari !== "function")
return null; var v = sfVeyari(); v.position.set(x, 0, z); v.rotation.y = ry || 0; G.add(v); if (walk)
ASH_IN.walkers.push({ g: v, x: x, z0: walk[0], z1: walk[1], t: Math.random() * 6, sp: 0.05 + Math.random() * 0.03 });
else
solR(x, z, 0.4); return v; };
var NH = 11, NW = 7, cr = 13;
var nz = Math.sqrt(cr * cr - NW * NW);
mmBox(G, NW * 2, 0.2, 60, floor, 0, -0.1, 0);
mmBox(G, 3, 0.03, 60, dkfloor, 0, 0.02, 0);
[-1, 1].forEach(function (s) {
wall(s * NW, -30, s * NW, -nz, NH, pearl, [[-21 - (-30), 4, 4.2]]);
wall(s * NW, nz, s * NW, 30, NH, pearl, [[21 - nz, 4, 4.2]]);
});
var vm = pearl2.clone();
vm.side = THREE.DoubleSide;
[-1, 1].forEach(function (s) {
var vl = 30 - nz, vault = new THREE.Mesh(new THREE.CylinderGeometry(NW, NW, vl, lite ? 12 : 24, 1, true, -Math.PI / 2, Math.PI), vm);
vault.rotation.x = -Math.PI / 2;
vault.position.set(0, NH, s * (nz + vl / 2));
vault.scale.set(1, 1, 0.42);
G.add(vault);
mmBox(G, NW * 2, 0.3, vl, pearl2, 0, NH + 3.2, s * (nz + vl / 2));
});
for (var pz = -27; pz <= 27; pz += 6) {
if (Math.abs(pz) < cr)
continue;
[-1, 1].forEach(function (s) {
var x = s * (NW - 0.9);
mmCyl(G, pearl, 0.42, 0.55, NH, x, NH / 2, pz, 0, 0, 0, lite ? 8 : 16);
mmCyl(G, steel, 0.65, 0.65, 0.3, x, 0.15, pz, 0, 0, 0, lite ? 8 : 16);
mmCyl(G, steel, 0.6, 0.5, 0.4, x, NH - 0.2, pz, 0, 0, 0, lite ? 8 : 16);
if (!lite)
mmBox(G, 0.08, NH - 1.6, 0.08, vio, x + (s < 0 ? 0.45 : -0.45), NH / 2, pz);
solR(x, pz, 0.6);
});
var rib = mmTorus(G, steel, NW - 0.4, 0.16, 0, NH, pz, 0, 0, 0, Math.PI);
rib.scale.y = 0.42;
var lp = mmEll(G, soft, 0.5, 0.3, 0.5, 0, NH + 1.2, pz, 10);
mmCyl(G, steel, 0.03, 0.03, 1.6, 0, NH + 2.3, pz, 0, 0, 0, 4);
glow(0xFFE8C8, 3, 0.12, 0, NH + 0.8, pz);
}
if (!lite)
for (var bz = -25; bz <= 25; bz += 12) {
if (Math.abs(bz) < cr + 2)
continue;
[-1, 1].forEach(function (s) { var b = mmBox(G, 1.4, 3.2, 0.05, mmInMat(0x5A2A8A, null, { e: 0x2A1040, ei: 0.4 }), s * (NW - 0.2), 7.4, bz + 3); b.rotation.y = s * Math.PI / 2; mmBox(G, 1.5, 0.1, 0.1, steel, s * (NW - 0.2), 9.05, bz + 3).rotation.y = s * Math.PI / 2; });
}
room("The Long Hall", -NW, NW, -30, 30);
veyari(-3.2, -20, 0, [-28, -15]);
veyari(3.2, 18, Math.PI, [15, 28]);
if (!lite) {
veyari(2.6, -24, 0, [-28, -14]);
veyari(-2.8, 24, Math.PI, [14, 28]);
}
person("hall1", "Ship's officer", -4.5, 26, 2.6);
person("hall2", "Engineer", 4.6, -26, -0.4);
room("The Crystal Dome", -cr, cr, -cr, cr);
arc(0, 0, cr, 0, Math.PI * 2, 7, pearl, [[0, 0.33], [Math.PI, 0.33], [Math.PI / 2, Math.asin(NW / cr) + 0.02], [-Math.PI / 2, Math.asin(NW / cr) + 0.02]]);
var gr = mmInMat(0x4E9A3A, null), gr2 = mmInMat(0x6AB84A, null);
mmCyl(G, gr, cr, cr, 0.2, 0, -0.08, 0, 0, 0, 0, lite ? 24 : 48);
mmTorus(G, steel, cr - 0.2, 0.2, 0, 7.1, 0, Math.PI / 2, 0, 0);
mmTorus(G, vio, cr - 0.2, 0.08, 0, 7.4, 0, Math.PI / 2, 0, 0);
var sky = new THREE.Mesh(new THREE.SphereGeometry(cr * 1.6, lite ? 16 : 32, lite ? 8 : 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ map: ashStars(1024, 512, false), side: THREE.BackSide, fog: false }));
sky.position.set(0, 7, 0);
sky.scale.y = 0.9;
G.add(sky);
var dg = mmMesh(new THREE.SphereGeometry(cr, lite ? 16 : 32, lite ? 8 : 16, 0, Math.PI * 2, 0, Math.PI / 2), mmMat(0xE2D2FF, { op: 0.22, shine: 120, spec: 0xFFFFFF }), 0, 7, 0, G);
dg.scale.y = 0.9;
var R = wRand(9090);
mmBox(G, 3, 0.04, cr * 2, dkfloor, 0, 0.05, 0);
mmTorus(G, dkfloor, 6.5, 0.7, 0, 0.04, 0, Math.PI / 2, 0, 0).scale.z = 0.06;
var PV = mmG(G, 0, 0, 0);
mmCyl(PV, pearl, 3.2, 3.4, 0.3, 0, 0.15, 0, 0, 0, 0, lite ? 12 : 24);
for (var pc = 0; pc < 8; pc++) {
var pa = pc / 8 * Math.PI * 2;
mmCyl(PV, pearlS, 0.14, 0.16, 3.6, Math.cos(pa) * 2.9, 2.1, Math.sin(pa) * 2.9, 0, 0, 0, 8);
solR(Math.cos(pa) * 2.9, Math.sin(pa) * 2.9, 0.25);
}
var roof = mmEll(PV, pearlS, 3.4, 1.2, 3.4, 0, 4.1, 0, lite ? 12 : 20);
mmEll(PV, vio, 0.3, 0.3, 0.3, 0, 5.3, 0, 8);
glow(0xFFE0A8, 3, 0.14, 0, 2.4, 0);
var leaf = mmInMat(0x2E7A30, null), leaf2 = mmInMat(0x4A9A3A, null), bark = mmInMat(0x6A4A2E, "wood");
var nt = lite ? 10 : 26;
var TL = [];
for (var t = 0; t < nt; t++) {
var ta = R() * Math.PI * 2, td = 7.6 + R() * 4.4;
var tx = Math.cos(ta) * td, tz = Math.sin(ta) * td;
if (Math.abs(tx) < 2.4 || Math.abs(tz) < 2.4)
continue;
var th = 2.4 + R() * 3.2;
solR(tx, tz, 0.3);
TL.push({ x: tx, z: tz, h: th, kind: t % 3 === 0 ? "pine" : "leaf" });
}
ashTrees(G, TL, lite, 4401);
var pond = mmInMat(0x5AA8D8, null, { shine: 120 });
mmEll(G, pond, 2.6, 0.05, 1.7, -5.2, 0.06, 4.6, 18);
for (var st = 0; st < (lite ? 6 : 12); st++) {
var sa = st / (lite ? 6 : 12) * Math.PI * 2;
mmEll(G, mmInMat(0x9A9488, "stone"), 0.4, 0.25, 0.35, -5.2 + Math.cos(sa) * 2.8, 0.15, 4.6 + Math.sin(sa) * 1.9, 6);
}
solR(-5.2, 4.6, 2.2);
if (!lite) {
var fc = [0xF0D060, 0xE878A8, 0xF4F0E8, 0xB89AF0];
for (var f = 0; f < 90; f++) {
var fa = R() * Math.PI * 2, fd = 4 + R() * 8.5, fx = Math.cos(fa) * fd, fz = Math.sin(fa) * fd;
if (Math.abs(fx) < 1.7 || Math.abs(fz) < 1.7)
continue;
mmEll(G, mmInMat(fc[f % 4], null, { e: fc[f % 4], ei: 0.35 }), 0.12, 0.12, 0.12, fx, 0.22, fz, 5);
}
}
var cry = mmInMat(0xA8F0FF, null, { e: 0x4AA8D8, ei: 0.8 }), cry2 = mmInMat(0xE8A8FF, null, { e: 0xA05AD8, ei: 0.8 });
for (var cs = 0; cs < (lite ? 4 : 9); cs++) {
var ca = cs / (lite ? 4 : 9) * Math.PI * 2 + 0.3, cd = 9.5 + R() * 2, ch = 2 + R() * 2.4;
var cx2 = Math.cos(ca) * cd, cz2 = Math.sin(ca) * cd;
if (Math.abs(cx2) < 2 || Math.abs(cz2) < 2)
continue;
mmCone(G, cs % 2 ? cry2 : cry, 0.5, ch, cx2, ch / 2, cz2, 0, 0, (R() - 0.5) * 0.3, 6);
solR(cx2, cz2, 0.5);
glow(cs % 2 ? 0xE8A8FF : 0xA8F0FF, 2, 0.16, cx2, ch * 0.6, cz2);
}
[-1, 1].forEach(function (s) { mmFurn(G, "benchin", s * 4.2, 0, -4.2, s > 0 ? -0.8 : 0.8); });
veyari(4.6, -1.5, -1.6);
person("garden1", "Gardener", -8.2, -2.6, 1.2);
if (!lite)
person("garden2", "Ship's officer", 3.6, 5.4, -2.5);
sign("The Crystal Dome", 0, 4.2, -cr + 0.2, 0, 4);
sign("The Crystal Dome", 0, 4.2, cr - 0.2, Math.PI, 4);
var BC = -39, BR = 11, BH = 9, bo = Math.acos(NW * 0.9 / BR);
room("The Holobridge", -BR, BR, BC - BR, -30);
var wa0 = Math.PI * 1.12, wa1 = Math.PI * 1.88, ga = Math.asin((-30 - BC) / BR), gx = Math.cos(ga) * BR;
arc(0, BC, BR, Math.PI - ga, Math.PI * 2 + ga, BH, pearl);
[-1, 1].forEach(function (s) { wall(s * NW, -30, s * gx, -30, NH, pearl); });
var bv = new THREE.Mesh(new THREE.CylinderGeometry(BR, BR, NH - BH, lite ? 24 : 48, 1, true), pearl2.clone());
bv.material.side = THREE.DoubleSide;
bv.position.set(0, BH + (NH - BH) / 2, BC);
G.add(bv);
mmMesh(new THREE.CylinderGeometry(BR, BR, 0.2, lite ? 24 : 48), floor, 0, -0.1, BC, G);
mmMesh(new THREE.CylinderGeometry(BR + 0.2, BR + 0.2, 0.3, lite ? 24 : 48), pearl2, 0, BH + 0.15, BC, G);
var win = new THREE.Mesh(new THREE.CylinderGeometry(BR - 0.2, BR - 0.2, BH - 2.2, lite ? 18 : 36, 1, true, Math.PI / 2 - wa1, wa1 - wa0), new THREE.MeshBasicMaterial({ map: ashStars(2048, 512, true), side: THREE.BackSide, fog: false }));
win.position.set(0, 1.0 + (BH - 2.2) / 2, BC);
G.add(win);
for (var wf = 0; wf <= 6; wf++) {
var wa = wa0 + (wa1 - wa0) * wf / 6;
mmBox(G, 0.3, BH, 0.3, pearl, Math.cos(wa) * (BR - 0.35), BH / 2, BC + Math.sin(wa) * (BR - 0.35));
}
mmTorus(G, vio, BR - 0.25, 0.06, 0, 1.05, BC, Math.PI / 2, 0, 0, Math.PI * 2);
var HT = mmG(G, 0, 0, BC + 1);
mmCyl(HT, dark, 2.6, 2.9, 0.9, 0, 0.45, 0, 0, 0, 0, lite ? 16 : 32);
mmCyl(HT, steel, 2.7, 2.7, 0.1, 0, 0.95, 0, 0, 0, 0, lite ? 16 : 32);
mmTorus(HT, vio, 2.6, 0.06, 0, 1.0, 0, Math.PI / 2, 0, 0);
solR(0, BC + 1, 3.0);
var hm = new THREE.MeshBasicMaterial({ color: 0x7AD8FF, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending, wireframe: true });
var hm2 = new THREE.MeshBasicMaterial({ color: 0xC8A8FF, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
var HO = new THREE.Group();
HO.position.set(0, 3.4, 0);
HT.add(HO);
var pts = [], Rh = wRand(31);
for (var pi2 = 0; pi2 < (lite ? 200 : 600); pi2++) {
var u = Rh() * 2 - 1, v = Rh() * Math.PI * 2, rr = 1.0 + Rh() * 1.4;
pts.push(Math.sqrt(1 - u * u) * Math.cos(v) * rr, u * rr * 0.45, Math.sqrt(1 - u * u) * Math.sin(v) * rr);
}
var pg = new THREE.BufferGeometry();
pg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
HO.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xB8E8FF, size: 0.06, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending })));
[0, 0.5, -0.4].forEach(function (tl, i) { var rg = new THREE.Mesh(new THREE.TorusGeometry(1.4 + i * 0.5, 0.012, 4, 64), hm2); rg.rotation.x = Math.PI / 2 + tl; HO.add(rg); });
var pls = [];
[[0xFFD890, 0.22, 1.4], [0x8AD0FF, 0.14, 1.9], [0xE8A070, 0.3, 2.4]].forEach(function (p, i) { var m = new THREE.Mesh(new THREE.SphereGeometry(p[1], 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(p[0]).multiplyScalar(0.55), transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending })); HO.add(m); pls.push({ m: m, r: p[2], a: i * 2.1, s: 0.25 - i * 0.06 }); });
var ship = new THREE.Group();
HO.add(ship);
var lens = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 10), hm);
lens.scale.set(0.55, 0.2, 1);
ship.add(lens);
var dm = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), hm);
dm.position.set(0, 0.08, -0.06);
ship.add(dm);
[-1, 1].forEach(function (s) { var wg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.22), hm); wg.position.set(s * 0.4, 0, 0.18); wg.rotation.y = s * 0.5; ship.add(wg); });
var beam = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.5, 2.8, lite ? 16 : 32, 1, true), new THREE.MeshBasicMaterial({ color: 0x6AC8FF, transparent: true, opacity: 0.035, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
beam.position.y = 2.4;
HT.add(beam);
glow(0x8AD8FF, 3.2, 0.1, 0, 3.4, BC + 1);
ASH_IN.holo = { g: HO, ship: ship, pls: pls };
var station = function (a, r, tag) {
var x = Math.sin(a) * r, z = BC - Math.cos(a) * r * 0.9 + 1, S = mmG(G, x, 0, z, 0, -a, 0);
mmBox(S, 1.7, 0.95, 0.8, dark, 0, 0.48, 0);
var sc = mmBox(S, 1.5, 0.75, 0.06, dark, 0, 1.32, -0.3);
var sp = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 0.68), SCR[(tag + 6) % 6]);
sp.position.set(0, 1.32, -0.265);
sp.rotation.y = 0;
S.add(sp);
sp.rotation.x = -0.45;
sc.rotation.x = -0.45;
sc.rotation.x = -0.45;
mmBox(S, 1.8, 0.06, 0.9, steel, 0, 0.98, 0.05);
mmFurn(S, "seat", 0, 0, 0.9, Math.PI);
sol(x, z, 0.9, 0.5, -a);
return S;
};
for (var sa2 = -2; sa2 <= 2; sa2++)
station(sa2 * 0.45, 7.2, sa2);
if (!lite)
[-1, 1].forEach(function (s) { station(s * 1.25, 5.4, s + 3); station(s * 1.65, 8.2, s + 5); });
var PZ = BC + 6.4, PS = mmG(G, 0, 0, PZ);
mmCyl(PS, steel, 1.6, 1.8, 0.25, 0, 0.12, 0, 0, 0, 0, 24);
mmCyl(PS, dark, 0.3, 0.4, 0.6, 0, 0.5, 0, 0, 0, 0, 10);
mmSlab(PS, pearlS, 1.3, 0.3, 1.2, 0, 0.95, 0);
mmSlab(PS, pearlS, 1.3, 2.0, 0.25, 0, 1.9, 0.55);
mmEll(PS, vio, 0.5, 0.1, 0.1, 0, 2.95, 0.55, 8);
[-1, 1].forEach(function (s) { mmSlab(PS, dark, 0.25, 0.5, 1.1, s * 0.75, 1.25, 0); mmBox(PS, 0.3, 0.12, 0.4, screen, s * 0.75, 1.55, -0.45); });
solR(0, PZ, 0.8);
MMI.spots.push({ x: 0, z: PZ - 1.2, r: 1.9, label: MMI.ret && MMI.ret.mine ? "🎛️ <b>The pilot's seat</b> · <b>press E</b> to take the controls" : "🎛️ <b>The pilot's seat</b> · only its owner can take the controls",
fn: function () { if (MMI.ret && MMI.ret.mine)
mmInLeave(true);
else
mmSay("Only its owner can take the controls."); } });
ashBridgeMore(G, { BC: BC, BR: BR, BH: BH, wa0: wa0, wa1: wa1, HO: HO, HT: HT, beam: beam, lite: lite, dark: dark, steel: steel, vio: vio, solR: solR });
sign("The Holobridge", 0, 6.2, -30.2, Math.PI, 4);
sign("The Holobridge", 0, 6.2, -29.8, 0, 4);
person("br1", "Navigator", Math.sin(-0.45) * 7.2, BC - Math.cos(-0.45) * 6.5 + 2.0, Math.PI + 0.45);
person("br2", "Communications officer", Math.sin(0.9) * 7.2, BC - Math.cos(0.9) * 6.5 + 2.0, Math.PI - 0.9);
if (!lite) {
veyari(-3.4, BC + 3.2, 2.8);
person("br3", "Weapons officer", Math.sin(0.45) * 7.2, BC - Math.cos(0.45) * 6.5 + 2.0, Math.PI - 0.45);
person("br4", "First officer", 2.4, BC + 5.2, 2.6);
}
var side = function (name, s, z0, z1, doorZ, fill) {
var xa = s * NW, xb = s * 21;
room(name, xa, xb, z0, z1);
wall(xb, z0, xb, z1, 6, pearl);
wall(xa, z0, xb, z0, 6, pearl);
wall(xa, z1, xb, z1, 6, pearl);
mmBox(G, 14, 0.2, z1 - z0, floor, (xa + xb) / 2, -0.1, (z0 + z1) / 2);
mmBox(G, 14, 0.2, z1 - z0, pearl2, (xa + xb) / 2, 6.1, (z0 + z1) / 2);
for (var lz = z0 + 3; lz < z1; lz += 4.5) {
mmBox(G, 1.4, 0.06, 0.6, soft, (xa + xb) / 2, 6.0, lz);
glow(0xFFE8C8, 2.5, 0.1, (xa + xb) / 2, 5.4, lz);
}
sign(name, xa + s * 0.2, 4.6, doorZ, s > 0 ? -Math.PI / 2 : Math.PI / 2, 3.6);
sign(name, xa - s * 0.2, 4.6, doorZ, s > 0 ? Math.PI / 2 : -Math.PI / 2, 3.6);
try {
fill((xa + xb) / 2, (z0 + z1) / 2, s);
}
catch (e) {
if (window.console)
console.warn("[ash] room", name, e);
}
};
var put = function (name, x, z, ry, s, rad) { var g = mmFurn(G, name, x, 0, z, ry || 0, s); if (g && rad)
solR(x, z, rad); return g; };
side("The Crew Quarters", -1, -28, -14, -21, function (cx, cz, s) {
for (var b = 0; b < (lite ? 3 : 5); b++) {
var bz = -26.6 + b * 2.6;
[0, 1.3].forEach(function (y) { mmFurn(G, "bed", -19.3, y, bz, Math.PI / 2, 0.9); });
mmBox(G, 2.3, 0.08, 0.08, steel, -19.3, 2.5, bz + 1.1);
sol(-19.3, bz, 1.1, 1.0);
mmFurn(G, "bed", -14.4, 0, bz, -Math.PI / 2, 0.9);
sol(-14.4, bz, 1.1, 1.0);
}
put("wardrobe", -11, -15.2, Math.PI, 1, 0.7);
put("wardrobe", -12.6, -15.2, Math.PI, 1, 0.7);
put("lamp", -10.2, -27, 0, 1);
put("rug", -16.8, -21, 0, 1.4);
person("q1", "Pilot", -16.6, -17.4, 0.6);
});
side("The Galley and Mess", -1, 14, 28, 21, function (cx, cz, s) {
[-16.2, -11.2].forEach(function (tx) { var tz = 21; put("longtable", tx, tz, 0, 1, 0) || put("table", tx, tz, 0, 1, 0); sol(tx, tz, 0.7, 2.6); for (var c = 0; c < 4; c++) {
put("chair", tx - 1.1, tz - 2.5 + c * 1.7, Math.PI / 2, 1);
put("chair", tx + 1.1, tz - 2.5 + c * 1.7, -Math.PI / 2, 1);
} });
put("counter", -19.8, 20.5, Math.PI / 2, 1.3, 1.0);
put("stove", -19.8, 23.6, Math.PI / 2, 1, 0.7);
put("fridge", -19.8, 15.6, Math.PI / 2, 1, 0.6);
put("plant", -8.2, 27, 0, 1);
person("m1", "Cook", -18.4, 21.8, -1.5);
person("m2", "Engineer", -13.7, 17.2, 0.1);
if (!lite) {
veyari(-9.2, 24.5, Math.PI);
person("m3", "Gunner", -13.7, 25, 3.1);
}
});
side("The Pod Bay", 1, 14, 28, 21, function (cx, cz, s) {
var podM = mmMat(0xC8BEDC, { shine: 100, tex: "pearl" }), glass = mmMat(0xC8E0FF, { shine: 120, op: 0.35, spec: 0xFFFFFF }), helm = mmMat(0xE8E4F0, { shine: 90 }), skin = mmMat(0xC89878, { rough: 0.8, metal: 0 });
for (var p = 0; p < (lite ? 4 : 8); p++) {
var px = 10 + (p % 4) * 3.2, pz = 17.2 + Math.floor(p / 4) * 6.6;
mmCyl(G, mmInMat(0x1A0E2A, null, { e: 0x8A5AD8, ei: 0.55 }), 1.3, 1.3, 0.04, px, 0.03, pz, 0, 0, 0, 20);
mmTorus(G, vio, 1.32, 0.06, px, 0.06, pz, Math.PI / 2, 0, 0);
var P = mmG(G, px, 1.4, pz, 0, 0, 0);
P.scale.setScalar(1.3);
mmCyl(P, podM, 0.75, 0.75, 2.6, 0, 0, 0, Math.PI / 2, 0, 0, lite ? 8 : 14);
mmEll(P, podM, 0.75, 0.75, 1.1, 0, 0, -1.3, lite ? 8 : 12);
mmCone(P, dark, 0.75, 0.8, 0, 0, 1.7, Math.PI / 2, 0, 0, lite ? 8 : 12);
mmEll(P, skin, 0.17, 0.2, 0.17, 0, 0.8, -0.55, 8);
mmEll(P, helm, 0.21, 0.17, 0.22, 0, 0.87, -0.55, 8);
mmEll(P, glass, 0.46, 0.45, 0.95, 0, 0.62, -0.6, lite ? 8 : 14);
mmTorus(P, vio, 0.77, 0.06, 0, 0, -0.3, 0, 0, 0);
[-1, 1].forEach(function (q) { mmBox(G, 0.25, 2.4, 0.4, steel, px + q * 1.1, 1.2, pz); });
mmBox(G, 2.5, 0.25, 0.5, steel, px, 2.5, pz);
sol(px, pz, 1.3, 2.2);
}
put("weaponrack", 20.2, 27, Math.PI, 1, 0.6);
put("crates", 19.6, 15.2, 0, 1, 0.8);
person("p1", "Pod pilot", 13.4, 20.2, -0.3);
person("p2", "Pod pilot", 16.2, 26.4, 2.8);
});
side("The Armoury and Turret Gallery", 1, -28, -14, -21, function (cx, cz, s) {
for (var c = 0; c < 3; c++) {
var gz = -26 + c * 4.4;
mmCyl(G, dark, 0.45, 0.55, 5.2, 17.8, 1.5, gz, 0, 0, Math.PI / 2, 12);
mmTorus(G, vio, 0.5, 0.06, 15.2, 1.5, gz, 0, Math.PI / 2, 0);
mmSlab(G, steel, 1.6, 1.2, 1.6, 19.8, 0.9, gz);
mmFurn(G, "seat", 13.4, 0, gz, Math.PI / 2);
sol(18.2, gz, 3.0, 0.8);
}
put("weaponrack", 9, -15.2, Math.PI, 1, 0.6);
put("weaponrack", 11, -15.2, Math.PI, 1, 0.6);
put("crates", 9, -27, 0, 1, 0.8);
person("a1", "Gunner", 12.6, -21.8, -1.6);
if (!lite)
person("a2", "Armourer", 10.2, -17, 2.2);
});
var mid = function (name, s, fill) {
var xa = s * (cr - 0.2), xb = s * 25;
room(name, s * cr, xb, -6, 6);
wall(xb, -6, xb, 6, 6, pearl);
wall(s * Math.sqrt(cr * cr - 36), -6, xb, -6, 6, pearl);
wall(s * Math.sqrt(cr * cr - 36), 6, xb, 6, 6, pearl);
mmBox(G, 13.8, 0.2, 12, floor, s * 18.1, -0.1, 0);
mmBox(G, 13.8, 0.2, 12, pearl2, s * 18.1, 6.1, 0);
mmBox(G, 1.4, 0.06, 1.4, soft, s * 19, 6.0, 0);
glow(0xFFE8C8, 3, 0.1, s * 19, 5.4, 0);
sign(name, s * (cr + 0.3), 4.6, 0, s > 0 ? -Math.PI / 2 : Math.PI / 2, 3.6);
try {
fill(s);
}
catch (e) {
if (window.console)
console.warn("[ash] room", name, e);
}
};
mid("The Star Library", -1, function (s) {
for (var b = 0; b < 5; b++) {
put("bookshelf", -24.2, -4.4 + b * 2.2, Math.PI / 2, 1.2, 0.6);
}
put("desk", -18.5, -3, 0, 1, 0.8);
put("chair", -18.5, -2, Math.PI, 1);
put("globe", -17, 3.6, 0, 1.4, 0.6) || put("maptable", -17, 3.6, 0, 0.8, 0.8);
put("lamp", -20, 4.6, 0, 1);
put("rug", -19, 0, 0, 1.4);
veyari(-20.5, 2.2, 1.4);
person("l1", "Archivist", -16.4, -1.2, -2.2);
});
mid("The Healing Hall", 1, function (s) {
for (var b = 0; b < 3; b++) {
put("bed", 23.4, -4 + b * 3.6, -Math.PI / 2, 1, 1.0);
mmBox(G, 0.06, 1.1, 0.8, screen, 24.6, 1.6, -4 + b * 3.6 + 0.9);
}
put("cabinet", 16.4, -5.2, 0, 1, 0.6);
put("desk", 17.8, 4.4, Math.PI, 1, 0.8);
put("plant", 16, 5.2, 0, 1);
person("h1", "Doctor", 19.4, 0.6, 1.4);
if (!lite)
person("h2", "Nurse", 21.8, -2.5, 1.6);
});
room("The Engine Hall", -20, 20, 30, 46);
wall(-20, 30, -NW, 30, 12, pearl);
wall(NW, 30, 20, 30, 12, pearl);
wall(-20, 30, -20, 46, 12, pearl);
wall(20, 30, 20, 46, 12, pearl);
wall(-20, 46, 20, 46, 12, pearl, [[20, 2.4, 2.6]]);
mmBox(G, 40, 0.2, 16, dkfloor, 0, -0.1, 38);
mmBox(G, 40, 0.2, 16, pearl2, 0, 12.1, 38);
var coreM = mmInMat(0x6A7AC8, null, { e: 0x4A5AC8, ei: 0.55 }), coreV = mmInMat(0x9A7AC8, null, { e: 0x7A4AB8, ei: 0.5 });
[-14.5, -5, 5, 14.5].forEach(function (cx, i) {
var big = Math.abs(cx) < 10, r = big ? 2.3 : 1.7;
mmCyl(G, i % 2 ? coreV : coreM, r, r, 11.6, cx, 5.9, 38.6, 0, 0, 0, lite ? 14 : 28);
for (var q = 0; q < (lite ? 2 : 4); q++)
mmTorus(G, steel, r + 0.25, 0.14, cx, 1.6 + q * 3, 38.6, Math.PI / 2, 0, 0);
mmCyl(G, dark, r + 0.8, r + 1.0, 0.6, cx, 0.3, 38.6, 0, 0, 0, lite ? 14 : 24);
mmTorus(G, vio, r + 1.6, 0.05, cx, 1.1, 38.6, Math.PI / 2, 0, 0);
for (var rp = 0; rp < 8; rp++) {
var ra = rp / 8 * Math.PI * 2;
mmCyl(G, steel, 0.05, 0.05, 1.1, cx + Math.cos(ra) * (r + 1.6), 0.55, 38.6 + Math.sin(ra) * (r + 1.6), 0, 0, 0, 4);
}
solR(cx, 38.6, r + 1.7);
glow(i % 2 ? 0xD8B8FF : 0x9AB0FF, big ? 6 : 4.5, 0.12, cx, 6, 38.6);
});
if (!lite) {
mmBox(G, 40, 0.15, 1.6, steel, 0, 7.6, 34);
for (var cw = -18; cw <= 18; cw += 3) {
mmBox(G, 0.06, 1.0, 0.06, steel, cw, 8.2, 33.3);
mmBox(G, 0.06, 1.0, 0.06, steel, cw, 8.2, 34.7);
}
mmBox(G, 40, 0.06, 0.06, steel, 0, 8.7, 33.3);
mmBox(G, 40, 0.06, 0.06, steel, 0, 8.7, 34.7);
}
[-1, 1].forEach(function (s) { put("pipes", s * 18.8, 32, 0, 1.4); put("machine", s * 18, 43.6, 0, 1.2, 1.0); put("servertower", s * 10.5, 44.8, 0, 1, 0.6); });
person("e1", "Chief engineer", -9.6, 34.2, 0.4);
person("e2", "Engineer", 9.8, 42.6, -2.6);
if (!lite)
veyari(0, 40.5, Math.PI);
sign("The Engine Hall", 0, 5, 30.2, 0, 4);
sign("The Long Hall", 0, 8, 29.8, Math.PI, 4);
var hz = 45.7;
mmBox(G, 2.2, 2.6, 0.15, mmInMat(0x3A3A3A, "metal"), 0, 1.3, hz);
mmTorus(G, vio, 0.55, 0.06, 0.6, 1.3, hz - 0.1, 0, 0, 0);
var hs = wSign(["The hatch", "climb out"], 2.2, 0.6, "#1A1428", "#F0E2FF");
hs.position.set(0, 3.1, hz - 0.12);
hs.rotation.y = Math.PI;
G.add(hs);
MMI.spots.push({ x: 0, z: hz - 1.4, r: 2.2, label: "🚪 <b>The hatch</b> · <b>press E</b> to climb out", fn: function () { mmInLeave(false); } });
ashTechAndGarden(G, { lite: lite, SCR: SCR, plate: plate, NW: NW, NH: NH, nz: nz, cr: cr, BC: BC, BR: BR, ga: ga, wa0: wa0, dark: dark, steel: steel, vio: vio, solR: solR, sol: sol, glow: glow });
pl.z1 = 46.6;
pl.W = 52;
},
function (G, o) {
var lite = o.lite, NW = o.NW, NH = o.NH, nz = o.nz, cr = o.cr, SCR = o.SCR, R = wRand(5151), cyan = mmInMat(0x6AD8FF, null, { e: 0x3AA8E8, ei: 0.9 });
var panel = function (x, y, z, ry, w, h, k) { var F = mmG(G, x, y, z, 0, ry, 0); mmBox(F, w + 0.3, h + 0.3, 0.12, o.dark, 0, 0, 0); var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), SCR[k % SCR.length]); p.position.z = 0.07; F.add(p); mmBox(F, w + 0.3, 0.05, 0.16, o.vio, 0, -h / 2 - 0.15, 0); return F; };
[-1, 1].forEach(function (s) {
var vl = 30 - nz, m = new THREE.Mesh(new THREE.PlaneGeometry(NW * 2, vl), o.plate([NW * 2 / 3, vl / 3]));
m.rotation.x = -Math.PI / 2;
m.position.set(0, 0.012, s * (nz + vl / 2));
G.add(m);
[-1.6, 1.6].forEach(function (x) { mmBox(G, 0.08, 0.02, vl, cyan, x, 0.03, s * (nz + vl / 2)); });
[-1, 1].forEach(function (q) {
var a = 0.75;
mmBox(G, 0.18, 0.06, vl, mmInMat(0xFFF0E0, null, { e: 0xFFE8D8, ei: 0.9 }), q * Math.sin(a) * (NW - 0.15), NH + Math.cos(a) * (NW - 0.15) * 0.42, s * (nz + vl / 2));
mmBox(G, 0.5, 0.3, vl, o.steel, q * (NW - 0.35), NH - 0.5, s * (nz + vl / 2));
if (!lite)
for (var c = 0; c < 3; c++)
mmCyl(G, c % 2 ? o.dark : mmInMat(0x8A5A3A, "metal"), 0.06, 0.06, vl, q * (NW - 0.3), NH - 0.9 - c * 0.16, s * (nz + vl / 2), Math.PI / 2, 0, 0, 6);
});
});
[-24, -18, 18, 24].forEach(function (z, i) {
[-1, 1].forEach(function (s) {
panel(s * (NW - 0.2), 3.6, z, s > 0 ? -Math.PI / 2 : Math.PI / 2, 3.2, 1.8, i * 2 + (s > 0 ? 1 : 0));
if (!lite) {
panel(s * (NW - 0.2), 6.4, z, s > 0 ? -Math.PI / 2 : Math.PI / 2, 1.4, 0.8, i + 3);
for (var v = -1; v <= 1; v += 2)
mmBox(G, 0.06, 8.4, 0.06, cyan, s * (NW - 0.16), 4.6, z + v * 2.1);
}
});
});
var bf = new THREE.Mesh(new THREE.CircleGeometry(o.BR - 0.2, lite ? 24 : 48), o.plate([7, 7]));
bf.rotation.x = -Math.PI / 2;
bf.position.set(0, 0.012, o.BC);
G.add(bf);
[4.2, 9.4].forEach(function (r) { var t = mmTorus(G, cyan, r, 0.05, 0, 0.03, o.BC, Math.PI / 2, 0, 0); });
mmTorus(G, mmInMat(0xFFF0E0, null, { e: 0xFFE8D8, ei: 0.9 }), 6, 0.09, 0, 8.7, o.BC, Math.PI / 2, 0, 0);
mmTorus(G, cyan, 3, 0.06, 0, 8.7, o.BC + 1, Math.PI / 2, 0, 0);
[2.5, 3.1, Math.PI - 2.5, Math.PI - 3.1].forEach(function (a, i) { var r = o.BR - 0.35, x = Math.cos(a) * r, z = o.BC + Math.sin(a) * r; panel(x, 3.4, z, Math.atan2(-Math.cos(a), -Math.sin(a)), 2.6, 1.5, i + 1); if (!lite)
panel(x, 5.6, z, Math.atan2(-Math.cos(a), -Math.sin(a)), 2.6, 1.2, i + 2); });
for (var e = 0; e < 8; e++) {
var ea = e / 8 * Math.PI * 2;
mmCyl(G, o.steel, 0.12, 0.18, 0.5, Math.cos(ea) * 2.75, 1.15, o.BC + 1 + Math.sin(ea) * 2.75, 0, 0, 0, 8);
mmEll(G, cyan, 0.1, 0.1, 0.1, Math.cos(ea) * 2.75, 1.45, o.BC + 1 + Math.sin(ea) * 2.75, 6);
}
var ef = new THREE.Mesh(new THREE.PlaneGeometry(40, 16), o.plate([13, 5]));
ef.rotation.x = -Math.PI / 2;
ef.position.set(0, 0.012, 38);
G.add(ef);
[-1, 1].forEach(function (s) {
for (var p = 0; p < (lite ? 2 : 4); p++)
mmCyl(G, p % 2 ? o.steel : mmInMat(0x9A6A3A, "metal", { shine: 60 }), 0.22, 0.22, 15.6, s * 19.6, 1.4 + p * 0.75, 38, Math.PI / 2, 0, 0, 10);
panel(s * 10.5, 2.4, 30.4, Math.PI, 2.4, 1.4, s > 0 ? 0 : 3);
panel(s * 19.7, 3.6, 40, s > 0 ? -Math.PI / 2 : Math.PI / 2, 3.0, 1.7, s > 0 ? 1 : 4);
});
var hz = document.createElement("canvas");
hz.width = 128;
hz.height = 16;
var hx = hz.getContext("2d");
for (var hs = 0; hs < 8; hs++) {
hx.fillStyle = hs % 2 ? "#1A1A1A" : "#E8C040";
hx.beginPath();
hx.moveTo(hs * 16, 0);
hx.lineTo(hs * 16 + 16, 0);
hx.lineTo(hs * 16 + 8, 16);
hx.lineTo(hs * 16 - 8, 16);
hx.fill();
}
var hzT = new THREE.CanvasTexture(hz);
hzT.wrapS = THREE.RepeatWrapping;
hzT.repeat.set(6, 1);
[-14.5, -5, 5, 14.5].forEach(function (cx) { var r = Math.abs(cx) < 10 ? 2.3 : 1.7; var ring = new THREE.Mesh(new THREE.RingGeometry(r + 1.8, r + 2.2, lite ? 24 : 48), new THREE.MeshLambertMaterial({ map: hzT })); ring.rotation.x = -Math.PI / 2; ring.position.set(cx, 0.02, 38.6); G.add(ring); });
var gt = null;
try {
gt = texOf("grass");
}
catch (e) { }
var turf = new THREE.MeshStandardMaterial({ color: 0x6AAA4A, roughness: 0.95, metalness: 0 });
if (gt) {
gt = gt.clone();
gt.wrapS = gt.wrapT = THREE.RepeatWrapping;
gt.repeat.set(9, 9);
gt.needsUpdate = true;
turf.map = gt;
turf.color.set(0x9AC87A);
}
var td = new THREE.Mesh(new THREE.CircleGeometry(cr - 0.05, lite ? 32 : 64), turf);
td.rotation.x = -Math.PI / 2;
td.position.set(0, 0.035, 0);
G.add(td);
var pv = null;
try {
pv = texOf("paving");
}
catch (e) { }
if (pv) {
pv = pv.clone();
pv.wrapS = pv.wrapT = THREE.RepeatWrapping;
pv.repeat.set(1, 8);
pv.needsUpdate = true;
var pm = new THREE.MeshStandardMaterial({ map: pv, color: 0xC8C0D0, roughness: 0.85 });
var path = new THREE.Mesh(new THREE.PlaneGeometry(3, cr * 2 - 0.2), pm);
path.rotation.x = -Math.PI / 2;
path.position.set(0, 0.085, 0);
G.add(path);
}
var free = function (x, z) { var d = Math.hypot(x, z); if (d > cr - 0.6)
return false; if (Math.abs(x) < 2.0)
return false; if (Math.abs(d - 6.5) < 1.0)
return false; if (d < 3.8)
return false; if (Math.hypot(x + 5.2, z - 4.6) < 3.2)
return false; return true; };
var tuftG = new THREE.ConeGeometry(0.05, 0.42, 3);
tuftG.translate(0, 0.21, 0);
var N = lite ? 260 : 2400, IM = new THREE.InstancedMesh(tuftG, new THREE.MeshLambertMaterial({ color: 0x5A9A3A }), N), M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), V3 = new THREE.Vector3(), S3 = new THREE.Vector3(), cnt = 0;
for (var i = 0; i < N * 3 && cnt < N; i++) {
var a = R() * Math.PI * 2, d = 2 + R() * (cr - 2.6), x = Math.cos(a) * d, z = Math.sin(a) * d;
if (!free(x, z))
continue;
var sc = 0.6 + R() * 0.9;
Q.setFromEuler(new THREE.Euler((R() - 0.5) * 0.5, R() * 6, (R() - 0.5) * 0.5));
M4.compose(V3.set(x, 0.03, z), Q, S3.set(sc, sc * (0.7 + R() * 0.8), sc));
IM.setMatrixAt(cnt++, M4);
}
IM.count = cnt;
G.add(IM);
var hedge = mmInMat(0x2E6A2A, "foliage");
[[7.6, 12.4], [-12.4, -7.6], [-5.4, -4.2], [4.2, 5.4]].forEach(function (q) { if (q[1] - q[0] < 1.5)
return; [-1, 1].forEach(function (s) { var L = q[1] - q[0]; mmBox(G, 0.6, 0.8, L, hedge, s * 2.1, 0.4, (q[0] + q[1]) / 2); o.sol(s * 2.1, (q[0] + q[1]) / 2, 0.3, L / 2); }); });
var shrub = [mmInMat(0x3A7A32, "foliage"), mmInMat(0x4A8A3A, "foliage"), mmInMat(0x2E6A3A, "foliage")], bloom = [0xF0D060, 0xE878A8, 0xF4F0E8, 0xB89AF0, 0xFF8A6A];
for (var b = 0; b < (lite ? 12 : 46); b++) {
var ba = R() * Math.PI * 2, bd = 4 + R() * (cr - 5), bx = Math.cos(ba) * bd, bz = Math.sin(ba) * bd;
if (!free(bx, bz))
continue;
var br = 0.5 + R() * 0.6;
mmEll(G, shrub[b % 3], br, br * 0.75, br, bx, br * 0.6, bz, lite ? 7 : 10);
if (!lite && b % 2)
for (var fl = 0; fl < 5; fl++) {
var fa = R() * Math.PI * 2;
mmEll(G, mmInMat(bloom[(b + fl) % 5], null, { e: bloom[(b + fl) % 5], ei: 0.25 }), 0.09, 0.09, 0.09, bx + Math.cos(fa) * br * 0.8, br * (0.6 + R() * 0.5), bz + Math.sin(fa) * br * 0.8, 5);
}
}
if (!lite)
for (var fe = 0; fe < 30; fe++) {
var fa2 = R() * Math.PI * 2, fd2 = 3.6 + R() * (cr - 4.5), fx = Math.cos(fa2) * fd2, fz = Math.sin(fa2) * fd2;
if (!free(fx, fz))
continue;
for (var fr = 0; fr < 6; fr++) {
var fo = mmCone(G, shrub[1], 0.12, 0.9, fx, 0.35, fz, 0, 0, 0, 4);
fo.rotation.set(0.9, fr / 6 * Math.PI * 2, 0, "YXZ");
fo.scale.set(1, 1, 0.25);
}
}
var pink = mmInMat(0xF0A8C8, "foliage"), white = mmInMat(0xF4ECE8, "bark"), will = mmInMat(0x8AB850, "foliage"), barkT = mmInMat(0x6A4A2E, "bark");
var BL = [];
[[9.6, -4.5], [-9.8, -6.4], [8.2, 7.8], [4.6, -10.6], [-3.6, 10.9], [10.8, 2.4]].forEach(function (p, i) { if (lite && i > 2)
return; o.solR(p[0], p[1], 0.3); BL.push({ x: p[0], z: p[1], h: 2.6 + R() * 1.0, kind: "blossom" }); });
ashTrees(G, BL, lite, 4402);
var WL = [];
[[-8.2, 2.6], [-2.6, 6.9]].forEach(function (p) { o.solR(p[0], p[1], 0.35); WL.push({ x: p[0], z: p[1], h: 3.4, kind: "willow" }); });
ashTrees(G, WL, lite, 4403);
var rock = mmInMat(0x8A8478, "rock"), moss = mmInMat(0x4A7A32, "foliage"), water = new THREE.MeshBasicMaterial({ color: 0xA8DCF4, transparent: true, opacity: 0.7 });
[[-8.4, 6.4, 1.3, 1.1], [-7.6, 7.4, 1.0, 1.7], [-8.9, 7.6, 0.9, 2.3], [-7.0, 6.0, 0.7, 0.6]].forEach(function (r) { mmEll(G, rock, r[2], r[3], r[2] * 0.9, r[0], r[3] * 0.5, r[1], 8); if (!lite)
mmEll(G, moss, r[2] * 0.8, 0.15, r[2] * 0.7, r[0], r[3] * 0.98, r[1], 8); });
o.solR(-8.2, 7, 1.6);
var fall = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 2.2), water);
fall.position.set(-7.25, 1.15, 6.1);
fall.rotation.y = -0.85;
fall.rotation.x = -0.15;
G.add(fall);
var fall2 = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.6), water);
fall2.rotation.x = -Math.PI / 2;
fall2.position.set(-6.5, 0.1, 5.5);
G.add(fall2);
var foam = mmInMat(0xF4FAFF, null, { e: 0xC8E8FF, ei: 0.3 });
for (var fo2 = 0; fo2 < 5; fo2++)
mmEll(G, foam, 0.25, 0.06, 0.2, -6.6 + (R() - 0.5) * 0.9, 0.12, 5.5 + (R() - 0.5) * 0.7, 6);
var lily = mmInMat(0x3A8A3A, null);
for (var l = 0; l < (lite ? 4 : 10); l++) {
var la = R() * Math.PI * 2, lr = R() * 1.8;
var lp = mmCyl(G, lily, 0.32, 0.32, 0.02, -5.2 + Math.cos(la) * lr, 0.1, 4.6 + Math.sin(la) * lr * 0.6, 0, 0, 0, 10);
if (!lite && l % 3 === 0)
mmEll(G, mmInMat(0xF8D8E8, null, { e: 0xF0B8D8, ei: 0.3 }), 0.1, 0.08, 0.1, lp.position.x, 0.17, lp.position.z, 6);
}
var mc = [mmInMat(0x80F0E0, null, { e: 0x206A60, ei: 0.9 }), mmInMat(0xE070C8, null, { e: 0x6A2060, ei: 0.9 })];
for (var mu = 0; mu < (lite ? 8 : 34); mu++) {
var ma = R() * Math.PI * 2, md = 7.5 + R() * 4.6, mx = Math.cos(ma) * md, mz = Math.sin(ma) * md;
if (!free(mx, mz))
continue;
var mh = 0.15 + R() * 0.3;
mmCyl(G, mmInMat(0xE8E0D0, null), 0.03, 0.05, mh, mx, mh / 2, mz, 0, 0, 0, 5);
var cap = mmEll(G, mc[mu % 2], 0.16 + R() * 0.1, 0.08, 0.16 + R() * 0.1, mx, mh, mz, 8);
}
if (!lite) {
var mp = [];
for (var q = 0; q < 120; q++) {
var qa = R() * Math.PI * 2, qd = 2 + R() * (cr - 3);
mp.push(Math.cos(qa) * qd, 0.8 + R() * 5, Math.sin(qa) * qd);
}
var mg = new THREE.BufferGeometry();
mg.setAttribute("position", new THREE.Float32BufferAttribute(mp, 3));
var motes = new THREE.Points(mg, new THREE.PointsMaterial({ color: 0xFFF0B0, size: 0.09, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
G.add(motes);
ASH_IN.motes = motes;
}
},
function (w, h) {
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d"), R = wRand(777);
var gr = x.createLinearGradient(0, 0, 0, h);
gr.addColorStop(0, "#040A18");
gr.addColorStop(1, "#081430");
x.fillStyle = gr;
x.fillRect(0, 0, w, h);
x.strokeStyle = "rgba(90,190,255,0.16)";
x.lineWidth = 1;
for (var gx = 0; gx < w; gx += 48) {
x.beginPath();
x.moveTo(gx, 0);
x.lineTo(gx, h);
x.stroke();
}
for (var gy = 0; gy < h; gy += 48) {
x.beginPath();
x.moveTo(0, gy);
x.lineTo(w, gy);
x.stroke();
}
for (var i = 0; i < w * h / 700; i++) {
x.fillStyle = "rgba(" + (150 + R() * 100 | 0) + "," + (210 + R() * 45 | 0) + ",255," + (0.4 + R() * 0.6).toFixed(2) + ")";
var sz = R() < 0.05 ? 2.4 : 1.1;
x.fillRect(R() * w, R() * h, sz, sz);
}
var cx = w * 0.5, cy = h * 0.55;
x.strokeStyle = "rgba(140,220,255,0.55)";
x.lineWidth = 2;
[0.09, 0.16, 0.24, 0.33, 0.43].forEach(function (r, i) {
x.beginPath();
x.ellipse(cx, cy, w * r, h * r * 0.9, 0, 0, Math.PI * 2);
x.stroke();
var a = 1 + i * 1.7, px = cx + Math.cos(a) * w * r, py = cy + Math.sin(a) * h * r * 0.9;
x.fillStyle = ["#FFD890", "#8AD0FF", "#E8A070", "#D8B088", "#B8A8FF"][i];
x.beginPath();
x.arc(px, py, 6 + i * 2.5, 0, Math.PI * 2);
x.fill();
});
var sg = x.createRadialGradient(cx, cy, 0, cx, cy, 40);
sg.addColorStop(0, "rgba(255,240,190,1)");
sg.addColorStop(1, "rgba(255,200,120,0)");
x.fillStyle = sg;
x.fillRect(cx - 40, cy - 40, 80, 80);
x.strokeStyle = "rgba(200,170,255,0.6)";
x.setLineDash([10, 8]);
x.beginPath();
x.moveTo(w * 0.08, h * 0.8);
x.quadraticCurveTo(w * 0.3, h * 0.2, w * 0.62, h * 0.4);
x.lineTo(w * 0.92, h * 0.18);
x.stroke();
x.setLineDash([]);
x.strokeStyle = "rgba(120,230,255,0.5)";
for (var c = 0; c < 7; c++) {
var sx = R() * w, sy = R() * h * 0.8;
x.beginPath();
x.moveTo(sx, sy);
for (var k = 0; k < 4; k++) {
sx += (R() - 0.5) * 120;
sy += (R() - 0.5) * 80;
x.lineTo(sx, sy);
x.fillStyle = "#E8F8FF";
x.fillRect(sx - 2, sy - 2, 4, 4);
}
x.stroke();
}
x.fillStyle = "rgba(60,160,230,0.25)";
x.fillRect(0, 0, w, 26);
x.fillRect(0, h - 26, w, 26);
x.fillStyle = "rgba(170,230,255,0.85)";
for (var b = 0; b < w; b += 22) {
x.fillRect(b, 8, 12, 10 * (0.3 + R() * 0.7));
x.fillRect(b, h - 18, 12, 10 * (0.3 + R() * 0.7));
}
var t = new THREE.CanvasTexture(cv);
t.encoding = THREE.sRGBEncoding;
return t;
},
function (G, o) {
var BC = o.BC, BR = o.BR, BH = o.BH, lite = o.lite, L = o.wa1 - o.wa0, t0 = Math.PI / 2 - o.wa1, SR = BR - 0.85, SH = BH - 1.6, sy = 0.8 + SH / 2;
o.HO.scale.setScalar(1.9);
o.HO.position.y = 4.1;
o.beam.scale.set(1.3, 1.7, 1.3);
o.beam.position.y = 3.3;
var plate = document.createElement("canvas");
plate.width = 512;
plate.height = 256;
var px = plate.getContext("2d");
px.fillStyle = "#3A3646";
px.fillRect(0, 0, 512, 256);
for (var r = 0; r < 256; r += 32) {
px.fillStyle = "#2A2834";
px.fillRect(0, r, 512, 3);
px.fillStyle = "#4A4658";
px.fillRect(0, r + 3, 512, 1);
}
for (var c = 0; c < 512; c += 64) {
px.fillStyle = "#2E2C38";
px.fillRect(c, 0, 2, 256);
}
var pt = new THREE.CanvasTexture(plate);
pt.wrapS = pt.wrapT = THREE.RepeatWrapping;
pt.repeat.set(3, 2);
var outer = new THREE.MeshStandardMaterial({ color: 0x8A84A0, map: pt, roughness: 0.5, metalness: 0.6, side: THREE.FrontSide });
var chart = ashChart(lite ? 1024 : 2048, lite ? 256 : 512), halves = [];
[0, 1].forEach(function (h) {
var S = new THREE.Group();
S.position.set(0, 0, BC);
G.add(S);
var th = t0 + h * L / 2;
var back = new THREE.Mesh(new THREE.CylinderGeometry(SR + 0.06, SR + 0.06, SH, lite ? 10 : 24, 1, true, th, L / 2), outer);
back.position.y = sy;
S.add(back);
var ct = chart.clone();
ct.needsUpdate = true;
ct.repeat.set(0.5, 1);
ct.offset.set(h ? 0 : 0.5, 0);
var face = new THREE.Mesh(new THREE.CylinderGeometry(SR, SR, SH, lite ? 10 : 24, 1, true, th, L / 2), new THREE.MeshBasicMaterial({ map: ct, side: THREE.BackSide, toneMapped: false, color: 0xC8D8F0 }));
face.position.y = sy;
S.add(face);
var ea = h ? th : th + L / 2, edge = new THREE.Mesh(new THREE.BoxGeometry(0.12, SH, 0.12), mmInMat(0x6AD8FF, null, { e: 0x3AA8E8, ei: 0.8 }));
edge.position.set(Math.sin(ea) * (SR - 0.02), sy, Math.cos(ea) * (SR - 0.02));
S.add(edge);
halves.push(S);
});
[0.75, 0.8 + SH + 0.05].forEach(function (y) { var RG = new THREE.Group(); RG.position.set(0, y, BC); RG.rotation.y = t0 + 1.5 * L - Math.PI / 2; G.add(RG); var rl = new THREE.Mesh(new THREE.TorusGeometry(SR + 0.15, 0.08, 6, lite ? 32 : 64, 2 * L), o.steel); rl.rotation.x = Math.PI / 2; RG.add(rl); });
var FR = new THREE.Group();
FR.position.set(0, 0, BC);
FR.visible = false;
G.add(FR);
var pts = [], Rq = wRand(612), N = lite ? 700 : 2600;
for (var i = 0; i < N; i++) {
var a = Rq() * Math.PI * 2, d = 1.5 + Math.pow(Rq(), 0.6) * (BR - 1.4), y = 0.6 + Rq() * (BH - 1.2);
pts.push(Math.cos(a) * d, y, Math.sin(a) * d);
}
var pg = new THREE.BufferGeometry();
pg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
FR.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x9ACCF0, size: 0.06, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending })));
var ring = new THREE.MeshBasicMaterial({ color: 0xB8A8FF, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending });
var sun = new THREE.Mesh(new THREE.SphereGeometry(0.7, 20, 14), new THREE.MeshBasicMaterial({ color: 0xC8A060, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }));
sun.position.y = 4.2;
FR.add(sun);
var halo = new THREE.Mesh(new THREE.SphereGeometry(1.3, 20, 14), new THREE.MeshBasicMaterial({ color: 0xC88840, transparent: true, opacity: 0.08, depthWrite: false, blending: THREE.AdditiveBlending }));
halo.position.y = 4.2;
FR.add(halo);
var orbs = [];
[[3.4, 0xFFD890, 0.25], [5.0, 0x8AD0FF, 0.35], [6.8, 0xE8A070, 0.3], [8.6, 0xD8B088, 0.7], [10.0, 0xB8A8FF, 0.5]].forEach(function (p, i) {
var rg = new THREE.Mesh(new THREE.TorusGeometry(p[0], 0.015, 4, lite ? 48 : 120), ring);
rg.rotation.x = Math.PI / 2 + (i % 2 ? 0.05 : -0.04);
rg.position.y = 4.2;
FR.add(rg);
var m = new THREE.Mesh(new THREE.SphereGeometry(p[2], 16, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(p[1]).multiplyScalar(0.6), transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }));
FR.add(m);
if (i === 3) {
var bd = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.05, 4, 48), ring);
bd.rotation.x = Math.PI / 2.4;
m.add(bd);
}
orbs.push({ m: m, r: p[0], a: i * 1.3, s: 0.09 - i * 0.012 });
});
var gm = new THREE.Mesh(new THREE.RingGeometry(2.2, BR - 0.4, lite ? 32 : 64, 8), new THREE.MeshBasicMaterial({ color: 0x4AA8E8, wireframe: true, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending }));
gm.rotation.x = -Math.PI / 2;
gm.position.y = 0.05;
FR.add(gm);
if (!lite)
[[-5, 7, -4, 0x9A6AE8], [6, 6.5, -3, 0x4A8AE8], [0, 7.5, 5, 0xE87AB8]].forEach(function (n) { var sp = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 8), new THREE.MeshBasicMaterial({ color: n[3], transparent: true, opacity: 0.07, depthWrite: false, blending: THREE.AdditiveBlending })); sp.position.set(n[0], n[1], n[2]); sp.scale.set(1.6, 0.6, 1.2); FR.add(sp); });
var ped = function (x, z, label, col) {
var P = mmG(G, x, 0, z);
mmCyl(P, o.dark, 0.32, 0.42, 1.05, 0, 0.52, 0, 0, 0, 0, 16);
mmCyl(P, o.steel, 0.4, 0.4, 0.06, 0, 1.07, 0, 0, 0, 0, 16);
var k = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 20), mmInMat(col, null, { e: col, ei: 0.7 }));
k.position.y = 1.12;
P.add(k);
o.solR(x, z, 0.45);
return P;
};
var PZ = BC + 6.4;
ped(-3.4, PZ + 0.8, "shutter", 0x6AD8FF);
ped(3.4, PZ + 0.8, "holo", 0xC8A8FF);
var st = ASH_IN.shut = { v: 1, want: 1 };
MMI.spots.push({ x: -3.4, z: PZ + 0.8, r: 1.5, label: "🪟 <b>The great window</b> · <b>press E</b> to slide the shutter open or closed",
fn: function () { st.want = st.want > 0.5 ? 0 : 1; mmSay(st.want ? "The shutter slides open: the stars beyond the great window." : "The shutter slides closed: the star chart lights across it."); } });
MMI.spots.push({ x: 3.4, z: PZ + 0.8, r: 1.5, label: "🌌 <b>The hologram</b> · <b>press E</b> to fill the whole room with it, or bring it back to the table",
fn: function () { FR.visible = !FR.visible; o.HT.children.forEach(function (c) { if (c === o.beam || c === o.HO)
c.visible = !FR.visible; }); mmSay(FR.visible ? "The star map fills the Holobridge." : "The hologram gathers back over the table."); } });
ASH_IN.tickMore = function (dt) {
if (st.v !== st.want) {
var d = st.want - st.v, step = dt * 0.4;
st.v = Math.abs(d) < step ? st.want : st.v + Math.sign(d) * step;
}
var e = st.v * st.v * (3 - 2 * st.v);
halves[0].rotation.y = -L / 2 * e;
halves[1].rotation.y = L / 2 * e;
if (FR.visible) {
FR.rotation.y += dt * 0.015;
orbs.forEach(function (p) { p.a += dt * p.s; p.m.position.set(Math.cos(p.a) * p.r, 4.2, Math.sin(p.a) * p.r); });
}
};
ASH_IN.tickMore(0);
orbs.forEach(function (p) { p.m.position.set(Math.cos(p.a) * p.r, 4.2, Math.sin(p.a) * p.r); });
ASH_IN.room = FR;
ASH_IN.halves = halves;
},
function (G, list, lite, seed) {
var R = wRand(seed || 1), tex = function (k) { try {
var t = texOf(k);
return t || null;
}
catch (e) {
return null;
} };
var fol = tex("foliage"), bk = tex("bark");
var mk = function (map, shine) { var m = lite ? new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: map }) : new THREE.MeshStandardMaterial({ color: 0xFFFFFF, map: map, roughness: 0.9, metalness: 0 }); return m; };
var barkM = lite ? new THREE.MeshLambertMaterial({ color: 0x6A5038, map: bk }) : new THREE.MeshStandardMaterial({ color: 0x6A5038, map: bk, roughness: 0.95 });
var blobG = new THREE.IcosahedronGeometry(1, lite ? 0 : 1), limbG = new THREE.CylinderGeometry(0.5, 1, 1, 6, 1), tierG = new THREE.ConeGeometry(1, 1, lite ? 7 : 11, 1);
var blobs = [], limbs = [], tiers = [], strands = [];
var greens = [0x2E6A2A, 0x3A7A30, 0x4A8A3A, 0x356F2C, 0x5A9A44], pinks = [0xF2B0CC, 0xE890B4, 0xF8D8E4, 0xF4C4D8, 0xFFFFFF], pines = [0x1E4A26, 0x24562C, 0x2C6232];
list.forEach(function (T) {
var h = T.h, tr = T.kind === "pine" ? 0.17 : 0.2;
mmCyl(G, barkM, tr * 0.55, tr, h, T.x, h / 2, T.z, 0, 0, 0, lite ? 6 : 9);
if (T.kind === "willow") {
var ns = lite ? 24 : 90;
for (var w = 0; w < ns; w++) {
var wa = R() * Math.PI * 2, wd = 0.5 + R() * 1.5, L2 = 1.6 + R() * 1.6;
strands.push({ x: T.x + Math.cos(wa) * wd, y: h + 0.7 - L2 / 2 - (wd * 0.15), z: T.z + Math.sin(wa) * wd, s: [0.06, L2, 0.06], ry: R() * 6, c: greens[(R() * 5) | 0] });
}
for (var wb = 0; wb < (lite ? 4 : 9); wb++) {
var u2 = R() * Math.PI * 2, d2 = R() * 1.3;
blobs.push({ x: T.x + Math.cos(u2) * d2, y: h + 0.6 + R() * 0.4, z: T.z + Math.sin(u2) * d2, s: [0.8, 0.45, 0.8], ry: R() * 6, c: 0x7AAA4A });
}
return;
}
if (T.kind === "pine") {
var nt = lite ? 3 : 5;
for (var k = 0; k < nt; k++) {
var f = k / nt, rr = (1.5 - f * 1.1) * (0.9 + R() * 0.2), hh = 1.5 - f * 0.5;
tiers.push({ x: T.x, y: h * 0.45 + f * h * 0.95 + hh / 2, z: T.z, s: [rr, hh, rr], ry: R() * 6, c: pines[k % 3] });
}
return;
}
var nl = lite ? 2 : 4, crown = T.kind === "blossom" ? 1.7 : 1.9;
for (var l = 0; l < nl; l++) {
var a = l / nl * Math.PI * 2 + R(), L = 1.3 + R() * 0.5;
limbs.push({ x: T.x + Math.cos(a) * L * 0.32, y: h - 0.15 + L * 0.38, z: T.z + Math.sin(a) * L * 0.32, s: [0.09, L, 0.09], rz: -Math.cos(a) * 0.85, rx: Math.sin(a) * 0.85 });
}
var nb = lite ? 6 : 16, cy = h + crown * 0.55;
for (var b = 0; b < nb; b++) {
var u = R() * 2 - 1, v = R() * Math.PI * 2, d = Math.cbrt(R()) * crown * 0.85, sx = Math.sqrt(1 - u * u);
var bx = T.x + sx * Math.cos(v) * d, by = cy + u * d * 0.62, bz = T.z + sx * Math.sin(v) * d, sc = (0.55 + R() * 0.35) * crown * 0.5 * (1.25 - d / crown * 0.5);
blobs.push({ x: bx, y: by, z: bz, s: [sc, sc * 0.82, sc], ry: R() * 6, c: T.kind === "blossom" ? pinks[(R() * pinks.length) | 0] : greens[(R() * greens.length) | 0] });
}
});
var inst = function (geo, mat, arr) {
if (!arr.length)
return;
var M = new THREE.InstancedMesh(geo, mat, arr.length), d = new THREE.Object3D(), c = new THREE.Color();
arr.forEach(function (q, i) { d.position.set(q.x, q.y, q.z); d.rotation.set(q.rx || 0, q.ry || 0, q.rz || 0); d.scale.set(q.s[0], q.s[1], q.s[2]); d.updateMatrix(); M.setMatrixAt(i, d.matrix); if (q.c != null && M.setColorAt) {
c.setHex(q.c);
M.setColorAt(i, c);
} });
M.instanceMatrix.needsUpdate = true;
if (M.instanceColor)
M.instanceColor.needsUpdate = true;
M.frustumCulled = false;
G.add(M);
return M;
};
inst(blobG, mk(fol), blobs);
inst(limbG, barkM, limbs);
inst(tierG, mk(fol), tiers);
inst(new THREE.BoxGeometry(1, 1, 1), mk(fol), strands);
},
function (k) {
if (!mmKeeper())
return;
var place = mmWhere();
if (!place) {
mmSay("Stand outdoors somewhere first.");
return;
}
var L = mmL(), d = MM.list[k], a = yaw, x = L.x - Math.sin(a) * (d.r + 8), z = L.z - Math.cos(a) * (d.r + 8), y = mmGround(x, z);
mmRpc("keeper_mythic_move", { p_key: k, p_place: place, p_x: +x.toFixed(2), p_y: +y.toFixed(2), p_z: +z.toFixed(2), p_yaw: +(a + Math.PI).toFixed(3) }).then(function (o) {
mmSay(mmEsc((o && o.say) || "Moved."));
MM.rowsAt = -99;
}).catch(function (e) { mmSay(mmMissing(e) ? "The Keeper's machine controls aren't open yet (an update to run)." : "Couldn't reach the city."); });
},
function (k) {
var place = mmWhere();
if (!place) {
mmSay("Stand outdoors somewhere first: a world, a planet, the city or a dream land.");
return;
}
if (MM.ride) {
mmSay("Climb out first.");
return;
}
var d = MM.list[k], L = mmL(), a = yaw, best = null;
for (var q = 0; q < 6 && !best; q++) {
var dist = d.r + 6 + q * 4, x = L.x - Math.sin(a) * dist, z = L.z - Math.cos(a) * dist, y = mmGround(x, z);
if (y > -500 && !mmBlockL(x, z, y))
best = { x: x, z: z, y: y };
}
if (!best) {
mmSay("There's no room for it here. Try somewhere more open.");
return;
}
mmRpc("mythic_park", { p_key: k, p_place: place, p_x: +best.x.toFixed(2), p_y: +best.y.toFixed(2), p_z: +best.z.toFixed(2), p_yaw: +(a + Math.PI).toFixed(3) }).then(function (o) {
if (o && o.ok === false) {
mmSay(mmEsc(o.say || "Not now."));
return;
}
var r = MM.rows[k] = MM.rows[k] || { k: k };
r.k = k;
r.owner = mmMe();
r.here = true;
r.riding = false;
r.hidden = false;
r.place = place;
r.x = best.x;
r.z = best.z;
r.y = best.y;
r.yaw = a + Math.PI;
MM.rowsOk = true;
mmTone(392, 0.3);
mmSay("<b>" + mmEsc(d.name) + "</b> comes to you" + (d.fly ? ", settling down out of the sky" : ", ground shaking") + ".");
MM.mineAt = -99;
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
}).catch(function (e) { mmSay(mmMissing(e) ? "Calling it isn't open yet. Come back soon." : "Couldn't reach the city."); });
},
function (g, row) {
var k = row && !row.away && row.look && row.look.mm;
if (!k)
return;
var tag = g.userData.tag;
g.children.forEach(function (c) { if (c !== tag)
c.visible = false; });
if (k === "crew")
return;
var d = k === "sovereign" ? MM_SOV : MM.list[k], B;
if (!d)
return;
B = k === "sovereign" ? mmSovAssembled() : (MM_BUILD[k] ? MM_BUILD[k]() : null);
if (!B)
return;
var m = new THREE.Group();
m.add(B.g);
m.position.set(-B.seat[0], 0, -B.seat[1]);
g.add(m);
g.userData.mmMach = m;
m.userData.noCull = 1;
if (tag)
tag.position.y = Math.max(tag.position.y, (B.h || 10) + 1.5);
},
function () {
var mine = MM.mine || [], seen = mmCluesSeen(), clues = MM_DEF.filter(function (d) { return seen[d.k]; }), K = mmKeeper() && MM.klist;
if (!mine.length && !clues.length && !K)
return "";
var row = function (inner, btns) { return '<div style="display:flex;align-items:center;gap:6px;padding:3px 0;flex-wrap:wrap"><span style="flex:1 1 180px">' + inner + '</span>' + (btns || "") + '</div>'; };
var b = function (fn, t) { return '<button class="btn" onclick="' + fn + '">' + t + '</button>'; };
var x = '<div style="margin-top:8px"><b>⚜️ Mythic machines</b> <span style="opacity:.7">one of each in the universe, never sold</span></div>';
mine.forEach(function (r) {
var d = MM.list[r.k];
if (!d)
return;
x += row(mmEsc(d.icon) + " " + mmEsc(d.name) + ' <span style="opacity:.7">' + (r.riding ? "with you" : "in " + mmEsc(mmPlaceName(r.place))) + '</span>', b("mmCallHere('" + d.k + "')", "Call it here") + b("mmAbout('" + d.k + "')", "About") + b("mmReleaseCard('" + d.k + "')", "Send back"));
});
if (mine.length && mmMineAll())
x += '<div style="opacity:.85;padding:2px 0">You hold all six beasts: climb into one and choose ⚜️ Unite.</div>';
if (clues.length) {
x += '<div style="opacity:.8;margin-top:4px">Clues you have found</div>';
clues.forEach(function (d) { x += row("📜 " + mmEsc(d.clue[1].slice(0, 90)) + (d.clue[1].length > 90 ? "…" : ""), b("mmClueCard(MM.list['" + d.k + "'])", "Read")); });
}
if (K) {
x += '<div style="opacity:.8;margin-top:6px">The Keeper: every machine</div>';
K.forEach(function (r) {
var d = MM.list[r.k];
if (!d)
return;
x += row(mmEsc(d.icon) + " " + mmEsc(d.short) + ' <span style="opacity:.7">' + mmEsc(mmPlaceName(r.place)) + (r.x == null ? ", hidden" : "") + (r.owner_name ? ", " + mmEsc(r.owner_name) + "'s" : ", unclaimed") + '</span>', b("mmKeeperGo('" + d.k + "')", "Go there") + b("mmKeeperHere('" + d.k + "')", "Here") + b("mmKeeperReset('" + d.k + "')", "Hide"));
});
}
return x;
},
function (k) {
var d = MM.list[k];
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
worldCard(worldFacts(d.name, d.part ? "In the Mythic Sovereign: the " + d.part : "", [["Pace", d.spd + " times a walk" + (d.fly ? ", and it flies" : "")], ["Arms", d.gun + ", " + mmPower(d) + " a shot"], ["Inside", d.rooms.join(", ")]], [d.about]), {});
},
function (k) {
if (!mmKeeper())
return;
var r = (MM.klist || []).filter(function (q) { return q.k === k; })[0], d = MM.list[k], place = r ? r.place : d.at;
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
if (/^land_/.test(place)) {
mmSay("It stands in a dream land (" + mmEsc(mmPlaceName(place)) + "): go there by the Atlas.");
return;
}
var planet = ["mars", "pluto", "moon", "veyar", "venus", "mercury", "earth", "jupiter", "saturn", "uranus", "neptune", "ceres", "titan", "europa", "io", "enceladus"].indexOf(place) >= 0;
if (place === "city") {
if (typeof WLD !== "undefined" && WLD.on)
worldHome();
}
else if (planet)
worldGo("surface", { k: place });
else if (WORLDS[place])
worldGo(place, {});
else {
mmSay("Can't go there from here.");
return;
}
MM.kgo = { k: k, place: place, r: r, t: 0 };
},
function (dt) {
var G = MM.kgo;
if (!G)
return;
G.t += dt;
if (G.t > 20) {
MM.kgo = null;
return;
}
if (MM.place !== G.place || G.t < 0.6)
return;
if (G.place === "sea" && typeof seaAshore === "function" && !(G.r && G.r.x != null)) {
try {
seaAshore(MM_ISLE);
}
catch (e) { }
}
var d = MM.list[G.k], S = G.r && G.r.x != null ? { x: +G.r.x, z: +G.r.z } : mmHideSpot(d), b = mmBase();
if (!b)
return;
var x = S.x + d.r + 6, z = S.z + d.r + 6, y = mmGround(x, z);
camera.position.set(b.x + x, y + 1.72, b.z + z);
yaw = Math.atan2(x - S.x, z - S.z);
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
mmSay("<b>" + mmEsc(d.name) + "</b> is just ahead.");
MM.kgo = null;
},
function (g, w, y0, y1, z, holes, mat) {
var s = new THREE.Shape();
s.moveTo(-w / 2, y0);
s.lineTo(w / 2, y0);
s.lineTo(w / 2, y1);
s.lineTo(-w / 2, y1);
s.lineTo(-w / 2, y0);
holes.forEach(function (h) {
var p = new THREE.Path();
if (h.r) {
p.absellipse(h.x, h.y, h.r, h.ry || h.r, 0, Math.PI * 2, true);
}
else {
var x0 = h.x - h.w / 2, x1 = h.x + h.w / 2, a = h.y - h.h / 2, b = h.y + h.h / 2, c = Math.min(h.c || 0, h.h / 2.1);
p.moveTo(x0 + c, a);
p.lineTo(x1 - c, a);
p.quadraticCurveTo(x1, a, x1, a + c);
p.lineTo(x1, b - c);
p.quadraticCurveTo(x1, b, x1 - c, b);
p.lineTo(x0 + c, b);
p.quadraticCurveTo(x0, b, x0, b - c);
p.lineTo(x0, a + c);
p.quadraticCurveTo(x0, a, x0 + c, a);
}
s.holes.push(p);
});
var m = new THREE.Mesh(new THREE.ShapeGeometry(s, vcpLite() ? 6 : 16), mat);
m.position.z = z;
g.add(m);
return m;
},
function (g, holes, z, tint) {
if (vcpLite())
return;
var mat = new THREE.MeshBasicMaterial({ color: tint || 0x9ABACC, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.DoubleSide });
holes.forEach(function (h) {
var geo = h.r ? new THREE.CircleGeometry(1, 24) : new THREE.PlaneGeometry(1, 1);
var m = new THREE.Mesh(geo, mat);
if (h.r)
m.scale.set(h.r, h.ry || h.r, 1);
else
m.scale.set(h.w, h.h, 1);
m.position.set(h.x, h.y, z - 0.01);
g.add(m);
});
},
function (viewK) {
var lite = vcpLite(), out = new THREE.Group(), g = new THREE.Group(), me = MM_SEAT[viewK] || [0, 0, 0];
out.add(g);
g.position.set(-me[0], -me[1], -me[2]);
var U = { hideRide: false, style: "mm:sovereign", view: viewK };
out.userData.vcp = U;
var gold = 0xE8C060, mFrame = vcpMat(0x6A5A3A, { r: 0.4, m: 0.6, lit: 0.22, side: THREE.DoubleSide }), mWall = vcpMat(0x2A241C, { map: vcpGrain("soft"), r: 0.8, lit: 0.22, side: THREE.DoubleSide }), mFloor = vcpMat(0x1A1612, { map: vcpGrain("carbon"), r: 0.6, lit: 0.2 }), mTrim = vcpGlow(new THREE.Color(gold).multiplyScalar(0.65)), mSeat = vcpMat(0x3A1E1A, { map: vcpGrain("soft"), r: 0.7, lit: 0.22 }), mDark = vcpMat(0x101216, { r: 0.5, lit: 0.15 });
var FL = -1.25, RF = 1.3, FZ = -0.7, BZ = 3.3, SX = 2.0;
var holes = [{ x: 0, y: 0.32, w: 1.6, h: 1.0, c: 0.12 }, { x: -1.32, y: 0.3, w: 0.78, h: 0.9, c: 0.1 }, { x: 1.32, y: 0.3, w: 0.78, h: 0.9, c: 0.1 }];
mmPitWall(g, SX * 2, FL, RF, FZ, holes, mFrame);
mmPitGlass(g, holes, FZ, 0xF0E0B0);
holes.forEach(function (h) { vcpBox(g, h.w, 0.012, 0.012, mTrim, h.x, h.y + h.h / 2 + 0.03, FZ + 0.02); });
var seal = vcpCanvas(256, 96), sx = seal.x;
sx.fillStyle = "#1A1612";
sx.fillRect(0, 0, 256, 96);
sx.fillStyle = "#E8C060";
sx.textAlign = "center";
sx.textBaseline = "middle";
sx.font = "600 30px Georgia,serif";
sx.fillText("⚜ SOVEREIGN ⚜", 128, 48);
seal.t.needsUpdate = true;
vcpFace(g, seal, 0.6, 0.22, 0, 1.0, FZ + 0.03, 0, 0);
[-1, 1].forEach(function (s) {
var w = new THREE.Group();
w.position.set(s * SX, 0, (FZ + BZ) / 2);
w.rotation.y = -s * Math.PI / 2;
g.add(w);
var sh = [{ x: s * -0.6, y: 0.25, w: 1.1, h: 0.7, c: 0.08 }];
mmPitWall(w, BZ - FZ, FL, RF, 0, sh, mWall);
mmPitGlass(w, sh, 0.005, 0xF0E0B0);
});
vcpBox(g, SX * 2, RF - FL, 0.04, mWall, 0, (FL + RF) / 2, BZ);
vcpBox(g, SX * 2, 0.04, BZ - FZ, mWall, 0, RF, (FZ + BZ) / 2);
vcpBox(g, SX * 2, 0.04, BZ - FZ, mFloor, 0, FL, (FZ + BZ) / 2);
vcpBox(g, 3.6, 0.3, 1.0, mFloor, 0, FL + 0.15, 1.95);
vcpBox(g, 1.6, 0.8, 0.9, mFloor, 0, FL + 0.4, 2.85);
var mLine = vcpGlow(0x8A7038);
[-1, 1].forEach(function (s) { vcpBox(g, 0.012, 0.012, BZ - FZ, mLine, s * 1.2, RF - 0.03, (FZ + BZ) / 2); });
U.consoles = {};
Object.keys(MM_SEAT).forEach(function (k) {
var p = MM_SEAT[k], S = new THREE.Group();
S.position.set(p[0], p[1], p[2]);
g.add(S);
var d = MM.list[k], col = d.col, mCol = vcpMat(col, { r: 0.4, m: 0.3, lit: 0.35 }), mGl = vcpGlow(col);
vcpBox(S, 0.52, 0.1, 0.5, mSeat, 0, -0.8, 0.2);
vcpBox(S, 0.52, 0.72, 0.1, mSeat, 0, -0.42, 0.48);
vcpBox(S, 0.56, 0.04, 0.04, mCol, 0, -0.06, 0.48);
vcpCyl(S, 0.05, 0.07, 0.36, mDark, 0, -1.05, 0.2);
var desk = k === "blazehorn" ? null : vcpBox(S, 0.84, 0.06, 0.36, mWall, 0, -0.42, -0.5, -0.3);
if (k === "blazehorn") {
vcpProfile(S, [[0.68, -0.29], [0.58, -0.29], [0.42, -0.4], [0.42, -1.25], [0.68, -1.25]], -0.75, 0.75, mWall);
vcpBox(S, 1.3, 0.004, 0.006, mTrim, 0, -0.286, -0.6);
U.left = vcpCanvas(lite ? 256 : 512, lite ? 128 : 256);
U.right = vcpCanvas(lite ? 256 : 512, lite ? 128 : 256);
U.cluster = vcpCanvas(lite ? 384 : 768, lite ? 128 : 256);
vcpFace(S, U.left, 0.28, 0.14, -0.36, -0.25, -0.5, -0.55, 0.3);
vcpFace(S, U.right, 0.28, 0.14, 0.36, -0.25, -0.5, -0.55, -0.3);
vcpFace(S, U.cluster, 0.28, 0.093, 0, -0.25, -0.52, -0.55);
var sticks = new THREE.Group();
S.add(sticks);
if (viewK === "blazehorn")
U.wheel = sticks;
[-0.34, 0.34].forEach(function (x) {
vcpBox(S, 0.14, 0.06, 0.4, mWall, x, -0.68, -0.12);
vcpBeam(sticks, [x, -0.65, -0.25], [x, -0.52, -0.27], 0.03, 0.03, mFrame, true);
var top = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), mDark);
top.scale.set(1, 1.4, 1);
top.position.set(x, -0.5, -0.27);
sticks.add(top);
});
}
var cv = vcpCanvas(lite ? 256 : 512, lite ? 128 : 256);
U.consoles[k] = cv;
if (k === "blazehorn")
vcpFace(S, cv, 0.22, 0.11, -0.62, -0.27, -0.42, -0.5, 0.7);
else
vcpFace(S, cv, 0.34, 0.17, 0, -0.28, -0.66, -0.35, 0);
mmBridgePaint(cv, k);
if (k !== "blazehorn") {
var sp = MM_SPECIAL[k].kind;
if (sp === "sword") {
vcpBeam(S, [0.26, -0.44, -0.46], [0.26, -0.3, -0.48], 0.025, 0.025, mCol, true);
vcpBox(S, 0.14, 0.02, 0.035, mFrame, 0.26, -0.4, -0.47);
}
else if (sp === "shield") {
var c = vcpCyl(S, 0.1, 0.1, 0.03, mCol, 0.26, -0.38, -0.45, Math.PI / 2 - 0.3, 0, 0, lite ? 12 : 24);
}
else if (sp === "volley") {
[-0.06, 0, 0.06].forEach(function (o) { vcpCyl(S, 0.014, 0.014, 0.09, mCol, 0.26 + o, -0.4, -0.48, -0.3, 0, 0, 8); });
}
else {
vcpBox(S, 0.18, 0.03, 0.24, mCol, 0.24, -0.98, -0.3, 0.25);
}
if (!lite)
vcpBox(S, 0.05, 0.05, 0.05, mGl, -0.28, -0.38, -0.44);
}
});
U.paint = function (R) {
if (U.left) {
vcpPaintMech(U.left, R, "left", "#F0D080");
vcpPaintMech(U.right, R, "right", "#F0D080");
vcpPaintFlight(U.cluster, { mph: R.mph || 0, vmaxMph: 60, alt: 0, climb: 0 }, { bezel: "#F0D080", needle: "#F0D080" });
}
if (U.consoles[U.view])
mmBridgePaint(U.consoles[U.view], U.view);
};
U.tick = function (dt) { if (U.wheel)
U.wheel.rotation.z = -(VCP.turnRate || 0) * 0.08; };
return out;
},
function (cv, k) {
var x = cv.x, W = cv.c.width, H = cv.c.height, S = MM_SPECIAL[k], d = MM.list[k], css = "#" + ("000000" + d.col.toString(16)).slice(-6);
x.fillStyle = "#08070A";
x.fillRect(0, 0, W, H);
x.strokeStyle = css;
x.lineWidth = 4;
x.strokeRect(4, 4, W - 8, H - 8);
x.textBaseline = "middle";
x.textAlign = "left";
x.fillStyle = "#F0E8D8";
x.font = "600 " + Math.round(H * 0.13) + "px Georgia,serif";
x.fillText(S.icon + " " + S.name.toUpperCase(), W * 0.06, H * 0.2);
x.fillStyle = "#BDB4A4";
x.font = "400 " + Math.round(H * 0.09) + "px system-ui,sans-serif";
x.fillText(d.short, W * 0.06, H * 0.38);
var st = mmSpecialState(k);
x.fillStyle = st.col;
x.font = "700 " + Math.round(H * 0.12) + "px system-ui,sans-serif";
x.fillText(st.say, W * 0.06, H * 0.62);
x.fillStyle = "#8D97A3";
x.font = "400 " + Math.round(H * 0.075) + "px system-ui,sans-serif";
x.fillText(S.act, W * 0.06, H * 0.84);
cv.t.needsUpdate = true;
},
function (k) {
var S = MM_SPECIAL[k], c = MM.cd[k] || 0;
if (k === "blazehorn")
return { say: MM.ride && MM.ride.k === "sovereign" ? "AT THE HELM" : "THE HELM", col: "#3EE07A" };
if (MM.act && MM.act.k === S.kind && MM.act.until > MM.t)
return { say: "ACTIVE " + Math.ceil(MM.act.until - MM.t) + " s", col: "#3EE07A" };
if (c > MM.t)
return { say: "READY IN " + Math.ceil(c - MM.t) + " s", col: "#E8C27A" };
return { say: "READY", col: "#3EE07A" };
},
function () {
var F = MM.form;
if (!F || !F.crewOf)
return;
var k = F.k, S = MM_SPECIAL[k];
if (!S || !S.kind)
return;
if ((MM.cd[k] || 0) > MM.t) {
mmSay(mmEsc(S.name) + " is ready in " + Math.ceil(MM.cd[k] - MM.t) + " seconds.");
return;
}
var armedOnly = S.kind !== "dash";
if (armedOnly && !mmArmed()) {
mmSay("The " + mmEsc(S.name.toLowerCase()) + " works only in Ironfray, where fighting is allowed.");
return;
}
MM.cd[k] = MM.t + S.cd;
var team = typeof bwMyTeam === "function" ? bwMyTeam() : "me", dir = bwAim(), cp = camera.position;
var shoot = function (from, dv, arm, dmg) { try {
bwShoot({ from: from, dir: dv, arm: arm, dmg: dmg, team: team, owner: "me" });
}
catch (e) { } };
if (S.kind === "sword") {
shoot(cp.clone().addScaledVector(dir, 6), dir, { p: "arcane", spd: 60, splash: 6, kind: "gun" }, mmPower(MM.list.rosehorn) * 3);
mmTone(220, 0.25);
}
else if (S.kind === "volley") {
[-0.08, 0, 0.08].forEach(function (o) { var dv = dir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), o); shoot(cp.clone().addScaledVector(dv, 5), dv, { p: "fire", spd: 95, splash: 5, kind: "gun" }, mmPower(MM.list.emberwing)); });
mmTone(140, 0.3);
}
else if (S.kind === "stomp") {
var f = new THREE.Vector3(Math.sin(yaw) * -14, 0, Math.cos(yaw) * -14);
var at = cp.clone().add(f);
at.y = cp.y - 20;
shoot(at, new THREE.Vector3(0, -1, 0), { p: "shell", spd: 40, splash: 10, kind: "gun" }, mmPower(MM.list.riddlecrown) * 2);
mmTone(70, 0.5);
}
else {
MM.act = { k: S.kind, until: MM.t + S.dur };
mmPub();
mmTone(S.kind === "shield" ? 330 : 520, 0.3);
mmSay(mmEsc(S.icon + " " + S.name) + ": " + mmEsc(S.does));
}
MM.hudKey = "";
},
function (dt, leaderG) {
var F = MM.form;
if (!F || !F.crewOf) {
mmBridgeCrewDrop();
return;
}
if (!MM.crewPit || MM.crewPit.userData.vcp.view !== F.k) {
mmBridgeCrewDrop();
var g = mmBridgeBuild(F.k);
g.rotation.order = "YXZ";
g.traverse(function (o) { if (o.isMesh) {
o.raycast = function () { };
o.castShadow = false;
o.frustumCulled = false;
} });
scene.add(g);
MM.crewPit = g;
}
var G = MM.crewPit;
G.position.copy(camera.position);
G.rotation.set(0, leaderG.rotation.y, 0);
G.visible = true;
if (MM.t - (MM.crewPaint || 0) > 0.25) {
MM.crewPaint = MM.t;
mmBridgePaint(G.userData.vcp.consoles[F.k], F.k);
}
if (MM.act && MM.act.until <= MM.t) {
MM.act = null;
mmPub();
MM.hudKey = "";
}
var m = leaderG.userData.mmMach;
if (m && MM.t - (MM.crewHideT || 0) > 1) {
MM.crewHideT = MM.t;
if (MM.crewHide)
mmShowAround(MM.crewHide);
MM.crewHide = { g: m };
mmHideAround(MM.crewHide);
}
},
function (W) {
var a = mpAim(), from = camera.position.clone();
try {
var d2 = bwAimAssist(a, from, 0.12, 220, W.M || null);
if (d2 && d2.angleTo(a) > 1e-4) {
var fs = bwFoesForMe(), best = null, bs = 1e9;
fs.forEach(function (o) { var v = new THREE.Vector3(o.x - from.x, o.y - from.y, o.z - from.z), d = v.length(); if (d < 1)
return; var ang = v.normalize().angleTo(d2); if (ang < 0.02 && d < bs) {
bs = d;
best = o;
} });
if (best)
return new THREE.Vector3(best.x, best.y, best.z);
}
}
catch (e) { }
var B = (typeof BW !== "undefined" ? BW.base : 0) || 0, p = from.clone();
for (var i = 0; i < 90; i++) {
p.addScaledVector(a, 2);
var gy = 0;
try {
gy = bwSupport(p.x - B, p.z, p.y);
}
catch (e) { }
if (p.y <= gy) {
p.y = gy;
return p;
}
}
return p;
},
function (W, c, r, dmg, o) {
o = o || {};
var B = BW.base, n = 0;
try {
bwFoesForMe().forEach(function (f) {
var dx = f.x - c.x, dz = f.z - c.z, d = Math.hypot(dx, dz);
if (d > r + (f.r || 0))
return;
if (o.front) {
var a = mpAim();
if (dx * a.x + dz * a.z < 0)
return;
}
var h = dmg * (1 - 0.5 * d / (r + 1));
n++;
if (f.F)
bwHitF(f.F, h, { x: c.x - B, z: c.z, team: mpTeam(), me: true, slow: o.slow || 0, knock: o.knock || 0 });
else if (f.M)
bwMachHit(f.M, h, true);
else if (f.pvp)
bwPvpHit(f.pvp, h);
});
}
catch (e) { }
if (n && typeof bwHitMark === "function")
bwHitMark(false);
return n;
},
function (i) {
var W = mpWho();
if (!W)
return;
var list = MP_POW[W.k], pw = list && list[i];
if (!pw)
return;
var t = mpNow(), key = W.k + i;
if ((MP.cd[key] || 0) > t) {
mpSay(pw.i + " <b>" + mmEsc(pw.n) + "</b> is ready in " + Math.ceil(MP.cd[key] - t) + " seconds.");
return;
}
if (MP_HARMS[pw.k] && !W.armed) {
mpSay(pw.i + " <b>" + mmEsc(pw.n) + "</b> works only in Ironfray, where fighting is allowed.");
return;
}
MP.cd[key] = t + (pw.cd || 8);
var P = W.P * (pw.m || 1);
if (pw.k === "missiles") {
for (var n = 0; n < pw.num; n++)
MP.q.push({ at: t + n * 0.08, run: (function (n) {
return function () {
var a = mpAim(), side = (n % 2 ? 1 : -1) * (0.8 + (n % 4) * 0.4), from = mpFrom(W, side);
from.y += 0.8 + (n % 3) * 0.3;
try {
a = bwAimAssist(a, from, 0.2, 220, W.M || null);
}
catch (e) { }
var dir = a.clone();
dir.x += (Math.random() - 0.5) * 0.2;
dir.y += 0.04 + Math.random() * 0.08;
dir.z += (Math.random() - 0.5) * 0.2;
dir.normalize();
var s = mpShoot(W, from, dir, { p: pw.p, spd: 48, splash: pw.splash || 3.5, slow: pw.slow || 0, kind: "gun" }, P);
if (s) {
s.life = s.life0 = Math.max(s.life, 4.5);
MP.homing.push({ s: s, t: 0 });
}
};
})(n) });
mmTone(260, 0.25);
}
else if (pw.k === "beam") {
MP.act.beam = { until: t + pw.dur, next: 0, W: W, pw: pw, P: P };
}
else if (pw.k === "lance") {
var a = mpAim(), from = mpFrom(W, 0);
try {
a = bwAimAssist(a, from, 0.08, 240, W.M || null);
}
catch (e) { }
mpShoot(W, from, a, { p: pw.p, spd: pw.spd || 200, splash: pw.splash || 0, pierce: pw.pierce || 0, slow: pw.slow || 0, kind: "gun" }, P);
mmTone(90, 0.4);
}
else if (pw.k === "chain") {
for (var c = 0; c < pw.num; c++)
MP.q.push({ at: t + c * 0.18, run: function () {
var a = mpAim(), from = mpFrom(W, 0);
try {
a = bwAimAssist(a, from, 0.12, 200, W.M || null);
}
catch (e) { }
mpShoot(W, from, a, { p: pw.p, spd: 150, splash: 2, chain: pw.chain, kind: "gun" }, P);
mmTone(660, 0.12);
} });
}
else if (pw.k === "barrage") {
var at = mpAimPoint(W);
for (var b = 0; b < pw.num; b++)
MP.q.push({ at: t + 0.3 + b * 0.12, run: function () {
var ang = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * pw.r;
var from = new THREE.Vector3(at.x + Math.cos(ang) * rr, at.y + 40, at.z + Math.sin(ang) * rr), dir = new THREE.Vector3((Math.random() - 0.5) * 0.04, -1, (Math.random() - 0.5) * 0.04).normalize();
mpShoot(W, from, dir, { p: pw.p, spd: 55, splash: pw.splash || 5, kind: "gun" }, P);
} });
mpRing(at, pw.r, 0xE8C27A, 1.6);
mmTone(120, 0.3);
}
else if (pw.k === "nova") {
var cn = mpCenter(W);
mpHitAround(W, cn, pw.r, P, { knock: pw.knock, slow: pw.slow });
mpRing(cn, pw.r, pw.col || 0xE8C27A, 0.9);
if (WLD.on === "battle")
try {
bwBoom(cn.x - BW.base, cn.y + 0.5, cn.z, Math.min(8, pw.r * 0.3), true);
}
catch (e) { }
mmTone(70, 0.5);
}
else if (pw.k === "shield") {
mpShieldOn(W, pw, t);
mmTone(330, 0.3);
}
else if (pw.k === "boost") {
if (MP.boost)
rideSpeed = MP.boost.was;
MP.boost = { until: t + pw.dur, was: rideSpeed, k: W.k };
rideSpeed = rideSpeed * pw.mul;
if (pw.ram && W.armed) {
var cr = mpCenter(W);
mpHitAround(W, cr, pw.ram.r, W.P * pw.ram.m, { knock: pw.ram.knock });
mpRing(cr, pw.ram.r, 0xF2C27A, 0.7);
}
mmTone(520, 0.3);
}
else if (pw.k === "mend") {
if (W.mm) {
var hp = mmHp(MM.ride.d);
MM.shield = Math.min(hp, MM.shield + hp * pw.pct);
}
else {
var M = W.M;
M.hp = Math.min(M.max, M.hp + M.max * pw.pct);
try {
bwBar(M.g, M.hp, M.max, M.T.bar, M.T.big ? 3 : 2);
}
catch (e) { }
}
mpRing(mpCenter(W), W.r * 1.6, 0x8AE0A0, 1.2);
mmTone(700, 0.4);
MM.hudKey = "";
}
else if (pw.k === "cloak") {
MP.cloak = t + pw.dur;
MP.cloakMul = pw.mul;
MP.cloakAura = pw.aura ? { pw: pw, W: W, next: 0 } : null;
try {
if (WLD.on === "battle") {
BW.f.forEach(function (F) { if (F.tgt === "me")
F.tgt = null; });
BW.mach.forEach(function (M) { if (M.tgt === "me")
M.tgt = null; });
}
}
catch (e) { }
mmTone(200, 0.4);
}
mpSay(pw.i + " <b>" + mmEsc(pw.n) + "</b>: " + mmEsc(pw.t));
MP.key = "";
},
function (c, r, col, life) {
try {
var m = new THREE.Mesh(new THREE.RingGeometry(0.86, 1, mmLiteRing()), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide }));
m.rotation.x = -Math.PI / 2;
m.position.set(c.x, c.y + 0.4, c.z);
m.scale.setScalar(1);
scene.add(m);
MP.fx.push({ m: m, t: 0, life: life || 1, r: r });
}
catch (e) { }
},
function (W, pw, t) {
mpShieldOff();
var R = W.r * (W.mm ? 1.25 : 1.6) + 2, m = new THREE.Mesh(new THREE.SphereGeometry(1, mmLiteRing(), Math.round(mmLiteRing() / 2)), new THREE.MeshBasicMaterial({ color: pw.col || 0x9AD0FF, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide }));
m.scale.setScalar(R);
m.renderOrder = 2;
scene.add(m);
MP.shield = { until: t + pw.dur, mul: pw.mul, m: m, W: W, pw: pw, R: R, next: 0 };
},
function () {
if (document.getElementById("mp-css"))
return;
var st = document.createElement("style");
st.id = "mp-css";
st.textContent =
"#mp-bar{position:fixed;right:calc(16px + env(safe-area-inset-right,0px));top:50%;transform:translateY(-50%);z-index:46;display:flex;flex-direction:column;gap:10px;width:230px;font:13px var(--sans,system-ui);color:#F4E6C4}" +
"#mp-bar .mp-h{font:600 12px var(--sans,system-ui);letter-spacing:.06em;text-transform:uppercase;opacity:.8;text-shadow:0 1px 3px #000}" +
"#mp-bar .mp-b{position:relative;overflow:hidden;display:flex;align-items:center;gap:10px;padding:9px 12px;min-height:52px;border:1px solid rgba(232,198,106,.55);border-radius:12px;background:rgba(18,14,8,.86);cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:none}" +
"#mp-bar .mp-b b{font-size:24px;line-height:1;position:relative}" +
"#mp-bar .mp-b .mp-t{position:relative;display:flex;flex-direction:column;flex:1;min-width:0}" +
"#mp-bar .mp-b .mp-t span{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
"#mp-bar .mp-b .mp-t small{opacity:.75;font-size:11px}" +
"#mp-bar .mp-b kbd{position:relative;font:600 11px var(--sans,system-ui);padding:1px 6px;border:1px solid rgba(240,232,216,.4);border-radius:4px;background:rgba(255,255,255,.06)}" +
"#mp-bar .mp-b i{position:absolute;left:0;bottom:0;top:0;background:rgba(0,0,0,.55);pointer-events:none}" +
"#mp-bar .mp-b.on{border-color:#7FE0A0;box-shadow:0 0 12px rgba(127,224,160,.35)}" +
"#mp-bar .mp-b.lock{opacity:.5}" +
"#mp-bar.touch{top:auto;transform:none;bottom:calc(320px + env(safe-area-inset-bottom,0px));flex-direction:row;width:auto;gap:10px}" +
"#mp-bar.touch .mp-h,#mp-bar.touch .mp-t,#mp-bar.touch kbd{display:none}" +
"#mp-bar.touch .mp-b{width:62px;height:62px;min-height:0;border-radius:50%;padding:0;justify-content:center}" +
"#mp-bar.touch .mp-b b{font-size:28px}";
document.head.appendChild(st);
},
function (D) {
D.updateMatrixWorld(true);
var out = new THREE.Group(), B = {}, keep = [];
D.traverse(function (o) {
if (o.isSprite) {
keep.push(o);
return;
}
if (!o.isMesh)
return;
var g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
g.applyMatrix4(o.matrixWorld);
if (!g.attributes.normal)
g.computeVertexNormals();
var k = o.material.uuid;
(B[k] || (B[k] = { mat: o.material, list: [] })).list.push(g);
o.geometry.dispose();
});
Object.keys(B).forEach(function (k) {
var b = B[k], n = 0;
b.list.forEach(function (q) { n += q.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), at = 0;
b.list.forEach(function (q) {
pos.set(q.attributes.position.array, at * 3);
nor.set(q.attributes.normal.array, at * 3);
if (q.attributes.uv)
uv.set(q.attributes.uv.array, at * 2);
at += q.attributes.position.count;
q.dispose();
});
var mg = new THREE.BufferGeometry();
mg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
mg.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
mg.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
mg.computeBoundingSphere();
out.add(new THREE.Mesh(mg, b.mat));
});
keep.forEach(function (s) {
var p = new THREE.Vector3(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
s.matrixWorld.decompose(p, q, sc);
s.parent.remove(s);
s.position.copy(p);
s.scale.copy(sc);
out.add(s);
});
return out;
},
function (M) {
var T = BW_TEAMS[M.team] || null, col = M.pool || !T ? 0x5A6A4A : T.col, azure = T && BW_TEAMS.azure && T.col === BW_TEAMS.azure.col;
var lite = new THREE.Color(col).lerp(new THREE.Color(0xD8D4CC), 0.22).getHex(), deep = new THREE.Color(col).multiplyScalar(0.55).getHex();
var eye = M.pool ? 0x9AE8A0 : azure ? 0x6AC8FF : 0xFFB070;
return { lite: mmLite(), eye: eye,
body: mmMat(col, { tex: "worn", rep: 2, metal: 0.45, rough: 0.58 }), body2: mmMat(lite, { tex: "plate", metal: 0.5, rough: 0.5 }), deep: mmMat(deep, { tex: "plate", metal: 0.5, rough: 0.55 }),
dark: mmMat(0x2C2E32, { shine: 30, metal: 0.6, rough: 0.55 }), steel: mmMat(0x8A8E96, { shine: 60, tex: "plate", metal: 0.85, rough: 0.35 }), bright: mmMat(0xC8CCD0, { shine: 90, metal: 0.95, rough: 0.2 }),
rubber: mmMat(0x1E1E1C, { metal: 0, rough: 0.95 }), tread: mmMat(0x6A6A66, { shine: 30, tex: "tread", metal: 0.7, rough: 0.55 }), grille: mmMat(0x5A5A56, { tex: "grille", metal: 0.6, rough: 0.6 }),
copper: mmMat(0xB0683A, { shine: 60, metal: 0.9, rough: 0.35 }), glass: mmMat(0x3A6A8A, { shine: 90, e: 0x0E2A3A, ei: 0.5, metal: 0.3, rough: 0.1 }),
glow: mmMat(new THREE.Color(eye).multiplyScalar(0.85).getHex(), { glow: 1 }) };
},
function (P, mat, x, len, h, w, lite) {
var o = new THREE.Shape(), hole = new THREE.Path(), a = len / 2, rb = h * 0.5, rf = h * 0.42, th = 0.14;
o.moveTo(-a + rf, 0);
o.lineTo(a - rb, 0);
o.absarc(a - rb, rb, rb, -Math.PI / 2, Math.PI / 2, false);
o.lineTo(-a + rf, h);
o.absarc(-a + rf, h - rf, rf, Math.PI / 2, Math.PI * 1.5, false);
hole.moveTo(-a + rf, th);
hole.lineTo(a - rb, th);
hole.absarc(a - rb, rb, rb - th, -Math.PI / 2, Math.PI / 2, false);
hole.lineTo(-a + rf, h - th);
hole.absarc(-a + rf, h - rf, rf - th, Math.PI / 2, Math.PI * 1.5, false);
o.holes.push(hole);
var g = new THREE.ExtrudeGeometry(o, { depth: w, bevelEnabled: false, curveSegments: lite ? 6 : 10 });
g.translate(0, 0, -w / 2);
mmUv(g, 0.5);
var m = mmMesh(g, mat, x, 0, 0, P);
m.rotation.y = -Math.PI / 2;
return m;
},
function (M, K) {
var g = M.g, lite = K.lite;
ifPart(g, function (D) {
mmFlat(D, K.body, [[-3.3, 0.45], [-2.2, 1.45], [2.5, 1.5], [3.2, 1.1], [3.1, 0.4], [-2.9, 0.35]], 2.4, 0, 0, 0, 0, -Math.PI / 2, 0);
mmSlab(D, K.body2, 3.5, 0.14, 5.4, 0, 1.58, 0.25);
mmFlat(D, K.deep, [[-3.35, 0.47], [-2.25, 1.47], [-1.95, 1.47], [-3.0, 0.45]], 2.6, 0, 0.02, 0, 0, -Math.PI / 2, 0);
var dh = mmG(D, 0.7, 1.66, -1.9);
mmCyl(dh, K.body2, 0.36, 0.4, 0.12, 0, 0, 0, 0, 0, 0, 14);
if (!lite)
for (var pz = 0; pz < 3; pz++)
mmSlab(dh, K.dark, 0.16, 0.1, 0.09, -0.24 + pz * 0.24, 0.08, -0.4);
mmVents(D, K.dark, K.grille, 2.2, 1.2, lite ? 3 : 6, 0, 1.67, 1.9, -Math.PI / 2, 0, 0);
[-1, 1].forEach(function (s) {
var X = s * 1.78;
ifBelt(D, K.tread, X, 6.6, 1.15, 0.72, lite);
[-2.2, -1.1, 0, 1.1, 2.2].forEach(function (z) { mmCyl(D, K.rubber, 0.44, 0.44, 0.6, X, 0.47, z, 0, 0, Math.PI / 2, lite ? 10 : 16); mmCyl(D, K.steel, 0.34, 0.34, 0.64, X, 0.47, z, 0, 0, Math.PI / 2, lite ? 8 : 14); mmCyl(D, K.dark, 0.13, 0.13, 0.68, X, 0.47, z, 0, 0, Math.PI / 2, 8); });
mmCyl(D, K.steel, 0.48, 0.48, 0.66, X, 0.58, 2.72, 0, 0, Math.PI / 2, 14);
if (!lite)
for (var t = 0; t < 10; t++) {
var at = t / 10 * Math.PI * 2;
mmSlab(D, K.steel, 0.66, 0.12, 0.12, X, 0.58 + Math.cos(at) * 0.5, 2.72 + Math.sin(at) * 0.5, at, 0, 0);
}
mmCyl(D, K.steel, 0.4, 0.4, 0.62, X, 0.68, -2.82, 0, 0, Math.PI / 2, 14);
for (var p = 0; p < 4; p++)
mmSlab(D, p % 2 ? K.body : K.body2, 0.1, 0.62, 1.5, X + s * 0.4, 1.08, -2.4 + p * 1.55, 0, 0, s * 0.05);
mmSlab(D, K.body2, 0.1, 0.55, 0.9, X + s * 0.4, 1.12, -3.45, -0.45, 0, s * 0.05);
if (!lite) {
mmSlab(D, K.dark, 0.7, 0.36, 1.2, s * 1.45, 1.82, 0.9);
mmTube(D, K.dark, [[s * 1.72, 1.62, -2.6], [s * 1.76, 1.66, -0.6], [s * 1.76, 1.66, 1.4], [s * 1.72, 1.62, 2.8]], 0.045, 0, 0, 0, 18);
}
mmLamp(D, K.dark, 0xFFE8B0, 0.12, s * 1.3, 1.38, -2.95, -0.35, 0);
mmLamp(D, K.dark, 0xC83A2A, 0.08, s * 1.45, 1.3, 3.18, 0, Math.PI);
});
});
ifPart(M.turret, function (D) {
var top = [[0, 2.1], [0.7, 2.15], [1.45, 1.3], [1.62, -0.3], [1.45, -1.5], [1.05, -2.1], [-1.05, -2.1], [-1.45, -1.5], [-1.62, -0.3], [-1.45, 1.3], [-0.7, 2.15]];
var ts = new THREE.Shape();
ts.moveTo(top[0][0], top[0][1]);
for (var i = 1; i < top.length; i++)
ts.lineTo(top[i][0], top[i][1]);
var tg = mmUv(new THREE.ExtrudeGeometry(ts, { depth: 0.62, bevelEnabled: !lite, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 2 }), 0.22);
var tm = mmMesh(tg, K.body, 0, 0.12, 0, D);
tm.rotation.x = -Math.PI / 2;
mmCyl(D, K.dark, 1.45, 1.5, 0.16, 0, 0.06, 0, 0, 0, 0, lite ? 14 : 24);
mmSlab(D, K.body2, 1.3, 0.7, 0.6, 0, 0.52, -2.1);
mmCyl(D, K.steel, 0.13, 0.18, 2.7, 0, 0.5, -3.15, Math.PI / 2, 0, 0, lite ? 8 : 14);
mmCyl(D, K.dark, 0.22, 0.22, 0.6, 0, 0.5, -3.0, Math.PI / 2, 0, 0, 12);
mmCyl(D, K.dark, 0.21, 0.21, 0.18, 0, 0.5, -4.2, Math.PI / 2, 0, 0, 12);
mmCyl(D, K.dark, 0.21, 0.21, 0.18, 0, 0.5, -4.48, Math.PI / 2, 0, 0, 12);
var sb = mmG(D, 0.85, 0.95, -0.9);
mmSlab(sb, K.body2, 0.55, 0.45, 0.6, 0, 0.2, 0);
mmLamp(sb, K.dark, 0x6AC8E8, 0.12, 0, 0.22, -0.32, 0, 0);
[-1, 1].forEach(function (s) { for (var d = 0; d < 3; d++)
mmCyl(D, K.dark, 0.09, 0.09, 0.36, s * (1.35 + d * 0.07), 0.55 + d * 0.15, -1.25, -0.6, 0, s * 0.2, 8); });
if (!lite) {
for (var bx = 0; bx < 5; bx++)
mmRod(D, K.dark, [-1.0 + bx * 0.5, 0.25, 2.0], [-1.0 + bx * 0.5, 0.85, 2.5], 0.025, 0.025, 5);
mmRod(D, K.dark, [-1.0, 0.85, 2.5], [1.0, 0.85, 2.5], 0.03, 0.03, 5);
mmSlab(D, mmMat(0x8A7A5A, { metal: 0, rough: 0.9 }), 2.0, 0.45, 0.4, 0, 0.5, 2.3);
mmRod(D, K.dark, [1.1, 0.8, 1.6], [1.2, 2.6, 1.7], 0.025, 0.01, 5);
}
if (!lite)
mmTorus(D, K.glow, 1.5, 0.025, 0, 0.04, 0, Math.PI / 2, 0, 0);
});
var cab = ifPart(M.turret, function (D) {
var c = mmG(D, -0.6, 0.95, 0.5);
mmCyl(c, K.body2, 0.42, 0.5, 0.4, 0, 0.2, 0, 0, 0, 0, 14);
mmEll(c, K.glass, 0.34, 0.1, 0.34, 0, 0.42, 0, 10);
if (!lite)
for (var pp = 0; pp < 5; pp++) {
var aa = pp / 5 * Math.PI * 2;
mmSlab(c, K.dark, 0.14, 0.1, 0.09, Math.sin(aa) * 0.45, 0.3, Math.cos(aa) * 0.45, 0, aa, 0);
}
});
M.cab = [cab];
},
function (M, K) {
var lite = K.lite;
ifPart(M.hip, function (D) {
mmCyl(D, K.dark, 0.5, 0.6, 0.5, 0, 0.1, 0, 0, 0, 0, 14);
mmCyl(D, K.steel, 1.05, 0.5, 0.25, 0, 0.0, 0, Math.PI / 2, 0, Math.PI / 2, 12);
mmEll(D, K.body, 1.35, 0.7, 1.45, 0, 0.75, 0.05, 18);
mmFlat(D, K.body2, [[-0.9, 0.0], [0.9, 0.0], [0.7, 0.55], [-0.7, 0.55]], 0.3, 0, 0.3, -1.35, 0.35, 0, 0);
mmSlab(D, K.deep, 1.6, 1.0, 0.8, 0, 1.0, 1.25);
mmVents(D, K.dark, K.grille, 1.2, 0.7, lite ? 3 : 5, 0, 1.0, 1.67, 0, Math.PI, 0);
if (!lite) {
mmRod(D, K.dark, [0.6, 1.5, 1.4], [0.7, 3.0, 1.6], 0.03, 0.012, 5);
mmTube(D, K.copper, [[-0.7, 0.6, 1.5], [-0.9, 0.3, 1.2], [-1.1, 0.4, 0.6]], 0.06, 0, 0, 0, 10);
}
[-1, 1].forEach(function (s) {
var X = s * 1.6;
mmEll(D, K.dark, 0.42, 0.42, 0.42, s * 1.3, 0.65, 0, 12);
mmCaps(D, K.body2, 0.34, 0.3, 1.7, X, 0.6, -1.0, Math.PI / 2, 0, 0, 14);
mmSlab(D, K.body, 0.5, 0.28, 1.4, X, 0.92, -0.9);
[-0.11, 0.11].forEach(function (o) { mmCyl(D, K.steel, 0.07, 0.08, 0.9, X + o, 0.6, -2.35, Math.PI / 2, 0, 0, 8); });
if (!lite)
for (var r = 0; r < 3; r++)
mmCyl(D, K.dark, 0.3, 0.3, 0.06, X, 0.6, -1.5 - r * 0.25, Math.PI / 2, 0, 0, 12);
mmSeam(D, K.eye, [[X + s * 0.33, 0.6, -0.4], [X + s * 0.33, 0.6, -1.6]], 0.03);
mmLamp(D, K.dark, 0xFFE8B0, 0.09, s * 0.75, 0.45, -1.38, 0, 0);
});
});
var cab = ifPart(M.hip, function (D) {
mmEll(D, K.body, 1.15, 0.6, 1.25, 0, 1.2, 0.15, 16);
mmEll(D, K.glass, 0.78, 0.36, 0.55, 0, 1.25, -0.85, 14);
mmSlab(D, K.body2, 0.2, 0.18, 1.6, 0, 1.78, 0.2);
if (!lite)
mmSeam(D, K.eye, [[-0.55, 1.05, -1.2], [0, 1.0, -1.32], [0.55, 1.05, -1.2]], 0.025);
});
M.cab = [cab];
M.legs.forEach(function (l) {
ifPart(l.L, function (D) {
mmEll(D, K.dark, 0.36, 0.36, 0.36, 0, 0, 0, 12);
mmCaps(D, K.body, 0.32, 0.27, 1.5, 0, -1.1, 0, 0, 0, 0, 12);
mmSlab(D, K.body2, 0.42, 1.3, 0.22, 0, -1.05, -0.26, 0.06, 0, 0);
mmPiston(D, K.dark, K.bright, [0, -0.3, 0.3], [0, -1.9, 0.28], 0.08);
});
ifPart(l.sh, function (D) {
mmEll(D, K.dark, 0.32, 0.32, 0.32, 0, 0, 0, 12);
mmFlat(D, K.body2, [[-0.25, 0.2], [0.25, 0.2], [0.3, -0.35], [0, -0.55], [-0.3, -0.35]], 0.22, 0, 0, -0.32, 0, 0, 0);
mmCaps(D, K.body, 0.26, 0.22, 1.4, 0, -1.0, 0.15, -0.1, 0, 0, 12);
mmPiston(D, K.dark, K.bright, [0, -0.2, 0.38], [0, -1.7, 0.42], 0.07);
mmEll(D, K.dark, 0.24, 0.24, 0.24, 0, -1.92, 0.2, 10);
mmSlab(D, K.deep, 0.8, 0.22, 1.0, 0, -2.04, 0.15);
[-0.28, 0, 0.28].forEach(function (x) { mmSlab(D, K.steel, 0.2, 0.16, 0.55, x, -2.06, -0.5, 0, x * 0.6, 0); });
mmSlab(D, K.steel, 0.24, 0.16, 0.4, 0, -2.06, 0.75);
});
});
},
function (M, K) {
var lite = K.lite, torso = M.torso, arms = torso.children.filter(function (c) { return c.isGroup; });
ifPart(M.hip, function (D) {
mmEll(D, K.dark, 1.8, 0.7, 1.25, 0, 0, 0, 16);
mmFlat(D, K.body, [[-0.9, 0.5], [0.9, 0.5], [0.6, -0.5], [0, -0.9], [-0.6, -0.5]], 0.4, 0, 0.05, -1.3, 0, 0, 0);
[-1, 1].forEach(function (s) { mmSlab(D, K.body2, 0.3, 1.5, 1.9, s * 2.2, -0.2, 0, 0, 0, s * 0.18); mmSlab(D, K.deep, 0.25, 1.1, 1.6, s * 2.38, -0.4, 0, 0, 0, s * 0.25); });
mmCyl(D, K.steel, 1.3, 1.5, 0.5, 0, 0.6, 0, 0, 0, 0, lite ? 14 : 24);
});
ifPart(torso, function (D) {
for (var r = 0; r < 3; r++)
mmCyl(D, r % 2 ? K.dark : K.steel, 1.4 - r * 0.05, 1.45 - r * 0.05, 0.3, 0, 0.15 + r * 0.32, 0, 0, 0, 0, lite ? 14 : 22);
mmFlat(D, K.body, [[-1.3, 0.9], [1.3, 0.9], [2.6, 1.6], [2.9, 3.1], [2.3, 3.9], [-2.3, 3.9], [-2.9, 3.1], [-2.6, 1.6]], 2.7, 0, 0, 0.1, 0, 0, 0);
[-1, 1].forEach(function (s) { mmFlat(D, K.body2, [[0, 0], [1.9, 0.3], [2.2, 1.4], [0.2, 1.5]].map(function (p) { return [s * p[0], p[1]]; }), 0.3, s * 0.15, 2.0, -1.55, 0.08, 0, 0); });
mmCyl(D, K.dark, 0.62, 0.62, 0.3, 0, 2.15, -1.7, Math.PI / 2, 0, 0, 18);
mmEll(D, mmMat(K.eye, { e: K.eye, ei: 0.9 }), 0.44, 0.44, 0.16, 0, 2.15, -1.88, 14);
if (!lite) {
mmTorus(D, K.steel, 0.62, 0.06, 0, 2.15, -1.86, 0, 0, 0);
mmGlow(D, K.eye, 2.2, 0.28, 0, 2.15, -2.1);
}
mmSlab(D, K.steel, 3.4, 0.4, 2.4, 0, 4.0, 0.1);
[-1, 1].forEach(function (s) { mmVents(D, K.dark, K.grille, 1.4, 1.2, lite ? 3 : 5, s * 2.85, 2.4, 0.2, 0, s * Math.PI / 2, 0); });
[-1, 1].forEach(function (s) {
mmEll(D, K.dark, 0.95, 0.95, 0.95, s * 3.4, 3.25, 0, 14);
mmEll(D, K.body, 1.35, 0.85, 1.55, s * 3.55, 4.0, 0, 16);
mmSlab(D, K.body2, 1.3, 0.22, 1.8, s * 4.35, 3.55, 0, 0, 0, -s * 0.75);
mmSlab(D, K.deep, 1.1, 0.2, 1.6, s * 4.55, 3.1, 0, 0, 0, -s * 0.9);
if (!lite)
mmSeam(D, K.eye, [[s * 2.7, 4.55, -1.3], [s * 3.6, 4.75, -1.4], [s * 4.5, 4.4, -1.2]], 0.04);
});
mmSlab(D, K.deep, 3.2, 2.6, 1.3, 0, 2.5, 1.9);
mmVents(D, K.dark, K.grille, 2.2, 1.2, lite ? 3 : 5, 0, 2.9, 2.6, 0, Math.PI, 0);
[-1, 1].forEach(function (s) { mmCyl(D, K.steel, 0.35, 0.55, 0.9, s * 0.95, 1.0, 2.2, 0, 0, 0, lite ? 10 : 16); if (!lite)
mmGlow(D, 0xFFB070, 1.1, 0.3, s * 0.95, 0.5, 2.2); });
var pod = mmG(D, 2.1, 4.9, 0.9);
mmSlab(pod, K.body2, 1.5, 1.1, 1.7, 0, 0, 0);
for (var i = 0; i < 6; i++)
mmCyl(pod, K.dark, 0.15, 0.15, 0.1, (i % 3 - 1) * 0.42, i < 3 ? 0.25 : -0.25, -0.86, Math.PI / 2, 0, 0, 8);
if (!lite)
for (var j = 0; j < 6; j++)
mmCyl(pod, mmMat(0xB03A2A, { shine: 40, metal: 0.4 }), 0.1, 0.1, 0.06, (j % 3 - 1) * 0.42, j < 3 ? 0.25 : -0.25, -0.9, Math.PI / 2, 0, 0, 8);
mmCyl(D, K.dark, 0.5, 0.6, 0.7, 0, 4.45, 0, 0, 0, 0, 12);
});
var cab = ifPart(torso, function (D) {
mmEll(D, K.body, 0.9, 0.72, 1.0, 0, 5.05, 0.05, 16);
mmFlat(D, K.body2, [[-0.6, 0.35], [0.6, 0.35], [0.5, -0.3], [0, -0.55], [-0.5, -0.3]], 0.3, 0, 4.75, -0.9, 0, 0, 0);
mmSeam(D, K.eye, [[-0.55, 5.12, -0.88], [0, 5.08, -0.98], [0.55, 5.12, -0.88]], 0.045);
mmFlat(D, K.deep, [[0, 0], [1.4, 0.25], [1.1, 0.6], [-0.2, 0.35]], 0.14, 0, 5.55, -0.4, 0, -Math.PI / 2, 0);
if (!lite)
[-1, 1].forEach(function (s) { mmFlat(D, K.steel, [[0, 0], [0.25, 0.9], [0.05, 0.95]], 0.08, s * 0.75, 5.2, 0.3, 0, 0, -s * 0.35); });
});
M.cab = [cab];
arms.forEach(function (A) {
var s = A.position.x < 0 ? -1 : 1;
ifPart(A, function (D) {
mmEll(D, K.dark, 0.75, 0.75, 0.75, 0, 0, 0, 14);
mmCaps(D, K.body, 0.6, 0.55, 1.6, 0, -1.3, 0, 0, 0, 0, 14);
mmSlab(D, K.body2, 0.3, 1.4, 1.0, s * 0.6, -1.2, 0, 0, 0, s * 0.08);
mmEll(D, K.dark, 0.62, 0.62, 0.62, 0, -2.4, 0, 12);
mmCaps(D, K.body, 0.75, 0.65, 2.4, 0, -2.9, -1.0, Math.PI / 2, 0, 0, 16);
mmSlab(D, K.body2, 1.1, 0.4, 2.4, 0, -2.3, -1.0);
mmCyl(D, K.steel, 0.24, 0.3, 3.0, 0, -2.9, -3.6, Math.PI / 2, 0, 0, lite ? 10 : 16);
mmCyl(D, K.dark, 0.36, 0.36, 0.6, 0, -2.9, -4.9, Math.PI / 2, 0, 0, 14);
if (!lite)
for (var r = 0; r < 4; r++)
mmCyl(D, K.dark, 0.34, 0.34, 0.08, 0, -2.9, -2.5 - r * 0.35, Math.PI / 2, 0, 0, 14);
mmSeam(D, K.eye, [[-s * 0.68, -2.9, -0.2], [-s * 0.68, -2.9, -2.0]], 0.05);
});
});
M.legs.forEach(function (l) {
ifPart(l.L, function (D) {
mmEll(D, K.dark, 0.85, 0.85, 0.85, 0, 0, 0, 14);
mmCaps(D, K.body, 0.78, 0.66, 2.0, 0, -1.6, 0, 0, 0, 0, 16);
mmSlab(D, K.body2, 1.1, 2.2, 0.3, 0, -1.5, -0.7, 0.05, 0, 0);
mmPiston(D, K.dark, K.bright, [0, -0.5, 0.7], [0, -2.8, 0.6], 0.16);
});
ifPart(l.sh, function (D) {
mmEll(D, K.dark, 0.75, 0.75, 0.75, 0, 0, 0, 14);
mmFlat(D, K.body2, [[-0.6, 0.5], [0.6, 0.5], [0.7, -0.5], [0, -0.9], [-0.7, -0.5]], 0.35, 0, 0, -0.75, 0, 0, 0);
mmCaps(D, K.body, 0.62, 0.72, 1.8, 0, -1.4, 0.15, 0, 0, 0, 16);
mmSlab(D, K.body2, 1.0, 1.9, 0.3, 0, -1.4, -0.62, -0.05, 0, 0);
mmPiston(D, K.dark, K.bright, [0, -0.4, 0.8], [0, -2.4, 0.6], 0.14);
mmEll(D, K.dark, 0.5, 0.5, 0.5, 0, -2.6, 0.1, 12);
mmFlat(D, K.deep, [[-1.6, 0.0], [1.4, 0.0], [1.6, 0.35], [0.4, 0.62], [-1.2, 0.62]], 1.9, 0, -3.2, 0, 0, -Math.PI / 2, 0);
[-0.6, 0, 0.6].forEach(function (x) { mmSlab(D, K.steel, 0.5, 0.32, 0.8, x, -3.05, -1.8, 0.15, x * 0.3, 0); });
});
});
},
function (M, K) {
var lite = K.lite;
ifPart(M.hip, function (D) {
mmEll(D, K.body, 1.35, 0.72, 1.6, 0, 0.1, 0.75, 18);
if (!lite)
for (var b = 0; b < 3; b++)
mmEll(D, K.body2, 1.2 - b * 0.1, 0.22, 0.5, 0, 0.62 - b * 0.02, 0.25 + b * 0.6, 14);
mmEll(D, K.deep, 1.1, 0.55, 1.05, 0, 0.18, -0.55, 16);
mmCyl(D, K.dark, 0.95, 0.95, 0.3, 0, -0.32, 0, 0, 0, 0, 16);
[[-0.38, 0.22], [0.38, 0.22], [-0.65, 0.05], [0.65, 0.05], [-0.2, -0.05], [0.2, -0.05]].forEach(function (p, i) { mmEll(D, mmMat(K.eye, { e: K.eye, ei: 0.9 }), i < 2 ? 0.15 : 0.1, i < 2 ? 0.15 : 0.1, 0.08, p[0], p[1], -1.52 + Math.abs(p[0]) * 0.25, 10); });
mmEll(D, K.dark, 0.42, 0.42, 0.42, 0, -0.3, -1.25, 12);
[-0.13, 0.13].forEach(function (o) { mmCyl(D, K.steel, 0.08, 0.09, 1.9, o, -0.3, -2.3, Math.PI / 2, 0, 0, 10); });
mmCyl(D, K.dark, 0.24, 0.24, 0.35, 0, -0.3, -3.1, Math.PI / 2, 0, 0, 12);
if (!lite) {
mmSeam(D, K.eye, [[-1.0, 0.0, 1.6], [0, -0.05, 2.35], [1.0, 0.0, 1.6]], 0.035);
mmTube(D, K.copper, [[0.8, 0.4, 0.2], [0.6, 0.7, 1.0], [0.2, 0.6, 1.8]], 0.06, 0, 0, 0, 10);
}
});
var cab = ifPart(M.hip, function (D) { mmEll(D, K.glass, 0.62, 0.34, 0.72, 0, 0.62, -0.5, 14); if (!lite)
mmTorus(D, K.steel, 0.62, 0.04, 0, 0.6, -0.5, Math.PI / 2, 0, 0); });
M.cab = [cab];
M.legs.forEach(function (l) {
ifPart(l.L, function (D) {
mmEll(D, K.dark, 0.34, 0.34, 0.34, 0, 0, 0, 12);
mmRod(D, K.body, [0, 0, 0.2], [0, 1.1, 2.2], 0.24, 0.2, 12);
mmRod(D, K.body2, [0, 0.25, 0.4], [0, 1.1, 1.9], 0.28, 0.26, 6);
mmPiston(D, K.dark, K.bright, [0, -0.15, 0.55], [0, 0.82, 2.15], 0.07);
});
ifPart(l.sh, function (D) {
mmEll(D, K.dark, 0.26, 0.26, 0.26, 0, 0, 0, 10);
mmRod(D, K.steel, [0, 0, 0], [0, -2.0, 0.42], 0.2, 0.15, 12);
mmRod(D, K.body, [0, -0.1, 0.02], [0, -1.4, 0.3], 0.25, 0.22, 6);
mmRod(D, K.dark, [0, -2.0, 0.42], [0, -3.45, 0.74], 0.13, 0.06, 10);
mmCone(D, K.steel, 0.1, 0.32, 0, -3.5, 0.75, Math.PI, 0, 0, 8);
if (!lite)
mmTube(D, K.copper, [[0, 0.1, 0.25], [0, -0.8, 0.45], [0, -1.8, 0.6]], 0.035, 0, 0, 0, 10);
});
});
},
function (M, K) {
var lite = K.lite;
ifPart(M.hip, function (D) {
mmFlat(D, K.body, [[-3.2, 0.05], [-2.3, 0.75], [2.5, 0.8], [3.1, 0.45], [2.9, -0.3], [-2.6, -0.35]], 2.4, 0, 0, 0, 0, -Math.PI / 2, 0);
mmSlab(D, K.body2, 1.4, 0.16, 4.4, 0, 0.84, 0.3);
mmFlat(D, K.deep, [[-3.25, 0.07], [-2.35, 0.77], [-2.05, 0.77], [-2.9, 0.06]], 2.5, 0, 0.02, 0, 0, -Math.PI / 2, 0);
[-1, 1].forEach(function (s) {
[-1, 1].forEach(function (f) {
var X = s * 1.9, Z = f * 1.9;
mmTorus(D, K.steel, 0.86, 0.16, X, -0.25, Z, Math.PI / 2, 0, 0);
mmCyl(D, K.dark, 0.88, 0.88, 0.3, X, -0.25, Z, 0, 0, 0, lite ? 12 : 20);
mmCyl(D, K.dark, 0.18, 0.18, 0.35, X, -0.2, Z, 0, 0, 0, 10);
if (!lite)
for (var v = 0; v < 6; v++)
mmSlab(D, K.steel, 0.7, 0.04, 0.16, X + Math.cos(v / 6 * Math.PI * 2) * 0.45, -0.2, Z + Math.sin(v / 6 * Math.PI * 2) * 0.45, 0.4, -v / 6 * Math.PI * 2, 0);
mmGlow(D, 0x8AC8FF, 1.6, 0.22, X, -0.5, Z);
});
mmSlab(D, K.body2, 0.16, 0.5, 3.0, s * 1.72, 0.35, 0, 0, 0, s * 0.2);
mmFlat(D, K.deep, [[0, 0], [1.2, 0.1], [1.1, 0.9], [0.5, 0.9]], 0.12, s * 0.9, 0.82, 2.4, 0, -Math.PI / 2, -s * 0.25);
mmCyl(D, K.steel, 0.28, 0.38, 0.6, s * 0.7, 0.3, 3.1, Math.PI / 2, 0, 0, 12);
if (!lite)
mmGlow(D, 0x8AC8FF, 0.9, 0.3, s * 0.7, 0.3, 3.45);
mmLamp(D, K.dark, 0xFFE8B0, 0.1, s * 1.1, 0.4, -3.0, -0.2, 0);
});
if (!lite)
mmSeam(D, K.eye, [[-1.5, 0.45, -2.6], [-1.62, 0.5, 0], [-1.5, 0.5, 2.4]], 0.03), mmSeam(D, K.eye, [[1.5, 0.45, -2.6], [1.62, 0.5, 0], [1.5, 0.5, 2.4]], 0.03);
});
ifPart(M.turret, function (D) {
mmFlat(D, K.body2, [[-1.2, 0.0], [1.3, 0.0], [1.3, 0.45], [0.7, 0.62], [-0.7, 0.55]], 1.8, 0, 0, 0.1, 0, -Math.PI / 2, 0);
mmCyl(D, K.dark, 0.95, 1.0, 0.14, 0, 0.04, 0, 0, 0, 0, 16);
[-1, 1].forEach(function (s) {
var p = mmG(D, s * 0.95, 0.35, -1.2);
mmSlab(p, K.body, 0.6, 0.6, 1.6, 0, 0, 0);
for (var i = 0; i < 4; i++)
mmCyl(p, K.dark, 0.1, 0.1, 0.1, (i % 2 - 0.5) * 0.26, (i < 2 ? 0.13 : -0.13), -0.82, Math.PI / 2, 0, 0, 8);
mmRod(D, K.dark, [s * 0.6, 0.35, -0.6], [s * 0.95, 0.35, -0.6], 0.1, 0.1, 8);
});
});
var cab = ifPart(M.turret, function (D) { mmEll(D, K.glass, 0.55, 0.3, 0.7, 0, 0.55, -0.3, 14); });
M.cab = [cab];
},
function (M) {
var f = IF_DRESS[M.type];
if (!f || !M.g)
return;
var old = [];
M.g.traverse(function (o) { if (o.isMesh)
old.push(o); });
var K = ifKit(M);
f(M, K);
old.forEach(function (o) { if (o.parent)
o.parent.remove(o); });
},
function (G) {
var k = MMI.k, d = MM.list[k], pl = MMI.plan;
if (!d || !pl || k === "domeship")
return;
var S = mmInStyle(d), lite = mmLite(), H = 3.4, CW = pl.CW, L = pl.L, P = new THREE.Group();
P.name = "mm-sweep";
G.add(P);
var pipe = mmInMat(0x5A5650, "metal"), brass = mmInMat(S.trim, null, { shine: 80 }), dark = mmInMat(0x2A2A2E, "metal"), red = mmInMat(0xA82A20, null, { shine: 60 }), cork = mmInMat(0x8A6A44, null), paper = mmInMat(0xD8D0BC, null), lamp = mmInMat(0xFFFFFF, null, { e: S.glow, ei: 0.9 }), locker = mmInMat(0x4A5450, "metal");
var sol = function (x, z, hw, hd) { MMI.solids.push({ x: x, z: z, hw: hw, hd: hd }); };
var Lz = pl.z1 - (-L / 2), cz = (pl.z1 - L / 2) / 2;
[-1, 1].forEach(function (sd) {
var p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, Lz, 8), pipe);
p1.rotation.x = Math.PI / 2;
p1.position.set(sd * (CW / 2 - 0.18), H - 0.22, cz);
P.add(p1);
if (!lite) {
var p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, Lz, 8), brass);
p2.rotation.x = Math.PI / 2;
p2.position.set(sd * (CW / 2 - 0.36), H - 0.14, cz);
P.add(p2);
}
mmBox(P, 0.3, 0.05, Lz, dark, sd * (CW / 2 - 0.2), H - 0.42, cz);
for (var z = -L / 2 + 1; z < pl.z1 - 0.5; z += lite ? 4 : 2)
mmBox(P, 0.5, 0.04, 0.06, dark, sd * (CW / 2 - 0.27), H - 0.45, z);
});
var pairs = Math.round(L / pl.D);
for (var j = 0; j <= pairs; j++) {
var z = -L / 2 + j * pl.D;
if (z < -L / 2 + 0.5 && j > 0)
continue;
[-1, 1].forEach(function (sd, si) {
if (lite && (j + si) % 2)
return;
mmBox(P, 0.1, 0.18, 0.3, brass, sd * (CW / 2 - 0.07), 2.3, z);
mmBox(P, 0.14, 0.12, 0.22, lamp, sd * (CW / 2 - 0.14), 2.18, z);
if ((j + si) % 2 === 0 && j > 0 && j < pairs) {
var ex = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.55, 12), red);
ex.position.set(sd * (CW / 2 - 0.14), 0.75, z + 0.5);
P.add(ex);
mmBox(P, 0.06, 0.1, 0.06, dark, sd * (CW / 2 - 0.14), 1.07, z + 0.5);
mmBox(P, 0.04, 0.3, 0.24, dark, sd * (CW / 2 - 0.03), 0.75, z + 0.5);
sol(sd * (CW / 2 - 0.14), z + 0.5, 0.13, 0.13);
}
});
}
var bz = L / 2 + 1.4;
for (var i = 0; i < (lite ? 2 : 3); i++) {
mmBox(P, 0.45, 1.9, 0.5, locker, -(CW / 2 - 0.24), 0.95, bz - 0.55 + i * 0.52);
mmBox(P, 0.02, 0.08, 0.18, brass, -(CW / 2 - 0.48), 1.2, bz - 0.55 + i * 0.52);
}
sol(-(CW / 2 - 0.24), bz, 0.25, 0.8);
mmBox(P, 0.04, 0.9, 1.3, cork, CW / 2 - 0.03, 1.6, bz);
mmBox(P, 0.06, 0.06, 1.38, brass, CW / 2 - 0.05, 2.07, bz);
mmBox(P, 0.06, 0.06, 1.38, brass, CW / 2 - 0.05, 1.13, bz);
[[0.25, -0.35, 0.3, 0.4], [0.15, 0.2, 0.35, 0.3], [-0.2, -0.05, 0.4, 0.28], [-0.25, 0.4, 0.25, 0.35]].forEach(function (q) { mmBox(P, 0.01, q[3], q[2], paper, CW / 2 - 0.06, 1.6 + q[0], bz + q[1]); });
if (typeof wPerson !== "function")
return;
var crew = [["mechanic", -(CW / 2 - 0.45), -L / 2 + pl.D * Math.min(1, pairs - 1) + 0.0, Math.PI / 2, { topKind: "overalls", top: 0x3A4A5A, bottom: 0x3A4A5A, hat: "cap" }],
["deckhand", CW / 2 - 0.45, -L / 2 + pl.D * Math.max(1, pairs - 1), -Math.PI / 2, { top: 0x6A5A48, bottom: 0x2A2A30, hat: "none" }]];
crew.forEach(function (c, i) {
if (lite && i)
return;
var g = null;
try {
g = wPerson("mm_sw_" + k + "_" + i, { title: c[0], place: d.name, look: Object.assign({ sex: i ? "f" : "m", gear: "none" }, c[4]) });
}
catch (e) {
g = null;
}
if (!g)
return;
g.position.set(c[1], 0, c[2]);
g.rotation.y = c[3];
g.userData.keep = 1;
P.add(g);
sol(c[1], c[2], 0.3, 0.3);
});
}
];
});
