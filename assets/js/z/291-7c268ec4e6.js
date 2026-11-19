/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(291, function () {
"use strict";
return [
function (G) {
PP.g = G;
PP.lite = ppLite();
PP.spots = [];
PP.solids = [];
PP.pads = [];
PP.ramps = [];
PP.gates = [];
PP.walk = [];
PP.floors = [];
PP.beams = [];
PP.chase = [];
PP.flames = [];
PP.spin = [];
PP.glows = [];
PP.screens = [];
PP.people = [];
PP.dancers = [];
PP.music = [];
PP.staffAt = [];
PP.crowds = [];
PP.djs = [];
PP.bands = [];
PP.tiles = [];
PP.rooms = {};
PP.lanes = [];
PP.quartet = null;
var out = new THREE.Group();
out.name = "pp-out";
G.add(out);
PP.out = out;
var live = new THREE.Group();
live.name = "pp-out-live";
G.add(live);
PP.outLive = live;
ppSky(live);
ppLand(out, live);
ppStarport(out, live);
ppBoulevard(out, live);
ppClubOutside(out, live);
ppEchoOutside(out, live);
ppShopOutside(out, live);
ppHallOutside(out, live);
ppFestival(out, live);
ppBeach(out, live);
ppBake(out);
ppClubInside(G);
ppEchoInside(G);
ppShopInside(G);
ppHallInside(G);
ppPeople();
},
function (G) {
var st = wPoints(PP.lite ? 900 : 2200, function () { var u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = 3300, s = Math.sqrt(1 - u * u); return [Math.cos(a) * s * r, Math.abs(u) * r * 0.9 + 120, Math.sin(a) * s * r]; }, 0xF4ECFF, 1.6, false);
G.add(ppKeep(st));
var gp = new THREE.Group();
gp.position.set(700, 900, -2700);
G.add(ppKeep(gp));
var gt = wTex(256, 128, function (x, W, H) { for (var y = 0; y < H; y++) {
var v = y / H, b = Math.sin(v * 22 + Math.sin(v * 7) * 2) * 0.5 + 0.5;
x.fillStyle = "rgb(" + (150 + b * 80 | 0) + "," + (90 + b * 60 | 0) + "," + (170 + b * 50 | 0) + ")";
x.fillRect(0, y, W, 1);
} });
wMesh(new THREE.SphereGeometry(520, 40, 24), new THREE.MeshBasicMaterial({ map: gt, fog: false, color: 0xC8B8D8 }), 0, 0, 0, gp);
var rg = new THREE.RingGeometry(640, 980, 96, 1), rp = rg.attributes.position, ruv = rg.attributes.uv;
for (var i = 0; i < rp.count; i++) {
var rr = Math.hypot(rp.getX(i), rp.getY(i));
ruv.setXY(i, (rr - 640) / 340, 0.5);
}
var rt = wTex(256, 4, function (x, W) { for (var i = 0; i < W; i++) {
var a = 0.25 + 0.5 * Math.abs(Math.sin(i * 0.21)) * Math.abs(Math.sin(i * 0.05 + 1));
x.fillStyle = "rgba(240,210,250," + a.toFixed(2) + ")";
x.fillRect(i, 0, 1, 4);
} });
var ring = wMesh(rg, new THREE.MeshBasicMaterial({ map: rt, transparent: true, side: THREE.DoubleSide, depthWrite: false, fog: false }), 0, 0, 0, gp);
ring.rotation.x = 1.25;
ring.rotation.y = 0.25;
var m1 = wSph(90, new THREE.MeshBasicMaterial({ color: 0xD8D4E8, fog: false }), -1800, 1400, -1500, G, 24);
ppKeep(m1);
var m2 = wSph(55, new THREE.MeshBasicMaterial({ color: 0xF0B8C8, fog: false }), 2100, 1100, 800, G, 20);
ppKeep(m2);
for (var a = 0; a < (PP.lite ? 2 : 4); a++) {
var ag = new THREE.PlaneGeometry(2600, 420, 40, 1), ap = ag.attributes.position, cols = new Float32Array(ap.count * 3), c = new THREE.Color();
for (var j = 0; j < ap.count; j++) {
var top = ap.getY(j) > 0;
c.setHSL((0.45 + a * 0.12 + ap.getX(j) / 9000) % 1, 0.8, top ? 0.05 : 0.45);
cols[j * 3] = c.r;
cols[j * 3 + 1] = c.g;
cols[j * 3 + 2] = c.b;
}
ag.setAttribute("color", new THREE.BufferAttribute(cols, 3));
var am = new THREE.Mesh(ag, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
am.position.set(-400 + a * 300, 1400 + a * 120, -1900 + a * 500);
am.rotation.y = 0.3 * a;
G.add(ppKeep(am));
am.userData.base = ap.array.slice();
PP.spin.push({ aurora: am, ph: a * 1.7 });
}
var n = PP.lite ? 14 : 36, lg = new THREE.InstancedMesh(new THREE.SphereGeometry(0.6, 8, 6), ppGlowMat(0xFFC070), n);
PP.lanterns = { m: lg, n: n, s: [] };
for (var k = 0; k < n; k++) {
PP.lanterns.s.push({ x: 150 + Math.random() * 80, z: -210 + Math.random() * 80, y: Math.random() * 400, v: 2 + Math.random() * 2, ph: Math.random() * 6 });
}
G.add(ppKeep(lg));
},
function (G, L) {
var gr = wGround(1000, PP.lite ? 60 : 110, function (x, z) {
var h = ppOutH(x, z), dx = x - 190, dz = z + 170, d = Math.hypot(dx, dz), col;
if (d < 112)
col = d < 62 ? 0x7E6E58 : 0x9C8A70;
else if (x < -60 && x > -340 && z > -190 && z < 160)
col = 0x5E6A48;
else
col = h > 2 ? 0x4A3A62 : 0x5A4A6E;
var n = wFbm(x * 0.05, z * 0.05, 11, 2);
var c = new THREE.Color(col).multiplyScalar(0.9 + n * 0.2);
return [h, c.getHex()];
});
G.add(gr);
var lag = wMesh(new THREE.CircleGeometry(60, 64), new THREE.MeshPhongMaterial({ color: 0x3A7AB8, shininess: 80, specular: 0x8090C0, transparent: true, opacity: 0.88 }), 190, 0.06, -170, L);
lag.rotation.x = -Math.PI / 2;
var lagGlow = wMesh(new THREE.RingGeometry(52, 60, 64), ppGlowMat(0x6AE8FF, 0.25), 190, 0.08, -170, L);
lagGlow.rotation.x = -Math.PI / 2;
PP.glows.push({ m: lagGlow, base: 0.22, amp: 0.08, sp: 0.25, hue: 0.52 });
var R = ppRand(808);
for (var i = 0; i < 26; i++) {
var a = i / 26 * Math.PI * 2 + R() * 0.2, r = 520 + R() * 120, h = 40 + R() * 70;
var hill = wMesh(new THREE.ConeGeometry(70 + R() * 60, h, 7), ppM(0x3A2A52), Math.cos(a) * r, h / 2 - 6, Math.sin(a) * r, G);
hill.rotation.y = R() * 3;
}
for (var s = 0; s < 14; s++) {
var a2 = s / 14 * Math.PI * 2 + 0.4, r2 = 420 + R() * 30, cx = Math.cos(a2) * r2, cz = Math.sin(a2) * r2, y = ppOutH(cx, cz);
var cr = wMesh(new THREE.OctahedronGeometry(3 + R() * 3, 0), ppM(0xB890F0, { e: 0x40206A }), cx, y + 6, cz, G);
cr.scale.y = 3;
}
},
function (G, L) {
var pad = ppCyl(15, 16, 0.4, ppM(0x6A6478), 0, 0.2, 340, G, 40);
ppPad(-14, 14, 326, 354, 0.4);
var ring = wMesh(new THREE.RingGeometry(12, 13, 48), ppGlowMat(0xFFD27A, 0.7), 0, 0.42, 340, L);
ring.rotation.x = -Math.PI / 2;
PP.glows.push({ m: ring, base: 0.6, amp: 0.2, sp: 0.2, hue: 0.11 });
ppSign(G, ["JUBILEE STARPORT", "The Party Planet · always night, always on"], 10, 1.8, 0, 4, 322, 0);
ppBox(10.4, 2.2, 0.2, ppM(0x2A1838), 0, 4, 321.8, G);
ppBox(0.3, 3, 0.3, ppM(0x2A1838), -4, 1.5, 321.8, G);
ppBox(0.3, 3, 0.3, ppM(0x2A1838), 4, 1.5, 321.8, G);
ppCyl(4, 4.2, 0.3, ppM(0x5A5E66), -34, 0.15, 340, G, 24);
var r2 = wMesh(new THREE.RingGeometry(2.8, 3.2, 32), ppGlowMat(0xFF8AD8, 0.8), -34, 0.32, 340, L);
r2.rotation.x = -Math.PI / 2;
ppSign(G, ["ORBITAL LINE · PARTY LINE", "Shuttles home to Somnucor", "Press E on the pad"], 4.2, 1.6, -34, 2.4, 335.4, 0, "#0E1A2E", "#FFB8E8");
ppBox(0.12, 1.6, 0.12, ppM(0x666666), -34, 0.8, 335.4, G);
ppSpot({ x: -34, z: 340, r: 4.5, name: "Party Line shuttle stop: shuttles home to Somnucor", fn: function () { if (typeof orbDepartures === "function")
orbDepartures("jubilee");
else
worldHome(); } });
var gold = ppM(0xC9A868, { e: 0x2A1C08 }), white = ppM(0xD8D0E0), deep = ppM(0x2A1838);
for (var i = 0; i < 6; i++)
for (var j = 0; j < 2; j++) {
ppCyl(0.25, 0.3, 6, white, -15 + i * 6, 3, 298 + j * 14, G, 10);
ppSolidR(-15 + i * 6, 298 + j * 14, 0.35);
}
var can = ppBox(34, 0.4, 18, ppM(0x6A3A8A), 0, 6.2, 305, G);
for (var k = 0; k < 5; k++)
ppBox(34, 0.2, 0.3, gold, 0, 6.5, 297 + k * 4, G);
ppFloor(G, -17, 17, 296, 314, ppM(0x8A7A96));
ppBox(6, 1.1, 1.2, deep, -9, 0.55, 304, G);
ppBox(6.2, 0.08, 1.4, gold, -9, 1.12, 304, G);
ppSolid(-9, 304, 3, 0.6);
ppSign(G, ["CONCIERGE", "Ask anything"], 3, 0.9, -9, 2.6, 303.3, 0);
ppSpot({ x: -9, z: 306.4, r: 2.4, name: "The concierge: what is on, and where", fn: ppConcierge });
ppBox(4, 2.6, 3, ppM(0x3A6AB8), 9, 1.3, 305, G);
ppBox(4.2, 0.2, 3.2, gold, 9, 2.7, 305, G);
ppSolid(9, 305, 2, 1.5);
ppBox(2.4, 0.9, 0.1, ppGlowMat(0xFFE0A0), 9, 1.6, 306.55, G);
ppSign(G, ["WRISTBANDS", "Gold: 18 and over · Blue: everyone"], 3.4, 0.9, 9, 3.4, 306.65, 0);
ppSpot({ x: 9, z: 308.6, r: 2.4, name: "The wristband booth", fn: ppWristband });
var bt = wTex(512, 256, function (x, W, H) { ppPaintBoard(x, W, H); });
PP.boardTex = bt;
var bd = wMesh(new THREE.PlaneGeometry(5, 2.5), new THREE.MeshBasicMaterial({ map: bt, fog: false }), 0, 3, 296.92, L);
PP.board = bd;
ppBox(5.3, 2.8, 0.2, deep, 0, 3, 296.7, G);
ppBox(0.2, 1.6, 0.2, deep, -2, 0.8, 296.7, G);
ppBox(0.2, 1.6, 0.2, deep, 2, 0.8, 296.7, G);
ppSolid(0, 296.7, 2.7, 0.2);
ppSpot({ x: 0, z: 299.4, r: 2.6, name: "Tonight on Jubilee", fn: ppTonightCard });
var mp = wTex(512, 512, ppPaintMap);
var mpm = wMesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: mp, fog: false }), -21, 2.4, 316.12, L);
ppBox(3.4, 3.4, 0.2, deep, -21, 2.4, 315.9, G);
ppBox(0.2, 1.2, 0.2, deep, -21, 0.6, 315.9, G);
ppSolid(-21, 315.9, 1.7, 0.2);
ppSpot({ x: -21, z: 318.6, r: 2.4, name: "The map of Jubilee", fn: ppMapCard });
},
function (x, W, H) {
var d = new Date(), N = PP_NIGHTS[d.getDay()];
x.fillStyle = "#120A22";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(6, 6, W - 12, H - 12);
x.fillStyle = "#FFD9A0";
x.font = "bold 34px Georgia";
x.textAlign = "center";
x.fillText("TONIGHT ON JUBILEE", W / 2, 52);
x.fillStyle = "#FFB8E8";
x.font = "bold 40px Georgia";
x.fillText(N[1], W / 2, 112);
x.fillStyle = "#E8E0F4";
x.font = "22px Georgia";
x.fillText(N[2], W / 2, 154);
x.fillStyle = "#BFD8FF";
x.font = "20px sans-serif";
x.fillText("Glowworm Club · Echo Lounge · Festival · Beach Club", W / 2, 200);
x.fillText("Press E at the board for the whole week", W / 2, 232);
},
function (x, W, H) {
x.fillStyle = "#1A1030";
x.fillRect(0, 0, W, H);
function P(lx, lz) { return [W / 2 + lx / 440 * W * 0.48, H / 2 + lz / 440 * H * 0.48]; }
x.fillStyle = "#2A1E44";
x.beginPath();
x.arc(W / 2, H / 2, W * 0.48, 0, 7);
x.fill();
var b = P(190, -170);
x.fillStyle = "#E2CFA6";
x.beginPath();
x.arc(b[0], b[1], 112 / 440 * W * 0.48, 0, 7);
x.fill();
x.fillStyle = "#3A7AB8";
x.beginPath();
x.arc(b[0], b[1], 60 / 440 * W * 0.48, 0, 7);
x.fill();
function box(x0, z0, x1, z1, col, label) { var a = P(x0, z0), c = P(x1, z1); x.fillStyle = col; x.fillRect(a[0], a[1], c[0] - a[0], c[1] - a[1]); x.fillStyle = "#F4ECFF"; x.font = "bold 13px sans-serif"; x.textAlign = "center"; x.fillText(label, (a[0] + c[0]) / 2, (a[1] + c[1]) / 2 + 4); }
var a1 = P(-9, -270), a2 = P(9, 290);
x.fillStyle = "#8A7A96";
x.fillRect(a1[0], a1[1], a2[0] - a1[0], a2[1] - a1[1]);
box(-330, -170, -80, 140, "rgba(94,106,72,.8)", "FESTIVAL GROUNDS");
box(32, 10, 92, 70, "#6A2A8A", "GLOWWORM");
box(32, -80, 82, -30, "#2A4A8A", "ECHO LOUNGE");
box(-62, 150, -30, 190, "#C8508A", "CONFETTI");
box(-32, -330, 32, -290, "#A8843A", "GILDED HALL");
var s = P(0, 340);
x.fillStyle = "#FFD27A";
x.beginPath();
x.arc(s[0], s[1], 10, 0, 7);
x.fill();
x.fillStyle = "#F4ECFF";
x.fillText("STARPORT", s[0], s[1] + 26);
var bc = P(150, -90);
x.fillText("BEACH CLUB", bc[0], bc[1]);
var pl = P(0, 60);
x.fillStyle = "#6AE8FF";
x.beginPath();
x.arc(pl[0], pl[1], 8, 0, 7);
x.fill();
x.fillStyle = "#F4ECFF";
x.fillText("PLAZA", pl[0] + 34, pl[1] + 4);
x.fillStyle = "#FFD9A0";
x.font = "bold 22px Georgia";
x.fillText("JUBILEE", W / 2, 30);
},
function (G, L) {
var pave = ppM(0x8A7A96), kerb = ppM(0x5A4A6E);
ppBox(18, 0.04, 566, pave, 0, 0.02, 12, G);
ppBox(0.4, 0.12, 566, kerb, -9.2, 0.06, 12, G);
ppBox(0.4, 0.12, 566, kerb, 9.2, 0.06, 12, G);
ppBox(72, 0.04, 10, pave, -45, 0.02, 0, G);
ppBox(24, 0.04, 8, pave, 20, 0.02, 40, G);
ppBox(24, 0.04, 8, pave, 20, 0.02, -55, G);
ppBox(22, 0.04, 8, pave, -20, 0.02, 170, G);
var bp = ppBox(150, 0.04, 10, pave, 72, 0.02, -60, G);
bp.rotation.y = 0.62;
var pl = wMesh(new THREE.CircleGeometry(32, 48), ppM(0x9A8AA6), 0, 0.03, 60, G);
pl.rotation.x = -Math.PI / 2;
ppCyl(7.4, 7.6, 0.9, ppM(0xB8A8C8), 0, 0.45, 60, G, 32);
var wat = wMesh(new THREE.CircleGeometry(6.9, 32), new THREE.MeshPhongMaterial({ color: 0x3A6AB8, shininess: 90, transparent: true, opacity: 0.85 }), 0, 0.82, 60, G);
wat.rotation.x = -Math.PI / 2;
ppCyl(1, 1.4, 3, ppM(0xB8A8C8), 0, 1.5, 60, G, 16);
ppCyl(2.6, 0.6, 0.4, ppM(0xB8A8C8), 0, 3.1, 60, G, 20);
for (var j = 0; j < 8; j++) {
var a = j / 8 * Math.PI * 2, jet = wMesh(new THREE.ConeGeometry(0.35, 3.4, 8), ppGlowMat(0x8AE0FF, 0.45), Math.cos(a) * 4.6, 2.2, 60 + Math.sin(a) * 4.6, L);
PP.glows.push({ m: jet, base: 0.4, amp: 0.12, sp: 0.18, hue: (j / 8), ph: j });
}
var top = wMesh(new THREE.ConeGeometry(0.5, 4, 10), ppGlowMat(0xFFE0F8, 0.5), 0, 5.3, 60, L);
for (var b = 0; b < 10; b++) {
var a2 = b / 10 * Math.PI * 2 + 0.3;
if (Math.abs(Math.cos(a2)) > 0.9)
continue;
var bx = Math.cos(a2) * 26, bz = 60 + Math.sin(a2) * 26;
var bn = ppBox(3, 0.5, 0.8, ppM(0x6A4A3A), bx, 0.45, bz, G);
bn.rotation.y = -a2 + Math.PI / 2;
ppSolid(bx, bz, 1.5, 0.4, -a2 + Math.PI / 2);
}
var post = ppM(0x2A2238), bulbs = [];
for (var z = 280; z >= -260; z -= 20) {
[-10.5, 10.5].forEach(function (x) {
if (Math.abs(z - 60) < 34 && true)
return;
ppCyl(0.12, 0.16, 5.2, post, x, 2.6, z, G, 6);
ppSolidR(x, z, 0.25);
ppSph(0.36, ppM(0xFFE2B0, { b: 1 }), x, 5.3, z, G, 10);
if (!PP.lite || ((z / 20) | 0) % 2 === 0) {
var gl = wGlow(0xFFC880, 5, 0.45);
gl.position.set(x, 5.3, z);
L.add(gl);
}
});
if (Math.abs(z - 60) > 34)
for (var k = 0; k <= 14; k++) {
var f = k / 14, x2 = -10.5 + 21 * f, y2 = 5.1 - Math.sin(f * Math.PI) * 1.1;
bulbs.push([x2, y2, z]);
}
}
for (var p = 270; p >= -250; p -= 40) {
[-15, 15].forEach(function (x) { if (Math.abs(p - 60) < 40 || (p > 140 && p < 270))
return; ppPalm(G, x, p, ppHash("palm" + x + p)); });
}
ppBulbs(L, bulbs, 0.13);
var trucks = [["TACO COMET", "Street tacos · nachos", "#E8603A"], ["SLICE OF HEAVEN", "Wood-fired pizza", "#E8C03A"], ["NOODLE NEBULA", "Noodle boxes", "#3AB8A8"],
["SMASH SATURN", "Burgers and fries", "#C83A5A"], ["CHURRO CHARIOT", "Churros · funnel cake · candy floss", "#C87AE8"], ["JUICE JUPITER", "Lemonade · smoothies · water", "#6AC83A"]];
trucks.forEach(function (t, i) { var left = i < 3, x = left ? -21 : 21, z = 250 - (i % 3) * 24; ppTruck(G, L, x, z, left ? Math.PI / 2 : -Math.PI / 2, t); });
for (var tb = 0; tb < 6; tb++) {
var tz = 246 - tb * 9;
[-4, 4].forEach(function (dx) { if (true) {
var tx = dx * 3.2;
ppCyl(0.9, 0.9, 0.08, ppM(0xE8E0D0), tx, 0.85, tz, G, 14);
ppCyl(0.08, 0.12, 0.85, post, tx, 0.42, tz, G, 6);
ppSolidR(tx, tz, 0.9);
} });
}
},
function (G, x, z, h) {
var R = ppRand(h), trunk = ppM(0x6A4A30), leaf = ppM(0x3A8A5A);
var lean = (R() - 0.5) * 0.3, hgt = 7 + R() * 3, g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.z = lean;
G.add(g);
for (var i = 0; i < 6; i++)
ppCyl(0.32 - i * 0.03, 0.36 - i * 0.03, hgt / 6, trunk, 0, hgt / 12 + i * hgt / 6, 0, g, 7);
for (var k = 0; k < 7; k++) {
var a = k / 7 * Math.PI * 2, fr = wMesh(new THREE.ConeGeometry(0.7, 4.2, 4), leaf, Math.cos(a) * 1.5, hgt - 0.3, Math.sin(a) * 1.5, g);
fr.rotation.z = Math.PI / 2 * Math.cos(a) * 0.85;
fr.rotation.x = -Math.PI / 2 * Math.sin(a) * 0.85;
fr.scale.z = 0.25;
}
ppSolidR(x, z, 0.45);
},
function (G, list, r) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(new THREE.SphereGeometry(r || 0.12, 6, 4), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, fog: false }), list.length), m = new THREE.Matrix4(), c = new THREE.Color();
list.forEach(function (p, i) { m.makeTranslation(p[0], p[1], p[2]); im.setMatrixAt(i, m); c.setHSL((i * 0.07) % 1, 0.75, 0.62); im.setColorAt(i, c); });
G.add(ppKeep(im));
PP.chase.push({ m: im, n: list.length, off: PP.chase.length * 3 });
return im;
},
function (G, L, x, z, ry, t) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
var body = ppM(new THREE.Color(t[2]).getHex());
ppBox(7, 3, 2.8, body, 0, 1.9, 0, g);
ppBox(2, 2.2, 2.6, body, 4.4, 1.5, 0, g);
ppBox(1.4, 1, 2.5, ppM(0x2A3A4A), 4.9, 2.1, 0, g);
[-2.4, 2.4, 4.2].forEach(function (px) { [-1.3, 1.3].forEach(function (pz) { var w = ppCyl(0.45, 0.45, 0.3, ppM(0x1A1A1A), px, 0.45, pz, g, 12); w.rotation.x = Math.PI / 2; }); });
ppBox(4.6, 1.3, 0.1, ppM(0x1A1020), 0, 2.2, 1.42, g);
ppBox(4.8, 0.12, 0.9, ppM(0xE8E0D0), 0, 1.4, 1.8, g);
var aw = ppBox(5, 0.1, 1.4, ppM(0xF0E8D8), 0, 3.2, 2.0, g);
aw.rotation.x = 0.25;
ppSign(g, [t[0], t[1]], 4.2, 0.9, 0, 3.9, 1.44, 0, "#1A1020", t[2]);
var gl = wGlow(0xFFE0A0, 3, 0.35);
gl.position.set(0, 2.2, 1.8);
g.add(ppKeep(gl));
var wx = x + Math.sin(ry) * 0, cs = Math.cos(ry), sn = Math.sin(ry);
PP.solids.push({ x: x, z: z, hw: 3.6, hd: 1.5, rot: ry });
var fx = x + sn * 3.2, fz = z + cs * 3.2;
ppSpot({ x: fx, z: fz, r: 2.6, name: t[0] + ": " + t[1], fn: function () { ppMenu("truck", t[0]); } });
PP.staffAt = PP.staffAt || [];
PP.staffAt.push({ title: "Food truck cook", place: PP_KEYS.fest, x: x + sn * 0.4, z: z + cs * 0.4, ry: ry, seed: "truck" + t[0] });
},
function (G, L) {
var wall = ppM(0x2A1838), trim = ppM(0x8A5AC8, { e: 0x2A1040 });
ppBox(60, 18, 60, wall, 62, 9, 40, G);
ppSolid(62, 40, 30, 30, 0, 18);
ppBox(61, 0.6, 61, trim, 62, 18.1, 40, G);
[[62, 10.6, 60, 0.4], [62, 69.4, 60, 0.4], [32.6, 40, 0.4, 60], [91.4, 40, 0.4, 60]].forEach(function (q) { ppBox(q[2], 1.2, q[3], trim, q[0], 18.8, q[1], G); ppSolid(q[0], q[1], q[2] / 2, q[3] / 2, 0, 1.3, 17.9); });
ppWalk(PP_ROOF.x0, PP_ROOF.x1, PP_ROOF.z0, PP_ROOF.z1, "roof", 18.4);
ppRoof(G, L);
var pts = [];
for (var i = 0; i <= 40; i++) {
var f = i / 40;
pts.push(new THREE.Vector3(31.6, 8 + Math.sin(f * Math.PI * 4) * 1.6, 12 + f * 56));
}
var tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.35, 8, false), ppGlowMat(0x8AFF9A));
L.add(tube);
PP.glows.push({ m: tube, base: 1, amp: 0, sp: 0.03, hue: 0.33, cycle: 1 });
var head = ppSph(1.1, ppGlowMat(0xC8FFB0), 31.6, 8, 68.5, L, 14);
PP.glows.push({ m: head, base: 1, amp: 0, sp: 0.03, hue: 0.33, cycle: 1 });
ppSign(G, ["THE GLOWWORM", "Club · lounge · rooftop"], 14, 3, 31.4, 13.6, 40, -Math.PI / 2, "#120820", "#C8FFB0");
ppBox(0.3, 4, 5, ppM(0x120A18), 31.7, 2, 40, G);
var can = ppBox(5, 0.3, 9, ppM(0x6A3A8A), 28.5, 4.4, 40, G);
[-1, 1].forEach(function (s) { ppCyl(0.1, 0.1, 4.4, ppM(0xC9A868), 25, 2.2, 40 + s * 4.3, G, 6); });
for (var r = 0; r < 6; r++) {
var rz = 46 + r * 1.8;
ppCyl(0.06, 0.08, 1, ppM(0xC9A868), 26, 0.5, rz, G, 8);
ppSph(0.1, ppM(0xC9A868), 26, 1.05, rz, G, 8);
}
ppBox(0.05, 0.05, 9, ppM(0x8A1A2A), 26, 0.85, 50.5, G);
ppSpot({ x: 29.5, z: 40, r: 2.8, name: "The Glowworm Club: go in", fn: function () { ppGoIn("club"); } });
PP.staffAt = PP.staffAt || [];
PP.staffAt.push({ title: "Door supervisor", place: PP_KEYS.club, x: 29, z: 37, ry: -Math.PI / 2, seed: "door1" }, { title: "Door supervisor", place: PP_KEYS.club, x: 29, z: 43.4, ry: -Math.PI / 2, seed: "door2" });
PP.queue = [[24.4, 47], [24.6, 49], [24.2, 51], [24.5, 53.2], [24.3, 55]];
},
function (G, L) {
var R = PP_ROOF, deck = ppM(0x5A4A40), y = 18.4;
ppBox(R.x1 - R.x0, 0.3, R.z1 - R.z0, deck, (R.x0 + R.x1) / 2, 18.25, (R.z0 + R.z1) / 2, G);
ppBox(10, 1.1, 1, ppM(0x2A1838), 62, y + 0.55, 20, G);
ppBox(10.2, 0.08, 1.2, ppM(0xC9A868), 62, y + 1.12, 20, G);
ppSolid(62, 20, 5, 0.5, 0, 1.2, y - 0.2);
ppBox(10, 2.4, 0.4, ppM(0x2A1838), 62, y + 1.2, 15, G);
ppSolid(62, 15, 5, 0.2, 0, 2.5, y - 0.2);
ppSign(G, ["ROOFTOP BAR"], 4, 0.8, 62, y + 3, 15.25, 0, "#120820", "#FFB8E8");
ppSpot({ x: 62, z: 22.6, r: 2.6, y: y, name: "The rooftop bar", fn: function () { ppMenu("roof", "The rooftop bar"); } });
ppBox(3, 3, 0.4, ppM(0x8A5AC8), 88, y + 1.5, 62, G);
ppBox(2, 2.4, 0.1, ppM(0xC9A868), 88, y + 1.2, 61.75, G);
ppSpot({ x: 88, z: 59, r: 2.4, y: y, name: "The lift down to the club", fn: function () { ppLift("down"); } });
[[44, 36], [62, 40], [80, 36]].forEach(function (q) {
ppCyl(1.2, 1.2, 0.7, ppM(0x4A3A30), q[0], y + 0.35, q[1], G, 16);
ppSolidR(q[0], q[1], 1.3);
var fl = wMesh(new THREE.ConeGeometry(0.6, 0.9, 8), ppGlowMat(0xFF9A3A, 0.85), q[0], y + 1.1, q[1], L);
PP.flames.push({ m: fl, ph: q[0] });
});
ppBox(3, 1.1, 1.4, ppM(0x1A1020), 48, y + 0.55, 24, G);
ppSolid(48, 24, 1.5, 0.7, 0, 1.2, y - 0.2);
PP.music.push({ k: "pp-roof", zone: "roof", x: 48, z: 24, r: 40, C: { bpm: 112, band: false } });
PP.staffAt.push({ title: "Rooftop bartender", place: PP_KEYS.club, x: 62, z: 18.6, y: y, ry: 0, seed: "roofbar" });
var bulbs = [];
for (var k = 0; k <= 30; k++) {
bulbs.push([34 + k * 1.9, y + 3.4 - Math.sin(k / 30 * Math.PI * 3) * 0.5, 30]);
bulbs.push([34 + k * 1.9, y + 3.4 - Math.sin(k / 30 * Math.PI * 3) * 0.5, 48]);
}
ppBulbs(L, bulbs, 0.12);
PP.floors.push({ zone: "roof", x0: 40, x1: 56, z0: 28, z1: 44, y: y, n: 0 });
},
function (G, L) {
var wall = ppM(0x1E2A4A), trim = ppM(0x5A8AE8, { e: 0x10204A });
ppBox(50, 12, 50, wall, 57, 6, -55, G);
ppSolid(57, -55, 25, 25);
ppBox(51, 0.5, 51, trim, 57, 12.1, -55, G);
ppSign(G, ["THE ECHO LOUNGE", "Karaoke · bowling · games"], 13, 2.8, 31.6, 9, -55, -Math.PI / 2, "#0A1028", "#A8D8FF");
var mic = ppCyl(0.5, 0.3, 2, ppGlowMat(0xFF8AD8), 31.6, 5.2, -66, L, 12);
var mh = ppSph(0.75, ppGlowMat(0xFF8AD8), 31.6, 6.6, -66, L, 12);
PP.glows.push({ m: mic, base: 1, amp: 0, sp: 0.04, hue: 0.88, cycle: 1 }, { m: mh, base: 1, amp: 0, sp: 0.04, hue: 0.88, cycle: 1 });
var pin = ppSph(0.8, ppGlowMat(0xE8F0FF), 31.6, 4.6, -44, L, 12);
pin.scale.y = 1.8;
ppSph(0.45, ppGlowMat(0xE8F0FF), 31.6, 6.6, -44, L, 10);
ppBox(0.3, 4, 5, ppM(0x0A1020), 31.7, 2, -55, G);
ppBox(5, 0.3, 8, trim, 29, 4.4, -55, G);
ppSpot({ x: 29.5, z: -55, r: 2.8, name: "The Echo Lounge: go in", fn: function () { ppGoIn("echo"); } });
},
function (G, L) {
ppBox(32, 9, 40, ppM(0xF0C8DA), -46, 4.5, 170, G);
ppSolid(-46, 170, 16, 20);
for (var i = 0; i < 12; i++) {
var aw = ppBox(2.4, 0.15, 2, ppM(i % 2 ? 0xFFF4F8 : 0xE84A8A), -28.6, 4.3, 159 + i * 2, G);
aw.rotation.z = -0.3;
}
ppSign(G, ["CONFETTI & CO.", "Everything for the party"], 10, 2.2, -29.8, 6.8, 170, Math.PI / 2, "#FFF0F6", "#C8306A");
ppBox(0.3, 3.6, 4, ppM(0x6A3A4A), -29.8, 1.8, 170, G);
ppBox(0.1, 2.4, 5, ppGlowMat(0xFFE8C8), -29.75, 2, 162, G);
ppBox(0.1, 2.4, 5, ppGlowMat(0xFFE8C8), -29.75, 2, 178, G);
var R = ppRand(4141), cols = [0xFF6AA8, 0xFFD06A, 0x6AD8FF, 0xA88AFF, 0x8AE8A8];
for (var b = 0; b < 14; b++) {
var bx = -29.2, by = 6 + R() * 2.4, bz = 158 + R() * 24;
ppSph(0.45, ppM(cols[b % 5]), bx, by, bz, G, 10);
}
ppSpot({ x: -27, z: 170, r: 2.8, name: "Confetti & Co.: go in", fn: function () { ppGoIn("shop"); } });
},
function (G, L) {
var gold = ppM(0xC9A868, { e: 0x3A2A08 }), stone = ppM(0xE8DCC8), dark = ppM(0x2A2018);
for (var i = -12; i <= 12; i++) {
if (Math.abs(i) < 3)
continue;
ppCyl(0.07, 0.07, 5, gold, i * 0.8, 2.5, -270, G, 6);
ppSph(0.14, gold, i * 0.8, 5.1, -270, G, 6);
}
ppBox(20, 0.3, 0.3, gold, 0, 4.7, -270, G);
ppSolid(-6, -270, 4, 0.2);
ppSolid(6, -270, 4, 0.2);
[-2.4, 2.4].forEach(function (x) { ppBox(0.8, 6, 0.8, stone, x, 3, -270, G); ppSolid(x, -270, 0.4, 0.4); ppSph(0.45, gold, x, 6.4, -270, G, 12); });
ppSign(G, ["THE GILDED HALL", "By invitation"], 5, 1.3, 0, 6.4, -269.75, 0, "#1A1208", "#F2D08A");
ppBox(64, 14, 40, stone, 0, 7, -312, G);
ppSolid(0, -312, 32, 20);
for (var c = 0; c < 8; c++) {
var cx = -21 + c * 6;
if (Math.abs(cx) < 3)
continue;
ppCyl(0.8, 0.9, 12, stone, cx, 6, -290.5, G, 14);
ppSolidR(cx, -290.5, 0.9);
}
var tri = new THREE.Shape();
tri.moveTo(-27, 0);
tri.lineTo(27, 0);
tri.lineTo(0, 5.5);
tri.lineTo(-27, 0);
wMesh(new THREE.ExtrudeGeometry(tri, { depth: 1.4, bevelEnabled: false }), stone, 0, 12.9, -292, G);
ppBox(54, 0.8, 1.2, gold, 0, 12.6, -290.4, G);
[[-287.6, 0.15, 30], [-288.9, 0.3, 28], [-290.2, 0.45, 26]].forEach(function (q) { var zc = (-291.8 + q[0]) / 2; ppBox(q[2], q[1], q[0] + 291.8, stone, 0, q[1] / 2, zc, G); ppPad(-q[2] / 2, q[2] / 2, -291.8, q[0], q[1]); });
ppBox(5, 6, 0.3, dark, 0, 3, -291.9, G);
ppBox(5.4, 0.4, 0.4, gold, 0, 6.1, -291.8, G);
for (var w = 0; w < 6; w++) {
var wx = -27 + w * 10.8;
if (Math.abs(wx) < 4)
continue;
ppBox(2.4, 4, 0.1, ppGlowMat(0xFFD890), wx, 5, -291.95, G);
}
ppSpot({ x: 0, z: -288.6, r: 2.6, name: "The Gilded Hall: present your invitation", fn: function () { ppGoIn("hall"); } });
PP.staffAt.push({ title: "Gilded Hall steward", place: PP_KEYS.hall, x: 3.4, z: -288.4, ry: Math.PI, seed: "hallsteward" });
}
];
});
