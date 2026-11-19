/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(187, function () {
"use strict";
return [
function (spec) {
if (!spec)
return null;
if (spec.psSetting)
return spec.psSetting;
if (spec.psInside)
return "volcano";
var a = spec.archetype;
if (a === "dragonlair" || a === "firepalace")
return "volcano";
if (a === "dwarvenhall" || a === "earthpalace")
return "rock";
if (spec.dlNest && (a === "castle" || a === "fortress" || a === "wizardschool" || a === "temple"))
return "rock";
if (a === "castle" || a === "fortress" || a === "wizardschool")
return "stone";
return null;
},
function (N, draw, rep) {
var c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d", { willReadFrequently: true });
draw(x, N);
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (rep)
t.repeat.set(rep, rep);
try {
t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
return t;
},
function (seed, n) {
var r = psRand(seed), out = [];
for (var i = 0; i < n; i++) {
var x = r() * 512, y = r() * 512, a = r() * 6.283, pts = [[x, y]], L = 10 + Math.floor(r() * 18);
for (var k = 0; k < L; k++) {
a += (r() - 0.5) * 1.1;
x += Math.cos(a) * (8 + r() * 14);
y += Math.sin(a) * (8 + r() * 14);
pts.push([x, y]);
if (r() < 0.12) {
var b = a + (r() < 0.5 ? 1 : -1) * (0.7 + r() * 0.6), bx = x, by = y, bp = [[bx, by]];
for (var j = 0; j < 4 + r() * 6; j++) {
b += (r() - 0.5) * 0.9;
bx += Math.cos(b) * (6 + r() * 10);
by += Math.sin(b) * (6 + r() * 10);
bp.push([bx, by]);
}
out.push(bp);
}
}
out.push(pts);
}
return out;
},
function (kind) {
var key = "rock:" + kind;
if (PS.tex[key])
return PS.tex[key];
var lines = psCracks(kind === "volcano" ? 41 : 17, kind === "volcano" ? 16 : 10);
var t = psCanvasTex(512, function (x, N) {
var r = psRand(kind === "volcano" ? 9 : 5);
x.fillStyle = kind === "volcano" ? "#3A3330" : kind === "stone" ? "#8C857B" : "#5E574E";
x.fillRect(0, 0, N, N);
for (var i = 0; i < 900; i++) {
var px = r() * N, py = r() * N, rad = 6 + r() * 40, v = r();
var g = x.createRadialGradient(px, py, 0, px, py, rad);
var c = kind === "volcano" ? (v < 0.5 ? "rgba(20,16,14," : "rgba(92,78,70,") : kind === "stone" ? (v < 0.5 ? "rgba(110,104,96," : "rgba(170,162,150,") : (v < 0.5 ? "rgba(50,45,40," : "rgba(130,120,108,");
g.addColorStop(0, c + (0.16 + r() * 0.2) + ")");
g.addColorStop(1, c + "0)");
x.fillStyle = g;
x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
}
for (var s = 0; s < 5000; s++) {
var q = r();
x.fillStyle = q < 0.5 ? "rgba(0,0,0,.25)" : "rgba(255,240,220,.08)";
x.fillRect(r() * N, r() * N, 1 + r() * 2, 1 + r() * 2);
}
if (kind === "stone") {
x.strokeStyle = "rgba(40,36,32,.75)";
x.lineWidth = 3;
for (var row = 0; row < 8; row++) {
var y0 = row * N / 8;
x.beginPath();
x.moveTo(0, y0);
x.lineTo(N, y0);
x.stroke();
for (var col = 0; col < 4; col++) {
var xx = (col + (row % 2 ? 0.5 : 0)) * N / 4;
x.beginPath();
x.moveTo(xx, y0);
x.lineTo(xx, y0 + N / 8);
x.stroke();
}
}
}
else {
x.strokeStyle = "rgba(10,8,7,.85)";
psStroke(x, lines, N, kind === "volcano" ? 3 : 2);
}
});
t.userData = { lines: lines };
PS.tex[key] = t;
return t;
},
function () {
if (PS.tex.glow)
return PS.tex.glow;
var lines = psRockTex("volcano").userData.lines;
var t = psCanvasTex(512, function (x, N) {
x.fillStyle = "#000";
x.fillRect(0, 0, N, N);
x.strokeStyle = "rgba(255,70,10,.55)";
psStroke(x, lines, N, 7);
x.strokeStyle = "#FF7A1E";
psStroke(x, lines, N, 3);
x.strokeStyle = "#FFD27A";
psStroke(x, lines, N, 1.2);
});
PS.tex.glow = t;
return t;
},
function () {
if (PS.tex.lava)
return PS.tex.lava;
var t = psCanvasTex(256, function (x, N) {
var g = x.createLinearGradient(0, 0, 0, N);
g.addColorStop(0, "#FF6A12");
g.addColorStop(0.5, "#FFB23A");
g.addColorStop(1, "#FF6A12");
x.fillStyle = g;
x.fillRect(0, 0, N, N);
var r = psRand(3);
for (var i = 0; i < 70; i++) {
var px = r() * N, py = r() * N, w = 10 + r() * 40, h = 6 + r() * 16;
[-N, 0, N].forEach(function (o) { [-N, 0, N].forEach(function (p) { x.fillStyle = "rgba(60,14,4," + (0.35 + r() * 0.4) + ")"; x.beginPath(); x.ellipse(px + o, py + p, w / 2, h / 2, r() * 3, 0, 6.283); x.fill(); }); });
}
for (var k = 0; k < 60; k++) {
x.fillStyle = "rgba(255,236,160,.5)";
x.fillRect(r() * N, r() * N, 2 + r() * 6, 1 + r() * 2);
}
});
PS.tex.lava = t;
return t;
},
function () {
if (PS.tex.fireglow)
return PS.tex.fireglow;
var t = psCanvasTex(256, function (x, N) {
var g = x.createRadialGradient(N / 2, N * 0.9, 4, N / 2, N * 0.75, N * 0.8);
g.addColorStop(0, "#FFF2C0");
g.addColorStop(0.25, "#FFB040");
g.addColorStop(0.6, "#C83A10");
g.addColorStop(1, "#2A0C06");
x.fillStyle = g;
x.fillRect(0, 0, N, N);
x.fillStyle = "rgba(30,10,6,.75)";
[0.12, 0.32, 0.68, 0.88].forEach(function (f) { var w = N * 0.07 * (f < 0.2 || f > 0.8 ? 1.3 : 1); x.fillRect(f * N - w / 2, N * 0.2, w, N * 0.8); x.fillRect(f * N - w * 0.8, N * 0.18, w * 1.6, N * 0.05); });
});
t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
PS.tex.fireglow = t;
return t;
},
function () {
if (PS.tex.coin)
return PS.tex.coin;
var t = psCanvasTex(256, function (x, N) {
x.fillStyle = "#B8861E";
x.fillRect(0, 0, N, N);
var r = psRand(11);
for (var i = 0; i < 520; i++) {
var px = r() * N, py = r() * N, rad = 4 + r() * 6;
x.fillStyle = r() < 0.5 ? "#E8C254" : "#C9982A";
x.beginPath();
x.ellipse(px, py, rad, rad * (0.45 + r() * 0.55), r() * 3, 0, 6.283);
x.fill();
x.strokeStyle = "rgba(90,60,10,.6)";
x.lineWidth = 1;
x.stroke();
x.fillStyle = "rgba(255,248,210,.7)";
x.fillRect(px - rad * 0.4, py - 1, rad * 0.5, 1.2);
}
}, 1);
PS.tex.coin = t;
return t;
},
function (k) {
if (PS.mats[k])
return PS.mats[k];
var M;
switch (k) {
case "gold":
M = new THREE.MeshPhongMaterial({ color: 0xD9A93A, emissive: 0x3A2606, specular: 0xFFE7A8, shininess: 70 });
break;
case "goldD":
M = new THREE.MeshPhongMaterial({ color: 0xA87A1A, emissive: 0x281A04, specular: 0xE8C070, shininess: 50 });
break;
case "coins":
M = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, map: psCoinTex(), emissive: 0x2A1A04, specular: 0xFFE0A0, shininess: 45 });
break;
case "steel":
M = new THREE.MeshPhongMaterial({ color: 0xB4B8C0, specular: 0xFFFFFF, shininess: 80 });
break;
case "iron":
M = new THREE.MeshLambertMaterial({ color: 0x2A2826 });
break;
case "bronze":
M = new THREE.MeshPhongMaterial({ color: 0xB0703A, specular: 0xFFC090, shininess: 50 });
break;
case "copper":
M = new THREE.MeshPhongMaterial({ color: 0x44454C, specular: 0x8A8C96, shininess: 50 });
break;
case "brass":
M = new THREE.MeshPhongMaterial({ color: 0xA88A3E, specular: 0xC8B080, shininess: 45 });
break;
case "wood":
M = new THREE.MeshLambertMaterial({ color: 0x6A4228 });
break;
case "woodD":
M = new THREE.MeshLambertMaterial({ color: 0x3E2616 });
break;
case "velvet":
M = new THREE.MeshLambertMaterial({ color: 0x8A1422 });
break;
case "velvetD":
M = new THREE.MeshLambertMaterial({ color: 0x5A0C16 });
break;
case "cloth":
M = new THREE.MeshLambertMaterial({ color: 0xE8DCC2 });
break;
case "marble":
M = new THREE.MeshPhongMaterial({ color: 0xE2DCD0, specular: 0x888888, shininess: 40 });
break;
case "basalt":
M = new THREE.MeshLambertMaterial({ color: 0x2E2A28, flatShading: true });
break;
case "basaltL":
M = new THREE.MeshLambertMaterial({ color: 0x48403A, flatShading: true });
break;
case "obsidian":
M = new THREE.MeshPhongMaterial({ color: 0x14121A, specular: 0x8888AA, shininess: 90, flatShading: true });
break;
case "fire":
M = new THREE.MeshBasicMaterial({ color: 0xFF8A2A, transparent: true, opacity: 0.92, depthWrite: false });
break;
case "fireC":
M = new THREE.MeshBasicMaterial({ color: 0xFFD27A, transparent: true, opacity: 0.95, depthWrite: false });
break;
case "coal":
M = new THREE.MeshBasicMaterial({ color: 0xFF5A14 });
break;
case "lava":
M = new THREE.MeshBasicMaterial({ map: psLavaTex(), color: 0xFFFFFF });
break;
case "dark":
M = new THREE.MeshBasicMaterial({ color: 0x0C0A09 });
break;
case "glass":
M = new THREE.MeshPhongMaterial({ color: 0xDDEEFF, transparent: true, opacity: 0.22, specular: 0xFFFFFF, shininess: 100, depthWrite: false });
break;
case "ruby":
M = new THREE.MeshPhongMaterial({ color: 0xD0203A, emissive: 0x400810, specular: 0xFFFFFF, shininess: 100, flatShading: true });
break;
case "emerald":
M = new THREE.MeshPhongMaterial({ color: 0x18A860, emissive: 0x063018, specular: 0xFFFFFF, shininess: 100, flatShading: true });
break;
case "sapphire":
M = new THREE.MeshPhongMaterial({ color: 0x2A50E0, emissive: 0x0A1440, specular: 0xFFFFFF, shininess: 100, flatShading: true });
break;
case "amethyst":
M = new THREE.MeshPhongMaterial({ color: 0x9A40E0, emissive: 0x240A40, specular: 0xFFFFFF, shininess: 100, flatShading: true });
break;
case "diamond":
M = new THREE.MeshPhongMaterial({ color: 0xEAF6FF, emissive: 0x203040, specular: 0xFFFFFF, shininess: 120, flatShading: true });
break;
case "crystal":
M = new THREE.MeshBasicMaterial({ color: 0x8FD8F0, transparent: true, opacity: 0.9 });
break;
case "rock":
M = new THREE.MeshLambertMaterial({ color: 0x5C544C, flatShading: true });
break;
case "ore":
M = new THREE.MeshLambertMaterial({ color: 0x4A423A, flatShading: true });
break;
case "coalheap":
M = new THREE.MeshLambertMaterial({ color: 0x1C1A18, flatShading: true });
break;
case "food":
M = new THREE.MeshLambertMaterial({ color: 0x8A4A22 });
break;
case "fruit":
M = new THREE.MeshLambertMaterial({ color: 0xB8302A });
break;
case "fruitG":
M = new THREE.MeshLambertMaterial({ color: 0x8AB83A });
break;
case "bread":
M = new THREE.MeshLambertMaterial({ color: 0xC89A5A });
break;
case "wine":
M = new THREE.MeshLambertMaterial({ color: 0x5A0A1A });
break;
case "fur":
M = new THREE.MeshLambertMaterial({ color: 0x8A6A4A });
break;
case "steam":
M = new THREE.MeshBasicMaterial({ color: 0xEEEEEE, transparent: true, opacity: 0.22, depthWrite: false });
break;
case "gauge":
M = new THREE.MeshBasicMaterial({ color: 0xF2EAD2 });
break;
case "valve":
M = new THREE.MeshLambertMaterial({ color: 0xA8221E });
break;
default: M = new THREE.MeshLambertMaterial({ color: 0xFF00FF });
}
PS.mats[k] = M;
return M;
},
function (g) {
g.updateMatrixWorld(true);
var buckets = {}, keep = [];
g.children.slice().forEach(function (c) { if (c.userData.psKeep || c.isInstancedMesh || c.isLight) {
keep.push(c);
} });
g.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh)
return;
for (var p = m; p && p !== g; p = p.parent)
if (p.userData.psKeep)
return;
var geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
geo.applyMatrix4(m.matrixWorld);
if (!geo.attributes.uv) {
geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
}
var k = m.material.uuid;
(buckets[k] || (buckets[k] = { mat: m.material, list: [] })).list.push(geo);
});
var out = new THREE.Group();
Object.keys(buckets).forEach(function (k) {
var b = buckets[k], n = 0;
b.list.forEach(function (q) { n += q.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), o = 0;
b.list.forEach(function (q) { pos.set(q.attributes.position.array, o * 3); if (q.attributes.normal)
nor.set(q.attributes.normal.array, o * 3); uv.set(q.attributes.uv.array, o * 2); o += q.attributes.position.count; q.dispose(); });
var mg = new THREE.BufferGeometry();
mg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
mg.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
mg.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
mg.computeBoundingSphere();
var mesh = new THREE.Mesh(mg, b.mat);
mesh.receiveShadow = true;
out.add(mesh);
});
keep.forEach(function (c) { out.add(c); });
return out;
},
function (g, n, R, y0, seed) {
var r = psRand(seed || 5), geo = new THREE.CylinderGeometry(.09, .09, .022, 10), im = new THREE.InstancedMesh(geo, psM("gold"), n), d = new THREE.Object3D();
for (var i = 0; i < n; i++) {
var a = r() * 6.283, rr = R * (0.35 + 0.65 * Math.sqrt(r()));
d.position.set(Math.cos(a) * rr, (y0 || 0) + .012 + r() * 0.02, Math.sin(a) * rr);
d.rotation.set((r() - 0.5) * 0.6, r() * 3, (r() - 0.5) * 0.6);
d.updateMatrix();
im.setMatrixAt(i, d.matrix);
}
im.userData.psKeep = 1;
g.add(im);
return im;
},
function (g, x, y, z, s) {
s = s || 1;
psAdd(g, new THREE.CylinderGeometry(.2 * s, .18 * s, .14 * s, 14, 1, true), "gold", x, y + .07 * s, z);
for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.283;
psAdd(g, new THREE.ConeGeometry(.04 * s, .14 * s, 5), "gold", x + Math.cos(a) * .19 * s, y + .2 * s, z + Math.sin(a) * .19 * s);
psGem(g, PS_GEMS[i % 4], x + Math.cos(a) * .205 * s, y + .07 * s, z + Math.sin(a) * .205 * s, .35 * s);
}
},
function () {
var g = psG(), r = psRand(23);
psAdd(g, psMound(3, 2.3, 24), "coins", 0, 0, 0);
psAdd(g, psMound(1.8, 1.3, 18), "coins", 2.2, 0, 1.2);
psAdd(g, psMound(1.6, 1.1, 18), "coins", -2.1, 0, -1.3);
psAdd(g, psMound(1.2, .8, 16), "coins", -1.6, 0, 1.9);
psCoins(g, 140, 4.2, 0, 7);
for (var i = 0; i < 18; i++) {
var a = r() * 6.283, rr = 1 + r() * 2.6, h = Math.max(0.15, 2.2 * (1 - Math.pow(rr / 3.2, 2)));
psGem(g, PS_GEMS[i % 5], Math.cos(a) * rr, h, Math.sin(a) * rr, 1.2);
}
[[1.4, 1.5, .4], [-1.2, 1.6, .6], [.3, 1.9, -1.1]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.03, .05, .22, 8), "gold", q[0], q[1] + .11, q[2]); psAdd(g, new THREE.CylinderGeometry(.13, .05, .2, 10), "gold", q[0], q[1] + .3, q[2]); });
psCrown(g, 0, 2.28, 0, 1.4);
psAdd(g, new THREE.BoxGeometry(.1, 1.5, .03), "steel", .7, 2.4, .5, 0, 0, .2);
psAdd(g, new THREE.BoxGeometry(.5, .07, .08), "gold", .55, 1.75, .5, 0, 0, .2);
psAdd(g, new THREE.SphereGeometry(.07, 8, 6), "ruby", .5, 1.55, .5);
psAdd(g, new THREE.CylinderGeometry(.6, .6, .06, 16), "gold", -2.6, .6, 1.6, 1.1, 0, .3);
psAdd(g, new THREE.SphereGeometry(.12, 8, 6), "sapphire", -2.55, .63, 1.66);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(1.3, .7, .8), "woodD", 0, .35, 0);
[-0.5, 0, 0.5].forEach(function (x) { psAdd(g, new THREE.BoxGeometry(.08, .72, .82), "gold", x, .36, 0); });
psAdd(g, new THREE.BoxGeometry(1.32, .06, .82), "gold", 0, .7, 0);
var lid = psAdd(g, new THREE.CylinderGeometry(.4, .4, 1.3, 12, 1, false, 0, Math.PI), "woodD", 0, .72, -.4, 0, 0, Math.PI / 2);
lid.rotation.set(-1.2, 0, Math.PI / 2);
lid.position.set(0, 1.0, -.62);
psAdd(g, new THREE.SphereGeometry(.62, 16, 8, 0, 6.283, 0, Math.PI / 2), "coins", 0, .62, 0).scale.set(1, .45, .6);
psGem(g, "ruby", -.3, .95, .1, 1.2);
psGem(g, "emerald", .25, .92, -.05, 1.2);
psGem(g, "sapphire", .05, .98, .15, 1.1);
psGem(g, "diamond", .4, .9, .15, 1);
psAdd(g, new THREE.TorusGeometry(.12, .03, 6, 14), "gold", -.15, .92, .25, 1.2, 0, 0);
psCoins(g, 26, .9, 0, 13);
return psMerge(g);
},
function () {
var g = psG(), G = "gold";
psAdd(g, new THREE.BoxGeometry(1.6, 1.1, 1.6), "marble", 0, .55, 0);
psAdd(g, new THREE.BoxGeometry(1.75, .12, 1.75), "gold", 0, 1.1, 0);
psAdd(g, new THREE.BoxGeometry(1.75, .12, 1.75), "gold", 0, .06, 0);
var b = psAdd(g, new THREE.SphereGeometry(.5, 14, 10), G, 0, 1.75, 0);
b.scale.set(.8, .9, 1.3);
psAdd(g, new THREE.CylinderGeometry(.16, .26, 1, 10), G, 0, 2.35, .45, -.6, 0, 0);
var h = psAdd(g, new THREE.ConeGeometry(.2, .7, 8), G, 0, 2.85, .95, 1.75, 0, 0);
h.scale.set(1, 1, .8);
psAdd(g, new THREE.ConeGeometry(.05, .3, 5), G, -.1, 3.0, .72, -.5, 0, 0);
psAdd(g, new THREE.ConeGeometry(.05, .3, 5), G, .1, 3.0, .72, -.5, 0, 0);
psAdd(g, new THREE.SphereGeometry(.05, 6, 5), "ruby", -.1, 2.88, 1.05);
psAdd(g, new THREE.SphereGeometry(.05, 6, 5), "ruby", .1, 2.88, 1.05);
var sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.lineTo(1.3, .9);
sh.lineTo(1.1, .2);
sh.lineTo(1.4, -.1);
sh.lineTo(.9, -.2);
sh.lineTo(.4, -.4);
sh.lineTo(0, 0);
var wg = new THREE.ShapeGeometry(sh);
var w1 = psAdd(g, wg, new THREE.MeshPhongMaterial({ color: 0xD9A93A, emissive: 0x3A2606, specular: 0xFFE7A8, shininess: 70, side: THREE.DoubleSide }), .25, 1.95, 0, 0, -.4, .35);
var w2 = psAdd(g, wg, w1.material, -.25, 1.95, 0, 0, Math.PI + .4, -.35);
psAdd(g, new THREE.ConeGeometry(.16, 1.3, 8), G, 0, 1.5, -.95, -1.9, 0, 0);
[[-.3, .35], [.3, .35], [-.3, -.35], [.3, -.35]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.08, .1, .5, 6), G, q[0], 1.38, q[1]); });
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.CylinderGeometry(.28, .36, 1.1, 12), "marble", 0, .55, 0);
psAdd(g, new THREE.CylinderGeometry(.38, .38, .08, 14), "gold", 0, 1.12, 0);
psAdd(g, new THREE.BoxGeometry(.5, .12, .5), "velvet", 0, 1.22, 0);
psCrown(g, 0, 1.28, 0, 1);
psAdd(g, new THREE.SphereGeometry(.42, 16, 10, 0, 6.283, 0, Math.PI / 2), "glass", 0, 1.16, 0);
return psMerge(g);
},
function () {
var g = psG(), S = "steel";
psAdd(g, new THREE.BoxGeometry(.8, .12, .6), "woodD", 0, .06, 0);
psAdd(g, new THREE.CylinderGeometry(.09, .08, .85, 8), S, -.14, .55, 0);
psAdd(g, new THREE.CylinderGeometry(.09, .08, .85, 8), S, .14, .55, 0);
psAdd(g, new THREE.CylinderGeometry(.27, .22, .7, 10), S, 0, 1.3, 0);
psAdd(g, new THREE.CylinderGeometry(.24, .28, .16, 10), S, 0, .95, 0);
psAdd(g, new THREE.SphereGeometry(.14, 10, 8), S, -.32, 1.6, 0);
psAdd(g, new THREE.SphereGeometry(.14, 10, 8), S, .32, 1.6, 0);
psAdd(g, new THREE.CylinderGeometry(.06, .06, .6, 6), S, -.36, 1.25, 0);
psAdd(g, new THREE.CylinderGeometry(.06, .06, .6, 6), S, .36, 1.25, 0);
psAdd(g, new THREE.SphereGeometry(.15, 12, 10), S, 0, 1.86, 0);
psAdd(g, new THREE.BoxGeometry(.22, .04, .05), "iron", 0, 1.86, .14);
psAdd(g, new THREE.ConeGeometry(.05, .24, 6), "velvet", 0, 2.08, 0);
psAdd(g, new THREE.CylinderGeometry(.32, .32, .04, 14), "velvet", .42, 1.15, .12, 0, 0, Math.PI / 2);
psAdd(g, new THREE.SphereGeometry(.07, 8, 6), "gold", .45, 1.15, .12);
psAdd(g, new THREE.CylinderGeometry(.02, .02, 2.4, 6), "woodD", -.5, 1.2, .05);
psAdd(g, new THREE.ConeGeometry(.05, .25, 5), S, -.5, 2.5, .05);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(2, .1, .4), "woodD", 0, .05, 0);
psAdd(g, new THREE.BoxGeometry(2, .08, .12), "woodD", 0, 1.7, -.12);
psAdd(g, new THREE.BoxGeometry(2, .08, .12), "woodD", 0, .9, -.12);
psAdd(g, new THREE.BoxGeometry(.08, 1.9, .1), "woodD", -.98, .95, -.12);
psAdd(g, new THREE.BoxGeometry(.08, 1.9, .1), "woodD", .98, .95, -.12);
[-.7, -.35, 0, .35, .7].forEach(function (x, i) {
if (i % 2 === 0) {
psAdd(g, new THREE.BoxGeometry(.06, 1.2, .02), "steel", x, 1.05, 0);
psAdd(g, new THREE.BoxGeometry(.28, .05, .06), "gold", x, .42, 0);
psAdd(g, new THREE.CylinderGeometry(.025, .025, .3, 6), "woodD", x, .25, 0);
}
else {
psAdd(g, new THREE.CylinderGeometry(.025, .025, 1.7, 6), "wood", x, .9, 0);
var ax = psAdd(g, new THREE.CylinderGeometry(.22, .22, .03, 10, 1, false, 0, Math.PI), "steel", x + .1, 1.6, 0, Math.PI / 2, 0, 0);
ax.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
}
});
return psMerge(g);
},
function () {
var g = psG(), H = Math.max(4, (PS.H || 7) - 0.1);
psAdd(g, new THREE.CylinderGeometry(.55, .6, H - 1, 8), "basaltL", 0, H / 2, 0);
psAdd(g, new THREE.BoxGeometry(1.5, .5, 1.5), "basalt", 0, .25, 0);
psAdd(g, new THREE.CylinderGeometry(.68, .68, .14, 12), "gold", 0, .55, 0);
psAdd(g, new THREE.BoxGeometry(1.5, .45, 1.5), "basalt", 0, H - .22, 0);
psAdd(g, new THREE.CylinderGeometry(.75, .6, .3, 12), "gold", 0, H - .6, 0);
[H * .35, H * .62].forEach(function (y) { psAdd(g, new THREE.CylinderGeometry(.6, .6, .1, 12), "gold", 0, y, 0); });
return psMerge(g);
},
function () {
var g = psG();
[0, 2.09, 4.19].forEach(function (a) { psAdd(g, new THREE.CylinderGeometry(.04, .05, 1.5, 6), "iron", Math.cos(a) * .3, .72, Math.sin(a) * .3, Math.sin(a) * .2, 0, -Math.cos(a) * .2); });
psAdd(g, new THREE.CylinderGeometry(.5, .28, .38, 12), "iron", 0, 1.5, 0);
psAdd(g, new THREE.TorusGeometry(.5, .04, 6, 18), "gold", 0, 1.69, 0, Math.PI / 2, 0, 0);
psAdd(g, new THREE.CylinderGeometry(.44, .44, .04, 12), "coal", 0, 1.66, 0);
psFlame(g, 0, 1.62, 0, 1.5);
psFlame(g, .18, 1.62, .1, .9);
psFlame(g, -.16, 1.62, -.08, 1);
return psMerge(g);
},
function () {
var g = psG(), y = Math.max(3, (PS.H || 7) - 1.6);
psAdd(g, new THREE.CylinderGeometry(.03, .03, (PS.H || 7) - y, 5), "iron", 0, y + ((PS.H || 7) - y) / 2, 0);
psAdd(g, new THREE.TorusGeometry(1.1, .06, 6, 24), "iron", 0, y, 0, Math.PI / 2, 0, 0);
psAdd(g, new THREE.TorusGeometry(.6, .05, 6, 18), "gold", 0, y + .3, 0, Math.PI / 2, 0, 0);
for (var i = 0; i < 10; i++) {
var a = i / 10 * 6.283;
psAdd(g, new THREE.CylinderGeometry(.05, .05, .24, 6), "cloth", Math.cos(a) * 1.1, y + .16, Math.sin(a) * 1.1);
psFlame(g, Math.cos(a) * 1.1, y + .28, Math.sin(a) * 1.1, .45);
}
[0, 2.09, 4.19].forEach(function (a) { var c = psAdd(g, new THREE.CylinderGeometry(.02, .02, 1.4, 4), "iron", Math.cos(a) * .55, y + .6, Math.sin(a) * .55); c.rotation.set(Math.sin(a) * .65, 0, -Math.cos(a) * .65); });
return psMerge(g);
},
function () {
var g = psG(), r = psRand(41);
psAdd(g, new THREE.BoxGeometry(6.2, .14, 1.5), "woodD", 0, .86, 0);
[[-2.8, -.6], [2.8, -.6], [-2.8, .6], [2.8, .6], [0, -.6], [0, .6]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.09, .12, .8, 8), "woodD", q[0], .42, q[1]); });
psAdd(g, new THREE.BoxGeometry(6.3, .02, .6), "velvet", 0, .94, 0);
psAdd(g, new THREE.BoxGeometry(6.3, .3, .02), "velvet", 0, .8, .3);
psAdd(g, new THREE.BoxGeometry(6.3, .3, .02), "velvet", 0, .8, -.3);
for (var i = 0; i < 6; i++) {
var x = -2.5 + i;
[-.52, .52].forEach(function (z) {
psAdd(g, new THREE.CylinderGeometry(.17, .14, .02, 14), "gold", x, .945, z);
psAdd(g, new THREE.CylinderGeometry(.025, .04, .14, 8), "gold", x + .24, 1.0, z * .8);
psAdd(g, new THREE.CylinderGeometry(.06, .03, .1, 10), "gold", x + .24, 1.11, z * .8);
var s = z > 0 ? 1 : -1;
psAdd(g, new THREE.BoxGeometry(.5, .08, .5), "velvet", x, .5, z + s * .55);
psAdd(g, new THREE.BoxGeometry(.5, 1.2, .08), "woodD", x, 1.0, z + s * .8);
psAdd(g, new THREE.BoxGeometry(.06, .5, .06), "woodD", x - .2, .25, z + s * .4);
psAdd(g, new THREE.BoxGeometry(.06, .5, .06), "woodD", x + .2, .25, z + s * .4);
psAdd(g, new THREE.ConeGeometry(.05, .16, 5), "gold", x, 1.68, z + s * .8);
});
}
[-1.5, 1.5].forEach(function (x) {
psAdd(g, new THREE.CylinderGeometry(.06, .14, .5, 8), "gold", x, 1.18, 0);
psAdd(g, new THREE.BoxGeometry(.7, .04, .04), "gold", x, 1.42, 0);
[-.35, 0, .35].forEach(function (dx) { psAdd(g, new THREE.CylinderGeometry(.035, .035, .22, 6), "cloth", x + dx, 1.55, 0); psFlame(g, x + dx, 1.66, 0, .3); });
});
[-2.4, 0, 2.4].forEach(function (x, j) {
psAdd(g, new THREE.CylinderGeometry(.34, .3, .04, 16), "gold", x + .6, .96, 0);
if (j === 1) {
var roast = psAdd(g, new THREE.SphereGeometry(.24, 12, 8), "food", x + .6, 1.12, 0);
roast.scale.set(1.4, .8, 1);
}
else {
for (var k = 0; k < 6; k++)
psAdd(g, new THREE.SphereGeometry(.07, 8, 6), k % 2 ? "fruit" : "fruitG", x + .6 + (r() - .5) * .36, 1.03 + r() * .08, (r() - .5) * .3);
}
});
[-.9, .9].forEach(function (x) { var br = psAdd(g, new THREE.SphereGeometry(.14, 10, 8), "bread", x, 1.0, .05); br.scale.set(1.5, .7, 1); psAdd(g, new THREE.CylinderGeometry(.06, .07, .3, 8), "wine", x + .3, 1.1, -.05); });
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(2.2, .5, 2.6), "woodD", 0, .3, 0);
psAdd(g, new THREE.BoxGeometry(2.1, .25, 2.5), "cloth", 0, .66, 0);
psAdd(g, new THREE.BoxGeometry(2.14, .08, 1.7), "velvet", 0, .82, .42);
psAdd(g, new THREE.BoxGeometry(2.14, .1, .2), "gold", 0, .84, -.36);
psAdd(g, new THREE.BoxGeometry(.7, .2, .4), "cloth", -.5, .88, -1.0);
psAdd(g, new THREE.BoxGeometry(.7, .2, .4), "cloth", .5, .88, -1.0);
psAdd(g, new THREE.BoxGeometry(2.2, 1.4, .12), "woodD", 0, 1.2, -1.28);
psAdd(g, new THREE.BoxGeometry(1.6, .8, .04), "velvet", 0, 1.35, -1.21);
[[-1.05, -1.25], [1.05, -1.25], [-1.05, 1.25], [1.05, 1.25]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.07, .08, 2.8, 8), "woodD", q[0], 1.4, q[1]); psAdd(g, new THREE.SphereGeometry(.1, 8, 6), "gold", q[0], 2.85, q[1]); });
psAdd(g, new THREE.BoxGeometry(2.3, .14, 2.7), "velvetD", 0, 2.78, 0);
psAdd(g, new THREE.BoxGeometry(2.32, .05, 2.72), "gold", 0, 2.7, 0);
[[-1.12, 0, Math.PI / 2], [1.12, 0, Math.PI / 2]].forEach(function (q) { psAdd(g, new THREE.PlaneGeometry(2.5, 2.2), new THREE.MeshLambertMaterial({ color: 0x7A1020, side: THREE.DoubleSide, transparent: true, opacity: .85 }), q[0], 1.6, q[1], 0, q[2], 0); });
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(1.2, .6, .6), "woodD", 0, .3, 0);
psAdd(g, new THREE.CylinderGeometry(.3, .3, 1.2, 10, 1, false, 0, Math.PI), "woodD", 0, .6, 0, 0, 0, Math.PI / 2);
[-.45, .45].forEach(function (x) { psAdd(g, new THREE.BoxGeometry(.08, .62, .62), "gold", x, .31, 0); });
psAdd(g, new THREE.BoxGeometry(.14, .16, .04), "gold", 0, .5, .31);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(6, .35, 4.2), "basaltL", 0, .18, 0);
psAdd(g, new THREE.BoxGeometry(4.6, .35, 3.2), "basaltL", 0, .53, -.3);
psAdd(g, new THREE.BoxGeometry(6.04, .06, 4.24), "gold", 0, .36, 0);
psAdd(g, new THREE.BoxGeometry(4.64, .06, 3.24), "gold", 0, .71, -.3);
psAdd(g, new THREE.BoxGeometry(3.4, .04, 2), "velvet", 0, .74, -.2);
psAdd(g, new THREE.BoxGeometry(1.6, .6, 1.2), "gold", 0, 1.05, -.5);
psAdd(g, new THREE.BoxGeometry(1.4, .14, 1.0), "velvet", 0, 1.42, -.45);
psAdd(g, new THREE.BoxGeometry(1.8, 3.6, .3), "gold", 0, 2.5, -1.1);
psAdd(g, new THREE.BoxGeometry(1.3, 2.6, .06), "velvet", 0, 2.35, -.93);
psAdd(g, new THREE.BoxGeometry(.24, .7, 1.1), "gold", -.85, 1.65, -.5);
psAdd(g, new THREE.BoxGeometry(.24, .7, 1.1), "gold", .85, 1.65, -.5);
psAdd(g, new THREE.SphereGeometry(.16, 10, 8), "gold", -.85, 2.05, 0);
psAdd(g, new THREE.SphereGeometry(.16, 10, 8), "gold", .85, 2.05, 0);
[-.7, -.35, 0, .35, .7].forEach(function (x, i) { psAdd(g, new THREE.ConeGeometry(.1, .6 + (i === 2 ? .5 : 0) - Math.abs(x) * .3, 6), "gold", x, 4.55 + (i === 2 ? .25 : 0) - Math.abs(x) * .15, -1.1); });
psAdd(g, new THREE.SphereGeometry(.2, 10, 8), "ruby", 0, 3.95, -.92);
psAdd(g, new THREE.OctahedronGeometry(.12, 0), "sapphire", -.5, 3.6, -.93);
psAdd(g, new THREE.OctahedronGeometry(.12, 0), "emerald", .5, 3.6, -.93);
return psMerge(g);
},
function () {
var g = psG(), H = PS.H || 7;
psAdd(g, new THREE.BoxGeometry(4, 1.1, 2.6), "basaltL", 0, .55, 0);
psAdd(g, new THREE.BoxGeometry(4.1, .12, 2.7), "bronze", 0, 1.12, 0);
psAdd(g, new THREE.BoxGeometry(2.4, .5, .06), "coal", 0, .55, 1.31);
psAdd(g, new THREE.BoxGeometry(2.6, .08, .1), "bronze", 0, .84, 1.32);
var lava = psAdd(g, new THREE.BoxGeometry(3.2, .06, 1.8), "lava", 0, 1.18, 0);
lava.userData.psKeep = 1;
lava.onBeforeRender = psFlow;
psAdd(g, new THREE.CylinderGeometry(.4, 2.0, 1.6, 4), "iron", 0, 2.5, 0, 0, Math.PI / 4, 0);
psAdd(g, new THREE.BoxGeometry(1, Math.max(1, H - 3.3), 1), "iron", 0, 3.3 + (H - 3.3) / 2, 0);
psAdd(g, new THREE.BoxGeometry(.9, .5, .6), "wood", -2.5, .6, .4);
psAdd(g, new THREE.ConeGeometry(.3, .8, 6), "fur", -2.5, .6, -.05, Math.PI / 2, 0, 0);
psAdd(g, new THREE.BoxGeometry(.5, .7, .5), "iron", 0, .35, 2.2);
psAdd(g, new THREE.BoxGeometry(1.1, .32, .45), "steel", 0, .86, 2.2);
psAdd(g, new THREE.ConeGeometry(.16, .5, 6), "steel", .75, .86, 2.2, 0, 0, -Math.PI / 2);
psAdd(g, new THREE.CylinderGeometry(.03, .03, .5, 6), "woodD", .2, 1.1, 2.3, 0, 0, .6);
psAdd(g, new THREE.BoxGeometry(.18, .12, .12), "iron", .36, 1.3, 2.3);
return psMerge(g);
},
function () {
var g = psG();
var p = psAdd(g, new THREE.CylinderGeometry(2, 2, .05, 24), "lava", 0, .06, 0);
p.userData.psKeep = 1;
p.onBeforeRender = psFlow;
for (var i = 0; i < 14; i++) {
var a = i / 14 * 6.283;
var rk = psAdd(g, new THREE.DodecahedronGeometry(.42 + ((i * 7) % 3) * .1, 0), "basalt", Math.cos(a) * 2.2, .22, Math.sin(a) * 2.2);
rk.scale.y = .6;
}
return psMerge(g);
},
function () {
var g = psG(), r = psRand(53);
psAdd(g, new THREE.BoxGeometry(1.2, .7, 1.7), "iron", 0, .65, 0);
psAdd(g, new THREE.BoxGeometry(1.26, .08, 1.76), "bronze", 0, 1.0, 0);
[[-.6, -.55], [.6, -.55], [-.6, .55], [.6, .55]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.22, .22, .1, 12), "iron", q[0], .24, q[1], 0, 0, Math.PI / 2); });
var m = psAdd(g, new THREE.SphereGeometry(.62, 12, 8, 0, 6.283, 0, Math.PI / 2), "coins", 0, .98, 0);
m.scale.set(.95, .55, 1.35);
for (var i = 0; i < 7; i++)
psGem(g, PS_GEMS[i % 5], (r() - .5) * .8, 1.15 + r() * .15, (r() - .5) * 1.2, 1.2);
for (var k = 0; k < 5; k++) {
var o = psAdd(g, new THREE.DodecahedronGeometry(.16, 0), "ore", (r() - .5) * .7, 1.2, (r() - .5) * 1.1);
}
return psMerge(g);
},
function () {
var g = psG(), H = Math.min(4.2, (PS.H || 7) - .5);
psAdd(g, new THREE.BoxGeometry(.3, H, .3), "wood", -1.8, H / 2, 0);
psAdd(g, new THREE.BoxGeometry(.3, H, .3), "wood", 1.8, H / 2, 0);
psAdd(g, new THREE.BoxGeometry(4.2, .34, .36), "wood", 0, H, 0);
psAdd(g, new THREE.BoxGeometry(.5, .3, .3), "wood", -1.55, H - .32, 0, 0, 0, .7);
psAdd(g, new THREE.BoxGeometry(.5, .3, .3), "wood", 1.55, H - .32, 0, 0, 0, -.7);
psAdd(g, new THREE.CylinderGeometry(.03, .03, .5, 5), "iron", 0, H - .4, 0);
psAdd(g, new THREE.BoxGeometry(.26, .34, .26), "iron", 0, H - .8, 0);
psAdd(g, new THREE.BoxGeometry(.18, .24, .18), "fireC", 0, H - .8, 0);
return psMerge(g);
},
function () {
var g = psG(), r = psRand(61);
for (var i = 0; i < 16; i++) {
var a = r() * 6.283, rr = r() * 1.1, s = .25 + r() * .3;
var o = psAdd(g, new THREE.DodecahedronGeometry(s, 0), "ore", Math.cos(a) * rr, s * .7 + (1.1 - rr) * .4, Math.sin(a) * rr);
o.rotation.set(r() * 3, r() * 3, 0);
}
for (var k = 0; k < 10; k++) {
var a2 = r() * 6.283, r2 = r() * 1.0;
psAdd(g, new THREE.DodecahedronGeometry(.1, 0), "gold", Math.cos(a2) * r2, .3 + (1 - r2) * .5, Math.sin(a2) * r2);
}
for (var c = 0; c < 4; c++) {
var cr = psAdd(g, new THREE.OctahedronGeometry(.14, 0), "crystal", (r() - .5) * 1.2, .55 + r() * .3, (r() - .5) * 1.2);
cr.scale.y = 2.6;
cr.rotation.z = (r() - .5) * .8;
}
return psMerge(g);
},
function () {
var g = psG(), r = psRand(71);
psAdd(g, new THREE.DodecahedronGeometry(.7, 0), "rock", 0, .3, 0).scale.y = .5;
for (var i = 0; i < 9; i++) {
var h = .6 + r() * 1.6, c = psAdd(g, new THREE.OctahedronGeometry(.2, 0), "crystal", (r() - .5) * .9, h * .55, (r() - .5) * .9);
c.scale.set(1, h * 2.2, 1);
c.rotation.set((r() - .5) * .7, r() * 3, (r() - .5) * .7);
}
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.CylinderGeometry(1.25, 1.25, 4, 20), "copper", 0, 1.65, 0, 0, 0, Math.PI / 2);
[-1.6, -.5, .5, 1.6].forEach(function (x) { psAdd(g, new THREE.CylinderGeometry(1.3, 1.3, .12, 20), "brass", x, 1.65, 0, 0, 0, Math.PI / 2); });
psAdd(g, new THREE.SphereGeometry(1.25, 16, 10, 0, Math.PI), "copper", 2, 1.65, 0, 0, Math.PI / 2, 0);
psAdd(g, new THREE.SphereGeometry(1.25, 16, 10, 0, Math.PI), "copper", -2, 1.65, 0, 0, -Math.PI / 2, 0);
psAdd(g, new THREE.BoxGeometry(4.4, .4, 2), "iron", 0, .2, 0);
[-1.6, 1.6].forEach(function (x) { psAdd(g, new THREE.BoxGeometry(.3, .9, 1.8), "iron", x, .6, 0); });
psAdd(g, new THREE.BoxGeometry(1, .9, .2), "iron", 2.9, .9, 0, 0, Math.PI / 2, 0);
psAdd(g, new THREE.BoxGeometry(.6, .5, .06), "coal", 3.02, .9, 0, 0, Math.PI / 2, 0);
psAdd(g, new THREE.CylinderGeometry(.3, .3, Math.max(2, (PS.H || 7) - 3), 12), "iron", -1.2, 2.9 + Math.max(2, (PS.H || 7) - 3) / 2, 0);
psAdd(g, new THREE.CylinderGeometry(.22, .22, .06, 16), "gauge", .6, 2.95, 0, 0, 0, 0);
psAdd(g, new THREE.CylinderGeometry(.24, .24, .05, 16), "brass", .6, 2.93, 0);
psAdd(g, new THREE.CylinderGeometry(.12, .12, 1.6, 10), "brass", 1.2, 3.6, 0);
psAdd(g, new THREE.TorusGeometry(.2, .04, 6, 14), "valve", 1.2, 4.1, 0, Math.PI / 2, 0, 0);
var st = psAdd(g, new THREE.SphereGeometry(.4, 10, 8), "steam", 1.2, 4.6, 0);
st.userData.psKeep = 1;
st.onBeforeRender = function () { var t = performance.now() / 1000; st.scale.setScalar(1 + 0.25 * Math.sin(t * 0.8)); st.position.y = 4.6 + 0.2 * Math.sin(t * 0.5); };
return psMerge(g);
},
function () {
var g = psG(), W = psG();
psAdd(W, new THREE.TorusGeometry(1.8, .16, 8, 32), "iron", 0, 0, 0);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI;
psAdd(W, new THREE.BoxGeometry(3.5, .12, .12), "iron", 0, 0, 0, 0, 0, a);
}
psAdd(W, new THREE.CylinderGeometry(.32, .32, .4, 14), "brass", 0, 0, 0, Math.PI / 2, 0, 0);
var wm = psMerge(W);
wm.position.set(0, 2.2, 0);
wm.userData.psKeep = 1;
wm.onBeforeRender = function () { };
wm.children.forEach(function (c) { c.onBeforeRender = function () { wm.rotation.z = -(performance.now() / 1000) * 0.5; }; });
g.add(wm);
psAdd(g, new THREE.BoxGeometry(.4, 2.3, .6), "iron", 0, 1.15, -.45);
psAdd(g, new THREE.BoxGeometry(.4, 2.3, .6), "iron", 0, 1.15, .45);
psAdd(g, new THREE.BoxGeometry(1.2, .3, 1.6), "iron", 0, .15, 0);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.CylinderGeometry(.5, .5, 2, 16), "brass", 0, 1.3, 0);
psAdd(g, new THREE.CylinderGeometry(.56, .56, .14, 16), "copper", 0, 2.3, 0);
psAdd(g, new THREE.CylinderGeometry(.56, .56, .14, 16), "copper", 0, .3, 0);
psAdd(g, new THREE.BoxGeometry(1.4, .3, 1.4), "iron", 0, .15, 0);
var rod = psAdd(g, new THREE.CylinderGeometry(.1, .1, 1.6, 8), "steel", 0, 3.1, 0);
rod.userData.psKeep = 1;
rod.onBeforeRender = function () { rod.position.y = 3.1 + 0.35 * Math.sin(performance.now() / 1000 * 1.1); };
return psMerge(g);
},
function () {
var g = psG(), H = PS.H || 7;
[-.7, 0, .7].forEach(function (x, i) { psAdd(g, new THREE.CylinderGeometry(.13, .13, H - .4, 10), i === 1 ? "brass" : "copper", x, (H - .4) / 2, 0); psAdd(g, new THREE.TorusGeometry(.16, .04, 6, 12), "brass", x, 1.2 + i * .6, 0, Math.PI / 2, 0, 0); });
psAdd(g, new THREE.CylinderGeometry(.13, .13, 1.6, 10), "copper", 0, H - .8, 0, 0, 0, Math.PI / 2);
psAdd(g, new THREE.TorusGeometry(.22, .05, 6, 14), "valve", 0, 1.6, .2);
psAdd(g, new THREE.CylinderGeometry(.18, .18, .05, 14), "gauge", -.7, 1.9, .15, Math.PI / 2, 0, 0);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.CylinderGeometry(.05, .06, 2.2, 6), "iron", 0, 1.1, 0);
psAdd(g, new THREE.BoxGeometry(.4, .06, .06), "iron", .2, 2.2, 0);
psAdd(g, new THREE.BoxGeometry(.24, .32, .24), "iron", .38, 1.95, 0);
psAdd(g, new THREE.BoxGeometry(.18, .24, .18), "fireC", .38, 1.95, 0);
psAdd(g, new THREE.ConeGeometry(.2, .14, 4), "iron", .38, 2.17, 0, 0, Math.PI / 4, 0);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(.7, .1, .7), "velvet", 0, .5, 0);
psAdd(g, new THREE.BoxGeometry(.7, 1.4, .1), "woodD", 0, 1.15, -.32);
[[-.3, -.3], [.3, -.3], [-.3, .3], [.3, .3]].forEach(function (q) { psAdd(g, new THREE.BoxGeometry(.08, .5, .08), "woodD", q[0], .25, q[1]); });
psAdd(g, new THREE.ConeGeometry(.06, .18, 5), "gold", 0, 1.95, -.32);
return psMerge(g);
},
function (W, D, put, spots) {
put("grandthrone", 0, -D / 2 + 3.4, 0);
put("goldstatue", -5.2, -D / 2 + 3.6, 0);
put("goldstatue", 5.2, -D / 2 + 3.6, 0);
put("brazier", -3.6, -D / 2 + 6.2, 0);
put("brazier", 3.6, -D / 2 + 6.2, 0);
psRunner(D, put, -D / 2 + 5.6, D / 2 - 1.2);
var cx = Math.min(W / 2 - 5, Math.max(5, W / 4));
for (var z = -D / 2 + 9; z < D / 2 - 4; z += 7) {
put("goldcolumn", -cx, z, 0);
put("goldcolumn", cx, z, 0);
if (z + 3.5 < D / 2 - 4) {
put("brazier", -cx, z + 3.5, 0);
put("brazier", cx, z + 3.5, 0);
}
}
for (var z2 = -D / 2 + 8; z2 < D / 2 - 3; z2 += 10)
put("ironchandelier", 0, z2, 0);
psEdge(W, D, ["hallbanner", "armourstand", "hallbanner", "weaponrack"], 5, 1.6, put);
psSconces(W, D, put);
if (W > 30)
for (var z3 = -D / 2 + 10; z3 < D / 2 - 6; z3 += 12) {
put("feasttable", -(cx + W / 2) / 2, z3, Math.PI / 2);
put("feasttable", (cx + W / 2) / 2, z3, Math.PI / 2);
}
spots.push({ x: 0, z: -D / 2 + 7, room: "the throne" });
spots.push({ x: 0, z: 0, room: "the great hall" });
},
function (k, W, D, put, spots) {
var x, z, i = 0;
if (k === "treasury") {
put("goldhoard", 0, -D / 2 + 8, 0);
put("vaultround", 0, -D / 2 + .25, 0);
psRunner(D, put, -D / 2 + 12.5, D / 2 - 1.2);
put("goldhoard", -W / 2 + 7, -D / 2 + 7, 1.3);
put("goldhoard", W / 2 - 7, -D / 2 + 7, 2.6);
if (D > 34) {
put("goldhoard", -W / 2 + 7, D / 2 - 9, .6);
put("goldhoard", W / 2 - 7, D / 2 - 9, 2.1);
}
for (z = -D / 2 + 14; z < D / 2 - 6; z += 5) {
put("treasurechest", -3.2, z, Math.PI / 2);
put("treasurechest", 3.2, z, -Math.PI / 2);
put(i % 2 ? "crownstand" : "gemheap", -6, z + 2.4, 0);
put(i % 2 ? "gemheap" : "crownstand", 6, z + 2.4, 0);
i++;
}
put("goldstatue", -4.6, -D / 2 + 12, 0);
put("goldstatue", 4.6, -D / 2 + 12, 0);
for (z = -D / 2 + 16; z < D / 2 - 6; z += 10) {
put("goldcolumn", -W / 2 + 11, z, 0);
put("goldcolumn", W / 2 - 11, z, 0);
}
psEdge(W, D, ["treasurechest", "gemheap", "armourstand", "treasurechest", "crownstand"], 4.4, 1.7, put);
for (z = -D / 2 + 6; z < D / 2 - 3; z += 10)
put("ironchandelier", 0, z, 0);
psSconces(W, D, put);
[[-W / 4, -D / 2 + 16], [W / 4, -D / 2 + 16], [-W / 4, D / 2 - 10], [W / 4, D / 2 - 10]].forEach(function (q) { put("brazier", q[0], q[1], 0); });
}
else if (k === "banquet") {
put("grandthrone", 0, -D / 2 + 2.4, 0);
put("feasttable", 0, -D / 2 + 6.6, 0);
for (x = -W / 2 + 7; x <= W / 2 - 7; x += Math.max(7, (W - 14) / 2))
for (z = -D / 2 + 12; z < D / 2 - 6; z += 7.5)
put("feasttable", x, z, Math.PI / 2);
for (z = -D / 2 + 8; z < D / 2 - 4; z += 9) {
put("ironchandelier", -W / 4, z, 0);
put("ironchandelier", W / 4, z, 0);
}
psEdge(W, D, ["hallbanner", "brazier", "hallbanner", "armourstand"], 5, 1.6, put);
put("fireplace", -W / 2 + .45, 0, Math.PI / 2);
put("fireplace", W / 2 - .45, 0, -Math.PI / 2);
psSconces(W, D, put);
}
else if (k === "forge") {
put("lavaforge", 0, -D / 2 + 2.2, 0);
put("goldstatue", -4.2, -D / 2 + 2.4, 0);
put("goldstatue", 4.2, -D / 2 + 2.4, 0);
put("hephaestus", 0, -D / 2 + 6.4, 0);
for (z = -D / 2 + 9; z < D / 2 - 6; z += 8) {
put("lavaforge", -W / 2 + 3.2, z, Math.PI / 2);
put("lavaforge", W / 2 - 3.2, z, -Math.PI / 2);
put("anvil", -W / 2 + 6.4, z, Math.PI / 2);
put("anvil", W / 2 - 6.4, z, -Math.PI / 2);
}
put("lavapool", 0, -D / 2 + 12, 0);
for (z = -D / 2 + 18; z < D / 2 - 10; z += 7) {
put("armourstand", -2.6, z, Math.PI / 2);
put("weaponrack", 2.6, z, -Math.PI / 2);
put("brazier", 0, z + 3.5, 0);
}
psBack(W, D, ["weaponrack", "crates", "barrel"], 5, .6, put, 7);
for (z = -D / 2 + 8; z < D / 2 - 3; z += 10)
put("ironchandelier", 0, z, 0);
psSconces(W, D, put);
}
else if (k === "mine") {
[-W / 4, W / 4].forEach(function (rx, j) {
PS.runL = D - 6;
put("minerails", rx, 1, 0);
PS.runL = null;
for (z = -D / 2 + 6; z < D / 2 - 4; z += 6)
put("mineprop", rx, z, 0);
put("minecart", rx, -D / 2 + 10 + j * 6, 0);
put("minecart", rx, D / 2 - 12 - j * 4, 0);
});
for (z = -D / 2 + 5; z < D / 2 - 6; z += 6) {
put(i % 2 ? "crystalcluster" : "oreheap", 0, z, i);
i++;
}
psEdge(W, D, ["crystalcluster", "oreheap", "boulder", "lantern", "stalagmite", "crates"], 4, 1.6, put);
psBack(W, D, ["crystalcluster", "oreheap", "lantern"], 5, 1.6, put);
}
else if (k === "engine") {
for (z = -D / 2 + 5; z < D / 2 - 7; z += 7) {
put("boiler", -W / 4, z, 0);
put("boiler", W / 4, z, 0);
}
for (z = -D / 2 + 8.5; z < D / 2 - 7; z += 7) {
put("flywheel", 0, z, Math.PI / 2);
put("piston", -W / 4 + 3.6, z, 0);
put("piston", W / 4 - 3.6, z, 0);
}
psEdge(W, D, ["pipes", "barrel", "pipes", "oreheap"], 4, .6, put);
psBack(W, D, ["pipes"], 3, .4, put);
for (z = -D / 2 + 6; z < D / 2 - 3; z += 9)
put("lantern", -W / 2 + 3, z, 0);
}
else if (k === "bedroom") {
for (z = -D / 2 + 5; z < D / 2 - 6; z += 7) {
put("fourposter", -W / 2 + 3, z, Math.PI / 2);
put("footchest", -W / 2 + 5, z, Math.PI / 2);
put("fourposter", W / 2 - 3, z, -Math.PI / 2);
put("footchest", W / 2 - 5, z, -Math.PI / 2);
}
psRunner(D, put, -D / 2 + 3, D / 2 - 1.5);
for (z = -D / 2 + 6; z < D / 2 - 5; z += 9) {
put("pelt", 0, z, 0);
put("highchair", -1.4, z, Math.PI / 2);
put("highchair", 1.4, z, -Math.PI / 2);
put("ironchandelier", 0, z, 0);
}
put("fireplace", 0, -D / 2 + .45, 0);
psBack(W, D, ["wardrobe", "hallbanner"], 6, .5, put, 4);
psSconces(W, D, put);
}
else if (k === "armoury") {
for (z = -D / 2 + 5; z < D / 2 - 6; z += 4) {
put("armourstand", -4, z, Math.PI / 2);
put("armourstand", 4, z, -Math.PI / 2);
}
psEdge(W, D, ["weaponrack", "weaponrack", "hallbanner"], 3, .6, put);
psSconces(W, D, put);
for (z = -D / 2 + 6; z < D / 2 - 3; z += 10)
put("ironchandelier", 0, z, 0);
}
else
return false;
spots.push({ x: 0, z: 0, room: (typeof ROOMNAME !== "undefined" && ROOMNAME[k]) || k });
return true;
},
function (I, setting) {
var root = I.root, F = I.floor || 7.5, H = I.ceilH || 7, L = I.levels || 1, W = I.W, D = I.D;
var rockT = psRockTex(setting === "stone" ? "stone" : setting === "volcano" ? "volcano" : "rock");
var wallM = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: rockT });
var floorM = new THREE.MeshLambertMaterial({ color: setting === "stone" ? 0xC8C0B4 : 0xE0D8D0, map: rockT });
var ceilM = new THREE.MeshLambertMaterial({ color: setting === "stone" ? 0x9A9288 : 0xA8A098, map: rockT, side: THREE.DoubleSide });
if (setting === "volcano") {
floorM.emissiveMap = psGlowTex();
floorM.emissive = new THREE.Color(0xFFFFFF);
floorM.emissiveIntensity = 0.6;
wallM.emissiveMap = psGlowTex();
wallM.emissive = new THREE.Color(0xFFFFFF);
wallM.emissiveIntensity = 0.4;
}
[wallM, floorM, ceilM].forEach(function (m) { m.map = rockT; m.needsUpdate = true; });
if (rockT.repeat)
rockT.repeat.set(1 / 9, 1 / 9);
if (floorM.emissiveMap)
floorM.emissiveMap.repeat.set(1 / 9, 1 / 9);
var top = null;
root.children.slice().forEach(function (m) {
if (m.isLight)
return;
if (m.userData && m.userData.furn) {
var to = PS_SWAP[m.userData.furn];
if (to && FURN[to]) {
var n = FURN[to]();
n.userData.furn = to;
n.position.copy(m.position);
n.rotation.copy(m.rotation);
root.remove(m);
root.add(n);
}
else if (m.userData.furn === "chandelier" && FURN.ironchandelier) {
var c = FURN.ironchandelier();
c.userData.furn = "ironchandelier";
c.position.copy(m.position);
root.remove(m);
root.add(c);
}
return;
}
if (!m.isMesh || !m.geometry)
return;
var t = m.geometry.type, p = m.geometry.parameters || {};
if (m.userData.liveDone) {
root.remove(m);
return;
}
if (t === "PlaneGeometry") {
root.remove(m);
return;
}
if (t === "SphereGeometry" && Math.abs((p.radius || 0) - 0.14) < 0.001) {
root.remove(m);
return;
}
if (t !== "BoxGeometry")
return;
var w = p.width, h = p.height, d = p.depth;
if (Math.abs(w - 1.7) < 0.01 && Math.abs(h - 2.25) < 0.01) {
m.material = psM("iron");
return;
}
var g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
if (h <= 0.45 && w > 3 && d > 3) {
m.geometry = g;
m.material = [ceilM, ceilM, floorM, ceilM, ceilM, ceilM];
if (!top || m.position.y > top.position.y)
top = m;
return;
}
if (h >= 0.6 && Math.min(w, d) <= 0.3) {
m.geometry = g;
m.material = wallM;
}
});
if (top && top.position.y > 2)
top.material = ceilM;
I.winMats = [];
I.winGlints = [];
var lc = setting === "volcano" ? 0xFF9A5A : setting === "rock" ? 0xFFC890 : 0xFFD6A0;
(I.lightPool || []).forEach(function (l) { l.color.setHex(lc); });
if (I.lightFill)
I.lightFill.color.setHex(setting === "volcano" ? 0xFFB080 : 0xFFE0C0);
root.children.forEach(function (c) { if (c.isHemisphereLight) {
c.color.setHex(setting === "volcano" ? 0xFFB890 : 0xFFE8D0);
c.groundColor.setHex(setting === "volcano" ? 0x3A1408 : 0x2A2018);
} });
var deco = new THREE.Group();
deco.userData.psDeco = 1;
root.add(deco);
for (var lv = 0; lv < L; lv++) {
var y = lv * F, d2 = new THREE.Group();
d2.userData.psLvl = lv;
deco.add(d2);
var r = psRand(101 + lv);
var stM = setting === "stone" ? null : psM("basaltL");
if (stM)
for (var s = 0; s < Math.min(40, Math.floor(W * D / 60)); s++) {
var len = .6 + r() * 1.8, st = new THREE.Mesh(new THREE.ConeGeometry(.25 + r() * .35, len, 6), stM);
st.rotation.x = Math.PI;
st.position.set(-W / 2 + 2 + r() * (W - 4), y + H - len / 2, -D / 2 + 2 + r() * (D - 4));
d2.add(st);
}
if (setting === "volcano") {
[-1, 1].forEach(function (sd) {
var lx = sd * (W / 2 - 0.5);
var ch = new THREE.Mesh(new THREE.BoxGeometry(.7, .05, D - 1.2), psM("lava"));
ch.position.set(lx, y + .04, 0);
ch.onBeforeRender = psFlow;
d2.add(ch);
var curb = new THREE.Mesh(new THREE.BoxGeometry(.22, .3, D - 1.2), psM("basalt"));
curb.position.set(lx - sd * .46, y + .15, 0);
d2.add(curb);
if (lv === 0) {
var fall = new THREE.Mesh(new THREE.BoxGeometry(.8, H, .12), psM("lava"));
fall.position.set(lx, y + H / 2, -D / 2 + .2);
fall.onBeforeRender = psFlow;
d2.add(fall);
var pool = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, .06, 14), psM("lava"));
pool.position.set(lx - sd * .2, y + .05, -D / 2 + 1.1);
d2.add(pool);
}
});
if (lv > 0)
d2.add(new THREE.PointLight(0xFF6A2A, 0.35, Math.max(W, D)));
}
}
},
function (spec) {
var g = new THREE.Group(), r = psRand(hash ? hash(String(spec.id)) : 77);
var gateA = null;
(store.objects || []).forEach(function (o) { if (o.psInside === spec.id) {
try {
var Dg = doorWorld(o);
gateA = Math.atan2(Dg.z - spec.z, Dg.x - spec.x);
}
catch (e) { }
} });
if (gateA !== null)
gateA = gateA + (spec.rot || 0);
var pts = [];
pts.push(new THREE.Vector2(PS_V.R + 2, -0.5));
for (var i = 24; i >= 0; i--) {
var t = i / 24;
pts.push(new THREE.Vector2(psVolRadius(t), psVolProfile(t)));
}
pts.push(new THREE.Vector2(PS_V.rim * 0.9, PS_V.top - 1.5));
pts.push(new THREE.Vector2(PS_V.rim * 0.55, PS_V.crater));
pts.push(new THREE.Vector2(0.01, PS_V.crater - 1));
var geo = new THREE.LatheGeometry(pts, 72);
var pa = geo.attributes.position, col = new Float32Array(pa.count * 3), cA = new THREE.Color(0x4A403A), cB = new THREE.Color(0x6A5A50), cC = new THREE.Color(0x8A4A2E), cD = new THREE.Color(0x7A7470), tmp = new THREE.Color();
for (var v = 0; v < pa.count; v++) {
var x = pa.getX(v), y = pa.getY(v), z = pa.getZ(v), rad = Math.hypot(x, z);
if (rad > PS_V.rim * 0.95 && y > 0.2) {
var a = Math.atan2(z, x), k = 1 + 0.06 * Math.sin(a * 11 + y * 0.07) + 0.035 * Math.sin(a * 27 + y * 0.21) + 0.02 * Math.sin(a * 53);
k += 0.03 * (Math.abs(Math.sin(Math.round(x * 10) * 12.9898 + Math.round(z * 10) * 78.233)) % 1 - 0.5);
pa.setX(v, x * k);
pa.setZ(v, z * k);
}
var h = y / PS_V.top;
if (rad < PS_V.rim * 0.95 && y > PS_V.crater - 2)
tmp.copy(cC).lerp(new THREE.Color(0xC04A18), 0.6);
else if (h > 0.82)
tmp.copy(cC).lerp(cD, (1 - h) * 3);
else
tmp.copy(cA).lerp(cB, 0.5 + 0.5 * Math.sin(y * 0.35 + Math.atan2(z, x) * 5));
col[v * 3] = tmp.r;
col[v * 3 + 1] = tmp.g;
col[v * 3 + 2] = tmp.b;
}
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.computeVertexNormals();
var cm = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, side: THREE.DoubleSide });
cm.fog = false;
var cone = new THREE.Mesh(geo, cm);
cone.receiveShadow = true;
cone.castShadow = true;
g.add(cone);
var lake = new THREE.Mesh(new THREE.CircleGeometry(PS_V.rim * 0.62, 28), new THREE.MeshBasicMaterial({ map: psLavaTex(), fog: false }));
lake.rotation.x = -Math.PI / 2;
lake.position.y = PS_V.crater + 0.3;
lake.onBeforeRender = psFlow;
g.add(lake);
var glow = new THREE.PointLight(0xFF6A20, 1.4, 90, 1.6);
glow.position.set(0, PS_V.top + 6, 0);
g.add(glow);
var lavaM = psM("lava");
for (var n = 0; n < 6; n++) {
var a0 = n / 6 * 6.283 + r() * 0.5;
if (gateA !== null) {
var dA = Math.atan2(Math.sin(a0 - gateA), Math.cos(a0 - gateA));
if (Math.abs(dA) < 0.75)
continue;
}
var len = 0.55 + r() * 0.42, steps = 30, posA = [], idx = [], wob = r() * 6;
for (var s = 0; s <= steps; s++) {
var t = 0.02 + len * s / steps, rr = psVolRadius(t) + 0.4, yy = psVolProfile(t) + 0.35, aa = a0 + 0.05 * Math.sin(t * 14 + wob) + 0.03 * Math.sin(t * 31);
var w = (2.2 + t * 4.2) / rr, kk = 1 + 0.06 * Math.sin(aa * 11 + yy * 0.07) + 0.035 * Math.sin(aa * 27 + yy * 0.21) + 0.02 * Math.sin(aa * 53);
[-1, 1].forEach(function (sd) { var a1 = aa + sd * w * 0.5; posA.push(Math.cos(a1) * rr * kk * 1.01, yy, Math.sin(a1) * rr * kk * 1.01); });
if (s < steps) {
var b = s * 2;
idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
}
}
var rg = new THREE.BufferGeometry();
rg.setAttribute("position", new THREE.Float32BufferAttribute(posA, 3));
var uvs = [];
for (var u = 0; u <= steps; u++) {
uvs.push(0, u / 4, 1, u / 4);
}
rg.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
rg.setIndex(idx);
rg.computeVertexNormals();
var river = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ map: psLavaTex(), side: THREE.DoubleSide, fog: false }));
river.onBeforeRender = psFlow;
g.add(river);
if (len > 0.85) {
var pr = psVolRadius(0.02 + len) + 3, pool = new THREE.Mesh(new THREE.CircleGeometry(3.5 + r() * 2, 16), lavaM);
pool.rotation.x = -Math.PI / 2;
pool.position.set(Math.cos(a0) * pr, psVolProfile(Math.min(1, 0.02 + len)) + 0.15, Math.sin(a0) * pr);
pool.onBeforeRender = psFlow;
g.add(pool);
}
}
for (var b2 = 0; b2 < 26; b2++) {
var ba = r() * 6.283;
if (gateA !== null) {
var dB = Math.atan2(Math.sin(ba - gateA), Math.cos(ba - gateA));
if (Math.abs(dB) < 0.35)
continue;
}
var br = PS_V.R * (0.92 + r() * 0.22), bs = 1.2 + r() * 3.2, bo = new THREE.Mesh(new THREE.DodecahedronGeometry(bs, 0), psM("basalt"));
bo.position.set(Math.cos(ba) * br, bs * 0.35, Math.sin(ba) * br);
bo.rotation.set(r() * 3, r() * 3, 0);
g.add(bo);
}
g.userData.psVolcano = 1;
return g;
},
function () {
var g = new THREE.Group(), r = psRand(5);
var W = 30, H = 26, aw = 9, ah = 13;
[[0, H - 1, -21, 22, 8, 14], [-28, 9, -9, 10, 11, 10], [28, 9, -9, 10, 11, 10], [-34, 4, -3, 7, 5, 7], [34, 4, -3, 7, 5, 7], [-16, H - 2, -18, 14, 8, 12], [16, H - 3, -19, 15, 7, 12], [0, 14, -26, 26, 16, 12], [-22, 8, -24, 14, 10, 12], [22, 8, -24, 14, 10, 12]].forEach(function (q) {
var m = new THREE.Mesh(new THREE.DodecahedronGeometry(1, 0), psM("basalt"));
m.scale.set(q[3], q[4], q[5]);
m.position.set(q[0], q[1], q[2]);
m.rotation.set(r() * 0.4, r() * 3, r() * 0.4);
g.add(m);
});
var sh = new THREE.Shape();
sh.moveTo(-W / 2, 0);
sh.lineTo(W / 2, 0);
sh.lineTo(W / 2, H - 4);
sh.lineTo(W / 2 - 4, H);
sh.lineTo(-W / 2 + 4, H);
sh.lineTo(-W / 2, H - 4);
sh.lineTo(-W / 2, 0);
var hole = new THREE.Path();
hole.moveTo(-aw / 2, 0);
hole.lineTo(-aw / 2, ah - aw / 2);
hole.absarc(0, ah - aw / 2, aw / 2, Math.PI, 0, true);
hole.lineTo(aw / 2, 0);
hole.lineTo(-aw / 2, 0);
sh.holes.push(hole);
var fg = new THREE.ExtrudeGeometry(sh, { depth: 3, bevelEnabled: false });
fg.translate(0, 0, -3);
var fm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: psRockTex("volcano"), flatShading: true });
var fmt = psRockTex("volcano").clone();
fmt.needsUpdate = true;
fmt.repeat.set(0.08, 0.08);
fm.map = fmt;
g.add(new THREE.Mesh(fg, fm));
var trim = new THREE.Mesh(new THREE.TorusGeometry(aw / 2 + 0.5, 0.35, 8, 24, Math.PI), psM("gold"));
trim.position.set(0, ah - aw / 2, 0.15);
g.add(trim);
[-1, 1].forEach(function (sd) { var post = new THREE.Mesh(new THREE.BoxGeometry(0.7, ah - aw / 2, 0.7), psM("gold")); post.position.set(sd * (aw / 2 + 0.5), (ah - aw / 2) / 2, 0.15); g.add(post); });
var em = new THREE.Group();
em.position.set(0, ah + 3.2, 0.4);
g.add(em);
em.add(P(new THREE.CylinderGeometry(2.2, 2.2, 0.3, 24), psM("goldD"), 0, 0, 0, Math.PI / 2, 0, 0));
em.add(P(new THREE.BoxGeometry(2, 0.6, 0.3), psM("gold"), 0, -0.6, 0.2));
em.add(P(new THREE.BoxGeometry(1.1, 0.5, 0.3), psM("gold"), 0, -0.15, 0.2));
em.add(P(new THREE.BoxGeometry(0.25, 1.8, 0.3), psM("gold"), 0.5, 0.6, 0.3, 0, 0, 0.5));
em.add(P(new THREE.BoxGeometry(1, 0.5, 0.35), psM("gold"), 0.95, 1.35, 0.3, 0, 0, 0.5));
[-1, 1].forEach(function (sd) {
var tx = sd * (W / 2 + 1);
var tw = new THREE.Mesh(new THREE.BoxGeometry(6, H + 6, 6), fm);
tw.position.set(tx, (H + 6) / 2, -1.5);
g.add(tw);
for (var c = 0; c < 3; c++) {
var cr = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 6.2), fm);
cr.position.set(tx - 2.2 + c * 2.2, H + 6.7, -1.5);
g.add(cr);
}
for (var w = 0; w < 3; w++) {
var sl = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.4, 0.1), psM("coal"));
sl.position.set(tx, 7 + w * 6, 1.56);
g.add(sl);
}
var bn = new THREE.Mesh(new THREE.BoxGeometry(3, 12, 0.12), psM("velvet"));
bn.position.set(sd * (aw / 2 + 4.2), H - 9, 0.12);
g.add(bn);
var bt = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.4, 0.3), psM("gold"));
bt.position.set(sd * (aw / 2 + 4.2), H - 2.8, 0.2);
g.add(bt);
var bd = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.15, 16), psM("gold"));
bd.rotation.x = Math.PI / 2;
bd.position.set(sd * (aw / 2 + 4.2), H - 7, 0.25);
g.add(bd);
var bz = FURN.brazier();
bz.scale.setScalar(2.2);
bz.position.set(sd * (aw / 2 + 2.2), 0, 4.5);
g.add(bz);
var lv = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 16), psM("lava"));
lv.position.set(sd * (aw / 2 + 6.5), 0.06, 8);
lv.onBeforeRender = psFlow;
g.add(lv);
var lc = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 16), psM("basalt"));
lc.position.set(sd * (aw / 2 + 5.2), 0.25, 8);
g.add(lc);
});
var tm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: fmt, side: THREE.DoubleSide });
[[-aw / 2, ah / 2, -8, 0, Math.PI / 2, 0, 10, ah], [aw / 2, ah / 2, -8, 0, -Math.PI / 2, 0, 10, ah], [0, ah, -8, Math.PI / 2, 0, 0, aw, 10]].forEach(function (q) {
var pl = new THREE.Mesh(new THREE.PlaneGeometry(q[6], q[7]), tm);
pl.position.set(q[0], q[1], q[2]);
pl.rotation.set(q[3], q[4], q[5]);
g.add(pl);
});
var back = new THREE.Mesh(new THREE.PlaneGeometry(aw * 0.98, ah * 0.98), new THREE.MeshBasicMaterial({ map: psFireGlowTex() }));
back.position.set(0, ah * 0.49, -12.9);
g.add(back);
for (var tz = -5; tz > -13; tz -= 3.5)
[-1, 1].forEach(function (sd) { var sc = FURN.wallsconce(); sc.position.set(sd * (aw / 2 - 0.05), 0.6, tz); sc.rotation.y = sd > 0 ? -Math.PI / 2 : Math.PI / 2; g.add(sc); });
var flo = new THREE.Mesh(new THREE.BoxGeometry(aw, 0.1, 10), psM("basaltL"));
flo.position.set(0, 0.05, -8);
g.add(flo);
var inl = new THREE.PointLight(0xFF8A40, 1.2, 30, 1.5);
inl.position.set(0, 5, -4);
g.add(inl);
[-1, 1].forEach(function (sd) {
var dg = new THREE.Group();
dg.position.set(sd * aw / 2, 0, -0.5);
dg.rotation.y = sd * -1.25;
g.add(dg);
var leaf = new THREE.Mesh(new THREE.BoxGeometry(aw / 2, ah - 1.5, 0.4), psM("iron"));
leaf.position.set(-sd * aw / 4, (ah - 1.5) / 2, 0);
dg.add(leaf);
for (var b = 0; b < 4; b++) {
var band = new THREE.Mesh(new THREE.BoxGeometry(aw / 2, 0.3, 0.5), psM("gold"));
band.position.set(-sd * aw / 4, 1.5 + b * 3, 0);
dg.add(band);
}
});
for (var s = 0; s < 3; s++) {
var st = new THREE.Mesh(new THREE.BoxGeometry(aw + 4 - s * 1.2, 0.3, 2.4 - s * 0.6), psM("basaltL"));
st.position.set(0, 0.15 + s * 0.3, 1.2 + (2 - s) * 0.7);
g.add(st);
}
g.traverse(function (m) { if (m.isMesh) {
m.castShadow = true;
m.receiveShadow = true;
} });
g.userData.psGate = 1;
return g;
},
function (spec, g) {
g.children.forEach(function (c) { if (!c.userData.psGate)
c.visible = false; });
if (g.children.some(function (c) { return c.userData.psGate; }))
return;
var D = doorWorld(spec), s = (spec.attrs && spec.attrs.s) || 1, rot = spec.rot || 0;
var wx = D.x - D.out.x * 0.6 - spec.x, wz = D.z - D.out.z * 0.6 - spec.z;
var lx = wx * Math.cos(rot) - wz * Math.sin(rot), lz = wx * Math.sin(rot) + wz * Math.cos(rot);
var gate = psGate();
gate.scale.setScalar(1 / s);
gate.position.set(lx / s, 0, lz / s);
g.add(gate);
},
function (T, L) {
if (!T || !L || T.archetype === "volcano")
return false;
var Ls = (L.attrs && L.attrs.s) || 1, Rb = PS_V.R * Ls;
var C = (typeof dreamCluster === "function") ? dreamCluster() : null, me = (typeof dlMe === "function") ? dlMe() : { x: camera.position.x, z: camera.position.z };
var fx = (C ? C.x : me.x) - L.x, fz = (C ? C.z : me.z) - L.z, fl = Math.hypot(fx, fz);
if (fl < 5) {
fx = me.x - L.x;
fz = me.z - L.z;
fl = Math.hypot(fx, fz);
}
if (fl < 1) {
fx = 0;
fz = 1;
fl = 1;
}
fx /= fl;
fz /= fl;
L.attrs = L.attrs || {};
if (!(L.attrs.s >= 1.7)) {
L.attrs.s = 1.7;
Ls = 1.7;
Rb = PS_V.R * Ls;
}
T.rot = Math.atan2(fx, fz);
T.y = 0;
T.psInside = L.id;
T.attrs = T.attrs || {};
T.attrs.noModel = 1;
T.x = L.x;
T.z = L.z;
var D = doorWorld(T), gx = L.x + fx * (Rb * 1.12 + 14), gz = L.z + fz * (Rb * 1.12 + 14);
T.x += gx - (D.x - D.out.x * 0.6);
T.z += gz - (D.z - D.out.z * 0.6);
T.dlNest = 1;
T.dlAt = { x: T.x, z: T.z, y: 0 };
if (typeof refresh === "function") {
refresh(T);
refresh(L);
}
var side = 0;
store.objects.forEach(function (o) {
if (o.archetype !== "tunnel" || (o.realm || 0) !== (store.here || 0) || o.city)
return;
var sd = (side++ % 2 ? 1 : -1) * (30 + Math.floor(side / 2) * 14), px = -fz, pz = fx;
o.x = gx + px * sd - fx * 2;
o.z = gz + pz * sd - fz * 2;
o.rot = T.rot;
o.y = 0;
o.dlNest = 1;
o.dlAt = { x: o.x, z: o.z, y: 0 };
if (typeof refresh === "function")
refresh(o);
});
var sx = gx + fx * 105, sz = gz + fz * 105;
if (typeof dlStand === "function") {
dlStand(sx, (typeof terrainY === "function") ? terrainY(sx, sz) : 0, sz, gx, gz);
if (DL.stand)
DL.stand.firm = 1;
}
return true;
}
];
});
