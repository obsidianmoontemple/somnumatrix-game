/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(331, function () {
"use strict";
return [
function (G) {
if (!G)
return;
G.updateMatrixWorld(true);
var sc = new THREE.Vector3();
G.traverse(function (o) {
if (!o.isMesh || !o.material || !o.material.userData || !o.material.userData.jbxReal || o.userData.jbxUV)
return;
o.userData.jbxUV = 1;
o.getWorldScale(sc);
if (typeof wsfUVs === "function")
try {
wsfUVs(o.geometry, { x: Math.abs(sc.x) || 1, y: Math.abs(sc.y) || 1, z: Math.abs(sc.z) || 1 });
}
catch (e) { }
});
ppBake(G);
},
function (G, L) {
var C = JBX_DOME, stone = jbxReal("stone", 0xD6CEC4), plaster = jbxReal("plaster", 0xC8BED8), pave = jbxReal("paving", 0x9A90A8), gold = ppM(0xC9A868, { e: 0x2A1C08 }), deep = ppM(0x241638);
ppBox(194, 0.05, 10, pave, 107, 0.025, 96, G);
ppBox(194, 0.12, 0.4, ppM(0x5A4A6E), 107, 0.06, 90.8, G);
ppBox(194, 0.12, 0.4, ppM(0x5A4A6E), 107, 0.06, 101.2, G);
for (var lx = 24; lx <= 196; lx += 16) {
[-1, 1].forEach(function (s) {
var z = 96 + s * 6.2;
ppCyl(0.12, 0.16, 4.6, ppM(0x2A2238), lx, 2.3, z, G, 6);
ppSolidR(lx, z, 0.25);
ppSph(0.34, ppM(0xFFE2B0, { b: 1 }), lx, 4.7, z, G, 10);
if (!PP.lite || ((lx / 16) | 0) % 2 === 0) {
var gl = wGlow(0xFFC880, 4.5, 0.4);
gl.position.set(lx, 4.7, z);
L.add(gl);
}
});
}
ppSign(G, ["THE STARFALL DOME", "Arena · concerts · the night's headline act"], 7, 1.5, 12, 3.4, 103.4, Math.PI / 2, "#140A24", "#FFD9A0");
ppBox(0.25, 3, 0.25, deep, 12, 1.5, 101.6, G);
ppBox(0.25, 3, 0.25, deep, 12, 1.5, 105.2, G);
ppCyl(C.r + 3, C.r + 3.4, 1.2, stone, C.x, 0.6, C.z, G, 64);
ppCyl(C.r, C.r, 12, plaster, C.x, 7.2, C.z, G, 64);
for (var i = 0; i < 32; i++) {
var a = i / 32 * Math.PI * 2;
if (Math.abs(Math.cos(a) + 1) < 0.02)
continue;
var px = C.x + Math.cos(a) * (C.r + 0.2), pz = C.z + Math.sin(a) * (C.r + 0.2), p = ppBox(1.1, 12, 0.5, stone, px, 7.2, pz, G);
p.rotation.y = -a + Math.PI / 2;
}
ppCyl(C.r + 0.9, C.r + 0.9, 0.8, gold, C.x, 13.2, C.z, G, 64);
ppSolidR(C.x, C.z, C.r + 3.2);
var mc = document.createElement("canvas");
mc.width = 2048;
mc.height = 64;
var mt = new THREE.CanvasTexture(mc);
mt.wrapS = THREE.RepeatWrapping;
var mq = wMesh(new THREE.CylinderGeometry(C.r + 0.45, C.r + 0.45, 2.4, 72, 1, true), new THREE.MeshBasicMaterial({ map: mt, fog: false, color: 0xC8C0D0 }), C.x, 11, C.z, L);
JBX.marq = { cv: mc, tex: mt, m: mq, said: "" };
jbxPaintMarquee();
var dome = wMesh(new THREE.SphereGeometry(C.r, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2), ppM(0x4A3A72), C.x, 13.6, C.z, G);
dome.scale.y = 0.6;
var ribM = ppM(0xC9A868, { e: 0x2A1C08 });
for (var r = 0; r < 24; r++) {
var a2 = r / 24 * Math.PI * 2, pts = [];
for (var k = 0; k <= 14; k++) {
var f = k / 14 * Math.PI / 2;
pts.push(new THREE.Vector3(C.x + Math.cos(a2) * Math.cos(f) * (C.r + 0.15), 13.6 + Math.sin(f) * C.r * 0.6 + 0.1, C.z + Math.sin(a2) * Math.cos(f) * (C.r + 0.15)));
}
wMesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), PP.lite ? 10 : 20, 0.22, 5, false), ribM, 0, 0, 0, G);
}
var sp = [], R = ppRand(4747);
for (var s = 0; s < (PP.lite ? 70 : 180); s++) {
var a3 = R() * Math.PI * 2, f2 = 0.08 + R() * 1.4;
sp.push([C.x + Math.cos(a3) * Math.cos(f2) * (C.r + 0.3), 13.6 + Math.sin(f2) * C.r * 0.6 + 0.25, C.z + Math.sin(a3) * Math.cos(f2) * (C.r + 0.3)]);
}
var star = new THREE.InstancedMesh(new THREE.SphereGeometry(0.28, 6, 4), ppGlowMat(0xFFF0D0), sp.length), m4 = new THREE.Matrix4();
sp.forEach(function (p, i) { m4.makeTranslation(p[0], p[1], p[2]); star.setMatrixAt(i, m4); });
L.add(ppKeep(star));
PP.glows.push({ m: star, base: 1, amp: 0, sp: 0.012, hue: 0.12, cycle: 1 });
ppCyl(3, 3.4, 3, gold, C.x, 13.6 + C.r * 0.6 + 1.2, C.z, G, 16);
var top = ppSph(2.2, ppGlowMat(0xFFD8A0, 0.85), C.x, 13.6 + C.r * 0.6 + 4, C.z, L, 16);
PP.glows.push({ m: top, base: 0.75, amp: 0.1, sp: 0.12, hue: 0.1 });
var px0 = C.x - C.r - 3.2;
for (var c = 0; c < 6; c++) {
var cz = C.z - 10 + c * 4;
ppCyl(0.55, 0.65, 11, stone, px0 - 6, 5.5, cz, G, 14);
ppSolidR(px0 - 6, cz, 0.65);
}
ppBox(10, 1.2, 24, stone, px0 - 3, 11.6, C.z, G);
ppBox(10.2, 0.4, 24.4, gold, px0 - 3, 12.3, C.z, G);
var tri = new THREE.Shape();
tri.moveTo(-12, 0);
tri.lineTo(12, 0);
tri.lineTo(0, 3.4);
tri.lineTo(-12, 0);
var ped = wMesh(new THREE.ExtrudeGeometry(tri, { depth: 1, bevelEnabled: false }), stone, px0 - 7.6, 12.2, C.z, G);
ped.rotation.y = Math.PI / 2;
ppSign(G, ["THE STARFALL DOME"], 14, 1.4, px0 - 7.7, 10.4, C.z, -Math.PI / 2, "#140A24", "#F2D08A");
ppBox(0.4, 6, 8, ppM(0x1A1024), C.x - C.r - 0.1, 4, C.z, G);
ppBox(0.3, 0.5, 8.6, gold, C.x - C.r - 0.25, 7.1, C.z, G);
ppBox(0.1, 5, 3.6, ppGlowMat(0xFFD8A0, 0.55), C.x - C.r - 0.35, 3.6, C.z - 2, G);
ppBox(0.1, 5, 3.6, ppGlowMat(0xFFD8A0, 0.55), C.x - C.r - 0.35, 3.6, C.z + 2, G);
[[-1, 0.3], [-2, 0.6], [-3, 0.9]].forEach(function (q) { ppBox(1, q[1], 20, stone, C.x - C.r - 3.6 + q[0] + 0.5, q[1] / 2, C.z, G); });
ppSpot({ x: C.x - C.r - 5.4, z: C.z, r: 3, name: "The Starfall Dome: go in", fn: function () { ppGoIn("dome"); } });
PP.staffAt.push({ title: "Arena usher", place: JBX_KEYS.dome, x: C.x - C.r - 5, z: C.z - 5.5, ry: -Math.PI / 2, seed: "domeusher1" }, { title: "Arena security officer", place: JBX_KEYS.dome, x: C.x - C.r - 5, z: C.z + 5.5, ry: -Math.PI / 2, seed: "domesec1" });
for (var q = 0; q < (PP.lite ? 2 : 6); q++)
PP.queue.push([C.x - C.r - 11 - q * 1.6, C.z + 4.2 + ((q % 2) * 0.4)]);
var BG = new THREE.Group();
BG.visible = false;
L.add(ppKeep(BG));
JBX.beams = { g: BG, list: [] };
for (var b = 0; b < 4; b++) {
var ba = b / 4 * Math.PI * 2 + 0.4, be = new THREE.Group();
be.position.set(C.x + Math.cos(ba) * (C.r - 4), 14, C.z + Math.sin(ba) * (C.r - 4));
var cone = new THREE.Mesh(new THREE.ConeGeometry(5, 150, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xC8B8FF, transparent: true, opacity: 0.05, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
cone.position.y = 75;
be.add(cone);
BG.add(be);
JBX.beams.list.push({ g: be, ph: b * 1.57 });
}
PP.music.push({ k: "jbx-dome-out", zone: "out", x: C.x - C.r - 8, z: C.z, r: 30, C: { bpm: 118, band: false } });
},
function (G, L) {
var B = JBX_GLOW, cx = (B.x0 + B.x1) / 2, cz = (B.z0 + B.z1) / 2, wall = jbxReal("plaster", 0x8A6A9A), trim = ppM(0xE8A0C8, { e: 0x3A1028 }), pave = jbxReal("paving", 0x9A90A8);
ppBox(91, 0.05, 6, pave, 54.5, 0.025, 266, G);
ppBox(B.x1 - B.x0, 10, B.z1 - B.z0, wall, cx, 5, cz, G);
ppSolid(cx, cz, (B.x1 - B.x0) / 2, (B.z1 - B.z0) / 2);
ppBox(B.x1 - B.x0 + 0.6, 0.5, B.z1 - B.z0 + 0.6, trim, cx, 10.1, cz, G);
for (var w = 0; w < 4; w++) {
var wz = B.z0 + 3.5 + w * (w < 2 ? 5 : 5) + (w >= 2 ? 10 : 0);
ppBox(0.1, 4.2, 2.6, ppGlowMat(0xFFC8B0, 0.6), B.x0 - 0.06, 3.4, wz, G);
ppBox(0.2, 4.6, 3, ppM(0x2A1A30), B.x0 - 0.02, 3.4, wz, G);
}
ppBox(0.3, 3.8, 4.2, ppM(0x1A1020), B.x0 - 0.1, 1.9, 266, G);
ppBox(4, 0.25, 7, ppM(0x5A2A6A), B.x0 - 2, 4.2, 266, G);
[-3.2, 3.2].forEach(function (dz) { ppCyl(0.08, 0.08, 4.2, ppM(0xC9A868), B.x0 - 3.8, 2.1, 266 + dz, G, 6); });
var nm = wSign(["THE AFTERGLOW", "After-party · silent disco · photo booth · desserts"], 12, 2.4, "#1A0C24", "#FFB8E0");
nm.position.set(B.x0 - 0.25, 7.4, 266);
nm.rotation.y = -Math.PI / 2;
G.add(nm);
var halo = wMesh(new THREE.PlaneGeometry(13, 3), ppGlowMat(0xFF9AD0, 0.18), B.x0 - 0.3, 7.4, 266, L);
halo.rotation.y = -Math.PI / 2;
PP.glows.push({ m: halo, base: 0.16, amp: 0.06, sp: 0.15, hue: 0.9 });
ppSpot({ x: B.x0 - 4.4, z: 266, r: 2.8, name: "The Afterglow: go in", fn: function () { ppGoIn("glow"); } });
PP.staffAt.push({ title: "Afterglow host", place: JBX_KEYS.glow, x: B.x0 - 3.6, z: 262.4, ry: -Math.PI / 2, seed: "glowdoor" });
var bl = [];
for (var k = 0; k <= 36; k++) {
var f = k / 36;
bl.push([12 + f * 86, 4.6 - Math.sin(f * Math.PI * 5) * 0.4, 262.8]);
bl.push([12 + f * 86, 4.6 - Math.sin(f * Math.PI * 5) * 0.4, 269.2]);
}
ppBulbs(L, bl, 0.11);
},
function (G, L) {
var P = JBX_PIER, H = P.head, deck = jbxReal("wood", 0xA88A68), post = jbxReal("wood", 0x6A4A30), rail = ppM(0xE8E0D0);
ppBox(P.x1 - P.x0, 0.3, P.z1 - P.z0, deck, (P.x0 + P.x1) / 2, P.y - 0.15, (P.z0 + P.z1) / 2, G);
ppBox(H.x1 - H.x0, 0.3, H.z1 - H.z0, deck, (H.x0 + H.x1) / 2, P.y - 0.15, (H.z0 + H.z1) / 2, G);
ppWalk(P.x0, P.x1, P.z0, P.z1, "out", P.y);
ppWalk(H.x0, H.x1, H.z0, H.z1, "out", P.y);
for (var x = P.x0 + 6; x < P.x1; x += 8) {
[P.z0, P.z1].forEach(function (z) { ppCyl(0.22, 0.22, 2.6, post, x, -0.8, z, G, 8); });
}
function railX(x0, x1, z) {
ppBox(x1 - x0, 0.08, 0.08, rail, (x0 + x1) / 2, P.y + 1.0, z, G);
ppBox(x1 - x0, 0.06, 0.06, rail, (x0 + x1) / 2, P.y + 0.5, z, G);
ppSolid((x0 + x1) / 2, z, (x1 - x0) / 2, 0.12, 0, 3, -1);
for (var q = x0; q <= x1; q += 2)
ppBox(0.08, 1, 0.08, rail, q, P.y + 0.5, z, G);
}
function railZ(z0, z1, x) {
ppBox(0.08, 0.08, z1 - z0, rail, x, P.y + 1.0, (z0 + z1) / 2, G);
ppBox(0.06, 0.06, z1 - z0, rail, x, P.y + 0.5, (z0 + z1) / 2, G);
ppSolid(x, (z0 + z1) / 2, 0.12, (z1 - z0) / 2, 0, 3, -1);
for (var q = z0; q <= z1; q += 2)
ppBox(0.08, 1, 0.08, rail, x, P.y + 0.5, q, G);
}
railX(H.x1, P.x1 - 4, P.z0);
railX(H.x1, P.x1 - 4, P.z1);
railX(H.x0, H.x1, H.z0);
railX(H.x0, H.x1, H.z1);
railZ(H.z0, H.z1, H.x0);
railZ(H.z0, P.z0, H.x1);
railZ(P.z1, H.z1, H.x1);
for (var lx = P.x0 + 4; lx < P.x1; lx += 14) {
ppCyl(0.08, 0.1, 3.4, ppM(0x2A2238), lx, P.y + 1.7, P.z0 + 0.3, G, 6);
ppSph(0.26, ppM(0xFFE2B0, { b: 1 }), lx, P.y + 3.5, P.z0 + 0.3, G, 8);
var gl = wGlow(0xFFC880, 3.6, 0.35);
gl.position.set(lx, P.y + 3.5, P.z0 + 0.3);
L.add(gl);
}
for (var b = 0; b < 4; b++) {
var bz = H.z0 + 3 + b * 5.2;
ppBox(0.8, 0.45, 3, deck, H.x0 + 6, P.y + 0.42, bz, G);
ppBox(0.2, 0.6, 3, deck, H.x0 + 6.4, P.y + 0.8, bz, G);
ppSolid(H.x0 + 6, bz, 0.45, 1.5, 0, 1, P.y - 0.2);
ppSpot({ x: H.x0 + 7.6, z: bz, r: 1.8, y: P.y, name: "A bench on the pier: watch the sky", fn: function () { ppRest("a bench on the Fireworks Pier, looking out over the lagoon"); } });
}
var kx = P.x1 - 6, kz = P.z0 - 4;
ppBox(4, 2.8, 3, ppM(0x2A1838), kx, 1.4, kz, G);
ppBox(4.4, 0.3, 3.6, ppM(0xC83A5A), kx, 2.95, kz, G);
ppSolid(kx, kz, 2, 1.5);
ppSign(G, ["FIREWORKS", "Tonight's shows · ask the pyrotechnician"], 3.8, 1.1, kx, 3.8, kz + 1.56, 0, "#140A24", "#FFD9A0");
ppSpot({ x: kx, z: kz + 2.9, r: 2.4, name: "The fireworks kiosk: when is the next show?", fn: jbxFireworksCard });
PP.staffAt.push({ title: "Pyrotechnician", place: JBX_KEYS.pier, x: kx - 1, z: kz + 2.2, ry: 0, seed: "pyro1" }, { title: "Pier master", place: JBX_KEYS.pier, x: H.x1 + 1, z: P.z1 + 0.2, y: P.y, ry: -Math.PI / 2, seed: "piermaster" });
var bx = 160, bz = -170;
ppBox(16, 1.2, 9, ppM(0x3A3A44), bx, 0.3, bz, L);
ppBox(16.4, 0.15, 9.4, ppM(0xC83A5A), bx, 0.95, bz, L);
for (var m = 0; m < 12; m++)
ppCyl(0.28, 0.3, 1.2, ppM(0x2A2A2A), bx - 6 + (m % 6) * 2.4, 1.6, bz - 2 + Math.floor(m / 6) * 4, L, 8);
var bg = wGlow(0xFFB070, 6, 0.25);
bg.position.set(bx, 2.2, bz);
L.add(bg);
var gx = 310, gz = -124;
var gpave = jbxReal("paving", 0x8A8098), lt = ppM(0x2A2238);
ppBox(40, 0.05, 30, gpave, gx, 0.025, gz, G);
ppBox(18, 0.05, 8, gpave, 293, 0.025, -150, G);
var lam = [];
for (var t = 0; t < (PP.lite ? 6 : 12); t++) {
var tx = gx - 15 + (t % 4) * 10, tz = gz - 10 + Math.floor(t / 4) * 10;
ppCyl(0.1, 0.12, 3.2, lt, tx, 1.6, tz, G, 6);
ppBox(2.4, 0.08, 0.08, lt, tx, 3.1, tz, G);
ppSolidR(tx, tz, 0.25);
[-1, 1].forEach(function (s) { lam.push([tx + s * 1.1, 2.6, tz]); });
}
var lm = new THREE.InstancedMesh(new THREE.SphereGeometry(0.34, 8, 6), ppGlowMat(0xFFB868, 0.85), lam.length), m5 = new THREE.Matrix4();
lam.forEach(function (p, i) { m5.makeTranslation(p[0], p[1], p[2]); m5.scale(new THREE.Vector3(1, 1.3, 1)); lm.setMatrixAt(i, m5); });
L.add(ppKeep(lm));
PP.glows.push({ m: lm, base: 0.8, amp: 0.08, sp: 0.1, hue: 0.08 });
ppBox(5, 1.1, 1.6, ppM(0x6A3A2A), gx + 2, 0.55, gz + 12, G);
ppBox(5.4, 0.2, 2, ppM(0xE8C890), gx + 2, 2.9, gz + 12, G);
[-2.4, 2.4].forEach(function (dx) { ppCyl(0.08, 0.08, 2.9, lt, gx + 2 + dx, 1.45, gz + 12.6, G, 6); });
ppSign(G, ["THE LANTERN STALL", "Write a wish, let it rise"], 4.4, 1, gx + 2, 3.7, gz + 13.1, Math.PI, "#2A1408", "#FFE0A0");
ppSolid(gx + 2, gz + 12, 2.5, 0.8);
ppSpot({ x: gx + 2, z: gz + 9.6, r: 2.6, name: "The lantern stall: release a lantern", fn: jbxLanternCard });
PP.staffAt.push({ title: "Lantern keeper", place: JBX_KEYS.pier, x: gx + 2, z: gz + 13, ry: Math.PI, seed: "lantern1" });
for (var bb = 0; bb < 3; bb++) {
var bnx = gx - 12 + bb * 12;
ppBox(3, 0.45, 0.8, jbxReal("wood", 0xA88A68), bnx, 0.42, gz - 13, G);
ppSolid(bnx, gz - 13, 1.5, 0.4);
ppSpot({ x: bnx, z: gz - 11.4, r: 1.6, name: "A bench in the Lantern Garden", fn: function () { ppRest("the Lantern Garden, under the paper lanterns"); } });
}
},
function (G, L) {
var A = new THREE.Group();
A.visible = false;
L.add(ppKeep(A));
var gold = ppM(0xC9A868, { e: 0x2A1C08 });
[-12.5, 12.5].forEach(function (x) { ppCyl(0.6, 0.8, 12, gold, x, 6, 284, A, 12); ppSph(1, ppGlowMat(0xFFD8A0, 0.8), x, 12.6, 284, A, 12); });
var cv = document.createElement("canvas");
cv.width = 1024;
cv.height = 160;
var tx = new THREE.CanvasTexture(cv);
var ban = wMesh(new THREE.PlaneGeometry(24, 3.75), new THREE.MeshBasicMaterial({ map: tx, side: THREE.DoubleSide, fog: false, color: 0xD8D0E0 }), 0, 10.2, 284, A);
var bl = [];
for (var k = 0; k <= 40; k++) {
bl.push([-12.5 + k * 25 / 40, 8.1, 284.2]);
}
ppBulbs(A, bl, 0.13);
JBX.arch = { g: A, cv: cv, tex: tx, said: "" };
},
function (G, x0, x1, z0, z1, h, mat, gaps, sides) {
gaps = gaps || [];
sides = sides || "nsew";
var t = 0.3;
function side(s, a0, a1, fixed, alongX) {
if (sides.indexOf(s) < 0)
return;
var cuts = gaps.filter(function (g) { return g.s === s; }).map(function (g) { return [g.c - g.w / 2, g.c + g.w / 2]; }).sort(function (a, b) { return a[0] - b[0]; });
var segs = [], at = a0;
cuts.forEach(function (c) { if (c[0] > at)
segs.push([at, c[0]]); at = Math.max(at, c[1]); });
if (at < a1)
segs.push([at, a1]);
segs.forEach(function (sg) {
var L = sg[1] - sg[0], mid = (sg[0] + sg[1]) / 2;
if (L < 0.05)
return;
if (alongX) {
ppBox(L, h, t, mat, mid, h / 2, fixed, G);
ppSolid(mid, fixed, L / 2, t / 2);
}
else {
ppBox(t, h, L, mat, fixed, h / 2, mid, G);
ppSolid(fixed, mid, t / 2, L / 2);
}
});
cuts.forEach(function (c) {
var L = c[1] - c[0], mid = (c[0] + c[1]) / 2;
if (h < 3.4)
return;
if (alongX)
ppBox(L, h - 3, t, mat, mid, 3 + (h - 3) / 2, fixed, G);
else
ppBox(t, h - 3, L, mat, fixed, 3 + (h - 3) / 2, mid, G);
});
}
side("n", x0, x1, z0, true);
side("s", x0, x1, z1, true);
side("w", z0, z1, x0, false);
side("e", z0, z1, x1, false);
},
function (Lv, w, h, x, y, z, ry, kind, zone) {
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = Math.round(512 * h / w);
var tx = new THREE.CanvasTexture(cv);
var m = wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, fog: false, color: 0xD8D0E0 }), x, y, z, Lv);
m.rotation.y = ry || 0;
var S = { cv: cv, tex: tx, kind: kind, zone: zone, m: m };
JBX.scr.push(S);
return S;
},
function (G) {
var R = new THREE.Group();
R.name = "pp-dome";
G.add(R);
var Lv = new THREE.Group();
G.add(Lv);
PP.rooms.dome = { g: R, live: Lv };
var lite = PP.lite;
var marble = jbxReal("marble", 0xE0D6CC), plaster = jbxReal("plaster", 0xB8AACB), conc = jbxReal("concrete", 0x5A5468), dark = ppM(0x1A1226), ceil = ppM(0x0E0A18), gold = ppM(0xC9A868, { e: 0x2A1C08 }), wood = jbxReal("wood", 0x8A6A4A), steel = jbxReal("metal", 0x6A6A78), carpet = ppM(0x3A1A3A), tile = jbxReal("floortile", 0xD8D4DC);
jbxRoom(R, 3955, 4045, 82.2, 120, 10, marble, jbxReal("plaster", 0x9A8AA8), plaster, [{ s: "s", c: 4000, w: 4 }, { s: "n", c: 3975, w: 6 }, { s: "n", c: 4025, w: 6 }, { s: "e", c: 101, w: 3 }, { s: "w", c: 110, w: 3 }], "nsew", "dome");
for (var cx = 3960; cx < 4045; cx += 10)
ppBox(0.4, 0.5, 37.8, gold, cx, 9.75, 101.1, R);
for (var cz = 86; cz < 120; cz += 8)
ppBox(89.8, 0.5, 0.4, gold, 4000, 9.75, cz, R);
ppCyl(5, 5, 0.02, ppM(0x2A1A3A), 4000, 0.012, 101, R, 40);
ppCyl(4.4, 4.4, 0.025, gold, 4000, 0.016, 101, R, 40);
for (var sp = 0; sp < 8; sp++) {
var sa = sp / 8 * Math.PI * 2, ray = ppBox(0.5, 0.03, 3.6, ppM(0xF4ECDC), 4000 + Math.sin(sa) * 2, 0.03, 101 + Math.cos(sa) * 2, R);
ray.rotation.y = sa;
}
var red = jbxReal("plaster", 0x8A1A2A);
ppBox(3.2, 0.03, 23, red, 4000, 0.02, 107.6, R);
ppBox(53, 0.03, 3.2, red, 4000, 0.02, 96.6, R);
ppBox(3.2, 0.03, 12, red, 3975, 0.02, 89.6, R);
ppBox(3.2, 0.03, 12, red, 4025, 0.02, 89.6, R);
[3997.6, 4002.4].forEach(function (rx) { for (var rz = 103; rz <= 118; rz += 3) {
ppCyl(0.06, 0.09, 1, gold, rx, 0.5, rz, R, 8);
ppSph(0.09, gold, rx, 1.02, rz, R, 8);
if (rz < 118)
ppBox(0.05, 0.05, 3, ppM(0x8A1A2A), rx, 0.85, rz + 1.5, R);
} });
[[3962, 86], [3962, 117], [4038, 86], [4038, 117], [3990, 84], [4010, 84]].forEach(function (p) { ppCyl(0.5, 0.38, 0.8, ppM(0x2A1A2A), p[0], 0.4, p[1], R, 12); var lf = ppM(0x3A7A4A); ppCyl(0.05, 0.07, 1.6, ppM(0x5A3A24), p[0], 1.6, p[1], R, 6); [[0, 2.6, 0, 0.7], [0.4, 2.2, 0.2, 0.55], [-0.35, 2.3, -0.25, 0.55], [0.1, 2.0, -0.4, 0.5], [-0.2, 1.9, 0.4, 0.5]].forEach(function (f) { var m = ppSph(f[3], lf, p[0] + f[0], f[1], p[1] + f[2], R, 7); m.scale.y = 0.7; }); PP.solids.push({ x: p[0], z: p[1], r: 0.5 }); });
[[3970, 119.7, Math.PI], [4030, 119.7, Math.PI], [3955.3, 104, Math.PI / 2], [4044.7, 100, -Math.PI / 2]].forEach(function (p, i) {
ppSign(R, [["TONIGHT", "THE ARENA", "THE SKY BOXES", "THE AFTERGLOW"][i], ["The big night on the Arena screens", "The great stage and the floor", "Up the lift, VIP card or staff", "After the show, north of the trucks"][i]], 3, 2, p[0], 3.4, p[1], p[2], "#1A0C2A", "#FFD9A0");
});
[[3985, 104], [4015, 104]].forEach(function (q) { ppSofa(R, q[0], q[1], Math.PI, 0x2A2A5A, 4); });
ppSpot({ x: 4000, z: 118.4, r: 2, name: "The doors: back out onto the Dome Walk", fn: function () { ppGoOut("dome"); } });
ppSign(R, ["THE STARFALL DOME", "Arena ahead · Sky Boxes by the lift · cloakroom left"], 8, 1.6, 4000, 6.6, 119.7, Math.PI, "#140A24", "#FFD9A0");
ppBox(12, 1.15, 1.2, dark, 3980, 0.58, 114, R);
ppBox(12.2, 0.08, 1.4, gold, 3980, 1.17, 114, R);
ppBox(12, 2.4, 0.15, ppM(0xA8C8E8, { op: 0.25 }), 3980, 2.4, 113.5, R);
ppSolid(3980, 114, 6, 0.6);
ppSign(R, ["BOX OFFICE", "Tonight · check in · the times"], 5, 1, 3980, 4, 114.9, Math.PI, "#140A24", "#FFD9A0");
ppSpot({ x: 3980, z: 111.6, r: 3, name: "The box office: tonight, your wristband, the times", fn: jbxBoxOffice });
PP.staffAt.push({ title: "Box office attendant", place: JBX_KEYS.dome, x: 3977, z: 115.2, ry: Math.PI, seed: "box1" }, { title: "Box office attendant", place: JBX_KEYS.dome, x: 3983, z: 115.2, ry: Math.PI, seed: "box2" });
ppBox(1, 1.15, 12, dark, 3957.6, 0.58, 94, R);
ppBox(1.2, 0.08, 12.2, gold, 3957.6, 1.17, 94, R);
ppSolid(3957.6, 94, 0.5, 6);
for (var c = 0; c < 14; c++)
ppBox(0.5, 1.2, 0.06, ppM([0x3A2A1A, 0x6A2A3A, 0x2A3A5A, 0x1A1A1A][c % 4]), 3955.6, 2.2, 89 + c * 0.75, R);
ppSpot({ x: 3960, z: 94, r: 2.4, name: "The cloakroom", fn: ppCoatCheck });
PP.staffAt.push({ title: "Cloakroom attendant", place: JBX_KEYS.dome, x: 3956.4, z: 95, ry: Math.PI / 2, seed: "cloakdome" });
ppBox(1, 1.15, 10, dark, 4042.4, 0.58, 112, R);
ppBox(1.2, 0.08, 10.2, gold, 4042.4, 1.17, 112, R);
ppSolid(4042.4, 112, 0.5, 5);
for (var t = 0; t < 8; t++)
ppBox(0.06, 1, 0.8, ppM([0x6A3A8A, 0x2A2A3A, 0xC83A6A, 0xE8D8F0][t % 4]), 4044.8, 2.6, 108 + t * 1.1, R);
ppSign(R, ["MERCH"], 2.4, 0.7, 4044.7, 4.2, 112, -Math.PI / 2, "#140A24", "#FFB8E8");
ppSpot({ x: 4040, z: 112, r: 2.4, name: "The merch stand", fn: function () { ppShopCard("dome"); } });
PP.staffAt.push({ title: "Arena merch seller", place: JBX_KEYS.dome, x: 4044, z: 113, ry: -Math.PI / 2, seed: "merchdome" });
ppBar(R, 4000, 84.6, 14, 0, "dome", "The concession stand", JBX_KEYS.dome, "Concession stand server", "conc");
ppBox(0.4, 3.6, 3, gold, 4044.7, 1.8, 89, R);
ppBox(0.1, 3, 2.2, ppM(0x8A5AC8), 4044.5, 1.5, 89, R);
ppSign(R, ["SKY BOXES", "VIP card or staff badge"], 2.6, 0.8, 4044.5, 4.2, 89, -Math.PI / 2, "#140A24", "#F2D08A");
ppSpot({ x: 4042, z: 89, r: 2, name: "The lift to the Sky Boxes", fn: function () { jbxLift("up"); } });
jbxScreen(Lv, 12, 4, 4000, 6.4, 82.6, 0, "title", "dome");
[[3970, 100], [4030, 100]].forEach(function (q) { ppSofa(R, q[0], q[1], 0, 0x5A2A5A, 5); });
var chf = new THREE.Group();
chf.position.set(4000, 8.6, 101);
R.add(chf);
wMesh(new THREE.TorusGeometry(2.4, 0.1, 6, 32), gold, 0, 0, 0, chf).rotation.x = Math.PI / 2;
for (var k = 0; k < 18; k++) {
var a = k / 18 * Math.PI * 2;
ppSph(0.14, ppM(0xFFF0D0, { b: 1 }), Math.cos(a) * 2.4, -0.2, Math.sin(a) * 2.4, chf, 6);
}
var gl = wGlow(0xFFE0A0, 9, 0.25);
gl.position.set(4000, 8.4, 101);
Lv.add(gl);
jbxRoom(R, 4045.5, 4070, 82.2, 120, 4, tile, ceil, ppM(0xB8A8C8), [{ s: "w", c: 101, w: 3 }], "nsew", "dome");
ppBox(0.2, 4, 14, ppM(0xB8A8C8), 4058, 2, 113, R);
ppSolid(4058, 113, 0.1, 7);
for (var st = 0; st < 5; st++) {
ppBox(2.4, 2.2, 0.1, ppM(0x6A5A7A), 4064, 1.1, 86 + st * 3, R);
ppBox(1, 1.2, 0.8, ppM(0xF4F4F4), 4068.8, 0.6, 87.5 + st * 3, R);
}
for (var sk = 0; sk < 4; sk++) {
ppBox(0.6, 0.9, 1.4, ppM(0xF4F4F4), 4046.2, 0.45, 108 + sk * 2.6, R);
ppBox(0.05, 1, 1.2, ppM(0xC8D8E8, { e: 0x202838 }), 4045.8, 1.8, 108 + sk * 2.6, R);
}
ppSpot({ x: 4048.6, z: 112, r: 2.4, name: "The washbasins: freshen up", fn: function () { setStatus("<b>You wash your hands and straighten your collar.</b> Ready for the show."); } });
jbxRoom(R, 3930, 3954.5, 100, 120, 4, tile, ceil, ppM(0xE8E8F0), [{ s: "e", c: 110, w: 3 }], "nsew", "dome");
for (var bd = 0; bd < 3; bd++) {
ppBox(2, 0.6, 0.9, ppM(0xF4F4F4), 3934 + bd * 6, 0.5, 103, R);
ppBox(2, 0.15, 0.9, ppM(0x8AB8E8), 3934 + bd * 6, 0.85, 103, R);
ppSolid(3934 + bd * 6, 103, 1, 0.45);
}
ppSign(R, ["FIRST AID"], 2.4, 0.7, 3954.3, 3, 110, Math.PI / 2, "#F4F4F4", "#C83A3A");
ppSpot({ x: 3945, z: 110, r: 3, name: "First aid: rest, water and a check-up", fn: ppFirstAid });
PP.staffAt.push({ title: "Arena medic", place: JBX_KEYS.dome, x: 3940, z: 116, ry: 0, seed: "domemedic" });
var AX0 = 3905, AX1 = 4095, AZ0 = -78, AZ1 = 81.8, AH = 24;
var awall = jbxReal("plaster", 0x6A5A86);
jbxRoom(R, AX0, AX1, AZ0, AZ1, AH, conc, ppM(0x1E1636), awall, [{ s: "s", c: 3975, w: 6 }, { s: "s", c: 4025, w: 6 }, { s: "n", c: 4060, w: 3 }], "nse", "dome");
ppBox(0.3, 7.2, AZ1 - AZ0, awall, AX0, 3.6, (AZ0 + AZ1) / 2, R);
ppBox(0.3, AH - 10.6, AZ1 - AZ0, awall, AX0, 10.6 + (AH - 10.6) / 2, (AZ0 + AZ1) / 2, R);
ppBox(0.3, 3.4, AZ1 - 40, awall, AX0, 8.9, (40 + AZ1) / 2, R);
ppBox(0.3, 3.4, -40 - AZ0, awall, AX0, 8.9, (AZ0 - 40) / 2, R);
ppBox(0.06, 3.4, 80, ppM(0xA8C8E8, { op: 0.16 }), AX0, 8.9, 0, R);
ppSolid(AX0, (AZ0 + AZ1) / 2, 0.15, (AZ1 - AZ0) / 2);
ppWalk(3955, 4045, 81, 83, "dome");
ppWalk(4044, 4047, 99, 103, "dome");
ppWalk(3953, 3956, 108, 112, "dome");
ppWalk(3930, 4095, -87, -86, "dome");
var rl = [];
for (var q = 0; q < (lite ? 32 : 96); q++) {
var a2 = q / (lite ? 32 : 96) * Math.PI * 2;
rl.push([4000 + Math.cos(a2) * 44, AH - 0.4, -14 + Math.sin(a2) * 44]);
}
ppBulbs(Lv, rl, 0.22);
var SX0 = 3962, SX1 = 4038, SZ0 = -76, SZ1 = -52, SH = 2.2;
ppBox(SX1 - SX0, SH, SZ1 - SZ0, wood, (SX0 + SX1) / 2, SH / 2, (SZ0 + SZ1) / 2, R);
ppPad(SX0, SX1, SZ0, SZ1, SH);
ppBox(SX1 - SX0 + 0.4, 0.25, 0.4, gold, (SX0 + SX1) / 2, SH - 0.1, SZ1, R);
ppRamp(SX1, SX1 + 6, -74, -68, SH, 0, "x");
ppBox(6, 0.2, 6, steel, SX1 + 3, SH / 2, -71, R).rotation.z = 0.35;
ppGate(SX0, SX1 + 6.2, AZ0, SZ1, "staff", "The stage");
ppGate(4057, 4063, -80, -77, "staff", "Backstage");
jbxScreen(Lv, 64, 16, 4000, 12, -77.6, 0, "stage", "dome");
var sl = jbxScreen(Lv, 18, 10, 3934, 12, -58, 0.55, "side", "dome"), sr = jbxScreen(Lv, 18, 10, 4066, 12, -58, -0.55, "side", "dome");
[3934, 4066].forEach(function (x) { ppBox(0.8, 22, 0.8, steel, x, 11, -60, R); });
[[SX0, -76], [SX0, -54], [SX1, -76], [SX1, -54]].forEach(function (q) { ppBox(0.7, 18, 0.7, steel, q[0], SH + 9, q[1], R); ppSolid(q[0], q[1], 0.4, 0.4); });
ppBox(SX1 - SX0, 0.8, 0.8, steel, (SX0 + SX1) / 2, SH + 18, -54, R);
ppBox(SX1 - SX0, 0.8, 0.8, steel, (SX0 + SX1) / 2, SH + 18, -76, R);
for (var cn = 0; cn < (lite ? 8 : 16); cn++) {
var cx = SX0 + 4 + cn * (SX1 - SX0 - 8) / ((lite ? 8 : 16) - 1);
ppCyl(0.35, 0.45, 0.9, ppM(0x1A1A1A), cx, SH + 17, -54.6, R, 10);
var lens = wMesh(new THREE.CircleGeometry(0.3, 12), ppGlowMat(0xFFD8A0, 0.9), cx, SH + 16.5, -54.15, Lv);
lens.rotation.x = -0.7;
PP.glows.push({ m: lens, base: 0.85, amp: 0, sp: 0.02, hue: (cn / 16), cycle: 1 });
}
var stageBeams = [];
for (var b = 0; b < (lite ? 4 : 8); b++) {
var be = ppBeam();
be.position.set(SX0 + 8 + b * ((SX1 - SX0 - 16) / ((lite ? 4 : 8) - 1)), SH + 17, -55);
be.scale.setScalar(0.55);
Lv.add(be);
stageBeams.push({ m: be, ph: b * 0.8 });
}
JBX.stageBeams = stageBeams;
[SX0 - 4, SX1 + 4].forEach(function (x) {
for (var k = 0; k < 4; k++)
ppBox(3, 2.6, 2.6, ppM(0x141418), x, 1.3 + k * 2.6, -56, R);
ppSolid(x, -56, 1.6, 1.4);
for (var s = 0; s < 4; s++)
ppCyl(0.9, 0.9, 0.1, ppM(0x2A2A30), x, 1.3 + s * 2.6, -54.65, R, 16).rotation.x = Math.PI / 2;
});
PP.bands.push({ x: 4000, y: SH, z: -64, face: 0, seed: "headline" });
PP.djs.push({ x: 4000, y: SH, z: -70, ry: 0, seed: "domedj", title: "Arena DJ", place: JBX_KEYS.dome });
ppBox(5, 1.1, 1.8, ppM(0x2A1838), 4000, SH + 0.55, -71, R);
PP.staffAt.push({ title: "Arena stage manager", place: JBX_KEYS.dome, x: SX1 + 2, z: -62, ry: -Math.PI / 2, seed: "domesm" });
PP.music.push({ k: "jbx-dome", zone: "dome", x: 4000, z: -40, r: 140, C: { bpm: 124, band: true } });
ppSpot({ x: 4000, z: -47, r: 4, name: "The stage: who is playing tonight", fn: jbxStageCard });
var n = lite ? 10 : 16, fs = 2.2;
ppDanceFloor(Lv, "dome", 4000, -24, n, fs, 0, "dome", jbxPal());
PP.floors[PP.floors.length - 1].name = "the Arena floor";
PP.floors.push({ zone: "dome", x0: 3955, x1: 4045, z0: -50, z1: 30, y: 0, name: "the Arena floor" });
PP.crowds.push({ x0: 3984, x1: 4016, z0: -40, z1: -8, n: lite ? 6 : 28, y: 0.1, face: Math.PI, seed: "dome" });
if (!lite)
PP.crowds.push({ x0: 3962, x1: 4038, z0: -48, z1: -42, n: 12, y: 0, face: Math.PI, seed: "domefront" });
var orb = new THREE.Group();
orb.position.set(4000, 15, -24);
Lv.add(ppKeep(orb));
var core = ppSph(2.4, ppGlowMat(0xD8C0FF, 0.75), 0, 0, 0, orb, 24);
PP.glows.push({ m: core, base: 0.7, amp: 0.08, sp: 0.1, hue: 0.75, cycle: 1 });
var ring1 = wMesh(new THREE.TorusGeometry(4.2, 0.12, 8, 48), gold, 0, 0, 0, orb);
ring1.rotation.x = Math.PI / 2;
var ring2 = wMesh(new THREE.TorusGeometry(5.2, 0.08, 8, 48), gold, 0, 0, 0, orb);
ring2.rotation.x = 1.1;
for (var cr = 0; cr < (lite ? 10 : 20); cr++) {
var a3 = cr / (lite ? 10 : 20) * Math.PI * 2, cy = wMesh(new THREE.OctahedronGeometry(0.4, 0), ppM(0xE8E0F8, { e: 0x3A2A5A }), Math.cos(a3) * 4.2, 0, Math.sin(a3) * 4.2, orb);
cy.scale.y = 1.8;
}
ppCyl(0.04, 0.04, AH - 17, steel, 4000, 15 + (AH - 15) / 2, -24, R, 4);
JBX.orb = orb;
var seatM = ppM(0x7A2A50, { e: 0x240818 }), tierM = jbxReal("concrete", 0x7A7488), seats = [];
var TN = 16, TD = 1.2, TH = 0.45;
function stand(xNear, dir) {
for (var i = 1; i <= TN; i++) {
var xa = xNear + dir * TD * (i - 1), xb = xNear + dir * TD * i, x0 = Math.min(xa, xb), x1 = Math.max(xa, xb), h = TH * i;
ppBox(TD, h, 104, tierM, (x0 + x1) / 2, h / 2, 0, R);
PP.pads.push({ x0: x0, x1: x1, z0: -52, z1: 52, h: h });
ppBox(0.12, 0.12, 104, gold, dir > 0 ? x0 + 0.06 : x1 - 0.06, h, 0, R);
for (var z = -50; z <= 50; z += (lite ? 2.4 : 0.9)) {
if (Math.abs(z) < 1.3 || Math.abs(Math.abs(z) - 30) < 1.3)
continue;
seats.push([(x0 + x1) / 2 + dir * 0.15, h, z, dir]);
}
}
[-30, 0, 30].forEach(function (az) { ppBox(TD * TN, 0.05, 0.05, gold, xNear + dir * TD * TN / 2, 1 + TH * TN / 2, az, R).rotation.z = -dir * Math.atan2(TH, TD); });
}
stand(3950, -1);
stand(4050, 1);
var sb = new THREE.InstancedMesh(new THREE.BoxGeometry(0.7, 0.45, 0.6), seatM, seats.length), sbk = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 0.7, 0.6), seatM, seats.length), mm = new THREE.Matrix4();
seats.forEach(function (s, i) { mm.makeTranslation(s[0], s[1] + 0.22, s[2]); sb.setMatrixAt(i, mm); mm.makeTranslation(s[0] + s[3] * 0.36, s[1] + 0.6, s[2]); sbk.setMatrixAt(i, mm); });
R.add(ppKeep(sb));
if (!lite)
R.add(ppKeep(sbk));
[[3940, 10], [4060, 10], [3944, -20], [4056, 20]].forEach(function (q) { ppSpot({ x: q[0], z: q[1], r: 3, y: q[0] < 4000 ? TH * Math.ceil((3950 - q[0]) / TD) : TH * Math.ceil((q[0] - 4050) / TD), name: "A seat in the stands", fn: function () { ppRest("a seat in the stands, the whole Arena below you"); } }); });
var R2 = ppRand(7171), gi = 0;
for (var w = 0; w < (lite ? 0 : 30); w++) {
var west = w % 2 === 0, ti = 1 + Math.floor(R2() * TN), sx = west ? 3950 - TD * ti + TD / 2 : 4050 + TD * ti - TD / 2, sz = -45 + R2() * 90;
try {
var fg = wPerson("jbx_stand" + (gi++), {});
fg.position.set(sx, TH * ti, sz);
fg.rotation.y = west ? Math.PI / 2 : -Math.PI / 2;
Lv.add(fg);
PP.people.push({ g: fg, zone: "dome", x: sx, z: sz });
}
catch (e) { }
}
ppBox(10, 0.4, 6, dark, 4000, 0.2, 40, R);
PP.pads.push({ x0: 3995, x1: 4005, z0: 37, z1: 43, h: 0.4 });
ppBox(8, 1.1, 1.4, ppM(0x1A1A22), 4000, 0.95, 39, R);
ppSolid(4000, 39, 4, 0.7, 0, 1.6, 0);
for (var f = 0; f < 24; f++)
ppBox(0.12, 0.04, 0.4, ppM([0xE8E0D0, 0xD86A6A, 0x6AC8E8][f % 3]), 3996.4 + f * 0.3, 1.52, 39, R);
ppSpot({ x: 4000, z: 42.4, r: 2.6, name: "The front-of-house desk: sound and light", fn: jbxFohCard });
PP.staffAt.push({ title: "Arena sound engineer", place: JBX_KEYS.dome, x: 3998, z: 40.2, y: 0.4, ry: Math.PI, seed: "domesound" }, { title: "Arena lighting operator", place: JBX_KEYS.dome, x: 4002, z: 40.2, y: 0.4, ry: Math.PI, seed: "domelight" });
ppBar(R, 3962, 70, 16, Math.PI, "dome", "The west arena bar", JBX_KEYS.dome, "Arena bartender", "arenaw");
ppBar(R, 4038, 70, 16, Math.PI, "dome", "The east arena bar", JBX_KEYS.dome, "Arena bartender", "arenae");
var rb = jbxScreen(Lv, 10, 5, 4000, 4, 62.2, Math.PI, "raffle", "dome");
ppBox(10.4, 5.4, 0.3, gold, 4000, 4, 62.45, R);
ppBox(0.3, 1.4, 0.3, dark, 3996, 0.7, 62.45, R);
ppBox(0.3, 1.4, 0.3, dark, 4004, 0.7, 62.45, R);
ppSolid(4000, 62.45, 5.2, 0.3);
ppSpot({ x: 4000, z: 58.6, r: 3, name: "The raffle and your Party Passport", fn: jbxRaffleCard });
PP.staffAt.push({ title: "Raffle caller", place: JBX_KEYS.dome, x: 4006.4, z: 61, ry: Math.PI, seed: "raffle" });
PP.staffAt.push({ title: "Arena usher", place: JBX_KEYS.dome, x: 3975, z: 78, ry: Math.PI, seed: "domeusher2" }, { title: "Arena usher", place: JBX_KEYS.dome, x: 4025, z: 78, ry: Math.PI, seed: "domeusher3" }, { title: "Arena security officer", place: JBX_KEYS.dome, x: 3958, z: -46, ry: Math.PI / 2, seed: "domesec2" }, { title: "Arena security officer", place: JBX_KEYS.dome, x: 4042, z: -46, ry: -Math.PI / 2, seed: "domesec3" });
jbxConfettiMake(Lv);
var SY = 7.2;
jbxRoom(R, 3866, 3904.6, -40, 40, 3.8, carpet, ceil, ppM(0x3A2440), [], "nsw", "dome", SY);
ppBox(38.6, SY, 80, dark, 3885.3, SY / 2, 0, R);
ppBox(0.1, 0.9, 80, gold, 3904.4, SY + 1, 0, R);
for (var bx = 0; bx < 4; bx++) {
var zc = -30 + bx * 20;
if (bx)
ppBox(14, 3.8, 0.2, ppM(0x3A2440), 3897.6, SY + 1.9, zc - 10, R);
ppSofa(R, 3898, zc - 3, Math.PI / 2, 0xC9A868, 4, SY);
ppSofa(R, 3898, zc + 3, Math.PI / 2, 0xC9A868, 4, SY);
ppTable(R, 3900.8, zc, 0.7, SY);
ppSign(R, ["SKY BOX " + (bx + 1)], 2.2, 0.6, 3891, SY + 2.8, zc, Math.PI / 2, "#1A1208", "#F2D08A");
ppSpot({ x: 3901, z: zc, r: 3, y: SY, name: "Sky Box " + (bx + 1) + ": a seat at the glass", fn: function () { ppRest("a sofa in the Sky Boxes, the whole show below the glass"); } });
}
ppBar(R, 3868.6, 0, 14, Math.PI / 2, "sky", "The Sky Box bar", JBX_KEYS.dome, "Sky Box host", "skybar", SY);
ppSpot({ x: 3872, z: -34, r: 2.2, y: SY, name: "The lift down to the Grand Foyer", fn: function () { jbxLift("down"); } });
ppBox(0.3, 3, 2.4, gold, 3866.2, SY + 1.5, -34, R);
var sc = new THREE.Group();
sc.position.set(3885, SY + 3.4, 0);
R.add(sc);
wMesh(new THREE.TorusGeometry(1.6, 0.08, 6, 24), gold, 0, 0, 0, sc).rotation.x = Math.PI / 2;
for (var sq = 0; sq < 12; sq++) {
var a4 = sq / 12 * Math.PI * 2;
ppSph(0.12, ppM(0xFFF0D0, { b: 1 }), Math.cos(a4) * 1.6, -0.2, Math.sin(a4) * 1.6, sc, 6);
}
var BZ0 = -118, BZ1 = -86.5, CZ0 = -86.2, CZ1 = -77.8;
jbxRoom(R, 3930, 4095, CZ0, CZ1, 4.2, conc, ceil, ppM(0x4A4458), [{ s: "s", c: 4060, w: 3 }], "we", "dome");
ppSign(R, ["BACKSTAGE", "Production · dressing rooms · wardrobe · green room · dock"], 6, 1, 4060, 3.2, CZ1 - 0.3, Math.PI, "#1A1A22", "#E8E0D0");
var rooms = [[3930, 3965, "Production office", [{ s: "s", c: 3947, w: 2.4 }]], [3965.3, 3985, "Dressing room 1", [{ s: "s", c: 3975, w: 2.4 }]], [3985.3, 4005, "Dressing room 2", [{ s: "s", c: 3995, w: 2.4 }]],
[4005.3, 4025, "Dressing room 3", [{ s: "s", c: 4015, w: 2.4 }]], [4025.3, 4045, "Wardrobe", [{ s: "s", c: 4035, w: 2.4 }]], [4045.3, 4070, "The green room", [{ s: "s", c: 4058, w: 2.4 }]], [4070.3, 4095, "The loading dock", [{ s: "s", c: 4082, w: 3 }]]];
rooms.forEach(function (r, i) {
jbxRoom(R, r[0], r[1], BZ0, BZ1, 4.2, i === 6 ? conc : ppM(0x3A3448), ceil, ppM(0x5A5068), r[3], i === 0 ? "nsew" : "nse", "dome");
ppSign(R, [r[2].toUpperCase()], 2.6, 0.5, (r[0] + r[1]) / 2, 3.4, BZ1 + 0.2, 0, "#1A1A22", "#E8E0D0");
});
ppBox(5, 0.9, 1.8, wood, 3947, 0.45, -108, R);
ppSolid(3947, -108, 2.5, 0.9);
jbxScreen(Lv, 8, 3, 3947, 2.6, -117.6, 0, "prod", "dome");
for (var cm = 0; cm < 4; cm++)
ppBox(1.2, 0.8, 0.08, ppM(0x1A2A24), 3941 + cm * 4, 1.4, -109, R);
ppSpot({ x: 3947, z: -104.6, r: 2.6, name: "The production desk: run the night", fn: jbxProdCard });
PP.staffAt.push({ title: "Production manager", place: JBX_KEYS.dome, x: 3944, z: -109.6, ry: 0, seed: "prodman" });
[3975, 3995, 4015].forEach(function (dx, i) {
ppBox(8, 2, 0.1, ppM(0xE0E8F0, { e: 0x303840 }), dx, 2, -117.7, R);
ppBox(8, 0.8, 0.8, wood, dx, 0.4, -117.2, R);
ppSolid(dx, -117.2, 4, 0.4);
for (var mb = 0; mb < 12; mb++)
ppSph(0.08, ppM(0xFFF0D0, { b: 1 }), dx - 3.8 + ((mb % 6) * 1.52), mb < 6 ? 3.05 : 0.95, -117.6, R, 6);
ppBox(0.08, 0.08, 5, ppM(0xC9A868), dx + 7.6, 2, -108, R);
for (var cl = 0; cl < 6; cl++)
ppBox(0.1, 1.2, 0.6, ppM([0xC83A6A, 0x3A3A8A, 0xE8D8F0][cl % 3]), dx + 7.6, 1.3, -110 + cl * 0.8, R);
ppSofa(R, dx - 6, -98, 0, 0x6A3A6A, 3);
ppSpot({ x: dx, z: -114, r: 2.6, name: "Dressing room " + (i + 1) + ": ready for the stage", fn: function () { setStatus("<b>Dressing room " + (i + 1) + ".</b> The bulbs round the mirror are warm and steady. Hair, make-up, the costume: you are ready when the stage manager calls."); } });
});
for (var wr = 0; wr < 4; wr++) {
ppBox(0.08, 0.08, 14, ppM(0xC9A868), 4029 + wr * 3.4, 2.1, -104, R);
ppSolid(4029 + wr * 3.4, -104, 0.3, 7);
for (var cc = 0; cc < 12; cc++)
ppBox(0.1, 1.3, 0.55, ppM([0x8A2A4A, 0x2A4A8A, 0xC9A868, 0xE8E0F0, 0x1A1A1A][(cc + wr) % 5]), 4029 + wr * 3.4, 1.4, -110 + cc * 1.1, R);
}
ppSpot({ x: 4035, z: -92, r: 2.6, name: "Wardrobe: the costumes for tonight", fn: function () { ppShopCard("costume"); } });
PP.staffAt.push({ title: "Wardrobe supervisor", place: JBX_KEYS.dome, x: 4040, z: -95, ry: -Math.PI / 2, seed: "wardrobe" });
ppSofa(R, 4052, -112, 0, 0x3A6A4A, 5);
ppSofa(R, 4064, -112, 0, 0x3A6A4A, 4);
ppTable(R, 4058, -108, 0.8);
ppBox(10, 0.9, 1.2, ppM(0xE8E0D0), 4058, 0.45, -95, R);
ppSolid(4058, -95, 5, 0.6);
for (var fo = 0; fo < 10; fo++)
ppCyl(0.35, 0.35, 0.12, ppM([0xE8A04A, 0x8AC85A, 0xC85A3A, 0xF0E0B0][fo % 4]), 4054 + fo * 0.9, 0.98, -95, R, 12);
ppSpot({ x: 4058, z: -92.6, r: 2.6, name: "Catering: food for the crew", fn: function () { ppMenu("crew", "Backstage catering"); } });
PP.staffAt.push({ title: "Backstage caterer", place: JBX_KEYS.dome, x: 4058, z: -96.6, ry: 0, seed: "cater" });
ppBox(16, 4, 6, ppM(0xE8E8EC), 4082, 2, -112, R);
ppBox(4, 3, 6, ppM(0x2A4A8A), 4074, 1.5, -108.6, R);
ppSolid(4082, -112, 8, 3);
ppSolid(4074, -108.6, 2, 3);
for (var fc = 0; fc < 8; fc++)
ppBox(1.2, 1, 1, ppM(0x1A1A1A), 4074 + (fc % 4) * 1.6, 0.5 + Math.floor(fc / 4), -100, R);
ppSolid(4076.4, -100, 3.2, 0.6);
ppSpot({ x: 4082, z: -95, r: 3, name: "The loading dock: load in the show", fn: function () { if (!ppStaff())
return setStatus("Crew only."); setStatus("<b>You wheel the flight cases in from the truck.</b> The stage manager ticks them off the list."); } });
PP.staffAt.push({ title: "Stage crew", place: JBX_KEYS.dome, x: 4080, z: -104, ry: Math.PI, seed: "crew1" }, { title: "Stage crew", place: JBX_KEYS.dome, x: 4086, z: -98, ry: Math.PI, seed: "crew2" });
jbxFinish(R);
},
function (dir) {
if (dir === "up" && !ppVip()) {
worldCard(ppHead("The Sky Boxes", "The lift opens for anyone holding a Glowworm VIP card (Confetti & Co. sells them, and so does the Glowworm's ticket desk) and for the staff.") +
worldBtn("vip", "Where do I get a VIP card?", "Confetti & Co., on the Boulevard: the arrow shows the way"), { vip: function () { ppGoOut("dome"); ppShowWay("shop"); } });
return;
}
if (typeof playTone === "function") {
playTone(520, 0.15);
setTimeout(function () { playTone(dir === "up" ? 700 : 400, 0.3); }, 250);
}
ppDanceSet(false);
if (dir === "up") {
ppPut(3874, -34, -Math.PI / 2, 7.2);
setStatus("<b>The Sky Boxes.</b> The whole Arena below the glass. The bar is behind you; the lift takes you back down.");
}
else {
ppPut(4040, 89, Math.PI / 2);
setStatus("<b>Back down in the Grand Foyer.</b>");
}
},
function (G) {
var R = new THREE.Group();
R.name = "pp-glow";
G.add(R);
var Lv = new THREE.Group();
G.add(Lv);
PP.rooms.glow = { g: R, live: Lv };
var lite = PP.lite, wall = jbxReal("plaster", 0x7A5A8A), ceil = jbxReal("plaster", 0x4A3858), wood = jbxReal("wood", 0x8A6248), floor = jbxReal("floortile", 0x6A5A7A), carpet = ppM(0x3A2448), gold = ppM(0xC9A868, { e: 0x2A1C08 }), dark = ppM(0x1E1228);
jbxRoom(R, 4585, 4615, 48, 64, 5, wood, ceil, wall, [{ s: "s", c: 4600, w: 4 }, { s: "n", c: 4600, w: 4 }], "nsew", "glow");
ppSpot({ x: 4600, z: 62.6, r: 2, name: "The doors: back out onto the Boulevard", fn: function () { ppGoOut("glow"); } });
ppSign(R, ["THE AFTERGLOW", "Silent disco ahead · photos and desserts right · trivia and the Quiet Room left"], 9, 1.4, 4600, 3.6, 63.7, Math.PI, "#1A0C24", "#FFB8E0");
ppBox(3, 1.1, 1, dark, 4590, 0.55, 52, R);
ppBox(3.2, 0.06, 1.2, gold, 4590, 1.12, 52, R);
ppSolid(4590, 52, 1.5, 0.5);
ppSpot({ x: 4590, z: 54.4, r: 2.2, name: "The host stand: what is on tonight", fn: jbxGlowHost });
PP.staffAt.push({ title: "Afterglow host", place: JBX_KEYS.glow, x: 4590, z: 50.8, ry: 0, seed: "glowhost" });
ppBox(0.8, 1.1, 6, dark, 4613.6, 0.55, 56, R);
ppSolid(4613.6, 56, 0.4, 3);
for (var c = 0; c < 8; c++)
ppBox(0.06, 1.2, 0.5, ppM([0x3A2A1A, 0x6A2A3A, 0x2A3A5A, 0x1A1A1A][c % 4]), 4614.8, 2.2, 53.2 + c * 0.75, R);
ppSpot({ x: 4611, z: 56, r: 2, name: "The coat check", fn: ppCoatCheck });
ppWalk(4597, 4603, 47, 49, "glow");
jbxRoom(R, 4555, 4645, 0, 47.5, 8, floor, ceil, ppM(0x3A2A50), [{ s: "s", c: 4600, w: 4 }, { s: "w", c: 32, w: 3 }, { s: "w", c: 10, w: 3 }, { s: "e", c: 32, w: 3 }, { s: "e", c: 10, w: 3 }, { s: "n", c: 4600, w: 3 }], "nsew", "glow");
ppSign(R, ["SILENT DISCO", "Headphones at the booth · three channels"], 7, 1.4, 4600, 6.2, 47.2, Math.PI, "#100A20", "#B8E8FF");
var nf = lite ? 8 : 12;
ppDanceFloor(Lv, "glow", 4600, 22, nf, 2, 0, "disco", JBX_THEMES.neon[1]);
PP.floors[PP.floors.length - 1].name = "the Silent Disco floor";
ppBox(26, 0.6, 4, dark, 4600, 0.3, 3.5, R);
ppPad(4587, 4613, 1.5, 5.5, 0.6);
[["#FF8AC8", 4590], ["#7AE0E8", 4600], ["#F0C870", 4610]].forEach(function (q, i) {
ppBox(4, 1.1, 1.4, ppM(0x1A1020), q[1], 1.15, 4.4, R);
ppSign(R, ["CHANNEL " + (i + 1)], 2.4, 0.6, q[1], 2.4, 5.2, 0, "#100A20", q[0]);
PP.djs.push({ x: q[1], y: 0.6, z: 3.4, ry: 0, seed: "discodj" + i, title: "Silent disco DJ", place: JBX_KEYS.glow });
});
PP.music.push({ k: "jbx-disco", zone: "glow", x: 4600, z: 22, r: 34, C: { bpm: 118, band: false }, disco: 1 });
PP.crowds.push({ x0: 4590, x1: 4610, z0: 12, z1: 32, n: lite ? 4 : 18, y: 0.1, face: Math.PI, seed: "disco" });
ppBox(1, 1.15, 6, dark, 4557.6, 0.58, 40, R);
ppBox(1.2, 0.08, 6.2, gold, 4557.6, 1.17, 40, R);
ppSolid(4557.6, 40, 0.5, 3);
for (var h = 0; h < 9; h++) {
var hp = wMesh(new THREE.TorusGeometry(0.16, 0.04, 6, 12, Math.PI), ppM([0xFF8AC8, 0x7AE0E8, 0xF0C870][h % 3], { e: [0x3A1028, 0x103A3A, 0x3A2A08][h % 3] }), 4555.7, 1.6 + Math.floor(h / 3) * 0.45, 38 + (h % 3) * 1.4, R);
hp.rotation.y = Math.PI / 2;
}
ppSpot({ x: 4560, z: 40, r: 2.4, name: "The headphone booth: pick a channel", fn: jbxDiscoCard });
PP.staffAt.push({ title: "Headphone booth attendant", place: JBX_KEYS.glow, x: 4556.4, z: 41, ry: Math.PI / 2, seed: "phones" });
ppBar(R, 4558.5, 21, 10, Math.PI / 2, "glow", "The Afterglow bar", JBX_KEYS.glow, "Afterglow bartender", "glowbar");
[[4640, 40, -Math.PI / 2], [4640, 26, -Math.PI / 2], [4572, 44, Math.PI], [4628, 44, Math.PI]].forEach(function (q) { ppSofa(R, q[0], q[1], q[2], 0x5A2A6A, 4); });
var rb = [];
for (var k = 0; k < (lite ? 40 : 90); k++) {
var f = k / (lite ? 40 : 90);
rb.push([4555.4, 7.4, f * 47.5]);
rb.push([4644.6, 7.4, f * 47.5]);
}
ppBulbs(Lv, rb, 0.12);
jbxRoom(R, 4520, 4554.5, 22, 44, 4, carpet, ppM(0x0E0A1E), ppM(0x3A3050), [{ s: "e", c: 32, w: 3 }], "nsw", "glow");
ppWalk(4554, 4556, 30.5, 33.5, "glow");
ppSign(R, ["THE QUIET ROOM", "Soft light · no music · rest as long as you like"], 5, 1, 4554.2, 3, 26, -Math.PI / 2, "#100A20", "#C8D8F0");
var R2 = ppRand(5151);
for (var b = 0; b < (lite ? 6 : 10); b++) {
var bx = 4524 + R2() * 26, bz = 25 + R2() * 16, bb = ppSph(0.8, ppM([0x6A5A8A, 0x4A6A7A, 0x7A5A6A][b % 3]), bx, 0.45, bz, R, 10);
bb.scale.set(1, 0.6, 1);
ppSolidR(bx, bz, 0.6);
}
for (var l = 0; l < 4; l++) {
var lg = ppSph(0.35, ppGlowMat(0xC8B8F0, 0.45), 4523 + l * 9, 2.4, 43.4, Lv, 10);
PP.glows.push({ m: lg, base: 0.4, amp: 0.06, sp: 0.05, hue: 0.7 });
}
var stc = wTex(512, 256, function (x, W, H) { x.fillStyle = "#0E0A1E"; x.fillRect(0, 0, W, H); var r = ppRand(99); for (var i = 0; i < 260; i++) {
x.fillStyle = "rgba(220,210,255," + (0.25 + r() * 0.5).toFixed(2) + ")";
x.fillRect(r() * W, r() * H, 1.6, 1.6);
} });
var sm = wMesh(new THREE.PlaneGeometry(34, 21.5), new THREE.MeshBasicMaterial({ map: stc, fog: false }), 4537.2, 3.95, 33, R);
sm.rotation.x = Math.PI / 2;
ppSpot({ x: 4537, z: 33, r: 6, name: "The Quiet Room: rest", fn: function () { ppRest("the Quiet Room. The light is low and steady, the music far away. Stay as long as you like"); } });
PP.staffAt.push({ title: "Quiet room attendant", place: JBX_KEYS.glow, x: 4551, z: 42, ry: -Math.PI / 2, seed: "quiet" });
jbxRoom(R, 4520, 4554.5, -2, 21.7, 4.5, wood, ceil, ppM(0x4A3A30), [{ s: "e", c: 10, w: 3 }], "nwe", "glow");
ppWalk(4554, 4556, 8.5, 11.5, "glow");
for (var t = 0; t < 4; t++) {
var tx = 4528 + (t % 2) * 14, tz = 4 + Math.floor(t / 2) * 10;
ppTable(R, tx, tz, 1.1);
for (var ch = 0; ch < 4; ch++) {
var a = ch / 4 * Math.PI * 2, chx = tx + Math.cos(a) * 1.7, chz = tz + Math.sin(a) * 1.7;
ppCyl(0.26, 0.26, 0.1, ppM(0x6A2A3A), chx, 0.48, chz, R, 12);
ppCyl(0.03, 0.03, 0.46, gold, chx, 0.23, chz, R, 6);
var bk = ppBox(0.5, 0.55, 0.06, ppM(0x6A2A3A), tx + Math.cos(a) * 1.95, 0.8, tz + Math.sin(a) * 1.95, R);
bk.rotation.y = Math.PI / 2 - a;
}
ppCyl(0.12, 0.12, 0.3, ppGlowMat(0xFFD8A0, 0.6), tx, 0.78, tz, Lv, 10);
}
ppBox(1.6, 1.2, 0.8, wood, 4537, 0.6, -0.6, R);
ppSolid(4537, -0.6, 0.8, 0.4);
jbxScreen(Lv, 8, 3, 4537, 2.6, -1.6, 0, "trivia", "glow");
ppSpot({ x: 4537, z: 2, r: 3, name: "Party Trivia: three right and you get the stamp", fn: jbxTrivia });
PP.staffAt.push({ title: "Trivia host", place: JBX_KEYS.glow, x: 4538.6, z: -0.6, ry: 0, seed: "trivia" });
jbxRoom(R, 4645.5, 4680, 22, 44, 4.5, wood, ceil, ppM(0x5A3A5A), [{ s: "w", c: 32, w: 3 }], "nse", "glow");
ppWalk(4644, 4646.5, 30.5, 33.5, "glow");
var bd = wTex(512, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#3A1A5A");
g.addColorStop(1, "#1A1040");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var r = ppRand(77);
for (var i = 0; i < 60; i++) {
x.fillStyle = "rgba(240,210,140," + (0.4 + r() * 0.5).toFixed(2) + ")";
var sx = r() * W, sy = r() * H, s = 2 + r() * 5;
x.beginPath();
for (var p = 0; p < 10; p++) {
var a = p / 10 * Math.PI * 2 - Math.PI / 2, rr = p % 2 ? s * 0.45 : s;
x.lineTo(sx + Math.cos(a) * rr, sy + Math.sin(a) * rr);
}
x.fill();
}
x.fillStyle = "#F2D08A";
x.font = "bold 34px Georgia";
x.textAlign = "center";
x.fillText("JUBILEE", W / 2, H - 30);
});
var bdm = wMesh(new THREE.PlaneGeometry(10, 4.2), new THREE.MeshBasicMaterial({ map: bd }), 4679.8, 2.2, 33, R);
bdm.rotation.y = -Math.PI / 2;
ppBox(3, 2.6, 2.4, ppM(0x2A1A3A), 4664, 1.3, 25, R);
ppBox(0.05, 2, 1.6, ppM(0xA82A4A), 4662.48, 1.2, 25, R);
ppSolid(4664, 25, 1.5, 1.2);
ppSign(R, ["PHOTO BOOTH"], 2.4, 0.6, 4662.4, 2.9, 25, -Math.PI / 2, "#1A0C24", "#FFD9A0");
ppBox(3, 0.9, 1.2, wood, 4672, 0.45, 41.6, R);
ppSolid(4672, 41.6, 1.5, 0.6);
for (var pr = 0; pr < 6; pr++)
ppSph(0.2, ppM([0xFFD040, 0xE84A8A, 0x6AD8FF][pr % 3]), 4671 + pr * 0.4, 1, 41.6, R, 8);
var ring = wMesh(new THREE.TorusGeometry(0.7, 0.06, 6, 24), ppGlowMat(0xFFF0D8, 0.6), 4668, 1.7, 33, Lv);
ring.rotation.y = Math.PI / 2;
ppSpot({ x: 4672, z: 33, r: 3.2, name: "The Photo Booth: a picture strip for your backpack", fn: jbxPhotoCard });
ppBox(3, 2.6, 2.4, ppM(0x2A1A3A), 4664, 1.3, 41, R);
ppBox(0.05, 2, 1.6, ppM(0x2A6AA8), 4662.48, 1.2, 41, R);
ppSolid(4664, 41, 1.5, 1.2);
ppSign(R, ["BOOTH 2"], 1.8, 0.5, 4662.4, 2.9, 41, -Math.PI / 2, "#1A0C24", "#B8E8FF");
ppSpot({ x: 4661, z: 41, r: 2, name: "Booth 2: a picture strip for your backpack", fn: jbxPhotoCard });
ppCyl(0.03, 0.03, 1.7, ppM(0x2A2A30), 4668, 0.85, 33, R, 6);
ppBox(0.08, 1.8, 4, gold, 4648.2, 0.9, 40, R);
ppBox(0.06, 0.06, 4, gold, 4648.6, 1.8, 40, R);
for (var hp2 = 0; hp2 < 6; hp2++) {
var hz = 38.4 + hp2 * 0.65;
ppCyl(0.16, 0.2, 0.22, ppM([0x1A1A1A, 0xE84A8A, 0xF0C040, 0x6AD8FF, 0xFFFFFF, 0x8A4AE8][hp2]), 4648.7, 1.95, hz, R, 10);
ppCyl(0.28, 0.28, 0.02, ppM([0x1A1A1A, 0xE84A8A, 0xF0C040, 0x6AD8FF, 0xFFFFFF, 0x8A4AE8][hp2]), 4648.7, 1.85, hz, R, 12);
}
for (var bo = 0; bo < 3; bo++) {
var boa = wMesh(new THREE.TorusGeometry(0.35, 0.08, 6, 14), ppM([0xF080C0, 0xF0D070, 0xA0E0F0][bo]), 4648.7, 1.2, 38.8 + bo * 1.2, R);
boa.rotation.y = Math.PI / 2;
}
for (var ws = 0; ws < 14; ws++) {
ppBox(0.04, 0.9, 0.28, ppM(0xF4ECDC), 4679.85, 1.4 + (ws % 2) * 1.1, 24 + Math.floor(ws / 2) * 0.6 + (ws > 7 ? 11 : 0), R);
for (var fr = 0; fr < 4; fr++)
ppBox(0.045, 0.18, 0.22, ppM([0x7A5AA0, 0xC86A8A, 0x4A8AA8, 0xC8A04A][(ws + fr) % 4]), 4679.83, 1.73 - fr * 0.22 + (ws % 2) * 1.1, 24 + Math.floor(ws / 2) * 0.6 + (ws > 7 ? 11 : 0), R);
}
ppSofa(R, 4652, 24, Math.PI / 2, 0x6A2A5A, 4);
ppSofa(R, 4652, 30, Math.PI / 2, 0x6A2A5A, 4);
PP.staffAt.push({ title: "Photo booth attendant", place: JBX_KEYS.glow, x: 4668, z: 37, ry: Math.PI / 2, seed: "photo" });
jbxRoom(R, 4645.5, 4680, -2, 21.7, 4.5, jbxReal("floortile", 0xE8D8DC), ceil, ppM(0xD8B8C8), [{ s: "w", c: 10, w: 3 }], "ne", "glow");
ppWalk(4644, 4646.5, 8.5, 11.5, "glow");
ppBox(12, 1.1, 1.2, ppM(0xE8D8E0), 4664, 0.55, 2, R);
ppBox(12.2, 0.06, 1.4, ppM(0xF8F0F4), 4664, 1.12, 2, R);
ppSolid(4664, 2, 6, 0.6);
ppBox(11, 0.9, 1, ppM(0xC8E0F0, { op: 0.35 }), 4664, 1.6, 2, R);
for (var ck = 0; ck < 8; ck++) {
var cx = 4659.5 + ck * 1.3;
ppCyl(0.38, 0.38, 0.35, ppM([0xF0D0E0, 0x8A4A2A, 0xF8F0E0, 0xE88AA8][ck % 4]), cx, 1.3, 2, R, 14);
ppCyl(0.3, 0.3, 0.2, ppM([0xE84A8A, 0xF4ECE0, 0xC8803A, 0xFFFFFF][ck % 4]), cx, 1.55, 2, R, 14);
}
ppSign(R, ["THE DESSERT PARLOUR", "Cakes · sundaes · hot chocolate"], 6, 1.2, 4664, 3.4, -1.7, 0, "#2A1420", "#FFD8E8");
ppSpot({ x: 4664, z: 4.6, r: 3, name: "The Dessert Parlour", fn: function () { ppMenu("dessert", "The Dessert Parlour"); } });
PP.staffAt.push({ title: "Dessert chef", place: JBX_KEYS.glow, x: 4661, z: 0.6, ry: 0, seed: "pastry" }, { title: "Dessert server", place: JBX_KEYS.glow, x: 4667, z: 0.6, ry: 0, seed: "dessert" });
for (var dt = 0; dt < 4; dt++) {
ppTable(R, 4652 + (dt % 2) * 18, 12 + Math.floor(dt / 2) * 6, 0.7);
}
jbxRoom(R, 4575, 4625, -24, -0.3, 4, jbxReal("floortile", 0xC8C8CC), ceil, ppM(0x9A9AA8), [], "nwe", "glow");
ppWalk(4597, 4603, -1, 1, "glow");
ppGate(4597, 4603, -1.4, 0.4, "staff", "The staff kitchen");
for (var sv = 0; sv < 4; sv++) {
ppBox(4, 0.95, 1.2, jbxReal("metal", 0xB8BCC4), 4582 + sv * 6, 0.48, -22.6, R);
ppSolid(4582 + sv * 6, -22.6, 2, 0.6);
}
ppBox(16, 0.95, 1.2, jbxReal("metal", 0xB8BCC4), 4600, 0.48, -12, R);
ppSolid(4600, -12, 8, 0.6);
ppSpot({ x: 4600, z: -9.6, r: 3, name: "The staff kitchen: plate up the desserts", fn: ppRestock });
PP.staffAt.push({ title: "Afterglow manager", place: JBX_KEYS.glow, x: 4618, z: -16, ry: -Math.PI / 2, seed: "glowman" });
var dl = [];
[[4585, 4615, 48, 64, 5], [4520, 4554.5, 22, 44, 4], [4520, 4554.5, -2, 21.7, 4.5], [4645.5, 4680, 22, 44, 4.5], [4645.5, 4680, -2, 21.7, 4.5]].forEach(function (r, i) {
if (i === 1)
return;
for (var x = r[0] + 4; x < r[1] - 2; x += 6)
for (var z = r[2] + 4; z < r[3] - 2; z += 6)
dl.push([x, r[4] - 0.06, z]);
});
var dli = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 14), ppM(0xE8D4B8, { b: 1 }), dl.length), dm = new THREE.Matrix4();
dl.forEach(function (p, i) { dm.makeTranslation(p[0], p[1], p[2]); dli.setMatrixAt(i, dm); });
R.add(ppKeep(dli));
jbxFinish(R);
},
function () {
var fns = {}, h = ppHead("The headphone booth", "Three DJs, three channels. Everyone dances to their own; the room itself stays quiet. Free, all night.");
[1, 2, 3].forEach(function (i) { var C = JBX_CH[i]; h += worldBtn("c" + i, "<span style='color:" + C.col + "'>●</span> " + esc(C.name) + (JBX.disco === i ? " · on" : ""), C.bpm + " beats a minute"); fns["c" + i] = function () { jbxDisco(i); }; });
h += worldBtn("off", "Hand the headphones back", "");
fns.off = function () { jbxDisco(0); };
worldCard(h, fns);
},
function (i) {
JBX.disco = i;
PP.req = PP.req || {};
if (i) {
PP.req["jbx-disco"] = JBX_CH[i].bpm;
setStatus("🎧 <b>" + esc(JBX_CH[i].name) + "</b> in your ears. Walk onto the floor and press E to dance.");
}
else
setStatus("You hand the headphones back. The room is quiet again.");
PP.tiles.forEach(function (T) { if (T.key === "disco")
T.pal = i ? JBX_CH[i].pal : JBX_THEMES.neon[1]; });
worldCard(null);
},
function () {
var S = JBX.st;
worldCard(ppHead("The Afterglow", "The after-party house: open all night, free to come in.") +
"<div>🎧 The <b>Silent Disco</b> is ahead: headphones from the booth on your left.<br>📸 The <b>Photo Booth</b> and the <b>Dessert Parlour</b> are through the right-hand doors.<br>❓ <b>Party Trivia</b> and the <b>Quiet Room</b> are through the left.</div>" +
(jbxOn() ? "<div style='margin-top:6px;color:#FFD9A0'>Tonight is <b>" + esc(jbxTitle()) + "</b>. A strip from the Photo Booth and three right at trivia both count on your Party Passport.</div>" : ""));
},
function () {
var S = JBX.st, out = [];
if (!S || !S.title)
return out;
var man = jbxT(S.fw_at);
if (man !== null)
out.push(man);
var a = jbxT(S.starts_at), b = jbxT(S.ends_at), ev = +S.fw_every || 0;
if (a !== null && ev >= 5) {
var end = b !== null ? b : a + 12 * 3600000;
for (var t = a + ev * 60000; t < end && out.length < 200; t += ev * 60000)
out.push(t);
}
return out.sort(function (x, y) { return x - y; });
},
function () {
if (JBX.fw || !PP.outLive)
return JBX.fw;
var lite = PP.lite, slots = lite ? 5 : 10, n = lite ? 70 : 160, G = new THREE.Group();
G.name = "jbx-fireworks";
PP.outLive.add(ppKeep(G));
var map = typeof softGlow === "function" ? softGlow() : null, list = [];
for (var s = 0; s < slots; s++) {
var pos = new Float32Array(n * 3), g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var m = new THREE.PointsMaterial({ color: 0xE87AB8, size: lite ? 3.2 : 2.6, map: map, transparent: true, opacity: 0, depthWrite: false, fog: false, sizeAttenuation: true });
var P = new THREE.Points(g, m);
P.visible = false;
P.frustumCulled = false;
G.add(P);
var dirs = new Float32Array(n * 3);
for (var i = 0; i < n; i++) {
var y = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - y * y), a = i * 2.39996;
dirs[i * 3] = Math.cos(a) * r;
dirs[i * 3 + 1] = y;
dirs[i * 3 + 2] = Math.sin(a) * r;
}
list.push({ P: P, dirs: dirs, n: n, key: null });
}
JBX.fw = { g: G, slots: list };
return JBX.fw;
},
function () {
var F = JBX.fw;
if (!F)
return;
var show = jbxShowNow(), out = PP.zone === "out" || PP.zone === "roof";
if (show === null || !out) {
F.slots.forEach(function (s) { s.P.visible = false; s.key = null; });
return;
}
var age = (jbxNow() - show) / 1000, R = ppRand((show / 1000) | 0), bursts = [];
for (var i = 0; i < 44; i++) {
var t0 = i < 36 ? i * 3.4 + R() * 1.2 : 122 + (i - 36) * 1.6 + R() * 0.5, cx = 160 + (R() - 0.5) * 110, cy = 72 + R() * 46, cz = -170 + (R() - 0.5) * 90, col = JBX_FW_COLS[Math.floor(R() * JBX_FW_COLS.length)], big = 18 + R() * 14;
var a = age - t0;
if (a >= 0 && a < 4.6)
bursts.push({ i: i, a: a, x: cx, y: cy, z: cz, col: col, big: big });
}
F.slots.forEach(function (s, k) {
var B = bursts[k];
if (!B) {
s.P.visible = false;
s.key = null;
return;
}
if (s.key !== B.i) {
s.key = B.i;
s.P.material.color.setHex(B.col);
}
var a = B.a, open = Math.min(1, a / 0.9), rise = open * open * (3 - 2 * open), fall = Math.max(0, Math.min(1, (a - 1.2) / 3.2)), fade = 1 - fall * fall * (3 - 2 * fall);
var Rr = B.big * (1 - Math.exp(-a * 1.8)), droop = 1.1 * a * a, p = s.P.geometry.attributes.position, d = s.dirs;
for (var j = 0; j < s.n; j++) {
p.array[j * 3] = B.x + d[j * 3] * Rr;
p.array[j * 3 + 1] = B.y + d[j * 3 + 1] * Rr - droop;
p.array[j * 3 + 2] = B.z + d[j * 3 + 2] * Rr;
}
p.needsUpdate = true;
s.P.material.opacity = 0.68 * rise * fade;
s.P.visible = true;
});
},
function (Lv) {
var n = PP.lite ? 120 : 360, im = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.16, 0.1), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }), n), c = new THREE.Color(), R = ppRand(3030), bits = [];
for (var i = 0; i < n; i++) {
c.setHSL(R(), 0.65, 0.68);
im.setColorAt(i, c);
bits.push({ x: 3972 + R() * 56, z: -50 + R() * 52, y: R() * 22, v: 0.5 + R() * 0.4, ph: R() * 6, sp: 0.6 + R() * 0.8 });
}
im.visible = false;
Lv.add(ppKeep(im));
JBX.conf = { m: im, bits: bits, n: n };
},
function (dt, t) {
var C = JBX.conf;
if (!C)
return;
var show = PP.zone === "dome" && jbxOn();
C.m.visible = show;
if (!show)
return;
var m = JBX._m || (JBX._m = new THREE.Matrix4()), q = JBX._q || (JBX._q = new THREE.Quaternion()), e = JBX._e || (JBX._e = new THREE.Euler()), v = JBX._v || (JBX._v = new THREE.Vector3()), one = JBX._one || (JBX._one = new THREE.Vector3(1, 1, 1));
C.bits.forEach(function (b, i) {
b.y -= b.v * dt;
if (b.y < 0.05) {
b.y = 21 + (i % 7);
}
e.set(t * b.sp * 0.5 + b.ph, t * b.sp * 0.4, b.ph);
q.setFromEuler(e);
v.set(b.x + Math.sin(t * 0.3 + b.ph) * 0.8, b.y, b.z + Math.cos(t * 0.25 + b.ph) * 0.8);
m.compose(v, q, one);
C.m.setMatrixAt(i, m);
});
C.m.instanceMatrix.needsUpdate = true;
},
function (dt, t) {
var on = jbxOn(), c = JBX._c || (JBX._c = new THREE.Color()), pal = jbxPal();
if (JBX.beams) {
JBX.beams.g.visible = on && (PP.zone === "out" || PP.zone === "roof");
if (JBX.beams.g.visible)
JBX.beams.list.forEach(function (B, i) { B.g.rotation.z = Math.sin(t * 0.11 + B.ph) * 0.38; B.g.rotation.x = Math.sin(t * 0.08 + B.ph * 1.3) * 0.3; });
}
if (PP.zone === "dome") {
(JBX.stageBeams || []).forEach(function (B, i) {
B.m.rotation.z = Math.sin(t * 0.19 + B.ph) * 0.45;
B.m.rotation.x = 0.5 + Math.sin(t * 0.15 + B.ph) * 0.25;
var cone = B.m.userData.cone;
if (cone) {
var p0 = pal[i % pal.length], p1 = pal[(i + 1) % pal.length], f = 0.5 + 0.5 * Math.sin(t * 0.06 + i);
c.setRGB(p0[0] + (p1[0] - p0[0]) * f, p0[1] + (p1[1] - p0[1]) * f, p0[2] + (p1[2] - p0[2]) * f);
cone.material.color.copy(c);
}
});
if (JBX.orb) {
JBX.orb.rotation.y += dt * 0.12;
}
}
if (JBX.marq && (PP.zone === "out" || PP.zone === "roof")) {
JBX.marq.tex.offset.x = (JBX.marq.tex.offset.x + dt * 0.004) % 1;
}
},
function (dt, t) {
JBX.scrAt = (JBX.scrAt || 0) - dt;
if (JBX.scrAt > 0)
return;
JBX.scrAt = PP.lite ? 0.6 : 0.3;
var S = JBX.st || {}, on = jbxOn(), soon = jbxSoon(), nx = jbxShowNext(), pal = jbxPal();
JBX.scr.forEach(function (Q) {
if (Q.zone !== PP.zone)
return;
var x = Q.cv.getContext("2d"), W = Q.cv.width, H = Q.cv.height;
function waves() {
for (var i = 0; i < 10; i++) {
var p = pal[(i + Math.floor(t * 0.02)) % pal.length];
x.fillStyle = "rgb(" + ((p[0] * 90) | 0) + "," + ((p[1] * 70) | 0) + "," + ((p[2] * 110) | 0) + ")";
x.fillRect(i * W / 10, 0, W / 10 + 1, H);
}
x.globalAlpha = 0.3;
for (var k = 0; k < 5; k++) {
var q = pal[k % pal.length];
x.fillStyle = "rgb(" + ((q[0] * 230) | 0) + "," + ((q[1] * 200) | 0) + "," + ((q[2] * 230) | 0) + ")";
x.beginPath();
x.arc(W * (0.5 + 0.42 * Math.sin(t * 0.08 + k * 1.3)), H * (0.5 + 0.35 * Math.sin(t * 0.1 + k)), H * 0.18 + k * 6, 0, 7);
x.fill();
}
x.globalAlpha = 1;
}
function txt(s, y, px, col, font) { x.fillStyle = col || "#FFF0F8"; x.font = (font || "bold ") + px + "px Georgia"; x.textAlign = "center"; x.fillText(String(s).slice(0, 48), W / 2, y); }
if (Q.kind === "stage" || Q.kind === "side") {
waves();
if (on) {
txt(jbxTitle(), H * 0.38, Q.kind === "stage" ? 44 : 40);
if (S.headline)
txt(S.headline, H * 0.62, Q.kind === "stage" ? 32 : 30, "#FFD9A0", "");
if (nx && Q.kind === "side")
txt("Fireworks over the lagoon at " + jbxClock(nx), H * 0.84, 20, "#E8E0F8", "");
}
else {
txt("THE STARFALL DOME", H * 0.45, 40);
txt(soon ? jbxTitle() + " · " + jbxWhen(jbxT(S.starts_at)) : "Jubilee, the Party Planet", H * 0.68, 22, "#E8E0F8", "");
}
}
else if (Q.kind === "title") {
x.fillStyle = "#120A20";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(5, 5, W - 10, H - 10);
if (S.title && !jbxEnded()) {
txt(jbxTitle(), H * 0.34, 40, "#FFD9A0");
txt(on ? "On now, until " + (jbxT(S.ends_at) ? jbxClock(jbxT(S.ends_at)) : "late") : jbxWhen(jbxT(S.starts_at)), H * 0.58, 24, "#E8E0F8", "");
txt("Check in at the box office for your wristband", H * 0.8, 18, "#C8B8E8", "");
}
else {
txt("THE STARFALL DOME", H * 0.42, 40, "#FFD9A0");
txt("Welcome. The Arena is straight ahead.", H * 0.68, 22, "#E8E0F8", "");
}
}
else if (Q.kind === "raffle") {
x.fillStyle = "#140A20";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(5, 5, W - 10, H - 10);
txt("THE RAFFLE", H * 0.18, 34, "#FFD9A0");
if (S.winner) {
txt("Won by " + (S.winner.name || "a lucky guest"), H * 0.42, 26);
txt(S.winner.prize || "", H * 0.6, 20, "#E8E0F8", "");
}
else if (S.title) {
txt(jbxPrize() || "A prize from the Keeper", H * 0.4, 22, "#FFF0F8", "");
txt((+S.entries || 0) + " in the hat · drawn when the night ends" + (jbxT(S.ends_at) ? " (" + jbxClock(jbxT(S.ends_at)) + ")" : ""), H * 0.58, 17, "#E8E0F8", "");
}
else
txt("No raffle tonight", H * 0.45, 22, "#E8E0F8", "");
txt("PARTY PASSPORT: eight stamps, the Life of the Party medal", H * 0.84, 15, "#C8B8E8", "");
}
else if (Q.kind === "prod") {
x.fillStyle = "#0A0E14";
x.fillRect(0, 0, W, H);
x.textAlign = "left";
x.font = "16px monospace";
x.fillStyle = "#9AE8B0";
var L = [(S.title || "No night set") + (on ? "  · ON" : soon ? "  · soon" : ""), "Guests checked in: " + (+S.checkins || 0) + "   raffle: " + (+S.entries || 0),
"Passports complete: " + (+S.passports || 0) + "   lanterns: " + (+S.lanterns || 0), "Next fireworks: " + (nx ? jbxClock(nx) : "none set"), "Open bar: " + (S.open_bar ? "yes" : "no")];
L.forEach(function (s, i) { x.fillText(String(s).slice(0, 46), 14, 30 + i * 30); });
}
else if (Q.kind === "trivia") {
x.fillStyle = "#1A1030";
x.fillRect(0, 0, W, H);
txt("PARTY TRIVIA", H * 0.3, 40, "#FFD9A0");
var T = JBX.trivia;
txt(T && T.q ? ("Question " + (T.n + 1) + " of 5") : "Ask the host for a round", H * 0.62, 22, "#E8E0F8", "");
}
Q.tex.needsUpdate = true;
});
},
function () {
var S = JBX.st || {}, a = jbxT(S.starts_at), b = jbxT(S.ends_at), h = "";
if (jbxOn())
h += "<div>🎉 <b>On now</b>" + (b ? ", until " + esc(jbxClock(b)) : "") + ".</div>";
else if (a && !jbxEnded())
h += "<div>🗓️ <b>" + esc(jbxWhen(a)) + "</b> (" + esc(jbxIn_((a - jbxNow()) / 60000)) + ")" + (b ? ", until " + esc(jbxClock(b)) : "") + ".</div>";
if (S.headline)
h += "<div>🎤 Headlining the Arena: <b>" + esc(S.headline) + "</b></div>";
var L = jbxShowList().filter(function (t) { return t + JBX_SHOW_LEN > jbxNow(); }).slice(0, 4);
if (L.length)
h += "<div>🎆 Fireworks over the lagoon: <b>" + L.map(function (t) { return esc(jbxClock(t)); }).join(", ") + "</b></div>";
if (S.open_bar)
h += "<div>🥂 <b>Open bar</b>: food and drink at every bar and truck on Jubilee are on the Keeper tonight.</div>";
var pz = jbxPrize();
if (pz)
h += "<div>🎟️ The raffle: <b>" + esc(pz) + "</b>, drawn when the night ends.</div>";
if (S.announce)
h += "<div style='margin-top:4px;font-style:italic'>" + esc(S.announce) + "</div>";
return h;
},
function () {
jbxLoad(true).then(function () {
var S = JBX.st, me = jbxMe(), fns = {}, h = ppHead("The box office", S && S.title && !jbxEnded() ? esc(jbxTitle()) : "The Starfall Dome");
if (JBX.missing)
h += "<div style='opacity:.85'>" + esc(typeof notOpenYet === "function" ? notOpenYet("The box office opens soon.", "The box office needs SQL the latest server update on the server.") : "The box office opens soon.") + "</div>";
else if (!S || !S.title || jbxEnded())
h += jbxNoNight() + (S && S.winner ? "<div style='margin-top:6px'>Last night's raffle went to <b>" + esc(S.winner.name || "a guest") + "</b>.</div>" : "");
else {
h += jbxTimes();
if (!jbxIn())
h += "<div style='margin-top:6px;opacity:.8'>Sign in to check in, enter the raffle and fill a Party Passport.</div>";
else if (jbxOn()) {
if (!me.checked) {
h += worldBtn("in", "Check in for tonight", "Your wristband for the night goes into your backpack");
fns["in"] = jbxCheckin;
}
else
h += "<div style='margin-top:6px;color:#F2D08A'>✔ You are checked in: tonight's wristband is in your backpack.</div>";
if (!me.entered) {
h += worldBtn("raffle", "Enter the raffle", "Free, one entry each (the Party Passport earns a second)");
fns.raffle = jbxRaffleEnter;
}
else
h += "<div style='color:#F2D08A'>🎟️ You are in the raffle" + (+me.tickets > 1 ? " with " + me.tickets + " tickets" : "") + ".</div>";
}
else
h += "<div style='margin-top:6px;opacity:.85'>Check-in opens when the night starts.</div>";
h += worldBtn("pass", "Your Party Passport", "Eight stamps round Jubilee");
fns.pass = jbxPassportCard;
}
h += "<div id='jbx-msg' style='margin-top:6px'></div>";
worldCard(h, fns);
});
},
function () {
if (!jbxIn())
return jbxMsg("Sign in first.");
jbxMsg("…");
cityRpc("party_checkin", {}).then(function (o) { jbxMsg("<b>" + esc((o && o.say) || "Done.") + "</b>"); if (o && o.ok && typeof loadThings === "function")
loadThings(); jbxLoad(true); })
.catch(function (e) { jbxMsg(jbxMissing(e) ? "Check-in opens soon." : esc(e.message)); });
},
function () {
jbxLoad(true).then(function () {
var S = JBX.st || {}, me = jbxMe(), fns = {}, h = ppHead("The raffle", "Drawn by the house when the night ends, whoever is watching. The prize goes straight to the winner.");
if (S.winner)
h += "<div>🏆 <b>" + esc(S.winner.name || "A lucky guest") + "</b> won " + esc(S.winner.prize || "the prize") + (S.winner.at ? " at " + esc(jbxClock(jbxT(S.winner.at))) : "") + ".</div>";
else if (S.title && !jbxEnded()) {
h += "<div>The prize: <b>" + esc(jbxPrize() || "a keepsake trophy") + "</b>, and the Jubilee raffle trophy.</div><div>" + (+S.entries || 0) + " in the hat so far.</div>";
if (jbxOn() && jbxIn() && !me.entered) {
h += worldBtn("raffle", "Enter the raffle", "Free");
fns.raffle = jbxRaffleEnter;
}
else if (me.entered)
h += "<div style='color:#F2D08A'>🎟️ You are in" + (+me.tickets > 1 ? " with " + me.tickets + " tickets" : "") + ". Good luck.</div>";
}
else
h += jbxNoNight();
h += worldBtn("pass", "Your Party Passport", "Eight stamps round Jubilee");
fns.pass = jbxPassportCard;
h += "<div id='jbx-msg' style='margin-top:6px'></div>";
worldCard(h, fns);
});
},
function () {
var me = jbxMe(), got = me.stamps || [], h = ppHead("Your Party Passport", jbxOn() ? "Tonight: " + esc(jbxTitle()) + ". Collect all eight for the Life of the Party medal and a second raffle ticket." : "Stamps count while a big night is on.");
JBX_STAMPS.forEach(function (s) {
var have = got.indexOf(s[0]) >= 0;
h += "<div style='margin:4px 0;padding:5px 8px;border:1px solid rgba(201,168,104," + (have ? ".8" : ".25") + ");border-radius:4px;" + (have ? "background:rgba(201,168,104,.18)" : "opacity:.75") + "'>" + (have ? "✔ " : "○ ") + "<b>" + esc(s[1]) + "</b><div style='font-size:12px'>" + esc(s[2]) + "</div></div>";
});
h += "<div style='margin-top:4px'>" + got.length + " of " + JBX_STAMPS.length + (me.medal ? " · 🏅 the Life of the Party medal is in your backpack" : "") + "</div>";
worldCard(h);
},
function (k) {
if (!jbxIn() || !jbxOn() || JBX.stampSent[k])
return;
var me = jbxMe();
if ((me.stamps || []).indexOf(k) >= 0) {
JBX.stampSent[k] = 1;
return;
}
JBX.stampSent[k] = 1;
cityRpc("party_stamp", { p_stamp: k }).then(function (o) {
if (!o || o.ok === false) {
if (o && o.retry)
JBX.stampSent[k] = 0;
return;
}
if (JBX.st) {
JBX.st.me = JBX.st.me || {};
JBX.st.me.stamps = o.stamps || JBX.st.me.stamps;
if (o.done)
JBX.st.me.medal = true;
}
var s = JBX_STAMPS.filter(function (q) { return q[0] === k; })[0];
if (o.added)
setStatus("📘 <b>Party Passport stamp: " + esc(s ? s[1] : k) + "</b> (" + (o.stamps || []).length + " of 8)." + (o.done ? " <b>All eight!</b> The Life of the Party medal is in your backpack, and you have a second raffle ticket." : ""));
if (o.done && typeof loadThings === "function")
loadThings();
}).catch(function () { JBX.stampSent[k] = 0; });
},
function () {
var S = JBX.st || {};
worldCard(ppHead("The Arena stage", jbxOn() ? esc(jbxTitle()) : "The Starfall Dome") +
(jbxOn() && S.headline ? "<div>🎤 Tonight: <b>" + esc(S.headline) + "</b>, with the house band and the Arena DJ.</div>" : "<div>The Arena DJ and the house band play every night: the house's own music.</div>") +
(S.title && !jbxEnded() ? jbxTimes() : "") +
"<div style='margin-top:6px;opacity:.85'>The stage itself is for the performers, the crew and the Keeper (their badge opens the steps at the side). A dreamer with a stage post can play a set here; walk onto the floor and press E to dance.</div>");
},
function () {
var fns = {}, S = JBX.st || {}, T = JBX_THEMES[S.theme || "starfall"] || JBX_THEMES.starfall, h = ppHead("The front-of-house desk", "Sound and light for the Arena.");
h += "<div>The lights follow tonight's colours: <b>" + esc(T[0]) + "</b>. Every colour change is a slow fade; nothing here can flash.</div>";
[["slow", "Something slower", 100], ["mid", "Keep it steady", 118], ["fast", "Lift it a little", 128]].forEach(function (q) {
h += worldBtn(q[0], q[1], q[2] + " beats a minute");
fns[q[0]] = function () { PP.req = PP.req || {}; PP.req["jbx-dome"] = q[2]; worldCard(null); setStatus("The sound engineer nods and eases the next track in."); };
});
worldCard(h, fns);
},
function () {
jbxLoad(true).then(function () {
var now = jbxShowNow(), nx = jbxShowNext(), who = ppName("Pyrotechnician", "pyro1"), fns = {}, h = ppHead("The fireworks kiosk", "Shows over the lagoon, fired from the barge. Soft colours that open and fade slowly: nothing flashes.");
if (now !== null)
h += "<div>\"" + esc("They are going up now! Look out over the water.") + "\" says " + esc(who) + ".</div>";
else if (nx !== null)
h += "<div>\"The next show goes up at <b>" + esc(jbxClock(nx)) + "</b>, " + esc(jbxIn_((nx - jbxNow()) / 60000)) + ". The best seats are on the pier.\" says " + esc(who) + ".</div>";
else
h += "<div>\"Nothing on the schedule tonight. The Keeper sets the shows.\" says " + esc(who) + ".</div>";
var L = jbxShowList().filter(function (t) { return t > jbxNow(); }).slice(1, 6);
if (L.length)
h += "<div style='opacity:.85'>After that: " + L.map(function (t) { return esc(jbxClock(t)); }).join(", ") + ".</div>";
if (jbxKeeper()) {
h += worldBtn("fire", "Fire a show now (the Keeper)", "Everyone on Jubilee sees it, in about ten seconds");
fns.fire = function () { jbxKeeperGo("fireworks"); };
}
h += "<div id='jbx-msg' style='margin-top:6px'></div>";
worldCard(h, fns);
});
},
function () {
var S = JBX.st || {}, fns = { release: jbxLantern };
worldCard(ppHead("The lantern stall", "A paper lantern and a candle. Make a wish and let it go: it rises over the lagoon.") +
(jbxOn() ? "<div>" + (+S.lanterns || 0) + " lanterns released tonight.</div>" : "") +
worldBtn("release", "Release a lantern", "Free" + (jbxOn() ? ": a Party Passport stamp" : "")) + "<div id='jbx-msg' style='margin-top:6px'></div>", fns);
},
function () {
jbxLanternRise();
if (!jbxIn()) {
jbxMsg("Your lantern rises, slow and golden, over the water.");
return;
}
cityRpc("party_lantern", {}).then(function (o) { jbxMsg("<b>" + esc((o && o.say) || "Your lantern rises over the water.") + "</b>"); if (o && o.ok)
jbxStamp("lantern"); if (JBX.st && o && o.count)
JBX.st.lanterns = o.count; })
.catch(function (e) { jbxMsg("Your lantern rises, slow and golden, over the water."); });
},
function () {
worldCard(ppHead("The Photo Booth", "Squeeze in with your friends, pick a prop, smile. No flash: the booth's light is soft and steady. The strip goes into your backpack.") +
worldBtn("snap", "Take a picture strip", "Free, five a night") + "<div id='jbx-msg' style='margin-top:6px'></div>", { snap: jbxPhoto });
},
function () {
if (typeof togEmote === "function" && typeof TOG !== "undefined")
try {
togEmote("cheer");
}
catch (e) { }
if (!jbxIn())
return jbxMsg("Click, click, click, click. Sign in and the strip goes into your backpack.");
jbxMsg("Three… two… one…");
setTimeout(function () {
cityRpc("party_photo", {}).then(function (o) { jbxMsg("<b>" + esc((o && o.say) || "Your strip is in your backpack.") + "</b>"); if (o && o.ok) {
jbxStamp("photo");
if (typeof loadThings === "function")
loadThings();
} })
.catch(function (e) { jbxMsg(jbxMissing(e) ? "The booth's printer is warming up: it opens soon." : esc(e.message)); });
}, 1500);
},
function () {
var T = JBX.trivia;
if (!T)
return;
if (T.n >= 5) {
var ok = T.right >= 3;
worldCard(ppHead("Party Trivia", "The host reads out the scores.") + "<div>You got <b>" + T.right + " of 5</b>." + (ok ? " The room cheers." : " A good round: try again any time.") + "</div>" + worldBtn("again", "Another round", ""), { again: jbxTrivia });
if (ok)
jbxStamp("trivia");
JBX.trivia = null;
return;
}
var Q = JBX_QS[T.order[T.n]], opts = [1, 2, 3], R = ppRand(T.order[T.n] * 7 + T.n), fns = {}, h = ppHead("Party Trivia", "Question " + (T.n + 1) + " of 5 · " + T.right + " right so far");
opts.sort(function () { return R() - 0.5; });
h += "<div style='margin:6px 0'><b>" + esc(Q[0]) + "</b></div>";
opts.forEach(function (o) {
h += worldBtn("a" + o, esc(Q[o]), "");
fns["a" + o] = function () {
var good = o === 1;
if (good)
T.right++;
T.n++;
setStatus(good ? "✔ <b>Right!</b>" : "✘ The answer was <b>" + esc(Q[1]) + "</b>.");
if (typeof playTone === "function")
playTone(good ? 740 : 300, 0.2);
jbxTriviaAsk();
};
});
worldCard(h, fns);
},
function () {
jbxLoad(true).then(function () {
var S = JBX.st || {};
if (!jbxKeeper()) {
worldCard(ppHead("The production desk", "The running order is taped to the desk.") + (S.title && !jbxEnded() ? jbxTimes() : jbxNoNight()) +
"<div style='margin-top:6px;opacity:.8'>The Keeper sets the night from this desk, or from the admin page.</div>");
return;
}
function v(id) { var e = document.getElementById(id); return e ? e.value : ""; }
var themes = Object.keys(JBX_THEMES).map(function (k) { return "<option value='" + k + "'" + ((S.theme || "starfall") === k ? " selected" : "") + ">" + esc(JBX_THEMES[k][0]) + "</option>"; }).join("");
var evs = [0, 10, 15, 20, 30, 45, 60].map(function (m) { return "<option value='" + m + "'" + ((+S.fw_every || 0) === m ? " selected" : "") + ">" + (m ? "every " + m + " minutes" : "only when fired by hand") + "</option>"; }).join("");
var inp = "background:#0A0C18;border:1px solid #8FB4E8;color:#E8ECF4;padding:4px;width:100%;box-sizing:border-box";
function loc(t) { try {
if (!t)
return "";
var d = new Date(t);
return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
catch (e) {
return "";
} }
var h = ppHead("The production desk", "Run the night. Every guest on Jubilee sees what you set here; the banner in every world points the way.") +
"<label style='display:block;margin:5px 0'>Name of the night<input id='jbx-t' maxlength='60' value='" + esc(S.title || "") + "' style='" + inp + "' placeholder='The Grand Opening Blowout'></label>" +
"<label style='display:block;margin:5px 0'>Starts<input id='jbx-a' type='datetime-local' value='" + esc(loc(S.starts_at)) + "' style='" + inp + "'></label>" +
"<label style='display:block;margin:5px 0'>Ends (the raffle is drawn then)<input id='jbx-b' type='datetime-local' value='" + esc(loc(S.ends_at)) + "' style='" + inp + "'></label>" +
"<label style='display:block;margin:5px 0'>Headline act<input id='jbx-h' maxlength='60' value='" + esc(S.headline || "") + "' style='" + inp + "'></label>" +
"<label style='display:block;margin:5px 0'>Colours<select id='jbx-th' style='" + inp + "'>" + themes + "</select></label>" +
"<label style='display:block;margin:5px 0'>Fireworks<select id='jbx-fw' style='" + inp + "'>" + evs + "</select></label>" +
"<label style='display:block;margin:5px 0'><input id='jbx-ob' type='checkbox'" + (S.open_bar ? " checked" : "") + "> Open bar: food and drink free everywhere on Jubilee while the night is on (drinks with alcohol still 18 and over)</label>" +
"<label style='display:block;margin:5px 0'>Raffle prize, gold (0 for none; paid by the city)<input id='jbx-rg' type='number' min='0' max='1000000' value='" + esc(String(+S.raffle_gold || 0)) + "' style='" + inp + "'></label>" +
"<label style='display:block;margin:5px 0'>And a prize in words (optional)<input id='jbx-rn' maxlength='120' value='" + esc(S.raffle_note || "") + "' style='" + inp + "'></label>" +
"<label style='display:block;margin:5px 0'>A line for every guest<input id='jbx-an' maxlength='200' value='" + esc(S.announce || "") + "' style='" + inp + "'></label>" +
worldBtn("save", "Save the night", "") + worldBtn("start", "Start it now", "From this minute; it ends when you set, or in six hours") + worldBtn("end", "End it now", "The raffle is drawn at once") +
worldBtn("fire", "Fire a show of fireworks now", "") + worldBtn("fresh", "A new night", "A fresh guest list, raffle and passports; the settings stay") +
"<div id='jbx-msg' style='margin-top:6px'></div>";
worldCard(h, { save: function () {
var a = v("jbx-a"), b = v("jbx-b");
jbxKeeperSet({ p_title: v("jbx-t"), p_starts: a ? new Date(a).toISOString() : null, p_ends: b ? new Date(b).toISOString() : null, p_headline: v("jbx-h"), p_theme: v("jbx-th"),
p_open_bar: !!(document.getElementById("jbx-ob") || {}).checked, p_fw_every: +v("jbx-fw") || 0, p_raffle_gold: Math.max(0, Math.round(+v("jbx-rg") || 0)), p_raffle_note: v("jbx-rn"), p_announce: v("jbx-an") });
},
start: function () { jbxKeeperGo("start"); }, end: function () { jbxKeeperGo("end"); }, fire: function () { jbxKeeperGo("fireworks"); }, fresh: function () { jbxKeeperGo("new"); } });
["jbx-t", "jbx-a", "jbx-b", "jbx-h", "jbx-rg", "jbx-rn", "jbx-an"].forEach(function (id) { var e = document.getElementById(id); if (e) {
e.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
e.addEventListener("keyup", function (ev) { ev.stopPropagation(); });
} });
});
},
function () {
if (!JBX.st || !JBX.st.title)
return "";
var now = jbxShowNow(), nx = jbxShowNext();
var narrow = window.innerWidth < 640;
if (jbxOn())
return "<div style='color:#F2D08A'>✨ <b>" + esc(jbxTitle()) + "</b>" + (narrow ? "" : " is on") + (now !== null ? (narrow ? " · 🎆 now" : " · 🎆 fireworks over the lagoon now") : nx !== null ? " · 🎆 " + (narrow ? "" : "fireworks at ") + esc(jbxClock(nx)) : "") + "</div>";
if (jbxSoon())
return "<div style='color:#F2D08A'>✨ <b>" + esc(jbxTitle()) + "</b> starts " + esc(jbxIn_((jbxT(JBX.st.starts_at) - jbxNow()) / 60000)) + "</div>";
return "";
},
function () {
var e = document.getElementById("jbx-pill");
if (e)
return e;
e = document.createElement("div");
e.id = "jbx-pill";
e.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);top:58px;z-index:40;max-width:min(92vw,560px);box-sizing:border-box;padding:7px 12px;border-radius:18px;" +
"background:rgba(20,12,36,.9);border:1px solid rgba(201,168,104,.75);color:#F4ECDC;font:14px/1.35 system-ui,sans-serif;display:none;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,.4)";
document.body.appendChild(e);
return e;
}
];
});
