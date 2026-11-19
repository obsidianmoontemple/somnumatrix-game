/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var AUP = { on: !(typeof window !== "undefined" && window.AUP_OFF), shops: true, doors: !(typeof window !== "undefined" && window.AUP_NODOOR), trees: !(typeof window !== "undefined" && window.AUP_NOTREE), atlas: null, glass: null, mat: null, geos: {}, made: 0, panes: 0 };
function aupLite() { return typeof LITE !== "undefined" && !!LITE; }
function aupWhere(spec) { return !!(spec && (spec.city || spec.hub) && !spec.traffic); }
var AUP_R = { tall: [0, 0.25, 0.25, 1], square: [0.25, 0.25, 0.5, 1], wide: [0.5, 0.25, 0.75, 1], shop: [0.75, 0.25, 1, 1], stone: [0, 0, 0.5, 0.25], door: [0.5, 0, 1, 0.25] };
function aupAtlas() {
if (AUP.atlas)
return AUP.atlas;
if (typeof document === "undefined")
return null;
var N = 512, c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d");
if (!x)
return null;
x.clearRect(0, 0, N, N);
function px(u) { return u * N; }
function py(v) { return (1 - v) * N; }
function sash(R, cols, rows, lights) {
var X0 = px(R[0]), X1 = px(R[2]), Y0 = py(R[3]), Y1 = py(R[1]), W = X1 - X0, H = Y1 - Y0, f = W * 0.07, bar = Math.max(3, W * 0.028);
x.fillStyle = "#F4F2EC";
x.fillRect(X0, Y0, W, H);
x.clearRect(X0 + f, Y0 + f, W - 2 * f, H - 2 * f);
x.fillStyle = "rgba(150,146,138,1)";
x.fillRect(X0 + f - 2, Y0 + f - 2, W - 2 * f + 4, 2);
x.fillRect(X0 + f - 2, Y0 + f - 2, 2, H - 2 * f + 4);
x.fillStyle = "#F4F2EC";
if (lights) {
for (var l = 1; l < lights; l++)
x.fillRect(X0 + f + (W - 2 * f) * l / lights - bar * 0.8, Y0 + f, bar * 1.6, H - 2 * f);
return;
}
var mid = Y0 + H / 2;
x.fillRect(X0 + f, mid - bar * 1.2, W - 2 * f, bar * 2.4);
for (var s = 0; s < 2; s++) {
var sy = s ? mid : Y0 + f, sh = s ? (Y1 - f - mid) : (mid - Y0 - f);
for (var cc = 1; cc < cols; cc++)
x.fillRect(X0 + f + (W - 2 * f) * cc / cols - bar / 2, sy, bar, sh);
for (var r = 1; r < rows; r++)
x.fillRect(X0 + f, sy + sh * r / rows - bar / 2, W - 2 * f, bar);
}
}
sash(AUP_R.tall, 3, 2);
sash(AUP_R.square, 2, 2);
sash(AUP_R.wide, 0, 0, 3);
(function (R) {
var X0 = px(R[0]), X1 = px(R[2]), Y0 = py(R[3]), Y1 = py(R[1]), W = X1 - X0, H = Y1 - Y0, f = W * 0.05, bar = Math.max(3, W * 0.024);
x.fillStyle = "#F4F2EC";
x.fillRect(X0, Y0, W, H);
x.clearRect(X0 + f, Y0 + f, W - 2 * f, H - 2 * f);
var tr = Y0 + H * 0.26;
x.fillRect(X0 + f, tr - bar, W - 2 * f, bar * 2);
for (var t = 1; t < 6; t++)
x.fillRect(X0 + f + (W - 2 * f) * t / 6 - bar / 3, Y0 + f, bar * 0.66, tr - Y0 - f);
for (var mm = 1; mm < 3; mm++)
x.fillRect(X0 + f + (W - 2 * f) * mm / 3 - bar / 2, tr, bar, Y1 - f - tr);
var Rn = typeof rng === "function" ? rng(hash("aup-shop")) : Math.random, sh0 = Y0 + H * 0.6, cols = ["#C83A3A", "#E8C850", "#3A6AA8", "#F0ECE4", "#6A8A3A", "#A86A3A", "#7A3A8A", "#D8884A", "#2A7A7A"];
x.fillStyle = "#3A2A1E";
x.fillRect(X0 + f, sh0, W - 2 * f, Y1 - f - sh0);
for (var row = 0; row < 3; row++) {
var yb = sh0 + (Y1 - f - sh0) * (row + 1) / 3;
x.fillStyle = "#6A4A2E";
x.fillRect(X0 + f, yb - 3, W - 2 * f, 3);
for (var gx = X0 + f + 2; gx < X1 - f - 6;) {
var gw = 4 + Rn() * 9, gh = ((Y1 - f - sh0) / 3) * (0.35 + Rn() * 0.5);
x.fillStyle = cols[(Rn() * cols.length) | 0];
x.fillRect(gx, yb - 3 - gh, gw, gh);
x.fillStyle = "rgba(255,255,255,.25)";
x.fillRect(gx + 1, yb - 3 - gh + 1, Math.max(1, gw * 0.25), gh - 2);
gx += gw + 1 + Rn() * 3;
}
}
x.fillStyle = "#F4F2EC";
x.fillRect(X0 + f, sh0 - bar, W - 2 * f, bar);
for (var m2 = 1; m2 < 3; m2++)
x.fillRect(X0 + f + (W - 2 * f) * m2 / 3 - bar / 2, sh0, bar, Y1 - f - sh0);
})(AUP_R.shop);
(function (R) {
var X0 = px(R[0]), Y0 = py(R[3]), W = px(R[2]) - X0, H = py(R[1]) - Y0;
x.fillStyle = "#ECE8DE";
x.fillRect(X0, Y0, W, H);
var Rn = typeof rng === "function" ? rng(hash("aup-stone")) : Math.random;
for (var i = 0; i < 900; i++) {
x.fillStyle = "rgba(110,100,80," + (0.05 + Rn() * 0.12) + ")";
x.fillRect(X0 + Rn() * W, Y0 + Rn() * H, 1 + Rn() * 2, 1);
}
var g = x.createLinearGradient(0, Y0, 0, Y0 + H);
g.addColorStop(0, "rgba(255,255,255,0.18)");
g.addColorStop(0.75, "rgba(0,0,0,0)");
g.addColorStop(1, "rgba(60,50,40,0.35)");
x.fillStyle = g;
x.fillRect(X0, Y0, W, H);
for (var j = 1; j < 8; j++) {
x.fillStyle = "rgba(90,80,60,.22)";
x.fillRect(X0 + W * j / 8, Y0, 1.5, H);
}
})(AUP_R.stone);
(function (R) {
var X0 = px(R[0]), Y0 = py(R[3]), W = px(R[2]) - X0, H = py(R[1]) - Y0, kx = W / 1.9, ky = H / 3.1;
var ow = 1.2 * kx, oh = 2.3 * ky, ox = X0 + (W - ow) / 2, oy = Y0 + H - oh;
x.fillStyle = "#E8E2D4";
x.fillRect(X0, Y0, W, H);
var Rn = typeof rng === "function" ? rng(hash("aup-door")) : Math.random;
for (var i = 0; i < 500; i++) {
x.fillStyle = "rgba(110,100,80," + (0.05 + Rn() * 0.1) + ")";
x.fillRect(X0 + Rn() * W, Y0 + Rn() * H, 1 + Rn() * 2, 1);
}
x.fillStyle = "rgba(80,70,55,.35)";
[0.08, 0.14].forEach(function (f) { x.fillRect(X0 + W * f, Y0 + H * 0.12, 1.5, H); x.fillRect(X0 + W * (1 - f), Y0 + H * 0.12, 1.5, H); });
x.fillStyle = "rgba(40,34,28,.55)";
x.fillRect(ox - 4, oy - 0.62 * ky, ow + 8, oh + 0.62 * ky);
var fy = oy, frx = ow / 2, fry = 0.55 * ky, fcx = ox + ow / 2;
x.fillStyle = "#2E3A44";
x.beginPath();
x.ellipse(fcx, fy, frx, fry, 0, Math.PI, 0);
x.fill();
var g = x.createLinearGradient(0, fy - fry, 0, fy);
g.addColorStop(0, "rgba(190,210,225,.55)");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.beginPath();
x.ellipse(fcx, fy, frx, fry, 0, Math.PI, 0);
x.fill();
x.strokeStyle = "#F4F2EC";
x.lineWidth = 2.5;
for (var b = 0; b <= 8; b++) {
var a = Math.PI + b * Math.PI / 8;
x.beginPath();
x.moveTo(fcx, fy);
x.lineTo(fcx + Math.cos(a) * frx, fy + Math.sin(a) * fry);
x.stroke();
}
x.beginPath();
x.ellipse(fcx, fy, frx * 0.35, fry * 0.35, 0, Math.PI, 0);
x.stroke();
x.lineWidth = 3.5;
x.beginPath();
x.ellipse(fcx, fy, frx, fry, 0, Math.PI, 0);
x.stroke();
x.fillStyle = "#F4F2EC";
x.fillRect(ox - 2, fy - 2, ow + 4, 4);
x.fillStyle = "#F2EEE4";
x.fillRect(X0, Y0, W, H * 0.1);
x.fillStyle = "rgba(60,50,40,.4)";
x.fillRect(X0, Y0 + H * 0.1, W, 2.5);
x.fillStyle = "#E0D8C8";
x.beginPath();
x.moveTo(fcx - W * 0.06, Y0 + H * 0.1);
x.lineTo(fcx + W * 0.06, Y0 + H * 0.1);
x.lineTo(fcx + W * 0.04, fy - fry + 2);
x.lineTo(fcx - W * 0.04, fy - fry + 2);
x.fill();
x.clearRect(ox, oy, ow, oh);
})(AUP_R.door);
var t = new THREE.CanvasTexture(c);
t.anisotropy = aupLite() ? 2 : 8;
t.generateMipmaps = true;
return (AUP.atlas = t);
}
function aupGlassTex() {
if (AUP.glass)
return AUP.glass;
if (typeof document === "undefined")
return null;
var N = 128, c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d");
if (!x)
return null;
var g = x.createLinearGradient(0, 0, 0, N);
g.addColorStop(0, "rgb(255,255,255)");
g.addColorStop(0.45, "rgb(196,204,212)");
g.addColorStop(1, "rgb(118,122,128)");
x.fillStyle = g;
x.fillRect(0, 0, N, N);
x.globalAlpha = 0.22;
x.fillStyle = "#fff";
x.beginPath();
x.moveTo(N * 0.2, 0);
x.lineTo(N * 0.46, 0);
x.lineTo(N * 0.1, N);
x.lineTo(-N * 0.16, N);
x.fill();
x.globalAlpha = 0.1;
x.beginPath();
x.moveTo(N * 0.6, 0);
x.lineTo(N * 0.68, 0);
x.lineTo(N * 0.34, N);
x.lineTo(N * 0.26, N);
x.fill();
x.globalAlpha = 1;
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
return (AUP.glass = t);
}
function aupMat() {
if (AUP.mat)
return AUP.mat;
var t = aupAtlas();
if (!t)
return null;
return (AUP.mat = new THREE.MeshLambertMaterial({ map: t, alphaTest: 0.5, side: THREE.FrontSide }));
}
function aupUV(arr, R, list) { for (var i = 0; i < list.length; i += 2) {
arr.push(R[0] + (R[2] - R[0]) * list[i], R[1] + (R[3] - R[1]) * list[i + 1]);
} }
function aupGeo(k) {
var lite = aupLite(), key = k + (lite ? "-l" : "");
if (AUP.geos[key])
return AUP.geos[key];
var pos = [], nor = [], uv = [], idx = [], S = AUP_R.stone;
function quad(p, n, R, uvs) { var b = pos.length / 3; p.forEach(function (v) { pos.push(v[0], v[1], v[2]); nor.push(n[0], n[1], n[2]); }); aupUV(uv, R, uvs); idx.push(b, b + 1, b + 2, b, b + 2, b + 3); }
if (k === "door") {
quad([[-0.5, 0, 0.02], [0.5, 0, 0.02], [0.5, 1, 0.02], [-0.5, 1, 0.02]], [0, 0, 1], AUP_R.door, [0, 0, 1, 0, 1, 1, 0, 1]);
}
else {
var f = k === "shop" ? 0.05 : 0.07, X = 0.5 + f, Y = 0.5 + f;
quad([[-X, -Y, 0.012], [X, -Y, 0.012], [X, Y, 0.012], [-X, Y, 0.012]], [0, 0, 1], AUP_R[k], [0, 0, 1, 0, 1, 1, 0, 1]);
if (k !== "shop") {
var sx = X + 0.1, sy0 = -Y - 0.075, sy1 = -Y, sz = 0.2, hx = X + 0.07, hy0 = Y, hy1 = Y + 0.14, hz = 0.08;
quad([[-sx, sy0, sz], [sx, sy0, sz], [sx, sy1, sz], [-sx, sy1, sz]], [0, 0, 1], S, [0, 0, 1, 0, 1, 1, 0, 1]);
if (!lite)
quad([[-sx, sy1, sz], [sx, sy1, sz], [sx, sy1, 0], [-sx, sy1, 0]], [0, 1, 0], S, [0, 0.8, 1, 0.8, 1, 1, 0, 1]);
quad([[-hx, hy0, hz], [hx, hy0, hz], [hx, hy1, hz], [-hx, hy1, hz]], [0, 0, 1], S, [0, 0, 1, 0, 1, 1, 0, 1]);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeBoundingSphere();
return (AUP.geos[key] = g);
}
var AUP_TMP = { m: null, o: null, q: null, s: null, v: null };
function aupKind(W, H, low) {
if (low && W >= 2.0 && H <= 3.6)
return "shop";
if (W / H > 1.45)
return "wide";
if (H / W > 1.35)
return "tall";
return "square";
}
function aupWindow(L, cx, cy, cz, ry, W, H, out, fc, low) {
var k = aupKind(W, H, low), s = Math.sin(ry), c = Math.cos(ry);
if (k === "shop" && !AUP.shops)
return;
L.push({ k: k, x: cx + s * out, y: cy, z: cz + c * out, ry: ry, sx: W, sy: H, sz: 1, col: fc });
}
function aupPlace(g, L) {
if (!L.length)
return 0;
var M = aupMat();
if (!M)
return 0;
var by = {};
L.forEach(function (p) { (by[p.k] || (by[p.k] = [])).push(p); });
var o = AUP_TMP.o || (AUP_TMP.o = new THREE.Object3D()), col = new THREE.Color(), n = 0;
Object.keys(by).forEach(function (k) {
var list = by[k], im = new THREE.InstancedMesh(aupGeo(k), M, list.length);
list.forEach(function (p, i) {
o.position.set(p.x, p.y, p.z);
o.rotation.set(0, p.ry, 0);
o.scale.set(p.sx, p.sy, p.sz);
o.updateMatrix();
im.setMatrixAt(i, o.matrix);
col.setHex(p.col === undefined ? 0xFFFFFF : p.col);
im.setColorAt(i, col);
});
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.castShadow = false;
im.receiveShadow = true;
im.userData.aup = 1;
im.userData.openings = 1;
im.raycast = function () { };
g.add(im);
n += list.length;
});
return n;
}
function aupDress(g, spec, def, parts) {
var B = bodyOf(parts);
if (!B)
return;
var a = spec.attrs || {}, L = [], gt = aupGlassTex();
var fc = a.wf !== undefined ? a.wf : 0xF4F2EC;
var cx0 = B.x, cz0 = B.z;
g.children.forEach(function (m) {
if (!m.isMesh || m.isInstancedMesh || m.userData.aup)
return;
var mt = m.material;
if (!mt || !(g.userData.glass || []).includes(mt))
return;
var ge = m.geometry, P = ge && ge.parameters;
if (!P || ge.type !== "BoxGeometry")
return;
if (m.rotation.x || m.rotation.z || m.rotation.y)
return;
var w = P.width, h = P.height, d = P.depth, alongX = d <= w, T = alongX ? d : w, W = alongX ? w : d;
if (T > 0.6 || h < 0.45 || W < 0.35)
return;
if (W > 3.4 && h > 3.4)
return;
var p = m.position, ry;
if (alongX)
ry = (p.z >= cz0) ? 0 : Math.PI;
else
ry = (p.x >= cx0) ? Math.PI / 2 : -Math.PI / 2;
var inside = alongX ? Math.abs(p.z - cz0) < B.d / 2 - 0.5 : Math.abs(p.x - cx0) < B.w / 2 - 0.5;
if (inside)
return;
if (gt && !mt.map) {
mt.map = gt;
mt.needsUpdate = true;
}
aupWindow(L, p.x, p.y, p.z, ry, W, h, T / 2, fc, p.y - h / 2 < 1.3);
});
g.children.forEach(function (m) {
if (!m.isInstancedMesh || m.userData.aup)
return;
var mt = m.material, ge = m.geometry, P = ge && ge.parameters;
if (!P || ge.type !== "BoxGeometry" || !(g.userData.glass || []).includes(mt))
return;
if (Math.abs(P.depth - 0.05) > 0.001)
return;
var M4 = AUP_TMP.m || (AUP_TMP.m = new THREE.Matrix4()), q = AUP_TMP.q || (AUP_TMP.q = new THREE.Quaternion()), v = AUP_TMP.v || (AUP_TMP.v = new THREE.Vector3()), s = AUP_TMP.s || (AUP_TMP.s = new THREE.Vector3()), e = new THREE.Euler();
for (var i = 0; i < m.count; i++) {
m.getMatrixAt(i, M4);
M4.decompose(v, q, s);
e.setFromQuaternion(q, "YXZ");
if (Math.abs(e.x) > 0.01 || Math.abs(e.z) > 0.01)
continue;
aupWindow(L, v.x, v.y, v.z, e.y, P.width, P.height, 0.03, fc, false);
}
});
var D = typeof frontDoorOf === "function" ? frontDoorOf(parts) : null, ds = a.ds || "plain";
if (AUP.doors && D && D.s && (ds === "plain" || ds === "glass") && D.s[0] >= 0.8 && D.s[0] <= 1.8 && D.s[1] >= 1.8 && D.s[1] <= 3.2 && B.h >= D.s[1] + 1.2 && Math.abs(D.p[2] + D.s[2] / 2 - (B.z + B.d / 2)) < 0.6) {
var dw = D.s[0] * 1.9 / 1.2, dh = D.s[1] * 3.1 / 2.3, bot = D.p[1] - D.s[1] / 2;
L.push({ k: "door", x: D.p[0], y: bot, z: Math.max(D.p[2] + D.s[2] / 2, B.z + B.d / 2) + 0.03, ry: 0, sx: dw, sy: dh, sz: 1, col: 0xFFFFFF });
}
AUP.panes += aupPlace(g, L);
AUP.made++;
}
(function () {
if (typeof addOpenings !== "function")
return;
var a0 = addOpenings;
addOpenings = function (g, spec, def, parts, f, opa) {
var r = a0.apply(this, arguments);
try {
if (AUP.on && def && def.cat === "structure" && aupWhere(spec) && !(opa < 0.99) && !(f < 0.99) && !(typeof isHidden === "function" && isHidden(spec)))
aupDress(g, spec, def, parts);
}
catch (e) {
if (window.console)
console.warn("art-up:", e);
}
return r;
};
})();
var AUP_PAVE = 2.5;
(function () {
if (typeof atlTiled !== "function")
return;
var t0 = atlTiled;
atlTiled = function (kind, u, v) { if (AUP.on && kind === "paving") {
u *= AUP_PAVE;
v *= AUP_PAVE;
} return t0.call(this, kind, u, v); };
})();
var AUP_ST = { src: null, sets: [], proxies: [], seen: new Set(), M: null, Z: null };
function aupStFind() {
if (typeof ATLC === "undefined" || !ATLC || typeof realmGrounds === "undefined")
return;
var G = realmGrounds[ATLC.id];
if (!G || G === AUP_ST.src)
return;
AUP_ST.src = G;
AUP_ST.sets = [];
AUP_ST.proxies = [];
var crowns = [];
G.traverse(function (m) { if (m.isInstancedMesh && m.geometry && m.geometry.type === "IcosahedronGeometry" && m.geometry.parameters && Math.abs(m.geometry.parameters.radius - 1.9) < 0.001)
crowns.push(m); });
crowns.forEach(function (c) {
var P = c.parent, set = P.children.filter(function (m) { return m.isInstancedMesh && m.count === c.count; });
var trunk = set.filter(function (m) { return m.geometry.type === "CylinderGeometry"; })[0];
if (!trunk)
return;
var keep = set.map(function (m) { return m.instanceMatrix.array.slice(); });
AUP_ST.sets.push({ meshes: set, keep: keep });
P.updateWorldMatrix(true, false);
var M = new THREE.Matrix4(), v = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
for (var i = 0; i < trunk.count; i++) {
trunk.getMatrixAt(i, M);
M.premultiply(trunk.matrixWorld);
M.decompose(v, q, s);
var sc = s.x, base = v.clone();
base.y -= 2.1 * sc;
AUP_ST.proxies.push(aupStProxy(AUP_ST.sets.length - 1, i, base, sc * 0.74));
}
});
}
function aupStProxy(si, i, pos, k) { return __ZC(463, 0, this, arguments, new.target); }
function aupStShow(o, show) {
var S = AUP_ST.sets[o.set];
if (!S)
return;
S.meshes.forEach(function (m, j) {
var a = m.instanceMatrix.array, b = S.keep[j], off = o.i * 16;
for (var n = 0; n < 16; n++)
a[off + n] = show ? b[off + n] : 0;
m.instanceMatrix.needsUpdate = true;
});
}
(function () {
if (typeof rtChunks !== "function")
return;
var c0 = rtChunks;
rtChunks = function (on, cam, pick) {
var r = c0.apply(this, arguments);
try {
if (!AUP.on || !AUP.trees)
return r;
if (on)
aupStFind();
var now = new Set();
var inCity = on && AUP_ST.src && AUP_ST.src.parent && AUP_ST.src.visible !== false;
if (inCity)
AUP_ST.proxies.forEach(function (o) {
var d = o.position.distanceTo(cam);
if (d >= RT.near)
return;
var k = rtPick(o);
(pick[k] = pick[k] || []).push({ o: o, d: d });
now.add(o);
});
AUP_ST.seen.forEach(function (o) { if (!now.has(o)) {
aupStShow(o, true);
o.userData.rtHid = false;
} });
now.forEach(function (o) { if (!AUP_ST.seen.has(o))
aupStShow(o, false); });
AUP_ST.seen = now;
}
catch (e) {
if (window.console && !AUP_ST.warned) {
AUP_ST.warned = 1;
console.warn("art-up trees:", e);
}
}
return r;
};
})();
function aupMerge(list) {
var pos = [], nor = [], uv = [];
list.forEach(function (g) {
var G = g.index ? g.toNonIndexed() : g, p = G.attributes.position, n = G.attributes.normal, u = G.attributes.uv;
for (var i = 0; i < p.count; i++) {
pos.push(p.getX(i), p.getY(i), p.getZ(i));
nor.push(n.getX(i), n.getY(i), n.getZ(i));
if (u)
uv.push(u.getX(i), u.getY(i));
else
uv.push(0, 0);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeBoundingSphere();
return g;
}
function aupLampPostGeo() {
if (AUP.geos.post)
return AUP.geos.post;
var L = aupLite(), seg = L ? 6 : 10, list = [], C = function (rt, rb, h, y, s) { var g = new THREE.CylinderGeometry(rt, rb, h, s || seg); g.translate(0, y, 0); list.push(g); };
C(0.3, 0.36, 0.22, -2.8 + 0.11);
C(0.22, 0.3, 0.45, -2.8 + 0.44);
C(0.24, 0.24, 0.08, -2.8 + 0.7);
C(0.11, 0.15, 4.2, -2.8 + 2.85);
C(0.17, 0.17, 0.12, -2.8 + 1.4);
C(0.16, 0.13, 0.14, -2.8 + 4.9);
var bar = new THREE.BoxGeometry(0.8, 0.05, 0.05);
bar.translate(0, -2.8 + 4.75, 0);
list.push(bar);
C(0.09, 0.12, 0.6, -2.8 + 5.25);
C(0.06, 0.28, 0.12, -2.8 + 5.55 + 0.02, 6);
var cap = new THREE.ConeGeometry(0.4, 0.32, 6);
cap.translate(0, 3.275 + 0.16, 0);
list.push(cap);
var fin = new THREE.SphereGeometry(0.06, 6, 4);
fin.translate(0, 3.275 + 0.36, 0);
list.push(fin);
return (AUP.geos.post = aupMerge(list));
}
function aupLanternGeo() {
if (AUP.geos.lantern)
return AUP.geos.lantern;
var g = new THREE.CylinderGeometry(0.3, 0.22, 0.55, 6);
return (AUP.geos.lantern = g);
}
function aupLamps(G) {
if (!G || G.userData.aupLamps)
return;
G.userData.aupLamps = 1;
G.traverse(function (m) {
if (!m.isInstancedMesh || !m.geometry || !m.geometry.parameters)
return;
var P = m.geometry.parameters, t = m.geometry.type;
if (t === "CylinderGeometry" && Math.abs(P.radiusTop - 0.13) < 1e-4 && Math.abs(P.radiusBottom - 0.2) < 1e-4 && Math.abs(P.height - 5.6) < 1e-4) {
m.geometry = aupLampPostGeo();
m.material = m.material.clone();
m.material.color.setHex(0x1A221C);
}
else if (t === "SphereGeometry" && Math.abs(P.radius - 0.42) < 1e-4 && m.material && m.material.isMeshBasicMaterial)
m.geometry = aupLanternGeo();
});
}
(function () {
if (typeof atlTick !== "function")
return;
var t0 = atlTick;
atlTick = function () { var r = t0.apply(this, arguments); try {
if (AUP.on && typeof ATLC !== "undefined" && ATLC && typeof realmGrounds !== "undefined" && realmGrounds[ATLC.id])
aupLamps(realmGrounds[ATLC.id]);
}
catch (e) { } return r; };
})();
"use strict";
function aupMeadowGeo(nb, hMin, hVar, seed) { return __ZC(463, 1, this, arguments, new.target); }
function aupMeadow(G, o) { return __ZC(463, 2, this, arguments, new.target); }
function aupRange(G, o) { return __ZC(463, 3, this, arguments, new.target); }
(function () {
if (typeof ppBuild !== "function" || typeof ppBox !== "function")
return;
var bx = ppBox, cy = ppCyl;
ppBox = function (w, h, d, m, x, y, z, G) { var r = bx.apply(this, arguments); try {
if (PP.aupPave && h <= 0.35 && (y || 0) <= 0.4 && (w > 1.5 || d > 1.5))
PP.aupPave.push({ x0: x - w / 2 - 0.6, x1: x + w / 2 + 0.6, z0: z - d / 2 - 0.6, z1: z + d / 2 + 0.6, r: r });
}
catch (e) { } return r; };
ppCyl = function (rt, rb, h, m, x, y, z, G, s) { var r = cy.apply(this, arguments); try {
if (PP.aupPave && h <= 0.6 && (y || 0) <= 0.5 && rb > 1.5)
PP.aupPave.push({ x: x, z: z, rr: rb + 0.8 });
}
catch (e) { } return r; };
var b0 = ppBuild;
ppBuild = function (G) {
PP.aupPave = [];
var r = b0.apply(this, arguments);
try {
aupJubilee(G);
}
catch (e) {
if (window.console)
console.warn("[jubilee ground]", e);
}
PP.aupPave = null;
return r;
};
})();
function aupJubilee(G) { return __ZC(463, 4, this, arguments, new.target); }
