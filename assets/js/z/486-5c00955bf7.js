/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(486, function () {
"use strict";
return [
function (kind, col, o) {
o = o || {};
var key = "s:" + kind + ":" + col + ":" + (o.e || 0);
if (CTC.mats[key])
return CTC.mats[key];
var m = new THREE.MeshLambertMaterial({ color: col });
var t = typeof texOf === "function" && (typeof landOpt !== "function" || landOpt("detail")) ? texOf(kind) : null;
if (t)
m.map = t;
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.4;
}
return (CTC.mats[key] = m);
},
function (col, o) {
o = o || {};
var key = "f:" + col + ":" + (o.e || "") + ":" + (o.op || "") + ":" + (o.ds ? 1 : 0);
if (CTC.mats[key])
return CTC.mats[key];
var m = new THREE.MeshLambertMaterial({ color: col });
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
return (CTC.mats[key] = m);
},
function (kind) {
if (CTC.tex[kind])
return CTC.tex[kind];
var N = 256, mk = function (fn) { var c = document.createElement("canvas"); c.width = c.height = N; var x = c.getContext("2d"); fn(x); var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t; };
var R = ldRand(kind.length * 977 + 31), cols = kind === "pod" ? 2 : 4, rows = kind === "pod" ? 1 : 4, mw = kind === "fin" ? 10 : 5, sl = kind === "fin" ? 4 : 14, lit = [];
var map = mk(function (x) {
var g = x.createLinearGradient(0, 0, 0, N);
g.addColorStop(0, "#C8DCEA");
g.addColorStop(1, "#7E98AC");
x.fillStyle = g;
x.fillRect(0, 0, N, N);
for (var j = 0; j < rows; j++)
for (var i = 0; i < cols; i++) {
var v = R(), w = N / cols, h = N / rows, px = i * w, py = j * h;
var gg = x.createLinearGradient(px, py, px + w, py + h);
var a = 0.82 + v * 0.18;
gg.addColorStop(0, "rgba(" + Math.round(150 * a) + "," + Math.round(186 * a) + "," + Math.round(206 * a) + ",1)");
gg.addColorStop(1, "rgba(" + Math.round(96 * a) + "," + Math.round(124 * a) + "," + Math.round(146 * a) + ",1)");
x.fillStyle = gg;
x.fillRect(px, py, w, h);
if (v > 0.7) {
x.fillStyle = "rgba(230,226,214,0.55)";
x.fillRect(px + 4, py + 4, w - 8, (h - sl) * 0.35);
}
if (v < 0.12) {
x.fillStyle = "rgba(70,110,60,0.55)";
x.beginPath();
x.arc(px + w * 0.3, py + h - sl - 10, 9, 0, 7);
x.fill();
}
lit.push(R() < 0.55);
}
x.fillStyle = "#E8ECEE";
for (var r = 0; r < rows; r++)
x.fillRect(0, (r + 1) * N / rows - sl, N, sl);
x.fillStyle = "#A8B2BA";
for (var c = 0; c <= cols; c++)
x.fillRect(c * N / cols - mw / 2, 0, mw, N);
x.fillStyle = "rgba(255,255,255,0.18)";
x.beginPath();
x.moveTo(N * 0.1, 0);
x.lineTo(N * 0.35, 0);
x.lineTo(N * 0.05, N);
x.lineTo(-N * 0.2, N);
x.fill();
});
var em = mk(function (x) {
x.fillStyle = "#000";
x.fillRect(0, 0, N, N);
var k = 0;
for (var j = 0; j < rows; j++)
for (var i = 0; i < cols; i++) {
var w = N / cols, h = N / rows;
if (lit[k++]) {
var warm = R();
x.fillStyle = warm < 0.6 ? "#FFE2B0" : warm < 0.85 ? "#F4F4FF" : "#FFD090";
x.fillRect(i * w + mw, j * h + 3, w - mw * 2, h - sl - 6);
}
}
});
ctcSRGB(map);
ctcSRGB(em);
return (CTC.tex[kind] = { map: map, em: em, mw: kind === "pod" ? 3 : kind === "fin" ? 4.8 : 6, mh: kind === "pod" ? 2.6 : kind === "fin" ? 7.6 : 14.4 });
},
function (tint, kind) {
kind = kind || "wall";
var key = "glass:" + kind + ":" + tint;
if (CTC.mats[key])
return CTC.mats[key];
var T = ctcCurtainTex(kind), m = new THREE.MeshLambertMaterial({ color: tint, map: T.map, emissiveMap: T.em, emissive: new THREE.Color(0xFFFFFF), emissiveIntensity: 0 });
m.userData.ctcNight = 1;
m.userData.ctcGlass = 1;
m.userData.ctcMod = [T.mw, T.mh];
return (CTC.mats[key] = m);
},
function (col) {
var key = "lat:" + col;
if (CTC.mats[key])
return CTC.mats[key];
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.clearRect(0, 0, 128, 128);
x.strokeStyle = "#ffffff";
x.lineWidth = 5;
x.beginPath();
x.moveTo(0, 0);
x.lineTo(128, 0);
x.moveTo(0, 64);
x.lineTo(128, 64);
x.moveTo(0, 128);
x.lineTo(128, 128);
x.moveTo(0, 0);
x.lineTo(64, 64);
x.lineTo(128, 0);
x.moveTo(0, 128);
x.lineTo(64, 64);
x.lineTo(128, 128);
x.moveTo(0, 64);
x.lineTo(0, 0);
x.stroke();
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(24, 8);
var m = new THREE.MeshLambertMaterial({ color: col, map: t, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
return (CTC.mats[key] = m);
},
function (G, x0, z0, w, d, y, n, seed, col) {
var R = ldRand(seed || 5), soil = ctcSurf("earth", 0x5A4432), lm = ctcLeafMat(col || 0x4E8A3A), lm2 = ctcLeafMat(0x6A9A3E), fl = ctcFlat(0xE86A8A);
ctcBox(G, w, 0.12, d, soil, x0, y + 0.06, z0);
for (var i = 0; i < n; i++) {
var r = 0.35 + R() * 0.5, g = new THREE.IcosahedronGeometry(r, 1);
var s = ctcMesh(G, g, R() < 0.6 ? lm : lm2, x0 + (R() - 0.5) * (w - r), y + r * 0.75, z0 + (R() - 0.5) * (d - r));
s.scale.y = 0.8;
if (R() < 0.3) {
var f = ctcMesh(G, new THREE.IcosahedronGeometry(0.12, 0), R() < 0.5 ? fl : ctcFlat(0xF2E070), s.position.x, s.position.y + r * 0.6, s.position.z);
f.castShadow = false;
}
}
},
function (G, x, z, s, kind) {
if (typeof build !== "function")
return null;
var t = build({ id: "ctc_tree_" + Math.round(x) + "_" + Math.round(z), archetype: kind || "tree", label: null, attrs: { s: s || 1 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
t.position.set(x, 0, z);
t.rotation.y = (x * 13.7 + z * 7.1) % 6.28;
G.add(t);
return t;
},
function (G, kind, h, w, tint, seed) {
var R = ldRand(seed || 7), slab = ctcSurf("concrete", 0xE6E8EA), fl = 3.6, n = Math.max(4, Math.round(h / fl)), lite = ctcLite();
var gl = ctcGlass(tint || 0xB8CCD8, kind === "fin" ? "fin" : "wall");
if (kind === "twist") {
var step = lite ? 3 : 1, turn = (0.6 + R() * 0.5) / n;
for (var i = 0; i < n; i += step) {
var y = i * fl, hh = fl * step;
var m = ctcBox(G, w, hh - 0.25, w, gl, 0, y + hh / 2, 0, i * turn);
ctcBox(G, w + 0.5, 0.28, w + 0.5, slab, 0, y + hh - 0.12, 0, i * turn);
}
ctcBox(G, w * 0.7, 3, w * 0.7, slab, 0, n * fl + 1.5, 0, n * turn);
ctcCyl(G, 0.15, 0.3, 10, ctcFlat(0xD8DCE0), 0, n * fl + 8, 0, 6);
return { r: w * 0.75 };
}
if (kind === "taper") {
var r0 = w * 0.6, r1 = w * 0.32;
ctcCyl(G, r1, r0, h, gl, 0, h / 2, 0, 28);
for (var j = 1; j < n; j += (lite ? 4 : 2)) {
var t = j / n, r = r0 + (r1 - r0) * t;
ctcCyl(G, r + 0.35, r + 0.35, 0.3, slab, 0, j * fl, 0, 28);
}
ctcCyl(G, r1 * 0.9, r1, 4, slab, 0, h + 2, 0, 28);
ctcCyl(G, 0.1, r1 * 0.5, 16, ctcFlat(0xE8ECEE), 0, h + 12, 0, 10);
return { r: r0 };
}
if (kind === "setback") {
var tiers = 3, hw = w, y0 = 0;
for (var k = 0; k < tiers; k++) {
var th = h * [0.45, 0.33, 0.22][k];
ctcBox(G, hw, th, hw, gl, 0, y0 + th / 2, 0);
ctcBox(G, hw + 0.6, 0.4, hw + 0.6, slab, 0, y0 + th, 0);
if (k < tiers - 1) {
var nw = hw * 0.72, e = (hw - nw) / 2;
[[0, (hw - e) / 2], [0, -(hw - e) / 2], [(hw - e) / 2, 0], [-(hw - e) / 2, 0]].forEach(function (p, q) {
ctcShrubs(G, p[0], p[1], q < 2 ? hw - 1 : e - 1, q < 2 ? e - 1 : hw - 1, y0 + th + 0.2, lite ? 3 : 8, seed * 7 + k * 4 + q, 0x4A8A3A);
});
ctcRail(G, hw, 0, y0 + th + 0.2, hw / 2 - 0.1, 0);
}
y0 += th;
hw *= 0.72;
}
ctcCyl(G, 0.12, 0.25, 8, ctcFlat(0xD8DCE0), 0, y0 + 4, 0, 6);
return { r: w * 0.75 };
}
if (kind === "fin") {
var d = w * 0.45;
ctcBox(G, w, h, d, gl, 0, h / 2, 0);
var fm = ctcSurf("concrete", 0xF2F2EE);
for (var f = 0; f <= (lite ? 4 : 10); f++) {
var fx = -w / 2 + f * w / (lite ? 4 : 10);
ctcBox(G, 0.35, h + 2, 1.4, fm, fx, (h + 2) / 2, d / 2 + 0.5);
ctcBox(G, 0.35, h + 2, 1.4, fm, fx, (h + 2) / 2, -d / 2 - 0.5);
}
ctcBox(G, w + 1, 1.2, d + 3.2, fm, 0, h + 1.6, 0);
return { hw: w / 2 + 0.6, hd: d / 2 + 1.3 };
}
if (kind === "round") {
var rr = w * 0.5;
ctcCyl(G, rr, rr, h, gl, 0, h / 2, 0, 32);
var bm = ctcSurf("concrete", 0xEEEEEA);
for (var b = 1; b < n; b += (lite ? 5 : 3)) {
ctcCyl(G, rr + 1.6, rr + 1.6, 0.35, bm, 0, b * fl, 0, 32);
if (!lite) {
var lm = ctcLeafMat(0x4E8A3A);
for (var p = 0; p < 10; p++) {
var a = p / 10 * Math.PI * 2 + b;
var s = ctcMesh(G, new THREE.IcosahedronGeometry(0.55, 1), lm, Math.cos(a) * (rr + 1.1), b * fl + 0.5, Math.sin(a) * (rr + 1.1));
s.scale.y = 0.7;
}
}
}
ctcCyl(G, rr * 0.7, rr, 3, bm, 0, h + 1.5, 0, 32);
return { r: rr + 1.6 };
}
var sw = w * 0.42, gap = w * 0.3;
[-1, 1].forEach(function (s) { ctcBox(G, sw, h * (s < 0 ? 1 : 0.86), sw, gl, s * (sw / 2 + gap / 2), h * (s < 0 ? 1 : 0.86) / 2, 0); ctcBox(G, sw + 0.4, 0.6, sw + 0.4, slab, s * (sw / 2 + gap / 2), h * (s < 0 ? 1 : 0.86), 0); });
ctcBox(G, gap + 1, 4, sw * 0.6, gl, 0, h * 0.62, 0);
ctcBox(G, gap + 1.4, 0.4, sw * 0.6 + 0.6, slab, 0, h * 0.62 - 2.1, 0);
return { hw: w / 2 + 0.4, hd: sw / 2 + 0.4 };
},
function (G, h, r, seed) {
var lite = ctcLite(), core = ctcGlass(0xB0CAD4, "wall"), slab = ctcSurf("concrete", 0xEDEDE8), lm = ctcLeafMat(0x4A8C3A), lm2 = ctcLeafMat(0x6AA040);
var rc = r * 0.42;
ctcCyl(G, rc, rc, h, core, 0, h / 2, 0, 28);
var turns = Math.max(3, Math.round(h / 22)), segs = turns * (lite ? 10 : 18), rise = h / segs, R = ldRand(seed || 3);
for (var i = 0; i < segs; i++) {
var a = i / segs * turns * Math.PI * 2, y = i * rise + 2, mid = (rc + r) / 2, len = (r - rc) + 0.4, arc = 2 * Math.PI * mid / (segs / turns) + 0.6;
var p = new THREE.Group();
p.position.set(0, y, 0);
p.rotation.y = -a;
G.add(p);
ctcBox(p, arc, 0.5, len, slab, 0, 0, mid);
ctcBox(p, arc, 0.18, len - 1.2, ctcSurf("grass", 0x5E8A3E), 0, 0.32, mid - 0.2);
ctcBox(p, arc, 0.9, 0.05, ctcClear(0xD8EEF4, 0.3), 0, 0.8, r + 0.15);
if (i % (lite ? 2 : 1) === 0) {
var s = ctcMesh(p, new THREE.IcosahedronGeometry(0.7 + R() * 0.6, 1), R() < 0.5 ? lm : lm2, (R() - 0.5) * arc * 0.6, 1.2, mid + (R() - 0.5) * len * 0.4);
s.scale.y = 1.2;
}
if (!lite && i % 3 === 0) {
ctcCyl(p, 0.1, 0.14, 2.2, ctcSurf("bark", 0x6A5440), 0, 1.4, mid, 6);
var c = ctcMesh(p, new THREE.IcosahedronGeometry(1.3, 1), lm, 0, 3.1, mid);
c.scale.y = 0.9;
}
}
ctcCyl(G, rc + 1, rc, 3, slab, 0, h + 1.5, 0, 28);
if (!lite) {
for (var k = 0; k < 6; k++) {
var aa = k / 6 * Math.PI * 2;
var t = ctcMesh(G, new THREE.IcosahedronGeometry(1.5, 1), lm, Math.cos(aa) * rc * 0.6, h + 4, Math.sin(aa) * rc * 0.6);
t.scale.y = 1.1;
}
}
return { r: r + 0.5 };
},
function (G, w, tiers, seed) {
var lite = ctcLite(), gl = ctcGlass(0xC4D4CC, "wall"), slab = ctcSurf("concrete", 0xEAE6DC), y = 0, s = w, th = 5.2, R = ldRand(seed || 11);
for (var k = 0; k < tiers; k++) {
ctcBox(G, s, th, s, gl, 0, y + th / 2, 0);
ctcBox(G, s + 0.8, 0.5, s + 0.8, slab, 0, y + th, 0);
var ns = s - 7;
if (ns < 8)
ns = 8;
if (k < tiers - 1) {
var e = (s - ns) / 2;
[[0, (s - e) / 2, s, e], [0, -(s - e) / 2, s, e], [(s - e) / 2, 0, e, ns], [-(s - e) / 2, 0, e, ns]].forEach(function (q, qi) {
ctcShrubs(G, q[0], q[1], q[2] - 1.2, q[3] - 1.2, y + th + 0.25, lite ? 4 : Math.round((q[2] + q[3]) / 3), seed * 31 + k * 7 + qi, 0x4C8A3C);
});
ctcRail(G, s, 0, y + th + 0.25, s / 2, 0);
ctcRail(G, s, 0, y + th + 0.25, -s / 2, 0);
ctcRail(G, s, s / 2, y + th + 0.25, 0, Math.PI / 2);
ctcRail(G, s, -s / 2, y + th + 0.25, 0, Math.PI / 2);
}
y += th;
s = ns;
}
ctcCyl(G, s * 0.3, s * 0.4, 3, slab, 0, y + 1.5, 0, 16);
var water = ctcFlat(0xBFE4F0, { op: 0.62, ds: 1, e: 0x204858, ei: 0.3 });
var wf = new THREE.Mesh(new THREE.PlaneGeometry(3.2, y), water);
wf.position.set(w * 0.18, y / 2, w / 2 + 0.6);
G.add(wf);
var fall = new THREE.Group();
fall.position.set(w * 0.18, 0, w / 2 + 0.7);
G.add(fall);
fall.userData.ldKeep = 1;
ctcBox(G, 8, 0.6, 5, slab, w * 0.18, 0.3, w / 2 + 3);
ctcBox(G, 7.4, 0.1, 4.4, ctcFlat(0x6AA8C0, { e: 0x0A2A3A, ei: 0.4 }), w * 0.18, 0.62, w / 2 + 3);
return { hw: w / 2 + 0.4, hd: w / 2 + 0.4, fallY: y };
},
function (G, r, tint) {
var g = new THREE.SphereGeometry(r, ctcLite() ? 20 : 32, ctcLite() ? 10 : 16, 0, Math.PI * 2, 0, Math.PI / 2);
var skin = new THREE.Mesh(g, ctcClear(tint || 0xCCE6F2, 0.3));
G.add(skin);
var lat = new THREE.Mesh(new THREE.SphereGeometry(r + 0.05, ctcLite() ? 20 : 32, ctcLite() ? 10 : 16, 0, Math.PI * 2, 0, Math.PI / 2), ctcLatticeMat(0xF2F4F4));
G.add(lat);
ctcCyl(G, r + 0.6, r + 0.8, 1.2, ctcSurf("concrete", 0xE6E6E0), 0, 0.6, 0, 40);
var ent = new THREE.Group();
ent.position.set(0, 0, r - 1);
G.add(ent);
var vg = new THREE.CylinderGeometry(2.6, 2.6, 5, 16, 1, true, 0, Math.PI);
var v = new THREE.Mesh(vg, ctcClear(tint || 0xCCE6F2, 0.4));
v.rotation.z = Math.PI / 2;
v.rotation.y = Math.PI / 2;
v.position.set(0, 0, 1.5);
ent.add(v);
ctcBox(ent, 5.6, 0.3, 5, ctcSurf("concrete", 0xE6E6E0), 0, 0.15, 1.5);
return { r: r + 0.8 };
},
function (G, h, r, col) {
var sh = ctcSurf("plaster", col || 0xF2F0EA), st = ctcSurf("concrete", 0xDADCDC);
ctcCyl(G, 0.5, 1.1, h, st, 0, h / 2, 0, 14);
ctcCyl(G, 1.6, 1.6, 0.4, st, 0, 0.2, 0, 18);
var pod = ctcMesh(G, new THREE.SphereGeometry(r, ctcLite() ? 16 : 26, ctcLite() ? 10 : 16), sh, 0, h + r * 0.7, 0);
pod.scale.y = 0.7;
ctcCyl(G, r * 1.0, r * 1.0, r * 0.42, ctcGlass(0xB4CCD8, "pod"), 0, h + r * 0.72, 0, ctcLite() ? 16 : 26, true);
ctcCyl(G, r + 1.3, r + 1.3, 0.22, st, 0, h + r * 0.32, 0, 26);
var tube = ctcCyl(G, 0.9, 0.9, h, ctcClear(0xD4EAF2, 0.25), 1.5, h / 2, 0, 12, true);
return { r: 2.2 };
},
function (len, lead) {
var g = new THREE.Group(), body = ctcSurf("metal", 0xF4F6F8), win = ctcGlass(0x5A7488, "pod"), stripe = ctcFlat(0x2A7ACA, { e: 0x0A2A50, ei: 0.4 });
ctcBox(g, 2.9, 2.6, len, body, 0, 1.6, 0);
ctcBox(g, 2.95, 0.9, len - 1, win, 0, 2.0, 0);
ctcBox(g, 2.96, 0.18, len, stripe, 0, 1.2, 0);
if (lead) {
var n = ctcMesh(g, new THREE.SphereGeometry(1.45, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), body, 0, 1.6, len / 2);
n.rotation.x = Math.PI / 2;
n.scale.set(1, 2.2, 0.9);
var w = ctcMesh(g, new THREE.SphereGeometry(1.0, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), ctcFlat(0x2A3A4A), 0, 2.2, len / 2 + 1.1);
w.rotation.x = Math.PI / 2;
w.scale.set(1, 1.4, 0.5);
}
return g;
},
function () {
var g = new THREE.Group(), env = ctcSurf("plaster", 0xF0EEE6), trim = ctcFlat(0x2A5A8A);
var e = ctcMesh(g, new THREE.SphereGeometry(6, 28, 16), env, 0, 0, 0);
e.scale.set(1, 1, 4.2);
for (var i = 0; i < 4; i++) {
var f = ctcBox(g, 0.3, 5, 6, trim, 0, 0, -21);
f.rotation.z = i * Math.PI / 2;
f.position.set(Math.sin(i * Math.PI / 2) * 3.2, Math.cos(i * Math.PI / 2) * 3.2, -21);
}
ctcBox(g, 3.2, 2.4, 10, ctcSurf("metal", 0xE8E8EC), 0, -7.2, 2);
ctcBox(g, 3.25, 1, 9, ctcGlass(0x6A8494, "pod"), 0, -7, 2);
ctcBox(g, 12.2, 0.6, 0.3, trim, 0, 0, 6.1);
return g;
},
function (G, h) {
var st = ctcSurf("metal", 0xE8EAEC);
ctcCyl(G, 0.35, 0.6, h, st, 0, h / 2, 0, 10);
var rot = new THREE.Group();
rot.position.y = h;
G.add(rot);
for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2;
for (var s = 0; s < 6; s++) {
var y = s * 1.4, aa = a + s * 0.18;
var b = ctcBox(rot, 0.25, 1.5, 1.4, ctcFlat(0xF6F6F4), Math.cos(aa) * 2.4, y + 0.7, Math.sin(aa) * 2.4);
b.rotation.y = -aa;
}
}
[0.2, 8.4].forEach(function (y) { for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2;
var arm = ctcBox(rot, 2.4, 0.15, 0.15, st, Math.cos(a) * 1.2, y, Math.sin(a) * 1.2);
arm.rotation.y = -a;
} });
return rot;
},
function (G, h) {
var st = ctcSurf("metal", 0xD8DCE0), pan = ctcSurf("glass", 0x1E2E4E, { e: 0x0A1020, ei: 0.2 });
var pm = pan;
ctcCyl(G, 0.18, 0.3, h, st, 0, h / 2, 0, 8);
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2, r = i ? 2.2 : 0, y = h + (i ? -0.6 : 0.4);
var b = ctcBox(G, 0.1, 0.1, r || 0.1, st, Math.cos(a) * r / 2, y - 0.2, Math.sin(a) * r / 2);
b.rotation.y = -a + Math.PI / 2;
var p = ctcBox(G, 2.4, 0.08, 1.6, pm, Math.cos(a) * r, y, Math.sin(a) * r, -a);
p.rotation.x = 0.22;
}
},
function () {
if (typeof EVB === "undefined" || !EVB.doors || typeof LD === "undefined")
return;
EVB.doors = EVB.doors.filter(function (q) { return !(q.spec && q.spec.ctc); });
CTC_DOORS.forEach(function (D, i) {
if (typeof PLANS === "undefined" || !PLANS[D.arch])
return;
var X = LD.ox + D.x, Z = LD.oz + D.z, s = Math.sin(D.rot), c = Math.cos(D.rot);
var spec = { id: "ctc_door_" + i + "_" + D.arch, archetype: D.arch, attrs: {}, x: X - s * 4, z: Z - c * 4, rot: D.rot, realm: store.here || 0, label: D.name, inside: {}, ctc: 1,
evb: { theme: null, src: "ld", land: LD.kind }, evbDoor: { x: X, z: Z, out: { x: s, z: c } } };
EVB.doors.push({ spec: spec, src: "ld", info: { theme: null, name: D.name, doors: D.doors } });
});
},
function (P) {
var L = CTC_L, lite = P.lite, R = ldRand(4471);
CTC_DOORS.length = 0;
P.make(0, -140, 0, 0.5, function (G) {
var pav = ctcSurf("paving", 0xD6D2CA), lawn = ctcSurf("grass", 0x7AA05A), av = ctcSurf("asphalt", 0x5A5E66), kerb = ctcSurf("concrete", 0xE8E6E0);
var put = function (w, d, mat, x, z, y, us) {
var g = new THREE.PlaneGeometry(w, d);
if (typeof metreUVs === "function")
metreUVs(g, "pln", [w, d]);
if (us) {
var uv = g.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * us, uv.getY(i) * us);
uv.needsUpdate = true;
}
var m = new THREE.Mesh(g, mat);
m.rotation.x = -Math.PI / 2;
m.position.set(x, y || 0.02, z);
m.receiveShadow = true;
G.add(m);
return m;
};
put(560, 520, pav, 0, 0, 0.02, 2.6);
[[-110, 40, 90, 60], [110, 40, 90, 60], [-150, -90, 70, 70], [150, -80, 60, 70], [-200, 0, 40, 140], [200, 0, 40, 140]].forEach(function (q) { put(q[2], q[3], lawn, q[0], q[1], 0.04); });
put(560, 6, lawn, 0, -26, 0.04);
put(560, 6, lawn, 0, 6, 0.04);
put(10, 230, av, 0, -75, 0.03);
put(520, 10, av, 0, 80, 0.03);
put(1.2, 230, kerb, -5.6, -75, 0.05);
put(1.2, 230, kerb, 5.6, -75, 0.05);
}, null);
P.make(0, -150, 0, 1, function (G) {
var bank = ctcSurf("stone", 0xC8C2B6), water = new THREE.MeshLambertMaterial({ color: 0x4E8AA0, emissive: new THREE.Color(0x0A2A3A), emissiveIntensity: 0.35 });
water.userData.ctcGlass = 1;
water.userData.ctcWater = 1;
var w = new THREE.Mesh(new THREE.PlaneGeometry(560, 12), water);
w.rotation.x = -Math.PI / 2;
w.position.y = -0.5;
G.add(w);
[-1, 1].forEach(function (s) { ctcBox(G, 560, 1.1, 1.2, bank, 0, -0.1, s * 6.6); ctcBox(G, 560, 0.15, 1.6, ctcSurf("concrete", 0xE8E6E0), 0, 0.48, s * 6.6); });
ctcBox(G, 14, 0.5, 16, ctcSurf("concrete", 0xE6E4DE), 0, -0.2, 0);
[-1, 1].forEach(function (s) { ctcRail(G, 16, s * 6.8, 0, 0, Math.PI / 2); });
[-100, 100].forEach(function (x) {
ctcBox(G, 3.4, 0.3, 16, ctcSurf("wood", 0xC8A47A), x, -0.1, 0);
ctcRail(G, 16, x - 1.6, 0, 0, Math.PI / 2);
ctcRail(G, 16, x + 1.6, 0, 0, Math.PI / 2);
var a = new THREE.Mesh(new THREE.TorusGeometry(8.4, 0.18, 8, 32, Math.PI), ctcSurf("metal", 0xF2F4F4));
a.position.set(x, 0, 0);
a.rotation.y = Math.PI / 2;
G.add(a);
for (var k = -3; k <= 3; k++) {
var z = k * 2.2, h = Math.sqrt(Math.max(0, 8.4 * 8.4 - z * z));
[-1.6, 1.6].forEach(function (dx) { ctcCyl(G, 0.02, 0.02, h, ctcSurf("metal", 0xD8DCE0), x + dx * 0.05, h / 2, z, 4); });
}
});
}, null);
[[-190.9, 178.2], [-52.7, 91], [52.7, 91], [190.9, 178.2]].forEach(function (q) { P.make(q[0], -150, 0, 0.5, function () { }, { hw: q[1] / 2, hd: 6.6, h: 1.2 }); });
var at = function (fn, live) { P.make(0, -120, 0, 0.5, function (G0) { var G = new THREE.Group(); G.position.z = 120; G0.add(G); var r = fn(G); return live ? true : r; }); };
at(function (G) {
var spots = [];
for (var z = -96; z >= -320; z -= (lite ? 24 : 12)) {
if (Math.abs(z + 150) < 12)
continue;
spots.push([-8.5, z], [8.5, z]);
}
for (var x = -250; x <= 250; x += (lite ? 28 : 14)) {
if (Math.abs(x) < 44)
continue;
spots.push([x, -48.5], [x, -71.5]);
}
for (var x2 = -250; x2 <= 250; x2 += (lite ? 40 : 20)) {
if (Math.abs(x2) < 16 || Math.abs(x2 - 100) < 8 || Math.abs(x2 + 100) < 8)
continue;
spots.push([x2, -140]);
spots.push([x2, -160]);
}
spots.forEach(function (p, i) { ctcTree(G, p[0], p[1], 0.75 + ((i * 37) % 10) / 30, i % 5 === 4 ? "pine" : "tree"); });
for (var z3 = -96; z3 >= -320; z3 -= 24) {
if (Math.abs(z3 + 150) < 12)
continue;
[-8.5, 8.5].forEach(function (x3) { ctcTree(G, x3, z3 - 6, 0.55, "tree"); });
}
}, true);
at(function (G) {
for (var z = -96; z >= -320; z -= 24) {
if (Math.abs(z + 150) < 12)
continue;
[-8.5, 8.5].forEach(function (x) { var g = new THREE.Group(); g.position.set(x, 0, z - 6); g.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2; G.add(g); ctcPlanter(g, 1.1, false); });
}
for (var x = -240; x <= 240; x += 28) {
if (Math.abs(x) < 44)
continue;
[-46, -74].forEach(function (z) { var g = new THREE.Group(); g.position.set(x + 7, 0, z); g.rotation.y = z < -60 ? 0 : Math.PI; G.add(g); ctcLamp(g); });
}
for (var z2 = -108; z2 >= -320; z2 -= 24) {
if (Math.abs(z2 + 150) < 12)
continue;
[-7, 7].forEach(function (x2) { var g = new THREE.Group(); g.position.set(x2, 0, z2); g.rotation.y = x2 < 0 ? -Math.PI / 2 : Math.PI / 2; G.add(g); ctcLamp(g); });
}
});
P.k("tierfountain", 0, -60, 0, 1.2);
P.ring("bench", 6, 15, 0, -60, 1, { small: 1 }, 1, 0.4);
P.k("tramstop", 8, -14, Math.PI / 2, 1);
P.k("holosign", -14, -48, 0.6, 1);
P.k("holosign", 14, -74, -0.6, 1);
P.k("booth", 12, -86, -Math.PI / 2, 1);
at(function (G) {
G.position.z += -60;
var rail = ctcSurf("metal", 0x8A9098), bed = ctcSurf("concrete", 0xBEBAB2);
var ring = new THREE.Mesh(new THREE.RingGeometry(27.2, 28.8, 64), bed);
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.05;
G.add(ring);
[27.6, 28.4].forEach(function (r) { var t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.06, 4, 96), rail); t.rotation.x = Math.PI / 2; t.position.y = 0.1; G.add(t); });
});
at(function (G) { var g = new THREE.Group(); g.position.z = -60; G.add(g); g.userData.ctcTram = 1; if (typeof build === "function") {
var t = build({ id: "ctc_tram", archetype: "tram", attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
g.add(t);
} }, true);
P.make(-50, -24, Math.PI / 2, 13, function (G) { if (typeof ctcMuseum === "function")
ctcMuseum(G); }, { hw: 6.2, hd: 6, h: 12 });
P.sign(-38, -10, Math.PI / 2, ["The Museum of Time", "Press E to read"], ["The Museum of Time", "The Time Traveller's house, kept as he left it",
["This is the house at Richmond, in Surrey, where H. G. Wells's Time Traveller lived in the 1890s, kept under glass by the city.", "Its door opens on the evening of his first demonstration: the smoking-room, the little model, the laboratory and the Machine itself.", "The whole story, The Time Machine (1895), is played inside: walk up to the front door and press E."]]);
var pods = [[-96, -96, 9, 6.2, 0xF4F2EC], [-118, -104, 12, 5.8, 0xEDE6DA], [-104, -122, 7, 5.4, 0xF2EEE8], [-128, -84, 10, 5.6, 0xE8EEF0], [-80, -116, 13, 6.4, 0xF6F4EE], [-140, -118, 8, 5.2, 0xEEE8E0], [-74, -90, 6, 5, 0xF0EEEA]];
if (lite)
pods = pods.slice(0, 5);
pods.forEach(function (q, i) {
P.make(q[0], q[1], R() * 6, 4, function (G) { ctcPod(G, q[2], q[3], q[4]); }, { r: 2.2, h: q[2] + 8 });
ctcDoor(q[0] + 1.5 + Math.cos(0) * 1.4, q[1] + 2.4, 0, "apartment", "Pod Home " + (i + 1), "the stair tube");
});
P.make(-104, -104, 0, 0.5, function (G) {
var br = ctcSurf("concrete", 0xE6E8EA);
[[0, 1], [0, 2], [1, 4], [2, 6], [3, 5]].forEach(function (e) {
if (!pods[e[0]] || !pods[e[1]])
return;
var a = pods[e[0]], b = pods[e[1]], x0 = a[0] + 104, z0 = a[1] + 104, x1 = b[0] + 104, z1 = b[1] + 104;
var len = Math.hypot(x1 - x0, z1 - z0), y = Math.min(a[2], b[2]) + 1, g = new THREE.Group();
g.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
g.rotation.y = Math.atan2(x1 - x0, z1 - z0);
G.add(g);
ctcBox(g, 1.6, 0.25, len, br, 0, 0, 0);
ctcRail(g, len, 0.8, 0.1, 0, Math.PI / 2);
ctcRail(g, len, -0.8, 0.1, 0, Math.PI / 2);
});
});
P.make(-104, -104, 0, 0.5, function (G) { for (var i = 0; i < (lite ? 4 : 9); i++) {
var a = i * 0.7, r = 8 + i * 2.3;
ctcTree(G, Math.cos(a) * r, Math.sin(a) * r, 0.7 + (i % 3) * 0.15, i % 4 ? "tree" : "pine");
} return true; });
P.make(96, -102, Math.PI, 18, function (G) { ctcDome(G, 16, 0xD4ECF4); }, { r: 16.6, h: 16 });
P.make(140, -80, -Math.PI / 2, 12, function (G) { ctcDome(G, 11, 0xE6E0F2); }, { r: 11.6, h: 11 });
P.make(136, -122, -Math.PI * 0.8, 11, function (G) { ctcDome(G, 10, 0xE0F2E0); }, { r: 10.6, h: 10 });
ctcDoor(96, -102 - 21.2, Math.PI, "shop", "The Market Dome", "the market doors");
ctcDoor(140 - 15.6, -80, -Math.PI / 2, "library", "The Library of Everything", "the library doors");
ctcDoor(136 + Math.sin(-Math.PI * 0.8) * 14.6, -122 + Math.cos(-Math.PI * 0.8) * 14.6, -Math.PI * 0.8, "school", "The Dome School", "the school doors");
P.ring("marketstall", 6, 9, 96, -102, 1, null, 1, 0.3);
P.make(-84, -222, 0, 24, function (G) { ctcHelix(G, lite ? 80 : 112, 20, 17); }, { r: 20.5, h: 120 });
P.make(-138, -262, 1.2, 14, function (G) { ctcHelix(G, 58, 13, 23); }, { r: 13.5, h: 60 });
P.make(-40, -276, 2.1, 12, function (G) { ctcHelix(G, 44, 11, 29); }, { r: 11.5, h: 46 });
ctcDoor(-84, -222 + 21.2, 0, "skyscraper", "The Helix Gardens", "the garden lobby");
ctcDoor(-138 + Math.sin(1.2) * 14.6, -262 + Math.cos(1.2) * 14.6, 1.2, "apartment", "Little Helix", "the lobby");
ctcDoor(-40 + Math.sin(2.1) * 12.6, -276 + Math.cos(2.1) * 12.6, 2.1, "apartment", "Helix Court", "the lobby");
P.make(-84, -222, 0, 0.5, function (G) { for (var i = 0; i < (lite ? 4 : 10); i++) {
var a = i / 10 * Math.PI * 2 + 0.3, r = 26 + (i % 3) * 4;
ctcTree(G, Math.cos(a) * r, Math.sin(a) * r, 0.8 + (i % 4) * 0.1, "tree");
} return true; });
P.make(104, -236, 0, 36, function (G) { ctcArcology(G, 64, lite ? 6 : 8, 41); }, { hw: 32.5, hd: 32.5, h: 44 });
ctcDoor(104 - 8, -236 + 33.4, 0, "hotel", "The Arcology", "the atrium doors");
P.make(0, -338, 0, 16, function (G) {
var st = ctcSurf("marble", 0xF2F0EA);
for (var i = 0; i < 6; i++)
ctcBox(G, 40 - i * 3, 0.5, 8 - i * 0.4, st, 0, 0.25 + i * 0.5, i * -1.1);
var t = ctcTower(G, "taper", lite ? 100 : 150, 26, 0xC8D8E6, 61);
}, { r: 13, h: 150 });
ctcDoor(0, -338 + 8, 0, "skyscraper", "The Civic Spire", "the great glass doors");
var towers = [["twist", -240, -180, 96, 22], ["fin", -250, -80, 70, 30], ["round", -210, -300, 84, 20], ["split", -150, -360, 110, 30], ["setback", -70, -380, 90, 30],
["twist", 80, -370, 120, 20], ["setback", 170, -330, 78, 30], ["round", 240, -250, 92, 18], ["fin", 250, -150, 64, 28], ["twist", 230, -40, 74, 18],
["taper", -230, 60, 66, 22], ["split", 210, 70, 86, 28], ["round", -60, 110, 48, 16], ["setback", 80, 120, 56, 26]];
if (lite)
towers = towers.filter(function (q, i) { return i % 2 === 0; });
var tints = [0xB8CCD8, 0xC8D4C4, 0xC4C8D8, 0xD8D0C0, 0xB0C4CC, 0xC0D0E0];
towers.forEach(function (q, i) {
var rot = Math.atan2(-q[1], -(q[2] + 140));
P.make(q[1], q[2], rot, q[4] * 0.75, function (G) { ctcTower(G, q[0], q[3], q[4], tints[i % tints.length], i * 13 + 5); }, q[0] === "fin" || q[0] === "split" ? { hw: q[4] / 2 + 1, hd: q[4] * 0.3 + 1.4, h: q[3] } : { r: q[4] * 0.62, h: q[3] });
var fr = (q[0] === "fin" ? q[4] * 0.25 + 2 : q[0] === "split" ? q[4] * 0.25 + 1.2 : q[4] * 0.62 + 1.4);
ctcDoor(q[1] + Math.sin(rot) * fr, q[2] + Math.cos(rot) * fr, rot, "skyscraper", CTC_TOWERS[i % CTC_TOWERS.length], "the revolving doors");
});
P.make(0, -140, 0, 0.5, function (G) {
var beam = ctcSurf("concrete", 0xEEEEEA), R0 = 200, n = lite ? 36 : 72, y = 11;
for (var i = 0; i < n; i++) {
var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, x0 = Math.sin(a0) * R0, z0 = Math.cos(a0) * R0, x1 = Math.sin(a1) * R0, z1 = Math.cos(a1) * R0;
var len = Math.hypot(x1 - x0, z1 - z0) + 0.3;
ctcBox(G, 3.2, 1.2, len, beam, (x0 + x1) / 2, y, (z0 + z1) / 2, Math.atan2(x1 - x0, z1 - z0));
if (i % (lite ? 2 : 3) === 0) {
ctcCyl(G, 0.7, 0.9, y - 0.6, beam, x0, (y - 0.6) / 2, z0, 10);
ctcBox(G, 4, 0.6, 1.4, beam, x0, y - 0.9, z0, a0 + Math.PI / 2);
}
}
var st = new THREE.Group();
st.position.set(0, 0, R0);
G.add(st);
ctcBox(st, 10, 0.5, 34, ctcSurf("paving", 0xDAD6CE), -4.2, y - 0.2, 0);
var roof = ctcSurf("metal", 0xF2F2F2);
ctcBox(st, 12, 0.3, 36, roof, -2, y + 5, 0);
for (var k = -1; k <= 1; k++)
ctcCyl(st, 0.2, 0.2, 5, roof, -8, y + 2.5, k * 14, 8);
ctcBox(st, 0.06, 1.1, 30, ctcClear(0xD4EAF2, 0.3), -1.8, y + 0.6, 0);
ctcBox(st, 4, y + 5, 4, ctcGlass(0xB8CCD8, "pod"), -11, (y + 5) / 2, 6);
ctcBox(st, 3, 0.3, 6, roof, -9, y - 0.3, 6);
}, null);
P.make(0, -140, 0, 0.5, function (G) {
var g = new THREE.Group();
g.userData.ctcTrain = 1;
G.add(g);
for (var c = 0; c < (lite ? 2 : 3); c++) {
var car = ctcTrainCar(12, c === 0);
car.userData.k = c;
g.add(car);
}
return true;
});
P.sign(-14, 48, Math.PI, ["The Maglev", "Press E to read"], ["The Maglev", "A train that floats", ["The train is held a centimetre off its guideway by magnets and pushed along by a magnetic wave, so nothing touches and nothing wears.", "The real Shanghai maglev has carried passengers at up to 431 km/h since 2004; Japan's test maglev reached 603 km/h in 2015.", "Here it goes gently round the city in about two minutes. Take the lift up behind the sign and press E on the platform to ride."]]);
P.make(214, -26, 0, 6, function (G) {
var st = ctcSurf("metal", 0xE8EAEC);
ctcCyl(G, 1.2, 2.6, 52, st, 0, 26, 0, 12);
for (var y = 6; y < 52; y += 6)
ctcCyl(G, 2.6 - y * 0.02, 2.6 - y * 0.02, 0.35, st, 0, y, 0, 16);
ctcCyl(G, 2.2, 1.6, 3, ctcGlass(0xB4CCD8, "pod"), 0, 53.5, 0, 16);
ctcCyl(G, 0.4, 0.4, 6, st, 0, 57, 0, 8);
ctcBox(G, 3, 52, 3, ctcClear(0xD4EAF2, 0.25), 3, 26, 0);
}, { r: 3.2, h: 58 });
P.make(214, -26, 0, 0.5, function (G) { var a = ctcAirship(); a.userData.ctcShip = 1; G.add(a); return true; });
ctcDoor(214 + 4.6, -26, Math.PI / 2, "station", "The Airship Mast", "the lift");
[[-166, -50], [-170, -96], [-166, -190], [-160, -232]].forEach(function (p, i) { if (lite && i % 2)
return; P.make(p[0], p[1], 0, 3, function (G) { ctcTurbine(G, 16 + i % 2 * 4).userData.ctcSpin = 1; return true; }, { r: 1, h: 22 }); });
[[48, -48], [78, -72], [118, -48], [158, -72], [-118, -72], [-158, -48]].forEach(function (p) { P.make(p[0], p[1], 0, 2.5, function (G) { ctcSolarTree(G, 5.5); var g = new THREE.Group(); g.position.set(1.4, 0, 1); G.add(g); ctcBench(g); }, { r: 0.4, h: 6 }); });
P.make(0, -150, 0, 0.5, function (G) {
for (var i = 0; i < (lite ? 2 : 4); i++) {
var b = new THREE.Group();
b.userData.ctcBoat = i;
G.add(b);
ctcBox(b, 2.2, 0.7, 6, ctcSurf("plaster", 0xF4F4F0), 0, 0.0, 0);
var nose = ctcMesh(b, new THREE.ConeGeometry(1.1, 2, 12), ctcSurf("plaster", 0xF4F4F0), 0, 0, 3.9);
nose.rotation.x = Math.PI / 2;
nose.scale.set(1, 1, 0.35);
ctcBox(b, 1.9, 1.1, 3, ctcGlass(0x6A8494, "pod"), 0, 0.9, -0.4);
ctcBox(b, 2.1, 0.12, 3.4, ctcFlat(0x2A9AA8), 0, 1.5, -0.4);
}
return true;
});
P.make(0, -140, 0, 0.5, function (G) {
var lanes = lite ? 5 : 12;
for (var i = 0; i < lanes; i++) {
var h = new THREE.Group();
h.userData.ctcCar = i;
G.add(h);
if (typeof build === "function") {
var c = build({ id: "ctc_hover_" + i, archetype: "hovercar", attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
h.add(c);
}
}
return true;
});
for (var dr = 0; dr < (lite ? 2 : 5); dr++)
P.being("drone", -40 + dr * 24, -90 - dr * 20, dr, 1, null, { r: 30, sp: 3 });
var isl = [], RI = ldRand(9911);
for (var gx = -176; gx <= 176; gx += 22)
for (var gz = -36; gz <= 48; gz += 21) {
var x = gx + (RI() - 0.5) * 8, z = gz + (RI() - 0.5) * 6;
if (Math.hypot(x, z + 140) > 184 || Math.abs(x) < 20 || (x > -72 && x < -26 && z > -44 && z < -2) || Math.hypot(x, z + 60) < 38 || (Math.abs(x) < 40 && z > 34) || (x > 190) || (Math.abs(x + 160) < 14 && Math.abs(z + 60) < 14) || Math.abs(z + 60) < 16)
continue;
isl.push([x, z, isl.length]);
}
isl.forEach(function (q) {
var x = q[0], z = q[1], i = q[2], big = i % 4 === 0;
P.make(x, z, 0, 0.5, function () { }, { hw: big ? 3 : 2.2, hd: big ? 3 : 2.2, h: 1 });
});
at(function (G) {
isl.forEach(function (q) {
var x = q[0], z = q[1], i = q[2], big = i % 4 === 0, g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = (i * 1.3) % 6.28;
G.add(g);
ctcPlanter(g, big ? 2.8 : 2.0, true);
if (!lite || big)
ctcTree(G, x, z, big ? 1.0 : 0.7 + (i % 3) * 0.08, i % 6 === 5 ? "pine" : "tree");
[0, Math.PI].forEach(function (a) {
var b = new THREE.Group();
b.position.set(Math.sin(a) * (big ? 4.4 : 3.6), 0, Math.cos(a) * (big ? 4.4 : 3.6));
b.rotation.y = a + Math.PI;
g.add(b);
ctcBox(b, 2.2, 0.08, 0.6, ctcSurf("wood", 0xB88A5A), 0, 0.46, 0);
ctcBox(b, 2.2, 0.5, 0.08, ctcSurf("wood", 0xB88A5A), 0, 0.76, -0.28);
[-0.9, 0.9].forEach(function (dx) { ctcBox(b, 0.08, 0.46, 0.5, ctcSurf("metal", 0xC8CCD0), dx, 0.23, 0); });
});
var rg = new THREE.Mesh(new THREE.TorusGeometry(big ? 3.2 : 2.4, 0.04, 4, 40), ctcGlow(CTC_HUE[i % CTC_HUE.length]));
rg.rotation.x = Math.PI / 2;
rg.position.y = 0.05;
g.add(rg);
if (i % 3 === 1) {
var w = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 9), new THREE.MeshLambertMaterial({ color: 0x5E9AB0, emissive: new THREE.Color(0x0A2A3A) }));
w.rotation.x = -Math.PI / 2;
w.position.set(big ? 6 : 5, 0.06, 0);
g.add(w);
ctcBox(g, 0.9, 0.1, 9.2, ctcSurf("stone", 0xC8C2B6), big ? 6 : 5, 0, 0);
}
if (i % 3 === 2) {
var sc = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.18, 64, 8, 2, 3), ctcSurf("metal", [0xE8B030, 0xC8CCD0, 0x3AA88A][i % 3]));
sc.position.set(0, 3.4, (big ? 5 : 4));
g.add(sc);
ctcCyl(g, 0.12, 0.16, 2.6, ctcSurf("metal", 0xC8CCD0), 0, 1.3, big ? 5 : 4, 8);
}
if (i % 5 === 0) {
var cp = new THREE.Group();
cp.position.set(-(big ? 6 : 5), 0, 0);
g.add(cp);
[-1, 1].forEach(function (k) { ctcCyl(cp, 0.06, 0.06, 3, ctcSurf("metal", 0xC8CCD0), k * 1.2, 1.5, 0, 6); });
ctcBox(cp, 3.2, 0.08, 2.2, ctcSurf("metal", 0x1E2A3A), 0, 3, 0);
ctcBox(cp, 3.0, 0.02, 2.0, ctcGlow(0x2A4A7A), 0, 3.05, 0);
}
if (i % 4 === 2) {
var l = new THREE.Group();
l.position.set(0, 0, -(big ? 6 : 5));
g.add(l);
ctcLamp(l);
}
});
return true;
}, true);
at(function (G) {
var g = new THREE.RingGeometry(197, 400, 96, 1);
var m = new THREE.Mesh(g, ctcSurf("grass", 0x6E9A50));
m.rotation.x = -Math.PI / 2;
m.position.set(0, 0.035, -140);
m.receiveShadow = true;
G.add(m);
var RW = ldRand(5150);
for (var i = 0; i < (lite ? 40 : 120); i++) {
var a = RW() * Math.PI * 2, r = 206 + RW() * 70, x = Math.cos(a) * r, z = -140 + Math.sin(a) * r;
if (Math.abs(x) < 30 && z > 40)
continue;
if (x > 200 && Math.abs(z + 20) < 30)
continue;
ctcTree(G, x, z, 0.8 + RW() * 0.5, RW() < 0.35 ? "pine" : "tree");
}
return true;
}, true);
isl.forEach(function (q) { var x = q[0], z = q[1], i = q[2]; if (i % 7 === 3)
P.k("booth", x + 7, z, (i * 0.7) % 6.28, 1);
else if (i % 7 === 6)
P.k("holosign", x + 6, z + 3, (i * 0.9) % 6.28, 1); });
var W = CTC_WEAR, H = CTC_HUE;
P.person("barista", 15, -86, -Math.PI / 2, { sex: "f", look: { top: 0x3A2A6A, topKind: "shirt", bottom: 0x1A1A2A, shoes: 0xE8E8F0, skin: 0xE8C8A8, hair: 0xC83AA8, hairStyle: "short", layer: "apron", layerColor: 0x1A1A2A } }, ldWho("A coffee-cart owner", L, "the owner of a coffee cart on the Tram Gate Plaza of the City to Come", "Morning! Oat flat white? The beans are grown in the Arcology's glasshouses, and the milk is oats from the tower farms."));
P.person("guide", -6, -20, 0, { sex: "m", look: W.coat(0x2A7ACA) }, ldWho("A city guide", L, "a guide who shows visitors round the City to Come: the Helix Gardens, the Arcology, the Dome Quarter, the Pod Homes, the canal, the maglev, the airship mast and the Museum of Time", "Welcome to the City to Come! Every roof grows food, every window makes power, and nothing goes to waste. The Museum of Time is just there, on your left: the Time Traveller's own house. Where shall we start?"), { r: 8, sp: 0.6 });
P.person("tramdriver", 10, -16, Math.PI, { sex: "f", look: W.suit(0x2A4A7A, 0x2A3A5A) }, ldWho("Ines Mbeki, tram driver", L, "Ines Mbeki, who drives the plaza tram round and round the fountain and knows everybody by name", "Round the fountain every four minutes, all day and all night. Hop on whenever you like; the tram is free."));
P.person("curator", -36, -16, Math.PI / 2, { sex: "m", look: { top: 0xF2EEE2, topKind: "shirt", bottom: 0x4A3A2A, shoes: 0x2A1E14, layer: "suit", layerColor: 0x5A4A3A, neck: "bowtie", accColor: 0x6A1A1A, hair: 0x8A8A8A, beard: "short" } }, ldWho("Ambrose Hale, curator of the Museum of Time", L, "Ambrose Hale, the gentle, bow-tied curator of the Museum of Time, who keeps the Time Traveller's house at Richmond exactly as H. G. Wells described it in The Time Machine (1895), and loves to talk about the book", "Good day! The house is open: the smoking-room, the laboratory, and the Machine. Step through the front door and it is the 1890s, a Thursday evening, and the Time Traveller is about to show his friends something extraordinary.", "You know The Time Machine (1895) by H. G. Wells well and speak of it warmly, never spoiling the ending unless asked."));
P.person("pod_gardener", -100, -92, 0.6, { sex: "f", look: W.work(0x4A8A3A) }, ldWho("Saoirse Lindqvist, park gardener", L, "Saoirse Lindqvist, who keeps the garden park under the Pod Homes", "The pods stand on stalks so the ground stays a garden. Under each one there's shade and a bench. Mind the bees; they're working."), { r: 10, sp: 0.4 });
P.person("pod_family", -118, -96, 2, { sex: "m", look: W.jacket(0xE8B030, 0xF2F0EA, 0x3A4A5A) }, ldWho("Tendai Adebayo, who lives in a pod", L, "Tendai Adebayo, who lives with his family in Pod Home 2 and works as an energy engineer", "Up there? That's ours. Round rooms are cosier than you'd think, and the window goes all the way round, so you see the sun all day."), { r: 6, sp: 0.5 });
P.person("pod_kid1", -112, -100, 0, { child: 1, sex: "f", look: W.sport(0xE87AA8) }, null, { r: 8, sp: 1.1 });
P.person("pod_kid2", -108, -108, 1, { child: 1, sex: "m", look: W.sport(0x3AA88A) }, null, { r: 8, sp: 1.1 });
P.person("market1", 92, -98, 0.4, { sex: "f", look: W.work(0xD86A3A) }, ldWho("Mei Tanaka, market trader", L, "Mei Tanaka, who sells mended things and tower-grown fruit at the Market Dome", "Mended, not thrown away! This lamp was broken last week. Fruit's from the Arcology terraces, picked this morning."));
P.person("market2", 100, -106, -2, { sex: "m", look: W.work(0x2A9AA8) }, null, { r: 6, sp: 0.5 });
P.person("librarian", 126, -80, -Math.PI / 2, { sex: "f", look: W.coat(0x8A5AC8) }, ldWho("Zuri Achebe, librarian", L, "Zuri Achebe, the librarian of the Library of Everything, where books, films and music are free to all", "Everything ever written, free to read. We still keep paper books; people like the smell. And yes, we have The Time Machine, first edition, 1895."));
P.person("teacher", 128, -112, -2.4, { sex: "m", look: W.jacket(0x3AA88A) }, ldWho("Omar Reyes, teacher", L, "Omar Reyes, who teaches at the Dome School", "Today's lesson is outside: we're counting the bees in the helix gardens. Want to help? The children are better at it than I am."));
for (var ki = 0; ki < (lite ? 2 : 5); ki++)
P.person("pupil" + ki, 124 + ki * 2, -118 + ki, ki, { child: 1, sex: ki % 2 ? "m" : "f", look: W.sport(H[(ki + 3) % H.length]) }, null, { r: 7, sp: 1 });
P.person("helix_keeper", -70, -198, 0.3, { sex: "f", look: W.work(0x6AA848) }, ldWho("Amaru Okonkwo, helix gardener", L, "Amaru Okonkwo, who tends the Helix Gardens, a tower of planted terraces that wind up round a glass core", "Two kilometres of garden, wound round one tower. You can walk from the street to the top without a single step: it's one long slope. Takes about an hour if you stop to smell things."));
P.person("arco_engineer", 96, -200, 0, { sex: "m", look: W.lab() }, ldWho("Ravi Chandra, arcology engineer", L, "Ravi Chandra, an engineer of the Arcology, a stepped hill of homes and gardens where five thousand people live", "An arcology is a whole town in one building: homes, schools, shops and farms, so you can walk everywhere. The waterfall is the rain off the terraces, cleaned and sent round again."));
P.person("canal_boat", 30, -140, Math.PI / 2, { sex: "f", look: W.suit(0x1E5A6A) }, ldWho("Hana Novak, water-taxi pilot", L, "Hana Novak, who pilots the electric water taxis on the canal", "Quiet, aren't they? The boats run on batteries charged by the solar trees. Fish came back to the canal the year the engines went electric."));
P.person("airship_crew", 208, -20, -1.2, { sex: "m", look: W.suit(0x6A3A2A, 0x3A2A22) }, ldWho("Lucien Fontaine, airship pilot", L, "Lucien Fontaine, who flies the city's airship from the mast in the east", "She's filled with helium, never hydrogen, and floats on it like a fish in water. Slow, quiet, and the best view in the city. We sail at the top of the hour."));
P.person("maglev_guard", -10, 46, Math.PI, { sex: "f", look: W.suit(0x2A3A5A) }, ldWho("Priya Lindqvist, maglev guard", L, "Priya Lindqvist, the guard at the maglev station behind the Tram Gate Plaza", "The train floats on magnets: no wheels, no rattling. Round the city in about two minutes. The platform's up the lift behind me; press E there to ride."));
P.person("turbine_tech", -160, -60, 1.2, { sex: "f", look: W.work(0xE8B030) }, ldWho("Ingrid Sorensen, wind technician", L, "Ingrid Sorensen, who looks after the city's upright wind turbines", "These turn whichever way the wind blows, so they never have to face it. Quieter than the old propeller kind, too."));
P.person("busker", 22, -54, -2.2, { sex: "m", look: W.jacket(0xC83A5A, 0x2A2A30, 0x2A2A30) }, ldWho("Jun Kim, busker", L, "Jun Kim, a busker who plays an old acoustic guitar by the fountain", "*strums* Requests? I know every song older than a hundred years and none newer. Old songs keep better."));
P.person("civic", 4, -322, Math.PI, { sex: "f", look: W.suit(0xE8E8EC, 0x3A3E48) }, ldWho("Chair Amaru Lindqvist of the People's Assembly", L, "the elected Chair of the People's Assembly, on the Civic Steps before the Civic Spire", "Anyone may speak at the Assembly; the meetings are shown on the trams. Brightwater, our green heart, is through the Tram Gate, if you want to see the rest of us."));
var spots = [[0, -40, 16], [0, -100, 10], [0, -200, 12], [0, -280, 12], [-60, -60, 14], [60, -60, 14], [-150, -60, 14], [150, -60, 14], [-60, -142, 10], [60, -142, 10], [-160, -142, 10], [160, -142, 10],
[96, -102, 8], [-104, -104, 12], [-100, 10, 22], [100, 10, 22], [-150, 20, 16], [150, 20, 16], [-60, 40, 14], [60, 40, 14], [-84, -196, 10], [104, -196, 12], [0, -320, 10], [-40, -24, 8], [30, -24, 8], [200, -26, 8], [-150, -200, 10], [150, -280, 10], [0, 36, 10], [-30, -80, 8]];
var n = lite ? 24 : 72;
for (var i = 0; i < n; i++) {
var s = spots[i % spots.length], sex = R() < 0.5 ? "m" : "f", kind = R(), hue = H[Math.floor(R() * H.length)], hue2 = H[Math.floor(R() * H.length)];
var look = kind < 0.35 ? W.jacket(hue, null, R() < 0.5 ? 0x2E3440 : 0x4A4E58) : kind < 0.55 ? W.coat(hue) : kind < 0.7 ? W.sport(hue) : kind < 0.85 ? W.suit(hue2, 0x2A2E38) : W.jacket(hue, 0xE8E4DC, 0x6A6E78);
var child = R() < 0.12, old = R() < 0.12;
if (old)
look.hair = 0xD8D8D8;
P.person("walk" + i, s[0] + (R() - 0.5) * s[2] * 1.4, s[1] + (R() - 0.5) * s[2] * 1.4, R() * 6.28, { sex: sex, child: child ? 1 : 0, look: look }, null, { r: s[2], sp: child ? 1.1 : 0.5 + R() * 0.6 });
}
P.being("robot", 20, -120, 0, 0.8, null, { r: 24, sp: 0.6 });
P.being("android", -20, -180, 2, 1, null, { r: 20, sp: 0.6 });
P.sign(-14, -10, 0.3, ["The City to Come", "Press E to read"], ["Cities of the future", "Ideas being tried today", ["Vertical farms grow food indoors in stacked layers under LED light, using far less water than fields.", "Green roofs and terraces cool a city and soak up rain; Milan's Bosco Verticale (2014) has about 800 trees on two towers.", "Maglev trains float on magnets: the Shanghai line has run since 2004.", "Arcologies (Paolo Soleri's word, from architecture and ecology) are whole towns in one building, so everyone can walk everywhere.", "Airships filled with helium (which cannot burn) are being built again for slow, quiet cargo flights."]]);
},
function (G) {
var brick = ctcSurf("brick", 0xC8B48E), stone = ctcSurf("stone", 0xE6DECA), slate = ctcSurf("slate", 0x4A4E58), wood = ctcSurf("wood", 0x4A2E1E), gl = ctcGlass(0x6A7A84, "pod");
var W = 12, D = 9, H1 = 3.6, H2 = 3.4;
ctcBox(G, W, H1 + H2, D, brick, 0, (H1 + H2) / 2, 0);
ctcBox(G, W + 0.3, 0.25, D + 0.3, stone, 0, H1, 0);
ctcBox(G, W + 0.4, 0.3, D + 0.4, stone, 0, H1 + H2, 0);
ctcBox(G, W + 0.2, 0.5, D + 0.2, stone, 0, 0.25, 0);
var roof = new THREE.Mesh(new THREE.ConeGeometry(Math.hypot(W, D) / 2 + 0.4, 3.6, 4, 1), slate);
roof.rotation.y = Math.PI / 4;
roof.scale.set(W / Math.hypot(W, D) * 1.42, 1, D / Math.hypot(W, D) * 1.42);
roof.position.y = H1 + H2 + 1.8;
G.add(roof);
[[-4, -2], [4, 2]].forEach(function (c) { ctcBox(G, 1.1, 2.6, 0.8, brick, c[0], H1 + H2 + 2.8, c[1]); ctcBox(G, 1.3, 0.2, 1, stone, c[0], H1 + H2 + 4.1, c[1]); [-0.25, 0.25].forEach(function (dx) { ctcCyl(G, 0.14, 0.16, 0.6, ctcSurf("plaster", 0xB86A4A), c[0] + dx, H1 + H2 + 4.5, c[1], 8); }); });
var fz = D / 2;
ctcBox(G, 3.4, H1 - 0.2, 1.2, brick, -3.4, (H1 - 0.2) / 2, fz + 0.6);
ctcBox(G, 3.6, 0.3, 1.4, stone, -3.4, H1 - 0.1, fz + 0.6);
[-4.6, -3.4, -2.2].forEach(function (x) { ctcBox(G, 1, 1.9, 0.06, gl, x, 1.9, fz + 1.22); ctcBox(G, 1.1, 0.12, 0.2, stone, x, 0.9, fz + 1.25); });
[3.6].forEach(function (x) { ctcBox(G, 1.2, 2, 0.06, gl, x, 2, fz + 0.03); ctcBox(G, 1.4, 0.14, 0.2, stone, x, 0.95, fz + 0.08); });
[-3.6, 0, 3.6].forEach(function (x) { ctcBox(G, 1.1, 1.8, 0.06, gl, x, H1 + 1.6, fz + 0.03); ctcBox(G, 1.3, 0.14, 0.2, stone, x, H1 + 0.65, fz + 0.08); ctcBox(G, 1.3, 0.18, 0.12, stone, x, H1 + 2.6, fz + 0.06); });
ctcBox(G, 1.2, 2.4, 0.1, wood, 0, 1.7, fz + 0.05);
ctcBox(G, 1.6, 0.3, 0.4, stone, 0, 3.05, fz + 0.2);
ctcBox(G, 1.4, 0.4, 0.06, ctcFlat(0xF2E8C8, { e: 0x6A5A30, ei: 0.3 }), 0, 2.65, fz + 0.12);
[0, 1, 2].forEach(function (i) { ctcBox(G, 2.2 - i * 0.2, 0.18, 0.5, stone, 0, 0.09 + i * 0.18, fz + 1.4 - i * 0.4); });
[-0.8, 0.8].forEach(function (x) { ctcCyl(G, 0.1, 0.12, 2.8, ctcSurf("plaster", 0xF2F0EA), x, 1.4, fz + 1.0, 8); });
ctcBox(G, 2, 0.2, 1.4, stone, 0, 2.9, fz + 0.7);
for (var x = -5.8; x <= 5.8; x += 0.25) {
if (Math.abs(x) < 1.2)
continue;
ctcCyl(G, 0.02, 0.02, 1, ctcFlat(0x1A1A1E), x, 0.5, fz + 2.4, 4);
}
ctcBox(G, 11.6, 0.06, 0.06, ctcFlat(0x1A1A1E), 0, 0.96, fz + 2.4);
ctcShrubs(G, -3.6, fz + 1.9, 3, 0.8, 0, 4, 77, 0x3E6A32);
ctcShrubs(G, 3.6, fz + 1.9, 3, 0.8, 0, 4, 78, 0x3E6A32);
var st = ctcSurf("metal", 0xF2F4F4), cw = W + 8, cd = D + 10, ch = 13;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { ctcCyl(G, 0.22, 0.28, ch, st, c[0] * cw / 2, ch / 2, c[1] * cd / 2, 10); });
for (var k = -2; k <= 2; k++) {
var a = ctcBox(G, 0.2, 0.3, cd, st, k * cw / 4, ch + 0.15, 0);
}
ctcBox(G, cw, 0.3, 0.25, st, 0, ch, cd / 2);
ctcBox(G, cw, 0.3, 0.25, st, 0, ch, -cd / 2);
var gr = ctcBox(G, cw, 0.08, cd, ctcClear(0xD8ECF4, 0.22), 0, ch + 0.3, 0);
gr.castShadow = false;
ctcBox(G, 0.5, 0.32, 0.04, ctcSurf("metal", 0xD8B060, { e: 0x3A2A08, ei: 0.2 }), 0.95, 1.5, fz + 0.13);
},
function () {
CTC.train = null;
CTC.trams = [];
CTC.cars = [];
CTC.boats = [];
CTC.ship = null;
CTC.spin = [];
CTC.night = [];
CTC.glass = [];
CTC.water = [];
if (!LD.g)
return;
var seen = new Set();
LD.g.traverse(function (o) {
var u = o.userData;
if (u.ctcTrain)
CTC.train = o;
if (u.ctcTram)
CTC.trams.push(o);
if (u.ctcCar !== undefined)
CTC.cars.push(o);
if (u.ctcBoat !== undefined)
CTC.boats.push(o);
if (u.ctcShip)
CTC.ship = o;
if (u.ctcSpin)
CTC.spin.push(o);
var m = o.material;
if (m && !Array.isArray(m) && !seen.has(m)) {
seen.add(m);
if (m.userData && m.userData.ctcNight)
CTC.night.push(m);
if (m.userData && m.userData.ctcGlass)
CTC.glass.push(m);
}
});
CTC.envSet = false;
CTC.lastDl = -1;
},
function (dt) {
if (LD.kind !== "future" || !LD.g)
return;
CTC.t += dt;
var t = CTC.t;
CTC.trams.forEach(function (g) { var a = t * 0.026; g.children.forEach(function (c) { c.position.set(Math.sin(a) * 28, 0, Math.cos(a) * 28); c.rotation.y = a + Math.PI / 2; }); });
if (CTC.train) {
var th = ctcTrainAt(t), R = CTC_TRAIN.R;
CTC.train.children.forEach(function (car) { var a = th - (car.userData.k || 0) * CTC_TRAIN.len / R; car.position.set(Math.sin(a) * R, CTC_TRAIN.y, Math.cos(a) * R); car.rotation.y = a + Math.PI / 2; });
}
CTC.boats.forEach(function (b) {
var i = b.userData.ctcBoat, sp = 4 + i * 0.7, L = 520, u = ((t * sp + i * 137) % (2 * L)), dir = u < L ? 1 : -1, x = dir > 0 ? -L / 2 + u : L / 2 - (u - L);
b.position.set(x, -0.25 + Math.sin(t * 1.3 + i) * 0.04, dir > 0 ? -2.6 : 2.6);
b.rotation.y = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
});
CTC.cars.forEach(function (h) {
var i = h.userData.ctcCar, r = 110 + i * 13, sp = (i % 2 ? 1 : -1) * (12 + i % 3 * 3) / r, a = t * sp + i * 1.7, y = 18 + (i % 4) * 7;
h.position.set(Math.sin(a) * r, y, Math.cos(a) * r * 0.8);
h.rotation.y = a + (sp > 0 ? Math.PI / 2 : -Math.PI / 2);
});
if (CTC.ship) {
var a2 = t * 0.02;
CTC.ship.position.set(-150 + Math.cos(a2) * 150, 58 + Math.sin(t * 0.3) * 0.6, -100 + Math.sin(a2) * 130);
CTC.ship.rotation.y = -a2;
}
CTC.spin.forEach(function (r) { r.rotation.y += dt * 1.1; });
var dl = 1;
try {
dl = daylight(dreamHour());
}
catch (e) { }
if (Math.abs(dl - CTC.lastDl) > 0.01) {
CTC.lastDl = dl;
var lit = Math.max(0, Math.min(1, (0.85 - dl) / 0.75));
CTC.night.forEach(function (m) { m.emissiveIntensity = lit * 1.3; });
}
if (!CTC.envSet && typeof glassEnv === "function") {
var env = glassEnv();
if (env) {
CTC.envSet = true;
CTC.glass.forEach(function (m) { if (!("envMap" in m))
return; m.envMap = env; m.combine = THREE.MixOperation; m.reflectivity = m.userData.ctcWater ? 0.45 : 0.28; m.needsUpdate = true; });
}
}
if (CTC.ride)
ctcRideTick(dt);
},
function (dt) {
var Rd = CTC.ride;
Rd.t += dt;
if (!CTC.train || !LD.g) {
CTC.ride = null;
return;
}
var car = CTC.train.children[0];
if (!car)
return;
car.updateWorldMatrix(true, false);
var e = car.matrixWorld.elements, a = car.rotation.y - Math.PI / 2;
camera.position.set(e[12] + Math.cos(a) * 0.0 - Math.sin(a) * 2, e[13] + 2.0, e[14] - Math.cos(a) * 2);
yaw = a + Math.PI + 0.25;
pitch = -0.06;
if (Rd.t > CTC_TRAIN.lap + CTC_TRAIN.stop + 4)
ctcRideEnd();
}
];
});
