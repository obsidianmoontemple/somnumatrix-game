/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(343, function () {
"use strict";
return [
function (x, z) {
var h = (wFbm(x * 0.007, z * 0.007, 515, 3) - 0.5) * 6 + 1.6 * Math.sin(x * 0.011 + 0.7) * Math.cos(z * 0.009);
var d = Math.hypot(x, z);
if (d > KZ_RIM) {
var e = Math.min(d - KZ_RIM, 150);
h += e * e * 0.003;
}
var hd = Math.hypot(x - KZ_SITE.lanterns.x, z - KZ_SITE.lanterns.z);
if (hd < 70) {
var k = 1 - hd / 70;
h += 11 * k * k * (3 - 2 * k);
}
return h;
},
function (x, z) {
var h = kzRaw(x, z);
for (var i = 0; i < KZ_SITES.length; i++) {
var s = KZ_SITES[i], d = Math.hypot(x - s[1], z - s[2]);
if (d >= s[3] + 18)
continue;
if (s[5] === undefined)
s[5] = kzRaw(s[1], s[2]);
var k = d <= s[3] ? 1 : 1 - (d - s[3]) / 18;
k = k * k * (3 - 2 * k);
h = h + (s[5] - h) * k;
}
var p = KZ_SITE.pond, pd = Math.hypot(x - p.x, z - p.z);
if (pd < p.r - 2) {
var dep = Math.min(1.1, (p.r - 2 - pd) * 0.3);
h -= dep;
var id = Math.hypot(x - (p.x - 6), z - (p.z - 8));
if (id < 7)
h = Math.max(h, kzPondTop() + 0.35 - Math.max(0, id - 4) * 0.25);
}
return h;
},
function (p, x, z, pad) {
pad = pad || 0;
var dx = x - p.x, dz = z - p.z;
if (p.r !== undefined)
return dx * dx + dz * dz <= (p.r + pad) * (p.r + pad);
if (p.r1 !== undefined) {
var d = Math.hypot(dx, dz);
return d >= p.r0 - pad && d <= p.r1 + pad;
}
var c = Math.cos(p.rot || 0), s = Math.sin(p.rot || 0), lx = dx * c - dz * s, lz = dx * s + dz * c;
return Math.abs(lx) <= p.hw + pad && Math.abs(lz) <= p.hd + pad;
},
function (x, z, feet) {
if (worldSolidAt(KZ.solids, x, z, feet))
return true;
if (typeof kzZooBlock === "function" && kzZooBlock(x, z, feet))
return true;
var on = KZ.onPlat;
if (on && on.rail) {
var top = typeof on.top === "function" ? on.top() : on.top;
if (feet > top - 0.4) {
for (var i = 0; i < KZ.plats.length; i++) {
var p = KZ.plats[i], t = typeof p.top === "function" ? p.top() : p.top;
if (Math.abs(t - top) < 0.7 && kzInPlat(p, x, z))
return false;
}
if (KZ.exits)
for (var j = 0; j < KZ.exits.length; j++) {
var e = KZ.exits[j];
if (Math.hypot(x - e.x, z - e.z) < e.r)
return false;
}
return true;
}
}
return false;
},
function (list) {
var n = 0;
list.forEach(function (g) { n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), o = 0;
list.forEach(function (g) {
var P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv, c = P.count;
pos.set(P.array.subarray(0, c * 3), o * 3);
if (N)
nor.set(N.array.subarray(0, c * 3), o * 3);
if (U)
uv.set(U.array.subarray(0, c * 2), o * 2);
o += c;
g.dispose();
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
G.computeBoundingSphere();
return G;
},
function (root) {
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), buckets = {}, drop = [];
root.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh || m.isSkinnedMesh)
return;
for (var p = m; p && p !== root; p = p.parent)
if (p.userData.keep)
return;
for (var q = m; q && q !== root; q = q.parent)
if (q.userData.limbs)
return;
if (m.material.transparent || m.material.map)
return;
var geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
if (!geo.attributes.normal)
geo.computeVertexNormals();
if (!geo.attributes.uv)
geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld));
var k = m.material.uuid;
(buckets[k] || (buckets[k] = { mat: m.material, list: [] })).list.push(geo);
drop.push(m);
});
drop.forEach(function (m) { if (m.parent)
m.parent.remove(m); if (m.geometry)
m.geometry.dispose(); });
Object.keys(buckets).forEach(function (k) {
var b = buckets[k];
for (var i = 0; i < b.list.length; i += 1500) {
var mesh = new THREE.Mesh(kzMerge(b.list.slice(i, i + 1500)), b.mat);
mesh.name = "kz-bake";
root.add(mesh);
}
});
var empty = [];
root.traverse(function (o) { if (o !== root && o.type === "Group" && !o.children.length && !o.userData.keep)
empty.push(o); });
empty.forEach(function (o) { if (o.parent)
o.parent.remove(o); });
},
function (kind) {
if (KZ_IGEO[kind])
return KZ_IGEO[kind];
var g;
switch (kind) {
case "ball":
g = new THREE.IcosahedronGeometry(0.5, 1);
break;
case "dot":
g = new THREE.SphereGeometry(0.5, 8, 6);
g.scale(1, 0.35, 1);
break;
case "bloom":
g = new THREE.IcosahedronGeometry(0.5, 0);
break;
case "petal":
g = new THREE.SphereGeometry(0.5, 8, 4);
g.scale(1, 0.18, 0.5);
g.translate(0.5, 0, 0);
break;
case "stalk":
g = new THREE.CylinderGeometry(0.5, 0.5, 1, 6);
g.translate(0, 0.5, 0);
break;
case "tuft":
g = new THREE.ConeGeometry(0.5, 1, 4);
g.translate(0, 0.5, 0);
break;
case "canopy":
g = new THREE.IcosahedronGeometry(0.5, 1);
break;
case "trunk":
g = new THREE.CylinderGeometry(0.35, 0.5, 1, 8);
g.translate(0, 0.5, 0);
break;
case "flag":
g = new THREE.ConeGeometry(0.5, 1, 3);
g.translate(0, 0.5, 0);
break;
case "cap":
g = new THREE.SphereGeometry(0.5, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2);
break;
case "rock":
g = new THREE.IcosahedronGeometry(0.5, 2);
(function () { var P = g.attributes.position, v = new THREE.Vector3(); for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i);
var n = 0.82 + 0.3 * Math.abs(Math.sin(v.x * 9.1 + v.y * 5.3) * Math.cos(v.z * 7.7 - v.y * 3.1));
v.multiplyScalar(n);
if (v.y < -0.2)
v.y = -0.2 - (v.y + 0.2) * 0.2;
P.setXYZ(i, v.x, v.y, v.z);
} g.computeVertexNormals(); })();
break;
case "pine":
g = new THREE.ConeGeometry(0.5, 1, 10);
g.translate(0, 0.5, 0);
break;
case "reed":
g = new THREE.ConeGeometry(0.5, 1, 5);
g.translate(0, 0.5, 0);
break;
case "grass":
g = new THREE.ConeGeometry(0.5, 1, 3, 1, true);
g.translate(0, 0.5, 0);
break;
case "post":
g = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
g.translate(0, 0.5, 0);
break;
case "board":
g = new THREE.BoxGeometry(1, 1, 1);
break;
default: g = new THREE.IcosahedronGeometry(0.5, 1);
}
g.userData.shared = true;
return (KZ_IGEO[kind] = g);
},
function (G) {
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), c = new THREE.Color();
Object.keys(KZ.ins).forEach(function (kind) {
var L = KZ.ins[kind];
if (!L.list.length)
return;
var mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
var mesh = new THREE.InstancedMesh(kzIGeo(kind), mat, L.list.length);
mesh.name = "kz-" + kind;
mesh.userData.keep = 1;
mesh.userData.noCull = true;
L.list.forEach(function (r, i) { e.set(0, r[6], r[8]); q.setFromEuler(e); v.set(r[0], r[1], r[2]); s.set(r[3], r[4], r[5]); m4.compose(v, q, s); mesh.setMatrixAt(i, m4); c.setHex(r[7]); mesh.setColorAt(i, c); });
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.frustumCulled = false;
G.add(mesh);
L.mesh = mesh;
});
},
function (G, x, z, rot, lines, w, h, bg, fg, y) {
var g = kzAt(G, x, z, rot, y), wood = kzM(0x8A5A3A);
[-1, 1].forEach(function (k) { wCyl(0.07, 0.08, 1.9, wood, k * (w / 2 - 0.1), 0.95, 0, g, 8); });
var s = kzTwoSided(lines, w, h, bg || "#5A2E7A", fg || "#FFF2C8");
s.position.set(0, 1.6 + (h - 0.9) / 2, 0.05);
g.add(s);
wSph(0.12, kzM(0xF0C850), -(w / 2 - 0.1), 1.95 + (h - 0.9), 0, g, 8);
wSph(0.12, kzM(0xF0C850), (w / 2 - 0.1), 1.95 + (h - 0.9), 0, g, 8);
kzSolidIn(g, 0, 0, w / 2, 0.15, 2.2);
return g;
},
function (G) {
var seg = KZ_LITE ? 190 : 290;
var gr = wGround(1500, seg, function (x, z) {
var h = kzHeight(x, z) + (typeof kzgSink === "function" ? kzgSink(x, z) : 0), c = new THREE.Color(0x58C840), n = wNoise(x * 0.04, z * 0.04, 8), n2 = wNoise(x * 0.13, z * 0.13, 9);
c.offsetHSL((n - 0.5) * 0.05, 0.05, (n - 0.5) * 0.08);
if (n2 > 0.7)
c.lerp(new THREE.Color([0xF070B0, 0xF8D040, 0xA070F0, 0x50C0F0, 0xF08A40, 0xF05060][Math.floor(n * 12) % 6]), Math.min(0.5, (n2 - 0.7) * 2.2));
var d = Math.hypot(x, z);
if (d > KZ_RIM + 10) {
c.lerp(new THREE.Color(0x9A6AE8), Math.min(0.7, (d - KZ_RIM - 10) / 90));
}
var p = kzPathDist(x, z);
if (p < 2.6) {
var pc = new THREE.Color().setHSL((((x * 0.0045 + z * 0.0035) % 1) + 1) % 1, 0.78, 0.66);
c.lerp(p < 1.7 ? pc : pc.clone().lerp(new THREE.Color(0xFFF4E0), 0.5), p < 1.7 ? 1 : (2.6 - p) / 0.9);
}
var pd = Math.hypot(x - KZ_SITE.pond.x, z - KZ_SITE.pond.z);
if (pd < KZ_SITE.pond.r - 1 && h < kzPondTop())
c.setHex(0xC8B890);
return [h, c.getHex()];
});
gr.name = "kz-ground";
gr.userData.keep = 1;
gr.receiveShadow = true;
G.add(gr);
var R = wRand(1101);
for (var i = 0; i < (KZ_LITE ? 26 : 46); i++) {
var a = i / (KZ_LITE ? 26 : 46) * Math.PI * 2 + R() * 0.1, r = KZ_RIM + 80 + R() * 60, x = Math.cos(a) * r, z = Math.sin(a) * r;
var hc = [0x9A6AE8, 0xF06AB0, 0x4AA8F0, 0x5AC860, 0xF0A838][i % 5];
var m = wSph(40 + R() * 30, kzM(hc), x, kzRaw(x, z) - 10, z, G, 14);
m.scale.y = 0.55 + R() * 0.35;
}
},
function (G, x, z, s, col, o) {
o = o || {};
var y = kzHeight(x, z), g = kzAt(G, x, z, o.rot || 0, y);
var stalk = kzM(new THREE.Color(col).lerp(new THREE.Color(0xFFFFFF), 0.62).getHex());
wCyl(0.32 * s, 0.45 * s, 2.2 * s, stalk, 0, 1.1 * s, 0, g, 12);
wCyl(0.5 * s, 0.5 * s, 0.12 * s, kzM(0xEADCC4), 0, 1.8 * s, 0, g, 12);
var cap = wMesh(kzIGeo("cap"), kzM(col), 0, 2.1 * s, 0, g);
cap.scale.set(2.6 * s, 1.6 * s, 2.6 * s);
wCyl(1.25 * s, 1.25 * s, 0.06 * s, kzM(0xF8EEE0), 0, 2.12 * s, 0, g, 16);
var R = wRand(Math.round(x * 7 + z * 13) >>> 0);
for (var k = 0; k < 7; k++) {
var a = R() * 6.283, e = 0.35 + R() * 0.75;
var px = Math.cos(a) * Math.sin(e) * 1.3 * s, pz = Math.sin(a) * Math.sin(e) * 1.3 * s, py = Math.cos(e) * 0.8 * s;
kzI("dot", x + px * Math.cos(g.rotation.y) + pz * Math.sin(g.rotation.y), y + 2.1 * s + py, z - px * Math.sin(g.rotation.y) + pz * Math.cos(g.rotation.y), 0.3 * s, 0.3 * s, 0.3 * s, a, 0xFFF8F0, 0);
}
if (!o.noSolid)
KZ.solids.push({ x: x, z: z, r: 0.45 * s });
return g;
},
function (G, x, z, s, col, mid) {
var y = kzHeight(x, z);
kzI("stalk", x, y, z, 0.12 * s, 3 * s, 0.12 * s, 0, 0x5AA048);
kzI("petal", x, y + 1.1 * s, z, 0.9 * s, 0.9 * s, 0.9 * s, s * 3.1, 0x6AB050, 0.5);
var hy = y + 3 * s, n = 8;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283;
kzI("petal", x, hy, z, 1.0 * s, 0.9 * s, 1.0 * s, a, col, 0.25);
}
kzI("ball", x, hy + 0.05 * s, z, 0.55 * s, 0.35 * s, 0.55 * s, 0, mid || 0xF0B030);
},
function (G, x, z, s, col) {
var y = kzHeight(x, z), R = wRand(Math.round(x * 3 + z * 5) >>> 0);
kzI("trunk", x, y, z, 0.9 * s, 4 * s, 0.9 * s, R() * 6, 0x8A6040);
for (var k = 0; k < 4; k++) {
var a = R() * 6.283, d = R() * 1.4 * s;
kzI("canopy", x + Math.cos(a) * d, y + (4.6 + R() * 1.6) * s, z + Math.sin(a) * d, (3.2 + R() * 1.2) * s, (2.6 + R() * 0.9) * s, (3.2 + R() * 1.2) * s, R() * 6, col);
}
KZ.solids.push({ x: x, z: z, r: 0.45 * s });
},
function (G, x, z, rot, span) {
var g = kzAt(G, x, z, rot), r = span / 2;
KZ_RAINBOW.forEach(function (c, i) { var t = new THREE.Mesh(new THREE.TorusGeometry(r - i * 0.32, 0.17, 8, 40, Math.PI), kzGlowM(c[0], 0.25)); t.position.y = -0.2; g.add(t); });
[-1, 1].forEach(function (k) { wSph(0.9, kzM(0xFFFFFF), k * (r - 1), 0.2, 0, g, 10); wSph(0.7, kzM(0xFFFFFF), k * (r - 1) + 0.6, 0.4, 0.3, g, 10); });
[-1, 1].forEach(function (k) { KZ.solids.push(Object.assign({ r: 1.2 }, kzLocal(g, k * (r - 1), 0))); });
},
function (G) {
var n = KZ_LITE ? 220 : 600, R = wRand(4242);
var pts = wPoints(n, function () { var a = R() * 6.283, d = Math.sqrt(R()) * KZ_RIM; var x = Math.cos(a) * d, z = Math.sin(a) * d; return [x, kzHeight(x, z) + 1 + R() * 9, z]; }, 0xFFF4C0, 0.35, true);
pts.material.opacity = 0.75;
pts.userData.keep = 1;
pts.name = "kz-sparkles";
G.add(pts);
KZ.sparkle = pts;
pts.userData.base = pts.geometry.attributes.position.array.slice();
},
function (dt) {
var p = KZ.sparkle;
if (!p)
return;
var a = p.geometry.attributes.position, b = p.userData.base, t = KZ.t;
KZ.spk = (KZ.spk || 0) + dt;
if (KZ.spk < (KZ_LITE ? 0.12 : 0.05))
return;
KZ.spk = 0;
for (var i = 0; i < a.count; i++) {
a.array[i * 3] = b[i * 3] + Math.sin(t * 0.3 + i) * 1.2;
a.array[i * 3 + 1] = b[i * 3 + 1] + Math.sin(t * 0.5 + i * 1.7) * 0.8;
a.array[i * 3 + 2] = b[i * 3 + 2] + Math.cos(t * 0.27 + i * 0.9) * 1.2;
}
a.needsUpdate = true;
p.material.opacity = 0.6 + 0.12 * Math.sin(t * 0.4);
},
function (G) {
var geo = new THREE.SphereGeometry(1000, 32, 16), P = geo.attributes.position, col = new Float32Array(P.count * 3), c = new THREE.Color(), top = new THREE.Color(0x2E8EEA), mid = new THREE.Color(0x7CC0F4), low = new THREE.Color(0xD8ECFF);
for (var i = 0; i < P.count; i++) {
var h = P.getY(i) / 1000;
if (h > 0.35)
c.copy(mid).lerp(top, Math.min(1, (h - 0.35) / 0.5));
else if (h > 0)
c.copy(low).lerp(mid, h / 0.35);
else
c.copy(low);
col[i * 3] = c.r;
col[i * 3 + 1] = c.g;
col[i * 3 + 2] = c.b;
}
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false }));
m.renderOrder = -10;
m.frustumCulled = false;
m.userData.keep = 1;
m.userData.noCull = true;
m.name = "kz-sky";
G.add(m);
KZ.sky = m;
},
function (G) {
var R = wRand(777), n = KZ_LITE ? 14 : 34;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = 40 + R() * (KZ_RIM - 60), x = Math.cos(a) * d, z = Math.sin(a) * d, col = KZ_RAINBOW[i % 7][0];
var g = new THREE.Group();
g.position.set(x, kzHeight(x, z) + 16 + R() * 18, z);
g.userData.keep = 1;
G.add(g);
wSph(0.7, kzGlowM(col, 0.6), 0, 0, 0, g, 10).scale.y = 1.25;
wCyl(0.35, 0.35, 0.2, kzM(0xC89040), 0, -0.9, 0, g, 8);
if (!KZ_LITE) {
var gl = wGlow(col, 4, 0.35);
g.add(gl);
}
KZ.bob.push({ o: g, y: g.position.y, a: R() * 6, sp: 0.25 + R() * 0.2, amp: 0.8 });
}
},
function (G) {
kzBuildGround(G);
var R = wRand(31337), many = KZ_LITE ? 0.5 : 1;
kzRainbow(G, 0, 205, 0, 9);
kzRainbow(G, -60, 160, 1.05, 7);
kzRainbow(G, 60, 160, -1.05, 7);
kzRainbow(G, 0, -180, 0, 8);
kzRainbow(G, -170, 124, 1.5, 7);
kzRainbow(G, 176, 128, -1.5, 7);
function clearAt(x, z, pad) {
if (kzPathDist(x, z) < 4 + pad)
return false;
for (var i = 0; i < KZ_SITES.length; i++) {
var s = KZ_SITES[i];
if (Math.hypot(x - s[1], z - s[2]) < s[3] + 6 + pad)
return false;
}
return Math.hypot(x, z) < KZ_RIM + 20;
}
var placed = 0;
for (var i = 0; i < 2800 && placed < 130 * many; i++) {
var x = (R() - 0.5) * 2 * KZ_RIM, z = (R() - 0.5) * 2 * KZ_RIM;
if (!clearAt(x, z, 3))
continue;
placed++;
kzMushroom(G, x, z, 1.2 + R() * 2.2, KZ_CAPS[placed % KZ_CAPS.length], { rot: R() * 6 });
}
placed = 0;
for (var j = 0; j < 4800 && placed < 420 * many; j++) {
var x2 = (R() - 0.5) * 2 * KZ_RIM, z2 = (R() - 0.5) * 2 * KZ_RIM;
if (!clearAt(x2, z2, 0))
continue;
placed++;
kzFlower(G, x2, z2, 0.7 + R() * 1.4, KZ_PETALS[placed % KZ_PETALS.length], placed % 3 ? 0xF0B030 : 0xFFF0E0);
}
placed = 0;
for (var k = 0; k < 2800 && placed < 120 * many; k++) {
var x3 = (R() - 0.5) * 2 * KZ_RIM, z3 = (R() - 0.5) * 2 * KZ_RIM;
if (!clearAt(x3, z3, 5))
continue;
placed++;
kzTree(G, x3, z3, 1 + R() * 0.8, [0xF870A8, 0xC070F0, 0x70D850, 0xFFB040, 0x50B8F8][placed % 5]);
}
var nf = KZ_LITE ? 3600 : 10000;
for (var f = 0; f < nf; f++) {
var fx = (R() - 0.5) * 2 * KZ_RIM, fz = (R() - 0.5) * 2 * KZ_RIM;
if (Math.hypot(fx, fz) > KZ_RIM + 5 || kzPathDist(fx, fz) < 2.6)
continue;
var pd = Math.hypot(fx - KZ_SITE.pond.x, fz - KZ_SITE.pond.z);
if (pd < KZ_SITE.pond.r)
continue;
if (Math.hypot(fx - KZ_SITE.zoo.x, fz - KZ_SITE.zoo.z) < KZ_ZOO_R.hedge + 3)
continue;
var fy = kzHeight(fx, fz);
if (f % 5)
kzI("bloom", fx, fy + 0.24, fz, 0.3, 0.3, 0.3, R() * 3, KZ_PETALS[f % KZ_PETALS.length]);
else
kzI("tuft", fx, fy, fz, 0.22, 0.45, 0.22, R() * 3, 0x5EA848);
}
kzSparkles(G);
kzSkyLanterns(G);
if (typeof build === "function")
for (var b = 0; b < (KZ_LITE ? 5 : 12); b++) {
var a = b / 12 * 6.283, d = 60 + R() * 200, bx = Math.cos(a) * d, bz = Math.sin(a) * d;
try {
var bm = build({ id: "kz_fly_" + b, archetype: b % 4 ? "butterflies" : "bees", label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
bm.position.set(bx, kzHeight(bx, bz) + 1.2, bz);
bm.userData.keep = 1;
G.add(bm);
KZ.critters.push({ g: bm, wander: { r: 14, sp: 0.9 }, fly: true });
}
catch (e) { }
}
},
function (f, x, z, rot, o) {
o = o || {};
if (typeof wPerson !== "function")
return null;
var d = KZ_DRESS[f[0]] || [0x6AB06A, 0x3A3A3A], sex = /Mistress|Madame|Miss|Grandmother|Dame|Fern|Periwinkle|Marigold/.test(f[1]) ? "f" : /Nimbus|Professor/.test(f[1]) ? null : "m";
var look = { top: d[0], bottom: d[1] };
if (sex)
look.sex = sex;
if (f[0] === "story")
Object.assign(look, { hair: 0xE8E8F0, hairStyle: "bun", topKind: "robe" });
var g = wPerson("kz_" + f[0], { look: look, scale: f[0] === "clouds" ? 0.8 : 1 });
g.position.set(x, kzGround(x, z), z);
g.rotation.y = rot || 0;
KZ.G.add(g);
var sash = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 6, 16), kzM(0x3AA05A));
sash.position.set(0, 1.25, 0);
sash.rotation.set(Math.PI / 2, 0.5, 0);
sash.scale.set(1, 1.4, 1);
g.add(sash);
var P = { g: g, f: f, wander: o.wander || null };
KZ.people.push(P);
KZ.talk.push({ p: P, r: 3.2, name: f[1], t: { name: f[1], persona: "You are " + f[1] + ", " + f[2] + ", in the Kids Zone of Faerie in SomnuMatrix (a part of Faerie called Wonderglen). " + f[4] + " You speak simply and warmly, as to a child or a family, and never about anything scary, grown-up or unkind. Everything in Wonderglen is free; nothing is sold; nobody can be hurt here.", greet: f[3] }, fn: o.fn });
return P;
},
function (G) {
var n = KZ_LITE ? 6 : 16, R = wRand(616), at = ["welcome", "bubbles", "mushrooms", "pond", "tree", "carousel", "clouds", "critters", "paint", "story", "maze", "lanterns"];
for (var i = 0; i < n; i++) {
var s = KZ_SITE[at[i % at.length]], a = R() * 6.283, d = s.r * 0.5 * R(), x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
try {
var g = wPerson("kz_child" + i, { child: true });
g.position.set(x, kzHeight(x, z), z);
g.rotation.y = R() * 6;
G.add(g);
KZ.people.push({ g: g, wander: { r: Math.min(14, s.r * 0.6), sp: 1.3 }, child: true });
}
catch (e) { }
}
},
function (G, x, z, rot, r, capCol, name, o) {
o = o || {};
var y = kzHeight(x, z), g = kzAt(G, x, z, rot, y), h = o.h || 3.4;
var wall = kzM(o.wall || 0xF6EEDC), trim = kzM(0xB88A5A);
wCyl(r, r, 0.14, kzM(o.floor || 0xC89A6A), 0, 0.07, 0, g, 24);
kzPlat({ x: x, z: z, r: r, top: y + 0.14 });
var gap = 0.42, seg = new THREE.CylinderGeometry(r, r, h, 28, 1, true, gap, Math.PI * 2 - gap * 2);
var wm = wMesh(seg, kzM(o.wall || 0xF6EEDC, { ds: true }), 0, h / 2, 0, g);
wm.rotation.y = 0;
for (var i = 0; i < 28; i++) {
var a = gap + (i + 0.5) / 28 * (Math.PI * 2 - gap * 2), lx = Math.sin(a) * r, lz = Math.cos(a) * r;
kzRingIn(g, lx, lz, 0.35, h);
}
[-1, 1].forEach(function (k) { wCyl(0.09, 0.09, 2.4, trim, k * Math.sin(gap) * r, 1.2, Math.cos(gap) * r, g, 8); });
var dr = wBox(0.08, 2.2, 0.9, kzM(o.door || 0x5A9A5A), Math.sin(gap) * r + 0.45, 1.1, Math.cos(gap) * r + 0.4, g);
dr.rotation.y = 0.6;
for (var w = 0; w < 4; w++) {
var a2 = Math.PI * 0.5 + w * Math.PI / 2 + 0.3;
var win = wMesh(new THREE.CircleGeometry(0.42, 18), kzGlowM(0xFFE8A0, 0.3), Math.sin(a2) * (r + 0.03), 1.8, Math.cos(a2) * (r + 0.03), g);
win.rotation.y = a2;
var rim = wMesh(new THREE.TorusGeometry(0.44, 0.06, 6, 18), trim, Math.sin(a2) * (r + 0.05), 1.8, Math.cos(a2) * (r + 0.05), g);
rim.rotation.y = a2;
}
var cap = wMesh(kzIGeo("cap"), kzM(capCol, { ds: true }), 0, h - 0.1, 0, g);
cap.scale.set(r * 2.7, r * 1.5, r * 2.7);
wCyl(r * 1.33, r * 1.33, 0.08, kzM(0xF4E8D8), 0, h - 0.08, 0, g, 24);
var R = wRand(Math.round(x + z * 7) >>> 0);
for (var k2 = 0; k2 < 9; k2++) {
var a3 = R() * 6.283, e = 0.3 + R() * 0.9, p = kzLocal(g, Math.cos(a3) * Math.sin(e) * r * 1.3, Math.sin(a3) * Math.sin(e) * r * 1.3);
kzI("dot", p.x, y + h - 0.1 + Math.cos(e) * r * 0.72, p.z, 0.5 * r * 0.4, 0.5 * r * 0.4, 0.5 * r * 0.4, a3, 0xFFF8F0);
}
var sg = kzTwoSided([name], 2.6, 0.55, o.signBg || "#5A2E7A", "#FFF2C8");
sg.position.set(0, h + 0.05, Math.cos(gap) * r * 1.25 + 0.2);
g.add(sg);
kzRoom(name, x, z, r * 0.72, r * 0.72, rot);
g.userData.r = r;
return g;
},
function (G) {
var d = KZ_SITE.door, y = kzHeight(d.x, d.z), g = kzAt(G, d.x, d.z, Math.PI, y);
kzStripedToadstool(g, 1.2);
var sg = kzTwoSided(["THE RAINBOW TOADSTOOL", "back to Faerie · press E"], 3, 0.7, "#5A2E7A", "#FFF2C8");
sg.position.set(0, 3.5, -3.8);
sg.rotation.y = Math.PI;
g.add(sg);
KZ.solids.push({ x: d.x, z: d.z, r: 2.6 });
KZ.homeDoor = { x: d.x, z: d.z - 4 };
},
function (g, s) {
var cols = [0xE8504A, 0xF0903A, 0xF0D040, 0x60C058, 0x48A8E0, 0x9A5AD0];
for (var i = 0; i < 6; i++)
wCyl(2.3 * s, 2.4 * s, 0.62 * s, kzM(cols[i]), 0, 0.31 * s + i * 0.62 * s, 0, g, 24);
var cap = wMesh(kzIGeo("cap"), kzM(0xF070B0), 0, 3.7 * s, 0, g);
cap.scale.set(7.4 * s, 4.2 * s, 7.4 * s);
wCyl(3.7 * s, 3.7 * s, 0.1 * s, kzM(0xFFF0F4), 0, 3.72 * s, 0, g, 28);
var R = wRand(99);
for (var k = 0; k < 14; k++) {
var a = R() * 6.283, e = 0.25 + R() * 0.95;
wSph(0.42 * s, kzM(0xFFFFFF), Math.cos(a) * Math.sin(e) * 3.6 * s, 3.7 * s + Math.cos(e) * 2.1 * s, Math.sin(a) * Math.sin(e) * 3.6 * s, g, 10).scale.y = 0.4;
}
var dg = new THREE.Group();
dg.position.set(0, 0, -2.42 * s);
g.add(dg);
var door = wMesh(new THREE.CircleGeometry(1.15 * s, 28), kzGlowM(0xF0A8D8, 0.18), 0, 1.3 * s, 0, dg);
door.rotation.y = Math.PI;
var rim = wMesh(new THREE.TorusGeometry(1.2 * s, 0.12 * s, 8, 28), kzM(0xF0C850), 0, 1.3 * s, -0.02, dg);
rim.rotation.y = Math.PI;
wSph(0.13 * s, kzM(0xF0C850), 0.75 * s, 1.2 * s, -0.1, dg, 8);
return g;
},
function (G) {
var s = KZ_SITE.welcome;
kzSign(G, 0, 196, Math.PI, ["THE KIDS ZONE", "Wonderglen · press E for what to do"], 3.2, 1.1, "#5A2E7A", "#FFF2C8");
kzSpot(0, 193, 3, "What to do in the Kids Zone", "read the board", function () { kzBoardCard(); });
kzSign(G, -9, 190, Math.PI * 0.88, ["MY STICKER BOOK", "press E"], 2.4, 0.9, "#2E6A9A", "#FFF8E0");
kzSpot(-9, 187.5, 2.8, "Your Sticker Book", "open it", function () { kzBookCard(); });
kzSign(G, 9, 190, Math.PI * 1.12, ["WHERE TO?", "a map of Wonderglen"], 2.4, 0.9, "#3A8A4A", "#FFF8E0");
kzSpot(9, 187.5, 2.8, "Where to?", "choose a place and follow the arrow", function () { kzWayCard(); });
var fy = kzHeight(0, 168), fg = kzAt(G, 0, 168, 0, fy);
wCyl(5, 5.4, 0.7, kzM(0xF0E0F0), 0, 0.35, 0, fg, 28);
wCyl(4.5, 4.5, 0.08, kzM(0x8AD0F0, { op: 0.85 }), 0, 0.62, 0, fg, 28).userData.keep = 1;
wCyl(0.5, 0.8, 2.4, kzM(0xF0E0F0), 0, 1.4, 0, fg, 14);
wCyl(2, 1.6, 0.35, kzM(0xF0E0F0), 0, 2.5, 0, fg, 20);
var top = wSph(0.6, kzGlowM(0xF0A0D0, 0.4), 0, 3.1, 0, fg, 14);
top.userData.keep = 1;
var spray = wPoints(KZ_LITE ? 60 : 140, function (i) { var a = i * 2.4, r = 0.4 + (i % 9) * 0.18; return [Math.cos(a) * r, 2.6 + (i % 13) * 0.12, Math.sin(a) * r]; }, 0xCDEFFF, 0.12, true);
spray.userData.keep = 1;
fg.add(spray);
KZ.fountain = spray;
spray.userData.base = spray.geometry.attributes.position.array.slice();
KZ.solids.push({ x: 0, z: 168, r: 5.3, h: 1 });
kzFact("welcome", 6, 168);
var tk = kzHouse(G, -34, 156, kzFace(-34, 156, 0, 168), 5.2, 0xF0A040, "The Honeydrop Tuckshop", { door: 0xE8505A });
var c = kzLocal(tk, 0, -1.6), cb = kzLocal(tk, 0, -3.3);
wCyl(1.6, 1.6, 1, kzM(0xE8C0A0), 0, 0.5, -1.6, tk, 20);
var jars = [0xF0B030, 0xE870A0, 0x7AD0F0, 0xA0E070];
for (var j = 0; j < 4; j++)
wCyl(0.18, 0.18, 0.4, kzM(jars[j], { op: 0.8 }), -0.7 + j * 0.45, 1.3, -1.6, tk, 10).userData.keep = 1;
kzRingIn(tk, 0, -1.6, 1.5, 1.2);
kzFolkAt(kzFolk("tuck"), cb.x, cb.z, tk.rotation.y, { fn: function () { kzTuckCard(); } });
kzSpot(c.x, c.z, 3.2, "The Honeydrop Tuckshop", "choose a free treat", function () { kzTuckCard(); });
var pt = kzAt(G, 34, 156, kzFace(34, 156, 0, 168));
var stripes = [0xE8505A, 0xFFF4F0];
for (var i2 = 0; i2 < 12; i2++) {
var cn = new THREE.Mesh(new THREE.ConeGeometry(6, 3.4, 24, 1, true, i2 / 12 * 6.283, 6.283 / 12), kzM(stripes[i2 % 2], { ds: true }));
cn.position.y = 4.6;
pt.add(cn);
}
for (var p2 = 0; p2 < 8; p2++) {
var a4 = p2 / 8 * 6.283;
wCyl(0.1, 0.1, 3, kzM(0xF0C850), Math.cos(a4) * 5.7, 1.5, Math.sin(a4) * 5.7, pt, 8);
kzRingIn(pt, Math.cos(a4) * 5.7, Math.sin(a4) * 5.7, 0.15, 3);
}
wCyl(0.08, 0.08, 1.2, kzM(0xF0C850), 0, 6.8, 0, pt, 6);
var fl = wBox(0.9, 0.5, 0.03, kzM(0x9A5AD0, { ds: true }), 0.45, 7.1, 0, pt);
fl.userData.keep = 1;
wCyl(4.8, 4.8, 0.12, kzM(0xF0D8C0), 0, 0.06, 0, pt, 24);
for (var sh = 0; sh < 3; sh++) {
var a5 = Math.PI + (sh - 1) * 0.7;
var shelf = kzAt(pt, Math.sin(a5) * 3.6, Math.cos(a5) * 3.6, a5 + Math.PI, 0);
shelf.position.y = 0;
wBox(2.2, 0.08, 0.6, kzM(0xC08A5A), 0, 0.9, 0, shelf);
wBox(2.2, 0.08, 0.6, kzM(0xC08A5A), 0, 1.6, 0, shelf);
for (var t = 0; t < 4; t++) {
wSph(0.2, kzM(KZ_PETALS[(t + sh) % 7]), -0.75 + t * 0.5, 1.12, 0, shelf, 10);
wSph(0.18, kzM(KZ_CAPS[(t + sh * 2) % 6]), -0.75 + t * 0.5, 1.8, 0, shelf, 10);
}
}
kzFolkAt(kzFolk("prizes"), 34, 156, pt.rotation.y, { fn: function () { kzPrizeCard(); } });
kzSpot(34, 156, 4.4, "The Prize Tent", "trade gold stars for toys", function () { kzPrizeCard(); });
kzFolkAt(kzFolk("welcome"), 4, 198, Math.PI, { fn: function () { kzBoardCard(); } });
},
function (G) {
var s = KZ_SITE.staff, lg = kzHouse(G, s.x, s.z, kzFace(s.x, s.z, 0, 180), 5.6, 0x3AA05A, "The Staff Lodge", { door: 0x3A7A4A, signBg: "#2A6A3A" });
var bw = kzLocal(lg, 0, -1);
KZ.badge = { x: bw.x, z: bw.z, hw: 5.4, hd: 0.18, rot: lg.rotation.y };
wBox(10.6, 3.2, 0.16, kzM(0xE8DCC0), 0, 1.6, -1, lg);
var bd = wBox(1.2, 2.2, 0.12, kzM(0x3A7A4A), 0, 1.1, -0.92, lg);
bd.userData.keep = 1;
KZ.badgeLeaf = bd;
var sgn = kzTwoSided(["Staff only", "Kids Zone sash"], 0.9, 0.4, "#2A6A3A", "#FFF2C8");
sgn.position.set(0, 2.5, -0.9);
lg.add(sgn);
kzRoom("The staff room", kzLocal(lg, 0, -3.4).x, kzLocal(lg, 0, -3.4).z, 3.6, 2.2, lg.rotation.y, true);
var desk = kzLocal(lg, 2.2, 2.2);
wBox(1.6, 0.9, 0.7, kzM(0xC08A5A), 2.2, 0.45, 2.2, lg);
kzSolidIn(lg, 2.2, 2.2, 0.8, 0.35, 1);
var hs = kzTwoSided(["📋 Hiring here", "The Kids Zone"], 1.3, 0.5, "#2A6A3A", "#FFF2C8");
hs.position.set(2.2, 1.5, 2.0);
lg.add(hs);
kzSpot(desk.x, desk.z, 2.6, "The Kids Zone's hiring desk", "see the jobs and apply", function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(KZ_KEY);
else
setStatus("Jobs at the Kids Zone are on the job board."); });
var fa = kzLocal(lg, -2.6, 2.0);
wBox(1.4, 1.2, 0.6, kzM(0xFFFFFF), -2.6, 0.6, 2.0, lg);
wBox(0.5, 0.14, 0.02, kzM(0xE8505A), -2.6, 1.0, 2.31, lg);
wBox(0.14, 0.5, 0.02, kzM(0xE8505A), -2.6, 1.0, 2.31, lg);
kzSolidIn(lg, -2.6, 2.0, 0.7, 0.3, 1.2);
kzSpot(fa.x, fa.z, 2.4, "First aid and lost-and-found", "ask for help", function () { worldCard(worldFacts("First aid and lost-and-found", "The Staff Lodge", [], ["Nobody can be hurt in the Kids Zone: it is always safe.", "Lost? The Where to? board at the Welcome Glade shows you the way to every place, and the Rainbow Toadstool takes you back to Faerie.", "Anything you win, find or make is already safe in your Backpack.", "If someone is unkind, tell any member of staff (the green sashes), and use Report in the chat."])); });
kzFolkAt(kzFolk("head"), kzLocal(lg, -1.2, 0.8).x, kzLocal(lg, -1.2, 0.8).z, lg.rotation.y);
var c = KZ_SITE.craft, cc = kzHouse(G, c.x, c.z, kzFace(c.x, c.z, 0, 180), 5.4, 0x9A6AD8, "The Craft Cottage", { door: 0xF0C850 });
for (var t = 0; t < 2; t++) {
var tx = t ? 1.6 : -1.6;
wCyl(1.1, 1.1, 0.08, kzM(0xE8C890), tx, 0.78, -0.6, cc, 18);
wCyl(0.15, 0.2, 0.76, kzM(0xC08A5A), tx, 0.38, -0.6, cc, 8);
kzRingIn(cc, tx, -0.6, 1.1, 0.9);
for (var b = 0; b < 5; b++)
wSph(0.09, kzM(KZ_PETALS[b]), tx - 0.5 + b * 0.25, 0.86, -0.4, cc, 8);
}
var ct = kzLocal(cc, 0, -0.6);
kzSpot(ct.x, ct.z, 3.6, "The Craft Cottage", "make a keepsake from your finds", function () { kzCraftCard(); });
var o = KZ_SITE.colouring, ck = kzHouse(G, o.x, o.z, kzFace(o.x, o.z, 88, -170), 5.4, 0xF07AA8, "The Colouring Cottage", { door: 0x6AB0E8 });
for (var e = 0; e < 4; e++) {
var a = Math.PI * 0.6 + e * 0.55, ex = Math.sin(a) * 3.6, ez = Math.cos(a) * 3.6, eg = kzAt(ck, ex, ez, a + Math.PI, 0);
eg.position.y = 0;
[-0.4, 0.4].forEach(function (k) { var lgm = wCyl(0.04, 0.04, 1.8, kzM(0xC08A5A), k, 0.9, 0, eg, 6); lgm.rotation.x = 0.1; });
wBox(1.1, 0.8, 0.04, kzM(0xFFFFFF), 0, 1.4, 0.08, eg);
wSph(0.12, kzM(KZ_PETALS[e]), -0.2, 1.5, 0.12, eg, 8);
wSph(0.1, kzM(KZ_CAPS[e]), 0.25, 1.3, 0.12, eg, 8);
}
for (var cr = 0; cr < 10; cr++)
kzI("stalk", o.x - 0.9 + cr * 0.2, kzHeight(o.x, o.z) + 0.8, o.z, 0.05, 0.35, 0.05, 0, KZ_PETALS[cr % 7]);
wCyl(1.3, 1.3, 0.08, kzM(0xE8C890), 0, 0.78, 0, ck, 18);
wCyl(0.15, 0.2, 0.76, kzM(0xC08A5A), 0, 0.38, 0, ck, 8);
kzRingIn(ck, 0, 0, 1.3, 0.9);
kzSpot(o.x, o.z, 4, "The Colouring Book", "choose a page and colour it", function () { kzColourBook(); });
},
function (G) {
var s = KZ_SITE.school, sh = kzHouse(G, s.x, s.z, kzFace(s.x, s.z, 118, 128), 5.4, 0xE8505A, "The Little Schoolhouse", { door: 0x4A8AC8, wall: 0xF8F0E0 });
var bt = kzAt(sh, 0, 0, 0, 0);
bt.position.y = 5.6;
wCyl(0.5, 0.6, 1.6, kzM(0xF8F0E0), 0, 0.8, 0, bt, 10);
wCone(0.8, 1, kzM(0xE8505A), 0, 2.1, 0, bt, 10);
wSph(0.25, kzM(0xF0C850), 0, 1.1, 0, bt, 10);
for (var r = 0; r < 2; r++)
for (var c = 0; c < 3; c++) {
var dx = -1.6 + c * 1.6, dz = -0.4 + r * 1.6;
wBox(0.9, 0.06, 0.6, kzM(0xC08A5A), dx, 0.62, dz, sh);
wCyl(0.04, 0.04, 0.6, kzM(0x8A6040), dx, 0.31, dz, sh, 6);
kzSolidIn(sh, dx, dz, 0.45, 0.3, 0.7);
}
var bd = kzTwoSided(["A B C  1 2 3", "Welcome to school!"], 3.2, 1.3, "#2A4A3A", "#FFFFFF");
bd.position.set(0, 1.8, -4.6);
sh.add(bd);
kzFolkAt(kzFolk("school"), kzLocal(sh, 0, -3.2).x, kzLocal(sh, 0, -3.2).z, sh.rotation.y, { fn: function () { kzSchoolCard(); } });
var bx = s.x - 14, bz = s.z + 10, bus = kzAt(G, bx, bz, kzFace(bx, bz, s.x, s.z) + Math.PI / 2);
var yel = kzM(0xF4C430);
wBox(7.6, 2.4, 2.6, yel, 0, 1.7, 0, bus);
wSph(1.3, yel, 3.8, 1.6, 0, bus, 14).scale.set(0.6, 0.9, 1);
for (var w = 0; w < 5; w++) {
var win = wMesh(new THREE.CircleGeometry(0.42, 16), kzGlowM(0xBFE6FF, 0.2), -2.8 + w * 1.3, 2.1, 1.31, bus);
var win2 = win.clone();
win2.position.z = -1.31;
win2.rotation.y = Math.PI;
bus.add(win2);
}
[[2.6, 1.3], [-2.6, 1.3], [2.6, -1.3], [-2.6, -1.3]].forEach(function (q) { var wh = wCyl(0.55, 0.55, 0.35, kzM(0x3A3A4A), q[0], 0.55, q[1], bus, 16); wh.rotation.x = Math.PI / 2; });
[-0.5, 0.5].forEach(function (k) { wSph(0.26, kzM(0xFFFFFF), 4.5, 2.1, k, bus, 10); wSph(0.12, kzM(0x2A2A3A), 4.68, 2.1, k, bus, 8); });
var bs = kzTwoSided(["SCHOOL BUS", "to the Commons School"], 2.2, 0.5, "#2A2A3A", "#F4C430");
bs.position.set(0, 3.2, 0);
bus.add(bs);
KZ.solids.push({ x: bx, z: bz, hw: 4.4, hd: 1.4, rot: bus.rotation.y });
kzSign(G, bx - 1, bz - 5, bus.rotation.y, ["BUS STOP", "The Commons School · K to 12"], 2.4, 0.8, "#2A4A8A", "#FFF8E0");
kzSpot(bx - 1, bz - 3.5, 3.4, "The school bus", "ride to the Commons School", function () { kzSchoolCard(); });
kzFact("school", s.x + 8, s.z - 8);
},
function (site, x, z) {
var f = null;
KZ_FACTS.forEach(function (q) { if (q[0] === site)
f = q; });
if (!f)
return;
var y = kzHeight(x, z), g = kzAt(KZ.G, x, z, kzFace(x, z, KZ_SITE[site] ? KZ_SITE[site].x : 0, KZ_SITE[site] ? KZ_SITE[site].z : 0) + Math.PI, y);
wCyl(0.06, 0.06, 1.3, kzM(0x8A5A3A), 0, 0.65, 0, g, 6);
var b = kzTwoSided(["💡 WONDER FACT", f[1]], 1.4, 0.7, "#F0C850", "#4A2A6A");
b.position.set(0, 1.5, 0.05);
g.add(b);
KZ.solids.push({ x: x, z: z, r: 0.3 });
kzSpot(x, z, 2.4, "Wonder Fact: " + f[1], "read it", function () { kzFactCard(f); }, { fact: site });
},
function () {
if (KZ_BUBBLE_GEO)
return;
KZ_BUBBLE_GEO = new THREE.SphereGeometry(0.5, 14, 10);
KZ_BUBBLE_GEO.userData.shared = true;
KZ_BUBBLE_MAT = [0xBFE8FF, 0xF8C8F0, 0xD8F8D0, 0xFFF0C0, 0xE0D0FF].map(function (c) { return new THREE.MeshPhongMaterial({ color: c, specular: 0xFFFFFF, shininess: 90, transparent: true, opacity: 0.32, depthWrite: false }); });
},
function (x, y, z, o) {
kzBubbleMats();
o = o || {};
var m = new THREE.Mesh(KZ_BUBBLE_GEO, KZ_BUBBLE_MAT[(KZ.bubbles.length + (o.c || 0)) % KZ_BUBBLE_MAT.length]);
m.userData.keep = 1;
var s = o.s || (0.5 + Math.random() * 0.7);
m.scale.setScalar(s);
m.position.set(x, y, z);
KZ.G.add(m);
var B = { m: m, vx: (Math.random() - 0.5) * 0.6, vy: o.catch ? 0 : 0.35 + Math.random() * 0.5, vz: (Math.random() - 0.5) * 0.6, life: o.life || (8 + Math.random() * 6), age: 0, catch: !!o.catch, hy: y, pop: 0, s: s };
KZ.bubbles.push(B);
return B;
},
function (dt, L) {
var pops = 0;
for (var i = KZ.bubbles.length - 1; i >= 0; i--) {
var B = KZ.bubbles[i], m = B.m;
B.age += dt;
if (B.pop > 0) {
B.pop += dt;
m.scale.setScalar(B.s * (1 + B.pop * 3));
m.material = KZ_BUBBLE_MAT[0];
if (B.pop > 0.22) {
KZ.G.remove(m);
KZ.bubbles.splice(i, 1);
}
continue;
}
if (B.catch) {
m.position.x += B.vx * dt;
m.position.z += B.vz * dt;
m.position.y = B.hy + Math.sin(B.age * 1.3 + i) * 0.35;
var s = KZ_SITE.bubbles;
if (Math.hypot(m.position.x - s.x, m.position.z - s.z) > s.r - 4) {
B.vx = (s.x - m.position.x) * 0.03;
B.vz = (s.z - m.position.z) * 0.03;
}
if (Math.random() < dt * 0.3) {
B.vx = (Math.random() - 0.5) * 1.2;
B.vz = (Math.random() - 0.5) * 1.2;
}
if (Math.hypot(L.x - m.position.x, L.z - m.position.z) < 1.3 && Math.abs((L.y - 0.9) - m.position.y) < 1.6) {
B.pop = 0.001;
pops++;
if (typeof playTone === "function")
playTone(520 + ((KZ.game && KZ.game.n) || 0) * 40, 0.25);
}
}
else {
m.position.x += B.vx * dt;
m.position.y += B.vy * dt;
m.position.z += B.vz * dt;
if (B.age > B.life) {
B.pop = 0.001;
}
}
}
return pops;
},
function (G) {
var s = KZ_SITE.bubbles;
KZ.wands = [];
[[-14, 8], [14, 6], [0, -14]].forEach(function (q, i) {
var x = s.x + q[0], z = s.z + q[1], g = kzAt(G, x, z, kzFace(x, z, s.x, s.z));
wCyl(0.12, 0.16, 4, kzM(KZ_CAPS[i * 2]), 0, 2, 0, g, 10);
var ring = wMesh(new THREE.TorusGeometry(1.1, 0.12, 8, 24), kzM(0xF0C850), 0, 5.1, 0, g);
ring.userData.keep = 1;
var film = wMesh(new THREE.CircleGeometry(1.05, 24), new THREE.MeshPhongMaterial({ color: 0xE8F4FF, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }), 0, 5.1, 0, g);
film.userData.keep = 1;
KZ.wands.push({ x: x, y: kzHeight(x, z) + 5.1, z: z, t: i });
KZ.solids.push({ x: x, z: z, r: 0.3 });
});
kzSign(G, s.x + 6, s.z + 18, kzFace(s.x + 6, s.z + 18, s.x, s.z) + Math.PI, ["BUBBLE CATCH", "pop 15 bubbles in time!"], 2.4, 0.9, "#2E6A9A", "#FFF8E0");
kzSpot(s.x + 6, s.z + 16, 3, "Bubble Catch", "start a game", function () { kzBubbleGame(); });
kzSpot(s.x - 4, s.z + 4, 3.5, "A bubble wand on the grass", "blow bubbles", function () { var L = worldLocal(); for (var i = 0; i < 10; i++)
kzBubble(L.x + Math.sin(yaw) * -1.5 + (Math.random() - 0.5), L.y - 0.4, L.z + Math.cos(yaw) * -1.5 + (Math.random() - 0.5), { c: i }); if (typeof playTone === "function")
playTone(700, 0.3); }, { wand: true });
kzFact("bubbles", s.x - 18, s.z - 16);
},
function () {
if (KZ.game)
return kzSayGame();
var s = KZ_SITE.bubbles, y = kzHeight(s.x, s.z);
for (var i = 0; i < 18; i++) {
var a = Math.random() * 6.283, d = 6 + Math.random() * (s.r - 12);
kzBubble(s.x + Math.cos(a) * d, y + 1.1 + Math.random() * 1.1, s.z + Math.sin(a) * d, { catch: true, s: 0.75, c: i, life: 999 });
}
KZ.game = { k: "bubbles", t: 75, n: 0, need: 15 };
setStatus("<b>Bubble Catch!</b> Walk into the bubbles to pop them. Fifteen before the sand runs out (75 seconds).");
},
function (G) {
var s = KZ_SITE.mushrooms;
KZ_NOTES.forEach(function (nt, i) {
var a = i / 8 * 6.283, x = s.x + Math.sin(a) * 13, z = s.z + Math.cos(a) * 13;
var g = kzAt(G, x, z, kzFace(x, z, s.x, s.z));
var stalk = kzM(0xF4ECDC);
wCyl(0.5, 0.7, 2.6, stalk, 0, 1.3, 0, g, 12);
var mat = new THREE.MeshLambertMaterial({ color: nt[1], emissive: nt[1], emissiveIntensity: 0.08 });
var cap = wMesh(kzIGeo("cap"), mat, 0, 2.5, 0, g);
cap.scale.set(4, 2.4, 4);
cap.userData.keep = 1;
var px = s.x + Math.sin(a) * 9.6, pz = s.z + Math.cos(a) * 9.6;
var st = wCyl(1, 1, 0.16, kzM(nt[1]), 0, 0, 0, null, 18);
st.position.set(px, kzHeight(px, pz) + 0.05, pz);
G.add(st);
var lt = wSign([nt[2]], 0.6, 0.5, "#FFFFFF", "#3A2A5A");
lt.position.set(px, kzHeight(px, pz) + 0.17, pz);
lt.rotation.x = -Math.PI / 2;
lt.rotation.z = -a + Math.PI;
G.add(lt);
KZ.solids.push({ x: x, z: z, r: 0.7 });
KZ.shrooms.push({ i: i, x: px, z: pz, cap: mat, glow: 0, f: nt[0], on: false });
});
kzSign(G, s.x, s.z - 22, Math.PI, ["THE SINGING MUSHROOMS", "step on a stone · press E to copy a tune"], 3, 0.9, "#6A3A9A", "#FFF8E0");
kzSpot(s.x, s.z, 4, "The Mushroom Maestro's tune", "hear a tune and copy it", function () { kzTuneGame(); });
kzFact("mushrooms", s.x + 18, s.z + 12);
},
function () {
if (KZ.game && KZ.game.k !== "tune")
return kzSayGame();
var n = Math.min(7, 4 + ((KZ.tuneLevel || 0))), seq = [];
for (var i = 0; i < n; i++)
seq.push(Math.floor(Math.random() * 8));
KZ.game = { k: "tune", seq: seq, at: 0, play: 0, pt: 0.6, got: [], t: 120 };
setStatus("<b>Listen!</b> The mushrooms will sing " + n + " notes. Then step on the stones in the same order.");
},
function (dt, L) {
var G = KZ.game;
KZ.shrooms.forEach(function (M) {
if (M.glow > 0) {
M.glow = Math.max(0, M.glow - dt * 1.3);
}
M.cap.emissiveIntensity = 0.08 + M.glow * 0.45;
var on = Math.hypot(L.x - M.x, L.z - M.z) < 1.2;
if (on && !M.on) {
kzSing(M.i);
if (G && G.k === "tune" && G.play >= G.seq.length)
kzTuneStep(M.i);
}
M.on = on;
});
if (G && G.k === "tune" && G.play < G.seq.length) {
G.pt -= dt;
if (G.pt <= 0) {
kzSing(G.seq[G.play]);
G.play++;
G.pt = 0.85;
if (G.play >= G.seq.length)
setStatus("<b>Your turn!</b> Step on the stones in the same order.");
}
}
},
function (i) {
var G = KZ.game;
if (i === G.seq[G.got.length]) {
G.got.push(i);
if (G.got.length === G.seq.length) {
KZ.tuneLevel = (KZ.tuneLevel || 0) + 1;
KZ.game = null;
kzWin("tune", "<b>Bravo!</b> You played the tune back perfectly. Next time the tune will be one note longer.");
}
}
else {
G.got = [];
G.play = 0;
G.pt = 1.4;
setStatus("<b>Not quite!</b> Listen again...");
}
},
function (G) {
var p = KZ_SITE.pond, wy = kzPondTop();
var w = wMesh(new THREE.CircleGeometry(p.r - 1.5, 48), (function () { var m = new THREE.MeshPhongMaterial({ color: 0x2E9AC0, shininess: 110, specular: 0xBFEFFF, transparent: true, opacity: 0.9 }); m.userData.realWater = 1; return m; })(), p.x, wy, p.z, G);
w.rotation.x = -Math.PI / 2;
w.userData.keep = 1;
KZ.water = wy;
var ix = p.x - 6, iz = p.z - 8, sx = p.x + p.r - 4, sz = p.z + 4, n = 12;
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, x = sx + (ix + 5 - sx) * t + Math.sin(t * 9) * 3, z = sz + (iz - sz) * t + Math.cos(t * 7) * 2;
var g = new THREE.Group();
g.position.set(x, wy, z);
g.userData.keep = 1;
G.add(g);
var pad = wCyl(1.35, 1.35, 0.12, kzM(0x5AB050), 0, 0.06, 0, g, 20);
var notch = wCyl(0.3, 0.3, 0.13, kzM(0x6AC8E0), 1.15, 0.07, 0, g, 8);
if (i % 3 === 1)
wSph(0.28, kzM(0xF8B0D0), 0.4, 0.25, -0.3, g, 10);
var sink = (i === 4 || i === 8) ? { p: i === 4 ? 5 : 6, o: i } : null;
var P = { x: x, z: z, r: 1.35, g: g, sink: sink, top: (function (sk, gg) { return function () { return wy + 0.12 + (sk ? gg.position.y - wy : 0); }; })(sink, g) };
kzPlat(P);
KZ.pads.push(P);
}
var lg = kzAt(G, ix, iz, 0, wy + 0.35);
for (var k = 0; k < 10; k++) {
var a = k / 10 * 6.283;
var pt = wMesh(kzIGeo("petal"), kzM(k % 2 ? 0xF8B8D8 : 0xF09AC0), 0, 0.9, 0, lg);
pt.scale.set(2.6, 1.4, 1.6);
pt.rotation.set(0, a, 0.55);
}
wSph(0.6, kzM(0xF0D040), 0, 1.0, 0, lg, 12);
KZ.solids.push({ x: ix, z: iz, r: 1.4, h: 2 });
KZ.lotus = { x: ix, z: iz };
if (typeof build === "function")
[[p.x + 12, p.z + 20], [p.x - 20, p.z + 16], [p.x + 4, p.z - 22]].forEach(function (q, i) {
try {
var f = build({ id: "kz_frog" + i, archetype: "frog", label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
f.position.set(q[0], kzHeight(q[0], q[1]), q[1]);
f.userData.keep = 1;
G.add(f);
}
catch (e) { }
});
kzFolkAt(kzFolk("pond"), sx + 4, sz + 3, kzFace(sx + 4, sz + 3, p.x, p.z), {});
kzSign(G, sx + 5, sz - 4, kzFace(sx + 5, sz - 4, p.x, p.z) + Math.PI, ["THE LILY-PAD HOP", "hop to the Lotus Island · keep your socks dry!"], 3, 0.9, "#2E7A6A", "#FFF8E0");
kzFact("pond", p.x + 10, p.z + p.r - 2);
},
function (dt, L) {
var t = KZ.t;
KZ.pads.forEach(function (P, i) {
var g = P.g;
var dip = 0;
if (P.sink) {
var ph = (t + P.sink.o) % P.sink.p;
dip = ph > P.sink.p - 1.8 ? -0.5 * Math.sin((ph - (P.sink.p - 1.8)) / 1.8 * Math.PI) : 0;
}
g.position.y = KZ.water + dip + Math.sin(t * 1.2 + i) * 0.03;
g.rotation.y = Math.sin(t * 0.3 + i) * 0.2;
});
var feet = L.y - 1.72, p = KZ_SITE.pond, inPond = Math.hypot(L.x - p.x, L.z - p.z) < p.r - 2.5;
var onPad = KZ.onPlat && KZ.pads.indexOf(KZ.onPlat) >= 0;
if (onPad && KZ.pads.indexOf(KZ.onPlat) === 0 && (!KZ.game || KZ.game.k !== "pads") && !KZ.game) {
KZ.game = { k: "pads", t: 90 };
setStatus("<b>Hop!</b> Lily pad to lily pad to the Lotus Island. Watch out: two of the pads dip under now and then.");
}
if (KZ.game && KZ.game.k === "pads") {
if (inPond && !onPad && feet < KZ.water - 0.05 && Math.hypot(L.x - KZ.lotus.x, L.z - KZ.lotus.z) > 6.5) {
KZ.game = null;
if (typeof playTone === "function")
playTone(180, 0.4);
setStatus("<b>Splash!</b> Your socks are wet. Paddle back to the bank and start again from the first lily pad.");
}
else if (Math.hypot(L.x - KZ.lotus.x, L.z - KZ.lotus.z) < 4.5) {
KZ.game = null;
kzWin("pads", "<b>You made it to the Lotus Island</b> with dry socks!");
}
}
},
function (G) {
var s = KZ_SITE.tree, y = kzHeight(s.x, s.z), g = kzAt(G, s.x, s.z, 0, y), bark = kzM(0x8A5A3A), deckY = y + KZ_DECK;
KZ.deckY = deckY;
wCyl(4.2, 5.6, KZ_DECK + 8, bark, 0, (KZ_DECK + 8) / 2, 0, g, 18);
for (var r = 0; r < 7; r++) {
var a = r / 7 * 6.283, root = wCyl(0.8, 1.4, 6, bark, Math.cos(a) * 5, 0.8, Math.sin(a) * 5, g, 8);
root.rotation.z = Math.cos(a) * 1.1;
root.rotation.x = -Math.sin(a) * 1.1;
}
KZ.solids.push({ x: s.x, z: s.z, r: 5.6, h: KZ_DECK - 0.6 });
KZ.solids.push({ x: s.x, z: s.z, r: 4.3, b: KZ_DECK - 1 });
var R = wRand(4040);
for (var k = 0; k < 18; k++) {
var a2 = R() * 6.283, d = R() * 14;
kzI("canopy", s.x + Math.cos(a2) * d, y + KZ_DECK + 9 + R() * 8, s.z + Math.sin(a2) * d, 9 + R() * 6, 6 + R() * 4, 9 + R() * 6, R() * 6, k % 3 ? 0xF8B8D0 : 0x8AD070);
}
for (var ap = 0; ap < 24; ap++) {
var a3 = R() * 6.283, d3 = 6 + R() * 10;
kzI("ball", s.x + Math.cos(a3) * d3, y + KZ_DECK + 6 + R() * 4, s.z + Math.sin(a3) * d3, 0.5, 0.5, 0.5, 0, 0xE8404A);
}
var deck = wCyl(12.4, 12.4, 0.4, kzM(0xC89A6A), 0, KZ_DECK - 0.2, 0, g, 36);
var rail = wMesh(new THREE.TorusGeometry(12.2, 0.09, 6, 64), kzM(0xF0C850), 0, KZ_DECK + 1.05, 0, g);
rail.rotation.x = Math.PI / 2;
for (var p = 0; p < 36; p++) {
var a4 = p / 36 * 6.283;
if (Math.abs(a4 - Math.PI) < 0.12 || Math.abs(a4 - 0.73) < 0.1)
continue;
wCyl(0.07, 0.07, 1.05, kzM(0xF0C850), Math.cos(a4) * 12.2, KZ_DECK + 0.5, Math.sin(a4) * 12.2, g, 6);
}
for (var q = 0; q < 6; q++) {
var a5 = q / 6 * 6.283 + 0.4;
wCyl(0.35, 0.45, KZ_DECK, bark, Math.cos(a5) * 11, KZ_DECK / 2, Math.sin(a5) * 11, g, 8);
KZ.solids.push({ x: s.x + Math.cos(a5) * 11, z: s.z + Math.sin(a5) * 11, r: 0.5, h: KZ_DECK - 0.6 });
}
kzPlat({ x: s.x, z: s.z, r0: 4.2, r1: 12.3, top: deckY, rail: true });
[["The Lookout", -Math.PI / 2, 0x48A8E0], ["The Reading Nook", Math.PI / 2 + 0.5, 0xF0903A], ["The Owl's Nest", Math.PI / 2 - 0.6, 0x9A5AD0]].forEach(function (h, i) {
var hx = Math.cos(h[1]) * 8.6, hz = Math.sin(h[1]) * 8.6, hg = kzAt(g, hx, hz, Math.atan2(-hx, -hz) + Math.PI, KZ_DECK);
wCyl(1.6, 1.6, 2.2, kzM(0xF6EEDC), 0, 1.1, 0, hg, 16);
var cp = wMesh(kzIGeo("cap"), kzM(h[2]), 0, 2.1, 0, hg);
cp.scale.set(4.4, 2.4, 4.4);
var dr = wMesh(new THREE.CircleGeometry(0.55, 16), kzM(0x6A4A2A), 0, 0.8, 1.61, hg);
var sg = kzTwoSided([h[0]], 1.6, 0.36, "#5A2E7A", "#FFF2C8");
sg.position.set(0, 2.4, 1.9);
hg.add(sg);
KZ.solids.push({ x: s.x + hx, z: s.z + hz, r: 1.7, b: KZ_DECK - 0.5 });
var fx = s.x + hx * 0.72, fz = s.z + hz * 0.72;
if (i === 0)
kzSpot(fx, fz, 2.4, "The Lookout", "look through the telescope", function () { worldCard(worldFacts("The Lookout", "from the Great Treehouse", [], ["North: the Rainbow Toadstool and the Welcome Glade, with the fountain.", "West: Bubble Meadow, Critter Corner and the Lily Pond, with the Lotus Island in the middle.", "East: the Singing Mushrooms, the Carousel and the Little Schoolhouse, and the Cloud Bounce climbing into the sky.", "South: Storybook Hollow, the Flower Maze, the Colouring Garden and Star Lantern Hill.", "Far to the south-west, in the cliff: the Glow-worm Grotto."])); }, { high: true });
if (i === 1)
kzSpot(fx, fz, 2.4, "The Reading Nook", "read a story", function () { kzStoryCard(); }, { high: true });
if (i === 2) {
if (typeof build === "function")
try {
var ow = build({ id: "kz_owl", archetype: "owl", label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
ow.position.set(0, 2.9, 0);
ow.userData.keep = 1;
hg.add(ow);
}
catch (e) { }
kzSpot(fx, fz, 2.4, "The Owl's Nest", "say hello to the owl", function () { setStatus("<b>Hoo!</b> The owl blinks slowly at you, then tucks its head under its wing for a nap."); }, { high: true });
}
});
var lx = s.x + 6.4, lz = s.z + 5.2, fl = kzAt(G, lx, lz, 0, y);
wCyl(0.25, 0.3, KZ_DECK, kzM(0x5AA048), 0, KZ_DECK / 2, 0, fl, 8);
var bud = new THREE.Group();
bud.userData.keep = 1;
fl.add(bud);
KZ.liftBud = bud;
for (var b = 0; b < 6; b++) {
var pt = wMesh(kzIGeo("petal"), kzM(0xF07AA8), 0, 0.6, 0, bud);
pt.scale.set(1.8, 1.6, 1.2);
pt.rotation.set(0, b / 6 * 6.283, -0.9);
}
wCyl(1.1, 1.1, 0.18, kzM(0xF0D040), 0, 0.1, 0, bud, 16);
KZ.liftAt = { x: lx, z: lz, y0: y, y1: deckY };
kzSpot(lx, lz, 2.6, "The flower lift", "ride up to the Great Treehouse", function () { kzLift(true); }, { low: true });
kzSpot(lx, lz, 2.6, "The flower lift", "ride down to the ground", function () { kzLift(false); }, { high: true });
KZ.exits = [{ x: lx, z: lz, r: 1.4 }];
var pts = [], sx0 = s.x - 12.6, sz0 = s.z;
for (var i = 0; i <= 40; i++) {
var t = i / 40, ang = Math.PI + t * Math.PI * 1.4, rad = 12.8 + t * 8, h = KZ_DECK * (1 - t) * (1 - t * 0.15) + 0.4 * t;
var px = s.x + Math.cos(ang) * rad, pz = s.z + Math.sin(ang) * rad;
pts.push(new THREE.Vector3(px, kzHeight(px, pz) * t + (y) * (1 - t) + h - (t > 0.95 ? 0 : 0), pz));
}
var curve = new THREE.CatmullRomCurve3(pts);
KZ.slide = curve;
kzSlideMesh(G, curve);
KZ.exits.push({ x: s.x - 12.4, z: s.z, r: 1.5 });
kzSpot(s.x - 11.2, s.z, 2.2, "The Rainbow Slide", "whoosh down!", function () { kzRide("slide"); }, { high: true });
for (var sp = 0; sp < curve.points.length; sp += 4) {
var cp2 = curve.points[sp];
if (cp2.y - kzHeight(cp2.x, cp2.z) > 2.5)
wCyl(0.14, 0.14, cp2.y - kzHeight(cp2.x, cp2.z) - 0.3, kzM(0xF0C850), cp2.x, kzHeight(cp2.x, cp2.z) + (cp2.y - kzHeight(cp2.x, cp2.z)) / 2 - 0.2, cp2.z, G, 6);
}
var ox = s.x + 24, oz = s.z - 26, oy = kzHeight(ox, oz), og = kzAt(G, ox, oz, 0, oy);
wCyl(2.2, 3, KZ_DECK + 6, bark, 0, (KZ_DECK + 6) / 2, 0, og, 14);
KZ.solids.push({ x: ox, z: oz, r: 3, h: KZ_DECK - 0.6 });
wCyl(6.2, 6.2, 0.4, kzM(0xC89A6A), 0, deckY - oy - 0.2, 0, og, 28);
var r2 = wMesh(new THREE.TorusGeometry(6, 0.09, 6, 48), kzM(0xF0C850), 0, deckY - oy + 1.05, 0, og);
r2.rotation.x = Math.PI / 2;
for (var k2 = 0; k2 < 8; k2++)
kzI("canopy", ox + Math.cos(k2) * 4, deckY + 6 + R() * 4, oz + Math.sin(k2) * 4, 7, 5, 7, R() * 6, 0xB8E8A0);
kzPlat({ x: ox, z: oz, r0: 2.1, r1: 6.1, top: deckY, rail: true });
var dx = ox - s.x, dz = oz - s.z, dl = Math.hypot(dx, dz), ux = dx / dl, uz = dz / dl, b0 = 12.1, b1 = dl - 6, mx = s.x + ux * (b0 + b1) / 2, mz = s.z + uz * (b0 + b1) / 2, len = b1 - b0 + 0.8, rot = Math.atan2(ux, uz);
var br = kzAt(G, mx, mz, rot, deckY);
for (var pl = 0; pl < Math.floor(len / 0.5); pl++)
wBox(1.8, 0.1, 0.38, kzM(pl % 2 ? 0xB88A5A : 0xC89A6A), 0, -0.05, -len / 2 + pl * 0.5 + 0.25, br);
[-1, 1].forEach(function (k3) { var rope = wCyl(0.05, 0.05, len, kzM(0xE8D8A8), k3 * 0.95, 1, 0, br, 6); rope.rotation.x = Math.PI / 2; });
kzPlat({ x: mx, z: mz, hw: 0.95, hd: len / 2, rot: -rot, top: deckY, rail: true });
kzSpot(ox + Math.cos(2.3) * 4, oz + Math.sin(2.3) * 4, 2.4, "The Owl Tower's telescope", "look at the stars", function () { setStatus("<b>Through the telescope:</b> even in the afternoon you can see a pale moon over Wonderglen, and a little cloud waving at you from the Cloud Bounce."); }, { high: true });
kzFact("tree", s.x + 9, s.z + 16);
},
function (G, curve) {
var N = 120, pos = [], col = [], idx = [], c = new THREE.Color(), up = new THREE.Vector3(0, 1, 0);
for (var i = 0; i <= N; i++) {
var t = i / N, p = curve.getPointAt(t), tg = curve.getTangentAt(t), side = new THREE.Vector3().crossVectors(tg, up).normalize();
for (var k = 0; k <= 6; k++) {
var u = k / 6, a = (u - 0.5) * Math.PI * 0.9, w = 0.95;
var q = p.clone().addScaledVector(side, Math.sin(a) * w);
q.y += 0.9 - Math.cos(a) * 0.9;
pos.push(q.x, q.y, q.z);
c.setHex(KZ_RAINBOW[Math.min(6, k)][0]);
col.push(c.r, c.g, c.b);
}
}
for (var j = 0; j < N; j++)
for (var m = 0; m < 6; m++) {
var a1 = j * 7 + m, b1 = a1 + 7;
idx.push(a1, b1, a1 + 1, b1, b1 + 1, a1 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setIndex(idx);
g.computeVertexNormals();
var mesh = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }));
mesh.userData.keep = 1;
mesh.name = "kz-slide";
G.add(mesh);
},
function (k) {
if (KZ.ride)
return;
worldCard(null);
if (k === "train") {
kzZooTrainBoard();
return;
}
if (k === "slide") {
KZ.ride = { k: "slide", t: 0, d: 5.5 };
if (typeof playTone === "function")
playTone(660, 0.8);
setStatus("<b>Wheeeee!</b>");
return;
}
if (k === "carousel") {
var C = KZ.carousel, L = worldLocal(), best = 0, bd = 1e9;
C.seats.forEach(function (S, i) { var p = kzSeatPos(S); var d = Math.hypot(p.x - L.x, p.z - L.z); if (d < bd) {
bd = d;
best = i;
} });
KZ.ride = { k: "carousel", t: 0, d: (Math.PI * 2) / C.sp, seat: best };
setStatus("<b>Off you go!</b> All the way round on " + esc(C.seats[best].name) + ". Look about while you ride.");
}
},
function (dt) {
var R = KZ.ride;
if (!R)
return;
if (R.k === "train")
return;
R.t += dt;
var P = camera.position, B = KZ.base, k = Math.min(1, R.t / R.d), e = k * k * (3 - 2 * k);
if (R.k === "lift") {
var A = KZ.liftAt, yy = R.from + (R.to - R.from) * e;
P.set(B + A.x, yy + 1.72, A.z);
if (KZ.liftBud)
KZ.liftBud.position.y = yy - A.y0;
WLD.hop = 0;
WLD.hv = 0;
if (k >= 1) {
KZ.ride = null;
KZ.onPlat = R.up ? KZ.plats.filter(function (p) { return p.r0 === 4.2; })[0] : null;
setStatus(R.up ? "<b>The Great Treehouse.</b> Walk round the deck: the Lookout, the Reading Nook, the Owl's Nest, the rope bridge to the Owl Tower, and the Rainbow Slide on the far side." : "Back on the ground.");
}
return;
}
if (R.k === "slide") {
var c = KZ.slide, t = Math.min(1, R.t / R.d), tt = t * t * (1.2 - 0.2 * t), p = c.getPointAt(Math.min(1, tt)), tg = c.getTangentAt(Math.min(0.999, tt));
P.set(B + p.x, p.y + 1.2, p.z);
yaw = Math.atan2(-tg.x, -tg.z);
WLD.hop = 0;
WLD.hv = 0;
if (t >= 1) {
KZ.ride = null;
KZ.onPlat = null;
P.y = kzHeight(p.x, p.z) + 1.72;
kzWin("slide", "<b>Whoosh!</b> Down the Rainbow Slide.");
}
return;
}
if (R.k === "carousel") {
var C = KZ.carousel, S = C.seats[R.seat], q = kzSeatPos(S);
P.set(B + q.x, q.y + 1.5, q.z);
WLD.hop = 0;
WLD.hv = 0;
if (R.t >= R.d) {
KZ.ride = null;
var gx = C.x + Math.sin(C.gate) * 11.5, gz = C.z + Math.cos(C.gate) * 11.5;
P.set(B + gx, kzHeight(gx, gz) + 1.72, gz);
kzWin("carousel", "<b>All the way round!</b> " + esc(S.name) + " gives a happy nod.");
}
}
},
function (G) {
var s = KZ_SITE.carousel, y = kzHeight(s.x, s.z), g = kzAt(G, s.x, s.z, 0, y);
wCyl(9.4, 9.6, 0.5, kzM(0xF0E0F0), 0, 0.25, 0, g, 36);
kzPlat({ x: s.x, z: s.z, r: 9.6, top: y + 0.5 });
var spin = new THREE.Group();
spin.position.y = 0.5;
spin.userData.keep = 1;
g.add(spin);
wCyl(8.8, 8.8, 0.1, kzM(0xC89A6A), 0, 0.05, 0, spin, 36);
wCyl(0.8, 0.8, 6, kzM(0xF0C850), 0, 3, 0, g, 16);
wCyl(1.8, 1.8, 3, kzM(0xE8A0C8), 0, 2, 0, g, 16);
var stripes = [0xE8505A, 0xFFF4F0, 0x48A8E0, 0xFFF4F0];
for (var i = 0; i < 16; i++) {
var cn = new THREE.Mesh(new THREE.ConeGeometry(10.2, 3.2, 32, 1, true, i / 16 * 6.283, 6.283 / 16), kzM(stripes[i % 4], { ds: true }));
cn.position.y = 7.6;
g.add(cn);
}
for (var sc = 0; sc < 24; sc++) {
var a = sc / 24 * 6.283;
wSph(0.55, kzM(sc % 2 ? 0xF0C850 : 0xE8505A), Math.cos(a) * 10, 6, Math.sin(a) * 10, g, 10).scale.y = 0.6;
}
wSph(0.6, kzM(0xF0C850), 0, 9.4, 0, g, 12);
KZ.solids.push({ x: s.x, z: s.z, r: 1.9, h: 6 });
var beasts = [["unicorn", "Starlight the moonfoal", 0.75], ["pegasus", "Breezy the winged pony", 0.7], ["stag", "Fernly the stag", 0.7], ["fox", "Rusty the fox", 1.4], ["rabbit", "Buttons the bunny", 2.4], ["frog", "Hopsworth the frog", 2.6], ["turtle", "Shelby the turtle", 1.6], ["kitsune", "Twinkle the fox spirit", 1.2]];
var C = { x: s.x, z: s.z, spin: spin, sp: 0.3, ang: 0, seats: [], gate: 0.0, y: y };
beasts.forEach(function (b, i) {
var a = i / 8 * 6.283, r = 6.4, bg = new THREE.Group();
bg.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
bg.rotation.y = -a;
spin.add(bg);
wCyl(0.07, 0.07, 6, kzM(0xF0C850), 0, 3, 0, bg, 8);
var hold = new THREE.Group();
bg.add(hold);
try {
if (typeof build === "function") {
var m = build({ id: "kz_car_" + b[0], archetype: b[0], label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
m.scale.multiplyScalar(b[2]);
m.rotation.y = Math.PI / 2;
hold.add(m);
}
}
catch (e) { }
var saddle = wSph(0.35, kzM(KZ_CAPS[i % 6]), 0, 1.25, 0, hold, 10);
saddle.scale.set(1.2, 0.4, 1.6);
C.seats.push({ g: bg, hold: hold, a: a, r: r, name: b[1], ph: i * 0.8 });
});
KZ.carousel = C;
var gx = s.x + Math.sin(C.gate) * 11.5, gz = s.z + Math.cos(C.gate) * 11.5;
kzSign(G, gx + 3, gz, 0, ["THE CAROUSEL OF FRIENDLY BEASTS", "press E for a ride"], 3.4, 0.9, "#9A2E4A", "#FFF8E0");
kzSpot(gx, gz, 3.2, "The Carousel", "ride a friendly beast", function () { kzRide("carousel"); });
kzFolkAt(kzFolk("carousel"), gx - 2.5, gz + 0.5, 0, {});
kzFact("carousel", s.x - 14, s.z + 8);
},
function (G) {
var s = KZ_SITE.clouds, y = kzHeight(s.x, s.z), cols = [0xFFFFFF, 0xF8E8FF, 0xE8F4FF, 0xFFF0F8];
KZ.clouds = [];
for (var i = 0; i < 12; i++) {
var top = i === 11 ? y + 13 : y + 0.7 + i * 1.15, a = i * 0.62, r = i === 11 ? 0 : 6 + i * 0.9, x = s.x + Math.cos(a) * r, z = s.z + Math.sin(a) * r, rad = i === 11 ? 4.6 : 2.7;
var g = new THREE.Group();
g.position.set(x, top - 0.55, z);
g.userData.keep = 1;
G.add(g);
for (var k = 0; k < 7; k++) {
var ka = k / 7 * 6.283, kd = k ? rad * 0.6 : 0;
var b = wSph(rad * (k ? 0.55 : 0.75), kzM(cols[(i + k) % 4]), Math.cos(ka) * kd, 0, Math.sin(ka) * kd, g, 12);
b.scale.y = 0.45;
}
var P = kzPlat({ x: x, z: z, r: rad * 0.95, top: top, cloud: true, g: g, y0: top - 0.55 });
KZ.clouds.push(P);
if (i === 11) {
KZ_RAINBOW.forEach(function (c, j) { var t = new THREE.Mesh(new THREE.TorusGeometry(3.2 - j * 0.22, 0.12, 6, 30, Math.PI), kzGlowM(c[0], 0.3)); t.position.set(0, 0.4, -2); g.add(t); });
KZ.cloudTop = P;
}
}
kzFolkAt(kzFolk("clouds"), s.x + 9, s.z + 12, kzFace(s.x + 9, s.z + 12, s.x, s.z), {});
kzSign(G, s.x + 12, s.z + 14, kzFace(s.x + 12, s.z + 14, s.x, s.z) + Math.PI, ["THE CLOUD BOUNCE", "boing up to the Rainbow Cloud!"], 2.8, 0.9, "#4A7AC8", "#FFF8E0");
kzFact("clouds", s.x - 14, s.z + 14);
},
function (dt, L) {
KZ.clouds.forEach(function (P, i) { P.g.position.y = P.y0 + Math.sin(KZ.t * 0.9 + i) * 0.06; });
var on = KZ.onPlat && KZ.onPlat.cloud ? KZ.onPlat : null;
if (on && WLD.hop <= 0.001 && WLD.hv <= 0 && !KZ.ride) {
WLD.hv = (keys && keys["Space"]) ? 8.2 : 6.6;
if (typeof playTone === "function")
playTone(300 + KZ.clouds.indexOf(on) * 40, 0.18);
}
if (WLD.hop > 0 && WLD.hv < 0) {
var foot = L.y - 1.72, base = foot - WLD.hop;
for (var i = 0; i < KZ.clouds.length; i++) {
var C = KZ.clouds[i];
if (C.top <= base + 0.62 || C.top > foot + 0.05)
continue;
if (!kzInPlat(C, L.x, L.z))
continue;
camera.position.y = C.top + 1.72;
WLD.hop = 0;
WLD.hv = 0;
KZ.onPlat = C;
break;
}
}
if (on === KZ.cloudTop && !(KZ.won && KZ.won.clouds)) {
KZ.won = KZ.won || {};
KZ.won.clouds = 1;
kzWin("clouds", "<b>You bounced all the way to the Rainbow Cloud!</b> What a view.");
}
},
function (G) {
var s = KZ_SITE.maze, N = 13, C = 4, half = N * C / 2, R = wRand(2025), y = kzHeight(s.x, s.z);
var vis = [], walls = {};
for (var i = 0; i < N * N; i++)
vis.push(false);
function key(a, b) { return a < b ? a + ":" + b : b + ":" + a; }
for (var a = 0; a < N * N; a++) {
var cx = a % N, cz = (a / N) | 0;
if (cx < N - 1)
walls[key(a, a + 1)] = 1;
if (cz < N - 1)
walls[key(a, a + N)] = 1;
}
var stack = [Math.floor(N * N / 2)];
vis[stack[0]] = true;
while (stack.length) {
var c = stack[stack.length - 1], x = c % N, z = (c / N) | 0, nb = [];
if (x > 0 && !vis[c - 1])
nb.push(c - 1);
if (x < N - 1 && !vis[c + 1])
nb.push(c + 1);
if (z > 0 && !vis[c - N])
nb.push(c - N);
if (z < N - 1 && !vis[c + N])
nb.push(c + N);
if (!nb.length) {
stack.pop();
continue;
}
var n = nb[Math.floor(R() * nb.length)];
delete walls[key(c, n)];
vis[n] = true;
stack.push(n);
}
var hedge = [0x4E9A48, 0x5AA850, 0x46903E], bloom = KZ_PETALS;
function wall(x0, z0, x1, z1) {
var L = Math.hypot(x1 - x0, z1 - z0), n = Math.max(2, Math.round(L / 1.4));
for (var k = 0; k <= n; k++) {
var t = k / n, wx = s.x + x0 + (x1 - x0) * t, wz = s.z + z0 + (z1 - z0) * t, wy = kzHeight(wx, wz);
kzI("canopy", wx, wy + 1.1, wz, 1.7, 2.4, 1.7, k, hedge[k % 3]);
if (k % 2 === 0)
kzI("bloom", wx, wy + 2.35, wz, 0.32, 0.32, 0.32, k, bloom[(k + Math.round(x0)) % 7]);
}
KZ.solids.push({ x: s.x + (x0 + x1) / 2, z: s.z + (z0 + z1) / 2, hw: Math.abs(x1 - x0) / 2 + 0.55, hd: Math.abs(z1 - z0) / 2 + 0.55, rot: 0, h: 2.4 });
}
var gate = Math.floor(N / 2);
wall(-half, -half, half, -half);
wall(-half, half, half, half);
wall(-half, -half, -half, half);
wall(half, -half, half, -half + gate * C);
wall(half, -half + (gate + 1) * C, half, half);
Object.keys(walls).forEach(function (k) {
var p = k.split(":"), a1 = +p[0], b1 = +p[1], ax = a1 % N, az = (a1 / N) | 0;
if (b1 === a1 + 1) {
var wx = -half + (ax + 1) * C;
wall(wx, -half + az * C, wx, -half + (az + 1) * C);
}
else {
var wz = -half + (az + 1) * C;
wall(-half + ax * C, wz, -half + (ax + 1) * C, wz);
}
});
var wg = kzAt(G, s.x + C / 2 * ((N % 2) ? 0 : 1), s.z, 0);
wCyl(1.4, 1.5, 1, kzM(0xC8B8D8), 0, 0.5, 0, wg, 18);
wCyl(1.2, 1.2, 0.06, kzM(0x6AC8E0), 0, 0.9, 0, wg, 18);
[-1, 1].forEach(function (k) { wCyl(0.08, 0.08, 2.2, kzM(0x8A5A3A), k * 1.3, 1.6, 0, wg, 6); });
var rf = wCone(1.9, 1, kzM(0xE8505A), 0, 3.1, 0, wg, 6);
KZ.solids.push({ x: wg.position.x, z: s.z, r: 1.5, h: 1 });
KZ.well = { x: wg.position.x, z: s.z };
kzSpot(wg.position.x, s.z, 2.8, "The Wishing Well", "make a wish", function () { setStatus("<b>You make a wish</b> and drop it in. Far below, the water twinkles, just once, as if it heard you."); });
var gx = s.x + half + 3, gz = s.z - half + gate * C + C / 2;
kzSign(G, gx + 2, gz + 4, -Math.PI / 2, ["THE FLOWER MAZE", "find the Wishing Well!"], 2.6, 0.9, "#3A7A3A", "#FFF8E0");
kzFolkAt(kzFolk("maze"), gx + 2, gz - 3, -Math.PI / 2, {});
kzFact("maze", gx + 4, gz + 8);
},
function (G) {
var s = KZ_SITE.story, y = kzHeight(s.x, s.z), g = kzAt(G, s.x, s.z - 10, 0, y);
[-1, 1].forEach(function (k) {
var pg = wBox(6.2, 7.6, 0.4, kzM(0xFFF8EC), k * 3.3, 4.2, 0, g);
pg.rotation.y = -k * 0.35;
var cv = wBox(6.5, 7.9, 0.2, kzM(0x9A3A5A), k * 3.4, 4.2, -0.3, g);
cv.rotation.y = -k * 0.35;
for (var l = 0; l < 8; l++) {
var ln = wBox(4.6, 0.08, 0.02, kzM(0xC8B8A8), k * 3.3, 6.6 - l * 0.6, 0.22, g);
ln.rotation.y = -k * 0.35;
}
});
wCyl(0.25, 0.25, 7.8, kzM(0x7A2A4A), 0, 4.2, -0.2, g, 10);
KZ.solids.push({ x: s.x, z: s.z - 10, hw: 6.8, hd: 1.2, rot: 0 });
kzMushroom(G, s.x, s.z - 5, 1.0, 0x9A6AD8, { noSolid: false });
for (var r = 0; r < 3; r++)
for (var i = 0; i < 7; i++) {
var a = -0.9 + i * 0.3, rr = 8 + r * 3.4, lx = s.x + Math.sin(a) * rr, lz = s.z - 5 + Math.cos(a) * rr;
var lg = wCyl(0.4, 0.4, 2, kzM(0x9A6A4A), lx, kzHeight(lx, lz) + 0.4, lz, G, 10);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = -a;
}
kzFolkAt(kzFolk("story"), s.x, s.z - 3.5, 0, { fn: function () { kzStoryCard(); } });
kzSpot(s.x, s.z, 4.4, "Storybook Hollow", "hear a story", function () { kzStoryCard(); });
kzFact("story", s.x + 14, s.z + 6);
},
function () {
var S = [];
function rect(n, x0, y0, x1, y1) { var s = new THREE.Shape(); s.moveTo(x0, y0); s.lineTo(x1, y0); s.lineTo(x1, y1); s.lineTo(x0, y1); s.lineTo(x0, y0); S.push([n, s]); }
function circ(n, x, y, r) { var s = new THREE.Shape(); s.absarc(x, y, r, 0, Math.PI * 2, false); S.push([n, s]); }
function hill(n, cx, r) { var s = new THREE.Shape(), a0 = Math.acos(Math.min(1, 0)); s.moveTo(cx - r, 0); for (var i = 0; i <= 24; i++) {
var a = Math.PI - i / 24 * Math.PI;
s.lineTo(cx + Math.cos(a) * r, Math.sin(a) * r * 0.55);
} s.lineTo(cx - r, 0); S.push([n, s]); }
function band(n, r0, r1) { var s = new THREE.Shape(); for (var i = 0; i <= 24; i++) {
var a = Math.PI - i / 24 * Math.PI;
var x = -1.5 + Math.cos(a) * r1, y = 1.5 + Math.sin(a) * r1;
if (!i)
s.moveTo(x, y);
else
s.lineTo(x, y);
} for (var j = 24; j >= 0; j--) {
var a2 = Math.PI - j / 24 * Math.PI;
s.lineTo(-1.5 + Math.cos(a2) * r0, 1.5 + Math.sin(a2) * r0);
} S.push([n, s]); }
function tri(n, a, b, c) { var s = new THREE.Shape(); s.moveTo(a[0], a[1]); s.lineTo(b[0], b[1]); s.lineTo(c[0], c[1]); s.lineTo(a[0], a[1]); S.push([n, s]); }
rect("the sky", -8, 0, 8, 9);
band("the rainbow's outside stripe", 4.6, 5.4);
band("the rainbow's middle stripe", 3.8, 4.6);
band("the rainbow's inside stripe", 3.0, 3.8);
circ("the sun", 5.6, 7.3, 1.1);
circ("the left cloud", -5.6, 7.6, 0.8);
circ("the right cloud", 2.2, 8.0, 0.7);
hill("the far hill", 4, 6);
hill("the near hill", -5, 5);
rect("the house", 2.6, 0.4, 6.0, 3.2);
tri("the roof", [2.2, 3.2], [6.4, 3.2], [4.3, 5.0]);
rect("the door", 3.8, 0.4, 4.8, 2.0);
rect("the window", 5.1, 1.8, 5.7, 2.5);
rect("the tree trunk", -1.4, 0.4, -0.8, 2.6);
circ("the tree's leaves", -1.1, 3.4, 1.3);
circ("the red flower", -6.6, 1.2, 0.45);
circ("the blue flower", -3.6, 0.9, 0.45);
circ("the yellow flower", 0.8, 1.0, 0.45);
return S;
},
function (G) {
var s = KZ_SITE.paint, y = kzHeight(s.x, s.z), g = kzAt(G, s.x, s.z - 8, 0, y);
g.userData.keep = 1;
wBox(17, 10, 0.4, kzM(0x8A5A3A), 0, 5.3, -0.25, g);
[-8.6, 8.6].forEach(function (k) { wCyl(0.3, 0.35, 10.6, kzM(0x8A5A3A), k, 5.3, -0.2, g, 10); });
var board = new THREE.Group();
board.position.set(0, 0.8, 0.01);
g.add(board);
var saved = kzLocalGet("wall") || {};
KZ.wall = { g: g, board: board, regions: [], hold: null };
kzWallShapes().forEach(function (q, i) {
var mat = new THREE.MeshLambertMaterial({ color: saved[i] !== undefined ? saved[i] : 0xFFFFFF, side: THREE.DoubleSide });
var m = new THREE.Mesh(new THREE.ShapeGeometry(q[1], 16), mat);
m.position.z = i * 0.012;
m.userData.region = i;
board.add(m);
var pts = q[1].getPoints(24).map(function (p) { return new THREE.Vector3(p.x, p.y, i * 0.012 + 0.006); });
pts.push(pts[0].clone());
var ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x2A2A3A }));
board.add(ln);
KZ.wall.regions.push({ name: q[0], m: m, mat: mat });
});
KZ.solids.push({ x: s.x, z: s.z - 8.3, hw: 8.8, hd: 0.5, rot: 0 });
KZ_WALL_COLS.forEach(function (c, i) {
var px = s.x - 8 + i * 2, pz = s.z + 4, pg = kzAt(G, px, pz, 0);
wCyl(0.4, 0.4, 0.7, kzM(0xC8C8D0), 0, 0.35, 0, pg, 14);
wCyl(0.36, 0.36, 0.05, kzM(c[0]), 0, 0.71, 0, pg, 14);
var br = wCyl(0.03, 0.03, 0.8, kzM(0x8A5A3A), 0.15, 1, 0, pg, 6);
br.rotation.z = 0.4;
KZ.solids.push({ x: px, z: pz, r: 0.45, h: 0.8 });
kzSpot(px, pz + 0.9, 1.2, "The " + c[1] + " paint", "dip your brush", function () { KZ.wall.hold = i; if (typeof playTone === "function")
playTone(500 + i * 30, 0.2); setStatus("<b>Your brush is " + c[1] + ".</b> Look at a part of the Great Colouring Wall and press E to colour it."); }, { pot: i });
});
kzSign(G, s.x + 11, s.z + 2, -0.6, ["THE GREAT COLOURING WALL", "dip a brush · look · press E"], 3.2, 0.9, "#9A3A7A", "#FFF8E0");
kzSpot(s.x + 11, s.z + 4, 2.6, "Wash the Great Colouring Wall", "start a fresh picture", function () { KZ.wall.regions.forEach(function (r) { r.mat.color.setHex(0xFFFFFF); }); kzLocalSet("wall", {}); setStatus("The wall is clean and white again, ready for a new picture."); });
kzFolkAt(kzFolk("paint"), s.x - 11, s.z + 1, 0.5, {});
kzFact("paint", s.x + 12, s.z + 10);
},
function () {
var W = KZ.wall;
if (!W || W.hold === null || W.hold === undefined)
return null;
var L = worldLocal(), s = KZ_SITE.paint;
if (Math.hypot(L.x - s.x, L.z - (s.z - 8)) > 30)
return null;
if (!KZ_RAY)
KZ_RAY = new THREE.Raycaster();
var dir = new THREE.Vector3();
camera.getWorldDirection(dir);
KZ_RAY.set(camera.position, dir);
KZ_RAY.far = 34;
var hits = KZ_RAY.intersectObjects(W.regions.map(function (r) { return r.m; }), false);
if (!hits.length)
return null;
var best = hits[0];
hits.forEach(function (h) { if (Math.abs(h.distance - best.distance) < 0.05 && h.object.userData.region > best.object.userData.region)
best = h; });
return W.regions[best.object.userData.region];
},
function (r) {
var W = KZ.wall, c = KZ_WALL_COLS[W.hold];
r.mat.color.setHex(c[0]);
var saved = kzLocalGet("wall") || {};
saved[W.regions.indexOf(r)] = c[0];
kzLocalSet("wall", saved);
if (typeof playTone === "function")
playTone(420 + W.hold * 40, 0.25);
var done = W.regions.every(function (q) { return q.mat.color.getHex() !== 0xFFFFFF; });
if (done && !(KZ.won && KZ.won.paint)) {
KZ.won = KZ.won || {};
KZ.won.paint = 1;
kzWin("paint", "<b>A masterpiece!</b> Every part of the Great Colouring Wall is coloured in.");
}
},
function (G) {
var s = KZ_SITE.critters, R = wRand(5150);
for (var i = 0; i < 56; i++) {
var a = i / 56 * 6.283;
if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.16)
continue;
var x = s.x + Math.cos(a) * 30, z = s.z + Math.sin(a) * 30;
wCyl(0.1, 0.1, 1.1, kzM(0xFFF8F0), x, kzHeight(x, z) + 0.55, z, G, 6);
KZ.solids.push({ x: x, z: z, r: 0.6, h: 1.2 });
if (i % 2 === 0) {
var x2 = s.x + Math.cos(a + 0.056) * 30, z2 = s.z + Math.sin(a + 0.056) * 30, rl = wBox(0.08, 0.08, 3.4, kzM(0xF0C8D8), (x + x2) / 2, kzHeight(x, z) + 0.9, (z + z2) / 2, G);
rl.rotation.y = -a;
}
}
var bg = kzHouse(G, s.x - 14, s.z - 10, kzFace(s.x - 14, s.z - 10, s.x, s.z), 5, 0xE8505A, "The Critter Barn", { wall: 0xF0E0C8, door: 0xE8505A });
for (var h = 0; h < 4; h++) {
var hp = kzLocal(bg, -2.2 + h * 1.4, -2.6);
wCyl(0.5, 0.5, 0.6, kzM(0xE8C860), -2.2 + h * 1.4, 0.3, -2.6, bg, 10);
}
if (typeof build === "function")
KZ_CRITTERS.forEach(function (c, ci) {
for (var n = 0; n < (KZ_LITE ? Math.max(1, c[3] >> 1) : c[3]); n++) {
var a = R() * 6.283, d = 6 + R() * 18, x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
try {
var m = build({ id: "kz_cr_" + c[0] + n, archetype: c[0], label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
m.scale.multiplyScalar(c[2]);
m.position.set(x, kzHeight(x, z), z);
m.rotation.y = R() * 6;
m.userData.keep = 1;
G.add(m);
KZ.critters.push({ g: m, kind: c[0], name: c[1], wander: c[0] === "owl" ? null : { r: 10, sp: c[0] === "turtle" ? 0.2 : 0.7 }, home: { x: s.x, z: s.z }, hop: 0, heart: null });
}
catch (e) { }
}
});
kzFolkAt(kzFolk("critters"), s.x + 20, s.z + 3, -Math.PI / 2, {});
kzSign(G, s.x + 33, s.z - 4, Math.PI / 2, ["CRITTER CORNER", "gentle hands · clover is their favourite"], 2.8, 0.9, "#3A7A3A", "#FFF8E0");
kzFact("critters", s.x + 33, s.z + 6);
},
function (C) {
if (KZ.busy)
return;
if (!kzSigned())
return setStatus("Sign in, and the critters will eat the clover from your Backpack.");
if (kzHave("kz_clover") < 1)
return setStatus("<b>" + esc(C.name.replace(/^an? /, "The ")) + " sniffs your empty hands.</b> Find four-leaf clover in the patches round Critter Corner (press E at a clover patch).");
KZ.busy = true;
kzRpc("kids_feed", { p_critter: C.kind }).then(function (o) {
KZ.busy = false;
if (!o || o.ok === false)
return setStatus(esc((o && o.say) || "Not just now."));
C.hop = 1;
kzHeart(C.g);
KZ.fed[C.kind] = 1;
kzLocalSet("fed:" + kzToday(), KZ.fed);
var n = Object.keys(KZ.fed).length;
if (typeof loadStock === "function")
loadStock();
if (n >= 3 && !(KZ.won && KZ.won.critters)) {
KZ.won = KZ.won || {};
KZ.won.critters = 1;
kzWin("critters", "<b>" + esc(C.name.replace(/^a /, "The ").replace(/^an /, "The ")) + " munches the clover happily.</b> You fed three different critters!");
}
else
setStatus("<b>" + esc(C.name.replace(/^an? /, "The ")) + " munches the clover happily</b> and nuzzles your hand. (" + n + " of 3 kinds of critter fed today.)");
}).catch(function (e) { KZ.busy = false; setStatus(kzSaySoft(e)); });
},
function (G) {
var s = KZ_SITE.lanterns;
KZ_RAINBOW.forEach(function (c, i) {
var a = -0.9 + i * 0.3, x = s.x + Math.sin(a) * 12, z = s.z + Math.cos(a) * 12, g = kzAt(G, x, z, a + Math.PI);
wCyl(0.08, 0.1, 2.6, kzM(0x3A3A5A), 0, 1.3, 0, g, 8);
wBox(0.7, 0.06, 0.06, kzM(0x3A3A5A), 0.3, 2.6, 0, g);
var mat = new THREE.MeshLambertMaterial({ color: 0xD8D8E0, emissive: c[0], emissiveIntensity: 0 });
var lamp = wSph(0.38, mat, 0.6, 2.2, 0, g, 14);
lamp.scale.y = 1.3;
lamp.userData.keep = 1;
wCyl(0.25, 0.3, 0.12, kzM(0x3A3A5A), 0.6, 2.72, 0, g, 8);
KZ.solids.push({ x: x, z: z, r: 0.25 });
var L = { i: i, mat: mat, on: false, col: c };
KZ.lanterns.push(L);
kzSpot(x, z, 2.2, "The " + c[1] + " lantern", "light it", function () { kzLight(L); }, { lamp: i });
});
var ag = new THREE.Group();
ag.position.set(s.x, kzHeight(s.x, s.z) + 26, s.z - 30);
ag.visible = false;
ag.userData.keep = 1;
G.add(ag);
KZ.aurora = ag;
KZ_RAINBOW.forEach(function (c, i) { var r = new THREE.Mesh(new THREE.PlaneGeometry(70, 6, 20, 1), new THREE.MeshBasicMaterial({ color: c[0], transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, fog: false })); r.position.set(0, i * 3, -i * 2); r.rotation.x = -0.3; ag.add(r); });
kzFolkAt(kzFolk("lanterns"), s.x, s.z + 6, Math.PI, {});
kzSign(G, s.x + 16, s.z + 6, Math.PI * 0.8, ["STAR LANTERN HILL", "light them red to violet"], 2.6, 0.9, "#3A3A7A", "#FFF8E0");
kzFact("lanterns", s.x - 15, s.z + 6);
},
function (L) {
var next = KZ.lanterns.filter(function (q) { return q.on; }).length;
if (L.on)
return setStatus("That lantern is already glowing.");
if (L.i !== next) {
KZ.lanterns.forEach(function (q) { q.on = false; q.fade = 1; });
if (typeof playTone === "function")
playTone(200, 0.4);
return setStatus("<b>Oops!</b> The lanterns go out softly. Remember the rainbow: start with <b>red</b>, then orange, yellow, green, blue, indigo and violet.");
}
L.on = true;
if (typeof playTone === "function")
playTone(KZ_NOTES[L.i][0], 0.6);
if (next + 1 === 7) {
KZ.auroraT = 40;
kzWin("lanterns", "<b>All seven lanterns glow</b>, and colours ripple across the sky.");
}
else
setStatus("<b>The " + L.col[1] + " lantern glows.</b> " + (6 - next) + " to go.");
},
function (dt) {
KZ.lanterns.forEach(function (L) { var want = L.on ? 0.55 : 0; L.mat.emissiveIntensity += (want - L.mat.emissiveIntensity) * Math.min(1, dt * 2); });
if (KZ.aurora) {
var on = (KZ.auroraT || 0) > 0;
KZ.auroraT = Math.max(0, (KZ.auroraT || 0) - dt);
KZ.aurora.visible = on || KZ.aurora.children[0].material.opacity > 0.01;
KZ.aurora.children.forEach(function (r, i) { var want = on ? 0.22 + 0.06 * Math.sin(KZ.t * 0.4 + i) : 0; r.material.opacity += (want - r.material.opacity) * Math.min(1, dt * 0.8); r.position.x = Math.sin(KZ.t * 0.15 + i) * 4; });
if (!on && KZ.lanterns.every(function (L) { return L.on; }))
KZ.lanterns.forEach(function (L) { L.on = false; });
}
},
function (name, rep, nrm) {
var k = "kzg:" + name + (nrm ? ":n" : "");
if (KZ_MAT[k])
return KZ_MAT[k];
var url = "assets/textures/bundles/" + name + (nrm ? "_n" : (KZ_LITE ? "" : "-1k")) + ".jpg", t = new THREE.TextureLoader().load(url);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rep[0], rep[1]);
try {
t.anisotropy = Math.min(KZ_LITE ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (!nrm && THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (KZ_MAT[k] = t);
},
function (key, name, rep, col, o) {
o = o || {};
var k = "kzgm:" + key;
if (KZ_MAT[k])
return KZ_MAT[k];
var m;
if (KZ_LITE)
m = new THREE.MeshLambertMaterial({ color: col, map: kzgTex(name, rep) });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: kzgTex(name, rep), normalMap: kzgTex(name, rep, true), shininess: o.shine || 12, specular: o.spec || 0x101010 });
m.normalScale = new THREE.Vector2(o.ns || 1, o.ns || 1);
}
if (o.em && m.emissive)
m.emissive.setHex(o.em);
if (o.vc)
m.vertexColors = true;
if (o.side)
m.side = o.side;
return (KZ_MAT[k] = m);
},
function (r, amp, inner, seg) {
var g = new THREE.SphereGeometry(r, seg, Math.round(seg / 2), 0, Math.PI * 2, 0, Math.PI / 2).toNonIndexed(), P = g.attributes.position, U = g.attributes.uv, v = new THREE.Vector3(), keep = [], uk = [];
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i);
var d = v.clone().normalize(), n = kzgLump(d.x * 3, d.y * 3, d.z * 3, inner ? 1.3 : 1.3), low = Math.min(1, d.y * 4);
var rr = r + (inner ? -1 : 1) * amp * (0.55 + 0.45 * n) * (0.35 + 0.65 * low) + (inner ? 0 : amp * 0.4 * (1 - low));
v.copy(d).multiplyScalar(rr);
if (v.y < 0.02)
v.y = 0;
if (!inner)
v.y *= 0.78;
else
v.y *= 0.74;
P.setXYZ(i, v.x, v.y, v.z);
}
for (var t = 0; t < P.count; t += 3) {
var cx = (P.getX(t) + P.getX(t + 1) + P.getX(t + 2)) / 3, cy = (P.getY(t) + P.getY(t + 1) + P.getY(t + 2)) / 3, cz = (P.getZ(t) + P.getZ(t + 1) + P.getZ(t + 2)) / 3;
if (kzgInMouth(cx, cy, cz))
continue;
for (var j = 0; j < 3; j++) {
keep.push(P.getX(t + j), P.getY(t + j), P.getZ(t + j));
uk.push(U.getX(t + j), U.getY(t + j));
}
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(keep, 3));
G.setAttribute("uv", new THREE.Float32BufferAttribute(uk, 2));
if (inner) {
var pa = G.attributes.position;
for (var q = 0; q < pa.count; q += 3) {
var x = pa.getX(q + 1), y = pa.getY(q + 1), z = pa.getZ(q + 1);
pa.setXYZ(q + 1, pa.getX(q + 2), pa.getY(q + 2), pa.getZ(q + 2));
pa.setXYZ(q + 2, x, y, z);
var ua = G.attributes.uv, u1 = ua.getX(q + 1), u2 = ua.getY(q + 1);
ua.setXY(q + 1, ua.getX(q + 2), ua.getY(q + 2));
ua.setXY(q + 2, u1, u2);
}
}
G.computeVertexNormals();
var ua = G.attributes.uv, pz = G.attributes.position, nz = G.attributes.normal;
for (var t2 = 0; t2 < pz.count; t2 += 3) {
var ny3 = (Math.abs(nz.getY(t2)) + Math.abs(nz.getY(t2 + 1)) + Math.abs(nz.getY(t2 + 2))) / 3, top = ny3 > 0.62;
for (var j2 = 0; j2 < 3; j2++) {
var X = pz.getX(t2 + j2), Y = pz.getY(t2 + j2), Z = pz.getZ(t2 + j2);
if (top)
ua.setXY(t2 + j2, X / 7, Z / 7);
else
ua.setXY(t2 + j2, Math.atan2(Z, X) * r / 7, Y / 7);
}
}
var C = [], N = G.attributes.normal, pp = G.attributes.position;
for (var c = 0; c < pp.count; c++) {
var ny = N.getY(c), h = pp.getY(c), w = inner ? 0 : Math.max(0, Math.min(1, (ny - 0.35) * 2.2)) * (0.7 + 0.3 * Math.sin(pp.getX(c) * 1.7 + pp.getZ(c) * 1.3));
var col = inner ? [0.62 + 0.1 * Math.sin(h * 1.3), 0.6 + 0.08 * Math.sin(h * 1.3), 0.58] : [0.8 * (1 - w) + 0.42 * w, 0.78 * (1 - w) + 0.62 * w, 0.72 * (1 - w) + 0.3 * w];
C.push(col[0], col[1], col[2]);
}
G.setAttribute("color", new THREE.Float32BufferAttribute(C, 3));
return G;
},
function (seed, det) {
var g = new THREE.IcosahedronGeometry(1, det), P = g.attributes.position, v = new THREE.Vector3();
var N = [];
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i);
var n = kzgLump(v.x * 1.6, v.y * 1.6, v.z * 1.6, seed);
N.push(v.x, v.y * 1.2, v.z);
v.multiplyScalar(1 + n * 0.28);
P.setXYZ(i, v.x, v.y * 0.8, v.z);
}
g.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
g.normalizeNormals();
return g;
},
function () {
var k = "kzg:glow";
if (KZ_MAT[k])
return KZ_MAT[k];
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d"), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
gr.addColorStop(0, "rgba(255,255,255,1)");
gr.addColorStop(0.18, "rgba(255,255,255,0.85)");
gr.addColorStop(0.45, "rgba(255,255,255,0.22)");
gr.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = gr;
x.fillRect(0, 0, 64, 64);
return (KZ_MAT[k] = new THREE.CanvasTexture(c));
},
function () {
var k = "kzg:fern";
if (KZ_MAT[k])
return KZ_MAT[k];
var c = document.createElement("canvas");
c.width = 128;
c.height = 256;
var x = c.getContext("2d");
x.strokeStyle = "#3E6A2A";
x.lineWidth = 3;
x.beginPath();
x.moveTo(64, 256);
x.quadraticCurveTo(70, 120, 60, 6);
x.stroke();
for (var i = 0; i < 26; i++) {
var t = i / 26, y = 250 - t * 240, w = (1 - t) * 52 + 6, cx = 64 + Math.sin(t * 2.2) * 5;
[-1, 1].forEach(function (sd) { x.fillStyle = i % 2 ? "#4E8A32" : "#5A9A3A"; x.beginPath(); x.moveTo(cx, y); x.quadraticCurveTo(cx + sd * w * 0.6, y - 14, cx + sd * w, y - 4 - t * 6); x.quadraticCurveTo(cx + sd * w * 0.5, y - 2, cx, y); x.fill(); });
}
var t = new THREE.CanvasTexture(c);
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (KZ_MAT[k] = t);
},
function (G) {
var s = KZ_SITE.grotto, y = kzHeight(s.x, s.z), g = kzAt(G, s.x, s.z, 0, y), lite = KZ_LITE, R = wRand(808), r0 = KZG.R, P = KZG.pool;
g.userData.keep = 1;
var rockOut = kzgMat("out", "limestone", [1, 1], 0xC8C4BC, { vc: true, ns: 1.4 }), rockIn = kzgMat("in", "cave", [1, 1], 0xB8B2B4, { vc: true, shine: 40, spec: 0x2A2A30, ns: 1.6, em: 0x123232 });
var wet = kzgMat("wet", "cave", [1, 2], 0xB0A898, { shine: 60, spec: 0x303030 }), floorM = kzgMat("floor", "cave", [5, 5], 0x5A544E, { shine: 70, spec: 0x303438, ns: 1.4 }), stone = kzgMat("stone", "limestone", [1, 1], 0xA8A498, { ns: 1.4 }), deck = kzgMat("deck", "planks", [1, 3], 0x8A6A4A);
var out = new THREE.Mesh(kzgShell(r0 + 0.7, 1.6, false, lite ? 40 : 72), rockOut);
g.add(out);
var inn = new THREE.Mesh(kzgShell(r0, 1.6, true, lite ? 40 : 72), rockIn);
g.add(inn);
for (var i = 0; i < 40; i++) {
var a = i / 40 * 6.283;
if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.48)
continue;
KZ.solids.push({ x: s.x + Math.cos(a) * 13.6, z: s.z + Math.sin(a) * 13.6, r: 1.4 });
}
var rg = [kzgRockGeo(1, lite ? 1 : 2), kzgRockGeo(2.7, lite ? 1 : 2), kzgRockGeo(4.1, lite ? 1 : 2)];
for (var b = 0; b < 15; b++) {
var th = (b / 14 - 0.5) * 2 * KZG.mouth * 1.08, yy = 0.4 + 3.6 * Math.cos(th / KZG.mouth * Math.PI / 2) * (Math.abs(th) < KZG.mouth ? 1 : 0), bs = 0.9 + R() * 0.7, rr = r0 + 0.4;
var m = new THREE.Mesh(rg[b % 3], stone);
m.position.set(Math.cos(th) * rr, Math.max(0.3, yy * 0.85 + (b % 2) * 0.3), Math.sin(th) * rr);
m.scale.set(bs, bs * 0.9, bs * 1.2);
m.rotation.set(R() * 3, R() * 3, R() * 3);
g.add(m);
}
for (var b2 = 0; b2 < (lite ? 10 : 22); b2++) {
var a2 = R() * 6.283;
if (Math.abs(Math.atan2(Math.sin(a2), Math.cos(a2))) < 0.6)
a2 += 1.2;
var bs2 = 0.7 + R() * 1.6, rr2 = r0 + 1.4 + R() * 2;
var m2 = new THREE.Mesh(rg[b2 % 3], stone);
m2.position.set(Math.cos(a2) * rr2, bs2 * 0.25, Math.sin(a2) * rr2);
m2.scale.setScalar(bs2);
m2.rotation.y = R() * 6;
g.add(m2);
}
var fm = new THREE.MeshLambertMaterial({ map: kzgFernTex(), alphaTest: 0.4, side: THREE.DoubleSide }), fg = new THREE.PlaneGeometry(0.7, 1.4);
fg.translate(0, 0.7, 0);
fg.rotateX(-0.5);
var nf = lite ? 40 : 110, fi = new THREE.InstancedMesh(fg, fm, nf), M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3(), po = new THREE.Vector3();
for (var f = 0; f < nf; f++) {
var cl = f % 7, ca = (cl < 4 ? (cl - 1.5) * 0.32 : (R() * 6.283)), cr = (cl < 4 ? r0 + 1.3 + R() * 1.6 : r0 + 0.9 + R() * 1.2), fx = Math.cos(ca) * cr + (R() - 0.5) * 1.2, fz = Math.sin(ca) * cr + (R() - 0.5) * 1.2;
if (cl < 4 && Math.abs(fz) < 1.6 && fx > r0)
fz += fz < 0 ? -1.6 : 1.6;
e.set(0, R() * 6.283, 0);
q.setFromEuler(e);
var ss = 0.7 + R() * 0.8;
sc.set(ss, ss, ss);
po.set(fx, 0, fz);
M.compose(po, q, sc);
fi.setMatrixAt(f, M);
}
g.add(fi);
[-1, 1].forEach(function (sd) {
var lx = r0 + 1.4, lz = sd * 2.3;
wCyl(0.07, 0.09, 2.2, kzM(0x4A3A2A), lx, 1.1, lz, g, 8);
wBox(0.5, 0.08, 0.08, kzM(0x4A3A2A), lx, 2.15, lz - sd * 0.2, g);
wBox(0.26, 0.34, 0.26, kzGlowM(0xFFC870, 0.9), lx, 1.88, lz - sd * 0.42, g);
wCone(0.22, 0.16, kzM(0x2A2A2A), lx, 2.12, lz - sd * 0.42, g, 4).rotation.y = Math.PI / 4;
KZ.solids.push({ x: s.x + lx, z: s.z + lz, r: 0.3 });
});
var sh = new THREE.Shape();
sh.absarc(0, 0, r0 - 0.1, 0, Math.PI * 2, false);
var hole = new THREE.Path();
hole.absarc(P.x, -P.z, P.r, 0, Math.PI * 2, true);
sh.holes.push(hole);
var fl = new THREE.Mesh(new THREE.ShapeGeometry(sh, lite ? 24 : 48), floorM);
fl.rotation.x = -Math.PI / 2;
fl.position.y = 0.05;
g.add(fl);
var fuv = fl.geometry.attributes.uv;
for (var u = 0; u < fuv.count; u++)
fuv.setXY(u, fuv.getX(u) / 6, fuv.getY(u) / 6);
var basin = new THREE.Mesh(new THREE.SphereGeometry(P.r, 24, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x020507, side: THREE.BackSide }));
basin.scale.y = 3.4;
basin.position.set(P.x, 0.04, P.z);
g.add(basin);
var water = new THREE.Mesh(new THREE.CircleGeometry(P.r, 32), new THREE.MeshPhongMaterial({ color: 0x0C2A30, transparent: true, opacity: 0.5, shininess: 220, specular: 0x5A7A80, depthWrite: false }));
water.rotation.x = -Math.PI / 2;
water.position.set(P.x, 0.03, P.z);
water.userData.keep = 1;
g.add(water);
KZ.solids.push({ x: s.x + P.x, z: s.z + P.z, r: P.r - 0.3 });
for (var k = 0; k < (lite ? 14 : 26); k++) {
var pa = k / (lite ? 14 : 26) * 6.283 + R() * 0.2, ps = 0.25 + R() * 0.3, pm = new THREE.Mesh(rg[k % 3], wet);
pm.position.set(P.x + Math.cos(pa) * (P.r + 0.1), 0.06, P.z + Math.sin(pa) * (P.r + 0.1));
pm.scale.set(ps * 1.4, ps * 0.6, ps);
pm.rotation.y = -pa;
g.add(pm);
}
var walk = [], ring = P.r + 1.5;
for (var w = r0 + 0.6; w > P.x + ring; w -= 0.3)
walk.push([w, 0, 0]);
for (var wa = 0; wa < 6.283; wa += 0.3 / ring)
walk.push([P.x + Math.cos(wa) * ring, 0, P.z + Math.sin(wa) * ring, wa]);
var pg = new THREE.BoxGeometry(0.26, 0.06, 1.5), pi = new THREE.InstancedMesh(pg, deck, walk.length);
walk.forEach(function (W, i) { var ry = W.length > 3 ? -W[3] : Math.PI / 2; e.set(0, ry, 0); q.setFromEuler(e); sc.set(1, 1, 0.9 + ((i * 37) % 10) / 50); po.set(W[0], 0.1 + ((i * 13) % 5) / 400, W[2]); M.compose(po, q, sc); pi.setMatrixAt(i, M); });
g.add(pi);
var posts = [], rope = [], np = Math.round(6.283 * (ring - 0.85) / 1.6);
for (var pp2 = 0; pp2 < np; pp2++) {
var aa = pp2 / np * 6.283;
if (Math.abs(aa) < 0.25 || Math.abs(aa - 6.283) < 0.25)
continue;
posts.push([P.x + Math.cos(aa) * (ring - 0.85), P.z + Math.sin(aa) * (ring - 0.85)]);
}
var pst = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.05, 0.06, 0.95, 6), deck, posts.length);
posts.forEach(function (p2, i) { M.makeTranslation(p2[0], 0.55, p2[1]); pst.setMatrixAt(i, M); });
g.add(pst);
for (var rs = 0; rs <= np * 8; rs++) {
var ta = rs / (np * 8) * 6.283, sag = Math.abs(Math.sin(ta * np / 2));
rope.push(new THREE.Vector3(P.x + Math.cos(ta) * (ring - 0.85), 0.95 - 0.1 * sag, P.z + Math.sin(ta) * (ring - 0.85)));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rope, true), np * 8, 0.022, 5, true), kzM(0xB89A6A)));
var mite = kzgMat("mite", "cave", [1, 2], 0xD0C8B8, { shine: 50, spec: 0x303030, em: 0x161E1E }), dg = kzgDrip(true), ug = kzgRockGeo(7.7, KZ_LITE ? 1 : 2).translate(0, 0.55, 0), nd = lite ? 40 : 110, di = new THREE.InstancedMesh(dg, wet, nd), cnt = 0;
for (var d = 0; d < nd * 3 && cnt < nd; d++) {
var rp = kzgRoofPt(R, r0, 0.3), dx = rp.x, dz = rp.z, top = rp.y, L = 0.4 + R() * R() * 2.4;
if (top - L < 2.8 || kzgInMouth(dx * 1.1, top, dz * 1.1))
continue;
var sw = 0.6 + R() * 0.9;
e.set((R() - 0.5) * 0.1, R() * 6, (R() - 0.5) * 0.1);
q.setFromEuler(e);
sc.set(sw, L, sw);
po.set(dx, top + 0.15, dz);
M.compose(po, q, sc);
di.setMatrixAt(cnt++, M);
}
di.count = cnt;
g.add(di);
var nu = lite ? 14 : 30, ui = new THREE.InstancedMesh(ug, mite, nu), cu = 0;
for (var d2 = 0; d2 < nu * 6 && cu < nu; d2++) {
var ua = R() * 6.283, ur = 8.5 + R() * 4;
if (Math.abs(Math.atan2(Math.sin(ua), Math.cos(ua))) < 0.7)
continue;
var ux = Math.cos(ua) * ur, uz = Math.sin(ua) * ur;
if (Math.abs(Math.hypot(ux - P.x, uz - P.z) - ring) < 1.4)
continue;
var uh = 0.5 + R() * 1.4, uw = 0.35 + R() * 0.5;
e.set(0, R() * 6, 0);
q.setFromEuler(e);
sc.set(uw, uh, uw);
po.set(ux, 0.04, uz);
M.compose(po, q, sc);
ui.setMatrixAt(cu++, M);
if (uh > 0.6)
KZ.solids.push({ x: s.x + ux, z: s.z + uz, r: 0.9 * uw });
}
ui.count = cu;
g.add(ui);
var n = lite ? 1200 : 3600, pos = [], col = [], tpos = [], tcol = [], dpos = [], mpos = [], mcol = [], cc = new THREE.Color(), hues = [0x7FF0DC, 0x8AF8C8, 0x7AD8FF, 0xA8FFE8];
for (var w2 = 0; w2 < n; w2++) {
var rw = kzgRoofPt(R, r0, 0.2), wx = rw.x, wz = rw.z, wy = rw.y - 0.04;
if (wy < 2.4 || (Math.hypot(wx, wz) > r0 - 3.5 && Math.abs(Math.atan2(wz, wx)) < 0.62))
continue;
cc.setHex(hues[w2 % 4]);
var br = 0.8 + R() * 0.2;
pos.push(wx, wy, wz);
col.push(cc.r * br, cc.g * br, cc.b * br);
if (Math.hypot(wx - P.x, wz - P.z) < P.r + 7) {
mpos.push(wx, -wy + 0.06, wz);
mcol.push(cc.r * br * 0.7, cc.g * br * 0.7, cc.b * br * 0.7);
}
if (w2 % (lite ? 3 : 1) === 0) {
var th2 = 1 + (R() * 4 | 0);
for (var tt = 0; tt < th2; tt++) {
var ox = (R() - 0.5) * 0.05, oz = (R() - 0.5) * 0.05, tl = 0.08 + R() * R() * 0.55;
tpos.push(wx + ox, wy, wz + oz, wx + ox, wy - tl, wz + oz);
tcol.push(0.04, 0.08, 0.08, 0.16, 0.3, 0.28);
if (tt % 2 === 0)
dpos.push(wx + ox, wy - tl, wz + oz);
}
}
}
function pts(arr, cols, size, op) {
var bg = new THREE.BufferGeometry();
bg.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
if (cols)
bg.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
var pm = new THREE.PointsMaterial({ size: size, map: kzgGlowTex(), transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: !!cols, color: cols ? 0xFFFFFF : 0x9AF0E0, sizeAttenuation: true });
if (cols) {
var ph = new Float32Array(arr.length / 3), RP = wRand(4242);
for (var z2 = 0; z2 < ph.length; z2++)
ph[z2] = RP() * 100;
bg.setAttribute("ph", new THREE.BufferAttribute(ph, 1));
var uT = { value: 0 };
pm.onBeforeCompile = function (sh) {
sh.uniforms.uT = uT;
sh.vertexShader = sh.vertexShader.replace("void main() {", "attribute float ph;\nuniform float uT;\nvoid main() {").replace("#include <color_vertex>", "#include <color_vertex>\n  float sp=0.5+fract(ph*7.13)*1.0; float f=0.5+0.5*sin(uT*sp+ph); f=f*f*(3.0-2.0*f); vColor*=0.12+0.88*f;");
};
pm.customProgramCacheKey = function () { return "kzg-firefly"; };
}
var o = new THREE.Points(bg, pm);
o.frustumCulled = false;
o.userData.keep = 1;
if (cols)
o.onBeforeRender = function () { uT.value = performance.now() / 1000; };
g.add(o);
return o;
}
pts(pos, col, lite ? 0.34 : 0.3, 1);
pts(pos, col, lite ? 0.9 : 1.0, 0.24);
pts(dpos, null, 0.1, 0.8);
pts(mpos, mcol, lite ? 0.34 : 0.3, 0.95);
pts(mpos, mcol, lite ? 0.9 : 1.0, 0.2);
var tg = new THREE.BufferGeometry();
tg.setAttribute("position", new THREE.Float32BufferAttribute(tpos, 3));
tg.setAttribute("color", new THREE.Float32BufferAttribute(tcol, 3));
var tl2 = new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending }));
tl2.frustumCulled = false;
g.add(tl2);
var sg = kzTwoSided(["THE GLOW-WORM GROTTO"], 3, 0.5, "#2A3A3A", "#B8F8E8");
sg.position.set(r0 + 2.6, 3.2, -3.4);
sg.rotation.y = Math.PI / 2;
g.add(sg);
kzFact("grotto", s.x + 18, s.z + 6);
},
function (G) {
var s = KZ_SITE.puzzles, y = kzHeight(s.x, s.z), g = kzAt(G, s.x, s.z, 0, y);
wCyl(8, 8.2, 0.3, kzM(0xF0E8F8), 0, 0.15, 0, g, 32);
kzPlat({ x: s.x, z: s.z, r: 8.2, top: y + 0.3 });
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283;
wCyl(0.25, 0.3, 4.2, kzM([0xE8505A, 0xF0903A, 0xF0D040, 0x60C058, 0x48A8E0, 0x5A62D0, 0x9A5AD0, 0xF07AA8][i]), Math.cos(a) * 7.4, 2.4, Math.sin(a) * 7.4, g, 10);
KZ.solids.push({ x: s.x + Math.cos(a) * 7.4, z: s.z + Math.sin(a) * 7.4, r: 0.35 });
}
var dome = wMesh(kzIGeo("cap"), kzM(0x9AD0F0, { ds: true }), 0, 4.4, 0, g);
dome.scale.set(17, 6, 17);
var tables = [["slide", "Sliding pictures"], ["match", "Matching pairs"], ["words", "Word search"], ["sums", "Number fun"], ["pattern", "What comes next?"], ["spell", "Spelling scramble"]];
tables.forEach(function (t, i) {
var a = i / 6 * 6.283 + 0.5, tx = Math.cos(a) * 4, tz = Math.sin(a) * 4;
wCyl(1, 1, 0.08, kzM(0xFFF8EC), tx, 0.95, tz, g, 18);
wCyl(0.12, 0.16, 0.9, kzM(0xC08A5A), tx, 0.5, tz, g, 8);
wBox(0.5, 0.06, 0.5, kzM(KZ_PETALS[i]), tx, 1.02, tz, g);
wSph(0.13, kzM(KZ_PETALS[i]), tx + 0.25, 1.02, tz, g, 8);
KZ.solids.push({ x: s.x + tx, z: s.z + tz, r: 1, h: 1 });
kzSpot(s.x + tx * 1.45, s.z + tz * 1.45, 1.8, t[1], "play", function () { kzPuzzle(t[0]); }, { table: t[0] });
});
kzSpot(s.x, s.z, 2.6, "The Puzzle Pavilion", "choose a puzzle", function () { kzPuzzleMenu(); });
var sg = kzTwoSided(["THE PUZZLE PAVILION"], 3.2, 0.55, "#2E6A9A", "#FFF8E0");
sg.position.set(0, 5, 8.2);
g.add(sg);
kzFact("puzzles", s.x + 11, s.z + 5);
},
function (G) {
KZ.fairy = [];
KZ_DOORS.forEach(function (d, i) {
var x = d[0], z = d[1], y = kzHeight(x, z), g = kzAt(G, x, z, Math.atan2(-x, -z));
if (i % 2 === 0) {
wCyl(0.9, 1.1, 1.1, kzM(0x8A6040), 0, 0.55, -0.4, g, 12);
wCyl(0.85, 0.85, 0.04, kzM(0xC8A070), 0, 1.1, -0.4, g, 12);
}
else {
var st = wSph(1.1, kzM(0x9A98A8), 0, 0.4, -0.5, g, 10);
st.scale.set(1, 0.8, 0.9);
for (var m = 0; m < 4; m++)
kzI("dot", x + (m - 1.5) * 0.35, y + 0.95, z, 0.3, 0.15, 0.3, m, 0x6AB050);
}
var door = wBox(0.32, 0.46, 0.04, kzM(d[2]), 0, 0.25, 0.62, g);
wSph(0.025, kzM(0xF0C850), 0.1, 0.24, 0.66, g, 6);
var arch = wMesh(new THREE.CircleGeometry(0.16, 12, 0, Math.PI), kzM(d[2]), 0, 0.48, 0.62, g);
KZ.solids.push({ x: x, z: z, r: 1 });
var F = { i: i, x: x, z: z, say: d[3] };
KZ.fairy.push(F);
kzSpot(x + Math.sin(g.rotation.y) * 1.6, z + Math.cos(g.rotation.y) * 1.6, 1.7, "A tiny door", "knock softly", function () { kzFairyFound(F); }, { fairy: i });
});
},
function (F) {
var got = kzLocalGet("doors") || {};
var first = !got[F.i];
got[F.i] = 1;
kzLocalSet("doors", got);
var n = Object.keys(got).length;
if (typeof playTone === "function")
playTone(880, 0.3);
if (n >= 5 && first)
return kzWin("doors", "<b>" + esc(F.say) + "</b> That's all five fairy doors!");
setStatus("<b>" + esc(F.say) + "</b> You knock softly and say thank you. " + (first ? "You've found " + n + " of the 5 fairy doors." : "You found this one before (" + n + " of 5)."));
},
function (G) {
KZ.finds = [];
var R = wRand(3131);
KZ_FINDS.forEach(function (f) {
var s = KZ_SITE[f[1]];
for (var i = 0; i < f[2]; i++) {
var x, z, ok = false;
for (var tries = 0; tries < 40 && !ok; tries++) {
var a = R() * 6.283, d = (f[1] === "pond" ? s.r - 1 + R() * 4 : 4 + R() * f[3]);
x = s.x + Math.cos(a) * d;
z = s.z + Math.sin(a) * d;
ok = !worldSolidAt(KZ.solids, x, z, 0) && kzPathDist(x, z) > 1.5;
}
var y = kzHeight(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.userData.keep = 1;
G.add(g);
kzFindLook(g, f[0], R);
var id = f[0].slice(3) + ":" + f[1] + ":" + i, F = { id: id, kind: f[0], x: x, z: z, g: g };
KZ.finds.push(F);
kzSpot(x, z, 1.9, KZ_ITEM[f[0]].e + " " + KZ_ITEM[f[0]].n, "pick it up", function () { kzGather(F); }, { find: F });
}
});
},
function (g, k, R) {
if (k === "kz_clover") {
for (var i = 0; i < 4; i++) {
var a = i / 4 * 6.283;
var l = wSph(0.12, kzM(0x3E9A40), Math.cos(a) * 0.12, 0.18, Math.sin(a) * 0.12, g, 8);
l.scale.y = 0.3;
}
wCyl(0.02, 0.02, 0.18, kzM(0x3E8A40), 0, 0.09, 0, g, 4);
for (var j = 0; j < 6; j++) {
var b = wSph(0.1, kzM(0x5AB050), (R() - 0.5) * 0.8, 0.05, (R() - 0.5) * 0.8, g, 6);
b.scale.y = 0.4;
}
}
else if (k === "kz_pebble") {
for (var p = 0; p < 4; p++) {
var s = wSph(0.12 + R() * 0.06, kzM(KZ_RAINBOW[(p * 2) % 7][0]), (R() - 0.5) * 0.5, 0.06, (R() - 0.5) * 0.5, g, 8);
s.scale.y = 0.55;
}
}
else if (k === "kz_feather") {
for (var f = 0; f < 2; f++) {
var fe = wMesh(kzIGeo("petal"), kzM([0xF0B8E8, 0xB8D8F8][f]), 0, 0.08, 0, g);
fe.scale.set(0.5, 0.3, 0.14);
fe.rotation.y = f * 1.2 + R();
}
}
else if (k === "kz_petal") {
for (var q = 0; q < 5; q++) {
var pe = wMesh(kzIGeo("petal"), kzM(0xF0D050), 0, 0.12, 0, g);
pe.scale.set(0.25, 0.4, 0.18);
pe.rotation.y = q / 5 * 6.283;
}
wSph(0.06, kzM(0xF08A3A), 0, 0.14, 0, g, 6);
}
else if (k === "kz_shell") {
for (var sh = 0; sh < 3; sh++) {
var c = wSph(0.12, kzGlowM([0xF8D8E8, 0xD8F0F8, 0xF8F0D0][sh], 0.25), (R() - 0.5) * 0.5, 0.06, (R() - 0.5) * 0.5, g, 8);
c.scale.set(1, 0.5, 0.8);
}
}
else if (k === "kz_sparkle") {
for (var c2 = 0; c2 < 3; c2++) {
var cr = wCone(0.08, 0.3, kzGlowM([0xB8A0F8, 0x9AE8F0, 0xF0A0D8][c2], 0.6), (R() - 0.5) * 0.3, 0.15, (R() - 0.5) * 0.3, g, 5);
cr.rotation.z = (R() - 0.5) * 0.6;
}
}
},
function (G) {
kzDoorHome(G);
kzWelcome(G);
kzLodges(G);
kzSchool(G);
kzBubbleMeadow(G);
kzSingingMushrooms(G);
kzLilyPond(G);
kzTreehouse(G);
kzCarousel(G);
kzClouds(G);
kzMaze(G);
kzStory(G);
kzColourWall(G);
kzCritterCorner(G);
kzLanternHill(G);
kzGrotto(G);
kzPavilion(G);
kzZoo(G);
kzCircus(G);
kzFairyDoors(G);
kzFindSpots(G);
kzChildren(G);
kzFestoon(G);
if (typeof kzWays === "function")
kzWays(G);
if (typeof kzDress === "function")
kzDress(G);
},
function (G) {
var Z = kzZooHub(), ga = kzZooGateAng(), R = wRand(9090), lite = KZ_LITE, y0 = kzHeight(Z.x, Z.z);
if (typeof kzaForget === "function")
kzaForget();
var ZG = new THREE.Group();
ZG.name = "kz-zoo";
G.add(ZG);
var AG = new THREE.Group();
AG.name = "kz-zoo-animals";
AG.userData.keep = 1;
G.add(AG);
KZ.zoo = { pens: [], train: null, G: ZG, AG: AG, keepers: [], walkers: [], feed: null, said: {} };
var pave = kzM(0xE6D2AA), edge = kzM(0xB89A72);
kzZooRing(ZG, KZ_ZOO_R.walk0, KZ_ZOO_R.walk1, 0, Math.PI * 2, pave, 0.05, 120);
kzZooRing(ZG, KZ_ZOO_R.walk0 - 0.35, KZ_ZOO_R.walk0, 0, Math.PI * 2, edge, 0.06, 120);
kzZooRing(ZG, KZ_ZOO_R.walk1, KZ_ZOO_R.walk1 + 0.35, 0, Math.PI * 2, edge, 0.06, 120);
var pl = wMesh(new THREE.CircleGeometry(KZ_ZOO_R.plaza, 64), kzM(0xEADAB8), Z.x, y0 + 0.045, Z.z, ZG);
pl.rotation.x = -Math.PI / 2;
pl.receiveShadow = true;
kzZooRing(ZG, KZ_ZOO_R.plaza - 0.4, KZ_ZOO_R.plaza, 0, Math.PI * 2, edge, 0.055, 96);
var av = kzAt(ZG, Z.x + Math.sin(ga) * ((KZ_ZOO_R.gate + KZ_ZOO_R.plaza) / 2), Z.z + Math.cos(ga) * ((KZ_ZOO_R.gate + KZ_ZOO_R.plaza) / 2), ga, y0);
var avL = KZ_ZOO_R.gate + 8 - KZ_ZOO_R.plaza;
wBox(7, 0.08, avL, pave, 0, 0.04, 4, av).receiveShadow = true;
[-1, 1].forEach(function (s) { wBox(0.35, 0.12, avL, edge, s * 3.6, 0.05, 4, av); });
kzZooRing(ZG, KZ_ZOO_R.track - 1.5, KZ_ZOO_R.track + 1.5, 0, Math.PI * 2, kzM(0x9A8C80), 0.035, 140);
[-0.55, 0.55].forEach(function (o) { var t = new THREE.Mesh(new THREE.TorusGeometry(KZ_ZOO_R.track + o, 0.05, 5, 220), kzM(0xA8ACB4)); t.rotation.x = Math.PI / 2; t.position.set(Z.x, y0 + 0.2, Z.z); ZG.add(t); });
var ns = Math.round(Math.PI * 2 * KZ_ZOO_R.track / 0.9);
for (var s = 0; s < ns; s++) {
var a = s / ns * Math.PI * 2, p = kzZooAt(a, KZ_ZOO_R.track);
kzI("stalk", p.x, y0 + 0.06, p.z, 0.24, 0.1, 1.6, a, 0x7A5A3A);
}
var nf = Math.round(Math.PI * 2 * KZ_ZOO_R.fence / 2.2);
for (var f = 0; f < nf; f++) {
var fa = f / nf * Math.PI * 2;
if (kzZooGap(fa))
continue;
var fp = kzZooAt(fa, KZ_ZOO_R.fence);
kzI("stalk", fp.x, y0, fp.z, 0.12, 0.95, 0.12, 0, 0xFFFCF4);
}
[0.45, 0.85].forEach(function (h) { var segs = kzZooFenceArcs(); segs.forEach(function (sg) { var t = new THREE.Mesh(new THREE.TorusGeometry(KZ_ZOO_R.fence, 0.035, 4, Math.max(8, Math.round(sg[1] * 60)), sg[1]), kzM(0xFFFCF4)); t.rotation.x = -Math.PI / 2; t.rotation.z = sg[0] - Math.PI / 2; t.position.set(Z.x, y0 + h, Z.z); ZG.add(t); }); });
for (var i = 0; i < KZ_PENS.length; i++)
kzZooPen(ZG, AG, i, kzZooPenAng(i));
kzZooPromenade(ZG, R);
kzZooGate(ZG);
kzZooAviary(ZG);
kzZooPlaza(ZG, R);
kzZooHedge(ZG, R);
kzZooTrain(ZG);
var mp = kzZooAt(ga + 0.05, KZ_ZOO_R.walk1 + 3.5);
kzFolkAt(kzFolk("zoo"), mp.x, mp.z, kzFace(mp.x, mp.z, Z.x, Z.z), {});
kzZooWalkers(ZG, R);
kzFact("zoo", kzZooAt(ga - 0.09, KZ_ZOO_R.walk1 + 3).x, kzZooAt(ga - 0.09, KZ_ZOO_R.walk1 + 3).z);
KZ_SITE.zoo.name = "Wonderglen Zoo";
},
function (x, z, feet) {
var Z = kzZooHub();
if (!Z)
return false;
var dx = x - Z.x, dz = z - Z.z, d = Math.hypot(dx, dz);
if (d > KZ_ZOO_R.hedge + 2)
return false;
if (KZ.zoo && KZ.zoo.deck && feet > kzHeight(x, z) + 1.5) {
var D = KZ.zoo.deck;
if (Math.hypot(x - D.x, z - D.z) < D.r)
return false;
}
var a = Math.atan2(dx, dz);
if (Math.abs(d - KZ_ZOO_R.fence) < 0.45 && !kzZooGap(a))
return true;
if (Math.abs(d - KZ_ZOO_R.hedge) < 0.9) {
var ga = kzZooGateAng(), dg = Math.atan2(Math.sin(a - ga), Math.cos(a - ga));
if (Math.abs(dg) > 0.06)
return true;
}
for (var i = 0; i < KZ_PENS.length; i++) {
var c = kzZooAt(kzZooPenAng(i), KZ_ZOO_R.pen);
if (Math.hypot(x - c.x, z - c.z) < KZ_ZOO_R.penR + 0.3)
return true;
}
return false;
},
function (ZG, AG, i, a) {
var P = KZ_PENS[i], c = kzZooAt(a, KZ_ZOO_R.pen), y = kzHeight(c.x, c.z), r = KZ_ZOO_R.penR, R = wRand(7100 + i * 31), hab = P[3];
var g = kzAt(ZG, c.x, c.z, a, y);
var GROUND = { kopje: 0xD2B070, savanna: 0xD8BC74, grass: 0x9AB858, valley: 0xC4A274, river: 0x8AAA5A, ice: 0xEEF4F8, lagoon: 0xB8C890, woods: 0x5E8A42, jungle: 0x4E9A44, outback: 0xC0703C }[hab];
var gg = new THREE.CircleGeometry(r + 0.4, 48, 0, Math.PI * 2), gc = new Float32Array(gg.attributes.position.count * 3), cc = new THREE.Color();
for (var v = 0; v < gg.attributes.position.count; v++) {
var vx = gg.attributes.position.getX(v), vy = gg.attributes.position.getY(v), n = wNoise(vx * 0.18 + i * 7, vy * 0.18, 3);
cc.setHex(GROUND).offsetHSL((n - 0.5) * 0.03, 0, (n - 0.5) * 0.12);
gc[v * 3] = cc.r;
gc[v * 3 + 1] = cc.g;
gc[v * 3 + 2] = cc.b;
}
gg.setAttribute("color", new THREE.BufferAttribute(gc, 3));
var gm = new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ vertexColors: true }));
gm.rotation.x = -Math.PI / 2;
gm.position.y = 0.06;
gm.receiveShadow = true;
gm.userData.keep = 1;
g.add(gm);
var rock = hab === "ice" ? [0xE8F0F6, 0xD0E0EC, 0xF4F8FA] : hab === "outback" ? [0xA8603A, 0xB87048, 0x985030] : [0xA89A88, 0x948878, 0xB8AA94];
for (var k = 0; k < 34; k++) {
var ra = (k / 33 - 0.5) * 2 * (Math.PI - 0.98), rr = r - 0.6 + R() * 0.8, rx = Math.sin(ra) * rr, rz = Math.cos(ra) * rr, w = kzLocal(g, rx, rz), h = 2.4 + R() * 2.4;
kzI("rock", w.x, y + h * 0.35, w.z, 2.2 + R() * 1.6, h, 2 + R() * 1.4, R() * 6, rock[k % 3]);
}
var fw = 24;
for (var q = 0; q < fw; q++) {
var fa = (q / (fw - 1) - 0.5) * Math.PI * 0.62, fx = Math.sin(fa + Math.PI) * -r, fz = -Math.cos(fa) * r, sg = kzAt(g, fx, fz, -fa, 0.0);
wBox(r * Math.PI * 0.62 / (fw - 1) + 0.06, 1.0, 0.5, kzZooStone(), 0, 0.5, 0, sg);
wBox(r * Math.PI * 0.62 / (fw - 1) + 0.06, 0.12, 0.62, kzM(0xC8B48C), 0, 1.06, 0, sg);
if (q % 2 === 0)
wCyl(0.06, 0.06, 0.5, kzM(0x6A4A2E), 0, 1.36, 0, sg, 6);
wBox(r * Math.PI * 0.62 / (fw - 1) + 0.06, 0.1, 0.1, kzM(0x7A5A3A), 0, 1.6, 0, sg);
}
var ditch = wMesh(new THREE.RingGeometry(r - 2.2, r - 0.4, 32, 1, Math.PI * 0.5 - Math.PI * 0.31, Math.PI * 0.62), kzM(0x7A6A52), 0, 0.07, 0, g);
ditch.rotation.x = -Math.PI / 2;
kzZooHouse(g, hab, R, r);
var area = { x: c.x, z: c.z, r: r - 3.2, avoid: [] }, water = null;
function W2(lx, lz, rad, col) {
var w = kzLocal(g, lx, lz);
water = { x: w.x, z: w.z, r: rad };
var rimc = hab === "ice" ? 0xE4EEF4 : 0x9A8C78;
for (var t = 0; t < 18; t++) {
var ta = t / 18 * Math.PI * 2;
var rp = kzLocal(g, lx + Math.sin(ta) * (rad + 0.3), lz + Math.cos(ta) * (rad + 0.3));
kzI("rock", rp.x, y + 0.15, rp.z, 1.1 + R() * 0.6, 0.55, 1 + R() * 0.5, R() * 6, rimc);
}
var bed = wMesh(new THREE.CircleGeometry(rad + 0.2, 36), kzM(hab === "ice" ? 0x3A6A88 : 0x4A5A48), lx, 0.08, lz, g);
bed.rotation.x = -Math.PI / 2;
var wm = wMesh(new THREE.CircleGeometry(rad, 36), kzZooWater(col), lx, 0.32, lz, g);
wm.rotation.x = -Math.PI / 2;
wm.userData.keep = 1;
wm.renderOrder = 2;
}
function tree(lx, lz, kind, s) { var w = kzLocal(g, lx, lz); kzZooTree(w.x, w.z, kind, s || 1, R); area.avoid.push({ x: w.x, z: w.z, r: 1.4 * (s || 1) }); }
function boulder(lx, lz, s, col) { var w = kzLocal(g, lx, lz); kzI("rock", w.x, y + 0.4 * s, w.z, 2.4 * s, 1.5 * s, 2 * s, R() * 6, col || rock[0]); area.avoid.push({ x: w.x, z: w.z, r: 1.2 * s }); }
function tufts(n, col, h) { for (var t = 0; t < n; t++) {
var ta = R() * 6.283, td = Math.sqrt(R()) * (r - 1.5), w = kzLocal(g, Math.sin(ta) * td, Math.cos(ta) * td);
if (water && Math.hypot(w.x - water.x, w.z - water.z) < water.r + 0.4)
continue;
kzI("grass", w.x, y + 0.06, w.z, 0.35, (h || 0.7) * (0.6 + R() * 0.8), 0.35, R() * 6, col);
} }
var many = lite() ? 0.5 : 1;
function lite() { return KZ_LITE; }
if (hab === "kopje") {
boulder(-2, 4, 2.2, 0xC8B090);
boulder(1.5, 6, 1.6, 0xB8A080);
boulder(3, 2.5, 1.2, 0xC0A888);
tree(-8, 4, "acacia", 1.1);
tree(7, 7, "acacia", 0.9);
tufts(90 * many, 0xD8B860, 0.8);
W2(6, -4, 2.4, 0x4A8AA0);
}
if (hab === "savanna") {
tree(-6, 2, "acacia", 1.5);
tree(5, 6, "acacia", 1.3);
tree(0, 9, "acacia", 1.2);
tufts(110 * many, 0xE0C068, 0.9);
W2(-4, -5, 2.8, 0x4A8AA0);
var tm = kzLocal(g, 8, -1);
wCone(1.2, 3.2, kzM(0xB07850), tm.x, y + 1.6, tm.z, ZG, 9);
area.avoid.push({ x: tm.x, z: tm.z, r: 1.4 });
}
if (hab === "grass") {
tree(-7, 6, "acacia", 1.1);
tufts(140 * many, 0x9AC050, 0.7);
W2(4, -3, 2.6, 0x4A8AA0);
boulder(-3, -2, 0.9);
}
if (hab === "valley") {
W2(-3.5, -1, 4.6, 0x3E8AA0);
tree(7, 6, "broad", 1.4);
tree(-8, 7, "broad", 1.2);
var mud = wMesh(new THREE.CircleGeometry(2.6, 24), kzM(0x6A4A30), 5, 0.09, -3, g);
mud.rotation.x = -Math.PI / 2;
var hay = kzAt(g, 2, 9, 0.3, 0);
wBox(2.4, 1.6, 1, kzM(0x8A6A44), 0, 1.2, 0, hay);
wBox(2.2, 0.6, 0.8, kzM(0xE0C060), 0, 2.2, 0, hay);
for (var lg = 0; lg < 3; lg++)
wCyl(0.3, 0.3, 3.4, kzM(0x7A5A3A), -6 + lg * 0.7, 0.3, -6 + lg * 0.5, g, 8).rotation.z = Math.PI / 2;
area.avoid.push(kzLocal(g, 2, 9));
area.avoid[area.avoid.length - 1].r = 1.8;
tufts(40 * many, 0xB8B070, 0.5);
}
if (hab === "river") {
W2(0, -0.5, 8.6, 0x3A7A80);
for (var rd = 0; rd < 60 * many; rd++) {
var ra2 = R() * 6.283, rp2 = kzLocal(g, Math.sin(ra2) * (9.3 + R() * 1.6), -0.5 + Math.cos(ra2) * (9.3 + R() * 1.6));
kzI("reed", rp2.x, y, rp2.z, 0.06, 1.4 + R() * 0.8, 0.06, R() * 6, 0x6A9A3A);
}
tree(-10, 8, "broad", 1.1);
tree(10, 7, "broad", 1.0);
}
if (hab === "ice") {
W2(0, -1.5, 6.5, 0x2E7AB0);
boulder(-8, 5, 1.4, 0xF0F6FA);
boulder(7, 6, 1.2, 0xE0ECF4);
boulder(0, 10, 1.6, 0xF4F8FA);
for (var fl = 0; fl < 4; fl++) {
var fp = kzLocal(g, (R() - 0.5) * 7, -1.5 + (R() - 0.5) * 6);
var fm = wCyl(1 + R() * 0.8, 1.1 + R() * 0.8, 0.25, kzM(0xF4FAFF), 0, 0, 0, ZG, 9);
fm.position.set(fp.x, y + 0.35, fp.z);
}
}
if (hab === "lagoon") {
W2(0, -1, 8.8, 0x6AA8B0);
for (var nn = 0; nn < 6; nn++) {
var np = kzLocal(g, (R() - 0.5) * 12, -1 + (R() - 0.5) * 10);
wCyl(0.35, 0.55, 0.4, kzM(0x8A7058), np.x, y + 0.35, np.z, ZG, 10);
}
for (var rd2 = 0; rd2 < 70 * many; rd2++) {
var ra3 = R() * 6.283, rp3 = kzLocal(g, Math.sin(ra3) * (9.4 + R() * 1.8), -1 + Math.cos(ra3) * (9.4 + R() * 1.8));
kzI("reed", rp3.x, y, rp3.z, 0.05, 1.2 + R() * 0.9, 0.05, R() * 6, 0x7AA048);
}
}
if (hab === "woods") {
for (var pt = 0; pt < 6; pt++) {
var pa = R() * 6.283, pd = 4 + R() * 8;
tree(Math.sin(pa) * pd, Math.cos(pa) * pd + 1, "pine", 1 + R() * 0.4);
}
W2(-4, -3.5, 2.8, 0x3A7A90);
boulder(5, -2, 1.3);
boulder(-1, 5, 1.0);
var cave = kzLocal(g, 0, 11.5);
var cv = wSph(3.2, kzM(0x7A7064), cave.x, y, cave.z, ZG, 14);
cv.scale.set(1, 0.75, 0.7);
var cd = wSph(1.5, kzM(0x1E1A16), 0, 0, 0, ZG, 12);
var cdp = kzLocal(g, 0, 9.4);
cd.position.set(cdp.x, y + 0.5, cdp.z);
cd.scale.set(1, 1, 0.3);
tufts(50 * many, 0x5A8A3A, 0.5);
}
if (hab === "jungle") {
W2(-1, -2, 4.2, 0x2E8A90);
for (var jt = 0; jt < 6; jt++) {
var ja = R() * 6.283, jd = 6 + R() * 6;
tree(Math.sin(ja) * jd, Math.cos(ja) * jd + 2, "jungle", 1 + R() * 0.4);
}
var wf = kzLocal(g, -1, -6.6);
for (var wr = 0; wr < 5; wr++)
kzI("rock", wf.x + (wr - 2) * 1.1, y + 0.8 + (wr % 2) * 0.9, wf.z + 0.6, 1.6, 2.4, 1.4, wr, 0x8A8478);
var fall = wMesh(new THREE.PlaneGeometry(2.4, 2.6), new THREE.MeshPhongMaterial({ color: 0xD8F0FF, transparent: true, opacity: 0.55, shininess: 80, side: THREE.DoubleSide }), 0, 0, 0, ZG);
fall.position.set(wf.x, y + 1.5, wf.z);
fall.rotation.y = a;
fall.userData.keep = 1;
for (var bb = 0; bb < 40 * many; bb++) {
var ba = R() * 6.283, bd = 8 + R() * 5, bp = kzLocal(g, Math.sin(ba) * bd, Math.cos(ba) * bd);
kzI("reed", bp.x, y, bp.z, 0.09, 3 + R() * 2.5, 0.09, R() * 6, 0x6AAA40);
}
tufts(60 * many, 0x4A9A3A, 0.6);
}
if (hab === "outback") {
tree(-6, 5, "gum", 1.2);
tree(6, 8, "gum", 1.0);
boulder(3, 0, 1.4, 0xA8603A);
boulder(-2, -4, 0.8, 0xB87048);
tufts(90 * many, 0xC8A048, 0.6);
W2(-6, -4, 1.8, 0x5A8A90);
}
area.water = water;
var n = KZ_LITE ? Math.max(1, Math.ceil(P[2] / 2)) : P[2], ground = function (x, z) { return y + 0.06; };
if (typeof kzaHerd === "function") {
if (P[0] === "lion") {
kzaHerd(AG, "lion", 1, area, { seed: 11, ground: ground });
kzaHerd(AG, "lioness", KZ_LITE ? 1 : 2, area, { seed: 12, ground: ground });
}
else
kzaHerd(AG, P[0], n, area, { seed: 100 + i, ground: ground, calf: P[0] === "elephant" && n > 1 });
}
var sw = kzLocal(g, 0, -(r + 2.6)), sgn = kzSign(ZG, sw.x, sw.z, a + Math.PI, [P[1].toUpperCase(), "press E to read the sign"], 2.8, 0.8, "#2E5A3A", "#FFF4D8");
var pen = { i: i, c: c, P: P, a: a, g: g, area: area };
KZ.zoo.pens.push(pen);
kzSpot(sw.x, sw.z, 3, "The " + P[1] + " sign", "read it", function () { kzZooCard(pen); }, { zoo: i });
[-1, 1].forEach(function (s) { var bp = kzLocal(g, s * 5.5, -(r + 3.8)), bg = kzAt(ZG, bp.x, bp.z, a + Math.PI); kzZooBench(bg); });
var kp = kzLocal(g, 3.2, -(r + 3.2));
kzZooKeeper(pen, kp.x, kp.z, a + Math.PI);
KZ_SITE["pen" + i] = { k: "pen" + i, x: c.x, z: c.z, r: r, name: "the " + P[1] };
if (P[0] === "giraffe")
kzZooDeck(ZG, pen);
},
function (g, hab, R, r) {
var hx = 0, hz = r - 4.5, hg = kzAt(g, hx, hz, Math.PI, 0);
if (hab === "ice") {
var ig = wSph(3.2, kzM(0xE8F2FA), 0, 0, 0, hg, 16);
ig.scale.set(1, 0.7, 0.9);
var dd = wSph(1.2, kzM(0x3A5A78), 0, 0.4, 2.6, hg, 12);
dd.scale.set(1, 1, 0.3);
return;
}
if (hab === "river" || hab === "lagoon")
return;
var wall = hab === "woods" || hab === "jungle" ? 0x8A6040 : hab === "outback" ? 0xC88858 : 0xE8D4A8, roof = hab === "woods" ? 0x5A4A3A : 0xC8A050;
wCyl(2.6, 2.7, 2.6, kzM(wall), 0, 1.3, 0, hg, 16);
var rf = wCone(3.6, 2.4, kzM(roof), 0, 3.7, 0, hg, 16);
var door = wBox(1.4, 2, 0.12, kzM(0x3A2A1E), 0, 1, 2.6, hg);
kzRingIn(hg, 0, 0, 2.7, 4);
},
function (x, z, kind, s, R) {
var y = kzHeight(x, z);
if (kind === "acacia") {
kzI("trunk", x, y, z, 0.5 * s, 3.6 * s, 0.5 * s, R() * 6, 0x6A4A30);
for (var k = 0; k < 3; k++) {
var a = R() * 6.283;
kzI("canopy", x + Math.cos(a) * 1.4 * s, y + (3.8 + R() * 0.5) * s, z + Math.sin(a) * 1.4 * s, (4.5 + R()) * s, (0.9 + R() * 0.3) * s, (4 + R()) * s, R() * 6, [0x5A8A30, 0x4E7E2C, 0x6A9638][k]);
}
return;
}
if (kind === "pine") {
kzI("trunk", x, y, z, 0.45 * s, 2 * s, 0.45 * s, 0, 0x5A3A24);
for (var p = 0; p < 4; p++)
kzI("pine", x, y + (1.8 + p * 1.5) * s, z, (3.2 - p * 0.6) * s, (2.6 - p * 0.2) * s, (3.2 - p * 0.6) * s, R() * 6, [0x2E5A30, 0x34663A, 0x3A6E3E, 0x427A44][p]);
return;
}
if (kind === "gum") {
kzI("trunk", x, y, z, 0.45 * s, 4.6 * s, 0.45 * s, R() * 6, 0xE8E0D0);
for (var k2 = 0; k2 < 4; k2++) {
var a2 = R() * 6.283;
kzI("canopy", x + Math.cos(a2) * 1.6 * s, y + (4.6 + R() * 1.4) * s, z + Math.sin(a2) * 1.6 * s, (2.6 + R()) * s, (1.8 + R() * 0.6) * s, (2.6 + R()) * s, R() * 6, [0x7A9A6A, 0x6A8A5E, 0x88A878, 0x7A9468][k2]);
}
return;
}
if (kind === "jungle") {
kzI("trunk", x, y, z, 0.55 * s, 5 * s, 0.55 * s, R() * 6, 0x6A5038);
for (var k3 = 0; k3 < 5; k3++) {
var a3 = R() * 6.283;
kzI("canopy", x + Math.cos(a3) * 1.8 * s, y + (5 + R() * 1.6) * s, z + Math.sin(a3) * 1.8 * s, (3 + R()) * s, (2.2 + R() * 0.6) * s, (3 + R()) * s, R() * 6, [0x2E8A3A, 0x3A9A44, 0x268030, 0x44A450, 0x309038][k3]);
}
return;
}
kzI("trunk", x, y, z, 0.7 * s, 4 * s, 0.7 * s, R() * 6, 0x6A4A30);
for (var k4 = 0; k4 < 5; k4++) {
var a4 = R() * 6.283, d4 = R() * 1.8 * s;
kzI("canopy", x + Math.cos(a4) * d4, y + (4.6 + R() * 1.6) * s, z + Math.sin(a4) * d4, (3.4 + R() * 1.2) * s, (2.8 + R() * 0.8) * s, (3.4 + R() * 1.2) * s, R() * 6, [0x4A8A34, 0x5A9A3E, 0x3E7E2E, 0x52923A, 0x46863A][k4]);
}
},
function (g) {
var wd = kzM(0x8A5A34), ir = kzM(0x2E3A34);
for (var s = 0; s < 4; s++)
wBox(1.9, 0.06, 0.11, wd, 0, 0.46, -0.18 + s * 0.13, g);
for (var b = 0; b < 2; b++)
wBox(1.9, 0.11, 0.06, wd, 0, 0.62 + b * 0.15, 0.24, g).rotation.x = -0.15;
[-0.8, 0.8].forEach(function (x) { wBox(0.06, 0.46, 0.5, ir, x, 0.23, 0, g); wBox(0.06, 0.5, 0.06, ir, x, 0.7, 0.26, g); });
kzSolidIn(g, 0, 0, 1, 0.35, 0.9);
},
function (pen, x, z, rot) {
if (typeof wPerson !== "function")
return;
var P = pen.P;
try {
var g = wPerson("kz_keeper" + pen.i, { title: "Zookeeper", look: { top: 0xB8A070, bottom: 0x5A5034, sex: /Amara|Nia|Bea|Rosa|Mei/.test(P[4]) ? "f" : "m" } });
g.position.set(x, kzHeight(x, z), z);
g.rotation.y = rot;
g.userData.keep = 1;
KZ.G.add(g);
var bk = wCyl(0.14, 0.11, 0.26, kzM(0x5A8AB0), 0.3, 0.75, 0.12, g, 10);
var Pp = { g: g, wander: null };
KZ.people.push(Pp);
KZ.zoo.keepers.push({ g: g, pen: pen, home: { x: x, z: z, rot: rot } });
KZ.talk.push({ p: Pp, r: 3, name: P[4], t: { name: P[4], persona: "You are " + P[4] + ", the zookeeper who looks after the animals at the " + P[1] + " in Wonderglen Zoo, in the Kids Zone of Faerie in SomnuMatrix. You love your animals and know true, simple facts about real " + P[0] + "s (what they eat, how they live in the wild, how you care for them). You speak simply and warmly, as to a child or a family, never about anything scary or grown-up. Everything in Wonderglen is free.", greet: "Hello! These are my " + P[0] + "s. Would you like to know something amazing about them?" } });
}
catch (e) { }
},
function (ZG, pen) {
var r = KZ_ZOO_R.penR, g = pen.g, top = 3.6, dp = kzLocal(g, -7.5, -(r + 1.6)), y = kzHeight(dp.x, dp.z), dg = kzAt(ZG, dp.x, dp.z, pen.a, y);
var wood = kzM(0x9A6A40), post = kzM(0x6A4A2A);
wBox(4.2, 0.25, 3.2, wood, 0, top - 0.12, 0, dg);
for (var q = 0; q < 4; q++)
wBox(0.25, top, 0.25, post, (q % 2 ? 1.9 : -1.9), top / 2, (q < 2 ? 1.4 : -1.4), dg);
[-1, 1].forEach(function (s) { wBox(0.08, 0.9, 3.2, post, s * 2.05, top + 0.45, 0, dg); });
wBox(4.2, 0.9, 0.08, post, 0, top + 0.45, 1.58, dg);
wBox(4.2, 0.1, 0.12, kzM(0xC89058), 0, top + 0.95, 1.6, dg);
var bs = wCyl(0.32, 0.25, 0.35, kzM(0xC89A5A), 1.4, top + 0.18, -1, dg, 12);
wSph(0.3, kzM(0x7AC050), 1.4, top + 0.42, -1, dg, 10).scale.y = 0.5;
var n = 12, rise = top / n;
for (var s2 = 0; s2 < n; s2++) {
var lz = -1.6 - (n - s2) * 0.5 + 0.25;
wBox(1.4, rise * (s2 + 1), 0.5, wood, -1.4, rise * (s2 + 1) / 2, lz, dg);
var w = kzLocal(dg, -1.4, lz);
kzPlat({ x: w.x, z: w.z, hw: 0.7, hd: 0.25, rot: dg.rotation.y, top: y + rise * (s2 + 1) });
}
var dw = kzLocal(dg, 0, 0);
kzPlat({ x: dw.x, z: dw.z, hw: 2.1, hd: 1.6, rot: dg.rotation.y, top: y + top, rail: true });
KZ.exits = KZ.exits || [];
var ex = kzLocal(dg, -1.4, -1.7);
KZ.exits.push({ x: ex.x, z: ex.z, r: 0.9 });
var fx = kzLocal(dg, 0, 1.4);
KZ.zoo.deck = { x: dw.x, z: dw.z, r: 2.6, top: y + top, feedAt: kzLocal(g, -7.5, -(r - 2.6)) };
kzSpot(fx.x, fx.z, 2.4, "Feed a giraffe", "hold out a lettuce leaf", function () { kzZooFeedGiraffe(); });
var sg = kzTwoSided(["GIRAFFE FEEDING DECK", "up the steps · press E at the rail"], 2.6, 0.6, "#7A4A1A", "#FFF4D8");
var sp = kzLocal(dg, -1.4, -1.6 - n * 0.5 - 0.6);
sg.position.set(sp.x, y + 2.1, sp.z);
sg.rotation.y = pen.a + Math.PI;
ZG.add(sg);
},
function () {
var D = KZ.zoo && KZ.zoo.deck;
if (!D)
return;
if (worldLocal().y - 1.72 < D.top - 1)
return setStatus("🦒 Climb the steps to the <b>Giraffe Feeding Deck</b> first: the giraffes eat up high.");
var A = typeof kzaNearest === "function" ? kzaNearest("giraffe", D.feedAt.x, D.feedAt.z) : null;
if (!A)
return setStatus("The giraffes are on their way.");
if (KZ.zoo.feedG && KZ.zoo.feedG.t > 0)
return setStatus("A giraffe is coming for the lettuce: hold it out a moment longer!");
A.tx = D.feedAt.x;
A.tz = D.feedAt.z;
A.wait = 0;
KZ.zoo.feedG = { A: A, t: 30 };
if (typeof playTone === "function")
playTone(520, 0.2);
setStatus("🥬 You hold out a lettuce leaf over the rail. A giraffe has seen it and is coming over…");
},
function (dt) {
var F = KZ.zoo && KZ.zoo.feedG;
if (!F)
return;
F.t -= dt;
var D = KZ.zoo.deck, A = F.A;
if (Math.hypot(A.x - D.feedAt.x, A.z - D.feedAt.z) < 0.8) {
KZ.zoo.feedG = null;
A.wait = 12;
A.yaw = Math.atan2(D.x - A.x, D.z - A.z);
var n = (kzLocalGet("giraffefed") || 0) + 1;
kzLocalSet("giraffefed", n);
if (typeof playTone === "function") {
playTone(660, 0.15);
setTimeout(function () { playTone(880, 0.25); }, 180);
}
setStatus("🦒 <b>The giraffe stretches out its long dark-purple tongue and takes the lettuce from your hand!</b> " + (n > 1 ? "You have fed the giraffes " + n + " times." : "Its tongue is about half a metre long."));
return;
}
if (F.t <= 0)
KZ.zoo.feedG = null;
},
function (pen) {
var P = pen.P, ans = kzShuffle(P[7].slice()), fns = {}, got = kzLocalGet("zoo") || {};
var h = "<div style='font:600 18px var(--serif,Georgia);color:#FFE07A'>🐾 " + esc(P[1]) + (got[P[0]] ? " ✓" : "") + "</div><div style='margin:6px 0;line-height:1.55'>" + esc(P[5]) + "</div><div style='margin-top:8px;font-weight:600'>" + esc(P[6]) + "</div>";
ans.forEach(function (a, k) {
h += worldBtn("a" + k, esc(a), "");
fns["a" + k] = function () {
if (a !== P[7][0]) {
if (typeof playTone === "function")
playTone(240, 0.2);
return setStatus("Not quite. Read the sign again!");
}
got = kzLocalGet("zoo") || {};
got[P[0]] = 1;
kzLocalSet("zoo", got);
var n = KZ_PENS.filter(function (Q) { return got[Q[0]]; }).length;
worldCard(null);
if (typeof playTone === "function")
playTone(760, 0.2);
if (n >= KZ_ZOO_NEED && !kzStickers().zoo)
kzWin("zoo", "<b>Zoo Explorer!</b> You know something amazing about every animal in Wonderglen Zoo.");
else
setStatus("<b>Right!</b> That's " + n + " of " + KZ_ZOO_NEED + " animals for the Zoo Explorer sticker.");
};
});
worldCard(h, fns);
},
function (ZG, R) {
var Z = kzZooHub(), y = kzHeight(Z.x, Z.z), N = 28, ga = kzZooGateAng();
for (var i = 0; i < N; i++) {
var a = ga + (i + 0.5) / N * Math.PI * 2, p = kzZooAt(a, KZ_ZOO_R.walk1 + 0.6);
kzI("stalk", p.x, y, p.z, 0.13, 3.4, 0.13, 0, 0x2E4A3A);
kzI("ball", p.x, y + 3.55, p.z, 0.42, 0.42, 0.42, 0, 0xFFF0C8);
KZ.solids.push({ x: p.x, z: p.z, r: 0.2, h: 3.6 });
}
for (var k = 0; k <= KZ_PENS.length; k++) {
var mid = ga + (k + 0.5) * Math.PI * 2 / (KZ_PENS.length + 1);
if (k === KZ_PENS.length)
continue;
for (var f = 0; f < 26; f++) {
var fa = mid + (R() - 0.5) * 0.2, fr = KZ_ZOO_R.walk1 + 1.6 + R() * 4, fp = kzZooAt(fa, fr);
kzI("bloom", fp.x, y + 0.35, fp.z, 0.5, 0.5, 0.5, R() * 3, KZ_PETALS[f % KZ_PETALS.length]);
kzI("ball", fp.x, y + 0.15, fp.z, 0.7, 0.5, 0.7, 0, 0x4E8E3A);
}
}
for (var b = 0; b < KZ_PENS.length; b++) {
var bp = kzZooAt(kzZooPenAng(b) + 0.16, KZ_ZOO_R.walk1 + 1.2);
var bg = kzAt(ZG, bp.x, bp.z, 0);
wCyl(0.3, 0.26, 0.9, kzM(0x2E5A3A), 0, 0.45, 0, bg, 10);
wCyl(0.33, 0.33, 0.08, kzM(0x1E3A2A), 0, 0.92, 0, bg, 10);
KZ.solids.push({ x: bp.x, z: bp.z, r: 0.35, h: 1 });
}
for (var s = 0; s < 4; s++) {
var sa = ga + 0.32 + s * Math.PI / 2, sp = kzZooAt(sa, KZ_ZOO_R.walk0 - 1);
var near = KZ_PENS.map(function (P, i) { return [P[1], kzZooPenAng(i)]; }).filter(function (q) { var d = Math.atan2(Math.sin(q[1] - sa), Math.cos(q[1] - sa)); return Math.abs(d) < 1.2; });
if (typeof kzPost === "function")
kzPost(ZG, sp.x, sp.z, near.map(function (q) { var c = kzZooAt(q[1], KZ_ZOO_R.pen); return { to: q[0], a: Math.atan2(c.x - sp.x, c.z - sp.z) }; }).slice(0, 4), { wood: 0x5A3A24, board: 0x2E5A3A });
}
},
function (ZG, R) {
var Z = kzZooHub(), y = kzHeight(Z.x, Z.z), ga = kzZooGateAng();
var cp = kzZooAt(ga + 1.6, 15), cg = kzAt(ZG, cp.x, cp.z, kzFace(cp.x, cp.z, Z.x, Z.z));
wBox(6, 2.8, 3.4, kzM(0xF4E8D0), 0, 1.4, -1.2, cg);
wBox(6.4, 0.2, 3.8, kzM(0x5A8A4A), 0, 2.95, -1.2, cg);
for (var s = 0; s < 8; s++) {
var aw = wBox(0.8, 0.06, 1.6, kzM(s % 2 ? 0xFFF8F0 : 0x3AA05A), -2.8 + s * 0.8, 2.55, 1.25, cg);
aw.rotation.x = 0.35;
}
wBox(5, 1.0, 0.6, kzM(0xC89A5A), 0, 0.5, 0.6, cg);
var cs = kzTwoSided(["ZOO CAFÉ", "free lemonade and cookies"], 3.4, 0.6, "#2E6A3A", "#FFF8E0");
cs.position.set(0, 3.4, 0.6);
cg.add(cs);
kzSolidIn(cg, 0, -1.2, 3.1, 1.8, 3);
kzSolidIn(cg, 0, 0.6, 2.5, 0.35, 1.1);
kzSpot(kzLocal(cg, 0, 1.8).x, kzLocal(cg, 0, 1.8).z, 2.6, "The Zoo Café", "have a free lemonade", function () { if (typeof kzSnackCard === "function")
kzSnackCard("🍋 A cold glass of lemonade from the Zoo Café: on the house!");
else
setStatus("🍋 A cold glass of lemonade: on the house!"); });
for (var t = 0; t < 5; t++) {
var ta = ga + [0.75, 1.0, 2.2, 2.45, 2.7][t], tp = kzZooAt(ta, 11 + (t % 2) * 2.5), tg = kzAt(ZG, tp.x, tp.z, R() * 6);
wCyl(0.7, 0.7, 0.06, kzM(0xFFF8F0), 0, 0.78, 0, tg, 16);
wCyl(0.06, 0.06, 0.78, kzM(0x3A3A3A), 0, 0.39, 0, tg, 6);
for (var c = 0; c < 3; c++) {
var ca = c / 3 * Math.PI * 2;
wCyl(0.22, 0.22, 0.06, kzM(0x3AA05A), Math.sin(ca) * 1.05, 0.46, Math.cos(ca) * 1.05, tg, 10);
}
wCyl(0.03, 0.03, 2.3, kzM(0xF0F0F0), 0, 1.4, 0, tg, 6);
var um = wCone(1.4, 0.6, kzM([0xE8504A, 0xF0C040, 0x48A8E0, 0x60C058, 0xF07AA8][t]), 0, 2.6, 0, tg, 12);
KZ.solids.push({ x: tp.x, z: tp.z, r: 1.1, h: 0.9 });
}
var ip = kzZooAt(ga - 0.3, KZ_ZOO_R.walk0 - 1), ig = kzAt(ZG, ip.x, ip.z, kzFace(ip.x, ip.z, Z.x, Z.z));
wBox(1.8, 1.0, 1, kzM(0xFFF4F8), 0, 0.85, 0, ig);
[-0.7, 0.7].forEach(function (x) { var wh = wCyl(0.32, 0.32, 0.08, kzM(0x3A3A3A), x, 0.32, -0.55, ig, 14); wh.rotation.x = Math.PI / 2; });
wCyl(0.04, 0.04, 1.6, kzM(0xF0F0F0), 0, 2, 0, ig, 6);
var ub = wCone(1.2, 0.5, kzM(0xF07AA8), 0, 2.85, 0, ig, 10);
for (var sc = 0; sc < 4; sc++)
wSph(0.12, kzM([0xF8D8E8, 0xFFF0C0, 0x9A6A40, 0xC8F0C8][sc]), -0.6 + sc * 0.4, 1.45, 0, ig, 8);
kzSolidIn(ig, 0, 0, 1, 0.6, 1.5);
kzSpot(kzLocal(ig, 0, 1.2).x, kzLocal(ig, 0, 1.2).z, 2.2, "The ice-cream cart", "choose a free ice cream", function () { setStatus("🍦 A free scoop of " + ["strawberry", "vanilla", "chocolate", "mint"][Math.floor(Math.random() * 4)] + " ice cream, with sprinkles. Yum!"); });
var pp = kzZooAt(ga + 3.6, 14.5), pg = kzAt(ZG, pp.x, pp.z, kzFace(pp.x, pp.z, Z.x, Z.z));
var soft = wMesh(new THREE.CircleGeometry(5.2, 32), kzM(0x58B0D8), 0, 0.07, 0, pg);
soft.rotation.x = -Math.PI / 2;
[-1.4, 1.4].forEach(function (x) { var l = wCyl(0.07, 0.07, 2.6, kzM(0xF0C040), x, 1.2, -2.4, pg, 8); l.rotation.z = x > 0 ? -0.2 : 0.2; });
wCyl(0.06, 0.06, 3.2, kzM(0xF0C040), 0, 2.45, -2.4, pg, 8).rotation.z = Math.PI / 2;
[-0.6, 0.6].forEach(function (x) { wBox(0.5, 0.05, 0.25, kzM(0xE8504A), x, 0.55, -2.4, pg); wCyl(0.01, 0.01, 1.85, kzM(0x888888), x - 0.2, 1.5, -2.4, pg, 4); wCyl(0.01, 0.01, 1.85, kzM(0x888888), x + 0.2, 1.5, -2.4, pg, 4); });
var sl = wBox(0.8, 0.08, 4, kzM(0x48A8E0), 2, 1.1, 1.2, pg);
sl.rotation.x = -0.5;
wBox(1, 2, 1, kzM(0xF07AA8), 2, 1, -0.6, pg);
kzSolidIn(pg, 2, -0.6, 0.5, 0.5, 2);
for (var gs = 0; gs < 6; gs++)
wSph(0.35, kzM(0xE8A040), -2.4, 0.4 + gs * 0.55, 1.4 + gs * 0.08, pg, 10);
kzSolidIn(pg, 0, -2.4, 1.6, 0.2, 2.6);
var mp = kzZooAt(ga + 0.3, KZ_ZOO_R.plaza - 2);
kzSign(ZG, mp.x, mp.z, ga + 0.3, ["ZOO MAP", "press E: where are the animals?"], 2.4, 0.8, "#2E5A3A", "#FFF4D8");
kzSpot(mp.x, mp.z, 2.6, "The zoo map", "see where every animal lives", function () { kzZooMapCard(); });
var bp = kzZooAt(ga - 0.1, KZ_ZOO_R.hedge - 6);
kzBalloons(ZG, bp.x, bp.z, 9, 4242);
},
function () {
var h = "<div style='font:600 18px var(--serif,Georgia);color:#FFE07A'>🗺️ Wonderglen Zoo</div><div style='margin:6px 0;line-height:1.5'>Ten homes for real animals round the promenade. Choose one and the arrow at the top of the screen shows you the way.</div>", fns = {};
KZ_PENS.forEach(function (P, i) { h += worldBtn("p" + i, esc(P[1]) + " · " + esc(P[4]), ""); fns["p" + i] = function () { var c = kzZooAt(kzZooPenAng(i), KZ_ZOO_R.walk1 + 2); KZ.guide = { x: c.x, z: c.z, r: 4, name: "the " + P[1] }; worldCard(null); if (typeof KZW !== "undefined") {
KZW.route = null;
} setStatus("Follow the arrow to <b>the " + esc(P[1]) + "</b>."); }; });
h += worldBtn("tr", "The Zoo Express (station)", "");
fns.tr = function () { var st = KZ.zoo.station; KZ.guide = { x: st.x, z: st.z, r: 3, name: "the Zoo Express" }; worldCard(null); };
worldCard(h, fns);
},
function (ZG) {
var Z = kzZooHub(), ga = kzZooGateAng(), p = kzZooAt(ga, KZ_ZOO_R.gate), g = kzAt(ZG, p.x, p.z, ga + Math.PI);
var stone = kzM(0xD8C4A0), dk = kzM(0xA88A64), wood = kzM(0x7A5032), thatch = kzM(0xC8A458);
[-1, 1].forEach(function (s) {
wBox(2.4, 6, 2.4, stone, s * 5.2, 3, 0, g);
wBox(2.8, 0.4, 2.8, dk, s * 5.2, 6.2, 0, g);
wCone(2.2, 2, thatch, s * 5.2, 7.4, 0, g, 8);
wCyl(0.06, 0.06, 3, kzM(0xEEEEEE), s * 5.2, 9.6, 0, g, 6);
var fl = wBox(1.4, 0.8, 0.04, kzM(s < 0 ? 0x3AA05A : 0xF0C040, { ds: true }), s * 5.2 + 0.72, 10.6, 0, g);
fl.userData.keep = 1;
kzSolidIn(g, s * 5.2, 0, 1.3, 1.3, 7);
var es = kzAt(g, s * 8.6, -1.5, s > 0 ? -0.5 : 0.5);
wBox(2.6, 1, 3.2, dk, 0, 0.5, 0, es);
var bd = wSph(1.2, stone, 0, 2.2, 0, es, 14);
bd.scale.set(0.9, 0.9, 1.3);
wSph(0.75, stone, 0, 2.9, 1.4, es, 12);
[-0.5, 0.5].forEach(function (x) { [-0.7, 0.7].forEach(function (z) { wCyl(0.32, 0.32, 1.3, stone, x, 1.4, z, es, 10); }); });
[-1, 1].forEach(function (e) { var ear = wSph(0.6, stone, e * 0.7, 2.9, 1.2, es, 10); ear.scale.set(0.2, 1, 0.8); });
var tr = wCyl(0.14, 0.22, 1.4, stone, 0, 3.2, 2.1, es, 8);
tr.rotation.x = -0.9;
kzSolidIn(es, 0, 0, 1.3, 1.6, 4);
});
wBox(9, 1.1, 0.5, wood, 0, 5.4, 0, g);
wBox(9.6, 0.25, 1.2, thatch, 0, 6.1, 0, g);
var sg = kzTwoSided(["WONDERGLEN ZOO", "lions · giraffes · elephants · penguins · and more"], 7.2, 1.3, "#2E5A3A", "#FFF2B8");
sg.position.set(0, 4.2, 0.3);
g.add(sg);
},
function (ZG, R) {
if (typeof wPerson !== "function")
return;
var Z = kzZooHub(), n = KZ_LITE ? 6 : 16;
for (var i = 0; i < n; i++) {
try {
var child = i % 3 !== 0, g = wPerson("kz_zv" + i, child ? { child: true } : {});
g.userData.keep = 1;
KZ.G.add(g);
var W = { g: g, a: R() * Math.PI * 2, r: KZ_ZOO_R.walk0 + 1 + R() * (KZ_ZOO_R.walk1 - KZ_ZOO_R.walk0 - 2), sp: (child ? 1.1 : 0.9) * (R() < 0.5 ? 1 : -1), stop: R() * 8, look: 0 };
KZ.zoo.walkers.push(W);
KZ.people.push({ g: g, wander: null, child: child });
kzZooWalkerPlace(W, 0);
}
catch (e) { }
}
},
function (W, dt) {
var Z = kzZooHub(), y = kzHeight(Z.x, Z.z), g = W.g;
if (W.stop > 0) {
W.stop -= dt;
}
else {
W.a += W.sp * dt / W.r;
for (var i = 0; i < KZ_PENS.length; i++) {
if (i === W.last)
continue;
var pa = kzZooPenAng(i), d = Math.atan2(Math.sin(W.a - pa), Math.cos(W.a - pa));
if (Math.abs(d) < 0.02) {
W.last = i;
if (Math.random() < 0.6) {
W.stop = 8 + Math.random() * 14;
W.look = pa;
}
break;
}
}
}
var x = Z.x + Math.sin(W.a) * W.r, z = Z.z + Math.cos(W.a) * W.r;
g.position.set(x, y + 0.05, z);
if (W.stop > 0) {
var c = kzZooAt(W.look, KZ_ZOO_R.pen);
g.rotation.y = Math.atan2(c.x - x, c.z - z);
}
else
g.rotation.y = W.a + (W.sp > 0 ? Math.PI / 2 : -Math.PI / 2);
},
function (ZG) {
var Z = kzZooHub(), y = kzHeight(Z.x, Z.z), g = kzAt(ZG, Z.x, Z.z, 0, y), r = KZ_ZOO_R.aviary, iron = kzM(0x2E4A3E);
for (var m = 0; m < 10; m++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.07, 5, 40, Math.PI), iron);
t.rotation.y = m / 10 * Math.PI;
g.add(t);
}
for (var l = 1; l < 4; l++) {
var ph = l / 4 * Math.PI / 2, rr = Math.cos(ph) * r, t2 = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.06, 5, 48), iron);
t2.rotation.x = Math.PI / 2;
t2.position.y = Math.sin(ph) * r;
g.add(t2);
}
var net = new THREE.Mesh(new THREE.SphereGeometry(r - 0.05, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xE8F0EC, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.DoubleSide }));
net.userData.keep = 1;
g.add(net);
wCyl(r, r, 0.12, kzM(0x7AB060), 0, 0.06, 0, g, 32);
for (var i = 0; i < 40; i++) {
var a = i / 40 * Math.PI * 2;
KZ.solids.push({ x: Z.x + Math.sin(a) * r, z: Z.z + Math.cos(a) * r, r: 0.9 });
}
var R = wRand(55);
kzZooTree(Z.x + 2, Z.z - 1, "broad", 0.75, R);
kzZooTree(Z.x - 2.5, Z.z + 2, "jungle", 0.6, R);
for (var f = 0; f < 30; f++) {
var fa = R() * 6.283, fd = R() * (r - 1.5);
kzI("bloom", Z.x + Math.sin(fa) * fd, y + 0.3, Z.z + Math.cos(fa) * fd, 0.45, 0.45, 0.45, R() * 3, KZ_PETALS[f % 7]);
}
if (typeof build === "function") {
for (var o = 0; o < (KZ_LITE ? 2 : 4); o++) {
var oa = o / 4 * Math.PI * 2 + 0.3;
try {
var ow = build({ id: "kz_zoo_owl" + o, archetype: "owl", label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
ow.position.set(Z.x + Math.sin(oa) * 3.2, y + 3.2 + o * 0.4, Z.z + Math.cos(oa) * 3.2);
ow.rotation.y = oa;
ow.userData.keep = 1;
ZG.add(ow);
KZ.critters.push({ g: ow, wander: null, zoo: true });
}
catch (e) { }
}
try {
var bf = build({ id: "kz_zoo_bf", archetype: "butterflies", label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
bf.position.set(Z.x, y + 2.5, Z.z);
bf.userData.keep = 1;
ZG.add(bf);
KZ.critters.push({ g: bf, wander: null, zoo: true });
}
catch (e) { }
}
var sg = kzTwoSided(["THE AVIARY", "owls and butterflies"], 3, 0.6, "#2E4A3E", "#FFF8E0");
var sp = kzZooAt(kzZooGateAng(), r + 1.2);
sg.position.set(sp.x, y + 2, sp.z);
sg.rotation.y = kzZooGateAng();
ZG.add(sg);
},
function (dt, L) {
var Z = KZ.zoo;
if (!Z)
return;
var N = kzZooFeedNow(), F = N.F, pen = Z.pens[F[0]];
if (!pen)
return;
var on = N.into < 50, near = Math.hypot(L.x - kzZooHub().x, L.z - kzZooHub().z) < KZ_ZOO_R.gate + 30;
if (on && Z.feedSlot !== N.slot) {
Z.feedSlot = N.slot;
var spot = kzLocal(pen.g, 0, -(KZ_ZOO_R.penR - 4));
if (typeof kzaCall === "function")
kzaCall(F[1], spot.x, spot.z, F[1] === "penguin" ? 6 : 3, 2.4);
if (near && !KZ.ride)
setStatus(F[2] + " Follow the zoo map to watch.");
}
Z.keepers.forEach(function (K) {
var want = on && K.pen === pen, H = K.home, tx = H.x, tz = H.z;
if (want) {
var w = kzLocal(pen.g, 1.6, -(KZ_ZOO_R.penR + 0.9));
tx = w.x;
tz = w.z;
}
var dx = tx - K.g.position.x, dz = tz - K.g.position.z, d = Math.hypot(dx, dz);
if (d > 0.1) {
var st = Math.min(d, dt * 1.1);
K.g.position.x += dx / d * st;
K.g.position.z += dz / d * st;
K.g.rotation.y = Math.atan2(dx, dz);
}
else
K.g.rotation.y = want ? pen.a + 0 : H.rot;
});
if (!Z.spray) {
var geo = new THREE.BufferGeometry(), n = KZ_LITE ? 40 : 90;
geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
var pm = new THREE.PointsMaterial({ color: 0xD8F0FF, size: 0.22, transparent: true, opacity: 0.7, depthWrite: false });
Z.spray = new THREE.Points(geo, pm);
Z.spray.frustumCulled = false;
Z.spray.userData.keep = 1;
Z.G.add(Z.spray);
Z.spray.visible = false;
}
var show = on && near && (F[1] === "elephant" || F[1] === "penguin");
Z.spray.visible = show;
if (show) {
var P = Z.spray.geometry.attributes.position, K2 = Z.keepers.filter(function (k) { return k.pen === pen; })[0], from = K2 ? K2.g.position : null;
if (from) {
var into = kzLocal(pen.g, 0, -(KZ_ZOO_R.penR - 5)), yy = kzHeight(into.x, into.z);
for (var i = 0; i < P.count; i++) {
var u = ((KZ.t * (F[1] === "penguin" ? 0.35 : 0.6) + i / P.count) % 1), sx = from.x + (into.x - from.x) * u + (F[1] === "penguin" ? Math.sin(i * 7.1) * 1.6 * u : Math.sin(i * 3.3) * 0.3 * u), sz = from.z + (into.z - from.z) * u + (F[1] === "penguin" ? Math.cos(i * 5.3) * 1.6 * u : Math.cos(i * 2.7) * 0.3 * u);
P.setXYZ(i, sx, yy + 1.4 + Math.sin(u * Math.PI) * (F[1] === "penguin" ? 2.6 : 3.2) - u * 0.6, sz);
}
P.needsUpdate = true;
Z.spray.material.color.setHex(F[1] === "penguin" ? 0xC8D0D8 : 0xD8F0FF);
Z.spray.material.size = F[1] === "penguin" ? 0.3 : 0.2;
}
}
},
function (ZG) {
var Z = kzZooHub(), y = kzHeight(Z.x, Z.z), cars = [], cols = [0x2E6A3A, 0xE8504A, 0x48A8E0, 0xF0C040], n = 4;
for (var c = 0; c < n; c++) {
var cg = new THREE.Group();
cg.userData.keep = 1;
ZG.add(cg);
if (c === 0) {
kzZooEngine(cg);
}
else {
var body = kzM(cols[c]), trim = kzM(0xF4E8C8), wood = kzM(0x8A5A34);
wBox(1.7, 0.18, 3.1, kzM(0x3A3A40), 0, 0.62, 0, cg);
wBox(1.7, 0.55, 3.0, body, 0, 0.98, 0, cg);
wBox(1.76, 0.08, 3.06, trim, 0, 1.28, 0, cg);
[-0.9, 0.4].forEach(function (z) { wBox(1.4, 0.1, 0.55, wood, 0, 1.05, z, cg); wBox(1.4, 0.5, 0.08, wood, 0, 1.35, z - 0.28, cg); });
for (var q = 0; q < 4; q++)
wCyl(0.04, 0.04, 1.25, trim, (q % 2 ? 0.8 : -0.8), 1.9, (q < 2 ? 1.4 : -1.4), cg, 6);
var roof = wBox(1.9, 0.1, 3.3, kzM(KZ_RAINBOW[(c * 2 + 1) % 7][0]), 0, 2.55, 0, cg);
wBox(1.95, 0.12, 0.12, trim, 0, 2.5, 1.62, cg);
wBox(1.95, 0.12, 0.12, trim, 0, 2.5, -1.62, cg);
if (c > 1 && typeof wPerson === "function") {
try {
var kid = wPerson("kz_trainkid" + c, { child: true });
kid.position.set(0.35, 0.62, 0.45);
kid.userData.keep = 1;
cg.add(kid);
var kid2 = wPerson("kz_trainkid" + c + "b", { child: c === 3 });
kid2.position.set(-0.35, 0.62, -0.85);
kid2.userData.keep = 1;
cg.add(kid2);
}
catch (e) { }
}
}
[-1.0, 1.0].forEach(function (wz) { [-0.82, 0.82].forEach(function (wx) { var wh = wCyl(0.36, 0.36, 0.12, kzM(0xC8343A), wx, 0.38, wz, cg, 16); wh.rotation.z = Math.PI / 2; wCyl(0.12, 0.12, 0.14, kzM(0x2A2A2A), wx, 0.38, wz, cg, 8).rotation.z = Math.PI / 2; }); });
cars.push(cg);
}
var sa = kzZooTrainA0() + 0.06, st = kzZooAt(sa, KZ_ZOO_R.track + 2.7), sg = kzAt(ZG, st.x, st.z, sa + Math.PI / 2);
wBox(9, 0.55, 2.6, kzM(0xD8C8B0), 0, 0.27, 0, sg);
wBox(9, 0.08, 0.3, kzM(0xF0D040), 0, 0.56, -1.15, sg);
for (var pq = 0; pq < 4; pq++)
wCyl(0.09, 0.09, 2.8, kzM(0x2E4A3E), -3.6 + pq * 2.4, 1.95, 0.6, sg, 8);
var cn = wBox(9.6, 0.16, 3.2, kzM(0xE8504A), 0, 3.4, 0, sg);
for (var v = 0; v < 12; v++)
wCone(0.2, 0.3, kzM(0xFFF4E0), -4.4 + v * 0.8, 3.18, -1.6, sg, 4).rotation.x = Math.PI;
var nm = kzTwoSided(["ZOO EXPRESS", "all the way round · press E on the platform"], 3.6, 0.7, "#C8343A", "#FFF8E0");
nm.position.set(0, 4.0, 0);
sg.add(nm);
var clk = wCyl(0.35, 0.35, 0.08, kzM(0xFFFFFF), 2.6, 2.8, 0.6, sg, 20);
clk.rotation.x = Math.PI / 2;
kzZooBench(kzAt(sg, -2.6, 0.7, Math.PI, 0.55));
[-4.2, 4.2].forEach(function (x) { wCyl(0.35, 0.28, 0.5, kzM(0x9A6A40), x, 0.8, 0.8, sg, 10); for (var f = 0; f < 5; f++)
wSph(0.15, kzM(KZ_PETALS[f]), x + (f - 2) * 0.12, 1.12, 0.8 + (f % 2) * 0.1, sg, 8); });
kzPlat({ x: st.x, z: st.z, hw: 4.5, hd: 1.3, rot: sg.rotation.y, top: y + 0.55 });
KZ.zoo.station = { x: st.x, z: st.z, a: sa };
var T = { cars: cars, clock: Date.now() / 1000 % (kzZooTrainRun() + KZ_TRAIN.wait), s: 0, sdt: 1 / 60, y: y, yawV: 0, lookFree: 0, lastYaw: null, smoke: [] };
KZ.zoo.train = T;
kzSpot(st.x, st.z, 4.6, "The Zoo Express", "ride all the way round", function () { kzZooTrainBoard(); });
if (typeof wPerson === "function")
try {
var dr = wPerson("kz_driver", { title: "Train driver", look: { top: 0x2E4A6A, bottom: 0x2A2A3A, sex: "m" } });
dr.position.set(0, 0.7, -0.9);
dr.userData.keep = 1;
cars[0].add(dr);
}
catch (e) { }
kzZooTrainPlace(T, 0);
},
function (cg) {
var green = kzM(0x2E7A44), black = kzM(0x23262A), brass = kzM(0xD8B04A), red = kzM(0xC8343A);
wBox(1.7, 0.25, 3.4, black, 0, 0.62, 0, cg);
var b = wCyl(0.62, 0.62, 2.0, green, 0, 1.36, 0.55, cg, 20);
b.rotation.x = Math.PI / 2;
for (var i = 0; i < 3; i++) {
var bd = wCyl(0.64, 0.64, 0.06, brass, 0, 1.36, -0.2 + i * 0.75, cg, 20);
bd.rotation.x = Math.PI / 2;
}
var sm = wCyl(0.66, 0.66, 0.35, black, 0, 1.36, 1.62, cg, 20);
sm.rotation.x = Math.PI / 2;
wCyl(0.18, 0.26, 0.9, black, 0, 2.3, 1.35, cg, 12);
wCyl(0.28, 0.2, 0.12, black, 0, 2.8, 1.35, cg, 12);
wSph(0.24, brass, 0, 2.05, 0.6, cg, 12);
wBox(1.9, 0.35, 0.15, red, 0, 0.72, 1.82, cg);
wSph(0.16, kzM(0xFFF4C0, { e: 0xFFF4C0, ei: 0.25 }), 0, 1.6, 1.82, cg, 10);
wBox(1.6, 1.5, 1.3, green, 0, 1.5, -0.95, cg);
wBox(1.85, 0.12, 1.6, black, 0, 2.33, -0.95, cg);
wBox(1.1, 0.6, 0.06, kzM(0x9AC8E0, { op: 0.5 }), 0, 1.75, -0.28, cg).userData.keep = 1;
var cw = wCone(0.6, 0.5, red, 0, 0.45, 1.95, cg, 4);
cw.rotation.x = Math.PI / 2;
cw.scale.set(1.4, 1, 0.6);
cg.userData.chimney = new THREE.Vector3(0, 2.9, 1.35);
},
function (T, dt) {
var run = kzZooTrainRun(), t = T.clock - KZ_TRAIN.wait, s = t <= 0 ? 0 : kzZooTrainS(t), L = kzZooTrainLen();
T.s = s;
T.cars.forEach(function (cg, i) { var p = kzZooTrainAt(((s - i * 3.6) % L + L) % L); cg.position.set(p.x, T.y, p.z); cg.rotation.y = p.dir; });
if (!T.puffs) {
T.puffs = [];
var mat = new THREE.MeshLambertMaterial({ color: 0xF4F4F4, transparent: true, opacity: 0.5, depthWrite: false });
for (var k = 0; k < (KZ_LITE ? 5 : 9); k++) {
var m = new THREE.Mesh(KZ_PUFF_GEO || (KZ_PUFF_GEO = new THREE.SphereGeometry(0.5, 10, 8)), mat.clone());
m.userData.keep = 1;
m.visible = false;
KZ.zoo.G.add(m);
T.puffs.push({ m: m, t: k / 9 * 3 });
}
}
var moving = t > 0 && t < run, eng = T.cars[0], cp = eng.localToWorld(eng.userData.chimney.clone()).sub(KZ.G.position);
T.puffs.forEach(function (p) {
p.t += dt;
if (p.t > 3) {
p.t -= 3;
p.x = cp.x;
p.y = cp.y;
p.z = cp.z;
}
var u = p.t / 3;
p.m.visible = moving && p.x !== undefined;
if (!p.m.visible)
return;
p.m.position.set(p.x, p.y + u * 2.2, p.z);
p.m.scale.setScalar(0.4 + u * 1.2);
p.m.material.opacity = 0.45 * (1 - u);
});
},
function (dt) {
var T = KZ.zoo && KZ.zoo.train;
if (!T)
return;
var d = Math.min(dt, 0.05);
T.sdt += (d - T.sdt) * 0.25;
T.clock += T.sdt;
var cyc = kzZooTrainRun() + KZ_TRAIN.wait;
if (T.clock >= cyc)
T.clock -= cyc;
kzZooTrainPlace(T, T.sdt);
var L = worldLocal(), near = Math.hypot(L.x - kzZooHub().x, L.z - kzZooHub().z) < KZ_ZOO_R.gate + 60 || !!KZ.ride;
if (typeof kzaTick === "function")
kzaTick(T.sdt, near);
if (near) {
kzZooFeedTick(T.sdt);
kzZooFeedingTick(T.sdt, L);
for (var i = 0; i < KZ.zoo.walkers.length; i++)
kzZooWalkerPlace(KZ.zoo.walkers[i], T.sdt);
}
if (KZ.ride && KZ.ride.k === "train")
kzZooTrainRideTick(T.sdt);
var Q = KZ.zoo.queued;
if (Q && !KZ.ride) {
var st = KZ.zoo.station;
if (Math.hypot(L.x - st.x, L.z - st.z) > 9) {
KZ.zoo.queued = false;
}
else if (T.clock < KZ_TRAIN.wait - 1.5) {
KZ.zoo.queued = false;
kzZooTrainBoard();
}
}
},
function () {
var T = KZ.zoo && KZ.zoo.train;
if (!T || KZ.ride)
return;
worldCard(null);
if (T.clock >= KZ_TRAIN.wait - 1.5) {
var left = Math.ceil(kzZooTrainRun() + KZ_TRAIN.wait - T.clock);
KZ.zoo.queued = true;
return setStatus("🚂 The Zoo Express is on its way round. It will be back at the platform in about <b>" + left + " seconds</b>: wait here and you'll hop on.");
}
var P = camera.position, B = KZ.base;
KZ.ride = { k: "train", t: 0, from: { x: P.x - B, y: P.y, z: P.z }, yaw0: yaw, pitch0: pitch, said: {} };
T.lookFree = 0;
T.yawV = 0;
T.lastYaw = null;
if (typeof playTone === "function") {
playTone(392, 0.22);
setTimeout(function () { playTone(392, 0.4); }, 300);
}
setStatus("<b>All aboard the Zoo Express!</b> Toot toot! Once all the way round the zoo. Sit back: your seat turns you gently to each animal as you go by (look about yourself whenever you like).");
},
function (dt) {
var R = KZ.ride, T = KZ.zoo.train, P = camera.position, B = KZ.base;
R.t += dt;
var t = T.clock - KZ_TRAIN.wait, run = kzZooTrainRun(), seat = kzZooTrainSeat(T);
var gl = 2.4, k;
if (R.t < gl && !R.off) {
k = R.t / gl;
k = k * k * (3 - 2 * k);
P.set(B + R.from.x + (seat.x - R.from.x) * k, R.from.y + (seat.y - R.from.y) * k, R.from.z + (seat.z - R.from.z) * k);
}
else if (R.off) {
R.off.t += dt;
k = Math.min(1, R.off.t / gl);
k = k * k * (3 - 2 * k);
P.set(B + R.off.a.x + (R.off.b.x - R.off.a.x) * k, R.off.a.y + (R.off.b.y - R.off.a.y) * k, R.off.a.z + (R.off.b.z - R.off.a.z) * k);
WLD.hop = 0;
WLD.hv = 0;
if (k >= 1) {
KZ.ride = null;
setStatus("<b>Toot toot!</b> Back at the station. Thank you for riding the Zoo Express!");
}
return;
}
else
P.set(B + seat.x, seat.y, seat.z);
WLD.hop = 0;
WLD.hv = 0;
var xr = typeof renderer !== "undefined" && renderer.xr && renderer.xr.isPresenting;
if (T.lastYaw !== null && Math.abs(Math.atan2(Math.sin(yaw - T.lastYaw), Math.cos(yaw - T.lastYaw))) > 0.003)
T.lookFree = 5;
if (T.lookFree > 0)
T.lookFree -= dt;
else if (!xr) {
var tx = Math.sin(seat.dir), tz = Math.cos(seat.dir), best = null, bd = 1e9;
KZ.zoo.pens.forEach(function (pen) { var c = pen.c, dx = c.x - seat.x, dz = c.z - seat.z, d = Math.hypot(dx, dz), ahead = (dx * tx + dz * tz) / d; if (ahead > -0.25 && d < bd) {
bd = d;
best = pen;
} });
var want;
if (best) {
want = Math.atan2(-(best.c.x - seat.x), -(best.c.z - seat.z));
}
else
want = Math.atan2(-tx, -tz);
var err = Math.atan2(Math.sin(want - yaw), Math.cos(want - yaw));
T.yawV += (err * 0.9 - T.yawV * 1.9) * dt;
T.yawV = Math.max(-0.32, Math.min(0.32, T.yawV));
yaw += T.yawV * dt;
pitch += (-0.06 - pitch) * Math.min(1, dt * 0.8);
if (best && bd < KZ_ZOO_R.pen - KZ_ZOO_R.track + 8 && !R.said[best.i]) {
R.said[best.i] = 1;
setStatus("🚂 <b>" + esc(best.P[1]) + "</b> · " + esc(best.P[5].split(". ")[0]) + ".");
}
}
T.lastYaw = yaw;
if (t > 1)
R.ran = true;
if (R.ran && (t >= run - 0.05 || t < 0)) {
var st = KZ.zoo.station, to = kzZooAt(st.a, KZ_ZOO_R.track + 3.6);
R.off = { t: 0, a: { x: P.x - B, y: P.y, z: P.z }, b: { x: to.x, y: T.y + 0.55 + 1.72, z: to.z } };
}
},
function (cols, n, horizontal) {
return wTex(512, 256, function (x, W, H) {
for (var i = 0; i < n; i++) {
x.fillStyle = cols[i % cols.length];
if (horizontal)
x.fillRect(0, i * H / n, W, H / n + 1);
else
x.fillRect(i * W / n, 0, W / n + 1, H);
}
x.fillStyle = "rgba(255,240,180,.9)";
for (var s = 0; s < n; s++) {
var cx = (s + 0.5) * W / n;
x.beginPath();
x.arc(cx, H * 0.12, 5, 0, 7);
x.fill();
}
});
},
function (G) {
var C = kzCircusHub(), y = kzHeight(C.x, C.z), g = kzAt(G, C.x, C.z, -Math.PI / 2, y), r = KZ_TENT.r, h = KZ_TENT.h, lite = KZ_LITE;
KZ.circus = { g: g, y: y, acts: {}, inside: false, watch: null, last: -1 };
var gap = 0.3;
var wall = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 64, 1, true, gap, Math.PI * 2 - gap * 2), new THREE.MeshLambertMaterial({ map: kzStripeTex(["#D8283A", "#FFF4E0"], 24), side: THREE.DoubleSide }));
wall.position.y = h / 2;
g.add(wall);
var roof = new THREE.Mesh(new THREE.ConeGeometry(r + 1.2, 11, 64, 1, true), new THREE.MeshLambertMaterial({ map: kzStripeTex(["#D8283A", "#FFF4E0", "#F0B830", "#FFF4E0"], 32), side: THREE.DoubleSide }));
roof.position.y = h + 5.5;
g.add(roof);
for (var sc = 0; sc < 48; sc++) {
var sa = sc / 48 * Math.PI * 2, tr = wCone(0.75, 0.9, kzM(sc % 2 ? 0xF0B830 : 0x2E6AC8), Math.sin(sa) * (r + 0.9), h - 0.25, Math.cos(sa) * (r + 0.9), g, 3);
tr.rotation.x = Math.PI;
tr.rotation.y = sa;
}
wCyl(0.25, 0.25, 4, kzM(0xF0D040), 0, h + 12, 0, g, 8);
var fl = wMesh(new THREE.PlaneGeometry(2.4, 1.4), kzM(0x48A8E0, { ds: true }), 1.2, h + 13.4, 0, g);
fl.userData.keep = 1;
KZ.circus.flag = fl;
wSph(0.5, kzM(0xF0D040), 0, h + 14.2, 0, g, 12);
[[-1, 0xF070B0], [1, 0x60C058]].forEach(function (q) { wCyl(0.12, 0.12, 3, kzM(0xFFF4E0), q[0] * 14, h + 4.8, 0, g, 6); var f2 = wMesh(new THREE.PlaneGeometry(1.6, 0.9), kzM(q[1], { ds: true }), q[0] * 14 + 0.8, h + 5.9, 0, g); });
var dz = r + 0.05;
[-1, 1].forEach(function (s) { wCyl(0.3, 0.3, 4.8, kzM(0xF0B830), s * Math.sin(gap) * r, 2.4, Math.cos(gap) * r, g, 10); });
var ds = kzTwoSided(["THE STARLIGHT BIG TOP", "shows all day · free · walk right in!"], 6, 1.3, "#2E2E8A", "#FFE070");
ds.position.set(0, 5, dz + 0.4);
g.add(ds);
for (var i = 0; i < 90; i++) {
var a = i / 90 * Math.PI * 2, da = Math.atan2(Math.sin(a), Math.cos(a));
if (Math.abs(da) < gap + 0.02)
continue;
var w = kzLocal(g, Math.sin(a) * r, Math.cos(a) * r);
KZ.solids.push({ x: w.x, z: w.z, r: 0.9, h: h });
}
var fl2 = wMesh(new THREE.CircleGeometry(r - 0.1, 64), kzM(0xE8C890), 0, 0.06, 0, g);
fl2.rotation.x = -Math.PI / 2;
kzPlat({ x: C.x, z: C.z, r: r - 0.2, top: y + 0.07 });
var rf = wMesh(new THREE.CircleGeometry(7, 48), kzM(0xC8283A), 0, 0.09, 0, g);
rf.rotation.x = -Math.PI / 2;
var st = wMesh(new THREE.RingGeometry(1.5, 2.2, 48), kzM(0xF0D040), 0, 0.1, 0, g);
st.rotation.x = -Math.PI / 2;
for (var k = 0; k < 36; k++) {
var ka = k / 36 * Math.PI * 2;
wBox(1.25, 0.45, 0.5, kzM(k % 2 ? 0xFFF4E0 : 0x2E6AC8), Math.sin(ka) * 7.2, 0.3, Math.cos(ka) * 7.2, g).rotation.y = ka;
}
var aisles = [0, Math.PI / 2, Math.PI * 1.5];
for (var tier = 0; tier < 4; tier++) {
var tr2 = 10.5 + tier * 2.1, th = 0.45 + tier * 0.45, col = KZ_RAINBOW[(tier * 2) % 7][0];
var segs = Math.round(Math.PI * 2 * tr2 / 1.6);
for (var b = 0; b < segs; b++) {
var ba = b / segs * Math.PI * 2, near = aisles.some(function (al) { return Math.abs(Math.atan2(Math.sin(ba - al), Math.cos(ba - al))) < 0.16; });
if (near)
continue;
if (Math.abs(Math.atan2(Math.sin(ba - Math.PI), Math.cos(ba - Math.PI))) < 0.5)
continue;
var bx = Math.sin(ba) * tr2, bz = Math.cos(ba) * tr2;
wBox(1.62, th, 1.9, kzM(tier % 2 ? 0xFFF4E0 : col), bx, th / 2, bz, g).rotation.y = ba;
wBox(1.62, 0.1, 0.5, kzM(col), bx, th + 0.02, bz, g).rotation.y = ba;
if (b % 3 === 0) {
var bw = kzLocal(g, bx, bz);
KZ.solids.push({ x: bw.x, z: bw.z, r: 0.8, h: th });
}
}
}
for (var cu = 0; cu < 9; cu++) {
var cx = -4 + cu, cp = wBox(1, 5, 0.15, kzM(cu % 2 ? 0x9A1A2A : 0xC8283A), cx, 2.5, -r + 0.6, g);
}
wBox(9.6, 0.6, 0.3, kzM(0xF0B830), 0, 5.2, -r + 0.6, g);
[-1, 1].forEach(function (s) {
for (var p = 0; p < 8; p++)
wCyl(0.22, 0.22, 1.5, kzM(p % 2 ? 0xFFF4E0 : 0xD8283A), s * 9, 0.75 + p * 1.5, 0, g, 10);
var pw = kzLocal(g, s * 9, 0);
KZ.solids.push({ x: pw.x, z: pw.z, r: 0.5 });
wBox(1.6, 0.15, 1.6, kzM(0xF0B830), s * 8.4, 9.6, 0, g);
});
wCyl(0.12, 0.12, 18, kzM(0xF0B830), 0, 12, 0, g, 8).rotation.z = Math.PI / 2;
var net = new THREE.Mesh(new THREE.PlaneGeometry(14, 5, 14, 5), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true, transparent: true, opacity: 0.5 }));
net.rotation.x = -Math.PI / 2;
net.position.y = 2;
net.userData.keep = 1;
g.add(net);
KZ.circus.spots = [];
[0xF070B0, 0x60C0F0, 0xF0D040].forEach(function (c, i) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(2.2, 12, 20, 1, true), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide, fog: false }));
sp.geometry.translate(0, -6, 0);
var sg = new THREE.Group();
sg.position.set(0, 12.5, 0);
sg.add(sp);
sg.userData.keep = 1;
g.add(sg);
KZ.circus.spots.push({ g: sg, i: i });
});
kzCircusFolk(g);
kzRingToss(G);
kzSnackCart(G);
kzBalloons(G, C.x - r - 6, C.z + 9, 10, 5151);
kzBalloons(G, C.x - r - 6, C.z - 9, 10, 5252);
kzRoom("the Starlight Big Top", C.x, C.z, r * 0.7, r * 0.7, 0);
kzFact("circus", C.x - r - 10, C.z + 16);
},
function (g, seed, top, bottom, o) {
o = o || {};
if (typeof wPerson !== "function")
return null;
var p;
try {
p = wPerson(seed, { look: Object.assign({ top: top, bottom: bottom }, o.look || {}), child: !!o.child });
}
catch (e) {
return null;
}
p.userData.keep = 1;
g.add(p);
if (o.nose) {
wSph(0.07, kzM(0xE8202A), 0, 1.6, 0.14, p, 8);
}
if (o.cone) {
var hat = wCone(0.14, 0.42, kzM(o.cone), 0, 1.98, 0, p, 10);
wSph(0.05, kzM(0xFFFFFF), 0, 2.2, 0, p, 6);
}
if (o.tophat) {
wCyl(0.14, 0.14, 0.32, kzM(0x1A1A2A), 0, 1.98, 0, p, 12);
wCyl(0.24, 0.24, 0.03, kzM(0x1A1A2A), 0, 1.83, 0, p, 12);
wCyl(0.145, 0.145, 0.06, kzM(0xF0B830), 0, 1.88, 0, p, 12);
}
if (o.ruff) {
var rf = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.06, 6, 16), kzM(o.ruff));
rf.rotation.x = Math.PI / 2;
rf.position.y = 1.42;
p.add(rf);
}
return p;
},
function (g) {
var A = KZ.circus.acts, back = -KZ_TENT.r + 2.2;
var rmf = kzFolk("circus");
var RM = kzFolkAt(rmf, KZ.circus.g.position.x, KZ.circus.g.position.z, 0, {});
if (RM) {
RM.g.userData.keep = 1;
KZ.G.remove(RM.g);
g.add(RM.g);
RM.g.position.set(5.5, 0.07, 6.5);
RM.g.rotation.y = Math.PI * 0.75;
wCyl(0.15, 0.15, 0.36, kzM(0xF0B830), 0, 2.0, 0, RM.g, 12);
wCyl(0.25, 0.25, 0.03, kzM(0xF0B830), 0, 1.83, 0, RM.g, 12);
A.rm = RM;
A.rmHome = { x: 5.5, z: 6.5 };
RM.worldPos = true;
}
A.tra = [kzPerformer(g, "kz_trapA", 0x48A8E8, 0x48A8E8, { look: { sex: "f" } }), kzPerformer(g, "kz_trapB", 0xF070B0, 0xF070B0, { look: { sex: "m" } })];
A.bars = [-1, 1].map(function (s) {
var pv = new THREE.Group();
pv.position.set(s * 4, 11.6, 0);
pv.userData.keep = 1;
g.add(pv);
[-0.5, 0.5].forEach(function (z) { wCyl(0.02, 0.02, 3, kzM(0xFFF4E0), 0, -1.5, z, pv, 4); });
wCyl(0.04, 0.04, 1.1, kzM(0xF0B830), 0, -3, 0, pv, 6).rotation.x = Math.PI / 2;
return pv;
});
A.jug = kzPerformer(g, "kz_jug", 0xF0D040, 0x9A5AD0, { cone: 0x9A5AD0, ruff: 0xFFFFFF });
A.ball = new THREE.Group();
A.ball.userData.keep = 1;
g.add(A.ball);
var bm = new THREE.Mesh(new THREE.SphereGeometry(0.8, 20, 14), new THREE.MeshLambertMaterial({ map: kzStripeTex(["#E8404A", "#F0D040", "#48A8E0", "#60C058"], 8) }));
A.ball.add(bm);
A.jballs = [];
for (var j = 0; j < 5; j++) {
var jb = wSph(0.12, kzM(KZ_RAINBOW[j][0]), 0, 0, 0, g, 10);
jb.userData.keep = 1;
A.jballs.push(jb);
}
A.uni = new THREE.Group();
A.uni.userData.keep = 1;
g.add(A.uni);
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.07, 8, 24), kzM(0x2A2A3A));
wh.position.y = 0.45;
A.uni.add(wh);
A.uniWheel = wh;
wCyl(0.03, 0.03, 0.6, kzM(0xC8C8D0), 0, 0.95, 0, A.uni, 6);
wBox(0.3, 0.06, 0.12, kzM(0xE8404A), 0, 1.25, 0, A.uni);
var up = kzPerformer(A.uni, "kz_uni", 0x60C058, 0xF0D040, { cone: 0xE8404A });
if (up) {
up.position.y = 0.55;
up.scale.setScalar(0.92);
}
A.clowns = [[0xF07AA8, 0x48A8E8, 0xF0D040], [0xF0D040, 0x60C058, 0x48A8E8], [0x9A5AD0, 0xF0A030, 0xF07AA8]].map(function (c, i) { return kzPerformer(g, "kz_clown" + i, c[0], c[1], { nose: 1, cone: c[2], ruff: 0xFFFFFF }); });
A.car = new THREE.Group();
A.car.userData.keep = 1;
g.add(A.car);
wBox(1.3, 0.6, 2, kzM(0xF0D040), 0, 0.6, 0, A.car);
wBox(1.1, 0.55, 1, kzM(0x48A8E8), 0, 1.15, -0.2, A.car);
wSph(0.18, kzM(0xFFFFFF, { e: 0xFFFFFF, ei: 0.2 }), 0, 0.7, 1.02, A.car, 8);
[-0.6, 0.6].forEach(function (wx) { [-0.65, 0.65].forEach(function (wz) { var ww = wCyl(0.28, 0.28, 0.18, kzM(0xE8404A), wx, 0.28, wz, A.car, 12); ww.rotation.z = Math.PI / 2; }); });
A.stilt = new THREE.Group();
A.stilt.userData.keep = 1;
g.add(A.stilt);
[-0.12, 0.12].forEach(function (x) { wCyl(0.05, 0.05, 1.8, kzM(0xF0B830), x, 0.9, 0, A.stilt, 6); });
var sp2 = kzPerformer(A.stilt, "kz_stilt", 0x2E6AC8, 0xF0F0F8, { tophat: 1 });
if (sp2)
sp2.position.y = 1.8;
A.back = back;
kzCircusPose(-1);
},
function (act, u, s) {
var A = KZ.circus && KZ.circus.acts;
if (!A)
return;
var back = A.back, t = KZ.t;
function wait(o, x) { if (!o)
return; o.position.set(x, 0.07, back); o.rotation.set(0, 0, 0); }
var on = function (k) { return act === k || act === 4; };
var sw = act === 1 ? Math.sin(s * 1.9) * 0.75 : 0;
A.bars.forEach(function (b, i) { b.rotation.z = i ? -sw : sw; });
if (act === 1) {
var flyT = (s % 5) / 5, who = Math.floor(s / 5) % 2, fly = flyT > 0.55 && flyT < 0.85;
A.tra.forEach(function (p, i) {
if (!p)
return;
var bar = A.bars[i], ang = bar.rotation.z, hx = bar.position.x + Math.sin(ang) * 3, hy = bar.position.y - Math.cos(ang) * 3 - 1.95;
if (fly && i === who) {
var k = (flyT - 0.55) / 0.3, from = A.bars[i].position.x, to = A.bars[1 - i].position.x;
p.position.set(from + (to - from) * k, 9 + Math.sin(k * Math.PI) * 1.6 - 1.2, 0);
p.rotation.set(k * Math.PI * 2, 0, 0);
}
else {
p.position.set(hx, hy, 0);
p.rotation.set(0, Math.PI / 2, ang);
}
});
}
else if (act === 4) {
A.tra.forEach(function (p, i) { if (p) {
p.position.set(-5 + i * 2, 0.07, -2);
p.rotation.set(0, 0, 0);
} });
}
else
A.tra.forEach(function (p, i) { wait(p, -3.5 + i); });
if (act === 2) {
A.ball.position.set(0, 0.8, 0);
A.ball.rotation.x = s * 0.6;
if (A.jug) {
A.jug.position.set(0, 1.55, 0);
A.jug.rotation.set(0, Math.sin(s * 0.7) * 0.4, 0);
}
A.jballs.forEach(function (b, i) { var ph = (s * 1.7 + i / 5) % 1, side = (Math.floor(s * 1.7 + i / 5) % 2) ? 1 : -1; b.visible = true; b.position.set(side * (0.35 - ph * 0.7), 3.4 + Math.sin(ph * Math.PI) * 1.5, 0.3); });
var ua = s * 0.55;
A.uni.position.set(Math.sin(ua) * 5.2, 0.07, Math.cos(ua) * 5.2);
A.uni.rotation.y = ua + Math.PI / 2;
A.uniWheel.rotation.z = -s * 4;
}
else {
A.ball.position.set(-1.5, 0.8, back - 1);
A.jballs.forEach(function (b) { b.visible = false; });
if (act === 4) {
if (A.jug) {
A.jug.position.set(-1, 0.07, -2);
A.jug.rotation.set(0, 0, 0);
}
A.uni.position.set(1, 0.07, -2);
A.uni.rotation.y = 0;
}
else {
wait(A.jug, -0.5);
A.uni.position.set(0.8, 0.07, back);
A.uni.rotation.y = 0;
}
}
if (act === 3) {
var ca = Math.min(s, 6) * 0.7, stop = s > 6;
A.car.position.set(Math.sin(ca) * 4, 0.07, Math.cos(ca) * 4);
A.car.rotation.y = ca + Math.PI / 2;
A.clowns.forEach(function (p, i) {
if (!p)
return;
if (!stop) {
p.visible = false;
return;
}
p.visible = true;
var k = Math.min(1, (s - 6 - i * 0.8) / 1.2);
if (k < 0) {
p.visible = false;
return;
}
var a = ca + 1.6 + i * 1.4, d = 1.2 + k * 2.4, hop = Math.abs(Math.sin(t * 4 + i)) * 0.5;
p.position.set(A.car.position.x + Math.sin(a) * d, 0.07 + hop, A.car.position.z + Math.cos(a) * d);
p.rotation.set(0, a, (s > 11 && i === 1) ? ((s - 11) * 5) % (Math.PI * 2) : 0);
});
}
else {
A.car.position.set(3.2, 0.07, back - 0.5);
A.car.rotation.y = 0;
A.clowns.forEach(function (p, i) { if (!p)
return; p.visible = true; if (act === 4) {
p.position.set(3 + i * 1.2, 0.07, -2);
p.rotation.set(0, 0, 0);
}
else
wait(p, 2 + i * 0.9); });
}
if (act === 4 || act === 0) {
var pa = (act === 4 ? s : t) * 0.35;
A.stilt.position.set(Math.sin(pa) * 6, 0.07, Math.cos(pa) * 6);
A.stilt.rotation.y = pa + Math.PI / 2;
}
else {
A.stilt.position.set(-2.4, 0.07, back);
A.stilt.rotation.y = 0;
}
if (A.rm) {
if (act >= 0 && act < 5) {
A.rm.g.position.set(act === 2 ? 2.5 : 0, 0.07, act === 1 ? 2.5 : 0);
A.rm.g.rotation.y = Math.sin(t * 0.3) * 0.8;
}
else {
A.rm.g.position.set(A.rmHome.x, 0.07, A.rmHome.z);
A.rm.g.rotation.y = Math.PI * 0.75;
}
}
if (act === 4) {
var bow = Math.max(0, Math.sin(s * 1.4)) * 0.5;
A.clowns.concat([A.jug]).concat(A.tra).forEach(function (p) { if (p)
p.rotation.x = bow; });
}
},
function (dt, L) {
var CC = KZ.circus;
if (!CC)
return;
var C = kzCircusHub(), dist = Math.hypot(L.x - C.x, L.z - C.z), near = dist < 90, inside = dist < KZ_TENT.r - 0.5;
var sh = kzShowAt(Date.now() / 1000);
if (CC.flag)
CC.flag.rotation.y = Math.sin(KZ.t * 1.3) * 0.25;
if (near) {
kzCircusPose(sh.i, sh.u, sh.s - sh.a[0]);
CC.spots.forEach(function (S, i) { S.g.rotation.set(Math.sin(KZ.t * 0.35 + i * 2) * 0.38, 0, Math.cos(KZ.t * 0.3 + i * 2.4) * 0.38); S.g.visible = sh.i < 5; });
if (CC.acts.rm && CC.acts.rm.g) { }
}
if (inside && sh.i !== CC.last) {
CC.last = sh.i;
setStatus(sh.a[3]);
if (typeof playTone === "function") {
var f = [523, 659, 784, 1047];
f.forEach(function (q, k) { setTimeout(function () { playTone(q, 0.18); }, k * 140); });
}
if (sh.i === 4)
setTimeout(function () { if (KZ.circus && KZ.circus.inside)
kzConfetti(); }, 1200);
}
if (!inside)
CC.last = -1;
if (inside && !CC.inside) {
CC.watch = sh.i === 0 && sh.u < 0.5 ? sh.n : null;
}
if (inside && CC.watch === null && sh.i === 0 && sh.u < 0.5)
CC.watch = sh.n;
if (!inside)
CC.watch = null;
if (inside && CC.watch !== null && sh.n === CC.watch && sh.i === 4 && sh.u > 0.85) {
CC.watch = -99;
if (!kzStickers().circus)
kzWin("circus", "<b>Bravo!</b> You watched the whole show at the Starlight Big Top.");
}
CC.inside = inside;
if (inside && CC.watch === null && !CC.toldWait && sh.i > 0 && sh.i < 5) {
CC.toldWait = true;
setTimeout(function () { if (KZ.circus)
KZ.circus.toldWait = false; }, 30000);
}
kzTossTick(dt);
},
function (G) {
var C = kzCircusHub(), x = C.x - KZ_TENT.r - 12, z = C.z - 16, g = kzAt(G, x, z, Math.PI / 2);
for (var q = 0; q < 4; q++)
wCyl(0.1, 0.1, 3.2, kzM(0xFFF4E0), (q % 2 ? 3 : -3), 1.6, (q < 2 ? 1.2 : -2.6), g, 6);
var aw = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.25, 4.2), new THREE.MeshLambertMaterial({ map: kzStripeTex(["#48A8E0", "#FFF4E0"], 10) }));
aw.position.set(0, 3.3, -0.7);
g.add(aw);
wBox(6, 1, 0.6, kzM(0xE8404A), 0, 0.5, 1.2, g);
var board = wBox(6, 0.2, 3, kzM(0xF0D040), 0, 0.7, -1.4, g);
board.rotation.x = 0.3;
var pegs = [];
for (var p = 0; p < 5; p++) {
var px = -2.4 + p * 1.2, peg = wCyl(0.08, 0.08, 0.6, kzM(KZ_RAINBOW[p][0]), px, 1.15, -1.4, g, 8);
pegs.push(px);
}
var sg = kzTwoSided(["RING TOSS", "land 3 of 5 · press E"], 3, 0.7, "#E8404A", "#FFF8E0");
sg.position.set(0, 3.9, 1.2);
g.add(sg);
var hoop = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 8, 24), kzGlowM(0xF070B0, 0.4));
hoop.rotation.x = Math.PI / 2 - 0.3;
hoop.position.set(0, 1.55, -1.4);
hoop.userData.keep = 1;
g.add(hoop);
var fly = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 8, 24), kzM(0x60C058));
fly.visible = false;
fly.userData.keep = 1;
g.add(fly);
kzSolidIn(g, 0, 0.2, 3.1, 1.6, 1);
KZ.toss = { g: g, pegs: pegs, hoop: hoop, fly: fly, t: 0, on: null, landed: [] };
var w = kzLocal(g, 0, 2.6);
KZ.toss.spot = kzSpot(w.x, w.z, 3.2, "The Ring Toss", "play (3 of 5 to win)", kzToss);
},
function () {
var T = KZ.toss;
if (!T)
return;
if (!T.on) {
if (KZ.game && KZ.game.k !== "toss")
return kzSayGame();
T.on = { left: 5, hits: 0, throwing: 0 };
KZ.game = { k: "toss", t: 120 };
T.spot.verb = "throw a ring";
T.landed.forEach(function (m) { T.g.remove(m); });
T.landed = [];
return setStatus("<b>Ring Toss!</b> The pink hoop slides over the pegs. Press E when it's right over a peg to throw. Land three of five!");
}
if (T.on.throwing > 0 || T.on.left <= 0)
return;
T.on.left--;
T.on.throwing = 0.6;
T.on.aim = T.hoop.position.x;
T.fly.visible = true;
T.fly.position.set(0, 1.6, 1.6);
},
function (dt) {
var T = KZ.toss;
if (!T)
return;
T.t += dt;
var sp = T.on ? 1.6 + ((5 - T.on.left) * 0.25) : 0.9;
T.hoop.position.x = Math.sin(T.t * sp) * 2.8;
if (!T.on)
return;
if (KZ.game && KZ.game.k === "toss" && KZ.game.t <= 0) {
T.on = null;
T.spot.verb = "play (3 of 5 to win)";
KZ.game = null;
T.fly.visible = false;
return setStatus("The Ring Toss timed out. Press E at the booth to play again.");
}
if (T.on.throwing > 0) {
T.on.throwing -= dt;
var k = 1 - T.on.throwing / 0.6;
T.fly.position.set(T.on.aim * k, 1.6 + Math.sin(k * Math.PI) * 1.2 - k * 0.4, 1.6 - k * 3);
T.fly.rotation.x = Math.PI / 2 - 0.3;
if (T.on.throwing <= 0) {
T.fly.visible = false;
var best = null, bd = 9;
T.pegs.forEach(function (px) { var d = Math.abs(px - T.on.aim); if (d < bd) {
bd = d;
best = px;
} });
var hit = bd < 0.3, ring = new THREE.Mesh(T.fly.geometry, kzM(hit ? 0x60C058 : 0xA8A8B8));
ring.rotation.x = Math.PI / 2 - 0.3;
ring.position.set(hit ? best : T.on.aim, hit ? 1.05 : 0.85, hit ? -1.4 : -0.6);
ring.userData.keep = 1;
T.g.add(ring);
T.landed.push(ring);
if (hit) {
T.on.hits++;
if (typeof playTone === "function")
playTone(880, 0.2);
}
else if (typeof playTone === "function")
playTone(260, 0.2);
var msg = (hit ? "<b>Ringer!</b> " : "Missed! ") + T.on.hits + " landed, " + T.on.left + " to throw.";
if (T.on.hits >= 3) {
T.on = null;
T.spot.verb = "play (3 of 5 to win)";
KZ.game = null;
return kzWin("ringtoss", "<b>Three ringers!</b> You're a Ring Toss champ!");
}
if (T.on.left <= 0) {
T.on = null;
T.spot.verb = "play (3 of 5 to win)";
KZ.game = null;
return setStatus(msg + " So close! Press E to play again.");
}
setStatus(msg);
}
}
},
function (G) {
var C = kzCircusHub(), x = C.x - KZ_TENT.r - 10, z = C.z + 18, g = kzAt(G, x, z, Math.PI / 2);
wBox(2.6, 1.1, 1.4, kzM(0xF070B0), 0, 0.85, 0, g);
[-1, 1].forEach(function (s) { var wh = wCyl(0.35, 0.35, 0.12, kzM(0xF0D040), s * 1, 0.35, 0.75, g, 12); wh.rotation.x = Math.PI / 2; });
for (var q = 0; q < 4; q++)
wCyl(0.05, 0.05, 1.6, kzM(0xFFF4E0), (q % 2 ? 1.2 : -1.2), 2.2, (q < 2 ? 0.6 : -0.6), g, 5);
var aw = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 1.8), new THREE.MeshLambertMaterial({ map: kzStripeTex(["#F070B0", "#FFF4E0"], 10) }));
aw.position.set(0, 3.05, 0);
g.add(aw);
wSph(0.45, kzM(0xF8C8E8), -0.7, 1.9, 0, g, 10);
wCyl(0.2, 0.25, 0.6, kzM(0xE8404A), 0.6, 1.7, 0, g, 10);
wSph(0.25, kzM(0xFFF4C0), 0.6, 2.05, 0, g, 10);
var sg = kzTwoSided(["POPCORN · CANDY FLOSS · PINK LEMONADE", "free treats · press E"], 3, 0.6, "#2E2E8A", "#FFE070");
sg.position.set(0, 3.5, 0.9);
g.add(sg);
kzSolidIn(g, 0, 0, 1.4, 0.8, 1.4);
if (typeof wPerson === "function")
try {
var sv = kzPerformer(KZ.G, "kz_popcorn", 0xE8404A, 0xFFF4E0, { cone: 0xF0D040 });
if (sv) {
var sp = kzLocal(g, 0, -1.4);
sv.position.set(sp.x, kzHeight(sp.x, sp.z), sp.z);
sv.rotation.y = Math.PI / 2;
}
}
catch (e) { }
var w = kzLocal(g, 0, 1.9);
kzSpot(w.x, w.z, 3, "The snack cart", "choose a treat", function () { kzSnackCard(); });
},
function (msg) {
var st = (KZ.st && KZ.st.today) || {}, cap = (KZ.rule && KZ.rule.treats_per_day) || 3, left = Math.max(0, cap - (st.treats || 0));
var h = "<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>🍿 The Big Top snack cart</div>" + kzLine("Free treats, " + cap + " a day each (the same as the Tuckshop). " + (kzSigned() ? "You can choose <b>" + left + "</b> more today." : "Sign in to take treats.")) + (msg ? "<div style='color:#FFE7B0;margin:4px 0'>" + msg + "</div>" : ""), fns = {};
KZ_SNACKS.forEach(function (k) { var I = KZ_ITEM[k]; h += worldBtn("t" + k, I.e + " " + esc(I.n), esc(I.note) + (I.fd ? " Food +" + I.fd : "") + (I.dr ? " Drink +" + I.dr : "")); fns["t" + k] = function () { kzTreat(k, kzSnackCard); }; });
worldCard(h, fns);
},
function (G, x, z, n, seed) {
var R = wRand(seed || 1), y = kzHeight(x, z);
kzI("stalk", x, y, z, 0.12, 1.2, 0.12, 0, 0xFFF4E0);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = 0.4 + R() * 1.1, h = 3.2 + R() * 1.8, bx = x + Math.cos(a) * d, bz = z + Math.sin(a) * d;
kzI("ball", bx, y + h, bz, 0.62, 0.78, 0.62, 0, KZ_PETALS.concat([0xF05060, 0x50C0F0, 0xF0D040])[i % 10]);
var len = h - 1.3, sx = (bx - x), sz = (bz - z), tilt = Math.atan2(Math.hypot(sx, sz), len);
kzI("stalk", x + sx * 0.5, y + 1.2, z + sz * 0.5, 0.015, len, 0.015, Math.atan2(sx, sz), 0xFFFFFF, 0);
}
},
function (G) {
var R = wRand(2468), step = KZ_LITE ? 30 : 18, cols = [0xE8404A, 0xF0A030, 0xF0D040, 0x60C058, 0x48A8E0, 0x9A5AD0, 0xF070B0];
function free(x, z) { return !worldSolidAt(KZ.solids, x, z, 0) && !KZ_SITES.some(function (s) { return Math.hypot(x - s[1], z - s[2]) < s[3] * 0.75; }); }
KZ_PATHS.forEach(function (p, pi) {
if (p.length > 12)
return;
var pts = [], acc = 0;
for (var i = 1; i < p.length; i++) {
var a = p[i - 1], b = p[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var d = (i === 1 ? step * 0.5 : 0); d < L; d += step) {
var k = d / L;
pts.push({ x: a[0] + (b[0] - a[0]) * k, z: a[1] + (b[1] - a[1]) * k, nx: -(b[1] - a[1]) / L, nz: (b[0] - a[0]) / L });
}
}
var prev = null;
pts.forEach(function (q, j) {
var side = j % 2 ? 1 : -1, px = q.x + q.nx * 3.6 * side, pz = q.z + q.nz * 3.6 * side;
if (!free(px, pz)) {
prev = null;
return;
}
var py = kzHeight(px, pz);
kzI("stalk", px, py, pz, 0.14, 4, 0.14, 0, 0xFFF4E0);
kzI("ball", px, py + 4.1, pz, 0.3, 0.3, 0.3, 0, cols[j % 7]);
KZ.solids.push({ x: px, z: pz, r: 0.3 });
if (prev) {
var dx = px - prev.x, dz = pz - prev.z, dy = (py + 3.9) - (prev.y + 3.9), L2 = Math.hypot(dx, dz), n = Math.max(4, Math.round(L2 / 1.0)), ry = Math.atan2(dz, dx);
for (var f = 1; f < n; f++) {
var t = f / n, sag = Math.sin(t * Math.PI) * 1.1, fx = prev.x + dx * t, fz = prev.z + dz * t, fy = prev.y + 3.9 + dy * t - sag;
kzI("flag", fx, fy, fz, 0.3, 0.4, 0.04, -ry, cols[(f + pi) % 7], Math.PI);
}
}
prev = { x: px, z: pz, y: py };
});
});
KZ_SITES.forEach(function (s, i) { if (s[0] === "zoo" || s[0] === "circus" || s[0] === "door")
return; var a = i * 1.7, bx = s[1] + Math.cos(a) * (s[3] + 2), bz = s[2] + Math.sin(a) * (s[3] + 2); if (free(bx, bz))
kzBalloons(G, bx, bz, KZ_LITE ? 5 : 8, 900 + i); });
},
function (title, html, onClose) {
if (!KZP.el) {
var el = document.createElement("div");
el.id = "kz-panel";
el.style.cssText = "position:fixed;inset:0;z-index:60;display:none;background:linear-gradient(160deg,#FFE8F4,#E8F0FF 55%,#F0FFE8);color:#3A2A5A;font:15px/1.45 system-ui,sans-serif;overflow:auto;-webkit-overflow-scrolling:touch";
el.innerHTML = "<div style='position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(255,255,255,.88);border-bottom:3px solid #F07AA8'>" +
"<div id='kz-panel-t' style='flex:1;font:700 19px Georgia,serif;color:#7A2E8A'></div>" +
"<button id='kz-panel-x' aria-label='Close' style='font:700 18px system-ui;border:0;background:#F07AA8;color:#fff;border-radius:50%;width:40px;height:40px;cursor:pointer'>✕</button></div>" +
"<div id='kz-panel-b' style='padding:12px 14px 40px;max-width:1100px;margin:0 auto'></div>";
document.body.appendChild(el);
KZP.el = el;
KZP.body = el.querySelector("#kz-panel-b");
KZP.title = el.querySelector("#kz-panel-t");
el.querySelector("#kz-panel-x").onclick = function () { kzPanelClose(); };
addEventListener("keydown", function (e) { if (!KZP.open)
return; if (e.key === "Escape") {
e.preventDefault();
kzPanelClose();
} e.stopImmediatePropagation(); }, true);
addEventListener("keyup", function (e) { if (KZP.open)
e.stopImmediatePropagation(); }, true);
}
KZP.title.textContent = title;
KZP.body.innerHTML = html;
KZP.el.style.display = "block";
KZP.open = true;
KZP.onClose = onClose || null;
if (typeof keys !== "undefined" && keys)
Object.keys(keys).forEach(function (k) { keys[k] = false; });
if (document.exitPointerLock)
document.exitPointerLock();
worldCard(null);
return KZP.body;
},
function (id, label, sub, col, big) { return "<button data-kz='" + id + "' style='display:inline-block;margin:6px;padding:12px 16px;min-width:" + (big ? 120 : 150) + "px;border:0;border-radius:16px;background:" + (col || "#9A5AD0") + ";color:#fff;font:700 " + (big ? "30px" : "15px") + " system-ui;cursor:pointer;box-shadow:0 3px 0 rgba(0,0,0,.15)'>" + label + (sub ? "<div style='font:500 12px system-ui;opacity:.9'>" + sub + "</div>" : "") + "</button>"; },
function (c) {
c.ellipse(512, 330, 330, 170, 0, Math.PI, 0);
c.closePath();
kzS(c);
[[400, 250, 34], [560, 220, 40], [680, 290, 28], [300, 300, 26], [480, 170, 22]].forEach(function (d) { c.beginPath(); c.arc(d[0], d[1], d[2], 0, 7); kzS(c); });
c.beginPath();
c.moveTo(372, 330);
c.lineTo(352, 690);
c.lineTo(672, 690);
c.lineTo(652, 330);
kzS(c);
for (var i = 1; i < 5; i++) {
c.beginPath();
c.moveTo(372 - i * 4, 330 + i * 72);
c.lineTo(652 + i * 4, 330 + i * 72);
kzS(c);
}
c.beginPath();
c.arc(512, 600, 70, Math.PI, 0);
c.lineTo(582, 690);
c.lineTo(442, 690);
c.closePath();
kzS(c);
c.beginPath();
c.arc(560, 630, 8, 0, 7);
kzS(c);
c.beginPath();
c.moveTo(0, 690);
c.lineTo(1024, 690);
kzS(c);
c.beginPath();
c.arc(880, 110, 60, 0, 7);
kzS(c);
for (var g = 0; g < 14; g++) {
c.beginPath();
c.moveTo(40 + g * 70, 690);
c.lineTo(60 + g * 70, 650);
c.lineTo(80 + g * 70, 690);
kzS(c);
}
},
function (c) {
c.beginPath();
c.ellipse(480, 430, 190, 110, 0, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(700, 280, 90, 70, -0.5, 0, 7);
kzS(c);
c.beginPath();
c.moveTo(620, 340);
c.lineTo(600, 400);
c.lineTo(650, 420);
c.lineTo(690, 345);
kzS(c);
c.beginPath();
c.moveTo(730, 220);
c.lineTo(770, 90);
c.lineTo(760, 230);
kzS(c);
[[360, 520], [430, 530], [530, 530], [600, 515]].forEach(function (l) { c.beginPath(); c.rect(l[0] - 18, l[1], 36, 150); kzS(c); c.beginPath(); c.rect(l[0] - 22, l[1] + 150, 44, 26); kzS(c); });
for (var m = 0; m < 5; m++) {
c.beginPath();
c.arc(650 - m * 26, 230 + m * 24, 26, 0, 7);
kzS(c);
}
c.beginPath();
c.moveTo(292, 410);
c.quadraticCurveTo(200, 380, 190, 520);
c.quadraticCurveTo(260, 470, 300, 460);
kzS(c);
c.beginPath();
c.arc(730, 265, 10, 0, 7);
kzS(c);
kzStar(c, 150, 130, 60);
kzStar(c, 900, 420, 40);
kzStar(c, 280, 180, 30);
c.beginPath();
c.moveTo(0, 706);
c.lineTo(1024, 706);
kzS(c);
},
function (c) {
c.beginPath();
c.moveTo(512, 60);
c.lineTo(900, 250);
c.lineTo(124, 250);
c.closePath();
kzS(c);
for (var i = 0; i < 8; i++) {
c.beginPath();
c.arc(172 + i * 97, 250, 48, 0, Math.PI);
kzS(c);
}
for (var k = 0; k < 4; k++) {
c.beginPath();
c.moveTo(512, 60);
c.lineTo(250 + k * 175, 250);
kzS(c);
}
[220, 512, 804].forEach(function (x) { c.beginPath(); c.rect(x - 8, 298, 16, 330); kzS(c); });
c.beginPath();
c.rect(100, 628, 824, 50);
kzS(c);
c.beginPath();
c.rect(80, 678, 864, 30);
kzS(c);
c.beginPath();
c.ellipse(512, 470, 110, 55, 0, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(640, 410, 50, 40, -0.4, 0, 7);
kzS(c);
[450, 490, 540, 580].forEach(function (x) { c.beginPath(); c.rect(x - 10, 515, 20, 80); kzS(c); });
c.beginPath();
c.ellipse(512, 430, 40, 16, 0, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(220, 520, 60, 32, 0, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(804, 520, 60, 32, 0, 0, 7);
kzS(c);
c.beginPath();
c.arc(512, 48, 18, 0, 7);
kzS(c);
},
function (c) {
c.beginPath();
c.moveTo(450, 720);
c.lineTo(470, 330);
c.lineTo(560, 330);
c.lineTo(580, 720);
kzS(c);
c.beginPath();
c.rect(250, 300, 520, 40);
kzS(c);
for (var r = 0; r < 9; r++) {
c.beginPath();
c.rect(262 + r * 60, 250, 10, 50);
kzS(c);
}
c.beginPath();
c.moveTo(255, 250);
c.lineTo(775, 250);
kzS(c);
c.beginPath();
c.rect(300, 160, 140, 90);
kzS(c);
c.beginPath();
c.moveTo(285, 160);
c.lineTo(370, 90);
c.lineTo(455, 160);
c.closePath();
kzS(c);
c.beginPath();
c.arc(370, 205, 24, 0, 7);
kzS(c);
[[380, 90, 120], [620, 70, 140], [820, 150, 110], [200, 170, 100], [520, 20, 110]].forEach(function (q) { c.beginPath(); c.arc(q[0], q[1], q[2], 0, 7); kzS(c); });
c.beginPath();
c.moveTo(770, 320);
c.bezierCurveTo(900, 380, 960, 560, 1000, 700);
c.lineTo(940, 700);
c.bezierCurveTo(900, 580, 850, 420, 760, 360);
kzS(c);
c.beginPath();
c.moveTo(0, 720);
c.lineTo(1024, 720);
kzS(c);
c.beginPath();
c.rect(600, 330, 12, 390);
kzS(c);
for (var l = 0; l < 7; l++) {
c.beginPath();
c.rect(588, 360 + l * 50, 36, 8);
kzS(c);
}
},
function (c) {
[[180, 1.0], [400, 1.25], [640, 0.9], [860, 1.1]].forEach(function (m) {
var x = m[0], s = m[1], top = 640 - 260 * s;
c.beginPath();
c.moveTo(x - 30 * s, 640);
c.lineTo(x - 24 * s, top + 60 * s);
c.lineTo(x + 24 * s, top + 60 * s);
c.lineTo(x + 30 * s, 640);
kzS(c);
c.beginPath();
c.ellipse(x, top + 60 * s, 110 * s, 90 * s, 0, Math.PI, 0);
c.closePath();
kzS(c);
c.beginPath();
c.arc(x - 40 * s, top + 20 * s, 16 * s, 0, 7);
kzS(c);
c.beginPath();
c.arc(x + 30 * s, top, 20 * s, 0, 7);
kzS(c);
});
kzNote(c, 280, 140);
kzNote(c, 520, 110);
kzNote(c, 760, 160);
kzNote(c, 960, 90);
c.beginPath();
c.moveTo(0, 640);
c.lineTo(1024, 640);
kzS(c);
c.beginPath();
c.rect(0, 640, 1024, 90);
kzS(c);
},
function (c) {
c.beginPath();
c.arc(380, 330, 110, Math.PI * 0.6, Math.PI * 1.6);
c.arc(520, 240, 140, Math.PI * 1.1, Math.PI * 1.95);
c.arc(680, 320, 120, Math.PI * 1.4, Math.PI * 0.35);
c.lineTo(380, 440);
c.closePath();
kzS(c);
c.beginPath();
c.arc(470, 320, 14, 0, 7);
kzS(c);
c.beginPath();
c.arc(580, 320, 14, 0, 7);
kzS(c);
c.beginPath();
c.arc(525, 360, 40, 0.1, Math.PI - 0.1);
kzS(c);
c.beginPath();
c.arc(420, 360, 22, 0, 7);
kzS(c);
c.beginPath();
c.arc(630, 360, 22, 0, 7);
kzS(c);
[[420, 520], [520, 560], [620, 520], [470, 640], [580, 650]].forEach(function (d) { c.beginPath(); c.moveTo(d[0], d[1] - 30); c.quadraticCurveTo(d[0] + 22, d[1] + 10, d[0], d[1] + 18); c.quadraticCurveTo(d[0] - 22, d[1] + 10, d[0], d[1] - 30); kzS(c); });
for (var b = 0; b < 4; b++) {
c.beginPath();
c.arc(150, 700, 120 - b * 30, Math.PI, 0);
kzS(c);
}
c.beginPath();
c.arc(900, 110, 70, 0, 7);
kzS(c);
},
function (c) {
[[200, 200, 90], [420, 130, 60], [600, 250, 110], [820, 160, 70], [330, 420, 70], [760, 430, 90], [540, 500, 50], [150, 520, 45], [920, 330, 40]].forEach(function (b) { c.beginPath(); c.arc(b[0], b[1], b[2], 0, 7); kzS(c); c.beginPath(); c.arc(b[0] - b[2] * 0.4, b[1] - b[2] * 0.4, b[2] * 0.18, 0, 7); kzS(c); });
c.beginPath();
c.arc(130, 620, 55, 0, 7);
kzS(c);
c.beginPath();
c.arc(130, 620, 38, 0, 7);
kzS(c);
c.beginPath();
c.rect(122, 675, 16, 60);
kzS(c);
for (var f = 0; f < 4; f++) {
var x = 320 + f * 180;
c.beginPath();
c.rect(x - 5, 650, 10, 80);
kzS(c);
for (var p = 0; p < 6; p++) {
var a = p / 6 * 6.283;
c.beginPath();
c.arc(x + Math.cos(a) * 28, 630 + Math.sin(a) * 28, 18, 0, 7);
kzS(c);
}
c.beginPath();
c.arc(x, 630, 16, 0, 7);
kzS(c);
}
c.beginPath();
c.moveTo(0, 730);
c.lineTo(1024, 730);
kzS(c);
},
function (c) {
c.beginPath();
c.ellipse(512, 600, 380, 110, 0, 0.15, Math.PI * 2 - 0.15);
c.lineTo(512, 600);
c.closePath();
kzS(c);
c.beginPath();
c.ellipse(512, 460, 170, 120, 0, 0, 7);
kzS(c);
c.beginPath();
c.arc(430, 340, 55, 0, 7);
kzS(c);
c.beginPath();
c.arc(594, 340, 55, 0, 7);
kzS(c);
c.beginPath();
c.arc(430, 340, 22, 0, 7);
kzS(c);
c.beginPath();
c.arc(594, 340, 22, 0, 7);
kzS(c);
c.beginPath();
c.arc(512, 450, 80, 0.2, Math.PI - 0.2);
kzS(c);
c.beginPath();
c.ellipse(380, 560, 70, 30, 0.2, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(644, 560, 70, 30, -0.2, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(512, 510, 70, 40, 0, 0, 7);
kzS(c);
for (var k = 0; k < 6; k++) {
c.beginPath();
c.ellipse(850, 200, 30, 80, k / 6 * Math.PI, 0, 7);
kzS(c);
}
c.beginPath();
c.arc(850, 200, 28, 0, 7);
kzS(c);
c.beginPath();
c.moveTo(0, 700);
c.quadraticCurveTo(256, 670, 512, 700);
c.quadraticCurveTo(768, 730, 1024, 700);
kzS(c);
},
function (c) {
c.beginPath();
c.moveTo(0, 720);
c.quadraticCurveTo(512, 380, 1024, 720);
kzS(c);
for (var i = 0; i < 7; i++) {
var x = 170 + i * 114, y = 720 - ((Math.sin(i / 6 * Math.PI)) * 230) - 120;
c.beginPath();
c.rect(x - 4, y, 8, 140);
kzS(c);
c.beginPath();
c.ellipse(x, y - 34, 26, 36, 0, 0, 7);
kzS(c);
c.beginPath();
c.rect(x - 18, y - 80, 36, 12);
kzS(c);
}
c.beginPath();
c.arc(860, 120, 70, Math.PI * 0.3, Math.PI * 1.7);
c.arc(890, 110, 56, Math.PI * 1.6, Math.PI * 0.4, true);
c.closePath();
kzS(c);
kzStar(c, 140, 90, 40);
kzStar(c, 380, 160, 30);
kzStar(c, 600, 80, 36);
kzStar(c, 720, 200, 24);
},
function (c) {
c.beginPath();
c.ellipse(500, 470, 180, 140, 0, 0, 7);
kzS(c);
c.beginPath();
c.arc(500, 250, 110, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(500, 520, 100, 90, 0, 0, 7);
kzS(c);
c.beginPath();
c.arc(460, 230, 16, 0, 7);
kzS(c);
c.beginPath();
c.arc(540, 230, 16, 0, 7);
kzS(c);
c.beginPath();
c.arc(500, 280, 36, 0.2, Math.PI - 0.2);
kzS(c);
c.beginPath();
c.moveTo(430, 160);
c.lineTo(440, 90);
c.lineTo(470, 148);
kzS(c);
c.beginPath();
c.moveTo(570, 160);
c.lineTo(560, 90);
c.lineTo(530, 148);
kzS(c);
c.beginPath();
c.moveTo(330, 400);
c.quadraticCurveTo(150, 250, 140, 420);
c.quadraticCurveTo(220, 380, 250, 470);
c.quadraticCurveTo(280, 420, 330, 460);
kzS(c);
c.beginPath();
c.moveTo(670, 400);
c.quadraticCurveTo(850, 250, 860, 420);
c.quadraticCurveTo(780, 380, 750, 470);
c.quadraticCurveTo(720, 420, 670, 460);
kzS(c);
c.beginPath();
c.ellipse(420, 620, 50, 34, 0, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(580, 620, 50, 34, 0, 0, 7);
kzS(c);
c.beginPath();
c.moveTo(660, 540);
c.quadraticCurveTo(820, 600, 860, 520);
c.lineTo(900, 540);
c.lineTo(860, 560);
c.quadraticCurveTo(820, 640, 660, 580);
kzS(c);
c.beginPath();
c.moveTo(0, 690);
c.lineTo(1024, 690);
kzS(c);
},
function (c) {
c.beginPath();
c.moveTo(220, 720);
c.lineTo(260, 220);
c.quadraticCurveTo(512, 140, 764, 220);
c.lineTo(804, 720);
kzS(c);
c.beginPath();
c.ellipse(512, 222, 252, 52, 0, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(512, 222, 180, 34, 0, 0, 7);
kzS(c);
c.beginPath();
c.moveTo(420, 720);
c.lineTo(420, 520);
c.arc(512, 520, 92, Math.PI, 0);
c.lineTo(604, 720);
kzS(c);
c.beginPath();
c.arc(580, 620, 10, 0, 7);
kzS(c);
c.beginPath();
c.arc(340, 420, 46, 0, 7);
kzS(c);
c.beginPath();
c.moveTo(294, 420);
c.lineTo(386, 420);
c.moveTo(340, 374);
c.lineTo(340, 466);
kzS(c);
c.beginPath();
c.ellipse(690, 440, 40, 40, 0, 0, 7);
kzS(c);
c.beginPath();
c.ellipse(120, 600, 80, 60, 0, Math.PI, 0);
c.closePath();
kzS(c);
c.beginPath();
c.rect(105, 600, 30, 120);
kzS(c);
c.beginPath();
c.arc(900, 670, 40, 0, 7);
kzS(c);
c.beginPath();
c.arc(900, 670, 22, 0, 7);
kzS(c);
c.beginPath();
c.moveTo(860, 705);
c.lineTo(960, 705);
c.quadraticCurveTo(990, 690, 980, 660);
kzS(c);
c.beginPath();
c.moveTo(0, 720);
c.lineTo(1024, 720);
kzS(c);
},
function (c) {
c.beginPath();
c.moveTo(120, 560);
c.lineTo(120, 260);
c.quadraticCurveTo(120, 220, 160, 220);
c.lineTo(800, 220);
c.quadraticCurveTo(900, 230, 900, 340);
c.lineTo(900, 560);
c.closePath();
kzS(c);
for (var w = 0; w < 5; w++) {
c.beginPath();
c.arc(210 + w * 120, 320, 42, 0, 7);
kzS(c);
}
c.beginPath();
c.rect(780, 280, 90, 140);
kzS(c);
c.beginPath();
c.arc(270, 580, 70, 0, 7);
kzS(c);
c.beginPath();
c.arc(270, 580, 30, 0, 7);
kzS(c);
c.beginPath();
c.arc(740, 580, 70, 0, 7);
kzS(c);
c.beginPath();
c.arc(740, 580, 30, 0, 7);
kzS(c);
c.beginPath();
c.rect(120, 420, 780, 40);
kzS(c);
c.beginPath();
c.arc(870, 480, 18, 0, 7);
kzS(c);
c.beginPath();
c.moveTo(0, 650);
c.lineTo(1024, 650);
kzS(c);
c.beginPath();
c.arc(140, 100, 60, 0, 7);
kzS(c);
c.beginPath();
c.arc(700, 110, 50, Math.PI * 0.9, Math.PI * 1.9);
c.arc(780, 100, 60, Math.PI * 1.2, Math.PI * 0.2);
c.lineTo(700, 150);
c.closePath();
kzS(c);
},
function (cv, x, y, hex) {
var c = cv.getContext("2d"), W = cv.width, H = cv.height, img = c.getImageData(0, 0, W, H), d = img.data;
x = Math.floor(x);
y = Math.floor(y);
if (x < 0 || y < 0 || x >= W || y >= H)
return false;
var i0 = (y * W + x) * 4;
if (d[i0] + d[i0 + 1] + d[i0 + 2] < 200)
return false;
var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
var sr = d[i0], sg = d[i0 + 1], sb = d[i0 + 2];
if (Math.abs(sr - r) + Math.abs(sg - g) + Math.abs(sb - b) < 6)
return false;
function same(i) { return d[i] + d[i + 1] + d[i + 2] >= 200 && Math.abs(d[i] - sr) + Math.abs(d[i + 1] - sg) + Math.abs(d[i + 2] - sb) < 90; }
var stack = [[x, y]], seen = new Uint8Array(W * H);
while (stack.length) {
var p = stack.pop(), px = p[0], py = p[1];
while (px > 0 && same((py * W + px - 1) * 4) && !seen[py * W + px - 1])
px--;
var up = false, dn = false;
for (; px < W; px++) {
var k = py * W + px;
if (seen[k] || !same(k * 4))
break;
seen[k] = 1;
d[k * 4] = r;
d[k * 4 + 1] = g;
d[k * 4 + 2] = b;
if (py > 0) {
var ku = k - W;
if (!seen[ku] && same(ku * 4)) {
if (!up) {
stack.push([px, py - 1]);
up = true;
}
}
else
up = false;
}
if (py < H - 1) {
var kd = k + W;
if (!seen[kd] && same(kd * 4)) {
if (!dn) {
stack.push([px, py + 1]);
dn = true;
}
}
else
dn = false;
}
}
}
for (var j = 0; j < W * H; j++) {
if (seen[j])
continue;
var q = j * 4;
if (d[q] + d[q + 1] + d[q + 2] < 200)
continue;
var nx = j % W, ny = (j / W) | 0, near = (nx > 0 && seen[j - 1]) || (nx < W - 1 && seen[j + 1]) || (ny > 0 && seen[j - W]) || (ny < H - 1 && seen[j + W]);
if (!near)
continue;
if (Math.abs(d[q] - sr) + Math.abs(d[q + 1] - sg) + Math.abs(d[q + 2] - sb) < 260) {
var t = (d[q] + d[q + 1] + d[q + 2]) / 765;
d[q] = r * t + 34 * (1 - t);
d[q + 1] = g * t + 32 * (1 - t);
d[q + 2] = b * t + 42 * (1 - t);
}
}
c.putImageData(img, 0, 0);
return true;
},
function () {
var done = kzLocalGet("pagesDone") || {};
var h = "<div style='margin:4px 0 10px'>Choose a page. Every picture here was drawn for Wonderglen. Tap a part to fill it with colour, or draw with a crayon. Finish " + KZ_PAGES_NEED + " pages for the <b>Colouring Champion</b> sticker, and every finished page goes in your Backpack.</div><div style='display:flex;flex-wrap:wrap;gap:12px'>";
KZ_PAGES.forEach(function (p, i) {
h += "<div data-kz='p" + i + "' style='cursor:pointer;width:min(220px,44vw);background:#fff;border-radius:14px;padding:8px;box-shadow:0 2px 8px rgba(90,40,120,.15);text-align:center'>" +
"<canvas id='kz-th" + i + "' width='256' height='192' style='width:100%;border-radius:8px;border:1px solid #EEE'></canvas><div style='font-weight:700;margin-top:4px'>" + (done[p[0]] ? "⭐ " : "") + esc(p[1]) + "</div></div>";
});
h += "</div>";
var b = kzPanel("🖍️ The Colouring Book", h), fns = {};
KZ_PAGES.forEach(function (p, i) {
var cv = b.querySelector("#kz-th" + i), sv = kzPageSaved(p[0]);
if (sv) {
var im = new Image();
im.onload = function () { cv.getContext("2d").drawImage(im, 0, 0, 256, 192); };
im.src = sv;
}
else
kzPageLines(p[0], cv);
fns["p" + i] = function () { kzColourPage(i); };
});
kzBind(b, fns);
},
function (i) {
var P = KZ_PAGES[i], col = KZ_PALETTE[0], mode = "fill", undo = [];
var h = "<div style='display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start'>" +
"<div style='flex:1 1 560px;min-width:280px'><canvas id='kz-cv' width='1024' height='768' style='width:100%;background:#fff;border-radius:12px;box-shadow:0 2px 10px rgba(90,40,120,.2);touch-action:none'></canvas></div>" +
"<div style='flex:0 1 260px'><div id='kz-pal' style='display:grid;grid-template-columns:repeat(6,1fr);gap:6px'>" + KZ_PALETTE.map(function (c, k) { return "<div data-c='" + c + "' style='height:36px;border-radius:50%;background:" + c + ";border:3px solid " + (k ? "#fff" : "#3A2A5A") + ";box-shadow:0 1px 3px rgba(0,0,0,.25);cursor:pointer'></div>"; }).join("") + "</div>" +
"<div style='margin-top:10px'>" + kzBigBtn("fill", "🪣 Fill", "tap a part", "#48A8E0") + kzBigBtn("crayon", "🖍️ Crayon", "draw freely", "#F0903A") + kzBigBtn("undo", "↩️ Undo", "", "#8A8AA0") + kzBigBtn("clear", "🧽 Start again", "", "#8A8AA0") + kzBigBtn("done", "⭐ I'm finished!", "save it", "#60C058") + kzBigBtn("back", "📚 All pages", "", "#9A5AD0") + "</div><div id='kz-msg' style='margin-top:6px;font-weight:600'></div></div></div>";
var b = kzPanel("🖍️ " + P[1], h), cv = b.querySelector("#kz-cv"), c = cv.getContext("2d");
var sv = kzPageSaved(P[0]);
if (sv) {
var im = new Image();
im.onload = function () { c.drawImage(im, 0, 0, 1024, 768); };
im.src = sv;
}
else
kzPageLines(P[0], cv);
function msg(t) { var m = b.querySelector("#kz-msg"); if (m)
m.innerHTML = t; }
function snap() { undo.push(c.getImageData(0, 0, 1024, 768)); if (undo.length > 12)
undo.shift(); }
function save() { try {
kzLocalSet("page:" + P[0], cv.toDataURL("image/jpeg", 0.82));
}
catch (e) { } }
b.querySelectorAll("[data-c]").forEach(function (d) { d.onclick = function () { col = d.getAttribute("data-c"); b.querySelectorAll("[data-c]").forEach(function (x) { x.style.borderColor = "#fff"; }); d.style.borderColor = "#3A2A5A"; if (typeof playTone === "function")
playTone(500, 0.12); }; });
function at(e) { var r = cv.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; return { x: (t.clientX - r.left) / r.width * 1024, y: (t.clientY - r.top) / r.height * 768 }; }
var drawing = false, last = null;
function down(e) {
e.preventDefault();
var p = at(e);
if (mode === "fill") {
snap();
if (!kzFill(cv, p.x, p.y, col))
undo.pop();
else {
save();
if (typeof playTone === "function")
playTone(600 + Math.random() * 200, 0.15);
}
return;
}
snap();
drawing = true;
last = p;
c.fillStyle = col;
c.beginPath();
c.arc(p.x, p.y, 7, 0, 7);
c.fill();
}
function move(e) { if (!drawing)
return; e.preventDefault(); var p = at(e); c.strokeStyle = col; c.lineWidth = 14; c.lineCap = "round"; c.beginPath(); c.moveTo(last.x, last.y); c.lineTo(p.x, p.y); c.stroke(); last = p; }
function up() { if (drawing) {
drawing = false;
save();
} }
cv.addEventListener("mousedown", down);
cv.addEventListener("mousemove", move);
addEventListener("mouseup", up);
cv.addEventListener("touchstart", down, { passive: false });
cv.addEventListener("touchmove", move, { passive: false });
cv.addEventListener("touchend", up);
kzBind(b, { fill: function () { mode = "fill"; msg("Tap a part of the picture to fill it."); }, crayon: function () { mode = "crayon"; msg("Draw with your finger or the mouse."); },
undo: function () { var u = undo.pop(); if (u) {
c.putImageData(u, 0, 0);
save();
} },
clear: function () { snap(); kzPageLines(P[0], cv); save(); },
back: function () { kzColourBook(); },
done: function () {
var d = c.getImageData(0, 0, 1024, 768).data, white = 0, n = 0;
for (var q = 0; q < d.length; q += 4 * 37) {
n++;
if (d[q] > 245 && d[q + 1] > 245 && d[q + 2] > 245)
white++;
}
if (white / n > 0.55)
return msg("Keep going! There's still lots of white on the page. Colour a few more parts first.");
save();
var dn = kzLocalGet("pagesDone") || {}, first = !dn[P[0]];
dn[P[0]] = 1;
kzLocalSet("pagesDone", dn);
msg("⭐ Lovely! Your page is saved." + (kzSigned() ? " It's going in your Backpack." : ""));
if (typeof playTone === "function")
playTone(880, 0.4);
kzPageMade(P[0], first, Object.keys(dn).length);
} });
},
function () {
var solved = kzLocalGet("puzzlesSolved") || {}, lv = kzLocalGet("puzzleLevels") || {};
var h = "<div style='margin:4px 0 10px'>Six kinds of puzzle, each one a little harder every time you solve it. Solve " + KZ_PUZZLES_NEED + " different kinds for the <b>Puzzle Master</b> sticker. Every win earns a gold star (up to the day's number).</div>";
KZ_PUZZLES.forEach(function (p, i) { h += kzBigBtn(p[0], p[2] + " " + p[1], (solved[p[0]] ? "⭐ solved · " : "") + "level " + ((lv[p[0]] || 0) + 1), KZ_PALETTE[[10, 13, 15, 7, 2, 0][i]]); });
var b = kzPanel("🧩 The Puzzle Pavilion", h), fns = {};
KZ_PUZZLES.forEach(function (p) { fns[p[0]] = function () { kzPuzzle(p[0]); }; });
kzBind(b, fns);
},
function (k, say) {
var lv = kzLocalGet("puzzleLevels") || {};
lv[k] = (lv[k] || 0) + 1;
kzLocalSet("puzzleLevels", lv);
var s = kzLocalGet("puzzlesSolved") || {};
s[k] = 1;
kzLocalSet("puzzlesSolved", s);
if (typeof playTone === "function") {
playTone(660, 0.25);
setTimeout(function () { playTone(880, 0.35); }, 180);
}
var b = KZP.body, d = document.createElement("div");
d.style.cssText = "margin:14px auto;max-width:520px;text-align:center;background:#fff;border-radius:18px;padding:14px;box-shadow:0 3px 12px rgba(90,40,120,.2)";
d.innerHTML = "<div style='font-size:40px'>🎉</div><div style='font:700 20px Georgia,serif;color:#7A2E8A'>" + (say || "Solved!") + "</div><div id='kz-pz-star' style='margin:6px 0'></div>" + kzBigBtn("again", "▶️ Play the next level", "", "#60C058") + kzBigBtn("menu", "🧩 All puzzles", "", "#9A5AD0");
b.appendChild(d);
d.scrollIntoView({ behavior: "smooth", block: "center" });
kzBind(d, { again: function () { kzPuzzle(k); }, menu: function () { kzPuzzleMenu(); } });
kzPuzzleWin(k, Object.keys(s).length, function (t) { var e = d.querySelector("#kz-pz-star"); if (e)
e.innerHTML = t; });
},
function () {
var lv = kzPuzzleLevel("slide"), n = lv < 2 ? 3 : lv < 5 ? 4 : 5, page = KZ_PAGES[lv % KZ_PAGES.length];
var src = document.createElement("canvas");
src.width = 512;
src.height = 512;
kzPageLines(page[0], src);
var R = wRand(lv * 97 + 5), sc = src.getContext("2d");
for (var y = 8; y < 512; y += 22)
for (var x = 8; x < 512; x += 22) {
var d = sc.getImageData(x, y, 1, 1).data;
if (d[0] > 250 && d[1] > 250 && d[2] > 250)
kzFill(src, x, y, KZ_PALETTE[Math.floor(R() * 22)]);
}
var tiles = [];
for (var i = 0; i < n * n; i++)
tiles.push(i);
var blank = n * n - 1, pos = tiles.slice(), b0 = n * n - 1;
for (var m = 0; m < n * n * 30; m++) {
var bx = b0 % n, by = (b0 / n) | 0, opts = [];
if (bx > 0)
opts.push(b0 - 1);
if (bx < n - 1)
opts.push(b0 + 1);
if (by > 0)
opts.push(b0 - n);
if (by < n - 1)
opts.push(b0 + n);
var o = opts[Math.floor(Math.random() * opts.length)];
pos[b0] = pos[o];
pos[o] = blank;
b0 = o;
}
var h = "<div style='margin:4px 0 10px'>Tap a square next to the gap to slide it. Put <b>" + esc(page[1]) + "</b> back together. (Level " + (lv + 1) + ": " + n + " by " + n + ".)</div><div id='kz-sl' style='position:relative;width:min(480px,90vw);aspect-ratio:1;margin:0 auto;background:#3A2A5A;border-radius:12px;overflow:hidden'></div><div style='text-align:center;margin-top:8px'><canvas id='kz-sl-hint' width='128' height='128' style='width:96px;border-radius:8px;border:2px solid #fff'></canvas><div style='font-size:12px'>what it should look like</div></div>";
var b = kzPanel("🖼️ Sliding pictures", h, null), box = b.querySelector("#kz-sl"), url = src.toDataURL();
b.querySelector("#kz-sl-hint").getContext("2d").drawImage(src, 0, 0, 128, 128);
var moves = 0;
function paint() {
box.innerHTML = "";
pos.forEach(function (t, i) {
if (t === blank)
return;
var d = document.createElement("div"), x = i % n, y = (i / n) | 0, tx = t % n, ty = (t / n) | 0;
d.style.cssText = "position:absolute;left:" + (x / n * 100) + "%;top:" + (y / n * 100) + "%;width:" + (100 / n) + "%;height:" + (100 / n) + "%;background:url(" + url + ") " + (tx / (n - 1) * 100) + "% " + (ty / (n - 1) * 100) + "%/" + (n * 100) + "%;box-shadow:inset 0 0 0 2px #fff;cursor:pointer;transition:left .12s,top .12s";
d.onclick = function () {
var g = pos.indexOf(blank), gx = g % n, gy = (g / n) | 0;
if (Math.abs(gx - x) + Math.abs(gy - y) !== 1)
return;
pos[g] = t;
pos[i] = blank;
moves++;
if (typeof playTone === "function")
playTone(420, 0.06);
paint();
if (pos.every(function (v, j) { return v === j; }))
kzPuzzleSolved("slide", "The picture is whole again! (" + moves + " moves)");
};
box.appendChild(d);
});
}
paint();
},
function () {
var lv = kzPuzzleLevel("match"), pairs = Math.min(10, 4 + lv), icons = kzShuffle(["🦄", "🐉", "🍄", "🌈", "🫧", "🐸", "🏮", "🎠", "☁️", "🐰", "🦉", "🌻", "🧁", "🪁", "⭐", "🐚"]).slice(0, pairs);
var cards = kzShuffle(icons.concat(icons)), open = [], got = 0, turns = 0, cols = pairs <= 6 ? 4 : 5;
var h = "<div style='margin:4px 0 10px'>Turn over two cards. If they match, they stay! Find all " + pairs + " pairs. (Level " + (lv + 1) + ".)</div><div id='kz-mt' style='display:grid;grid-template-columns:repeat(" + cols + ",1fr);gap:8px;max-width:520px;margin:0 auto'></div>";
var b = kzPanel("🃏 Matching pairs", h), grid = b.querySelector("#kz-mt"), lock = false;
cards.forEach(function (ic, i) {
var d = document.createElement("div");
d.style.cssText = "aspect-ratio:3/4;border-radius:12px;background:linear-gradient(135deg,#9A5AD0,#F07AA8);display:flex;align-items:center;justify-content:center;font-size:clamp(26px,7vw,46px);cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.2);user-select:none";
d.textContent = "✨";
d.onclick = function () {
if (lock || d.dataset.up)
return;
d.dataset.up = 1;
d.style.background = "#fff";
d.textContent = ic;
open.push({ d: d, ic: ic });
if (open.length === 2) {
turns++;
lock = true;
var a = open[0], c2 = open[1];
if (a.ic === c2.ic) {
got++;
open = [];
lock = false;
if (typeof playTone === "function")
playTone(700, 0.2);
if (got === pairs)
kzPuzzleSolved("match", "All " + pairs + " pairs found in " + turns + " turns!");
}
else
setTimeout(function () { [a, c2].forEach(function (q) { delete q.d.dataset.up; q.d.style.background = "linear-gradient(135deg,#9A5AD0,#F07AA8)"; q.d.textContent = "✨"; }); open = []; lock = false; }, 900);
}
};
grid.appendChild(d);
});
},
function () {
var lv = kzPuzzleLevel("words"), themes = Object.keys(KZ_WORDS), th = themes[lv % themes.length], N = lv < 2 ? 8 : lv < 5 ? 10 : 12, count = Math.min(10, 5 + lv);
var words = kzShuffle(KZ_WORDS[th].filter(function (w) { return w.length <= N; }).slice()).slice(0, count), grid = [], dirs = lv < 2 ? [[1, 0], [0, 1]] : [[1, 0], [0, 1], [1, 1], [1, -1]];
for (var i = 0; i < N * N; i++)
grid.push("");
var placed = [];
words.forEach(function (w) {
for (var t = 0; t < 200; t++) {
var dd = dirs[Math.floor(Math.random() * dirs.length)], x = Math.floor(Math.random() * N), y = Math.floor(Math.random() * N), ok = true;
for (var k = 0; k < w.length; k++) {
var xx = x + dd[0] * k, yy = y + dd[1] * k;
if (xx < 0 || yy < 0 || xx >= N || yy >= N) {
ok = false;
break;
}
var g = grid[yy * N + xx];
if (g && g !== w[k]) {
ok = false;
break;
}
}
if (!ok)
continue;
for (var k2 = 0; k2 < w.length; k2++)
grid[(y + dd[1] * k2) * N + x + dd[0] * k2] = w[k2];
placed.push({ w: w, x: x, y: y, d: dd, found: false });
break;
}
});
var AB = "ABCDEFGHIJKLMNOPRSTUW";
for (var j = 0; j < N * N; j++)
if (!grid[j])
grid[j] = AB[Math.floor(Math.random() * AB.length)];
var h = "<div style='margin:4px 0 10px'>Find these words about <b>" + esc(th) + "</b>. Tap the first letter, then the last letter. (Level " + (lv + 1) + ".)</div><div id='kz-wl' style='display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px'></div><div id='kz-wg' style='display:grid;grid-template-columns:repeat(" + N + ",1fr);gap:3px;max-width:560px;margin:0 auto;user-select:none'></div>";
var b = kzPanel("🔤 Word search", h), gw = b.querySelector("#kz-wg"), wl = b.querySelector("#kz-wl"), first = null, cells = [], cols = ["#F8B8D0", "#BFE6FF", "#D8F8B8", "#FFE8A0", "#E0D0FF", "#FFD0B0"];
function list() { wl.innerHTML = placed.map(function (p) { return "<span style='padding:4px 10px;border-radius:12px;background:" + (p.found ? "#60C058;color:#fff;text-decoration:line-through" : "#fff") + ";font-weight:700'>" + p.w + "</span>"; }).join(""); }
grid.forEach(function (ch, i) {
var d = document.createElement("div");
d.textContent = ch;
d.style.cssText = "aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:6px;font:700 clamp(13px,3.6vw,22px) system-ui;cursor:pointer";
d.onclick = function () {
if (first === null) {
first = i;
d.style.outline = "3px solid #9A5AD0";
return;
}
var a = first;
cells[a].style.outline = "";
first = null;
placed.forEach(function (p, pi) {
if (p.found)
return;
var e = (p.y + p.d[1] * (p.w.length - 1)) * N + p.x + p.d[0] * (p.w.length - 1), s = p.y * N + p.x;
if ((a === s && i === e) || (a === e && i === s)) {
p.found = true;
for (var k = 0; k < p.w.length; k++)
cells[(p.y + p.d[1] * k) * N + p.x + p.d[0] * k].style.background = cols[pi % cols.length];
if (typeof playTone === "function")
playTone(640, 0.2);
}
});
list();
if (placed.every(function (p) { return p.found; }))
kzPuzzleSolved("words", "You found every word!");
};
gw.appendChild(d);
cells.push(d);
});
list();
},
function (kind, title, make) {
var q = null, right = 0, tries = 0, need = 5;
var h = "<div id='kz-q' style='max-width:620px;margin:0 auto;text-align:center'></div>";
var b = kzPanel(title, h), box = b.querySelector("#kz-q");
function next() {
q = make(right);
var ans = kzShuffle(q.a.slice());
box.innerHTML = "<div style='margin:6px 0;font-size:13px'>" + "⭐".repeat(right) + "☆".repeat(need - right) + "</div><div style='font:700 clamp(20px,5vw,30px) system-ui;margin:12px 0 16px'>" + q.q + "</div>" + ans.map(function (a, i) { return kzBigBtn("a" + i, a, "", KZ_PALETTE[[10, 15, 7][i]], true); }).join("") + "<div id='kz-qm' style='margin-top:8px;font-weight:600'></div>";
var fns = {};
ans.forEach(function (a, i) {
fns["a" + i] = function () {
tries++;
if (a === q.a[0]) {
right++;
if (typeof playTone === "function")
playTone(720, 0.2);
if (right >= need)
return kzPuzzleSolved(kind, "Five right answers! Well done.");
next();
}
else {
var m = box.querySelector("#kz-qm");
if (m)
m.textContent = "Not quite, have another go!";
if (typeof playTone === "function")
playTone(240, 0.2);
}
};
});
kzBind(box, fns);
}
next();
},
function () {
var lv = kzPuzzleLevel("sums");
kzQuiz("sums", "🔢 Number fun", function () {
var t = Math.random(), top = lv < 1 ? 5 : lv < 3 ? 10 : lv < 6 ? 20 : 50, q, ans, x, y;
if (t < 0.3 && lv < 5) {
var ic = ["🍎", "🫧", "⭐", "🐰", "🍄", "🌼"][kzRnd(0, 5)], n = kzRnd(2, Math.min(12, 4 + lv * 2));
q = "How many?<br><span style='font-size:clamp(24px,6vw,40px);letter-spacing:4px'>" + ic.repeat(n) + "</span>";
ans = n;
}
else if (t < 0.65) {
x = kzRnd(1, top);
y = kzRnd(1, top);
q = x + " + " + y + " = ?";
ans = x + y;
}
else if (t < 0.9 || lv < 4) {
x = kzRnd(2, top);
y = kzRnd(1, x);
q = x + " − " + y + " = ?";
ans = x - y;
}
else {
x = kzRnd(2, Math.min(10, lv + 2));
y = kzRnd(2, 10);
q = x + " × " + y + " = ?";
ans = x * y;
}
var w1 = ans + kzRnd(1, 3), w2 = Math.max(0, ans - kzRnd(1, 3));
if (w2 === ans)
w2 = ans + 4;
if (w1 === w2)
w1++;
return { q: q, a: [String(ans), String(w1), String(w2)] };
});
},
function () {
var lv = kzPuzzleLevel("pattern"), sets = [["🔴", "🔵", "🟡", "🟢", "🟣", "🟠"], ["🍄", "🌼", "🫧", "⭐", "🐰", "🌈"], ["🦄", "🐉", "🐸", "🦉", "🐚", "🎈"]];
kzQuiz("pattern", "🔷 What comes next?", function () {
var S = kzShuffle(sets[kzRnd(0, 2)].slice()), kind = kzRnd(0, lv < 2 ? 1 : lv < 4 ? 3 : 4), seq = [], ans;
if (kind <= 3) {
var unit = kind === 0 ? [S[0], S[1]] : kind === 1 ? [S[0], S[0], S[1]] : kind === 2 ? [S[0], S[1], S[2]] : [S[0], S[1], S[1], S[2]], L = unit.length * 2 + kzRnd(0, unit.length - 1);
for (var i = 0; i < L; i++)
seq.push(unit[i % unit.length]);
ans = unit[L % unit.length];
var others = S.filter(function (x) { return x !== ans; });
return { q: seq.join(" ") + " ❓", a: [ans, others[0], others[1]] };
}
var st = kzRnd(1, 5), step = kzRnd(2, 5);
for (var j = 0; j < 4; j++)
seq.push(st + j * step);
ans = st + 4 * step;
return { q: seq.join(", ") + ", ❓", a: [String(ans), String(ans + 1), String(ans - step + 1)] };
});
},
function () {
var lv = kzPuzzleLevel("spell"), pool = KZ_SPELL.filter(function (w) { return w.length <= 4 + lv; }), words = kzShuffle((pool.length >= 4 ? pool : KZ_SPELL.slice().sort(function (a, b) { return a.length - b.length; }).slice(0, 8)).slice()).slice(0, 4), wi = 0;
var b = kzPanel("✏️ Spelling scramble", "<div id='kz-sp' style='max-width:620px;margin:0 auto;text-align:center'></div>"), box = b.querySelector("#kz-sp");
function next() {
if (wi >= words.length)
return kzPuzzleSolved("spell", "You spelled all four words!");
var w = words[wi], letters = kzShuffle(w.split("").map(function (c, i) { return { c: c, i: i }; }));
if (letters.map(function (l) { return l.c; }).join("") === w)
letters.reverse();
var built = "";
function draw() {
box.innerHTML = "<div style='margin:6px 0'>Word " + (wi + 1) + " of " + words.length + ". Tap the letters in the right order to spell a word from Wonderglen.</div>" +
"<div style='font:700 clamp(26px,7vw,42px) system-ui;letter-spacing:6px;min-height:52px;color:#7A2E8A'>" + (built || "&nbsp;") + "</div>" +
letters.map(function (l, k) { return l.used ? "" : "<button data-kz='l" + k + "' style='margin:5px;width:54px;height:54px;border:0;border-radius:14px;background:" + KZ_PALETTE[(k * 5) % 22] + ";color:#fff;font:700 24px system-ui;cursor:pointer'>" + l.c + "</button>"; }).join("") +
"<div>" + kzBigBtn("undo", "↩️ Take back", "", "#8A8AA0") + "</div><div id='kz-sm' style='font-weight:600'></div>";
var fns = { undo: function () { if (!built)
return; var last = built[built.length - 1]; built = built.slice(0, -1); for (var q = letters.length - 1; q >= 0; q--)
if (letters[q].used && letters[q].c === last) {
letters[q].used = false;
break;
} draw(); } };
letters.forEach(function (l, k) {
fns["l" + k] = function () {
l.used = true;
built += l.c;
if (typeof playTone === "function")
playTone(400 + built.length * 40, 0.1);
if (built.length === w.length) {
if (built === w) {
wi++;
if (typeof playTone === "function")
playTone(880, 0.3);
next();
}
else {
draw();
var m = box.querySelector("#kz-sm");
if (m)
m.textContent = "Nearly! Take back some letters and try again.";
}
}
else
draw();
};
});
kzBind(box, fns);
}
draw();
}
next();
},
function (force) {
if (KZ.stBusy || (!force && Date.now() - KZ.stAt < 60000))
return Promise.resolve(KZ.st);
KZ.stBusy = true;
KZ.stAt = Date.now();
var p = kzSigned() ? kzRpc("kids_state", {}) : (typeof restRpc === "function" ? restRpc("kids_rules", {}) : Promise.reject(new Error("offline")));
return p.then(function (o) { KZ.stBusy = false; if (o && o.ok !== false) {
KZ.st = o;
if (o.rules)
KZ.rule = o.rules;
else if (o.who)
KZ.rule = o;
KZ.stock = o.stock || KZ.stock;
} return KZ.st; })
.catch(function () { KZ.stBusy = false; return KZ.st; });
},
function () {
var R = KZ.rule || {};
if (R.open === false && !kzKeeper())
return { ok: false, say: "The Kids Zone is closed just now. The Rainbow Toadstool's door is shut tight, with a sign: \"Back soon!\"" };
if (R.who === "young" && !kzKeeper() && !kzStaffOnly()) {
if (!kzSigned())
return { ok: false, say: "Sign in to visit the Kids Zone." };
if (typeof ageAdult === "function" && ageAdult())
return { ok: false, say: "The Kids Zone is for young dreamers and its staff just now. Grown-ups wait outside: Faerie has plenty to see." };
}
return { ok: true };
},
function (key, say) {
var S = KZ_STICKER[key];
if (!kzSigned()) {
var L = kzLocalGet("stickers") || {}, first = !L[key];
L[key] = 1;
kzLocalSet("stickers", L);
setStatus(say + (first && S ? " <b>" + S.e + " " + esc(S.n) + "</b> sticker! (Sign in, and stickers and gold stars go to your Backpack.)" : ""));
kzConfetti();
return;
}
kzRpc("kids_win", { p_game: key }).then(function (o) {
if (!o || o.ok === false) {
setStatus(say + " " + esc((o && o.say) || ""));
return;
}
if (o.stickers)
KZ.st = Object.assign(KZ.st || {}, { stickers: o.stickers });
setStatus(say + (o.sticker && S ? " <b>New sticker: " + S.e + " " + esc(S.n) + "!</b>" : "") + (o.star ? " <b>⭐ A gold star</b> for your Backpack." : o.say ? " " + esc(o.say) : "") + (o.wand ? " <b>🪄 Your Sticker Book is full: the Wonder Wand is yours!</b>" : ""));
if (typeof loadStock === "function")
loadStock();
kzLoad(true);
}).catch(function (e) { setStatus(say + " " + kzSaySoft(e)); });
kzConfetti();
},
function (k, kinds, show) {
if (!kzSigned()) {
show("Sign in to win gold stars.");
if (kinds >= KZ_PUZZLES_NEED)
kzWin("puzzles", "<b>Puzzle Master!</b>");
return;
}
kzRpc("kids_win", { p_game: "puzzle_" + k }).then(function (o) { show(o && o.star ? "⭐ A gold star for your Backpack!" : esc((o && o.say) || "")); if (typeof loadStock === "function")
loadStock(); })
.catch(function (e) { show(kzSaySoft(e)); });
if (kinds >= KZ_PUZZLES_NEED && !kzStickers().puzzles)
kzWin("puzzles", "<b>Five kinds of puzzle solved!</b>");
},
function (F) {
if (KZ.busy)
return;
if (F.hidden)
return setStatus("Nothing here just now. More will turn up before long.");
if (!kzSigned()) {
setStatus("<b>" + KZ_ITEM[F.kind].e + " " + esc(KZ_ITEM[F.kind].n) + ".</b> Sign in, and what you find goes to your Backpack.");
return;
}
KZ.busy = true;
kzRpc("kids_gather", { p_kind: F.kind, p_spot: F.id }).then(function (o) {
KZ.busy = false;
if (!o || o.ok === false) {
if (o && o.wait) {
F.hidden = Date.now() + o.wait * 1000;
F.g.visible = false;
}
return setStatus(esc((o && o.say) || "Not just now."));
}
F.hidden = Date.now() + 600000;
F.g.visible = false;
if (typeof playTone === "function")
playTone(760, 0.2);
KZ.stock = KZ.stock || {};
KZ.stock[F.kind] = (KZ.stock[F.kind] || 0) + (o.got || 1);
setStatus("<b>" + (o.got > 1 ? o.got + " × " : "") + KZ_ITEM[F.kind].e + " " + esc(KZ_ITEM[F.kind].n) + "</b>, in your Backpack." + (F.kind === "kz_clover" ? " The critters love clover." : " Make keepsakes with finds at the Craft Cottage."));
if (typeof loadStock === "function")
loadStock();
}).catch(function (e) { KZ.busy = false; setStatus(kzSaySoft(e)); });
},
function () {
var got = kzStickers(), n = Object.keys(got).filter(function (k) { return KZ_STICKER[k]; }).length;
var h = "<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>The Kids Zone · Wonderglen</div>" + kzLine("Everything here is for playing, and everything is free. Nobody can be hurt here. Win a sticker for each thing below; every win earns a <b>⭐ gold star</b> to trade for toys at the Prize Tent. Fill the Sticker Book and the <b>🪄 Wonder Wand</b> is yours.") +
kzLine("You have <b>" + n + " of " + KZ_STICKERS.length + "</b> stickers.") + "<div style='margin-top:6px'>";
KZ_STICKERS.forEach(function (s) { h += "<div style='margin:5px 0'>" + (got[s[0]] ? "✅" : "⬜") + " " + s[2] + " <b>" + esc(s[1]) + "</b><div style='opacity:.75;font-size:12px;margin-left:24px'>" + esc(s[3]) + "</div></div>"; });
h += "</div>" + kzLine("Also: free treats at the <b>Honeydrop Tuckshop</b>; finds to gather (clover, pebbles, feathers, petals, shells, sparkle stones) for keepsakes at the <b>Craft Cottage</b>; the <b>Little Schoolhouse</b> and its bus to the Commons School.") +
worldBtn("way", "🧭 Show me the way somewhere", "the Where to? board") + worldBtn("book", "📒 My Sticker Book", "");
worldCard(h, { way: kzWayCard, book: kzBookCard });
},
function () {
var got = kzStickers(), st = (KZ.st && KZ.st.today) || {}, cap = (KZ.rule && KZ.rule.stars_per_day) || 12;
var h = "<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>📒 My Sticker Book</div><div style='display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0'>";
KZ_STICKERS.forEach(function (s) { var on = !!got[s[0]]; h += "<div style='text-align:center;padding:6px 2px;border-radius:10px;background:" + (on ? "rgba(240,122,168,.25)" : "rgba(255,255,255,.05)") + ";border:1px dashed rgba(255,255,255,.25)'><div style='font-size:26px;" + (on ? "" : "filter:grayscale(1);opacity:.35") + "'>" + s[2] + "</div><div style='font-size:11px'>" + esc(s[1]) + "</div></div>"; });
h += "</div>" + kzLine("Gold stars won today: <b>" + (st.stars || 0) + " of " + cap + "</b>. Gold stars you hold: <b>" + kzHave("kz_star") + "</b>.") + (kzSigned() ? "" : kzLine("Sign in, and your stickers are kept for good."));
worldCard(h, {});
},
function () {
var h = "<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>🧭 Where to?</div>" + kzLine("Choose a place: Pip the guide sprite flies ahead of you along the paths all the way there, and an arrow at the top of the screen shows the way too."), fns = {};
KZ_SITES.forEach(function (s) { if (s[0] === "door")
return; h += worldBtn("g" + s[0], esc(s[4].replace(/^the /, "The ")), ""); fns["g" + s[0]] = function () { worldCard(null); if (typeof kzwGuide === "function")
kzwGuide(s[0]);
else {
KZ.guide = KZ_SITE[s[0]];
setStatus("Follow the arrow at the top of the screen to <b>" + esc(s[4]) + "</b>.");
} }; });
h += worldBtn("gnone", "No arrow, thank you", "");
fns.gnone = function () { KZ.guide = null; worldCard(null); };
worldCard(h, fns);
},
function (L) {
var g = KZ.guide;
if (!g)
return "";
var dx = g.x - L.x, dz = g.z - L.z, d = Math.hypot(dx, dz);
if (d < g.r * 0.6 + 4) {
KZ.guide = null;
setStatus("<b>Here you are: " + esc(g.name) + ".</b>");
return "";
}
var a = Math.atan2(-dx, -dz) - yaw;
a = Math.atan2(Math.sin(a), Math.cos(a));
var ar = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"][((Math.round(-a / (Math.PI / 4)) % 8) + 8) % 8];
return " · " + ar + " " + esc(g.name) + " " + Math.round(d) + " m";
},
function (msg) {
var st = (KZ.st && KZ.st.today) || {}, cap = (KZ.rule && KZ.rule.treats_per_day) || 3, left = Math.max(0, cap - (st.treats || 0));
var h = "<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>🍭 The Honeydrop Tuckshop</div>" + kzLine("Bumblewick hums as he fills the jars. Treats are free, " + cap + " a day each. " + (kzSigned() ? "You can choose <b>" + left + "</b> more today." : "Sign in to take treats.")) + (msg ? "<div style='color:#FFE7B0;margin:4px 0'>" + msg + "</div>" : ""), fns = {};
KZ_TREATS.forEach(function (k) { var I = KZ_ITEM[k]; h += worldBtn("t" + k, I.e + " " + esc(I.n), esc(I.note) + (I.fd ? " Food +" + I.fd : "") + (I.dr ? " Drink +" + I.dr : "")); fns["t" + k] = function () { kzTreat(k); }; });
worldCard(h, fns);
},
function (k, card) {
card = card || kzTuckCard;
if (!kzSigned() || KZ.busy)
return;
KZ.busy = true;
kzRpc("kids_treat", { p_kind: k }).then(function (o) { KZ.busy = false; kzLoad(true).then(function () { card(esc((o && o.say) || "")); }); if (typeof loadStock === "function")
loadStock(); })
.catch(function (e) { KZ.busy = false; card(kzSaySoft(e)); });
},
function (msg) {
var stars = kzHave("kz_star"), h = "<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>🎪 The Prize Tent</div>" + kzLine("Dandelion Jinks bounces on his toes. \"Gold stars for toys! You have <b>" + stars + "</b> ⭐.\"") + (msg ? "<div style='color:#FFE7B0;margin:4px 0'>" + msg + "</div>" : ""), fns = {};
KZ_PRIZES.forEach(function (p) { var I = KZ_ITEM[p[0]]; h += worldBtn("p" + p[0], I.e + " " + esc(I.n) + " · " + p[1] + " ⭐", esc(I.note)); fns["p" + p[0]] = function () { kzPrize(p[0]); }; });
worldCard(h, fns);
},
function (k) {
if (!kzSigned())
return kzPrizeCard("Sign in to trade gold stars.");
if (KZ.busy)
return;
KZ.busy = true;
kzRpc("kids_prize", { p_kind: k }).then(function (o) {
KZ.busy = false;
if (o && o.ok !== false) {
KZ.stock = KZ.stock || {};
KZ.stock.kz_star = o.stars;
if (typeof playTone === "function")
playTone(880, 0.3);
kzConfetti();
}
if (typeof loadStock === "function")
loadStock();
kzPrizeCard(esc((o && o.say) || ""));
})
.catch(function (e) { KZ.busy = false; kzPrizeCard(kzSaySoft(e)); });
},
function (msg) {
var h = "<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>✂️ The Craft Cottage</div>" + kzLine("Make a keepsake from what you found round Wonderglen. Each one shows just what it takes.") + (msg ? "<div style='color:#FFE7B0;margin:4px 0'>" + msg + "</div>" : ""), fns = {};
KZ_MAKES.forEach(function (m) {
var I = KZ_ITEM[m.k], need = Object.keys(m.need).map(function (k) { var have = kzHave(k), ok = have >= m.need[k]; return (ok ? "✅ " : "") + m.need[k] + " " + KZ_ITEM[k].e + " " + esc(KZ_ITEM[k].n.toLowerCase()) + (m.need[k] > 1 ? "s" : "") + " (you have " + have + ")"; }).join(", ");
h += worldBtn("m" + m.k, I.e + " " + esc(I.n), need);
fns["m" + m.k] = function () { kzMake(m.k); };
});
worldCard(h, fns);
},
function (k) {
if (!kzSigned())
return kzCraftCard("Sign in to make keepsakes from your finds.");
if (KZ.busy)
return;
KZ.busy = true;
kzRpc("kids_make", { p_kind: k }).then(function (o) {
KZ.busy = false;
if (o && o.ok !== false) {
KZ.stock = null;
if (typeof playTone === "function")
playTone(700, 0.3);
}
var p = typeof loadStock === "function" ? loadStock() : null;
Promise.resolve(p).then(function () { kzLoad(true).then(function () { kzCraftCard(esc((o && o.say) || "")); }); });
})
.catch(function (e) { KZ.busy = false; kzCraftCard(kzSaySoft(e)); });
},
function () {
var h = "<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>📖 Storybook Hollow</div>" + kzLine("Grandmother Willowmere opens the great book. \"Which story shall it be?\""), fns = {};
KZ_STORIES.forEach(function (s, i) { h += worldBtn("s" + i, esc(s[0]), ""); fns["s" + i] = function () { kzStoryRead(i); }; });
worldCard(h, fns);
},
function (i) {
var s = KZ_STORIES[i], ans = kzShuffle(s[3].slice()), fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#F8C8E8'>" + esc(s[0]) + "</div><div style='margin:6px 0;line-height:1.6'>" + esc(s[1]) + "</div><div style='margin-top:8px;font-weight:600'>" + esc(s[2]) + "</div>";
ans.forEach(function (a, k) { h += worldBtn("a" + k, esc(a), ""); fns["a" + k] = function () { if (a === s[3][0]) {
worldCard(null);
kzWin("story", "<b>That's right!</b> Grandmother Willowmere smiles and closes the book.");
}
else
setStatus("Not quite. Have another look at the story!"); }; });
worldCard(h, fns);
},
function (f) {
var ans = kzShuffle(f[4].slice()), fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE07A'>💡 " + esc(f[1]) + "</div><div style='margin:6px 0;line-height:1.55'>" + esc(f[2]) + "</div><div style='margin-top:8px;font-weight:600'>" + esc(f[3]) + "</div>";
ans.forEach(function (a, k) {
h += worldBtn("a" + k, esc(a), "");
fns["a" + k] = function () {
if (a !== f[4][0])
return setStatus("Not quite. Read the fact again!");
var got = kzLocalGet("facts") || {};
got[f[0]] = 1;
kzLocalSet("facts", got);
var n = Object.keys(got).length;
worldCard(null);
if (typeof playTone === "function")
playTone(760, 0.2);
if (n >= KZ_FACTS_NEED && !kzStickers().facts)
kzWin("facts", "<b>Clever Clogs!</b> You've answered " + n + " Wonder Facts.");
else
setStatus("<b>Correct!</b> That's " + n + " of " + KZ_FACTS_NEED + " Wonder Facts for the Clever Clogs sticker.");
};
});
worldCard(h, fns);
},
function () {
worldCard("<div style='font:600 18px var(--serif,Georgia);color:#F8C8E8'>🚌 The school bus</div>" + kzLine("Miss Tallyquill rings the bell. \"The bus goes to the <b>Commons School</b>, the campus of the City School, with every grade from kindergarten to twelve. Lessons are free for everyone, and your report card follows you.\"") +
worldBtn("go", "🚌 Ride the bus to the Commons School", "you'll step off at its door in Somnucor") + worldBtn("stay", "Stay and play", ""), { go: kzBus, stay: function () { worldCard(null); } });
},
function () {
worldCard(null);
var spec = null;
(store.objects || []).forEach(function (o) { if (!spec && o.city && (o.workplace === "The Commons School" || o.label === "The Commons School"))
spec = o; });
worldOff(true);
WLD.from = null;
if (typeof toSomnucor === "function")
toSomnucor();
if (!spec)
(store.objects || []).forEach(function (o) { if (!spec && o.city && (o.workplace === "The Commons School" || o.label === "The Commons School"))
spec = o; });
if (spec && typeof enterBuilding === "function") {
if (!walkMode && typeof setWalk === "function")
setWalk(true);
enterBuilding(spec);
setStatus("<b>The Commons School.</b> The bus pulls away with a friendly toot. Kindergarten to Grade 12: choose a classroom.");
}
else
setStatus("<b>Somnucor.</b> The bus sets you down in the city. The Commons School is on the Commons ring: the compass finder can show you the way.");
},
function () {
if (!KZ.G || !WLD.on || WLD.on !== "kidszone")
return;
var L = worldLocal(), n = KZ_LITE ? 14 : 28;
for (var i = 0; i < n; i++) {
var m = wBox(0.12, 0.02, 0.18, kzBasic(parseInt(KZ_PALETTE[i % 22].slice(1), 16)), L.x + (Math.random() - 0.5) * 2, L.y + 0.6 + Math.random(), L.z + (Math.random() - 0.5) * 2, KZ.G);
m.userData.keep = 1;
KZ.glows.push({ o: m, t: 0, d: 2.4, rise: -0.6, spin: true, vx: (Math.random() - 0.5) * 1.4, vz: (Math.random() - 0.5) * 1.4 });
}
},
function (dt) {
for (var i = KZ.glows.length - 1; i >= 0; i--) {
var g = KZ.glows[i];
g.t += dt;
var o = g.o;
o.position.y += (g.rise || 0) * dt;
if (g.vx) {
o.position.x += g.vx * dt;
o.position.z += g.vz * dt;
}
if (g.spin) {
o.rotation.x += dt * 3;
o.rotation.z += dt * 2;
}
if (o.material && o.material.opacity !== undefined && o.isSprite)
o.material.opacity = Math.max(0, 0.6 * (1 - g.t / g.d));
if (g.t >= g.d) {
if (o.parent)
o.parent.remove(o);
KZ.glows.splice(i, 1);
}
}
},
function () {
var P = camera.position, cols = [0xF07AA8, 0xF0D040, 0x7AD8C8, 0x9A5AD0, 0x48A8E0, 0x60C058];
for (var i = 0; i < 10; i++) {
var g = wGlow(cols[i % 6], 0.9, 0.55);
g.position.set(P.x + Math.cos(i) * 1.2, P.y - 0.4, P.z + Math.sin(i) * 1.2);
scene.add(g);
(function (g, a) { var t0 = performance.now(); function step() { var t = (performance.now() - t0) / 1000; if (t > 4) {
scene.remove(g);
return;
} var Q = camera.position; g.position.set(Q.x + Math.cos(a + t * 1.4) * 1.3, Q.y - 0.6 + t * 0.35, Q.z + Math.sin(a + t * 1.4) * 1.3); g.material.opacity = 0.55 * (1 - t / 4); requestAnimationFrame(step); } step(); })(g, i / 10 * 6.283);
}
if (typeof playTone === "function") {
playTone(660, 0.3);
setTimeout(function () { playTone(990, 0.4); }, 200);
}
setStatus("<b>🪄 You wave the Wonder Wand</b>, and soft lights dance round you.");
},
function (G) {
KZ.G = G;
KZ.solids.length = 0;
KZ.plats.length = 0;
KZ.spots.length = 0;
KZ.talk.length = 0;
KZ.rooms.length = 0;
KZ.people.length = 0;
KZ.critters.length = 0;
KZ.ins = {};
KZ.bob.length = 0;
KZ.glows.length = 0;
KZ.bubbles.length = 0;
KZ.shrooms.length = 0;
KZ.lanterns.length = 0;
KZ.pads.length = 0;
KZ.fed = kzLocalGet("fed:" + kzToday()) || {};
kzSkyDome(G);
kzScenery(G);
kzPlaces(G);
kzIBuild(G);
kzBake(G);
KZ.built = true;
},
function (dt) {
var L = worldLocal();
KZ.t += dt;
if (KZ.sky && KZ.G) {
var cp = camera.position;
KZ.sky.position.set(cp.x - KZ.G.position.x, cp.y - KZ.G.position.y, cp.z - KZ.G.position.z);
}
var feet = kzFeet(L), pl = kzPlatAt(L.x, L.z, feet + 0.05);
KZ.onPlat = pl && Math.abs(pl.t - feet) < 0.25 && pl.t > kzHeight(L.x, L.z) + 0.05 ? pl.p : null;
if (KZ.ride && !KZ.rideView && typeof meView !== "undefined" && meView !== "eyes") {
KZ.rideView = meView;
meView = "eyes";
}
kzRideTick(dt);
if (KZ.badgeLeaf) {
var open = kzStaffOnly() && Math.hypot(L.x - KZ.badge.x, L.z - KZ.badge.z) < 2.6;
KZ.badgeLeaf.visible = !open;
}
KZ.wt = (KZ.wt || 0) + dt;
if (KZ.wands && KZ.wt > (KZ_LITE ? 2.6 : 1.2) && KZ.bubbles.length < (KZ_LITE ? 18 : 44) && Math.hypot(L.x - KZ_SITE.bubbles.x, L.z - KZ_SITE.bubbles.z) < 160) {
KZ.wt = 0;
var w = KZ.wands[Math.floor(Math.random() * KZ.wands.length)];
kzBubble(w.x + (Math.random() - 0.5), w.y, w.z + (Math.random() - 0.5));
}
var pops = kzBubblesTick(dt, L);
KZ.bob.forEach(function (b) { b.o.position.y = b.y + Math.sin(KZ.t * b.sp + b.a) * b.amp; });
kzSparkleTick(dt);
if (KZ.fountain) {
var fa = KZ.fountain.geometry.attributes.position, fb = KZ.fountain.userData.base;
for (var i = 0; i < fa.count; i++) {
var ph = (KZ.t * 0.8 + i * 0.37) % 1;
fa.array[i * 3 + 1] = fb[i * 3 + 1] + Math.sin(ph * Math.PI) * 1.6 - 0.4;
fa.array[i * 3] = fb[i * 3] * (1 + ph * 1.6);
fa.array[i * 3 + 2] = fb[i * 3 + 2] * (1 + ph * 1.6);
}
fa.needsUpdate = true;
}
KZ.people.forEach(function (P) { if (P.wander)
wWander(P.g, dt, function (x, z) { return kzHeight(x, z); }, P.wander); });
if (typeof kzdKitesTick === "function")
kzdKitesTick(dt);
KZ.critters.forEach(function (C) {
if (C.wander && !C.fly)
wWander(C.g, dt, function (x, z) { return kzHeight(x, z); }, C.wander);
else if (C.fly) {
var u = C.g.userData;
u.fa = (u.fa || Math.random() * 6) + dt * 0.4;
C.g.position.x += Math.cos(u.fa) * dt * 1.2;
C.g.position.z += Math.sin(u.fa * 0.8) * dt * 1.2;
}
if (C.hop > 0) {
C.hop = Math.max(0, C.hop - dt);
C.g.position.y = kzHeight(C.g.position.x, C.g.position.z) + Math.abs(Math.sin(C.hop * 9)) * 0.35;
}
if (C.g.userData.anim && Math.abs(C.g.position.x - L.x) < 70 && Math.abs(C.g.position.z - L.z) < 70)
try {
C.g.userData.anim(KZ.t, dt);
}
catch (e) { }
});
if (!KZ.ride && KZ.rideView) {
if (typeof meView !== "undefined")
meView = KZ.rideView;
KZ.rideView = null;
}
kzPeopleCull(dt, L);
kzCarouselTick(dt);
kzZooTick(dt);
if (typeof kzWaysTick === "function")
kzWaysTick(dt, L);
kzCircusTick(dt, L);
kzTuneTick(dt, L);
kzPadsTick(dt, L);
kzCloudsTick(dt, L);
kzLanternTick(dt);
kzGlowsTick(dt);
(KZ.finds || []).forEach(function (F) { if (F.hidden && Date.now() > F.hidden) {
F.hidden = 0;
F.g.visible = true;
} });
var G = KZ.game, gameLine = "";
if (G) {
if (G.t !== undefined) {
G.t -= dt;
}
if (G.k === "bubbles") {
G.n += pops;
gameLine = " · 🫧 " + G.n + " of " + G.need + " · ⏳ " + Math.max(0, Math.ceil(G.t)) + "s";
if (G.n >= G.need) {
KZ.game = null;
KZ.bubbles.forEach(function (B) { if (B.catch)
B.pop = 0.001; });
kzWin("bubbles", "<b>Fifteen bubbles popped!</b>");
}
else if (G.t <= 0) {
KZ.game = null;
KZ.bubbles.forEach(function (B) { if (B.catch)
B.pop = 0.001; });
setStatus("<b>The sand ran out</b> with " + G.n + " bubbles popped. Have another go!");
}
}
else if (G.k === "tune") {
gameLine = " · 🍄 " + (G.play < G.seq.length ? "listen…" : "your turn: " + G.got.length + " of " + G.seq.length);
if (G.t <= 0)
KZ.game = null;
}
else if (G.k === "toss") {
gameLine = " · ⭕ Ring Toss: " + (KZ.toss && KZ.toss.on ? KZ.toss.on.hits + " landed, " + KZ.toss.on.left + " to throw" : "");
}
else if (G.k === "pads") {
gameLine = " · 🪷 hop to the Lotus Island";
if (G.t <= 0) {
KZ.game = null;
}
}
}
var room = kzRoomAt(L.x, L.z), site = room ? null : kzSiteAt(L.x, L.z);
if (KZ.onPlat && KZ.deckY && Math.abs(feet - KZ.deckY) < 0.6)
site = "the Great Treehouse deck";
worldBanner("<b>🧚 The Kids Zone</b> · " + esc(room ? room.name : site || KZ_NAME) + " · <span style='color:#9AF0B0'>always safe</span>" + gameLine + kzArrow(L));
KZ.pt += dt;
if (KZ.pt < 0.15)
return;
KZ.pt = 0;
if (KZP.open || KZ.ride) {
worldPrompt(null);
return;
}
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
if (KZ.homeDoor && Math.hypot(L.x - KZ.homeDoor.x, L.z - KZ.homeDoor.z) < 3.6 && feet < kzHeight(L.x, L.z) + 1)
return worldPrompt("<b>The Rainbow Toadstool</b> · <b>press E</b> to go back to Faerie", kzHome);
var aim = kzWallAim();
if (aim) {
var c = KZ_WALL_COLS[KZ.wall.hold];
return worldPrompt("🖌️ <b>press E</b> to colour " + esc(aim.name) + " <span style='color:#" + ("00000" + c[0].toString(16)).slice(-6) + "'>●</span> " + c[1], function () { kzWallPaint(aim); });
}
var best = null, bd = 1e9, high = KZ.deckY && feet > KZ.deckY - 2;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
KZ.talk.forEach(function (T) {
if (high)
return;
var tp = kzTalkPos(T), x = tp.x, z = tp.z;
cand(x, z, T.r, T.fn ? T.fn : function () { T.p.g.rotation.y = Math.atan2(L.x - x, L.z - z); wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to " + (T.fn ? "talk" : "talk"));
});
KZ.spots.forEach(function (s) {
if (s.high && !high)
return;
if (!s.high && high)
return;
if (s.find && s.find.hidden)
return;
cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (!high && Math.hypot(L.x - KZ_SITE.critters.x, L.z - KZ_SITE.critters.z) < 34)
KZ.critters.forEach(function (C) { if (!C.kind)
return; cand(C.g.position.x, C.g.position.z, 2.4, function () { kzFeed(C); }, "<b>" + esc(C.name.replace(/^an? /, "").replace(/^./, function (m) { return m.toUpperCase(); })) + "</b> · <b>press E</b> to feed a clover"); });
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
},
function () {
KZ.game = null;
KZ.ride = null;
worldHome("<b>Back through the Rainbow Toadstool</b> into Faerie. Wonderglen will be here whenever you want to play.");
var b = KZD.at;
if (b && typeof LD !== "undefined" && LD.g) {
camera.position.x = LD.ox + b.x + Math.sin(b.rot) * 4.4;
camera.position.z = LD.oz + b.z + Math.cos(b.rot) * 4.4;
yaw = b.rot;
}
},
function (opt) {
var d = KZ.homeDoor || { x: 0, z: 226 };
camera.position.set(KZ.base + d.x, kzHeight(d.x, d.z - 2) + 1.72, d.z - 2);
yaw = 0;
pitch = 0;
KZ.game = null;
KZ.ride = null;
KZ.onPlat = null;
KZ.fed = kzLocalGet("fed:" + kzToday()) || {};
kzLoad(true);
if (typeof loadStock === "function" && kzSigned())
loadStock();
setStatus("<b>The Kids Zone!</b> You tumble out of the Rainbow Toadstool into Wonderglen, where it is always a golden afternoon: bubbles drifting, mushrooms singing, a carousel turning and a treehouse up in the clouds. " +
"Read the board ahead to see everything there is to do. It's all free, and nobody can be hurt here.");
},
function () {
if (typeof LD === "undefined" || !LD.g || LD.kind !== "faerie")
return;
var r = (typeof realmById === "function") ? realmById(LD.rid) : null, taken = r && typeof ldTaken === "function" ? ldTaken(r) : [];
var others = [];
try {
Object.keys(GR.gates || {}).forEach(function (k) { var g = GR.gates[k]; if (g && g.land)
others.push(g); });
}
catch (e) { }
var best = null;
for (var rr = 40; rr <= 150 && !best; rr += 10) {
for (var a = 0; a < 16 && !best; a++) {
var an = a / 16 * Math.PI * 2 + 2.1, x = Math.sin(an) * rr, z = Math.cos(an) * rr, ok = typeof ldClear === "function" ? ldClear(taken, x, z, 9) : true;
for (var u = -7; u <= 7 && ok; u += 3.5)
for (var v = -7; v <= 7 && ok; v += 3.5)
if (worldSolidAt(LD.solids, x + u, z + v, 0))
ok = false;
others.forEach(function (o) { if (Math.hypot(o.x - x, o.z - z) < 30)
ok = false; });
if (ok) {
var h0 = ldY(x, z), lo = h0, hi = h0;
for (var q = -6; q <= 6; q += 3) {
var hq = ldY(x + q, z), hz = ldY(x, z + q);
lo = Math.min(lo, hq, hz);
hi = Math.max(hi, hq, hz);
}
if (hi - lo < 2.5)
best = { x: x, z: z, rot: Math.atan2(-x, -z), y: lo - 0.1 };
}
}
}
if (!best)
best = { x: -50, z: 30, rot: Math.atan2(50, -30), y: ldY(-50, 30) };
var g = new THREE.Group();
g.position.set(best.x, best.y, best.z);
g.rotation.y = best.rot + Math.PI;
g.userData.ldKeep = 1;
g.name = "kz-rainbow-toadstool";
kzStripedToadstool(g, 1.1);
var sg = kzTwoSided(["THE KIDS ZONE", "through the Rainbow Toadstool · press E"], 3.2, 0.8, "#5A2E7A", "#FFF2C8");
sg.position.set(0, 3.5, -3.8);
sg.rotation.y = Math.PI;
g.add(sg);
var gl = wGlow(0xF0A8D8, 4, 0.1);
gl.position.set(0, 1.6, -3);
g.add(gl);
LD.g.add(g);
LD.solids.push({ x: best.x, z: best.z, r: 2.7, h: 6 });
var fx = best.x + Math.sin(best.rot) * 3.6, fz = best.z + Math.cos(best.rot) * 3.6;
LD.talkers.push({ x: fx, z: fz, r: 3.4, name: "The Rainbow Toadstool", verb: "step into the Kids Zone", kzGo: true });
KZD.at = best;
if (!KZD.told) {
KZD.told = true;
setTimeout(function () { if (typeof LD !== "undefined" && LD.kind === "faerie")
setStatus("<b>New in Faerie:</b> the <b>Rainbow Toadstool</b>, a great striped toadstool with a round door, nearby: the way into <b>the Kids Zone</b>."); }, 3500);
}
},
function () {
if (typeof LD !== "undefined") {
LD.near = null;
if (LD.prompted) {
worldPrompt(null);
LD.prompted = false;
}
}
kzLoad(true).then(function () {
var ok = kzMayEnter();
if (!ok.ok)
return setStatus(esc(ok.say));
var P = camera.position, b = KZD.at;
var from = b ? { here: store.here || 0, x: LD.ox + b.x + Math.sin(b.rot) * 4.4, y: P.y, z: LD.oz + b.z + Math.cos(b.rot) * 4.4, yaw: b.rot, name: "the Rainbow Toadstool" } : null;
worldGo("kidszone", from ? { from: from } : {});
});
},
function (dt, L) {
KZ.cullT = (KZ.cullT || 0) - dt;
if (KZ.cullT > 0)
return;
KZ.cullT = 0.4;
var far = KZ_LITE ? 75 : 120, f2 = far * far;
for (var i = 0; i < KZ.people.length; i++) {
var g = KZ.people[i].g;
if (!g || g.parent !== KZ.G)
continue;
var dx = g.position.x - L.x, dz = g.position.z - L.z, out = dx * dx + dz * dz > f2;
if (out && g.visible) {
g.visible = false;
g.userData.kzCulled = 1;
}
else if (!out && g.userData.kzCulled) {
g.visible = true;
g.userData.kzCulled = 0;
}
}
},
function (k, say) {
var G = kzsGot(), first = !G[k], S = KZS_STAMPS.filter(function (s) { return s[0] === k; })[0];
G[k] = Date.now();
kzLocalSet("samhain26", G);
var n = KZS_STAMPS.filter(function (s) { return G[s[0]]; }).length, all = first && n === KZS_STAMPS.length;
kzsCard(say + (first && S ? "<div style='margin-top:6px'><b>" + S[2] + " New Samhain stamp: " + esc(S[1]) + "!</b> (" + n + " of " + KZS_STAMPS.length + ")</div>" : "") + (all ? "<div style='margin-top:6px;font-size:15px'><b>🌙 All six! You are a Little Moon of Samhain.</b> Mistress Moonlantern pins a little silver moon on you.</div>" : ""));
if (first)
kzConfetti();
},
function (c, W, H, kind) {
c.fillStyle = "#2A1206";
c.lineWidth = 0;
var cx = W / 2, cy = H / 2;
function eye(x, y, r) { c.beginPath(); c.arc(x, y, r, 0, 6.3); c.fill(); }
if (kind === "sleepy") {
c.strokeStyle = "#2A1206";
c.lineWidth = 7;
c.beginPath();
c.arc(cx - 30, cy - 14, 14, 0.2, 2.9);
c.stroke();
c.beginPath();
c.arc(cx + 30, cy - 14, 14, 0.2, 2.9);
c.stroke();
c.beginPath();
c.arc(cx, cy + 22, 10, 0, 6.3);
c.fill();
return;
}
if (kind === "surprised") {
eye(cx - 30, cy - 14, 14);
eye(cx + 30, cy - 14, 14);
c.beginPath();
c.arc(cx, cy + 26, 16, 0, 6.3);
c.fill();
return;
}
if (kind === "silly") {
eye(cx - 30, cy - 16, 12);
eye(cx + 28, cy - 12, 16);
c.beginPath();
c.arc(cx, cy + 12, 34, 0.15, Math.PI - 0.15);
c.fill();
c.fillStyle = "#E8507A";
c.beginPath();
c.arc(cx + 8, cy + 40, 10, 0, 3.2);
c.fill();
return;
}
eye(cx - 30, cy - 14, 13);
eye(cx + 30, cy - 14, 13);
c.beginPath();
c.arc(cx, cy + 8, 36, 0.25, Math.PI - 0.25);
c.lineTo(cx - 30, cy + 18);
c.fill();
},
function (kind, turnip) {
var k = "kzsface" + kind + (turnip ? "t" : "");
if (KZ_MAT[k])
return KZ_MAT[k];
var cv = document.createElement("canvas");
cv.width = cv.height = 128;
var c = cv.getContext("2d");
c.fillStyle = turnip ? "#E8DCC0" : "#F08A20";
c.fillRect(0, 0, 128, 128);
c.globalAlpha = 0.18;
c.fillStyle = "#7A3A0A";
for (var i = 0; i < 6; i++)
c.fillRect(i * 22, 0, 4, 128);
c.globalAlpha = 1;
kzsFace(c, 128, 128, kind);
var t = new THREE.CanvasTexture(cv);
return (KZ_MAT[k] = new THREE.MeshLambertMaterial({ map: t, emissive: new THREE.Color(0xFF9A30), emissiveIntensity: 0.35 }));
},
function (G, x, z, kind, turnip, s) {
s = s || 1;
var y = kzHeight(x, z), g = kzAt(G, x, z, kzFace(x, z, KZ_SITE.samhain.x, KZ_SITE.samhain.z), y);
var b = wSph((turnip ? 0.32 : 0.42) * s, kzsFaceMat(kind, turnip), 0, (turnip ? 0.3 : 0.38) * s, 0, g, 16);
b.scale.y = turnip ? 0.95 : 0.8;
b.rotation.y = -Math.PI / 2;
b.userData.keep = 1;
wCyl(0.04 * s, 0.05 * s, 0.16 * s, kzM(turnip ? 0x6A9A3A : 0x4A6A2A), 0, (turnip ? 0.62 : 0.7) * s, 0, g, 6);
var gl = wGlow(0xFFA040, 1.4 * s, 0.35);
gl.position.set(0, 0.4 * s, 0);
g.add(gl);
return g;
},
function (G) {
KZS.lit = [];
KZS.apple = null;
if (!kzsOn())
return;
var S = KZ_SITE.samhain, y0 = kzHeight(S.x, S.z);
var ag = kzAt(G, S.x - 6, S.z + 14, kzFace(S.x - 6, S.z + 14, 0, 180));
[-2.2, 2.2].forEach(function (lx) { wCyl(0.18, 0.22, 4.2, kzM(0x141018), lx, 2.1, 0, ag, 10); kzSolidIn(ag, lx, 0, 0.25, 0.25, 4.2); wSph(0.26, kzM(0xC8CCD8), lx, 4.35, 0, ag, 12); });
wBox(4.8, 0.3, 0.3, kzM(0x141018), 0, 4.1, 0, ag);
var moon = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.16, 8, 24, Math.PI * 1.25), kzGlowM(0xE8ECF8, 0.55));
moon.position.set(0, 5.2, 0);
moon.rotation.z = -0.9;
ag.add(moon);
kzSign(G, S.x - 6, S.z + 15.2, kzFace(S.x - 6, S.z + 14, 0, 180), ["THE LITTLE MOONS' SAMHAIN", "from the Temple of the Obsidian Moon"], 4.2, 0.7, "#141018", "#FFB060", 3.4);
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, px = S.x + Math.cos(a) * 15, pz = S.z + Math.sin(a) * 15;
if (Math.hypot(px - (S.x - 6), pz - (S.z + 14)) < 4)
continue;
var pg = kzAt(G, px, pz, 0);
wCyl(0.08, 0.1, 2.6, kzM(0x141018), 0, 1.3, 0, pg, 6);
kzRingIn(pg, 0, 0, 0.15, 2.6);
var nx = S.x + Math.cos(a + Math.PI / 6) * 15, nz = S.z + Math.sin(a + Math.PI / 6) * 15;
for (var f = 1; f < 6; f++) {
var t = f / 6, fx = px + (nx - px) * t, fz = pz + (nz - pz) * t, fy = kzHeight(fx, fz) + 2.5 - Math.sin(t * Math.PI) * 0.5;
var fl = wCone(0.16, 0.34, kzM([0xF08A20, 0xC8CCD8, 0x6A3A9A][f % 3]), fx, fy, fz, G, 3);
fl.rotation.x = Math.PI;
}
}
var faces = ["happy", "silly", "sleepy", "surprised"];
for (var l = 0; l < (KZ_LITE ? 8 : 16); l++) {
var la = l / (KZ_LITE ? 8 : 16) * Math.PI * 2 + 0.1;
kzsLantern(G, S.x + Math.cos(la) * 12.5, S.z + Math.sin(la) * 12.5, faces[l % 4], l % 3 === 0, 1);
}
var fx0 = S.x, fz0 = S.z, fg = kzAt(G, fx0, fz0, 0);
for (var st = 0; st < 12; st++) {
var sa = st / 12 * Math.PI * 2, ss = wSph(0.32, kzM(0x8A8A90), Math.cos(sa) * 1.3, 0.15, Math.sin(sa) * 1.3, fg, 8);
ss.scale.y = 0.6;
}
for (var lg = 0; lg < 3; lg++) {
var lo = wCyl(0.12, 0.12, 1.4, kzM(0x6A4020), 0, 0.2, 0, fg, 6);
lo.rotation.z = Math.PI / 2;
lo.rotation.y = lg * 1.05;
}
KZS.flames = [];
for (var fl2 = 0; fl2 < 5; fl2++) {
var c = wCone(0.2 - fl2 * 0.02, 0.9 - fl2 * 0.08, kzBasic([0xFF8A20, 0xFFB040, 0xFFD060, 0xFF7020, 0xFFA030][fl2], { op: 0.85 }), Math.cos(fl2 * 1.3) * 0.25, 0.6, Math.sin(fl2 * 1.3) * 0.25, fg, 7);
KZS.flames.push(c);
}
var big = wGlow(0xFF8A30, 6, 0.4);
big.position.set(0, 1, 0);
fg.add(big);
kzRingIn(fg, 0, 0, 1.8, 1.5);
[0, 1, 2, 3, 4].forEach(function (k) { var ba = k / 5 * Math.PI * 2 + 0.6, lx = Math.cos(ba) * 4.2, lz = Math.sin(ba) * 4.2, b2 = wCyl(0.28, 0.28, 1.8, kzM(0x8A5A2A), lx, 0.28, lz, fg, 8); b2.rotation.z = Math.PI / 2; b2.rotation.y = -ba; });
kzSpot(fx0, fz0 + 3, 2.6, "🔥 The Story Fire", "hear the Samhain story", function () { kzsStory(); });
var cx = S.x + 8, cz = S.z - 4, cg = kzAt(G, cx, cz, kzFace(cx, cz, S.x, S.z));
wBox(2.8, 0.08, 1.1, kzM(0x9A6A3A), 0, 0.78, 0, cg);
[-1.2, 1.2].forEach(function (lx) { [-0.4, 0.4].forEach(function (lz) { wBox(0.1, 0.78, 0.1, kzM(0x7A4A2A), lx, 0.39, lz, cg); }); });
kzSolidIn(cg, 0, 0, 1.5, 0.6, 1);
KZS.carveG = cg;
kzsCarvedShow();
kzSpot(cx + Math.sin(cg.rotation.y) * 1.6, cz + Math.cos(cg.rotation.y) * 1.6, 2.2, "🎃 The Carving Table", "carve a lantern", function () { kzsCarve(); });
var px2 = S.x - 8, pz2 = S.z - 4, sg = kzAt(G, px2, pz2, kzFace(px2, pz2, S.x, S.z));
[-1.1, 1.1].forEach(function (lx) { wCyl(0.08, 0.1, 2.6, kzM(0x5A3A1A), lx, 1.3, 0, sg, 6); kzSolidIn(sg, lx, 0, 0.15, 0.15, 2.6); });
wCyl(0.06, 0.06, 2.4, kzM(0x5A3A1A), 0, 2.55, 0, sg, 6).rotation.z = Math.PI / 2;
var pv = new THREE.Group();
pv.position.set(0, 2.5, 0);
sg.add(pv);
wCyl(0.008, 0.008, 0.9, kzM(0xE8E0C8), 0, -0.45, 0, pv, 4);
var ap = wSph(0.13, kzM(0xD82A1A), 0, -0.98, 0, pv, 12);
wCyl(0.01, 0.01, 0.08, kzM(0x4A2A0A), 0, -0.84, 0, pv, 4);
KZS.apple = { pv: pv, ap: ap, hits: 0 };
kzSpot(px2 + Math.sin(sg.rotation.y) * 1.4, pz2 + Math.cos(sg.rotation.y) * 1.4, 2, "🍎 Snap-Apple", "snap at the apple (no hands!)", function () { kzsSnap(); });
var hx = S.x + 5, hz = S.z - 10, hg = kzAt(G, hx, hz, kzFace(hx, hz, S.x, S.z));
wBox(3.2, 0.08, 1.2, kzM(0xC8A060), 0, 0.8, 0, hg);
wBox(3.3, 0.04, 1.3, kzM(0xE87A1A), 0, 0.85, 0, hg);
[-1.4, 1.4].forEach(function (lx) { [-0.45, 0.45].forEach(function (lz) { wBox(0.1, 0.8, 0.1, kzM(0x8A6A3A), lx, 0.4, lz, hg); }); });
kzSolidIn(hg, 0, 0, 1.7, 0.7, 1);
for (var h = 0; h < (KZ_LITE ? 5 : 9); h++) {
var hh = wSph(0.12, kzM([0xD82A1A, 0x9A6A2A, 0xE8A020, 0x6AA03A][h % 4]), -1.3 + h * (KZ_LITE ? 0.65 : 0.32), 0.95, -0.3 + ((h * 7) % 3) * 0.2, hg, 10);
}
for (var sh = 0; sh < 3; sh++) {
var w = wCone(0.12, 0.7, kzM(0xD8B060), -1.2 + sh * 1.2, 1.2, 0.4, hg, 6);
}
KZS.harvestG = hg;
kzsHarvestShow();
kzSpot(hx + Math.sin(hg.rotation.y) * 1.6, hz + Math.cos(hg.rotation.y) * 1.6, 2.2, "🌾 The Harvest Table", "give something to the table", function () { kzsHarvest(); });
var rx = S.x - 5, rz = S.z + 8, rg = kzAt(G, rx, rz, kzFace(rx, rz, S.x, S.z));
[-1, 1].forEach(function (lx) { wCyl(0.04, 0.04, 1.8, kzM(0xC8CCD8), lx, 0.9, 0, rg, 6); });
wCyl(0.03, 0.03, 2.1, kzM(0xC8CCD8), 0, 1.8, 0, rg, 6).rotation.z = Math.PI / 2;
[0xFFFFFF, 0x141418, 0xF08A20, 0x6A3A9A, 0x8A6A4A].forEach(function (col, i) { wBox(0.32, 0.9, 0.08, kzM(col), -0.8 + i * 0.4, 1.3, 0, rg); });
kzSolidIn(rg, 0, 0, 1.1, 0.25, 1.9);
kzSpot(rx + Math.sin(rg.rotation.y) * 1.4, rz + Math.cos(rg.rotation.y) * 1.4, 2.2, "🎭 The Costume Rail", "dress up for the parade", function () { kzsParade(); });
var gx = S.x + 6, gz = S.z + 9, gg = kzAt(G, gx, gz, kzFace(gx, gz, S.x, S.z));
var stn = wBox(2.2, 0.5, 0.8, kzM(0x5A5A62), 0, 0.25, 0, gg);
kzSolidIn(gg, 0, 0, 1.15, 0.45, 0.6);
KZS.candleG = gg;
kzsCandlesShow();
kzSpot(gx + Math.sin(gg.rotation.y) * 1.4, gz + Math.cos(gg.rotation.y) * 1.4, 2, "🕯️ The Goodnight Stone", "light a candle for someone you miss", function () { kzsGoodnight(); });
var qx = S.x - 11, qz = S.z + 2, qg = kzAt(G, qx, qz, kzFace(qx, qz, S.x, S.z));
wCyl(0.55, 0.65, 1.0, kzM(0x141018), 0, 0.5, 0, qg, 16);
wCyl(0.62, 0.62, 0.06, kzM(0xC8CCD8), 0, 1.02, 0, qg, 16);
var dome = wSph(0.5, kzM(0xE8F0FF, { op: 0.18 }), 0, 1.05, 0, qg, 18);
dome.scale.y = 4.4;
dome.position.y = 1.05 + 0.95;
dome.userData.keep = 1;
kzRingIn(qg, 0, 0, 0.7, 3);
if (typeof shctSceptre === "function") {
var sc = shctSceptre();
sc.position.y = 1.05;
qg.add(sc);
KZS.sceptre = sc;
}
var qr = qg.rotation.y;
kzSign(G, qx + 0.8 * Math.sin(qr) + 2.3 * Math.cos(qr), qz + 0.8 * Math.cos(qr) - 2.3 * Math.sin(qr), qr, ["THE HALLOWEEN SCEPTRE", "most candy wins · press E"], 2.2, 0.55, "#141018", "#FFB060");
KZS.sceptreAt = { x: qx + 2.4 * Math.sin(qg.rotation.y), z: qz + 2.4 * Math.cos(qg.rotation.y), ry: qg.rotation.y };
kzSpot(KZS.sceptreAt.x, KZS.sceptreAt.z, 2.2, "🎃 The Halloween Sceptre", "see who has the most candy", function () { if (typeof shctBoard === "function")
shctBoard(); });
kzSign(G, S.x + 12, S.z + 8, kzFace(S.x + 12, S.z + 8, S.x, S.z), ["SAMHAIN FOR LITTLE MOONS", "press E: what's on"], 2.8, 0.8, "#141018", "#FFB060");
kzSpot(S.x + 11, S.z + 7, 2.4, "🌙 The Little Moons' board", "see what's on", function () { kzsBoard(); });
kzFolkAt(["samhain", "Mistress Moonlantern", "the Little Moons' Samhain guide from the Temple of the Obsidian Moon", "Hello, little moon! It's Samhain, the old Irish new year. Shall we carve a lantern, or hear the story at the fire?",
"Today is Samhain (say it 'SOW-in'), the old Irish festival at the end of October when the harvest was in and winter began. You lead the children's Samhain in Wonderglen: lantern carving (the first jack-o'-lanterns in Ireland and Scotland were turnips), snap-apple, the harvest table, the story of young Fionn at Tara, guising in costumes, and a goodnight candle for someone they miss. You are cosy, funny and never spooky; if a child is sad about someone who has died, you are gentle and tell them it is good to remember."], S.x + 2, S.z + 4, kzFace(S.x + 2, S.z + 4, S.x - 6, S.z + 14), { wander: null });
},
function () {
var g = KZS.carveG;
if (!g)
return;
(KZS.carved || []).forEach(function (m) { g.remove(m); });
KZS.carved = [];
var L = (kzLocalGet("samhain26lan") || []).slice(-5);
L.forEach(function (k, i) { var m = wSph(0.2, kzsFaceMat(k.f, k.t), -1 + i * 0.5, 1.0, 0, g, 14); m.scale.y = 0.85; m.rotation.y = -Math.PI / 2; KZS.carved.push(m); });
},
function () {
var g = KZS.harvestG;
if (!g)
return;
(KZS.given || []).forEach(function (m) { g.remove(m); });
KZS.given = [];
var L = (kzLocalGet("samhain26har") || []).slice(-6);
L.forEach(function (k, i) {
var col = { apple: 0xD82A1A, nut: 0x8A5A2A, leaf: 0xE8801A, drawing: 0xF8F0E0 }[k] || 0xFFFFFF, x = -1.2 + i * 0.48;
var m = k === "drawing" ? wBox(0.3, 0.02, 0.22, kzM(col), x, 0.88, 0.35, g) : k === "leaf" ? wBox(0.22, 0.02, 0.14, kzM(col), x, 0.88, 0.35, g) : wSph(k === "nut" ? 0.07 : 0.11, kzM(col), x, 0.95, 0.35, g, 10);
KZS.given.push(m);
});
},
function () {
var g = KZS.candleG;
if (!g)
return;
(KZS.cand || []).forEach(function (m) { g.remove(m); });
KZS.cand = [];
var n = Math.min(7, (kzLocalGet("samhain26cdl") || []).length + 3);
for (var i = 0; i < n; i++) {
var x = -0.9 + i * 0.3, c = wCyl(0.04, 0.04, 0.22, kzM(0xF8F0E0), x, 0.61, 0, g, 8), f = wCone(0.03, 0.08, kzBasic(0xFFC040), x, 0.77, 0, g, 6), gl = wGlow(0xFFB040, 0.4, 0.5);
gl.position.set(x, 0.78, 0);
g.add(gl);
KZS.cand.push(c, f, gl);
}
},
function (said, extra, fns) {
var N = kzsNow(), G = kzsGot(), n = KZS_STAMPS.filter(function (s) { return G[s[0]]; }).length;
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFB060'>🌙 The Little Moons' Samhain</div>" +
"<div style='opacity:.8;font-size:12.5px'>" + (N.item ? "Now with Mistress Moonlantern: <b>" + esc(N.item[3]) + "</b>" : N.next ? "Next with Mistress Moonlantern: " + esc(N.next[3]) + " at " + kzsTime(kzsStart() + N.next[1] * 60000) : "Play any of the six, any time") + " · Samhain stamps: " + n + " of 6</div>" +
(said ? "<div style='margin:8px 0;padding:8px 10px;border-left:3px solid #F08A20;background:rgba(240,138,32,.1)'>" + said + "</div>" : "") + (extra || "");
fns = fns || {};
h += worldBtn("board", "🌙 What's on", "all six, and when Mistress Moonlantern leads them");
fns.board = function () { kzsBoard(); };
worldCard(h, fns);
},
function () {
var G = kzsGot(), st = kzsStart(), N = kzsNow(), L = typeof OTM_SP_KIDS !== "undefined" ? OTM_SP_KIDS : [], h = "", fns = {};
h += "<div style='font:600 17px var(--serif,Georgia);color:#FFB060'>🌙 The Little Moons' Samhain</div><div style='opacity:.85;font-size:12.5px;margin-bottom:6px'>" + (kzsOn() ? "In the Kids Zone by the Welcome Glade, under the crescent-moon arch. Samhain (say it SOW-in) is the old Irish festival when the harvest was in and winter began. Play any of these any time today; Mistress Moonlantern leads each one at its time." : "Samhain comes at the end of October. Come back then!") + "</div>";
L.forEach(function (r) {
var S = KZS_STAMPS.filter(function (s) { return s[0] === r[0]; })[0] || ["", "", "🍬"], now = N.item === r;
h += "<div style='margin:5px 0;" + (now ? "background:rgba(240,138,32,.16);" : "") + "'>" + (r[0] === "trick" ? "🏆" : G[r[0]] ? "✅" : "⬜") + " " + S[2] + " <b>" + esc(r[3]) + "</b> <span style='opacity:.7'>" + kzsTime(st + r[1] * 60000) + "</span><div style='opacity:.75;font-size:12px;margin-left:24px'>" + esc(r[4]) + "</div></div>";
});
h += "<div style='opacity:.65;font-size:11.5px'>Times are Arizona time, the Temple's clock. The grown-ups' Samhain is in the Temple of the Obsidian Moon.</div>";
if (typeof shctBoard === "function") {
h += worldBtn("tt", "🍬 Trick-or-Treat and the Halloween Sceptre", "who has the most candy, and how to play");
fns.tt = function () { shctBoard(); };
}
if (typeof kidsZoneHere === "function" && !kidsZoneHere() && typeof kzGo === "function" && kzsOn()) {
h += worldBtn("go", "🧚 Go to the Kids Zone", "");
fns.go = function () { worldCard(null); kzGo(); };
}
worldCard(h, fns);
},
function () {
var fns = {}, h = "<div style='margin:6px 0'>Choose your lantern, then choose its face. Long ago in Ireland and Scotland children carved lanterns from <b>turnips</b>; in America they found pumpkins were bigger and easier to carve.</div>";
[["pumpkin", "🎃 A pumpkin"], ["turnip", "🥔 A turnip (the old way)"]].forEach(function (t) {
["happy", "silly", "sleepy", "surprised"].forEach(function (f) {
var k = t[0] + f;
h += worldBtn(k, t[1] + ", " + f, "");
fns[k] = function () {
var L = kzLocalGet("samhain26lan") || [];
L.push({ f: f, t: t[0] === "turnip" });
kzLocalSet("samhain26lan", L.slice(-10));
kzsCarvedShow();
kzsStamp("lanterns", "You scoop out the inside and carve a " + f + " face, then Mistress Moonlantern pops a little light in it. Your " + t[0] + " lantern glows on the table! The old story says lanterns were carved to light the way home on Samhain night.");
};
});
});
kzsCard("", h, fns);
},
function () {
var A = KZS.apple;
if (!A) {
kzsCard("The apple isn't hanging just now.");
return;
}
var low = Math.abs(Math.sin(KZS.swing)) < 0.35;
if (low) {
A.hits++;
if (A.hits >= 3) {
A.hits = 0;
kzsStamp("snapapple", "CHOMP! You caught the apple with your teeth, no hands, three times! Snap-apple is an old Halloween game from Ireland; in 1833 an Irish painter, Daniel Maclise, painted a whole party playing it.");
return;
}
kzsCard("Chomp! You got a bite of the apple. " + (3 - A.hits) + " more to go. Try when the apple swings down low.");
}
else
kzsCard("Whoosh! The apple swung away and bumped your nose. Wait until it swings down low in front of you, then press E.");
},
function () {
var fns = {}, h = "<div style='margin:6px 0'>At Samhain the harvest was all gathered in for the winter. Lay something on the table and say thank you to the year.</div>";
[["apple", "🍎 A shiny apple"], ["nut", "🌰 A hazelnut"], ["leaf", "🍂 An orange leaf"], ["drawing", "🖍️ A drawing of your favourite thing this year"]].forEach(function (o) {
h += worldBtn(o[0], o[1], "");
fns[o[0]] = function () {
var L = kzLocalGet("samhain26har") || [];
L.push(o[0]);
kzLocalSet("samhain26har", L.slice(-12));
kzsHarvestShow();
kzsStamp("harvest", "You lay " + o[1].replace(/^\S+ /, "").toLowerCase() + " on the harvest table and say: <i>thank you, year!</i> The hazelnut was special to the old Irish: in their stories, the Salmon of Knowledge ate the hazelnuts of wisdom.");
};
});
kzsCard("", h, fns);
},
function () {
var fns = {}, h = "<div style='margin:6px 0;line-height:1.45'>Mistress Moonlantern tells the story by the fire:<br><br>Long ago in Ireland, the High King lived at a great hall called <b>Tara</b>. But every Samhain night a fairy musician called <b>Aillen</b> came out of a fairy hill with a little harp. He played music so sleepy that everybody fell fast asleep, and while they snored, he puffed fire at the hall!<br><br>One Samhain, a boy called <b>Fionn</b>, only ten years old, said, \"I will stay awake.\" When the sleepy music began, Fionn held the cold tip of a spear to his forehead, so he could not nod off. Aillen played and played, but Fionn stayed awake, and he chased Aillen away for good. The king was so glad that he made Fionn the leader of his brave band, the Fianna.<br><br><b>How did Fionn stay awake?</b></div>";
[["a", "He drank lots of milk", 0], ["b", "He held something cold to his forehead", 1], ["c", "He sang a song very loudly", 0]].forEach(function (o) {
h += worldBtn(o[0], o[1], "");
fns[o[0]] = function () {
if (o[2])
kzsStamp("story", "That's right! Fionn held the cold spear tip to his forehead. This story is in very old Irish books, written down hundreds of years ago.");
else
kzsCard("Good guess! Listen again: Fionn held something <b>cold</b> to his forehead. Have another go.", "" + worldBtn("again", "🔥 Hear the story again", ""), { again: kzsStory });
};
});
kzsCard("", h, fns);
},
function () {
var fns = {}, h = "<div style='margin:6px 0'>In Scotland and Ireland, children went <b>guising</b> at Samhain: dressed up in disguise, door to door, and they had to tell a joke or sing a song to earn a treat. Pick your costume!</div>";
[["ghost", "👻 A friendly ghost (a white sheet)"], ["cat", "🐈‍⬛ A black cat"], ["moon", "🌙 A little moon"], ["pumpkin", "🎃 A pumpkin"], ["owl", "🦉 An owl"]].forEach(function (o) {
h += worldBtn(o[0], o[1], "");
fns[o[0]] = function () {
var J = KZS_JOKES[Math.floor(Math.random() * KZS_JOKES.length)], T = ["a rosy apple", "a toffee", "a handful of hazelnuts", "a slice of barmbrack (Irish fruit bread)"][Math.floor(Math.random() * 4)];
kzsStamp("parade", "You put on your " + o[1].replace(/^\S+ /, "").replace(/ \(.*\)/, "").replace(/^an? /, "") + " costume and parade round the lanterns. At Mistress Moonlantern's door you tell your joke: <i>" + esc(J) + "</i> She laughs and gives you " + T + "!");
};
});
kzsCard("", h, fns);
},
function () {
var h = "<div style='margin:6px 0'>At Samhain, families in Ireland kept a candle burning and remembered people they loved who weren't with them any more, even pets. Is there someone you miss? You can say their name, or just light a candle.</div><input id='kzs-name' maxlength='30' placeholder='a name (you don\\'t have to)' style='width:100%;padding:6px;border-radius:4px;border:1px solid #6A4A8A'>" + worldBtn("light", "🕯️ Light the candle", "");
kzsCard("", h, { light: function () {
var e = document.getElementById("kzs-name"), n = (e && e.value || "").trim().slice(0, 30), L = kzLocalGet("samhain26cdl") || [];
L.push(1);
kzLocalSet("samhain26cdl", L.slice(-10));
kzsCandlesShow();
kzsStamp("goodnight", "You light a little candle on the Goodnight Stone" + (n ? " for <b>" + esc(n) + "</b>" : "") + ". It glows warm and steady. Mistress Moonlantern says: \"Remembering someone is a kind of love. Goodnight, old year. Hello, winter.\"");
} });
},
function () {
function there() { var A = KZS.sceptreAt; if (!A)
return; camera.position.set(KZ.base + A.x, kzHeight(A.x, A.z) + 1.72, A.z); if (typeof yaw !== "undefined")
yaw = A.ry + Math.PI; if (typeof pitch !== "undefined")
pitch = -0.1; }
if (typeof kidsZoneHere === "function" && kidsZoneHere()) {
there();
return;
}
if (typeof kzGo === "function") {
kzGo();
var n = 0, iv = setInterval(function () { n++; if (n > 40) {
clearInterval(iv);
return;
} if (typeof kidsZoneHere === "function" && kidsZoneHere() && KZ.built) {
clearInterval(iv);
there();
} }, 500);
}
},
function (key, prims, o, done) {
if (KZAQ.geo[key]) {
done(KZAQ.geo[key]);
return;
}
if (KZAQ.wait[key]) {
KZAQ.wait[key].push(done);
return;
}
KZAQ.wait[key] = [done];
KZAQ.list.push({ key: key, prims: JSON.parse(JSON.stringify(prims)), cell: o.cell, K: o.K, cw: o.cw, pat: o.pat || "", part: o.part || "body", skin: !!o.skin, off: o.off || null });
kzaPump();
},
function () {
if (KZAQ.busy || !KZAQ.list.length)
return;
var J = KZAQ.list.shift();
KZAQ.busy = J;
if (!KZAQ.w && !KZAQ.failed && typeof Worker !== "undefined" && typeof Blob !== "undefined") {
try {
KZAQ.w = new Worker(URL.createObjectURL(new Blob(["(" + kzaWorkerMain.toString() + ")();"], { type: "application/javascript" })));
KZAQ.w.onmessage = function (ev) { kzaDone(ev.data); };
KZAQ.w.onerror = function () { KZAQ.failed = true; KZAQ.w = null; var B = KZAQ.busy; KZAQ.busy = null; if (B) {
KZAQ.list.unshift(B);
} kzaPump(); };
}
catch (e) {
KZAQ.failed = true;
KZAQ.w = null;
}
}
if (KZAQ.w)
KZAQ.w.postMessage(J);
else
setTimeout(function () { if (!KZAQ.local)
KZAQ.local = kzaWorkerMain(); var out; try {
out = KZAQ.local(J);
}
catch (e) {
out = null;
} if (out)
kzaDone(out);
else {
KZAQ.busy = null;
kzaPump();
} }, 30);
},
function (D) {
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(D.pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(D.nor, 3));
G.setAttribute("color", new THREE.BufferAttribute(D.col, 3));
G.setIndex(new THREE.BufferAttribute(D.idx, 1));
G.computeBoundingSphere();
G.userData.kzaShared = 1;
KZAQ.geo[D.key] = G;
var w = KZAQ.wait[D.key] || [];
delete KZAQ.wait[D.key];
KZAQ.busy = null;
w.forEach(function (f) { try {
f(G);
}
catch (e) {
if (window.console)
console.warn("[kids zone] animal", e);
} });
kzaPump();
},
function (G, kind, n, area, o) {
var S = KZA[kind];
if (!S)
return null;
o = o || {};
var lite = KZ_LITE, f = lite ? 1.55 : 1, cell = S.cell * f, skin = S.pat === "skin", H = { S: S, kind: kind, list: [], parts: {}, G: G, area: area, o: o, sc: (S.scale || 1) * (o.scale || 1) };
var R = wRand(o.seed || kind.length * 977);
for (var i = 0; i < n; i++) {
var p = kzaPick(H, R), sc = H.sc * (o.calf && i === n - 1 ? 0.55 : 1) * (0.94 + R() * 0.12);
H.list.push({ x: p.x, z: p.z, yaw: R() * 6.283, tx: p.x, tz: p.z, wait: R() * 6, ph: R() * 6, sp: 0, sc: sc, sink: 0, lean: 0, look: 0, lookT: 0, hop: 0, i: i, id: kind + i });
}
var legs = S.biped ? [{ s: -1, h: 1 }, { s: 1, h: 1 }] : [{ s: -1, h: 0 }, { s: 1, h: 0 }, { s: -1, h: 1 }, { s: 1, h: 1 }];
H.legs = legs;
var want = [["body", S.body, [0, 0, 0]]];
if (S.legF) {
want.push(["uF", S.legF.u, S.hipF]);
want.push(["lF", S.legF.l, [S.hipF[0], S.hipF[1] + S.legF.knee[1], S.hipF[2] + S.legF.knee[2]]]);
}
if (S.legH) {
want.push(["uH", S.legH.u, S.hipH]);
want.push(["lH", S.legH.l, [S.hipH[0], S.hipH[1] + S.legH.knee[1], S.hipH[2] + S.legH.knee[2]]]);
}
if (S.tail)
want.push(["tail", S.tail.s, S.tail.at]);
want.forEach(function (w) {
var part = w[0], cnt = part === "body" || part === "tail" ? n : n * 2;
kzaJob(kind + ":" + part + (lite ? ":l" : ""), w[1], { cell: part === "body" ? cell : cell * 0.9, K: S.K, cw: S.cw, pat: S.pat === "skin" || S.pat === "fur" ? "" : S.pat, part: part === "body" ? "body" : part === "tail" ? "tail" : "leg", skin: skin, off: w[2] }, function (geo) {
if (KZA_ALL.indexOf(H) < 0)
return;
var m = new THREE.InstancedMesh(geo, kzaMat(skin), cnt);
m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
m.frustumCulled = false;
m.userData.keep = 1;
m.userData.noCull = true;
m.name = "kza-" + kind + "-" + part;
m.castShadow = !lite;
m.receiveShadow = false;
m.raycast = function () { };
H.G.add(m);
H.parts[part] = m;
H.dirty = true;
});
});
if (S.eyes && typeof rbkEyeMat === "function") {
if (!RBK.eyeGeo) {
var eg = new THREE.SphereGeometry(1, 20, 14), EP = eg.attributes.position, U = eg.attributes.uv;
for (var q = 0; q < EP.count; q++)
U.setXY(q, EP.getX(q) * 0.5 + 0.5, EP.getY(q) * 0.5 + 0.5);
RBK.eyeGeo = eg;
}
var E = S.eyes[0], em = new THREE.InstancedMesh(RBK.eyeGeo, rbkEyeMat(E.iris, E.pupil), n * 2);
em.frustumCulled = false;
em.userData.keep = 1;
em.userData.noCull = true;
em.raycast = function () { };
em.name = "kza-" + kind + "-eyes";
H.eyeL = [];
[-1, 1].forEach(function (sd) { var o3 = new THREE.Object3D(); o3.position.set(E.p[0] * sd, E.p[1], E.p[2]); o3.scale.setScalar(E.r); o3.lookAt(new THREE.Vector3(E.p[0] * sd + E.d[0] * sd, E.p[1] + E.d[1], E.p[2] + E.d[2])); o3.updateMatrix(); H.eyeL.push(o3.matrix.clone()); });
G.add(em);
H.parts.eyes = em;
}
KZA_ALL.push(H);
return H;
},
function (H, x, z, pad) {
var A = H.area, d = Math.hypot(x - A.x, z - A.z);
if (d > A.r - (pad || 0))
return false;
if (A.avoid)
for (var i = 0; i < A.avoid.length; i++) {
var v = A.avoid[i];
if (Math.hypot(x - v.x, z - v.z) < v.r + (pad || 0))
return false;
}
if (A.water && !H.S.swim && !H.S.wader) {
var W = A.water;
if (Math.hypot(x - W.x, z - W.z) < W.r + 0.5)
return false;
}
return true;
},
function (H, R) {
var A = H.area;
for (var t = 0; t < 40; t++) {
var a = R() * 6.283, d = Math.sqrt(R()) * (A.r - 1.5), x = A.x + Math.cos(a) * d, z = A.z + Math.sin(a) * d;
if (A.water && (H.S.swim || H.S.wader) && R() < 0.5) {
var W = A.water, wa = R() * 6.283, wd = Math.sqrt(R()) * (W.r - 0.8);
x = W.x + Math.cos(wa) * wd;
z = W.z + Math.sin(wa) * wd;
}
if (kzaInArea(H, x, z, (H.S.len || 2) * 0.4))
return { x: x, z: z };
}
return { x: A.x, z: A.z };
},
function (dt, near) {
if (!KZA_M)
KZA_M = { m: new THREE.Matrix4(), a: new THREE.Matrix4(), b: new THREE.Matrix4(), c: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), v: new THREE.Vector3(), s: new THREE.Vector3() };
var M = KZA_M;
KZA_ALL.forEach(function (H) {
var S = H.S, show = near;
for (var k in H.parts)
H.parts[k].visible = show;
if (!show)
return;
var R = Math.random;
H.list.forEach(function (A) {
var dx = A.tx - A.x, dz = A.tz - A.z, d = Math.hypot(dx, dz), moving = false;
if (A.wait > 0) {
A.wait -= dt;
A.sp = Math.max(0, A.sp - dt * 1.5);
}
else if (d < 0.4) {
A.wait = (S.hop ? 3 : 6) + R() * 14;
var p = kzaPick(H, R);
A.tx = p.x;
A.tz = p.z;
}
else {
var want = Math.atan2(dx, dz), da = Math.atan2(Math.sin(want - A.yaw), Math.cos(want - A.yaw)), turn = Math.min(Math.abs(da), dt * (S.heavy ? 0.45 : 0.9));
A.yaw += Math.sign(da) * turn;
var top = (S.walk || 1) * (A.sink > 0.3 ? (S.swim ? 1.4 : 0.7) : 1) * (Math.abs(da) > 0.9 ? 0.25 : 1);
A.sp += (top - A.sp) * Math.min(1, dt * 1.2);
var nx = A.x + Math.sin(A.yaw) * A.sp * dt, nz = A.z + Math.cos(A.yaw) * A.sp * dt;
if (kzaInArea(H, nx, nz, (S.len || 2) * 0.3)) {
A.x = nx;
A.z = nz;
}
else {
A.wait = 1 + R() * 3;
var p2 = kzaPick(H, R);
A.tx = p2.x;
A.tz = p2.z;
}
moving = A.sp > 0.05;
}
var W = H.area.water, inW = W && Math.hypot(A.x - W.x, A.z - W.z) < W.r - 0.3, sinkTo = inW && S.swim ? (S.name === "hippo" ? 0.95 : 0.45) : 0;
A.sink += (sinkTo - A.sink) * Math.min(1, dt * 0.8);
A.ph += dt * (moving ? (S.hop ? A.sp * 3.2 : A.sp / Math.max(0.15, (S.stride || 0.3) * A.sc * 2.2)) : 0) * (S.waddle ? 1.6 : 1);
var hop = 0, bob = 0, roll = 0, pitch = 0;
if (S.hop && moving) {
hop = Math.max(0, Math.sin(A.ph)) * 0.32 * A.sc;
pitch = -0.25 * Math.max(0, Math.sin(A.ph));
}
else if (moving)
bob = Math.abs(Math.sin(A.ph * 2)) * 0.018 * (S.len || 2) * A.sc;
if (S.waddle)
roll = moving ? 0.14 * Math.sin(A.ph * 2) : 0.03 * Math.sin(KZ.t * 1.5 + A.i);
if (A.sink > 0.3 && S.name === "penguin")
pitch = 1.1 * Math.min(1, (A.sink - 0.3) * 3);
var y = (H.o.ground ? H.o.ground(A.x, A.z) : kzHeight(A.x, A.z)) - A.sink * A.sc + hop + bob;
M.e.set(pitch, A.yaw, roll, "YXZ");
M.q.setFromEuler(M.e);
M.v.set(A.x, y, A.z);
var br = 1 + 0.012 * Math.sin(KZ.t * 1.3 + A.i);
M.s.set(A.sc, A.sc * br, A.sc);
M.m.compose(M.v, M.q, M.s);
if (H.parts.body)
H.parts.body.setMatrixAt(A.i, M.m);
if (H.parts.eyes && H.eyeL) {
M.a.multiplyMatrices(M.m, H.eyeL[0]);
H.parts.eyes.setMatrixAt(A.i * 2, M.a);
M.a.multiplyMatrices(M.m, H.eyeL[1]);
H.parts.eyes.setMatrixAt(A.i * 2 + 1, M.a);
}
if (H.parts.tail && S.tail) {
var sw = Math.sin(KZ.t * (moving ? 2.4 : 1.1) + A.i * 1.7) * (moving ? 0.35 : 0.22);
M.e.set(0.1 * Math.sin(KZ.t * 0.7 + A.i), sw, 0, "YXZ");
M.q.setFromEuler(M.e);
M.v.set(S.tail.at[0], S.tail.at[1], S.tail.at[2]);
M.s.set(1, 1, 1);
M.a.compose(M.v, M.q, M.s);
M.b.multiplyMatrices(M.m, M.a);
H.parts.tail.setMatrixAt(A.i, M.b);
}
var fi = 0, hi = 0;
H.legs.forEach(function (Lg, li) {
var front = !Lg.h, hip = front ? S.hipF : S.hipH, LD = front ? S.legF : S.legH;
if (!LD)
return;
var off = S.biped ? (S.hop ? 0 : (Lg.s < 0 ? 0 : Math.PI)) : [0.25, 0.75, 0, 0.5][li] * Math.PI * 2, ph = A.ph + off;
var amp = moving ? (S.hop ? 0.0 : (S.biped ? 0.45 : 0.42)) * Math.min(1, A.sp / ((S.walk || 1) * 0.6)) : 0;
var up = -amp * Math.sin(ph), kn = moving ? Math.max(0, Math.cos(ph)) * (front ? 0.7 : 0.55) * Math.min(1, A.sp / ((S.walk || 1) * 0.6)) : 0;
if (S.hop && moving) {
var s = Math.sin(A.ph);
up = s > 0 ? -0.55 * s : 0.25 * s;
kn = s > 0 ? 0.9 * s : 0;
}
if (A.sink > 0.3 && S.swim) {
up = Math.sin(KZ.t * 3 + li) * 0.3;
kn = 0.3;
}
M.e.set(up, 0, 0, "YXZ");
M.q.setFromEuler(M.e);
M.v.set(hip[0] * Lg.s, hip[1], hip[2]);
M.s.set(1, 1, 1);
M.a.compose(M.v, M.q, M.s);
M.b.multiplyMatrices(M.m, M.a);
var uP = H.parts[front ? "uF" : "uH"], lP = H.parts[front ? "lF" : "lH"], slot = front ? fi++ : hi++;
if (uP)
uP.setMatrixAt(A.i * 2 + slot, M.b);
M.e.set(kn, 0, 0, "YXZ");
M.q.setFromEuler(M.e);
M.v.set(LD.knee[0], LD.knee[1], LD.knee[2]);
M.a.compose(M.v, M.q, M.s);
M.c.multiplyMatrices(M.b, M.a);
if (lP)
lP.setMatrixAt(A.i * 2 + slot, M.c);
});
});
for (var k2 in H.parts) {
H.parts[k2].instanceMatrix.needsUpdate = true;
}
});
},
function (kind, x, z, n, r) {
var H = null;
KZA_ALL.forEach(function (h) { if (h.kind === kind)
H = h; });
if (!H)
return;
H.list.slice().sort(function (a, b) { return Math.hypot(a.x - x, a.z - z) - Math.hypot(b.x - x, b.z - z); }).slice(0, n || 2).forEach(function (A, i) {
var a = i * 2.1 + 0.5, tx = x + Math.cos(a) * (r || 1.5) * (i ? 1 : 0.4), tz = z + Math.sin(a) * (r || 1.5) * (i ? 1 : 0.4);
if (kzaInArea(H, tx, tz, 0.3)) {
A.tx = tx;
A.tz = tz;
A.wait = 0;
}
});
},
function () {
var N = [], E = [];
function node(x, z, site) { for (var i = 0; i < N.length; i++)
if (!N[i].site && !site && Math.hypot(N[i].x - x, N[i].z - z) < 4)
return i; N.push({ x: x, z: z, site: site || null, adj: [] }); return N.length - 1; }
function link(a, b) { if (a === b)
return; if (N[a].adj.some(function (e) { return e.to === b; }))
return; var d = Math.hypot(N[a].x - N[b].x, N[a].z - N[b].z); N[a].adj.push({ to: b, d: d }); N[b].adj.push({ to: a, d: d }); E.push([a, b]); }
KZ_PATHS.forEach(function (p) { var prev = -1; p.forEach(function (q) { var n = node(q[0], q[1]); if (prev >= 0)
link(prev, n); prev = n; }); });
KZ_SITES.forEach(function (s) { var sn = node(s[1], s[2], s[0]); N.forEach(function (n, i) { if (i !== sn && !n.site && Math.hypot(n.x - s[1], n.z - s[2]) < s[3] + 9)
link(sn, i); }); });
KZW.nodes = N;
KZW.edges = E;
},
function (x, z, site) {
if (!KZW.nodes.length)
kzwGraph();
var N = KZW.nodes, goal = -1;
for (var i = 0; i < N.length; i++)
if (N[i].site === site)
goal = i;
if (goal < 0)
return [{ x: x, z: z }];
var dist = N.map(function () { return 1e9; }), next = N.map(function () { return -1; }), done = N.map(function () { return false; });
dist[goal] = 0;
for (var it = 0; it < N.length; it++) {
var u = -1, bd = 1e9;
for (var j = 0; j < N.length; j++)
if (!done[j] && dist[j] < bd) {
bd = dist[j];
u = j;
}
if (u < 0)
break;
done[u] = true;
N[u].adj.forEach(function (e) { if (dist[u] + e.d < dist[e.to]) {
dist[e.to] = dist[u] + e.d;
next[e.to] = u;
} });
}
var start = -1, sd = 1e9;
N.forEach(function (n, k) { if (n.site && n.site !== site)
return; var d = Math.hypot(n.x - x, n.z - z) + dist[k]; if (dist[k] < 1e9 && d < sd) {
sd = d;
start = k;
} });
var out = [{ x: x, z: z }], c = start, guard = 0;
while (c >= 0 && guard++ < 200) {
out.push({ x: N[c].x, z: N[c].z });
if (c === goal)
break;
c = next[c];
}
return out;
},
function (ni) {
var out = {};
KZ_SITES.forEach(function (s) {
if (s[0] === "door" || s[0] === "staff")
return;
var r = kzwRoute(KZW.nodes[ni].x, KZW.nodes[ni].z, s[0]);
if (r.length < 3)
return;
var L = 0;
for (var i = 1; i < r.length; i++)
L += Math.hypot(r[i].x - r[i - 1].x, r[i].z - r[i - 1].z);
var a = Math.atan2(r[2].x - r[1].x, r[2].z - r[1].z), k = Math.round(a / (Math.PI / 12));
(out[k] || (out[k] = { a: a, list: [] })).list.push({ k: s[0], name: s[4], d: L });
});
return out;
},
function () {
if (KZW_TEX)
return KZW_TEX;
KZW_TEX = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#C8C0B4";
x.fillRect(0, 0, W, H);
var R = wRand(808);
for (var row = 0; row < 8; row++)
for (var col = 0; col < 6; col++) {
var cx = (col + (row % 2) * 0.5) * W / 6, cy = row * H / 8 + H / 16, w = W / 6 - 6, h = H / 8 - 6, v = 225 + Math.floor(R() * 30);
x.fillStyle = "rgb(" + v + "," + v + "," + (v - 4) + ")";
x.beginPath();
if (x.roundRect)
x.roundRect(cx - w / 2 + 3, cy - h / 2, w, h, 9);
else
x.rect(cx - w / 2 + 3, cy - h / 2, w, h);
x.fill();
if (cx - w / 2 + 3 + W < W * 2) {
x.beginPath();
if (x.roundRect)
x.roundRect(cx - w / 2 + 3 - W, cy - h / 2, w, h, 9);
else
x.rect(cx - w / 2 + 3 - W, cy - h / 2, w, h);
x.fill();
}
}
}, [1, 1]);
KZW_TEX.wrapS = KZW_TEX.wrapT = THREE.RepeatWrapping;
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
KZW_TEX.encoding = THREE.sRGBEncoding;
return KZW_TEX;
},
function (G) {
var W = 3.6, pos = [], col = [], uv = [], idx = [], kpos = [], kidx = [], c = new THREE.Color(), lamp = 0;
var zoo = KZ_SITE.zoo, lite = KZ_LITE;
function inZoo(x, z) { return zoo && Math.hypot(x - zoo.x, z - zoo.z) < KZ_ZOO_R.gate - 2; }
KZ_PATHS.forEach(function (p, pi) {
var S = [];
for (var i = 1; i < p.length; i++) {
var a = p[i - 1], b = p[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 1.5));
for (var k = (i === 1 ? 0 : 1); k <= n; k++) {
var t = k / n;
S.push({ x: a[0] + (b[0] - a[0]) * t, z: a[1] + (b[1] - a[1]) * t, dx: (b[0] - a[0]) / L, dz: (b[1] - a[1]) / L });
}
}
for (var j = 0; j < S.length; j++) {
var A = S[Math.max(0, j - 2)], B = S[Math.min(S.length - 1, j + 2)], dx = B.x - A.x, dz = B.z - A.z, l = Math.hypot(dx, dz) || 1;
S[j].nx = -dz / l;
S[j].nz = dx / l;
}
var base = pos.length / 3, kb = kpos.length / 3, v = 0, yo = 0.07 + (pi % 7) * 0.004;
S.forEach(function (s, j) {
if (j > 0)
v += Math.hypot(s.x - S[j - 1].x, s.z - S[j - 1].z) / W;
[-1, 1].forEach(function (side) {
var x = s.x + s.nx * W / 2 * side, z = s.z + s.nz * W / 2 * side;
pos.push(x, kzHeight(x, z) + yo, z);
uv.push(side < 0 ? 0 : 1, v);
c.setHSL(kzwHue(s.x, s.z), 0.78, 0.70);
if (c.convertSRGBToLinear)
c.convertSRGBToLinear();
col.push(c.r, c.g, c.b);
});
[-1, 1].forEach(function (side) { [W / 2, W / 2 + 0.32].forEach(function (o, q) { var x = s.x + s.nx * o * side, z = s.z + s.nz * o * side; kpos.push(x, kzHeight(x, z) + yo + 0.05 - q * 0.02, z); }); });
if (j > 0) {
var a0 = base + (j - 1) * 2;
idx.push(a0, a0 + 2, a0 + 1, a0 + 1, a0 + 2, a0 + 3);
var k0 = kb + (j - 1) * 4;
kidx.push(k0, k0 + 4, k0 + 1, k0 + 1, k0 + 4, k0 + 5, k0 + 2, k0 + 3, k0 + 6, k0 + 3, k0 + 7, k0 + 6);
}
if (inZoo(s.x, s.z))
return;
if (j % (lite ? 3 : 2) === 0)
[-1, 1].forEach(function (side) { var o = W / 2 + 0.75 + ((j * 7) % 5) * 0.08, x = s.x + s.nx * o * side, z = s.z + s.nz * o * side; kzI("bloom", x, kzHeight(x, z) + 0.22, z, 0.32, 0.28, 0.32, j, KZ_PETALS[(j + (side > 0 ? 3 : 0)) % KZ_PETALS.length]); });
if (j % 16 === 8) {
var sd = (lamp++ % 2) ? 1 : -1, lx = s.x + s.nx * (W / 2 + 1.2) * sd, lz = s.z + s.nz * (W / 2 + 1.2) * sd, ly = kzHeight(lx, lz);
if (!worldSolidAt(KZ.solids, lx, lz, 0)) {
kzI("post", lx, ly, lz, 0.16, 3.0, 0.16, 0, 0x3A4A6A);
kzI("ball", lx, ly + 3.2, lz, 0.5, 0.62, 0.5, 0, 0xFFF2C8);
kzI("dot", lx, ly + 3.55, lz, 0.7, 0.7, 0.7, 0, KZ_RAINBOW[lamp % 7][0]);
KZ.solids.push({ x: lx, z: lz, r: 0.2, h: 3.4 });
}
}
});
});
if (!KZW.nodes.length)
kzwGraph();
var disc = [];
KZW.nodes.forEach(function (n, i) { if (n.site || n.adj.filter(function (e) { return !KZW.nodes[e.to].site; }).length < 3)
return; if (inZoo(n.x, n.z))
return; disc.push(n); });
disc.forEach(function (n) {
var g = new THREE.CircleGeometry(3.4, 28), P = g.attributes.position, b = pos.length / 3;
for (var i = 0; i < P.count; i++) {
var x = n.x + P.getX(i), z = n.z - P.getY(i);
pos.push(x, kzHeight(x, z) + 0.105, z);
uv.push(P.getX(i) / W + 0.5, P.getY(i) / W);
c.setHSL(kzwHue(n.x, n.z), 0.72, 0.76);
if (c.convertSRGBToLinear)
c.convertSRGBToLinear();
col.push(c.r, c.g, c.b);
}
var gi = g.index.array;
for (var k = 0; k < gi.length; k += 3)
idx.push(b + gi[k], b + gi[k + 2], b + gi[k + 1]);
g.dispose();
});
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
geo.setIndex(idx);
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: kzwCobbles(), vertexColors: true }));
m.name = "kz-ways";
m.receiveShadow = true;
m.userData.keep = 1;
G.add(m);
var kg = new THREE.BufferGeometry();
kg.setAttribute("position", new THREE.Float32BufferAttribute(kpos, 3));
kg.setIndex(kidx);
kg.computeVertexNormals();
var km = new THREE.Mesh(kg, kzM(0xFAF6EE, { ds: true }));
km.name = "kz-kerbs";
km.userData.keep = 1;
G.add(km);
},
function (G, x, z, boards, o) {
o = o || {};
var y = kzHeight(x, z), g = kzAt(G, x, z, 0, y), wood = kzM(o.wood || 0x8A5A34);
wCyl(0.11, 0.13, 3.6, wood, 0, 1.8, 0, g, 8);
wCone(0.2, 0.35, kzM(0xF0C850), 0, 3.75, 0, g, 8);
boards.slice(0, 5).forEach(function (B, i) {
var text = B.to + (B.d ? "  " + Math.round(B.d / 10) * 10 + " m" : ""), col = o.board ? ("#" + ("00000" + o.board.toString(16)).slice(-6)) : ["#C8344A", "#2E7AC8", "#2E9A4A", "#8A4AC8", "#D8781E"][i % 5];
var len = Math.max(1.6, Math.min(3.2, 0.09 * text.length + 0.5)), h = 0.36;
function tex(flip) {
return wTex(320, 48, function (c, Wd, Hd) {
c.fillStyle = col;
c.beginPath();
if (!flip) {
c.moveTo(2, 4);
c.lineTo(Wd - 30, 4);
c.lineTo(Wd - 2, Hd / 2);
c.lineTo(Wd - 30, Hd - 4);
c.lineTo(2, Hd - 4);
}
else {
c.moveTo(Wd - 2, 4);
c.lineTo(30, 4);
c.lineTo(2, Hd / 2);
c.lineTo(30, Hd - 4);
c.lineTo(Wd - 2, Hd - 4);
}
c.closePath();
c.fill();
c.strokeStyle = "#FFF6DA";
c.lineWidth = 3;
c.stroke();
c.fillStyle = "#FFFFFF";
c.font = "bold 22px Georgia";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(text, Wd / 2 + (flip ? 10 : -10), Hd / 2 + 1, Wd - 50);
});
}
var bg = new THREE.Group();
bg.position.set(0, 3.1 - i * 0.48, 0);
bg.rotation.y = B.a - Math.PI / 2;
g.add(bg);
var geo = new THREE.PlaneGeometry(len, h), f = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: tex(false), transparent: true, alphaTest: 0.5 }));
f.position.set(len / 2 + 0.08, 0, 0.03);
bg.add(f);
var bk = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: tex(true), transparent: true, alphaTest: 0.5 }));
bk.position.set(len / 2 + 0.08, 0, -0.03);
bk.rotation.y = Math.PI;
bg.add(bk);
f.userData.keep = 1;
bk.userData.keep = 1;
});
KZ.solids.push({ x: x, z: z, r: 0.25, h: 3.6 });
return g;
},
function (G) {
if (!KZW.nodes.length)
kzwGraph();
var zoo = KZ_SITE.zoo, EMO = { welcome: "🧚", bubbles: "🫧", mushrooms: "🍄", pond: "🪷", tree: "🌳", carousel: "🎠", clouds: "☁️", maze: "🌻", story: "📖", paint: "🎨", colouring: "🖍️", puzzles: "🧩", critters: "🐰", lanterns: "🏮", grotto: "✨", school: "🏫", craft: "🧵", zoo: "🦁", circus: "🎪" };
KZW.nodes.forEach(function (n, ni) {
if (n.site)
return;
var deg = n.adj.length;
if (deg < 3 && !n.adj.some(function (e) { return KZW.nodes[e.to].site; }))
return;
if (deg < 2)
return;
if (zoo && Math.hypot(n.x - zoo.x, n.z - zoo.z) < KZ_ZOO_R.gate)
return;
var ways = kzwFromNode(ni), boards = [];
Object.keys(ways).forEach(function (k) {
var w = ways[k];
w.list.sort(function (a, b) { return a.d - b.d; });
w.list.slice(0, 2).forEach(function (s) { if (s.d < 14)
return; boards.push({ to: (EMO[s.k] ? EMO[s.k] + " " : "") + s.name.replace(/^the /, "").replace(/^./, function (m) { return m.toUpperCase(); }), a: w.a, d: s.d }); });
});
if (!boards.length)
return;
var px = n.x + 2.9, pz = n.z + 2.9;
for (var t = 0; t < 8 && worldSolidAt(KZ.solids, px, pz, 0); t++) {
var ta = t * 0.8;
px = n.x + Math.cos(ta) * 3.2;
pz = n.z + Math.sin(ta) * 3.2;
}
var g = kzPost(G, px, pz, boards);
KZW.posts.push({ x: px, z: pz });
kzSpot(px, pz, 2.6, "The signpost", "choose a place, and Pip will show you the way", function () { kzWayCard(); });
});
},
function () {
var g = new THREE.Group();
g.name = "kz-pip";
g.userData.keep = 1;
var body = wSph(0.16, kzM(0xFFE8F4, { e: 0xF8B8E0, ei: 0.45 }), 0, 0, 0, g, 12);
body.scale.set(1, 1.3, 1);
wSph(0.12, kzM(0xFFF0E0, { e: 0xFFE0C8, ei: 0.3 }), 0, 0.27, 0, g, 10);
var wm = new THREE.MeshLambertMaterial({ color: 0xD8F0FF, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false });
g.userData.wings = [-1, 1].map(function (s) { var w = new THREE.Mesh(new THREE.CircleGeometry(0.28, 14), wm); w.scale.set(1, 0.62, 1); w.position.set(s * 0.2, 0.12, -0.05); w.userData.s = s; g.add(w); return w; });
if (typeof wGlow === "function") {
var gl = wGlow(0xF8C8F0, 1.4, 0.35);
g.add(gl);
}
return g;
},
function (site) {
var S = KZ_SITE[site];
if (!S)
return;
var L = worldLocal();
KZ.guide = { x: S.x, z: S.z, r: S.r, name: S.name };
KZW.route = kzwRoute(L.x, L.z, site);
KZW.at = 0;
KZW.site = site;
if (!KZW.pip) {
KZW.pip = kzwPipMake();
KZ.G.add(KZW.pip);
KZW.pip.position.set(L.x + 1, L.y, L.z + 1);
}
KZW.pip.visible = true;
setStatus("🧚 <b>Pip</b> flutters up: \"This way to <b>" + esc(S.name) + "</b>! Follow me!\" (the arrow at the top shows the way too)");
},
function (dt, L) {
var P = KZW.pip;
if (P && P.visible) {
if (!KZ.guide || !KZW.route) {
P.visible = false;
}
else {
var R = KZW.route, best = KZW.at || 0, bd = 1e9;
for (var i = Math.max(0, best - 1); i < R.length; i++) {
var d = Math.hypot(R[i].x - L.x, R[i].z - L.z);
if (d < bd) {
bd = d;
best = i;
}
}
KZW.at = best;
var want = 6, px = L.x, pz = L.z, k = best;
while (k < R.length - 1 && want > 0) {
var sx = R[k + 1].x - px, sz = R[k + 1].z - pz, sl = Math.hypot(sx, sz);
if (sl >= want) {
px += sx / sl * want;
pz += sz / sl * want;
want = 0;
}
else {
px = R[k + 1].x;
pz = R[k + 1].z;
want -= sl;
k++;
}
}
var ty = kzHeight(px, pz) + 1.9 + Math.sin(KZ.t * 2) * 0.15, f = Math.min(1, dt * 2.2);
P.position.x += (px - P.position.x) * f;
P.position.z += (pz - P.position.z) * f;
P.position.y += (ty - P.position.y) * f;
P.rotation.y = Math.atan2(px - L.x, pz - L.z);
(P.userData.wings || []).forEach(function (w) { w.rotation.y = w.userData.s * (0.5 + 0.35 * Math.sin(KZ.t * 9)); });
}
}
for (var j = 0; j < KZW.walkers.length; j++)
kzwWalkerTick(KZW.walkers[j], dt, L);
},
function (G) {
if (typeof wPerson !== "function")
return;
if (!KZW.nodes.length)
kzwGraph();
var R = wRand(4040), keys = KZ_SITES.map(function (s) { return s[0]; }).filter(function (k) { return k !== "door" && k !== "staff" && k !== "zoo"; }), n = KZ_LITE ? 4 : 10;
for (var i = 0; i < n; i++) {
var from = keys[Math.floor(R() * keys.length)], S = KZ_SITE[from];
var W = { g: [], at: 0, route: null, wait: R() * 10, from: from, R: R, sp: 1.15 };
try {
[0, 1].forEach(function (q) { var g = wPerson("kz_pw" + i + "_" + q, q ? { child: true } : {}); g.userData.keep = 1; g.position.set(S.x + q, kzHeight(S.x, S.z), S.z); G.add(g); W.g.push(g); KZ.people.push({ g: g, wander: null, child: !!q }); });
}
catch (e) { }
if (W.g.length)
KZW.walkers.push(W);
}
},
function (W, dt, L) {
var g0 = W.g[0];
if (!g0)
return;
if (Math.abs(g0.position.x - L.x) > 260 || Math.abs(g0.position.z - L.z) > 260) {
if (!W.route)
return;
}
if (W.wait > 0) {
W.wait -= dt;
if (W.wait <= 0) {
var keys = KZ_SITES.map(function (s) { return s[0]; }).filter(function (k) { return k !== "door" && k !== "staff" && k !== W.from; }), to = keys[Math.floor(W.R() * keys.length)];
W.route = kzwRoute(g0.position.x, g0.position.z, to);
W.at = 1;
W.to = to;
}
return;
}
if (!W.route) {
W.wait = 5;
return;
}
var T = W.route[W.at];
if (!T) {
W.route = null;
W.from = W.to;
W.wait = 12 + W.R() * 25;
return;
}
var dx = T.x - g0.position.x, dz = T.z - g0.position.z, d = Math.hypot(dx, dz);
if (d < 0.6) {
W.at++;
return;
}
var st = Math.min(d, W.sp * dt), ux = dx / d, uz = dz / d;
W.g.forEach(function (g, q) {
var ox = q ? -uz * 0.9 : 0, oz = q ? ux * 0.9 : 0, tx = g0.position.x + ux * st + ox, tz = g0.position.z + uz * st + oz;
if (q === 0) {
g.position.x = tx;
g.position.z = tz;
}
else {
g.position.x += (tx - g.position.x) * Math.min(1, dt * 4);
g.position.z += (tz - g.position.z) * Math.min(1, dt * 4);
}
g.position.y = kzHeight(g.position.x, g.position.z);
g.rotation.y = Math.atan2(ux, uz);
});
},
function (x, z, pad) {
if (Math.hypot(x, z) > KZ_RIM - 10)
return false;
if (kzPathDist(x, z) < 3.2 + (pad || 0))
return false;
for (var i = 0; i < KZ_SITES.length; i++) {
var s = KZ_SITES[i];
if (Math.hypot(x - s[1], z - s[2]) < s[3] + (pad || 0))
return false;
}
if (worldSolidAt(KZ.solids, x, z, 0))
return false;
for (var j = -1; j <= 1; j++)
for (var k = -1; k <= 1; k++)
if (worldSolidAt(KZ.solids, x + j * (pad || 1.5), z + k * (pad || 1.5), 0))
return false;
var Z = KZ_SITE.zoo;
if (Z && Math.hypot(x - Z.x, z - Z.z) < KZ_ZOO_R.hedge + 4)
return false;
return true;
},
function (G, x, z, r, seed) {
var y = kzHeight(x, z), R = wRand(seed);
var soil = wMesh(new THREE.CircleGeometry(r, 24), kzM(0x6A4A32), x, y + 0.06, z, G);
soil.rotation.x = -Math.PI / 2;
var n = Math.round(Math.PI * 2 * r / 0.5);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
kzI("post", x + Math.sin(a) * (r + 0.1), y, z + Math.cos(a) * (r + 0.1), 0.06, 0.45, 0.06, 0, 0xFFFFFF);
}
var nb = Math.round(r * r * 7);
for (var b = 0; b < nb; b++) {
var ba = R() * 6.283, bd = Math.sqrt(R()) * (r - 0.3);
kzI("bloom", x + Math.sin(ba) * bd, y + 0.3 + R() * 0.15, z + Math.cos(ba) * bd, 0.34, 0.3, 0.34, R() * 3, KZ_PETALS[(seed + b) % KZ_PETALS.length]);
kzI("ball", x + Math.sin(ba) * bd, y + 0.12, z + Math.cos(ba) * bd, 0.36, 0.26, 0.36, 0, 0x4E9A3A);
}
kzFlower(G, x, z, 0.9 + R() * 0.4, KZ_PETALS[seed % KZ_PETALS.length], 0xF0B030);
KZ.solids.push({ x: x, z: z, r: r, h: 0.5 });
},
function (G, x, z, rot, col) {
var g = kzAt(G, x, z, rot), wd = kzM(col || 0x48A8E0), ir = kzM(0xFFF8F0);
for (var s = 0; s < 3; s++)
wBox(1.8, 0.07, 0.14, wd, 0, 0.46, -0.16 + s * 0.16, g);
for (var b = 0; b < 2; b++)
wBox(1.8, 0.13, 0.06, wd, 0, 0.66 + b * 0.17, 0.26, g).rotation.x = -0.15;
[-0.78, 0.78].forEach(function (xx) { wBox(0.08, 0.46, 0.5, ir, xx, 0.23, 0, g); wBox(0.08, 0.55, 0.08, ir, xx, 0.72, 0.27, g); wSph(0.06, ir, xx, 1.0, 0.27, g, 6); });
kzSolidIn(g, 0, 0, 0.95, 0.35, 0.9);
return g;
},
function (G, x, z, kind, rot) {
var y = kzHeight(x, z), g = kzAt(G, x, z, rot || 0, y), h = 0x3E8A38, h2 = 0x4A9A42;
wCyl(1.3, 1.4, 0.5, kzM(0xF0E8F0), 0, 0.25, 0, g, 18);
function B(px, py, pz, sx, sy, sz, c) { var p = kzLocal(g, px, pz); kzI("ball", p.x, y + py, p.z, sx, sy, sz, g.rotation.y, c || h); }
if (kind === "bunny") {
B(0, 1.3, 0, 1.6, 1.5, 1.9);
B(0, 2.4, 0.7, 1.1, 1.1, 1.1, h2);
B(-0.25, 3.3, 0.6, 0.32, 1.1, 0.25);
B(0.25, 3.3, 0.6, 0.32, 1.1, 0.25);
B(0, 1.1, -1.0, 0.5, 0.5, 0.5, 0xF4F4F0);
}
else if (kind === "elephant") {
B(0, 1.5, 0, 2.2, 1.8, 2.6);
B(0, 2.3, 1.4, 1.4, 1.4, 1.3, h2);
B(0, 1.6, 2.1, 0.4, 1.5, 0.4);
[-1, 1].forEach(function (s) { B(s * 0.75, 2.3, 1.2, 0.25, 1.1, 0.9); B(s * 0.6, 0.65, 0.8, 0.55, 1, 0.55); B(s * 0.6, 0.65, -0.8, 0.55, 1, 0.55); });
}
else if (kind === "bear") {
B(0, 1.3, 0, 1.7, 1.9, 1.5);
B(0, 2.65, 0.1, 1.2, 1.15, 1.1, h2);
B(-0.45, 3.2, 0.1, 0.42, 0.42, 0.3);
B(0.45, 3.2, 0.1, 0.42, 0.42, 0.3);
B(0, 2.55, 0.62, 0.45, 0.38, 0.35, h2);
[-1, 1].forEach(function (s) { B(s * 0.85, 1.55, 0.3, 0.5, 1, 0.5); B(s * 0.5, 0.6, 0.5, 0.6, 0.55, 0.8); });
}
else {
B(0, 1.0, -0.3, 2.4, 1.1, 1.2);
B(0, 1.9, -0.5, 1.4, 1.4, 1.0, 0xE08AB8);
B(0, 1.5, 1.0, 0.7, 1.2, 0.7, h2);
B(-0.2, 2.25, 1.15, 0.1, 0.5, 0.1);
B(0.2, 2.25, 1.15, 0.1, 0.5, 0.1);
}
KZ.solids.push({ x: x, z: z, r: 1.4, h: 3 });
},
function (G, x1, z1, x2, z2, seed) {
var y1 = kzHeight(x1, z1), y2 = kzHeight(x2, z2), cols = [0xE8404A, 0xF0A030, 0xF0D040, 0x60C058, 0x48A8E0, 0x9A5AD0, 0xF070B0];
[[x1, z1, y1], [x2, z2, y2]].forEach(function (p) { kzI("post", p[0], p[2], p[1], 0.14, 4.2, 0.14, 0, 0xFFFFFF); kzI("ball", p[0], p[2] + 4.3, p[1], 0.3, 0.3, 0.3, 0, 0xF0C850); KZ.solids.push({ x: p[0], z: p[1], r: 0.2, h: 4.3 }); });
var L = Math.hypot(x2 - x1, z2 - z1), n = Math.max(4, Math.round(L / 0.9)), rot = Math.atan2(x2 - x1, z2 - z1);
for (var i = 1; i < n; i++) {
var t = i / n, x = x1 + (x2 - x1) * t, z = z1 + (z2 - z1) * t, y = y1 + (y2 - y1) * t + 4.0 - Math.sin(t * Math.PI) * 0.9;
kzI("flag", x, y - 0.42, z, 0.36, 0.42, 0.06, rot, cols[(i + seed) % 7], Math.PI);
}
var line = wMesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(x1, y1 + 4.05, z1), new THREE.Vector3((x1 + x2) / 2, (y1 + y2) / 2 + 3.15, (z1 + z2) / 2), new THREE.Vector3(x2, y2 + 4.05, z2)]), 12, 0.015, 4, false), kzM(0xFFFFFF), 0, 0, 0, G);
},
function (col) {
if (KZD_CHECK[col])
return KZD_CHECK[col];
var c = "#" + ("00000" + col.toString(16)).slice(-6);
var t = wTex(64, 64, function (x, W, H) { x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H); x.fillStyle = c; x.globalAlpha = 0.55; for (var i = 0; i < 4; i++) {
x.fillRect(i * 16, 0, 8, H);
x.fillRect(0, i * 16, W, 8);
} x.globalAlpha = 1; for (var a = 0; a < 4; a++)
for (var b = 0; b < 4; b++) {
x.fillRect(a * 16, b * 16, 8, 8);
} }, [2, 2]);
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (KZD_CHECK[col] = new THREE.MeshLambertMaterial({ map: t }));
},
function (G, x, z, rot, seed, people) {
var y = kzHeight(x, z), g = kzAt(G, x, z, rot, y), col = [0xE8404A, 0x48A8E0, 0x60C058, 0xF0A030][seed % 4];
var bl = wMesh(new THREE.PlaneGeometry(2.6, 2.2), kzdCheckMat(col), 0, 0.08, 0, g);
bl.rotation.x = -Math.PI / 2;
bl.userData.keep = 1;
var bk = kzAt(g, 0.6, -0.4, 0.3, 0);
wBox(0.6, 0.35, 0.42, kzM(0xC89A5A), 0, 0.26, 0, bk);
var hd = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.025, 6, 16, Math.PI), kzM(0xA87A3A));
hd.position.y = 0.43;
bk.add(hd);
[[-0.6, 0.5], [0.1, 0.6], [-0.3, -0.3]].forEach(function (p, i) { wCyl(0.18, 0.18, 0.03, kzM(0xFFFFFF), p[0], 0.1, p[1], g, 14); wSph(0.07, kzM([0xE8404A, 0xF0C040, 0x60C058][i]), p[0], 0.16, p[1], g, 8); });
wCyl(0.08, 0.08, 0.24, kzM(0xF0A0C0), 0.9, 0.2, 0.6, g, 8);
if (people && typeof wPerson === "function")
try {
[[1.6, 0, false], [-1.5, 0.3, true]].forEach(function (q, i) { var p = wPerson("kz_pic" + seed + "_" + i, q[2] ? { child: true } : {}); var w = kzLocal(g, q[0], q[1]); p.position.set(w.x, kzHeight(w.x, w.z), w.z); p.rotation.y = Math.atan2(x - w.x, z - w.z); p.userData.keep = 1; G.add(p); KZ.people.push({ g: p, wander: null, child: q[2] }); });
}
catch (e) { }
},
function (G, x, z, rot, seed) {
var y = kzHeight(x, z), g = kzAt(G, x, z, rot, y);
var soft = wMesh(new THREE.CircleGeometry(7, 32), kzM(0x6AB8E0), 0, 0.07, 0, g);
soft.rotation.x = -Math.PI / 2;
var fr = kzM(0xF04A6A);
[-1.6, 1.6].forEach(function (xx) { [-0.7, 0.7].forEach(function (zz) { var l = wCyl(0.07, 0.07, 2.8, fr, xx, 1.3, -3 + zz * 0.4, g, 8); l.rotation.x = zz > 0 ? -0.25 : 0.25; }); });
wCyl(0.07, 0.07, 3.4, fr, 0, 2.65, -3, g, 8).rotation.z = Math.PI / 2;
[-0.7, 0.7].forEach(function (xx, i) { wBox(0.55, 0.06, 0.28, kzM(i ? 0xF0D040 : 0x48A8E0), xx, 0.55, -3, g); wCyl(0.012, 0.012, 2.05, kzM(0xC8C8C8), xx - 0.22, 1.6, -3, g, 4); wCyl(0.012, 0.012, 2.05, kzM(0xC8C8C8), xx + 0.22, 1.6, -3, g, 4); });
kzSolidIn(g, 0, -3, 1.8, 0.5, 2.8);
var ss = kzAt(g, 3, 1.5, 0.4, 0);
wCyl(0.25, 0.3, 0.5, kzM(0xF0A030), 0, 0.25, 0, ss, 10);
var plank = wBox(0.3, 0.08, 3.4, kzM(0x60C058), 0, 0.55, 0, ss);
plank.rotation.x = 0.12;
[-1, 1].forEach(function (s) { wCyl(0.04, 0.04, 0.4, kzM(0xF04A6A), 0, 0.75 + s * 0.2, s * 1.45, ss, 6).rotation.z = Math.PI / 2; });
kzSolidIn(ss, 0, 0, 0.3, 1.7, 0.8);
var dk = kzAt(g, -3.2, 1.2, 0.8, 0);
wCyl(0.05, 0.05, 0.4, kzM(0x888888), 0, 0.2, 0, dk, 6);
var db = wSph(0.42, kzM(0xF0D040), 0, 0.72, 0, dk, 12);
db.scale.set(0.8, 0.8, 1.2);
wSph(0.26, kzM(0xF0D040), 0, 1.12, 0.38, dk, 10);
wCone(0.1, 0.24, kzM(0xF08A30), 0, 1.1, 0.66, dk, 8).rotation.x = Math.PI / 2;
kzSolidIn(dk, 0, 0, 0.4, 0.5, 1.2);
var sp = kzAt(g, 0.5, 4, 0, 0);
var sand = wMesh(new THREE.CircleGeometry(1.8, 20), kzM(0xF0DCA0), 0, 0.12, 0, sp);
sand.rotation.x = -Math.PI / 2;
var rim = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.14, 6, 24), kzM(0xC8343A));
rim.rotation.x = Math.PI / 2;
rim.position.y = 0.14;
sp.add(rim);
wCyl(0.35, 0.42, 0.5, kzM(0xE8D090), 0.3, 0.35, -0.2, sp, 8);
wCone(0.18, 0.3, kzM(0xE8D090), 0.3, 0.75, -0.2, sp, 8);
wCyl(0.13, 0.1, 0.2, kzM(0x48A8E0), -0.7, 0.22, 0.5, sp, 10);
KZ.solids.push(Object.assign({ r: 1.9, h: 0.3 }, kzLocal(g, 0.5, 4)));
},
function (G, x, z, seed) {
var y = kzHeight(x, z), R = wRand(seed), col = [0xE8404A, 0x48A8E0, 0xF0C040, 0x9A5AD0][seed % 4];
if (typeof wPerson === "function")
try {
var ch = wPerson("kz_kite" + seed, { child: true });
ch.position.set(x, y, z);
ch.rotation.y = R() * 6;
ch.userData.keep = 1;
G.add(ch);
KZ.people.push({ g: ch, wander: null, child: true });
}
catch (e) { }
var k = new THREE.Group();
k.userData.keep = 1;
G.add(k);
var sh = new THREE.Shape();
sh.moveTo(0, 0.9);
sh.lineTo(0.6, 0);
sh.lineTo(0, -1.2);
sh.lineTo(-0.6, 0);
sh.closePath();
var kg = new THREE.Mesh(new THREE.ShapeGeometry(sh), kzM(col, { ds: true }));
k.add(kg);
var cr = wBox(0.03, 2.1, 0.03, kzM(0xFFFFFF), 0, -0.15, 0.02, k);
wBox(1.2, 0.03, 0.03, kzM(0xFFFFFF), 0, 0, 0.02, k);
for (var t = 0; t < 6; t++) {
var bw = wBox(0.25, 0.12, 0.01, kzM(KZ_RAINBOW[t][0], { ds: true }), 0, -1.4 - t * 0.45, 0, k);
}
var str = new THREE.BufferGeometry();
str.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
var line = new THREE.Line(str, new THREE.LineBasicMaterial({ color: 0xFFFFFF }));
line.userData.keep = 1;
line.frustumCulled = false;
G.add(line);
KZD2.kites.push({ k: k, line: line, x: x, y: y + 1.1, z: z, ph: R() * 6, h: 16 + R() * 6, dx: (R() - 0.5) * 10, dz: 8 + R() * 6 });
},
function (dt) {
KZD2.kites.forEach(function (K) {
var t = KZ.t * 0.35 + K.ph, kx = K.x + K.dx + Math.sin(t) * 2.2, ky = K.y + K.h + Math.sin(t * 1.3) * 1.2, kz = K.z + K.dz + Math.cos(t * 0.8) * 1.5;
K.k.position.set(kx, ky, kz);
K.k.rotation.set(0.25, Math.atan2(K.x - kx, K.z - kz), Math.sin(t * 1.1) * 0.18);
var a = K.line.geometry.attributes.position;
a.setXYZ(0, K.x, K.y, K.z);
a.setXYZ(1, kx, ky - 0.1, kz);
a.needsUpdate = true;
});
},
function (G) {
KZD2.kites = [];
var R = wRand(2024), lite = KZ_LITE, kinds = ["bunny", "elephant", "bear", "snail"], benchCols = [0x48A8E0, 0xF07AA8, 0x60C058, 0xF0A030, 0x9A5AD0];
var skip = { door: 1, staff: 1, craft: 1, colouring: 1, zoo: 1, school: 1 };
KZ_SITES.forEach(function (s, si) {
if (skip[s[0]])
return;
var cx = s[1], cz = s[2], r = s[3], placed = 0, want = lite ? 5 : 9, tries = 0;
while (placed < want && tries++ < 90) {
var a = R() * Math.PI * 2, d = r + 5 + R() * 9, x = cx + Math.sin(a) * d, z = cz + Math.cos(a) * d;
var what = placed % 9;
if (!kzdFree(x, z, what === 0 || what === 4 ? 3.2 : 2))
continue;
if (what === 0 || what === 4)
kzdBed(G, x, z, 1.6 + R() * 1.2, si * 7 + placed);
else if (what === 1 || what === 5)
kzdBench(G, x, z, Math.atan2(cx - x, cz - z) + Math.PI, benchCols[(si + placed) % 5]);
else if (what === 2)
kzdTopiary(G, x, z, kinds[(si + placed) % 4], Math.atan2(cx - x, cz - z));
else if (what === 3)
kzBalloons(G, x, z, 7, si * 31 + placed);
else if (what === 6) {
var b = a + 0.35, x2 = cx + Math.sin(b) * d, z2 = cz + Math.cos(b) * d;
if (kzdFree(x2, z2, 1))
kzdBunting(G, x, z, x2, z2, si);
else
continue;
}
else if (what === 7)
kzdBed(G, x, z, 1.2, si * 11 + placed);
else
kzdBench(G, x, z, Math.atan2(cx - x, cz - z) + Math.PI, benchCols[(si + placed + 2) % 5]);
placed++;
}
});
var spots = [];
KZ_PATHS.forEach(function (p) {
for (var i = 1; i < p.length; i++) {
var a = p[i - 1], b = p[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
if (L < 46)
continue;
var mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2, nx = -(b[1] - a[1]) / L, nz = (b[0] - a[0]) / L;
spots.push({ x: mx, z: mz, nx: nx, nz: nz, rot: Math.atan2(b[0] - a[0], b[1] - a[1]) });
}
});
var corner = 0;
spots.forEach(function (S, i) {
if (lite && i % 2)
return;
[1, -1].forEach(function (side, q) {
if (lite && q)
return;
var off = 13 + R() * 4, x = S.x + S.nx * off * side, z = S.z + S.nz * off * side, kind = (corner++) % 5;
if (!kzdFree(x, z, 7.5))
return;
var face = Math.atan2(S.x - x, S.z - z);
if (kind === 0)
kzdPlayground(G, x, z, face, i);
else if (kind === 1) {
kzdPicnic(G, x, z, face + 0.3, i * 2, true);
var x2 = x + Math.sin(face + 1.6) * 4.5, z2 = z + Math.cos(face + 1.6) * 4.5;
if (kzdFree(x2, z2, 1.5))
kzdPicnic(G, x2, z2, face - 0.4, i * 2 + 1, !lite);
kzTree(G, x - Math.sin(face) * 5, z - Math.cos(face) * 5, 1.2, 0xF870A8);
}
else if (kind === 2) {
kzdKite(G, x, z, i);
if (!lite)
kzdKite(G, x + Math.sin(face + 1.5) * 5, z + Math.cos(face + 1.5) * 5, i + 50);
kzdBench(G, x + Math.sin(face) * 3, z + Math.cos(face) * 3, face + Math.PI, 0x60C058);
}
else if (kind === 3) {
kzdTopiary(G, x, z, kinds[i % 4], face);
var x3 = x + Math.sin(face + 1.57) * 4.2, z3 = z + Math.cos(face + 1.57) * 4.2;
if (kzdFree(x3, z3, 2))
kzdTopiary(G, x3, z3, kinds[(i + 1) % 4], face);
var x4 = x + Math.sin(face - 1.57) * 4.2, z4 = z + Math.cos(face - 1.57) * 4.2;
if (kzdFree(x4, z4, 2.5))
kzdBed(G, x4, z4, 1.8, i);
}
else {
kzdBed(G, x, z, 2.6, i * 3);
kzdBench(G, x + Math.sin(face) * 4.2, z + Math.cos(face) * 4.2, face + Math.PI, benchCols[i % 5]);
kzBalloons(G, x - Math.sin(face) * 4, z - Math.cos(face) * 4, 8, i * 17);
}
});
});
},
function () {
if (KZM.turf)
return KZM.turf;
var c = document.createElement("canvas"), N = 256;
c.width = c.height = N;
var x = c.getContext("2d"), R = wRand(7311);
x.fillStyle = "#C8D0B8";
x.fillRect(0, 0, N, N);
for (var i = 0; i < 60; i++) {
x.fillStyle = "rgba(" + (R() < 0.5 ? "150,160,120" : "235,240,215") + ",0.25)";
x.beginPath();
x.ellipse(R() * N, R() * N, 8 + R() * 28, 6 + R() * 18, R() * 3, 0, 7);
x.fill();
}
for (var b = 0; b < 5200; b++) {
var px = R() * N, py = R() * N, l = 3 + R() * 7, a = -Math.PI / 2 + (R() - 0.5) * 0.9, v = R();
x.strokeStyle = v < 0.45 ? "rgba(70,95,45,0.55)" : v < 0.85 ? "rgba(210,230,170,0.5)" : "rgba(170,150,90,0.5)";
x.lineWidth = 1;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l);
x.stroke();
}
for (var d = 0; d < 70; d++) {
x.fillStyle = R() < 0.6 ? "rgba(255,255,245,0.8)" : "rgba(250,215,70,0.8)";
x.beginPath();
x.arc(R() * N, R() * N, 0.9 + R() * 0.8, 0, 7);
x.fill();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = 4;
KZM.turf = t;
return t;
},
function (G) {
var gr = G.getObjectByName("kz-ground");
if (!gr || !gr.geometry)
return;
var col = gr.geometry.attributes.color, c = new THREE.Color(), hsl = {};
for (var i = 0; i < col.count; i++) {
c.setRGB(col.getX(i), col.getY(i), col.getZ(i));
c.getHSL(hsl);
if (hsl.h > 0.2 && hsl.h < 0.42 && hsl.s > 0.35) {
c.setHSL(hsl.h - 0.012, hsl.s * 0.72, hsl.l * 0.86);
col.setXYZ(i, c.r, c.g, c.b);
}
}
col.needsUpdate = true;
var t = kzmTurfTex();
t.repeat.set(1500 / 3.5, 1500 / 3.5);
gr.material.map = t;
gr.material.needsUpdate = true;
},
function (x, z, pad) {
if (Math.hypot(x, z) > KZ_RIM - 8)
return false;
if (kzPathDist(x, z) < 2.8 + (pad || 0))
return false;
for (var i = 0; i < KZ_SITES.length; i++) {
var s = KZ_SITES[i];
if (Math.hypot(x - s[1], z - s[2]) < s[3] * 0.92 + (pad || 0))
return false;
}
var Z = KZ_SITE.zoo;
if (Z && Math.hypot(x - Z.x, z - Z.z) < KZ_ZOO_R.hedge + 3)
return false;
if (worldSolidAt(KZ.solids, x, z, 0))
return false;
return true;
},
function (G) {
var R = wRand(5150), lite = KZ_LITE, greens = [0x4A8A34, 0x5E9A3C, 0x6E9E40, 0x7A9A44, 0x557E30];
var nT = lite ? 1500 : 3400, made = 0, tries = 0;
while (made < nT && tries++ < nT * 3) {
var a = R() * Math.PI * 2, d = Math.sqrt(R()) * (KZ_RIM - 10), cx = Math.cos(a) * d, cz = Math.sin(a) * d;
if (!kzmOpen(cx, cz, 0))
continue;
var y = kzHeight(cx, cz), k = 3 + Math.floor(R() * 4);
for (var j = 0; j < k; j++) {
var x = cx + (R() - 0.5) * 1.4, z = cz + (R() - 0.5) * 1.4;
kzI("grass", x, y - 0.02, z, 0.22 + R() * 0.2, 0.25 + R() * 0.3, 0.22 + R() * 0.2, R() * 6, greens[(R() * 5) | 0]);
}
made++;
}
var fl = [0xFFFFF4, 0xF6D23A, 0xE8A0C8, 0x7A9AE8], nF = lite ? 160 : 380;
for (var p = 0, t2 = 0; p < nF && t2 < nF * 4; t2++) {
var a2 = R() * Math.PI * 2, d2 = Math.sqrt(R()) * (KZ_RIM - 12), fx = Math.cos(a2) * d2, fz = Math.sin(a2) * d2;
if (!kzmOpen(fx, fz, 0.5))
continue;
var fy = kzHeight(fx, fz), fc = fl[p % 4], m = 10 + Math.floor(R() * 14);
for (var q = 0; q < m; q++) {
var qx = fx + (R() - 0.5) * 2.6, qz = fz + (R() - 0.5) * 2.6, h = 0.12 + R() * 0.16;
kzI("stalk", qx, fy, qz, 0.012, h, 0.012, 0, 0x5A8A38);
kzI("bloom", qx, fy + h, qz, 0.07 + R() * 0.04, 0.035, 0.07 + R() * 0.04, R() * 6, fc);
}
p++;
}
var sh = [0x3E7A2E, 0x4A8436, 0x36702A, 0x5A8A3A, 0x6A7E34], nS = lite ? 40 : 95;
for (var s = 0, t3 = 0; s < nS && t3 < nS * 8; t3++) {
var a3 = R() * Math.PI * 2, d3 = 60 + Math.sqrt(R()) * (KZ_RIM - 80), sx = Math.cos(a3) * d3, sz = Math.sin(a3) * d3;
if (!kzmOpen(sx, sz, 3.5))
continue;
var cnt = 2 + Math.floor(R() * 3);
for (var u = 0; u < cnt; u++) {
var bx = sx + (R() - 0.5) * 4, bz = sz + (R() - 0.5) * 4, r = 0.7 + R() * 0.7, by = kzHeight(bx, bz);
var b = new THREE.Mesh(geo("leaves", [Math.round(r * 10) / 10]), kzmLeaf(sh[(s + u) % 5]));
b.position.set(bx, by + r * 0.75, bz);
b.scale.set(1.15, 0.85, 1.15);
b.rotation.y = R() * 6;
b.userData.keep = 1;
G.add(b);
kzI("canopy", bx, by + r * 0.55, bz, r * 1.6, r * 1.1, r * 1.6, 0, sh[(s + u + 2) % 5]);
KZ.solids.push({ x: bx, z: bz, r: r * 0.8, h: r * 1.6 });
}
s++;
}
},
function (G) {
if (typeof wPerson !== "function")
return;
var R = wRand(818), lite = KZ_LITE, n = 0;
KZ_SITES.forEach(function (s, si) {
if (lite && si % 2)
return;
if (s[0] === "door")
return;
for (var tries = 0; tries < 20; tries++) {
var a = R() * Math.PI * 2, d = s[3] + 6 + R() * 10, x = s[1] + Math.sin(a) * d, z = s[2] + Math.cos(a) * d;
if (!kzdFree(x, z, 1.2))
continue;
var grp = [[0, 0, false], [0.9, 0.5, true]];
if (R() < 0.6)
grp.push([-0.8, 0.6, true]);
grp.forEach(function (q, i) {
try {
var p = wPerson("kzm" + si + "_" + i, q[2] ? { child: true } : {});
var px = x + q[0], pz = z + q[1];
p.position.set(px, kzHeight(px, pz), pz);
p.rotation.y = Math.atan2(s[1] - px, s[2] - pz);
p.userData.keep = 1;
G.add(p);
KZ.people.push({ g: p, wander: { r: 6, sp: q[2] ? 0.8 : 0.6 }, child: q[2] });
n++;
}
catch (e) { }
});
break;
}
});
return n;
}
];
});
