/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(519, function () {
"use strict";
return [
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + (o.e || "") + "|" + (o.op || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.basic ? 1 : 0);
if (SWK.mats[k])
return SWK.mats[k];
var m = o.basic ? new THREE.MeshBasicMaterial({ color: col }) : new THREE.MeshLambertMaterial({ color: col });
if (tex && typeof texOf === "function") {
var t = texOf(tex);
if (t)
m.map = t;
}
if (o.e !== undefined && !o.basic) {
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
SWK.mats[k] = m;
return m;
},
function (G, x, z, o) {
o = o || {};
var s = o.s || 1, y = o.y || 0, kind = o.kind || "broad", r = swkR(Math.round(x * 7 + z * 13)), T = swkAt(G, x, y, z, r() * 6.28);
var bark = swkM(kind === "birch" ? 0xD8D4C8 : (o.bark || 0x5A4636), "bark"), leafC = o.c || 0x4A7A34;
var leaf = [swkM(leafC, "foliage"), swkM(new THREE.Color(leafC).multiplyScalar(0.82).getHex(), "foliage"), swkM(new THREE.Color(leafC).offsetHSL(0.02, 0, 0.05).getHex(), "foliage")];
if (kind === "palm") {
var h = 7 * s, n = 6, px = 0, pz = 0;
for (var i = 0; i < n; i++) {
var t = swkCyl(T, 0.16 * s * (1 - i / n * 0.3), 0.19 * s * (1 - i / n * 0.3), h / n + 0.05, bark, px, h / n * (i + 0.5), pz, 7);
t.rotation.z = 0.03 * i;
px += 0.06 * i * s;
}
for (var f = 0; f < (swkLite() ? 6 : 9); f++) {
var a = f / 9 * 6.283 + r(), fr = swkMesh(T, new THREE.ConeGeometry(0.42 * s, 3.4 * s, 4), leaf[f % 3], px + Math.cos(a) * 1.4 * s, h - 0.2 * s, pz + Math.sin(a) * 1.4 * s);
fr.scale.z = 0.18;
fr.rotation.y = -a;
fr.rotation.z = Math.PI / 2 + 0.45;
fr.rotation.order = "YZX";
}
return T;
}
if (kind === "conifer") {
var hc = 9 * s;
swkCyl(T, 0.12 * s, 0.3 * s, hc * 0.4, bark, 0, hc * 0.2, 0, 7);
for (var c = 0; c < 4; c++) {
var cr = (2.3 - c * 0.5) * s;
swkMesh(T, new THREE.ConeGeometry(cr, hc * 0.38, 9), leaf[c % 3], 0, hc * 0.3 + c * hc * 0.17, 0);
}
return T;
}
var th = (kind === "birch" ? 4.4 : 3.4) * s;
var tr = swkCyl(T, 0.2 * s, 0.34 * s, th, bark, 0, th / 2, 0, 8);
tr.rotation.z = (r() - 0.5) * 0.08;
for (var b = 0; b < 2; b++) {
var br = swkCyl(T, 0.07 * s, 0.12 * s, 1.8 * s, bark, (b ? 0.5 : -0.5) * s, th * 0.85, 0, 6);
br.rotation.z = b ? -0.7 : 0.7;
}
var nc = swkLite() ? 4 : 7, cw = (kind === "birch" ? 1.5 : 2.2) * s;
for (var k = 0; k < nc; k++) {
var a2 = k / nc * 6.283 + r(), rr = k === 0 ? 0 : cw * 0.75, cl = swkBall(T, cw * (0.75 + r() * 0.35), leaf[k % 3], Math.cos(a2) * rr, th + cw * (0.55 + (k === 0 ? 0.55 : r() * 0.4)), Math.sin(a2) * rr, 1);
cl.scale.y = 0.78;
cl.rotation.set(r(), r(), r());
}
return T;
},
function (G, x, z, ry, y) {
var B = swkAt(G, x, y || 0, z, ry), iron = swkM(0x26282C, "metal"), wood = swkM(0x8A5E3A, "wood");
[-0.85, 0.85].forEach(function (e) { swkBox(B, 0.06, 0.45, 0.5, iron, e, 0.22, 0); swkBox(B, 0.06, 0.5, 0.06, iron, e, 0.7, -0.24); swkBox(B, 0.06, 0.06, 0.5, iron, e, 0.62, 0.02); });
for (var i = 0; i < 4; i++)
swkBox(B, 1.9, 0.04, 0.1, wood, 0, 0.47, -0.18 + i * 0.12);
for (var j = 0; j < 3; j++)
swkBox(B, 1.9, 0.09, 0.03, wood, 0, 0.62 + j * 0.13, -0.27);
return B;
},
function (G, x, z, o) {
o = o || {};
var h = o.h || 4.2, L = swkAt(G, x, o.y || 0, z, 0), iron = swkM(o.post || 0x22262A, "metal");
swkCyl(L, 0.16, 0.22, 0.5, iron, 0, 0.25, 0, 10);
swkCyl(L, 0.06, 0.09, h, iron, 0, h / 2, 0, 8);
swkBox(L, 0.38, 0.06, 0.38, iron, 0, h + 0.02, 0);
swkBox(L, 0.3, 0.48, 0.3, swkM(o.c || 0xFFE2A8, null, { basic: true }), 0, h + 0.3, 0);
swkMesh(L, new THREE.ConeGeometry(0.32, 0.28, 4), iron, 0, h + 0.68, 0, Math.PI / 4);
return L;
},
function (G, x, z, w, d, o) {
o = o || {};
var P = swkAt(G, x, o.y || 0, z, o.ry || 0), stone = swkM(o.stone || 0x9A9488, "stone"), r = swkR(Math.round(x * 3 + z * 5));
swkBox(P, w, 0.55, d, stone, 0, 0.275, 0);
swkBox(P, w - 0.2, 0.05, d - 0.2, swkM(0x3A2A1E, "earth"), 0, 0.56, 0);
var leaf = [swkM(o.c || 0x3E6A30, "foliage"), swkM(0x4E7A3A, "foliage"), swkM(0x355A2A, "foliage")], fl = o.flowers || [0xC83A4A, 0xF0D040, 0xE8E0F0, 0xA858B8];
var n = Math.max(2, Math.round(w * d / 1.6));
if (swkLite())
n = Math.ceil(n / 2);
for (var i = 0; i < n; i++) {
var bx = (r() - 0.5) * (w - 0.7), bz = (r() - 0.5) * (d - 0.7), b = swkBall(P, 0.38 + r() * 0.22, leaf[i % 3], bx, 0.85, bz, 1);
b.scale.y = 0.8;
if (i % 2 === 0)
swkBall(P, 0.13, swkM(fl[i % fl.length]), bx + 0.15, 1.1, bz + 0.1, 0);
}
return P;
},
function (c1, c2) {
var k = c1 + "-" + c2;
if (SWK.stripes[k])
return SWK.stripes[k];
var cv = document.createElement("canvas");
cv.width = 128;
cv.height = 64;
var x = cv.getContext("2d");
for (var i = 0; i < 8; i++) {
x.fillStyle = new THREE.Color(i % 2 ? c2 : c1).getStyle();
x.fillRect(i * 16, 0, 16, 64);
}
x.fillStyle = "rgba(0,0,0,0.08)";
for (var j = 0; j < 200; j++)
x.fillRect(Math.random() * 128, Math.random() * 64, 2, 1);
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
var m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide });
SWK.stripes[k] = m;
return m;
},
function (G, x, z, ry, o) {
o = o || {};
var S = swkAt(G, x, o.y || 0, z, ry), wood = swkM(o.wood || 0x7A5232, "wood"), w = o.w || 3;
swkBox(S, w, 0.95, 0.9, wood, 0, 0.475, 0.3);
swkBox(S, w + 0.1, 0.05, 1.0, swkM(0x9A7A52, "wood"), 0, 0.97, 0.3);
[[-w / 2, -0.6], [w / 2, -0.6], [-w / 2, 0.75], [w / 2, 0.75]].forEach(function (p) { swkBox(S, 0.08, 2.5, 0.08, wood, p[0], 1.25, p[1]); });
var aw = swkMesh(S, new THREE.PlaneGeometry(w + 0.5, 1.9), swkStripe(o.c1 || 0xC83A3A, o.c2 || 0xF0ECE0), 0, 2.55, 0.15);
aw.rotation.x = -Math.PI / 2 + 0.32;
swkBox(S, w, 1.6, 0.06, wood, 0, 1.75, -0.62);
var gd = o.goods || [0xD84A2A, 0xE8B030, 0x6A9A3A, 0xB8862A];
for (var i = 0; i < (swkLite() ? 3 : 6); i++) {
var gx = -w / 2 + 0.35 + i * (w - 0.7) / 5;
swkBox(S, 0.42, 0.12, 0.32, swkM(0x8A6A42, "wood"), gx, 1.04, 0.35);
for (var q = 0; q < 3; q++)
swkBall(S, 0.07, swkM(gd[(i + q) % gd.length]), gx - 0.1 + q * 0.1, 1.14, 0.35, 0);
}
return S;
},
function (G, x, z, o) {
o = o || {};
var h = o.h || 8, F = swkAt(G, x, o.y || 0, z, o.ry || 0);
swkCyl(F, 0.05, 0.08, h, swkM(0xC8CCD0, "metal"), 0, h / 2, 0, 8);
swkBall(F, 0.1, swkM(0xD8B040), 0, h + 0.08, 0, 0);
var cv = document.createElement("canvas");
cv.width = 64;
cv.height = 40;
var c = cv.getContext("2d");
c.fillStyle = new THREE.Color(o.c1 || 0x1A2A4A).getStyle();
c.fillRect(0, 0, 64, 40);
c.fillStyle = new THREE.Color(o.c2 || 0xF0C040).getStyle();
c.fillRect(0, 15, 64, 10);
var fm = new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(cv), side: THREE.DoubleSide });
var fl = swkMesh(F, new THREE.PlaneGeometry(1.8, 1.1, 6, 1), fm, 0.9, h - 0.6, 0);
var p = fl.geometry.attributes.position;
for (var i = 0; i < p.count; i++)
p.setZ(i, Math.sin((p.getX(i) + 0.9) * 2.2) * 0.12 * (p.getX(i) + 0.9));
p.needsUpdate = true;
fl.name = "flag";
return F;
},
function (G, x, z, o) {
o = o || {};
var C = swkAt(G, x, o.y || 0, z, o.ry || 0), iron = swkM(0x2A2A2E, "metal"), top = swkM(o.top || 0xE8E2D4, "marble");
swkCyl(C, 0.4, 0.4, 0.04, top, 0, 0.74, 0, 16);
swkCyl(C, 0.035, 0.035, 0.72, iron, 0, 0.37, 0, 6);
swkCyl(C, 0.22, 0.24, 0.03, iron, 0, 0.015, 0, 10);
var n = o.n || 3;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283 + 0.3, ch = swkAt(C, Math.cos(a) * 0.75, 0, Math.sin(a) * 0.75, -a - Math.PI / 2);
swkBox(ch, 0.42, 0.04, 0.42, swkM(o.seat || 0x6A4A2E, "wood"), 0, 0.45, 0);
swkBox(ch, 0.42, 0.42, 0.04, swkM(o.seat || 0x6A4A2E, "wood"), 0, 0.68, -0.2);
[[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].forEach(function (l) { swkBox(ch, 0.03, 0.45, 0.03, iron, l[0], 0.225, l[1]); });
}
if (o.parasol) {
swkCyl(C, 0.03, 0.03, 2.4, swkM(0xD8D0C0), 0, 1.2, 0, 6);
var pc = swkMesh(C, new THREE.ConeGeometry(1.4, 0.5, 8, 1, true), swkStripe(o.parasol, 0xF4F0E4), 0, 2.3, 0);
}
return C;
},
function (col) {
var k = "rug|" + col;
if (SWK.mats[k])
return SWK.mats[k];
var cv = document.createElement("canvas");
cv.width = cv.height = 128;
var x = cv.getContext("2d"), c = new THREE.Color(col);
x.fillStyle = c.getStyle();
x.fillRect(0, 0, 128, 128);
x.strokeStyle = c.clone().multiplyScalar(0.55).getStyle();
x.lineWidth = 10;
x.strokeRect(8, 8, 112, 112);
x.lineWidth = 3;
x.strokeStyle = "rgba(240,220,170,0.7)";
x.strokeRect(20, 20, 88, 88);
x.beginPath();
x.moveTo(64, 30);
x.lineTo(98, 64);
x.lineTo(64, 98);
x.lineTo(30, 64);
x.closePath();
x.stroke();
var m = new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(cv) });
SWK.mats[k] = m;
return m;
},
function (G, seed, list, ground) {
var out = [];
if (typeof wPerson !== "function")
return out;
list.forEach(function (p, i) {
if (!swkKeep(i))
return;
var o = p[4] || {}, g = null;
try {
g = wPerson(seed + "_" + i, { title: p[3] || "", place: o.place || "", sex: o.sex, look: o.look, child: o.child });
}
catch (e) {
g = null;
}
if (!g)
return;
var y = ground ? ground(p[0], p[1]) : (o.y || 0);
g.position.set(p[0], y, p[1]);
g.rotation.y = p[2] || 0;
g.userData.keep = 1;
g.name = "swk-person";
G.add(g);
g.traverse(function (m) { m.raycast = function () { }; });
if (o.walk)
SWK.walkers.push({ g: g, r: o.walk, ground: ground });
out.push(g);
});
if (SWK.walkers.length && !SWK.ticking) {
SWK.ticking = true;
requestAnimationFrame(swkTick);
}
return out;
},
function (t) {
var dt = Math.min(0.1, SWK.last ? (t - SWK.last) / 1000 : 0);
SWK.last = t;
SWK.walkers = SWK.walkers.filter(function (w) { return w.g.parent; });
if (typeof wWander === "function")
SWK.walkers.forEach(function (w) {
if (!swkLive(w.g))
return;
var gr = w.ground, par = w.g.parent;
wWander(w.g, dt, gr ? function (x, z) { return gr(x, z); } : null, { r: w.r, sp: 1.0 });
});
if (SWK.walkers.length)
requestAnimationFrame(swkTick);
else
SWK.ticking = false;
},
function (key) {
var own = KSW.styles[key];
if (!own && /^gr_/.test(key) && typeof kitGrandStyle === "function")
own = kitGrandStyle(key);
if (!own)
return null;
var S = {}, k;
for (k in KIT_BASE)
S[k] = KIT_BASE[k];
for (k in own)
S[k] = own[k];
S.pal = {};
for (k in KIT_BASE.pal)
S.pal[k] = KIT_BASE.pal[k];
if (own.pal)
for (k in own.pal)
S.pal[k] = own.pal[k];
S.mat = {};
for (k in KIT_BASE.mat)
S.mat[k] = KIT_BASE.mat[k];
if (own.mat)
for (k in own.mat)
S.mat[k] = own.mat[k];
S.light = {};
for (k in KIT_BASE.light)
S.light[k] = KIT_BASE.light[k];
if (own.light)
for (k in own.light)
S.light[k] = own.light[k];
S.folk = {};
for (k in KIT_BASE.folk)
S.folk[k] = KIT_BASE.folk[k];
if (own.folk)
for (k in own.folk)
S.folk[k] = own.folk[k];
return S;
},
function (B, kind, col, g, x, y, z, ry, rx, rz) {
if (!g.attributes.normal)
g.computeVertexNormals();
KIT_E.set(rx || 0, ry || 0, rz || 0, "YXZ");
KIT_Q.setFromEuler(KIT_E);
KIT_V.set(x || 0, y || 0, z || 0);
KIT_M4.compose(KIT_V, KIT_Q, KIT_S);
g.applyMatrix4(KIT_M4);
(B.parts[kind] || (B.parts[kind] = [])).push([g, col instanceof THREE.Color ? col : new THREE.Color(col)]);
B.n++;
return g;
},
function (w, h, d) {
var a = w / 2, p = [-a, 0, -d / 2, a, 0, -d / 2, 0, h, -d / 2, a, 0, d / 2, -a, 0, d / 2, 0, h, d / 2,
-a, 0, -d / 2, 0, h, -d / 2, 0, h, d / 2, -a, 0, -d / 2, 0, h, d / 2, -a, 0, d / 2,
a, 0, -d / 2, a, 0, d / 2, 0, h, d / 2, a, 0, -d / 2, 0, h, d / 2, 0, h, -d / 2];
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
var sl = Math.hypot(a, h), uv = [0, 0, w, 0, a, h, 0, 0, w, 0, a, h, 0, 0, sl, 0, sl, d, 0, 0, sl, d, 0, d, 0, 0, 0, d, sl, d, 0, 0, sl, d, sl, 0];
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeVertexNormals();
return g;
},
function (w, h, d) {
var a = w / 2, b = d / 2, r = Math.max(0, b - a) * 0.9;
var A = [-a, 0, -b], Bp = [a, 0, -b], C = [a, 0, b], D = [-a, 0, b], R1 = [0, h, -r], R2 = [0, h, r];
var tri = [A, Bp, R1, Bp, C, R2, Bp, R2, R1, C, D, R2, D, A, R1, D, R1, R2], p = [], uv = [];
tri.forEach(function (v, i) { p.push(v[0], v[1], v[2]); uv.push(v[0] + v[2] * 0.3, v[1] * 1.4 + (i % 3) * 0.01); });
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeVertexNormals();
return g;
},
function (kind) {
var k = "m|" + kind;
if (KSW.mats[k])
return KSW.mats[k];
var m;
if (kind === "glow" || kind === "lit") {
m = new THREE.MeshBasicMaterial({ vertexColors: true });
m.userData.kitGlow = 1;
}
else if (kind === "wet") {
m = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 90, specular: 0x6A7A8A, transparent: true, opacity: 0.78, depthWrite: false });
}
else if (kind === "pane") {
if (kitLite())
m = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x05080C });
else {
m = new THREE.MeshPhongMaterial({ vertexColors: true, specular: 0xA8B8C8, shininess: 120, combine: THREE.MixOperation, reflectivity: 0.3 });
var hook = function () { var e = typeof glassEnv === "function" ? glassEnv() : null; if (!e)
return false; m.envMap = e; m.needsUpdate = true; if (typeof BAKE_ENVMATS !== "undefined")
BAKE_ENVMATS.add(m); return true; };
if (!hook()) {
var tries = 0, iv = setInterval(function () { if (hook() || ++tries > 60)
clearInterval(iv); }, 2000);
}
}
}
else if (kind === "plain") {
m = new THREE.MeshLambertMaterial({ vertexColors: true });
}
else if (kind === "leafy") {
m = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
var tf = typeof texOf === "function" ? texOf("foliage") : null;
if (tf)
m.map = tf;
}
else {
m = new THREE.MeshLambertMaterial({ vertexColors: true });
var t = typeof texOf === "function" ? texOf(kind) : null;
if (t)
m.map = t;
}
m.name = "kit-" + kind;
KSW.mats[k] = m;
return m;
},
function (B, P) {
var out = [];
Object.keys(B.parts).forEach(function (kind) {
var L = B.parts[kind], n = 0, ni = 0;
L.forEach(function (q) { var c = q[0].attributes.position.count; n += c; ni += q[0].index ? q[0].index.count : c; });
if (!n)
return;
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), col = new Float32Array(n * 3), idx = n > 65535 ? new Uint32Array(ni) : new Uint16Array(ni), o = 0, oi = 0;
L.forEach(function (q) {
var g = q[0], P0 = g.attributes.position, N0 = g.attributes.normal, U0 = g.attributes.uv, c = P0.count, C = q[1], I = g.index;
pos.set(P0.array.subarray(0, c * 3), o * 3);
if (N0)
nor.set(N0.array.subarray(0, c * 3), o * 3);
if (U0)
uv.set(U0.array.subarray(0, c * 2), o * 2);
for (var i = 0; i < c; i++) {
col[(o + i) * 3] = C.r;
col[(o + i) * 3 + 1] = C.g;
col[(o + i) * 3 + 2] = C.b;
}
if (I) {
for (var j = 0; j < I.count; j++)
idx[oi + j] = I.array[j] + o;
oi += I.count;
}
else {
for (var k = 0; k < c; k++)
idx[oi + k] = o + k;
oi += c;
}
o += c;
g.dispose();
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
G.setAttribute("color", new THREE.BufferAttribute(col, 3));
G.setIndex(new THREE.BufferAttribute(idx, 1));
G.computeBoundingSphere();
var M = new THREE.Mesh(G, kitMat(kind));
M.name = "kit-" + kind;
M.matrixAutoUpdate = false;
M.updateMatrix();
if (kind === "wet") {
M.renderOrder = 1;
}
M.raycast = function () { };
P.add(M);
out.push(M);
});
B.parts = {};
B.n = 0;
return out;
},
function (P, geo, mat, list) {
if (!list.length)
return null;
var M = new THREE.InstancedMesh(geo, mat, list.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), c = new THREE.Color();
list.forEach(function (it, i) {
e.set(it.rx || 0, it.ry || 0, it.rz || 0, "YXZ");
q.setFromEuler(e);
v.set(it.x, it.y, it.z);
s.set(it.sx || 1, it.sy || 1, it.sz || 1);
m4.compose(v, q, s);
M.setMatrixAt(i, m4);
c.set(it.c);
M.setColorAt(i, c);
});
M.instanceMatrix.needsUpdate = true;
if (M.instanceColor)
M.instanceColor.needsUpdate = true;
M.raycast = function () { };
M.name = "kit-scatter";
M.frustumCulled = false;
P.add(M);
return M;
},
function (m) {
if (!m.isMesh || m.isInstancedMesh || m.isSkinnedMesh || !m.geometry || !m.material)
return null;
var g = m.geometry;
if (g.type !== "BoxGeometry" && g.type !== "BoxBufferGeometry" && !(g.attributes.position && g.attributes.position.count === 24 && g.index && g.index.count === 36))
return null;
var mats = Array.isArray(m.material) ? m.material : [m.material], m0 = mats[0], pbk = false;
for (var i = 0; i < mats.length; i++) {
var q = mats[i];
if (!q)
return null;
if (q.name === "pbk")
pbk = true;
if (q.transparent && q.opacity < 0.95)
return null;
if (q.name && /^kit-/.test(q.name))
return null;
}
if (!pbk) {
if (!(m0.isMeshLambertMaterial || m0.isMeshPhongMaterial || m0.isMeshStandardMaterial || m0.isMeshToonMaterial))
return null;
if (m0.emissive && (m0.emissive.r + m0.emissive.g + m0.emissive.b) > 0.6)
return null;
if (m0.color && m0.color.r + m0.color.g + m0.color.b < 0.1)
return null;
}
if (!g.boundingBox)
g.computeBoundingBox();
var own = false;
if (!pbk && m0.map) {
var plain = false;
if (typeof TEXCACHE !== "undefined")
for (var k in TEXCACHE)
if (TEXCACHE[k] === m0.map) {
plain = true;
break;
}
own = !plain;
}
var col = m0.color ? m0.color.clone() : new THREE.Color(0xD8D0C0);
if (pbk) {
var mm = mats[2] || m0;
if (mm && mm.color)
col = mm.color.clone();
}
return { gbb: g.boundingBox.clone(), pbk: pbk, own: own, col: col };
},
function (D, mw, W) {
var e = mw.elements, sx = Math.hypot(e[0], e[1], e[2]), sy = Math.hypot(e[4], e[5], e[6]), sz = Math.hypot(e[8], e[9], e[10]);
if (e[5] / Math.max(1e-6, sy) < 0.97)
return null;
var bb = D.gbb, w = (bb.max.x - bb.min.x) * sx, h = (bb.max.y - bb.min.y) * sy, d = (bb.max.z - bb.min.z) * sz;
if (h < 2.6 || Math.min(w, d) < 2.6 || Math.max(w, d) > 110 || h > 60)
return null;
bb.getCenter(KIT_BV);
KIT_BV.applyMatrix4(mw);
var ry = Math.atan2(e[8] / sz, e[10] / sz);
return { x: KIT_BV.x - W.base, y: KIT_BV.y - h / 2, z: KIT_BV.z, w: w, h: h, d: d, ry: ry, top: KIT_BV.y + h / 2, pbk: D.pbk, own: D.own, col: D.col };
},
function (root) {
var out = [];
try {
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
root.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh || !m.geometry || out.length > 9000)
return;
var g = m.geometry;
if (!g.boundingBox)
g.computeBoundingBox();
var rel = new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld), D = kitDescOf(m);
out.push({ gbb: D ? D.gbb : g.boundingBox.clone(), rel: rel, D: D });
});
}
catch (e) { }
return out;
},
function (W, list) {
var S = { c: 8, map: new Map() };
list.forEach(function (it) {
var b = it.b, x0 = Math.floor((b.min.x - W.base) / S.c), x1 = Math.floor((b.max.x - W.base) / S.c), z0 = Math.floor(b.min.z / S.c), z1 = Math.floor(b.max.z / S.c);
if ((x1 - x0 + 1) * (z1 - z0 + 1) > 400)
return;
for (var x = x0; x <= x1; x++)
for (var z = z0; z <= z1; z++) {
var k = x + "," + z, L = S.map.get(k);
if (!L)
S.map.set(k, L = []);
L.push(it);
}
});
return S;
},
function (S, x0, x1, z0, z1, fn) {
var seen = new Set();
for (var x = Math.floor(x0 / S.c); x <= Math.floor(x1 / S.c); x++)
for (var z = Math.floor(z0 / S.c); z <= Math.floor(z1 / S.c); z++) {
var L = S.map.get(x + "," + z);
if (!L)
continue;
for (var i = 0; i < L.length; i++) {
var it = L[i];
if (seen.has(it))
continue;
seen.add(it);
if (fn(it))
return true;
}
}
return false;
},
function (b) {
var c = Math.cos(b.ry), s = Math.sin(b.ry), out = [];
[[0, 1, b.w, b.d], [0, -1, b.w, b.d], [1, 0, b.d, b.w], [-1, 0, b.d, b.w]].forEach(function (f) {
var lnx = f[0], lnz = f[1], len = f[2], half = f[3] / 2;
var nx = lnx * c + lnz * s, nz = -lnx * s + lnz * c;
out.push({ x: b.x + nx * half, z: b.z + nz * half, nx: nx, nz: nz, ry: Math.atan2(nx, nz), len: len, depth: f[3] });
});
return out;
},
function (B, S, A, b, info) {
var r = kitRand(Math.round(b.x * 13 + b.z * 7 + b.h * 31)), lite = kitLite();
var wallC = b.col, trimC = kitCol(S.pal.trim), roofC = kitCol(kitPick(S.pal.roof, r())), doorC = kitCol(kitPick(S.pal.door, r())), shutC = kitCol(kitPick(S.pal.shutter, r()));
var tk = S.mat.trim || "stone", rk = S.mat.roof || "tile", dark = wallC.clone().multiplyScalar(0.58);
var faces = kitFaces(b), atGround = b.y <= info.gy + 0.9;
KSW.stat.buildings++;
var best = -2, front = 0;
faces.forEach(function (f, i) { var dx = A.x - f.x, dz = A.z - f.z, L = Math.hypot(dx, dz) || 1, dot = (dx * f.nx + dz * f.nz) / L; if (dot > best) {
best = dot;
front = i;
} });
faces.forEach(function (f, i) {
var F = { x: f.x, y: b.y, z: f.z, ry: f.ry };
if (b.own)
return;
if (S.plinth && atGround)
kitAddF(B, F, tk, dark, kitBoxG(f.len + 0.12, 0.62, 0.14), 0, 0.31, 0.02);
if (S.weather > 0 && !lite && atGround)
kitAddF(B, F, "plain", wallC.clone().multiplyScalar(0.8), kitBoxG(f.len + 0.04, 0.5, 0.03), 0, 0.86, 0.01);
if (S.cornice && !info.covered)
kitAddF(B, F, tk, trimC, kitBoxG(f.len + 0.5, 0.32, 0.36), 0, b.h - 0.12, 0.1);
else if (S.cornice && !lite)
kitAddF(B, F, tk, trimC, kitBoxG(f.len + 0.2, 0.18, 0.16), 0, b.h - 0.08, 0.04);
});
if (!b.own && !info.hasWin) {
var nH = b.pbk ? Math.max(1, Math.round(b.h / 3.3)) : Math.max(1, Math.round((b.h - 0.4) / 3.2)), sh = b.h / nH;
faces.forEach(function (f, fi) {
if (lite && fi !== front && (fi % 2))
return;
var nB = b.pbk ? Math.max(1, Math.round(f.len / 3.0)) : Math.max(1, Math.floor(f.len / 3.1)), bw = f.len / nB;
var F = { x: f.x, y: b.y, z: f.z, ry: f.ry };
for (var s = 0; s < nH; s++)
for (var k = 0; k < nB; k++) {
if (KSW.winBudget <= 0)
return;
var cx = -f.len / 2 + bw * (k + 0.5);
var isDoor = atGround && s === 0 && fi === front && k === Math.floor(nB / 2);
if (isDoor) {
kitDoor(B, S, F, cx, bw, sh, doorC, trimC, tk, r, b);
continue;
}
if (atGround && s === 0 && fi === front && S.shops && r() < S.shops && bw > 2.4) {
kitShopFront(B, S, F, cx, bw, sh, trimC, tk, r);
continue;
}
kitWindow(B, S, F, cx, s, sh, bw, b, trimC, tk, shutC, r, s === 1 && fi === front);
KSW.winBudget--;
KSW.stat.windows++;
}
});
}
if (!info.covered && S.roof && S.roof !== "none") {
kitRoof(B, S, b, r, roofC, rk, trimC, tk, wallC);
KSW.stat.roofs++;
}
},
function (B, S, F, cx, s, sh, bw, b, trimC, tk, shutC, r, first) {
var lite = kitLite(), shape = S.win, ww, wh, cy;
if (b.pbk) {
ww = bw * 0.42;
wh = sh * 0.56;
cy = s * sh + sh - sh * 0.16 - wh / 2;
}
else {
ww = Math.min(1.25, bw * 0.44);
wh = Math.min(s === 0 ? 2.0 : 1.8, sh * 0.56);
cy = s * sh + sh * 0.52;
}
if (shape === "slit") {
ww = Math.min(0.45, ww);
wh = Math.min(1.5, wh);
}
if (shape === "round") {
ww = wh = Math.min(ww, wh, 1.0);
}
var frC = S.pal.frame !== undefined ? kitCol(S.pal.frame) : trimC, glassC = kitCol(S.pal.glass), lit = r() < (S.litShare || 0.38);
var fz = 0.02, sk = S.mat.trim || "stone";
if (shape === "strip") {
if (!b.pbk) {
kitAddF(B, F, "pane", glassC, new THREE.PlaneGeometry(bw * 0.96, wh * 0.8), cx, cy, fz + 0.01);
}
kitAddF(B, F, "metal", frC, kitBoxG(0.08, wh * 0.82, 0.08), cx - bw / 2 + 0.04, cy, fz + 0.04);
if (!lite)
kitAddF(B, F, "metal", frC, kitBoxG(bw, 0.07, 0.1), cx, cy - wh * 0.41, fz + 0.05);
if (lit)
kitAddF(B, F, "lit", kitCol(S.pal.lit), new THREE.PlaneGeometry(bw * 0.9, wh * 0.72), cx, cy, fz + 0.03);
return;
}
if (shape === "round") {
if (!b.pbk)
kitAddF(B, F, "pane", glassC, new THREE.CircleGeometry(ww / 2, lite ? 8 : 12), cx, cy, fz + 0.02);
kitAddF(B, F, "metal", frC, new THREE.TorusGeometry(ww / 2 + 0.04, 0.06, 4, lite ? 8 : 12), cx, cy, fz + 0.04);
if (lit)
kitAddF(B, F, "lit", kitCol(S.pal.lit), new THREE.CircleGeometry(ww / 2 - 0.03, lite ? 8 : 12), cx, cy, fz + 0.035);
return;
}
if (!b.pbk) {
kitAddF(B, F, "plain", frC, kitBoxG(ww + 0.16, wh + 0.16, 0.05), cx, cy, fz + 0.01);
kitAddF(B, F, "pane", glassC, new THREE.PlaneGeometry(ww, wh), cx, cy, fz + 0.045);
if (shape === "arch") {
kitAddF(B, F, "plain", frC, new THREE.CircleGeometry(ww / 2 + 0.08, 8, 0, Math.PI), cx, cy + wh / 2, fz + 0.012);
kitAddF(B, F, "pane", glassC, new THREE.CircleGeometry(ww / 2, 8, 0, Math.PI), cx, cy + wh / 2, fz + 0.046);
}
if (!lite) {
if (shape === "sash") {
kitAddF(B, F, "plain", frC, kitBoxG(ww, 0.06, 0.04), cx, cy, fz + 0.06);
kitAddF(B, F, "plain", frC, kitBoxG(0.04, wh, 0.03), cx, cy, fz + 0.06);
}
else if (shape === "casement" || shape === "lattice") {
kitAddF(B, F, "plain", frC, kitBoxG(0.07, wh, 0.04), cx, cy, fz + 0.06);
kitAddF(B, F, "plain", frC, kitBoxG(ww, 0.05, 0.04), cx, cy + wh * 0.18, fz + 0.06);
}
}
}
if (lit)
kitAddF(B, F, "lit", kitCol(S.pal.lit, 0.95), new THREE.PlaneGeometry(ww * 0.92, wh * 0.92), cx, cy, fz + 0.05);
if (lit && shape === "arch" && !b.pbk)
kitAddF(B, F, "lit", kitCol(S.pal.lit, 0.95), new THREE.CircleGeometry(ww / 2 - 0.04, 8, 0, Math.PI), cx, cy + wh / 2, fz + 0.05);
kitAddF(B, F, sk, trimC, kitBoxG(ww + 0.34, 0.09, 0.2), cx, cy - wh / 2 - 0.05, 0.08);
if (shape !== "arch" && !lite)
kitAddF(B, F, sk, trimC, kitBoxG(ww + 0.3, 0.16, 0.1), cx, cy + wh / 2 + 0.1, 0.05);
if (shape === "slit") {
kitAddF(B, F, sk, trimC, kitBoxG(0.16, wh + 0.3, 0.12), cx - ww / 2 - 0.1, cy, 0.05);
kitAddF(B, F, sk, trimC, kitBoxG(0.16, wh + 0.3, 0.12), cx + ww / 2 + 0.1, cy, 0.05);
return;
}
if (S.shutters && r() < S.shutters && !lite) {
[-1, 1].forEach(function (sd) { kitAddF(B, F, "wood", shutC, kitBoxG(ww / 2, wh, 0.05), cx + sd * (ww * 0.75 + 0.1), cy, 0.05); });
}
if (first && S.balcony && r() < S.balcony) {
kitAddF(B, F, sk, trimC, kitBoxG(ww + 0.9, 0.14, 0.7), cx, cy - wh / 2 - 0.12, 0.35);
var mC = kitCol(S.pal.metal);
kitAddF(B, F, "metal", mC, kitBoxG(ww + 0.9, 0.05, 0.05), cx, cy - wh / 2 + 0.85, 0.68);
if (!lite)
for (var q = 0; q <= 6; q++)
kitAddF(B, F, "metal", mC, kitBoxG(0.03, 0.95, 0.03), cx - (ww + 0.9) / 2 + q * (ww + 0.9) / 6, cy - wh / 2 + 0.4, 0.68);
else
kitAddF(B, F, "metal", mC, kitBoxG(ww + 0.9, 0.9, 0.02), cx, cy - wh / 2 + 0.4, 0.68);
}
else if (S.boxes && r() < S.boxes && s > 0 && !lite) {
kitAddF(B, F, "wood", kitCol(S.pal.wood), kitBoxG(ww + 0.1, 0.22, 0.24), cx, cy - wh / 2 - 0.2, 0.16);
var fl = S.pal.flowers || [0xC83A4A, 0xE8C040, 0xE8E0F0, 0xB858A8];
for (var p = 0; p < 3; p++)
kitAddF(B, F, "leafy", kitCol(p === 1 ? 0x4A7A34 : kitPick(fl, r())), kitBallG(0.16, 0), cx - ww / 3 + p * ww / 3, cy - wh / 2 - 0.02, 0.18);
}
if (S.weather && r() < S.weather * 0.5 && !lite)
kitAddF(B, F, "plain", b.col.clone().multiplyScalar(0.72), kitBoxG(ww * 0.5, Math.min(1.4, cy - wh / 2 - 0.2), 0.012), cx, cy - wh / 2 - 0.1 - Math.min(1.4, cy - wh / 2 - 0.2) / 2, 0.006);
},
function (B, S, F, cx, bw, sh, doorC, trimC, tk, r, b) {
var dw = Math.min(1.3, bw * 0.5), dh = Math.min(2.4, sh * 0.78), lite = kitLite(), arch = S.win === "arch" || S.door === "arch";
kitAddF(B, F, tk, trimC, kitBoxG(dw + 0.42, dh + 0.3, 0.12), cx, dh / 2 + 0.12, 0.04);
kitAddF(B, F, "wood", doorC, kitBoxG(dw, dh, 0.08), cx, dh / 2 + 0.02, 0.1);
if (arch)
kitAddF(B, F, "wood", doorC, new THREE.CircleGeometry(dw / 2, 8, 0, Math.PI), cx, dh + 0.02, 0.141);
if (!lite) {
kitAddF(B, F, "wood", doorC.clone().multiplyScalar(0.75), kitBoxG(dw * 0.38, dh * 0.36, 0.03), cx - dw * 0.22, dh * 0.7, 0.15);
kitAddF(B, F, "wood", doorC.clone().multiplyScalar(0.75), kitBoxG(dw * 0.38, dh * 0.36, 0.03), cx + dw * 0.22, dh * 0.7, 0.15);
kitAddF(B, F, "metal", kitCol(0xC8A040), kitBallG(0.045, 0), cx + dw * 0.36, dh * 0.48, 0.17);
}
if (!arch && sh > 2.9) {
kitAddF(B, F, "pane", kitCol(S.pal.glass), new THREE.PlaneGeometry(dw, 0.3), cx, dh + 0.2, 0.11);
kitAddF(B, F, "lit", kitCol(S.pal.lit, 0.9), new THREE.PlaneGeometry(dw * 0.9, 0.24), cx, dh + 0.2, 0.115);
}
kitAddF(B, F, tk, trimC.clone().multiplyScalar(0.85), kitBoxG(dw + 0.9, 0.17, 0.62), cx, 0.085, 0.31);
if (S.doorLamp !== 0 && r() < 0.6)
kitLampOnWall(B, S, F, cx + dw / 2 + 0.45, dh + 0.1);
},
function (B, S, F, cx, bw, sh, trimC, tk, r) {
var w = bw * 0.86, h = Math.min(2.2, sh * 0.66), lite = kitLite(), cv = kitPick(S.pal.canvas, r()), wood = kitCol(kitPick(S.pal.door, r()));
kitAddF(B, F, "wood", wood, kitBoxG(w + 0.2, 0.6, 0.14), cx, 0.3, 0.07);
kitAddF(B, F, "pane", kitCol(S.pal.glass), new THREE.PlaneGeometry(w, h - 0.6), cx, 0.6 + (h - 0.6) / 2, 0.05);
kitAddF(B, F, "lit", kitCol(S.pal.lit, 0.8), new THREE.PlaneGeometry(w * 0.94, (h - 0.6) * 0.9), cx, 0.6 + (h - 0.6) / 2, 0.055);
kitAddF(B, F, "wood", wood, kitBoxG(w + 0.3, 0.42, 0.16), cx, h + 0.21, 0.08);
if (!lite)
for (var q = 0; q < 3; q++)
kitAddF(B, F, "wood", wood, kitBoxG(0.06, h - 0.6, 0.08), cx - w / 2 + q * w / 2, 0.6 + (h - 0.6) / 2, 0.09);
var n = lite ? 4 : 8, aw = w + 0.3, ad = 1.3, tilt = 0.42;
for (var i = 0; i < n; i++)
kitAddF(B, F, "plain", kitCol(i % 2 ? cv[1] : cv[0]), kitBoxG(aw / n, 0.03, ad), cx - aw / 2 + aw / n * (i + 0.5), h + 0.42 - Math.sin(tilt) * ad / 2, 0.15 + Math.cos(tilt) * ad / 2, 0, tilt);
if (!lite) {
var gd = S.pal.goods;
for (var g = 0; g < 4; g++)
kitAddF(B, F, "plain", kitCol(kitPick(gd, r())), kitBoxG(w / 5, 0.3, 0.1), cx - w / 2 + w / 5 * (g + 0.7), 0.9, 0.0);
}
},
function (B, S, b, r, roofC, rk, trimC, tk, wallC) {
var lite = kitLite(), t = kitPick(S.roof, r()), big = Math.max(b.w, b.d) > 28 || b.w * b.d > 520;
if (big && t !== "dome")
t = "flat";
if (t === "dome" && Math.abs(b.w - b.d) > Math.min(b.w, b.d) * 0.5)
t = S.roofAlt || "flat";
var F = { x: b.x, y: b.top, z: b.z, ry: b.ry }, longZ = b.d >= b.w, wa = longZ ? b.w : b.d, da = longZ ? b.d : b.w, rot = longZ ? 0 : Math.PI / 2, ov = 0.35;
if (t === "gable") {
var h = Math.min(5.5, wa * (S.pitch || 0.48));
kitAddF(B, F, rk, roofC, kitGableG(wa + ov * 2, h, da + ov * 2), 0, 0, 0, rot);
kitAddF(B, F, rk, roofC.clone().multiplyScalar(0.8), kitBoxG(0.22, 0.22, da + ov * 2 + 0.05), 0, h, 0, rot);
kitAddF(B, F, "plain", wallC, kitGableG(wa, h * 0.98, da - 0.02), 0, 0.005, 0, rot);
if (S.chimney !== 0 && r() < (S.chimney || 0.7)) {
var cs = (r() < 0.5 ? -1 : 1) * da * 0.3;
var cxl = longZ ? wa * 0.22 : cs, czl = longZ ? cs : wa * 0.22;
kitAddF(B, F, "brick", kitCol(S.pal.chimney || 0x9A5A42), kitBoxG(0.8, h + 1.3, 0.8), cxl, (h + 1.3) / 2, czl);
if (!lite)
kitAddF(B, F, "brick", kitCol(0x7A4A3A), kitBoxG(0.95, 0.18, 0.95), cxl, h + 1.35, czl);
}
if (S.dormers && !lite && da > 7) {
for (var dm = 0; dm < Math.floor(da / 5); dm++) {
var dz = -da / 2 + 2.5 + dm * 5;
kitDormer(B, S, F, longZ ? wa * 0.22 : dz, h * 0.35, longZ ? dz : wa * 0.22, longZ ? Math.PI / 2 : 0, roofC, rk, wallC);
}
}
}
else if (t === "hip") {
var hh = Math.min(5, wa * (S.pitch || 0.42));
kitAddF(B, F, rk, roofC, kitHipG(wa + ov * 2, hh, da + ov * 2), 0, 0, 0, rot);
if (S.chimney !== 0 && r() < (S.chimney || 0.6))
kitAddF(B, F, "brick", kitCol(S.pal.chimney || 0x9A5A42), kitBoxG(0.8, hh + 1.0, 0.8), wa * 0.18, (hh + 1) / 2, 0);
}
else if (t === "mansard") {
var mh = Math.min(3.2, wa * 0.3), inset = Math.min(1.2, wa * 0.18);
var fr = new THREE.CylinderGeometry(Math.SQRT1_2, Math.SQRT1_2, mh, 4, 1);
fr.rotateY(Math.PI / 4);
var p = fr.attributes.position;
for (var i = 0; i < p.count; i++) {
var top = p.getY(i) > 0;
p.setX(i, p.getX(i) * (top ? (wa - 2 * inset) : wa + 0.2));
p.setZ(i, p.getZ(i) * (top ? (da - 2 * inset) : da + 0.2));
}
fr.computeVertexNormals();
if (typeof metreUVs === "function")
metreUVs(fr, "cyl", [wa / 2, wa / 2, mh]);
kitAddF(B, F, rk, roofC, fr, 0, mh / 2, 0, rot);
kitAddF(B, F, "metalroof", roofC.clone().multiplyScalar(0.85), kitBoxG(longZ ? wa - 2 * inset : da - 2 * inset, 0.2, longZ ? da - 2 * inset : wa - 2 * inset), 0, mh + 0.1, 0);
if (!lite) {
var nd = Math.max(1, Math.floor(da / 3.2));
for (var q = 0; q < nd; q++) {
var dz2 = -da / 2 + da / nd * (q + 0.5);
[-1, 1].forEach(function (sd) { kitDormer(B, S, F, longZ ? sd * (wa / 2 - inset * 0.55) : dz2, mh * 0.25, longZ ? dz2 : sd * (wa / 2 - inset * 0.55), longZ ? (sd > 0 ? Math.PI / 2 : -Math.PI / 2) : (sd > 0 ? 0 : Math.PI), roofC, rk, wallC); });
}
}
if (S.chimney !== 0)
kitAddF(B, F, "brick", kitCol(S.pal.chimney || 0x9A5A42), kitBoxG(longZ ? wa - 2 * inset : 1, 1.1, longZ ? 1 : da - 2 * inset), 0, mh + 0.6, (longZ ? da / 2 - inset - 0.6 : 0));
}
else if (t === "dome") {
var R = Math.min(b.w, b.d) * 0.42, dr = new THREE.SphereGeometry(R, lite ? 10 : 16, lite ? 5 : 8, 0, Math.PI * 2, 0, Math.PI / 2);
if (typeof metreUVs === "function")
metreUVs(dr, "sph", [R]);
kitAddF(B, F, tk, trimC, kitCylG(R * 1.04, R * 1.06, 0.8, lite ? 10 : 16), 0, 0.4, 0);
kitAddF(B, F, rk, roofC, dr, 0, 0.8, 0);
if (!lite) {
kitAddF(B, F, tk, trimC, kitCylG(0.25, 0.35, 1.2, 8), 0, 0.8 + R + 0.5, 0);
kitAddF(B, F, "metal", kitCol(S.pal.finial || 0xC8A040), kitBallG(0.25, 1), 0, 0.8 + R + 1.2, 0);
}
}
else if (t === "cone") {
var cr = Math.max(b.w, b.d) * 0.72, ch = Math.min(8, Math.max(b.w, b.d) * 0.9), cg = kitConeG(cr, ch, 4);
cg.rotateY(Math.PI / 4);
cg.scale(b.w / Math.max(b.w, b.d) + 0.1, 1, b.d / Math.max(b.w, b.d) + 0.1);
kitAddF(B, F, rk, roofC, cg, 0, ch / 2, 0);
}
else {
var pc = wallC.clone().multiplyScalar(0.94);
kitAddF(B, F, "plain", kitCol(S.pal.flat || 0x5A5A58), kitBoxG(b.w - 0.1, 0.06, b.d - 0.1), 0, 0.03, 0, 0, 0, 0);
[[0, b.d / 2, b.w], [0, -b.d / 2, b.w], [b.w / 2, 0, b.d], [-b.w / 2, 0, b.d]].forEach(function (q, i) {
var along = i < 2;
kitAddF(B, F, S.mat.wall || "plaster", pc, kitBoxG(along ? q[2] : 0.3, 0.9, along ? 0.3 : q[2]), q[0] - (i === 2 ? 0.15 : i === 3 ? -0.15 : 0), 0.45, q[1] - (i === 0 ? 0.15 : i === 1 ? -0.15 : 0));
if (!lite)
kitAddF(B, F, tk, trimC, kitBoxG(along ? q[2] + 0.1 : 0.42, 0.1, along ? 0.42 : q[2] + 0.1), q[0] - (i === 2 ? 0.15 : i === 3 ? -0.15 : 0), 0.95, q[1] - (i === 0 ? 0.15 : i === 1 ? -0.15 : 0));
});
if (!lite && S.rooftop) {
var rt = kitPick(S.rooftop, r());
if (rt === "tank") {
kitAddF(B, F, "metal", kitCol(0x6A6A68), kitCylG(1, 1, 1.8, 10), b.w * 0.2, 1.0, -b.d * 0.2);
}
else if (rt === "vent") {
kitAddF(B, F, "metal", kitCol(0x8A8C90), kitBoxG(1.2, 0.9, 1.2), -b.w * 0.2, 0.5, b.d * 0.15);
kitAddF(B, F, "metal", kitCol(0x8A8C90), kitCylG(0.25, 0.25, 1.4, 8), b.w * 0.15, 0.7, b.d * 0.2);
}
else if (rt === "garden") {
for (var gq = 0; gq < 4; gq++)
kitAddF(B, F, "leafy", kitCol(0x4A7A34, 0.9 + gq * 0.05), kitBallG(0.7, 1), (gq - 1.5) * b.w * 0.18, 0.6, b.d * 0.1 * (gq % 2 ? 1 : -1));
}
else if (rt === "dish") {
var dg = new THREE.SphereGeometry(1.1, 10, 5, 0, Math.PI * 2, 0, Math.PI / 3);
kitAddF(B, F, "metal", kitCol(0xD8D8D4), dg, 0, 1.6, 0, 0, -0.9, 0);
kitAddF(B, F, "metal", kitCol(0x8A8C90), kitCylG(0.1, 0.12, 1.2, 6), 0, 0.6, 0);
}
else if (rt === "solar") {
for (var sp = 0; sp < 3; sp++)
kitAddF(B, F, "plain", kitCol(0x1E2A44), kitBoxG(1.6, 0.05, 1.0), (sp - 1) * 1.8, 0.7, 0, 0, -0.4, 0);
}
}
}
},
function (B, S, F, lx, ly, lz, ry, roofC, rk, wallC) {
var D = { x: 0, y: 0, z: 0, ry: 0 }, c = Math.cos(F.ry), s = Math.sin(F.ry);
D.x = F.x + lx * c + lz * s;
D.y = F.y + ly;
D.z = F.z - lx * s + lz * c;
D.ry = F.ry + ry;
kitAddF(B, D, "plain", wallC, kitBoxG(1.1, 1.2, 1.0), 0, 0.6, 0);
kitAddF(B, D, rk, roofC, kitGableG(1.4, 0.6, 1.3), 0, 1.2, 0, Math.PI / 2);
kitAddF(B, D, "pane", kitCol(S.pal.glass), new THREE.PlaneGeometry(0.6, 0.7), 0.551, 0.6, 0, Math.PI / 2);
kitAddF(B, D, "lit", kitCol(S.pal.lit, 0.9), new THREE.PlaneGeometry(0.5, 0.6), 0.556, 0.6, 0, Math.PI / 2);
},
function (W, b) {
if (!W.ground)
return false;
var c = Math.cos(b.ry), s = Math.sin(b.ry), hits = 0;
function gy(x, z) { try {
var y = W.ground(x, z, b.top + 2.5);
return y != null && isFinite(y) ? y : -1e9;
}
catch (e) {
return -1e9;
} }
var sides = [[b.w / 2 + 1.2, 0], [-b.w / 2 - 1.2, 0], [0, b.d / 2 + 1.2], [0, -b.d / 2 - 1.2]];
for (var i = 0; i < 4; i++) {
var lx = sides[i][0], lz = sides[i][1], x = b.x + lx * c + lz * s, z = b.z - lx * s + lz * c;
if (gy(x, z) > b.top - 1.2)
hits++;
}
if (hits >= 1)
return true;
if (Math.min(b.w, b.d) < 3.2 && Math.max(b.w, b.d) > 4 * Math.min(b.w, b.d))
return true;
return false;
},
function (W, S, A, B, all) {
var R = A.r, list = [];
all.forEach(function (it) { var b = it.blk; if (!b)
return; if (Math.hypot(b.x - A.x, b.z - A.z) > R + Math.max(b.w, b.d) / 2)
return; if (it.kitDone)
return; list.push(it); });
list.sort(function (a, b) { return Math.hypot(a.blk.x - A.x, a.blk.z - A.z) - Math.hypot(b.blk.x - A.x, b.blk.z - A.z); });
var cap = kitLite() ? 16 : 44, n = 0;
KSW.winBudget = kitLite() ? 140 : 520;
for (var i = 0; i < list.length && n < cap; i++) {
var it = list[i], b = it.blk, hw = Math.max(b.w, b.d) / 2;
var covered = kitNear(A.space, b.x - hw, b.x + hw, b.z - hw, b.z + hw, function (o) {
if (o === it)
return false;
var ob = o.b;
if (ob.min.y < b.top - 1.2 || ob.max.y < b.top + 0.3)
return false;
var ox = (ob.min.x + ob.max.x) / 2 - W.base, oz = (ob.min.z + ob.max.z) / 2;
return Math.abs(ox - b.x) < hw * 0.75 && Math.abs(oz - b.z) < hw * 0.75;
});
var small = 0;
kitNear(A.space, b.x - hw - 1, b.x + hw + 1, b.z - hw - 1, b.z + hw + 1, function (o) {
if (o === it)
return false;
var ob = o.b, sx = ob.max.x - ob.min.x, sy = ob.max.y - ob.min.y, sz = ob.max.z - ob.min.z;
if (Math.max(sx, sy, sz) > 3.2 || ob.min.y < b.y + 0.5 || ob.max.y > b.top + 0.2)
return false;
var ox = (ob.min.x + ob.max.x) / 2 - W.base, oz = (ob.min.z + ob.max.z) / 2, dx = ox - b.x, dz = oz - b.z, c = Math.cos(-b.ry), s = Math.sin(-b.ry), ax = Math.abs(dx * c + dz * s), az = Math.abs(-dx * s + dz * c);
var nearX = Math.abs(ax - b.w / 2) < 0.7 && az < b.d / 2 + 0.3, nearZ = Math.abs(az - b.d / 2) < 0.7 && ax < b.w / 2 + 0.3;
if (nearX || nearZ)
small++;
return small >= 3;
});
var gy = b.y;
try {
if (W.ground) {
var g0 = W.ground(b.x + (Math.cos(b.ry) * 0 + Math.sin(b.ry)) * (b.d / 2 + 1.5), b.z + Math.cos(b.ry) * (b.d / 2 + 1.5), b.y + 2);
if (g0 != null && isFinite(g0))
gy = Math.min(gy, g0);
}
}
catch (e) { }
if (b.y > gy + 12 && !covered)
continue;
if (kitRetaining(W, b)) {
it.kitDone = 1;
continue;
}
try {
kitDressBlock(B, S, A, b, { covered: covered, hasWin: small >= 3, gy: gy });
it.kitDone = 1;
n++;
}
catch (e) {
if (window.console)
console.warn("[kit] block", e);
}
}
A.blocks = n;
return n;
},
function (E) {
var sun = (E.sun !== undefined ? E.sun : 0.8) * kitLum(E.sunCol || 0xFFF4E2), sky = (E.hemi !== undefined ? E.hemi : 0.7) * kitLum(E.hemiCol || 0xCFDCEA);
var n = Math.max(0, Math.min(1, (1.0 - (sun + sky)) / 0.6));
if (E.top !== undefined && kitLum(E.top) < 0.07)
n = Math.max(n, (E.stars || 0) > 0.3 ? 0.85 : 0.6);
return n;
},
function (E, S) {
if (!E || !S || !S.light)
return E;
var c = KSW.lc, P0 = camera.position, cell = Math.round(P0.x / 40) + "," + Math.round(P0.z / 40);
if (c && c.E === E && c.S === S && c.cell === cell && c.top === E.top && c.hemi === E.hemi && c.sun === E.sun)
return c.F;
var F0 = kitLightE0(E, S);
KSW.lc = { E: E, S: S, cell: cell, top: E.top, hemi: E.hemi, sun: E.sun, F: F0 };
return F0;
},
function (E, S) {
var W = WLD.w, P = camera.position, lx = W ? P.x - W.base : 0, near = false;
(S.areas || []).forEach(function (a) { if (Math.hypot(lx - a[0], P.z - a[1]) < (a[2] || S.radius || 70) + 120)
near = true; });
if (!near)
return E;
var L = S.light, n = kitNightOf(E), F = {}, k;
for (k in E)
F[k] = E[k];
KSW.night = n;
var sky = (F.hemi !== undefined ? F.hemi : 0.7) * kitLum(F.hemiCol || 0xCFDCEA), sun = (F.sun !== undefined ? F.sun : 0.8) * kitLum(F.sunCol || 0xFFF4E2), tot = sky + sun;
if (n > 0.15 && tot < L.floor) {
var fl = kitLum(L.fill) || 0.5, add = (L.floor - tot);
var cur = new THREE.Color(F.hemiCol || 0xCFDCEA), fc = new THREE.Color(L.fill), mix = Math.min(1, add / Math.max(0.05, L.floor));
cur.lerp(fc, mix * 0.8);
F.hemiCol = cur.getHex();
F.hemi = (F.hemi !== undefined ? F.hemi : 0.7) + add * 0.8 / fl;
if ((F.sun || 0) < 0.22) {
F.sun = Math.max(F.sun || 0, 0.22);
F.sunCol = L.moon || 0xB8C8F0;
}
if (F.hemiGround === undefined || kitLum(F.hemiGround) < 0.08)
F.hemiGround = L.ground || 0x2A2C34;
}
if (n > 0.15) {
if (F.fog !== undefined)
F.fog = kitHexL(F.fog, L.fogL);
else if (F.low !== undefined)
F.fog = kitHexL(F.low, L.fogL);
if (F.low !== undefined)
F.low = kitHexL(F.low, L.fogL * 0.9);
if (F.top !== undefined)
F.top = kitHexL(F.top, L.fogL * 0.5);
}
else if (L.day && (F.sun || 0) < L.day && (F.hemi || 0) > 0.75) {
var lift = L.day - (F.sun || 0);
F.sun = L.day;
F.hemi = Math.max(0.55, (F.hemi || 0.7) - lift * 0.5);
}
return F;
},
function (W, A, x, z) {
var near = A.y + 2.5;
if (W.ground) {
try {
var y = W.ground(x, z, near);
if (y != null && isFinite(y) && y > -500)
return y;
}
catch (e) { }
}
if (!A.rayList)
return null;
KIT_O.set(W.base + x, near + 1.5, z);
KIT_RC.set(KIT_O, KIT_DN);
KIT_RC.far = 40;
var h = KIT_RC.intersectObjects(A.rayList, false);
return h.length ? h[0].point.y : null;
},
function (W, A, x, z, y, rr) {
if (W.block) {
try {
for (var a = 0; a < 5; a++) {
var px = a ? x + Math.cos(a * 1.57) * rr : x, pz = a ? z + Math.sin(a * 1.57) * rr : z;
if (W.block(px, pz, y + 0.2))
return false;
}
}
catch (e) { }
}
if (A.clear && A.clear(x, z, rr))
return false;
if (typeof GR !== "undefined" && GR.drifts && A.key && /^gr_/.test(A.key))
for (var dq = 0; dq < GR.drifts.length; dq++) {
var df = GR.drifts[dq];
if ((x - df[0]) * (x - df[0]) + (z - df[1]) * (z - df[1]) < (df[2] + rr) * (df[2] + rr))
return false;
}
var pad = A.pad != null ? A.pad : 0.6;
if (A.foot)
for (var i = 0; i < A.foot.length; i++) {
var b = A.foot[i], dx = x - b.x, dz = z - b.z, c = Math.cos(-b.ry), s = Math.sin(-b.ry), ax = dx * c + dz * s, az = -dx * s + dz * c;
if (Math.abs(ax) < b.w / 2 + rr + pad && Math.abs(az) < b.d / 2 + rr + pad)
return false;
}
if (A.used)
for (var j = 0; j < A.used.length; j++) {
var u = A.used[j];
if ((x - u[0]) * (x - u[0]) + (z - u[1]) * (z - u[1]) < (u[2] + rr) * (u[2] + rr))
return false;
}
if (A.keep) {
var kx = x - A.keep.x, kz = z - A.keep.z;
if (kx * kx + kz * kz < (A.keep.r + rr) * (A.keep.r + rr))
return false;
}
return true;
},
function () {
if (KIT_SC._patch)
return KIT_SC._patch;
var pc = document.createElement("canvas");
pc.width = pc.height = 64;
var px = pc.getContext("2d"), gr = px.createRadialGradient(32, 32, 2, 32, 32, 31);
gr.addColorStop(0, "rgba(255,255,255,0.95)");
gr.addColorStop(0.5, "rgba(255,255,255,0.6)");
gr.addColorStop(1, "rgba(255,255,255,0)");
px.fillStyle = gr;
px.fillRect(0, 0, 64, 64);
px.globalCompositeOperation = "destination-out";
for (var q = 0; q < 70; q++) {
var a2 = q * 2.39996, rr2 = 10 + ((q * 37) % 22);
px.fillStyle = "rgba(0,0,0," + (0.25 + ((q * 13) % 10) / 20) + ")";
px.beginPath();
px.arc(32 + Math.cos(a2) * rr2, 32 + Math.sin(a2) * rr2, 2 + (q % 4), 0, 6.3);
px.fill();
}
return (KIT_SC._patch = new THREE.CanvasTexture(pc));
},
function (kind) {
if (KIT_SC[kind])
return KIT_SC[kind];
var g, m, lam = function (o) { var q = new THREE.MeshLambertMaterial(o || {}); q.name = "kit-i"; return q; };
switch (kind) {
case "puddle":
g = new THREE.PlaneGeometry(2, 2);
g.rotateX(-Math.PI / 2);
m = new THREE.MeshPhongMaterial({ map: kitPatchTex(), shininess: 120, specular: 0x6A7684, transparent: true, opacity: 0.8, depthWrite: false });
m.name = "kit-i";
m.polygonOffset = true;
m.polygonOffsetFactor = -2;
break;
case "dust":
case "moss":
case "grime": {
g = new THREE.PlaneGeometry(2, 2);
g.rotateX(-Math.PI / 2);
m = lam({ map: kitPatchTex(), transparent: true, opacity: kind === "grime" ? 0.45 : 0.55, depthWrite: false });
m.polygonOffset = true;
m.polygonOffsetFactor = -1;
break;
}
case "setts":
g = new THREE.BoxGeometry(0.24, 0.08, 0.17);
m = lam({ map: typeof texOf === "function" ? texOf("stone") : null });
break;
case "pebble":
case "shell":
g = new THREE.IcosahedronGeometry(0.07, 0);
m = lam();
break;
case "rock":
case "stones":
g = new THREE.IcosahedronGeometry(0.4, 1);
var q = g.attributes.position;
for (var j = 0; j < q.count; j++) {
var s = 0.82 + 0.3 * Math.abs(Math.sin(q.getX(j) * 9 + q.getZ(j) * 7));
q.setXYZ(j, q.getX(j) * s, q.getY(j) * s * 0.7, q.getZ(j) * s);
}
g.computeVertexNormals();
m = lam({ map: typeof texOf === "function" ? texOf("stone") : null });
break;
case "leaf":
case "petal": {
var lv = [];
for (var l = 0; l < 8; l++) {
var p0 = new THREE.PlaneGeometry(0.13, 0.08);
p0.rotateX(-Math.PI / 2 + Math.sin(l * 1.9) * 0.25);
p0.rotateY(l * 1.3);
p0.translate(Math.cos(l * 2.4) * 0.25 * (0.3 + l / 8), 0.004 * l, Math.sin(l * 2.4) * 0.25 * (0.3 + l / 8));
lv.push(p0);
}
g = kitMergeG(lv);
m = lam({ side: THREE.DoubleSide });
break;
}
case "straw": {
var parts = [];
for (var st = 0; st < 9; st++) {
var b0 = new THREE.BoxGeometry(0.5, 0.014, 0.03);
b0.rotateY(st * 0.7 + Math.sin(st * 3.1) * 0.6);
b0.translate(Math.cos(st * 2.4) * 0.18, 0.01 + st * 0.004, Math.sin(st * 2.4) * 0.18);
parts.push(b0);
}
g = kitMergeG(parts);
m = lam();
break;
}
case "tuft":
case "weed":
case "flower": {
var a = new THREE.PlaneGeometry(0.42, 0.36), b = a.clone();
a.translate(0, 0.18, 0);
b.translate(0, 0.18, 0);
b.rotateY(Math.PI / 2);
var c3 = a.clone();
c3.rotateY(Math.PI / 4);
g = kitMergeG([a, b, c3]);
var tc = document.createElement("canvas");
tc.width = 64;
tc.height = 64;
var x = tc.getContext("2d");
for (var bl = 0; bl < 26; bl++) {
var bx = 4 + Math.random() * 56, h2 = 30 + Math.random() * 32;
x.strokeStyle = "rgba(255,255,255," + (0.75 + Math.random() * 0.25) + ")";
x.lineWidth = 2;
x.beginPath();
x.moveTo(bx, 64);
x.quadraticCurveTo(bx + (Math.random() - 0.5) * 14, 64 - h2 * 0.6, bx + (Math.random() - 0.5) * 20, 64 - h2);
x.stroke();
}
if (kind === "flower") {
for (var fl = 0; fl < 6; fl++) {
x.fillStyle = "rgba(255,255,255,1)";
x.beginPath();
x.arc(8 + Math.random() * 48, 6 + Math.random() * 24, 3.5, 0, 6.3);
x.fill();
}
}
var t = new THREE.CanvasTexture(tc);
m = lam({ map: t, alphaTest: 0.4, side: THREE.DoubleSide, transparent: false });
break;
}
case "drift":
g = new THREE.SphereGeometry(1, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2);
m = lam({ map: typeof texOf === "function" ? texOf("snow") : null });
break;
case "scrap":
g = new THREE.BoxGeometry(0.4, 0.12, 0.25);
m = lam({ map: typeof texOf === "function" ? texOf("metal") : null });
break;
case "cable":
case "pipe":
g = new THREE.CylinderGeometry(0.05, 0.05, 1, 6);
g.rotateZ(Math.PI / 2);
m = lam();
break;
default:
g = new THREE.IcosahedronGeometry(0.08, 0);
m = lam();
}
g.userData.shared = true;
KIT_SC[kind] = { g: g, m: m };
return KIT_SC[kind];
},
function (list) {
var n = 0;
list.forEach(function (g) { n += g.index ? g.index.count : g.attributes.position.count; });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
list.forEach(function (g) { var q = g.index ? g.toNonIndexed() : g, c = q.attributes.position.count; P.set(q.attributes.position.array, o * 3); N.set(q.attributes.normal.array, o * 3); U.set(q.attributes.uv.array, o * 2); o += c; });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
G.setAttribute("uv", new THREE.BufferAttribute(U, 2));
return G;
},
function (S, kind, r) {
var o = S.scc && S.scc[kind];
if (o)
return kitPick(o, r);
switch (kind) {
case "puddle": return 0x2A323C;
case "setts": return [0x6A6A66, 0x7A766E, 0x5A5A58][(r * 3) | 0];
case "pebble": return [0x8A847A, 0x6E6A62, 0x9A9488][(r * 3) | 0];
case "shell": return 0xE8E0D0;
case "rock":
case "stones": return [0x7A766E, 0x8A847A, 0x6A665E][(r * 3) | 0];
case "leaf": return [0x8A5A22, 0xA87A2A, 0x6A4A1E, 0x5A6A2A][(r * 4) | 0];
case "petal": return [0xF0B8C8, 0xF8E0E8, 0xE890A8][(r * 3) | 0];
case "straw": return [0xC8A858, 0xB8964A, 0xD8BC70][(r * 3) | 0];
case "tuft":
case "weed": return [0x5A7A34, 0x4A6A2C, 0x7A8A44][(r * 3) | 0];
case "flower": return [0xE8D040, 0xE8E0F0, 0xC85A8A, 0x8A6AD8][(r * 4) | 0];
case "dust": return [0x9A8A70, 0x7A6A54][(r * 2) | 0];
case "moss": return 0x3E5A2A;
case "grime": return 0x2A2622;
case "drift": return 0xEEF2F6;
case "scrap": return [0x6A6E74, 0x8A5A3A, 0x4A4E54][(r * 3) | 0];
case "cable":
case "pipe": return [0x2A2A2E, 0x3A3A40][(r * 2) | 0];
}
return 0x808080;
},
function (W, S, A, kind, n, P) {
var r = kitRand(A.seed * 31 + kind.length * 7 + n), list = [], tries = n * 3;
for (var t = 0; t < tries && list.length < n; t++) {
var a = r() * 6.283, d = Math.sqrt(r()) * A.r, x = A.x + Math.cos(a) * d, z = A.z + Math.sin(a) * d, y = kitGroundY(W, A, x, z);
if (y == null || Math.abs(y - A.y) > 4)
continue;
var big = kind === "puddle" || kind === "rock" || kind === "drift" || kind === "dust" || kind === "moss";
var rr = kind === "rock" ? 0.6 : kind === "puddle" ? 0.8 : 0.2;
if (!kitFree(W, { block: W.block, foot: A.foot, keep: big ? A.keep : null }, x, z, y, rr) && !(kind === "puddle" || kind === "leaf" || kind === "setts" || kind === "straw" || kind === "dust"))
continue;
if (A.foot && !kitFree(W, { foot: A.foot }, x, z, y, 0.05))
continue;
var c = kitScCol(S, kind, r()), it = { x: x, y: y, z: z, ry: r() * 6.283, c: c };
switch (kind) {
case "puddle":
it.sx = 0.5 + r() * 1.0;
it.sz = 0.4 + r() * 0.7;
it.sy = 1;
it.y += 0.025;
break;
case "dust":
case "moss":
it.sx = 1.6 + r() * 3.4;
it.sz = 1.2 + r() * 2.6;
it.y += 0.018;
break;
case "setts":
it.y += 0.03;
it.rx = (r() - 0.5) * 0.15;
break;
case "pebble":
case "shell":
it.sx = 0.6 + r() * 1.4;
it.sy = 0.5;
it.sz = 0.6 + r() * 1.2;
it.y += 0.02;
break;
case "rock":
var s = 0.4 + r() * 1.4;
it.sx = s;
it.sy = s * (0.7 + r() * 0.4);
it.sz = s * (0.8 + r() * 0.4);
it.y -= s * 0.1;
break;
case "leaf":
case "petal":
it.y += 0.02 + r() * 0.01;
it.rx = (r() - 0.5) * 0.3;
it.sx = it.sz = 1.1 + r() * 0.6;
break;
case "straw":
it.y += 0.012;
it.sx = it.sz = 1 + r() * 1.2;
break;
case "tuft":
case "flower":
var s2 = 0.7 + r() * 0.9;
it.sx = it.sz = s2;
it.sy = s2 * (0.8 + r() * 0.5);
break;
case "drift":
it.sx = 0.8 + r() * 2;
it.sz = 0.6 + r() * 1.4;
it.sy = 0.2 + r() * 0.3;
break;
case "scrap":
it.y += 0.06;
it.rz = (r() - 0.5) * 0.4;
break;
case "cable":
it.sx = 1.5 + r() * 3;
it.y += 0.05;
break;
}
list.push(it);
}
var sh = kitScShape(kind);
var M = kitInst(P, sh.g, sh.m, list);
if (M)
KSW.stat.scatter += list.length;
return M;
},
function (W, S, A, P) {
if (!S.edge || !A.foot || !A.foot.length)
return;
var lite = kitLite(), by = {};
A.foot.forEach(function (b, bi) {
if (b.y > A.y + 1.5)
return;
kitFaces(b).forEach(function (f, fi) {
var r = kitRand(bi * 17 + fi * 5 + A.seed), ax = Math.cos(f.ry), az = -Math.sin(f.ry);
S.edge.forEach(function (e) {
var kind = e[0], dens = e[1] * (lite ? 0.4 : 1), step = kind === "pipe" ? f.len : 1.1, n = Math.floor(f.len / step);
for (var i = 0; i < n; i++) {
if (r() > dens)
continue;
var t = -f.len / 2 + step * (i + 0.5) + (r() - 0.5) * 0.5, off = kind === "grime" || kind === "drift" ? 0.3 : 0.25 + r() * 0.25;
var x = f.x + ax * t + f.nx * off, z = f.z + az * t + f.nz * off, y = kitGroundY(W, A, x, z);
if (y == null || Math.abs(y - b.y) > 1.2)
continue;
var real = kind === "weed" ? "tuft" : kind === "stones" ? "rock" : kind;
var it = { x: x, y: y, z: z, ry: r() * 6.28, c: kitScCol(S, kind, r()) };
if (kind === "weed") {
it.sx = it.sz = 0.5 + r() * 0.6;
it.sy = 0.5 + r() * 0.8;
}
else if (kind === "moss" || kind === "grime" || kind === "dust") {
it.ry = f.ry;
it.sx = 0.45 + r() * 0.3;
it.sz = 0.9 + r() * 0.8;
it.y += 0.02;
}
else if (kind === "drift") {
it.ry = f.ry;
it.sx = 0.6 + r() * 0.6;
it.sz = 1.0 + r() * 0.9;
it.sy = 0.25 + r() * 0.4;
}
else if (kind === "stones") {
var s = 0.25 + r() * 0.3;
it.sx = it.sy = it.sz = s;
}
else if (kind === "pipe") {
it.ry = f.ry + Math.PI / 2;
it.sx = f.len * 0.95;
it.y += 0.3;
it.x = f.x + f.nx * 0.15;
it.z = f.z + f.nz * 0.15;
}
(by[real] || (by[real] = [])).push(it);
}
});
});
});
Object.keys(by).forEach(function (k) { var sh = kitScShape(k); if (kitInst(P, sh.g, sh.m, by[k]))
KSW.stat.scatter += by[k].length; });
},
function (W, S, A, P) {
if (!S.scatter)
return;
var lite = kitLite(), area = Math.PI * A.r * A.r, k = lite ? 0.35 : 1;
(S.ground || []).forEach(function (g) { var n = Math.round(area / 100 * g[1] * k * (g[0] === "puddle" || g[0] === "rock" || g[0] === "dust" || g[0] === "drift" ? 0.45 : g[0] === "tuft" || g[0] === "flower" ? 2.2 : 1.5)); n = Math.min(n, lite ? 180 : 600); if (n > 0)
kitScatter(W, S, A, g[0], n, P); });
kitEdges(W, S, A, P);
},
function (W, S) {
var L = S.floorLift;
if (!L || !W.g || W.g.userData.kitLift)
return;
W.g.userData.kitLift = 1;
var vary = (L.vary || []).map(function (c) { return new THREE.Color(c); }), C = new THREE.Color();
W.g.traverse(function (m) {
if (!m.isMesh || !m.geometry || m.isInstancedMesh || (m.name && /^kit-/.test(m.name)))
return;
var g = m.geometry;
if (!g.boundingBox)
g.computeBoundingBox();
var bb = g.boundingBox;
if ((bb.max.x - bb.min.x) < 300 || (bb.max.z - bb.min.z) < 300)
return;
var ca = g.attributes.color, pa = g.attributes.position;
if (ca && pa) {
for (var i = 0; i < ca.count; i++) {
var x = pa.getX(i), z = pa.getZ(i), n = kitNoise(x, z), n2 = kitNoise(z * 1.7 + 300, x * 1.7 - 120);
C.setRGB(ca.getX(i) * L.mul, ca.getY(i) * L.mul, ca.getZ(i) * L.mul);
if (vary.length) {
var v = vary[Math.min(vary.length - 1, Math.floor(n2 * vary.length))];
C.lerp(v, (L.mix || 0.35) * n);
}
ca.setXYZ(i, Math.min(1, C.r), Math.min(1, C.g), Math.min(1, C.b));
}
ca.needsUpdate = true;
KSW.stat.lifted = (KSW.stat.lifted || 0) + 1;
}
else if (m.material && !Array.isArray(m.material) && m.material.color) {
m.material = m.material.clone();
m.material.color.multiplyScalar(L.mul);
KSW.stat.lifted = (KSW.stat.lifted || 0) + 1;
}
});
},
function (B, S, F, r) {
var w = kitCol(S.pal.wood, 0.85 + r() * 0.2), band = kitCol(S.pal.metal);
var n = 1 + ((r() * 3) | 0);
for (var i = 0; i < n; i++) {
var bx = (i % 2) * 0.72 - 0.3, bz = (i > 1 ? 0.7 : 0);
kitAddF(B, F, "wood", w, kitCylG(0.33, 0.3, 0.92, kitLite() ? 8 : 12), bx, 0.46, bz);
if (!kitLite())
[0.14, 0.78].forEach(function (h) { kitAddF(B, F, "metal", band, kitCylG(0.345, 0.335, 0.05, 10), bx, h, bz); });
}
return n > 1 ? 0.9 : 0.4;
},
function (B, S, F, r) {
var w = kitCol(S.pal.crate || S.pal.wood, 0.9 + r() * 0.2), k = S.mat.crate || "wood";
kitAddF(B, F, k, w, kitBoxG(0.7, 0.6, 0.6), 0, 0.3, 0);
kitAddF(B, F, k, w.clone().multiplyScalar(0.92), kitBoxG(0.6, 0.5, 0.55), 0.7, 0.25, 0.05, 0.2);
if (r() < 0.6)
kitAddF(B, F, k, w, kitBoxG(0.55, 0.5, 0.5), 0.1, 0.85, 0.02, 0.3);
if (r() < 0.5) {
var gd = S.pal.goods;
for (var q = 0; q < 5; q++)
kitAddF(B, F, "plain", kitCol(kitPick(gd, r())), kitBallG(0.08, 0), -0.2 + q * 0.1, 0.66, 0.08 * (q % 2));
}
return 0.8;
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood), m = kitCol(S.pal.metal), stone = S.bench === "stone";
if (stone) {
kitAddF(B, F, "stone", kitCol(S.pal.trim), kitBoxG(1.9, 0.12, 0.5), 0, 0.45, 0);
[-0.7, 0.7].forEach(function (e) { kitAddF(B, F, "stone", kitCol(S.pal.trim, 0.85), kitBoxG(0.25, 0.4, 0.42), e, 0.2, 0); });
return 1;
}
[-0.85, 0.85].forEach(function (e) { kitAddF(B, F, "metal", m, kitBoxG(0.06, 0.45, 0.5), e, 0.22, 0); kitAddF(B, F, "metal", m, kitBoxG(0.06, 0.5, 0.06), e, 0.7, -0.24); });
for (var i = 0; i < (kitLite() ? 2 : 4); i++)
kitAddF(B, F, "wood", wd, kitBoxG(1.9, 0.04, 0.11), 0, 0.47, -0.18 + i * 0.12);
for (var j = 0; j < (kitLite() ? 1 : 2); j++)
kitAddF(B, F, "wood", wd, kitBoxG(1.9, 0.1, 0.03), 0, 0.66 + j * 0.15, -0.27);
return 1;
},
function (B, S, F, r) {
var wood = kitCol(S.pal.wood), w = 2.6 + r() * 0.8, cv = kitPick(S.pal.canvas, r()), lite = kitLite();
kitAddF(B, F, "wood", wood, kitBoxG(w, 0.9, 0.85), 0, 0.45, 0.3);
kitAddF(B, F, "wood", wood.clone().multiplyScalar(1.15), kitBoxG(w + 0.1, 0.05, 0.95), 0, 0.92, 0.3);
[[-w / 2, -0.55], [w / 2, -0.55], [-w / 2, 0.75], [w / 2, 0.75]].forEach(function (p) { kitAddF(B, F, "wood", wood, kitBoxG(0.08, 2.4, 0.08), p[0], 1.2, p[1]); });
var n = lite ? 4 : 8, tilt = 0.3;
for (var i = 0; i < n; i++)
kitAddF(B, F, "plain", kitCol(i % 2 ? cv[1] : cv[0]), kitBoxG((w + 0.4) / n, 0.03, 1.8), -(w + 0.4) / 2 + (w + 0.4) / n * (i + 0.5), 2.45, 0.12, 0, tilt);
if (!lite)
for (var v = 0; v < n; v++)
kitAddF(B, F, "plain", kitCol(v % 2 ? cv[1] : cv[0]), kitBoxG((w + 0.4) / n, 0.28, 0.02), -(w + 0.4) / 2 + (w + 0.4) / n * (v + 0.5), 2.07, 0.97);
var gd = S.pal.goods;
for (var g = 0; g < (lite ? 3 : 6); g++) {
var gx = -w / 2 + 0.3 + g * (w - 0.6) / 5;
kitAddF(B, F, "wood", kitCol(0x8A6A42), kitBoxG(0.4, 0.1, 0.3), gx, 1.0, 0.35);
for (var q = 0; q < (lite ? 1 : 3); q++)
kitAddF(B, F, "plain", kitCol(kitPick(gd, r())), kitBallG(0.075, 0), gx - 0.1 + q * 0.1, 1.1, 0.35);
}
return Math.max(1.5, w / 2 + 0.3);
},
function (B, S, F, r) {
var wood = kitCol(S.pal.wood, 0.9 + r() * 0.15), dk = kitCol(0x2A1E14), lite = kitLite();
kitAddF(B, F, "wood", wood, kitBoxG(1.4, 0.12, 2.4), 0, 0.85, 0);
[-0.7, 0.7].forEach(function (sx) { kitAddF(B, F, "wood", wood, kitBoxG(0.06, 0.4, 2.4), sx, 1.1, 0); });
kitAddF(B, F, "wood", wood, kitBoxG(1.4, 0.4, 0.06), 0, 1.1, -1.2);
[-0.82, 0.82].forEach(function (sx) {
var wh = new THREE.TorusGeometry(0.55, 0.05, 4, lite ? 10 : 16);
wh.rotateY(Math.PI / 2);
kitAddF(B, F, "wood", dk, wh, sx, 0.6, 0.2);
kitAddF(B, F, "wood", dk, kitCylG(0.08, 0.08, 0.14, 6), sx, 0.6, 0.2, 0, 0, Math.PI / 2);
if (!lite)
for (var s = 0; s < 4; s++)
kitAddF(B, F, "wood", dk, kitBoxG(0.03, 1.08, 0.03), sx, 0.6, 0.2, 0, s * Math.PI / 4);
});
[-0.35, 0.35].forEach(function (sx) { kitAddF(B, F, "wood", wood, kitBoxG(0.06, 0.06, 1.9), sx, 0.75, 2.0, 0, 0.18); });
var load = S.cartLoad || "sacks";
var gd = S.pal.goods;
if (load === "hay") {
var hg = kitBoxG(1.3, 0.6, 2.2);
kitAddF(B, F, "thatch", kitCol(0xC8A858), hg, 0, 1.25, 0);
}
else if (load === "barrels") {
for (var b = 0; b < 3; b++)
kitAddF(B, F, "wood", kitCol(S.pal.wood, 0.8), kitCylG(0.3, 0.28, 0.8, 10), 0, 1.3, -0.8 + b * 0.75, 0, Math.PI / 2);
}
else {
for (var k = 0; k < 4; k++) {
var sg = kitBallG(0.3, 1);
sg.scale(1, 0.8, 1.3);
kitAddF(B, F, "plain", kitCol(load === "goods" ? kitPick(gd, r()) : 0xB8A07A), sg, (k % 2) * 0.5 - 0.25, 1.15, -0.6 + (k >> 1) * 0.9);
}
}
return 1.6;
},
function (B, S, F, r) {
var st = kitCol(S.pal.trim, 0.9), wd = kitCol(S.pal.wood);
kitAddF(B, F, "stone", st, kitCylG(0.95, 1.0, 0.85, kitLite() ? 10 : 16), 0, 0.42, 0);
kitAddF(B, F, "plain", kitCol(0x1A2A34), new THREE.CircleGeometry(0.78, 12), 0, 0.84, 0, 0, -Math.PI / 2);
[-0.85, 0.85].forEach(function (sx) { kitAddF(B, F, "wood", wd, kitBoxG(0.12, 2.1, 0.12), sx, 1.05, 0); });
kitAddF(B, F, "wood", wd, kitCylG(0.08, 0.08, 1.9, 6), 0, 1.75, 0, 0, 0, Math.PI / 2);
kitAddF(B, F, S.mat.roof || "tile", kitCol(kitPick(S.pal.roof, r())), kitGableG(2.2, 0.7, 1.4), 0, 2.1, 0);
if (!kitLite())
kitAddF(B, F, "wood", kitCol(S.pal.wood, 0.7), kitCylG(0.18, 0.15, 0.3, 8), 0.2, 1.2, 0);
return 1.1;
},
function (B, S, F, r) {
var st = kitCol(S.pal.trim, 0.92);
kitAddF(B, F, "stone", st, kitBoxG(1.4, 0.55, 1.4), 0, 0.27, 0);
var lc = S.pal.leaf || 0x4A7A34;
if (Array.isArray(lc))
lc = kitPick(lc, r());
var fl = S.pal.flowers || [0xC83A4A, 0xE8C040, 0xE8E0F0];
for (var i = 0; i < (kitLite() ? 2 : 4); i++) {
var b = kitBallG(0.36 + r() * 0.2, 1);
b.scale(1, 0.85, 1);
kitAddF(B, F, "leafy", kitCol(lc, 0.85 + r() * 0.3), b, (r() - 0.5) * 0.7, 0.85, (r() - 0.5) * 0.7);
}
if (!kitLite())
for (var f = 0; f < 4; f++)
kitAddF(B, F, "plain", kitCol(kitPick(fl, r())), kitBallG(0.09, 0), (r() - 0.5) * 0.8, 1.1, (r() - 0.5) * 0.8);
return 0.8;
},
function (B, S, F, r) { var c = kitCol(S.pal.pot || 0xB0603A); for (var i = 0; i < 2 + ((r() * 3) | 0); i++) {
var g = new THREE.SphereGeometry(0.28, 10, 8);
g.scale(1, 1.3, 1);
kitAddF(B, F, "plain", c.clone().multiplyScalar(0.85 + r() * 0.25), g, (i % 2) * 0.6 - 0.3, 0.36, (i >> 1) * 0.6 - 0.2);
kitAddF(B, F, "plain", c, kitCylG(0.12, 0.16, 0.18, 8), (i % 2) * 0.6 - 0.3, 0.78, (i >> 1) * 0.6 - 0.2);
} return 0.8; },
function (B, S, F, r) {
var wd = kitCol(S.pal.wood);
kitAddF(B, F, "wood", wd, kitBoxG(1.6, 0.07, 0.8), 0, 0.76, 0);
[[-0.7, -0.3], [0.7, -0.3], [-0.7, 0.3], [0.7, 0.3]].forEach(function (l) { kitAddF(B, F, "wood", wd, kitBoxG(0.07, 0.74, 0.07), l[0], 0.37, l[1]); });
[-0.75, 0.75].forEach(function (sz) { kitAddF(B, F, "wood", wd.clone().multiplyScalar(0.9), kitBoxG(1.6, 0.06, 0.3), 0, 0.45, sz); });
if (!kitLite()) {
kitAddF(B, F, "plain", kitCol(0xD8D0C0), kitCylG(0.05, 0.04, 0.12, 6), -0.3, 0.85, 0.1);
kitAddF(B, F, "plain", kitCol(0x6A4A2A), kitCylG(0.06, 0.05, 0.16, 6), 0.3, 0.87, -0.1);
}
return 1.1;
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood);
[-2, 2].forEach(function (sx) { kitAddF(B, F, "wood", wd, kitBoxG(0.08, 2.3, 0.08), sx, 1.15, 0); });
kitAddF(B, F, "plain", kitCol(0xD8D0C0), kitBoxG(4, 0.015, 0.015), 0, 2.2, 0);
var cl = S.pal.cloth || [0xE8E4DA, 0xB8C8D8, 0xC8A890, 0xA85A4A];
for (var i = 0; i < 5; i++)
kitAddF(B, F, "plain", kitCol(kitPick(cl, r())), kitBoxG(0.5 + r() * 0.3, 0.6 + r() * 0.4, 0.02), -1.6 + i * 0.8, 1.85, 0);
return 2.1;
},
function (B, S, F, r) {
var st = kitCol(0x6A665E);
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283;
kitAddF(B, F, "stone", st.clone().multiplyScalar(0.8 + r() * 0.3), kitBallG(0.22, 0), Math.cos(a) * 0.65, 0.12, Math.sin(a) * 0.65);
}
kitAddF(B, F, "glow", kitCol(0xFF9A40, 0.9), kitConeG(0.3, 0.5, 6), 0, 0.3, 0);
for (var j = 0; j < 3; j++)
kitAddF(B, F, "wood", kitCol(0x3A2A1A), kitCylG(0.06, 0.06, 0.9, 5), 0, 0.12, 0, j * 1.05, 0, Math.PI / 2);
return 0.9;
},
function (B, S, F, r) { var c = kitCol(kitPick(S.pal.tank || [0xD8D8D4, 0x3A6A8A, 0xC8A040], r())); for (var i = 0; i < 2 + ((r() * 3) | 0); i++) {
kitAddF(B, F, "metal", c, kitCylG(0.25, 0.25, 1.3, 10), (i % 3) * 0.55 - 0.5, 0.65, (i > 2 ? 0.55 : 0));
kitAddF(B, F, "metal", kitCol(0x3A3A40), kitCylG(0.08, 0.1, 0.15, 6), (i % 3) * 0.55 - 0.5, 1.36, (i > 2 ? 0.55 : 0));
} return 0.9; },
function (B, S, F, r) { var cap = kitCol(kitPick(S.pal.cap || [0xC84A3A, 0xE0C8A0, 0x9A6AC8], r())); for (var i = 0; i < 3; i++) {
var h = 0.3 + r() * 0.6;
kitAddF(B, F, "plain", kitCol(0xEAE2D0), kitCylG(0.06, 0.09, h, 6), (i - 1) * 0.35, h / 2, (r() - 0.5) * 0.4);
var c = new THREE.SphereGeometry(0.22 + h * 0.2, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2);
kitAddF(B, F, "plain", cap, c, (i - 1) * 0.35, h, (r() - 0.5) * 0.1);
} return 0.7; },
function (B, S, F, r) {
var wd = kitCol(S.pal.wood);
[-2.5, 2.5].forEach(function (sx) { kitAddF(B, F, "wood", wd, kitBoxG(0.1, 3, 0.1), sx, 1.5, 0); });
kitAddF(B, F, "plain", kitCol(0x3A3A3A), kitBoxG(5, 0.02, 0.02), 0, 2.9, 0);
for (var i = 0; i < 5; i++)
kitAddF(B, F, "glow", kitCol(kitPick(S.pal.lanterns || [0xFFC870, 0xFF9A60, 0xF0E0A0], r())), kitBallG(0.13, 0), -2 + i, 2.75, 0);
return 2.6;
},
function (B, S, F, r) {
var o = kitCol(0xD86A1A), lite = kitLite();
for (var i = 0; i < 3 + ((r() * 3) | 0); i++) {
var s = 0.18 + r() * 0.2, g = kitBallG(s, 1);
g.scale(1.15, 0.8, 1.15);
var px = (r() - 0.5) * 1.2, pz = (r() - 0.5) * 1.2;
kitAddF(B, F, "plain", o.clone().multiplyScalar(0.8 + r() * 0.35), g, px, s * 0.8, pz);
kitAddF(B, F, "wood", kitCol(0x4A5A2A), kitCylG(0.025, 0.035, 0.12, 5), px, s * 1.6 + 0.04, pz);
if (i === 0 && !lite) {
kitAddF(B, F, "glow", kitCol(0xFFB040), new THREE.CircleGeometry(s * 0.35, 3), px, s * 0.9, pz + s * 1.12);
}
}
return 0.8;
},
function (B, S, F, r) {
var m = kitCol(S.pal.metal), g = kitCol(S.lampCol), k = S.lamp, lite = kitLite();
if (k === "torch") {
kitAddF(B, F, "wood", kitCol(S.pal.wood, 0.7), kitCylG(0.06, 0.08, 2.2, 6), 0, 1.1, 0);
kitAddF(B, F, "metal", m, kitCylG(0.14, 0.08, 0.25, 6), 0, 2.25, 0);
kitAddF(B, F, "glow", g, kitConeG(0.12, 0.35, 6), 0, 2.5, 0);
return 0.3;
}
if (k === "brazier") {
kitAddF(B, F, "metal", m, kitCylG(0.05, 0.05, 1.1, 5), 0, 0.55, 0);
kitAddF(B, F, "metal", m, kitCylG(0.4, 0.2, 0.3, 8), 0, 1.2, 0);
kitAddF(B, F, "glow", g, kitConeG(0.32, 0.35, 7), 0, 1.45, 0);
return 0.45;
}
if (k === "stone") {
var st = kitCol(S.pal.trim);
kitAddF(B, F, "stone", st, kitBoxG(0.5, 0.9, 0.5), 0, 0.45, 0);
kitAddF(B, F, "glow", g, kitBoxG(0.36, 0.32, 0.36), 0, 1.06, 0);
kitAddF(B, F, "stone", st, kitConeG(0.48, 0.4, 4), 0, 1.42, 0, Math.PI / 4);
return 0.4;
}
if (k === "orb" || k === "glowpost") {
kitAddF(B, F, "metal", m, kitCylG(0.07, 0.12, k === "orb" ? 3.2 : 1.4, 8), 0, k === "orb" ? 1.6 : 0.7, 0);
kitAddF(B, F, "glow", g, k === "orb" ? kitBallG(0.28, 1) : kitCylG(0.16, 0.16, 0.5, 8), 0, k === "orb" ? 3.4 : 1.6, 0);
return 0.3;
}
var h = k === "gas" ? 3.6 : 3.1;
kitAddF(B, F, "metal", m, kitCylG(0.15, 0.2, 0.45, lite ? 6 : 8), 0, 0.22, 0);
kitAddF(B, F, "metal", m, kitCylG(0.05, 0.08, h, lite ? 6 : 8), 0, h / 2, 0);
if (!lite)
kitAddF(B, F, "metal", m, kitBoxG(0.5, 0.04, 0.04), 0, h - 0.4, 0);
kitAddF(B, F, "metal", m, kitBoxG(0.36, 0.05, 0.36), 0, h + 0.02, 0);
kitAddF(B, F, "glow", g, kitBoxG(0.26, 0.42, 0.26), 0, h + 0.26, 0);
kitAddF(B, F, "metal", m, kitConeG(0.3, 0.26, 4), 0, h + 0.6, 0, Math.PI / 4);
return 0.3;
},
function (W, S, A, P) {
if (typeof wPerson !== "function" || !S.folk)
return;
var lite = kitLite(), n = lite ? Math.min(2, Math.ceil(S.folk.n / 3)) : S.folk.n, r = kitRand(A.seed * 7 + 3), got = 0;
n = Math.min(n, KSW.folkLeft || 0);
if (n <= 0)
return;
var K = (A.keepers || []).slice(0, lite ? 1 : 4);
for (var t = 0; t < n * 6 && got < n; t++) {
var kp = t < K.length ? K[t] : null;
var a = r() * 6.283, d = 6 + r() * Math.min(A.r * 0.5, 26), x = A.x + Math.cos(a) * d, z = A.z + Math.sin(a) * d;
if (A.spots && A.spots.length && t % 2 === 0) {
var cs = A.spots[(r() * A.spots.length) | 0], da = 2 + r() * 1.8;
x = cs[0] + Math.cos(a) * da;
z = cs[1] + Math.sin(a) * da;
if (Math.hypot(x - A.x, z - A.z) < 6)
continue;
}
if (kp) {
x = kp.x;
z = kp.z;
}
var y = kp ? kp.y : kitGroundY(W, A, x, z);
if (!kp && (y == null || Math.abs(y - A.y) > 2.5 || !kitFree(W, A, x, z, y, 0.5)))
continue;
var title = kitPick(S.folk.titles, r()), look = {};
if (S.folk.look)
for (var k in S.folk.look) {
var v = S.folk.look[k];
look[k] = Array.isArray(v) ? kitPick(v, r()) : v;
}
var g = null;
try {
g = wPerson("kit_" + A.key + "_" + A.i + "_" + got, { title: title, place: S.name || "", look: look, sex: r() < 0.5 ? "m" : "f" });
}
catch (e) {
g = null;
}
if (!g)
continue;
g.position.set(x, y, z);
g.rotation.y = kp ? kp.ry : r() * 6.283;
g.name = "kit-person";
g.userData.keep = 1;
delete g.userData.wSeed;
g.userData.kitFolk = 1;
g.traverse(function (m) { m.raycast = function () { }; });
P.add(g);
A.people.push({ g: g, y: y, walk: kp ? false : r() < S.folk.walk });
got++;
KSW.stat.folk++;
KSW.folkLeft--;
A.used.push([x, z, 0.6]);
}
},
function (W, S, A, B) {
if (!S.life)
return;
var lite = kitLite(), r = kitRand(A.seed * 13 + 5), solids = [];
A.pad = 1.6;
function put(kind, x, z, ry, wall) {
var y = kitGroundY(W, A, x, z);
if (y == null || Math.abs(y - A.y) > 2.5)
return false;
var fn = kind === "lamp" ? null : KIT_PROPS[kind];
if (kind !== "lamp" && !fn)
return false;
var rr = kind === "stall" ? 1.7 : kind === "cart" ? 1.7 : kind === "washing" ? 2.1 : kind === "lanternstring" ? 2.6 : kind === "lamp" ? 0.35 : kind === "tree" ? 1.1 : 0.9;
if (wall)
rr = 0.35;
if (Math.hypot(x - A.x, z - A.z) < rr + (wall ? 3.5 : (rr >= 0.85 || kind === "kiosk" ? 8 : 5.5)))
return false;
if (!kitFree(W, A, x, z, y, rr))
return false;
if (rr >= 1.5 && !wall && W.block) {
try {
var y2 = y + 0.2;
for (var q = 0; q < 8; q++) {
var qa = q * 0.785;
if (W.block(x + Math.cos(qa) * (rr + 2.2), z + Math.sin(qa) * (rr + 2.2), y2))
return false;
}
}
catch (e) { }
}
var F = { x: x, y: y, z: z, ry: ry };
var R = kind === "lamp" ? kitLamp(B, S, F, r) : fn(B, S, F, r);
A.used.push([x, z, R]);
KSW.stat.props++;
if (F.keeper) {
var kc = Math.cos(ry), ks = Math.sin(ry);
(A.keepers || (A.keepers = [])).push({ x: x + F.keeper[0] * kc + F.keeper[1] * ks, z: z - F.keeper[0] * ks + F.keeper[1] * kc, y: y, ry: ry });
}
if (kind !== "washing" && kind !== "lanternstring")
solids.push({ x: x, z: z, r: Math.min(R, 1.2) * 0.85, b: y - 0.2, h: kind === "stall" ? 2.6 : 1.4 });
else
[-1, 1].forEach(function (sd) { solids.push({ x: x + Math.cos(ry) * sd * R * 0.95, z: z - Math.sin(ry) * sd * R * 0.95, r: 0.2, b: y - 0.2, h: 2.6 }); });
return true;
}
var nl = lite ? 3 : Math.max(4, Math.round(A.r / 9));
for (var i = 0; i < nl; i++) {
for (var tr = 0; tr < 6; tr++) {
var a = i / nl * 6.283 + r() * 0.4, d = A.r * (0.35 + r() * 0.4);
if (put("lamp", A.x + Math.cos(a) * d, A.z + Math.sin(a) * d, 0))
break;
}
}
var mid = S.mid || "stall", nm = lite ? 2 : 5 + ((r() * 3) | 0), ring = 9 + r() * 4, a0 = r() * 6.283;
for (var m = 0; m < nm; m++) {
for (var tr2 = 0; tr2 < 5; tr2++) {
var am = a0 + m / nm * 6.283 + tr2 * 0.3, x = A.x + Math.cos(am) * (ring + tr2 * 1.5), z = A.z + Math.sin(am) * (ring + tr2 * 1.5);
if (put(m % 2 && S.mid2 ? S.mid2 : mid, x, z, Math.atan2(A.x - x, A.z - z)))
break;
}
}
var np = lite ? 6 : 20;
for (var p = 0; p < np; p++) {
var kind = kitWeighted(S.props, r());
for (var tr3 = 0; tr3 < 4; tr3++) {
var ap = r() * 6.283, dp = A.r * (0.15 + r() * 0.75), xp = A.x + Math.cos(ap) * dp, zp = A.z + Math.sin(ap) * dp;
if (put(kind, xp, zp, r() * 6.283))
break;
}
}
if (typeof kitFillArea === "function") {
try {
kitFillArea(W, S, A, B, put, r, solids);
}
catch (e) {
if (window.console)
console.warn("[kit] fill", e);
}
}
A.pad = null;
if (solids.length && typeof sswAdd === "function" && typeof sswHook === "function") {
try {
sswHook(W);
solids.forEach(function (s) { sswAdd(W, s); });
}
catch (e) { }
}
},
function (B, S, F, r) {
var T = S.tree || "broad", lite = kitLite(), L = kitLeafCols(S), bark = kitCol(S.pal.bark || 0x5A4634, 0.85 + r() * 0.25), det = lite ? 0 : 1, sc = 0.8 + r() * 0.5;
var leaf = function (k) { return kitCol(kitPick(L, r()), 0.85 + r() * 0.3); };
if (T === "conifer") {
var h = 6 * sc;
kitAddF(B, F, "wood", bark, kitCylG(0.12 * sc, 0.24 * sc, h * 0.5, 6), 0, h * 0.25, 0);
for (var i = 0; i < (lite ? 2 : 4); i++) {
var t = i / (lite ? 2 : 4);
kitAddF(B, F, "leafy", leaf(), kitConeG((1.9 - t * 1.3) * sc, 2.4 * sc, lite ? 6 : 8), 0, h * 0.3 + t * h * 0.62, 0, r());
}
return 0.9;
}
if (T === "cypress") {
var hc = 7 * sc;
kitAddF(B, F, "wood", bark, kitCylG(0.1, 0.16, 1.2, 6), 0, 0.6, 0);
var gc = kitBallG(1, det);
gc.scale(0.9 * sc, hc * 0.5, 0.9 * sc);
kitAddF(B, F, "leafy", leaf(), gc, 0, hc * 0.55, 0);
return 0.8;
}
if (T === "palm") {
var hp = 6.5 * sc, lean = (r() - 0.5) * 0.5;
for (var s = 0; s < (lite ? 2 : 4); s++) {
var q = s / (lite ? 2 : 4);
kitAddF(B, F, "wood", bark, kitCylG(0.2 - q * 0.05, 0.24 - q * 0.05, hp / (lite ? 2 : 4) + 0.1, 6), lean * q * hp * 0.3, hp * (q + 0.5 / (lite ? 2 : 4)), 0, 0, 0, -lean * 0.4);
}
var tx = lean * hp * 0.3;
for (var f = 0; f < (lite ? 5 : 8); f++) {
var a = f / (lite ? 5 : 8) * 6.283 + r() * 0.3, fg = kitBoxG(2.6 * sc, 0.04, 0.55);
fg.translate(1.3 * sc, 0, 0);
fg.rotateZ(-0.35 - r() * 0.3);
fg.rotateY(a);
kitAddF(B, F, "leafy", leaf(), fg, tx, hp, 0);
}
return 0.6;
}
if (T === "bare" || T === "dead") {
var hb = 5 * sc;
kitAddF(B, F, "wood", bark, kitCylG(0.16 * sc, 0.3 * sc, hb, 6), 0, hb / 2, 0);
for (var b = 0; b < (lite ? 3 : 6); b++) {
var ab = b * 2.1 + r(), bg = kitCylG(0.04, 0.1, 2.2 * sc, 5);
bg.translate(0, 1.1 * sc, 0);
bg.rotateZ(0.7 + r() * 0.4);
bg.rotateY(ab);
kitAddF(B, F, "wood", bark, bg, 0, hb * (0.55 + b * 0.07), 0);
}
if (T === "bare" && !lite)
for (var c = 0; c < 3; c++) {
var gb = kitBallG(1.1 * sc, 0);
gb.scale(1, 0.6, 1);
kitAddF(B, F, "leafy", leaf(), gb, Math.cos(c * 2.1) * 1.3 * sc, hb * 0.95 + c * 0.3, Math.sin(c * 2.1) * 1.3 * sc);
}
return 0.7;
}
if (T === "ice" || T === "crystal") {
var hi = 5 * sc, ic = kitCol(kitPick(L, r()));
kitAddF(B, F, "plain", ic.clone().multiplyScalar(0.8), kitCylG(0.18, 0.3, hi * 0.6, 6), 0, hi * 0.3, 0);
for (var k = 0; k < (lite ? 2 : 4); k++) {
var g2 = kitConeG(0.5 * sc, 2.2 * sc, 5);
g2.rotateZ((r() - 0.5) * 0.9);
kitAddF(B, F, "glow", ic, g2, Math.cos(k * 1.7) * 0.6 * sc, hi * 0.6 + k * 0.5, Math.sin(k * 1.7) * 0.6 * sc, r());
}
return 0.7;
}
var hh = 4.2 * sc;
kitAddF(B, F, "wood", bark, kitCylG(0.2 * sc, 0.34 * sc, hh, lite ? 6 : 7), 0, hh / 2, 0);
var n = lite ? 2 : 4;
for (var m = 0; m < n; m++) {
var am = m / n * 6.283 + r(), rm = (1.5 + r() * 0.7) * sc, g = kitBallG(rm, det);
g.scale(1, 0.78, 1);
kitAddF(B, F, "leafy", leaf(), g, m ? Math.cos(am) * 1.2 * sc : 0, hh + (m ? 0.2 : 0.9) * sc + r() * 0.4, m ? Math.sin(am) * 1.2 * sc : 0, r());
}
return 0.9;
},
function (B, S, F, len, r) {
var c = kitCol(S.pal.hedge || kitPick(kitLeafCols(S), r()), 0.8), h = 1.1 + r() * 0.5;
kitAddF(B, F, "leafy", c, kitBoxG(len, h, 0.95), 0, h / 2, 0);
if (!kitLite())
for (var i = 0; i < Math.round(len / 1.6); i++) {
var g = kitBallG(0.6 + r() * 0.3, 0);
g.scale(1.3, 0.7, 1);
kitAddF(B, F, "leafy", c.clone().multiplyScalar(0.9 + r() * 0.2), g, -len / 2 + 0.8 + i * 1.6, h + 0.05, (r() - 0.5) * 0.2, r());
}
},
function (W, S, A, B, x, z, ry, r) {
var w = 5.5 + r() * 3.5, d = 5 + r() * 2.5, st = r() < 0.55 ? 1 : 2, h = st * 3.1 + 0.3, hw = w / 2, hd = d / 2, c = Math.cos(ry), s = Math.sin(ry);
var y0 = 1e9, y1 = -1e9;
for (var i = 0; i < 5; i++) {
var lx = i < 4 ? (i % 2 ? hw : -hw) : 0, lz = i < 4 ? (i > 1 ? hd : -hd) : 0, y = kitGroundY(W, A, x + lx * c + lz * s, z - lx * s + lz * c);
if (y == null)
return null;
y0 = Math.min(y0, y);
y1 = Math.max(y1, y);
}
if (y1 - y0 > 1.4 || Math.abs(y0 - A.y) > 4)
return null;
for (var k = 0; k < 9; k++) {
var px = x + (k % 3 - 1) * hw, pz = z + ((k / 3 | 0) - 1) * hd;
if (!kitFree(W, A, px, pz, y1, 1.2))
return null;
}
var col = kitCol(kitPick(S.pal.wall, r())), b = { x: x, y: y0 - 0.25, z: z, w: w, h: h + 0.25 + (y1 - y0), d: d, ry: ry, pbk: false, own: false, col: col };
b.top = b.y + b.h;
kitAdd(B, S.mat.wall || "plaster", col, kitBoxG(w, b.h, d), x, b.y + b.h / 2, z, ry);
var save = S.shops;
S.shops = 0;
try {
kitDressBlock(B, S, A, b, { covered: false, hasWin: false, gy: y0 });
}
finally {
S.shops = save;
}
if (S.chimney && r() < S.chimney)
kitAdd(B, S.mat.trim || "stone", kitCol(S.pal.trim, 0.8), kitBoxG(0.6, 1.6, 0.6), x + hw * 0.5 * c, b.top + 0.8, z - hw * 0.5 * s, ry);
(A.foot || (A.foot = [])).push(b);
A.used.push([x, z, Math.hypot(hw, hd)]);
return { x: x, z: z, hw: hw + 0.1, hd: hd + 0.1, rot: ry, b: b.y, h: b.h + 2 };
},
function (W, S, A, B, put, r, solids) {
if (typeof GR !== "undefined" && GR.drifts && A.key && /^gr_/.test(A.key))
GR.drifts.forEach(function (df) {
var m = df[3];
if (!m || m.userData.kitLow || Math.hypot(df[0] - A.x, df[1] - A.z) > df[2] + 16)
return;
m.userData.kitLow = 1;
m.scale.y *= 0.3;
m.position.y -= 0.1;
m.updateMatrix();
m.updateMatrixWorld(true);
df[2] = Math.max(2, df[2] * 0.6);
});
var Fi = S.fill;
if (!Fi)
return;
var lite = kitLite(), k = lite ? 0.4 : 1, st = A.fillStat = {};
var nh = Math.round((Fi.houses || 0) * (lite ? 0.5 : 1)), got = 0;
for (var t = 0; t < nh * 8 && got < nh; t++) {
var a = r() * 6.283, d = A.r * (0.72 + r() * 0.4), x = A.x + Math.cos(a) * d, z = A.z + Math.sin(a) * d;
var ry = Math.atan2(A.x - x, A.z - z);
var sol = kitHouse(W, S, A, B, x, z, ry, r);
if (sol) {
solids.push(sol);
got++;
KSW.stat.houses = (KSW.stat.houses || 0) + 1;
}
}
st.houses = got;
var ng = Math.round((Fi.hedges || 0) * k);
for (var g = 0, tg = 0; g < ng && tg < ng * 6; tg++) {
var ag = r() * 6.283, dg = A.r * (0.55 + r() * 0.5), xg = A.x + Math.cos(ag) * dg, zg = A.z + Math.sin(ag) * dg, len = 4 + r() * 5, ryg = ag;
var yg = kitGroundY(W, A, xg, zg);
if (yg == null || Math.abs(yg - A.y) > 3)
continue;
var ok = true, ex = Math.cos(ryg), ez = -Math.sin(ryg);
for (var q = -2; q <= 2 && ok; q++) {
var px = xg + ex * q * len / 4, pz = zg + ez * q * len / 4, py = kitGroundY(W, A, px, pz);
if (py == null || Math.abs(py - yg) > 0.8 || !kitFree(W, A, px, pz, yg, 0.7))
ok = false;
}
if (!ok || Math.hypot(xg - A.x, zg - A.z) < len / 2 + 6)
continue;
kitHedge(B, S, { x: xg, y: yg - 0.05, z: zg, ry: ryg }, len, r);
g++;
KSW.stat.props++;
for (var q2 = -2; q2 <= 2; q2++)
A.used.push([xg + ex * q2 * len / 4, zg + ez * q2 * len / 4, 0.7]);
solids.push({ x: xg, z: zg, hw: len / 2, hd: 0.5, rot: ryg, b: yg - 0.2, h: 1.6 });
}
st.hedges = g;
var nt = Math.round((Fi.trees || 0) * k);
for (var i2 = 0, tt = 0; i2 < nt && tt < nt * 5; tt++) {
var edge = i2 < nt * (Fi.edge != null ? Fi.edge : 0.5), at = r() * 6.283, dt = A.r * (edge ? 0.6 + r() * 0.45 : 0.15 + r() * 0.5);
if (put("tree", A.x + Math.cos(at) * dt, A.z + Math.sin(at) * dt, r() * 6.283))
i2++;
}
st.trees = i2;
var nc = Math.round((Fi.clusters || 0) * (lite ? 0.5 : 1)), gotc = 0;
for (var tc = 0; tc < nc * 6 && gotc < nc; tc++) {
var ac = r() * 6.283, dc = A.r * (0.3 + r() * 0.45), cx = A.x + Math.cos(ac) * dc, cz = A.z + Math.sin(ac) * dc;
var main = kitWeighted(Fi.cluster || [["stall", 2], ["cart", 1]], r());
if (!put(main, cx, cz, Math.atan2(A.x - cx, A.z - cz) + (r() - 0.5) * 0.6))
continue;
gotc++;
for (var sp = 0; sp < (lite ? 1 : 4); sp++) {
var as = r() * 6.283, ds = 2.6 + r() * 1.8;
put(kitWeighted(S.props, r()), cx + Math.cos(as) * ds, cz + Math.sin(as) * ds, r() * 6.283);
}
A.spots = (A.spots || []).concat([[cx, cz]]);
}
st.clusters = gotc;
var nn = Math.round((Fi.near || 0) * (lite ? 0.5 : 1)), rn = kitRand(A.seed * 13 + 5), gotn = 0;
var sec = [];
for (var q = 0; q < 12; q++)
sec.push({ a: q * 0.5236, n: 0 });
(A.used || []).forEach(function (u) { var d = Math.hypot(u[0] - A.x, u[1] - A.z); if (d < 6 || d > 26)
return; var a = Math.atan2(u[1] - A.z, u[0] - A.x); if (a < 0)
a += 6.283; sec[Math.floor(a / 0.5236) % 12].n += 1 + u[2] * 0.3; });
(A.foot || []).forEach(function (b) { var d = Math.hypot(b.x - A.x, b.z - A.z); if (d < 6 || d > 30)
return; var a = Math.atan2(b.z - A.z, b.x - A.x); if (a < 0)
a += 6.283; sec[Math.floor(a / 0.5236) % 12].n += 3; });
sec.sort(function (a, b) { return a.n - b.n; });
for (var tn = 0; tn < nn * 6 && gotn < nn; tn++) {
var sc0 = sec[gotn % sec.length], an = sc0.a + 0.26 + (rn() - 0.5) * 0.4, dn = Math.max(11, A.r * (0.2 + rn() * 0.16)), nx = A.x + Math.cos(an) * dn, nz = A.z + Math.sin(an) * dn;
if (!put(kitWeighted(Fi.cluster || [["stall", 2], ["cart", 1]], rn()), nx, nz, Math.atan2(A.x - nx, A.z - nz) + (rn() - 0.5) * 0.6)) {
if (tn % 3 === 2)
sec.push(sec.splice(gotn % sec.length, 1)[0]);
continue;
}
gotn++;
for (var sn = 0; sn < (lite ? 1 : 3); sn++) {
var asn = rn() * 6.283, dsn = 2.4 + rn() * 1.6;
put(kitWeighted(S.props, rn()), nx + Math.cos(asn) * dsn, nz + Math.sin(asn) * dsn, rn() * 6.283);
}
A.spots = (A.spots || []).concat([[nx, nz]]);
}
st.near = gotn;
var ns = Math.round((Fi.seats || 0) * k);
for (var j = 0, tj = 0; j < ns && tj < ns * 5; tj++) {
var aj = r() * 6.283, dj = A.r * (0.2 + r() * 0.6);
if (put(kitWeighted(Fi.green || [["bench", 2], ["planter", 1]], r()), A.x + Math.cos(aj) * dj, A.z + Math.sin(aj) * dj, r() * 6.283))
j++;
}
st.seats = j;
if (Fi.fronts && A.rayList && A.rayList.length)
kitFronts(W, S, A, B, put, r, Math.round(Fi.fronts * (lite ? 0.35 : 1)));
},
function (W, S, A, B, put, r, n) {
var hits = [], o = new THREE.Vector3(), dir = new THREE.Vector3(), nm = new THREE.Vector3(), rc = KIT_RC;
var origins = [[0, 0], [A.r * 0.4, 0], [-A.r * 0.4, 0], [0, A.r * 0.4], [0, -A.r * 0.4]];
var flat = [], other = [], ta = new THREE.Vector3(), tb = new THREE.Vector3(), tc = new THREE.Vector3(), e1 = new THREE.Vector3(), e2 = new THREE.Vector3(), fn = new THREE.Vector3();
A.rayList.forEach(function (m) {
var g = m.geometry, pos = g && g.attributes && g.attributes.position;
if (!pos || m.isInstancedMesh || m.isSkinnedMesh || (g.morphAttributes && g.morphAttributes.position) || Array.isArray(m.material) || !m.isMesh) {
other.push(m);
return;
}
m.updateMatrixWorld();
var mw = m.matrixWorld, idx = g.index, n = idx ? idx.count : pos.count, side = (m.material && m.material.side) || THREE.FrontSide, T = [];
for (var i = 0; i + 2 < n; i += 3) {
ta.fromBufferAttribute(pos, idx ? idx.getX(i) : i).applyMatrix4(mw);
tb.fromBufferAttribute(pos, idx ? idx.getX(i + 1) : i + 1).applyMatrix4(mw);
tc.fromBufferAttribute(pos, idx ? idx.getX(i + 2) : i + 2).applyMatrix4(mw);
e1.subVectors(tc, tb);
e2.subVectors(ta, tb);
fn.crossVectors(e1, e2);
var fl = fn.length();
if (fl < 1e-9)
continue;
fn.multiplyScalar(1 / fl);
T.push(ta.x, ta.y, ta.z, tb.x, tb.y, tb.z, tc.x, tc.y, tc.z, fn.x, fn.y, fn.z);
}
if (T.length)
flat.push({ T: T, side: side });
});
function cut(Y) {
var segs = [];
flat.forEach(function (F) {
var T = F.T;
for (var i = 0; i < T.length; i += 12) {
var P = [], ys = [T[i + 1], T[i + 4], T[i + 7]];
if ((ys[0] > Y && ys[1] > Y && ys[2] > Y) || (ys[0] < Y && ys[1] < Y && ys[2] < Y))
continue;
for (var e = 0; e < 3; e++) {
var a = i + e * 3, b = i + ((e + 1) % 3) * 3, ya = T[a + 1], yb = T[b + 1];
if ((ya <= Y && yb > Y) || (yb <= Y && ya > Y)) {
var t = (Y - ya) / (yb - ya);
P.push(T[a] + (T[b] - T[a]) * t, T[a + 2] + (T[b + 2] - T[a + 2]) * t);
}
}
if (P.length >= 4)
segs.push([P[0], P[1], P[2], P[3], T[i + 9], T[i + 10], T[i + 11], F.side]);
}
});
return segs;
}
origins.forEach(function (oo) {
var ox = A.x + oo[0], oz = A.z + oo[1], oy = kitGroundY(W, A, ox, oz);
if (oy == null)
return;
var Y = oy + 1.3, X0 = W.base + ox, segs = cut(Y);
for (var i = 0; i < 28; i++) {
var a = i / 28 * 6.283, dx = Math.cos(a), dz = Math.sin(a), best = A.r, bn = null;
for (var s = 0; s < segs.length; s++) {
var S2 = segs[s], dd = S2[4] * dx + S2[6] * dz;
if (S2[7] === THREE.FrontSide && dd > 0)
continue;
if (S2[7] === THREE.BackSide && dd < 0)
continue;
var sx = S2[2] - S2[0], sz = S2[3] - S2[1], den = dx * sz - dz * sx;
if (Math.abs(den) < 1e-9)
continue;
var qx = S2[0] - X0, qz = S2[1] - oz, t = (qx * sz - qz * sx) / den, u = (qx * dz - qz * dx) / den;
if (t >= 0 && t < best && u >= 0 && u <= 1) {
best = t;
bn = S2;
}
}
var hd = best, hx = X0 + dx * best, hz = oz + dz * best, hn = bn ? [bn[4], bn[5], bn[6]] : null;
if (other.length) {
o.set(X0, Y, oz);
dir.set(dx, 0, dz);
rc.set(o, dir);
rc.far = best;
var h = rc.intersectObjects(other, false)[0];
if (h && h.face && h.distance < hd) {
hd = h.distance;
hx = h.point.x;
hz = h.point.z;
nm.copy(h.face.normal).transformDirection(h.object.matrixWorld);
hn = [nm.x, nm.y, nm.z];
}
}
if (!hn || hd < 2.5)
continue;
if (Math.abs(hn[1]) > 0.3)
continue;
if (hn[0] * dx + hn[2] * dz > 0)
continue;
var L = Math.hypot(hn[0], hn[2]);
hits.push({ x: hx - W.base, z: hz, nx: hn[0] / L, nz: hn[2] / L });
}
});
var picked = [];
hits.forEach(function (p) { for (var i = 0; i < picked.length; i++)
if (Math.hypot(picked[i].x - p.x, picked[i].z - p.z) < 4.5)
return; picked.push(p); });
var list = S.front || [["barrel", 2], ["crates", 1.5], ["bench", 1], ["sacks", 1], ["planter", 1], ["walllamp", 1], ["sign", 1]], done = 0;
for (var i = 0; i < picked.length && done < n; i++) {
var p = picked[(i * 7) % picked.length];
var kind = kitWeighted(list, r()), ry = Math.atan2(p.nx, p.nz);
if (kind === "walllamp" || kind === "sign") {
var y = kitGroundY(W, A, p.x + p.nx * 0.6, p.z + p.nz * 0.6);
if (y == null)
continue;
var F = { x: p.x + p.nx * 0.02, y: y, z: p.z + p.nz * 0.02, ry: ry };
if (kind === "walllamp")
kitLampOnWall(B, S, F, 0, 2.7);
else
kitSignOnWall(B, S, F, r);
done++;
KSW.stat.props++;
continue;
}
var off = kind === "bench" ? 0.75 : 0.85;
if (put(kind, p.x + p.nx * off, p.z + p.nz * off, ry, true))
done++;
}
A.fillStat.fronts = done;
A.fillStat.walls = picked.length;
},
function (B, S, F, r) {
var m = kitCol(S.pal.metal), cv = kitPick(S.pal.canvas, r()), bd = kitCol(Array.isArray(cv) ? cv[0] : cv), wd = kitCol(S.pal.wood);
kitAddF(B, F, "metal", m, kitBoxG(0.05, 0.05, 1.0), 0, 3.0, 0.5);
kitAddF(B, F, "wood", wd, kitBoxG(0.06, 0.62, 0.78), 0, 2.6, 0.75);
kitAddF(B, F, "plain", bd, kitBoxG(0.07, 0.46, 0.6), 0, 2.6, 0.75);
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood, 1.15 + r() * 0.2), dk = kitCol(S.pal.wood, 0.8), pale = kitCol(S.pal.wood, 1.45), w = 2.8 + r() * 0.6, lite = kitLite();
[-1, 1].forEach(function (sd) { kitAddF(B, F, "wood", dk, kitBoxG(0.13, 2.6, 0.13), sd * w / 2, 1.3, 0.55); kitAddF(B, F, "wood", dk, kitBoxG(0.13, 2.9, 0.13), sd * w / 2, 1.45, -0.6); });
kitAddF(B, F, "wood", wd, kitBoxG(w, 2.8, 0.06), 0, 1.4, -0.6);
[-1, 1].forEach(function (sd) { kitAddF(B, F, "wood", pale, kitBoxG(0.06, 1.0, 1.1), sd * w / 2, 0.5, 0); });
kitAddF(B, F, "wood", kitCol(0xA86A4A), kitBoxG(w + 0.4, 0.08, 1.6), 0, 2.82, -0.05, 0, 0.2);
kitAddF(B, F, "wood", pale, kitBoxG(w, 0.06, 0.7), 0, 0.95, 0.85);
if (!lite)
[-w / 2 + 0.2, w / 2 - 0.2].forEach(function (bx) { kitAddF(B, F, "wood", dk, kitBoxG(0.06, 0.5, 0.06), bx, 0.72, 1.0, 0, -0.6); });
kitAddF(B, F, "wood", wd, kitBoxG(w - 0.1, 0.85, 0.06), 0, 0.45, 0.52);
var cv = kitPick(S.pal.canvas, r()), c0 = kitCol(cv[0]), c1 = kitCol(cv[1]), ns = lite ? 4 : 8, sw = (w + 0.3) / ns;
for (var i = 0; i < ns; i++) {
kitAddF(B, F, "plain", i % 2 ? c1 : c0, kitBoxG(sw, 0.03, 1.3), -(w + 0.3) / 2 + sw * (i + 0.5), 2.38, 1.05, 0, 0.42);
if (!lite)
kitAddF(B, F, "plain", i % 2 ? c0 : c1, kitBoxG(sw, 0.26, 0.02), -(w + 0.3) / 2 + sw * (i + 0.5), 1.98, 1.66);
}
kitGoods(B, S, F, r, -w / 2 + 0.3, w / 2 - 0.3, 1.04, 0.85, lite ? 5 : Math.round(w * 3.2));
for (var s2 = 0; s2 < (lite ? 1 : 2); s2++) {
kitAddF(B, F, "wood", wd, kitBoxG(w - 0.2, 0.05, 0.34), 0, 1.2 + s2 * 0.6, -0.4);
kitGoods(B, S, F, r, -w / 2 + 0.3, w / 2 - 0.3, 1.3 + s2 * 0.6, -0.4, lite ? 3 : Math.round(w * 2.6));
}
if (!lite)
for (var h = 0; h < 4; h++) {
var hx = -w / 2 + 0.45 + h * (w - 0.9) / 3;
kitAddF(B, F, "plain", kitCol(kitPick(S.pal.goods, r())), kitBoxG(0.3, 0.5, 0.06), hx, 1.95, 0.45);
}
if (!lite)
kitAddF(B, F, "plain", kitCol(kitPick(S.pal.canvas, r())[0]), kitBoxG(1.0, 0.4, 0.04), 0, 3.1, 0.55);
F.keeper = [0, -0.1];
return Math.max(1.5, w / 2 + 0.3);
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood, 0.85 + r() * 0.2), dk = kitCol(0x2A1E14), lite = kitLite();
kitAddF(B, F, "wood", wd, kitBoxG(1.1, 0.08, 1.7), 0, 0.72, 0);
[-0.55, 0.55].forEach(function (sx) { kitAddF(B, F, "wood", wd, kitBoxG(0.05, 0.2, 1.7), sx, 0.84, 0); kitAddF(B, F, "wood", wd, kitBoxG(0.05, 0.05, 1.4), sx * 0.8, 0.7, 1.5, 0, 0.05); kitAddF(B, F, "wood", dk, kitBoxG(0.06, 0.7, 0.06), sx * 0.9, 0.35, 0.7); });
var wh = new THREE.TorusGeometry(0.36, 0.045, 4, lite ? 8 : 12);
wh.rotateY(Math.PI / 2);
[-0.62, 0.62].forEach(function (sx) { kitAddF(B, F, "wood", dk, wh.clone(), sx, 0.38, -0.45); });
kitGoods(B, S, F, r, -0.4, 0.4, 0.85, -0.3, lite ? 3 : 6);
kitGoods(B, S, F, r, -0.4, 0.4, 0.85, 0.3, lite ? 0 : 5);
return 1.2;
},
function (B, S, F, r) {
var cv = kitPick(S.pal.canvas, r()), c0 = kitCol(cv[0]), c1 = kitCol(cv[1]), wd = kitCol(S.pal.wood), w = 3 + r() * 0.8, d = 2.4, lite = kitLite();
[[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]].forEach(function (p) { kitAddF(B, F, "wood", wd, kitCylG(0.04, 0.05, 2.5, 5), p[0], 1.25, p[1]); });
kitAddF(B, F, "wood", wd, kitCylG(0.05, 0.06, 2.9, 5), 0, 1.45, 0);
[-1, 1].forEach(function (sd) { kitAddF(B, F, "plain", sd < 0 ? c0 : c0.clone().multiplyScalar(0.85), kitBoxG(w + 0.3, 0.03, d / 2 + 0.25), 0, 2.65, sd * d / 4, 0, sd * 0.28); });
if (!lite)
[-1, 1].forEach(function (sd) { for (var i = 0; i < 6; i++)
kitAddF(B, F, "plain", i % 2 ? c1 : c0, kitBoxG((w + 0.3) / 6, 0.32, 0.02), -(w + 0.3) / 2 + (w + 0.3) / 6 * (i + 0.5), 2.32, sd * (d / 2 + 0.18)); });
for (var k = 0; k < (lite ? 1 : 3); k++) {
var cp = kitCol(kitPick(S.pal.rugs || [0x8A2A2A, 0x2A3A6A, 0xA86A2A, 0x5A2A4A], r()));
kitAddF(B, F, "plain", cp, kitBoxG(0.9, 1.7, 0.03), -w / 2 + 0.6 + k * (w - 1.2) / 2, 1.2, -d / 2 + 0.05);
if (!lite)
kitAddF(B, F, "plain", kitCol(0xE8D0A0), kitBoxG(0.7, 0.08, 0.035), -w / 2 + 0.6 + k * (w - 1.2) / 2, 1.2, -d / 2 + 0.07);
}
var rug = kitCol(kitPick(S.pal.rugs || [0x8A2A2A, 0x2A3A6A], r()));
kitAddF(B, F, "plain", rug, kitBoxG(w - 0.2, 0.02, d - 0.3), 0, 0.01, 0);
if (!lite)
[0.4, 0.8].forEach(function (t) { kitAddF(B, F, "plain", kitCol(0xE8C880), kitBoxG(w - 0.3, 0.022, 0.08), 0, 0.012, -d / 2 + 0.15 + (d - 0.3) * t); });
var brass = kitCol(0xC8A040);
for (var b = 0; b < (lite ? 2 : 5); b++) {
var bx = -w / 2 + 0.5 + b * (w - 1) / 4, bz = 0.4 + (b % 2) * 0.3;
kitAddF(B, F, "metal", brass, kitCylG(0.3, 0.3, 0.03, 12), bx, 0.12, bz);
kitAddF(B, F, "metal", brass, kitCylG(0.04, 0.07, 0.1, 6), bx, 0.06, bz);
if (b % 2 === 0)
kitAddF(B, F, "metal", brass.clone().multiplyScalar(0.8), new THREE.SphereGeometry(0.14, 8, 6), bx, 0.24, bz);
}
if (KIT_PROPS.pots && !lite)
KIT_PROPS.pots(B, S, { x: F.x + Math.cos(F.ry) * (w / 2 + 0.5), y: F.y, z: F.z - Math.sin(F.ry) * (w / 2 + 0.5), ry: F.ry }, r);
return Math.max(1.6, w / 2 + 0.4);
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood, 0.85 + r() * 0.2), dk = kitCol(0x3A2A1A), lite = kitLite();
kitAddF(B, F, "wood", wd, kitBoxG(1.2, 0.08, 1.6), 0, 0.95, 0);
[-0.6, 0.6].forEach(function (sx) { kitAddF(B, F, "wood", wd, kitBoxG(0.05, 0.35, 1.6), sx, 1.12, 0); kitAddF(B, F, "wood", wd, kitBoxG(0.06, 0.06, 1.6), sx * 0.6, 0.9, 1.5, 0, 0.12); });
var wh = new THREE.TorusGeometry(0.7, 0.05, 4, lite ? 10 : 14);
wh.rotateY(Math.PI / 2);
[-0.72, 0.72].forEach(function (sx) { kitAddF(B, F, "wood", dk, wh.clone(), sx, 0.72, 0); if (!lite)
for (var s = 0; s < 3; s++)
kitAddF(B, F, "wood", dk, kitBoxG(0.03, 1.38, 0.03), sx, 0.72, 0, 0, s * Math.PI / 3); });
for (var k = 0; k < (lite ? 2 : 4); k++) {
var sg = kitBallG(0.3, 1);
sg.scale(1, 0.8, 1.2);
kitAddF(B, F, "plain", kitCol(S.pal.sack || 0xC8A878, 0.85 + r() * 0.2), sg, (k % 2) * 0.5 - 0.25, 1.25, -0.4 + (k >> 1) * 0.7);
}
return 1.3;
},
function (B, S, F, r) {
var sh = kitCol(kitPick(S.pal.wall, r()), 1.05), tr = kitCol(S.pal.trim), lite = kitLite(), w = 3.2;
var g = new THREE.CylinderGeometry(1.5, 1.5, w, lite ? 8 : 14, 1, false, 0, Math.PI);
g.rotateZ(Math.PI / 2);
g.rotateX(Math.PI / 2);
kitAddF(B, F, "metal", sh, g, 0, 0, -0.2);
kitAddF(B, F, "metal", tr, kitBoxG(w + 0.1, 0.12, 3.1), 0, 0.06, -0.2);
kitAddF(B, F, "lit", kitCol(S.pal.lit || 0xFFD0A0), kitBoxG(w - 0.6, 1.0, 0.03), 0, 1.0, 1.28);
kitAddF(B, F, "pane", kitCol(S.pal.glass || 0x2A3A44), kitBoxG(w - 0.5, 1.05, 0.02), 0, 1.0, 1.27);
kitAddF(B, F, "metal", tr, kitBoxG(w - 0.4, 0.9, 0.5), 0, 0.45, 1.5);
kitGoods(B, S, F, r, -w / 2 + 0.5, w / 2 - 0.5, 0.98, 1.5, lite ? 3 : 7);
if (!lite) {
kitAddF(B, F, "metal", kitCol(0x3A3A40), kitCylG(0.15, 0.15, 0.5, 8), 0.8, 1.6, -0.6);
kitAddF(B, F, "glow", kitCol(S.pal.screen || 0x6AD0E0, 0.9), kitBoxG(0.6, 0.35, 0.02), -0.9, 1.9, 1.28);
}
return 1.9;
},
function (B, S, F, r) {
var m = kitCol(S.pal.metal, 1.4), dk = kitCol(0x2A2A2E), lite = kitLite();
kitAddF(B, F, "metal", m, kitBoxG(1.6, 0.15, 2.8), 0, 0.6, 0);
kitAddF(B, F, "metal", dk, kitBoxG(0.12, 0.12, 0.9), 0, 0.55, 1.8);
[-0.9, 0, 0.9].forEach(function (z) { [-0.85, 0.85].forEach(function (sx) { var wh = kitCylG(0.32, 0.32, 0.22, lite ? 8 : 12); kitAddF(B, F, "metal", dk, wh, sx, 0.32, z, 0, 0, Math.PI / 2); }); });
if (KIT_PROPS["crate-metal"])
KIT_PROPS["crate-metal"](B, S, { x: F.x, y: F.y + 0.68, z: F.z, ry: F.ry }, r);
return 1.6;
},
function (B, S, F, r) {
var ice = kitCol(0xC8DCEC), fur = kitCol(kitPick([0x8A7A6A, 0xB8A890, 0x5A4E44], r())), m = kitCol(S.pal.metal), w = 2.8, lite = kitLite();
kitAddF(B, F, "snow", ice, kitBoxG(w, 1.0, 0.8), 0, 0.5, 0.4);
kitAddF(B, F, "snow", ice.clone().multiplyScalar(1.05), kitBoxG(w + 0.2, 0.12, 1.0), 0, 1.06, 0.4);
[-w / 2, w / 2].forEach(function (sx) { kitAddF(B, F, "metal", m, kitBoxG(0.1, 2.6, 0.1), sx, 1.3, -0.4); });
kitAddF(B, F, "metal", m, kitBoxG(w + 0.2, 0.1, 0.1), 0, 2.6, -0.4);
for (var i = 0; i < (lite ? 2 : 4); i++)
kitAddF(B, F, "plain", fur.clone().multiplyScalar(0.85 + r() * 0.3), kitBoxG(w / 4, 1.3 + r() * 0.3, 0.08), -w / 2 + w / 8 + i * w / 4, 1.9, -0.38);
kitAddF(B, F, "glow", kitCol(0xD8ECFF), kitBallG(0.16, 1), w / 2 - 0.2, 2.3, -0.2);
kitGoods(B, S, F, r, -w / 2 + 0.3, w / 2 - 0.3, 1.2, 0.4, lite ? 3 : 7);
return 1.6;
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood), m = kitCol(S.pal.metal, 1.3), ice = kitCol(0xC8DCEC), lite = kitLite();
[-0.55, 0.55].forEach(function (sx) { kitAddF(B, F, "metal", m, kitBoxG(0.06, 0.06, 2.6), sx, 0.08, 0); kitAddF(B, F, "metal", m, kitBoxG(0.06, 0.06, 0.5), sx, 0.22, 1.38, 0, -0.9); for (var p = 0; p < 3; p++)
kitAddF(B, F, "wood", wd, kitBoxG(0.06, 0.35, 0.06), sx, 0.28, -0.9 + p * 0.9); });
kitAddF(B, F, "wood", wd, kitBoxG(1.2, 0.08, 2.3), 0, 0.47, 0);
for (var b = 0; b < (lite ? 2 : 5); b++)
kitAddF(B, F, "snow", ice.clone().multiplyScalar(0.9 + r() * 0.15), kitBoxG(0.5, 0.4, 0.5), (b % 2) * 0.55 - 0.27, 0.72 + (b > 3 ? 0.4 : 0), -0.7 + (b >> 1) * 0.7);
return 1.3;
},
function (B, S, F, r) {
var st = kitCol(0xD8DCE0), wd = kitCol(S.pal.wood), w = 3.2, lite = kitLite();
[[-w / 2, -0.8], [w / 2, -0.8], [-w / 2, 0.9], [w / 2, 0.9]].forEach(function (p) { kitAddF(B, F, "metal", st, kitCylG(0.04, 0.04, 2.6, 6), p[0], 1.3, p[1]); });
kitAddF(B, F, "metal", st, kitBoxG(w + 0.6, 0.1, 2.3), 0, 2.62, 0.05);
kitAddF(B, F, "leafy", kitCol(kitPick(S.pal.leaf || [0x5A9A44], r())), kitBoxG(w + 0.4, 0.14, 2.1), 0, 2.74, 0.05);
if (!lite)
for (var i = 0; i < 4; i++) {
var gb = kitBallG(0.3, 0);
gb.scale(1, 0.6, 1);
kitAddF(B, F, "leafy", kitCol(kitPick(S.pal.leaf || [0x4A8A3A], r())), gb, -w / 2 + 0.5 + i * (w - 1) / 3, 2.86, 0.05 + (r() - 0.5) * 0.8);
}
kitAddF(B, F, "wood", wd, kitBoxG(w - 0.4, 0.9, 0.6), 0, 0.45, 0.5);
kitAddF(B, F, "plain", kitCol(0xF0F0EC), kitBoxG(w - 0.3, 0.05, 0.7), 0, 0.92, 0.5);
kitAddF(B, F, "glow", kitCol(S.pal.screen || 0x9AE0F0, 0.85), kitBoxG(0.9, 0.5, 0.03), 0, 1.9, -0.78);
kitGoods(B, S, F, r, -w / 2 + 0.5, w / 2 - 0.5, 1.0, 0.5, lite ? 3 : 6);
return 1.8;
},
function (B, S, F, r) {
var c = kitCol(kitPick(S.pal.canvas, r())[0]), dk = kitCol(0x2A2E32), lite = kitLite();
var wh = new THREE.TorusGeometry(0.33, 0.05, 4, lite ? 8 : 14);
wh.rotateY(Math.PI / 2);
kitAddF(B, F, "metal", dk, wh.clone(), 0, 0.35, -0.9);
[-0.45, 0.45].forEach(function (sx) { kitAddF(B, F, "metal", dk, wh.clone(), sx, 0.35, 0.55); });
kitAddF(B, F, "metal", c, kitBoxG(1.1, 0.75, 0.9), 0, 0.85, 0.55);
kitAddF(B, F, "metal", dk, kitBoxG(0.06, 0.06, 1.4), 0, 0.6, -0.2, 0, 0.15);
kitAddF(B, F, "metal", dk, kitBoxG(0.06, 0.7, 0.06), 0, 0.9, -0.9);
kitAddF(B, F, "metal", dk, kitBoxG(0.6, 0.05, 0.05), 0, 1.25, -0.9);
kitAddF(B, F, "plain", kitCol(0x2A2A2A), kitBoxG(0.25, 0.08, 0.35), 0, 0.95, -0.35);
return 1.0;
},
function (B, S, F, r) {
var st = kitCol(S.pal.trim, 0.85), cl = kitCol(kitPick(S.pal.canvas, r())[0]), br = kitCol(0x9A7A3A), w = 2.6, lite = kitLite();
kitAddF(B, F, "marble", st, kitBoxG(w, 0.85, 1.0), 0, 0.42, 0);
kitAddF(B, F, "marble", st.clone().multiplyScalar(1.1), kitBoxG(w + 0.2, 0.1, 1.2), 0, 0.9, 0);
kitAddF(B, F, "plain", cl, kitBoxG(w * 0.7, 0.02, 1.25), 0, 0.96, 0);
kitAddF(B, F, "plain", cl, kitBoxG(w * 0.7, 0.6, 0.02), 0, 0.66, 0.63);
for (var a = 0; a < (lite ? 2 : 4); a++) {
var g = new THREE.SphereGeometry(0.2, 8, 6);
g.scale(1, 1.5, 1);
var ax = -w / 2 + 0.35 + a * (w - 0.7) / 3;
kitAddF(B, F, "plain", kitCol(S.pal.pot || 0x8A4A2A, 0.85 + r() * 0.2), g, ax, 1.25, -0.2);
kitAddF(B, F, "plain", kitCol(S.pal.pot || 0x8A4A2A), kitCylG(0.07, 0.1, 0.18, 6), ax, 1.6, -0.2);
}
kitAddF(B, F, "metal", br, kitCylG(0.05, 0.07, 1.5, 6), w / 2 + 0.4, 0.75, 0);
kitAddF(B, F, "metal", br, kitCylG(0.22, 0.12, 0.15, 8), w / 2 + 0.4, 1.55, 0);
kitAddF(B, F, "glow", kitCol(S.lampCol || 0xFF9A48), kitConeG(0.14, 0.3, 6), w / 2 + 0.4, 1.75, 0);
return 1.6;
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood, 0.9 + r() * 0.2), th = kitCol(0xB89A58), w = 3.0, lite = kitLite();
[[-w / 2, -0.7], [w / 2, -0.7]].forEach(function (p) { kitAddF(B, F, "wood", wd, kitCylG(0.07, 0.08, 2.6, 6), p[0], 1.3, p[1]); });
[[-w / 2, 0.8], [w / 2, 0.8]].forEach(function (p) { kitAddF(B, F, "wood", wd, kitCylG(0.06, 0.07, 1.9, 6), p[0], 0.95, p[1]); });
kitAddF(B, F, "thatch", th, kitBoxG(w + 0.6, 0.22, 2.1), 0, 2.25, 0.05, 0, 0.35);
kitAddF(B, F, "wood", wd, kitBoxG(w - 0.2, 0.07, 0.8), 0, 0.8, 0.3);
[-w / 2 + 0.3, w / 2 - 0.3].forEach(function (tx) { kitAddF(B, F, "wood", wd, kitBoxG(0.07, 0.8, 0.7), tx, 0.4, 0.3, 0.3); });
var tn = kitCol(0xE8D8B8);
for (var i = 0; i < (lite ? 2 : 4); i++) {
var lx = -w / 2 + 0.4 + i * (w - 0.8) / 3;
kitAddF(B, F, "plain", tn, kitBallG(0.13, 0), lx, 1.72, 0.95);
if (!lite)
kitAddF(B, F, "glow", kitCol(0xFFA040), kitBoxG(0.06, 0.05, 0.02), lx, 1.72, 1.07);
}
if (KIT_PROPS.pumpkins)
KIT_PROPS.pumpkins(B, S, { x: F.x + Math.sin(F.ry) * 1.3, y: F.y, z: F.z + Math.cos(F.ry) * 1.3, ry: F.ry }, r);
for (var t = 0; t < (lite ? 3 : 7); t++)
kitAddF(B, F, "plain", kitCol(t % 2 ? 0xE8D8E0 : 0xB868A8), kitBallG(0.1, 0), -w / 2 + 0.5 + t * (w - 1) / 6, 0.92, 0.3 + (r() - 0.5) * 0.3);
return 1.7;
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood, 0.85 + r() * 0.2), dk = kitCol(0x2A1E14), lite = kitLite();
kitAddF(B, F, "wood", wd, kitBoxG(1.5, 0.12, 2.8), 0, 0.95, 0);
[-0.75, 0.75].forEach(function (sx) { kitAddF(B, F, "wood", wd, kitBoxG(0.05, 0.05, 3.0), sx, 1.9, 0, 0, 0, sx * 0.5); for (var k = 0; k < (lite ? 3 : 7); k++)
kitAddF(B, F, "wood", wd, kitBoxG(0.04, 0.95, 0.04), sx * 1.1, 1.45, -1.3 + k * (2.6 / ((lite ? 3 : 7) - 1)), 0, 0, sx * 0.5); });
var wh = new THREE.TorusGeometry(0.62, 0.06, 4, lite ? 10 : 16);
wh.rotateY(Math.PI / 2);
[[-0.85, 0.9], [0.85, 0.9], [-0.85, -0.9], [0.85, -0.9]].forEach(function (p) { kitAddF(B, F, "wood", dk, wh.clone(), p[0], 0.65, p[1]); });
kitAddF(B, F, "thatch", kitCol(0xC8A858), kitBoxG(1.6, 0.7, 2.4), 0, 1.4, 0);
kitAddF(B, F, "wood", wd, kitBoxG(0.07, 0.07, 2.0), 0, 0.8, 2.3, 0, 0.1);
return 1.8;
},
function (B, S, F, r) {
var sh = kitCol(kitPick(S.pal.wall, r())), tr = kitCol(S.pal.trim);
var g = new THREE.CylinderGeometry(0.55, 0.7, 2.0, kitLite() ? 8 : 12);
kitAddF(B, F, "metal", sh, g, 0, 1.0, 0);
var d = new THREE.SphereGeometry(0.58, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2);
kitAddF(B, F, "metal", tr, d, 0, 2.0, 0);
kitAddF(B, F, "glow", kitCol(S.pal.screen || 0x6AD0E0, 0.85), kitBoxG(0.5, 0.4, 0.03), 0, 1.35, 0.66);
return 0.8;
},
function (B, S, F, r) {
var ice = kitCol(0xC8DCEC);
kitAddF(B, F, "snow", ice, kitCylG(0.4, 0.55, 2.3, 6), 0, 1.15, 0);
kitAddF(B, F, "snow", ice.clone().multiplyScalar(1.05), kitConeG(0.5, 0.6, 6), 0, 2.6, 0);
kitAddF(B, F, "glow", kitCol(0xD8ECFF), kitBoxG(0.4, 0.5, 0.03), 0, 1.4, 0.5);
return 0.6;
},
function (B, S, F, r) {
var st = kitCol(0xE8ECEE);
kitAddF(B, F, "metal", st, kitBoxG(0.5, 2.2, 0.3), 0, 1.1, 0);
kitAddF(B, F, "glow", kitCol(S.pal.screen || 0x9AE0F0, 0.9), kitBoxG(0.4, 1.1, 0.02), 0, 1.3, 0.16);
kitAddF(B, F, "leafy", kitCol(kitPick(S.pal.leaf || [0x5A9A44], r())), kitBoxG(0.6, 0.2, 0.4), 0, 2.3, 0);
return 0.5;
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood, 0.9 + r() * 0.2), dk = kitCol(S.pal.wood, 0.6), sn = kitCol(0xEEF2F6), w = 2.8, d = 1.8, lite = kitLite();
for (var i = 0; i < (lite ? 3 : 6); i++)
[-1, 1].forEach(function (sd) { kitAddF(B, F, "wood", wd, kitCylG(0.09, 0.09, d, 6), sd * w / 2, 0.15 + i * (lite ? 0.6 : 0.3), -0.1, 0, Math.PI / 2); });
kitAddF(B, F, "wood", dk, kitBoxG(w, 2.0, 0.08), 0, 1.0, -d / 2);
[-1, 1].forEach(function (sd) {
kitAddF(B, F, "wood", kitCol(S.pal.roof[0] || 0x3A4A3A), kitBoxG(w / 2 + 0.5, 0.08, d + 0.8), sd * (w / 4 + 0.12), 2.45, 0, 0, 0, -sd * 0.72);
kitAddF(B, F, "snow", sn, kitBoxG(w / 2 + 0.45, 0.12, d + 0.75), sd * (w / 4 + 0.1), 2.53, 0, 0, 0, -sd * 0.72);
});
kitAddF(B, F, "wood", wd, kitBoxG(w - 0.1, 0.07, 0.6), 0, 0.95, d / 2 + 0.1);
kitGoods(B, S, F, r, -w / 2 + 0.3, w / 2 - 0.3, 1.04, d / 2 + 0.1, lite ? 4 : 9);
if (!lite) {
for (var g = 0; g < 9; g++)
kitAddF(B, F, "leafy", kitCol(0x2E5A34, 0.9 + r() * 0.2), kitBallG(0.14, 0), -w / 2 + g * w / 8, 1.95, d / 2 + 0.35);
[-w / 2 + 0.3, w / 2 - 0.3].forEach(function (lx) { kitAddF(B, F, "glow", kitCol(S.lampCol || 0xFFC070), kitBoxG(0.14, 0.2, 0.14), lx, 1.75, d / 2 + 0.4); });
}
F.keeper = [0, -0.2];
return 1.8;
},
function (B, S, F, r) {
var red = kitCol(kitPick(S.pal.canvas, r())[0]), m = kitCol(0xC8A040), lite = kitLite();
kitAddF(B, F, "wood", red, kitBoxG(1.1, 0.5, 1.8), 0, 0.6, 0);
kitAddF(B, F, "wood", red, kitBoxG(1.1, 0.8, 0.12), 0, 0.95, -0.85);
[-0.5, 0.5].forEach(function (sx) {
kitAddF(B, F, "metal", m, kitBoxG(0.05, 0.05, 2.2), sx, 0.2, 0.1);
var c = new THREE.TorusGeometry(0.3, 0.03, 4, lite ? 6 : 10, Math.PI);
c.rotateY(Math.PI / 2);
kitAddF(B, F, "metal", m, c, sx, 0.5, 1.2, 0, 0, 0);
});
kitGoods(B, S, F, r, -0.35, 0.35, 0.95, 0.1, lite ? 3 : 7);
return 1.3;
},
function (B, S, F, r) {
var bm = kitCol(0xC8B070, 0.9 + r() * 0.15), th = kitCol(0x9A8A4A), w = 3.0, d = 2.0, lite = kitLite();
[[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]].forEach(function (p) { kitAddF(B, F, "wood", bm, kitCylG(0.06, 0.07, 2.4, 6), p[0], 1.2, p[1]); });
[-1, 1].forEach(function (sd) { kitAddF(B, F, "thatch", th, kitBoxG(w + 0.7, 0.18, d / 2 + 0.7), 0, 2.55, sd * (d / 4 + 0.15), 0, sd * 0.5); });
kitAddF(B, F, "wood", bm, kitBoxG(w, 0.07, 0.7), 0, 0.95, d / 2 - 0.2);
[-w / 2 + 0.2, w / 2 - 0.2].forEach(function (lx) { kitAddF(B, F, "wood", bm, kitBoxG(0.07, 0.95, 0.6), lx, 0.47, d / 2 - 0.2); });
for (var c = 0; c < (lite ? 3 : 6); c++)
kitAddF(B, F, "plain", kitCol(0x5A3E22), kitBallG(0.13, 0), -w / 2 + 0.4 + c * (w - 0.8) / 5, 1.1, d / 2 - 0.2);
if (!lite)
for (var s = 0; s < 5; s++) {
var sx = -w / 2 + 0.3 + s * (w - 0.6) / 4;
for (var k = 0; k < 4; k++)
kitAddF(B, F, "plain", kitCol(k % 2 ? 0xF0E0C8 : kitPick(S.pal.goods, r())), kitBallG(0.06, 0), sx, 2.1 - k * 0.17, d / 2 + 0.25);
}
F.keeper = [0, -0.2];
return 1.8;
},
function (B, S, F, r) {
var wd = kitCol(0x6A4A2A, 0.9 + r() * 0.2), lite = kitLite();
var g = new THREE.CylinderGeometry(0.35, 0.35, 3.6, lite ? 6 : 10, 1, true, 0, Math.PI);
g.rotateX(Math.PI / 2);
g.rotateZ(Math.PI);
kitAddF(B, F, "wood", wd, g, 0, 0.36, 0);
kitAddF(B, F, "wood", wd, kitBoxG(0.08, 0.06, 1.4), 0.25, 0.42, 0.3, 0.3);
if (!lite)
kitAddF(B, F, "plain", kitCol(0xB8A888), kitBoxG(0.6, 0.08, 0.6), -0.1, 0.2, -1.1);
return 1.9;
},
function (B, S, F, r) {
var felt = kitCol(kitPick([0xB8A88A, 0x9A8A70, 0xC8BCA0], r())), dk = kitCol(0x5A4A3A), fur = kitCol(0x8A7A62), lite = kitLite();
kitAddF(B, F, "plain", felt, kitCylG(1.6, 1.7, 1.5, lite ? 8 : 14), 0, 0.75, -0.3);
kitAddF(B, F, "plain", felt.clone().multiplyScalar(0.9), kitConeG(1.85, 1.2, lite ? 8 : 14), 0, 2.1, -0.3);
kitAddF(B, F, "wood", dk, kitCylG(0.2, 0.25, 0.3, 6), 0, 2.75, -0.3);
kitAddF(B, F, "plain", kitCol(0x2A2018), kitBoxG(1.4, 1.3, 0.05), 0, 0.75, 1.33);
kitAddF(B, F, "wood", dk, kitBoxG(1.8, 0.6, 0.6), 0, 0.3, 1.7);
for (var i = 0; i < (lite ? 2 : 5); i++)
kitAddF(B, F, "plain", fur.clone().multiplyScalar(0.85 + r() * 0.3), kitBoxG(0.5, 0.12, 0.5), -0.7 + i * 0.35, 0.66, 1.7, r() * 0.6);
if (!lite)
kitAddF(B, F, "glow", kitCol(S.lampCol || 0xFFB868), kitBoxG(0.14, 0.2, 0.14), 0.85, 1.3, 1.4);
F.keeper = [0, 1.0];
return 2.0;
},
function (B, S, F, r) {
var wd = kitCol(S.pal.wood || 0x6A4A2E), m = kitCol(0x3A4048), sl = kitCol(0xE8E4D8), lite = kitLite();
kitAddF(B, F, "wood", wd, kitBoxG(0.5, 0.18, 3.2), 0, 0.4, 0);
kitAddF(B, F, "wood", wd, kitBoxG(2.6, 0.12, 0.25), 0, 0.35, -0.6);
[[-1.25, -0.6], [1.25, -0.6], [0, 1.5]].forEach(function (p) { kitAddF(B, F, "metal", m, kitBoxG(0.05, 0.25, 0.7), p[0], 0.15, p[1]); });
kitAddF(B, F, "wood", wd, kitCylG(0.05, 0.06, 3.4, 5), 0, 2.05, 0.3);
if (!lite)
kitAddF(B, F, "plain", sl, kitCylG(0.14, 0.14, 1.6, 6), 0, 0.6, -0.2, 0, Math.PI / 2);
return 1.9;
},
function (B, S, F, r) {
var cap = kitCol(kitPick([0xB83A3A, 0x8A3A7A, 0xC86A2A], r())), st = kitCol(0xE8DCC8), lite = kitLite();
var stem = kitCylG(0.35, 0.55, 2.4, lite ? 6 : 10);
kitAddF(B, F, "plain", st, stem, 0, 1.2, -0.4, 0, 0.12);
var cg = new THREE.SphereGeometry(2.0, lite ? 10 : 16, lite ? 5 : 8, 0, Math.PI * 2, 0, Math.PI / 2);
cg.scale(1, 0.45, 1);
kitAddF(B, F, "plain", cap, cg, 0, 2.35, -0.2);
if (!lite)
for (var s = 0; s < 8; s++) {
var a = s / 8 * Math.PI * 2 + r();
kitAddF(B, F, "plain", kitCol(0xF4EEE4), kitBallG(0.16, 0), Math.cos(a) * 1.3, 2.95, Math.sin(a) * 1.3 - 0.2);
}
kitAddF(B, F, "wood", kitCol(0x5A4430), kitBoxG(2.4, 0.5, 0.5), 0, 0.7, 0.9, 0, 0, 0.05);
kitAddF(B, F, "wood", kitCol(0x4A3826), kitBoxG(0.4, 0.75, 0.4), -1.0, 0.35, 0.9);
kitAddF(B, F, "wood", kitCol(0x4A3826), kitBoxG(0.4, 0.75, 0.4), 1.0, 0.35, 0.9);
for (var j = 0; j < (lite ? 2 : 6); j++)
kitAddF(B, F, "glow", kitCol(kitPick([0x9AE8C8, 0xE8D07A, 0xC8A0F0], r())), kitCylG(0.08, 0.08, 0.22, 6), -0.9 + j * 0.36, 1.06, 0.9);
F.keeper = [0, 0.2];
return 2.0;
},
function (B, S, F, r) {
var sh = kitCol(0x8A5A32, 0.9 + r() * 0.2), lf = kitCol(0x4A7A3A), lite = kitLite();
var g = new THREE.SphereGeometry(0.7, lite ? 8 : 12, lite ? 4 : 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
g.scale(1, 0.7, 1.4);
kitAddF(B, F, "wood", sh, g, 0, 0.95, 0);
var wh = new THREE.TorusGeometry(0.4, 0.07, 4, lite ? 8 : 12);
wh.rotateY(Math.PI / 2);
[-0.75, 0.75].forEach(function (sx) { kitAddF(B, F, "leafy", lf, wh.clone(), sx, 0.42, 0); });
kitGoods(B, S, F, r, -0.35, 0.35, 1.0, 0, lite ? 3 : 6);
return 1.1;
},
function (B, S, F, r) {
var wh = kitCol(0xE8E6E0), rib = kitCol(0xB8B4AC), lite = kitLite();
var d = new THREE.SphereGeometry(1.8, lite ? 10 : 16, lite ? 5 : 8, 0, Math.PI * 2, 0, Math.PI / 2);
kitAddF(B, F, "plain", wh, d, 0, 0, -0.6);
if (!lite)
for (var i = 0; i < 4; i++) {
var t = new THREE.TorusGeometry(1.8, 0.04, 4, 16, Math.PI);
t.rotateY(i * Math.PI / 4);
kitAddF(B, F, "metal", rib, t, 0, 0, -0.6);
}
kitAddF(B, F, "metal", rib, kitBoxG(0.9, 1.4, 0.5), 0, 0.7, 1.05);
kitAddF(B, F, "glow", kitCol(S.pal.lit || 0xFFE0B0), kitBoxG(0.6, 1.0, 0.02), 0, 0.7, 1.31);
kitAddF(B, F, "metal", kitCol(S.pal.metal || 0x4A4A50, 1.3), kitBoxG(2.4, 0.08, 0.6), 0, 0.9, 1.6);
[-1.1, 1.1].forEach(function (x) { kitAddF(B, F, "metal", rib, kitBoxG(0.08, 0.9, 0.5), x, 0.45, 1.6); });
for (var c = 0; c < (lite ? 3 : 7); c++)
kitAddF(B, F, "metal", kitCol(kitPick([0xD8D4CC, 0x6A9AC8, 0xC8A040], r())), kitCylG(0.08, 0.08, 0.4, 6), -1.0 + c * 0.33, 1.14, 1.6);
F.keeper = [0.9, 1.1];
return 2.0;
},
function (B, S, F, r) {
var fr = kitCol(0xC8C4BC), dk = kitCol(0x3A3A40), lite = kitLite();
kitAddF(B, F, "metal", fr, kitBoxG(1.4, 0.08, 2.4), 0, 0.7, 0);
[-0.7, 0.7].forEach(function (x) { kitAddF(B, F, "metal", fr, kitBoxG(0.06, 0.4, 2.4), x, 0.88, 0); });
var w = new THREE.TorusGeometry(0.36, 0.1, lite ? 4 : 6, lite ? 8 : 12);
w.rotateY(Math.PI / 2);
[[-0.85, 0.8], [0.85, 0.8], [-0.85, -0.8], [0.85, -0.8]].forEach(function (p) { kitAddF(B, F, "metal", dk, w.clone(), p[0], 0.4, p[1]); });
kitAddF(B, F, "metal", fr, kitCylG(0.03, 0.03, 1.2, 4), 0.5, 1.4, -0.9);
var dish = new THREE.SphereGeometry(0.35, 10, 4, 0, Math.PI * 2, 0, Math.PI / 3);
dish.rotateX(-0.9);
kitAddF(B, F, "metal", kitCol(0xE8E4DC), dish, 0.5, 2.0, -0.9);
kitGoods(B, S, F, r, -0.4, 0.4, 0.85, 0.2, lite ? 2 : 5);
return 1.6;
},
function (B, S, F, r) {
var wk = kitCol(0xB89A62), bag = kitCol(kitPick(S.pal.canvas, r())[0]), m = kitCol(S.pal.metal || 0x6A5A48), lite = kitLite();
[-1.4, 1.4].forEach(function (x) { kitAddF(B, F, "metal", m, kitCylG(0.05, 0.06, 3.4, 5), x, 1.7, 0); });
kitAddF(B, F, "metal", m, kitBoxG(2.9, 0.08, 0.08), 0, 3.4, 0);
var g = new THREE.SphereGeometry(1.0, lite ? 8 : 14, lite ? 5 : 8);
g.scale(1.6, 0.7, 0.9);
kitAddF(B, F, "plain", bag, g, 0, 4.2, 0);
kitAddF(B, F, "wood", wk, kitBoxG(2.2, 0.8, 1.1), 0, 1.0, 0.2);
kitAddF(B, F, "wood", wk.clone().multiplyScalar(0.8), kitBoxG(2.3, 0.08, 1.2), 0, 1.42, 0.2);
if (!lite)
[-0.9, 0.9].forEach(function (x) { kitAddF(B, F, "metal", m, kitCylG(0.015, 0.015, 2.0, 3), x, 2.4, 0.2); });
kitGoods(B, S, F, r, -0.9, 0.9, 1.52, 0.2, lite ? 4 : 8);
F.keeper = [0, -0.6];
return 1.8;
},
function (B, S, F, r) {
var m = kitCol(S.pal.metal || 0x6A5A48, 1.3), y = kitCol(0xC8A040), lite = kitLite();
kitAddF(B, F, "metal", m, kitBoxG(1.2, 0.15, 2.2), 0, 0.2, 0);
kitAddF(B, F, "metal", y, kitCylG(0.08, 0.1, 2.0, 6), 0, 1.2, -0.6);
kitAddF(B, F, "metal", y, kitBoxG(0.1, 0.1, 1.6), 0, 2.15, 0.1, 0, -0.3);
kitAddF(B, F, "metal", kitCol(0xD8D4C8), kitCylG(0.3, 0.3, 0.8, lite ? 6 : 10), 0, 0.7, 0.5);
if (!lite)
kitAddF(B, F, "glow", kitCol(0xE8C878), kitBoxG(0.3, 0.06, 0.02), 0, 0.9, 0.81);
return 1.4;
},
function (B, S, F, r) {
var st = kitCol(S.pal.wall && S.pal.wall[0] || 0x5A5550, 1.1), cu = kitCol(0xB8743A), lite = kitLite(), w = 2.8;
kitAddF(B, F, "stone", st, kitBoxG(w, 1.0, 0.9), 0, 0.5, 0.2);
kitAddF(B, F, "stone", st.clone().multiplyScalar(1.1), kitBoxG(w + 0.2, 0.1, 1.05), 0, 1.05, 0.2);
[-w / 2, w / 2].forEach(function (x) { kitAddF(B, F, "metal", cu, kitCylG(0.05, 0.06, 2.4, 5), x, 1.2, -0.5); });
kitAddF(B, F, "metal", cu, kitBoxG(w + 0.6, 0.05, 1.8), 0, 2.45, 0.1, 0, 0.15);
for (var row = 0; row < (lite ? 1 : 2); row++)
for (var c = 0; c < (lite ? 4 : 8); c++)
kitAddF(B, F, "glow", kitCol(kitPick([0xF0C860, 0xE8E0A0, 0xF0A040], r())), kitBoxG(0.12, 0.24, 0.12), -w / 2 + 0.3 + c * (w - 0.6) / ((lite ? 4 : 8) - 1), 1.24, 0.0 + row * 0.35);
F.keeper = [0, -0.6];
return 1.7;
},
function (B, S, F, r) {
var m = kitCol(0x4A4440), rl = kitCol(0x6A5E54), ore = kitCol(kitPick([0xE0C060, 0x8A7A6A, 0xC8603A], r())), lite = kitLite();
[-0.45, 0.45].forEach(function (x) { kitAddF(B, F, "metal", rl, kitBoxG(0.07, 0.07, 3.0), x, 0.04, 0); });
if (!lite)
for (var t = 0; t < 5; t++)
kitAddF(B, F, "wood", kitCol(0x4A3A2A), kitBoxG(1.2, 0.06, 0.18), 0, 0.01, -1.2 + t * 0.6);
kitAddF(B, F, "metal", m, kitBoxG(1.1, 0.7, 1.5), 0, 0.65, 0);
var wh = new THREE.CylinderGeometry(0.2, 0.2, 0.08, lite ? 6 : 10);
wh.rotateZ(Math.PI / 2);
[[-0.45, 0.5], [0.45, 0.5], [-0.45, -0.5], [0.45, -0.5]].forEach(function (p) { kitAddF(B, F, "metal", m, wh.clone(), p[0], 0.22, p[1]); });
for (var o = 0; o < (lite ? 3 : 7); o++)
kitAddF(B, F, "stone", ore, kitBallG(0.18, 0), -0.3 + r() * 0.6, 1.05, -0.5 + r() * 1.0);
return 1.6;
},
function (B, S, F, r) {
var lite = kitLite(), w = 3.2, sc = kitCol(0x7A7A7A);
[[-w / 2, -0.8], [w / 2, -0.8], [-w / 2, 0.9], [w / 2, 0.9]].forEach(function (p, i) { kitAddF(B, F, "metal", sc, kitCylG(0.04, 0.04, i < 2 ? 2.8 : 2.2, 5), p[0], i < 2 ? 1.4 : 1.1, p[1]); });
for (var p = 0; p < (lite ? 2 : 4); p++)
kitAddF(B, F, "metal", kitCol(kitPick([0x8A5A3A, 0x6A7A7A, 0x9A8A5A, 0x5A6A5A], r())), kitBoxG(w / (lite ? 2 : 4) + 0.15, 0.04, 2.0), -w / 2 + (p + 0.5) * w / (lite ? 2 : 4), 2.55 - (p % 2) * 0.05, 0.05, 0, 0.22, (r() - 0.5) * 0.06);
kitAddF(B, F, "metal", kitCol(0x6A6A6A), kitBoxG(w, 1.6, 0.05), 0, 0.8, -0.8);
kitAddF(B, F, "wood", kitCol(0x7A6248), kitBoxG(w - 0.3, 0.08, 0.7), 0, 0.9, 0.6);
[-1.2, 1.2].forEach(function (x) { kitAddF(B, F, "metal", kitCol(0x3A3A3A), kitCylG(0.3, 0.3, 0.85, 8), x, 0.43, 0.6); });
for (var j = 0; j < (lite ? 3 : 6); j++)
kitAddF(B, F, "plain", kitCol(kitPick([0x3A6AA8, 0xC8A040, 0xD8D8D0], r())), kitBoxG(0.22, 0.32, 0.14), -1.2 + j * 0.46, 1.1, 0.6);
if (!lite) {
var ty = new THREE.TorusGeometry(0.35, 0.12, 6, 10);
ty.rotateX(Math.PI / 2);
kitAddF(B, F, "plain", kitCol(0x1E1E1E), ty.clone(), w / 2 + 0.5, 0.12, 0.2);
kitAddF(B, F, "plain", kitCol(0x1E1E1E), ty, w / 2 + 0.5, 0.36, 0.2);
kitAddF(B, F, "plain", kitCol(kitPick(S.pal.canvas, r())[0]), kitBoxG(1.2, 0.45, 0.04), 0, 2.3, 1.0);
}
F.keeper = [0, -0.2];
return 1.9;
},
function (B, S, F, r) {
var wd = kitCol(0x6A5A44), lite = kitLite();
kitAddF(B, F, "wood", wd, kitBoxG(1.3, 0.1, 1.8), 0, 0.6, 0);
kitAddF(B, F, "wood", wd, kitBoxG(0.08, 0.08, 1.6), 0.4, 0.55, 1.6, 0, 0.1);
kitAddF(B, F, "wood", wd, kitBoxG(0.08, 0.08, 1.6), -0.4, 0.55, 1.6, 0, 0.1);
var wh = new THREE.TorusGeometry(0.45, 0.09, 4, lite ? 8 : 12);
wh.rotateY(Math.PI / 2);
[-0.75, 0.75].forEach(function (x) { kitAddF(B, F, "plain", kitCol(0x1E1E1E), wh.clone(), x, 0.45, 0); });
for (var d = 0; d < (lite ? 2 : 4); d++)
kitAddF(B, F, "metal", kitCol(kitPick([0x2A5A8A, 0x3A6A9A, 0x5A6A5A], r())), kitCylG(0.27, 0.27, 0.8, lite ? 6 : 10), (d % 2 ? 0.3 : -0.3), 1.05, d < 2 ? -0.4 : 0.4);
return 1.4;
},
function (B, S, F, r) {
var rk = kitCol(0x3E3834, 0.9 + r() * 0.2), lite = kitLite();
kitAddF(B, F, "stone", rk, kitBoxG(3.2, 2.9, 0.9), 0, 1.45, -0.9);
kitAddF(B, F, "stone", rk, kitBoxG(0.6, 2.9, 1.4), -1.5, 1.45, -0.2);
kitAddF(B, F, "stone", rk, kitBoxG(0.6, 2.9, 1.4), 1.5, 1.45, -0.2);
kitAddF(B, F, "stone", kitCol(0x4A423C), kitBoxG(3.8, 0.35, 1.7), 0, 3.05, -0.35);
kitAddF(B, F, "stone", kitCol(0x5A524A), kitBoxG(2.6, 0.9, 0.6), 0, 0.45, 0.55);
kitAddF(B, F, "stone", kitCol(0x6A6058), kitBoxG(2.8, 0.08, 0.75), 0, 0.94, 0.55);
kitAddF(B, F, "metal", kitCol(0x6A5030), kitCylG(0.015, 0.015, 0.6, 4), 0, 2.6, 0.2);
kitAddF(B, F, "glow", kitCol(0xF0A050), kitBallG(0.16, 1), 0, 2.2, 0.2);
for (var j = 0; j < (lite ? 3 : 7); j++)
kitAddF(B, F, "plain", kitCol(kitPick([0xC84A5A, 0xD8D8E0, 0x9A2A3A, 0xB8BCC8], r())), kitBallG(0.07, 0), -1.0 + j * (2.0 / (lite ? 2 : 6)), 1.02, 0.55 + (r() - 0.5) * 0.2);
if (!lite) {
kitAddF(B, F, "metal", kitCol(0xB8BCC8), kitBoxG(0.5, 0.05, 0.3), -0.7, 0.99, 0.5);
kitAddF(B, F, "wood", kitCol(0x4A3A2A), kitBoxG(0.5, 0.05, 0.3), 0.7, 0.99, 0.5);
}
F.keeper = [0, -0.1];
return 2.0;
},
function (B, S, F, r) {
var ir = kitCol(0x4A4440), lite = kitLite();
[-0.45, 0.45].forEach(function (x) { kitAddF(B, F, "metal", kitCol(0x5A5650), kitBoxG(0.08, 0.08, 3.0), x, 0.04, 0); });
if (!lite)
for (var s = 0; s < 5; s++)
kitAddF(B, F, "wood", kitCol(0x4A3A2A), kitBoxG(1.3, 0.06, 0.18), 0, 0.01, -1.2 + s * 0.6);
kitAddF(B, F, "metal", ir, kitBoxG(1.1, 0.7, 1.4), 0, 0.65, 0);
kitAddF(B, F, "metal", kitCol(0x3A3430), kitBoxG(1.2, 0.08, 1.5), 0, 1.0, 0);
[[-0.45, -0.5], [0.45, -0.5], [-0.45, 0.5], [0.45, 0.5]].forEach(function (p) { var g = kitCylG(0.2, 0.2, 0.08, lite ? 6 : 10); g.rotateZ(Math.PI / 2); kitAddF(B, F, "metal", kitCol(0x2A2624), g, p[0], 0.22, p[1]); });
for (var k = 0; k < (lite ? 3 : 7); k++)
kitAddF(B, F, "stone", kitCol(kitPick([0x6A6470, 0x8A3A44, 0xA8ACB8], r())), kitBallG(0.18, 0), (r() - 0.5) * 0.7, 1.08 + r() * 0.1, (r() - 0.5) * 1.0);
return 1.6;
},
function (B, S, F, r) {
var st = kitCol(0x4E4038, 0.9 + r() * 0.2), lite = kitLite();
kitAddF(B, F, "stone", st, kitBoxG(1.6, 1.1, 1.4), -0.9, 0.55, -0.4);
kitAddF(B, F, "stone", st, kitConeG(0.8, 1.4, lite ? 4 : 6), -0.9, 1.8, -0.4);
kitAddF(B, F, "stone", kitCol(0x2E2622), kitCylG(0.22, 0.25, 1.6, 6), -0.9, 3.1, -0.4);
kitAddF(B, F, "glow", kitCol(0xFF7A2A), kitBoxG(0.9, 0.35, 0.05), -0.9, 0.85, 0.31);
kitAddF(B, F, "wood", kitCol(0x3A2A1E), kitCylG(0.3, 0.34, 0.6, 8), 0.6, 0.3, 0.3);
kitAddF(B, F, "metal", kitCol(0x2A2A2C), kitBoxG(0.7, 0.22, 0.28), 0.6, 0.71, 0.3);
kitAddF(B, F, "metal", kitCol(0x2A2A2C), kitConeG(0.12, 0.35, 4), 1.08, 0.71, 0.3, 0, 0, -Math.PI / 2);
kitAddF(B, F, "stone", kitCol(0x3A322C), kitBoxG(1.0, 0.5, 0.5), 1.3, 0.25, -0.8);
if (!lite)
kitAddF(B, F, "plain", kitCol(0x2A3A44), kitBoxG(0.9, 0.04, 0.4), 1.3, 0.48, -0.8);
kitAddF(B, F, "wood", kitCol(0x3A2A1E), kitBoxG(1.6, 0.08, 0.08), 0.6, 1.7, -1.0);
kitAddF(B, F, "wood", kitCol(0x3A2A1E), kitBoxG(0.08, 1.7, 0.08), -0.15, 0.85, -1.0);
kitAddF(B, F, "wood", kitCol(0x3A2A1E), kitBoxG(0.08, 1.7, 0.08), 1.35, 0.85, -1.0);
for (var b = 0; b < (lite ? 3 : 6); b++)
kitAddF(B, F, "metal", kitCol(0xC8C8CC), kitBoxG(0.05, 1.0, 0.02), 0.0 + b * 0.25, 1.15, -0.97);
F.keeper = [0.2, -0.2];
return 1.9;
},
function (B, S, F, r) {
var ir = kitCol(0x3A3432), lite = kitLite();
kitAddF(B, F, "metal", ir, kitBoxG(0.1, 0.1, 2.0), 0.35, 0.55, 0.4, 0, 0.1);
kitAddF(B, F, "metal", ir, kitBoxG(0.1, 0.1, 2.0), -0.35, 0.55, 0.4, 0, 0.1);
var wh = new THREE.TorusGeometry(0.5, 0.1, 4, lite ? 8 : 12);
wh.rotateY(Math.PI / 2);
[-0.6, 0.6].forEach(function (x) { kitAddF(B, F, "metal", kitCol(0x2A2624), wh.clone(), x, 0.5, 0); });
kitAddF(B, F, "metal", kitCol(0x4A3A32), kitCylG(0.4, 0.3, 0.6, lite ? 6 : 10), 0, 0.95, 0);
kitAddF(B, F, "glow", kitCol(0xFF8A30), kitCylG(0.34, 0.34, 0.03, lite ? 6 : 10), 0, 1.24, 0);
return 1.3;
},
function (B, S, F, r) {
var lq = kitCol(kitPick([0xA82A22, 0x8A1E1A], r())), rf = kitCol(kitPick([0x2E4A3E, 0x3A3A44, 0x6A4A2A], r())), lite = kitLite(), w = 2.8;
[[-w / 2, -1], [w / 2, -1], [-w / 2, 1], [w / 2, 1]].forEach(function (p) { kitAddF(B, F, "wood", lq, kitCylG(0.08, 0.08, 2.6, 6), p[0], 1.3, p[1]); });
kitAddF(B, F, "wood", lq, kitBoxG(w + 0.3, 0.14, 2.3), 0, 2.62, 0);
var r1 = kitConeG(2.4, 0.7, 4);
r1.rotateY(Math.PI / 4);
r1.scale(1.0, 1, 0.85);
kitAddF(B, F, "tile", rf, r1, 0, 3.0, 0);
if (!lite) {
var r2 = kitConeG(1.4, 0.6, 4);
r2.rotateY(Math.PI / 4);
kitAddF(B, F, "tile", rf, r2, 0, 3.55, 0);
kitAddF(B, F, "metal", kitCol(0xC8A040), kitBallG(0.12, 1), 0, 3.95, 0);
}
kitAddF(B, F, "wood", kitCol(0x3A2418), kitBoxG(1.8, 0.45, 0.8), 0, 0.22, 0.2);
kitAddF(B, F, "wood", kitCol(0x4A2E1E), kitBoxG(2.0, 0.06, 0.95), 0, 0.47, 0.2);
for (var t = 0; t < (lite ? 2 : 5); t++) {
var px = -0.7 + t * 0.35;
kitAddF(B, F, "plain", kitCol(kitPick([0xE8E4D8, 0x5A8A7A, 0x3A5A8A], r())), kitBallG(0.09, 1), px, 0.58, 0.2);
}
if (!lite)
[-0.4, 0.4].forEach(function (x) { kitAddF(B, F, "glow", kitCol(0xFFD8A0), kitCylG(0.14, 0.14, 0.32, 6), x * 3.2, 2.25, 1.0); });
F.keeper = [0, -0.6];
return 2.3;
},
function (B, S, F, r) {
var lq = kitCol(0xA82A22), lite = kitLite();
kitAddF(B, F, "wood", kitCol(0x3A2418), kitBoxG(0.08, 0.08, 3.4), 0.45, 0.9, 0);
kitAddF(B, F, "wood", kitCol(0x3A2418), kitBoxG(0.08, 0.08, 3.4), -0.45, 0.9, 0);
kitAddF(B, F, "wood", lq, kitBoxG(0.9, 0.9, 1.2), 0, 1.3, 0);
kitAddF(B, F, "plain", kitCol(0xE8D8B0), kitBoxG(0.92, 0.5, 0.7), 0, 1.4, 0);
var rf = kitConeG(0.95, 0.45, 4);
rf.rotateY(Math.PI / 4);
kitAddF(B, F, "tile", kitCol(0x2E4A3E), rf, 0, 2.0, 0);
[[-0.45, -1.5], [0.45, -1.5], [-0.45, 1.5], [0.45, 1.5]].forEach(function (p) { if (!lite)
kitAddF(B, F, "wood", kitCol(0x3A2418), kitBoxG(0.1, 0.9, 0.1), p[0], 0.45, p[1]); });
return 1.8;
},
function (B, S, F, r) {
var stl = kitCol(0x5A5E66), lite = kitLite(), w = 3.0;
[[-w / 2, -0.7], [w / 2, -0.7], [-w / 2, 0.8], [w / 2, 0.8]].forEach(function (p) { kitAddF(B, F, "metal", stl, kitBoxG(0.08, 2.6, 0.08), p[0], 1.3, p[1]); });
for (var s = 0; s < (lite ? 3 : 7); s++)
kitAddF(B, F, "metal", kitCol(0x3E424A), kitBoxG(w + 0.2, 0.04, 0.16), 0, 2.62, -0.7 + s * (1.5 / (lite ? 2 : 6)));
kitAddF(B, F, "metal", kitCol(0x4A4E56), kitBoxG(w - 0.2, 0.08, 0.8), 0, 0.9, 0.5);
kitAddF(B, F, "metal", kitCol(0x3A3E46), kitBoxG(w - 0.3, 0.8, 0.05), 0, 0.45, 0.85);
for (var c = 0; c < (lite ? 2 : 5); c++) {
var g = kitCylG(0.06, 0.06, 0.7, 6);
g.rotateZ(Math.PI / 2);
kitAddF(B, F, "plain", kitCol(kitPick([0xE8DCC0, 0xC8D0E8, 0xD8C8A0], r())), g, -0.9 + c * 0.22, 1.0, 0.5);
}
var tx = 0.8;
[[0, 0.25], [0.22, -0.15], [-0.22, -0.15]].forEach(function (p) { kitAddF(B, F, "wood", kitCol(0x3A2A1E), kitBoxG(0.04, 1.0, 0.04), tx + p[0] * 0.5, 1.42, 0.4 + p[1] * 0.5, 0, p[1], p[0]); });
var tb = kitCylG(0.07, 0.1, 1.2, 8);
tb.rotateX(Math.PI / 2 - 0.6);
kitAddF(B, F, "metal", kitCol(0xC8A050), tb, tx, 2.0, 0.4);
if (!lite)
kitAddF(B, F, "glow", kitCol(0xD8E4FF), kitBoxG(0.5, 0.35, 0.03), -0.6, 1.25, -0.68);
F.keeper = [0, -0.2];
return 1.9;
},
function (B, S, F, r) {
var stl = kitCol(0x5A5E66), lite = kitLite();
kitAddF(B, F, "metal", stl, kitBoxG(1.2, 0.1, 1.6), 0, 0.35, 0);
[[-0.5, -0.65], [0.5, -0.65], [-0.5, 0.65], [0.5, 0.65]].forEach(function (p) { kitAddF(B, F, "metal", kitCol(0x2A2A2E), kitBallG(0.13, 0), p[0], 0.15, p[1]); });
kitAddF(B, F, "metal", stl, kitBoxG(0.1, 0.9, 0.1), -0.55, 0.85, 0);
kitAddF(B, F, "metal", stl, kitBoxG(0.1, 0.9, 0.1), 0.55, 0.85, 0);
var ld = kitCylG(0.55, 0.55, 0.12, lite ? 10 : 18);
ld.rotateZ(Math.PI / 2);
ld.rotateY(Math.PI / 2);
kitAddF(B, F, "metal", kitCol(0x8A8E98), ld, 0, 1.0, 0);
if (!lite) {
var lf = kitCylG(0.48, 0.48, 0.02, 18);
lf.rotateX(Math.PI / 2);
kitAddF(B, F, "metal", kitCol(0x6A7A9A), lf, 0, 1.0, 0.07);
}
return 1.2;
},
function (B, S, F, r) {
var lite = kitLite(), hc = kitCol(kitPick([0x2A5A8A, 0x8A2A22, 0x2E6A4A, 0xD8D0C0], r())), wd = kitCol(0x6A5038);
[[-1.4, -0.7], [1.4, -0.7], [-1.4, 0.7], [1.4, 0.7]].forEach(function (p) { kitAddF(B, F, "wood", wd, kitBoxG(0.12, 2.4, 0.12), p[0], 1.2, p[1]); });
var hull = new THREE.SphereGeometry(1.0, lite ? 8 : 14, lite ? 4 : 6, 0, Math.PI * 2, 0, Math.PI / 2);
hull.scale(1.9, 0.6, 0.95);
kitAddF(B, F, "wood", hc, hull, 0, 2.35, 0);
if (!lite)
kitAddF(B, F, "wood", kitCol(0x4A3A2A), kitBoxG(3.9, 0.1, 0.1), 0, 2.95, 0);
kitAddF(B, F, "wood", wd, kitBoxG(2.8, 0.1, 0.9), 0, 0.85, 0.3);
kitAddF(B, F, "wood", wd, kitBoxG(2.6, 0.75, 0.05), 0, 0.42, 0.72);
kitAddF(B, F, "plain", kitCol(0xD8E4EC), kitBoxG(2.4, 0.06, 0.7), 0, 0.93, 0.3);
for (var j = 0; j < (lite ? 3 : 8); j++) {
var fg = kitBallG(0.1, 0);
fg.scale(2.4, 0.6, 0.9);
kitAddF(B, F, "plain", kitCol(kitPick([0x8A9AA8, 0xA8B0B8, 0xC87A5A, 0x5A6A7A], r())), fg, -1.0 + j * (2.0 / (lite ? 2 : 7)), 1.0, 0.3 + (r() - 0.5) * 0.3, (r() - 0.5) * 0.6);
}
if (!lite) {
var rp = new THREE.TorusGeometry(0.3, 0.08, 5, 12);
rp.rotateX(Math.PI / 2);
kitAddF(B, F, "thatch", kitCol(0xC8B080), rp, 1.9, 0.1, 0.6);
kitAddF(B, F, "metal", kitCol(0x8A7A5A), kitCylG(0.2, 0.2, 0.04, 10), -1.0, 1.25, -0.2);
}
F.keeper = [0, -0.3];
return 2.1;
},
function (B, S, F, r) {
var wd = kitCol(0x6A5038), lite = kitLite();
kitAddF(B, F, "wood", wd, kitBoxG(1.2, 0.1, 1.7), 0, 0.6, 0);
[-0.6, 0.6].forEach(function (x) { kitAddF(B, F, "wood", wd, kitBoxG(0.06, 0.35, 1.7), x, 0.8, 0); });
kitAddF(B, F, "wood", wd, kitBoxG(0.07, 0.07, 1.4), 0.35, 0.55, 1.5, 0, 0.12);
kitAddF(B, F, "wood", wd, kitBoxG(0.07, 0.07, 1.4), -0.35, 0.55, 1.5, 0, 0.12);
var wh = new THREE.TorusGeometry(0.42, 0.06, 4, lite ? 8 : 12);
wh.rotateY(Math.PI / 2);
[-0.7, 0.7].forEach(function (x) { kitAddF(B, F, "wood", kitCol(0x3A2A1E), wh.clone(), x, 0.42, 0); });
var nt = kitBallG(0.55, 1);
nt.scale(1, 0.45, 1.3);
kitAddF(B, F, "leafy", kitCol(kitPick([0x3A5A4A, 0x6A5A3A], r())), nt, 0, 0.85, -0.25);
for (var p = 0; p < (lite ? 1 : 2); p++) {
var pot = kitCylG(0.3, 0.3, 0.5, lite ? 6 : 8);
pot.rotateZ(Math.PI / 2);
kitAddF(B, F, "wood", kitCol(0x8A6A44), pot, (p ? 0.25 : -0.25), 0.95, 0.5);
}
return 1.3;
},
function (B, S, F, r) {
var wd = kitCol(kitPick([0x5A4434, 0x3A3A40], r())), lite = kitLite();
kitAddF(B, F, "wood", wd, kitBoxG(3.0, 0.12, 0.6), 0, 0.06, -0.5);
kitAddF(B, F, "wood", wd, kitBoxG(3.0, 0.1, 0.1), 0, 2.2, -0.75);
[-1.45, 1.45].forEach(function (x) { kitAddF(B, F, "wood", wd, kitBoxG(0.1, 2.3, 0.1), x, 1.15, -0.75); });
for (var p = 0; p < (lite ? 2 : 4); p++) {
var px = -1.05 + p * 0.7;
kitAddF(B, F, "wet", kitCol(0xC8D4E0), kitBoxG(0.6, 1.8, 0.03), px, 1.05, -0.5, 0, -0.12);
kitAddF(B, F, "metal", kitCol(0xB8BCC4), kitBoxG(0.66, 0.05, 0.05), px, 1.97, -0.6, 0, -0.12);
}
kitAddF(B, F, "wood", wd, kitBoxG(2.6, 0.85, 0.7), 0, 0.43, 0.6);
kitAddF(B, F, "plain", kitCol(0xD8D8DC), kitBoxG(2.7, 0.05, 0.8), 0, 0.88, 0.6);
for (var m = 0; m < (lite ? 2 : 5); m++) {
var mg = kitCylG(0.13, 0.13, 0.03, lite ? 6 : 12);
mg.rotateX(Math.PI / 2 - 0.4);
kitAddF(B, F, "metal", kitCol(0xC0C4CC), mg, -1.0 + m * 0.5, 1.02, 0.55);
}
F.keeper = [0.4, 0.0];
return 1.9;
},
function (B, S, F, r) {
var wd = kitCol(0x5A4434), lite = kitLite();
kitAddF(B, F, "wood", wd, kitBoxG(1.0, 0.1, 2.0), 0, 0.55, 0);
var wh = new THREE.TorusGeometry(0.38, 0.06, 4, lite ? 8 : 12);
wh.rotateY(Math.PI / 2);
[-0.6, 0.6].forEach(function (x) { kitAddF(B, F, "wood", kitCol(0x2A2420), wh.clone(), x, 0.38, 0); });
[-1, 1].forEach(function (s) { kitAddF(B, F, "wood", wd, kitBoxG(0.06, 1.3, 1.8), s * 0.18, 1.15, 0, 0, 0, s * 0.25); for (var g = 0; g < (lite ? 1 : 3); g++)
kitAddF(B, F, "wet", kitCol(0xC8D4E0), kitBoxG(0.02, 1.1, 1.6), s * (0.26 + g * 0.05), 1.12, 0, 0, 0, s * 0.25); });
return 1.3;
},
function (B, S, F, r) {
var sc = kitCol(kitPick([0x6AD8C8, 0x9AC8E8, 0xD8A8C8], r()), 0.85), lite = kitLite(), n = lite ? 4 : 7;
for (var i = 0; i < n; i++) {
var t = i / n, tb = 0.42 - t * 0.28, g = new THREE.TorusGeometry(1.25 - t * 1.0, tb, lite ? 5 : 8, lite ? 10 : 18);
g.rotateX(Math.PI / 2);
kitAddF(B, F, "glass", sc.clone().multiplyScalar(0.8 + (i % 2) * 0.3), g, Math.cos(t * 6) * 0.12, 0.42 + t * 2.6, -0.35 + Math.sin(t * 6) * 0.12);
}
kitAddF(B, F, "glass", sc.clone().multiplyScalar(1.1), kitBallG(0.16, 1), 0, 3.1, -0.35);
kitAddF(B, F, "plain", kitCol(0xE8E0D0), kitBoxG(2.2, 0.85, 0.7), 0, 0.43, 1.35);
kitAddF(B, F, "plain", kitCol(0xD0C8B8), kitBoxG(2.4, 0.06, 0.85), 0, 0.88, 1.35);
for (var j = 0; j < (lite ? 3 : 7); j++) {
var k = kitPick([0, 1], r());
if (k)
kitAddF(B, F, "glow", kitCol(kitPick([0x6AD8C8, 0xB8F0E8, 0xC8A0F0], r())), kitConeG(0.06, 0.24, 5), -0.9 + j * 0.3, 1.03, 1.25);
else
kitAddF(B, F, "plain", kitCol(kitPick([0xC87A3A, 0x8AAA4A, 0xE8C050], r())), kitBallG(0.08, 0), -0.9 + j * 0.3, 0.97, 1.25);
}
F.keeper = [0, 0.7];
return 1.9;
},
function (B, S, F, r) {
var rd = kitCol(0x9A8A5A), lite = kitLite();
for (var s = 0; s < (lite ? 3 : 6); s++)
kitAddF(B, F, "thatch", rd, kitCylG(0.07, 0.07, 2.0, 5), -0.4 + s * (0.8 / ((lite ? 3 : 6) - 1)), 0.32, 0, 0, Math.PI / 2);
[-0.5, 0.5].forEach(function (x) { kitAddF(B, F, "wood", kitCol(0x6A5A3A), kitBoxG(0.08, 0.12, 2.2), x, 0.1, 0); });
for (var p = 0; p < (lite ? 3 : 6); p++) {
var pg = kitBallG(0.22, 1);
pg.scale(1, 1.4, 1);
kitAddF(B, F, p % 2 ? "glow" : "plain", kitCol(kitPick([0x6AD8C8, 0xC8A0F0, 0x8AAA4A, 0xC87A3A], r()), p % 2 ? 0.8 : 1), pg, (r() - 0.5) * 0.6, 0.6, -0.7 + p * 0.28);
}
return 1.2;
},
function (B, S, F, r) {
var st = kitCol(0xD8D4E0, 0.9 + r() * 0.1), lite = kitLite();
kitAddF(B, F, "marble", st, kitCylG(0.9, 1.05, 0.25, lite ? 8 : 14), 0, 0.12, 0);
kitAddF(B, F, "marble", st, kitCylG(0.18, 0.26, 1.0, lite ? 6 : 10), 0, 0.75, 0);
kitAddF(B, F, "marble", st, kitBoxG(1.0, 0.08, 0.7), 0, 1.3, 0, 0, 0.25);
kitAddF(B, F, "plain", kitCol(kitPick([0x3A2A5A, 0x2A3A5A, 0x5A2A3A], r())), kitBoxG(0.6, 0.06, 0.42), 0, 1.37, 0.02, 0, 0.25);
kitAddF(B, F, "glow", kitCol(0xC8E0FF), kitBallG(0.2, 1), 0, 2.6, 0);
if (!lite)
for (var c = 0; c < 5; c++) {
var a = c / 5 * 6.283;
kitAddF(B, F, "glass", kitCol(0x9AB8E8), kitConeG(0.07, 0.5, 5), Math.cos(a) * 0.85, 0.5, Math.sin(a) * 0.85, 0, (r() - 0.5) * 0.3);
}
[-1.3, 1.3].forEach(function (x) { kitAddF(B, F, "marble", st, kitBoxG(0.45, 0.45, 0.45), x, 0.22, 0.6); });
F.keeper = [0, -0.8];
return 1.6;
},
function (B, S, F, r) {
var st = kitCol(0x6A6878), lite = kitLite();
var sl = kitCylG(0.9, 0.6, 0.35, lite ? 6 : 8);
sl.scale(1, 1, 1.4);
kitAddF(B, F, "stone", st, sl, 0, 0.75, 0);
if (!lite)
kitAddF(B, F, "glow", kitCol(0x9AB8E8, 0.6), kitCylG(0.5, 0.5, 0.02, 10), 0, 0.12, 0);
for (var c = 0; c < (lite ? 2 : 5); c++)
kitAddF(B, F, "glass", kitCol(kitPick([0x9AB8E8, 0xC8D8F8, 0xA898D8], r())), kitConeG(0.12, 0.6, 5), (r() - 0.5) * 0.9, 1.2, (r() - 0.5) * 1.4, 0, (r() - 0.5) * 0.4, (r() - 0.5) * 0.4);
return 1.3;
},
function (list, W, A) {
var M = A.r + Math.max(40, A.r * 0.45), x0 = W.base + A.x - M, x1 = W.base + A.x + M, z0 = A.z - M, z1 = A.z + M, out = [], v = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
list.forEach(function (m) {
var g = m.geometry, pos = g && g.attributes && g.attributes.position;
if (!pos || pos.count < 1500 || m.isInstancedMesh || m.isSkinnedMesh || m.isPoints || m.isLine || (g.morphAttributes && g.morphAttributes.position) || pos.isInterleavedBufferAttribute) {
out.push(m);
return;
}
m.updateMatrixWorld();
var mw = m.matrixWorld, idx = g.index, n = idx ? idx.count : pos.count, keep = [];
for (var i = 0; i + 2 < n; i += 3) {
for (var k = 0; k < 3; k++) {
var j = idx ? idx.getX(i + k) : i + k;
v[k].fromBufferAttribute(pos, j).applyMatrix4(mw);
}
if (Math.max(v[0].x, v[1].x, v[2].x) < x0 || Math.min(v[0].x, v[1].x, v[2].x) > x1 || Math.max(v[0].z, v[1].z, v[2].z) < z0 || Math.min(v[0].z, v[1].z, v[2].z) > z1)
continue;
keep.push(v[0].x, v[0].y, v[0].z, v[1].x, v[1].y, v[1].z, v[2].x, v[2].y, v[2].z);
}
if (!keep.length)
return;
var mt = m.material, side = Array.isArray(mt) ? (mt.some(function (q) { return q && q.side === THREE.DoubleSide; }) ? THREE.DoubleSide : (mt[0] && mt[0].side) || THREE.FrontSide) : (mt && mt.side) || THREE.FrontSide;
var cm = KIT_CLIPMAT[side] || (KIT_CLIPMAT[side] = new THREE.MeshBasicMaterial({ side: side }));
var cg = new THREE.BufferGeometry();
cg.setAttribute("position", new THREE.Float32BufferAttribute(keep, 3));
cg.computeBoundingBox();
cg.computeBoundingSphere();
var c = new THREE.Mesh(cg, cm);
c.matrixAutoUpdate = false;
c.updateMatrixWorld(true);
c.userData.kitSrc = m;
out.push(c);
});
return out;
},
function (key, W, S) {
var G = W.g;
if (!G)
return;
G.userData.kit = 1;
G.updateMatrixWorld(true);
var areas = kitAreasOf(S);
if (!areas.length)
return;
try {
kitLiftFloor(W, S);
}
catch (e) { }
var items = [], tmp = new THREE.Box3();
G.traverse(function (m) {
if (!m.isMesh || m.isSprite || !m.geometry || m.name === "kit-person" || (m.name && /^kit-/.test(m.name)))
return;
var p = m, vis = true;
while (p && p !== G) {
if (p.visible === false) {
vis = false;
break;
}
if (p.name === "kit-person" || (p.userData && p.userData.keep && p.name === "swk-person")) {
vis = false;
break;
}
p = p.parent;
}
if (!vis)
return;
if (!m.geometry.boundingBox)
m.geometry.computeBoundingBox();
tmp.copy(m.geometry.boundingBox).applyMatrix4(m.matrixWorld);
var cx = (tmp.min.x + tmp.max.x) / 2 - W.base, cz = (tmp.min.z + tmp.max.z) / 2, near = false;
for (var i = 0; i < areas.length; i++) {
var a = areas[i];
if (tmp.max.x - W.base > a.x - a.r - 60 && tmp.min.x - W.base < a.x + a.r + 60 && tmp.max.z > a.z - a.r - 60 && tmp.min.z < a.z + a.r + 60) {
near = true;
break;
}
}
if (!near)
return;
items.push({ m: m, b: tmp.clone(), blk: kitBlockOf(m, W) });
});
var mw = new THREE.Matrix4();
G.traverse(function (o) {
var N = o.userData && o.userData.kitN;
if (!N)
return;
o.updateMatrixWorld(true);
N.forEach(function (n) {
mw.multiplyMatrices(o.matrixWorld, n.rel);
tmp.copy(n.gbb).applyMatrix4(mw);
var cx = (tmp.min.x + tmp.max.x) / 2 - W.base, cz = (tmp.min.z + tmp.max.z) / 2, near = false;
for (var i = 0; i < areas.length; i++) {
var a = areas[i];
if (Math.abs(cx - a.x) < a.r + 60 && Math.abs(cz - a.z) < a.r + 60) {
near = true;
break;
}
}
if (near)
items.push({ m: null, b: tmp.clone(), blk: n.D ? kitBlockAt(n.D, mw, W) : null });
});
delete o.userData.kitN;
});
var own = [], pv = new THREE.Vector3();
G.traverse(function (o) { var u = o.userData; if (u && u.wSeed !== undefined && o.isObject3D && !u.kitFolk) {
o.getWorldPosition(pv);
own.push([pv.x - W.base, pv.z, 3.5]);
} });
var cam = camera.position, arr = WLD.arrive || { x: cam.x - W.base, z: cam.z };
areas.forEach(function (a, i) {
a.i = i;
a.key = key;
a.seed = kitHash(i * 977 + key.length * 31 + Math.round(a.x));
a.used = [];
a.people = [];
a.root = G;
a.W = W;
a.clear = S.clear || null;
if (Math.hypot(arr.x - a.x, arr.z - a.z) < a.r + 4)
a.keep = { x: arr.x, z: arr.z, r: 3.5 };
own.forEach(function (p) { if (Math.hypot(p[0] - a.x, p[1] - a.z) < a.r + 5)
a.used.push(p); });
if (typeof S.avoid === "function") {
try {
S.avoid().forEach(function (p) { if (p && isFinite(p[0]) && isFinite(p[1]) && Math.hypot(p[0] - a.x, p[1] - a.z) < a.r + 5)
a.used.push(p); });
}
catch (e) { }
}
});
areas.sort(function (p, q) { return Math.hypot(p.x - arr.x, p.z - arr.z) - Math.hypot(q.x - arr.x, q.z - arr.z); });
KSW.folkLeft = kitLite() ? 12 : 48;
KSW.last = { key: key, items: items.length, blocks: items.filter(function (i) { return i.blk; }).length, areas: areas.length, t0: performance.now() };
var steps = [];
areas.forEach(function (A) {
steps.push(function () {
A.g = new THREE.Group();
A.g.name = "kit-area";
A.g.userData.noSit = 1;
G.add(A.g);
var mine = items.filter(function (it) { var b = it.b; return b.max.x - W.base > A.x - A.r - 40 && b.min.x - W.base < A.x + A.r + 40 && b.max.z > A.z - A.r - 40 && b.min.z < A.z + A.r + 40; });
A.space = kitSpace(W, mine);
A.rayList = kitClipRays(mine.filter(function (it) { if (!it.m)
return false; var mt = it.m.material; return !(mt && mt.transparent && mt.opacity < 0.6); }).map(function (it) { return it.m; }), W, A);
A.foot = mine.filter(function (it) { return it.blk; }).map(function (it) { return it.blk; });
A.y = 0;
var y0 = null;
if (W.ground) {
try {
y0 = W.ground(A.x, A.z, A.S.groundFeet || 60);
}
catch (e) { }
}
if (y0 == null || !isFinite(y0)) {
KIT_O.set(W.base + A.x, 200, A.z);
KIT_RC.set(KIT_O, KIT_DN);
KIT_RC.far = 400;
var hs = KIT_RC.intersectObjects(A.rayList, false);
for (var h = 0; h < hs.length; h++) {
var bb = hs[h].object.geometry.boundingBox;
if (bb && (bb.max.x - bb.min.x) > 12 && (bb.max.z - bb.min.z) > 12) {
y0 = hs[h].point.y;
break;
}
}
}
A.y = y0 != null && isFinite(y0) ? y0 : 0;
A.B = kitBatch();
if (A.S.build)
kitDressBuildings(W, A.S, A, A.B, mine);
});
steps.push(function () { if (A.g)
kitLife(W, A.S, A, A.B); });
steps.push(function () { if (!A.g)
return; var ms = kitPress(A.B, A.g); A.lit = ms.filter(function (m) { return m.name === "kit-lit"; }); A.B = null; });
steps.push(function () { if (!A.g)
return; kitGround(W, A.S, A, A.g); });
steps.push(function () { if (!A.g)
return; kitFolk(W, A.S, A, A.g); A.space = null; A.rayList = null; KSW.areas.push(A); KSW.stat.areas++; });
});
var si = 0;
(function step() {
if (W.g !== G)
return;
var t0 = performance.now();
while (si < steps.length && performance.now() - t0 < (kitLite() ? 8 : 14)) {
try {
steps[si]();
}
catch (e) {
if (window.console)
console.warn("[kit]", key, e);
}
si++;
}
if (si < steps.length)
setTimeout(step, 30);
else {
KSW.last.ms = Math.round(performance.now() - KSW.last.t0);
kitGlowTick();
}
})();
if (!KSW.ticking) {
KSW.ticking = true;
setInterval(kitTick, 400);
}
},
function () {
var on = typeof WLD !== "undefined" ? WLD.on : null, P = camera.position;
KSW.areas = KSW.areas.filter(function (A) { return A.W.g === A.root; });
var far = kitLite() ? 170 : 320, pr = kitLite() ? 30 : 75, near = [], most = kitLite() ? 2 : 8;
KSW.areas.forEach(function (A) {
if (A.key !== on) {
return;
}
var lx = P.x - A.W.base, d = Math.hypot(lx - A.x, P.z - A.z) - A.r;
A.g.visible = d < far;
A.people.forEach(function (p) { var q = p.g.position, dd = Math.hypot(q.x - lx, q.z - P.z); p.g.visible = false; if (A.g.visible && dd < pr)
near.push([dd, p]); });
});
near.sort(function (a, b) { return a[0] - b[0]; });
for (var i = 0; i < near.length && i < most; i++)
near[i][1].g.visible = true;
kitGlowTick();
},
function (O, r) {
var o = [];
if (!O)
return o;
(O.spots || []).forEach(function (s) { if (s && isFinite(s.x) && isFinite(s.z))
o.push([s.x, s.z, Math.max(r, (s.r || 0) + 1.5)]); });
(O.talk || []).forEach(function (t) { var g = t.g || (t.p && t.p.g), x = t.x != null ? t.x : g && g.position.x, z = t.z != null ? t.z : g && g.position.z; if (isFinite(x) && isFinite(z))
o.push([x, z, r]); });
return o;
},
function () {
var o = [];
if (typeof SHK !== "undefined")
(SHK.spots || []).concat(SHK.talk || []).forEach(function (t) { var x = t.x != null ? t.x : t.g && t.g.position && t.g.position.x, z = t.z != null ? t.z : t.g && t.g.position && t.g.position.z; if (isFinite(x) && isFinite(z))
o.push([x, z, 4]); });
try {
if (typeof SHK_PLACES !== "undefined")
for (var k in SHK_PLACES) {
var A = SHK_PLACES[k];
if (A && isFinite(A.x))
o.push([A.x, A.z, 6]);
}
if (typeof SBK_CH !== "undefined" && typeof SBK_PLACE === "function")
SBK_CH.forEach(function (C) {
[C.start && C.start.at ? C.start : null].concat((C.cast || []).map(function (c) { return c.at; })).forEach(function (at) {
var P = at && at.at && SBK_PLACE(at.at);
if (P)
o.push([P.x + (at.dx || 0), P.z + (at.dz || 0), 5]);
else if (at && at.x != null)
o.push([at.x, at.z, 5]);
});
});
}
catch (e) { }
return o;
},
function (x, z, r) {
if (typeof shnPathD !== "function")
return false;
var P = [[[0, 0], [-150, -150], [-300, -240]], [[0, 0], [10, -300], [20, -500]], [[0, 0], [200, -120], [200, -205]], [[0, 0], [250, 60], [330, 110]]];
if (typeof SHN_ROAD !== "undefined" && shnPathD(x, z, SHN_ROAD) < 4.5 + r)
return true;
for (var i = 0; i < P.length; i++)
if (shnPathD(x, z, P[i]) < 3.5 + r)
return true;
return false;
},
function (key) {
if (typeof GR === "undefined" || !GR.realms)
return null;
var id = key.slice(3), R = GR.realms[id];
if (!R || R.off || !KIT_GR_ON[id])
return null;
var L = typeof grLook === "function" ? grLook(R) : {}, St = typeof grStyle === "function" ? grStyle(R) : {}, f = KIT_GR_FORM[L.form || "block"] || KIT_GR_FORM.block;
var pick = function (v, d) { return v && v[0] !== undefined ? v[0] : d; };
var wall = pick(St.wall, 0xD8D0C0), trim = pick(St.trim, 0xE8E2D4), roof = pick(St.roof, 0x7A5A44), pave = pick(St.pave, 0x9A9488);
var S = { name: R.name, era: "", culture: R.name, form: L.form,
pal: { wall: [wall], trim: trim, roof: [roof, new THREE.Color(roof).multiplyScalar(0.85).getHex()], door: [new THREE.Color(trim).multiplyScalar(0.45).getHex(), 0x3A2A20], shutter: [new THREE.Color(trim).multiplyScalar(0.6).getHex()],
lit: L.pal && L.pal.glow || 0xFFC878, canvas: [[L.pal && L.pal.accent || 0xA83A3A, 0xF0E8D8], [new THREE.Color(trim).multiplyScalar(0.7).getHex(), 0xF0E8D8]] },
mat: { wall: St.wall && St.wall[1] || "plaster", trim: St.trim && St.trim[1] || "stone", roof: St.roof && St.roof[1] || "tile" },
roof: f.roof, win: f.win, lamp: f.lamp, lampCol: L.pal && L.pal.glow || 0xFFD49A, shutters: f.sci ? 0 : 0.3, balcony: f.sci ? 0 : 0.15, boxes: f.sci ? 0 : 0.2, shops: 0,
props: f.sci ? [["canister", 2], ["crate-metal", 2], ["solar", 1], ["kiosk", 1], ["bench", 1.5], ["planter", 1]] : [["barrel", 2], ["crates", 2], ["bench", 2], ["planter", 1.5], ["sacks", 1], ["cart", 0.8], ["pots", 0.8]],
mid: "stall", ground: f.green ? [["leaf", 0.6], ["flower", 0.4], ["pebble", 0.5], ["moss", 0.4]] : [["pebble", 0.6], ["dust", 0.4], ["puddle", 0.15], ["leaf", 0.2]],
edge: f.sci ? [["dust", 0.6], ["pipe", 0.3]] : [["weed", 0.5], ["grime", 0.5]],
folk: { titles: ["citizen", "merchant", "clerk", "porter", "scholar"], n: 5, walk: 0.5 },
areas: KIT_GR_AREAS, radius: 45,
clear: function (x, z, r) { return Math.abs(x) < 7 + r && z > -125 && z < 300; } };
var own = KIT_GR_OWN[id];
if (own)
for (var k in own) {
if (k === "pal") {
for (var p in own.pal)
S.pal[p] = own.pal[p];
}
else
S[k] = own[k];
}
return S;
}
];
});
