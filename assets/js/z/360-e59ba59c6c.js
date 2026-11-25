/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(360, function () {
"use strict";
return [
function (name, mpt) {
var key = name + ":" + mpt;
if (VRN.tex[key])
return VRN.tex[key];
var url = "assets/textures/photo/" + name + (VRN.lite ? "" : "-1k") + ".jpg";
var t = new THREE.TextureLoader().load(url);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / mpt, 1 / mpt);
try {
t.anisotropy = Math.min(VRN.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (VRN.tex[key] = t);
},
function (name, tint, mpt, o) {
o = o || {};
var key = "s:" + name + ":" + tint + ":" + mpt + ":" + (o.ds ? 1 : 0) + (o.vc ? 1 : 0) + (o.shine || 0);
if (VRN.mats[key])
return VRN.mats[key];
var m, map = name ? vrnTex(name, mpt) : null;
if (VRN.lite)
m = new THREE.MeshLambertMaterial({ color: tint, map: map });
else
m = new THREE.MeshPhongMaterial({ color: tint, map: map, shininess: o.shine || 5, specular: o.spec || 0x141210 });
if (o.ds)
m.side = THREE.DoubleSide;
if (o.vc)
m.vertexColors = true;
return (VRN.mats[key] = m);
},
function (col, o) {
var k = "c" + col + (o ? JSON.stringify(o) : "");
if (VRN.mats[k])
return VRN.mats[k];
var m = VRN.lite ? wM(col, o) : new THREE.MeshPhongMaterial({ color: col, shininess: (o && o.shine) || 8, specular: (o && o.spec) || 0x161410 });
if (!VRN.lite && o) {
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
return (VRN.mats[k] = m);
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
var b = -14 - Math.min(106, Math.max(0, z - 260) * 0.036) + (wFbm(x / 260, z / 260, 7, 3) - 0.5) * 12;
if (z < 300 && x > -1900 && x < 4700)
b = Math.max(b, -12 + (wFbm(x / 120, z / 120, 9, 2) - 0.5) * 3);
for (var i = 0; i < VRN_DEEP.length; i++) {
var F = VRN_DEEP[i], d = Math.hypot(x - F.x, z - F.z);
if (d < F.r * 1.5) {
var t = 1 - vrnS(F.r * 0.6, F.r * 1.5, d);
b = b * (1 - t) + (F.y + (wFbm(x / 60, z / 60, i + 11, 2) - 0.5) * 4) * t;
}
}
var rd = vrnSegD(x, z, VRN_RIDGE.ax, VRN_RIDGE.az, VRN_RIDGE.bx, VRN_RIDGE.bz);
if (rd < VRN_RIDGE.w) {
var q = rd / VRN_RIDGE.w;
b = Math.max(b, VRN_RIDGE.y + (b - VRN_RIDGE.y) * q * q);
}
var fd = vrnSegD(x, z, VRN_REEF.ax, VRN_REEF.az, VRN_REEF.bx, VRN_REEF.bz);
if (fd < VRN_REEF.w) {
var u = 1 - fd / VRN_REEF.w;
b = Math.max(b, b + (VRN_REEF.y - b) * Math.min(1, u * 1.6) + (wFbm(x / 14, z / 14, 8, 2) - 0.5) * 5);
}
var vd = Math.hypot(x - VRN_VOLC.x, z - VRN_VOLC.z);
if (vd < VRN_VOLC.r) {
b = Math.max(b, VRN_VOLC.y + (b - VRN_VOLC.y) * (vd / VRN_VOLC.r));
if (vd < 20)
b = VRN_VOLC.y - 6;
}
if (z > 3900)
b = Math.min(b, -60 - (wFbm(x / 90, z / 90, 4, 2)) * 10);
return Math.max(-130, b);
},
function (x, z) {
var coast = 150 + 50 * Math.sin(x / 420) + 28 * Math.sin(x / 170 + 1), west = -1850 + 70 * Math.sin(z / 330), east = 4650;
if (x > VRN_TOWN.x0 - 80 && x < VRN_TOWN.x1 + 80) {
var t = Math.max(0, Math.min(1, Math.min(x - (VRN_TOWN.x0 - 80), (VRN_TOWN.x1 + 80) - x) / 80));
coast = coast * (1 - t) + 150 * t;
}
return Math.min(coast - z, x - west, east - x);
},
function (x, z, inl) {
var I = VRN_ISL, n = wFbm(x / 160, z / 160, 5, 3);
var h = 2.5 + vrnS(0, 160, inl) * 16 + n * 24 * vrnS(80, 420, inl);
if (x > -3250 && x <= I.cliffX && z > 230 && z < 870) {
var e = Math.min(x + 3250, z - 230, 870 - z) / 60, t = vrnS(0, 1, e);
h = h * (1 - t) + (I.heights + n * 2) * t;
}
if (x > I.cliffX && x < I.cliffX + 8 && z > 240 && z < 860)
h = I.heights - (x - I.cliffX) / 8 * (I.heights - 4);
if (x >= I.cliffX + 8 && z > 240 && z < 860)
h = Math.min(h, 4 - (x - I.cliffX - 8) * 0.025);
var L = I.lake, ld = Math.hypot(x - L.x, z - L.z);
if (ld < L.r + 30)
h = Math.min(h, L.y - 12 + vrnS(L.r * 0.4, L.r + 30, ld) * 14);
var md = Math.hypot(x - I.mx, z - I.mz), m = I.peak * Math.exp(-Math.pow(md / 430, 1.4));
if (md < 70)
m = Math.min(m, I.peak - 40 + Math.pow(md / 70, 2) * 25);
h = Math.max(h, m + n * 6);
var rv = vrnSegD(x, z, -3150, 900, -2460, 960);
if (rv < 16)
h = Math.min(h, 1.2 + rv * 0.08);
return h;
},
function (x, z, noPads) {
if (x > VRN_AFR.x0 - 200)
return vrnAfrica(x, z);
var sea = vrnSeaBed(x, z), h = sea;
var inl = vrnMainland(x, z);
if (inl > -120) {
var town = x > VRN_TOWN.x0 - 140 && x < VRN_TOWN.x1 + 140 && z > VRN_TOWN.z0 - 140 && z < 160;
var land = 2.6 + vrnS(20, 700, inl) * (wFbm(x / 650, z / 650, 3, 4) * 120) + vrnS(0, 60, inl) * 2 + vrnSnaef(x, z);
if (town) {
var tx = Math.max(VRN_TOWN.x0 - x, x - VRN_TOWN.x1, VRN_TOWN.z0 - z, 0), tt = 1 - vrnS(0, 140, tx);
land = land * (1 - tt) + VRN_TOWN.y * tt;
}
if (x >= VRN_TOWN.x0 && x <= VRN_TOWN.x1 && z > 146) {
land = VRN_TOWN.y;
return z > 152 ? Math.min(sea, -10) : land;
}
var f = vrnS(-40, 30, inl);
h = sea * (1 - f) + land * f;
}
var iin = vrnIslandIn(x, z);
if (iin > -160) {
var il = vrnIsland(x, z, iin), f2 = vrnS(-60, 25, iin);
h = h * (1 - f2) + il * f2;
}
var sd = Math.hypot(x - VRN_STROM.x, z - VRN_STROM.z);
if (sd < VRN_STROM.r * 1.6) {
var st = -12 + VRN_STROM.h * Math.exp(-Math.pow(sd / 160, 2));
if (sd < 26)
st = Math.min(st, VRN_STROM.h - 30);
h = Math.max(h, st);
}
if (!noPads)
for (var i = 0; i < VRN_PADS.length; i++) {
var P = VRN_PADS[i], pd = Math.hypot(x - P.x, z - P.z);
if (pd < P.r + P.e) {
var py = vrnPadY(P), pt = 1 - vrnS(P.r, P.r + P.e, pd);
h = h * (1 - pt) + py * pt;
}
}
return h;
},
function (x, z) {
var A = VRN_AF, n = wFbm(x / 700, z / 700, 23, 4), sea = -30;
var zd = Math.hypot(x - A.zanz.x, z - A.zanz.z);
if (zd < A.zanz.r * 1.5)
return Math.max(sea, -12 + 30 * Math.exp(-Math.pow(zd / A.zanz.r, 2)) * 1.2);
var cw = A.coastW + 80 * Math.sin(z / 500), ce = A.coastE + 120 * Math.sin(z / 430 + 1);
var inl = Math.min(x - cw, ce - x, z - VRN_AFR.z0 - 60, VRN_AFR.z1 - 60 - z);
if (inl < -60)
return sea;
var h = 8 + vrnS(0, 400, inl) * (70 + n * 120);
if (z < -1500) {
var s = vrnS(-1500, -2100, z);
h = h * (1 - s) + (60 + Math.sin(x / 90 + Math.sin(z / 300) * 2) * 9 + n * 40) * s;
}
var md = Math.hypot((x - A.moon.x) * 0.6, z - A.moon.z);
h += 760 * Math.exp(-Math.pow(md / 520, 1.6));
var ld = Math.hypot(x - A.lake.x, z - A.lake.z);
if (ld < A.lake.r + 80)
h = Math.min(h, A.lake.y - 14 + vrnS(A.lake.r * 0.5, A.lake.r + 80, ld) * 24);
var cd = Math.hypot(x - A.chad.x, z - A.chad.z);
if (cd < A.chad.r + 80)
h = Math.min(h, A.chad.y - 8 + vrnS(A.chad.r * 0.5, A.chad.r + 80, cd) * 18);
if (x < A.falls.x) {
var t = vrnS(A.falls.x, A.falls.x - 30, x);
h = h * (1 - t) + (14 + n * 8) * t;
}
if (inl < 40)
h = h * vrnS(-60, 40, inl) + sea * (1 - vrnS(-60, 40, inl));
return h;
},
function (x, z) {
if (x > VRN_UG_X - 3500 && x < VRN_UG_X + 4000)
return typeof vrnUgWaterAt === "function" ? vrnUgWaterAt(x, z) : null;
if (x > VRN_RW.x - 4000 && x < VRN_RW.x + 4000)
return typeof vrnRwWaterAt === "function" ? vrnRwWaterAt(x, z) : null;
if (x > VRN_IN_X - 1000)
return null;
if (x > VRN_AFR.x0 - 200) {
var A = VRN_AF;
if (Math.hypot(x - A.lake.x, z - A.lake.z) < A.lake.r)
return A.lake.y;
if (Math.hypot(x - A.chad.x, z - A.chad.z) < A.chad.r)
return A.chad.y;
}
var L = VRN_ISL.lake;
if (Math.hypot(x - L.x, z - L.z) < L.r)
return vrnLakeY();
if (vrnLand(x, z) < VRN_SEA_Y)
return VRN_SEA_Y;
return null;
},
function (x, z) {
if (x > VRN_UG_X - 3500 && x < VRN_UG_X + 4000) {
if (!VRN.ugrid)
return vrnUgH(x, z);
var u = vrnGridH(VRN.ugrid, x, z);
return u === null ? 400 : u;
}
if (x > VRN_RW.x - 4000 && x < VRN_RW.x + 4000)
return vrnRwH(x, z);
var g = x > VRN_AFR.x0 - 200 ? VRN.agrid : VRN.grid;
if (!g)
return vrnHRaw(x, z);
var h = vrnGridH(g, x, z);
return h === null ? -60 : h;
},
function (x, z, h, slope, c) {
var f = wFbm(x / 80, z / 80, 21, 2), r, g, b;
if (x > VRN_AFR.x0 - 200) {
if (z < -1500) {
r = 0.86 + f * 0.08;
g = 0.72 + f * 0.08;
b = 0.46;
}
else {
r = 0.62 + f * 0.14;
g = 0.56 + f * 0.1;
b = 0.3;
if (h > 300) {
r = 0.36;
g = 0.46;
b = 0.26;
}
if (Math.hypot(x - VRN_AF.moon.x, z - VRN_AF.moon.z) < 900 && h > 500) {
var s2 = vrnS(500, 800, h);
r = r * (1 - s2) + 0.95 * s2;
g = g * (1 - s2) + 0.96 * s2;
b = b * (1 - s2) + 0.98 * s2;
}
}
if (h < 4) {
r = 0.84;
g = 0.78;
b = 0.6;
}
}
else if (h < -0.5) {
var dp = vrnS(0, -110, h);
r = 0.78 - dp * 0.4 + f * 0.08;
g = 0.74 - dp * 0.34 + f * 0.06;
b = 0.6 - dp * 0.22;
if (wFbm(x / 40, z / 40, 3, 2) > 0.62) {
r *= 0.7;
g *= 0.86;
b *= 0.66;
}
}
else if (h < 3.4) {
r = 0.88 + f * 0.06;
g = 0.82 + f * 0.05;
b = 0.66;
}
else if (vrnIslandIn(x, z) > -40 && x < -2000) {
r = 0.2 + f * 0.1;
g = 0.42 + f * 0.14;
b = 0.16;
if (x < -3900) {
r *= 0.8;
g *= 0.9;
b *= 0.8;
}
if (slope > 0.6) {
var t = vrnS(0.6, 1.2, slope);
r = r * (1 - t) + 0.62 * t;
g = g * (1 - t) + 0.32 * t;
b = b * (1 - t) + 0.24 * t;
}
if (h > 230) {
var s = vrnS(230, 330, h);
r = r * (1 - s) + 0.26 * s;
g = g * (1 - s) + 0.24 * s;
b = b * (1 - s) + 0.24 * s;
}
}
else if (Math.hypot(x - VRN_STONE.x, z - VRN_STONE.z) < 1400) {
r = 0.68 + f * 0.1;
g = 0.66 + f * 0.08;
b = 0.42;
}
else {
r = 0.36 + f * 0.1;
g = 0.48 + f * 0.1;
b = 0.26;
var sn = Math.hypot(x - VRN_SNF.x, z - VRN_SNF.z);
if (sn < 1500) {
var lv = vrnS(1500, 700, sn);
r = r * (1 - lv) + (0.2 + f * 0.06) * lv;
g = g * (1 - lv) + (0.22 + f * 0.08) * lv;
b = b * (1 - lv) + 0.2 * lv;
}
if (slope > 0.5) {
var t2 = vrnS(0.5, 1, slope);
r = r * (1 - t2) + 0.4 * t2;
g = g * (1 - t2) + 0.38 * t2;
b = b * (1 - t2) + 0.36 * t2;
}
if (h > 380) {
var s3 = vrnS(380, 460, h);
r = r * (1 - s3) + 0.95 * s3;
g = g * (1 - s3) + 0.96 * s3;
b = b * (1 - s3) + 0.98 * s3;
}
}
c.setRGB(r, g, b);
},
function (G, g, tile, name, colFn) {
var B = g.B, S = g.S, nx = g.nx, nz = g.nz, P = Math.max(2, Math.round(tile / S)), c = new THREE.Color(), out = [];
for (var J = 0; J < nz - 1; J += P)
for (var I = 0; I < nx - 1; I += P) {
var i1 = Math.min(nx - 1, I + P), j1 = Math.min(nz - 1, J + P), w = i1 - I + 1, d = j1 - J + 1;
var p2 = new Float32Array(w * d * 3), c2 = new Float32Array(w * d * 3), u2 = new Float32Array(w * d * 2), idx = [];
for (var b = 0; b < d; b++)
for (var a = 0; a < w; a++) {
var i = I + a, j = J + b, k = j * nx + i, dst = b * w + a, x = B.x0 + i * S, z = B.z0 + j * S, h = g.H[k];
p2[dst * 3] = x;
p2[dst * 3 + 1] = h;
p2[dst * 3 + 2] = z;
u2[dst * 2] = x;
u2[dst * 2 + 1] = z;
var hx = g.H[j * nx + Math.min(nx - 1, i + 1)] - g.H[j * nx + Math.max(0, i - 1)], hz = g.H[Math.min(nz - 1, j + 1) * nx + i] - g.H[Math.max(0, j - 1) * nx + i];
(colFn || vrnLandCol)(x, z, h, Math.hypot(hx, hz) / (2 * S), c);
c2[dst * 3] = c.r;
c2[dst * 3 + 1] = c.g;
c2[dst * 3 + 2] = c.b;
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
var m = new THREE.Mesh(geo, vrnSurf("grass", 0xFFFFFF, VRN.lite ? 10 : 7, { vc: true }));
m.name = name;
m.userData.keep = 1;
G.add(m);
out.push({ g: m, x: B.x0 + (I + P / 2) * S, z: B.z0 + (J + P / 2) * S });
}
return out;
},
function (col, op) {
var k = "w" + col + ":" + (op || 0);
if (VRN.mats[k])
return VRN.mats[k];
if (!VRN_RIP)
VRN_RIP = wTex(256, 256, function (x, W, H) {
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
var t = VRN_RIP.clone();
t.needsUpdate = true;
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 16, 1 / 16);
var m = VRN.lite ? new THREE.MeshLambertMaterial({ color: col, map: t, transparent: true, opacity: op || 0.86 }) : new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 80, specular: 0x6A7A80, transparent: true, opacity: op || 0.84 });
m.depthWrite = false;
m.side = THREE.DoubleSide;
VRN.water.push(t);
return (VRN.mats[k] = m);
},
function (G) {
var size = VRN.lite ? 7000 : 12000, sea = new THREE.Mesh(new THREE.PlaneGeometry(size, size, 1, 1), vrnWaterMat(0x2E6A84));
sea.rotation.x = -Math.PI / 2;
sea.position.y = VRN_SEA_Y;
sea.name = "vrn-sea";
sea.userData.keep = 1;
sea.renderOrder = 1;
G.add(sea);
VRN.sea = sea;
var L = VRN_ISL.lake, lake = new THREE.Mesh(new THREE.CircleGeometry(L.r + 8, VRN.lite ? 24 : 48), vrnWaterMat(0x3A6A6A));
lake.rotation.x = -Math.PI / 2;
lake.position.set(L.x, L.y, L.z);
lake.userData.keep = 1;
G.add(lake);
VRN.lake = lake;
var A = VRN_AF;
[[A.lake, 0x3A7A8A], [A.chad, 0x5A8A7A]].forEach(function (p) { var m = new THREE.Mesh(new THREE.CircleGeometry(p[0].r + 10, VRN.lite ? 24 : 48), vrnWaterMat(p[1])); m.rotation.x = -Math.PI / 2; m.position.set(p[0].x, p[0].y, p[0].z); m.userData.keep = 1; G.add(m); });
function river(list, w, yOff) {
var pts = [];
for (var i = 0; i < list.length - 1; i++) {
var a = list[i], b = list[i + 1], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 40);
for (var k = 0; k < n; k++) {
var t = k / n;
pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
}
}
pts.push(list[list.length - 1]);
var pos = [], idx = [];
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l * w / 2, nz = dx / l * w / 2;
pos.push(p[0] + nx, Math.max(VRN_SEA_Y + 0.1, vrnLand(p[0] + nx, p[1] + nz) + yOff), p[1] + nz, p[0] - nx, Math.max(VRN_SEA_Y + 0.1, vrnLand(p[0] - nx, p[1] - nz) + yOff), p[1] - nz);
if (i) {
var a2 = (i - 1) * 2;
idx.push(a2, a2 + 1, a2 + 2, a2 + 1, a2 + 3, a2 + 2);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, vrnWaterMat(0x4A7A7A, 0.9));
m.userData.keep = 1;
G.add(m);
}
river([[-3150, 900], [-2800, 925], [-2460, 960]], 22, 1.0);
river(A.nile, 40, 2);
river(A.niger, 40, 2);
river(A.senegal, 46, 2);
},
function (dt, L) {
for (var i = 0; i < VRN.water.length; i++) {
var t = VRN.water[i];
t.offset.x += dt * 0.004;
t.offset.y += dt * 0.0015;
}
var S = VRN.sea;
if (!S)
return;
var far = L.x > VRN_UG_X - 4000;
if (S.visible === far)
S.visible = !far;
if (!far) {
var st = 50, gx = Math.round(L.x / st) * st, gz = Math.round(L.z / st) * st;
if (S.position.x !== gx || S.position.z !== gz) {
S.position.x = gx;
S.position.z = gz;
var m = S.material.map;
if (m) {
m.offset.x = (gx / 16) % 1;
m.offset.y = (-gz / 16) % 1;
}
}
}
if (VRN.lake) {
var ly = vrnLakeY();
if (Math.abs(VRN.lake.position.y - ly) > 0.01)
VRN.lake.position.y += (ly - VRN.lake.position.y) * Math.min(1, dt * 0.15);
}
},
function (col) {
var k = "leaf" + col;
if (VRN.mats[k])
return VRN.mats[k];
var m;
if (VRN.lite)
m = new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide });
else {
var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png");
t.wrapS = t.wrapT = THREE.RepeatWrapping;
m = new THREE.MeshLambertMaterial({ color: col, map: t, side: THREE.DoubleSide });
}
return (VRN.mats[k] = m);
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
function (n, len, wid, droop, top) {
var pos = [], uv = [], idx = [], seg = VRN.lite ? 4 : 7, base = 0;
for (var f = 0; f < n; f++) {
var a = f / n * Math.PI * 2 + (f % 2) * 0.2, ca = Math.cos(a), sa = Math.sin(a), lift = 0.5 + ((f * 7) % 3) * 0.18;
for (var s = 0; s <= seg; s++) {
var t = s / seg, r = t * len, y = top + Math.sin(t * Math.PI * 0.7) * lift * len * 0.3 - t * t * droop * len, w = wid * (1 - t * 0.85) * (0.4 + Math.sin(Math.min(1, t * 3) * Math.PI / 2) * 0.6);
var px = ca * r, pz = sa * r;
pos.push(px - sa * w, y, pz + ca * w, px + sa * w, y, pz - ca * w);
uv.push(0, t * 4, 1, t * 4);
if (s) {
var b = base + (s - 1) * 2;
idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
}
}
base += (seg + 1) * 2;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function () {
if (VRN_TREE.kinds && VRN_TREE.lite === VRN.lite)
return VRN_TREE.kinds;
var d = VRN.lite ? 0 : 1, bark = vrnSurf("bark", 0x8A7A6A, 1.4), palmBark = vrnSurf("bark", 0xB89A70, 1.0);
var bao = new THREE.LatheGeometry([[0, 0], [3.2, 0], [3.4, 2], [3.1, 6], [2.4, 9], [1.2, 10.4], [0, 10.8]].map(function (a) { return new THREE.Vector2(a[0], a[1]); }), VRN.lite ? 7 : 11);
var aca = vrnCrownGeo(19, 5.4, 1.1, 5.2, d).translate(1.2, 7.6, 0);
VRN_TREE.lite = VRN.lite;
return (VRN_TREE.kinds = {
palm: [{ g: vrnFrondGeo(VRN.lite ? 7 : 11, 5.4, 0.75, 0.55, 11.4).translate(1.4, 0, 0), m: vrnLeafMat(0x4A8A3A) }, { g: vrnTrunkGeo(0.32, 0.2, 11.6, 1.4, 6), m: palmBark }],
jungle: [{ g: vrnCrownGeo(3, 4.6, 3.4, 4.4, d).translate(0, 12.5, 0), m: vrnLeafMat(0x2E6A2A) }, { g: vrnCrownGeo(5, 3.2, 2.2, 3.0, d).translate(1.8, 8.4, 0.6), m: vrnLeafMat(0x3A7A30) }, { g: vrnTrunkGeo(0.6, 0.34, 12, 0.4), m: bark }],
fern: [{ g: vrnFrondGeo(VRN.lite ? 6 : 9, 2.8, 0.55, 0.75, 4.2), m: vrnLeafMat(0x3E7A34) }, { g: vrnTrunkGeo(0.22, 0.18, 4.3, 0.2, 5), m: vrnSurf("bark", 0x5A4A3A, 1) }],
pine: [{ g: new THREE.ConeGeometry(2.4, 7, VRN.lite ? 6 : 9).translate(0, 9, 0), m: vrnLeafMat(0x3A5A30) }, { g: vrnTrunkGeo(0.3, 0.18, 8, 0.2), m: bark }],
acacia: [{ g: aca, m: vrnLeafMat(0x6A8A3A) }, { g: vrnTrunkGeo(0.32, 0.16, 7.4, 1.2), m: bark }],
baobab: [{ g: vrnCrownGeo(29, 4.2, 1.6, 4.0, 0).translate(0, 11.4, 0), m: vrnLeafMat(0x6A7A3A) }, { g: bao, m: vrnSurf("bark", 0xA8907A, 2.4) }]
});
},
function (x, z, R) {
var h = vrnLand(x, z);
if (h < 2.6)
return null;
if (vrnWaterAt(x, z) !== null)
return null;
var gx = vrnLand(x + 6, z) - vrnLand(x - 6, z), gz = vrnLand(x, z + 6) - vrnLand(x, z - 6), slope = Math.hypot(gx, gz) / 12;
if (slope > 0.85)
return null;
var r = R();
if (x > VRN_AFR.x0 - 200) {
if (z < -1500)
return r < 0.02 ? "palm" : null;
if (h > 480)
return null;
if (Math.hypot(x - VRN_AF.lake.x, z - VRN_AF.lake.z) < VRN_AF.lake.r + 160)
return r < 0.5 ? "palm" : r < 0.7 ? "jungle" : null;
return r < 0.16 ? "acacia" : r < 0.2 ? "baobab" : null;
}
if (x < -2000 && vrnIslandIn(x, z) > -20) {
if (h > 240)
return null;
if (Math.hypot(x - VRN_ISL.mx, z - VRN_ISL.mz) < 200)
return null;
if (x > VRN_ISL.cliffX - 4 && z > 230 && z < 870)
return null;
if (Math.hypot(x + 3300, z - 120) < 70)
return null;
if (x < -3900 || vrnSegD(x, z, -4150, 1050, -4760, 1760) < 120)
return r < 0.55 ? "jungle" : r < 0.8 ? "fern" : r < 0.9 ? "palm" : null;
if (h < 12)
return r < 0.5 ? "palm" : r < 0.6 ? "fern" : null;
return r < 0.35 ? "jungle" : r < 0.55 ? "palm" : r < 0.72 ? "fern" : null;
}
if (Math.hypot(x - VRN_STONE.x, z - VRN_STONE.z) < 1600 && Math.hypot(x - VRN_STONE.x, z - VRN_STONE.z) > VRN_STONE.r + 40)
return r < 0.2 ? "palm" : r < 0.32 ? "pine" : null;
if (x > VRN_TOWN.x0 - 160 && x < VRN_TOWN.x1 + 160 && z > VRN_TOWN.z0 - 160 && z < 170)
return null;
if (Math.hypot(x - VRN_SNF.x, z - VRN_SNF.z) < 1700)
return null;
return r < 0.08 ? "pine" : null;
},
function (G) {
var K = vrnTreeKinds(), tile = 1000, per = {}, R = wRand(7781);
function zone(B, step, thin) {
for (var z = B.z0 + 60; z < B.z1 - 60; z += step)
for (var x = B.x0 + 60; x < B.x1 - 60; x += step) {
var jx = x + (R() - 0.5) * step * 0.9, jz = z + (R() - 0.5) * step * 0.9;
var patch = wFbm(jx / 380, jz / 380, 33, 2);
if (patch < thin && R() < 0.7)
continue;
var k = vrnTreeAt(jx, jz, R);
if (!k)
continue;
var key = Math.floor(jx / tile) + "," + Math.floor(jz / tile);
var L = per[key] || (per[key] = {});
(L[k] || (L[k] = [])).push([jx, vrnLand(jx, jz) - 0.2, jz, 0.75 + R() * 0.55, R() * 6.28]);
}
}
zone({ x0: -5200, x1: -2300, z0: -700, z1: 1900 }, VRN.lite ? 26 : 13, 0.3);
zone({ x0: -1900, x1: 4600, z0: -4600, z1: 150 }, VRN.lite ? 70 : 36, 0.45);
zone(VRN_AFR, VRN.lite ? 110 : 60, 0.4);
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color();
VRN.treeTiles = [];
Object.keys(per).forEach(function (key) {
var L = per[key], ab = key.split(","), cx = (+ab[0] + 0.5) * tile, cz = (+ab[1] + 0.5) * tile, grp = new THREE.Group();
grp.userData.keep = 1;
grp.name = "vrn-trees";
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
s.set(t[3], t[3], t[3]);
m4.compose(v, q, s);
mesh.setMatrixAt(i, m4);
if (!VRN.lite && pi === 0) {
var hh = ((i * 2654435761) >>> 0) % 100 / 100;
col.setRGB(0.82 + hh * 0.24, 0.86 + hh * 0.18, 0.8 + hh * 0.2);
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
VRN.treeTiles.push({ g: grp, x: cx, z: cz });
});
},
function (L, away) {
var far = VRN.lite ? 650 : 1600;
(VRN.treeTiles || []).forEach(function (T) { var on = !away && Math.hypot(L.x - T.x, L.z - T.z) < far + 700; if (T.g.visible !== on)
T.g.visible = on; });
(VRN.landTiles || []).forEach(function (T) { var on = !away && Math.hypot(L.x - T.x, L.z - T.z) < (VRN.lite ? 3200 : 5400); if (T.g.visible !== on)
T.g.visible = on; });
},
function () {
var z = VRN.zone, L = worldLocal(), y = camera.position.y, E;
if (VRN.envOver)
E = VRN_ENV[VRN.envOver];
else if (z === "inside")
E = VRN_ENV.inside;
else if (z === "galleries")
E = VRN_ENV.gallery;
else if (z === "under")
E = VRN_ENV.under;
else if (z === "sky")
E = VRN_ENV.space;
else if (z === "race")
E = VRN_ENV.world;
else if (y < VRN_SEA_Y - 0.3 && vrnWaterAt(L.x, L.z) !== null)
E = y < -60 ? VRN_ENV.abyss : VRN_ENV.deep;
else if (y > 1600)
E = VRN_ENV.space;
else if (z === "africa")
E = VRN_ENV.africa;
else if (z === "island" || z === "farwest" || z === "serpentine" || z === "stromboli")
E = VRN_ENV.island;
else if (z === "north" || z === "snaefells")
E = VRN_ENV.north;
else if (z === "stones")
E = VRN_ENV.florida;
else
E = VRN_ENV.harbour;
if (VRN.lite && E.fogD < 0.0011 && E !== VRN_ENV.space && z !== "race")
E = Object.assign({}, E, { fogD: 0.0011 });
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
for (var j = 0; j < W / 12; j++) {
var sx = Math.random() * W;
x.fillStyle = "rgba(40,34,28," + (0.02 + Math.random() * 0.035) + ")";
x.fillRect(sx, 0, 1 + Math.random() * 3, H * (0.3 + Math.random() * 0.7));
}
},
function (x, H, px, py, w, h, o) {
var top = H - py - h, fr = o.fr || "#C8C0B0", fw = Math.max(3, w * 0.12);
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
if (!o.arch) {
x.fillRect(px - fw * 1.9, top - fw * 2.4, w + fw * 3.8, fw * 1.2);
x.fillStyle = "rgba(0,0,0,.2)";
x.fillRect(px - fw * 1.9, top - fw * 1.2, w + fw * 3.8, 3);
}
var gr = x.createLinearGradient(0, top, 0, top + h);
gr.addColorStop(0, "#6A7888");
gr.addColorStop(0.45, "#2A3038");
gr.addColorStop(1, "#181A1E");
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
if (o.lit) {
x.fillStyle = "rgba(255,210,140,.28)";
x.fillRect(px + 2, top + h * 0.35, w - 4, h * 0.62);
}
x.fillStyle = "rgba(230,226,216,.9)";
x.fillRect(px + w / 2 - 1.5, top, 3, h);
for (var k = 1; k < 4; k++)
x.fillRect(px, top + h * k / 4, w, 2.5);
x.fillStyle = fr;
x.fillRect(px - fw * 1.4, H - py, w + fw * 2.8, fw * 0.9);
if (o.balc) {
x.strokeStyle = "#1E1E22";
x.lineWidth = 2;
var by = H - py - 2, bh = w * 0.42;
x.strokeRect(px - fw, by - bh, w + fw * 2, bh);
for (var b = px - fw; b < px + w + fw; b += 6) {
x.beginPath();
x.moveTo(b, by - bh);
x.lineTo(b, by);
x.stroke();
}
}
},
function (style, col, band) {
var key = style + ":" + col + ":" + band;
if (VRN_FAC[key])
return VRN_FAC[key];
var ppm = VRN.lite ? 32 : 64, W = 4 * ppm, H = (band ? 5 : 4) * ppm;
var t = wTex(W, H, function (x) {
var base = vrnHex(col);
if (style === "iron") {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#9AB4C8");
g.addColorStop(1, "#5A7088");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(255,255,255,.12)";
for (var i = 0; i < 6; i++)
x.fillRect(Math.random() * W, 0, 10 + Math.random() * 30, H);
x.fillStyle = base;
for (var c = 0; c <= 4; c++)
x.fillRect(c * ppm - 3, 0, 6, H);
for (var r = 0; r <= (band ? 5 : 4); r++)
x.fillRect(0, r * ppm - 2, W, 4);
x.fillRect(W / 2 - ppm * 0.12, 0, ppm * 0.24, H);
if (band) {
x.fillStyle = "#3A3A3E";
x.fillRect(W / 2 - ppm * 0.8, H - ppm * 2.8, ppm * 1.6, ppm * 2.8);
}
return;
}
vrnNoiseFill(x, W, H, base, style === "turf" ? 0.2 : 0.07, W * H / (style === "turf" ? 18 : 34));
if (style === "brick") {
var hb = ppm * 0.075, wb = ppm * 0.25;
for (var r2 = 0; r2 * hb < H; r2++) {
var o2 = (r2 % 2) * wb / 2;
x.fillStyle = "rgba(220,210,190,.33)";
x.fillRect(0, r2 * hb, W, 1.2);
for (var c2 = -1; c2 * wb < W + wb; c2++)
x.fillRect(c2 * wb + o2, r2 * hb, 1.2, hb);
}
}
else if (style === "stone" || style === "club") {
var bh = ppm * 0.5;
for (var r3 = 0; r3 * bh < H; r3++) {
x.fillStyle = "rgba(60,50,40,.22)";
x.fillRect(0, r3 * bh, W, 1.6);
var off = (r3 % 2) * ppm * 0.7;
for (var c3 = -1; c3 * ppm * 1.4 < W; c3++)
x.fillRect(c3 * ppm * 1.4 + off, r3 * bh, 1.6, bh);
}
}
else if (style === "timber") {
x.fillStyle = "rgba(0,0,0,.18)";
for (var r4 = 0; r4 < H; r4 += ppm * 0.22)
x.fillRect(0, r4, W, 2);
}
var fr = style === "brick" ? "#D8D0C0" : style === "club" ? "#8A8478" : style === "turf" ? "#5A4A3A" : style === "timber" ? "#E8E0D0" : "#E4DED0";
if (!band) {
x.fillStyle = fr;
x.fillRect(0, H - ppm * 0.18, W, ppm * 0.18);
if (style === "turf")
vrnWin(x, H, W / 2 - ppm * 0.4, ppm * 1.4, ppm * 0.8, ppm * 0.9, { fr: "#E8E0D0", lit: 1 });
else if (style === "club")
vrnWin(x, H, W / 2 - ppm * 0.6, ppm * 0.8, ppm * 1.2, ppm * 2.5, { arch: 1, fr: fr, lit: Math.random() < 0.5 });
else if (style === "timber")
vrnWin(x, H, W / 2 - ppm * 0.5, ppm * 1.0, ppm * 1.0, ppm * 1.7, { fr: fr });
else
vrnWin(x, H, W / 2 - ppm * 0.55, ppm * 0.7, ppm * 1.1, ppm * 2.5, { fr: fr, balc: style === "stone", lit: Math.random() < 0.35 });
}
else {
x.fillStyle = "rgba(0,0,0,.14)";
for (var k = 1; k < 5; k++)
x.fillRect(0, H - k * ppm, W, 2.5);
var aw = ppm * 2.2, ax = W / 2 - aw / 2, ah = ppm * 3.6;
x.fillStyle = fr;
x.beginPath();
x.moveTo(ax - ppm * 0.2, H);
x.lineTo(ax - ppm * 0.2, H - ah + aw / 2);
x.arc(W / 2, H - ah + aw / 2, aw / 2 + ppm * 0.2, Math.PI, 0);
x.lineTo(ax + aw + ppm * 0.2, H);
x.fill();
var gi = x.createLinearGradient(0, H - ah, 0, H);
gi.addColorStop(0, "#3A4450");
gi.addColorStop(1, "#1A1C20");
x.fillStyle = gi;
x.beginPath();
x.moveTo(ax, H);
x.lineTo(ax, H - ah + aw / 2);
x.arc(W / 2, H - ah + aw / 2, aw / 2, Math.PI, 0);
x.lineTo(ax + aw, H);
x.fill();
x.fillStyle = "rgba(255,214,150,.22)";
x.fillRect(ax + 4, H - ppm * 2.6, aw - 8, ppm * 2.4);
x.fillStyle = "rgba(230,226,216,.8)";
x.fillRect(W / 2 - 1.5, H - ah, 3, ah);
x.fillRect(ax, H - ppm * 1.6, aw, 2.5);
x.fillStyle = fr;
x.fillRect(0, H - ppm * 0.22, W, ppm * 0.22);
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (VRN_FAC[key] = t);
},
function (grp, w, d, y, o) {
var slate = vrnSurf("slate", o.roof || 0x6A707A, VRN.lite ? 3 : 2), h = o.mh || 3.6, inset = 1.2;
var pos = [], W = w / 2 + 0.3, D = d / 2 + 0.3, w2 = W - inset, d2 = D - inset;
function quad(a, b, c, dd) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], dd[0], dd[1], dd[2]); }
quad([-W, 0, D], [W, 0, D], [w2, h, d2], [-w2, h, d2]);
quad([W, 0, -D], [-W, 0, -D], [-w2, h, -d2], [w2, h, -d2]);
quad([W, 0, D], [W, 0, -D], [w2, h, -d2], [w2, h, d2]);
quad([-W, 0, -D], [-W, 0, D], [-w2, h, d2], [-w2, h, -d2]);
quad([-w2, h, d2], [w2, h, d2], [w2, h + 0.6, -d2 * 0], [-w2, h + 0.6, 0]);
quad([w2, h, -d2], [-w2, h, -d2], [-w2, h + 0.6, 0], [w2, h + 0.6, 0]);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.computeVertexNormals();
var uv = [];
for (var i = 0; i < pos.length; i += 3)
uv.push(pos[i] + pos[i + 2] * 0.4, pos[i + 1] * 1.4 + pos[i + 2] * 0.2);
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
var m = new THREE.Mesh(g, slate);
m.position.y = y;
grp.add(m);
if (!VRN.lite) {
var stone = vrnC(0xE4DED0);
[[0, 1], [0, -1]].forEach(function (s) { for (var x = -w / 2 + 3; x < w / 2 - 2; x += 4) {
var dm = wBox(1.2, 1.7, 0.6, stone, x, y + 1.5, s[1] * (D - 0.75), grp);
var gl = wBox(0.8, 1.1, 0.05, vrnC(0x2A3038), x, y + 1.4, s[1] * (D - 0.43), grp);
} });
}
wBox(w - inset * 2 + 0.4, 0.2, 0.2, vrnMetal(0x5A6068), 0, y + h + 0.65, 0, grp);
},
function (parent, x, z, w, d, o) {
o = o || {};
var y = o.y || 0, style = o.style || "stone", col = o.col || VRN_COLS[0], fl = o.floors || 3, gh = 5, h = gh + fl * 4;
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
parent.add(g);
vrnWalls(g, w, d, 0, gh, vrnFacMat(style, col, 1), 1);
vrnWalls(g, w, d, gh, h, vrnFacMat(style, col, 0), 0);
var stone = vrnC(style === "brick" ? 0xD8CCB8 : 0xD8D0C0);
wBox(w + 0.6, 0.5, d + 0.6, stone, 0, h - 0.2, 0, g);
if (!VRN.lite)
wBox(w + 0.3, 0.3, d + 0.3, stone, 0, gh, 0, g);
if (o.roof !== false) {
if (o.pitch) {
var r = new THREE.Mesh(vrnPitchGeo(w, d, o.pitch, 0.6), vrnSurf("slate", o.roofCol || 0x5A6068, 2));
r.position.y = h;
g.add(r);
}
else
vrnMansard(g, w, d, h, { roof: o.roofCol });
if (!VRN.lite && w * d > 150) {
[-1, 1].forEach(function (k) { wBox(0.8, 2.2, 1.4, vrnSurf("brick", 0xC88870, 1.5), k * (w / 2 - 1.2), h + (o.pitch || 3.6) + 0.6, 0, g); });
}
}
if (o.sign)
vrnSign(o.sign, Math.min(w - 1, 9), 1.2, 0, gh + 0.6, d / 2 + 0.12, 0, g);
if (o.solid !== false) {
var ry = o.ry || 0, sw = Math.abs(Math.cos(ry)) > 0.5;
vrnSolid({ x: x, z: z, hw: (sw ? w : d) / 2, hd: (sw ? d : w) / 2, h: h + 8, b: y });
}
if (o.door && typeof evbWorldDoor === "function") {
var th = o.door.theme || evbVrnHouse(x, z);
evbWorldDoor(VRN_KEY, x, z, o.ry || 0, d / 2, th, o.door.name || EVB_VRN_NAMES[th], { y: y, lx: o.door.lx || 0, doors: o.door.doors || (th === "immeuble" ? "the carriage door" : "the shop door") });
}
return { g: g, h: h };
},
function (w, d, rise, o) {
o = o || 0;
var W = w / 2 + o, D = d / 2 + o, pos = [];
function tri(a, b, c) { [a, b, c].forEach(function (p) { pos.push(p[0], p[1], p[2]); }); }
var A = [-W, 0, -D], B = [W, 0, -D], C = [W, 0, D], Dd = [-W, 0, D], R1 = [-W, rise, 0], R2 = [W, rise, 0];
tri(A, R1, R2);
tri(A, R2, B);
tri(Dd, C, R2);
tri(Dd, R2, R1);
tri(A, Dd, R1);
tri(B, R2, C);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
var uv = [];
for (var i = 0; i < pos.length; i += 3)
uv.push(pos[i], pos[i + 1] * 1.6 + pos[i + 2] * 0.8);
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeVertexNormals();
return g;
},
function (s) {
VRN.solids.push(s);
var R = s.r !== undefined ? s.r : Math.hypot(s.hw, s.hd);
var g = VRN.sgrid || (VRN.sgrid = {});
for (var i = Math.floor((s.x - R) / VRN_SG); i <= Math.floor((s.x + R) / VRN_SG); i++)
for (var j = Math.floor((s.z - R) / VRN_SG); j <= Math.floor((s.z + R) / VRN_SG); j++) {
var k = i + "," + j;
(g[k] || (g[k] = [])).push(s);
}
return s;
},
function (x, z, feet) {
var best = null, list = VRN.floors;
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
if (f.off && f.off())
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
function (parent, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
parent.add(g);
var iron = vrnMetal(0x1E2226);
wCyl(0.08, 0.12, 3.6, iron, 0, 1.8, 0, g, 8);
wCyl(0.2, 0.2, 0.3, iron, 0, 0.15, 0, g, 8);
wBox(0.42, 0.5, 0.42, vrnC(0xF8E8C0, { e: 0xFFD890, ei: 0.7 }), 0, 3.85, 0, g);
wCone(0.36, 0.3, iron, 0, 4.25, 0, g, 4);
vrnSolid({ x: x, z: z, r: 0.2 });
return g;
},
function (parent, key, x, z, ry, o) {
o = o || {};
var F = typeof key === "string" ? VRN_FOLK[key] : key;
if (!F)
return null;
var p = wPerson("vrn_" + (typeof key === "string" ? key : F.name), { look: F.look, scale: o.scale });
p.position.set(x, o.y || 0, z);
p.rotation.y = ry || 0;
parent.add(p);
var P = { g: p, key: key, wander: o.wander ? { r: o.wander, sp: 1 } : null };
VRN.people.push(P);
if (o.talk !== false)
VRN.talk.push({ p: P, name: F.name, r: o.r || 3, t: { name: F.name, persona: F.persona, greet: F.greet }, fn: o.fn || null });
return P;
},
function (parent, seed, x, z, o) {
o = o || {};
var R = wRand(seed * 977 + 11), c = VRN_TOWNCOL, fem = R() < 0.45;
var look = { sex: fem ? "f" : "m", top: fem ? c[(R() * c.length) | 0] : 0xF2EEE2, bottom: c[(R() * c.length) | 0], topKind: fem ? "dress" : null, layer: fem ? (R() < 0.4 ? "jacket" : null) : (R() < 0.6 ? "suit" : "jacket"), layerColor: c[(R() * c.length) | 0],
hat: fem ? (R() < 0.5 ? "brimmed" : "none") : (R() < 0.5 ? "tophat" : R() < 0.5 ? "cap" : "none"), hatColor: c[(R() * c.length) | 0], shoes: 0x1A1A1A };
if (o.sailor)
look = { sex: "m", top: 0xF2F2F2, bottom: 0x1E2A4A, layer: "jacket", layerColor: 0x1E2A4A, hat: "cap", hatColor: 0x1E2A4A, shoes: 0x1A1A1A };
if (o.look)
for (var k in o.look)
look[k] = o.look[k];
var p = wPerson("vrn_f" + seed, { look: look });
p.position.set(x, o.y || 0, z);
p.rotation.y = R() * 6.28;
parent.add(p);
var P = { g: p, wander: o.still ? null : { r: o.r || 12, sp: 1.1 } };
VRN.people.push(P);
if (o.say)
VRN.talk.push({ p: P, name: o.name, r: 3, t: { name: o.name, persona: o.say, greet: o.greet || "Good day to you." } });
return P;
},
function (x, z, yawTo, msg, y, after) {
var v = vrnVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
VRN.moving = true;
setTimeout(function () {
if (WLD.on !== VRN_KEY) {
v.style.opacity = "0";
VRN.moving = false;
return;
}
if (VRN.ride && !VRN.ride.keep)
vrnRideOff(true);
if (after && after.before)
try {
after.before();
}
catch (e) { }
var gy = y !== undefined && y !== null ? y : vrnGround(x, z, 1e4);
camera.position.set(VRN.base + x, gy + 1.72, z);
if (yawTo !== undefined && yawTo !== null)
yaw = yawTo;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
VRN.zone = vrnZoneAt(x, z);
VRN.insideOf = vrnInAt(x, z);
if (msg)
setStatus(msg);
if (after && after.fn)
try {
after.fn();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; VRN.moving = false; }, 140);
}, 640);
},
function () {
for (var k in VRN_IN) {
var I = VRN_IN[k];
if (!I.built || VRN.insideOf === I)
continue;
if (!VRN.lite && !(typeof wlgHeavy === "function" && wlgHeavy()))
continue;
if (I.grp) {
VRN.G.remove(I.grp);
I.grp.traverse(function (m) { if (m.geometry && !m.geometry.userData.shared)
m.geometry.dispose(); });
}
var x0 = I.x - I.hw - 5, x1 = I.x + I.hw + 5, z0 = I.z - VRN_IN_Z2 / 2, z1 = I.z + VRN_IN_Z2 / 2, out = function (x, z) { return x < x0 || x > x1 || (z != null && (z < z0 || z > z1)); };
VRN.floors = VRN.floors.filter(function (f) { return out(f.x, f.z); });
VRN.spots = VRN.spots.filter(function (s) { return out(s.x, s.z); });
VRN.talk = VRN.talk.filter(function (t) { var px = t.p ? t.p.g.position.x : t.x, pz = t.p ? t.p.g.position.z : t.z; return out(px, pz); });
VRN.people = VRN.people.filter(function (p) { return out(p.g.position.x, p.g.position.z); });
vrnSolidsDrop(x0, x1, z0, z1);
I.built = false;
I.grp = null;
}
},
function (grp, x0, z0, x1, z1, h, mat, gaps, y) {
y = y || 0;
var l = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(z1 - z0, x1 - x0), cuts = [0].concat((gaps || []).reduce(function (acc, g) { return acc.concat([g[0] - g[1] / 2, g[0] + g[1] / 2]); }, [])).concat([l]);
for (var i = 0; i < cuts.length; i += 2) {
var s = cuts[i], e = cuts[i + 1];
if (e - s < 0.05)
continue;
var m = (s + e) / 2, px = x0 + Math.cos(a) * m, pz = z0 + Math.sin(a) * m;
var w = vrnBoxM(e - s, h, 0.3, mat, px, y + h / 2, pz, grp);
w.rotation.y = -a;
vrnSolid({ x: px, z: pz, hw: (e - s) / 2, hd: 0.2, rot: a, h: h + 1, b: y });
}
(gaps || []).forEach(function (g) { if (g[2]) {
var m2 = g[0], px2 = x0 + Math.cos(a) * m2, pz2 = z0 + Math.sin(a) * m2, lt = vrnBoxM(g[1], h - g[2], 0.3, mat, px2, y + g[2] + (h - g[2]) / 2, pz2, grp);
lt.rotation.y = -a;
} });
},
function (grp, cx, cz, w, d, h, o) {
o = o || {};
var y = o.y || 0, wall = o.wall || vrnSurf("plaster", 0xE8DCC4, 3), fl = o.floor || vrnSurf("wood", 0xA87A52, 2);
vrnInFloor(grp, cx, cz, w, d, y, fl);
if (o.ceil !== false) {
var c = vrnBoxM(w, 0.2, d, o.ceilM || vrnC(0xE8E0D0), cx, y + h + 0.1, cz, grp);
}
var G2 = o.gaps || {};
vrnIWall(grp, cx - w / 2, cz - d / 2, cx + w / 2, cz - d / 2, h, wall, G2.n, y);
vrnIWall(grp, cx - w / 2, cz + d / 2, cx + w / 2, cz + d / 2, h, wall, G2.s, y);
vrnIWall(grp, cx - w / 2, cz - d / 2, cx - w / 2, cz + d / 2, h, wall, G2.w, y);
vrnIWall(grp, cx + w / 2, cz - d / 2, cx + w / 2, cz + d / 2, h, wall, G2.e, y);
if (o.lamps !== false) {
var n = Math.max(1, Math.round(w / 10));
for (var i = 0; i < n; i++) {
var lx = cx - w / 2 + (i + 0.5) * w / n;
wBox(0.5, 0.3, 0.5, vrnC(0xFFF0C8, { e: 0xFFD8A0, ei: 0.8 }), lx, y + h - 0.4, cz, grp);
}
}
},
function (grp, x, z, w, ry, h) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = vrnC(0x4A2E1E), R = wRand((x * 13 + z * 7) | 0), bc = [0x7A2A22, 0x2A4A6A, 0x3A5A2A, 0x6A5A3A, 0x5A2A4A, 0x8A6A3A, 0x2A2A2A];
h = h || 3.2;
wBox(w, h, 0.5, wood, 0, h / 2, 0, g);
var rows = Math.floor(h / 0.55);
for (var r = 0; r < rows; r++) {
var y = 0.3 + r * 0.55, bx = -w / 2 + 0.12;
while (bx < w / 2 - 0.15) {
var bw = 0.05 + R() * 0.07, bh = 0.28 + R() * 0.16;
wBox(bw, bh, 0.32, vrnC(bc[(R() * bc.length) | 0]), bx + bw / 2, y + bh / 2, 0.12, g);
bx += bw + 0.006;
}
}
return g;
},
function (grp, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
var m = vrnC(col || 0x6A2A22);
wBox(0.55, 0.12, 0.55, m, 0, 0.48, 0, g);
wBox(0.55, 0.7, 0.1, m, 0, 0.85, -0.24, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { wBox(0.06, 0.46, 0.06, vrnC(0x3A2418), k[0] * 0.22, 0.23, k[1] * 0.22, g); });
return g;
},
function () {
if (VRN_RIVET)
return VRN_RIVET;
VRN_RIVET = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#7A8088";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 1400; i++) {
x.fillStyle = "rgba(" + (Math.random() < 0.5 ? 0 : 255) + "," + (Math.random() < 0.5 ? 0 : 255) + "," + (Math.random() < 0.5 ? 0 : 255) + ",0.03)";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
}
x.strokeStyle = "rgba(20,22,26,.6)";
x.lineWidth = 2;
for (var r = 0; r < 4; r++) {
x.beginPath();
x.moveTo(0, r * 64);
x.lineTo(W, r * 64);
x.stroke();
for (var c = 0; c < 4; c++) {
var off = (r % 2) * 32;
x.beginPath();
x.moveTo(c * 64 + off, r * 64);
x.lineTo(c * 64 + off, r * 64 + 64);
x.stroke();
}
}
x.fillStyle = "rgba(30,32,36,.8)";
for (var r2 = 0; r2 < 4; r2++)
for (var c2 = 0; c2 < 32; c2++) {
x.beginPath();
x.arc(c2 * 8 + 4, r2 * 64 + 5, 1.6, 0, 7);
x.fill();
x.beginPath();
x.arc(c2 * 8 + 4, r2 * 64 + 59, 1.6, 0, 7);
x.fill();
}
}, [1, 1]);
VRN_RIVET.wrapS = VRN_RIVET.wrapT = THREE.RepeatWrapping;
return VRN_RIVET;
},
function () {
var g = new THREE.Group(), L = 70, R = 4.1, seg = VRN.lite ? 14 : 28;
var prof = [];
for (var i = 0; i <= 24; i++) {
var t = i / 24, r = R * Math.pow(Math.sin(Math.PI * Math.pow(t, 0.9)), 0.62);
prof.push(new THREE.Vector2(Math.max(0.05, r), (t - 0.5) * L));
}
var hm = VRN.lite ? new THREE.MeshLambertMaterial({ color: 0x5A6470, map: vrnRivetTex() }) : new THREE.MeshPhongMaterial({ color: 0x5A6672, map: vrnRivetTex(), shininess: 60, specular: 0x4A5A6A });
if (hm.map) {
hm.map = hm.map.clone();
hm.map.needsUpdate = true;
hm.map.repeat.set(10, 8);
}
var hull = new THREE.Mesh(new THREE.LatheGeometry(prof, seg), hm);
hull.rotation.x = -Math.PI / 2;
hull.scale.set(1, 1, 1);
g.add(hull);
var deck = wBox(3.2, 0.3, L * 0.5, vrnC(0x4A5058), 0, R * 0.86, 0, g);
var lh = wBox(1.6, 1.2, 2.2, vrnMetal(0x3A4048), 0, R + 0.5, -L * 0.18, g);
var lens = new THREE.Mesh(new THREE.CircleGeometry(0.5, 16), vrnC(0xE8F4FF, { e: 0xC8E8FF, ei: 0.8 }));
lens.position.set(0, R + 0.5, -L * 0.18 - 1.11);
lens.rotation.y = Math.PI;
g.add(lens);
var wh = wBox(1.8, 1.6, 2.6, vrnMetal(0x3A4048), 0, R + 0.7, -L * 0.08, g);
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.CircleGeometry(0.35, 12), vrnC(0x9AD0F0, { e: 0x5A9AC8, ei: 0.5 })); p.position.set(s * 0.91, R + 0.8, -L * 0.08); p.rotation.y = s * Math.PI / 2; g.add(p); });
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(new THREE.CircleGeometry(1.4, 20), vrnC(0xFFE8B0, { e: 0xFFD890, ei: 0.7 })); w.scale.set(1.6, 1, 1); w.position.set(s * (R * 0.97), 0.2, -L * 0.05); w.rotation.y = s * Math.PI / 2; g.add(w); });
var spur = new THREE.Mesh(new THREE.ConeGeometry(0.45, 7, 8), vrnMetal(0x7A8088));
spur.rotation.x = -Math.PI / 2;
spur.position.set(0, 0, -L / 2 - 2.6);
g.add(spur);
var prop = new THREE.Group();
prop.position.set(0, 0, L / 2 + 0.8);
g.add(prop);
for (var b = 0; b < 4; b++) {
var bl = wBox(0.25, 2.4, 0.6, vrnBrass(), 0, 0, 0, prop);
bl.rotation.z = b / 4 * Math.PI * 2;
bl.position.set(Math.sin(b / 4 * Math.PI * 2) * 1.1, Math.cos(b / 4 * Math.PI * 2) * 1.1, 0);
bl.rotation.y = 0.5;
}
wBox(0.3, 3.6, 2.4, vrnMetal(0x4A5058), 0, 0, L / 2 + 2.4, g);
g.userData.prop = prop;
g.userData.L = L;
return g;
},
function (dt) {
var S = VRN_SEAWIN;
if (!S)
return;
S.ph += dt;
var x = S.cv.getContext("2d"), W = S.cv.width, H = S.cv.height;
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#2A7A9A");
g.addColorStop(1, "#0A2A3A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var r = 0; r < 5; r++) {
x.fillStyle = "rgba(180,230,255,.06)";
x.fillRect(((r * 53 + S.ph * 6) % W), 0, 10, H);
}
for (var f = 0; f < 14; f++) {
var fx = ((f * 41 + S.ph * (10 + f % 5 * 4)) % (W + 40)) - 20, fy = 20 + ((f * 37) % 110) + Math.sin(S.ph + f) * 4;
x.fillStyle = ["#F8C84A", "#E8704A", "#A8D8F0", "#F2F2E8"][f % 4];
x.beginPath();
x.ellipse(fx, fy, 6, 2.6, 0, 0, 7);
x.fill();
x.beginPath();
x.moveTo(fx - 6, fy);
x.lineTo(fx - 10, fy - 3);
x.lineTo(fx - 10, fy + 3);
x.fill();
}
S.t.needsUpdate = true;
},
function () {
if (VRN_GORE)
return VRN_GORE;
VRN_GORE = wTex(256, 256, function (x, W, H) {
for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#E8DCC0" : "#C8A870";
x.fillRect(i * W / 8, 0, W / 8, H);
}
x.strokeStyle = "rgba(60,40,20,.5)";
x.lineWidth = 1.4;
for (var k = 0; k < 16; k++) {
x.beginPath();
x.moveTo(k * W / 16, 0);
x.lineTo(k * W / 16 + H * 0.3, H);
x.stroke();
x.beginPath();
x.moveTo(k * W / 16, 0);
x.lineTo(k * W / 16 - H * 0.3, H);
x.stroke();
}
}, [3, 1]);
return VRN_GORE;
},
function () {
var g = new THREE.Group(), env = new THREE.Mesh(new THREE.SphereGeometry(8, VRN.lite ? 14 : 28, VRN.lite ? 10 : 20), new THREE.MeshLambertMaterial({ map: vrnGoreTex() }));
env.scale.set(1, 1.2, 1);
env.position.y = 19;
g.add(env);
var bask = new THREE.Group();
bask.position.y = 1;
g.add(bask);
vrnBoxM(2.6, 1.2, 2.6, vrnSurf("wood", 0xB89A60, 0.8), 0, 0, 0, bask);
wBox(2.7, 0.12, 2.7, vrnC(0x6A4A2A), 0, 0.62, 0, bask);
wBox(0.6, 0.8, 0.6, vrnMetal(0x3A3A3A), 0, 1, 0, bask);
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2, top = new THREE.Vector3(Math.cos(a) * 6.4, 13, Math.sin(a) * 6.4), bot = new THREE.Vector3(Math.cos(a) * 1.3, 1.6, Math.sin(a) * 1.3), mid = top.clone().add(bot).multiplyScalar(0.5), l = top.distanceTo(bot);
var rope = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, l, 4), vrnC(0x6A5A3A));
rope.position.copy(mid);
rope.lookAt(top);
rope.rotateX(Math.PI / 2);
g.add(rope);
}
var ring = new THREE.Mesh(new THREE.TorusGeometry(6.4, 0.08, 4, 24), vrnC(0x6A5A3A));
ring.rotation.x = Math.PI / 2;
ring.position.y = 13;
g.add(ring);
g.userData.basket = bask;
return g;
},
function () {
var g = new THREE.Group(), L = 36, hull = new THREE.Group();
g.add(hull);
var prof = [];
for (var i = 0; i <= 16; i++) {
var t = i / 16;
prof.push(new THREE.Vector2(Math.max(0.05, 2.6 * Math.pow(Math.sin(Math.PI * t), 0.5)), (t - 0.5) * L));
}
var h = new THREE.Mesh(new THREE.LatheGeometry(prof, VRN.lite ? 10 : 18), vrnC(0xE8E4D8, { shine: 40, spec: 0x888888 }));
h.rotation.x = -Math.PI / 2;
h.scale.set(1, 0.7, 1);
hull.add(h);
wBox(4, 1.6, L * 0.4, vrnC(0xD8D0C0), 0, 2, 0, hull);
for (var w = 0; w < 6; w++)
[-1, 1].forEach(function (s) { wBox(0.05, 0.6, 0.9, vrnC(0x2A3A4A), s * 2.02, 2.1, -L * 0.15 + w * 1.6, hull); });
var steel = vrnMetal(0x6A7078), rot = [], n = VRN.lite ? 13 : 37, rows = VRN.lite ? 1 : 3;
for (var m = 0; m < n; m++) {
var row = m % rows, col = Math.floor(m / rows), cols = Math.ceil(n / rows), z = -L * 0.42 + col * (L * 0.84 / (cols - 1 || 1)), x = (row - (rows - 1) / 2) * 1.6;
wCyl(0.07, 0.09, 7, steel, x, 5, z, g, 5);
var r = new THREE.Group();
r.position.set(x, 8.6, z);
g.add(r);
wBox(5.2, 0.05, 0.3, vrnC(0xC8C0B0), 0, 0, 0, r);
wBox(0.3, 0.05, 5.2, vrnC(0xC8C0B0), 0, 0, 0, r);
rot.push(r);
}
var props = [];
[-1, 1].forEach(function (s) { var p = new THREE.Group(); p.position.set(0, 0, s * (L / 2 + 1.2)); g.add(p); for (var b = 0; b < 4; b++) {
var bl = wBox(0.3, 3.4, 0.12, steel, 0, 0, 0, p);
bl.rotation.z = b / 4 * Math.PI * 2;
} props.push(p); });
var flag = wBox(1.6, 1, 0.04, vrnC(0x1A1A1A, { ds: true }), 0, 10.8, L * 0.48, g);
var sun = new THREE.Mesh(new THREE.CircleGeometry(0.3, 12), vrnC(0xE8C83A));
sun.position.set(0, 10.8, L * 0.48 + 0.03);
g.add(sun);
g.userData.rotors = rot;
g.userData.props = props;
return g;
},
function (s) {
var g = new THREE.Group(), al = vrnC(0xD8DCE0, { shine: 90, spec: 0xFFFFFF });
wCyl(1.37, 1.37, 2.4, al, 0, 1.2, 0, g, VRN.lite ? 12 : 24);
wCone(1.37, 1.8, al, 0, 3.3, 0, g, VRN.lite ? 12 : 24);
for (var w = 0; w < 4; w++) {
var a = w / 4 * Math.PI * 2, p = new THREE.Mesh(new THREE.CircleGeometry(0.22, 12), vrnC(0x3A5A7A, { e: 0x1A2A3A, ei: 0.4 }));
p.position.set(Math.cos(a) * 1.38, 1.6, Math.sin(a) * 1.38);
p.rotation.y = -a + Math.PI / 2;
g.add(p);
}
g.scale.setScalar(s || 1);
return g;
},
function (s) {
var g = new THREE.Group(), st = vrnMetal(0x7A7E86), dk = vrnMetal(0x4A4E56);
var body = new THREE.Mesh(new THREE.SphereGeometry(2.4, 14, 10), st);
body.scale.set(1, 0.85, 1.5);
body.position.y = 3.6;
g.add(body);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { wCyl(0.65, 0.75, 2.6, st, k[0] * 1.3, 1.3, k[1] * 2, g, 10); wCyl(0.8, 0.8, 0.25, dk, k[0] * 1.3, 0.12, k[1] * 2, g, 10); });
var head = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 10), st);
head.position.set(0, 4.6, -3.6);
g.add(head);
[-1, 1].forEach(function (k) { var ear = wBox(0.15, 2.2, 1.8, dk, k * 1.5, 4.6, -3.2, g); ear.rotation.y = k * 0.3; });
var pts = [];
for (var i = 0; i <= 10; i++) {
var t = i / 10;
pts.push(new THREE.Vector3(0, 4.3 - t * 2.2 + Math.pow(t, 3) * 3.2, -4.6 - t * 1.6));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.35, 6, false), st));
[-1, 1].forEach(function (k) { var tusk = wCone(0.12, 1.4, vrnC(0xF2EAD8), k * 0.5, 3.8, -4.4, g, 6); tusk.rotation.x = -1.8; });
wBox(2.4, 1.4, 2.6, vrnC(0x8A2A22), 0, 6.2, 0.4, g);
wCone(1.6, 1.2, vrnBrass(), 0, 7.5, 0.4, g, 8);
g.scale.setScalar(s || 1);
return g;
},
function () {
var g = new THREE.Group(), wood = vrnSurf("bark", 0x8A6A4A, 1);
for (var i = 0; i < 7; i++) {
var l = wCyl(0.3, 0.3, 7, wood, -1.8 + i * 0.6, 0.15, 0, g, 7);
l.rotation.x = Math.PI / 2;
}
wBox(4.4, 0.1, 0.3, vrnC(0x5A4A3A), 0, 0.4, -2.8, g);
wBox(4.4, 0.1, 0.3, vrnC(0x5A4A3A), 0, 0.4, 2.8, g);
wCyl(0.1, 0.12, 5, vrnC(0x6A5A3A), 0, 2.6, -0.6, g, 6);
var sail = wBox(3, 2.6, 0.04, vrnC(0xE8DCC0, { ds: true }), 0, 3.4, -0.5, g);
return g;
},
function () {
var g = new THREE.Group(), blk = vrnMetal(0x1E1E22), red = vrnC(0x8A2A22), grn = vrnC(0x2A4A3A);
wCyl(1.1, 1.1, 6, blk, 0, 2.2, -3, g, 14).rotation.x = Math.PI / 2;
wBox(2.4, 2.6, 2.4, blk, 0, 2.6, 0.6, g);
wCyl(0.3, 0.45, 1.6, blk, 0, 3.9, -5, g, 10);
wCone(1.2, 1.4, red, 0, 1, -6.6, g, 4).rotation.x = -Math.PI / 2;
for (var w = 0; w < 3; w++)
[-1, 1].forEach(function (s) { var wh = wCyl(0.8, 0.8, 0.2, red, s * 1.1, 0.8, -4.5 + w * 2, g, 14); wh.rotation.z = Math.PI / 2; });
wBox(2.4, 1.8, 3.4, blk, 0, 1.6, 3.6, g);
[8.6, 15.4].forEach(function (cz) { wBox(2.6, 2.6, 6, grn, 0, 2.2, cz, g); wBox(2.8, 0.2, 6.2, vrnC(0x3A3A3A), 0, 3.6, cz, g); for (var k = 0; k < 4; k++)
[-1, 1].forEach(function (s) { wBox(0.05, 0.8, 0.9, vrnC(0xFFE8B0, { e: 0xFFD890, ei: 0.4 }), s * 1.31, 2.6, cz - 2.2 + k * 1.5, g); }); });
g.userData.chimney = { x: 0, y: 4.7, z: -5 };
return g;
},
function (parent, x, z, o) {
var g = new THREE.Group(), fur = vrnC(0xA8502A), face = vrnC(0x5A3A2A);
var body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), fur);
body.scale.set(1, 1.2, 0.85);
body.position.y = 0.95;
g.add(body);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), fur);
head.position.set(0, 1.62, -0.05);
g.add(head);
var f = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), face);
f.scale.set(1, 0.9, 0.6);
f.position.set(0, 1.58, -0.22);
g.add(f);
[-1, 1].forEach(function (k) { var arm = wCyl(0.09, 0.11, 1.1, fur, k * 0.55, 0.95, 0, g, 6); arm.rotation.z = k * 0.25; var leg = wCyl(0.11, 0.12, 0.5, fur, k * 0.22, 0.3, 0, g, 6); });
g.position.set(x, (o && o.y) || 0, z);
parent.add(g);
var P = { g: g, wander: { r: 6, sp: 0.9 } };
VRN.people.push(P);
VRN.talk.push({ p: P, name: "Jup the orangutan", r: 2.6, t: { name: "Jup", persona: "Jup (Master Jupiter), the orangutan who lives with the castaways in Granite House: clever, gentle, helpful, a fine waiter at table and fond of a little cake. He answers only with friendly grunts and gestures, never words.", greet: "*Jup grunts happily and offers you a coconut.*" } });
return P;
},
function (arch, s, seed) {
var g = null;
try {
g = buildCreature({ id: "vrn_" + arch + "_" + (seed || 0), archetype: arch, attrs: {}, solid: false, detail: VRN.lite ? 2 : 3, nights: [], city: false }, 1);
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
var b = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), vrnC(0x5A6A7A));
b.scale.set(0.6, 0.5, 1.6);
g.add(b);
}
if (s)
g.scale.multiplyScalar(s);
return g;
},
function (G) {
var y = VRN_TOWN.y;
vrnPave(G, 100, -205, 1416, 710, y - 0.02, 0xD8D0C4, 3.2);
vrnPave(G, -654, -60, 492, 420, y - 0.02, 0xC8C0B4, 3.2);
var stone = vrnSurf("stone", 0xC8C0B0, 2.5);
vrnBoxM(2000, 13.2, 4, stone, 100, y - 6.6, 152, G);
vrnBoxM(2000, 0.4, 1.4, vrnSurf("stone", 0xD8D0C0, 2), 100, y + 0.2, 151.2, G);
var iron = vrnMetal(0x2A2A2E);
for (var x = -880; x < 1100; x += 24) {
wCyl(0.25, 0.32, 0.8, iron, x, y + 0.4, 150.6, G, 8);
}
[-500, 60, 600].forEach(function (sx) { for (var s = 0; s < 12; s++)
vrnBoxM(6, 0.4, 0.6, stone, sx, y - 0.4 - s * 0.4, 153 + s * 0.6, G); });
var L = VRN_HB.light;
vrnBoxM(14, 13.2, 120, stone, L.x, y - 6.6, 200, G);
vrnFloor(L.x, 200, 7, 60, y);
vrnSolid({ x: L.x - 7.6, z: 200, hw: 0.5, hd: 60, h: 2, b: y });
vrnSolid({ x: L.x + 7.6, z: 200, hw: 0.5, hd: 60, h: 2, b: y });
wCyl(7, 8, 6, stone, L.x, y + 3, L.z, G, 24);
var tower = wCyl(3.2, 4.4, 30, vrnSurf("plaster", 0xF2EEE6, 3), L.x, y + 21, L.z, G, 20);
for (var b = 0; b < 3; b++)
wCyl(4.25 - b * 0.35, 4.3 - b * 0.35, 1.6, vrnC(0xB83A2A), L.x, y + 12 + b * 9, L.z, G, 20);
wCyl(4, 4, 0.5, iron, L.x, y + 36.2, L.z, G, 20);
wCyl(2.4, 2.4, 3, vrnC(0xFFF4D8, { e: 0xFFE0A0, ei: 0.6 }), L.x, y + 38, L.z, G, 16);
wCone(2.8, 2.4, vrnMetal(0x3A3A3E), L.x, y + 40.7, L.z, G, 16);
var lg = wGlow(0xFFE8B0, 10, 0.35);
lg.position.set(L.x, y + 38, L.z);
G.add(lg);
vrnSolid({ x: L.x, z: L.z, r: 7.5 });
vrnBoxM(10, 13, 220, stone, -860, y - 6.5, 260, G);
},
function (G) {
var P = VRN_HB.palace, y = VRN_TOWN.y, n = VRN.lite ? 28 : 56, grp = new THREE.Group();
grp.position.set(P.x, y, P.z);
G.add(grp);
var ironM = vrnFacMat("iron", 0x2A3A4A, 0), baseM = vrnSurf("stone", 0xD8D0C0, 2.5);
for (var i = 0; i < n; i++) {
var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, x0 = Math.cos(a0) * P.rx, z0 = Math.sin(a0) * P.rz, x1 = Math.cos(a1) * P.rx, z1 = Math.sin(a1) * P.rz;
var mx = (x0 + x1) / 2, mz = (z0 + z1) / 2, l = Math.hypot(x1 - x0, z1 - z0) + 0.2, a = Math.atan2(z1 - z0, x1 - x0);
var w = new THREE.Mesh(vrnWallGeo(l, P.h - 3, 4, 4), ironM);
w.position.set(mx, 3 + (P.h - 3) / 2, mz);
w.rotation.y = -a + Math.PI;
grp.add(w);
var w2 = new THREE.Mesh(vrnWallGeo(l, P.h - 3, 4, 4), ironM);
w2.position.copy(w.position);
w2.rotation.y = -a;
grp.add(w2);
var b = vrnBoxM(l, 3, 1.2, baseM, mx, 1.5, mz, grp);
b.rotation.y = -a;
vrnSolid({ x: P.x + mx, z: P.z + mz, hw: l / 2, hd: 0.8, rot: a, h: P.h + 2, b: y });
}
var dome = new THREE.Mesh(new THREE.SphereGeometry(1, VRN.lite ? 20 : 40, VRN.lite ? 8 : 14, 0, Math.PI * 2, 0, Math.PI / 2), VRN.lite ? vrnC(0x8AA8C0, { op: 0.55 }) : new THREE.MeshPhongMaterial({ color: 0x9AC0D8, transparent: true, opacity: 0.42, shininess: 90, specular: 0xDDEEFF, depthWrite: false, side: THREE.DoubleSide }));
dome.scale.set(P.rx, 26, P.rz);
dome.position.y = P.h;
grp.add(dome);
var ribM = vrnMetal(0x2A3440), rn = VRN.lite ? 8 : 16;
for (var r = 0; r < rn; r++) {
var ang = r / rn * Math.PI, pts = [];
for (var k = 0; k <= 16; k++) {
var t = k / 16 * Math.PI;
pts.push(new THREE.Vector3(Math.cos(ang) * Math.cos(t) * P.rx, P.h + Math.sin(t) * 26, Math.sin(ang) * Math.cos(t) * P.rz));
}
grp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.35, 5, false), ribM));
}
for (var ring = 1; ring < 4; ring++) {
var t2 = ring / 4 * Math.PI / 2, rr = Math.cos(t2), tor = new THREE.Mesh(new THREE.TorusGeometry(1, 0.006, 4, VRN.lite ? 32 : 64), ribM);
tor.scale.set(P.rx * rr, P.rz * rr, 60);
tor.rotation.x = Math.PI / 2;
tor.position.y = P.h + Math.sin(t2) * 26;
grp.add(tor);
}
wCyl(4, 5, 6, ribM, 0, P.h + 29, 0, grp, 12);
wCone(5, 4, vrnMetal(0x3A4450), 0, P.h + 34, 0, grp, 12);
var fc = [0x2A4AA8, 0xC83A2A, 0xF2F2F2, 0x2A8A3A, 0xE8C83A, 0x1A1A1A];
for (var f = 0; f < 12; f++) {
var fa = f / 12 * Math.PI * 2, fx = Math.cos(fa) * (P.rx + 10), fz = Math.sin(fa) * (P.rz + 10);
wCyl(0.12, 0.15, 14, vrnMetal(0xD8D8D8), fx, 7, fz, grp, 6);
var fl = wBox(2.4, 1.5, 0.05, vrnC(fc[f % fc.length], { ds: true }), fx + 1.3, 13, fz, grp);
VRN.fx.push({ k: "flag", m: fl, ph: f });
}
var dz = P.rz + 0.6, portal = new THREE.Group();
portal.position.set(0, 0, dz);
grp.add(portal);
var st = vrnSurf("stone", 0xE4DCCC, 2);
[-1, 1].forEach(function (k) { vrnBoxM(3, 20, 3, st, k * 8, 10, 0, portal); });
vrnBoxM(19, 4, 3, st, 0, 21, 0, portal);
vrnBoxM(12, 14, 0.4, vrnC(0x3A2A1E), 0, 7, -0.6, portal);
var sg = vrnSign(["PALACE OF THE EXPOSITION", "OF EXTRAORDINARY VOYAGES · 1870 · THE INVENTORS' HALL"], 14, 2.2, 0, 17.5, 1.6, 0, portal);
vrnSpot(P.x, P.z + P.rz + 3, 4, "The Palace of the Exposition", "go in", function () { vrnEnter("palace"); }, y);
},
function (G) {
var y = VRN_TOWN.y, B = VRN_HB;
var R = B.reform, rf = vrnBuilding(G, R.x, R.z, R.w, R.d, { y: y, style: "club", col: 0xB8B0A0, floors: 2, roofCol: 0x4A5058 });
var col = vrnC(0xE8E0D0);
for (var c = -2; c <= 2; c++) {
wCyl(0.6, 0.7, 8, col, R.x + c * 4, y + 4, R.z + R.d / 2 + 3, G, 12);
}
vrnBoxM(22, 1.2, 5, vrnSurf("stone", 0xE4DCCC, 2), R.x, y + 8.6, R.z + R.d / 2 + 3, G);
vrnSign(["THE REFORM CLUB", "Pall Mall · Members and guests"], 10, 1.6, R.x, y + 10.2, R.z + R.d / 2 + 5.6, 0, G);
vrnSpot(R.x, R.z + R.d / 2 + 2, 4, "The Reform Club", "go in", function () { vrnEnter("reform"); }, y);
var C = B.chandler;
vrnBuilding(G, C.x, C.z, C.w, C.d, { y: y, style: "brick", col: 0x9A5A40, floors: 1, pitch: 3.4, sign: ["HORTENSE GARNIER", "SHIP CHANDLER · OUTFITTER"], door: { theme: "chandlery", name: "The ship chandler's", lx: 5.5, doors: "the shop door" } });
vrnSpot(C.x, C.z + C.d / 2 + 1.8, 3.5, "The ship chandler's", "see what she sells", function () { vrnOutfitter(); }, y);
var V = B.verne;
vrnBuilding(G, V.x, V.z, V.w, V.d, { y: y, style: "brick", col: 0xB86A4A, floors: 2, roofCol: 0x4A5058 });
var tw = new THREE.Group();
tw.position.set(V.x + V.w / 2, y, V.z + V.d / 2);
G.add(tw);
wCyl(4.2, 4.2, 16, vrnSurf("brick", 0xB86A4A, 1.6), 0, 8, 0, tw, VRN.lite ? 12 : 20);
wCyl(4.5, 4.5, 0.5, vrnC(0xE8E0D0), 0, 16, 0, tw, 20);
wCone(5, 7, vrnSurf("slate", 0x4A5058, 2), 0, 19.8, 0, tw, VRN.lite ? 12 : 20);
for (var wi = 0; wi < 4; wi++) {
var wa = wi / 4 * Math.PI * 2 + 0.4;
wBox(1, 2, 0.1, vrnC(0x2A3038), Math.cos(wa) * 4.22, 11, Math.sin(wa) * 4.22, tw).rotation.y = -wa + Math.PI / 2;
}
vrnSolid({ x: V.x + V.w / 2, z: V.z + V.d / 2, r: 4.4 });
vrnSign(["M. JULES VERNE", "The Library of the Voyages · visitors welcome"], 7, 1.3, V.x, y + 4.6, V.z + V.d / 2 + 0.15, 0, G);
vrnSpot(V.x - 4, V.z + V.d / 2 + 1.8, 3.5, "Verne's house", "go in", function () { vrnEnter("verne"); }, y);
var F = B.foundry;
vrnBuilding(G, F.x, F.z, F.w, F.d, { y: y, style: "brick", col: 0x8A4A36, floors: 1, pitch: 5, roofCol: 0x3A3E44, sign: ["THE EXPOSITION FOUNDRY", "iron · brass · steam"], door: { theme: "foundry", name: "The Exposition foundry", lx: 12, doors: "the yard gate" } });
[-1, 1].forEach(function (k) { wCyl(1.4, 2, 26, vrnSurf("brick", 0x7A3A2A, 1.6), F.x + k * 14, y + 13, F.z - 8, G, 10); VRN.smokers.push({ x: F.x + k * 14, y: y + 26, z: F.z - 8, r: 1.2, dark: 0 }); });
var fg = wGlow(0xFF9A4A, 5, 0.4);
fg.position.set(F.x, y + 2.4, F.z + F.d / 2 + 0.4);
G.add(fg);
vrnSpot(F.x, F.z + F.d / 2 + 1.8, 3.5, "The Exposition foundry", "make something at the forge", function () { vrnForge(); }, y);
var Gc = B.gunclub;
vrnBuilding(G, Gc.x, Gc.z, Gc.w, Gc.d, { y: y, style: "brick", col: 0x9A6048, floors: 2, roofCol: 0x4A5058, sign: ["THE GUN CLUB", "of Baltimore · Reading Room"] });
var mor = wCyl(1.3, 1.6, 2.4, vrnMetal(0x3A3A3A), Gc.x + 8, y + 1.6, Gc.z + Gc.d / 2 + 4, G, 14);
mor.rotation.x = -0.5;
wBox(3, 1, 3, vrnSurf("stone", 0xC8C0B0, 2), Gc.x + 8, y + 0.5, Gc.z + Gc.d / 2 + 4, G);
vrnSolid({ x: Gc.x + 8, z: Gc.z + Gc.d / 2 + 4, r: 1.7 });
vrnSpot(Gc.x - 4, Gc.z + Gc.d / 2 + 1.8, 3.5, "The Gun Club", "go in", function () { vrnEnter("gunclub"); }, y);
var S = B.society;
vrnBuilding(G, S.x, S.z, S.w, S.d, { y: y, style: "stone", col: 0xE4DCCC, floors: 2, roofCol: 0x5A6068, sign: ["THE GEOGRAPHICAL SOCIETY", "Lectures · the Fellowship examination"] });
var gl = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 12), vrnBrass());
gl.position.set(S.x, y + 18, S.z + S.d / 2 + 0.5);
G.add(gl);
vrnSpot(S.x, S.z + S.d / 2 + 1.8, 3.5, "The Geographical Society", "go in", function () { vrnEnter("society"); }, y);
var W = B.weldon;
vrnBuilding(G, W.x, W.z, W.w, W.d, { y: y, style: "stone", col: 0xD8CCB4, floors: 2, roofCol: 0x5A6068, sign: ["THE WELDON INSTITUTE", "for the lighter-than-air"] });
vrnSpot(W.x, W.z + W.d / 2 + 1.8, 3.5, "The Weldon Institute", "go in", function () { vrnEnter("weldon"); }, y);
var St = B.station;
vrnBuilding(G, St.x, St.z, St.w, St.d, { y: y, style: "stone", col: 0xE0D4BC, floors: 1, roofCol: 0x4A5058, sign: ["GARE DES VOYAGES", "Stapi & Snaefells · Stone's Hill"], door: { theme: "gare", name: "The Gare des Voyages", lx: 12, doors: "the station door" } });
var clock = new THREE.Mesh(new THREE.CircleGeometry(1.4, 24), vrnC(0xF8F4E8));
clock.position.set(St.x, y + 12, St.z + St.d / 2 + 0.2);
G.add(clock);
vrnSpot(St.x, St.z + St.d / 2 + 1.8, 4, "The Gare des Voyages", "take a train", function () { vrnTrainCard(); }, y);
var Gl = B.globe, gg = new THREE.Group();
gg.position.set(Gl.x, y, Gl.z);
G.add(gg);
wCyl(3.4, 4, 1.2, vrnSurf("stone", 0xD8D0C0, 2), 0, 0.6, 0, gg, 20);
wCyl(1.2, 1.6, 5, vrnSurf("marble", 0xE8E4DC, 2), 0, 3.6, 0, gg, 14);
var ring = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.12, 6, 40), vrnBrass());
ring.position.y = 9.5;
ring.rotation.x = 0.41;
gg.add(ring);
var earth = new THREE.Mesh(new THREE.SphereGeometry(3.2, VRN.lite ? 20 : 36, VRN.lite ? 14 : 24), new THREE.MeshPhongMaterial({ map: vrnGlobeTex(), shininess: 30 }));
earth.position.y = 9.5;
earth.rotation.z = 0.41;
gg.add(earth);
VRN.fx.push({ k: "spin", m: earth, sp: 0.08 });
vrnSolid({ x: Gl.x, z: Gl.z, r: 4.2 });
vrnSpot(Gl.x, Gl.z + 5, 4.5, "The Globe of the Voyages", "see where the voyages go", function () { vrnVoyagesCard(); }, y);
vrnSign(["THE HARBOUR MASTER", "Boats to Lincoln Island · Stromboli · the Nautilus dock"], 6, 1.6, 60, y + 2.6, 128, Math.PI, G);
wBox(0.2, 2.2, 0.2, vrnC(0x3A2A1E), 57.4, y + 1.1, 128, G);
wBox(0.2, 2.2, 0.2, vrnC(0x3A2A1E), 62.6, y + 1.1, 128, G);
vrnSpot(60, 124, 3.5, "The harbour master's board", "take a boat", function () { vrnBoatCard(); }, y);
},
function () {
if (VRN_GLOBE)
return VRN_GLOBE;
VRN_GLOBE = wTex(512, 256, function (x, W, H) {
x.fillStyle = "#3A6A8A";
x.fillRect(0, 0, W, H);
var lands = [[0.08, 0.2, 0.18, 0.24], [0.2, 0.5, 0.08, 0.2], [0.27, 0.34, 0.06, 0.1], [0.45, 0.22, 0.12, 0.12], [0.47, 0.46, 0.1, 0.22], [0.6, 0.22, 0.22, 0.18], [0.7, 0.42, 0.08, 0.08], [0.82, 0.62, 0.1, 0.08], [0.5, 0.92, 0.5, 0.05]];
x.fillStyle = "#C8B888";
lands.forEach(function (L) { x.beginPath(); x.ellipse(L[0] * W + L[2] * W / 2, L[1] * H + L[3] * H / 2, L[2] * W / 2, L[3] * H / 2, 0, 0, 7); x.fill(); });
x.strokeStyle = "rgba(240,230,200,.35)";
x.lineWidth = 1;
for (var i = 1; i < 12; i++) {
x.beginPath();
x.moveTo(i * W / 12, 0);
x.lineTo(i * W / 12, H);
x.stroke();
}
for (var j = 1; j < 6; j++) {
x.beginPath();
x.moveTo(0, j * H / 6);
x.lineTo(W, j * H / 6);
x.stroke();
}
x.strokeStyle = "rgba(200,60,40,.8)";
x.setLineDash([6, 4]);
x.lineWidth = 2;
x.beginPath();
x.moveTo(0.46 * W, 0.26 * H);
x.lineTo(0.55 * W, 0.36 * H);
x.lineTo(0.68 * W, 0.38 * H);
x.lineTo(0.8 * W, 0.32 * H);
x.lineTo(W, 0.3 * H);
x.moveTo(0, 0.3 * H);
x.lineTo(0.12 * W, 0.3 * H);
x.lineTo(0.25 * W, 0.28 * H);
x.lineTo(0.46 * W, 0.26 * H);
x.stroke();
x.setLineDash([]);
});
return VRN_GLOBE;
},
function (G) {
var R = wRand(2718), y = VRN_TOWN.y, D = VRN.lite ? 16 : 14;
VRN_HB_BLOCKS.forEach(function (B) {
var grp = new THREE.Group();
grp.name = "vrn-houses";
G.add(grp);
function row(x0, z0, x1, z1, face) {
var len = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(z1 - z0, x1 - x0), t = 4;
while (t < len - 8) {
var w = VRN.lite ? 20 + R() * 10 : 12 + R() * 12;
if (t + w > len - 4)
w = len - 4 - t;
if (w < 8)
break;
var cx = x0 + Math.cos(a) * (t + w / 2), cz = z0 + Math.sin(a) * (t + w / 2);
cx += Math.cos(a + face) * D / 2;
cz += Math.sin(a + face) * D / 2;
if (!vrnHbKept(cx - w / 2, cz - D / 2, cx + w / 2, cz + D / 2))
vrnBuilding(grp, cx, cz, w, D, { y: y, style: R() < 0.7 ? "stone" : "brick", col: R() < 0.7 ? VRN_COLS[(R() * VRN_COLS.length) | 0] : 0xA86048, floors: VRN.lite ? 2 : 2 + ((R() * 3) | 0), ry: -a - face + Math.PI / 2, door: {} });
t += w + (VRN.lite ? 6 : 0.2);
}
}
row(B[0], B[3], B[2], B[3], -Math.PI / 2);
row(B[0], B[1], B[2], B[1], Math.PI / 2);
VRN.districts.push({ g: grp, x: (B[0] + B[2]) / 2, z: (B[1] + B[3]) / 2, r: Math.hypot(B[2] - B[0], B[3] - B[1]) / 2 });
});
for (var x = -860; x < 1080; x += VRN.lite ? 60 : 30)
vrnLamp(G, x, y, 140);
for (var z = -540; z < 100; z += VRN.lite ? 60 : 30) {
vrnLamp(G, 36, y, z);
vrnLamp(G, 84, y, z);
}
},
function (G) {
var y = VRN_TOWN.y, V = VRN_HB.victoria;
var vg = vrnBalloonModel();
vg.position.set(V.x, y, V.z);
G.add(vg);
VRN.fieldBalloon = vg;
for (var k = 0; k < 4; k++) {
var a = k / 4 * Math.PI * 2 + 0.6;
var rope = wCyl(0.03, 0.03, 9, vrnC(0x8A7A5A), V.x + Math.cos(a) * 4, y + 4, V.z + Math.sin(a) * 4, G, 4);
rope.rotation.z = Math.cos(a) * 0.4;
rope.rotation.x = -Math.sin(a) * 0.4;
}
vrnSpot(V.x, V.z + 4, 5, "The Victoria, Dr Fergusson's balloon", "climb into the basket", function () { vrnBalloonCard(); }, y);
var M = VRN_HB.mast, iron = vrnMetal(0x3A3E44), mg = new THREE.Group();
mg.position.set(M.x, y, M.z);
G.add(mg);
for (var l = 0; l < 4; l++) {
var la = l / 4 * Math.PI * 2 + Math.PI / 4, leg = wCyl(0.25, 0.4, M.h, iron, Math.cos(la) * 3, M.h / 2, Math.sin(la) * 3, mg, 6);
leg.rotation.z = -Math.cos(la) * 0.07;
leg.rotation.x = Math.sin(la) * 0.07;
}
for (var b = 4; b < M.h; b += 6) {
var s = 3.2 - b * 0.03;
wBox(s * 2, 0.2, 0.2, iron, 0, b, s, mg);
wBox(s * 2, 0.2, 0.2, iron, 0, b, -s, mg);
wBox(0.2, 0.2, s * 2, iron, s, b, 0, mg);
wBox(0.2, 0.2, s * 2, iron, -s, b, 0, mg);
}
wBox(10, 0.5, 10, vrnSurf("wood", 0x8A6A4A, 2), 0, M.h, 0, mg);
var alb = vrnAlbatrossModel();
alb.position.set(M.x + 24, y + M.h + 4, M.z);
alb.rotation.y = Math.PI / 2;
G.add(alb);
VRN.mastAlbatross = alb;
vrnSolid({ x: M.x, z: M.z, r: 3.6 });
vrnSpot(M.x, M.z + 5, 5, "Robur's mast: the Albatross is moored above", "climb up and go aboard the Albatross", function () { vrnAlbatrossOn(); }, y);
},
function (o) {
o = o || {};
var g = new THREE.Group(), L = o.len || 60, B = o.beam || 9, lite = VRN.lite, hullC = o.hull || 0x1A1A1E, hull = vrnC(hullC), deck = vrnSurf("wood", 0xB89A70, 2), white = vrnC(0xF2EEE6, { shine: 20 }), dark = vrnC(0x2A2420), spar = vrnSurf("wood", 0x5A4632, 1), iron = vrnMetal(0x2A2A2E), rope = vrnC(0x2A2018), SH = 0.9;
function top(t) { return SH * Math.pow(2 * t - 1, 2) + (t > 0.85 ? (t - 0.85) * 4 : 0); }
if (typeof vlgHullMesh === "function") {
var hm = vlgHullMesh(L, B, 5, { hull: hullC, band: false, sheer: SH, wl: -3.0, bottom: 0x7A3A22, boot: 0xE8E4DA });
hm.position.y = 3.0;
g.add(hm);
}
else {
var bx = new THREE.Mesh(new THREE.BoxGeometry(L, 5, B), hull);
bx.position.y = 0.5;
g.add(bx);
}
var N = lite ? 14 : 26, sh = new THREE.Shape();
for (var i = 0; i <= N; i++) {
var t = i / N;
sh[i ? "lineTo" : "moveTo"](-L / 2 + t * L, B / 2 * vrnSteamerHB(t) * 0.97);
}
for (var j = N; j >= 0; j--) {
var t2 = j / N;
sh.lineTo(-L / 2 + t2 * L, -B / 2 * vrnSteamerHB(t2) * 0.97);
}
var dg = new THREE.ShapeGeometry(sh);
dg.rotateX(-Math.PI / 2);
var dm = new THREE.Mesh(dg, deck);
dm.position.y = 3.1;
g.add(dm);
[-1, 1].forEach(function (s) {
for (var i = 0; i < N; i++) {
var t0 = i / N, t1 = (i + 1) / N;
if (t1 > 0.985)
t1 = 0.985;
var x0 = -L / 2 + t0 * L, x1 = -L / 2 + t1 * L, z0 = s * B / 2 * vrnSteamerHB(t0) * 0.97, z1 = s * B / 2 * vrnSteamerHB(t1) * 0.97, y0 = 3.0 + top(t0), y1 = 3.0 + top(t1);
var len = Math.hypot(x1 - x0, z1 - z0), mx = (x0 + x1) / 2, mz = (z0 + z1) / 2, ry = -Math.atan2(z1 - z0, x1 - x0), base = Math.min(y0, y1);
var bw = wBox(len + 0.05, 1.0 + Math.abs(y1 - y0), 0.16, hull, mx, base + 0.5 + Math.abs(y1 - y0) / 2, mz, g);
bw.rotation.y = ry;
var cr = wBox(len + 0.05, 0.12, 0.3, white, mx, Math.max(y0, y1) + 1.05, mz, g);
cr.rotation.y = ry;
}
});
wBox(0.16, 1.0 + top(0), B * 0.72 * 0.97, hull, -L / 2 + 0.1, 3.0 + (1 + top(0)) / 2, 0, g);
wBox(0.3, 0.12, B * 0.72 * 0.97, white, -L / 2 + 0.1, 3.0 + top(0) + 1.05, 0, g);
if (!lite)
[-1, 1].forEach(function (s) { for (var px = -L * 0.38; px < L * 0.3; px += 2.2) {
var t = (px + L / 2) / L, ph = new THREE.Mesh(new THREE.CircleGeometry(0.22, 10), vrnC(0x1A2028, { shine: 80 }));
ph.position.set(px, 1.9, s * (B / 2 * vrnSteamerHB(t) + 0.02));
ph.rotation.y = s > 0 ? 0 : Math.PI;
g.add(ph);
} });
var hx = -L * 0.05, hw = L * 0.3, hd = B * 0.6;
wBox(hw, 2.4, hd, white, hx, 4.4, 0, g);
wBox(hw + 0.4, 0.15, hd + 0.4, vrnC(0x8A6A44), hx, 5.65, 0, g);
[-1, 1].forEach(function (s) { for (var wx = -hw / 2 + 1; wx < hw / 2 - 0.6; wx += 1.6)
wBox(0.7, 0.7, 0.04, vrnC(0x2A3440, { shine: 80 }), hx + wx, 4.7, s * (hd / 2 + 0.02), g); });
var bz = hx + hw / 2 - 2;
wBox(3, 1.8, hd * 0.7, white, bz, 6.6, 0, g);
for (var bw2 = -1; bw2 <= 1; bw2++)
wBox(0.04, 0.6, 0.7, vrnC(0x2A3440, { shine: 80 }), bz + 1.52, 6.9, bw2 * 1, g);
wBox(3.4, 0.12, hd * 0.8, vrnC(0x8A6A44), bz, 7.55, 0, g);
wBox(1.2, 0.9, B * 0.95, vrnC(0x8A6A44), bz - 0.5, 6.2, 0, g).scale.set(1, 0.15, 1);
wBox(L * 0.1, 1.6, hd * 0.7, white, L * 0.22, 3.9, 0, g);
var fg = new THREE.Group();
fg.position.set(0, 5.6, 0);
fg.rotation.z = 0.06;
g.add(fg);
wCyl(1.1, 1.2, 8, vrnC(o.funnel || 0xC83A2A, { shine: 20 }), 0, 4, 0, fg, 14);
wCyl(1.16, 1.16, 1.6, vrnC(0x141414), 0, 7.4, 0, fg, 14);
wCyl(1.3, 1.16, 0.2, iron, 0, 8.2, 0, fg, 14);
wCyl(0.12, 0.12, 8.6, iron, -1.5, 4.3, 0, fg, 6);
[[L * 0.1, 1], [L * 0.1, -1], [-L * 0.22, 1], [-L * 0.22, -1]].forEach(function (v) { var vx = v[0], vz = v[1] * B * 0.28; wCyl(0.28, 0.28, 2.2, white, vx, 4.2, vz, g, 10); var cw = wCyl(0.5, 0.3, 0.7, white, vx + 0.2, 5.4, vz, g, 10); cw.rotation.z = -1.1; wCyl(0.32, 0.32, 0.05, dark, vx + 0.5, 5.55, vz, g, 10).rotation.z = -1.1; });
[-1, 1].forEach(function (s) {
[-L * 0.16, L * 0.06].forEach(function (bx) {
var bt = new THREE.Mesh(new THREE.SphereGeometry(1, lite ? 8 : 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), white);
bt.scale.set(2.8, 0.75, 0.8);
bt.position.set(bx, 5.2, s * (B / 2 + 0.2));
g.add(bt);
wBox(5.4, 0.06, 1.3, vrnC(0x8A8274), bx, 5.22, s * (B / 2 + 0.2), g);
[-2.3, 2.3].forEach(function (d) { wCyl(0.07, 0.09, 3.4, iron, bx + d, 4.6, s * (B / 2 - 0.3), g, 6); var arm = wCyl(0.06, 0.06, 0.9, iron, bx + d, 6.25, s * (B / 2 + 0.05), g, 6); arm.rotation.x = Math.PI / 2; });
});
});
[-L * 0.32, L * 0.3].forEach(function (mx, mi) {
var H = mi ? 18 : 16;
wCyl(0.22, 0.32, H, spar, mx, 3.1 + H / 2, 0, g, 8);
wCyl(0.12, 0.16, 5, spar, mx, 3.1 + H + 2, 0, g, 6);
[[0.55, 0.9], [0.78, 0.65]].forEach(function (f) { var w = B * 1.2 * f[1], yd = wCyl(0.11, 0.11, w, spar, mx, 3.1 + H * f[0], 0, g, 6); yd.rotation.x = Math.PI / 2; var sl = wCyl(0.24, 0.24, w * 0.9, vrnC(0xEDE6D2), mx + 0.12, 3.1 + H * f[0] + 0.22, 0, g, 7); sl.rotation.x = Math.PI / 2; });
wBox(2.4, 0.14, 2.4, spar, mx, 3.1 + H * 0.62, 0, g);
if (!lite)
[-1, 1].forEach(function (s) { for (var r = 0; r < 3; r++) {
var a = new THREE.Vector3(mx, 3.1 + H * 0.6, 0), t = (mx - 1 + r * 0.8 + L / 2) / L, b = new THREE.Vector3(mx - 1 + r * 0.8, 3.0 + top(t) + 1.0, s * B / 2 * vrnSteamerHB(t) * 0.97), l2 = a.distanceTo(b), m = wCyl(0.025, 0.025, l2, rope, (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2, g, 3);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
} });
if (!lite) {
var tx = mi ? L / 2 + L * 0.08 : -L / 2 + 1, ty = mi ? 3.0 + top(1) + 1.4 : 3.0 + top(0) + 1.2, a2 = new THREE.Vector3(mx, 3.1 + H, 0), b2 = new THREE.Vector3(tx, ty, 0), st = wCyl(0.03, 0.03, a2.distanceTo(b2), rope, (a2.x + b2.x) / 2, (a2.y + b2.y) / 2, 0, g, 3);
st.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b2.clone().sub(a2).normalize());
}
});
var bs = wCyl(0.18, 0.3, L * 0.14, spar, L / 2 + L * 0.05, 3.0 + top(1) + 0.6, 0, g, 8);
bs.rotation.z = Math.PI / 2 - 0.2;
[-1, 1].forEach(function (s) { var t = 0.9, ax = -L / 2 + t * L, az = s * (B / 2 * vrnSteamerHB(t) + 0.1); wBox(0.25, 1.6, 0.9, iron, ax, 2.0, az, g); wBox(0.25, 0.25, 1.6, iron, ax, 1.3, az, g); });
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.05, 5, 16), vrnC(0x6A4A2A));
wh.position.set(-L / 2 + 4, 4.3, 0);
wh.rotation.y = Math.PI / 2;
g.add(wh);
wBox(0.3, 1.2, 0.3, vrnC(0x6A4A2A), -L / 2 + 4.3, 3.7, 0, g);
if (o.paddle)
[-1, 1].forEach(function (k) { var p = wCyl(4, 4, 1.6, vrnC(0x8A2A22), 0, 3, k * (B / 2 + 0.8), g, 16); p.rotation.x = Math.PI / 2; var bxh = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.4, 1.9, lite ? 12 : 20, 1, false, 0, Math.PI), vrnC(0x1A1A1A)); bxh.rotation.x = Math.PI / 2; bxh.rotation.y = Math.PI / 2; bxh.rotation.order = "YXZ"; bxh.position.set(0, 3, k * (B / 2 + 0.8)); g.add(bxh); });
if (o.name) {
var sn = wSign([o.name], Math.min(8, B * 0.6), 1.1, "#1A1A1E", "#F2EEE6");
sn.position.set(-L / 2 - 0.05, 2.2, 0);
sn.rotation.y = -Math.PI / 2;
g.add(sn);
[-1, 1].forEach(function (s) { var t = 0.86, bn = wSign([o.name], 5, 0.8, "#1A1A1E", "#F2EEE6"); bn.position.set(-L / 2 + t * L, 2.4, s * (B / 2 * vrnSteamerHB(t) + 0.06)); bn.rotation.y = s > 0 ? -0.18 : Math.PI + 0.18; g.add(bn); });
}
return g;
},
function (G) {
var a = vrnSteamerModel({ name: "MONGOLIA", len: 70, beam: 10 });
a.position.set(300, 0, 330);
a.rotation.y = 0.1;
G.add(a);
var b = vrnSteamerModel({ name: "HENRIETTA", len: 56, beam: 9, funnel: 0x1A1A1A });
b.position.set(-420, 0, 360);
b.rotation.y = -0.2;
G.add(b);
var c = vrnSteamerModel({ name: "GREAT EASTERN", len: 110, beam: 14, paddle: 1, funnel: 0x1A1A1A });
c.position.set(700, 0, 460);
c.rotation.y = 0.05;
G.add(c);
VRN.fx.push({ k: "bob", m: a, ph: 0 }, { k: "bob", m: b, ph: 1.4 }, { k: "bob", m: c, ph: 2.6 });
[a, b, c].forEach(function (s) { VRN.smokers.push({ x: s.position.x, y: 13.6, z: s.position.z, r: 1, dark: 0 }); });
},
function (G) {
var D = VRN_HB.dock, rock = vrnSurf("stone", 0x6A6458, 4), grp = new THREE.Group();
grp.position.set(D.x, 0, D.z);
G.add(grp);
var cr = vrnSurf("stone", 0x5A5650, 5, { ds: 1 }), lite = VRN.lite, ph0 = 1.9, phL = Math.PI * 2 - 3.0;
var vg = new THREE.SphereGeometry(1, lite ? 20 : 40, lite ? 8 : 16, ph0, phL, 0, Math.PI / 2), vp = vg.attributes.position;
for (var i = 0; i < vp.count; i++) {
var x = vp.getX(i), y = vp.getY(i), z = vp.getZ(i), n = 0.86 + 0.28 * wFbm(x * 2.2 + 11, z * 2.2 + y * 1.7, 7, 3);
vp.setXYZ(i, x * 46 * n, y * 28 * n - 4, z * 38 * n);
}
vg.computeVertexNormals();
var uv = vg.attributes.uv;
for (var u = 0; u < uv.count; u++)
uv.setXY(u, (vp.getX(u) + vp.getZ(u)) * 0.05, vp.getY(u) * 0.05);
var vault = new THREE.Mesh(vg, cr);
grp.add(vault);
var og = vg.clone(), op = og.attributes.position;
for (var j = 0; j < op.count; j++)
op.setXYZ(j, op.getX(j) * 1.08, (op.getY(j) + 4) * 1.08 - 4, op.getZ(j) * 1.08);
og.computeVertexNormals();
grp.add(new THREE.Mesh(og, cr));
for (var k = 0; k < (lite ? 10 : 26); k++) {
var R = wRand(k * 7 + 3), a = ph0 + R() * phL, rr = 1.02 + R() * 0.12, bx = -Math.cos(a) * 46 * rr, bz = Math.sin(a) * 38 * rr, sz = 2.5 + R() * 5;
var m = new THREE.Mesh(new THREE.DodecahedronGeometry(sz, 1), cr);
var mp = m.geometry.attributes.position;
for (var q = 0; q < mp.count; q++) {
var f = 0.8 + 0.35 * wFbm(mp.getX(q) * 0.4 + k, mp.getZ(q) * 0.4, k, 2);
mp.setXYZ(q, mp.getX(q) * f, mp.getY(q) * f * 0.7, mp.getZ(q) * f);
}
m.geometry.computeVertexNormals();
m.position.set(bx, -sz * 0.35 + R() * 1.2, bz);
m.rotation.set(R() * 3, R() * 3, R() * 3);
grp.add(m);
}
if (!lite)
for (var t = 0, made = 0; t < 80 && made < 18; t++) {
var R2 = wRand(t * 13 + 5), sx = (R2() - 0.5) * 70, sz2 = (R2() - 0.5) * 60, hh = 2 + R2() * 4, e = Math.pow(sx / 46, 2) + Math.pow(sz2 / 38, 2);
if (e > 0.7)
continue;
var an = Math.atan2(sz2, -sx);
while (an < ph0)
an += Math.PI * 2;
if (an > ph0 + phL - 0.15)
continue;
var roof = 28 * 0.86 * Math.sqrt(1 - e) - 4;
var st = wCone(0.5 + R2() * 0.8, hh, cr, sx, roof - hh / 2 + 0.3, sz2, grp, 6);
st.rotation.x = Math.PI;
made++;
}
vrnBoxM(4, 1, 40, vrnSurf("wood", 0x8A6A4A, 2), -26, 2.4, -44, grp);
vrnFloor(D.x - 26, D.z - 44, 2, 20, 2.9);
for (var pz = -62; pz <= -26; pz += 4)
[-1, 1].forEach(function (e) { wCyl(0.18, 0.2, 6, vrnSurf("wood", 0x5A4632, 1), -26 + e * 2.1, -0.6, pz, grp, 6); });
for (var bb = 0; bb < 5; bb++)
wCyl(0.45, 0.48, 1.1, vrnSurf("wood", 0x6A4A2A, 1), -27.2, 3.45, -14 + bb * 1.1, grp, 10);
vrnBoxM(4, 1, 46, vrnSurf("wood", 0x8A6A4A, 2), -26, 2.4, 0, grp);
vrnFloor(D.x - 26, D.z, 2, 23, 2.9);
vrnBoxM(30, 1, 4, vrnSurf("wood", 0x8A6A4A, 2), -14, 2.4, -24, grp);
vrnFloor(D.x - 14, D.z - 24, 15, 2, 2.9);
var nau = vrnNautilusModel();
nau.position.set(D.x + 2, 0, D.z + 2);
nau.rotation.y = Math.PI / 2;
G.add(nau);
VRN.dockNautilus = nau;
VRN.fx.push({ k: "bob", m: nau, ph: 0.4, amp: 0.15 });
var lamp = wGlow(0xA8D8F0, 8, 0.35);
lamp.position.set(D.x - 10, 10, D.z - 10);
G.add(lamp);
vrnSpot(D.x - 26, D.z + 12, 4, "The Nautilus, at her mooring", "go aboard", function () { vrnEnter("nautilus"); }, 2.9);
vrnSpot(D.x - 26, D.z - 6, 3.5, "The diving locker on the jetty", "put on a diving suit", function () { vrnDive(!VRN.dive); }, 2.9);
vrnSign(["THE NAUTILUS", "Captain Nemo · Mobilis in Mobili"], 6, 1.2, D.x - 28.2, 4.2, D.z, Math.PI / 2, G);
},
function (G) {
var y = VRN_TOWN.y, B = VRN_HB;
vrnPerson(G, "passe", B.reform.x + 12, B.reform.z + B.reform.d / 2 + 6, 0, { y: y });
vrnPerson(G, "ardan", B.gunclub.x + 12, B.gunclub.z + B.gunclub.d / 2 + 6, 0.3, { y: y });
vrnPerson(G, "fergusson", B.victoria.x + 6, B.victoria.z + 6, 0.5, { y: y, fn: function () { vrnBalloonCard(); } });
vrnPerson(G, "joe", B.victoria.x - 6, B.victoria.z + 5, -0.4, { y: y });
vrnPerson(G, "robur", B.mast.x + 4, B.mast.z + 6, 0.2, { y: y });
vrnPerson(G, "ned", B.dock.x - 26, B.dock.z - 14, Math.PI / 2, { y: 2.9 });
vrnPerson(G, "conseil", B.dock.x - 25, B.dock.z + 4, Math.PI / 2, { y: 2.9 });
var n = VRN.lite ? 6 : 16, spots = [[60, 120, "a sailor of the Mongolia", "A cheerful English sailor of the P&O steamer Mongolia, which runs from Brindisi to Bombay through the new Suez Canal (opened 1869). He talks about coaling stations, the canal, the heat of the Red Sea, and a strange gentleman who timed the voyage to the minute."],
[-200, 110, "a porter of the quay", "An old porter of the quay who has carried trunks for every kind of traveller: explorers, balloonists, a professor with a box of rock samples. He thinks they're all mad and loves them for it."],
[60, -80, "a visitor to the Exposition", "A visitor to the Exposition of Extraordinary Voyages, 1870, amazed by the iron-and-glass Palace, the electric lamps and the models of flying machines and submarines. She has a guidebook and an opinion about everything in it."],
[400, 90, "a newspaper seller", "A newspaper seller shouting the headlines of 1870: a monster sighted at sea (which some say is a submarine), the Gun Club's latest scheme, the new railway across America. Cheeky and well-informed."],
[-480, -300, "a balloon-field hand", "A rigger at the balloon field who checks every rope of the Victoria. He explains how hydrogen lifts a balloon and why you must never strike a match near one."],
[700, -60, "a foundryman", "A foundryman of the Exposition foundry, black with soot and proud of it. He talks about casting iron and bronze, steam hammers and the great cannon cast in Florida."]];
for (var i = 0; i < n; i++) {
var s = spots[i % spots.length], R = wRand(i * 29 + 3);
vrnFolk(G, i, s[0] + (R() - 0.5) * 30, s[1] + (R() - 0.5) * 20, i < spots.length ? { y: y, name: s[2], say: s[3], greet: "Good day! Here for the Exposition?", sailor: i === 0 } : { y: y, sailor: R() < 0.3 });
}
},
function () {
var fns = {}, h = VRN_H + "⚓ The harbour master's boats</div><div style='opacity:.8;margin:4px 0 6px'>A steam launch leaves the quay every hour for the islands. You can sail it yourself, too, from the jetty (or swim, if you are brave).</div>";
[["island", "🏝️ To Lincoln Island (the south beach)", "The Mysterious Island, west across the sea", function () { var B = VRN_SPOTS.beach; vrnMove(B.x, B.z, Math.PI, "🏝️ <b>Lincoln Island.</b> White surf, red granite cliffs to the east, and the volcano, Mount Franklin, always smoking over the green. The engineer and his friends are camped at <b>the Chimneys</b>, north-east along the shore under the cliffs."); }],
["granite", "🪨 To the Chimneys, under Granite House", "Where Cyrus Smith and the castaways are", function () { var C = VRN_SPOTS.chimneys; vrnMove(C.x + 30, C.z, -Math.PI / 2, "🪨 <b>The Chimneys.</b> A jumble of fallen granite at the foot of the cliff, where the castaways shelter. Cyrus Smith is here."); }],
["strom", "🌋 To Stromboli", "The little volcano island in the bay, where the Underground comes out", function () { var S = VRN_STROM; vrnMove(S.x, S.z + S.r - 30, 0, "🌋 <b>Stromboli.</b> A cone of black ash, smoking gently. Somewhere deep under it, the Underground opens up."); }],
["dock", "🌊 To the Nautilus dock", "The sea cave east of the harbour", function () { var D = VRN_HB.dock; vrnMove(D.x - 26, D.z - 18, Math.PI, "🌊 <b>The Nautilus dock.</b> The submarine lies at her mooring in the cave, lit from below. Go aboard from the jetty.", 2.9); }]
].forEach(function (r) { h += worldBtn(r[0], r[1], r[2]); fns[r[0]] = r[3]; });
worldCard(h, fns);
},
function () {
var fns = {}, h = VRN_H + "🚂 The Gare des Voyages</div><div style='opacity:.8;margin:4px 0 6px'>Trains leave every half hour.</div>";
h += worldBtn("stapi", "North to Stapi, at the foot of Snaefells", "Iceland: the turf village, Professor Lidenbrock, and the volcano");
fns.stapi = function () { var V = VRN_SNF.village; vrnMove(V.x, V.z + 70, Math.PI, "🌋 <b>Stapi, under Snaefells.</b> Turf houses, black lava, the cold sea wind. The snow-capped volcano rises to the north. Professor Lidenbrock is at the pastor's house, impatient to climb."); };
h += worldBtn("stone", "East to Stone's Hill, Florida", "The Columbiad, the Moon gun");
fns.stone = function () { var S = VRN_STONE; vrnMove(S.x, S.z + S.r - 20, 0, "🌕 <b>Stone's Hill, Florida.</b> A plain of sand and scrub, a ring of furnaces round a great stone collar in the ground: the mouth of the Columbiad, nine hundred feet deep."); };
worldCard(h, fns);
},
function () {
var rows = [["The Nautilus", "The sea cave east of the harbour: Captain Nemo's tour of the Deep"], ["Lincoln Island", "West across the sea (the harbour master's boats): the Mysterious Island"],
["Snaefells", "North, by train to Stapi: the Journey to the Centre of the Earth"], ["The Reform Club", "On the quay: the race round the world in eighty days"], ["Stone's Hill", "East, by train: the Columbiad and the Moon"],
["The balloon field", "West of the town: the Victoria, over Africa"], ["Robur's mast", "By the balloon field: the Albatross, to fly anywhere"], ["The Palace of the Exposition", "The Inventors' Hall: design your own machines"],
["Verne's house", "On the quay: the Library of the Voyages, and the lessons"], ["The Geographical Society", "North of the square: the Fellowship examination"]];
worldCard(worldFacts("🌍 The Globe of the Voyages", "Where every voyage starts", rows, ["Everything here is Safe except the Deep, the Underground beyond the camp at Port Graüben, and Lincoln Island's Far West jungle and Serpentine Peninsula."]), {});
},
function (grp, x, z, build, label, text, scale) {
var p = new THREE.Group();
p.position.set(x, 0, z);
grp.add(p);
wCyl(2.4, 2.6, 1, vrnSurf("marble", 0xE8E4DC, 2), 0, 0.5, 0, p, 16);
var m = build();
m.scale.setScalar(scale || 1);
m.position.y = 1.2;
p.add(m);
vrnSign([label], 3, 0.6, 0, 0.5, 2.65, 0, p);
vrnSolid({ x: x, z: z, r: 2.6 });
vrnSpot(x, z + 3, 3.2, label, "read the card", function () { worldCard(VRN_H + esc(label) + "</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>" + esc(text) + "</div>", {}); }, 0);
return p;
},
function (grp, I) {
var X = I.x, Z = I.z;
vrnInFloor(grp, X, Z, 240, 140, 0, vrnSurf("floortile", 0xD8D0C0, 3));
var iron = vrnFacMat("iron", 0x2A3A4A, 0);
[[0, -70, 0, 240], [0, 70, Math.PI, 240], [120, 0, -Math.PI / 2, 140], [-120, 0, Math.PI / 2, 140]].forEach(function (f) { var w = new THREE.Mesh(vrnWallGeo(f[3], 28, 4, 4), iron); w.position.set(X + f[0], 14, Z + f[1]); w.rotation.y = f[2]; grp.add(w); });
vrnSolid({ x: X, z: Z - 70.5, hw: 120, hd: 0.5, h: 30 });
vrnSolid({ x: X, z: Z + 70.5, hw: 120, hd: 0.5, h: 30 });
vrnSolid({ x: X - 120.5, z: Z, hw: 0.5, hd: 70, h: 30 });
vrnSolid({ x: X + 120.5, z: Z, hw: 0.5, hd: 70, h: 30 });
var vault = new THREE.Mesh(new THREE.CylinderGeometry(70, 70, 240, VRN.lite ? 16 : 32, 1, true, 0, Math.PI), VRN.lite ? vrnC(0x9AB8D0, { op: 0.5, ds: true }) : new THREE.MeshPhongMaterial({ color: 0xA8C8E0, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false, shininess: 80 }));
vault.rotation.z = Math.PI / 2;
vault.rotation.y = Math.PI / 2;
vault.scale.set(1, 1, 0.4);
vault.position.set(X, 28, Z);
vault.rotation.order = "YXZ";
grp.add(vault);
var rib = vrnMetal(0x2A3440);
for (var r = -110; r <= 110; r += VRN.lite ? 40 : 20) {
var t = new THREE.Mesh(new THREE.TorusGeometry(70, 0.4, 4, VRN.lite ? 16 : 32, Math.PI), rib);
t.position.set(X + r, 28, Z);
t.scale.set(1, 0.4, 1);
grp.add(t);
}
for (var l = -100; l <= 100; l += 25)
[-1, 1].forEach(function (s) { wCyl(0.3, 0.3, 26, rib, X + l, 13, Z + s * 60, grp, 6); var g = wGlow(0xFFF0D0, 4, 0.4); g.position.set(X + l, 24, Z + s * 60); grp.add(g); });
vrnExhibit(grp, X - 90, Z - 40, function () { var m = vrnNautilusModel(); m.scale.setScalar(0.06); return m; }, "The Nautilus (a model)", "Captain Nemo's submarine, 70 metres long, of steel plates over a double hull, driven by electricity from sodium batteries. Aronnax calls her 'a masterpiece of industry'. Real submarines of 1870 (like the French Plongeur of 1863, which Verne saw a model of at the 1867 Paris Exposition) could barely dive at all.", 1);
vrnExhibit(grp, X - 60, Z - 40, function () { return vrnShellModel(0.6); }, "The Columbiad's shell", "An aluminium projectile 9 feet wide and 12 feet high, with padded walls, water-buffers against the shock, and windows. Verne chose aluminium because it was light and very new (it cost more than silver in 1865).", 1);
vrnExhibit(grp, X - 30, Z - 40, function () { var b = vrnBalloonModel(); b.scale.setScalar(0.12); return b; }, "The Victoria", "Dr Fergusson's balloon for Five Weeks in a Balloon (1863), Verne's first great success: two balloons one inside the other, filled with hydrogen, and his secret heater that warms the gas to rise and lets it cool to sink.", 1);
vrnExhibit(grp, X + 30, Z - 40, function () { var a = vrnAlbatrossModel(); a.scale.setScalar(0.04); return a; }, "The Albatross", "Robur's flying ship (Robur the Conqueror, 1886): a long hull with 37 masts of lifting screws and two propellers, driven by electric batteries. Heavier than air, as aeroplanes and helicopters are today.", 1);
vrnExhibit(grp, X + 60, Z - 40, function () { return vrnElephantModel(0.25); }, "The Steam House", "From The Steam House (1880): a mechanical elephant drawing two houses on wheels across India. You can buy one of your own from the ship chandler on the quay.", 1);
vrnExhibit(grp, X + 90, Z - 40, function () { var g = new THREE.Group(); var c = wCyl(0.5, 0.7, 5, vrnMetal(0x3A3A3A), 0, 0.5, 0, g, 14); c.rotation.z = 1.2; return g; }, "The Columbiad (a model)", "The Gun Club's cannon: 900 feet long, cast straight down into the ground of Stone's Hill in Florida, loaded with 400,000 pounds of gun-cotton. You'll find the real thing by train, to the east.", 1);
[["sub", "A submarine", -75], ["balloon", "A balloon", -25], ["flyer", "A flying machine", 25], ["gun", "A moon gun", 75]].forEach(function (b) {
var bx = X + b[2], bz = Z + 10;
var g = new THREE.Group();
g.position.set(bx, 0, bz);
grp.add(g);
vrnBoxM(10, 1, 4, vrnSurf("wood", 0x7A5232, 1.5), 0, 0.5, 0, g);
vrnBoxM(10, 0.1, 4, vrnC(0xE8DCC0), 0, 1.05, 0, g);
wBox(9, 3, 0.1, vrnC(0x2A3A4A), 0, 2.6, -1.9, g);
vrnSign(["Design bench", b[1]], 4, 1, 0, 3.4, -1.8, 0, g);
vrnSolid({ x: bx, z: bz, hw: 5, hd: 2.2, h: 1.2 });
VRN["bench_" + b[0]] = { x: bx, z: bz - 8, g: g };
vrnSpot(bx, bz + 3.5, 3.6, "Design bench: " + b[1], "design and test it", function () { vrnBench(b[0]); }, 0);
});
var tk = new THREE.Group();
tk.position.set(X - 50, 0, Z + 48);
grp.add(tk);
var glassM = vrnC(0x8AB8D0, { op: 0.35 });
wBox(40, 6, 14, glassM, 0, 3, 0, tk);
var tw = new THREE.Mesh(new THREE.BoxGeometry(39.6, 5.2, 13.6), vrnC(0x2A6A8A, { op: 0.55 }));
tw.position.y = 2.7;
tk.add(tw);
vrnSign(["THE GREAT TANK", "for diving boats"], 5, 1, 0, 7, 7.2, 0, tk);
vrnSolid({ x: X - 50, z: Z + 48, hw: 20, hd: 7, h: 6 });
VRN.tank = { x: X - 50, z: Z + 48 };
vrnPave(grp, X + 50, Z + 48, 60, 30, 0, 0x9AA87A, 4);
vrnSign(["THE TEST FIELD", "balloons · flying machines · guns"], 5, 1, X + 50, 6, Z + 63, 0, grp);
VRN.testField = { x: X + 50, z: Z + 48 };
vrnPerson(grp, { name: "The Exposition's chief engineer", look: { sex: "f", layer: "jacket", layerColor: 0x2A3A5A, top: 0xF2EEE2, bottom: 0x2A2A30, topKind: "dress", hair: 0x3A2A1A, hairStyle: "bun", shoes: 0x1A1A1A },
persona: "The chief engineer of the Exposition of 1870, who runs the Inventors' Hall: brisk, warm, delighted by any good idea and honest about bad ones. She explains buoyancy, lift, pressure and the speed a shell needs, and loves it when a visitor's machine works for the right reason.",
greet: "Welcome to the Inventors' Hall! Every machine in these voyages started on a bench like these. Pick one and make it your own." }, X, Z + 25, Math.PI, {});
vrnDoorOut(grp, X, Z + 69, "palace", "The great south door");
},
function (grp, I) {
var X = I.x, Z = I.z, wood = vrnSurf("wood", 0x8A5A3A, 2), wall = vrnSurf("plaster", 0xE0D0B0, 3);
vrnRoom(grp, X, Z + 25, 30, 20, 5, { wall: wall, floor: wood, gaps: { n: [[15, 3, 0]], s: [[15, 3, 0]] } });
vrnDoorOut(grp, X, Z + 34.6, "verne", "The front door");
vrnRoom(grp, X - 30, Z + 25, 26, 20, 5, { wall: wall, floor: wood, gaps: { e: [[10, 3, 0]] } });
vrnTable(grp, X - 32, Z + 22, 3.4, 1.6, 0, 0x5A3A22);
vrnChair(grp, X - 32, Z + 23.6, Math.PI, 0x3A2A1E);
for (var c = 0; c < 6; c++)
wBox(0.3, 0.02, 0.2, vrnC(0xF2EEE2), X - 33.2 + c * 0.45, 0.88, Z + 21.8);
vrnShelf(grp, X - 42.6, Z + 25, 14, Math.PI / 2);
vrnShelf(grp, X - 30, Z + 15.6, 20, 0);
var map = wBox(5, 3, 0.05, new THREE.MeshLambertMaterial({ map: vrnGlobeTex() }), X - 30, 2.8, Z + 34.8, grp);
vrnPerson(grp, "verne", X - 32, Z + 20.4, 0, {});
var LX = X, LZ = Z - 10, R = 22;
vrnInFloor(grp, LX, LZ, 48, 48, 0, wood);
vrnRug(grp, LX, LZ, 20, 20, 0x6A2A2A);
var n = VRN.lite ? 12 : 20;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2))) < 0.3)
continue;
vrnShelf(grp, LX + Math.cos(a) * R, LZ + Math.sin(a) * R, R * 2 * Math.PI / n, -a - Math.PI / 2, 6.4);
vrnSolid({ x: LX + Math.cos(a) * R, z: LZ + Math.sin(a) * R, r: 2.6 });
}
wCyl(R + 1, R + 1, 0.4, vrnC(0xE8E0D0), LX, 9, LZ, grp, 24);
var gal = new THREE.Mesh(new THREE.CircleGeometry(6, 24), vrnC(0xC8E0F0, { e: 0x8AA8C8, ei: 0.3 }));
gal.rotation.x = Math.PI / 2;
gal.position.set(LX, 8.9, LZ);
grp.add(gal);
vrnIWall(grp, LX - 4, LZ + 24, LX - 15, LZ + 24, 9, wall, []);
vrnIWall(grp, LX + 4, LZ + 24, LX + 15, LZ + 24, 9, wall, []);
vrnFloor(LX, LZ + 20, 15, 5, 0, { inside: 1 });
vrnTable(grp, LX, LZ + 6, 4, 1.6, 0, 0x5A3A22);
vrnSpot(LX, LZ + 8, 3, "The catalogue of the Voyages", "read and search", function () { vrnLibCard(); }, 0);
var tales = [["nemo", "Twenty Thousand Leagues"], ["columbiad", "From the Earth to the Moon"], ["centreearth", "Journey to the Centre of the Earth"], ["fogg", "Around the World in Eighty Days"], ["vn_island", "The Mysterious Island"], ["vn_balloon", "Five Weeks in a Balloon"], ["vn_robur", "Robur the Conqueror"]];
tales.forEach(function (T, k) {
var a = Math.PI + (k + 0.5) / tales.length * Math.PI, lx = LX + Math.cos(a) * 13, lz = LZ + Math.sin(a) * 13;
var g = new THREE.Group();
g.position.set(lx, 0, lz);
g.rotation.y = -a - Math.PI / 2;
grp.add(g);
wCyl(0.2, 0.3, 1.1, vrnC(0x4A2E1E), 0, 0.55, 0, g, 8);
var top = wBox(1, 0.08, 0.7, vrnC(0x4A2E1E), 0, 1.15, 0, g);
top.rotation.x = -0.35;
wBox(0.8, 0.02, 0.5, vrnC(0xF2EAD0), 0, 1.21, 0.02, g).rotation.x = -0.35;
vrnSolid({ x: lx, z: lz, r: 0.5 });
vrnSpot(lx, lz, 2.2, "📖 " + T[1], "open the story", function () { if (typeof BHN_WHOLE !== "undefined" && BHN_WHOLE[T[0]] && typeof bhnWhole === "function" && bhnWhole(T[0]))
return; if (typeof ctBoard === "function" && typeof CT_BY_ID !== "undefined" && CT_BY_ID[T[0]])
ctBoard(T[0]);
else
setStatus("This story's board is not here yet."); }, 0);
});
vrnRoom(grp, X + 32, Z + 5, 30, 40, 5, { wall: wall, floor: wood, gaps: { w: [[30, 3, 0]] } });
vrnIWall(grp, X + 17, Z - 15, X + 17, Z + 15, 5, wall, [[20, 3, 0]]);
for (var r = 0; r < 4; r++)
for (var s = 0; s < 3; s++) {
var bx = X + 24 + s * 7, bz = Z - 8 + r * 6;
vrnBoxM(5, 0.9, 1, vrnC(0x6A4A2A), bx, 0.45, bz, grp);
}
wBox(10, 3.2, 0.1, vrnC(0x1E2A22), X + 32, 2.4, Z - 14.6, grp);
vrnSpot(X + 32, Z - 11, 4, "The lecture room's blackboard", "choose a lesson", function () { vrnLessonList(); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, marble = vrnSurf("marble", 0xE8E4DC, 2), wall = vrnSurf("plaster", 0xD8C8A8, 3);
vrnRoom(grp, X, Z + 20, 40, 26, 9, { wall: vrnSurf("marble", 0xD8D0C0, 3), floor: vrnSurf("marble", 0xC8B8A0, 2), gaps: { n: [[20, 4, 0]], s: [[20, 3, 0]] } });
for (var c = -15; c <= 15; c += 10)
[-1, 1].forEach(function (s) { wCyl(0.6, 0.6, 9, marble, X + c, 4.5, Z + 20 + s * 9, grp, 14); vrnSolid({ x: X + c, z: Z + 20 + s * 9, r: 0.7 }); });
vrnDoorOut(grp, X, Z + 32.6, "reform", "The front door");
vrnRoom(grp, X, Z - 10, 44, 34, 6, { wall: wall, floor: vrnSurf("wood", 0x6A3A22, 2), gaps: { s: [[22, 4, 0]] } });
vrnRug(grp, X, Z - 10, 30, 22, 0x5A1E1E);
[[-8, -14], [8, -14], [-8, -2], [8, -2]].forEach(function (t, k) {
var g = new THREE.Group();
g.position.set(X + t[0], 0, Z + t[1]);
grp.add(g);
wCyl(1.2, 1.2, 0.08, vrnC(0x2A5A3A), 0, 0.82, 0, g, 16);
wCyl(0.15, 0.3, 0.8, vrnC(0x4A2A1A), 0, 0.4, 0, g, 8);
for (var q = 0; q < 4; q++) {
var a = q / 4 * Math.PI * 2;
vrnChair(grp, X + t[0] + Math.cos(a) * 1.8, Z + t[1] + Math.sin(a) * 1.8, -a - Math.PI / 2, 0x6A2A22);
}
vrnSolid({ x: X + t[0], z: Z + t[1], r: 1.3 });
});
vrnPerson(grp, "fogg", X - 8, Z - 16, 0, { fn: function () { vrnRaceCard(); } });
vrnSpot(X - 8, Z - 12, 3, "Phileas Fogg's table", "make the wager: round the world in eighty days", function () { vrnRaceCard(); }, 0);
var bd = wBox(9, 4.4, 0.2, vrnC(0x1E2A22), X + 12, 3, Z - 26.8, grp);
vrnSign(["THE GREAT WAGER", "Round the world: the best times"], 7, 1, X + 12, 5.8, Z - 26.6, 0, grp);
VRN.raceBoardPos = { x: X + 12, z: Z - 26.4 };
vrnSpot(X + 12, Z - 24, 3.5, "The race board", "see the best times", function () { vrnRaceBoard(); }, 0);
vrnFolk(grp, 301, X + 8, Z - 14, { still: 1, look: { layer: "suit", layerColor: 0x1A1A22, hat: "none" }, name: "Andrew Stuart, engineer", say: "Andrew Stuart, engineer, member of the Reform Club, 1872, who bet Phileas Fogg four thousand pounds that he could not go round the world in eighty days. Sceptical and sharp, but a good loser.", greet: "Eighty days? With storms, delays, wrecks? Impossible. My four thousand says so." });
vrnFolk(grp, 302, X - 8, Z - 0.4, { still: 1, look: { layer: "suit", layerColor: 0x2A2A30, hat: "none" }, name: "Gauthier Ralph, of the Bank of England", say: "Gauthier Ralph, a director of the Bank of England and a member of the Reform Club, 1872. He brings the news of the great bank robbery that sets Detective Fix on Fogg's trail.", greet: "Fifty-five thousand pounds stolen from the Bank! The thief will be caught: the world is smaller than it was." });
},
function (grp, I) {
var X = I.x, Z = I.z;
vrnRoom(grp, X, Z, 60, 50, 8, { wall: vrnSurf("wood", 0x5A3A22, 2), floor: vrnSurf("wood", 0x7A5232, 2), gaps: { s: [[30, 4, 0]] } });
vrnDoorOut(grp, X, Z + 24.6, "gunclub", "The front door");
for (var i = 0; i < 6; i++) {
var m = wCyl(0.5, 0.7, 4, vrnMetal(0x3A3A3A), X - 25 + i * 10, 1.2, Z - 22, grp, 12);
m.rotation.x = 1.2;
wBox(2, 1, 3, vrnC(0x5A3A22), X - 25 + i * 10, 0.5, Z - 21, grp);
}
vrnTable(grp, X, Z - 8, 6, 2, 0, 0x4A2A1A);
vrnPerson(grp, "barbicane", X - 1.5, Z - 10, 0, { fn: function () { vrnGunSums(); } });
vrnPerson(grp, "maston", X + 2, Z - 10, 0, {});
vrnSpot(X, Z - 5.6, 3.5, "Barbicane's table", "work out the Moon shot with the Gun Club", function () { vrnGunSums(); }, 0);
for (var r = 0; r < 5; r++)
for (var s = 0; s < 6; s++)
vrnChair(grp, X - 12 + s * 5, Z + 4 + r * 4, Math.PI, 0x3A2A1A);
},
function (grp, I) {
var X = I.x, Z = I.z;
vrnRoom(grp, X, Z, 44, 40, 10, { wall: vrnSurf("plaster", 0xE0D4BC, 3), floor: vrnSurf("wood", 0x8A6A4A, 2), gaps: { s: [[22, 4, 0]] } });
vrnDoorOut(grp, X, Z + 19.6, "weldon", "The front door");
for (var i = 0; i < 6; i++) {
var b = vrnBalloonModel();
b.scale.setScalar(0.12);
b.position.set(X - 15 + i * 6, 5, Z - 8 + (i % 2) * 6);
grp.add(b);
}
vrnPerson(grp, "prudent", X - 2, Z - 12, 0, {});
vrnFolk(grp, 401, X + 3, Z - 12, { still: 1, look: { layer: "suit", layerColor: 0x3A3A40, hat: "none" }, name: "Phil Evans, secretary of the Weldon Institute", say: "Phil Evans, secretary of the Weldon Institute, Uncle Prudent's rival and fellow prisoner aboard the Albatross. Calmer than Prudent, and secretly impressed by Robur's machine.", greet: "Prudent and I agree on one thing only: that Robur is impossible. And yet his ship flies." });
},
function (grp, I) {
var X = I.x, Z = I.z;
vrnRoom(grp, X, Z, 60, 50, 9, { wall: vrnSurf("plaster", 0xD8CCB0, 3), floor: vrnSurf("wood", 0x6A4A2A, 2), gaps: { s: [[30, 4, 0]] } });
vrnDoorOut(grp, X, Z + 24.6, "society", "The front door");
var map = wBox(24, 10, 0.1, new THREE.MeshLambertMaterial({ map: vrnGlobeTex() }), X, 5, Z - 24.8, grp);
vrnTable(grp, X, Z - 14, 8, 2, 0, 0x4A2A1A);
vrnFolk(grp, 501, X, Z - 16, { still: 1, look: { layer: "suit", layerColor: 0x2A2A30, hat: "none", hair: 0x9A9A94 }, name: "The President of the Society", say: "The President of the Geographical Society, 1870: a white-haired explorer who crossed deserts and ice in his youth. He sets the Fellowship examination and loves a good question about latitude, longitude, winds and the shape of the Earth.", greet: "A candidate? Splendid. Ten questions; eight to pass. The Society's seal for those who do." });
vrnSpot(X, Z - 11.6, 3.5, "The examiners' desk", "sit the Fellowship examination", function () { vrnExam(); }, 0);
for (var r = 0; r < 5; r++)
for (var s = 0; s < 8; s++)
vrnChair(grp, X - 17.5 + s * 5, Z - 2 + r * 4, Math.PI, 0x2A3A5A);
},
function (grp, I) {
var X = I.x, Z = I.z, wood = vrnSurf("wood", 0x6A3A22, 2), brassM = vrnBrass(), steel = vrnMetal(0x5A6068), wall = vrnSurf("wood", 0x5A3420, 2);
var tube = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 120, VRN.lite ? 12 : 24, 1, true), VRN.lite ? vrnC(0x4A3A2A, { ds: true }) : new THREE.MeshPhongMaterial({ color: 0x5A4430, side: THREE.BackSide, shininess: 20 }));
tube.rotation.z = Math.PI / 2;
tube.position.set(X, 4, Z);
grp.add(tube);
vrnInFloor(grp, X, Z, 120, 10, 0, wood);
vrnSolid({ x: X, z: Z - 5.2, hw: 60, hd: 0.3, h: 8 });
vrnSolid({ x: X, z: Z + 5.2, hw: 60, hd: 0.3, h: 8 });
vrnSolid({ x: X - 60.4, z: Z, hw: 0.3, hd: 5, h: 8 });
vrnSolid({ x: X + 60.4, z: Z, hw: 0.3, hd: 5, h: 8 });
for (var r = -55; r <= 55; r += VRN.lite ? 10 : 5) {
var rb = new THREE.Mesh(new THREE.TorusGeometry(6.9, 0.12, 4, VRN.lite ? 12 : 24), brassM);
rb.rotation.y = Math.PI / 2;
rb.position.set(X + r, 4, Z);
grp.add(rb);
}
[-40, -20, 0, 20, 40].forEach(function (bx) { vrnIWall(grp, X + bx, Z - 5, X + bx, Z + 5, 8, wall, [[5, 2.2, 2.6]]); });
function lamp(x) { var l = wBox(0.6, 0.2, 0.6, vrnC(0xF8F0D8, { e: 0xFFF0C8, ei: 1 }), x, 7, Z, grp); }
for (var k = -55; k <= 55; k += 10)
lamp(X + k);
var wh = wCyl(0.8, 0.8, 0.2, brassM, X - 52, 1.6, Z, grp, 24);
wh.rotation.z = Math.PI / 2;
for (var sp = 0; sp < 8; sp++) {
var s2 = wBox(0.06, 2, 0.06, brassM, X - 52, 1.6, Z, grp);
s2.rotation.x = sp / 8 * Math.PI;
}
vrnBoxM(4, 1.4, 3, steel, X - 56, 0.7, Z, grp);
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.CircleGeometry(1.2, 20), vrnC(0x1A4A6A, { e: 0x0A2A40, ei: 0.4 })); p.position.set(X - 59.6, 3, Z + s * 2); p.rotation.y = Math.PI / 2; grp.add(p); });
vrnSpot(X - 52, Z, 3, "The Nautilus's wheel", "take the wheel and sail her yourself", function () { vrnPilotOn(); }, 0);
vrnShelf(grp, X - 30, Z - 4.4, 18, 0, 5);
vrnShelf(grp, X - 30, Z + 4.4, 18, Math.PI, 5);
vrnRug(grp, X - 30, Z, 14, 6, 0x2A3A5A);
vrnTable(grp, X - 30, Z, 3, 1.2, 0, 0x3A2214);
vrnSpot(X - 30, Z, 3, "The library of the Nautilus", "ask about the books", function () { worldCard(VRN_H + "📚 The library of the Nautilus</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>Twelve thousand volumes, Nemo says: science, ethics, literature in every language, but not one book on politics. 'These are the last ties that bind me to the earth,' he tells Aronnax. 'They are at your disposal.' The furniture is of black rosewood inlaid with brass; the divans are of brown leather.</div>", {}); }, 0);
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(new THREE.CircleGeometry(2.6, 32), vrnSeaWindowMat()); w.scale.set(1.5, 1, 1); w.position.set(X - 10, 3.4, Z + s * 4.9); w.rotation.y = s > 0 ? Math.PI : 0; grp.add(w); var rim = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.2, 6, 32), brassM); rim.scale.set(1.5, 1, 1); rim.position.copy(w.position); rim.rotation.y = w.rotation.y; grp.add(rim); });
var org = vrnBoxM(4, 4.2, 1, vrnC(0x3A2214), X - 3, 2.1, Z - 4.3, grp);
for (var p = 0; p < 12; p++)
wCyl(0.12, 0.12, 1.8 + ((p * 5) % 7) * 0.3, brassM, X - 4.6 + p * 0.28, 5.2, Z - 4.4, grp, 6);
[-16, -14].forEach(function (cx) { wBox(1.6, 1.2, 1, vrnC(0x8AB8D0, { op: 0.4 }), X + cx, 1.4, Z + 3.6, grp); wBox(1.6, 0.8, 1, vrnC(0x3A2214), X + cx, 0.4, Z + 3.6, grp); for (var q = 0; q < 4; q++)
wSph(0.12, vrnC([0xF2E8D8, 0xE8A0A0, 0xA8D0E8, 0xF8E0A0][q]), X + cx - 0.5 + q * 0.33, 1.2, Z + 3.6, grp, 8); });
vrnPerson(grp, "nemo", X - 8, Z - 1.6, -Math.PI / 2, { fn: function () { vrnTourCard(); } });
vrnPerson(grp, "aronnax", X - 14, Z + 2, Math.PI / 2, {});
vrnSpot(X - 10, Z, 3, "The great salon's windows", "ask Captain Nemo for his grand tour", function () { vrnTourCard(); }, 0);
vrnSpot(X - 3, Z - 2.8, 2.4, "Nemo's organ", "listen", function () { if (typeof playTone === "function") {
[220, 277, 330, 415, 330, 277].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.6); }, i * 420); });
} setStatus("🎹 Low, slow chords fill the salon: Nemo plays Weber, Mozart, Beethoven, and music of his own that he never names."); }, 0);
vrnTable(grp, X + 10, Z, 6, 1.6, 0, 0x3A2214);
for (var d = 0; d < 3; d++) {
vrnChair(grp, X + 8 + d * 2, Z - 1.4, 0, 0x5A2A1A);
vrnChair(grp, X + 8 + d * 2, Z + 1.4, Math.PI, 0x5A2A1A);
}
for (var e = 0; e < 4; e++) {
var dyn = wCyl(1.2, 1.2, 2.4, steel, X + 24 + e * 4, 1.4, Z - 3, grp, 16);
dyn.rotation.x = Math.PI / 2;
var gl = wGlow(0x8AD8FF, 2.4, 0.3);
gl.position.set(X + 24 + e * 4, 1.4, Z - 1.6);
grp.add(gl);
vrnSolid({ x: X + 24 + e * 4, z: Z - 3, r: 1.3 });
}
var shaft = wCyl(0.3, 0.3, 16, brassM, X + 34, 1, Z + 2, grp, 10);
shaft.rotation.z = Math.PI / 2;
VRN.fx.push({ k: "spinx", m: shaft, sp: 3 });
vrnSpot(X + 30, Z, 3, "The engine room", "ask how she is driven", function () { worldCard(VRN_H + "⚡ The engine room</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>'There is a powerful agent, obedient, rapid, easy, which conforms to every use and reigns supreme on board,' Nemo says. 'Everything is done by means of it. It lights, warms, and is the soul of my mechanical apparatus. This agent is electricity.' He makes it with batteries of sodium and mercury, drawing the sodium from sea water. In 1870 no battery could store that much; today's submarines run on batteries and on nuclear reactors.</div>", {}); }, 0);
for (var su = 0; su < 5; su++) {
var sx = X + 44 + su * 3, g = new THREE.Group();
g.position.set(sx, 0, Z - 4);
grp.add(g);
wCyl(0.35, 0.35, 1.4, vrnC(0x5A5A50), 0, 1.2, 0, g, 8);
wSph(0.42, brassM, 0, 2.3, 0, g, 12);
var face = new THREE.Mesh(new THREE.CircleGeometry(0.18, 12), vrnC(0x2A4A5A));
face.position.set(0, 2.3, 0.42);
g.add(face);
}
vrnSpot(X + 50, Z, 3, "The diving chamber", "put on a diving suit and go out onto the sea bed", function () { vrnDive(true, true); var D = VRN_HB.dock; vrnMove(D.x + 4, D.z + 30, Math.PI, "🤿 <b>Out through the hatch, onto the sea bed.</b> The water is clear and green; your lamp throws a long beam. You can walk anywhere in the Deep. The ⚓ Verne menu brings you back aboard.", vrnLand(D.x + 4, D.z + 30)); }, 0);
vrnSpot(X - 44, Z, 2.6, "The forward ladder", "go up onto the jetty", function () { vrnLeave("nautilus"); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, granite = vrnSurf("stone", 0xA86A58, 3), wood = vrnSurf("wood", 0x8A6A4A, 2);
vrnInFloor(grp, X, Z, 100, 40, 0, vrnSurf("stone", 0x9A6050, 3));
var cave = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, 100, VRN.lite ? 10 : 20, 1, true, 0, Math.PI), VRN.lite ? vrnC(0xA86A58, { ds: true }) : new THREE.MeshPhongMaterial({ color: 0xA86A58, side: THREE.DoubleSide, map: vrnTex("stone", 3) }));
cave.rotation.z = Math.PI / 2;
cave.rotation.y = Math.PI;
cave.scale.set(1, 1, 0.45);
cave.position.set(X, 0, Z);
grp.add(cave);
vrnSolid({ x: X, z: Z - 20, hw: 50, hd: 0.5, h: 10 });
vrnSolid({ x: X, z: Z + 20, hw: 50, hd: 0.5, h: 10 });
vrnSolid({ x: X - 50.5, z: Z, hw: 0.5, hd: 20, h: 10 });
vrnSolid({ x: X + 50.5, z: Z, hw: 0.5, hd: 20, h: 10 });
for (var w = 0; w < 5; w++) {
var win = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.2), vrnC(0xBCE0F0, { e: 0x8AB8D0, ei: 0.6 }));
win.position.set(X - 30 + w * 12, 4, Z - 19.6);
grp.add(win);
var gl = wGlow(0xE0F0FF, 6, 0.25);
gl.position.set(X - 30 + w * 12, 4, Z - 17);
grp.add(gl);
}
vrnTable(grp, X - 12, Z - 6, 8, 2, 0, 0x7A5232);
for (var c = 0; c < 6; c++)
vrnChair(grp, X - 15 + c * 1.4, Z - 4.6, Math.PI, 0x5A3A22);
vrnShelf(grp, X + 20, Z + 19, 20, Math.PI, 3.2);
for (var t = 0; t < 4; t++)
wBox(1.2, 1, 1.2, vrnSurf("wood", 0x9A7A4A, 1.5), X + 30 + t * 3, 0.5, Z + 15, grp);
vrnBoxM(4, 1, 2, vrnC(0x3A3A3A), X + 38, 0.5, Z - 12, grp);
var anvil = wBox(1, 0.6, 0.4, vrnMetal(0x2A2A2A), X + 38, 1.3, Z - 12, grp);
var tg = new THREE.Group();
tg.position.set(X - 44, 0, Z + 12);
grp.add(tg);
vrnBoxM(1.2, 1, 0.8, vrnC(0x5A3A22), 0, 1, 0, tg);
wBox(0.3, 0.15, 0.5, vrnBrass(), 0, 1.55, 0, tg);
vrnSpot(X - 44, Z + 10, 2.6, "The telegraph to the corral", "send a message", function () { setStatus("📡 <i>Tap, tap-tap.</i> The needle at the corral jumps: Neb answers that all is well and the goats are fed."); }, 0);
vrnApe(grp, X - 10, Z - 2);
vrnSpot(X - 46, Z, 3, "The lift", "go down to the beach", function () { vrnLeave("granite"); }, 0);
VRN.graniteIn = { x: X, z: Z };
},
function (grp, I) {
var X = I.x, Z = I.z, basalt = vrnSurf("stone", 0x3A3A40, 3);
vrnInFloor(grp, X - 50, Z, 40, 90, 0, basalt);
vrnInFloor(grp, X + 50, Z, 40, 90, 0, basalt);
var lake = new THREE.Mesh(new THREE.PlaneGeometry(60, 90), vrnWaterMat(0x1A3A4A, 0.92));
lake.rotation.x = -Math.PI / 2;
lake.position.set(X, -0.4, Z);
grp.add(lake);
vrnSolid({ x: X, z: Z, hw: 30, hd: 45, h: 1, b: -3 });
var n = VRN.lite ? 18 : 40, R = wRand(77);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, cx = X + Math.cos(a) * 68, cz = Z + Math.sin(a) * 44, h = 24 + R() * 20;
wCyl(2.2, 2.4, h, basalt, cx, h / 2, cz, grp, 6);
}
vrnSolid({ x: X, z: Z - 45.5, hw: 70, hd: 0.5, h: 40 });
vrnSolid({ x: X, z: Z + 45.5, hw: 70, hd: 0.5, h: 40 });
vrnSolid({ x: X - 70.5, z: Z, hw: 0.5, hd: 45, h: 40 });
vrnSolid({ x: X + 70.5, z: Z, hw: 0.5, hd: 45, h: 40 });
var roof = new THREE.Mesh(new THREE.SphereGeometry(80, VRN.lite ? 12 : 24, 8, 0, Math.PI * 2, 0, Math.PI / 2), VRN.lite ? vrnC(0x2A2A30, { ds: true }) : new THREE.MeshLambertMaterial({ color: 0x2A2A30, side: THREE.BackSide }));
roof.scale.set(0.9, 0.5, 0.6);
roof.position.set(X, 0, Z);
grp.add(roof);
var nau = vrnNautilusModel();
nau.position.set(X, 0, Z);
grp.add(nau);
var gl = wGlow(0x8AC8E8, 30, 0.3);
gl.position.set(X, 2, Z);
grp.add(gl);
vrnBoxM(10, 0.6, 3, vrnSurf("wood", 0x5A4A3A, 2), X - 25, 0.2, Z, grp);
vrnFloor(X - 25, Z, 5, 1.5, 0.5);
vrnPerson(grp, { name: "The old captain", look: { sex: "m", layer: "longcoat", layerColor: 0x1E2A3A, top: 0xE8E4DC, bottom: 0x1E2A3A, hair: 0xE8E8E4, beard: 1, shoes: 0x101010 },
persona: "Captain Nemo, very old now, dying aboard the Nautilus in the Dakkar Grotto under Lincoln Island in 1868. He is Prince Dakkar, son of an Indian raja, who fought for his country's freedom, lost everything, and built the Nautilus to live free under the sea. He has secretly helped the castaways all along. He speaks with great dignity and warmth, asks to be buried in his ship, and warns them the island's volcano is about to wake.",
greet: "You followed the wire. Good. Sit. I am Prince Dakkar... you knew me as Captain Nemo. I have watched over you all." }, X - 22, Z, Math.PI / 2, { fn: function () { vrnIslandNemo(); } });
vrnSpot(X - 22, Z, 3, "The old captain", "listen to who he is", function () { vrnIslandNemo(); }, 0.5);
},
function () {
if (VRN.deepKinds)
return VRN.deepKinds;
var d = VRN.lite ? 0 : 1;
var coral = vrnCrownGeo(41, 1.6, 1.1, 1.5, d).translate(0, 0.7, 0), fan = new THREE.CircleGeometry(1.4, 10, 0, Math.PI).translate(0, 0.2, 0);
var kelp = new THREE.CylinderGeometry(0.05, 0.12, 9, 4, 6);
kelp.translate(0, 4.5, 0);
(function () { var p = kelp.attributes.position; for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
p.setX(i, p.getX(i) + Math.sin(y * 0.6) * 0.5);
} kelp.computeVertexNormals(); })();
var tree = new THREE.CylinderGeometry(0.18, 0.35, 14, 5, 1);
tree.translate(0, 7, 0);
var crown = vrnCrownGeo(43, 1.8, 4.6, 1.8, d).translate(0, 13, 0);
var oyster = new THREE.SphereGeometry(0.4, 7, 5);
oyster.scale(1, 0.35, 0.8);
var black = new THREE.CylinderGeometry(0.04, 0.08, 7, 4, 4);
black.translate(0, 3.5, 0);
return (VRN.deepKinds = {
coral: { g: coral, m: new THREE.MeshLambertMaterial({ color: 0xFFFFFF }) },
fan: { g: fan, m: new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }) },
kelp: { g: kelp, m: new THREE.MeshLambertMaterial({ color: 0x5A8A3A }) },
stem: { g: tree, m: new THREE.MeshLambertMaterial({ color: 0x6A7A4A }) },
crown: { g: crown, m: new THREE.MeshLambertMaterial({ color: 0x4A8A5A }) },
oyster: { g: oyster, m: new THREE.MeshLambertMaterial({ color: 0x8A8478 }) },
black: { g: black, m: new THREE.MeshLambertMaterial({ color: 0x14141A }) }
});
},
function (G) {
var K = vrnDeepKinds(), R = wRand(9191), per = {}, tile = 800, step = VRN.lite ? 26 : 13;
function put(k, x, z, s, ry, col) { var key = Math.floor(x / tile) + "," + Math.floor(z / tile), L = per[key] || (per[key] = {}); (L[k] || (L[k] = [])).push([x, vrnLand(x, z), z, s, ry, col]); }
for (var z = 200; z < 4300; z += step)
for (var x = -2300; x < 3000; x += step) {
var jx = x + (R() - 0.5) * step, jz = z + (R() - 0.5) * step, h = vrnLand(jx, jz);
if (h > -3 || vrnIslandIn(jx, jz) > -30)
continue;
var near = null;
for (var i = 0; i < VRN_DEEP.length; i++) {
var F = VRN_DEEP[i];
if (Math.hypot(jx - F.x, jz - F.z) < F.r) {
near = F.k;
break;
}
}
var r = R();
if (near === "forest") {
if (r < 0.5) {
put("stem", jx, jz, 0.8 + R() * 0.6, R() * 6, 0);
put("crown", jx, jz, 0.8 + R() * 0.6, R() * 6, R() < 0.5 ? 0x4A8A5A : 0x7AA84A);
}
else if (r < 0.8)
put("kelp", jx, jz, 0.8 + R() * 0.5, R() * 6, 0);
continue;
}
if (near === "pearl") {
if (r < 0.7)
put("oyster", jx, jz, 0.8 + R() * 0.8, R() * 6, 0);
continue;
}
if (near === "atlantis" || near === "vigo" || near === "squid") {
if (r < 0.08)
put("kelp", jx, jz, 0.7, R() * 6, 0);
continue;
}
if (h > -45) {
var patch = wFbm(jx / 200, jz / 200, 61, 2);
if (patch < 0.45)
continue;
if (r < 0.28)
put("coral", jx, jz, 0.6 + R() * 1.3, R() * 6, VRN_CORALC[(R() * VRN_CORALC.length) | 0]);
else if (r < 0.38)
put("fan", jx, jz, 0.7 + R() * 0.8, R() * 6, VRN_CORALC[(R() * VRN_CORALC.length) | 0]);
else if (r < 0.5)
put("kelp", jx, jz, 0.6 + R() * 0.8, R() * 6, 0);
}
else if (r < 0.06)
put("kelp", jx, jz, 0.8, R() * 6, 0);
}
var Gr = VRN_DEEP[VRN_DEEP.length - 1];
for (var b = 0; b < (VRN.lite ? 120 : 300); b++) {
var bx = Gr.x - 22 + R() * 44, bz = Gr.z - 30 + R() * 6;
put("black", bx, bz, 0.8 + R() * 0.6, R() * 6, 0);
}
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color();
VRN.deepTiles = [];
Object.keys(per).forEach(function (key) {
var L = per[key], ab = key.split(","), grp = new THREE.Group();
grp.userData.keep = 1;
G.add(grp);
Object.keys(L).forEach(function (k) {
var list = L[k], mesh = new THREE.InstancedMesh(K[k].g, K[k].m, list.length);
list.forEach(function (t, i) { e.set(k === "fan" ? 0 : 0, t[4], 0); q.setFromEuler(e); v.set(t[0], t[1] - 0.1, t[2]); s.set(t[3], t[3], t[3]); m4.compose(v, q, s); mesh.setMatrixAt(i, m4); if (t[5]) {
col.setHex(t[5]);
mesh.setColorAt(i, col);
} });
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.frustumCulled = false;
mesh.userData.keep = 1;
mesh.geometry.userData.shared = true;
grp.add(mesh);
});
VRN.deepTiles.push({ g: grp, x: (+ab[0] + 0.5) * tile, z: (+ab[1] + 0.5) * tile });
});
},
function (G) {
var grp = new THREE.Group();
grp.name = "vrn-deep";
G.add(grp);
var stone = vrnSurf("stone", 0x9A9A8A, 3), mossy = vrnSurf("stone", 0x6A8A7A, 3);
function F(k) { for (var i = 0; i < VRN_DEEP.length; i++)
if (VRN_DEEP[i].k === k)
return VRN_DEEP[i]; }
var A = F("atlantis"), R = wRand(1834);
for (var i = 0; i < (VRN.lite ? 26 : 70); i++) {
var a = R() * 6.28, r = R() * A.r * 0.8, x = A.x + Math.cos(a) * r, z = A.z + Math.sin(a) * r, y = vrnLand(x, z), k = R();
if (k < 0.45) {
var c = wCyl(0.9, 1, 3 + R() * 8, mossy, x, y + 2, z, grp, 10);
c.rotation.z = R() < 0.3 ? 1.2 : R() * 0.2;
}
else if (k < 0.8) {
var w = vrnBoxM(6 + R() * 10, 2 + R() * 5, 1.4, stone, x, y + 1.5, z, grp);
w.rotation.y = R() * 3;
}
else {
vrnBoxM(3, 1, 3, mossy, x, y + 0.5, z, grp);
}
}
var T = new THREE.Group(), ty = vrnLand(A.x, A.z);
T.position.set(A.x, ty, A.z);
grp.add(T);
vrnBoxM(30, 2, 20, stone, 0, 1, 0, T);
for (var cx = -12; cx <= 12; cx += 4)
[-8, 8].forEach(function (cz) { if ((cx + cz) % 3)
wCyl(0.8, 0.9, 10, mossy, cx, 7, cz, T, 12); });
vrnBoxM(30, 1.6, 3, stone, 0, 12.6, -8, T);
var ped = vrnBoxM(30, 4, 0.6, stone, 0, 15, -8, T);
ped.rotation.z = 0.02;
for (var aq = 0; aq < 8; aq++) {
var ax = A.x - 180 + aq * 14, az = A.z - 160, ay = vrnLand(ax, az);
vrnBoxM(2, 14, 2, mossy, ax, ay + 7, az, grp);
if (aq)
vrnBoxM(14, 1.6, 2, mossy, ax - 7, ay + 14, az, grp);
}
var rockW = wSign(["ATLANTIS"], 5, 1.4, "#2A2A28", "#E8E8E0");
rockW.position.set(A.x + 20, ty + 3, A.z + 24);
rockW.rotation.y = 0.4;
grp.add(rockW);
var V = VRN_VOLC, vg = wGlow(0xFF6A2A, 90, 0.4);
vg.position.set(V.x, V.y + 6, V.z);
grp.add(vg);
var lava = new THREE.Mesh(new THREE.CircleGeometry(16, 16), vrnC(0xFF7A2A, { e: 0xFF5A1A, ei: 1 }));
lava.rotation.x = -Math.PI / 2;
lava.position.set(V.x, V.y - 5.5, V.z);
grp.add(lava);
VRN.smokers.push({ x: V.x, y: V.y - 2, z: V.z, r: 3, dark: 1, under: 1 });
var Vg = F("vigo");
for (var s = 0; s < 3; s++) {
var gx = Vg.x - 80 + s * 80, gz = Vg.z + (s - 1) * 50, gy = vrnLand(gx, gz), sh = new THREE.Group();
sh.position.set(gx, gy - 1, gz);
sh.rotation.set(0.12 * (s - 1), s * 1.3, 0.3 * (s % 2 ? 1 : -1));
grp.add(sh);
var wood = vrnSurf("wood", 0x5A4A3A, 2);
vrnBoxM(9, 5, 32, wood, 0, 2.5, 0, sh);
vrnBoxM(9.4, 1, 8, wood, 0, 6, 12, sh);
wCyl(0.4, 0.5, 16, wood, 0, 9, -4, sh, 6).rotation.z = 0.6;
for (var ch = 0; ch < 3; ch++) {
var cg = new THREE.Group();
cg.position.set(gx + 6 + ch * 3, vrnLand(gx + 6 + ch * 3, gz + 14), gz + 14);
grp.add(cg);
vrnBoxM(1.4, 0.9, 0.9, vrnSurf("wood", 0x6A4A2A, 1), 0, 0.45, 0, cg);
for (var gi = 0; gi < 5; gi++)
wBox(0.3, 0.12, 0.15, vrnC(0xE8C048, { e: 0x8A6A10, ei: 0.4 }), (gi - 2) * 0.32, 0.95, 0, cg);
}
}
var Ce = F("cemetery"), cy = vrnLand(Ce.x, Ce.z);
wBox(0.8, 5, 0.8, vrnC(0xE8A0A0), Ce.x, cy + 2.5, Ce.z, grp);
wBox(3, 0.8, 0.8, vrnC(0xE8A0A0), Ce.x, cy + 3.6, Ce.z, grp);
for (var m = 0; m < 9; m++) {
var ma = m / 9 * 6.28, mx = Ce.x + Math.cos(ma) * 14, mz = Ce.z + Math.sin(ma) * 14;
var md = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 6), vrnC(VRN_CORALC[m % VRN_CORALC.length]));
md.scale.set(1, 0.5, 2);
md.position.set(mx, vrnLand(mx, mz) + 0.2, mz);
md.rotation.y = ma;
grp.add(md);
}
var Rg = VRN_RIDGE, tun = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 200, VRN.lite ? 10 : 18, 1, true), VRN.lite ? vrnC(0x5A5A50, { ds: true }) : new THREE.MeshLambertMaterial({ color: 0x5A5A50, side: THREE.DoubleSide, map: vrnTex("stone", 4) }));
tun.rotation.x = Math.PI / 2;
tun.position.set(Rg.tx, -42, Rg.az);
grp.add(tun);
var IR = wRand(55);
for (var f = 0; f < (VRN.lite ? 30 : 80); f++) {
var fx = -1800 + IR() * 4400, fz = 3900 + IR() * 650, fw = 20 + IR() * 60, ice = vrnBoxM(fw, 4 + IR() * 4, fw * (0.6 + IR() * 0.6), vrnC(0xE8F4FA, { shine: 80, spec: 0xFFFFFF }), fx, 0.4, fz, grp);
ice.rotation.y = IR() * 3;
}
for (var bg = 0; bg < (VRN.lite ? 6 : 16); bg++) {
var bx = -1600 + IR() * 4000, bz = 4100 + IR() * 450;
wCone(20 + IR() * 20, 30 + IR() * 30, vrnC(0xDCEEF8, { shine: 60, spec: 0xFFFFFF }), bx, 12, bz, grp, 7);
}
var P = VRN.pole = { x: 0, z: 4200 };
var isl = new THREE.Mesh(new THREE.CylinderGeometry(40, 46, 8, VRN.lite ? 10 : 20), vrnC(0xF2F8FC, { shine: 60, spec: 0xFFFFFF }));
isl.position.set(P.x, -1, P.z);
grp.add(isl);
vrnFloor(P.x, P.z, 0, 0, 3, { r: 40 });
wCyl(0.1, 0.12, 8, vrnC(0x2A2A2A), P.x, 7, P.z, grp, 6);
var fl = wBox(3.2, 2, 0.04, vrnC(0x0E0E10, { ds: true }), P.x + 1.7, 10, P.z, grp);
var nn = wSign(["N"], 1.2, 1.2, "#0E0E10", "#E8C83A");
nn.position.set(P.x + 1.7, 10, P.z + 0.04);
grp.add(nn);
VRN.fx.push({ k: "flag", m: fl, ph: 0 });
vrnSpot(P.x, P.z + 4, 4, "Nemo's black flag at the South Pole", "read what he said", function () { worldCard(VRN_H + "🏴 The South Pole, 21 March 1868</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>'I, Captain Nemo, on this 21st day of March, 1868, have reached the South Pole on the ninetieth degree; and I take possession of this part of the globe, equal to one-sixth of the known continents.' In the book there is land here; in truth the South Pole stands on a high plateau of ice and rock nearly three kilometres up. Roald Amundsen's team reached it on 14 December 1911.</div>", {}); }, 3);
var Mx = VRN.mael = { x: 2700, z: 4100, r: 140 }, mf = new THREE.Mesh(new THREE.ConeGeometry(Mx.r, 40, VRN.lite ? 20 : 40, 1, true), vrnWaterMat(0x1E4A5A, 0.92));
mf.rotation.x = Math.PI;
mf.position.set(Mx.x, -19.8, Mx.z);
grp.add(mf);
VRN.fx.push({ k: "spin", m: mf, sp: 0.25, y: 1 });
var Gr = F("grotto"), gy2 = vrnLand(Gr.x, Gr.z), cave = new THREE.Mesh(new THREE.SphereGeometry(12, VRN.lite ? 10 : 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), VRN.lite ? vrnC(0x3A4A4A, { ds: true }) : new THREE.MeshLambertMaterial({ color: 0x3A4A4A, side: THREE.DoubleSide, map: vrnTex("stone", 3) }));
cave.scale.set(1, 0.7, 1);
cave.position.set(Gr.x, gy2, Gr.z);
grp.add(cave);
var clam = new THREE.Group();
clam.position.set(Gr.x + 4, gy2, Gr.z + 3);
grp.add(clam);
[0, 1].forEach(function (k) { var sh = new THREE.Mesh(new THREE.SphereGeometry(1.6, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), vrnC(0xC8C0B0, { ds: true })); sh.scale.set(1.2, 0.5, 0.9); if (k) {
sh.rotation.x = Math.PI - 0.7;
sh.position.set(0, 0.2, -0.6);
} clam.add(sh); });
VRN.schools = [];
var nS = VRN.lite ? 3 : 7, fishG = new THREE.ConeGeometry(0.12, 0.5, 5);
fishG.rotateX(Math.PI / 2);
for (var sc = 0; sc < nS; sc++) {
var cnt = VRN.lite ? 14 : 30, im = new THREE.InstancedMesh(fishG, new THREE.MeshLambertMaterial({ color: [0xF8C84A, 0xA8D8F0, 0xE8704A, 0xF2F2E8, 0x5AC8B8][sc % 5] }), cnt);
im.frustumCulled = false;
G.add(im);
var D = VRN_DEEP[sc % VRN_DEEP.length];
VRN.schools.push({ m: im, n: cnt, x: D.x, z: D.z, y: Math.max(D.y + 6, -30), r: 30 + sc * 6, ph: sc * 1.7 });
}
VRN.districts.push({ g: grp, x: 400, z: 2600, r: 2600 });
},
function (dt, L) {
if (!VRN.schools)
return;
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1), e = new THREE.Euler(), under = camera.position.y < 0;
VRN.schools.forEach(function (S) {
var vis = under && Math.hypot(L.x - S.x, L.z - S.z) < 600;
S.m.visible = vis;
if (!vis)
return;
S.ph += dt * 0.25;
for (var i = 0; i < S.n; i++) {
var a = S.ph + i * 0.21, r = S.r * (0.6 + 0.4 * Math.sin(i * 1.7));
v.set(S.x + Math.cos(a) * r, S.y + Math.sin(i * 2.3 + S.ph) * 3, S.z + Math.sin(a) * r * 0.7);
e.set(0, -a, 0);
q.setFromEuler(e);
m4.compose(v, q, s);
S.m.setMatrixAt(i, m4);
}
S.m.instanceMatrix.needsUpdate = true;
});
},
function (on, quiet) {
VRN.dive = !!on;
if (!quiet)
setStatus(on ? "🤿 <b>You put on a diving suit</b>: the copper helmet, the air tank on your back, the Ruhmkorff lamp at your belt. In the sea now you sink to the bottom and walk on it. Take it off on dry land, or from the 🧭 Verne menu." : "🤿 You take off the diving suit.");
},
function () {
var fns = {}, d = vrnData(), h = VRN_H + "🌊 Captain Nemo's grand tour</div><div style='opacity:.88;margin:6px 0;line-height:1.45'>'Professor's friend: the Nautilus will show you the sea as no one has seen it.' Ten stops: the reefs of Torres Strait, the coral cemetery, the forest of Crespo, the pearl bank of Ceylon, the Arabian Tunnel, Atlantis, the treasure of Vigo Bay, the South Pole, the giant squid, and the Maelstrom. He tells the story of each at the great windows.</div>" +
"<div style='opacity:.75;font-size:12px'>" + vrnPayLine("tour") + "</div>";
h += worldBtn("go", "Begin the tour", "About ten minutes; you can look all round as she sails");
fns.go = function () { vrnTourStart(); };
h += worldBtn("wheel", "Take the wheel yourself", "Sail the Nautilus anywhere in the Deep" + (d.tourDone ? "" : " (Nemo would rather show you first, but he won't stop you)"));
fns.wheel = function () { vrnPilotOn(); };
h += worldBtn("talk", "💬 Talk with Captain Nemo", "");
fns.talk = function () { worldCard(null); var F = VRN_FOLK.nemo; wTalk({ name: F.name, persona: F.persona, greet: F.greet }); };
worldCard(h, fns);
},
function () {
worldCard(null);
var D = VRN_HB.dock;
vrnMove(D.x, D.z + 40, Math.PI, "🌊 <b>The Nautilus casts off.</b> The iron shutters of the salon slide back, and the sea is all round you, lit by her lantern. Look about as she goes. The ⏩ button sails faster; the ⏹ button ends the tour.", -6, { fn: function () {
var sub = vrnSubOut();
VRN.tour = { i: 0, t: 0, phase: "move", sp: 1, from: { x: D.x, z: D.z + 40, y: -6 }, to: VRN_TOUR[0], done: {} };
VRN.ride = { k: "tour", keep: 1, off: function () { vrnTourEnd(true); } };
vrnRidePanel(true, [["⏩ Faster", function () { if (VRN.tour)
VRN.tour.sp = VRN.tour.sp > 1 ? 1 : 2.5; }], ["⏹ End the tour", function () { vrnTourEnd(true); }]]);
} });
},
function (T, dt) {
var a = T.from, b = T.to, len = Math.hypot(b.x - a.x, b.z - a.z) || 1, sp = 26 * T.sp;
T.t = Math.min(1, T.t + dt * sp / len);
var e = T.t * T.t * (3 - 2 * T.t), x = a.x + (b.x - a.x) * e, z = a.z + (b.z - a.z) * e, y = a.y + (b.y - a.y) * e;
if (b.through || a.through) {
if (b.through)
y = Math.min(y, -38);
}
else
y = Math.max(y, vrnLand(x, z) + 7);
if (b.surface && T.t > 0.85)
y = Math.max(y, b.y);
y = Math.min(y, -1.2);
return { x: x, z: z, y: y, h: Math.atan2(b.x - a.x, b.z - a.z) };
},
function (dt) {
var T = VRN.tour;
if (!T)
return;
var sub = VRN.sub;
if (T.phase === "move") {
var p = vrnTourPath(T, dt);
sub.position.set(p.x, p.y, p.z);
sub.rotation.y = p.h + Math.PI;
if (sub.userData.prop)
sub.userData.prop.rotation.z += dt * 6 * T.sp;
camera.position.set(VRN.base + p.x + Math.sin(p.h) * 3, p.y + 1.2, p.z + Math.cos(p.h) * 3);
if (typeof flyY !== "undefined")
flyY = 0;
if (T.t >= 1) {
T.phase = "stop";
vrnTourStop();
}
}
else if (T.phase === "stop" || T.phase === "squid") {
var S = VRN_TOUR[T.i];
camera.position.set(VRN.base + sub.position.x, sub.position.y + 1.2, sub.position.z);
if (T.squid)
vrnSquidTick(dt);
}
},
function () {
var T = VRN.tour, S = VRN_TOUR[T.i], fns = {};
var h = VRN_H + "🌊 " + (T.i + 1) + " of " + VRN_TOUR.length + ": " + esc(S.name) + "</div><div style='opacity:.9;margin:6px 0;line-height:1.5'><b>Captain Nemo:</b> " + esc(S.story) + "</div>";
if (S.walk && !T.done.walk) {
h += worldBtn("walk", "🤿 Walk the forest with him", "Out through the diving chamber, onto the sea bed");
fns.walk = function () { vrnTourWalk(); };
}
if (S.shark && !T.done.shark) {
vrnSharkShow(S);
T.done.shark = 1;
}
if (S.squid && !T.done.squid) {
h += worldBtn("axe", "🪓 Up onto the platform with an axe", "Help Nemo and Ned drive the squid off");
fns.axe = function () { vrnSquidStart(); };
worldCard(h, fns);
return;
}
h += worldBtn("next", T.i < VRN_TOUR.length - 1 ? "Sail on" : "Home to the dock", T.i < VRN_TOUR.length - 1 ? "Next: " + VRN_TOUR[T.i + 1].name : "The tour is done");
fns.next = function () { worldCard(null); vrnTourNext(); };
worldCard(h, fns);
},
function () {
var T = VRN.tour;
if (!T)
return;
if (T.i >= VRN_TOUR.length - 1) {
vrnTourEnd(false);
return;
}
var S = VRN_TOUR[T.i];
T.from = { x: VRN.sub.position.x, z: VRN.sub.position.z, y: VRN.sub.position.y, through: S.through };
T.i++;
T.to = VRN_TOUR[T.i];
T.t = 0;
T.phase = "move";
if (T.to.through)
T.to = { x: T.to.x, z: T.to.z + 200, y: -40, through: 1, name: T.to.name, story: T.to.story, k: T.to.k };
},
function () {
var T = VRN.tour, S = VRN_TOUR[T.i];
T.done.walk = 1;
T.phase = "walk";
vrnDive(true, true);
worldCard(null);
var x = S.x + 14, z = S.z + 10;
vrnMove(x, z, Math.PI, "🤿 <b>The forest of Crespo.</b> Tall sea plants all reaching straight up to the light; fish weave through them like birds. Nemo walks ahead, his lamp swinging. Walk with him; when you are ready, go back to the Nautilus (press E beside her).", vrnLand(x, z), { fn: function () {
var P = vrnPerson(VRN.G, "nemo", S.x + 18, S.z + 6, 0, { y: vrnLand(S.x + 18, S.z + 6), wander: 14, talk: true });
VRN.tourNemo = P;
VRN.tourBack = vrnSpot(S.x, S.z, 14, "The Nautilus, hanging above the forest", "go back aboard", function () { vrnTourBack(); }, vrnLand(S.x, S.z));
} });
},
function () {
var T = VRN.tour;
if (!T)
return;
vrnDive(false, true);
if (VRN.tourNemo) {
VRN.G.remove(VRN.tourNemo.g);
VRN.people = VRN.people.filter(function (p) { return p !== VRN.tourNemo; });
VRN.talk = VRN.talk.filter(function (t) { return t.p !== VRN.tourNemo; });
VRN.tourNemo = null;
}
if (VRN.tourBack) {
VRN.spots = VRN.spots.filter(function (s) { return s !== VRN.tourBack; });
VRN.tourBack = null;
}
var v = vrnVeil();
v.style.opacity = "1";
setTimeout(function () { T.phase = "stop"; camera.position.set(VRN.base + VRN.sub.position.x, VRN.sub.position.y + 1.2, VRN.sub.position.z); v.style.opacity = "0"; vrnTourStop(); }, 600);
},
function (S) {
var sh = vrnCreature("shark", 1.6, 7);
sh.position.set(S.x + 30, vrnLand(S.x, S.z) + 4, S.z);
VRN.G.add(sh);
var dv = wPerson("vrn_diver", { look: VRN_FOLK.diver.look });
dv.position.set(S.x + 8, vrnLand(S.x + 8, S.z + 12) + 0.2, S.z + 12);
VRN.G.add(dv);
var nm = wPerson("vrn_nemo_dive", { look: { sex: "m", layer: "uniform", layerColor: 0x6A6A5A, hat: "helmet", hatColor: 0xC8A04A, shoes: 0x2A2A2A } });
nm.position.set(S.x + 12, vrnLand(S.x + 12, S.z + 8) + 0.2, S.z + 8);
VRN.G.add(nm);
VRN.fx.push({ k: "shark", m: sh, x: S.x + 8, z: S.z + 12, t: 0, y: vrnLand(S.x, S.z) + 4, gone: [sh, dv, nm] });
},
function () {
var T = VRN.tour;
T.phase = "squid";
T.squid = { n: 0, arms: [], cd: 0 };
worldCard(null);
var s = VRN.sub.position;
for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2, k = vrnCreature("kraken", 0.35, i);
k.position.set(s.x + Math.cos(a) * 9, s.y + 3, s.z + Math.sin(a) * 9);
k.rotation.y = -a;
VRN.G.add(k);
T.squid.arms.push({ g: k, a: a, up: 0 });
}
vrnRidePanel(true, [["🪓 Strike", function () { vrnSquidHit(); }], ["⏹ End the tour", function () { vrnTourEnd(true); }]]);
setStatus("🦑 <b>Up on the platform!</b> Arms come over the rail. Turn to face one and press <b>🪓 Strike</b> (or <b>F</b>) to drive it off. Four of them.");
},
function () {
var T = VRN.tour;
if (!T || !T.squid)
return;
var Q = T.squid;
if (Q.cd > 0)
return;
Q.cd = 0.5;
var L = worldLocal(), best = null, bd = 1e9;
Q.arms.forEach(function (A) { if (!A.g.visible)
return; var dx = A.g.position.x - L.x, dz = A.g.position.z - L.z, rel = Math.atan2(-dx, -dz) - yaw; rel = Math.abs(Math.atan2(Math.sin(rel), Math.cos(rel))); if (rel < 0.7 && rel < bd) {
bd = rel;
best = A;
} });
if (!best) {
setStatus("🪓 Turn to face an arm first.");
return;
}
best.g.visible = false;
Q.n++;
if (typeof playTone === "function")
playTone(160, 0.3);
if (Q.n < 4) {
setStatus("🪓 <b>The arm lets go and sinks away.</b> " + (4 - Q.n) + " more.");
return;
}
Q.arms.forEach(function (A) { if (A.g.parent)
A.g.parent.remove(A.g); });
T.squid = null;
T.done.squid = 1;
T.phase = "stop";
vrnRidePanel(true, [["⏩ Faster", function () { if (VRN.tour)
VRN.tour.sp = VRN.tour.sp > 1 ? 1 : 2.5; }], ["⏹ End the tour", function () { vrnTourEnd(true); }]]);
worldCard(VRN_H + "🦑 The squid are gone</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>The great animals let go and sink into the dark. Ned Land wipes his harpoon; Nemo stands a long while at the rail, for they took one of his crew. In the book this is the fight's sad end. Real giant squid (Architeuthis) grow to about 12 metres and live deep in every ocean; the first photographs of a live one were taken in 2004.</div>" + worldBtn("next", "Sail on", "Next: " + VRN_TOUR[T.i + 1].name), { next: function () { worldCard(null); vrnTourNext(); } });
},
function (early) {
var T = VRN.tour;
VRN.tour = null;
VRN.ride = null;
vrnRidePanel(false);
if (T && T.squid)
T.squid.arms.forEach(function (A) { if (A.g.parent)
A.g.parent.remove(A.g); });
if (VRN.tourNemo) {
VRN.G.remove(VRN.tourNemo.g);
VRN.tourNemo = null;
}
vrnSubHome();
var D = VRN_HB.dock;
if (!early) {
var d = vrnData();
d.tourDone = 1;
vrnSave();
vrnReward("tour", "🌊 <b>The grand tour is done.</b> 'Mobilis in mobili,' Nemo says, and bows. You may take her wheel whenever you like.");
vrnKeep("🌊", "Captain Nemo's grand tour", "the ten stops of the Deep");
}
vrnMove(D.x - 26, D.z - 4, Math.PI, early ? "🌊 Back at the dock. Nemo will finish the tour another time." : null, 2.9);
},
function () {
worldCard(null);
var D = VRN_HB.dock;
vrnMove(D.x, D.z + 30, Math.PI, "⚓ <b>You have the Nautilus.</b> Steer as you walk; climb and dive as you fly (Space and C, or the arrows on a phone). She stays under the sea; surface to breathe the air. The 🛬 button brings her home.", -4, { fn: function () {
var sub = vrnSubOut();
VRN.ride = { k: "sub", keep: 1, g: sub, prevFly: typeof canFly !== "undefined" ? canFly : false, off: function (quiet) { vrnPilotOff(quiet); } };
if (typeof canFly !== "undefined")
canFly = true;
if (typeof rideSpeed !== "undefined")
rideSpeed = 3.2;
if (typeof flyY !== "undefined")
flyY = camera.position.y - 1.72;
vrnRidePanel(true, [["🛬 Bring her home", function () { vrnPilotOff(); }], ["🤿 Step out here", function () { var L = worldLocal(); vrnPilotOff(true, true); vrnDive(true); camera.position.y = vrnLand(L.x, L.z) + 1.72; }]]);
} });
},
function (quiet, stay) {
var R = VRN.ride;
if (!R || R.k !== "sub")
return;
VRN.ride = null;
vrnRidePanel(false);
if (typeof canFly !== "undefined")
canFly = typeof hasAbility === "function" ? (hasAbility("flying") || hasAbility("floating")) : false;
if (typeof rideSpeed !== "undefined")
rideSpeed = 1;
vrnSubHome();
if (stay)
return;
var D = VRN_HB.dock;
vrnMove(D.x - 26, D.z - 4, Math.PI, quiet ? null : "⚓ The Nautilus glides back into her cave. You step onto the jetty.", 2.9);
},
function (dt, L) {
var R = VRN.ride;
if (!R || R.k !== "sub")
return;
var sub = R.g, bed = vrnLand(L.x, L.z), y = camera.position.y;
if (vrnWaterAt(L.x, L.z) === null) {
return;
}
var lo = bed + 3.2, hi = -0.6;
if (y < lo) {
camera.position.y = lo;
if (typeof flyY !== "undefined")
flyY = lo - 1.72;
}
if (y > hi) {
camera.position.y = hi;
if (typeof flyY !== "undefined")
flyY = hi - 1.72;
}
sub.position.set(L.x + Math.sin(yaw) * 6, camera.position.y - 1.6, L.z + Math.cos(yaw) * 6);
sub.rotation.y = yaw;
if (sub.userData.prop)
sub.userData.prop.rotation.z += dt * 5;
},
function (G) {
var grp = new THREE.Group();
grp.name = "vrn-island";
G.add(grp);
var granite = vrnSurf("stone", 0xA86A58, 3), wood = vrnSurf("wood", 0x7A5A3A, 2), brick = vrnSurf("brick", 0xA8583A, 2), R = wRand(1865);
function at(p, dx, dz) { return { x: p.x + (dx || 0), z: p.z + (dz || 0), y: vrnLand(p.x + (dx || 0), p.z + (dz || 0)) }; }
var C = at(VRN_IS.chimneys);
for (var i = 0; i < (VRN.lite ? 8 : 16); i++) {
var b = vrnBoxM(4 + R() * 7, 4 + R() * 8, 4 + R() * 7, granite, C.x - 10 + R() * 24, C.y + 2, C.z - 14 + R() * 28, grp);
b.rotation.set(R() * 0.3, R() * 3, R() * 0.3);
}
VRN.isFire = wGlow(0xFFA050, 6, 0);
VRN.isFire.position.set(C.x - 6, C.y + 1, C.z + 6);
grp.add(VRN.isFire);
VRN.smokers.push({ x: C.x - 6, y: C.y + 1, z: C.z + 6, r: 0.6, fire: "fire" });
var Gh = VRN_IS.granite;
VRN.isWins = [];
for (var w = 0; w < 5; w++) {
var win = new THREE.Mesh(new THREE.PlaneGeometry(2, 2.6), vrnC(0x2A2420));
win.position.set(VRN_ISL.cliffX + 0.6, 36, Gh.z - 26 + w * 12);
win.rotation.y = Math.PI / 2;
grp.add(win);
VRN.isWins.push(win);
}
VRN.isDoor = new THREE.Mesh(new THREE.PlaneGeometry(3, 4), vrnC(0x14100E));
VRN.isDoor.position.set(VRN_ISL.cliffX + 0.6, 30, Gh.z);
VRN.isDoor.rotation.y = Math.PI / 2;
VRN.isDoor.visible = false;
grp.add(VRN.isDoor);
var lift = new THREE.Group();
lift.position.set(VRN_IS.lift.x + 3, 0, VRN_IS.lift.z);
grp.add(lift);
VRN.isLift = lift;
lift.visible = false;
wCyl(0.05, 0.05, 30, vrnC(0x8A7A5A), 0, 16, -1, lift, 4);
wCyl(0.05, 0.05, 30, vrnC(0x8A7A5A), 0, 16, 1, lift, 4);
vrnBoxM(2, 0.2, 2.4, wood, 0, 2, 0, lift);
vrnSpot(VRN_IS.lift.x + 3, VRN_IS.lift.z, 4, "Granite House, high in the cliff", "ride the lift up", function () { if (!vrnIsHas("rim")) {
setStatus("🪨 Sheer granite, thirty metres up. Water seeps out of a crack high in the cliff: the lake's old outlet, blocked. Cyrus has an idea about that.");
return;
} vrnEnter("granite"); }, vrnLand(VRN_IS.lift.x + 3, VRN_IS.lift.z));
var Ri = at(VRN_IS.rim);
VRN.isRim = new THREE.Group();
VRN.isRim.position.set(Ri.x, Ri.y, Ri.z);
grp.add(VRN.isRim);
for (var r = 0; r < 7; r++)
vrnBoxM(3 + R() * 3, 2 + R() * 2, 3 + R() * 3, granite, (r - 3) * 3, 1, R() * 3, VRN.isRim);
var K = at(VRN_IS.kiln);
var kiln = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3, 4, 10), brick);
kiln.position.set(K.x, K.y + 2, K.z);
grp.add(kiln);
vrnSolid({ x: K.x, z: K.z, r: 3 });
VRN.smokers.push({ x: K.x, y: K.y + 4.5, z: K.z, r: 0.8, fire: "brick" });
var Gf = at(VRN_IS.kiln, -14);
wCyl(1.4, 1.8, 2.6, brick, Gf.x, Gf.y + 1.3, Gf.z, grp, 10);
vrnSolid({ x: Gf.x, z: Gf.z, r: 1.8 });
var F = at(VRN_IS.forge);
vrnBoxM(3, 1.4, 2.4, brick, F.x, F.y + 0.7, F.z, grp);
wBox(1, 0.6, 0.5, vrnMetal(0x2A2A2A), F.x + 3, F.y + 0.9, F.z, grp);
vrnSolid({ x: F.x, z: F.z, hw: 1.6, hd: 1.3, h: 1.4 });
VRN.smokers.push({ x: F.x, y: F.y + 1.6, z: F.z, r: 0.5, fire: "iron" });
VRN.isTargets = [];
for (var t = 0; t < 3; t++) {
var T = at(VRN_IS.kiln, 30 + t * 7, -30 - t * 4), tg = new THREE.Group();
tg.position.set(T.x, T.y, T.z);
grp.add(tg);
wBox(0.15, 1.6, 0.15, wood, 0, 0.8, 0, tg);
var face = new THREE.Mesh(new THREE.CircleGeometry(0.7, 16), vrnC(0xE8D8B8, { ds: true }));
face.position.y = 1.8;
tg.add(face);
var ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.35, 16), vrnC(0xA83A2A, { ds: true }));
ring.position.set(0, 1.8, 0.01);
tg.add(ring);
VRN.isTargets.push({ g: tg, x: T.x, z: T.z, y: T.y + 1.8, hit: false });
}
var Co = at(VRN_IS.corral);
VRN.isCorral = new THREE.Group();
VRN.isCorral.position.set(Co.x, Co.y, Co.z);
grp.add(VRN.isCorral);
VRN.isCorral.visible = false;
for (var p = 0; p < 24; p++) {
var a = p / 24 * Math.PI * 2;
wCyl(0.14, 0.16, 1.8, wood, Math.cos(a) * 40, 0.9, Math.sin(a) * 40, VRN.isCorral, 5);
var ra = wBox(10.5, 0.12, 0.12, wood, Math.cos(a + 0.13) * 40, 1.3, Math.sin(a + 0.13) * 40, VRN.isCorral);
ra.rotation.y = -(a + 0.13) - Math.PI / 2;
}
vrnBoxM(8, 3, 5, wood, 0, 1.5, -30, VRN.isCorral);
var M = at(VRN_IS.mill);
VRN.isMill = new THREE.Group();
VRN.isMill.position.set(M.x, M.y, M.z);
grp.add(VRN.isMill);
VRN.isMill.visible = false;
var tw = new THREE.Mesh(new THREE.CylinderGeometry(2, 3.4, 10, 8), wood);
tw.position.y = 5;
VRN.isMill.add(tw);
wCone(2.8, 2.6, vrnSurf("wood", 0x5A4A3A, 1), 0, 11.3, 0, VRN.isMill, 8);
var sails = new THREE.Group();
sails.position.set(0, 9, 3.4);
VRN.isMill.add(sails);
for (var s = 0; s < 4; s++) {
var sl = wBox(1.4, 7, 0.05, vrnC(0xE8E0CC, { ds: true }), 0, 3.6, 0, null);
var arm = new THREE.Group();
arm.add(sl);
arm.rotation.z = s * Math.PI / 2;
sails.add(arm);
}
VRN.fx.push({ k: "spinz", m: sails, sp: 0.6 });
vrnSolid({ x: M.x, z: M.z, r: 3.4 });
var Y = at(VRN_IS.yard);
VRN.isBoat = new THREE.Group();
VRN.isBoat.position.set(Y.x, Y.y + 0.6, Y.z);
grp.add(VRN.isBoat);
VRN.isBoat.visible = false;
var hull = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wood);
hull.scale.set(2, 1.4, 7);
VRN.isBoat.add(hull);
wCyl(0.1, 0.12, 9, wood, 0, 4.5, 1, VRN.isBoat, 6);
var sail = wBox(0.04, 6, 4, vrnC(0xE8E0CC, { ds: true }), 0, 5, -1, VRN.isBoat);
VRN.isWire = [];
VRN_IS.wire.forEach(function (P, i) { var y = vrnLand(P.x, P.z); wCyl(0.1, 0.12, 5, wood, P.x, y + 2.5, P.z, grp, 5); VRN.isWire.push({ x: P.x, z: P.z, y: y + 4.8 }); });
var D = at(VRN_IS.dakkar);
var arch = new THREE.Mesh(new THREE.TorusGeometry(5, 2.4, 8, 16, Math.PI), vrnSurf("stone", 0x3A3A40, 2));
arch.position.set(D.x, D.y, D.z);
arch.rotation.y = Math.PI / 2;
grp.add(arch);
var dark = new THREE.Mesh(new THREE.CircleGeometry(4.4, 16, 0, Math.PI), vrnC(0x060608));
dark.position.set(D.x - 0.5, D.y, D.z);
dark.rotation.y = Math.PI / 2;
grp.add(dark);
vrnSpot(D.x - 3, D.z, 5, "A sea cave in the black rocks", "follow the wire in", function () { if (!vrnIsHas("defend")) {
setStatus("🌊 A dark sea cave in the basalt. The surf booms inside. You don't know your way in yet.");
return;
} vrnEnter("dakkar"); }, D.y);
var Cr = at(VRN_IS.crate);
VRN.isCrate = vrnBoxM(1.6, 0.9, 1, vrnSurf("wood", 0x5A3A22, 1), Cr.x, Cr.y + 0.3, Cr.z, grp);
VRN.isCrate.rotation.set(0.1, 0.4, 0.05);
VRN.isCrate.visible = false;
VRN.isFolk = {};
[["cyrus", -12, 6], ["pencroft", -4, 20], ["herbert", 4, 10], ["spilett", -18, 16], ["neb", -8, 26]].forEach(function (f) { var x = C.x + f[1], z = C.z + f[2], P = vrnPerson(grp, f[0], x, z, Math.PI / 2, { y: vrnLand(x, z), wander: f[0] === "cyrus" ? 0 : 6, fn: f[0] === "cyrus" ? function () { vrnLadderCard(); } : null }); VRN.isFolk[f[0]] = P; });
vrnSpot(C.x - 12, C.z + 6, 3, "Cyrus Smith, the engineer", "ask what's next", function () { vrnLadderCard(); }, C.y);
VRN.isMark = wGlow(0xFFE0A0, 4, 0.55);
grp.add(VRN.isMark);
VRN.isMark.visible = false;
VRN.districts.push({ g: grp, x: VRN_ISL.x, z: VRN_ISL.z, r: VRN_ISL.r + 700 });
vrnIslandShow();
},
function () {
var d = vrnData(), n = d.isl || 0;
VRN.lakeDrained = n > vrnLadderIdx("rim");
if (VRN.lake)
VRN.lake.position.y = vrnLakeY();
if (VRN.isRim)
VRN.isRim.visible = !VRN.lakeDrained;
if (VRN.isDoor)
VRN.isDoor.visible = VRN.lakeDrained;
if (VRN.isLift)
VRN.isLift.visible = VRN.lakeDrained;
if (VRN.isWins)
VRN.isWins.forEach(function (w) { w.visible = VRN.lakeDrained; w.material = n > vrnLadderIdx("glass") ? vrnC(0xBCE0F0, { e: 0x8AB8D0, ei: 0.4 }) : w.material; });
if (VRN.isFire)
VRN.isFire.material.opacity = n > 0 ? 0.6 : 0;
if (VRN.isCorral)
VRN.isCorral.visible = n > vrnLadderIdx("corral") || (n === vrnLadderIdx("corral") && (d.islStep || 0) > 0);
if (VRN.isMill)
VRN.isMill.visible = n > vrnLadderIdx("mill") || (n === vrnLadderIdx("mill") && (d.islStep || 0) > 0);
if (VRN.isBoat) {
var bi = vrnLadderIdx("boat");
VRN.isBoat.visible = n > bi || (n === bi && (d.islStep || 0) > 0);
if (n > bi || (n === bi && (d.islStep || 0) > 2)) {
VRN.isBoat.position.set(-2470, 0.3, 965);
}
}
if (VRN.isCrate)
VRN.isCrate.visible = n > vrnLadderIdx("brick");
vrnIsWireDraw(n > vrnLadderIdx("wire") ? VRN.isWire.length : (n === vrnLadderIdx("wire") ? (d.islWire || 0) : 0));
},
function (k) {
if (VRN.isWireLine) {
VRN.isWireLine.parent.remove(VRN.isWireLine);
VRN.isWireLine = null;
}
if (k < 1)
return;
var pts = [new THREE.Vector3(VRN_ISL.cliffX + 1, 34, VRN_IS.granite.z)];
for (var i = 0; i < k && i < VRN.isWire.length; i++)
pts.push(new THREE.Vector3(VRN.isWire[i].x, VRN.isWire[i].y, VRN.isWire[i].z));
VRN.isWireLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x2A2A2A }));
VRN.G.add(VRN.isWireLine);
},
function () {
var d = vrnData(), n = d.isl || 0, fns = {};
if (n >= VRN_LADDER.length) {
if (!d.islEnd) {
worldCard(VRN_H + "🏝️ The Mysterious Island</div><div style='opacity:.9;margin:6px 0;line-height:1.5'><b>Cyrus Smith:</b> 'Every rung of the ladder, from fire to the telegraph. Whoever has been helping us is in the west, where the second wire goes, in the sea cave in the black rocks. Go and find him.'</div>", {});
return;
}
worldCard(VRN_H + "🏝️ The Mysterious Island</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>You have climbed the whole Engineer's Ladder and seen the island's end. Cyrus is happy to tell you about any of it again.</div>" + worldBtn("again", "Start the ladder over", "Your gold for it is once a day"), { again: function () { d.isl = 0; d.islStep = 0; d.islEnd = 0; vrnSave(); vrnIslandShow(); vrnLadderCard(); } });
return;
}
var S = VRN_LADDER[n], st = d.islStep || 0, h = VRN_H + "🔧 The Engineer's Ladder: " + (n + 1) + " of 12, " + esc(S.name) + "</div>";
if (!st)
h += "<div style='opacity:.9;margin:6px 0;line-height:1.5'><b>Cyrus Smith:</b> " + esc(S.cyrus) + "</div>";
h += "<div style='margin:6px 0'>" + S.steps.map(function (p, i) { return "<div style='opacity:" + (i < st ? 0.5 : i === st ? 1 : 0.7) + "'>" + (i < st ? "✓" : i === st ? "➤" : "○") + " " + esc(p.name || "Cyrus's question") + "</div>"; }).join("") + "</div>";
var cur = S.steps[st];
if (cur && cur.q) {
h += worldBtn("q", "Answer Cyrus's question", "");
fns.q = function () { vrnLadderQuiz(); };
}
else if (cur)
h += "<div style='opacity:.75;font-size:12px'>Follow the soft light to <b>" + esc(cur.name) + "</b>.</div>";
h += "<div style='opacity:.7;font-size:12px;margin-top:4px'>" + vrnPayLine("island") + "</div>";
worldCard(h, fns);
vrnLadderMark();
},
function () {
var d = vrnData(), n = d.isl || 0, S = VRN_LADDER[n];
if (!VRN.isMark)
return;
if (!S) {
var D = VRN_IS.dakkar;
VRN.isMark.visible = !d.islEnd && n >= VRN_LADDER.length;
VRN.isMark.position.set(D.x - 3, Math.max(0, vrnLand(D.x, D.z)) + 3, D.z);
return;
}
var p = vrnLadderPos(S.steps[d.islStep || 0]);
VRN.isMark.visible = !!p;
if (p)
VRN.isMark.position.set(p.x, vrnLand(p.x, p.z) + 3, p.z);
},
function () {
var d = vrnData(), S = VRN_LADDER[d.isl || 0], p = S && S.steps[d.islStep || 0];
if (!p || !p.q)
return;
var fns = {};
var h = VRN_H + "🔧 " + esc(p.q) + "</div>";
p.opts.forEach(function (o, i) {
h += worldBtn("o" + i, o, "");
fns["o" + i] = function () {
if (i !== p.ok) {
setStatus("🤔 Cyrus shakes his head kindly. 'Think again.'");
return;
}
worldCard(VRN_H + "✓ Right</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>" + esc(p.why) + "</div>" + worldBtn("ok", "On", ""), { ok: function () { worldCard(null); vrnLadderStep(); } });
};
});
worldCard(h, fns);
},
function (L) {
var d = vrnData(), S = VRN_LADDER[d.isl || 0];
if (!S)
return null;
var p = S.steps[d.islStep || 0];
if (!p || p.q)
return null;
if (p.k === "shoot") {
for (var i = 0; i < VRN.isTargets.length; i++) {
var T = VRN.isTargets[i];
if (!T.hit && Math.hypot(L.x - T.x, L.z - T.z) < 26)
return { name: "Pencroft's target (" + (VRN.isTargets.filter(function (t) { return t.hit; }).length) + " of 3 hit)", verb: "aim and shoot", fn: function () { vrnShoot(); } };
}
return null;
}
if (p.k === "herd")
return vrnHerdAt(L);
var pos = vrnLadderPos(p);
if (!pos || Math.hypot(L.x - pos.x, L.z - pos.z) > 8)
return null;
if (p.k === "rim")
return { name: p.name, verb: "stand ready to run clear", fn: function () { vrnRimStart(); } };
if (p.k === "foes")
return { name: p.name, verb: "stand and fight", fn: function () { vrnFoes(VRN_IS.corral, p.n, "vrn_convict", function () { vrnLadderStep(); }); } };
if (p.k === "wire")
return { name: "Telegraph post " + ((d.islWire || 0) + 1) + " of " + VRN_IS.wire.length, verb: "string the wire", fn: function () { d.islWire = (d.islWire || 0) + 1; vrnSave(); vrnIsWireDraw(d.islWire); if (d.islWire >= VRN_IS.wire.length) {
d.islWire = 0;
vrnLadderStep();
}
else {
setStatus("📡 The wire is up to this post. On to the next.");
vrnLadderMark();
} } };
return { name: p.name, verb: p.verb, fn: function () { setStatus("🔧 " + p.say); vrnLadderStep(); } };
},
function () {
var d = vrnData(), S = VRN_LADDER[d.isl || 0];
if (!S)
return;
d.islStep = (d.islStep || 0) + 1;
if (d.islStep >= S.steps.length) {
d.isl = (d.isl || 0) + 1;
d.islStep = 0;
vrnSave();
vrnIslandShow();
var gift = VRN_GIFTS.filter(function (g) { return g.after === S.k; })[0];
worldCard(VRN_H + "✓ " + esc(S.name) + "</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>" + esc(S.after) + "</div>" + (gift ? "<div style='opacity:.9;margin:6px 0;line-height:1.5'>" + gift.say + "</div>" : "") +
worldBtn("next", d.isl < VRN_LADDER.length ? "Back to Cyrus for what's next" : "Follow the wire west", ""), { next: function () { worldCard(null); vrnLadderMark(); } });
if (S.k === "defend") {
var D = VRN_IS.dakkar;
setStatus("📡 The second wire runs off west into the rocks, to a sea cave at the far side of the island.");
}
}
else {
vrnSave();
vrnIslandShow();
vrnLadderMark();
}
},
function () {
var L = worldLocal(), best = null;
VRN.isTargets.forEach(function (T) { if (T.hit)
return; var dx = T.x - L.x, dz = T.z - L.z, rel = Math.atan2(-dx, -dz) - yaw; rel = Math.abs(Math.atan2(Math.sin(rel), Math.cos(rel))); if (rel < 0.12 && Math.hypot(dx, dz) < 26)
best = T; });
if (typeof playTone === "function")
playTone(520, 0.08);
if (!best) {
setStatus("🏹 The arrow flies wide. Turn so the target is dead ahead (the middle of your view), then shoot.");
return;
}
best.hit = true;
best.g.rotation.x = -0.25;
var n = VRN.isTargets.filter(function (t) { return t.hit; }).length;
if (n >= 3) {
VRN.isTargets.forEach(function (t) { t.hit = false; t.g.rotation.x = 0; });
vrnLadderStep();
setStatus("🏹 <b>Thunk!</b> Three in the board.");
}
else
setStatus("🏹 <b>Thunk!</b> " + n + " of 3.");
},
function (L) {
if (!VRN.isSheep) {
VRN.isSheep = [];
var Co = VRN_IS.corral;
for (var i = 0; i < 3; i++) {
var a = 0.8 + i * 1.4, x = Co.x + Math.cos(a) * 150, z = Co.z + Math.sin(a) * 150, g = vrnCreature("sheep", 1, i);
g.position.set(x, vrnLand(x, z), z);
VRN.G.add(g);
VRN.isSheep.push({ g: g, x: x, z: z, in: false, go: false });
}
}
for (var j = 0; j < VRN.isSheep.length; j++) {
var S = VRN.isSheep[j];
if (!S.in && !S.go && Math.hypot(L.x - S.x, L.z - S.z) < 8)
return { name: "A wild sheep", verb: "drive it toward the corral", fn: (function (S) { return function () { S.go = true; setStatus("🐑 It trots off downhill toward the corral gate."); }; })(S) };
}
return null;
},
function (dt) {
if (!VRN.isSheep)
return;
var Co = VRN_IS.corral, done = 0;
VRN.isSheep.forEach(function (S) { if (S.go && !S.in) {
var dx = Co.x - S.x, dz = Co.z - S.z, d = Math.hypot(dx, dz);
if (d < 20) {
S.in = true;
}
else {
S.x += dx / d * dt * 5;
S.z += dz / d * dt * 5;
S.g.position.set(S.x, vrnLand(S.x, S.z), S.z);
S.g.rotation.y = Math.atan2(dx, dz);
}
} if (S.in)
done++; });
if (done >= VRN.isSheep.length) {
VRN.isSheep.forEach(function (S) { S.g.position.set(Co.x + (Math.random() - 0.5) * 30, vrnLand(Co.x, Co.z), Co.z + (Math.random() - 0.5) * 30); });
VRN.isSheep = null;
vrnLadderStep();
setStatus("🐑 <b>All three are in.</b> Neb shuts the gate.");
}
},
function (dt, L) {
var R = VRN.rim;
if (!R)
return;
var old = Math.ceil(R.t);
R.t -= dt;
var d = Math.hypot(L.x - R.x, L.z - R.z);
if (Math.ceil(R.t) !== old && R.t > 0)
setStatus("⚠️ <b>Run clear!</b> " + Math.ceil(R.t) + "... (" + Math.round(d) + " m away" + (d >= 60 ? ", far enough" : "") + ")");
if (R.t > 0)
return;
VRN.rim = null;
if (d < 60) {
setStatus("⚠️ Cyrus waves you back and holds off. 'Further! We'll try again.' (Press E at the rim to start again.)");
return;
}
VRN.smokers.push({ x: R.x, y: vrnLand(R.x, R.z) + 2, z: R.z, r: 6, dark: 0, t: 20 });
if (typeof playTone === "function")
playTone(60, 0.8);
VRN.lakeFall = { t: 0 };
vrnLadderStep();
},
function (at, n, kind, win) {
if (VRN.foes)
return;
var B = VRN_BEASTS[kind] || {}, list = [];
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + 0.3, x = at.x + Math.cos(a) * 45, z = at.z + Math.sin(a) * 45, g = null;
if (kind === "vrn_convict") {
g = wPerson("vrn_conv" + i, { look: { sex: "m", top: 0x8A7A5A, bottom: 0x3A3A2A, layer: "vest", layerColor: 0x4A3A2A, hat: i % 2 ? "cap" : "none", hatColor: 0x3A2A1A, beard: 1, shoes: 0x1A1A1A } });
}
else
g = vrnCreature(B.arch || "boar", 1, i);
g.position.set(x, vrnLand(x, z), z);
VRN.G.add(g);
list.push({ g: g, x: x, z: z, hp: 2, cd: 0 });
}
VRN.foes = { list: list, win: win, cd: 0 };
vrnRidePanel(true, [["⚔️ Strike", function () { vrnFoeHit(); }]]);
setStatus("⚔️ <b>" + n + " of them!</b> Face one and strike (<b>F</b>, or the ⚔️ button). Two good blows sends each one running.");
},
function (dt, L) {
var F = VRN.foes;
if (!F)
return;
if (F.cd > 0)
F.cd -= dt;
F.list.forEach(function (E) {
if (E.hp <= 0)
return;
var dx = L.x - E.x, dz = L.z - E.z, d = Math.hypot(dx, dz) || 1;
if (E.cd > 0)
E.cd -= dt;
if (d > 2.2) {
E.x += dx / d * dt * 2.6;
E.z += dz / d * dt * 2.6;
}
else if (E.cd <= 0) {
E.cd = 2.4;
setStatus("💢 A convict shoves you back. Strike back!");
camera.position.x -= dx / d * -1.5;
camera.position.z -= dz / d * -1.5;
}
E.g.position.set(E.x, vrnLand(E.x, E.z), E.z);
E.g.rotation.y = Math.atan2(dx, dz);
});
},
function () {
var F = VRN.foes;
if (!F || F.cd > 0)
return;
F.cd = 0.45;
var L = worldLocal(), best = null, bd = 1e9;
F.list.forEach(function (E) { if (E.hp <= 0)
return; var dx = E.x - L.x, dz = E.z - L.z, d = Math.hypot(dx, dz), rel = Math.atan2(-dx, -dz) - yaw; rel = Math.abs(Math.atan2(Math.sin(rel), Math.cos(rel))); if (d < 4.5 && rel < 0.9 && d < bd) {
bd = d;
best = E;
} });
if (!best) {
setStatus("⚔️ Get close and face one first.");
return;
}
best.hp--;
if (typeof playTone === "function")
playTone(180, 0.12);
if (best.hp <= 0) {
best.g.visible = false;
if (best.g.parent)
best.g.parent.remove(best.g);
}
var left = F.list.filter(function (E) { return E.hp > 0; }).length;
if (left) {
setStatus(best.hp <= 0 ? "⚔️ <b>That one runs for the jungle!</b> " + left + " left." : "⚔️ A good blow! Once more.");
return;
}
VRN.foes = null;
vrnRidePanel(false);
if (F.win)
F.win();
},
function () {
var d = vrnData();
if ((d.isl || 0) < VRN_LADDER.length) {
worldCard(VRN_H + "🕯️ The old captain</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>He opens his eyes. 'Not yet. Finish what your engineer has begun; then come back to me.'</div>", {});
return;
}
var h = VRN_H + "🕯️ Prince Dakkar</div><div style='opacity:.9;margin:6px 0;line-height:1.55'>'I was born a prince in India, the son of a raja. I fought for my people's freedom and lost everything: my wife, my children, my land. So I built the Nautilus and lived in the sea, free. For thirty years I sailed. Now I am old and my crew are all dead, and I came here to die. I saw your balloon fall in 1865. I sent the chest, the quinine, the light on the heights; I sank the pirates' ship. Do not thank me.'</div>" +
"<div style='opacity:.9;margin:6px 0;line-height:1.55'>'Listen. The island's volcano is waking, and the wall between it and the sea is cracking. When the sea gets in, the whole island will go. Bury me here in my ship, and then go, all of you. Go quickly.'</div>";
worldCard(h + worldBtn("go", "Promise him, and run for the Bonadventure", "Mount Franklin is waking: get to the boat at the river mouth"), { go: function () { worldCard(null); vrnEruptStart(); } });
},
function () {
var B = { x: -2480, z: 965 };
VRN.erupt = { t: 180, bx: B.x, bz: B.z };
vrnLeave("dakkar");
setTimeout(function () { setStatus("🌋 <b>Mount Franklin is waking.</b> A deep rumble under your feet, a great column of grey ash rising over the island, soft as a storm cloud. Get to the <b>Bonadventure</b> at the river mouth on the east coast, under the cliff, before the island goes: 3 minutes."); }, 900);
VRN.smokers.push({ x: VRN_ISL.mx, y: VRN_ISL.peak, z: VRN_ISL.mz, r: 40, dark: 1, big: 1, t: 200 });
},
function (dt, L) {
var E = VRN.erupt;
if (!E)
return;
var old = Math.ceil(E.t);
E.t -= dt;
var d = Math.hypot(L.x - E.bx, L.z - E.bz);
if (Math.ceil(E.t) % 15 === 0 && Math.ceil(E.t) !== old)
setStatus("🌋 <b>" + Math.ceil(E.t) + " seconds.</b> The Bonadventure is " + Math.round(d) + " m away, at the river mouth under the cliff.");
if (d < 12) {
VRN.erupt = null;
vrnIslandEnd(true);
return;
}
if (E.t <= 0) {
VRN.erupt = null;
vrnIslandEnd(false);
}
},
function (made) {
var d = vrnData();
if (!made) {
vrnMove(-2470, 980, Math.PI / 2, "🌋 Pencroft hauls you aboard the Bonadventure at the very last moment. (Next time, run sooner!) Press E at the old captain's grotto to try the escape again.", 1, { fn: function () { } });
return;
}
d.islEnd = 1;
vrnSave();
worldCard(VRN_H + "🌋 The end of Lincoln Island</div><div style='opacity:.9;margin:6px 0;line-height:1.55'>You push off as the mountain splits. The sea pours into the volcano, there is a long deep roar, and when the grey ash drifts clear the island is gone: only a rock is left. On it the castaways wait, hungry, for days, until a ship comes: the Duncan, sent by Lord Glenarvan to fetch Ayrton home. In America they buy land and build a new Lincoln Island in Iowa, with the jewels Nemo left them.</div>" +
"<div style='opacity:.75;font-size:12px'>(In the game the island is still here for every dreamer who comes after you.)</div>", {});
vrnReward("island", "🏝️ <b>The Mysterious Island, to the end.</b> Twelve rungs, an old friend, and an escape.");
vrnKeep("🏝️", "The Mysterious Island", "the whole Engineer's Ladder");
vrnMove(VRN_IS.beach.x, VRN_IS.beach.z, Math.PI, null);
},
function (x, z) {
var lx = x - VRN_UG_X, U = VRN_UG, S = U.sea, n = wFbm(lx / 120, z / 120, 71, 3);
var e = Math.hypot((lx - S.cx) / S.rx, z / S.rz), h;
if (e < 1.15) {
h = -16 + vrnS(0.7, 1.0, e) * 22 + n * 6;
if (e > 1.0)
h += vrnS(1.0, 1.15, e) * 260;
if (lx < -1450 && e < 1.02)
h = Math.max(h, 2 + n * 2);
if (lx > U.shore)
h = Math.max(h, 2 + (lx - U.shore) * 0.02 + n * 5);
var id = Math.hypot(lx - U.isl.x, z - U.isl.z);
if (id < U.isl.r * 1.6)
h = Math.max(h, -6 + U.isl.h * Math.exp(-Math.pow(id / U.isl.r, 2)) + n * 3);
}
else
h = 280 + n * 40;
var g = vrnUgSegD(lx, z);
if (g.d < U.galW * 1.6) {
var gt = vrnS(U.galW * 1.6, U.galW * 0.7, g.d), gy = g.y + n * 1.5;
h = h * (1 - gt) + gy * gt;
}
var cd = Math.hypot(lx - U.chimney.x, z - U.chimney.z);
if (cd < 40)
h = Math.min(h, 4 + cd * 0.1);
return h;
},
function (x, z, h, slope, c) {
var f = wFbm(x / 40, z / 40, 77, 2), r = 0.42 + f * 0.12, g = 0.36 + f * 0.1, b = 0.28 + f * 0.06;
if (h < 1.5 && h > -4) {
r = 0.62 + f * 0.1;
g = 0.56 + f * 0.08;
b = 0.42;
}
if (slope > 0.8) {
r = 0.3 + f * 0.06;
g = 0.27 + f * 0.05;
b = 0.24;
}
if (x - VRN_UG_X > VRN_UG.shore && h < 40 && slope < 0.6) {
r = 0.36 + f * 0.08;
g = 0.38 + f * 0.1;
b = 0.26;
}
c.setRGB(r, g, b);
},
function (G) {
var grp = new THREE.Group();
grp.name = "vrn-under";
G.add(grp);
var X = VRN_UG_X, U = VRN_UG;
VRN.ugrid = vrnGridOf({ x0: X - 3500, x1: X + 3900, z0: -2200, z1: 2200 }, VRN.lite ? 40 : 20, vrnUgH);
VRN.ugTiles = vrnTerrainOf(grp, VRN.ugrid, 1200, "vrn-ug", vrnUgCol);
var sea = new THREE.Mesh(new THREE.PlaneGeometry(5600, 4000), vrnWaterMat(0x2A4A50, 0.94));
sea.rotation.x = -Math.PI / 2;
sea.position.set(X + U.sea.cx, 0, 0);
sea.userData.keep = 1;
grp.add(sea);
VRN.ugSea = sea;
var roof = new THREE.Mesh(new THREE.SphereGeometry(1, VRN.lite ? 16 : 32, VRN.lite ? 8 : 14, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x8A7A5A, side: THREE.BackSide, fog: false }));
roof.scale.set(U.sea.rx * 1.08, 420, U.sea.rz * 1.08);
roof.position.set(X + U.sea.cx, 40, 0);
grp.add(roof);
for (var gI = 0; gI < (VRN.lite ? 3 : 7); gI++) {
var gl = wGlow(0xFFE8B0, 700, 0.12);
gl.position.set(X + U.sea.cx - 1800 + gI * 600, 330, (gI % 2 ? -1 : 1) * 300);
grp.add(gl);
}
var P = U.gal, rock = vrnSurf("stone", 0x3A342C, 4);
for (var i = 0; i < P.length - 1; i++) {
var a = P[i], b = P[i + 1], mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2, len = Math.hypot(b[0] - a[0], b[1] - a[1]);
var slab = new THREE.Mesh(new THREE.BoxGeometry(U.galW * 2.4, 6, len + 30), rock);
slab.position.set(X + mx, (a[2] + b[2]) / 2 + 34, mz);
slab.rotation.y = Math.atan2(b[0] - a[0], b[1] - a[1]);
slab.rotation.x = Math.atan2(a[2] - b[2], len) * -1;
grp.add(slab);
}
for (var k = 0; k < P.length; k++) {
var lp = wGlow(0xE8F0FF, 26, 0.35);
lp.position.set(X + P[k][0], P[k][2] + 4, P[k][1]);
grp.add(lp);
}
VRN.ugStream = new THREE.Group();
grp.add(VRN.ugStream);
VRN.ugStream.visible = !!VRN.hansbach;
for (var s = 0; s < P.length - 1; s++) {
var A = P[s], B = P[s + 1];
if (A[0] < U.spring.x - 10)
continue;
var len2 = Math.hypot(B[0] - A[0], B[1] - A[1]), st = new THREE.Mesh(new THREE.PlaneGeometry(3, len2), vrnWaterMat(0x6A9AA8, 0.8));
st.rotation.x = -Math.PI / 2;
st.rotation.z = -Math.atan2(B[0] - A[0], B[1] - A[1]);
st.position.set(X + (A[0] + B[0]) / 2, (A[2] + B[2]) / 2 + 0.5, (A[1] + B[1]) / 2);
VRN.ugStream.add(st);
}
var C = U.camp, cy = vrnLand(X + C.x, C.z);
vrnBoxM(4, 2.2, 4, vrnC(0x8A7A5A, { ds: true }), X + C.x - 10, cy + 1.1, C.z - 8, grp);
var fire = wGlow(0xFFA050, 5, 0.6);
fire.position.set(X + C.x - 6, cy + 0.6, C.z);
grp.add(fire);
var RX = vrnRaftX();
VRN.ugRaft = vrnRaftModel();
VRN.ugRaft.position.set(RX, 0.2, C.z);
VRN.ugRaft.userData.keep = 1;
grp.add(VRN.ugRaft);
vrnSpot(RX - 8, C.z, 8, "The raft, made of fossil wood", "push off onto the sea", function () { vrnRaftOn(); }, Math.max(0.6, vrnLand(RX - 8, C.z)));
vrnPerson(grp, "lidenbrock", X + C.x - 4, C.z + 4, Math.PI / 2, { y: cy });
vrnPerson(grp, "axel", X + C.x - 8, C.z + 8, Math.PI / 2, { y: cy });
VRN.ugHans = vrnPerson(grp, "hans", RX - 10, C.z + 6, -Math.PI / 2, { y: vrnLand(RX - 10, C.z + 6) });
VRN.smokers.push({ x: X + U.geyser.x, y: vrnLand(X + U.geyser.x, U.geyser.z) + 1, z: U.geyser.z, r: 4, steam: 1, ug: 1 });
var R = wRand(1864), mush = vrnSurf("stone", 0xD8D0C0, 2), stalk = vrnC(0xE8E0D0);
for (var m = 0; m < (VRN.lite ? 30 : 80); m++) {
var mx2 = U.mush.x + (R() - 0.5) * 500, mz2 = U.mush.z + (R() - 0.5) * 600, my = vrnLand(X + mx2, mz2), sc = 0.6 + R() * 1.2;
wCyl(1.2 * sc, 1.6 * sc, 10 * sc, stalk, X + mx2, my + 5 * sc, mz2, grp, 8);
var cap = new THREE.Mesh(new THREE.SphereGeometry(7 * sc, VRN.lite ? 8 : 14, 6, 0, Math.PI * 2, 0, Math.PI / 2), mush);
cap.scale.y = 0.45;
cap.position.set(X + mx2, my + 10 * sc, mz2);
grp.add(cap);
vrnSolid({ x: X + mx2, z: mz2, r: 1.6 * sc });
}
var bone = vrnC(0xE8E2D2);
for (var b2 = 0; b2 < (VRN.lite ? 40 : 110); b2++) {
var bx = U.bones.x + (R() - 0.5) * 300, bz = U.bones.z + (R() - 0.5) * 220, bn = wCyl(0.25, 0.35, 2 + R() * 5, bone, X + bx, vrnLand(X + bx, bz) + 0.3, bz, grp, 5);
bn.rotation.set(Math.PI / 2, R() * 3, R() * 0.4);
}
for (var sk = 0; sk < 6; sk++) {
var sx = U.bones.x + (R() - 0.5) * 200, sz = U.bones.z + (R() - 0.5) * 160;
wSph(1.2, bone, X + sx, vrnLand(X + sx, sz) + 0.6, sz, grp);
}
VRN.ugHerd = [];
for (var h = 0; h < (VRN.lite ? 3 : 6); h++) {
var hx = U.herd.x + (R() - 0.5) * 220, hz = U.herd.z + (R() - 0.5) * 160, mm = vrnCreature("mammoth", 1.1, h);
mm.position.set(X + hx, vrnLand(X + hx, hz), hz);
grp.add(mm);
VRN.ugHerd.push({ g: mm, x: hx, z: hz, a: R() * 6 });
}
var gi = vrnCreature("giant", 1.6, 1);
gi.position.set(X + U.herd.x + 40, vrnLand(X + U.herd.x + 40, U.herd.z + 70), U.herd.z + 70);
grp.add(gi);
VRN.ugGiant = gi;
vrnSpot(X + U.herd.x - 80, U.herd.z + 120, 30, "A herd of mastodons, and someone huge watching over them", "look, from a safe way off", function () { worldCard(VRN_H + "🦣 The herdsman</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>Among the trees a herd of mastodons is feeding, and with them, leaning on a branch like a shepherd's staff, a man twelve feet tall. Axel and his uncle stare, then creep away as quietly as they can. Did they truly see him? Axel was never sure. (Mastodons were real, and died out about 10,000 years ago; nobody has ever found such a giant.)</div>", {}); });
var mark = wSign(["ᛅ ᛋ"], 2.2, 1.1, "#3A342C", "#E8D8A8");
mark.position.set(X + U.marks.x, vrnLand(X + U.marks.x, U.marks.z) + 2.4, U.marks.z);
mark.rotation.y = -Math.PI / 2;
grp.add(mark);
vrnSpot(X + U.marks.x - 3, U.marks.z, 5, "Two runes cut in the rock", "look closer", function () { worldCard(VRN_H + "ᛅ ᛋ Arne Saknussemm's mark</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>Two runes, worn but sharp: A. S. Arne Saknussemm was here, three hundred years ago, and went on through the passage behind... but a fallen rock blocks it now. 'Hans!' cries the Professor.</div>", {}); });
VRN.ugRock = vrnBoxM(10, 9, 6, vrnSurf("stone", 0x4A443A, 2), X + U.rock.x, vrnLand(X + U.rock.x, U.rock.z) + 4, U.rock.z, grp);
VRN.ugRockS = vrnSolid({ x: X + U.rock.x, z: U.rock.z, hw: 5, hd: 3, h: 9 });
vrnSpot(X + U.rock.x - 6, U.rock.z, 7, "A great fallen rock across Saknussemm's passage", "ask Hans to break it", function () { vrnRockBreak(); });
VRN.districts.push({ g: grp, x: X, z: 0, r: 4200, far: 1 });
},
function (G) {
var grp = new THREE.Group();
grp.name = "vrn-snaef";
G.add(grp);
var V = VRN_SNF.village, vy = vrnLand(V.x, V.z), turf = vrnC(0x5A7A3A), wall = vrnSurf("stone", 0x5A5A50, 2), R = wRand(1863);
for (var i = 0; i < (VRN.lite ? 6 : 12); i++) {
var a = i / 12 * Math.PI * 2 + R() * 0.3, r = 40 + R() * 60, x = V.x + Math.cos(a) * r, z = V.z + 100 + Math.sin(a) * r * 0.6, y = vrnLand(x, z), hs = new THREE.Group();
hs.position.set(x, y, z);
hs.rotation.y = R() * 3;
grp.add(hs);
vrnBoxM(6, 2.4, 9, wall, 0, 1.2, 0, hs);
var rf = new THREE.Mesh(vrnPitchGeo(6.6, 9.4, 2.6), turf);
rf.position.y = 2.4;
hs.add(rf);
wBox(1.2, 1.8, 0.1, vrnC(0x5A3A22), 0, 0.9, 4.55, hs);
vrnSolid({ x: x, z: z, r: 4.6 });
}
var ch = new THREE.Group();
ch.position.set(V.x + 30, vy, V.z + 40);
grp.add(ch);
vrnBoxM(7, 4, 12, vrnC(0xE8E4DA), 0, 2, 0, ch);
var cr = new THREE.Mesh(vrnPitchGeo(7.6, 12.4, 3.4), vrnC(0x8A2A22));
cr.position.y = 4;
ch.add(cr);
vrnSolid({ x: V.x + 30, z: V.z + 40, hw: 3.6, hd: 6.2, h: 6 });
vrnPerson(grp, "lidenbrock", V.x, V.z + 70, Math.PI, { y: vrnLand(V.x, V.z + 70), fn: function () { vrnNoteCard(); } });
vrnSpot(V.x, V.z + 70, 3, "Professor Otto Lidenbrock", "hear about the note", function () { vrnNoteCard(); }, vrnLand(V.x, V.z + 70));
vrnPerson(grp, "axel", V.x + 4, V.z + 72, Math.PI, { y: vrnLand(V.x + 4, V.z + 72) });
vrnPerson(grp, "hans", V.x - 6, V.z + 60, Math.PI, { y: vrnLand(V.x - 6, V.z + 60), wander: 8 });
var S = VRN_SNF, fy = vrnLand(S.x, S.z);
VRN.snfChim = [];
[[-40, -30], [0, -55], [40, -30]].forEach(function (o, i) {
var x = S.x + o[0], z = S.z + o[1], y = vrnLand(x, z), hole = new THREE.Mesh(new THREE.CircleGeometry(5, 18), vrnC(0x060606));
hole.rotation.x = -Math.PI / 2;
hole.position.set(x, y + 0.08, z);
grp.add(hole);
VRN.snfChim.push({ x: x, z: z, y: y });
vrnSpot(x, z, 7, ["The west chimney", "The middle chimney", "The east chimney"][i], "climb down", function () { vrnChimneyDown(i); }, y);
});
var sc = new THREE.Mesh(new THREE.ConeGeometry(16, 60, 8), vrnSurf("stone", 0x3A3A36, 2));
sc.position.set(S.x, fy + 90, S.z + 150);
grp.add(sc);
VRN.snfPeak = { x: S.x, z: S.z + 150 };
VRN.snfShadow = new THREE.Mesh(new THREE.PlaneGeometry(3, 210), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45, depthWrite: false }));
VRN.snfShadow.rotation.x = -Math.PI / 2;
grp.add(VRN.snfShadow);
VRN.snfShadow.visible = false;
vrnSpot(S.x, S.z + 60, 14, "The floor of the crater", "wait for the Sun, and watch Scartaris's shadow", function () { vrnShadowCard(); }, vrnLand(S.x, S.z + 60));
VRN.districts.push({ g: grp, x: S.x, z: (S.z + V.z) / 2, r: 1500 });
},
function () {
var d = vrnData(), fns = {}, txt = "htrae eht fo ertnec eht hcaer lliw uoy dna ,yluJ fo tsrif eht erofeb sehcuot sirtatracS fo wodahs eht hcihw sllefeanS fo retarc eht nwod oG";
var h = VRN_H + "📜 Saknussemm's note</div><div style='opacity:.9;margin:6px 0;line-height:1.5'><b>Professor Lidenbrock:</b> 'It fell out of an old book of Icelandic sagas: a scrap of parchment, in runes, by the alchemist Arne Saknussemm. My nephew Axel found the trick by accident, fanning himself with it: it reads backwards! Here it is in our letters. Can you read it?'</div>" +
"<div style='font:15px Georgia;background:#2A241C;padding:8px;border-radius:6px;letter-spacing:.5px;direction:ltr'>" + esc(txt) + "</div>";
["Go down the crater of Snaefells which the shadow of Scartaris touches before the first of July, and you will reach the centre of the earth.", "Climb the peak of Scartaris on the first of July and look for the shadow of the moon.", "Stay in Stapi until July and the centre of the earth will come to you."].forEach(function (o, i) {
h += worldBtn("o" + i, o, "");
fns["o" + i] = function () {
if (i) {
setStatus("📜 Not quite. Read it from the right-hand end, letter by letter.");
return;
}
d.cNote = 1;
vrnSave();
worldCard(VRN_H + "✓ 'Exactly!'</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>'Then up we go. The crater is at the top of the mountain, north of the village; Hans will lead. In the crater are three chimneys; at noon, the shadow of the peak Scartaris will point to the right one.' (Writing backwards is an old trick: Leonardo da Vinci wrote his notebooks in mirror writing.)</div>", {});
};
});
worldCard(h, fns);
},
function () {
var d = vrnData(), fns = {};
if (!d.cNote) {
setStatus("🌋 Three dark chimneys in the crater floor. Which one? Professor Lidenbrock in Stapi has a note about that.");
return;
}
var h = VRN_H + "🌋 The shadow of Scartaris</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>The peak of Scartaris stands on the crater's south rim. As the Sun moves across the sky, its shadow swings across the crater floor. Choose the hour, and watch where it falls.</div>";
[9, 10, 11, 12, 13, 14, 15].forEach(function (hr) { h += worldBtn("h" + hr, (hr < 10 ? "0" : "") + hr + ":00", ""); fns["h" + hr] = function () { vrnShadowAt(hr); }; });
worldCard(h, fns);
},
function (hr) {
var P = VRN.snfPeak, sh = VRN.snfShadow, ang = (hr - 12) * 0.26;
sh.visible = true;
var len = 200, cx = P.x + Math.sin(ang) * len / 2, cz = P.z - Math.cos(ang) * len / 2;
sh.position.set(cx, vrnLand(cx, cz) + 0.3, cz);
sh.rotation.z = ang;
VRN.snfHour = hr;
setStatus(hr === 12 ? "🌞 <b>Noon.</b> The Sun is due south and the shadow of Scartaris points straight north across the crater, onto the edge of <b>the middle chimney</b>. 'That one!' cries the Professor." : "🌥️ At " + hr + ":00 the shadow lies " + (hr < 12 ? "west" : "east") + " of north, across bare rock. In the book they waited for <b>noon</b>, when the Sun is highest and due south.");
worldCard(null);
},
function (i) {
var d = vrnData();
if (i !== 1 || VRN.snfHour !== 12) {
setStatus(i === 1 ? "🌋 The middle chimney. But is it the right one? Watch the shadow at the right hour first." : "🌋 Professor Lidenbrock grabs your sleeve. 'Not that one! Saknussemm's note is clear: the one the shadow touches.'");
return;
}
var P = VRN_UG.gal[0];
vrnMove(VRN_UG_X + P[0], P[1], Math.PI * 0.75, "🕯️ <b>Down the chimney.</b> Ropes, a long climb down through the dark, and then a great sloping gallery of old lava, glazed and glittering in the lamplight. Hans goes first. Follow the gallery down; Ruhmkorff lamps mark the way.", P[2], { fn: function () { VRN.ugGallery = true; d.cDown = 1; vrnSave(); } });
},
function (L) {
var lx = L.x - VRN_UG_X, U = VRN_UG;
if (lx < -3600 || lx > 3700)
return null;
if (!VRN.hansbach && Math.hypot(lx - U.spring.x, L.z - U.spring.z) < 10)
return { name: "Hans, with his ear to the rock", verb: "help him break into the wall", fn: function () { vrnHansbach(); } };
if (Math.hypot(lx - U.whisper.x, L.z - U.whisper.z) < 12)
return { name: "A long curved gallery", verb: "listen", fn: function () { worldCard(VRN_H + "👂 The whispering gallery</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>In the book Axel gets lost, alone in the dark, and then hears his uncle's voice, faint, through four miles of rock. They talk along the curved wall and time the echo: 40 seconds there and back, so 20 seconds one way; sound in air goes about 340 metres a second... 'Then you're less than seven kilometres off. Come down; you'll find us.' The same happens in the whispering gallery of St Paul's in London: a curved wall carries a whisper all the way round.</div>", {}); } };
return null;
},
function () {
VRN.hansbach = true;
if (VRN.ugStream)
VRN.ugStream.visible = true;
vrnData().cWater = 1;
vrnSave();
worldCard(VRN_H + "💧 The Hansbach</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>Three days without water: Axel can barely walk. Hans puts his ear to the rock, hears a stream behind it, and with his pick chips a hole... A jet of hot water bursts out, and a stream runs down the gallery beside you from then on, all the way to the sea. 'We'll call it the Hansbach,' says Axel. Rocks hold water deep down; springs come from it.</div>", {});
},
function () {
var C = VRN_UG.camp;
vrnMove(vrnRaftX(), C.z, Math.PI / 2, "🛶 <b>On the raft.</b> Hans has stepped a mast and a sail. Steer as you walk (the wind carries you east). Somewhere ahead: an island, and the far shore. The 🛬 button lands you on the nearest shore.", 1.4, { fn: function () {
VRN.ride = { k: "raft", keep: 1, g: VRN.ugRaft, off: function (q) { vrnRaftOff(q); } };
if (typeof rideSpeed !== "undefined")
rideSpeed = 2.4;
vrnRidePanel(true, [["🛬 Go ashore", function () { vrnRaftOff(); }]]);
} });
},
function (quiet) {
var R = VRN.ride;
if (!R || R.k !== "raft")
return;
VRN.ride = null;
vrnRidePanel(false);
if (typeof rideSpeed !== "undefined")
rideSpeed = 1;
var L = worldLocal(), best = null, bd = 1e9;
for (var a = 0; a < 24; a++)
for (var r = 10; r < 400; r += 15) {
var x = L.x + Math.cos(a / 24 * 6.28) * r, z = L.z + Math.sin(a / 24 * 6.28) * r;
if (vrnLand(x, z) > 0.8) {
if (r < bd) {
bd = r;
best = { x: x, z: z };
}
break;
}
}
if (!best) {
var C = VRN_UG.camp;
best = { x: VRN_UG_X + C.x, z: C.z };
}
VRN.ugRaft.position.set(Math.min(best.x + 8, L.x), 0.2, best.z);
if (!quiet)
vrnMove(best.x, best.z, yaw, "🛶 You jump ashore and haul the raft up.");
},
function (dt, L) {
var R = VRN.ride;
if (!R || R.k !== "raft")
return;
var lx = L.x - VRN_UG_X, U = VRN_UG;
if (vrnLand(L.x, L.z) < -0.5) {
camera.position.x += dt * 1.6;
}
camera.position.y = 1.4 + 1.72;
if (vrnLand(camera.position.x - VRN.base, L.z) > 0.6) {
camera.position.x -= dt * 1.6;
}
VRN.ugRaft.position.set(L.x, 0.2, L.z);
VRN.ugRaft.rotation.y = yaw + Math.PI;
VRN.ugRaft.position.y = 0.2 + Math.sin(VRN.t * 1.4) * (VRN.storm ? 0.45 : 0.12);
var d = vrnData();
if (!d.cSaur && Math.hypot(lx - U.saur.x, L.z - U.saur.z) < 260)
vrnSaurians();
var sd = Math.abs(lx - U.storm.x);
VRN.storm = sd < 450 && Math.abs(L.z - U.storm.z) < 1500;
if (VRN.storm && !VRN.stormSaid) {
VRN.stormSaid = 1;
setStatus("⛈️ <b>A storm.</b> Wind howls across the underground sea, the raft pitches, rain lashes down and the glowing air turns dark and heavy. Hold your course east!");
}
if (!VRN.storm && VRN.stormSaid === 1 && lx > U.storm.x + 450) {
VRN.stormSaid = 2;
setStatus("🌤️ The storm blows itself out. Ahead, a shore: forests of something pale and enormous...");
}
},
function () {
var d = vrnData();
d.cSaur = 1;
vrnSave();
var U = VRN_UG, X = VRN_UG_X;
var a = vrnCreature("seaserpent", 1.8, 3), b = vrnCreature("whale", 0.5, 4);
a.position.set(X + U.saur.x + 40, -2, U.saur.z);
b.position.set(X + U.saur.x + 60, -1, U.saur.z + 20);
VRN.G.add(a);
VRN.G.add(b);
VRN.fx.push({ k: "saur", a: a, b: b, x: X + U.saur.x + 50, z: U.saur.z + 10, t: 0 });
worldCard(VRN_H + "🦕 Sea monsters!</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>The sea heaves. An ichthyosaurus, a sea-lizard with a dolphin's shape and eyes like plates, and a plesiosaurus, a long neck on a turtle's body, rise out of the water and fight, rolling and lashing, a few hundred metres from the raft. Hans steers hard away. Steer clear and keep going east. (Both were real animals: ichthyosaurs and plesiosaurs swam in the seas of the dinosaurs' time; Mary Anning found some of the first fossils on the beach at Lyme Regis in England.)</div>", {});
},
function () {
var d = vrnData();
if (!d.cDown) {
setStatus("🪨 A great rock blocks the passage.");
return;
}
if (!VRN.ugRock.visible) {
vrnChimneyRide();
return;
}
worldCard(VRN_H + "🪨 Hans breaks the rock</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>Hans works at the rock for an hour, while you all stand well back on the raft. With a deep boom it breaks... and the ground behind it falls away. The sea pours into a huge hole and the raft is sucked in after it, down, down into the dark... and then the water stops falling, and begins to rise. They are in a volcano's chimney, and it is waking.</div>" + worldBtn("go", "Hold on to the raft", "Up the chimney, carried by the rising water and the heat"), { go: function () { VRN.ugRock.visible = false; vrnSolidOff(VRN.ugRockS); worldCard(null); vrnChimneyRide(); } });
},
function () {
var C = VRN_UG.chimney;
vrnMove(VRN_UG_X + C.x, C.z, 0, null, 4, { fn: function () {
VRN.chim = { t: 0 };
VRN.envOver = "under";
if (VRN.ride)
vrnRideOff(true);
setStatus("🔥 <b>Up the chimney!</b> The raft rides a column of warm water and steam up through the mountain; the walls glow dull red, far off. It's hot, very hot... hold on.");
} });
},
function (dt) {
var C = VRN.chim;
if (!C)
return;
C.t += dt;
var U = VRN_UG.chimney;
camera.position.set(VRN.base + VRN_UG_X + U.x, 4 + 1.72 + C.t * 16, U.z);
if (typeof flyY !== "undefined")
flyY = 0;
if (C.t > 9) {
VRN.chim = null;
VRN.envOver = null;
VRN.ugGallery = false;
var S = VRN_STROM;
vrnMove(S.x, S.z + S.r - 30, 0, "🌋 <b>Out into the sunlight!</b> Thrown out onto the slope of a volcano, scorched and bruised and alive, on an island with olive trees and a blue sea. 'Where are we?' 'Stromboli,' says a boy, 'in Italy.' They went in in Iceland and came out in the Mediterranean.", null, { fn: function () {
var d = vrnData();
d.cDone = 1;
vrnSave();
vrnReward("centre", "🌋 <b>To the centre of the earth, and out again.</b>");
vrnKeep("🌋", "Journey to the Centre of the Earth", "from Snaefells to Stromboli");
} });
}
},
function (x, z) {
var r = Math.hypot(x - VRN_RW.x, z - VRN_RW.z), off = r - VRN_RW.r, u = vrnRwU(x, z), L = VRN_LEGS[vrnRwLeg(u)], M = VRN_MODE[L.mode];
var n = wFbm(x / 90, z / 90, 91, 2), ports = VRN_LEGS.some(function (G) { var du = Math.abs(u - G.u); du = Math.min(du, 1 - du); return du * VRN_RW.r * 6.283 < 70; });
if (ports && Math.abs(off) < 140)
return 3;
if (M.sea)
return Math.abs(off) > M.lane + 200 ? 6 + n * 30 : -14 + n * 4;
return Math.abs(off) < 150 ? 3 + n * 2 : (Math.abs(off) < 400 ? 3 + n * 12 : -14);
},
function (G) {
var grp = new THREE.Group();
grp.name = "vrn-race";
G.add(grp);
var RW = VRN_RW;
var sea = new THREE.Mesh(new THREE.PlaneGeometry(RW.r * 2 + 1800, RW.r * 2 + 1800), vrnWaterMat(0x2E6A84));
sea.rotation.x = -Math.PI / 2;
sea.position.set(RW.x, 0, RW.z);
sea.userData.keep = 1;
grp.add(sea);
var segs = VRN.lite ? 240 : 480, rail = vrnMetal(0x4A4A4E), land = vrnC(0x8A9A5A), snow = vrnC(0xF2F4F6), jungle = vrnC(0x3A6A2A), sand = vrnC(0xD8C898);
for (var i = 0; i < segs; i++) {
var u = (i + 0.5) / segs, L = VRN_LEGS[vrnRwLeg(u)], M = VRN_MODE[L.mode], p = vrnRwPt(u), len = RW.r * Math.PI * 2 / segs + 1;
var port = VRN_LEGS.some(function (G) { var du = Math.abs(u - G.u); du = Math.min(du, 1 - du); return du * RW.r * 6.283 < 70; });
if (!M.sea || port) {
var w = port ? 280 : (M.sea ? 0 : 300), col = L.mode === "sledge" ? snow : L.mode === "elephant" ? jungle : port ? sand : land, s = vrnBoxM(w, 6, len, col, p.x, 0, p.z, grp);
s.rotation.y = -p.h;
}
if (L.mode === "train") {
[-0.75, 0.75].forEach(function (o) { var q = vrnRwPt(u, o), r = wBox(0.12, 0.15, len, rail, q.x, 3.1, q.z, grp); r.rotation.y = -p.h; });
}
if (M.sea && !port && i % 3 === 0) {
[-1, 1].forEach(function (sd) { var q = vrnRwPt(u, sd * (M.lane + 260 + ((i * 37) % 5) * 20)), c = vrnBoxM(300, 30 + ((i * 53) % 7) * 8, len * 3.2, vrnC(L.u > 0.3 && L.u < 0.6 ? 0x5A7A4A : 0xA89A7A), q.x, 0, q.z, grp); c.rotation.y = -p.h; });
}
}
VRN_LEGS.forEach(function (L) { var p = vrnRwPt(L.u, -40), s = vrnSign([L.from], 12, 2.6, p.x, 8, p.z, -p.h + Math.PI / 2, grp); for (var k = -2; k <= 2; k++) {
var q = vrnRwPt(L.u + k * 0.002, -30);
vrnLamp(grp, q.x, 3, q.z);
} });
for (var b = -6; b <= 6; b++) {
var q = vrnRwPt(VRN_DATELINE, b * 14);
wSph(1.2, vrnC(b % 2 ? 0xE8C83A : 0xC83A2A), q.x, 0.5, q.z, grp, 10);
}
var dl = vrnRwPt(VRN_DATELINE, -110);
vrnSign(["180°", "the date line"], 10, 3, dl.x, 8, dl.z, -dl.h + Math.PI / 2, grp);
VRN.rwObs = null;
VRN.rwGroup = grp;
VRN.districts.push({ g: grp, x: RW.x, z: RW.z, r: RW.r + 1200, far: 1 });
},
function () {
if (VRN.rwObsG) {
VRN.rwGroup.remove(VRN.rwObsG);
}
var g = new THREE.Group();
VRN.rwGroup.add(g);
VRN.rwObsG = g;
var R = wRand(vrnRwWeek()), list = [], RW = VRN_RW, rock = vrnSurf("stone", 0x5A5A50, 2), ice = vrnC(0xE8F4FA, { shine: 60, spec: 0xFFFFFF }), drift = vrnC(0xF8FAFC), wood = vrnSurf("wood", 0x5A3A22, 2);
VRN_LEGS.forEach(function (L) {
var M = VRN_MODE[L.mode];
if (!M.obs)
return;
var span = (L.to - L.u) * RW.r * 6.283, n = Math.floor(span / (M.sea ? 160 : 90));
for (var i = 1; i < n; i++) {
var u = L.u + (L.to - L.u) * (i / n), off = (R() * 2 - 1) * M.lane * 0.8, p = vrnRwPt(u, off), m, rad;
if (M.obs === "rock") {
var icy = L.u > 0.86;
rad = 7 + R() * 6;
m = icy ? wCone(rad, rad * 1.6, ice, p.x, rad * 0.5, p.z, g, 7) : vrnBoxM(rad * 1.6, rad, rad * 1.6, rock, p.x, 0, p.z, g);
}
else if (M.obs === "tree") {
rad = 2.4;
m = wCyl(0.8, 0.9, 16, wood, p.x, 3.8, p.z, g, 6);
m.rotation.set(Math.PI / 2, 0, p.h);
}
else {
rad = 4.5;
m = new THREE.Mesh(new THREE.SphereGeometry(4.5, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), drift);
m.scale.set(1.5, 0.5, 1);
m.position.set(p.x, 3, p.z);
g.add(m);
}
list.push({ u: u, off: off, r: rad, m: m });
}
});
VRN.rwObs = list;
},
function () {
var fns = {}, d = vrnData(), best = d.raceBest ? vrnDays(d.raceBest) : null;
var h = VRN_H + "🎩 The wager</div><div style='opacity:.9;margin:6px 0;line-height:1.5'><b>Phileas Fogg:</b> 'The world has grown smaller: one can go round it now in eighty days. I will wager twenty thousand pounds on it, against anyone. Will you take the same bet? A day passes every four and a half seconds; eighty days is six minutes. Steer round what lies in your way; stoke the engines, but mind the boilers; and choose well when trouble comes. Passepartout, my bag!'</div>" +
"<div style='opacity:.8;font-size:12px;line-height:1.45'><b>How to drive:</b> left and right (A/D, the arrows, or the stick) steer the ship, the elephant and the sledge; forward (W, or the stick pushed up) stokes the engine for more speed, but too long and the boiler overheats and you lose time. Hitting a reef, ice, a fallen tree or a drift costs you speed.</div>" +
(best ? "<div style='margin:6px 0'>Your best: <b>" + best + "</b></div>" : "") + "<div style='opacity:.75;font-size:12px'>" + vrnPayLine("race") + "</div>";
h += worldBtn("go", "🧳 Take the wager: start from London", "This week's course");
fns.go = function () { vrnRaceStart(); };
h += worldBtn("board", "📜 The race board", "This week's best and all time");
fns.board = function () { vrnRaceBoard(); };
h += worldBtn("talk", "💬 Talk with Mr Fogg", "");
fns.talk = function () { worldCard(null); var F = VRN_FOLK.fogg; wTalk({ name: F.name, persona: F.persona, greet: F.greet }); };
worldCard(h, fns);
},
function () {
worldCard(null);
if (!VRN.rwObs)
vrnRwCourse();
else
vrnRwCourse();
var p = vrnRwPt(0.002, 0);
vrnMove(p.x, p.z, 0, null, 9, { fn: function () {
VRN.run = { u: 0.002, off: 0, t: 0, pen: 0, leg: -1, sp: 0, heat: 0, slow: 0, paused: false, crossed: false, events: {}, veh: null, said: {} };
VRN.ride = { k: "race", keep: 1, off: function () { vrnRaceQuit(); } };
vrnRidePanel(true, [["⏹ Give up the wager", function () { vrnRaceQuit(); }]]);
vrnRaceHud(true);
setStatus("🎩 <b>Wednesday, the 2nd of October, 1872, 8:45 in the evening.</b> Fogg sets off from the Reform Club. The clock is running: go!");
} });
},
function (mode) {
var R = VRN.run;
if (R.veh && R.vehMode === mode)
return R.veh;
if (R.veh && R.veh.parent)
R.veh.parent.remove(R.veh);
var g;
if (mode === "steamer") {
g = new THREE.Group();
var s = vrnSteamerModel({ len: 50, beam: 8 });
s.rotation.y = Math.PI / 2;
g.add(s);
}
else if (mode === "train")
g = vrnTrainModel();
else if (mode === "elephant")
g = vrnElephantModel(1);
else if (mode === "sail") {
g = new THREE.Group();
var hull = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), vrnSurf("wood", 0x6A4A2A, 2));
hull.scale.set(2.4, 1.6, 8);
g.add(hull);
wCyl(0.12, 0.15, 11, vrnSurf("wood", 0x6A4A2A, 1), 0, 5.5, -1, g, 6);
wBox(0.04, 7, 5, vrnC(0xE8DCC0, { ds: true }), 0, 6, 1, g);
}
else {
g = new THREE.Group();
vrnBoxM(2.4, 0.5, 5, vrnSurf("wood", 0x7A5A3A, 2), 0, 0.4, 0, g);
[-1, 1].forEach(function (s) { wBox(0.12, 0.12, 6, vrnMetal(0x3A3A3A), s * 1.1, 0.06, 0, g); });
wCyl(0.08, 0.1, 7, vrnSurf("wood", 0x7A5A3A, 1), 0, 3.6, -1, g, 6);
wBox(0.04, 5, 3.4, vrnC(0xE8DCC0, { ds: true }), 0, 4.2, 0.6, g);
}
VRN.rwGroup.add(g);
R.veh = g;
R.vehMode = mode;
return g;
},
function () {
var f = 0, s = 0;
if (typeof keys !== "undefined" && keys) {
if (keys["KeyW"] || keys["ArrowUp"])
f += 1;
if (keys["KeyS"] || keys["ArrowDown"])
f -= 1;
if (keys["KeyA"] || keys["ArrowLeft"])
s -= 1;
if (keys["KeyD"] || keys["ArrowRight"])
s += 1;
}
if (!f && !s && typeof joyInput === "function") {
var j = joyInput() || (typeof padInput === "function" ? padInput() : null);
if (j) {
f = j.f;
s = j.s;
}
}
return { f: f, s: s };
},
function (dt) {
var R = VRN.run;
if (!R)
return;
if (R.paused && !(WLD.card && WLD.card.style.display === "block")) {
var pk = R.pick;
R.pick = null;
if (pk)
pk();
else
R.paused = false;
}
if (R.paused || VRN.moving)
return;
R.t += dt;
var li = vrnRwLeg(R.u), L = VRN_LEGS[li], M = VRN_MODE[L.mode], I = vrnRaceInput();
if (li !== R.leg) {
R.leg = li;
vrnRaceVehicle(L.mode);
if (li > 0 && vrnRaceEvent(li))
return;
setStatus("🧭 <b>" + esc(L.name) + ".</b> In the book Fogg is here on day " + L.day + ".");
}
var stoke = I.f > 0.2 && L.mode !== "elephant";
if (R.over > 0) {
R.over -= dt;
stoke = false;
}
R.heat = Math.max(0, Math.min(1, R.heat + (stoke ? dt * 0.22 : -dt * 0.18)));
if (R.heat >= 1 && !(R.over > 0)) {
R.over = 4;
R.heat = 0.7;
setStatus("💨 <b>The boiler's too hot!</b> The engineer eases off the steam for a few seconds.");
}
var sp = M.sp * (stoke ? 1.35 : 1) * (R.over > 0 ? 0.45 : 1) * (I.f < -0.2 ? 0.6 : 1);
if (R.slow > 0) {
R.slow -= dt;
sp *= 0.35;
}
if (M.lane) {
R.off = Math.max(-M.lane, Math.min(M.lane, R.off + I.s * dt * (L.mode === "elephant" ? 10 : 22)));
}
else
R.off *= 0.9;
var du = sp * dt / (VRN_RW.r * Math.PI * 2);
R.u += du;
if (VRN.rwObs && R.slow <= 0)
for (var i = 0; i < VRN.rwObs.length; i++) {
var O = VRN.rwObs[i];
if (Math.abs(O.u - R.u) * VRN_RW.r * 6.283 < O.r + 3 && Math.abs(O.off - R.off) < O.r + 3) {
R.slow = 1.6;
if (typeof playTone === "function")
playTone(90, 0.25);
setStatus(L.mode === "sledge" ? "❄️ <b>Into a drift!</b> Snow everywhere; the sledge wallows." : L.mode === "elephant" ? "🌳 <b>A fallen tree!</b> Kiouni has to pick her way round." : "🪨 <b>Scraped!</b> The hull grinds on " + (R.u > 0.86 ? "ice" : "a reef") + ".");
break;
}
}
if (!R.crossed && R.u >= VRN_DATELINE) {
R.crossed = true;
setStatus("🌐 You cross the 180th meridian, the date line, heading east. Nobody on board notices anything. (Remember this.)");
}
var p = vrnRwPt(R.u, R.off), ah = p.h + Math.PI / 2;
R.veh.position.set(p.x, M.sea ? 0.2 : 3, p.z);
R.veh.rotation.y = Math.PI - p.h;
var bk = M.back || (M.sea ? 18 : 8);
camera.position.set(VRN.base + p.x - Math.cos(ah) * bk, (M.sea ? 0 : 3) + M.eye + 1.72, p.z - Math.sin(ah) * bk);
if (typeof flyY !== "undefined")
flyY = 0;
yaw = Math.PI - p.h;
if (typeof pitch !== "undefined")
pitch = M.pitch || -0.08;
vrnRaceHud(true);
if (R.u >= 1)
vrnRaceFinish();
},
function (li) {
var R = VRN.run, L = VRN_LEGS[li], fns = {}, h = null;
function card(title, text, opts) { R.paused = true; var hh = VRN_H + title + "</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>" + text + "</div>"; opts.forEach(function (o, i) { hh += worldBtn("o" + i, o[0], o[1]); fns["o" + i] = function () { worldCard(null); R.pick = null; R.paused = false; if (o[2])
o[2](); }; }); R.pick = fns.o0; worldCard(hh, fns); return true; }
if (L.from === "Kholby")
return card("🐘 The line isn't finished!", "At Kholby the train stops: the railway won't be finished for another fifty miles, though the papers said it was. A Parsee guide has an elephant, Kiouni, for sale: two thousand pounds. On the way, at a temple in the jungle, Passepartout hears that a young widow, Aouda, is to be burned with her husband's body.", [["Buy Kiouni, and save Aouda on the way", "A rough ride through the jungle (it costs half a day to rescue her)", function () { R.pen += 0.5 * VRN_DAY; setStatus("🐘 Passepartout dresses as the dead raja, sits up on the pyre, and carries Aouda off. Fogg doesn't blink. Off through the jungle!"); }], ["Wait for the railway to be finished", "Three days lost", function () { R.pen += 3 * VRN_DAY; R.u = VRN_LEGS[li].to + 0.0005; setStatus("⏳ Three days, waiting at Kholby. The line opens at last."); }]]);
if (L.from === "Hong Kong")
return card("🚢 The Carnatic has sailed!", "Fix the detective, sure Fogg is a bank robber, got Passepartout drunk in an opium house to stop him telling Fogg the Carnatic was leaving early. She has sailed. Fogg is calm as ever.", [["Hire the pilot boat Tankadère", "A little sailing boat, through a typhoon: fast, but you must steer", function () { setStatus("⛵ <b>The Tankadère</b> runs before the wind. A typhoon is coming: keep her off the rocks!"); }], ["Wait for the next steamer", "Six days lost", function () { R.pen += 6 * VRN_DAY; R.u = VRN_LEGS[li].to + 0.0005; }]]);
if (L.from === "San Francisco")
return card("🚂 Across America", "The Pacific Railroad runs over the Rockies and the plains. At Medicine Bow the bridge is shaky: the driver says that if he goes full speed, the train will skim over before it falls. Then, near Fort Kearney, the Sioux attack the train and carry off Passepartout and two others.", [["Full speed over the bridge, and Fogg goes after Passepartout", "The bridge holds (just). Rescuing your friends costs a day", function () { R.pen += 1 * VRN_DAY; R.heat = 0.9; setStatus("🌉 Over the bridge at full steam, and it falls into the river behind you. Fogg and the soldiers bring Passepartout back. The train has gone on... but a man named Mudge has a sledge with a sail."); }], ["Wait for the bridge to be mended, then go after him", "Two days lost", function () { R.pen += 2 * VRN_DAY; }]]);
if (L.from === "New York")
return card("⛴️ The China has sailed!", "Forty-five minutes late in New York: the Liverpool steamer has gone. Fogg goes aboard the Henrietta, a small steamer bound for Bordeaux, takes her over with money, and steers for Liverpool. Halfway across the Atlantic the coal runs out.", [["Buy the ship and burn her woodwork", "Masts, cabins, deck: all into the furnaces. Stoke hard!", function () { setStatus("🔥 Fogg buys the Henrietta from her furious captain and the crew burn her timber to keep steaming. Stoke the engine!"); R.heat = 0; }], ["Make for Bordeaux instead", "Two days lost", function () { R.pen += 2 * VRN_DAY; }]]);
if (L.from === "Liverpool")
return card("👮 Arrested!", "At Liverpool, Fix arrests Fogg for the robbery of the Bank of England. Hours later the real thief is found: Fix has made a terrible mistake. Fogg knocks him down, and runs for a special train to London.", [["Run for the special train", "Five hours lost to the arrest", function () { R.pen += 5 / 24 * VRN_DAY; }]]);
return false;
},
function () {
var R = VRN.run;
VRN.run = null;
VRN.ride = null;
vrnRidePanel(false);
vrnRaceHud(false);
if (R.veh && R.veh.parent)
R.veh.parent.remove(R.veh);
var raw = (R.t * 1000) + R.pen * 1000, shown = raw, real = raw - (R.crossed ? VRN_DAY * 1000 : 0), d = vrnData(), won = real < 80 * VRN_DAY * 1000;
var A = VRN_SPOTS.reform;
var h = VRN_H + "🕰️ London, the Reform Club</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>By your diary: <b>" + vrnDays(shown) + "</b>. " + (shown > 80 * VRN_DAY * 1000 ? "Late! You've lost the wager... " : "") + "</div>";
if (R.crossed)
h += "<div style='opacity:.9;margin:6px 0;line-height:1.5'>...and then Passepartout comes running: 'Master! It's not Sunday, it's <b>Saturday</b>!' Going east round the world, you went to meet the Sun: each day was a little shorter than twenty-four hours, and all together they added up to <b>one whole day</b>. Crossing the date line, the calendar takes that day back. So your true time is <b>" + vrnDays(real) + "</b>.</div>";
h += "<div style='margin:6px 0;font-size:16px'>" + (won ? "🏆 <b>You've won the wager!</b>" : "Over eighty days: the wager is lost. But you've been round the world!") + "</div>";
worldCard(h, {});
setStatus(won ? "🎩 'Gentlemen, here I am.' The Reform Club erupts." : "🎩 So close. Try again any time.");
if (!d.raceBest || real < d.raceBest) {
d.raceBest = Math.round(real);
vrnSave();
}
vrnRacePost(Math.round(real));
if (won) {
vrnReward("race", "🎩 <b>Round the world in under eighty days.</b>");
vrnKeep("🎩", "Around the World in Eighty Days", vrnDays(real));
}
vrnMove(A.x, A.z, 0, null);
},
function (on) {
var el = document.getElementById("vrn-race-hud");
if (!on) {
if (el)
el.remove();
return;
}
if (!el) {
el = document.createElement("div");
el.id = "vrn-race-hud";
el.style.cssText = "position:fixed;top:58px;left:50%;transform:translateX(-50%);z-index:44;background:rgba(20,16,10,.82);color:#FFE7B0;border:1px solid #8A6A3A;border-radius:10px;padding:6px 12px;font:600 14px Georgia,serif;text-align:center;pointer-events:none;min-width:220px";
document.body.appendChild(el);
}
var tp = vrnBelowBanner(58) + (document.getElementById("vrn-ride") && document.getElementById("vrn-ride").style.display === "flex" ? 44 : 0);
if (el.dataset.tp !== String(tp)) {
el.dataset.tp = tp;
el.style.top = tp + "px";
}
var R = VRN.run;
if (!R)
return;
var days = (R.t + R.pen) / VRN_DAY, L = VRN_LEGS[vrnRwLeg(R.u)];
el.innerHTML = "Day <b>" + Math.floor(days) + "</b> of 80 · " + esc(L.from) + " → " + esc(VRN_LEGS[(vrnRwLeg(R.u) + 1) % VRN_LEGS.length].from) +
"<div style='height:6px;background:#3A2A1A;border-radius:3px;margin-top:4px;overflow:hidden'><div style='height:100%;width:" + Math.round(R.heat * 100) + "%;background:" + (R.heat > 0.8 ? "#C8402A" : "#C8A040") + "'></div></div><div style='font-size:10px;opacity:.75'>boiler</div>";
},
function () {
var h = VRN_H + "📜 The race board</div><div id='vrn-board' style='margin:6px 0;opacity:.85'>Fetching the times...</div>";
worldCard(h, {});
try {
Promise.all([sb.rpc("verne_race_board", { p_week: vrnRwWeek() }), sb.rpc("verne_race_board", { p_week: 0 })]).then(function (rs) {
var el = document.getElementById("vrn-board");
if (!el)
return;
function list(r, t) { var rows = (r && r.data) || []; return "<div style='font-weight:600;margin-top:6px'>" + t + "</div>" + (rows.length ? rows.map(function (x, i) { return "<div>" + (i + 1) + ". " + esc(x.name || "A dreamer") + " · " + vrnDays(x.ms) + "</div>"; }).join("") : "<div style='opacity:.7'>No times yet. Be the first!</div>"); }
el.innerHTML = list(rs[0], "This week") + list(rs[1], "All time");
}, function () { var el = document.getElementById("vrn-board"); if (el)
el.textContent = "The board can't be reached just now."; });
}
catch (e) { }
},
function (G) {
var grp = new THREE.Group();
grp.name = "vrn-stone";
G.add(grp);
var S = VRN_STONE, y = S.y, stone = vrnSurf("stone", 0xC8C0B0, 3), iron = vrnMetal(0x2A2A2E), brick = vrnSurf("brick", 0x9A4A32, 2);
var collar = new THREE.Mesh(new THREE.TorusGeometry(10, 3, 10, VRN.lite ? 20 : 40), stone);
collar.rotation.x = Math.PI / 2;
collar.position.set(S.x, y + 1, S.z);
grp.add(collar);
var mouth = new THREE.Mesh(new THREE.CircleGeometry(8.4, VRN.lite ? 20 : 40), vrnC(0x050505));
mouth.rotation.x = -Math.PI / 2;
mouth.position.set(S.x, y + 0.6, S.z);
grp.add(mouth);
vrnSolid({ x: S.x, z: S.z, r: 12 });
var n = VRN.lite ? 12 : 24;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, x = S.x + Math.cos(a) * 120, z = S.z + Math.sin(a) * 120;
wCyl(2.4, 3, 7, brick, x, y + 3.5, z, grp, 8);
wCyl(0.8, 1, 10, brick, x, y + 12, z, grp, 8);
vrnSolid({ x: x, z: z, r: 3 });
}
for (var s = 0; s < 4; s++) {
var sa = s / 4 * Math.PI * 2 + 0.4, sx = S.x + Math.cos(sa) * 250, sz = S.z + Math.sin(sa) * 250, st = new THREE.Group();
st.position.set(sx, y, sz);
st.rotation.y = -sa + Math.PI / 2;
grp.add(st);
for (var r = 0; r < 5; r++)
vrnBoxM(60, 0.8, 2, vrnSurf("wood", 0x8A6A4A, 2), 0, 0.4 + r * 0.9, r * 2, st);
vrnSolid({ x: sx, z: sz, r: 30, h: 5 });
}
var sh = vrnShellModel(1.2);
sh.position.set(S.x + 30, y, S.z + 20);
grp.add(sh);
VRN.stoneShell = sh;
vrnPerson(grp, "barbicane", S.x + 26, S.z + 28, Math.PI, { y: y, fn: function () { vrnMoonCard(); } });
vrnPerson(grp, "ardan", S.x + 34, S.z + 28, Math.PI, { y: y });
vrnPerson(grp, "maston", S.x + 20, S.z + 30, Math.PI, { y: y });
vrnSpot(S.x + 30, S.z + 24, 6, "The projectile, and President Barbicane", "climb aboard", function () { vrnMoonCard(); }, y);
var sp = new THREE.Group();
sp.name = "vrn-space";
sp.userData.dist = 1;
G.add(sp);
var P = VRN_SPACE, earth = new THREE.Mesh(new THREE.SphereGeometry(420, VRN.lite ? 24 : 48, VRN.lite ? 16 : 32), vrnPlanetMat("earth"));
earth.position.set(P.x, P.y - 900, P.z + 600);
sp.add(earth);
VRN.spEarth = earth;
var moon = new THREE.Mesh(new THREE.SphereGeometry(260, VRN.lite ? 24 : 48, VRN.lite ? 16 : 32), vrnPlanetMat("moon"));
moon.position.set(P.x, P.y + 200, P.z - 3000);
sp.add(moon);
VRN.spMoon = moon;
VRN.districts.push({ g: grp, x: S.x, z: S.z, r: 1600 });
VRN.spGroup = [sp];
},
function (k) {
return wTex(512, 256, function (c, w, h) {
var R = wRand(k === "earth" ? 3 : 5);
if (k === "earth") {
c.fillStyle = "#1E4A8A";
c.fillRect(0, 0, w, h);
for (var i = 0; i < 26; i++) {
c.fillStyle = R() < 0.5 ? "#4A7A3A" : "#A89A5A";
c.beginPath();
c.ellipse(R() * w, h * 0.15 + R() * h * 0.7, 20 + R() * 60, 10 + R() * 35, R() * 3, 0, 7);
c.fill();
}
c.fillStyle = "rgba(255,255,255,.55)";
for (var j = 0; j < 40; j++) {
c.beginPath();
c.ellipse(R() * w, R() * h, 20 + R() * 50, 4 + R() * 8, 0, 0, 7);
c.fill();
}
c.fillStyle = "#F2F4F8";
c.fillRect(0, 0, w, 10);
c.fillRect(0, h - 12, w, 12);
}
else {
c.fillStyle = "#9A9A96";
c.fillRect(0, 0, w, h);
for (var m = 0; m < 10; m++) {
c.fillStyle = "#6A6A68";
c.beginPath();
c.ellipse(R() * w, R() * h, 20 + R() * 50, 15 + R() * 30, R() * 3, 0, 7);
c.fill();
}
for (var cr = 0; cr < 140; cr++) {
var x = R() * w, y = R() * h, r = 1 + R() * 8;
c.strokeStyle = "rgba(60,60,58,.6)";
c.beginPath();
c.arc(x, y, r, 0, 7);
c.stroke();
}
}
});
},
function () {
var Q = [["To leave the Earth for good, how fast must the shell go when it leaves the gun?", ["About 1 kilometre a second", "About 11 kilometres a second", "About 300,000 kilometres a second"], 1, "About 11 km a second: escape speed. Barbicane's figure was 12,000 yards a second. Anything slower falls back. (300,000 km/s is the speed of light.)"],
["Why fire from Florida, and not from Maine?", ["Florida is closer to the Moon", "Only south of 28 degrees north does the Moon pass straight overhead", "It's warmer for the crowd"], 1, "The Moon only climbs to straight overhead from places between 28 degrees north and 28 south. Florida is far enough south; Maine isn't. Real rockets launch from Florida too (the Earth's spin helps more there)."],
["How long does the voyage take, in the book?", ["About four days", "About four months", "About four minutes"], 0, "97 hours and 13 minutes, Barbicane works out: about four days. The real Apollo 11 took about 76 hours to reach the Moon in 1969, and splashed down in the Pacific, as Verne's shell does."]];
var i = 0, d = vrnData();
function ask() {
if (i >= Q.length) {
d.gunSums = 1;
vrnSave();
worldCard(VRN_H + "🧮 'Perfectly calculated!'</div><div style='opacity:.9;margin:6px 0;line-height:1.5'><b>Barbicane:</b> 'You have a head for this. The Columbiad is cast at Stone's Hill in Florida, nine hundred feet deep; the shell waits there. Take the train east whenever you are ready.'</div>", {});
return;
}
var q = Q[i], fns = {}, h = VRN_H + "🧮 The Gun Club's sums (" + (i + 1) + " of 3)</div><div style='opacity:.9;margin:6px 0'>" + esc(q[0]) + "</div>";
q[1].forEach(function (o, k) { h += worldBtn("o" + k, o, ""); fns["o" + k] = function () { if (k !== q[2]) {
setStatus("🧮 'Hmm. Try again.'");
return;
} worldCard(VRN_H + "✓</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>" + esc(q[3]) + "</div>" + worldBtn("n", "Next", ""), { n: function () { i++; ask(); } }); }; });
worldCard(h, fns);
}
ask();
},
function () {
var d = vrnData(), fns = {}, h = VRN_H + "🌕 The projectile</div><div style='opacity:.9;margin:6px 0;line-height:1.5'><b>Barbicane:</b> 'A hollow shell of aluminium, nine feet across, with a floor on springs and water buffers to soften the shock, windows of thick glass, gas for light and heat, food for a year. Michel Ardan, Captain Nicholl and I go. Will you come?'</div><div style='opacity:.75;font-size:12px'>" + vrnPayLine("moon") + "</div>";
if (!d.gunSums) {
h += "<div style='opacity:.85'>First, the Gun Club in the harbour will want to see you can do the sums.</div>";
worldCard(h, {});
return;
}
h += worldBtn("go", "🚀 Climb in: fire the Columbiad", "About a minute and a half of voyage");
fns.go = function () { vrnMoonGo(); };
worldCard(h, fns);
},
function () {
worldCard(null);
var S = VRN_STONE;
VRN.moon = { t: 0, ph: "up" };
VRN.envOver = null;
vrnMove(S.x, S.z, 0, "🚀 <b>Ten... nine...</b> You lie on the springy floor. A deep, deep rumble under you, a great soft push, and...", S.y - 30, { fn: function () { VRN.moon = { t: 0, ph: "up" }; if (typeof playTone === "function")
playTone(40, 1.4); VRN.smokers.push({ x: S.x, y: S.y + 4, z: S.z, r: 30, dark: 0, big: 1, t: 40 }); } });
},
function (dt) {
var M = VRN.moon;
if (!M)
return;
M.t += dt;
var S = VRN_STONE, P = VRN_SPACE;
VRN_MOON_SAY.forEach(function (s) { if (!M["s" + s[0]] && M.t >= s[0]) {
M["s" + s[0]] = 1;
setStatus(s[1]);
} });
if (M.ph === "up") {
var y = S.y - 28 + Math.pow(M.t, 2.2) * 40;
camera.position.set(VRN.base + S.x, y, S.z);
pitch = Math.max(pitch, 0.6);
if (typeof flyY !== "undefined")
flyY = 0;
if (M.t > 4.5) {
M.ph = "space";
var v = vrnVeil();
v.style.opacity = "1";
setTimeout(function () { v.style.opacity = "0"; }, 500);
}
return;
}
if (M.ph === "space") {
var t = (M.t - 4.5) / 66, a = t * Math.PI * 2 * 0.9, mz = VRN.spMoon.position.z, my = VRN.spMoon.position.y;
var x, yy, z, E0 = { x: P.x, y: P.y, z: P.z }, M0 = { x: P.x, y: my, z: mz + 500 }, E1 = { x: P.x, y: P.y - 900 + 480, z: P.z + 600 };
if (t < 0.45) {
var k = t / 0.45;
x = E0.x;
yy = E0.y + (M0.y - E0.y) * k;
z = E0.z + (M0.z - E0.z) * k;
}
else if (t < 0.8) {
var ang = (t - 0.45) / 0.35 * Math.PI * 2;
x = P.x + Math.sin(ang) * 520;
yy = my;
z = mz + Math.cos(ang) * 500;
}
else {
var k3 = Math.min(1, (t - 0.8) / 0.2);
x = M0.x;
yy = M0.y + (E1.y - M0.y) * k3;
z = M0.z + (E1.z - M0.z) * k3;
}
camera.position.set(VRN.base + x, yy, z);
if (typeof flyY !== "undefined")
flyY = 0;
if (!M.free) {
var T = t < 0.8 ? { x: P.x, y: my, z: mz } : VRN.spEarth.position, dx = T.x - x, dy = T.y - yy, dz = T.z - z, ty = Math.atan2(-dx, -dz), tp = Math.atan2(dy, Math.hypot(dx, dz)), k2 = Math.min(1, dt * 2.5);
yaw += Math.atan2(Math.sin(ty - yaw), Math.cos(ty - yaw)) * k2;
pitch += (tp - pitch) * k2;
}
if (M.t > 76) {
VRN.moon = null;
vrnMoonHome();
}
}
},
function () {
var A = VRN_SPOTS.arrive;
vrnMove(A.x, A.z, Math.PI, "⚓ The Susquehanna brings you back to the Quay of the Voyages. The Gun Club holds a dinner in your honour.", null, { fn: function () { vrnReward("moon", "🌕 <b>From the Earth to the Moon, and round it.</b>"); vrnKeep("🌕", "Round the Moon", "in the Gun Club's shell"); } });
},
function () {
var fns = {}, h = VRN_H + "🎈 The Victoria</div><div style='opacity:.9;margin:6px 0;line-height:1.5'><b>Dr Samuel Fergusson:</b> 'Most balloons throw out sand to rise and let out gas to sink, and soon run out of both. Mine heats the gas with a burner: hotter, it swells and lifts; cooler, it sinks. So I can go up and down all day and look for the wind I want. We start at Zanzibar and cross Africa to the Senegal river, in the west. Joe, Dick, aboard!'</div>" +
"<div style='opacity:.8;font-size:12px;line-height:1.45'><b>How to fly:</b> forward (W, or the stick up) heats: you rise. Back (S, or the stick down) cools: you sink. The wind does the rest, and it blows a different way at each height: watch the streaks and find the one going <b>west</b>.</div><div style='opacity:.75;font-size:12px'>" + vrnPayLine("balloon") + "</div>";
h += worldBtn("go", "🎈 Cast off from Zanzibar", "Fly west across Africa to the Senegal");
fns.go = function () { vrnBalloonGo(); };
h += worldBtn("free", "🎈 Just go up over the harbour", "A gentle flight, no goal");
fns.free = function () { vrnBalloonGo(true); };
worldCard(h, fns);
},
function (free) {
worldCard(null);
var Z = free ? { x: VRN_HB.victoria.x, z: VRN_HB.victoria.z } : VRN_SPOTS.zanzibar;
vrnMove(Z.x, Z.z, Math.PI / 2, free ? "🎈 Up you go, over the harbour. Heat to rise, cool to sink; the 🛬 button brings you down." : "🎈 <b>Zanzibar, April 1862.</b> The ropes are cast off and the Victoria rises over the island and its dhows. Westward, three thousand miles of Africa.", null, { fn: function () {
var g = vrnBalloonModel();
g.userData.keep = 1;
VRN.G.add(g);
var L = worldLocal();
VRN.bal = { g: g, free: !!free, x: L.x, z: L.z, y: vrnLand(L.x, L.z) + 2, vy: 0, heat: 0.45, t: 0, seen: {} };
VRN.ride = { k: "balloon", keep: 1, off: function (q) { vrnBalloonOff(q); } };
vrnRidePanel(true, [["🛬 Bring her down", function () { vrnBalloonOff(); }]]);
if (VRN.fieldBalloon)
VRN.fieldBalloon.visible = false;
vrnWindStreaks(true);
} });
},
function (dt, L) {
var B = VRN.bal;
if (!B)
return;
B.t += dt;
var I = vrnRaceInput();
B.heat = Math.max(0, Math.min(1, B.heat + I.f * dt * 0.25));
var lift = (B.heat - 0.45) * 6;
B.vy += (lift - B.vy) * Math.min(1, dt * 0.6);
B.y += B.vy * dt;
var gnd = Math.max(vrnLand(B.x, B.z), 0) + 2;
if (B.y < gnd) {
B.y = gnd;
B.vy = Math.max(0, B.vy);
}
B.y = Math.min(B.y, 1900);
var W = vrnWindAt(B.y - Math.max(0, vrnLand(B.x, B.z))), sp = B.free ? 3 : 9;
B.x += W.dx * sp * dt;
B.z += W.dz * sp * dt;
if (B.free) {
B.x = Math.max(-1500, Math.min(1800, B.x));
B.z = Math.max(-1500, Math.min(800, B.z));
}
else {
B.x = Math.max(VRN_AFR.x0 + 20, Math.min(VRN_AFR.x1 - 20, B.x));
B.z = Math.max(VRN_AFR.z0 + 60, Math.min(VRN_AFR.z1 - 60, B.z));
}
B.g.position.set(B.x, B.y - 1, B.z);
camera.position.set(VRN.base + B.x, B.y + 0.7, B.z);
if (typeof flyY !== "undefined")
flyY = 0;
if (!B.free) {
var A = VRN_AF;
[["lake", A.lake, 700], ["moon", A.moon, 800], ["chad", A.chad, 600], ["falls", A.falls, 500]].forEach(function (s) { if (!B.seen[s[0]] && Math.hypot(B.x - s[1].x, B.z - s[1].z) < s[2]) {
B.seen[s[0]] = 1;
setStatus(VRN_BAL_SEE.filter(function (v) { return v[0] === s[0]; })[0][1]);
} });
if (!B.seen.sahara && B.z < -1600) {
B.seen.sahara = 1;
setStatus(VRN_BAL_SEE[3][1]);
}
if (B.x < 5900 && Math.abs(B.z - A.falls.z) < 1200) {
vrnBalloonWin();
}
}
},
function () {
var B = VRN.bal;
vrnBalloonOff(true);
worldCard(VRN_H + "🎈 Across Africa!</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>Over the Senegal, with the balloon sagging and warriors on the bank behind, Fergusson cuts the last of the basket away and the Victoria lifts just enough to cross. On the far bank, French soldiers welcome them. Five weeks and three thousand miles. In 1863, when Verne wrote this, the middle of Africa was still blank on European maps.</div>", {});
vrnReward("balloon", "🎈 <b>Five weeks in a balloon: across Africa.</b>");
vrnKeep("🎈", "Five Weeks in a Balloon", "Zanzibar to the Senegal");
},
function (quiet) {
var B = VRN.bal;
VRN.bal = null;
if (VRN.ride && VRN.ride.k === "balloon") {
VRN.ride = null;
vrnRidePanel(false);
}
vrnWindStreaks(false);
if (VRN.fieldBalloon)
VRN.fieldBalloon.visible = true;
if (B && B.g.parent)
B.g.parent.remove(B.g);
var F = VRN_HB.victoria;
if (B && !B.free && quiet)
return vrnMove(F.x + 20, F.z, Math.PI / 2, null);
vrnMove(F.x + 20, F.z, Math.PI / 2, quiet ? null : "🎈 The Victoria settles back on the balloon field.");
},
function (on) {
if (VRN.streaks) {
VRN.G.remove(VRN.streaks);
VRN.streaks = null;
}
if (!on)
return;
var n = VRN.lite ? 40 : 90, g = new THREE.BufferGeometry(), p = new Float32Array(n * 6);
g.setAttribute("position", new THREE.BufferAttribute(p, 3));
VRN.streaks = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.35 }));
VRN.streaks.frustumCulled = false;
VRN.G.add(VRN.streaks);
VRN.streaks.userData.seed = Array.from({ length: n }, function () { return [Math.random(), Math.random(), Math.random()]; });
},
function (dt) {
var S = VRN.streaks, B = VRN.bal;
if (!S || !B)
return;
var p = S.geometry.attributes.position.array, sd = S.userData.seed;
for (var i = 0; i < sd.length; i++) {
var s = sd[i];
s[0] = (s[0] + dt * 0.08) % 1;
var ry = B.y + (s[1] - 0.5) * 700, gy = Math.max(0, vrnLand(B.x, B.z)), W = vrnWindAt(ry - gy), r = 60 + s[2] * 240, a = s[2] * 40 + s[1] * 7;
var cx = B.x + Math.cos(a) * r + W.dx * (s[0] - 0.5) * 120, cz = B.z + Math.sin(a) * r + W.dz * (s[0] - 0.5) * 120;
p[i * 6] = cx;
p[i * 6 + 1] = ry;
p[i * 6 + 2] = cz;
p[i * 6 + 3] = cx + W.dx * 14;
p[i * 6 + 4] = ry;
p[i * 6 + 5] = cz + W.dz * 14;
}
S.geometry.attributes.position.needsUpdate = true;
},
function () {
worldCard(null);
var M = VRN_HB.mast;
vrnMove(M.x + 8, M.z, Math.PI / 2, "🚁 <b>Aboard the Albatross.</b> Robur the Conqueror gives you the bridge. Thirty-seven lifting screws hum overhead. Steer as you walk; climb and dive as you fly. 'Heavier than air, gentlemen. The future!' The 🛬 button brings her back to the mast.", 76, { fn: function () {
var g = vrnAlbatrossModel();
g.userData.keep = 1;
VRN.G.add(g);
if (VRN.mastAlbatross)
VRN.mastAlbatross.visible = false;
VRN.ride = { k: "albatross", keep: 1, g: g, prevFly: typeof canFly !== "undefined" ? canFly : false, off: function (q) { vrnAlbatrossOff(q); } };
if (typeof canFly !== "undefined")
canFly = true;
if (typeof rideSpeed !== "undefined")
rideSpeed = 6;
if (typeof flyY !== "undefined")
flyY = 74;
vrnRidePanel(true, [["🛬 Back to the mast", function () { vrnAlbatrossOff(); }]]);
} });
},
function (quiet) {
var R = VRN.ride;
if (!R || R.k !== "albatross")
return;
VRN.ride = null;
vrnRidePanel(false);
if (R.g && R.g.parent)
R.g.parent.remove(R.g);
if (VRN.mastAlbatross)
VRN.mastAlbatross.visible = true;
if (typeof canFly !== "undefined")
canFly = R.prevFly;
if (typeof rideSpeed !== "undefined")
rideSpeed = 1;
if (!quiet) {
var M = VRN_HB.mast;
vrnMove(M.x + 8, M.z, Math.PI / 2, "🚁 The Albatross moors at Robur's mast and you climb down the ladder.");
}
},
function (dt, L) {
var R = VRN.ride;
if (!R || R.k !== "albatross")
return;
var g = R.g;
if (camera.position.y < vrnLand(L.x, L.z) + 16)
camera.position.y = Math.max(vrnLand(L.x, L.z), 0) + 16;
L.x = Math.max(VRN_BOUND.x0 + 40, Math.min(VRN_AFR.x1 - 40, L.x));
g.position.set(L.x - Math.sin(yaw) * 10, camera.position.y - 12.4, L.z - Math.cos(yaw) * 10);
g.rotation.y = yaw;
if (g.userData.rotors)
g.userData.rotors.forEach(function (r) { r.rotation.y += dt * 14; });
if (g.userData.props)
g.userData.props.forEach(function (r) { r.rotation.z += dt * 10; });
},
function (kind) {
var P = VRN_PAY[kind], R = VRN.rules && VRN.rules[kind], gold = R && R.gold !== undefined ? R.gold : (P ? P[1] : 0);
if (R && R.on === false)
return "This one is closed by the Keeper just now.";
return "Grown-up dreamers who pay their dues get <b>" + gold + " gold</b> for this, once a day (150 a day at most in this world), and a keepsake for the 🎒 Backpack.";
},
function (kind, say) {
var K = VRN_KEEP[kind];
if (K)
vrnKeep(K[2], K[1], VRN_PAY[kind] ? VRN_PAY[kind][0] : "");
var d = vrnData();
d.done = d.done || {};
d.done[kind] = (d.done[kind] || 0) + 1;
vrnSave();
if (VRN.busy) {
setStatus(say);
return;
}
VRN.busy = true;
var p = (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()) ? cityRpc("verne_done", { p_kind: kind }) : Promise.resolve(null);
p.then(function (o) { VRN.busy = false; setStatus(say + (K ? " <b>" + esc(K[2] + " " + K[1]) + "</b> is in your 🎒 Backpack." : "") + (o && o.say ? " " + esc(o.say) : "") + (o && o.gold ? " <b>+" + o.gold + " gold</b> from the Treasury." : "")); })
.catch(function () { VRN.busy = false; setStatus(say + (K ? " <b>" + esc(K[2] + " " + K[1]) + "</b> is in your 🎒 Backpack." : "")); });
},
function () {
var fns = {}, h = VRN_H + "📚 The Library of the Voyages</div><div style='opacity:.85;margin:4px 0 6px'>The fifty-four Extraordinary Voyages Verne published in his lifetime. Search by title, year or word; a 🧭 marks one you can live here.</div>" +
"<input id='vrn-lib-q' placeholder='Search: moon, Africa, 1870...' style='width:100%;box-sizing:border-box;padding:6px 8px;border-radius:6px;border:1px solid #8A6A3A;background:#1E1A14;color:#FFE7B0;margin-bottom:6px'><div id='vrn-lib-list' style='max-height:46vh;overflow:auto'></div>";
h += worldBtn("life", "His life", "");
fns.life = function () { worldCard(VRN_H + "✒️ Jules Verne, 1828 to 1905</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>" + esc(VRN_LIFE) + "</div>" + worldBtn("back", "Back to the shelves", ""), { back: function () { vrnLibCard(); } }); };
h += worldBtn("lessons", "🎓 The lessons", "Twelve, each with a moving picture and a question");
fns.lessons = function () { vrnLessonList(); };
worldCard(h, fns);
var q = document.getElementById("vrn-lib-q"), out = document.getElementById("vrn-lib-list");
if (!q || !out)
return;
function draw() { var s = (q.value || "").toLowerCase().trim(); out.innerHTML = VRN_VOYAGES.filter(function (V) { return !s || (V[0] + " " + V[1] + " " + V[2]).toLowerCase().indexOf(s) >= 0; }).map(function (V) { return "<div style='padding:4px 0;border-bottom:1px solid rgba(255,255,255,.07)'><b>" + esc(V[1]) + "</b> <span style='opacity:.6'>(" + V[0] + ")</span>" + (V[3] ? " 🧭" : "") + "<div style='opacity:.8;font-size:12.5px'>" + esc(V[2]) + "</div></div>"; }).join("") || "<div style='opacity:.7'>Nothing found.</div>"; }
q.addEventListener("input", draw);
q.addEventListener("keydown", function (e) { e.stopPropagation(); });
draw();
},
function () {
var d = vrnData(), fns = {}, n = Object.keys(d.lessons).length, h = VRN_H + "🎓 The lessons</div><div style='opacity:.85;margin:4px 0 6px'>Taken: <b>" + n + " of " + VRN_LESSONS.length + "</b>. " + vrnPayLine("lesson") + "</div>";
VRN_LESSONS.forEach(function (L) { h += worldBtn("l" + L[0], (d.lessons[L[0]] ? "✅ " : "") + L[1], ""); fns["l" + L[0]] = function () { vrnLesson(L[0]); }; });
worldCard(h, fns);
},
function (key) {
var L = null;
VRN_LESSONS.forEach(function (l) { if (l[0] === key)
L = l; });
if (!L)
return;
var d = vrnData(), fns = {}, Q = L[4], seed = key.length * 13;
var h = VRN_H + "🎓 " + esc(L[1]) + "</div><canvas id='vrn-lc' width='" + (VRN.lite ? 300 : 420) + "' height='" + (VRN.lite ? 170 : 240) + "' style='width:100%;max-width:420px;border:1px solid rgba(232,200,140,.35);border-radius:4px;background:#1A2230;margin:6px 0'></canvas>" +
"<div style='opacity:.9;line-height:1.45'>" + esc(L[2]) + "</div><div style='opacity:.8;line-height:1.45;margin-top:6px'>" + esc(L[3]) + "</div>";
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
vrnSave();
setStatus("✅ <b>Lesson learned: " + esc(L[1]) + ".</b> Lessons taken: " + Object.keys(d.lessons).length + " of " + VRN_LESSONS.length + ".");
vrnReward("lesson", "🎓 <b>" + esc(L[1]) + "</b>.");
vrnLesson(key);
}
else
setStatus("Not quite. Look at the picture again, and read what it says.");
};
});
}
h += worldBtn("back", "All the lessons", "");
fns.back = function () { vrnLessonList(); };
worldCard(h, fns);
var cv = document.getElementById("vrn-lc");
if (!cv)
return;
var x = cv.getContext("2d"), t0 = performance.now();
(function frame() { if (!cv.isConnected || WLD.card.style.display === "none")
return; try {
vrnLessonDraw(key, x, cv.width, cv.height, (performance.now() - t0) / 1000);
}
catch (e) { } requestAnimationFrame(frame); })();
},
function (key, x, W, H, t) {
x.fillStyle = "#1A2230";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#E8D8A8";
x.fillStyle = "#E8D8A8";
x.lineWidth = 1.6;
x.lineCap = "round";
var cx = W / 2, cy = H / 2, s = H / 240;
x.font = (11 * s | 0) + "px Georgia";
function txt(t2, px, py) { x.fillText(t2, px, py); }
if (key === "float") {
x.fillStyle = "#2A4A6A";
x.fillRect(0, 40 * s, W, H);
var k = (Math.sin(t * 0.6) + 1) / 2, sy = 70 * s + k * 110 * s;
x.fillStyle = "#5A6A7A";
x.beginPath();
x.ellipse(cx, sy, 90 * s, 22 * s, 0, 0, 7);
x.fill();
x.fillStyle = "#6AA8D8";
x.fillRect(cx - 60 * s, sy - 10 * s, 30 * s * k + 2, 20 * s);
x.fillRect(cx + 30 * s, sy - 10 * s, 30 * s * k + 2, 20 * s);
x.fillStyle = "#E8D8A8";
txt(k > 0.5 ? "tanks full: sinks" : "tanks empty: rises", 10, H - 10);
}
else if (key === "deep") {
for (var i = 0; i < 6; i++) {
var y = 30 * s + i * 34 * s;
x.globalAlpha = 0.3 + i * 0.12;
x.fillStyle = "#2A5A8A";
x.fillRect(0, y, W, 34 * s);
x.globalAlpha = 1;
x.fillStyle = "#E8D8A8";
txt((i * 10) + " m: " + (i + 1) + " atm", 10, y + 20 * s);
var r = (i + 1) * 3 * s * (1 + 0.05 * Math.sin(t * 2));
x.beginPath();
for (var a = 0; a < 8; a++) {
var an = a / 8 * 6.28;
x.moveTo(W * 0.7 + Math.cos(an) * (r + 16 * s), y + 17 * s + Math.sin(an) * (r + 16 * s) * 0.6);
x.lineTo(W * 0.7 + Math.cos(an) * 16 * s, y + 17 * s + Math.sin(an) * 16 * s * 0.6);
}
x.stroke();
}
}
else if (key === "hot") {
var k2 = (Math.sin(t * 0.5) + 1) / 2, by = H - 60 * s - k2 * 120 * s, R = 44 * s * (0.9 + k2 * 0.2);
x.fillStyle = k2 > 0.5 ? "#C86A3A" : "#7A6A5A";
x.beginPath();
x.arc(cx, by, R, 0, 7);
x.fill();
x.strokeRect(cx - 10 * s, by + R + 10 * s, 20 * s, 12 * s);
x.beginPath();
x.moveTo(cx - R * 0.7, by + R * 0.7);
x.lineTo(cx - 8 * s, by + R + 10 * s);
x.moveTo(cx + R * 0.7, by + R * 0.7);
x.lineTo(cx + 8 * s, by + R + 10 * s);
x.stroke();
x.fillStyle = "#E8D8A8";
for (var p = 0; p < 14; p++) {
var sp = k2 > 0.5 ? 1.6 : 0.7;
x.beginPath();
x.arc(cx + Math.cos(p + t * sp * 3) * R * 0.6, by + Math.sin(p * 1.7 + t * sp * 3) * R * 0.6, 1.6, 0, 7);
x.fill();
}
txt(k2 > 0.5 ? "hot: rises" : "cool: sinks", 10, H - 10);
}
else if (key === "orbit") {
x.beginPath();
x.arc(cx, cy + 30 * s, 70 * s, 0, 7);
x.stroke();
x.fillStyle = "#3A6A9A";
x.beginPath();
x.arc(cx, cy + 30 * s, 68 * s, 0, 7);
x.fill();
x.fillStyle = "#E8D8A8";
[0.6, 0.85, 1.0].forEach(function (f, i) { var ph = ((t * 0.25) + i * 0.3) % 1; x.setLineDash([3, 4]); x.beginPath(); if (f < 1) {
x.moveTo(cx, cy + 30 * s - 76 * s);
x.quadraticCurveTo(cx + 60 * s * f * 2, cy - 40 * s, cx + 70 * s * Math.sin(f * 2), cy + 30 * s - 70 * s * Math.cos(f * 2));
}
else
x.arc(cx, cy + 30 * s, 100 * s, 0, 7); x.stroke(); x.setLineDash([]); });
var a2 = t * 0.6;
x.beginPath();
x.arc(cx + Math.sin(a2) * 100 * s, cy + 30 * s - Math.cos(a2) * 100 * s, 4, 0, 7);
x.fill();
txt("fast enough: it keeps missing", 10, H - 10);
}
else if (key === "line") {
var ER = 80 * s;
x.beginPath();
x.arc(cx, cy, ER, 0, 7);
x.stroke();
var rot = t * 0.4;
for (var m = 0; m < 12; m++) {
var an2 = m / 12 * 6.28 + rot;
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(an2) * ER, cy + Math.sin(an2) * ER);
x.globalAlpha = 0.25;
x.stroke();
x.globalAlpha = 1;
}
x.fillStyle = "#E8C83A";
x.beginPath();
x.arc(W - 30 * s, cy, 12 * s, 0, 7);
x.fill();
x.fillStyle = "#E8D8A8";
var fa = -t * 0.9;
x.beginPath();
x.arc(cx + Math.cos(fa) * (ER + 10 * s), cy + Math.sin(fa) * (ER + 10 * s), 4, 0, 7);
x.fill();
txt("going east: toward the sunrise", 10, H - 10);
}
else if (key === "noon") {
x.beginPath();
x.moveTo(0, H - 40 * s);
x.lineTo(W, H - 40 * s);
x.stroke();
var sa = 0.3 + 0.5 * (Math.sin(t * 0.4) + 1) / 2, sx = cx + Math.cos(Math.PI - sa) * 0, sy2 = H - 40 * s - Math.sin(sa) * 150 * s, sxx = cx - Math.cos(sa) * 150 * s;
x.fillStyle = "#E8C83A";
x.beginPath();
x.arc(sxx, sy2, 10 * s, 0, 7);
x.fill();
x.strokeStyle = "#E8D8A8";
x.beginPath();
x.moveTo(cx, H - 40 * s);
x.lineTo(cx, H - 90 * s);
x.stroke();
x.globalAlpha = 0.5;
x.beginPath();
x.moveTo(cx, H - 40 * s);
x.lineTo(cx + 50 * s / Math.tan(sa), H - 40 * s);
x.lineWidth = 4;
x.stroke();
x.lineWidth = 1.6;
x.globalAlpha = 1;
x.fillStyle = "#E8D8A8";
txt("Sun's height: " + Math.round(sa * 57) + "°", 10, 20 * s);
}
else if (key === "lens") {
x.beginPath();
x.ellipse(cx - 30 * s, cy, 8 * s, 60 * s, 0, 0, 7);
x.stroke();
for (var r2 = -4; r2 <= 4; r2++) {
var yy = cy + r2 * 12 * s, ph2 = (t * 0.6) % 1;
x.globalAlpha = 0.6;
x.beginPath();
x.moveTo(10, yy);
x.lineTo(cx - 30 * s, yy);
x.lineTo(cx + 70 * s, cy);
x.stroke();
x.globalAlpha = 1;
}
var g = x.createRadialGradient(cx + 70 * s, cy, 1, cx + 70 * s, cy, 14 * s);
g.addColorStop(0, "rgba(255,220,140,.9)");
g.addColorStop(1, "rgba(255,160,60,0)");
x.fillStyle = g;
x.beginPath();
x.arc(cx + 70 * s, cy, 14 * s, 0, 7);
x.fill();
x.fillStyle = "#E8D8A8";
txt("the focus", cx + 60 * s, cy + 30 * s);
}
else if (key === "volt") {
x.strokeRect(30 * s, cy - 30 * s, 40 * s, 60 * s);
txt("+  −", 34 * s, cy + 44 * s);
x.beginPath();
x.moveTo(70 * s, cy - 20 * s);
x.lineTo(W - 60 * s, cy - 20 * s);
x.lineTo(W - 60 * s, cy + 20 * s);
x.lineTo(70 * s, cy + 20 * s);
x.stroke();
var bulb = 0.6 + 0.2 * Math.sin(t);
x.fillStyle = "rgba(255,230,160," + bulb + ")";
x.beginPath();
x.arc(W - 60 * s, cy, 14 * s, 0, 7);
x.fill();
x.fillStyle = "#E8D8A8";
for (var e = 0; e < 10; e++) {
var u = ((t * 0.3) + e / 10) % 1, L2 = (W - 130 * s) * 2 + 40 * s, d2 = u * L2, px, py;
if (d2 < W - 130 * s) {
px = 70 * s + d2;
py = cy - 20 * s;
}
else if (d2 < W - 130 * s + 40 * s) {
px = W - 60 * s;
py = cy - 20 * s + (d2 - (W - 130 * s));
}
else {
px = W - 60 * s - (d2 - (W - 130 * s) - 40 * s);
py = cy + 20 * s;
}
x.beginPath();
x.arc(px, py, 2.4, 0, 7);
x.fill();
}
}
else if (key === "screw") {
var ang = t * 6;
x.save();
x.translate(cx, cy - 30 * s);
x.scale(1, 0.3);
for (var bl = 0; bl < 3; bl++) {
x.save();
x.rotate(ang + bl * 2.09);
x.beginPath();
x.ellipse(40 * s, 0, 40 * s, 8 * s, 0, 0, 7);
x.stroke();
x.restore();
}
x.restore();
x.beginPath();
x.moveTo(cx, cy - 30 * s);
x.lineTo(cx, cy + 40 * s);
x.stroke();
for (var a3 = 0; a3 < 6; a3++) {
var ay = cy + ((t * 40 + a3 * 20) % 80) * s - 20 * s;
x.beginPath();
x.moveTo(cx - 60 * s + a3 * 24 * s, ay);
x.lineTo(cx - 60 * s + a3 * 24 * s, ay + 10 * s);
x.lineTo(cx - 63 * s + a3 * 24 * s, ay + 6 * s);
x.stroke();
}
txt("air pushed down ↓  lift ↑", 10, H - 10);
}
else if (key === "morse") {
var msg = "·−−· ·−· −−− ··· ·−−· · −·−· −", n = Math.floor(t * 4) % msg.length;
x.font = (18 * s | 0) + "px monospace";
x.fillText(msg.slice(0, n + 1), 14, cy - 20 * s);
x.font = (11 * s | 0) + "px Georgia";
var on = msg[n] !== " ";
x.fillStyle = on ? "#E8C83A" : "#3A3A3A";
x.beginPath();
x.arc(W - 40 * s, cy + 30 * s, 12 * s, 0, 7);
x.fill();
x.fillStyle = "#E8D8A8";
x.beginPath();
x.moveTo(20 * s, cy + 30 * s);
x.lineTo(W - 52 * s, cy + 30 * s);
x.stroke();
txt("P R O S P E C T", 14, cy + 70 * s);
}
else if (key === "layers") {
var cols = ["#C8A04A", "#E86A2A", "#C83A1A", "#F8E08A"], rr = [100, 82, 52, 22];
for (var l = 0; l < 4; l++) {
x.fillStyle = cols[l];
x.beginPath();
x.arc(cx, cy, rr[l] * s, 0, 7);
x.fill();
}
x.fillStyle = "#1A2230";
x.beginPath();
x.moveTo(cx, cy);
x.arc(cx, cy, 104 * s, -0.4, 0.4);
x.fill();
x.fillStyle = "#E8D8A8";
["crust", "mantle", "outer core", "inner core"].forEach(function (n2, i) { txt(n2, cx + rr[i] * s + 4, cy - 60 * s + i * 16 * s); });
var wv = (t * 0.5) % 1;
x.beginPath();
x.arc(cx - 100 * s, cy, wv * 200 * s, -0.6, 0.6);
x.stroke();
}
else if (key === "fossil") {
var lay = ["#8A7A5A", "#9A8A6A", "#7A6A4A", "#A89A7A", "#6A5A3A"];
for (var k3 = 0; k3 < 5; k3++) {
x.fillStyle = lay[k3];
x.fillRect(0, H - (k3 + 1) * 36 * s, W, 36 * s);
}
x.fillStyle = "#E8E2D2";
var fy = H - 20 * s, fx = cx + Math.sin(t * 0.3) * 10;
x.beginPath();
x.ellipse(fx, fy, 40 * s, 7 * s, 0, 0, 7);
x.fill();
x.beginPath();
x.moveTo(fx - 40 * s, fy);
x.quadraticCurveTo(fx - 70 * s, fy - 24 * s, fx - 90 * s, fy - 10 * s);
x.lineWidth = 3;
x.strokeStyle = "#E8E2D2";
x.stroke();
x.lineWidth = 1.6;
x.fillStyle = "#1A1A1A";
txt("oldest at the bottom", 10, 14 * s);
}
},
function () {
var d = vrnData(), fns = {}, h = VRN_H + "🏛️ The Geographical Society</div><div style='opacity:.9;margin:6px 0;line-height:1.5'>'Fellows of this Society have crossed Africa by air and the Pacific by raft. Answer eight of ten questions on the Voyages and the science in them, and we will make you a Fellow.' " + (d.fellow ? "<b>You are a Fellow of the Society.</b> " : "") + "</div><div style='opacity:.75;font-size:12px'>" + vrnPayLine("exam") + "</div>";
h += worldBtn("go", d.fellow ? "Sit the examination again" : "Sit the examination", "");
fns.go = function () { var pick = VRN_EXAM.map(function (q, i) { return [Math.random(), i]; }).sort(function (a, b) { return a[0] - b[0]; }).slice(0, 10).map(function (p) { return p[1]; }); vrnExamQ({ pick: pick, i: 0, ok: 0 }); };
worldCard(h, fns);
},
function (S) {
if (S.i >= S.pick.length) {
var pass = S.ok >= 8, d = vrnData();
worldCard(VRN_H + (pass ? "🏛️ A Fellow of the Society!" : "🏛️ Not this time") + "</div><div style='opacity:.9;margin:6px 0'>" + S.ok + " of 10 right." + (pass ? " The President shakes your hand and pins the medal on." : " Eight are needed. Read in the Library and try again.") + "</div>", {});
if (pass) {
d.fellow = 1;
vrnSave();
vrnReward("exam", "🏛️ <b>Fellow of the Geographical Society.</b>");
try {
if (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn())
cityRpc("verne_fellow", {}).then(function () { }, function () { });
}
catch (e) { }
}
return;
}
var Q = VRN_EXAM[S.pick[S.i]], fns = {}, h = VRN_H + "🏛️ Question " + (S.i + 1) + " of 10</div><div style='opacity:.9;margin:6px 0'>" + esc(Q[0]) + "</div>", order = [0, 1, 2].sort(function () { return Math.random() - 0.5; });
order.forEach(function (o, k) { h += worldBtn("a" + k, Q[1][o], ""); fns["a" + k] = function () { if (o === Q[2])
S.ok++; S.i++; vrnExamQ(S); }; });
worldCard(h, fns);
},
function (v) {
var atm = 1 + v.depth / 10, strength = v.hull * 0.6, sink = v.tank >= 6;
if (!sink)
return [false, "She won't go down: with tanks that small she still weighs less than the water she pushes aside. Make the tanks bigger (6% or more)."];
if (atm > strength)
return [false, "At " + v.depth + " m the sea presses with " + atm.toFixed(0) + " atmospheres; a " + v.hull + " mm hull only takes about " + strength.toFixed(0) + ". Crunch! Thicker plates (about " + Math.ceil(atm / 0.6) + " mm)."];
if (v.tank > 22)
return [false, "Tanks that big leave no room inside for crew, air or engine."];
return [true, "Down she goes to " + v.depth + " m (" + atm.toFixed(0) + " atmospheres on the hull; it holds), then blows her tanks and rises. It works!"];
},
function (v) {
var per = v.gas ? 1.1 : 0.25, lift = v.vol * per, env = v.vol * 0.08, net = lift - env;
return net >= v.load ? [true, "Each cubic metre of " + (v.gas ? "hydrogen" : "hot air") + " lifts about " + per + " kg; " + v.vol + " m³ lifts " + Math.round(lift) + " kg, less " + Math.round(env) + " kg of envelope: " + Math.round(net) + " kg spare for a " + v.load + " kg load. Up she goes!"] : [false, "Lift " + Math.round(lift) + " kg, envelope " + Math.round(env) + " kg: only " + Math.round(net) + " kg for a " + v.load + " kg load. Bigger, or " + (v.gas ? "lighter load." : "try hydrogen (it lifts four times as much, but Fergusson knew it can burn).")];
},
function (v) {
var perKw = 10, lift = v.kw * perKw, need = v.mass, spread = v.screws >= Math.ceil(v.mass / 600);
if (lift < need)
return [false, "About 10 kg of lift per kilowatt with good screws: " + v.kw + " kW lifts " + lift + " kg; she weighs " + v.mass + " kg. More power."];
if (!spread)
return [false, "Enough power, but " + v.screws + " screws must each lift " + Math.round(v.mass / v.screws) + " kg: too much for blades of that day. Use at least " + Math.ceil(v.mass / 600) + "."];
return [true, v.screws + " screws, " + v.kw + " kW: " + lift + " kg of lift for " + v.mass + " kg. She rises off the ground, humming. It flies!"];
},
function (v) {
var a = Math.pow(v.speed * 1000, 2) / (2 * v.len) / 9.81;
if (v.speed < 11)
return [false, "At " + v.speed + " km/s the shell climbs, slows, and falls back. It needs about 11 km/s."];
if (a > 10)
return [false, "To reach " + v.speed + " km/s in " + v.len + " m of barrel, the push is " + Math.round(a).toLocaleString() + " times gravity (" + Math.round(a).toLocaleString() + " g). Nobody survives that (the Columbiad's 274 m gives about 22,000 g: Verne's water buffers couldn't really save them). You'd need a barrel about " + Math.round(Math.pow(v.speed * 1000, 2) / (2 * 10 * 9.81) / 1000) + " km long! That's why real spaceships use rockets that push gently for minutes."];
return [true, "A gentle " + a.toFixed(1) + " g push along " + (v.len / 1000).toFixed(0) + " km of barrel. The shell leaves at " + v.speed + " km/s and the passengers live. (A very, very long gun: real ones use rockets instead.)"];
},
function (k) {
var B = VRN_BENCH[k], d = vrnData(), fns = {}, v = {};
if (!B)
return;
var mem = (d.bench || {})[k] || {};
var h = VRN_H + B.icon + " The bench: " + esc(B.name) + "</div><div style='opacity:.85;margin:4px 0 8px'>" + esc(B.goal) + "</div>";
B.p.forEach(function (P) {
var val = mem[P[0]] !== undefined ? mem[P[0]] : P[4];
v[P[0]] = val;
h += "<div style='margin:4px 0'><div style='font-size:13px'>" + esc(P[1]) + ": <b id='vrn-b-" + P[0] + "v'>" + val + "</b></div><input type='range' id='vrn-b-" + P[0] + "' min='" + P[2] + "' max='" + P[3] + "' step='" + P[5] + "' value='" + val + "' style='width:100%'></div>";
});
h += "<div id='vrn-b-out' style='margin:8px 0;line-height:1.45;min-height:2em'></div>";
h += worldBtn("test", "🔧 Test it", "");
fns.test = function () {
var r = B.test(v);
var out = document.getElementById("vrn-b-out");
if (out)
out.innerHTML = (r[0] ? "✅ " : "❌ ") + esc(r[1]);
d.bench = d.bench || {};
d.bench[k] = JSON.parse(JSON.stringify(v));
vrnSave();
if (VRN.tank && k === "sub")
VRN.fx.push({ k: "pulse", m: VRN.tank, t: 0 });
if (r[0]) {
var sig = k + ":" + B.p.map(function (P) { return v[P[0]]; }).join("/");
if (!d.designs.some(function (D) { return D.sig === sig; })) {
d.designs.push({ sig: sig, k: k, n: B.name + " (" + B.p.map(function (P) { return v[P[0]]; }).join(", ") + ")", at: Date.now() });
if (d.designs.length > 40)
d.designs.shift();
vrnSave();
vrnReward("design", "🔧 <b>It works!</b> Your design of " + esc(B.name.toLowerCase()) + " is saved.");
}
}
};
worldCard(h, fns);
B.p.forEach(function (P) { var el = document.getElementById("vrn-b-" + P[0]); if (!el)
return; el.addEventListener("input", function () { v[P[0]] = +el.value; var o = document.getElementById("vrn-b-" + P[0] + "v"); if (o)
o.textContent = el.value; }); el.addEventListener("keydown", function (e) { e.stopPropagation(); }); });
},
function (x, z) {
if (x >= VRN_SPACE.x - 4000 && !vrnInRoom(x, z))
return "sky";
if (x >= VRN_IN_X - 1000)
return "inside";
if (x > VRN_RW.x - 4000 && x < VRN_RW.x + 4000)
return "race";
if (x > VRN_UG_X - 3500 && x < VRN_UG_X + 4000)
return x - VRN_UG_X < -1450 ? "galleries" : "under";
if (x > VRN_AFR.x0 - 200)
return "africa";
if (vrnIslandIn(x, z) > -80) {
if (vrnSegD(x, z, -4150, 1050, -4760, 1760) < 170)
return "serpentine";
if (x < -4000)
return "farwest";
return "island";
}
if (Math.hypot(x - VRN_STROM.x, z - VRN_STROM.z) < VRN_STROM.r * 1.3)
return "stromboli";
if (Math.hypot(x - VRN_STONE.x, z - VRN_STONE.z) < 1600)
return "stones";
if (Math.hypot(x - VRN_SNF.x, z - VRN_SNF.z) < 1500 || z < -1500)
return "snaefells";
if (z > 200 && vrnLand(x, z) < -4)
return "sea";
return "harbour";
},
function (L) {
var z = VRN.zone;
if (z === "inside") {
var I = VRN.insideOf;
return I ? I.name : "inside";
}
if (z === "deep")
return "the Deep" + vrnDeepNear(L);
if (z === "race")
return "the world line: " + VRN_LEGS[vrnRwLeg(vrnRwU(L.x, L.z))].from;
if (z === "sky")
return "between the Earth and the Moon";
var best = null, bd = 1e9;
for (var k in VRN_SPOTS) {
var S = VRN_SPOTS[k], d = Math.hypot(L.x - S.x, L.z - S.z);
if (d < (k === "arrive" ? 60 : 90) && d < bd) {
bd = d;
best = S.name;
}
}
if (best)
return best;
return { harbour: "the Harbour of the Voyages", sea: "the bay", island: "Lincoln Island", farwest: "the Far West of Lincoln Island (jungle)", serpentine: "the Serpentine Peninsula", stromboli: "Stromboli", stones: "Stone's Hill, Florida", snaefells: "Iceland, under Snaefells",
africa: "Africa", galleries: "the galleries under Snaefells", under: "the Lidenbrock Sea" }[z] || VRN_NAME;
},
function (L) { for (var i = 0; i < VRN_DEEP.length; i++) {
var F = VRN_DEEP[i];
if (Math.hypot(L.x - F.x, L.z - F.z) < F.r)
return ": " + ({ torres: "the reefs of Torres Strait", forest: "the forest of Crespo", pearl: "the pearl bank", cemetery: "the coral cemetery", atlantis: "Atlantis", vigo: "Vigo Bay", squid: "the squid deeps", grotto: "the far reef" }[F.k] || "");
} return ""; },
function (x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet;
var fl = vrnFloorsAt(x, z, f);
if (x >= VRN_IN_X - 1000)
return fl === null ? 0 : fl;
var land = vrnLand(x, z), w = vrnWaterAt(x, z), g = land, R = VRN.ride;
if (w !== null && land < w) {
if (R && R.k === "raft")
g = w + 1.4;
else if (VRN.dive || (R && R.k === "sub"))
g = land;
else
g = w - 1.3;
}
return fl !== null && fl > g ? fl : g;
},
function (x, z, feet) {
if (vrnCine())
return true;
if (x >= VRN_IN_X - 1000) {
if (vrnSolidAt(x, z, feet))
return true;
return !vrnInsideWalk(x, z);
}
var R = VRN.ride;
if (R && R.k === "raft" && vrnWaterAt(x, z) === null)
return true;
if (R && R.k === "sub" && (vrnWaterAt(x, z) === null || vrnLand(x, z) > -4))
return true;
if (x > VRN_UG_X - 3500 && x < VRN_UG_X + 4000) {
if (vrnLand(x, z) > feet + 3.5)
return true;
return vrnSolidAt(x, z, feet);
}
if (!(x > VRN_AFR.x0 - 200)) {
var B = VRN_BOUND;
if (x < B.x0 || x > B.x1 || z < B.z0 || z > B.z1)
return true;
}
else {
var A = VRN_AFR;
if (x > A.x1 || z < A.z0 || z > A.z1)
return true;
}
if (R && R.k === "albatross")
return false;
return vrnSolidAt(x, z, feet);
},
function (on, btns) {
var el = document.getElementById("vrn-ride");
if (!on) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "vrn-ride";
el.style.cssText = "position:fixed;left:50%;top:52px;transform:translateX(-50%);z-index:45;display:flex;gap:8px;flex-wrap:wrap;justify-content:center";
document.body.appendChild(el);
}
el.innerHTML = "";
(btns || []).forEach(function (b) { var x = document.createElement("button"); x.className = "btn"; x.style.padding = "6px 14px"; x.textContent = b[0]; x.onclick = function (e) { e.stopPropagation(); b[1](); }; el.appendChild(x); });
el.style.display = "flex";
el.style.top = vrnBelowBanner(52) + "px";
},
function (dt, L) {
var keep = [];
VRN.fx.forEach(function (f) {
var live = true;
if (f.k === "flag") {
f.ph += dt;
f.m.rotation.y = Math.sin(f.ph * 1.3) * 0.18;
}
else if (f.k === "spin") {
if (f.y)
f.m.rotation.y += dt * f.sp;
else
f.m.rotation.y += dt * (f.sp || 0.3);
}
else if (f.k === "spinx") {
f.m.rotation.x += dt * (f.sp || 2);
}
else if (f.k === "spinz") {
f.m.rotation.z += dt * (f.sp || 0.6);
}
else if (f.k === "bob") {
f.ph = (f.ph || Math.random() * 6) + dt;
f.m.position.y = (f.y0 !== undefined ? f.y0 : (f.y0 = f.m.position.y)) + Math.sin(f.ph * 0.7) * 0.25;
f.m.rotation.z = Math.sin(f.ph * 0.5) * 0.02;
}
else if (f.k === "pulse") {
f.t += dt;
f.m.scale.setScalar(1 + Math.sin(f.t * 3) * 0.03 * (1 - f.t / 2));
if (f.t > 2) {
f.m.scale.setScalar(1);
live = false;
}
}
else if (f.k === "shark") {
f.t += dt;
var a = f.t * 0.5;
f.m.position.set(f.x + Math.cos(a) * 16, f.y, f.z + Math.sin(a) * 10);
f.m.rotation.y = -a;
if (f.t > 7 && !f.said) {
f.said = 1;
setStatus("🦈 Nemo's dagger flashes dully in the green light; Ned's harpoon flies; the shark rolls away, beaten. The diver is safe, and Nemo gives him a bag of pearls.");
}
if (f.t > 9) {
f.m.position.y -= dt * 4;
}
if (f.t > 13) {
f.gone.forEach(function (g) { if (g.parent)
g.parent.remove(g); });
live = false;
}
}
else if (f.k === "saur") {
f.t += dt;
var a2 = f.t * 0.35;
f.a.position.set(f.x + Math.cos(a2) * 14, -1 + Math.sin(f.t * 0.7) * 1.5, f.z + Math.sin(a2) * 10);
f.a.rotation.y = -a2;
f.b.position.set(f.x - Math.cos(a2) * 12, -0.5 + Math.cos(f.t * 0.6) * 1.2, f.z - Math.sin(a2) * 9);
f.b.rotation.y = -a2 + Math.PI;
if (f.t > 40) {
[f.a, f.b].forEach(function (g) { if (g.parent)
g.parent.remove(g); });
live = false;
}
}
if (live)
keep.push(f);
});
VRN.fx = keep;
VRN.smT = (VRN.smT || 0) + dt;
if (VRN.smT > (VRN.lite ? 0.5 : 0.25)) {
VRN.smT = 0;
VRN.smokers = VRN.smokers.filter(function (S) {
if (S.t !== undefined) {
S.t -= 0.25;
if (S.t <= 0)
return false;
}
if (Math.abs(S.x - L.x) > (S.big ? 3000 : 700) || Math.abs(S.z - L.z) > (S.big ? 3000 : 700))
return true;
if (S.fire && !vrnSmokeOn(S.fire))
return true;
var m = new THREE.Mesh(VRN.puffG || (VRN.puffG = new THREE.SphereGeometry(1, 8, 6)), new THREE.MeshLambertMaterial({ color: S.steam ? 0xF2F2F0 : S.dark ? 0x4A4440 : 0xB8B4AC, transparent: true, opacity: S.big ? 0.5 : 0.4, depthWrite: false }));
m.position.set(S.x + (Math.random() - 0.5) * S.r, S.y, S.z + (Math.random() - 0.5) * S.r);
m.scale.setScalar(S.r * (S.big ? 0.6 : 1) + 0.4);
VRN.G.add(m);
VRN.puffs.push({ m: m, t: 0, up: S.steam ? 6 : S.big ? 14 : 1.8, grow: S.big ? 0.25 : 0.5, life: S.big ? 9 : 4 });
return true;
});
}
VRN.puffs = VRN.puffs.filter(function (P) { P.t += dt; P.m.position.y += dt * P.up; P.m.scale.multiplyScalar(1 + dt * P.grow); P.m.material.opacity = Math.max(0, P.m.material.opacity - dt * 0.4 / P.life * 2); if (P.t > P.life) {
VRN.G.remove(P.m);
P.m.material.dispose();
return false;
} return true; });
VRN.people.forEach(function (P) { if (!P.wander)
return; var p = P.g.position; if (Math.abs(p.x - L.x) > 150 || Math.abs(p.z - L.z) > 150)
return; if (P.y0 === undefined)
P.y0 = p.y; wWander(P.g, dt, function () { return P.y0; }, P.wander); });
if (VRN.insideOf && VRN.insideOf.key === "nautilus") {
VRN.swT = (VRN.swT || 0) + dt;
if (VRN.swT > 0.08) {
vrnSeaWindowDraw(VRN.swT);
VRN.swT = 0;
}
}
},
function (L) {
var inRm = vrnInRoom(L.x, L.z), inside = (L.x >= VRN_IN_X - 1000 && L.x < VRN_SPACE.x - 4000) || inRm, far = VRN.lite ? 1600 : 3600, ug = L.x > VRN_UG_X - 3500 && L.x < VRN_UG_X + 4000, rw = L.x > VRN_RW.x - 4000 && L.x < VRN_RW.x + 4000, sky = L.x >= VRN_SPACE.x - 4000 && !inRm;
var home = !inside && !ug && !rw && !sky;
(VRN.outside || []).forEach(function (g) { if (!g.userData.dist) {
if (g.visible !== home)
g.visible = home;
} });
VRN.districts.forEach(function (D) { var on = D.far ? Math.hypot(L.x - D.x, L.z - D.z) < D.r + far : (home && Math.hypot(L.x - D.x, L.z - D.z) < D.r + far); if (D.g.visible !== on)
D.g.visible = on; });
(VRN.landTiles || []).forEach(function (T) { var on = home && Math.hypot(L.x - T.x, L.z - T.z) < (VRN.lite ? 3200 : 6000); if (T.g.visible !== on)
T.g.visible = on; });
(VRN.deepTiles || []).forEach(function (T) { var on = home && camera.position.y < 20 && Math.hypot(L.x - T.x, L.z - T.z) < (VRN.lite ? 700 : 1300); if (T.g.visible !== on)
T.g.visible = on; });
if (VRN.spGroup)
VRN.spGroup.forEach(function (m) { m.visible = sky; });
vrnTreesVis(L, !home);
for (var k in VRN_IN) {
var I = VRN_IN[k];
if (I.grp) {
var on2 = inside && Math.abs(L.x - I.x) < I.hw + 40;
if (I.grp.visible !== on2)
I.grp.visible = on2;
}
}
},
function (dt) {
var rp = document.getElementById("vrn-ride");
if (rp && rp.style.display === "flex") {
var rt = vrnBelowBanner(52) + "px";
if (rp.style.top !== rt)
rp.style.top = rt;
}
var L = worldLocal();
VRN.t += dt;
if (!VRN.built || VRN.moving)
return;
var feet = camera.position.y - 1.72, zone = vrnZoneAt(L.x, L.z);
if ((zone === "sea" || zone === "harbour" || zone === "island" || zone === "stromboli") && feet < -3 && vrnWaterAt(L.x, L.z) !== null && L.z > 200)
zone = "deep";
if (zone !== VRN.zone) {
var was = VRN.zone;
VRN.zone = zone;
if (vrnDangerZone(zone) && !vrnDangerZone(was))
setStatus({ deep: "🦈 <b>The Deep.</b> Sharks and worse hunt down here. It is <b>Dangerous</b> under the sea.", under: "🦖 <b>The Lidenbrock Sea.</b> Beyond the camp the underworld's beasts roam. It is <b>Dangerous</b> here.", farwest: "🐆 <b>The Far West of Lincoln Island.</b> Jungle, wild cats and the convicts' hideouts. It is <b>Dangerous</b> here.", serpentine: "🐆 <b>The Serpentine Peninsula.</b> Wild country. It is <b>Dangerous</b> here." }[zone]);
else if (!vrnDangerZone(zone) && vrnDangerZone(was) && zone !== "inside")
setStatus("🛡️ <b>Safe</b> again.");
}
VRN.insideOf = vrnInAt(L.x, L.z);
if (WLD.arrive && (WLD.arrive.x !== VRN_SPOTS.arrive.x || WLD.arrive.z !== VRN_SPOTS.arrive.z))
WLD.arrive = { x: VRN_SPOTS.arrive.x, z: VRN_SPOTS.arrive.z };
vrnTourTick(dt);
vrnPilotTick(dt, L);
vrnRaceTick(dt);
vrnMoonTick(dt);
vrnBalloonTick(dt, L);
vrnStreakTick(dt);
vrnAlbatrossTick(dt, L);
vrnIslandTick(dt, L);
vrnUgTick(dt, L);
vrnSchoolsTick(dt, L);
vrnSeaTick(dt, L);
vrnFxTick(dt, L);
VRN.vt += dt;
if (VRN.vt > 0.4) {
VRN.vt = 0;
vrnVisTick(L);
}
VRN.dt2 = (VRN.dt2 || 0) + dt;
if (VRN.dt2 > 6) {
VRN.dt2 = 0;
vrnInDrop();
}
var R = VRN.ride, extra = R ? " · " + ({ sub: "at the Nautilus's wheel", raft: "on the raft", albatross: "aboard the Albatross", balloon: "in the Victoria", race: "racing round the world", tour: "on Nemo's tour" }[R.k] || "") : VRN.dive ? " · in a diving suit" : "";
if (VRN.bal)
extra += " · " + Math.max(0, Math.round(VRN.bal.y - Math.max(0, vrnLand(VRN.bal.x, VRN.bal.z)))) + " m up";
if (zone === "deep" || (R && R.k === "sub"))
extra += " · " + Math.max(0, Math.round(-feet)) + " m down";
worldBanner("<b>🧭 " + VRN_NAME + "</b> · " + esc(vrnPlaceName(L)) + extra);
VRN.pt += dt;
if (VRN.pt < 0.15)
return;
VRN.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
if (vrnCine()) {
worldPrompt(null);
return;
}
if (R && R.k !== "race") {
worldPrompt("<b>" + esc(extra.replace(" · ", "")) + "</b> · the buttons at the top to get off", null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
VRN.talk.forEach(function (T) { var p = T.p.g.position; if (!T.p.g.visible || Math.abs(p.y - feet) > 3)
return; cand(p.x, p.z, T.r, T.fn || function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to " + (T.fn ? "talk" : "talk")); });
VRN.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y !== undefined && s.y !== null ? s.y : (s.x >= VRN_IN_X - 1000 ? 0 : vrnLand(s.x, s.z));
if (Math.abs(sy - feet) > 3.2)
return;
cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
var la = vrnLadderAt(L) || vrnUgAt(L);
if (la) {
var d0 = 0.2;
if (d0 < bd) {
bd = d0;
best = { fn: la.fn, html: "<b>" + esc(la.name) + "</b> · <b>press E</b> to " + esc(la.verb) };
}
}
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
console.warn("[verne] bake", e);
}
},
function (G) {
VRN.G = G;
VRN.lite = typeof LITE !== "undefined" && !!LITE;
VRN.solids = [];
VRN.sgrid = null;
VRN.floors = [];
VRN.spots = [];
VRN.talk = [];
VRN.people = [];
VRN.fx = [];
VRN.districts = [];
VRN.water = [];
VRN.smokers = [];
VRN.puffs = [];
VRN.ride = null;
VRN.dive = false;
VRN.tour = null;
VRN.run = null;
VRN.moon = null;
VRN.bal = null;
VRN.chim = null;
VRN.foes = null;
VRN.rim = null;
VRN.erupt = null;
VRN.isSheep = null;
VRN.ugrid = null;
VRN.hansbach = !!vrnData().cWater;
for (var k in VRN_IN) {
VRN_IN[k].built = false;
VRN_IN[k].grp = null;
}
vrnGridMake();
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[verne] " + name, e);
} }
step("terrain", function () { vrnTerrain(G); });
step("sea", function () { vrnSeaBuild(G); });
step("trees", function () { vrnTrees(G); });
step("harbour", function () { vrnHarbour(G); });
step("deep", function () { vrnDeepPlant(G); vrnDeepPlaces(G); });
step("island", function () { vrnIslandBuild(G); });
step("snaefells", function () { vrnSnfBuild(G); });
step("under", function () { vrnUgBuild(G); });
step("stone", function () { vrnStoneBuild(G); });
step("race", function () { vrnRwBuild(G); });
step("stromboli", function () { var S = VRN_STROM; VRN.smokers.push({ x: S.x, y: S.h - 28, z: S.z, r: 6, dark: 1 }); });
step("snaefells-smoke", function () { VRN.smokers.push({ x: VRN_ISL.mx, y: VRN_ISL.peak - 30, z: VRN_ISL.mz, r: 10, dark: 0 }); });
VRN.districts.forEach(function (D) { vrnBakeTree(D.g); });
VRN.districts.forEach(function (D) { D.g.userData.dist = 1; });
(VRN.treeTiles || []).forEach(function (T) { T.g.userData.dist = 1; });
(VRN.landTiles || []).forEach(function (T) { T.g.userData.dist = 1; });
(VRN.deepTiles || []).forEach(function (T) { T.g.userData.dist = 1; });
VRN.outside = G.children.slice();
VRN.built = true;
},
function () {
if (VRN.tour) {
VRN.tour = null;
vrnSubHome();
}
if (VRN.run) {
var R = VRN.run;
VRN.run = null;
if (R.veh && R.veh.parent)
R.veh.parent.remove(R.veh);
vrnRaceHud(false);
}
if (VRN.bal) {
var B = VRN.bal;
VRN.bal = null;
if (B.g.parent)
B.g.parent.remove(B.g);
vrnWindStreaks(false);
if (VRN.fieldBalloon)
VRN.fieldBalloon.visible = true;
}
if (VRN.foes) {
VRN.foes.list.forEach(function (E) { if (E.g.parent)
E.g.parent.remove(E.g); });
VRN.foes = null;
}
VRN.moon = null;
VRN.chim = null;
VRN.rim = null;
VRN.erupt = null;
VRN.envOver = null;
VRN.dive = false;
VRN.ride = null;
vrnRidePanel(false);
},
function (opt) {
opt = opt || {};
var A = VRN_SPOTS.arrive;
VRN.zone = "harbour";
VRN.insideOf = null;
VRN.moving = false;
camera.position.set(VRN.base + A.x, vrnGround(A.x, A.z, 1e4) + 1.72, A.z);
yaw = Math.atan2(-(VRN_HB.palace.x - A.x), -(VRN_HB.palace.z - A.z));
pitch = 0;
vrnStateFetch();
vrnIslandShow();
setStatus("<b>" + VRN_NAME + ".</b> The Harbour of the Voyages, 1870: the iron-and-glass Palace of the Exposition before you, steamers at the quays, a balloon tugging at its ropes on the field. Every voyage starts here: the <b>Reform Club</b> (round the world in eighty days), the <b>Nautilus</b> in her sea cave east of the harbour (Captain Nemo's tour), the harbour master's boats to <b>Lincoln Island</b>, the station's trains to <b>Iceland</b> and <b>Florida</b>, the <b>balloon field</b> and <b>Robur's mast</b>, and <b>Verne's house</b> with its library. Everywhere is <b>Safe</b> except the Deep, the Underground beyond the camp, and the wild west of the island. The 🧭 Verne menu has the rest.");
},
function () { if (!(typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()))
return; cityRpc("verne_state", {}).then(function (o) { if (o && o.ok !== false) {
VRN.state = o;
var R = {}, off = o.off || [];
Object.keys(VRN_PAY).forEach(function (k) { R[k] = { on: o.on !== false && off.indexOf(k) < 0, gold: o.gold && o.gold[k] !== undefined ? +o.gold[k] : VRN_PAY[k][1] }; });
VRN.rules = R;
} }).catch(function () { }); },
function () {
for (var k in VRN.mats) {
var m = VRN.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in VRN.tex) {
var x = VRN.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
["G", "grid", "agrid", "ugrid", "sgrid", "sea", "lake", "landTiles", "treeTiles", "deepTiles", "deepKinds", "outside", "sub", "dockNautilus", "fieldBalloon", "mastAlbatross", "rwGroup", "rwObsG", "rwObs", "spGroup", "spEarth", "spMoon", "schools", "streaks", "puffG", "isMark", "isWins", "isDoor", "isLift", "isRim", "isCorral", "isMill", "isBoat", "isCrate", "isWire", "isWireLine", "isTargets", "isFolk", "isFire", "ugStream", "ugRaft", "ugRock", "ugRockS", "ugHerd", "ugGiant", "ugSea", "snfChim", "snfShadow", "snfPeak", "stoneShell", "tank", "testField"].forEach(function (k) { VRN[k] = null; });
VRN.mats = {};
VRN.tex = {};
VRN.solids = [];
VRN.floors = [];
VRN.spots = [];
VRN.talk = [];
VRN.people = [];
VRN.fx = [];
VRN.districts = [];
VRN.smokers = [];
VRN.puffs = [];
VRN.built = false;
for (var i in VRN_IN) {
VRN_IN[i].built = false;
VRN_IN[i].grp = null;
}
VRN_TREE = {};
VRN_RIP = null;
},
function () {
var keeper = typeof amKeeper === "function" && amKeeper(), b = "", fns = {}, d = vrnData();
var rows = [["Where", "The Harbour of the Voyages (where you arrive), the Nautilus and the Deep, Lincoln Island, Iceland and the Underground, Stone's Hill in Florida, Africa (by balloon), the world line (for the race)"],
["To do", "Race round the world in eighty days; Captain Nemo's tour and the Nautilus's wheel; the Engineer's Ladder on the Mysterious Island; the Journey to the Centre of the Earth; the Moon gun; the balloon over Africa; the Albatross; the Library, lessons and the Fellowship exam; four inventor's benches"],
["Danger", "Safe everywhere but the Deep, the Underground beyond the camp, and the island's wild west (Dangerous)"],
["Yours so far", Object.keys(d.lessons).length + " of " + VRN_LESSONS.length + " lessons, Engineer's Ladder " + Math.min(d.isl || 0, 12) + " of 12, " + d.designs.length + " working design" + (d.designs.length === 1 ? "" : "s") + (d.raceBest ? ", best race " + vrnDays(d.raceBest) : "") + (d.fellow ? ", a Fellow of the Society" : "")]];
if (WLD.on === VRN_KEY) {
if (VRN.ride && VRN.ride.k !== "race") {
b += worldBtn("off", "🛬 Get off", "");
fns.off = function () { worldCard(null); vrnRideOff(); };
}
if (VRN.dive) {
b += worldBtn("undive", "🤿 Take off the diving suit", "");
fns.undive = function () { worldCard(null); vrnDive(false); };
}
else if (VRN.zone !== "inside") {
b += worldBtn("dive", "🤿 Put on a diving suit", "Walk on the sea bed");
fns.dive = function () { worldCard(null); vrnDive(true); };
}
if (!VRN.ride && VRN.zone === "inside" && VRN.insideOf && VRN.insideOf.out) {
b += worldBtn("out", "Go back outside", "Out of " + esc(VRN.insideOf.name));
fns.out = function () { vrnLeave(VRN.insideOf.key); };
}
b += worldBtn("voy", "🧭 The voyages", "Where each one starts");
fns.voy = function () { vrnVoyagesCard(); };
b += worldBtn("lib", "📚 The Library and the lessons", "The 54 Voyages, his life, twelve lessons");
fns.lib = function () { vrnLibCard(); };
b += worldBtn("board", "📜 The race board", "This week's best and all time");
fns.board = function () { vrnRaceBoard(); };
b += worldBtn("home", "Leave " + VRN_NAME, "Back to where you came from");
fns.home = function () { worldCard(null); vrnHome(); };
}
else {
if (!WLD.on) {
b += worldBtn("go", "Go to " + VRN_NAME, "Arrive on the Quay of the Voyages");
fns.go = function () { worldCard(null); vrnGo({}); };
}
if (!WLD.on && typeof toHall === "function") {
b += worldBtn("hall", "Take me to the Hall of Doors", "Its door is an iron hatch with a porthole, under a ship's wheel");
fns.hall = function () { worldCard(null); toHall(); };
}
if (keeper && WLD.on) {
b += worldBtn("kgo", "Go now (Keeper)", "Straight to the Quay of the Voyages");
fns.kgo = function () { worldCard(null); vrnGo({}); };
}
}
worldCard(worldFacts("🧭 " + VRN_NAME, "The Extraordinary Voyages of Jules Verne, from his own books", rows, []) + b, fns);
},
function (col) {
var k = String(col);
if (VRN_AWN[k])
return VRN_AWN[k];
var hx = "#" + ("000000" + col.toString(16)).slice(-6), t = wTex(64, 16, function (x, W, H) { for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#EEE6D4" : hx;
x.fillRect(i * W / 8, 0, W / 8, H);
} x.fillStyle = "rgba(0,0,0,.12)"; x.fillRect(0, H - 3, W, 3); });
return (VRN_AWN[k] = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
},
function (x, z, y, r) {
if (vrnWaterAt(x, z) !== null)
return false;
for (var a = 0; a < 8; a++) {
var px = x + Math.cos(a * 0.785) * r, pz = z + Math.sin(a * 0.785) * r;
if (vrnSolidAt(px, pz, y + 0.5))
return false;
if (Math.abs(vrnLand(px, pz) - y) > 1.0)
return false;
}
if (vrnSolidAt(x, z, y + 0.5))
return false;
if (typeof vrnInsideWalk === "function" && vrnInsideWalk(x, z))
return false;
return true;
},
function (D, x, y, z, ry, fill) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
D.add(g);
vrnBoxM(0.6, 0.32, 0.42, vrnSwWood(), 0, 0.16, 0, g);
if (fill !== undefined) {
var R = wRand((x * 7 + z * 13) | 0), m = vrnC(fill);
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
var W = vrnSwWood(), cols = [0xA83A2A, 0x2A5A8A, 0x3A6A3A, 0xB88A2A], fruit = [0xE8902A, 0xC8342A, 0x8AB83A, 0x6A2A5A, 0xE8C84A, 0x5A8A2A];
vrnBoxM(2.6, 0.9, 1.1, W, 0, 0.45, 0, g);
vrnBoxM(2.7, 0.06, 1.2, W, 0, 0.92, 0, g);
[[-1.25, -0.5], [1.25, -0.5], [-1.25, 0.5], [1.25, 0.5]].forEach(function (p) { vrnBoxM(0.09, 2.3, 0.09, W, p[0], 1.15, p[1], g); });
var aw = new THREE.Mesh((function () { var g = new THREE.PlaneGeometry(2.9, 1.7); g.rotateX(-Math.PI / 2); return g; })(), vrnSwAwnMat(cols[seed % 4]));
aw.position.set(0, 2.32, 0.15);
aw.rotation.x = 0.22;
g.add(aw);
for (var c = 0; c < 3; c++)
vrnSwCrate(g, -0.85 + c * 0.85, 0.95, -0.05, 0, fruit[(seed + c) % 6]);
vrnSwCrate(g, 1.7, 0, 0.2, 0.4, fruit[(seed + 3) % 6]);
vrnSwCrate(g, 1.7, 0.32, 0.2, 0.3);
vrnSolid({ x: x, z: z, hw: 1.45, hd: 0.7, rot: ry, h: 2.4, b: y });
},
function (D, x, z, y) {
var S = vrnSwStone(), W = vrnSwWood();
var r = wCyl(0.95, 1.0, 0.85, S, x, y + 0.42, z, D, VRN.lite ? 10 : 18);
var top = wCyl(1.02, 1.02, 0.1, S, x, y + 0.88, z, D, VRN.lite ? 10 : 18);
wCyl(0.8, 0.8, 0.02, vrnC(0x1E2A2A), x, y + 0.8, z, D, 14);
[-1, 1].forEach(function (s) { vrnBoxM(0.12, 1.6, 0.12, W, x + s * 0.85, y + 1.6, z, D); });
var ax = wCyl(0.06, 0.06, 1.8, W, x, y + 2.3, z, D, 6);
ax.rotation.z = Math.PI / 2;
wCyl(0.16, 0.13, 0.26, vrnC(0x6A4A2A), x + 0.2, y + 1.3, z, D, 8);
vrnSolid({ x: x, z: z, r: 1.1, h: 1, b: y });
},
function (D, x, z, y, ry, load) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = vrnSwWood(), iron = vrnC(0x3A3632);
vrnBoxM(1.4, 0.1, 2.4, W, 0, 0.75, 0, g);
[-1, 1].forEach(function (s) { vrnBoxM(0.06, 0.35, 2.4, W, s * 0.68, 0.95, 0, g); });
vrnBoxM(1.4, 0.35, 0.06, W, 0, 0.95, 1.18, g);
[-1, 1].forEach(function (s) {
var wh = wCyl(0.6, 0.6, 0.08, W, s * 0.8, 0.6, 0.2, g, VRN.lite ? 10 : 16);
wh.rotation.z = Math.PI / 2;
var tr = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.035, 5, VRN.lite ? 10 : 18), iron);
tr.position.set(s * 0.84, 0.6, 0.2);
tr.rotation.y = Math.PI / 2;
g.add(tr);
var sh = vrnBoxM(0.07, 0.07, 2.2, W, s * 0.45, 0.6, -2.1, g);
sh.rotation.x = -0.12;
});
if (load === "hay") {
var h = wSph(0.8, vrnSurf(null, 0xC8A858, 1), 0, 1.2, 0, g, VRN.lite ? 8 : 12);
h.scale.set(0.85, 0.55, 1.4);
}
else if (load === "barrels") {
[[-0.35, -0.5], [0.35, -0.5], [0, 0.5]].forEach(function (p) { wCyl(0.3, 0.3, 0.7, W, p[0], 1.15, p[1], g, 10); });
}
else {
[[-0.3, -0.6], [0.3, -0.4], [0, 0.4], [-0.3, 0.7]].forEach(function (p, i) { vrnSwCrate(g, p[0], 0.8, p[1], i * 0.3, [0xE8902A, 0x8AB83A, 0xC8342A][i % 3]); });
}
vrnSolid({ x: x, z: z, hw: 0.9, hd: 1.3, rot: ry, h: 1.6, b: y });
},
function (D, x, z, y, n) {
var W = vrnSwWood(), hoop = vrnC(0x3A3632);
for (var i = 0; i < n; i++) {
var a = i * 2.1, px = x + Math.cos(a) * 0.45 * (i ? 1 : 0), pz = z + Math.sin(a) * 0.45 * (i ? 1 : 0);
var b = wCyl(0.3, 0.3, 0.85, W, px, y + 0.42, pz, D, 10);
[0.15, 0.7].forEach(function (h) { wCyl(0.31, 0.31, 0.05, hoop, px, y + h, pz, D, 10); });
}
vrnSolid({ x: x, z: z, r: 0.8, h: 0.9, b: y });
},
function (D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var m = vrnSurf("wood", 0x8A6A48, 0.6);
for (var r = 0; r < 3; r++)
for (var i = 0; i < 5 - r; i++) {
var l = wCyl(0.13, 0.13, 1.6, m, -0.55 + i * 0.27 + r * 0.13, 0.13 + r * 0.24, 0, g, 7);
l.rotation.x = Math.PI / 2;
}
vrnSolid({ x: x, z: z, hw: 0.8, hd: 0.9, rot: ry, h: 0.8, b: y });
},
function (D, x, z, y, kind) {
var pot = vrnC(0xB0603A);
wCyl(0.42, 0.32, 0.6, pot, x, y + 0.3, z, D, 12);
wCyl(0.45, 0.45, 0.06, pot, x, y + 0.6, z, D, 12);
wCyl(0.05, 0.07, 0.9, vrnC(0x5A4632), x, y + 1.0, z, D, 6);
var cr = wSph(0.62, vrnLeafMat(kind === "bay" ? 0x3A5A2A : 0x4A6A2E), x, y + 1.75, z, D, VRN.lite ? 8 : 12);
cr.scale.y = 0.9;
if (kind !== "bay") {
var R = wRand((x * 3 + z) | 0);
for (var i = 0; i < (VRN.lite ? 4 : 9); i++) {
var a = R() * 6.28, e = (R() - 0.3) * 1.2;
wSph(0.06, vrnC(0xF0C83A), x + Math.cos(a) * 0.55 * Math.cos(e), y + 1.75 + Math.sin(e) * 0.5, z + Math.sin(a) * 0.55 * Math.cos(e), D, 6);
}
}
vrnSolid({ x: x, z: z, r: 0.5, h: 1.2, b: y });
},
function (D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = vrnSurf("wood", 0x7A6448, 0.8), lf = vrnLeafMat(0x4A6A2A);
for (var r = 0; r < 3; r++) {
for (var p = 0; p < 5; p++) {
vrnBoxM(0.07, 1.5, 0.07, W, -4 + p * 2, 0.75, r * 2.2, g);
var v = wSph(0.55, lf, -4 + p * 2, 1.15, r * 2.2, g, 7);
v.scale.set(1.6, 0.7, 0.6);
}
vrnSolid({ x: x + Math.sin(ry) * r * 2.2, z: z + Math.cos(ry) * r * 2.2, hw: 4.2, hd: 0.4, rot: ry, h: 1.6, b: y });
}
},
function (D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = vrnSwWood(), iron = vrnC(0x4A4642);
vrnBoxM(2.4, 0.08, 0.9, W, 0, 0.85, 0, g);
[[-1, -0.35], [1, -0.35], [-1, 0.35], [1, 0.35]].forEach(function (p) { vrnBoxM(0.08, 0.85, 0.08, W, p[0], 0.42, p[1], g); });
var gear = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 5, 12), W);
gear.position.set(-0.6, 0.95, 0);
gear.rotation.x = Math.PI / 2;
g.add(gear);
vrnBoxM(0.9, 0.05, 0.12, iron, 0.4, 0.92, 0.1, g);
wCyl(0.05, 0.05, 0.8, W, 0.3, 0.92, -0.2, g, 6).rotation.z = Math.PI / 2;
vrnSolid({ x: x, z: z, hw: 1.25, hd: 0.5, rot: ry, h: 1, b: y });
},
function (D, T, cx, cz, r0, r1, list, seed, folk) {
var R = wRand(seed), y = T.y, lite = VRN.lite, made = 0, want = lite ? Math.ceil(list.length * 1.5) : list.length * 3;
for (var i = 0, tries = 0; made < want && tries < want * 30; tries++) {
var kind = list[made % list.length], a = R() * Math.PI * 2, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
var need = kind === "stall" || kind === "cart" || kind === "vines" || kind === "hay" || kind === "timber" ? 3.2 : kind === "cypress" || kind === "olive" ? 2 : 1.6;
if (kind === "vines")
need = 5.5;
var gy = vrnLand(x, z);
if (Math.abs(gy - y) > 1.0)
continue;
if (!vrnSwFree(x, z, gy, need))
continue;
var face = Math.atan2(cx - x, cz - z);
switch (kind) {
case "stall":
vrnSwStall(D, x, z, gy, face, seed + made);
break;
case "well":
vrnSwWell(D, x, z, gy);
break;
case "cart":
vrnSwCart(D, x, z, gy, face + 1.2, ["hay", "barrels", "crates"][made % 3]);
break;
case "barrels":
vrnSwBarrels(D, x, z, gy, 3);
break;
case "hay":
vrnSwHay(D, x, z, gy);
break;
case "wood":
vrnSwWoodpile(D, x, z, gy, face);
break;
case "bench":
vrnSwBench(D, x, z, gy, face);
break;
case "lemon":
vrnSwPotTree(D, x, z, gy, "lemon");
break;
case "bay":
vrnSwPotTree(D, x, z, gy, "bay");
break;
case "cypress":
vrnSwCypress(D, x, z, gy, 7 + R() * 5);
break;
case "olive":
vrnSwOlive(D, x, z, gy, R);
break;
case "vines":
vrnSwVines(D, x, z, gy, face);
break;
case "trestle":
vrnSwTrestle(D, x, z, gy, face);
break;
case "timber":
vrnSwTimber(D, x, z, gy, face);
break;
case "crates":
vrnSwCrate(D, x, gy, z, face, [0xE8902A, 0x8AB83A, 0xC8342A][made % 3]);
vrnSwCrate(D, x + 0.7, gy, z + 0.2, face + 0.3);
vrnSolid({ x: x + 0.35, z: z + 0.1, r: 0.7, h: 0.4, b: gy });
break;
}
made++;
}
var nf = lite ? (folk || 0) : (folk || 0) * 2;
for (var f = 0, ft = 0; f < nf && ft < nf * 20; ft++) {
var a2 = R() * Math.PI * 2, d2 = r0 + R() * (r1 - r0), fx = cx + Math.cos(a2) * d2, fz = cz + Math.sin(a2) * d2, fy = vrnLand(fx, fz);
if (Math.abs(fy - y) > 1.0 || !vrnSwFree(fx, fz, fy, 0.8))
continue;
vrnFolk(D, seed * 3 + f, fx, fz, { y: fy, r: Math.min(12, r1 * 0.5) });
f++;
}
return made;
},
function (name, D) {
var T;
if (name === "vrn-harbour") {
T = { y: VRN_TOWN.y };
vrnSwScatter(D, { y: vrnLand(86, 39) }, 86, 39, 6, 40, ["stall", "barrels", "crates", "stall", "bench", "cart", "bay", "stall", "barrels", "well", "crates", "bench"], 1863, 12);
vrnSwScatter(D, { y: vrnLand(755, 166) }, 755, 166, 6, 40, ["barrels", "crates", "cart", "barrels", "stall", "crates", "bench", "barrels", "cart"], 1864, 9);
vrnSwScatter(D, { y: vrnLand(686, -46) }, 686, -46, 6, 36, ["stall", "bench", "bay", "stall", "crates", "barrels", "cart", "stall", "bench"], 1865, 10);
vrnSwScatter(D, { y: vrnLand(-201, 106) }, -201, 106, 6, 40, ["barrels", "crates", "cart", "stall", "bench", "barrels", "crates", "bay", "stall"], 1866, 10);
vrnSwScatter(D, { y: vrnLand(421, 98) }, 421, 98, 6, 40, ["stall", "barrels", "crates", "bench", "cart", "stall", "bay", "barrels", "crates"], 1867, 10);
}
else if (name === "vrn-snaef") {
var V = VRN_SNF.village;
vrnSwScatter(D, { y: vrnLand(200, -2284) }, 200, -2284, 6, 70, ["hay", "wood", "cart", "well", "hay", "barrels", "wood", "bench", "crates", "hay"], 1864, 8);
}
else if (name === "vrn-island") {
vrnSwScatter(D, { y: vrnLand(-2528, 776) }, -2528, 776, 6, 60, ["wood", "timber", "trestle", "barrels", "wood", "crates", "timber", "trestle", "hay"], 1865, 5);
}
else if (name === "vrn-stone") {
vrnSwScatter(D, { y: vrnLand(3226, -1072) }, 3226, -1072, 8, 90, ["timber", "trestle", "barrels", "cart", "timber", "trestle", "crates", "wood", "barrels", "cart", "timber"], 1866, 10);
}
}
];
});
