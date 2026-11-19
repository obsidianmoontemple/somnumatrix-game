/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SHW = { v: {}, b: null, at: 0, busy: false, open: false, tab: "on", say: "", form: null, dance: false, danceSent: 0, live: null, lis: {}, near: null, promptKey: null,
muted: false, mg: null, mStep: -1, mVen: null, warned: 0, pads: [], solids: [], placeAt: 0 };
var SHW_VEN = {
garden: { k: "garden", name: "The Lantern Garden", icon: "🏮", where: "on the Tower Plaza", ring: "plaza", r0: 72, r1: 124, salt: 7, bpm: 96, band: true,
pal: [[0.98, 0.66, 0.32], [0.96, 0.46, 0.44], [0.66, 0.48, 0.94], [0.34, 0.66, 0.96], [0.40, 0.86, 0.62]], sign: "#F6D58A", trim: 0xC9A85A, wood: 0x5A3A26 },
moth: { k: "moth", name: "The Velvet Moth", icon: "🦋", where: "on the Market Ring", ring: "markets", r0: 1004, r1: 1160, salt: 3, bpm: 118, band: false,
pal: [[0.66, 0.34, 0.94], [0.94, 0.36, 0.72], [0.30, 0.56, 0.96], [0.32, 0.88, 0.82], [0.96, 0.62, 0.36]], sign: "#E6A6FF", trim: 0x8A5AC8, wood: 0x2A2032 }
};
var SHW_KEYS = ["garden", "moth"];
var SHW_STAGE = { x0: -6, x1: 6, z0: -12, z1: -6, h: 1.0 }, SHW_FLOOR = { c: 1.0, n: 7, s: 1.6 };
function shwHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function shwPhone() { return typeof LITE !== "undefined" && !!LITE; }
function shwInCity() { return typeof inCityNow === "function" && inCityNow() && !(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on); }
function shwW(V, lx, lz) { var c = Math.cos(V.th), s = Math.sin(V.th); return { x: V.x + lx * c + lz * s, z: V.z - lx * s + lz * c }; }
function shwL(V, x, z) { var dx = x - V.x, dz = z - V.z, c = Math.cos(V.th), s = Math.sin(V.th); return { x: dx * c - dz * s, z: dx * s + dz * c }; }
function shwClear(x, z, th, cityId) {
var V = { x: x, z: z, th: th }, y0 = terrainY(x, z);
if (typeof ATLC !== "undefined" && ATLC && typeof atlNearStair === "function") {
for (var i = -1; i <= 1; i++)
for (var j = -1; j <= 1; j++) {
var p = shwW(V, i * 9, -3 + j * 10), dx = p.x - ATLC.x, dz = p.z - ATLC.z;
if (atlNearStair(Math.hypot(dx, dz), Math.atan2(dz, dx)))
return false;
}
}
try {
var hp = (typeof rmapPad === "function") ? rmapPad() : null;
if (hp && Math.hypot(hp.x - x, hp.z - z) < (typeof HP_PAD_R !== "undefined" ? HP_PAD_R : 12) + 22)
return false;
}
catch (e) { }
var far = [];
if (typeof DK !== "undefined" && DK.gate)
far.push(DK.gate);
if (typeof TN !== "undefined" && TN.board)
far.push(TN.board);
SHW_KEYS.forEach(function (k) { if (SHW.v[k])
far.push(SHW.v[k]); });
if (typeof FEST !== "undefined" && FEST.solids)
FEST.solids.forEach(function (s) { far.push({ x: s.x, z: s.z, r: s.r + 14 }); });
for (var f = 0; f < far.length; f++) {
if (Math.hypot(far[f].x - x, far[f].z - z) < (far[f].r || 30))
return false;
}
var O = store.objects;
for (var lx = -8; lx <= 8; lx += 2)
for (var lz = -13; lz <= 9; lz += 2) {
var q = shwW(V, lx, lz), y = terrainY(q.x, q.z);
if (Math.abs(y - y0) > 0.35)
return false;
try {
if (typeof blockedAt === "function" && blockedAt(q.x, q.z, y + 0.2))
return false;
}
catch (e) { }
if (typeof atlIsWater === "function") {
try {
if (atlIsWater(q.x, q.z))
return false;
}
catch (e) { }
}
}
for (var o = 0; o < O.length; o++) {
var ob = O[o];
if ((ob.realm || 0) !== cityId)
continue;
if (Math.abs(ob.x - x) > 24 || Math.abs(ob.z - z) > 24)
continue;
var l = shwL(V, ob.x, ob.z);
if (l.x > -10 && l.x < 10 && l.z > -15 && l.z < 11)
return false;
}
return true;
}
function shwPlaceTick() {
if (typeof ATLC === "undefined" || !ATLC || typeof RMAP === "undefined" || !RMAP.list || !RMAP.list.length)
return;
var cr = somnucorRealm();
if (!cr || (store.here || 0) !== cr.id)
return;
for (var n = 0; n < SHW_KEYS.length; n++) {
var k = SHW_KEYS[n], C = SHW_VEN[k];
if (SHW.v[k])
continue;
if (C.giveUp)
continue;
var tries = 0;
C.q = C.q || 0;
while (tries < (shwPhone() ? 3 : 6)) {
var nA = 36, ri = Math.floor(C.q / nA), qa = C.q % nA, rad = C.r0 + ri * 8;
if (rad > C.r1) {
C.giveUp = true;
break;
}
var a = C.salt * 0.37 + (qa % 2 ? 1 : -1) * Math.ceil(qa / 2) * Math.PI * 2 / nA, x = ATLC.x + Math.cos(a) * rad, z = ATLC.z + Math.sin(a) * rad;
var th = Math.atan2(-Math.cos(a), -Math.sin(a));
C.q++;
tries++;
if (shwClear(x, z, th, cr.id)) {
shwBuild(k, x, z, th);
break;
}
}
return;
}
}
function shwM(c, o) { return new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); }
function shwSignTex(C) {
var c = document.createElement("canvas");
c.width = 1024;
c.height = 256;
var x = c.getContext("2d");
x.fillStyle = "#120E1C";
x.fillRect(0, 0, 1024, 256);
x.strokeStyle = C.sign;
x.lineWidth = 10;
x.strokeRect(12, 12, 1000, 232);
x.fillStyle = C.sign;
x.textAlign = "center";
x.font = "700 92px Georgia,serif";
x.fillText(C.icon + " " + C.name, 512, 128);
x.font = "34px sans-serif";
x.fillStyle = "#E8E0F0";
x.fillText(C.band ? "Live music · the house band plays all day" : "Dancing all day · the DJ never sleeps", 512, 196);
return new THREE.CanvasTexture(c);
}
function shwBeam() {
var m = new THREE.Mesh(new THREE.ConeGeometry(1.5, 7, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.09, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
m.geometry.translate(0, -3.5, 0);
m.raycast = function () { };
return m;
}
function shwBuild(k, x, z, th) {
var C = SHW_VEN[k], y0 = terrainY(x, z), g = new THREE.Group();
g.name = "venue-" + k;
g.position.set(x, y0, z);
g.rotation.y = th;
g.userData.noCull = 1;
var V = SHW.v[k] = { k: k, C: C, x: x, z: z, y: y0, th: th, g: g, figs: null, beams: [] };
var S = SHW_STAGE, wood = shwM(C.wood), trim = shwM(C.trim), dark = shwM(0x1A1620);
var F = SHW_FLOOR, n = F.n, half = n * F.s / 2;
var tiles = new THREE.InstancedMesh(new THREE.BoxGeometry(F.s - 0.06, 0.08, F.s - 0.06), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), n * n);
var mt = new THREE.Matrix4(), col = new THREE.Color(0.5, 0.5, 0.5);
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++) {
var id = i * n + j;
mt.makeTranslation(-half + F.s * (i + 0.5), 0.05, F.c - half + F.s * (j + 0.5));
tiles.setMatrixAt(id, mt);
tiles.setColorAt(id, col);
}
tiles.instanceMatrix.needsUpdate = true;
g.add(tiles);
V.tiles = tiles;
[[0, F.c - half - 0.1, half * 2 + 0.4, 0.2], [0, F.c + half + 0.1, half * 2 + 0.4, 0.2], [-half - 0.1, F.c, 0.2, half * 2], [half + 0.1, F.c, 0.2, half * 2]].forEach(function (b) { g.add(P(new THREE.BoxGeometry(b[2], 0.1, b[3]), trim, b[0], 0.05, b[1])); });
g.add(P(new THREE.BoxGeometry(S.x1 - S.x0, S.h, S.z1 - S.z0), wood, 0, S.h / 2, (S.z0 + S.z1) / 2));
g.add(P(new THREE.BoxGeometry(S.x1 - S.x0 + 0.1, 0.12, 0.14), trim, 0, S.h - 0.04, S.z1));
g.add(P(new THREE.BoxGeometry(3, S.h * 2 / 3, 0.6), wood, 0, S.h / 3, S.z1 + 0.3));
g.add(P(new THREE.BoxGeometry(3, S.h / 3, 0.6), wood, 0, S.h / 6, S.z1 + 0.9));
[-1, 1].forEach(function (sd) {
var sp = new THREE.Group();
sp.add(P(new THREE.BoxGeometry(1.1, 2.4, 1), dark, 0, 1.2, 0));
[0.6, 1.6].forEach(function (h) { var cone = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20), shwM(0x3A3448)); cone.position.set(0, h, 0.51); sp.add(cone); });
sp.position.set(sd * 6.9, 0, S.z1 + 0.8);
g.add(sp);
});
V.solids = [{ lx: -6.9, lz: S.z1 + 0.8, hw: 0.6, hd: 0.55 }, { lx: 6.9, lz: S.z1 + 0.8, hw: 0.6, hd: 0.55 }];
if (C.band) {
var shell = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 5.4, 6.4, 28, 1, true, Math.PI / 2, Math.PI), new THREE.MeshLambertMaterial({ color: 0xEDE4D0, side: THREE.DoubleSide }));
shell.position.set(0, S.h + 3.2, -7.4);
g.add(shell);
for (var r = 0; r < 5; r++) {
var rib = new THREE.Mesh(new THREE.TorusGeometry(5.3, 0.06, 6, 28, Math.PI), trim);
rib.rotation.x = -Math.PI / 2;
rib.position.set(0, S.h + 0.4 + r * 1.45, -7.4);
g.add(rib);
}
var roof = new THREE.Mesh(new THREE.SphereGeometry(5.5, 24, 10, Math.PI, Math.PI, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xE6DCC6, side: THREE.DoubleSide }));
roof.scale.y = 0.45;
roof.position.set(0, S.h + 6.4, -7.4);
g.add(roof);
V.shell = { lz: -7.4, r: 5.4 };
var posts = [], warm = [0xFFC870, 0xFF9A6A, 0xFFE09A, 0xF6B0D0, 0xB8D8FF];
for (var p = 0; p < 10; p++) {
var side = p < 5 ? -1 : 1, q = p % 5, lz = F.c - half - 0.6 + q * (half * 2 + 1.2) / 4, lx = side * (half + 1.0);
posts.push([lx, lz]);
g.add(P(new THREE.CylinderGeometry(0.07, 0.09, 3.6, 8), dark, lx, 1.8, lz));
V.solids.push({ lx: lx, lz: lz, r: 0.2 });
}
for (var s2 = 0; s2 < posts.length; s2++) {
if (s2 === 4 || s2 === 9)
continue;
var a0 = posts[s2], a1 = posts[s2 + 1];
for (var t = 1; t < 8; t++) {
var f = t / 8, ly = 3.5 - Math.sin(f * Math.PI) * 0.6, lm = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), new THREE.MeshBasicMaterial({ color: warm[(s2 + t) % 5] }));
lm.position.set(a0[0] + (a1[0] - a0[0]) * f, ly, a0[1] + (a1[1] - a0[1]) * f);
g.add(lm);
}
}
[[-half - 1, F.c + half + 0.6], [half + 1, F.c + half + 0.6]].forEach(function (a) { for (var t = 1; t < 8; t++) {
var f = t / 8, lm = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), new THREE.MeshBasicMaterial({ color: warm[t % 5] }));
lm.position.set(a[0] + (0 - a[0]) * f * 0.38, 3.5 - Math.sin(f * Math.PI) * 0.4, a[1]);
g.add(lm);
} });
}
else {
var wallTex = (function () {
var c = document.createElement("canvas");
c.width = 512;
c.height = 256;
var x = c.getContext("2d");
var gr = x.createLinearGradient(0, 0, 0, 256);
gr.addColorStop(0, "#2A1240");
gr.addColorStop(1, "#120818");
x.fillStyle = gr;
x.fillRect(0, 0, 512, 256);
x.strokeStyle = "#E6A6FF";
x.lineWidth = 5;
x.fillStyle = "rgba(200,140,255,.18)";
[-1, 1].forEach(function (sd) {
x.beginPath();
x.moveTo(256, 120);
x.bezierCurveTo(256 + sd * 60, 30, 256 + sd * 200, 40, 256 + sd * 170, 120);
x.bezierCurveTo(256 + sd * 150, 150, 256 + sd * 80, 140, 256, 128);
x.fill();
x.stroke();
x.beginPath();
x.moveTo(256, 132);
x.bezierCurveTo(256 + sd * 80, 150, 256 + sd * 140, 220, 256 + sd * 70, 220);
x.bezierCurveTo(256 + sd * 30, 210, 256 + sd * 14, 170, 256, 140);
x.fill();
x.stroke();
});
x.beginPath();
x.ellipse(256, 140, 10, 46, 0, 0, Math.PI * 2);
x.fillStyle = "#E6A6FF";
x.fill();
x.beginPath();
x.moveTo(250, 98);
x.quadraticCurveTo(230, 60, 214, 58);
x.moveTo(262, 98);
x.quadraticCurveTo(282, 60, 298, 58);
x.stroke();
return new THREE.CanvasTexture(c);
})();
var wall = new THREE.Mesh(new THREE.BoxGeometry(12.4, 6, 0.4), [dark, dark, dark, dark, new THREE.MeshBasicMaterial({ map: wallTex }), dark]);
wall.position.set(0, S.h + 3, S.z0 - 0.2);
g.add(wall);
V.solids.push({ lx: 0, lz: S.z0 - 0.2, hw: 6.2, hd: 0.3 });
var velvet = new THREE.MeshLambertMaterial({ color: 0x3A1450, side: THREE.DoubleSide, transparent: true, opacity: 0.92 });
var can = new THREE.Mesh(new THREE.PlaneGeometry(half * 2 + 2.4, half * 2 + 2.4), velvet);
can.rotation.x = -Math.PI / 2;
can.position.set(0, 5.2, F.c);
g.add(can);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { var lx = c[0] * (half + 1.1), lz = F.c + c[1] * (half + 1.1); g.add(P(new THREE.CylinderGeometry(0.12, 0.12, 5.2, 10), trim, lx, 2.6, lz)); V.solids.push({ lx: lx, lz: lz, r: 0.25 }); });
var desk = new THREE.Group();
desk.add(P(new THREE.BoxGeometry(2.6, 1.0, 0.9), dark, 0, 0.5, 0));
desk.add(P(new THREE.BoxGeometry(2.6, 0.08, 0.95), trim, 0, 1.02, 0));
[-0.7, 0.7].forEach(function (lx) { var tt = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 24), shwM(0x101014)); tt.position.set(lx, 1.08, 0); desk.add(tt); });
desk.position.set(0, S.h, -9.6);
g.add(desk);
for (var e = 0; e < 28; e++) {
var ea = e / 28, side4 = Math.floor(ea * 4), u = (ea * 4) % 1, L = half + 1.1, ex = [-L + u * 2 * L, L, L - u * 2 * L, -L][side4], ez = [-L, -L + u * 2 * L, L, L - u * 2 * L][side4];
var b2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshBasicMaterial({ color: e % 2 ? 0xE6A6FF : 0x9AD8FF }));
b2.position.set(ex, 5.1, F.c + ez);
g.add(b2);
}
}
var sg = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 1.6), new THREE.MeshBasicMaterial({ map: shwSignTex(C), side: THREE.DoubleSide }));
sg.position.set(0, 4.2, F.c + half + 1.6);
g.add(sg);
[-1, 1].forEach(function (sd) { g.add(P(new THREE.CylinderGeometry(0.12, 0.14, 5, 10), trim, sd * 3.3, 2.5, F.c + half + 1.6)); V.solids.push({ lx: sd * 3.3, lz: F.c + half + 1.6, r: 0.25 }); });
var scr = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 3.6), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
scr.position.set(0, S.h + (C.band ? 3.2 : 3.0), C.band ? -11.0 : S.z0 + 0.02);
scr.visible = false;
g.add(scr);
V.screen = scr;
for (var bm = 0; bm < 4; bm++) {
var be = shwBeam();
be.position.set(-4.5 + bm * 3, 7.2, S.z1 + 0.4);
g.add(be);
V.beams.push(be);
}
g.traverse(function (m) { if (m.isMesh && m !== tiles)
m.raycast = function () { }; });
scene.add(g);
SHW.pads = SHW.pads.filter(function (p) { return p.k !== k; });
SHW.pads.push({ k: k, V: V, x0: S.x0, x1: S.x1, z0: S.z0, z1: S.z1, h: S.h }, { k: k, V: V, x0: -1.5, x1: 1.5, z0: S.z1, z1: S.z1 + 0.6, h: S.h * 2 / 3 }, { k: k, V: V, x0: -1.5, x1: 1.5, z0: S.z1 + 0.6, z1: S.z1 + 1.2, h: S.h / 3 });
return V;
}
function shwFigures(V) {
if (V.figs || typeof bacFigure !== "function")
return;
var C = V.C, S = SHW_STAGE, F = SHW_FLOOR, n = shwPhone() ? 4 : 9, figs = { band: [], crowd: [] };
if (C.band) {
var parts = ["guitar", "drums", "keys", "voice"];
parts.forEach(function (pt, i) {
var fg = bacFigure("__shw_band" + i, i, "band");
var lx = [-3.2, -1.1, 1.2, 3.2][i], lz = i === 1 ? -10.2 : -8.6;
fg.position.set(lx, S.h, lz);
V.g.add(fg);
if (pt === "guitar") {
var gt = new THREE.Group();
gt.add(P(new THREE.BoxGeometry(0.34, 0.42, 0.08), shwM(0xB0602A), 0, 0, 0));
gt.add(P(new THREE.BoxGeometry(0.06, 0.6, 0.05), shwM(0x3A2414), 0, 0.48, 0));
gt.position.set(0.05, 1.0, 0.22);
gt.rotation.z = -0.9;
fg.add(gt);
}
if (pt === "drums") {
var dk = new THREE.Group();
[[-0.45, 0.5, 0.32], [0.45, 0.5, 0.32], [0, 0.35, 0.45]].forEach(function (d) { dk.add(P(new THREE.CylinderGeometry(d[2], d[2], 0.3, 16), shwM(0xC8283A), d[0], d[1], 0.5)); });
dk.add(P(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 16), shwM(0xE0C060), 0.6, 1.05, 0.6));
V.g.add(dk);
dk.position.set(lx, S.h, lz);
}
if (pt === "keys") {
var kb = new THREE.Group();
kb.add(P(new THREE.BoxGeometry(1.1, 0.08, 0.34), shwM(0x141414), 0, 0.95, 0.42));
kb.add(P(new THREE.BoxGeometry(1.0, 0.02, 0.18), shwM(0xF4F0E8), 0, 1.0, 0.46));
kb.add(P(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), shwM(0x222222), 0, 0.45, 0.42));
fg.add(kb);
}
if (pt === "voice") {
var ms = new THREE.Group();
ms.add(P(new THREE.CylinderGeometry(0.015, 0.015, 1.45, 6), shwM(0x222222), 0, 0.72, 0));
ms.add(P(new THREE.SphereGeometry(0.05, 8, 6), shwM(0x555555), 0, 1.48, 0));
ms.position.set(0, 0, 0.38);
fg.add(ms);
}
figs.band.push({ g: fg, ph: i * 0.7, part: pt });
});
}
else {
var dj = bacFigure("__shw_dj", 5, "band");
dj.position.set(0, S.h, -10.4);
V.g.add(dj);
figs.band.push({ g: dj, ph: 0, part: "dj" });
}
var half = F.n * F.s / 2;
for (var i = 0; i < n; i++) {
var fg = bacFigure("__shw_" + V.k + "_d" + i, i + 3, "dance"), h = shwHash(V.k + i);
var lx = -half + 1.2 + ((h % 1000) / 1000) * (half * 2 - 2.4), lz = F.c - half + 1.2 + (((h >>> 10) % 1000) / 1000) * (half * 2 - 2.4);
fg.position.set(lx, 0.09, lz);
fg.rotation.y = Math.PI + ((h >>> 20) % 100) / 100 - 0.5;
V.g.add(fg);
figs.crowd.push({ g: fg, ph: ((h >>> 4) % 100) / 100, lx: lx, lz: lz, face: fg.rotation.y });
}
V.figs = figs;
}
(function () {
if (typeof terrainY !== "function")
return;
var ty = terrainY;
terrainY = function (x, z) {
var y = ty.apply(this, arguments);
var Ps = SHW.pads;
if (!Ps.length)
return y;
for (var i = 0; i < Ps.length; i++) {
var p = Ps[i], V = p.V;
if (Math.abs(x - V.x) > 16 || Math.abs(z - V.z) > 16)
continue;
var l = shwL(V, x, z);
if (l.x >= p.x0 && l.x <= p.x1 && l.z >= p.z0 && l.z <= p.z1)
y = Math.max(y, V.y + p.h);
}
return y;
};
})();
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (SHW_KEYS.length && !(typeof store !== "undefined" && store.inside)) {
for (var n = 0; n < SHW_KEYS.length; n++) {
var V = SHW.v[SHW_KEYS[n]];
if (!V || Math.abs(x - V.x) > 20 || Math.abs(z - V.z) > 20)
continue;
if (feet > V.y + 7)
continue;
var l = shwL(V, x, z);
for (var i = 0; i < V.solids.length; i++) {
var s = V.solids[i];
if (s.r) {
if (Math.hypot(l.x - s.lx, l.z - s.lz) < s.r + 0.3)
return true;
}
else if (Math.abs(l.x - s.lx) < s.hw + 0.3 && Math.abs(l.z - s.lz) < s.hd + 0.3)
return true;
}
if (V.shell) {
var dz = l.z - V.shell.lz, rr = Math.hypot(l.x, dz);
if (dz < 0 && Math.abs(rr - V.shell.r) < 0.45)
return true;
}
}
}
return ba.apply(this, arguments);
};
})();
function shwBeat(V) { var t = Date.now() / 1000, bl = 60 / V.C.bpm; return { t: t, bl: bl, b: t / bl, ph: (t / bl) % 1 }; }
function shwMix(a, b, f) { return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]; }
function shwTick(dt) {
var inCity = shwInCity(), P = camera.position, near = null, nd = 1e9;
SHW_KEYS.forEach(function (k) {
var V = SHW.v[k];
if (!V)
return;
var d = Math.hypot(P.x - V.x, P.z - V.z);
V.g.visible = inCity && d < 480;
V.d = d;
if (!V.g.visible)
return;
if (d < nd) {
nd = d;
near = V;
}
var B = shwBeat(V), pal = V.C.pal;
var seg = B.b / 32, i0 = Math.floor(seg) % pal.length, i1 = (i0 + 1) % pal.length, f = Math.max(0, Math.min(1, (seg % 1 - 0.75) * 4));
if (d < 160) {
var base0 = shwMix(pal[i0], pal[i1], f), base1 = shwMix(pal[(i0 + 2) % pal.length], pal[(i1 + 2) % pal.length], f);
var soft = 0.96 + 0.04 * Math.cos(B.ph * Math.PI * 2), n = SHW_FLOOR.n, c = V._c || (V._c = new THREE.Color());
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++) {
var w = 0.5 + 0.5 * Math.sin(B.t * 0.35 + i * 0.55 + j * 0.4), cc = shwMix(base0, base1, w), lum = (0.74 + 0.16 * Math.sin(B.t * 0.22 + (i - j) * 0.3)) * soft;
c.setRGB(cc[0] * lum, cc[1] * lum, cc[2] * lum);
V.tiles.setColorAt(i * n + j, c);
}
if (V.tiles.instanceColor)
V.tiles.instanceColor.needsUpdate = true;
V.beams.forEach(function (be, bi) {
be.rotation.z = Math.sin(B.t * 0.21 + bi * 1.3) * 0.42;
be.rotation.x = 0.55 + Math.sin(B.t * 0.17 + bi) * 0.2;
var cc2 = pal[(i0 + bi) % pal.length], cn = pal[(i1 + bi) % pal.length];
be.material.color.setRGB(cc2[0] + (cn[0] - cc2[0]) * f, cc2[1] + (cn[1] - cc2[1]) * f, cc2[2] + (cn[2] - cc2[2]) * f);
});
shwFigures(V);
shwAnimate(V, B);
}
if (V.figs) {
var show = d < 160;
V.figs.crowd.forEach(function (c) { c.g.visible = show; });
var liveHere = shwLiveAt(k);
V.figs.band.forEach(function (b) { b.g.visible = show && !liveHere; });
}
});
SHW.near = near;
shwDanceTick(near);
shwMusic(near);
}
function shwAnimate(V, B) {
var F = V.figs;
if (!F)
return;
var S = Math.sin, bt = B.b * Math.PI;
F.crowd.forEach(function (c, i) {
var g = c.g, s = S(bt + c.ph * Math.PI), L = g.userData.limbs, b = g.children[0], real = g.userData.rbReal;
g.userData.dance = V.k && /ball|waltz|tea|salon/i.test(V.k) ? "gentle" : "club";
g.position.set(c.lx + S(B.t * 0.3 + i) * 0.25, 0.09 + (real ? 0 : Math.abs(s) * 0.08), c.lz + S(B.t * 0.27 + i * 2) * 0.25);
g.rotation.y = c.face + S(real ? B.t * 0.15 + i : B.b * Math.PI / 4 + i) * 0.5;
if (L) {
var up = (i % 3 === 0) ? 1 : 0;
L.la.rotation.z = -(0.5 + s * 0.4 + up * 1.6);
L.ra.rotation.z = 0.5 - s * 0.4 + up * 1.6;
L.ll.rotation.x = s * 0.3;
L.rl.rotation.x = -s * 0.3;
}
if (b)
b.rotation.z = real ? 0 : s * 0.07;
});
F.band.forEach(function (m) {
var g = m.g, s = S(bt + m.ph), L = g.userData.limbs, b = g.children[0];
if (b) {
b.position.y = Math.abs(s) * 0.04;
b.rotation.z = s * 0.04;
}
if (L) {
if (m.part === "drums") {
L.la.rotation.x = -1.0 + Math.abs(S(bt * 2)) * 0.5;
L.ra.rotation.x = -1.0 + Math.abs(S(bt * 2 + 1.6)) * 0.5;
}
else if (m.part === "keys" || m.part === "dj") {
L.la.rotation.x = -1.1 + s * 0.12;
L.ra.rotation.x = -1.1 - s * 0.12;
}
else if (m.part === "guitar") {
L.la.rotation.x = -0.9;
L.ra.rotation.x = -0.6 + Math.abs(S(bt * 2)) * 0.4;
}
else {
L.ra.rotation.x = -1.4;
L.la.rotation.x = -0.2 + s * 0.1;
}
}
});
}
function shwOn(V, which) {
if (!V)
return false;
var l = shwL(V, camera.position.x, camera.position.z), F = SHW_FLOOR, half = F.n * F.s / 2, S = SHW_STAGE;
if (which === "floor")
return l.x > -half && l.x < half && l.z > F.c - half && l.z < F.c + half;
return l.x > S.x0 && l.x < S.x1 && l.z > S.z0 && l.z < S.z1;
}
function shwDanceTick(V) {
var on = !!V && shwInCity() && shwOn(V, "floor");
if (SHW.dance && !on) {
shwDance(false);
return;
}
if (!SHW.dance || typeof TOG === "undefined")
return;
var e = TOG.emo.me;
if (!e || e.kind !== "dance")
togEmoteOn("me", "dance");
else
e.len = e.t + 8;
if (Date.now() - SHW.danceSent > 7000 && typeof togLive === "function" && togLive()) {
SHW.danceSent = Date.now();
cityRpc("live_send", { p_kind: "emote", p_to: null, p_place: togPlace(), p_body: { e: "dance" } }).catch(function () { });
}
}
function shwDance(on) { return __ZC(214, 0, this, arguments, new.target); }
(function () {
if (typeof togEmoteOn !== "function")
return;
var on = togEmoteOn;
togEmoteOn = function (id, kind) { var e = TOG.emo[id]; if (e && e.kind === kind && kind === "dance" && e.t < e.len) {
e.len = e.t + TOG_EMO[kind].len;
return;
} return on.apply(this, arguments); };
})();
var SHW_PROG = [[[0, "M"], [7, "M"], [9, "m"], [5, "M"]], [[9, "m"], [5, "M"], [0, "M"], [7, "M"]], [[0, "M"], [5, "M"], [7, "M"], [5, "M"]], [[2, "m"], [7, "M"], [0, "M"], [9, "m"]], [[9, "m"], [7, "M"], [5, "M"], [7, "M"]], [[0, "M"], [9, "m"], [5, "M"], [7, "M"]]];
var SHW_ROOTS = [57, 60, 62, 55, 53, 58];
function shwMidi(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function shwSong(V, bar) { var song = Math.floor(bar / 32), h = shwHash(V.k + ":" + song); return { prog: SHW_PROG[h % SHW_PROG.length], root: SHW_ROOTS[(h >>> 8) % SHW_ROOTS.length], h: h }; }
function shwVol(V) {
if (!V || SHW.muted || !shwInCity())
return 0;
var v = Math.max(0, Math.min(1, 1 - (V.d - 10) / 65)) * 0.5;
if (shwLiveAt(V.k))
v *= 0.3;
return v;
}
function shwMusic(V) {
if (typeof audio === "undefined" || !audio.on || !audio.ctx)
return;
var ctx = audio.ctx;
if (!SHW.mg) {
SHW.mg = ctx.createGain();
SHW.mg.gain.value = 0;
SHW.mg.connect(audio.master);
}
var vol = shwVol(V);
SHW.mg.gain.setTargetAtTime(vol, ctx.currentTime, 0.4);
if (vol < 0.005) {
SHW.mStep = -1;
return;
}
if (SHW.mVen !== V.k) {
SHW.mVen = V.k;
SHW.mStep = -1;
}
var sl = 60 / V.C.bpm / 4, now = Date.now() / 1000, s = Math.max(SHW.mStep + 1, Math.floor(now / sl) + 1), n = 0;
while (s * sl < now + 1.0 && n < 40) {
var at = ctx.currentTime + (s * sl - now);
if (at > ctx.currentTime)
shwStep(V, s, at, sl);
SHW.mStep = s;
s++;
n++;
}
}
function shwOsc(type, f, at, dur, peak, out, attack) { return __ZC(214, 1, this, arguments, new.target); }
function shwNoise(at, dur, peak, type, freq) { return __ZC(214, 2, this, arguments, new.target); }
function shwStep(V, s, at, sl) { return __ZC(214, 3, this, arguments, new.target); }
function shwLiveAt(k) { var B = SHW.b; if (!B || !B.shows)
return null; for (var i = 0; i < B.shows.length; i++) {
var s = B.shows[i];
if (s.venue === k && s.live)
return s;
} return null; }
function shwMine() { var B = SHW.b, me = B && B.me; return me ? (B.shows || []).filter(function (s) { return s.performer === me; }) : []; }
function shwLoad(force) {
if (SHW.busy)
return;
if (!force && Date.now() - SHW.at < 60000)
return;
SHW.busy = true;
SHW.at = Date.now();
cityRpc("shows_board", {}).then(function (o) { if (o && o.ok) {
SHW.b = o;
SHW.at = Date.now();
if (SHW.open)
shwPaint();
try {
if (typeof tnBoardDraw === "function")
tnBoardDraw();
}
catch (e) { }
} })
.catch(function () { }).then(function () { SHW.busy = false; });
}
function shwWhen(iso) { return __ZC(214, 4, this, arguments, new.target); }
(function () {
if (typeof tnRows !== "function")
return;
var tr = tnRows;
tnRows = function () {
var rows = tr.apply(this, arguments);
try {
var B = SHW.b;
if (!B || !B.shows || !B.shows.length)
return rows;
var soon = B.shows.filter(function (s) { return s.live || new Date(s.starts_at).getTime() - Date.now() < 14 * 3600000; }).slice(0, 3);
var at = (typeof TN !== "undefined" && TN.d && TN.d.events) ? TN.d.events.length : 0;
var add = soon.map(function (s) { return ["🎤", "<b>" + esc(s.title) + "</b> · " + esc(s.name || "a dreamer") + " at " + esc(s.venue_name) + " · " + (s.live ? "live now" : shwWhen(s.starts_at)), s.live]; });
rows.splice.apply(rows, [Math.min(at, rows.length), 0].concat(add));
}
catch (e) { }
return rows;
};
})();
function shwPeerCap() { var v = SHW.live && SHW.live.video; return shwPhone() ? (v ? 5 : 8) : (v ? 10 : 16); }
function shwSend(to, body) { return cityRpc("live_send", { p_kind: "rtc", p_to: to, p_place: null, p_body: body }).catch(function () { }); }
function shwSource(mode, file, mic) { return __ZC(214, 5, this, arguments, new.target); }
function shwGoLive(s, mode, file, mic) { return __ZC(214, 6, this, arguments, new.target); }
function shwEndLive(say) { return __ZC(214, 7, this, arguments, new.target); }
function shwPerfSignal(from, b) { return __ZC(214, 8, this, arguments, new.target); }
function shwListenTick() {
var B = SHW.b, me = B && B.me, want = null;
if (B && B.adult && typeof togLive === "function" && togLive() && shwInCity()) {
SHW_KEYS.forEach(function (k) { var V = SHW.v[k], s = shwLiveAt(k); if (V && s && s.performer !== me && V.d < 48)
want = { s: s, V: V }; });
}
Object.keys(SHW.lis).forEach(function (id) { var Lq = SHW.lis[id]; if (!want || want.s.id !== +id) {
shwSend(Lq.from, { t: "s-bye", show: +id });
shwDrop(id);
} });
if (!want)
return;
var Lw = SHW.lis[want.s.id];
if (!Lw) {
Lw = SHW.lis[want.s.id] = { from: want.s.performer, venue: want.V.k, pc: null, audio: null, ask: 0, full: false };
}
if (!Lw.pc && !Lw.full && Date.now() - Lw.ask > 8000) {
Lw.ask = Date.now();
shwSend(want.s.performer, { t: "s-join", show: want.s.id });
}
if (Lw.audio)
Lw.audio.volume = SHW.muted ? 0 : Math.max(0, Math.min(1, 1 - (want.V.d - 28) / 22));
}
function shwDrop(id) { return __ZC(214, 9, this, arguments, new.target); }
function shwListSignal(from, b) { return __ZC(214, 10, this, arguments, new.target); }
(function () {
if (typeof vcSignal !== "function")
return;
var vs = vcSignal;
vcSignal = function (from, name, b) {
if (b && typeof b.t === "string" && b.t.indexOf("s-") === 0) {
try {
if (b.t === "s-join" || b.t === "s-answer" || (b.t === "s-bye" && SHW.live && b.show === SHW.live.id))
shwPerfSignal(from, b);
else
shwListSignal(from, b);
}
catch (e) { }
return;
}
return vs.apply(this, arguments);
};
})();
function shwPromptTick() {
if (typeof WLD !== "undefined" && WLD.on)
return;
var V = SHW.near, b = null;
if (V && V.d < 30 && shwInCity()) {
if (shwOn(V, "floor"))
b = { html: "💃 <b>" + esc(V.C.name) + "</b> · <b>press E</b> " + (SHW.dance ? "to stop dancing" : "to dance"), fn: function () { shwDance(!SHW.dance); } };
else if (shwOn(V, "stage")) {
var L = SHW.live, mine = shwMine().filter(function (s) { return s.venue === V.k && Date.now() > new Date(s.starts_at).getTime() - 600000; })[0];
if (L && L.venue === V.k)
b = { html: "🎤 <b>You are live</b> · <b>press E</b> to end the show", fn: function () { shwEndLive(); } };
else if (mine)
b = { html: "🎤 <b>" + esc(mine.title) + "</b> · <b>press E</b> to go live", fn: function () { SHW.tab = "on"; shwOpen(); } };
else
b = { html: "🎤 <b>The stage</b> of " + esc(V.C.name) + " · <b>press E</b> to see the shows or book a slot", fn: function () { shwOpen(); } };
}
}
var key = b ? b.html : null;
if (key !== SHW.promptKey) {
SHW.promptKey = key;
if (typeof worldPromptCity === "function")
worldPromptCity(b ? b.html : null, b ? b.fn : null);
}
}
function shwAct(name, args, then) {
SHW.say = "…";
shwPaint();
cityRpc(name, args).then(function (o) { SHW.say = (o && o.say) || ""; if (then)
then(o); shwLoad(true); shwPaint(); }).catch(function () { SHW.say = "That did not go through. Try again in a moment."; shwPaint(); });
}
function shwNextSlot() {
var d = new Date(Date.now() + 20 * 60000);
d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
var p = function (n) { return (n < 10 ? "0" : "") + n; };
return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" + p(d.getHours()) + ":" + p(d.getMinutes());
}
function shwHtml() { return __ZC(214, 11, this, arguments, new.target); }
function shwReadForm() {
var f = SHW.form;
if (!f)
return;
var g = function (id) { var e = document.getElementById(id); return e ? e.value : null; };
if (g("shw-venue") !== null) {
f.venue = g("shw-venue");
f.title = g("shw-title");
f.when = g("shw-when");
f.minutes = +g("shw-min");
}
}
function shwPaint() { return __ZC(214, 12, this, arguments, new.target); }
function shwClick(e) { return __ZC(214, 13, this, arguments, new.target); }
function shwOpen() { SHW.open = true; SHW.say = ""; shwPaint(); shwLoad(true); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return SHW.open; }, close: function () { SHW.open = false; shwPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-shows"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-shows";
b.title = "Concerts and dance clubs: what's on, and booking a slot";
b.textContent = "🎵 Shows";
b.onclick = shwOpen;
var pk = document.getElementById("me-guild");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
if (typeof presenceTick === "function") {
var pt = presenceTick;
presenceTick = function (dt) { var r = pt.apply(this, arguments); try {
shwTick(dt || 0.016);
}
catch (e) {
if (!SHW.warned && window.console) {
SHW.warned = 1;
console.warn("[shows]", e);
}
} return r; };
}
})();
setInterval(function () {
try {
if (shwInCity())
shwPlaceTick();
}
catch (e) {
if (!SHW.warned && window.console) {
SHW.warned = 1;
console.warn("[shows]", e);
}
}
try {
shwPromptTick();
}
catch (e) { }
}, 400);
setInterval(function () {
try {
if (shwInCity() || SHW.open)
shwLoad(false);
}
catch (e) { }
try {
shwListenTick();
}
catch (e) { }
if (SHW.live && Date.now() > SHW.live.ends)
shwEndLive("Your slot is over, so the show has ended. Thank you for playing.");
}, 1000);
