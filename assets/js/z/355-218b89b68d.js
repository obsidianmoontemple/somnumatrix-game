/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(355, function () {
"use strict";
return [
function (name, mpt) {
var key = name + ":" + mpt;
if (DAV.tex[key])
return DAV.tex[key];
var url = "assets/textures/photo/" + name + (DAV.lite ? "" : "-1k") + ".jpg";
var t = new THREE.TextureLoader().load(url);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / mpt, 1 / mpt);
try {
t.anisotropy = Math.min(DAV.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (DAV.tex[key] = t);
},
function (name, tint, mpt, o) {
o = o || {};
var key = "s:" + name + ":" + tint + ":" + mpt + ":" + (o.ds ? 1 : 0) + (o.vc ? 1 : 0) + (o.shine || 0);
if (DAV.mats[key])
return DAV.mats[key];
var m, map = name ? davTex(name, mpt) : null;
if (DAV.lite)
m = new THREE.MeshLambertMaterial({ color: tint, map: map });
else
m = new THREE.MeshPhongMaterial({ color: tint, map: map, shininess: o.shine || 5, specular: o.spec || 0x141210 });
if (o.ds)
m.side = THREE.DoubleSide;
if (o.vc)
m.vertexColors = true;
return (DAV.mats[key] = m);
},
function (col, o) {
var k = "c" + col + (o ? JSON.stringify(o) : "");
if (DAV.mats[k])
return DAV.mats[k];
var m = DAV.lite ? wM(col, o) : new THREE.MeshPhongMaterial({ color: col, shininess: (o && o.shine) || 8, specular: (o && o.spec) || 0x161410 });
if (!DAV.lite && o) {
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
}
return (DAV.mats[k] = m);
},
function (g) {
var p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
for (var i = 0; i < uv.count; i++) {
var nx = Math.abs(n.getX(i)), ny = Math.abs(n.getY(i)), X = p.getX(i), Y = p.getY(i), Z = p.getZ(i);
if (ny > 0.5)
uv.setXY(i, X, Z);
else if (nx > 0.5)
uv.setXY(i, Z, Y);
else
uv.setXY(i, X, Y);
}
uv.needsUpdate = true;
return g;
},
function (x, z) {
var n = wFbm(x / 700 + 31, z / 700 + 17, 5, 4), h = (n - 0.38) * 58 + wFbm(x / 170, z / 170, 9, 2) * 7;
var ap = davGa((z + 2280) / 520), pass = 1 - 0.66 * davGa((x - 150) / 280);
h += ap * (220 + 170 * wFbm(x / 380, z / 380, 3, 3)) * pass;
var al = davGa((x + 3320) / 360) * davS(-700, -1400, z);
h += al * (330 + 220 * wFbm(x / 350, z / 350, 4, 3)) * (1 - 0.74 * davGa((z + 2450) / 250));
h += 172 * davGa(Math.hypot(x - 700, z + 1150) / 430);
h += 72 * davGa(Math.hypot(x + 2700, z + 220) / 430) + 96 * davGa(Math.hypot(x + 2860, z + 700) / 380);
if (x > 2300)
h += davS(2300, 2900, x) * 48 * wFbm(x / 260, z / 260, 7, 3);
var B = DAV_BOUND, d = Math.min(x - B.x0, B.x1 - x, z - B.z0, B.z1 - z);
h += (1 - davS(0, 620, d)) * (460 + 260 * wFbm(x / 300, z / 300, 11, 2));
return h;
},
function (x, z) {
var h = davHills(x, z);
var dr = Math.abs(z - davArnoZ(x)), vm = davS(60, 460, dr);
h = h * vm + (1 - vm) * (-0.3);
var dl = x < -2700 ? davLoireD(x, z) : 1e9;
if (dl < 600) {
var vl = davS(50, 420, dl);
h = h * vl + (1 - vl) * 7;
}
for (var i = 0; i < DAV_TOWNS.length; i++) {
var T = DAV_TOWNS[i], d = Math.hypot(x - T.x, z - T.z);
if (d > T.r + T.e)
continue;
var t = davS(T.r, T.r + T.e, d);
h = T.y * (1 - t) + h * t;
}
if (dr < 44) {
var inF = Math.abs(x) < 760, bed = -4.4;
h = Math.min(h, inF ? (dr < 33 ? bed : h) : bed + (h - bed) * davS(16, 44, dr));
}
if (dl < 48) {
var lb = 2.2;
h = Math.min(h, lb + (h - lb) * davS(14, 48, dl));
}
if (x < -2700 && davInLake(x, z))
h = Math.min(h, 1.6);
var N = DAV_NAVIGLI, dn = Math.abs(Math.hypot(x - N.x, z - N.z) - N.r);
if (dn < N.w + 1)
h = Math.min(h, N.y - 2.6);
return h;
},
function () {
if (DAV.th)
return;
DAV.th = 1;
DAV_TOWNS.forEach(function (T) {
if (T.k !== "ceceri" && T.k !== "vinci" && T.k !== "anchiano")
return;
var v = [davHills(T.x, T.z)];
for (var a = 0; a < 12; a++)
v.push(davHills(T.x + Math.cos(a / 12 * 6.283) * T.r, T.z + Math.sin(a / 12 * 6.283) * T.r));
T.y = Math.round(T.k === "ceceri" ? Math.max.apply(null, v) + 2 : v.reduce(function (p, c) { return p + c; }, 0) / v.length);
if (T.k === "ceceri")
DAV_CECERI.y = T.y;
});
},
function (x, z) {
var g = DAV.grid;
if (!g)
return davHRaw(x, z);
var B = DAV_BOUND, fx = (x - B.x0) / g.S, fz = (z - B.z0) / g.S, i = Math.floor(fx), j = Math.floor(fz);
if (i < 0 || j < 0 || i >= g.nx - 1 || j >= g.nz - 1)
return 400;
var u = fx - i, v = fz - j, H = g.H, nx = g.nx, a = H[j * nx + i], b = H[j * nx + i + 1], c = H[(j + 1) * nx + i], d = H[(j + 1) * nx + i + 1];
return u + v < 1 ? a + (b - a) * u + (c - a) * v : d + (c - d) * (1 - u) + (b - d) * (1 - v);
},
function (x, z, h, slope, c) {
var f = wFbm(x / 90, z / 90, 21, 2), cell = ((Math.floor(x / 140) * 73856093) ^ (Math.floor(z / 110) * 19349663)) >>> 0, k = cell % 7;
var r = 0.42 + f * 0.12, g = 0.52 + f * 0.12, b = 0.24 + f * 0.06;
var farm = h < 90 && slope < 0.22;
if (farm) {
if (k === 0) {
r = 0.78;
g = 0.66;
b = 0.34;
}
else if (k === 1) {
r = 0.56;
g = 0.42;
b = 0.28;
}
else if (k === 2) {
r = 0.52;
g = 0.56;
b = 0.36;
}
else if (k === 3) {
r = 0.62;
g = 0.6;
b = 0.3;
}
}
if (slope > 0.45) {
var t = davS(0.45, 0.9, slope);
r = r * (1 - t) + 0.55 * t;
g = g * (1 - t) + 0.52 * t;
b = b * (1 - t) + 0.48 * t;
}
if (h > 300) {
var s = davS(300, 400, h);
r = r * (1 - s) + 0.94 * s;
g = g * (1 - s) + 0.95 * s;
b = b * (1 - s) + 0.97 * s;
}
var w = davWaterAt(x, z);
if (w !== null && h < w + 1.4) {
r = 0.62;
g = 0.56;
b = 0.42;
}
c.setRGB(r, g, b);
},
function (G) {
var g = DAV.grid, B = DAV_BOUND, S = g.S, nx = g.nx, nz = g.nz, n = nx * nz;
var pos = new Float32Array(n * 3), col = new Float32Array(n * 3), uv = new Float32Array(n * 2), c = new THREE.Color();
for (var j = 0; j < nz; j++)
for (var i = 0; i < nx; i++) {
var k = j * nx + i, x = B.x0 + i * S, z = B.z0 + j * S, h = g.H[k];
pos[k * 3] = x;
pos[k * 3 + 1] = h;
pos[k * 3 + 2] = z;
uv[k * 2] = x;
uv[k * 2 + 1] = z;
var hx = g.H[j * nx + Math.min(nx - 1, i + 1)] - g.H[j * nx + Math.max(0, i - 1)], hz = g.H[Math.min(nz - 1, j + 1) * nx + i] - g.H[Math.max(0, j - 1) * nx + i];
davLandCol(x, z, h, Math.hypot(hx, hz) / (2 * S), c);
col[k * 3] = c.r;
col[k * 3 + 1] = c.g;
col[k * 3 + 2] = c.b;
}
var P = Math.round(1000 / S);
for (var J = 0; J < nz - 1; J += P)
for (var I = 0; I < nx - 1; I += P) {
var i1 = Math.min(nx - 1, I + P), j1 = Math.min(nz - 1, J + P), w = i1 - I + 1, d = j1 - J + 1;
var p2 = new Float32Array(w * d * 3), c2 = new Float32Array(w * d * 3), u2 = new Float32Array(w * d * 2), idx = [];
for (var b = 0; b < d; b++)
for (var a = 0; a < w; a++) {
var src = (J + b) * nx + (I + a), dst = b * w + a;
p2[dst * 3] = pos[src * 3];
p2[dst * 3 + 1] = pos[src * 3 + 1];
p2[dst * 3 + 2] = pos[src * 3 + 2];
c2[dst * 3] = col[src * 3];
c2[dst * 3 + 1] = col[src * 3 + 1];
c2[dst * 3 + 2] = col[src * 3 + 2];
u2[dst * 2] = uv[src * 2];
u2[dst * 2 + 1] = uv[src * 2 + 1];
}
for (var b2 = 0; b2 < d - 1; b2++)
for (var a2 = 0; a2 < w - 1; a2++) {
var A = b2 * w + a2, Bv = A + 1, C = A + w, D = C + 1;
idx.push(A, C, Bv, Bv, C, D);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(p2, 3));
geo.setAttribute("color", new THREE.BufferAttribute(c2, 3));
geo.setAttribute("uv", new THREE.BufferAttribute(u2, 2));
geo.setIndex(idx);
geo.computeVertexNormals();
geo.computeBoundingSphere();
var m = new THREE.Mesh(geo, davSurf("grass", 0xFFFFFF, DAV.lite ? 9 : 6, { vc: true }));
m.name = "dav-land";
m.userData.keep = 1;
G.add(m);
}
},
function (col) {
var k = "w" + col;
if (DAV.mats[k])
return DAV.mats[k];
if (!DAV_RIP)
DAV_RIP = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#808080";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
var a = Math.random(), px = Math.random() * W, py = Math.random() * H;
x.fillStyle = "rgba(" + (a > 0.5 ? 255 : 0) + "," + (a > 0.5 ? 255 : 0) + "," + (a > 0.5 ? 255 : 0) + "," + (0.04 + Math.random() * 0.06) + ")";
x.beginPath();
x.ellipse(px, py, 6 + Math.random() * 16, 1.5 + Math.random() * 2.5, 0, 0, 7);
x.fill();
}
}, [1, 1]);
var t = DAV_RIP.clone();
t.needsUpdate = true;
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 14, 1 / 14);
var m = DAV.lite ? new THREE.MeshLambertMaterial({ color: col, map: t, transparent: true, opacity: 0.9 }) : new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 70, specular: 0x5A6A70, transparent: true, opacity: 0.88 });
m.depthWrite = false;
DAV.water.push(t);
return (DAV.mats[k] = m);
},
function (pts, w, yf, mat, parent, name) {
var pos = [], uv = [], idx = [], run = 0;
for (var i = 0; i < pts.length; i++) {
var p = pts[i], q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)];
var dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * w / 2, nz = dx / l * w / 2;
if (i)
run += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
pos.push(p[0] + nx, yf(p[0] + nx, p[1] + nz), p[1] + nz, p[0] - nx, yf(p[0] - nx, p[1] - nz), p[1] - nz);
uv.push(p[0] + nx, p[1] + nz, p[0] - nx, p[1] - nz);
if (i) {
var a = (i - 1) * 2;
idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
g.computeBoundingSphere();
var m = new THREE.Mesh(g, mat);
m.name = name || "dav-ribbon";
(parent || DAV.G).add(m);
return m;
},
function (G) {
var arno = [];
for (var x = DAV_BOUND.x0 - 50; x <= DAV_BOUND.x1 + 50; x += 30)
arno.push([x, davArnoZ(x)]);
var a = davRibbon(arno, 104, function () { return DAV_WATER_Y; }, davWaterMat(0x4E7A78), G, "dav-arno");
a.userData.keep = 1;
a.renderOrder = 1;
var L = DAV_LOIRE, lo = [];
for (var x2 = L.x0 - 60; x2 <= L.x1 + 20; x2 += 30)
lo.push([x2, L.z]);
var b = davRibbon(lo, 104, function () { return L.y; }, davWaterMat(0x587E88), G, "dav-loire");
b.userData.keep = 1;
var lake = new THREE.Mesh(new THREE.CircleGeometry(L.lake.r + 6, DAV.lite ? 28 : 56), davWaterMat(0x587E88));
lake.rotation.x = -Math.PI / 2;
lake.position.set(L.lake.x, L.y, L.lake.z);
lake.userData.keep = 1;
G.add(lake);
var N = DAV_NAVIGLI, ring = new THREE.Mesh(new THREE.RingGeometry(N.r - N.w - 2, N.r + N.w + 2, DAV.lite ? 48 : 120, 1), davWaterMat(0x5A7468));
ring.rotation.x = -Math.PI / 2;
ring.position.set(N.x, N.y, N.z);
ring.userData.keep = 1;
G.add(ring);
},
function (x, z, r) {
for (var k = 0; k < DAV_ROADS.length; k++) {
var P = DAV_ROADS[k].p;
for (var i = 0; i < P.length - 1; i++) {
var a = P[i], b = P[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], l2 = dx * dx + dz * dz;
var t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / l2)), px = a[0] + dx * t, pz = a[1] + dz * t;
if ((x - px) * (x - px) + (z - pz) * (z - pz) < r * r)
return true;
}
}
return false;
},
function (col) {
var k = "leaf" + col;
if (DAV.mats[k])
return DAV.mats[k];
var m;
if (DAV.lite)
m = new THREE.MeshLambertMaterial({ color: col });
else {
var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png");
t.wrapS = t.wrapT = THREE.RepeatWrapping;
m = new THREE.MeshLambertMaterial({ color: col, map: t });
}
return (DAV.mats[k] = m);
},
function (seed, sx, sy, sz, det) {
var g = new THREE.IcosahedronGeometry(1, det), p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), n = 0.78 + 0.44 * wFbm(x * 1.7 + seed, z * 1.7 + y * 1.3, seed, 2);
p.setXYZ(i, x * sx * n, y * sy * n, z * sz * n);
}
g.computeVertexNormals();
var uv = g.attributes.uv;
for (var j = 0; j < uv.count; j++)
uv.setXY(j, p.getX(j) * 0.35 + p.getZ(j) * 0.2, p.getY(j) * 0.35);
return g;
},
function () {
if (DAV_TREE.kinds && DAV_TREE.lite === DAV.lite)
return DAV_TREE.kinds;
var d = DAV.lite ? 0 : 1, bark = davSurf("bark", 0x8A7A6A, 1.4);
function trunk(r0, r1, h, bend) {
var g = new THREE.CylinderGeometry(r1, r0, h, DAV.lite ? 5 : 7, DAV.lite ? 1 : 3);
g.translate(0, h / 2, 0);
if (bend) {
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var y = p.getY(i) / h;
p.setX(i, p.getX(i) + Math.sin(y * 2.4) * bend);
}
g.computeVertexNormals();
}
davUVm(g);
return g;
}
var cyp = new THREE.LatheGeometry([[0, 0], [0.9, 0.8], [1.25, 2.6], [1.35, 5], [1.15, 8], [0.75, 10.6], [0.28, 12.4], [0, 13.2]].map(function (a) { return new THREE.Vector2(a[0], a[1]); }), DAV.lite ? 6 : 10);
(function () {
var p = cyp.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), n = 0.86 + 0.28 * wFbm(x * 2 + 3, y * 0.9 + z * 2, 4, 2);
p.setX(i, x * n);
p.setZ(i, z * n);
}
cyp.translate(0, 0.6, 0);
cyp.computeVertexNormals();
var uv = cyp.attributes.uv;
for (var j = 0; j < uv.count; j++)
uv.setXY(j, uv.getX(j) * 3, uv.getY(j) * 5);
})();
DAV_TREE.lite = DAV.lite;
return (DAV_TREE.kinds = {
cypress: [{ g: cyp, m: davLeafMat(0x3A5A30) }, { g: trunk(0.25, 0.18, 1.2), m: bark }],
olive: [{ g: davCrownGeo(3, 2.6, 1.6, 2.4, d).translate(0, 3.2, 0), m: davLeafMat(0x8A9A72) }, { g: trunk(0.34, 0.2, 3, 0.35), m: bark }],
pine: [{ g: davCrownGeo(7, 4.2, 1.5, 4.2, d).translate(0, 9.6, 0), m: davLeafMat(0x4A6A3A) }, { g: trunk(0.36, 0.22, 9.2, 0.5), m: bark }],
oak: [{ g: davCrownGeo(11, 4.4, 3.6, 4.2, d).translate(0, 7.2, 0), m: davLeafMat(0x5A7A3A) }, { g: trunk(0.55, 0.32, 5.4, 0.3), m: bark }],
poplar: [{ g: davCrownGeo(13, 1.6, 6.2, 1.6, d).translate(0, 9, 0), m: davLeafMat(0x7A9A4A) }, { g: trunk(0.3, 0.18, 4, 0) }].map(function (x) { if (!x.m)
x.m = bark; return x; }),
vine: [{ g: davCrownGeo(17, 0.7, 0.6, 0.5, 0).translate(0, 0.95, 0), m: davLeafMat(0x5A7A30) }, { g: trunk(0.06, 0.05, 0.7, 0), m: bark }]
});
},
function (x, z, R) {
var h = davLand(x, z), w = davWaterAt(x, z);
if (w !== null && h < w + 0.8)
return null;
if (h > 330)
return null;
for (var i = 0; i < DAV_TOWNS.length; i++) {
var T = DAV_TOWNS[i];
if (Math.hypot(x - T.x, z - T.z) < T.r * 0.96)
return null;
}
if (Math.abs(z - davArnoZ(x)) < 70)
return R() < 0.5 ? "poplar" : null;
var gx = davLand(x + 6, z) - davLand(x - 6, z), gz = davLand(x, z + 6) - davLand(x, z - 6), slope = Math.hypot(gx, gz) / 12;
if (slope > 0.9)
return null;
var r = R();
if (x < -2000 && x > -3200 && z > -1000 && z < 300)
return r < 0.62 ? "olive" : r < 0.72 ? "cypress" : r < 0.8 ? "vine" : null;
if (h > 140)
return r < 0.5 ? "pine" : r < 0.75 ? "oak" : null;
if (x > 2400)
return r < 0.4 ? "oak" : r < 0.55 ? "pine" : null;
return r < 0.26 ? "olive" : r < 0.4 ? "cypress" : r < 0.52 ? "oak" : r < 0.6 ? "pine" : r < 0.7 ? "vine" : null;
},
function (G) {
var K = davTreeKinds(), B = DAV_BOUND, step = DAV.lite ? 58 : 30, tile = 1000, per = {};
var R = wRand(4521);
for (var z = B.z0 + 400; z < B.z1 - 300; z += step)
for (var x = B.x0 + 400; x < B.x1 - 300; x += step) {
var jx = x + (R() - 0.5) * step * 0.9, jz = z + (R() - 0.5) * step * 0.9;
var patch = wFbm(jx / 420, jz / 420, 33, 2);
if (patch < 0.42 && R() < 0.75)
continue;
if (davRoadNear(jx, jz, 9))
continue;
var k = davTreeAt(jx, jz, R);
if (!k)
continue;
var key = Math.floor((jx - B.x0) / tile) + "," + Math.floor((jz - B.z0) / tile);
var L = per[key] || (per[key] = {});
(L[k] || (L[k] = [])).push([jx, davLand(jx, jz) - 0.15, jz, 0.75 + R() * 0.55, R() * 6.28]);
if (k === "vine")
for (var v = 1; v < 6; v++)
L[k].push([jx + v * 2.2, davLand(jx + v * 2.2, jz) - 0.1, jz, 0.9 + R() * 0.2, R() * 6.28]);
}
DAV_ROADS.forEach(function (Rd, ri) {
var pts = davRoadPts(Rd, 24);
pts.forEach(function (p, i) {
if (i % 2 || (ri === 4 && i > 40))
return;
var a = pts[Math.min(pts.length - 1, i + 1)], dx = a[0] - p[0], dz = a[1] - p[1], l = Math.hypot(dx, dz) || 1;
[-1, 1].forEach(function (s) {
var x = p[0] - dz / l * 7 * s, z = p[1] + dx / l * 7 * s, inT = false;
DAV_TOWNS.forEach(function (T) { if (Math.hypot(x - T.x, z - T.z) < T.r)
inT = true; });
if (inT || davWaterAt(x, z) !== null)
return;
var key = Math.floor((x - B.x0) / tile) + "," + Math.floor((z - B.z0) / tile);
var L = per[key] || (per[key] = {});
(L.cypress || (L.cypress = [])).push([x, davLand(x, z) - 0.15, z, 0.9 + R() * 0.3, 0]);
});
});
});
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color();
DAV.treeTiles = [];
Object.keys(per).forEach(function (key) {
var L = per[key], ab = key.split(","), cx = B.x0 + (+ab[0] + 0.5) * tile, cz = B.z0 + (+ab[1] + 0.5) * tile, grp = new THREE.Group();
grp.userData.keep = 1;
grp.name = "dav-trees";
G.add(grp);
Object.keys(L).forEach(function (k) {
var list = L[k];
K[k].forEach(function (part, pi) {
var mesh = new THREE.InstancedMesh(part.g, part.m, list.length);
mesh.userData.keep = 1;
list.forEach(function (t, i) {
e.set(0, t[4], 0);
q.setFromEuler(e);
v.set(t[0], t[1], t[2]);
s.set(t[3], t[3] * (k === "cypress" ? 1 + ((i * 37) % 10) / 25 : 1), t[3]);
m4.compose(v, q, s);
mesh.setMatrixAt(i, m4);
if (!DAV.lite && pi === 0) {
var hh = ((i * 2654435761) >>> 0) % 100 / 100;
col.setRGB(0.85 + hh * 0.2, 0.88 + hh * 0.16, 0.82 + hh * 0.18);
mesh.setColorAt(i, col);
}
});
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.geometry.userData.shared = true;
mesh.frustumCulled = false;
grp.add(mesh);
});
});
DAV.treeTiles.push({ g: grp, x: cx, z: cz });
});
},
function () {
var z = DAV.zone, E = z === "inside" || z === "tunnel" ? DAV_ENV.inside : z === "underwater" ? DAV_ENV.river : z === "romagna" || z === "imola" ? DAV_ENV.romagna : z === "amboise" ? DAV_ENV.france : z === "hills" || z === "ceceri" ? DAV_ENV.hills : DAV_ENV.out;
if (DAV.lite && E.fogD < 0.0012)
E = Object.assign({}, E, { fogD: 0.0012 });
return E;
},
function (x, W, H, base, amt, n) {
x.fillStyle = base;
x.fillRect(0, 0, W, H);
for (var i = 0; i < n; i++) {
var a = Math.random();
x.fillStyle = a < 0.5 ? "rgba(0,0,0," + (Math.random() * amt) + ")" : "rgba(255,255,255," + (Math.random() * amt * 0.8) + ")";
var s = 1 + Math.random() * 3;
x.fillRect(Math.random() * W, Math.random() * H, s, s);
}
for (var j = 0; j < W / 10; j++) {
var sx = Math.random() * W;
x.fillStyle = "rgba(40,30,20," + (0.02 + Math.random() * 0.04) + ")";
x.fillRect(sx, 0, 1 + Math.random() * 3, H * (0.3 + Math.random() * 0.7));
}
},
function (x, H, px, py, w, h, o) {
var top = H - py - h, fr = o.fr || "#9A9890", fw = Math.max(3, w * 0.13);
x.fillStyle = fr;
if (o.arch) {
x.beginPath();
x.moveTo(px - fw, H - py + fw * 0.6);
x.lineTo(px - fw, top + w / 2);
x.arc(px + w / 2, top + w / 2, w / 2 + fw, Math.PI, 0);
x.lineTo(px + w + fw, H - py + fw * 0.6);
x.closePath();
x.fill();
}
else
x.fillRect(px - fw, top - fw, w + fw * 2, h + fw * 1.6);
if (!o.arch && o.cap) {
x.fillStyle = fr;
x.fillRect(px - fw * 1.8, top - fw * 2.2, w + fw * 3.6, fw * 1.1);
}
var gr = x.createLinearGradient(0, top, 0, top + h);
gr.addColorStop(0, "#5A6878");
gr.addColorStop(0.4, "#2A3038");
gr.addColorStop(1, "#14161A");
x.fillStyle = gr;
if (o.arch) {
x.beginPath();
x.moveTo(px, H - py);
x.lineTo(px, top + w / 2);
x.arc(px + w / 2, top + w / 2, w / 2, Math.PI, 0);
x.lineTo(px + w, H - py);
x.closePath();
x.fill();
}
else
x.fillRect(px, top, w, h);
x.fillStyle = "rgba(90,70,50,.9)";
x.fillRect(px + w / 2 - 1.5, top + (o.arch ? w * 0.2 : 0), 3, h - (o.arch ? w * 0.2 : 0));
x.fillRect(px, top + h * 0.45, w, 3);
if (o.bif) {
x.fillStyle = fr;
x.fillRect(px + w / 2 - fw * 0.5, top + w * 0.5, fw, h - w * 0.5);
}
x.fillStyle = fr;
x.fillRect(px - fw * 1.5, H - py, w + fw * 3, fw * 0.9);
x.fillStyle = "rgba(0,0,0,.25)";
x.fillRect(px - fw * 1.5, H - py + fw * 0.9, w + fw * 3, fw * 0.5);
if (o.sh) {
[-1, 1].forEach(function (s) {
var sx = s < 0 ? px - fw - w * 0.46 : px + w + fw;
x.fillStyle = o.sh;
x.fillRect(sx, top, w * 0.46, h);
x.fillStyle = "rgba(0,0,0,.28)";
for (var k = top + 4; k < top + h - 2; k += 5)
x.fillRect(sx + 2, k, w * 0.46 - 4, 1.5);
x.strokeStyle = "rgba(0,0,0,.35)";
x.lineWidth = 1.5;
x.strokeRect(sx, top, w * 0.46, h);
});
}
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(px - fw, top - fw + (o.arch ? w * 0.1 : fw), w + fw * 2, 3);
},
function (style, col, band) {
var key = style + ":" + col + ":" + band;
if (DAV_FAC[key])
return DAV_FAC[key];
var ppm = DAV.lite ? 32 : 64, W = 4 * ppm, H = (band ? 5 : 4) * ppm;
var t = wTex(W, H, function (x) {
var base = davHex(col);
if (style === "palazzo" || (band && style === "noble")) {
davNoiseFill(x, W, H, base, 0.12, W * H / 40);
var bh = ppm * 0.62;
for (var r = 0; r * bh < H; r++) {
var off = (r % 2) * ppm;
for (var c = -1; c * ppm * 2 < W + ppm * 2; c++) {
var bx = c * ppm * 2 + off, by = r * bh;
var g2 = x.createLinearGradient(0, by, 0, by + bh);
g2.addColorStop(0, "rgba(255,255,255,.12)");
g2.addColorStop(0.5, "rgba(0,0,0,0)");
g2.addColorStop(1, "rgba(0,0,0,.22)");
x.fillStyle = g2;
x.fillRect(bx + 3, by + 3, ppm * 2 - 6, bh - 6);
x.fillStyle = "rgba(30,20,10,.45)";
x.fillRect(bx, by, ppm * 2, 2.5);
x.fillRect(bx, by, 2.5, bh);
}
}
}
else if (style === "brick") {
davNoiseFill(x, W, H, base, 0.1, W * H / 50);
var hb = ppm * 0.075, wb = ppm * 0.25;
for (var r2 = 0; r2 * hb < H; r2++) {
var o2 = (r2 % 2) * wb / 2;
x.fillStyle = "rgba(220,210,190,.35)";
x.fillRect(0, r2 * hb, W, 1.2);
for (var c2 = -1; c2 * wb < W + wb; c2++) {
x.fillRect(c2 * wb + o2, r2 * hb, 1.2, hb);
x.fillStyle = "rgba(" + (Math.random() < 0.5 ? 0 : 255) + ",0,0," + (Math.random() * 0.08) + ")";
x.fillRect(c2 * wb + o2 + 1, r2 * hb + 1, wb - 2, hb - 2);
x.fillStyle = "rgba(220,210,190,.35)";
}
}
}
else if (typeof davPlasterFill === "function")
davPlasterFill(x, W, H, base);
else
davNoiseFill(x, W, H, base, 0.07, W * H / 30);
var fr = style === "house" ? "#B8B0A0" : style === "brick" ? "#D8D0C0" : style === "french" ? "#E8E0D0" : "#8E908A";
if (!band) {
x.fillStyle = fr;
x.fillRect(0, H - ppm * 0.16, W, ppm * 0.16);
x.fillStyle = "rgba(0,0,0,.2)";
x.fillRect(0, H - ppm * 0.02, W, ppm * 0.04);
if (style === "house")
davWin(x, H, W / 2 - ppm * 0.5, ppm * 0.95, ppm * 1.0, ppm * 1.9, { sh: "#3E5A3A", fr: fr, cap: 0 });
else if (style === "palazzo")
davWin(x, H, W / 2 - ppm * 0.65, ppm * 1.0, ppm * 1.3, ppm * 2.2, { arch: 1, bif: 1, fr: "#7A6A58" });
else if (style === "noble")
davWin(x, H, W / 2 - ppm * 0.55, ppm * 0.9, ppm * 1.1, ppm * 2.1, { cap: 1, fr: fr, sh: "#4A3A2A" });
else if (style === "brick")
davWin(x, H, W / 2 - ppm * 0.55, ppm * 1.0, ppm * 1.1, ppm * 2.0, { arch: 1, fr: fr });
else
davWin(x, H, W / 2 - ppm * 0.6, ppm * 0.7, ppm * 1.2, ppm * 2.5, { cap: 1, fr: fr });
}
else {
var aw = ppm * 2.3, ax = W / 2 - aw / 2, ah = ppm * 3.5;
x.fillStyle = fr;
x.beginPath();
x.moveTo(ax - ppm * 0.2, H);
x.lineTo(ax - ppm * 0.2, H - ah + aw / 2);
x.arc(W / 2, H - ah + aw / 2, aw / 2 + ppm * 0.2, Math.PI, 0);
x.lineTo(ax + aw + ppm * 0.2, H);
x.fill();
var gi = x.createLinearGradient(0, H - ah, 0, H);
gi.addColorStop(0, "#1A1612");
gi.addColorStop(1, "#3A2E24");
x.fillStyle = gi;
x.beginPath();
x.moveTo(ax, H);
x.lineTo(ax, H - ah + aw / 2);
x.arc(W / 2, H - ah + aw / 2, aw / 2, Math.PI, 0);
x.lineTo(ax + aw, H);
x.fill();
x.fillStyle = style === "brick" ? "#5A3A22" : "#6A4A2A";
x.fillRect(ax + ppm * 0.15, H - ppm * 2.4, aw - ppm * 0.3, ppm * 2.4);
x.fillStyle = "rgba(0,0,0,.35)";
for (var k = 1; k < 5; k++)
x.fillRect(ax + ppm * 0.15 + k * (aw - ppm * 0.3) / 5, H - ppm * 2.4, 2, ppm * 2.4);
x.fillStyle = "#C8A050";
x.fillRect(W / 2 + ppm * 0.3, H - ppm * 1.3, 4, 4);
x.fillStyle = fr;
x.fillRect(0, H - ppm * 0.25, W, ppm * 0.25);
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (DAV_FAC[key] = t);
},
function (w, d, rise, o, flat) {
var W = w / 2 + o, D = d / 2 + o, r = Math.min(W, D), pos = [], uv = [];
function tri(a, b, c) { [a, b, c].forEach(function (p) { pos.push(p[0], p[1], p[2]); }); }
var long = W >= D, ridge = long ? W - r : D - r, top = rise;
if (flat) {
var A = [-W, 0, -D], B = [W, 0, -D], C = [W, 0, D], Dd = [-W, 0, D];
if (long) {
var R1 = [-W, top, 0], R2 = [W, top, 0];
tri(A, R1, R2);
tri(A, R2, B);
tri(Dd, C, R2);
tri(Dd, R2, R1);
tri(A, Dd, R1);
tri(B, R2, C);
}
else {
var R3 = [0, top, -D], R4 = [0, top, D];
tri(A, Dd, R4);
tri(A, R4, R3);
tri(B, R3, R4);
tri(B, R4, C);
tri(A, R3, B);
tri(Dd, C, R4);
}
}
else {
var p1 = long ? [-ridge, top, 0] : [0, top, -ridge], p2 = long ? [ridge, top, 0] : [0, top, ridge];
var a = [-W, 0, -D], b = [W, 0, -D], c = [W, 0, D], dd = [-W, 0, D];
if (long) {
tri(a, p1, p2);
tri(a, p2, b);
tri(dd, c, p2);
tri(dd, p2, p1);
tri(a, dd, p1);
tri(b, p2, c);
}
else {
tri(a, dd, p2);
tri(a, p2, p1);
tri(b, p1, p2);
tri(b, p2, c);
tri(a, p1, b);
tri(dd, c, p2);
}
}
for (var i = 0; i < pos.length; i += 3)
uv.push(pos[i] + pos[i + 2] * 0.3, pos[i + 1] * 1.6 + pos[i + 2] * 0.7);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeVertexNormals();
return g;
},
function (parent, x, z, w, d, o) {
o = o || {};
var y = o.y || 0, style = o.style || "house", col = o.col || DAV_COLS[0], fl = o.floors || 2, gh = 5, h = gh + fl * 4;
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
parent.add(g);
davWalls(g, w, d, 0, gh, davFacMat(style === "house" && !o.shops ? "house" : style, style === "house" ? davShade2(col, 0.92) : col, 1), 1);
davWalls(g, w, d, gh, h, davFacMat(style, col, 0), 0);
var stone = davC(style === "brick" ? 0xC8B8A0 : 0xB8B0A0);
wBox(w + 0.5, 0.45, d + 0.5, stone, 0, h - 0.2, 0, g);
if (!DAV.lite) {
wBox(w + 0.24, 0.25, d + 0.24, stone, 0, gh, 0, g);
}
if (!o.noRoof) {
var eave = style === "french" ? 0.5 : 1.25, rise = o.rise || Math.min(w, d) * 0.24;
var r = new THREE.Mesh(davRoofGeo(w, d, rise, eave, o.flat), davRoofMat(o.roofCol));
r.position.y = h + 0.02;
g.add(r);
if (!DAV.lite && style !== "french") {
var un = wBox(w + eave * 2 - 0.1, 0.16, d + eave * 2 - 0.1, davC(0x4A3424), 0, h + 0.04, 0, g);
}
if (!DAV.lite && o.chim !== false && w * d > 120) {
var cx = (((x * 7 + z * 3) | 0) % 3 - 1) * w * 0.25;
wBox(0.7, 1.6, 0.7, davC(0xB8A890), cx, h + rise * 0.6 + 0.7, d * 0.12, g);
wBox(0.95, 0.18, 0.95, davC(0x8A6A50), cx, h + rise * 0.6 + 1.5, d * 0.12, g);
}
}
if (o.solid !== false) {
var ry = o.ry || 0, sw = Math.abs(Math.cos(ry)) > 0.5;
davSolid({ x: x, z: z, hw: (sw ? w : d) / 2, hd: (sw ? d : w) / 2, h: h + 8, b: y });
}
if (o.door && typeof evbWorldDoor === "function") {
var f = o.door, th = f.theme || (style === "french" ? "maisonfr" : style === "house" || style === "brick" ? (o.shops ? evbItShop(x, z) : "casafi") : "palazzofi");
if (EVB_THEMES[th])
evbWorldDoor(DAV_KEY, x, z, Math.atan2(f.nx, f.nz), Math.abs(f.nx) > 0.5 ? w / 2 : d / 2, th, f.name || (EVB_IT_NAMES[th] + ", " + (f.town || "Florence")), { y: y, doors: o.shops ? "the workshop door" : "the street door" });
}
return { g: g, h: h };
},
function (s) {
DAV.solids.push(s);
var R = s.r !== undefined ? s.r : Math.hypot(s.hw, s.hd);
var g = DAV.sgrid || (DAV.sgrid = {});
for (var i = Math.floor((s.x - R) / DAV_SG); i <= Math.floor((s.x + R) / DAV_SG); i++)
for (var j = Math.floor((s.z - R) / DAV_SG); j <= Math.floor((s.z + R) / DAV_SG); j++) {
var k = i + "," + j;
(g[k] || (g[k] = [])).push(s);
}
return s;
},
function (list, x, z, feet) {
var best = null;
for (var i = 0; i < list.length; i++) {
var f = list[i], lx = x - f.x, lz = z - f.z;
if (f.rot) {
var c = Math.cos(-f.rot), s = Math.sin(-f.rot), a = lx * c + lz * s;
lz = -lx * s + lz * c;
lx = a;
}
if (f.r !== undefined) {
if (lx * lx + lz * lz > f.r * f.r)
continue;
}
else if (Math.abs(lx) > f.hw || Math.abs(lz) > f.hd)
continue;
var y = f.y;
if (f.ramp) {
var t = f.ramp === "x" ? (lx / f.hw + 1) / 2 : (lz / f.hd + 1) / 2;
y = f.y0 + (f.y1 - f.y0) * t;
}
if (y <= feet + 0.65 && (best === null || y > best))
best = y;
}
return best;
},
function (parent, x, y, z, ry, w, h, dep, mat) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
parent.add(g);
var n = DAV.lite ? 6 : 12, r = w / 2, th = 0.55;
[-1, 1].forEach(function (k) { wBox(th, h - r, dep, mat, k * (r + th / 2), (h - r) / 2, 0, g); });
for (var i = 0; i < n; i++) {
var a0 = i / n * Math.PI, a1 = (i + 1) / n * Math.PI, am = (a0 + a1) / 2, seg = wBox(th, r * Math.PI / n + 0.05, dep, mat, Math.cos(am) * (r + th / 2), h - r + Math.sin(am) * (r + th / 2), 0, g);
seg.rotation.z = am;
}
return g;
},
function (parent, x0, z0, x1, z1, y, mat, big) {
var l = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.floor(l / (big ? 2.4 : 1.8))), a = Math.atan2(z1 - z0, x1 - x0);
var m = wBox(l, 0.7, big ? 1.2 : 0.8, mat, (x0 + x1) / 2, y + 0.35, (z0 + z1) / 2, parent);
m.rotation.y = -a;
for (var i = 0; i < n; i += 2) {
var t = (i + 0.5) / n, b = wBox(l / n * 0.95, big ? 1.6 : 1.1, big ? 0.9 : 0.6, mat, x0 + (x1 - x0) * t, y + 0.7 + (big ? 0.8 : 0.55), z0 + (z1 - z0) * t, parent);
b.rotation.y = -a;
}
if (!DAV.lite)
for (var j = 0; j < n; j++) {
var t2 = (j + 0.5) / n, c2 = wBox(0.35, 0.9, big ? 1.6 : 1.1, mat, x0 + (x1 - x0) * t2, y - 0.45, z0 + (z1 - z0) * t2, parent);
c2.rotation.y = -a;
}
},
function (kind) {
if (DAV_MARB[kind])
return DAV_MARB[kind];
var S = DAV.lite ? 256 : 512;
var t = wTex(S, S, function (x, W, H) {
davNoiseFill(x, W, H, "#EDE8DE", 0.05, W * H / 25);
var g = "#3A5A48", p = "#C89A8A", b = W * 0.045;
x.fillStyle = g;
if (kind === "panel") {
x.fillRect(0, 0, W, b);
x.fillRect(0, H - b, W, b);
x.fillRect(0, 0, b, H);
x.fillRect(W / 2 - b / 2, 0, b, H);
[W / 4, W * 3 / 4].forEach(function (cx) {
x.fillStyle = p;
x.beginPath();
x.moveTo(cx, H * 0.3);
x.lineTo(cx + W * 0.09, H / 2);
x.lineTo(cx, H * 0.7);
x.lineTo(cx - W * 0.09, H / 2);
x.fill();
x.strokeStyle = g;
x.lineWidth = b * 0.4;
x.strokeRect(cx - W * 0.19, H * 0.12, W * 0.38, H * 0.76);
});
}
else if (kind === "arch") {
x.fillRect(0, 0, W, b);
x.fillRect(0, H - b * 1.5, W, b * 1.5);
x.fillRect(0, 0, b, H);
x.fillRect(W - b, 0, b, H);
x.lineWidth = b * 0.8;
x.strokeStyle = g;
x.beginPath();
x.moveTo(W * 0.2, H - b * 1.5);
x.lineTo(W * 0.2, H * 0.38);
x.arc(W / 2, H * 0.38, W * 0.3, Math.PI, 0);
x.lineTo(W * 0.8, H - b * 1.5);
x.stroke();
x.fillStyle = p;
x.fillRect(W * 0.36, H * 0.5, W * 0.28, H * 0.08);
}
else if (kind === "band") {
for (var i = 0; i < 6; i++) {
x.fillStyle = i % 2 ? g : "#E8E2D4";
x.fillRect(0, i * H / 6, W, H / 12);
}
x.fillStyle = p;
x.fillRect(0, H * 0.46, W, H * 0.08);
}
x.strokeStyle = "rgba(120,110,100,.12)";
x.lineWidth = 1;
for (var v = 0; v < 14; v++) {
x.beginPath();
var sx = Math.random() * W, sy = Math.random() * H;
x.moveTo(sx, sy);
for (var s = 0; s < 6; s++) {
sx += (Math.random() - 0.3) * 40;
sy += (Math.random() - 0.5) * 30;
x.lineTo(sx, sy);
}
x.stroke();
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return (DAV_MARB[kind] = t);
},
function (kind, mpt) {
var k = "mb:" + kind + ":" + mpt;
if (DAV.mats[k])
return DAV.mats[k];
var t = davMarbleTex(kind).clone();
t.needsUpdate = true;
t.repeat.set(1 / mpt, 1 / mpt);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return (DAV.mats[k] = DAV.lite ? new THREE.MeshLambertMaterial({ map: t, color: 0xDCD7CD }) : new THREE.MeshPhongMaterial({ map: t, color: 0xDCD7CD, shininess: 22, specular: 0x2A2A2A }));
},
function (G) {
var O = DAV_DUOMO, panel = davMarbleMat("panel", 9), band = davMarbleMat("band", 8), white = davSurf("marble", 0xD8D2C6, 4), tileM = davSurf("tile", 0xD07858, 1.8);
var grp = new THREE.Group();
G.add(grp);
var nx0 = O.x - 112, nx1 = O.x - 20, nw = 40, nh = 30;
var nave = new THREE.Mesh(davUVany(new THREE.BoxGeometry(nx1 - nx0, nh, nw)), panel);
nave.position.set((nx0 + nx1) / 2, nh / 2, O.z);
grp.add(nave);
var nr = new THREE.Mesh(davRoofGeo(nx1 - nx0, nw, 11, 0.6, true), tileM);
nr.position.set((nx0 + nx1) / 2, nh, O.z);
grp.add(nr);
for (var wx = nx0 + 10; wx < nx1 - 4; wx += 18)
[-1, 1].forEach(function (s) {
var ow = new THREE.Mesh(new THREE.CircleGeometry(2.2, DAV.lite ? 10 : 20), davC(0x2A2A30));
ow.position.set(wx, nh - 6, O.z + s * (nw / 2 + 0.05));
ow.rotation.y = s > 0 ? 0 : Math.PI;
grp.add(ow);
var wr = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.9, DAV.lite ? 10 : 20), davC(0x3A5A48));
wr.position.copy(ow.position);
wr.position.z += s * 0.03;
wr.rotation.y = ow.rotation.y;
grp.add(wr);
var tw = wBox(2.4, 9, 0.2, davC(0x24262C), wx + 6, 12, O.z + s * (nw / 2 + 0.05), grp);
});
davBoxM(1.6, nh, nw + 4, davSurf("stone", 0xC0B4A0, 3), nx0 - 0.8, nh / 2, O.z, grp);
var lowF = new THREE.Mesh(davUVany(new THREE.BoxGeometry(1.2, 12, nw + 4)), davMarbleMat("arch", 6));
lowF.position.set(nx0 - 1.8, 6, O.z);
grp.add(lowF);
[-12, 0, 12].forEach(function (dz, i) { var d = wBox(0.4, i === 1 ? 8.5 : 6, i === 1 ? 4.6 : 3.4, davC(0x5A3E26), nx0 - 2.5, i === 1 ? 4.25 : 3, O.z + dz, grp); });
var gable = new THREE.Mesh(davRoofGeo(2, nw + 4, 10, 0, true), davSurf("stone", 0xC0B4A0, 3));
gable.position.set(nx0 - 0.8, nh, O.z);
grp.add(gable);
var rose = new THREE.Mesh(new THREE.CircleGeometry(3.4, DAV.lite ? 12 : 28), davC(0x2A3040));
rose.position.set(nx0 - 1.65, nh - 4, O.z);
rose.rotation.y = -Math.PI / 2;
grp.add(rose);
davSolid({ x: (nx0 + nx1) / 2 - 1, z: O.z, hw: (nx1 - nx0) / 2 + 3, hd: nw / 2 + 0.5, h: nh + 12 });
var R = 24;
var drum = new THREE.Mesh(davUVany(new THREE.CylinderGeometry(R, R, 24, 8, 1, true)), band);
drum.position.set(O.x, nh + 12, O.z);
drum.rotation.y = Math.PI / 8;
grp.add(drum);
var drumBase = new THREE.Mesh(davUVany(new THREE.CylinderGeometry(R + 3, R + 3, nh, 8)), panel);
drumBase.position.set(O.x, nh / 2, O.z);
drumBase.rotation.y = Math.PI / 8;
grp.add(drumBase);
for (var f = 0; f < 8; f++) {
var a = f / 8 * Math.PI * 2, ow2 = new THREE.Mesh(new THREE.CircleGeometry(2.8, DAV.lite ? 10 : 22), davC(0x22242A));
ow2.position.set(O.x + Math.cos(a) * (R * Math.cos(Math.PI / 8) + 0.05), nh + 12, O.z + Math.sin(a) * (R * Math.cos(Math.PI / 8) + 0.05));
ow2.rotation.y = Math.PI / 2 - a;
grp.add(ow2);
var rg = new THREE.Mesh(new THREE.RingGeometry(2.8, 3.7, DAV.lite ? 10 : 22), davC(0x3A5A48));
rg.position.copy(ow2.position);
rg.rotation.y = ow2.rotation.y;
grp.add(rg);
}
davSolid({ x: O.x, z: O.z, r: R + 3, h: nh + 40 });
[[0, -1], [0, 1], [1, 0]].forEach(function (dir) {
var tx = O.x + dir[0] * (R + 10), tz = O.z + dir[1] * (R + 10);
var tb = new THREE.Mesh(davUVany(new THREE.CylinderGeometry(12, 12, 24, 8, 1, false, 0, Math.PI)), panel);
tb.position.set(tx, 12, tz);
tb.rotation.y = Math.atan2(dir[0], dir[1]) - Math.PI / 2;
grp.add(tb);
var sd = davLathe([[12.2, 0], [11.6, 3.4], [9.6, 6.6], [6.2, 9], [0, 10.2]], 8, tileM, grp, tx, 24, tz);
sd.rotation.y = tb.rotation.y;
davSolid({ x: tx, z: tz, r: 12.5, h: 34 });
});
var prof = [];
for (var i = 0; i <= 14; i++) {
var t = i / 14, ang = t * Math.PI * 0.42, r = R - 0.4 - (R - 6) * (1 - Math.cos(ang)) / (1 - Math.cos(Math.PI * 0.42)), y = Math.sin(ang) / Math.sin(Math.PI * 0.42) * 38;
prof.push([Math.max(5.6, r * Math.pow(1 - t, 0.12) + (t > 0.95 ? 0 : 0)), y]);
}
prof[prof.length - 1][0] = 5.6;
var dome = davLathe(prof, 8, tileM, grp, O.x, nh + 24, O.z);
dome.rotation.y = Math.PI / 8;
(function () { var g = dome.geometry, p = g.attributes.position, uv = g.attributes.uv; for (var i = 0; i < uv.count; i++) {
var X = p.getX(i), Z = p.getZ(i);
uv.setXY(i, Math.atan2(Z, X) * Math.hypot(X, Z), p.getY(i));
} uv.needsUpdate = true; })();
for (var k = 0; k < 8; k++) {
var a2 = k / 8 * Math.PI * 2 + Math.PI / 8 + Math.PI / 8;
for (var s = 0; s < prof.length - 1; s++) {
var p0 = prof[s], p1 = prof[s + 1], ym = (p0[1] + p1[1]) / 2, rm = (p0[0] + p1[0]) / 2 / Math.cos(Math.PI / 8), l = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
var rib = wBox(1.3, l + 0.3, 1.1, white, O.x + Math.cos(a2) * (rm + 0.25), nh + 24 + ym, O.z + Math.sin(a2) * (rm + 0.25), grp);
rib.rotation.order = "YXZ";
rib.rotation.y = -a2;
rib.rotation.z = Math.atan2(p1[0] - p0[0], p1[1] - p0[1]);
}
}
var ly = nh + 24 + 38;
wCyl(9.2, 9.2, 1, white, O.x, ly + 0.5, O.z, grp, 8);
for (var rc = 0; rc < 16; rc++) {
var ra = rc / 16 * Math.PI * 2;
if (rc % 2)
wBox(0.25, 1.1, 3.4, white, O.x + Math.cos(ra) * 8.9, ly + 1.55, O.z + Math.sin(ra) * 8.9, grp).rotation.y = -ra;
}
for (var c = 0; c < 8; c++) {
var a3 = c / 8 * Math.PI * 2;
wBox(1, 9, 1, white, O.x + Math.cos(a3) * 4.6, ly + 5.5, O.z + Math.sin(a3) * 4.6, grp);
var bt = wBox(0.8, 5, 2.6, white, O.x + Math.cos(a3) * 5.6, ly + 3, O.z + Math.sin(a3) * 5.6, grp);
bt.rotation.y = -a3;
}
wCyl(3.6, 3.6, 8, davC(0x3A3A40), O.x, ly + 5, O.z, grp, 8);
wCyl(5.4, 5.4, 1, white, O.x, ly + 10.4, O.z, grp, 8);
wCone(4.6, 7, white, O.x, ly + 14.4, O.z, grp, 8);
var ball = wSph(1.25, davC(0xD8B048, { shine: 60, spec: 0x8A7030 }), O.x, ly + 19, O.z, grp, DAV.lite ? 10 : 20);
wBox(0.22, 3, 0.22, davC(0xD8B048), O.x, ly + 21.6, O.z, grp);
wBox(1.4, 0.22, 0.22, davC(0xD8B048), O.x, ly + 22.3, O.z, grp);
DAV.lantern = { x: O.x, z: O.z, y: ly + 1, sx: O.x + Math.cos(Math.PI / 8) * 7.4, sz: O.z + Math.sin(Math.PI / 8) * 7.4, yaw: Math.atan2(-Math.cos(Math.PI / 8), -Math.sin(Math.PI / 8)) };
davFloor(O.x, O.z, 0, 0, ly + 1, { r: 9.2 });
davSpot(nx0 - 4, O.z, 4, "Santa Maria del Fiore", "go in (the nave, and the climb up the dome)", function () { davEnter("duomo"); });
davSign(["SANTA MARIA DEL FIORE", "the cathedral · the dome · press E at the door"], 6, 1.2, nx0 - 2.8, 14, O.z, -Math.PI / 2, grp);
var cx = O.x - 86, cz = O.z + 34;
var ct = new THREE.Mesh(davUVany(new THREE.BoxGeometry(14, 80, 14)), davMarbleMat("arch", 7));
ct.position.set(cx, 40, cz);
grp.add(ct);
for (var lv = 1; lv < 5; lv++)
davBoxM(14.8, 0.7, 14.8, white, cx, lv * 16, cz, grp);
[[0, 7.05, 0], [0, -7.05, Math.PI], [7.05, 0, Math.PI / 2], [-7.05, 0, -Math.PI / 2]].forEach(function (f) { [62, 72].forEach(function (wy) { var w = wBox(3, 8, 0.12, davC(0x24262C), cx + f[0], wy, cz + f[1], grp); w.rotation.y = f[2]; }); });
davBoxM(16, 1.2, 16, white, cx, 80.6, cz, grp);
davBattle(grp, cx - 7.5, cz - 7.5, cx + 7.5, cz - 7.5, 81.2, white);
davBattle(grp, cx - 7.5, cz + 7.5, cx + 7.5, cz + 7.5, 81.2, white);
davSolid({ x: cx, z: cz, hw: 7.4, hd: 7.4, h: 90 });
var bx = O.x - 162, bz = O.z;
var bp = new THREE.Mesh(davUVany(new THREE.CylinderGeometry(14, 14, 24, 8)), davMarbleMat("arch", 6));
bp.position.set(bx, 12, bz);
bp.rotation.y = Math.PI / 8;
grp.add(bp);
var att = new THREE.Mesh(davUVany(new THREE.CylinderGeometry(13.4, 13.4, 5, 8)), davMarbleMat("band", 5));
att.position.set(bx, 26.5, bz);
att.rotation.y = Math.PI / 8;
grp.add(att);
var pyr = wCone(14.4, 8, white, bx, 33, bz, grp, 8);
pyr.rotation.y = Math.PI / 8;
wCyl(1.8, 1.8, 3, white, bx, 38.5, bz, grp, 8);
wCone(2.2, 2.6, white, bx, 41.3, bz, grp, 8);
var gates = wBox(0.3, 7.6, 4.6, davC(0xC8A040, { shine: 50, spec: 0x6A5020 }), bx + 12.6, 3.8, bz, grp);
davSolid({ x: bx, z: bz, r: 14.2, h: 40 });
davPave(grp, O.x - 60, O.z, 264, 128, 0.02, 0xD8D0C0, 1.9);
return grp;
},
function (G) {
var P = DAV_PV, grp = new THREE.Group();
G.add(grp);
var stone = davFacMat("palazzo", 0xB8A078, 0), stoneB = davFacMat("palazzo", 0xB09870, 1), rough = davSurf("stone", 0xC8B090, 3);
var g = new THREE.Group();
g.position.set(P.x, 0, P.z);
grp.add(g);
davWalls(g, P.w, P.d, 0, 8, stoneB, 1);
davWalls(g, P.w, P.d, 8, P.h, stone, 0);
davBoxM(P.w + 3, 4, P.d + 3, rough, P.x, P.h + 2, P.z, grp);
for (var i = 0; i < (DAV.lite ? 12 : 24); i++) {
[-1, 1].forEach(function (s) { wBox(0.6, 1.8, 1.5, davC(0xA89070), P.x - P.w / 2 + (i + 0.5) * P.w / (DAV.lite ? 12 : 24), P.h - 0.9, P.z + s * (P.d / 2 + 0.75), grp); });
}
davBattle(grp, P.x - P.w / 2 - 1.5, P.z - P.d / 2 - 1.5, P.x + P.w / 2 + 1.5, P.z - P.d / 2 - 1.5, P.h + 4, rough, true);
davBattle(grp, P.x - P.w / 2 - 1.5, P.z + P.d / 2 + 1.5, P.x + P.w / 2 + 1.5, P.z + P.d / 2 + 1.5, P.h + 4, rough, true);
davBattle(grp, P.x - P.w / 2 - 1.5, P.z - P.d / 2 - 1.5, P.x - P.w / 2 - 1.5, P.z + P.d / 2 + 1.5, P.h + 4, rough, true);
davBattle(grp, P.x + P.w / 2 + 1.5, P.z - P.d / 2 - 1.5, P.x + P.w / 2 + 1.5, P.z + P.d / 2 + 1.5, P.h + 4, rough, true);
var tx = P.x - 4, tz = P.z + P.d / 2 - 5;
davBoxM(8, 52, 8, rough, tx, P.h + 30, tz, grp);
davBoxM(10.4, 3, 10.4, rough, tx, P.h + 57, tz, grp);
davBattle(grp, tx - 5.2, tz - 5.2, tx + 5.2, tz - 5.2, P.h + 58.5, rough, true);
davBattle(grp, tx - 5.2, tz + 5.2, tx + 5.2, tz + 5.2, P.h + 58.5, rough, true);
[[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(function (d) { for (var c = -1; c <= 1; c += 2)
wBox(0.9, 7, 0.9, rough, tx + d[0] * 4.6 + (d[1] ? c * 3.6 : 0), P.h + 63.5, tz + d[1] * 4.6 + (d[0] ? c * 3.6 : 0), grp); });
davBoxM(10, 1, 10, rough, tx, P.h + 67.5, tz, grp);
wCone(5.6, 6, davSurf("tile", 0xB86848, 2), tx, P.h + 71, tz, grp, 4).rotation.y = Math.PI / 4;
var clock = new THREE.Mesh(new THREE.CircleGeometry(2.2, DAV.lite ? 14 : 28), new THREE.MeshLambertMaterial({ map: davClockTex() }));
clock.position.set(tx, P.h + 45, tz + 4.05);
grp.add(clock);
davSolid({ x: P.x, z: P.z, hw: P.w / 2 + 0.4, hd: P.d / 2 + 0.4, h: P.h + 80 });
wBox(0.4, 6, 4, davC(0x4A3220), P.x - P.w / 2 - 0.15, 3, P.z + 6, grp);
davSign(["PALAZZO VECCHIO", "the Hall of the Five Hundred · press E"], 5, 1, P.x - P.w / 2 - 0.6, 8.6, P.z + 6, -Math.PI / 2, grp);
davSpot(P.x - P.w / 2 - 3, P.z + 6, 3.6, "The Palazzo Vecchio", "go in (the Hall of the Five Hundred)", function () { davEnter("vecchio"); });
var lg = new THREE.Group();
grp.add(lg);
var lx = 84, lz = 168, mat = davSurf("stone", 0xC8BCA8, 3);
for (var a = 0; a < 3; a++) {
davArch(lg, lx - 14 + a * 14, 0, lz, 0, 11, 16, 3, mat);
}
davBoxM(44, 2.4, 14, mat, lx, 17.2, lz + 5, lg);
var lr = new THREE.Mesh(davRoofGeo(44, 14, 2.4, 0.6, true), davRoofMat());
lr.position.set(lx, 18.4, lz + 5);
lg.add(lr);
[-21, 21].forEach(function (e) { davSolid({ x: lx + e, z: lz + 5, hw: 1, hd: 7, h: 20 }); });
davSolid({ x: lx, z: lz + 11.6, hw: 22, hd: 0.6, h: 20 });
davFloor(lx, lz + 5, 21.5, 6.8, 0.6);
davBoxM(43, 0.6, 13.6, davSurf("paving", 0xD8D0C0, 2.5), lx, 0.3, lz + 5, lg);
wCyl(5, 5.4, 0.9, davSurf("marble", 0xD4CEC2, 2), 30, 0.45, 108, grp, DAV.lite ? 14 : 28);
var fw = new THREE.Mesh(new THREE.CircleGeometry(4.6, DAV.lite ? 14 : 28), davWaterMat(0x6A9A98));
fw.rotation.x = -Math.PI / 2;
fw.position.set(30, 0.85, 108);
grp.add(fw);
wCyl(0.6, 0.9, 3, davSurf("marble", 0xD4CEC2, 2), 30, 2, 108, grp, 12);
davSolid({ x: 30, z: 108, r: 5.3, h: 1 });
davPave(grp, 58, 98, 140, 160, 0.02, 0xC8BCA8, 1.9);
return grp;
},
function () {
if (DAV_CLOCK)
return DAV_CLOCK;
DAV_CLOCK = wTex(128, 128, function (x, W, H) {
x.fillStyle = "#1E2A44";
x.beginPath();
x.arc(64, 64, 62, 0, 7);
x.fill();
x.strokeStyle = "#D8B048";
x.lineWidth = 4;
x.stroke();
x.fillStyle = "#D8B048";
for (var i = 0; i < 24; i++) {
var a = i / 24 * Math.PI * 2;
x.fillRect(64 + Math.cos(a) * 50 - 2, 64 + Math.sin(a) * 50 - 2, 4, 4);
}
x.strokeStyle = "#D8B048";
x.lineWidth = 5;
x.beginPath();
x.moveTo(64, 64);
x.lineTo(64, 24);
x.stroke();
});
return DAV_CLOCK;
},
function (pts, y0, y1, mat, parent) {
var pos = [], uv = [], idx = [], run = 0;
for (var i = 0; i < pts.length; i++) {
var p = pts[i];
if (i)
run += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
pos.push(p[0], y0, p[1], p[0], y1, p[1]);
uv.push(run, y0, run, y1);
if (i) {
var a = (i - 1) * 2;
idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.material.side = THREE.DoubleSide;
(parent || DAV.G).add(m);
return m;
},
function (G) {
var grp = new THREE.Group();
G.add(grp);
var stone = davSurf("stone", 0xC8B898, 3);
[-1, 1].forEach(function (s) {
var pts = [];
for (var x = -700; x <= 700; x += 20) {
var ok = true;
DAV_BRIDGES.forEach(function (B) { if (Math.abs(x - B.x) < 1)
ok = true; });
pts.push([x, davArnoZ(x) + s * 33.5]);
}
davVRibbon(pts, -4.6, 0.05, stone, grp);
var run = [];
pts.forEach(function (p) {
var near = DAV_BRIDGES.some(function (B) { return Math.abs(p[0] - B.x) < (B.old ? 14 : 10); });
if (near) {
if (run.length > 1)
davParapet(run, grp, stone, s);
run = [];
}
else
run.push(p);
});
if (run.length > 1)
davParapet(run, grp, stone, s);
});
DAV_BRIDGES.forEach(function (B) { davBridge(grp, B); });
return grp;
},
function (run, grp, mat, s) {
for (var i = 0; i < run.length - 1; i++) {
var a = run[i], b = run[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]), m = wBox(l + 0.3, 0.9, 0.5, mat, (a[0] + b[0]) / 2, 0.45, (a[1] + b[1]) / 2 + s * 0.25, grp);
m.rotation.y = -Math.atan2(b[1] - a[1], b[0] - a[0]);
davSolid({ x: (a[0] + b[0]) / 2, z: (a[1] + b[1]) / 2 + s * 0.25, hw: l / 2 + 0.15, hd: 0.3, rot: -Math.atan2(b[1] - a[1], b[0] - a[0]), h: 0.9 });
}
},
function (grp, B) {
var z0 = davArnoZ(B.x) - 34, z1 = davArnoZ(B.x) + 34, L = z1 - z0, w = B.old ? 20 : 12, stone = davSurf("stone", B.old ? 0xC8B490 : 0xD0C4A8, 3), zc = (z0 + z1) / 2;
davBoxM(w, 0.9, L + 2, davSurf("paving", 0xC8C0B0, 3), B.x, 0.1, zc, grp);
davFloor(B.x, zc, w / 2, L / 2 + 1, 0.55);
[-1, 1].forEach(function (k) { davBoxM(5, 6, w - 1, stone, B.x, -2.6, zc + k * L / 6, grp).rotation.y = Math.PI / 2; });
[-1, 0, 1].forEach(function (k) {
var a = new THREE.Mesh(new THREE.TorusGeometry(L / 6 - 1.5, 0.7, 6, DAV.lite ? 8 : 16, Math.PI), stone);
a.position.set(B.x + w / 2 - 0.3, -2.3, zc + k * L / 3);
a.rotation.y = Math.PI / 2;
grp.add(a);
var a2 = a.clone();
a2.position.x = B.x - w / 2 + 0.3;
grp.add(a2);
});
if (B.old) {
var cols = [0xD8A868, 0xE0C090, 0xC88858, 0xE4CCA0, 0xD49A70, 0xDCB880];
for (var i = 0; i < 12; i++) {
var t = (i + 0.5) / 12, zz = z0 + t * L;
if (Math.abs(zz - zc) < 7)
continue;
[-1, 1].forEach(function (s) {
var c = cols[(i * 3 + (s > 0 ? 1 : 0)) % cols.length], sh = wBox(5, 4 + (i % 3) * 0.8, L / 12 - 0.3, davFacMat("house", c, 0), B.x + s * (w / 2 - 1.5), 2.6 + (i % 3) * 0.4, zz, grp);
var rf = wBox(5.6, 0.3, L / 12, davSurf("tile", 0xD08060, 1.8), B.x + s * (w / 2 - 1.3), 4.8 + (i % 3) * 0.8, zz, grp);
rf.rotation.z = s * 0.18;
for (var b = -1; b <= 1; b += 2)
wBox(0.3, 1.6, 0.3, davC(0x5A3A22), B.x + s * (w / 2 + 0.9), 0.2, zz + b * 1.6, grp);
davSolid({ x: B.x + s * (w / 2 - 1.5), z: zz, hw: 2.5, hd: L / 24, h: 6 });
});
}
davSign(["PONTE VECCHIO", "the goldsmiths' bridge"], 3.6, 0.8, B.x, 5.6, z0 + 5.5, 0, grp);
}
else {
[-1, 1].forEach(function (s) { davBoxM(0.5, 1, L + 2, stone, B.x + s * (w / 2 - 0.25), 1, zc, grp); davSolid({ x: B.x + s * (w / 2 - 0.25), z: zc, hw: 0.3, hd: L / 2 + 1, h: 1 }); });
}
},
function (G) {
var grp = new THREE.Group();
G.add(grp);
var stone = davSurf("stone", 0xC0AC8C, 3.4), n = DAV.lite ? 110 : 220;
var gateA = DAV_GATES.map(function (g) { return g.a; });
function near(a, list, w) { for (var i = 0; i < list.length; i++) {
var d = Math.atan2(Math.sin(a - list[i]), Math.cos(a - list[i]));
if (Math.abs(d) < w)
return true;
} return false; }
for (var i = 0; i < n; i++) {
var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, am = (a0 + a1) / 2, r0 = davFlWallR(a0), r1 = davFlWallR(a1);
var x0 = Math.cos(a0) * r0, z0 = Math.sin(a0) * r0 + 20, x1 = Math.cos(a1) * r1, z1 = Math.sin(a1) * r1 + 20, xm = (x0 + x1) / 2, zm = (z0 + z1) / 2;
if (near(am, gateA, 0.012))
continue;
if (Math.abs(zm - davArnoZ(xm)) < 40)
continue;
var l = Math.hypot(x1 - x0, z1 - z0), wall = davBoxM(l + 0.4, 11, 2.6, stone, xm, 5.5, zm, grp);
wall.rotation.y = -Math.atan2(z1 - z0, x1 - x0);
if (!DAV.lite || i % 2 === 0) {
var bt = wBox(l * 0.45, 1.2, 2.6, stone, xm, 11.6, zm, grp);
bt.rotation.y = wall.rotation.y;
}
davSolid({ x: xm, z: zm, hw: l / 2 + 0.2, hd: 1.4, rot: -Math.atan2(z1 - z0, x1 - x0), h: 12 });
if (i % (DAV.lite ? 7 : 14) === 0) {
davBoxM(8, 17, 8, stone, xm, 8.5, zm, grp).rotation.y = wall.rotation.y;
davSolid({ x: xm, z: zm, r: 5.5, h: 18 });
var tr = new THREE.Mesh(davRoofGeo(8, 8, 3.4, 0.4), davRoofMat());
tr.position.set(xm, 17, zm);
tr.rotation.y = wall.rotation.y;
grp.add(tr);
}
}
DAV_GATES.forEach(function (Gt) {
var r = davFlWallR(Gt.a), x = Math.cos(Gt.a) * r, z = Math.sin(Gt.a) * r + 20, ry = -Gt.a + Math.PI / 2;
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
grp.add(g);
[-1, 1].forEach(function (k) { var p = davBoxM(6, 22, 12, stone, 0, 0, 0, g); p.position.set(k * 7.5, 11, 0); });
davBoxM(21, 8, 12, stone, 0, 0, 0, g).position.set(0, 18, 0);
davArch(g, 0, 0, 6.05, 0, 9, 13, 0.6, stone);
davArch(g, 0, 0, -6.05, 0, 9, 13, 0.6, stone);
var gr = new THREE.Mesh(davRoofGeo(21, 12, 4, 0.6), davRoofMat());
gr.position.set(0, 22, 0);
g.add(gr);
var s = wSign([Gt.n.toUpperCase(), "into Florence"], 5.6, 1.2, "#3A2A1C", "#E8D4A0");
s.position.set(0, 15.6, 6.1);
g.add(s);
var si = wSign([Gt.n.toUpperCase(), "out to " + Gt.to], 5.6, 1.2, "#3A2A1C", "#E8D4A0");
si.position.set(0, 15.6, -6.1);
si.rotation.y = Math.PI;
g.add(si);
var c = Math.cos(ry), sn = Math.sin(ry);
[-1, 1].forEach(function (k) { davSolid({ x: x + k * 7.5 * c, z: z - k * 7.5 * sn, r: 4.6, h: 22 }); });
Gt.x = x;
Gt.z = z;
});
return grp;
},
function (G) {
var core = 440, cw = 66, cd = 58, street = 9, R = wRand(1452), out = [];
DAV.flBlocks = [];
var quads = {};
function quad(x, z) { var k = (x < 0 ? "w" : "e") + (z < davArnoZ(x) ? "n" : "s"); return quads[k] || (quads[k] = (function () { var q = new THREE.Group(); q.name = "dav-fl-" + k; G.add(q); return q; })()); }
for (var bz = -core; bz < core + 120; bz += cd)
for (var bx = -core - 60; bx < core + 60; bx += cw) {
var x0 = bx + street / 2, x1 = bx + cw - street / 2, z0 = bz + street / 2, z1 = bz + cd - street / 2, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
var south = cz > davArnoZ(cx);
if (Math.hypot(cx, cz - 20) > (south ? 520 : core))
continue;
if (south && (cz > 520 || cx < -420 || cx > 330))
continue;
if (z1 > davArnoZ(x0) - 46 && z0 < davArnoZ(x0) + 46)
continue;
if (z1 > davArnoZ(x1) - 46 && z0 < davArnoZ(x1) + 46)
continue;
if (davFlKept(x0, z0, x1, z1))
continue;
if (Math.hypot(cx, cz) < 520 && Math.hypot(cx + 80, cz - 470) < 70)
continue;
davFlBlock(quad(cx, cz), x0, z0, x1, z1, R, Math.hypot(cx, cz));
DAV.flBlocks.push({ bx: bx, bz: bz, x0: x0, z0: z0, x1: x1, z1: z1, south: south, g: quad(cx, cz) });
}
[-1, 1].forEach(function (s) {
var pos = [], uv = [], idx = [], n = 0;
for (var x = -600; x <= 600; x += 24) {
var rz = davArnoZ(x), r = davFlWallR(Math.atan2(0, x)), edge = Math.sqrt(Math.max(0, 620 * 620 - x * x));
var za = s < 0 ? 20 - edge : rz + 34, zb = s < 0 ? rz - 34 : Math.min(20 + edge, 560);
if (zb <= za)
continue;
pos.push(x, 0.04, za, x, 0.04, zb);
uv.push(x, za, x, zb);
if (n) {
var a = (n - 1) * 2;
idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
}
n++;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, davSurf("paving", 0xC4B8A4, 1.9));
m.userData.keep = 1;
m.name = "dav-streets";
G.add(m);
});
return quads;
},
function (grp, x0, z0, x1, z1, R, dc) {
var dep = DAV.lite ? 14 : 12 + R() * 3, minW = DAV.lite ? 16 : 9, maxW = DAV.lite ? 26 : 17;
var tall = dc < 200 ? 1 : dc < 330 ? 0.5 : 0;
function side(ax, az, bx, bz, face) {
var len = Math.hypot(bx - ax, bz - az), dx = (bx - ax) / len, dz = (bz - az) / len, t = 0;
var pal = !DAV.lite && R() < 0.13 && len > 34;
while (t < len - 3) {
var w = pal ? len : Math.min(len - t, minW + R() * (maxW - minW));
if (len - t - w < minW * 0.7)
w = len - t;
var mx = ax + dx * (t + w / 2), mz = az + dz * (t + w / 2), nxn = -dz * face, nzn = dx * face;
var cx = mx - nxn * dep / 2, cz = mz - nzn * dep / 2, ry = Math.atan2(dx, dz) - Math.PI / 2, swap = Math.abs(dx) < 0.5;
var floors = pal ? 3 : 1 + Math.floor(R() * 2.2 + tall * 1.4), style = pal ? (R() < 0.6 ? "palazzo" : "noble") : R() < 0.12 ? "noble" : "house";
davBuilding(grp, cx, cz, swap ? dep : w, swap ? w : dep, { style: style, col: pal && style === "palazzo" ? 0xB89C78 : DAV_COLS[(R() * DAV_COLS.length) | 0], floors: floors, shops: R() < 0.7, ry: 0, chim: R() < 0.5, door: { nx: nxn, nz: nzn, town: "Florence" } });
t += w;
}
}
side(x0, z0, x1, z0, -1);
side(x0, z1, x1, z1, 1);
side(x0, z0 + dep, x0, z1 - dep, 1);
side(x1, z0 + dep, x1, z1 - dep, -1);
if (R() < (DAV.lite ? 0.05 : 0.12)) {
var tx = x0 + 4 + R() * (x1 - x0 - 8), tz = z0 + 3.5;
var tw = davBoxM(7, 24 + R() * 16, 7, davSurf("stone", 0xB8A080, 3), tx, 0, tz, grp);
tw.position.y = tw.geometry.parameters.height / 2;
davSolid({ x: tx, z: tz, hw: 3.5, hd: 3.5, h: 40 });
var tr = new THREE.Mesh(davRoofGeo(7, 7, 2.4, 0.8), davRoofMat());
tr.position.set(tx, tw.geometry.parameters.height, tz);
grp.add(tr);
}
},
function (G, x, z, len, wid, h, ry, o) {
o = o || {};
var y0 = o.y || 0, g = new THREE.Group();
g.position.set(x, y0, z);
g.rotation.y = ry;
G.add(g);
var wall = o.marble ? davMarbleMat("arch", 6) : davSurf(o.brick ? "brick" : "stone", o.brick ? 0xC8907A : 0xD0C0A0, o.brick ? 2.5 : 3.2);
davBoxM(len, h, wid, wall, 0, h / 2, 0, g);
var r = new THREE.Mesh(davRoofGeo(len, wid, wid * 0.3, 0.5, true), davRoofMat());
r.position.y = h;
g.add(r);
davBoxM(1.4, h + wid * 0.3 * 0.9, wid, wall, -len / 2 - 0.7, (h + wid * 0.27) / 2, 0, g);
var rose = new THREE.Mesh(new THREE.CircleGeometry(wid * 0.13, DAV.lite ? 12 : 24), davC(0x2A3040));
rose.position.set(-len / 2 - 1.45, h * 0.72, 0);
rose.rotation.y = -Math.PI / 2;
g.add(rose);
wBox(0.3, h * 0.36, wid * 0.16, davC(0x4A3220), -len / 2 - 1.45, h * 0.18, 0, g);
if (o.tower) {
var tw = davBoxM(7, h * 1.6, 7, wall, len / 2 - 6, h * 0.8, wid / 2 + 3.5, g);
var tr = wCone(5, 7, davRoofMat(), len / 2 - 6, h * 1.6 + 3.5, wid / 2 + 3.5, g, 4);
tr.rotation.y = Math.PI / 4;
}
var c = Math.cos(ry), s = Math.sin(ry);
davSolid({ x: x, z: z, hw: (Math.abs(c) > 0.5 ? len : wid) / 2 + 1, hd: (Math.abs(c) > 0.5 ? wid : len) / 2 + 1, h: h + 8, b: y0 });
if (o.tower)
davSolid({ x: x + c * (len / 2 - 6) + s * (wid / 2 + 3.5), z: z - s * (len / 2 - 6) + c * (wid / 2 + 3.5), r: 4.4, h: h * 2, b: y0 });
if (o.sign)
davSign(o.sign, 5, 1, x - c * (len / 2 + 1.6), y0 + h * 0.45, z + s * (len / 2 + 1.6), ry - Math.PI / 2, G);
return g;
},
function (G) {
var grp = new THREE.Group();
G.add(grp);
davChurch(grp, 300, 40, 74, 34, 24, Math.PI, { tower: 1, sign: ["SANTA CROCE", "the Franciscans' great church"] });
davPave(grp, 244, 40, 92, 74, 0.03, 0xC8BCA8, 1.9);
davChurch(grp, -292, -210, 64, 30, 22, 0, { marble: 1, tower: 1, sign: ["SANTA MARIA NOVELLA", "its marble front by Alberti (1470)"] });
davPave(grp, -292, -160, 120, 60, 0.03, 0xC8BCA8, 1.9);
davChurch(grp, -60, -310, 62, 30, 22, Math.PI / 2, { brick: 1, sign: ["SAN LORENZO", "Brunelleschi's church; its front never finished"] });
var om = new THREE.Group();
grp.add(om);
var omx = -8, omz = -45;
davBoxM(26, 32, 20, davFacMat("palazzo", 0xC0A880, 0), omx, 16, omz, om);
davBoxM(27, 1, 21, davSurf("stone", 0xB8A888, 3), omx, 32.5, omz, om);
for (var i = 0; i < 4; i++)
[-1, 1].forEach(function (s) { var n = wBox(2.4, 4.6, 0.4, davC(0x6A6A70), omx - 9 + i * 6, 4.4, omz + s * 10.1, om); var st = wPerson("dav_om" + i + s, { look: { top: 0xD8D4CC, bottom: 0xD8D4CC, skin: 0xD8D4CC, hair: 0xD8D4CC, shoes: 0xD8D4CC } }); st.position.set(omx - 9 + i * 6, 2.2, omz + s * 10.6); st.rotation.y = s > 0 ? 0 : Math.PI; st.scale.setScalar(1.1); om.add(st); });
davSolid({ x: omx, z: omz, hw: 13.2, hd: 10.2, h: 34 });
var hx = 150, hz = -262;
davBuilding(grp, hx, hz, 84, 30, { style: "noble", col: 0xE8DCC4, floors: 2 });
for (var a = 0; a < 9; a++)
davArch(grp, hx - 36 + a * 9, 0, hz + 17.5, 0, 7, 7.6, 1.4, davSurf("stone", 0xA8A498, 2.5));
davBoxM(84, 1.4, 5, davSurf("stone", 0xD8D0C0, 3), hx, 8.3, hz + 17.5, grp);
davSign(["SANTA MARIA NUOVA", "the hospital · the anatomy hall · press E"], 5, 1, hx, 10.4, hz + 20.3, 0, grp);
davSpot(150, -228, 4, "The hospital of Santa Maria Nuova", "go in (the anatomy hall)", function () { davEnter("hospital"); });
davPave(grp, hx, hz + 40, 104, 40, 0.03, 0xC8BCA8, 1.9);
return grp;
},
function (G) {
var grp = new THREE.Group();
G.add(grp);
var mx = -60, mz = -32;
davPave(grp, mx, mz, 116, 76, 0.03, 0xC8BCA8, 1.9);
davColumn(grp, mx, 0, mz, 10, 0.55, davSurf("stone", 0xC8C0B0, 2));
wSph(0.9, davSurf("stone", 0xC8C0B0, 2), mx, 11.2, mz, grp, 10);
davSolid({ x: mx, z: mz, r: 1 });
var R = wRand(77), fruit = [0xC83A2A, 0xE8A030, 0x7AA83A, 0x8A3A6A, 0xE8D050, 0xA86A3A];
var awn = [0xB83A2A, 0x2A5A8A, 0xE8D8B8, 0x3A7A4A, 0xC8A040];
for (var i = 0; i < (DAV.lite ? 8 : 16); i++) {
var a = i / (DAV.lite ? 8 : 16) * Math.PI * 2, sx = mx + Math.cos(a) * 30, sz = mz + Math.sin(a) * 22, g = new THREE.Group();
g.position.set(sx, 0, sz);
g.rotation.y = -a + Math.PI / 2;
grp.add(g);
wBox(3.2, 0.9, 1.4, davC(0x6A4A2A), 0, 0.45, 0, g);
[-1.5, 1.5].forEach(function (k) { wBox(0.12, 2.6, 0.12, davC(0x5A3A22), k, 1.3, -0.6, g); wBox(0.12, 2.2, 0.12, davC(0x5A3A22), k, 1.1, 0.8, g); });
var aw = wBox(3.6, 0.08, 2.2, davC(awn[i % awn.length]), 0, 2.45, 0.1, g);
aw.rotation.x = 0.22;
for (var f = 0; f < (DAV.lite ? 3 : 7); f++)
wSph(0.22 + R() * 0.1, davC(fruit[(i + f) % fruit.length]), -1.2 + f * 0.4, 1.02, (R() - 0.5) * 0.6, g, 6);
davSolid({ x: sx, z: sz, r: 1.7, h: 2 });
}
var og = new THREE.Group();
og.position.set(mx - 46, 0, mz - 30);
grp.add(og);
wBox(6, 1, 1.6, davC(0x5A3A22), 0, 0.5, 0, og);
wBox(6.4, 0.12, 3, davC(0x8A2A2A), 0, 3, 0.4, og);
[-3, 3].forEach(function (k) { wBox(0.16, 3, 0.16, davC(0x4A2A18), k, 1.5, -0.6, og); });
var sh = wBox(0.8, 1.2, 0.12, davC(0x8A8A90, { shine: 40 }), -1.6, 1.6, -0.6, og);
var sw = wBox(0.1, 1.4, 0.08, davC(0xB8B8C0, { shine: 60 }), 0.6, 1.7, -0.6, og);
sw.rotation.z = 0.3;
davSign(["THE ARMOURER OF THE OLD MARKET", "Milanese steel · press E"], 3.6, 0.8, 0, 3.8, 0.3, 0, og);
davSolid({ x: mx - 46, z: mz - 30, hw: 3.2, hd: 0.9, h: 2 });
davSpot(mx - 46, mz - 27.6, 3.2, "The armourer of the Old Market", "see the gear made in Leonardo's Italy", function () { if (typeof wgOutfit === "function" && typeof WGEAR !== "undefined" && WGEAR.worlds[DAV_KEY])
wgOutfit(DAV_KEY);
else
setStatus("The armourer is still unpacking. Come back after the next update."); });
return grp;
},
function (G) {
var grp = new THREE.Group();
G.add(grp);
var bx = 210, bz = -58;
davBuilding(grp, bx, bz, 64, 56, { style: "noble", col: 0xE0C8A0, floors: 2, shops: false });
wBox(0.4, 4.6, 6, davC(0x5A3A20), bx - 32.2, 2.3, bz, grp);
davSign(["BOTTEGA DI ANDREA DEL VERROCCHIO", "painting · sculpture · bronze · press E"], 7, 1.3, bx - 32.6, 6.4, bz, -Math.PI / 2, grp);
var ban = wBox(0.06, 3, 1.6, davC(0x8A2A2A), bx - 33, 8.6, bz + 7, grp);
davSpot(168, -58, 4.2, "The Bottega", "go in (the studio, the models, the library and the yard)", function () { davEnter("bottega"); });
for (var i = 0; i < 3; i++)
davBoxM(1.6, 1.2, 1.2, davSurf("marble", 0xD8D2C6, 1.5), bx - 40, 0.6 + i * 0.01, bz - 12 + i * 1.8, grp);
for (var j = 0; j < 5; j++) {
var lg = wCyl(0.22, 0.22, 5, davSurf("wood", 0xC8A070, 1), bx - 40, 0.25 + j % 2 * 0.4, bz + 12 + j * 0.5, grp, 8);
lg.rotation.x = Math.PI / 2;
}
davSolid({ x: bx - 40, z: bz - 10, hw: 1, hd: 3 });
davSolid({ x: bx - 40, z: bz + 13, hw: 2.6, hd: 1.4 });
davPave(grp, bx - 40, bz, 24, 40, 0.03, 0xC8BCA8, 1.9);
return grp;
},
function (G) {
var grp = new THREE.Group();
G.add(grp);
var px = -80, pz = 470;
davBuilding(grp, px, pz, 110, 34, { style: "palazzo", col: 0xB8A07C, floors: 3, shops: false, door: { nx: 0, nz: -1, theme: "palazzofi", name: "Palazzo Pitti" } });
davSign(["PALAZZO PITTI", "the Pitti family's great house"], 5, 1, px, 10, pz - 17.4, Math.PI, grp);
davPave(grp, px, pz - 50, 140, 64, 0.03, 0xC8BCA8, 1.9);
return grp;
},
function (parent, seed, x, z, o) {
o = o || {};
var R = wRand(seed * 977 + 3), c = DAV_TOWNSFOLK, fem = R() < 0.5;
var look = { sex: fem ? "f" : "m", top: c[(R() * c.length) | 0], bottom: c[(R() * c.length) | 0], topKind: fem ? "dress" : (R() < 0.5 ? "robe" : null), layer: R() < 0.4 ? "tunic" : null, layerColor: c[(R() * c.length) | 0], hat: fem ? (R() < 0.3 ? "hood" : "none") : (R() < 0.6 ? "cap" : "none"), hatColor: c[(R() * c.length) | 0], shoes: 0x3A2A1E };
if (o.look)
for (var k in o.look)
look[k] = o.look[k];
var p = wPerson("dav_f" + seed, { look: look, title: o.title, place: "Florence" });
p.position.set(x, o.y || 0, z);
p.rotation.y = R() * 6.28;
parent.add(p);
var P = { g: p, wander: o.still ? null : { r: o.r || 14, sp: 1.1 } };
DAV.people.push(P);
if (o.say)
DAV.talk.push({ p: P, name: o.name || "A Florentine", r: 3, t: { name: o.name || "A Florentine", persona: o.say, greet: o.greet || "Good day to you." } });
return P;
},
function (G) {
var n = DAV.lite ? 6 : 14, spots = [[52, 120, "a cloth merchant of the Arte della Lana", "A cheerful Florentine wool merchant of 1500. He talks about the wool and silk guilds, the price of cloth, the Republic, and gossip about the painters working on the Palazzo Vecchio's great hall."],
[-60, -20, "a fruit seller at the Old Market", "A fruit seller at Florence's Old Market in 1500: quick, funny, proud of her figs and peaches. She knows everyone and gossips about the Bottega's apprentices, who eat too much fruit."],
[20, -110, "a stonemason of the cathedral works", "An old stonemason of the cathedral works (the Opera del Duomo), who knows how Brunelleschi built the great dome without a frame of timber: bricks laid in herringbone, rings of stone and chain. He loves explaining it."],
[-20, 250, "a goldsmith of the Ponte Vecchio", "A goldsmith with a shop on the Ponte Vecchio in 1500. Tells you the butchers used to have the bridge, and that the river floods some winters."],
[244, 40, "a Franciscan friar", "A friendly Franciscan friar of Santa Croce. Speaks of St Francis, the poor of the city, and the great families buried in the church."],
[-292, -160, "a Dominican scholar", "A learned Dominican of Santa Maria Novella: talks of the stars, the calendar, and the great sundial marks in the church."],
[150, -205, "a nurse of the hospital", "A kind nurse of the hospital of Santa Maria Nuova, the oldest hospital in Florence, who takes in the sick of every kind."]];
for (var i = 0; i < n; i++) {
var s = spots[i % spots.length], R = wRand(i * 31 + 5), x = s[0] + (R() - 0.5) * 20, z = s[1] + (R() - 0.5) * 16;
davFolk(G, i, x, z, i < spots.length ? { name: s[2], say: s[3], greet: "Good day! You're from the Bottega, aren't you? I can tell by the paint." } : {});
}
},
function (G) {
var D = new THREE.Group();
D.name = "dav-florence";
G.add(D);
var parts = { duomo: davDuomo(D), vecchio: davVecchio(D), arno: davArnoCity(D), walls: davCityWalls(D), marks: davFlLandmarks(D), market: davMarket(D), bottega: davBottegaOut(D), olt: davOltrarno(D) };
var quads = davFlBlocks(D);
davFlFolk(D);
DAV.flParts = parts;
DAV.flQuads = quads;
DAV.districts.push({ g: D, x: 0, z: 60, r: 900, name: "florence" });
return D;
},
function () {
if (DAV.mm)
return DAV.mm;
var L = DAV.lite;
return (DAV.mm = { wood: davSurf("wood", 0xC09868, 0.8), dark: davSurf("wood", 0x7A5232, 0.8), cane: davC(0xC8B07A), linen: davC(0xEDE2C8, { ds: 1 }), linen2: davC(0xE4D4B0, { ds: 1 }),
rope: davC(0xA8946A), iron: davC(0x4A4A50, { shine: 40, spec: 0x5A5A60 }), bronze: davC(0xB8843A, { shine: 70, spec: 0x8A6A30 }), leather: davC(0x6A4426), plate: davSurf("metal", 0x8A8478, 1.2) });
},
function (s, chord) {
var sh = new THREE.Shape();
sh.moveTo(0, chord * 0.5);
sh.bezierCurveTo(s * 0.35, chord * 0.7, s * 0.7, chord * 0.5, s, chord * 0.08);
var n = 4;
for (var i = n; i >= 0; i--) {
var x = s * i / n, y = -chord * 0.42 * (1 - i / n * 0.75);
if (i < n)
sh.quadraticCurveTo(x + s / n * 0.5, y + chord * 0.18, x, y);
else
sh.lineTo(x, y);
}
sh.lineTo(0, chord * 0.5);
var g = new THREE.ShapeGeometry(sh, DAV.lite ? 4 : 10);
g.rotateX(-Math.PI / 2);
return g;
},
function (par, M, s, chord, side) {
var w = new THREE.Group();
par.add(w);
var m = new THREE.Mesh(davWingGeo(s, chord), M.linen);
if (side < 0) {
m.scale.x = -1;
}
w.add(m);
for (var i = 0; i <= 4; i++) {
var x = side * s * i / 4;
davRod(w, M.cane, [0, 0.02, -chord * 0.45], [x, 0.02, -chord * 0.42 * (1 - i / 4 * 0.75) + (i === 4 ? -0.1 : 0)], 0.03);
}
davRod(w, M.dark, [0, 0.03, chord * 0.45], [side * s, 0.03, chord * 0.06], 0.05);
return w;
},
function (M) {
var g = new THREE.Group();
davRod(g, M.dark, [0, 0.4, 1.8], [0, 0.4, -2], 0.07);
davRod(g, M.dark, [-0.5, 0.4, 0.6], [0.5, 0.4, 0.6], 0.05);
davRod(g, M.dark, [-0.4, 0.4, -0.8], [0.4, 0.4, -0.8], 0.05);
davRod(g, M.wood, [0, 0.4, 0.2], [0, 1.6, 0.2], 0.06);
davRod(g, M.rope, [0, 1.6, 0.2], [-1.2, 1.2, 0], 0.015);
davRod(g, M.rope, [0, 1.6, 0.2], [1.2, 1.2, 0], 0.015);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 5, 14), M.dark);
ring.position.set(0, 0.5, -1.5);
ring.rotation.x = Math.PI / 2;
g.add(ring);
[-1, 1].forEach(function (s) { davRod(g, M.dark, [s * 0.25, 0.4, 1.5], [s * 0.3, 0.1, 1.9], 0.04); });
var tail = new THREE.Mesh(new THREE.CircleGeometry(1, DAV.lite ? 5 : 9, -0.6, 1.2), M.linen2);
tail.rotation.x = -Math.PI / 2;
tail.position.set(0, 0.42, 1.8);
tail.rotation.z = Math.PI / 2;
g.add(tail);
var wl = new THREE.Group(), wr = new THREE.Group();
wl.position.set(-0.3, 1.1, 0);
wr.position.set(0.3, 1.1, 0);
g.add(wl);
g.add(wr);
davWing(wl, M, 5.4, 3, -1);
davWing(wr, M, 5.4, 3, 1);
g.userData.flap = [wl, wr];
return g;
},
function (M) {
var g = new THREE.Group();
var wl = new THREE.Group(), wr = new THREE.Group();
wl.position.set(0, 2.3, 0);
wr.position.set(0, 2.3, 0);
g.add(wl);
g.add(wr);
davWing(wl, M, 5, 2.6, -1);
davWing(wr, M, 5, 2.6, 1);
wl.rotation.z = -0.08;
wr.rotation.z = 0.08;
davRod(g, M.dark, [0, 2.3, 1.4], [0, 2.3, -1.4], 0.06);
davRod(g, M.wood, [-0.6, 1.1, 0], [0.6, 1.1, 0], 0.04);
davRod(g, M.wood, [-0.6, 1.1, 0], [0, 2.3, 0], 0.03);
davRod(g, M.wood, [0.6, 1.1, 0], [0, 2.3, 0], 0.03);
return g;
},
function (M) {
var g = new THREE.Group();
wCyl(2.6, 2.6, 0.2, M.wood, 0, 0.5, 0, g, DAV.lite ? 10 : 20);
davRod(g, M.dark, [0, 0.5, 0], [0, 5.2, 0], 0.12);
for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2;
davRod(g, M.dark, [0, 1.4, 0], [Math.cos(a) * 2.4, 1.4, Math.sin(a) * 2.4], 0.06);
}
var spin = new THREE.Group();
spin.position.y = 2.4;
g.add(spin);
var pos = [], idx = [], n = DAV.lite ? 20 : 44, R0 = 0.2, R1 = 4.8, H = 2.4;
for (var k = 0; k <= n; k++) {
var t = k / n, a2 = t * Math.PI * 2 * 1.05, y = t * H;
pos.push(Math.cos(a2) * R0, y, Math.sin(a2) * R0, Math.cos(a2) * R1, y + 0.15, Math.sin(a2) * R1);
if (k) {
var b = (k - 1) * 2;
idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
}
}
var hg = new THREE.BufferGeometry();
hg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
hg.setIndex(idx);
hg.computeVertexNormals();
spin.add(new THREE.Mesh(hg, M.linen));
var pts = [];
for (var k2 = 0; k2 <= n; k2++) {
var t2 = k2 / n, a3 = t2 * Math.PI * 2 * 1.05;
pts.push(new THREE.Vector3(Math.cos(a3) * R1, t2 * H + 0.15, Math.sin(a3) * R1));
}
spin.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n, 0.05, 4, false), M.cane));
for (var s = 0; s < 6; s++) {
var a4 = s / 6 * Math.PI * 2 * 1.05, y4 = s / 6 * H;
davRod(spin, M.dark, [0, y4, 0], [Math.cos(a4) * R1, y4 + 0.15, Math.sin(a4) * R1], 0.03);
}
g.userData.spin = spin;
return g;
},
function (M) {
var g = new THREE.Group();
var shell = davLathe([[4.2, 0.6], [4.1, 1.4], [3.4, 2.4], [2.2, 3.2], [1.0, 3.6], [0.9, 3.8]], DAV.lite ? 10 : 20, M.plate, g, 0, 0, 0);
davLathe([[4.3, 0.3], [4.3, 0.7], [4.2, 0.75]], DAV.lite ? 10 : 20, M.dark, g, 0, 0, 0);
wCyl(0.9, 1, 1.4, M.dark, 0, 4.3, 0, g, DAV.lite ? 8 : 12);
wCone(1.15, 0.9, M.plate, 0, 5.4, 0, g, DAV.lite ? 8 : 12);
var nc = DAV.lite ? 8 : 16;
for (var i = 0; i < nc; i++) {
var a = i / nc * Math.PI * 2, c = wCyl(0.14, 0.17, 1.2, M.iron, Math.cos(a) * 4.1, 1.0, Math.sin(a) * 4.1, g, DAV.lite ? 5 : 8);
c.rotation.z = Math.PI / 2;
c.rotation.y = -a;
}
if (!DAV.lite)
for (var r = 0; r < 3; r++)
for (var j = 0; j < 20; j++) {
var a2 = j / 20 * Math.PI * 2, rr = [3.9, 3.0, 1.8][r], y = [1.3, 2.3, 3.0][r];
wSph(0.06, M.iron, Math.cos(a2) * rr, y, Math.sin(a2) * rr, g, 4);
}
[-1, 1].forEach(function (s) { [-1, 1].forEach(function (t) { var w = wCyl(0.6, 0.6, 0.25, M.dark, s * 2.6, 0.6, t * 2.2, g, DAV.lite ? 8 : 14); w.rotation.z = Math.PI / 2; }); });
return g;
},
function (M) {
var g = new THREE.Group();
davBoxM(1.6, 0.12, 1.9, M.wood, 0, 0.62, 0, g);
[-0.85, 0.85].forEach(function (s) { var w = wCyl(0.55, 0.55, 0.12, M.dark, s, 0.55, 0.55, g, DAV.lite ? 8 : 16); w.rotation.z = Math.PI / 2; });
var fw = wCyl(0.4, 0.4, 0.12, M.dark, 0, 0.4, -0.9, g, DAV.lite ? 8 : 14);
fw.rotation.z = Math.PI / 2;
[-0.4, 0.4].forEach(function (s) { var d = wCyl(0.32, 0.32, 0.4, M.wood, s, 0.98, 0.2, g, DAV.lite ? 8 : 16); var gr = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 4, DAV.lite ? 10 : 22), M.dark); gr.position.set(s, 0.98, 0.2); gr.rotation.y = Math.PI / 2; g.add(gr); });
davRod(g, M.dark, [0, 0.7, -0.6], [0, 1.6, -0.6], 0.04);
davRod(g, M.dark, [-0.5, 1.6, -0.6], [0.5, 1.6, -0.6], 0.04);
return g;
},
function (M) {
var g = new THREE.Group();
var hull = davLathe([[0, 0], [0.9, 0.15], [1.1, 0.6], [1.15, 0.9]], DAV.lite ? 8 : 14, M.wood, g, 0, -0.3, 0);
hull.scale.set(1, 1, 3.2);
davBoxM(1.8, 0.08, 5.8, M.dark, 0, 0.62, 0, g);
[-1, 1].forEach(function (s) {
var wh = new THREE.Group();
wh.position.set(s * 1.35, 0.5, 0.4);
g.add(wh);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, p = wBox(0.2, 0.04, 1, M.wood, 0, Math.cos(a) * 0.6, Math.sin(a) * 0.6, wh);
p.rotation.x = a;
}
var hub = wCyl(0.1, 0.1, 0.3, M.iron, 0, 0, 0, wh, 8);
hub.rotation.z = Math.PI / 2;
(g.userData.wheels = g.userData.wheels || []).push(wh);
});
davRod(g, M.dark, [-1.35, 0.5, 0.4], [1.35, 0.5, 0.4], 0.05);
wBox(0.6, 0.5, 0.6, M.wood, 0, 0.9, 0.9, g);
return g;
},
function (M) {
var g = new THREE.Group();
var p = wPerson("dav_diver", { look: { top: 0x6A4426, bottom: 0x6A4426, shoes: 0x3A2A1E, hat: "helmet", hatColor: 0x5A3A20 } });
g.add(p);
var mask = wBox(0.3, 0.16, 0.05, davC(0xBFD8E0, { op: 0.6 }), 0, 1.62, -0.16, g);
davRod(g, M.cane, [0.1, 1.7, 0.1], [0.6, 2.6, 0.6], 0.025);
davRod(g, M.cane, [-0.1, 1.7, 0.1], [0.4, 2.6, 0.8], 0.025);
var cork = wCyl(0.5, 0.5, 0.25, davC(0xA8885A), 0.55, 2.65, 0.7, g, 12);
return g;
},
function (M) {
var g = new THREE.Group();
var pyr = wCone(4.95, 7, M.linen, 0, 4.9, 0, g, 4);
pyr.rotation.y = Math.PI / 4;
pyr.material = M.linen;
for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2 + Math.PI / 4;
davRod(g, M.dark, [0, 8.4, 0], [Math.cos(a) * 4.95, 1.4, Math.sin(a) * 4.95], 0.05);
davRod(g, M.rope, [Math.cos(a) * 4.95, 1.4, Math.sin(a) * 4.95], [0, 0.9, 0], 0.012);
}
davRod(g, M.dark, [-3.5, 1.4, -3.5], [3.5, 1.4, -3.5], 0.04);
davRod(g, M.dark, [-3.5, 1.4, 3.5], [3.5, 1.4, 3.5], 0.04);
return g;
},
function (M) {
var g = new THREE.Group();
davBoxM(1.6, 0.5, 20, M.wood, 0, 1.6, 0, g);
for (var i = 0; i < 3; i++)
[-1, 1].forEach(function (s) { var w = wCyl(0.9, 0.9, 0.3, M.dark, s * 1.3, 0.9, -7 + i * 7, g, DAV.lite ? 8 : 16); w.rotation.z = Math.PI / 2; });
var bow = new THREE.Mesh(new THREE.TorusGeometry(14, 0.25, 5, DAV.lite ? 16 : 32, 1.0), M.wood);
bow.rotation.x = Math.PI / 2;
bow.rotation.z = Math.PI / 2 - 0.5;
bow.position.set(0, 2.1, -1.8);
g.add(bow);
davRod(g, M.rope, [-12.2, 2.1, 4.9], [0, 2.1, 6.2], 0.03);
davRod(g, M.rope, [12.2, 2.1, 4.9], [0, 2.1, 6.2], 0.03);
var scr = wCyl(0.25, 0.25, 4, M.iron, 0, 2.2, 8, g, 8);
scr.rotation.x = Math.PI / 2;
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.07, 5, 14), M.dark);
wh.position.set(0, 2.2, 10.1);
g.add(wh);
var bolt = wCyl(0.1, 0.1, 3, M.iron, 0, 2.15, 3.6, g, 6);
bolt.rotation.x = Math.PI / 2;
g.userData.bolt = bolt;
return g;
},
function (M) {
var g = new THREE.Group();
wBox(1.2, 0.9, 0.8, M.dark, 0, 0.45, 0, g);
var k = wPerson("dav_knight", { look: { top: 0x9A9AA2, bottom: 0x8A8A92, shoes: 0x6A6A70, layer: "armor", layerColor: 0xA8A8B0, hat: "helmet", hatColor: 0xB0B0B8, skin: 0xA0A0A8 } });
k.position.y = 0.9;
k.scale.setScalar(1.05);
g.add(k);
g.userData.k = k;
return g;
},
function (M) {
var g = new THREE.Group(), body = null;
try {
if (typeof WG_BEAST !== "undefined" && WG_BEAST.lion) {
body = WG_BEAST.lion(0xB8843A, { name: "mechanical lion" }).g;
body.traverse(function (m) { if (m.isMesh)
m.material = M.bronze; });
body.rotation.y = Math.PI;
body.scale.setScalar(1.5);
g.add(body);
}
}
catch (e) {
body = null;
}
if (!body) {
var b = wSph(0.7, M.bronze, 0, 1.3, 0, g, 14);
b.scale.set(0.8, 0.8, 1.6);
wSph(0.42, M.bronze, 0, 1.8, -1.1, g, 12);
var mane = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.18, 6, 14), M.bronze);
mane.position.set(0, 1.8, -1);
g.add(mane);
[[-0.4, -0.7], [0.4, -0.7], [-0.4, 0.7], [0.4, 0.7]].forEach(function (p) { wCyl(0.13, 0.11, 1.1, M.bronze, p[0], 0.55, p[1], g, 8); });
}
var lil = new THREE.Group();
lil.position.set(0, 1.2, -0.7);
lil.visible = false;
g.add(lil);
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2;
wCone(0.06, 0.28, davC(0xF0ECE0), Math.cos(a) * 0.18, 0.1 + ((i * 7) % 3) * 0.06, Math.sin(a) * 0.18, lil, 5);
wSph(0.03, davC(0xE8C040), Math.cos(a) * 0.18, 0.24, Math.sin(a) * 0.18, lil, 5);
}
g.userData.lilies = lil;
return g;
},
function (M) {
var g = new THREE.Group();
var deck = new THREE.Group();
g.add(deck);
davBoxM(3.4, 0.25, 22, M.wood, 0, 1.1, -6, deck);
for (var i = -1; i <= 1; i += 2) {
davRod(deck, M.dark, [i * 1.6, 1.2, 4], [i * 1.6, 2.2, -6], 0.05);
davRod(deck, M.dark, [i * 1.6, 2.2, -6], [i * 1.6, 1.2, -16], 0.05);
}
davBoxM(3, 1.4, 3, davSurf("stone", 0xA89880, 1.5), 0, 0.7, 4, deck);
wCyl(1.2, 1.4, 1, M.iron, 0, 0.5, 0, g, 12);
g.userData.deck = deck;
return g;
},
function (M) {
var g = new THREE.Group();
davBoxM(1.2, 0.6, 0.8, M.wood, 0, 0.9, 0, g);
var w = wCyl(0.65, 0.65, 0.08, M.dark, 0, 0.65, 0.5, g, DAV.lite ? 10 : 20);
w.rotation.z = Math.PI / 2;
var gear = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.05, 4, DAV.lite ? 12 : 24), M.dark);
gear.position.set(0, 1.3, 0);
g.add(gear);
davRod(g, M.wood, [0, 1, -0.3], [0, 1.4, -1.6], 0.04);
return g;
},
function (G) {
var D = new THREE.Group();
D.name = "dav-proving";
G.add(D);
var P = DAV_PG;
var post = davC(0x6A4A2A);
for (var i = 0; i < (DAV.lite ? 40 : 80); i++) {
var a = i / (DAV.lite ? 40 : 80) * Math.PI * 2, x = P.x + Math.cos(a) * 230, z = P.z + Math.sin(a) * 150;
if (z > P.z + 120 && Math.abs(x - P.x) < 40)
continue;
if (Math.abs(Math.sin(a)) < 0.12 && Math.cos(a) < 0)
continue;
wBox(0.2, 1.4, 0.2, post, x, 0.7, z, D);
}
[[-120, -110], [0, -125], [120, -110]].forEach(function (s, i) { var b = davBuilding(D, P.x + s[0], P.z + s[1], 26, 14, { style: "house", col: 0xD8C098, floors: 0, shops: true, rise: 4, door: { nx: 0, nz: 1, theme: "machineshed", name: "A machine shed of the Proving Ground" } }); });
davSign(["THE PROVING GROUND", "where the master's machines are tried · ride them all"], 8, 1.4, P.x - 232, 4, P.z, -Math.PI / 2, D);
var at = { bird: [-150, -40], glider: [-150, 20], screw: [-80, -60], tank: [0, -60], cart: [70, -60], chute: [-80, 30], xbow: [130, -20], knight: [-20, 40], lion: [30, 40], odo: [80, 40], bridge: [150, 60], boat: [-20, 170], diver: [30, 170] };
DAV.pgAt = {};
Object.keys(at).forEach(function (k) {
var M = DAV_MACH[k], x = P.x + at[k][0], z = P.z + at[k][1], g = davMachineModel(k);
var gy = davLand(x, z);
g.position.set(x, gy, z);
g.rotation.y = k === "xbow" ? -Math.PI / 2 : 0.4;
D.add(g);
g.userData.keep = 1;
DAV.pgAt[k] = { g: g, x: x, z: z };
var r = k === "xbow" ? 12 : k === "tank" ? 6.5 : k === "bird" || k === "glider" ? 6 : 4;
if (M.kind === "show")
davSpot(x, z + (k === "bridge" ? 0 : 3), r, M.name, k === "knight" ? "wind it up" : k === "lion" ? "wind it up" : k === "bridge" ? "swing it round" : "push it and count", function () { davShow(k); });
else if (k === "xbow")
davSpot(x + 10, z, 4, M.name, "take your place at the winch", function () { davRideOn("xbow", { x: x, z: z, g: g }); });
else if (k !== "boat" && k !== "diver")
davSpot(x, z, r, M.name, M.kind === "chute" ? "take it to a high place" : "take it out", function () { if (M.kind === "chute")
davChuteCard();
else
davRideOn(k); });
if (k !== "bridge" && k !== "knight" && k !== "lion")
davSolid({ x: x, z: z, r: k === "tank" ? 4.3 : k === "screw" ? 2.7 : k === "bird" || k === "glider" ? 0.8 : 1, h: k === "xbow" ? 3 : 5 });
});
DAV.targets = [];
for (var t = 0; t < 5; t++) {
var tx = P.x + 60, tz = P.z - 60 + t * 30, tg = new THREE.Group();
tg.position.set(tx, 0, tz);
D.add(tg);
tg.userData.keep = 1;
var straw = wCyl(1.2, 1.2, 0.5, davC(0xD8B860), 0, 1.5, 0, tg, DAV.lite ? 10 : 18);
straw.rotation.z = Math.PI / 2;
var bull = wCyl(0.4, 0.4, 0.52, davC(0xA83A2A), 0, 1.5, 0, tg, 12);
bull.rotation.z = Math.PI / 2;
wBox(0.12, 1.2, 0.12, davC(0x5A3A22), 0, 0.5, 0, tg);
DAV.targets.push({ g: tg, x: tx, z: tz, hit: 0 });
}
var jz = davArnoZ(P.x) - 30;
davBoxM(8, 0.3, 34, davSurf("wood", 0x9A7A52, 1), P.x, 0.35, jz - 2, D);
davFloor(P.x, jz - 2, 4, 17, 0.5);
for (var p = 0; p < 6; p++)
[-1, 1].forEach(function (s) { wCyl(0.15, 0.15, 3.4, davC(0x4A3422), P.x + s * 3.8, -1.2, jz - 8 + p * 5, D, 6); });
var bt = DAV.pgAt.boat;
bt.g.position.set(P.x + 7, DAV_WATER_Y, jz + 10);
bt.x = P.x + 7;
bt.z = jz + 10;
davSpot(P.x + 2.6, jz + 10, 4, "The paddle boat", "climb in", function () { davRideOn("boat", { x: P.x + 7, z: jz + 10 }); }, 0.5);
var dv = DAV.pgAt.diver;
dv.g.position.set(P.x - 2.6, 0.5, jz + 14);
dv.x = P.x - 2.6;
dv.z = jz + 14;
davSpot(P.x - 1, jz + 14, 3, "The diving suit", "put it on", function () { davDive(true); }, 0.5);
var vp = new THREE.Mesh(new THREE.CircleGeometry(4, DAV.lite ? 16 : 32), new THREE.MeshLambertMaterial({ map: davVortexTex() }));
vp.rotation.x = -Math.PI / 2;
vp.position.set(P.x - 40, 0.45, P.z + 100);
D.add(vp);
vp.userData.keep = 1;
wCyl(4.4, 4.6, 0.8, davSurf("stone", 0xC0B098, 1.5), P.x - 40, 0.2, P.z + 100, D, DAV.lite ? 14 : 28);
davSolid({ x: P.x - 40, z: P.z + 100, r: 4.6, h: 0.8 });
DAV.fx.push({ k: "vortex", m: vp });
davSpot(P.x - 40, P.z + 95, 3.4, "The vortex pool", "take the lesson: water and whirlpools", function () { davLesson("water"); });
var rmp = davBoxM(6, 0.2, 1.4, davSurf("wood", 0xB08A5A, 1), P.x + 40, 0.9, P.z + 100, D);
rmp.rotation.z = 0.25;
wBox(0.6, 0.4, 0.6, davC(0x6A6A70), P.x + 38, 1.4, P.z + 100, D);
davSolid({ x: P.x + 40, z: P.z + 100, hw: 3, hd: 0.8, h: 1.6 });
davSpot(P.x + 40, P.z + 97.6, 3, "The friction ramp and the ball bearing", "take the lesson: gears, screws and friction", function () { davLesson("gears"); });
davFolk(D, 90, P.x - 60, P.z - 20, { name: "Benedetto, master carpenter of the Proving Ground", still: true, say: "Benedetto, the master carpenter who builds the Proving Ground's machines full size from Leonardo's drawings. Practical, proud, good-humoured; he explains how each machine is made (pine, cane, starched linen, iron) and warns, laughing, that some of the master's ideas fly better on paper. He knows the Great Bird is to fly from Monte Ceceri to the cathedral square.", greet: "Mind the linen, it's still wet with starch! Want to try one? The Great Bird flies from Monte Ceceri; the rest you can take out right here." });
davPave(D, P.x, P.z - 80, 300, 20, 0.03, 0xC8B898, 4);
DAV.districts.push({ g: D, x: P.x, z: P.z, r: 400, name: "proving" });
return D;
},
function (G) {
var D = new THREE.Group();
D.name = "dav-ceceri";
G.add(D);
var C = DAV_CECERI, M = davMM();
var ramp = new THREE.Group();
ramp.position.set(C.x, C.y, C.z);
ramp.rotation.y = C.yaw;
D.add(ramp);
var deck = davBoxM(4, 0.3, 22, M.wood, 0, 1.2, -8, ramp);
deck.rotation.x = -0.09;
for (var i = 0; i < 5; i++)
[-1, 1].forEach(function (s) { wBox(0.25, 1.2 + i * 0.5, 0.25, M.dark, s * 1.8, (1.2 + i * 0.5) / 2, -2 - i * 4.5, ramp); });
var bird = davMachineModel("bird");
bird.position.set(0, 1.5, -4);
ramp.add(bird);
bird.userData.keep = 1;
DAV.ceceriBird = bird;
var c = Math.cos(C.yaw), s = Math.sin(C.yaw), fx = -s, fz = -c;
davSpot(C.x - fx * 1, C.z - fz * 1, 4.6, "The Great Bird, on its ramp", "fly it to the cathedral (Space climbs, C dives)", function () { davRideOn("bird", { run: true }); });
davSpot(C.x + c * 7, C.z - s * 7, 3, "The hill's edge", "take a parachute and step off", function () { davRideOn("chute"); });
davSign(["MONTE CECERI", "the hill of the swan · where the Great Bird flies from"], 5, 1.1, C.x + c * 4, 3, C.z - s * 4, C.yaw, D);
davFolk(D, 91, C.x + c * -6, C.z - s * -6, { y: C.y, still: true, name: "Tommaso Masini, called Zoroastro", say: "Tommaso Masini of Peretola, called Zoroastro (about 1462-1520), Leonardo's assistant, a mechanic, alchemist and joker. The story goes that he was the one who tried the flying machine from Monte Ceceri. Excitable, brave, a little mad; he talks of the wind on the hill and swears the Bird will fly.", greet: "The wind's good today! Lie in the frame, feet in the stirrups, and when you feel the hill drop away: pull!" });
davSpot(C.x - c * 8, C.z + s * 8, 3, "The kites over the hill", "take the lesson: how birds fly", function () { davLesson("flight"); });
DAV.kites = [];
for (var k = 0; k < (DAV.lite ? 3 : 6); k++) {
var kg = new THREE.Group();
var b = wSph(0.12, davC(0x5A3A22), 0, 0, 0, kg, 6);
b.scale.set(1, 0.7, 2.2);
[-1, 1].forEach(function (sd) { var w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.35), davC(0x6A4A2A, { ds: 1 })); w.position.x = sd * 0.48; w.rotation.x = -Math.PI / 2; kg.add(w); });
D.add(kg);
kg.userData.keep = 1;
DAV.kites.push({ g: kg, a: k / 6 * 6.28, r: 30 + k * 12, y: C.y + 30 + k * 8, sp: 0.18 + k * 0.03 });
}
DAV.districts.push({ g: D, x: C.x, z: C.z, r: 400, name: "ceceri" });
return D;
},
function (G, x, z, y, ry, name) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
davBoxM(4, 0.3, 12, davSurf("wood", 0x9A7A52, 1), 0, 0.35, 0, g);
for (var p = 0; p < 4; p++)
[-1, 1].forEach(function (s) { wCyl(0.14, 0.14, 3, davC(0x4A3422), s * 1.8, -1, -5 + p * 3.3, g, 6); });
var c = Math.cos(ry), s = Math.sin(ry);
davFloor(x, z, 6, 6, y + 0.5, { r: 6 });
davSpot(x, z, 4, name, "take the paddle boat", function () { davRideOn("boat", { x: x + s * 10, z: z + c * 10 }); }, y + 0.5);
DAV_JETTIES.push({ x: x, z: z });
},
function (k, o) {
o = o || {};
var M = DAV_MACH[k];
if (!M)
return;
if (DAV.ride)
davRideOff(true);
if (DAV.dive && k !== "boat")
davDive(false, true);
worldCard(null);
var R = { k: k, M: M, t: 0, cd: 0, run: o.run ? { t0: Date.now() } : null, fixed: o.g || null, prevFly: typeof canFly !== "undefined" ? canFly : false, prevSp: typeof rideSpeed !== "undefined" ? rideSpeed : 1 };
if (M.kind !== "fixed") {
R.g = davMachineModel(k);
DAV.G.add(R.g);
R.g.userData.keep = 1;
}
var flies = M.kind === "fly" || M.kind === "glide" || M.kind === "hover" || M.kind === "chute";
if (typeof canFly !== "undefined")
canFly = flies;
if (typeof rideSpeed !== "undefined" && M.kind !== "fixed")
rideSpeed = M.sp || 1;
DAV.ride = R;
var L = worldLocal();
if (o.x !== undefined) {
var gy = k === "boat" ? DAV_WATER_Y : davGround(o.x, o.z, 1e4);
var wl = davWaterAt(o.x, o.z);
if (k === "boat" && wl !== null)
gy = wl;
camera.position.set(DAV.base + o.x, gy + 1.72 + (M.seat || 0), o.z);
}
if (k === "bird" && R.run) {
var C = DAV_CECERI;
camera.position.set(DAV.base + C.x, C.y + 3, C.z);
yaw = C.yaw;
pitch = -0.05;
if (typeof flyY !== "undefined")
flyY = C.y + 1.3;
if (DAV.ceceriBird)
DAV.ceceriBird.visible = false;
}
if (k === "chute") {
if (typeof flyY !== "undefined")
flyY = Math.max(flyY, camera.position.y - 1.72);
}
davRidePanel(true);
var how = M.how ? " " + M.how : "";
setStatus(M.icon + " <b>You take " + esc(M.name) + ".</b>" + how + (R.run ? " <b>Fly it to the cathedral square and land there.</b>" : "") + " Get off with the button at the top, or from the 🎨 Leonardo menu.");
if (typeof playTone === "function")
playTone(330, 0.3);
},
function (quiet) {
var R = DAV.ride;
if (!R)
return;
DAV.ride = null;
if (R.g && R.g.parent)
R.g.parent.remove(R.g);
if (typeof canFly !== "undefined")
canFly = typeof hasAbility === "function" ? (hasAbility("flying") || hasAbility("floating")) : false;
if (typeof rideSpeed !== "undefined")
rideSpeed = 1;
if (DAV.ceceriBird)
DAV.ceceriBird.visible = true;
if (R.k === "boat" && WLD.on === DAV_KEY) {
var L = worldLocal(), best = null;
for (var a = 0; a < 16 && !best; a++)
for (var r = 6; r < 60 && !best; r += 4) {
var x = L.x + Math.cos(a / 16 * 6.28) * r, z = L.z + Math.sin(a / 16 * 6.28) * r;
if (davWaterAt(x, z) === null && !davSolidAt(x, z, davLand(x, z)))
best = { x: x, z: z };
}
if (best)
camera.position.set(DAV.base + best.x, davLand(best.x, best.z) + 1.72, best.z);
}
davRidePanel(false);
if (!quiet)
setStatus("You get off " + esc(R.M.name) + ". It goes back to its shed by itself.");
},
function (on) {
var el = document.getElementById("dav-ride");
if (!on) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "dav-ride";
el.style.cssText = "position:fixed;left:50%;top:52px;transform:translateX(-50%);z-index:44;display:flex;gap:8px";
el.innerHTML = "<button class='btn' id='dav-ride-off' style='padding:6px 14px'>🛬 Get off</button><button class='btn' id='dav-ride-fire' style='padding:6px 14px;display:none'>🔥 Fire</button>";
document.body.appendChild(el);
document.getElementById("dav-ride-off").onclick = function () { davRideOff(); };
document.getElementById("dav-ride-fire").onclick = function () { davFire(); };
}
el.style.display = "flex";
var R = DAV.ride;
document.getElementById("dav-ride-fire").style.display = R && R.M.wpn ? "" : "none";
document.getElementById("dav-ride-fire").textContent = R && R.M.wpn ? "🔥 " + R.M.wpn.name : "🔥 Fire";
},
function (dt, L) {
var R = DAV.ride;
if (!R)
return;
R.t += dt;
if (R.cd > 0)
R.cd -= dt;
var M = R.M, feet = camera.position.y - 1.72, g = R.g;
if (M.kind === "glide" && typeof flyY !== "undefined") {
flyY = Math.max(davGround(L.x, L.z, feet), flyY - 2.0 * dt);
}
if (M.kind === "chute" && typeof flyY !== "undefined") {
if (typeof flyVz !== "undefined" && flyVz > 0)
flyVz = 0;
flyY = Math.max(davGround(L.x, L.z, feet), flyY - 3.2 * dt);
if (flyY <= davGround(L.x, L.z, feet) + 0.05 && R.t > 1) {
davRideOff(true);
setStatus("🔺 <b>You land</b>, softly, just as he said you would. The linen folds down round you.");
return;
}
}
if (R.M.auto && typeof walkBy === "function") {
var v = 9 * R.M.sp * 0.6;
walkBy(-Math.sin(yaw) * v * dt, -Math.cos(yaw) * v * dt);
}
if (g) {
var sy = (M.kind === "fly" || M.kind === "glide") ? -1.0 : M.kind === "hover" ? -1.72 - 0.9 : M.kind === "chute" ? -1.6 : -1.72 - (M.seat || 0);
var gy = camera.position.y + sy;
if (M.kind === "chute")
gy = camera.position.y - 1.72 - 0.9;
g.position.set(L.x, gy, L.z);
g.rotation.y = yaw;
if (M.kind === "fly" && g.userData.flap) {
var up = typeof flyVz !== "undefined" && flyVz > 0.5, f = Math.sin(R.t * (up ? 7 : 3.2)) * (up ? 0.55 : 0.22);
g.userData.flap[0].rotation.z = f;
g.userData.flap[1].rotation.z = -f;
g.rotation.x = -pitch * 0.4;
}
if (M.kind === "hover" && g.userData.spin)
g.userData.spin.rotation.y += dt * 3.2;
if (M.kind === "glide")
g.rotation.z = Math.sin(R.t * 0.7) * 0.05;
if (R.k === "boat" && g.userData.wheels)
g.userData.wheels.forEach(function (w) { w.rotation.x -= dt * 3; });
}
if (R.k === "bird" && R.run && R.t > 4 && typeof flyY !== "undefined") {
var gr = davGround(L.x, L.z, feet);
if (feet - gr < 0.4) {
var sq = Math.hypot(L.x - (DAV_DUOMO.x - 60), L.z - DAV_DUOMO.z) < 95;
if (sq) {
R.run = null;
davClaim("bird");
setStatus("🪽 <b>You landed the Great Bird in the cathedral square!</b> 'The great bird will take its first flight from the back of the great swan, filling the universe with wonder.' And so it has.");
}
else if (R.t > 10) {
R.run = null;
setStatus("🪽 You set the Great Bird down, but not in the cathedral square. Fly from Monte Ceceri again and land by the cathedral to finish the flight.");
}
}
}
},
function () {
var R = DAV.ride;
if (!R || !R.M.wpn)
return;
var W = R.M.wpn;
if (R.cd > 0) {
setStatus("Reloading: " + Math.ceil(R.cd) + " seconds.");
return;
}
R.cd = W.cd;
davRidePanel(true);
var L = worldLocal(), hit = 0, n = 0;
if (typeof DGB !== "undefined" && DGB.on)
DGB.on.forEach(function (B) {
if (B.st === "dead")
return;
var dx = B.x - L.x, dz = B.z - L.z, d = Math.hypot(dx, dz);
if (d > W.r)
return;
if (W.cone) {
var rel = Math.atan2(-dx, -dz) - yaw;
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
if (Math.abs(rel) > W.cone)
return;
}
if (typeof dgbSpellHit === "function") {
dgbSpellHit(B, W.dmg);
hit++;
}
});
if (typeof raDreamers === "function" && typeof raHitDreamer === "function")
try {
raDreamers(Math.min(W.r, W.cone ? 40 : 12)).forEach(function (o) { if (W.cone && typeof raFacing === "function" && !raFacing(o, W.cone))
return; raHitDreamer(o, W.pvp); n++; });
}
catch (e) { }
(DAV.targets || []).forEach(function (T) { var dx = T.x - L.x, dz = T.z - L.z, d = Math.hypot(dx, dz); if (d > W.r)
return; if (W.cone) {
var rel = Math.atan2(-dx, -dz) - yaw;
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
if (Math.abs(rel) > W.cone + 0.08)
return;
} T.hit = 1.4; hit++; });
davSmoke(L, R.k === "xbow");
if (typeof playTone === "function")
playTone(R.k === "xbow" ? 140 : 90, 0.5);
setStatus(R.M.icon + " <b>" + esc(W.name) + "!</b> " + (hit || n ? "It strikes " + (hit + n) + (hit + n > 1 ? " marks" : " mark") + "." : "Nothing in its reach."));
},
function (L, bolt) {
var mat = new THREE.SpriteMaterial({ map: typeof softGlow === "function" ? softGlow() : null, color: 0x8A8680, transparent: true, opacity: 0.5, depthWrite: false });
for (var i = 0; i < (DAV.lite ? 4 : 9); i++) {
var s = new THREE.Sprite(mat.clone());
var a = bolt ? yaw : i / 9 * Math.PI * 2;
s.position.set(L.x - Math.sin(a) * (bolt ? 6 : 4.3), camera.position.y - 1.2, L.z - Math.cos(a) * (bolt ? 6 : 4.3));
s.scale.set(2, 2, 1);
DAV.G.add(s);
DAV.fx.push({ k: "smoke", m: s, t: 0 });
}
if (bolt) {
var b = wCyl(0.1, 0.1, 3, davC(0x4A4A50), L.x, camera.position.y - 0.6, L.z, DAV.G, 6);
b.rotation.x = Math.PI / 2;
b.rotation.y = yaw;
DAV.fx.push({ k: "bolt", m: b, t: 0, dx: -Math.sin(yaw), dz: -Math.cos(yaw) });
}
},
function (k) {
var P = DAV.pgAt && DAV.pgAt[k], M = DAV_MACH[k];
if (!P)
return;
if (k === "knight") {
DAV.fx.push({ k: "knight", g: P.g, t: 0 });
setStatus("🤖 <b>You wind the Mechanical Knight.</b> Cables tighten inside it: it sits up, raises its arms, turns its head and opens its visor, then slowly lowers its arms again. " + esc(M.about));
}
else if (k === "lion") {
DAV.fx.push({ k: "lion", g: P.g, t: 0, x0: P.g.position.x, z0: P.g.position.z });
setStatus("🦁 <b>You wind the Mechanical Lion.</b> It walks forward, a few heavy steps, stops, and its chest swings open: it is full of lilies. " + esc(M.about));
}
else if (k === "bridge") {
DAV.fx.push({ k: "bridge", g: P.g.userData.deck, t: 0, from: P.g.userData.deck.rotation.y });
setStatus("🌉 <b>The Revolving Bridge swings round</b> on its pivot, balanced by its box of stones. " + esc(M.about));
}
else if (k === "odo") {
var D = davData();
D.odo = (D.odo || 0) + 1;
setStatus("📏 <b>You push the Odometer along the field.</b> Every turn of its wheel drops a pebble in the box: " + (D.odo * 3) + " pebbles so far, that is " + Math.round(D.odo * 3 * 4.2) + " metres measured. Leonardo mapped whole valleys this way.");
}
},
function () { worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🔺 The Parachute</div><div style='opacity:.85;margin:4px 0 8px'>" + esc(DAV_MACH.chute.about) + "</div><div style='opacity:.85'>Take it from a high place: the lantern at the top of the cathedral's dome (climb up from inside), the edge at the top of Monte Ceceri, or while you hover in the Aerial Screw (the 🎨 Leonardo menu).</div>", {}); },
function (L) {
if (!DAV.dive)
return;
var w = davWaterAt(L.x, L.z);
if (w === null)
return;
DAV_RIVER_FINDS.forEach(function (F, i) {
var fz = davArnoZ(F[0]);
if (Math.hypot(L.x - F[0], L.z - fz) < 6) {
var D = davData();
D.found = D.found || {};
if (D.found["r" + i])
return;
D.found["r" + i] = 1;
davKeep(F[2], F[1], "found on the bed of the Arno");
setStatus(F[2] + " <b>On the river bed: " + esc(F[1]) + ".</b> It is in your 🎒 Backpack.");
}
});
},
function (x, z, yawTo, msg, y) {
var v = davVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
DAV.moving = true;
setTimeout(function () {
if (WLD.on !== DAV_KEY) {
v.style.opacity = "0";
DAV.moving = false;
return;
}
if (DAV.ride)
davRideOff(true);
var gy = y !== undefined ? y : davGround(x, z, 1e4);
camera.position.set(DAV.base + x, gy + 1.72, z);
if (yawTo !== undefined && yawTo !== null)
yaw = yawTo;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
DAV.zone = davZoneAt(x, z);
DAV.insideOf = davInAt(x);
if (msg)
setStatus(msg);
setTimeout(function () { v.style.opacity = "0"; DAV.moving = false; }, 120);
}, 640);
},
function (key, alt) {
var I = DAV_IN[key];
if (!I)
return;
if (!I.built) {
var grp = new THREE.Group();
grp.name = "dav-in-" + key;
DAV.G.add(grp);
I.grp = grp;
try {
I.build(grp, I);
}
catch (e) {
if (window.console)
console.warn("[davinci] inside " + key, e);
}
I.built = true;
if (typeof gwBake === "function")
try {
gwBake(grp);
}
catch (e) { }
}
var A = alt && I.arrive2 ? I.arrive2 : I.arrive;
davMove(I.x + A[0], I.z + A[1], A[2], (alt && A[3]) || I.say || ("<b>" + I.name + ".</b>"));
},
function () {
for (var k in DAV_IN) {
var I = DAV_IN[k];
if (!I.built || DAV.insideOf === I)
continue;
if (!DAV.lite && !(typeof wlgHeavy === "function" && wlgHeavy()))
continue;
if (I.grp) {
DAV.G.remove(I.grp);
I.grp.traverse(function (m) { if (m.geometry && !m.geometry.userData.shared)
m.geometry.dispose(); });
}
var x0 = I.x - I.hw - 5, x1 = I.x + I.hw + 5;
DAV.floors = DAV.floors.filter(function (f) { return f.x < x0 || f.x > x1; });
DAV.spots = DAV.spots.filter(function (s) { return s.x < x0 || s.x > x1; });
DAV.talk = DAV.talk.filter(function (t) { var px = t.p ? t.p.g.position.x : t.x; return px < x0 || px > x1; });
DAV.people = DAV.people.filter(function (p) { return p.g.position.x < x0 || p.g.position.x > x1; });
davSolidsDrop(x0, x1);
I.built = false;
I.grp = null;
}
},
function (grp, x0, z0, x1, z1, h, mat, gaps, y) {
y = y || 0;
var alongX = Math.abs(x1 - x0) > Math.abs(z1 - z0), L = alongX ? Math.abs(x1 - x0) : Math.abs(z1 - z0), sgn = alongX ? Math.sign(x1 - x0) : Math.sign(z1 - z0), cuts = [0];
(gaps || []).slice().sort(function (a, b) { return a[0] - b[0]; }).forEach(function (g) { cuts.push(g[0], g[1]); });
cuts.push(L);
for (var i = 0; i < cuts.length; i += 2) {
var a = cuts[i], b = cuts[i + 1];
if (b - a < 0.05)
continue;
var m = (a + b) / 2, l = b - a;
var px = alongX ? x0 + sgn * m : x0, pz = alongX ? z0 : z0 + sgn * m;
davBoxM(alongX ? l : 0.5, h, alongX ? 0.5 : l, mat, px, y + h / 2, pz, grp);
davSolid({ x: px, z: pz, hw: alongX ? l / 2 : 0.25, hd: alongX ? 0.25 : l / 2, h: h, b: y });
}
(gaps || []).forEach(function (g) { var m = (g[0] + g[1]) / 2, l = g[1] - g[0], px = alongX ? x0 + sgn * m : x0, pz = alongX ? z0 : z0 + sgn * m; if (h > 3.4)
davBoxM(alongX ? l : 0.5, h - 3.2, alongX ? 0.5 : l, mat, px, y + 3.2 + (h - 3.2) / 2, pz, grp); });
},
function (grp, cx, cz, w, d, h, o) {
o = o || {};
var wall = o.wall || davSurf("plaster", 0xE8DCC4, 3), fl = o.floor || davSurf("floortile", 0xC8907A, 1.6);
davInFloor(grp, cx, cz, w, d, o.y || 0, fl);
var y = o.y || 0, g = o.gaps || {};
davIWall(grp, cx - w / 2, cz - d / 2, cx + w / 2, cz - d / 2, h, wall, g.n, y);
davIWall(grp, cx - w / 2, cz + d / 2, cx + w / 2, cz + d / 2, h, wall, g.s, y);
davIWall(grp, cx - w / 2, cz - d / 2, cx - w / 2, cz + d / 2, h, wall, g.w, y);
davIWall(grp, cx + w / 2, cz - d / 2, cx + w / 2, cz + d / 2, h, wall, g.e, y);
if (!o.open) {
var ceil = new THREE.Mesh(new THREE.PlaneGeometry(w, d), davC(o.ceil || 0x8A6A4A));
ceil.rotation.x = Math.PI / 2;
ceil.position.set(cx, y + h, cz);
grp.add(ceil);
if (!DAV.lite)
for (var bx = cx - w / 2 + 2; bx < cx + w / 2; bx += 3.2)
wBox(0.34, 0.42, d, davSurf("wood", 0x7A5A3A, 1.2), bx, y + h - 0.22, cz, grp);
}
if (o.lamps !== false)
for (var lx = cx - w / 2 + w / 4; lx < cx + w / 2; lx += w / 2)
for (var lz = cz - d / 2 + d / 4; lz < cz + d / 2; lz += d / 2) {
var gl = wGlow(0xFFD8A0, 2.4, 0.22);
gl.position.set(lx, y + h - 1.4, lz);
grp.add(gl);
davHang(grp, lx, y + h, lz);
}
},
function (grp, x, top, z) {
wBox(0.05, 1.2, 0.05, davC(0x2A2622), x, top - 0.6, z, grp);
var r = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.05, 4, DAV.lite ? 10 : 18), davC(0x2A2622));
r.rotation.x = Math.PI / 2;
r.position.set(x, top - 1.2, z);
grp.add(r);
if (!DAV.lite)
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
wCyl(0.04, 0.04, 0.22, davC(0xF0E8D8), x + Math.cos(a) * 0.7, top - 1.05, z + Math.sin(a) * 0.7, grp, 5);
wBox(0.05, 0.08, 0.05, davGlowM(0xFFD890), x + Math.cos(a) * 0.7, top - 0.9, z + Math.sin(a) * 0.7, grp);
}
},
function (key, x, z, ry, o) {
var F = DAV_FOLK[key], p = wPerson("dav_" + key, { look: F.look || null, title: o && o.title, place: DAV_NAME });
p.position.set(x, (o && o.y) || 0, z);
p.rotation.y = ry || 0;
((o && o.parent) || DAV.G).add(p);
var P = { g: p, key: key, wander: o && o.wander };
DAV.people.push(P);
DAV.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (grp, x, z, w, d, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = davSurf("wood", 0x9A7048, 1);
davBoxM(w, 0.12, d, wood, 0, 0.86, 0, g);
[-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { wBox(0.1, 0.82, 0.1, davC(0x5A3A22), a * (w / 2 - 0.15), 0.41, b * (d / 2 - 0.15), g); }); });
davSolid({ x: x, z: z, hw: (Math.abs(Math.cos(ry || 0)) > 0.5 ? w : d) / 2, hd: (Math.abs(Math.cos(ry || 0)) > 0.5 ? d : w) / 2, h: 0.9 });
return g;
},
function (grp, x, z, w, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = davC(0x5A3A22), R = wRand((x * 13 + z * 7) | 0), bc = [0x7A2A1E, 0x2A4A3A, 0x6A5A2A, 0x3A2A4A, 0x8A6A3A, 0x5A3A2A];
wBox(w, 3.2, 0.5, wood, 0, 1.6, 0, g);
for (var s = 0; s < 5; s++) {
var y = 0.35 + s * 0.62;
wBox(w - 0.1, 0.05, 0.48, davC(0x6A4A2A), 0, y, 0.02, g);
if (!DAV.lite) {
var bx = -w / 2 + 0.12;
while (bx < w / 2 - 0.12) {
var bw = 0.05 + R() * 0.08, bh = 0.3 + R() * 0.2;
wBox(bw, bh, 0.32, davC(bc[(R() * bc.length) | 0]), bx + bw / 2, y + bh / 2 + 0.03, 0.06, g);
bx += bw + 0.005;
}
}
else
wBox(w - 0.2, 0.4, 0.32, davC(bc[s % bc.length]), 0, y + 0.23, 0.06, g);
}
davSolid({ x: x, z: z, hw: (Math.abs(Math.cos(ry || 0)) > 0.5 ? w : 0.6) / 2, hd: (Math.abs(Math.cos(ry || 0)) > 0.5 ? 0.6 : w) / 2, h: 3.2 });
return g;
},
function (grp, x, z, ry, canvasMat) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = davC(0x7A5232);
[-0.5, 0.5].forEach(function (k) { var l = wBox(0.07, 2.3, 0.07, wood, k, 1.15, 0.1, g); l.rotation.z = -k * 0.18; });
var b = wBox(0.07, 2.2, 0.07, wood, 0, 1.05, -0.45, g);
b.rotation.x = 0.35;
wBox(1.2, 0.06, 0.12, wood, 0, 0.88, 0.16, g);
var c = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.3), canvasMat || davC(0xEDE4D0));
c.position.set(0, 1.58, 0.2);
c.rotation.x = -0.08;
g.add(c);
davSolid({ x: x, z: z, r: 0.6, h: 2.2 });
return { g: g, canvas: c };
},
function (grp, I) {
var X = I.x, Z = I.z, plaster = davSurf("plaster", 0xEADCC0, 3), stone = davSurf("stone", 0xC8B898, 2.6), terra = davSurf("floortile", 0xC88A6A, 1.4), wood = davSurf("wood", 0xB08A5A, 1.2);
davRoomShell(grp, X - 36, Z, 28, 26, 8, { wall: plaster, floor: terra, gaps: { w: [[11, 15]], e: [[4, 8], [18, 22]], n: [], s: [] } });
davSpot(X - 49, Z, 2.6, "The door", "go back out to the street", function () { davLeave("bottega"); });
davPerson("verrocchio", X - 36, Z + 8, Math.PI * 0.9, { parent: grp });
var dav = wPerson("dav_davidstatue", { look: { sex: "m", skin: 0x8A6A3A, hair: 0x6A4A22, top: 0x8A6A3A, bottom: 0x8A6A3A, shoes: 0x8A6A3A, hairStyle: "curly" } });
dav.position.set(X - 30, 1.1, Z - 6);
dav.rotation.y = -Math.PI / 2;
grp.add(dav);
wCyl(0.8, 0.9, 1.1, stone, X - 30, 0.55, Z - 6, grp, DAV.lite ? 8 : 14);
davSolid({ x: X - 30, z: Z - 6, r: 0.9 });
davSpot(X - 30, Z - 6, 2.6, "Verrocchio's David, in bronze", "look", function () { davInfo("Verrocchio's David", "Bronze, about 1473-75, made for the Medici. Some say the young apprentice who stood for it was Leonardo himself; nobody knows for sure. Verrocchio's workshop made bronzes, paintings, goldsmith's work, banners, tombs and even the great copper ball on the cathedral's lantern."); });
davTable(grp, X - 40, Z - 9, 4, 1.4, 0);
davShelf(grp, X - 36, Z + 12.4, 10, 0);
davRoomShell(grp, X + 4, Z - 24, 52, 22, 9, { wall: plaster, floor: wood, gaps: { s: [[4, 8], [30, 34]], w: [], e: [], n: [] } });
for (var w = 0; w < 6; w++) {
var wn = wBox(3, 4, 0.1, davGlowM(0xFFF0D0), X - 18 + w * 8.6, 6, Z - 34.95, grp);
}
var lp = davPerson("lisa", X + 14, Z - 28, Math.PI * 0.95, { parent: grp });
var chair = wBox(0.8, 1.1, 0.8, davC(0x6A3A2A), X + 14, 0.45, Z - 28.4, grp);
lp.g.position.y = 0.05;
var easelL = davEasel(grp, X + 12, Z - 22.5, Math.PI * 1.05, new THREE.MeshLambertMaterial({ map: davUnderdrawTex() }));
davPerson("leonardo", X + 10.4, Z - 21.8, Math.PI * 1.2, { parent: grp });
davSpot(X + 12, Z - 22.5, 2.4, "The portrait on the easel", "look", function () { davInfo("Lisa's portrait, begun", "Leonardo began this portrait of Lisa Gherardini, wife of Francesco del Giocondo, in about 1503, and worked on it for years, layer on layer of thin glaze, so the light seems to come from inside the skin. That is sfumato: shadows and lights joined without lines or borders, like smoke. Here it is still at the underdrawing, so you can see how he began."); });
for (var e = 0; e < 4; e++) {
var ex = X - 20 + e * 6, ez = Z - 18;
davEasel(grp, ex, ez, Math.PI, null);
davSpot(ex, ez + 1.4, 2, "An easel", "paint or draw", function () { davPaint(); });
}
DAV.artWall = { grp: grp, x: X - 22, z: Z - 34.7, frames: [] };
davArtWall();
var head = wSph(0.3, davC(0xF0ECE4), X + 24, 1.35, Z - 30, grp, DAV.lite ? 10 : 20);
davTable(grp, X + 24, Z - 30, 1.4, 1, 0);
davSpot(X + 24, Z - 28.4, 2.4, "The plaster head and the lamp", "take the lesson: light, shade and sfumato", function () { davLesson("sfumato"); });
var pw = wBox(2.4, 2.4, 0.06, davC(0xBFD8E0, { op: 0.35 }), X - 4, 2.6, Z - 34.4, grp);
davSpot(X - 4, Z - 32.6, 2.4, "Leonardo's perspective glass", "take the lesson: perspective", function () { davLesson("perspective"); });
var vo = davBoxM(2.2, 1, 0.9, davSurf("wood", 0x8A5A30, 1), X + 26, 0.9, Z - 17, grp);
davSolid({ x: X + 26, z: Z - 17, hw: 1.1, hd: 0.5 });
davSpot(X + 26, Z - 15.8, 2.2, "The viola organista", "play it (Leonardo's bowed keyboard)", function () { davViola(); });
davInFloor(grp, X + 4, Z, 30, 26, 0, stone);
var well = wCyl(1.4, 1.5, 1, stone, X + 4, 0.5, Z + 6, grp, DAV.lite ? 10 : 18);
davSolid({ x: X + 4, z: Z + 6, r: 1.5, h: 1 });
[-1, 1].forEach(function (k) { wBox(0.18, 2.8, 0.18, davC(0x3A3028), X + 4 + k * 1.3, 1.4, Z + 6, grp); });
wBox(2.8, 0.18, 0.18, davC(0x3A3028), X + 4, 2.8, Z + 6, grp);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 6, DAV.lite ? 24 : 48), davC(0xB8863A, { shine: 60 }));
ring.rotation.x = Math.PI / 2;
ring.position.set(X + 4, 0.06, Z - 4);
grp.add(ring);
var sq = new THREE.Mesh(new THREE.RingGeometry(1.95, 2.05, 4, 1), davC(0xB8863A));
sq.rotation.x = -Math.PI / 2;
sq.rotation.z = Math.PI / 4;
sq.position.set(X + 4, 0.07, Z - 4.5);
grp.add(sq);
davSpot(X + 4, Z - 4, 2.4, "The bronze circle and square", "take the lesson: the measure of a man", function () { davLesson("vitruvian"); });
davPerson("salai", X - 4, Z + 9, 0.6, { parent: grp, wander: { r: 4, sp: 0.8 } });
davRoomShell(grp, X + 4, Z + 24, 52, 22, 8, { wall: plaster, floor: terra, gaps: { n: [[4, 8], [30, 34]], w: [], e: [], s: [] } });
var models = DAV_MACHINES;
models.forEach(function (M, i) {
var mx = X - 18 + (i % 7) * 7.4, mz = Z + (i < 7 ? 19 : 29);
davTable(grp, mx, mz, 3.2, 2, 0);
try {
var mg = davMachineModel(M.k);
mg.scale.setScalar(davModelScale(M.k));
mg.position.set(mx, 0.95, mz);
grp.add(mg);
}
catch (e) { }
davSpot(mx, mz + (i < 7 ? -1.6 : 1.6), 2.2, "A model: " + M.name, "study it", function () { davMachineCard(M.k); });
});
davBoxM(3, 3.2, 3, davSurf("brick", 0xB87A60, 1.6), X + 27, 1.6, Z + 30, grp);
wBox(1, 0.8, 0.1, davGlowM(0xC0602A), X + 25.45, 0.9, Z + 30, grp);
davSolid({ x: X + 27, z: Z + 30, hw: 1.6, hd: 1.6 });
davSpot(X + 24, Z + 28, 2.6, "The Bottega's foundry", "make Leonardo's Italy's own gear (the anvils and the furnace)", function () { if (typeof craftOpen === "function")
craftOpen("wg_" + DAV_KEY);
else
setStatus("The founder is banking the fire. Come back after the next update."); });
davRoomShell(grp, X + 36, Z, 22, 48, 8, { wall: davSurf("wood", 0x7A5232, 1.6), floor: wood, gaps: { w: [[22, 26]], e: [], n: [], s: [] } });
for (var s = 0; s < 5; s++) {
davShelf(grp, X + 46.4, Z - 18 + s * 9, 7, -Math.PI / 2);
}
davShelf(grp, X + 36, Z - 23.5, 10, 0);
davShelf(grp, X + 36, Z + 23.5, 10, Math.PI);
davTable(grp, X + 33, Z - 8, 3.4, 1.6, Math.PI / 2);
davTable(grp, X + 33, Z + 8, 3.4, 1.6, Math.PI / 2);
davSpot(X + 31.4, Z - 8, 2.4, "The notebooks", "read them (and your own codex)", function () { davCodexCard(); });
davSpot(X + 31.4, Z + 8, 2.4, "The master's table", "take the Master's examination", function () { davExam(); });
var mir = wBox(0.9, 1.4, 0.06, davC(0xC8D4DC, { shine: 90, spec: 0xFFFFFF }), X + 40, 1.5, Z, grp);
wBox(1, 0.08, 0.4, davC(0x5A3A22), X + 40, 0.75, Z, grp);
davPerson("melzi", X + 38, Z + 3, -Math.PI / 2, { parent: grp });
davSpot(X + 44.6, Z + 20.6, 1.6, "A loose page, its writing backwards", "pick it up", function () { davClueCard(); });
davRoomShell(grp, X - 14, Z + 4, 8, 8, 4, { wall: davC(0x1A1816), floor: davC(0x2A2420), ceil: 0x141210, lamps: false, gaps: { e: [[2, 4.4]], w: [], n: [], s: [] } });
DAV.obscura = { grp: grp, x: X - 17.8, z: Z + 4 };
davObscuraScreen(grp, X - 17.7, Z + 4);
davSpot(X - 15, Z + 4, 2.6, "The camera obscura", "take the lesson: the dark room", function () { davLesson("obscura"); });
davRiddleSpot(X - 22, Z - 1, "bottega", 0);
davRiddleSpot(X + 24, Z + 13, "bottega", 1);
davRiddleSpot(X + 30, Z - 22.6, "bottega", 2);
},
function (grp, I) {
var X = I.x, Z = I.z, pl = davSurf("plaster", 0xD8D0C2, 3), stone = davSurf("stone", 0x8A8C88, 2.4), fl = davMarbleMat("panel", 5);
davRoomShell(grp, X - 20, Z, 84, 40, 30, { wall: pl, floor: fl, ceil: 0xE8E2D8, gaps: { w: [[18, 22]], e: [[8, 32]], n: [], s: [] } });
davSpot(X - 62, Z, 2.6, "The great door", "go back out to the square", function () { davLeave("duomo"); });
for (var c = 0; c < 5; c++)
[-1, 1].forEach(function (s) { var cx = X - 52 + c * 16, cz = Z + s * 10; davColumn(grp, cx, 0, cz, 22, 0.9, stone); davSolid({ x: cx, z: cz, r: 1.2 }); });
var R = 22, fw = 2 * R * Math.tan(Math.PI / 8);
for (var q = 0; q < 8; q++) {
if (q === 4)
continue;
var aq = q / 8 * Math.PI * 2, fb = davBoxM(0.8, 30, fw + 0.4, pl, X + 44 + Math.cos(aq) * (R + 0.4), 15, Z + Math.sin(aq) * (R + 0.4), grp);
fb.rotation.y = -aq;
davSolid({ x: X + 44 + Math.cos(aq) * (R + 0.4), z: Z + Math.sin(aq) * (R + 0.4), hw: 0.5, hd: fw / 2 + 0.2, rot: -aq, h: 30 });
}
davInFloor(grp, X + 44, Z, R * 2, R * 2, 0, fl);
var dome = davLathe([[R, 0], [R * 0.96, 10], [R * 0.84, 20], [R * 0.62, 30], [R * 0.3, 38], [4, 40]], DAV.lite ? 8 : 8, davC(0xD8D2C6, { ds: 1 }), grp, X + 44, 30, Z);
dome.material.side = THREE.DoubleSide;
dome.rotation.y = Math.PI / 8;
for (var f = 0; f < 8; f++) {
var a = f / 8 * Math.PI * 2, ow = new THREE.Mesh(new THREE.CircleGeometry(2.4, 18), davGlowM(0xFFF4DC));
ow.position.set(X + 44 + Math.cos(a) * (R - 0.6), 24, Z + Math.sin(a) * (R - 0.6));
ow.lookAt(X + 44, 24, Z);
grp.add(ow);
}
var alt = davBoxM(4, 1.2, 2, davSurf("marble", 0xD8D2C6, 1.5), X + 44, 0.6, Z, grp);
davSolid({ x: X + 44, z: Z, hw: 2, hd: 1 });
davSpot(X + 44, Z + 3, 3, "Under the dome", "look up", function () { davInfo("Brunelleschi's dome", "Filippo Brunelleschi built it from 1420 to 1436 without any wooden frame holding it up from below, which everyone said was impossible: two shells, one inside the other, eight great ribs, bricks laid in a herringbone pattern so each ring held itself, and rings of stone and iron round it like barrel hoops. It is still the largest brick dome in the world. Leonardo drew Brunelleschi's hoisting machines in his notebooks."); });
davRiddleSpot(X + 30, Z - 12, "duomo", 0);
davRiddleSpot(X + 30, Z + 12, "duomo", 1);
davSpot(X + 44, Z - R + 2, 3, "The door to the climb", "climb the dome (463 steps, to the lantern)", function () { davMove(X + 44 + 5.4, Z + DAV_HELIX.dz, 0, "<b>The climb.</b> A narrow stair of brick, going round and round between the dome's two shells. 463 steps to the lantern. Keep going up.", 0.02); });
davHelixBuild(grp, X + 44, Z + DAV_HELIX.dz);
},
function (grp, hx, hz) {
var H = DAV_HELIX, n = DAV.lite ? 16 : 24, brick = davSurf("brick", 0xC8907A, 1.6), top = H.pitch * H.turns;
DAV.helix = { x: hx, z: hz, top: top };
var outer = new THREE.Mesh(davUVany(new THREE.CylinderGeometry(H.r1 + 0.4, H.r1 + 0.4, top + 6, DAV.lite ? 14 : 28, 1, true)), brick);
outer.material.side = THREE.DoubleSide;
outer.position.set(hx, top / 2 + 2, hz);
grp.add(outer);
var core = new THREE.Mesh(davUVany(new THREE.CylinderGeometry(H.r0 - 0.1, H.r0 - 0.1, top + 6, DAV.lite ? 10 : 18)), brick);
core.position.set(hx, top / 2 + 2, hz);
grp.add(core);
for (var t = 0; t < H.turns * n; t++) {
var a = (t + 0.5) / n * Math.PI * 2, y = t / n * H.pitch, rm = (H.r0 + H.r1) / 2, st = wBox(H.r1 - H.r0, 0.3, Math.PI * 2 * rm / n + 0.1, davSurf("stone", 0xB8A890, 1.5), hx + Math.cos(a) * rm, y + 0.15, hz + Math.sin(a) * rm, grp);
st.rotation.y = -a;
if (t % n === 0) {
var gl = wGlow(0xFFD8A0, 2.6, 0.4);
gl.position.set(hx + Math.cos(a) * (H.r1 - 0.3), y + 2.2, hz + Math.sin(a) * (H.r1 - 0.3));
grp.add(gl);
}
}
var land = new THREE.Mesh(new THREE.RingGeometry(H.r0, H.r1, DAV.lite ? 14 : 28), davSurf("stone", 0xB8A890, 1.5));
land.rotation.x = -Math.PI / 2;
land.position.set(hx, top + 0.02, hz);
grp.add(land);
davFloor(hx, hz, 0, 0, top, { r: H.r1, inside: 1 });
davSpot(hx + H.r1 - 1, hz, 2.4, "Daylight, through a little door", "step out onto the lantern's terrace", function () { var L = DAV.lantern; davMove(L.sx, L.sz, L.yaw, "<b>The lantern of the dome</b>, ninety metres over Florence. The whole city below: the river, the bridges, the towers, the hills all round, and Monte Ceceri to the north-east. Take a parachute and step off, if you dare; or climb back down.", L.y); }, top);
davSpot(hx - H.r1 + 1.2, hz, 2.2, "The bottom of the stair", "go back into the cathedral", function () { var I = DAV_IN.duomo; davMove(I.x + 44, I.z - 14, Math.PI, "Back in the crossing, under the dome.", 0); }, 0);
},
function (x, z, feet) {
var D = DAV.helix;
if (!D)
return null;
var dx = x - D.x, dz = z - D.z, r = Math.hypot(dx, dz), H = DAV_HELIX;
if (r < H.r0 - 0.2 || r > H.r1 + 0.3)
return null;
var a = Math.atan2(dz, dx);
if (a < 0)
a += Math.PI * 2;
var base = a / (Math.PI * 2) * H.pitch, best = null;
for (var k = 0; k < H.turns; k++) {
var y = base + k * H.pitch;
if (y > D.top)
break;
if (y <= feet + 0.7 && (best === null || y > best))
best = y;
}
return best === null ? 0 : best;
},
function (grp, I) {
var X = I.x, Z = I.z, pl = davSurf("plaster", 0xDAD0BE, 3), fl = davSurf("floortile", 0xB8806A, 1.6);
davRoomShell(grp, X, Z, 72, 28, 18, { wall: pl, floor: fl, ceil: 0x6A4A2A, gaps: { w: [[12, 16]], e: [], n: [], s: [] } });
if (!DAV.lite)
for (var cx = X - 34; cx <= X + 34; cx += 6)
for (var cz = Z - 12; cz <= Z + 12; cz += 6)
wBox(4.6, 0.5, 4.6, davC(0xC8A050), cx, 17.7, cz, grp);
davSpot(X - 34, Z, 2.6, "The door", "go back out to the square", function () { davLeave("vecchio"); });
DAV.anghiari = { grp: grp, x: X + 35.6, z: Z, panels: [] };
davAnghiariWall();
davSpot(X + 32, Z, 4, "The battle wall (Anghiari)", "paint it", function () { davAnghiariCard(); });
var cc = new THREE.Mesh(new THREE.PlaneGeometry(14, 7), new THREE.MeshLambertMaterial({ map: davCartoonTex(2) }));
cc.position.set(X - 35.6, 7, Z + 6);
cc.rotation.y = Math.PI / 2;
grp.add(cc);
davPerson("michelangelo", X - 30, Z + 8, -Math.PI / 2, { parent: grp });
davSpot(X - 33, Z + 6, 3, "Michelangelo's cartoon", "look", function () { davInfo("The Battle of Cascina", "Michelangelo's full-size drawing (a cartoon) of soldiers surprised while bathing in the Arno, 1504. He never painted it on the wall: the Pope called him to Rome. The cartoon was studied by every young artist in Florence, and then cut up and lost."); });
davRiddleSpot(X, Z - 13.5, "vecchio", 0);
},
function (grp, I) {
var X = I.x, Z = I.z, pl = davSurf("plaster", 0xD8D0C2, 3), fl = davSurf("floortile", 0xC4BAA8, 1.4);
davRoomShell(grp, X, Z, 46, 24, 9, { wall: pl, floor: fl, ceil: 0xD8D0C0, gaps: { w: [[10, 14]], e: [], n: [], s: [] } });
davSpot(X - 22, Z, 2.6, "The door", "go back out", function () { davLeave("hospital"); });
davPerson("friar", X - 12, Z + 5, -Math.PI / 2, { parent: grp });
DAV.heart = davHeartModel(grp, X - 4, Z - 7);
davSpot(X - 4, Z - 4.6, 2.6, "The glass heart", "take the lesson: the heart and its valves", function () { davLesson("heart"); });
DAV.eye = davEyeModel(grp, X + 8, Z - 7);
davSpot(X + 8, Z - 4.6, 2.6, "The great eye", "take the lesson: the eye", function () { davLesson("eye"); });
davSkeletonModel(grp, X + 16, Z + 6);
davSpot(X + 16, Z + 3.8, 2.6, "The bronze figure of bones and cords", "take the lesson: bones and muscles", function () { davLesson("skeleton"); });
for (var t = 0; t < 3; t++)
davTable(grp, X - 6 + t * 8, Z + 8, 3, 1.4, 0);
davShelf(grp, X + 22.4, Z - 4, 8, -Math.PI / 2);
},
function (grp, x, z) {
var g = new THREE.Group();
g.position.set(x, 0, z);
grp.add(g);
davTable(grp, x, z, 2.4, 2.4, 0);
var glass = davC(0xE8B0A8, { op: 0.38, ds: 1 }), red = davC(0xA83A3A), blue = davC(0x3A4A8A);
var h = wSph(0.9, glass, 0, 1.95, 0, g, DAV.lite ? 12 : 24);
h.scale.set(1, 1.15, 0.85);
[[-0.32, 2.3, red], [0.32, 2.3, blue], [-0.3, 1.7, red], [0.3, 1.7, blue]].forEach(function (c) { var s = wSph(0.32, c[2], c[0], c[1], 0, g, DAV.lite ? 8 : 14); s.material = c[2]; });
var ao = wCyl(0.14, 0.16, 0.9, red, -0.1, 3, 0, g, 10);
ao.rotation.z = 0.4;
var pu = wCyl(0.13, 0.15, 0.8, blue, 0.25, 2.95, 0, g, 10);
pu.rotation.z = -0.5;
var dots = [];
if (!DAV.lite)
for (var i = 0; i < 14; i++) {
var d = wSph(0.035, davGlowM(0xFFE0C0), 0, 2, 0, g, 5);
dots.push({ m: d, a: i / 14 * 6.28, r: 0.15 + (i % 3) * 0.08 });
}
DAV.fx.push({ k: "heart", g: g, dots: dots, t: 0 });
return g;
},
function (grp, x, z) {
var g = new THREE.Group();
g.position.set(x, 0, z);
grp.add(g);
davTable(grp, x, z, 2.4, 2.4, 0);
var ball = wSph(0.85, davC(0xF0ECE4, { op: 0.55, ds: 1 }), 0, 1.95, 0, g, DAV.lite ? 12 : 24);
var iris = new THREE.Mesh(new THREE.CircleGeometry(0.34, 24), davC(0x4A7A9A));
iris.position.set(0, 1.95, 0.84);
g.add(iris);
var pup = new THREE.Mesh(new THREE.CircleGeometry(0.14, 18), davC(0x0A0A0A));
pup.position.set(0, 1.95, 0.85);
g.add(pup);
var lens = wSph(0.22, davC(0xD8E8F0, { op: 0.6 }), 0, 1.95, 0.55, g, 12);
lens.scale.set(1, 1, 0.5);
var back = new THREE.Mesh(new THREE.CircleGeometry(0.5, 24), new THREE.MeshLambertMaterial({ map: davTinyTreeTex(), side: THREE.DoubleSide }));
back.position.set(0, 1.95, -0.8);
back.rotation.y = Math.PI;
g.add(back);
DAV.fx.push({ k: "pupil", m: pup, t: 0 });
return g;
},
function () {
if (DAV_TTREE)
return DAV_TTREE;
DAV_TTREE = wTex(128, 128, function (x, W, H) {
x.fillStyle = "#8A3A2A";
x.fillRect(0, 0, W, H);
x.translate(W / 2, H / 2);
x.rotate(Math.PI);
x.fillStyle = "#5A3A1A";
x.fillRect(-5, 0, 10, 40);
x.fillStyle = "#4A8A3A";
x.beginPath();
x.arc(0, -6, 28, 0, 7);
x.fill();
x.fillStyle = "#9AC8F0";
x.fillRect(-64, 40, 128, 30);
});
return DAV_TTREE;
},
function (grp, x, z) {
var g = new THREE.Group();
g.position.set(x, 0, z);
grp.add(g);
var bone = davC(0xC8A060, { shine: 40 }), cord = davC(0xA83A2A);
wCyl(0.5, 0.6, 0.4, davSurf("stone", 0xB8A888, 1), 0, 0.2, 0, g, 12);
davSolid({ x: x, z: z, r: 0.7 });
wSph(0.13, bone, 0, 2.05, 0, g, 12);
wCyl(0.035, 0.035, 0.7, bone, 0, 1.55, 0, g, 6);
for (var r = 0; r < 5; r++) {
var rb = new THREE.Mesh(new THREE.TorusGeometry(0.17 - r * 0.01, 0.015, 4, 12, Math.PI * 1.6), bone);
rb.rotation.x = Math.PI / 2;
rb.rotation.z = Math.PI * 0.7;
rb.position.set(0, 1.78 - r * 0.07, 0.02);
g.add(rb);
}
wBox(0.4, 0.04, 0.05, bone, 0, 1.86, 0, g);
wBox(0.28, 0.12, 0.1, bone, 0, 1.18, 0, g);
[-1, 1].forEach(function (s) {
var up = wCyl(0.025, 0.025, 0.32, bone, s * 0.24, 1.68, 0, g, 6);
up.rotation.z = s * 0.2;
var lo = wCyl(0.02, 0.02, 0.3, bone, s * 0.3, 1.38, 0.03, g, 6);
var th = wCyl(0.03, 0.03, 0.45, bone, s * 0.09, 0.92, 0, g, 6);
var sh = wCyl(0.025, 0.025, 0.42, bone, s * 0.1, 0.48, 0, g, 6);
var m1 = wCyl(0.012, 0.012, 0.4, cord, s * 0.13, 0.92, 0.04, g, 4);
m1.rotation.z = -s * 0.08;
var m2 = wCyl(0.012, 0.012, 0.32, cord, s * 0.27, 1.66, 0.04, g, 4);
m2.rotation.z = s * 0.3;
});
g.position.y = 0.4;
},
function (grp, cx, cz, r, y, o) {
o = o || {};
var R = wRand(o.seed || 7), step = o.step || (DAV.lite ? 34 : 26), keep = o.keep || [], n = 0, r0 = o.r0 || 0;
function kept(x, z, hw) { for (var i = 0; i < keep.length; i++) {
var K = keep[i];
if (K.length === 3) {
if (Math.hypot(x - K[0], z - K[1]) < K[2] + hw)
return true;
}
else if (x + hw > K[0] && x - hw < K[2] && z + hw > K[1] && z - hw < K[3])
return true;
} return false; }
for (var gx = cx - r; gx <= cx + r; gx += step)
for (var gz = cz - r; gz <= cz + r; gz += step) {
var d = Math.hypot(gx - cx, gz - cz);
if (d > r - 8 || d < r0)
continue;
if (R() < (o.skip || 0.22))
continue;
var w = 9 + R() * (step - 15), dd = 9 + R() * (step - 15);
if (kept(gx, gz, Math.max(w, dd) / 2 + 3))
continue;
if (davWaterAt(gx, gz) !== null)
continue;
var tx = cx - gx, tz = cz - gz, fx = Math.abs(tx) > Math.abs(tz) ? (tx < 0 ? -1 : 1) : 0, fz = fx ? 0 : (tz < 0 ? -1 : 1);
davBuilding(grp, gx, gz, w, dd, { style: o.style || "house", col: (o.cols || DAV_COLS)[(R() * (o.cols || DAV_COLS).length) | 0], floors: 1 + ((R() * (o.floors || 2)) | 0), shops: R() < (o.shops || 0.4), y: y, chim: R() < 0.5, roofCol: o.roof,
door: { nx: fx, nz: fz, town: o.town } });
n++;
}
return n;
},
function (G) {
var D = new THREE.Group();
D.name = "dav-vinci";
G.add(D);
var T = davT("vinci"), y = T.y, cx = T.x, cz = T.z;
var stone = davSurf("stone", 0xC8B490, 3);
davBoxM(46, 12, 16, stone, cx + 10, y + 6, cz - 30, D);
davBattle(D, cx - 13, cz - 38, cx + 33, cz - 38, y + 12, stone);
davBattle(D, cx - 13, cz - 22, cx + 33, cz - 22, y + 12, stone);
davBoxM(10, 26, 10, stone, cx + 36, y + 13, cz - 30, D);
davBattle(D, cx + 31, cz - 35, cx + 41, cz - 35, y + 26, stone, true);
davBattle(D, cx + 31, cz - 25, cx + 41, cz - 25, y + 26, stone, true);
davSolid({ x: cx + 10, z: cz - 30, hw: 23, hd: 8, h: 14, b: y });
if (typeof evbWorldDoor === "function")
evbWorldDoor(DAV_KEY, cx + 10, cz - 30, 0, 8, "castello", "The castle of the Counts Guidi", { y: y, lx: -8, doors: "the castle gate" });
davSolid({ x: cx + 36, z: cz - 30, hw: 5, hd: 5, h: 28, b: y });
davSign(["THE CASTLE OF THE COUNTS GUIDI", "Vinci · the town Leonardo was named for"], 5, 1.1, cx + 10, y + 4, cz - 21.8, 0, D);
davChurch(D, cx - 40, cz + 10, 30, 13, 11, 0, { tower: true, y: y });
davSpot(cx - 58, cz + 10, 3, "Santa Croce", "look in at the font", function () { davInfo("The font of Santa Croce", "Leonardo was baptised in this little church in April 1452, the day after he was born. His grandfather Antonio wrote it in the family book: 'a grandson was born to me, son of Ser Piero my son, on the 15th day of April, a Saturday, at the third hour of the night. He is named Lionardo.' Ten godparents stood for him."); });
davTownHouses(D, cx, cz, T.r - 10, y, { seed: 52, town: "Vinci", keep: [[cx - 20, cz - 46, cx + 46, cz - 14], [cx - 62, cz - 2, cx - 20, cz + 24], [cx - 10, cz, 22]], floors: 2, shops: 0.3 });
davPaveAt(D, cx, cz, 44, 44, y, 0xC8BCA8);
var px = -2660, pz = -250, py = davLand(px, pz), press = new THREE.Group();
press.position.set(px, py, pz);
D.add(press);
wCyl(1.6, 1.7, 0.8, davSurf("stone", 0xB8A888, 1.5), 0, 0.4, 0, press, DAV.lite ? 10 : 18);
var mill = wCyl(0.9, 0.9, 0.5, davSurf("stone", 0xA89878, 1.5), 0, 1.4, 0, press, DAV.lite ? 10 : 18);
mill.rotation.z = Math.PI / 2;
davRod(press, davC(0x5A3A22), [-2.2, 1.4, 0], [2.2, 1.4, 0], 0.08);
davSolid({ x: px, z: pz, r: 1.8, h: 1.6, b: py });
var ox = -2620, oz = -310, oy = davLand(ox, oz), trunk = wCyl(0.8, 0.95, 0.7, davSurf("bark", 0x8A7A60, 1), ox, oy + 0.35, oz, D, DAV.lite ? 10 : 18);
var rings = new THREE.Mesh(new THREE.CircleGeometry(0.8, DAV.lite ? 16 : 32), new THREE.MeshLambertMaterial({ map: davRingsTex() }));
rings.rotation.x = -Math.PI / 2;
rings.position.set(ox, oy + 0.71, oz);
D.add(rings);
davSolid({ x: ox, z: oz, r: 1, h: 0.8, b: oy });
davSpot(ox, oz + 1.6, 2.6, "A sawn olive trunk", "take the lesson: plants and rings", function () { davLesson("plants"); }, oy);
davPerson("uncle", ox + 3, oz + 2, -0.6, { parent: D, y: oy, wander: { r: 6, sp: 0.6 } });
DAV.districts.push({ g: D, x: cx, z: cz - 60, r: 420, name: "vinci" });
return D;
},
function () {
if (DAV_RINGS)
return DAV_RINGS;
DAV_RINGS = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#D8B888";
x.fillRect(0, 0, W, H);
var R = wRand(9);
for (var r = 4; r < W / 2; r += 3 + R() * 5) {
x.strokeStyle = r % 3 ? "rgba(110,70,30,.55)" : "rgba(80,50,20,.8)";
x.lineWidth = 0.8 + R() * 1.6;
x.beginPath();
x.ellipse(W / 2 + R() * 3, H / 2 + R() * 3, r, r * 0.94, R(), 0, 7);
x.stroke();
}
x.fillStyle = "#6A4422";
x.beginPath();
x.arc(W / 2, H / 2, 3, 0, 7);
x.fill();
});
return DAV_RINGS;
},
function (G) {
var D = new THREE.Group();
D.name = "dav-anchiano";
G.add(D);
var T = davT("anchiano"), y = T.y, cx = T.x, cz = T.z;
var b = davBuilding(D, cx, cz, 18, 9, { style: "house", col: 0xC8B898, floors: 1, shops: false, y: y, rise: 2.4 });
davBuilding(D, cx + 13, cz + 2, 8, 7, { style: "house", col: 0xB8A888, floors: 0, shops: false, y: y, rise: 1.8, door: { nx: 0, nz: 1, theme: "stable", name: "The barn at Anchiano" } });
davSign(["THE HOUSE AT ANCHIANO", "where Leonardo was born, 15 April 1452"], 4.4, 1, cx, y + 3.4, cz + 4.7, 0, D);
davSpot(cx, cz + 6, 3.2, "The farmhouse door", "go in", function () { davEnter("farm"); }, y);
var kx = -2900, kz = -650, ky = davLand(kx, kz), cut = new THREE.Group();
cut.position.set(kx, ky, kz);
D.add(cut);
var face = davBoxM(16, 7, 2.4, new THREE.MeshLambertMaterial({ map: davStrataTex() }), 0, 3.5, 0, cut);
davSolid({ x: kx, z: kz, hw: 8, hd: 1.2, h: 7, b: ky });
for (var s = 0; s < (DAV.lite ? 4 : 9); s++) {
var sh = wSph(0.12, davC(0xE8DCC0), -6 + s * 1.5, 1 + (s % 3) * 1.6, 1.25, cut, 6);
sh.scale.set(1, 0.6, 0.4);
}
davSpot(kx, kz + 2.6, 3, "The cut in the hill", "take the lesson: rocks and shells", function () { davLesson("rocks"); }, ky);
var stone = davSurf("stone", 0xB8A888, 2);
[[cx - 14, cz - 10, cx + 20, cz - 10], [cx - 14, cz + 12, cx + 20, cz + 12], [cx - 14, cz - 10, cx - 14, cz + 12]].forEach(function (w) { var l = Math.hypot(w[2] - w[0], w[3] - w[1]), m = davBoxM(l, 1.1, 0.6, stone, (w[0] + w[2]) / 2, y + 0.55, (w[1] + w[3]) / 2, D); m.rotation.y = -Math.atan2(w[3] - w[1], w[2] - w[0]); davSolid({ x: (w[0] + w[2]) / 2, z: (w[1] + w[3]) / 2, hw: Math.abs(w[2] - w[0]) / 2 + 0.3, hd: Math.abs(w[3] - w[1]) / 2 + 0.3, h: 1.1, b: y }); });
wCyl(0.9, 1, 0.9, stone, cx + 8, y + 0.45, cz + 8, D, DAV.lite ? 8 : 14);
davSolid({ x: cx + 8, z: cz + 8, r: 1, h: 0.9, b: y });
DAV.districts.push({ g: D, x: cx, z: cz, r: 360, name: "anchiano" });
return D;
},
function () {
if (DAV_STRATA)
return DAV_STRATA;
DAV_STRATA = wTex(512, 256, function (x, W, H) {
var cols = ["#C8B088", "#B89870", "#D8C8A0", "#A88A68", "#C8A878", "#E0D0B0", "#9A8060", "#C0A880"], y = 0, R = wRand(31), i = 0;
while (y < H) {
var h = 8 + R() * 30;
x.fillStyle = cols[i % cols.length];
x.beginPath();
x.moveTo(0, y);
for (var px = 0; px <= W; px += 32)
x.lineTo(px, y + Math.sin(px / 90 + i) * 3);
x.lineTo(W, y + h);
x.lineTo(0, y + h);
x.fill();
y += h;
i++;
}
for (var s = 0; s < 40; s++) {
x.fillStyle = "rgba(240,230,210,.8)";
x.beginPath();
x.ellipse(R() * W, R() * H, 3 + R() * 4, 2 + R() * 2, R() * 3, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(60,40,20,.25)";
for (var c = 0; c < 20; c++) {
x.beginPath();
var cx = R() * W;
x.moveTo(cx, 0);
x.lineTo(cx + (R() - 0.5) * 20, H);
x.stroke();
}
});
return DAV_STRATA;
},
function (G) {
var D = new THREE.Group();
D.name = "dav-milan";
G.add(D);
var T = davT("milan"), y = T.y, N = DAV_NAVIGLI;
var brick = davSurf("brick", 0xB87A5A, 2.6), stone = davSurf("stone", 0xD0C4A8, 3);
var C = DAV_ML.castle, s = C.s / 2, wh = 16;
[[C.x - s, C.z - s, C.x + s, C.z - s], [C.x - s, C.z + s, C.x - 8, C.z + s], [C.x + 8, C.z + s, C.x + s, C.z + s], [C.x - s, C.z - s, C.x - s, C.z + s], [C.x + s, C.z - s, C.x + s, C.z + s]].forEach(function (w) {
var l = Math.hypot(w[2] - w[0], w[3] - w[1]), ax = Math.abs(w[2] - w[0]) > Math.abs(w[3] - w[1]);
davBoxM(ax ? l : 4, wh, ax ? 4 : l, brick, (w[0] + w[2]) / 2, y + wh / 2, (w[1] + w[3]) / 2, D);
davBattle(D, w[0], w[1], w[2], w[3], y + wh, brick, true);
davSolid({ x: (w[0] + w[2]) / 2, z: (w[1] + w[3]) / 2, hw: ax ? l / 2 : 2, hd: ax ? 2 : l / 2, h: wh + 3, b: y });
});
[[-1, 1], [1, 1]].forEach(function (k) { var tx = C.x + k[0] * s, tz = C.z + k[1] * s; wCyl(9, 10, wh + 6, stone, tx, y + (wh + 6) / 2, tz, D, DAV.lite ? 12 : 22); davSolid({ x: tx, z: tz, r: 10, h: wh + 8, b: y }); });
[[-1, -1], [1, -1]].forEach(function (k) { var tx = C.x + k[0] * s, tz = C.z + k[1] * s; davBoxM(12, wh + 6, 12, brick, tx, y + (wh + 6) / 2, tz, D); davSolid({ x: tx, z: tz, hw: 6, hd: 6, h: wh + 8, b: y }); });
[-1, 1].forEach(function (k) { davBoxM(4, 32, 10, brick, C.x + k * 5.5, y + 16, C.z + s, D); });
davBoxM(14, 22, 10, brick, C.x, y + 21, C.z + s, D);
davBoxM(9, 10, 7, brick, C.x, y + 37, C.z + s, D);
wCone(5, 9, davRoofMat(0x8A5040), C.x, y + 46.5, C.z + s, D, 4).rotation.y = Math.PI / 4;
davArch(D, C.x, y, C.z + s + 5.1, 0, 7, 10, 0.6, stone);
davSolid({ x: C.x - 6, z: C.z + s, hw: 1.2, hd: 5, h: 30, b: y });
davSolid({ x: C.x + 6, z: C.z + s, hw: 1.2, hd: 5, h: 30, b: y });
davSign(["THE CASTLE OF THE SFORZA", "Ludovico's court · the room of trees · the Great Horse"], 6, 1.2, C.x, y + 12, C.z + s + 5.6, 0, D);
davPaveAt(D, C.x, C.z, C.s - 6, C.s - 6, y, 0xC8B8A0);
var pal = davBuilding(D, C.x, C.z - s + 14, 70, 18, { style: "brick", col: 0xC8906A, floors: 2, shops: false, y: y, rise: 4, solid: true });
davSpot(C.x + 20, C.z - s + 24.6, 3.4, "The ducal apartments", "go in (the Sala delle Asse, Ludovico's court)", function () { davEnter("asse"); }, y);
DAV.horse = davHorse(D, DAV_ML.horse.x, y, DAV_ML.horse.z + 12);
davSpot(DAV_ML.horse.x + 8, DAV_ML.horse.z + 12, 6, "The Great Horse, in clay", "cast it in bronze", function () { davHorseCard(); }, y);
davRiddleSpot(C.x - 30, C.z + s - 4, "milan", 0, y);
var M = DAV_ML.duomo, white = davSurf("marble", 0xC8C2B6, 4), dg = new THREE.Group();
dg.position.set(M.x, y, M.z);
D.add(dg);
davBoxM(100, 32, 46, white, 0, 16, 0, dg);
var rf = new THREE.Mesh(davRoofGeo(100, 46, 8, 0.3), davC(0xBDB6A8));
rf.position.y = 32;
dg.add(rf);
davBoxM(2, 44, 46, white, -51, 22, 0, dg);
for (var i = 0; i < (DAV.lite ? 10 : 22); i++) {
var sx = -48 + (i % 11) * 9.6, sz = i < 11 ? -23.5 : 23.5;
wCyl(0.8, 1, 6, white, sx, 35, sz, dg, 6);
wCone(0.9, 6, white, sx, 41, sz, dg, 6);
}
for (var f = 0; f < 5; f++) {
wCyl(0.7, 0.9, 10, white, -51.2, 44 + (f % 2) * 2, -18 + f * 9, dg, 6);
wCone(0.8, 6, white, -51.2, 52 + (f % 2) * 2, -18 + f * 9, dg, 6);
}
if (!DAV.lite)
for (var a = 0; a < 4; a++)
for (var b2 = 0; b2 < 6; b2++) {
var sc = wBox(0.16, 36, 0.16, davC(0x8A6A42), 20 + (a % 2) * 14, y ? 18 : 18, -12 + b2 * 5, dg);
}
davSolid({ x: M.x, z: M.z, hw: 52, hd: 24, h: 50, b: y });
davSpot(M.x - 56, M.z, 4, "The cathedral of Milan, going up", "look", function () { davInfo("Milan's cathedral, half-built", "Begun in 1386 and still building in Leonardo's day (it took nearly six hundred years to finish). In 1487-90 Leonardo made drawings and a wooden model for its tiburio, the tower over the crossing, studying how the weight of a dome comes down through its arches 'as a man's weight comes down through his legs'. Another design was chosen, but his drawings survive in the Codex Atlanticus."); }, y);
davPaveAt(D, M.x - 10, M.z, 170, 96, y, 0xB4AA98);
var Gz = DAV_ML.grazie, gg = new THREE.Group();
gg.position.set(Gz.x, y, Gz.z);
D.add(gg);
davBoxM(60, 18, 22, brick, 0, 9, 0, gg);
var gr = new THREE.Mesh(davRoofGeo(60, 22, 6, 0.4), davRoofMat());
gr.position.y = 18;
gg.add(gr);
wCyl(15, 15, 14, brick, 34, 25, 0, gg, DAV.lite ? 10 : 16);
wCone(16, 6, davRoofMat(), 34, 35, 0, gg, 16);
wCyl(3, 3, 4, davC(0xE8E0D0), 34, 40, 0, gg, 8);
davBoxM(30, 26, 30, brick, 34, 13, 0, gg);
davSolid({ x: Gz.x + 12, z: Gz.z, hw: 42, hd: 15, h: 42, b: y });
davBuilding(gg, 0, -28, 44, 14, { style: "brick", col: 0xC88A6A, floors: 1, shops: false, rise: 3.4, solid: false });
davSolid({ x: Gz.x, z: Gz.z - 28, hw: 22, hd: 7, h: 16, b: y });
davSign(["SANTA MARIA DELLE GRAZIE", "the refectory: the Last Supper · press E"], 5.6, 1.1, Gz.x - 22.6, y + 4, Gz.z - 28, -Math.PI / 2, D);
davSpot(Gz.x - 25, Gz.z - 28, 3.4, "The refectory door", "go in (the Last Supper)", function () { davEnter("refectory"); }, y);
davTownHouses(D, N.x, N.z, N.r - 14, y, { seed: 1482, town: "Milan", style: "brick", cols: [0xC8906A, 0xD8A880, 0xE0C098, 0xC8A07A, 0xB88060], floors: 3, shops: 0.6,
keep: [[C.x - s - 14, C.z - s - 14, C.x + s + 14, C.z + s + 20], [M.x - 80, M.z - 52, M.x + 76, M.z + 52], [DAV_ML.horse.x - 10, DAV_ML.horse.z - 10, DAV_ML.horse.x + 10, DAV_ML.horse.z + 30]] });
davTownHouses(D, N.x, N.z, T.r, y, { seed: 1499, town: "Milan", r0: N.r + 16, style: "brick", cols: [0xC8906A, 0xD8A880, 0xE0C098], floors: 2, skip: 0.55,
keep: [[Gz.x - 50, Gz.z - 50, Gz.x + 60, Gz.z + 30], [100, -3360, 220, -3300]] });
for (var q = 0; q < 6; q++) {
var aq = q / 6 * Math.PI * 2 + 0.25, bx = N.x + Math.cos(aq) * N.r, bz = N.z + Math.sin(aq) * N.r, br = new THREE.Group();
br.position.set(bx, y, bz);
br.rotation.y = -aq;
D.add(br);
davBoxM(22, 0.6, 6, stone, 0, -0.3, 0, br);
[-1, 1].forEach(function (k) { davBoxM(22, 1, 0.4, stone, 0, 0.5, k * 2.9, br); });
davFloor(bx, bz, 0, 0, y, { r: 10 });
}
var la = Math.atan2(-3681 - N.z, 397 - N.x), lx = N.x + Math.cos(la) * N.r, lz = N.z + Math.sin(la) * N.r;
DAV_ML.lock = { x: lx, z: lz };
var lk = new THREE.Group();
lk.position.set(lx, N.y - 1, lz);
lk.rotation.y = -la;
D.add(lk);
var oak = davSurf("wood", 0x6A4A2A, 1);
[-1, 1].forEach(function (k) { var leaf = davBoxM(0.5, 4, 8.4, oak, 0, 2, k * 3.6, lk); leaf.rotation.x = 0; leaf.rotation.y = k * 0.38; var pad = wBox(0.6, 0.6, 0.6, davC(0x4A4A50), 0, 3.6, k * 7, lk); });
wBox(14, 1, 1.2, stone, 0, 3.4, 9, lk);
wBox(14, 1, 1.2, stone, 0, 3.4, -9, lk);
davSpot(lx - Math.cos(la) * 12, lz - Math.sin(la) * 12, 4, "Leonardo's lock gates", "take the lesson: the lock gates", function () { davLesson("locks"); }, y);
davRiddleSpot(lx - Math.cos(la) * 16, lz - Math.sin(la) * 16 + 4, "milan", 1, y);
DAV.districts.push({ g: D, x: N.x, z: N.z, r: 900, name: "milan" });
return D;
},
function (par, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = -Math.PI / 2;
par.add(g);
g.userData.keep = 1;
var clay = davSurf("plaster", 0xB89878, 1.4), seg = DAV.lite ? 10 : 18;
wBox(9, 1.6, 4, davSurf("stone", 0xC0B49C, 2), 0, 0.8, 0, g);
var body = wSph(1.7, clay, 0, 5, 0, g, seg);
body.scale.set(2.1, 1.1, 1);
var chest = wSph(1.5, clay, 2.6, 5.2, 0, g, seg);
var rump = wSph(1.55, clay, -2.5, 5.2, 0, g, seg);
var neck = wCyl(0.9, 1.3, 3.2, clay, 3.6, 7, 0, g, seg);
neck.rotation.z = -0.65;
var head = wCyl(0.5, 0.7, 2.4, clay, 5.2, 8.2, 0, g, seg);
head.rotation.z = -2.0;
wSph(0.55, clay, 4.6, 8.8, 0, g, seg);
[[2.4, 0.55], [2.4, -0.55], [-2.4, 0.55], [-2.4, -0.55]].forEach(function (p, i) { var up = i === 0, l = wCyl(0.32, 0.42, 3.6, clay, p[0] + (up ? 0.4 : 0), up ? 3.6 : 3.4, p[1], g, DAV.lite ? 8 : 12); if (up) {
l.rotation.z = -0.7;
l.position.y = 3.9;
} });
var tail = wCyl(0.12, 0.35, 3, clay, -4.2, 4.6, 0, g, 8);
tail.rotation.z = 0.4;
davSolid({ x: x, z: z, hw: 2.2, hd: 4.6, h: 10, b: y });
return { g: g, mats: [clay] };
},
function (G) {
var D = new THREE.Group();
D.name = "dav-amboise";
G.add(D);
var T = davT("amboise"), y = T.y, CH = davT("chateau"), cy = CH.y;
var tuffeau = davSurf("stone", 0xEDE6D6, 3), slate = davSurf("slate", 0x5A6068, 2);
var cg = new THREE.Group();
cg.position.set(CH.x, cy, CH.z);
D.add(cg);
var wing = davBuilding(cg, 0, -10, 64, 16, { style: "french", col: 0xEDE6D6, floors: 3, shops: false, rise: 11, roofCol: 0x5A6068, solid: false });
if (!DAV.lite)
for (var d = 0; d < 6; d++) {
var dm = davBoxM(2.4, 3, 1.4, tuffeau, -25 + d * 10, wing.h + 2, -1.6, cg);
wCone(1.8, 2.6, davC(0x5A6068), -25 + d * 10, wing.h + 4.8, -1.6, cg, 4).rotation.y = Math.PI / 4;
}
wCyl(12, 12, 28, tuffeau, 36, 14, 8, cg, DAV.lite ? 14 : 24);
var tr = wCone(13, 10, davC(0x5A6068), 36, 33, 8, cg, DAV.lite ? 14 : 24);
var chp = new THREE.Group();
chp.position.set(-26, 0, 22);
cg.add(chp);
davBoxM(16, 10, 8, tuffeau, 0, 5, 0, chp);
var cr = wCone(7, 12, davC(0x5A6068), 0, 16, 0, chp, 4);
cr.rotation.y = Math.PI / 4;
cr.scale.z = 0.6;
wCyl(0.6, 0.1, 8, davC(0x5A6068), 0, 22, 0, chp, 6);
davSolid({ x: CH.x, z: CH.z - 10, hw: 32, hd: 8, h: 40, b: cy });
davSolid({ x: CH.x + 36, z: CH.z + 8, r: 12, h: 40, b: cy });
davSolid({ x: CH.x - 26, z: CH.z + 22, hw: 8, hd: 4, h: 20, b: cy });
davBattle(D, CH.x - 50, CH.z + 40, CH.x + 50, CH.z + 40, cy - 1, tuffeau);
davSpot(CH.x - 26, CH.z + 27, 3, "The chapel of Saint-Hubert", "look in", function () { davInfo("The chapel of Saint-Hubert", "Leonardo died at Clos Lucé on 2 May 1519, at sixty-seven. He was buried at Amboise, and his bones were later laid in this little chapel on the castle's rampart. Melzi wrote to Leonardo's brothers: 'He was like an excellent father to me. As long as I have breath I shall feel the sorrow of it.'"); }, cy);
davSpot(CH.x + 4, CH.z - 1, 3.4, "The castle's great door", "go in (the King's hall)", function () { davEnter("chateau"); }, cy);
davSign(["THE ROYAL CASTLE OF AMBOISE", "the court of King Francis I"], 5.6, 1.1, CH.x + 4, cy + 4, CH.z - 1.6, 0, D);
davPaveAt(D, CH.x, CH.z + 16, 96, 44, cy, 0xD8D0C0);
var K = DAV_AM.closluce, ky = davLand(K.x, K.z);
var man = davBuilding(D, K.x, K.z, 30, 13, { style: "brick", col: 0xB8644A, floors: 1, shops: false, y: ky, rise: 7, roofCol: 0x5A6068 });
wCyl(3.4, 3.4, 13, davSurf("stone", 0xE8E0D0, 2), K.x + 9, ky + 6.5, K.z + 7.6, D, 8);
wCone(4, 6, davC(0x5A6068), K.x + 9, ky + 16, K.z + 7.6, D, 8);
davSolid({ x: K.x + 9, z: K.z + 7.6, r: 3.6, h: 20, b: ky });
davSign(["CLOS LUCÉ", "where Leonardo lived his last three years"], 4.6, 1, K.x, ky + 3.6, K.z + 6.6, 0, D);
davSpot(K.x - 4, K.z + 8, 3, "The manor's door", "go in", function () { davEnter("closluce"); }, ky);
var bed = davC(0x4A6A2A), soil = davC(0x6A4A2A);
for (var bx = 0; bx < 4; bx++)
for (var bz = 0; bz < 2; bz++) {
var gx = K.x - 18 + bx * 10, gz = K.z + 20 + bz * 8;
davBoxM(7, 0.4, 5, soil, gx, ky + 0.2, gz, D);
if (!DAV.lite)
for (var p = 0; p < 6; p++)
wSph(0.45, bed, gx - 2.5 + p, ky + 0.7, gz + ((p % 2) - 0.5) * 2, D, 5);
}
davPerson("francis", K.x + 6, K.z + 26, Math.PI, { parent: D, y: ky, wander: { r: 8, sp: 0.5 } });
davRiddleSpot(K.x - 14, K.z + 14, "amboise", 1, ky);
davTownHouses(D, T.x, T.z, T.r, y, { seed: 1516, town: "Amboise", style: "french", cols: [0xCFC6B2, 0xC4BAA4, 0xBCAE96], floors: 2, roof: 0x5A6068,
keep: [[CH.x, CH.z, CH.r + 26], [K.x, K.z, 40], [-3720, -2440, -3680, -2400]] });
DAV.districts.push({ g: D, x: T.x, z: T.z, r: 700, name: "amboise" });
return D;
},
function (G) {
var D = new THREE.Group();
D.name = "dav-imola";
G.add(D);
var T = davT("imola"), y = T.y, cx = T.x, cz = T.z, Rw = 165;
var brick = davSurf("brick", 0xB8785A, 2.6), n = DAV.lite ? 48 : 96;
for (var i = 0; i < n; i++) {
var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, am = (a0 + a1) / 2;
if ([0, Math.PI / 2, Math.PI, Math.PI * 1.5].some(function (g) { return Math.abs(Math.atan2(Math.sin(am - g), Math.cos(am - g))) < 0.05; }))
continue;
var x0 = cx + Math.cos(a0) * Rw, z0 = cz + Math.sin(a0) * Rw, x1 = cx + Math.cos(a1) * Rw, z1 = cz + Math.sin(a1) * Rw, xm = (x0 + x1) / 2, zm = (z0 + z1) / 2, l = Math.hypot(x1 - x0, z1 - z0);
var w = davBoxM(l + 0.4, 9, 2.4, brick, xm, y + 4.5, zm, D);
w.rotation.y = -Math.atan2(z1 - z0, x1 - x0);
davSolid({ x: xm, z: zm, hw: l / 2 + 0.2, hd: 1.3, rot: -Math.atan2(z1 - z0, x1 - x0), h: 10, b: y });
if (i % (DAV.lite ? 6 : 12) === 0) {
wCyl(4, 4.4, 12, brick, xm, y + 6, zm, D, DAV.lite ? 8 : 14);
davSolid({ x: xm, z: zm, r: 4.4, h: 12, b: y });
}
}
[0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(function (g) {
var gx = cx + Math.cos(g) * Rw, gz = cz + Math.sin(g) * Rw, gg = new THREE.Group();
gg.position.set(gx, y, gz);
gg.rotation.y = -g + Math.PI / 2;
D.add(gg);
[-1, 1].forEach(function (k) { davBoxM(4, 14, 6, brick, k * 5, 7, 0, gg); });
davBoxM(14, 4, 6, brick, 0, 12, 0, gg);
davArch(gg, 0, 0, 3.05, 0, 6, 10, 0.5, brick);
var c = Math.cos(-g + Math.PI / 2), s = Math.sin(-g + Math.PI / 2);
[-1, 1].forEach(function (k) { davSolid({ x: gx + k * 5 * c, z: gz - k * 5 * s, r: 3.2, h: 14, b: y }); });
});
var rx = cx - 90, rz = cz + 70, rs = 26;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { wCyl(6, 6.6, 16, brick, rx + k[0] * rs, y + 8, rz + k[1] * rs, D, DAV.lite ? 10 : 16); davSolid({ x: rx + k[0] * rs, z: rz + k[1] * rs, r: 6.6, h: 16, b: y }); });
[[rx - rs, rz - rs, rx + rs, rz - rs], [rx - rs, rz + rs, rx + rs, rz + rs], [rx - rs, rz - rs, rx - rs, rz + rs], [rx + rs, rz - rs, rx + rs, rz + rs]].forEach(function (w) {
var ax = w[1] === w[3], l = ax ? w[2] - w[0] : w[3] - w[1];
davBoxM(ax ? l : 3, 12, ax ? 3 : l, brick, (w[0] + w[2]) / 2, y + 6, (w[1] + w[3]) / 2, D);
davBattle(D, w[0], w[1], w[2], w[3], y + 12, brick, true);
davSolid({ x: (w[0] + w[2]) / 2, z: (w[1] + w[3]) / 2, hw: ax ? l / 2 : 1.5, hd: ax ? 1.5 : l / 2, h: 14, b: y });
});
davBoxM(14, 24, 14, brick, rx, y + 12, rz, D);
davSolid({ x: rx, z: rz, hw: 7, hd: 7, h: 24, b: y });
davSpot(rx + rs + 3, rz, 3.4, "The Rocca of Imola", "go in (the map room)", function () { davEnter("rocca"); }, y);
davPaveAt(D, cx, cz, 60, 50, y, 0xC8B8A0);
var st = wCyl(0.5, 0.6, 1, davSurf("stone", 0xC8C0B0, 1.5), cx - 20, y + 0.5, cz + 40, D, 8);
davSolid({ x: cx - 20, z: cz + 40, r: 0.7, h: 1, b: y });
davPerson("borgia", cx + 8, cz - 6, Math.PI, { parent: D, y: y });
davPerson("machiavelli", cx - 8, cz + 4, 0.4, { parent: D, y: y, wander: { r: 10, sp: 0.7 } });
davFolk(D, 95, cx + 14, cz + 10, { y: y, still: true, name: "A captain of Borgia's guard", say: "A hard-faced captain of Cesare Borgia's guard in Imola, 1502. Curt but fair; he warns travellers that the country outside the walls is full of mercenaries, deserters, wolves and boar, and that the Duke's engineer (Leonardo) has been out there measuring the walls with a wheel.", greet: "Inside these walls you're safe. Outside them, keep your sword loose and your purse close." });
davTownHouses(D, cx, cz, Rw - 8, y, { seed: 1502, town: "Imola", style: "brick", cols: [0xC8906A, 0xD8A880, 0xC8A07A], floors: 2, shops: 0.4, keep: [[cx - 34, cz - 30, cx + 34, cz + 30], [rx - rs - 10, rz - rs - 10, rx + rs + 10, rz + rs + 10]] });
DAV.districts.push({ g: D, x: cx, z: cz, r: 600, name: "imola" });
davRomagna(G);
return D;
},
function (G) {
var D = new THREE.Group();
D.name = "dav-romagna";
G.add(D);
var can = [davC(0xD8C8A0, { ds: 1 }), davC(0xA83A2A, { ds: 1 }), davC(0xC8B888, { ds: 1 })], R = wRand(1502);
DAV_CAMPS.forEach(function (P, ci) {
var y = davLand(P[0], P[1]);
for (var t = 0; t < (DAV.lite ? 3 : 6); t++) {
var a = t / 6 * Math.PI * 2, tx = P[0] + Math.cos(a) * 16, tz = P[1] + Math.sin(a) * 16, ty = davLand(tx, tz);
var tent = wCone(3.4, 4.4, can[(t + ci) % 3], tx, ty + 2.2, tz, D, DAV.lite ? 6 : 10);
davSolid({ x: tx, z: tz, r: 3, h: 4, b: ty });
if (!DAV.lite)
wCyl(0.06, 0.06, 5.2, davC(0x5A3A22), tx, ty + 2.6, tz, D, 4);
}
wCyl(1, 1.2, 0.3, davSurf("stone", 0x6A6058, 1), P[0], y + 0.15, P[1], D, 10);
var fire = wGlow(0xFF9A50, 3.2, 0.45);
fire.position.set(P[0], y + 0.9, P[1]);
D.add(fire);
var flag = wBox(0.06, 1.4, 2.2, davC(0xC8A040), P[0] + 6, y + 6, P[1], D);
wCyl(0.08, 0.08, 7, davC(0x4A3422), P[0] + 6, y + 3.5, P[1] - 1.1, D, 5);
});
[[2500, -900], [3700, 200], [4300, -700], [2900, 300]].forEach(function (P, i) {
var y = davLand(P[0], P[1]), h = 8 + i * 3;
davBoxM(7, h, 7, davSurf("stone", 0xA89880, 2), P[0], y + h / 2, P[1], D);
for (var k = 0; k < 4; k++)
wBox(1.4, 1 + R() * 2.4, 1.4, davSurf("stone", 0xA89880, 2), P[0] - 3 + (k % 2) * 6, y + h + 0.6, P[1] - 3 + (k >> 1) * 6, D);
for (var r = 0; r < 8; r++)
wBox(1 + R(), 0.6 + R() * 0.6, 1 + R(), davSurf("stone", 0x9A8A70, 2), P[0] + (R() - 0.5) * 16, y + 0.3, P[1] + (R() - 0.5) * 16, D);
davSolid({ x: P[0], z: P[1], hw: 3.5, hd: 3.5, h: h + 3, b: y });
});
var fx = 3200, fz = -1500, fy = davLand(fx, fz);
davBoxM(14, 3, 8, davSurf("stone", 0x6A5A4A, 2), fx, fy + 1.5, fz, D);
for (var b = 0; b < 6; b++) {
var bm = wBox(0.3, 0.3, 9, davC(0x2A2420), fx - 6 + b * 2.4, fy + 3.2, fz, D);
bm.rotation.z = (R() - 0.5) * 0.4;
}
davSolid({ x: fx, z: fz, hw: 7, hd: 4, h: 4, b: fy });
DAV.districts.push({ g: D, x: 3400, z: -600, r: 1700, name: "romagna" });
return D;
},
function (G) {
var D = new THREE.Group();
D.name = "dav-coaches";
G.add(D);
DAV_COACH.forEach(function (S, i) {
var y = davLand(S[2], S[3]), g = new THREE.Group();
g.position.set(S[2], y, S[3]);
g.rotation.y = i * 1.3;
D.add(g);
g.userData.keep = 1;
davBoxM(2.2, 1.8, 3.6, davSurf("wood", 0x6A3A22, 1), 0, 1.7, 0, g);
var rf = wBox(2.4, 0.2, 3.8, davC(0x2A2420), 0, 2.7, 0, g);
[[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]].forEach(function (p) { var w = wCyl(0.7, 0.7, 0.12, davC(0x3A2A1A), p[0], 0.7, p[1], g, DAV.lite ? 8 : 14); w.rotation.z = Math.PI / 2; });
[-0.7, 0.7].forEach(function (k) {
var hb = wSph(0.55, davC(0x6A4A30), k, 1.5, -4, g, 8);
hb.scale.set(0.8, 0.9, 1.7);
var hh = wCyl(0.18, 0.26, 1, davC(0x6A4A30), k, 2.1, -5, g, 6);
hh.rotation.x = 0.6;
[[-0.2, -3.4], [0.2, -3.4], [-0.2, -4.6], [0.2, -4.6]].forEach(function (l) { wCyl(0.08, 0.07, 1.2, davC(0x5A3A24), k + l[0], 0.6, l[1], g, 5); });
});
var c = Math.cos(i * 1.3), s = Math.sin(i * 1.3);
davSolid({ x: S[2], z: S[3], r: 2.4, h: 3, b: y });
davSign(["THE POST COACH", S[1]], 3, 0.8, S[2] + c * 3.6, y + 2.6, S[3] - s * 3.6, i * 1.3 + Math.PI / 2, D);
davSpot(S[2] + c * 3.2, S[3] - s * 3.2, 3.6, "The post coach (" + S[1] + ")", "ride it to another town", function () { davCoachCard(S[0]); }, y);
});
return D;
},
function (from) {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🐎 The post coach</div><div style='opacity:.85;margin:4px 0 8px'>Fresh horses at every stage. Where to?</div>", fns = {};
DAV_COACH.forEach(function (S) { if (S[0] === from)
return; h += worldBtn("c" + S[0], S[1], ""); fns["c" + S[0]] = function () { davCoachGo(S[0]); }; });
worldCard(h, fns);
},
function (G) {
var D = davData();
DAV.pageMesh = {};
DAV_PAGES_OUT.forEach(function (P, i) {
if (D.pages && D.pages["o" + i])
return;
var y = davGround(P[2], P[3], 1e4), m = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.56), new THREE.MeshLambertMaterial({ map: davPageTex(), side: THREE.DoubleSide }));
m.rotation.x = -Math.PI / 2;
m.rotation.z = i;
m.position.set(P[2], y + 0.12, P[3]);
G.add(m);
m.userData.keep = 1;
DAV.pageMesh[i] = m;
var gl = wGlow(0xFFE8B0, 1.2, 0.25);
gl.position.set(P[2], y + 0.4, P[3]);
G.add(gl);
m.userData.glow = gl;
davSpot(P[2], P[3], 2, "A page of a notebook", "pick it up (" + P[4] + ")", function () { davPagePick(i); }, y);
});
},
function () {
if (DAV_PAGE)
return DAV_PAGE;
DAV_PAGE = wTex(128, 170, function (x, W, H) {
x.fillStyle = "#E8DCB8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(90,60,30,.7)";
x.lineWidth = 1;
var R = wRand(3);
for (var l = 0; l < 12; l++) {
x.beginPath();
var y = 14 + l * 11, px = W - 10;
x.moveTo(px, y);
while (px > 14) {
px -= 3 + R() * 5;
x.lineTo(px, y + (R() - 0.5) * 3);
}
x.stroke();
}
x.strokeStyle = "rgba(90,60,30,.6)";
x.beginPath();
x.arc(W * 0.3, H * 0.75, 16, 0, 7);
x.moveTo(W * 0.3 - 20, H * 0.75);
x.lineTo(W * 0.3 + 30, H * 0.7);
x.stroke();
});
return DAV_PAGE;
},
function () {
if (DAV_ASSE)
return DAV_ASSE;
var S = DAV.lite ? 256 : 512;
DAV_ASSE = wTex(S, S, function (x, W, H) {
x.fillStyle = "#6A8A5A";
x.fillRect(0, 0, W, H);
var R = wRand(1498);
for (var b = 0; b < 26; b++) {
x.strokeStyle = "rgba(70,50,30,.75)";
x.lineWidth = 2 + R() * 4;
x.beginPath();
var px = R() * W, py = R() * H;
x.moveTo(px, py);
for (var s = 0; s < 5; s++) {
px += (R() - 0.5) * W * 0.3;
py += (R() - 0.5) * H * 0.3;
x.quadraticCurveTo(px + (R() - 0.5) * 40, py + (R() - 0.5) * 40, px, py);
}
x.stroke();
}
for (var l = 0; l < (DAV.lite ? 600 : 1800); l++) {
var lx = R() * W, ly = R() * H;
x.fillStyle = ["#3A6A2A", "#4A7A3A", "#2A5A2A", "#5A8A42"][(R() * 4) | 0];
x.beginPath();
x.ellipse(lx, ly, 3 + R() * 3, 1.5 + R() * 1.5, R() * 3, 0, 7);
x.fill();
}
x.strokeStyle = "#D8B048";
x.lineWidth = 2.2;
for (var k = 0; k < 4; k++) {
var cx = W * (0.25 + (k % 2) * 0.5), cy = H * (0.25 + (k >> 1) * 0.5);
for (var r = 0; r < 4; r++) {
x.beginPath();
x.ellipse(cx, cy, W * 0.12, W * 0.05, r * Math.PI / 4, 0, 7);
x.stroke();
}
}
x.beginPath();
x.arc(W / 2, H / 2, W * 0.08, 0, 7);
x.stroke();
});
DAV_ASSE.wrapS = DAV_ASSE.wrapT = THREE.RepeatWrapping;
return DAV_ASSE;
},
function (grp, I) {
var X = I.x, Z = I.z, tex = davAsseTex(), bower = new THREE.MeshLambertMaterial({ map: tex }), fl = davSurf("floortile", 0xB8907A, 1.4);
davRoomShell(grp, X - 8, Z, 24, 24, 11, { wall: bower, floor: fl, ceil: 0x6A8A5A, gaps: { w: [[10, 14]], e: [[10, 14]], n: [], s: [] }, lamps: true });
var ceil = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), bower);
ceil.rotation.x = Math.PI / 2;
ceil.position.set(X - 8, 10.9, Z);
grp.add(ceil);
davSpot(X - 19, Z, 2.6, "The door", "go back out to the court", function () { davLeave("asse"); });
davSpot(X - 8, Z, 3, "Under the bower of trees", "look up", function () { davInfo("The Sala delle Asse", "Painted in 1498 for Ludovico Sforza: mulberry trees (the 'Moro' was Ludovico's nickname, and the mulberry is 'moro' in Italian) whose branches weave a roof, tied with a gold cord in knots that never end. Leonardo loved such knots: he drew them as puzzles, and some say they play on his name, Vinci, and 'vincire', to bind. On one wall he drew roots splitting the rocks, as if the trees were alive under the castle."); });
davRoomShell(grp, X + 22, Z, 36, 28, 12, { wall: davSurf("plaster", 0xE8D8B8, 3), floor: davSurf("marble", 0xE8E0D0, 2), ceil: 0x5A3A2A, gaps: { w: [[12, 16]], e: [], n: [], s: [] } });
var dais = davBoxM(8, 0.5, 6, davSurf("wood", 0x6A3A22, 1), X + 36, 0.25, Z, grp);
davFloor(X + 36, Z, 4, 3, 0.5, { inside: 1 });
var thr = wBox(1.6, 2.4, 1, davC(0x8A2A2A), X + 38, 1.7, Z, grp);
davSolid({ x: X + 38, z: Z, hw: 0.8, hd: 0.8, h: 3 });
davPerson("ludovico", X + 36, Z, -Math.PI / 2, { parent: grp, y: 0.5 });
var cp = davPerson("cecilia", X + 24, Z - 8, 0.4, { parent: grp, wander: { r: 3, sp: 0.4 } });
var erm = wSph(0.16, davC(0xF4F2EC), 0.25, 1.15, -0.25, cp.g, 8);
erm.scale.set(0.7, 0.7, 1.6);
davPerson("pacioli", X + 16, Z + 8, Math.PI * 0.8, { parent: grp });
davTable(grp, X + 18, Z + 10, 3, 1.4, 0);
[["Icosahedron", new THREE.IcosahedronGeometry(0.32)], ["Dodecahedron", new THREE.DodecahedronGeometry(0.32)], ["Octahedron", new THREE.OctahedronGeometry(0.32)]].forEach(function (P, i) {
var m = new THREE.LineSegments(new THREE.EdgesGeometry(P[1]), new THREE.LineBasicMaterial({ color: 0x6A4A2A }));
m.position.set(X + 17 + i, 1.3, Z + 10);
grp.add(m);
m.userData.keep = 1;
DAV.fx.push({ k: "spin", m: m, sp: 0.3 + i * 0.1 });
});
davSpot(X + 18, Z + 8.4, 2.4, "Pacioli's solids", "look", function () { davInfo("The Divine Proportion", "Luca Pacioli, the mathematician, taught Leonardo geometry in Milan; Leonardo drew the sixty solids for Pacioli's book 'On the Divine Proportion' (1498): each one solid, and each one hollow, its edges only, like these, made of wood. They were the first drawings of their kind ever printed. 'Let no one who is not a mathematician read my principles.'"); });
},
function () {
if (DAV_SUPPER)
return DAV_SUPPER;
var W0 = DAV.lite ? 512 : 1024;
DAV_SUPPER = wTex(W0, W0 / 2, function (x, W, H) {
var vx = W / 2, vy = H * 0.36;
x.fillStyle = "#7A6A52";
x.fillRect(0, 0, W, H);
x.fillStyle = "#5A4E3E";
x.beginPath();
x.moveTo(0, 0);
x.lineTo(W, 0);
x.lineTo(W * 0.66, H * 0.16);
x.lineTo(W * 0.34, H * 0.16);
x.fill();
x.strokeStyle = "rgba(40,30,20,.5)";
x.lineWidth = 1;
for (var c = 0; c <= 10; c++) {
x.beginPath();
x.moveTo(c * W / 10, 0);
x.lineTo(W * 0.34 + c * W * 0.032, H * 0.16);
x.stroke();
}
[[0, W * 0.34], [W, W * 0.66]].forEach(function (s) {
x.fillStyle = "#6A5C48";
x.beginPath();
x.moveTo(s[0], 0);
x.lineTo(s[1], H * 0.16);
x.lineTo(s[1], H * 0.62);
x.lineTo(s[0], H);
x.fill();
for (var t = 0; t < 4; t++) {
var a = 0.15 + t * 0.2, b = a + 0.1, xa = s[0] + (s[1] - s[0]) * a, xb = s[0] + (s[1] - s[0]) * b;
x.fillStyle = "#3A3428";
x.beginPath();
x.moveTo(xa, H * 0.16 * a + H * 0.1);
x.lineTo(xb, H * 0.16 * b + H * 0.1);
x.lineTo(xb, H * (0.62 + (1 - b) * 0.38) - H * 0.12);
x.lineTo(xa, H * (0.62 + (1 - a) * 0.38) - H * 0.12);
x.fill();
}
});
x.fillStyle = "#6E604A";
x.fillRect(W * 0.34, H * 0.16, W * 0.32, H * 0.46);
[0.38, 0.5, 0.62].forEach(function (f, i) {
var ww = i === 1 ? W * 0.075 : W * 0.05, wh = i === 1 ? H * 0.2 : H * 0.16, wx = W * f - ww / 2, wy = H * 0.2;
var g = x.createLinearGradient(0, wy, 0, wy + wh);
g.addColorStop(0, "#C8D8E0");
g.addColorStop(1, "#E8E4D0");
x.fillStyle = g;
x.fillRect(wx, wy, ww, wh);
x.fillStyle = "#9AAAB8";
x.beginPath();
x.moveTo(wx, wy + wh * 0.8);
x.quadraticCurveTo(wx + ww * 0.5, wy + wh * 0.55, wx + ww, wy + wh * 0.75);
x.lineTo(wx + ww, wy + wh);
x.lineTo(wx, wy + wh);
x.fill();
if (i === 1) {
x.strokeStyle = "#5A4E3E";
x.lineWidth = 3;
x.beginPath();
x.arc(W / 2, wy, ww * 0.5, Math.PI, 0);
x.stroke();
}
});
x.fillStyle = "#E8E2D0";
x.fillRect(W * 0.06, H * 0.58, W * 0.88, H * 0.2);
x.fillStyle = "#D8D0BC";
x.fillRect(W * 0.06, H * 0.72, W * 0.88, H * 0.06);
x.strokeStyle = "rgba(120,110,90,.4)";
for (var f = 0; f < 30; f++) {
x.beginPath();
x.moveTo(W * 0.06 + f * W * 0.03, H * 0.72);
x.lineTo(W * 0.06 + f * W * 0.03, H * 0.78);
x.stroke();
}
x.fillStyle = "#4A3A2A";
x.fillRect(W * 0.08, H * 0.78, W * 0.84, H * 0.22);
var robes = [["#8A5A3A", "#3A4A6A"], ["#6A6A3A", "#A84A3A"], ["#3A5A4A", "#C8A050"], ["#7A3A3A", "#4A6A5A"], ["#C88A5A", "#3A3A5A"], ["#5A6A7A", "#8A4A3A"],
["#A83A2A", "#2A4A8A"],
["#4A6A3A", "#B8783A"], ["#6A4A6A", "#4A5A3A"], ["#3A4A6A", "#C8A880"], ["#8A6A3A", "#5A3A3A"], ["#5A7A6A", "#A86A4A"], ["#7A5A3A", "#3A5A7A"]];
var pos = [0.1, 0.16, 0.22, 0.3, 0.36, 0.42, 0.5, 0.58, 0.64, 0.7, 0.78, 0.84, 0.9], lean = [0.02, 0, -0.03, 0.03, -0.04, 0.05, 0, -0.04, 0.03, -0.02, 0.03, 0, -0.02];
pos.forEach(function (p, i) {
var cx = W * p, mid = i === 6, hy = H * (mid ? 0.44 : 0.45 + (i % 3 === 1 ? -0.02 : 0.01)), r = W * (mid ? 0.022 : 0.019), tilt = lean[i] * W;
x.fillStyle = robes[i][0];
x.beginPath();
x.moveTo(cx - r * 2.3 + tilt * 0.3, H * 0.6);
x.quadraticCurveTo(cx - r * 2 + tilt, hy + r * 1.4, cx + tilt, hy + r);
x.quadraticCurveTo(cx + r * 2 + tilt, hy + r * 1.4, cx + r * 2.3 + tilt * 0.3, H * 0.6);
x.fill();
x.fillStyle = robes[i][1];
x.beginPath();
x.moveTo(cx - r * 2.3 + tilt * 0.3, H * 0.6);
x.quadraticCurveTo(cx - r * 1.6 + tilt, hy + r * 2.2, cx - r * 0.4 + tilt, hy + r * 1.4);
x.lineTo(cx - r * 0.6 + tilt * 0.3, H * 0.6);
x.fill();
x.fillStyle = "#C8A07A";
x.beginPath();
x.ellipse(cx + tilt, hy, r * 0.8, r, 0, 0, 7);
x.fill();
x.fillStyle = ["#3A2A1A", "#6A4A2A", "#8A8070", "#2A1E14"][i % 4];
x.beginPath();
x.ellipse(cx + tilt, hy - r * 0.45, r * 0.85, r * 0.6, 0, Math.PI, 0);
x.fill();
x.fillStyle = "#C8A07A";
[-1, 1].forEach(function (s) { x.beginPath(); x.ellipse(cx + s * r * 1.6 + tilt * 0.5, H * (mid ? 0.6 : 0.58 + ((i + s) % 2) * 0.03), r * 0.4, r * 0.28, 0, 0, 7); x.fill(); });
});
x.fillStyle = "#E8DCC0";
for (var b = 0; b < 18; b++) {
x.beginPath();
x.ellipse(W * (0.1 + b * 0.046), H * 0.64, W * 0.008, H * 0.008, 0, 0, 7);
x.fill();
}
var R = wRand(1498);
for (var d = 0; d < (DAV.lite ? 300 : 1200); d++) {
x.fillStyle = "rgba(150,140,120," + (0.08 + R() * 0.18) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 4, 1 + R() * 3);
}
x.fillStyle = "rgba(90,80,60,.12)";
x.fillRect(0, 0, W, H);
});
return DAV_SUPPER;
},
function (grp, I) {
var X = I.x, Z = I.z, pl = davSurf("plaster", 0xE8DCC4, 3), fl = davSurf("floortile", 0xB88A6A, 1.4);
davRoomShell(grp, X, Z, 52, 10, 11, { wall: pl, floor: fl, ceil: 0x8A7A62, gaps: { w: [[3, 7]], e: [], n: [], s: [] }, lamps: true });
davSpot(X - 25, Z, 2.6, "The door", "go back out", function () { davLeave("refectory"); });
var sup = new THREE.Mesh(new THREE.PlaneGeometry(9, 4.5), new THREE.MeshLambertMaterial({ map: davSupperTex() }));
sup.position.set(X + 25.7, 6.4, Z);
sup.rotation.y = -Math.PI / 2;
grp.add(sup);
for (var t = 0; t < 2; t++)
[-1, 1].forEach(function (s) { davTable(grp, X - 14 + t * 18, Z + s * 3.4, 12, 1.2, 0); });
davSpot(X + 21, Z, 3.4, "The Last Supper", "look", function () { davInfo("The Last Supper", "Painted for Ludovico Sforza, 1495-98, about 4.6 metres by 8.8. The moment just after the words 'One of you will betray me': each of the twelve, in four groups of three, reacts in his own way, and every line of the room runs to the head of the one in the middle. Leonardo painted it in tempera and oil on dry plaster, so that he could work slowly and go back over it, as he could not with fresco. It began to flake within his lifetime. A visitor of the time saw him stand before it all day without a stroke, then climb up, add one touch, and go."); });
},
function (seed) {
if (DAV_TAPESTRY[seed])
return DAV_TAPESTRY[seed];
DAV_TAPESTRY[seed] = wTex(256, 320, function (x, W, H) {
var R = wRand(seed);
x.fillStyle = "#1E3A5A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#2A5A3A";
x.fillRect(12, 12, W - 24, H - 24);
for (var f = 0; f < 160; f++) {
x.fillStyle = ["#D8B048", "#C84A3A", "#E8E0D0", "#4A7A3A"][(R() * 4) | 0];
x.beginPath();
x.arc(14 + R() * (W - 28), 14 + R() * (H - 28), 1.5 + R() * 2.5, 0, 7);
x.fill();
}
x.fillStyle = "#E8E0D0";
x.beginPath();
x.ellipse(W / 2, H * 0.55, W * 0.18, H * 0.1, 0, 0, 7);
x.fill();
x.beginPath();
x.ellipse(W / 2 + W * 0.17, H * 0.46, W * 0.05, H * 0.05, 0, 0, 7);
x.fill();
x.strokeStyle = "#D8B048";
x.lineWidth = 6;
x.strokeRect(6, 6, W - 12, H - 12);
});
return DAV_TAPESTRY[seed];
},
function (grp, I) {
var X = I.x, Z = I.z, stone = davSurf("stone", 0xEDE6D6, 3), fl = davSurf("floortile", 0xC8A888, 1.4);
davRoomShell(grp, X, Z, 56, 20, 12, { wall: stone, floor: fl, ceil: 0x4A3424, gaps: { w: [[8, 12]], e: [[8, 12]], n: [], s: [] } });
davSpot(X - 27, Z, 2.6, "The door", "go back out to the terrace", function () { davLeave("chateau"); });
for (var t = 0; t < 4; t++)
[-1, 1].forEach(function (s) { var tp = new THREE.Mesh(new THREE.PlaneGeometry(4, 5), new THREE.MeshLambertMaterial({ map: davTapTex(t * 2 + (s > 0 ? 1 : 0) + 1) })); tp.position.set(X - 18 + t * 11, 5, Z + s * 9.7); tp.rotation.y = s > 0 ? Math.PI : 0; grp.add(tp); });
davBoxM(6, 5, 1.4, davSurf("stone", 0xD8D0C0, 2), X, 2.5, Z - 9.2, grp);
wBox(3.6, 2.6, 0.2, davGlowM(0xC0602A), X, 1.4, Z - 8.5, grp);
davSolid({ x: X, z: Z - 9.2, hw: 3, hd: 0.8 });
var lion = davMachineModel("lion");
lion.position.set(X + 6, 0, Z);
lion.rotation.y = -Math.PI / 2;
grp.add(lion);
lion.userData.keep = 1;
davSolid({ x: X + 6, z: Z, r: 1.6 });
davSpot(X + 6, Z + 3, 3, "The Mechanical Lion", "wind it up", function () { DAV.fx.push({ k: "lion", g: lion, t: 0, x0: lion.position.x, z0: lion.position.z }); setStatus("🦁 <b>You wind the Mechanical Lion.</b> It takes a few heavy steps across the hall, stops before the empty throne, and its chest swings open: it is full of lilies, the flower of France. " + esc(DAV_MACH.lion.about)); });
var thr = wBox(1.8, 2.8, 1.2, davC(0x2A3A7A), X + 24, 1.4, Z, grp);
davSolid({ x: X + 24, z: Z, hw: 0.9, hd: 0.9, h: 3 });
davFolk(grp, 96, X + 20, Z + 6, { still: true, name: "A gentleman of the King's chamber", say: "A courtly gentleman of the chamber of King Francis I at Amboise, 1518. He is proud of the King's love of learning and of 'Maître Léonard', who lives in the manor of Clos Lucé down the hill. Discreet: if asked about tunnels he says only that 'a king has many ways to visit a friend'.", greet: "Welcome to Amboise. The King? He is down at Clos Lucé again, with Maître Léonard, I expect." });
davSpot(X + 27, Z, 2.6, "A low door, iron-bound", "try it", function () { var D = davData(); if (D.tunnel)
davEnter("closluce", true);
else
setStatus("The door is barred, <b>from the other side</b>. Somewhere beyond it, stairs go down into the rock."); });
davRiddleSpot(X - 10, Z + 9.2, "amboise", 0);
},
function (grp, I) {
var X = I.x, Z = I.z, pl = davSurf("plaster", 0xD8CDB8, 3), fl = davSurf("floortile", 0xB86A50, 1.4), wood = davSurf("wood", 0x8A5A30, 1.2);
davRoomShell(grp, X - 276, Z, 20, 14, 6, { wall: pl, floor: fl, ceil: 0x5A3A22, gaps: { w: [[5, 9]], e: [[5, 9]], n: [[8, 12]], s: [[8, 12]] } });
davSpot(X - 285, Z, 2.6, "The door", "go out to the garden", function () { davLeave("closluce"); });
davPerson("melzi", X - 272, Z + 3, -Math.PI / 2, { parent: grp });
davBoxM(4, 4, 1, davSurf("stone", 0xD8D0C0, 2), X - 276, 2, Z - 6.6, grp);
wBox(2.4, 1.8, 0.2, davGlowM(0xC0602A), X - 276, 1, Z - 6, grp);
davRoomShell(grp, X - 276, Z - 13, 16, 12, 5, { wall: davSurf("plaster", 0xD4C4AC, 3), floor: wood, ceil: 0x4A3020, gaps: { s: [[6, 10]], n: [], e: [], w: [] } });
var bed = davBoxM(2.4, 0.7, 3, davC(0x6A2A2A), X - 281, 0.45, Z - 15, grp);
[-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { wBox(0.12, 3, 0.12, davC(0x4A2A18), X - 281 + a * 1.15, 1.5, Z - 15 + b * 1.45, grp); }); });
wBox(2.5, 0.12, 3.1, davC(0x6A2A2A), X - 281, 3, Z - 15, grp);
davSolid({ x: X - 281, z: Z - 15, hw: 1.3, hd: 1.6, h: 1 });
[0, 1, 2].forEach(function (i) { davEasel(grp, X - 275 + i * 2.6, Z - 16.5, Math.PI, new THREE.MeshLambertMaterial({ map: davUnderdrawTex(i) })); });
davSpot(X - 272.4, Z - 14.2, 2.6, "The three paintings", "look", function () { davInfo("What he kept", "When the Cardinal of Aragon visited in 1517, Leonardo showed him three paintings he had carried with him over the Alps: Lisa Gherardini's portrait, the Virgin and Child with Saint Anne, and Saint John the Baptist. He was still working on them. His right hand was failing then, but he still drew, and taught."); });
davRoomShell(grp, X - 276, Z + 13, 16, 12, 5, { wall: pl, floor: fl, ceil: 0x4A3020, gaps: { n: [[6, 10]], s: [], e: [], w: [] } });
["screw", "tank", "bridge", "chute"].forEach(function (k, i) {
var mx = X - 281 + i * 3.4, mz = Z + 16.5;
davTable(grp, mx, mz, 2.6, 1.6, 0);
var mg = davMachineModel(k);
mg.scale.setScalar(davModelScale(k) * 0.8);
mg.position.set(mx, 0.95, mz);
grp.add(mg);
davSpot(mx, mz - 1.4, 1.8, "A model: " + DAV_MACH[k].name, "study it", function () { davMachineCard(k); });
});
davSpot(X - 270.5, Z + 11, 2.4, "Plans for a new royal town", "look", function () { davInfo("Romorantin", "For King Francis, Leonardo planned a whole new royal palace and town at Romorantin, with canals to join it to the Loire, streets washed clean by running water, and houses that could be taken down and put up again elsewhere. It was never built; plague came in 1518."); });
davRoomShell(grp, X - 262, Z, 8, 14, 5, { wall: pl, floor: davSurf("stone", 0xB8A888, 2), ceil: 0x3A2A1A, gaps: { w: [[5, 9]], e: [], n: [], s: [] } });
davBoxM(3, 3.4, 1, davSurf("stone", 0xC8C0B0, 2), X - 262, 1.7, Z - 6.5, grp);
wBox(1.8, 1.2, 0.2, davGlowM(0xC0602A), X - 262, 0.7, Z - 5.9, grp);
davTable(grp, X - 262, Z + 2, 3, 1.2, Math.PI / 2);
davFolk(grp, 97, X - 261, Z + 4, { still: true, name: "Mathurine, the cook", say: "Mathurine, Leonardo's cook at Clos Lucé, a practical woman of Touraine; Leonardo left her a fur-lined cloak in his will. She talks of his diet (much soup and vegetables; he would not eat meat, it is said, and loved animals), of the Italian gentlemen, and of the King's visits by a way nobody sees.", greet: "Soup? There is always soup. Maître Léonard eats like a sparrow." });
davSpot(X - 262, Z - 4.6, 2.2, "A narrow stair, going down", "go down to the cellar", function () { davMove(X - 200, Z, Math.PI / 2, "<b>The cellar.</b> Barrels, cold stone, the smell of earth. Nine stones in the far wall are carved, each with a different sign."); });
davRoomShell(grp, X - 196, Z, 16, 12, 4, { wall: davSurf("stone", 0x9A8E7A, 2), floor: davSurf("stone", 0x8A8070, 2), ceil: 0x2A241E, lamps: true });
for (var b = 0; b < 5; b++) {
var br = wCyl(0.5, 0.5, 1, davSurf("wood", 0x6A4A2A, 1), X - 202, 0.5, Z - 4 + b * 2, grp, 10);
br.rotation.x = Math.PI / 2;
}
davSolid({ x: X - 202, z: Z, hw: 0.6, hd: 5 });
davSpot(X - 203, Z + 5, 2, "The stair", "go back up", function () { davMove(X - 262, Z - 2, 0, "Back up in the kitchen."); });
for (var s = 0; s < 9; s++) {
var sz = Z - 4 + s, sm = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), new THREE.MeshLambertMaterial({ map: davMarkTex(s) }));
sm.position.set(X - 188.2, 1.4 + ((s % 3) - 1) * 0.9, Z - 3 + ((s / 3) | 0) * 3);
sm.rotation.y = -Math.PI / 2;
grp.add(sm);
}
for (var r = 0; r < 3; r++)
(function (r) { davSpot(X - 189.4, Z - 3 + r * 3, 1.6, "Carved stones", "look at the signs", function () { davCellarCard(r); }); })(r);
davInFloor(grp, X - 30, Z, 316, 4, 0, davSurf("stone", 0x8A8070, 2));
davIWall(grp, X - 188, Z - 2, X + 128, Z - 2, 3.4, davSurf("stone", 0x8A7E6A, 2), [], 0);
davIWall(grp, X - 188, Z + 2, X + 128, Z + 2, 3.4, davSurf("stone", 0x8A7E6A, 2), [[226, 230]], 0);
davIWall(grp, X + 128, Z - 2, X + 128, Z + 2, 3.4, davSurf("stone", 0x8A7E6A, 2), [], 0);
var vault = new THREE.Mesh(new THREE.PlaneGeometry(316, 4), davC(0x3A3228));
vault.rotation.x = Math.PI / 2;
vault.position.set(X - 30, 3.4, Z);
grp.add(vault);
for (var t = 0; t < (DAV.lite ? 8 : 16); t++) {
var gl = wGlow(0xFFB070, 2.2, 0.35);
gl.position.set(X - 180 + t * 20, 2.4, Z - 1.7);
grp.add(gl);
wBox(0.1, 0.4, 0.1, davC(0x3A2A1A), X - 180 + t * 20, 2, Z - 1.85, grp);
}
davInFloor(grp, X + 40, Z + 4.5, 4, 5, 0, davSurf("stone", 0x8A8070, 2));
davIWall(grp, X + 38, Z + 2, X + 38, Z + 7, 3, davSurf("stone", 0x8A7E6A, 2), [], 0);
davIWall(grp, X + 42, Z + 2, X + 42, Z + 7, 3, davSurf("stone", 0x8A7E6A, 2), [], 0);
davIWall(grp, X + 38, Z + 7, X + 42, Z + 7, 3, davSurf("stone", 0x8A7E6A, 2), [], 0);
DAV.niche = { x: X + 40, z: Z + 5.4 };
davSpot(X + 124, Z, 2.4, "Stairs, going up into the rock", "climb up into the castle", function () { var D = davData(); D.tunnel = 1; davEnter("chateau"); setTimeout(function () { setStatus("<b>Up the stair</b>, through a low iron-bound door, and you are in the King's hall at Amboise. You unbar the door behind you: from now on it opens from this side too."); }, 900); });
davSpot(X - 186, Z, 2.2, "The way back", "go back to the cellar", function () { davMove(X - 194, Z, -Math.PI / 2, "Back in the cellar."); });
},
function (i) {
if (DAV_MARK[i])
return DAV_MARK[i];
DAV_MARK[i] = wTex(128, 128, function (x, W, H) {
x.fillStyle = "#8A7E6A";
x.fillRect(0, 0, W, H);
var R = wRand(i + 40);
for (var n = 0; n < 200; n++) {
x.fillStyle = "rgba(60,50,40," + R() * 0.2 + ")";
x.fillRect(R() * W, R() * H, 2, 2);
}
x.strokeStyle = "#3A3228";
x.lineWidth = 5;
x.lineCap = "round";
var c = W / 2;
x.beginPath();
if (i === 0) {
for (var p = 0; p < 5; p++) {
var a = p / 5 * 6.28;
x.moveTo(c, c);
x.ellipse(c + Math.cos(a) * 18, c + Math.sin(a) * 18, 16, 9, a, 0, 7);
}
}
else if (i === 1) {
for (var s = 0; s < 5; s++) {
var a1 = s * 4 * Math.PI / 5 - Math.PI / 2;
if (s)
x.lineTo(c + Math.cos(a1) * 40, c + Math.sin(a1) * 40);
else
x.moveTo(c + Math.cos(a1) * 40, c + Math.sin(a1) * 40);
}
x.closePath();
}
else if (i === 2) {
for (var t = 0; t < 40; t++) {
var a2 = t * 0.4, r = t * 1.1;
if (t)
x.lineTo(c + Math.cos(a2) * r, c + Math.sin(a2) * r);
else
x.moveTo(c, c);
}
}
else if (i === 3) {
x.arc(c - 18, c, 14, 0, 7);
x.moveTo(c - 4, c);
x.lineTo(c + 40, c);
x.moveTo(c + 28, c);
x.lineTo(c + 28, c + 14);
x.moveTo(c + 38, c);
x.lineTo(c + 38, c + 12);
}
else if (i === 4) {
x.moveTo(c - 40, c);
x.quadraticCurveTo(c - 20, c - 26, c, c);
x.quadraticCurveTo(c + 20, c - 26, c + 40, c);
}
else if (i === 5) {
for (var k = 0; k <= 120; k++) {
var u = k / 120 * Math.PI * 2, kr = 26 + 12 * Math.cos(4 * u);
var kx = c + Math.cos(u) * kr * 1.1, ky = c + Math.sin(u) * kr * 1.1;
if (k)
x.lineTo(kx, ky);
else
x.moveTo(kx, ky);
}
x.moveTo(c + 20, c);
x.arc(c, c, 20, 0, 7);
}
else if (i === 6) {
for (var q = 0; q < 7; q++) {
x.moveTo(c, c + 30);
x.lineTo(c - 30 + q * 10, c - 24 + Math.abs(q - 3) * 4);
}
x.moveTo(c - 32, c - 20);
x.quadraticCurveTo(c, c - 44, c + 32, c - 20);
}
else if (i === 7) {
x.arc(c, c, 16, 0, 7);
for (var y = 0; y < 8; y++) {
var a3 = y / 8 * 6.28;
x.moveTo(c + Math.cos(a3) * 24, c + Math.sin(a3) * 24);
x.lineTo(c + Math.cos(a3) * 40, c + Math.sin(a3) * 40);
}
}
else {
x.moveTo(c - 14, c + 36);
x.lineTo(c - 14, c - 6);
for (var f = 0; f < 4; f++) {
x.moveTo(c - 14 + f * 9, c);
x.lineTo(c - 14 + f * 9, c - 36 + Math.abs(f - 1.5) * 6);
}
x.moveTo(c + 22, c + 10);
x.lineTo(c + 34, c - 8);
}
x.stroke();
});
return DAV_MARK[i];
},
function (row) {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Carved stones</div><div style='opacity:.85;margin:4px 0 8px'>Three stones in this row of the wall, each with a sign cut into it, worn smooth by hands.</div>", fns = {};
for (var c = 0; c < 3; c++) {
var i = row * 3 + c;
(function (i) { h += worldBtn("s" + i, "Press the stone with " + DAV_CELLAR_MARKS[i], ""); fns["s" + i] = function () { davCellarPress(i); }; })(i);
}
worldCard(h, fns);
},
function (i) {
if (i !== DAV_CELLAR_RIGHT) {
worldCard(null);
setStatus("You press the stone with " + esc(DAV_CELLAR_MARKS[i]) + ". Nothing. It is only a stone.");
return;
}
var I = DAV_IN.closluce;
worldCard(null);
davMove(I.x - 184, I.z, Math.PI * 1.5, "The stone with <b>the knot that has no end</b> sinks under your hand. With a long grinding sigh, part of the wall swings back on a pivot: behind it, <b>a tunnel</b>, going away under the hill, toward the castle. Torches burn along it, though nobody lit them that you know of.");
},
function (grp, I) {
var X = I.x, Z = I.z, stone = davSurf("stone", 0xC8B898, 2.4), fl = davSurf("floortile", 0xB88A6A, 1.4);
davRoomShell(grp, X, Z, 18, 9, 4, { wall: stone, floor: fl, ceil: 0x4A3424, gaps: { s: [[8, 10]], n: [], e: [], w: [] } });
davSpot(X - 6, Z + 3.6, 2, "The door", "go back out", function () { davLeave("farm"); });
davBoxM(3, 2.6, 1, davSurf("stone", 0xA89878, 2), X + 6, 1.3, Z - 4, grp);
wBox(1.6, 0.9, 0.2, davGlowM(0xC0602A), X + 6, 0.5, Z - 3.4, grp);
davSolid({ x: X + 6, z: Z - 4, hw: 1.5, hd: 0.6 });
davTable(grp, X, Z, 2.6, 1.2, 0);
var cr = davBoxM(1, 0.5, 0.6, davSurf("wood", 0x8A5A30, 1), X - 5, 0.45, Z - 3, grp);
davSolid({ x: X - 5, z: Z - 3, r: 0.6, h: 0.8 });
var win = wBox(1.4, 1.2, 0.1, davGlowM(0xFFF0D0), X - 2, 2.2, Z - 4.45, grp);
davSpot(X - 2, Z - 3, 2.2, "The window", "look out", function () { davInfo("Anchiano, 1452", "Leonardo was born here, or near here, on 15 April 1452: the son of Ser Piero, a young notary, and of Caterina, a girl of the country. They never married; he grew up in his grandfather's house in Vinci with his uncle Francesco, who loved the land and taught him to look at it. He never went to a school of Latin; he called himself 'a man without letters', and learned from what he saw."); });
},
function () {
if (DAV_IMAP)
return DAV_IMAP;
var S = DAV.lite ? 256 : 512;
DAV_IMAP = wTex(S, S, function (x, W, H) {
var c = W / 2, r = W * 0.42;
x.fillStyle = "#E8DCB8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(120,90,60,.5)";
x.lineWidth = 1;
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
x.beginPath();
x.moveTo(c, c);
x.lineTo(c + Math.cos(a) * r * 1.1, c + Math.sin(a) * r * 1.1);
x.stroke();
}
for (var k = 0; k < 64; k++) {
var a2 = k / 64 * Math.PI * 2;
x.beginPath();
x.moveTo(c + Math.cos(a2) * r, c + Math.sin(a2) * r);
x.lineTo(c + Math.cos(a2) * r * 1.04, c + Math.sin(a2) * r * 1.04);
x.stroke();
}
x.beginPath();
x.arc(c, c, r, 0, 7);
x.stroke();
x.fillStyle = "#D8A878";
var R = wRand(1502);
for (var b = 0; b < 70; b++) {
var bx = c + (R() - 0.5) * r * 1.3, by = c + (R() - 0.5) * r * 1.1;
if (Math.hypot(bx - c, by - c) < r * 0.62)
x.fillRect(bx, by, 6 + R() * 16, 6 + R() * 12);
}
x.strokeStyle = "#5A8AA8";
x.lineWidth = 4;
x.beginPath();
x.moveTo(c + r * 0.75, 0);
x.quadraticCurveTo(c + r * 0.9, c, c + r * 0.7, H);
x.stroke();
x.strokeStyle = "#8A5A3A";
x.lineWidth = 2;
x.beginPath();
x.arc(c, c, r * 0.64, 0, 7);
x.stroke();
x.fillStyle = "#3A2A1A";
x.font = (W / 26 | 0) + "px Georgia";
x.textAlign = "center";
["Tramontana", "Greco", "Levante", "Scirocco", "Ostro", "Libeccio", "Ponente", "Maestro"].forEach(function (n, i) { var a = i / 8 * Math.PI * 2 - Math.PI / 2; x.fillText(n, c + Math.cos(a) * r * 0.9, c + Math.sin(a) * r * 0.9); });
});
return DAV_IMAP;
},
function (grp, I) {
var X = I.x, Z = I.z, brick = davSurf("brick", 0xB8785A, 2.4);
davRoomShell(grp, X, Z, 20, 14, 6, { wall: brick, floor: davSurf("floortile", 0xB88A6A, 1.4), ceil: 0x3A2A1A, gaps: { w: [[5, 9]], e: [], n: [], s: [] } });
davSpot(X - 9, Z, 2.4, "The door", "go back out", function () { davLeave("rocca"); });
davTable(grp, X + 2, Z, 4, 3, 0);
var mp = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), new THREE.MeshLambertMaterial({ map: davImolaMapTex() }));
mp.rotation.x = -Math.PI / 2;
mp.position.set(X + 2, 0.93, Z);
grp.add(mp);
var od = davMachineModel("odo");
od.scale.setScalar(0.9);
od.position.set(X + 6, 0, Z + 4);
grp.add(od);
davSpot(X + 2, Z + 2, 2.6, "The plan of Imola", "study it", function () { davInfo("The plan of Imola, 1502", "Leonardo paced the town with a measuring wheel and a compass, house by house, and drew it as if from high in the air: a circle divided by the eight winds, every street and block exact. Nobody had drawn a town like this before. Cesare Borgia wanted it for war; it became the start of modern map-making. Look for its circle in the town outside."); });
},
function (kind) {
var Q = DAV_QUESTS[kind];
if (!Q)
return;
var d = davData();
d.done = d.done || {};
d.done[kind] = (d.done[kind] || 0) + 1;
davKeep(Q.keep[0], Q.keep[1], Q.name);
if (DAV.busy)
return;
DAV.busy = true;
var p = (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()) ? cityRpc("dav_done", { p_kind: kind }) : Promise.resolve(null);
p.then(function (o) {
DAV.busy = false;
setStatus("<b>" + esc(Q.keep[0] + " " + Q.keep[1]) + "</b>: it is in your 🎒 Backpack." + (o && o.say ? " " + esc(o.say) : "") + (o && o.gold ? " <b>+" + o.gold + " gold</b> from the Treasury." : ""));
}).catch(function () { DAV.busy = false; setStatus("<b>" + esc(Q.keep[0] + " " + Q.keep[1]) + "</b>: it is in your 🎒 Backpack."); });
},
function (topic) {
var d = davData(), fns = {}, h = DAV_H + "📚 The notebooks</div>";
var got = DAV_PAGES_OUT.filter(function (P, k) { return d.pages["o" + k]; }).length;
h += "<div style='opacity:.85;margin:4px 0 8px'>Leonardo filled thousands of pages with what he saw and thought, writing right to left. Most are on these shelves; <b>" + DAV_PAGES_OUT.length + " pages</b> are lying out in the world. You have found <b>" + got + "</b>. Lessons taken: <b>" + Object.keys(d.lessons).length + " of " + DAV_LESSONS.length + "</b>. Riddles read: <b>" + Object.keys(d.riddles).length + " of " + DAV_RIDDLES.length + "</b>.</div>";
if (!topic) {
Object.keys(DAV_TOPICS).forEach(function (t) { var n = DAV_NOTES.filter(function (N) { return N[0] === t; }).length; h += worldBtn("t" + t, DAV_TOPICS[t], n + " pages"); fns["t" + t] = function () { davCodexCard(t); }; });
h += worldBtn("lessons", "The lessons", "Where each one is, and which you have taken");
fns.lessons = function () { davLessonList(); };
worldCard(h, fns);
return;
}
h += "<div style='font-weight:600;margin:6px 0'>" + esc(DAV_TOPICS[topic]) + "</div>";
var n = 0;
DAV_NOTES.forEach(function (N, i) {
if (N[0] !== topic)
return;
var o = davNoteOut(i);
if (o >= 0 && !d.pages["o" + o]) {
h += "<div style='opacity:.6;margin:6px 0'>A page is missing here. It lies " + esc(DAV_PAGES_OUT[o][4]) + ".</div>";
return;
}
h += davMirrorHtml(N[2], "dav-n" + (n++)) + "<div style='opacity:.6;font-size:12px;margin:-2px 0 4px'>from " + esc(N[1]) + "</div>";
});
h += davMirrorBtn() + worldBtn("back", "Back to the shelves", "");
fns.mirror = function () { for (var k = 0; k < n; k++)
davMirrorFlip("dav-n" + k); };
fns.back = function () { davCodexCard(); };
worldCard(h, fns);
},
function (i) {
var P = DAV_PAGES_OUT[i], d = davData();
if (!P || d.pages["o" + i])
return;
d.pages["o" + i] = 1;
davSave();
var m = DAV.pageMesh && DAV.pageMesh[i];
if (m) {
if (m.userData.glow && m.userData.glow.parent)
m.userData.glow.parent.remove(m.userData.glow);
if (m.parent)
m.parent.remove(m);
}
DAV.spots = DAV.spots.filter(function (s) { return !(s.x === P[2] && s.z === P[3]); });
var N = DAV_NOTES[P[0]], got = DAV_PAGES_OUT.filter(function (Q, k) { return d.pages["o" + k]; }).length;
davKeep("📄", "A page of Leonardo's notebook (" + DAV_TOPICS[N[0]] + ")", "found " + P[4]);
worldCard(DAV_H + "📄 A page of a notebook</div><div style='opacity:.85;margin:4px 0'>Found " + esc(P[4]) + ". It is written backwards.</div>" + davMirrorHtml(N[2], "dav-pg") + davMirrorBtn() +
"<div style='opacity:.8;margin-top:6px'>Pages found: <b>" + got + " of " + DAV_PAGES_OUT.length + "</b>. It goes into your codex (the notebooks, in the Bottega's library).</div>", { mirror: function () { davMirrorFlip("dav-pg"); } });
if (got === DAV_PAGES_OUT.length)
setTimeout(function () { davClaim("codex"); }, 1200);
},
function () {
if (DAV_PLAQUE)
return DAV_PLAQUE;
DAV_PLAQUE = wTex(256, 128, function (x, W, H) {
x.fillStyle = "#E4D4AE";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#6A4A2A";
x.lineWidth = 6;
x.strokeRect(4, 4, W - 8, H - 8);
x.save();
x.translate(W, 0);
x.scale(-1, 1);
x.fillStyle = "#4A3220";
x.font = "italic 17px Georgia";
["Read me if you can:", "the further from the eye,", "the more the mirror tells."].forEach(function (l, i) { x.fillText(l, 18, 38 + i * 28); });
x.restore();
});
return DAV_PLAQUE;
},
function (x, z, where, idx, y) {
var list = davRiddleList(where), ri = list[idx];
if (ri === undefined)
return;
var I = davInAt(x), parent = I && I.grp ? I.grp : DAV.G, gy = y !== undefined ? y : (I ? 0 : davLand(x, z));
var p = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.45), new THREE.MeshLambertMaterial({ map: davPlaqueTex(), side: THREE.DoubleSide }));
p.position.set(x, gy + 1.6, z);
parent.add(p);
if (!I) {
wBox(0.12, 1.4, 0.12, davC(0x5A3A22), x, gy + 0.7, z - 0.06, parent);
p.rotation.y = 0;
}
else {
p.lookAt(I.x, 1.6, I.z);
}
davSpot(x, z, 2.4, "A plaque, written backwards", "read it (hold up the mirror)", function () { davRiddleCard(ri); }, gy);
},
function (ri) {
var R = DAV_RIDDLES[ri], d = davData(), fns = {}, ans = [R[2]].concat(R[3]), seed = ri * 7 + Math.floor(Date.now() / 600000);
var order = [0, 1, 2, 3].sort(function (a, b) { return ((a * 31 + seed) % 7) - ((b * 31 + seed) % 7); });
var h = DAV_H + "🪞 A mirror riddle</div>" + davMirrorHtml(R[1], "dav-rd") + davMirrorBtn();
if (d.riddles[ri])
h += "<div style='color:#BFE8B0;margin:6px 0'>You have read this one: <b>" + esc(R[2]) + "</b>.</div>";
else
order.forEach(function (o, i) {
h += worldBtn("a" + i, esc(ans[o]), "");
fns["a" + i] = function () {
if (o === 0) {
d.riddles[ri] = 1;
davSave();
var n = Object.keys(d.riddles).length;
davKeep("🪞", "A mirror riddle read: " + R[2], "read backwards, in " + R[0]);
worldCard(DAV_H + "🪞 Well read.</div><div style='opacity:.88;margin-top:6px'>The answer is <b>" + esc(R[2]) + "</b>. Riddles read: <b>" + n + " of " + DAV_RIDDLES.length + "</b>." + (n === DAV_RIDDLES.length ? " <b>Every one.</b> 'Read me, O reader, if in my words you find delight.'" : "") + "</div>", {});
if (n === DAV_RIDDLES.length)
davKeep("🔍", "The Mirror-Reader's lens", "for reading every mirror riddle in Leonardo's Italy");
}
else {
worldCard(DAV_H + "🪞 Not that.</div><div style='opacity:.85;margin-top:6px'>Read it again, with the mirror. The plaque will be here.</div>", {});
}
};
});
fns.mirror = function () { davMirrorFlip("dav-rd"); };
worldCard(h, fns);
},
function () {
var d = davData(), h = DAV_H + "The lessons</div>", fns = {};
DAV_LESSONS.forEach(function (L) { h += "<div style='margin:4px 0'>" + (d.lessons[L[0]] ? "✅ " : "▫️ ") + "<b>" + esc(L[1]) + "</b> <span style='opacity:.7'>· " + esc({ bottega: "the Bottega", hospital: "the hospital", ceceri: "Monte Ceceri", proving: "the Proving Ground", anchiano: "Anchiano", vinci: "Vinci", milan: "Milan" }[L[2]] || L[2]) + "</span><div style='opacity:.7;font-size:12px'>" + esc(L[3]) + "</div></div>"; });
worldCard(h, fns);
},
function (key) {
var L = null;
DAV_LESSONS.forEach(function (l) { if (l[0] === key)
L = l; });
var T = DAV_LESSON_TEXT[key];
if (!L || !T)
return;
var d = davData(), fns = {}, Q = T[2], seed = key.length * 13;
var h = DAV_H + "🎓 " + esc(L[1]) + "</div><canvas id='dav-lc' width='" + (DAV.lite ? 300 : 420) + "' height='" + (DAV.lite ? 170 : 240) + "' style='width:100%;max-width:420px;border:1px solid rgba(232,200,140,.35);border-radius:4px;background:#E8DCB8;margin:6px 0'></canvas>" +
"<div style='opacity:.9;line-height:1.45'>" + esc(T[0]) + "</div><div style='opacity:.8;line-height:1.45;margin-top:6px'>" + esc(T[1]) + "</div>";
if (d.lessons[key])
h += "<div style='color:#BFE8B0;margin:8px 0'>✅ You have taken this lesson.</div>";
else {
h += "<div style='margin:8px 0 2px;font-weight:600'>" + esc(Q[0]) + "</div>";
var ans = [Q[1]].concat(Q[2]), order = [0, 1, 2, 3].sort(function (a, b) { return ((a * 17 + seed) % 5) - ((b * 17 + seed) % 5); });
order.forEach(function (o, i) {
h += worldBtn("q" + i, esc(ans[o]), "");
fns["q" + i] = function () {
if (o === 0) {
d.lessons[key] = 1;
davSave();
davKeep("🎓", "A lesson learned: " + L[1], "taken in Leonardo's Italy");
setStatus("✅ <b>Lesson learned: " + esc(L[1]) + ".</b> Lessons taken: " + Object.keys(d.lessons).length + " of " + DAV_LESSONS.length + ".");
davLesson(key);
}
else
setStatus("Not quite. Look at the picture again, and read what it says.");
};
});
}
worldCard(h, fns);
var cv = document.getElementById("dav-lc");
if (!cv)
return;
var x = cv.getContext("2d"), t0 = performance.now();
(function frame() { if (!cv.isConnected || WLD.card.style.display === "none")
return; try {
davLessonDraw(key, x, cv.width, cv.height, (performance.now() - t0) / 1000);
}
catch (e) { } requestAnimationFrame(frame); })();
},
function (key, x, W, H, t) {
x.fillStyle = "#E8DCB8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#5A3A1E";
x.fillStyle = "#5A3A1E";
x.lineWidth = 1.6;
x.lineCap = "round";
var cx = W / 2, cy = H / 2, s = H / 240;
function fig(px, py, sc, armA, legA) {
x.beginPath();
x.arc(px, py - 80 * sc, 12 * sc, 0, 7);
x.moveTo(px, py - 68 * sc);
x.lineTo(px, py);
[-1, 1].forEach(function (k) { x.moveTo(px, py - 52 * sc); x.lineTo(px + k * Math.cos(armA) * 60 * sc, py - 52 * sc - Math.sin(armA) * 60 * sc); x.moveTo(px, py); x.lineTo(px + k * Math.sin(legA) * 72 * sc, py + Math.cos(legA) * 72 * sc); });
x.stroke();
}
if (key === "vitruvian") {
var r = 96 * s, sq = 176 * s;
x.strokeRect(cx - sq / 2, cy + 80 * s - sq, sq, sq);
x.beginPath();
x.arc(cx, cy - 6 * s, r, 0, 7);
x.stroke();
var k = (Math.sin(t * 0.8) + 1) / 2;
fig(cx, cy + 10 * s, 1.1 * s, 0.02 + k * 0.38, 0.02 + k * 0.36);
x.font = (11 * s | 0) + "px Georgia";
x.fillText("arm span = height", cx + r * 0.3, cy + 92 * s);
}
else if (key === "perspective") {
var hy = H * 0.42;
x.beginPath();
x.moveTo(0, hy);
x.lineTo(W, hy);
x.stroke();
for (var i = 0; i < 7; i++) {
var bx = i / 6 * W;
x.beginPath();
x.moveTo(bx, H);
x.lineTo(cx, hy);
x.stroke();
}
for (var j = 0; j < 6; j++) {
var f = Math.pow(0.7, j + ((t * 0.3) % 1)), yy = hy + (H - hy) * f, w = W * f;
x.globalAlpha = f;
x.strokeRect(cx - w * 0.42, yy - 60 * s * f, w * 0.12, 60 * s * f);
x.strokeRect(cx + w * 0.3, yy - 60 * s * f, w * 0.12, 60 * s * f);
}
x.globalAlpha = 1;
}
else if (key === "sfumato") {
var la = t * 0.5, lx = cx + Math.cos(la) * W * 0.38, ly = cy - Math.sin(la) * H * 0.2;
var g = x.createRadialGradient(cx + (lx - cx) * 0.3, cy + (ly - cy) * 0.3, 4, cx, cy, 70 * s);
g.addColorStop(0, "#F8F0DC");
g.addColorStop(0.6, "#B8A07A");
g.addColorStop(1, "#5A4630");
x.fillStyle = g;
x.beginPath();
x.ellipse(cx, cy, 55 * s, 70 * s, 0, 0, 7);
x.fill();
x.fillStyle = "#E8C870";
x.beginPath();
x.arc(lx, ly, 7 * s, 0, 7);
x.fill();
}
else if (key === "obscura") {
x.fillStyle = "#3A3028";
x.fillRect(cx - 10, 0, 20, H * 0.42);
x.fillRect(cx - 10, H * 0.58, 20, H * 0.42);
var tx = W * 0.2, sx2 = W * 0.82;
x.fillStyle = "#3A6A2A";
x.beginPath();
x.arc(tx, cy - 40 * s, 24 * s, 0, 7);
x.fill();
x.fillStyle = "#5A3A1E";
x.fillRect(tx - 4, cy - 20 * s, 8, 60 * s);
x.save();
x.translate(sx2, cy);
x.scale(1, -1);
x.globalAlpha = 0.7;
x.fillStyle = "#3A6A2A";
x.beginPath();
x.arc(0, -40 * s * 0.6, 24 * s * 0.6, 0, 7);
x.fill();
x.fillStyle = "#5A3A1E";
x.fillRect(-3, -20 * s * 0.6, 6, 36 * s);
x.restore();
x.globalAlpha = 1;
x.setLineDash([4, 4]);
var p = (t * 0.4) % 1;
x.beginPath();
x.moveTo(tx, cy - 60 * s);
x.lineTo(sx2, cy + 40 * s);
x.moveTo(tx, cy + 40 * s);
x.lineTo(sx2, cy - 30 * s);
x.stroke();
x.setLineDash([]);
x.fillStyle = "#C84A2A";
x.beginPath();
x.arc(tx + (sx2 - tx) * p, cy - 60 * s + (100 * s) * p, 3, 0, 7);
x.fill();
}
else if (key === "heart") {
x.beginPath();
x.moveTo(cx - 50 * s, H);
x.lineTo(cx - 50 * s, cy);
x.quadraticCurveTo(cx - 50 * s, cy - 60 * s, cx, cy - 70 * s);
x.quadraticCurveTo(cx + 50 * s, cy - 60 * s, cx + 50 * s, cy);
x.lineTo(cx + 50 * s, H);
x.stroke();
var open = (Math.sin(t * 1.6) + 1) / 2;
[-1, 1].forEach(function (k) { x.beginPath(); x.moveTo(cx + k * 50 * s, cy); x.lineTo(cx + k * (50 - 30 * (1 - open)) * s, cy - 20 * s * (1 - open) + 10 * s); x.stroke(); });
for (var e = 0; e < 3; e++) {
var a = t * 2 + e * 2;
x.beginPath();
x.arc(cx + Math.sin(a * 0.5) * 20 * s, cy - 30 * s, 10 * s + e * 6 * s, a, a + 4);
x.stroke();
}
}
else if (key === "eye") {
x.beginPath();
x.arc(cx + 30 * s, cy, 60 * s, 0, 7);
x.stroke();
var pr = (10 + 6 * Math.sin(t * 0.7)) * s;
x.fillRect(cx - 32 * s, cy - pr, 4, pr * 2);
x.beginPath();
x.ellipse(cx - 18 * s, cy, 8 * s, 20 * s, 0, 0, 7);
x.stroke();
x.beginPath();
x.moveTo(20 * s, cy - 40 * s);
x.lineTo(cx + 88 * s, cy + 30 * s);
x.moveTo(20 * s, cy + 40 * s);
x.lineTo(cx + 88 * s, cy - 30 * s);
x.stroke();
x.beginPath();
x.moveTo(20 * s, cy - 40 * s);
x.lineTo(20 * s, cy + 40 * s);
x.lineWidth = 4;
x.stroke();
x.lineWidth = 1.6;
}
else if (key === "skeleton") {
var a2 = 0.6 + 0.5 * Math.sin(t);
x.lineWidth = 5;
x.beginPath();
x.moveTo(cx - 70 * s, cy - 40 * s);
x.lineTo(cx, cy);
x.lineTo(cx + Math.cos(-a2) * 80 * s, cy + Math.sin(-a2) * 80 * s);
x.stroke();
x.lineWidth = 1.6;
x.strokeStyle = "#A83A2A";
x.beginPath();
x.moveTo(cx - 60 * s, cy - 48 * s);
x.quadraticCurveTo(cx - 20 * s, cy - 40 * s - 10 * s * (1 - Math.sin(t)), cx + Math.cos(-a2) * 22 * s, cy + Math.sin(-a2) * 22 * s - 4);
x.stroke();
}
else if (key === "flight") {
for (var b = 0; b < 3; b++) {
var ba = t * 0.4 + b * 2.1, bx2 = cx + Math.cos(ba) * (60 + b * 24) * s, by = cy - 20 * s + Math.sin(ba) * (20 + b * 8) * s + b * 10;
x.beginPath();
x.moveTo(bx2 - 18 * s, by - 4);
x.quadraticCurveTo(bx2 - 8 * s, by - 10, bx2, by);
x.quadraticCurveTo(bx2 + 8 * s, by - 10, bx2 + 18 * s, by - 4);
x.stroke();
}
x.beginPath();
x.moveTo(0, H);
x.quadraticCurveTo(W * 0.35, H * 0.45, W, H * 0.8);
x.stroke();
x.setLineDash([3, 5]);
for (var w = 0; w < 4; w++) {
var o = ((t * 30 + w * 40) % 160) * s;
x.beginPath();
x.moveTo(W * 0.1 + o, H * 0.92 - o * 0.4);
x.lineTo(W * 0.1 + o + 20, H * 0.88 - o * 0.6);
x.stroke();
}
x.setLineDash([]);
}
else if (key === "water") {
for (var c = 0; c < 5; c++) {
var r2 = (10 + c * 14) * s;
x.beginPath();
for (var q = 0; q <= 60; q++) {
var a3 = q / 60 * Math.PI * 2 + t * (0.6 - c * 0.08), rr = r2 * (1 + 0.12 * Math.sin(a3 * 3 + t));
if (q)
x.lineTo(cx + Math.cos(a3) * rr, cy + Math.sin(a3) * rr * 0.7);
else
x.moveTo(cx + Math.cos(a3) * rr, cy + Math.sin(a3) * rr * 0.7);
}
x.stroke();
}
for (var sd = 0; sd < 8; sd++) {
var a4 = t * 0.9 + sd, rs = ((t * 8 + sd * 9) % 60) * s;
x.beginPath();
x.arc(cx + Math.cos(a4) * rs, cy + Math.sin(a4) * rs * 0.7, 2, 0, 7);
x.fill();
}
}
else if (key === "rocks") {
for (var l = 0; l < 8; l++) {
x.fillStyle = ["#C8B088", "#B89870", "#D8C8A0", "#A88A68"][l % 4];
x.fillRect(0, l * H / 8, W, H / 8);
}
x.fillStyle = "#F2E8D0";
var R = wRand(4);
for (var sh = 0; sh < 12; sh++) {
var sx3 = R() * W, sy = R() * H;
x.beginPath();
x.ellipse(sx3, sy, 6, 4, R(), 0, 7);
x.fill();
}
var dig = ((t * 20) % H);
x.strokeStyle = "#5A3A1E";
x.beginPath();
x.moveTo(W * 0.8, 0);
x.lineTo(W * 0.8, dig);
x.stroke();
x.fillStyle = "#5A3A1E";
x.fillText("older ↓", W * 0.82, Math.min(H - 6, dig + 4));
}
else if (key === "plants") {
var rn = Math.floor((t * 2) % 14) + 1;
for (var ri = 1; ri <= 14; ri++) {
x.globalAlpha = ri <= rn ? 1 : 0.2;
x.beginPath();
x.arc(cx - W * 0.18, cy, ri * 6 * s, 0, 7);
x.stroke();
}
x.globalAlpha = 1;
x.fillText(rn + " years", cx - W * 0.18 - 20, H - 8);
for (var lf = 0; lf < 10; lf++) {
var a5 = lf * 2.4 + t * 0.2, ly2 = H - 14 - lf * 16 * s;
x.beginPath();
x.ellipse(cx + W * 0.22 + Math.cos(a5) * 16 * s, ly2, 10 * s, 4 * s, a5, 0, 7);
x.stroke();
}
x.beginPath();
x.moveTo(cx + W * 0.22, H);
x.lineTo(cx + W * 0.22, H - 170 * s);
x.stroke();
}
else if (key === "gears") {
function gear(gx, gy, r, n, a) { x.beginPath(); for (var k = 0; k < n * 2; k++) {
var aa = a + k / (n * 2) * Math.PI * 2, rr2 = k % 2 ? r : r * 1.18;
if (k)
x.lineTo(gx + Math.cos(aa) * rr2, gy + Math.sin(aa) * rr2);
else
x.moveTo(gx + Math.cos(aa) * rr2, gy + Math.sin(aa) * rr2);
} x.closePath(); x.stroke(); }
gear(cx - 40 * s, cy, 40 * s, 12, t * 0.6);
gear(cx + 38 * s, cy, 26 * s, 8, -t * 0.9 + 0.2);
for (var bb = 0; bb < 8; bb++) {
var a6 = bb / 8 * Math.PI * 2 + t * 0.3;
x.beginPath();
x.arc(cx + W * 0.32 + Math.cos(a6) * 20 * s, cy + Math.sin(a6) * 20 * s, 5 * s, 0, 7);
x.stroke();
}
x.beginPath();
x.arc(cx + W * 0.32, cy, 27 * s, 0, 7);
x.stroke();
}
else if (key === "locks") {
var lvl = (Math.sin(t * 0.5) + 1) / 2, lo = H * 0.75, hi = H * 0.45, wy = lo - (lo - hi) * lvl;
x.fillStyle = "#9AB8C8";
x.fillRect(0, hi, W * 0.3, H - hi);
x.fillRect(W * 0.3, wy, W * 0.4, H - wy);
x.fillRect(W * 0.7, lo, W * 0.3, H - lo);
x.fillStyle = "#5A3A1E";
x.fillRect(W * 0.3 - 3, H * 0.35, 6, H * 0.65);
x.fillRect(W * 0.7 - 3, H * 0.35, 6, H * 0.65);
x.fillStyle = "#8A5A3A";
x.fillRect(W * 0.42, wy - 14 * s, W * 0.16, 12 * s);
}
x.strokeStyle = "rgba(90,60,30,.4)";
x.strokeRect(1, 1, W - 2, H - 2);
},
function () {
var d = davData(), lessons = Object.keys(d.lessons).length;
var h = DAV_H + "🎓 The Master's examination</div><div style='opacity:.85;margin:4px 0 8px'>Ten questions on what Leonardo saw and made. Answer eight rightly and you are made a <b>Maestro</b> of the Bottega" + (d.maestro ? " (you are one already; take it again whenever you like)" : "") + ". The lessons (" + lessons + " of " + DAV_LESSONS.length + " taken) and the notebooks will help.</div>";
worldCard(h + worldBtn("go", "Begin", "Ten questions"), { go: function () { var pool = DAV_EXAM.map(function (q, i) { return i; }).sort(function () { return Math.random() - 0.5; }).slice(0, 10); davExamQ({ pool: pool, i: 0, right: 0 }); } });
},
function (S) {
if (S.i >= S.pool.length) {
var pass = S.right >= 8, d = davData();
if (pass) {
d.maestro = 1;
davSave();
davClaim("exam");
}
worldCard(DAV_H + (pass ? "🎓 Maestro!" : "Not yet") + "</div><div style='opacity:.88;margin-top:6px'>" + S.right + " of 10. " + (pass ? "Verrocchio nods; Leonardo smiles and says nothing, which from him is a great deal. <b>You are a Maestro of the Bottega.</b>" : "Eight are needed. Take a lesson or two, read the notebooks, and try again.") + "</div>", {});
return;
}
var Q = DAV_EXAM[S.pool[S.i]], ans = [Q[1]].concat(Q[2]), order = [0, 1, 2, 3].sort(function () { return Math.random() - 0.5; }), fns = {};
var h = DAV_H + "Question " + (S.i + 1) + " of 10</div><div style='margin:6px 0 4px;font-weight:600'>" + esc(Q[0]) + "</div>";
order.forEach(function (o, i) { h += worldBtn("a" + i, esc(ans[o]), ""); fns["a" + i] = function () { if (o === 0)
S.right++; S.i++; davExamQ(S); }; });
worldCard(h, fns);
},
function (k) {
var M = DAV_MACH[k];
if (!M)
return;
var fns = {};
var h = DAV_H + M.icon + " " + esc(M.name.charAt(0).toUpperCase() + M.name.slice(1)) + "</div><div style='opacity:.65;font-size:12px'>from " + esc(M.src) + "</div><div style='opacity:.9;margin:6px 0;line-height:1.45'>" + esc(M.about) + "</div>";
if (M.how)
h += "<div style='opacity:.8'>" + esc(M.how) + "</div>";
if (M.wpn)
h += "<div style='opacity:.8;margin-top:4px'>It carries <b>" + esc(M.wpn.name) + "</b>: " + M.wpn.dmg + " to each foe within " + M.wpn.r + " m (it works on the Romagna's foes, and on dreamers where dreamers may fight).</div>";
if (WLD.on === DAV_KEY && DAV.pgAt && DAV.pgAt[k]) {
var P = DAV.pgAt[k];
h += worldBtn("go", "Go to it at the Proving Ground", "It stands there full size");
fns.go = function () { davMove(P.x + 6, P.z + 6, null, "<b>The Proving Ground.</b> " + esc(M.name.charAt(0).toUpperCase() + M.name.slice(1)) + " stands before you, full size."); };
}
if (k === "bird") {
h += worldBtn("hill", "Go to Monte Ceceri", "Where the Great Bird flies from");
fns.hill = function () { var C = DAV_CECERI; davMove(C.x + Math.cos(C.yaw) * -4, C.z - Math.sin(C.yaw) * -4, C.yaw, "<b>Monte Ceceri.</b> The Great Bird waits on its ramp."); };
}
worldCard(h, fns);
},
function () {
var d = davData(), S = DAV.horseS || (DAV.horseS = { i: 0, heat: 0 }), fns = {};
var h = DAV_H + "🐎 The Great Horse</div><div style='opacity:.88;margin:4px 0 8px;line-height:1.45'>For Ludovico Sforza, a horse in bronze over seven metres high, the greatest ever made. Leonardo worked on it for sixteen years; the clay model stood in this court in 1493 and amazed everyone. Then war came: the seventy tonnes of bronze were made into cannon, and in 1499 French archers shot the clay model to pieces for target practice. It was never cast. <b>Here, you may finish it.</b></div>";
if (d.horseCast)
h += "<div style='color:#BFE8B0;margin-bottom:6px'>You have cast it before: here it stands in bronze. You may cast it again.</div>";
var St = DAV_HORSE_STEPS[S.i];
h += "<div style='margin:6px 0'><b>Step " + (S.i + 1) + " of 5: " + esc(St[0]) + ".</b> " + esc(St[1]) + "</div>";
if (S.i === 3)
h += "<div id='dav-heat' style='height:10px;background:rgba(255,255,255,.1);border-radius:5px;overflow:hidden;margin:6px 0'><div style='height:100%;width:" + Math.round(S.heat * 100) + "%;background:linear-gradient(90deg,#C86A2A,#E8B048)'></div></div>";
h += worldBtn("do", St[2], S.i === 3 ? "Press it again and again until the bronze runs" : "");
fns.do = function () {
if (S.i === 3) {
S.heat = Math.min(1, S.heat + 0.18);
if (typeof playTone === "function")
playTone(90 + S.heat * 80, 0.15);
if (S.heat < 1) {
davHorseCard();
return;
}
setStatus("🔥 <b>The bronze is running hot</b>, like bright soup in the furnaces.");
}
S.i++;
if (S.i >= 5) {
DAV.horseS = null;
d.horseCast = 1;
davSave();
davHorseBronze();
worldCard(null);
setStatus("🐎 <b>The bronze runs into the earth.</b> Days later they dig it out, and clean it, and raise it: <b>the Great Horse, in bronze</b>, seven metres high, at last.");
davClaim("horse");
return;
}
davHorseCard();
};
worldCard(h, fns);
},
function () {
var notes = [["C", 261.6], ["D", 293.7], ["E", 329.6], ["F", 349.2], ["G", 392], ["A", 440], ["B", 493.9], ["C", 523.3]], fns = {};
var h = DAV_H + "🎻 The viola organista</div><div style='opacity:.85;margin:4px 0 8px'>Leonardo drew it in the 1490s: a keyboard whose keys press the strings against turning wheels wrapped in horsehair, so it sings like a choir of viols, as long as you hold a note. He was a fine musician himself; he first came to Milan, it is said, to play a silver lyre shaped like a horse's skull.</div><div style='display:flex;gap:4px;flex-wrap:wrap'>";
notes.forEach(function (n, i) { h += "<div data-w='n" + i + "' role='button' tabindex='0' style='flex:1;min-width:30px;padding:16px 0;text-align:center;background:#F2EAD8;color:#3A2A1A;border-radius:0 0 4px 4px;font-weight:600'>" + n[0] + "</div>"; fns["n" + i] = function () { davBow(n[1]); }; });
worldCard(h + "</div>", fns);
},
function (f) {
try {
var C = (typeof audio !== "undefined" && audio.ctx) ? audio.ctx : (DAV.ac || (DAV.ac = new (window.AudioContext || window.webkitAudioContext)()));
var t = C.currentTime, o = C.createOscillator(), o2 = C.createOscillator(), lp = C.createBiquadFilter(), g = C.createGain();
o.type = "sawtooth";
o.frequency.value = f;
o2.type = "sawtooth";
o2.frequency.value = f * 1.003;
lp.type = "lowpass";
lp.frequency.value = f * 4;
g.gain.setValueAtTime(0, t);
g.gain.linearRampToValueAtTime(0.06, t + 0.15);
g.gain.linearRampToValueAtTime(0.045, t + 1.2);
g.gain.linearRampToValueAtTime(0, t + 1.8);
o.connect(lp);
o2.connect(lp);
lp.connect(g);
g.connect(C.destination);
o.start(t);
o2.start(t);
o.stop(t + 1.9);
o2.stop(t + 1.9);
}
catch (e) { }
},
function () {
if (document.getElementById("dav-easel"))
return;
try {
if (document.exitPointerLock)
document.exitPointerLock();
}
catch (e) { }
var L = DAV.lite, W = L ? 384 : 512, H = L ? 480 : 640, E = { tool: "silver", col: "#6A4A2A", size: 3, guide: "none", undo: [], down: false, last: null };
var ov = document.createElement("div");
ov.id = "dav-easel";
ov.style.cssText = "position:fixed;inset:0;z-index:70;background:rgba(20,16,12,.92);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;overflow:auto;padding:8px;color:#F2E2BC;font:14px var(--serif,Georgia)";
var bar = "<div style='display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:720px;margin-bottom:6px'>" +
DAV_TOOLS.map(function (T) { return "<button class='btn' data-t='" + T[0] + "' title='" + T[2] + "' style='padding:4px 8px'>" + T[1] + "</button>"; }).join("") + "</div>" +
"<div style='display:flex;flex-wrap:wrap;gap:3px;justify-content:center;max-width:720px;margin-bottom:6px'>" +
DAV_PALETTE.map(function (P) { return "<span data-c='" + P[1] + "' title='" + P[0] + "' role='button' style='width:26px;height:26px;border-radius:13px;border:2px solid #3A2A1A;background:" + P[1] + ";cursor:pointer;display:inline-block'></span>"; }).join("") +
"<label style='margin-left:8px'>size <input id='dav-sz' type='range' min='1' max='24' value='3' style='width:90px;vertical-align:middle'></label>" +
"<select id='dav-gd' style='margin-left:6px'>" + DAV_GUIDES.map(function (G) { return "<option value='" + G[0] + "'>" + G[1] + "</option>"; }).join("") + "</select></div>";
ov.innerHTML = bar + "<div style='position:relative;touch-action:none'><canvas id='dav-cv' width='" + W + "' height='" + H + "' style='max-width:94vw;max-height:66vh;background:#EADFC8;border:6px solid #5A3A22;border-radius:2px;touch-action:none'></canvas>" +
"<canvas id='dav-gc' width='" + W + "' height='" + H + "' style='position:absolute;left:6px;top:6px;max-width:calc(94vw - 12px);max-height:calc(66vh - 12px);pointer-events:none;width:calc(100% - 12px);height:calc(100% - 12px)'></canvas></div>" +
"<div id='dav-tip' style='opacity:.8;margin:6px;max-width:640px;text-align:center'></div>" +
"<div style='display:flex;gap:6px;flex-wrap:wrap;justify-content:center'><button class='btn' id='dav-un'>↶ Undo</button><button class='btn' id='dav-cl'>New sheet</button><button class='btn' id='dav-sv'>🖼️ Hang it on my wall</button><button class='btn' id='dav-x'>Close</button></div>";
document.body.appendChild(ov);
var cv = document.getElementById("dav-cv"), x = cv.getContext("2d"), gc = document.getElementById("dav-gc"), gx = gc.getContext("2d");
function paper() { x.fillStyle = "#EADFC8"; x.fillRect(0, 0, W, H); var R = wRand(Date.now() % 9999); for (var i = 0; i < W * H / 60; i++) {
x.fillStyle = "rgba(150,120,80," + (R() * 0.05) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 2, 1 + R() * 2);
} }
paper();
var tips = { silver: "Silverpoint: a stylus of silver on paper coated with bone-ash. Lines are fine and pale and cannot be rubbed out; Leonardo learned with it in Verrocchio's workshop.", chalk: "Red chalk: Leonardo was among the first to use it. Press lightly for soft shading; it catches the grain of the paper.", ink: "Iron-gall ink: brown, made from oak galls. He hatched his shadows with it, from top left to bottom right, as a left-handed man does.",
brush: "His palette: earths (ochres, umber, sienna), minerals (ultramarine from lapis lazuli, dearer than gold; verdigris from copper), lead white, lamp black. He laid thin layers, one over another.", smoke: "Sfumato: draw the soft tool across a line to melt it into the shadow, 'without lines or borders, in the manner of smoke'.", rub: "Fresh breadcrumb lifts chalk and charcoal off the paper (silverpoint and ink stay)." };
function setTool(t) { E.tool = t; ov.querySelectorAll("[data-t]").forEach(function (b) { b.style.outline = b.getAttribute("data-t") === t ? "2px solid #E8C870" : "none"; }); document.getElementById("dav-tip").textContent = tips[t]; }
setTool("silver");
ov.querySelectorAll("[data-t]").forEach(function (b) { b.onclick = function () { setTool(b.getAttribute("data-t")); }; });
ov.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { E.col = b.getAttribute("data-c"); if (E.tool !== "brush" && E.tool !== "ink")
setTool("brush"); }; });
document.getElementById("dav-sz").oninput = function () { E.size = +this.value; };
function guide() {
gx.clearRect(0, 0, W, H);
if (E.guide === "none")
return;
gx.strokeStyle = "rgba(90,110,150,.45)";
gx.lineWidth = 1;
gx.beginPath();
if (E.guide === "head") {
var cx = W / 2, cy = H * 0.45, rw = W * 0.22, rh = H * 0.25;
gx.ellipse(cx, cy, rw, rh, 0, 0, 7);
gx.moveTo(cx, cy - rh);
gx.lineTo(cx, cy + rh);
[0, 1 / 3, 2 / 3].forEach(function (f) { var y = cy - rh * 0.55 + f * rh * 1.1; gx.moveTo(cx - rw, y); gx.lineTo(cx + rw, y); });
gx.moveTo(cx - rw, cy);
gx.lineTo(cx + rw, cy);
}
else if (E.guide === "figure") {
for (var i = 0; i <= 8; i++) {
var y2 = H * 0.06 + i * H * 0.11;
gx.moveTo(W * 0.25, y2);
gx.lineTo(W * 0.75, y2);
}
gx.moveTo(W / 2, H * 0.06);
gx.lineTo(W / 2, H * 0.94);
gx.ellipse(W / 2, H * 0.06 + H * 0.055, W * 0.06, H * 0.055, 0, 0, 7);
}
else if (E.guide === "persp") {
var vy = H * 0.42;
gx.moveTo(0, vy);
gx.lineTo(W, vy);
for (var j = 0; j <= 10; j++) {
gx.moveTo(j / 10 * W, H);
gx.lineTo(W / 2, vy);
}
for (var k = 1; k < 8; k++) {
var yy = vy + (H - vy) * Math.pow(k / 8, 1.8);
gx.moveTo(0, yy);
gx.lineTo(W, yy);
}
}
gx.stroke();
}
document.getElementById("dav-gd").onchange = function () { E.guide = this.value; guide(); };
function pos(ev) { var r = cv.getBoundingClientRect(); return { x: (ev.clientX - r.left) * W / r.width, y: (ev.clientY - r.top) * H / r.height }; }
function stroke(a, b, p) {
var d = Math.hypot(b.x - a.x, b.y - a.y), n = Math.max(1, Math.ceil(d / 1.5)), sz = E.size * (0.6 + 0.8 * (p || 0.5));
for (var i = 1; i <= n; i++) {
var px = a.x + (b.x - a.x) * i / n, py = a.y + (b.y - a.y) * i / n;
if (E.tool === "silver") {
x.fillStyle = "rgba(110,108,104,.55)";
x.fillRect(px - 0.5, py - 0.5, Math.max(1, sz * 0.35), Math.max(1, sz * 0.35));
}
else if (E.tool === "chalk") {
for (var g = 0; g < 3; g++) {
x.fillStyle = "rgba(168,76,52," + (0.12 + Math.random() * 0.18) + ")";
x.fillRect(px + (Math.random() - 0.5) * sz, py + (Math.random() - 0.5) * sz, 1 + Math.random() * 1.6, 1 + Math.random() * 1.6);
}
}
else if (E.tool === "ink") {
x.fillStyle = E.col === "#EDE6D6" ? "#5A3A1E" : E.col;
x.globalAlpha = 0.85;
x.beginPath();
x.arc(px, py, Math.max(0.6, sz * 0.3), 0, 7);
x.fill();
x.globalAlpha = 1;
}
else if (E.tool === "brush") {
x.fillStyle = E.col;
x.globalAlpha = 0.08;
x.beginPath();
x.arc(px, py, sz * 1.4, 0, 7);
x.fill();
x.globalAlpha = 1;
}
else if (E.tool === "smoke") {
var s = Math.max(4, sz * 2 | 0), sx = Math.max(0, px - s | 0), sy = Math.max(0, py - s | 0);
try {
var img = x.getImageData(sx, sy, s * 2, s * 2);
x.globalAlpha = 0.35;
x.filter = "blur(2px)";
x.putImageData(img, sx + (Math.random() - 0.5) * 1.5 | 0, sy + (Math.random() - 0.5) * 1.5 | 0);
x.drawImage(cv, sx, sy, s * 2, s * 2, sx, sy, s * 2, s * 2);
x.filter = "none";
x.globalAlpha = 1;
}
catch (e) {
x.filter = "none";
x.globalAlpha = 1;
}
}
else if (E.tool === "rub") {
x.fillStyle = "rgba(234,223,200,.35)";
x.beginPath();
x.arc(px, py, sz * 1.2, 0, 7);
x.fill();
}
}
}
function pushUndo() { try {
E.undo.push(x.getImageData(0, 0, W, H));
if (E.undo.length > (L ? 5 : 10))
E.undo.shift();
}
catch (e) { } }
cv.addEventListener("pointerdown", function (ev) { ev.preventDefault(); try {
cv.setPointerCapture(ev.pointerId);
}
catch (e) { } pushUndo(); E.down = true; E.last = pos(ev); stroke(E.last, E.last, ev.pressure); });
cv.addEventListener("pointermove", function (ev) { if (!E.down)
return; ev.preventDefault(); var p = pos(ev); stroke(E.last, p, ev.pressure); E.last = p; });
["pointerup", "pointercancel", "pointerleave"].forEach(function (n) { cv.addEventListener(n, function () { E.down = false; }); });
document.getElementById("dav-un").onclick = function () { var u = E.undo.pop(); if (u)
x.putImageData(u, 0, 0); };
document.getElementById("dav-cl").onclick = function () { pushUndo(); paper(); };
document.getElementById("dav-x").onclick = function () { ov.remove(); };
document.getElementById("dav-sv").onclick = function () {
var url = "";
try {
var sm = document.createElement("canvas");
sm.width = W / 2;
sm.height = H / 2;
sm.getContext("2d").drawImage(cv, 0, 0, W / 2, H / 2);
url = sm.toDataURL("image/jpeg", 0.62);
}
catch (e) { }
if (!url)
return;
var list = davArtList();
list.unshift({ u: url, at: Date.now() });
while (list.length > 8)
list.pop();
try {
localStorage.setItem("dav.art", JSON.stringify(list));
}
catch (e) {
list.pop();
try {
localStorage.setItem("dav.art", JSON.stringify(list));
}
catch (e2) { }
}
davArtWall();
var d = davData();
if (!d.painted) {
d.painted = 1;
davKeep("🖌️", "Your first drawing in the Bottega", "hung on the studio wall");
}
document.getElementById("dav-tip").innerHTML = "<b>Hung on your wall</b> in the Bottega's studio (this device keeps your last eight).";
};
},
function () {
var A = DAV.artWall;
if (!A || !A.grp)
return;
A.frames.forEach(function (f) { if (f.parent)
f.parent.remove(f); if (f.userData.tex)
f.userData.tex.dispose(); });
A.frames = [];
var list = davArtList(), frame = davC(0x6A4422);
for (var i = 0; i < 8; i++) {
var it = list[i], g = new THREE.Group();
g.position.set(A.x + i * 2.6, 2.6, A.z + 0.1);
A.grp.add(g);
g.userData.keep = 1;
A.frames.push(g);
wBox(1.9, 2.3, 0.08, frame, 0, 0, -0.04, g);
var mat;
if (it) {
var img = new Image(), tex = new THREE.Texture(img);
img.onload = function (t) { return function () { t.needsUpdate = true; }; }(tex);
img.src = it.u;
g.userData.tex = tex;
mat = new THREE.MeshLambertMaterial({ map: tex });
}
else
mat = davC(0xE4DAC4);
var c = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2), mat);
c.position.z = 0.01;
g.add(c);
}
},
function (i) {
i = i || 0;
if (DAV_UNDER[i])
return DAV_UNDER[i];
DAV_UNDER[i] = wTex(256, 320, function (x, W, H) {
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(100,70,40,.75)";
x.lineWidth = 1.4;
x.lineCap = "round";
function oval(cx, cy, rx, ry, a) { x.beginPath(); x.ellipse(cx, cy, rx, ry, a || 0, 0, 7); x.stroke(); }
x.strokeStyle = "rgba(100,110,130,.35)";
x.beginPath();
x.moveTo(0, H * 0.38);
x.quadraticCurveTo(W * 0.2, H * 0.28, W * 0.35, H * 0.36);
x.moveTo(W * 0.65, H * 0.34);
x.quadraticCurveTo(W * 0.85, H * 0.26, W, H * 0.36);
x.stroke();
x.strokeStyle = "rgba(100,70,40,.75)";
if (i === 0) {
oval(W / 2, H * 0.3, W * 0.13, H * 0.11);
x.beginPath();
x.moveTo(W * 0.37, H * 0.28);
x.quadraticCurveTo(W * 0.3, H * 0.5, W * 0.2, H * 0.62);
x.moveTo(W * 0.63, H * 0.28);
x.quadraticCurveTo(W * 0.7, H * 0.5, W * 0.8, H * 0.62);
x.moveTo(W * 0.44, H * 0.42);
x.lineTo(W * 0.42, H * 0.5);
x.moveTo(W * 0.56, H * 0.42);
x.lineTo(W * 0.58, H * 0.5);
x.moveTo(W * 0.2, H * 0.62);
x.quadraticCurveTo(W * 0.5, H * 0.5, W * 0.8, H * 0.62);
x.lineTo(W * 0.88, H);
x.moveTo(W * 0.2, H * 0.62);
x.lineTo(W * 0.12, H);
x.stroke();
oval(W * 0.46, H * 0.8, W * 0.1, H * 0.04, 0.2);
oval(W * 0.58, H * 0.8, W * 0.1, H * 0.04, -0.1);
x.beginPath();
x.moveTo(W * 0.45, H * 0.32);
x.quadraticCurveTo(W / 2, H * 0.335, W * 0.55, H * 0.32);
x.stroke();
}
else if (i === 1) {
oval(W * 0.45, H * 0.2, W * 0.08, H * 0.065);
oval(W * 0.5, H * 0.38, W * 0.075, H * 0.06);
oval(W * 0.35, H * 0.6, W * 0.06, H * 0.05);
x.beginPath();
x.moveTo(W * 0.45, H * 0.27);
x.lineTo(W * 0.2, H * 0.95);
x.moveTo(W * 0.45, H * 0.27);
x.lineTo(W * 0.82, H * 0.95);
x.moveTo(W * 0.5, H * 0.44);
x.quadraticCurveTo(W * 0.3, H * 0.55, W * 0.35, H * 0.65);
x.stroke();
}
else {
oval(W * 0.5, H * 0.32, W * 0.11, H * 0.09);
x.beginPath();
x.moveTo(W * 0.6, H * 0.45);
x.lineTo(W * 0.66, H * 0.18);
x.lineTo(W * 0.67, H * 0.06);
x.moveTo(W * 0.36, H * 0.42);
x.quadraticCurveTo(W * 0.3, H * 0.7, W * 0.22, H);
x.moveTo(W * 0.64, H * 0.42);
x.quadraticCurveTo(W * 0.7, H * 0.7, W * 0.78, H);
x.stroke();
}
x.strokeStyle = "rgba(100,70,40,.25)";
x.lineWidth = 1;
for (var h = 0; h < 60; h++) {
var hx = W * 0.12 + ((h * 37) % 70) / 100 * W, hy = H * 0.2 + ((h * 53) % 60) / 100 * H;
x.beginPath();
x.moveTo(hx, hy);
x.lineTo(hx + 8, hy + 8);
x.stroke();
}
});
return DAV_UNDER[i];
},
function (n) {
if (DAV_CART[n])
return DAV_CART[n];
var S = DAV.lite ? 512 : 1024;
DAV_CART[n] = wTex(S, S / 2, function (x, W, H) {
x.fillStyle = "#D8CCB0";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(40,30,20,.75)";
x.lineWidth = 2;
x.lineCap = "round";
var R = wRand(n * 17 + 3);
function man(px, py, s, a) { x.save(); x.translate(px, py); x.rotate(a || 0); x.beginPath(); x.arc(0, -48 * s, 9 * s, 0, 7); x.moveTo(0, -40 * s); x.lineTo(0, 0); x.moveTo(-18 * s, -30 * s); x.lineTo(0, -34 * s); x.lineTo(20 * s, -44 * s); x.moveTo(0, 0); x.lineTo(-12 * s, 30 * s); x.moveTo(0, 0); x.lineTo(14 * s, 28 * s); x.stroke(); x.restore(); }
function horse(px, py, s, f) {
x.save();
x.translate(px, py);
x.scale(f, 1);
x.beginPath();
x.ellipse(0, 0, 50 * s, 22 * s, 0, 0, 7);
x.moveTo(40 * s, -10 * s);
x.quadraticCurveTo(60 * s, -40 * s, 72 * s, -50 * s);
x.lineTo(84 * s, -40 * s);
x.moveTo(-30 * s, 15 * s);
x.lineTo(-36 * s, 52 * s);
x.moveTo(-14 * s, 18 * s);
x.lineTo(-26 * s, 50 * s);
x.moveTo(26 * s, 16 * s);
x.lineTo(46 * s, 40 * s);
x.moveTo(36 * s, 10 * s);
x.lineTo(60 * s, 22 * s);
x.moveTo(-50 * s, -4 * s);
x.quadraticCurveTo(-70 * s, 10 * s, -64 * s, 40 * s);
x.stroke();
x.restore();
}
if (n === 1) {
horse(W * 0.35, H * 0.55, H / 220, 1);
horse(W * 0.62, H * 0.52, H / 220, -1);
horse(W * 0.2, H * 0.62, H / 300, 1);
horse(W * 0.82, H * 0.6, H / 300, -1);
man(W * 0.36, H * 0.4, H / 240, -0.3);
man(W * 0.6, H * 0.38, H / 240, 0.4);
x.beginPath();
x.moveTo(W * 0.4, H * 0.28);
x.lineTo(W * 0.58, H * 0.22);
x.stroke();
x.fillStyle = "rgba(150,40,30,.5)";
x.fillRect(W * 0.56, H * 0.16, W * 0.05, H * 0.07);
for (var m = 0; m < 4; m++)
man(W * (0.3 + m * 0.12), H * 0.9, H / 320, (R() - 0.5) * 1.2);
}
else {
for (var b = 0; b < 14; b++)
man(W * (0.06 + b * 0.065), H * (0.55 + R() * 0.3), H / (200 + R() * 80), (R() - 0.5) * 0.8);
x.strokeStyle = "rgba(60,80,100,.4)";
x.beginPath();
x.moveTo(0, H * 0.85);
x.quadraticCurveTo(W / 2, H * 0.8, W, H * 0.88);
x.stroke();
}
x.fillStyle = "rgba(40,30,20,.08)";
for (var s2 = 0; s2 < 600; s2++)
x.fillRect(R() * W, R() * H, 2, 2);
});
return DAV_CART[n];
},
function () {
if (DAV_BATTLE)
return DAV_BATTLE;
var base = davCartoonTex(1).image, S = DAV.lite ? 512 : 1024;
DAV_BATTLE = wTex(S, S / 2, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#B8C4C8");
g.addColorStop(0.5, "#C8B890");
g.addColorStop(1, "#8A7A5A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.globalAlpha = 0.35;
x.fillStyle = "#8A6A4A";
x.beginPath();
x.ellipse(W * 0.35, H * 0.55, W * 0.1, H * 0.12, 0, 0, 7);
x.fill();
x.fillStyle = "#E8E0D0";
x.beginPath();
x.ellipse(W * 0.62, H * 0.52, W * 0.1, H * 0.12, 0, 0, 7);
x.fill();
x.fillStyle = "#A83A2A";
x.fillRect(W * 0.32, H * 0.32, W * 0.06, H * 0.12);
x.fillStyle = "#2A3A6A";
x.fillRect(W * 0.58, H * 0.3, W * 0.06, H * 0.12);
x.globalAlpha = 1;
try {
x.globalCompositeOperation = "multiply";
x.drawImage(base, 0, 0, W, H);
x.globalCompositeOperation = "source-over";
}
catch (e) { }
});
return DAV_BATTLE;
},
function () {
var A = DAV.anghiari;
if (!A || !A.grp)
return;
var d = davData(), st = d.ang || (d.ang = [0, 0, 0, 0, 0, 0]);
A.panels.forEach(function (p) { if (p.parent)
p.parent.remove(p); });
A.panels = [];
var pw = 6, ph = 4.2, bare = davSurf("plaster", 0xDAD2C0, 2), run = null;
for (var i = 0; i < 6; i++) {
var c = i % 3, r = (i / 3) | 0, mat = bare;
if (st[i] === 1) {
var t = davBattleTex().clone();
t.needsUpdate = true;
t.repeat.set(1 / 3, 1 / 2);
t.offset.set(c / 3, 1 - (r + 1) / 2);
mat = new THREE.MeshLambertMaterial({ map: t });
}
else if (st[i] === 2)
mat = run || (run = new THREE.MeshLambertMaterial({ map: davRunTex() }));
var m = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), mat);
m.position.set(A.x, 4 + ((1 - r) * ph), A.z + (c - 1) * pw);
m.rotation.y = -Math.PI / 2;
A.grp.add(m);
m.userData.keep = 1;
A.panels.push(m);
}
var cart = A.cart;
if (!cart) {
cart = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), new THREE.MeshLambertMaterial({ map: davCartoonTex(1) }));
cart.position.set(A.x - 0.05, 12.6, A.z);
cart.rotation.y = -Math.PI / 2;
A.grp.add(cart);
A.cart = cart;
}
},
function () {
if (DAV_RUN)
return DAV_RUN;
DAV_RUN = wTex(256, 180, function (x, W, H) {
x.fillStyle = "#C8B890";
x.fillRect(0, 0, W, H);
var R = wRand(1505);
for (var d = 0; d < 60; d++) {
var px = R() * W, py = R() * H * 0.5, l = H * 0.3 + R() * H * 0.6;
var g = x.createLinearGradient(0, py, 0, py + l);
g.addColorStop(0, ["#A83A2A", "#2A3A6A", "#6A4A2A", "#3A6A4A"][(R() * 4) | 0]);
g.addColorStop(1, "rgba(200,184,144,0)");
x.fillStyle = g;
x.fillRect(px, py, 2 + R() * 5, l);
}
});
return DAV_RUN;
},
function () {
var d = davData(), st = d.ang || (d.ang = [0, 0, 0, 0, 0, 0]), fns = {}, done = st.filter(function (s) { return s === 1; }).length;
var h = DAV_H + "🎨 The Battle of Anghiari</div><div style='opacity:.88;margin:4px 0 8px;line-height:1.45'>In 1503 Florence asked Leonardo to paint its victory at Anghiari (1440) on this wall: the fight for the standard, horses and men in a knot of fury. He did not want to paint fresco, quickly, on wet plaster. He tried a new way, from an old Roman book: oil colours on dry plaster, dried with the heat of fires. The lower part dried; the heat could not reach the top, and the colours ran. He left it unfinished. <b>Paint it, patch by patch.</b> " + done + " of 6 done.</div>";
st.forEach(function (s, i) {
var nm = ["top left", "top middle", "top right", "bottom left", "bottom middle", "bottom right"][i];
if (s === 1)
h += "<div style='margin:3px 0;opacity:.75'>✅ The " + nm + " patch: painted.</div>";
else {
h += worldBtn("p" + i, (s === 2 ? "Scrape and redo" : "Paint") + " the " + nm + " patch", s === 2 ? "The colours ran here" : "Bare plaster");
fns["p" + i] = function () { davAnghiariPatch(i); };
}
});
worldCard(h, fns);
},
function (i) {
var d = davData(), st = d.ang, top = i < 3;
worldCard(DAV_H + "How will you paint it?</div><div style='opacity:.85;margin:4px 0 8px'>Fresco is fast and lasts for ever, but you must finish each day's patch before the plaster dries, with no going back. Leonardo's way lets you work slowly, in oil, but it must dry by the heat of braziers.</div>" +
worldBtn("fresco", "Buon fresco", "Wet plaster, one day's patch, painted fast") + worldBtn("heat", "Leonardo's way: oil, dried by fire", top ? "High on the wall, far from the braziers" : "Low on the wall, near the braziers"), { fresco: function () { st[i] = 1; davSave(); davAnghiariWall(); davAngDone("<b>Fresco.</b> You lay fresh plaster, transfer the cartoon by pricking its lines and dusting charcoal through, and paint fast, wet into wet. By evening the patch is done, and the colour has become part of the wall.", i); },
heat: function () {
if (top) {
st[i] = 2;
davSave();
davAnghiariWall();
worldCard(DAV_H + "The colours run</div><div style='opacity:.88;margin-top:6px'>The braziers burn below, but their heat cannot reach so high: the oil stays wet, and slowly the colours <b>run down the wall</b>, just as they did for him in 1505. Scrape it back and paint it again (fresco will hold).</div>", {});
}
else {
st[i] = 1;
davSave();
davAnghiariWall();
davAngDone("<b>Oil, dried by fire.</b> The braziers are close below, and the heat dries the patch well. Low down, his way worked; this is the part people saw for sixty years.", i);
}
} });
},
function (msg, i) {
var d = davData(), n = d.ang.filter(function (s) { return s === 1; }).length;
setStatus("🎨 " + msg + " " + n + " of 6 patches done.");
worldCard(null);
if (n === 6 && !d.angDone) {
d.angDone = 1;
davSave();
setTimeout(function () { setStatus("🎨 <b>The Battle of Anghiari is finished</b>: the fight for the standard, in colour, on the wall of the Hall of the Five Hundred, as nobody has seen it for five hundred years."); davClaim("anghiari"); }, 1500);
}
else if (n === 6) {
setTimeout(function () { davClaim("anghiari"); }, 1500);
}
},
function (grp, x, z) {
var w = 3.2, h = 2.2, mat;
if (!DAV.lite && typeof renderer !== "undefined" && renderer && THREE.WebGLRenderTarget) {
var rt = new THREE.WebGLRenderTarget(256, 176);
DAV.obscura.rt = rt;
DAV.obscura.cam = new THREE.PerspectiveCamera(55, 256 / 176, 1, 900);
mat = new THREE.MeshBasicMaterial({ map: rt.texture });
}
else
mat = new THREE.MeshBasicMaterial({ map: davStreetTex() });
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
m.position.set(x, 1.8, z);
m.rotation.y = Math.PI / 2;
m.rotation.z = Math.PI;
grp.add(m);
m.userData.keep = 1;
DAV.obscura.m = m;
},
function () {
if (DAV_STREET)
return DAV_STREET;
DAV_STREET = wTex(256, 176, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#B8CCD8");
g.addColorStop(0.5, "#E8DCC0");
g.addColorStop(1, "#B8A888");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
[[0, 0.3, 0.3], [0.7, 0.25, 0.3]].forEach(function (b) { x.fillStyle = "#D8B88A"; x.fillRect(b[0] * W, b[1] * H, b[2] * W, H * 0.5); x.fillStyle = "#8A4A3A"; x.fillRect(b[0] * W, b[1] * H - 6, b[2] * W, 8); for (var w = 0; w < 4; w++) {
x.fillStyle = "#3A2A20";
x.fillRect(b[0] * W + 8 + w * 18, b[1] * H + 16, 8, 14);
} });
x.fillStyle = "#C8BCA8";
x.beginPath();
x.moveTo(W * 0.3, H);
x.lineTo(W * 0.45, H * 0.78);
x.lineTo(W * 0.6, H * 0.78);
x.lineTo(W * 0.7, H);
x.fill();
});
return DAV_STREET;
},
function (dt, L) {
var O = DAV.obscura;
if (!O || !O.rt || !O.m)
return;
if (Math.hypot(L.x - O.x, L.z - O.z) > 8)
return;
O.t = (O.t || 0) + dt;
if (O.t < 1)
return;
O.t = 0;
try {
if (renderer.xr && renderer.xr.isPresenting)
return;
var c = O.cam, F = DAV.flG;
c.position.set(DAV.base + 176, 4, -58);
c.lookAt(DAV.base + 120, 3, -58);
var was = [];
(DAV.outside || []).forEach(function (g) { was.push(g.visible); g.visible = true; });
var iv = DAV.insideOf && DAV.insideOf.grp;
if (iv)
iv.visible = false;
renderer.setRenderTarget(O.rt);
renderer.render(scene, c);
renderer.setRenderTarget(null);
(DAV.outside || []).forEach(function (g, i) { g.visible = was[i]; });
if (iv)
iv.visible = true;
}
catch (e) {
try {
renderer.setRenderTarget(null);
}
catch (e2) { }
}
},
function () {
if (DAV_VORT)
return DAV_VORT;
DAV_VORT = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#4E7A78";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(220,236,236,.45)";
x.lineWidth = 2;
for (var c = 0; c < 9; c++) {
x.beginPath();
for (var q = 0; q <= 80; q++) {
var a = q / 80 * Math.PI * 4 + c * 0.7, r = q / 80 * W * 0.48;
if (q)
x.lineTo(W / 2 + Math.cos(a) * r, H / 2 + Math.sin(a) * r);
else
x.moveTo(W / 2, H / 2);
}
x.stroke();
}
});
DAV_VORT.center = new THREE.Vector2(0.5, 0.5);
return DAV_VORT;
},
function (x, z) {
if (x > 45000)
return "inside";
if (Math.hypot(x, z - 20) < 720)
return "florence";
var best = null;
for (var i = 0; i < DAV_TOWNS.length; i++) {
var T = DAV_TOWNS[i];
if (T.k === "florence" || T.k === "oltrarno")
continue;
var d = Math.hypot(x - T.x, z - T.z);
if (d < T.r + 20 && (!best || d < best.d))
best = { k: T.k, d: d };
}
if (best)
return best.k === "chateau" ? "amboise" : best.k;
if (Math.hypot(x - DAV_CECERI.x, z - DAV_CECERI.z) < 260)
return "ceceri";
if (x > 2250 && z > -1750 && z < 700)
return "romagna";
if (x < -3150)
return "amboise";
return "hills";
},
function (L) {
var z = DAV.zone;
if (z === "inside") {
var I = DAV.insideOf;
if (I && I.key === "closluce") {
if (L.x > I.x - 190)
return "the tunnel under the hill";
if (L.x > I.x - 205)
return "the cellar of Clos Lucé";
}
if (I && I.key === "duomo" && DAV.helix && Math.hypot(L.x - DAV.helix.x, L.z - DAV.helix.z) < 10)
return "the climb between the dome's two shells";
return I ? I.name : "inside";
}
if (z === "underwater")
return "on the bed of the river";
var best = null, bd = 1e9;
for (var k in DAV_SPOTS) {
var S = DAV_SPOTS[k], d = Math.hypot(L.x - S.x, L.z - S.z);
if (d < (k === "arrive" ? 60 : 90) && d < bd) {
bd = d;
best = S.name;
}
}
if (DAV.lantern && camera.position.y - 1.72 > DAV.lantern.y - 3 && Math.hypot(L.x - DAV.lantern.x, L.z - DAV.lantern.z) < 10)
return "the lantern of the dome";
if (best)
return best;
return { florence: "Florence", proving: "the Proving Ground", ceceri: "Monte Ceceri", vinci: "Vinci", anchiano: "Anchiano", milan: "Milan", amboise: "Amboise, on the Loire", imola: "Imola", romagna: "the Romagna (Borgia's war country)", hills: L.z < -2000 ? "the mountains" : "the Tuscan hills" }[z] || "Leonardo's Italy";
},
function (x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet;
var fl = davFloorsAt(DAV.floors, x, z, f);
if (x > 45000) {
var hy = DAV.helix ? davHelixY(x, z, f) : null;
if (hy !== null && (fl === null || hy > fl))
fl = hy;
return fl === null ? 0 : fl;
}
var land = davLand(x, z), w = davWaterAt(x, z), g = land;
if (w !== null && land < w) {
var R = DAV.ride;
if (R && R.k === "boat")
g = w - 0.2;
else if (DAV.dive)
g = land;
else
g = w - 1.3;
}
return fl !== null && fl > g ? fl : g;
},
function (x, z) {
for (var i = 0; i < DAV.floors.length; i++) {
var F = DAV.floors[i];
if (!F.inside)
continue;
var lx = x - F.x, lz = z - F.z;
if (F.r !== undefined) {
if (lx * lx + lz * lz <= F.r * F.r)
return true;
}
else if (Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd)
return true;
}
if (DAV.helix && Math.hypot(x - DAV.helix.x, z - DAV.helix.z) < DAV_HELIX.r1 + 0.2)
return true;
return false;
},
function (x, z, feet) {
if (x > 45000) {
if (davSolidAt(x, z, feet))
return true;
return !davInsideWalk(x, z);
}
var B = DAV_BOUND;
if (x < B.x0 || x > B.x1 || z < B.z0 || z > B.z1)
return true;
var R = DAV.ride;
if (R && R.k === "boat" && davWaterAt(x, z) === null)
return true;
if (R && (R.M.kind === "fly" || R.M.kind === "glide" || R.M.kind === "hover" || R.M.kind === "chute") && feet > davLand(x, z) + 30)
return false;
return davSolidAt(x, z, feet);
},
function (dt, L) {
var keep = [];
DAV.fx.forEach(function (f) {
var live = true;
if (f.k === "vortex") {
var m = f.m.material.map;
if (m) {
m.rotation += dt * 0.35;
}
}
else if (f.k === "smoke") {
f.t += dt;
f.m.position.y += dt * 1.4;
f.m.scale.multiplyScalar(1 + dt * 0.4);
f.m.material.opacity = Math.max(0, 0.5 * (1 - f.t / 3));
if (f.t > 3) {
if (f.m.parent)
f.m.parent.remove(f.m);
live = false;
}
}
else if (f.k === "bolt") {
f.t += dt;
f.m.position.x += f.dx * 60 * dt;
f.m.position.z += f.dz * 60 * dt;
f.m.position.y -= dt * 2;
if (f.t > 1.4) {
if (f.m.parent)
f.m.parent.remove(f.m);
live = false;
}
}
else if (f.k === "knight") {
f.t += dt;
var k = f.g.userData.k;
if (k) {
var p = f.t < 6 ? Math.sin(f.t / 6 * Math.PI) : 0;
k.rotation.y = Math.sin(f.t * 1.2) * 0.5 * p;
k.position.y = 0.9 + p * 0.15;
var Lm = k.userData.limbs;
if (Lm && Lm.la && Lm.ra) {
Lm.la.rotation.x = -p * 2.2;
Lm.ra.rotation.x = -p * 2.2;
}
}
if (f.t > 6.2)
live = false;
}
else if (f.k === "lion") {
f.t += dt;
var g = f.g, fwd = Math.min(1, f.t / 3), ry = g.rotation.y;
g.position.x = f.x0 - Math.sin(ry) * 3 * fwd;
g.position.z = f.z0 - Math.cos(ry) * 3 * fwd;
g.position.y = (g.userData.y0 !== undefined ? g.userData.y0 : (g.userData.y0 = g.position.y)) + Math.abs(Math.sin(f.t * 4)) * 0.08 * (fwd < 1 ? 1 : 0);
if (g.userData.lilies)
g.userData.lilies.visible = f.t > 3.4 && f.t < 11;
if (f.t > 12) {
g.position.x = f.x0;
g.position.z = f.z0;
g.position.y = g.userData.y0;
live = false;
}
}
else if (f.k === "bridge") {
f.t += dt;
var q = f.t < 4 ? f.t / 4 : f.t < 8 ? 1 : Math.max(0, 1 - (f.t - 8) / 4);
f.g.rotation.y = f.from + q * Math.PI / 2;
if (f.t > 12) {
f.g.rotation.y = f.from;
live = false;
}
}
else if (f.k === "heart") {
f.t += dt;
f.dots.forEach(function (D) { D.a += dt * (1.6 + D.r); D.m.position.set(Math.cos(D.a) * D.r, 2 + Math.sin(D.a * 2) * 0.25, Math.sin(D.a) * D.r * 0.6); });
}
else if (f.k === "pupil") {
f.t += dt;
f.m.scale.setScalar(0.8 + 0.3 * Math.sin(f.t * 0.6));
}
else if (f.k === "spin") {
f.m.rotation.y += dt * f.sp;
f.m.rotation.x += dt * f.sp * 0.4;
}
if (live)
keep.push(f);
});
DAV.fx = keep;
(DAV.kites || []).forEach(function (K) { K.a += dt * K.sp; K.g.position.set(DAV_CECERI.x + Math.cos(K.a) * K.r, K.y + Math.sin(K.a * 0.5) * 4, DAV_CECERI.z + Math.sin(K.a) * K.r); K.g.rotation.y = -K.a; K.g.rotation.z = 0.3; });
(DAV.targets || []).forEach(function (T) { if (T.hit > 0) {
T.hit = Math.max(0, T.hit - dt);
T.g.rotation.x = Math.sin(T.hit * 12) * 0.2 * T.hit;
} });
DAV.people.forEach(function (P) { if (!P.wander)
return; var p = P.g.position; if (Math.abs(p.x - L.x) > 150 || Math.abs(p.z - L.z) > 150)
return; if (P.y0 === undefined)
P.y0 = p.y; wWander(P.g, dt, function () { return P.y0; }, P.wander); });
},
function (L) {
var inside = L.x > 45000, far = DAV.lite ? 1500 : 3600;
(DAV.outside || []).forEach(function (g) { if (!g.userData.dist) {
if (g.visible === inside)
g.visible = !inside;
} });
DAV.districts.forEach(function (D) { var on = !inside && Math.hypot(L.x - D.x, L.z - D.z) < D.r + far; if (D.g.visible !== on)
D.g.visible = on; });
davTreesVis(L);
for (var k in DAV_IN) {
var I = DAV_IN[k];
if (I.grp) {
var on2 = inside && Math.abs(L.x - I.x) < I.hw + 40;
if (I.grp.visible !== on2)
I.grp.visible = on2;
}
}
},
function (dt) {
var L = worldLocal();
DAV.t += dt;
if (!DAV.built || DAV.moving)
return;
var feet = camera.position.y - 1.72, zone = davZoneAt(L.x, L.z);
if (DAV.dive && zone !== "inside") {
var w = davWaterAt(L.x, L.z);
if (w !== null && feet < w - 1)
zone = "underwater";
}
if (zone !== DAV.zone) {
var was = DAV.zone;
DAV.zone = zone;
if (zone === "romagna" && was !== "romagna")
setStatus("⚔️ <b>The Romagna.</b> Cesare Borgia's war country: mercenaries, deserters, wolves and boar. It is <b>Dangerous</b> out here. Imola's walls are safe.");
}
DAV.insideOf = davInAt(L.x);
if (WLD.arrive && (WLD.arrive.x !== DAV_SPOTS.arrive.x || WLD.arrive.z !== DAV_SPOTS.arrive.z))
WLD.arrive = { x: DAV_SPOTS.arrive.x, z: DAV_SPOTS.arrive.z };
davRideTick(dt, L);
davDiveTick(L);
davObscuraTick(dt, L);
davWaterTick(dt);
davFxTick(dt, L);
DAV.vt += dt;
if (DAV.vt > 0.4) {
DAV.vt = 0;
davVisTick(L);
}
DAV.dt2 = (DAV.dt2 || 0) + dt;
if (DAV.dt2 > 6) {
DAV.dt2 = 0;
davInDrop();
}
var R = DAV.ride, extra = R ? " · riding " + esc(R.M.name) + (R.M.wpn && R.cd > 0 ? " (reloading)" : "") : DAV.dive ? " · in the Diving Suit" : "";
if (zone !== "inside" && R && (R.M.kind === "fly" || R.M.kind === "hover" || R.M.kind === "glide" || R.M.kind === "chute"))
extra += " · " + Math.max(0, Math.round(feet - davLand(L.x, L.z))) + " m up";
worldBanner("<b>🎨 Leonardo's Italy</b> · " + esc(davPlaceName(L)) + extra);
DAV.pt += dt;
if (DAV.pt < 0.15)
return;
DAV.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
if (document.getElementById("dav-easel")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
if (R && R.M.kind !== "fixed") {
worldPrompt("<b>" + esc(R.M.name) + "</b> · " + (R.M.wpn ? "<b>F</b> or the button to fire · " : "") + "the 🛬 button to get off", null);
return;
}
DAV.talk.forEach(function (T) { var p = T.p.g.position; if (Math.abs(p.y - feet) > 3)
return; cand(p.x, p.z, T.r, function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk"); });
DAV.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y !== undefined ? s.y : (s.x > 45000 ? 0 : davLand(s.x, s.z));
if (Math.abs(sy - feet) > 2.8)
return;
cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
},
function (D) {
if (typeof gwBake !== "function")
return;
function hasLimbs(o) { var y = false; o.traverse(function (c) { if (c.userData.limbs)
y = true; }); return y; }
D.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !hasLimbs(c)) {
try {
gwBake(c);
}
catch (e) { }
c.userData.keep = 1;
c.userData.baked = 1;
} });
try {
gwBake(D);
}
catch (e) {
if (window.console)
console.warn("[davinci] bake", e);
}
},
function (G) {
DAV.G = G;
DAV.lite = typeof LITE !== "undefined" && !!LITE;
DAV.solids = [];
DAV.sgrid = null;
DAV.floors = [];
DAV.spots = [];
DAV.talk = [];
DAV.people = [];
DAV.glows = [];
DAV.fx = [];
DAV.rooms = [];
DAV.districts = [];
DAV.water = [];
DAV.kites = [];
DAV.targets = [];
DAV.ride = null;
DAV.dive = false;
DAV.helix = null;
DAV.obscura = null;
DAV.artWall = null;
DAV.anghiari = null;
DAV.horse = null;
DAV.pgAt = {};
DAV_JETTIES.length = 0;
for (var k in DAV_IN) {
DAV_IN[k].built = false;
DAV_IN[k].grp = null;
}
davGridMake();
var parts = [];
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[davinci] " + name, e);
} }
step("terrain", function () { davTerrain(G); });
step("water", function () { davWaterBuild(G); });
step("roads", function () { davRoads(G); });
step("trees", function () { davTrees(G); });
step("florence", function () { davFlorence(G); });
step("proving", function () { davProving(G); });
step("ceceri", function () { davCeceri(G); });
step("vinci", function () { davVinci(G); });
step("anchiano", function () { davAnchiano(G); });
step("milan", function () { davMilan(G); });
step("amboise", function () { davAmboise(G); });
step("imola", function () { davImola(G); });
step("coaches", function () { davCoaches(G); });
step("pages", function () { davPagesOut(G); });
step("jetties", function () {
var J = new THREE.Group();
J.name = "dav-jetties";
G.add(J);
davJetty(J, 900, davArnoZ(900) - 52, 0.2, 0, "A jetty on the Arno");
davJetty(J, -2300, davArnoZ(-2300) - 52, davLand(-2300, davArnoZ(-2300) - 60) + 0.2, 0, "A jetty on the Arno, below Vinci");
davJetty(J, -3880, DAV_LOIRE.z + 56, DAV_LOIRE.y + 2.6, Math.PI, "A jetty on the Loire");
DAV.districts.push({ g: J, x: -1200, z: -1200, r: 4000 });
});
step("lantern", function () { var Ln = DAV.lantern; if (Ln)
davSpot(Ln.sx, Ln.sz, 2.6, "The rail of the lantern, ninety metres up", "take a parachute and step off", function () { davRideOn("chute"); setTimeout(function () { var p = camera.position; p.x += 3; }, 60); }, Ln.y); });
davHorseBronze();
DAV.districts.forEach(function (D) { davBakeTree(D.g); });
DAV.districts.forEach(function (D) { D.g.userData.dist = 1; });
(DAV.treeTiles || []).forEach(function (T) { T.g.userData.dist = 1; });
DAV.outside = G.children.slice();
DAV.built = true;
},
function (opt) {
opt = opt || {};
var A = DAV_SPOTS.arrive;
DAV.zone = "florence";
DAV.insideOf = null;
DAV.moving = false;
camera.position.set(DAV.base + A.x, davGround(A.x, A.z, 1e4) + 1.72, A.z);
yaw = Math.atan2(-(DAV_PV.x - A.x), -(DAV_PV.z - A.z));
pitch = 0;
davStateFetch();
setStatus("<b>Leonardo's Italy.</b> Florence, about 1504: the Piazza della Signoria, the Palazzo Vecchio's tower before you, the cathedral's great dome over the roofs. Leonardo's workshop, the Bottega, is a short walk north-east; his machines wait at the Proving Ground, east along the river. Post coaches go to Vinci, Milan, Amboise and Imola. Everything is <b>Safe</b> here except the Romagna's open country, far to the east. The 🎨 Leonardo menu has the rest.");
},
function () {
for (var k in DAV.mats) {
var m = DAV.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in DAV.tex) {
var x = DAV.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
["G", "grid", "sgrid", "helix", "obscura", "artWall", "anghiari", "horse", "lantern", "treeTiles", "outside", "pageMesh", "ceceriBird", "niche", "flParts", "flQuads", "mm"].forEach(function (k) { DAV[k] = null; });
DAV.mats = {};
DAV.tex = {};
DAV.solids = [];
DAV.floors = [];
DAV.spots = [];
DAV.talk = [];
DAV.people = [];
DAV.fx = [];
DAV.districts = [];
DAV.kites = [];
DAV.targets = [];
DAV.pgAt = {};
DAV.built = false;
for (var i in DAV_IN) {
DAV_IN[i].built = false;
DAV_IN[i].grp = null;
}
DAV_FAC = {};
DAV_MARB = {};
DAV_TREE = {};
DAV_RIP = null;
DAV_CLOCK = null;
DAV_TTREE = null;
DAV_ASSE = null;
DAV_SUPPER = null;
DAV_TAPESTRY = {};
DAV_MARK = {};
DAV_IMAP = null;
DAV_RINGS = null;
DAV_STRATA = null;
DAV_PAGE = null;
DAV_PLAQUE = null;
DAV_UNDER = {};
DAV_CART = {};
DAV_BATTLE = null;
DAV_RUN = null;
DAV_STREET = null;
DAV_VORT = null;
},
function () {
var keeper = typeof amKeeper === "function" && amKeeper(), b = "", fns = {}, d = davData();
var rows = [["Where", "Florence (where you arrive), the Proving Ground, Monte Ceceri, Vinci and Anchiano, Milan, Amboise and Clos Lucé, Imola and the Romagna"],
["To do", "Ride and fly his machines; read his notebooks (in mirror writing); the lessons; the mirror riddles; paint at the easel; the Battle of Anghiari; cast the Great Horse; the Master's examination"],
["Danger", "Safe everywhere but the Romagna's open country (Dangerous), far to the east"],
["Yours so far", Object.keys(d.lessons).length + " of " + DAV_LESSONS.length + " lessons, " + Object.keys(d.riddles).length + " of " + DAV_RIDDLES.length + " riddles, " + DAV_PAGES_OUT.filter(function (P, k) { return d.pages["o" + k]; }).length + " of " + DAV_PAGES_OUT.length + " pages" + (d.maestro ? ", a Maestro" : "")]];
if (WLD.on === DAV_KEY) {
if (DAV.ride) {
b += worldBtn("off", "🛬 Get off " + esc(DAV.ride.M.name), "");
fns.off = function () { worldCard(null); davRideOff(); };
}
if (DAV.dive) {
b += worldBtn("undive", "🤿 Take off the Diving Suit", "");
fns.undive = function () { worldCard(null); davDive(false); };
}
if (!DAV.ride && DAV.zone === "inside" && DAV.insideOf && DAV.insideOf.out) {
b += worldBtn("out", "Go back outside", "Out of " + esc(DAV.insideOf.name));
fns.out = function () { davLeave(DAV.insideOf.key); };
}
b += worldBtn("book", "📚 The notebooks and the lessons", "What you have read and learned");
fns.book = function () { davCodexCard(); };
b += worldBtn("mach", "🪽 The machines", "All thirteen, and where they are");
fns.mach = function () { davMachList(); };
b += worldBtn("coach", "🐎 The post coaches", "Ride to any town");
fns.coach = function () { davCoachCard(null); };
b += worldBtn("cos", "👗 Costumes from Leonardo's Italy", DAV_COSTUMES.length + " to buy and wear anywhere");
fns.cos = function () { davCostumeCard(); };
b += worldBtn("home", "Leave Leonardo's Italy", "Back to where you came from");
fns.home = function () { worldCard(null); davHome(); };
}
else {
if (!WLD.on) {
b += worldBtn("go", "Go to Leonardo's Italy", "Arrive in Florence, in the Piazza della Signoria");
fns.go = function () { worldCard(null); davGo({}); };
}
if (!WLD.on && typeof toHall === "function") {
b += worldBtn("hall", "Take me to the Hall of Doors", "Its door, carved with an endless knot, stands among the world doors");
fns.hall = function () { worldCard(null); toHall(); };
}
b += worldBtn("cos", "👗 Costumes from Leonardo's Italy", DAV_COSTUMES.length + " to buy and wear anywhere");
fns.cos = function () { davCostumeCard(); };
if (keeper && WLD.on) {
b += worldBtn("kgo", "Go now (Keeper)", "Straight to Florence");
fns.kgo = function () { worldCard(null); davGo({}); };
}
}
worldCard(worldFacts("🎨 Leonardo's Italy", "Leonardo da Vinci's world: Florence, Milan, Amboise, his machines and his notebooks", rows, []) + b, fns);
},
function () {
var h = DAV_H + "🪽 Leonardo's machines</div><div style='opacity:.8;margin:4px 0 6px'>Built full size from his drawings at the Proving Ground, east of Florence by the river. The Great Bird flies from Monte Ceceri.</div>", fns = {};
DAV_MACHINES.forEach(function (M) { h += worldBtn("m" + M.k, M.icon + " " + esc(M.name.charAt(0).toUpperCase() + M.name.slice(1)), esc(M.src)); fns["m" + M.k] = function () { davMachineCard(M.k); }; });
worldCard(h, fns);
},
function (C) {
var d = dreamer(), L = meLook();
if (!d.ctCos) {
var prev = {};
DAV_COS_KEYS.forEach(function (k) { prev[k] = L[k] === undefined ? null : L[k]; });
d.ctPrev = prev;
}
["layer", "back", "hat", "face", "neck", "ears", "hands", "waist"].forEach(function (k) { L[k] = null; });
DAV_COS_KEYS.forEach(function (k) { if (C.look[k] !== undefined)
L[k] = C.look[k]; });
d.ctCos = "dav_" + C.k;
L.src = L.src || {};
DAV_COS_KEYS.forEach(function (k) { if (L[k] != null)
L.src[k] = "chosen"; });
rebuildMe();
try {
save();
}
catch (e) { }
setStatus("👗 You're wearing <b>" + esc(C.name) + "</b>. Take it off from the Wardrobe or the 🎨 Leonardo menu.");
},
function (C, after) {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in and join Somnucor to buy costumes.");
return;
}
var go = function (rows) {
var it = (rows || []).filter(function (r) { return r.archetype === "dav_" + C.k; })[0];
if (!it) {
setStatus("🎨 The costumes from Leonardo's Italy come to the shop with the next update.");
return;
}
Promise.resolve(buyItem(it.id, null)).then(function () { if (after)
setTimeout(after, 600); });
};
if (typeof TAILOR !== "undefined" && TAILOR && TAILOR.some(function (r) { return r.archetype === "dav_" + C.k; }))
go(TAILOR);
else if (typeof catalogueRows === "function")
catalogueRows().then(go).catch(function () { go([]); });
},
function (sure) {
var worn = davCosWorn(), fns = {}, h = DAV_H + "👗 Costumes from Leonardo's Italy</div><div style='opacity:.8;font-size:12px;margin-bottom:6px'>Clothes of Leonardo's time and the people of his life. Bought once, yours for good. Wearing one keeps your own face and body.</div>";
if (worn) {
h += worldBtn("off", "Take off the costume you're wearing", null);
fns.off = function () { davCosOff(); davCostumeCard(); };
}
DAV_COSTUMES.forEach(function (C) {
var own = davCosOwned(C), k = C.k, isW = worn === "dav_" + k;
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;margin:4px 0;font-size:12.5px'><span><b>" + esc(C.name) + "</b>" + (own ? " <span style='opacity:.6'>· yours</span>" : " <span style='opacity:.7'>· " + Number(C.price).toLocaleString() + " gold</span>") + "</span>";
if (isW)
h += "<span style='opacity:.7'>wearing</span>";
else if (own) {
h += "<span data-w='w_" + k + "' role='button' tabindex='0' style='padding:3px 10px;border:1px solid rgba(143,232,160,.6);border-radius:4px'>Wear</span>";
fns["w_" + k] = function () { davCosWear(C); davCostumeCard(); };
}
else {
var conf = sure === k;
h += "<span data-w='b_" + k + "' role='button' tabindex='0' style='padding:3px 10px;border:1px solid rgba(232,200,120,.7);border-radius:4px'>" + (conf ? "Tap to confirm: " + Number(C.price).toLocaleString() + " gold" : "Buy") + "</span>";
fns["b_" + k] = function () { if (!conf)
return davCostumeCard(k); davCosBuy(C, function () { davCostumeCard(); }); };
}
h += "</div>";
});
worldCard(h, fns);
},
function () {
var L = [
{ x: 52, z: 110, n: "PIAZZA DELLA SIGNORIA", m: "Piazza della Signoria", home: 1 }, { x: 30, z: -112, n: "THE DUOMO", m: "the Duomo" }, { x: -60, z: -32, n: "THE OLD MARKET", m: "Old Market" }, { x: -20, z: 200, n: "PONTE VECCHIO", m: "Ponte Vecchio" },
{ x: 168, z: -58, n: "VERROCCHIO'S BOTTEGA", m: "the Bottega" }, { x: 244, z: 40, n: "SANTA CROCE", m: "Santa Croce" }, { x: -292, z: -160, n: "SANTA MARIA NOVELLA", m: "Santa Maria Novella" }, { x: -60, z: -280, n: "SAN LORENZO", m: "San Lorenzo" },
{ x: 150, z: -228, n: "HOSPITAL · S. M. NUOVA", m: "the hospital" }, { x: -8, z: -45, n: "ORSANMICHELE", m: "Orsanmichele" }, { x: -80, z: 420, n: "PALAZZO PITTI", m: "Palazzo Pitti" }
];
var gl = { "Porta San Gallo": ["PORTA SAN GALLO · MILAN", "Porta San Gallo (to Milan)"], "Porta al Prato": ["PORTA AL PRATO · VINCI", "Porta al Prato (to Vinci)"], "Porta alla Croce": ["PORTA ALLA CROCE · MACHINES", "Porta alla Croce (to the machines)"], "Porta Romana": ["PORTA ROMANA · SOUTH", "Porta Romana"] };
DAV_GATES.forEach(function (G) { if (G.x !== undefined) {
var r = Math.hypot(G.x, G.z - 20), k = (r - 30) / r, n = gl[G.n] || [G.n.toUpperCase(), G.n];
L.push({ x: G.x * k, z: 20 + (G.z - 20) * k, n: n[0], m: n[1], gate: 1 });
} });
return L;
},
function (names) {
if (DAV_WAYS)
return DAV_WAYS;
var S = DAV.lite ? 512 : 1024, cw = S / 4, ch = S / 25.6, cells = {}, n = 0;
var tex = wTex(S, S, function (x) {
x.fillStyle = "#E8E2D6";
x.fillRect(0, 0, S, S);
names.forEach(function (it) {
var c = n % 4, r = (n / 4) | 0, X = c * cw, Y = r * ch;
cells[it.k] = { u0: X / S, v0: 1 - (Y + ch) / S, u1: (X + cw) / S, v1: 1 - Y / S };
n++;
if (it.kind === "plaque") {
x.fillStyle = "#EEE9DF";
x.fillRect(X, Y, cw, ch);
x.strokeStyle = "rgba(120,110,100,.18)";
x.lineWidth = 1;
for (var v = 0; v < 3; v++) {
x.beginPath();
x.moveTo(X + Math.random() * cw, Y);
x.bezierCurveTo(X + Math.random() * cw, Y + ch * 0.3, X + Math.random() * cw, Y + ch * 0.7, X + Math.random() * cw, Y + ch);
x.stroke();
}
x.strokeStyle = "#9A9286";
x.lineWidth = Math.max(1, ch * 0.05);
x.strokeRect(X + ch * 0.12, Y + ch * 0.12, cw - ch * 0.24, ch - ch * 0.24);
x.fillStyle = "#1E1A16";
davFitText(x, it.t, X + cw / 2, Y + ch * 0.54, cw - ch * 0.6, ch * 0.56, "bold", "Georgia, 'Times New Roman', serif");
}
else {
var g = x.createLinearGradient(0, Y, 0, Y + ch);
g.addColorStop(0, "#4A3422");
g.addColorStop(0.5, "#3A2818");
g.addColorStop(1, "#2A1C10");
x.fillStyle = g;
x.fillRect(X, Y, cw, ch);
x.fillStyle = "rgba(0,0,0,.25)";
for (var w = 0; w < 6; w++)
x.fillRect(X, Y + Math.random() * ch, cw, 1);
x.strokeStyle = "#C8A458";
x.lineWidth = Math.max(1, ch * 0.05);
x.strokeRect(X + ch * 0.1, Y + ch * 0.1, cw - ch * 0.2, ch - ch * 0.2);
x.fillStyle = "#F0D890";
davFitText(x, it.t, X + cw / 2, Y + ch * 0.54, cw - ch * 0.5, ch * 0.54, "bold", "Georgia, 'Times New Roman', serif");
}
});
});
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
tex.encoding = THREE.sRGBEncoding;
tex.anisotropy = DAV.lite ? 1 : 4;
var mat = new THREE.MeshLambertMaterial({ map: tex });
return (DAV_WAYS = { tex: tex, mat: mat, cells: cells });
},
function (D, A) {
var grp = new THREE.Group();
grp.name = "dav-fl-plaques";
D.add(grp);
var frame = DAV.lite ? null : davC(0xB8B0A2), y = 4.25, PW = 1.7, PH = 0.27;
function put(name, x, z, ry) {
var c = A.cells["p:" + name];
if (!c)
return;
var m = new THREE.Mesh(davWaysPlane(PW, PH, c), A.mat);
m.position.set(x, y, z);
m.rotation.y = ry;
grp.add(m);
if (frame) {
var f = wBox(PW + 0.12, PH + 0.12, 0.05, frame, 0, 0, -0.03, m);
}
}
(DAV.flBlocks || []).forEach(function (B) {
var o = 0.07, e = 1.4;
put(davStName("ew", B.bz, B.south), B.x0 + e, B.z0 - o, Math.PI);
put(davStName("ns", B.bx, B.south), B.x0 - o, B.z0 + e, -Math.PI / 2);
put(davStName("ew", B.bz + 58, B.south), B.x1 - e, B.z1 + o, 0);
put(davStName("ns", B.bx + 66, B.south), B.x1 + o, B.z1 - e, Math.PI / 2);
});
return grp;
},
function (grp, A, x, z, dests, o) {
o = o || {};
if (!davFlClear(x, z, 2.4))
return null;
var g = new THREE.Group();
g.position.set(x, 0, z);
grp.add(g);
var stone = davSurf("stone", 0xB8AC98, 1.5), oak = davC(0x4A3422), iron = davC(0x2A2622, { shine: 30 }), gold = davC(0xB8923A, { shine: 40 });
wCyl(0.42, 0.5, 0.5, stone, 0, 0.25, 0, g, DAV.lite ? 6 : 10);
wCyl(0.13, 0.15, 4.4, oak, 0, 2.7, 0, g, DAV.lite ? 6 : 8);
if (!DAV.lite)
[1.1, 2.2].forEach(function (h) { wCyl(0.16, 0.16, 0.08, iron, 0, h, 0, g, 8); });
wCyl(0.2, 0.2, 0.1, iron, 0, 4.95, 0, g, 8);
wBox(0.3, 0.36, 0.3, iron, 0, 5.2, 0, g);
wBox(0.2, 0.24, 0.2, davGlowM(0xFFD8A0), 0, 5.2, 0, g);
wCone(0.26, 0.3, iron, 0, 5.53, 0, g, 4).rotation.y = Math.PI / 4;
dests.slice(0, 4).forEach(function (d, i) {
var c = A.cells["d:" + d.n];
if (!c)
return;
var a = Math.atan2(d.z - z, d.x - x), arm = new THREE.Group();
arm.position.y = 4.25 - i * 0.42;
arm.rotation.y = -a;
g.add(arm);
var L = 2.05, H = 0.32;
wBox(L, H, 0.06, oak, 0.15 + L / 2, 0, 0, arm);
var tip = new THREE.Mesh(davFlTipGeo(H), oak);
tip.position.set(0.15 + L, 0, 0);
arm.add(tip);
var f = new THREE.Mesh(davWaysPlane(L - 0.08, H - 0.06, c), A.mat);
f.position.set(0.15 + L / 2, 0, 0.032);
arm.add(f);
var b = new THREE.Mesh(davWaysPlane(L - 0.08, H - 0.06, c), A.mat);
b.position.set(0.15 + L / 2, 0, -0.032);
b.rotation.y = Math.PI;
arm.add(b);
if (!DAV.lite)
wBox(0.05, H + 0.04, 0.1, gold, 0.12, 0, 0, arm);
});
davSolid({ x: x, z: z, r: 0.5, h: 5.6 });
DAV.flStats.posts.push([Math.round(x), Math.round(z)]);
return g;
},
function (D, A, dests) {
var grp = new THREE.Group();
grp.name = "dav-fl-posts";
D.add(grp);
function pick(x, z, extra) {
var home = dests[0], list = [];
dests.forEach(function (d) { var r = Math.hypot(d.x - x, d.z - z); if (r > 34)
list.push({ d: d, r: r }); });
list.sort(function (a, b) { return a.r - b.r; });
var out = [];
if (Math.hypot(home.x - x, home.z - z) > 34)
out.push(home);
if (extra)
extra.forEach(function (e) { if (out.indexOf(e) < 0)
out.push(e); });
for (var i = 0; i < list.length && out.length < 4; i++) {
var d = list[i].d;
if (out.indexOf(d) >= 0)
continue;
var a = Math.atan2(d.z - z, d.x - x), close = out.some(function (o) { var b = Math.atan2(o.z - z, o.x - x); return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b))) < 0.32; });
if (!close)
out.push(d);
}
return out;
}
var gates = dests.filter(function (d) { return d.gate; });
[[74, 100], [30, -92], [-30, -8], [-20, 186], [150, -30], [230, 10], [-292, -142], [-60, -262], [150, -214], [-80, 392], [110, 8]].forEach(function (p) { davFlPost(grp, A, p[0], p[1], pick(p[0], p[1])); });
gates.forEach(function (G) { davFlPost(grp, A, G.x, G.z, pick(G.x, G.z, [])); });
var have = {};
(DAV.flBlocks || []).forEach(function (B) { have[B.bx + "," + B.bz] = 1; });
var done = {};
(DAV.flBlocks || []).forEach(function (B) {
[[B.bx, B.bz], [B.bx + 66, B.bz], [B.bx, B.bz + 58], [B.bx + 66, B.bz + 58]].forEach(function (c) {
var k = c[0] + "," + c[1];
if (done[k])
return;
done[k] = 1;
var kx = Math.round((c[0] + 500) / 66), kz = Math.round((c[1] + 440) / 58);
var n = (have[c[0] + "," + c[1]] ? 1 : 0) + (have[(c[0] - 66) + "," + c[1]] ? 1 : 0) + (have[c[0] + "," + (c[1] - 58)] ? 1 : 0) + (have[(c[0] - 66) + "," + (c[1] - 58)] ? 1 : 0);
if (n < 2 || (n < 3 && (kx % 2 || kz % 2)))
return;
if (davFlKept(c[0] - 6, c[1] - 6, c[0] + 6, c[1] + 6))
return;
if (Math.abs(c[1] - davArnoZ(c[0])) < 50)
return;
var near = gates.filter(function (G) { return Math.hypot(G.x - c[0], G.z - c[1]) < 260; });
davFlPost(grp, A, c[0], c[1], pick(c[0], c[1], near));
});
});
return grp;
},
function (dests) {
if (DAV_FLMAP)
return DAV_FLMAP;
var S = DAV.lite ? 512 : 1024, k = S / (DAV_FLMAP_R * 2);
function P(x, z) { return [(x + DAV_FLMAP_R) * k, (z + DAV_FLMAP_R - 40) * k]; }
var t = wTex(S, S, function (x) {
var g = x.createRadialGradient(S / 2, S / 2, S * 0.1, S / 2, S / 2, S * 0.75);
g.addColorStop(0, "#EFE2C2");
g.addColorStop(1, "#D2BC8E");
x.fillStyle = g;
x.fillRect(0, 0, S, S);
for (var i = 0; i < S * 2; i++) {
x.fillStyle = "rgba(120,90,50," + (Math.random() * 0.05) + ")";
x.fillRect(Math.random() * S, Math.random() * S, 2, 2);
}
x.fillStyle = "rgba(120,140,80,.22)";
x.fillRect(0, 0, S, S);
x.beginPath();
for (var a = 0; a <= 64; a++) {
var A = a / 64 * Math.PI * 2, r = davFlWallR(A), p = P(Math.cos(A) * r, Math.sin(A) * r + 20);
if (a)
x.lineTo(p[0], p[1]);
else
x.moveTo(p[0], p[1]);
}
x.closePath();
x.fillStyle = "#EADBB8";
x.fill();
x.lineWidth = S * 0.008;
x.strokeStyle = "#7A5A3A";
x.stroke();
x.fillStyle = "#C9A27A";
(DAV.flBlocks || []).forEach(function (B) { var a = P(B.x0, B.z0), b = P(B.x1, B.z1); x.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); });
x.beginPath();
for (var X = -DAV_FLMAP_R; X <= DAV_FLMAP_R; X += 20) {
var p2 = P(X, davArnoZ(X));
if (X === -DAV_FLMAP_R)
x.moveTo(p2[0], p2[1]);
else
x.lineTo(p2[0], p2[1]);
}
x.lineWidth = S * 0.03;
x.strokeStyle = "#6A94A8";
x.stroke();
x.strokeStyle = "#6A4A2A";
x.lineWidth = S * 0.008;
DAV_BRIDGES.forEach(function (B) { var z = davArnoZ(B.x), a2 = P(B.x, z - 34), b2 = P(B.x, z + 34); x.beginPath(); x.moveTo(a2[0], a2[1]); x.lineTo(b2[0], b2[1]); x.stroke(); });
x.fillStyle = "#3A5A6A";
x.font = "italic " + Math.round(S * 0.022) + "px Georgia";
x.textAlign = "center";
var ap = P(380, davArnoZ(380));
x.fillText("the river Arno", ap[0], ap[1] + S * 0.028);
var big = [{ x: 30, z: -150, r: 22, c: "#C86A48", n: "The Duomo" }, { x: 84, z: 52, r: 14, c: "#8A6A48", n: "Palazzo Vecchio" }];
big.forEach(function (b) { var p3 = P(b.x, b.z); x.fillStyle = b.c; x.beginPath(); x.arc(p3[0], p3[1], b.r * k, 0, Math.PI * 2); x.fill(); x.strokeStyle = "#4A2A1A"; x.lineWidth = 2; x.stroke(); });
dests.forEach(function (d) {
var p4 = P(d.x, d.z);
x.fillStyle = d.gate ? "#7A2A1A" : "#2A3A6A";
x.beginPath();
x.arc(p4[0], p4[1], S * 0.011, 0, Math.PI * 2);
x.fill();
x.font = "bold " + Math.round(S * 0.028) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "bottom";
var lab = d.m || d.n;
var ly = p4[1] - S * 0.014;
if (d.n === "PIAZZA DELLA SIGNORIA" || d.n === "ORSANMICHELE" || d.n === "SANTA CROCE")
ly = p4[1] + S * 0.042;
if (d.gate)
ly = d.z < 0 ? p4[1] + S * 0.05 : p4[1] - S * 0.02;
x.lineWidth = 4;
x.strokeStyle = "rgba(240,228,200,.9)";
x.strokeText(lab, p4[0], ly);
x.fillStyle = "#2A1C10";
x.fillText(lab, p4[0], ly);
});
DAV_GATES.forEach(function (Gt) {
if (Gt.x === undefined)
return;
var p5 = P(Gt.x, Gt.z), p6 = P(Gt.x * 1.12, (Gt.z - 20) * 1.12 + 20);
x.strokeStyle = "#7A2A1A";
x.lineWidth = S * 0.006;
x.beginPath();
x.moveTo(p5[0], p5[1]);
x.lineTo(p6[0], p6[1]);
x.stroke();
});
x.fillStyle = "#3A2410";
x.textAlign = "left";
x.textBaseline = "top";
x.font = "bold " + Math.round(S * 0.046) + "px Georgia";
x.fillText("FLORENCE", S * 0.03, S * 0.025);
x.font = "italic " + Math.round(S * 0.022) + "px Georgia";
x.fillText("about 1504 · north is up", S * 0.03, S * 0.08);
var cx = S * 0.9, cy = S * 0.1, R = S * 0.05;
x.fillStyle = "#7A2A1A";
x.beginPath();
x.moveTo(cx, cy - R);
x.lineTo(cx + R * 0.25, cy);
x.lineTo(cx, cy + R);
x.lineTo(cx - R * 0.25, cy);
x.fill();
x.fillStyle = "#3A2410";
x.textAlign = "center";
x.textBaseline = "bottom";
x.font = "bold " + Math.round(S * 0.03) + "px Georgia";
x.fillText("N", cx, cy - R - 2);
x.strokeStyle = "#5A3A1A";
x.lineWidth = S * 0.012;
x.strokeRect(S * 0.006, S * 0.006, S * 0.988, S * 0.988);
});
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (DAV_FLMAP = new THREE.MeshLambertMaterial({ map: t }));
},
function (grp, x, z, mapMat) {
if (!davFlClear(x, z, 2))
return null;
var g = new THREE.Group();
g.position.set(x, 0, z);
grp.add(g);
var oak = davC(0x4A3422), W = 3.0, y = 2.4;
[-1, 1].forEach(function (s) { wBox(0.2, 4.1, 0.2, oak, s * (W / 2 + 0.12), 2.05, 0, g); });
wBox(W + 0.4, W + 0.4, 0.12, oak, 0, y, -0.07, g);
var m = new THREE.Mesh(new THREE.PlaneGeometry(W, W), mapMat);
m.position.set(0, y, 0.0);
g.add(m);
var r = new THREE.Mesh(davRoofGeo(W + 0.6, 0.8, 0.5, 0.15, true), davRoofMat());
r.position.set(0, 4.1, 0);
g.add(r);
var u = (x + DAV_FLMAP_R) / (DAV_FLMAP_R * 2), v = (z + DAV_FLMAP_R - 40) / (DAV_FLMAP_R * 2);
if (u > 0.02 && u < 0.98 && v > 0.02 && v < 0.98) {
var px = -W / 2 + u * W, py = y + W / 2 - v * W;
wSph(0.07, davC(0xC81E1E, { e: 0x601010 }), px, py, 0.06, g, 10);
wCyl(0.012, 0.012, 0.12, davC(0x2A2622), px, py, 0.02, g, 4).rotation.x = Math.PI / 2;
}
davSign(["YOU ARE HERE", "the red pin"], 1.4, 0.32, 0, y - W / 2 - 0.32, 0.02, 0, g);
davSolid({ x: x, z: z, hw: W / 2 + 0.4, hd: 0.3, h: 4.4 });
return g;
},
function (D, dests) {
var grp = new THREE.Group();
grp.name = "dav-fl-maps";
D.add(grp);
var mat = davFlMapTex(dests);
[[62, 112], [44, -86], [-40, -4], [-40, 184], [230, 20], [-300, -130], [-70, 384]].forEach(function (p) { davFlMapBoard(grp, p[0], p[1], mat); });
dests.forEach(function (d) { if (!d.gate)
return; var r = Math.hypot(d.x, d.z - 20), k = (r - 22) / r; davFlMapBoard(grp, d.x * k + 6, 20 + (d.z - 20) * k, mat); });
return grp;
},
function (D) {
var grp = new THREE.Group();
grp.name = "dav-fl-marks";
D.add(grp);
function stele(x, z, ry, lines) {
if (!davFlClear(x, z, 1.2))
return;
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
grp.add(g);
davBoxM(1.5, 1.2, 0.45, davSurf("stone", 0xC8BCA8, 1.2), 0, 0.6, 0, g);
var s = wSign(lines, 1.3, 0.75, "#EEE8DC", "#2A2018");
s.position.set(0, 1.62, 0.05);
g.add(s);
wBox(1.46, 0.86, 0.12, davSurf("stone", 0xB8AC98, 1.2), 0, 1.62, -0.03, g);
davSolid({ x: x, z: z, r: 0.9, h: 2.1 });
}
stele(46, 96, 0, ["THE PALAZZO VECCHIO", "seat of the Republic · tower 94 m"]);
stele(84, 150, Math.PI, ["THE LOGGIA", "where the city speaks to its people"]);
stele(18, -100, 0, ["SANTA MARIA DEL FIORE", "Brunelleschi's dome, 1436 · climb it"]);
stele(-46, -112, Math.PI / 2, ["THE BAPTISTERY", "Ghiberti's bronze doors"]);
stele(-20, -24, Math.PI, ["ORSANMICHELE", "the guilds' church and their saints"]);
stele(-6, 190, 0, ["PONTE VECCHIO", "goldsmiths' shops over the Arno"]);
stele(50, 44, -Math.PI / 2, ["MICHELANGELO'S DAVID", "set up here, September 1504"]);
},
function (x, z) {
if (Math.hypot(x, z - 20) > DAV_FL_R + 30)
return null;
for (var i = 0; i < DAV_FL_SQ.length; i++) {
var Q = DAV_FL_SQ[i];
if (x > Q[0] && x < Q[2] && z > Q[1] && z < Q[3])
return Q[4];
}
var south = z > davArnoZ(x);
if (Math.abs(z - davArnoZ(x)) < 46)
return south ? "the Lungarno, the south bank" : "the Lungarno, by the Arno";
var lx = -500 + 66 * Math.round((x + 500) / 66), lz = -440 + 58 * Math.round((z + 440) / 58);
var a = Math.abs(x - lx) < 4.6 ? davStName("ns", lx, south) : null, b = Math.abs(z - lz) < 4.6 ? davStName("ew", lz, south) : null;
function nice(s) { return s.toLowerCase().replace(/(^|\s|')\S/g, function (c) { return c.toUpperCase(); }).replace(/^Via |^Borgo |^Costa |^Sdrucciolo /, function (c) { return c; }).replace(/ De' /g, " de' ").replace(/ Degli /g, " degli ").replace(/ Della /g, " della ").replace(/ Dell'/g, " dell'").replace(/ Del /g, " del ").replace(/ Dei /g, " dei ").replace(/ Di /g, " di "); }
if (a && b)
return "the corner of " + nice(a) + " and " + nice(b);
if (a)
return nice(a);
if (b)
return nice(b);
return null;
},
function (D) {
var dests = davFlDest(), items = [];
DAV.flStats = { posts: [], blocks: (DAV.flBlocks || []).length };
var seen = {};
function add(kind, t) { var k = (kind === "plaque" ? "p:" : "d:") + t; if (seen[k])
return; seen[k] = 1; items.push({ k: k, kind: kind, t: t }); }
[DAV_ST_NS, DAV_ST_EW, DAV_ST_NS_S, DAV_ST_EW_S].forEach(function (T) { for (var k in T)
add("plaque", T[k]); });
dests.forEach(function (d) { add("dest", d.n); });
var A = davWaysAtlas(items);
function step(n, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[davinci] florence " + n, e);
} }
step("plaques", function () { davFlPlaques(D, A); });
step("posts", function () { davFlPosts(D, A, dests); });
step("maps", function () { davFlMaps(D, dests); });
step("marks", function () { davFlMarks(D); });
},
function () {
if (DAV_EMB)
return DAV_EMB;
var S = DAV.lite ? 32 : 64, W = S * 8;
var bg = ["#7A2A1E", "#2A4A6A", "#8A6A2A", "#5A2A4A", "#2A5A3A", "#3A3A3A", "#2A5A6A", "#6A3A1E"];
var t = wTex(W, S, function (x) {
for (var i = 0; i < 8; i++) {
var X = i * S, c = X + S / 2, m = S / 2;
x.fillStyle = bg[i];
x.fillRect(X, 0, S, S);
x.strokeStyle = "#D8B060";
x.lineWidth = S * 0.06;
x.strokeRect(X + S * 0.06, S * 0.06, S * 0.88, S * 0.88);
x.fillStyle = "#E8C870";
x.strokeStyle = "#E8C870";
x.lineWidth = S * 0.07;
x.beginPath();
var k = DAV_EMB_N[i];
if (k === "key") {
x.arc(c - S * 0.18, m, S * 0.12, 0, Math.PI * 2);
x.stroke();
x.fillRect(c - S * 0.06, m - S * 0.035, S * 0.32, S * 0.07);
x.fillRect(c + S * 0.18, m, S * 0.05, S * 0.12);
x.fillRect(c + S * 0.08, m, S * 0.05, S * 0.09);
}
else if (k === "boot") {
x.moveTo(c - S * 0.12, S * 0.22);
x.lineTo(c + S * 0.04, S * 0.22);
x.lineTo(c + S * 0.04, S * 0.58);
x.lineTo(c + S * 0.26, S * 0.66);
x.lineTo(c + S * 0.26, S * 0.78);
x.lineTo(c - S * 0.12, S * 0.78);
x.fill();
}
else if (k === "loaf") {
x.ellipse(c, m + S * 0.04, S * 0.28, S * 0.16, 0, 0, Math.PI * 2);
x.fill();
x.strokeStyle = bg[i];
x.lineWidth = S * 0.03;
[-0.12, 0, 0.12].forEach(function (o) { x.beginPath(); x.moveTo(c + S * o - S * 0.04, m - S * 0.06); x.lineTo(c + S * o + S * 0.04, m + S * 0.12); x.stroke(); });
}
else if (k === "flask") {
x.arc(c, m + S * 0.1, S * 0.2, 0, Math.PI * 2);
x.fill();
x.fillRect(c - S * 0.05, S * 0.18, S * 0.1, S * 0.24);
}
else if (k === "shears") {
x.arc(c - S * 0.12, S * 0.68, S * 0.09, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.arc(c + S * 0.12, S * 0.68, S * 0.09, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.moveTo(c - S * 0.08, S * 0.6);
x.lineTo(c + S * 0.1, S * 0.18);
x.moveTo(c + S * 0.08, S * 0.6);
x.lineTo(c - S * 0.1, S * 0.18);
x.stroke();
}
else if (k === "anvil") {
x.moveTo(c - S * 0.3, S * 0.36);
x.lineTo(c + S * 0.22, S * 0.36);
x.lineTo(c + S * 0.3, S * 0.3);
x.lineTo(c + S * 0.22, S * 0.48);
x.lineTo(c + S * 0.08, S * 0.5);
x.lineTo(c + S * 0.14, S * 0.74);
x.lineTo(c - S * 0.18, S * 0.74);
x.lineTo(c - S * 0.1, S * 0.5);
x.lineTo(c - S * 0.22, S * 0.48);
x.fill();
}
else if (k === "fish") {
x.ellipse(c - S * 0.04, m, S * 0.24, S * 0.11, 0, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.moveTo(c + S * 0.18, m);
x.lineTo(c + S * 0.32, m - S * 0.12);
x.lineTo(c + S * 0.32, m + S * 0.12);
x.fill();
}
else {
x.fillRect(c - S * 0.24, S * 0.26, S * 0.22, S * 0.46);
x.fillRect(c + S * 0.02, S * 0.26, S * 0.22, S * 0.46);
x.fillStyle = bg[i];
x.fillRect(c - S * 0.01, S * 0.24, S * 0.02, S * 0.5);
}
}
});
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (DAV_EMB = { tex: t, mat: new THREE.MeshLambertMaterial({ map: t }) });
},
function (col) {
var k = String(col);
if (DAV_AWN[k])
return DAV_AWN[k];
var t = wTex(64, 16, function (x, W, H) { for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#EEE6D4" : davHex(col);
x.fillRect(i * W / 8, 0, W / 8, H);
} x.fillStyle = "rgba(0,0,0,.12)"; x.fillRect(0, H - 3, W, 3); });
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (DAV_AWN[k] = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
},
function () {
if (DAV_SHRINE)
return DAV_SHRINE;
var W = DAV.lite ? 64 : 128, H = W * 1.5;
var t = wTex(W, H, function (x) {
x.fillStyle = "#C8A048";
x.fillRect(0, 0, W, H);
x.fillStyle = "#2A3E7A";
x.beginPath();
x.moveTo(W * 0.1, H * 0.95);
x.lineTo(W * 0.1, H * 0.35);
x.arc(W / 2, H * 0.35, W * 0.4, Math.PI, 0);
x.lineTo(W * 0.9, H * 0.95);
x.fill();
for (var i = 0; i < 20; i++) {
x.fillStyle = "rgba(232,200,112,.8)";
x.fillRect(W * 0.15 + Math.random() * W * 0.7, H * 0.1 + Math.random() * H * 0.5, 1.5, 1.5);
}
x.fillStyle = "#E8C870";
x.beginPath();
x.arc(W / 2, H * 0.33, W * 0.14, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#E8C8A8";
x.beginPath();
x.arc(W / 2, H * 0.34, W * 0.08, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#2A4A9A";
x.beginPath();
x.moveTo(W / 2, H * 0.4);
x.lineTo(W * 0.75, H * 0.92);
x.lineTo(W * 0.25, H * 0.92);
x.fill();
x.fillStyle = "#A82A2A";
x.beginPath();
x.moveTo(W / 2, H * 0.45);
x.lineTo(W * 0.62, H * 0.92);
x.lineTo(W * 0.38, H * 0.92);
x.fill();
});
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (DAV_SHRINE = new THREE.MeshLambertMaterial({ map: t }));
},
function (D) {
var R = wRand(9104), lite = DAV.lite;
var iron = davC(0x2A2622, { shine: 30 }), glow = davGlowM(0xFFD8A0), stone = davSurf("stone", 0xC0B4A0, 1.4), gutter = davSurf("stone", 0x8A8274, 1.2), oak = davC(0x4A3422);
var awn = [0xA83A2A, 0x2A5A8A, 0x3A6A3A, 0xC8A040, 0x7A3A5A, 0xD8CCB0], cloth = [0xE8E0D0, 0xC84A3A, 0x3A5A8A, 0xD8B860, 0x8AA86A, 0xF0ECE4];
var E = davEmblems();
function lantern(g, x, z, nx, nz) {
var b = wBox(Math.abs(nx) * 0.7 + 0.06, 0.06, Math.abs(nz) * 0.7 + 0.06, iron, x + nx * 0.35, 3.55, z + nz * 0.35, g);
wBox(0.3, 0.42, 0.3, iron, x + nx * 0.72, 3.25, z + nz * 0.72, g);
wBox(0.2, 0.28, 0.2, glow, x + nx * 0.72, 3.25, z + nz * 0.72, g);
wCone(0.24, 0.24, iron, x + nx * 0.72, 3.58, z + nz * 0.72, g, 4).rotation.y = Math.PI / 4;
}
function shopSign(g, x, z, nx, nz, i) {
wBox(Math.abs(nx) * 1.25 + 0.05, 0.05, Math.abs(nz) * 1.25 + 0.05, iron, x + nx * 0.62, 3.3, z + nz * 0.62, g);
var ry = Math.atan2(nx, nz) + Math.PI / 2;
var b = new THREE.Mesh(davEmbPlane(0.72, 0.72, i), E.mat);
b.position.set(x + nx * 0.82, 2.85, z + nz * 0.82);
b.rotation.y = ry;
g.add(b);
var b2 = new THREE.Mesh(davEmbPlane(0.72, 0.72, i), E.mat);
b2.position.copy(b.position);
b2.rotation.y = ry + Math.PI;
g.add(b2);
wBox(Math.abs(nx) * 0.8 + 0.04, 0.8, Math.abs(nz) * 0.8 + 0.04, oak, x + nx * 0.82, 2.85, z + nz * 0.82, g);
if (!lite)
[-0.3, 0.3].forEach(function (o) { wBox(0.02, 0.16, 0.02, iron, x + nx * (0.82 + o), 3.2, z + nz * (0.82 + o), g); });
b.position.x += nz * 0.025;
b.position.z -= nx * 0.025;
b2.position.x -= nz * 0.025;
b2.position.z += nx * 0.025;
}
function awning(g, x, z, nx, nz, len) {
var col = davAwnMat(awn[(R() * awn.length) | 0]), d = 1.3;
var a = new THREE.Mesh(davAwnGeo(len, d, !!nx), col);
a.position.set(x + nx * d / 2 * 0.95, 3.05, z + nz * d / 2 * 0.95);
if (nx)
a.rotation.z = -nx * 0.36;
else
a.rotation.x = nz * 0.36;
g.add(a);
var v = new THREE.Mesh(davAwnGeo(len, 0.28, !!nx, 1), col);
v.position.set(x + nx * d * 0.94, 3.05 - Math.sin(0.36) * d / 2 - 0.14, z + nz * d * 0.94);
g.add(v);
if (!lite)
[-1, 1].forEach(function (s) { var r = wBox(Math.abs(nx) * d + 0.03, 0.03, Math.abs(nz) * d + 0.03, iron, x + nx * d / 2 + Math.abs(nz) * s * len / 2, 2.95, z + nz * d / 2 + Math.abs(nx) * s * len / 2, g); });
}
function bench(g, x, z, nx, nz, len) {
var b = wBox(Math.abs(nz) * len + Math.abs(nx) * 0.5, 0.45, Math.abs(nx) * len + Math.abs(nz) * 0.5, stone, x + nx * 0.27, 0.225, z + nz * 0.27, g);
davSolid({ x: x + nx * 0.27, z: z + nz * 0.27, hw: (Math.abs(nz) * len + Math.abs(nx) * 0.5) / 2, hd: (Math.abs(nx) * len + Math.abs(nz) * 0.5) / 2, h: 0.45 });
}
function shrine(g, x, z, nx, nz) {
var ry = Math.atan2(nx, nz);
var f = wBox(Math.abs(nz) * 1.3 + Math.abs(nx) * 0.3, 1.9, Math.abs(nx) * 1.3 + Math.abs(nz) * 0.3, stone, x + nx * 0.15, 3.3, z + nz * 0.15, g);
wBox(Math.abs(nz) * 1.5 + Math.abs(nx) * 0.5, 0.14, Math.abs(nx) * 1.5 + Math.abs(nz) * 0.5, stone, x + nx * 0.25, 4.3, z + nz * 0.25, g);
wBox(Math.abs(nz) * 1.4 + Math.abs(nx) * 0.45, 0.1, Math.abs(nx) * 1.4 + Math.abs(nz) * 0.45, stone, x + nx * 0.22, 2.33, z + nz * 0.22, g);
var p = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.42), davShrineMat());
p.position.set(x + nx * 0.31, 3.3, z + nz * 0.31);
p.rotation.y = ry;
g.add(p);
wBox(0.12, 0.16, 0.12, glow, x + nx * 0.42, 2.48, z + nz * 0.42, g);
if (!lite)
[-0.4, 0.4].forEach(function (o) { wSph(0.09, davC(0xC83A3A), x + nx * 0.42 + nz * o, 2.47, z + nz * 0.42 + nx * o, g, 6); });
}
function washing(g, x0, z0, x1, z1, y) {
var l = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(z1 - z0, x1 - x0);
var r = wBox(l, 0.02, 0.02, davC(0xC8C0B0), (x0 + x1) / 2, y, (z0 + z1) / 2, g);
r.rotation.y = -a;
var n = 4 + ((R() * 4) | 0);
for (var i = 0; i < n; i++) {
var t = (i + 0.5 + R() * 0.4) / (n + 0.4), w = 0.5 + R() * 0.6, h = 0.5 + R() * 0.7;
var c = wBox(w, h, 0.02, davC(cloth[(R() * cloth.length) | 0]), x0 + (x1 - x0) * t, y - h / 2, z0 + (z1 - z0) * t, g);
c.rotation.y = -a;
}
}
(DAV.flBlocks || []).forEach(function (B) {
var g = B.g, dc = Math.hypot((B.x0 + B.x1) / 2, (B.z0 + B.z1) / 2);
var gn = davBoxM(B.x1 - B.x0 + 9, 0.06, 0.55, gutter, (B.x0 + B.x1) / 2, 0.05, B.bz, g), gw = davBoxM(0.55, 0.06, B.z1 - B.z0, gutter, B.bx, 0.05, (B.z0 + B.z1) / 2, g);
lantern(g, B.x1, B.z0, 0, -1);
lantern(g, B.x0, B.z1, 0, 1);
[[B.x0, B.z0, B.x1, B.z0, 0, -1], [B.x0, B.z1, B.x1, B.z1, 0, 1], [B.x0, B.z0, B.x0, B.z1, -1, 0], [B.x1, B.z0, B.x1, B.z1, 1, 0]].forEach(function (S, si) {
var ax = S[0], az = S[1], bx = S[2], bz = S[3], nx = S[4], nz = S[5], len = Math.hypot(bx - ax, bz - az), dx = (bx - ax) / len, dz = (bz - az) / len;
function at(t) { return [ax + dx * t + nx * 0.02, az + dz * t + nz * 0.02]; }
var used = [];
function free(t, hw) { for (var u = 0; u < used.length; u++)
if (Math.abs(used[u][0] - t) < used[u][1] + hw + 0.6)
return false; used.push([t, hw]); return true; }
if (R() < (lite ? 0.06 : 0.12) && free(len * 0.5, 0.9)) {
var q3 = at(len * 0.5);
shrine(g, q3[0], q3[1], nx, nz);
}
var ns = lite ? 1 : (R() < 0.55 ? 2 : 1);
for (var i = 0; i < ns; i++) {
if (R() < (lite ? 0.45 : 0.7)) {
var ts = 6 + R() * (len - 12);
if (free(ts, 0.6)) {
var p = at(ts);
shopSign(g, p[0], p[1], nx, nz, (R() * 8) | 0);
}
}
}
if (R() < (lite ? 0.25 : 0.45)) {
var al = 2.4 + R() * 1.2, ta = 5 + R() * (len - 10);
if (free(ta, al / 2)) {
var q = at(ta);
awning(g, q[0], q[1], nx, nz, al);
}
}
if (!lite && R() < 0.3) {
var bl = 4 + R() * 6, q2 = at(3 + R() * (len - bl - 6) + bl / 2);
bench(g, q2[0], q2[1], nx, nz, bl);
}
});
if (!lite && dc > 230 && R() < 0.22) {
var wx = B.x0 + 6 + R() * (B.x1 - B.x0 - 12);
washing(g, wx, B.z0 - 0.05, wx + (R() - 0.5) * 3, B.z0 - 8.9, 6.6 + R() * 1.8);
}
});
},
function (D) {
var g = new THREE.Group();
g.name = "dav-fl-david";
D.add(g);
var x = 56, z = 50, m = davSurf("marble", 0xE4DED2, 1.2);
davBoxM(2.6, 0.5, 2.6, m, x, 0.25, z, g);
davBoxM(2, 2.2, 2, m, x, 1.6, z, g);
davBoxM(2.4, 0.3, 2.4, m, x, 2.85, z, g);
var st = wPerson("dav_david", { look: { sex: "m", topKind: "tee", layer: null, top: 0xE8E2D6, bottom: 0xE8E2D6, skin: 0xE8E2D6, hair: 0xE8E2D6, shoes: 0xE8E2D6, hat: "none" } });
st.position.set(x, 3.0, z);
st.rotation.y = -Math.PI / 2;
st.scale.setScalar(2.9);
g.add(st);
davSolid({ x: x, z: z, r: 1.6, h: 12 });
davSpot(x - 2.4, z, 3, "Michelangelo's David", "look up at him", function () { setStatus("🗿 <b>Michelangelo's David</b>: carved from a single block of Carrara marble that others had given up on, and set up here before the Palazzo Vecchio in September 1504. Leonardo sat on the committee that chose where he should stand. Five metres tall, watching over the Republic."); });
},
function (x, W, H, base) {
x.fillStyle = base;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 14; i++) {
var cx = Math.random() * W, cy = Math.random() * H, r = W * (0.15 + Math.random() * 0.35), g = x.createRadialGradient(cx, cy, 0, cx, cy, r), dk = Math.random() < 0.5;
g.addColorStop(0, dk ? "rgba(80,60,40,.07)" : "rgba(255,250,235,.08)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
}
for (var j = 0; j < W * H / 60; j++) {
x.fillStyle = Math.random() < 0.5 ? "rgba(0,0,0,.035)" : "rgba(255,255,255,.04)";
x.fillRect(Math.random() * W, Math.random() * H, 1, 1);
}
for (var k = 0; k < W / 14; k++) {
var sx = Math.random() * W;
x.fillStyle = "rgba(60,45,30," + (0.015 + Math.random() * 0.03) + ")";
x.fillRect(sx, 0, 1 + Math.random() * 2, H * (0.2 + Math.random() * 0.6));
}
},
function (x, z, y, r) {
if (davWaterAt(x, z) !== null)
return false;
for (var a = 0; a < 8; a++) {
var px = x + Math.cos(a * 0.785) * r, pz = z + Math.sin(a * 0.785) * r;
if (davSolidAt(px, pz, y + 0.5))
return false;
if (Math.abs(davLand(px, pz) - y) > 1.0)
return false;
}
if (davSolidAt(x, z, y + 0.5))
return false;
if (typeof davInsideWalk === "function" && davInsideWalk(x, z))
return false;
return true;
},
function (D, x, y, z, ry, fill) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
D.add(g);
davBoxM(0.6, 0.32, 0.42, davSwWood(), 0, 0.16, 0, g);
if (fill !== undefined) {
var R = wRand((x * 7 + z * 13) | 0), m = davC(fill);
for (var i = 0; i < 7; i++)
wSph(0.07 + R() * 0.02, m, (R() - 0.5) * 0.46, 0.34 + R() * 0.04, (R() - 0.5) * 0.3, g, 7);
}
return g;
},
function (D, x, z, y, ry, seed) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = davSwWood(), cols = [0xA83A2A, 0x2A5A8A, 0x3A6A3A, 0xB88A2A], fruit = [0xE8902A, 0xC8342A, 0x8AB83A, 0x6A2A5A, 0xE8C84A, 0x5A8A2A];
davBoxM(2.6, 0.9, 1.1, W, 0, 0.45, 0, g);
davBoxM(2.7, 0.06, 1.2, W, 0, 0.92, 0, g);
[[-1.25, -0.5], [1.25, -0.5], [-1.25, 0.5], [1.25, 0.5]].forEach(function (p) { davBoxM(0.09, 2.3, 0.09, W, p[0], 1.15, p[1], g); });
var aw = new THREE.Mesh(davAwnGeo(2.9, 1.7, false, false), davAwnMat(cols[seed % 4]));
aw.position.set(0, 2.32, 0.15);
aw.rotation.x = 0.22;
g.add(aw);
for (var c = 0; c < 3; c++)
davSwCrate(g, -0.85 + c * 0.85, 0.95, -0.05, 0, fruit[(seed + c) % 6]);
davSwCrate(g, 1.7, 0, 0.2, 0.4, fruit[(seed + 3) % 6]);
davSwCrate(g, 1.7, 0.32, 0.2, 0.3);
davSolid({ x: x, z: z, hw: 1.45, hd: 0.7, rot: ry, h: 2.4, b: y });
},
function (D, x, z, y) {
var S = davSwStone(), W = davSwWood();
var r = wCyl(0.95, 1.0, 0.85, S, x, y + 0.42, z, D, DAV.lite ? 10 : 18);
var top = wCyl(1.02, 1.02, 0.1, S, x, y + 0.88, z, D, DAV.lite ? 10 : 18);
wCyl(0.8, 0.8, 0.02, davC(0x1E2A2A), x, y + 0.8, z, D, 14);
[-1, 1].forEach(function (s) { davBoxM(0.12, 1.6, 0.12, W, x + s * 0.85, y + 1.6, z, D); });
var ax = wCyl(0.06, 0.06, 1.8, W, x, y + 2.3, z, D, 6);
ax.rotation.z = Math.PI / 2;
wCyl(0.16, 0.13, 0.26, davC(0x6A4A2A), x + 0.2, y + 1.3, z, D, 8);
davSolid({ x: x, z: z, r: 1.1, h: 1, b: y });
},
function (D, x, z, y, ry, load) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = davSwWood(), iron = davC(0x3A3632);
davBoxM(1.4, 0.1, 2.4, W, 0, 0.75, 0, g);
[-1, 1].forEach(function (s) { davBoxM(0.06, 0.35, 2.4, W, s * 0.68, 0.95, 0, g); });
davBoxM(1.4, 0.35, 0.06, W, 0, 0.95, 1.18, g);
[-1, 1].forEach(function (s) {
var wh = wCyl(0.6, 0.6, 0.08, W, s * 0.8, 0.6, 0.2, g, DAV.lite ? 10 : 16);
wh.rotation.z = Math.PI / 2;
var tr = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.035, 5, DAV.lite ? 10 : 18), iron);
tr.position.set(s * 0.84, 0.6, 0.2);
tr.rotation.y = Math.PI / 2;
g.add(tr);
var sh = davBoxM(0.07, 0.07, 2.2, W, s * 0.45, 0.6, -2.1, g);
sh.rotation.x = -0.12;
});
if (load === "hay") {
var h = wSph(0.8, davSurf(null, 0xC8A858, 1), 0, 1.2, 0, g, DAV.lite ? 8 : 12);
h.scale.set(0.85, 0.55, 1.4);
}
else if (load === "barrels") {
[[-0.35, -0.5], [0.35, -0.5], [0, 0.5]].forEach(function (p) { wCyl(0.3, 0.3, 0.7, W, p[0], 1.15, p[1], g, 10); });
}
else {
[[-0.3, -0.6], [0.3, -0.4], [0, 0.4], [-0.3, 0.7]].forEach(function (p, i) { davSwCrate(g, p[0], 0.8, p[1], i * 0.3, [0xE8902A, 0x8AB83A, 0xC8342A][i % 3]); });
}
davSolid({ x: x, z: z, hw: 0.9, hd: 1.3, rot: ry, h: 1.6, b: y });
},
function (D, x, z, y, n) {
var W = davSwWood(), hoop = davC(0x3A3632);
for (var i = 0; i < n; i++) {
var a = i * 2.1, px = x + Math.cos(a) * 0.45 * (i ? 1 : 0), pz = z + Math.sin(a) * 0.45 * (i ? 1 : 0);
var b = wCyl(0.3, 0.3, 0.85, W, px, y + 0.42, pz, D, 10);
[0.15, 0.7].forEach(function (h) { wCyl(0.31, 0.31, 0.05, hoop, px, y + h, pz, D, 10); });
}
davSolid({ x: x, z: z, r: 0.8, h: 0.9, b: y });
},
function (D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var m = davSurf("wood", 0x8A6A48, 0.6);
for (var r = 0; r < 3; r++)
for (var i = 0; i < 5 - r; i++) {
var l = wCyl(0.13, 0.13, 1.6, m, -0.55 + i * 0.27 + r * 0.13, 0.13 + r * 0.24, 0, g, 7);
l.rotation.x = Math.PI / 2;
}
davSolid({ x: x, z: z, hw: 0.8, hd: 0.9, rot: ry, h: 0.8, b: y });
},
function (D, x, z, y, kind) {
var pot = davC(0xB0603A);
wCyl(0.42, 0.32, 0.6, pot, x, y + 0.3, z, D, 12);
wCyl(0.45, 0.45, 0.06, pot, x, y + 0.6, z, D, 12);
wCyl(0.05, 0.07, 0.9, davC(0x5A4632), x, y + 1.0, z, D, 6);
var cr = wSph(0.62, davLeafMat(kind === "bay" ? 0x3A5A2A : 0x4A6A2E), x, y + 1.75, z, D, DAV.lite ? 8 : 12);
cr.scale.y = 0.9;
if (kind !== "bay") {
var R = wRand((x * 3 + z) | 0);
for (var i = 0; i < (DAV.lite ? 4 : 9); i++) {
var a = R() * 6.28, e = (R() - 0.3) * 1.2;
wSph(0.06, davC(0xF0C83A), x + Math.cos(a) * 0.55 * Math.cos(e), y + 1.75 + Math.sin(e) * 0.5, z + Math.sin(a) * 0.55 * Math.cos(e), D, 6);
}
}
davSolid({ x: x, z: z, r: 0.5, h: 1.2, b: y });
},
function (D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = davSurf("wood", 0x7A6448, 0.8), lf = davLeafMat(0x4A6A2A);
for (var r = 0; r < 3; r++) {
for (var p = 0; p < 5; p++) {
davBoxM(0.07, 1.5, 0.07, W, -4 + p * 2, 0.75, r * 2.2, g);
var v = wSph(0.55, lf, -4 + p * 2, 1.15, r * 2.2, g, 7);
v.scale.set(1.6, 0.7, 0.6);
}
davSolid({ x: x + Math.sin(ry) * r * 2.2, z: z + Math.cos(ry) * r * 2.2, hw: 4.2, hd: 0.4, rot: ry, h: 1.6, b: y });
}
},
function (D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = davSwWood(), iron = davC(0x4A4642);
davBoxM(2.4, 0.08, 0.9, W, 0, 0.85, 0, g);
[[-1, -0.35], [1, -0.35], [-1, 0.35], [1, 0.35]].forEach(function (p) { davBoxM(0.08, 0.85, 0.08, W, p[0], 0.42, p[1], g); });
var gear = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 5, 12), W);
gear.position.set(-0.6, 0.95, 0);
gear.rotation.x = Math.PI / 2;
g.add(gear);
davBoxM(0.9, 0.05, 0.12, iron, 0.4, 0.92, 0.1, g);
wCyl(0.05, 0.05, 0.8, W, 0.3, 0.92, -0.2, g, 6).rotation.z = Math.PI / 2;
davSolid({ x: x, z: z, hw: 1.25, hd: 0.5, rot: ry, h: 1, b: y });
},
function (D, T, cx, cz, r0, r1, list, seed, folk) {
var R = wRand(seed), y = T.y, lite = DAV.lite, made = 0, want = lite ? Math.ceil(list.length * 1.5) : list.length * 3;
for (var i = 0, tries = 0; made < want && tries < want * 30; tries++) {
var kind = list[made % list.length], a = R() * Math.PI * 2, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
var need = kind === "stall" || kind === "cart" || kind === "vines" || kind === "hay" || kind === "timber" ? 3.2 : kind === "cypress" || kind === "olive" ? 2 : 1.6;
if (kind === "vines")
need = 5.5;
var gy = davLand(x, z);
if (Math.abs(gy - y) > 1.0)
continue;
if (!davSwFree(x, z, gy, need))
continue;
var face = Math.atan2(cx - x, cz - z);
switch (kind) {
case "stall":
davSwStall(D, x, z, gy, face, seed + made);
break;
case "well":
davSwWell(D, x, z, gy);
break;
case "cart":
davSwCart(D, x, z, gy, face + 1.2, ["hay", "barrels", "crates"][made % 3]);
break;
case "barrels":
davSwBarrels(D, x, z, gy, 3);
break;
case "hay":
davSwHay(D, x, z, gy);
break;
case "wood":
davSwWoodpile(D, x, z, gy, face);
break;
case "bench":
davSwBench(D, x, z, gy, face);
break;
case "lemon":
davSwPotTree(D, x, z, gy, "lemon");
break;
case "bay":
davSwPotTree(D, x, z, gy, "bay");
break;
case "cypress":
davSwCypress(D, x, z, gy, 7 + R() * 5);
break;
case "olive":
davSwOlive(D, x, z, gy, R);
break;
case "vines":
davSwVines(D, x, z, gy, face);
break;
case "trestle":
davSwTrestle(D, x, z, gy, face);
break;
case "timber":
davSwTimber(D, x, z, gy, face);
break;
case "crates":
davSwCrate(D, x, gy, z, face, [0xE8902A, 0x8AB83A, 0xC8342A][made % 3]);
davSwCrate(D, x + 0.7, gy, z + 0.2, face + 0.3);
davSolid({ x: x + 0.35, z: z + 0.1, r: 0.7, h: 0.4, b: gy });
break;
}
made++;
}
var nf = lite ? (folk || 0) : (folk || 0) * 2;
for (var f = 0, ft = 0; f < nf && ft < nf * 20; ft++) {
var a2 = R() * Math.PI * 2, d2 = r0 + R() * (r1 - r0), fx = cx + Math.cos(a2) * d2, fz = cz + Math.sin(a2) * d2, fy = davLand(fx, fz);
if (Math.abs(fy - y) > 1.0 || !davSwFree(fx, fz, fy, 0.8))
continue;
davFolk(D, seed * 3 + f, fx, fz, { y: fy, r: Math.min(12, r1 * 0.5) });
f++;
}
(DAV_SW.log = DAV_SW.log || []).push([seed, made, want, f, tries]);
return made;
},
function (name, D) {
var T;
if (name === "dav-florence" || name === "dav-streets") {
if (DAV_SW.done.fl)
return;
DAV_SW.done.fl = 1;
T = davT("florence");
davSwScatter(D, T, -35, -41, 6, 44, ["stall", "stall", "lemon", "bench", "barrels", "stall", "well", "cart", "crates", "bay", "stall", "bench"], 1501, 10);
davSwScatter(D, T, 177, -58, 5, 30, ["stall", "lemon", "bench", "barrels", "crates", "cart", "bay", "stall", "bench"], 1502, 8);
davSwScatter(D, T, 45, 54, 6, 46, ["bench", "lemon", "stall", "well", "bay", "bench", "barrels", "stall", "lemon", "crates"], 1503, 10);
}
else if (name === "dav-vinci") {
T = davT("vinci");
davSwScatter(D, T, -2604, -285, 8, 90, ["olive", "cypress", "hay", "wood", "well", "cart", "vines", "olive", "barrels", "cypress", "hay", "bench", "olive", "vines", "crates", "cypress"], 1452, 10);
}
else if (name === "dav-anchiano") {
T = davT("anchiano");
davSwScatter(D, T, T.x, T.z, 8, 50, ["olive", "cypress", "hay", "wood", "vines", "olive"], 1453, 3);
}
else if (name === "dav-milan") {
T = davT("milan");
davSwScatter(D, T, -37, -3722, 6, 80, ["stall", "stall", "cart", "barrels", "wood", "cypress", "well", "stall", "crates", "bench", "cart", "bay", "stall", "barrels", "cypress"], 1482, 14);
}
else if (name === "dav-amboise") {
T = davT("amboise");
davSwScatter(D, T, -3720, -2441, 6, 80, ["stall", "cart", "barrels", "wood", "stall", "well", "crates", "bench", "cypress", "hay", "stall", "barrels", "olive"], 1516, 12);
}
else if (name === "dav-imola") {
T = davT("imola");
davSwScatter(D, T, 3403, -692, 8, 110, ["cart", "barrels", "hay", "well", "crates", "wood", "cart", "stall", "barrels", "hay", "bench", "crates", "cart"], 1502, 12);
}
else if (name === "dav-proving") {
T = davT("proving");
davSwScatter(D, T, 1482, 76, 10, 120, ["timber", "trestle", "barrels", "timber", "trestle", "wood", "cart", "crates", "trestle", "timber", "barrels", "hay"], 1505, 10);
}
}
];
});
