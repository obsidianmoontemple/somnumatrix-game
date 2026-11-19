/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(292, function () {
"use strict";
return [
function (G, L) {
var steel = ppM(0x3A3A48), black = ppM(0x141418), wood = ppM(0x6A4A30), canvas = ppM(0xE8E0D0);
[-7, 7].forEach(function (z) { ppBox(2, 10, 2, ppM(0x6A3A8A), -80, 5, z, G); ppSolid(-80, z, 1, 1); ppSph(1.3, ppM(0xFFD27A, { e: 0x4A3010 }), -80, 10.6, z, G, 12); });
ppBox(1, 2.2, 16, ppM(0x6A3A8A), -80, 9, 0, G);
ppSign(G, ["JUBILEE FESTIVAL GROUNDS", "Two stages · rides · games"], 13, 2, -79.4, 9, 0, Math.PI / 2, "#1A0E2A", "#FFD9A0");
var S = { x0: -306, x1: -280, z0: -20, z1: 20, h: 2.2 };
ppBox(S.x1 - S.x0, S.h, S.z1 - S.z0, black, (S.x0 + S.x1) / 2, S.h / 2, 0, G);
ppPad(S.x0, S.x1, S.z0, S.z1, S.h);
ppRamp(-302, -296, 20, 26, S.h, 0, "z");
ppBox(6, 0.2, 6.4, steel, -299, 1.1, 23, G).rotation.x = -0.33;
[[-306, -20], [-306, 20], [-280, -20], [-280, 20]].forEach(function (q) { ppBox(0.8, 16, 0.8, steel, q[0], S.h + 8, q[1], G); ppSolid(q[0], q[1], 0.5, 0.5); });
ppBox(28, 0.8, 42, steel, -293, S.h + 16, 0, G);
ppBox(28, 1.6, 0.8, steel, -293, S.h + 15, -20, G);
ppBox(28, 1.6, 0.8, steel, -293, S.h + 15, 20, G);
ppBox(0.8, 1.6, 42, steel, -280, S.h + 15, 0, G);
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = 96;
var st = new THREE.CanvasTexture(cv);
var scr = wMesh(new THREE.PlaneGeometry(36, 12), new THREE.MeshBasicMaterial({ map: st, fog: false }), -305.4, S.h + 8, 0, L);
scr.rotation.y = Math.PI / 2;
PP.screens.push({ cv: cv, tex: st, kind: "waves", hue: 0.75, title: "JUBILEE" });
ppBox(0.6, 13, 37, black, -306, S.h + 8, 0, G);
ppSolid(-306, 0, 0.5, 19);
[-26, 26].forEach(function (z) {
for (var k = 0; k < 3; k++)
ppBox(3, 3, 3, black, -284, 1.5 + k * 3, z, G);
ppSolid(-284, z, 1.6, 1.6);
for (var c = 0; c < 3; c++)
ppCyl(1, 1, 0.1, ppM(0x2A2A30), -282.45, 1.5 + c * 3, z, G, 16).rotation.z = Math.PI / 2;
});
ppBox(6, 1.2, 2, ppM(0x2A1838), -292, S.h + 0.6, 0, G);
ppSolid(-292, 0, 1, 3, 0, 1.4, S.h - 0.2);
PP.djs = PP.djs || [];
PP.djs.push({ x: -293.6, y: S.h, z: 0, ry: Math.PI / 2, seed: "mainstage", title: "Resident DJ", place: PP_KEYS.fest });
for (var b = 0; b < (PP.lite ? 3 : 6); b++) {
var be = ppBeam(0.6 + b * 0.1);
be.position.set(-288, S.h + 15, -15 + b * 6);
L.add(be);
PP.beams.push({ m: be, ph: b * 1.1, base: -Math.PI / 2 });
}
PP.music.push({ k: "pp-main", zone: "out", x: -285, z: 0, r: 150, C: { bpm: 124, band: false } });
PP.floors.push({ zone: "out", x0: -272, x1: -200, z0: -34, z1: 34, y: 0, n: 0, name: "the field before the Main Stage" });
PP.crowds.push({ x0: -268, x1: -215, z0: -28, z1: 28, n: PP.lite ? 8 : 22, y: 0, face: -Math.PI / 2, seed: "main" });
ppSpot({ x: -276, z: 0, r: 3, name: "The Main Stage: who is playing tonight", fn: function () { ppStageCard("main"); } });
var T = { x0: -196, x1: -164, z0: -162, z1: -148, h: 1.4 };
ppBox(32, T.h, 14, wood, -180, T.h / 2, -155, G);
ppPad(T.x0, T.x1, T.z0, T.z1, T.h);
var shell = wMesh(new THREE.SphereGeometry(16, 24, 12, 0, Math.PI, 0, Math.PI / 2), ppM(0xE8C8A8, { ds: true }), -180, T.h, -160, G);
shell.rotation.y = 0;
shell.scale.set(1, 0.75, 0.6);
ppSolid(-180, -162, 16, 0.6);
PP.bands = PP.bands || [];
PP.bands.push({ x: -180, y: T.h, z: -155, face: 0, seed: "sunset" });
PP.music.push({ k: "pp-sunset", zone: "out", x: -180, z: -150, r: 90, C: { bpm: 96, band: true } });
PP.crowds.push({ x0: -196, x1: -164, z0: -140, z1: -115, n: PP.lite ? 5 : 12, y: 0, face: Math.PI, seed: "sunset", sway: 1 });
PP.floors.push({ zone: "out", x0: -198, x1: -162, z0: -145, z1: -108, y: 0, n: 0, name: "the lawn before the Sunset Stage" });
ppSign(G, ["THE SUNSET STAGE"], 8, 1.2, -180, 10.4, -160.5, 0, "#2A1408", "#FFD0A0");
var lam = [];
for (var k = 0; k <= 24; k++) {
lam.push([-196 + k * 32 / 24, 7 - Math.sin(k / 24 * Math.PI) * 1.2, -147]);
}
ppBulbs(L, lam, 0.16);
var W = { x: -130, z: 110, y: 22, r: 18, n: 12 };
[-1, 1].forEach(function (s) {
var leg = ppBox(1, 24, 1, steel, W.x, 11, W.z + s * 7, G);
leg.rotation.x = s * 0.28;
var leg2 = ppBox(1, 24, 1, steel, W.x, 11, W.z - s * 7 + s * 0.01, G);
leg2.rotation.x = -s * 0.28;
ppSolid(W.x, W.z + s * 10, 0.8, 0.8);
ppSolid(W.x, W.z + s * 3.5, 0.8, 0.8);
});
var wheel = new THREE.Group();
wheel.position.set(W.x, W.y, W.z);
L.add(ppKeep(wheel));
var rimM = ppM(0xE8E0F0, { e: 0x2A2040 });
[-1.2, 1.2].forEach(function (dx) { var rim = wMesh(new THREE.TorusGeometry(W.r, 0.25, 6, 64), rimM, dx, 0, 0, wheel); rim.rotation.y = Math.PI / 2; });
for (var sp = 0; sp < W.n; sp++) {
var a = sp / W.n * Math.PI * 2, spoke = ppBox(0.2, W.r * 2, 0.2, rimM, 0, 0, 0, wheel);
spoke.rotation.x = a;
}
var hub = ppCyl(1.4, 1.4, 3.2, ppM(0xC9A868), 0, 0, 0, wheel, 16);
hub.rotation.z = Math.PI / 2;
var rb = [];
for (var q = 0; q < 64; q++) {
var a2 = q / 64 * Math.PI * 2;
rb.push([1.3, Math.cos(a2) * W.r, Math.sin(a2) * W.r]);
rb.push([-1.3, Math.cos(a2) * W.r, Math.sin(a2) * W.r]);
}
ppBulbs(wheel, rb, 0.16);
var gond = [];
for (var gI = 0; gI < W.n; gI++) {
var gg = new THREE.Group();
var col = [0xE84A8A, 0xFFD06A, 0x6AD8FF, 0xA88AFF, 0x8AE8A8, 0xFF9A5A][gI % 6];
ppBox(2.2, 1.6, 2.4, ppM(col), 0, -1.6, 0, gg);
ppBox(2.4, 0.2, 2.6, ppM(0xF0E8F8), 0, -0.7, 0, gg);
ppCyl(0.05, 0.05, 1, rimM, 0, -0.4, 0, gg, 4);
wheel.parent.add(gg);
gond.push(gg);
}
PP.wheel = { g: wheel, gond: gond, W: W, a: 0 };
ppBox(6, 0.5, 4, wood, W.x + 4, 0.25, W.z, G);
ppPad(W.x + 1, W.x + 7, W.z - 2, W.z + 2, 0.5);
ppSpot({ x: W.x + 5, z: W.z, r: 2.8, name: "The Ferris wheel: ride it round once", fn: function () { ppRideStart("wheel"); } });
PP.staffAt.push({ title: "Ride operator", place: PP_KEYS.fest, x: W.x + 6.4, z: W.z + 2.6, ry: Math.PI / 2, seed: "wheelop" });
var C = { x: -195, z: 110, r: 9 };
ppCyl(C.r + 0.6, C.r + 0.8, 0.6, ppM(0xC9A868), C.x, 0.3, C.z, G, 40);
var car = new THREE.Group();
car.position.set(C.x, 0.6, C.z);
L.add(ppKeep(car));
ppCyl(C.r, C.r, 0.2, ppM(0xE8D8F0), 0, 0.1, 0, car, 40);
ppCyl(0.6, 0.6, 7, ppM(0xC9A868), 0, 3.5, 0, car, 12);
var roof = wMesh(new THREE.ConeGeometry(C.r + 1, 3.2, 24), ppM(0xE84A8A), 0, 8.2, 0, car);
ppBox(0.1, 0.1, 0.1, ppM(0xFFFFFF), 0, 0, 0, car);
var horses = [];
for (var h = 0; h < 12; h++) {
var a3 = h / 12 * Math.PI * 2, hx = Math.cos(a3) * (C.r - 1.6), hz = Math.sin(a3) * (C.r - 1.6);
ppCyl(0.05, 0.05, 6.6, ppM(0xC9A868), hx, 3.3, hz, car, 5);
var hg = new THREE.Group();
hg.position.set(hx, 1.4, hz);
hg.rotation.y = -a3;
car.add(hg);
var hcol = [0xF4ECE0, 0x3A2A1A, 0xC89A6A, 0xE8E0F0][h % 4];
ppBox(0.5, 0.6, 1.5, ppM(hcol), 0, 0, 0, hg);
ppBox(0.3, 0.7, 0.35, ppM(hcol), 0, 0.45, 0.75, hg);
ppBox(0.28, 0.3, 0.5, ppM(hcol), 0, 0.75, 0.95, hg);
[-0.15, 0.15].forEach(function (lx) { [-0.5, 0.5].forEach(function (lz) { ppBox(0.1, 0.6, 0.1, ppM(hcol), lx, -0.5, lz, hg); }); });
ppBox(0.55, 0.08, 0.5, ppM(0xC83A5A), 0, 0.32, 0, hg);
horses.push({ g: hg, ph: h * 0.9 });
}
var cb = [];
for (var q2 = 0; q2 < 40; q2++) {
var a4 = q2 / 40 * Math.PI * 2;
cb.push([Math.cos(a4) * (C.r + 0.9), 6.6, Math.sin(a4) * (C.r + 0.9)]);
}
ppBulbs(car, cb, 0.14);
PP.carousel = { g: car, horses: horses, C: C, a: 0 };
ppSolidR(C.x, C.z, C.r + 0.4);
ppSpot({ x: C.x + C.r + 2, z: C.z, r: 2.6, name: "The carousel: climb on a horse", fn: function () { ppRideStart("carousel"); } });
var games = [["ring", "RING TOSS", "Land a ring on a bottle"], ["duck", "HOOK-A-DUCK", "Every duck wins something"], ["strike", "HIGH STRIKER", "Ring the bell"], ["darts", "BALLOON DARTS", "Pop three balloons"]];
games.forEach(function (gm, i) { var z = 30 + i * 16, x = -100; ppBooth(G, L, x, z, -Math.PI / 2, gm); });
ppTent(G, -118, -48, 10, 8, 0xE8D8F0, "MERCH", "Jubilee shirts, posters, keepsakes");
ppSpot({ x: -112, z: -48, r: 3, name: "The merch tent", fn: function () { ppShopCard("merch"); } });
PP.staffAt.push({ title: "Merch seller", place: PP_KEYS.fest, x: -118.5, z: -46, ry: Math.PI / 2, seed: "merch1" });
ppTent(G, -108, -96, 8, 6, 0xF4F4F4, "FIRST AID", "Festival medics · water · rest");
ppSpot({ x: -103, z: -96, r: 3, name: "The first-aid tent: rest, water and a check-up", fn: ppFirstAid });
PP.staffAt.push({ title: "Festival medic", place: PP_KEYS.fest, x: -108.5, z: -94, ry: Math.PI / 2, seed: "medic1" });
ppTent(G, -118, -18, 12, 8, 0x6A3A8A, "FESTIVAL BAR", "Drinks · mocktails · water");
ppSpot({ x: -111, z: -18, r: 3, name: "The festival bar", fn: function () { ppMenu("fest", "The festival bar"); } });
PP.staffAt.push({ title: "Festival bartender", place: PP_KEYS.fest, x: -118.6, z: -16, ry: Math.PI / 2, seed: "festbar" });
var R = ppRand(9090);
for (var t = 0; t < (PP.lite ? 6 : 12); t++) {
var tx = -316 + (t % 4) * 18 + R() * 4, tz = 96 + Math.floor(t / 4) * 18 + R() * 4;
ppGlamp(G, L, tx, tz, R() * 6);
}
ppSpot({ x: -280, z: 118, r: 6, name: "The glamping field: rest in a tent", fn: function () { ppRest("a glamping tent"); } });
PP.staffAt.push({ title: "Festival security", place: PP_KEYS.fest, x: -84, z: -9.5, ry: Math.PI / 2, seed: "fsec1" }, { title: "Festival security", place: PP_KEYS.fest, x: -84, z: 9.5, ry: Math.PI / 2, seed: "fsec2" }, { title: "Stage manager", place: PP_KEYS.fest, x: -279, z: 24, ry: Math.PI / 2, seed: "stagem" }, { title: "Stagehand", place: PP_KEYS.fest, x: -282, z: -24, ry: Math.PI / 2, seed: "hand1" }, { title: "Festival director", place: PP_KEYS.fest, x: -96, z: -4, ry: Math.PI / 2, seed: "fdir" });
},
function (len) {
var g = new THREE.Group();
var m = new THREE.Mesh(new THREE.ConeGeometry(3, 34, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xC8A8FF, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
m.position.y = -17;
g.add(m);
g.userData.cone = m;
return g;
},
function (G, L, x, z, ry, gm) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
var red = ppM(0xD83A4A), white = ppM(0xF4ECE0);
ppBox(6, 1.1, 1, ppM(0x6A4A30), 0, 0.55, 1.2, g);
[-2.9, 2.9].forEach(function (px) { ppBox(0.2, 3.4, 0.2, white, px, 1.7, 1.6, g); ppBox(0.2, 3.4, 0.2, white, px, 1.7, -1.6, g); });
for (var i = 0; i < 6; i++) {
ppBox(1, 0.15, 3.6, i % 2 ? white : red, -2.5 + i, 3.5, 0, g);
}
ppBox(6, 2.6, 0.1, ppM(0x2A1838), 0, 1.8, -1.7, g);
if (gm[0] === "ring") {
for (var b = 0; b < 12; b++)
ppCyl(0.06, 0.09, 0.32, ppM(0x3A8A4A, { op: 0.8 }), -1.6 + (b % 6) * 0.65, 1.3, 0.2 + Math.floor(b / 6) * 0.5, g, 8);
}
if (gm[0] === "duck") {
var tank = ppCyl(1.6, 1.6, 0.6, ppM(0x3A7AB8), 0, 0.9, 0, g, 24);
for (var d = 0; d < 8; d++) {
var a = d / 8 * Math.PI * 2;
ppSph(0.18, ppM(0xFFD040), Math.cos(a) * 1.1, 1.28, Math.sin(a) * 1.1, g, 8);
}
}
if (gm[0] === "strike") {
ppBox(0.3, 7, 0.3, ppM(0xE8E0D0), 0, 3.5, -1.2, g);
ppSph(0.4, ppM(0xFFD040, { e: 0x3A2A00 }), 0, 7.2, -1.2, g, 10);
ppBox(1.2, 0.3, 1.2, red, 0, 0.15, -0.4, g);
}
if (gm[0] === "darts") {
var cols = [0xFF6AA8, 0xFFD06A, 0x6AD8FF, 0xA88AFF, 0x8AE8A8];
for (var bb = 0; bb < 15; bb++)
ppSph(0.22, ppM(cols[bb % 5]), -2 + (bb % 5) * 1, 1.4 + Math.floor(bb / 5) * 0.6, -1.55, g, 8);
}
var R = ppRand(ppHash(gm[0]));
for (var p = 0; p < 6; p++)
ppSph(0.28, ppM([0xC89A6A, 0xE84A8A, 0x6AD8FF][p % 3]), -2.5 + p, 2.9, -1.5, g, 8);
ppSign(g, [gm[1], gm[2] + " · 2 gold a go"], 5, 1, 0, 4.3, 1.75, 0, "#2A1838", "#FFE0A0");
var c = Math.cos(ry), s = Math.sin(ry);
PP.solids.push({ x: x, z: z, hw: 3.1, hd: 1.8, rot: ry });
ppSpot({ x: x + s * 3.4, z: z + c * 3.4, r: 2.4, name: gm[1] + ": " + gm[2], fn: function () { ppGame(gm[0], gm[1], gm[2]); } });
PP.staffAt.push({ title: "Carnival game host", place: PP_KEYS.fest, x: x - s * 0.4, z: z - c * 0.4, ry: ry, seed: "booth" + gm[0] });
},
function (G, x, z, w, d, col, title, sub) {
var g = new THREE.Group();
g.position.set(x, 0, z);
G.add(g);
var roof = wMesh(new THREE.ConeGeometry(Math.max(w, d) * 0.75, 3.4, 4), ppM(col), 0, 4.4, 0, g);
roof.rotation.y = Math.PI / 4;
roof.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d));
[[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (q) { ppCyl(0.1, 0.1, 2.8, ppM(0xE8E0D0), q[0] * w / 2, 1.4, q[1] * d / 2, g, 6); });
ppBox(0.1, 2.6, d, ppM(col), -w / 2, 1.3, 0, g);
ppBox(w, 2.6, 0.1, ppM(col), 0, 1.3, -d / 2, g);
ppBox(w, 2.6, 0.1, ppM(col), 0, 1.3, d / 2, g);
ppBox(1.2, 1, d * 0.7, ppM(0x6A4A30), w / 2 - 1, 0.5, 0, g);
ppSign(g, [title, sub], 4.4, 1, w / 2 + 0.06, 3.4, 0, Math.PI / 2, "#1A0E2A", "#FFE0A0");
PP.solids.push({ x: x - 0.6, z: z, hw: w / 2 - 0.6, hd: d / 2 });
},
function (G, L) {
var C = PP_LAG, wood = ppM(0x8A6A4A), thatch = ppM(0xC8A060), white = ppM(0xF4ECE0);
ppSign(G, ["JUBILEE BEACH CLUB", "Tiki bar · beach DJ · pool · cabanas"], 9, 1.6, 102, 3.6, -98, -Math.PI * 0.3, "#0E2A3A", "#A8F0FF");
ppBox(0.3, 4, 0.3, wood, 99.6, 2, -100, G);
ppBox(0.3, 4, 0.3, wood, 104.6, 2, -96.4, G);
var tg = new THREE.Group();
tg.position.set(110, 0, -150);
tg.rotation.y = 0.6;
G.add(tg);
ppBox(9, 1.15, 1.2, wood, 0, 0.58, 1.6, tg);
ppBox(9.2, 0.1, 1.4, ppM(0x5A3A20), 0, 1.18, 1.6, tg);
ppBox(9, 0.9, 0.6, wood, 0, 0.45, -2.2, tg);
for (var s = 0; s < 4; s++) {
ppCyl(0.18, 0.2, 4, wood, -4.2 + s * 2.8, 2, -2.6, tg, 8);
ppCyl(0.18, 0.2, 4, wood, -4.2 + s * 2.8, 2, 2.4, tg, 8);
}
var roof = wMesh(new THREE.ConeGeometry(7.4, 3, 4), thatch, 0, 5.4, 0, tg);
roof.rotation.y = Math.PI / 4;
roof.scale.set(1, 1, 0.6);
ppSign(tg, ["THE TIKI BAR"], 4, 0.8, 0, 3.6, 2.5, 0, "#2A1408", "#FFE0A0");
for (var b = 0; b < 5; b++) {
ppCyl(0.25, 0.25, 0.08, ppM(0x5A3A20), -3.2 + b * 1.6, 0.78, 3, tg, 10);
ppCyl(0.05, 0.05, 0.76, wood, -3.2 + b * 1.6, 0.38, 3, tg, 6);
}
PP.solids.push({ x: 110, z: -150, hw: 4.8, hd: 3, rot: 0.6 });
var tc = Math.cos(0.6), ts = Math.sin(0.6);
ppSpot({ x: 110 + ts * 4.4, z: -150 + tc * 4.4, r: 2.8, name: "The tiki bar", fn: function () { ppMenu("tiki", "The tiki bar"); } });
PP.staffAt.push({ title: "Tiki bartender", place: PP_KEYS.beach, x: 110 - ts * 0.6, z: -150 - tc * 0.6, ry: 0.6, seed: "tiki1" });
ppBox(5, 1.2, 2, ppM(0x2A1838), 125, 0.6, -108, G);
ppSolid(125, -108, 2.5, 1);
ppBox(6, 4, 0.3, wood, 125, 2, -109.4, G);
ppSign(G, ["BEACH DJ"], 3, 0.7, 125, 3.4, -109.2, 0, "#0E2A3A", "#A8F0FF");
PP.djs.push({ x: 125, y: 0, z: -109.2, ry: 0, seed: "beachdj", title: "Beach DJ", place: PP_KEYS.beach });
ppDanceFloor(L, "out", 138, -122, 6, 1.8, 0.12, "beach", [[0.30, 0.80, 0.96], [0.40, 0.92, 0.78], [0.98, 0.70, 0.44], [0.96, 0.50, 0.70]]);
PP.music.push({ k: "pp-beach", zone: "out", x: 132, z: -115, r: 80, C: { bpm: 108, band: false } });
PP.crowds.push({ x0: 134, x1: 143, z0: -127, z1: -117, n: PP.lite ? 3 : 7, y: 0.12, face: Math.PI, seed: "beach" });
ppBox(36, 0.3, 26, ppM(0xE8E0D0), 115, 0.15, -220, G);
var pw = wMesh(new THREE.PlaneGeometry(34, 24), new THREE.MeshPhongMaterial({ color: 0x4AB8E8, shininess: 90, transparent: true, opacity: 0.9 }), 115, 0.32, -220, L);
pw.rotation.x = -Math.PI / 2;
var pg = wMesh(new THREE.PlaneGeometry(34, 24), ppGlowMat(0x6AE8FF, 0.12), 115, 0.34, -220, L);
pg.rotation.x = -Math.PI / 2;
PP.glows.push({ m: pg, base: 0.1, amp: 0.05, sp: 0.2, hue: 0.52 });
for (var l = 0; l < 6; l++) {
var lx = 100 + l * 6;
[-236, -204].forEach(function (lz, j) {
ppBox(0.9, 0.35, 2, white, lx, 0.3, lz, G);
ppBox(0.9, 0.6, 0.25, white, lx, 0.6, lz + (j ? -1 : 1) * 0.95, G);
ppSolid(lx, lz, 0.45, 1);
if (l % 2 === 0) {
ppCyl(0.05, 0.05, 2.6, ppM(0x8A8A8A), lx + 2.5, 1.3, lz, G, 5);
var um = wMesh(new THREE.ConeGeometry(1.6, 0.6, 8), ppM(l % 4 ? 0xE84A8A : 0xFFD06A), lx + 2.5, 2.7, lz, G);
}
});
}
ppSpot({ x: 115, z: -198, r: 3, name: "The pool: a swim, then a lounger", fn: function () { ppRest("a lounger by the pool"); } });
PP.staffAt.push({ title: "Lifeguard", place: PP_KEYS.beach, x: 134, z: -220, ry: -Math.PI / 2, seed: "lg1" });
[20, 40, 60, 80].forEach(function (deg, i) {
var a = deg * Math.PI / 180, x = C.x + Math.cos(a) * 86, z = C.z + Math.sin(a) * 86;
var cg = new THREE.Group();
cg.position.set(x, 0, z);
cg.rotation.y = -a + Math.PI / 2;
G.add(cg);
[[-2, -2], [-2, 2], [2, -2], [2, 2]].forEach(function (q) { ppCyl(0.1, 0.1, 3, wood, q[0], 1.5, q[1], cg, 6); });
ppBox(4.4, 0.15, 4.4, white, 0, 3, 0, cg);
ppBox(0.1, 2.4, 4.2, ppM(0xF4ECE0, { op: 0.7 }), -2, 1.6, 0, cg);
ppBox(3, 0.5, 2, ppM(0x3AB8A8), 0, 0.25, -0.4, cg);
ppBox(1, 0.5, 0.6, ppM(0xE8E0D0), 0, 0.25, 1.4, cg);
ppSolidR(x, z, 0.6);
ppSpot({ x: x, z: z, r: 3, name: "A cabana: rest in the shade", fn: function () { ppRest("a cabana"); } });
if (i === 1)
PP.staffAt.push({ title: "Cabana server", place: PP_KEYS.beach, x: x + 2.4, z: z + 2.4, ry: -a, seed: "cab" + i });
});
[250, 270, 290].forEach(function (deg) {
var a = deg * Math.PI / 180, x = C.x + Math.cos(a) * 82, z = C.z + Math.sin(a) * 82;
for (var k = 0; k < 8; k++) {
var a2 = k / 8 * Math.PI * 2;
ppSph(0.35, ppM(0x6A6A6A), x + Math.cos(a2) * 1.4, 0.2, z + Math.sin(a2) * 1.4, G, 6);
}
var f1 = wMesh(new THREE.ConeGeometry(0.9, 2.2, 8), ppGlowMat(0xFF8A2A, 0.85), x, 1.1, z, L), f2 = wMesh(new THREE.ConeGeometry(0.5, 1.5, 8), ppGlowMat(0xFFD06A, 0.9), x, 0.9, z, L);
PP.flames.push({ m: f1, ph: deg }, { m: f2, ph: deg + 1 });
var gl = wGlow(0xFF9A4A, 8, 0.4);
gl.position.set(x, 1.4, z);
L.add(gl);
ppSolidR(x, z, 1.8);
for (var lg = 0; lg < 3; lg++) {
var la = lg / 3 * Math.PI * 2 + 0.4, lb = ppBox(2.2, 0.4, 0.5, ppM(0x6A4A30), x + Math.cos(la) * 3.4, 0.25, z + Math.sin(la) * 3.4, G);
lb.rotation.y = -la + Math.PI / 2;
}
ppSpot({ x: x + 3, z: z, r: 3, name: "A bonfire on the sand: sit a while", fn: function () { ppRest("a bonfire on the sand"); } });
});
var vx = C.x + Math.cos(-0.35) * 92, vz = C.z + Math.sin(-0.35) * 92;
ppCyl(0.1, 0.1, 2.6, wood, vx, 1.3, vz - 4.5, G, 6);
ppCyl(0.1, 0.1, 2.6, wood, vx, 1.3, vz + 4.5, G, 6);
ppBox(0.05, 1, 9, ppM(0xF4F4F4, { op: 0.6 }), vx, 2.1, vz, G);
ppSolid(vx, vz - 4.5, 0.15, 0.15);
ppSolid(vx, vz + 4.5, 0.15, 0.15);
ppSpot({ x: vx + 3, z: vz, r: 3, name: "Beach volleyball: a friendly game", fn: ppVolley });
var lx2 = 190, lz2 = -102;
ppBox(2, 0.2, 2, wood, lx2, 2.6, lz2, G);
[[-0.9, -0.9], [-0.9, 0.9], [0.9, -0.9], [0.9, 0.9]].forEach(function (q) { ppBox(0.15, 2.6, 0.15, wood, lx2 + q[0], 1.3, lz2 + q[1], G); });
ppBox(2.2, 0.1, 2.2, ppM(0xD83A4A), lx2, 4.2, lz2, G);
ppSolid(lx2, lz2, 1, 1);
PP.staffAt.push({ title: "Lifeguard", place: PP_KEYS.beach, x: lx2, y: 2.7, z: lz2, ry: Math.PI, seed: "lg2" }, { title: "Beach club manager", place: PP_KEYS.beach, x: 106, z: -104, ry: -2.4, seed: "bman" });
for (var p = 0; p < (PP.lite ? 3 : 7); p++) {
var a5 = (120 + p * 13) * Math.PI / 180;
ppPalm(G, C.x + Math.cos(a5) * 104, C.z + Math.sin(a5) * 104, ppHash("bp" + p));
}
}
];
});
