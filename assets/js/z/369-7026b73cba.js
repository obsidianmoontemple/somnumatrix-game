/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(369, function () {
"use strict";
return [
function (col, tex, o) { o = o || {}; var m = new THREE.MeshLambertMaterial({ color: col, map: tex ? fgwTex(tex) : null }); if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.5;
} if (o.ds)
m.side = THREE.DoubleSide; if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
} m.userData.ldShared = 1; return m; },
function (G, x, y, z, h, seed, lite) {
var R = fgwR(seed), bark = fgwM("birch", function () { return fgwLam(0xE8E4DC, "bark"); }), lf = [0x8AB848, 0x9AC85A, 0x7AA83E];
var t = fgwAdd(G, new THREE.CylinderGeometry(0.16, 0.3, h, lite ? 6 : 9), bark, x, y + h / 2, z);
t.rotation.z = (R() - 0.5) * 0.08;
if (!lite)
for (var k = 0; k < 5; k++)
fgwAdd(G, new THREE.BoxGeometry(0.34, 0.06, 0.34), fgwM("birchmark", function () { return fgwLam(0x2A2622); }), x, y + 1 + k * h / 6, z, R() * 3);
for (var c = 0; c < (lite ? 6 : 12); c++) {
var a = R() * 6.28, r = 0.6 + R() * 1.8;
var g = new THREE.IcosahedronGeometry(0.7 + R() * 0.6, 1);
g.scale(1, 1.4, 1);
fgwAdd(G, g, fgwM("bl" + (c % 3), function () { var m = fgwLam(lf[c % 3]); m.flatShading = true; return m; }), x + Math.cos(a) * r, y + h * (0.55 + R() * 0.45), z + Math.sin(a) * r);
}
},
function (G, x, y, z, col) {
var frame = fgwM("lanframe", function () { return fgwLam(0x3A3428, "metal"); });
fgwAdd(G, new THREE.CylinderGeometry(0.012, 0.012, 0.9, 4), frame, x, y + 0.45, z);
fgwAdd(G, new THREE.SphereGeometry(0.2, 10, 8), fgwGlow(col || 0xFFD890), x, y, z);
fgwAdd(G, new THREE.SphereGeometry(0.42, 10, 8), fgwGlow(col || 0xFFD890, 0.18), x, y, z);
},
function (G, x, y, z, seed, lite) {
var R = fgwR(seed), bark = fgwM("wbark", function () { return fgwLam(0x5A4A38, "bark"); }), leaf = fgwM("wleaf", function () { return fgwLam(0x8AB868, null, { ds: true, e: 0x1A3010, ei: 0.4 }); });
fgwAdd(G, new THREE.CylinderGeometry(0.45, 0.8, 5, lite ? 6 : 10), bark, x, y + 2.5, z);
var crown = new THREE.SphereGeometry(4.2, lite ? 10 : 16, lite ? 6 : 10, 0, 6.283, 0, 1.4);
fgwAdd(G, crown, leaf, x, y + 5.2, z);
var n = lite ? 22 : 56;
for (var i = 0; i < n; i++) {
var a = i / n * 6.28 + R() * 0.2, r = 3.2 + R() * 1.1, L = 3 + R() * 2.2;
var f = new THREE.PlaneGeometry(0.32, L, 1, 3);
var m = fgwAdd(G, f, leaf, x + Math.cos(a) * r, y + 5.6 - L / 2, z + Math.sin(a) * r);
m.rotation.y = -a + Math.PI / 2;
}
},
function (G, x, y, z, ry, lite) {
var A = new THREE.Group();
A.position.set(x, y, z);
A.rotation.y = ry;
G.add(A);
var wood = fgwM("arch", function () { return fgwLam(0x9A8458, null, { e: 0x2A2010, ei: 0.5 }); }), vine = fgwM("vine", function () { return fgwLam(0x5A8A3E, null, { e: 0x1A3010, ei: 0.5 }); });
var arc = new THREE.TorusGeometry(1.6, 0.09, 6, lite ? 10 : 18, Math.PI);
fgwAdd(A, arc, wood, 0, 2.4, 0);
[-1.6, 1.6].forEach(function (px) { fgwAdd(A, new THREE.CylinderGeometry(0.09, 0.09, 2.4, 6), wood, px, 1.2, 0); });
var R = fgwR(fgwH("arch" + x + z)), cols = [0xE84A6A, 0xF8C8D8, 0xF06A8A, 0xFFFFFF];
for (var i = 0; i < (lite ? 10 : 22); i++) {
var t = R() * Math.PI, r = 1.6 + (R() - 0.5) * 0.2, px = Math.cos(t) * r, py = 2.4 + Math.sin(t) * r;
if (R() < 0.3) {
px = (R() < 0.5 ? -1.6 : 1.6);
py = R() * 2.4;
}
fgwAdd(A, new THREE.IcosahedronGeometry(0.28, 0), vine, px, py, (R() - 0.5) * 0.2);
fgwAdd(A, new THREE.IcosahedronGeometry(0.13, 0), fgwM("rose" + (i % 4), function () { return fgwLam(cols[i % 4], null, { e: cols[i % 4], ei: 0.25 }); }), px + (R() - 0.5) * 0.2, py + 0.1, (R() - 0.5) * 0.3 + 0.12);
}
},
function (P, cx, cz) {
P.make(cx, cz, 0, 1, function (G, H) {
var lite = fgwLite(), y0 = H.y(0, 0);
var w = new THREE.Mesh(new THREE.CircleGeometry(38, lite ? 32 : 64), new THREE.MeshPhongMaterial({ color: 0x1A2A4A, specular: 0x8AA8E8, shininess: 90, transparent: true, opacity: 0.92 }));
w.rotation.x = -Math.PI / 2;
w.position.y = y0 + 0.12;
G.add(w);
var shore = new THREE.Mesh(new THREE.RingGeometry(37, 41, lite ? 32 : 64), fgwLam(0x4A4A32, "earth"));
shore.rotation.x = -Math.PI / 2;
shore.position.y = y0 + 0.08;
G.add(shore);
var R = fgwR(9091), pad = fgwLam(0x3A6A2A, null, { ds: true }), fl = fgwGlow(0xF8E8FF);
for (var i = 0; i < (lite ? 24 : 60); i++) {
var a = R() * 6.28, r = 6 + R() * 28, px = Math.cos(a) * r, pz = Math.sin(a) * r;
var g = new THREE.CircleGeometry(0.6 + R() * 0.5, 10, 0.3, 5.9);
var m = fgwAdd(G, g, pad, px, y0 + 0.14, pz);
m.rotation.x = -Math.PI / 2;
m.rotation.z = R() * 6.28;
if (R() < 0.4) {
fgwAdd(G, new THREE.ConeGeometry(0.18, 0.2, 6), fl, px, y0 + 0.24, pz);
}
}
for (var k = 0; k < (lite ? 4 : 7); k++) {
var a2 = k / (lite ? 4 : 7) * 6.28 + 0.4, r2 = 45;
fgwWillow(G, Math.cos(a2) * r2, H.y(Math.cos(a2) * r2, Math.sin(a2) * r2), Math.sin(a2) * r2, 800 + k, lite);
}
var reed = fgwLam(0x6A7A3A, null, { ds: true });
for (var j = 0; j < (lite ? 40 : 110); j++) {
var a3 = R() * 6.28, r3 = 36.5 + R() * 3.5, rx = Math.cos(a3) * r3, rz = Math.sin(a3) * r3;
var rg = new THREE.PlaneGeometry(0.08, 1.4 + R() * 0.8);
var rm = fgwAdd(G, rg, reed, rx, y0 + 0.8, rz);
rm.rotation.y = R() * 3;
}
var plank = fgwLam(0x7A6248, "wood");
fgwAdd(G, new THREE.BoxGeometry(2.4, 0.2, 9), plank, 0, y0 + 0.5, -37);
[-1, 1].forEach(function (s) { for (var q = 0; q < 4; q++)
fgwAdd(G, new THREE.CylinderGeometry(0.12, 0.12, 1.4, 6), plank, s * 1.1, y0, -33 - q * 2.6); });
var boat = new THREE.Group();
boat.position.set(3, y0 + 0.2, -32);
boat.rotation.y = 0.3;
G.add(boat);
var hull = new THREE.SphereGeometry(1, 12, 8, 0, 6.283, Math.PI / 2, Math.PI / 2);
hull.scale(0.9, 0.6, 2.6);
fgwAdd(boat, hull, fgwLam(0x8A6A48, "wood", { ds: true }), 0, 0.45, 0);
fgwLantern(boat, 0, 1.6, 1.8, 0xFFE0A0);
var isle = new THREE.Mesh(new THREE.CylinderGeometry(5, 6, 0.8, lite ? 12 : 20), fgwLam(0x3E6A34, "grass"));
isle.position.set(0, y0 + 0.3, 0);
G.add(isle);
if (typeof grGreatTree === "function") {
var T = new THREE.Group();
T.position.set(0, y0 + 0.6, 0);
G.add(T);
try {
grGreatTree(T, 0, 0, 0.5, 6, 4.5, 0xE8E4F0, fgwH("hawthorn"));
}
catch (e) { }
}
fgwAdd(G, new THREE.BoxGeometry(1.6, 0.5, 0.6), fgwM("stone", function () { return fgwLam(0x8A8A82, "stone"); }), 2.4, y0 + 0.95, 0);
return true;
}, { r: 38, h: 1 });
P.sign(cx, cz - 44, Math.PI, ["The Moonlit Lake", "Press E to read"], ["The Moonlit Lake", "The still water in the hollow of Faerie", ["The fair folk say that whatever the moon sees in this water, it keeps. Some nights you can see two moons in it.", "The isle in the middle has one white hawthorn on it. In the old tales a lone hawthorn is a fairy tree, and no one cuts it.", "The boat at the landing is for anyone who asks it nicely."]]);
},
function (P, cx, cz) {
P.make(cx, cz, 0, 1, function (G, H) {
var lite = fgwLite(), R = fgwR(5151), n = lite ? 18 : 40, spots = [];
for (var t = 0; t < n * 5 && spots.length < n; t++) {
var a = R() * 6.28, r = Math.sqrt(R()) * 60, x = Math.cos(a) * r, z = Math.sin(a) * r;
if (spots.some(function (s) { return Math.hypot(s[0] - x, s[1] - z) < 6; }))
continue;
spots.push([x, z]);
}
spots.forEach(function (s, i) { fgwBirch(G, s[0], H.y(s[0], s[1]), s[1], 9 + ((i * 7) % 5), 9000 + i, lite); if (i % 3 === 0)
fgwLantern(G, s[0] + 1.2, H.y(s[0], s[1]) + 3.4, s[1] + 0.4, i % 2 ? 0xFFD890 : 0xC8E8FF); });
var head = new THREE.ConeGeometry(0.09, 0.2, 6, 1, true);
head.translate(0, 0.4, 0);
var stem = new THREE.CylinderGeometry(0.008, 0.01, 0.38, 3);
stem.translate(0, 0.19, 0);
var cnt = lite ? 900 : 2600, hm = new THREE.InstancedMesh(head, fgwGlow(0x6A7AE8), cnt), sm = new THREE.InstancedMesh(stem, fgwLam(0x3A6A2A), cnt);
var M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0);
for (var b = 0; b < cnt; b++) {
var a2 = R() * 6.28, r2 = Math.sqrt(R()) * 64, x2 = Math.cos(a2) * r2, z2 = Math.sin(a2) * r2, sc = 0.8 + R() * 0.9;
Q.setFromAxisAngle(Y, R() * 6.28);
V.set(x2, H.y(x2, z2), z2);
S.set(sc, sc, sc);
M.compose(V, Q, S);
hm.setMatrixAt(b, M);
sm.setMatrixAt(b, M);
}
G.add(hm);
G.add(sm);
return true;
}, null);
P.sign(cx + 66, cz, -Math.PI / 2, ["The Bluebell Wood", "Press E to read"], ["The Bluebell Wood", "Silver birches over a blue floor", ["When the bluebells ring, the fairies are called to their gatherings, so the old saying goes; and no mortal hears them.", "Lanterns hang in the birches all year. Nobody has seen who lights them."]]);
},
function (P, cx, cz) {
P.make(cx, cz, 0, 1, function (G, H) {
var lite = fgwLite(), y0 = H.y(0, 0);
var mound = new THREE.SphereGeometry(26, lite ? 20 : 36, lite ? 8 : 14, 0, 6.283, 0, Math.PI / 2);
mound.scale(1, 0.36, 1);
fgwAdd(G, mound, fgwLam(0x3E6A30, "grass"), 0, y0 - 0.5, 0);
var st = fgwM("stone", function () { return fgwLam(0x8A8A82, "stone"); });
fgwAdd(G, new THREE.BoxGeometry(3.2, 0.6, 1.2), st, 0, y0 + 4.2, 24.6);
[-1.3, 1.3].forEach(function (s) { fgwAdd(G, new THREE.BoxGeometry(0.6, 3.8, 1.2), st, s, y0 + 1.9, 24.6); });
fgwAdd(G, new THREE.PlaneGeometry(2.0, 3.6), fgwGlow(0xFFD890), 0, y0 + 1.85, 25.3);
var door = fgwAdd(G, new THREE.BoxGeometry(1.0, 3.4, 0.12), fgwLam(0x2E5A32, "wood"), -0.55, y0 + 1.75, 25.6);
door.rotation.y = -0.9;
door.position.x -= 0.3;
for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.28;
fgwStone(G, Math.cos(a) * 7, y0 + 8.6, Math.sin(a) * 7, 2.2 + (i % 3) * 0.5, 700 + i);
}
if (typeof grGreatTree === "function")
for (var k = 0; k < (lite ? 2 : 5); k++) {
var a2 = k / 5 * 6.28 + 0.6, T = new THREE.Group();
T.position.set(Math.cos(a2) * 30, H.y(Math.cos(a2) * 30, Math.sin(a2) * 30), Math.sin(a2) * 30);
G.add(T);
try {
grGreatTree(T, 0, 0, 0.4, 5, 3.6, 0x4A7A3A, fgwH("hh" + k));
}
catch (e) { }
}
return true;
}, { r: 24, h: 6 });
P.sign(cx + 6, cz + 32, 0, ["The Hollow Hill", "Press E to read"], ["The Hollow Hill", "A fairy mound: the people of the hills live under it", ["In the old tales of Ireland and Scotland the fair folk live inside the green hills, the sidhe, and on certain nights the hills stand open and the music comes out.", "A mortal who goes in to dance may come out to find a hundred years have passed. This door is kinder: it lets you look, and keeps your time for you."]]);
},
function (P, cx, cz) {
P.make(cx, cz, 0, 1, function (G, H) {
var lite = fgwLite();
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.28;
fgwRoseArch(G, Math.cos(a) * 15, H.y(Math.cos(a) * 15, Math.sin(a) * 15), Math.sin(a) * 15, -a + Math.PI / 2, lite);
}
var R = fgwR(4242), pet = new THREE.CircleGeometry(0.07, 5), cnt = lite ? 200 : 600, pm = new THREE.InstancedMesh(pet, fgwLam(0xF8B8C8, null, { ds: true, e: 0x803848, ei: 0.2 }), cnt);
var M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S = new THREE.Vector3(1, 1, 1), E = new THREE.Euler();
for (var p = 0; p < cnt; p++) {
var a2 = R() * 6.28, r2 = Math.sqrt(R()) * 16, x = Math.cos(a2) * r2, z = Math.sin(a2) * r2;
E.set(-Math.PI / 2, 0, R() * 6.28);
Q.setFromEuler(E);
V.set(x, H.y(x, z) + 0.03, z);
M.compose(V, Q, S);
pm.setMatrixAt(p, M);
}
G.add(pm);
for (var l = 0; l < (lite ? 4 : 8); l++) {
var a3 = l / 8 * 6.28 + 0.2, x3 = Math.cos(a3) * 18, z3 = Math.sin(a3) * 18, y3 = H.y(x3, z3);
fgwAdd(G, new THREE.CylinderGeometry(0.05, 0.06, 3.2, 5), fgwM("lanframe", function () { return fgwLam(0x3A3428, "metal"); }), x3, y3 + 1.6, z3);
fgwLantern(G, x3, y3 + 2.7, z3, l % 2 ? 0xFFC8E8 : 0xFFE0A0);
}
return true;
}, null);
},
function (items) {
var pts = [];
items.forEach(function (it) {
if (it.t !== "path" && it.t !== "flow")
return;
for (var i = 1; i < it.pts.length; i++) {
var a = it.pts[i - 1], b = it.pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 1.5));
for (var k = 0; k <= n; k++)
pts.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n, it.w * 0.5 + 0.5]);
}
});
var H = {};
pts.forEach(function (p) { var key = Math.floor(p[0] / 6) + "," + Math.floor(p[1] / 6); (H[key] || (H[key] = [])).push(p); });
FGW_PATHS = H;
},
function (lx, lz) {
var BARE = (FGW_KINDS[LD.kind] || {}).bare || [];
for (var i = 0; i < BARE.length; i++) {
var B = BARE[i];
if ((lx - B[0]) * (lx - B[0]) + (lz - B[1]) * (lz - B[1]) < B[2] * B[2])
return true;
}
var cx = Math.floor(lx / 6), cz = Math.floor(lz / 6);
for (var a = -1; a <= 1; a++)
for (var b = -1; b <= 1; b++) {
var L = FGW_PATHS[(cx + a) + "," + (cz + b)];
if (!L)
continue;
for (var j = 0; j < L.length; j++) {
var p = L[j];
if ((lx - p[0]) * (lx - p[0]) + (lz - p[1]) * (lz - p[1]) < p[2] * p[2])
return true;
}
}
var S = (typeof LD !== "undefined" && LD.solids) || [];
for (var k = 0; k < S.length; k++) {
var s = S[k], r = s.r || Math.max(s.hw || 0, s.hd || 0);
if (r > 0.3 && (lx - s.x) * (lx - s.x) + (lz - s.z) * (lz - s.z) < r * r)
return true;
}
return false;
},
function () {
var pos = [], col = [], R = fgwR(77);
for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.28 + R() * 0.5, h = 0.3 + R() * 0.32, w = 0.022 + R() * 0.012, lean = 0.12 + R() * 0.14, ox = (R() - 0.5) * 0.16, oz = (R() - 0.5) * 0.16;
var c = Math.cos(a), s = Math.sin(a), px = -s * w, pz = c * w, tx = ox + c * lean, tz = oz + s * lean;
pos.push(ox - px, 0, oz - pz, ox + px, 0, oz + pz, tx, h, tz);
col.push(0.27, 0.44, 0.2, 0.27, 0.44, 0.2, 0.52 + R() * 0.1, 0.74 + R() * 0.1, 0.36);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
var nr = [];
for (var q = 0; q < pos.length / 3; q++)
nr.push(0, 1, 0);
g.setAttribute("normal", new THREE.Float32BufferAttribute(nr, 3));
return g;
},
function () {
var pos = [], idx = [];
pos.push(0, 0.36, 0);
for (var i = 0; i < 10; i++) {
var a = i / 10 * 6.28, r = (i % 2) ? 0.04 : 0.1;
pos.push(Math.cos(a) * r, 0.37 + ((i % 2) ? 0 : 0.02), Math.sin(a) * r);
}
for (var k = 1; k <= 10; k++)
idx.push(0, (k % 10) + 1, k);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function () {
var lite = fgwLite(), rad = lite ? 16 : 28, cell = lite ? 1.0 : 0.62, max = Math.ceil(Math.PI * rad * rad / (cell * cell)) + 60;
var stem = new THREE.CylinderGeometry(0.006, 0.008, 0.36, 3);
stem.translate(0, 0.18, 0);
var G = new THREE.Group();
G.name = "faerie-meadow";
var gm = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
var mGrass = new THREE.InstancedMesh(fgwTuftGeo(), gm, max);
var mStem = new THREE.InstancedMesh(stem, fgwLam(0x3A6A2A), max);
var fm = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
var mFlow = new THREE.InstancedMesh(fgwFlowerGeo(), fm, max);
mFlow.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3);
[mGrass, mStem, mFlow].forEach(function (m) { m.frustumCulled = false; m.count = 0; G.add(m); });
var ffN = lite ? 50 : 140, ff = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 6, 4), new THREE.MeshBasicMaterial({ color: 0xE8FF9A, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }), ffN);
ff.frustumCulled = false;
G.add(ff);
var halo = new THREE.InstancedMesh(new THREE.SphereGeometry(0.16, 6, 4), new THREE.MeshBasicMaterial({ color: 0xC8F07A, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }), ffN);
halo.frustumCulled = false;
G.add(halo);
var seeds = [];
for (var i = 0; i < ffN; i++)
seeds.push({ x: 0, z: 0, y: 0, p: i * 1.37, s: 0.3 + ((i * 7) % 10) / 20, set: false });
FGW.mesh = { G: G, grass: mGrass, stem: mStem, flow: mFlow, rad: rad, cell: cell, ff: ff, halo: halo, seeds: seeds };
return FGW.mesh;
},
function (px, pz) {
var M = FGW.mesh, cell = M.cell, rad = M.rad, cx = Math.round(px / cell), cz = Math.round(pz / cell), n = Math.ceil(rad / cell);
var mx = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0), C = new THREE.Color();
var ng = 0, nf = 0, max = M.grass.instanceMatrix.count, reach = (FGW_KINDS[LD.kind] || {}).reach || 300;
for (var i = -n; i <= n; i++)
for (var j = -n; j <= n; j++) {
if (i * i + j * j > n * n)
continue;
var gx = (cx + i) * cell, gz = (cz + j) * cell, h = fgwH(gx.toFixed(2) + "," + gz.toFixed(2)), u = (h & 1023) / 1023, v = ((h >> 10) & 1023) / 1023, w = ((h >> 20) & 1023) / 1023;
var x = gx + (u - 0.5) * cell, z = gz + (v - 0.5) * cell, lx = x - LD.ox, lz = z - LD.oz;
if (lx * lx + lz * lz > reach * reach || fgwBare(lx, lz))
continue;
var y = typeof ldY === "function" ? ldY(lx, lz) : 0;
var sc = 0.8 + w * 0.7;
Q.setFromAxisAngle(Y, w * 6.28 + u);
V.set(x, y, z);
S.set(sc, sc * (0.75 + u * 0.6), sc);
mx.compose(V, Q, S);
if (ng < max) {
M.grass.setMatrixAt(ng, mx);
ng++;
}
var drift = Math.sin(x * 0.09 + Math.cos(z * 0.05) * 2) * Math.cos(z * 0.08 + Math.sin(x * 0.04));
if (w > 0.62 - drift * 0.4 && nf < max) {
S.set(0.9 + u * 0.5, 0.8 + v * 0.6, 0.9 + u * 0.5);
V.set(x + 0.12, y, z - 0.08);
mx.compose(V, Q, S);
M.stem.setMatrixAt(nf, mx);
M.flow.setMatrixAt(nf, mx);
var FL = (FGW_KINDS[LD.kind] || {}).flowers || FGW_FLOWERS, ci = drift > 0.3 ? 3 % FL.length : (h >>> 4) % FL.length;
C.setHex(FL[ci]);
M.flow.setColorAt(nf, C);
nf++;
}
}
M.grass.count = ng;
M.stem.count = nf;
M.flow.count = nf;
M.grass.instanceMatrix.needsUpdate = true;
M.stem.instanceMatrix.needsUpdate = true;
M.flow.instanceMatrix.needsUpdate = true;
if (M.flow.instanceColor)
M.flow.instanceColor.needsUpdate = true;
}
];
});
