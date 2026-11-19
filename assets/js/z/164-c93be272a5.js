/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(164, function () {
"use strict";
return [
function (x, z) {
var r = Math.hypot(x, z), a = Math.atan2(z, x);
var edge = NV_R + Math.sin(a * 3 + 1) * 70 + Math.sin(a * 7) * 35 + (wFbm(Math.cos(a) * 2 + 3, Math.sin(a) * 2 + 3, 51, 3) - 0.5) * 120;
var lg = Math.hypot(x - 560, z - 70);
if (lg < 170)
edge = Math.min(edge, r - (170 - lg) * 0.9);
var t = (edge - r) / 90;
if (t <= 0)
return Math.max(-6, t * 14);
var land = Math.min(1, t);
var hills = (wFbm(x * 0.006 + 9, z * 0.006 + 9, 77, 4) - 0.35) * 45;
var peak = Math.max(0, 1 - Math.hypot(x - 40, z + 80) / 330);
peak = peak * peak * 130;
var bluff = Math.max(0, 1 - Math.hypot(x - 150, z + 470) / 170) * 22;
var h = 1.2 + Math.max(0, hills) * land + peak + bluff * land;
if (t < 1)
h = 1.2 * t + (h - 1.2) * t * t;
[[-120, 250, 40, 8], [-60, 300, 18, 7.5], [150, -470, 60, null], [-600, -160, 40, 2.2], [-260, 140, 22, 14.2], [300, 300, 18, 7.4], [250, 500, 12, 2.0], [200, 150, 18, 9.0], [350, -100, 28, 4.6], [450, -250, 22, 10.5]].forEach(function (q) { var d = Math.hypot(x - q[0], z - q[1]); if (d < q[2]) {
var k = 1 - d / q[2];
var tgt = q[3] === null ? h : q[3];
if (q[3] !== null)
h = h + (tgt - h) * Math.min(1, k * 2);
} });
var fd = Math.hypot(x - NV_FLAM.x, z - NV_FLAM.z);
if (fd < NV_FLAM.r) {
var bw = -0.8 + Math.pow(fd / NV_FLAM.r, 2) * 2.4;
if (bw < h)
h = h + (bw - h) * Math.min(1, (1 - fd / NV_FLAM.r) * 3);
}
return h;
},
function (x, z, h) {
if (h < 0.4)
return 0x7A6A4A;
if (h < 2.6)
return 0xE8D8A8;
var n = wFbm(x * 0.03, z * 0.03, 12, 3), c = new THREE.Color(0x4A8A3A).lerp(new THREE.Color(0x6AA84A), n);
if (h > 70)
c.lerp(new THREE.Color(0x8A8478), Math.min(1, (h - 70) / 40));
if (h > 115)
c.lerp(new THREE.Color(0xF4F4F0), 0.7);
return c.getHex();
},
function (G) {
var gr = wGround(2000, 220, function (x, z) { var h = nvHeight(x, z); return [h, nvColor(x, z, h)]; });
G.add(gr);
NV.water = wWater(3200, 64, 0x2A7AA8, 0.5, { op: 0.88, shine: 80, spec: 0x99BBDD });
NV.water.position.y = 0.2;
G.add(NV.water);
var deep = wMesh(new THREE.PlaneGeometry(20000, 20000), new THREE.MeshPhongMaterial({ color: 0x2A7AA8, shininess: 80, specular: 0x99BBDD }), 0, -0.4, 0, G);
deep.rotation.x = -Math.PI / 2;
var R = wRand(1904), pts = [];
for (var i = 0; i < 2600 && pts.length < 420; i++) {
var x = (R() - 0.5) * 1500, z = (R() - 0.5) * 1500, h = nvHeight(x, z);
if (h < 3 || h > 85)
continue;
var ok = true;
[[-120, 250, 30], [-60, 300, 14], [150, -470, 70], [-600, -160, 45], [40, -80, 60], [-260, 140, 24], [300, 300, 22], [-300, 505, 26], [-298, 570, 14], [250, 500, 14], [200, 150, 20], [350, -100, 32], [450, -250, 24], [-450, 0, 44], [135, -365, 82]].forEach(function (q) { if (Math.hypot(x - q[0], z - q[1]) < q[2])
ok = false; });
if (!ok)
continue;
pts.push([x, h, z, 0.8 + R() * 0.9]);
}
var trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.35, 0.6, 8, 6), wM(0x6A4A2A), pts.length);
var leafy = typeof leafGeo === "function" && typeof leafMat === "function";
var crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(leafy ? 3 : 4, 1), wM(0x3A7A2E), pts.length);
var crown2 = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(leafy ? 2.2 : 3, 1), wM(0x4E9438), pts.length);
var spray = leafy ? new THREE.InstancedMesh(leafGeo(4.6), leafMat(0x3A7A2E), pts.length) : null, spray2 = leafy ? new THREE.InstancedMesh(leafGeo(3.4), leafMat(0x4E9438), pts.length) : null;
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
pts.forEach(function (p, i) {
var s = p[3];
m4.compose(new THREE.Vector3(p[0], p[1] + 4 * s, p[2]), q, new THREE.Vector3(s, s, s));
trunk.setMatrixAt(i, m4);
e.set(R(), R(), R());
var q2 = new THREE.Quaternion().setFromEuler(e);
m4.compose(new THREE.Vector3(p[0], p[1] + 9 * s, p[2]), q2, new THREE.Vector3(s * 1.2, s, s * 1.2));
crown.setMatrixAt(i, m4);
if (spray)
spray.setMatrixAt(i, m4);
m4.compose(new THREE.Vector3(p[0] + 1.5 * s, p[1] + 11.5 * s, p[2] - 1 * s), q2, new THREE.Vector3(s, s, s));
crown2.setMatrixAt(i, m4);
if (spray2)
spray2.setMatrixAt(i, m4);
NV.solids.push({ x: p[0], z: p[2], r: 0.6 * s });
});
G.add(trunk);
G.add(crown);
G.add(crown2);
if (spray) {
G.add(spray);
G.add(spray2);
}
for (var pa = 0; pa < 60; pa++) {
var a = pa / 60 * Math.PI * 2 + R() * 0.05, rr = NV_R - 40 + R() * 30, x2 = Math.cos(a) * rr, z2 = Math.sin(a) * rr, h2 = nvHeight(x2, z2);
if (h2 < 1.2 || h2 > 5)
continue;
nvPalm(G, x2, h2, z2, R);
}
var fl = new THREE.InstancedMesh(new THREE.SphereGeometry(0.18, 6, 4), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), 500), fc = new THREE.Color();
for (var f = 0; f < 500; f++) {
var fx = (R() - 0.5) * 1200, fz = (R() - 0.5) * 1200, fh = nvHeight(fx, fz);
if (fh < 3 || fh > 60) {
fx = -120 + (R() - 0.5) * 60;
fz = 250 + (R() - 0.5) * 60;
fh = nvHeight(fx, fz);
}
m4.makeTranslation(fx, fh + 0.2, fz);
fl.setMatrixAt(f, m4);
fl.setColorAt(f, fc.setHex([0xFF6A8A, 0xFFD24A, 0xFFFFFF, 0xB86AFF, 0xFF8A3A][f % 5]));
}
G.add(fl);
nvHangmansTree(G);
nvWendyHouse(G);
nvVillage(G);
nvLagoon(G);
nvReefs(G);
nvDecayHut(G);
nvTailors(G);
nvRiverCaves(G);
nvJohnsBoat(G);
nvLeafHouse(G);
nvFlamingoes(G);
nvRoundPond(G);
nvPudding(G);
nvJollyRoger(G);
nvCroc(G);
nvPeople(G);
var tk = new THREE.Group();
tk.add(wGlow(0xFFE89A, 0.9, 0.5));
tk.add(wGlow(0xFFFFFF, 0.28, 0.85));
G.add(tk);
NV.tink = tk;
for (var c = 0; c < 26; c++) {
var cg = new THREE.Group();
for (var k = 0; k < 5; k++)
wSph(18 + R() * 14, wM(0xFFE8F0, { e: 0xFFC8D8, ei: 0.25 }), k * 20 - 40, R() * 8, R() * 14, cg, 8);
var ca = R() * Math.PI * 2, cd = 900 + R() * 1600;
cg.position.set(Math.cos(ca) * cd, 160 + R() * 140, Math.sin(ca) * cd);
cg.scale.y = 0.45;
G.add(cg);
}
[["Mermaids' Lagoon", 500, 40], ["Kidd's Creek", -640, -110], ["The Never Wood", -150, 200], ["The Bluff", 120, -420], ["To the coral reefs", -190, 640]].forEach(function (s) { var sg = wSign([s[0]], 4, 1, "#6A4A2A", "#FFF4D8"); var h = nvHeight(s[1], s[2]); sg.position.set(s[1], h + 1.8, s[2]); sg.rotation.y = Math.atan2(-s[1], -s[2]); G.add(sg); wCyl(0.08, 0.08, 1.8, wM(0x5A3A1A), s[1], h + 0.9, s[2], G, 5); });
},
function (G, x, h, z, R) {
var g = new THREE.Group(), lean = (R() - 0.5) * 0.5;
for (var i = 0; i < 6; i++) {
var s = wCyl(0.28 - i * 0.02, 0.32 - i * 0.02, 1.6, wM(0x8A6A42), Math.sin(lean) * i * 1.3, 0.8 + i * 1.5, 0, g, 6);
s.rotation.z = -lean;
}
var top = new THREE.Vector3(Math.sin(lean) * 7.8, 9.4, 0);
for (var l = 0; l < 7; l++) {
var lf = wBox(0.6, 0.06, 4.4, wM(0x4A8A34, { ds: true }), 0, 0, 0, g);
lf.position.copy(top);
lf.rotation.y = l / 7 * Math.PI * 2;
lf.rotateX(0.5);
lf.translateZ(2);
}
g.position.set(x, h, z);
g.rotation.y = R() * 6;
G.add(g);
NV.solids.push({ x: x, z: z, r: 0.5 });
},
function (G) {
var x0 = -120, z0 = 250, h0 = nvHeight(x0, z0), g = new THREE.Group();
g.position.set(x0, h0, z0);
G.add(g);
var bark = wM(0x5A3E26), leaf = wM(0x2E6A26);
wCyl(3.2, 4.4, 16, bark, 0, 8, 0, g, 10);
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, br = wCyl(0.7, 1.1, 9, bark, Math.cos(a) * 3.6, 4.5, Math.sin(a) * 3.6, g, 7);
br.rotation.z = Math.cos(a) * 0.25;
br.rotation.x = -Math.sin(a) * 0.25;
var hole = wMesh(new THREE.CircleGeometry(0.55, 10), wB(0x140C06), Math.cos(a) * 4.6, 1.2, Math.sin(a) * 4.6, g);
hole.rotation.y = Math.PI / 2 - a;
}
for (var c = 0; c < 8; c++) {
var a2 = c / 8 * Math.PI * 2;
wSph(6 + (c % 3), leaf, Math.cos(a2) * 6, 18 + (c % 2) * 3, Math.sin(a2) * 6, g, 10);
}
wSph(8, leaf, 0, 23, 0, g, 10);
var door = wBox(1.6, 2.4, 0.3, wM(0x2A1A0E), 0, 1.2, 4.35, g);
NV.solids.push({ x: x0, z: z0, r: 4.5 });
var hg = new THREE.Group();
hg.position.set(x0, -40, z0);
G.add(hg);
NV.under = hg;
var earth = wM(0x6A4A2E), wood = wM(0x8A6238);
var room = wMesh(new THREE.SphereGeometry(14, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x7A5A38, side: THREE.BackSide }), 0, 0, 0, hg);
room.scale.y = 0.45;
wCyl(14, 14, 0.3, earth, 0, -0.15, 0, hg, 24);
wCyl(0.9, 1.1, 0.9, wood, 0, 0.45, 0, hg, 10);
wCyl(2.4, 2.4, 0.15, wood, 0, 0.95, 0, hg, 16);
wBox(3, 2.2, 1, wM(0x7A7064), 0, 1.1, -12.5, hg);
var fire = wCone(0.5, 1.1, wB(0xFF9A3A, { fog: false }), 0, 0.7, -12, hg, 6);
NV.fire = fire;
var fl = new THREE.PointLight(0xFFA040, 1.2, 30);
fl.position.set(0, 2, -10);
hg.add(fl);
wBox(6, 0.6, 3, wood, 9, 0.3, 4, hg);
wBox(6, 0.15, 3, wM(0xE8D8C0), 9, 0.68, 4, hg);
wBox(1.4, 0.5, 1, wM(0xC8A060), -9, 0.25, 6, hg);
for (var m = 0; m < 6; m++) {
var a3 = m / 6 * Math.PI * 2;
wCyl(0.25, 0.3, 0.5, wM(0xE8E0D0), Math.cos(a3) * 3.4, 0.25, Math.sin(a3) * 3.4, hg, 8);
var cap = wSph(0.55, wM(0xC83A2A), Math.cos(a3) * 3.4, 0.55, Math.sin(a3) * 3.4, hg, 10);
cap.scale.y = 0.45;
}
var hl = new THREE.PointLight(0xFFE0B0, 0.8, 30);
hl.position.set(0, 4, 0);
hg.add(hl);
var sg = wSign(["The Home Under the Ground", "The Lost Boys live here. Wipe your feet."], 5, 1.4, "#5A3A1A", "#FFF4D8");
sg.position.set(-6, 3, -11);
sg.rotation.y = 0.4;
hg.add(sg);
},
function (G) {
var x0 = -60, z0 = 300, h0 = nvHeight(x0, z0), g = new THREE.Group();
g.position.set(x0, h0, z0);
g.rotation.y = -0.6;
G.add(g);
wBox(4, 2.6, 3.4, wM(0xC8A878), 0, 1.3, 0, g);
var roof = wMesh(new THREE.ConeGeometry(3.4, 2.2, 4), wM(0x3A6A2A), 0, 3.7, 0, g);
roof.rotation.y = Math.PI / 4;
for (var i = 0; i < 14; i++) {
var lf = wSph(0.5, wM(0x4A8A34), (Math.random() - 0.5) * 4, 3 + Math.random() * 1.4, (Math.random() - 0.5) * 3, g, 6);
lf.scale.y = 0.4;
}
wBox(0.9, 1.6, 0.1, wM(0x7A3A2A), 0, 0.8, 1.72, g);
[-1, 1].forEach(function (s) { wBox(0.7, 0.6, 0.08, wM(0xFFE8A0, { e: 0x6A5020 }), s * 1.3, 1.5, 1.72, g); });
wCyl(0.32, 0.32, 0.8, wM(0x141414), 0.8, 4.7, 0, g, 12);
wCyl(0.55, 0.55, 0.06, wM(0x141414), 0.8, 4.3, 0, g, 14);
NV.smoke = [];
for (var s2 = 0; s2 < 5; s2++) {
var p = wSph(0.3, wB(0xDDDDDD, { op: 0.5 }), 0.8, 5.4 + s2 * 0.6, 0, g, 6);
NV.smoke.push(p);
}
NV.solids.push({ x: x0, z: z0, r: 2.6 });
},
function (G) {
var x0 = 150, z0 = -470, h0 = nvHeight(x0, z0), g = new THREE.Group();
g.position.set(x0, h0, z0);
G.add(g);
NV.village = g;
var bark = wM(0x8A6A48), mat = wM(0x6A5236);
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2, r = 28 + (i % 2) * 8, x = Math.cos(a) * r, z = Math.sin(a) * r;
var L = new THREE.Group();
L.position.set(x, nvHeight(x0 + x, z0 + z) - h0 - 0.2, z);
L.rotation.y = Math.PI / 2 - a;
g.add(L);
var lodge = wMesh(new THREE.SphereGeometry(4.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), bark, 0, 0, 0, L);
lodge.scale.set(1, 0.8, 1.5);
for (var b = 0; b < 5; b++) {
var zo = (b - 2) * 2.2, k = Math.sqrt(Math.max(0.05, 1 - Math.pow(zo / 6.3, 2)));
var rib = wMesh(new THREE.TorusGeometry(4.2 * k + 0.04, 0.08, 4, 18, Math.PI), mat, 0, 0, zo, L);
rib.scale.y = 0.8;
}
var dr = wMesh(new THREE.CircleGeometry(1, 12, 0, Math.PI), wB(0x1A120A), 0, 0, -6.25, L);
dr.rotation.y = Math.PI;
NV.solids.push({ x: x0 + x, z: z0 + z, r: 4.6 });
}
for (var s = 0; s < 10; s++) {
var a2 = s / 10 * Math.PI * 2;
wSph(0.4, wM(0x7A7470), Math.cos(a2) * 1.6, 0.2, Math.sin(a2) * 1.6, g, 6);
}
var fire = wCone(0.7, 1.6, wB(0xFF8A2A, { fog: false }), 0, 0.8, 0, g, 7);
NV.vfire = fire;
var fl = new THREE.PointLight(0xFF9A3A, 1, 24);
fl.position.set(0, 2, 0);
g.add(fl);
for (var lg = 0; lg < 6; lg++) {
var a3 = lg / 6 * Math.PI * 2, log = wCyl(0.25, 0.25, 3, wM(0x5A3A1E), Math.cos(a3) * 6, 0.25, Math.sin(a3) * 6, g, 6);
log.rotation.z = Math.PI / 2;
log.rotation.y = -a3 + Math.PI / 2;
}
[[14, -8], [-12, 10]].forEach(function (p) { var r = new THREE.Group(); wCyl(0.08, 0.08, 2.4, mat, -1.2, 1.2, 0, r, 5); wCyl(0.08, 0.08, 2.4, mat, 1.2, 1.2, 0, r, 5); var bar = wCyl(0.06, 0.06, 2.6, mat, 0, 2.3, 0, r, 5); bar.rotation.z = Math.PI / 2; for (var k = 0; k < 5; k++)
wBox(0.3, 0.7, 0.04, wM(0xA86A3A), -0.9 + k * 0.45, 1.8, 0, r); r.position.set(p[0], 0, p[1]); g.add(r); });
var loom = new THREE.Group();
wBox(0.1, 2, 0.1, mat, -1, 1, 0, loom);
wBox(0.1, 2, 0.1, mat, 1, 1, 0, loom);
wBox(2.1, 0.1, 0.1, mat, 0, 2, 0, loom);
wBox(1.8, 1.4, 0.03, wM(0xC84A2A), 0, 1.2, 0, loom);
loom.position.set(-6, 0, -14);
g.add(loom);
for (var c = 0; c < 3; c++) {
var cn = new THREE.Group();
var hull = wMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM(0xA8885A), 0, 0.5, 0, cn);
hull.scale.set(0.7, 0.5, 4);
cn.position.set(-150 + c * 5, 0, 90 + c * 3);
cn.rotation.y = 0.3;
g.add(cn);
}
var sg = wSign(["The Bluff", "Home of the People of the Bluff", "Tiger Lily's people. Welcome, if you come in friendship."], 5.5, 1.6, "#5A3A1A", "#FFF4D8");
sg.position.set(0, nvHeight(x0, z0 + 44) - h0 + 2, 44);
g.add(sg);
},
function (G) {
var rock = wM(0x7A7468), R = wRand(33);
[[700, 40, 9, "Marooners' Rock"], [650, 120, 5], [740, 110, 4], [610, -10, 4], [690, -40, 3.5]].forEach(function (q, i) {
var r = wMesh(new THREE.DodecahedronGeometry(q[2], 1), rock, q[0], q[2] * 0.25, q[1], G);
r.scale.y = 0.55;
NV.solids.push({ x: q[0], z: q[1], r: q[2] * 0.9 });
});
NV.mermaids = [];
[[650, 120, 3.85, 0.6, 1], [740, 110, 3.05, 2.2, 1], [610, -10, 3.05, 4, 1], [620, 60, -0.7, 0, 0], [680, 80, -0.7, 2, 0], [700, -10, -0.7, 1, 0]].forEach(function (q, i) {
var col = [0x2F8A7A, 0x3A6AB8, 0x7A4AA8, 0x2A9A6A, 0xC86A8A, 0x3A8AA8][i];
var g = wPerson("mermaid_" + i, { sex: "f", look: { top: col, topKind: "shirt", hair: [0xC8402A, 0xE8C878, 0x1A1A1A, 0x6A3A1A, 0xE8E0D0, 0x2A6A3A][i], hairStyle: "long", hat: "none" } });
g.position.set(q[0], q[2], q[1]);
g.rotation.y = q[3];
if (q[4])
g.userData.pose = "sit";
var tail = new THREE.Group(), tm = wM(col, { e: col, ei: 0.15 });
var t1 = wMesh(new THREE.CylinderGeometry(0.2, 0.1, 1.1, 10), tm, 0, 0, 0, tail);
t1.rotation.x = Math.PI / 2;
t1.position.set(0, 0.42, 0.5);
var fin = wMesh(new THREE.ConeGeometry(0.32, 0.45, 3), tm, 0, 0.38, 1.12, tail);
fin.rotation.x = Math.PI / 2;
fin.scale.set(1.4, 1, 0.25);
if (q[4]) {
g.add(tail);
}
else {
tail.position.set(0, 0.2, -0.6);
tail.rotation.x = 0.8;
g.add(tail);
}
g.userData.tail = tail;
g.userData.y0 = q[2];
g.userData.sit = !!q[4];
G.add(g);
NV.mermaids.push(g);
});
NV.talkers.push({ x: 690, z: 60, r: 28, name: "The mermaids", t: { name: "A mermaid of the lagoon", persona: "You are a mermaid of Mermaids' Lagoon in Neverland, from J. M. Barrie's Peter and Wendy. You are beautiful, vain, proud and teasing; you comb your hair on Marooners' Rock, splash strangers with your tail, and are only ever friendly to Peter Pan. You speak in short, haughty, playful sentences, and you know the secrets of the lagoon, the Never bird and the pirates.", greet: "*flicks her tail and sends a spray of water at you* Only Peter is allowed in our lagoon. What do you want, dry-legs?" } });
var nest = new THREE.Group();
var bowl = wMesh(new THREE.SphereGeometry(2.4, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM(0x7A5A3A), 0, 0.6, 0, nest);
bowl.scale.y = 0.5;
wMesh(new THREE.TorusGeometry(2.3, 0.35, 6, 18), wM(0x8A6A42), 0, 0.6, 0, nest).rotation.x = Math.PI / 2;
var bd = bird(0x5A6A8A, 6, "bird");
bd.position.set(0, 0.9, 0);
nest.add(bd);
var hat = wCyl(0.5, 0.5, 1.4, wM(0x141414), 3.2, 0.7, 0, nest, 12);
nest.position.set(560, 0.4, 170);
G.add(nest);
NV.nest = nest;
},
function (G) {
var S = new THREE.Group(), R = wRand(1911), C = NV_CAY;
var cay = wMesh(new THREE.SphereGeometry(C.r, 24, 8, 0, Math.PI * 2, 0, Math.PI / 2), wM(0xE8D8A8), C.x, -0.5, C.z, S);
cay.scale.y = 0.16;
var cm = [0xE87A6A, 0xF0A8B8, 0xF4E8D8, 0xE8A040, 0xB86AA8].map(function (c) { return new THREE.MeshLambertMaterial({ color: c, flatShading: true }); });
for (var i = 0; i < 34; i++) {
var a = R() * 6.283, d = C.r + 3 + R() * 40, x = C.x + Math.cos(a) * d, z = C.z + Math.sin(a) * d, s = 1 + R() * 2.2;
var k = wMesh(new THREE.DodecahedronGeometry(s, 0), cm[i % 5], x, -0.4, z, S);
k.scale.y = 0.45;
k.rotation.y = R() * 3;
if (i % 3 === 0) {
for (var b = 0; b < 3; b++) {
var br = wCyl(0.12, 0.2, 1.6, cm[(i + 1) % 5], x + (b - 1) * 0.5, 0.3, z + (R() - 0.5), S, 5);
br.rotation.z = (b - 1) * 0.4;
}
}
}
var cx = C.x + 3, cz = C.z - 2, cy = nvCayAt(cx, cz);
wBox(1.4, 0.8, 0.9, wM(0x6A4222), cx, cy + 0.2, cz, S);
wBox(1.45, 0.2, 0.95, wM(0xC8A040), cx, cy + 0.62, cz, S);
landBake(G, S);
nvPalm(G, C.x - 2, nvCayAt(C.x - 2, C.z + 1), C.z + 1, R);
NV.talkers.push({ x: cx, z: cz, r: 4, name: "A pirate's chest", fn: function () { worldCard(worldFacts("A sea chest", "Half-buried in the sand of a coral cay", [], ["Inside: a spyglass, a doubloon, and a note in a careful hand: \"Proper form, gentlemen. J. H.\"", "Every child's map of the Neverland, Barrie says, has \"coral reefs and rakish-looking craft in the offing\" (Peter and Wendy, chapter 1). These are those reefs.", "In the book, Peter fights Hook on Marooners' Rock in Mermaids' Lagoon and saves Tiger Lily from drowning. (There is no Skull Rock in the book: that came later, from the films.)"])); } });
var k2 = nvCraft();
k2.position.set(C.x + 70, 0, C.z + 40);
k2.rotation.y = 1.2;
G.add(k2);
NV.craft = k2;
NV.solids.push({ x: C.x + 70, z: C.z + 40, hw: 2, hd: 11, rot: 1.2 });
NV.talkers.push({ x: C.x + 70, z: C.z + 40, r: 16, name: "A rakish-looking craft", fn: function () { worldCard(worldFacts("A rakish-looking craft", "In the offing, off the coral reefs", [], ["A long, low, black schooner with her masts raked back, the kind of ship that looks fast even at anchor. Nobody on the island will say whose she is.", "\"Rakish\" is an old sailors' word for a ship built for speed, with a dashing slant to her masts; \"in the offing\" means out at sea, in sight of the shore.", "She is on Barrie's map of the Neverland, in the first chapter of Peter and Wendy, along with the coral reefs."])); } });
},
function () {
var g = new THREE.Group(), hullM = wM(0x1A1A20), deck = wM(0x8A6A42), spar = wM(0x4A3020), sail = new THREE.MeshLambertMaterial({ color: 0xC8BCA0, side: THREE.DoubleSide });
var hg = new THREE.BoxGeometry(4, 2.4, 22, 1, 2, 10), p = hg.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), k = z / 11, taper = 1 - Math.pow(Math.abs(k), 2) * (k > 0 ? 0.9 : 0.35), bottom = y < 0 ? 0.5 : 1;
p.setX(i, x * taper * bottom);
if (y > 0)
p.setY(i, y + Math.pow(Math.abs(k), 2) * 0.8);
}
hg.computeVertexNormals();
var hull = new THREE.Mesh(hg, hullM);
hull.position.y = 0.6;
g.add(hull);
wBox(3, 0.15, 12, deck, 0, 1.85, -1, g);
var bs = wCyl(0.1, 0.16, 6, spar, 0, 2.6, 13, g, 6);
bs.rotation.x = 1.3;
[[4, 15], [-4, 13]].forEach(function (m) {
var mg = new THREE.Group();
mg.position.set(0, 1.9, m[0]);
mg.rotation.x = -0.16;
g.add(mg);
wCyl(0.14, 0.2, m[1], spar, 0, m[1] / 2, 0, mg, 6);
var sh = new THREE.Shape();
sh.moveTo(0, 1.6);
sh.lineTo(0, m[1] - 1);
sh.lineTo(6.5, m[1] - 2.4);
sh.lineTo(7, 1.6);
sh.lineTo(0, 1.6);
var s = wMesh(new THREE.ShapeGeometry(sh), sail, 0, 0, -0.2, mg);
s.rotation.y = Math.PI / 2;
var bm = wCyl(0.07, 0.07, 7, spar, 0, 1.6, -3.5, mg, 5);
bm.rotation.x = Math.PI / 2;
});
var jib = new THREE.Shape();
jib.moveTo(0, 2);
jib.lineTo(0, 14);
jib.lineTo(8.5, 1.4);
jib.lineTo(0, 2);
var j = wMesh(new THREE.ShapeGeometry(jib), sail, 0, 1.9, 4.4, g);
j.rotation.y = -Math.PI / 2;
return g;
},
function (G) {
var x0 = -260, z0 = 140, ry = 0.9, h0 = nvHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, h0, z0);
S.rotation.y = ry;
var old = wM(0x7A6248), dark = wM(0x4A3A2A), moss = wM(0x5A7A3A), hole = wB(0x140C06), stone = wM(0x7A746A);
var B = new THREE.Group();
B.rotation.z = 0.06;
S.add(B);
wBox(5, 3, 0.25, old, 0, 1.5, -2, B);
wBox(0.25, 3, 4, old, -2.5, 1.5, 0, B);
wBox(0.25, 2.6, 4, old, 2.5, 1.3, 0, B);
wBox(1.7, 3, 0.25, old, -1.65, 1.5, 2, B);
wBox(1.7, 2.7, 0.25, old, 1.65, 1.35, 2, B);
wBox(1.6, 0.6, 0.25, old, 0, 2.6, 2, B);
wBox(1.6, 2.3, 0.05, hole, 0, 1.15, 1.9, B);
var door = wBox(1.1, 2, 0.1, dark, 1.3, 1.05, 2.5, B);
door.rotation.y = -1.1;
door.rotation.z = 0.12;
var r1 = wBox(5.8, 0.18, 2.9, moss, 0, 3.5, -1.1, B);
r1.rotation.x = 0.5;
var r2 = wBox(5, 0.18, 2.6, dark, -0.4, 3.2, 1.2, B);
r2.rotation.x = -0.66;
r2.rotation.z = 0.12;
wBox(1, 0.2, 0.8, hole, 0.9, 3.62, -1.1, B).rotation.x = 0.5;
wBox(0.05, 0.8, 0.9, hole, -2.64, 1.7, 0, B);
var sh = wBox(0.06, 0.9, 0.45, dark, -2.75, 1.3, 0.7, B);
sh.rotation.x = 0.5;
for (var p = 0; p < 5; p++) {
var pl = wBox(0.18, 2.4, 0.06, old, -2 + p * 1, 1.2, -2.18, B);
pl.rotation.z = (p % 2 ? 0.12 : -0.08);
}
for (var c = 0; c < 6; c++)
wBox(0.8 - c * 0.04, 0.45, 0.8 - c * 0.04, stone, 2.2 + c * 0.06, 2.6 + c * 0.45, -1.4, B);
for (var w = 0; w < 12; w++) {
var wd = wSph(0.45, moss, -2.6 + (w % 6) * 1.05, 0.25 + (w > 5 ? 2.2 : 0), (w > 5 ? -2.1 : 2.2), B, 6);
wd.scale.y = 0.6;
}
var br = wCyl(0.45, 0.5, 0.7, dark, -3.4, 0.3, 1.6, S, 8);
br.rotation.z = 1.2;
var ch = new THREE.Group();
ch.position.set(2.2, 0, 3.2);
ch.rotation.y = -0.4;
S.add(ch);
wBox(0.8, 0.08, 0.7, old, 0, 0.5, 0, ch);
wBox(0.8, 0.9, 0.08, old, 0, 0.95, -0.35, ch);
[-0.35, 0.35].forEach(function (x) { var rk = wMesh(new THREE.TorusGeometry(0.55, 0.04, 4, 10, Math.PI * 0.6), dark, x, 0.5, 0, ch); rk.rotation.y = Math.PI / 2; rk.rotation.z = Math.PI * 1.2; });
var post = wBox(0.12, 1.8, 0.12, dark, -1.2, 0.9, 5, S);
var sg = wSign(["A hut fast going to decay", "(mind the roof)"], 2.8, 1, "#5A3A1A", "#FFF4D8");
sg.position.set(-1.2, 2.1, 5.07);
S.add(sg);
landBake(G, S);
NV.solids.push({ x: x0, z: z0, r: 3.3 });
var a = nvLW(x0, z0, ry, 2.2, 3.2);
NV.solids.push({ x: a.x, z: a.z, r: 0.5 });
var at = nvLW(x0, z0, ry, 0.4, 3.6);
nvPut(G, "nv_oldlady", { sex: "f", look: { top: 0x5A4A6A, topKind: "dress", bottom: 0x4A3A5A, shoes: 0x2A1A12, hair: 0xE8E4DC, hairStyle: "short", hat: "none", layer: "cloak", layerColor: 0x6A3A3A }, scale: 0.78 }, at.x, at.z, { name: "The very small old lady", persona: "You are the very small old lady with a hooked nose who lives in a hut fast going to decay in the Never Wood. J. M. Barrie names you in Peter and Wendy, among the things on every child's map of the Neverland, and says nothing more, so your story is your own. You are tiny, quick, sharp-eyed and kind under your crossness; you have lived on the island longer than the pirates, you know every path in the Never Wood, and you are forever patching your roof, which never stays patched. You speak in short, tart, funny sentences, and you are fond of children who wipe their feet. You are not a witch and you do no magic, though you are happy to let people wonder. Keep it gentle and suitable for children.", greet: "Mind the step; it isn't there. Yes, the roof leaks, and yes, I know. Now: who let you onto this island, and have you eaten?" }, null, ry);
},
function (G) {
var x0 = 300, z0 = 300, ry = Math.atan2(-x0, -z0), h0 = nvHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, h0, z0);
S.rotation.y = ry;
var moss = wM(0x4E8A3A), wood = wM(0x7A5A3A), dk = wB(0x1A120A), win = wM(0xFFE8A0, { e: 0x6A5020 }), cloth = [0xB83A3A, 0x3A6AB8, 0xE8C83A, 0x6A3A8A, 0x3A8A5A], clothM = cloth.map(function (c) { return wM(c); });
var bank = wMesh(new THREE.SphereGeometry(6, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), moss, 0, -0.3, -4, S);
bank.scale.set(1, 0.55, 0.8);
wMesh(new THREE.CircleGeometry(0.9, 16), wM(0x8A3A2A), 0, 0.9, 0.86, S);
wSph(0.07, wM(0xE8C040), 0.55, 0.9, 0.92, S, 6);
[-1, 1].forEach(function (s) { var w = wMesh(new THREE.CircleGeometry(0.45, 12), win, s * 2.4, 1.4, -0.3, S); w.rotation.y = s * 0.45; });
wCyl(0.25, 0.3, 1.4, wM(0x8A7A6A), 1.5, 3.2, -5, S, 8);
wBox(3, 0.12, 1.2, wood, 3.6, 0.9, 2.6, S);
[[-1.3, -0.5], [1.3, -0.5], [-1.3, 0.5], [1.3, 0.5]].forEach(function (q) { wBox(0.12, 0.85, 0.12, wood, 3.6 + q[0], 0.43, 2.6 + q[1], S); });
for (var b = 0; b < 4; b++) {
var bl = wCyl(0.16, 0.16, 1.1, clothM[b], 2.6 + b * 0.62, 1.12, 2.6, S, 8);
bl.rotation.x = Math.PI / 2;
}
var sh1 = wBox(0.9, 0.03, 0.08, wM(0xC8CCD4), 4.4, 0.98, 3, S);
sh1.rotation.y = 0.4;
var sh2 = wBox(0.9, 0.03, 0.08, wM(0xC8CCD4), 4.4, 0.98, 3, S);
sh2.rotation.y = -0.4;
[[1.4, 4.2], [5.6, 4.4], [2.2, 5.6]].forEach(function (q, i) { wCyl(0.45, 0.45, 0.6, clothM[i + 1], q[0], 0.3, q[1], S, 12); wCyl(0.55, 0.55, 0.08, wood, q[0], 0.62, q[1], S, 12); wCyl(0.55, 0.55, 0.08, wood, q[0], 0.02, q[1], S, 12); });
var th = wCyl(0.55, 0.65, 1.1, wM(0xC8CCD4), -1.6, 0.55, 1.4, S, 14);
for (var d = 0; d < 4; d++)
wSph(0.05, wM(0x8A8E96), -1.6 + Math.cos(d) * 0.5, 0.4 + d * 0.2, 1.4 + Math.sin(d) * 0.5, S, 5);
wBox(0.08, 1.8, 0.08, wood, -5.4, 0.9, 2, S);
wBox(0.08, 1.8, 0.08, wood, -2.6, 0.9, 4.4, S);
var ln = wCyl(0.015, 0.015, 3.7, wM(0xE8E0D0), -4, 1.75, 3.2, S, 4);
ln.rotation.z = Math.PI / 2;
ln.rotation.y = 0.7;
for (var c = 0; c < 5; c++) {
var u = (c + 0.5) / 5;
wBox(0.36, 0.5, 0.06, clothM[c], -5.4 + u * 2.8, 1.45, 2 + u * 2.4, S).rotation.y = 0.7;
}
var sg = wSign(["The Tailors' Hollow", "Gnomes who are mostly tailors", "Mending while you wait"], 3.2, 1.3, "#3A5A2A", "#FFF4D8");
sg.position.set(-0.4, 1.9, 6.2);
S.add(sg);
wBox(0.12, 1.3, 0.12, wood, -0.4, 0.65, 6.15, S);
landBake(G, S);
var bk = nvLW(x0, z0, ry, 0, -4);
NV.solids.push({ x: bk.x, z: bk.z, r: 5.2 });
var bn = nvLW(x0, z0, ry, 3.6, 2.6);
NV.solids.push({ x: bn.x, z: bn.z, hw: 1.6, hd: 0.7, rot: ry });
var tb = nvLW(x0, z0, ry, -1.6, 1.4);
NV.solids.push({ x: tb.x, z: tb.z, r: 0.7 });
var GN = function (c) { return { top: c, topKind: "shirt", bottom: 0x4A3A2A, shoes: 0x3A2A1A, hair: 0xE8E4DC, hairStyle: "short", beard: "full", hat: "wizard", hatColor: c, layer: "vest", layerColor: 0x6A5A3A }; };
var m = nvLW(x0, z0, ry, 3.6, 1.4);
nvPut(G, "nv_gnome_0", { sex: "m", look: GN(0xB83A3A), scale: 0.5 }, m.x, m.z, { name: "Master Thimbleby, a gnome tailor", persona: "You are Master Thimbleby, the eldest of the gnomes who are mostly tailors, in the Tailors' Hollow in Neverland. J. M. Barrie puts 'gnomes who are mostly tailors' on every child's map of the Neverland in Peter and Wendy and says no more, so the rest is yours. You are small, fussy, proud and funny, you talk with pins in your mouth, and you measure everyone you meet. You mend the Lost Boys' bearskins and Peter's suit of skeleton leaves, you patch the pirates' breeches (grumbling), and you once made Captain Hook a very fine doublet and have never been paid for it. Keep it suitable for children.", greet: "Mmf. Hold still. Arms out. No, out. Hm. A touch long in the sleeve, I should think. Mending? Measuring? We are mostly tailors, you know. Mostly." }, null, ry);
var g1 = nvLW(x0, z0, ry, 1.4, 4.2), g2 = nvLW(x0, z0, ry, -3.6, 3.4);
nvPut(G, "nv_gnome_1", { sex: "f", look: GN(0x3A6AB8), scale: 0.5 }, g1.x, g1.z, null, { r: 4, sp: 0.6 }, ry);
nvPut(G, "nv_gnome_2", { sex: "m", look: GN(0xE8C83A), scale: 0.48 }, g2.x, g2.z, null, { r: 3, sp: 0.5 }, ry);
var pr = nvLW(x0, z0, ry, 1.8, 1.8);
nvPut(G, "nv_prince", { sex: "m", look: { top: 0xE8E0F0, topKind: "shirt", bottom: 0x3A3A6A, shoes: 0x5A3A1E, hair: 0xC8902A, hairStyle: "short", hat: "crown", hatColor: 0xE8C040, layer: "tunic", layerColor: 0x3A3A8A } }, pr.x, pr.z, { name: "A prince with six elder brothers", persona: "You are a prince with six elder brothers: Barrie puts 'princes with six elder brothers' on every child's map of the Neverland in Peter and Wendy, and you are one of them. Being the youngest of seven, you will never be king, so you came to Neverland to have adventures of your own instead. You are cheerful, polite, a little lost and very keen; right now you are being measured by the gnome tailors for a cloak to have adventures in. You love to talk about your six elder brothers (make up their names and how bossy they are) and the adventures you hope to have. Keep it suitable for children.", greet: "Good morning! Don't mind me, I'm being measured. I'm the youngest of seven, you see: six elder brothers. So no crown for me, except this little one, but a really excellent cloak." }, null, ry);
},
function (G) {
var x0 = -300, z0 = 500, h0 = nvHeight(x0, z0), S = new THREE.Group(), rock = new THREE.MeshLambertMaterial({ color: 0x8A8478, flatShading: true }), dk = wB(0x0E0A08), R = wRand(1260);
[[0, 0, 11, 0.8], [-12, 8, 7, 0.9], [12, 10, 7, 0.8], [2, -12, 8, 0.9], [-9, -6, 6, 1], [9, -5, 6, 1]].forEach(function (q) { var x = x0 + q[0], z = z0 + q[1], r = wMesh(new THREE.DodecahedronGeometry(q[2], 1), rock, x, nvHeight(x, z) + q[2] * 0.35, z, S); r.scale.y = q[3]; r.rotation.y = R() * 3; NV.solids.push({ x: x, z: z, r: q[2] * 0.85 }); });
var m1 = wMesh(new THREE.CircleGeometry(3.2, 16, 0, Math.PI), dk, x0, nvHeight(x0, z0 + 11) + 0.1, z0 + 11.1, S);
var m2 = wMesh(new THREE.CircleGeometry(2.4, 16, 0, Math.PI), dk, x0 + 2, nvHeight(x0 + 2, z0 - 20) + 0.1, z0 - 20.3, S);
m2.rotation.y = Math.PI;
[[-3.8, 11.2], [3.8, 11.2], [-1.2, -20.4], [5.2, -20.4]].forEach(function (q) { var x = x0 + q[0], z = z0 + q[1]; var rr = wMesh(new THREE.DodecahedronGeometry(1.6, 0), rock, x, nvHeight(x, z) + 1, z, S); rr.scale.y = 1.6; });
for (var s = 0; s < 4; s++) {
var sz = 600, sx = x0 + Math.sin(sz * 0.045) * 4 + 2.4 - s * 1.6;
wCyl(0.6, 0.7, 0.5, rock, sx, Math.max(nvHeight(sx, sz), 0.2) + 0.2, sz, S, 7);
}
var sg = wSign(["The River Caves", "Caves through which a river runs"], 3.4, 1, "#5A3A1A", "#FFF4D8");
var sx2 = x0 + 9, sz2 = z0 + 22;
sg.position.set(sx2, nvHeight(sx2, sz2) + 1.8, sz2);
sg.rotation.y = 0.3;
S.add(sg);
wBox(0.12, 1.8, 0.12, wM(0x5A3A1A), sx2, nvHeight(sx2, sz2) + 0.9, sz2 - 0.06, S);
landBake(G, S);
var n = 64, zA = z0 + 11, zB = 668, pos = [], uv = [], idx = [];
for (var i = 0; i <= n; i++) {
var u = i / n, z = zA + (zB - zA) * u, cx = x0 + Math.sin(z * 0.045) * 4, w = 1.4 + u * 2.4, y = Math.max(nvHeight(cx - w, z), nvHeight(cx, z), nvHeight(cx + w, z), 0.15) + 0.3;
pos.push(cx - w, y, z, cx + w, y, z);
uv.push(0, u * 14, 1, u * 14);
if (i < n) {
var a = i * 2;
idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
}
}
var sgm = new THREE.BufferGeometry();
sgm.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
sgm.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
sgm.setIndex(idx);
sgm.computeVertexNormals();
var tex = wTex(64, 128, function (x, W, H) { x.fillStyle = "#4A9AC8"; x.fillRect(0, 0, W, H); x.fillStyle = "rgba(230,245,255,0.55)"; for (var k = 0; k < 14; k++) {
x.fillRect((k * 23) % W, (k * 37) % H, 3 + (k % 3) * 3, 14 + (k % 4) * 6);
} }, [1, 1]);
var st = new THREE.Mesh(sgm, new THREE.MeshLambertMaterial({ map: tex, transparent: true, opacity: 0.88, side: THREE.DoubleSide }));
G.add(st);
NV.stream = tex;
NV.talkers.push({ x: x0, z: z0 + 18, r: 6, name: "The River Caves", fn: function () { worldCard(worldFacts("The River Caves", "\"Caves through which a river runs\"", [], ["A stream rises somewhere under the Never Peak, runs through the dark of these caves, and comes out here to tumble down to the sea.", "Barrie puts \"caves through which a river runs\" on every child's map of the Neverland, in the first chapter of Peter and Wendy, between the gnomes who are mostly tailors and the princes with six elder brothers.", "The Lost Boys say the caves go right under the island. None of them has ever got to the end."])); } });
var cn = new THREE.Group();
var hull = wMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM(0xA8885A), 0, 0.5, 0, cn);
hull.scale.set(0.7, 0.5, 4);
cn.position.set(x0 + 16, Math.max(nvHeight(x0 + 16, 636), 0.3), 636);
cn.rotation.y = 0.2;
G.add(cn);
nvPut(G, "bluff_fisher", { sex: "f", look: { top: 0x8A6A48, topKind: "dress", bottom: 0x6A5038, shoes: 0x5A3E26, skin: 0x9A6A48, hair: 0x141414, hairStyle: "braids", hat: "none" } }, x0 + 10, 628, { name: "One of the People of the Bluff", persona: "You are one of the People of the Bluff, Tiger Lily's people, the first people of Neverland, in a respectful retelling of J. M. Barrie's story. Right now you are fishing at the mouth of the stream that runs out of the River Caves. You are calm, friendly and good-humoured, proud of your people's skills (canoes, tracking, weaving, songs and stories of the island), and you know the stream and the caves well, though even you have never found where the river starts. Speak in clear, natural, modern English: never broken English and never the old stereotypes.", greet: "Good morning. Quietly, if you would; the fish here are cleverer than they look. Have you been up to the caves?" }, null, Math.PI);
},
function (G) {
var x0 = 250, z0 = 500, ry = -0.5, h0 = nvHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, h0, z0);
S.rotation.y = ry;
var tar = wM(0x3A2E26), plank = wM(0x8A6A42), dk = wB(0x140C06);
var hull = wMesh(new THREE.SphereGeometry(1, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), tar, 0, -0.1, 0, S);
hull.scale.set(1.9, 1.5, 4.4);
wBox(0.18, 0.2, 8.6, plank, 0, 1.45, 0, S);
for (var r = 0; r < 5; r++) {
var rib = wMesh(new THREE.TorusGeometry(1, 0.05, 4, 14, Math.PI), plank, 0, -0.1, -3 + r * 1.5, S);
var k = Math.sqrt(Math.max(0.1, 1 - Math.pow((-3 + r * 1.5) / 4.4, 2)));
rib.scale.set(1.92 * k, 1.52 * k, 1);
}
wMesh(new THREE.CircleGeometry(0.7, 12, 0, Math.PI), dk, 0, 0, 3.95, S);
wBox(1.2, 0.15, 0.8, plank, 0, 0.07, 4.7, S);
wCyl(0.12, 0.12, 1.4, wM(0x2A2A2A), 0.6, 1.9, -1.5, S, 8);
wCyl(0.2, 0.2, 0.08, wM(0x2A2A2A), 0.6, 2.62, -1.5, S, 8);
var mast = wCyl(0.04, 0.04, 2.4, plank, -0.4, 2.4, 1.5, S, 5);
var fl = wBox(0.04, 0.4, 0.7, wM(0xC83A3A), -0.4, 3.35, 1.85, S);
var oar = wBox(0.12, 2.6, 0.05, plank, 2.6, 1.2, 2.2, S);
oar.rotation.z = 0.2;
wBox(0.3, 0.7, 0.06, plank, 2.36, 0.3, 2.2, S).rotation.z = 0.2;
var sg = wSign(["John's Boat House", "A boat turned upside down on the sands", "Knock first"], 2.8, 1.1, "#2A3A5A", "#FFF4D8");
sg.position.set(-2.4, 1.5, 4.2);
sg.rotation.y = 0.4;
S.add(sg);
wBox(0.1, 1, 0.1, plank, -2.4, 0.5, 4.15, S);
landBake(G, S);
NV.solids.push({ x: x0, z: z0, hw: 1.9, hd: 4.3, rot: ry });
var j = nvLW(x0, z0, ry, 1.4, 5.6);
nvPut(G, "johndarling", { child: true, sex: "m", look: { top: 0xF0ECE0, topKind: "shirt", bottom: 0xF0ECE0, shoes: 0x3A2A1A, hair: 0x6A4A2A, hairStyle: "short", hat: "tophat", hatColor: 0x141414 } }, j.x, j.z, { name: "John Darling", persona: "You are John Darling, Wendy's brother and Michael's, from J. M. Barrie's Peter and Wendy: you flew to Neverland with them and Peter Pan from the nursery window, the night the Darling parents went out to dinner. You are a serious, rather grand boy who likes to be in charge and knows a great deal about pirates. Barrie says that in John's own Neverland he lived in a boat turned upside down on the sands, and here it is: you are very proud of it. (Your hat, with its top knocked out, is the chimney of Wendy's little house; this is your spare, and you say you don't mind.) Speak like a polite, slightly pompous Edwardian boy who gets excited about adventures. Keep it suitable for children.", greet: "Oh, I say! A visitor. This is my house. It's a boat, upside down, which is the best kind of house there is: the rain runs off. Have you seen any pirates? I keep a lookout." }, null, ry);
},
function (G) {
var x0 = 200, z0 = 150, ry = Math.atan2(-x0, -z0), h0 = nvHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, h0, z0);
S.rotation.y = ry;
var lv = [wM(0x3A7A2E), wM(0x5A9A3A), wM(0x7AAA42), wM(0x4E8A30)], core = wM(0x2E5A22), thread = wM(0xF0E8D0), wood = wM(0x6A4A2A), dk = wB(0x142010);
var leafG = new THREE.SphereGeometry(1, 8, 6);
wCyl(2.5, 2.6, 2.6, core, 0, 1.3, 0, S, 14);
wCone(3, 2.6, core, 0, 3.8, 0, S, 14);
for (var row = 0; row < 3; row++)
for (var i = 0; i < 14; i++) {
var a = (i + (row % 2) * 0.5) / 14 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a)) - Math.PI / 2) < 0.38 && row < 2)
continue;
var lf = wMesh(leafG, lv[(i + row) % 4], Math.cos(a) * 2.66, 0.55 + row * 0.85, Math.sin(a) * 2.66, S);
lf.scale.set(0.72, 0.95, 0.1);
lf.rotation.y = Math.PI / 2 - a;
lf.rotation.x = -0.12;
}
for (var r2 = 0; r2 < 2; r2++)
for (var j = 0; j < 12; j++) {
var b = (j + r2 * 0.5) / 12 * Math.PI * 2, rr = 2.75 - r2 * 1.25;
var rf = wMesh(leafG, lv[(j + r2 + 1) % 4], Math.cos(b) * rr, 2.9 + r2 * 1.25, Math.sin(b) * rr, S);
rf.scale.set(0.9, 1.25, 0.1);
rf.rotation.order = "YXZ";
rf.rotation.y = Math.PI / 2 - b;
rf.rotation.x = -0.85;
}
var top = wMesh(leafG, lv[1], 0, 5.05, 0, S);
top.scale.set(0.5, 0.25, 0.5);
for (var s = 0; s < 16; s++) {
var sa = s / 16 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(sa), Math.cos(sa)) - Math.PI / 2) < 0.4)
continue;
var st = wBox(0.04, 0.3, 0.04, thread, Math.cos(sa) * 2.74, 1.4 + (s % 2) * 0.85, Math.sin(sa) * 2.74, S);
st.rotation.y = Math.PI / 2 - sa;
st.rotation.z = 0.7;
}
wBox(1.1, 1.9, 0.06, dk, 0, 0.95, 2.56, S);
var cur = wMesh(leafG, lv[2], 0.55, 1.05, 2.62, S);
cur.scale.set(0.38, 0.95, 0.06);
cur.rotation.z = 0.2;
wBox(1.4, 0.16, 0.6, wM(0x8A7A62), 0, 0.08, 2.95, S);
wCyl(0.32, 0.26, 0.28, wM(0xA8864A), -1.4, 0.14, 3.1, S, 10);
wSph(0.12, wM(0xC83A4A), -1.45, 0.32, 3.08, S, 6);
wSph(0.1, wM(0x3A6AB8), -1.28, 0.3, 3.15, S, 6);
wBox(0.1, 1.9, 0.1, wood, -4.6, 0.95, 0.6, S);
wBox(0.1, 1.9, 0.1, wood, -4.6, 0.95, 4.2, S);
var ln = wCyl(0.012, 0.012, 3.6, thread, -4.6, 1.85, 2.4, S, 4);
ln.rotation.x = Math.PI / 2;
wBox(0.06, 0.8, 0.7, wM(0xF0F0F4), -4.62, 1.42, 1.6, S);
[3, 3.5].forEach(function (z) { wBox(0.05, 0.55, 0.16, wM(0xE8E0F0), -4.62, 1.5, z, S); });
var fc = [wM(0xFF8AA8), wM(0xFFE06A), wM(0xFFFFFF), wM(0xB88AFF)];
for (var f = 0; f < 16; f++) {
var fa = f / 16 * Math.PI * 2;
if (Math.sin(fa) > 0.8)
continue;
wSph(0.14, fc[f % 4], Math.cos(fa) * 3.5, 0.18, Math.sin(fa) * 3.5, S, 5);
}
var sg = wSign(["Wendy's House of Leaves", "Deftly sewn together", "Please wipe your feet on the moss"], 3.2, 1.2, "#2E5A22", "#FFF4D8");
sg.position.set(2.6, 1.7, 4.3);
sg.rotation.y = -0.35;
S.add(sg);
wBox(0.1, 1.1, 0.1, wood, 2.6, 0.55, 4.25, S);
landBake(G, S);
NV.solids.push({ x: x0, z: z0, r: 2.9 });
[[-4.6, 0.6], [-4.6, 4.2], [2.6, 4.25]].forEach(function (q) { var w = nvLW(x0, z0, ry, q[0], q[1]); NV.solids.push({ x: w.x, z: w.z, r: 0.2 }); });
var dr = nvLW(x0, z0, ry, 0, 3.6);
NV.talkers.push({ x: dr.x, z: dr.z, r: 2.2, name: "Wendy's House of Leaves", verb: "look inside", fn: function () { worldCard(worldFacts("Wendy's house of leaves", "\"Deftly sewn together\"", [], ["Inside: a bed of moss, a shelf with a thimble and a reel of cotton on it, and a little pile of the boys' socks waiting to be darned.", "Every child's Neverland is a little different, Barrie says in the first chapter of Peter and Wendy: John lived in a boat turned upside down on the sands, and Wendy \"in a house of leaves deftly sewn together\".", "Wendy has gone home to London now, but the house is kept ready. The leaves never wilt. The wolf sees to that."])); } });
var wf = nvWolf();
var wp = nvLW(x0, z0, ry, 1.6, 3.3);
wf.position.set(wp.x, nvHeight(wp.x, wp.z), wp.z);
wf.rotation.y = ry + 2.4;
G.add(wf);
NV.wolf = wf;
NV.solids.push({ x: wp.x, z: wp.z, r: 0.5 });
NV.talkers.push({ x: wp.x, z: wp.z, r: 2, name: "Wendy's wolf", fn: function () { worldCard(worldFacts("Wendy's wolf", "\"A pet wolf forsaken by its parents\"", [], ["Grey, with one ear that will not stand up. It lets you scratch its head, then goes back to watching the path, in case she comes.", "In Wendy's own Neverland, Barrie says, she \"had a pet wolf forsaken by its parents\" (Peter and Wendy, chapter 1).", "Real wolf cubs are born blind and deaf in a den, and the whole pack helps to feed them. A wolf can hear another wolf howl from about 10 km away in open country."])); } });
},
function () {
var g = new THREE.Group(), fur = wM(0x8A8680), pale = wM(0xD8D4CC), dk = wM(0x1A1A1A);
var b = wSph(0.38, fur, 0, 0.32, 0, g, 10);
b.scale.set(0.85, 0.7, 1.6);
wSph(0.25, pale, 0, 0.24, 0.25, g, 8);
var hd = wSph(0.2, fur, 0, 0.62, 0.6, g, 8);
hd.scale.set(0.9, 0.85, 1.1);
var sn = wCone(0.1, 0.26, pale, 0, 0.57, 0.82, g, 6);
sn.rotation.x = Math.PI / 2;
wSph(0.035, dk, 0, 0.58, 0.95, g, 5);
var e1 = wCone(0.07, 0.18, fur, -0.1, 0.82, 0.56, g, 4);
var e2 = wCone(0.07, 0.18, fur, 0.11, 0.78, 0.56, g, 4);
e2.rotation.z = -0.7;
[[-0.2, 0.45], [0.2, 0.45]].forEach(function (q) { var l = wCyl(0.06, 0.05, 0.5, fur, q[0], 0.08, q[1] + 0.1, g, 5); l.rotation.x = Math.PI / 2; });
var tl = new THREE.Group();
tl.position.set(0, 0.3, -0.55);
g.add(tl);
var t = wCyl(0.08, 0.04, 0.6, fur, 0, 0, -0.28, tl, 5);
t.rotation.x = Math.PI / 2 + 0.3;
g.userData.tail = tl;
return g;
},
function (fly) {
var g = new THREE.Group(), pink = wM(0xF4889A), deep = wM(0xE85A78), blk = wM(0x1A1A1A);
var b = wSph(0.32, pink, 0, fly ? 0 : 1.25, 0, g, 8);
b.scale.set(0.75, 0.7, 1.25);
if (fly) {
var nk = wCyl(0.05, 0.05, 1.1, pink, 0, 0, 0.8, g, 5);
nk.rotation.x = Math.PI / 2;
wSph(0.09, pink, 0, 0, 1.38, g, 6);
var bk = wCone(0.05, 0.18, blk, 0, -0.02, 1.52, g, 5);
bk.rotation.x = Math.PI / 2;
g.userData.wings = [-1, 1].map(function (s) { var wg = new THREE.Group(); wg.position.x = s * 0.15; g.add(wg); wBox(1.1, 0.04, 0.42, deep, s * 0.55, 0.02, 0, wg); wBox(0.4, 0.04, 0.3, blk, s * 1.25, 0.02, 0, wg); wg.userData.s = s; return wg; });
var lg = wCyl(0.025, 0.025, 1.1, deep, 0, -0.02, -0.85, g, 4);
lg.rotation.x = Math.PI / 2;
return g;
}
var n1 = wCyl(0.045, 0.05, 0.5, pink, 0, 1.55, 0.32, g, 5);
n1.rotation.x = -0.5;
var n2 = wCyl(0.04, 0.045, 0.5, pink, 0, 1.95, 0.36, g, 5);
n2.rotation.x = 0.35;
wSph(0.08, pink, 0, 2.2, 0.26, g, 6);
var bk2 = wCone(0.045, 0.16, blk, 0, 2.14, 0.38, g, 5);
bk2.rotation.x = 1.9;
wCyl(0.022, 0.022, 1.05, deep, 0.06, 0.53, 0, g, 4);
var l2 = wCyl(0.022, 0.022, 0.55, deep, -0.06, 0.85, 0.08, g, 4);
l2.rotation.x = -0.9;
return g;
},
function (G) {
var C = NV_FLAM, S = new THREE.Group(), reed = wM(0x9AA85A), reed2 = wM(0x7A8A42), thatch = wM(0xB8A060), wood = wM(0x7A5A3A), dk = wB(0x140C06), R = wRand(1906);
for (var i = 0; i < 70; i++) {
var a = R() * 6.283, d = C.r * (0.7 + R() * 0.35), x = C.x + Math.cos(a) * d, z = C.z + Math.sin(a) * d, h = nvHeight(x, z);
if (h < 0.05 || Math.hypot(x - C.hx, z - C.z) < 6)
continue;
var rd = wCyl(0.03, 0.05, 1.6 + R() * 0.8, i % 2 ? reed : reed2, x, h + 0.9, z, S, 4);
rd.rotation.z = (R() - 0.5) * 0.3;
}
var hx = C.hx, hz = C.z, hy = nvHeight(hx, hz), H = new THREE.Group();
H.position.set(hx, hy, hz);
S.add(H);
wBox(0.2, 1.6, 4, thatch, -1.6, 0.8, 0, H);
wBox(0.2, 0.5, 4, thatch, -1.6, 2.15, 0, H);
wBox(0.08, 0.4, 3.4, dk, -1.62, 1.85, 0, H);
wBox(0.2, 2.4, 4, thatch, 1.6, 1.2, -0, H);
wBox(3.2, 2.4, 0.2, thatch, 0, 1.2, -2, H);
wBox(1, 2.4, 0.2, thatch, -1.1, 1.2, 2, H);
wBox(1, 2.4, 0.2, thatch, 1.1, 1.2, 2, H);
var rf = wMesh(new THREE.ConeGeometry(3.1, 1.6, 4), thatch, 0, 3.2, 0, H);
rf.rotation.y = Math.PI / 4;
rf.scale.z = 1.25;
wBox(2.8, 0.08, 0.5, wood, 0, 1.1, -1.3, H);
for (var p = 0; p < 9; p++) {
var px = hx - 2.4 - p * 1.6, ph = Math.max(nvHeight(px, hz), 0.2);
wBox(1.5, 0.1, 1.6, wood, px, ph + 0.35, hz, S);
[-0.7, 0.7].forEach(function (s) { wCyl(0.07, 0.07, 1.2, wood, px, ph - 0.2, hz + s, S, 5); });
}
var sg = wSign(["The Flamingo Lagoon", "John's lagoon, with flamingoes flying over it", "Quiet in the hide, please"], 3.4, 1.3, "#5A3A1A", "#FFF4D8");
var sx = hx + 3.4, sz = hz + 3.6;
sg.position.set(sx, nvHeight(sx, sz) + 1.8, sz);
sg.rotation.y = Math.PI / 2;
S.add(sg);
wBox(0.1, 1.8, 0.1, wood, sx - 0.06, nvHeight(sx, sz) + 0.9, sz, S);
landBake(G, S);
NV.solids.push({ x: hx - 1.6, z: hz, hw: 0.15, hd: 2 }, { x: hx + 1.6, z: hz, hw: 0.15, hd: 2 }, { x: hx, z: hz - 2, hw: 1.6, hd: 0.15 }, { x: hx - 1.1, z: hz + 2, hw: 0.5, hd: 0.15 }, { x: hx + 1.1, z: hz + 2, hw: 0.5, hd: 0.15 }, { x: hx, z: hz - 1.3, hw: 1.4, hd: 0.3 }, { x: sx, z: sz, r: 0.2 });
NV.flam = [];
for (var k = 0; k < 11; k++) {
var fa = R() * 6.283, fd = 3 + R() * C.r * 0.42, fx = C.x + Math.cos(fa) * fd, fz = C.z + Math.sin(fa) * fd;
var fm = nvFlamingo(false);
fm.position.set(fx, nvHeight(fx, fz), fz);
fm.rotation.y = R() * 6;
G.add(fm);
}
for (var q = 0; q < 6; q++) {
var fl = nvFlamingo(true);
G.add(fl);
NV.flam.push({ g: fl, a: q * 0.45, r: 26 + (q % 3) * 5, y: 14 + (q % 2) * 3 });
}
NV.talkers.push({ x: sx, z: sz, r: 3, name: "The Flamingo Lagoon", verb: "read the sign", fn: function () { worldCard(worldFacts("The Flamingo Lagoon", "Peter and Wendy, chapter 1", [], ["\"John, for instance, had a lagoon with flamingoes flying over it ... while Michael, who was very small, had a flamingo with lagoons flying over it.\" This is John's. (Michael's is harder to find.)", "Real flamingoes are pink because of what they eat: tiny shrimps and algae full of the same orange colour that is in carrots. They feed with their heads upside down, sieving the water through their beaks.", "Nobody knows for certain why they stand on one leg. It may keep them warm, and it seems to take less effort than standing on two."])); } });
nvPut(G, "bluff_birder", { sex: "m", look: { top: 0x6A5A3A, topKind: "shirt", bottom: 0x5A4A32, shoes: 0x5A3E26, skin: 0x8A5A3A, hair: 0x141414, hairStyle: "long", hat: "none" } }, hx, hz + 0.6, { name: "One of the People of the Bluff", persona: "You are one of the People of the Bluff, Tiger Lily's people, the first people of Neverland, in a respectful retelling of J. M. Barrie's story. You keep the count of the flamingoes on the lagoon behind the west beach, from a reed hide your people built, and you know every bird on the island: the flamingoes, the Never bird, the gulls. You are quiet, patient and gently funny, you talk in a low voice so as not to disturb the birds, and you know real facts about flamingoes (pink from their food, they feed upside down, they stand on one leg). Speak in clear, natural, modern English: never broken English and never the old stereotypes.", greet: "Shh. Sit, if you like; the bench is long. Forty-one this morning. Forty-two, if that one by the reeds is a flamingo and not a stick. It usually turns out to be a stick." }, null, -Math.PI / 2);
},
function (G) {
var x0 = 350, z0 = -100, h0 = nvHeight(x0, z0), S = new THREE.Group(), stone = wM(0xC8C0B0), grav = wM(0xD8CCA8), wood = wM(0x5A4A3A), iron = wM(0x2A2E2A), R = 11;
var ring = wMesh(new THREE.RingGeometry(R + 0.5, R + 3.6, 40), grav, x0, h0 + 0.04, z0, S);
ring.rotation.x = -Math.PI / 2;
for (var i = 0; i < 40; i++) {
var a = i / 40 * Math.PI * 2, kb = wBox(1.85, 0.45, 0.6, stone, x0 + Math.cos(a) * (R + 0.2), h0 + 0.22, z0 + Math.sin(a) * (R + 0.2), S);
kb.rotation.y = Math.PI / 2 - a;
}
var water = wMesh(new THREE.CircleGeometry(R, 40), new THREE.MeshPhongMaterial({ color: 0x4A8AB8, shininess: 90, specular: 0x9ABBDD }), x0, h0 + 0.3, z0, S);
water.rotation.x = -Math.PI / 2;
[0.4, 1.9, 3.4, 4.9].forEach(function (a) {
var bx = x0 + Math.cos(a) * (R + 5.2), bz = z0 + Math.sin(a) * (R + 5.2), b = new THREE.Group();
b.position.set(bx, h0, bz);
b.rotation.y = -Math.PI / 2 - a;
S.add(b);
wBox(2.2, 0.08, 0.5, wood, 0, 0.48, 0, b);
wBox(2.2, 0.45, 0.06, wood, 0, 0.82, -0.24, b);
[-0.9, 0.9].forEach(function (x) { wBox(0.08, 0.48, 0.46, iron, x, 0.24, 0, b); });
NV.solids.push({ x: bx, z: bz, hw: 1.1, hd: 0.3, rot: -Math.PI / 2 - a });
});
var lamps = [[1.15, R + 3.9], [4.3, R + 3.9]].map(function (q) { var lx = x0 + Math.cos(q[0]) * q[1], lz = z0 + Math.sin(q[0]) * q[1]; wCyl(0.08, 0.12, 3.2, iron, lx, h0 + 1.6, lz, S, 6); wBox(0.4, 0.5, 0.4, iron, lx, h0 + 3.35, lz, S); wBox(0.3, 0.36, 0.3, wB(0xFFE8B0), lx, h0 + 3.35, lz, S); NV.solids.push({ x: lx, z: lz, r: 0.2 }); return [lx, h0 + 3.35, lz]; });
var sg = wSign(["The Round Pond", "On every child's map", "No bathing. Boats only."], 3, 1.2, "#2A3A5A", "#FFF4D8"), sa = 2.65, sx = x0 + Math.cos(sa) * (R + 4.2), sz = z0 + Math.sin(sa) * (R + 4.2);
sg.position.set(sx, h0 + 1.8, sz);
sg.rotation.y = Math.PI / 2 - sa + Math.PI;
S.add(sg);
wBox(0.1, 1.8, 0.1, wood, sx, h0 + 0.9, sz, S);
NV.solids.push({ x: sx, z: sz, r: 0.2 });
landBake(G, S);
lamps.forEach(function (q) { var gl = wGlow(0xFFE0A0, 2.2, 0.55); gl.position.set(q[0], q[1], q[2]); G.add(gl); });
NV.solids.push({ x: x0, z: z0, r: R + 0.4 });
NV.boats = [];
[[0xC83A3A, 3.5, 0.05], [0x3A6AB8, 6.5, -0.04], [0xE8C83A, 8.6, 0.03]].forEach(function (q, i) {
var bt = new THREE.Group(), hull = wSph(0.35, wM(q[0]), 0, 0, 0, bt, 8);
hull.scale.set(0.5, 0.35, 1.2);
wCyl(0.02, 0.02, 0.9, wM(0x5A3A1A), 0, 0.45, 0, bt, 4);
var sl = wMesh(new THREE.PlaneGeometry(0.5, 0.65), wM(0xF4F0E8, { ds: true }), 0, 0.55, -0.05, bt);
sl.rotation.y = Math.PI / 2;
G.add(bt);
NV.boats.push({ g: bt, r: q[1], a: i * 2, sp: q[2], y: h0 + 0.36, x0: x0, z0: z0 });
});
nvPut(G, "michaeldarling", { child: true, sex: "m", scale: 0.85, look: { top: 0xD8E4F4, topKind: "shirt", bottom: 0xD8E4F4, shoes: 0x3A2A1A, hair: 0x8A5A2A, hairStyle: "short", hat: "none" } }, x0 - R - 1.6, z0 + 1.5, { name: "Michael Darling", persona: "You are Michael Darling, the youngest of the three Darling children in J. M. Barrie's Peter and Wendy, who flew to Neverland with Wendy, John and Peter Pan. You are very small, sweet, sleepy and brave in a small way; you sometimes muddle words, you want to be a Lost Boy and also want your mother, and you are very proud of your toy boat on the round pond. Barrie says John's Neverland had a lagoon with flamingoes flying over it, and yours had a flamingo with lagoons flying over it, and you think that is much better. Speak like a small, eager Edwardian boy of about five. Keep it suitable for children.", greet: "That's my boat. The red one. No, the red one. It's winning. Do you want to see my flamingo? It has lagoons flying over it. John's only has flamingoes." }, null, Math.PI / 2);
try {
var nana = build({ id: "nana", archetype: "dog", attrs: { s: 1.7 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
var nx = x0 - R - 2.4, nz = z0 - 1.2;
nana.position.set(nx, nvHeight(nx, nz), nz);
nana.rotation.y = Math.PI / 2;
G.add(nana);
NV.solids.push({ x: nx, z: nz, r: 0.6 });
NV.talkers.push({ x: nx, z: nz, r: 2.2, name: "Nana", fn: function () { worldCard(worldFacts("Nana", "The Darlings' nurse", [], ["\"Their nurse was a prim Newfoundland dog, called Nana\" (Peter and Wendy, chapter 1). She keeps one eye on Michael's boat and one on Michael.", "On the way to school she trotted beside the children, and, Barrie says, \"she usually carried an umbrella in her mouth in case of rain\".", "Real Newfoundland dogs were bred to work with fishermen: they have webbed feet and a thick, oily coat, and they are famous for pulling people out of the water."])); } });
}
catch (e) { }
},
function (G) {
var x0 = 450, z0 = -250, ry = Math.atan2(-x0, -z0), h0 = nvHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, h0, z0);
S.rotation.y = ry;
var wood = wM(0x7A5A3A), cloth = wM(0xF4F0E8), choc = wM(0x5A3020), cream = wM(0xF8F0E0), cherry = wM(0xC82A2A), plate = wM(0xE8E8F0), stem = wM(0xE8E0D0), cap = wM(0xC83A2A), bark = wM(0x6A4A2A);
wBox(8, 0.1, 1.6, wood, 0, 0.82, 0, S);
wBox(8.1, 0.02, 1.7, cloth, 0, 0.88, 0, S);
[[-3.6, -0.6], [3.6, -0.6], [-3.6, 0.6], [3.6, 0.6]].forEach(function (q) { wBox(0.12, 0.8, 0.12, wood, q[0], 0.4, q[1], S); });
for (var p = 0; p < 5; p++) {
var px = -3 + p * 1.5;
wCyl(0.42, 0.38, 0.03, plate, px, 0.91, 0, S, 14);
var pd = wSph(0.34, choc, px, 0.92, 0, S, 12);
pd.scale.y = 0.9;
var cr = wSph(0.2, cream, px, 1.2, 0, S, 10);
cr.scale.y = 0.45;
wSph(0.06, cherry, px, 1.28, 0, S, 6);
}
for (var b = 0; b < 8; b++) {
var bx = -3.3 + (b % 4) * 2.2, bz = b < 4 ? -1.4 : 1.4;
if (b % 2) {
wCyl(0.32, 0.36, 0.5, bark, bx, 0.25, bz, S, 8);
}
else {
wCyl(0.1, 0.14, 0.45, stem, bx, 0.22, bz, S, 6);
var c = wSph(0.38, cap, bx, 0.45, bz, S, 10);
c.scale.y = 0.4;
}
}
[-5, 5].forEach(function (x) { wCyl(0.08, 0.1, 3.4, wood, x, 1.7, -2.2, S, 6); });
var bc = [wM(0xE85A5A), wM(0xFFD24A), wM(0x5AA8E8), wM(0x6AC86A)];
for (var f = 0; f < 12; f++) {
var fx = -4.6 + f * 0.84, sag = Math.sin((f + 0.5) / 12 * Math.PI) * 0.6, fl = wCone(0.22, 0.45, bc[f % 4], fx, 3.05 - sag, -2.2, S, 3);
fl.rotation.x = Math.PI;
fl.scale.z = 0.25;
}
var ln = wCyl(0.012, 0.012, 10, cloth, 0, 3.15, -2.2, S, 4);
ln.rotation.z = Math.PI / 2;
var sg = wSign(["Chocolate Pudding Day", "(it's on the map)", "Wash your hands first"], 3, 1.2, "#5A3020", "#FFF4D8");
sg.position.set(5.2, 1.7, 1.8);
sg.rotation.y = -0.5;
S.add(sg);
wBox(0.1, 1.7, 0.1, wood, 5.2, 0.85, 1.75, S);
landBake(G, S);
var tw = nvLW(x0, z0, ry, 0, 0);
NV.solids.push({ x: tw.x, z: tw.z, hw: 4.1, hd: 0.85, rot: ry });
[[-5, -2.2], [5, -2.2], [5.2, 1.75]].forEach(function (q) { var w = nvLW(x0, z0, ry, q[0], q[1]); NV.solids.push({ x: w.x, z: w.z, r: 0.2 }); });
var pd2 = nvLW(x0, z0, ry, 0, 1.2);
NV.talkers.push({ x: pd2.x, z: pd2.z, r: 2.6, name: "The puddings", verb: "look", fn: function () { worldCard(worldFacts("Chocolate pudding day", "On every child's map of the Neverland", [], ["Five chocolate puddings, each with a cherry. Nobody is allowed one until everyone is sitting down.", "Barrie's list of what is on a child's map of the Neverland, in the first chapter of Peter and Wendy, runs from coral reefs to \"first day at school, religion, fathers, the round pond, needle-work ... verbs that take the dative, chocolate pudding day, getting into braces\".", "Chocolate came to Europe from Mexico in the 1500s, as a drink; the Maya and the Aztecs drank it long before. Chocolate you can eat, in bars, was first made in the 1840s."])); } });
var lz = nvLW(x0, z0, ry, -2.2, 1.9);
nvPut(G, "liza_maid", { sex: "f", scale: 0.9, look: { top: 0x2A2A3A, topKind: "dress", bottom: 0x2A2A3A, shoes: 0x1A1A1A, hair: 0x6A3A1A, hairStyle: "short", hat: "none", layer: "apron", layerColor: 0xF4F0E8 } }, lz.x, lz.z, { name: "Liza", persona: "You are Liza, the Darlings' little maid from London in J. M. Barrie's Peter and Wendy: small, quick, proud of your work and a little bossy with children. In this dream of Neverland you have made the chocolate puddings for chocolate pudding day (it is on every child's map, Barrie says) and you are guarding them until everyone has washed their hands and sat down. You are funny, brisk and warm underneath, you call people 'miss' and 'master', and you are rather impressed by the island though you would never say so. Keep it suitable for children.", greet: "Hands. Let me see your hands. Hmm. They'll do. Sit down, then, and no starting before the others. Five puddings, and I've counted them, so don't think I haven't." }, null, ry);
},
function () {
var g = new THREE.Group(), hullM = wM(0x3A2A1C), trim = wM(0xA8883A), deckM = wM(0x8A6A42), sail = new THREE.MeshLambertMaterial({ color: 0xD8CCB0, side: THREE.DoubleSide });
var hg = new THREE.BoxGeometry(9, 5, 34, 1, 4, 12), p = hg.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), k = z / 17;
var taper = 1 - Math.pow(Math.abs(k), 2.2) * (k > 0 ? 0.85 : 0.45), bottom = y < 0 ? 0.55 : 1;
p.setX(i, x * taper * bottom);
if (y > 0)
p.setY(i, y + Math.pow(Math.abs(k), 2) * 2.2);
}
hg.computeVertexNormals();
var hull = new THREE.Mesh(hg, hullM);
hull.position.y = 1.5;
g.add(hull);
wBox(7.6, 0.2, 30, deckM, 0, 3.9, -0.5, g);
wBox(8, 3, 7, hullM, 0, 5.2, -13, g);
wBox(8.2, 0.3, 7.2, trim, 0, 6.8, -13, g);
for (var w = 0; w < 4; w++)
wBox(1, 0.9, 0.1, wM(0xFFE0A0, { e: 0x6A5020 }), -2.6 + w * 1.75, 5.2, -16.6, g);
wBox(7, 1.6, 5, hullM, 0, 4.6, 12, g);
for (var c = 0; c < 6; c++) {
[-1, 1].forEach(function (s) { wBox(0.12, 0.6, 0.6, wB(0x140C06), s * 4.25, 2.6, -9 + c * 3.6, g); var cn = wCyl(0.18, 0.2, 1.2, wM(0x1A1A1A), s * 4.6, 2.6, -9 + c * 3.6, g, 8); cn.rotation.z = Math.PI / 2; });
}
var bs = wCyl(0.2, 0.3, 12, wM(0x5A3A1E), 0, 6, 21, g, 6);
bs.rotation.x = 1.15;
[[-8, 22], [2, 26], [11, 19]].forEach(function (m, i) {
wCyl(0.32, 0.42, m[1], wM(0x5A3A1E), 0, 4 + m[1] / 2, m[0], g, 8);
for (var y = 0; y < 2; y++) {
var yy = 8 + y * 6 + i, yd = wCyl(0.14, 0.14, 10 - y * 2, wM(0x5A3A1E), 0, 4 + yy, m[0], g, 6);
yd.rotation.z = Math.PI / 2;
var sg = new THREE.PlaneGeometry(9.5 - y * 2, 5.6, 6, 4), sp = sg.attributes.position;
for (var j = 0; j < sp.count; j++) {
var sx = sp.getX(j), sy = sp.getY(j);
sp.setZ(j, (1 - Math.pow(sx / (5 - y), 2)) * 0.9 * (0.6 + sy * 0.1));
}
sg.computeVertexNormals();
var s = new THREE.Mesh(sg, sail);
s.position.set(0, 4 + yy - 2.9, m[0] + 0.3);
g.add(s);
}
});
var jr = wTex(128, 84, function (x, W, H) {
x.fillStyle = "#0A0A0A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#F0ECE0";
x.beginPath();
x.arc(64, 34, 16, 0, 7);
x.fill();
x.fillRect(54, 40, 20, 12);
x.fillStyle = "#0A0A0A";
x.beginPath();
x.arc(57, 32, 4.5, 0, 7);
x.arc(71, 32, 4.5, 0, 7);
x.fill();
x.fillStyle = "#F0ECE0";
x.save();
x.translate(64, 64);
x.rotate(0.6);
x.fillRect(-30, -3, 60, 6);
x.rotate(-1.2);
x.fillRect(-30, -3, 60, 6);
x.restore();
});
var flag = wMesh(new THREE.PlaneGeometry(3, 2, 6, 3), new THREE.MeshLambertMaterial({ map: jr, side: THREE.DoubleSide }), 1.6, 31, 2, g);
NV.flag = flag;
g.userData.decks = [{ x: 0, z: -0.5, hw: 3.6, hd: 15, y: 4 }, { x: 0, z: -13, hw: 3.8, hd: 3.4, y: 6.95 }];
return g;
},
function (G) {
var s = nvShip();
s.position.set(-790, 0, -170);
s.rotation.y = 0.45;
G.add(s);
NV.ship = s;
var cx = -600, cz = -160, h = nvHeight(cx, cz);
var tent = wMesh(new THREE.ConeGeometry(3.4, 4, 4), wM(0x8A7A5A), cx - 8, h + 2, cz + 6, G);
tent.rotation.y = 0.6;
NV.solids.push({ x: cx - 8, z: cz + 6, r: 3 });
var fire = wCone(0.6, 1.3, wB(0xFF8A2A, { fog: false }), cx, h + 0.65, cz, G, 7);
NV.pfire = fire;
for (var b = 0; b < 4; b++) {
var bar = wCyl(0.5, 0.5, 0.9, wM(0x6A4A2A), cx + 4 + b * 1.2, h + 0.45, cz - 5, G, 10);
}
var lb = new THREE.Group();
var lh = wMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM(0x5A3A22), 0, 0.6, 0, lb);
lh.scale.set(1.4, 0.8, 3.6);
lb.position.set(cx - 30, 0.2, cz - 14);
lb.rotation.y = 1.2;
G.add(lb);
},
function (G) {
var g = new THREE.Group(), m = wM(0x3A5A2A), belly = wM(0x8A9A5A);
var body = wSph(1, m, 0, 0, 0, g, 12);
body.scale.set(1.3, 0.6, 3.2);
var head = wBox(1.3, 0.6, 2.6, m, 0, 0.1, 4, g);
var jaw = wBox(1.2, 0.3, 2.4, belly, 0, -0.25, 4, g);
for (var t = 0; t < 8; t++) {
wCone(0.07, 0.2, wM(0xF4F0E0), -0.5 + (t % 2) * 1, -0.05, 3.2 + Math.floor(t / 2) * 0.5, g, 4).rotation.x = Math.PI;
}
[-1, 1].forEach(function (s) { wSph(0.18, wM(0xE8D84A), s * 0.45, 0.45, 3.4, g, 8); });
for (var k = 0; k < 6; k++) {
var tl = wBox(1 - k * 0.14, 0.4 - k * 0.04, 1.1, m, 0, 0, -3.3 - k * 1, g);
for (var r = 0; r < 2; r++)
wCone(0.12, 0.3, m, 0, 0.3, -3.3 - k * 1 + r * 0.4 - 0.2, g, 4);
}
for (var sp = 0; sp < 10; sp++)
wCone(0.15, 0.35, m, (sp % 2 - 0.5) * 0.6, 0.55, -2 + sp * 0.5, g, 4);
g.position.set(-700, -0.5, -60);
G.add(g);
NV.croc = g;
g.userData.a = 0;
},
function (G) {
function put(seed, o, x, z, talk, wander, y) {
var g = wPerson(seed, o);
var h = y !== undefined ? y : nvHeight(x, z);
g.position.set(x, h, z);
g.rotation.y = Math.random() * 6;
G.add(g);
var P = { g: g, wander: wander, talk: talk };
NV.people.push(P);
if (talk)
NV.talkers.push({ p: P, r: 4, name: talk.name, t: talk });
return P;
}
var pp = put("peterpan", { child: true, sex: "m", look: { top: 0x3A7A2A, topKind: "shirt", bottom: 0x2E6A24, shoes: 0x5A3A1E, hair: 0xB86A2A, hairStyle: "short", hat: "cap", hatColor: 0x3A7A2A } }, -110, 262, { name: "Peter Pan", persona: "You are Peter Pan, from J. M. Barrie's Peter and Wendy: the boy who would not grow up. You are brave, boastful, forgetful, joyful and a little heartless the way children are; you crow like a rooster when pleased, you love adventures, fighting pirates, and stories (especially stories about yourself). You live in Neverland with the Lost Boys and Tinker Bell, under the Hangman's Tree. Speak like a cocky, cheerful boy. Never be cruel; keep it all an adventure.", greet: "Cock-a-doodle-doo! I'm Peter Pan. You flew here all by yourself? Second to the right and straight on till morning! Do you want to fight pirates? Or meet the mermaids? Only, the mermaids don't like anyone but me." }, null);
NV.peter = pp;
var boys = [["Tootles", 0x8A6A4A, "The humblest of the Lost Boys; you missed most adventures because something always happened the moment you stepped round a corner. Gentle and kind."], ["Nibs", 0x6A4A2E, "Gay and debonair, the bravest of the Lost Boys after Peter."], ["Slightly", 0xA8885A, "The most conceited of the Lost Boys; you think you remember the days before you were lost, and you make whistles from the branches of trees."], ["Curly", 0x5A3A22, "A pickle: always in trouble, always owning up."], ["The First Twin", 0x7A5A3A, "One of the Twins; you are never quite sure which twin you are."], ["The Second Twin", 0x7A5A3A, "The other Twin; you are never quite sure which twin you are."]];
boys.forEach(function (b, i) {
var a = i / 6 * Math.PI * 2, x = -120 + Math.cos(a) * 14, z = 250 + Math.sin(a) * 14;
put("lostboy_" + i, { child: true, sex: "m", look: { top: b[1], topKind: "shirt", bottom: 0x5A4A3A, shoes: 0x3A2A1A, hat: "hood", hatColor: b[1] } }, x, z, { name: b[0], persona: "You are " + b[0] + ", one of the Lost Boys of Neverland in J. M. Barrie's Peter and Wendy: boys who fell out of their prams when nurses were looking the other way, and, if not claimed in seven days, were sent far away to Neverland. " + b[2] + " Peter Pan is your captain and you would do anything for him. Speak like an excited boy.", greet: "Hullo! Are you a new Lost Boy? Or a mother? We haven't had a mother since Wendy went home." }, { r: 16, sp: 2.2 });
});
var hook = put("captainhook", { sex: "m", look: { layer: "longcoat", layerColor: 0x8A1A22, top: 0xF0E8D8, bottom: 0x141414, shoes: 0x141414, hair: 0x0A0A0A, hairStyle: "long", hat: "brimmed", hatColor: 0x141414, beard: "mustache" } }, -602, -150, { name: "Captain James Hook", persona: "You are Captain James Hook of the Jolly Roger, from J. M. Barrie's Peter and Wendy: the only man Barbecue (Long John Silver) ever feared. You are elegant, melancholy, vain about your good form and your Eton education, and you have an iron hook where your right hand was before Peter Pan cut it off and threw it to a crocodile, who has followed you ever since hoping for the rest of you; it swallowed a clock, so you hear it coming. You hate Peter Pan. Speak in grand, mannered, theatrical sentences; be villainous but never gruesome; you may threaten to make people walk the plank, but it is all bluster.", greet: "Ah. A visitor to my shores. Good form, I hope? Speak quickly; I have a boy to catch. And if you hear a clock ticking, run." }, null);
NV.hook = hook;
put("mrsmee", { sex: "m", look: { top: 0x2A4A8A, topKind: "shirt", bottom: 0x3A2A1A, shoes: 0x141414, hat: "beanie", hatColor: 0xB82A2A, hairStyle: "bald", beard: "full" } }, -596, -158, { name: "Smee", persona: "You are Smee, the Irish boatswain of the Jolly Roger in J. M. Barrie's Peter and Wendy: a genial, oddly lovable pirate in spectacles who sews at his sewing machine and is devoted to Captain Hook. You are cheerful, simple, and kind-hearted for a pirate. Speak warmly, call people 'matey'.", greet: "Ahoy there, matey! Don't mind the Captain, his bark's worse than his bite. Mostly. Fancy a cup of tea?" }, null);
var crew = [["Starkey", 0xE8E0D0], ["Cecco", 0xB83A2A], ["Bill Jukes", 0x3A3A6A], ["Noodler", 0xD8C8A8], ["Cookson", 0x6A3A2A], ["Skylights", 0x2A2A2A]];
crew.forEach(function (c, i) {
var onShip = i < 3, x = onShip ? -790 + (i - 1) * 1.5 : -590 + Math.cos(i) * 7, z = onShip ? -170 + (i - 1) * 6 : -160 + Math.sin(i) * 7;
var P = put("pirate_" + i, { sex: "m", look: { top: c[1], topKind: "shirt", bottom: [0x3A2A1A, 0x2A2A3A, 0x5A4A3A][i % 3], shoes: 0x141414, hat: "bandana", hatColor: [0xB82A2A, 0x141414, 0x2A4A8A][i % 3], beard: i % 2 ? "full" : null } }, x, z, { name: c[0], persona: "You are " + c[0] + ", a pirate of Captain Hook's crew aboard the Jolly Roger in J. M. Barrie's Peter and Wendy. You are a rough, comic, superstitious pirate who fears the Captain, the crocodile and Peter Pan. Talk like a storybook pirate (arr, matey, shiver me timbers), boastful but cowardly. Keep it fun for children.", greet: "Arr! Who goes there? Ye're not the boy, are ye? Ye're not... Pan?" }, onShip ? null : { r: 8, sp: 1.2 }, onShip ? NV.ship.position.y + 4 : undefined);
if (onShip) {
P.deck = { x: (i - 1) * 1.5, z: (i - 1) * 6 };
}
});
var V = { x: 150, z: -470 };
put("tigerlily", { sex: "f", look: { top: 0xA8784A, topKind: "dress", bottom: 0x8A6040, shoes: 0x6A4A2A, skin: 0x9A6A48, hair: 0x141414, hairStyle: "braids", hat: "flowercrown", hatColor: 0xF4F0E8 } }, V.x + 4, V.z + 6, { name: "Tiger Lily", persona: "You are Tiger Lily, daughter of the chief of the People of the Bluff, the first people of Neverland, in a respectful retelling of J. M. Barrie's Peter and Wendy. You are brave, clever, proud and warm, a fine tracker, a fast runner and a leader; you are Peter Pan's friend because he saved you from drowning at Marooners' Rock when the pirates left you there, and your people have guarded the Lost Boys' home ever since. Speak in clear, natural, modern English: never broken English, never the old stereotypes. Talk about your people's ways on the island (the canoes, the weaving, the songs, keeping watch from the bluff) with pride and humour.", greet: "Welcome to the Bluff, traveller. You have the look of someone who flew in at dawn. My people keep watch over this island. Sit by the fire, if you like, and tell me what brings you." }, null);
var tasks = [["weaving", -6, -12], ["tending the fire", 3, -4], ["mending a canoe", -20, 52], ["keeping watch", 0, -40], ["telling a story", -5, 4], ["drying fish", 14, -6], ["singing", 6, 8]];
tasks.forEach(function (t, i) {
put("bluff_" + i, { sex: i % 2 ? "f" : "m", look: { top: [0x8A6A48, 0x6A4A30, 0xA8884A, 0x5A4A3A][i % 4], topKind: i % 2 ? "dress" : "shirt", bottom: 0x6A5038, shoes: 0x5A3E26, skin: [0x9A6A48, 0x8A5A3A, 0xA8785A][i % 3], hair: 0x141414, hairStyle: i % 2 ? "braids" : "long", hat: "none" } }, V.x + t[1], V.z + t[2], { name: "One of the People of the Bluff", persona: "You are one of the People of the Bluff, Tiger Lily's people, the first people of Neverland, in a respectful retelling of J. M. Barrie's story. Right now you are " + t[0] + ". You are friendly, dignified and good-humoured, and proud of your people's skills: tracking, canoes, weaving, songs and stories of the island's spirits. Speak in clear, natural, modern English: never broken English and never the old stereotypes.", greet: "Good morning. I'm " + t[0] + ". Tiger Lily is by the council fire, if you are looking for her." }, i === 3 ? null : { r: 6, sp: 0.8 });
});
},
function () {
var k = Math.min(1, WLD.t / 90);
return { top: new THREE.Color(0xF0A8B8).lerp(new THREE.Color(0x6AA8E8), k).getHex(), low: new THREE.Color(0xFFD8A8).lerp(new THREE.Color(0xC8E4F4), k).getHex(),
fog: new THREE.Color(0xFFD8B8).lerp(new THREE.Color(0xC8E0F0), k).getHex(), fogD: 0.0006, sun: 0.75 + 0.25 * k, sunCol: new THREE.Color(0xFFC890).lerp(new THREE.Color(0xFFF4E0), k).getHex(),
sunDir: [0.7, 0.15 + 0.45 * k, 0.5], hemi: 0.75, hemiCol: 0xEAE4F0, hemiGround: 0x4A6A3A, stars: Math.max(0, 0.5 - k) };
},
function (opt) {
NV.keepFly = (typeof canFly !== "undefined") ? canFly : false;
if (typeof canFly !== "undefined")
canFly = true;
var at = opt.at || { x: 1100, y: 70, z: 900 };
camera.position.set(this.base + at.x, at.y + 1.72, at.z);
yaw = Math.atan2(at.x, at.z);
pitch = -0.12;
if (typeof flyY !== "undefined")
flyY = at.y;
NV.home = false;
NV.tinkTold = false;
setStatus("<b>Morning.</b> Below you, the Never Sea, and an island that is somehow exactly as you always imagined it. <i>Second to the right, and straight on till morning.</i> In Neverland you can fly: Space to rise, C to sink.");
},
function (x, z) {
var s = NV.ship;
if (!s)
return null;
var dx = x - s.position.x, dz = z - s.position.z, c = Math.cos(-s.rotation.y), sn = Math.sin(-s.rotation.y), lx = dx * c + dz * sn, lz = -dx * sn + dz * c, best = null;
s.userData.decks.forEach(function (d) { if (Math.abs(lx - d.x) < d.hw && Math.abs(lz - d.z) < d.hd)
best = Math.max(best === null ? -9 : best, d.y + s.position.y); });
return best;
},
function (dt) {
var L = worldLocal(), t = WLD.t, G = WORLDS.neverland.g;
wWaterTick(NV.water, L.x, L.z, t);
var ry = (typeof yaw === "number") ? yaw : 0, fx = -Math.sin(ry), fz = -Math.cos(ry), rx = Math.cos(ry), rz = -Math.sin(ry);
var tk = NV.tink, tx = L.x + rx * 2.6 + fx * 1.6 + Math.sin(t * 0.5) * 0.25, tz = L.z + rz * 2.6 + fz * 1.6 + Math.cos(t * 0.4) * 0.25, ty = L.y + 0.5 + Math.sin(t * 0.7) * 0.15;
if (NV.peter && Math.hypot(L.x - NV.peter.g.position.x, L.z - NV.peter.g.position.z) < 40) {
var pg = NV.peter.g.position;
tx = pg.x + Math.sin(t * 0.5) * 1.2;
tz = pg.z + Math.cos(t * 0.5) * 1.2;
ty = pg.y + 2;
}
tk.position.lerp(new THREE.Vector3(tx, ty, tz), Math.min(1, dt * 1.5));
NV.cool -= dt;
if (NV.cool <= 0) {
NV.cool = 4 + Math.random() * 5;
if (typeof playTone === "function" && !NV.home) {
playTone(2093, 0.08);
setTimeout(function () { playTone(2637, 0.08); }, 90);
setTimeout(function () { playTone(3136, 0.1); }, 180);
}
}
if (NV.peter) {
var p = NV.peter.g, pa = t * 0.12;
p.position.set(-120 + Math.cos(pa) * 40, nvHeight(-120, 250) + 6 + Math.sin(t * 0.9) * 3, 250 + Math.sin(pa) * 40);
p.rotation.y = pa + Math.PI;
}
NV.people.forEach(function (P) {
if (P.wander)
wWander(P.g, dt, function (x, z) { return Math.max(nvHeight(x, z), 0); }, P.wander);
if (P.deck && NV.ship) {
var s = NV.ship, lx = P.deck.x + Math.sin(t * 0.3 + P.deck.z) * 1.5, lz = P.deck.z + Math.cos(t * 0.25) * 3, c = Math.cos(s.rotation.y), sn = Math.sin(s.rotation.y), wx = s.position.x + lx * c + lz * sn, wz = s.position.z - lx * sn + lz * c, dy = nvDeckAt(wx, wz);
P.g.position.set(wx, dy === null ? s.position.y + 4 : dy, wz);
}
});
if (NV.hook && !NV.hook.hooked) {
var hb = null;
NV.hook.g.traverse(function (o) { if (!hb && o.isBone && /^hand_r$/i.test(o.name))
hb = o; });
if (hb) {
NV.hook.hooked = 1;
var hk = new THREE.Group();
var steel = wM(0xC8CCD4);
var arc = wMesh(new THREE.TorusGeometry(0.06, 0.012, 6, 12, Math.PI * 1.3), steel, 0, 0.1, 0, hk);
arc.rotation.z = -0.4;
wCyl(0.015, 0.015, 0.12, steel, 0, 0.02, 0, hk, 6);
wCyl(0.04, 0.04, 0.04, wM(0x2A1A0E), 0, -0.04, 0, hk, 8);
hb.add(hk);
hk.scale.setScalar(1 / Math.max(0.001, hb.getWorldScale(new THREE.Vector3()).y) * NV.hook.g.getWorldScale(new THREE.Vector3()).y);
}
}
NV.mermaids.forEach(function (m) {
var u = m.userData;
if (!u.tailed) {
var pv = null, th = [];
m.traverse(function (o) { if (!o.isBone)
return; if (!pv && /^pelvis$/i.test(o.name))
pv = o; if (/^thigh_[lr]$/i.test(o.name))
th.push(o); });
if (pv) {
u.tailed = 1;
u.thighs = th;
if (u.tail)
u.tail.visible = false;
var tg = new THREE.Group(), tm = u.tail ? u.tail.children[0].material : wM(0x2F8A7A);
var t1 = wMesh(new THREE.CylinderGeometry(0.19, 0.14, 0.5, 12), tm, 0, -0.25, 0, tg), t2 = wMesh(new THREE.CylinderGeometry(0.14, 0.06, 0.45, 12), tm, 0, -0.72, 0, tg), fin = wMesh(new THREE.ConeGeometry(0.3, 0.32, 3), tm, 0, -1.05, 0, tg);
fin.scale.set(1.5, 1, 0.2);
fin.rotation.x = Math.PI;
u.tail2 = tg;
u.t2 = t2;
tg.position.set(0, u.sit ? 0.55 : 0.98, u.sit ? 0.08 : 0);
m.add(tg);
}
}
if (u.thighs)
u.thighs.forEach(function (b) { b.scale.setScalar(0.02); });
if (u.tail2) {
u.tail2.rotation.x = (u.sit ? -1.35 : 0.15) + Math.sin(WLD.t * (u.sit ? 1.3 : 2.2) + m.id) * 0.2;
}
});
NV.mermaids.forEach(function (m, i) { if (m.userData.sit) {
var tl = m.userData.tail;
if (tl)
tl.rotation.x = Math.sin(t * 1.3 + i) * 0.08;
}
else {
m.position.y = m.userData.y0 + Math.sin(t * 1.1 + i) * 0.15;
m.rotation.y += dt * 0.1;
if (m.userData.tail)
m.userData.tail.rotation.x = 0.8 + Math.sin(t * 2 + i) * 0.3;
} });
var cr = NV.croc;
cr.userData.a += dt * 0.05;
var ca = cr.userData.a, cx = -690 + Math.cos(ca) * 90, cz = -130 + Math.sin(ca * 1.3) * 80;
cr.rotation.y = Math.atan2(cx - cr.position.x, cz - cr.position.z);
cr.position.set(cx, -0.45 + Math.sin(t) * 0.08, cz);
var cd = Math.hypot(L.x - cx, L.z - cz);
if (cd < 70 && !NV.home) {
NV.tickAt = (NV.tickAt || 0) - dt;
if (NV.tickAt <= 0) {
NV.tickAt = 0.5;
NV.tock = !NV.tock;
if (typeof playTone === "function")
playTone(NV.tock ? 1500 : 1250, 0.03);
}
if (!NV.crocTold) {
NV.crocTold = 1;
setStatus("<b>Tick-tock. Tick-tock.</b> Somewhere close, in the water, a clock is ticking. Captain Hook would be running by now.");
}
}
[NV.fire, NV.vfire, NV.pfire].forEach(function (f, i) { if (f)
f.scale.set(1, 0.8 + Math.abs(Math.sin(t * 8 + i)) * 0.4, 1); });
if (NV.smoke)
NV.smoke.forEach(function (s, i) { s.position.y = 5.4 + ((t * 0.6 + i * 0.6) % 3); s.material.opacity = 0.45 * Math.sin(Math.PI * ((t * 0.6 + i * 0.6) % 3) / 3); });
if (NV.flag) {
var fp = NV.flag.geometry.attributes.position;
for (var i = 0; i < fp.count; i++) {
var fx = fp.getX(i);
fp.setZ(i, Math.sin(fx * 2 + t * 4) * 0.2 * (fx + 1.5) / 3);
}
fp.needsUpdate = true;
}
if (NV.ship) {
NV.ship.rotation.z = Math.sin(t * 0.5) * 0.02;
NV.ship.position.y = Math.sin(t * 0.6) * 0.15;
}
if (NV.nest) {
NV.nest.position.y = 0.4 + Math.sin(t * 0.8) * 0.2;
NV.nest.rotation.y += dt * 0.03;
}
if (NV.stream)
NV.stream.offset.y -= dt * 0.35;
if (NV.craft) {
NV.craft.position.y = Math.sin(t * 0.5) * 0.12;
NV.craft.rotation.z = Math.sin(t * 0.4) * 0.015;
}
if (NV.boats)
NV.boats.forEach(function (b) { b.a += dt * b.sp; b.g.position.set(b.x0 + Math.cos(b.a) * b.r, b.y + Math.sin(t * 1.2 + b.r) * 0.03, b.z0 + Math.sin(b.a) * b.r); b.g.rotation.y = -b.a + (b.sp < 0 ? Math.PI : 0); });
if (NV.flam)
NV.flam.forEach(function (f, i) { f.a += dt * 0.12; f.g.position.set(NV_FLAM.x + Math.cos(f.a) * f.r, f.y + Math.sin(t * 0.4 + i) * 0.8, NV_FLAM.z + Math.sin(f.a) * f.r); f.g.rotation.y = -f.a; (f.g.userData.wings || []).forEach(function (w) { w.rotation.z = w.userData.s * Math.sin(t * 1.6 + i) * 0.25; }); });
if (NV.wolf && NV.wolf.userData.tail)
NV.wolf.userData.tail.rotation.y = Math.sin(t * 1.1) * 0.3;
var near = null;
if (NV.home) {
if (Math.hypot(L.x + 120, L.z - 258) < 3.5)
near = { name: "The hollow tree", fn: nvOutOfHome };
}
else {
if (Math.hypot(L.x + 120, L.z - 254.4) < 2.6 && L.y < nvHeight(-120, 250) + 4)
near = { name: "Peter's hollow tree", fn: nvIntoHome, verb: "squeeze down it" };
near = near || wPickNear(NV.talkers, L);
if (!near && tk.position.distanceTo(new THREE.Vector3(L.x, L.y, L.z)) < 4 && !NV.tinkTold)
near = { name: "Tinker Bell", fn: function () { NV.tinkTold = true; worldPrompt(null); wTalk({ name: "Tinker Bell", persona: "You are Tinker Bell, the fairy from J. M. Barrie's Peter and Wendy: tiny, glowing, jealous, fiercely loyal to Peter, quick-tempered and kind by turns. Fairies are so small they have room for only one feeling at a time. You speak in the tinkle of bells: write your reply as *jingling sounds* followed by a translation in brackets, short and sassy.", greet: "*a cross little jingle, then a softer one* (Oh, all right. Hold still: a sprinkle of fairy dust, and think a lovely wonderful thought. There. Now you can fly.)" }); } };
}
if (near)
worldPrompt("<b>" + esc(near.name) + "</b> · <b>press E</b> to " + (near.verb || (near.fn ? "look" : "talk")), near.fn ? near.fn : function () { wTalk(near.t); });
else
worldPrompt(null);
var where = NV.home ? "the Home Under the Ground" : nvWhere(L.x, L.z);
worldBanner("<b>Neverland</b> · " + esc(where) + (NV.home ? "" : " · you can fly: Space and C"));
},
function (x, z) {
if (Math.hypot(x - 680, z - 60) < 160)
return "Mermaids' Lagoon";
if (Math.hypot(x + 700, z + 140) < 200)
return "Kidd's Creek, where the Jolly Roger lies";
if (Math.hypot(x - 150, z + 470) < 120)
return "the Bluff";
if (Math.hypot(x + 200, z - 880) < 120)
return "the coral reefs";
if (Math.hypot(x + 260, z - 140) < 40)
return "the Never Wood, by the hut fast going to decay";
if (Math.hypot(x - 300, z - 300) < 40)
return "the Tailors' Hollow";
if (Math.hypot(x + 300, z - 560) < 90)
return "the River Caves";
if (Math.hypot(x - 250, z - 500) < 40)
return "the sands, by John's boat";
if (Math.hypot(x - 200, z - 150) < 30)
return "the wood, by Wendy's house of leaves";
if (Math.hypot(x + 450, z) < 60)
return "the Flamingo Lagoon";
if (Math.hypot(x - 350, z + 100) < 35)
return "the Round Pond";
if (Math.hypot(x - 450, z + 250) < 30)
return "the glade of chocolate pudding day";
if (Math.hypot(x + 120, z - 250) < 90)
return "the Never Wood, by the Hangman's Tree";
if (Math.hypot(x - 40, z + 80) < 200)
return "the slopes of the Never Peak";
return Math.hypot(x, z) > NV_R + 40 ? "over the Never Sea" : "the island";
}
];
});
