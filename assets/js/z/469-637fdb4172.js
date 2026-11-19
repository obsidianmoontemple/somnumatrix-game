/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(469, function () {
"use strict";
return [
function (x, z) {
var w = vnoise(x / 260 + 3.1, z / 260 - 7.7), w2 = vnoise(x / 120 - 9.3, z / 120 + 4.1), d = Math.sqrt(x * x + z * z);
var amp = (0.8 + edsSm((w - 0.28) / 0.38) * 8.2) * (1 + edsSm((d - 330) / 300) * 0.9);
var u = (x * 0.82 + z * 0.57) / 84 + w2 * 1.6 + w * 2.4, f = u - Math.floor(u);
var p = f < 0.72 ? Math.pow(f / 0.72, 1.7) : Math.pow((1 - f) / 0.28, 1.25);
var u2 = (z * 0.86 - x * 0.5) / 31 + w * 3, f2 = u2 - Math.floor(u2), p2 = f2 < 0.7 ? f2 / 0.7 : (1 - f2) / 0.3;
return amp * p + 0.5 * p2 * edsSm((w2 - 0.2) / 0.4) + (vnoise(x / 9, z / 9) - 0.5) * 0.22 + (vnoise(x / 420 + 11, z / 420) - 0.5) * 5;
},
function (x, z, keep, segs) {
var m = 1, i, c, d;
for (i = 0; i < keep.length; i++) {
c = keep[i];
d = Math.sqrt((x - c[0]) * (x - c[0]) + (z - c[1]) * (z - c[1])) - c[2];
if (d < c[3]) {
if (d <= 0)
return 0;
d = edsSm(d / c[3]);
if (d < m)
m = d;
}
}
for (i = 0; i < segs.length; i++) {
c = segs[i];
if (x < c[6] || x > c[7] || z < c[8] || z > c[9])
continue;
d = edsSegD(x, z, c[0], c[1], c[2], c[3]) - c[4];
if (d < c[5]) {
if (d <= 0)
return 0;
d = edsSm(d / c[5]);
if (d < m)
m = d;
}
}
return m;
},
function (x, z, keep, segs) {
var e = Math.max(Math.abs(x), Math.abs(z)), H = EDS.half, m, h;
if (e <= H) {
m = edsMask(x, z, keep, segs) * (1 - edsSm((e - (H - 80)) / 74));
}
else
m = edsSm((e - H) / 110);
h = m > 0 ? edsDune(x, z) * m : 0;
for (var i = 0; i < EDS_DIPS.length; i++) {
var c = EDS_DIPS[i], dx = x - c[0], dz = z - c[1], q = (dx * dx + dz * dz) / (c[2] * c[2]);
if (q < 1) {
q = 1 - q;
h -= c[3] * q * q;
}
}
return h;
},
function (g, n, half, step, x, z) {
var fx = (x + half) / step, fz = (z + half) / step, ix = Math.floor(fx), iz = Math.floor(fz);
if (ix < 0) {
ix = 0;
fx = 0;
}
else if (ix >= n) {
ix = n - 1;
fx = n;
}
if (iz < 0) {
iz = 0;
fz = 0;
}
else if (iz >= n) {
iz = n - 1;
fz = n;
}
fx -= ix;
fz -= iz;
var w = n + 1, a = g[iz * w + ix], b = g[(iz + 1) * w + ix], c = g[(iz + 1) * w + ix + 1], d = g[iz * w + ix + 1];
return fx + fz <= 1 ? a + (d - a) * fx + (b - a) * fz : c + (b - c) * (1 - fx) + (d - c) * (1 - fz);
},
function (g, n, half, step, skipInside, tintFn) {
var w = n + 1, pos = new Float32Array(w * w * 3), uv = new Float32Array(w * w * 2), col = new Float32Array(w * w * 3), idx = [], ix, iz, k = 0;
for (iz = 0; iz < w; iz++)
for (ix = 0; ix < w; ix++, k++) {
var x = -half + ix * step, z = -half + iz * step, h = g[k];
pos[k * 3] = x;
pos[k * 3 + 1] = h;
pos[k * 3 + 2] = z;
uv[k * 2] = x;
uv[k * 2 + 1] = z;
var hx = g[iz * w + Math.min(n, ix + 1)] - g[iz * w + Math.max(0, ix - 1)], hz = g[Math.min(n, iz + 1) * w + ix] - g[Math.max(0, iz - 1) * w + ix];
var sl = Math.min(1, Math.sqrt(hx * hx + hz * hz) / (step * 1.1)), up = Math.max(0, Math.min(1, (h + 1) / 11));
var lee = Math.max(0, Math.min(1, (hx * 0.82 + hz * 0.57) / (-step * 0.9)));
var R = 0.905 + up * 0.07 - sl * 0.10 - lee * 0.03, G = 0.775 + up * 0.07 - sl * 0.12 - lee * 0.07, B = 0.53 + up * 0.06 - sl * 0.12 - lee * 0.09;
var gr = (vnoise(x / 3.1, z / 3.1) - 0.5) * 0.035;
R += gr;
G += gr;
B += gr;
var T = tintFn ? tintFn(x, z, h) : null;
if (T) {
R += (T[0] - R) * T[3];
G += (T[1] - G) * T[3];
B += (T[2] - B) * T[3];
}
col[k * 3] = R;
col[k * 3 + 1] = G;
col[k * 3 + 2] = B;
}
for (iz = 0; iz < n; iz++)
for (ix = 0; ix < n; ix++) {
if (skipInside !== null) {
var x0 = -half + ix * step, z0 = -half + iz * step;
if (x0 >= -skipInside - 0.01 && x0 + step <= skipInside + 0.01 && z0 >= -skipInside - 0.01 && z0 + step <= skipInside + 0.01)
continue;
}
var a = iz * w + ix, b = (iz + 1) * w + ix, c = b + 1, d = a + 1;
idx.push(a, b, d, b, c, d);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.setIndex(new THREE.BufferAttribute(w * w > 65535 ? new Uint32Array(idx) : new Uint16Array(idx), 1));
geo.computeVertexNormals();
geo.computeBoundingSphere();
return geo;
},
function (r) {
if (!scene || !r)
return;
var sig = edsSigOf(r);
if (EDS.rid === r.id && EDS.sig === sig && EDS.mesh && realmGrounds[r.id] === EDS.mesh)
return;
(store.objects || []).filter(function (o) { return (o.realm || 0) === r.id && o.scenery && !o.label && (o.archetype === "dune" || o.archetype === "oasis"); }).forEach(function (o) { try {
removeSpec(o);
}
catch (e) { } });
sig = edsSigOf(r);
var o = edsOrigin(r), lite = edsLite();
EDS.rid = r.id;
EDS.ox = o.x;
EDS.oz = o.z;
EDS.sig = sig;
EDS.step = lite ? 9 : 4.5;
EDS.n = Math.round(EDS.half * 2 / EDS.step);
EDS.on = Math.round(EDS.ohalf * 2 / EDS.ostep);
var keep = EDS_FLAT.map(function (c) { return [c[0], c[1], c[2], c[3] || 40]; });
(store.objects || []).forEach(function (q) {
if ((q.realm || 0) !== r.id)
return;
var d = KIT[q.archetype];
if (!d)
return;
var rad = d.cat === "being" ? 3 : Math.min(60, Math.max(d.size[0], d.size[2]) * ((q.attrs && q.attrs.s) || 1) * 0.6 + 6);
keep.push([q.x - o.x, q.z - o.z, rad, 34]);
});
var segs = [];
EDS_ROADS.forEach(function (R) {
for (var i = 1; i < R.pts.length; i++) {
var a = R.pts[i - 1], b = R.pts[i], m = R.hw + R.f;
segs.push([a[0], a[1], b[0], b[1], R.hw, R.f, Math.min(a[0], b[0]) - m, Math.max(a[0], b[0]) + m, Math.min(a[1], b[1]) - m, Math.max(a[1], b[1]) + m]);
}
});
var n = EDS.n, w = n + 1, g = new Float32Array(w * w), ix, iz, H = EDS.half, st = EDS.step;
for (iz = 0; iz < w; iz++)
for (ix = 0; ix < w; ix++) {
var onRim = (ix === 0 || iz === 0 || ix === n || iz === n);
g[iz * w + ix] = onRim ? 0 : edsRawH(-H + ix * st, -H + iz * st, keep, segs);
}
var on = EDS.on, ow = on + 1, og = new Float32Array(ow * ow), OH = EDS.ohalf, os = EDS.ostep;
for (iz = 0; iz < ow; iz++)
for (ix = 0; ix < ow; ix++) {
var x = -OH + ix * os, z = -OH + iz * os;
og[iz * ow + ix] = (Math.max(Math.abs(x), Math.abs(z)) <= H + 0.01) ? 0 : edsRawH(x, z, keep, segs);
}
EDS.h = g;
EDS.oh = og;
var old = realmGrounds[r.id];
if (old) {
scene.remove(old);
if (old.userData.eds)
old.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); });
}
var t = realmTemplate(r), tx = (typeof landOpt !== "function" || landOpt("detail")) && typeof texOf === "function" ? texOf("sand") : null;
var mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true, map: tx, polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 4 });
var tint = function (x, z, h) {
var best = null;
for (var i = 0; i < EDS_DIPS.length; i++) {
var c = EDS_DIPS[i];
if (!c[4])
continue;
var d = Math.sqrt((x - c[0]) * (x - c[0]) + (z - c[1]) * (z - c[1]));
if (d < c[2] + c[4]) {
var k = 1 - edsSm((d - c[2] * 0.75) / (c[2] * 0.25 + c[4]));
if (!best || k > best[3])
best = [0.42 + 0.1 * vnoise(x / 5, z / 5), 0.47, 0.25, k * 0.85];
}
}
return best;
};
var G = new THREE.Group();
G.userData.realmGround = r.id;
G.userData.eds = 1;
G.position.set(o.x, -0.05, o.z);
var m1 = new THREE.Mesh(edsSheet(g, n, H, st, null, tint), mat);
m1.receiveShadow = true;
G.add(m1);
var m2 = new THREE.Mesh(edsSheet(og, on, OH, os, H, null), mat);
m2.receiveShadow = true;
G.add(m2);
scene.add(G);
realmGrounds[r.id] = G;
EDS.mesh = G;
},
function (key, W, H, tile, fn, o) {
if (EDS_TEX[key])
return EDS_TEX[key];
if (typeof document === "undefined")
return null;
var c = document.createElement("canvas");
c.width = W;
c.height = H;
var x = c.getContext("2d");
if (!x)
return null;
try {
fn(x, W, H);
}
catch (e) {
if (window.console)
console.warn("[endless-desert] picture", key, e);
return null;
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (tile)
t.repeat.set(1 / tile, 1 / (o && o.tileV || tile));
if (typeof renderer !== "undefined" && renderer && renderer.capabilities)
t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
return (EDS_TEX[key] = t);
},
function (c) {
c.beginPath();
c.moveTo(-0.36, -0.02);
c.quadraticCurveTo(0, -0.26, 0.36, -0.02);
c.quadraticCurveTo(0, 0.16, -0.36, -0.02);
c.stroke();
c.beginPath();
c.arc(0, -0.04, 0.09, 0, 6.283);
c.fill();
c.beginPath();
c.moveTo(-0.4, -0.2);
c.quadraticCurveTo(0, -0.42, 0.42, -0.16);
c.stroke();
c.beginPath();
c.moveTo(-0.02, 0.1);
c.lineTo(-0.06, 0.38);
c.stroke();
c.beginPath();
c.moveTo(0.08, 0.08);
c.quadraticCurveTo(0.34, 0.3, 0.2, 0.4);
c.quadraticCurveTo(0.1, 0.42, 0.12, 0.32);
c.stroke();
},
function (c) {
c.beginPath();
c.ellipse(-0.04, 0.06, 0.2, 0.15, -0.25, 0, 6.283);
c.fill();
c.beginPath();
c.arc(0.16, -0.18, 0.1, 0, 6.283);
c.fill();
c.beginPath();
c.moveTo(0.24, -0.2);
c.lineTo(0.38, -0.15);
c.lineTo(0.24, -0.12);
c.fill();
c.beginPath();
c.moveTo(-0.04, 0.18);
c.lineTo(-0.04, 0.42);
c.lineTo(0.08, 0.42);
c.moveTo(0.06, 0.16);
c.lineTo(0.08, 0.4);
c.stroke();
},
function (c) {
c.beginPath();
c.ellipse(-0.04, 0.1, 0.17, 0.25, 0.3, 0, 6.283);
c.fill();
c.beginPath();
c.arc(0.1, -0.24, 0.15, 0, 6.283);
c.fill();
c.beginPath();
c.moveTo(-0.16, 0.26);
c.lineTo(-0.34, 0.42);
c.lineTo(-0.1, 0.36);
c.fill();
c.beginPath();
c.moveTo(0.0, 0.3);
c.lineTo(0.0, 0.44);
c.lineTo(0.12, 0.44);
c.stroke();
c.save();
c.fillStyle = EDS_INK.white;
c.beginPath();
c.arc(0.05, -0.26, 0.04, 0, 6.283);
c.arc(0.16, -0.26, 0.04, 0, 6.283);
c.fill();
c.restore();
},
function (c) {
c.beginPath();
c.ellipse(0, 0.1, 0.19, 0.25, 0, 0, 6.283);
c.fill();
c.beginPath();
c.arc(0, -0.22, 0.11, 0, 6.283);
c.fill();
c.beginPath();
c.moveTo(0, -0.14);
c.lineTo(0, 0.34);
c.moveTo(-0.16, 0);
c.lineTo(-0.36, -0.14);
c.moveTo(0.16, 0);
c.lineTo(0.36, -0.14);
c.moveTo(-0.18, 0.14);
c.lineTo(-0.36, 0.2);
c.moveTo(0.18, 0.14);
c.lineTo(0.36, 0.2);
c.moveTo(-0.12, 0.3);
c.lineTo(-0.26, 0.44);
c.moveTo(0.12, 0.3);
c.lineTo(0.26, 0.44);
c.moveTo(-0.06, -0.32);
c.lineTo(-0.14, -0.44);
c.moveTo(0.06, -0.32);
c.lineTo(0.14, -0.44);
c.stroke();
},
function (c) {
c.beginPath();
c.ellipse(-0.06, 0.08, 0.24, 0.14, -0.35, 0, 6.283);
c.fill();
c.beginPath();
c.moveTo(0.1, -0.02);
c.quadraticCurveTo(0.12, -0.3, 0.24, -0.34);
c.lineTo(0.4, -0.26);
c.lineTo(0.26, -0.24);
c.quadraticCurveTo(0.2, -0.1, 0.18, 0.02);
c.fill();
c.beginPath();
c.moveTo(-0.02, 0.2);
c.lineTo(-0.02, 0.42);
c.lineTo(0.1, 0.42);
c.moveTo(-0.26, 0.16);
c.lineTo(-0.42, 0.36);
c.stroke();
},
function (c) {
c.beginPath();
c.ellipse(-0.08, 0.08, 0.22, 0.1, 0.15, 0, 6.283);
c.fill();
c.beginPath();
c.arc(0.2, 0.0, 0.08, 0, 6.283);
c.fill();
c.beginPath();
c.ellipse(-0.08, -0.14, 0.2, 0.08, -0.5, 0, 6.283);
c.stroke();
c.beginPath();
c.moveTo(-0.1, 0.16);
c.lineTo(-0.14, 0.36);
c.moveTo(0.04, 0.16);
c.lineTo(0.06, 0.36);
c.moveTo(0.26, -0.06);
c.lineTo(0.38, -0.2);
c.stroke();
},
function (c, k, x, y, s, mono) {
k = ((k % EDS_SIGNS.length) + EDS_SIGNS.length) % EDS_SIGNS.length;
c.save();
c.translate(x, y);
c.scale(s, s);
c.lineWidth = 0.065;
c.lineCap = "round";
c.lineJoin = "round";
if (mono) {
c.fillStyle = c.strokeStyle = "rgba(255,244,214,.55)";
c.save();
c.translate(0.035, 0.035);
EDS_SIGNS[k](c);
c.restore();
c.fillStyle = c.strokeStyle = mono;
EDS_SIGNS[k](c);
}
else {
c.fillStyle = c.strokeStyle = "rgba(40,26,14,.5)";
c.save();
c.translate(0.03, 0.03);
EDS_SIGNS[k](c);
c.restore();
c.fillStyle = c.strokeStyle = EDS_INK[EDS_SIGNCOL[k]];
EDS_SIGNS[k](c);
}
c.restore();
},
function (c, x, y, w, h, R, mono) {
c.save();
c.lineWidth = Math.max(2, w * 0.09);
c.strokeStyle = mono || EDS_INK.black;
c.fillStyle = mono ? "rgba(0,0,0,0)" : "#F2DFA6";
var r = w / 2;
c.beginPath();
c.moveTo(x - r, y + r);
c.arc(x, y + r, r, Math.PI, 0);
c.lineTo(x + r, y + h - r);
c.arc(x, y + h - r, r, 0, Math.PI);
c.closePath();
c.fill();
c.stroke();
c.fillStyle = mono || EDS_INK.black;
c.fillRect(x - r - w * 0.12, y + h + 1, w * 1.24, Math.max(2, w * 0.1));
c.restore();
var n = Math.max(2, Math.floor((h - w * 0.5) / (w * 0.72)));
for (var i = 0; i < n; i++)
edsSign(c, Math.floor(R() * 32), x, y + w * 0.52 + i * ((h - w * 0.9) / n) + w * 0.1, w * 0.62, mono);
},
function (c, x, y, w, h, R, mono) {
var s = w * 0.8, n = Math.floor(h / (s * 1.02)), i = 0;
while (i < n) {
var yy = y + (i + 0.5) * (h / n), k = Math.floor(R() * 32);
if (R() < 0.18 && i < n - 1) {
edsSign(c, k, x - w * 0.21, yy, s * 0.52, mono);
edsSign(c, Math.floor(R() * 32), x + w * 0.21, yy, s * 0.52, mono);
}
else
edsSign(c, k, x, yy, s, mono);
i++;
}
},
function (c, kind, x, y, H, dir, o) {
o = o || {};
var u = H / 100, I = EDS_INK, mono = o.mono;
var god = /anubis|horus|ra|thoth|osiris|isis|hathor|sekhmet|sobek|maat|ptah/.test(kind);
var fem = /woman|queen|isis|hathor|maat|sekhmet/.test(kind), wrapped = /osiris|ptah/.test(kind);
var skin = kind === "osiris" ? "#3D9A5C" : kind === "ptah" ? "#3F9FA6" : fem ? I.skinF : I.skin;
var line = mono || I.black;
c.save();
c.translate(x, y);
c.scale(dir * u, u);
c.lineJoin = "round";
c.lineCap = "round";
var F = function (col) { c.fillStyle = mono ? "rgba(0,0,0,0)" : col; c.strokeStyle = line; c.lineWidth = mono ? 1.6 : 1.1; };
var poly = function (pts, col) { F(col); c.beginPath(); c.moveTo(pts[0], pts[1]); for (var i = 2; i < pts.length; i += 2)
c.lineTo(pts[i], pts[i + 1]); c.closePath(); c.fill(); c.stroke(); };
if (wrapped) {
poly([-9, -72, 9, -72, 8, -30, 6, 0, -8, 0, -9, -30], I.white);
poly([-11, 0, 11, 0, 11, 4, -11, 4], I.green);
}
else if (o.sit) {
poly([-8, -48, 16, -48, 17, -39, -8, -39], fem ? (o.dress || I.white) : I.white);
poly([11, -40, 18, -40, 17, -2, 23, 0, 23, 3, 10, 3], skin);
if (fem)
poly([-8, -48, 17, -48, 18, -10, 10, -10, 10, -39, -8, -39], o.dress || I.white);
}
else if (fem) {
poly([-8, -56, 8, -56, 7, -10, -7, -10], o.dress || I.white);
poly([-6, -10, -1, -10, 0, -1, 6, 0, 6, 3, -7, 3], skin);
poly([1, -10, 6, -10, 7, -1, 12, 0, 12, 3, 1, 3], skin);
}
else {
poly([-9, -50, -2, -50, -9, -3, -3, 0, -3, 3, -16, 3, -15, -3], skin);
poly([0, -50, 8, -50, 13, -3, 20, 0, 20, 3, 7, 3, 7, -3], skin);
poly([-10, -58, 9, -58, 13, -34, -2, -36, -13, -33], o.kilt || I.white);
if (/king|horus|ra|anubis|thoth|sobek/.test(kind))
poly([-2, -56, 3, -56, 6, -36, -3, -36], I.gold);
}
if (!wrapped)
poly([-15, -80, 15, -80, 9, -56, -9, -56], fem && !o.sit ? (o.dress || I.white) : skin);
if (fem && !mono) {
F(o.dress || I.white);
c.fillRect(-9, -70, 18, 14);
}
c.lineWidth = 5.4;
c.strokeStyle = mono ? line : skin;
var arm = function (pts) {
if (!mono) {
c.strokeStyle = I.black;
c.lineWidth = 7;
c.beginPath();
c.moveTo(pts[0], pts[1]);
for (var i = 2; i < pts.length; i += 2)
c.lineTo(pts[i], pts[i + 1]);
c.stroke();
c.strokeStyle = skin;
c.lineWidth = 5.2;
}
else {
c.lineWidth = 3;
}
c.beginPath();
c.moveTo(pts[0], pts[1]);
for (var j = 2; j < pts.length; j += 2)
c.lineTo(pts[j], pts[j + 1]);
c.stroke();
};
var pose = o.pose || (god ? "staff" : kind === "bearer" ? "carry" : kind === "scribe" ? "write" : "walk");
if (wrapped) {
arm([-6, -70, 8, -62]);
arm([6, -70, -8, -62]);
}
else if (pose === "staff") {
arm([-14, -78, -17, -58, -13, -44]);
arm([14, -78, 24, -66, 28, -60]);
}
else if (pose === "carry") {
arm([-14, -78, -6, -90, 10, -96]);
arm([14, -78, 20, -90, 16, -97]);
}
else if (pose === "praise") {
arm([-14, -78, 2, -86, 16, -98]);
arm([14, -78, 24, -88, 30, -100]);
}
else if (pose === "write") {
arm([-14, -78, -4, -64, 14, -62]);
arm([14, -78, 20, -66, 22, -60]);
}
else if (pose === "offer") {
arm([-14, -78, 2, -70, 22, -70]);
arm([14, -78, 22, -72, 30, -74]);
}
else if (pose === "lead") {
arm([-14, -78, -22, -64, -30, -56]);
arm([14, -78, 22, -66, 26, -60]);
}
else {
arm([-14, -78, -18, -60, -14, -44]);
arm([14, -78, 19, -62, 15, -46]);
}
c.lineWidth = 1.1;
if (!mono) {
c.fillStyle = I.blue;
c.beginPath();
c.moveTo(-12, -80);
c.quadraticCurveTo(0, -64, 12, -80);
c.closePath();
c.fill();
c.strokeStyle = I.gold;
c.lineWidth = 2;
c.beginPath();
c.moveTo(-11, -78);
c.quadraticCurveTo(0, -66, 11, -78);
c.stroke();
c.strokeStyle = I.red;
c.lineWidth = 1.2;
c.beginPath();
c.moveTo(-9, -79);
c.quadraticCurveTo(0, -70, 9, -79);
c.stroke();
}
F(skin);
c.fillRect(-3, -85, 6, 6);
var hx = 1, hy = -91;
if (kind === "anubis") {
poly([-7, -97, 3, -98, 20, -91, 20, -87, 6, -85, -6, -84], I.black);
poly([-6, -97, -3, -112, 0, -97], I.black);
poly([-1, -97, 3, -111, 5, -96], I.black);
if (!mono) {
c.fillStyle = I.gold;
c.beginPath();
c.arc(6, -93, 1.3, 0, 6.283);
c.fill();
}
poly([-8, -94, -4, -97, -4, -80, -10, -78], I.blue);
}
else if (kind === "horus" || kind === "ra") {
poly([-7, -97, 4, -98, 10, -93, 15, -89, 10, -88, 7, -85, -6, -84], I.white);
F(I.black);
c.beginPath();
c.arc(5, -93, 1.5, 0, 6.283);
c.fill();
c.beginPath();
c.moveTo(5, -91);
c.lineTo(3, -86);
c.stroke();
poly([-8, -95, -3, -98, -3, -80, -10, -78], I.blue);
if (kind === "ra") {
F(I.red);
c.beginPath();
c.arc(1, -107, 8.5, 0, 6.283);
c.fill();
c.stroke();
F(I.gold);
c.lineWidth = 1.8;
c.strokeStyle = mono || I.gold;
c.beginPath();
c.arc(1, -107, 10, Math.PI * 0.9, Math.PI * 2.4);
c.stroke();
}
else {
poly([-6, -98, 7, -98, 10, -104, 4, -106, 2, -122, -4, -122, -7, -106], I.white);
poly([-7, -98, 8, -98, 11, -103, -8, -103], I.red);
poly([-8, -103, -5, -103, -9, -118, -11, -116], I.red);
}
}
else if (kind === "thoth") {
F(I.white);
c.beginPath();
c.ellipse(1, -92, 6, 5.5, 0, 0, 6.283);
c.fill();
c.stroke();
c.strokeStyle = line;
c.lineWidth = 2.2;
c.beginPath();
c.moveTo(6, -93);
c.quadraticCurveTo(18, -93, 20, -80);
c.stroke();
F(I.black);
c.beginPath();
c.arc(3, -93, 1.2, 0, 6.283);
c.fill();
poly([-8, -95, -3, -98, -3, -80, -10, -78], I.blue);
F(I.white);
c.beginPath();
c.arc(0, -104, 5.5, 0, 6.283);
c.fill();
c.stroke();
}
else if (kind === "sobek") {
poly([-7, -97, 4, -98, 22, -93, 22, -89, 6, -86, -6, -84], I.green);
F(I.black);
c.beginPath();
c.arc(4, -94, 1.3, 0, 6.283);
c.fill();
poly([-8, -95, -3, -98, -3, -80, -10, -78], I.blue);
}
else if (kind === "sekhmet") {
F(I.gold);
c.beginPath();
c.arc(1, -92, 7, 0, 6.283);
c.fill();
c.stroke();
poly([6, -93, 11, -91, 6, -88], I.gold);
poly([-5, -98, -2, -103, 1, -98], I.gold);
F(I.black);
c.beginPath();
c.arc(4, -93, 1.2, 0, 6.283);
c.fill();
poly([-8, -95, -3, -98, -3, -78, -10, -76], I.blue);
F(I.red);
c.beginPath();
c.arc(1, -108, 7.5, 0, 6.283);
c.fill();
c.stroke();
}
else {
F(skin);
c.beginPath();
c.moveTo(-5, -98);
c.quadraticCurveTo(2, -101, 6, -97);
c.lineTo(7, -93);
c.lineTo(9.5, -90.5);
c.lineTo(7, -89.5);
c.lineTo(7.6, -87.5);
c.lineTo(6, -85.6);
c.quadraticCurveTo(2, -83.5, -3, -85);
c.closePath();
c.fill();
c.stroke();
if (!mono) {
c.fillStyle = I.white;
c.beginPath();
c.ellipse(3, -93.4, 2.6, 1.3, 0, 0, 6.283);
c.fill();
}
c.fillStyle = line;
c.beginPath();
c.arc(3.3, -93.4, 1.1, 0, 6.283);
c.fill();
c.strokeStyle = line;
c.lineWidth = 0.8;
c.beginPath();
c.moveTo(0.2, -93.4);
c.lineTo(-3, -93.6);
c.moveTo(0, -95.6);
c.quadraticCurveTo(3, -97, 6, -95.4);
c.stroke();
if (kind === "king") {
poly([-8, -96, -4, -101, 5, -101, 7, -97, 2, -97, -2, -92, -3, -80, -11, -78], I.gold);
if (!mono) {
c.strokeStyle = I.blue;
c.lineWidth = 1.3;
for (var s = 0; s < 6; s++) {
c.beginPath();
c.moveTo(-10 + s * 0.3, -80 + (-s * 3.3));
c.lineTo(-3, -82 - s * 3.3);
c.stroke();
}
}
c.strokeStyle = mono || I.gold;
c.lineWidth = 1.6;
c.beginPath();
c.moveTo(6, -98);
c.quadraticCurveTo(11, -100, 9, -104);
c.stroke();
poly([5, -85, 8, -85, 7.4, -78, 5.6, -78], I.blue);
}
else if (kind === "osiris") {
poly([-5, -98, 6, -98, 3, -120, -2, -120], I.white);
poly([-6, -99, -10, -112, -7, -116, -4, -102], I.green);
poly([7, -99, 11, -112, 8, -116, 5, -102], I.green);
poly([5, -85, 8, -85, 8.6, -76, 6, -76], I.black);
}
else if (kind === "ptah") {
F(I.blue);
c.beginPath();
c.arc(0, -93, 7.4, Math.PI * 0.75, Math.PI * 1.98);
c.lineTo(-4, -92);
c.closePath();
c.fill();
c.stroke();
poly([5, -85, 8, -85, 8.6, -74, 6, -74], I.black);
}
else {
F(I.black);
c.beginPath();
c.moveTo(6, -98);
c.quadraticCurveTo(0, -103, -6, -99);
c.quadraticCurveTo(-10, -94, -9, fem ? -74 : -84);
c.lineTo(-3, fem ? -74 : -84);
c.lineTo(-3, -93);
c.quadraticCurveTo(0, -97, 6, -97);
c.closePath();
c.fill();
c.stroke();
if (!mono && (kind === "queen" || fem)) {
c.strokeStyle = I.gold;
c.lineWidth = 1.5;
c.beginPath();
c.moveTo(-7, -97);
c.lineTo(5, -97.6);
c.stroke();
}
if (kind === "queen") {
poly([-5, -101, 5, -101, 7, -106, -7, -106], I.gold);
poly([-3, -106, -1, -118, 1, -106], I.blue);
poly([1, -106, 3, -118, 5, -106], I.blue);
}
if (kind === "isis") {
poly([-4, -102, 4, -102, 4, -105, -1, -105, -1, -116, -4, -116], I.blue);
}
if (kind === "hathor") {
c.strokeStyle = line;
c.lineWidth = 2;
c.beginPath();
c.moveTo(-5, -102);
c.quadraticCurveTo(-9, -112, -5, -118);
c.moveTo(5, -102);
c.quadraticCurveTo(9, -112, 5, -118);
c.stroke();
F(I.red);
c.beginPath();
c.arc(0, -110, 5.5, 0, 6.283);
c.fill();
c.stroke();
}
if (kind === "maat") {
poly([-1, -101, 1, -101, 3, -118, 6, -121, 4, -104], I.green);
}
}
}
c.strokeStyle = mono || I.black;
c.lineWidth = 1.6;
if (wrapped) {
c.strokeStyle = mono || I.gold;
c.lineWidth = 2;
c.beginPath();
c.moveTo(8, -62);
c.lineTo(11, -84);
c.quadraticCurveTo(13, -90, 8, -88);
c.moveTo(-8, -62);
c.lineTo(-10, -86);
c.lineTo(-15, -80);
c.moveTo(-10, -86);
c.lineTo(-13, -78);
c.stroke();
}
else if (pose === "staff") {
c.beginPath();
c.moveTo(28, 3);
c.lineTo(28, -92);
c.lineTo(22, -97);
c.moveTo(28, -92);
c.lineTo(33, -98);
c.stroke();
edsSign(c, 0, -13, -36, 11, mono);
}
else if (pose === "carry") {
poly([0, -100, 26, -100, 24, -96, 2, -96], I.gold);
if (!mono) {
c.fillStyle = "#C98A3A";
c.beginPath();
c.arc(8, -103, 3.5, Math.PI, 0);
c.arc(18, -103, 3.5, Math.PI, 0);
c.fill();
c.fillStyle = I.green;
c.fillRect(12, -108, 2, 6);
}
}
else if (pose === "write") {
poly([12, -66, 26, -64, 25, -56, 11, -58], I.white);
c.beginPath();
c.moveTo(22, -60);
c.lineTo(27, -70);
c.stroke();
}
else if (pose === "offer") {
F(I.blue);
c.beginPath();
c.moveTo(24, -76);
c.lineTo(34, -76);
c.lineTo(32, -66);
c.lineTo(26, -66);
c.closePath();
c.fill();
c.stroke();
}
c.restore();
},
function (c, x, y, s, mono) {
var I = EDS_INK;
c.save();
c.translate(x, y);
c.scale(s, s);
c.lineWidth = 1.2;
c.strokeStyle = mono || I.black;
var f = function (col) { c.fillStyle = mono ? "rgba(0,0,0,0)" : col; };
f(I.white);
c.fillRect(-3, -30, 6, 30);
c.strokeRect(-3, -30, 6, 30);
f(I.gold);
c.fillRect(-22, -34, 44, 5);
c.strokeRect(-22, -34, 44, 5);
[[-15, "#C98A3A"], [-5, "#E0B060"], [6, "#C98A3A"], [15, "#D8A050"]].forEach(function (b) { f(b[1]); c.beginPath(); c.arc(b[0], -34, 5.4, Math.PI, 0); c.fill(); c.stroke(); });
f("#7A2E5A");
for (var i = 0; i < 6; i++) {
c.beginPath();
c.arc(-9 + i % 3 * 3, -43 - Math.floor(i / 3) * 3, 1.9, 0, 6.283);
c.fill();
}
f(I.white);
c.beginPath();
c.ellipse(8, -45, 7, 4, 0, 0, 6.283);
c.fill();
c.stroke();
c.beginPath();
c.moveTo(14, -46);
c.quadraticCurveTo(19, -52, 17, -56);
c.stroke();
f(I.green);
c.beginPath();
c.moveTo(-18, -40);
c.lineTo(-20, -56);
c.lineTo(-16, -56);
c.closePath();
c.fill();
c.stroke();
f(I.red);
[[-30, 0], [30, 0]].forEach(function (j) { c.beginPath(); c.moveTo(j[0] - 4, 0); c.quadraticCurveTo(j[0] - 8, -12, j[0] - 3, -20); c.lineTo(j[0] + 3, -20); c.quadraticCurveTo(j[0] + 8, -12, j[0] + 4, 0); c.closePath(); c.fill(); c.stroke(); });
c.restore();
},
function (c, W, H, o) {
o = o || {};
var R = edsRnd(o.seed || 41), I = EDS_INK, mono = o.mono || null, k = W / 512;
edsGround2d(c, W, H, o.bg || "#EBD6A2", R);
if (!mono) {
edsBand(c, 0, W, 14 * k, [I.blue, I.gold, I.red, I.gold, I.green, I.gold]);
edsBand(c, H - 10 * k, W, 10 * k, [I.red, I.blue, I.green, I.blue]);
}
else {
c.strokeStyle = mono;
c.lineWidth = 2;
c.beginPath();
c.moveTo(0, 8 * k);
c.lineTo(W, 8 * k);
c.moveTo(0, H - 6 * k);
c.lineTo(W, H - 6 * k);
c.stroke();
}
var cast = o.cast || ["king", "hathor", "anubis", "bearer", "thoth", "isis", "horus", "woman"], top = 18 * k, fh = 200 * k, n = o.n || 4, w = W / n;
if (!mono) {
c.fillStyle = I.gold;
c.fillRect(0, top + fh + 8 * k, W, 5 * k);
c.fillStyle = I.black;
c.fillRect(0, top + fh + 7 * k, W, 1.5);
c.fillRect(0, top + fh + 13 * k, W, 1.5);
}
else {
c.strokeStyle = mono;
c.lineWidth = 2;
c.beginPath();
c.moveTo(0, top + fh + 9 * k);
c.lineTo(W, top + fh + 9 * k);
c.stroke();
}
for (var i = 0; i < n; i++) {
var kind = cast[(i + (o.shift || 0)) % cast.length], fx = (i + 0.42) * w;
edsFigure(c, kind, fx, top + fh + 6 * k, (kind === "horus" || kind === "osiris" || kind === "queen" || kind === "ra" || kind === "hathor" || kind === "thoth") ? 150 * k : 172 * k, 1, { mono: mono, dress: [I.white, I.red, I.green, I.white][i % 4] });
for (var g = 0; g < 3; g++)
edsSign(c, Math.floor(R() * 32), (i + 0.78) * w, top + 24 * k + g * 24 * k, 20 * k, mono);
if (i % 2 === 1)
edsCartouche(c, (i + 0.1) * w, top + 10 * k, 22 * k, 70 * k, R, mono);
}
var y0 = top + fh + 20 * k, y1 = H - (mono ? 10 : 14) * k, cols = o.cols || 12, cw = W / cols;
c.strokeStyle = mono || "rgba(28,22,18,.85)";
c.lineWidth = 1.3;
for (var q = 0; q < cols; q++) {
c.beginPath();
c.moveTo(q * cw + 0.5, y0);
c.lineTo(q * cw + 0.5, y1);
c.stroke();
if (q % 5 === 2)
edsCartouche(c, (q + 0.5) * cw, y0 + 6 * k, cw * 0.7, (y1 - y0) * 0.62, R, mono), edsColumn(c, (q + 0.5) * cw, y0 + (y1 - y0) * 0.7, cw, (y1 - y0) * 0.3, R, mono);
else
edsColumn(c, (q + 0.5) * cw, y0 + 3 * k, cw, y1 - y0 - 6 * k, R, mono);
}
},
function (name) {
var I = EDS_INK;
switch (name) {
case "hiero": return edsCanvasTex("eds_hiero", 1024, 1024, 5.6, function (c, W, H) { edsWallPaint(c, W, H, { seed: 41 }); });
case "hiero2": return edsCanvasTex("eds_hiero2", 1024, 1024, 5.6, function (c, W, H) { edsWallPaint(c, W, H, { seed: 77, shift: 4, cast: ["queen", "ra", "woman", "osiris", "scribe", "maat", "sobek", "bearer"], bg: "#EFE0B4" }); });
case "hierogold": return edsCanvasTex("eds_hierogold", 1024, 1024, 5.6, function (c, W, H) { edsWallPaint(c, W, H, { seed: 23, bg: "#E2B23E", cast: ["osiris", "king", "anubis", "isis", "ra", "king", "hathor", "horus"] }); });
case "carved": return edsCanvasTex("eds_carved", 1024, 1024, 5.6, function (c, W, H) { edsWallPaint(c, W, H, { seed: 59, bg: "#D9BD86", mono: "rgba(92,62,30,.82)", cast: ["king", "ra", "king", "horus", "queen", "thoth", "king", "anubis"] }); });
case "stars": return edsCanvasTex("eds_stars", 512, 512, 4, function (c, W, H) {
c.fillStyle = "#12245E";
c.fillRect(0, 0, W, H);
var R = edsRnd(5);
for (var i = 0; i < W * 3; i++) {
c.fillStyle = "rgba(60,90,180," + R() * 0.12 + ")";
c.fillRect(R() * W, R() * H, 2, 2);
}
for (var r = 0; r < 8; r++)
for (var q = 0; q < 8; q++)
edsSign(c, 24, (q + 0.5 + (r % 2) * 0.5) * 64 % W, (r + 0.5) * 64, 34, "#E8C24A");
c.fillStyle = "#E8C24A";
c.fillRect(0, 0, W, 3);
});
case "granite": return edsCanvasTex("eds_granite", 256, 256, 1.8, function (c, W, H) {
var R = edsRnd(17);
c.fillStyle = "#A8624E";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 5200; i++) {
var a = R();
c.fillStyle = a < 0.4 ? "rgba(40,28,26,.55)" : a < 0.75 ? "rgba(226,168,150,.6)" : "rgba(240,226,214,.5)";
c.fillRect(R() * W, R() * H, 1 + R() * 2.4, 1 + R() * 2.4);
}
});
case "course": return edsCanvasTex("eds_course", 512, 512, 6, function (c, W, H) {
var R = edsRnd(3);
edsGround2d(c, W, H, "#E4D2A4", R, 0.5);
for (var r = 0; r < 6; r++) {
var y = r * H / 6, off = R() * 90;
c.fillStyle = "rgba(86,62,34,.55)";
c.fillRect(0, y, W, 2.5);
c.fillStyle = "rgba(255,248,226,.45)";
c.fillRect(0, y + 2.5, W, 2);
for (var x = off; x < W + off; x += 70 + R() * 60) {
c.fillStyle = "rgba(86,62,34,.45)";
c.fillRect(x % W, y, 2, H / 6);
c.fillStyle = "rgba(70,50,30," + (R() * 0.07) + ")";
c.fillRect(x % W, y, 60, H / 6);
}
}
});
case "rock": return edsCanvasTex("eds_rock", 512, 512, 5, function (c, W, H) {
var R = edsRnd(8);
edsGround2d(c, W, H, "#D6B982", R, 0.5);
for (var i = 0; i < 26; i++) {
var y = R() * H, h = 3 + R() * 16;
c.fillStyle = R() < 0.5 ? "rgba(104,74,40," + (0.10 + R() * 0.16) + ")" : "rgba(255,240,206," + (0.08 + R() * 0.12) + ")";
c.beginPath();
c.moveTo(0, y);
for (var x = 0; x <= W; x += 32)
c.lineTo(x, y + Math.sin(x / 60 + i) * 3);
for (var x2 = W; x2 >= 0; x2 -= 32)
c.lineTo(x2, y + h + Math.sin(x2 / 47 + i * 2) * 3);
c.closePath();
c.fill();
}
});
case "mud": return edsCanvasTex("eds_mud", 512, 512, 3.2, function (c, W, H) {
var R = edsRnd(12);
edsGround2d(c, W, H, "#CFA672", R, 0.6);
for (var p = 0; p < 4; p++) {
var px = R() * W, py = R() * H, pw = 70 + R() * 90, ph = 44 + R() * 50;
c.fillStyle = "rgba(170,128,84,.55)";
c.fillRect(px, py, pw, ph);
c.strokeStyle = "rgba(96,66,38,.34)";
c.lineWidth = 1.2;
for (var r = 0; r * 15 < ph; r++) {
var y = py + r * 15;
c.beginPath();
c.moveTo(px, y);
c.lineTo(px + pw, y);
c.stroke();
for (var x = px + (r % 2) * 17; x < px + pw; x += 34) {
c.beginPath();
c.moveTo(x, y);
c.lineTo(x, Math.min(py + ph, y + 15));
c.stroke();
}
}
}
for (var q = 0; q < 40; q++) {
c.strokeStyle = "rgba(90,60,34," + (0.05 + R() * 0.08) + ")";
c.lineWidth = 1;
c.beginPath();
var sx = R() * W, sy = R() * H;
c.moveTo(sx, sy);
c.lineTo(sx + (R() - 0.5) * 30, sy + 20 + R() * 50);
c.stroke();
}
});
case "tent": return edsCanvasTex("eds_tent", 256, 256, 2.2, function (c, W, H) {
var R = edsRnd(31);
c.fillStyle = "#2E2620";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 1800; i++) {
c.fillStyle = "rgba(" + (R() < 0.5 ? "90,74,58" : "12,10,8") + ",.35)";
c.fillRect(R() * W, R() * H, 6 + R() * 10, 1);
}
[[40, 10, "#E8DCC0"], [54, 4, "#A8382A"], [62, 4, "#E8DCC0"], [150, 6, "#A8382A"], [160, 12, "#E8DCC0"], [176, 4, "#C89A3A"], [230, 3, "#E8DCC0"]].forEach(function (b) { c.fillStyle = b[2]; c.fillRect(0, b[0], W, b[1]); });
});
case "kilim": return edsCanvasTex("eds_kilim", 256, 256, 0, function (c, W, H) {
c.fillStyle = "#9E2E24";
c.fillRect(0, 0, W, H);
c.fillStyle = "#E8D8B0";
c.fillRect(0, 0, W, 14);
c.fillRect(0, H - 14, W, 14);
c.fillRect(0, 0, 10, H);
c.fillRect(W - 10, 0, 10, H);
c.fillStyle = "#1E3A6A";
c.fillRect(10, 14, W - 20, 10);
c.fillRect(10, H - 24, W - 20, 10);
var D = function (x, y, r, col) { c.fillStyle = col; c.beginPath(); c.moveTo(x, y - r); c.lineTo(x + r * 0.7, y); c.lineTo(x, y + r); c.lineTo(x - r * 0.7, y); c.closePath(); c.fill(); };
for (var j = 0; j < 3; j++) {
var y = 64 + j * 64;
D(W / 2, y, 34, "#1E3A6A");
D(W / 2, y, 24, "#E8D8B0");
D(W / 2, y, 13, "#C8902A");
D(W / 2, y, 6, "#9E2E24");
D(56, y, 16, "#C8902A");
D(W - 56, y, 16, "#C8902A");
D(56, y, 8, "#1E3A6A");
D(W - 56, y, 8, "#1E3A6A");
}
c.fillStyle = "#E8D8B0";
for (var t = 0; t < 16; t++) {
c.fillRect(16 + t * 14.4, 30, 7, 5);
c.fillRect(16 + t * 14.4, H - 35, 7, 5);
}
});
case "nemes": return edsCanvasTex("eds_nemes", 64, 64, 0.9, function (c, W, H) { c.fillStyle = "#D9A93A"; c.fillRect(0, 0, W, H); c.fillStyle = "#22469E"; for (var i = 0; i < 4; i++)
c.fillRect(0, i * 16, W, 8); });
case "frond": return edsCanvasTex("eds_frond", 256, 64, 0, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "#6E8A3A";
c.lineWidth = 3;
c.beginPath();
c.moveTo(0, H / 2);
c.lineTo(W, H / 2);
c.stroke();
for (var i = 0; i < 46; i++) {
var x = 6 + i * 5.4, L = (i < 6 ? 10 + i * 3.4 : 30) * (1 - Math.pow(i / 46, 3) * 0.8);
c.strokeStyle = i % 3 ? "#3F7A34" : "#4E8C3C";
c.lineWidth = 3.2;
c.beginPath();
c.moveTo(x, H / 2);
c.lineTo(x + 9, H / 2 - L);
c.moveTo(x, H / 2);
c.lineTo(x + 9, H / 2 + L);
c.stroke();
}
});
case "reed": return edsCanvasTex("eds_reed", 128, 256, 0, function (c, W, H) {
c.clearRect(0, 0, W, H);
var R = edsRnd(4);
for (var i = 0; i < 11; i++) {
var x = 10 + i * 10.6 + R() * 4, top = 20 + R() * 90, lean = (R() - 0.5) * 26;
c.strokeStyle = i % 2 ? "#4E8A3A" : "#6A9A44";
c.lineWidth = 3;
c.beginPath();
c.moveTo(x, H);
c.quadraticCurveTo(x, H * 0.5, x + lean, top);
c.stroke();
if (i % 3 === 0) {
c.strokeStyle = "#9AAE50";
c.lineWidth = 1.4;
for (var s = 0; s < 11; s++) {
var a = -Math.PI / 2 + (s - 5) * 0.24;
c.beginPath();
c.moveTo(x + lean, top);
c.lineTo(x + lean + Math.cos(a) * 22, top + Math.sin(a) * 22);
c.stroke();
}
}
else if (i % 3 === 1) {
c.fillStyle = "#6A4A2A";
c.fillRect(x + lean - 3, top - 4, 6, 26);
}
}
});
case "column": return edsCanvasTex("eds_column", 512, 1024, 0, function (c, W, H) {
var R = edsRnd(63);
edsGround2d(c, W, H, "#E8D4A0", R);
edsBand(c, 0, W, 18, [I.blue, I.gold, I.red, I.gold]);
for (var p = 0; p < 16; p++) {
c.fillStyle = p % 2 ? I.green : I.blue;
c.beginPath();
c.moveTo(p * 32, 18);
c.lineTo(p * 32 + 16, 150);
c.lineTo(p * 32 + 32, 18);
c.closePath();
c.fill();
c.strokeStyle = I.gold;
c.lineWidth = 2;
c.stroke();
}
edsBand(c, 156, W, 14, [I.red, I.gold, I.blue, I.gold]);
for (var q = 0; q < 12; q++)
edsColumn(c, (q + 0.5) * W / 12, 176, W / 12, 150, R, null);
edsBand(c, 332, W, 10, [I.gold, I.blue]);
var cast = ["king", "ra", "queen", "osiris"];
for (var f = 0; f < 4; f++) {
edsFigure(c, cast[f], (f + 0.4) * 128, 640, f % 2 ? 250 : 280, 1, {});
edsCartouche(c, (f + 0.86) * 128, 372, 26, 110, R, null);
}
edsBand(c, 650, W, 12, [I.blue, I.gold, I.green, I.gold]);
for (var q2 = 0; q2 < 12; q2++)
edsColumn(c, (q2 + 0.5) * W / 12, 668, W / 12, 200, R, null);
edsBand(c, 874, W, 12, [I.red, I.gold]);
for (var b = 0; b < 16; b++) {
c.fillStyle = b % 2 ? "#2F8558" : "#3E9A6A";
c.beginPath();
c.moveTo(b * 32, H);
c.quadraticCurveTo(b * 32 + 16, 880, b * 32 + 32, H);
c.closePath();
c.fill();
c.strokeStyle = I.black;
c.lineWidth = 1.2;
c.stroke();
}
});
}
return null;
},
function (name) {
var I = EDS_INK;
var frame = function (c, W, H, bg, R) { edsGround2d(c, W, H, bg, R); edsBand(c, 0, W, 16, [I.blue, I.gold, I.red, I.gold, I.green, I.gold]); edsBand(c, H - 16, W, 16, [I.red, I.blue, I.green, I.blue]); c.fillStyle = I.black; c.fillRect(0, 0, 5, H); c.fillRect(W - 5, 0, 5, H); };
var names = function (c, R, x, y, n, s) { for (var i = 0; i < n; i++)
edsSign(c, Math.floor(R() * 32), x, y + i * s * 1.05, s); };
switch (name) {
case "judgement": return edsCanvasTex("eds_m_judge", 1024, 512, 0, function (c, W, H) {
var R = edsRnd(101);
frame(c, W, H, "#EAD49C", R);
for (var i = 0; i < 14; i++) {
edsFigure(c, ["man", "woman", "maat", "thoth", "horus", "isis", "anubis"][i % 7], 40 + i * 70, 120, 74, 1, { sit: true, dress: I.white });
}
c.fillStyle = I.black;
c.fillRect(8, 124, W - 16, 3);
edsFigure(c, "woman", 90, 470, 290, 1, { pose: "praise", dress: I.white });
edsFigure(c, "anubis", 230, 470, 300, 1, { pose: "lead" });
c.strokeStyle = I.black;
c.lineWidth = 7;
c.beginPath();
c.moveTo(460, 470);
c.lineTo(460, 190);
c.stroke();
c.lineWidth = 5;
c.beginPath();
c.moveTo(340, 205);
c.lineTo(580, 205);
c.stroke();
c.lineWidth = 2;
[[340, 1], [580, 0]].forEach(function (p) {
c.beginPath();
c.moveTo(p[0], 205);
c.lineTo(p[0] - 34, 360);
c.moveTo(p[0], 205);
c.lineTo(p[0] + 34, 360);
c.stroke();
c.fillStyle = I.gold;
c.beginPath();
c.moveTo(p[0] - 40, 360);
c.quadraticCurveTo(p[0], 386, p[0] + 40, 360);
c.closePath();
c.fill();
c.stroke();
if (p[1])
edsSign(c, 31, p[0], 338, 44);
else
edsSign(c, 16, p[0], 330, 58);
});
c.fillStyle = I.gold;
c.beginPath();
c.arc(460, 186, 14, 0, 6.283);
c.fill();
c.stroke();
c.fillStyle = I.black;
c.fillRect(420, 466, 80, 8);
edsFigure(c, "anubis", 392, 470, 210, 1, { pose: "offer" });
c.fillStyle = I.green;
c.strokeStyle = I.black;
c.lineWidth = 2;
c.beginPath();
c.moveTo(600, 420);
c.lineTo(540, 424);
c.lineTo(540, 436);
c.lineTo(600, 440);
c.closePath();
c.fill();
c.stroke();
c.fillStyle = I.gold;
c.beginPath();
c.ellipse(630, 432, 34, 22, 0, 0, 6.283);
c.fill();
c.stroke();
c.fillStyle = "#7A5A4A";
c.beginPath();
c.ellipse(672, 440, 26, 24, 0, 0, 6.283);
c.fill();
c.stroke();
c.fillStyle = I.gold;
c.fillRect(606, 446, 10, 24);
c.fillRect(640, 450, 10, 20);
c.fillStyle = "#7A5A4A";
c.fillRect(672, 456, 12, 14);
edsFigure(c, "thoth", 760, 470, 290, -1, { pose: "write" });
c.fillStyle = I.gold;
c.fillRect(850, 150, 12, 320);
c.fillRect(996, 150, 12, 320);
c.fillRect(840, 134, 178, 18);
c.strokeRect(840, 134, 178, 18);
for (var u = 0; u < 9; u++)
edsSign(c, 11, 858 + u * 18, 122, 18);
c.fillStyle = I.blue;
c.fillRect(900, 330, 96, 140);
c.strokeRect(900, 330, 96, 140);
c.fillStyle = I.gold;
c.fillRect(968, 240, 24, 96);
edsFigure(c, "osiris", 930, 452, 300, -1, {});
edsOfferings(c, 812, 470, 1.5);
names(c, R, 300, 150, 3, 26);
names(c, R, 700, 150, 4, 26);
names(c, R, 36, 160, 5, 22);
edsCartouche(c, 160, 150, 28, 96, R);
});
case "sunboat": return edsCanvasTex("eds_m_boat", 1024, 512, 0, function (c, W, H) {
var R = edsRnd(202);
frame(c, W, H, "#EAD49C", R);
c.fillStyle = "#12245E";
c.fillRect(5, 16, W - 10, 96);
for (var s = 0; s < 40; s++)
edsSign(c, 24, 22 + s * 25, 34 + (s % 3) * 28, 18, "#E8C24A");
c.fillStyle = I.sky;
c.fillRect(5, 400, W - 10, 96);
c.strokeStyle = I.blue;
c.lineWidth = 3;
for (var r = 0; r < 5; r++) {
c.beginPath();
for (var x = 5; x < W; x += 16)
c.lineTo(x, 412 + r * 18 + ((x / 16) % 2 ? 5 : -5));
c.stroke();
}
c.strokeStyle = I.green;
c.lineWidth = 13;
c.beginPath();
c.moveTo(80, 462);
for (var a = 0; a < 10; a++)
c.quadraticCurveTo(125 + a * 88, a % 2 ? 436 : 488, 170 + a * 88, 462);
c.stroke();
c.fillStyle = I.green;
c.beginPath();
c.ellipse(72, 458, 22, 13, 0, 0, 6.283);
c.fill();
c.fillStyle = I.red;
c.beginPath();
c.arc(64, 454, 3.5, 0, 6.283);
c.fill();
c.fillStyle = I.gold;
c.strokeStyle = I.black;
c.lineWidth = 3;
c.beginPath();
c.moveTo(130, 330);
c.quadraticCurveTo(512, 470, 894, 330);
c.lineTo(930, 250);
c.lineTo(900, 262);
c.quadraticCurveTo(512, 400, 124, 262);
c.lineTo(94, 250);
c.closePath();
c.fill();
c.stroke();
edsSign(c, 18, 926, 232, 54);
edsSign(c, 18, 98, 232, 54);
edsSign(c, 1, 200, 330, 50);
c.fillStyle = I.white;
c.fillRect(440, 170, 150, 186);
c.strokeRect(440, 170, 150, 186);
c.fillStyle = I.red;
c.fillRect(432, 156, 166, 16);
c.strokeRect(432, 156, 166, 16);
edsFigure(c, "ra", 512, 356, 170, 1, {});
edsFigure(c, "horus", 860, 318, 150, -1, { pose: "walk" });
edsFigure(c, "thoth", 760, 344, 150, 1, {});
edsFigure(c, "maat", 670, 356, 146, 1, { dress: I.red });
edsFigure(c, "isis", 350, 352, 146, 1, { dress: I.green });
edsFigure(c, "hathor", 262, 338, 150, 1, { dress: I.red });
edsFigure(c, "man", 176, 316, 130, 1, { pose: "lead" });
c.strokeStyle = "#6A4A2A";
c.lineWidth = 5;
c.beginPath();
c.moveTo(150, 250);
c.lineTo(120, 430);
c.stroke();
names(c, R, 620, 130, 1, 28);
edsCartouche(c, 306, 124, 26, 80, R);
});
case "offering": return edsCanvasTex("eds_m_offer", 1024, 512, 0, function (c, W, H) {
var R = edsRnd(303);
frame(c, W, H, "#EAD49C", R);
c.fillStyle = I.gold;
c.strokeStyle = I.black;
c.lineWidth = 2;
c.fillRect(60, 300, 120, 26);
c.strokeRect(60, 300, 120, 26);
c.fillRect(66, 326, 14, 140);
c.fillRect(160, 326, 14, 140);
c.fillRect(56, 180, 16, 130);
c.strokeRect(56, 180, 16, 130);
edsFigure(c, "king", 120, 466, 330, 1, { sit: true, pose: "offer" });
edsFigure(c, "queen", 250, 470, 290, 1, { dress: I.white, pose: "lead" });
edsOfferings(c, 400, 470, 3.0);
for (var i = 0; i < 5; i++)
edsFigure(c, i % 2 ? "woman" : "bearer", 560 + i * 96, 470, 270 - (i % 2) * 14, -1, { pose: "carry", dress: [I.white, I.green, I.red][i % 3] });
for (var q = 0; q < 14; q++)
edsColumn(c, 330 + q * 50, 30, 34, 118, R);
edsCartouche(c, 66, 30, 34, 130, R);
edsCartouche(c, 210, 30, 34, 130, R);
c.fillStyle = I.black;
c.fillRect(8, 152, W - 16, 3);
});
case "fields": return edsCanvasTex("eds_m_fields", 1024, 512, 0, function (c, W, H) {
var R = edsRnd(404);
frame(c, W, H, "#EAD49C", R);
c.fillStyle = I.sky;
c.fillRect(5, 16, W - 10, 40);
c.fillRect(5, 236, W - 10, 34);
c.fillRect(5, 456, W - 10, 40);
c.strokeStyle = I.blue;
c.lineWidth = 2;
[28, 44, 246, 260, 468, 484].forEach(function (y) { c.beginPath(); for (var x = 5; x < W; x += 12)
c.lineTo(x, y + ((x / 12) % 2 ? 3 : -3)); c.stroke(); });
for (var f = 0; f < 9; f++) {
c.fillStyle = f % 2 ? "#C8702A" : "#8A8A90";
c.beginPath();
c.ellipse(70 + f * 112, 254, 20, 7, 0, 0, 6.283);
c.fill();
c.beginPath();
c.moveTo(88 + f * 112, 254);
c.lineTo(102 + f * 112, 246);
c.lineTo(102 + f * 112, 262);
c.fill();
}
var ox = function (x, y, col) {
c.fillStyle = col;
c.strokeStyle = I.black;
c.lineWidth = 2;
c.beginPath();
c.ellipse(x, y - 46, 52, 26, 0, 0, 6.283);
c.fill();
c.stroke();
c.fillRect(x - 40, y - 30, 10, 30);
c.fillRect(x - 18, y - 30, 10, 30);
c.fillRect(x + 16, y - 30, 10, 30);
c.fillRect(x + 36, y - 30, 10, 30);
c.beginPath();
c.ellipse(x + 62, y - 62, 18, 13, 0.3, 0, 6.283);
c.fill();
c.stroke();
c.beginPath();
c.moveTo(x + 60, y - 74);
c.quadraticCurveTo(x + 56, y - 96, x + 76, y - 96);
c.stroke();
};
ox(420, 226, "#B8703A");
ox(540, 226, I.white);
c.strokeStyle = "#5A3A1A";
c.lineWidth = 5;
c.beginPath();
c.moveTo(370, 180);
c.lineTo(300, 200);
c.lineTo(292, 226);
c.moveTo(300, 200);
c.lineTo(280, 150);
c.stroke();
edsFigure(c, "man", 250, 228, 150, 1, { pose: "offer" });
edsFigure(c, "woman", 140, 228, 140, 1, { pose: "lead", dress: I.white });
edsFigure(c, "man", 720, 228, 150, 1, { pose: "lead" });
for (var g = 0; g < 26; g++) {
c.fillStyle = I.black;
c.fillRect(760 + ((g * 37) % 220), 150 + ((g * 53) % 70), 3, 3);
}
for (var w = 0; w < 60; w++) {
var wx = 30 + w * 8;
c.strokeStyle = I.gold;
c.lineWidth = 2.4;
c.beginPath();
c.moveTo(wx, 448);
c.lineTo(wx + (w % 3 - 1) * 2, 340);
c.stroke();
c.fillStyle = "#C8902A";
c.beginPath();
c.ellipse(wx + (w % 3 - 1) * 2, 334, 3, 10, 0, 0, 6.283);
c.fill();
}
edsFigure(c, "man", 560, 450, 160, -1, { pose: "offer" });
edsFigure(c, "woman", 650, 450, 150, -1, { pose: "carry", dress: I.white });
for (var p = 0; p < 4; p++) {
var px = 760 + p * 64;
c.strokeStyle = "#6A4A2A";
c.lineWidth = 7;
c.beginPath();
c.moveTo(px, 450);
c.lineTo(px, 330);
c.stroke();
c.strokeStyle = I.green;
c.lineWidth = 4;
for (var l = 0; l < 7; l++) {
var a = Math.PI + l * Math.PI / 6;
c.beginPath();
c.moveTo(px, 330);
c.quadraticCurveTo(px + Math.cos(a) * 24, 300 + Math.sin(a) * 10, px + Math.cos(a) * 40, 326 + Math.sin(a) * -14 + 16);
c.stroke();
}
c.fillStyle = "#8A3A1A";
c.beginPath();
c.arc(px - 7, 340, 6, 0, 6.283);
c.arc(px + 7, 340, 6, 0, 6.283);
c.fill();
}
});
}
return null;
},
function (col, tex, o) {
o = o || {};
var key = col + "|" + (tex || "") + "|" + (o.e || 0) + "|" + (o.op === undefined ? 1 : o.op) + "|" + (o.ds ? 1 : 0) + "|" + (o.cut ? 1 : 0) + "|" + (o.basic ? 1 : 0);
if (EDS_MAT[key])
return EDS_MAT[key];
var m = o.basic ? new THREE.MeshBasicMaterial({ color: col }) : new THREE.MeshLambertMaterial({ color: col });
if (tex) {
var t = edsSurf(tex) || (/^m:/.test(tex) ? edsMural(tex.slice(2)) : null) || (typeof texOf === "function" ? texOf(tex) : null);
if (t)
m.map = t;
}
if (o.e && !o.basic) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.55;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
if (o.cut) {
m.alphaTest = 0.45;
m.side = THREE.DoubleSide;
}
m.userData.ldShared = 1;
m.userData.wsfSkip = 1;
return (EDS_MAT[key] = m);
},
function (L, droop) {
var key = "fr" + L.toFixed(1) + "|" + droop.toFixed(2);
if (EDS_GEO[key])
return EDS_GEO[key];
var n = 6, pos = [], uv = [], idx = [], w = L * 0.19;
for (var i = 0; i <= n; i++) {
var t = i / n, x = t * L, y = L * 0.3 * t - droop * L * t * t, ww = w * (0.5 + 0.5 * Math.sin(Math.min(1, t * 1.5) * Math.PI * 0.5)) * (1 - t * t * 0.55);
pos.push(x, y - ww * 0.28, -ww, x, y, 0, x, y - ww * 0.28, ww);
uv.push(t, 0, t, 0.5, t, 1);
if (i < n) {
var b = i * 3;
idx.push(b, b + 3, b + 1, b + 1, b + 3, b + 4, b + 1, b + 4, b + 2, b + 2, b + 4, b + 5);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
g.userData.shared = true;
return (EDS_GEO[key] = g);
},
function (G, x, y, z, h, seed, lite) {
var R = edsRnd(seed * 7 + 3), bark = edsM(0x8E7250, "bark"), lean = (R() - 0.5) * 0.22, la = R() * 6.28, segs = lite ? 3 : 5, px = x, pz = z, py = y, i;
for (i = 0; i < segs; i++) {
var t0 = i / segs, sh = h / segs, bend = lean * (i + 0.5) * sh;
var r0 = 0.34 - 0.12 * t0, r1 = 0.34 - 0.12 * (t0 + 1 / segs);
var m = edsCyl(G, bark, r1, r0 + (i === 0 ? 0.14 : 0), sh * 1.04, px + Math.cos(la) * bend * 0.5, py + sh / 2, pz + Math.sin(la) * bend * 0.5, 7);
m.rotation.set(Math.sin(la) * lean * (i + 0.5) * 0.5, 0, -Math.cos(la) * lean * (i + 0.5) * 0.5);
px += Math.cos(la) * bend;
pz += Math.sin(la) * bend;
py += sh;
}
edsSph(G, edsM(0x7A6040, "bark"), 0.52, px, py + 0.05, pz, 1, 1.25, 1, 8);
var fr = edsM(0xFFFFFF, "frond", { cut: 1 }), n = lite ? 8 : 14;
for (i = 0; i < n; i++) {
var a = i / n * 6.283 + R() * 0.4, up = i % 3 === 0 ? 0.75 : i % 3 === 1 ? 0.25 : -0.2, L = h * 0.36 + R() * 1.0 + 2.2;
var f = new THREE.Mesh(edsFrondGeo(Math.round(L * 2) / 2, 0.34 + (1 - up) * 0.2), fr);
f.position.set(px, py + 0.3, pz);
f.rotation.order = "YZX";
f.rotation.set((R() - 0.5) * 0.5, a, up * 0.55);
G.add(f);
}
if (!lite || seed % 2 === 0) {
var dm = edsM(seed % 3 ? 0xB06A24 : 0x7A3E1A);
for (i = 0; i < 3; i++) {
var b = i * 2.1 + R(), bx = px + Math.cos(b) * 0.55, bz = pz + Math.sin(b) * 0.55;
edsCyl(G, edsM(0xB8A050), 0.03, 0.03, 0.9, bx, py - 0.35, bz, 4);
edsSph(G, dm, 0.2, bx, py - 0.9, bz, 1, 1.8, 1, 7);
}
}
},
function (G, x, y, z, s, seed) {
var R = edsRnd(seed), b = edsM(0x6A5238, "bark"), lf = edsM(0x6E8A3E);
var t = edsCyl(G, b, 0.16 * s, 0.3 * s, 3.2 * s, x, y + 1.6 * s, z, 6);
t.rotation.z = 0.12;
for (var i = 0; i < 3; i++) {
var a = i * 2.1 + R(), br = edsCyl(G, b, 0.07 * s, 0.14 * s, 2.4 * s, x + Math.cos(a) * 0.8 * s, y + 3.6 * s, z + Math.sin(a) * 0.8 * s, 5);
br.rotation.set(Math.sin(a) * 0.7, 0, -Math.cos(a) * 0.7);
edsPut(G, new THREE.IcosahedronGeometry(1.7 * s, 1), lf, x + Math.cos(a) * 1.7 * s, y + 4.6 * s, z + Math.sin(a) * 1.7 * s).scale.set(1.5, 0.3, 1.5);
}
edsPut(G, new THREE.IcosahedronGeometry(2.2 * s, 1), lf, x, y + 5.0 * s, z).scale.set(1.5, 0.28, 1.5);
},
function (G, x, y, z, s, seed, col, tex) {
var big = s > 5, g = new THREE.IcosahedronGeometry(1, big ? 3 : (s > 1.2 ? 2 : 1)), p = g.attributes.position, nr = g.attributes.normal, R = edsRnd(seed);
var a1 = R() * 6, a2 = R() * 6, a3 = R() * 6, f1 = 1.6 + R() * 1.2, f2 = 2.6 + R() * 1.6, f3 = 4.5 + R() * 2, v = new THREE.Vector3();
for (var i = 0; i < p.count; i++) {
v.set(p.getX(i), p.getY(i), p.getZ(i)).normalize();
var f = 1 + 0.16 * Math.sin(v.x * f1 + a1) * Math.cos(v.z * f1 + a2) + 0.11 * Math.sin(v.y * f2 + a2 + v.x * 1.7) + 0.07 * Math.sin(v.z * f3 + a3 + v.y * 2.3) + 0.05 * Math.sin((v.x + v.z) * f3 * 1.7 + a1);
if (big) {
var bed = Math.sin(v.y * 9 + a3);
f += 0.035 * (bed > 0 ? 1 : -1) * Math.min(1, Math.abs(bed) * 3);
if (v.y > 0.55)
f -= (v.y - 0.55) * 0.5;
}
else if (v.y < -0.2)
f -= (-0.2 - v.y) * 0.35;
p.setXYZ(i, v.x * f, v.y * f, v.z * f);
nr.setXYZ(i, v.x, v.y, v.z);
}
g.computeVertexNormals();
for (i = 0; i < p.count; i++) {
v.set(p.getX(i), p.getY(i), p.getZ(i)).normalize();
nr.setXYZ(i, nr.getX(i) * 0.45 + v.x * 0.55, nr.getY(i) * 0.45 + v.y * 0.55, nr.getZ(i) * 0.45 + v.z * 0.55);
}
var uv = g.attributes.uv, uk = Math.max(1, s / 2.5);
if (uv) {
for (i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * uk * 2, uv.getY(i) * uk);
}
var m = edsPut(G, g, edsM(col || 0xB89A6E, tex || "rock"), x, y, z, 0, R() * 6, 0);
m.scale.set(s * (0.9 + R() * 0.5), s * (0.6 + R() * 0.4), s * (0.9 + R() * 0.5));
return m;
},
function (G, o) {
o = o || {};
var s = o.s || 1, rock = edsM(o.col || 0xE2C894, "rock"), dark = edsM(0xB89868, "rock"), g = new THREE.Group();
g.scale.setScalar(s);
G.add(g);
edsBox(g, dark, 17, 1.2, 52, 0, 0.6, -2);
edsSph(g, rock, 1, 0, 6.2, -8, 5.6, 5.0, 13.5, 18);
edsSph(g, rock, 1, 0, 7.2, 3.4, 5.3, 6.6, 5.6, 16);
[-1, 1].forEach(function (sd) {
edsSph(g, rock, 1, sd * 5.0, 4.9, -15.5, 3.5, 4.6, 6.2, 14);
edsBox(g, rock, 2.7, 1.9, 7.5, sd * 6.5, 2.1, -11.2);
edsSph(g, rock, 1, sd * 6.5, 2.1, -7.4, 1.4, 0.95, 1.5, 10);
edsBox(g, rock, 3.1, 3.0, 17, sd * 3.7, 2.7, 11);
edsSph(g, rock, 1, sd * 3.7, 2.5, 19.6, 1.6, 1.4, 1.9, 10);
for (var t = -1; t <= 1; t++)
edsBox(g, dark, 0.12, 1.0, 1.5, sd * 3.7 + t * 0.75, 2.35, 20.6);
edsSph(g, rock, 1, sd * 4.3, 6.2, 2.2, 2.0, 4.4, 2.6, 10);
});
var tail = edsPut(g, new THREE.TorusGeometry(3.4, 0.55, 7, 14, Math.PI * 1.2), rock, 5.6, 3.0, -17.5, Math.PI / 2, 0, 0.4);
tail.scale.set(1, 1.5, 1);
edsCyl(g, rock, 3.0, 3.8, 4.2, 0, 13.2, 3.6, 14);
var nm = edsM(0xFFFFFF, "nemes"), gold = edsM(0xE0B040, null, { e: 0x6A4A10, ei: 0.35 }), face = edsM(o.face || 0xDDB98A, "rock");
var hood = edsPut(g, new THREE.CylinderGeometry(3.3, 6.0, 7.6, 4, 1), nm, 0, 15.4, 2.5, 0, Math.PI / 4, 0);
hood.scale.set(1, 1, 0.62);
if (typeof metreUVs === "function")
metreUVs(hood.geometry, "cyl", [3.3, 6, 7.6]);
edsSph(g, nm, 1, 0, 18.3, 3.4, 3.75, 3.1, 3.7, 16);
[-1, 1].forEach(function (sd) { var lp = edsBox(g, nm, 1.5, 7.2, 2.6, sd * 3.5, 13.6, 5.6, 0, 0.1, -sd * 0.14); edsBox(g, face, 0.5, 1.7, 1.1, sd * 3.35, 17.0, 4.6); });
edsSph(g, face, 1, 0, 16.9, 4.9, 3.05, 3.7, 3.2, 18);
edsBox(g, nm, 6.9, 0.75, 0.7, 0, 19.25, 7.1);
var ur = edsCyl(g, gold, 0.22, 0.3, 1.7, 0, 20.0, 7.3, 6);
ur.rotation.x = 0.35;
edsSph(g, gold, 0.42, 0, 20.9, 7.75, 1, 1.2, 0.6, 8);
var kohl = edsM(0x1E1612), white = edsM(0xF4EEE0);
[-1, 1].forEach(function (sd) { edsSph(g, white, 1, sd * 1.15, 17.6, 7.55, 0.62, 0.3, 0.25, 10); edsSph(g, kohl, 1, sd * 1.15, 17.6, 7.72, 0.26, 0.26, 0.12, 8); edsBox(g, kohl, 1.7, 0.14, 0.2, sd * 1.3, 18.05, 7.5, 0, 0, -sd * 0.06); edsBox(g, kohl, 0.9, 0.1, 0.15, sd * 2.1, 17.6, 7.25, -sd * 0.5); });
var nose = edsBox(g, face, 0.7, 1.5, 0.9, 0, 16.9, 8.05, 0, -0.25);
edsBox(g, edsM(0xB8805A), 1.5, 0.24, 0.3, 0, 15.72, 7.75);
edsBox(g, face, 1.7, 0.2, 0.3, 0, 15.48, 7.7);
var beard = edsPut(g, new THREE.CylinderGeometry(0.75, 0.42, 3.6, 4, 1), nm, 0, 12.9, 7.3, 0.12, Math.PI / 4, 0);
if (typeof metreUVs === "function")
metreUVs(beard.geometry, "cyl", [0.75, 0.42, 3.6]);
if (!o.plain) {
edsBox(g, edsM(0xFFFFFF, "granite"), 2.6, 4.4, 0.6, 0, 3.4, 13.2);
edsBox(g, edsM(0xE8D0A0, "carved"), 2.2, 3.4, 0.1, 0, 3.3, 13.55);
edsCyl(g, gold, 0.0, 1.3, 0.5, 0, 5.85, 13.2, 3).scale.z = 0.3;
edsBox(g, dark, 1.6, 0.9, 1.6, 0, 1.65, 22.4);
}
return g;
},
function (G, x, z, ry, ram) {
var g = new THREE.Group(), rk = edsM(0xD8C090, "rock");
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
edsBox(g, edsM(0xC0A478, "rock"), 1.5, 0.7, 3.6, 0, 0.35, 0);
edsSph(g, rk, 1, 0, 1.25, -0.3, 0.6, 0.55, 1.35, 10);
edsBox(g, rk, 0.34, 0.4, 1.4, -0.4, 0.9, 1.0);
edsBox(g, rk, 0.34, 0.4, 1.4, 0.4, 0.9, 1.0);
edsSph(g, rk, 0.46, 0, 1.95, 0.75, 1, 1.1, 1, 10);
if (ram) {
[-1, 1].forEach(function (sd) { var h = edsPut(g, new THREE.TorusGeometry(0.3, 0.1, 5, 10, Math.PI * 1.4), rk, sd * 0.46, 1.95, 0.7, 0, Math.PI / 2, 0); });
edsBox(g, rk, 0.3, 0.3, 0.5, 0, 1.8, 1.25);
}
else {
var h2 = edsPut(g, new THREE.CylinderGeometry(0.4, 0.75, 1.0, 4, 1), edsM(0xFFFFFF, "nemes"), 0, 1.85, 0.55, 0, Math.PI / 4, 0);
h2.scale.z = 0.6;
}
},
function (a, H, t0, t1) {
var pos = [], uv = [], sl = Math.sqrt(H * H + a * a), f;
for (f = 0; f < 4; f++) {
var c = Math.cos(f * Math.PI / 2), s = Math.sin(f * Math.PI / 2);
var P = function (x, t) { var z = a * (1 - t); pos.push(x * c + z * s, H * t, -x * s + z * c); uv.push(x, t * sl); };
var w0 = a * (1 - t0), w1 = a * (1 - t1);
P(-w0, t0);
P(w0, t0);
P(w1, t1);
if (w1 > 0.001) {
P(-w0, t0);
P(w1, t1);
P(-w1, t1);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeVertexNormals();
return g;
},
function (G, R, H, o) {
o = o || {};
var a = R / Math.SQRT2;
edsPut(G, edsPyrBand(a, H, 0, o.worn ? 1 : 0.68), edsM(o.col || 0xF0E0BC, "course"), 0, 0, 0);
if (!o.worn) {
edsPut(G, edsPyrBand(a, H, 0.68, 0.94), edsM(0xF8F0E0, null, { e: 0x5A5244, ei: 0.3 }), 0, 0, 0);
edsPut(G, edsPyrBand(a, H, 0.94, 1), edsM(0xF0C040, null, { e: 0x8A6410, ei: 0.6 }), 0, 0, 0);
var R2 = edsRnd(R * 3);
for (var i = 0; i < (o.lite ? 10 : 26); i++) {
var f = i % 4, t = 0.66 + R2() * 0.05, w = a * (1 - t), x = (R2() * 2 - 1) * w * 0.9, c = Math.cos(f * Math.PI / 2), s = Math.sin(f * Math.PI / 2), z = a * (1 - t) + 0.1;
edsBox(G, edsM(0xF8F0E0), 2.4 + R2() * 3, 1.2 + R2() * 1.2, 1.2, x * c + z * s, H * t, -x * s + z * c, f * Math.PI / 2, -Math.atan2(a, H));
}
}
return a;
},
function (G, x, z, h, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
G.add(g);
var w = h * 0.085, m = edsM(0xE6C8A0, "carved");
edsBox(g, edsM(0xC8AE84, "rock"), w * 2.6, 0.8, w * 2.6, 0, 0.4, 0);
var sh = edsPut(g, new THREE.CylinderGeometry(w * 0.62, w, h, 4, 1), m, 0, 0.8 + h / 2, 0, 0, Math.PI / 4, 0);
if (typeof metreUVs === "function")
metreUVs(sh.geometry, "cyl", [w * 0.62, w, h]);
edsPut(g, new THREE.ConeGeometry(w * 0.62, w * 1.3, 4), edsM(0xF0C040, null, { e: 0x8A6410, ei: 0.6 }), 0, 0.8 + h + w * 0.65, 0, 0, Math.PI / 4, 0);
},
function (G, x, z, w, h, d) {
var g = new THREE.Group();
g.position.set(x, 0, z);
G.add(g);
var m = edsM(0xEAD2A0, "carved");
var b = edsPut(g, new THREE.CylinderGeometry(0.62, 0.707, 1, 4, 1), m, 0, h / 2, 0, 0, Math.PI / 4, 0);
b.scale.set(w, h, d);
var uv = b.geometry.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * w * 2.4, uv.getY(i) * h);
edsBox(g, edsM(0xD8B040), w * 0.9, 0.35, d * 0.9, 0, h + 0.1, 0);
edsBox(g, edsM(0x2447A8), w * 0.96, 0.9, d * 0.96, 0, h + 0.7, 0);
edsBox(g, edsM(0xD8B040), w * 1.02, 0.3, d * 1.02, 0, h + 1.3, 0);
for (var k = 0; k < Math.round(w / 1.6); k++)
edsBox(g, edsM(k % 2 ? 0xB8372A : 0x2F8558), 0.5, 0.9, d * 0.97, -w * 0.44 + k * (w * 0.88 / Math.max(1, Math.round(w / 1.6) - 1)), h + 0.7, 0);
},
function (G, x, z, W, H, D, gate) {
var tw = (W - gate) / 2, mast = edsM(0x7A4A2A, "wood");
[-1, 1].forEach(function (sd) {
edsPylonTower(G, x + sd * (gate / 2 + tw / 2), z, tw, H, D);
[0.3, 0.72].forEach(function (f, i) { var mx = x + sd * (gate / 2 + tw * f); edsCyl(G, mast, 0.12, 0.2, H * 1.25, mx, H * 0.625, z + D * 0.5 + 0.5, 6); edsBox(G, edsM([0xB8372A, 0x2447A8, 0x2F8558, 0xD8B040][(i + (sd > 0 ? 2 : 0)) % 4], null, { ds: 1 }), 0.05, 0.7, 3.4, mx, H * 1.2, z + D * 0.5 + 2.3); });
});
edsBox(G, edsM(0xEAD2A0, "carved"), gate + 1, H * 0.2, D * 0.7, x, H * 0.62, z);
edsBox(G, edsM(0x2447A8), gate + 1.4, 0.7, D * 0.74, x, H * 0.75, z);
edsSph(G, edsM(0xC8372A, null, { e: 0x6A1408 }), 0.9, x, H * 0.6, z + D * 0.36, 1, 1, 0.3, 10);
[-1, 1].forEach(function (sd) { for (var i = 0; i < 4; i++)
edsBox(G, edsM([0x2447A8, 0xD8B040, 0x2F8558, 0xD8B040][i]), gate * 0.4 - i * 0.5, 0.22, 0.12, x + sd * (0.9 + (gate * 0.4 - i * 0.5) / 2), H * 0.6 + 0.36 - i * 0.24, z + D * 0.36); });
},
function (G, x, z, h, r, lite) {
var m = edsM(0xFFFFFF, "column");
edsCyl(G, edsM(0xD8C8A0, "rock"), r * 1.35, r * 1.45, 0.4, x, 0.2, z, lite ? 8 : 14);
edsPut(G, new THREE.CylinderGeometry(r * 0.9, r, h * 0.82, lite ? 8 : 14, 1, true), m, x, 0.4 + h * 0.41, z);
edsPut(G, new THREE.CylinderGeometry(r * 1.7, r * 0.9, h * 0.14, lite ? 8 : 14, 1, true), edsM(0x2F8558), x, 0.4 + h * 0.89, z);
edsCyl(G, edsM(0xD8B040), r * 1.72, r * 1.7, 0.16, x, 0.4 + h * 0.965, z, lite ? 8 : 14);
edsBox(G, edsM(0xE8D4A0, "rock"), r * 2.3, h * 0.035, r * 2.3, x, 0.4 + h * 0.985, z);
},
function (G, x, z, ry, s, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s || 1);
G.add(g);
var rk = edsM(o.col || 0xD8BC8C, "rock"), cv = edsM(0xE4CC9C, "carved");
edsBox(g, rk, 4.4, 1.0, 6.4, 0, 0.5, 0.4);
edsBox(g, cv, 3.6, 4.2, 3.4, 0, 3.1, -1.0);
edsBox(g, rk, 3.6, 3.0, 0.6, 0, 6.7, -2.4);
[-1, 1].forEach(function (sd) {
edsBox(g, rk, 1.25, 1.3, 3.6, sd * 0.85, 5.0, 0.9);
edsBox(g, rk, 1.2, 4.0, 1.3, sd * 0.85, 3.0, 2.5);
edsBox(g, rk, 1.25, 0.6, 2.0, sd * 0.85, 1.3, 2.9);
edsBox(g, rk, 0.9, 2.8, 1.0, sd * 1.85, 7.4, -0.5);
edsBox(g, rk, 0.85, 0.8, 2.6, sd * 1.75, 5.95, 0.9);
});
if (o.broken) {
edsBox(g, rk, 3.4, 2.2, 2.0, 0, 6.6, -0.6);
edsRock(g, 0.4, 8.0, -0.5, 1.3, 7, 0xD8BC8C);
return g;
}
edsBox(g, rk, 3.4, 3.6, 2.0, 0, 7.4, -0.6);
edsCyl(g, rk, 0.75, 0.85, 0.8, 0, 9.5, -0.5, 10);
edsSph(g, rk, 1.05, 0, 10.6, -0.4, 1, 1.2, 1, 12);
var hd = edsPut(g, new THREE.CylinderGeometry(1.15, 2.0, 2.6, 4, 1), edsM(0xFFFFFF, "nemes"), 0, 10.2, -0.9, 0, Math.PI / 4, 0);
hd.scale.z = 0.6;
edsSph(g, edsM(0xFFFFFF, "nemes"), 1.18, 0, 11.0, -0.6, 1, 1.0, 1, 10);
edsCyl(g, edsM(0xF0E8D8), 0.5, 0.9, 2.2, 0, 12.5, -0.6, 10);
edsCyl(g, edsM(0xB8372A), 1.0, 1.0, 0.7, 0, 11.7, -0.6, 10);
edsBox(g, edsM(0xFFFFFF, "nemes"), 0.36, 1.3, 0.36, 0, 9.2, 0.55);
return g;
},
function (G, X, Z, rot, lx, lz, w, d, h, o) {
o = o || {};
var t = o.t || 0.6, out = edsM(o.col || 0xE2C090, o.tex || "mud"), ins = edsM(o.icol || 0xFFFFFF, o.itex || o.tex || "mud"), gap = o.gap || 2.2, dh = o.dh || Math.min(h - 0.6, 3.0);
var wall = function (cx, cz, ww, dd, along) {
var th = t / 2;
if (along === "x") {
edsBox(G, out, ww, h, th, lx + cx, h / 2, lz + cz + (cz > 0 ? th / 2 : -th / 2));
edsBox(G, ins, ww - t * 1.5, h, th, lx + cx, h / 2, lz + cz + (cz > 0 ? -th / 2 : th / 2));
}
else {
edsBox(G, out, th, h, dd, lx + cx + (cx > 0 ? th / 2 : -th / 2), h / 2, lz + cz);
edsBox(G, ins, th, h, dd - t * 1.5, lx + cx + (cx > 0 ? -th / 2 : th / 2), h / 2, lz + cz);
}
edsSolid(X, Z, rot, lx + cx, lz + cz, along === "x" ? ww / 2 : t / 2, along === "x" ? t / 2 : dd / 2, h);
};
wall(0, -d / 2 + t / 2, w, t, "x");
wall(-w / 2 + t / 2, 0, t, d, "z");
wall(w / 2 - t / 2, 0, t, d, "z");
var side = (w - gap) / 2;
wall(-(gap / 2 + side / 2), d / 2 - t / 2, side, t, "x");
wall(gap / 2 + side / 2, d / 2 - t / 2, side, t, "x");
edsBox(G, out, gap + 0.2, h - dh, t, lx, dh + (h - dh) / 2, lz + d / 2 - t / 2);
if (o.roof !== false) {
edsBox(G, edsM(o.rcol || 0xD8B888, o.tex || "mud"), w + 0.3, 0.35, d + 0.3, lx, h + 0.17, lz);
if (o.parapet !== false) {
[[0, -d / 2, w, 0.3], [0, d / 2, w, 0.3], [-w / 2, 0, 0.3, d], [w / 2, 0, 0.3, d]].forEach(function (p) { edsBox(G, out, p[2] + 0.3, 0.7, p[3] + 0.3, lx + p[0], h + 0.7, lz + p[1]); });
}
if (o.beams)
for (var b = 0; b < Math.floor(w / 1.6); b++)
edsCyl(G, edsM(0x6A4A2A, "wood"), 0.1, 0.1, 0.9, lx - w / 2 + 0.9 + b * 1.6, h - 0.5, lz + d / 2 + 0.2, 5).rotation.x = Math.PI / 2;
}
if (o.dome) {
edsPut(G, new THREE.SphereGeometry(Math.min(w, d) * 0.36, 14, 8, 0, 6.283, 0, Math.PI / 2), edsM(o.dome, "plaster"), lx, h + 0.3, lz);
}
if (o.floor)
edsBox(G, edsM(o.floor[0], o.floor[1]), w - t, 0.06, d - t, lx, 0.03, lz);
},
function (G, x, z, s) {
s = s || 1;
for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.283;
edsRock(G, x + Math.cos(a) * 0.55 * s, 0.1, z + Math.sin(a) * 0.55 * s, 0.2 * s, i + 4, 0x6A5A4A, "stone");
}
for (var k = 0; k < 3; k++) {
var l = edsCyl(G, edsM(0x3A2A1A, "wood"), 0.06 * s, 0.07 * s, 0.9 * s, x, 0.16, z, 5);
l.rotation.set(Math.PI / 2, 0, k * 2.1);
}
if (typeof ldFlame === "function")
ldFlame(G, x, 0.1, z, 0.9 * s);
if (typeof ldHalo === "function")
ldHalo(G, x, 0.9 * s, z, 0xFFB060, 3.5 * s, 0.4);
},
function (G, X, Z, rot, lx, lz, w, d, ry, seed, lite) {
var g = new THREE.Group();
g.position.set(lx, 0, lz);
g.rotation.y = ry || 0;
G.add(g);
var R = edsRnd(seed), cl = edsM(0xFFFFFF, "tent", { ds: 1 }), pole = edsM(0x6A4A2A, "wood"), nx = 4, nz = 2;
var geo = new THREE.PlaneGeometry(w, d, nx * 2, nz * 2), p = geo.attributes.position, i;
for (i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), u = (x + w / 2) / w * nx, v = (y + d / 2) / d * nz;
var pk = Math.abs(Math.cos(u * Math.PI)) * Math.abs(Math.cos(v * Math.PI));
var edge = Math.min(1, Math.min(d / 2 - Math.abs(y), w / 2 - Math.abs(x)) / 1.2);
p.setZ(i, 1.7 + pk * 0.75 + edge * 0.25);
}
geo.computeVertexNormals();
if (typeof metreUVs === "function")
metreUVs(geo, "pln", [w, d]);
var roof = new THREE.Mesh(geo, cl);
roof.rotation.x = -Math.PI / 2;
g.add(roof);
for (var a = 0; a <= nx; a++)
for (var b = 0; b <= nz; b++) {
var px = -w / 2 + a * w / nx, pz = -d / 2 + b * d / nz;
if (b === nz && a > 0 && a < nx && a !== nx / 2)
continue;
edsCyl(g, pole, 0.05, 0.06, 2.5, px * 0.97, 1.25, pz * 0.97, 5);
if (a === 0 || a === nx || b === 0) {
var ox = a === 0 ? -1 : a === nx ? 1 : 0, oz = b === 0 ? -1 : 0;
var rp = edsCyl(g, edsM(0xC8B890), 0.015, 0.015, 2.9, px + ox * 1.0, 1.0, pz + oz * 1.0, 3);
rp.rotation.set(-oz * 0.85, 0, ox * 0.85);
}
}
var back = edsPut(g, new THREE.PlaneGeometry(w, 1.9), cl, 0, 0.95, -d / 2 + 0.05);
if (typeof metreUVs === "function")
metreUVs(back.geometry, "pln", [w, 1.9]);
[-1, 1].forEach(function (sd) { var sw = edsPut(g, new THREE.PlaneGeometry(d, 1.9), cl, sd * (w / 2 - 0.05), 0.95, 0, 0, Math.PI / 2, 0); if (typeof metreUVs === "function")
metreUVs(sw.geometry, "pln", [d, 1.9]); });
var dv = edsPut(g, new THREE.PlaneGeometry(d * 0.8, 1.8), edsM(0xB8372A, "kilim", { ds: 1 }), 0, 0.9, -d * 0.1, 0, Math.PI / 2, 0);
edsRug(g, -w / 4, 0, w / 2 - 0.6, d - 1, 0);
edsRug(g, w / 4, 0, w / 2 - 0.6, d - 1, 0, 0xD8E0FF);
var cols = [0xB8372A, 0x2447A8, 0xD8A838, 0x2F8558, 0x7A2E6A, 0xE8D8B0];
for (i = 0; i < (lite ? 3 : 7); i++)
edsCushion(g, -w / 2 + 0.8 + R() * (w - 1.6), -d / 2 + 0.6 + R() * 1.2, cols[i % 6]);
edsCyl(g, edsM(0xC89A3A, null, { e: 0x4A3008, ei: 0.3 }), 0.5, 0.5, 0.04, w / 4, 0.32, 0.3, 12);
edsCyl(g, pole, 0.2, 0.26, 0.3, w / 4, 0.15, 0.3, 8);
edsJar(g, w / 4 + 0.1, 0.34, 0.3, 1, 0.32, 0xC89A3A);
edsJar(g, -w / 4, 0, -d / 2 + 0.6, 0, 0.8);
edsJar(g, -w / 4 + 0.7, 0, -d / 2 + 0.5, 4, 0.6);
var c = Math.cos(rot), s = Math.sin(rot), wx = X + lx * c + lz * s, wz = Z - lx * s + lz * c, rr = rot + (ry || 0);
edsSolid(wx, wz, rr, 0, -d / 2, w / 2, 0.15, 1.9);
edsSolid(wx, wz, rr, -w / 2, 0, 0.15, d / 2, 1.9);
edsSolid(wx, wz, rr, w / 2, 0, 0.15, d / 2, 1.9);
},
function (G, kind, x, y, z, n, s, spread) {
var f = EDS_FRUIT[kind];
if (!f)
return;
var R = edsRnd(Math.round(x * 13 + z * 7) + kind.length * 5);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = Math.sqrt(R()) * (spread || 0.3), g = new THREE.Group();
g.position.set(x + Math.cos(a) * d, y + (i > n * 0.6 ? 0.09 * (s || 1) : 0), z + Math.sin(a) * d);
g.rotation.y = R() * 6.283;
f(g, 0, 0, 0, (s || 1) * (0.85 + R() * 0.3));
G.add(g);
}
},
function (G, X, Z, rot, lx, lz, ry, kind, seed, lite) {
var g = new THREE.Group();
g.position.set(lx, 0, lz);
g.rotation.y = ry || 0;
G.add(g);
var R = edsRnd(seed * 11 + 1), wood = edsM(0x7A5A3A, "wood"), i;
var st = [[0xB8372A, 0xF0E4C8], [0x2447A8, 0xF0E4C8], [0x2F8558, 0xE8C860], [0xC8782A, 0xF0E4C8], [0x7A2E6A, 0xE8C860]][seed % 5];
[[-1.7, -1], [1.7, -1], [-1.7, 1.1], [1.7, 1.1]].forEach(function (p) { edsCyl(g, wood, 0.06, 0.07, p[1] < 0 ? 2.9 : 2.4, p[0], p[1] < 0 ? 1.45 : 1.2, p[1], 6); });
for (i = 0; i < 7; i++) {
var aw = edsBox(g, edsM(st[i % 2], null, { ds: 1, e: st[i % 2], ei: 0.3 }), 0.52, 0.03, 2.5, -1.56 + i * 0.52, 2.66, 0.05, 0, 0.235);
}
for (i = 0; i < 7; i++) {
var sc = edsCone(g, edsM(st[i % 2]), 0.26, 0.3, -1.56 + i * 0.52, 2.22, 1.28, 3);
sc.rotation.set(Math.PI, 0, 0);
sc.scale.z = 0.1;
}
edsBox(g, wood, 3.4, 0.08, 1.2, 0, 0.9, 0.3);
edsBox(g, wood, 3.4, 0.8, 0.06, 0, 0.45, 0.86);
[-1.6, 1.6].forEach(function (x) { edsBox(g, wood, 0.08, 0.86, 1.1, x, 0.43, 0.3); });
edsBox(g, edsM(st[0], "kilim"), 3.3, 0.5, 0.02, 0, 0.62, 0.9);
var top = 0.94;
if (kind === "fruit") {
var F = [["melon", 3, 0.9, 0.3], ["pomegranate", 9, 1, 0.22], ["orange", 14, 1, 0.24], ["fig", 12, 1, 0.2], ["grapes", 4, 1.2, 0.2], ["lemon", 10, 1, 0.2], ["banana", 3, 1.1, 0.18], ["apricot", 14, 1, 0.2], ["pear", 9, 1, 0.2]];
for (i = 0; i < 6; i++) {
var f = F[(seed + i) % F.length], cx = -1.35 + (i % 3) * 1.35, cz = i < 3 ? 0.02 : 0.62;
edsCrate(g, cx, top, cz, 0.9, 0.5, 0);
edsHeap(g, f[0], cx, top + 0.05, cz, lite ? Math.ceil(f[1] / 2) : f[1], f[2], f[3]);
}
EDS_FRUIT.melonCut(g, 0.7, top + 0.3, 0.3, 0.9);
edsHeap(g, "dates", -1.2, 0.05, 1.5, 5, 1.4, 0.25);
edsBasket(g, -1.2, 0, 1.5, 1.4);
}
else if (kind === "veg") {
var V = [["onion", 12, 1.1, 0.22], ["carrot", 9, 1.1, 0.2], ["cucumber", 8, 1, 0.2], ["aubergine", 6, 1, 0.2], ["pepper", 12, 1, 0.2], ["garlic", 12, 1, 0.2], ["cabbage", 4, 1, 0.25], ["pumpkin", 2, 0.9, 0.25]];
for (i = 0; i < 6; i++) {
var v = V[(seed + i) % V.length], vx = -1.35 + (i % 3) * 1.35, vz = i < 3 ? 0.02 : 0.62;
edsCrate(g, vx, top, vz, 0.9, 0.5, 0);
edsHeap(g, v[0], vx, top + 0.05, vz, lite ? Math.ceil(v[1] / 2) : v[1], v[2], v[3]);
}
EDS_FRUIT.pumpkin(g, 1.3, 0, 1.5, 1.5);
EDS_FRUIT.pumpkin(g, 0.8, 0, 1.7, 1.1);
edsHeap(g, "wheat", -1.3, 0, 1.5, 3, 1.5, 0.2);
}
else if (kind === "spice") {
var S = [0xD8A020, 0xB8372A, 0x8A4A1E, 0xE8C860, 0x5A7A2A, 0xC8602A, 0x3A2A1E, 0xE8E0C8, 0xA82838, 0xD8782A];
for (i = 0; i < 10; i++) {
var sx = -1.4 + (i % 5) * 0.7, sz = i < 5 ? 0.05 : 0.6;
edsLathe(g, edsM(0xC89A3A, null, { ds: 1 }), [[0, 0], [0.14, 0], [0.26, 0.1], [0.27, 0.12], [0.13, 0.02], [0, 0.02]], sx, top, sz, 10);
edsCone(g, edsM(S[(i + seed) % 10]), 0.2, 0.3, sx, top + 0.22, sz, 10);
}
for (i = 0; i < 3; i++) {
edsBox(g, edsM([0xC8A060, 0xB89050, 0xD8B070][i], "wood"), 0.5, 0.6, 0.5, -1.3 + i * 0.6, 0.3, 1.5);
edsCone(g, edsM(S[(i * 3 + seed) % 10]), 0.22, 0.24, -1.3 + i * 0.6, 0.7, 1.5, 8);
}
}
else if (kind === "pots") {
for (i = 0; i < 9; i++)
edsJar(g, -1.4 + (i % 5) * 0.7, top, i < 5 ? 0.05 : 0.6, (i + seed) % 5, 0.42 + R() * 0.2);
for (i = 0; i < 5; i++)
edsJar(g, -1.5 + i * 0.75, 0, 1.5 + (i % 2) * 0.3, (i + seed + 2) % 5, 0.8 + R() * 0.5);
}
else if (kind === "lamps") {
for (i = 0; i < 8; i++)
edsLamp(g, -1.4 + (i % 4) * 0.93, top, i < 4 ? 0.05 : 0.6, 0.7 + R() * 0.5);
for (i = 0; i < 5; i++) {
edsCyl(g, edsM(0x3A2A1A), 0.006, 0.006, 0.5, -1.3 + i * 0.65, 2.2, 0.9, 3);
edsLamp(g, -1.3 + i * 0.65, 1.55, 0.9, 0.8);
}
edsCyl(g, edsM(0xD8A838, null, { e: 0x5A3A08, ei: 0.4 }), 0.4, 0.4, 0.03, 0, top + 0.4, -0.2, 14).rotation.x = Math.PI / 2.4;
}
else if (kind === "cloth") {
var C = [0xB8372A, 0x2447A8, 0xD8A838, 0x2F8558, 0x7A2E6A, 0xE8D8B0, 0xC8602A, 0x2FA3A0];
for (i = 0; i < 10; i++)
edsBox(g, edsM(C[(i + seed) % 8]), 0.6, 0.1, 0.9, -1.3 + (i % 4) * 0.86, top + 0.05 + Math.floor(i / 4) * 0.1, 0.3);
for (i = 0; i < 4; i++) {
var h = edsPut(g, new THREE.PlaneGeometry(0.7, 1.5), edsM(C[(i * 2 + seed) % 8], null, { ds: 1 }), -1.2 + i * 0.8, 1.7, -0.95);
}
}
else if (kind === "rugs") {
for (i = 0; i < 3; i++) {
var rg = edsPut(g, new THREE.PlaneGeometry(1.0, 2.0), edsM([0xFFFFFF, 0xC8D8FF, 0xFFE0B0][i], "kilim", { ds: 1 }), -1.15 + i * 1.15, 1.6, -0.98);
}
for (i = 0; i < 5; i++) {
var rl = edsPut(g, new THREE.CylinderGeometry(0.16, 0.16, 1.6, 10), edsM([0xB8372A, 0x2447A8, 0xD8A838, 0x7A2E6A, 0x2F8558][i], "kilim"), -1.2 + i * 0.6, top + 0.16, 0.3, 0, 0, Math.PI / 2);
rl.rotation.set(Math.PI / 2, 0, 0);
}
}
else if (kind === "bread") {
for (i = 0; i < 5; i++)
edsHeap(g, "bread", -1.3 + i * 0.65, top, 0.3, 5, 1, 0.02);
edsPut(g, new THREE.SphereGeometry(0.8, 12, 8, 0, 6.283, 0, Math.PI / 2), edsM(0xC89868, "mud"), 1.6, 0, -1.9);
edsBox(g, edsM(0x1E1612), 0.5, 0.4, 0.1, 1.6, 0.3, -1.12);
if (typeof ldHalo === "function")
ldHalo(g, 1.6, 0.35, -1.0, 0xFF9040, 1.4, 0.5);
}
else if (kind === "tea") {
edsLathe(g, edsM(0xC89A3A, null, { e: 0x4A3008, ei: 0.3 }), [[0, 0], [0.16, 0], [0.22, 0.2], [0.12, 0.4], [0.14, 0.5], [0.04, 0.56], [0, 0.6]], -0.9, top, 0.3, 10);
for (i = 0; i < 8; i++)
edsCyl(g, edsM(0x8AC8A0, null, { op: 0.7 }), 0.035, 0.03, 0.09, -0.3 + (i % 4) * 0.2, top + 0.045, 0.1 + Math.floor(i / 4) * 0.3, 6);
edsCyl(g, edsM(0xD8A838, null, { e: 0x5A3A08, ei: 0.4 }), 0.5, 0.5, 0.02, 0.1, top + 0.01, 0.25, 14);
edsHeap(g, "dates", 1.2, top + 0.02, 0.3, 4, 1.2, 0.15);
}
var c = Math.cos(rot), s = Math.sin(rot);
edsSolid(X + lx * c + lz * s, Z - lx * s + lz * c, rot + (ry || 0), 0, 0.3, 1.75, 0.65, 1.0);
},
function (G, x, y, z, ry, white) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var w = edsM(white ? 0xF4F0E8 : 0x8A9AA8), bk = edsM(0x1E1A16);
edsSph(g, w, 0.2, 0, 0.62, 0, 1, 0.8, 1.6, 8);
var n = edsCyl(g, white ? bk : w, 0.035, 0.05, 0.42, 0, 0.9, 0.3, 5);
n.rotation.x = 0.5;
edsSph(g, white ? bk : w, 0.06, 0, 1.1, 0.42, 1, 1, 1.2, 6);
var b = edsPut(g, new THREE.TorusGeometry(0.2, 0.014, 4, 8, Math.PI * 0.5), edsM(white ? 0x1E1A16 : 0xD8A838), 0, 0.92, 0.52, 0, -Math.PI / 2, -0.2);
[-0.05, 0.05].forEach(function (lx) { edsCyl(g, edsM(0x2A2420), 0.012, 0.012, 0.5, lx, 0.25, 0, 3); });
},
function (i, sex, o) {
var top = [0xF0E8D8, 0x3A2A6A, 0x8A2A1A, 0x2A6A6A, 0xE8D8B0, 0x4A6A8A, 0x7A3A2A, 0x2F5A3A, 0xC8A050, 0x5A2A4A, 0x1E2A4A, 0xB8683A][i % 12];
var hatc = [0xF0E8D8, 0x6A1A3A, 0xE8C040, 0xE8A030, 0x2447A8, 0xB8372A, 0xF0E8D8, 0x2F8558][i % 8], skin = [0x9A6A4A, 0xB88060, 0xA87050, 0x8A5A3A, 0xC89068, 0x7A4A30][i % 6];
var L = { top: top, topKind: "robe", bottom: top, shoes: 0x6A4A2A, skin: skin, hair: 0x1A1010, hat: sex === "f" ? (i % 2 ? "veil" : "headwrap") : (i % 3 ? "headwrap" : "bandana"), hatColor: hatc };
if (sex === "m" && i % 2 === 0)
L.beard = i % 4 ? "short" : "full";
if (o)
Object.keys(o).forEach(function (k) { L[k] = o[k]; });
return L;
},
function (P, list) {
var L = "the Endless Desert";
list.forEach(function (f, i) {
var o = { sex: f[4] === "c" ? (i % 2 ? "f" : "m") : f[4], look: edsRobe(i + (f[0].length || 0), f[4] === "f" ? "f" : "m", f[9]) };
if (f[4] === "c")
o.child = true;
P.person("eds_" + f[0], f[1], f[2], f[3], o, f[5] ? ldWho(f[5], L, f[6], f[7]) : null, f[8] ? { r: f[8], sp: 0.5 } : null);
});
},
function (P, cx, cz, rad, nPalm, seed, big) {
var lite = P.lite;
edsAt(P, cx, cz, 0, function (G, H, X, Z) {
var R = edsRnd(seed), y0 = ldY(cx, cz), wy = -0.45 - y0, i, a, d, x, z;
for (i = 0; i < (lite ? Math.ceil(nPalm * 0.6) : nPalm); i++) {
a = R() * 6.283;
d = rad * 0.74 + Math.pow(R(), 1.5) * rad * 1.25;
x = Math.sin(a) * d;
z = Math.cos(a) * d;
if (big && Math.abs(x) < 5 && z > rad * 0.6)
continue;
edsPalm(G, x, H.y(x, z), z, 7 + R() * 6, seed + i, lite);
edsSolidR(X, Z, 0, x, z, 0.45, 8);
}
var reed = edsM(0xFFFFFF, "reed", { cut: 1 });
for (i = 0; i < (lite ? 14 : 34); i++) {
a = R() * 6.283;
d = rad * (0.66 + R() * 0.1);
x = Math.sin(a) * d;
z = Math.cos(a) * d;
if (big && Math.abs(x) < 4 && z > 0)
continue;
for (var k = 0; k < 2; k++) {
var rp = edsPut(G, new THREE.PlaneGeometry(1.5, 2.6), reed, x, H.y(x, z) + 1.25, z, 0, a + k * Math.PI / 2, 0);
}
}
for (i = 0; i < (lite ? 8 : 22); i++) {
a = R() * 6.283;
d = R() * rad * 0.52;
x = Math.sin(a) * d;
z = Math.cos(a) * d;
edsCyl(G, edsM(i % 2 ? 0x3E8A44 : 0x4E9A50), 0.38 + R() * 0.2, 0.38, 0.02, x, wy + 0.02, z, 8);
if (i % 3 === 0) {
for (var q = 0; q < 6; q++) {
var pt = edsCone(G, edsM(q % 2 ? 0xF0A8C8 : 0xF8D0E0), 0.07, 0.24, x + Math.cos(q) * 0.07, wy + 0.15, z + Math.sin(q) * 0.07, 4);
pt.rotation.set(Math.sin(q) * 0.5, 0, -Math.cos(q) * 0.5);
}
edsSph(G, edsM(0xE8C040), 0.05, x, wy + 0.1, z);
}
}
for (i = 0; i < (lite ? 24 : 70); i++) {
a = R() * 6.283;
d = rad * (0.72 + R() * 0.75);
x = Math.sin(a) * d;
z = Math.cos(a) * d;
var gy = H.y(x, z);
if (i % 4 === 0)
edsBush(G, x, gy, z, 0.7 + R() * 0.7, i % 8 ? 0x4E8A3E : 0x6A9A4A);
else if (i % 4 === 1) {
for (var t = 0; t < 5; t++) {
var tf = edsCone(G, edsM(t % 2 ? 0x5A9A3E : 0x7AAA48), 0.07, 0.7 + R() * 0.4, x + (R() - 0.5) * 0.5, gy + 0.35, z + (R() - 0.5) * 0.5, 3);
tf.rotation.set((R() - 0.5) * 0.4, 0, (R() - 0.5) * 0.4);
}
}
else if (i % 4 === 2) {
edsBush(G, x, gy, z, 0.6, 0x3E7A3A);
for (var f = 0; f < 5; f++)
edsSph(G, edsM([0xE85A8A, 0xF0F0F0, 0xE8C040, 0xD83A3A][i % 4 | 0]), 0.07, x + (R() - 0.5) * 0.9, gy + 0.5 + R() * 0.3, z + (R() - 0.5) * 0.9);
}
else
edsRock(G, x, gy + 0.1, z, 0.3 + R() * 0.5, i, 0xA89878, "stone");
}
if (big) {
for (i = 0; i < 7; i++)
edsRock(G, -rad * 0.78 + Math.cos(i) * 2.4, H.y(-rad * 0.78, -2) + 0.8 + (i % 3) * 0.9, -2 + Math.sin(i * 1.7) * 2.6, 1.5 + (i % 3) * 0.5, i + 30, 0xB8A078);
var fall = edsBox(G, edsM(0xBFE8F0, null, { op: 0.75, e: 0x6AB8C8, ei: 0.5 }), 0.7, 0.06, 3.4, -rad * 0.72, wy + 1.2, -1.6, 0, 0, 0.0);
fall.rotation.set(0, Math.PI / 2, -0.62);
edsAcacia(G, rad * 0.3, H.y(rad * 0.3, -rad * 1.2), -rad * 1.2, 1.2, 7);
edsAcacia(G, -rad * 1.3, H.y(-rad * 1.3, rad * 0.5), rad * 0.5, 1, 9);
edsAcacia(G, rad * 1.5, H.y(rad * 1.5, rad * 0.3), rad * 0.3, 1.1, 11);
[[5, 3, 1], [7.5, -6, 0], [-6, 8, 1], [-9, -7, 0], [2, -12, 1]].forEach(function (b, j) { edsIbis(G, b[0] * rad / 17, wy - 0.12, b[1] * rad / 17, j * 1.3, b[2]); });
edsBox(G, edsM(0x7A5A3A, "wood"), 1.6, 0.12, 6.5, 0, wy + 0.3, rad * 0.6);
[-0.7, 0.7].forEach(function (px) { for (var j = 0; j < 3; j++)
edsCyl(G, edsM(0x5A4230, "wood"), 0.1, 0.1, 1.6, px, wy - 0.3, rad * 0.46 + j * 2.6, 6); });
edsJar(G, 1.6, H.y(1.6, rad * 0.86), rad * 0.86, 4, 0.8);
edsJar(G, -1.9, H.y(-1.9, rad * 0.9), rad * 0.9, 0, 0.7);
}
});
edsAt(P, cx, cz, 0, function (G) {
var wy = -0.45 - ldY(cx, cz), R = edsRnd(seed + 3), sh = new THREE.Shape(), n = 28, i;
for (i = 0; i <= n; i++) {
var a = i / n * 6.283, r = rad * (1.0 + 0.08 * Math.sin(a * 3 + seed) + 0.05 * Math.sin(a * 5));
if (i === 0)
sh.moveTo(Math.cos(a) * r, Math.sin(a) * r);
else
sh.lineTo(Math.cos(a) * r, Math.sin(a) * r);
}
var w = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshLambertMaterial({ color: 0x2E97A8, emissive: 0x0E4A5A, emissiveIntensity: 0.5, transparent: true, opacity: 0.8, depthWrite: false }));
w.rotation.x = -Math.PI / 2;
w.position.y = wy;
G.add(w);
var deep = new THREE.Mesh(new THREE.CircleGeometry(rad * 0.62, 24), new THREE.MeshBasicMaterial({ color: 0x14586A, transparent: true, opacity: 0.55, depthWrite: false }));
deep.rotation.x = -Math.PI / 2;
deep.position.y = wy - 0.25;
G.add(deep);
w.userData.ldAnim = function (m, t) { m.material.opacity = 0.78 + 0.04 * Math.sin(t * 0.6); };
for (i = 0; i < (P.lite ? 3 : 7); i++) {
var f = new THREE.Mesh(new THREE.SphereGeometry(0.16, 6, 5), new THREE.MeshLambertMaterial({ color: i % 2 ? 0xE8782A : 0xF0E0C0 }));
f.scale.set(0.5, 0.6, 1.8);
f.userData.k = [1.5 + R() * rad * 0.45, R() * 6.28, (R() < 0.5 ? -1 : 1) * (0.15 + R() * 0.15)];
f.userData.ldAnim = function (m, t) { var k = m.userData.k, a = k[1] + t * k[2]; m.position.set(Math.cos(a) * k[0], wy - 0.14 + 0.03 * Math.sin(t + k[1]), Math.sin(a) * k[0]); m.rotation.y = -a + (k[2] > 0 ? 0 : Math.PI); };
G.add(f);
}
return true;
});
},
function (P, cx, cz, rot) {
edsAt(P, cx, cz, rot, function (G, H, X, Z) {
var soil = edsM(0x6A5438, "earth"), water = edsM(0x3A9AB0, null, { e: 0x0E4A5A, ei: 0.4 }), R = edsRnd(77), beds = [["melon", 0.9, 1.6], ["cabbage", 1.0, 1.0], ["onion", 1.3, 0.5], ["wheat", 1.5, 0.4], ["pumpkin", 1.0, 1.7], ["carrot", 1.2, 0.5], ["aubergine", 1.2, 0.9], ["pepper", 1.3, 0.6]], i, j, k;
for (i = 0; i < 8; i++) {
var bx = (i % 4 - 1.5) * 8, bz = (i < 4 ? -5 : 5);
edsBox(G, soil, 6.6, 0.16, 8, bx, 0.08, bz);
edsBox(G, water, 0.4, 0.05, 8.4, bx + 3.6, 0.1, bz);
var b = beds[i], step = b[2], n = 0;
for (j = -2.8; j <= 2.8; j += Math.max(0.9, step))
for (k = -3.4; k <= 3.4; k += step) {
if (P.lite && (n++ % 2))
continue;
var px = bx + j + (R() - 0.5) * 0.2, pz = bz + k + (R() - 0.5) * 0.2;
if (b[0] === "carrot" || b[0] === "onion") {
edsCone(G, edsM(0x4E8A3A), 0.1, 0.36, px, 0.34, pz, 4);
if ((n + j * 3 | 0) % 3 === 0)
EDS_FRUIT[b[0]](G, px + 0.2, 0.17, pz, b[1]);
}
else if (b[0] === "wheat")
EDS_FRUIT.wheat(G, px, 0.16, pz, 1.6);
else if (b[0] === "melon" || b[0] === "pumpkin") {
edsPut(G, new THREE.IcosahedronGeometry(0.5, 0), edsM(0x4A7A34), px, 0.24, pz).scale.set(1.3, 0.16, 1.3);
EDS_FRUIT[b[0]](G, px + 0.3, 0.16, pz + 0.2, b[1]);
}
else if (b[0] === "cabbage")
EDS_FRUIT.cabbage(G, px, 0.16, pz, 1.5);
else {
edsBush(G, px, 0.1, pz, 0.42, 0x4A7A34);
EDS_FRUIT[b[0]](G, px + 0.25, 0.5, pz, b[1]);
EDS_FRUIT[b[0]](G, px - 0.2, 0.42, pz + 0.2, b[1]);
}
}
}
edsBox(G, water, 33, 0.05, 0.6, 0, 0.1, 0);
edsCyl(G, edsM(0x6A4A2A, "wood"), 0.12, 0.16, 3.2, -17.5, 1.6, 0, 6);
var pole = edsCyl(G, edsM(0x7A5A3A, "wood"), 0.06, 0.08, 6.4, -17.5, 3.3, 0, 6);
pole.rotation.z = Math.PI / 2 - 0.32;
edsSph(G, edsM(0x9A7A5A, "mud"), 0.5, -14.5, 2.3, 0);
edsCyl(G, edsM(0x3A2A1A), 0.01, 0.01, 2.0, -20.5, 3.3, 0, 3);
edsJar(G, -20.5, 1.9, 0, 2, 1);
[[19, -7, "fig", 0x4A7A3A], [19, 6, "orange", 0x3A7A34], [-19, -9, "pomegranate", 0x4A8A3E], [-20, 9, "lemon", 0x4E8A3A]].forEach(function (t, q) {
edsCyl(G, edsM(0x6A5238, "bark"), 0.16, 0.26, 2.2, t[0], 1.1, t[1], 7);
edsPut(G, new THREE.IcosahedronGeometry(1.9, 1), edsM(t[3]), t[0], 3.3, t[1]).scale.set(1.15, 0.9, 1.15);
for (var f = 0; f < (P.lite ? 6 : 14); f++) {
var a = f * 2.4, e = 1.2 + ((f * 7) % 5) * 0.14, fy = 2.5 + ((f * 13) % 10) * 0.14;
EDS_FRUIT[t[2]](G, t[0] + Math.cos(a) * e, fy, t[1] + Math.sin(a) * e, 1.5);
}
edsBasket(G, t[0] + (q < 2 ? -1.6 : 1.6), 0, t[1] + 1, 1.5);
edsHeap(G, t[2], t[0] + (q < 2 ? -1.6 : 1.6), 0.1, t[1] + 1, 7, 1.4, 0.22);
edsSolidR(X, Z, rot, t[0], t[1], 0.4, 3);
});
});
},
function (P, cx, cz) {
edsAt(P, cx, cz, 0, function (G, H, X, Z, rot) {
for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.283 + 0.3, r = 19;
if (i === 2 || i === 3)
continue;
edsTent(G, X, Z, rot, Math.sin(a) * r, Math.cos(a) * r, i % 2 ? 11 : 9, 6, a + Math.PI, i + 3, P.lite);
}
edsFire(G, 0, 0, 1.6);
edsRug(G, -3, 2, 2.6, 4, 0.4);
edsRug(G, 3, 2.4, 2.6, 4, -0.5, 0xD8E0FF);
edsRug(G, 0, -3.6, 4, 2.6, 0, 0xFFE0C0);
[0xB8372A, 0x2447A8, 0xD8A838, 0x2F8558, 0x7A2E6A].forEach(function (c, k) { edsCushion(G, Math.cos(k * 1.3) * 3.4, Math.sin(k * 1.3) * 3.4 + 0.4, c, 1.2); });
edsJar(G, 1.2, 0, -0.6, 1, 0.5, 0xC89A3A);
edsJar(G, 1.6, 0, -0.2, 1, 0.4, 0xC89A3A);
edsCyl(G, edsM(0xD8A838, null, { e: 0x5A3A08, ei: 0.4 }), 0.4, 0.4, 0.03, -1.4, 0.05, -0.8, 12);
edsLathe(G, edsM(0x6A4A2A, "wood"), [[0, 0], [0.14, 0], [0.1, 0.1], [0.16, 0.34], [0.13, 0.36]], -1.9, 0, 0.2, 8);
edsBox(G, edsM(0x7A5A3A, "wood"), 0.1, 0.1, 3.2, 9, 0.25, 8);
edsBox(G, edsM(0x7A5A3A, "wood"), 0.1, 0.1, 3.2, 12, 0.25, 8);
edsBox(G, edsM(0xE8DCC0), 2.9, 0.02, 3.0, 10.5, 0.22, 8);
edsPut(G, new THREE.PlaneGeometry(2.9, 1.6), edsM(0xFFFFFF, "kilim"), 10.5, 0.25, 7.2, -Math.PI / 2);
edsCyl(G, edsM(0x6A4A2A, "wood"), 0.06, 0.08, 1.2, -9, 0.6, 7, 5);
edsBox(G, edsM(0x6A4A2A, "wood"), 0.5, 0.06, 0.1, -9, 1.22, 7);
edsSph(G, edsM(0x6A5A4A), 0.12, -9, 1.42, 7, 1, 1.5, 1.2, 7);
edsSph(G, edsM(0xE8E0D0), 0.07, -9, 1.6, 7.06);
for (var s = 0; s < 3; s++) {
edsBox(G, edsM(0x8A2A1A, "kilim"), 0.8, 0.5, 1.1, -11 + s * 1.3, 0.35, 10);
edsCyl(G, edsM(0x6A4A2A, "wood"), 0.05, 0.05, 0.5, -11 + s * 1.3, 0.75, 10.4, 5);
}
edsBox(G, edsM(0x6A4A2A, "wood"), 2.6, 0.06, 0.06, 8, 1.4, -9);
[6.8, 9.2].forEach(function (x) { edsCyl(G, edsM(0x6A4A2A, "wood"), 0.05, 0.06, 1.4, x, 0.7, -9, 5); });
for (var w = 0; w < 3; w++)
edsSph(G, edsM(0x5A4030), 0.24, 7.3 + w * 0.7, 1.05, -9, 0.9, 1.5, 0.7, 8);
for (var f = 0; f < 16; f++) {
var fa = f / 16 * 6.283;
edsBush(G, -24 + Math.cos(fa) * 6, 0, -12 + Math.sin(fa) * 6, 0.7, 0x8A7A52);
}
});
},
function (P, cx, cz) {
var kinds = ["fruit", "spice", "veg", "pots", "lamps", "cloth", "rugs", "bread", "fruit", "tea", "veg", "spice"];
edsAt(P, cx, cz, 0, function (G, H, X, Z, rot) {
for (var i = 0; i < 12; i++) {
var a = i / 12 * 6.283 + 0.26, r = 16.5;
if (i === 9)
continue;
edsStall(G, X, Z, rot, Math.sin(a) * r, Math.cos(a) * r, a + Math.PI, kinds[i], i + 2, P.lite);
}
var pole = edsM(0x6A4A2A, "wood"), cols = [0xB8372A, 0xE8C860, 0x2447A8, 0xF0E4C8];
for (var k = 0; k < 4; k++) {
var px = (k % 2 ? 1 : -1) * 5.5, pz = (k < 2 ? 1 : -1) * 5.5;
edsCyl(G, pole, 0.1, 0.13, 5.4, px, 2.7, pz, 6);
var sl = edsPut(G, new THREE.PlaneGeometry(5.6, 5.6, 3, 3), edsM(cols[k], null, { ds: 1 }), px / 2, 5.0, pz / 2, -Math.PI / 2);
var p = sl.geometry.attributes.position;
for (var v = 0; v < p.count; v++)
p.setZ(v, -0.5 * Math.cos(p.getX(v) / 2.8 * 1.57) * Math.cos(p.getY(v) / 2.8 * 1.57));
sl.geometry.computeVertexNormals();
}
edsCyl(G, pole, 0.12, 0.14, 6.2, 0, 3.1, 0, 6);
edsCyl(G, edsM(0x2FA3A0, "tile"), 2.3, 2.4, 0.7, 0, 0.35, 0, 8);
edsCyl(G, edsM(0x3A9AB0, null, { e: 0x0E4A5A, ei: 0.4 }), 2.0, 2.0, 0.04, 0, 0.66, 0, 8);
edsCyl(G, edsM(0xE8D8B0, "marble"), 0.3, 0.4, 1.3, 0, 0.9, 0, 8);
edsCyl(G, edsM(0xE8D8B0, "marble"), 0.8, 0.3, 0.25, 0, 1.6, 0, 10);
edsSolidR(X, Z, rot, 0, 0, 2.5, 1);
edsBasket(G, -6.5, 0, 2.5, 1.6);
var sn = edsCyl(G, edsM(0x6A7A3A), 0.05, 0.07, 1.0, -6.5, 0.9, 2.5, 6);
edsSph(G, edsM(0x6A7A3A), 0.1, -6.5, 1.45, 2.55, 1.5, 1, 0.7, 7);
edsRug(G, 6.5, -2.5, 3, 4.4, 0.3);
edsCyl(G, edsM(0x8A5A3A, "wood"), 0.26, 0.2, 0.5, 6, 0.25, -3.4, 10);
edsCyl(G, edsM(0xE8DCC0), 0.26, 0.26, 0.02, 6, 0.51, -3.4, 10);
edsSph(G, edsM(0xA8703A, "wood"), 0.24, 7.2, 0.3, -1.6, 1, 0.6, 1.4, 10);
edsBox(G, edsM(0x6A4A2A, "wood"), 0.06, 0.04, 0.8, 7.2, 0.36, -0.9);
var shops = [[-27, -16, 1.1, 8, 6.5, 0xE2C090, "potter"], [-30, 9, 1.9, 7, 6, 0xD8B888, "weaver"], [2, 32, 3.14, 10, 7.5, 0xEAD0A0, "tea"], [27, 17, -2.1, 7, 6, 0xD8BC94, "lamp"], [31, -10, -1.2, 7.5, 6, 0xE2C090, "dyer"]];
shops.forEach(function (s, q) {
var g = new THREE.Group();
g.position.set(s[0], 0, s[1]);
g.rotation.y = s[2];
G.add(g);
var c = Math.cos(rot), sn2 = Math.sin(rot), wx = X + s[0] * c + s[1] * sn2, wz = Z - s[0] * sn2 + s[1] * c;
edsRoom(g, wx, wz, rot + s[2], 0, 0, s[3], s[4], 3.6 + (q % 2) * 0.5, { col: s[5], beams: 1, dome: q === 2 ? 0xF0E8D8 : null, floor: [0xB89468, "earth"], gap: 2.4 });
edsRug(g, 0, 0, s[3] * 0.5, s[4] * 0.5, 0, [0xFFFFFF, 0xD8E0FF, 0xFFE0C0][q % 3]);
if (s[6] === "potter") {
edsCyl(g, edsM(0x6A4A2A, "wood"), 0.5, 0.5, 0.1, -1.5, 0.5, -1, 12);
edsCyl(g, edsM(0x6A4A2A, "wood"), 0.08, 0.08, 0.5, -1.5, 0.25, -1, 6);
edsJar(g, -1.5, 0.55, -1, 0, 0.6, 0x9A6A4A);
for (var j = 0; j < 8; j++)
edsJar(g, 1.2 + (j % 3) * 0.7, 0, -2.2 + Math.floor(j / 3) * 0.8, j % 5, 0.5 + (j % 3) * 0.2);
edsBox(g, edsM(0x8A6A4A, "wood"), 0.4, 1.8, 3, 3.2, 0.9, 0.4);
for (var j2 = 0; j2 < 6; j2++)
edsJar(g, 3.1, 0.6 + (j2 % 2) * 0.7, -0.6 + (j2 % 3) * 0.8, (j2 + 1) % 5, 0.36);
}
if (s[6] === "weaver") {
edsBox(g, edsM(0x6A4A2A, "wood"), 0.12, 2.4, 0.12, -1.2, 1.2, -2);
edsBox(g, edsM(0x6A4A2A, "wood"), 0.12, 2.4, 0.12, 1.2, 1.2, -2);
edsBox(g, edsM(0x6A4A2A, "wood"), 2.6, 0.12, 0.12, 0, 2.4, -2);
edsPut(g, new THREE.PlaneGeometry(2.2, 1.3), edsM(0xFFFFFF, "kilim", { ds: 1 }), 0, 0.9, -2);
edsPut(g, new THREE.PlaneGeometry(2.2, 0.9), edsM(0xE8DCC0, null, { ds: 1 }), 0, 2.0, -2);
for (var w = 0; w < 6; w++)
edsSph(g, edsM([0xB8372A, 0x2447A8, 0xD8A838, 0x2F8558, 0x7A2E6A, 0xE8D8B0][w]), 0.2, 2.2, 0.2, -1.5 + w * 0.5);
}
if (s[6] === "tea") {
for (var t = 0; t < 4; t++) {
var tx = (t % 2 ? 1 : -1) * 2.6, tz = (t < 2 ? 1 : -1) * 1.6;
edsCyl(g, edsM(0xD8A838, null, { e: 0x5A3A08, ei: 0.4 }), 0.55, 0.55, 0.03, tx, 0.42, tz, 12);
edsCyl(g, edsM(0x6A4A2A, "wood"), 0.25, 0.3, 0.4, tx, 0.2, tz, 8);
edsJar(g, tx, 0.44, tz, 1, 0.3, 0xC89A3A);
for (var c2 = 0; c2 < 4; c2++)
edsCushion(g, tx + Math.cos(c2 * 1.57) * 1.0, tz + Math.sin(c2 * 1.57) * 1.0, [0xB8372A, 0x2447A8, 0xD8A838, 0x2F8558][c2]);
}
edsBox(g, edsM(0x8A6A4A, "wood"), 3, 1.0, 0.7, 0, 0.5, -3.0);
for (var u = 0; u < 5; u++)
edsJar(g, -1.2 + u * 0.6, 1.0, -3.0, (u + 1) % 5, 0.3, 0xC89A3A);
for (var l = 0; l < 3; l++)
edsLamp(g, -3 + l * 3, 2.9, 0, 1.2);
}
if (s[6] === "lamp") {
edsBox(g, edsM(0x8A6A4A, "wood"), 4, 0.9, 0.8, 0, 0.45, -2.2);
for (var m = 0; m < 7; m++)
edsLamp(g, -1.6 + m * 0.55, 0.9, -2.2, 0.8 + (m % 3) * 0.3);
for (var m2 = 0; m2 < 5; m2++)
edsLamp(g, -2 + m2, 2.6, 0.5, 1.3);
edsBox(g, edsM(0x3A3A40), 0.6, 0.5, 0.5, 2.2, 0.25, 0.5);
edsCyl(g, edsM(0x5A5A60), 0.2, 0.26, 0.3, 2.2, 0.65, 0.5, 6);
}
if (s[6] === "dyer") {
[0x2447A8, 0xB8372A, 0xD8A020, 0x2F8558].forEach(function (dc, v) { edsCyl(g, edsM(0xB8906A, "mud"), 0.6, 0.5, 0.7, -2 + v * 1.3, 0.35, -1.6, 10); edsCyl(g, edsM(dc), 0.52, 0.52, 0.03, -2 + v * 1.3, 0.69, -1.6, 10); });
edsBox(g, edsM(0x6A4A2A, "wood"), 5, 0.06, 0.06, 0, 2.5, 1.2);
[0x2447A8, 0xB8372A, 0xD8A020, 0x2F8558, 0x7A2E6A].forEach(function (dc, v) { edsPut(g, new THREE.PlaneGeometry(0.8, 1.7), edsM(dc, null, { ds: 1 }), -2 + v, 1.6, 1.2); });
}
});
for (var b = 0; b < 8; b++) {
var ba = b * 0.83 + 0.5;
edsBox(G, edsM(b % 2 ? 0xC8B088 : 0xB89868), 1.1, 0.7, 0.8, Math.sin(ba) * 24, 0.35, Math.cos(ba) * 24, ba);
}
});
edsAt(P, 150, -45, -Math.PI / 2, function (G, H, X, Z, rot) {
edsRoom(G, X, Z, rot, 0, 0, 30, 30, 6.2, { col: 0xE0BE8C, roof: false, gap: 4.2, dh: 4.6, t: 0.9 });
for (var i = -3; i <= 3; i++) {
edsBox(G, edsM(0xE0BE8C, "mud"), 1.6, 0.9, 1.0, i * 4.2, 6.6, 15);
}
var roof = edsM(0xD0B080, "mud"), post = edsM(0xE8D0A0, "plaster");
[[0, -11.6, 24, 5], [-11.6, 0, 5, 24], [11.6, 0, 5, 24]].forEach(function (r) { edsBox(G, roof, r[2], 0.3, r[3], r[0], 3.7, r[1]); });
for (var k = -2; k <= 2; k++) {
edsCyl(G, post, 0.28, 0.32, 3.6, k * 4.6, 1.8, -9.2, 8);
edsCyl(G, post, 0.28, 0.32, 3.6, -9.2, 1.8, k * 4.6, 8);
edsCyl(G, post, 0.28, 0.32, 3.6, 9.2, 1.8, k * 4.6, 8);
}
edsCyl(G, edsM(0xC8B090, "stone"), 1.5, 1.6, 0.9, 0, 0.45, 0, 10);
edsCyl(G, edsM(0x3A9AB0, null, { e: 0x0E4A5A, ei: 0.4 }), 1.25, 1.25, 0.04, 0, 0.86, 0, 10);
edsSolidR(X, Z, rot, 0, 0, 1.7, 1);
for (var b = 0; b < 10; b++)
edsBox(G, edsM(b % 3 ? 0xC8B088 : 0x8A5A3A, b % 3 ? null : "kilim"), 1.2, 0.8, 0.9, -11 + ((b * 3) % 7) * 0.5, 0.4 + (b % 2) * 0.8, -6 + b * 1.3, b);
for (var r2 = 0; r2 < 4; r2++) {
edsRug(G, 11.3, -8 + r2 * 5, 2.4, 3.6, 0, [0xFFFFFF, 0xD8E0FF][r2 % 2]);
edsCushion(G, 12.4, -8 + r2 * 5, [0xB8372A, 0x2447A8, 0xD8A838, 0x2F8558][r2]);
edsJar(G, 12.6, 0, -6.4 + r2 * 5, r2, 0.5);
}
for (var t = 0; t < 4; t++) {
edsBox(G, edsM(0x8A6A4A, "wood"), 3, 0.5, 0.8, -6 + t * 4, 0.4, -12.6);
edsHeap(G, "wheat", -6 + t * 4, 0.65, -12.6, 3, 1.4, 0.5);
}
edsLamp(G, -2.6, 4.4, 14.2, 2);
edsLamp(G, 2.6, 4.4, 14.2, 2);
});
},
function (P) {
var PX = -220, PZ = -300, PR = 0.3, lite = P.lite;
edsAt(P, -156, -244, 0.45, function (G, H, X, Z, rot) {
edsSphinx(G, {});
edsSolid(X, Z, rot, 0, -3, 8.2, 25, 12);
var rk = edsM(0xC8AC7C, "rock");
edsBox(G, rk, 1.6, 2.2, 56, -13, 1.1, -3);
edsBox(G, rk, 1.6, 2.2, 56, 13, 1.1, -3);
edsBox(G, rk, 27.6, 2.2, 1.6, 0, 1.1, -31.6);
edsSolid(X, Z, rot, -13, -3, 0.8, 28, 2.2);
edsSolid(X, Z, rot, 13, -3, 0.8, 28, 2.2);
edsSolid(X, Z, rot, 0, -31.6, 13.8, 0.8, 2.2);
[-1, 1].forEach(function (sd) { edsObelisk(G, sd * 9.5, 27, 7, 0); edsSolidR(X, Z, rot, sd * 9.5, 27, 0.8, 7); for (var i = 0; i < 3; i++) {
var bz = edsCyl(G, edsM(0x2A2420), 0.3, 0.2, 0.3, sd * 4.6, 1.0, 24 + i * 4, 8);
edsCyl(G, edsM(0x6A5A4A, "stone"), 0.1, 0.2, 0.9, sd * 4.6, 0.45, 24 + i * 4, 6);
if (typeof ldFlame === "function")
ldFlame(G, sd * 4.6, 1.1, 24 + i * 4, 0.7);
} });
});
edsAt(P, -156, -244, 0.45, function (G, H, X, Z, rot) {
[-1, 1].forEach(function (sd) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), new THREE.MeshBasicMaterial({ color: 0xFFD060, transparent: true, opacity: 0 }));
e.scale.set(1, 1, 0.4);
e.position.set(sd * 1.15, 17.6, 7.82);
e.userData.ldAnim = function (m, t) { var c = camera.position, d = Math.hypot(c.x - (LD.ox + X), c.z - (LD.oz + Z)), want = d < 46 ? 0.9 : 0; m.material.opacity += (want - m.material.opacity) * 0.03; };
G.add(e);
});
return true;
});
P.k("pyramid", PX, PZ, PR, 1.4, { solid: false });
edsAt(P, PX, PZ, PR, function (G, H, X, Z, rot) {
var a = edsPyramid(G, 46.8, 44, { lite: lite }), gr = edsM(0xFFFFFF, "granite"), i;
edsSolid(X, Z, rot, 0, 0, 31.4, 31.4, 40);
[-1, 1].forEach(function (sd) { edsBox(G, gr, 1.5, 6.2, 3.0, sd * 2.6, 3.1, a + 0.9); var ch = edsBox(G, edsM(0xF0E0BC, "course"), 1.6, 6.4, 3.0, sd * 2.2, 8.6, a + 0.2, 0, 0, sd * 0.62); });
edsBox(G, gr, 7.2, 1.3, 3.2, 0, 6.8, a + 0.9);
edsBox(G, edsM(0x100C0A), 3.6, 6.0, 0.4, 0, 3.0, a - 0.2);
edsBox(G, edsM(0xE8D4A0, "carved"), 6.6, 0.9, 0.1, 0, 6.8, a + 2.52);
for (i = 0; i < 4; i++)
edsBox(G, edsM(0xD8C8A0, "stone"), 9 - i * 1.2, 0.22, 1.0, 0, 0.11 + i * 0.22, a + 5.2 - i * 1.0);
[-1, 1].forEach(function (sd) { var bz = sd * 5.2; edsCyl(G, edsM(0x6A5A4A, "stone"), 0.14, 0.26, 1.4, bz, 0.7, a + 4.6, 6); edsCyl(G, edsM(0x2A2420), 0.42, 0.24, 0.34, bz, 1.5, a + 4.6, 8); if (typeof ldFlame === "function")
ldFlame(G, bz, 1.62, a + 4.6, 1.0); if (typeof ldHalo === "function")
ldHalo(G, bz, 2.2, a + 4.6, 0xFFB060, 4, 0.4); });
edsBox(G, edsM(0xE0D0A8, "stone"), 86, 0.08, 86, 0, 0.04, 0);
edsBox(G, edsM(0xDCCBA0, "stone"), 6, 0.12, 46, 0, 0.06, a + 29);
for (i = 0; i < (lite ? 4 : 7); i++) {
var z = a + 10 + i * (lite ? 10 : 6);
edsLittleSphinx(G, -4.6, z, Math.PI / 2, i % 2);
edsLittleSphinx(G, 4.6, z, -Math.PI / 2, i % 2);
edsSolid(X, Z, rot, -4.6, z, 1.8, 0.8, 2);
edsSolid(X, Z, rot, 4.6, z, 1.8, 0.8, 2);
}
edsPylon(G, 0, a + 54, 17, 7.5, 3, 3.6);
edsSolid(X, Z, rot, -5.2, a + 54, 3.4, 1.5, 8);
edsSolid(X, Z, rot, 5.2, a + 54, 3.4, 1.5, 8);
[-1, 1].forEach(function (sd) { edsObelisk(G, sd * 7, a + 7, 12, 0); edsSolidR(X, Z, rot, sd * 7, a + 7, 1.0, 12); });
for (i = 0; i < 3; i++) {
var g = new THREE.Group();
g.position.set(-66, 0, -18 + i * 27);
G.add(g);
edsPyramid(g, 14, 13, { worn: 1, col: 0xE4D0A4 });
edsBox(g, edsM(0x100C0A), 1.3, 1.9, 0.3, 0, 0.95, 9.8);
edsSolid(X, Z, rot, -66, -18 + i * 27, 9.6, 9.6, 12);
}
for (i = 0; i < (lite ? 3 : 6); i++) {
var mx = 58 + (i % 2) * 17, mz = -36 + Math.floor(i / 2) * 15, m = edsPut(G, new THREE.CylinderGeometry(0.62, 0.707, 1, 4, 1), edsM(0xE0CCA0, "course"), mx, 1.7, mz, 0, Math.PI / 4, 0);
m.scale.set(13, 3.4, 9);
edsBox(G, edsM(0xD8B890, "carved"), 1.6, 2.4, 0.2, mx, 1.2, mz + 4.6);
edsSolid(X, Z, rot, mx, mz, 6.5, 4.5, 3.4);
}
var bt = new THREE.Group();
bt.position.set(58, 0, 22);
bt.rotation.y = 0.1;
G.add(bt);
var cedar = edsM(0x9A6A3A, "wood");
var hull = edsPut(bt, new THREE.SphereGeometry(1, 16, 8, 0, 6.283, Math.PI / 2, Math.PI / 2), cedar, 0, 3.0, 0);
hull.scale.set(2.4, 1.7, 15);
edsBox(bt, cedar, 4.4, 0.12, 22, 0, 2.95, 0);
[-1, 1].forEach(function (sd) { var st = edsCyl(bt, cedar, 0.2, 0.34, 6, 0, 5.2, sd * 14.6, 7); st.rotation.x = -sd * 0.5; edsCone(bt, edsM(0x2F8558), 0.6, 1.2, 0, 8.2, sd * 16.2, 7); });
edsBox(bt, edsM(0xB8834A, "wood"), 3.2, 2.0, 7, 0, 4.0, -1.5);
edsBox(bt, cedar, 3.6, 0.14, 7.6, 0, 5.06, -1.5);
for (i = 0; i < 5; i++) {
[-1, 1].forEach(function (sd) { var oar = edsCyl(bt, cedar, 0.05, 0.05, 6.5, sd * 3.6, 2.6, 5 + i * 1.6 - 8, 4); oar.rotation.z = sd * 0.9; });
}
for (i = 0; i < 4; i++)
edsBox(bt, edsM(0xD8C8A0, "stone"), 5, 1.5, 1.2, 0, 0.75, -9 + i * 6);
edsSolid(X, Z, rot, 58, 22, 2.8, 15, 5);
});
edsAt(P, -118, -292, 0.9, function (G, H, X, Z, rot) {
[[0, 0, 9, 7, "bakery"], [-12, 3, 7, 6, "brewery"], [11, -5, 8, 6, "store"], [-4, -13, 8, 6.5, "house"]].forEach(function (h, q) {
edsRoom(G, X, Z, rot, h[0], h[1], h[2], h[3], 3.2, { col: [0xDCC098, 0xD4B488, 0xE0C8A0, 0xD8BC90][q], beams: 1, floor: [0xB89468, "earth"] });
if (h[4] === "bakery") {
edsPut(G, new THREE.SphereGeometry(1.1, 12, 8, 0, 6.283, 0, Math.PI / 2), edsM(0xC89868, "mud"), h[0] - 2.6, 0, h[1] - 1.8);
edsBox(G, edsM(0x1E1612), 0.6, 0.5, 0.1, h[0] - 2.6, 0.35, h[1] - 0.72);
for (var i = 0; i < 4; i++)
edsHeap(G, "bread", h[0] + 1 + i * 0.5, 0.5, h[1] - 2.2, 5, 1.2, 0.02);
edsBox(G, edsM(0x8A6A4A, "wood"), 3, 0.5, 0.9, h[0] + 1.8, 0.25, h[1] - 2.2);
}
if (h[4] === "brewery") {
for (var j = 0; j < 8; j++)
edsJar(G, h[0] - 2 + (j % 4) * 1.2, 0, h[1] - 1.8 + Math.floor(j / 4) * 1.2, 4, 0.9);
}
if (h[4] === "store") {
for (var k = 0; k < 9; k++) {
edsBox(G, edsM(0xC8B088), 0.9, 0.6, 0.7, h[0] - 2.6 + (k % 3) * 1.0, 0.3 + Math.floor(k / 3) * 0.6, h[1] - 2);
}
edsHeap(G, "onion", h[0] + 2, 0.1, h[1] - 1.5, 12, 1.5, 0.5);
edsHeap(G, "garlic", h[0] + 2.4, 0.1, h[1], 10, 1.5, 0.4);
}
if (h[4] === "house") {
edsRug(G, h[0], h[1], 4, 3, 0);
edsBox(G, edsM(0x8A6A4A, "wood"), 2, 0.4, 1, h[0] - 2.4, 0.2, h[1] - 2);
edsCushion(G, h[0] - 2.4, h[1] - 2, 0xE8DCC0, 1.4);
edsJar(G, h[0] + 3, 0, h[1] - 2.4, 0, 0.9);
}
});
edsBox(G, edsM(0x7A5A3A, "wood"), 2.4, 0.24, 5, 9, 0.14, 10);
edsBox(G, edsM(0xEAD8B0, "course"), 2.0, 1.7, 3.2, 9, 1.1, 10);
edsBox(G, edsM(0x9A8258, "earth"), 3, 0.03, 6, 9, 0.02, 15.5);
for (var r = 0; r < 3; r++)
edsBox(G, edsM(0xC8B890), 0.05, 0.05, 8, 8.2 + r * 0.8, 0.06, 16.5);
});
edsAt(P, -306, -352, -0.4, function (G, H, X, Z, rot) {
var canvas = edsM(0xF0E8D8, null, { ds: 1 }), wood = edsM(0x8A6A4A, "wood"), i;
for (i = 0; i < 3; i++) {
var t = edsPut(G, new THREE.CylinderGeometry(0.01, 2.4, 2.4, 4, 1, true), canvas, -9 + i * 8, 1.2, -9, 0, Math.PI / 4, 0);
t.scale.set(1, 1, 1.3);
edsCyl(G, wood, 0.05, 0.05, 2.6, -9 + i * 8, 1.3, -9, 5);
edsSolidR(X, Z, rot, -9 + i * 8, -9, 1.6, 2.2);
}
edsBox(G, edsM(0xA88E60, "earth"), 12, 0.05, 9, 0, 0.03, 3);
edsBox(G, edsM(0xFFFFFF, "hiero"), 8, 1.5, 0.4, 0, 0.75, -1.2);
edsBox(G, edsM(0xC8B088, "mud"), 0.4, 1.0, 6, -5.8, 0.5, 2);
edsSolid(X, Z, rot, 0, -1.2, 4, 0.3, 1.5);
for (i = 0; i < 5; i++) {
edsBox(G, edsM(0xE8E0D0), 0.03, 0.03, 9, -6 + i * 3, 0.5, 3);
edsBox(G, edsM(0xE8E0D0), 12, 0.03, 0.03, 0, 0.5, -1.5 + i * 2.25);
}
for (i = 0; i < 5; i++)
edsJar(G, -3 + i * 1.4, 0.05, 2 + (i % 2) * 1.5, i, 0.6 + 0.1 * i);
edsColossus(G, 5.5, 6, 2.4, 0.32, { broken: 1 });
edsBox(G, wood, 4, 0.08, 1.4, 9, 0.9, 5);
[7.2, 10.8].forEach(function (x) { edsBox(G, wood, 0.1, 0.9, 1.3, x, 0.45, 5); });
for (i = 0; i < 6; i++)
edsJar(G, 7.6 + i * 0.55, 0.94, 5, (i + 2) % 5, 0.25);
edsSolid(X, Z, rot, 9, 5, 2, 0.7, 1);
for (i = 0; i < 3; i++) {
edsCyl(G, wood, 0.03, 0.03, 1.8, -9.6 + i * 0.5, 0.9, 6.6 + (i % 2) * 0.5, 4).rotation.z = (i - 1) * 0.3;
}
edsBox(G, wood, 0.9, 0.1, 0.9, -9.4, 1.0, 6.8);
for (i = 0; i < 6; i++)
edsBox(G, wood, 1.0, 0.7, 0.8, 11 + (i % 2) * 1.1, 0.35 + Math.floor(i / 2) * 0.7, -4);
});
},
function (P, cx, cz, rot0) {
var lite = P.lite;
edsAt(P, cx, cz, rot0, function (G, H, X, Z, rot) {
var wall = edsM(0xFFFFFF, "hiero2"), wall1 = edsM(0xFFFFFF, "hiero"), flag = edsM(0xDCCBA0, "stone"), i, j;
edsBox(G, flag, 36, 0.1, 62, 0, 0.05, 2);
edsPylon(G, 0, 30, 36, 13.5, 5, 4.6);
edsSolid(X, Z, rot, -10.2, 30, 7.8, 2.5, 13);
edsSolid(X, Z, rot, 10.2, 30, 7.8, 2.5, 13);
[[-17, 17, 1, 22], [17, 17, 1, 22]].forEach(function (w) { edsBox(G, wall, w[2], 7, w[3], w[0], 3.5, w[1]); edsSolid(X, Z, rot, w[0], w[1], w[2] / 2, w[3] / 2, 7); });
for (i = 0; i < (lite ? 3 : 5); i++) {
var z = 26 - i * (lite ? 8 : 4.4) - 2;
[-12.6, 12.6].forEach(function (x) { edsColumn3(G, x, z, 7, 0.75, lite); edsSolidR(X, Z, rot, x, z, 0.9, 7); });
}
[-1, 1].forEach(function (sd) { edsBox(G, edsM(0xE8D4A0, "rock"), 5, 0.5, 22, sd * 14.6, 7.9, 17); });
edsBox(G, edsM(0xE8D4A0, "carved"), 3, 1.3, 3, 0, 0.65, 17);
edsCyl(G, edsM(0xF0C040, null, { e: 0x8A6410, ei: 0.7 }), 1.1, 1.1, 0.12, 0, 2.4, 17, 18).rotation.x = Math.PI / 2;
edsSolid(X, Z, rot, 0, 17, 1.5, 1.5, 1.3);
edsBox(G, wall1, 1, 10, 22, -17, 5, -5);
edsBox(G, wall1, 1, 10, 22, 17, 5, -5);
edsSolid(X, Z, rot, -17, -5, 0.5, 11, 10);
edsSolid(X, Z, rot, 17, -5, 0.5, 11, 10);
[-1, 1].forEach(function (sd) { edsBox(G, wall1, 14, 10, 1, sd * 10.5, 5, 6); edsSolid(X, Z, rot, sd * 10.5, 6, 7, 0.5, 10); edsBox(G, wall1, 13, 10, 1, sd * 11, 5, -16); edsSolid(X, Z, rot, sd * 11, -16, 6.5, 0.5, 10); });
edsBox(G, wall1, 8, 3, 1, 0, 8.5, 6);
edsBox(G, wall1, 9, 4, 1, 0, 8, -16);
for (i = 0; i < 4; i++)
for (j = 0; j < 4; j++) {
if (lite && (i + j) % 2)
continue;
var cxx = -11.4 + i * 7.6, czz = 2 - j * 5, mid = (i === 1 || i === 2);
edsColumn3(G, cxx, czz, mid ? 10.5 : 8.6, mid ? 1.25 : 1.05, lite);
edsSolidR(X, Z, rot, cxx, czz, mid ? 1.4 : 1.2, 9);
}
edsBox(G, edsM(0xE0CC98, "rock"), 34, 0.5, 6, -0, 9.6, -5).scale.set(0.33, 1, 3.7);
[-1, 1].forEach(function (sd) { edsBox(G, edsM(0xE0CC98, "rock"), 11, 0.5, 22, sd * 11.5, 9.3, -5); });
edsBox(G, edsM(0xFFFFFF, "stars"), 11.2, 0.1, 22, 0, 11.2, -5);
[-1, 1].forEach(function (sd) { edsBox(G, wall, 0.5, 1.8, 22, sd * 5.6, 10.3, -5); });
edsRoom(G, X, Z, rot, 0, -23, 12, 13, 6.5, { col: 0xE8D4A0, tex: "carved", itex: "hierogold", icol: 0xFFFFFF, gap: 3, dh: 4.6, t: 1, parapet: false, floor: [0xC8B088, "stone"] });
var gold = edsM(0xF0C040, null, { e: 0x8A6410, ei: 0.55 });
edsBox(G, edsM(0xFFFFFF, "granite"), 2.4, 1.4, 4, 0, 0.7, -21);
var hb = edsPut(G, new THREE.SphereGeometry(1, 12, 6, 0, 6.283, Math.PI / 2, Math.PI / 2), gold, 0, 2.2, -21);
hb.scale.set(0.6, 0.6, 2.6);
edsBox(G, gold, 0.9, 0.9, 1.2, 0, 2.6, -21);
edsSolid(X, Z, rot, 0, -21, 1.3, 2.1, 2);
edsBox(G, edsM(0xFFFFFF, "granite"), 2.6, 1.2, 1.6, 0, 0.6, -27.2);
edsBox(G, gold, 1.1, 2.0, 0.7, 0, 2.2, -27.3);
edsSph(G, gold, 0.5, 0, 3.6, -27.2, 1, 1.1, 1, 10);
edsCone(G, gold, 0.2, 0.5, 0, 3.5, -26.7, 5).rotation.x = Math.PI / 2;
edsSph(G, edsM(0xD8372A, null, { e: 0xA81808, ei: 0.8 }), 0.6, 0, 4.6, -27.3, 1, 1, 0.25, 12);
[-3.6, 3.6].forEach(function (x) { edsCyl(G, edsM(0x6A5A4A, "stone"), 0.14, 0.26, 1.4, x, 0.7, -19, 6); edsCyl(G, edsM(0x2A2420), 0.42, 0.24, 0.34, x, 1.5, -19, 8); if (typeof ldFlame === "function")
ldFlame(G, x, 1.62, -19, 0.9); if (typeof ldHalo === "function")
ldHalo(G, x, 2.1, -19, 0xFFB060, 5, 0.45); });
[-1, 1].forEach(function (sd) { edsColossus(G, sd * 8.5, 36.5, 0, 1.0); edsSolid(X, Z, rot, sd * 8.5, 36.5, 2.3, 3.3, 10); edsObelisk(G, sd * 14.5, 39, 16, 0); edsSolidR(X, Z, rot, sd * 14.5, 39, 1.3, 16); });
for (i = 0; i < (lite ? 3 : 5); i++) {
edsLittleSphinx(G, -5, 44 + i * 5.5, Math.PI / 2, 1);
edsLittleSphinx(G, 5, 44 + i * 5.5, -Math.PI / 2, 1);
edsSolid(X, Z, rot, -5, 44 + i * 5.5, 1.8, 0.8, 2);
edsSolid(X, Z, rot, 5, 44 + i * 5.5, 1.8, 0.8, 2);
}
edsBox(G, edsM(0xD8C8A0, "stone"), 20, 0.7, 13, 31, 0.35, 4);
edsBox(G, edsM(0x2E97A8, null, { e: 0x0E4A5A, ei: 0.5 }), 17.6, 0.06, 10.6, 31, 0.7, 4);
edsSolid(X, Z, rot, 31, 4, 10, 6.5, 0.8);
for (i = 0; i < (lite ? 3 : 6); i++) {
var px = 22 + i * 3.6, pz = (i % 2 ? 13.5 : -5.5);
edsPalm(G, px, 0, pz, 8 + i % 3, i + 50, lite);
edsSolidR(X, Z, rot, px, pz, 0.45, 8);
}
});
},
function (P) {
var lite = P.lite;
edsAt(P, -130, -415, 0.5, function (G, H, X, Z, rot) {
var gr = edsM(0xFFFFFF, "granite"), i;
var ob = edsPut(G, new THREE.CylinderGeometry(1.5, 2.6, 34, 4, 1), gr, 0, 1.4, 0, Math.PI / 2, 0, Math.PI / 4);
ob.rotation.order = "YXZ";
ob.rotation.set(Math.PI / 2, 0, Math.PI / 4);
edsBox(G, edsM(0x2A1E1A), 0.12, 2.4, 0.1, 0.2, 2.2, 6, 0.5);
edsSolid(X, Z, rot, 0, 0, 2.2, 17, 2.6);
[-1, 1].forEach(function (sd) { edsBox(G, gr, 3, 3.4, 40, sd * 5.6, 1.7, 0); edsSolid(X, Z, rot, sd * 5.6, 0, 1.5, 20, 3.4); for (i = 0; i < 5; i++)
edsRock(G, sd * (8 + i % 2 * 3), 1, -16 + i * 8, 2.4 + i % 3, i + sd + 9, 0xB8705A, "granite"); });
for (i = 0; i < 9; i++)
edsSph(G, edsM(0x2A2A2E), 0.2, -2.8 + (i % 3) * 0.4, 0.2, -12 + i * 2.6);
edsBox(G, edsM(0x7A5A3A, "wood"), 2.2, 0.22, 4.4, 13, 0.12, -6);
edsBox(G, gr, 1.8, 1.4, 2.6, 13, 0.95, -6);
for (i = 0; i < 4; i++)
edsCyl(G, edsM(0x7A5A3A, "wood"), 0.14, 0.14, 2.6, 13, 0.14, -12 + i * 1.2, 6).rotation.z = Math.PI / 2;
edsTent(G, X, Z, rot, 14, 10, 8, 5, -1.2, 71, lite);
});
edsAt(P, 300, -170, -Math.PI / 2, function (G, H, X, Z, rot) {
var rose = 0xD08A64, rk = edsM(rose, "rock"), i;
edsRoom(G, X, Z, rot, 0, -6, 24, 18, 13, { col: rose, tex: "rock", icol: 0xE8A882, itex: "rock", gap: 3.4, dh: 5.4, t: 3, parapet: false, floor: [0xC88A6A, "stone"] });
for (i = 0; i < 6; i++) {
if (i === 2 || i === 3) {
edsCyl(G, rk, 0.62, 0.7, 8, (i - 2.5) * 3.6, 4, 4.4, 12);
}
else
edsCyl(G, rk, 0.62, 0.7, 8, (i - 2.5) * 3.6, 4, 3.6, 12);
edsBox(G, rk, 1.7, 0.5, 1.7, (i - 2.5) * 3.6, 8.2, i === 2 || i === 3 ? 4.4 : 3.6);
edsSolidR(X, Z, rot, (i - 2.5) * 3.6, i === 2 || i === 3 ? 4.4 : 3.6, 0.8, 8);
}
edsBox(G, rk, 21, 1.3, 2.6, 0, 9.0, 3.9);
var ped = edsPut(G, new THREE.CylinderGeometry(6.4, 6.4, 2.4, 3, 1), rk, 0, 11.0, 3.6, Math.PI / 2, 0, 0);
ped.rotation.set(Math.PI / 2, Math.PI, 0);
ped.scale.set(1, 1, 0.55);
ped.position.y = 11.3;
edsCyl(G, rk, 1.9, 1.9, 3.2, 0, 14.6, 2.2, 14);
edsCone(G, rk, 2.3, 2.2, 0, 17.3, 2.2, 14);
edsLathe(G, rk, [[0, 0], [0.5, 0], [0.9, 0.6], [0.5, 1.3], [0.3, 1.6], [0, 1.7]], 0, 18.3, 2.2, 10);
for (i = 0; i < 5; i++)
edsBox(G, rk, 10 - i * 0.6, 0.3, 0.9, 0, 0.15 + i * 0.3, 8 - i * 0.9);
[[-19, -6, 11, 15], [19, -5, 12, 16], [-9, -20, 12, 17], [10, -21, 13, 18], [0, -12, 10, 19], [-28, 2, 8, 10], [29, 3, 9, 11]].forEach(function (c, q) { var m = edsRock(G, c[0], c[3] * 0.42, c[1], c[2], q + 40, rose); m.scale.y = c[3] * 0.62; edsSolidR(X, Z, rot, c[0], c[1], c[2] * 0.8, c[3]); });
edsBox(G, edsM(0xD89A74, "rock"), 1.2, 0.6, 10, -7.6, 0.3, -6);
edsBox(G, edsM(0xD89A74, "rock"), 1.2, 0.6, 10, 7.6, 0.3, -6);
edsBox(G, edsM(0xD89A74, "rock"), 8, 1.0, 1.6, 0, 0.5, -11.4);
for (i = 0; i < 5; i++) {
edsJar(G, -3 + i * 1.5, 1.0, -11.4, (i * 2) % 5, 0.6 + (i % 2) * 0.2, 0xC87A5A);
}
[-7.6, 7.6].forEach(function (x) { for (i = 0; i < 3; i++)
edsLamp(G, x, 0.6, -9.5 + i * 3.5, 1.2); });
if (typeof ldHalo === "function") {
ldHalo(G, -7, 1.6, -6, 0xFFB060, 5, 0.4);
ldHalo(G, 7, 1.6, -6, 0xFFB060, 5, 0.4);
}
});
edsAt(P, 250, -150, 0, function (G, H, X, Z, rot) {
var red = 0xC07850;
[[-44, -56, 14, 22], [-36, -84, 10, 15], [40, 44, 15, 24], [72, 22, 10, 16], [-56, 52, 12, 18], [8, 58, 9, 13], [96, -40, 14, 20], [-70, -12, 8, 12]].forEach(function (c, q) { var m = edsRock(G, c[0], c[3] * 0.4, c[1], c[2], q + 60, red); m.scale.y = c[3] * 0.62; edsSolidR(X, Z, rot, c[0], c[1], c[2] * 0.8, c[3]); });
var ar = edsPut(G, new THREE.TorusGeometry(9, 2.2, 7, 14, Math.PI), edsM(red, "rock"), -26, 0, -18, 0, 0.9, 0);
ar.scale.set(1, 1.15, 1.4);
edsSolidR(X, Z, rot, -26 + Math.cos(0.9) * 9, -18 - Math.sin(0.9) * 9, 2.4, 10);
edsSolidR(X, Z, rot, -26 - Math.cos(0.9) * 9, -18 + Math.sin(0.9) * 9, 2.4, 10);
for (var i = 0; i < (lite ? 5 : 12); i++) {
var a = i * 1.9, d = 20 + ((i * 37) % 50), rs = 1.2 + (i % 4) * 0.8, rx = Math.cos(a) * d - 10, rz = Math.sin(a) * d;
if (edsRoadD(X + rx, Z + rz) < rs * 1.8 + 5)
continue;
edsRock(G, rx, 0.3, rz, rs, i + 80, red);
edsSolidR(X, Z, rot, rx, rz, rs * 0.9, rs);
}
});
edsAt(P, 232, -332, 0.7, function (G, H, X, Z, rot) {
var rk = edsM(0xD8BC8C, "rock");
edsBox(G, edsM(0xE4CC9C, "carved"), 9, 3.2, 9, 0, 1.6, 0);
edsBox(G, rk, 10, 0.6, 10, 0, 0.3, 0);
edsSolid(X, Z, rot, 0, 0, 4.6, 4.6, 3.2);
[-1.9, 1.9].forEach(function (x, i) { edsCyl(G, rk, 1.25, 1.6, 7.5 + i * 1.6, x, 3.2 + (7.5 + i * 1.6) / 2, i * 0.8, 12); edsBox(G, rk, 2.6, 1.2, 4.4, x, 3.8, 1.6 + i * 0.8); edsRock(G, x, 3.2 + 7.5 + i * 1.6, i * 0.8, 1.2, i + 5, 0xD8BC8C); });
var hg = new THREE.Group();
hg.position.set(11, -0.9, 7);
hg.rotation.set(0.5, -0.6, 0.9);
G.add(hg);
edsSph(hg, rk, 3.0, 0, 0, 0, 1, 1.2, 1, 16);
var hd = edsPut(hg, new THREE.CylinderGeometry(3.2, 5.6, 6.8, 4, 1), edsM(0xE8D8B8, "nemes"), 0, -0.6, -1.2, 0, Math.PI / 4, 0);
hd.scale.z = 0.6;
[-1, 1].forEach(function (sd) { edsSph(hg, edsM(0x8A7250), 1, sd * 1.1, 0.6, 2.7, 0.6, 0.26, 0.2, 8); edsBox(hg, edsM(0x8A7250), 1.6, 0.14, 0.2, sd * 1.2, 1.1, 2.7, 0, 0, sd * 0.12); });
edsBox(hg, rk, 0.7, 1.5, 0.9, 0, -0.1, 3.0, 0, -0.2);
edsBox(hg, edsM(0x9A7A58), 1.6, 0.2, 0.3, 0, -1.3, 2.75, 0, 0, 0.1);
edsSolidR(X, Z, rot, 11, 7, 3.4, 3);
for (var i = 0; i < 7; i++)
edsRock(G, -8 + i * 3.4, 0.4, 9 + Math.sin(i * 2) * 4, 0.8 + (i % 3) * 0.6, i + 11, 0xD8BC8C);
});
edsAt(P, 330, 60, 0.2, function (G, H, X, Z, rot) {
var i, R = edsRnd(808);
for (i = 0; i < (lite ? 8 : 16); i++) {
var px = (i % 4 - 1.5) * 11 + (R() - 0.5) * 3, pz = (Math.floor(i / 4) - 1.5) * 10 + (R() - 0.5) * 3, r = 3.6 + R() * 1.8;
edsCyl(G, edsM(0xB89868, "mud"), r + 0.4, r + 0.6, 0.3, px, 0.15, pz, 9);
edsCyl(G, edsM([0xF6F2EA, 0xF0D8D0, 0xE8F0F0, 0xF4E8D8][i % 4], null, { e: 0x4A4A4A, ei: 0.25 }), r, r, 0.04, px, 0.31, pz, 9);
if (i % 3 === 0)
for (var c = 0; c < 4; c++)
edsCone(G, edsM(0xFAF8F4), 0.6, 0.9, px + Math.cos(c * 1.57) * r * 0.5, 0.75, pz + Math.sin(c * 1.57) * r * 0.5, 8);
}
for (i = 0; i < 18; i++)
edsBox(G, edsM(i % 2 ? 0xF4F0E8 : 0xE8E0D4), 1.0, 0.16, 0.5, -26 + (i % 3) * 0.2, 0.1 + Math.floor(i / 3) * 0.17, -6 + (i % 3) * 0.6);
for (i = 0; i < 12; i++)
edsBox(G, edsM(0xF4F0E8), 1.0, 0.16, 0.5, -27, 0.1 + Math.floor(i / 2) * 0.17, 2 + (i % 2) * 0.6);
edsTent(G, X, Z, rot, -30, 14, 8, 5, 1.4, 91, lite);
edsBox(G, edsM(0x7A5A3A, "wood"), 0.1, 1.6, 0.1, -22, 0.8, -12);
edsBox(G, edsM(0x7A5A3A, "wood"), 2.2, 0.08, 0.08, -22, 1.55, -12);
[-0.9, 0.9].forEach(function (x) { edsCyl(G, edsM(0xC89A3A), 0.4, 0.4, 0.03, -22 + x, 0.9, -12, 10); edsCyl(G, edsM(0x3A2A1A), 0.008, 0.008, 0.66, -22 + x, 1.22, -12, 3); });
});
edsAt(P, 200, 250, 0.4, function (G, H, X, Z, rot) {
var bone = edsM(0xECE4D0), i;
var sk = function (ox, oz, ry, L, s) {
var g = new THREE.Group();
g.position.set(ox, 0, oz);
g.rotation.y = ry;
G.add(g);
edsBox(g, bone, 1.1 * s, 0.7 * s, 4.4 * s, 0, 0.5 * s, L / 2 + 2.0 * s);
edsBox(g, bone, 0.5 * s, 0.3 * s, 4.0 * s, 0, 0.2 * s, L / 2 + 2.3 * s);
var cr = edsSph(g, bone, 0.9 * s, 0, 0.7 * s, L / 2, 1, 0.8, 1.2, 10);
for (var t = 0; t < 6; t++) {
[-1, 1].forEach(function (sd) { edsCone(g, bone, 0.07 * s, 0.3 * s, sd * 0.42 * s, 0.2 * s, L / 2 + 0.8 * s + t * 0.55 * s, 4).rotation.x = Math.PI; });
}
var n = Math.round(L / 0.9);
for (var v = 0; v < n; v++) {
var z = L / 2 - 1 - v * 0.9, k = 1 - v / n, bow = Math.sin(v / n * Math.PI) * 1.2 * s;
edsCyl(g, bone, 0.24 * s * (0.5 + k * 0.5), 0.24 * s * (0.5 + k * 0.5), 0.6, bow * 0.3, 0.4 * s, z, 7).rotation.x = Math.PI / 2;
edsBox(g, bone, 0.08 * s, 0.6 * s * (0.4 + k * 0.6), 0.14, bow * 0.3, 0.75 * s, z);
if (v > 1 && v < n * 0.5 && (!lite || v % 2)) {
var rr = (1.5 - Math.abs(v - n * 0.22) / (n * 0.3) * 0.7) * s;
[-1, 1].forEach(function (sd) { var rb = edsPut(g, new THREE.TorusGeometry(rr, 0.07 * s, 4, 9, Math.PI * 0.62), bone, bow * 0.3, 0.5 * s, z, 0, 0, 0); rb.rotation.set(0, 0, sd > 0 ? -0.25 : Math.PI - 0.37); });
}
}
[-1, 1].forEach(function (sd) { edsCyl(g, bone, 0.05 * s, 0.07 * s, 0.9 * s, sd * 0.5 * s, 0.25 * s, -L * 0.15, 5).rotation.z = sd * 1.1; });
};
sk(0, 0, 0.2, 26, 1.5);
sk(-16, 10, -0.8, 14, 0.9);
if (!lite)
sk(14, -13, 1.7, 10, 0.7);
edsSolid(X, Z, rot, 0, 0, 2.2, 15, 1.6);
for (i = 0; i < (lite ? 4 : 9); i++) {
var sx = -20 + ((i * 17) % 40), sz = -18 + ((i * 29) % 36);
edsPut(G, new THREE.TorusGeometry(0.45, 0.2, 6, 12), edsM(0xD8C8A8, "stone"), sx, 0.2, sz, Math.PI / 2, 0, 0);
edsSph(G, edsM(0xD8C8A8, "stone"), 0.26, sx, 0.2, sz);
}
var t = edsPut(G, new THREE.CylinderGeometry(0.01, 2.4, 2.4, 4, 1, true), edsM(0xF0E8D8, null, { ds: 1 }), 18, 1.2, 12, 0, Math.PI / 4, 0);
edsSolidR(X, Z, rot, 18, 12, 1.6, 2.2);
edsBox(G, edsM(0x8A6A4A, "wood"), 2.4, 0.08, 1.2, 14.5, 0.9, 14);
[13.5, 15.5].forEach(function (x) { edsBox(G, edsM(0x8A6A4A, "wood"), 0.08, 0.9, 1.1, x, 0.45, 14); });
edsSph(G, bone, 0.2, 14.4, 1.1, 14, 1, 0.7, 1.5);
edsBox(G, edsM(0xF0E8D8), 0.5, 0.02, 0.7, 15.0, 0.95, 14);
});
edsAt(P, -60, 230, 0, function (G, H, X, Z, rot) {
var brass = edsM(0xD8A838, null, { e: 0x5A3A08, ei: 0.35 }), st = edsM(0xD8C8A0, "stone"), i;
edsCyl(G, st, 11, 11.6, 0.4, 0, 0.2, 0, 24);
edsCyl(G, edsM(0x2447A8, "tile"), 7, 7, 0.06, 0, 0.42, 0, 24);
for (i = 0; i < 12; i++) {
var a = i / 12 * 6.283;
edsBox(G, edsM(0xE8C860), 0.3, 0.03, 1.2, Math.sin(a) * 8.6, 0.43, Math.cos(a) * 8.6, a);
}
edsCyl(G, st, 0.5, 0.7, 1.4, 0, 1.1, 0, 8);
[[0, 0, 0], [Math.PI / 2, 0, 0], [0.41, 0, 0.3], [Math.PI / 2, 0.8, 0]].forEach(function (r, q) { var ring = edsPut(G, new THREE.TorusGeometry(1.7 - q * 0.12, 0.06, 6, 28), brass, 0, 3.6, 0, r[0], r[1], r[2]); });
edsSph(G, edsM(0x2FA3A0, null, { e: 0x0E4A4A, ei: 0.4 }), 0.34, 0, 3.6, 0);
edsCyl(G, brass, 0.03, 0.03, 4.0, 0, 3.6, 0, 5).rotation.z = 0.41;
edsSolidR(X, Z, rot, 0, 0, 1.0, 2);
edsCyl(G, st, 1.6, 1.6, 0.3, 6.5, 0.55, -3, 16);
var gn = edsPut(G, new THREE.CylinderGeometry(0.01, 1.1, 1.6, 3, 1), brass, 6.5, 1.2, -3, 0, 0, 0);
gn.scale.z = 0.08;
edsSolidR(X, Z, rot, 6.5, -3, 1.7, 1);
edsBox(G, st, 0.6, 5, 6, -8, 2.5, -2);
var q = edsPut(G, new THREE.TorusGeometry(4.2, 0.08, 5, 20, Math.PI / 2), brass, -7.65, 0.6, 0.6, 0, -Math.PI / 2, 0);
edsSolid(X, Z, rot, -8, -2, 0.4, 3, 5);
edsRug(G, 3, 6, 3, 4.4, 0.5);
edsCushion(G, 2.4, 6.4, 0x2447A8, 1.2);
edsCushion(G, 3.8, 5.2, 0xD8A838, 1.2);
edsBox(G, edsM(0x8A6A4A, "wood"), 1.2, 0.4, 0.8, 5.2, 0.6, 6.8);
edsBox(G, edsM(0xF0E8D8), 0.9, 0.02, 0.6, 5.2, 0.82, 6.8);
edsCyl(G, brass, 0.3, 0.3, 0.03, 5.0, 0.86, 6.8, 14);
for (i = 0; i < 4; i++) {
var la = i * 1.57 + 0.8;
edsCyl(G, st, 0.1, 0.14, 1.6, Math.sin(la) * 10, 1.2, Math.cos(la) * 10, 6);
edsLamp(G, Math.sin(la) * 10, 2.0, Math.cos(la) * 10, 1.5);
}
edsTent(G, X, Z, rot, -2, -15, 8, 5, 0, 121, lite);
});
edsAt(P, -300, 170, 0.3, function (G, H, X, Z, rot) {
var st = edsM(0xD8C8A4, "stone"), R = edsRnd(909), i;
for (i = 0; i < (lite ? 9 : 18); i++) {
var cx = (i % 6 - 2.5) * 7 + (R() - 0.5) * 1.5, cz = (Math.floor(i / 6) - 1) * 13 + (R() - 0.5) * 2, h = 2 + R() * 6.5;
if (i % 5 === 3) {
var f = edsCyl(G, st, 0.7, 0.75, 6, cx, 0.6, cz, 10);
f.rotation.set(Math.PI / 2, 0, R() * 3);
f.rotation.order = "YXZ";
}
else {
edsCyl(G, st, 0.68, 0.78, h, cx, h / 2, cz, 10);
if (h > 6.5) {
edsBox(G, st, 2, 0.6, 2, cx, h + 0.3, cz, R());
}
else
edsRock(G, cx, h, cz, 0.7, i, 0xD8C8A4, "stone");
edsSolidR(X, Z, rot, cx, cz, 0.9, h);
}
}
[-1, 1].forEach(function (sd) { edsBox(G, st, 2.4, 7, 2.6, sd * 3.6, 3.5, 26); edsSolid(X, Z, rot, sd * 3.6, 26, 1.2, 1.3, 7); });
var ar = edsPut(G, new THREE.TorusGeometry(3.6, 1.2, 6, 12, Math.PI), st, 0, 7, 26);
ar.scale.z = 1.1;
edsBox(G, st, 10, 1.0, 3, 0, 11.2, 26);
edsPut(G, new THREE.PlaneGeometry(10, 10), edsM(0xE8E0D0, "kilim"), 4, 0.05, -3, -Math.PI / 2);
edsPut(G, new THREE.PlaneGeometry(10, 10), edsM(0xD8E8F0, "kilim"), -6.2, 0.05, -3, -Math.PI / 2);
var k = edsColossus(G, 16, 8, 0.4, 0.8, { broken: 1 });
k.rotation.x = -1.25;
k.position.y = 1.6;
edsSolidR(X, Z, rot, 16, 4, 3, 2);
for (i = 0; i < 6; i++) {
var wx = -20 + i * 8, wl = 3 + R() * 5;
edsBox(G, edsM(0xD0BC94, "course"), wl, 1 + R() * 2.2, 1.0, wx, 0.8, -22 + R() * 3, R() * 0.3);
}
for (i = 0; i < (lite ? 4 : 8); i++) {
var d = edsSph(G, edsM(0xE2C894, "sand"), 1, (R() - 0.5) * 40, 0, (R() - 0.5) * 44, 4 + R() * 4, 0.7 + R() * 0.6, 3 + R() * 3, 10);
}
edsJar(G, 2, 0, 6, 4, 1.0, 0x9A7A5A);
edsJar(G, 3.2, 0.2, 5.4, 0, 0.8, 0x9A7A5A).rotation.z = 1.3;
});
edsAt(P, 60, -430, 0, function (G, H, X, Z, rot) {
var g = new THREE.Group();
g.position.set(-17, H.y(-17, 4), 4);
g.rotation.y = 1.3;
G.add(g);
edsRoom(g, X - 17, Z + 4, rot + 1.3, 0, 0, 5.4, 4.6, 2.8, { col: 0xD8BC94, dome: 0xF0E8D8, floor: [0xB89468, "earth"], gap: 1.6, dh: 2.1 });
edsRug(g, 0, 0, 2.4, 3, 0);
edsBox(g, edsM(0x8A6A4A, "wood"), 1.6, 0.3, 0.7, -1.4, 0.15, -1.3);
edsJar(g, 1.6, 0, -1.4, 0, 0.7);
edsLamp(g, 1.6, 0.1, 1.0, 1.4);
edsBox(g, edsM(0xF0E8D8), 0.5, 0.04, 0.36, -1.4, 0.34, -1.3);
for (var i = 0; i < 6; i++)
edsRock(G, 10 + Math.cos(i) * 3, H.y(10, -12) + 0.6, -12 + Math.sin(i * 1.3) * 3, 1.2 + (i % 3) * 0.6, i + 3, 0xB8A078);
});
},
function (P) {
edsAt(P, 0, 0, 0, function (G) {
var R = edsRnd(1234), n = P.lite ? 90 : 230, i;
for (i = 0; i < n; i++) {
var a = R() * 6.283, d = 110 + Math.sqrt(R()) * 500, x = Math.sin(a) * d, z = Math.cos(a) * d, y = ldY(x, z), k = i % 9;
if (k < 3)
edsRock(G, x, y + 0.2, z, 0.5 + R() * 1.6, i, k === 1 ? 0x9A8A70 : 0xB8A078, "stone");
else if (k < 5)
edsBush(G, x, y, z, 0.6 + R() * 0.8, 0x8A8450);
else if (k === 5) {
for (var t = 0; t < 6; t++) {
var tf = edsCone(G, edsM(0xC8B060), 0.06, 0.6 + R() * 0.5, x + (R() - 0.5) * 0.7, y + 0.3, z + (R() - 0.5) * 0.7, 3);
tf.rotation.set((R() - 0.5) * 0.5, 0, (R() - 0.5) * 0.5);
}
}
else if (k === 6 && i % 2)
edsAcacia(G, x, y, z, 0.8 + R() * 0.6, i);
else if (k === 7) {
for (var b = 0; b < 5; b++)
edsRib(G, x, y + 0.02, z + b * 0.3, 0.45, a, 0);
edsSph(G, edsM(0xECE4D0), 0.2, x, y + 0.15, z - 0.6, 1, 0.8, 1.7);
}
else
edsRock(G, x, y + 0.1, z, 0.3 + R() * 0.5, i, 0xC8A888, "stone");
}
});
},
function (P) {
var L = "the Endless Desert", road = 0xCDB684, lite = P.lite;
P.path([[0, 6], [0, -70]], 4, 0xC8B080, "lantern", 14);
EDS_ROADS.slice(1).forEach(function (r) { P.path(r.pts, 3.2, road); });
edsOasis(P, 0, -110, 17, lite ? 26 : 44, 11, true);
edsGardens(P, 52, -112, 0.15);
P.k("well", -20, -70, 0, 1);
edsCamp(P, -90, -30);
edsBazaar(P, 82, -32);
edsGiza(P);
edsTempleSun(P, -330, -90, Math.PI / 2);
P.k("sandpillars", 160, -160, 0, 1.2);
edsFar(P);
edsOasis(P, 60, -430, 8.5, lite ? 7 : 12, 23, false);
edsStrew(P);
if (typeof edsLife === "function")
edsLife(P);
P.sign(-8, -14, 0.3, ["The Endless Desert", "Press E to read"], ["Deserts", "What is real", ["A desert is a place with very little rain, less than about 250 mm a year, not necessarily a hot one.", "The largest hot desert is the Sahara, about 9 million square km; the largest desert of all is Antarctica.", "An oasis is where water from underground reaches the surface, so palms and gardens can grow.", "Dunes move: the wind carries sand up the long back and drops it down the steep face, so a dune creeps forward a few metres a year."]]);
var post = function (x, z, rot, head, lines) { P.sign(x, z, rot, [head, "Press E: the ways from here"], [head, "Which way", lines], ["#3A2A16", "#F2E2B0"]); };
post(7, -48, -0.3, "The Crossroads", ["North, straight on: the great oasis and its gardens. Beyond it the long road north to the Hidden Spring.", "West: the herders' camp. From there north-west to the Sphinx and the Pyramid, west to the Temple of the Sun, south-west to the Buried City.", "East: the bazaar and the caravanserai. From there north-east to the Canyon of the Rose Tomb and the Fallen King, east to the salt pans.", "South of the way in: the Valley of Whales (south-east), the Star-Watchers' Hill (south-west), and far to the south, water that is not there."]);
post(-98, -52, 0.6, "The Camp Road", ["North-west along the marked stones: the Sphinx, and behind it the Pyramid with its causeway, tombs and builders' town.", "West: the Temple of the Sun.", "South-west: the Buried City.", "East: back to the oasis."]);
post(112, -48, -0.8, "The Bazaar Gate", ["North-east: the Canyon and the Rose Tomb, and on to the Fallen King.", "East: the salt pans.", "West: the oasis."]);
post(-190, -232, 1.2, "The Holy Ground", ["The Sphinx lies to the east of this post. The causeway climbs west to the Pyramid: the entrance passage is in its near face.", "Round the Pyramid: the queens' pyramids (west), the nobles' tombs and the king's boat (east), the builders' town (south-east), the dig (north-west).", "North of the Pyramid a track goes on to the stone-cutters' quarry."]);
post(238, -196, 0.2, "The Canyon", ["East, up the steps: the Rose Tomb, cut from the cliff. Go in.", "North: the Fallen King.", "South-west: the bazaar."]);
post(14, 36, 2.8, "The South Road", ["South-east: the Valley of Whales.", "South-west: the Star-Watchers' Hill. Go at night.", "Due south, a long walk: travellers say there is a lake. Travellers say many things."]);
edsFolk(P, [
["waterseller", -17, -68, 0.6, "m", "The water-seller", "the water-seller at the oasis well, who greets every traveller", "Peace be with you, traveller. Drink: the first cup is always free. Out there the sand goes on for days."],
["gardener", 40, -104, 1.2, "f", "Samira the gardener", "the head gardener of the oasis, who grows melons, onions, figs and corn on water lifted from the pool", "Mind the melons! Everything here drinks from the pool. We lift the water with the shaduf, the long pole with the clay weight: one person can raise two thousand litres a day with it.", 4],
["datepicker", -22, -128, 2.2, "m", "Idris the date picker", "a date picker who climbs the oasis palms with a rope belt", "A good palm gives a hundred kilos of dates a year, and lives a hundred years. Only the mother trees fruit: we carry the pollen up to them by hand each spring.", 5],
["fisher", 3, -90, 3.1, "c", "Little Noor", "a child of the oasis who sits on the jetty watching the fish and the ibis", "Shh. The white birds are ibis. If you sit very still the orange fish come right up. I've named them all."],
["washer", 18, -98, -1.9, "f", "Old Halima", "an old woman of the oasis who knows every story about the spring", "This spring has never failed, not in my grandmother's grandmother's time. The water fell as rain thousands of years ago, far away, and has been walking here under the sand ever since.", 3],
["caravan", -90, -36, 0, "f", "The caravan leader", "the leader of a camel caravan camped by the oasis", "Our camels can go a week without water in the heat; they don't store it in their humps, though. The humps are fat. We leave at dusk, when it's cool.", null, { top: 0x3A2A6A, hatColor: 0x6A1A3A }],
["storyteller", -87, -25, 2.6, "m", "Yusuf the storyteller", "the camp's storyteller, who sits by the fire and knows a thousand tales", "Sit, sit. There is coffee. A story costs nothing but your time, and out here time is the one thing we are rich in."],
["falconer", -99, -24, 1.2, "m", "Tariq the falconer", "a falconer of the desert herders, with his saker falcon on its block", "She is a saker. Hooded, she is calm as a stone; unhooded she can see a hare two kilometres off. I do not own her. We hunt together a few winters, and then I let her go."],
["weaver2", -80, -21, -2.4, "f", "Mariam at the loom", "a herder woman weaving a tent strip from goat hair on a ground loom", "Goat hair. When it rains the threads swell and the tent keeps the water out; when it is hot they open and let the air through. A tent is a clever thing.", null],
["coffee", -93, -27, 1.9, "m", "Old Salim", "an old herder who makes the coffee at the camp fire, with cardamom", "Three cups. The first for the guest, the second for the sword, the third for the pleasure of it. Shake the cup when you have had enough."],
["kid1", -84, -40, 0, "c", "Zayd", "a herder child who looks after the goats", "That one is Biter and that one is Also Biter. Do you want to see how fast I can run up a dune?", 7],
["goatherd", -112, -44, 1, "f", "Amal the goatherd", "a young woman who keeps the camp's goats in their thorn pen", "Thorn bush makes the best fence: free, and the jackals hate it. Count them for me? I always get eleven or thirteen.", 4],
["spicer", 82, -21, Math.PI, "m", "A spice merchant", "a spice merchant in the oasis bazaar", "Saffron, cumin, cinnamon! Saffron is the dearest spice in the world: it is the threads of a crocus flower, picked by hand, and it takes about 150,000 flowers to make a kilo.", null, { top: 0x8A2A1A, hatColor: 0xE8C040 }],
["fruiter", 86, -45, 0.2, "f", "Layla the fruit seller", "a fruit seller in the bazaar whose stall is heaped with melons, pomegranates, figs, oranges and grapes", "Taste! A pomegranate has six hundred seeds, they say, though I have never had the patience to count. The melons came in from the gardens this morning."],
["potter", 57, -46, 1.1, "m", "Hakim the potter", "the bazaar's potter, who throws water jars on a wheel he turns with his foot", "A water jar must not be glazed. The water seeps through, dries on the outside, and that keeps what is inside cool. The desert taught us that."],
["weaver", 52, -24, 1.9, "f", "The carpet weaver", "a carpet weaver of the bazaar", "Every knot is tied by hand: a good rug has more than a hundred to the square centimetre, and takes me a year. I always weave in one mistake, on purpose. Only heaven is perfect."],
["teaman", 84, -2, 3.1, "m", "Farid of the tea house", "the keeper of the bazaar's tea house", "Mint tea, poured from as high as my arm will go, so that it foams. Sit on the cushions. Nobody is in a hurry here but the flies."],
["lampmaker", 108, -16, -2.1, "m", "Nasir the lamp maker", "a brass worker who beats out lamps and trays", "Brass is copper and zinc. I beat it cold and it goes hard, so I heat it red and it goes soft again. Rub the lamp if you like. Nothing has come out of one yet."],
["dyer", 112, -41, -1.2, "f", "Zahra the dyer", "a dyer with vats of indigo, madder, saffron yellow and green", "Blue is indigo, from a leaf. Red is madder, from a root. Purple once came from sea snails, twelve thousand snails for the hem of one robe, which is why only kings wore it."],
["charmer", 75, -29, 1.0, "m", "The snake charmer", "a snake charmer who sits by his basket in the middle of the bazaar", "He cannot hear my flute, you know. Snakes have no ears for it. He watches the pipe move, and sways to follow it. Do not tell the crowd."],
["drummer", 88, -35, -1.4, "m", "Karim the drummer", "a musician who plays the goblet drum and the oud under the market shade", "Dum, tek, tek. Dum is the middle of the skin, tek is the edge. Everything else is those two, and a lifetime."],
["innkeeper", 143, -45, -1.57, "m", "The innkeeper", "the keeper of the caravanserai, the walled inn where caravans rest for the night", "Welcome to the khan. One gate, shut at sunset: beasts below, people round the court. Along the old roads there was one of these every day's march, thirty kilometres or so."],
["merchant", 157, -52, -0.6, "f", "A silk merchant", "a merchant travelling the long road with bales of silk, resting at the caravanserai", "Silk from the far east, glass going back the other way. No one walked the whole Silk Road: goods passed hand to hand, and every hand took its share."],
["sphinxguide", -160, -208, -1.2, "f", "Nefer the guide", "a guide who shows travellers the Sphinx", "The body is a lion's, the head a king's. It was carved from one hill of rock where it lies, about 4,500 years ago, and the sand has buried it to the neck more than once. The stone between its paws tells how a prince dug it out, because it asked him to in a dream.", 3],
["pyrpriest", -212.7, -256, 0.4, "m", "The priest of the pyramid", "a priest who keeps the cult of the king buried in the pyramid", "Bread and beer for the king, every day, for ever: that is my work. Go in by the entrance passage. Read the walls as you go. Everything he will need is written or painted there."],
["guard1", -204, -265, 0.3, "m", "A tomb guard", "a guard at the pyramid's entrance", "You may go in. Touch nothing gold. The last thief is still in there somewhere. We think."],
["mason", -101, -290, -2.4, "m", "Ahmose the stone mason", "a mason of the builders' town who dresses limestone blocks with copper chisels", "Copper chisel, wooden mallet, and sand for polishing. The blocks come up on sledges. Pour water on the sand in front of the runners and it takes half the men to pull: that is painted on a tomb wall, so it must be true."],
["baker", -114, -289, 1.0, "f", "Meryt the baker", "a baker of the builders' town", "Ten loaves and a jug of beer a day for every worker: that is the wage. They were paid, you know, and buried with honour beside the king. Nobody whipped them."],
["digger", -303, -348, 0.8, "f", "Dr. Amina Farouk", "an archaeologist excavating a painted wall beside the pyramid", "Trowel, brush, patience. We dig in squares so we always know where a thing was found: a pot out of its place has lost half its story. Look, the blue is still bright. That is Egyptian blue, the first made pigment in the world."],
["digboy", -296, -356, -1, "m", "Hassan the sieve man", "a dig worker who sieves every bucket of sand for beads and bones", "Every bucket goes through the sieve. Yesterday: three beads, a fish bone, and a date stone four thousand years old."],
["highpriest", -318, -90, Math.PI / 2, "m", "The high priest of the Sun", "the high priest of the Temple of the Sun", "The gate towers are the two hills of the horizon, and the sun rises between them. Walk in: the court, then the hall of columns, then the dark room where the god lives. Each room is lower and darker than the last. That is on purpose."],
["chantress", -338, -84, 1.6, "f", "The temple singer", "a singer of the temple who shakes the sistrum at dawn", "I sing the god awake at dawn. The columns are papyrus stalks, the ceiling is the sky, the floor is the marsh the world rose from. You are standing in the first morning."],
["scribe", -288, -90, 1.57, "m", "Khety the scribe", "a temple scribe who is teaching himself the seven hundred signs", "Seven hundred signs to learn! The owl is M. The water is N. The mouth is R. A name of a king goes inside a ring of rope. Read toward the faces: if the birds look left, start from the left."],
["quarry", -124, -404, 2.6, "m", "The master of the quarry", "the master stone-cutter at the granite quarry", "Forty-two metres she would have stood, over a thousand tonnes. We pounded her out with balls of harder stone, a hand's depth a week. Then she cracked. So we walked away, and there she lies."],
["rosekeeper", 286, -170, -Math.PI / 2, "f", "The keeper of the Rose Tomb", "the keeper of a great tomb carved out of the red canyon wall by a people who grew rich on the incense trade", "They did not build it. They cut it, from the top down, out of the living cliff: no scaffolding, the rock was the scaffold. Go in. It is cool inside."],
["poet", 224, -322, 0.9, "m", "A traveller from an antique land", "a traveller and poet who stands before the two stone legs and the broken face in the sand", "Look on my works, ye mighty, and despair. That is what he had carved here. And round the decay of that colossal wreck, boundless and bare, the lone and level sands stretch far away."],
["saltman", 318, 54, -1.3, "m", "Bilal the salt master", "the master of the salt pans, who sends salt by camel across the desert", "We let the brine in, the sun does the rest. Salt was worth its weight in gold once, truly: a slab on each side of a camel, a thousand camels in a line, forty days to the river."],
["saltgirl", 336, 70, 2, "f", "Aisha of the pans", "a salt worker who rakes the drying pans", "Pink is the little creatures in the brine. White is ready. Rake it into cones and let the wind finish it.", 5],
["bones", 214, 262, -2.2, "f", "Professor Idrisi", "a scientist of old bones studying the whale skeletons in the sand", "Forty million years ago this was sea. That is a whale, eighteen metres of it, and look by its tail: little back legs, with knees and toes. Whales walked into the sea. Here is the proof, lying in a desert."],
["astronomer", -56, 236, 0.5, "m", "Ibn Rashid the astronomer", "the astronomer of the star-watchers' hill, who measures the heavens with the ringed sphere and the wall quadrant", "Come back at night. Most of the bright stars still carry the names we gave them: Aldebaran, the follower. Altair, the flying one. Betelgeuse. With this wall I can measure a star's height to a sixtieth of a degree."],
["pupil", -66, 224, 2, "f", "Fatima the pupil", "the astronomer's pupil, who is learning to use the astrolabe", "An astrolabe is the sky folded flat in brass. Hold it up, sight a star, and it tells you the hour. Mine has two hundred uses. I know nine."],
["ruinman", -292, 180, -0.8, "m", "Qasim the sand-reader", "an old man who lives among the columns of the buried city and remembers what it was", "Under your feet: streets, a market, baths, a library. The river moved, the wells went salt, the people left, the sand came in. It took the desert three hundred years. The desert has time."],
["hermit", 45, -424, 1.3, "m", "The hermit of the spring", "a hermit who lives alone by a hidden spring far out in the dunes", "You walked all this way? Then sit, and say nothing for a while. That is what the place is for. When you are ready there are dates."],
["mirageman", 16, 372, 3.0, "f", "A thirsty traveller", "a traveller staring south at a shining lake that is not there", "You see it too? Water, and palms upside down in it. It is the sky. Hot air by the ground bends the light upward and shows you a piece of sky on the sand. Walk toward it and it walks away."]
]);
P.being("genie", -312, 158, 1.0, 1.2, ldWho("The djinn of the buried city", L, "a djinn, a spirit of smokeless fire out of the old tales, who has haunted the ruined city since it fell and is rather glad of company", "*a curl of smoke gathers into a shape and bows* A visitor! It has been four hundred years. I grant no wishes, I am afraid. But I remember everything."), { r: 5, sp: 0.4 });
P.being("camel", -70, -12, 1, 1, null, { r: 8, sp: 0.4 });
P.being("camel", -108, -14, 2, 1, null, { r: 8, sp: 0.4 });
P.being("camel", -66, -46, 0.5, 1);
P.being("camel", -104, -52, 2.2, 1);
P.being("camel", -76, -52, 1.1, 0.8, null, { r: 5, sp: 0.4 });
[[-116, -40], [-112, -46], [-118, -44], [-110, -41], [-115, -48]].forEach(function (g, i) { P.being("goat", g[0], g[1], i, 0.9, null, { r: 3, sp: 0.4 }); });
P.being("camel", 152, -38, 0.4, 1);
P.being("camel", 158, -42, 2.4, 1);
P.being("camel", 118, -2, 1.4, 1, null, { r: 6, sp: 0.4 });
P.being("camel", 124, 2, 0.4, 1);
P.being("chicken", 70, -14, 0, 1, null, { r: 5, sp: 0.5 });
P.being("chicken", 96, -48, 1, 1, null, { r: 5, sp: 0.5 });
P.being("chicken", 62, -40, 2, 1, null, { r: 5, sp: 0.5 });
P.being("camel", 312, 74, 1, 1);
P.being("camel", 308, 80, 1.3, 1);
P.being("frog", 8, -93, 0, 1, null, { r: 3, sp: 0.3 });
P.being("turtle", -12, -94, 1, 0.8, null, { r: 3, sp: 0.2 });
if (!lite) {
P.being("fox", 150, 90, 0, 0.6, null, { r: 14, sp: 1.2 });
P.being("fox", -170, 60, 0, 0.6, null, { r: 14, sp: 1.2 });
P.being("snake", 180, -90, 0, 1, null, { r: 6, sp: 0.4 });
P.being("scorpion", -40, 150, 0, 1, null, { r: 4, sp: 0.3 });
P.being("scorpion", 250, -250, 0, 1, null, { r: 4, sp: 0.3 });
P.being("stag", 80, -400, 0, 0.6, null, { r: 14, sp: 1.0 });
P.being("stag", 72, -410, 1, 0.55, null, { r: 12, sp: 1.0 });
P.being("stag", -380, 40, 1, 0.6, null, { r: 16, sp: 1.0 });
P.being("owl", -296, 176, 0, 1);
P.being("vulture", 236, -322, 0, 1, null, { r: 10, sp: 0.6 });
P.being("goat", 270, -120, 0, 1, null, { r: 10, sp: 0.6 });
P.being("goat", 330, -205, 0, 1, null, { r: 8, sp: 0.6 });
}
P.fact(232, -323, 5, "The words on the pedestal", "read them", ["Ozymandias", "Percy Bysshe Shelley, 1818", ["I met a traveller from an antique land, who said: Two vast and trunkless legs of stone stand in the desert. Near them, on the sand, half sunk a shattered visage lies, whose frown, and wrinkled lip, and sneer of cold command, tell that its sculptor well those passions read which yet survive, stamped on these lifeless things, the hand that mocked them, and the heart that fed;", "And on the pedestal, these words appear: My name is Ozymandias, King of Kings; Look on my Works, ye Mighty, and despair!", "Nothing beside remains. Round the decay of that colossal Wreck, boundless and bare, the lone and level sands stretch far away.", "Ozymandias is the Greek name of Ramesses II, who ruled Egypt for 66 years. His fallen statue, the Younger Memnon, reached London in 1818."]]);
P.fact(-146.6, -231, 4, "The Dream Stone", "read it", ["The Dream Stone", "What is real", ["A slab of red granite stands between the Great Sphinx's paws. It tells how the young prince Thutmose fell asleep in the Sphinx's shadow about 1400 BC, when it was buried to the neck.", "In his dream the Sphinx spoke: clear away the sand, and you shall be king. He did, and he was: Thutmose IV.", "The Sphinx is 73 m long and 20 m high, cut from a single ridge of limestone. Its nose was lost long before Napoleon ever saw it."]]);
P.fact(-112, -422, 6, "The unfinished obelisk", "look", ["The Unfinished Obelisk", "What is real", ["At Aswan in Egypt lies an obelisk nearly 42 m long, a third bigger than any ever raised. It would have weighed about 1,100 tonnes.", "It was pounded out of the granite with balls of dolerite, a harder stone. While it was being cut, it cracked, and it was abandoned where it lay.", "Because it was never finished, it shows exactly how the others were made."]]);
P.fact(200, 250, 7, "The whale in the sand", "look", ["The Valley of Whales", "What is real", ["Wadi al-Hitan, in Egypt's Western Desert, holds hundreds of fossil whales about 40 million years old, from when the Sahara lay under a warm sea.", "The whales, Basilosaurus and Dorudon, still had small hind legs with knees, ankles and toes: proof that whales came from animals that walked on land.", "The sharks, turtles and mangrove roots that lived alongside them are fossilised there too."]]);
P.fact(-60, 230, 4, "The ringed sphere", "look", ["The Armillary Sphere", "What is real", ["A model of the sky in brass rings: the horizon, the equator, the path of the sun. Turn it and the stars rise and set as they do overhead.", "Astronomers working in Baghdad, Cairo, Maragha and Samarkand between about 800 and 1450 measured the sky more exactly than anyone before them.", "That is why so many stars have Arabic names, and why we say zenith, nadir, azimuth and almanac."]]);
},
function (P) {
var lite = P.lite, L = "the Endless Desert";
edsAt(P, 0, 0, 0, function (G) {
var pts = [[296, 52], [220, 30], [112, -8], [62, -4], [2, -44], [-80, -42], [-120, -30], [-200, -60], [-282, -90]], cum = [0], i;
for (i = 1; i < pts.length; i++)
cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
var len = cum[cum.length - 1], members = [], n = lite ? 4 : 7;
for (i = 0; i < n + 2; i++) {
var g = null, walker = (i === 0 || i === n + 1);
try {
if (walker) {
if (typeof wPerson === "function")
g = wPerson("eds_cv" + i, { sex: "m", look: edsRobe(i ? 5 : 10, "m", { top: i ? 0x4A6A8A : 0x1E2A4A, hatColor: 0xF0E8D8 }) });
}
else {
g = build({ id: "eds_cvc" + i, archetype: "camel", label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true });
var ld = new THREE.Group();
[-1, 1].forEach(function (sd) { if (i % 2)
edsBox(ld, edsM(0xF4F0E8), 0.16, 0.6, 1.1, sd * 0.52, 1.75, -0.1, 0, 0, sd * 0.25);
else
edsBox(ld, edsM(0xB89868), 0.5, 0.5, 0.9, sd * 0.5, 1.8, -0.1); });
edsBox(ld, edsM(0xFFFFFF, "kilim"), 0.9, 0.06, 1.0, 0, 2.12, -0.1);
g.add(ld);
}
}
catch (e) {
g = null;
}
if (!g)
continue;
G.add(g);
members.push({ g: g, off: i * 4.6 });
}
if (!members.length)
return true;
var st = { s: 60, dir: 1 };
G.userData.ldAnim = function (m, t, dt) {
st.s += st.dir * 0.95 * Math.min(0.1, dt || 0.016);
if (st.s > len + members.length * 4.6) {
st.dir = -1;
}
else if (st.s < 0) {
st.dir = 1;
}
members.forEach(function (M) { var s = st.s - st.dir * M.off, q = edsPathAt(pts, cum, s); M.g.position.set(q[0], ldY(q[0], q[1]), q[1]); M.g.rotation.y = st.dir > 0 ? q[2] : q[2] + Math.PI; });
};
G.userData.ldAnim(G, 0, 0.016);
if (typeof LD !== "undefined" && LD.talkers)
LD.talkers.push({ p: { g: members[0].g }, r: 3.8, name: "The caravan master", t: ldWho("The caravan master", L, "the master of a salt caravan, walking at the head of his camels along the desert roads between the salt pans and the Temple of the Sun", "Walk with me, I cannot stop: the beasts lose heart if they stand. Salt one way, grain and cloth the other. We steer by the stars at night and by the shape of the dunes by day.") });
return true;
}, 1);
edsAt(P, 0, 0, 0, function (G) {
var spots = [[0, -110, 46, 38], [-170, -250, 60, 52], [200, 250, 40, 34], [-320, -90, 50, 44], [280, -180, 44, 48]], bm = new THREE.MeshLambertMaterial({ color: 0x5A4634 }), wm = new THREE.MeshLambertMaterial({ color: 0x6E5840, side: THREE.DoubleSide });
spots.slice(0, lite ? 2 : 5).forEach(function (sp, i) {
var b = new THREE.Group(), body = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.9, 6), bm);
body.rotation.x = Math.PI / 2;
b.add(body);
var wings = [-1, 1].map(function (sd) { var w = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.42), wm); w.geometry.translate(0.62, 0, 0); w.rotation.x = -Math.PI / 2; var h = new THREE.Group(); h.add(w); h.scale.x = sd; b.add(h); return h; });
var tail = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.44), wm);
tail.rotation.x = -Math.PI / 2;
tail.position.z = -0.55;
b.add(tail);
b.userData.ldAnim = function (m, t) {
var a = t * (0.16 + i * 0.02) * (i % 2 ? 1 : -1) + i * 2, r = sp[2] * (1 + 0.18 * Math.sin(t * 0.07 + i));
m.position.set(sp[0] + Math.cos(a) * r, sp[3] + 4 * Math.sin(t * 0.11 + i), sp[1] + Math.sin(a) * r);
m.rotation.set(0, -a + (i % 2 ? 0 : Math.PI), (i % 2 ? -1 : 1) * 0.35, "YXZ");
var f = 0.12 * Math.sin(t * 1.4 + i);
wings[0].rotation.z = f;
wings[1].rotation.z = f;
};
G.add(b);
});
return true;
}, 1);
if (!lite)
edsAt(P, 0, 0, 0, function (G) {
[[300, 330, 90], [-380, -300, 80], [-200, 380, 100]].forEach(function (c, i) {
var d = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ color: 0xE2C894, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide });
for (var k = 0; k < 6; k++) {
var ring = new THREE.Mesh(new THREE.CylinderGeometry(0.7 + k * 0.55, 0.4 + k * 0.5, 2.2, 10, 1, true), mat);
ring.position.y = 1.1 + k * 2.1;
ring.userData.k = k;
d.add(ring);
}
d.userData.ldAnim = function (m, t) { var x = c[0] + Math.sin(t * 0.05 + i * 2) * c[2], z = c[1] + Math.cos(t * 0.037 + i) * c[2]; m.position.set(x, ldY(x, z), z); m.children.forEach(function (r) { r.rotation.y = t * (1.6 - r.userData.k * 0.12); r.position.x = Math.sin(t * 0.9 + r.userData.k * 0.7) * 0.25 * r.userData.k; }); };
G.add(d);
});
return true;
}, 1);
edsAt(P, 10, 470, 0, function (G, H, X, Z) {
var mat = new THREE.MeshBasicMaterial({ color: 0xBFDCEC, transparent: true, opacity: 0.5, depthWrite: false }), lake = new THREE.Mesh(new THREE.CircleGeometry(1, 28), mat);
lake.rotation.x = -Math.PI / 2;
lake.scale.set(70, 24, 1);
lake.position.y = 0.5;
G.add(lake);
var pm = new THREE.MeshBasicMaterial({ color: 0x6E8E86, transparent: true, opacity: 0.4, depthWrite: false, side: THREE.DoubleSide });
for (var i = 0; i < 7; i++) {
var p = new THREE.Group(), tr = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 7), pm);
tr.position.y = 3.5;
p.add(tr);
var cr = new THREE.Mesh(new THREE.CircleGeometry(2.6, 7), pm);
cr.position.y = 7.4;
cr.scale.y = 0.5;
p.add(cr);
p.position.set(-40 + i * 13 + (i % 2) * 4, 0.6, -6 - (i % 3) * 5);
G.add(p);
}
G.userData.ldAnim = function (m, t) { var c = camera.position, d = Math.hypot(c.x - (LD.ox + X), c.z - (LD.oz + Z)), k = Math.max(0, Math.min(1, (d - 70) / 110)); mat.opacity = 0.5 * k * (0.92 + 0.08 * Math.sin(t * 0.5)); pm.opacity = 0.4 * k; m.visible = k > 0.01; };
return true;
}, 1);
}
];
});
