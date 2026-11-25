/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PS = { spec: null, setting: null, H: 7, fillN: 0, mats: {}, tex: {} };
function psSetting(spec) { return __ZC(188, 0, this, arguments, new.target); }
function psCanvasTex(N, draw, rep) {
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
}
function psRand(seed) { var s = seed >>> 0 || 7; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
function psCracks(seed, n) {
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
}
function psStroke(x, lines, N, w) {
[-N, 0, N].forEach(function (ox) {
[-N, 0, N].forEach(function (oy) {
lines.forEach(function (pts) {
x.beginPath();
x.moveTo(pts[0][0] * N / 512 + ox, pts[0][1] * N / 512 + oy);
for (var i = 1; i < pts.length; i++)
x.lineTo(pts[i][0] * N / 512 + ox, pts[i][1] * N / 512 + oy);
x.lineWidth = w;
x.stroke();
});
});
});
}
function psRockTex(kind) {
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
}
function psGlowTex() { return __ZC(188, 1, this, arguments, new.target); }
function psLavaTex() {
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
}
function psFireGlowTex() {
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
}
function psCoinTex() { return __ZC(188, 2, this, arguments, new.target); }
function psFlow() { var t = psLavaTex(); t.offset.y = -((performance.now() / 1000) * 0.035) % 1; }
function psM(k) {
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
}
var PS_GEMS = ["ruby", "emerald", "sapphire", "amethyst", "diamond"];
function psMerge(g) {
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
}
function psG() { return new THREE.Group(); }
function psAdd(g, geo, mk, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, typeof mk === "string" ? psM(mk) : mk); m.position.set(x || 0, y || 0, z || 0); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); g.add(m); return m; }
function psFlame(g, x, y, z, s) { s = s || 1; psAdd(g, new THREE.ConeGeometry(.22 * s, .7 * s, 7), "fire", x, y + .35 * s, z); psAdd(g, new THREE.ConeGeometry(.11 * s, .42 * s, 6), "fireC", x, y + .25 * s, z); }
function psCoins(g, n, R, y0, seed) { return __ZC(188, 3, this, arguments, new.target); }
function psGem(g, kind, x, y, z, s) { var m = psAdd(g, new THREE.OctahedronGeometry(.12 * (s || 1), 0), kind, x, y, z); m.scale.y = 1.3; m.rotation.set(0.3, x * 7, 0.2); return m; }
function psMound(R, H, seg) {
var pts = [];
for (var i = 0; i <= 10; i++) {
var t = i / 10;
pts.push(new THREE.Vector2(R * (1 - t * t * 0.15) * Math.cos(t * Math.PI / 2) + 0.001, H * Math.sin(t * Math.PI / 2)));
}
return new THREE.LatheGeometry(pts, seg || 20);
}
function psCrown(g, x, y, z, s) { return __ZC(188, 4, this, arguments, new.target); }
if (typeof FURN !== "undefined") {
FURN.goldhoard = function () { return __ZC(188, 5, this, arguments, new.target); };
FURN.treasurechest = function () { return __ZC(188, 6, this, arguments, new.target); };
FURN.gemheap = function () {
var g = psG(), r = psRand(31);
psAdd(g, new THREE.CylinderGeometry(.8, .9, .12, 16), "gold", 0, .06, 0);
for (var i = 0; i < 46; i++) {
var a = r() * 6.283, rr = r() * .75, h = .12 + (1 - rr / .8) * .55 * r();
psGem(g, PS_GEMS[i % 5], Math.cos(a) * rr, h + .08, Math.sin(a) * rr, 1 + r() * .6);
}
return psMerge(g);
};
FURN.goldstatue = function () { return __ZC(188, 7, this, arguments, new.target); };
FURN.crownstand = function () { return __ZC(188, 8, this, arguments, new.target); };
FURN.armourstand = function () { return __ZC(188, 9, this, arguments, new.target); };
FURN.weaponrack = function () { return __ZC(188, 10, this, arguments, new.target); };
FURN.goldcolumn = function () { return __ZC(188, 11, this, arguments, new.target); };
FURN.brazier = function () {
var g = psG();
[0, 2.09, 4.19].forEach(function (a) { psAdd(g, new THREE.CylinderGeometry(.04, .05, 1.5, 6), "iron", Math.cos(a) * .3, .72, Math.sin(a) * .3, Math.sin(a) * .2, 0, -Math.cos(a) * .2); });
psAdd(g, new THREE.CylinderGeometry(.5, .28, .38, 12), "iron", 0, 1.5, 0);
psAdd(g, new THREE.TorusGeometry(.5, .04, 6, 18), "gold", 0, 1.69, 0, Math.PI / 2, 0, 0);
psAdd(g, new THREE.CylinderGeometry(.44, .44, .04, 12), "coal", 0, 1.66, 0);
psFlame(g, 0, 1.62, 0, 1.5);
psFlame(g, .18, 1.62, .1, .9);
psFlame(g, -.16, 1.62, -.08, 1);
return psMerge(g);
};
FURN.wallsconce = function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(.18, .4, .08), "iron", 0, 2.4, -.04);
psAdd(g, new THREE.BoxGeometry(.06, .06, .35), "iron", 0, 2.45, .15);
psAdd(g, new THREE.CylinderGeometry(.12, .06, .16, 8), "iron", 0, 2.5, .32);
psFlame(g, 0, 2.56, .32, .8);
return psMerge(g);
};
FURN.ironchandelier = function () { return __ZC(188, 12, this, arguments, new.target); };
FURN.feasttable = function () { return __ZC(188, 13, this, arguments, new.target); };
FURN.fourposter = function () { return __ZC(188, 14, this, arguments, new.target); };
FURN.footchest = function () { return __ZC(188, 15, this, arguments, new.target); };
FURN.grandthrone = function () { return __ZC(188, 16, this, arguments, new.target); };
FURN.redrunner = function () {
var g = psG(), L = PS.runL || 20;
psAdd(g, new THREE.BoxGeometry(2.6, .03, L), "velvet", 0, .02, 0);
psAdd(g, new THREE.BoxGeometry(.14, .035, L), "gold", -1.3, .022, 0);
psAdd(g, new THREE.BoxGeometry(.14, .035, L), "gold", 1.3, .022, 0);
return psMerge(g);
};
FURN.lavaforge = function () { return __ZC(188, 17, this, arguments, new.target); };
FURN.lavapool = function () { return __ZC(188, 18, this, arguments, new.target); };
FURN.minerails = function () {
var g = psG(), L = PS.runL || 20;
psAdd(g, new THREE.BoxGeometry(.08, .1, L), "steel", -.55, .08, 0);
psAdd(g, new THREE.BoxGeometry(.08, .1, L), "steel", .55, .08, 0);
for (var z = -L / 2 + .4; z < L / 2; z += .9)
psAdd(g, new THREE.BoxGeometry(1.6, .08, .24), "woodD", 0, .03, z);
return psMerge(g);
};
FURN.minecart = function () { return __ZC(188, 19, this, arguments, new.target); };
FURN.mineprop = function () { return __ZC(188, 20, this, arguments, new.target); };
FURN.oreheap = function () { return __ZC(188, 21, this, arguments, new.target); };
FURN.crystalcluster = function () { return __ZC(188, 22, this, arguments, new.target); };
FURN.boiler = function () { return __ZC(188, 23, this, arguments, new.target); };
FURN.flywheel = function () { return __ZC(188, 24, this, arguments, new.target); };
FURN.piston = function () { return __ZC(188, 25, this, arguments, new.target); };
FURN.pipes = function () { return __ZC(188, 26, this, arguments, new.target); };
FURN.lantern = function () { return __ZC(188, 27, this, arguments, new.target); };
FURN.highchair = function () { return __ZC(188, 28, this, arguments, new.target); };
FURN.pelt = function () { var g = psG(); var m = psAdd(g, new THREE.CircleGeometry(1.4, 10), "fur", 0, .02, 0, -Math.PI / 2, 0, 0); m.scale.set(1.3, 1, 1); return psMerge(g); };
}
if (typeof SOLIDFURN !== "undefined") {
["goldhoard", "treasurechest", "gemheap", "goldstatue", "crownstand", "armourstand", "weaponrack", "goldcolumn", "brazier", "feasttable", "fourposter", "footchest",
"grandthrone", "lavaforge", "lavapool", "minecart", "oreheap", "crystalcluster", "boiler", "flywheel", "piston", "highchair"].forEach(function (k) { SOLIDFURN[k] = 1; });
}
(function () {
if (typeof furnBox !== "function")
return;
var B = { goldhoard: [6.4, 5.6], treasurechest: [1.4, 1.2], gemheap: [1.8, 1.8], goldstatue: [1.8, 1.8], crownstand: [.9, .9], armourstand: [1, .8], weaponrack: [2, .5], goldcolumn: [1.5, 1.5],
brazier: [1, 1], feasttable: [6.4, 3.4], fourposter: [2.4, 2.8], footchest: [1.2, .6], grandthrone: [6, 4.2], lavaforge: [4.2, 3.2], lavapool: [5, 5], minecart: [1.4, 1.8], oreheap: [2.2, 2.2],
crystalcluster: [1.6, 1.6], boiler: [5, 2.6], flywheel: [1.2, 1.6], piston: [1.4, 1.4], highchair: [.7, .7] };
var fb = furnBox;
furnBox = function (k) { return B[k] || fb.apply(this, arguments); };
})();
function psEdge(W, D, list, step, inset, put) {
var n = 0;
for (var z = -D / 2 + 4; z < D / 2 - 5; z += step) {
put(list[n % list.length], -W / 2 + inset, z, Math.PI / 2);
put(list[(n + 1) % list.length], W / 2 - inset, z, -Math.PI / 2);
n++;
}
}
function psBack(W, D, list, step, inset, put, skipMid) {
var n = 0;
for (var x = -W / 2 + 5; x < W / 2 - 4; x += step) {
if (skipMid && Math.abs(x) < skipMid)
continue;
put(list[n++ % list.length], x, -D / 2 + inset, 0);
}
}
function psSconces(W, D, put) { psEdge(W, D, ["wallsconce"], 6, .25, put); }
function psRunner(D, put, z0, z1) { var a = z0 !== undefined ? z0 : -D / 2 + 5, b = z1 !== undefined ? z1 : D / 2 - 1; PS.runL = b - a; put("redrunner", 0, (a + b) / 2, 0); PS.runL = null; }
function psGrandHall(W, D, put, spots) { return __ZC(188, 29, this, arguments, new.target); }
function psRoom(k, W, D, put, spots) { return __ZC(188, 30, this, arguments, new.target); }
(function () {
if (typeof dlFillRoom !== "function")
return;
var df = dlFillRoom;
dlFillRoom = function (k, W, D, put, spots) { if (psRoom(k, W, D, put, spots))
return; return df.apply(this, arguments); };
})();
(function () {
if (typeof fillHall !== "function")
return;
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
if (PS.setting && kind === "castle" && PS.fillN++ === 0) {
if (typeof DL !== "undefined" && DL.fillSeq && DL.fillSeq.i === 0)
DL.fillSeq.i++;
return psGrandHall(W, D, put, spots);
}
return fh.apply(this, arguments);
};
})();
var PS_SWAP = { armchair: "highchair", sofa: "highchair", plant: "brazier", lamp: "brazier", painting: "hallbanner", wallmirror: "hallbanner", wallscreen: "hallbanner", tv: "hallbanner",
monitor: "hallbanner", filecabinet: "crates", desk: "crates", chair: "highchair", fridge: "crates", displaycase: "crownstand", runner: "redrunner", benchin: "highchair" };
function psSkin(I, setting) { return __ZC(188, 31, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var was = { spec: PS.spec, setting: PS.setting, H: PS.H, fillN: PS.fillN };
var set = psSetting(spec);
PS.spec = spec;
PS.setting = set;
PS.fillN = 0;
try {
var pl = (typeof planOf === "function") ? planOf(spec) : null;
PS.H = (pl && pl.h) || (typeof INT_H !== "undefined" ? INT_H : 3.2);
}
catch (e) {
PS.H = 7;
}
var I;
try {
I = mi.apply(this, arguments);
}
finally {
var keepH = PS.H;
PS.spec = was.spec;
PS.setting = was.setting;
PS.fillN = was.fillN;
PS.H = keepH;
}
try {
if (I && set && !I.cave && !I.igloo && !I.temple && !I.cinema && !I.library && !I.academy) {
psSkin(I, set);
I.psSetting = set;
}
}
catch (e) {
if (window.console)
console.warn("[volcano] inside", e);
}
PS.H = was.H;
return I;
};
})();
(function () {
if (typeof planOf !== "function")
return;
var po = planOf;
planOf = function (spec) {
var p = po.apply(this, arguments);
if (!p || !spec || p.mode !== "hall")
return p;
if (spec.psInside || (spec.dlRooms && spec.dlRooms.length && psSetting(spec)))
return Object.assign({}, p, { w: Math.max(p.w || 0, 40), d: Math.max(p.d || 0, 46), lift: true, liftLeft: true });
return p;
};
})();
setInterval(function () {
try {
if (typeof INT === "undefined" || !INT || !INT.psSetting || !INT.root)
return;
var L = INT.level || 0, F = INT.floor || 7.5;
INT.root.children.forEach(function (c) {
if (c.userData && c.userData.psDeco) {
c.children.forEach(function (d) { d.visible = Math.abs(d.userData.psLvl - L) <= 1; });
return;
}
if (!c.userData || !c.userData.furn || c.userData.furn === "stairs")
return;
var lv = Math.round(c.position.y / F);
c.visible = Math.abs(lv - L) <= 1;
});
}
catch (e) { }
}, 300);
var PS_V = { R: 60, top: 57, rim: 11, crater: 50 };
function psVolProfile(t) { return PS_V.top * Math.pow(1 - t, 1.55); }
function psVolRadius(t) { return PS_V.rim + (PS_V.R - PS_V.rim) * t; }
function psVolcano(spec) {
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
}
function psGate() {
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
}
(function () {
if (typeof build !== "function")
return;
var b = build;
build = function (spec) {
var g = b.apply(this, arguments);
try {
if (spec && spec.archetype === "volcano" && g && g.isGroup && !g.userData.psDone) {
g.children.forEach(function (c) { if (c.isMesh)
c.visible = false; });
g.add(psVolcano(spec));
g.userData.psDone = 1;
}
if (spec && spec.psInside && g && g.isGroup)
psDressGate(spec, g);
}
catch (e) {
if (window.console)
console.warn("[volcano] build", e);
}
return g;
};
})();
function psDressGate(spec, g) {
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
}
(function () {
if (typeof liveOwnDoor !== "function")
return;
var lo = liveOwnDoor;
liveOwnDoor = function (s) { if (s && s.psInside)
return true; return lo.apply(this, arguments); };
})();
setInterval(function () {
try {
(store.objects || []).forEach(function (o) {
if (!o.psInside || (o.realm || 0) !== (store.here || 0))
return;
var g = meshes[o.id];
if (!g)
return;
var has = false;
g.children.forEach(function (c) { if (c.userData.psGate)
has = true;
else if (c.visible)
c.visible = false; });
if (!has)
psDressGate(o, g);
});
}
catch (e) { }
}, 1200);
var PS_IN_RE = /\b(?:in|inside|into|within|under|beneath|below|underneath|deep in|deep inside|in the heart of|in the depths of|carved into|hollowed out of|in tunnels under(?: the ground)?(?: in)?)\s+(?:the|a|an)?\s*(?:[a-z'-]+\s+){0,2}?volcano\b/;
function psIntoVolcano(T, L) { return __ZC(188, 32, this, arguments, new.target); }
(function () {
if (typeof dlNestle !== "function")
return;
var dn = dlNestle;
dlNestle = function (sent) {
var done = dn.apply(this, arguments);
try {
if (PS_IN_RE.test(sent) && !/\b(?:at the foot of|at the base of|on the side of|on the slope of|beside|next to|near)\s+(?:the|a|an)?\s*(?:[a-z'-]+\s+){0,2}?volcano\b/.test(sent)) {
var m = DL_NEST_RE.exec(sent), T = m ? dlSubjectFor(m[1]) : null;
if (T && !T.psInside && KIT[T.archetype] && KIT[T.archetype].cat === "structure") {
var L = dlFind(["volcano"]);
if (!L && dlKit("volcano")) {
var me = dlMe();
L = dlNew("volcano", me.x, me.z - 90, { s: 1.3 }, { label: "volcano" });
}
if (L && psIntoVolcano(T, L))
return true;
}
}
}
catch (e) {
if (window.console)
console.warn("[volcano] nestle", e);
}
return done;
};
})();
var PS_CITY_ROOMS = ["throneroom", "banquet", "treasury", "forge", "mine", "engine", "bedroom"];
(function () {
if (typeof atlHarvest !== "function")
return;
var ah = atlHarvest;
atlHarvest = function (C) {
var r = ah.apply(this, arguments);
try {
var G = atlGaps(1920, 60, 8), gp = G[1];
if (!gp)
return r;
var a = gp.mid + 170 / 2000, rad = 1990;
var V = C.at("volcano", rad, a, 0, "The Volcano", { s: 1.7 }, { psCity: 1 });
if (!V)
return r;
var castle = C.at("castle", rad, a, 0, "The Volcano Castle", { s: 1.6, noModel: 1 }, { psInside: V.id, dlRooms: PS_CITY_ROOMS.slice(), sign: "The Volcano Castle",
note: "A castle inside a living volcano: its great hall and throne, the banquet hall, the treasure vault, Hephaestus's forge and mine, the steam engine works and the quarters." });
if (castle) {
var fx = -Math.cos(a), fz = -Math.sin(a), Rb = PS_V.R * 1.7;
castle.rot = Math.atan2(fx, fz);
castle.x = V.x;
castle.z = V.z;
var D = doorWorld(castle), gx = V.x + fx * (Rb * 1.12 + 14), gz = V.z + fz * (Rb * 1.12 + 14);
castle.x += gx - (D.x - D.out.x * 0.6);
castle.z += gz - (D.z - D.out.z * 0.6);
castle.solid = false;
var kb = C.kerb(1790, 1);
C.sign(kb, a + 18 / kb, rotIn(a), "The Volcano Castle", "A castle inside a living volcano. Its gate is cut into the volcano's foot.");
}
}
catch (e) {
if (window.console)
console.warn("[volcano] city", e);
}
return r;
};
})();
