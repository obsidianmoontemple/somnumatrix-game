/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(299, function () {
"use strict";
return [
function (x, z) {
var r = Math.hypot(x, z), h = (wNoise(x * 0.02, z * 0.02, 81) - 0.5) * 1.4;
h *= Math.min(1, Math.max(0, (r - 40) / 30));
var A = BW_Z.arena, da = Math.hypot(x - A.x, z - A.z);
if (da < 70)
h *= Math.min(1, Math.max(0, (da - 58) / 12));
var F = BW_Z.fang, df = Math.hypot(x - F.x, z - F.z);
if (df < 110)
h += (wNoise(x * 0.05, z * 0.05, 7) - 0.5) * 3 * (1 - df / 110);
var Pz = BW_Z.pass;
if (x < Pz.x + 75 && x > Pz.x - 100) {
var w = Math.max(0, Math.abs(z) - 24);
h += Math.min(26, w * w * 0.05) * Math.min(1, (Pz.x + 75 - x) / 25);
}
var C = BW_Z.crater, dc = Math.hypot(x - C.x, z - C.z);
if (dc < 72)
h -= (1 - Math.pow(dc / 72, 2)) * 6;
else if (dc < 88)
h += (1 - Math.abs(dc - 80) / 8) * 2.2;
if (r > 400)
h += Math.pow((r - 400) / 70, 2) * 16 * (0.7 + wNoise(x * 0.01, z * 0.01, 5) * 0.6);
return h;
},
function (x, z) {
var r = Math.hypot(x, z), c = 0x5A5E3A;
if (r < 48)
c = 0x6A6040;
else if (r > 420)
c = r > 470 ? 0x6A6460 : 0x4A4A3A;
else
for (var i = 0; i < BW_ZONES.length; i++) {
var Z = BW_ZONES[i];
if (Math.hypot(x - Z.x, z - Z.z) < Z.r + 10) {
c = Z.col;
break;
}
}
if (c === 0xC8A878 && Math.hypot(x - BW_Z.arena.x, z - BW_Z.arena.z) > 52)
c = 0x7A6A50;
return c;
},
function (x, z, feet) {
var g = bwH(x, z), best = g;
for (var i = 0; i < BW.plat.length; i++) {
var p = BW.plat[i];
if (Math.hypot(x - p.x, z - p.z) < p.r && feet >= p.top - 1.3 && p.top > best)
best = p.top;
}
for (var j = 0; j < BW.bridges.length; j++) {
var b = BW.bridges[j], vx = b.b.x - b.a.x, vz = b.b.z - b.a.z, L = vx * vx + vz * vz, t = Math.max(0, Math.min(1, ((x - b.a.x) * vx + (z - b.a.z) * vz) / L));
var px = b.a.x + vx * t, pz = b.a.z + vz * t;
if (Math.hypot(x - px, z - pz) < 1.0) {
var y = b.a.y + (b.b.y - b.a.y) * t - Math.sin(t * Math.PI) * 0.6;
if (feet >= y - 1.3 && y > best)
best = y;
}
}
return best;
},
function (G) {
BW.building = true;
BW.G = G;
BW.solids = [];
BW.grid = {};
BW.batch = {};
BW.bushes = [];
BW.plat = [];
BW.bridges = [];
BW.talk = [];
BW.f = [];
BW.mach = [];
BW.flags = [];
BW.fires = [];
BW.smokers = [];
var lite = typeof LITE !== "undefined" && LITE;
var gm = bwSurfMat("ground", { vc: true });
var gr = wGround(1100, lite ? 110 : 170, function (x, z) { return [bwH(x, z), bwGroundCol(x, z)]; }, gm);
G.add(gr);
gr.receiveShadow = true;
var uv = gr.geometry.attributes.uv;
for (var u = 0; u < uv.count; u++)
uv.setXY(u, uv.getX(u) * 1100 / BW_TILE.ground, uv.getY(u) * 1100 / BW_TILE.ground);
var R = wRand(4041);
for (var i = 0; i < (lite ? 14 : 28); i++) {
var a = i / (lite ? 14 : 28) * Math.PI * 2 + R() * 0.2, d = 560 + R() * 80, h = 80 + R() * 120;
bwMountain(G, Math.cos(a) * d, Math.sin(a) * d, 70 + R() * 60, h, R, lite);
}
BW_ZONES.forEach(function (Z, k) { if (Z.k === "arena")
return; BW.smokers.push({ x: Z.x + (R() - 0.5) * 40, z: Z.z + (R() - 0.5) * 40, t: R() * 3 }); });
BW.tex = "wood";
bwCamp(G);
BW.tex = "stone";
bwSiege(G);
BW.tex = "plaster";
bwTrench(G);
BW.tex = "brick";
bwRuins(G);
BW.tex = "stone";
bwArena(G);
bwFang(G);
bwSky(G);
BW.tex = "plaster";
bwPass(G);
BW.tex = "concrete";
bwCrater(G);
BW.tex = "plaster";
BW.tex = "canvas";
bwAirships(G);
BW.tex = "wood";
bwBiplanes(G);
BW.tex = "plaster";
bwCover(G);
bwFlush(G);
bwDress(G);
BW.building = false;
bwGrass(G);
bwEmbers(G);
},
function (G) {
var R = wRand(77), lite = typeof LITE !== "undefined" && LITE;
for (var i = 0; i < 72; i++) {
var a = i / 72 * Math.PI * 2;
if (i % 18 < 2 || i % 18 > 16)
continue;
var x = Math.cos(a) * 46, z = Math.sin(a) * 46;
wCyl(0.32, 0.34, 3.6 + R() * 0.6, bwMat(0x5A4028), x, 1.8, z, G, 6);
wCone(0.34, 0.6, bwMat(0x4A3420), x, 3.9, z, G, 6);
bwSolid({ x: x, z: z, r: 0.45 });
}
var tents = [[-30, -14, 0xE0D8C0], [-30, 0, 0xD8D0B8], [-30, 14, 0xE0D8C0], [30, -14, 0xD8D0B8], [30, 14, 0xE0D8C0], [-14, 32, 0xD0C8B0], [14, 32, 0xD8D0B8]];
tents.forEach(function (t) {
var g = new THREE.Group();
g.position.set(t[0], 0, t[1]);
G.add(g);
var tn = wMesh(new THREE.CylinderGeometry(0.01, 3.2, 3.4, 4, 1), bwMat(t[2]), 0, 1.7, 0, g);
tn.rotation.y = Math.PI / 4;
bwSolid({ x: t[0], z: t[1], r: 2.4 });
});
var ar = new THREE.Group();
ar.position.set(-22, 0, -30);
G.add(ar);
bwBoxS(G, 14, 0.3, 8, 0x6A5038, -22, 0, -30, 0, false);
[-7, 7].forEach(function (s) { wCyl(0.2, 0.2, 4.5, bwMat(0x4A3420), s, 2.25, -3.8, ar, 6); wCyl(0.2, 0.2, 4.5, bwMat(0x4A3420), s, 2.25, 3.8, ar, 6); });
var roof = wBox(15, 0.3, 9, bwMat(0x8A2A2A), 0, 4.6, 0, ar);
roof.rotation.x = 0.05;
var k = 0, rack = new THREE.Group();
Object.keys(BW_ARMS).forEach(function (key) {
var A = BW_ARMS[key];
if (!HELD[A.held])
return;
var m = HELD[A.held](), row = Math.floor(k / 12), wall = Math.floor(row / 3), side = wall === 1 ? -1 : 1;
m.position.set(side * (-6 + (k % 12) * 1.05), 0.75 + (row % 3) * 1.25, wall === 0 ? -3.4 : wall === 1 ? 3.4 : 0);
m.rotation.set(0.15, wall === 1 ? Math.PI : 0, 0);
m.scale.setScalar(0.9);
rack.add(m);
k++;
});
ar.add(bwBake(rack));
[-3.4, 3.4, 0].forEach(function (z) { for (var r = 0; r < 3; r++)
wBox(13, 0.12, 0.45, bwMat(0x5A4028), 0, 0.6 + r * 1.25, z, ar); });
bwSolid({ x: -22, z: -33.6, hw: 7, hd: 0.5, h: 3 });
var sg = wSign(["The Armoury", "Weapons, armour, shields and kits for sale"], 5, 1.6, "#2A1810", "#F0D8A0");
sg.position.set(-22, 5.3, -25.4);
G.add(sg);
var qm = wPerson("bwqm", { title: "Quartermaster", look: { layer: "armor", layerColor: 0x8A6A3A, beard: true, sex: "m", hairStyle: "short" } });
qm.position.set(-22, 0, -27.5);
G.add(qm);
BW.talk.push({ x: -22, z: -27.5, r: 4, name: "The Armoury", verb: "buy weapons, armour, shields and kits", fn: bwArmoury });
bwFlag(G, -6, -24, BW_TEAMS.crimson.col, 8);
bwFlag(G, 6, -24, BW_TEAMS.azure.col, 8);
bwFlag(G, 0, -26, 0x3A3A3A, 9);
var hr = wPerson("bwherald", { title: "Herald", look: { topKind: "robe", top: 0x6A2A6A, hat: "cap", hatColor: 0x2A2A2A } });
hr.position.set(0, 0, -21);
G.add(hr);
BW.talk.push({ x: 0, z: -21, r: 4, name: "The War Herald", verb: "choose your banner and see your renown", fn: bwHerald });
var hp = new THREE.Group();
hp.position.set(22, 0, -30);
G.add(hp);
wBox(10, 3.2, 7, bwMat(0xF0EEE6), 0, 1.6, 0, hp);
var hroof = wMesh(new THREE.CylinderGeometry(0.01, 6.2, 2.4, 4, 1), bwMat(0xE8E6DE), 0, 4.4, 0, hp);
hroof.rotation.y = Math.PI / 4;
hroof.scale.set(1, 1, 0.7);
wSph(0.7, bwMat(0x3A9A4A), 0, 2.2, 3.55, hp, 10).scale.set(1, 1.4, 0.1);
bwSolid({ x: 22, z: -30, hw: 5, hd: 3.5, h: 3.2 });
var med = wPerson("bwmedic", { title: "Surgeon", look: { top: 0xF0F0F0, bottom: 0xF0F0F0 } });
med.position.set(22, 0, -25.5);
G.add(med);
BW.talk.push({ x: 22, z: -25.5, r: 4, name: "The Field Hospital", verb: "be mended", fn: function () { BW.hp = BW.max; bwSay("<b>Mended.</b> The surgeon binds you up: full vigour.", true); } });
bwBoxS(G, 22, 0.12, 14, 0x4A4A44, 0, 0, 30, 0, false);
var sg2 = wSign(["The Motor Pool", "War machines for sale, or built part by part"], 5, 1.6, "#1A1A14", "#D8D8A8");
sg2.position.set(0, 3.2, 22.5);
G.add(sg2);
BW.pool = [{ x: -6, z: 30, type: "tank" }, { x: 6, z: 30, type: "mech" }, { x: -22, z: 22, type: "spider" }, { x: 22, z: 22, type: "hover" }, { x: -31, z: 27, type: "titan" }];
BW.pool.forEach(function (p) { p.m = bwMachine(p.type, "pool", p.x, p.z, Math.PI); });
var sgt = wPerson("bwsgt", { title: "Mechanic", look: { top: 0x5A6A3A, bottom: 0x4A5A32, hat: "cap", hatColor: 0x4A5A32 } });
sgt.position.set(0, 0, 24.5);
G.add(sgt);
var gate = new THREE.Group();
gate.position.set(0, 0, 40);
G.add(gate);
[-3.2, 3.2].forEach(function (s) { wBox(1.4, 7, 1.4, bwMat(0x5A5650), s, 3.5, 0, gate); bwSolid({ x: s, z: 40, hw: 0.7, hd: 0.7, h: 7 }); });
wBox(8, 1.2, 1.6, bwMat(0x3A3A3A), 0, 7.4, 0, gate);
var veil = wMesh(new THREE.PlaneGeometry(5, 6.4), new THREE.MeshBasicMaterial({ color: 0xFFB070, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false }), 0, 3.3, 0, gate);
BW.veil = veil;
var sg3 = wSign(["The War Gate", "Home to Somnucor"], 4, 1.3, "#1A1410", "#F0D8A0");
sg3.position.set(0, 9, -0.9);
sg3.rotation.y = Math.PI;
gate.add(sg3);
BW.talk.push({ x: 0, z: 40, r: 3.4, name: "The War Gate", verb: "go home to Somnucor", fn: bwHome });
[[-12, 10], [-8, 12], [-4, 13]].forEach(function (p, i) { bwSpawn("dummy", "dummy", null, p[0], p[1]); });
bwSignpost(G, -15, 8, ["Training dummies", "Try any weapon"]);
BW_ZONES.forEach(function (Z) { var a = Math.atan2(Z.z, Z.x), x = Math.cos(a) * 40, z = Math.sin(a) * 40; bwSignpost(G, x, z, [Z.name.replace(/^The /, ""), "this way"]); });
bwFire(G, -8, 0, 4, 1);
bwFire(G, 9, 0, -6, 1);
if (!lite)
for (var c = 0; c < 6; c++) {
var cr = wBox(1, 1, 1, bwMat(0x7A5A3A), -38 + c * 1.2, 0.5, -6 + (c % 2) * 1.1, G);
}
},
function (G) {
var Z = BW_Z.siege, cx = Z.x, cz = Z.z - 40, stone = 0x8A8478, R = wRand(8);
var W = 36, H = 9;
[[0, -W, W * 2, 0], [-W, 0, 0, W * 2], [W, 0, 0, W * 2]].forEach(function (s) {
if (s[2])
bwBoxS(G, s[2], H, 2.4, stone, cx + s[0], 0, cz + s[1]);
else
bwBoxS(G, 2.4, H, s[3], stone, cx + s[0], 0, cz + s[1]);
});
bwBoxS(G, W - 5, H, 2.4, stone, cx - (W + 5) / 2, 0, cz + W);
bwBoxS(G, W - 5, H, 2.4, stone, cx + (W + 5) / 2, 0, cz + W);
for (var i = -W; i <= W; i += 3) {
[[i, -W], [i, W]].forEach(function (p) { if (Math.abs(p[0]) < 5 && p[1] > 0)
return; wBox(1.4, 1.2, 2.6, bwMat(stone), cx + p[0], H + 0.6, cz + p[1], G); });
[[-W, i], [W, i]].forEach(function (p) { wBox(2.6, 1.2, 1.4, bwMat(stone), cx + p[0], H + 0.6, cz + p[1], G); });
}
[[-W, -W], [W, -W], [-W, W], [W, W]].forEach(function (p) { wCyl(5, 5.5, 15, bwMat(0x7A7468), cx + p[0], 7.5, cz + p[1], G, 10); wCone(6, 6, bwMat(0x2A3A6A), cx + p[0], 18, cz + p[1], G, 10); bwSolid({ x: cx + p[0], z: cz + p[1], r: 5.4 }); });
wBox(12, 13, 4, bwMat(0x7A7468), cx - 8.5, 6.5, cz + W, G);
wBox(12, 13, 4, bwMat(0x7A7468), cx + 8.5, 6.5, cz + W, G);
bwSolid({ x: cx - 8.5, z: cz + W, hw: 6, hd: 2, h: 13 });
bwSolid({ x: cx + 8.5, z: cz + W, hw: 6, hd: 2, h: 13 });
wBox(10, 2, 4, bwMat(0x7A7468), cx, 12, cz + W, G);
var door = wBox(4.2, 6, 0.4, bwMat(0x4A3420), cx - 2.2, 0.5, cz + W + 2.6, G);
door.rotation.x = -1.35;
var ram = new THREE.Group();
ram.position.set(cx, 0, cz + W + 7);
G.add(ram);
wBox(4, 3.6, 7, bwMat(0x5A4028), 0, 1.8, 0, ram).material = bwMat(0x5A4028);
var log = wCyl(0.45, 0.45, 8, bwMat(0x6A4A2A), 0, 1.4, -1, ram, 8);
log.rotation.x = Math.PI / 2;
BW.ram = log;
bwSolid({ x: cx, z: cz + W + 7, hw: 2, hd: 3.5, h: 3.6 });
bwBoxS(G, 18, 16, 16, 0x8A8478, cx, 0, cz - 12);
wCone(9, 7, bwMat(0x2A3A6A), cx, 19.5, cz - 12, G, 4).rotation.y = Math.PI / 4;
bwFlag(G, cx, cz - 12, BW_TEAMS.azure.col, 26);
BW.trebs = [];
[-26, 26].forEach(function (s) {
var T = new THREE.Group();
T.position.set(cx + s, 0, cz + W + 52);
G.add(T);
wBox(5, 0.6, 7, bwMat(0x5A4028), 0, 0.3, 0, T);
[-2, 2].forEach(function (q) { var a = wBox(0.4, 7, 0.4, bwMat(0x6A4A2A), q, 3.5, 0, T); a.rotation.z = q > 0 ? -0.2 : 0.2; });
var arm = new THREE.Group();
arm.position.set(0, 6.4, 0);
T.add(arm);
wBox(0.4, 0.4, 11, bwMat(0x6A4A2A), 0, 0, 1.5, arm);
wBox(1.6, 1.6, 1.6, bwMat(0x3A3A3A), 0, -0.6, -3.6, arm);
arm.rotation.x = 0.6;
BW.trebs.push({ g: T, arm: arm, t: R() * 6, x: cx + s, z: cz + W + 52, fire: 0 });
bwSolid({ x: cx + s, z: cz + W + 52, hw: 2.6, hd: 3.6, h: 7 });
});
var tw = new THREE.Group();
tw.position.set(cx + 14, 0, cz + W + 22);
G.add(tw);
wBox(5, 14, 5, bwMat(0x5A4028), 0, 7, 0, tw);
wBox(5.4, 0.6, 5.4, bwMat(0x4A3420), 0, 14.2, 0, tw);
for (var y = 1; y < 14; y += 2.4)
wBox(5.2, 0.2, 0.3, bwMat(0x3A2A18), 0, y, 2.6, tw);
bwSolid({ x: cx + 14, z: cz + W + 22, hw: 2.6, hd: 2.6, h: 14 });
bwFlag(G, cx - 10, cz + W + 30, BW_TEAMS.crimson.col, 9);
bwFlag(G, cx + 30, cz + W + 40, BW_TEAMS.crimson.col, 9);
bwFire(G, cx - 18, 0, cz + W + 40, 1.2);
BW.talk.push({ x: cx - 26, z: cz + W + 52, r: 5, name: "A trebuchet", verb: "loose a stone at the castle", fn: function () { bwTrebFire(BW.trebs[0], true); }, zone: "siege" });
BW.talk.push({ x: cx + 26, z: cz + W + 52, r: 5, name: "A trebuchet", verb: "loose a stone at the castle", fn: function () { bwTrebFire(BW.trebs[1], true); }, zone: "siege" });
},
function (G) {
var Z = BW_Z.trench, R = wRand(31), lite = typeof LITE !== "undefined" && LITE;
var ang = Math.atan2(Z.sp.azure.z - Z.sp.crimson.z, Z.sp.azure.x - Z.sp.crimson.x), ux = Math.cos(ang), uz = Math.sin(ang), px = -uz, pz = ux;
[-26, 26].forEach(function (off) {
for (var s = -60; s <= 60; s += 4) {
if (Math.abs(s % 28) < 4)
continue;
var x = Z.x + ux * off + px * s, z = Z.z + uz * off + pz * s;
var b = wBox(4.1, 1.3, 1.6, bwMat(0x6A5A40), x, 0.65, z, G);
b.rotation.y = -ang + Math.PI / 2;
wBox(4.1, 0.5, 0.9, bwMat(0x8A7A58), x + ux * (off > 0 ? -0.6 : 0.6), 1.5, z + uz * (off > 0 ? -0.6 : 0.6), G).rotation.y = -ang + Math.PI / 2;
bwSolid({ x: x, z: z, hw: 2.05, hd: 0.8, rot: -ang + Math.PI / 2, h: 1.3 });
}
});
for (var i = 0; i < (lite ? 14 : 34); i++) {
var s2 = (R() - 0.5) * 110, o = (R() - 0.5) * 36, x = Z.x + ux * o + px * s2, z = Z.z + uz * o + pz * s2;
if (R() < 0.55) {
wCyl(0.05, 0.05, 1.3, bwMat(0x3A3028), x, 0.65, z, G, 4);
var w = wMesh(new THREE.TorusGeometry(0.5, 0.02, 4, 10), bwMat(0x5A5A5A), x, 0.8, z, G);
w.rotation.y = R() * 3;
}
else {
var c = wMesh(new THREE.TorusGeometry(2.2, 0.6, 5, 12), bwMat(0x4A3A2A), x, 0.1, z, G);
c.rotation.x = Math.PI / 2;
}
}
for (var t = 0; t < (lite ? 4 : 9); t++) {
var x2 = Z.x + (R() - 0.5) * 150, z2 = Z.z + (R() - 0.5) * 150;
wCyl(0.15, 0.3, 5 + R() * 3, bwMat(0x2A2420), x2, 2.8, z2, G, 5).rotation.z = (R() - 0.5) * 0.4;
}
if (Z.tanks) {
bwMachine("tank", "crimson", Z.sp.crimson.x - px * 20, Z.sp.crimson.z - pz * 20, 0, "trench");
bwMachine("tank", "azure", Z.sp.azure.x + px * 20, Z.sp.azure.z + pz * 20, 0, "trench");
}
},
function (G) {
var Z = BW_Z.ruins, R = wRand(55), lite = typeof LITE !== "undefined" && LITE;
wBox(180, 0.08, 10, bwMat(0x3A3A3C), Z.x, 0.04, Z.z, G);
for (var i = 0; i < (lite ? 10 : 16); i++) {
var side = i % 2 ? 1 : -1, x = Z.x - 75 + Math.floor(i / 2) * (lite ? 18 : 20) + R() * 4, z = Z.z + side * (16 + R() * 14), w = 8 + R() * 5, d = 8 + R() * 5, h = 5 + R() * 9, col = [0x7A6A5A, 0x6A6A6E, 0x8A7A6A][i % 3];
bwBoxS(G, w, h, 0.6, col, x, 0, z - d / 2);
bwBoxS(G, 0.6, h * 0.7, d, col, x - w / 2, 0, z);
bwBoxS(G, 0.6, h * (0.3 + R() * 0.5), d * 0.6, col, x + w / 2, 0, z - d * 0.2);
bwBoxS(G, w * 0.45, h * 0.4, 0.6, col, x - w * 0.25, 0, z + d / 2);
var rb = wBox(w * 0.5, 0.8, 1.6, bwMat(col), x + w * 0.2, 0.4, z + d / 2 + 1.2, G);
rb.rotation.z = 0.3;
for (var q = 0; q < 2; q++)
wBox(1, 1.3, 0.7, bwMat(0x1A1A1E), x - w / 4 + q * w / 2, h * 0.55, z - d / 2, G);
}
for (var c = 0; c < (lite ? 4 : 8); c++) {
var cx = Z.x - 70 + c * 20 + R() * 6, cz = Z.z + (R() - 0.5) * 6, g = new THREE.Group();
g.position.set(cx, 0, cz);
g.rotation.y = R() * 3;
G.add(g);
wBox(4, 1, 1.8, bwMat(0x3A3230), 0, 0.6, 0, g);
wBox(2.2, 0.7, 1.7, bwMat(0x2A2422), -0.2, 1.4, 0, g);
[-1.3, 1.3].forEach(function (a) { [-0.9, 0.9].forEach(function (b) { var w = wCyl(0.35, 0.35, 0.25, bwMat(0x1A1A1A), a, 0.35, b, g, 8); w.rotation.x = Math.PI / 2; }); });
bwSolid({ x: cx, z: cz, r: 2 });
}
for (var r = 0; r < (lite ? 10 : 24); r++)
wBox(0.6 + R() * 1.4, 0.4 + R() * 0.8, 0.6 + R() * 1.4, bwMat(0x6A6460), Z.x + (R() - 0.5) * 160, 0.3, Z.z + (R() - 0.5) * 70, G).rotation.y = R() * 3;
bwFire(G, Z.x - 20, 0, Z.z + 18, 1.4);
bwFire(G, Z.x + 35, 0, Z.z - 22, 1.1);
if (Z.mechs) {
bwMachine("mech", "crimson", Z.sp.crimson.x, Z.sp.crimson.z + 8, 0, "ruins");
bwMachine("mech", "azure", Z.sp.azure.x, Z.sp.azure.z - 8, 0, "ruins");
bwMachine("spider", "crimson", Z.sp.crimson.x - 10, Z.sp.crimson.z - 6, 0, "ruins");
bwMachine("spider", "azure", Z.sp.azure.x + 10, Z.sp.azure.z + 6, 0, "ruins");
}
},
function (G) {
var Z = BW_Z.arena, lite = typeof LITE !== "undefined" && LITE, n = lite ? 36 : 60, R = wRand(9);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, gate = (i % (n / 4)) === 0;
var x = Z.x + Math.cos(a) * 54, z = Z.z + Math.sin(a) * 54;
if (!gate) {
var w = wBox(6, 4.5, 1.4, bwMat(0xB89A78), x, 2.25, z, G);
w.rotation.y = -a + Math.PI / 2;
bwSolid({ x: x, z: z, hw: 3, hd: 0.9, rot: -a + Math.PI / 2, h: 4.5 });
}
else {
[-1, 1].forEach(function (s) { var aa = a + s * 0.06; wCyl(0.7, 0.8, 7, bwMat(0xD8C8A8), Z.x + Math.cos(aa) * 54, 3.5, Z.z + Math.sin(aa) * 54, G, 8); });
}
for (var t = 0; t < 4; t++) {
var rr = 58 + t * 3.2, s = wBox(6.6 + t * 0.4, 1, 3, bwMat(t % 2 ? 0xA8906E : 0x9A8264), Z.x + Math.cos(a) * rr, 4 + t * 1.4, Z.z + Math.sin(a) * rr, G);
s.rotation.y = -a + Math.PI / 2;
}
}
var geo = new THREE.BufferGeometry(), pos = [], col = [], c = new THREE.Color(), nn = lite ? 160 : 420;
for (var k = 0; k < nn; k++) {
var a2 = R() * Math.PI * 2, t2 = Math.floor(R() * 4), rr2 = 58 + t2 * 3.2, x2 = Z.x + Math.cos(a2) * rr2, z2 = Z.z + Math.sin(a2) * rr2, y2 = 5 + t2 * 1.4;
c.setHSL(R(), 0.45, 0.35 + R() * 0.25);
var tri = [[-0.3, 0, 0], [0.3, 0, 0], [0, 1.3, 0], [0, 0, -0.3], [0, 0, 0.3], [0, 1.3, 0]];
tri.forEach(function (v) { pos.push(x2 + v[0], y2 + v[1], z2 + v[2]); col.push(c.r, c.g, c.b); });
}
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
var crowd = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }));
G.add(crowd);
BW.crowd = crowd;
wBox(10, 1, 5, bwMat(0x8A2A2A), Z.x, 9, Z.z - 62, G);
bwFlag(G, Z.x - 4, Z.z - 62, BW_TEAMS.crimson.col, 14);
bwFlag(G, Z.x + 4, Z.z - 62, 0xC8A040, 14);
var am = wPerson("bwarenamaster", { title: "Arena master", look: { topKind: "robe", top: 0xC8A040, back: "cloak", backColor: 0x8A2A2A, sex: "m", beard: true } });
am.position.set(Z.x, 0, Z.z - 48);
G.add(am);
BW.talk.push({ x: Z.x, z: Z.z - 48, r: 4.5, name: "The Arena Master", verb: "take on the Trials of the Bowl", fn: bwTrialsCard, zone: "arena" });
},
function (G) {
var Z = BW_Z.fang, R = wRand(66), lite = typeof LITE !== "undefined" && LITE;
for (var i = 0; i < (lite ? 10 : 22); i++) {
var x = Z.x + (R() - 0.5) * 170, z = Z.z + (R() - 0.5) * 170;
if (R() < 0.4) {
var rib = new THREE.Group();
rib.position.set(x, bwH(x, z), z);
rib.rotation.y = R() * 3;
G.add(rib);
for (var b = 0; b < 5; b++) {
var t = wMesh(new THREE.TorusGeometry(2.2, 0.18, 5, 10, Math.PI), bwMat(0xD8D0B8), b * 1.1 - 2.2, 0, 0, rib);
t.rotation.y = Math.PI / 2;
}
}
else if (R() < 0.5) {
wCyl(0.3, 0.6, 6 + R() * 4, bwMat(0x1E1A18), x, bwH(x, z) + 3, z, G, 5).rotation.z = (R() - 0.5) * 0.5;
}
else {
var p = wMesh(new THREE.CircleGeometry(4 + R() * 5, 14), new THREE.MeshPhongMaterial({ color: 0x0E1012, shininess: 80 }), x, bwH(x, z) + 0.08, z, G);
p.rotation.x = -Math.PI / 2;
}
}
for (var j = 0; j < 6; j++) {
var x3 = Z.x - 40 + j * 16, z3 = Z.z - 30 + (j % 2) * 10;
wCyl(1, 1.2, 4 + R() * 5, bwMat(0x6A6460), x3, 2.5, z3, G, 8);
bwSolid({ x: x3, z: z3, r: 1.2 });
}
var crag = wCone(16, 28, bwMat(0x3A3434), Z.x + 30, 13, Z.z + 50, G, 7);
bwSolid({ x: Z.x + 30, z: Z.z + 50, r: 14 });
BW.crag = { x: Z.x + 30, y: 27, z: Z.z + 50 };
bwFire(G, Z.x - 30, bwH(Z.x - 30, Z.z + 20), Z.z + 20, 1.6);
bwFire(G, Z.x + 12, bwH(Z.x + 12, Z.z - 25), Z.z - 25, 1.2);
},
function (G) {
var Z = BW_Z.sky, R = wRand(12);
var P = [[0, 0, 7, 9], [-28, 24, 8, 13], [24, 26, 9, 11], [-34, -18, 10, 7], [30, -22, 11, 8], [0, 44, 12, 10], [-2, -42, 14, 9]];
P.forEach(function (p) {
var x = Z.x + p[0], z = Z.z + p[1], top = p[2], r = p[3];
var rock = wMesh(new THREE.ConeGeometry(r, r * 1.6, 8), bwMat(0x6A6050), x, top - r * 0.8, z, G);
rock.rotation.x = Math.PI;
var lawn = wCyl(r, r, 0.6, bwMat(0x5A7A3A), x, top - 0.3, z, G, 12);
BW.plat.push({ x: x, z: z, r: r - 0.2, top: top });
});
var link = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [3, 6], [4, 6]];
link.forEach(function (l) {
var a = BW.plat[BW.plat.length - P.length + l[0]], b = BW.plat[BW.plat.length - P.length + l[1]];
var ang = Math.atan2(b.z - a.z, b.x - a.x), A = { x: a.x + Math.cos(ang) * (a.r - 0.5), z: a.z + Math.sin(ang) * (a.r - 0.5), y: a.top }, B = { x: b.x - Math.cos(ang) * (b.r - 0.5), z: b.z - Math.sin(ang) * (b.r - 0.5), y: b.top };
BW.bridges.push({ a: A, b: B });
var L = Math.hypot(B.x - A.x, B.z - A.z), n = Math.ceil(L / 0.9);
for (var i = 0; i <= n; i++) {
var t = i / n, x = A.x + (B.x - A.x) * t, z = A.z + (B.z - A.z) * t, y = A.y + (B.y - A.y) * t - Math.sin(t * Math.PI) * 0.6;
var pl = wBox(0.5, 0.08, 1.8, bwMat(0x7A5A3A), x, y - 0.05, z, G);
pl.rotation.y = -ang;
}
});
BW.drafts = [];
[[0, -14], [14, 10], [-14, 10]].forEach(function (q, i) {
var x = Z.x + q[0] * 3.3, z = Z.z + q[1] * 3.3 + (i ? 0 : -20);
var st = wCyl(2, 2.4, 0.6, bwMat(0x8AB8C8), x, 0.3, z, G, 10);
var gl = bwGlow(0xBFE8FF, 6, 0.28);
gl.position.set(x, 2, z);
G.add(gl);
BW.drafts.push({ x: x, z: z });
BW.talk.push({ x: x, z: z, r: 3, name: "An updraft stone", verb: "ride the wind up to the rocks", fn: function () { bwUpdraft(); }, zone: "sky" });
});
},
function (G) {
var Z = BW_Z.pass, R = wRand(23), lite = typeof LITE !== "undefined" && LITE;
wBox(150, 0.06, 6, bwMat(0x8A8070), Z.x, 0.05, Z.z, G);
for (var i = 0; i < (lite ? 8 : 14); i++) {
var x = Z.x - 65 + i * 10, z = (i % 2 ? 1 : -1) * 5.5;
var L = new THREE.Group();
L.position.set(x, 0, z);
G.add(L);
wBox(0.7, 1.2, 0.7, bwMat(0x9A968E), 0, 0.6, 0, L);
wBox(0.9, 0.8, 0.9, bwMat(0xA8A49C), 0, 1.6, 0, L);
wCone(0.8, 0.6, bwMat(0x8A867E), 0, 2.3, 0, L, 4);
var gl = bwGlow(0xFFC878, 1.6, 0.45);
gl.position.y = 1.6;
L.add(gl);
bwSolid({ x: x, z: z, r: 0.5 });
}
[-40, 0, 40].forEach(function (o) {
var x = Z.x + o;
[-5, 5].forEach(function (s) { wCyl(0.35, 0.4, 6.5, bwMat(0x8A2A1E), x, 3.25, s, G, 8); bwSolid({ x: x, z: s, r: 0.45 }); });
wBox(12, 0.6, 0.8, bwMat(0x2A1A14), x, 6.7, 0, G);
wBox(11, 0.4, 0.6, bwMat(0x8A2A1E), x, 5.8, 0, G);
});
var bm = bwMat(0x6A8A3A);
for (var b = 0; b < (lite ? 40 : 110); b++) {
var x2 = Z.x + (R() - 0.5) * 160, z2 = (R() < 0.5 ? -1 : 1) * (10 + R() * 16), h = 7 + R() * 5;
wCyl(0.08, 0.1, h, bm, x2, bwH(x2, z2) + h / 2, z2, G, 5);
}
var D = new THREE.Group();
D.position.set(Z.x - 40, 0, -18);
G.add(D);
wBox(12, 0.8, 9, bwMat(0x5A4A3A), 0, 0.4, 0, D);
wBox(11, 3.4, 8, bwMat(0xE8E0CC), 0, 2.5, 0, D);
var rf = wMesh(new THREE.CylinderGeometry(0.01, 9, 3, 4, 1), bwMat(0x3A3A42), 0, 5.6, 0, D);
rf.rotation.y = Math.PI / 4;
rf.scale.set(1, 1, 0.75);
bwSolid({ x: Z.x - 40, z: -18, hw: 6, hd: 4.5, h: 5 });
for (var c = 0; c < (lite ? 3 : 7); c++) {
var x3 = Z.x - 60 + c * 20, z3 = (c % 2 ? 1 : -1) * 15;
wCyl(0.25, 0.35, 3, bwMat(0x4A3028), x3, bwH(x3, z3) + 1.5, z3, G, 6);
wSph(2.6, bwMat(0xE8B0C0), x3, bwH(x3, z3) + 4, z3, G, 8);
}
},
function (G) {
var Z = BW_Z.crater, R = wRand(44);
var S = new THREE.Group();
S.position.set(Z.x + 8, bwH(Z.x + 8, Z.z - 6) - 1, Z.z - 6);
S.rotation.set(0.12, 0.7, 0.2);
G.add(S);
var hull = wMesh(new THREE.CylinderGeometry(5, 7, 40, 10), new THREE.MeshPhongMaterial({ color: 0xC8CCD4, shininess: 40 }), 0, 4, 0, S);
hull.rotation.x = Math.PI / 2;
wCone(5, 10, bwMat(0xB8BCC4), 0, 4, -25, S, 10).rotation.x = -Math.PI / 2;
[-1, 1].forEach(function (s) { var w = wBox(18, 0.6, 8, bwMat(0x9A9EA6), s * 11, 3, 6, S); w.rotation.z = s * 0.2; });
for (var e = 0; e < 3; e++) {
var en = wCyl(1.4, 1.8, 3, bwMat(0x5A5E66), (e - 1) * 3.4, 4, 21, S, 10);
en.rotation.x = Math.PI / 2;
var gl = bwGlow(0x6AC8FF, 4, 0.3);
gl.position.set((e - 1) * 3.4, 4, 23);
S.add(gl);
}
bwSolid({ x: Z.x + 8, z: Z.z - 6, hw: 6, hd: 21, rot: -0.7, h: 10 });
var gm = new THREE.MeshPhongMaterial({ color: 0x8ADCE0, shininess: 100, transparent: true, opacity: 0.6 });
for (var i = 0; i < 16; i++) {
var a = R() * Math.PI * 2, d = 20 + R() * 55, x = Z.x + Math.cos(a) * d, z = Z.z + Math.sin(a) * d, h = 2 + R() * 5;
var sh = wMesh(new THREE.ConeGeometry(0.6 + R(), h, 4), gm, x, bwH(x, z) + h / 2, z, G);
sh.rotation.z = (R() - 0.5) * 0.6;
bwSolid({ x: x, z: z, r: 0.8 });
}
bwFire(G, Z.x + 18, bwH(Z.x + 18, Z.z + 14), Z.z + 14, 1.2);
bwMachine("titan", "crimson", Z.sp.crimson.x - 6, Z.sp.crimson.z + 10, Math.PI * 0.75, "crater");
bwMachine("titan", "azure", Z.sp.azure.x + 6, Z.sp.azure.z - 10, -Math.PI * 0.25, "crater");
bwMachine("hover", "crimson", Z.sp.crimson.x + 12, Z.sp.crimson.z - 4, Math.PI * 0.75, "crater");
bwMachine("hover", "azure", Z.sp.azure.x - 12, Z.sp.azure.z + 4, -Math.PI * 0.25, "crater");
},
function (G) {
var lite = typeof LITE !== "undefined" && LITE;
[[BW_TEAMS.crimson.col, -185, 185, 70, 0], [BW_TEAMS.azure.col, 0, 0, 85, 2.1], [0x6A5A4A, -120, -60, 110, 4.2]].slice(0, lite ? 2 : 3).forEach(function (q, i) {
var g = new THREE.Group();
G.add(g);
var env = wSph(1, new THREE.MeshLambertMaterial({ color: 0xC8BCA8 }), 0, 0, 0, g, 14);
env.scale.set(7, 7, 22);
for (var r = -1; r <= 1; r++) {
var band = wMesh(new THREE.TorusGeometry(7.05, 0.12, 4, 24), bwMat(q[0]), 0, 0, r * 9, g);
}
var gond = wBox(4, 2.4, 12, bwMat(0x5A4028), 0, -9, 0, g);
[-3, 3].forEach(function (s) { wCyl(0.05, 0.05, 3, bwMat(0x3A3A3A), s * 0.6, -7.2, s * 4, g, 4); });
var prop = new THREE.Group();
prop.position.set(0, -9, -6.4);
g.add(prop);
wBox(5, 0.3, 0.1, bwMat(0x2A2A2A), 0, 0, 0, prop);
[-6, 6].forEach(function (s) { wBox(0.3, 4, 5, bwMat(q[0]), s * 0.1, 3, 20, g).rotation.y = 0; });
BW.ships.push({ g: g, cx: q[1], cz: q[2], R: q[3], a: q[4], y: 58 + i * 9, prop: prop });
});
},
function (G) {
var Z = BW_Z.trench;
[BW_TEAMS.crimson.col, BW_TEAMS.azure.col].forEach(function (col, i) {
var g = new THREE.Group();
G.add(g);
wBox(0.9, 0.9, 6, bwMat(col), 0, 0, 0, g);
wBox(9, 0.12, 1.4, bwMat(0xD8D0B8), 0, 0.6, 0, g);
wBox(9, 0.12, 1.4, bwMat(0xD8D0B8), 0, -0.5, 0, g);
wBox(3, 0.1, 1, bwMat(col), 0, 0.2, 2.8, g);
wBox(0.1, 1.2, 1, bwMat(col), 0, 0.7, 2.8, g);
var pr = new THREE.Group();
pr.position.set(0, 0, -3.1);
g.add(pr);
wBox(2.4, 0.18, 0.06, bwMat(0x2A2A2A), 0, 0, 0, pr);
BW.planes.push({ g: g, cx: Z.x, cz: Z.z, R: 70 + i * 20, a: i * Math.PI, y: 38 + i * 8, prop: pr, dir: i ? 1 : -1 });
});
},
function (grp) {
grp.updateMatrixWorld(true);
var parts = { s: [], g: [] };
grp.traverse(function (o) {
if (!o.isMesh || !o.material || !o.material.color)
return;
var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
geo.applyMatrix4(o.matrixWorld);
parts[o.material.isMeshBasicMaterial ? "g" : "s"].push({ g: geo, c: o.material.color.getHex() });
});
var out = new THREE.Group();
["s", "g"].forEach(function (w) {
var L = parts[w];
if (!L.length)
return;
var n = 0;
L.forEach(function (e) { n += e.g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3), o = 0, c = new THREE.Color();
L.forEach(function (e) {
var P = e.g.attributes.position, N = e.g.attributes.normal;
c.setHex(e.c);
for (var i = 0; i < P.count; i++) {
pos[o * 3] = P.getX(i);
pos[o * 3 + 1] = P.getY(i);
pos[o * 3 + 2] = P.getZ(i);
nor[o * 3] = N ? N.getX(i) : 0;
nor[o * 3 + 1] = N ? N.getY(i) : 1;
nor[o * 3 + 2] = N ? N.getZ(i) : 0;
col[o * 3] = c.r;
col[o * 3 + 1] = c.g;
col[o * 3 + 2] = c.b;
o++;
}
e.g.dispose();
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
out.add(new THREE.Mesh(g, w === "s" ? new THREE.MeshLambertMaterial({ vertexColors: true }) : new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false })));
});
return out;
},
function (type, team, x, z, rot, zone) {
var g = new THREE.Group(), T = BW_TEAMS[team] || { col: 0x5A6A3A, dark: 0x3A4A2A };
var body = team === "pool" ? 0x5A6A4A : T.col;
var MT = BW_MACH[type] || BW_MACH.mech;
var M = { type: type, T: MT, team: team, zone: zone || null, g: g, x: x, z: z, yaw: rot || 0, tur: rot || 0, hp: MT.hp, max: MT.hp, cool: 2 + Math.random() * 2,
home: { x: x, z: z, rot: rot || 0 }, alive: true, deadT: 0, step: 0, pool: team === "pool" };
if (type === "tank") {
wBox(3.4, 1.1, 6, bwMat(0x4A5038), 0, 0.9, 0, g);
wBox(3.6, 0.4, 6.2, bwMat(body), 0, 1.55, 0, g);
[-1.85, 1.85].forEach(function (s) { wBox(0.7, 1.1, 6.4, bwMat(0x2A2A26), s, 0.6, 0, g); for (var w = -2.4; w <= 2.4; w += 1.2) {
var wh = wCyl(0.42, 0.42, 0.75, bwMat(0x3A3A36), s, 0.5, w, g, 8);
wh.rotation.z = Math.PI / 2;
} });
var tur = new THREE.Group();
tur.position.y = 1.75;
g.add(tur);
wCyl(1.3, 1.5, 0.9, bwMat(body), 0, 0.45, 0, tur, 10);
var gun = wCyl(0.14, 0.16, 4, bwMat(0x3A3A36), 0, 0.5, -2.4, tur, 8);
gun.rotation.x = Math.PI / 2;
M.turret = tur;
M.muzzle = new THREE.Vector3(0, 0.5, -4.4);
M.seat = 2.6;
M.r = 2.6;
}
else if (type === "mech") {
var hip = new THREE.Group();
hip.position.y = 4.2;
g.add(hip);
M.hip = hip;
var cab = wBox(2.6, 1.8, 2.6, bwMat(body), 0, 0.9, 0, hip);
wBox(1.8, 0.5, 0.1, new THREE.MeshPhongMaterial({ color: 0x6AC8E8, shininess: 90 }), 0, 1.2, -1.32, hip);
[-1.6, 1.6].forEach(function (s) { var a = wBox(0.6, 0.6, 2.4, bwMat(0x3A3A40), s, 0.6, -0.6, hip); var b = wCyl(0.12, 0.12, 1.2, bwMat(0x2A2A2E), s, 0.6, -2.2, hip, 6); b.rotation.x = Math.PI / 2; });
M.legs = [];
[-0.9, 0.9].forEach(function (s) {
var L = new THREE.Group();
L.position.set(s, 4.2, 0);
g.add(L);
wBox(0.5, 2.2, 0.5, bwMat(0x4A4A50), 0, -1.1, 0, L);
var sh = new THREE.Group();
sh.position.y = -2.2;
L.add(sh);
wBox(0.45, 2.0, 0.45, bwMat(0x3A3A40), 0, -1, 0.2, sh);
wBox(0.9, 0.25, 1.4, bwMat(0x2A2A2E), 0, -2.0, 0.2, sh);
M.legs.push({ L: L, sh: sh, s: s });
});
M.turret = hip;
M.muzzle = new THREE.Vector3(1.6, 0.6, -2.8);
M.seat = 4.9;
M.r = 1.8;
}
else
bwMachBuild(M, g, body, T);
if (MT) {
M.seat = MT.seat;
M.r = MT.r;
}
g.position.set(x, bwSupport(x, z, 0), z);
g.rotation.y = M.yaw;
BW.G.add(g);
BW.mach.push(M);
return M;
},
function (M, g, body, T) {
var dark = 0x34363C, steel = 0x8A8E96, glass = new THREE.MeshPhongMaterial({ color: 0x6AC8E8, shininess: 90 }), eye = wB(T.col === BW_TEAMS.azure.col ? 0x6AC8FF : 0xFFB070, { fog: false });
if (M.type === "titan") {
var hip = new THREE.Group();
hip.position.y = 6.4;
g.add(hip);
M.hip = hip;
wBox(3.4, 1.4, 2.4, bwMat(dark), 0, 0, 0, hip);
var torso = new THREE.Group();
torso.position.y = 0.8;
hip.add(torso);
M.torso = torso;
wBox(5.2, 3.4, 3.4, bwMat(body), 0, 2.1, 0, torso);
wBox(4.2, 1.2, 3.0, bwMat(steel), 0, 0.5, -0.3, torso);
wBox(2.2, 1.0, 0.3, bwMat(dark), 0, 2.8, -1.75, torso);
wBox(5.6, 0.7, 3.6, bwMat(steel), 0, 3.95, 0, torso);
M.cab = [wBox(1.8, 1.3, 1.8, bwMat(body), 0, 4.9, 0, torso), wBox(1.4, 0.35, 0.08, glass, 0, 5.0, -0.92, torso), wBox(0.6, 0.12, 0.06, eye, 0, 4.6, -0.92, torso)];
[-1, 1].forEach(function (s) {
wBox(1.9, 1.0, 2.6, bwMat(body), s * 3.4, 3.8, 0, torso);
wBox(0.3, 1.6, 0.3, bwMat(steel), s * 3.4, 4.9, 0.9, torso);
var arm = new THREE.Group();
arm.position.set(s * 3.5, 3.1, 0);
torso.add(arm);
wBox(1.2, 2.6, 1.2, bwMat(dark), 0, -1.3, 0, arm);
wBox(1.4, 1.4, 3.6, bwMat(body), 0, -2.9, -0.9, arm);
var bar = wCyl(0.22, 0.26, 3.2, bwMat(0x2A2A2E), 0, -2.9, -3.9, arm, 8);
bar.rotation.x = Math.PI / 2;
wBox(0.12, 0.12, 2.8, eye, s * -0.45, -2.9, -2.3, arm);
if (s > 0) {
var pod = wBox(1.4, 1.2, 1.6, bwMat(dark), 0, 1.6 + 2.2, 1.0, torso);
pod.position.x = s * 2.0;
for (var i = 0; i < 6; i++)
wCyl(0.14, 0.14, 0.1, bwMat(0x5A2A1A), s * 2.0 + (i % 3 - 1) * 0.4, 3.8 + (i < 3 ? 0.25 : -0.25), 0.18, torso, 6).rotation.x = Math.PI / 2;
}
});
M.legs = [];
[-1.3, 1.3].forEach(function (s) {
var L = new THREE.Group();
L.position.set(s, 6.2, 0);
g.add(L);
wBox(1.3, 3.2, 1.5, bwMat(body), 0, -1.6, 0, L);
var sh = new THREE.Group();
sh.position.y = -3.2;
L.add(sh);
wBox(1.1, 3.0, 1.2, bwMat(dark), 0, -1.5, 0.2, sh);
wBox(1.9, 0.5, 3.0, bwMat(steel), 0, -2.9, 0, sh);
M.legs.push({ L: L, sh: sh, s: s });
});
M.turret = hip;
M.muzzle = new THREE.Vector3(3.5, 0.8 + 3.1 - 2.9, -5.6);
M.hipY = 6.4;
}
else if (M.type === "spider") {
var hub = new THREE.Group();
hub.position.y = 2.6;
g.add(hub);
M.hip = hub;
var b = wSph(1.5, bwMat(body), 0, 0, 0, hub, 12);
b.scale.set(1.1, 0.6, 1.3);
wBox(1.6, 0.7, 1.6, bwMat(dark), 0, 0.6, 0.2, hub);
wBox(1.0, 0.25, 0.06, glass, 0, 0.75, -0.62, hub);
wSph(0.18, eye, -0.5, 0.1, -1.85, hub, 8);
wSph(0.18, eye, 0.5, 0.1, -1.85, hub, 8);
var gun = wCyl(0.12, 0.14, 2, bwMat(0x2A2A2E), 0, -0.3, -2.2, hub, 8);
gun.rotation.x = Math.PI / 2;
M.legs = [];
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q, i) {
var L = new THREE.Group();
L.position.set(q[0] * 1.1, 2.6, q[1] * 1.0);
L.rotation.y = Math.atan2(q[0], q[1]);
g.add(L);
var up = wBox(0.3, 0.3, 2.4, bwMat(dark), 0, 0.5, 1.1, L);
up.rotation.x = -0.5;
var sh = new THREE.Group();
sh.position.set(0, 1.1, 2.2);
L.add(sh);
var lo = wBox(0.25, 3.6, 0.25, bwMat(steel), 0, -1.8, 0.4, sh);
lo.rotation.x = 0.2;
M.legs.push({ L: L, sh: sh, s: i, spider: 1 });
});
M.turret = hub;
M.muzzle = new THREE.Vector3(0, -0.3, -3.3);
M.hipY = 2.6;
}
else {
var hull = new THREE.Group();
hull.position.y = 1.2;
g.add(hull);
M.hip = hull;
var h = wBox(3.6, 1.0, 6.0, bwMat(body), 0, 0.3, 0, hull);
wBox(3.0, 0.5, 4.6, bwMat(dark), 0, -0.4, 0, hull);
[-1, 1].forEach(function (s) {
var f = wCyl(0.9, 1.0, 0.5, bwMat(steel), s * 1.9, -0.3, 1.9, hull, 12);
var f2 = wCyl(0.9, 1.0, 0.5, bwMat(steel), s * 1.9, -0.3, -1.9, hull, 12);
var gl = bwGlow(0x8AC8FF, 2.2, 0.18);
gl.position.set(s * 1.9, -0.7, 0);
hull.add(gl);
});
var tur = new THREE.Group();
tur.position.y = 0.9;
hull.add(tur);
wBox(2.0, 0.7, 2.4, bwMat(body), 0, 0.3, 0, tur);
wBox(1.4, 0.25, 0.06, glass, 0, 0.45, -1.22, tur);
[-0.6, 0.6].forEach(function (s) { var r = wBox(0.5, 0.5, 1.6, bwMat(dark), s, 0.3, -1.4, tur); });
M.turret = tur;
M.muzzle = new THREE.Vector3(0.6, 0.3, -2.3);
M.hipY = 1.2;
M.hover = 1;
}
},
function (M, dmg, byMe) {
if (!M.alive)
return;
M.hp -= dmg;
bwBar(M.g, M.hp, M.max, M.T.bar, M.T.big ? 3 : 2);
if (byMe && !M.pool)
M.angryAt = BW.t;
if (M.hp <= 0) {
M.alive = false;
M.deadT = 0;
bwBoom(M.g.position.x, M.g.position.y + 1.5, M.g.position.z, 5, true);
M.g.traverse(function (o) { if (o.isMesh && o.material && o.material.color && !o.userData.bwBar && !o.isSprite) {
if (!o.userData.bwMat0)
o.userData.bwMat0 = o.material;
o.material = bwMat(0x2A2624);
} });
if (BW.ride === M) {
bwDismount(true);
bwHurtMe(15, null, true);
bwSay("<b>Your " + M.T.name + " is knocked out!</b> You scramble clear.", true);
}
else if (byMe) {
var rn = M.T.big ? 120 : 40;
bwRenown(rn);
bwData().kills++;
bwSpoil(M.T.spoil[0], M.T.spoil[1], "Ironfray");
bwSay("<b>" + (M.T.big ? "War frame brought down!" : "Machine destroyed!") + "</b> +" + rn + " renown. A spoil goes in your backpack.", true);
}
}
},
function (M, dt) {
var g = M.g;
if (!M.alive) {
M.deadT += dt;
if (M.deadT < 8 && Math.floor(M.deadT * 2) !== Math.floor((M.deadT - dt) * 2))
bwSmoke(g.position.x, g.position.y + 2, g.position.z, 3);
if (M.deadT > (M.pool ? 12 : 30)) {
M.alive = true;
M.hp = M.max;
M.x = M.home.x;
M.z = M.home.z;
M.yaw = M.home.rot;
M.tur = M.yaw;
g.traverse(function (o) { if (o.isMesh && o.userData.bwMat0) {
o.material = o.userData.bwMat0;
o.userData.bwMat0 = null;
} });
bwBar(g, 1, 1, 0, 0);
g.position.set(M.x, bwSupport(M.x, M.z, 0), M.z);
}
return;
}
M.cool -= dt;
if (BW.ride === M) {
var L = worldLocal(), mv = Math.hypot(L.x - M.x, L.z - M.z);
if (mv > 0.01) {
var want = Math.atan2(-(L.x - M.x), -(L.z - M.z));
if (M.T.steer)
M.yaw = bwTurn(M.yaw, want, dt * 2.4);
M.step += mv;
}
if (!M.T.steer)
M.yaw = bwTurn(M.yaw, yaw, dt * 3);
M.x = L.x;
M.z = L.z;
M.tur = yaw;
}
else if (!M.pool) {
var Z = BW_Z[M.zone];
if (!Z || !Z.active)
return;
if (!M.tgtAt || BW.t - M.tgtAt > 1) {
M.tgtAt = BW.t;
M.tgt = bwPickTarget(M.team, M.x, M.z, 70, M.zone);
}
var t = M.tgt && bwTgtPos(M.tgt);
if (t) {
var dx = t.x - M.x, dz = t.z - M.z, d = Math.hypot(dx, dz), aim = Math.atan2(-dx, -dz);
M.tur = bwTurn(M.tur, aim, dt * 0.9);
if (d > 34) {
M.yaw = bwTurn(M.yaw, aim, dt * 0.6);
var sp = M.T.spd * dt, nx = M.x - Math.sin(M.yaw) * sp, nz = M.z - Math.cos(M.yaw) * sp;
if (!bwSolidAt(nx, nz, 0.5) && Math.hypot(nx - Z.x, nz - Z.z) < Z.r) {
M.x = nx;
M.z = nz;
M.step += sp;
}
}
if (M.cool <= 0 && Math.abs(bwAngDiff(M.tur, aim)) < 0.2) {
M.cool = M.T.aiCool;
bwMachFire(M, t, false);
}
}
else {
M.tur = bwTurn(M.tur, M.yaw, dt * 0.5);
}
}
M.bob = (M.bob || 0) + dt;
g.position.set(M.x, bwSupport(M.x, M.z, g.position.y) + (M.hover ? 0.9 + Math.sin(M.bob * 1.6) * 0.15 : 0), M.z);
g.rotation.y = M.yaw;
if (M.type === "tank" || M.hover)
M.turret.rotation.y = M.tur - M.yaw;
else if (M.type === "spider") {
M.hip.rotation.y = M.tur - M.yaw;
var ps = M.step * 1.8;
M.legs.forEach(function (l) { var s = Math.sin(ps + l.s * Math.PI / 2 * (l.s % 2 ? 3 : 1)); l.L.rotation.x = s * 0.18; l.sh.rotation.x = Math.max(0, s) * 0.3; });
M.hip.position.y = 2.6 + Math.abs(Math.sin(ps * 2)) * 0.08;
}
else if (M.type === "titan") {
M.hip.rotation.y = M.tur - M.yaw;
var pt = M.step * 0.55;
M.legs.forEach(function (l, i) { var s = Math.sin(pt + (i ? Math.PI : 0)); l.L.rotation.x = s * 0.3; l.sh.rotation.x = Math.max(0, -s) * 0.45; });
M.hip.position.y = 6.4 + Math.abs(Math.sin(pt)) * 0.25;
}
else {
M.hip.rotation.y = M.tur - M.yaw;
var ph = M.step * 1.1;
M.legs.forEach(function (l, i) { var s = Math.sin(ph + (i ? Math.PI : 0)); l.L.rotation.x = s * 0.35; l.sh.rotation.x = Math.max(0, -s) * 0.5; });
M.hip.position.y = 4.2 + Math.abs(Math.sin(ph)) * 0.12;
}
},
function (M, t, mine) {
var g = M.g;
g.updateMatrixWorld(true);
var from = M.muzzle.clone();
if (M.type !== "tank" && from.x) {
M.side = -(M.side || 1);
from.x *= M.side;
}
M.turret.localToWorld(from);
var dir;
if (mine) {
dir = bwAimAssist(bwAim(), from, M.type === "tank" ? 0.08 : 0.07, M.type === "titan" ? 160 : 120, M);
}
else {
var ty = t.y !== undefined ? t.y : bwSupport(t.x, t.z, 0) + 1;
dir = new THREE.Vector3(t.x + BW.base - from.x, ty - from.y, t.z - from.z).normalize();
}
var A = M.type === "tank" ? BW_NPCARMS.shell : M.type === "titan" ? BW_NPCARMS.titanrail : M.type === "spider" ? BW_NPCARMS.spiderlaser : M.type === "hover" ? BW_NPCARMS.rocket : BW_NPCARMS.mechgun;
if (M.type === "titan") {
M.shots = (M.shots || 0) + 1;
if (M.shots % 3 === 0) {
var pod = new THREE.Vector3(2.0, 3.8, 0.2);
M.torso.localToWorld(pod);
for (var i = 0; i < 6; i++) {
var d2 = dir.clone();
d2.x += (Math.random() - 0.5) * 0.12;
d2.y += 0.06 + Math.random() * 0.06;
d2.z += (Math.random() - 0.5) * 0.12;
d2.normalize();
bwShoot({ from: pod.clone(), dir: d2, arm: BW_NPCARMS.rocket, dmg: BW_NPCARMS.rocket.dmg * (mine ? 1.2 : 1), team: mine ? bwMyTeam() : M.team, owner: mine ? "me" : M, mach: M });
}
}
}
if (M.type === "tank") {
var flat = Math.hypot(dir.x, dir.z), d = t ? Math.hypot(t.x + BW.base - from.x, t.z - from.z) : 40;
dir.y += Math.min(0.25, d * 0.0028);
dir.normalize();
}
bwShoot({ from: from, dir: dir, arm: A, dmg: A.dmg * (mine ? 1.2 : 1), team: mine ? bwMyTeam() : M.team, owner: mine ? "me" : M, mach: M });
bwSmoke(from.x - BW.base, from.y, from.z, M.type === "tank" || M.type === "titan" ? 1.6 : 0.6);
if (typeof playTone === "function" && mine)
playTone(M.type === "tank" ? 90 : M.type === "titan" ? 70 : 300, 0.18);
},
function (M) {
if (BW.ride || !M.alive)
return;
BW.ride = M;
M.driver = "me";
var B = BW.base;
camera.position.x = B + M.x;
camera.position.z = M.z;
yaw = M.yaw;
WLD.hop = M.seat - 0.3;
BW.vmHide = true;
bwVmSet();
(M.cab || []).forEach(function (o) { o.visible = false; });
bwSay("<b>You climb into the " + M.T.name + ".</b> Walk to drive it; " + (bwTouch() ? "the <b>Fire</b> button" : "<b>F</b>, <b>E</b> or a click") + " fires; " + (bwTouch() ? "<b>Get out</b>" : "<b>G</b>") + " climbs out.", true);
},
function (quiet) {
var M = BW.ride;
if (!M)
return;
BW.ride = null;
M.driver = null;
WLD.hop = 0;
BW.vmHide = false;
bwVmSet();
(M.cab || []).forEach(function (o) { o.visible = true; });
var B = BW.base, ox = Math.cos(M.yaw) * (M.r + 1.8), oz = -Math.sin(M.yaw) * (M.r + 1.8);
if (!bwSolidAt(M.x + ox, M.z + oz, 0.5)) {
camera.position.x = B + M.x + ox;
camera.position.z = M.z + oz;
}
if (!quiet)
bwSay("You climb out.");
},
function (dt) {
var Z = BW_Z.siege;
(BW.trebs || []).forEach(function (T) {
T.t += dt;
if (T.fire > 0) {
T.fire -= dt;
var u = 1 - T.fire / 3.2;
T.arm.rotation.x = u < 0.25 ? 0.6 - u / 0.25 * 2.4 : u < 0.4 ? -1.8 : -1.8 + (u - 0.4) / 0.6 * 2.4;
if (u >= 0.25 && !T.shot) {
T.shot = true;
var from = new THREE.Vector3(0, 0, -5.5);
T.arm.localToWorld(from);
var tx = Z.x + (Math.random() - 0.5) * 40, tz = Z.z - 40 + (Math.random() - 0.5) * 30, d = Math.hypot(tx + BW.base - from.x, tz - from.z), v = BW_NPCARMS.boulder.spd;
var dir = new THREE.Vector3(tx + BW.base - from.x, 0, tz - from.z).normalize();
var up = Math.min(1.2, 9.8 * d / (v * v) / 1.0);
dir.y = Math.sin(Math.asin(Math.min(1, up)) / 2) * 1.4;
dir.normalize();
bwShoot({ from: from, dir: dir, arm: BW_NPCARMS.boulder, dmg: 60, team: T.mine ? bwMyTeam() : "crimson", owner: T.mine ? "me" : "treb" });
}
if (T.fire <= 0) {
T.shot = false;
T.arm.rotation.x = 0.6;
}
}
else if (Z.active && T.t > 11) {
T.t = Math.random() * 3;
bwTrebFire(T, false);
}
});
if (BW.ram) {
BW.ram.position.z = -1 + Math.max(0, Math.sin(BW.t * 1.3)) * 1.2;
}
},
function (K, team, seed) {
var T = BW_TEAMS[team] || BW_TEAMS.wild, L = { layer: null, back: null, gear: null, apron: null };
var own = K.look ? K.look(T) : { top: 0x4A3A2A, bottom: 0x3A2E22, layer: "armor", layerColor: K.species === "skeleton" ? 0x6A665E : 0x5A4632, shoes: 0x2A2018 };
Object.keys(own).forEach(function (k) { L[k] = own[k]; });
if (K.species)
L.species = K.species;
L.hdDye = 1;
return L;
},
function (K, team, seed) {
var g;
if (K.body === "person") {
g = wPerson("bw" + seed, { look: bwLook(K, team, seed), scale: K.scale || null });
}
else if (K.body === "folk" || K.body === "beast" || K.body === "crawl") {
try {
g = buildCreature({ id: "bwc_" + seed, archetype: K.arch, attrs: {}, solid: false, detail: 3, nights: [], city: true }, 1);
}
catch (e) {
g = null;
}
if (!g)
g = wPerson("bw" + seed, { species: "orc" });
if (K.scale)
g.scale.multiplyScalar(K.scale);
}
else if (K.body === "drone")
g = bwDroneMesh(team);
else if (K.body === "robot")
g = bwRobotMesh(K, team);
else if (K.body === "dragon")
g = bwDragonMesh();
else
g = bwDummyMesh();
var A = BW_ARMS[K.arm];
if (A && A.held && HELD[A.held] && g.children[0] && K.body === "person") {
var m = HELD[A.held]();
m.position.set(-0.3, 0.98, 0.3);
m.userData.relicWeapon = 1;
g.children[0].add(m);
g.userData.heldMesh = m;
}
return g;
},
function (team) {
var g = new THREE.Group(), T = BW_TEAMS[team] || BW_TEAMS.wild, b = new THREE.Group();
g.add(b);
wSph(0.55, bwMat(0x8A8E96), 0, 0, 0, b, 12);
wSph(0.18, wB(T.col === BW_TEAMS.azure.col ? 0x6AC8FF : 0xFF8A6A, { fog: false }), 0, 0, -0.5, b, 8);
for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2 + Math.PI / 4, r = wBox(0.08, 0.08, 0.9, bwMat(0x4A4A50), Math.cos(a) * 0.6, 0.1, Math.sin(a) * 0.6, b);
r.rotation.y = -a;
var p = wCyl(0.35, 0.35, 0.03, bwMat(0x2A2A2E), Math.cos(a) * 0.95, 0.2, Math.sin(a) * 0.95, b, 10);
}
return g;
},
function (K, team) {
var g = new THREE.Group(), T = BW_TEAMS[team] || BW_TEAMS.wild, b = new THREE.Group();
g.add(b);
var shell = bwMat(K.slim ? 0xD8DCE4 : 0x6A6E76), dark = bwMat(0x2A2C32), trim = bwMat(T.col), eye = wB(T.col === BW_TEAMS.azure.col ? 0x6AC8FF : 0xFF9A6A, { fog: false });
var w = K.slim ? 0.8 : 1;
wBox(0.75 * w, 0.8, 0.45, shell, 0, 1.45, 0, b);
wBox(0.8 * w, 0.18, 0.5, trim, 0, 1.12, 0, b);
wBox(0.5 * w, 0.3, 0.36, dark, 0, 0.98, 0, b);
wBox(0.42, 0.36, 0.4, shell, 0, 2.08, 0, b);
wBox(0.34, 0.08, 0.05, eye, 0, 2.1, 0.21, b);
wBox(0.05, 0.18, 0.05, dark, 0.14, 2.32, 0, b);
var legs = [];
[-1, 1].forEach(function (s) {
var L = new THREE.Group();
L.position.set(s * 0.2 * w, 0.9, 0);
b.add(L);
wBox(0.2, 0.48, 0.24, dark, 0, -0.24, 0, L);
var sh = new THREE.Group();
sh.position.y = -0.48;
L.add(sh);
wBox(0.18, 0.42, 0.22, shell, 0, -0.21, 0, sh);
wBox(0.24, 0.08, 0.36, dark, 0, -0.44, 0.05, sh);
legs.push({ L: L, sh: sh });
var A = new THREE.Group();
A.position.set(s * 0.48 * w, 1.75, 0);
b.add(A);
wBox(0.18, 0.5, 0.2, dark, 0, -0.25, 0, A);
if (s > 0) {
wBox(0.22, 0.22, 0.6, shell, 0, -0.55, 0.2, A);
var gun = wCyl(0.05, 0.06, 0.5, dark, 0, -0.55, 0.6, A, 6);
gun.rotation.x = Math.PI / 2;
}
else {
wBox(0.16, 0.4, 0.18, shell, 0, -0.7, 0, A);
var Ar = BW_ARMS[K.arm];
if (Ar && Ar.kind === "melee" && HELD[Ar.held]) {
var m = HELD[Ar.held]();
m.position.set(0, -0.9, 0.1);
m.rotation.x = Math.PI / 2;
A.add(m);
}
}
});
g.userData.legs = legs;
if (K.scale)
g.scale.multiplyScalar(K.scale);
return g;
},
function () {
var g = new THREE.Group(), b = new THREE.Group();
g.add(b);
var kit = null;
try {
kit = buildCreature({ id: "bw_dragon", archetype: "dragon", attrs: {}, solid: false, detail: 3, nights: [], city: true }, 1);
}
catch (e) { }
if (kit) {
kit.scale.multiplyScalar(2.2);
b.add(kit);
}
else {
wSph(2, bwMat(0x6A2A1A), 0, 0, 0, b, 10).scale.set(1, 1, 2.5);
}
if (typeof hdfFile === "function" && typeof hdfUtils === "function" && !(typeof hdfOn === "function" && !hdfOn()))
try {
hdfUtils(function (U) {
hdfFile("creatures/dragon-evolved.glb", function (F) {
var m = U.clone(F.scene);
var bb = new THREE.Box3().setFromObject(m), h = bb.max.y - bb.min.y || 1, k = 9 / h;
m.scale.setScalar(k);
m.position.y = -(bb.min.y + bb.max.y) / 2 * k;
m.rotation.y = Math.PI;
m.traverse(function (o) { if (o.isMesh) {
o.frustumCulled = false;
if (o.material) {
var mt = o.material.clone();
mt.skinning = !!o.isSkinnedMesh;
if (mt.color)
mt.color.multiply(new THREE.Color(0xE87A4A));
o.material = mt;
}
} });
if (kit)
kit.visible = false;
b.add(m);
var mix = new THREE.AnimationMixer(m), clip = (F.clips || []).filter(function (c) { return c.name === "Flying_Idle"; })[0];
if (clip)
mix.clipAction(clip).play();
g.userData.mixer = mix;
g.userData.clips = F.clips || [];
g.userData.model = m;
});
});
}
catch (e) { }
return g;
},
function (g, hp, max, y, w) {
var b = g.userData.bwBarS;
if (!b) {
if (hp >= max)
return;
var cv = document.createElement("canvas");
cv.width = 64;
cv.height = 8;
b = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false }));
b.userData.bwBar = 1;
b.userData.cv = cv;
b.scale.set(w || 1.1, (w || 1.1) / 8, 1);
b.position.y = y;
g.add(b);
g.userData.bwBarS = b;
}
var f = Math.max(0, Math.min(1, hp / max)), k = Math.round(f * 60);
if (b.userData.k === k)
return;
b.userData.k = k;
var x = b.userData.cv.getContext("2d");
x.clearRect(0, 0, 64, 8);
x.fillStyle = "rgba(10,10,10,.75)";
x.fillRect(0, 0, 64, 8);
x.fillStyle = f > 0.5 ? "#6AC85A" : f > 0.25 ? "#E8B84A" : "#D8604A";
x.fillRect(2, 2, k, 4);
b.material.map.needsUpdate = true;
b.visible = f < 1 && f > 0;
},
function (kind, team, zone, x, z) {
var K = BW_KINDS[kind];
if (!K)
return null;
var id = ++BW.seq, g = bwBody(K, team, kind + "_" + id + "_" + team);
var y = bwSupport(x, z, K.fly ? 99 : (zone === "sky" ? 20 : 0));
g.position.set(x, y + (K.fly || 0), z);
BW.G.add(g);
var F = { id: id, k: K, kind: kind, team: team, zone: zone, g: g, hp: K.hp, max: K.hp, x: x, z: z, y: y, home: { x: x, z: z }, st: "go", t: 0, cool: 1 + Math.random() * 2, tgt: null, tAt: 0, slow: 0, yaw: 0,
plat: zone === "sky" ? bwPlatAt(x, z) : null, wob: Math.random() * 6 };
if (kind === "dummy") {
F.home = { x: x, z: z };
g.rotation.y = Math.PI;
}
BW.f.push(F);
return F;
},
function (Z) {
if (Z.arena && BW.wave)
return;
var cap = bwCap();
Object.keys(Z.sides).forEach(function (team) {
var list = Z.sides[team], have = BW.f.filter(function (F) { return F.zone === Z.k && F.team === team && F.st !== "dead" && !F.summon; }).length;
var want = team === "wild" ? cap * 2 : (Z.arena ? 1 : cap);
while (have < want) {
var kind = list[(Z.n = (Z.n || 0) + 1) % list.length], sp = Z.sp[team] || { x: Z.x, z: Z.z };
var x = sp.x + (Math.random() - 0.5) * (team === "wild" ? 120 : 24), z = sp.z + (Math.random() - 0.5) * (team === "wild" ? 120 : 24);
if (Z.sky) {
var p = BW.plat.filter(function (q) { return Math.hypot(q.x - sp.x, q.z - sp.z) < 40; });
p = p[Math.floor(Math.random() * p.length)] || BW.plat[0];
var a = Math.random() * 6.28, r = Math.random() * (p.r - 2);
x = p.x + Math.cos(a) * r;
z = p.z + Math.sin(a) * r;
}
if (bwSolidAt(x, z, 0.5)) {
x = sp.x;
z = sp.z;
}
bwSpawn(kind, team, Z.k, x, z);
have++;
}
});
if (Z.k === "fang" && !BW.dragon) {
BW.dragon = bwSpawn("dragon", "wild", "fang", BW.crag.x, BW.crag.z);
BW.dragon.circ = 0;
}
},
function (team, x, z, range, zone) {
var best = null, bd = range;
if (bwMeTargetable() && bwHostile(team, bwMyTeam())) {
var L = worldLocal(), d = Math.hypot(L.x - x, L.z - z);
if (d < bd && (BW.ride || bwSpots(x, z, d))) {
bd = d;
best = "me";
}
}
for (var i = 0; i < BW.f.length; i++) {
var F = BW.f[i];
if (F.st === "dead" || F.zone !== zone || !bwHostile(team, F.team) || F.team === "dummy")
continue;
var d2 = Math.hypot(F.x - x, F.z - z);
if (d2 < bd) {
bd = d2;
best = { F: F };
}
}
for (var j = 0; j < BW.mach.length; j++) {
var M = BW.mach[j];
if (!M.alive || M.pool && BW.ride !== M)
continue;
var mt = BW.ride === M ? bwMyTeam() : M.team;
if (!bwHostile(team, mt))
continue;
if (M.zone !== zone && BW.ride !== M)
continue;
var d3 = Math.hypot(M.x - x, M.z - z);
if (d3 < bd) {
bd = d3;
best = BW.ride === M ? "me" : { M: M };
}
}
return best;
},
function (F, dt) {
var K = F.k, g = F.g;
if (F.st === "dead") {
F.t += dt;
if (!F.fell) {
var u = Math.min(1, F.t / 0.7);
if (!F.clip)
g.rotation.x = -u * Math.PI / 2 * (K.fly ? 0 : 1);
}
if (K.fly && F.y + (K.fly || 0) * Math.max(0, 1 - F.t / 1.5) > F.y) {
g.position.y = F.y + (K.fly || 0) * Math.max(0, 1 - F.t / 1.5);
}
if (F.t > 4.5) {
g.position.y -= dt * 0.6;
}
if (F.t > 7) {
bwRemove(F);
if (F === BW.dragon) {
BW.dragonBackAt = BW.t + 180;
BW.dragon = null;
}
}
return;
}
if (K.body === "dummy") {
if (F.hp < F.max)
F.hp = Math.min(F.max, F.hp + dt * 20);
bwBar(g, F.hp, F.max, 2.6, 1.0);
return;
}
F.cool -= dt;
F.slow = Math.max(0, F.slow - dt);
F.wob += dt;
var A = bwArm(K.arm), range = K.range || A.reach || 2;
if (BW.t - F.tAt > 0.5) {
F.tAt = BW.t + Math.random() * 0.2;
F.tgt = bwPickTarget(F.team, F.x, F.z, K.range ? K.range + 14 : 26, F.zone);
}
var tp = F.tgt && bwTgtPos(F.tgt), sp = K.spd * (F.slow > 0 ? 0.45 : 1), mx = 0, mz = 0;
if (K.body === "dragon") {
bwDragonTick(F, dt, tp);
return;
}
if (F.st === "wind") {
F.t -= dt;
if (tp) {
F.yaw = bwTurn(F.yaw, Math.atan2(tp.x - F.x, tp.z - F.z), dt * 6);
}
if (F.t <= 0) {
F.st = "go";
bwStrike(F, A, tp);
F.cool = (K.cool || A.cool || 1.4) * (0.9 + Math.random() * 0.8) + (A.kind === "melee" ? 0.4 : 0.8);
}
}
else if (tp) {
var dx = tp.x - F.x, dz = tp.z - F.z, d = Math.hypot(dx, dz) || 0.01;
F.yaw = bwTurn(F.yaw, Math.atan2(dx, dz), dt * 5);
var reach = A.kind === "melee" ? range + (F.tgt && F.tgt.M ? F.tgt.M.r : 0) + (F.tgt && F.tgt.F && F.tgt.F.k.big ? 0.8 : 0) : range;
if (A.kind === "melee") {
if (d > reach * 0.8) {
mx = dx / d;
mz = dz / d;
}
}
else {
if (d > reach * 0.85) {
mx = dx / d;
mz = dz / d;
}
else if (d < reach * 0.35) {
mx = -dx / d * 0.7;
mz = -dz / d * 0.7;
}
else {
var s = Math.sin(F.wob * 0.7 + F.id);
mx = -dz / d * s * 0.4;
mz = dx / d * s * 0.4;
}
}
if (F.cool <= 0 && d < reach) {
F.st = "wind";
F.t = A.kind === "melee" ? 0.45 : 0.55;
bwAct(g, A.kind === "melee" ? (K.body === "person" && K.species ? "attack" : "attack") : "cast", 900);
}
}
else {
var Z = BW_Z[F.zone], goal = F.home;
if (F.summon) {
var Lm = worldLocal();
goal = { x: Lm.x + Math.cos(F.id) * 3, z: Lm.z + Math.sin(F.id) * 3 };
}
else if (Z && !Z.arena && Z.sp[F.team]) {
var foe = Object.keys(Z.sp).filter(function (t) { return t !== F.team; })[0];
if (foe && !(Z.hold === F.team))
goal = { x: Z.sp[foe].x + (F.home.x - Z.sp[F.team].x) * 0.5, z: Z.sp[foe].z + (F.home.z - Z.sp[F.team].z) * 0.5 };
}
if (F.team === "wild")
goal = { x: F.home.x + Math.cos(F.wob * 0.05 + F.id) * 14, z: F.home.z + Math.sin(F.wob * 0.05 + F.id) * 14 };
var gx = goal.x - F.x, gz = goal.z - F.z, gd = Math.hypot(gx, gz);
if (gd > 3) {
mx = gx / gd * 0.6;
mz = gz / gd * 0.6;
F.yaw = bwTurn(F.yaw, Math.atan2(gx, gz), dt * 3);
}
}
for (var i = 0; i < BW.f.length; i++) {
var O = BW.f[i];
if (O === F || O.st === "dead" || O.zone !== F.zone)
continue;
var ox = F.x - O.x, oz = F.z - O.z, od = ox * ox + oz * oz;
if (od < 1.4 && od > 0.0001) {
var q = Math.sqrt(od);
mx += ox / q * 0.6;
mz += oz / q * 0.6;
}
}
if (mx || mz) {
var m = Math.hypot(mx, mz);
if (m > 1) {
mx /= m;
mz /= m;
}
var nx = F.x + mx * sp * dt, nz = F.z + mz * sp * dt, Zc = BW_Z[F.zone], ok = !bwSolidAt(nx, nz, F.y + 0.3);
if (ok && Zc && Math.hypot(nx - Zc.x, nz - Zc.z) > Zc.r + (F.team === "wild" ? 10 : 20))
ok = false;
if (ok && F.plat && Math.hypot(nx - F.plat.x, nz - F.plat.z) > F.plat.r - 0.8)
ok = false;
if (ok && Zc && Zc.arena && Math.hypot(nx - Zc.x, nz - Zc.z) > 51)
ok = false;
if (ok) {
F.x = nx;
F.z = nz;
}
else if (!bwSolidAt(nx, F.z, F.y + 0.3) && !(F.plat && Math.hypot(nx - F.plat.x, F.z - F.plat.z) > F.plat.r - 0.8))
F.x = nx;
else if (!bwSolidAt(F.x, nz, F.y + 0.3) && !(F.plat && Math.hypot(F.x - F.plat.x, nz - F.plat.z) > F.plat.r - 0.8))
F.z = nz;
}
F.y = bwSupport(F.x, F.z, F.y + 0.4);
g.position.set(F.x, F.y + (K.fly ? K.fly + Math.sin(F.wob * 1.3) * 0.25 : 0), F.z);
g.rotation.y = F.yaw;
if (F.st === "wind" && A.kind === "melee") {
var b = g.children[0];
if (b)
b.position.z = Math.sin(Math.max(0, 0.45 - F.t) / 0.45 * Math.PI) * 0.35;
}
else {
var b2 = g.children[0];
if (b2 && b2.position.z)
b2.position.z = 0;
}
if (K.body === "drone") {
var rot = g.children[0];
if (rot)
rot.rotation.y += dt * 0.5;
}
if (K.body === "robot" && g.userData.legs) {
F.stride = (F.stride || 0) + (mx || mz ? dt * sp * 2.2 : 0);
g.userData.legs.forEach(function (l, i) { var s = Math.sin(F.stride + (i ? Math.PI : 0)) * (mx || mz ? 1 : 0); l.L.rotation.x = s * 0.5; l.sh.rotation.x = Math.max(0, -s) * 0.6; });
}
},
function (F, A, tp) {
if (!tp)
return;
var dmg = A.dmg * (F.k.big ? 1.3 : 1);
if (A.kind === "melee") {
var d = Math.hypot(tp.x - F.x, tp.z - F.z), reach = (F.k.range || A.reach || 2) + 0.9 + (F.tgt && F.tgt.M ? F.tgt.M.r : 0) + (F.tgt && F.tgt.F && F.tgt.F.k.big ? 0.8 : 0);
if (d > reach)
return;
if (typeof playTone === "function" && F.tgt === "me")
playTone(140, 0.12);
bwDamage(F.tgt, dmg, { x: F.x, z: F.z, team: F.team, F: F }, "melee");
}
else {
var from = new THREE.Vector3(BW.base + F.x + Math.sin(F.yaw) * 0.6, F.y + (F.k.fly || 0) + 1.35, F.z + Math.cos(F.yaw) * 0.6);
var lead = 0, spr = 0.025 + Math.hypot(tp.x - F.x, tp.z - F.z) * 0.0012;
var dir = new THREE.Vector3(BW.base + tp.x - from.x, (tp.y !== undefined ? tp.y : 1) - from.y, tp.z - from.z).normalize();
dir.x += (Math.random() - 0.5) * spr * 2;
dir.y += (Math.random() - 0.5) * spr;
dir.z += (Math.random() - 0.5) * spr * 2;
dir.normalize();
if (A.kind === "throw") {
dir.y += 0.18;
dir.normalize();
}
for (var pi = 0; pi < (A.pellets || 1); pi++) {
var dp = dir.clone();
if (pi) {
dp.x += (Math.random() - 0.5) * (A.spread || 0.08);
dp.y += (Math.random() - 0.5) * (A.spread || 0.08) * 0.5;
dp.z += (Math.random() - 0.5) * (A.spread || 0.08);
dp.normalize();
}
bwShoot({ from: from.clone(), dir: dp, arm: A, dmg: dmg, team: F.team, owner: F });
}
}
},
function (F, dt, tp) {
var g = F.g, C = BW.crag;
F.circ = (F.circ || 0) + dt * 0.25;
if (g.userData.mixer)
g.userData.mixer.update(dt);
var tx, tz, ty;
if (tp && F.tgt === "me") {
var L = worldLocal();
F.dive = (F.dive || 0) + dt;
var a = F.circ * 1.6;
tx = L.x + Math.cos(a) * 24;
tz = L.z + Math.sin(a) * 24;
ty = bwSupport(tx, tz, 0) + 12;
}
else if (tp) {
var a2 = F.circ * 1.2;
tx = tp.x + Math.cos(a2) * 20;
tz = tp.z + Math.sin(a2) * 20;
ty = bwSupport(tx, tz, 0) + 14;
}
else {
tx = C.x + Math.cos(F.circ) * 60;
tz = C.z + Math.sin(F.circ) * 60;
ty = C.y + 18;
}
var dx = tx - F.x, dz = tz - F.z, d = Math.hypot(dx, dz) || 0.01, sp = F.k.spd * (F.slow > 0 ? 0.5 : 1);
if (d > 0.5) {
F.x += dx / d * Math.min(d, sp * dt);
F.z += dz / d * Math.min(d, sp * dt);
}
F.fy = (F.fy === undefined ? ty : F.fy) + (ty - (F.fy === undefined ? ty : F.fy)) * Math.min(1, dt * 0.8);
F.yaw = bwTurn(F.yaw, tp ? Math.atan2(tp.x - F.x, tp.z - F.z) : Math.atan2(dx, dz), dt * 2);
g.position.set(F.x, F.fy, F.z);
g.rotation.y = F.yaw;
F.y = F.fy - (F.k.fly || 0);
F.cool -= dt;
if (tp && F.cool <= 0 && Math.hypot(tp.x - F.x, tp.z - F.z) < F.k.range) {
F.cool = 4.5 + Math.random() * 2;
for (var i = 0; i < 3; i++)
(function (k) {
setTimeout(function () {
if (F.st === "dead" || WLD.on !== "battle")
return;
var p = bwTgtPos(F.tgt);
if (!p)
return;
var from = new THREE.Vector3(BW.base + F.x + Math.sin(F.yaw) * 4, F.fy - 0.5, F.z + Math.cos(F.yaw) * 4), dir = new THREE.Vector3(BW.base + p.x - from.x, p.y - from.y, p.z - from.z).normalize();
dir.x += (Math.random() - 0.5) * 0.08;
dir.z += (Math.random() - 0.5) * 0.08;
dir.normalize();
bwShoot({ from: from, dir: dir, arm: BW_NPCARMS.breath, dmg: 22, team: "wild", owner: F });
}, k * 450);
})(i);
}
if (BW.zoneAt === "fang" && Math.hypot(worldLocal().x - F.x, worldLocal().z - F.z) < 90)
worldBanner("<b>⚔️ The Fangmire</b> · " + esc(F.k.name) + " " + Math.max(0, Math.round(F.hp)) + " / " + F.max);
},
function (F, dmg, src) {
if (F.st === "dead")
return;
var me = src && src.me;
if (me && !bwHostile(bwMyTeam(), F.team))
return;
dmg *= 1 - (F.k.armor || 0);
F.hp -= dmg;
if (me)
bwHitMark(F.hp <= 0);
if (F.k.body === "robot")
bwPuff(F.x, F.y + 1.4 * (F.k.scale || 1), F.z, 0xFFD890, 0.35, 0.5, 0.32);
if (bwBleeds(F))
bwBlood(F.x, F.y + (F.k.fly || 0) + 1.2 * (F.k.big ? 1.6 : 1), F.z, F.hp <= 0 ? 7 : 3, F.hp <= 0);
bwBar(F.g, F.hp, F.max, F.k.body === "dragon" ? 6 : (F.k.big ? 3.4 : 2.3) * (F.k.scale || 1), F.k.boss ? 3 : 1.1);
if (src && src.slow)
F.slow = src.slow;
if (me) {
F.tgt = "me";
F.tAt = BW.t + 2;
}
else if (src && src.F && !F.tgt) {
F.tgt = { F: src.F };
F.tAt = BW.t + 1;
}
if (F.k.body === "dummy") {
if (me)
bwSay("<b>" + Math.round(dmg) + "</b> on the dummy.");
if (F.hp <= 0)
F.hp = F.max;
return;
}
if (F.hp > 0) {
if (Math.random() < 0.4)
bwAct(F.g, "hurt", 400);
if (src && src.knock) {
var a = Math.atan2(F.x - src.x, F.z - src.z);
F.x += Math.sin(a) * src.knock;
F.z += Math.cos(a) * src.knock;
}
return;
}
F.st = "dead";
F.t = 0;
bwBar(F.g, 0, 1, 0, 0);
var E = bwHdE(F.g);
F.clip = !!(E && E.acts && E.acts.fall);
bwAct(F.g, "fall", 1e9);
if (me)
bwLoot(F);
if (BW.wave && F.zone === "arena" && F.team === "arena")
bwWaveCheck();
},
function (F) {
var d = bwData(), K = F.k;
d.kills++;
var w = K.worth || 5;
bwRenown(w);
bwFeed((K.boss ? "🐉 " : "⚔️ ") + "You beat " + esc(K.name) + " · +" + w, K.boss ? "#FFB86A" : "");
var got = [];
if (K.spoil && (K.boss || K.big || Math.random() < 0.3)) {
bwSpoil(K.spoil[0], K.spoil[1], K.name);
got.push(K.spoil[1] + " " + K.spoil[0]);
}
var arm = BW_ARMS[K.arm] ? K.arm : null;
if (arm && !bwOwns(arm) && Math.random() < 0.25) {
bwGive(arm, true, "won");
got.push("⚔️ " + BW_ARMS[arm].name);
}
bwSay("<b>" + esc(K.name) + " beaten.</b> +" + w + " renown" + (got.length ? "; into your backpack: " + got.map(esc).join(", ") : "") + ".", !!got.length || K.boss);
if (K.boss)
bwSay("<b>You have brought down " + esc(K.name) + "!</b> +" + w + " renown. Its scale is in your backpack.", true);
},
function (dmg, src, raw) {
if (WLD.on !== "battle" || BW.downT || bwInTruce())
return;
if (BW.ride && !raw) {
bwMachHit(BW.ride, dmg, false);
return;
}
if (BW.block && src && src.x !== undefined) {
var L = worldLocal(), a = Math.atan2(-(src.x - L.x), -(src.z - L.z));
if (Math.abs(bwAngDiff(yaw, a)) < 1.0) {
dmg *= 0.3;
if (typeof playTone === "function")
playTone(420, 0.08);
}
}
var C = bwClass();
dmg *= 1 - (C.armor || 0);
var HK = bwHeldKey(), HA = HK && BW_ARMS[HK];
if (HA && HA.ward)
dmg *= HA.ward;
BW.hp -= dmg;
BW.quietT = 0;
BW.hurt = Math.min(1, BW.hurt + dmg / 45);
bwHurtDir(src);
if (BW_BLOOD && dmg >= 4) {
var Lb = worldLocal();
bwBlood(Lb.x, Lb.y - 1.2, Lb.z, 0, false);
}
if (BW.hp <= 0)
bwBeaten(src);
},
function (src) {
BW.hp = 0;
BW.downT = 0.01;
if (BW.ride)
bwDismount(true);
if (BW.wave)
bwWaveEnd(false);
var by = src && src.F ? src.F.k.name : src && src.pvp ? src.name : null;
bwSay("<b>You are beaten" + (by ? " by " + esc(by) : "") + ".</b> The stretcher-bearers carry you back to the Muster Camp. (No harm comes of it outside Ironfray.)", true);
bwFeed("💀 You fell" + (by ? " to " + esc(by) : ""), "#FF9A8A");
bwPaidOut(src);
},
function (o) {
var A = o.arm, T = BW_P[A.p] || BW_P.bullet, key = A.p + (o.team === "azure" && A.p === "laser" ? "b" : ""), m;
var col = A.p === "laser" && (o.team === "azure" || o.team === "me") ? 0x6AC8FF : T.col;
if (T.ball) {
m = new THREE.Mesh(BW_PGEO["b" + T.r] || (BW_PGEO["b" + T.r] = new THREE.SphereGeometry(T.r, 10, 8)), T.glow ? new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9 }) : bwMat(col));
}
else {
m = new THREE.Mesh(BW_PGEO["c" + T.len] || (BW_PGEO["c" + T.len] = new THREE.CylinderGeometry(T.r, T.r, T.len, 6).rotateX(Math.PI / 2)), T.glow ? new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.85 }) : bwMat(col));
}
var gl = null;
if (T.glow) {
gl = bwGlow(col, T.ball ? T.r * 6 : 0.8, 0);
m.add(gl);
}
m.position.copy(o.from);
scene.add(m);
var spd = A.spd || 40, v = o.dir.clone().multiplyScalar(spd);
m.lookAt(o.from.x + v.x, o.from.y + v.y, o.from.z + v.z);
var life = A.kind === "throw" ? (T.fuse ? 2.4 : 5) : Math.min(3, 140 / spd);
if (A.back)
life = Math.min(life, 1.1);
BW.shots.push({ m: m, v: v, g: T.g || 0, life: life, life0: life, dmg: o.dmg, splash: A.splash || 0, slow: A.slow || 0, team: o.team, owner: o.owner, mach: o.mach || null, T: T, trailT: 0, gl: gl, went: 0, fuse: T.fuse ? 1.6 : 0, knock: A.knock || 0,
pierce: A.pierce || 0, hitList: [], back: A.back && o.owner === "me" ? 1 : 0, chain: A.chain || 0, burn: A.burn || 0, spd: spd });
},
function (dt) {
var B = BW.base, L = worldLocal();
for (var i = BW.shots.length - 1; i >= 0; i--) {
var s = BW.shots[i], p = s.m.position, ox = p.x, oy = p.y, oz = p.z;
if (s.back && s.life < s.life0 * 0.5) {
var cp = camera.position, bx = cp.x - p.x, by = cp.y - 0.4 - p.y, bz = cp.z - p.z, bd = Math.hypot(bx, by, bz) || 1;
s.v.set(bx / bd * s.spd, by / bd * s.spd, bz / bd * s.spd);
s.life = Math.max(s.life, 0.2);
if (bd < 1.2) {
s.life = -1;
s.caught = 1;
}
}
if (s.T.ball && s.back)
s.m.rotation.y += dt * 20;
s.v.y -= s.g * dt;
p.x += s.v.x * dt;
p.y += s.v.y * dt;
p.z += s.v.z * dt;
s.life -= dt;
if (s.gl) {
s.went += s.v.length() * dt;
s.gl.material.opacity = 0.32 * Math.min(1, s.went / 4);
}
if (!s.T.ball)
s.m.lookAt(p.x + s.v.x, p.y + s.v.y, p.z + s.v.z);
if (s.T.trail) {
s.trailT -= dt;
if (s.trailT <= 0) {
s.trailT = 0.09;
bwPuff(p.x - B, p.y, p.z, s.T.trail, 0.5, 0.6, 0.35);
}
}
var lx = p.x - B, hit = null, gy = bwSupport(lx, p.z, p.y);
if (s.fuse) {
s.fuse -= dt;
if (p.y <= gy + s.T.r) {
p.y = gy + s.T.r;
s.v.multiplyScalar(0.4);
s.v.y = Math.abs(s.v.y) * 0.3;
}
if (s.fuse > 0) {
continue;
}
hit = { ground: 1 };
}
if (s.caught)
hit = { ground: 1, air: 1 };
if (!hit && p.y <= gy + 0.02 && !s.back)
hit = { ground: 1 };
if (!hit && bwSolidAt(lx, p.z, p.y - 0.2))
hit = { ground: 1 };
if (!hit) {
hit = bwShotHits(s, ox, oy, oz, p);
}
if (!hit && s.life <= 0)
hit = { ground: 1, air: 1 };
if (!hit)
continue;
if (s.pierce > 0 && (hit.target && hit.target !== "me" || hit.pvp) && !s.splash) {
var who = hit.target ? (hit.target.F || hit.target.M) : hit.pvp;
s.hitList.push(who);
s.pierce--;
if (hit.target)
bwDamage(hit.target, s.dmg, { x: ox - B, z: oz, team: s.team, me: s.owner === "me", F: s.owner && s.owner.k ? s.owner : null, slow: s.slow, knock: s.knock }, "shot");
else
bwPvpHit(hit.pvp, s.dmg);
bwPuff(lx, p.y, p.z, s.T.glow ? s.m.material.color.getHex() : 0xC8B8A0, 0.5, 0.45, 0.35);
if (s.chain && s.owner === "me")
bwChain(lx, p.y, p.z, s.dmg * 0.6, s.chain, [who]);
continue;
}
if (s.splash) {
bwBoom(lx, p.y, p.z, s.splash, s.splash >= 4);
bwSplash(s, lx, p.y, p.z);
}
else if (hit.target) {
bwDamage(hit.target, s.dmg, { x: ox - B, z: oz, team: s.team, me: s.owner === "me", F: s.owner && s.owner.k ? s.owner : null, slow: s.slow, knock: s.knock }, "shot");
bwPuff(lx, p.y, p.z, s.T.glow ? s.m.material.color.getHex() : 0xC8B8A0, 0.6, 0.5, 0.4);
if (s.chain && s.owner === "me")
bwChain(lx, p.y, p.z, s.dmg * 0.6, s.chain, [hit.target.F || hit.target.M]);
}
else if (hit.pvp) {
bwPvpHit(hit.pvp, s.dmg);
bwPuff(lx, p.y, p.z, 0xC8B8A0, 0.6, 0.5, 0.4);
}
else if (!hit.air)
bwPuff(lx, p.y, p.z, 0xA89878, 0.9, 0.8, 0.4);
scene.remove(s.m);
if (s.T.glow)
s.m.material.dispose();
if (s.gl)
s.gl.material.dispose();
BW.shots.splice(i, 1);
}
},
function (s, ox, oy, oz, p) {
var B = BW.base, a = { x: ox, y: oy, z: oz };
var me = s.owner === "me";
if (!me && bwMeTargetable() && bwHostile(s.team, bwMyTeam())) {
var P = camera.position, c = { x: P.x, y: P.y - 0.6 - (BW.ride ? 0 : 0), z: P.z }, r = BW.ride ? BW.ride.r : 0.5;
if (typeof scSegDist === "function" && scSegDist(a, p, c) < r)
return { target: "me" };
}
var HL = s.hitList || [];
for (var i = 0; i < BW.f.length; i++) {
var F = BW.f[i];
if (F.st === "dead" || F === s.owner || HL.indexOf(F) > -1)
continue;
if (me ? !bwHostile(bwMyTeam(), F.team) : !bwHostile(s.team, F.team))
continue;
if (!me && F.team === "dummy")
continue;
var h = F.k.body === "dragon" ? 0 : (F.k.big ? 1.6 : 1.0) * (F.k.scale || 1), c2 = { x: B + F.x, y: F.g.position.y + (F.k.body === "dragon" ? 0 : h), z: F.z }, r2 = F.k.body === "dragon" ? 4 : F.k.big ? 1.2 : 0.6 * (F.k.scale > 1 ? F.k.scale * 0.7 : 1);
if (F.k.body === "drone")
c2.y = F.g.position.y;
if (Math.abs(c2.x - p.x) > 12 || Math.abs(c2.z - p.z) > 12)
continue;
if (scSegDist(a, p, c2) < r2)
return { target: { F: F } };
}
for (var j = 0; j < BW.mach.length; j++) {
var M = BW.mach[j];
if (!M.alive || M === s.mach || M === BW.ride || M.pool || HL.indexOf(M) > -1)
continue;
if (me ? !bwHostile(bwMyTeam(), M.team) : !bwHostile(s.team, M.team))
continue;
var c3 = { x: B + M.x, y: M.g.position.y + M.T.hitY, z: M.z };
if (scSegDist(a, p, c3) < M.r)
return { target: { M: M } };
}
if (me) {
var G = bwPvpList();
for (var k = 0; k < G.length; k++) {
var q = G[k];
if (HL.indexOf(q) > -1)
continue;
var c4 = { x: q.g.position.x, y: q.g.position.y + 1.1, z: q.g.position.z };
if (scSegDist(a, p, c4) < 0.6)
return { pvp: q };
}
}
return null;
},
function (s, x, y, z) {
var me = s.owner === "me";
if (!me && bwMeTargetable() && bwHostile(s.team, bwMyTeam())) {
var L = worldLocal(), d = Math.hypot(L.x - x, L.z - z, (L.y - 1) - y);
if (d < s.splash)
bwHurtMe(s.dmg * (1 - d / s.splash * 0.7), { x: x, z: z });
}
BW.f.forEach(function (F) {
if (F.st === "dead" || F === s.owner)
return;
if (me ? !bwHostile(bwMyTeam(), F.team) : !bwHostile(s.team, F.team))
return;
if (!me && F.team === "dummy")
return;
var d = Math.hypot(F.x - x, F.z - z, F.g.position.y + 1 - y);
if (d < s.splash + (F.k.big ? 1 : 0))
bwHitF(F, s.dmg * (1 - d / (s.splash + 1) * 0.7), { x: x, z: z, team: s.team, me: me, F: s.owner && s.owner.k ? s.owner : null, slow: s.slow });
});
BW.mach.forEach(function (M) {
if (!M.alive || M === s.mach || M.pool)
return;
if (M === BW.ride)
return;
if (me ? !bwHostile(bwMyTeam(), M.team) : !bwHostile(s.team, M.team))
return;
var d = Math.hypot(M.x - x, M.z - z);
if (d < s.splash + M.r)
bwMachHit(M, s.dmg * (1 - d / (s.splash + M.r) * 0.6), me);
});
if (me)
bwPvpList().forEach(function (q) { var d = Math.hypot(q.g.position.x - BW.base - x, q.g.position.z - z); if (d < s.splash)
bwPvpHit(q, s.dmg * (1 - d / s.splash * 0.7)); });
},
function (x, y, z, r, big) {
if (BW.fx.length > 150)
return;
var near = BW.fx.some(function (f) { return f.boom && f.t < 0.7 && Math.hypot(f.s.position.x - BW.base - x, f.s.position.z - z) < Math.max(4, r * 1.5); });
if (!near) {
var s = bwGlow(0xFF9A4A, r * 1.4, 0.42);
s.position.set(BW.base + x, y + 0.4, z);
scene.add(s);
BW.fx.push({ s: s, t: 0, life: 0.9, grow: r * 1.2, op: 0.42, rise: 0.5, size: r * 1.4, boom: 1 });
}
bwSmoke(x, y + 0.6, z, r * 0.9);
if (big)
bwSmoke(x + 0.8, y + 1.2, z - 0.6, r * 1.1);
var L = worldLocal(), d = Math.hypot(L.x - x, L.z - z);
if (typeof playTone === "function" && d < 60)
playTone(55 + Math.random() * 20, 0.35);
},
function (dt) {
for (var i = BW.fx.length - 1; i >= 0; i--) {
var f = BW.fx[i];
f.t += dt;
var u = f.t / f.life;
if (f.v)
f.s.position.addScaledVector(f.v, dt);
f.s.position.y += f.rise * dt;
var sc = f.size + f.grow * u;
f.s.scale.set(sc, sc, 1);
var dc = f.s.position.distanceTo(camera.position), near = Math.max(0, Math.min(1, (dc - sc * 0.5) / 4));
f.s.material.opacity = f.op * Math.max(0, 1 - u) * Math.min(1, f.t * 6 + 0.3) * near;
if (u >= 1) {
scene.remove(f.s);
f.s.material.dispose();
BW.fx.splice(i, 1);
}
}
},
function () {
var k = bwHeldKey(), want = WLD.on === "battle" && !BW.vmHide && k && !bwVR() && (typeof meView === "undefined" || meView === "eyes") ? k : null;
if (want === BW.vmKey && (!want || BW.vm))
return;
if (BW.vm) {
scene.remove(BW.vm);
BW.vm = null;
}
BW.vmKey = want;
if (!want)
return;
var A = BW_ARMS[want], g = new THREE.Group(), m = HELD[A.held] ? HELD[A.held]() : new THREE.Group();
var fwd = BW_FWD.test(A.held);
g.userData.rest = A.kind === "melee" ? [-0.5, 0] : fwd ? [0, Math.PI] : [-Math.PI / 2, 0];
m.rotation.set(g.userData.rest[0], g.userData.rest[1], 0);
m.position.set(0, 0, 0);
m.scale.setScalar(0.55);
g.add(m);
if (A.kind !== "melee") {
var gl = bwGlow(A.p === "fire" || A.kind === "cone" ? 0xFF9A4A : A.p === "frost" ? 0xBFE4F4 : A.p === "laser" || A.p === "plasma" ? 0x8AE0FF : 0xFFD8A0, 0.22, 0);
gl.position.set(0, 0.03, -0.6);
g.add(gl);
g.userData.muz = gl;
}
g.traverse(function (o) { if (o.isMesh) {
o.renderOrder = 20;
o.frustumCulled = false;
} });
g.userData.m = m;
scene.add(g);
BW.vm = g;
},
function () {
var hand = bwVR() && typeof VRM !== "undefined" && VRM.hands && (VRM.hands[1] || VRM.hands[0]);
var k = WLD.on === "battle" && hand && !BW.ride ? bwHeldKey() : null;
if (BW.vrHand && (BW.vrHandKey !== k || BW.vrHand.parent !== hand)) {
if (BW.vrHand.parent)
BW.vrHand.parent.remove(BW.vrHand);
BW.vrHand = null;
BW.vrHandKey = null;
}
if (!k || BW.vrHand)
return;
var A = BW_ARMS[k], m = HELD[A.held] ? HELD[A.held]() : null;
if (!m)
return;
var fwd = BW_FWD.test(A.held);
if (fwd)
m.rotation.y = Math.PI;
else
m.rotation.x = -Math.PI / 2 + 0.25;
m.scale.setScalar(0.7);
hand.add(m);
BW.vrHand = m;
BW.vrHandKey = k;
},
function (dt) {
bwVrHand();
if (!BW.vm) {
return;
}
var g = BW.vm, A = BW_ARMS[BW.vmKey];
if (!A)
return;
BW.swing = Math.max(0, BW.swing - dt * 3.2);
BW.kick = Math.max(0, BW.kick - dt * 6);
BW.heat = Math.max(0, BW.heat - dt * 1.8);
g.position.copy(camera.position);
g.quaternion.copy(camera.quaternion);
var s = BW.swing, sw = Math.sin(s * Math.PI);
var off = new THREE.Vector3(0.32 - sw * 0.3, -0.36 + sw * 0.12 + (BW.block ? 0.12 : 0), -0.62 - sw * 0.18 + BW.kick * 0.06).applyQuaternion(camera.quaternion);
g.position.add(off);
var m = g.userData.m;
if (A.kind === "melee") {
m.rotation.set(-0.5 - sw * 1.4 + (BW.block ? 0.9 : 0), sw * 0.6, (BW.block ? 1.2 : 0) - sw * 0.5);
}
else {
var rr = g.userData.rest;
m.rotation.set(rr[0] + (rr[1] ? -1 : 1) * BW.kick * 0.2, rr[1], 0);
}
if (g.userData.muz)
g.userData.muz.material.opacity = Math.min(0.25, BW.heat * 0.2);
},
function () {
var d = new THREE.Vector3();
if (bwVR())
try {
var vc = VRM.cam || (renderer.xr && renderer.xr.getCamera(camera));
if (vc) {
vc.getWorldDirection(d);
if (d.lengthSq() > 0.5)
return d.normalize();
}
}
catch (e) { }
return d.set(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
},
function (dir, from, tol, maxD, skipM) {
if (bwTouch())
tol *= 1.8;
if (bwVR())
tol *= 1.5;
var best = null, bs = 1e9, B = BW.base;
bwFoesForMe().forEach(function (o) {
var dx = o.x - from.x, dy = o.y - from.y, dz = o.z - from.z, d = Math.hypot(dx, dy, dz);
if (d > maxD || d < 1 || o.M === skipM)
return;
var dot = (dx * dir.x + dy * dir.y + dz * dir.z) / d, ang = Math.acos(Math.max(-1, Math.min(1, dot)));
var t = Math.max(tol, Math.atan2(o.r || 0.6, d));
if (ang > t)
return;
var sc = ang * d;
if (sc < bs) {
bs = sc;
best = o;
}
});
if (!best)
return dir.clone();
return new THREE.Vector3(best.x - from.x, best.y - from.y, best.z - from.z).normalize();
},
function () {
var out = [], B = BW.base, my = bwMyTeam();
BW.f.forEach(function (F) {
if (F.st === "dead" || !bwHostile(my, F.team))
return;
var big = F.k.big ? 1.6 : 1;
out.push({ F: F, x: B + F.x, y: F.g.position.y + (F.k.body === "dragon" || F.k.body === "drone" ? 0 : 1.1 * big), z: F.z, r: F.k.body === "dragon" ? 4 : 0.7 * big });
});
BW.mach.forEach(function (M) { if (!M.alive || M.pool || M === BW.ride || !bwHostile(my, M.team))
return; out.push({ M: M, x: B + M.x, y: M.g.position.y + M.T.hitY, z: M.z, r: M.r }); });
bwPvpList().forEach(function (q) { out.push({ pvp: q, x: q.g.position.x, y: q.g.position.y + 1.1, z: q.g.position.z, r: 0.6 }); });
return out;
},
function () {
if (WLD.on !== "battle" || BW.downT)
return;
if (BW.ride) {
var M = BW.ride;
if (M.cool > 0)
return;
M.cool = M.T.rideCool;
bwMachFire(M, null, true);
return;
}
var k = bwHeldKey();
if (!k) {
bwNextWeapon();
return;
}
var A = BW_ARMS[k];
if (BW.cool > 0 || BW.block)
return;
BW.cool = A.cool;
if (bwInTruce() && !bwNearDummy()) {
if (!BW.toldTruce || BW.t - BW.toldTruce > 6) {
BW.toldTruce = BW.t;
bwSay("This is the Truce Ground: nobody fights in the Muster Camp. Try the dummies, or go out to a field.");
}
}
var P = camera.position, dir = bwAim();
if (A.kind === "melee") {
BW.swing = 1;
if (typeof playTone === "function")
playTone(180, 0.08);
var hits = [], L = { x: P.x, y: P.y, z: P.z };
bwFoesForMe().concat(bwDummies()).forEach(function (o) {
var dx = o.x - L.x, dz = o.z - L.z, dy = o.y - (L.y - 0.6), d = Math.hypot(dx, dz);
if (d > A.reach + (o.r || 0.6) || Math.abs(dy) > 2.6 + (o.r > 1 ? o.r : 0))
return;
var a = Math.atan2(-dx, -dz), fa = Math.atan2(-dir.x, -dir.z);
if (Math.abs(bwAngDiff(fa, a)) > A.arc && d > 1.0)
return;
hits.push({ o: o, d: d });
});
hits.sort(function (a, b) { return a.d - b.d; });
var md = A.dmg * bwClass().dmg, landed = (A.cleave ? hits.slice(0, 4) : hits.slice(0, 1));
landed.forEach(function (h) { bwStrikeFoe(h.o, md, { knock: A.knock, slow: A.slow }); if (A.burn)
bwPuff(h.o.x - BW.base, h.o.y, h.o.z, 0xFF9A4A, 0.6, 0.6, 0.35); });
if (A.aoe && landed.length) {
var c0 = landed[0].o;
bwBoom(c0.x - BW.base, c0.y - 1, c0.z, A.aoe * 0.6, false);
bwFoesForMe().forEach(function (o) { if (landed.some(function (h) { return h.o.F === o.F && h.o.M === o.M && h.o.pvp === o.pvp; }))
return; if (Math.hypot(o.x - c0.x, o.z - c0.z) < A.aoe)
bwStrikeFoe(o, md * 0.6, { knock: A.knock }); });
}
if (A.chain && landed.length) {
var c1 = landed[0].o;
bwChain(c1.x - BW.base, c1.y, c1.z, md * 0.6, A.chain, [c1.F || c1.M || c1.pvp]);
}
if (A.leech && landed.length) {
BW.hp = Math.min(BW.max, BW.hp + md * A.leech * landed.length);
}
return;
}
if (A.kind === "self") {
BW.hp = Math.min(BW.max, BW.hp + A.heal);
var Ls = worldLocal();
for (var hi = 0; hi < 3; hi++)
bwPuff(Ls.x + (Math.random() - 0.5), Ls.y - 0.8 + hi * 0.4, Ls.z + (Math.random() - 0.5), 0x9AE8A0, 0.5, 1.2, 0.3);
bwSay("<b>Mended</b> by the staff: +" + A.heal + " vigour.");
if (typeof playTone === "function")
playTone(520, 0.2);
return;
}
if (A.kind === "nova") {
bwNova(A);
return;
}
if (A.kind === "summon") {
bwSummon(A);
return;
}
var from = P.clone().add(new THREE.Vector3(0, -0.25, 0)).addScaledVector(new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw)), 0.18).addScaledVector(dir, 0.6);
if (A.kind === "cone") {
BW.heat = Math.min(1.2, BW.heat + 0.25);
for (var i = 0; i < 2; i++) {
if (BW.fx.length > 140)
break;
var sp = bwGlow(A.puff || (i ? 0xE8703A : 0xFFA050), 0.4, 0.3, false);
var q = dir.clone();
q.x += (Math.random() - 0.5) * 0.25;
q.y += (Math.random() - 0.5) * 0.15;
q.z += (Math.random() - 0.5) * 0.25;
q.normalize();
sp.position.copy(from).addScaledVector(q, 1.2);
scene.add(sp);
BW.fx.push({ s: sp, t: 0, life: 0.55, grow: 1.4, op: 0.3, rise: 0.5, size: 0.4, v: q.multiplyScalar(11) });
}
bwFoesForMe().concat(bwDummies()).forEach(function (o) { var dx = o.x - P.x, dz = o.z - P.z, d = Math.hypot(dx, dz); if (d > A.reach)
return; var a = Math.atan2(-dx, -dz), fa = Math.atan2(-dir.x, -dir.z); if (Math.abs(bwAngDiff(fa, a)) > A.arc)
return; bwStrikeFoe(o, A.dmg, { knock: A.knock }); });
return;
}
if (A.kind === "beam") {
bwBeamFire(A, from, dir);
return;
}
BW.heat = Math.min(1.2, BW.heat + 0.55);
BW.kick = 1;
var aim = bwAimAssist(dir, from, A.kind === "throw" ? 0.1 : 0.06, 110);
if (A.spread) {
aim.x += (Math.random() - 0.5) * A.spread;
aim.y += (Math.random() - 0.5) * A.spread * 0.6;
aim.z += (Math.random() - 0.5) * A.spread;
aim.normalize();
}
if (A.kind === "throw") {
aim.y += A.lob || 0.22;
aim.normalize();
}
for (var pi = 0; pi < (A.pellets || 1); pi++) {
var ap = aim.clone();
if (pi) {
var sp2 = A.spread || 0.08;
ap.x += (Math.random() - 0.5) * sp2;
ap.y += (Math.random() - 0.5) * sp2 * 0.6;
ap.z += (Math.random() - 0.5) * sp2;
ap.normalize();
}
bwShoot({ from: from.clone(), dir: ap, arm: A, dmg: A.dmg * bwClass().dmg, team: bwMyTeam(), owner: "me" });
}
if (typeof playTone === "function")
playTone(A.p === "laser" || A.p === "plasma" ? 660 : A.p === "bullet" || A.p === "ball" ? 120 : 260, 0.08);
},
function (A, from, dir) {
var aim = bwAimAssist(dir, from, 0.07, A.reach), B = BW.base, hits = [], dm = A.dmg * bwClass().dmg;
bwFoesForMe().concat(bwDummies()).forEach(function (o) {
var vx = o.x - from.x, vy = o.y - from.y, vz = o.z - from.z, along = vx * aim.x + vy * aim.y + vz * aim.z;
if (along < 0.5 || along > A.reach)
return;
var px = from.x + aim.x * along - o.x, py = from.y + aim.y * along - o.y, pz = from.z + aim.z * along - o.z;
if (Math.hypot(px, py, pz) > (o.r || 0.6) + 0.25)
return;
if (typeof bwLOS === "function" && !bwLOS(from.x - B, from.y, from.z, o.x - B, o.y, o.z))
return;
hits.push({ o: o, d: along });
});
hits.sort(function (a, b) { return a.d - b.d; });
var got = A.pierce ? hits : hits.slice(0, 1), end = got.length ? got[got.length - 1].d : A.reach;
if (!got.length) {
for (var s = 2; s < A.reach; s += 2) {
var x = from.x + aim.x * s, y = from.y + aim.y * s, z = from.z + aim.z * s;
if (y < bwSupport(x - B, z, y) || bwSolidAt(x - B, z, y - 0.2)) {
end = s;
break;
}
}
}
var to = from.clone().addScaledVector(aim, end);
bwBeamDraw(from.clone().addScaledVector(aim, 1.2), to, A.col || 0xFFE8A0, Math.max(0.4, A.cool + 0.15), true);
got.forEach(function (h) { bwStrikeFoe(h.o, dm, { slow: A.slow, knock: A.knock }); });
if (A.splash) {
bwBoom(to.x - B, to.y, to.z, A.splash, false);
bwSplash({ owner: "me", team: bwMyTeam(), splash: A.splash, dmg: dm * 0.6, slow: A.slow || 0 }, to.x - B, to.y, to.z);
}
if (A.chain && got.length) {
var c = got[0].o;
bwChain(c.x - B, c.y, c.z, dm * 0.6, A.chain, [c.F || c.M || c.pvp]);
}
if (typeof playTone === "function")
playTone(A.chain ? 880 : A.slow ? 720 : 600, 0.12);
},
function (a, b, col, life, mine) {
var len = a.distanceTo(b);
if (len < 0.2)
return;
var L = mine && BW.myBeam && BW.myBeam.col === col ? BW.myBeam : null;
if (!L) {
if (BW.beams.length > 10)
return;
var m = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 6, 1, true).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, depthWrite: false, fog: false }));
scene.add(m);
L = { m: m, col: col, t: 0, life: life, op: mine ? 0.35 : 0.28, w: mine ? 0.05 : 0.035 };
BW.beams.push(L);
if (mine)
BW.myBeam = L;
}
L.t = 0;
L.life = life;
L.m.position.copy(a).add(b).multiplyScalar(0.5);
L.m.scale.set(L.w, L.w, len);
L.m.lookAt(b);
},
function (dt) {
for (var i = BW.beams.length - 1; i >= 0; i--) {
var L = BW.beams[i];
L.t += dt;
if (WLD.on !== "battle")
L.t = L.life;
var u = L.t / L.life;
L.m.material.opacity = L.op * Math.min(1, L.t * 10) * (u < 0.5 ? 1 : Math.max(0, (1 - u) * 2));
if (L.ring) {
var rs = 1 + u * L.nova;
L.m.scale.set(rs, 1, rs);
L.m.material.opacity = L.op * Math.min(1, L.t * 6) * Math.max(0, 1 - u);
}
if (u >= 1) {
scene.remove(L.m);
L.m.geometry.dispose();
L.m.material.dispose();
BW.beams.splice(i, 1);
if (BW.myBeam === L)
BW.myBeam = null;
}
}
},
function (x, y, z, dmg, n, skip) {
var B = BW.base, at = new THREE.Vector3(B + x, y, z), done = (skip || []).slice(), list = bwFoesForMe();
for (var k = 0; k < n; k++) {
var best = null, bd = 8;
list.forEach(function (o) { var who = o.F || o.M || o.pvp; if (done.indexOf(who) > -1)
return; var d = Math.hypot(o.x - at.x, o.y - at.y, o.z - at.z); if (d < bd) {
bd = d;
best = o;
} });
if (!best)
break;
var to = new THREE.Vector3(best.x, best.y, best.z);
bwBeamDraw(at, to, 0xD8E8FF, 0.5, false);
bwStrikeFoe(best, dmg, {});
done.push(best.F || best.M || best.pvp);
at = to;
dmg *= 0.85;
}
},
function (A) {
var L = worldLocal(), B = BW.base, dm = A.dmg * bwClass().dmg;
if (BW.fx.length < 150) {
var r = new THREE.Mesh(new THREE.RingGeometry(0.85, 1, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: A.col || 0xD8C8FF, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, fog: false }));
r.position.set(B + L.x, L.y - 1.5, L.z);
scene.add(r);
BW.beams.push({ m: r, t: 0, life: 1.4, op: 0.3, nova: A.reach, ring: 1 });
}
bwFoesForMe().forEach(function (o) { if (Math.hypot(o.x - B - L.x, o.z - L.z) < A.reach)
bwStrikeFoe(o, dm, { slow: A.slow }); });
bwSay("<b>" + esc(A.name) + "</b>: time slows round you.");
if (typeof playTone === "function")
playTone(330, 0.4);
},
function (A) {
var L = worldLocal();
if (bwInTruce() || !BW.zoneAt) {
bwSay("The dead will only rise on a battlefield. Go out to one of the fields.");
BW.cool = 0.5;
return;
}
var mine = BW.f.filter(function (F) { return F.summon && F.st !== "dead"; });
mine.forEach(function (F) { F.ttl = BW.t; });
for (var i = 0; i < (A.n || 3); i++) {
var a = yaw + Math.PI + (i - 1) * 0.9, x = L.x - Math.sin(a) * -2.5, z = L.z - Math.cos(a) * -2.5;
if (bwSolidAt(x, z, 0.5)) {
x = L.x;
z = L.z;
}
var F = bwSpawn(A.summon || "skeleton", bwMyTeam(), BW.zoneAt, x, z);
if (!F)
continue;
F.summon = true;
F.ttl = BW.t + (A.life || 40);
F.yaw = yaw + Math.PI;
bwPuff(x, 0.4, z, 0x6AFFB0, 1.2, 1.4, 0.28);
}
bwSay("<b>The Barrow King's dead rise for you.</b> They fight at your side for " + (A.life || 40) + " seconds.", true);
if (typeof playTone === "function")
playTone(160, 0.5);
},
function () {
var d = bwData(), fns = {}, html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Armoury</div><div style='opacity:.85;margin-bottom:6px'>Take what you like: it is yours, and goes in your backpack. " + (bwTouch() ? "The <b>⇄</b> button" : "<b>X</b>") + " changes weapon" + (bwTouch() ? "" : " (A on a VR controller)") + ".</div>";
html += "<div style='margin:8px 0 2px;opacity:.75;font-size:12px;letter-spacing:.06em;text-transform:uppercase'>Fight as</div>";
Object.keys(BW_CLASSES).forEach(function (k) {
var C = BW_CLASSES[k];
html += worldBtn("c-" + k, (d.cls === k ? "✓ " : "") + C.name, C.about + " Vigour " + C.hp + (C.armor ? ", armour " + Math.round(C.armor * 100) + "%" : "") + ". " + C.arms.map(function (a) { return BW_ARMS[a].name; }).join(", ") + ".");
fns["c-" + k] = function () { d.cls = k; C.arms.forEach(function (a) { bwGive(a, true); }); bwEquip(C.arms[0]); BW.max = C.hp; BW.hp = Math.min(BW.max, Math.max(BW.hp, C.hp)); bwSave(true); worldCard(null); bwSay("<b>You fight as a " + esc(C.name) + ".</b> Your kit is in your backpack; " + esc(BW_ARMS[C.arms[0]].name) + " in hand.", true); };
});
BW_ERAS.forEach(function (era) {
html += "<div style='margin:10px 0 2px;opacity:.75;font-size:12px;letter-spacing:.06em;text-transform:uppercase'>" + esc(era) + "</div>";
Object.keys(BW_ARMS).forEach(function (k) {
var A = BW_ARMS[k];
if (A.era !== era)
return;
var own = bwOwns(k);
html += "<span data-w='w-" + k + "' style='display:inline-block;margin:3px;padding:5px 10px;border-radius:12px;border:1px solid " + (own ? "#E8C66A" : "rgba(143,180,232,.5)") + ";color:" + (own ? "#FFE7B0" : "#E8ECF4") + "'>" + (own ? "✓ " : "") + esc(A.name) + "</span>";
fns["w-" + k] = function () { bwGive(k); worldCard(null); bwSay("<b>" + esc(A.name) + "</b> in hand, and in your backpack."); };
});
});
worldCard(html, fns);
},
function () {
var d = bwData(), fns = {}, by = {};
d.spoils.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
var html = worldFacts("The War Herald", "Ironfray's rolls of honour", [["Your rank", bwRank(d.renown)], ["Renown", String(d.renown)], ["Foes beaten", String(d.kills)], ["Best in the Trials", "wave " + (d.best || 0)], ["Your banner", d.banner === "crimson" ? "The Crimson Legion" : d.banner === "azure" ? "The Azure Host" : "Your own: against everyone"]], ["Outside the Truce Ground, anything goes: every other dreamer here can fight you, and you them (unless you march under the same banner).", "Beaten, you wake in the Muster Camp: nothing follows you home to Somnucor."]);
html += "<div style='margin-top:8px;opacity:.8'>March under a banner:</div>";
[["crimson", "The Crimson Legion", "Its soldiers fight beside you; the Azure Host is your enemy."], ["azure", "The Azure Host", "Its soldiers fight beside you; the Crimson Legion is your enemy."], ["lone", "Your own banner", "Everyone is your enemy. Glory is all yours."]].forEach(function (b) {
html += worldBtn("b-" + b[0], (d.banner === b[0] ? "✓ " : "") + b[1], b[2]);
fns["b-" + b[0]] = function () { d.banner = b[0]; bwSave(true); bwNetSend(null, { t: "me", s: bwMyTeam() }); worldCard(null); bwSay("<b>You march under " + esc(b[1].replace(/^Your own banner$/, "your own banner")) + ".</b>", true); };
});
var sp = Object.keys(by);
if (sp.length)
html += "<div style='margin-top:8px;opacity:.8'>Your spoils (in your backpack):</div><div style='font-size:12.5px'>" + sp.slice(0, 30).map(function (k) { return esc(k) + (by[k] > 1 ? " ×" + by[k] : ""); }).join(" · ") + "</div>";
worldCard(html, fns);
},
function () {
var d = bwData(), fns = {};
var html = worldFacts("The Trials of the Bowl", "The Arena Master's challenge", [["Waves", "12, from goblins to a hill giant"], ["Your best", "wave " + (d.best || 0)]], ["Each wave comes in through the gates when the last is down. Renown for every wave, spoils at waves 4, 8 and 12.", "Leave the sand, or be beaten, and the Trials end."]);
if (BW.wave) {
html += worldBtn("stop", "Yield (end the Trials)", "");
fns.stop = function () { worldCard(null); bwWaveEnd(false); };
}
else {
html += worldBtn("go", "Begin the Trials", "");
fns.go = function () { worldCard(null); bwWaveStart(); };
}
worldCard(html, fns);
},
function () {
var W = BW.wave, Z = BW_Z.arena;
W.n++;
if (W.n > BW_WAVES.length) {
bwWaveEnd(true);
return;
}
var list = BW_WAVES[W.n - 1];
list.forEach(function (k, i) { var a = (i / list.length) * Math.PI * 2 + W.n, x = Z.x + Math.cos(a) * 44, z = Z.z + Math.sin(a) * 44; var F = bwSpawn(k, "arena", "arena", x, z); if (F) {
F.tgt = "me";
W.live.push(F);
} });
bwSay("<b>Wave " + W.n + " of " + BW_WAVES.length + ":</b> " + list.map(function (k) { return BW_KINDS[k].name.toLowerCase(); }).join(", ") + ".", true);
},
function () {
var W = BW.wave;
if (!W)
return;
if (W.live.some(function (F) { return F.st !== "dead"; }))
return;
var d = bwData(), n = W.n;
if (n > d.best) {
d.best = n;
}
bwRenown(20 * n);
if (n === 4)
bwSpoil("Bowl laurel wreath", "🌿", "the Trials");
if (n === 8)
bwSpoil("Bowl silver arm-band", "🥈", "the Trials");
if (n === 12)
bwSpoil("Champion's belt of the Bowl", "🏆", "the Trials");
W.live = [];
W.t = 4;
if (n >= BW_WAVES.length) {
bwWaveEnd(true);
return;
}
bwSay("<b>Wave " + n + " won!</b> +" + (20 * n) + " renown" + (n === 4 || n === 8 ? "; a spoil goes in your backpack" : "") + ". The next comes in a moment.", true);
},
function (won) {
var W = BW.wave;
if (!W)
return;
BW.wave = null;
W.live.forEach(function (F) { if (F.st !== "dead") {
F.st = "dead";
F.t = 4;
} });
if (won) {
bwSay("<b>Champion of the Bowl!</b> All twelve waves. The champion's belt is in your backpack.", true);
}
else
bwSay("<b>The Trials end</b> at wave " + W.n + ". Your best: wave " + bwData().best + ".", true);
bwSave(true);
},
function (dt) {
var U = BW.lift;
if (!U)
return;
U.t += dt;
var u = Math.min(1, U.t / 2.2), e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
camera.position.x = BW.base + U.from.x + (U.to.x - U.from.x) * e;
camera.position.z = U.from.z + (U.to.z - U.from.z) * e;
WLD.hop = (U.to.y - U.from.y) * Math.sin(u * Math.PI / 2) + Math.sin(u * Math.PI) * 4;
if (u >= 1) {
BW.lift = null;
WLD.hop = 0;
camera.position.y = U.to.y + 1.72;
}
},
function () {
if (typeof presenceOthers === "undefined")
return [];
var out = [];
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], g = p && p.group;
if (!g || !g.visible || !g.parent)
return;
if (Math.abs(g.position.x - BW.base) > 2000)
return;
var x = g.position.x - BW.base, z = g.position.z;
if (bwInTruce(x, z) || bwInTruce())
return;
var side = BW.net.sides[id];
if (side && side === bwMyTeam() && side !== "me")
return;
out.push({ id: id, g: g, name: p.name || "a dreamer" });
});
return out;
},
function (to, body) {
if (BW.net.missing || !(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function")
return;
cityRpc("battle_send", { p_to: to || null, p_body: body }).then(function (o) { if (o && o.ok === false && o.say && body.t === "hit")
bwSay(esc(o.say)); })
.catch(function (e) { if (/function|404|PGRST|does not exist|schema cache/i.test(String((e && e.message) || e))) {
BW.net.missing = true;
if (body.t === "hit")
bwSay("Blows between dreamers land soon.");
} });
},
function () {
var N = BW.net;
if (N.busy || N.missing || !(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function")
return;
N.busy = true;
N.at = BW.t;
cityRpc("live_poll", { p_since: N.since, p_place: "world:battle" }).then(function (o) {
if (!o || !o.ok)
return;
var first = !N.since;
N.since = Math.max(N.since, +o.top || 0);
if (first)
return;
(o.rows || []).forEach(function (r) {
if (r.kind !== "battle" || !r.body)
return;
var b = r.body;
if (b.s)
N.sides[r.from] = b.s;
if (b.t === "hit") {
if (b.s && b.s !== "me" && b.s === bwMyTeam())
return;
var p = presenceOthers && presenceOthers[r.from], g = p && p.group;
bwHurtMe(Math.max(0, Math.min(60, +b.d || 0)), g ? { x: g.position.x - BW.base, z: g.position.z, pvp: 1, id: r.from, name: r.name } : { pvp: 1, id: r.from, name: r.name });
}
else if (b.t === "down")
bwWonPvp(r);
});
}).catch(function () { }).then(function () { N.busy = false; });
},
function () {
if (!BW.hud) {
var h = document.createElement("div");
h.id = "bw-hud";
h.style.cssText = "position:fixed;left:12px;top:204px;z-index:44;display:none;background:rgba(14,10,8,.86);border:1px solid #C88A5A;border-radius:8px;padding:6px 10px;font:12.5px/1.45 var(--sans,system-ui);color:#F4E8D8;pointer-events:none;min-width:170px";
document.body.appendChild(h);
BW.hud = h;
var v = document.createElement("div");
v.id = "bw-vig";
v.style.cssText = "position:fixed;inset:0;z-index:40;pointer-events:none;opacity:0;background:radial-gradient(ellipse at center,rgba(120,0,0,0) 55%,rgba(150,10,10,.85) 100%)";
document.body.appendChild(v);
BW.vig = v;
var dk = document.createElement("div");
dk.id = "bw-dark";
dk.style.cssText = "position:fixed;inset:0;z-index:41;pointer-events:none;opacity:0;background:#0A0806";
document.body.appendChild(dk);
BW.dark = dk;
}
var on = WLD.on === "battle" && walkMode;
BW.hud.style.display = on ? "block" : "none";
if (!on) {
BW.vig.style.opacity = "0";
BW.dark.style.opacity = "0";
bwPad(false);
bwLayout(false);
return;
}
var d = bwData(), k = bwHeldKey(), f = Math.max(0, BW.hp / BW.max), col = f > 0.5 ? "#6AC85A" : f > 0.25 ? "#E8B84A" : "#D8604A";
var M = BW.ride, mf = M ? Math.max(0, M.hp / M.max) : 0;
var html = "<div><b>⚔️ Vigour</b> " + Math.ceil(BW.hp) + " / " + BW.max + "</div><div style='height:7px;background:rgba(255,255,255,.12);border-radius:4px;margin:2px 0 4px'><div style='height:7px;width:" + Math.round(f * 100) + "%;background:" + col + ";border-radius:4px'></div></div>" +
(M ? "<div>" + M.T.label + " " + Math.ceil(M.hp) + " / " + M.max + "</div><div style='height:5px;background:rgba(255,255,255,.12);border-radius:3px;margin:2px 0 4px'><div style='height:5px;width:" + Math.round(mf * 100) + "%;background:#8AB8E8;border-radius:3px'></div></div>" : "") +
"<div>" + (M ? M.T.gun : k ? esc(BW_ARMS[k].name) : "Empty-handed") + (BW.block ? " · <b>blocking</b>" : "") + "</div>" +
"<div style='opacity:.8'>" + esc(bwRank(d.renown)) + " · renown " + d.renown + "</div>" +
(BW.wave ? "<div style='color:#FFD88A'>Trials: wave " + BW.wave.n + " of " + BW_WAVES.length + "</div>" : "") +
(BW.goldWon ? "<div style='color:#FFD27A'>💰 Won today: " + BW.goldWon.toLocaleString() + " gold</div>" : "") +
(bwHiddenNow() ? "<div style='color:#A8D88A'>🌿 Hidden in the thicket</div>" : BW.crouch ? "<div style='opacity:.85'>Crouching</div>" : "") +
(bwInTruce() ? "<div style='color:#BFE8BF'>Truce Ground: no fighting here</div>" : "") +
(bwTouch() ? "" : "<div style='opacity:.6;font-size:11px'>Hold click strike · right click block · 1-9, wheel or Q weapon · hold C crouch" + (M ? " · G get out" : "") + "</div>");
if (BW.hud.dataset.h !== html) {
BW.hud.dataset.h = html;
BW.hud.innerHTML = html;
}
bwPad(bwTouch());
bwLayout(bwTouch());
},
function (on) {
var bk = document.getElementById("t-back");
if (!on) {
if (BW.lay) {
BW.lay = 0;
if (bk)
bk.style.cssText = "";
if (BW.pad) {
var ps = BW.pad.style;
ps.top = ps.left = "";
ps.bottom = "calc(330px + env(safe-area-inset-bottom,0px))";
ps.right = "calc(14px + env(safe-area-inset-right,0px))";
ps.flexDirection = "column";
}
if (BW.hud) {
var hs = BW.hud.style;
hs.left = "12px";
hs.top = "204px";
hs.fontSize = "12.5px";
}
if (BW.h2 && BW.h2.feed)
BW.h2.feed.style.top = "";
}
return;
}
var now = performance.now();
if (BW.lay && now - BW.lay < 400)
return;
BW.lay = now;
if (!bk)
return;
var W = innerWidth, H = innerHeight, short = H < 520, skip = { "t-back": 1, "tbtns": 1, "bw-pad": 1, "bw-feed": 1, "bw-radar": 1, "bw-hud": 1, "bw-bar": 1 };
var top = [], low = [];
[].forEach.call(document.body.children, function (e) {
if (skip[e.id] || e.offsetParent === null && getComputedStyle(e).position !== "fixed")
return;
var r = e.getBoundingClientRect();
if (!r.width || !r.height || r.width > 320 || r.height > 140)
return;
if (r.right > W - 60 && r.top < H * 0.45)
top.push(r);
else if (r.left > W * 0.55 && r.bottom > H * 0.6)
low.push(r);
});
[].forEach.call(document.querySelectorAll("#tbtns button"), function (e) { if (e !== bk && e.offsetParent !== null) {
var r = e.getBoundingClientRect();
if (r.width)
low.push(r);
} });
var s = bk.style;
s.position = "fixed";
s.margin = "0";
s.bottom = "auto";
s.left = "auto";
var hud = BW.hud && BW.hud.style, pad = BW.pad && BW.pad.style;
if (!short) {
var under = 64;
top.forEach(function (r) { under = Math.max(under, r.bottom); });
s.top = Math.round(under + 14) + "px";
s.right = "calc(18px + env(safe-area-inset-right,0px))";
s.height = "54px";
s.minWidth = "62px";
if (pad) {
pad.top = pad.left = "";
pad.flexDirection = "column";
pad.right = "calc(14px + env(safe-area-inset-right,0px))";
var ph = BW.pad.offsetHeight || 148, want = 330;
if (H - want - ph < under + 14 + 54 + 60)
want = Math.max(110, H - (under + 14 + 54 + 60) - ph);
pad.bottom = Math.round(want) + "px";
}
if (hud) {
hud.left = "12px";
hud.top = "204px";
hud.fontSize = "12.5px";
}
if (BW.h2 && BW.h2.feed)
BW.h2.feed.style.top = Math.round(under + 14 + 54 + 10) + "px";
}
else {
var m = null;
top.forEach(function (r) { if (!m || r.top < m.top)
m = r; });
if (m && m.left > W * 0.5) {
s.top = Math.round(m.top) + "px";
s.right = Math.round(W - m.left + 12) + "px";
}
else {
s.top = "56px";
s.right = "calc(130px + env(safe-area-inset-right,0px))";
}
s.height = "44px";
s.minWidth = "72px";
if (pad) {
var lft = W - 14;
low.forEach(function (r) { lft = Math.min(lft, r.left); });
pad.flexDirection = "row";
pad.top = "auto";
pad.left = "auto";
pad.bottom = "calc(26px + env(safe-area-inset-bottom,0px))";
pad.right = Math.round(W - lft + 34) + "px";
}
if (hud) {
var rd = BW.h2 && BW.h2.radar, rr = rd && rd.offsetParent !== null ? rd.getBoundingClientRect() : null;
hud.left = Math.round(Math.max(150, rr ? rr.right + 10 : 0)) + "px";
hud.top = "52px";
hud.fontSize = "11.5px";
}
if (BW.h2 && BW.h2.feed)
BW.h2.feed.style.top = Math.round((m ? m.top : 56) + 52) + "px";
}
},
function (on) {
if (!on) {
if (BW.pad)
BW.pad.style.display = "none";
return;
}
if (!BW.pad) {
var p = document.createElement("div");
p.id = "bw-pad";
p.style.cssText = "position:fixed;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(330px + env(safe-area-inset-bottom,0px));z-index:46;display:flex;flex-direction:column;gap:8px;align-items:flex-end";
var mk = function (id, label) {
var b = document.createElement("button");
b.type = "button";
b.id = id;
b.textContent = label;
b.style.cssText = "min-width:86px;height:44px;border-radius:22px;border:1px solid #E8C66A;background:rgba(20,16,8,.86);color:#F4E2B0;font:600 14px var(--sans,system-ui);touch-action:none;user-select:none;-webkit-user-select:none";
p.appendChild(b);
return b;
};
var sw = mk("bw-swap", "⇄ Weapon"), bl = mk("bw-block", "Block"), cr = mk("bw-crouch", "Crouch"), out = mk("bw-out", "Get out");
var tap = function (b, fn) { var go = function (e) { e.preventDefault(); e.stopPropagation(); fn(); }; b.addEventListener("touchstart", go, { passive: false }); b.addEventListener("mousedown", go); };
tap(sw, bwNextWeapon);
tap(cr, function () { bwCrouch(!BW.crouch); });
tap(out, function () { bwDismount(); });
var hold = function (e) { e.preventDefault(); e.stopPropagation(); BW.block = true; bl.style.background = "rgba(201,160,64,.95)"; bl.style.color = "#17120A"; };
var rel = function (e) { if (e)
e.stopPropagation(); BW.block = false; bl.style.background = "rgba(20,16,8,.86)"; bl.style.color = "#F4E2B0"; };
bl.addEventListener("touchstart", hold, { passive: false });
bl.addEventListener("mousedown", hold);
["touchend", "touchcancel", "mouseup", "mouseleave"].forEach(function (t) { bl.addEventListener(t, rel); });
document.body.appendChild(p);
BW.pad = p;
}
BW.pad.style.display = "flex";
var o = document.getElementById("bw-out");
if (o)
o.style.display = BW.ride ? "block" : "none";
var b = document.getElementById("bw-block");
if (b)
b.style.display = BW.ride ? "none" : "block";
var c = document.getElementById("bw-crouch");
if (c)
c.style.display = BW.ride ? "none" : "block";
},
function (dt) {
BW.hurt = Math.max(0, BW.hurt - dt * 0.45);
BW.hurtShow += (Math.min(0.6, BW.hurt) - BW.hurtShow) * Math.min(1, dt * 3);
if (BW.vig)
BW.vig.style.opacity = String(Math.round(BW.hurtShow * 100) / 100);
if (BW.downT) {
BW.downT += dt;
if (BW.dark)
BW.dark.style.opacity = String(Math.min(0.88, BW.downT * 0.9));
if (BW.downT > 2.4)
bwRise();
}
else if (BW.fade > 0) {
BW.fade = Math.max(0, BW.fade - dt * 0.7);
if (BW.dark)
BW.dark.style.opacity = String(Math.round(BW.fade * 0.88 * 100) / 100);
}
},
function (dt) {
dt = Math.min(dt, 0.1);
BW.t += dt;
var L = worldLocal(), lite = typeof LITE !== "undefined" && LITE;
BW.cool = Math.max(0, BW.cool - dt);
if (!BW.ride && !bwHeldKey() && !BW.handT) {
BW.handT = 1;
var O = bwOwned();
if (O.length)
bwEquip(O[0].a.slice(3));
else
bwGive("longsword");
}
if (BW.handT) {
BW.handT -= dt;
if (BW.handT < 0)
BW.handT = 0;
}
BW.quietT += dt;
if (!BW.downT && BW.quietT > 5 && BW.hp < BW.max)
BW.hp = Math.min(BW.max, BW.hp + dt * (bwData().cls === "mage" ? 9 : 6));
if (bwInTruce() && BW.hp < BW.max && !BW.downT)
BW.hp = Math.min(BW.max, BW.hp + dt * 15);
var zoneAt = null;
BW_ZONES.forEach(function (Z) {
var d = Math.hypot(L.x - Z.x, L.z - Z.z), was = Z.active;
Z.active = d < Z.r + (was ? 170 : 130);
if (Z.active && !was)
bwZoneFill(Z);
if (d < Z.r + 10)
zoneAt = Z.k;
});
if (!BW.fillT || BW.t - BW.fillT > 6) {
BW.fillT = BW.t;
BW_ZONES.forEach(function (Z) { if (Z.active)
bwZoneFill(Z); });
}
if (!BW.dragon && BW.dragonBackAt && BW.t > BW.dragonBackAt && BW_Z.fang.active) {
BW.dragonBackAt = 0;
bwZoneFill(BW_Z.fang);
}
BW.zoneAt = zoneAt;
for (var i = BW.f.length - 1; i >= 0; i--) {
var F = BW.f[i], Z = BW_Z[F.zone];
var awake = !F.zone || (Z && Z.active);
if (F.g.visible !== awake)
F.g.visible = awake;
if (awake)
bwFTick(F, dt);
else if (F.st === "dead")
bwRemove(F);
}
BW.mach.forEach(function (M) { var Z = M.zone && BW_Z[M.zone]; var awake = M.pool || BW.ride === M || (Z && Z.active); if (M.g.visible !== awake)
M.g.visible = awake; if (awake)
bwMachTick(M, dt); });
bwShotsTick(dt);
bwFxTick(dt);
bwTrebTick(dt);
bwWaveTick(dt);
bwLiftTick(dt);
BW.ships.forEach(function (S) { S.a += dt * 0.025; S.g.position.set(S.cx + Math.cos(S.a) * S.R, S.y + Math.sin(BW.t * 0.2 + S.R) * 1.5, S.cz + Math.sin(S.a) * S.R); S.g.rotation.y = -S.a; S.prop.rotation.z += dt * 4; });
BW.planes.forEach(function (Q) { Q.a += dt * 0.22 * Q.dir; Q.g.position.set(Q.cx + Math.cos(Q.a) * Q.R, Q.y, Q.cz + Math.sin(Q.a) * Q.R); Q.g.rotation.set(0, -Q.a + (Q.dir > 0 ? 0 : Math.PI), Q.dir * 0.35); Q.prop.rotation.z += dt * 30; });
if (BW.flags)
BW.flags.forEach(function (f, k) { f.rotation.y = Math.sin(BW.t * 1.2 + k) * 0.25; });
if (BW.fires)
BW.fires.forEach(function (f, k) { f.scale.y = 0.85 + 0.25 * Math.abs(Math.sin(BW.t * 5 + k * 1.7)); });
if (BW.veil)
BW.veil.material.opacity = 0.26 + 0.06 * Math.sin(BW.t * 0.9);
if (BW.crowd)
BW.crowd.position.y = Math.abs(Math.sin(BW.t * (BW.wave ? 2.2 : 0.8))) * 0.15;
if (!lite)
BW.smokers.forEach(function (s) { s.t += dt; if (s.t > 1.4) {
s.t = 0;
var Z = null;
bwSmoke(s.x + (Math.random() - 0.5) * 3, 6, s.z + (Math.random() - 0.5) * 3, 6);
} });
var others = bwPvpList().length > 0 || (typeof presenceOthers !== "undefined" && Object.keys(presenceOthers).length > 0);
if (BW.t - BW.net.at > (others ? 0.9 : 4))
bwNetPoll();
if (BW.t - (BW.net.flushAt || 0) > 0.5) {
BW.net.flushAt = BW.t;
bwPvpFlush();
}
if (others && BW.t - BW.net.meAt > 10) {
BW.net.meAt = BW.t;
bwNetSend(null, { t: "me", s: bwMyTeam() });
}
bwVmSet();
bwVmTick(dt);
bwHudPaint();
bwScreenTick(dt);
bwTick2(dt);
if (BW_SAY_Q && Date.now() - BW.sayAt > 1100)
bwSay(BW_SAY_Q);
var Zn = zoneAt ? BW_Z[zoneAt] : null;
if (!(Zn && Zn.k === "fang" && BW.dragon && BW.dragon.st !== "dead" && Math.hypot(L.x - BW.dragon.x, L.z - BW.dragon.z) < 90))
worldBanner("<b>⚔️ Ironfray</b> · " + (bwInTruce() ? "the Muster Camp (Truce Ground)" : Zn ? esc(Zn.name) : "the open field"));
if (Zn && Zn.k !== BW.lastZone) {
BW.lastZone = Zn.k;
bwSay("<b>" + esc(Zn.name) + ".</b> " + esc(Zn.about));
}
else if (!Zn)
BW.lastZone = null;
if (BW.ride) {
worldPrompt(null);
return;
}
var got = null;
BW.talk.forEach(function (T) { if (!got && wNear(L.x, L.z, T.x, T.z, T.r))
got = T; });
if (!got)
BW.mach.forEach(function (M) { if (got || !M.alive)
return; if (!(M.pool || (bwData().banner === M.team && false)))
return; if (wNear(L.x, L.z, M.x, M.z, M.r + 2.4))
got = { name: "A " + M.T.name, verb: "climb in and drive it", fn: function () { bwMount(M); } }; });
if (got)
return worldPrompt("<b>" + esc(got.name) + "</b> · <b>press E</b> to " + esc(got.verb), got.fn);
worldPrompt(null);
},
function (opt) {
camera.position.set(BW.base, 1.72, 33);
yaw = 0;
pitch = 0.04;
BW.hp = BW.max = bwClass().hp || 100;
BW.downT = 0;
BW.fade = 0;
BW.hurt = 0;
if (!bwOwned().length)
bwGive("longsword", true);
var O = bwOwned();
if (O.length && !bwHeldKey())
bwEquip(O[0].a.slice(3));
BW.net.since = 0;
BW.net.at = -99;
BW.prevEnv = scene.environment;
var env = bwEnvMake((WLD.w && WLD.w.env) || { top: 0x2A3550, low: 0xC8906A });
if (env)
scene.environment = env;
setStatus("<b>Ironfray, the battle world.</b> You step through the War Gate into the Muster Camp: the Truce Ground, where nobody fights. The Armoury has every weapon; the Herald gives you a banner. Beyond the palisade, eight battlefields, and anything goes. (Back, or the gate behind you, goes home.)");
},
function () {
if (BW.ride)
bwDismount(true);
if (BW.wave)
bwWaveEnd(false);
if (BW.env && scene.environment === BW.env)
scene.environment = BW.prevEnv || null;
BW.lift = null;
BW.crouch = false;
BW_IN.fire = false;
WLD.hop = 0;
BW.block = false;
BW.downT = 0;
bwHud2Show(false);
if (BW.vm) {
scene.remove(BW.vm);
BW.vm = null;
BW.vmKey = null;
}
if (BW.vrHand && BW.vrHand.parent) {
BW.vrHand.parent.remove(BW.vrHand);
}
BW.vrHand = null;
BW.vrHandKey = null;
if (BW.hud) {
BW.hud.style.display = "none";
BW.vig.style.opacity = "0";
BW.dark.style.opacity = "0";
}
bwPad(false);
bwLayout(false);
BW.shots.forEach(function (s) { scene.remove(s.m); });
BW.shots = [];
BW.fx.forEach(function (f) { scene.remove(f.s); });
BW.fx = [];
bwSave(true);
},
function () {
if (WLD.on === "battle") {
bwHerald();
return;
}
var S = bwGateSpot();
if (!S) {
setStatus("Ironfray's War Gate stands in the Nightmare Wilds of Somnucor: join Somnucor first.");
return;
}
var r = typeof somnucorRealm === "function" && somnucorRealm();
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
guideTo = { key: "The War Gate", x: S.x, z: S.z };
setStatus("<b>The War Gate to Ironfray</b> stands in the Nightmare Wilds, just past the foot of the sector 3 stair: follow the pointer at the top of the screen. (Mind the nightmares out there.) Ironfray is for dreamers aged 18 and over; beat another dreamer there and you take a tenth of their purse.");
},
function (seed) {
var R = wRand(seed), N = 256, g = new Float32Array(N * N);
for (var i = 0; i < g.length; i++)
g[i] = R();
return function (x, y, P) {
var xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
fx = fx * fx * (3 - 2 * fx);
fy = fy * fy * (3 - 2 * fy);
var x0 = ((xi % P) + P) % P, y0 = ((yi % P) + P) % P, x1 = (x0 + 1) % P, y1 = (y0 + 1) % P;
var a = g[y0 * N + x0], b = g[y0 * N + x1], c = g[y1 * N + x0], d = g[y1 * N + x1];
return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
};
},
function (k) {
var S = bwLite() ? 256 : 512, n = bwNoise(k.charCodeAt(0) * 131 + k.length * 7), n2 = bwNoise(k.charCodeAt(1) * 97 + 3), R = wRand(k.length * 977 + k.charCodeAt(0));
var col = new Float32Array(S * S * 3), h = new Float32Array(S * S), o = [0, 0, 0, 0], fn = BW_SURFS[k] || BW_SURFS.plaster, ctx = fn.prep ? fn.prep(R, S) : null;
for (var y = 0; y < S; y++)
for (var x = 0; x < S; x++) {
o[0] = o[1] = o[2] = 0.8;
o[3] = 0.5;
fn(x / S, y / S, o, n, n2, ctx, S);
var i = y * S + x;
col[i * 3] = o[0];
col[i * 3 + 1] = o[1];
col[i * 3 + 2] = o[2];
h[i] = o[3];
}
var cv = document.createElement("canvas");
cv.width = cv.height = S;
var cx = cv.getContext("2d"), im = cx.createImageData(S, S), D = im.data;
for (var p = 0; p < S * S; p++) {
D[p * 4] = Math.min(255, col[p * 3] * 255);
D[p * 4 + 1] = Math.min(255, col[p * 3 + 1] * 255);
D[p * 4 + 2] = Math.min(255, col[p * 3 + 2] * 255);
D[p * 4 + 3] = 255;
}
cx.putImageData(im, 0, 0);
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (THREE.sRGBEncoding !== undefined)
t.encoding = THREE.sRGBEncoding;
try {
if (renderer && renderer.capabilities)
t.anisotropy = Math.min(bwLite() ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
BW_TEX[k] = t;
if (!bwLite()) {
var st = (BW_SURF[k] || [0, 0, 2])[2] * S / 128, nv = document.createElement("canvas");
nv.width = nv.height = S;
var nx = nv.getContext("2d"), ni = nx.createImageData(S, S), E = ni.data;
for (var yy = 0; yy < S; yy++)
for (var xx = 0; xx < S; xx++) {
var L = h[yy * S + (xx + S - 1) % S], Rr = h[yy * S + (xx + 1) % S], U = h[((yy + S - 1) % S) * S + xx], Dn = h[((yy + 1) % S) * S + xx];
var ax = -(Rr - L) * st, ay = (Dn - U) * st, l = Math.sqrt(ax * ax + ay * ay + 1), q = (yy * S + xx) * 4;
E[q] = (ax / l * 0.5 + 0.5) * 255;
E[q + 1] = (ay / l * 0.5 + 0.5) * 255;
E[q + 2] = (1 / l * 0.5 + 0.5) * 255;
E[q + 3] = 255;
}
nx.putImageData(ni, 0, 0);
var tn = new THREE.CanvasTexture(nv);
tn.wrapS = tn.wrapT = THREE.RepeatWrapping;
try {
tn.anisotropy = t.anisotropy;
}
catch (e) { }
BW_NRM[k] = tn;
}
},
function (k, o) {
o = o || {};
var key = "surf:" + k + ":" + (o.vc ? 1 : 0) + ":" + (o.col || "") + ":" + (o.ds ? 1 : 0);
if (BW.mats[key])
return BW.mats[key];
var P = BW_SURF[k] || [0.9, 0, 1], m;
if (bwLite())
m = new THREE.MeshLambertMaterial({ map: bwTex(k), vertexColors: !!o.vc });
else {
m = new THREE.MeshStandardMaterial({ map: bwTex(k), normalMap: bwNrm(k), roughness: P[0], metalness: P[1], vertexColors: !!o.vc });
m.normalScale = new THREE.Vector2(1, 1);
m.envMapIntensity = 0.55;
}
if (o.col !== undefined && o.col !== "")
m.color.setHex(o.col);
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.bwSurf = k;
return BW.mats[key] = m;
},
function (u, v, o, n, n2) {
var rows = 12, cols = 6, r = Math.floor(v * rows), lv = v * rows - r, off = (r % 2) * 0.5, cu = u * cols + off, c = Math.floor(cu), lu = cu - c, id = ((r * 31 + ((c % cols) + cols) % cols) * 7919) % 997 / 997;
var mu = Math.min(lu, 1 - lu) * 2.1, mv = Math.min(lv, 1 - lv), e = Math.min(mu, mv);
var chip = bwFbm(n, u, v, 16, 3), body = bwSmooth(0.05, 0.13 + chip * 0.06, e);
var g = 0.85 + 0.15 * bwFbm(n2, u, v, 32, 3), tone = id < 0.15 ? 0.62 : id < 0.4 ? 0.82 : 1, warm = 0.9 + id * 0.12;
var br = [0.72 * warm * tone * g, 0.40 * tone * g, 0.31 * tone * g], mo = [0.70, 0.67, 0.62];
var grime = 0.8 + 0.2 * bwFbm(n, u, v, 3, 3);
for (var i = 0; i < 3; i++)
o[i] = (mo[i] * (1 - body) + br[i] * body) * grime;
o[3] = body * (0.75 + 0.25 * bwFbm(n2, u, v, 24, 3)) - (1 - body) * 0.15;
},
function (u, v, o, n, n2) {
var planks = 4, p = Math.floor(u * planks), lu = u * planks - p, id = ((p * 53) % 17) / 17;
var gap = bwSmooth(0.0, 0.04, Math.min(lu, 1 - lu));
var gr = bwFbm(n, u * 1, v * 0.12, 16, 4), ring = 0.5 + 0.5 * Math.sin((lu * 9 + gr * 7 + id * 5) * Math.PI * 2);
var knot = id > 0.5 ? Math.max(0, 1 - Math.hypot((lu - 0.3 - id * 0.4) * 4, ((v * 2 + id) % 1 - 0.5) * 2.2) * 2.6) : 0;
var base = 0.8 + id * 0.12 - ring * 0.08 - knot * 0.2, weather = 0.85 + 0.15 * bwFbm(n2, u, v, 8, 3);
o[0] = 1.0 * base * weather;
o[1] = 0.9 * base * weather;
o[2] = 0.76 * base * weather;
o[3] = gap * (0.7 + ring * 0.12 + gr * 0.18 - knot * 0.2);
if (gap < 1) {
o[0] *= 0.4 + 0.6 * gap;
o[1] *= 0.4 + 0.6 * gap;
o[2] *= 0.4 + 0.6 * gap;
}
},
function (u, v, o, n, n2, ctx, S) {
var cols = 2, rows = 4, r = Math.floor(v * rows), off = (r % 2) * 0.5, cu = u * cols + off, lu = cu - Math.floor(cu), lv = v * rows - r;
var dx = (lu - 0.5) * 2, dy = (lv - 0.5) * 2, bulge = Math.max(0, 1 - Math.pow(Math.abs(dx), 3) - Math.pow(Math.abs(dy), 2.2));
var weave = 0.5 + 0.25 * Math.sin(u * S * 1.6) + 0.25 * Math.sin(v * S * 1.6), crease = bwFbm(n, u, v, 12, 3);
var dirt = 0.78 + 0.22 * bwFbm(n2, u, v, 6, 3), t = (0.82 + weave * 0.08) * dirt * (0.75 + bulge * 0.25);
o[0] = 0.80 * t;
o[1] = 0.72 * t;
o[2] = 0.55 * t;
o[3] = Math.sqrt(bulge) * 0.8 + weave * 0.05 + crease * 0.15;
},
function (u, v, o, n, n2) {
var rib = 0.5 + 0.5 * Math.cos(u * Math.PI * 2 * 8), f = bwFbm(n, u, v, 10, 5), streak = bwFbm(n2, u * 6, v * 0.4, 8, 3);
var rust = bwSmooth(0.52, 0.62, f * 0.7 + streak * 0.45 + (1 - v) * 0.08);
var paint = 0.78 + 0.1 * f, rc = [0.48 + 0.12 * f, 0.26 + 0.06 * f, 0.14];
for (var i = 0; i < 3; i++)
o[i] = paint * (1 - rust) + rc[i] * rust;
o[3] = rib * 0.7 + rust * 0.12 + f * 0.1;
},
function (u, v, o, n, n2) {
var r1 = 1 - Math.abs(bwFbm(n, u, v, 6, 5) * 2 - 1), f = bwFbm(n2, u, v, 16, 4), crack = bwSmooth(0.9, 0.97, r1);
var lichen = bwSmooth(0.72, 0.8, bwFbm(n2, u + 0.3, v, 8, 3)) * 0.6;
var t = (0.62 + f * 0.28) * (1 - crack * 0.5);
o[0] = t * (1 - lichen) + 0.62 * lichen * t * 1.2;
o[1] = t * 0.98 * (1 - lichen) + 0.66 * lichen * t * 1.2;
o[2] = t * 0.94 * (1 - lichen) + 0.40 * lichen * t * 1.2;
o[3] = r1 * 0.4 + f * 0.5 - crack * 0.5;
},
function (u, v, o, n, n2, ctx, S) {
var P = Math.round(S / 6), f = bwFbm(n, u, v, 8, 5), m = bwFbm(n2, u, v, 3, 3), peb = n2(u * P, v * P, P), pb = bwSmooth(0.74, 0.96, peb), grit = bwFbm(n, u, v, 64, 2);
var t = (0.74 + f * 0.2) * (0.82 + m * 0.22) * (0.94 + grit * 0.08);
t = t * (1 - pb) + (0.95 + f * 0.05) * pb;
o[0] = t;
o[1] = t * 0.95;
o[2] = t * 0.86;
o[3] = f * 0.45 + m * 0.3 + pb * 0.15 + grit * 0.05;
},
function (G, x, z, r, h, R, lite) {
var g = new THREE.ConeGeometry(r, h, lite ? 14 : 28, lite ? 4 : 8, true), P = g.attributes.position, n = bwNoise(Math.floor(R() * 9999));
for (var i = 0; i < P.count; i++) {
var px = P.getX(i), py = P.getY(i), pz = P.getZ(i), a = Math.atan2(pz, px), k = Math.max(0, Math.min(1, (py + h / 2) / h));
var rd = (1 + (bwFbm(n, a / 6.283, k * 0.7, 6, 4) - 0.5) * 0.9) * (0.85 + 0.3 * Math.pow(Math.abs(Math.sin(a * 2.5 + 1.3)), 2)), prof = Math.pow(1 - k, 1.7) / Math.max(0.001, 1 - k);
var ry = (bwFbm(n, a / 6.283 + 0.37, k, 4, 3) - 0.5) * h * 0.25 * Math.sin(k * Math.PI);
if (k > 0.999) {
rd = 0;
}
P.setXYZ(i, px * rd * prof * 1.5, py + ry, pz * rd * prof * 1.5);
}
g.computeVertexNormals();
var m = new THREE.Mesh(g, bwSurfMat("rock", { col: R() < 0.5 ? 0x8A8478 : 0x9A9286 }));
m.position.set(x, h / 2 - 12, z);
G.add(m);
bwPlanarUV(g, 40, null);
return m;
},
function (g, T, M) {
var P = g.attributes.position, N = g.attributes.normal, uv = g.attributes.uv, v = new THREE.Vector3(), w = new THREE.Vector3(), nm = M ? new THREE.Matrix3().getNormalMatrix(M) : null;
if (!uv || uv.itemSize !== 2) {
uv = new THREE.BufferAttribute(new Float32Array(P.count * 2), 2);
g.setAttribute("uv", uv);
}
for (var i = 0; i < P.count; i++) {
v.set(P.getX(i), P.getY(i), P.getZ(i));
w.set(N.getX(i), N.getY(i), N.getZ(i));
if (M) {
v.applyMatrix4(M);
w.applyMatrix3(nm);
}
var ax = Math.abs(w.x), ay = Math.abs(w.y), az = Math.abs(w.z);
if (ay >= ax && ay >= az)
uv.setXY(i, v.x / T, v.z / T);
else if (ax >= az)
uv.setXY(i, (w.x > 0 ? -v.z : v.z) / T, v.y / T);
else
uv.setXY(i, (w.z > 0 ? v.x : -v.x) / T, v.y / T);
}
uv.needsUpdate = true;
},
function (E) {
if (bwLite() || BW.env || typeof renderer === "undefined" || !renderer || !THREE.PMREMGenerator)
return BW.env || null;
try {
var sc = new THREE.Scene(), g = new THREE.SphereGeometry(50, 32, 16), P = g.attributes.position, C = new Float32Array(P.count * 3), c = new THREE.Color();
var top = new THREE.Color(E.top), low = new THREE.Color(E.low), sunC = new THREE.Color(E.sunCol || 0xFFE0B0), gr = new THREE.Color(E.hemiGround || 0x3A3028), d = new THREE.Vector3().fromArray(E.sunDir || [0.5, 0.4, -0.5]).normalize(), p = new THREE.Vector3();
for (var i = 0; i < P.count; i++) {
p.set(P.getX(i), P.getY(i), P.getZ(i)).normalize();
var y = p.y;
if (y >= 0)
c.copy(low).lerp(top, Math.pow(y, 0.6));
else
c.copy(low).lerp(gr, Math.min(1, -y * 4));
var s = Math.max(0, p.dot(d));
c.lerp(sunC, Math.pow(s, 6) * 0.85);
if (s > 0.985)
c.copy(sunC).multiplyScalar(3);
C[i * 3] = c.r;
C[i * 3 + 1] = c.g;
C[i * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(C, 3));
sc.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
var pm = new THREE.PMREMGenerator(renderer);
BW.env = pm.fromScene(sc, 0.02).texture;
pm.dispose();
g.dispose();
}
catch (e) {
BW.env = null;
}
return BW.env;
},
function (G) {
G.updateMatrixWorld(true);
var keep = [];
G.traverse(function (m) { if (!m.isMesh || m.isInstancedMesh || m.isSkinnedMesh)
return; var M = m.material; if (!M || Array.isArray(M) || !M.userData || !M.userData.bwTex)
return; keep.push(m); });
keep.forEach(function (m) {
var M = m.material, k = M.userData.bwTex, g = m.geometry;
if (!g.attributes.normal)
return;
var p = g.parameters || {};
var hsl = {};
M.color.getHSL(hsl);
if (hsl.l > 0.82 && hsl.s < 0.35)
k = "canvas";
else if (g.type === "CylinderGeometry" && p.radialSegments === 4 && p.radiusTop < 0.05)
k = "canvas";
else if (hsl.l < 0.16)
k = "rust";
g = m.geometry = g.clone();
bwPlanarUV(g, BW_TILE[k] || 2, m.matrixWorld);
var key = M.color.getHex();
m.material = bwSurfMat(k, { col: key, ds: M.side === THREE.DoubleSide });
m.castShadow = !bwLite();
m.receiveShadow = true;
});
},
function (tex, geo, x, y, z, rx, ry, rz, col, sx, sy, sz) {
var m = new THREE.Matrix4(), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)), sc = new THREE.Vector3(sx || 1, sy || sx || 1, sz || sx || 1);
m.compose(new THREE.Vector3(x, y, z), q, sc);
var g = geo.index ? geo.toNonIndexed() : geo;
g.applyMatrix4(m);
var cell = Math.floor(x / 120) + "," + Math.floor(z / 120), key = tex + "|" + cell;
(BW.batch[key] || (BW.batch[key] = { tex: tex, list: [] })).list.push({ g: g, col: col === undefined ? 0xD8D0C0 : col });
},
function (G) {
var shadows = !(typeof LITE !== "undefined" && LITE);
Object.keys(BW.batch).forEach(function (key) {
var B = BW.batch[key], n = 0;
B.list.forEach(function (e) { n += e.g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), col = new Float32Array(n * 3), o = 0, c = new THREE.Color(), T = BW_TILE[B.tex] || 2;
B.list.forEach(function (e) {
var P = e.g.attributes.position, N = e.g.attributes.normal;
c.setHex(e.col);
for (var i = 0; i < P.count; i++) {
var px = P.getX(i), py = P.getY(i), pz = P.getZ(i), nx = N.getX(i), ny = N.getY(i), nz = N.getZ(i);
pos[o * 3] = px;
pos[o * 3 + 1] = py;
pos[o * 3 + 2] = pz;
nor[o * 3] = nx;
nor[o * 3 + 1] = ny;
nor[o * 3 + 2] = nz;
var ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
if (ay >= ax && ay >= az) {
uv[o * 2] = px / T;
uv[o * 2 + 1] = pz / T;
}
else if (ax >= az) {
uv[o * 2] = pz / T;
uv[o * 2 + 1] = py / T;
}
else {
uv[o * 2] = px / T;
uv[o * 2 + 1] = py / T;
}
col[o * 3] = c.r;
col[o * 3 + 1] = c.g;
col[o * 3 + 2] = c.b;
o++;
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
var mat = bwSurfMat(B.tex, { vc: true, ds: B.tex === "leaf" });
var m = new THREE.Mesh(g, mat);
m.castShadow = shadows;
m.receiveShadow = true;
G.add(m);
});
BW.batch = {};
},
function (x, z, R) {
var n = 1 + Math.floor(R() * 3), a = R() * 3;
for (var i = 0; i < n; i++) {
var s = 0.9 + R() * 0.5, ox = (i === 2 ? 0.3 : i * 1.15 - 0.6), oy = i === 2 ? 1.25 : 0;
bwPut("wood", new THREE.BoxGeometry(s, s, s), x + Math.cos(a) * ox, bwH(x, z) + oy + s / 2, z + Math.sin(a) * ox, 0, a + R() * 0.3, 0, [0xB89060, 0xA88050, 0xC8A070][i % 3]);
}
bwSolid({ x: x, z: z, hw: 1.4, hd: 0.8, rot: -a, h: n > 2 ? 2.4 : 1.3, b: bwH(x, z) });
},
function (x, z, R) {
var a = R() * 3, L = 3 + Math.floor(R() * 4), rows = 2 + (R() < 0.5 ? 1 : 0);
for (var r = 0; r < rows; r++)
for (var i = 0; i < L; i++) {
var t = (i - (L - 1) / 2) * 0.85 + (r % 2) * 0.42, c = Math.cos(a), s = Math.sin(a), bend = (t * t) * 0.06;
bwPut("sand", new THREE.SphereGeometry(0.5, 8, 5), x + c * t - s * bend, bwH(x, z) + 0.22 + r * 0.4, z + s * t + c * bend, 0, -a, 0, 0xC8B890, 0.85, 0.42, 0.5);
}
bwSolid({ x: x, z: z, hw: L * 0.43, hd: 0.45, rot: -a, h: rows * 0.4 + 0.1, b: bwH(x, z) });
},
function (x, z, R) {
var s = 1.2 + R() * 2.4, g = new THREE.DodecahedronGeometry(s, 0), p = g.attributes.position;
for (var i = 0; i < p.count; i++)
p.setXYZ(i, p.getX(i) * (0.8 + R() * 0.4), p.getY(i) * (0.6 + R() * 0.4), p.getZ(i) * (0.8 + R() * 0.4));
g.computeVertexNormals();
bwPut("rock", g, x, bwH(x, z) + s * 0.35, z, 0, R() * 3, 0, [0x9A948C, 0x8A8680, 0xA8A096][Math.floor(R() * 3)]);
bwSolid({ x: x, z: z, r: s * 0.85, h: s * 1.1, b: bwH(x, z) });
},
function (x, z, R, tex) {
var a = R() * 3, L = 4 + R() * 5, h = 1.6 + R() * 2.2, y = bwH(x, z), c = Math.cos(a), s = Math.sin(a);
bwPut(tex || "brick", new THREE.BoxGeometry(L, h, 0.6), x, y + h / 2, z, 0, -a, 0, 0xD8C8B8);
for (var k = 0; k < 3; k++) {
var t = (R() - 0.5) * L * 0.8, hh = 0.4 + R() * 0.9;
bwPut(tex || "brick", new THREE.BoxGeometry(0.6 + R() * 1.2, hh, 0.6), x + c * t, y + h + hh / 2, z + s * t, 0, -a, 0, 0xD0C0B0);
}
bwPut(tex || "brick", new THREE.BoxGeometry(1.2, 0.5, 0.9), x + c * (L / 2 + 0.8), y + 0.25, z + s * (L / 2 + 0.8), 0.2, -a + 0.4, 0, 0xC8B8A8);
bwSolid({ x: x, z: z, hw: L / 2, hd: 0.35, rot: -a, h: h, b: y });
},
function (x, z, R) {
var n = 2 + Math.floor(R() * 3), y = bwH(x, z);
for (var i = 0; i < n; i++) {
var a = i / n * 6.28 + R(), bx = x + Math.cos(a) * 0.6, bz = z + Math.sin(a) * 0.6, red = R() < 0.4;
bwPut(red ? "rust" : "wood", new THREE.CylinderGeometry(0.42, 0.42, 1.1, 10), bx, y + 0.55, bz, 0, 0, 0, red ? 0xB84A30 : 0xA87A50);
}
bwSolid({ x: x, z: z, r: 1.1, h: 1.1, b: y });
},
function (x, z, R) {
var a = R() * 3, y = bwH(x, z), c = Math.cos(a), s = Math.sin(a), n = 2 + Math.floor(R() * 3);
for (var i = 0; i < n; i++) {
var t = (i - (n - 1) / 2) * 2.1;
bwPut("concrete", new THREE.CylinderGeometry(0.25, 0.5, 1.1, 4, 1), x + c * t, y + 0.55, z + s * t, 0, -a + Math.PI / 4, 0, 0xC8C4BC, 1, 1, 2.6);
}
bwSolid({ x: x, z: z, hw: n * 1.05, hd: 0.5, rot: -a, h: 1.1, b: y });
},
function (x, z, R) {
var a = R() * 3, y = bwH(x, z), c = Math.cos(a), s = Math.sin(a);
bwPut("wood", new THREE.BoxGeometry(3.2, 0.9, 1.6), x, y + 0.9, z, 0.25, -a, 0.2, 0x8A6A48);
bwPut("wood", new THREE.CylinderGeometry(0.6, 0.6, 0.15, 12), x + c * 1.1 - s * 0.9, y + 0.6, z + s * 1.1 + c * 0.9, Math.PI / 2, -a, 0, 0x6A4A30);
bwPut("wood", new THREE.CylinderGeometry(0.6, 0.6, 0.15, 12), x - c * 1.4 + s * 0.9, y + 0.2, z - s * 1.4 - c * 0.9, 0.2, -a, 1.3, 0x6A4A30);
bwSolid({ x: x, z: z, hw: 1.6, hd: 0.8, rot: -a, h: 1.5, b: y });
},
function (x, z, R, tex) {
var y = bwH(x, z), h = 1.5 + R() * 4;
bwPut(tex || "stone", new THREE.CylinderGeometry(0.7, 0.8, h, 10), x, y + h / 2, z, 0, 0, (R() - 0.5) * 0.1, 0xD8D0C0);
bwPut(tex || "stone", new THREE.CylinderGeometry(0.7, 0.7, 1.6, 10), x + 1.6, y + 0.6, z + 0.5, Math.PI / 2, R() * 3, 0, 0xD0C8B8);
bwSolid({ x: x, z: z, r: 0.8, h: h, b: y });
bwSolid({ x: x + 1.6, z: z + 0.5, r: 0.7, h: 1.3, b: y });
},
function (x, z, R, col) {
var y = bwH(x, z), n = 5 + Math.floor(R() * 4), r = 2.2 + R() * 1.6;
for (var i = 0; i < n; i++) {
var a = i / n * 6.28 + R(), d = R() * r * 0.7;
bwPut("leaf", new THREE.IcosahedronGeometry(1.1 + R() * 0.8, 0), x + Math.cos(a) * d, y + 0.8 + R() * 0.6, z + Math.sin(a) * d, 0, R() * 3, 0, col || [0x5A7A3A, 0x4E6E34, 0x667E42][i % 3], 1, 0.8, 1);
}
BW.bushes.push({ x: x, z: z, r: r });
},
function (x, z, R) {
var y = bwH(x, z), s = 1.2 + R() * 0.8;
bwPut("rock", new THREE.SphereGeometry(1.2, 8, 6), x, y + 0.9 * s, z, 0, R() * 3, 0, 0xE0D8C0, s, s * 0.9, s * 1.1);
for (var i = 0; i < 4; i++)
bwPut("rock", new THREE.TorusGeometry(1.6 * s, 0.15, 4, 8, Math.PI), x + (i - 1.5) * 0.8, y, z + 2 * s, 0, Math.PI / 2, 0, 0xD8D0B8);
bwSolid({ x: x, z: z, r: 1.3 * s, h: 2 * s, b: y });
},
function (x, z, R) {
var a = R() * 3, y = bwH(x, z), c = Math.cos(a), s = Math.sin(a);
[-1, 1].forEach(function (k) { bwPut("wood", new THREE.BoxGeometry(4, 1.9, 0.3), x - s * k * 1.4, y + 0.95, z + c * k * 1.4, 0, -a, 0, 0x8A6A48); bwSolid({ x: x - s * k * 1.4, z: z + c * k * 1.4, hw: 2, hd: 0.15, rot: -a, h: 1.9, b: y }); });
bwPut("wood", new THREE.BoxGeometry(0.3, 1.9, 2.8), x - c * 1.9, y + 0.95, z - s * 1.9, 0, -a, 0, 0x8A6A48);
bwSolid({ x: x - c * 1.9, z: z - s * 1.9, hw: 0.15, hd: 1.4, rot: -a, h: 1.9, b: y });
bwPut("sand", new THREE.BoxGeometry(4.6, 0.5, 3.4), x, y + 2.1, z, 0, -a, 0, 0xB8A880);
},
function (x, z, pad, Z) {
var r = Math.hypot(x, z);
if (r < BW_TRUCE + 6 || r > 410)
return false;
if (Z) {
if (Z.arena) {
var da = Math.hypot(x - Z.x, z - Z.z);
if (da > 48 || da < 6)
return false;
}
if (Z.k === "ruins" && Math.abs(z - Z.z) < 6 && Math.abs(x - Z.x) < 90 && Math.random() < 0.8)
return false;
if (Z.k === "pass" && Math.abs(z) < 4.5)
return false;
var sp = Z.sp;
for (var t in sp)
if (Math.hypot(x - sp[t].x, z - sp[t].z) < 7)
return false;
if (Z.k === "siege") {
var cx = Z.x, cz = Z.z - 40;
if (Math.abs(x - cx) < 42 && Math.abs(z - cz) < 42)
return Math.abs(x - cx) < 30 && Math.abs(z - cz) < 30 && Math.hypot(x - cx, z - (cz - 12)) > 14;
}
}
if (Math.hypot(x - (BW.crag ? BW.crag.x : 0), z - (BW.crag ? BW.crag.z : 0)) < 18)
return false;
for (var dx = -1; dx <= 1; dx++)
for (var dz = -1; dz <= 1; dz++)
if (bwSolidAt(x + dx * pad, z + dz * pad, 0.5))
return false;
for (var i = 0; i < BW.mach.length; i++)
if (Math.hypot(x - BW.mach[i].x, z - BW.mach[i].z) < 6)
return false;
for (var j = 0; j < BW.talk.length; j++)
if (Math.hypot(x - BW.talk[j].x, z - BW.talk[j].z) < 6)
return false;
return true;
},
function (G) {
var lite = typeof LITE !== "undefined" && LITE, k = lite ? 0.5 : 1;
Object.keys(BW_COVER).forEach(function (zk) {
var Z = BW_Z[zk], R = wRand(9000 + zk.length * 131 + zk.charCodeAt(0)), list = BW_COVER[zk];
list.forEach(function (e) {
var want = Math.max(1, Math.round(e[1] * k)), got = 0, tries = 0;
while (got < want && tries < want * 14) {
tries++;
var x, z;
if (Z) {
var a = R() * 6.28, d = Math.sqrt(R()) * (Z.arena ? 46 : Z.r);
x = Z.x + Math.cos(a) * d;
z = Z.z + Math.sin(a) * d;
if (Z.sky) {
var p = BW.plat[Math.floor(R() * BW.plat.length)];
if (p && R() < 0.6) {
var a2 = R() * 6.28, d2 = R() * (p.r - 1.5);
x = p.x + Math.cos(a2) * d2;
z = p.z + Math.sin(a2) * d2;
if (e[0] === "crates" || e[0] === "barrels") {
bwCoverOn(p, x, z, e[0], R);
got++;
continue;
}
continue;
}
}
}
else {
var a3 = R() * 6.28, d3 = 60 + R() * 340;
x = Math.cos(a3) * d3;
z = Math.sin(a3) * d3;
if (BW_ZONES.some(function (Q) { return Math.hypot(x - Q.x, z - Q.z) < Q.r + 8; }))
continue;
}
if (!bwCoverOK(x, z, 1.8, Z))
continue;
BW_CV[e[0]](x, z, R, e[2]);
got++;
}
});
});
},
function (G) {
if (typeof LITE !== "undefined" && LITE)
return;
var n = 9000, geo = new THREE.ConeGeometry(0.07, 0.6, 3);
geo.translate(0, 0.3, 0);
var mat = new THREE.MeshLambertMaterial({ color: 0x8A9A50 }), im = new THREE.InstancedMesh(geo, mat, n), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color(), R = wRand(515), k = 0;
for (var t = 0; t < n * 3 && k < n; t++) {
var a = R() * 6.28, d = 55 + R() * 350, x = Math.cos(a) * d, z = Math.sin(a) * d, gc = bwGroundCol(x, z);
if (gc !== 0x5A5E3A && gc !== 0x5E6A3A && gc !== 0x6A7A4A && gc !== 0x4A6A3A)
continue;
e.set((R() - 0.5) * 0.5, R() * 6, (R() - 0.5) * 0.5);
q.setFromEuler(e);
var s = 0.7 + R() * 0.9;
m.compose(new THREE.Vector3(x, bwH(x, z), z), q, new THREE.Vector3(s, s * (0.8 + R() * 0.8), s));
im.setMatrixAt(k, m);
c.setHSL(0.18 + R() * 0.07, 0.35, 0.28 + R() * 0.14);
im.setColorAt(k, c);
k++;
}
im.count = k;
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.receiveShadow = true;
G.add(im);
},
function (G) {
var lite = typeof LITE !== "undefined" && LITE, n = lite ? 120 : 360, pos = new Float32Array(n * 3), R = wRand(77);
for (var i = 0; i < n; i++) {
pos[i * 3] = (R() - 0.5) * 90;
pos[i * 3 + 1] = R() * 30;
pos[i * 3 + 2] = (R() - 0.5) * 90;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var p = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xFFA060, size: 0.22, map: bwGlowTex(), transparent: true, opacity: 0.6, depthWrite: false }));
p.frustumCulled = false;
G.add(p);
BW.embers = p;
},
function (dt) {
var p = BW.embers;
if (!p)
return;
var L = worldLocal(), a = p.geometry.attributes.position, A = a.array;
for (var i = 0; i < a.count; i++) {
A[i * 3 + 1] += dt * (0.5 + (i % 7) * 0.12);
A[i * 3] += Math.sin(BW.t * 0.3 + i) * dt * 0.3;
var dx = A[i * 3] - L.x, dz = A[i * 3 + 2] - L.z;
if (A[i * 3 + 1] > 30 || dx > 45 || dx < -45 || dz > 45 || dz < -45) {
A[i * 3] = L.x + (Math.random() - 0.5) * 90;
A[i * 3 + 2] = L.z + (Math.random() - 0.5) * 90;
A[i * 3 + 1] = bwH(A[i * 3], A[i * 3 + 2]);
}
}
a.needsUpdate = true;
},
function (x, y, z, n, big) {
if (!BW_BLOOD)
return;
for (var i = 0; i < n && BW.fx.length < 140; i++) {
var s = bwGlow(i % 2 ? 0x7A0A0A : 0x9A1410, 0.35 + Math.random() * 0.3, 0.7, false);
s.position.set(BW.base + x + (Math.random() - 0.5) * 0.4, y, z + (Math.random() - 0.5) * 0.4);
scene.add(s);
BW.fx.push({ s: s, t: 0, life: 0.9, grow: 0.3, op: 0.7, rise: -1.4, size: 0.35, v: new THREE.Vector3((Math.random() - 0.5) * 1.6, 0.6, (Math.random() - 0.5) * 1.6) });
}
var D = BW.stains || (BW.stains = []), max = (typeof LITE !== "undefined" && LITE) ? 20 : 60;
var m = D.length >= max ? D.shift() : null;
if (!m) {
m = { mesh: new THREE.Mesh(new THREE.CircleGeometry(1, 18), new THREE.MeshBasicMaterial({ color: 0x5A0808, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 })) };
m.mesh.rotation.x = -Math.PI / 2;
BW.G.add(m.mesh);
}
var r = (big ? 0.7 : 0.3) + Math.random() * 0.3;
m.mesh.scale.set(r, r * (0.7 + Math.random() * 0.5), 1);
m.mesh.rotation.z = Math.random() * 6;
m.mesh.position.set(x + (Math.random() - 0.5) * 0.6, bwSupport(x, z, y) + 0.03, z + (Math.random() - 0.5) * 0.6);
m.t = 0;
m.mesh.material.opacity = 0.75;
m.mesh.visible = true;
D.push(m);
},
function () {
if (typeof flkOn === "function" && flkOn())
return { ok: false, say: "Ironfray is closed on this device: the teacher / parent lock is on." };
if (!(typeof signedIn === "function" && signedIn()))
return { ok: false, say: "Ironfray is for dreamers aged 18 and over: sign in first." };
if (typeof ageAdult === "function" && !ageAdult())
return { ok: false, say: "Ironfray is for dreamers aged 18 and over." };
return { ok: true };
},
function (src) {
if (!(src && src.pvp && src.id))
return false;
if (BW.net.no84 || typeof cityRpc !== "function") {
bwNetSend(src.id, { t: "down" });
return true;
}
cityRpc("battle_beaten", { p_by: src.id }).then(function (o) {
if (o && o.ok && o.gold > 0) {
bwFeed("💰 " + esc(o.by || src.name || "A dreamer") + " took " + o.gold.toLocaleString() + " gold from you", "#FF9A7A");
bwSay("<b>" + esc(o.by || src.name || "They") + " took " + o.gold.toLocaleString() + " gold</b> from your purse.", true);
if (typeof refreshStanding === "function")
refreshStanding();
}
else if (o && !o.ok && o.say)
bwSay(esc(o.say));
}).catch(function (e) { if (/function|404|PGRST|does not exist|schema cache/i.test(String((e && e.message) || e))) {
BW.net.no84 = true;
bwNetSend(src.id, { t: "down" });
} });
return true;
},
function (r) {
var b = r.body || {}, g = +b.gold || 0;
bwRenown(25);
bwData().kills++;
BW.goldWon = (BW.goldWon || 0) + g;
bwFeed("⚔️ You beat " + esc(r.name || "a dreamer") + (g ? " · +" + g.toLocaleString() + " gold" : ""), "#FFD88A");
bwSay("<b>You beat " + esc(r.name || "a dreamer") + "!</b> +25 renown" + (g ? ", and " + g.toLocaleString() + " gold from their purse" : "") + ".", true);
if (g && typeof refreshStanding === "function")
refreshStanding();
},
function () {
if (BW.h2)
return;
var css = document.createElement("style");
css.id = "bw-css";
css.textContent = "#bw-x{position:fixed;left:50%;top:50%;width:0;height:0;z-index:43;pointer-events:none}" +
"#bw-x i{position:absolute;background:rgba(255,240,220,.9);box-shadow:0 0 2px #000}" +
"#bw-x .d{left:-1.5px;top:-1.5px;width:3px;height:3px;border-radius:2px}" +
"#bw-x .hm{position:absolute;left:-11px;top:-11px;width:22px;height:22px;opacity:0;background:none;box-shadow:none}" +
"#bw-x .hm:before,#bw-x .hm:after{content:'';position:absolute;left:10px;top:-1px;width:2px;height:24px;background:#fff;transform:rotate(45deg)}#bw-x .hm:after{transform:rotate(-45deg)}" +
"#bw-x .hm.k:before,#bw-x .hm.k:after{background:#FF6A5A}" +
".bw-dir{position:fixed;left:50%;top:50%;width:0;height:0;z-index:42;pointer-events:none}.bw-dir b{position:absolute;left:-60px;top:-118px;width:120px;height:26px;border-radius:60px 60px 0 0;border-top:5px solid rgba(220,30,20,.9);opacity:0}" +
"#bw-bar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(64px + env(safe-area-inset-bottom,0px));z-index:45;display:flex;gap:5px;pointer-events:auto}" +
"#bw-bar div{position:relative;width:58px;height:50px;border-radius:7px;background:rgba(14,10,8,.82);border:1px solid rgba(200,138,90,.55);color:#F4E8D8;font:600 10.5px/1.15 var(--sans,system-ui);text-align:center;padding-top:4px;cursor:pointer;overflow:hidden;box-sizing:border-box}" +
"#bw-bar div.on{border-color:#FFD27A;background:rgba(60,40,14,.92);box-shadow:0 0 0 1px #FFD27A}#bw-bar div em{display:block;font-style:normal;font-size:17px}#bw-bar div s{position:absolute;left:3px;top:1px;font-size:9px;opacity:.6;text-decoration:none}" +
"#bw-bar div u{position:absolute;left:0;bottom:0;height:3px;background:#FFD27A;text-decoration:none}" +
"#bw-radar{position:fixed;right:12px;top:84px;z-index:44;border-radius:50%;pointer-events:none;background:rgba(10,8,6,.55);border:1px solid rgba(200,138,90,.6)}" +
"#bw-feed{position:fixed;right:12px;top:248px;z-index:44;width:230px;pointer-events:none;font:12px/1.35 var(--sans,system-ui);text-align:right}" +
"#bw-feed div{margin:3px 0;padding:3px 7px;border-radius:5px;background:rgba(14,10,8,.75);display:inline-block;float:right;clear:both;transition:opacity 1.5s}" +
"body.touch #bw-bar{bottom:calc(150px + env(safe-area-inset-bottom,0px));max-width:calc(100vw - 210px);overflow-x:auto}body.touch #bw-bar div{width:50px;height:46px}" +
"body.touch #bw-radar{right:auto;left:12px;top:auto;bottom:calc(250px + env(safe-area-inset-bottom,0px))}body.touch #bw-feed{top:200px;width:180px;font-size:11px}";
document.head.appendChild(css);
var x = document.createElement("div");
x.id = "bw-x";
x.innerHTML = "<i class='d'></i><i class='t' style='left:-1px;width:2px;height:7px'></i><i class='b' style='left:-1px;width:2px;height:7px'></i><i class='l' style='top:-1px;height:2px;width:7px'></i><i class='r' style='top:-1px;height:2px;width:7px'></i><i class='hm'></i>";
document.body.appendChild(x);
var dir = document.createElement("div");
dir.className = "bw-dir";
dir.id = "bw-dir";
dir.innerHTML = "<b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b>";
document.body.appendChild(dir);
[].forEach.call(dir.children, function (b, i) { b.style.transform = "rotate(" + (i * 45) + "deg)"; b.style.transformOrigin = "60px 118px"; });
var bar = document.createElement("div");
bar.id = "bw-bar";
document.body.appendChild(bar);
bar.addEventListener("click", function (e) { var t = e.target.closest && e.target.closest("[data-k]"); if (t) {
e.stopPropagation();
bwEquip(t.getAttribute("data-k"));
} });
bar.addEventListener("touchstart", function (e) { var t = e.target.closest && e.target.closest("[data-k]"); if (t) {
e.preventDefault();
e.stopPropagation();
bwEquip(t.getAttribute("data-k"));
} }, { passive: false });
var rc = document.createElement("canvas");
rc.id = "bw-radar";
document.body.appendChild(rc);
var feed = document.createElement("div");
feed.id = "bw-feed";
document.body.appendChild(feed);
BW.h2 = { x: x, dir: dir, bar: bar, radar: rc, feed: feed, dirv: [0, 0, 0, 0, 0, 0, 0, 0], hm: 0, hk: 0, rAt: 0 };
},
function (html, col) {
bwHud2Build();
var f = BW.h2.feed, d = document.createElement("div");
d.innerHTML = html;
if (col)
d.style.color = col;
f.insertBefore(d, f.firstChild);
while (f.children.length > 5)
f.removeChild(f.lastChild);
setTimeout(function () { d.style.opacity = "0"; setTimeout(function () { if (d.parentNode)
d.parentNode.removeChild(d); }, 1600); }, 6000);
},
function (dt) {
var H = BW.h2;
if (!H)
return;
var sp = 4 + Math.min(14, BW.heat * 12 + (BW.crouch ? -1 : 0) + (BW.swing * 6));
var q = H.x.children;
q[1].style.top = (-sp - 7) + "px";
q[2].style.top = sp + "px";
q[3].style.left = (-sp - 7) + "px";
q[4].style.left = sp + "px";
H.hm = Math.max(0, H.hm - dt * 2.5);
H.hk = Math.max(0, H.hk - dt * 1.2);
var hm = q[5];
hm.style.opacity = String(Math.round(Math.min(1, Math.max(H.hm, H.hk)) * 100) / 100);
hm.className = "hm" + (H.hk > 0 ? " k" : "");
for (var i = 0; i < 8; i++) {
H.dirv[i] = Math.max(0, H.dirv[i] - dt * 0.8);
H.dir.children[i].style.opacity = String(Math.round(H.dirv[i] * 80) / 100);
}
var O = bwOwned(), cur = bwHeldKey(), h = "";
O.slice(0, 9).forEach(function (o, n) {
var k = o.a.slice(3), A = BW_ARMS[k];
var cd = k === cur && A ? Math.max(0, Math.min(1, BW.cool / (A.cool || 1))) : 0;
h += "<div data-k='" + k + "' class='" + (k === cur ? "on" : "") + "'><s>" + ((typeof CBT !== "undefined" && CBT.on) ? (n < 5 ? n + 5 : "") : (n + 1)) + "</s><em>" + (BW_ERA_ICON[A.era] || "⚔️") + "</em>" + esc(A.name.replace(/^(Twin |Gladiator's |Bolt-action |Trench |Flame |Staff of |Flanged )/, "")) + (cd > 0.02 ? "<u style='width:" + Math.round((1 - cd) * 100) + "%'></u>" : "") + "</div>";
});
if (H.bar.dataset.h !== h) {
H.bar.dataset.h = h;
H.bar.innerHTML = h;
}
if (BW.t - H.rAt > 0.2) {
H.rAt = BW.t;
bwRadarPaint();
}
},
function () {
var c = BW.h2.radar, touch = bwTouch(), S = touch ? 112 : 150, R = touch ? 55 : 70;
if (c.width !== S * 2 || c.height !== S * 2) {
c.width = c.height = S * 2;
c.style.width = c.style.height = S + "px";
}
var x = c.getContext("2d"), L = worldLocal(), k = S / (2 * R), my = bwMyTeam();
x.setTransform(2, 0, 0, 2, 0, 0);
x.clearRect(0, 0, S, S);
x.save();
x.beginPath();
x.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
x.clip();
var cs = Math.cos(yaw), sn = Math.sin(yaw);
function P(px, pz) { var dx = px - L.x, dz = pz - L.z; return [S / 2 + (dx * cs - dz * sn) * k, S / 2 + (dx * sn + dz * cs) * k]; }
x.strokeStyle = "rgba(200,180,140,.25)";
x.lineWidth = 1;
[R / 3, R * 2 / 3].forEach(function (r) { x.beginPath(); x.arc(S / 2, S / 2, r * k, 0, Math.PI * 2); x.stroke(); });
var cp = P(0, 0);
x.strokeStyle = "rgba(140,220,140,.5)";
x.beginPath();
x.arc(cp[0], cp[1], BW_TRUCE * k, 0, Math.PI * 2);
x.stroke();
BW.bushes.forEach(function (b) { if (Math.abs(b.x - L.x) > R + 5 || Math.abs(b.z - L.z) > R + 5)
return; var p = P(b.x, b.z); x.fillStyle = "rgba(90,130,70,.35)"; x.beginPath(); x.arc(p[0], p[1], b.r * k, 0, Math.PI * 2); x.fill(); });
BW.f.forEach(function (F) {
if (F.st === "dead" || F.team === "dummy")
return;
var dx = F.x - L.x, dz = F.z - L.z;
if (dx * dx + dz * dz > R * R)
return;
var p = P(F.x, F.z), foe = bwHostile(my, F.team);
x.fillStyle = F.k.boss ? "#FF4A2A" : foe ? "#E86A5A" : "#7AB0FF";
x.beginPath();
x.arc(p[0], p[1], F.k.big ? 3.2 : 2.2, 0, Math.PI * 2);
x.fill();
});
BW.mach.forEach(function (M) { if (!M.alive || !M.g.visible)
return; var dx = M.x - L.x, dz = M.z - L.z; if (dx * dx + dz * dz > R * R)
return; var p = P(M.x, M.z); x.fillStyle = M.pool ? "#C8C8A0" : bwHostile(my, M.team) ? "#E86A5A" : "#7AB0FF"; x.fillRect(p[0] - 3, p[1] - 3, 6, 6); });
bwPvpList().forEach(function (q) { var p = P(q.g.position.x - BW.base, q.g.position.z); x.fillStyle = "#FFD27A"; x.beginPath(); x.moveTo(p[0], p[1] - 4); x.lineTo(p[0] + 3.5, p[1] + 3); x.lineTo(p[0] - 3.5, p[1] + 3); x.fill(); });
x.restore();
x.fillStyle = "#fff";
x.beginPath();
x.moveTo(S / 2, S / 2 - 6);
x.lineTo(S / 2 + 4, S / 2 + 4);
x.lineTo(S / 2 - 4, S / 2 + 4);
x.fill();
x.fillStyle = "rgba(244,232,216,.8)";
x.font = "10px system-ui";
x.textAlign = "center";
x.fillText("N", S / 2 + sn * (S / 2 - 9), S / 2 - cs * (S / 2 - 9) + 3);
},
function (dt) {
if (BW_IN.fire && (!document.pointerLockElement || BW.downT))
BW_IN.fire = false;
if (BW_IN.fire)
bwAttack();
if (!BW.ride && !BW.lift) {
var want = BW.crouch ? -0.75 : 0;
if (WLD.hop !== want && Math.abs(WLD.hop - want) < 0.01)
WLD.hop = want;
else
WLD.hop += (want - WLD.hop) * Math.min(1, dt * 10);
}
bwHud2Show(WLD.on === "battle" && walkMode);
bwHud2Tick(dt);
bwEmbersTick(dt);
bwStainsTick(dt);
bwBeamsTick(dt);
for (var si = 0; si < BW.f.length; si++) {
var SF = BW.f[si];
if (SF.summon && SF.st !== "dead" && (BW.t > SF.ttl || WLD.on !== "battle" || !BW.zoneAt)) {
SF.st = "dead";
SF.t = 0;
bwAct(SF.g, "fall", 1e9);
}
}
}
];
});
