/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(496, function () {
"use strict";
return [
function (map) {
if (!map || !map.image)
return null;
if (map.userData && map.userData.glfAvg)
return map.userData.glfAvg;
var im = map.image, c = new THREE.Color(1, 1, 1);
try {
if (im.data && im.width) {
var d = im.data, st = Math.max(4, ((d.length / 4 / 400) | 0) * 4), r = 0, g = 0, b = 0, n = 0, sc = d instanceof Float32Array ? 1 : 255;
for (var i = 0; i < d.length; i += st) {
r += d[i];
g += d[i + 1];
b += d[i + 2];
n++;
}
c.setRGB(r / n / sc, g / n / sc, b / n / sc);
}
else {
var cv = document.createElement("canvas");
cv.width = cv.height = 8;
var x = cv.getContext("2d");
x.drawImage(im, 0, 0, 8, 8);
var px = x.getImageData(0, 0, 8, 8).data, r2 = 0, g2 = 0, b2 = 0;
for (var j = 0; j < px.length; j += 4) {
r2 += px[j];
g2 += px[j + 1];
b2 += px[j + 2];
}
c.setRGB(r2 / 64 / 255, g2 / 64 / 255, b2 / 64 / 255);
}
}
catch (e) {
return null;
}
map.userData = map.userData || {};
map.userData.glfAvg = c;
return c;
},
function (m) {
var c = glfTint(m), mp = m.material && m.material.map;
if (mp) {
var a = glfAvgMap(mp);
if (a)
c.multiply(a);
}
var h = {};
c.getHSL(h);
if (h.h >= 0.17 && h.h <= 0.45 && h.s > 0.15 && h.l > 0.08)
return "grass";
if (h.h >= 0.06 && h.h < 0.17 && h.s > 0.25 && h.l < 0.7) {
var bb = new THREE.Box3().setFromObject(m);
if (bb.max.y - bb.min.y > 1.5 && m.geometry.attributes.position.count >= 200)
return h.l > 0.45 ? "sand" : "earth";
}
return null;
},
function (m) {
var c = new THREE.Color(1, 1, 1);
if (m.material && m.material.color)
c.copy(m.material.color);
var ca = m.geometry.attributes.color;
if (ca) {
var r = 0, g = 0, b = 0, n = 0, st = Math.max(1, (ca.count / 300) | 0);
for (var i = 0; i < ca.count; i += st) {
r += ca.getX(i);
g += ca.getY(i);
b += ca.getZ(i);
n++;
}
c.multiply(new THREE.Color(r / n, g / n, b / n));
}
return c;
},
function (key, W) {
var G = W.g, lite = typeof LITE !== "undefined" && !!LITE, base = W.base || 0;
G.updateMatrixWorld(true);
var grounds = [], box = new THREE.Box3();
G.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh || !m.geometry || !m.geometry.attributes.position)
return;
var k = glfKindOf(m) || (m.material && !Array.isArray(m.material) && !m.material.transparent && m.geometry.attributes.position.count >= 4 ? glfKindByColour(m) : null);
if (!k)
return;
box.setFromObject(m);
var sx = box.max.x - box.min.x, sz = box.max.z - box.min.z;
if (sx < 120 || sz < 120 || box.max.y - box.min.y > Math.max(sx, sz) * 0.5)
return;
grounds.push({ m: m, k: k, b: box.clone() });
});
GLF.last = { key: key, grounds: grounds.map(function (g) { return g.k; }) };
if (!grounds.length)
return;
var P = camera.position, cx = P.x - base, cz = P.z, HALF = lite ? 400 : 800, MS = 2;
var x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
grounds.forEach(function (g) { x0 = Math.min(x0, g.b.min.x - base); x1 = Math.max(x1, g.b.max.x - base); z0 = Math.min(z0, g.b.min.z); z1 = Math.max(z1, g.b.max.z); });
x0 = Math.max(x0, cx - HALF);
x1 = Math.min(x1, cx + HALF);
z0 = Math.max(z0, cz - HALF);
z1 = Math.min(z1, cz + HALF);
var NX = Math.ceil((x1 - x0) / MS) + 1, NZ = Math.ceil((z1 - z0) / MS) + 1;
GLF.last.grid = [NX, NZ, x0, x1, z0, z1];
if (NX < 4 || NZ < 4)
return;
var H = new Float32Array(NX * NZ).fill(-1e9), KIND = new Uint8Array(NX * NZ), CLR = new Uint8Array(NX * NZ), BLK = new Int8Array(NX * NZ);
var names = Object.keys(GLF.kinds), tints = {};
grounds.forEach(function (g) { if (!tints[g.k])
tints[g.k] = glfTint(g.m); });
var jobs = [];
grounds.forEach(function (g) { jobs.push({ m: g.m, mode: 0, kind: names.indexOf(g.k) + 1 }); });
var gset = new Set(grounds.map(function (g) { return g.m; }));
G.traverse(function (m) {
if (!m.isMesh || gset.has(m) || !m.geometry || !m.geometry.attributes.position || !m.visible)
return;
if (m.isInstancedMesh)
jobs.push({ m: m, mode: 2 });
else
jobs.push({ m: m, mode: 1 });
});
var gi = 0, ti = 0, v = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], M = new THREE.Matrix4(), MI = new THREE.Matrix4(), bs = new THREE.Sphere(), Gp = G.position;
function cell(x, z) { var i = Math.round((x - x0) / MS), j = Math.round((z - z0) / MS); return (i < 0 || j < 0 || i >= NX || j >= NZ) ? -1 : i * NZ + j; }
function tri(a, b, c, mode, kind) {
var mnx = Math.min(a.x, b.x, c.x), mxx = Math.max(a.x, b.x, c.x), mnz = Math.min(a.z, b.z, c.z), mxz = Math.max(a.z, b.z, c.z);
if (mxx < x0 || mnx > x1 || mxz < z0 || mnz > z1)
return;
var d = (b.z - c.z) * (a.x - c.x) + (c.x - b.x) * (a.z - c.z);
if (Math.abs(d) < 1e-9)
return;
var i0 = Math.max(0, Math.ceil((mnx - x0) / MS)), i1 = Math.min(NX - 1, Math.floor((mxx - x0) / MS)), j0 = Math.max(0, Math.ceil((mnz - z0) / MS)), j1 = Math.min(NZ - 1, Math.floor((mxz - z0) / MS));
for (var i = i0; i <= i1; i++) {
var x = x0 + i * MS;
for (var j = j0; j <= j1; j++) {
var z = z0 + j * MS;
var l1 = ((b.z - c.z) * (x - c.x) + (c.x - b.x) * (z - c.z)) / d, l2 = ((c.z - a.z) * (x - c.x) + (a.x - c.x) * (z - c.z)) / d, l3 = 1 - l1 - l2;
if (l1 < -0.02 || l2 < -0.02 || l3 < -0.02)
continue;
var y = l1 * a.y + l2 * b.y + l3 * c.y, k = i * NZ + j;
if (mode === 0) {
if (y > H[k]) {
H[k] = y;
KIND[k] = kind;
}
}
else if (H[k] > -1e8 && y > H[k] - 0.25 && y < H[k] + 1.6)
CLR[k] = 1;
}
}
}
function work() {
if (!G.parent || (!G.visible && WLD.w !== W)) {
G.userData.glf = 0;
return;
}
var t0 = performance.now();
while (gi < jobs.length && performance.now() - t0 < (lite ? 4 : 7)) {
var J = jobs[gi], m = J.m, geo = m.geometry, pos = geo.attributes.position, idx = geo.index, n = idx ? idx.count : pos.count;
M.copy(m.matrixWorld);
M.premultiply(MI.makeTranslation(-Gp.x, -Gp.y, -Gp.z));
if (J.mode === 2) {
if (!geo.boundingSphere)
geo.computeBoundingSphere();
var cnt = Math.min(m.count, 4000);
for (var q = 0; q < cnt; q++) {
m.getMatrixAt(q, MI);
MI.premultiply(M);
bs.copy(geo.boundingSphere).applyMatrix4(MI);
if (bs.radius > 12 || bs.radius < 0.15)
continue;
var r = bs.radius * 0.8 + 0.3, c0 = bs.center;
for (var ox = -r; ox <= r; ox += MS)
for (var oz = -r; oz <= r; oz += MS) {
if (ox * ox + oz * oz > r * r)
continue;
var k2 = cell(c0.x + ox, c0.z + oz);
if (k2 >= 0 && H[k2] > -1e8 && c0.y - bs.radius < H[k2] + 1)
CLR[k2] = 1;
}
}
gi++;
ti = 0;
continue;
}
if (J.mode === 1) {
if (!geo.boundingBox)
geo.computeBoundingBox();
box.copy(geo.boundingBox).applyMatrix4(M);
if (box.max.x < x0 || box.min.x > x1 || box.max.z < z0 || box.min.z > z1 || box.min.y > 200) {
gi++;
ti = 0;
continue;
}
var kc = cell((box.min.x + box.max.x) / 2, (box.min.z + box.max.z) / 2);
if (kc >= 0 && H[kc] > -1e8 && box.min.y > H[kc] + 1.6) {
gi++;
ti = 0;
continue;
}
}
var end = Math.min(n, ti + 6000 * 3);
for (; ti < end; ti += 3) {
var a = idx ? idx.getX(ti) : ti, b = idx ? idx.getX(ti + 1) : ti + 1, c = idx ? idx.getX(ti + 2) : ti + 2;
v[0].fromBufferAttribute(pos, a).applyMatrix4(M);
v[1].fromBufferAttribute(pos, b).applyMatrix4(M);
v[2].fromBufferAttribute(pos, c).applyMatrix4(M);
if (J.mode === 1) {
var ux = v[1].x - v[0].x, uy = v[1].y - v[0].y, uz = v[1].z - v[0].z, wx = v[2].x - v[0].x, wy = v[2].y - v[0].y, wz = v[2].z - v[0].z;
var nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx, nl = Math.hypot(nx, ny, nz);
if (nl < 1e-9 || Math.abs(ny) / nl < 0.6)
continue;
}
tri(v[0], v[1], v[2], J.mode, J.kind);
}
if (ti >= n) {
gi++;
ti = 0;
}
}
if (gi < jobs.length) {
setTimeout(work, 0);
return;
}
GLF.last.jobs = jobs.length;
grow0();
}
function grow0() {
if (typeof aupMeadow !== "function")
return;
function hAt(x, z) {
var fx = (x - x0) / MS, fz = (z - z0) / MS, i = Math.floor(fx), j = Math.floor(fz);
if (i < 0 || j < 0 || i >= NX - 1 || j >= NZ - 1)
return 0;
var tx = fx - i, tz = fz - j, a = H[i * NZ + j], b = H[(i + 1) * NZ + j], c = H[i * NZ + j + 1], d = H[(i + 1) * NZ + j + 1];
if (a < -1e8 || b < -1e8 || c < -1e8 || d < -1e8)
return Math.max(a, b, c, d);
return (a * (1 - tx) + b * tx) * (1 - tz) + (c * (1 - tx) + d * tx) * tz;
}
function ok(k, x, z) {
if (CLR[k] || H[k] < -1e8)
return false;
if (BLK[k] === 0) {
var hit = false;
try {
hit = typeof W.block === "function" && !!W.block(x, z, H[k]);
}
catch (e) { }
BLK[k] = hit ? -1 : 1;
}
return BLK[k] === 1;
}
var out = new THREE.Group();
out.name = "glf-cover";
G.add(out);
names.forEach(function (nm, ix) {
var K = GLF.kinds[nm], present = false;
for (var q = 0; q < KIND.length; q++)
if (KIND[q] === ix + 1) {
present = true;
break;
}
if (!present)
return;
var t = tints[nm], base0 = new THREE.Color(K.col[0]), lush = new THREE.Color(K.col[1]), dry = new THREE.Color(K.col[2]);
var hsl = {};
t.getHSL(hsl);
if (nm === "grass" && hsl.s > 0.18 && (hsl.h < 0.12 || hsl.h > 0.45)) {
base0.lerp(t, 0.55);
lush.lerp(t.clone().multiplyScalar(0.8), 0.55);
}
var grow = function (x, z) { var k = cell(x, z); return k >= 0 && KIND[k] === ix + 1 && ok(k, x, z); };
aupMeadow(out, { lite: lite, origin: base, start: [camera.position.x - base, camera.position.z], height: hAt, grow: grow, hMin: K.h, hVar: K.v, dens: K.dens, seed: (key.length * 131 + ix * 17) % 997,
cols: { base: base0.getHex(), lush: lush.getHex(), dry: dry.getHex() } });
if (K.flowers && !lite) {
var fc = [0xE8D04A, 0xF0F0E8, 0xC86AB0, 0x8A7AE0, 0xE87A4A][(key.length * 7) % 5];
aupMeadow(out, { lite: lite, origin: base, start: [camera.position.x - base, camera.position.z], height: hAt, grow: grow, hMin: 0.1, hVar: 0.08, dens: -0.5, seed: (key.length * 53 + ix) % 991 + 5,
cols: { base: fc, lush: new THREE.Color(fc).multiplyScalar(0.8).getHex(), dry: 0xF4F0E0 } });
}
});
}
setTimeout(work, 400);
}
];
});
