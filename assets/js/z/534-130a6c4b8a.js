/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(534, function () {
return [
function (detail, seed, amt) {
var g = new THREE.IcosahedronGeometry(1, detail), p = g.attributes.position, v = new THREE.Vector3(), key = {}, R = wRand(seed);
var dents = [];
for (var i = 0; i < 5; i++) {
dents.push([new THREE.Vector3(R() - 0.5, R() - 0.5, R() - 0.5).normalize(), 0.25 + R() * 0.35, 0.12 + R() * 0.18]);
}
for (var j = 0; j < p.count; j++) {
v.set(p.getX(j), p.getY(j), p.getZ(j));
var k = v.x.toFixed(3) + "," + v.y.toFixed(3) + "," + v.z.toFixed(3);
if (key[k] === undefined) {
var n = v.clone().normalize(), f = 1 + (wNoise(n.x * 2.3 + seed, n.y * 2.3 + n.z * 1.7, seed) - 0.5) * amt + (wNoise(n.x * 6 + seed, n.z * 6 - n.y * 3, seed + 3) - 0.5) * amt * 0.35;
dents.forEach(function (d) { var c = n.dot(d[0]); if (c > 1 - d[1])
f -= d[2] * (c - (1 - d[1])) / d[1]; });
key[k] = f;
}
v.multiplyScalar(key[k]);
p.setXYZ(j, v.x, v.y, v.z);
}
g.computeVertexNormals();
return g;
},
function () {
if (SPW.rtex)
return SPW.rtex;
var R = wRand(9091);
SPW.rtex = wTex(128, 128, function (x, W, H) {
x.fillStyle = "#8A8580";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 90; i++) {
var v = 100 + R() * 90 | 0;
x.fillStyle = "rgba(" + v + "," + (v - 4) + "," + (v - 10) + ",0.35)";
x.beginPath();
x.ellipse(R() * W, R() * H, 3 + R() * 14, 2 + R() * 9, R() * 3, 0, 7);
x.fill();
}
for (var c = 0; c < 26; c++) {
var cx = R() * W, cy = R() * H, r = 2 + R() * 7;
x.fillStyle = "rgba(30,28,26,0.45)";
x.beginPath();
x.arc(cx, cy, r, 0, 7);
x.fill();
x.fillStyle = "rgba(210,205,196,0.25)";
x.beginPath();
x.arc(cx - r * 0.3, cy - r * 0.3, r * 0.7, 0, 7);
x.fill();
}
for (var s = 0; s < 1800; s++) {
var g = R() < 0.5 ? 20 : 230;
x.fillStyle = "rgba(" + g + "," + g + "," + g + "," + (R() * 0.12) + ")";
x.fillRect(R() * W, R() * H, 1, 1);
}
x.strokeStyle = "rgba(26,24,22,0.4)";
x.lineWidth = 1;
for (var k = 0; k < 14; k++) {
var px = R() * W, py = R() * H;
x.beginPath();
x.moveTo(px, py);
for (var q = 0; q < 4; q++) {
px += (R() - 0.5) * 22;
py += (R() - 0.5) * 22;
x.lineTo(px, py);
}
x.stroke();
}
});
return SPW.rtex;
},
function (h, r) {
var L = sbLite(), im = null;
h.children.forEach(function (o) { if (o.isInstancedMesh && o.geometry && o.geometry.type === "DodecahedronGeometry")
im = o; });
var mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: spwRockTex() }), c = new THREE.Color(), R = wRand(5151);
var tones = [0x5A554F, 0x4A4642, 0x6A6258, 0x3E3A36, 0x5E5248, 0x726A60];
if (im) {
var big = spwRockGeo(L ? 1 : 2, 17, 0.55);
im.geometry = big;
im.material = mat;
for (var i = 0; i < im.count; i++) {
c.setHex(tones[R() * tones.length | 0]).multiplyScalar(0.8 + R() * 0.4);
im.setColorAt(i, c);
}
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
}
var n = L ? 260 : 900, rub = new THREE.InstancedMesh(spwRockGeo(0, 29, 0.7), mat, n), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), p = new THREE.Vector3();
for (var j = 0; j < n; j++) {
var a = R() * Math.PI * 2, d = r * 1.8 + R() * r * 4.4, y = (R() - 0.5) * r * 0.9;
p.set(Math.cos(a) * d, y, Math.sin(a) * d);
e.set(R() * 3, R() * 3, R() * 3);
q.setFromEuler(e);
var k = 0.3 + Math.pow(R(), 2) * 2.2;
s.set(k, k * (0.6 + R() * 0.5), k * (0.8 + R() * 0.5));
m.compose(p, q, s);
rub.setMatrixAt(j, m);
c.setHex(tones[R() * tones.length | 0]).multiplyScalar(0.75 + R() * 0.45);
rub.setColorAt(j, c);
}
rub.frustumCulled = false;
rub.raycast = function () { };
h.add(rub);
var hm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: (typeof spHullTex === "function" ? spHullTex() : null), side: THREE.DoubleSide }), pg = new THREE.PlaneGeometry(1, 1, 3, 2), pp = pg.attributes.position;
for (var u = 0; u < pp.count; u++) {
var xx = pp.getX(u), yy = pp.getY(u);
pp.setZ(u, xx * xx * 0.35 + Math.sin(yy * 4) * 0.05);
pp.setX(u, xx + (Math.abs(yy) > 0.4 ? (wNoise(xx * 9, yy * 9, 3) - 0.5) * 0.3 : 0));
}
pg.computeVertexNormals();
var np = L ? 24 : 70, pl = new THREE.InstancedMesh(pg, hm, np);
for (var w = 0; w < np; w++) {
var a2 = R() * Math.PI * 2, d2 = r * 2.1 + R() * r * 3.2;
p.set(Math.cos(a2) * d2, (R() - 0.5) * r * 0.6, Math.sin(a2) * d2);
e.set(R() * 3, R() * 3, R() * 3);
q.setFromEuler(e);
var k2 = 2 + R() * 7;
s.set(k2, k2 * (0.4 + R() * 0.5), 1);
m.compose(p, q, s);
pl.setMatrixAt(w, m);
c.setHex(R() < 0.45 ? 0x8A3A22 : (R() < 0.5 ? 0xA8ACB4 : 0x6A6E74)).multiplyScalar(0.7 + R() * 0.3);
pl.setColorAt(w, c);
}
pl.frustumCulled = false;
pl.raycast = function () { };
h.add(pl);
if (typeof wGlow === "function") {
for (var z = 0; z < (L ? 4 : 9); z++) {
var gl = wGlow(z % 2 ? 0x8A7A6A : 0x6A625A, r * (2.5 + R() * 2.5), 0.07);
var a3 = R() * Math.PI * 2, d3 = r * 2 + R() * r * 3;
gl.position.set(Math.cos(a3) * d3, (R() - 0.5) * r * 0.4, Math.sin(a3) * d3);
h.add(gl);
}
}
},
function (col) {
var g = new THREE.Group(), hull = new THREE.MeshLambertMaterial({ color: col, map: (typeof spHullTex === "function" ? spHullTex() : null) }), dark = new THREE.MeshLambertMaterial({ color: 0x2A2E36 });
var body = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.5, 7, 10), hull);
body.rotation.x = Math.PI / 2;
g.add(body);
var nose = new THREE.Mesh(new THREE.SphereGeometry(1.1, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), hull);
nose.rotation.x = Math.PI / 2;
nose.position.z = 3.5;
g.add(nose);
var win = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.4, 0.6), new THREE.MeshBasicMaterial({ color: 0xBFE4FF }));
win.position.set(0, 0.75, 3.6);
g.add(win);
[-1, 1].forEach(function (sd) {
var pod = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 3.2, 8), dark);
pod.rotation.x = Math.PI / 2;
pod.position.set(sd * 2, -0.2, -2);
g.add(pod);
var wing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 2.2), hull);
wing.position.set(sd * 1.4, -0.2, -1.6);
g.add(wing);
var lt = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 4), new THREE.MeshBasicMaterial({ color: sd < 0 ? 0xFF3A30 : 0x40FF70 }));
lt.position.set(sd * 2.3, -0.2, -0.4);
g.add(lt);
var fl = new THREE.Mesh(new THREE.CircleGeometry(0.45, 10), new THREE.MeshBasicMaterial({ color: 0x9AD0FF, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
fl.position.set(sd * 2, -0.2, -3.65);
fl.rotation.y = Math.PI;
g.add(fl);
});
return g;
},
function () {
var g = new THREE.Group(), y = new THREE.MeshLambertMaterial({ color: 0xC8A040 }), d = new THREE.MeshLambertMaterial({ color: 0x3A3E46 });
g.add(new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.6, 2.2), y));
[-1, 1].forEach(function (s) { var a = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.6, 5), d); a.rotation.z = Math.PI / 2; a.position.set(s * 1.9, 0, 0.6); a.rotation.y = s * 0.4; g.add(a); });
var l = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 4), new THREE.MeshBasicMaterial({ color: 0xFFB040 }));
l.position.set(0, 1, 0);
g.add(l);
return g;
},
function (g) {
var k = g.userData && g.userData.k;
if (!k || g.userData.spw)
return;
g.userData.spw = 1;
var L = sbLite(), R = wRand(k.length * 977);
var cols = [0xD8DCE2, 0xC8CCD4, 0xB8C0CC];
for (var i = 0; i < (L ? 2 : 4); i++) {
var sh = spwShuttle(cols[i % 3]);
g.add(sh);
SPW.ships.push({ o: sh, g: g, ph: i / (L ? 2 : 4) + R() * 0.1, sp: 1 / (70 + R() * 40), side: i % 2 ? 1 : -1 });
}
for (var t = 0; t < (L ? 2 : 4); t++) {
var tg = spwTug();
g.add(tg);
SPW.tugs.push({ o: tg, ph: R() * 6.28, sp: 0.05 + R() * 0.04, r: 47 + R() * 5, y: (R() - 0.5) * 14 });
}
var cc = [0x6A7A8A, 0xB86A3A, 0x3A5A8A, 0x8A8A6A, 0xA8ACB4], box = new THREE.BoxGeometry(3, 3, 5), n = L ? 10 : 24, im = new THREE.InstancedMesh(box, new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: (typeof spHullTex === "function" ? spHullTex() : null) }), n), m = new THREE.Matrix4(), q = new THREE.Quaternion(), c = new THREE.Color(), v = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
for (var b = 0; b < n; b++) {
var a = b / n * Math.PI * 2 * 2, rr = 10.6 + (b % 2) * 3.1;
v.set(Math.cos(a) * rr, Math.sin(a) * rr, -16 - (b >= n / 2 ? 6 : 0));
q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), a);
m.compose(v, q, s);
im.setMatrixAt(b, m);
c.setHex(cc[R() * cc.length | 0]);
im.setColorAt(b, c);
}
im.raycast = function () { };
g.add(im);
},
function (dt) {
SPW.t += Math.min(dt || 0.016, 0.1);
var T = SPW.t;
SPW.ships.forEach(function (s) {
var u = (s.ph + T * s.sp) % 1, o = s.o, x, y, z, dx, dz;
if (u < 0.42) {
var f = u / 0.42;
z = 36 + f * f * 300;
x = s.side * 5;
y = 0;
dx = 0;
dz = 1;
}
else if (u < 0.58) {
var a = (u - 0.42) / 0.16 * Math.PI;
z = 336 + Math.sin(a) * 40;
x = s.side * (5 - (1 - Math.cos(a)) * 0.5 * 10) + s.side * Math.sin(a) * 30;
y = Math.sin(a) * 6;
dx = -s.side * Math.sin(a);
dz = Math.cos(a);
}
else {
var f2 = (u - 0.58) / 0.42;
z = 336 - (1 - (1 - f2) * (1 - f2)) * 300;
x = -s.side * 5;
y = 0;
dx = 0;
dz = -1;
}
o.position.set(x, y, z);
o.rotation.set(0, Math.atan2(dx, dz), 0);
o.visible = !(u > 0.995 || u < 0.005);
});
SPW.tugs.forEach(function (t) { var a = t.ph + T * t.sp; t.o.position.set(Math.cos(a) * t.r, Math.sin(a) * t.r, t.y + 12); t.o.rotation.set(0, 0, a); });
}
];
});
