/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(294, function () {
"use strict";
return [
function (G, zone, cx, cz, n, s, y, key, pal) {
var im = new THREE.InstancedMesh(new THREE.BoxGeometry(s - 0.06, 0.1, s - 0.06), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), n * n), m = new THREE.Matrix4(), c = new THREE.Color(0.5, 0.4, 0.6), h = n * s / 2;
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++) {
m.makeTranslation(cx - h + s / 2 + i * s, y + 0.05, cz - h + s / 2 + j * s);
im.setMatrixAt(i * n + j, m);
im.setColorAt(i * n + j, c);
}
G.add(ppKeep(im));
PP.tiles.push({ m: im, n: n, pal: pal || [[0.66, 0.34, 0.94], [0.94, 0.36, 0.72], [0.30, 0.56, 0.96], [0.32, 0.88, 0.82], [0.96, 0.62, 0.36]], key: key, zone: zone });
PP.floors.push({ zone: zone, x0: cx - h, x1: cx + h, z0: cz - h, z1: cz + h, y: y, name: "the dance floor" });
if (y > 0.05)
ppPad(cx - h, cx + h, cz - h, cz + h, y + 0.1);
return im;
},
function (G, x, z, len, ry, menu, title, place, staffTitle, seed, y) {
y = y || 0;
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var wood = ppM(0x3A2030), top = ppM(0xC9A868, { e: 0x2A1C08 }), glow = ppGlowMat(0xFF9AD8, 0.9);
ppBox(len, 1.1, 0.9, wood, 0, 0.55, 1.2, g);
ppBox(len + 0.2, 0.08, 1.1, top, 0, 1.12, 1.2, g);
ppBox(len, 0.06, 0.06, glow, 0, 0.2, 1.68, g);
ppBox(len, 0.9, 0.5, wood, 0, 0.45, -1.4, g);
for (var sh = 0; sh < 3; sh++) {
ppBox(len - 0.6, 0.06, 0.35, top, 0, 1.4 + sh * 0.55, -1.5, g);
for (var b = 0; b < Math.floor(len / 0.55); b++)
ppCyl(0.05, 0.06, 0.3, ppM([0x2A6A3A, 0x8A3A1A, 0xC8A040, 0x3A4AA8, 0xE8E0D0, 0x6A2A6A][(b + sh) % 6], { op: 0.85 }), -len / 2 + 0.5 + b * 0.55, 1.58 + sh * 0.55, -1.5, g, 6);
}
ppBox(len, 3, 0.2, ppM(0x1A1020), 0, 1.6, -1.8, g);
for (var s = 0; s < Math.floor(len / 1.3); s++) {
var sx = -len / 2 + 0.8 + s * 1.3;
ppCyl(0.22, 0.22, 0.08, ppM(0x8A1A4A), sx, 0.78, 2.2, g, 10);
ppCyl(0.04, 0.04, 0.76, top, sx, 0.38, 2.2, g, 6);
}
var c = Math.cos(ry), sn = Math.sin(ry);
PP.solids.push({ x: x + sn * 1.2, z: z + c * 1.2, hw: len / 2, hd: 0.5, rot: ry, h: 1.4, b: y - 0.2 }, { x: x - sn * 1.5, z: z - c * 1.5, hw: len / 2, hd: 0.4, rot: ry, h: 3, b: y - 0.2 });
ppSpot({ x: x + sn * 2.9, z: z + c * 2.9, y: y, r: Math.max(2.6, len / 2), name: title, fn: function () { ppMenu(menu, title); } });
if (staffTitle) {
PP.staffAt.push({ title: staffTitle, place: place, x: x - sn * 0.2 - c * len * 0.25, z: z - c * 0.2 + sn * len * 0.25, y: y, ry: ry, seed: seed + "a" });
if (len > 7)
PP.staffAt.push({ title: staffTitle, place: place, x: x - sn * 0.2 + c * len * 0.25, z: z - c * 0.2 - sn * len * 0.25, y: y, ry: ry, seed: seed + "b" });
}
return g;
},
function (G, x, z, ry, col, len, y) {
var g = new THREE.Group();
g.position.set(x, y || 0, z);
g.rotation.y = ry;
G.add(g);
len = len || 2.4;
ppBox(len, 0.45, 0.9, ppM(col), 0, 0.25, 0, g);
ppBox(len, 0.8, 0.25, ppM(col), 0, 0.6, -0.42, g);
ppBox(0.25, 0.6, 0.9, ppM(col), -len / 2, 0.45, 0, g);
ppBox(0.25, 0.6, 0.9, ppM(col), len / 2, 0.45, 0, g);
PP.solids.push({ x: x, z: z, hw: len / 2, hd: 0.45, rot: ry, h: 1, b: (y || 0) - 0.2 });
return g;
},
function (G) {
var R = new THREE.Group();
R.name = "pp-club";
G.add(R);
var Lv = new THREE.Group();
G.add(Lv);
PP.rooms.club = { g: R, live: Lv };
var wall = ppM(0x2A1838), dark = ppM(0x140C1C), floor = ppM(0x241A2E), ceil = ppM(0x0E0814), trim = ppM(0x8A5AC8, { e: 0x2A1040 }), gold = ppM(0xC9A868, { e: 0x2A1C08 });
ppWalk(1990, 2010, 30, 50, "club");
ppFloor(R, 1990, 2010, 30, 50, ppM(0x3A2A44));
ppCeil(R, 1990, 2010, 30, 50, 5, ceil);
ppWalls(R, 1990, 2010, 30, 50, 5, wall, [{ s: "n", c: 2000, w: 4 }, { s: "w", c: 37, w: 2.4 }, { s: "e", c: 37, w: 2.4 }, { s: "s", c: 2000, w: 3 }]);
ppSign(R, ["THE GLOWWORM", "Welcome · coat check on your left"], 6, 1.4, 2000, 3.6, 49.7, Math.PI, "#120820", "#C8FFB0");
ppBox(0.8, 1.1, 6, dark, 1991, 0.55, 43, R);
ppBox(1, 0.06, 6.2, gold, 1991, 1.12, 43, R);
ppSolid(1991, 43, 0.4, 3);
for (var c = 0; c < 8; c++) {
ppBox(0.5, 1.2, 0.05, ppM([0x3A2A1A, 0x6A2A3A, 0x2A3A5A, 0x1A1A1A][c % 4]), 1990.4, 2.2, 40.4 + c * 0.7, R);
}
ppSpot({ x: 1993.4, z: 43, r: 2.2, name: "The coat check", fn: ppCoatCheck });
PP.staffAt.push({ title: "Coat check attendant", place: PP_KEYS.club, x: 1990.6, z: 44, ry: Math.PI / 2, seed: "coat" });
ppBox(0.8, 1.1, 4, dark, 2009, 0.55, 45, R);
ppBox(1, 0.06, 4.2, gold, 2009, 1.12, 45, R);
ppSolid(2009, 45, 0.4, 2);
ppSpot({ x: 2006.6, z: 45, r: 2.2, name: "The ticket desk: tonight, and the VIP lounge", fn: ppClubDesk });
PP.staffAt.push({ title: "VIP host", place: PP_KEYS.club, x: 2009.6, z: 46, ry: -Math.PI / 2, seed: "viphost1" });
ppBox(3, 3.6, 0.3, trim, 2006, 1.8, 30.4, R);
ppBox(2, 3, 0.1, gold, 2006, 1.5, 30.6, R);
ppSpot({ x: 2006, z: 32.6, r: 1.8, name: "The lift up to the Rooftop Terrace", fn: function () { ppLift("up"); } });
ppSpot({ x: 2000, z: 48.6, r: 2, name: "The doors: back out onto Jubilee Boulevard", fn: function () { ppGoOut("club"); } });
ppWalk(2010, 2024, 30, 44, "club");
ppFloor(R, 2010, 2024, 30, 44, ppM(0x2A2A34));
ppCeil(R, 2010, 2024, 30, 44, 4, ceil);
ppWalls(R, 2010, 2024, 30, 44, 4, wall, [{ s: "w", c: 37, w: 2.4 }]);
ppGate(2010.3, 2024, 30, 44, "staff", "The security office");
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = 128;
var tx = new THREE.CanvasTexture(cv);
var cctv = wMesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ map: tx }), 2017, 2.2, 30.2, Lv);
PP.screens.push({ cv: cv, tex: tx, kind: "cctv" });
ppBox(5, 0.9, 1.4, dark, 2017, 0.45, 33, R);
ppSolid(2017, 33, 2.5, 0.7);
ppSpot({ x: 2017, z: 35.4, r: 2, name: "The security office: the cameras and the night's log", fn: ppSecurity });
PP.staffAt.push({ title: "Door supervisor", place: PP_KEYS.club, x: 2017, z: 34.4, ry: Math.PI, seed: "secdesk" });
ppWalk(1976, 1990, 30, 44, "club");
ppFloor(R, 1976, 1990, 30, 44, ppM(0x2A2A34));
ppCeil(R, 1976, 1990, 30, 44, 4, ceil);
ppWalls(R, 1976, 1990, 30, 44, 4, wall, [{ s: "e", c: 37, w: 2.4 }]);
ppGate(1976, 1989.7, 30, 44, "staff", "The sound and light booth");
ppBox(8, 1, 1.6, dark, 1983, 0.5, 32, R);
ppSolid(1983, 32, 4, 0.8);
for (var f = 0; f < 16; f++) {
ppBox(0.12, 0.04, 0.3, ppM([0xE8E0D0, 0xFF6A6A, 0x6AE8FF][f % 3]), 1980 + f * 0.4, 1.02, 31.8, R);
}
ppBox(8, 1.8, 0.1, ppM(0x8AA8C8, { op: 0.25 }), 1983, 2.6, 30.2, R);
ppSpot({ x: 1983, z: 34.4, r: 2, name: "The desk: sound and light", fn: ppLightDesk });
PP.staffAt.push({ title: "Sound engineer", place: PP_KEYS.club, x: 1981, z: 33.4, ry: Math.PI, seed: "sound" }, { title: "Lighting technician", place: PP_KEYS.club, x: 1985.4, z: 33.4, ry: Math.PI, seed: "light" });
ppWalk(1970, 2030, -30, 30, "club");
ppFloor(R, 1970, 2030, -30, 30, floor);
ppCeil(R, 1970, 2030, -30, 30, 10, ceil);
ppWalls(R, 1970, 2030, -30, 30, 10, wall, [{ s: "s", c: 2000, w: 4 }, { s: "w", c: 10, w: 4 }, { s: "w", c: 26, w: 3 }, { s: "w", c: -24, w: 2.4 }, { s: "e", c: -20, w: 3 }, { s: "e", c: 12, w: 2.4 }]);
ppDanceFloor(Lv, "club", 2000, -2, PP.lite ? 8 : 10, 1.6, 0, "club", null);
ppBox(16, 1.2, 6, dark, 2000, 0.6, -27, R);
ppPad(1992, 2008, -30, -24, 1.2);
ppRamp(2008, 2011, -28, -25, 1.2, 0, "x");
ppGate(1992, 2011, -30, -24, "staff", "The DJ booth");
ppBox(6, 1, 1.4, ppM(0x1A1020), 2000, 1.7, -25.6, R);
ppSolid(2000, -25.6, 3, 0.7, 0, 1.3, 1);
PP.djs.push({ x: 2000, y: 1.2, z: -27, ry: 0, seed: "glowdj", title: "Resident DJ", place: PP_KEYS.club });
ppSpot({ x: 2000, z: -21.6, r: 2.6, name: "The DJ booth: ask for a song", fn: function () { ppDjCard("club"); } });
var lv = document.createElement("canvas");
lv.width = 256;
lv.height = 96;
var lt = new THREE.CanvasTexture(lv);
wMesh(new THREE.PlaneGeometry(40, 8), new THREE.MeshBasicMaterial({ map: lt }), 2000, 5.8, -29.8, Lv);
PP.screens.push({ cv: lv, tex: lt, kind: "waves", hue: 0.8, title: "THE GLOWWORM" });
ppBar(R, 1973.5, 0, 22, Math.PI / 2, "club", "The west bar", PP_KEYS.club, "Club bartender", "westbar");
ppBar(R, 2026.5, -2, 18, -Math.PI / 2, "club", "The east bar", PP_KEYS.club, "Club bartender", "eastbar");
PP.staffAt.push({ title: "Barback", place: PP_KEYS.club, x: 1971.4, z: -12, ry: Math.PI / 2, seed: "barback" });
[[1976, 24, 0.6], [2024, 24, -0.6], [1979, -24, 2.4], [2021, -24, -2.4]].forEach(function (q) { ppSofa(R, q[0], q[1], q[2], 0x6A1A4A, 3); ppTable(R, q[0] + Math.sin(q[2]) * 1.4, q[1] + Math.cos(q[2]) * 1.4, 0.5); });
for (var b = 0; b < (PP.lite ? 4 : 8); b++) {
var be = ppBeam();
be.position.set(1984 + b * 4.5, 9.6, -6);
be.scale.setScalar(0.32);
Lv.add(be);
PP.beams.push({ m: be, ph: b * 0.9, base: 0, club: 1 });
}
var mb = ppSph(1.2, ppM(0xD8D8E8, { e: 0x3A3A4A }), 2000, 8, -2, Lv, 16);
PP.spin.push({ ball: mb });
PP.music.push({ k: "pp-club", zone: "club", x: 2000, z: -10, r: 60, C: { bpm: 124, band: false } });
PP.crowds.push({ x0: 1993, x1: 2007, z0: -9, z1: 5, n: PP.lite ? 5 : 14, y: 0.1, face: Math.PI, seed: "club" });
var nb = [];
for (var k = 0; k < 60; k++) {
nb.push([1970.3, 9.4, -29 + k]);
nb.push([2029.7, 9.4, -29 + k]);
}
ppBulbs(Lv, nb, 0.1);
ppWalk(1935, 1970, -8, 22, "club");
ppFloor(R, 1935, 1970, -8, 22, ppM(0x3A1428));
ppCeil(R, 1935, 1970, -8, 22, 6, ceil);
ppWalls(R, 1935, 1970, -8, 22, 6, ppM(0x4A1430), [{ s: "e", c: 10, w: 4 }]);
ppSign(R, ["THE VELVET ROOM"], 5, 1, 1969.6, 4.4, 4, -Math.PI / 2, "#2A0A18", "#FFB8D8");
ppBar(R, 1937.5, 8, 10, Math.PI / 2, "velvet", "The Velvet Room bar", PP_KEYS.club, "Club bartender", "velvet");
[[1950, -4, 0], [1958, -4, 0], [1950, 18, Math.PI], [1958, 18, Math.PI], [1964, 4, -Math.PI / 2]].forEach(function (q) { ppSofa(R, q[0], q[1], q[2], 0x7A1A3A, 3); ppTable(R, q[0] + Math.sin(q[2]) * 1.5, q[1] + Math.cos(q[2]) * 1.5, 0.5); });
ppBox(6, 0.5, 4, ppM(0x2A1020), 1944, 0.25, -5, R);
ppPad(1941, 1947, -7, -3, 0.5);
ppGrandPiano(R, 1944, 0.5, -5.4);
PP.bands.push({ x: 1944, y: 0.5, z: -4, face: Math.PI * 0.75, seed: "velvet", solo: "keys" });
PP.music.push({ k: "pp-velvet", zone: "club", x: 1950, z: 6, r: 22, C: { bpm: 92, band: true } });
PP.floors.push({ zone: "club", x0: 1948, x1: 1962, z0: 2, z1: 12, y: 0, name: "the Velvet Room's floor" });
for (var cd = 0; cd < 10; cd++) {
var cdl = ppSph(0.08, ppGlowMat(0xFFC060), 1945 + cd * 2.2, 0.7, cd % 2 ? -2.5 : 14.5, Lv, 6);
PP.flames.push({ m: cdl, ph: cd, small: 1 });
}
ppWalk(1950, 1970, 22.3, 40, "club");
ppFloor(R, 1950, 1970, 22.3, 40, ppM(0xD8D0E0));
ppCeil(R, 1950, 1970, 22.3, 40, 4, ceil);
ppWalls(R, 1950, 1970, 22.3, 40, 4, ppM(0xB8A8C8), [{ s: "e", c: 26, w: 3 }]);
ppBox(0.2, 4, 10, ppM(0xB8A8C8), 1960, 2, 35, R);
ppSolid(1960, 35, 0.1, 5);
for (var st = 0; st < 4; st++) {
ppBox(0.1, 2.2, 2.6, ppM(0x6A5A7A), 1952 + st * 2, 1.1, 38.5, R);
ppBox(0.8, 1.2, 1, ppM(0xF4F4F4), 1953 + st * 2, 0.6, 39.3, R);
}
for (var sk = 0; sk < 3; sk++) {
ppBox(1.4, 0.9, 0.6, ppM(0xF4F4F4), 1963 + sk * 2.2, 0.45, 39.6, R);
ppBox(1.2, 1, 0.05, ppM(0xC8D8E8, { e: 0x202838 }), 1963 + sk * 2.2, 1.8, 39.95, R);
}
ppSign(R, ["RESTROOMS"], 3, 0.6, 1969.6, 3, 26, -Math.PI / 2, "#1A1020", "#E8E0F4");
ppSpot({ x: 1964, z: 37, r: 2.2, name: "The washbasins: freshen up", fn: function () { setStatus("<b>You wash your hands and fix your hair</b> in the mirror. Ready for the floor again."); } });
ppWalk(1940, 1970, -30, -12, "club");
ppFloor(R, 1940, 1970, -30, -12, ppM(0x3A3A3A));
ppCeil(R, 1940, 1970, -30, -12, 5, ceil);
ppWalls(R, 1940, 1970, -30, -12, 5, ppM(0x4A4A50), [{ s: "e", c: -24, w: 2.4 }]);
ppGate(1940, 1969.7, -30, -12, "staff", "The stock room");
for (var kg = 0; kg < 10; kg++) {
ppCyl(0.35, 0.35, 0.9, ppM(0x9A9AA8), 1943 + (kg % 5) * 1.1, 0.45, -28 + Math.floor(kg / 5) * 1.1, R, 12);
}
for (var cr = 0; cr < 8; cr++)
ppBox(1, 0.8, 1, ppM(0x8A6A4A), 1952 + (cr % 4) * 1.2, 0.4 + Math.floor(cr / 4) * 0.8, -28.5, R);
ppBox(1.4, 1.8, 1, ppM(0xE8E8F0), 1964, 0.9, -28.6, R);
ppSolid(1948, -27.5, 5.5, 1.6);
ppSolid(1954, -28.5, 2.4, 0.6);
ppSolid(1964, -28.6, 0.7, 0.5);
ppSpot({ x: 1956, z: -24, r: 2.6, name: "The stock room: restock the bars", fn: ppRestock });
ppWalk(2030, 2062, -30, -4, "club");
ppFloor(R, 2036, 2062, -30, -4, ppM(0x2A1A10), 1.6);
ppCeil(R, 2030, 2062, -30, -4, 8, ceil);
ppBox(26, 1.6, 26, dark, 2049, 0.8, -17, R);
ppPad(2036, 2062, -30, -4, 1.6);
ppRamp(2030, 2036, -22, -18, 0, 1.6, "x");
ppBox(6, 0.2, 4, ppM(0x3A2A20), 2033, 0.8, -20, R).rotation.z = 0.26;
ppWalls(R, 2030, 2062, -30, -4, 8, ppM(0x2A1A10), [{ s: "w", c: -20, w: 3 }]);
ppGate(2030.2, 2062, -30, -4, "vip", "The VIP Lounge");
ppBox(0.1, 4, 10, ppM(0xA8C8E8, { op: 0.18 }), 2030.3, 5, -10, R);
ppSign(R, ["VIP"], 2, 0.8, 2030.4, 3.6, -20, Math.PI / 2, "#1A1208", "#F2D08A");
ppBar(R, 2059.5, -17, 10, -Math.PI / 2, "vip", "The VIP bar", PP_KEYS.club, "VIP host", "vipbar", 1.6);
[[2042, -27, 0], [2050, -27, 0], [2042, -7, Math.PI], [2050, -7, Math.PI]].forEach(function (q) {
ppSofa(R, q[0], q[1], q[2], 0xC9A868, 4, 1.6);
ppTable(R, q[0], q[1] + (q[2] ? -1.6 : 1.6), 0.7, 1.6);
var bucket = ppCyl(0.22, 0.18, 0.35, ppM(0xD8DCE4, { e: 0x202430 }), q[0] + 0.3, 1.6 + 0.8, q[1] + (q[2] ? -1.6 : 1.6), R, 10);
});
var ch = new THREE.Group();
ch.position.set(2047, 6.8, -17);
R.add(ch);
wMesh(new THREE.TorusGeometry(1.6, 0.08, 6, 24), gold, 0, 0, 0, ch).rotation.x = Math.PI / 2;
for (var q2 = 0; q2 < 14; q2++) {
var a = q2 / 14 * Math.PI * 2;
ppSph(0.12, ppM(0xFFF0D8, { b: 1 }), Math.cos(a) * 1.6, -0.2, Math.sin(a) * 1.6, ch, 6);
}
ppWalk(2030, 2052, 2, 22, "club");
ppFloor(R, 2030, 2052, 2, 22, ppM(0x2A3A2A));
ppCeil(R, 2030, 2052, 2, 22, 4.5, ceil);
ppWalls(R, 2030, 2052, 2, 22, 4.5, ppM(0x3A5A3A), [{ s: "w", c: 12, w: 2.4 }]);
ppGate(2030.3, 2052, 2, 22, "staff", "The Green Room");
ppSofa(R, 2044, 20.6, Math.PI, 0x3A6A4A, 4);
ppTable(R, 2044, 18.4, 0.6);
ppBox(5, 1.4, 0.1, ppM(0xE0E8F0, { e: 0x303840 }), 2051.8, 2.2, 10, R).rotation.y = Math.PI / 2;
for (var mb2 = 0; mb2 < 8; mb2++)
ppSph(0.1, ppM(0xFFF0D0, { b: 1 }), 2051.7, 1.4 + ((mb2 % 4) * 0.5), 7.6 + (mb2 < 4 ? 0 : 4.8), R, 6);
ppBox(2.4, 0.9, 1, ppM(0x6A4A30), 2036, 0.45, 4, R);
for (var fr = 0; fr < 6; fr++)
ppSph(0.14, ppM([0xE84A3A, 0xFFD040, 0x6AC83A][fr % 3]), 2035.3 + fr * 0.3, 1, 4, R, 6);
for (var fc = 0; fc < 4; fc++)
ppBox(1.2, 0.8, 0.8, ppM(0x1A1A1A), 2046 + fc * 1.3, 0.4, 3.2, R);
ppSolid(2036, 4, 1.2, 0.5);
ppSolid(2048, 3.2, 2.6, 0.4);
ppSpot({ x: 2040, z: 12, r: 3, name: "The Green Room: the night's set list", fn: function () { ppDjCard("green"); } });
ppBake(R);
},
function (G, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var bl = ppM(0x0A0A0E);
var body = wMesh(new THREE.CylinderGeometry(1.1, 1.1, 0.4, 16, 1, false, 0, Math.PI), bl, 0, 0.95, 0, g);
body.rotation.y = Math.PI / 2;
ppBox(2.2, 0.4, 1.2, bl, 0, 0.95, 0.55, g);
ppBox(1.6, 0.06, 0.3, ppM(0xF4F0E8), 0, 1.17, 1.0, g);
[[-0.9, 0.9], [0.9, 0.9], [0, -0.9]].forEach(function (q) { ppBox(0.12, 0.8, 0.12, bl, q[0], 0.4, q[1], g); });
PP.solids.push({ x: x, z: z, r: 1.3, h: 1.6, b: y - 0.2 });
},
function (G) {
var R = new THREE.Group();
R.name = "pp-echo";
G.add(R);
var Lv = new THREE.Group();
G.add(Lv);
PP.rooms.echo = { g: R, live: Lv };
var wall = ppM(0x1E2A4A), ceil = ppM(0x0A1020), floor = ppM(0x2A3450), carpet = ppM(0x3A2A5A), gold = ppM(0xC9A868, { e: 0x2A1C08 });
ppWalk(2490, 2510, 30, 46, "echo");
ppFloor(R, 2490, 2510, 30, 46, carpet);
ppCeil(R, 2490, 2510, 30, 46, 5, ceil);
ppWalls(R, 2490, 2510, 30, 46, 5, wall, [{ s: "n", c: 2500, w: 5 }, { s: "s", c: 2500, w: 3 }, { s: "e", c: 38, w: 2.4 }]);
ppBox(1, 1.1, 8, ppM(0x2A2040), 2507.6, 0.55, 40, R);
ppBox(1.2, 0.06, 8.2, gold, 2507.6, 1.12, 40, R);
ppSolid(2507.6, 40, 0.5, 4);
for (var sh = 0; sh < 12; sh++)
ppBox(0.3, 0.15, 0.5, ppM([0xC83A3A, 0x3A6AC8, 0x2A2A2A][sh % 3]), 2509.4, 0.4 + Math.floor(sh / 4) * 0.5, 37 + (sh % 4) * 0.9, R);
ppSpot({ x: 2505, z: 40, r: 2.4, name: "The front desk: lanes, rooms and shoes", fn: ppEchoDesk });
PP.staffAt.push({ title: "Bowling desk attendant", place: PP_KEYS.echo, x: 2508.6, z: 41, ry: -Math.PI / 2, seed: "desk1" });
ppSign(R, ["THE ECHO LOUNGE", "Karaoke left · games ahead · bowling right"], 7, 1.4, 2500, 3.6, 45.7, Math.PI, "#0A1028", "#A8D8FF");
ppSpot({ x: 2500, z: 44.6, r: 2, name: "The doors: back out onto Jubilee Boulevard", fn: function () { ppGoOut("echo"); } });
ppWalk(2510, 2524, 30, 46, "echo");
ppFloor(R, 2510, 2524, 30, 46, ppM(0x2A2A34));
ppCeil(R, 2510, 2524, 30, 46, 4, ceil);
ppWalls(R, 2510, 2524, 30, 46, 4, wall, [{ s: "w", c: 38, w: 2.4 }]);
ppGate(2510.3, 2524, 30, 46, "staff", "The staff office");
ppBox(4, 0.8, 1.6, ppM(0x3A3A4A), 2518, 0.4, 33, R);
ppSolid(2518, 33, 2, 0.8);
ppBox(1.4, 2, 0.6, ppM(0x5A5A6A), 2522.6, 1, 44, R);
ppSolid(2522.6, 44, 0.7, 0.3);
ppSpot({ x: 2518, z: 35.6, r: 2, name: "The office: the rota and the takings", fn: function () { ppOfficeCard("echo"); } });
PP.staffAt.push({ title: "Lounge manager", place: PP_KEYS.echo, x: 2518, z: 31.6, ry: 0, seed: "lman" });
ppWalk(2470, 2525, -40, 30, "echo");
ppFloor(R, 2470, 2525, -40, 30, floor);
ppCeil(R, 2470, 2525, -40, 30, 7, ceil);
ppWalls(R, 2470, 2525, -40, 30, 7, wall, [{ s: "s", c: 2500, w: 5 }, { s: "w", c: 2, w: 4 }, { s: "e", c: 22, w: 6 }]);
for (var pt = 0; pt < 3; pt++) {
var px = 2482 + pt * 10, pz = -6;
ppBox(2.6, 0.8, 1.5, ppM(0x5A3A20), px, 0.4, pz, R);
ppBox(2.4, 0.06, 1.3, ppM(0x1A6A3A), px, 0.83, pz, R);
ppSolid(px, pz, 1.3, 0.75);
for (var bl = 0; bl < 6; bl++)
ppSph(0.05, ppM([0xFFD040, 0xC83A3A, 0x3A6AC8, 0x1A1A1A, 0xF4F4F4, 0x6A2A8A][bl]), px - 0.6 + bl * 0.22, 0.9, pz + (bl % 2) * 0.2, R, 6);
var lamp = ppBox(1.8, 0.2, 0.5, ppM(0x2A6A3A), px, 2.6, pz, R);
ppSpot({ x: px, z: pz + 1.8, r: 1.8, name: "A pool table: rack them up", fn: ppPool });
}
for (var dt = 0; dt < 3; dt++) {
var dx = 2480 + dt * 7;
ppCyl(0.5, 0.5, 0.06, ppM(0x1A1A1A), dx, 1.75, -39.6, R, 20).rotation.x = Math.PI / 2;
ppCyl(0.35, 0.35, 0.07, ppM(0xC83A3A), dx, 1.75, -39.55, R, 20).rotation.x = Math.PI / 2;
ppCyl(0.08, 0.08, 0.08, ppM(0x3A8A3A), dx, 1.75, -39.5, R, 10).rotation.x = Math.PI / 2;
ppSpot({ x: dx, z: -35.4, r: 1.6, name: "A dartboard: three darts", fn: ppDarts });
}
var arc = (typeof ARC_ORDER !== "undefined" && ARC_ORDER) || ["paddle", "serpent", "bricks", "raiders", "rocks", "blocks", "hopper"];
for (var ac = 0; ac < 7; ac++) {
var ax = 2512 + (ac % 2) * 0, az = -34 + ac * 3.4;
var id = arc[ac % arc.length];
var cab = new THREE.Group();
cab.position.set(2523.6, 0, az);
cab.rotation.y = -Math.PI / 2;
R.add(cab);
ppBox(1.2, 2, 0.9, ppM([0x2A2A6A, 0x6A2A2A, 0x2A6A3A][ac % 3]), 0, 1, 0, cab);
ppBox(0.9, 0.7, 0.05, ppGlowMat(0x6AD8FF), 0, 1.45, 0.46, cab);
ppBox(1, 0.2, 0.4, ppM(0x1A1A1A), 0, 0.95, 0.55, cab);
ppSolid(2523.6, az, 0.5, 0.6);
(function (gid, z0) { ppSpot({ x: 2521.6, z: z0, r: 1.3, name: "An arcade cabinet", fn: function () { if (typeof arcOpen === "function" && typeof ARC_GAMES !== "undefined" && ARC_GAMES[gid])
arcOpen(gid);
else
setStatus("The cabinet hums, warming up."); } }); })(id, az);
}
PP.staffAt.push({ title: "Arcade and games attendant", place: PP_KEYS.echo, x: 2516, z: -12, ry: -Math.PI / 2, seed: "arc1" });
ppBar(R, 2490, 24, 10, Math.PI, "snack", "The snack bar", PP_KEYS.echo, "Snack bar cook", "snack");
ppBar(R, 2472.6, -24, 10, Math.PI / 2, "echo", "The lounge bar", PP_KEYS.echo, "Lounge bartender", "ebar");
PP.music.push({ k: "pp-echo", zone: "echo", x: 2497, z: 0, r: 40, C: { bpm: 110, band: false } });
var nb = [];
for (var k = 0; k < 55; k++) {
nb.push([2470.3 + k, 6.6, -39.7]);
}
ppBulbs(Lv, nb, 0.1);
ppWalk(2440, 2470, -40, 8, "echo");
ppFloor(R, 2440, 2470, -40, 8, carpet);
ppCeil(R, 2440, 2470, -40, 8, 4, ceil);
ppWalls(R, 2440, 2470, -40, 8, 4, wall, [{ s: "e", c: 2, w: 4 }]);
var cols = [0x6A2A8A, 0x2A6A8A, 0x8A2A4A, 0x2A8A5A, 0x8A6A2A, 0x3A3A8A];
for (var r = 0; r < 6; r++) {
var west = r < 3, i = r % 3, z0 = -38 + i * 12, z1 = z0 + 11, x0 = west ? 2440 : 2457, x1 = west ? 2453 : 2470;
var wx = west ? x1 : x0, zm = (z0 + z1) / 2, sl = (z1 - z0) / 2 - 1.1;
ppBox(0.3, 4, sl, wall, wx, 2, z0 + sl / 2, R);
ppSolid(wx, z0 + sl / 2, 0.15, sl / 2);
ppBox(0.3, 4, sl, wall, wx, 2, z1 - sl / 2, R);
ppSolid(wx, z1 - sl / 2, 0.15, sl / 2);
ppBox(0.3, 1.1, 2.2, wall, wx, 3.45, zm, R);
ppBox(x1 - x0, 4, 0.3, wall, (x0 + x1) / 2, 2, z1, R);
ppSolid((x0 + x1) / 2, z1, (x1 - x0) / 2, 0.15);
var scrX = west ? x0 + 0.2 : x1 - 0.2, cv = document.createElement("canvas");
cv.width = 256;
cv.height = 128;
var tx = new THREE.CanvasTexture(cv);
var sc = wMesh(new THREE.PlaneGeometry(4, 2.2), new THREE.MeshBasicMaterial({ map: tx }), scrX, 2.2, (z0 + z1) / 2, Lv);
sc.rotation.y = west ? Math.PI / 2 : -Math.PI / 2;
var room = { i: r, cv: cv, tex: tx, x0: x0, x1: x1, z0: z0, z1: z1 };
PP.screens.push({ cv: cv, tex: tx, kind: "karaoke", room: room });
ppSofa(R, west ? x0 + 7 : x1 - 7, z0 + 1.4, 0, cols[r], 4);
ppSofa(R, west ? x0 + 7 : x1 - 7, z1 - 1.4, Math.PI, cols[r], 4);
ppTable(R, west ? x0 + 7 : x1 - 7, (z0 + z1) / 2, 0.8);
ppCyl(0.02, 0.02, 1.4, ppM(0x2A2A2A), west ? x0 + 3 : x1 - 3, 0.7, (z0 + z1) / 2, R, 5);
(function (room, west) { ppSpot({ x: west ? room.x0 + 4 : room.x1 - 4, z: (room.z0 + room.z1) / 2, r: 2.6, name: "Karaoke room " + (room.i + 1) + ": pick a song", fn: function () { ppKaraoke(room); } }); })(room, west);
ppSign(R, ["ROOM " + (r + 1)], 1.4, 0.5, west ? x1 + 0.2 : x0 - 0.2, 3.45, (z0 + z1) / 2, west ? Math.PI / 2 : -Math.PI / 2, "#0A1028", "#FFB8E8");
}
PP.staffAt.push({ title: "Karaoke host", place: PP_KEYS.echo, x: 2455, z: 4, ry: 0, seed: "kh1" });
ppWalk(2525, 2562, -40, 30, "echo");
ppFloor(R, 2525, 2562, -40, 30, ppM(0x2A2A3A));
ppCeil(R, 2525, 2562, -40, 30, 6, ceil);
ppWalls(R, 2525, 2562, -40, 30, 6, wall, [{ s: "w", c: 22, w: 6 }]);
PP.lanes = [];
for (var ln = 0; ln < 6; ln++) {
var lx = 2529 + ln * 5.4;
ppBox(3.4, 0.1, 52, ppM(0xD8B888), lx, 0.05, -12, R);
ppBox(0.4, 0.12, 52, ppM(0x3A3A4A), lx - 1.9, 0.04, -12, R);
ppBox(0.4, 0.12, 52, ppM(0x3A3A4A), lx + 1.9, 0.04, -12, R);
if (ln < 5)
ppBox(1.1, 0.6, 52, ppM(0x1A1A2A), lx + 2.7, 0.3, -12, R);
var pins = [], pr = 0;
for (var row = 0; row < 4; row++)
for (var p = 0; p <= row; p++) {
var pg = new THREE.Group();
pg.position.set(lx - row * 0.3 + p * 0.6, 0.1, -35 - row * 0.5);
Lv.add(ppKeep(pg));
ppCyl(0.08, 0.12, 0.38, ppM(0xF4F4F4), 0, 0.19, 0, pg, 8);
ppSph(0.08, ppM(0xF4F4F4), 0, 0.45, 0, pg, 8);
ppCyl(0.09, 0.09, 0.04, ppM(0xC83A3A), 0, 0.34, 0, pg, 8);
pins.push(pg);
}
ppBox(1, 0.7, 1.2, ppM(0x2A2A4A), lx + 1.6, 0.35, 16, R);
ppSph(0.22, ppM([0x3A3AC8, 0xC83A3A, 0x2A8A3A, 0x8A3AC8, 0xE8A03A, 0x1A1A1A][ln]), lx + 1.6, 0.85, 16, R, 10);
ppSolid(lx, -12, 1.95, 26 - (ln ? 0 : 0) - 4.2);
PP.lanes.push({ x: lx, pins: pins });
(function (n, x) { ppSpot({ x: x, z: 18.6, r: 1.6, name: "Lane " + (n + 1) + ": bowl a game", fn: function () { ppBowl(n); } }); })(ln, lx);
}
ppSolid(2543.5, -12, 17, 25.8);
for (var sb = 0; sb < 3; sb++)
ppSofa(R, 2533 + sb * 11, 24.5, Math.PI, 0x3A3A8A, 4);
var sc2 = document.createElement("canvas");
sc2.width = 256;
sc2.height = 64;
var t2 = new THREE.CanvasTexture(sc2);
wMesh(new THREE.PlaneGeometry(30, 2), new THREE.MeshBasicMaterial({ map: t2 }), 2543.5, 4.6, 13, Lv);
PP.screens.push({ cv: sc2, tex: t2, kind: "bowl" });
ppBake(R);
},
function (G) {
var R = new THREE.Group();
R.name = "pp-shop";
G.add(R);
var Lv = new THREE.Group();
G.add(Lv);
PP.rooms.shop = { g: R, live: Lv };
var wall = ppM(0xF6D6E4), ceil = ppM(0xFFF4F8), floor = ppM(0xE8D8C8), shelf = ppM(0xFFFFFF), pink = ppM(0xE84A8A);
ppWalk(2985, 3015, -15, 20, "shop");
ppFloor(R, 2985, 3015, -15, 20, floor);
ppCeil(R, 2985, 3015, -15, 20, 5, ceil);
ppWalls(R, 2985, 3015, -15, 20, 5, wall, [{ s: "s", c: 3000, w: 3 }, { s: "n", c: 2992, w: 2.4 }, { s: "n", c: 3008, w: 2.4 }]);
ppSpot({ x: 3000, z: 18.6, r: 2, name: "The door: back out onto Jubilee Boulevard", fn: function () { ppGoOut("shop"); } });
ppBox(6, 1.1, 1, ppM(0xE84A8A), 2992, 0.55, -8, R);
ppBox(6.2, 0.06, 1.2, ppM(0xFFFFFF), 2992, 1.12, -8, R);
ppSolid(2992, -8, 3, 0.5);
ppSpot({ x: 2992, z: -5.6, r: 2.4, name: "The counter: everything for the party", fn: function () { ppShopCard("party"); } });
PP.staffAt.push({ title: "Party shop keeper", place: PP_KEYS.shop, x: 2992, z: -9.4, ry: 0, seed: "shopk" });
var cols = [0xFF6AA8, 0xFFD06A, 0x6AD8FF, 0xA88AFF, 0x8AE8A8, 0xFF9A5A];
for (var s = 0; s < 3; s++) {
var sx = 2993 + s * 7;
for (var lv = 0; lv < 4; lv++) {
ppBox(5, 0.08, 1, shelf, sx, 0.3 + lv * 0.6, 4, R);
for (var it = 0; it < 8; it++)
ppBox(0.4, 0.35, 0.35, ppM(cols[(it + lv + s) % 6]), sx - 2.1 + it * 0.6, 0.52 + lv * 0.6, 4, R);
}
ppSolid(sx, 4, 2.5, 0.55);
}
var R2 = ppRand(77);
for (var b = 0; b < 40; b++) {
var bx = 3014.6, by = 1 + R2() * 3.4, bz = -13 + R2() * 30;
ppSph(0.35, ppM(cols[b % 6]), bx, by, bz, R, 8);
}
ppSpot({ x: 3012, z: 6, r: 2.6, name: "The balloon wall: the balloon artist", fn: ppBalloon });
PP.staffAt.push({ title: "Balloon artist", place: PP_KEYS.shop, x: 3012.6, z: 9, ry: -Math.PI / 2, seed: "balloon" });
ppBox(0.1, 0.1, 8, ppM(0xC9A868), 2986.4, 2, 12, R);
ppSolid(2986.6, 12, 0.4, 4);
for (var c = 0; c < 12; c++) {
ppBox(0.1, 1.2, 0.6, ppM(cols[c % 6]), 2986.4, 1.3, 8.4 + c * 0.62, R);
}
ppSpot({ x: 2988.6, z: 12, r: 2.2, name: "The costume rail", fn: function () { ppShopCard("costume"); } });
PP.staffAt.push({ title: "Party shop assistant", place: PP_KEYS.shop, x: 3004, z: -2, ry: Math.PI, seed: "shopa" });
var bl = [];
for (var k = 0; k < 40; k++)
bl.push([2985.5 + k * 0.74, 4.6, -14.6]);
ppBulbs(Lv, bl, 0.09);
ppWalk(2985, 3000, -30, -15, "shop");
ppFloor(R, 2985, 3000, -30, -15, ppM(0xD8C8E8));
ppCeil(R, 2985, 3000, -30, -15, 4, ceil);
ppWalls(R, 2985, 3000, -30, -15, 4, ppM(0xE8D8F0), [{ s: "s", c: 2992, w: 2.4 }]);
ppBox(3, 0.8, 1.4, ppM(0x6A4A30), 2992, 0.4, -25, R);
ppSolid(2992, -25, 1.5, 0.7);
ppBox(4, 2.6, 0.1, ppM(0xF4ECE0), 2992, 1.8, -29.8, R);
ppSpot({ x: 2992, z: -22.6, r: 2.2, name: "The party planner: plan a party", fn: ppPlanner });
PP.staffAt.push({ title: "Event planner", place: PP_KEYS.port, x: 2992, z: -26.4, ry: 0, seed: "planner" });
ppWalk(3000, 3015, -30, -15, "shop");
ppFloor(R, 3000, 3015, -30, -15, ppM(0x5A5A5A));
ppCeil(R, 3000, 3015, -30, -15, 4, ceil);
ppWalls(R, 3000, 3015, -30, -15, 4, ppM(0x8A8A8A), [{ s: "s", c: 3008, w: 2.4 }]);
ppGate(3000.3, 3015, -30, -15.3, "staff", "The stock room");
for (var cr = 0; cr < 10; cr++)
ppBox(1.2, 0.9, 1, ppM(0x8A6A4A), 3002 + (cr % 5) * 2.4, 0.45 + Math.floor(cr / 5) * 0.9, -28.6, R);
ppSolid(3008, -28.6, 6.4, 0.6);
ppSpot({ x: 3008, z: -25, r: 2.4, name: "The stock room: fill the shelves", fn: ppRestock });
ppBake(R);
},
function (G) {
var R = new THREE.Group();
R.name = "pp-hall";
G.add(R);
var Lv = new THREE.Group();
G.add(Lv);
PP.rooms.hall = { g: R, live: Lv };
var wall = ppM(0xA8987E), gold = ppM(0xB8965A, { e: 0x2A1C06 }), ceil = ppM(0x8A7A62), marble = ppM(0xB8AC98), red = ppM(0x7A1A26), dark = ppM(0x2A2018);
ppWalk(3490, 3510, 30, 46, "hall");
ppFloor(R, 3490, 3510, 30, 46, marble);
ppCeil(R, 3490, 3510, 30, 46, 6, ceil);
ppWalls(R, 3490, 3510, 30, 46, 6, wall, [{ s: "n", c: 3500, w: 5 }, { s: "s", c: 3500, w: 3 }, { s: "e", c: 38, w: 2.4 }]);
ppSpot({ x: 3500, z: 44.6, r: 2, name: "The doors: back out to the gates", fn: function () { ppGoOut("hall"); } });
var gb = document.createElement("canvas");
gb.width = 512;
gb.height = 256;
var gt = new THREE.CanvasTexture(gb);
wMesh(new THREE.PlaneGeometry(4, 2), new THREE.MeshBasicMaterial({ map: gt }), 3490.2, 2.4, 38, Lv).rotation.y = Math.PI / 2;
PP.screens.push({ cv: gb, tex: gt, kind: "gather" });
ppSpot({ x: 3492.6, z: 38, r: 2.2, name: "The gathering: when the twenty meet", fn: ppGatherCard });
ppWalk(3510, 3522, 30, 46, "hall");
ppFloor(R, 3510, 3522, 30, 46, marble);
ppCeil(R, 3510, 3522, 30, 46, 4, ceil);
ppWalls(R, 3510, 3522, 30, 46, 4, wall, [{ s: "w", c: 38, w: 2.4 }]);
ppBox(0.8, 1.1, 8, dark, 3519, 0.55, 38, R);
ppBox(1, 0.06, 8.2, gold, 3519, 1.12, 38, R);
ppSolid(3519, 38, 0.4, 4);
ppSpot({ x: 3516.6, z: 38, r: 2.2, name: "The cloakroom", fn: ppCoatCheck });
PP.staffAt.push({ title: "Banquet server", place: PP_KEYS.hall, x: 3520.4, z: 39, ry: -Math.PI / 2, seed: "cloak" });
ppWalk(3465, 3535, -30, 30, "hall");
ppFloor(R, 3465, 3535, -30, 30, ppM(0x7A6650));
ppCeil(R, 3465, 3535, -30, 30, 12, ceil);
ppWalls(R, 3465, 3535, -30, 30, 12, wall, [{ s: "s", c: 3500, w: 5 }, { s: "e", c: 0, w: 4 }, { s: "e", c: -20, w: 2.4 }]);
for (var c = 0; c < 10; c++) {
var cz = -26 + c * 5.8;
[3466, 3534].forEach(function (cx) { ppCyl(0.5, 0.5, 12, marble, cx, 6, cz, R, 12); ppBox(1.2, 0.4, 1.2, gold, cx, 11.6, cz, R); });
}
ppBox(70, 0.4, 0.4, gold, 3500, 11.4, -29.6, R);
ppBox(70, 0.4, 0.4, gold, 3500, 11.4, 29.6, R);
ppDanceFloor(Lv, "hall", 3504, 4, 8, 1.8, 0, "hall", [[0.96, 0.82, 0.48], [0.98, 0.92, 0.70], [0.90, 0.70, 0.40], [0.96, 0.86, 0.62]]);
[[3504, 4], [3484, -12], [3484, 16], [3522, -16], [3522, 20]].forEach(function (q) {
var ch = new THREE.Group();
ch.position.set(q[0], 9.4, q[1]);
R.add(ch);
wMesh(new THREE.TorusGeometry(1.8, 0.1, 6, 24), gold, 0, 0, 0, ch).rotation.x = Math.PI / 2;
wMesh(new THREE.TorusGeometry(1.1, 0.08, 6, 20), gold, 0, -0.6, 0, ch).rotation.x = Math.PI / 2;
ppCyl(0.04, 0.04, 2.6, gold, 0, 1.3, 0, ch, 4);
for (var k = 0; k < 14; k++) {
var a = k / 14 * Math.PI * 2;
ppSph(0.14, ppM(0xFFF0D0, { b: 1 }), Math.cos(a) * 1.8, -0.2, Math.sin(a) * 1.8, ch, 6);
}
var gl = wGlow(0xFFE0A0, 8, 0.3);
gl.position.set(q[0], 9.2, q[1]);
Lv.add(gl);
});
ppBox(24, 0.8, 6, ppM(0x5A3A20), 3500, 0.4, -27, R);
ppPad(3488, 3512, -30, -24, 0.8);
ppBox(24, 8, 0.2, red, 3500, 4.8, -29.7, R);
[-11, 11].forEach(function (dx) { ppBox(2, 10, 0.4, red, 3500 + dx, 5, -29, R); });
PP.quartet = { x: 3500, y: 0.8, z: -27 };
PP.music.push({ k: "pp-hall", zone: "hall", x: 3500, z: -20, r: 60, C: { bpm: 84, band: true } });
ppBox(3, 0.1, 40, ppM(0xF8F4EC), 3474, 0.82, 0, R);
ppBox(2.6, 0.8, 39, ppM(0x5A3A20), 3474, 0.4, 0, R);
ppSolid(3474, 0, 1.5, 20, 0, 1, -0.2);
for (var s = 0; s < 20; s++) {
var side = s < 10 ? -1 : 1, sz = -17.5 + (s % 10) * 3.9, sx = 3474 + side * 2.2;
ppBox(0.6, 0.5, 0.6, red, sx, 0.45, sz, R);
ppBox(0.6, 1, 0.1, red, sx + side * 0.3, 1, sz, R).rotation.y = Math.PI / 2;
ppSolid(sx, sz, 0.35, 0.35, 0, 1.2, -0.2);
ppCyl(0.22, 0.22, 0.02, ppM(0xF4F4F4), 3474 + side * 0.9, 0.88, sz, R, 14);
ppCyl(0.04, 0.03, 0.24, ppM(0xE8F0F8, { op: 0.6 }), 3474 + side * 0.9 + side * -0.35, 1, sz + 0.3, R, 6);
var card = wSign(["No. " + (s + 1)], 0.3, 0.16, "#F8F0E0", "#8A6A2A");
card.position.set(3474 + side * 0.6, 0.95, sz);
card.rotation.y = side < 0 ? -Math.PI / 2 : Math.PI / 2;
R.add(card);
}
ppBox(0.8, 1.6, 0.8, ppM(0xC9A868), 3474, 0.8, -21.2, R);
ppSolid(3474, -21.2, 0.4, 0.4);
for (var cd = 0; cd < 8; cd++) {
var cdl = ppSph(0.07, ppGlowMat(0xFFC060), 3474, 1.18, -16 + cd * 4.6, Lv, 6);
ppCyl(0.04, 0.05, 0.3, ppM(0xF4ECE0), 3474, 0.98, -16 + cd * 4.6, R, 6);
PP.flames.push({ m: cdl, ph: cd, small: 1 });
}
ppSpot({ x: 3478.6, z: 0, r: 3, name: "The banquet of twenty", fn: function () { ppMenu("hall", "The banquet of twenty"); } });
for (var t = 0; t < 5; t++) {
var rr = 2 - t * 0.4;
for (var gq = 0; gq < Math.max(1, Math.round(rr * 8)); gq++) {
var a2 = gq / Math.max(1, Math.round(rr * 8)) * Math.PI * 2;
ppCyl(0.1, 0.06, 0.25, ppM(0xF0E8C0, { op: 0.7 }), 3526 + Math.cos(a2) * rr, 1.2 + t * 0.3, 14 + Math.sin(a2) * rr, R, 6);
}
}
ppCyl(2.2, 2.2, 1.05, ppM(0xF4ECE0), 3526, 0.52, 14, R, 20);
ppSolidR(3526, 14, 2.3);
ppSpot({ x: 3522.6, z: 14, r: 2.4, name: "The fountain of sparkling wine and cider", fn: function () { ppMenu("hall", "The fountain"); } });
PP.staffAt.push({ title: "Banquet server", place: PP_KEYS.hall, x: 3478, z: -8, ry: -Math.PI / 2, seed: "bs1" }, { title: "Banquet server", place: PP_KEYS.hall, x: 3524, z: 10, ry: Math.PI, seed: "bs2" }, { title: "Gilded Hall steward", place: PP_KEYS.hall, x: 3500, z: 27, ry: Math.PI, seed: "hst2" });
for (var p = 0; p < 6; p++) {
var pzz = -24 + p * 9;
ppBox(0.1, 2.4, 1.8, gold, 3534.7, 4.6, pzz, R);
ppBox(0.12, 2, 1.4, ppM([0x3A2A4A, 0x2A3A4A, 0x4A2A2A][p % 3]), 3534.6, 4.6, pzz, R);
}
ppBox(1.2, 1, 0.8, dark, 3530, 0.5, -8, R);
ppSolid(3530, -8, 0.6, 0.4);
ppBox(0.9, 0.05, 0.6, ppM(0xF4ECE0), 3530, 1.03, -8, R);
ppSpot({ x: 3528, z: -8, r: 2, name: "The guest book: the twenty places", fn: ppGuestBook });
ppWalk(3535, 3555, -12, 12, "hall");
ppFloor(R, 3535, 3555, -12, 12, marble);
ppCeil(R, 3535, 3555, -12, 12, 8, ppM(0x1A1438));
ppWalls(R, 3535, 3555, -12, 12, 8, ppM(0xF4ECE0), [{ s: "w", c: 0, w: 4 }]);
var sky = wTex(512, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#120838");
g.addColorStop(1, "#46205E");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 300; i++) {
x.fillStyle = "rgba(255,250,255," + (0.3 + Math.random() * 0.7).toFixed(2) + ")";
x.fillRect(Math.random() * W, Math.random() * H * 0.8, 1.5, 1.5);
}
x.fillStyle = "#C8A8D8";
x.beginPath();
x.arc(W * 0.7, H * 0.35, 40, 0, 7);
x.fill();
x.strokeStyle = "rgba(240,210,250,.7)";
x.lineWidth = 6;
x.beginPath();
x.ellipse(W * 0.7, H * 0.35, 80, 18, -0.3, 0, 7);
x.stroke();
});
var win = wMesh(new THREE.PlaneGeometry(22, 6), new THREE.MeshBasicMaterial({ map: sky }), 3554.8, 4.2, 0, R);
win.rotation.y = -Math.PI / 2;
for (var o = 0; o < 4; o++) {
ppCyl(0.5, 0.4, 0.8, ppM(0xC87A4A), 3538 + o * 4.5, 0.4, -10, R, 10);
ppSph(0.9, ppM(0x3A7A3A), 3538 + o * 4.5, 1.6, -10, R, 8);
for (var fz = 0; fz < 5; fz++)
ppSph(0.12, ppM(0xFFA030), 3538 + o * 4.5 + Math.cos(fz) * 0.7, 1.6 + Math.sin(fz * 2) * 0.5, -10 + Math.sin(fz) * 0.7, R, 6);
ppSolidR(3538 + o * 4.5, -10, 0.7);
}
ppSofa(R, 3545, 10.5, Math.PI, 0xC9A868, 4);
ppSpot({ x: 3548, z: 0, r: 3, name: "The Orangery: the stars over Jubilee", fn: function () { ppRest("the Orangery"); } });
ppWalk(3535, 3550, -28, -12.3, "hall");
ppFloor(R, 3535, 3550, -28, -12.3, ppM(0x3A1A2A));
ppCeil(R, 3535, 3550, -28, -12.3, 5, ceil);
ppWalls(R, 3535, 3550, -28, -12.3, 5, ppM(0x5A2A3A), [{ s: "w", c: -20, w: 2.4 }]);
ppGate(3535.3, 3550, -28, -12.3, "keeper", "The Keeper's anteroom");
ppBox(3, 0.8, 1.4, ppM(0x5A3A20), 3543, 0.4, -24, R);
ppSolid(3543, -24, 1.5, 0.7);
ppBox(1, 2, 0.6, ppM(0x8A1A2A), 3543, 1, -27, R);
ppSpot({ x: 3543, z: -21.6, r: 2.2, name: "The Keeper's desk: set the date of the gathering", fn: ppGatherSet });
ppBake(R);
}
];
});
