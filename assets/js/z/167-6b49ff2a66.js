/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(167, function () {
"use strict";
return [
function (x, z) {
if (z > -125 && z < 12 && Math.abs(x) < 6)
return 0;
if (z <= -125 && z > -236 && Math.abs(x) < 6)
return udStairTop(z);
var dx = x - UD.C.x, dz = z - UD.C.z, d = Math.hypot(dx, dz);
if (d < udCaveR(Math.atan2(dz, dx))) {
if (Math.abs(x) < 1.6 && z > -1054 && z < -1026)
return udCaveH(0, -1040) + 0.11;
return udCaveMeshH(x, z);
}
if (Math.abs(z + 700) < 6 && x > 400 && x < 820)
return -60 - 20 * Math.max(0, Math.min(1, (x - 480) / 320));
var gd = Math.hypot(x - UD_GLIM.x, z - UD_GLIM.z);
if (gd < UD_GLIM.r)
return udGlimH(x, z);
if (x > UD_GLIM.x && x < UD_SEA_X + 600 && Math.abs(z - UD_GLIM.z) < 260)
return x < UD_SEA_X ? -80 - (x - UD_GLIM.x - UD_GLIM.r) / 40 : -86;
return -999;
},
function (x, z) {
var G = UD_CG, fx = (x - UD.C.x) / G.s + G.n / 2, fz = (z - UD.C.z) / G.s + G.n / 2;
if (fx < 0 || fz < 0 || fx >= G.n || fz >= G.n)
return udCaveH(x, z);
var i = Math.floor(fx), j = Math.floor(fz), u = fx - i, v = fz - j, a = udCaveCorner(i, j), b = udCaveCorner(i, j + 1), c = udCaveCorner(i + 1, j + 1), d = udCaveCorner(i + 1, j);
return u + v <= 1 ? a + (d - a) * u + (b - a) * v : c + (b - c) * (1 - u) + (d - c) * (1 - v);
},
function (G) {
var rock = udRock(0x4A443E), dark = udRock(0x2E2A26), timber = wM(0x5A4028), iron = wM(0x3A3A3E);
var tun = udPassage(new THREE.BoxGeometry(12, 7, 134), 0x3E3832, [5]);
tun.position.set(0, 3.4, -55);
G.add(tun);
var tg = new THREE.BoxGeometry(12, 7, 134, 6, 4, 67);
tun.geometry = tg;
var p2 = tg.attributes.position;
for (var j = 0; j < p2.count; j++) {
var x2 = p2.getX(j), y2 = p2.getY(j), z2 = p2.getZ(j);
if (Math.abs(x2) > 5.9)
p2.setX(j, x2 + (wNoise(y2 * 0.5, z2 * 0.25, 3) - 0.5) * 1.8);
if (y2 > 3.4)
p2.setY(j, y2 + (wNoise(x2 * 0.5, z2 * 0.25, 4) - 0.5) * 1.4);
if (y2 < -3.4)
p2.setY(j, -3.45);
}
tg.computeVertexNormals();
for (var k = 0; k < 14; k++) {
var z = -6 - k * 8.5;
wBox(0.35, 5.2, 0.35, timber, -4.6, 2.6, z, G);
wBox(0.35, 5.2, 0.35, timber, 4.6, 2.6, z, G);
wBox(9.8, 0.4, 0.4, timber, 0, 5.3, z, G);
if (k % 2 === 0) {
var lamp = new THREE.Group();
wCyl(0.14, 0.18, 0.35, wB(0xFFC870, { fog: false }), 0, 0, 0, lamp, 8);
wCyl(0.2, 0.2, 0.06, iron, 0, 0.2, 0, lamp, 8);
lamp.position.set(0, 4.8, z);
G.add(lamp);
var gl = wGlow(0xFFB860, 2.6, 0.7);
gl.position.set(0, 4.8, z);
G.add(gl);
}
}
[-0.7, 0.7].forEach(function (x) { wBox(0.12, 0.12, 124, iron, x, 0.08, -60, G); });
for (var s = 0; s < 62; s++)
wBox(2.2, 0.1, 0.3, timber, 0, 0.04, -s * 2, G);
[[0, -30], [0, -74]].forEach(function (q, i) {
var cart = new THREE.Group();
wBox(1.6, 1, 2.2, wM(0x5A4A3A), 0, 0.9, 0, cart);
for (var w = 0; w < 4; w++)
wCyl(0.28, 0.28, 0.12, iron, (w % 2 ? 0.8 : -0.8), 0.3, (w < 2 ? 0.7 : -0.7), cart, 10).rotation.z = Math.PI / 2;
for (var o = 0; o < 6; o++)
wMesh(new THREE.DodecahedronGeometry(0.28, 0), wM([0x8A7A6A, 0xC8A040, 0x6A9AD8][o % 3]), (o % 3 - 1) * 0.4, 1.5, (o < 3 ? -0.4 : 0.4), cart);
cart.position.set(q[0], 0, q[1]);
G.add(cart);
UD.solids.push({ x: q[0], z: q[1], hw: 0.9, hd: 1.2 });
});
for (var c = 0; c < 20; c++) {
var side = c % 2 ? 1 : -1, cz = -10 - c * 5.6, cr = wMesh(new THREE.OctahedronGeometry(0.25, 0), wB([0x8FD8F0, 0xC890F0, 0x90F0B0][c % 3]), side * 5.4, 1 + ((c * 7) % 30) / 10, cz, G);
cr.scale.y = 2.2;
cr.rotation.z = side * 0.5;
}
udFact(G, 3.5, -12, "How deep can a mine go?", ["The deepest mine in the world is Mponeng gold mine in South Africa: its tunnels reach about 4 km below the surface.", "Down there the rock is about 60°C, and the mine has to pump ice slurry through the tunnels to keep the miners cool."], -Math.PI / 2);
var dg = new THREE.Group();
dg.position.set(0, 0, -122);
G.add(dg);
UD.door = dg;
var slab = wBox(11.6, 6.8, 1.2, rock, 0, 3.4, 0, dg);
var rt = wTex(512, 300, function (x, W, H) {
x.fillStyle = "#4A443E";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(20,16,12,0.85)";
x.lineWidth = 6;
x.beginPath();
x.arc(W / 2, H / 2, 110, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.arc(W / 2, H / 2, 92, 0, Math.PI * 2);
x.stroke();
for (var r = 0; r < 16; r++) {
var a = r / 16 * Math.PI * 2, cx = W / 2 + Math.cos(a) * 101, cy = H / 2 + Math.sin(a) * 101;
x.beginPath();
x.moveTo(cx - 5, cy - 5);
x.lineTo(cx + 5, cy + 5);
x.moveTo(cx + 5, cy - 5);
x.lineTo(cx, cy + 4);
x.stroke();
}
x.beginPath();
x.moveTo(W / 2, H / 2 - 70);
x.lineTo(W / 2 - 18, H / 2 + 60);
x.lineTo(W / 2 + 18, H / 2 + 60);
x.closePath();
x.stroke();
x.beginPath();
x.ellipse(W / 2, H / 2 + 5, 14, 10, 0, 0, Math.PI * 2);
x.stroke();
for (var l = 0; l < 4; l++) {
[-1, 1].forEach(function (sd) { x.beginPath(); x.moveTo(W / 2 + sd * 12, H / 2 + l * 5); x.quadraticCurveTo(W / 2 + sd * 40, H / 2 - 20 + l * 10, W / 2 + sd * 52, H / 2 + 10 + l * 14); x.stroke(); });
}
});
var face = wMesh(new THREE.PlaneGeometry(9, 5.3), new THREE.MeshLambertMaterial({ map: rt }), 0, 3.3, 0.61, dg);
var rune = wMesh(new THREE.CircleGeometry(0.32, 12), wB(0xC890F0, { fog: false }), 0, 3.3 + 101 / 300 * 5.3 * 0, 0.63, dg);
rune.position.set(101 / 512 * 9, 3.3, 0.63);
UD.rune = rune;
var stS = new THREE.Group(), tread = 110 / (UD_STEPS - 1);
for (var sk = 0; sk < UD_STEPS; sk++) {
var su = sk / (UD_STEPS - 1);
wBox(10, 0.9, tread, dark, 0, -60 * su - 0.45, -125 - su * 110, stS);
}
landBake(G, stS);
for (var st = 0; st < 60; st++) {
var u = st / 59;
if (st % 6 === 3) {
[-1, 1].forEach(function (sd) { var cr = wMesh(new THREE.OctahedronGeometry(0.3, 0), wB(0xB890FF, { fog: false }), sd * 5.2, -60 * u + 1.6, -125 - u * 110, G); cr.scale.y = 2.2; var cg = wGlow(0xA070FF, 2.2, 0.6); cg.position.copy(cr.position); G.add(cg); });
}
}
var sl = new THREE.PointLight(0xA070FF, 0.9, 80, 1.4);
sl.position.set(0, -28, -180);
G.add(sl);
var stw = udPassage(new THREE.BoxGeometry(12, 9, 116, 4, 4, 40), 0x3A342E, [4, 5]);
stw.position.set(0, 0, -180);
G.add(stw);
stw.rotation.x = -Math.atan2(60, 110);
stw.position.y = -30 + 4;
var R = UD.R + 140;
var gr = wGround(UD_CG.n * UD_CG.s, UD_CG.n, function (x, z) {
var wx = UD.C.x + x, wz = UD.C.z + z, h = udCaveH(wx, wz);
var c = new THREE.Color(0x3A3632);
var fd = Math.hypot(wx + 250, wz + 560);
if (fd < 200)
c.lerp(new THREE.Color(0x3A2A4A), 0.6 * (1 - fd / 200));
if (Math.hypot(wx - UD_CITY.x, wz - UD_CITY.z) < 180)
c.setHex(0x2A2830);
return [h, c.getHex()];
});
gr.position.set(UD.C.x, 0, UD.C.z);
G.add(gr);
var dome = wMesh(new THREE.SphereGeometry(R, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x2A2622, side: THREE.BackSide, flatShading: true }), UD.C.x, -64, UD.C.z, G);
dome.scale.y = 0.32;
var dp = dome.geometry.attributes.position;
for (var q = 0; q < dp.count; q++) {
var v = new THREE.Vector3(dp.getX(q), dp.getY(q), dp.getZ(q)), n = 0.9 + 0.2 * wNoise(v.x * 0.01, v.z * 0.01 + v.y * 0.01, 11);
dp.setXYZ(q, v.x * n, v.y * n, v.z * n);
}
dome.geometry.computeVertexNormals();
var Rr = wRand(901);
var stg = new THREE.ConeGeometry(1, 1, 6), stm = udRock(0x3E3934);
var instA = new THREE.InstancedMesh(stg, stm, 260), instB = new THREE.InstancedMesh(stg, stm, 160), mtx = new THREE.Matrix4(), qt = new THREE.Quaternion(), down = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
for (var a1 = 0; a1 < 260; a1++) {
var aa = Rr() * 6.283, dd = Math.sqrt(Rr()) * UD.R * 0.95, x3 = UD.C.x + Math.cos(aa) * dd, z3 = UD.C.z + Math.sin(aa) * dd, ln = 6 + Rr() * 30, roof = -64 + R * 0.32 * Math.sqrt(Math.max(0, 1 - dd * dd / (R * R))) * 0.95;
mtx.compose(new THREE.Vector3(x3, roof - ln / 2, z3), down, new THREE.Vector3(1 + ln * 0.08, ln, 1 + ln * 0.08));
instA.setMatrixAt(a1, mtx);
}
G.add(instA);
var nb = 0;
for (var b1 = 0; b1 < 400 && nb < 160; b1++) {
var ab = Rr() * 6.283, db = Math.sqrt(Rr()) * UD.R * 0.9, x4 = UD.C.x + Math.cos(ab) * db, z4 = UD.C.z + Math.sin(ab) * db, h4 = udHeight(x4, z4);
if (h4 < -900 || Math.hypot(x4 - UD_CITY.x, z4 - UD_CITY.z) < 200 || Math.hypot(x4 - UD_LAKE.x, z4 - UD_LAKE.z) < UD_LAKE.r + 20 || Math.abs(x4) < 14 && z4 > -300 || Math.abs(z4 + 700) < 12 && x4 > 300 || udClearAt(x4, z4))
continue;
var l4 = 2 + Rr() * 9;
mtx.compose(new THREE.Vector3(x4, h4 + l4 / 2 - 0.2, z4), qt, new THREE.Vector3(0.5 + l4 * 0.15, l4, 0.5 + l4 * 0.15));
instB.setMatrixAt(nb++, mtx);
UD.solids.push({ x: x4, z: z4, r: 0.5 + l4 * 0.15 });
}
instB.count = nb;
G.add(instB);
var lake = wMesh(new THREE.CircleGeometry(UD_LAKE.r + 24, 48), new THREE.MeshPhongMaterial({ color: 0x06101A, shininess: 120, specular: 0x4A6A9A }), UD_LAKE.x, UD_LAKE_Y, UD_LAKE.z, G);
lake.rotation.x = -Math.PI / 2;
UD.lake = lake;
var motes = wPoints(260, function () { var a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * UD_LAKE.r; return [UD_LAKE.x + Math.cos(a) * r, UD_LAKE_Y + 0.2 + Math.random() * 0.4, UD_LAKE.z + Math.sin(a) * r]; }, 0x6AE8D8, 0.35, true);
G.add(motes);
UD.lakeMotes = motes;
var isl = wMesh(new THREE.DodecahedronGeometry(14, 1), udRock(0x3A3632), UD_LAKE.x + 20, UD_LAKE_Y - 6, UD_LAKE.z - 10, G);
isl.scale.y = 0.6;
var shr = new THREE.Group();
wCyl(0.5, 0.7, 4, udRock(0x5A5450), 0, 2, 0, shr, 6);
wSph(0.7, wB(0x6AE8D8, { fog: false }), 0, 4.6, 0, shr, 10);
var sgl = wGlow(0x6AE8D8, 10, 0.7);
sgl.position.y = 4.6;
shr.add(sgl);
shr.position.set(UD_LAKE.x + 20, UD_LAKE_Y + 2, UD_LAKE.z - 10);
G.add(shr);
var boat = new THREE.Group();
var hull = wMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM(0x3A2A1E), 0, 0.4, 0, boat);
hull.scale.set(1.1, 0.5, 3);
boat.position.set(UD_LAKE.x + UD_LAKE.r - 10, UD_LAKE_Y, UD_LAKE.z + 40);
boat.rotation.y = 0.6;
G.add(boat);
udFact(G, UD_LAKE.x + UD_LAKE.r + 18, UD_LAKE.z + 10, "Blind cave fish", ["In caves in Mexico lives a fish, the Mexican tetra, whose cave-dwelling kind has no eyes at all.", "Over many generations in total darkness, eyes were no use to them; they find their way with sensitive pits along their sides that feel the water move."], Math.PI / 2);
udFungusForest(G, Rr);
udCity(G, Rr);
for (var sp = 0; sp < 5; sp++) {
var spd = udSpider(sp < 2 ? 2.2 : 1.2);
var a5 = sp * 1.3, x5 = -260 + Math.cos(a5) * 120, z5 = -560 + Math.sin(a5) * 120;
spd.position.set(x5, udHeight(x5, z5), z5);
G.add(spd);
UD.spiders.push({ g: spd, hx: x5, hz: z5, a: a5, t: 0 });
}
udGlimmerdeep(G, Rr);
udFarm(G);
udFalls(G);
udGrotto(G);
udRift(G);
udRuins(G);
udMarket(G);
udJetty(G);
udForge(G);
udHermit(G);
udFact(G, 8, -262, "The Underdark is a story; caves are real", ["Under limestone country, rainwater with a little carbon dioxide in it slowly dissolves the rock and carves caves.", "The deepest cave known is Veryovkina, in the Caucasus mountains of Abkhazia: explorers have reached 2,212 m below its entrance.", "The largest single cave passage is Son Doong in Vietnam, big enough to hold a city block of skyscrapers, with its own jungle and clouds inside."], Math.PI);
udFact(G, -30, -470, "How stalactites grow", ["Each drip of water from a cave roof leaves behind a tiny ring of calcite (the mineral of limestone).", "Ring by ring, a stalactite grows down from the roof, and where the drips land a stalagmite grows up to meet it. Most grow only about a centimetre in a hundred years.", "Tip: stalaCtites hold tight to the Ceiling; stalaGmites rise from the Ground."], Math.PI / 2);
[[UD_CITY.x, -30, UD_CITY.z, 0xA070FF, 1.3, 600], [-260, -40, -560, 0x60E0C0, 1.0, 380], [0, -50, -300, 0xFFB060, 0.6, 220], [UD_LAKE.x, -58, UD_LAKE.z, 0x40C8E8, 0.8, 260], [UD_GLIM.x, -70, UD_GLIM.z, 0xFFD890, 1.0, 190], [UD_SEA_X + 300, -60, UD_GLIM.z, 0x4AA8D8, 0.9, 700]].forEach(function (l) { var pl = new THREE.PointLight(l[3], l[4], l[5], 1.2); pl.position.set(l[0], l[1], l[2]); G.add(pl); });
var tl = new THREE.PointLight(0xFFC070, 0.9, 90, 1.5);
tl.position.set(0, 4, -60);
G.add(tl);
},
function (G, x, z, title, rows, rot) {
var y = udHeight(x, z);
if (y < -900)
y = 0;
var st = new THREE.Group();
st.position.set(x, y, z);
st.rotation.y = rot || 0;
G.add(st);
wBox(1.6, 1.3, 0.3, udRock(0x5A5450), 0, 0.65, 0, st);
UD.solids.push({ x: x, z: z, hw: 0.85, hd: 0.2, rot: rot || 0 });
var sg = wSign([title, "Press E to read"], 1.5, 0.6, "#2A2620", "#C8E8E0");
sg.position.set(0, 1.45, 0.16);
st.add(sg);
UD.talkers.push({ x: x, z: z, r: 3, name: title, verb: "read the stone", fn: function () { worldCard(worldFacts(title, "A fact stone", [], rows)); } });
},
function (G, R) {
var cx = -260, cz = -560;
var cols = [[0x8A4AC8, 0xC890F0], [0x3AA88A, 0x8AF0D0], [0x4A6AD8, 0x9AC0FF], [0xC85A8A, 0xF8A8D0]];
for (var i = 0; i < 70; i++) {
var a = R() * 6.283, d = Math.sqrt(R()) * 200, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d, h = udHeight(x, z);
if (h < -900 || Math.hypot(x - UD_LAKE.x, z - UD_LAKE.z) < UD_LAKE.r + 10)
continue;
var big = R() < 0.4, s = big ? 6 + R() * 10 : 1.5 + R() * 3, c = cols[i % 4];
var m = new THREE.Group();
m.position.set(x, h, z);
G.add(m);
var stem = wCyl(0.1 * s, 0.15 * s, s, wM(0xD8D0C0, { e: c[0], ei: 0.08 }), 0, s / 2, 0, m, 8);
stem.rotation.z = (R() - 0.5) * 0.2;
var cap = wMesh(new THREE.SphereGeometry(0.55 * s, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), wM(c[0], { e: c[0], ei: 0.55 }), 0, s * 0.95, 0, m);
cap.scale.y = 0.55;
var gill = wMesh(new THREE.CircleGeometry(0.53 * s, 16), wB(c[1], { fog: true }), 0, s * 0.94, 0, m);
gill.rotation.x = Math.PI / 2;
for (var dt = 0; dt < 5; dt++) {
var sp = wSph(0.05 * s, wB(c[1]), Math.cos(dt * 1.3) * 0.3 * s, s * 0.95 + 0.18 * s, Math.sin(dt * 1.3) * 0.3 * s, m, 6);
}
m.userData.ph = R() * 6;
UD.shrooms.push(m);
if (big)
UD.solids.push({ x: x, z: z, r: 0.17 * s });
}
var sp2 = wPoints(500, function () { var a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * 210; return [cx + Math.cos(a) * r, -60 + Math.random() * 30, cz + Math.sin(a) * r]; }, 0xB8F0E0, 0.18, true);
G.add(sp2);
UD.spores = sp2;
udFact(G, cx + 30, cz + 210, "Glowing in the dark", ["Bioluminescence is light made by living things. Some real mushrooms glow green at night, like the 'foxfire' fungi that make rotting wood shine.", "In the Waitomo caves of New Zealand, glow-worms (the larvae of a gnat) hang sticky threads from the roof and shine blue-green to lure insects: the cave ceiling looks like a sky full of stars.", "The largest living thing on Earth may be a honey fungus in Oregon, USA: one organism spreading under about 9 square kilometres of forest."], 0);
},
function (s) {
var g = new THREE.Group(), body = wM(0x1E1A22), eye = wB(0xC83A4A, { fog: false });
var ab = wSph(0.7, body, 0, 0.9, -0.6, g, 12);
ab.scale.set(1, 0.85, 1.2);
var th = wSph(0.42, body, 0, 0.85, 0.35, g, 10);
for (var e = 0; e < 4; e++)
wSph(0.06, eye, (e % 2 ? 0.1 : -0.1) * (e < 2 ? 1 : 1.8), 0.98 + (e < 2 ? 0 : -0.05), 0.72, g, 6);
var mark = wMesh(new THREE.CircleGeometry(0.18, 6), wB(0xC890F0), 0, 1.47, -0.6, g);
mark.rotation.x = -Math.PI / 2;
g.userData.legs = [];
for (var i = 0; i < 8; i++) {
var side = i < 4 ? -1 : 1, k = i % 4, leg = new THREE.Group();
leg.position.set(side * 0.3, 0.85, 0.5 - k * 0.25);
g.add(leg);
var up = wCyl(0.05, 0.04, 0.9, body, 0, 0, 0, leg, 5);
up.rotation.z = side * -0.9;
up.position.set(side * 0.36, 0.26, 0);
var lo = wCyl(0.04, 0.02, 1.15, body, 0, 0, 0, leg, 5);
lo.rotation.z = side * 0.35;
lo.position.set(side * 0.92, -0.2, 0);
leg.rotation.y = side * (k - 1.5) * 0.35;
g.userData.legs.push(leg);
}
g.scale.setScalar(s);
return g;
},
function (G, R) {
var cx = UD_CITY.x, cz = UD_CITY.z, base = udHeight(cx, cz);
var stone = new THREE.MeshLambertMaterial({ color: 0x2E2A36, flatShading: true }), trim = wM(0x4A3A6A, { e: 0x2A1A4A, ei: 0.4 });
var winT = wTex(64, 128, function (x, W, H) { x.fillStyle = "#1A1622"; x.fillRect(0, 0, W, H); for (var r = 0; r < 8; r++)
for (var c = 0; c < 2; c++) {
if ((r * 3 + c * 5) % 4 === 0)
continue;
x.fillStyle = (r + c) % 3 ? "#B890FF" : "#7AB8FF";
x.fillRect(10 + c * 30, 6 + r * 15, 12, 8);
} }, [1, 1]);
var spires = [];
function spire(x, z, h, r) {
var y = udHeight(x, z);
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var body = wMesh(new THREE.ConeGeometry(r, h, 9, 6), stone, 0, h / 2, 0, g);
var bp = body.geometry.attributes.position;
for (var i = 0; i < bp.count; i++) {
var yy = bp.getY(i);
bp.setX(i, bp.getX(i) * (1 + Math.sin(yy * 0.3 + x) * 0.06));
bp.setZ(i, bp.getZ(i) * (1 + Math.cos(yy * 0.3 + z) * 0.06));
}
body.geometry.computeVertexNormals();
var lit = new THREE.MeshBasicMaterial({ map: winT.clone(), transparent: true, opacity: 0.95 });
lit.map.needsUpdate = true;
lit.map.wrapS = lit.map.wrapT = THREE.RepeatWrapping;
lit.map.repeat.set(4, Math.max(1, h / 14));
var wins = wMesh(new THREE.ConeGeometry(r * 1.01, h * 0.8, 9, 1, true), lit, 0, h * 0.4, 0, g);
wins.material.blending = THREE.AdditiveBlending;
wins.material.depthWrite = false;
for (var b = 1; b < 4; b++) {
var ring = wMesh(new THREE.TorusGeometry(r * (1 - b * 0.22) + 0.3, 0.25, 4, 18), trim, 0, h * b * 0.22, 0, g);
ring.rotation.x = Math.PI / 2;
}
var tip = wSph(0.6 + r * 0.06, wB(0xC890F0, { fog: false }), 0, h + 0.3, 0, g, 8);
var tg = wGlow(0xB890FF, 4 + r * 0.4, 0.8);
tg.position.y = h + 0.3;
g.add(tg);
var dr = wMesh(new THREE.PlaneGeometry(2.4, 3.6), wB(0x7A5AC8, { fog: true }), 0, 1.8, r * 0.88, g);
UD.solids.push({ x: x, z: z, r: r * 0.92 });
spires.push({ x: x, z: z, y: y, h: h, r: r });
return g;
}
spire(cx, cz, 95, 16);
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2 + 0.2, d = 70 + (i % 2) * 26;
spire(cx + Math.cos(a) * d, cz + Math.sin(a) * d, 40 + ((i * 17) % 30), 6 + (i % 3) * 2.5);
}
for (var j = 0; j < 14; j++) {
var a2 = j / 14 * Math.PI * 2, d2 = 135 + (j % 3) * 12;
if (Math.abs(Math.atan2(Math.sin(a2), Math.cos(a2)) - Math.atan2(-0.92, -0.4)) < 0.25)
continue;
spire(cx + Math.cos(a2) * d2, cz + Math.sin(a2) * d2, 18 + ((j * 11) % 14), 3.5 + (j % 2));
}
var web = new THREE.LineBasicMaterial({ color: 0xC8C0E8, transparent: true, opacity: 0.55 });
for (var k = 1; k < spires.length && k < 10; k++) {
var A = spires[0], B = spires[k], hA = A.y + A.h * 0.5, hB = B.y + B.h * 0.55;
for (var s = -1; s <= 1; s += 2) {
var pts = [];
for (var u = 0; u <= 12; u++) {
var t = u / 12;
pts.push(new THREE.Vector3(A.x + (B.x - A.x) * t + s * 0.8, hA + (hB - hA) * t - Math.sin(t * Math.PI) * 4, A.z + (B.z - A.z) * t));
}
G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), web));
}
var span = Math.hypot(B.x - A.x, B.z - A.z), deck = wBox(1.6, 0.2, span - A.r * 0.5 - B.r * 0.6, wM(0x3A3448, { e: 0x1A1430, ei: 0.5 }), (A.x + B.x) / 2, (hA + hB) / 2 - 3.6, (A.z + B.z) / 2, G);
deck.rotation.order = "YXZ";
deck.rotation.y = Math.atan2(B.x - A.x, B.z - A.z);
deck.rotation.x = -Math.atan2(hB - hA, span);
}
var mk = [[cx - 36, cz + 40], [cx - 26, cz + 52], [cx - 46, cz + 28], [cx - 14, cz + 58]];
mk.forEach(function (q, i) {
var st = new THREE.Group(), y = udHeight(q[0], q[1]);
st.position.set(q[0], y, q[1]);
st.rotation.y = -0.7;
G.add(st);
wBox(3, 1, 1.4, wM(0x3A3040), 0, 0.5, 0, st);
[-1, 1].forEach(function (s) { wCyl(0.06, 0.06, 2.6, wM(0x2A2430), s * 1.4, 1.3, -0.6, st, 5); });
var aw = wBox(3.4, 0.08, 1.8, wM([0x5A2A7A, 0x2A4A7A, 0x3A6A5A, 0x6A2A4A][i], { e: 0x1A0A2A, ei: 0.4 }), 0, 2.6, 0, st);
aw.rotation.x = 0.2;
for (var g2 = 0; g2 < 5; g2++)
wSph(0.12, wB([0xC890F0, 0x8FD8F0, 0x90F0B0, 0xF0C890][g2 % 4]), -1.1 + g2 * 0.55, 1.12, 0.2, st, 6);
UD.solids.push({ x: q[0], z: q[1], r: 1.8 });
});
var gx = cx - 110, gz = cz + 200 * 0 + 92;
var gate = new THREE.Group(), gy = udHeight(gx, gz);
gate.position.set(gx, gy, gz);
gate.rotation.y = Math.atan2(-(gx - 0), -(gz + 300)) + Math.PI;
G.add(gate);
[-5, 5].forEach(function (s) { var pl = wCone(1.6, 14, stone, s, 7, 0, gate, 7); wSph(0.4, wB(0xC890F0, { fog: false }), s, 14.2, 0, gate, 8); });
var arch = wMesh(new THREE.TorusGeometry(5, 0.6, 6, 18, Math.PI), trim, 0, 11, 0, gate);
var sg = wSign(["Zhaelvorn", "City of Spires", "Enter in peace, and keep it"], 5, 1.8, "#1A1622", "#C8B0FF");
sg.position.set(0, 5, 0.8);
gate.add(sg);
UD.cityGate = { x: gx, z: gz };
var DE = function (top, f, o) { var L = { top: top, topKind: f ? "dress" : "robe", bottom: top, skin: [0x4A4660, 0x3E3A52, 0x55506A][(o || 0) % 3], hair: 0xEDEAF4, hairStyle: f ? "long" : (o % 2 ? "long" : "short"), shoes: 0x1A1820, hat: "none", layer: "cloak", layerColor: 0x1A1424 }; return L; };
var folk = [
["Matron Ilvaryn of House Vaelith", cx + 6, cz + 20, DE(0x4A2A6A, 1, 0), "the eldest of the Matrons who rule Zhaelvorn from the Great Spire; stately, sharp, patient, and quietly amused by surface folk. You speak with formal courtesy and expect it in return.", "A surface-walker, in Zhaelvorn. You came through the old door, then. Few find it; fewer are let through it. Speak, and speak well."],
["Zarith, a blademaster of the Spire Guard", gx + 4, gz - 6, { top: 0x2A2A34, topKind: "shirt", bottom: 0x1A1A22, skin: 0x3E3A52, hair: 0xEDEAF4, hairStyle: "long", hat: "none", layer: "armor", layerColor: 0x2A2438 }, "a disciplined, dry-humoured guard captain who has walked every tunnel within a month of the city. You respect skill and honesty and have no patience for boasting. Keep the peace; you will happily teach someone the rules of the city.", "Halt, and be welcome, in that order. Weapons stay sheathed in Zhaelvorn. Now: what brings a surface-walker down the long stair?"],
["Velra, a web-weaver", cx - 30, cz + 48, DE(0x2A4A6A, 1, 1), "a merchant and artisan who weaves cloth from the silk of the giant spiders the city keeps; warm, talkative, a shrewd trader, proud of her craft. You love explaining how spider silk is gathered and woven.", "Silk, friend! Spider silk, finer than anything the surface spins and stronger than steel wire, thread for thread. Come and feel it."],
["Nym, a young scout", cx - 60, cz + 80, DE(0x3A3A4A, 0, 3), "a curious young scout who has always wanted to see the surface: the sun, the sky, rain. You ask the visitor lots of questions about the world above and tell them about tunnels, the fungus forest and the Darklake.", "Wait, you're from up there? Is it true the roof is blue? And there's a lamp in it so bright you can't look at it? Tell me everything."],
["Sorrith, keeper of the Spire library", cx + 18, cz - 14, DE(0x2A2A5A, 0, 1), "a scholarly mage who keeps the city's records cut into stone tablets, and studies the faint violet glow in the rock that the city calls the faerglow. Gentle, absent-minded, delighted by questions.", "Ah, a visitor. Careful of the tablets. Have you noticed the rock here glows, very faintly? We call it the faerglow. Nobody knows quite what it is. I have theories."]
];
folk.forEach(function (f, i) {
var y = udHeight(f[1], f[2]);
var who = wPerson("zhael_" + i, { sex: /Matron|Velra/.test(f[0]) ? "f" : "m", look: f[3] });
who.position.set(f[1], y, f[2]);
who.rotation.y = Math.atan2(-(f[1] - gx), -(f[2] - gz));
G.add(who);
var P = { g: who, wander: i === 3 ? { r: 14, sp: 1.4 } : null };
UD.people.push(P);
UD.talkers.push({ p: P, r: 4, name: f[0], t: { name: f[0], persona: "You are " + f[0] + ", one of the dark elves of Zhaelvorn, City of Spires, a city carved into stalagmites in a vast cavern of the Underdark, under a mine in SomnuMatrix (an original setting). You are " + f[4] + " Your people are proud, wary of strangers, artistic and long-lived; they keep giant spiders for silk and ride lizards in the tunnels; their city glows violet and blue. Be courteous and characterful, never cruel or frightening beyond a little mystery, and keep it suitable for all ages.", greet: f[5] } });
});
for (var c = 0; c < 10; c++) {
var a3 = c / 10 * 6.283 + 0.4, d3 = 40 + (c % 3) * 25, x6 = cx + Math.cos(a3) * d3, z6 = cz + Math.sin(a3) * d3;
var w = wPerson("zhael_c" + c, { sex: c % 2 ? "f" : "m", look: DE([0x3A2A5A, 0x2A3A5A, 0x4A2A4A, 0x2A2A3A][c % 4], c % 2, c) });
w.position.set(x6, udHeight(x6, z6), z6);
G.add(w);
UD.people.push({ g: w, wander: { r: 18, sp: 1.1 } });
}
},
function (G, R) {
var x0 = UD_GLIM.x, z0 = UD_GLIM.z;
var rd = udPassage(new THREE.BoxGeometry(320, 10, 12, 30, 2, 2), 0x3A3430, [0, 1]);
rd.position.set(630, -66, -700);
G.add(rd);
var rp = rd.geometry.attributes.position;
for (var i = 0; i < rp.count; i++) {
var x = rp.getX(i), y = rp.getY(i);
rp.setY(i, y - 20 * Math.max(0, Math.min(1, (x + 630 - 480) / 320)));
}
rd.geometry.computeVertexNormals();
for (var l = 0; l < 8; l++) {
var lx = 500 + l * 40, ly = udHeight(lx, -700);
var cr = wMesh(new THREE.OctahedronGeometry(0.4, 0), wB(0xFFD890, { fog: false }), lx, ly + 4, -705.5, G);
cr.scale.y = 2;
}
var sg = wSign(["East: Glimmerdeep", "the deep gnomes' town", "and the Sunless Sea beyond"], 4, 1.6, "#2A2620", "#FFE8B0");
sg.position.set(470, -56, -694);
sg.rotation.y = -Math.PI / 2;
G.add(sg);
var dome = wMesh(new THREE.SphereGeometry(UD_GLIM.r + 20, 24, 12, Math.PI + 0.55, Math.PI * 2 - 1.1, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x3A342E, side: THREE.BackSide, flatShading: true }), x0, -84, z0, G);
dome.scale.y = 0.4;
var gr = wGround(UD_GLIM.r * 2 + 40, 100, function (x, z) { var wx = x0 + x, wz = z0 + z, h = udHeight(wx, wz); if (h < -900 || Math.hypot(wx - UD_GLIM.x, wz - UD_GLIM.z) < UD_GLIM.r + 12)
h = udGlimH(wx, wz); return [h, 0x4A4038]; });
gr.position.set(x0, 0, z0);
G.add(gr);
for (var h = 0; h < 16; h++) {
var a = h / 16 * 6.283, d = 50 + (h % 3) * 30, x = x0 + Math.cos(a) * d, z = z0 + Math.sin(a) * d;
if (x > x0 + 90)
continue;
var y = udHeight(x, z);
var hs = new THREE.Group();
hs.position.set(x, y, z);
hs.rotation.y = -a + Math.PI / 2;
G.add(hs);
var dm = wMesh(new THREE.SphereGeometry(3.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), udRock(0x6A5E52), 0, 0, 0, hs);
dm.scale.y = 0.8;
wMesh(new THREE.CircleGeometry(0.7, 8, 0, Math.PI), wB(0x1A120A), 0, 0, 3.15, hs);
var wn = wMesh(new THREE.CircleGeometry(0.4, 8), wB([0x8FD8F0, 0xF0C890, 0x90F0B0][h % 3], { fog: false }), 1.4, 1.4, 2.75, hs);
wn.rotation.y = 0.45;
UD.solids.push({ x: x, z: z, r: 3.2 });
}
var wk = new THREE.Group(), wy = udHeight(x0 - 10, z0);
wk.position.set(x0 - 10, wy, z0);
G.add(wk);
wBox(4, 1, 2, wM(0x5A4A3A), 0, 0.5, 0, wk);
var wheel = wCyl(0.6, 0.6, 0.12, wM(0xA8A8B0), 0, 1.3, 0, wk, 16);
wheel.rotation.x = Math.PI / 2;
UD.wheel = wheel;
for (var g = 0; g < 8; g++)
wMesh(new THREE.OctahedronGeometry(0.15, 0), wB([0xE84A6A, 0x4AE8A0, 0x6AA0FF, 0xF0E05A][g % 4]), -1.5 + g * 0.4, 1.05, 0.6, wk);
UD.solids.push({ x: x0 - 10, z: z0, hw: 2.2, hd: 1.2 });
var gn = [["Bimble Quartzhand, master gem-cutter", x0 - 10, z0 + 3, "the town's master gem-cutter: cheerful, precise, a little deaf from years at the grinding wheel, and passionate about gems. You love to explain how gems are cut (cleaving, sawing, grinding facets, polishing) and what makes each stone special, with real gemmology facts: hardness on the Mohs scale, why diamonds sparkle, where rubies and emeralds really come from.", "Eh? Visitor? Come in, come in! Mind the wheel. Look at this one, see how the light bounces back up through the top? That's the facets doing their work."],
["Pell Stonewhistle, the ferry-keeper", UD_SEA_X - 10, z0 + 8, "the ferry-keeper on the shore of the Sunless Sea, an underground ocean that goes on further than anyone has charted. You are calm, thoughtful and full of tales about what lies across it: islands of glowing coral, the ruins of older cities, things that sing in the deep. You can tell the visitor the ferry is being refitted for a long voyage and will sail one day.", "The Sunless Sea. Nobody has found the far shore, though plenty have looked. My ferry is being refitted for a long voyage. One day, friend. One day we'll see what's out there."],
["Tock, an apprentice", x0 + 20, z0 - 30, "a young apprentice gem-cutter and lamp-maker; eager, a bit clumsy, and very proud of the glowing lamps you make from cave crystals.", "Hi! Hi! Do you like my lamps? I made that one. And that one. That one fell over but it still works."]];
var GN = function (c) { return { top: c, topKind: "shirt", bottom: 0x4A4038, skin: 0x8A8478, hair: 0x5A5450, hairStyle: "bald", beard: 1, hat: "none", layer: "apron", layerColor: 0x6A5040 }; };
gn.forEach(function (q, i) {
var y = udHeight(q[1], q[2]);
var who = wPerson("glim_" + i, { sex: "m", look: GN([0x6A5A8A, 0x3A5A6A, 0x8A5A3A][i]), scale: 0.62 });
who.position.set(q[1], y < -900 ? -80 : y, q[2]);
who.rotation.y = -Math.PI / 2;
G.add(who);
var P = { g: who, wander: i === 2 ? { r: 20, sp: 1 } : null };
UD.people.push(P);
UD.talkers.push({ p: P, r: 3.5, name: q[0], t: { name: q[0], persona: "You are " + q[0] + ", one of the deep gnomes of Glimmerdeep, a small gem-cutting town deep in the Underdark of SomnuMatrix (an original setting): small, grey-skinned, bald, sturdy folk who love stone and gems. You are " + q[3] + " Keep it friendly and suitable for all ages.", greet: q[4] } });
});
for (var c = 0; c < 6; c++) {
var a2 = c * 1.1, x2 = x0 + Math.cos(a2) * 40, z2 = z0 + Math.sin(a2) * 40;
var w = wPerson("glim_c" + c, { sex: c % 2 ? "f" : "m", look: GN([0x5A6A4A, 0x6A4A5A, 0x4A4A6A][c % 3]), scale: 0.62 });
w.position.set(x2, udHeight(x2, z2), z2);
G.add(w);
UD.people.push({ g: w, wander: { r: 16, sp: 0.9 } });
}
var sea = wWater(1400, 80, 0x0E2A48, 0.35, { shine: 110, spec: 0x7AAADA });
sea.material.emissive = new THREE.Color(0x061A2E);
sea.position.y = UD_SEA_Y;
G.add(sea);
UD.sea = sea;
wWaterTick(sea, UD_SEA_X + 700, z0, 0);
var plank = wPoints(1200, function () { return [UD_SEA_X + Math.random() * 1300, UD_SEA_Y + 0.15, z0 + (Math.random() - 0.5) * 1100]; }, 0x6AF0FF, 1.6, true);
G.add(plank);
UD.plankton = plank;
var shore = wGround(400, 40, function (x, z) { var wx = UD_SEA_X - 60 + x, wz = z0 + Math.max(-258, Math.min(258, z)), h = Math.hypot(wx - UD_GLIM.x, wz - UD_GLIM.z) < UD_GLIM.r + 12 ? udGlimH(wx, wz) - 0.6 : udHeight(wx, wz); return [h < -900 ? -90 : h, 0x5A5046]; });
shore.position.set(UD_SEA_X - 60, 0, z0);
G.add(shore);
var jetty = wBox(3, 0.4, 30, wM(0x4A3A2A), UD_SEA_X + 10, UD_SEA_Y + 1, z0, G);
jetty.rotation.y = Math.PI / 2;
var ferry = new THREE.Group();
var fh = wMesh(new THREE.SphereGeometry(1, 14, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM(0x3A2A1E), 0, 0.6, 0, ferry);
fh.scale.set(2, 0.8, 6);
wCyl(0.12, 0.12, 7, wM(0x3A2A1E), 0, 3.5, 0, ferry, 6);
var lp = wSph(0.35, wB(0x8FD8F0, { fog: false }), 0, 7.2, 0, ferry, 8);
ferry.position.set(UD_SEA_X + 18, UD_SEA_Y, z0 + 8);
G.add(ferry);
UD.ferry = ferry;
var roof = wMesh(new THREE.PlaneGeometry(1400, 1200), new THREE.MeshLambertMaterial({ color: 0x14100E, side: THREE.DoubleSide }), UD_SEA_X + 700, UD_SEA_Y + 90, z0, G);
roof.rotation.x = Math.PI / 2;
var glowworms = wPoints(1500, function () { return [UD_SEA_X + Math.random() * 1300, UD_SEA_Y + 89.5, z0 + (Math.random() - 0.5) * 1100]; }, 0x6AF0D0, 0.5, true);
G.add(glowworms);
udFact(G, UD_SEA_X - 30, z0 - 20, "Seas under the ground", ["Real underground lakes exist: Reed Flute Cave in China, and the Dragon's Breath Cave in Namibia, which holds one of the largest known underground lakes, its water so clear divers can see 100 m.", "Deep inside the Earth, a mineral called ringwoodite, 400 to 700 km down, holds water locked in its crystals: perhaps as much as all the oceans together."], -Math.PI / 2);
},
function (x, z) {
var S = UD_SPOTS, r = S.rift;
if (Math.hypot(x - S.farm.x, z - S.farm.z) < S.farm.r + 10)
return "the Velvetcap Terraces";
if (Math.hypot(x - S.falls.x, z - S.falls.z) < S.falls.r + 15)
return "the Long Fall";
if (Math.hypot(x - S.grotto.x, z - S.grotto.z) < S.grotto.r + 8)
return "the Shardlight Grotto";
if (x > r.x0 - 20 && x < r.x1 + 20 && z > r.z0 - 12 && z < r.z1 + 12)
return Math.abs(x) < 4 ? "the Weavers' Bridge" : "the edge of the Riven Deep";
if (Math.hypot(x - S.ruins.x, z - S.ruins.z) < S.ruins.r + 15)
return "the ruins of Old Ylmarr";
if (Math.hypot(x - S.market.x, z - S.market.z) < S.market.r + 8)
return "the Halfway Market";
if (Math.hypot(x - S.landing.x, z - S.landing.z) < S.landing.r + 12 || udJettyAt(x, z) !== null)
return "Stillwater Landing";
if (Math.hypot(x - S.forge.x, z - S.forge.z) < S.forge.r + 10)
return "Cinderwell Forges";
if (Math.hypot(x - S.hollow.x, z - S.hollow.z) < S.hollow.r + 8)
return "the Echoing Hollow";
return null;
},
function (G) {
var F = UD_SPOTS.farm, S = new THREE.Group(), y0 = udTop(F.x, F.z, 14) - 0.3, edge = udRock(0x5A5450), soil = wM(0x2E2420), stem = wM(0xD8D0C0, { e: 0x2A2A2A, ei: 0.3 });
var caps = [wM(0x8A4AC8, { e: 0x8A4AC8, ei: 0.45 }), wM(0x3AA88A, { e: 0x3AA88A, ei: 0.45 }), wM(0xC8A86A, { e: 0x6A5A2A, ei: 0.35 })];
var capG = new THREE.SphereGeometry(0.32, 6, 3, 0, Math.PI * 2, 0, Math.PI / 2), stemG = new THREE.CylinderGeometry(0.07, 0.09, 0.36, 4, 1, true);
for (var t = 0; t < 3; t++) {
var bz = F.z + 8 - t * 8, bh = 0.5 + t * 0.6;
wBox(22, bh, 5.6, edge, F.x, y0 + bh / 2, bz, S);
wBox(21, 0.1, 4.6, soil, F.x, y0 + bh + 0.04, bz, S);
for (var r = 0; r < 2; r++)
for (var c = 0; c < 12; c++) {
var mx = F.x - 9.6 + c * 1.7 + (r % 2) * 0.8, mz = bz - 1 + r * 2;
wMesh(stemG, stem, mx, y0 + bh + 0.25, mz, S);
var cp = wMesh(capG, caps[t], mx, y0 + bh + 0.42, mz, S);
cp.scale.y = 0.7;
}
UD.solids.push({ x: F.x, z: bz, hw: 11, hd: 2.8 });
}
for (var s = 0; s < 3; s++) {
wBox(2, 0.3 + s * 0.6, 1.6, edge, F.x + 12.4, y0 + (0.3 + s * 0.6) / 2, F.z + 8 - s * 8, S);
UD.solids.push({ x: F.x + 12.4, z: F.z + 8 - s * 8, hw: 1, hd: 0.8 });
}
var hx = F.x + 18, hz = F.z + 14;
var hut = wMesh(new THREE.SphereGeometry(3.6, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), udRock(0x6A5E52), hx, y0, hz, S);
hut.scale.y = 0.8;
wMesh(new THREE.CircleGeometry(0.8, 10, 0, Math.PI), wB(0x1A120A), hx - 3.55, y0, hz, S).rotation.y = -Math.PI / 2;
UD.solids.push({ x: hx, z: hz, r: 3.7 });
[[-14, 13], [-12, 14.6], [-10.6, 12.8]].forEach(function (q, i) { var bx = F.x + q[0], bz = F.z + q[1]; wCyl(0.55, 0.45, 0.6, wM(0x8A6A3A), bx, y0 + 0.3, bz, S, 10); for (var k = 0; k < 5; k++) {
var cp = wMesh(capG, caps[(i + k) % 3], bx + Math.cos(k * 1.3) * 0.25, y0 + 0.62, bz + Math.sin(k * 1.3) * 0.25, S);
cp.scale.setScalar(0.8);
} });
var heap = wSph(2, wM(0x3A2A1E), F.x - 16, y0 - 0.4, F.z - 6, S, 10);
heap.scale.y = 0.5;
UD.solids.push({ x: F.x - 16, z: F.z - 6, r: 1.8 });
var lamps = [[-12, 12], [12, 12], [-12, -20], [12, -20]];
lamps.forEach(function (q) { var lx = F.x + q[0], lz = F.z + q[1]; wCyl(0.08, 0.1, 2.8, wM(0x3A3040), lx, y0 + 1.4, lz, S, 6); wSph(0.32, wB(0xC8F070, { fog: false }), lx, y0 + 3, lz, S, 10); UD.solids.push({ x: lx, z: lz, r: 0.2 }); });
var sg = wSign(["The Velvetcap Terraces", "Grown here for Zhaelvorn and Glimmerdeep", "Please don't pick the caps"], 4.4, 1.5, "#2A2620", "#C8F0B0");
sg.position.set(F.x - 4, y0 + 2, F.z + 14);
S.add(sg);
wBox(0.12, 1.3, 0.12, wM(0x3A3040), F.x - 4, y0 + 0.65, F.z + 13.94, S);
landBake(G, S);
lamps.forEach(function (q) { var gl = wGlow(0xC8F070, 3, 0.55); gl.position.set(F.x + q[0], y0 + 3, F.z + q[1]); G.add(gl); });
udPut(G, "ud_farmer", { sex: "f", look: UD_GNOME(0x5A6A3A), scale: 0.62 }, F.x + 13, F.z + 12, { name: "Hesk Loamfinger, a fungus farmer", persona: "You are Hesk Loamfinger, a deep gnome who farms the Velvetcap Terraces, a mushroom farm in the great cavern" + UD_SETTING + " You are warm, earthy, practical and proud of your crops: velvetcaps (violet, mild and nutty), mintgills (teal, cool and sharp) and amber puffs (golden, good in soup). You sell to the cooks of Zhaelvorn and to Glimmerdeep, you light the farm with jars of glow-beetles, and you know real facts about how mushrooms grow (spores, the threads called mycelium, why they need no sunlight, damp and dark). Offer the visitor a taste.", greet: "Mind the beds, love; the velvetcaps are just coming up. Here, try an amber puff. Good in soup, better fried. You're not from Glimmerdeep, are you? Too tall." }, null, Math.PI / 2);
udPut(G, "ud_farmcook", { sex: "m", look: UD_ELF(0x3A2A5A, 0, 1) }, F.x - 6, F.z + 12, { name: "Tavren, a cook from Zhaelvorn", persona: "You are Tavren, a cook from one of the great houses of Zhaelvorn, City of Spires, come down to the Velvetcap Terraces to choose mushrooms for a feast" + UD_SETTING + " You are fussy, enthusiastic and funny about food, and you love describing dishes made with the farm's velvetcaps, mintgills and amber puffs, and the lake fish of the Darklake.", greet: "Ah, a surface-walker with an appetite, I hope? The velvetcaps are perfect this week. I am planning a feast. Would you like to hear the menu? It is long." }, { r: 3, sp: 0.6 }, 0);
udFact(G, F.x - 20, F.z + 16, "Mushrooms in the dark", ["Mushrooms are not plants. Fungi cannot make food from light, so they need no sun at all: they feed on rotting wood and leaves, and many farms grow them in dark, damp rooms.", "In the 1800s, Paris grew its button mushrooms in the old limestone quarries under the city. They are still called champignons de Paris.", "What you see is only the fruit. The real fungus is a web of fine threads in the soil, called mycelium."], Math.PI / 2);
},
function (G) {
var F = UD_SPOTS.falls, S = new THREE.Group(), rock = udRock(0x4A443E), y0 = udTop(F.x, F.z, 16) + 0.15, top = 94;
for (var i = 0; i < 24; i++) {
var a = i / 24 * Math.PI * 2, x = F.x + Math.cos(a) * 17, z = F.z + Math.sin(a) * 17, r = wMesh(new THREE.DodecahedronGeometry(1.5 + (i % 3) * 0.5, 0), rock, x, udHeight(x, z) + 0.5, z, S);
r.scale.y = 0.7;
r.rotation.y = i;
UD.solids.push({ x: x, z: z, r: 1.3 + (i % 3) * 0.5 });
}
var pool = wMesh(new THREE.CircleGeometry(16.6, 32), new THREE.MeshPhongMaterial({ color: 0x0E3A5A, shininess: 110, specular: 0x6AA8D8, emissive: 0x061A2A }), F.x, y0, F.z, S);
pool.rotation.x = -Math.PI / 2;
var crack = wMesh(new THREE.DodecahedronGeometry(8, 1), rock, F.x, top + 3, F.z, S);
crack.scale.y = 0.5;
var bx = F.x - 24, bz = F.z + 8;
wBox(3, 0.5, 1, udRock(0x5A5450), bx, udHeight(bx, bz) + 0.45, bz, S);
UD.solids.push({ x: bx, z: bz, hw: 1.5, hd: 0.5, rot: 0 });
var sg = wSign(["The Long Fall", "Rain from the world above, a hundred years on its way"], 4, 1.2, "#2A2620", "#B8E0F0");
sg.position.set(F.x - 22, udHeight(F.x - 22, F.z - 6) + 2, F.z - 6);
sg.rotation.y = Math.PI / 2;
S.add(sg);
wBox(0.12, 1.3, 0.12, wM(0x3A3040), F.x - 22.06, udHeight(F.x - 22, F.z - 6) + 0.65, F.z - 6, S);
landBake(G, S);
UD.solids.push({ x: F.x, z: F.z, r: 17.6 });
var tex = wTex(64, 256, function (x, W, H) { x.clearRect(0, 0, W, H); for (var k = 0; k < 26; k++) {
x.fillStyle = "rgba(220,240,255," + (0.25 + (k % 4) * 0.15) + ")";
x.fillRect((k * 13) % W, (k * 47) % H, 2 + (k % 3) * 2, 40 + (k % 5) * 18);
} }, [3, 6]);
var col = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 4.2, top - y0, 16, 1, true), new THREE.MeshBasicMaterial({ map: tex, color: 0xBFE6FF, transparent: true, opacity: 0.7, depthWrite: false, side: THREE.DoubleSide }));
col.position.set(F.x, (top + y0) / 2, F.z);
G.add(col);
UD.fallTex = tex;
var spray = wGlow(0xCFEFFF, 16, 0.3);
spray.material.blending = THREE.NormalBlending;
spray.position.set(F.x, y0 + 2.5, F.z);
G.add(spray);
var mist = wPoints(160, function () { var a = Math.random() * 6.283, r = 2 + Math.random() * 12; return [F.x + Math.cos(a) * r, y0 + Math.random() * 10, F.z + Math.sin(a) * r]; }, 0xD8F0FF, 0.25, true);
G.add(mist);
UD.fallMist = mist;
UD.fallY = y0;
udPut(G, "ud_warden", { sex: "f", look: UD_ELF(0x2A4A6A, 1, 2) }, F.x - 21, F.z + 4, { name: "Vessa, warden of the Long Fall", persona: "You are Vessa, a dark elf of Zhaelvorn and warden of the Long Fall, a waterfall that drops from a crack in the cavern roof into a round pool" + UD_SETTING + " The city's drinking water comes from here, along channels cut in the floor long ago, and you keep the pool clean and the channels clear. You are calm, thoughtful and poetic about water: rain that fell on the surface a hundred years ago is only now arriving down here, so every drop is older than you are (and you are old). You may share real facts about how water moves through rock and makes caves.", greet: "Listen. You can hear it from the city, if you know how. This water fell as rain on your world before your grandparents were born; it has been finding its way down ever since. Sit, if you like. Everyone sits." }, null, Math.PI / 2);
udFact(G, F.x - 20, F.z + 16, "Waterfalls under the ground", ["Ruby Falls, inside Lookout Mountain in Tennessee, USA, is a real waterfall in a cave more than 300 m underground. It drops about 44 m into a pool.", "It was found in 1928 by Leo Lambert, who named it after his wife, Ruby.", "Rain that falls on limestone hills can take years, even centuries, to trickle down through the cracks into a cave below."], Math.PI / 2);
},
function (G) {
var C = UD_SPOTS.grotto, S = new THREE.Group(), R = wRand(7701);
var cols = [0xB890FF, 0x7AD8E8, 0xE8E0FF, 0x90F0C0], mats = cols.map(function (c) { return wM(c, { e: c, ei: 0.35 }); }), glows = [];
function crystal(x, z, r, h, m, tx, tz) {
var y = udHeight(x, z), g = new THREE.Group();
g.position.set(x, y - 0.5, z);
g.rotation.set(tx, R() * 1, tz);
S.add(g);
wCyl(r, r * 1.05, h, mats[m], 0, h / 2, 0, g, 6);
wCone(r, h * 0.3, mats[m], 0, h + h * 0.15, 0, g, 6);
UD.solids.push({ x: x, z: z, r: r + 0.2 });
return g;
}
[[0, 0, 2.4, 18, 0, 0, 0], [2.6, 1, 1.6, 13, 1, 0.12, -0.2], [-2.4, 1.4, 1.5, 12, 2, -0.15, 0.18], [0.6, -2.8, 1.4, 11, 3, 0.2, 0.1]].forEach(function (q) { crystal(C.x + q[0], C.z + q[1], q[2], q[3], q[4], q[5], q[6]); });
for (var i = 0; i < 18; i++) {
var a = i / 18 * Math.PI * 2;
if (Math.cos(a) < -0.8)
continue;
var d = 12 + R() * 12, x = C.x + Math.cos(a) * d, z = C.z + Math.sin(a) * d, r = 0.5 + R() * 1.2;
crystal(x, z, r, 3 + R() * 9, i % 4, (R() - 0.5) * 0.6, (R() - 0.5) * 0.6);
if (i % 3 === 0)
glows.push([x, udHeight(x, z) + 4, z, cols[i % 4]]);
}
for (var k = 0; k < 40; k++) {
var ka = R() * 6.283, kd = 5 + R() * 24, kx = C.x + Math.cos(ka) * kd, kz = C.z + Math.sin(ka) * kd;
var sh = wMesh(new THREE.OctahedronGeometry(0.25 + R() * 0.3, 0), mats[k % 4], kx, udHeight(kx, kz) + 0.15, kz, S);
sh.scale.y = 1.8;
sh.rotation.z = R();
}
var sg = wSign(["The Shardlight Grotto", "Nobody cuts here. Look, and leave them be."], 4, 1.2, "#2A2620", "#E0D0FF");
var sx = C.x - 28, sz = C.z + 4, sy = udHeight(sx, sz);
sg.position.set(sx, sy + 2, sz);
sg.rotation.y = -Math.PI / 2;
S.add(sg);
wBox(0.12, 1.3, 0.12, wM(0x3A3040), sx + 0.06, sy + 0.65, sz, S);
landBake(G, S);
glows.push([C.x, udHeight(C.x, C.z) + 12, C.z, 0xC8A8FF]);
glows.forEach(function (q) { var gl = wGlow(q[3], q === glows[glows.length - 1] ? 18 : 8, 0.35); gl.position.set(q[0], q[1], q[2]); G.add(gl); });
udPut(G, "ud_prospector", { sex: "m", look: UD_GNOME(0x4A4A6A), scale: 0.62 }, C.x - 16, C.z - 3, { name: "Quill Gemwhistle, a prospector of Glimmerdeep", persona: "You are Quill Gemwhistle, a deep gnome prospector from Glimmerdeep who found the Shardlight Grotto as a young gnome and persuaded the town that nobody should ever cut a crystal here" + UD_SETTING + " You are excitable, kind and full of wonder; you come to sketch the crystals and measure how slowly they grow. You love real mineral facts (how crystals grow from mineral-rich water, why gypsum is soft, the Mohs scale, the Cave of the Crystals at Naica in Mexico).", greet: "Shh, shh! Not for the crystals; they don't mind. For me: I'm counting. That one's grown a hair's breadth since spring. Isn't she lovely? We don't cut here. Nobody cuts here." }, null, -Math.PI / 2);
udFact(G, C.x - 24, C.z + 12, "Giant crystals", ["In 2000, miners at Naica in Mexico broke into the Cave of the Crystals, about 300 m underground. Its crystals of gypsum are up to about 12 m long: the biggest known.", "They grew over hundreds of thousands of years in hot water full of dissolved minerals. The cave is about 50°C and very damp; explorers could stay inside for only minutes, in suits packed with ice."], -Math.PI / 2);
},
function (G) {
var r = UD_SPOTS.rift, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, W = r.x1 - r.x0, D = r.z1 - r.z0, hy = udHeight(cx, cz), S = new THREE.Group(), R = wRand(5150);
G.children.forEach(function (m) {
if (!m.isMesh || !m.geometry || !m.geometry.parameters || m.geometry.parameters.width !== (UD.R + 140) * 2 || !m.geometry.index)
return;
var pos = m.geometry.attributes.position, idx = m.geometry.index.array, out = [], ox = m.position.x, oz = m.position.z;
for (var t = 0; t < idx.length; t += 3) {
var x = 0, z = 0;
for (var q = 0; q < 3; q++) {
x += pos.getX(idx[t + q]);
z += pos.getZ(idx[t + q]);
}
x = x / 3 + ox;
z = z / 3 + oz;
if (!(x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1))
out.push(idx[t], idx[t + 1], idx[t + 2]);
}
m.geometry.setIndex(out);
});
var walls = udPassage(new THREE.BoxGeometry(W, 110, D, 10, 4, 1), 0x2A2622, [2]);
walls.position.set(cx, hy - 54.4, cz);
G.add(walls);
var deep = wPoints(320, function () { return [r.x0 + Math.random() * W, hy - 100 + Math.random() * 30, r.z0 + Math.random() * D]; }, 0x5AD8C8, 0.5, true);
G.add(deep);
var rk = udRock(0x4A443E);
for (var x = r.x0 + 3; x < r.x1; x += 5) {
if (Math.abs(x) < 5)
continue;
[r.z0 - 1.2, r.z1 + 1.2].forEach(function (z) { var s = 0.6 + R() * 0.9, b = wMesh(new THREE.DodecahedronGeometry(s, 0), rk, x + (R() - 0.5) * 2, udHeight(x, z) + s * 0.3, z + (z < cz ? -R() : R()), S); b.rotation.y = R() * 3; });
}
var deck = wM(0x3A3448, { e: 0x1A1430, ei: 0.5 }), post = udRock(0x5A5450), bl = D + 8;
wBox(3.2, 0.4, bl, deck, 0, hy - 0.15, cz, S);
for (var p = 0; p < 9; p++)
wBox(3.3, 0.08, 0.3, wM(0x5A4A6A), 0, hy + 0.07, cz - bl / 2 + 0.5 + p * (bl - 1) / 8, S);
[[-1.8, r.z0 - 4], [1.8, r.z0 - 4], [-1.8, r.z1 + 4], [1.8, r.z1 + 4]].forEach(function (q) { wBox(0.5, 2.4, 0.5, post, q[0], udHeight(q[0], q[1]) + 1.2, q[1], S); wSph(0.22, wB(0xC890F0, { fog: false }), q[0], udHeight(q[0], q[1]) + 2.55, q[1], S, 8); UD.solids.push({ x: q[0], z: q[1], r: 0.35 }); });
var web = new THREE.LineBasicMaterial({ color: 0xD8D0F0, transparent: true, opacity: 0.7 });
[-1.8, 1.8].forEach(function (sx) {
[2.2, 1.3].forEach(function (hh) { var pts = []; for (var u = 0; u <= 16; u++) {
var t = u / 16, z = r.z0 - 4 + (D + 8) * t;
pts.push(new THREE.Vector3(sx, hy + hh - Math.sin(t * Math.PI) * 0.6, z));
} G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), web)); });
for (var v = 0; v <= 8; v++) {
var z2 = r.z0 - 4 + (D + 8) * v / 8;
G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sx, hy + 0.05, z2), new THREE.Vector3(sx, hy + 2.2 - Math.sin(v / 8 * Math.PI) * 0.6, z2)]), web));
}
});
var sg = wSign(["The Weavers' Bridge", "Spun by the web-weavers of Zhaelvorn", "One at a time, and hold on"], 3.6, 1.3, "#1A1622", "#C8B0FF");
sg.position.set(-3.6, udHeight(-3.6, r.z1 + 5) + 1.9, r.z1 + 5);
S.add(sg);
wBox(0.12, 1.3, 0.12, post, -3.6, udHeight(-3.6, r.z1 + 5) + 0.65, r.z1 + 4.94, S);
landBake(G, S);
udPut(G, "ud_bridgekeeper", { sex: "m", look: { top: 0x2A2A34, topKind: "shirt", bottom: 0x1A1A22, skin: 0x3E3A52, hair: 0xEDEAF4, hairStyle: "long", hat: "none", layer: "armor", layerColor: 0x2A2438 } }, 4, r.z1 + 6, { name: "Thessir, keeper of the Weavers' Bridge", persona: "You are Thessir, a dark elf of Zhaelvorn who keeps the Weavers' Bridge over the Riven Deep, a chasm across the south of the great cavern" + UD_SETTING + " The story you tell: long ago a great shaking split the cavern floor, the Riven Deep opened, and the old city beyond it, Old Ylmarr, was cut off and emptied. Generations later the web-weavers of Zhaelvorn spun this bridge of silk and stone. Nobody has found the bottom of the Deep; a lantern dropped from the bridge glows for a long time before it vanishes. You are steady, patient and a little dry, and you see everyone safely across.", greet: "One at a time, and hold the silk; it holds better than it looks. Going over to Old Ylmarr? Ithren is there, reading the stones. Don't drop anything. Nothing comes back up." }, null, Math.PI);
},
function (G) {
var C = UD_SPOTS.ruins, S = new THREE.Group(), st = udRock(0x6A6460), dk = wB(0x0E0C0C), R = wRand(3303), y0 = udTop(C.x, C.z, 12) + 0.06;
var mos = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#3A3640";
x.fillRect(0, 0, W, H);
var cs = ["#6A5A8A", "#4A7A8A", "#8A7A5A", "#5A4A6A", "#7A8AA8"];
for (var ring = 1; ring < 8; ring++) {
var n = ring * 10;
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2, rr = ring * 15;
x.fillStyle = cs[(ring + k) % 5];
x.fillRect(W / 2 + Math.cos(a) * rr - 4, H / 2 + Math.sin(a) * rr - 4, 8, 8);
}
}
x.strokeStyle = "#1A1618";
x.lineWidth = 3;
x.beginPath();
x.moveTo(40, 20);
x.lineTo(110, 120);
x.lineTo(90, 200);
x.moveTo(110, 120);
x.lineTo(220, 150);
x.stroke();
});
var fl = wMesh(new THREE.CircleGeometry(12, 40), new THREE.MeshLambertMaterial({ map: mos }), C.x, y0, C.z, S);
fl.rotation.x = -Math.PI / 2;
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, x = C.x + Math.cos(a) * 16, z = C.z + Math.sin(a) * 16, y = udHeight(x, z), h = [9, 3, 6, 2, 8, 4, 9, 1.5, 5, 7, 2.5, 6][i];
wCyl(0.8, 0.9, h, st, x, y + h / 2, z, S, 10);
if (h > 7) {
wBox(2.2, 0.6, 2.2, st, x, y + h + 0.3, z, S);
}
if (h < 4) {
var fx = x + Math.cos(a + 1.2) * 4, fz = z + Math.sin(a + 1.2) * 4, dr = wCyl(0.8, 0.8, 2.2, st, fx, udHeight(fx, fz) + 0.8, fz, S, 10);
dr.rotation.z = Math.PI / 2;
dr.rotation.y = a;
UD.solids.push({ x: fx, z: fz, r: 1.2 });
}
UD.solids.push({ x: x, z: z, r: 1 });
}
var gz = C.z + 30;
[-5, 5].forEach(function (s) { wBox(2, 11, 2, st, C.x + s, udHeight(C.x + s, gz) + 5.5, gz, S); UD.solids.push({ x: C.x + s, z: gz, r: 1.4 }); });
var arch = wMesh(new THREE.TorusGeometry(5, 0.8, 6, 16, Math.PI * 0.72), st, C.x, udHeight(C.x, gz) + 11, gz, S);
[[-26, -8, 9, 0.3], [-22, -24, 7, 1.2], [24, -14, 10, -0.4], [20, 12, 6, 0.9], [-30, 10, 5, 0.1], [6, -34, 12, 0]].forEach(function (q) { var x = C.x + q[0], z = C.z + q[1], h = 1 + R() * 2.5; var w = wBox(q[2], h, 0.9, st, x, udHeight(x, z) + h / 2, z, S); w.rotation.y = q[3]; UD.solids.push({ x: x, z: z, hw: q[2] / 2, hd: 0.45, rot: q[3] }); });
var hx = C.x + 22, hz = C.z + 6, hy = udHeight(hx, hz);
var head = wSph(3.2, st, hx, hy + 1.2, hz, S, 12);
head.scale.set(1, 1.2, 0.9);
[-1, 1].forEach(function (s) { var e = wSph(0.55, dk, hx - 2.6, hy + 2, hz + s * 1.1, S, 8); e.scale.x = 0.4; });
wBox(1.4, 1.1, 0.6, st, hx - 2.8, hy + 1.2, hz, S);
wBox(0.3, 0.25, 1.6, dk, hx - 2.7, hy + 0.3, hz, S);
UD.solids.push({ x: hx, z: hz, r: 3.3 });
var sx = C.x - 8, sz = C.z - 20, sy = udHeight(sx, sz);
wBox(2.4, 4.2, 0.8, st, sx, sy + 2.1, sz, S);
var rt = wTex(128, 224, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "rgba(190,160,255,0.95)";
x.lineWidth = 4;
x.beginPath();
x.arc(W / 2, 44, 26, 0, Math.PI * 2);
x.stroke();
for (var r2 = 0; r2 < 8; r2++) {
var a2 = r2 / 8 * Math.PI * 2;
x.beginPath();
x.moveTo(W / 2 + Math.cos(a2) * 30, 44 + Math.sin(a2) * 30);
x.lineTo(W / 2 + Math.cos(a2) * 42, 44 + Math.sin(a2) * 42);
x.stroke();
}
for (var l = 0; l < 5; l++) {
x.beginPath();
x.moveTo(22, 100 + l * 24);
x.lineTo(W - 22, 100 + l * 24 + (l % 2 ? 8 : -8));
x.stroke();
}
});
var rf = wMesh(new THREE.PlaneGeometry(2, 3.6), new THREE.MeshBasicMaterial({ map: rt, transparent: true }), sx, sy + 2.2, sz + 0.42, S);
UD.solids.push({ x: sx, z: sz, hw: 1.2, hd: 0.4 });
var sg = wSign(["Old Ylmarr", "The city before the city"], 3.2, 1, "#1A1622", "#C8B0FF");
sg.position.set(C.x + 8, udHeight(C.x + 8, C.z + 34) + 1.9, C.z + 34);
S.add(sg);
wBox(0.12, 1.3, 0.12, st, C.x + 8, udHeight(C.x + 8, C.z + 34) + 0.65, C.z + 33.94, S);
landBake(G, S);
var gl = wGlow(0xB890FF, 6, 0.3);
gl.position.set(sx, sy + 3, sz + 0.6);
G.add(gl);
udPut(G, "ud_ruinreader", { sex: "f", look: UD_ELF(0x4A3A5A, 1, 0) }, C.x - 6, C.z - 16, { name: "Ithren, a ruin-reader of Zhaelvorn", persona: "You are Ithren, a scholar of Zhaelvorn who studies the ruins of Old Ylmarr, beyond the Riven Deep" + UD_SETTING + " Old Ylmarr was built by a people older than Zhaelvorn's founders, who left carvings and no names; when the Riven Deep opened in a great shaking, the city emptied, and nobody came back until the web-weavers spun their bridge. You are reading the carvings slowly: a ring with rays, which you think may be a sun, so perhaps the builders came down from the world above. You are gentle, curious and excited by every small discovery, and you love real archaeology (how ruins are dated, how scholars read lost scripts, real underground cities like Derinkuyu in Turkey).", greet: "Oh! Careful, that's a doorstep, or it was. Come and look at this stone: a ring, with rays. I think it's a sun. Do you know what that means? The people who built this city had seen the sky." }, null, Math.PI);
udFact(G, C.x + 10, C.z - 26, "Cities under the ground", ["Derinkuyu, in Cappadocia in Turkey, is a real underground city, carved out of soft volcanic rock and going down about 85 m, with room for thousands of people, their animals and their food.", "Its passages could be closed with great rolling stone doors. It was found again in 1963, when a man knocked through a wall in his house and found a tunnel behind it."], Math.PI);
},
function (G) {
var M = UD_SPOTS.market, S = new THREE.Group(), wood = wM(0x4A3A2E), post = wM(0x2A2430), stone = udRock(0x6A6460), lampM = wB(0xFFD890, { fog: false }), glows = [], spots = [];
var cloth = [0x5A2A7A, 0x2A4A7A, 0x3A6A5A, 0x6A2A4A, 0x7A5A2A, 0x2A6A6A], goods = [[0xC8A060, 0xE8D8B0, 0x8A6A3A], [0xC890F0, 0x8FD8F0, 0x90F0B0], [0xE8E0D0, 0xB8B0A0, 0xD8C8A8], [0x8AC85A, 0xC85A8A, 0xE8C040]];
for (var i = 0, n = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2 + 0.15;
if (Math.abs(Math.sin(a)) > 0.8)
continue;
var x = M.x + Math.cos(a) * 16, z = M.z + Math.sin(a) * 16, y = udHeight(x, z), ry = Math.atan2(-Math.cos(a), -Math.sin(a)), st = new THREE.Group();
st.position.set(x, y, z);
st.rotation.y = ry;
S.add(st);
wBox(3, 1, 1.4, wood, 0, 0.5, 0, st);
[-1, 1].forEach(function (s) { wCyl(0.07, 0.07, 2.7, post, s * 1.45, 1.35, -0.6, st, 5); wCyl(0.07, 0.07, 2.3, post, s * 1.45, 1.15, 0.6, st, 5); });
var aw = wBox(3.4, 0.08, 1.9, wM(cloth[n % 6], { e: 0x1A0A2A, ei: 0.3 }), 0, 2.5, 0, st);
aw.rotation.x = 0.2;
var gd = goods[n % 4];
for (var k = 0; k < 6; k++) {
if (n % 2)
wBox(0.3, 0.3, 0.3, wM(gd[k % 3]), -1.15 + k * 0.46, 1.15, 0.15, st);
else
wSph(0.15, wM(gd[k % 3]), -1.15 + k * 0.46, 1.15, 0.15, st, 6);
}
wCyl(0.12, 0.14, 0.3, lampM, 1.2, 2.15, 0.7, st, 8);
var lp = udLW(x, z, ry, 1.2, 0.7);
glows.push([lp.x, y + 2.15, lp.z]);
UD.solids.push({ x: x, z: z, r: 1.8 });
spots.push({ a: a, x: M.x + Math.cos(a) * 13.4, z: M.z + Math.sin(a) * 13.4, ry: ry });
n++;
}
var hy = udHeight(M.x, M.z);
wCyl(0.8, 1.1, 4.2, stone, M.x, hy + 2, M.z, S, 6);
wCone(0.8, 0.9, stone, M.x, hy + 4.55, M.z, S, 6);
[["Up: the long stair", "and the mine"], ["East: the Long Fall", "and Glimmerdeep"], ["Down: Zhaelvorn", "City of Spires"], ["West: the Fungus Forest", "and the Darklake"]].forEach(function (t, k) { var an = k * Math.PI / 2, pl = wSign(t, 1.5, 0.6, "#2A2620", "#FFE8B0"); pl.position.set(M.x + Math.sin(an) * 1.02, hy + 2.6, M.z + Math.cos(an) * 1.02); pl.rotation.y = an; S.add(pl); });
UD.solids.push({ x: M.x, z: M.z, r: 1.3 });
var sg = wSign(["The Halfway Market", "Half way down; half way home", "Fair trade, no shouting"], 4.4, 1.5, "#2A2620", "#FFE8B0");
var sx = M.x + 5, sz = M.z + 24, sy = udHeight(sx, sz);
sg.position.set(sx, sy + 2, sz);
S.add(sg);
wBox(0.12, 1.3, 0.12, post, sx, sy + 0.65, sz - 0.06, S);
UD.solids.push({ x: sx, z: sz, r: 0.2 });
landBake(G, S);
glows.forEach(function (q) { var gl = wGlow(0xFFD890, 3, 0.5); gl.position.set(q[0], q[1], q[2]); G.add(gl); });
var o = spots[0], e = spots[3];
udPut(G, "ud_saltpocket", { sex: "m", look: UD_GNOME(0x8A5A2A), scale: 0.62 }, o.x, o.z, { name: "Orrin Saltpocket, a trader", persona: "You are Orrin Saltpocket, a deep gnome trader from Glimmerdeep who keeps a stall at the Halfway Market, the meeting place on the road between the long stair and Zhaelvorn" + UD_SETTING + " You go up to the mine's end to trade with surface folk and down again to sell: salt, candles, dried apples, woollen socks, and wonders from above such as a bottle of rain or a pressed daisy. You buy mushrooms, silk and crystal offcuts. You are cheery, chatty and a fond, fair haggler; you love hearing what the sky looks like today.", greet: "Salt! Candles! Socks for cold toes! Ah, you've come down from up top: what's the sky doing? Tell me and I'll knock a copper off anything on the stall." }, null, o.ry);
udPut(G, "ud_ysra", { sex: "f", look: UD_ELF(0x2A3A5A, 1, 1) }, e.x, e.z, { name: "Ysra, a mapmaker of Zhaelvorn", persona: "You are Ysra, a dark elf mapmaker of Zhaelvorn who sells maps of the tunnels and caverns, drawn on spider-silk paper, at the Halfway Market" + UD_SETTING + " You are precise, dry-humoured and quietly proud: your maps mark the Darklake, the Fungus Forest, the Long Fall, the Riven Deep and the road to Glimmerdeep, and you warn that any map of the deep is only true until the rock decides otherwise. Give clear directions when asked.", greet: "A map? Every traveller thinks they don't need one until the third wrong turn. This one is new: it shows the landing on the Darklake. Look, but don't smudge the ink." }, null, e.ry);
for (var c = 0; c < 5; c++) {
var ca = c * 1.26 + 0.4, cx = M.x + Math.cos(ca) * 7, cz = M.z + Math.sin(ca) * 7;
udPut(G, "ud_mkt_" + c, c % 2 ? { sex: "m", look: UD_GNOME([0x5A6A4A, 0x6A4A5A, 0x4A4A6A][c % 3]), scale: 0.62 } : { sex: c % 4 ? "m" : "f", look: UD_ELF([0x3A2A5A, 0x2A3A5A, 0x4A2A4A][c % 3], c % 4 ? 0 : 1, c) }, cx, cz, null, { r: 8, sp: 0.8 }, ca);
}
udFact(G, M.x - 6, M.z + 25, "Towns under the ground", ["Under Montreal in Canada runs a real 'underground city': more than 30 km of tunnels linking shops, stations, offices and homes, so people can cross town in winter without going out in the snow.", "In Coober Pedy, an opal-mining town in the hot Australian desert, many people live in 'dugouts' cut into the hillsides, where it stays cool all year round.", "Under the ground the temperature hardly changes between day and night, or summer and winter."]);
},
function (G) {
var J = UD_JETTY, S = new THREE.Group(), wood = wM(0x4A3A2A), dk = wM(0x2E241C), net = wM(0x3A4A4A), len = J.z1 - J.z0, mz = (J.z0 + J.z1) / 2;
wBox(J.w * 2, 0.3, len, wood, J.x, J.y - 0.15, mz, S);
for (var p = 0; p <= len; p += 5) {
[-1, 1].forEach(function (s) { wCyl(0.16, 0.16, 6, dk, J.x + s * (J.w + 0.05), J.y - 2.9, J.z0 + p, S, 6); });
}
[-1, 1].forEach(function (s) { wBox(0.12, 0.12, len, dk, J.x + s * (J.w - 0.1), J.y + 0.9, mz, S); UD.solids.push({ x: J.x + s * (J.w - 0.1), z: mz + 1, hw: 0.08, hd: len / 2 - 1 }); });
for (var r = 0; r <= len; r += 4) {
[-1, 1].forEach(function (s) { wBox(0.12, 0.9, 0.12, dk, J.x + s * (J.w - 0.1), J.y + 0.45, J.z0 + r, S); });
}
wCyl(0.1, 0.1, 2.6, dk, J.x + 1.3, J.y + 1.3, J.z1 - 0.4, S, 6);
wCyl(0.16, 0.18, 0.32, wB(0x8FE8D8, { fog: false }), J.x + 1.3, J.y + 2.75, J.z1 - 0.4, S, 8);
var bx = J.x - 12, bz = J.z0 - 8, by = udTop(bx, bz, 4);
wBox(6, 3, 5, wood, bx, by + 1.3, bz, S);
var rf = wBox(6.8, 0.25, 5.8, dk, bx, by + 3, bz, S);
rf.rotation.x = 0.08;
wBox(1.4, 2, 0.08, wB(0x140E0A), bx, by + 1, bz + 2.52, S);
UD.solids.push({ x: bx, z: bz, hw: 3, hd: 2.5 });
[[J.x + 9, J.z0 - 5], [J.x + 13, J.z0 - 7]].forEach(function (q) { var y = udHeight(q[0], q[1]); [-1.6, 1.6].forEach(function (s) { wCyl(0.08, 0.08, 2.2, dk, q[0] + s, y + 1.1, q[1], S, 5); }); wBox(3.4, 0.08, 0.08, dk, q[0], y + 2.15, q[1], S); wBox(3, 1.6, 0.04, net, q[0], y + 1.3, q[1], S); UD.solids.push({ x: q[0], z: q[1], hw: 1.7, hd: 0.2 }); });
var rod = wCyl(0.03, 0.04, 3.4, wM(0x8A6A42), J.x + 0.6, J.y + 1.9, J.z1 + 0.6, S, 5);
rod.rotation.x = 1.0;
var sg = wSign(["Stillwater Landing", "Lake fishers of the Darklake", "Boats for the island shrine by asking"], 4.4, 1.5, "#1A2226", "#B8F0E8");
var sx = J.x + 5, sz = J.z0 - 2, sy = udHeight(sx, sz);
sg.position.set(sx, sy + 2, sz);
sg.rotation.y = Math.PI / 2;
S.add(sg);
wBox(0.12, 1.3, 0.12, dk, sx - 0.06, sy + 0.65, sz, S);
UD.solids.push({ x: sx, z: sz, r: 0.2 });
landBake(G, S);
var gl = wGlow(0x8FE8D8, 4, 0.55);
gl.position.set(J.x + 1.3, J.y + 2.75, J.z1 - 0.4);
G.add(gl);
UD.skiffs = [];
[[-3.4, -958], [3.4, -955], [-3.4, -950]].forEach(function (q, i) { var b = new THREE.Group(), h = wMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM([0x3A2A1E, 0x2A3A3A, 0x4A3A2A][i]), 0, 0.4, 0, b); h.scale.set(0.9, 0.45, 2.4); wBox(1.4, 0.08, 0.4, wood, 0, 0.42, 0.3, b); b.position.set(J.x + q[0], UD_LAKE_Y, q[1]); b.userData.ph = i * 1.7; G.add(b); UD.skiffs.push(b); });
var f = udPut(G, "ud_caelith", { sex: "m", look: UD_ELF(0x2A4A4A, 0, 2) }, J.x + 0.4, J.z1 - 1.2, { name: "Caelith, a lake fisher", persona: "You are Caelith, a dark elf who fishes the Darklake from Stillwater Landing, a jetty on its south shore" + UD_SETTING + " You catch pale, eyeless lake fish with silk lines, and you know every mood of the black water: the drifting points of light on it are tiny glowing creatures that brighten when the water is stirred. You row pilgrims out to the little shrine on the island in the lake. You are patient, soft-spoken and dryly funny, and you like to talk in the pauses between bites.", greet: "Shh. Gently on the boards; the fish can hear you walking. There. Nothing. There is never anything for the first hour. Sit, if you like, and watch the lights on the water." }, null, 0);
f.g.position.y = J.y;
udFact(G, J.x - 6, J.z0 - 4, "Water that glows", ["In Mosquito Bay, on the island of Vieques in Puerto Rico, the water glows blue-green wherever a boat or a hand stirs it.", "The light comes from tiny living things in the water, a kind of plankton called dinoflagellates: each one flashes when it is disturbed, so a moving paddle leaves a trail of light.", "Bays like it are rare, because they need warm, calm, shallow water with a narrow mouth to the sea."]);
},
function (G) {
var F = UD_SPOTS.forge, S = new THREE.Group(), dark = udRock(0x2A2622), rock = udRock(0x4A443E), wood = wM(0x4A3A2A), iron = wM(0x3A3A3E), y0 = udHeight(F.x, F.z), hot = wB(0xFF8A3A, { fog: false });
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, r = wMesh(new THREE.DodecahedronGeometry(0.9 + (i % 3) * 0.25, 0), dark, F.x + Math.cos(a) * 3.2, y0 + 0.3, F.z + Math.sin(a) * 3.2, S);
r.rotation.y = i;
}
var ve = wMesh(new THREE.CircleGeometry(2.7, 16), hot, F.x, y0 + 0.12, F.z, S);
ve.rotation.x = -Math.PI / 2;
UD.solids.push({ x: F.x, z: F.z, r: 3.8 });
for (var l = 0; l < 4; l++) {
var la = l * Math.PI / 2 + Math.PI / 4, lx = F.x + Math.cos(la) * 4.6, lz = F.z + Math.sin(la) * 4.6;
wCyl(0.14, 0.18, 10.6, iron, lx, y0 + 5.3, lz, S, 6);
UD.solids.push({ x: lx, z: lz, r: 0.3 });
}
[Math.PI / 4, -Math.PI / 4].forEach(function (ba) { var bm = wBox(0.25, 0.25, 9.4, iron, F.x, y0 + 10.5, F.z, S); bm.rotation.y = ba; });
wCyl(0.08, 0.08, 1.2, iron, F.x, y0 + 9.9, F.z, S, 6);
var wh = new THREE.Group();
wh.position.set(F.x, y0 + 9.4, F.z);
G.add(wh);
wCyl(0.25, 0.25, 0.6, iron, 0, 0, 0, wh, 8);
for (var v = 0; v < 8; v++) {
var va = new THREE.Group();
va.rotation.y = v / 8 * Math.PI * 2;
wh.add(va);
wBox(0.08, 0.08, 3, iron, 0, 0, 1.5, va);
var bl = wBox(0.9, 0.06, 1.6, wM(0x6A5A4A), 0, 0, 2.2, va);
bl.rotation.z = 0.5;
}
var rim = wMesh(new THREE.TorusGeometry(3.05, 0.07, 4, 24), iron, 0, 0, 0, wh);
rim.rotation.x = Math.PI / 2;
UD.forgeWheel = wh;
var smiths = [];
[-Math.PI / 2 + 0.2, -0.5, 0.55].forEach(function (a, k) {
var x = F.x + Math.cos(a) * 14, z = F.z + Math.sin(a) * 14, ry = Math.atan2(-Math.cos(a), -Math.sin(a)), y = udTop(x, z, 3.5) - 0.1, sh = new THREE.Group();
sh.position.set(x, y, z);
sh.rotation.y = ry;
S.add(sh);
wBox(6.4, 0.2, 4.4, rock, 0, 0.1, 0, sh);
wBox(6.4, 3.4, 0.5, rock, 0, 1.7, -2, sh);
[-1, 1].forEach(function (s) { wBox(0.5, 3.4, 4.2, rock, s * 2.95, 1.7, 0, sh); });
var rf = wBox(7, 0.3, 5, wood, 0, 3.5, 0.1, sh);
rf.rotation.x = -0.08;
wBox(2, 1.1, 1.2, dark, -1.5, 0.55, -1.2, sh);
var mo = wMesh(new THREE.PlaneGeometry(1.2, 0.5), hot, -1.5, 0.7, -0.59, sh);
wBox(0.8, 3, 0.8, dark, -1.5, 3.6, -1.4, sh);
wBox(0.5, 0.6, 0.5, iron, 1.3, 0.3, 0.4, sh);
wBox(1, 0.3, 0.4, iron, 1.3, 0.75, 0.4, sh);
wCone(0.18, 0.5, iron, 1.3, 0.75, 0.85, sh, 4).rotation.x = Math.PI / 2;
wBox(1.4, 0.6, 0.6, wM(0x2A4A5A), 2, 0.3, -1.4, sh);
[[0, -2], [-2.95, 0], [2.95, 0]].forEach(function (q, qi) { var w = udLW(x, z, ry, q[0], q[1]); UD.solids.push({ x: w.x, z: w.z, hw: qi ? 0.25 : 3.2, hd: qi ? 2.1 : 0.25, rot: ry }); });
var hp = udLW(x, z, ry, -1.5, -1.2), ap = udLW(x, z, ry, 1.3, 0.4);
UD.solids.push({ x: hp.x, z: hp.z, hw: 1, hd: 0.6, rot: ry }, { x: ap.x, z: ap.z, r: 0.5 });
var gp = udLW(x, z, ry, -1.5, -0.4);
smiths.push({ x: gp.x, y: y + 0.8, z: gp.z });
var fp = udLW(x, z, ry, 1.3, 2.6);
smiths[k].fx = fp.x;
smiths[k].fz = fp.z;
smiths[k].ry = ry;
});
var sg = wSign(["Cinderwell Forges", "Iron worked here for Zhaelvorn and Glimmerdeep", "Mind the vent: it is always hot"], 4.6, 1.5, "#2A2220", "#FFD8A8");
var sx = F.x - 6, sz = F.z + 22, sy = udHeight(sx, sz);
sg.position.set(sx, sy + 2, sz);
S.add(sg);
wBox(0.12, 1.3, 0.12, iron, sx, sy + 0.65, sz - 0.06, S);
UD.solids.push({ x: sx, z: sz, r: 0.2 });
landBake(G, S);
var vg = wGlow(0xFF8A3A, 12, 0.45);
vg.position.set(F.x, y0 + 1.2, F.z);
G.add(vg);
smiths.forEach(function (q) { var g2 = wGlow(0xFF8A3A, 2.6, 0.5); g2.position.set(q.x, q.y, q.z); G.add(g2); });
var pl = new THREE.PointLight(0xFF8A3A, 1.0, 80, 1.4);
pl.position.set(F.x, y0 + 6, F.z);
G.add(pl);
var hz = wPoints(70, function () { var a = Math.random() * 6.283, r = Math.random() * 2.4; return [F.x + Math.cos(a) * r, y0 + Math.random() * 16, F.z + Math.sin(a) * r]; }, 0xB8A898, 0.4, true);
hz.material.opacity = 0.35;
G.add(hz);
UD.forgeAir = hz;
UD.forgeY = y0;
udPut(G, "ud_durra", { sex: "f", look: UD_GNOME(0x6A3A2A), scale: 0.62 }, smiths[0].fx, smiths[0].fz, { name: "Durra Anvilsong, a smith", persona: "You are Durra Anvilsong, a deep gnome smith who runs Cinderwell Forges, three smithies round a vent of hot rock in the great cavern" + UD_SETTING + " Over the vent turns a vaned wheel driven by the rising hot air, and it works the bellows for all three hearths, so nobody has to pump. You make picks, lamp-frames, hinges, and the fine tools Glimmerdeep's gem-cutters use. You are loud, cheerful, proud of good work, and you hum while you hammer; you explain things simply and like to show how the wheel works.", greet: "Mind the vent, love, it bites. See the wheel up there? The hot air turns it, the wheel works the bellows, the bellows wake the fires. Nobody's pumped a bellows here in three hundred years. Now: what wants mending?" }, null, smiths[0].ry);
udPut(G, "ud_kesh", { sex: "m", look: { top: 0x2A2A34, topKind: "shirt", bottom: 0x1A1A22, skin: 0x3E3A52, hair: 0xEDEAF4, hairStyle: "long", shoes: 0x1A1820, hat: "none", layer: "apron", layerColor: 0x5A4030 } }, smiths[2].fx, smiths[2].fz, { name: "Kesh, a silversmith of Zhaelvorn", persona: "You are Kesh, a dark elf silversmith of Zhaelvorn who works at Cinderwell Forges beside the deep gnomes" + UD_SETTING + " You make fine, thin things: spider-shaped brooches, silver wire for web-bridges, clasps for silk cloaks. You are exact, quiet and quietly competitive with Durra, whom you respect enormously and will never say so to her face.", greet: "Don't touch that, it's still warm. Silver wire for the bridges of Zhaelvorn: thinner than a hair and stronger than you'd think. The gnomes laugh at our little hammers. They also buy our clasps." }, null, smiths[2].ry);
udFact(G, F.x + 6, F.z + 22, "Heat from inside the Earth", ["The deeper you go into the Earth, the warmer the rock: in most places about 25 to 30°C hotter for every kilometre down.", "Iceland, which sits over hot rock, heats almost all its homes with hot water piped up from underground.", "A 'smoke jack' was a real machine: a vaned wheel in a chimney, turned by the rising hot air, that slowly turned the roasting spit. Leonardo da Vinci drew one."]);
},
function (G) {
var H = UD_SPOTS.hollow, S = new THREE.Group(), stone = udRock(0x6A6460), dark = udRock(0x3A3632), wood = wM(0x3A3040);
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2;
if (Math.cos(a) > 0.9)
continue;
var x = H.x + Math.cos(a) * 10, z = H.z + Math.sin(a) * 10, h = 2.4 + (i % 3) * 0.8, y = udHeight(x, z);
var s = wBox(0.9, h, 0.6, stone, x, y + h / 2 - 0.2, z, S);
s.rotation.y = -a;
UD.solids.push({ x: x, z: z, hw: 0.45, hd: 0.3, rot: -a });
}
var px = H.x - 14, pz = H.z, py = udHeight(px, pz);
var ps = wCyl(1.2, 1.4, 0.4, stone, px, py + 0.2, pz, S, 7);
var cx = H.x - 24, cz = H.z + 12, cy = udTop(cx, cz, 3);
var cell = wMesh(new THREE.SphereGeometry(3.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dark, cx, cy, cz, S);
cell.scale.y = 0.85;
var dr = wMesh(new THREE.CircleGeometry(0.8, 10, 0, Math.PI), wB(0x120E0A), cx + 3.16, cy, cz, S);
dr.rotation.y = Math.PI / 2;
UD.solids.push({ x: cx, z: cz, r: 3.3 });
wBox(2, 0.4, 0.6, stone, cx + 5, cy + 0.4, cz + 3, S);
UD.solids.push({ x: cx + 5, z: cz + 3, hw: 1, hd: 0.3 });
wCyl(0.08, 0.1, 2.6, wood, cx + 4.6, cy + 1.3, cz - 2.6, S, 6);
wSph(0.3, wB(0xB8C8FF, { fog: false }), cx + 4.6, cy + 2.8, cz - 2.6, S, 10);
UD.solids.push({ x: cx + 4.6, z: cz - 2.6, r: 0.2 });
var sg = wSign(["The Echoing Hollow", "Say something kind:", "it will be said back to you"], 4.2, 1.5, "#2A2620", "#D8E0FF");
var sx = H.x + 16, sz = H.z + 4, sy = udHeight(sx, sz);
sg.position.set(sx, sy + 2, sz);
sg.rotation.y = Math.PI / 2;
S.add(sg);
wBox(0.12, 1.3, 0.12, wood, sx - 0.06, sy + 0.65, sz, S);
UD.solids.push({ x: sx, z: sz, r: 0.2 });
landBake(G, S);
var gl = wGlow(0xB8C8FF, 3.4, 0.55);
gl.position.set(cx + 4.6, cy + 2.8, cz - 2.6);
G.add(gl);
UD.talkers.push({ x: px, z: pz, r: 3, name: "The speaking stone", verb: "call out", fn: function () {
if (typeof playTone === "function")
[[0, 0.5], [0.9, 0.36], [1.8, 0.26], [2.7, 0.18]].forEach(function (q) { setTimeout(function () { playTone(392, q[1]); }, q[0] * 1000); });
setStatus("<b>Hallooo!</b> ...hallooo... ...allooo... ...ooo. The wall answers you, each time a little shorter.");
} });
udPut(G, "ud_aunvar", { sex: "m", look: { top: 0x3A3A4A, topKind: "robe", bottom: 0x3A3A4A, skin: 0x4A4660, hair: 0xF4F2F8, hairStyle: "long", beard: 1, shoes: 0x1A1820, hat: "hood", hatColor: 0x2A2A3A, layer: "cloak", layerColor: 0x2A2A3A } }, cx + 5, cz + 5.2, { name: "Aunvar the Listener", persona: "You are Aunvar the Listener, a very old dark elf who left Zhaelvorn long ago to live alone in the Echoing Hollow, a ring of standing stones near the west wall of the great cavern" + UD_SETTING + " You believe the deep remembers every sound made in it, and you spend your days listening: to the drip of water, the creak of the rock, the far whine of Glimmerdeep's wheels, the echoes. You are gentle, slow-spoken, funny in an unexpected way, and you ask visitors what they have heard today. You can explain how echoes work: sound bounces back off the far wall, and the further the wall, the longer it takes.", greet: "Ah. Footsteps I don't know. Come in, come in; well, there is no in, but come. Stand on the flat stone and call out, if you like. The wall is a good listener. Better than me, some days." }, null, Math.PI / 2);
udFact(G, H.x + 12, H.z - 8, "Music from stone", ["In Luray Caverns in Virginia, USA, there is a real organ played on stalactites: when a key is pressed, a little rubber hammer taps a stalactite, and each one rings with its own note. It is called the Great Stalacpipe Organ.", "An echo is sound bouncing back from a wall. Sound travels about 343 metres a second in air, so to hear your voice come back separately, the wall needs to be at least about 17 metres away."], Math.PI / 2);
},
function (x, z, feet) {
var h = udHeight(x, z);
if (h < -900)
return true;
if (!UD.open && z < -121.4 && z > -124 && Math.abs(x) < 6)
return true;
if (udJettyAt(x, z) !== null)
return worldSolidAt(UD.solids, x, z, feet);
if (Math.hypot(x - UD_LAKE.x, z - UD_LAKE.z) < UD_LAKE.r + 24 && h < UD_LAKE_Y - 0.2)
return true;
if (x > UD_SEA_X + 2 && Math.abs(z - UD_GLIM.z) < 260 && !(Math.abs(z - UD_GLIM.z) < 1.6 && x < UD_SEA_X + 24))
return true;
if (udRiftAt(x, z))
return true;
return worldSolidAt(UD.solids, x, z, feet);
},
function (dt) {
var L = worldLocal(), t = WLD.t;
if (UD.opening > 0) {
UD.opening -= dt;
UD.door.position.y = -7.2 * (1 - Math.max(0, UD.opening) / 3.5);
UD.door.position.x = Math.sin(t * 40) * 0.03 * (UD.opening > 0 ? 1 : 0);
if (UD.opening <= 0) {
UD.open = true;
try {
localStorage.setItem("sm.ud.door", "1");
}
catch (e) { }
setStatus("<b>The wall is gone.</b> Behind it a stair, older than anything in the city, goes down into a violet dark.");
}
}
if (UD.rune)
UD.rune.material.color.setHSL(0.78, 0.45, 0.3);
UD.shrooms.forEach(function (m) { var s = 1 + Math.sin(t * 0.8 + m.userData.ph) * 0.02; m.scale.set(s, 1 / s, s); });
if (UD.spores) {
var sp = UD.spores.geometry.attributes.position;
for (var i = 0; i < sp.count; i += 3) {
var y = sp.getY(i) + dt * 0.6;
if (y > -25)
y = -60;
sp.setY(i, y);
}
sp.needsUpdate = true;
}
UD.spiders.forEach(function (S) {
S.t += dt;
S.a += dt * 0.12;
var x = S.hx + Math.cos(S.a) * 14, z = S.hz + Math.sin(S.a) * 14;
S.g.position.set(x, udHeight(x, z), z);
S.g.rotation.y = -S.a;
S.g.userData.legs.forEach(function (l, i) { l.rotation.x = Math.sin(S.t * 8 + i * 1.6) * 0.35; });
});
UD.people.forEach(function (P) { if (P.wander)
wWander(P.g, dt, function (x, z) { var h = udHeight(x, z); return h < -900 ? P.g.position.y : h; }, P.wander); });
if (UD.wheel)
UD.wheel.rotation.y += dt * 12;
if (UD.forgeWheel)
UD.forgeWheel.rotation.y += dt * 0.5;
if (UD.skiffs)
UD.skiffs.forEach(function (b) { b.position.y = UD_LAKE_Y + Math.sin(t * 0.6 + b.userData.ph) * 0.06; b.rotation.z = Math.sin(t * 0.45 + b.userData.ph) * 0.03; });
if (UD.forgeAir && Math.hypot(L.x - UD_SPOTS.forge.x, L.z - UD_SPOTS.forge.z) < 250) {
var fa = UD.forgeAir.geometry.attributes.position;
for (var ai = 0; ai < fa.count; ai++) {
var ay = fa.getY(ai) + dt * 0.7;
if (ay > UD.forgeY + 16)
ay = UD.forgeY + 0.5;
fa.setY(ai, ay);
}
fa.needsUpdate = true;
}
if (UD.sea && L.x > UD_GLIM.x)
wWaterTick(UD.sea, UD_SEA_X + 700, UD_GLIM.z, t);
if (UD.ferry) {
UD.ferry.position.y = UD_SEA_Y + Math.sin(t * 0.7) * 0.15;
UD.ferry.rotation.z = Math.sin(t * 0.5) * 0.04;
}
if (UD.fallTex)
UD.fallTex.offset.y += dt * 0.45;
if (UD.fallMist && Math.hypot(L.x - UD_SPOTS.falls.x, L.z - UD_SPOTS.falls.z) < 300) {
var fm = UD.fallMist.geometry.attributes.position;
for (var fi = 0; fi < fm.count; fi++) {
var fy = fm.getY(fi) + dt * 0.8;
if (fy > UD.fallY + 10)
fy = UD.fallY;
fm.setY(fi, fy);
}
fm.needsUpdate = true;
}
var where = (typeof udxWhere === "function" && udxWhere(L)) || (L.z > -122 ? "the Deep Workings" : L.z > -238 && Math.abs(L.x) < 8 ? "the long stair" : udNewWhere(L.x, L.z) ? udNewWhere(L.x, L.z) : Math.hypot(L.x - UD_CITY.x, L.z - UD_CITY.z) < 190 ? "Zhaelvorn, City of Spires" : Math.hypot(L.x + 260, L.z + 560) < 220 ? "the Fungus Forest" : Math.hypot(L.x - UD_LAKE.x, L.z - UD_LAKE.z) < UD_LAKE.r + 40 ? "the shore of the Darklake" : L.x > UD_SEA_X - 80 ? "the shore of the Sunless Sea" : Math.hypot(L.x - UD_GLIM.x, L.z - UD_GLIM.z) < UD_GLIM.r ? "Glimmerdeep" : L.x > 400 ? "the east road" : "the Underdark");
worldBanner("<b>Under the mine</b> · " + where);
if (where !== UD.lastWhere) {
UD.lastWhere = where;
var first = { "the Underdark": "<b>The Underdark.</b> A cavern so vast its roof is lost in the dark. Far off, spires glow violet: Zhaelvorn. To the west, a forest of mushrooms taller than trees, and the black water of the Darklake.",
"Zhaelvorn, City of Spires": "<b>Zhaelvorn, City of Spires.</b> The dark elves carved their city into the stalagmites; webs run between the towers. Be courteous: they are watching.",
"Glimmerdeep": "<b>Glimmerdeep.</b> The deep gnomes' town. Listen: the whine of the cutting wheels.",
"the shore of the Sunless Sea": "<b>The Sunless Sea.</b> Water that goes on into the dark further than anyone has charted, and a roof of glow-worms like stars.",
"the Velvetcap Terraces": "<b>The Velvetcap Terraces.</b> Mushrooms in neat stone beds, stepping up the cavern floor, lit by jars of glow-beetles. Somebody farms down here.",
"the Long Fall": "<b>The Long Fall.</b> A thread of water drops out of the dark roof, a hundred and fifty metres, into a round pool. You can hear it before you see it.",
"the Shardlight Grotto": "<b>The Shardlight Grotto.</b> Crystals taller than houses, glowing softly and steadily, violet and sea-green.",
"the edge of the Riven Deep": "<b>The Riven Deep.</b> The floor ends in a crack too deep to see the bottom of. Far off, a bridge of silk and stone goes over it.",
"the ruins of Old Ylmarr": "<b>Old Ylmarr.</b> Broken columns, a cracked mosaic, a great carved face sunk in the floor: a city older than Zhaelvorn.",
"the Halfway Market": "<b>The Halfway Market.</b> Stalls under coloured awnings, lamps lit, round a standing stone with the ways cut into it. Elves and gnomes trade here, and a few surface folk.",
"Stillwater Landing": "<b>Stillwater Landing.</b> A jetty out into the black water of the Darklake, a boathouse, nets drying. Tread softly: someone is fishing.",
"Cinderwell Forges": "<b>Cinderwell Forges.</b> Three smithies round a vent of hot rock, and over it a wheel of vanes turning slowly in the warm air.",
"the Echoing Hollow": "<b>The Echoing Hollow.</b> A ring of standing stones near the cavern's west wall. It is very quiet here; every sound comes back." };
if (first[where] && !UD.told[where]) {
UD.told[where] = 1;
setStatus(first[where]);
}
}
if (L.z > -4 && Math.abs(L.x) < 4)
return worldPrompt("<b>The cage</b> · <b>press E</b> to ride back up the shaft", function () { worldHome("<b>Back up the shaft.</b> The cage clanks up into daylight, and the miners don't ask where you've been."); });
if (!UD.open && UD.opening <= 0 && L.z < -112 && L.z > -125 && L.y > -6 && Math.abs(L.x) < 6)
return worldPrompt("<b>The end of the tunnel</b> · <b>press E</b> to examine the wall", udExamine);
var got = wPickNear(UD.talkers, L);
if (got)
return worldPrompt("<b>" + esc(got.name) + "</b> · <b>press E</b> to " + (got.verb || "talk"), got.fn ? got.fn : function () { wTalk(got.t); });
worldPrompt(null);
},
function () {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#E8D8FF'>The carved wall</div>" +
"<p style='margin:6px 0;opacity:.9'>The tunnel ends in a wall of smooth rock, and it has been carved: a ring of runes, a tall spire, a spider with its legs spread. The carving is older than the mine; older, maybe, than the city above.</p>" +
"<p style='margin:6px 0;opacity:.9'>One rune in the ring glows faintly violet. When you lay your hand on it, it is warm.</p>" +
worldBtn("press", "Press the warm rune", "") + worldBtn("leave", "Leave it be", ""), { press: function () { worldCard(null); UD.opening = 3.5; if (typeof playTone === "function") {
playTone(70, 2.5);
setTimeout(function () { playTone(55, 1.5); }, 900);
} setStatus("<b>A grinding, deep in the rock.</b> The whole wall is sinking into the floor…"); },
leave: function () { worldCard(null); } });
},
function () {
var gone = INT.root.children.filter(function (c) { return c.userData && c.userData.furn; });
gone.forEach(function (c) {
INT.root.remove(c);
var wx = INT.ox + c.position.x, wz = INT.oz + c.position.z;
if (INT.walls)
for (var i = INT.walls.length - 1; i >= 0; i--) {
var w = INT.walls[i];
if (w.h === 1.2 && Math.abs(w.x - wx) < 0.01 && Math.abs(w.z - wz) < 0.01)
INT.walls.splice(i, 1);
}
});
var g = new THREE.Group(), timber = wM(0x5A4028), rock = new THREE.MeshLambertMaterial({ color: 0x5A544C, flatShading: true }), W = INT.W, D = INT.D, H = INT.ceilH || 3.2;
var fl = wMesh(new THREE.PlaneGeometry(W - 0.1, D - 0.1), wM(0x4A443E), 0, 0.02, 0, g);
fl.rotation.x = -Math.PI / 2;
for (var k = 0; k < 3; k++) {
var z = -D / 2 + 1 + k * (D - 2) / 2;
[-1, 1].forEach(function (sd) { wBox(0.25, H, 0.25, timber, sd * (W / 2 - 0.3), H / 2, z, g); });
wBox(W - 0.4, 0.25, 0.25, timber, 0, H - 0.15, z, g);
}
[[-W / 2 + 0.9, -D / 4], [-W / 2 + 0.9, D / 6]].forEach(function (q, i) {
var c = new THREE.Group();
wBox(0.8, 0.6, 0.8, wM(0x6A5236), 0, 0.3, 0, c);
if (i)
wBox(0.7, 0.5, 0.7, wM(0x6A5236), 0.05, 0.85, 0, c);
c.position.set(q[0], 0, q[1]);
g.add(c);
INT.walls && INT.walls.push({ x: INT.ox + q[0], z: INT.oz + q[1], rot: 0, hw: 0.45, hd: 0.45, h: 1.2, level: 0 });
});
for (var r = 0; r < 5; r++) {
var rk = wMesh(new THREE.DodecahedronGeometry(0.3 + r % 2 * 0.15, 0), rock, -W / 2 + 0.6 + r * 0.35, 0.2, D / 2 - 1.6, g);
}
[-0.35, 0.35].forEach(function (x) { wBox(0.08, 0.08, D * 0.6, wM(0x3A3A3E), INT.W / 2 - 1.8 + x, 0.05, -D / 2 + 1.5 + D * 0.3, g); });
var lamp = new THREE.PointLight(0xFFC070, 0.8, 12, 1.6);
lamp.position.set(0, H - 0.6, 0);
g.add(lamp);
wCyl(0.12, 0.16, 0.3, wB(0xFFC870), 0, H - 0.6, 0, g, 8);
var sg = wSign(["The Shaft", "Miners only past this point", "(The cage goes down further than you'd think.)"], 2, 0.8, "#2A2018", "#E8D8A8");
sg.position.set(-W / 2 + 0.06, 1.7, 0);
sg.rotation.y = Math.PI / 2;
g.add(sg);
INT.root.add(g);
}
];
});
