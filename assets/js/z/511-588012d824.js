/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(511, function () {
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
}
];
});
