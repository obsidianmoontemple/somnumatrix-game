/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(471, function () {
"use strict";
return [
function (k) {
return ebsCanvas("eupTuft" + k, 128, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
var r = wRand(300 + k);
for (var i = 0; i < 46; i++) {
var bx = W * 0.15 + r() * W * 0.7, lean = (r() - 0.5) * 40, h = H * (0.35 + r() * 0.6), g = 110 + r() * 60 | 0;
x.strokeStyle = "rgb(" + (g - 20) + "," + g + "," + (g - 30) + ")";
x.lineWidth = 1.5 + r() * 1.5;
x.beginPath();
x.moveTo(bx, H);
x.quadraticCurveTo(bx + lean * 0.3, H - h * 0.6, bx + lean, H - h);
x.stroke();
}
if (k === 2) {
for (var pp = 0; pp < 7; pp++) {
var px = W * 0.2 + r() * W * 0.6, py = H * (0.08 + r() * 0.4);
x.strokeStyle = "#5A6A3A";
x.lineWidth = 1.6;
x.beginPath();
x.moveTo(px + (r() - 0.5) * 10, H);
x.quadraticCurveTo(px, py + 30, px, py);
x.stroke();
for (var pt = 0; pt < 4; pt++) {
var pa = pt * Math.PI / 2 + r() * 0.4;
x.fillStyle = pt % 2 ? "#C8201A" : "#E0342A";
x.beginPath();
x.ellipse(px + Math.cos(pa) * 4, py + Math.sin(pa) * 3, 5.5, 4, pa, 0, 6.283);
x.fill();
}
x.fillStyle = "#1A1410";
x.beginPath();
x.arc(px, py, 2.2, 0, 6.283);
x.fill();
}
}
if (k === 3) {
for (var rd = 0; rd < 9; rd++) {
var rx = W * 0.15 + r() * W * 0.7, top = H * (0.02 + r() * 0.25);
x.strokeStyle = "#4A5A34";
x.lineWidth = 2;
x.beginPath();
x.moveTo(rx, H);
x.lineTo(rx + (r() - 0.5) * 6, top);
x.stroke();
if (r() < 0.6) {
x.fillStyle = "#3A2618";
x.fillRect(rx - 2.5, top + 4, 5, 16);
}
}
}
if (k === 1) {
for (var s = 0; s < 4; s++) {
var sx = W * 0.25 + r() * W * 0.5, top = H * (0.05 + r() * 0.2);
x.strokeStyle = "#6A7A5A";
x.lineWidth = 2;
x.beginPath();
x.moveTo(sx, H);
x.lineTo(sx + (r() - 0.5) * 8, top);
x.stroke();
for (var f = 0; f < 9; f++) {
var fy = top + f * 5 + r() * 3, fx = sx + (r() - 0.5) * 10;
x.fillStyle = f < 3 ? "#E8E4D8" : "#F4F0E8";
x.beginPath();
for (var p = 0; p < 6; p++) {
var a = p * Math.PI / 3;
x.lineTo(fx + Math.cos(a) * 3.4, fy + Math.sin(a) * 3.4);
}
x.fill();
x.fillStyle = "#C89A6A";
x.fillRect(fx - 0.8, fy - 0.8, 1.6, 1.6);
}
}
}
});
},
function () {
return ebsCanvas("eupSmoke", 128, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var r = wRand(331);
for (var i = 0; i < 60; i++) {
var y = H * (1 - Math.pow(r(), 0.7)), cx = W / 2 + (r() - 0.5) * W * 0.5 * (1 - y / H + 0.3), rr = 10 + r() * 30, a = 0.05 + 0.12 * (y / H), g = x.createRadialGradient(cx, y, 0, cx, y, rr);
g.addColorStop(0, "rgba(70,62,60," + a + ")");
g.addColorStop(1, "rgba(70,62,60,0)");
x.fillStyle = g;
x.fillRect(cx - rr, y - rr, rr * 2, rr * 2);
}
});
},
function () {
return eupG("bones", function () {
var r = wRand(41), L = [];
var sk = new THREE.SphereGeometry(0.11, 6, 4);
sk.scale(1, 0.9, 1.2);
sk.translate(0, 0.1, 0);
L.push(sk);
var jaw = new THREE.BoxGeometry(0.12, 0.05, 0.1);
jaw.translate(0, 0.02, 0.1);
L.push(jaw);
for (var i = 0; i < 5; i++) {
var b = new THREE.CylinderGeometry(0.025, 0.03, 0.35 + r() * 0.3, 5);
b.rotateZ(Math.PI / 2);
b.rotateY(r() * 3);
b.translate((r() - 0.5) * 0.7, 0.03, (r() - 0.5) * 0.7);
L.push(b);
}
for (var k = 0; k < 4; k++) {
var rib = new THREE.TorusGeometry(0.16, 0.015, 3, 6, Math.PI);
rib.rotateY(Math.PI / 2);
rib.translate(0.3, 0.02, -0.25 + k * 0.08);
L.push(rib);
}
return eupMerge(L);
});
},
function () {
return eupG("herm", function () {
var s = new THREE.BoxGeometry(0.9, 0.25, 0.9);
s.translate(0, 0.125, 0);
var p = new THREE.BoxGeometry(0.45, 1.5, 0.4);
p.translate(0, 1, 0);
var h = new THREE.SphereGeometry(0.2, 8, 6);
h.scale(0.9, 1.15, 1);
h.translate(0, 1.95, 0);
var c = new THREE.BoxGeometry(0.5, 0.08, 0.45);
c.translate(0, 1.76, 0);
return eupMerge([s, p, h, c]);
});
},
function () {
return eupG("braz", function () {
var L = [];
for (var i = 0; i < 3; i++) {
var a = i * Math.PI * 2 / 3, l = new THREE.CylinderGeometry(0.04, 0.05, 1.3, 5);
l.rotateZ(0.22);
l.rotateY(a);
l.translate(Math.cos(a) * 0.22, 0.62, Math.sin(a) * 0.22);
L.push(l);
}
var bowl = new THREE.CylinderGeometry(0.5, 0.22, 0.32, 12, 1, true);
bowl.translate(0, 1.36, 0);
L.push(bowl);
var rim = new THREE.TorusGeometry(0.5, 0.04, 5, 14);
rim.rotateX(Math.PI / 2);
rim.translate(0, 1.52, 0);
L.push(rim);
return eupMerge(L);
});
},
function () {
return eupG("cage", function () {
var L = [];
for (var i = 0; i < 12; i++) {
var a = i * Math.PI / 6, b = new THREE.CylinderGeometry(0.03, 0.03, 2.4, 4);
b.translate(Math.cos(a) * 0.8, 1.2, Math.sin(a) * 0.8);
L.push(b);
}
[0.05, 1.2, 2.4].forEach(function (y) { var r = new THREE.TorusGeometry(0.8, 0.05, 4, 16); r.rotateX(Math.PI / 2); r.translate(0, y, 0); L.push(r); });
for (var j = 0; j < 4; j++) {
var d = new THREE.TorusGeometry(0.8, 0.04, 4, 12, Math.PI);
d.rotateY(j * Math.PI / 4);
d.translate(0, 2.4, 0);
L.push(d);
}
var hk = new THREE.TorusGeometry(0.14, 0.04, 4, 10);
hk.translate(0, 3.35, 0);
L.push(hk);
return eupMerge(L);
});
},
function (seed) {
return eupG("ruin" + seed, function () {
var r = wRand(seed), L = [], w = 0;
for (var i = 0; i < 6; i++) {
var h = 2 + r() * 7, b = new THREE.BoxGeometry(1.6, h, 1.4);
b.translate(w, h / 2, 0);
L.push(b);
w += 1.6;
}
var bt = new THREE.BoxGeometry(0.9, 3, 2.2);
bt.translate(1, 1.5, 1.4);
L.push(bt);
var bt2 = bt.clone();
bt2.translate(6, 0, 0);
L.push(bt2);
var g = eupMerge(L);
g.translate(-w / 2, 0, 0);
return g;
});
},
function (R, d0, d1) {
if (!EBS_ROADS.length)
return null;
var Rd = EBS_ROADS[(R() * EBS_ROADS.length) | 0], P = Rd.pts;
if (P.length < 2)
return null;
var i = (R() * (P.length - 1)) | 0, a = P[i], b = P[i + 1], t = R(), x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t, L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, side = R() < 0.5 ? -1 : 1, off = Rd.w / 2 + d0 + R() * (d1 - d0);
return { x: x - (b[1] - a[1]) / L * off * side, z: z + (b[0] - a[0]) / L * off * side, ry: Math.atan2(b[0] - a[0], b[1] - a[1]) + (side > 0 ? Math.PI / 2 : -Math.PI / 2), road: Rd };
},
function (G) {
var rock = ebsStone("rock"), bronze = ebsStone("bronze"), iron = ebsStone("iron"), black = ebsStone("black"), boneM = ebsLam(0xD8D0BC), grey = ebsStone("grey");
var tuftM = ebsM("eupTuftM0", function () { var m = new THREE.MeshLambertMaterial({ map: eupTuftTex(0), alphaTest: 0.45, side: THREE.DoubleSide, color: 0xB8C0A8 }); m.userData.noPhoto = 1; return m; });
var flowM = ebsM("eupTuftM1", function () { var m = new THREE.MeshLambertMaterial({ map: eupTuftTex(1), alphaTest: 0.45, side: THREE.DoubleSide, color: 0xD8DCCC }); m.userData.noPhoto = 1; return m; });
var dryM = ebsM("eupTuftM2", function () { var m = new THREE.MeshLambertMaterial({ map: eupTuftTex(0), alphaTest: 0.45, side: THREE.DoubleSide, color: 0x8A7A62 }); m.userData.noPhoto = 1; return m; });
function asphSpot(R) {
if (R() < 0.55) {
var Q = eupNearRoadSpot(R, 1, 70);
if (Q && eupInAsph(Q.x, Q.z) && ebsWaterAt(Q.x, Q.z) === null)
return { x: Q.x, z: Q.z };
}
for (var t = 0; t < 5; t++) {
var A = EBS_AT.asph, a = R() * 6.283, big = R() < 0.75, cx = big ? A.x : -1200, cz = big ? A.z : -200, rr = big ? A.r : 700, d = Math.sqrt(R()) * rr, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (ebsWaterAt(x, z) !== null || ebsNearRoad(x, z, 1.5))
continue;
return { x: x, z: z };
}
return null;
}
ebsMany(eupTuftGeo(), tuftM, 14000, function (R) { var P = asphSpot(R); if (!P)
return null; var s = 1 + R() * 1.3; P.s = s; P.sy = s * (0.7 + R() * 0.6); P.ry = R() * 6; return P; }, { seed: 301, lite: 0.3 });
var drifts = [];
(function () { var r = wRand(302); for (var i = 0; i < 140; i++) {
var P = asphSpot(r);
if (P)
drifts.push([P.x, P.z, 12 + r() * 40]);
} })();
ebsMany(eupTuftGeo(), flowM, 8000, function (R) {
var D = drifts[(R() * drifts.length) | 0];
if (!D)
return null;
var a = R() * 6.283, d = Math.sqrt(R()) * D[2], x = D[0] + Math.cos(a) * d, z = D[1] + Math.sin(a) * d;
if (ebsWaterAt(x, z) !== null || ebsNearRoad(x, z, 1))
return null;
var s = 0.8 + R() * 0.8;
return { x: x, z: z, s: s, sy: s * (1 + R() * 0.5), ry: R() * 6 };
}, { seed: 303, lite: 0.3 });
ebsMany(eupTuftGeo(), dryM, 8000, function (R) { var P = R() < 0.6 ? eupNearRoadSpot(R, 1, 40) : ebsMainSpot(R, 0, 1); if (!P || ebsRegion(P.x) !== "main" || eupInAsph(P.x, P.z) || !ebsFreeAt(P.x, P.z, 0.5))
return null; var s = 0.5 + R() * 0.8; return { x: P.x, z: P.z, s: s, sy: s * (0.6 + R() * 0.6), ry: R() * 6 }; }, { seed: 304, lite: 0.3 });
var pebble = ebsBoulderGeo(305, 0);
ebsMany(pebble, rock, 4000, function (R) { var P = R() < 0.6 ? eupNearRoadSpot(R, 0.5, 30) : ebsMainSpot(R, 0, 1); if (!P || ebsRegion(P.x) !== "main" || !ebsFreeAt(P.x, P.z, 0.3))
return null; var s = 0.12 + R() * 0.45; return { x: P.x, z: P.z, s: s, sy: s * 0.6, ry: R() * 6, dy: -s * 0.1 }; }, { seed: 306, lite: 0.3 });
ebsMany(ebsBoulderGeo(307, EBS.lite ? 0 : 1), rock, 900, function (R) { var P = eupNearRoadSpot(R, 8, 90); if (!P || ebsRegion(P.x) !== "main" || !ebsFreeAt(P.x, P.z, 4))
return null; var s = 2 + R() * 6; P.s = s; P.sy = s * (0.5 + R() * 0.7); P.ry = R() * 6; P.dy = -s * 0.2; P.solid = s * 0.75; return P; }, { seed: 307, lite: 0.35 });
ebsMany(ebsSpireGeo(308, 1), ebsStone("cave"), 700, function (R) { var P = eupNearRoadSpot(R, 10, 120); if (!P || ebsRegion(P.x) !== "main" || !ebsFreeAt(P.x, P.z, 4))
return null; var h = 6 + R() * (R() < 0.2 ? 50 : 18); P.s = h * 0.16; P.sy = h; P.sz = P.s; P.ry = R() * 6; P.tx = (R() - 0.5) * 0.1; P.dy = -1; P.solid = P.s * 0.9; return P; }, { seed: 308, lite: 0.35 });
ebsMany(eupBonesGeo(), boneM, EBS.lite ? 200 : 700, function (R) { var x = (R() - 0.5) * 2800, z = 2300 + R() * 900; if (!ebsFreeAt(x, z, 0.6))
return null; var s = 0.9 + R() * 0.5; return { x: x, z: z, s: s, ry: R() * 6 }; }, { seed: 309, lite: 0.4 });
var herms = [], braz = [];
EBS_ROADS.forEach(function (Rd, ri) {
if (ebsRegion(Rd.pts[0][0]) !== "main")
return;
var carry = 20;
for (var i = 1; i < Rd.pts.length; i++) {
var a = Rd.pts[i - 1], b = Rd.pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
if (!L)
continue;
var nx = -(b[1] - a[1]) / L, nz = (b[0] - a[0]) / L, ry = Math.atan2(b[0] - a[0], b[1] - a[1]);
for (var d = carry; d < L; d += (EBS.lite ? 140 : 70)) {
var k = (herms.length + braz.length) % 3, side = ((d / 70) | 0) % 2 ? 1 : -1, off = Rd.w / 2 + 2.2, x = a[0] + (b[0] - a[0]) * d / L + nx * off * side, z = a[1] + (b[1] - a[1]) * d / L + nz * off * side;
if (!ebsFreeAt(x, z, 0.8) || ebsWaterAt(x, z) !== null)
continue;
(k === 0 ? braz : herms).push({ x: x, z: z, ry: ry + (side > 0 ? -Math.PI / 2 : Math.PI / 2) });
}
carry = (carry - L) % 70;
if (carry < 0)
carry += 70;
}
});
if (herms.length) {
var hi = 0;
ebsMany(eupHermGeo(), grey, herms.length, function () { var H = herms[hi++]; if (!H)
return null; return { x: H.x, z: H.z, s: 1, ry: H.ry, solid: 0.4 }; }, { seed: 310, lite: 1 });
}
if (braz.length) {
var bi = 0, fi = 0;
ebsMany(eupBrazierGeo(), bronze, braz.length, function () { var B = braz[bi++]; if (!B)
return null; return { x: B.x, z: B.z, s: 1, ry: 0, solid: 0.5 }; }, { seed: 311, lite: 1 });
ebsMany(eupFlameGeo(), eupFlameMat(), braz.length, function () { var B = braz[fi++]; if (!B)
return null; return { x: B.x, z: B.z, s: 1, ry: (fi * 1.7) % 6.28, dy: 1.42 }; }, { seed: 312, lite: 1 });
braz.forEach(function (B, i) { if (i % 4)
return; var gl = wGlow(0xFF9A40, 9, 0.35); gl.position.set(B.x, ebsLand(B.x, B.z) + 2.2, B.z); gl.userData.keep = 1; G.add(gl); });
}
eupPit(G);
eupTartarus(G);
eupBanks(G);
eupNearBuild(G);
EUP.made++;
},
function (G) {
var T = EBS_AT.tmouth, lite = EBS.lite, strata = ebsS("b:strata", 0x4A3A36, 8), black = ebsStone("black"), iron = ebsStone("iron");
var prof = [], steps = 21;
for (var k = 0; k <= steps; k++) {
var r = 430 - k * 6.2, y = -k * 20;
prof.push(new THREE.Vector2(r + 0.01, y));
prof.push(new THREE.Vector2(r - 4, y - 0.6));
}
prof.push(new THREE.Vector2(290, -424));
prof.reverse();
var lg = new THREE.LatheGeometry(prof, lite ? 40 : 80);
var lm = new THREE.Mesh(lg, ebsM("eupPitWall", function () { var m = strata.clone(); m.side = THREE.DoubleSide; return m; }));
lm.position.set(T.x, 0.3, T.z);
lm.userData.keep = 1;
lm.raycast = function () { };
G.add(lm);
var crack = new THREE.PlaneGeometry(1, 1);
crack.rotateX(-Math.PI / 2);
var cm = ebsM("eupCrack", function () { var m = new THREE.MeshBasicMaterial({ map: ebsFireTex(), color: 0xFF7A30, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }); m.userData.noPhoto = 1; return m; });
ebsMany(crack, cm, lite ? 260 : 900, function (R) { var k = 1 + ((R() * (steps - 1)) | 0), r = 430 - k * 6.2 - 1.2 - R() * 1.6, a = R() * 6.283; return { x: T.x + Math.cos(a) * r, z: T.z + Math.sin(a) * r, y: -k * 20 - 1.5, s: 0.8 + R() * 1.4, sy: 1, sz: 4 + R() * 14, ry: -a }; }, { seed: 320, lite: 1 });
ebsMany(ebsSpireGeo(321, 1), black, lite ? 60 : 220, function (R) { var k = 1 + ((R() * (steps - 1)) | 0), r = 430 - k * 6.2 - 2, a = R() * 6.283, h = 4 + R() * 16; return { x: T.x + Math.cos(a) * r, z: T.z + Math.sin(a) * r, y: -k * 20 - 2, s: h * 0.18, sy: h, sz: h * 0.14, ry: R() * 6, tx: (R() - 0.5) * 0.3 }; }, { seed: 321, lite: 1 });
var lake = new THREE.Mesh(new THREE.CircleGeometry(300, lite ? 32 : 64), ebsWaterMat(0xFF6A1A, true));
lake.rotation.x = -Math.PI / 2;
lake.position.set(T.x, -420, T.z);
lake.userData.keep = 1;
G.add(lake);
EBS.flows.push({ m: lake.material, sp: 0.03 });
for (var i = 0; i < (lite ? 4 : 10); i++) {
var a = i / 10 * Math.PI * 2, r2 = i ? 160 : 0, gl = wGlow(0xFF5A1A, i ? 260 : 420, 0.5);
gl.position.set(T.x + Math.cos(a) * r2, -380, T.z + Math.sin(a) * r2);
gl.userData.keep = 1;
G.add(gl);
}
for (var j = 0; j < (lite ? 6 : 14); j++) {
var a2 = j / 14 * Math.PI * 2, r3 = 300 + ((j * 53) % 110), g2 = wGlow(0xFF6A2A, 90, 0.3);
g2.position.set(T.x + Math.cos(a2) * r3, -((430 - r3) / 6.2) * 20 + 6, T.z + Math.sin(a2) * r3);
g2.userData.keep = 1;
G.add(g2);
}
ebsLightSrc(T.x, -200, T.z, 0xFF4A10, 3, 520, false);
var n = lite ? 14 : 36;
ebsMany(eupChainGeo(12), iron, n, function (R) { var i2 = (EUP._ci = (EUP._ci || 0) + 1), a = i2 / n * Math.PI * 2 + 0.05, r = 413, sc = 2.4 + R() * 1.4; return { x: T.x + Math.cos(a) * r, z: T.z + Math.sin(a) * r, y: 1.2, s: sc, ry: -a }; }, { seed: 322, lite: 1 });
EUP._ci = 0;
var strands = lite ? 3 : 6, N = lite ? 60 : 110, links = [];
for (var s2 = 0; s2 < strands; s2++) {
var ang = s2 / strands * Math.PI + 0.3, x0 = Math.cos(ang) * 412, z0 = Math.sin(ang) * 412, sag = 110 + s2 * 22;
for (var l = 0; l <= N; l++) {
var t = l / N;
links.push([T.x + x0 * (1 - 2 * t), 2 - Math.sin(t * Math.PI) * sag, T.z + z0 * (1 - 2 * t)]);
}
links.push(null);
}
var lg2 = eupG("bigLink", function () { var g = new THREE.TorusGeometry(2.2, 0.6, 5, 10); g.scale(1, 1.7, 1); g.rotateX(Math.PI / 2); return g; });
var im = new THREE.InstancedMesh(lg2, iron, links.length), o = new THREE.Object3D(), k = 0;
for (var q = 0; q < links.length - 1; q++) {
var A = links[q], B = links[q + 1];
if (!A || !B)
continue;
o.position.set(A[0], A[1], A[2]);
o.up.set(0, 1, 0);
o.lookAt(B[0], B[1], B[2]);
if (q % 2)
o.rotateZ(Math.PI / 2);
o.updateMatrix();
im.setMatrixAt(k++, o.matrix);
}
im.count = k;
im.instanceMatrix.needsUpdate = true;
im.frustumCulled = false;
im.userData.keep = 1;
im.raycast = function () { };
G.add(im);
},
function (G) {
var lite = EBS.lite, bronze = ebsStone("bronze"), iron = ebsStone("iron"), black = ebsStone("black"), boneM = ebsLam(0xC8BCA8);
var rivers = EUP_FISS.map(function (F) { return F.pts.map(function (p) { return [EBS_TAR_X + p[0], p[1]]; }); });
EUP_FISS.forEach(function (F, i) {
var P = rivers[i], m = new THREE.Mesh(ebsRibbon(P, F.w, -2.4), ebsWaterMat(0xFF6A1A, true));
m.userData.keep = 1;
m.userData.region = "tartarus";
G.add(m);
ebsDim(P, function (x, z) { var gl = wGlow(0xFF5A1A, 44, 0.4); gl.position.set(x, 2, z); gl.userData.region = "tartarus"; gl.userData.keep = 1; G.add(gl); }, lite ? 320 : 170);
});
function nearFire(x, z, m) { for (var i = 0; i < rivers.length; i++)
if (rivers[i].length > 1 && ebsPathD(x, z, rivers[i]) < m)
return true; return false; }
function spot(R, mg) { var P = eupTarSpot(R, mg); if (!P || nearFire(P.x, P.z, mg + 8))
return null; return P; }
ebsMany(ebsBoulderGeo(341, lite ? 0 : 1), black, 900, function (R) { var P = spot(R, 5); if (!P)
return null; var s = 4 + R() * (R() < 0.2 ? 16 : 8); P.s = s; P.sy = s * (0.8 + R() * 1.2); P.ry = R() * 6; P.dy = -s * 0.2; P.solid = s * 0.7; return P; }, { seed: 341, region: "tartarus", lite: 0.35 });
[342, 343, 344].forEach(function (sd) { ebsMany(eupRuinGeo(sd), bronze, lite ? 20 : 70, function (R) { var P = spot(R, 8); if (!P)
return null; P.s = 1 + R() * 0.8; P.sy = P.s * (0.8 + R() * 0.8); P.ry = R() * 6; P.tz = (R() - 0.5) * 0.1; P.solid = 5 * P.s; return P; }, { seed: sd, region: "tartarus", lite: 1 }); });
var gib = [];
(function () { var R = wRand(345); for (var i = 0; i < (lite ? 20 : 70); i++) {
var P = eupNearRoadSpot(R, 4, 30) || spot(R, 3);
if (!P || ebsRegion(P.x) !== "tartarus")
continue;
if (!ebsFreeAt(P.x, P.z, 2))
continue;
gib.push({ x: P.x, z: P.z, ry: R() * 6 });
} })();
var gi = 0, ci = 0;
ebsMany(eupGibbetGeo(), ebsS("bark", 0x2A2018, 2), gib.length, function () { var B = gib[gi++]; if (!B)
return null; return { x: B.x, z: B.z, s: 1, ry: B.ry, solid: 0.4 }; }, { seed: 346, region: "tartarus", lite: 1 });
ebsMany(eupCageGeo(), iron, gib.length, function () { var B = gib[ci++]; if (!B)
return null; var ax = B.x + Math.cos(-B.ry) * 2.9, az = B.z + Math.sin(-B.ry) * 2.9; return { x: ax, z: az, y: ebsLand(B.x, B.z) + 5.15, s: 1, ry: B.ry }; }, { seed: 347, region: "tartarus", lite: 1 });
ebsMany(eupChainGeo(10), iron, lite ? 30 : 160, function (R) { var P = spot(R, 2); if (!P)
return null; return { x: P.x, z: P.z, y: ebsLand(P.x, P.z) + 0.3, s: 1.2 + R() * 1.4, ry: R() * 6, tx: Math.PI / 2, tz: (R() - 0.5) * 0.4 }; }, { seed: 348, region: "tartarus", lite: 1 });
ebsMany(eupBonesGeo(), boneM, lite ? 250 : 700, function (R) { var P = spot(R, 0.5); if (!P)
return null; var s = 0.9 + R() * 0.6; return { x: P.x, z: P.z, s: s, ry: R() * 6 }; }, { seed: 349, region: "tartarus", lite: 0.3 });
var pits = [];
(function () { var R = wRand(350); for (var i = 0; i < (lite ? 20 : 60); i++) {
var P = spot(R, 4);
if (P)
pits.push(P);
} })();
var pi1 = 0, pi2 = 0, pi3 = 0;
ebsMany(ebsBoulderGeo(351, 0), black, pits.length * 8, function (R) { var P = pits[(pi1++ / 8) | 0]; if (!P)
return null; var a = (pi1 % 8) / 8 * 6.283; return { x: P.x + Math.cos(a) * 2.2, z: P.z + Math.sin(a) * 2.2, s: 0.6 + R() * 0.4, sy: 0.5, ry: R() * 6 }; }, { seed: 351, region: "tartarus", lite: 1 });
ebsMany(eupFlameGeo(), eupFlameMat(), pits.length, function () { var P = pits[pi2++]; if (!P)
return null; return { x: P.x, z: P.z, s: 2.4, sy: 2.2, ry: pi2 }; }, { seed: 352, region: "tartarus", lite: 1 });
var sm = ebsM("eupSmokeM", function () { var m = new THREE.MeshBasicMaterial({ map: eupSmokeTex(), transparent: true, depthWrite: false, side: THREE.DoubleSide, opacity: 0.8 }); m.userData.noPhoto = 1; return m; });
var smg = eupG("smoke", function () { var a = new THREE.PlaneGeometry(1, 2); a.translate(0, 1, 0); var b = a.clone(); b.rotateY(Math.PI / 2); return eupMerge([a, b]); });
ebsMany(smg, sm, pits.length, function () { var P = pits[pi3++]; if (!P)
return null; return { x: P.x, z: P.z, s: 14, sy: 24, ry: pi3 * 0.7, dy: 2 }; }, { seed: 353, region: "tartarus", lite: 1 });
pits.forEach(function (P, i) { if (i % 2)
return; var gl = wGlow(0xFF6A20, 26, 0.4); gl.position.set(P.x, ebsLand(P.x, P.z) + 3, P.z); gl.userData.region = "tartarus"; gl.userData.keep = 1; G.add(gl); });
var bz = [];
EBS_ROADS.forEach(function (Rd) { if (ebsRegion(Rd.pts[0][0]) !== "tartarus")
return; ebsDim(Rd.pts, function (x, z) { [-1, 1].forEach(function (sd) { var xx = x + sd * (Rd.w / 2 + 2.4); if (ebsFreeAt(xx, z, 0.8))
bz.push([xx, z]); }); }, lite ? 120 : 60); });
var b1 = 0, b2 = 0;
ebsMany(eupBrazierGeo(), bronze, bz.length, function () { var B = bz[b1++]; if (!B)
return null; return { x: B[0], z: B[1], s: 1.2, solid: 0.6 }; }, { seed: 354, region: "tartarus", lite: 1 });
ebsMany(eupFlameGeo(), eupFlameMat(), bz.length, function () { var B = bz[b2++]; if (!B)
return null; return { x: B[0], z: B[1], s: 1.2, ry: b2, dy: 1.7 }; }, { seed: 355, region: "tartarus", lite: 1 });
},
function (m, kind) {
var C = EUP_GROUND[kind];
if (!C || m.userData.eup)
return m;
m.userData.eup = 1;
var rock = ebsPhotoTex(C.rock, 6), lite = EBS.lite;
m.onBeforeCompile = function (sh) {
sh.uniforms.eupRock = { value: rock };
sh.uniforms.eupO = { value: new THREE.Vector2(EBS.base || 0, 0) };
sh.uniforms.eupAmt = { value: C.amt };
sh.uniforms.eupTint = { value: new THREE.Vector3(C.tint[0], C.tint[1], C.tint[2]) };
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec2 vEupW;\nuniform vec2 eupO;")
.replace("#include <begin_vertex>", "#include <begin_vertex>\nvec4 eupWp=modelMatrix*vec4(transformed,1.0); vEupW=eupWp.xz-eupO;");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec2 vEupW;\nuniform sampler2D eupRock;\nuniform float eupAmt;\nuniform vec3 eupTint;")
.replace("#include <map_fragment>", [
"#ifdef USE_MAP",
"vec4 texelColor=mapTexelToLinear(texture2D(map,vUv));",
"float eupBig=texture2D(eupRock,vEupW*0.0021+vec2(0.37,0.11)).g*0.65+texture2D(map,vEupW*0.0137).g*0.55;",
"float eupM=smoothstep(0.50,0.66,eupBig)*eupAmt;",
"vec3 eupR=mapTexelToLinear(texture2D(eupRock,vEupW*0.19)).rgb*eupTint;",
"texelColor.rgb=mix(texelColor.rgb,eupR,eupM);",
lite ? "" : "texelColor.rgb*=0.74+0.52*texture2D(map,vEupW*0.53+vec2(0.21,0.63)).g;",
"diffuseColor*=texelColor;",
"#endif"
].join("\n"));
};
m.customProgramCacheKey = function () { return "eupGround" + kind + (lite ? "L" : ""); };
m.needsUpdate = true;
return m;
},
function (x, z) {
var r = ebsRegion(x), size, cells, cx, cz, lite = EBS.lite;
if (r === "main") {
var F = EBS.fineBox;
if (F && x > F.x0 + 24 && x < F.x1 - 24 && z > F.z0 + 24 && z < F.z1 - 24)
return ebsLand(x, z);
size = 2300;
cells = lite ? 64 : 112;
var i = Math.floor((x + 3450 + 1150) / 2300), j = Math.floor((z + 3450 + 1150) / 2300);
cx = -3450 + i * 2300;
cz = -3450 + j * 2300;
}
else if (r === "tartarus") {
size = 4200;
cells = lite ? 84 : 150;
cx = EBS_TAR_X;
cz = 0;
}
else
return ebsLand(x, z);
var s = size / cells, gx = (x - (cx - size / 2)) / s, gz = (z - (cz - size / 2)) / s, ix = Math.floor(gx), iz = Math.floor(gz), fx = gx - ix, fz = gz - iz;
var x0 = cx - size / 2 + ix * s, z0 = cz - size / 2 + iz * s;
var ha = ebsLand(x0, z0), hb = ebsLand(x0, z0 + s), hc = ebsLand(x0 + s, z0 + s), hd = ebsLand(x0 + s, z0);
return fx + fz < 1 ? ha + (hd - ha) * fx + (hb - ha) * fz : hc + (hb - hc) * (1 - fx) + (hd - hc) * (1 - fz);
},
function () {
var lite = EBS.lite, rock = ebsM("eupNearRock", function () { return ebsStone("rock").clone(); });
function tm(k, col) { return ebsM("eupNearT" + k, function () { var m = new THREE.MeshLambertMaterial({ map: eupTuftTex(k), alphaTest: 0.45, side: THREE.DoubleSide, color: col }); m.userData.noPhoto = 1; return m; }); }
var peb = eupG("nearPeb", function () { var g = ebsBoulderGeo(361, 0); return g; });
var stn = eupG("nearStone", function () { return ebsBoulderGeo(362, lite ? 0 : 1); });
var bone = eupBonesGeo();
return [
{ k: "tuft", geo: eupTuftGeo(), mat: tm(0, 0xFFFFFF), n: lite ? 16 : 34, col: true },
{ k: "flower", geo: eupTuftGeo(), mat: tm(1, 0xE0E4D6), n: lite ? 10 : 22 },
{ k: "peb", geo: peb, mat: rock, n: lite ? 10 : 22, col: true },
{ k: "stone", geo: stn, mat: rock, n: lite ? 2 : 4, col: true },
{ k: "bone", geo: bone, mat: ebsLam(0xD0C6B2), n: lite ? 1 : 2 }
];
},
function (G) {
var N = EUP_NEAR;
N.rad = EBS.lite ? 3 : 5;
var W = 2 * N.rad + 1;
N.kinds = eupNearKinds();
N.slots = new Array(W * W).fill(null);
N.W = W;
N.ms = N.kinds.map(function (K) {
var im = new THREE.InstancedMesh(K.geo, K.mat, K.n * W * W), z = new THREE.Matrix4().makeScale(0, 0, 0);
for (var i = 0; i < im.count; i++)
im.setMatrixAt(i, z);
if (K.col) {
var c = new THREE.Color(1, 1, 1);
for (var j = 0; j < im.count; j++)
im.setColorAt(j, c);
}
im.frustumCulled = false;
im.userData.keep = 1;
im.userData.dist = 1;
im.raycast = function () { };
im.visible = false;
im.receiveShadow = true;
G.add(im);
return im;
});
N.cx = N.cz = null;
N.on = true;
},
function (cx, cz, slot) {
var N = EUP_NEAR, S = N.cell, R = wRand(eupHash(cx, cz)), M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), p = new THREE.Vector3(), col = new THREE.Color();
var mx = (cx + 0.5) * S, mz = (cz + 0.5) * S, reg = ebsRegion(mx), T = EBS_AT.tmouth, asph = reg === "main" && eupInAsph(mx, mz), tar = reg === "tartarus";
var nearRoad = reg === "main" || tar ? ebsNearRoad(mx, mz, S) : false;
N.kinds.forEach(function (K, ki) {
var im = N.ms[ki], base = slot * K.n;
for (var i = 0; i < K.n; i++) {
var x = cx * S + R() * S, z = cz * S + R() * S, ok = reg === "main" || tar, sc = 0, a = R() * 6.283, r1 = R(), r2 = R();
if (ok) {
if (K.k === "flower" && !asph)
ok = false;
if (K.k === "bone" && !(tar || (reg === "main" && z > 2200 && z < 3300)))
ok = false;
if (K.k === "tuft" && tar && r2 > 0.35)
ok = false;
if (ok && reg === "main" && Math.hypot(x - T.x, z - T.z) < 448)
ok = false;
if (ok && nearRoad && ebsNearRoad(x, z, K.k === "tuft" || K.k === "flower" ? 0.2 : 0.6))
ok = false;
if (ok && ebsWaterAt(x, z) !== null)
ok = false;
if (ok && tar && eupFissD(x - EBS_TAR_X, z) < 2)
ok = false;
if (ok) {
for (var f = 0; f < EBS.floors.length; f++) {
var Fl = EBS.floors[f];
if (!Fl.inside && Math.abs(x - Fl.x) < Fl.hw + 1 && Math.abs(z - Fl.z) < Fl.hd + 1) {
ok = false;
break;
}
}
}
}
if (ok) {
var y = eupMeshH(x, z);
if (ebsSolidAt(x, z, y))
ok = false;
else {
var sy = 1, dy = 0, tx = 0, tz = 0;
if (K.k === "tuft") {
sc = asph ? 1 + r1 * 1.2 : 0.6 + r1 * 0.9;
sy = sc * (0.6 + R() * 0.6);
dy = -0.1;
col.setHex(tar ? 0x3A2E28 : asph ? 0xB4BCA0 : 0x9A8A6C);
}
else if (K.k === "flower") {
sc = 0.9 + r1 * 0.9;
sy = sc * (1 + R() * 0.4);
dy = -0.1;
}
else if (K.k === "peb") {
sc = 0.08 + r1 * r1 * 0.4;
sy = sc * 0.55;
dy = -sc * 0.15;
col.setHex(tar ? 0x2E2626 : 0xB0A89E);
tx = (R() - 0.5) * 0.4;
}
else if (K.k === "stone") {
sc = 0.5 + r1 * r1 * 1.6;
sy = sc * (0.45 + R() * 0.4);
dy = -sc * 0.25;
col.setHex(tar ? 0x3A3030 : 0x9A9088);
tx = (R() - 0.5) * 0.3;
tz = (R() - 0.5) * 0.3;
}
else if (K.k === "bone") {
sc = 0.9 + r1 * 0.4;
dy = 0;
}
e.set(tx, a, tz);
q.setFromEuler(e);
s.set(sc, K.k === "tuft" || K.k === "flower" || K.k === "peb" || K.k === "stone" ? sy : sc, sc);
p.set(x, y + dy, z);
M.compose(p, q, s);
im.setMatrixAt(base + i, M);
if (K.col)
im.setColorAt(base + i, col);
continue;
}
}
M.makeScale(0, 0, 0);
im.setMatrixAt(base + i, M);
}
});
},
function () {
var N = EUP_NEAR;
if (!N.on || !EBS.built)
return;
var L = worldLocal(), reg = ebsRegion(L.x), show = (reg === "main" || reg === "tartarus") && !EBS.room;
if (N.ms[0].visible !== show)
N.ms.forEach(function (m) { m.visible = show; });
if (!show)
return;
var S = N.cell, cx = Math.floor(L.x / S), cz = Math.floor(L.z / S);
if (cx === N.cx && cz === N.cz)
return;
N.cx = cx;
N.cz = cz;
var W = N.W, dirty = false;
for (var i = -N.rad; i <= N.rad; i++)
for (var j = -N.rad; j <= N.rad; j++) {
var X = cx + i, Z = cz + j, slot = ((X % W + W) % W) * W + ((Z % W + W) % W), key = X + "," + Z;
if (N.slots[slot] === key)
continue;
N.slots[slot] = key;
eupNearCell(X, Z, slot);
dirty = true;
}
if (dirty)
N.ms.forEach(function (m) { m.instanceMatrix.needsUpdate = true; if (m.instanceColor)
m.instanceColor.needsUpdate = true; });
},
function (G) {
if (!EUP.on)
return;
function tm(k, col) { return ebsM("eupBankT" + k + col, function () { var m = new THREE.MeshLambertMaterial({ map: eupTuftTex(k), alphaTest: 0.45, side: THREE.DoubleSide, color: col }); m.userData.noPhoto = 1; return m; }); }
function bank(pts, w, every, d0, d1, seed) {
var out = [], r = wRand(seed);
for (var i = 1; i < pts.length; i++) {
var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
if (!L)
continue;
var nx = -(b[1] - a[1]) / L, nz = (b[0] - a[0]) / L;
for (var d = r() * every; d < L; d += every * (0.5 + r())) {
var sd = r() < 0.5 ? -1 : 1, off = w / 2 + d0 + r() * (d1 - d0), x = a[0] + (b[0] - a[0]) * d / L + nx * off * sd, z = a[1] + (b[1] - a[1]) * d / L + nz * off * sd;
out.push([x, z]);
}
}
return out;
}
function many(geo, mat, list, lvl, sMin, sMax, tall, seed, reg) {
var i = 0;
return ebsMany(geo, mat, list.length, function (R) {
for (; i < list.length;) {
var P = list[i++], x = P[0], z = P[1];
if (ebsNearRoad(x, z, 1))
continue;
var y = Math.max(ebsLand(x, z), lvl - 0.5);
if (y > lvl + 6)
continue;
var s = sMin + R() * (sMax - sMin);
return { x: x, z: z, y: y - 0.1, s: s, sy: s * tall * (0.8 + R() * 0.4), ry: R() * 6 };
}
return null;
}, { seed: seed, lite: 0.35, region: reg });
}
var RV = EBS_RIVERS;
many(eupTuftGeo(), tm(3, 0xA8B890), bank(RV.acheron.pts, RV.acheron.w + 6, 2.6, -5, 6, 371), RV.acheron.lvl, 1.2, 2, 1.8, 372);
many(eupTuftGeo(), tm(3, 0x3A3440), bank(RV.styx.pts, RV.styx.w + 6, 3.2, -4, 5, 373), RV.styx.lvl, 1.1, 1.8, 1.7, 374);
many(eupTuftGeo(), tm(2, 0xFFFFFF), bank(RV.lethe.pts, RV.lethe.w + 6, 1.6, 1, 12, 375), RV.lethe.lvl, 0.8, 1.3, 1.1, 376);
var floe = eupG("floe", function () { var g = new THREE.CylinderGeometry(1, 1.1, 0.3, 7); var p = g.attributes.position, r = wRand(377); for (var i = 0; i < p.count; i++) {
var k = 0.7 + ((Math.abs(p.getX(i) * 13 + p.getZ(i) * 7) | 0) % 5) * 0.1;
p.setX(i, p.getX(i) * k);
p.setZ(i, p.getZ(i) * (k * 0.8));
} g.computeVertexNormals(); return g; });
var ice = ebsM("eupIce", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECF8, emissive: 0x2A3A4A, shininess: 120, specular: 0xFFFFFF }); m.userData.noPhoto = 1; return m; });
var C = RV.cocytus, fl = bank(C.pts, 0, 7, -(C.w / 2 - 3), -(1), 378);
var fi = 0;
ebsMany(floe, ice, fl.length, function (R) { var P = fl[fi++]; if (!P || ebsNearRoad(P[0], P[1], 2))
return null; var s = 1.2 + R() * 3; return { x: P[0], z: P[1], y: C.lvl + 0.02, s: s, sy: 1, ry: R() * 6 }; }, { seed: 379, lite: 0.35 });
},
function () {
return ebsCanvas("eupBanner", 128, 512, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#1A0E26");
g.addColorStop(1, "#0A060E");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var r = wRand(391);
for (var i = 0; i < 1400; i++) {
x.fillStyle = "rgba(120,80,160," + (r() * 0.08) + ")";
x.fillRect(r() * W, r() * H, 1, 3);
}
x.strokeStyle = "#D8A848";
x.lineWidth = 5;
x.strokeRect(8, 8, W - 16, H - 40);
x.lineWidth = 1.5;
x.strokeRect(15, 15, W - 30, H - 54);
x.fillStyle = "#E8B84A";
var cx = W / 2;
x.fillRect(cx - 3, 110, 6, 250);
x.fillRect(cx - 26, 110, 52, 7);
x.fillRect(cx - 26, 60, 6, 56);
x.fillRect(cx + 20, 60, 6, 56);
x.beginPath();
x.moveTo(cx - 29, 64);
x.lineTo(cx - 23, 40);
x.lineTo(cx - 17, 64);
x.fill();
x.beginPath();
x.moveTo(cx + 17, 64);
x.lineTo(cx + 23, 40);
x.lineTo(cx + 29, 64);
x.fill();
x.beginPath();
x.arc(cx, 370, 10, 0, 6.283);
x.fill();
for (var k = 0; k < 6; k++) {
var bx = 14 + k * 17;
x.fillRect(bx, 410, 14, 3);
x.fillRect(bx + 11, 400, 3, 13);
x.fillRect(bx + 4, 400, 10, 3);
x.fillRect(bx + 4, 400, 3, 8);
}
for (var f = 0; f < 16; f++) {
x.fillRect(10 + f * 7, H - 32, 2.4, 26 + (f % 2) * 4);
}
});
},
function (g, x, y, z, s, mat, ry) {
var b = new THREE.Group();
b.position.set(x, y, z);
b.rotation.y = ry || 0;
b.scale.setScalar(s / 10);
g.add(b);
wBox(0.7, 8, 0.5, mat, 0, 4, 0, b);
wBox(4.6, 0.7, 0.5, mat, 0, 8, 0, b);
[-2, 2].forEach(function (px) { wBox(0.6, 3.2, 0.5, mat, px, 9.9, 0, b); var t = wCone(0.55, 1.4, mat, px, 12.2, 0, b, 4); });
wSph(0.6, mat, 0, 0.2, 0, b, 10);
return b;
},
function (G) {
var P = EBS_AT.palace, py = P.h, lite = EBS.lite, g = ebsDistrict(G, P.x, P.z, P.r + 260, true), blk = ebsStone("black"), gold = ebsStone("gold"), bronze = ebsStone("bronze");
wBox(10, 0.14, 2.6, ebsS("b:brass", 0xC89048, 1, { shine: 110, spec: 0xFFE0A0, n: 0.3 }), P.x, py + 2.52 + 0.07, P.z + 31.7, g);
eupBident(g, P.x, py + 26.2, P.z + 35.7, 11, gold);
var rg = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.28, 6, 40), gold);
rg.position.set(P.x, py + 32.4, P.z + 35.5);
g.add(rg);
var w2 = 48 - 1.43 * 1.4, sp = 2 * w2 / 11;
for (var i = 0; i < 11; i++) {
if (i === 5)
continue;
if (lite && i % 2)
continue;
eupBanner(g, P.x - w2 + sp * (i + 0.5), py + 2.52 + 20 - 7.6, P.z + 33.4, 3.6, 14);
}
[-1, 1].forEach(function (sd) {
var x = P.x + sd * 40, z = P.z + 47, y = py;
var pg = new THREE.CylinderGeometry(3.4, 4.8, 30, 4, 1);
pg.rotateY(Math.PI / 4);
var pm = new THREE.Mesh(pg, blk);
pm.position.set(x, y + 15, z);
g.add(pm);
wBox(5.6, 1.2, 5.6, gold, x, y + 30.4, z, g);
wBox(7.4, 1.4, 7.4, blk, x, y + 0.7, z, g);
wBox(6.9, 0.4, 6.9, gold, x, y + 1.6, z, g);
eupBanner(g, x, y + 16, z + 3.2, 3.6, 18, 0);
ebsBrazier(g, x, y + 31, z, 2.4, x, z, 0x8AB0FF);
ebsSolid(x, z, 7.4, 7.4, y - 2, y + 31);
});
var nT = lite ? 6 : 12;
for (var t = 0; t < nT; t++) {
var tz = P.z + 70 + t * (165 / (nT - 1));
[-93, 93].forEach(function (tx, j) { ebsTree("cypress", g, P.x + tx, py, tz, 1.1, 3900 + t * 2 + j); ebsRound(P.x + tx, tz, 0.8, py - 2, py + 10); });
}
var nB = lite ? 3 : 6;
for (var b = 0; b < nB; b++) {
var bz = P.z + 96 + b * (108 / (nB - 1));
[-9.5, 9.5].forEach(function (bx) { ebsBrazier(g, P.x + bx, py, bz, 1.3, P.x + bx, bz, 0x8AB0FF); ebsRound(P.x + bx, bz, 0.6, py - 1, py + 2); });
}
var cg = ebsCrystalGeo(), am = eupAmethystMat(), R = wRand(392), n = lite ? 24 : 70, im = new THREE.InstancedMesh(cg, am, n), o = new THREE.Object3D(), k = 0;
for (var c = 0; c < n * 3 && k < n; c++) {
var side = R(), x, z;
if (side < 0.35) {
x = P.x - 53 - R() * 5;
z = P.z - 38 + R() * 74;
}
else if (side < 0.7) {
x = P.x + 53 + R() * 5;
z = P.z - 38 + R() * 74;
}
else {
x = P.x - 50 + R() * 100;
z = P.z - 40 - R() * 5;
}
var y = ebsGround(x, z);
o.position.set(x, y - 0.3, z);
o.rotation.set((R() - 0.5) * 0.5, R() * 6, (R() - 0.5) * 0.5);
o.scale.setScalar(1.2 + R() * 2.4);
o.updateMatrix();
im.setMatrixAt(k++, o.matrix);
}
im.count = k;
im.instanceMatrix.needsUpdate = true;
im.userData.keep = 1;
im.raycast = function () { };
g.add(im);
},
function () {
return ebsCanvas("eupSwirl", 256, 256, function (x, W, H) {
var cols = [[78, 110, 58], [94, 146, 180], [255, 106, 26], [74, 42, 122], [232, 240, 242]], img = x.createImageData(W, H), d = img.data;
for (var j = 0; j < H; j++)
for (var i = 0; i < W; i++) {
var u = i / W - 0.5, v = j / H - 0.5, r = Math.hypot(u, v) * 2, a = Math.atan2(v, u) / (Math.PI * 2) + 0.5, t = (a * 5 + r * 3.2) % 5, c0 = Math.floor(t), f = t - c0, c1 = (c0 + 1) % 5;
f = f < 0.7 ? 0 : (f - 0.7) / 0.3;
f = f * f * (3 - 2 * f);
var p = (j * W + i) * 4, n = 0.85 + 0.15 * Math.sin(r * 40 + a * 30);
d[p] = (cols[c0][0] * (1 - f) + cols[c1][0] * f) * n;
d[p + 1] = (cols[c0][1] * (1 - f) + cols[c1][1] * f) * n;
d[p + 2] = (cols[c0][2] * (1 - f) + cols[c1][2] * f) * n;
d[p + 3] = 255;
}
x.putImageData(img, 0, 0);
});
},
function () {
return ebsCanvas("eupHallFloor", 1024, 768, function (x, W, H) {
var r = wRand(393);
x.fillStyle = "#0C0A0E";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 60; i++) {
x.fillStyle = "rgba(" + (30 + r() * 30 | 0) + "," + (26 + r() * 24 | 0) + "," + (36 + r() * 30 | 0) + ",0.5)";
x.fillRect(r() * W, r() * H, 40 + r() * 120, 40 + r() * 120);
}
x.lineWidth = 1;
for (i = 0; i < 70; i++) {
x.strokeStyle = "rgba(232,184,74," + (0.12 + r() * 0.35) + ")";
var px = r() * W, py = r() * H;
x.beginPath();
x.moveTo(px, py);
for (var k = 0; k < 9; k++) {
px += (r() - 0.5) * 70;
py += (r() - 0.5) * 70;
x.lineTo(px, py);
}
x.stroke();
}
x.strokeStyle = "#C89A3A";
x.lineWidth = 6;
x.strokeRect(22, 22, W - 44, H - 44);
x.lineWidth = 2;
x.strokeRect(38, 38, W - 76, H - 76);
x.fillStyle = "#C89A3A";
for (var b = 0; b < Math.floor((W - 90) / 24); b++) {
var bx = 46 + b * 24;
x.fillRect(bx, 26, 18, 3);
x.fillRect(bx + 15, 26, 3, 10);
}
});
},
function (grp, I) {
var X = I.x, Z = I.z, lite = EBS.lite, blk = ebsStone("black"), gold = ebsStone("gold"), dk = ebsStone("dark"), bronze = ebsStone("bronze");
var fm = ebsM("eupHallFloorM", function () { var m = new THREE.MeshPhongMaterial({ map: eupFloorTex(), color: 0xB8B4BC, shininess: 40, specular: 0x222026 }); m.userData.noPhoto = 1; return m; });
var fl = new THREE.Mesh(new THREE.PlaneGeometry(59, 43), fm);
fl.rotation.x = -Math.PI / 2;
fl.position.set(X, 0.015, Z);
grp.add(fl);
var sw = eupSwirlTex();
sw.center.set(0.5, 0.5);
var swm = ebsM("eupSwirlM", function () { var m = new THREE.MeshPhongMaterial({ map: sw, emissive: 0x2A2030, emissiveMap: sw, shininess: 120, specular: 0x8A8AA0 }); m.userData.noPhoto = 1; return m; });
var ring = new THREE.Mesh(new THREE.RingGeometry(3.7, 6.05, lite ? 32 : 64, 1), swm);
ring.rotation.x = -Math.PI / 2;
ring.position.set(X, 0.1, Z);
grp.add(ring);
var rot = {};
Object.defineProperty(rot, "y", { get: function () { return sw.rotation; }, set: function (v) { sw.rotation = v; } });
EBS.flows.push({ m: { userData: { flow: { offset: rot } } }, sp: 0.05 });
var gaps = EUP_HALL_RIV.map(function (R) { var p = R.pts[R.pts.length - 1]; return Math.atan2(-p[1], p[0]); }).sort(function (a, b) { return a - b; }), half = 0.16;
for (var i = 0; i < gaps.length; i++) {
var a0 = gaps[i] + half, a1 = (i + 1 < gaps.length ? gaps[i + 1] : gaps[0] + Math.PI * 2) - half, len = a1 - a0;
var top = new THREE.Mesh(new THREE.RingGeometry(6.05, 6.55, 24, 1, a0, len), bronze);
top.rotation.x = -Math.PI / 2;
top.position.set(X, 0.32, Z);
grp.add(top);
var wl = new THREE.Mesh(new THREE.CylinderGeometry(6.3, 6.3, 0.32, 24, 1, true, Math.PI / 2 + a0, len), blk);
wl.position.set(X, 0.16, Z);
grp.add(wl);
}
ebsRound(X, Z, 5.6, -1, 1.2);
var rgl = wGlow(0xB8A0FF, 14, 0.18);
rgl.position.set(X, 0.8, Z);
grp.add(rgl);
ebsLook(X + 6.8, Z + 3, 2.4, "Where the five rivers meet", "before the throne of Hades", ["The five rivers of the underworld come into the king's hall through five culverts in the walls: the Styx and the Lethe from behind the thrones, the Cocytus from the west, the Phlegethon burning from the east, the Acheron from the south.", "Here they run together round the hearth of blue fire, violet, white, ice-blue, fire and green, and do not mix.", "Homer has rivers meeting below too: 'Pyriphlegethon and Cocytus, a branch of the water of Styx, flow into Acheron, at a rock where the two roaring rivers meet' (Odyssey 10.513-515)."]);
EUP_HALL_RIV.forEach(function (R) {
var wm = ebsWaterMat(R.col, !!R.fire), P = R.pts.map(function (p) { return [X + p[0], Z + p[1]]; });
for (var s = 1; s < P.length; s++) {
var a = P[s - 1], b = P[s], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz), ang = Math.atan2(dx, dz), mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
var pg = new THREE.PlaneGeometry(1.5, L + 1.2);
var uv = pg.attributes.uv;
for (var u = 0; u < uv.count; u++)
uv.setY(u, uv.getY(u) * (L + 1.2) / 1.5);
pg.rotateX(-Math.PI / 2);
var w = new THREE.Mesh(pg, wm);
w.position.set(mx, 0.08, mz);
w.rotation.y = ang;
grp.add(w);
[-1, 1].forEach(function (sd) {
var cx = mx + Math.cos(ang) * sd * 0.92, cz = mz - Math.sin(ang) * sd * 0.92;
var c = wBox(0.32, 0.22, L, dk, cx, 0.11, cz, grp);
c.rotation.y = ang;
var t = wBox(0.34, 0.04, L, bronze, cx, 0.24, cz, grp);
t.rotation.y = ang;
});
if (R.fire)
ebsDim([a, b], function (x, z) { var gl = wGlow(0xFF6A20, 4, 0.45); gl.position.set(x, 0.6, z); grp.add(gl); }, 4);
}
var s0 = P[0], ry = R.ry, cg = new THREE.Group();
cg.position.set(s0[0], 0, s0[1]);
cg.rotation.y = ry;
grp.add(cg);
wBox(0.8, 4.4, 1, blk, -1.6, 2.2, 0, cg);
wBox(0.8, 4.4, 1, blk, 1.6, 2.2, 0, cg);
wBox(4.2, 1, 1.1, blk, 0, 4.9, 0, cg);
wBox(0.8, 1.2, 1.2, gold, 0, 4.9, 0.1, cg);
wBox(2.4, 4.2, 0.1, ebsGlowM(R.fire ? 0x3A0A00 : 0x050408), 0, 2.1, -0.35, cg);
var sp = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.7), wm);
sp.position.set(0, 0.95, 0.2);
cg.add(sp);
var sg = ebsSignAt(R.n, 0, 5.9, 0.6, cg);
var lx = s0[0] + Math.sin(ry) * 2.2, lz = s0[1] + Math.cos(ry) * 2.2;
ebsLook(lx, lz, 2.4, R.n, R.sub, EUP_HALL_FACTS[R.k]);
if (R.fire) {
var fg = wGlow(0xFF6A20, 6, 0.5);
fg.position.set(0, 1.2, 0.6);
cg.add(fg);
}
});
var hm = ebsM("eupHanging", function () { var t = eupBannerTex(); var m = new THREE.MeshLambertMaterial({ map: t, color: 0xFFFFFF, emissive: 0x0C0614 }); m.userData.noPhoto = 1; return m; });
var hg = new THREE.Mesh(new THREE.PlaneGeometry(7, 14), hm);
hg.position.set(X, 13.6, Z - 21.6);
grp.add(hg);
wBox(8.4, 0.6, 0.6, gold, X, 20.8, Z - 21.5, grp);
wBox(8.4, 0.5, 0.6, gold, X, 6.4, Z - 21.5, grp);
wBox(0.5, 14.4, 0.5, gold, X - 3.9, 13.6, Z - 21.5, grp);
wBox(0.5, 14.4, 0.5, gold, X + 3.9, 13.6, Z - 21.5, grp);
[-1, 1].forEach(function (sd) { eupBident(grp, X + sd * 10.4, 0, Z - 21.2, 8, gold); });
[-1, 1].forEach(function (sd) { [-16, -8, 8, 16].forEach(function (bz) { if (lite && Math.abs(bz) === 8)
return; eupBanner(grp, X + sd * 29.6, 13, Z + bz, 3.2, 12, -sd * Math.PI / 2); }); });
var pil = [[-29.3, -12], [-29.3, -4], [-29.3, 12], [-29.3, 18], [29.3, -12], [29.3, -4], [29.3, 12], [29.3, 18], [-14, -21.3], [14, -21.3], [-27, -21.3], [27, -21.3], [-6, 21.3], [6, 21.3], [-22, 21.3], [22, 21.3]];
pil.forEach(function (p, i) { if (lite && i % 2)
return; ebsColumn(grp, X + p[0], 0, Z + p[1], 21.6, 0.7, blk, gold); });
[-1, 1].forEach(function (sd) { ebsBrazier(grp, X + sd * 8, 1.4, Z - 13.8, 1.2, X + sd * 8, Z - 13.8, 0x8AB0FF); });
var cg2 = ebsCrystalGeo(), am = eupAmethystMat();
[[-27, -19], [27, -19], [-27, 19], [27, 19]].forEach(function (c, j) { for (var q = 0; q < (lite ? 2 : 4); q++) {
var m = new THREE.Mesh(cg2, am), r = wRand(394 + j * 9 + q);
m.position.set(X + c[0] + (r() - 0.5) * 3, 0, Z + c[1] + (r() - 0.5) * 3);
m.rotation.y = r() * 6;
m.scale.setScalar(1 + r() * 1.4);
grp.add(m);
} ebsRound(X + c[0], Z + c[1], 2.2, -1, 3); });
},
function (S) {
var P = S.P, g = P.g;
if (typeof sofPose === "function") {
try {
sofPose(g, "sit", S.x, S.z, S.f, S.h, S.face || 0);
P.y = g.position.y;
return;
}
catch (e) { }
}
g.position.set(S.x, S.f + S.h - 0.95 * S.s, S.z);
g.rotation.y = S.face || 0;
var L = g.userData.limbs;
if (L) {
if (L.ll)
L.ll.rotation.x = -1.45;
if (L.rl)
L.rl.rotation.x = -1.45;
}
P.y = g.position.y;
},
function (metal) {
return ebsM("eupKey" + metal, function () {
var t = ebsCanvas("eupKeyTex" + metal, 256, 32, function (x, W, H) {
x.fillStyle = "#141216";
x.fillRect(0, 0, W, H);
x.fillStyle = metal === "gold" ? "#D8B04A" : "#C8CCD4";
x.fillRect(0, 1, W, 3);
x.fillRect(0, H - 4, W, 3);
for (var i = 0; i < 8; i++) {
var o = i * 32;
x.fillRect(o + 4, 7, 3, 19);
x.fillRect(o + 4, 7, 22, 3);
x.fillRect(o + 23, 7, 3, 14);
x.fillRect(o + 12, 18, 14, 3);
x.fillRect(o + 12, 13, 3, 8);
x.fillRect(o + 4, 23, 28, 3);
}
});
t.repeat.set(1.4, 1);
var m = new THREE.MeshLambertMaterial({ map: t });
m.userData.noPhoto = 1;
return m;
});
},
function (g, x, y, z, s, mat) {
var a = new THREE.Group();
a.position.set(x, y, z);
a.scale.setScalar(s);
g.add(a);
for (var i = -4; i <= 4; i++) {
var p = new THREE.Group();
p.rotation.z = i * 0.3;
a.add(p);
var L = i === 0 ? 0.3 : 0.26 - Math.abs(i) * 0.012;
var lf = wSph(0.05, mat, 0, L * 0.55, 0, p, 8);
lf.scale.set(0.55, L * 0.55 / 0.05, 0.35);
}
[-1, 1].forEach(function (sd) { var v = new THREE.Mesh(eupG("voluteT", function () { return new THREE.TorusGeometry(0.05, 0.014, 6, 14); }), mat); v.position.set(sd * 0.08, 0.02, 0); a.add(v); });
wSph(0.04, mat, 0, 0.02, 0.01, a, 8);
return a;
},
function (grp, x, y, z, s, queen) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.scale.setScalar(s);
grp.add(g);
var blk = ebsStone("black"), metal = queen ? "silver" : "gold", trim = ebsStone(metal), gold = ebsStone("gold"), vel = ebsS("b:velvet", queen ? 0x6A1022 : 0x2A0E3A, 0.3, { shine: 30 }), pomM = ebsS("b:velvet", 0xB81A2A, 0.3, { shine: 90 }), leg = eupLegGeo();
[[-0.31, 0.22], [0.31, 0.22], [-0.31, -0.2], [0.31, -0.2]].forEach(function (c, i) {
var m = new THREE.Mesh(leg, blk);
m.position.set(c[0], 0, c[1]);
g.add(m);
wCyl(0.05, 0.05, 0.016, trim, c[0], 0.15, c[1], g, 10);
wCyl(0.052, 0.052, 0.016, trim, c[0], 0.27, c[1], g, 10);
if (i < 2) {
var pw = wSph(0.06, gold, c[0], 0.03, c[1] + 0.025, g, 10);
pw.scale.set(1, 0.55, 1.3);
for (var k = -1; k <= 1; k++) {
var t = wSph(0.022, gold, c[0] + k * 0.03, 0.02, c[1] + 0.09, g, 6);
t.scale.y = 0.7;
}
}
});
wBox(0.72, 0.06, 0.56, blk, 0, 0.3, 0.01, g);
wBox(0.74, 0.02, 0.58, trim, 0, 0.33, 0.01, g);
var cu = wBox(0.66, 0.06, 0.52, vel, 0, 0.365, 0.02, g);
wBox(0.7, 0.08, 0.03, blk, 0, 0.24, 0.28, g);
eupKeyBand(g, 0.68, 0.06, 0, 0.24, 0.297, metal);
[-1, 1].forEach(function (sd) {
var ax = sd * 0.375;
wBox(0.045, 0.27, 0.5, blk, ax, 0.465, 0.0, g);
eupKeyBand(g, 0.44, 0.05, ax + sd * 0.0235, 0.5, 0.0, metal, sd * Math.PI / 2);
wBox(0.09, 0.035, 0.6, blk, ax, 0.615, 0.02, g);
wBox(0.095, 0.01, 0.6, trim, ax, 0.636, 0.02, g);
var v = new THREE.Mesh(eupG("armScroll", function () { return new THREE.TorusGeometry(0.05, 0.018, 8, 16); }), trim);
v.position.set(ax, 0.58, 0.3);
v.rotation.y = Math.PI / 2;
g.add(v);
wSph(0.04, trim, ax, 0.67, 0.29, g, 10);
wCyl(0.02, 0.024, 0.26, trim, ax, 0.46, 0.26, g, 8);
});
[-1, 1].forEach(function (sd) {
var px = sd * 0.46;
wCyl(0.036, 0.042, 1.6, blk, px, 1.13, -0.25, g, 10);
[0.5, 1.0, 1.5].forEach(function (ry) { wCyl(0.046, 0.046, 0.022, trim, px, ry, -0.25, g, 10); });
wBox(0.11, 0.045, 0.11, trim, px, 1.95, -0.25, g);
if (queen) {
var pm = wSph(0.055, pomM, px, 2.02, -0.25, g, 10);
pm.scale.y = 0.88;
wCone(0.027, 0.045, trim, px, 2.09, -0.25, g, 6);
}
else {
wSph(0.042, gold, px, 2.0, -0.25, g, 10);
wCone(0.032, 0.15, gold, px, 2.1, -0.25, g, 8);
}
});
var fr = new THREE.Mesh(eupArchGeo(0.43, 0.33, 1.66, 0.44, 0.04), trim);
fr.position.set(0, 0, -0.3);
g.add(fr);
var pn = new THREE.Mesh(eupArchGeo(0.4, 0.36, 1.66, 0.4, 0.02), blk);
pn.position.set(0, 0, -0.26);
g.add(pn);
var iv = new THREE.Mesh(eupArchGeo(0.32, 0.47, 1.6, 0.32, 0.012), vel);
iv.position.set(0, 0, -0.24);
g.add(iv);
eupKeyBand(g, 0.78, 0.05, 0, 0.42, -0.238, metal);
eupKeyBand(g, 0.62, 0.045, 0, 1.3, -0.226, metal);
[[-0.24, 0.54], [0.24, 0.54], [-0.24, 1.2], [0.24, 1.2]].forEach(function (c) { eupRosette(g, c[0], c[1], -0.226, 0.024, trim); });
if (queen) {
var wy = 1.6, wr = new THREE.Mesh(eupG("wreathT", function () { return new THREE.TorusGeometry(0.15, 0.016, 8, 28); }), trim);
wr.position.set(0, wy, -0.225);
g.add(wr);
for (var l = 0; l < 16; l++) {
var a = l / 16 * Math.PI * 2, lf = wSph(0.034, trim, Math.cos(a) * 0.15, wy + Math.sin(a) * 0.15, -0.218, g, 6);
lf.scale.set(0.5, 1, 0.3);
lf.rotation.z = a;
}
var bp = wSph(0.075, pomM, 0, wy - 0.01, -0.2, g, 12);
bp.scale.y = 0.9;
wCone(0.035, 0.06, trim, 0, wy + 0.08, -0.2, g, 6);
[-1, 1].forEach(function (sd) { var st = wCyl(0.007, 0.007, 0.4, gold, sd * 0.23, 1.55, -0.222, g, 4); st.rotation.z = sd * 0.2; for (var k = 0; k < 6; k++) {
var gr = wSph(0.016, gold, sd * (0.23 + 0.2 * (0.06 + k * 0.035)), 1.62 + k * 0.035, -0.22, g, 5);
gr.scale.y = 1.8;
} });
}
else {
eupBident(g, 0, 1.36, -0.225, 0.5, gold);
eupRosette(g, 0, 1.98, -0.226, 0.034, gold);
}
eupAnthemion(g, 0, 2.08, -0.28, 1.45, trim);
ebsSolid(x, z - 0.02 * s, 0.98 * s, 0.62 * s, y - 1, y + 2.5 * s, 0);
return g;
},
function (grp, I) {
var X = I.x, Z = I.z, below = eupPersephoneBelow(), sH = EUP_GOD.hades, sP = EUP_GOD.persephone, hip = EUP_GOD.hip;
for (var c = grp.children.length - 1; c >= 0; c--) {
var o = grp.children[c];
if (o.isGroup && Math.abs(o.position.y - 1.4) < 0.01 && Math.abs(o.position.z - (Z - 19)) < 0.01 && (Math.abs(o.position.x - (X - 3)) < 0.01 || Math.abs(o.position.x - (X + 3)) < 0.01))
grp.remove(o);
}
eupGodThrone(grp, X - 3.1, 1.4, Z - 18.9, sH, false);
eupGodThrone(grp, X + 3.1, 1.4, Z - 18.9, sP, true);
var H = eupTalkOf("Hades, the Unseen King");
if (H) {
eupSeat(H.p, X - 3.1, Z - 18.9, 1.4, hip * sH, sH, 0);
H.r = 8;
}
eupDropSpot("Persephone's throne", I.x - 200, I.x + 200);
if (below) {
var Pe = ebsInPerson(grp, "persephone-throne", X + 3.1, Z - 18.9, EUP_PERSEPHONE_LOOK, 0);
var pom = wSph(0.16, ebsS("b:velvet", 0xB81A2A, 0.3, { shine: 90 }), X + 3.1 + 0.375 * sP, 1.4 + 0.7 * sP, Z - 18.9 + 0.22 * sP, grp, 10);
pom.scale.y = 0.9;
wCyl(0.03, 0.05, 0.08, ebsLam(0x6A2A1A), pom.position.x, pom.position.y + 0.16, pom.position.z, grp, 5);
eupSeat(Pe, X + 3.1, Z - 18.9, 1.4, hip * sP, sP, 0);
ebsTalk(Pe, "Persephone, queen of the dead", EUP_PERSEPHONE_PERSONA, "You smell of sunlight. It has been a long winter for my mother, I think. Sit with me a little, and tell me what is flowering up there.", 8);
}
else {
ebsLook(X + 3.1, Z - 15.6, 3.2, "Persephone's throne", "empty: the queen is above", ["It is her season above. Persephone went up to her mother Demeter at the spring equinox, and the earth flowered; she comes down again at the autumn equinox (22 September), and then the earth goes bare.", "The Homeric Hymn to Demeter: because she ate the pomegranate seeds, she must spend part of every year below with Hades, and the rest above with her mother."], 1.4);
}
I.say = below ?
"👑 <b>The Palace of Hades.</b> The great hall: four black columns round a hearth of blue-white fire, Hades on his throne and Persephone, his queen, beside him (it is her season below). The five rivers of the underworld come in through the walls and meet in a ring round the hearth. Doors lead off to the banquet hall (west), the treasury (east), the Hall of Orpheus (north), and beyond the banquet hall, the Chairs of Forgetfulness." :
"👑 <b>The Palace of Hades.</b> The great hall: four black columns round a hearth of blue-white fire, Hades on his throne; the queen's throne beside him is empty, for Persephone is above with her mother until the autumn equinox. The five rivers of the underworld come in through the walls and meet in a ring round the hearth. Doors lead off to the banquet hall (west), the treasury (east), the Hall of Orpheus (north), and beyond the banquet hall, the Chairs of Forgetfulness.";
},
function (grp, I) {
var below = eupPersephoneBelow(), T = eupTalkOf("Persephone, queen of the dead");
for (var i = 0; i < EBS.talk.length; i++) {
var Q = EBS.talk[i];
if (Q.name === "Persephone, queen of the dead" && Math.abs(Q.p.g.position.x - I.x) < 200) {
T = Q;
break;
}
}
if (T && Math.abs(T.p.g.position.x - I.x) < 200) {
T.p.g.visible = false;
EBS.talk = EBS.talk.filter(function (Q) { return Q !== T; });
}
ebsLook(I.x, I.z - 8, 3, "Where the queen sits", "", below ?
["The chair by the loom is empty. It is her season below: Persephone is in the great hall of the palace, on her throne beside Hades."] :
["The chair by the loom is empty and the lamps are low. It is her season above: Persephone went up to her mother Demeter at the spring equinox, and comes down again at the autumn equinox (22 September)."], 0);
I.say = (I.say || "") + (below ? " The queen herself is in the great hall, on her throne." : " The queen is above with her mother Demeter until the autumn equinox.");
},
function () {
return ebsCanvas("eupMeadow", 1024, 256, function (x, W, H) {
var r = wRand(401);
var g = x.createLinearGradient(0, 0, 0, H * 0.7);
g.addColorStop(0, "#7AB4E8");
g.addColorStop(1, "#D8ECF4");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var c = 0; c < 9; c++) {
var cx = r() * W, cy = 20 + r() * 50;
x.fillStyle = "rgba(255,255,255,0.7)";
for (var k = 0; k < 6; k++) {
x.beginPath();
x.arc(cx + k * 14 - 30, cy + (k % 2) * 5, 12 + r() * 8, 0, 6.283);
x.fill();
}
}
[["#8AAA6A", 0.48, 40], ["#6A9A4A", 0.6, 28], ["#4E8A3A", 0.72, 18]].forEach(function (L, i) { x.fillStyle = L[0]; x.beginPath(); x.moveTo(0, H); for (var px = 0; px <= W; px += 8)
x.lineTo(px, H * L[1] - Math.sin(px / W * 6.283 * (2 + i) + i) * L[2] - Math.sin(px / W * 6.283 * 7 + i * 3) * 6); x.lineTo(W, H); x.fill(); });
for (var t = 0; t < 14; t++) {
var tx = r() * W, ty = H * (0.55 + r() * 0.12);
if (r() < 0.5) {
x.fillStyle = "#2A4A2A";
x.beginPath();
x.ellipse(tx, ty - 26, 7, 30, 0, 0, 6.283);
x.fill();
}
else {
x.fillStyle = "#5A4A30";
x.fillRect(tx - 2, ty - 14, 4, 14);
x.fillStyle = "#7A9A6A";
x.beginPath();
x.arc(tx, ty - 20, 14, 0, 6.283);
x.fill();
}
}
var fc = ["#F8F4E0", "#F0E060", "#8A4AC8", "#E8A0E0", "#E83A4A", "#4A6AE8"];
for (var f = 0; f < 900; f++) {
var fx = r() * W, fy = H * (0.72 + r() * 0.28);
x.fillStyle = fc[(r() * fc.length) | 0];
x.beginPath();
x.arc(fx, fy, 1.4 + r() * 2.2, 0, 6.283);
x.fill();
}
x.fillStyle = "#C89A3A";
x.fillRect(0, 0, W, 4);
x.fillRect(0, H - 4, W, 4);
});
},
function () {
return ebsCanvas("eupSkyCeil", 512, 512, function (x, W, H) {
var r = wRand(402), g = x.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.7);
g.addColorStop(0, "#CFE6F8");
g.addColorStop(1, "#6A9ED8");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var c = 0; c < 26; c++) {
var cx = r() * W, cy = r() * H;
x.fillStyle = "rgba(255,255,255,0.55)";
for (var k = 0; k < 5; k++) {
x.beginPath();
x.arc(cx + (r() - 0.5) * 50, cy + (r() - 0.5) * 20, 10 + r() * 16, 0, 6.283);
x.fill();
}
}
x.strokeStyle = "#3A2A1A";
x.lineWidth = 1.6;
for (var b = 0; b < 12; b++) {
var bx = r() * W, by = r() * H;
x.beginPath();
x.moveTo(bx - 6, by);
x.quadraticCurveTo(bx - 3, by - 4, bx, by);
x.quadraticCurveTo(bx + 3, by - 4, bx + 6, by);
x.stroke();
}
x.strokeStyle = "#C89A3A";
x.lineWidth = 10;
x.strokeRect(5, 5, W - 10, H - 10);
});
},
function () {
return ebsCanvas("eupMosaic", 1024, 848, function (x, W, H) {
var r = wRand(403);
x.fillStyle = "#E8DCC4";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 16000; i++) {
var c = 200 + r() * 40 | 0;
x.fillStyle = "rgb(" + c + "," + (c - 12) + "," + (c - 34) + ")";
x.fillRect(r() * W, r() * H, 3, 3);
}
x.fillStyle = "#2A3A6A";
x.fillRect(20, 20, W - 40, 34);
x.fillRect(20, H - 54, W - 40, 34);
x.fillRect(20, 20, 34, H - 40);
x.fillRect(W - 54, 20, 34, H - 40);
x.fillStyle = "#E8DCC4";
for (var w = 40; w < W - 40; w += 34) {
x.beginPath();
x.arc(w, 54, 13, Math.PI, 0);
x.fill();
x.beginPath();
x.arc(w, H - 54, 13, 0, Math.PI);
x.fill();
}
x.fillStyle = "#8A2A1A";
x.fillRect(64, 64, W - 128, 8);
x.fillRect(64, H - 72, W - 128, 8);
x.fillRect(64, 64, 8, H - 128);
x.fillRect(W - 72, 64, 8, H - 128);
var fc = ["#C83A3A", "#8A4AC8", "#E8C040", "#4A6AC8"];
for (var f = 0; f < 160; f++) {
var fx = 90 + r() * (W - 180), fy = 90 + r() * (H - 180);
x.fillStyle = fc[f % 4];
for (var p = 0; p < 5; p++) {
var a = p * 1.2566;
x.beginPath();
x.arc(fx + Math.cos(a) * 5, fy + Math.sin(a) * 5, 3.4, 0, 6.283);
x.fill();
}
x.fillStyle = "#E8D060";
x.beginPath();
x.arc(fx, fy, 2.4, 0, 6.283);
x.fill();
}
var cx = W / 2, cy = H / 2;
x.fillStyle = "#E8DCC4";
x.beginPath();
x.arc(cx, cy, 150, 0, 6.283);
x.fill();
x.strokeStyle = "#2A3A6A";
x.lineWidth = 10;
x.stroke();
x.fillStyle = "#5A3A1A";
x.fillRect(cx - 8, cy - 10, 16, 110);
x.fillStyle = "#3A6A2A";
for (var l = 0; l < 70; l++) {
var a2 = r() * 6.283, d = r() * 90;
x.beginPath();
x.ellipse(cx + Math.cos(a2) * d, cy - 40 + Math.sin(a2) * d * 0.7, 9, 5, a2, 0, 6.283);
x.fill();
}
x.fillStyle = "#B81A2A";
for (var pm = 0; pm < 14; pm++) {
var a3 = r() * 6.283, d2 = 20 + r() * 70;
x.beginPath();
x.arc(cx + Math.cos(a3) * d2, cy - 40 + Math.sin(a3) * d2 * 0.7, 8, 0, 6.283);
x.fill();
}
});
},
function (grp, x, z, col) {
var br = ebsStone("bronze");
wCyl(0.32, 0.4, 0.12, br, x, 0.06, z, grp, 10);
wCyl(0.05, 0.07, 2.4, br, x, 1.3, z, grp, 8);
for (var k = 0; k < 3; k++) {
var a = k * 2.094;
var l = wBox(0.05, 0.5, 0.05, br, x + Math.cos(a) * 0.2, 0.3, z + Math.sin(a) * 0.2, grp);
l.rotation.z = Math.cos(a) * 0.5;
l.rotation.x = -Math.sin(a) * 0.5;
}
var b = wCyl(0.26, 0.12, 0.16, br, x, 2.58, z, grp, 10);
ebsFlame(grp, x, 2.62, z, 0.55, col || 0xFFB070);
ebsSolid(x, z, 0.6, 0.6, -1, 2.8);
},
function (grp, x, z, cols, seed) {
eupPot(grp, x, z, 0.8);
var r = wRand(seed);
for (var f = 0; f < 16; f++) {
var fx = x + (r() - 0.5) * 0.6, fz = z + (r() - 0.5) * 0.6, h = 0.75 + r() * 0.45;
wCyl(0.012, 0.012, h - 0.7, ebsLam(0x3A6A2A), fx, 0.7 + (h - 0.7) / 2, fz, grp, 3);
var fl = wSph(0.07, ebsLam(cols[f % cols.length]), fx, h, fz, grp, 6);
fl.scale.y = 0.6;
}
ebsSolid(x, z, 0.8, 0.8, -1, 1);
},
function (grp, x, y, z, w, h, ry, col) {
var cm = ebsM("eupCurtain" + col, function () {
var c = document.createElement("canvas");
c.width = 64;
c.height = 16;
var q = c.getContext("2d");
for (var i = 0; i < 64; i++) {
var v = 0.75 + 0.25 * Math.sin(i / 64 * Math.PI * 8);
q.fillStyle = "rgba(255,255,255," + v + ")";
q.fillRect(i, 0, 1, 16);
}
var t = new THREE.CanvasTexture(c);
t.wrapS = THREE.RepeatWrapping;
var m = new THREE.MeshLambertMaterial({ map: t, color: col, transparent: true, opacity: 0.86, side: THREE.DoubleSide, depthWrite: false });
m.userData.noPhoto = 1;
return m;
});
var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), cm);
p.position.set(x, y, z);
p.rotation.y = ry || 0;
p.raycast = function () { };
grp.add(p);
return p;
},
function (grp, I) {
var X = I.x, Z = I.z, lite = EBS.lite, gold = ebsStone("gold"), bronze = ebsStone("bronze");
var mm = ebsM("eupMosaicM", function () { var m = new THREE.MeshLambertMaterial({ map: eupMosaicTex(), color: 0x8A8078 }); m.userData.noPhoto = 1; return m; });
var fl = new THREE.Mesh(new THREE.PlaneGeometry(35.6, 29.6), mm);
fl.rotation.x = -Math.PI / 2;
fl.position.set(X, 0.012, Z);
grp.add(fl);
var mw = ebsM("eupMeadowM", function () { var t = eupMeadowTex(); var m = new THREE.MeshLambertMaterial({ map: t, color: 0xC8BCA8 }); m.userData.noPhoto = 1; return m; });
var dado = ebsM("eupDado", function () { var m = new THREE.MeshLambertMaterial({ color: 0x6A1A1A }); m.userData.noPhoto = 1; return m; });
[[X, Z - 14.7, 0, 36], [X - 17.7, Z, Math.PI / 2, 30], [X + 17.7, Z, -Math.PI / 2, 30], [X, Z + 14.7, Math.PI, 36]].forEach(function (W, i) {
var g = new THREE.PlaneGeometry(W[3] - 0.6, 7);
var uv = g.attributes.uv;
for (var u = 0; u < uv.count; u++)
uv.setX(u, uv.getX(u) * W[3] / 28 + i * 0.27);
var p = new THREE.Mesh(g, mw.clone());
p.material.map = mw.map.clone();
p.material.map.wrapS = THREE.RepeatWrapping;
p.material.map.needsUpdate = true;
p.position.set(W[0], 4.6 + 3.5, W[1]);
p.rotation.y = W[2];
grp.add(p);
if (i === 3) {
[-1, 1].forEach(function (sd) { var d = new THREE.Mesh(new THREE.PlaneGeometry(16, 1.15), dado); d.position.set(X + sd * 9.9, 0.6, Z + 14.68); d.rotation.y = Math.PI; grp.add(d); var gl = wBox(16, 0.06, 0.04, gold, X + sd * 9.9, 1.2, Z + 14.66, grp); });
}
else {
var d2 = new THREE.Mesh(new THREE.PlaneGeometry(W[3] - 0.6, 1.15), dado);
d2.position.set(W[0], 0.6, W[1]);
d2.rotation.y = W[2];
grp.add(d2);
var gb = wBox(W[3] - 0.6, 0.06, 0.04, gold, W[0], 1.2, W[1], grp);
gb.rotation.y = W[2];
}
});
var sm = ebsM("eupSkyCeilM", function () { var m = new THREE.MeshBasicMaterial({ map: eupSkyCeilTex(), color: 0x9AA2AC }); m.userData.noPhoto = 1; return m; });
var cl = new THREE.Mesh(new THREE.PlaneGeometry(35.6, 29.6), sm);
cl.rotation.x = Math.PI / 2;
cl.position.set(X, 11.98, Z);
grp.add(cl);
var vio = 0x7A2A8A;
[[11 - 2.3, -10, Math.PI / 2, 3.2], [11 + 2.3, -10, Math.PI / 2, 3.2]].forEach(function (c) { eupCurtain(grp, X + c[0], 1.75, Z + c[1], c[3], 3.3, c[2], vio); });
eupCurtain(grp, X + 11, 1.75, Z - 11.5, 4.6, 3.3, 0, vio);
[-1, 1].forEach(function (sd) { eupCurtain(grp, X + sd * 2.6, 3, Z + 14.3, 1.8, 5.8, 0, 0x5A1A4A); });
var gf = [0xF0E870, 0xE83A4A, 0xF8F8F0, 0x8A4AC8, 0xE8A0E0], gm = ebsLam(0x3A6A2A);
[[-17.5, -14.4, 17.5, -14.4], [-17.4, -14.2, -17.4, 14.2], [17.4, -14.2, 17.4, 14.2]].forEach(function (L, li) {
var n = lite ? 3 : 5;
for (var s = 0; s < n; s++) {
var t0 = s / n, t1 = (s + 1) / n, ax = L[0] + (L[2] - L[0]) * t0, az = L[1] + (L[3] - L[1]) * t0, bx = L[0] + (L[2] - L[0]) * t1, bz = L[1] + (L[3] - L[1]) * t1, pts = [];
for (var k = 0; k <= 10; k++) {
var u = k / 10;
pts.push(new THREE.Vector3(X + ax + (bx - ax) * u, 4.5 - Math.sin(u * Math.PI) * 0.9, Z + az + (bz - az) * u));
}
var tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.13, 5), gm);
grp.add(tube);
for (var f = 0; f < (lite ? 8 : 16); f++) {
var p = pts[Math.min(10, Math.round(f / (lite ? 8 : 16) * 10))], rr = wRand(410 + li * 50 + s * 20 + f);
wSph(0.1, ebsLam(gf[f % gf.length]), p.x + (rr() - 0.5) * 0.2, p.y + (rr() - 0.5) * 0.2, p.z + (rr() - 0.5) * 0.2, grp, 6);
}
wSph(0.22, gold, X + ax, 4.55, Z + az, grp, 8);
}
});
[[-16.4, -13.4], [16.4, 13.4], [-16.4, 13.4], [7.6, -12.6], [14.4, -12.6], [-6, -12.8]].forEach(function (p, i) { if (lite && i > 3)
return; eupLampStand(grp, X + p[0], Z + p[1]); });
[[16.2, -13.6], [-16.2, -2], [16.2, 9.5], [-9, 13]].forEach(function (p, i) { eupPot(grp, X + p[0], Z + p[1], 1.3); ebsTree("pomegranate", grp, X + p[0], 1.1, Z + p[1], 0.42, 420 + i); ebsSolid(X + p[0], Z + p[1], 1.4, 1.4, -1, 3); });
var fcol = [[0xF8F8F0, 0xF0E060], [0x8A4AC8], [0xE8A0E0, 0xF0E060], [0xE83A4A], [0x4A6AE8]];
[[-3, -13.6], [0, -13.6], [3, -13.6], [-6.5, 12.8], [6.5, 12.8], [9, 12.8], [-16.6, 6.5]].forEach(function (p, i) { if (lite && i % 2)
return; eupFlowerPot(grp, X + p[0], Z + p[1], fcol[i % fcol.length], 430 + i); });
var kl = ebsKline(grp, X + 6.5, 0, Z + 5, Math.PI / 2);
ebsSolid(X + 6.5, Z + 5, 1, 2.4, -1, 0.9);
[[0x7A2A8A, -0.6], [0xD8A848, 0.1], [0x7A2A8A, 0.8]].forEach(function (c) { var cu = wSph(0.32, ebsS("b:velvet", c[0], 0.6), X + 6.5, 0.85, Z + 5 + c[1], grp, 10); cu.scale.set(1, 0.55, 0.8); });
ebsTable(grp, X + 8.6, 0, Z + 5, 1, 0.8, 0);
var fb = wSph(0.3, gold, X + 8.6, 0.9, Z + 5, grp, 10);
fb.scale.y = 0.35;
for (var q = 0; q < 5; q++)
wSph(0.1, ebsS("b:velvet", 0xB81A2A, 0.3, { shine: 90 }), X + 8.5 + (q % 3) * 0.1, 1.0, Z + 4.9 + (q >> 1) * 0.1, grp, 7);
var ly = new THREE.Group();
ly.position.set(X + 6.5, 0, Z + 7.6);
grp.add(ly);
wCyl(0.04, 0.05, 1, bronze, 0, 0.5, 0, ly, 6);
var lg = new THREE.Group();
lg.position.y = 1.15;
ly.add(lg);
wBox(0.6, 0.08, 0.06, gold, 0, 0.62, 0, lg);
[-0.3, 0.3].forEach(function (lx) { var a = wBox(0.07, 0.8, 0.07, gold, lx, 0.25, 0, lg); a.rotation.z = lx > 0 ? -0.25 : 0.25; });
var sbx = wSph(0.26, ebsStone("oak"), 0, -0.12, 0, lg, 10);
sbx.scale.set(1, 0.5, 0.4);
for (var st = 0; st < 7; st++)
wCyl(0.004, 0.004, 0.7, ebsLam(0xF0E8D0), -0.18 + st * 0.06, 0.25, 0.04, lg, 3);
ebsLook(X + 6.5, Z + 7.6, 2, "Her lyre", "for the songs of spring", ["Persephone's own lyre. Orpheus played here, too, when he came for Eurydice; it was Persephone, Ovid says, who could not refuse him (Metamorphoses 10.46-49)."]);
ebsTable(grp, X - 16.4, 0, Z - 6.5, 1, 2.2, Math.PI / 2);
var mir = new THREE.Group();
mir.position.set(X - 16.6, 0.84, Z - 6.5);
mir.rotation.y = Math.PI / 2;
grp.add(mir);
wCyl(0.03, 0.05, 0.6, gold, 0, 0.3, 0, mir, 6);
var disc = wCyl(0.34, 0.34, 0.03, ebsS("b:brass", 0xE0C080, 1, { shine: 140, spec: 0xFFFFFF }), 0, 0.95, 0, mir, 20);
disc.rotation.x = Math.PI / 2;
for (var j = 0; j < 5; j++) {
var jr = wRand(440 + j);
var jar = wCyl(0.06, 0.09, 0.16 + jr() * 0.1, ebsLam([0xE8E0F0, 0xC8A0D8, 0x6A9AC8, 0xE8C060, 0xC86A6A][j]), X - 16.3 + (jr() - 0.5) * 0.4, 0.92, Z - 7.4 + j * 0.4, grp, 8);
}
ebsLook(X - 15, Z - 6.5, 2, "Her dressing table", "a bronze mirror, scent", ["A mirror of polished bronze, little jars of scented oil, a comb of ivory. When Psyche came down for a box of Persephone's beauty, it was from here the queen filled it (Apuleius, The Golden Ass 6.20)."]);
var pg = eupG("petal", function () { var g = new THREE.CircleGeometry(0.06, 5); g.rotateX(-Math.PI / 2); return g; }), pm = ebsLam(0xE8A0C0, { ds: true });
var n = lite ? 40 : 120, im = new THREE.InstancedMesh(pg, pm, n), o = new THREE.Object3D(), r = wRand(450);
for (var i = 0; i < n; i++) {
o.position.set(X + 11 + (r() - 0.5) * 7, 0.02 + r() * 0.01, Z - 10 + (r() - 0.5) * 5 + 2);
o.rotation.set(0, r() * 6, 0);
o.scale.setScalar(0.8 + r() * 0.8);
o.updateMatrix();
im.setMatrixAt(i, o.matrix);
}
im.instanceMatrix.needsUpdate = true;
im.raycast = function () { };
grp.add(im);
}
];
});
