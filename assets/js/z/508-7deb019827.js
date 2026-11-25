/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(508, function () {
"use strict";
return [
function (k) {
var I = DLD_RELICS.filter(function (r) { return r.k === k; })[0];
if (!I)
return;
var R = dldRS();
if (R[k]) {
dldCard(I.e + " " + I.n, "You took it already: it is on your Relic Shelf. " + I.t);
return;
}
R[k] = Date.now();
try {
if (typeof save === "function")
save();
}
catch (e) { }
var n = DLD_RELICS.filter(function (r) { return R[r.k]; }).length;
dldCard(I.e + " " + I.n, I.t + "<br><br><b>Relics of the Count: " + n + " of " + DLD_RELICS.length + ".</b>" + (n === DLD_RELICS.length ? " You have found them all." : ""));
if (typeof setStatus === "function")
setStatus(I.e + " <b>" + I.n + "</b> · relics " + n + " of " + DLD_RELICS.length);
},
function () {
var R = dldRS(), n = 0, rows = DLD_RELICS.map(function (I) { if (R[I.k]) {
n++;
return I.e + " <b>" + I.n + "</b>";
} return "❔ <i>still somewhere in the vault</i>"; });
dldCard("The Relic Shelf (" + n + " of " + DLD_RELICS.length + ")", rows.join("<br>") + "<br><br>Seven relics of the Count lie about this vault. Look in the rooms.");
},
function (g, txt, w, h, x, y, z, ink, bg) {
var c = document.createElement("canvas");
c.width = 512;
c.height = Math.round(512 * h / w);
var k = c.getContext("2d");
k.fillStyle = bg || "#2A2624";
k.fillRect(0, 0, c.width, c.height);
k.fillStyle = ink || "#C8C0B0";
k.font = "bold " + Math.round(c.height * 0.62) + "px Georgia";
k.textAlign = "center";
k.textBaseline = "middle";
k.fillText(txt, c.width / 2, c.height / 2 + 2);
var t = new THREE.CanvasTexture(c), p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t }));
p.position.set(x, y, z);
g.add(p);
return p;
},
function (g, o) {
var w = o.w || 10, d = o.d || 10, h = o.h || 5, wall = dldM(o.col, "plaster"), base = dldM(0x6A5A4A, "stone"), trim = dldM(o.trim || 0xE8DCC0, "plaster"), wood = dldM(0x4A2E1E, "wood"), iron = dldM(0x1A1614), glass = dldG(0xFFC878), tile = dldM(0xA8502E, "tile");
dldBox(g, w, h, d, wall, 0, h / 2, 0);
dldBox(g, w + 0.2, 0.9, d + 0.2, base, 0, 0.45, 0);
dldBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.1, 0);
if (o.flat) {
dldBox(g, w + 0.3, 0.7, 0.3, wall, 0, h + 0.35, d / 2);
dldBox(g, w + 0.3, 0.7, 0.3, wall, 0, h + 0.35, -d / 2);
dldBox(g, 0.3, 0.7, d, wall, w / 2, h + 0.35, 0);
dldBox(g, 0.3, 0.7, d, wall, -w / 2, h + 0.35, 0);
for (var s = -1; s <= 1; s += 2) {
var sp = dldCyl(g, 0.12, 0.12, 1.4, dldM(0x8A6A4A), s * (w / 2 - 0.6), h - 0.2, d / 2 + 0.6, 6);
sp.rotation.x = Math.PI / 2;
}
}
else {
var rf = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1, 1, 4, 1), tile);
rf.rotation.y = Math.PI / 4;
rf.scale.set((w + 1.2) * 0.71, 1.6, (d + 1.2) * 0.71);
rf.position.y = h + 0.8;
g.add(rf);
}
var dz = d / 2 + 0.06;
dldBox(g, 1.9, 2.8, 0.12, trim, 0, 1.4 + 0.5, dz);
dldBox(g, 1.5, 2.5, 0.12, wood, 0, 1.25 + 0.5, dz + 0.04);
dldBox(g, 0.04, 2.5, 0.14, iron, 0, 1.75, dz + 0.06);
var nw = Math.max(1, Math.floor((w - 3) / 2.6)), lv = h > 6 ? 2 : 1;
for (var L = 0; L < lv; L++)
for (var i = 0; i < nw * 2; i++) {
var x = -w / 2 + 1.2 + i * (w - 2.4) / (nw * 2 - 1);
if (L === 0 && Math.abs(x) < 1.4)
continue;
var y = L ? h - 1.6 : 2.2;
dldBox(g, 1.0, 1.4, 0.08, glass, x, y, dz);
for (var b = -1; b <= 1; b++)
dldBox(g, 0.04, 1.5, 0.1, iron, x + b * 0.3, y, dz + 0.06);
dldBox(g, 1.1, 0.06, 0.1, iron, x, y, dz + 0.06);
dldBox(g, 0.45, 1.5, 0.06, dldM(o.shut || 0x2A5A6A, "wood"), x - 0.78, y, dz + 0.02);
dldBox(g, 0.45, 1.5, 0.06, dldM(o.shut || 0x2A5A6A, "wood"), x + 0.78, y, dz + 0.02);
if (!o.noPots && L === 0 && i % 2 === 0)
dldBox(g, 0.8, 0.3, 0.3, dldM(0xA85A3A), x, y - 0.9, dz + 0.2);
}
if (o.portal) {
var pd = 2.6;
for (var c = 0; c <= nw * 2; c++) {
var cx = -w / 2 + 0.3 + c * (w - 0.6) / (nw * 2);
dldBox(g, 0.45, 3.2, 0.45, trim, cx, 1.6, dz + pd);
}
dldBox(g, w, 0.6, 0.5, trim, 0, 3.5, dz + pd);
dldBox(g, w, 0.25, pd + 0.4, tile, 0, 3.95, dz + pd / 2);
}
dldBox(g, 1.0, 0.25, 0.4, dldM(0xF08A10), 0.9, 0.12, dz + 0.5);
var f = dldBox(g, 0.06, 0.18, 0.06, dldG(0xFFD27A), -0.9, 0.3, dz + 0.4);
f.userData.dldFlame = 1;
},
function (g) {
var st = dldM(0xC8A880, "stone"), pl = dldM(0xE8D8B8, "plaster"), dk = dldM(0x2A1E16, "wood"), dome = dldM(0xA8502E, "tile"), lt = dldG(0xFFC878), ir = dldM(0x1A1614);
dldBox(g, 14, 11, 30, pl, 0, 5.5, -2);
dldBox(g, 14.4, 1, 30.4, st, 0, 0.5, -2);
var rf = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1, 1, 4, 1), dome);
rf.rotation.y = Math.PI / 4;
rf.scale.set(10.4, 3, 21.5);
rf.position.set(0, 12.5, -2);
g.add(rf);
dldBox(g, 16, 15, 1.4, st, 0, 7.5, 13.4);
dldBox(g, 3.4, 5.2, 0.2, dk, 0, 2.6, 14.15);
var ar = dldCyl(g, 1.7, 1.7, 0.2, dk, 0, 5.2, 14.15, 16);
ar.rotation.x = Math.PI / 2;
dldBox(g, 4.6, 0.5, 0.4, st, 0, 6.3, 14.2);
var rw = dldCyl(g, 1.5, 1.5, 0.15, lt, 0, 10.4, 14.15, 20);
rw.rotation.x = Math.PI / 2;
var rr = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.2, 6, 20), st);
rr.position.set(0, 10.4, 14.2);
g.add(rr);
dldBox(g, 0.3, 2.6, 0.3, ir, 0, 16.6, 13.4);
dldBox(g, 1.4, 0.3, 0.3, ir, 0, 17.2, 13.4);
for (var s = -1; s <= 1; s += 2) {
var tx = s * 9.2;
dldBox(g, 4.4, 18, 4.4, st, tx, 9, 12.4);
dldBox(g, 4.8, 0.5, 4.8, st, tx, 18.2, 12.4);
dldBox(g, 3.6, 4, 3.6, pl, tx, 20.4, 12.4);
for (var k = 0; k < 4; k++) {
var a = k * Math.PI / 2;
dldBox(g, 1.2, 2.4, 0.3, dldM(0x140E0A), tx + Math.sin(a) * 1.75, 20.6, 12.4 + Math.cos(a) * 1.75, a);
}
var bell = dldSph(g, 0.7, dldM(0x8A6A2A, "metal"), tx, 20.4, 12.4, 10);
bell.scale.y = 1.2;
var cp = new THREE.Mesh(new THREE.SphereGeometry(2, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), dome);
cp.position.set(tx, 22.4, 12.4);
g.add(cp);
dldBox(g, 0.2, 1.8, 0.2, ir, tx, 25, 12.4);
dldBox(g, 0.9, 0.18, 0.18, ir, tx, 25.3, 12.4);
for (var y = 0; y < 2; y++) {
dldBox(g, 1.0, 1.8, 0.1, lt, tx, 6 + y * 6, 14.65);
}
}
dldCyl(g, 4.2, 4.2, 3, pl, 0, 12.6, -8, 16);
var dm = new THREE.Mesh(new THREE.SphereGeometry(4.4, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), dome);
dm.position.set(0, 14.1, -8);
g.add(dm);
dldCyl(g, 0.8, 0.8, 1.6, pl, 0, 19, -8, 10);
dldBox(g, 0.2, 1.8, 0.2, ir, 0, 20.6, -8);
for (var w = 0; w < 5; w++) {
dldBox(g, 0.1, 2.4, 1.2, lt, 7.06, 6, 8 - w * 5.4);
dldBox(g, 0.1, 2.4, 1.2, lt, -7.06, 6, 8 - w * 5.4);
}
[[-12, 22, 8, 0], [12, 22, 8, 0]].forEach(function (a) { dldBox(g, a[2], 1.2, 0.6, pl, a[0], 0.6, a[1]); });
dldBox(g, 0.6, 1.2, 10, pl, -16, 0.6, 17);
dldBox(g, 0.6, 1.2, 10, pl, 16, 0.6, 17);
dldBox(g, 1.6, 1.2, 1.6, st, 0, 0.6, 19);
dldBox(g, 0.4, 3.4, 0.4, st, 0, 2.8, 19);
dldBox(g, 1.6, 0.4, 0.4, st, 0, 3.6, 19);
for (var m = 0; m < 10; m++)
dldBox(g, 0.9, 0.3, 0.9, dldM(0xF08A10), -6 + m * 1.33, 0.15, 16.6);
},
function (g) {
var st = dldM(0xC8B8A0, "stone"), ir = dldM(0x1E2A24, "metal"), rf = dldM(0x2A4A3A, "metal"), lt = dldG(0xFFD890);
dldCyl(g, 5.4, 5.6, 1.2, st, 0, 0.6, 0, 8);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2 + Math.PI / 8;
dldCyl(g, 0.12, 0.14, 4, ir, Math.sin(a) * 4.8, 3.2, Math.cos(a) * 4.8, 6);
dldBox(g, 3.6, 0.5, 0.06, ir, Math.sin(a + Math.PI / 8) * 4.45, 4.9, Math.cos(a + Math.PI / 8) * 4.45, a + Math.PI / 8 + Math.PI / 2);
dldBox(g, 3.6, 0.7, 0.06, ir, Math.sin(a + Math.PI / 8) * 4.45, 1.6, Math.cos(a + Math.PI / 8) * 4.45, a + Math.PI / 8 + Math.PI / 2);
}
var dm = new THREE.Mesh(new THREE.SphereGeometry(5.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), rf);
dm.scale.y = 0.45;
dm.position.y = 5.2;
g.add(dm);
dldCyl(g, 0.3, 0.3, 0.8, ir, 0, 8.2, 0, 8);
dldSph(g, 0.35, lt, 0, 8.8, 0, 8);
for (var k = 0; k < 8; k++) {
var b = k / 8 * Math.PI * 2;
var l = dldSph(g, 0.16, lt, Math.sin(b) * 5, 5.1, Math.cos(b) * 5, 6);
l.userData.dldFlame = 1;
}
},
function (g, s) {
s = s || 1;
var cl = dldM(0xF4ECE0), cl2 = dldM(0x7A1A3A), mg = dldM(0xF08A10), mg2 = dldM(0xE8C020), fr = dldM(0x3A2A1E, "wood"), ph = dldM(0x2A2420), bread = dldM(0xC88A4A), sk = dldM(0xF4F0E8), lt = dldG(0xFFD27A);
for (var t = 0; t < 3; t++) {
dldBox(g, 3.2 * s - t * 0.6 * s, 0.8 * s, 1.6 * s - t * 0.4 * s, t % 2 ? cl2 : cl, 0, 0.4 * s + t * 0.8 * s, -t * 0.3 * s);
}
var n = dldLite() ? 12 : 22;
for (var i = 0; i <= n; i++) {
var a = Math.PI * i / n, x = Math.cos(a) * 1.8 * s, y = 2.4 * s + Math.sin(a) * 1.6 * s;
dldSph(g, 0.16 * s, i % 3 ? mg : mg2, x, y, -0.5 * s, 6);
}
for (var p = 0; p < 5; p++) {
var x = -1.2 * s + p * 0.6 * s;
dldBox(g, 0.36 * s, 0.46 * s, 0.04 * s, fr, x, 2.6 * s, -0.55 * s);
dldBox(g, 0.28 * s, 0.36 * s, 0.05 * s, ph, x, 2.6 * s, -0.53 * s);
}
for (var c = 0; c < 7; c++) {
var cx = -1.4 * s + c * 0.47 * s;
dldCyl(g, 0.05 * s, 0.05 * s, 0.3 * s, cl, cx, 0.95 * s, 0.62 * s, 6);
var f = dldBox(g, 0.05 * s, 0.1 * s, 0.05 * s, lt, cx, 1.16 * s, 0.62 * s);
f.userData.dldFlame = 1;
}
for (var b = 0; b < 3; b++) {
var br = dldSph(g, 0.18 * s, bread, -0.6 * s + b * 0.6 * s, 1.75 * s, 0.15 * s, 8);
br.scale.y = 0.6;
}
for (var k = 0; k < 4; k++) {
dldSph(g, 0.12 * s, sk, -0.9 * s + k * 0.6 * s, 2.48 * s, -0.2 * s, 8);
}
for (var q = 0; q < 14; q++) {
var pe = dldBox(g, 0.2 * s, 0.02, 0.2 * s, q % 2 ? mg : mg2, (Math.sin(q * 2.3)) * 1.6 * s, 0.02, 1.0 * s + Math.cos(q * 1.7) * 0.6 * s);
pe.rotation.y = q;
}
},
function (g, len, h) {
var cols = [0xE83A6A, 0xF0A020, 0x3AA8E0, 0x8A3AC8, 0x3AC86A, 0xF05A2A], R = ldRand(len * 7 | 0), n = Math.floor(len / 0.7);
var str = dldM(0x2A2A2A);
var line = dldBox(g, 0.02, 0.02, len, str, 0, h, 0);
for (var i = 0; i < n; i++) {
var f = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.62), dldM(cols[i % cols.length], null, { side: 1, e: cols[i % cols.length], ei: 0.35 }));
f.position.set(0, h - 0.34 - Math.sin(i / n * Math.PI) * 0.6, -len / 2 + 0.35 + i * 0.7);
f.rotation.y = Math.PI / 2 + (R() - 0.5) * 0.3;
g.add(f);
}
},
function (g, k, R, name) {
var st = dldM([0xB8B0A0, 0x9A9488, 0xC8C0B0][k % 3], "stone"), mg = dldM(0xF08A10), mg2 = dldM(0xE8C020), lt = dldG(0xFFD27A), pk = dldM(0xC83A7A);
if (k % 5 === 4) {
var cw = 2.4, ch = 2.8;
dldBox(g, cw, ch, 2.6, dldM([0x9A9080, 0x8A9094, 0x988A84][k % 3], "stone"), 0, ch / 2, 0);
var rf = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1, 1, 4, 1), dldM(0x8A8478, "stone"));
rf.rotation.y = Math.PI / 4;
rf.scale.set(1.9, 1.2, 2.0);
rf.position.y = ch + 0.6;
g.add(rf);
dldBox(g, 0.9, 1.7, 0.08, dldM(0x1A1614), 0, 0.85, 1.31);
dldBox(g, 0.14, 0.8, 0.14, st, 0, ch + 1.6, 0);
dldBox(g, 0.5, 0.14, 0.14, st, 0, ch + 1.75, 0);
}
else if (k % 3 === 1) {
dldBox(g, 0.22, 1.6, 0.22, st, 0, 0.8, -0.9);
dldBox(g, 0.9, 0.2, 0.22, st, 0, 1.15, -0.9);
dldBox(g, 1.1, 0.3, 2.2, st, 0, 0.15, 0);
}
else {
dldBox(g, 1.0, 1.2, 0.22, st, 0, 0.6, -1.0);
var tp = dldCyl(g, 0.5, 0.5, 0.22, st, 0, 1.2, -1.0, 12);
tp.rotation.x = Math.PI / 2;
dldBox(g, 1.1, 0.3, 2.2, st, 0, 0.15, 0);
}
for (var i = 0; i < (dldLite() ? 4 : 9); i++) {
dldSph(g, 0.13, i % 3 ? mg : mg2, (R() - 0.5) * 0.9, 0.36, (R() - 0.3) * 1.6, 6);
}
if (k % 2)
for (var p = 0; p < 3; p++)
dldSph(g, 0.12, pk, (R() - 0.5) * 0.8, 0.36, 0.6 + R() * 0.3, 6);
for (var c = 0; c < (k % 4) + 2; c++) {
var x = (c % 2 ? 0.45 : -0.45), z = 0.9 + Math.floor(c / 2) * 0.3;
dldCyl(g, 0.06, 0.06, 0.2, dldM(0xC83A2A, null, { op: 0.8 }), x, 0.4, z, 6);
var f = dldBox(g, 0.05, 0.1, 0.05, lt, x, 0.56, z);
f.userData.dldFlame = 1;
}
},
function (g) {
var st = dldM(0x5A5652, "stone"), dk = dldM(0x3A3634, "stone"), ir = dldM(0x16141A, "metal"), rf = dldM(0x2A2A30, "stone");
dldBox(g, 7, 6, 9, st, 0, 3, 0);
dldBox(g, 7.6, 0.8, 9.6, dk, 0, 0.4, 0);
dldBox(g, 7.4, 0.4, 9.4, dk, 0, 6.1, 0);
var r = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1, 1, 4, 1), rf);
r.rotation.y = Math.PI / 4;
r.scale.set(5.6, 4.2, 7);
r.position.y = 8.2;
g.add(r);
[[-3.5, 4.5], [3.5, 4.5], [-3.5, -4.5], [3.5, -4.5]].forEach(function (p) { dldBox(g, 0.8, 7.6, 0.8, dk, p[0], 3.8, p[1]); var c = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.6, 4), dk); c.position.set(p[0], 8.9, p[1]); c.rotation.y = Math.PI / 4; g.add(c); });
dldBox(g, 2.6, 3.4, 0.3, dk, 0, 1.7 + 0.8, 4.6);
var ap = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.6, 4, 1), dk);
ap.rotation.y = Math.PI / 4;
ap.scale.z = 0.2;
ap.position.set(0, 4.9, 4.6);
g.add(ap);
dldBox(g, 2.0, 3.0, 0.12, ir, 0, 2.3, 4.78);
for (var b = 0; b < 4; b++)
dldBox(g, 2.0, 0.08, 0.16, dldM(0x3A3A40, "metal"), 0, 1.2 + b * 0.8, 4.82);
dldBox(g, 3, 0.4, 1.2, dk, 0, 0.2, 5.2);
dldWord(g, "DRACULA", 3.6, 0.6, 0, 6.6, 4.82, "#D8D0C0", "#2A2624");
var wr = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.08, 6, 14), dldM(0x3A2A1E));
wr.position.set(1.6, 1.6, 4.8);
g.add(wr);
for (var w = 0; w < 10; w++)
dldBox(g, 0.1, 0.5 + (w % 3) * 0.2, 0.1, dldM(0x3A4A2A), -3.6 + w * 0.8, 0.3, 5.4);
},
function (g) {
var st = dldM(0x8A7A68, "stone"), mg = dldM(0xF08A10);
dldBox(g, 5, 0.5, 34, st, 0, 0.25, 0);
dldBox(g, 0.4, 1.0, 34, st, 2.3, 0.9, 0);
dldBox(g, 0.4, 1.0, 34, st, -2.3, 0.9, 0);
[-10, 0, 10].forEach(function (z) { dldBox(g, 5, 1.6, 1.6, st, 0, -0.8, z); });
for (var i = 0; i < 26; i++) {
var p = dldBox(g, 0.3, 0.03, 0.3, mg, (Math.sin(i * 1.9)) * 1.8, 0.52, -16 + i * 1.25);
p.rotation.y = i;
}
[-16, 16].forEach(function (z) { [-2.3, 2.3].forEach(function (x) { var lg = new THREE.Group(); lg.position.set(x, 1.4, z); g.add(lg); dldLamp(lg); }); });
},
function (g) {
var pl = dldM(0xE0D4B8, "plaster"), st = dldM(0x8A7A68, "stone"), ir = dldM(0x1A1614, "metal");
dldBox(g, 1.4, 5, 1.4, pl, -3, 2.5, 0);
dldBox(g, 1.4, 5, 1.4, pl, 3, 2.5, 0);
dldBox(g, 7.4, 1.2, 1.4, pl, 0, 5.6, 0);
dldBox(g, 7.6, 0.3, 1.6, st, 0, 6.3, 0);
dldWord(g, "PANTEÓN", 4.2, 0.7, 0, 5.6, 0.72, "#3A2A1E", "#E0D4B8");
dldBox(g, 0.25, 1.6, 0.25, ir, 0, 7.2, 0);
dldBox(g, 0.9, 0.2, 0.2, ir, 0, 7.5, 0);
},
function (g) {
g.traverse(function (m) {
if (!m.isMesh || !m.material)
return;
var mm = (Array.isArray(m.material) ? m.material : [m.material]).map(function (x) {
var c = x.clone();
c.transparent = true;
c.opacity = 0.62;
c.depthWrite = false;
if (c.color)
c.color.lerp(new THREE.Color(0xD8F0FF), 0.55);
if (c.emissive) {
c.emissive = new THREE.Color(0x8AB8D8);
c.emissiveIntensity = 0.55;
}
return c;
});
m.material = Array.isArray(m.material) ? mm : mm[0];
});
},
function (P) {
var L = DLD_L, lite = P.lite, R = ldRand(1102);
P.items = P.items.filter(function (it) {
if (it.t === "k" && /^(pueblo|hacienda|cottage|chapel|graveyard|crypt|tomb|gravestone|bonetree|mistbank|deadtree|ofrenda|papelpicado|lanternpost)$/.test(it.a))
return false;
if (it.t === "m" && it.x === 0 && it.z === -100)
return false;
if (it.t === "s" && it.lines && it.lines[0] === "The Land of the Dead")
return false;
if (it.t === "b" && it.a === "ghost")
return false;
return true;
});
P.sign(-8, -14, 0.3, ["The Land of the Dead", "Press E to read"], ["The Land of the Dead", "Día de Muertos, the Day of the Dead", ["This is the land where the dead come home, on the night when the living remember them: Día de Muertos, the 1st and 2nd of November. Families build ofrendas (altars) with photographs, candles, bread of the dead, sugar skulls and orange marigolds (cempasúchil), whose strong smell and bright colour are said to guide the spirits home.", "The little ones, the angelitos, come on the 1st; the grown dead on the 2nd. Families keep vigil all night in the cemetery, at graves dressed in marigolds and candles, with music and food.", "Before Spain came, the Mexica (Aztecs) told of Mictlán, the land of the dead, nine places deep: a journey of four years with a dog to guide the soul across the river. Find the xolo dog by the river to walk the road to Mictlán.", "In the far corner of the panteón is an old foreign tomb nobody tends, with one word over its iron door. Go in: it is the way into the whole of Bram Stoker's Dracula."]]);
P.path([[0, 6], [0, -48]], 6, 0x7A6A58);
P.path([[0, -92], [0, -104]], 5, 0x7A6A58);
for (var z = -6; z >= -44; z -= 12) {
[-3.8, 3.8].forEach(function (x) { P.make(x, z, 0, 0.4, dldLamp, { r: 0.25, h: 4 }); });
}
var COL = [0xD89A3A, 0xC8604A, 0x3A5A9A, 0xE0B8A8, 0x6A9A6A, 0xE8D088, 0xB84A6A, 0x4A8AA8], SH = [0x2A5A6A, 0x6A2A2A, 0x2A4A2A, 0x5A3A1A];
var H = [[-13, -26, Math.PI / 2, 10, 9, 5, 0], [-13, -40, Math.PI / 2, 9, 9, 7, 1], [13, -24, -Math.PI / 2, 10, 9, 5, 1], [13, -40, -Math.PI / 2, 12, 9, 7, 0],
[-30, -58, Math.PI / 2, 10, 10, 6, 1], [-30, -74, Math.PI / 2, 10, 10, 5, 0], [-30, -90, Math.PI / 2, 12, 10, 7, 1], [30, -58, -Math.PI / 2, 10, 10, 7, 0], [30, -74, -Math.PI / 2, 10, 10, 5, 1], [30, -92, -Math.PI / 2, 12, 10, 6, 0],
[-14, -104, 0, 10, 9, 6, 0], [14, -104, 0, 10, 9, 6, 1], [-46, -30, Math.PI / 2, 10, 9, 5, 0], [46, -30, -Math.PI / 2, 10, 9, 5, 1], [-46, -110, Math.PI / 2, 10, 9, 6, 0], [46, -118, -Math.PI / 2, 10, 9, 5, 1]];
var NM = ["The house of the Ríos family", "The house of the Mendoza family", "The house of Doña Refugio's people", "The house of the Navarros", "The house of the Ochoa family", "The baker's house", "The house of the Cruz family", "The candle-maker's house",
"The house of the Herrera family", "The house of the Vargas family", "The schoolhouse", "The house of the Ortiz family", "The flower-seller's house", "The house of the Salazar family", "The potter's house", "The house of the Flores family"];
if (lite)
H = H.slice(0, 10);
H.forEach(function (h, i) {
var o = { w: h[3], d: h[4], h: h[5], col: COL[i % COL.length], shut: SH[i % SH.length], portal: !!h[6] && i >= 4 && i < 10, flat: i % 3 === 2 };
var it = P.make(h[0], h[1], h[2], Math.max(h[3], h[4]) * 0.7, function (g) { dldHouse(g, o); }, { hw: h[3] / 2, hd: h[4] / 2, h: h[5] });
it.dpxDoor = { theme: "hacienda", name: NM[i % NM.length], doors: "the wooden doors", lx: 0, lz: h[4] / 2 + 0.8 };
});
P.path([[0, -44], [0, -100]], 58, 0x7A6A5A);
P.path([[0, -100], [0, -120]], 30, 0x7A6A5A);
P.make(0, -72, 0, 6, dldKiosk, { r: 5.6, h: 6 });
[[-14, -60], [14, -60], [-14, -86], [14, -86], [-20, -72], [20, -72]].forEach(function (p, k) { P.make(p[0], p[1], k, 1.2, function (g) { dldLaurel(g, 1); }, { r: 1.0, h: 5 }); });
[[-8, -56, 0], [8, -56, 0], [-8, -90, Math.PI], [8, -90, Math.PI], [-18, -66, Math.PI / 2], [18, -78, -Math.PI / 2]].forEach(function (b) { P.k("bench", b[0], b[1], b[2], 1); });
[-12, -22, -32, -42].forEach(function (z) { P.make(0, z, Math.PI / 2, 1, function (g) { dldPicado(g, 24, 6); }); });
[-60, -72, -84].forEach(function (z) { P.make(0, z, Math.PI / 2, 1, function (g) { dldPicado(g, 52, 7); }); });
[[-24, -50], [24, -50], [-24, -96], [24, -96]].forEach(function (p) { P.make(p[0], p[1], 0, 0.4, dldLamp, { r: 0.25, h: 4 }); });
P.make(-10, -96, 0, 2.5, function (g) { dldOfrenda(g, 1.1); }, { hw: 1.8, hd: 0.9, h: 3 });
P.make(10, -96, 0, 2.5, function (g) { dldOfrenda(g, 1.1); }, { hw: 1.8, hd: 0.9, h: 3 });
P.make(-40, -74, Math.PI / 2, 2, function (g) { dldOfrenda(g, 0.9); }, { hw: 1.5, hd: 0.8, h: 3 });
var ch = P.make(0, -140, 0, 18, dldChurch, { hw: 8, hd: 16, h: 14 });
ch.dpxDoor = { theme: "chapel", name: "The parish church of San Miguel", doors: "the great doors", lx: 0, lz: 14.8 };
P.flow([[-150, 260], [-146, 120], [-156, 0], [-150, -120], [-160, -260]], 22, 0x2A3A4A, { bank: 2, bankCol: 0x3A3028 });
P.make(-152, -60, Math.PI / 2, 18, dldBridge, null);
[-2.3, 2.3].forEach(function (dz) { P.make(-152, -60 + dz, Math.PI / 2, 1, function () { }, { hw: 0.25, hd: 17, h: 1.2 }); });
var mp = [[-136, -60], [-110, -60], [-92, -62], [-70, -60], [-50, -62], [-32, -66]];
P.path(mp, 2.6, 0xB8581A);
if (typeof ldBloom === "function") {
P.make(-112, -55, 0, 3, ldBloom(lite ? 60 : 160, 70, 3, 0xF08A10, 0x4A6A2A, 1111, 0.22));
P.make(-112, -65, 0, 3, ldBloom(lite ? 60 : 160, 70, 3, 0xE8B020, 0x4A6A2A, 1112, 0.22));
}
for (var k = 0; k < mp.length; k += 1) {
var p = mp[k];
if (k % 2 === 0)
P.make(p[0], p[1] + 3, 0, 0.4, dldLamp, { r: 0.25, h: 4 });
}
var PX0 = 64, PX1 = 160, PZ0 = -50, PZ1 = -150;
P.make(PX0, -63, 0, 1, function (g) { dldWall(g, 26); }, { hw: 0.4, hd: 13, h: 2.6 });
P.make(PX0, -117, 0, 1, function (g) { dldWall(g, 66); }, { hw: 0.4, hd: 33, h: 2.6 });
P.make(PX0, -80, -Math.PI / 2, 5, dldGate, null);
P.make(PX1, (PZ0 + PZ1) / 2, 0, 1, function (g) { dldWall(g, PZ0 - PZ1); }, { hw: 0.4, hd: (PZ0 - PZ1) / 2, h: 2.6 });
P.make((PX0 + PX1) / 2, PZ0, Math.PI / 2, 1, function (g) { dldWall(g, PX1 - PX0); }, { hw: 0.4, hd: (PX1 - PX0) / 2, h: 2.6 });
P.make((PX0 + PX1) / 2, PZ1, Math.PI / 2, 1, function (g) { dldWall(g, PX1 - PX0); }, { hw: 0.4, hd: (PX1 - PX0) / 2, h: 2.6 });
P.path([[56, -80], [120, -80]], 3, 0x8A7A60);
P.path([[100, -56], [100, -144]], 2.4, 0x8A7A60);
P.make(PX1 - 2, PZ0 - 2, 0, 0.5, function (g0) {
var g = new THREE.Group();
g.position.set((PX0 + PX1) / 2 - (PX1 - 2), 0, (PZ0 + PZ1) / 2 - (PZ0 - 2));
g0.add(g);
var W = PX1 - PX0 - 1, D = PZ0 - PZ1 - 1;
var e = new THREE.Mesh(new THREE.PlaneGeometry(W, D), dpxMat(0x2A2420, "earth"));
e.rotation.x = -Math.PI / 2;
e.position.y = 0.025;
g.add(e);
var mt = new THREE.CanvasTexture((function () { var c = document.createElement("canvas"); c.width = c.height = 128; var x = c.getContext("2d"), gr = x.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, "rgba(220,226,232,0.55)"); gr.addColorStop(0.6, "rgba(200,208,216,0.22)"); gr.addColorStop(1, "rgba(200,208,216,0)"); x.fillStyle = gr; x.fillRect(0, 0, 128, 128); return c; })());
var mm = new THREE.MeshBasicMaterial({ map: mt, transparent: true, opacity: 0.9, depthWrite: false, color: 0xC8CED8, side: THREE.DoubleSide });
var M = lite ? 18 : 70, Rm = ldRand(1313);
var im = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), mm, M), d = new THREE.Object3D();
for (var i = 0; i < M; i++) {
var sz = 10 + Rm() * 16, up = i % 3 === 0;
d.position.set((Rm() - 0.5) * W * 0.95, up ? 1.2 + Rm() * 1.2 : 0.4 + Rm() * 1.2, (Rm() - 0.5) * D * 0.95);
if (up)
d.rotation.set(0, Rm() * 3.14, 0);
else
d.rotation.set(-Math.PI / 2 + 0.08, 0, Rm() * 3.14);
d.scale.set(sz, up ? sz * 0.35 : sz * 0.6, 1);
d.updateMatrix();
im.setMatrixAt(i, d.matrix);
}
im.instanceMatrix.needsUpdate = true;
im.frustumCulled = false;
im.renderOrder = 3;
im.userData.dldMist = { ph: 0, a: 2.5 };
g.add(im);
var bark = dpxMat(0x2A2420, "bark"), iron = dpxMat(0x1A1A1C, null, {});
[[-40, -38], [34, -30], [-12, 40], [40, 36], [-30, 10]].forEach(function (q, k) {
var t = new THREE.Group();
t.position.set(q[0], 0, q[1]);
g.add(t);
var tr = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.34, 5.5, 6), bark);
tr.position.y = 2.75;
tr.rotation.z = 0.06 * (k % 2 ? 1 : -1);
t.add(tr);
for (var b = 0; b < 6; b++) {
var br = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.11, 2.4, 5), bark), a = b * 1.05 + k;
br.position.set(Math.cos(a) * 0.7, 3.4 + b * 0.32, Math.sin(a) * 0.7);
br.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9);
t.add(br);
}
});
if (!lite)
for (var c = 0; c < 26; c++) {
var x = (Rm() - 0.5) * W * 0.9, z = (Rm() - 0.5) * D * 0.9;
if (Math.abs(z + 80 - (PZ0 + PZ1) / 2) < 4 || Math.abs(x) < 3)
continue;
var cr = new THREE.Group();
cr.position.set(x, 0, z);
cr.rotation.set((Rm() - 0.5) * 0.5, Rm() * 6, (Rm() - 0.5) * 0.5);
g.add(cr);
var v = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.2, 0.07), iron);
v.position.y = 0.6;
cr.add(v);
var h = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.07, 0.07), iron);
h.position.y = 0.92;
cr.add(h);
}
}, null);
var gn = 0, NAMES = ["Familia Ríos", "Familia Ochoa", "Refugio Mendoza 1961", "Familia Cruz", "Anselmo Ortiz 1930", "Familia Navarro", "Inés Herrera 1952", "Familia Vargas"];
for (var gx = 72; gx <= 150; gx += lite ? 9 : 6.5) {
for (var gz = -58; gz >= -142; gz -= lite ? 8 : 5.5) {
if (Math.abs(gz + 80) < 4 || Math.abs(gx - 100) < 3 || (gx > 128 && gz < -124))
continue;
(function (x, z, k) { P.make(x, z, Math.PI, 1.4, function (g) { dldGrave(g, k, ldRand(k * 13 + 5)); }, k % 5 === 4 ? { hw: 1.3, hd: 1.4, h: 3 } : { hw: 0.6, hd: 1.1, h: 1.2 }); })(gx + (R() - 0.5) * 1.2, gz, gn++);
}
}
for (var cy = 0, ct = 0; cy < (lite ? 6 : 14) && ct < 200; ct++) {
var cxx = PX0 + 4 + R() * (PX1 - PX0 - 8), czz = PZ0 - 3 - R() * (PZ0 - PZ1 - 6);
if (Math.hypot(cxx - 138, czz + 136) < 14 || Math.abs(czz + 80) < 5 || Math.abs(cxx - 100) < 4 || cxx < 72)
continue;
cy++;
(function (s, x, z) { P.make(x, z, 0, 1, function (g) { dldCypress(g, s); }, { r: 0.6, h: 8 }); })(0.8 + R() * 0.5, cxx, czz);
}
var FAM = [[86, -70, "f", 0x2A2A3A], [88, -71, "m", 0x3A3A3A], [110, -96, "f", 0x5A2A3A], [112, -97, "m", 0x2A3A4A], [78, -118, "f", 0x1A1A2A], [134, -70, "m", 0x4A3A2A]];
FAM.forEach(function (f, k) {
P.person("dld_fam" + k, f[0], f[1], Math.PI * (k % 2 ? 1.2 : 0.8), { sex: f[2], look: { top: f[3], topKind: f[2] === "f" ? "dress" : "coat", bottom: f[3], shoes: 0x1A1A1A, skin: 0xB88860, hair: 0x1A1010, hat: k % 3 === 0 ? "veil" : "none" } }, k === 0 ? ldWho("Señora Ochoa, keeping vigil", L, "a living woman keeping vigil all night at her family's grave, with candles and a thermos of hot chocolate", "We stay all night. My grandmother is here somewhere, I can feel her. Sit with us a little, if you like. There's chocolate.") : null);
});
var dt = P.make(142, -136, -Math.PI / 2, 7, dldDraculaTomb, { hw: 3.8, hd: 4.8, h: 8 });
dt.dpxDoor = { theme: "dracvault", name: "The tomb of Count Dracula", doors: "the iron door", lx: 0, lz: 5.4 };
P.fact(132, -128, 3, "An old foreign tomb", "look", ["The foreign corner", "Nobody tends it", ["Nobody here remembers who is buried in the grey tomb in the corner, so nobody puts marigolds on it, and no candle burns. The word over its iron door is DRACULA.", "Go in at the iron door, down into the vault. At the far end is the great tomb: press E there to walk the whole of Bram Stoker's Dracula (1897), 27 chapters."]]);
var ages = [0, 1, 2, 2, 2, 3, 3, 3], N = lite ? 14 : 40, LOOKS = [["dress", 0x6A4A5A], ["coat", 0x3A3A3A], ["shirt", 0xE8E0D0], ["dress", 0xE8D8C8], ["tunic", 0xC8A040], ["robe", 0x5A4A3A], ["coat", 0x1A2A4A], ["dress", 0x2A2A3A]];
DLD_SPIRITS.forEach(function (S, i) {
if (lite && i >= 6)
return;
var z = -60 - (i % 6) * 2, x = -130 + i * 9;
if (i >= 6) {
x = [-6, 6, -16, 16, 90, 120][i - 6];
z = [-80, -64, -96, -94, -90, -110][i - 6];
}
P.person(S[0], x, z, i, { sex: S[4], child: /boy|girl/.test(S[1]) ? 1 : 0, dldGhost: 1, look: { top: S[5], topKind: S[6], bottom: S[5], shoes: 0x2A2A2A, skin: 0xD8D0C8, hair: S[7], hairStyle: S[8], hat: i === 2 ? "wreath" : "none" } }, ldWho(S[1], L, S[2], S[3], "You are a spirit, the dead come home for the Day of the Dead; gentle, glad to be remembered."), { r: i < 6 ? 14 : 6, sp: 0.35 });
});
for (var s = 0; s < N - DLD_SPIRITS.length; s++) {
var lk = LOOKS[s % LOOKS.length], ax = R(), on = s % 3;
var sx = on === 0 ? (-130 + R() * 100) : on === 1 ? (PX0 + 6 + R() * (PX1 - PX0 - 12)) : (-20 + R() * 40), sz = on === 0 ? (-60 + (R() - 0.5) * 6) : on === 1 ? (PZ0 - 6 - R() * (PZ0 - PZ1 - 12)) : (-60 - R() * 40);
P.person("dld_sp" + s, sx, sz, R() * 6, { sex: s % 2 ? "m" : "f", child: ages[s % ages.length] === 0 ? 1 : 0, dldGhost: 1, look: { top: lk[1], topKind: lk[0], bottom: lk[1], shoes: 0x2A2A2A, skin: 0xD8D0C8, hair: [0x1A1010, 0x8A8A8A, 0xD8D8D8, 0x3A2A1A][s % 4], hairStyle: s % 2 ? "short" : "long" } }, null, { r: on === 0 ? 20 : 8, sp: 0.3 });
}
for (var t = 0; t < (lite ? 14 : 34); t++) {
(function (a, d, s) { P.make(Math.sin(a) * d, Math.cos(a) * d - 60, 0, 1, function (g) { dldCypress(g, s); }, { r: 0.6, h: 8 }); })(R() * 6.283, 170 + R() * 120, 0.9 + R() * 0.6);
}
if (typeof ldBloom === "function") {
[[-80, 40], [60, 30], [-60, -200], [90, -210]].forEach(function (f, k) { P.make(f[0], f[1], 0, 22, ldBloom(lite ? 80 : 220, 34, 26, 0xF08A10, 0x4A6A2A, 1120 + k, 0.4)); });
}
P.strew("rock", 14, 170, 280, 1106, 0.8, 1.4);
P.strew("spiritlanterns", 10, 40, 200, 1104, 1, 1);
setTimeout(function () { try {
if (LD && LD.kind === "dead" && LD.g) {
var F = [];
LD.g.traverse(function (m) { if (m.userData && m.userData.dldFlame)
F.push(m); });
LD.dldFl = F.slice(0, 400);
var Ms = [];
LD.g.traverse(function (m) { if (m.userData && m.userData.dldMist)
Ms.push(m); });
LD.dldMist = Ms;
LD.dldFogK = 1;
}
}
catch (e) { } }, 2500);
},
function (i) {
var S = dldMS(), M = DLD_MICT[i];
if (i < S.s) {
dldCard(M.t, "You have been here. " + (S.s < DLD_MICT.length ? "Next: <b>" + DLD_MICT[S.s].n + "</b>." : ""));
return;
}
if (i > S.s) {
dldCard(M.n, i === 0 ? "" : "Not yet. The road to Mictlán goes in order: next is <b>" + DLD_MICT[S.s].n + "</b>" + (S.s === 0 ? ", by the bridge over the river" : "") + ".");
return;
}
if (typeof worldCard !== "function" || typeof worldBtn !== "function") {
dldCard(M.t, M.b);
return;
}
var h = "<div style='font:600 17px Georgia;margin-bottom:4px'>" + esc(M.t) + "</div><div style='font-size:13px;opacity:.7'>The Road to Mictlán · " + (i + 1) + " of " + DLD_MICT.length + "</div><p>" + M.b + "</p><p><b>" + esc(M.q) + "</b></p>", fns = {};
M.a.forEach(function (a, k) {
h += worldBtn("a" + k, a, "");
fns["a" + k] = function () {
if (k !== M.r) {
setStatus("🐕 The xolo tilts his head. Not that: think again.");
return;
}
worldCard(null);
S.s = i + 1;
if (S.s >= DLD_MICT.length) {
S.done = 1;
S.n = (S.n || 0) + 1;
S.s = 0;
}
try {
if (typeof save === "function")
save();
}
catch (e) { }
setStatus((S.done && S.s === 0 ? "" : "🐕 ") + M.y + (S.s > 0 && S.s < DLD_MICT.length ? " Next: <b>" + DLD_MICT[S.s].n + "</b>." : ""));
if (typeof playTone === "function")
playTone(660, 0.12);
};
});
worldCard(h, fns);
},
function (g, k) {
var R = ldRand(k.length * 17), st = dldM(0x6A5A4A, "stone");
if (k === "xolo" || k === "ford") {
var dog = new THREE.Group();
dog.position.set(k === "xolo" ? 1.5 : 0, 0, 0);
g.add(dog);
var sk = dldM(0x3A3436);
var b = dldSph(dog, 0.32, sk, 0, 0.5, 0, 10);
b.scale.set(1, 0.8, 1.6);
dldSph(dog, 0.18, sk, 0, 0.72, 0.5, 8);
var sn = dldSph(dog, 0.09, sk, 0, 0.68, 0.68, 6);
sn.scale.z = 1.6;
[[-0.12, 0.86, 0.48], [0.12, 0.86, 0.48]].forEach(function (e) { var ea = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 4), sk); ea.position.set(e[0], e[1], e[2]); dog.add(ea); });
[[-0.15, 0.3], [0.15, 0.3], [-0.15, -0.3], [0.15, -0.3]].forEach(function (l) { dldCyl(dog, 0.04, 0.04, 0.4, sk, l[0], 0.2, l[1], 5); });
var tl = dldCyl(dog, 0.03, 0.02, 0.45, sk, 0, 0.62, -0.6, 5);
tl.rotation.x = -0.8;
if (k === "ford")
for (var s = 0; s < 8; s++)
dldSph(g, 0.5 + R() * 0.4, st, -4 + s * 1.2, 0.1, (R() - 0.5) * 3, 6);
return true;
}
if (k === "mountains") {
[-1, 1].forEach(function (s) { var m = new THREE.Mesh(new THREE.ConeGeometry(14, 30, 7), dldM(0x5A4A3E, "stone")); m.position.set(s * 15.5, 15, 0); m.rotation.z = s * 0.18; g.add(m); });
return;
}
if (k === "obsidian") {
var ob = dldM(0x0E0C12, null, { e: 0x2A2440, ei: 0.4 });
var hill = dldSph(g, 10, dldM(0x1A161E, "stone"), 0, -4, 0, 12);
hill.scale.y = 0.7;
for (var i = 0; i < 16; i++) {
var c = new THREE.Mesh(new THREE.ConeGeometry(0.6 + R() * 0.8, 2 + R() * 4, 4), ob);
var a = R() * 6.28, d = 2 + R() * 8;
c.position.set(Math.cos(a) * d, 2 + R() * 2, Math.sin(a) * d);
c.rotation.set((R() - 0.5) * 0.6, R() * 6, (R() - 0.5) * 0.6);
g.add(c);
}
return;
}
if (k === "snow") {
var sn2 = new THREE.Mesh(new THREE.CircleGeometry(16, 24), dldM(0xE8ECF4));
sn2.rotation.x = -Math.PI / 2;
sn2.position.y = 0.06;
g.add(sn2);
for (var j = 0; j < 10; j++) {
var dr = dldSph(g, 1 + R() * 1.6, dldM(0xF0F4FA), (R() - 0.5) * 24, 0, (R() - 0.5) * 24, 8);
dr.scale.y = 0.35;
}
return;
}
if (k === "flags") {
var cl = [0xE8E0D0, 0xC83A3A, 0x3A6AC8, 0xE8B020, 0x6A3A8A];
for (var f = 0; f < 9; f++) {
var x = (f % 3 - 1) * 6, z = (Math.floor(f / 3) - 1) * 6;
dldCyl(g, 0.08, 0.1, 8, dldM(0x4A3A2A, "wood"), x, 4, z, 6);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 3.6), dldM(cl[f % 5], null, { side: 1 }));
fl.position.set(x + 0.7, 6, z);
g.add(fl);
}
return;
}
if (k === "arrows") {
var sh = dldM(0x6A4A2A, "wood"), ft = dldM(0xE8E0D0);
for (var r = 0; r < (dldLite() ? 20 : 44); r++) {
var ar = new THREE.Group();
ar.position.set((R() - 0.5) * 20, 0, (R() - 0.5) * 20);
ar.rotation.set((R() - 0.5) * 0.5, R() * 6, (R() - 0.5) * 0.5);
g.add(ar);
dldCyl(ar, 0.02, 0.02, 1.2, sh, 0, 0.5, 0, 4);
dldBox(ar, 0.12, 0.18, 0.01, ft, 0, 1.0, 0);
}
return;
}
if (k === "jaguars") {
var jg = dldM(0xC8902A, "stone");
[[-4, 0.4], [4, -0.4], [0, 3.14]].forEach(function (p) {
var J = new THREE.Group();
J.position.set(p[0], 0, p[0] === 0 ? -5 : 0);
J.rotation.y = p[1];
g.add(J);
var b = dldSph(J, 0.7, jg, 0, 0.9, 0, 10);
b.scale.set(0.8, 0.8, 1.8);
dldSph(J, 0.45, jg, 0, 1.3, 1.2, 10);
[[-0.35, 0.6], [0.35, 0.6], [-0.35, -0.7], [0.35, -0.7]].forEach(function (l) { dldCyl(J, 0.12, 0.12, 0.9, jg, l[0], 0.45, l[1], 6); });
var ey = dldBox(J, 0.4, 0.08, 0.05, dldG(0x8AE84A), 0, 1.4, 1.62);
});
return;
}
if (k === "mist") {
var w = new THREE.Mesh(new THREE.PlaneGeometry(8, 30), dldM(0x1A2A34, null, { op: 0.9 }));
w.rotation.x = -Math.PI / 2;
w.position.y = 0.08;
g.add(w);
[-1, 1].forEach(function (s) { var cl2 = dldBox(g, 3, 5, 30, dldM(0x4A4440, "stone"), s * 5.6, 2.5, 0); });
for (var m = 0; m < (dldLite() ? 4 : 10); m++) {
var ms = dldSph(g, 2.4 + R() * 1.6, dldG(0xD8E0E8, 0.18), (R() - 0.5) * 6, 1.2 + R() * 1.4, (R() - 0.5) * 26, 8);
ms.scale.y = 0.5;
}
return;
}
if (k === "temple") {
var tst = dldM(0x4A4440, "stone"), red = dldM(0x8A2A1E);
for (var t = 0; t < 4; t++)
dldBox(g, 22 - t * 4.4, 2.6, 22 - t * 4.4, tst, 0, 1.3 + t * 2.6, 0);
dldBox(g, 4, 10.4, 10, tst, 0, 5.2, 10);
for (var st2 = 0; st2 < 12; st2++)
dldBox(g, 3.6, 0.3, 0.8, dldM(0x6A6058, "stone"), 0, 0.15 + st2 * 0.86, 15.5 - st2 * 0.75);
dldBox(g, 7, 4, 6, red, 0, 12.4, 0);
dldBox(g, 7.6, 0.6, 6.6, tst, 0, 14.7, 0);
dldBox(g, 1.8, 2.6, 0.1, dldM(0x0A0808), 0, 11.7, 3.05);
for (var sk2 = 0; sk2 < 10; sk2++)
dldSph(g, 0.28, dldM(0xE8E0D0), -3.2 + sk2 * 0.7, 10.9, 3.1, 8);
[[-1.8, 1], [1.8, 1]].forEach(function (p, i2) {
var L = new THREE.Group();
L.position.set(p[0], 10.4, 4.4);
g.add(L);
dldCyl(L, 0.35, 0.45, 1.4, dldM(i2 ? 0x8A2A3A : 0x2A2A2A), 0, 0.7, 0, 8);
dldSph(L, 0.3, dldM(0xE8E0D0), 0, 1.7, 0, 10);
if (i2)
for (var fl2 = 0; fl2 < 6; fl2++)
dldSph(L, 0.08, dldM(0xF08A10), Math.cos(fl2) * 0.3, 2.0, Math.sin(fl2) * 0.3, 5);
});
[-2.2, 2.2].forEach(function (x) { var al = dldBox(g, 0.6, 1.2, 13, red, x, 5.2, 9.6); al.rotation.x = 0.67; });
for (var br = 0; br < 4; br++) {
var bx = [-8, 8, -8, 8][br], bz = [-8, -8, 8, 8][br];
dldCyl(g, 0.7, 0.4, 1, dldM(0x3A3430, "stone"), bx, 11, bz, 10);
var fl = dldSph(g, 0.6, dldG(0xFF9A3A), bx, 11.8, bz, 8);
fl.scale.y = 1.5;
fl.userData.dldFlame = 1;
}
for (var bn = 0; bn < 6; bn++) {
var a2 = bn / 6 * Math.PI * 2;
dldCyl(g, 0.08, 0.08, 6, dldM(0x3A2A1A, "wood"), Math.cos(a2) * 14, 3, Math.sin(a2) * 14, 6);
var fb = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 3), dldM([0xE8E0D0, 0x8A2A3A, 0xF08A10][bn % 3], null, { side: 1 }));
fb.position.set(Math.cos(a2) * 14 + 0.7, 4.6, Math.sin(a2) * 14);
g.add(fb);
}
for (var mg = 0; mg < 30; mg++) {
var mx = (R() - 0.5) * 26, mz = 14 + R() * 6;
dldSph(g, 0.2, dldM(mg % 2 ? 0xF08A10 : 0xE8B020), mx, 0.2, mz, 5);
}
return;
}
},
function (P) {
var L = DLD_L;
DLD_MICT.forEach(function (M, i) {
if (M.scene) {
var big = /mountains|obsidian|temple/.test(M.scene), off = M.scene === "mountains" ? 0 : M.scene === "temple" ? -14 : big ? -12 : 0;
var it = P.make(M.x, M.z + off, M.scene === "temple" ? Math.PI * 0.25 : 0, big ? 16 : 6, function (g) { return dldMictScene(g, M.scene); }, M.scene === "temple" ? { hw: 11, hd: 11, h: 10 } : M.scene === "obsidian" ? { r: 8, h: 6 } : null);
if (M.scene === "mountains") {
[-1, 1].forEach(function (s) { P.make(M.x + s * 15.5, M.z, 0, 1, function () { }, { r: 11, h: 20 }); });
}
}
dpxDo(P, M.x, M.z + (M.scene === "temple" ? 2 : 0), M.scene === "temple" ? 6 : 4, M.n, i === 0 ? "start the road to Mictlán" : i === DLD_MICT.length - 1 ? "lay down the marigold" : "go on", function () { dldMictUse(i); });
});
P.person("dld_sp_friar2", -128, -44, Math.PI * 1.4, { sex: "m", dldGhost: 1, look: { top: 0x5A4A3A, topKind: "robe", bottom: 0x5A4A3A, shoes: 0x2A2A2A, skin: 0xD8D0C8, hair: 0x8A8A8A, hairStyle: "short" } }, ldWho("Fray Bernardino, by the river", L, "Fray Bernardino de Sahagún, the Spanish friar who wrote down the old Mexica teachings of the road to Mictlán in the Florentine Codex in the 1570s; a gentle old scholar, now a spirit", "The xolo by the bridge will take you, if you ask him. Nine places, the old men told me: the river, the meeting mountains, the obsidian hill, the wind of knives, the flags, the arrows, the jaguars, the narrow waters, and Mictlán. Go gently."));
}
];
});
