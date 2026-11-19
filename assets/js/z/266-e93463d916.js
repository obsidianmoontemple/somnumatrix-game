/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(266, function () {
"use strict";
return [
function (G, axis, fixed, a, b, h, gaps, mat, trimM, inner) {
var cur = a;
gaps.concat([null]).forEach(function (g) {
var e = g === null ? b : g - 2.2;
if (e > cur) {
var L = e - cur, m = (cur + e) / 2;
if (axis === "x") {
wBox(L, h, 0.4, mat, m, h / 2, fixed, G);
wBox(L, 0.12, 0.1, trimM, m, 1.25, fixed + inner * 0.25, G);
}
else {
wBox(0.4, h, L, mat, fixed, h / 2, m, G);
wBox(0.1, 0.12, L, trimM, fixed + inner * 0.25, 1.25, m, G);
}
}
if (g !== null) {
if (axis === "x")
wBox(4.4, h - 4, 0.4, mat, g, 4 + (h - 4) / 2, fixed, G);
else
wBox(0.4, h - 4, 4.4, mat, fixed, 4 + (h - 4) / 2, g, G);
cur = g + 2.2;
}
});
},
function (G, R) {
var M = sdMats(), floor = wM(R.floor), wall = wM(R.wall), trim = wB(R.trim, { fog: false }), W = R.x1 - R.x0, D = R.z1 - R.z0, cx = (R.x0 + R.x1) / 2, cz = (R.z0 + R.z1) / 2;
wBox(W, 0.2, D, floor, cx, -0.1, cz, G);
wBox(W, 0.2, D, wM(0x5A6474, { e: 0x30363F }), cx, R.h + 0.1, cz, G);
for (var lz = R.z0 + 5; lz < R.z1 - 2; lz += 9)
wBox(W - 8, 0.08, 0.5, M.light, cx, R.h - 0.02, lz, G);
var gapsOn = function (side) {
var out = [];
SD_DOORS.forEach(function (d) {
if (d.ax === "x" && (side === "w" && Math.abs(d.x - R.x0) < 0.1 || side === "e" && Math.abs(d.x - R.x1) < 0.1) && d.z > R.z0 && d.z < R.z1)
out.push(d.z);
if (d.ax === "z" && (side === "n" && Math.abs(d.z - R.z0) < 0.1 || side === "s" && Math.abs(d.z - R.z1) < 0.1) && d.x > R.x0 && d.x < R.x1)
out.push(d.x);
});
return out.sort(function (a, b) { return a - b; });
};
if (!R.skip.n && R.window !== "n")
sdWall(G, "x", R.z0, R.x0, R.x1, R.h, gapsOn("n"), wall, trim, 1);
if (!R.skip.s)
sdWall(G, "x", R.z1, R.x0, R.x1, R.h, gapsOn("s"), wall, trim, -1);
if (!R.skip.w)
sdWall(G, "z", R.x0, R.z0, R.z1, R.h, gapsOn("w"), wall, trim, 1);
if (!R.skip.e)
sdWall(G, "z", R.x1, R.z0, R.z1, R.h, gapsOn("e"), wall, trim, -1);
if (R.window === "n") {
wBox(W, 0.6, 0.8, wM(0x3A6AB8), cx, 0.3, R.z0, G);
wBox(W, 0.8, 0.8, wM(0x4A5464), cx, R.h - 0.3, R.z0, G);
for (var mx = R.x0; mx <= R.x1 + 0.1; mx += 8)
wBox(0.5, R.h, 0.8, wM(0x4A5464), mx, R.h / 2, R.z0, G);
wBox(W - 1, 1, 0.15, wM(0x8A8E98, { op: 0.6 }), cx, 1, R.z0 + 3, G);
STN.solids.push({ x: cx, z: R.z0 + 2.6, hw: W / 2, hd: 0.4 });
}
STN.rooms.push({ x0: R.x0 + 0.6, x1: R.x1 - 0.6, z0: R.z0 + (R.window === "n" ? 3.2 : 0.6), z1: R.z1 - 0.6, k: R.k });
},
function (G, d) {
var R = SD_ROOMS.filter(function (r) { return r.k === d.to; })[0], trim = wB(R.trim, { fog: false });
if (d.ax === "x") {
wBox(0.5, 4, 0.14, trim, d.x, 2, d.z - 2.15, G);
wBox(0.5, 4, 0.14, trim, d.x, 2, d.z + 2.15, G);
wBox(0.5, 0.14, 4.4, trim, d.x, 4.02, d.z, G);
[-1, 1].forEach(function (s) { var sg = wSign([R.name], 4.2, 0.7, "#0E1A2E", "#" + ("000000" + R.trim.toString(16)).slice(-6)); sg.position.set(d.x + s * 0.26, 4.6, d.z); sg.rotation.y = s * Math.PI / 2; G.add(sg); });
STN.doors.push({ x: d.x, z: d.z, hx: 1.4, hz: 1.6 });
}
else {
wBox(0.14, 4, 0.5, trim, d.x - 2.15, 2, d.z, G);
wBox(0.14, 4, 0.5, trim, d.x + 2.15, 2, d.z, G);
wBox(4.4, 0.14, 0.5, trim, d.x, 4.02, d.z, G);
[-1, 1].forEach(function (s) { var sg = wSign([R.name], 4.2, 0.7, "#0E1A2E", "#" + ("000000" + R.trim.toString(16)).slice(-6)); sg.position.set(d.x, 4.6, d.z + s * 0.26); sg.rotation.y = s > 0 ? 0 : Math.PI; G.add(sg); });
STN.doors.push({ x: d.x, z: d.z, hx: 1.6, hz: 1.4 });
}
},
function (G) {
var A = SD_ARENA, edgeA = wB(0x6AE0FF, { fog: false }), edgeB = wB(0xE86AD8, { fog: false }), block = wM(0x30384A), floorLine = wB(0x22405A, { fog: false });
for (var gx = 30; gx <= 80; gx += 5)
wBox(0.05, 0.02, 34, floorLine, gx, 0.01, -17.5, G);
for (var gz = -33; gz <= -2; gz += 5)
wBox(52, 0.02, 0.05, floorLine, 54, 0.01, gz, G);
var cover = [[38, -28, 4, 0.5, 1.3], [38, -8, 4, 0.5, 1.3], [46, -18, 0.5, 5, 1.3], [54, -28, 0.6, 0.6, 4], [54, -8, 0.6, 0.6, 4], [54, -18, 3, 3, 2.2],
[62, -18, 0.5, 5, 1.3], [70, -28, 4, 0.5, 1.3], [70, -8, 4, 0.5, 1.3], [76, -18, 1.2, 1.2, 3], [46, -30, 1, 1, 2.2], [62, -6, 1, 1, 2.2], [33, -18, 1, 1, 2.2]];
cover.forEach(function (c, i) {
var x = c[0], z = c[1], hw = c[2], hd = c[3], h = c[4];
wBox(hw * 2, h, hd * 2, block, x, h / 2, z, G);
wBox(hw * 2 + 0.04, 0.06, hd * 2 + 0.04, i % 2 ? edgeA : edgeB, x, h, z, G);
STN.solids.push({ x: x, z: z, hw: hw, hd: hd, h: h + 5 });
SD.cover.push({ x: x, z: z, hw: hw, hd: hd, h: h });
});
wBox(0.3, 1.6, 3, wM(0x2A3440), 31, 0.8, -29, G);
for (var r = 0; r < 4; r++)
wBox(0.12, 0.1, 0.5, wM(0x3A6AB8), 30.8, 0.7 + r * 0.3, -29, G);
STN.solids.push({ x: 31, z: -29, hw: 0.4, hd: 1.5 });
var sb = wSign(["LASER TAG", "Solo target run · live matches for 2 to 8", "Press E at the rack by the door"], 7, 2.2, "#0A1424", "#6AE0FF");
sb.position.set(54, 4.2, -34.4);
G.add(sb);
STN.spots.push({ x: 31, z: -26, r: 3.2, name: "The tag blaster rack", fn: function () { sdTagCard(); } });
},
function (G) {
var C = SD_DUEL, ring = wB(0xFFD24A, { fog: false });
var piste = wCyl(C.r, C.r, 0.06, wM(0x2A3040), C.x, 0.03, C.z, G, 40);
var rim = new THREE.Mesh(new THREE.TorusGeometry(C.r, 0.07, 6, 64), ring);
rim.rotation.x = Math.PI / 2;
rim.position.set(C.x, 0.08, C.z);
G.add(rim);
wBox(0.1, 0.02, 1.2, ring, C.x - 2, 0.07, C.z, G);
wBox(0.1, 0.02, 1.2, ring, C.x + 2, 0.07, C.z, G);
[[C.x, C.z - 9.5, 0], [C.x, C.z + 9.5, 0], [C.x + 10, C.z, Math.PI / 2]].forEach(function (b) { var bn = wBox(b[2] ? 1 : 8, 0.45, b[2] ? 8 : 1, wM(0x6A5A4A), b[0], 0.23, b[1], G); STN.solids.push({ x: b[0], z: b[1], hw: b[2] ? 0.5 : 4, hd: b[2] ? 4 : 0.5, h: 0.5 }); });
for (var a = 0; a < 16; a++) {
var an = a / 16 * Math.PI * 2;
if (Math.abs(Math.sin(an)) > 0.97 && Math.cos(an) < 0)
continue;
wCyl(0.05, 0.05, 1, wM(0x9AA0AA), C.x + Math.cos(an) * (C.r + 1.2), 0.5, C.z + Math.sin(an) * (C.r + 1.2), G, 6);
}
wBox(0.3, 2, 3, wM(0x2A3440), 55.6, 1, 6, G);
STN.solids.push({ x: 55.6, z: 6, hw: 0.4, hd: 1.5 });
[0x5AB8FF, 0x5AFF7A, 0xFF4A3A, 0xFFD24A].forEach(function (c, i) { wCyl(0.03, 0.03, 1.1, wB(c, { fog: false }), 55.3, 1.2, 5 + i * 0.6, G, 6); });
var rules = wSign(["THE RULES OF THE DECK", "Five touches wins · Block stops a cut", "Only a parry stops a thrust · Step back out of reach"], 7, 2.2, "#2A2018", "#FFE7B0");
rules.position.set(42, 3.6, 30.6);
rules.rotation.y = Math.PI;
G.add(rules);
STN.spots.push({ x: C.x - C.r - 1.6, z: C.z, r: 2.6, name: "The duelling master", fn: function () { sdDuelCard(); } });
STN.spots.push({ x: 54, z: 6, r: 2.4, name: "The sabre rack", fn: function () { sdDuelCard(); } });
try {
var m = wPerson("stn_duelmaster", { title: "Duelling master", place: "Station Aurora", look: { layer: "uniform", layerColor: 0x2A2A34, bottom: 0x1A1A22, shoes: 0x111111, hat: null } });
m.position.set(C.x - C.r - 0.6, 0, C.z + 1.6);
m.rotation.y = Math.PI / 2;
G.add(m);
var sab = sdSabre(0xFFD24A);
m.add(sab);
sdPose(sab, "rest", 1);
SD.master = { g: m, sab: sab, home: m.position.clone() };
}
catch (e) { }
},
function (col) {
var g = new THREE.Group(), h = new THREE.Group();
g.add(h);
h.add(P(cyl(.025, .025, .26, 8), mL(0x8A8E96), 0, 0, 0));
h.add(P(cyl(.03, .03, .04, 8), mL(0x2A2E36), 0, .12, 0));
h.add(P(cyl(.016, .016, .95, 6), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), 0, .62, 0));
h.add(P(cyl(.034, .034, .98, 8), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending }), 0, .62, 0));
g.position.set(0.3, 1.0, 0.2);
g.userData.h = h;
g.userData.pose = { rx: 0, ry: 0, rz: 0, z: 0 };
return g;
},
function (G) {
var Z = SD_ZERO, padM = wM(0x5A7AA8), rail = wM(0xE8C27A), wall = wM(0xD8E0EA);
wBox(0.4, 4, 31, wall, 57, 8, 15.5, G);
wBox(24, 4, 0.4, wall, 69, 8, 0, G);
for (var y = 1; y < 9; y += 2.2) {
wBox(0.12, 0.08, Z.z1 - Z.z0 - 2, rail, Z.x1 - 0.5, y, (Z.z0 + Z.z1) / 2, G);
wBox(Z.x1 - Z.x0 - 2, 0.08, 0.12, rail, (Z.x0 + Z.x1) / 2, y, Z.z1 - 0.5, G);
}
for (var px = 60; px < 80; px += 4)
wBox(3.4, 3.4, 0.12, padM, px, 5, Z.z1 - 0.3, G);
[[63, 3.6, 10], [70, 5.6, 18], [76, 7.4, 9]].forEach(function (h, i) {
var t = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.09, 8, 32), wB([0x8FD8FF, 0xFFD24A, 0x7AE8A8][i], { fog: false }));
t.position.set(h[0], h[1], h[2]);
t.rotation.y = i * 0.7;
G.add(t);
SD.zero.hoops.push({ x: h[0], y: h[1], z: h[2], m: t, n: i + 1 });
});
for (var b = 0; b < 7; b++) {
var ball = wSph(0.35, wM([0xE86A5A, 0x5AB8FF, 0xFFD24A, 0x7AE8A8][b % 4]), 60 + b * 2.8, 2 + (b % 3) * 2, 4 + (b * 5) % 24, G, 12);
SD.zero.balls.push({ m: ball, v: new THREE.Vector3(Math.sin(b) * 0.25, Math.cos(b * 1.3) * 0.15, Math.cos(b) * 0.25) });
}
var sg = wSign(["ZERO-G BAY", "The wheel's spin does not reach the hub", "Press E on the floor to push off"], 6, 1.9, "#0E1A2E", "#8FD8FF");
sg.position.set(69, 6, 0.3);
G.add(sg);
STN.spots.push({ x: 69, z: 4, r: 3, name: "How weightlessness works", fn: function () { worldCard(worldFacts("Weightlessness", "Why astronauts float", [], SD_FACTS.zero)); } });
},
function (G) {
var M = sdMats();
var tex = wTex(512, 64, function (c, w, h) {
for (var x = 0; x < w; x++) {
var ray = 0.55 + 0.45 * Math.abs(Math.sin(x * 0.09) * Math.sin(x * 0.023 + 1.3));
var g = c.createLinearGradient(0, h, 0, 0);
g.addColorStop(0, "rgba(110,255,160,0)");
g.addColorStop(0.08, "rgba(120,255,170," + (0.95 * ray).toFixed(2) + ")");
g.addColorStop(0.4, "rgba(90,235,150," + (0.55 * ray).toFixed(2) + ")");
g.addColorStop(0.75, "rgba(200,110,230," + (0.25 * ray).toFixed(2) + ")");
g.addColorStop(1, "rgba(200,110,230,0)");
c.fillStyle = g;
c.fillRect(x, 0, 1, h);
}
});
tex.wrapS = THREE.RepeatWrapping;
tex.repeat.set(3, 1);
var lat = 1.12, R = 320, ringR = R * Math.cos(lat) * 1.02, ringY = -200 + R * Math.sin(lat);
var cur = new THREE.Mesh(new THREE.CylinderGeometry(ringR, ringR * 1.06, 30, 96, 1, true), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide, fog: false }));
cur.position.set(0, ringY + 13, -440);
G.add(cur);
SD.aurora.push({ m: cur, tex: tex });
var plinth = wM(0x3A4458);
SD_MODELS.forEach(function (md) {
wCyl(1.4, 1.6, 1, plinth, md.x, 0.5, md.z, G, 20);
STN.solids.push({ x: md.x, z: md.z, r: 1.6 });
wCyl(0.05, 0.05, 0.7, wM(0x9AA0AA), md.x, 1.35, md.z, G, 8);
var g = new THREE.Group();
g.position.set(md.x, 2.0, md.z);
g.scale.setScalar(1.25);
G.add(g);
md.build(g);
md.g = g;
var lab = wSign([md.name, md.years], 3.2, 0.8, "#0E1A2E", "#C8E8FF");
lab.position.set(md.x, 0.75, md.z + 1.62);
G.add(lab);
STN.spots.push({ x: md.x, z: md.z + 2.6, r: 2, name: md.name, fn: function () { worldCard(worldFacts(md.name, md.years, md.rows, md.notes, "<div style='opacity:.6;font-size:11.5px;margin-top:6px'>" + esc(md.src) + "</div>")); } });
});
var bot = new THREE.Group();
bot.position.set(-51, 0, -24);
G.add(bot);
var shell = wM(0xE8ECF0), face = wB(0x0E1A2E, { fog: false }), eye = wB(0x7AE8A8, { fog: false });
wCyl(0.32, 0.42, 0.9, shell, 0, 1.2, 0, bot, 18);
wSph(0.42, shell, 0, 1.95, 0, bot, 18);
var scr = wBox(0.5, 0.28, 0.06, face, 0, 1.98, 0.38, bot);
wSph(0.05, eye, -0.11, 2.0, 0.42, bot, 8);
wSph(0.05, eye, 0.11, 2.0, 0.42, bot, 8);
var halo = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.03, 6, 32), eye);
halo.rotation.x = Math.PI / 2;
halo.position.y = 2.5;
bot.add(halo);
[-1, 1].forEach(function (s) { var arm = wCyl(0.06, 0.06, 0.6, shell, s * 0.45, 1.3, 0, bot, 8); arm.rotation.z = s * 0.4; });
var base = wCyl(0.5, 0.6, 0.1, wM(0x3A4458), -51, 0.05, -24, G, 20);
STN.solids.push({ x: -51, z: -24, r: 0.7 });
SD.bot = bot;
var sg = wSign(["LUMEN", "The station's teaching robot", "Press E to learn about real space stations"], 4.6, 1.5, "#0E1A2E", "#7AE8A8");
sg.position.set(-51, 3.4, -26);
G.add(sg);
STN.spots.push({ x: -51, z: -21.5, r: 2.6, name: "Lumen, the teaching robot", fn: function () { sdLesson(); } });
},
function (G) {
var dark = wM(0x2A2E36), steel = wM(0x9AA0AA), belt = wM(0x1A1A1E), blue = wM(0x3A6AB8);
wBox(1.1, 0.3, 2.4, dark, -35, 0.15, 26, G);
wBox(0.9, 0.04, 2.1, belt, -35, 0.32, 26, G);
wBox(0.06, 1.4, 0.06, steel, -35.5, 1.0, 25, G);
wBox(0.06, 1.4, 0.06, steel, -34.5, 1.0, 25, G);
wBox(1, 0.06, 0.3, steel, -35, 1.7, 25, G);
STN.solids.push({ x: -35, z: 26, hw: 0.6, hd: 1.2 });
wBox(0.5, 0.6, 1.2, blue, -39.5, 0.3, 26, G);
wCyl(0.25, 0.25, 0.12, steel, -39.5, 0.6, 25.6, G, 16);
wBox(0.08, 0.9, 0.08, steel, -39.5, 0.9, 26.5, G);
wBox(0.6, 0.06, 0.08, steel, -39.5, 1.35, 26.5, G);
STN.solids.push({ x: -39.5, z: 26, hw: 0.3, hd: 0.6 });
wBox(1.8, 0.12, 1.4, dark, -44.5, 0.06, 26, G);
[-0.7, 0.7].forEach(function (s) { wCyl(0.14, 0.14, 1.1, steel, -44.5 + s, 0.65, 26.4, G, 10); });
wBox(1.9, 0.06, 0.06, steel, -44.5, 1.5, 25.6, G);
STN.solids.push({ x: -44.5, z: 26, hw: 0.9, hd: 0.7 });
var sg = wSign(["THE GYM", "The ISS's own three machines", "Press E to read about them"], 4.6, 1.5, "#2A2018", "#F0D8A8");
sg.position.set(-40, 3.2, 30.6);
sg.rotation.y = Math.PI;
G.add(sg);
STN.spots.push({ x: -40, z: 23, r: 3.4, name: "The gym", fn: function () { worldCard(worldFacts("The gym", "Exercise in orbit", [["Treadmill", "T2, also called COLBERT"], ["Bicycle", "CEVIS, the cycle ergometer"], ["Weights", "ARED, the Advanced Resistive Exercise Device"]], SD_FACTS.gym, "<div style='opacity:.6;font-size:11.5px;margin-top:6px'>Source: NASA</div>")); } });
},
function (g) {
var wh = wM(0xE8ECF0), arr = wM(0x6A5A2A), blue = wM(0x1E2E5A), rad = wM(0xF4F4F0), tr = wM(0x9AA0AA);
wBox(3.4, 0.1, 0.1, tr, 0, 0, 0, g);
[-1.55, -1.15, 1.15, 1.55].forEach(function (x) { [-1, 1].forEach(function (s) { wBox(0.26, 0.015, 1.25, blue, x, 0, s * 0.72, g); wBox(0.27, 0.02, 0.04, arr, x, 0, s * 0.1, g); }); });
[-0.6, 0.6].forEach(function (x) { wBox(0.5, 0.015, 0.32, rad, x, -0.18, 0, g); });
var m = function (len, r, x, y, z, rx, rz) { var c = wCyl(r, r, len, wh, x, y, z, g, 16); c.rotation.set(rx || 0, 0, rz || 0); return c; };
m(1.6, 0.12, 0, -0.25, 0, Math.PI / 2, 0);
m(0.9, 0.11, 0, -0.25, 0.95, 0, Math.PI / 2);
m(0.5, 0.13, 0.4, -0.25, -0.4, 0, Math.PI / 2);
m(0.6, 0.12, -0.45, -0.25, -0.5, 0, Math.PI / 2);
m(0.45, 0.1, 0, -0.25, -1.05, Math.PI / 2, 0);
var cu = wSph(0.08, wM(0x8AA8C8), 0.1, -0.4, 0.2, g, 10);
},
function (g) {
var wh = wM(0xF0F2F4), blue = wM(0x1E2E5A), gold = wM(0xC8A050);
var c = wCyl(0.34, 0.34, 1.6, wh, 0, 0, 0, g, 24);
c.rotation.z = Math.PI / 2;
[-0.81, 0.81].forEach(function (x) { var e = wCyl(0.34, 0.2, 0.12, wh, x, 0, 0, g, 24); e.rotation.z = x > 0 ? -Math.PI / 2 : Math.PI / 2; });
for (var w = -0.5; w <= 0.5; w += 0.25) {
wBox(0.12, 0.08, 0.02, wM(0x2A3A5A), w, 0.18, 0.33, g);
}
[-1, 1].forEach(function (s) { wBox(0.05, 0.05, 0.4, gold, 0.3, 0, s * 0.5, g); wBox(0.6, 0.015, 0.5, blue, 0.3, 0, s * 0.95, g); });
},
function (g) {
var wh = wM(0xD8DCD0), gr = wM(0x7A8A6A), blue = wM(0x1E2E5A);
var a = wCyl(0.2, 0.2, 0.6, wh, -0.4, 0, 0, g, 20);
a.rotation.z = Math.PI / 2;
var b = wCyl(0.3, 0.3, 0.6, gr, 0.2, 0, 0, g, 20);
b.rotation.z = Math.PI / 2;
var c = wCyl(0.3, 0.2, 0.2, wh, 0.6, 0, 0, g, 20);
c.rotation.z = Math.PI / 2;
[-1, 1].forEach(function (s) { wBox(0.18, 0.015, 0.7, blue, -0.55, 0, s * 0.55, g); wBox(0.18, 0.015, 0.7, blue, 0.55, 0, s * 0.6, g); });
},
function (g) {
var wh = wM(0xE8E0C8), gold = wM(0xC8A050), blue = wM(0x1E2E5A);
var c = wCyl(0.34, 0.34, 1.2, wh, 0, 0, 0, g, 24);
c.rotation.z = Math.PI / 2;
var d = wCyl(0.15, 0.15, 0.5, wh, -0.85, 0, 0, g, 16);
d.rotation.z = Math.PI / 2;
wBox(0.5, 0.4, 0.36, gold, 0.05, 0.36, 0, g);
wBox(0.7, 0.015, 0.36, blue, 0.1, 0, -0.6, g);
var t = new THREE.Group();
t.position.set(-0.75, 0.42, 0);
g.add(t);
for (var i = 0; i < 4; i++) {
var arm = new THREE.Group();
arm.rotation.x = i * Math.PI / 2;
t.add(arm);
wBox(0.16, 0.015, 0.55, blue, 0, 0, 0.34, arm);
}
},
function (g) {
var wh = wM(0xD8D8D0), blue = wM(0x1E2E5A);
var c = wCyl(0.17, 0.17, 1.2, wh, 0, 0, 0, g, 18);
c.rotation.z = Math.PI / 2;
wSph(0.2, wh, -0.62, 0, 0, g, 16);
[[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(function (q) { var m = wCyl(0.13, 0.13, 0.85, wh, -0.62 + q[0] * 0.52, q[1] * 0.52, 0, g, 16); m.rotation.z = q[0] ? Math.PI / 2 : 0; wBox(0.12, 0.015, 0.6, blue, -0.62 + q[0] * 0.7, q[1] * 0.7, 0.42, g); });
[-1, 1].forEach(function (s) { wBox(0.16, 0.015, 0.6, blue, 0.2, 0, s * 0.5, g); });
},
function (g) {
var wh = wM(0xEEF0F2), blue = wM(0x1E2E5A);
var c = wCyl(0.2, 0.2, 1.1, wh, 0, 0, 0, g, 20);
c.rotation.z = Math.PI / 2;
wSph(0.21, wh, -0.6, 0, 0, g, 16);
[-1, 1].forEach(function (s) { var m = wCyl(0.18, 0.18, 1.0, wh, -0.6, 0, s * 0.6, g, 20); m.rotation.x = Math.PI / 2; wBox(0.22, 0.015, 1.1, blue, -0.6, 0, s * 1.75, g); });
[-1, 1].forEach(function (s) { wBox(0.2, 0.015, 0.55, blue, 0.3, 0, s * 0.45, g); });
},
function () {
if (SD.lessonCache)
return SD.lessonCache;
var all = [];
SD_LESSONS.forEach(function (L) { L.f.forEach(function (f) { all.push({ t: L.t, f: f, src: L.src }); }); });
SD_MODELS.forEach(function (m) { m.notes.forEach(function (f) { all.push({ t: m.name, f: f, src: m.src }); }); m.rows.forEach(function (r) { all.push({ t: m.name, f: m.name + ": " + r[0] + ", " + r[1] + ".", src: m.src }); }); });
SD_FACTS.zero.concat(SD_FACTS.gym).forEach(function (f) { all.push({ t: "Life in orbit", f: f, src: "NASA" }); });
SD.lessonCache = all;
return all;
},
function (which) {
var html = "<div style='font:600 17px var(--serif,Georgia);color:#B8F0C8'>Lumen</div><div style='opacity:.8;margin-bottom:6px'>“Hello! I teach about real space stations. Every fact I give has its source with it.”</div>", fns = {};
var L = which && SD_LESSONS.filter(function (x) { return x.k === which; })[0];
if (L) {
html += "<div style='font-weight:600;margin:6px 0'>" + esc(L.t) + "</div><ul style='margin:0 0 0 16px;padding:0'>" + L.f.map(function (f) { return "<li style='margin:4px 0'>" + esc(f) + "</li>"; }).join("") + "</ul>" +
"<div style='opacity:.6;font-size:11.5px;margin-top:6px'>Source: " + esc(L.src) + "</div>" + worldBtn("back", "Back to the topics", "");
fns.back = function () { sdLesson(); };
}
else {
SD_LESSONS.forEach(function (x) { html += worldBtn("t-" + x.k, x.t, ""); fns["t-" + x.k] = function () { sdLesson(x.k); }; });
html += worldBtn("quiz", "Quiz me", "Three questions; see how much you remember.");
fns.quiz = function () { sdQuiz(); };
}
html += "<div style='margin-top:10px;opacity:.85'>Ask Lumen a question:</div><div style='display:flex;gap:6px;margin-top:4px'><input id='sd-ask' maxlength='200' placeholder='e.g. what is the ISS used for?' style='flex:1;min-width:0;background:#0E1A2E;color:#E8ECF4;border:1px solid #7AE8A8;border-radius:3px;padding:6px 8px;font:13px var(--sans,system-ui)'><span data-w='ask' style='padding:6px 10px;border:1px solid #7AE8A8;border-radius:3px'>Ask</span></div><div id='sd-answer' style='margin-top:8px'></div>";
fns.ask = function () { sdAsk(); };
worldCard(html, fns);
var inp = document.getElementById("sd-ask");
if (inp)
inp.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter") {
e.preventDefault();
sdAsk();
} });
},
function (q, n) {
var stop = { the: 1, a: 1, an: 1, is: 1, are: 1, of: 1, to: 1, in: 1, on: 1, what: 1, how: 1, why: 1, who: 1, does: 1, do: 1, did: 1, it: 1, and: 1, for: 1, was: 1, about: 1, tell: 1, me: 1, you: 1, can: 1, its: 1, with: 1, from: 1, at: 1, by: 1, there: 1, many: 1, much: 1 };
var words = (q.toLowerCase().match(/[a-z0-9]+/g) || []).filter(function (w) { return w.length > 1 && !stop[w]; });
if (!words.length)
return [];
return sdAllFacts().map(function (x) { var t = (x.t + " " + x.f).toLowerCase(), s = 0; words.forEach(function (w) { if (t.indexOf(w) >= 0)
s += w.length > 3 ? 2 : 1; if (/^iss$|station/.test(w) && /international space station|\biss\b/.test(t))
s += 0.5; }); return { x: x, s: s }; })
.filter(function (o) { return o.s >= 2; }).sort(function (a, b) { return b.s - a.s; }).slice(0, n || 2).map(function (o) { return o.x; });
},
function () {
var inp = document.getElementById("sd-ask"), out = document.getElementById("sd-answer");
if (!inp || !out)
return;
var q = inp.value.trim();
if (!q)
return;
out.innerHTML = "<i style='opacity:.7'>Lumen is thinking…</i>";
var local = function () {
var b = sdBestFacts(q, 2);
out.innerHTML = b.length ? b.map(function (x) { return "<p style='margin:4px 0'>" + esc(x.f) + " <span style='opacity:.55;font-size:11.5px'>(" + esc(x.src) + ")</span></p>"; }).join("")
: "<p style='margin:4px 0'>“I do not have a checked fact on that yet, and I will not guess. Try one of the topics above.”</p>";
};
var c = (typeof cfg === "function") ? cfg() : null;
if (!c || c.mode === "off" || typeof llmTarget !== "function" || typeof llmBody !== "function") {
local();
return;
}
var facts = sdAllFacts().map(function (x) { return "- " + x.f + " [" + x.src + "]"; }).join("\n");
var sys = "You are Lumen, a friendly teaching robot in the learning gallery of a space station in a game. You teach REAL facts about real space stations: the International Space Station above all, and Aurora Station, the private space hotel Orion Span announced in 2018 (it never launched). " +
"Answer the player's question in under 90 words, plainly and warmly, as a good teacher would. Use the checked facts below first. You may add a widely established fact only if you are certain of it; never invent a number, a date or a name. If you are not sure, say so and suggest a topic you can teach. " +
"Do not mention the time of day or where the player is standing, and do not repeat yourself. If the question is not about space, spaceflight or stations, gently bring it back to them.\nCHECKED FACTS:\n" + facts;
var ready = (c.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
ready.then(function () {
var T = llmTarget(c);
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(c, { temperature: 0.3, max_tokens: 600, talk: "teach", say: 1, messages: [{ role: "system", content: sys }, { role: "user", content: q.slice(0, 200) }] })) });
})
.then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) {
var t = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content || "").trim();
if (!t) {
local();
return;
}
out.innerHTML = "<p style='margin:4px 0'>" + esc(t) + "</p><div style='opacity:.55;font-size:11.5px'>Lumen answers from NASA's and Space.com's facts listed in the topics.</div>";
})
.catch(function () { local(); });
},
function () {
var pool = SD_QUIZ.slice(), qs = [];
while (qs.length < 3 && pool.length)
qs.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
var i = 0, right = 0;
var ask = function () {
if (i >= qs.length) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#B8F0C8'>Lumen's quiz</div><p>You got <b>" + right + " of " + qs.length + "</b>. " + (right === qs.length ? "Perfect: you would make a fine flight controller." : "Have a look at the topics and try again.") + "</p>" + worldBtn("again", "Another quiz", "") + worldBtn("back", "Back to the topics", ""), { again: sdQuiz, back: function () { sdLesson(); } });
return;
}
var Q = qs[i], order = [0, 1, 2].sort(function () { return Math.random() - 0.5; }), fns = {};
var html = "<div style='font:600 17px var(--serif,Georgia);color:#B8F0C8'>Lumen's quiz · " + (i + 1) + " of " + qs.length + "</div><p>" + esc(Q[0]) + "</p>";
order.forEach(function (o) {
html += worldBtn("a" + o, esc(Q[1][o]), "");
fns["a" + o] = function () {
var ok = o === Q[2];
if (ok)
right++;
if (typeof playTone === "function")
playTone(ok ? 660 : 300, 0.25);
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#B8F0C8'>" + (ok ? "Right!" : "Not quite.") + "</div><p>The answer: <b>" + esc(Q[1][Q[2]]) + "</b>.</p>" + worldBtn("next", "Next", ""), { next: function () { i++; ask(); } });
};
});
worldCard(html, fns);
};
ask();
},
function (a, b, col) {
if (!SD_BEAMGEO)
SD_BEAMGEO = new THREE.CylinderGeometry(0.014, 0.014, 1, 6);
var d = new THREE.Vector3().subVectors(b, a), L = d.length();
if (L < 0.01)
return;
var m = new THREE.Mesh(SD_BEAMGEO, new THREE.MeshBasicMaterial({ color: col || 0x6AE0FF, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending }));
m.scale.set(1, L, 1);
m.position.copy(a).addScaledVector(d, 0.5);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
scene.add(m);
SD.beams.push({ m: m, t: 0 });
},
function (list, maxAng, maxD) {
var P = camera.position, B = WORLDS.station.base, best = null, bs = 1e9;
list.forEach(function (o) {
var dx = o.p.x - P.x, dz = o.p.z - P.z, d = Math.hypot(dx, dz);
if (d > maxD || d < 0.3)
return;
var a = Math.atan2(-dx, -dz) - yaw;
while (a > Math.PI)
a -= Math.PI * 2;
while (a < -Math.PI)
a += Math.PI * 2;
var tol = Math.max(maxAng, Math.atan2(o.r || 0.6, d));
if (Math.abs(a) > tol)
return;
if (sdCovered(P.x - B, P.y - 0.2, P.z, o.p.x - B, o.p.y, o.p.z))
return;
var sc = Math.abs(a) * d;
if (sc < bs) {
bs = sc;
best = o;
}
});
return best;
},
function (html) {
if (!SD.hud) {
var h = document.createElement("div");
h.id = "sd-hud";
h.style.cssText = "position:fixed;left:50%;top:52px;transform:translateX(-50%);z-index:44;display:none;background:rgba(8,12,24,.9);border:1px solid #6AE0FF;border-radius:10px;padding:6px 14px;font:13px/1.45 var(--sans,system-ui);color:#E8ECF4;text-align:center;max-width:calc(100vw - 24px);pointer-events:none";
document.body.appendChild(h);
SD.hud = h;
}
if (!html) {
SD.hud.style.display = "none";
return;
}
if (SD.hud.dataset.h !== html) {
SD.hud.dataset.h = html;
SD.hud.innerHTML = html;
}
SD.hud.style.display = "block";
},
function (kind) {
if (typeof carrying !== "undefined" && carrying && carrying.archetype === kind)
return;
if (typeof carrying !== "undefined" && carrying) {
if (!carrying.issued && typeof bkpStow === "function")
bkpStow(true);
else if (typeof dropCarried === "function")
dropCarried(true);
}
scGive(kind);
if (kind === "tagblaster")
setStatus("<b>You take a tag blaster</b> from the rack. " + (sdTouch() ? "The <b>Fire</b> button" : "<b>F</b> or a click") + " fires its beam.");
},
function () {
var html = "<div style='font:600 17px var(--serif,Georgia);color:#BFF0FF'>Laser tag</div><div style='opacity:.8;margin-bottom:6px'>A tag blaster fires a harmless beam. " + (sdTouch() ? "Tap <b>Fire</b>" : "Press <b>F</b> or click") + " to shoot; it helps your aim a little.</div>";
var fns = {};
html += worldBtn("solo", "Solo target run", "60 seconds. Targets drift into view round the arena: tag as many as you can. Far ones count double. Best: " + sdTagBest());
html += worldBtn("match", "Join a live match", "2 to 8 players, three minutes, every tag scores. Tagged players are out for two seconds.");
html += worldBtn("teams", "Join a team battle", "Red against Blue, 2 to 8 players, four minutes. Your side's tags add up; you cannot tag your own side.");
if (SD.run || SD.net) {
html += worldBtn("stop", "Stop playing", "");
fns.stop = function () { sdStopAll(); worldCard(null); };
}
html += worldBtn("take", "Just take a tag blaster", "");
fns.solo = function () { worldCard(null); sdRunStart(); };
fns.match = function () { worldCard(null); sdNetJoin("tag"); };
fns.teams = function () { worldCard(null); sdNetJoin("teams"); };
fns.take = function () { worldCard(null); sdArm("tagblaster"); };
worldCard(html, fns);
},
function () {
for (var k = 0; k < 30; k++) {
var x = SD_ARENA.x0 + 5 + Math.random() * (SD_ARENA.x1 - SD_ARENA.x0 - 8), z = SD_ARENA.z0 + 2 + Math.random() * (SD_ARENA.z1 - SD_ARENA.z0 - 4), y = 1.1 + Math.random() * 2.6, ok = true;
SD.cover.forEach(function (c) { if (Math.abs(x - c.x) < c.hw + 1.2 && Math.abs(z - c.z) < c.hd + 1.2)
ok = false; });
var L = worldLocal();
if (Math.hypot(x - L.x, z - L.z) < 6)
ok = false;
(SD.run ? SD.run.targets : []).forEach(function (t) { if (Math.hypot(t.x - x, t.z - z) < 4)
ok = false; });
if (ok)
return { x: x, y: y, z: z };
}
return { x: 54, y: 2, z: -14 };
},
function () {
var s = sdTargetSpot(), g = new THREE.Group(), col = [0x6AE0FF, 0xE86AD8, 0x7AE8A8][Math.floor(Math.random() * 3)];
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.06, 6, 28), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, depthWrite: false }));
var core = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), new THREE.MeshBasicMaterial({ color: 0xF4F8FF, transparent: true, opacity: 0, depthWrite: false }));
g.add(ring);
g.add(core);
g.position.set(s.x, s.y, s.z);
SD.G.add(g);
return { x: s.x, y: s.y, z: s.z, g: g, ring: ring, core: core, age: 0, life: 3.6 + Math.random() * 1.2, hit: false, ph: Math.random() * 6 };
},
function (dt) {
var R = SD.run;
if (!R)
return;
if (R.count > 0) {
R.count -= dt;
sdHud("<b>Target run</b> · starting in " + Math.max(1, Math.ceil(R.count)));
return;
}
R.t -= dt;
for (var i = R.targets.length - 1; i >= 0; i--) {
var t = R.targets[i];
t.age += dt;
var fade = t.hit ? Math.max(0, 1 - (t.age - t.hitAt) / 0.4) : Math.min(1, t.age / 0.6) * Math.min(1, Math.max(0, (t.life - t.age) / 0.6));
t.ring.material.opacity = fade * 0.9;
t.core.material.opacity = fade * 0.8;
t.g.rotation.y += dt * 0.8;
t.g.position.y = t.y + Math.sin(t.age * 1.4 + t.ph) * 0.15;
if (t.hit) {
var sc = 1 + (t.age - t.hitAt) * 1.2;
t.g.scale.setScalar(sc);
}
if ((t.hit && t.age - t.hitAt > 0.4) || (!t.hit && t.age > t.life)) {
sdTargetGone(t);
R.targets.splice(i, 1);
}
}
R.spawn -= dt;
if (R.t > 0 && R.spawn <= 0 && R.targets.filter(function (t) { return !t.hit; }).length < 3) {
R.targets.push(sdTarget());
R.spawn = 0.8 + Math.random() * 0.6;
}
if (R.t <= 0) {
var best = sdTagBest(), nb = R.score > best;
if (nb)
try {
localStorage.setItem("somnu.tagBest", String(R.score));
}
catch (e) { }
R.targets.forEach(sdTargetGone);
SD.run = null;
sdHud(null);
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#BFF0FF'>Time!</div><p>You scored <b>" + R.score + "</b> (" + R.hits + " tags from " + R.shots + " shots)." + (nb ? " <b>A new best.</b>" : " Your best is " + best + ".") + "</p>" + worldBtn("again", "Go again", "") + worldBtn("match", "Join a live match", ""), { again: function () { worldCard(null); sdRunStart(); }, match: function () { worldCard(null); sdNetJoin("tag"); } });
return;
}
sdHud("<b>Target run</b> · " + Math.ceil(R.t) + " s · score <b>" + R.score + "</b>");
},
function () {
if (SD.cool > 0)
return;
SD.cool = 0.28;
var P = camera.position, B = WORLDS.station.base;
var from = new THREE.Vector3(P.x - Math.sin(yaw) * 1.1 + Math.cos(yaw) * 0.2, P.y - 0.28, P.z - Math.cos(yaw) * 1.1 - Math.sin(yaw) * 0.2);
if (typeof playTone === "function")
playTone(880, 0.12);
var list = [];
if (SD.run && SD.run.count <= 0)
SD.run.targets.forEach(function (t) { if (!t.hit && t.age > 0.3)
list.push({ p: new THREE.Vector3(t.x + B, t.g.position.y, t.z), r: 0.7, t: t }); });
var N = SD.net;
if (N && N.kind === "tag" && N.state && N.state.status === "running")
Object.keys(N.ghosts).forEach(function (id) { var gh = N.ghosts[id]; if (gh.tagged || (N.teams && gh.team != null && gh.team === N.team))
return; list.push({ p: new THREE.Vector3(gh.g.position.x + B, 1.2, gh.g.position.z), r: 0.6, id: id }); });
if (SD.run)
SD.run.shots++;
var hit = sdAimPick(list, sdTouch() ? 0.16 : 0.1, 60);
var end;
if (hit) {
end = hit.p.clone();
}
else {
var dir = new THREE.Vector3(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
end = from.clone().addScaledVector(dir, 40);
for (var s = 1; s <= 80; s++) {
var q = from.clone().addScaledVector(dir, s * 0.5);
if (q.y < 0.05 || q.y > 5.9 || !stnWalkable(q.x - B, q.z) || sdInCover(q.x - B, q.y, q.z)) {
end = q;
break;
}
}
}
sdBeam(from, end, 0x6AE0FF);
if (!hit)
return;
if (hit.t) {
var t = hit.t, far = Math.hypot(t.x + B - P.x, t.z - P.z) > 25;
t.hit = true;
t.hitAt = t.age;
SD.run.hits++;
SD.run.score += far ? 2 : 1;
if (typeof playTone === "function")
playTone(far ? 990 : 760, 0.2);
}
else if (hit.id)
sdNetTag(hit.id);
},
function () {
var html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Duelling Deck</div><div style='opacity:.85;margin-bottom:6px'>Bouts with training sabres, to five touches. A touch scores; nobody is hurt.</div>" +
"<ul style='margin:0 0 6px 16px;padding:0;font-size:12.5px'><li><b>Swing</b> (" + (sdTouch() ? "the Swing button" : "F") + "): a cut. A block stops it.</li><li><b>Thrust</b> (" + (sdTouch() ? "Thrust" : "R") + "): quick and long. Only a parry stops it.</li><li><b>Parry</b> (" + (sdTouch() ? "Parry" : "Q") + "): beat their blade aside just as it comes, and they are open.</li><li><b>Block</b> (" + (sdTouch() ? "hold Block" : "hold V") + "): stops cuts while held, but tires you.</li><li>Every move costs breath; the bar fills again while you stand on guard.</li></ul>";
var fns = {};
["cadet", "officer", "master"].forEach(function (k) { html += worldBtn("ai-" + k, "Spar with the trainer: " + SD_LEVEL[k].name, k === "cadet" ? "Slow and clear: learn the moves." : k === "officer" ? "A fair fight." : "Fast, and defends well."); fns["ai-" + k] = function () { worldCard(null); sdDuelStart(k); }; });
html += worldBtn("pvp", "Duel another player", "The next player who asks here is your opponent.");
fns.pvp = function () { worldCard(null); sdStopAll(); sdArm("lasersword"); sdNetJoin("duel"); };
if (SD.duel || SD.net) {
html += worldBtn("stop", "Stop the bout", "");
fns.stop = function () { sdStopAll(); worldCard(null); };
}
worldCard(html, fns);
},
function (level) {
sdStopAll();
sdArm("lasersword");
var C = SD_DUEL, B = WORLDS.station.base;
camera.position.set(B + C.x + 2.6, camera.position.y, C.z);
yaw = Math.PI / 2;
var o = SD.master;
if (o) {
o.g.position.set(C.x - 1.2, 0, C.z);
wFace(o.g, C.x + 2.6, C.z);
}
SD.duel = { ai: true, level: level, L: SD_LEVEL[level], score: [0, 0], me: { act: "guard", t: 9, stam: 100, stun: 0, block: false }, o: { state: "guard", t: 0, next: 1.5, move: null, stun: 0 }, pause: 1.2, say: "<b>En garde!</b>", sayT: 1.5, done: false };
sdPad(true);
},
function (move) {
var D = SD.duel;
if (!D && !(SD.net && SD.net.kind === "duel"))
return;
var me = D ? D.me : SD.net.me;
if (D && (D.pause > 0 || D.done))
return;
if (me.stun > 0) {
sdDuelSay("You are off balance.");
return;
}
if (me.act !== "guard" && me.act !== "block")
return;
var cost = SD_COST[move] || 0;
if (me.stam < cost) {
sdDuelSay("<b>Out of breath.</b> Stand on guard a moment.");
return;
}
me.stam -= cost;
me.act = move;
me.t = 0;
me.hit = false;
if (move === "swing") {
SC.swing = 0.45;
if (typeof playTone === "function") {
playTone(150, 0.2);
}
}
if (move === "thrust" && typeof playTone === "function")
playTone(210, 0.15);
if (move === "parry" && typeof playTone === "function")
playTone(330, 0.12);
},
function (who) {
var D = SD.duel;
D.score[who]++;
if (typeof playTone === "function")
playTone(who ? 260 : 700, 0.35);
if (D.score[who] >= 5) {
D.done = true;
D.pause = 99;
var won = who === 0;
if (won)
try {
var k = "somnu.duelWins." + D.level;
localStorage.setItem(k, String((+localStorage.getItem(k) || 0) + 1));
}
catch (e) { }
setTimeout(function () {
if (SD.duel !== D)
return;
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + (won ? "You win the bout!" : "The trainer wins the bout.") + "</div><p>" + D.score[0] + " touches to " + D.score[1] + ", against the " + D.L.name.toLowerCase() + "." + (won ? " The master bows." : " Again?") + "</p>" + worldBtn("again", "Another bout", "") + worldBtn("more", "Choose another opponent", ""), { again: function () { worldCard(null); sdDuelStart(D.level); }, more: function () { sdDuelCard(); } });
if (SD.duel === D) {
SD.duel = null;
sdPad(false);
sdHud(null);
}
}, 900);
sdDuelSay(won ? "<b>Touch!</b> The bout is yours." : "<b>Touched.</b> The bout goes to the trainer.", 3);
return;
}
D.pause = 1.3;
D.o.state = "guard";
D.o.t = 0;
D.o.next = 1.4;
D.me.act = "guard";
D.me.t = 9;
sdDuelSay(who ? "<b>Touched!</b> " + D.score[0] + " to " + D.score[1] : "<b>Touch!</b> " + D.score[0] + " to " + D.score[1], 1.3);
var C = SD_DUEL, B = WORLDS.station.base;
if (SD.master)
SD.master.g.position.set(C.x - 1.4, 0, C.z);
camera.position.x = B + C.x + 2.2;
camera.position.z = C.z;
yaw = Math.PI / 2;
},
function (dt) {
var D = SD.duel;
if (!D)
return;
var me = D.me, o = D.o, M = SD.master, L = worldLocal(), C = SD_DUEL;
me.t += dt;
me.stun = Math.max(0, me.stun - dt);
o.stun = Math.max(0, o.stun - dt);
D.sayT -= dt;
D.pause -= dt;
me.block = !!SD.blockHeld && me.stun <= 0;
if (me.act === "guard" && me.block) {
me.act = "block";
}
if (me.act === "block" && !me.block) {
me.act = "guard";
}
if (me.act === "block")
me.stam = Math.max(0, me.stam - 9 * dt);
else if (me.act === "guard")
me.stam = Math.min(100, me.stam + 22 * dt);
if (me.act === "block" && me.stam <= 0) {
me.act = "guard";
SD.blockHeld = false;
sdDuelSay("Too tired to hold the block.");
}
if (Math.hypot(L.x - C.x, L.z - C.z) > C.r + 4) {
sdDuelSay("You left the piste: the bout is over.");
var d0 = D;
setTimeout(function () { if (SD.duel === d0)
sdStopAll(); }, 50);
return;
}
if (!D.done && D.pause <= 0 && !me.hit && ((me.act === "swing" && me.t >= 0.2) || (me.act === "thrust" && me.t >= 0.15))) {
me.hit = true;
var len = me.act === "thrust" ? 3.7 : 3.2;
if (M && sdReach(M.g.position.x, M.g.position.z, len)) {
if (o.stun > 0 || o.state === "windup") {
o.state = "guard";
o.t = 0;
o.next = 1.2;
sdDuelTouch(0);
}
else if (me.act === "swing" && Math.random() < D.L.def) {
o.state = "block";
o.t = 0;
sdDuelSay("The trainer <b>blocks</b> your cut.");
if (typeof playTone === "function")
playTone(420, 0.15);
}
else if (me.act === "thrust" && Math.random() < D.L.def * 0.6) {
o.state = "parry";
o.t = 0;
me.stun = 0.8;
sdDuelSay("The trainer <b>parries</b> your thrust: you are open!");
if (typeof playTone === "function")
playTone(480, 0.15);
}
else
sdDuelTouch(0);
}
else
sdDuelSay(me.act === "thrust" ? "Your thrust falls short." : "Your blade cuts only air: step in closer.", 1);
}
if ((me.act === "swing" && me.t > 0.45) || (me.act === "thrust" && me.t > 0.4) || (me.act === "parry" && me.t > 0.9))
me.act = SD.blockHeld ? "block" : "guard";
if (M && !D.done) {
var dx = L.x - M.g.position.x, dz = L.z - M.g.position.z, dist = Math.hypot(dx, dz);
var want = o.state === "windup" ? 2.3 : 2.6;
if (D.pause <= 0 && o.stun <= 0 && Math.abs(dist - want) > 0.25 && o.state !== "strike") {
var sp = Math.min(Math.abs(dist - want), 1.6 * dt) * (dist > want ? 1 : -1);
var nx = M.g.position.x + dx / dist * sp, nz = M.g.position.z + dz / dist * sp;
if (Math.hypot(nx - C.x, nz - C.z) < C.r - 0.4) {
M.g.position.x = nx;
M.g.position.z = nz;
}
}
wFace(M.g, L.x, L.z);
o.t += dt;
if (D.pause <= 0 && o.stun <= 0) {
if (o.state === "guard" || o.state === "block" || o.state === "parry") {
if (o.state !== "guard" && o.t > 0.45) {
o.state = "guard";
o.t = 0;
}
o.next -= dt;
if (o.state === "guard" && o.next <= 0 && dist < 3.6) {
o.move = Math.random() < 0.62 ? "cut" : "thrust";
o.state = "windup";
o.t = 0;
o.wind = o.move === "cut" ? D.L.cut : D.L.thrust;
o.side = ["high, from the left", "high, from the right", "low, from the left", "low, from the right"][Math.floor(Math.random() * 4)];
sdDuelSay(o.move === "cut" ? "⚔ A <b>cut</b> is coming, " + o.side + ": <b>block</b> or <b>parry</b>!" : "⚔ A <b>thrust</b> is coming: <b>parry</b> it, or step back!", o.wind);
}
}
else if (o.state === "windup" && o.t >= o.wind) {
o.state = "strike";
o.t = 0;
if (dist > 3.5)
sdDuelSay("The trainer lunges, but you are out of reach.", 1);
else if (me.act === "parry" && me.t < 0.45) {
o.stun = 1.1;
o.state = "guard";
o.t = 0;
o.next = 1.4;
sdDuelSay("<b>Parried!</b> They are open: strike now!", 1.1);
if (typeof playTone === "function")
playTone(560, 0.2);
}
else if (o.move === "cut" && me.act === "block") {
me.stam = Math.max(0, me.stam - 10);
sdDuelSay("<b>Blocked.</b> Blade meets blade.", 1);
if (typeof playTone === "function")
playTone(400, 0.15);
}
else
sdDuelTouch(1);
}
else if (o.state === "strike" && o.t > 0.35) {
o.state = "guard";
o.t = 0;
o.next = D.L.gap[0] + Math.random() * (D.L.gap[1] - D.L.gap[0]);
}
}
var pose = o.stun > 0 ? "stagger" : o.state === "windup" ? (o.move === "cut" ? "cutup" : "thrustback") : o.state === "strike" ? (o.move === "cut" ? "cut" : "thrust") : o.state === "block" ? "block" : o.state === "parry" ? "parry" : "guard";
sdPose(M.sab, pose, o.state === "strike" ? 0.5 : dt * 8);
}
sdMyPose(me);
var bar = "<span style='display:inline-block;width:70px;height:7px;border:1px solid #FFD24A;border-radius:4px;vertical-align:middle;margin-left:6px'><span style='display:block;height:100%;width:" + Math.round(me.stam) + "%;background:#FFD24A'></span></span>";
sdHud("<b>You " + D.score[0] + "</b> · " + D.L.name + " trainer <b>" + D.score[1] + "</b> · breath" + bar + (D.sayT > 0 && D.say ? "<div>" + D.say + "</div>" : ""));
},
function (me) {
if (typeof carryMesh === "undefined" || !carryMesh || !carryMesh.userData.saber || SC.swing > 0)
return;
var k = me.act === "thrust" ? Math.sin(Math.min(1, me.t / 0.4) * Math.PI) : 0;
if (me.act === "block") {
carryMesh.rotation.set(-0.4, 0, 1.45);
}
else if (me.act === "parry" && me.t < 0.45) {
carryMesh.rotation.set(-1.0, 0.6, 1.1);
}
else if (me.act === "thrust") {
carryMesh.rotation.set(-1.57, 0, 0);
carryMesh.position.z = 0.3 + k * 0.5;
return;
}
else
carryMesh.rotation.set(0, 0, 0);
carryMesh.position.z = 0.3;
},
function (on) {
if (!on) {
if (SD.pad)
SD.pad.style.display = "none";
SD.blockHeld = false;
return;
}
if (!SD.pad) {
var p = document.createElement("div");
p.id = "sd-pad";
p.style.cssText = "position:fixed;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(210px + env(safe-area-inset-bottom,0px));z-index:46;display:grid;grid-template-columns:auto auto;gap:8px;justify-items:end";
var mk = function (id, label, key) {
var b = document.createElement("button");
b.type = "button";
b.id = id;
b.innerHTML = label + (key ? "<span class='sd-k' style='opacity:.6;font-weight:400;margin-left:5px'>" + key + "</span>" : "");
b.style.cssText = "min-width:92px;height:46px;border-radius:23px;border:1px solid #E8C66A;background:rgba(20,16,8,.86);color:#F4E2B0;font:600 14px var(--sans,system-ui);touch-action:none;user-select:none;-webkit-user-select:none";
p.appendChild(b);
return b;
};
var sw = mk("sd-swing", "Swing", "F"), th = mk("sd-thrust", "Thrust", "R"), pa = mk("sd-parry", "Parry", "Q"), bl = mk("sd-block", "Block", "hold V");
var tap = function (b, fn) { var go = function (e) { e.preventDefault(); e.stopPropagation(); fn(); }; b.addEventListener("touchstart", go, { passive: false }); b.addEventListener("mousedown", go); };
tap(sw, function () { sdDuelAct("swing"); });
tap(th, function () { sdDuelAct("thrust"); });
tap(pa, function () { sdDuelAct("parry"); });
var hold = function (e) { e.preventDefault(); e.stopPropagation(); SD.blockHeld = true; bl.style.background = "rgba(201,160,64,.95)"; bl.style.color = "#17120A"; };
var rel = function (e) { if (e)
e.stopPropagation(); SD.blockHeld = false; bl.style.background = "rgba(20,16,8,.86)"; bl.style.color = "#F4E2B0"; };
bl.addEventListener("touchstart", hold, { passive: false });
bl.addEventListener("mousedown", hold);
["touchend", "touchcancel", "mouseup", "mouseleave"].forEach(function (t) { bl.addEventListener(t, rel); });
document.body.appendChild(p);
SD.pad = p;
}
SD.pad.style.display = "grid";
},
function () {
if (!SD.pad || SD.pad.style.display === "none")
return;
var touch = sdTouch(), arm = document.getElementById("t-arm"), gold = !!(arm && !arm.classList.contains("gone"));
var sw = document.getElementById("sd-swing");
if (sw)
sw.style.display = gold ? "none" : "block";
var b = touch ? "calc(330px + env(safe-area-inset-bottom,0px))" : "calc(210px + env(safe-area-inset-bottom,0px))";
if (SD.pad.style.bottom !== b)
SD.pad.style.bottom = b;
SD.pad.querySelectorAll(".sd-k").forEach(function (k) { k.style.display = touch ? "none" : "inline"; });
},
function (kind) {
if (!(typeof signedIn === "function" && signedIn())) {
worldCard(worldFacts(kind === "teams" ? "Team battle" : kind === "tag" ? "Live laser tag" : "Duel another player", "Matches between players need an account", [], ["Sign in (Menu, then Account) to play other dreamers.", "The solo target run and the trainer need no account."]));
return;
}
sdStopAll();
sdArm(kind !== "duel" ? "tagblaster" : "lasersword");
var pkind = kind, teams = kind === "teams";
if (teams)
kind = "tag";
SD.net = { kind: kind, pkind: pkind, teams: teams, team: null, game: null, state: null, ghosts: {}, busy: false, polled: 0, me: { act: "guard", t: 9, stam: 100, stun: 0, taggedFor: 0 }, sayT: 0, say: "", scores: {}, joining: true };
sdHud("<b>" + (teams ? "Team battle" : kind === "tag" ? "Laser tag" : "Duel") + "</b> · finding a match…");
if (kind === "duel")
sdPad(true);
var N = SD.net;
cityRpc("stn_game_join", { p_kind: pkind }).then(function (o) {
if (SD.net !== N) {
if (o && o.game)
cityRpc("stn_game_leave", { p_game: o.game }).catch(function () { });
return;
}
N.joining = false;
if (!o || !o.ok) {
sdHud(null);
sdStopAll();
setStatus(esc((o && o.say) || "No match just now."));
return;
}
N.game = o.game;
sdNetState(o);
}).catch(function (e) {
if (SD.net !== N)
return;
sdStopAll();
var missing = typeof rpcMissing === "function" ? rpcMissing(e) : /stn_game_join|function|404/i.test(String(e && e.message || e));
worldCard(worldFacts("Live matches", "Not open yet", [], [missing ? (typeof notOpenYet === "function" ? notOpenYet("Matches between players open soon. The solo run and the trainer are open now.", "Live matches need the latest server update run in Supabase.") : "Matches between players open soon.") : "The match could not be reached just now. Try again in a moment."]));
});
},
function (N, r) {
var gh = N.ghosts[r.id];
if (gh)
return gh;
var g;
try {
g = wPerson("sdp_" + String(r.id).slice(0, 8), { title: "Space Corp crew", place: "Station Aurora", look: { layer: "uniform", layerColor: N.kind === "tag" ? 0x1A4A6A : 0x2A2A34, bottom: 0x1A2238, shoes: 0x111111, hat: null } });
}
catch (e) {
g = new THREE.Group();
wCyl(0.3, 0.3, 1.7, wM(0x3A6AB8), 0, 0.85, 0, g, 10);
}
var tag = wSign([String(r.name || "A dreamer").slice(0, 24)], 1.8, 0.35, "#0E1A2E", "#E8ECF4");
tag.position.set(0, 2.15, 0);
g.add(tag);
var vest = wBox(0.5, 0.3, 0.06, wB(sdVest(N, r.team), { fog: false }), 0, 1.3, 0.2, g);
var sab = null;
if (N.kind === "duel") {
sab = sdSabre(0x5AB8FF);
g.add(sab);
sdPose(sab, "guard", 1);
}
g.position.set(r.x, 0, r.z);
SD.G.add(g);
gh = { g: g, sab: sab, vest: vest, tx: r.x, tz: r.z, rot: r.rot || 0, act: "guard" };
N.ghosts[r.id] = gh;
return gh;
},
function (o) {
var N = SD.net;
if (!N || !o || !o.ok)
return;
var prev = N.state;
N.state = o;
N.clock = o.now - Date.now();
var seen = {};
(o.players || []).forEach(function (r) {
if (r.me) {
var was = N.scores.me;
N.me.taggedFor = r.tagged_age != null && r.tagged_age < 2000 ? (2000 - r.tagged_age) / 1000 : 0;
if (N.kind === "tag" && r.tagged_age != null && r.tagged_age < 600 && !N.me.saidTag) {
N.me.saidTag = true;
sdNetSay("<b>You are tagged!</b> Two seconds out.");
if (typeof playTone === "function")
playTone(240, 0.3);
}
if (N.kind === "tag" && (r.tagged_age == null || r.tagged_age > 2000))
N.me.saidTag = false;
if (N.teams && r.team != null && N.team !== r.team) {
N.team = r.team;
sdNetSay("You are on <b>" + SD_SIDES[r.team].name + "</b>.");
}
N.scores.me = r.score;
return;
}
if (r.out)
return;
seen[r.id] = 1;
var gh = sdNetGhost(N, r);
gh.team = r.team;
gh.tx = r.x;
gh.tz = r.z;
gh.trot = r.rot;
gh.act = r.act || "guard";
gh.name = r.name;
gh.score = r.score;
gh.tagged = r.tagged_age != null && r.tagged_age < 2000;
if (N.kind === "duel") {
var theirs = N.scores[r.id];
if (theirs != null && r.score > theirs) {
sdNetSay("<b>Touched!</b> " + esc(r.name || "They") + " scores.");
if (typeof playTone === "function")
playTone(260, 0.35);
}
}
N.scores[r.id] = r.score;
});
Object.keys(N.ghosts).forEach(function (id) { if (!seen[id]) {
var g = N.ghosts[id];
if (g.g.parent)
g.g.parent.remove(g.g);
delete N.ghosts[id];
} });
if (o.status === "done" && !(prev && prev.status === "done")) {
var rows = (o.players || []).slice().sort(function (a, b) { return b.score - a.score; });
var mine = rows.filter(function (r) { return r.me; })[0], top = rows[0];
var res = o.result || null, tt = o.teams || res && res.teams;
var won = res && res.played ? (N.teams ? (res.team != null && mine && mine.team === res.team && !mine.out) : !!(mine && !res.draw && !mine.out && mine.score === Math.max.apply(null, rows.filter(function (r) { return !r.out; }).map(function (r) { return r.score; })))) : (mine && top && mine.id === top.id && rows.length > 1);
var html = "<div style='font:600 17px var(--serif,Georgia);color:#BFF0FF'>" + (N.teams ? "The battle is over" : N.kind === "tag" ? "Match over" : "The bout is over") + "</div>" +
(N.teams && tt ? "<div style='margin:4px 0'><b style='color:#FF8A8A'>Red " + tt[0] + "</b> · <b style='color:#8AD8FF'>Blue " + tt[1] + "</b>" + (res && res.team != null ? " · <b>" + SD_SIDES[res.team].name + " wins</b>" : res && res.draw ? " · a draw" : "") + "</div>" : "") +
"<table style='width:100%;font-size:13px'>" + rows.map(function (r, i) { return "<tr><td>" + (i + 1) + ".</td><td>" + (N.teams && r.team != null ? "<span style='color:" + SD_SIDES[r.team].css + "'>●</span> " : "") + esc(r.name || "A dreamer") + (r.me ? " (you)" : "") + (r.out ? " <span style='opacity:.6'>(left)</span>" : "") + "</td><td style='text-align:right'><b>" + r.score + "</b></td></tr>"; }).join("") + "</table>" +
(won ? "<p><b>You win!</b> +40 experience</p>" : res && res.draw ? "<p>A draw.</p>" : "") + "<p style='opacity:.75;font-size:12px'>Results and champions: ☰ Menu, 🏟️ Arenas.</p>" +
worldBtn("again", N.teams ? "Join another battle" : N.kind === "tag" ? "Join another match" : "Duel again", "");
var kind = N.pkind || N.kind;
worldCard(html, { again: function () { worldCard(null); sdNetJoin(kind); } });
sdNetLeave();
sdPad(false);
sdHud(null);
}
},
function (id) {
var N = SD.net;
if (!N || !N.game)
return;
cityRpc("stn_game_tag", { p_game: N.game, p_target: id }).then(function (o) {
if (!o)
return;
if (o.tagged) {
sdNetSay("<b>Tagged " + esc(o.name || "them") + "!</b> +1");
if (typeof playTone === "function")
playTone(990, 0.2);
}
else if (o.say)
sdNetSay(esc(o.say));
if (o.state)
sdNetState(o.state);
}).catch(function () { });
},
function (id, move) {
var N = SD.net;
if (!N || !N.game)
return;
cityRpc("stn_game_strike", { p_game: N.game, p_target: id, p_move: move }).then(function (o) {
if (!o)
return;
var r = o.result;
if (r === "touch") {
sdNetSay("<b>Touch!</b>");
if (typeof playTone === "function")
playTone(700, 0.35);
}
else if (r === "blocked") {
sdNetSay("<b>Blocked.</b> Blade meets blade.");
if (typeof playTone === "function")
playTone(400, 0.15);
}
else if (r === "parried") {
N.me.stun = 0.8;
sdNetSay("<b>Parried!</b> You are open.");
if (typeof playTone === "function")
playTone(480, 0.15);
}
else if (o.say)
sdNetSay(esc(o.say));
if (o.state)
sdNetState(o.state);
}).catch(function () { });
},
function (dt) {
var N = SD.net;
if (!N)
return;
var L = worldLocal(), now = Date.now(), st = N.state, me = N.me;
N.sayT -= dt;
me.t += dt;
me.stun = Math.max(0, me.stun - dt);
if (me.taggedFor > 0)
me.taggedFor = Math.max(0, me.taggedFor - dt);
if (N.kind === "duel") {
var blk = !!SD.blockHeld && me.stun <= 0;
if (me.act === "guard" && blk)
me.act = "block";
if (me.act === "block" && !blk)
me.act = "guard";
if (me.act === "block")
me.stam = Math.max(0, me.stam - 9 * dt);
else if (me.act === "guard")
me.stam = Math.min(100, me.stam + 22 * dt);
if (!me.hit && st && st.status === "running" && ((me.act === "swing" && me.t >= 0.2) || (me.act === "thrust" && me.t >= 0.15))) {
me.hit = true;
var len = me.act === "thrust" ? 3.7 : 3.2, target = null;
Object.keys(N.ghosts).forEach(function (id) { var g = N.ghosts[id]; if (sdReach(g.g.position.x, g.g.position.z, len))
target = id; });
if (target)
sdNetStrike(target, me.act);
else
sdNetSay(me.act === "thrust" ? "Your thrust falls short." : "Your blade cuts only air.");
}
if ((me.act === "swing" && me.t > 0.45) || (me.act === "thrust" && me.t > 0.4) || (me.act === "parry" && me.t > 0.9))
me.act = SD.blockHeld ? "block" : "guard";
sdMyPose(me);
}
if (N.game && !N.busy && now - N.polled > (st && st.status === "running" ? 330 : 1000)) {
N.busy = true;
N.polled = now;
var act = N.kind === "duel" ? (me.act === "parry" && me.t < 0.6 ? "parry" : me.act === "block" ? "block" : me.act === "swing" || me.act === "thrust" ? me.act : "guard") : "guard";
cityRpc("stn_game_beat", { p_game: N.game, p_x: L.x, p_z: L.z, p_rot: yaw, p_act: act }).then(function (o) { if (SD.net === N)
sdNetState(o); }).catch(function () { }).then(function () { N.busy = false; });
}
Object.keys(N.ghosts).forEach(function (id) {
var g = N.ghosts[id], k = Math.min(1, dt * 8);
g.g.position.x += (g.tx - g.g.position.x) * k;
g.g.position.z += (g.tz - g.g.position.z) * k;
if (g.trot != null) {
var want = g.trot + Math.PI, a = want - g.g.rotation.y;
while (a > Math.PI)
a -= Math.PI * 2;
while (a < -Math.PI)
a += Math.PI * 2;
g.g.rotation.y += a * k;
}
if (g.vest)
g.vest.material.color.setHex(g.tagged ? 0x3A3A44 : sdVest(N, g.team));
if (g.sab)
sdPose(g.sab, g.act === "swing" ? "cut" : g.act === "thrust" ? "thrust" : g.act === "block" ? "block" : g.act === "parry" ? "parry" : "guard", dt * 10);
});
var head = N.teams ? "Team battle" + (N.team != null ? " · <span style='color:" + SD_SIDES[N.team].css + "'>" + SD_SIDES[N.team].name + "</span>" : "") : N.kind === "tag" ? "Laser tag" : "Duel", line = "";
if (!st)
line = "finding a match…";
else if (st.status === "open") {
var n = (st.players || []).filter(function (r) { return !r.out; }).length, left = Math.max(0, Math.ceil((st.starts - (now + N.clock)) / 1000));
line = n < 2 ? "waiting for " + (N.kind === "tag" ? "at least one more player" : "an opponent") + " to join here" : (N.kind === "tag" ? n + " players · starts in " + left + " s" : "starts in " + left + " s");
}
else if (st.status === "running") {
var tl = Math.max(0, Math.ceil((st.ends - (now + N.clock)) / 1000));
var sc = N.teams && st.teams ? "<b style='color:#FF8A8A'>Red " + st.teams[0] + "</b> · <b style='color:#8AD8FF'>Blue " + st.teams[1] + "</b>" : (st.players || []).filter(function (r) { return !r.out; }).sort(function (a, b) { return b.score - a.score; }).slice(0, 4).map(function (r) { return esc(String(r.name || "?").split(" ")[0]) + (r.me ? " (you)" : "") + " <b>" + r.score + "</b>"; }).join(" · ");
line = Math.floor(tl / 60) + ":" + ("0" + tl % 60).slice(-2) + " · " + sc + (me.taggedFor > 0 ? " · <b>tagged</b> " + me.taggedFor.toFixed(1) + " s" : "");
}
var bar = N.kind === "duel" ? "<span style='display:inline-block;width:70px;height:7px;border:1px solid #FFD24A;border-radius:4px;vertical-align:middle;margin-left:6px'><span style='display:block;height:100%;width:" + Math.round(me.stam) + "%;background:#FFD24A'></span></span>" : "";
sdHud("<b>" + head + "</b> · " + line + bar + (N.sayT > 0 && N.say ? "<div>" + N.say + "</div>" : ""));
},
function (dt) {
if (!SD.built)
return;
dt = Math.min(dt || 0.016, 0.25);
SD.t += dt;
SD.cool = Math.max(0, (SD.cool || 0) - dt);
sdBeamsTick(dt);
sdRunTick(dt);
sdDuelTick(dt);
sdNetTick(dt);
sdPadTick();
if (SD.run && !sdInArena()) {
var R = SD.run;
R.targets.forEach(sdTargetGone);
SD.run = null;
sdHud(null);
setStatus("You left the arena: the target run is over.");
}
if (SD.net && SD.net.kind === "tag" && !sdInArena() && SD.net.state && SD.net.state.status !== "done") {
sdNetLeave();
sdHud(null);
setStatus("You left the arena, and the match.");
}
if (SD.net && SD.net.kind === "duel") {
var L0 = worldLocal();
if (Math.hypot(L0.x - SD_DUEL.x, L0.z - SD_DUEL.z) > SD_DUEL.r + 8) {
sdNetLeave();
sdPad(false);
sdHud(null);
setStatus("You left the duelling deck, and the bout.");
}
}
if (SD.bot) {
SD.bot.position.y = 0.25 + Math.sin(SD.t * 1.2) * 0.08;
SD.bot.rotation.y = Math.sin(SD.t * 0.3) * 0.4;
}
SD.aurora.forEach(function (a) { a.tex.offset.x = (SD.t * 0.004) % 1; a.m.material.opacity = 0.78 + Math.sin(SD.t * 0.12) * 0.07; });
var L = worldLocal(), Z = SD_ZERO, inZ = L.x > Z.x0 && L.x < Z.x1 && L.z > Z.z0 && L.z < Z.z1, W = WORLDS.station;
SD.zero.balls.forEach(function (b) {
var m = b.m.position;
m.addScaledVector(b.v, dt);
if (m.x < Z.x0 + 1 || m.x > Z.x1 - 1)
b.v.x *= -1;
if (m.y < 0.6 || m.y > Z.top - 0.6)
b.v.y *= -1;
if (m.z < Z.z0 + 1 || m.z > Z.z1 - 1)
b.v.z *= -1;
});
if (inZ !== SD.zero.on) {
SD.zero.on = inZ;
W.gravity = inZ ? 0.55 : 0;
if (!inZ) {
WLD.hop = 0;
WLD.hv = 0;
}
SD.zero.got = {};
}
if (inZ) {
if (WLD.hop > Z.top - 2) {
WLD.hop = Z.top - 2;
WLD.hv = Math.min(WLD.hv, 0);
}
SD.zero.hoops.forEach(function (h) { var y = camera.position.y; if (!SD.zero.got[h.n] && Math.hypot(L.x - h.x, L.z - h.z) < 1.3 && Math.abs(y - h.y) < 1.1) {
SD.zero.got[h.n] = 1;
var n = Object.keys(SD.zero.got).length;
if (typeof playTone === "function")
playTone(520 + n * 120, 0.3);
setStatus(n >= 3 ? "<b>All three hoops!</b> A true spacewalker." : "<b>Hoop " + n + " of 3.</b>");
} });
if (WLD.hop <= 0.001 && !WLD.promptFn)
worldPrompt("<b>Zero-G Bay</b> · <b>press E</b> to push off and float", function () { WLD.hv = 2.0; if (typeof playTone === "function")
playTone(300, 0.3); worldPrompt(null); });
else if (WLD.hop > 0.05)
worldPrompt(null);
}
}
];
});
