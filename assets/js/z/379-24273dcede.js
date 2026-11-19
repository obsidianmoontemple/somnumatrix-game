/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(379, function () {
"use strict";
return [
function (col, tex, o) {
o = o || {};
var key = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (HWD.mats[key])
return HWD.mats[key];
var m;
if (o.basic)
m = new THREE.MeshBasicMaterial({ color: col });
else if (o.shine)
m = new THREE.MeshPhongMaterial({ color: col, shininess: o.shine, specular: o.spec !== undefined ? o.spec : 0x8A7A5A });
else
m = new THREE.MeshLambertMaterial({ color: col });
var t = tex && typeof texOf === "function" ? texOf(tex) : null;
if (t)
m.map = t;
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
return (HWD.mats[key] = m);
},
function (shape, hw, h) {
var P = [], i, a, N = HWD.lite ? 10 : 18;
if (shape === "arch") {
P.push([-hw, 0], [hw, 0]);
for (i = 0; i <= N; i++) {
a = Math.PI * i / N;
P.push([hw * Math.cos(a), h + hw * Math.sin(a)]);
}
}
else if (shape === "pointed") {
var R = 2 * hw;
P.push([-hw, 0], [hw, 0]);
for (i = 0; i <= N / 2; i++) {
a = (Math.PI / 3) * i / (N / 2);
P.push([-hw + R * Math.cos(a), h + R * Math.sin(a)]);
}
for (i = N / 2 - 1; i >= 0; i--) {
a = (Math.PI / 3) * i / (N / 2);
P.push([hw - R * Math.cos(a), h + R * Math.sin(a)]);
}
}
else if (shape === "horseshoe") {
var r = hw * 1.12, cy = h;
P.push([-hw * 0.92, 0], [hw * 0.92, 0]);
var a0 = -0.35, a1 = Math.PI + 0.35;
for (i = 0; i <= N; i++) {
a = a0 + (a1 - a0) * i / N;
P.push([r * Math.cos(a), cy + r * Math.sin(a)]);
}
}
else if (shape === "round") {
var rr = hw, c0 = h;
P.push([-hw, 0], [hw, 0]);
for (i = 0; i <= N; i++) {
a = Math.PI * i / N;
P.push([rr * Math.cos(a), c0 + rr * Math.sin(a) * 0.55]);
}
}
else if (shape === "hex") {
P.push([-hw * 0.8, 0], [hw * 0.8, 0], [hw, h * 0.35], [hw, h], [hw * 0.6, h + hw * 0.55], [-hw * 0.6, h + hw * 0.55], [-hw, h], [-hw, h * 0.35]);
}
else
P.push([-hw, 0], [hw, 0], [hw, h], [-hw, h]);
return P;
},
function (g, o) {
var hw = o.hw || 1.15, h = o.h || 3.1, b = o.border || 0.5, dep = o.depth || 0.8;
var inner = hwdPts(o.shape, hw, h), outer = hwdPts(o.shape, hw + b, h);
if (o.shape === "square" || !o.shape) {
outer = hwdPts("square", hw + b, h + b);
}
var key = "f|" + o.shape + "|" + hw + "|" + h + "|" + b + "|" + dep + "|" + (HWD.lite ? 1 : 0);
var fg = HWD.geos[key] || (HWD.geos[key] = (function () {
var fs = hwdShape(outer);
fs.holes.push(new THREE.Path(inner.map(function (p) { return new THREE.Vector2(p[0], p[1]); })));
var g0 = new THREE.ExtrudeGeometry(fs, { depth: dep, bevelEnabled: !HWD.lite, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 1, curveSegments: 4 });
g0.translate(0, 0, -dep / 2);
return g0;
})());
hwdAdd(g, fg, o.frame);
var lk = "l|" + o.shape + "|" + hw + "|" + h + "|" + (HWD.lite ? 1 : 0);
var lg = HWD.geos[lk] || (HWD.geos[lk] = (function () { var g0 = new THREE.ExtrudeGeometry(hwdShape(inner), { depth: 0.22, bevelEnabled: false, curveSegments: 4 }); g0.translate(0, 0, -0.11); return g0; })());
if (o.leaf)
hwdAdd(g, lg, o.leaf);
var pane = null;
if (o.glow !== undefined && o.glow !== null) {
var pk = "p|" + o.shape + "|" + hw + "|" + h + "|" + (HWD.lite ? 1 : 0);
var pg = HWD.geos[pk] || (HWD.geos[pk] = new THREE.ShapeGeometry(hwdShape(inner), 4));
pane = new THREE.Mesh(pg, new THREE.MeshBasicMaterial({ color: o.glow, transparent: true, opacity: o.leaf ? 0.16 : 0.42, depthWrite: false, side: THREE.DoubleSide }));
pane.position.z = 0.13;
pane.userData.keep = 1;
g.add(pane);
var pb = new THREE.Mesh(pg, pane.material);
pb.position.z = -0.13;
pb.userData.keep = 1;
g.add(pb);
}
if (o.step !== false) {
var st = o.step || o.frame;
hwdBox(g, (hw + b) * 2 + 0.5, 0.16, dep + 1.2, 0, 0.08, 0, st);
}
return { hw: hw, h: h, top: hwdTop(inner), oTop: hwdTop(outer) + (o.shape === "square" || !o.shape ? 0 : 0), ow: hw + b, pane: pane };
},
function (name, bg, fg, sub) {
var key = name + "|" + bg + "|" + fg + "|" + (sub || "");
if (HWD.tex[key])
return HWD.tex[key];
var c = document.createElement("canvas");
c.width = 512;
c.height = sub ? 128 : 96;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, c.width, c.height);
x.strokeStyle = fg;
x.lineWidth = 5;
x.strokeRect(8, 8, c.width - 16, c.height - 16);
x.fillStyle = fg;
x.textAlign = "center";
x.textBaseline = "middle";
var fs = 46;
x.font = "bold " + fs + "px Georgia, serif";
while (x.measureText(name).width > 460 && fs > 18) {
fs -= 2;
x.font = "bold " + fs + "px Georgia, serif";
}
x.fillText(name, 256, sub ? 46 : 50);
if (sub) {
x.font = "italic 24px Georgia, serif";
var s2 = sub;
while (x.measureText(s2).width > 470 && s2.length > 8)
s2 = s2.slice(0, -2);
x.fillText(s2, 256, 94);
}
var t = new THREE.CanvasTexture(c);
if (t.anisotropy !== undefined)
t.anisotropy = 4;
HWD.tex[key] = t;
return t;
},
function (g, name, y, z, bg, fg, sub, w) {
w = w || 2.6;
var t = hwdPlateTex(name, bg, fg, sub), hgt = w * (sub ? 128 : 96) / 512;
var m = new THREE.MeshBasicMaterial({ map: t });
var a = new THREE.Mesh(new THREE.PlaneGeometry(w, hgt), m);
a.position.set(0, y, z);
g.add(a);
var b = new THREE.Mesh(a.geometry, m);
b.position.set(0, y, -z);
b.rotation.y = Math.PI;
g.add(b);
return a;
},
function (g, x, y, z, col, metal, glass) {
hwdBox(g, 0.34, 0.06, 0.34, x, y + 0.32, z, metal);
hwdCone(g, 0.26, 0.22, x, y + 0.46, z, metal, 4).rotation.y = Math.PI / 4;
hwdBox(g, 0.26, 0.5, 0.26, x, y, z, glass || hwdMat(col, null, { e: col }));
hwdBox(g, 0.32, 0.05, 0.32, x, y - 0.27, z, metal);
var gl = hwdGlow(g, col, 1.6, x, y, z, 0.55);
if (gl)
gl.userData.flick = 1;
return gl;
},
function (g, x, z, pot, plant, kind) {
hwdCyl(g, 0.36, 0.26, 0.6, x, 0.3, z, pot, 12);
hwdTor(g, 0.36, 0.04, x, 0.6, z, pot).rotation.x = Math.PI / 2;
if (kind === "cypress") {
hwdCone(g, 0.38, 2.6, x, 1.95, z, plant, 8);
hwdCone(g, 0.3, 1.4, x, 2.9, z, plant, 8);
}
else if (kind === "palm") {
hwdCyl(g, 0.07, 0.1, 1.8, x, 1.5, z, hwdMat(0x7A6248, "bark"), 6);
for (var i = 0; i < 7; i++) {
var f = hwdBox(g, 0.14, 0.03, 1.2, x, 2.4, z, plant);
f.rotation.y = i / 7 * Math.PI * 2;
f.rotation.x = 0.5;
f.translateZ(0.5);
}
}
else {
hwdBall(g, 0.45, x, 1.05, z, plant, 10);
hwdBall(g, 0.32, x + 0.2, 1.35, z + 0.1, plant, 8);
}
},
function (g, draw) {
var f = new THREE.Group();
draw(f);
g.add(f);
var b = f.clone();
b.rotation.y = Math.PI;
g.add(b);
var drop = [];
f.traverse(function (o) { if (o.isSprite || o.isPoints)
drop.push(o); });
drop.forEach(function (o) { if (o.parent)
o.parent.remove(o); });
},
function (g) {
var brick = hwdMat(0xB0644A, "brick"), wood = hwdMat(0x1E4A32, "wood"), white = hwdMat(0xEDE8DC, "plaster"), brass = hwdMat(0xD8B04A, "metal", { shine: 80 });
var D = hwdDoorway(g, { shape: "arch", hw: 1.05, h: 3.0, border: 0.75, frame: brick, leaf: wood, glow: 0xFFE0A0, step: hwdMat(0x9A968E, "stone") });
hwdTwoFaces(g, function (f) {
hwdBox(f, 0.22, 3.0, 0.2, -1.2, 1.5, 0.42, white);
hwdBox(f, 0.22, 3.0, 0.2, 1.2, 1.5, 0.42, white);
hwdBox(f, 2.9, 0.22, 0.3, 0, D.oTop + 0.1, 0.42, white);
for (var i = 0; i < 3; i++)
hwdBox(f, 0.6 + i * 0.4, 0.08, 0.06, 0, 1.0 + i * 0.75, 0.16, hwdMat(0x163A26, "wood"));
hwdTor(f, 0.13, 0.025, 0, 1.7, 0.2, brass);
hwdBall(f, 0.06, 0.72, 1.25, 0.2, brass);
hwdBox(f, 0.55, 0.07, 0.02, 0, 2.55, 0.13, brass);
[-1, 1].forEach(function (s) {
hwdBox(f, 1.1, 0.32, 0.35, s * 2.55, 1.6, 0.5, hwdMat(0x5A3A22, "wood"));
for (var k = 0; k < 5; k++)
hwdBall(f, 0.13, s * 2.55 - 0.4 + k * 0.2, 1.86, 0.5, hwdMat([0xD8303A, 0xF0C040, 0xE878A8][k % 3]), 6);
for (var k2 = 0; k2 < 3; k2++)
hwdBall(f, 0.16, s * 2.55 - 0.3 + k2 * 0.3, 1.8, 0.42, hwdMat(0x3A6A2A, "foliage"), 6);
});
hwdLantern(f, 1.95, 2.9, 0.62, 0xFFC870, hwdMat(0x1A1A1A, "metal", { shine: 30 }));
hwdBox(f, 1.3, 0.03, 0.7, 0, 0.17, 0.95, hwdMat(0x8A5A30));
});
},
function (g) {
var stone = hwdMat(0x8A8E98, "stone"), dark = hwdMat(0x2A2E3A, "stone"), gold = hwdMat(0xC9A868, "metal", { shine: 70 }), cloth = hwdMat(0x4A2A6A);
hwdDoorway(g, { shape: "arch", hw: 1.25, h: 3.2, border: 0.6, frame: stone, leaf: hwdMat(0x3A2A1C, "wood"), glow: 0x9FD8FF, step: dark });
hwdTwoFaces(g, function (f) {
[-1, 1].forEach(function (s) {
hwdBox(f, 0.5, 4.8, 0.4, s * 2.05, 2.4, 0.3, stone);
hwdBox(f, 0.7, 0.3, 0.6, s * 2.05, 4.9, 0.3, gold);
hwdBox(f, 0.9, 2.4, 0.04, s * 2.05, 3.0, 0.53, cloth);
hwdBox(f, 0.9, 0.18, 0.06, s * 2.05, 4.25, 0.54, gold);
hwdBall(f, 0.16, s * 2.05, 3.2, 0.58, gold, 8);
hwdCyl(f, 0.06, 0.08, 3.6, s * 3.1, 1.8, 0.9, dark, 8);
hwdLantern(f, s * 3.1, 3.8, 0.9, 0xFFE0A8, dark);
});
for (var i = 0; i < 7; i++) {
var a = Math.PI * i / 6, kb = hwdBox(f, 0.32, 0.5, 0.1, Math.cos(a) * 1.55, 3.2 + Math.sin(a) * 1.55, 0.42, gold);
kb.rotation.z = a - Math.PI / 2;
}
});
},
function (g) {
var basalt = hwdMat(0x2A2628, "stone"), bronze = hwdMat(0x8A5A2A, "metal", { shine: 60, spec: 0x6A4A2A }), red = hwdMat(0x9A1420, null, { shine: 50, spec: 0x553333 });
hwdDoorway(g, { shape: "pointed", hw: 1.15, h: 2.6, border: 0.6, frame: basalt, leaf: hwdMat(0x5A3A1E, "metal"), glow: 0xFF7A3A, step: hwdMat(0x1A1618, "stone") });
hwdTwoFaces(g, function (f) {
for (var r = 0; r < 4; r++)
for (var c = 0; c < 2; c++)
hwdBox(f, 0.7, 0.62, 0.05, -0.4 + c * 0.8, 0.6 + r * 0.82, 0.14, hwdMat(0x6A4220, "metal", { shine: 40 }));
hwdBall(f, 0.16, 0, 4.55, 0.45, red, 10);
hwdCone(f, 0.08, 0.14, 0, 4.74, 0.45, red, 6);
[-1, 1].forEach(function (s) {
var x = s * 2.35;
hwdCyl(f, 0.42, 0.22, 0.5, x, 1.25, 0.7, bronze, 14);
hwdCyl(f, 0.08, 0.14, 1.0, x, 0.5, 0.7, bronze, 8);
hwdCyl(f, 0.32, 0.32, 0.08, x, 0.04, 0.7, bronze, 10);
hwdBall(f, 0.14, x, 1.55, 0.7, hwdMat(0xFF6A20, null, { e: 0xC83A08 }), 6);
hwdGlow(f, 0xFF6A28, 1.8, x, 1.75, 0.7, 0.6);
hwdMotes(f, 14, [0.3, 2.2, 0.3], 0xFFA040, 0.09, "rise", 0.9, x, 1.5, 0.7, 0.9);
hwdCyl(f, 0.3, 0.18, 0.18, s * 1.2, 0.26, 1.1, bronze, 12);
for (var p = 0; p < 3; p++) {
hwdBall(f, 0.13, s * 1.2 - 0.12 + p * 0.12, 0.42, 1.1 + (p % 2) * 0.08, red, 8);
hwdCone(f, 0.05, 0.08, s * 1.2 - 0.12 + p * 0.12, 0.56, 1.1 + (p % 2) * 0.08, red, 5);
}
for (var a = 0; a < 5; a++) {
var x2 = s * (2.7 + a * 0.12), z2 = 1.2 + (a % 2) * 0.3;
hwdCyl(f, 0.015, 0.015, 0.8, x2, 0.4, z2, hwdMat(0x5A7A4A), 4);
hwdBall(f, 0.07, x2, 0.82, z2, hwdMat(0xEDE6D0), 5);
}
});
});
},
function (g) {
var marble = hwdMat(0xF2EEE6, "marble"), gold = hwdMat(0xE8C050, "metal", { shine: 90, spec: 0xFFF0B0 }), cloud = hwdMat(0xFFFFFF, null, { e: 0x4A4A55 });
hwdDoorway(g, { shape: "arch", hw: 1.2, h: 3.2, border: 0.55, frame: marble, leaf: hwdMat(0xE8D8A0, "metal", { shine: 60, spec: 0xFFF0C0 }), glow: 0xFFF4D0, step: marble });
hwdTwoFaces(g, function (f) {
hwdTor(f, 1.5, 0.07, 0, 3.2, 0.44, gold, Math.PI, 28);
[-1, 1].forEach(function (s) {
hwdCyl(f, 0.22, 0.26, 4.4, s * 2.1, 2.2, 0.3, marble, 16);
hwdBox(f, 0.62, 0.22, 0.62, s * 2.1, 4.5, 0.3, gold);
hwdBox(f, 0.62, 0.2, 0.62, s * 2.1, 0.1, 0.3, marble);
for (var w = 0; w < 6; w++) {
var fe = hwdCone(f, 0.13, 1.1 - w * 0.08, s * (1.75 + w * 0.06), 3.6 - w * 0.38, 0.48, marble, 6);
fe.rotation.z = s * (0.9 + w * 0.06);
}
for (var c = 0; c < 4; c++)
hwdBall(f, 0.45 - c * 0.06, s * (1.6 + c * 0.5), 0.3, 0.9 + (c % 2) * 0.3, cloud, 10);
});
hwdBall(f, 0.22, 0, 4.85, 0.42, gold, 12);
hwdMotes(f, 16, [1.6, 4.5, 0.6], 0xFFF0B0, 0.08, "rise", 0.25, 0, 0.2, 0.8, 0.8);
});
},
function (g) {
var coral = hwdMat(0xE8826A, "stone"), shell = hwdMat(0xF4E2D0, null, { shine: 60, spec: 0xFFFFFF }), sea = hwdMat(0x1E5A5A, "wood"), brass = hwdMat(0xB89048, "metal", { shine: 70 });
hwdDoorway(g, { shape: "round", hw: 1.2, h: 3.0, border: 0.55, frame: coral, leaf: sea, glow: 0x5AC8D8, step: hwdMat(0xD8C8A0, "sand") });
hwdTwoFaces(g, function (f) {
hwdTor(f, 0.42, 0.07, 0, 2.3, 0.15, brass);
hwdAdd(f, new THREE.CircleGeometry(0.4, hwdSeg(20)), hwdMat(0x4AB8C8, null, { e: 0x0E4A5A, op: 0.85 }), 0, 2.3, 0.14);
var pc = [0xE85A5A, 0xF09A6A, 0xD8507A, 0xF0B060];
[-1, 1].forEach(function (s) {
for (var b = 0; b < 5; b++) {
var br = hwdCyl(f, 0.05, 0.09, 1.0 + b * 0.15, s * (1.85 + (b % 2) * 0.25), 0.6 + b * 0.75, 0.5, hwdMat(pc[b % 4]), 6);
br.rotation.z = s * (0.3 - b * 0.12);
br.rotation.x = 0.2 * (b % 3 - 1);
hwdBall(f, 0.1, s * (1.85 + (b % 2) * 0.25) + s * 0.18, 1.1 + b * 0.75, 0.5, hwdMat(pc[(b + 1) % 4]), 6);
}
for (var k = 0; k < 3; k++) {
var kelp = hwdBox(f, 0.12, 2.6 - k * 0.4, 0.02, s * (2.6 + k * 0.3), 1.3 - k * 0.2, 0.9 + k * 0.2, hwdMat(0x3A6A2A, null, { ds: true }));
kelp.rotation.z = s * 0.08 * (k + 1);
}
var sh = hwdBall(f, 0.3, s * 1.3, 0.28, 1.0, shell, 10);
sh.scale.set(1, 0.45, 0.8);
hwdCone(f, 0.18, 0.5, s * 2.2, 0.25, 1.2, shell, 8).rotation.z = s * 1.2;
});
var cl = hwdBall(f, 0.45, 0, 4.4, 0.42, shell, 12);
cl.scale.set(1.2, 0.5, 0.6);
hwdBall(f, 0.14, 0, 4.55, 0.62, hwdMat(0xFFFFFF, null, { shine: 120, spec: 0xFFFFFF, e: 0x222830 }), 12);
hwdMotes(f, 18, [0.6, 4.8, 0.3], 0xC8F0FF, 0.1, "rise", 0.6, 1.9, 0.2, 0.7, 0.7);
hwdMotes(f, 14, [0.5, 4.8, 0.3], 0xC8F0FF, 0.08, "rise", 0.5, -1.9, 0.2, 0.7, 0.7);
});
},
function (g) {
var bark = hwdMat(0x6A5440, "bark"), moss = hwdMat(0x4A7A34, "foliage"), cap = hwdMat(0xC8282A), dots = hwdMat(0xF4F0E0), stem = hwdMat(0xEDE4CC);
hwdDoorway(g, { shape: "round", hw: 1.15, h: 2.9, border: 0.6, frame: bark, leaf: hwdMat(0x3A6A2A, "wood"), glow: 0xC8F0A0, step: hwdMat(0x5A6A3A, "grass") });
hwdTwoFaces(g, function (f) {
hwdBall(f, 0.14, 0, 1.55, 0.18, hwdMat(0xD8B04A, "metal", { shine: 70 }), 10);
[-1, 1].forEach(function (s) {
var tr = hwdCyl(f, 0.32, 0.5, 4.2, s * 2.0, 2.1, 0.1, bark, 10);
tr.rotation.z = s * 0.12;
for (var r = 0; r < 3; r++) {
var rt = hwdCyl(f, 0.08, 0.18, 1.1, s * (2.2 + r * 0.25), 0.25, 0.4 + r * 0.3, bark, 6);
rt.rotation.z = s * 1.1;
rt.rotation.y = r * 0.4;
}
for (var l = 0; l < 6; l++)
hwdBall(f, 0.5 + ((l * 7) % 3) * 0.12, s * (1.2 + l * 0.3), 4.3 + Math.sin(l) * 0.4, 0.1 + (l % 2) * 0.3, moss, 8);
for (var m = 0; m < 3; m++) {
var mx = s * (1.4 + m * 0.45), mz = 0.9 + (m % 2) * 0.4, mh = 0.25 + m * 0.12;
hwdCyl(f, 0.05, 0.07, mh, mx, mh / 2, mz, stem, 6);
var cp = hwdBall(f, 0.18 + m * 0.05, mx, mh, mz, cap, 10);
cp.scale.y = 0.55;
hwdBall(f, 0.035, mx + 0.08, mh + 0.08, mz + 0.06, dots, 4);
hwdBall(f, 0.03, mx - 0.07, mh + 0.09, mz - 0.02, dots, 4);
}
for (var fl = 0; fl < 4; fl++)
hwdBall(f, 0.06, s * (0.9 + fl * 0.25), 0.12, 1.3 + (fl % 2) * 0.2, hwdMat([0xF0A0D8, 0xFFF0A0, 0xB0A0F0, 0xFFFFFF][fl], null, { e: 0x222222 }), 5);
});
hwdMotes(f, 16, [2.4, 3.6, 1.2], 0xE8FF90, 0.11, "swirl", 0.4, 0, 0.5, 1.0, 0.9);
});
},
function (g) {
var obs = hwdMat(0x18161E, "stone", { shine: 90, spec: 0x5A5A7A }), rim = hwdMat(0x6A4AE0, null, { e: 0x3A2A8A });
hwdDoorway(g, { shape: "hex", hw: 1.25, h: 3.4, border: 0.45, frame: obs, leaf: hwdMat(0x04040A, null, { basic: true }), glow: 0x7A5AE8, step: obs });
hwdTwoFaces(g, function (f) {
hwdMotes(f, 24, [1.0, 3.6, 0.05], 0xFFFFFF, 0.06, "swirl", 0.05, 0, 0.4, 0.14, 1.0);
hwdBox(f, 0.05, 4.4, 0.05, -1.72, 2.2, 0.42, rim);
hwdBox(f, 0.05, 4.4, 0.05, 1.72, 2.2, 0.42, rim);
});
var ring = new THREE.Group();
ring.position.set(0, 2.6, 0);
ring.userData.keep = 1;
ring.userData.spin = 0.18;
g.add(ring);
var rk = hwdMat(0x2A2834, "stone");
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2, r = 2.6 + (i % 3) * 0.25, k = hwdBox(ring, 0.35 + (i % 3) * 0.15, 0.28 + (i % 2) * 0.2, 0.3, Math.cos(a) * r, Math.sin(a) * r, (i % 2 ? 0.6 : -0.6), rk);
k.rotation.set(i, i * 2, i * 3);
}
},
function (g) {
var silver = hwdMat(0xC8CDD4, "metal", { shine: 110, spec: 0xFFFFFF }), glass = hwdMat(0xB8C4D4, null, { shine: 140, spec: 0xFFFFFF, e: 0x283038 });
var D = hwdDoorway(g, { shape: "arch", hw: 1.2, h: 3.0, border: 0.4, frame: silver, leaf: glass, glow: 0xF0F6FF, step: hwdMat(0x2A2E3A, "marble") });
hwdTwoFaces(g, function (f) {
hwdTor(f, 1.45, 0.08, 0, 3.0, 0.42, silver, Math.PI, 28);
for (var i = 0; i < 9; i++) {
var a = Math.PI * i / 8;
hwdBall(f, 0.09, Math.cos(a) * 1.62, 3.0 + Math.sin(a) * 1.62, 0.42, silver, 6);
}
[-1, 1].forEach(function (s) {
hwdCyl(f, 0.05, 0.07, 1.6, s * 2.3, 0.8, 0.7, silver, 8);
hwdCyl(f, 0.28, 0.2, 0.06, s * 2.3, 0.03, 0.7, silver, 10);
hwdBox(f, 0.8, 0.05, 0.05, s * 2.3, 1.6, 0.7, silver);
[-0.38, 0, 0.38].forEach(function (dx) {
hwdCyl(f, 0.035, 0.035, 0.28, s * 2.3 + dx, 1.78 + (dx ? 0 : 0.1), 0.7, hwdMat(0xF4EEDC), 6);
hwdGlow(f, 0xFFE0A0, 0.5, s * 2.3 + dx, 1.98 + (dx ? 0 : 0.1), 0.7, 0.7);
});
});
hwdBall(f, 0.2, 0, D.oTop + 0.15, 0.42, hwdMat(0x9ACCFF, null, { e: 0x2A4A6A, shine: 100 }), 8);
});
},
function (g) {
var stone = hwdMat(0xB4B0A4, "stone"), iron = hwdMat(0x2A2A2A, "metal", { shine: 30 }), mari = hwdMat(0xF08A18), wax = hwdMat(0xF0E8D0);
hwdDoorway(g, { shape: "pointed", hw: 1.1, h: 2.7, border: 0.55, frame: stone, leaf: hwdMat(0x6A6A62, "wood"), glow: 0xB8D8D0, step: hwdMat(0x8A867A, "stone") });
hwdTwoFaces(g, function (f) {
for (var b = 0; b < 4; b++)
hwdBox(f, 2.2, 0.08, 0.05, 0, 0.6 + b * 0.9, 0.14, iron);
hwdTor(f, 0.15, 0.03, 0.6, 1.6, 0.18, iron);
[-1, 1].forEach(function (s) {
hwdBox(f, 0.55, 1.2, 0.35, s * 2.35, 0.6, 0.6, stone);
hwdBox(f, 0.7, 0.12, 0.45, s * 2.35, 1.26, 0.6, stone);
for (var c = 0; c < 3; c++) {
var cx = s * (2.2 + c * 0.15), h = 0.25 + c * 0.12;
hwdCyl(f, 0.05, 0.05, h, cx, 1.32 + h / 2, 0.55 + (c % 2) * 0.12, wax, 6);
hwdGlow(f, 0xFFD08A, 0.45, cx, 1.4 + h, 0.55 + (c % 2) * 0.12, 0.75).userData.flick = 1;
}
for (var m = 0; m < 6; m++)
hwdBall(f, 0.1, s * (1.2 + m * 0.22), 0.12 + (m % 2) * 0.05, 1.1 + (m % 3) * 0.18, mari, 6);
hwdLantern(f, s * 1.55, 3.4, 0.7, 0xC8F0E0, iron);
});
hwdMotes(f, 12, [1.6, 4.5, 0.6], 0xD8F0F0, 0.14, "rise", 0.18, 0, 0.3, 0.9, 0.45);
});
},
function (g) {
var ice = hwdMat(0xA8D4F0, null, { shine: 120, spec: 0xFFFFFF, e: 0x1A3A5A }), snow = hwdMat(0xF4F8FC, "snow"), crystal = hwdMat(0xD8F4FF, null, { e: 0x3A6A8A, op: 0.85 });
var D = hwdDoorway(g, { shape: "pointed", hw: 1.2, h: 2.8, border: 0.6, frame: ice, leaf: hwdMat(0x6A9AC0, "metal", { shine: 90, spec: 0xFFFFFF }), glow: 0xBFE8FF, step: snow });
hwdTwoFaces(g, function (f) {
for (var i = 0; i < 9; i++) {
var x = -1.6 + i * 0.4, ic = hwdCone(f, 0.08, 0.4 + (i * 5 % 4) * 0.18, x, 4.0 - Math.abs(x) * 0.6, 0.42, ice, 6);
ic.rotation.x = Math.PI;
}
[-1, 1].forEach(function (s) {
for (var c = 0; c < 3; c++) {
var cr = hwdCone(f, 0.22 - c * 0.04, 1.4 - c * 0.3, s * (2.1 + c * 0.3), 0.7 - c * 0.15, 0.5 + c * 0.15, crystal, 6);
cr.rotation.z = s * (0.15 + c * 0.2);
}
var dr = hwdBall(f, 0.9, s * 1.9, 0, 0.9, snow, 12);
dr.scale.set(1, 0.38, 0.8);
});
hwdBall(f, 0.3, 0, D.oTop + 0.05, 0.44, crystal, 6);
hwdMotes(f, 26, [2.6, 5.5, 1.4], 0xFFFFFF, 0.08, "fall", 0.6, 0, 0, 0.9, 0.9);
});
},
function (g) {
var rock = hwdMat(0x3A5A5A, "stone"), cry = hwdMat(0x6AF0D0, null, { e: 0x1A6A5A }), plant = hwdMat(0x8A3AB8, null, { e: 0x2A0A3A });
hwdDoorway(g, { shape: "horseshoe", hw: 1.15, h: 2.9, border: 0.55, frame: rock, leaf: hwdMat(0x1A3A40, "metal", { shine: 50 }), glow: 0x6AE8C8, step: hwdMat(0x2A3A40, "stone") });
hwdTwoFaces(g, function (f) {
[-1, 1].forEach(function (s) {
for (var c = 0; c < 4; c++) {
var cr = hwdCyl(f, 0.0, 0.16 + c * 0.03, 1.0 + c * 0.4, s * (1.9 + c * 0.22), (1.0 + c * 0.4) / 2, 0.5 + (c % 2) * 0.35, cry, 6);
cr.rotation.z = s * (0.1 + c * 0.08);
}
for (var p = 0; p < 3; p++) {
var px = s * (1.3 + p * 0.4), pz = 1.1 + p * 0.15;
hwdCyl(f, 0.03, 0.05, 0.9 + p * 0.2, px, 0.45 + p * 0.1, pz, hwdMat(0x2A5A4A), 5);
hwdBall(f, 0.16, px, 0.95 + p * 0.2, pz, plant, 8);
}
hwdGlow(f, 0x6AF0D0, 1.6, s * 2.1, 0.9, 0.7, 0.5);
});
hwdBall(f, 0.32, -0.7, 5.3, 0.2, hwdMat(0xE8D8C0, null, { e: 0x5A5040 }), 12);
hwdBall(f, 0.2, 0.8, 5.6, 0.2, hwdMat(0xA8C8F0, null, { e: 0x3A4A6A }), 10);
hwdMotes(f, 14, [1.8, 3.4, 0.8], 0x8AFFE0, 0.09, "swirl", 0.3, 0, 0.4, 0.8, 0.8);
});
},
function (g) {
var marble = hwdMat(0xE8E0CC, "marble"), bronze = hwdMat(0x9A6A30, "metal", { shine: 60 }), smoke = 0xD8D0C8;
var D = hwdDoorway(g, { shape: "square", hw: 1.15, h: 3.6, border: 0.45, frame: marble, leaf: bronze, glow: 0xFFD890, step: marble });
hwdTwoFaces(g, function (f) {
[-1, 1].forEach(function (s) {
hwdCyl(f, 0.26, 0.3, 4.4, s * 2.15, 2.3, 0.55, marble, 16);
hwdBox(f, 0.75, 0.22, 0.75, s * 2.15, 4.6, 0.55, marble);
hwdBox(f, 0.8, 0.2, 0.8, s * 2.15, 0.1, 0.55, marble);
for (var k = 0; k < 2; k++)
for (var r = 0; r < 3; r++)
hwdBall(f, 0.06, s * (0.25 + k * 0.5), 0.8 + r * 1.0, 0.14, hwdMat(0xD8A850, "metal", { shine: 80 }), 6);
});
hwdBox(f, 5.0, 0.4, 0.9, 0, 4.9, 0.5, marble);
var pk = "ped", pg = HWD.geos[pk] || (HWD.geos[pk] = (function () { var sh = hwdShape([[-2.6, 0], [2.6, 0], [0, 1.0]]), g0 = new THREE.ExtrudeGeometry(sh, { depth: 0.5, bevelEnabled: false }); g0.translate(0, 0, -0.25); return g0; })());
hwdAdd(f, pg, marble, 0, 5.1, 0.55);
hwdBall(f, 0.16, 0, 5.45, 0.82, hwdMat(0xD8A850, "metal", { shine: 80 }), 8);
hwdCyl(f, 0.32, 0.2, 0.3, 0, 0.36, 1.4, bronze, 12);
hwdCyl(f, 0.08, 0.14, 0.22, 0, 0.11, 1.4, bronze, 8);
hwdMotes(f, 10, [0.15, 2.4, 0.15], smoke, 0.18, "rise", 0.35, 0, 0.5, 1.4, 0.35);
hwdGlow(f, 0xFFB860, 0.7, 0, 0.55, 1.4, 0.6);
});
},
function (g) {
var basalt = hwdMat(0x2A201C, "stone"), lava = hwdMat(0xFF6A10, null, { e: 0xE04A08 }), iron = hwdMat(0x3A3434, "metal", { shine: 40 });
hwdDoorway(g, { shape: "pointed", hw: 1.15, h: 2.7, border: 0.65, frame: basalt, leaf: iron, glow: 0xFF6A1A, step: hwdMat(0x1A1412, "stone") });
hwdTwoFaces(g, function (f) {
for (var i = 0; i < 10; i++) {
var s = i % 2 ? 1 : -1, y = 0.5 + i * 0.42, c = hwdBox(f, 0.05, 0.5 + (i % 3) * 0.2, 0.03, s * (1.45 + (i % 3) * 0.1), y, 0.42, lava);
c.rotation.z = (i % 4 - 1.5) * 0.4;
}
for (var r = 0; r < 5; r++)
hwdBox(f, 2.2, 0.07, 0.04, 0, 0.5 + r * 0.75, 0.13, hwdMat(0x1A1616, "metal"));
[-1, 1].forEach(function (s) {
var x = s * 2.4;
hwdCyl(f, 0.45, 0.3, 0.5, x, 0.85, 0.7, iron, 10);
hwdCyl(f, 0.1, 0.18, 0.6, x, 0.3, 0.7, iron, 8);
hwdBall(f, 0.3, x, 1.1, 0.7, lava, 8).scale.y = 0.4;
hwdGlow(f, 0xFF5A10, 2.2, x, 1.4, 0.7, 0.65);
hwdMotes(f, 16, [0.35, 2.8, 0.35], 0xFFB040, 0.1, "rise", 1.1, x, 1.1, 0.7, 0.95);
for (var k = 0; k < 3; k++) {
var rk = hwdBall(f, 0.3 + k * 0.08, s * (1.4 + k * 0.45), 0.15, 1.1 + (k % 2) * 0.3, basalt, 7);
rk.scale.y = 0.6;
}
});
});
},
function (g) {
var navy = hwdMat(0x101838, "wood"), brass = hwdMat(0xC8A048, "metal", { shine: 90, spec: 0xFFE8A0 }), stone = hwdMat(0x3A3E4E, "marble");
var D = hwdDoorway(g, { shape: "arch", hw: 1.15, h: 3.0, border: 0.5, frame: stone, leaf: navy, glow: 0x9AB8FF, step: stone });
hwdTwoFaces(g, function (f) {
for (var i = 0; i < 14; i++) {
var x = -0.9 + ((i * 37) % 19) / 19 * 1.8, y = 0.5 + ((i * 53) % 23) / 23 * 3.2;
var st = hwdBox(f, 0.09, 0.09, 0.02, x, y, 0.13, hwdMat(0xF0D070, null, { e: 0x6A5418 }));
st.rotation.z = Math.PI / 4;
}
var tp = new THREE.Group();
tp.position.set(2.2, 0, 0.9);
f.add(tp);
for (var l = 0; l < 3; l++) {
var lg = hwdCyl(tp, 0.025, 0.025, 1.4, Math.cos(l * 2.1) * 0.3, 0.65, Math.sin(l * 2.1) * 0.3, hwdMat(0x5A3A22, "wood"), 5);
lg.rotation.z = Math.cos(l * 2.1) * -0.22;
lg.rotation.x = Math.sin(l * 2.1) * 0.22;
}
var tube = hwdCyl(tp, 0.09, 0.13, 1.3, 0, 1.45, 0, brass, 10);
tube.rotation.z = 0.9;
hwdBall(f, 0.28, -2.2, 0.28, 0.9, hwdMat(0x2A3A6A, null, { shine: 80 }), 12);
hwdTor(f, 0.38, 0.025, -2.2, 0.3, 0.9, brass);
hwdMotes(f, 18, [2.2, 4.6, 0.6], 0xFFFFFF, 0.07, "swirl", 0.08, 0, 0.4, 0.7, 0.9);
});
var arm = new THREE.Group();
arm.position.set(0, D.oTop * 0.6, 0);
arm.userData.keep = 1;
arm.userData.spin = 0.12;
g.add(arm);
hwdTor(arm, 2.55, 0.045, 0, 0, 0, brass, Math.PI * 2, 40);
var t2 = hwdTor(arm, 2.45, 0.035, 0, 0, 0, brass, Math.PI * 2, 40);
t2.rotation.y = Math.PI / 2;
var t3 = hwdTor(arm, 2.5, 0.03, 0, 0, 0, brass, Math.PI * 2, 40);
t3.rotation.x = Math.PI / 2.6;
},
function (g) {
var rust = hwdMat(0x8A4A2A, "metalroof"), steel = hwdMat(0x5A5650, "metal", { shine: 20 }), drum = hwdMat(0x7A3A1A, "metal"), tyre = hwdMat(0x1A1A1A);
hwdDoorway(g, { shape: "square", hw: 1.15, h: 3.3, border: 0.5, frame: steel, leaf: rust, glow: 0xE8C080, step: hwdMat(0x6A6052, "concrete") });
hwdTwoFaces(g, function (f) {
[-1, 1].forEach(function (s) { for (var p = 0; p < 3; p++) {
var sh = hwdBox(f, 0.8, 1.5, 0.05, s * (1.6 + p * 0.15), 0.8 + p * 1.25, 0.44 + p * 0.02, rust);
sh.rotation.z = s * (p - 1) * 0.12;
} });
var bar = hwdBox(f, 4.2, 0.2, 0.2, 0, 4.0, 0.46, steel);
bar.rotation.z = 0.06;
hwdCyl(f, 0.3, 0.3, 0.9, 2.3, 0.45, 0.9, drum, 12);
hwdTor(f, 0.3, 0.03, 2.3, 0.25, 0.9, steel).rotation.x = Math.PI / 2;
hwdTor(f, 0.3, 0.03, 2.3, 0.7, 0.9, steel).rotation.x = Math.PI / 2;
var d2 = hwdCyl(f, 0.3, 0.3, 0.9, -2.2, 0.3, 1.0, hwdMat(0x3A5A6A, "metal"), 12);
d2.rotation.z = Math.PI / 2;
var ty = hwdTor(f, 0.38, 0.14, -1.4, 0.18, 1.3, tyre, Math.PI * 2, 14);
ty.rotation.x = Math.PI / 2;
hwdCyl(f, 0.035, 0.035, 2.2, 2.9, 1.1, 0.4, steel, 5);
var sign = hwdBox(f, 0.8, 0.8, 0.03, 2.9, 2.0, 0.42, hwdMat(0xD8B030, null, { e: 0x2A2008 }));
sign.rotation.z = Math.PI / 4;
hwdBox(f, 0.07, 0.32, 0.01, 2.9, 2.03, 0.445, tyre);
hwdBox(f, 0.07, 0.07, 0.01, 2.9, 1.8, 0.445, tyre);
hwdMotes(f, 14, [2.6, 1.4, 1.0], 0xC8B088, 0.12, "swirl", 0.25, 0, 0.1, 1.0, 0.55);
});
},
function (g) {
var sand = hwdMat(0xD8B888, "sand"), stone = hwdMat(0xD0A878, "stone"), tile = hwdMat(0x2A6AA8, "tile", { shine: 60 }), wood = hwdMat(0x7A4A28, "wood"), brass = hwdMat(0xC89A40, "metal", { shine: 80 });
hwdDoorway(g, { shape: "horseshoe", hw: 1.15, h: 2.9, border: 0.6, frame: stone, leaf: wood, glow: 0xFFD898, step: sand });
hwdTwoFaces(g, function (f) {
hwdTor(f, 1.42, 0.1, 0, 2.9, 0.42, tile, Math.PI + 0.7, 24).rotation.z = -0.35;
for (var r = 0; r < 4; r++)
for (var c = 0; c < 3; c++)
hwdBall(f, 0.05, -0.6 + c * 0.6, 0.7 + r * 0.85, 0.13, brass, 6);
[-1, 1].forEach(function (s) {
hwdBox(f, 0.5, 4.6, 0.3, s * 2.05, 2.3, 0.25, stone);
hwdBox(f, 0.5, 0.5, 0.05, s * 2.05, 3.6, 0.42, tile);
hwdPot(f, s * 2.75, 0.9, hwdMat(0xB86A3A, "plaster"), hwdMat(0x4A7A2A, "foliage"), "palm");
var dn = hwdBall(f, 0.9, s * 1.4, 0, 1.2, sand, 10);
dn.scale.set(1.2, 0.25, 0.7);
var lt = new THREE.Group();
lt.position.set(s * 1.6, 3.6, 0.62);
f.add(lt);
hwdCyl(lt, 0.015, 0.015, 0.5, 0, 0.25, 0, brass, 4);
var lb = hwdCyl(lt, 0.16, 0.12, 0.4, 0, -0.15, 0, brass, 8);
hwdGlow(lt, 0xFFC060, 1.2, 0, -0.15, 0, 0.6).userData.flick = 1;
});
});
},
function (g) {
var steel = hwdMat(0xA4AAB4, "metal", { shine: 60, spec: 0xAAAAAA }), dark = hwdMat(0x3A4048, "metal", { shine: 40 }), haz = hwdMat(0xE8B020), black = hwdMat(0x1A1A1A);
var D = hwdDoorway(g, { shape: "hex", hw: 1.2, h: 3.2, border: 0.5, frame: steel, leaf: dark, glow: 0x9AE8FF, step: dark });
hwdTwoFaces(g, function (f) {
hwdBox(f, 0.04, 3.6, 0.03, 0, 1.8, 0.13, black);
for (var i = 0; i < 6; i++) {
var hz = hwdBox(f, 0.3, 0.12, 0.03, -1.0 + i * 0.4, 0.3, 0.42, i % 2 ? black : haz);
hz.rotation.z = 0.6;
}
[-1, 1].forEach(function (s) {
hwdBox(f, 0.36, 0.5, 0.06, s * 1.85, 1.5, 0.44, dark);
for (var b = 0; b < 3; b++)
hwdBox(f, 0.07, 0.07, 0.02, s * 1.85 - 0.1 + b * 0.1, 1.62, 0.48, hwdMat([0x3AE85A, 0xE8C83A, 0x3A9AE8][b], null, { e: [0x1A6A2A, 0x6A5A1A, 0x1A4A6A][b] }));
hwdCyl(f, 0.08, 0.08, 4.2, s * 2.15, 2.1, 0.3, dark, 8);
hwdBox(f, 0.24, 0.24, 0.24, s * 2.15, 4.3, 0.3, steel);
});
var beacon = hwdBall(f, 0.12, 0, D.oTop + 0.3, 0.42, hwdMat(0x3AE87A, null, { e: 0x1AA84A }), 8);
var bg = hwdGlow(f, 0x5AFF8A, 0.9, 0, D.oTop + 0.3, 0.5, 0.5);
if (bg)
bg.userData.slow = 1;
});
},
function (g) {
var dark = hwdMat(0x1E2230, "metal", { shine: 100, spec: 0x8888AA }), cyan = hwdMat(0x3AE8F0, null, { basic: true }), rose = hwdMat(0xF05AC8, null, { basic: true }), glass = hwdMat(0x5A8AB0, null, { shine: 120, spec: 0xFFFFFF, e: 0x10203A });
var D = hwdDoorway(g, { shape: "square", hw: 1.2, h: 3.6, border: 0.35, frame: dark, leaf: glass, glow: 0x9A6AF0, step: dark });
hwdTwoFaces(g, function (f) {
hwdBox(f, 0.05, 3.8, 0.05, -1.6, 1.9, 0.42, cyan);
hwdBox(f, 0.05, 3.8, 0.05, 1.6, 1.9, 0.42, cyan);
hwdBox(f, 3.25, 0.05, 0.05, 0, 3.98, 0.42, rose);
hwdBox(f, 0.05, 1.0, 0.03, 0.85, 1.5, 0.13, hwdMat(0xC8CCD8, "metal", { shine: 120 }));
[-1, 1].forEach(function (s) {
var pl = hwdBox(f, 0.4, 4.6, 0.4, s * 2.2, 2.3, 0.3, dark);
pl.rotation.y = Math.PI / 4;
for (var k = 0; k < 4; k++)
hwdBox(f, 0.42, 0.03, 0.42, s * 2.2, 0.8 + k * 1.1, 0.3, k % 2 ? rose : cyan).rotation.y = Math.PI / 4;
hwdGlow(f, s < 0 ? 0x3AE8F0 : 0xF05AC8, 1.6, s * 2.2, 4.7, 0.3, 0.45);
});
});
var ring = new THREE.Group();
ring.position.set(0, D.oTop + 0.9, 0);
ring.userData.keep = 1;
ring.userData.spin = 0.5;
g.add(ring);
var rr = hwdTor(ring, 0.55, 0.03, 0, 0, 0, cyan, Math.PI * 2, 32);
rr.rotation.x = Math.PI / 2;
},
function (g, spec, key) {
var W = HWD_WORLDS[key];
if (!W)
return;
while (g.children.length)
g.remove(g.children[0]);
var inner = new THREE.Group();
g.add(inner);
W.draw(inner);
var bb = new THREE.Box3(), b1 = new THREE.Box3();
inner.updateMatrixWorld(true);
inner.traverse(function (o) { if (o.isMesh && !(o.parent && o.parent.userData.spin)) {
if (!o.geometry.boundingBox)
o.geometry.computeBoundingBox();
b1.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
bb.union(b1);
} });
var top = bb.max.y, P = HWD_PLATES[key] || ["#2A2018", "#E8D8A8"];
var name = String(spec.name || spec.label || "").replace(/ — yours$/, "");
var py = W.plateY || Math.min(top + 0.45, 7.2);
hwdPlate(inner, name, py, W.plateZ || 0.5, P[0], P[1], W.sub, 2.9);
hwdGlow(inner, W.glow, 3.4, 0, 0.6, -1.3, 0.22);
if (typeof gwBake === "function")
try {
gwBake(inner);
}
catch (e) { }
if (typeof shadowsFor === "function")
shadowsFor(inner, false);
g.userData.hwd = key;
},
function (g, spec) {
var panes = [], motes = [], spins = [], flick = [], slow = [], seenG = {}, seenM = {};
g.traverse(function (o) {
if (o.isMesh && o.userData.keep && o.material && o.material.transparent && !seenM[o.material.uuid]) {
seenM[o.material.uuid] = 1;
panes.push({ m: o.material, b: o.material.opacity });
}
if (o.isPoints && o.userData.hwd && !seenG[o.geometry.uuid]) {
seenG[o.geometry.uuid] = 1;
motes.push(o);
}
if (o.userData && o.userData.spin)
spins.push(o);
if (o.isSprite && o.userData.flick && !seenM[o.material.uuid]) {
seenM[o.material.uuid] = 1;
flick.push({ m: o.material, b: o.material.opacity });
}
if (o.isSprite && o.userData.slow && !seenM[o.material.uuid]) {
seenM[o.material.uuid] = 1;
slow.push({ m: o.material, b: o.material.opacity });
}
});
var ph = ((spec && spec.x) || 0) * 0.37;
return function (t, dt) {
dt = Math.min(dt || 0.016, 0.1);
for (var i = 0; i < panes.length; i++)
panes[i].m.opacity = panes[i].b * (0.78 + 0.22 * Math.sin(t * 0.9 + ph));
for (var j = 0; j < motes.length; j++) {
var M = motes[j], h = M.userData.hwd;
if (h.mode === "rise" && typeof rise === "function")
rise(M, dt, h.speed, 0);
else if (h.mode === "fall" && typeof fall === "function")
fall(M, dt, h.speed, 0.1);
else if (h.mode === "swirl" && typeof swirl === "function")
swirl(M, dt, h.speed, 0.15, false);
}
for (var k = 0; k < spins.length; k++)
spins[k].rotation.y += spins[k].userData.spin * dt;
for (var f = 0; f < flick.length; f++)
flick[f].m.opacity = flick[f].b * (0.85 + 0.1 * Math.sin(t * 5.3 + f) + 0.05 * Math.sin(t * 8.9 + f * 2));
for (var s = 0; s < slow.length; s++)
slow[s].m.opacity = slow[s].b * (0.55 + 0.45 * Math.sin(t * 1.6));
};
},
function (g) {
while (g.children.length)
g.remove(g.children[0]);
var inner = new THREE.Group();
g.add(inner);
var gilt = hwdMat(0xC9A24A, "metal", { shine: 90, spec: 0xFFE8A0 }), glass = hwdMat(0xC8D2DE, null, { shine: 150, spec: 0xFFFFFF, e: 0x2A3038 }), foot = hwdMat(0x2A2E3A, "stone");
var D = hwdDoorway(inner, { shape: "arch", hw: 0.8, h: 2.9, border: 0.18, depth: 0.24, frame: gilt, leaf: glass, glow: null, step: false });
hwdBox(inner, 2.0, 0.5, 0.6, 0, 0.25, 0, foot);
hwdTwoFaces(inner, function (f) { hwdBall(f, 0.13, 0, D.oTop + 0.05, 0.12, gilt, 8); hwdBall(f, 0.07, -0.98, 0.6, 0.12, gilt, 6); hwdBall(f, 0.07, 0.98, 0.6, 0.12, gilt, 6); });
if (typeof gwBake === "function")
try {
gwBake(inner);
}
catch (e) { }
if (typeof shadowsFor === "function")
shadowsFor(inner, false);
g.userData.hwd = "mirror";
},
function (f) {
var iron = hwdMat(0x2A2826, "metal", { shine: 30 }), stone = hwdMat(0x8A8478, "stone");
[-1, 1].forEach(function (s) {
hwdBox(f, 0.08, 0.5, 0.3, s * 2.1, 3.2, 0.7, iron);
hwdCyl(f, 0.07, 0.05, 0.6, s * 2.1, 3.5, 0.85, hwdMat(0x5A3A22, "wood"), 6);
hwdBall(f, 0.12, s * 2.1, 3.85, 0.85, hwdMat(0xFF9A30, null, { e: 0xC85A10 }), 6);
hwdGlow(f, 0xFF9A40, 1.4, s * 2.1, 3.95, 0.85, 0.65).userData.flick = 1;
hwdMotes(f, 8, [0.12, 1.2, 0.12], 0xFFB050, 0.08, "rise", 0.8, s * 2.1, 3.9, 0.85, 0.9);
});
hwdBox(f, 0.7, 0.8, 0.7, 2.6, 0.4, 1.4, stone);
hwdBall(f, 0.22, 2.6, 0.98, 1.4, hwdMat(0xB8302A, "wood"), 10);
hwdTor(f, 0.23, 0.015, 2.6, 0.98, 1.4, hwdMat(0xD8C8A0)).rotation.x = 1.1;
},
function (f) {
var terra = hwdMat(0xB8603A, "plaster"), cyp = hwdMat(0x2E4A2A, "foliage"), wood = hwdMat(0x7A5232, "wood");
hwdPot(f, -2.9, 0.9, terra, cyp, "cypress");
hwdPot(f, 2.9, 0.9, terra, cyp, "cypress");
var ez = new THREE.Group();
ez.position.set(-2.0, 0, 1.8);
ez.rotation.y = 0.5;
f.add(ez);
var l1 = hwdBox(ez, 0.06, 1.9, 0.06, -0.35, 0.95, 0, wood);
l1.rotation.z = 0.12;
var l2 = hwdBox(ez, 0.06, 1.9, 0.06, 0.35, 0.95, 0, wood);
l2.rotation.z = -0.12;
var l3 = hwdBox(ez, 0.06, 1.8, 0.06, 0, 0.9, -0.35, wood);
l3.rotation.x = -0.25;
hwdBox(ez, 0.8, 0.05, 0.12, 0, 0.8, 0.06, wood);
var cv = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.6), new THREE.MeshLambertMaterial({ map: hwdSketchTex() }));
cv.position.set(0, 1.15, 0.07);
cv.rotation.x = -0.12;
ez.add(cv);
hwdLantern(f, 2.25, 3.6, 0.6, 0xFFD8A0, hwdMat(0x3A3026, "metal", { shine: 40 }));
},
function (f) {
var oak = hwdMat(0x4A3424, "wood");
[-1, 1].forEach(function (s) { var br = hwdBox(f, 0.16, 1.5, 0.06, s * 2.6, 3.0, 0.18, oak); br.rotation.z = s * 0.55; var b2 = hwdBox(f, 0.16, 1.5, 0.06, s * 2.6, 1.3, 0.18, oak); b2.rotation.z = -s * 0.55; });
var bill = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 1.0), new THREE.MeshLambertMaterial({ map: hwdBillTex() }));
bill.position.set(-2.6, 2.2, 0.34);
f.add(bill);
var bar = hwdCyl(f, 0.34, 0.34, 0.8, 2.6, 0.4, 1.0, hwdMat(0x6A4426, "wood"), 12);
hwdTor(f, 0.35, 0.025, 2.6, 0.15, 1.0, hwdMat(0x2A2A2A, "metal")).rotation.x = Math.PI / 2;
hwdTor(f, 0.35, 0.025, 2.6, 0.65, 1.0, hwdMat(0x2A2A2A, "metal")).rotation.x = Math.PI / 2;
hwdBox(f, 0.05, 0.05, 0.7, 1.9, 4.2, 0.35, hwdMat(0x1A1A1A, "metal"));
hwdLantern(f, 1.9, 3.8, 0.65, 0xFFC070, hwdMat(0x1A1A1A, "metal", { shine: 30 }));
},
function (f) {
var copper = hwdMat(0xB0683A, "metal", { shine: 70, spec: 0xFFC8A0 }), brass = hwdMat(0xC8A048, "metal", { shine: 80, spec: 0xFFE8A0 });
[-1, 1].forEach(function (s) { hwdCyl(f, 0.09, 0.09, 4.6, s * 2.5, 2.3, 0.3, copper, 10); for (var j = 0; j < 3; j++)
hwdTor(f, 0.11, 0.03, s * 2.5, 0.8 + j * 1.5, 0.3, brass).rotation.x = Math.PI / 2; });
hwdCyl(f, 0.26, 0.26, 0.1, 2.5, 2.4, 0.45, brass, 16).rotation.x = Math.PI / 2;
var face = new THREE.Mesh(new THREE.CircleGeometry(0.21, hwdSeg(20)), new THREE.MeshLambertMaterial({ map: hwdGaugeTex() }));
face.position.set(2.5, 2.4, 0.51);
f.add(face);
hwdLantern(f, -2.5, 3.0, 0.65, 0xFFE0A0, brass);
hwdBox(f, 1.0, 0.6, 0.6, -2.4, 0.3, 1.3, hwdMat(0x5A3A22, "wood"));
hwdBox(f, 1.04, 0.06, 0.64, -2.4, 0.45, 1.3, brass);
hwdBox(f, 1.04, 0.06, 0.64, -2.4, 0.15, 1.3, brass);
},
function (f) {
var pump = hwdMat(0xE07018, null, { shine: 20, spec: 0x553311 }), stem = hwdMat(0x4A5A20), straw = hwdMat(0xD8B860, "thatch");
[[-2.3, 0.9, 0.42], [-2.8, 1.4, 0.32], [2.4, 1.0, 0.4], [1.9, 1.6, 0.28], [2.9, 1.5, 0.3]].forEach(function (p, i) {
var pu = hwdBall(f, p[2], p[0], p[2] * 0.8, p[1], pump, 12);
pu.scale.y = 0.8;
hwdCyl(f, 0.03, 0.04, 0.14, p[0], p[2] * 1.55, p[1], stem, 5);
if (i % 2 === 0) {
hwdBox(f, p[2] * 0.5, p[2] * 0.18, 0.02, p[0], p[2] * 0.62, p[1] + p[2] * 0.98, hwdMat(0xFFB040, null, { basic: true }));
hwdBox(f, 0.08, 0.08, 0.02, p[0] - p[2] * 0.3, p[2] * 0.95, p[1] + p[2] * 0.93, hwdMat(0xFFB040, null, { basic: true }));
hwdBox(f, 0.08, 0.08, 0.02, p[0] + p[2] * 0.3, p[2] * 0.95, p[1] + p[2] * 0.93, hwdMat(0xFFB040, null, { basic: true }));
var gl = hwdGlow(f, 0xFF8A20, 1.3, p[0], p[2] * 0.8, p[1] + p[2] + 0.1, 0.5);
if (gl)
gl.userData.flick = 1;
}
});
hwdBox(f, 1.2, 0.6, 0.7, -2.6, 0.3, 2.0, straw);
for (var c = 0; c < 3; c++) {
hwdCyl(f, 0.09, 0.09, 0.2, -1.3 + c * 0.25, 0.1, 1.3, hwdMat(0xA8C8B0, null, { op: 0.5 }), 8);
hwdGlow(f, 0xFFC060, 0.5, -1.3 + c * 0.25, 0.26, 1.3, 0.7).userData.flick = 1;
}
},
function (f) {
var fern = hwdMat(0x3A6A2A, null, { ds: true }), cap = hwdMat(0x8A3A1A), stem = hwdMat(0xE0D4B8), iron = hwdMat(0x1A1A1A, "metal", { shine: 30 });
[-1, 1].forEach(function (s) {
for (var i = 0; i < 6; i++) {
var fr = hwdBox(f, 0.12, 0.02, 0.9, s * (2.5 + (i % 3) * 0.25), 0.35, 0.9 + (i >> 1) * 0.25, fern);
fr.rotation.y = i * 1.05;
fr.rotation.x = -0.5;
fr.translateZ(0.3);
}
for (var m = 0; m < 3; m++) {
var mx = s * (1.9 + m * 0.3), mz = 1.0 + (m % 2) * 0.4;
hwdCyl(f, 0.04, 0.05, 0.22, mx, 0.11, mz, stem, 6);
var cp = hwdBall(f, 0.13, mx, 0.22, mz, cap, 8);
cp.scale.y = 0.5;
}
});
hwdCyl(f, 0.05, 0.06, 3.4, -2.9, 1.7, 0.7, hwdMat(0x4A3424, "bark"), 6);
hwdBox(f, 0.6, 0.05, 0.05, -2.65, 3.35, 0.7, hwdMat(0x4A3424, "bark"));
hwdLantern(f, -2.4, 3.0, 0.7, 0xFFC870, iron);
hwdCyl(f, 0.32, 0.25, 0.35, 2.0, 0.18, 1.8, hwdMat(0x9A7A48, "thatch"), 12);
var cl = hwdBox(f, 0.6, 0.06, 0.5, 2.0, 0.38, 1.8, hwdMat(0xB0181E));
cl.rotation.y = 0.3;
hwdTor(f, 0.3, 0.025, 2.0, 0.4, 1.8, hwdMat(0x8A6A40, "wood"), Math.PI).rotation.y = Math.PI / 2;
},
function () {
return hwdCanvas("sketch", 256, 200, function (x, w, h) {
x.fillStyle = "#E8D8B0";
x.fillRect(0, 0, w, h);
x.strokeStyle = "#6A4A2A";
x.lineWidth = 2;
x.beginPath();
x.moveTo(128, 110);
x.quadraticCurveTo(60, 40, 10, 70);
x.quadraticCurveTo(60, 70, 128, 110);
x.stroke();
x.beginPath();
x.moveTo(128, 110);
x.quadraticCurveTo(196, 40, 246, 70);
x.quadraticCurveTo(196, 70, 128, 110);
x.stroke();
for (var i = 0; i < 6; i++) {
x.beginPath();
x.moveTo(128, 110);
x.lineTo(20 + i * 18, 68 - i * 3);
x.stroke();
x.beginPath();
x.moveTo(128, 110);
x.lineTo(236 - i * 18, 68 - i * 3);
x.stroke();
}
x.beginPath();
x.arc(128, 120, 10, 0, 7);
x.stroke();
x.font = "italic 13px Georgia";
x.fillStyle = "#6A4A2A";
x.fillText("uccello", 100, 170);
});
},
function () {
return hwdCanvas("bill", 160, 230, function (x, w, h) {
x.fillStyle = "#EDE2C4";
x.fillRect(0, 0, w, h);
x.fillStyle = "#2A1A10";
x.textAlign = "center";
x.font = "bold 20px Georgia";
x.fillText("AT THE", 80, 34);
x.font = "bold 28px Georgia";
x.fillText("GLOBE", 80, 66);
x.font = "16px Georgia";
x.fillText("this afternoon", 80, 96);
x.font = "bold 18px Georgia";
x.fillText("The Tragedie", 80, 132);
x.fillText("of Hamlet", 80, 156);
x.font = "italic 13px Georgia";
x.fillText("by the Lord", 80, 190);
x.fillText("Chamberlain's Men", 80, 208);
});
},
function () {
return hwdCanvas("gauge", 128, 128, function (x, w, h) {
x.fillStyle = "#F2EAD8";
x.beginPath();
x.arc(64, 64, 62, 0, 7);
x.fill();
x.strokeStyle = "#2A2A2A";
x.lineWidth = 3;
for (var i = 0; i <= 10; i++) {
var a = Math.PI * 0.75 + i / 10 * Math.PI * 1.5;
x.beginPath();
x.moveTo(64 + Math.cos(a) * 44, 64 + Math.sin(a) * 44);
x.lineTo(64 + Math.cos(a) * 54, 64 + Math.sin(a) * 54);
x.stroke();
}
x.strokeStyle = "#8A1A1A";
x.lineWidth = 4;
x.beginPath();
x.moveTo(64, 64);
x.lineTo(64 + Math.cos(-0.6) * 42, 64 + Math.sin(-0.6) * 42);
x.stroke();
});
},
function (S) {
var g = S.g();
if (!g || g.userData.hwd)
return;
g.userData.hwd = "story";
g.traverse(function (m) {
if (!m.isMesh || !m.material || Array.isArray(m.material) || m.material.map || m.material.transparent || !m.material.color)
return;
var kind = S.surf[m.material.color.getHex()];
if (!kind || typeof texOf !== "function")
return;
var t = texOf(kind);
if (!t)
return;
var P = m.geometry && m.geometry.parameters, ty = m.geometry && m.geometry.type;
if (P && ty === "BoxGeometry") {
m.geometry = m.geometry.clone();
hwdUV(m.geometry, "box", [P.width, P.height, P.depth]);
}
else if (P && ty === "CylinderGeometry") {
m.geometry = m.geometry.clone();
hwdUV(m.geometry, "cyl", [P.radiusTop, P.radiusBottom, P.height]);
}
else if (P && ty === "ConeGeometry") {
m.geometry = m.geometry.clone();
hwdUV(m.geometry, "cone", [P.radius, P.height]);
}
else if (P && ty === "SphereGeometry") {
m.geometry = m.geometry.clone();
hwdUV(m.geometry, "sph", [P.radius]);
}
var mm = m.material.clone();
mm.map = t;
mm.needsUpdate = true;
m.material = mm;
});
var f = new THREE.Group();
S.draw(f);
g.add(f);
g.updateMatrixWorld(true);
if (typeof gwBake === "function")
try {
gwBake(f);
}
catch (e) { }
f.userData.keep = 1;
S.anim = hwdAnim(f, null);
},
function (x, z) {
var hall = typeof hallRealm === "function" ? hallRealm() : null;
if (!hall)
return null;
var best = null, bd = 2.6;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.archetype !== "hubdoor" || !o.leadsTo || o.realm !== hall.id)
continue;
var d = Math.hypot(o.x - x, o.z - z);
if (d < bd) {
bd = d;
best = o;
}
}
return best;
}
];
});
