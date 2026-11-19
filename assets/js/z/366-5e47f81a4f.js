/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(366, function () {
"use strict";
return [
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + (o.e || "") + "|" + (o.ei || "") + "|" + (o.op || "") + "|" + (o.side || "") + "|" + (o.basic ? 1 : 0) + "|" + (o.add ? 1 : 0);
if (DPX.mats[k])
return DPX.mats[k];
var m;
if (o.basic) {
m = new THREE.MeshBasicMaterial({ color: col });
if (o.add) {
m.blending = THREE.AdditiveBlending;
}
}
else {
m = new THREE.MeshLambertMaterial({ color: col });
var t = tex && typeof texOf === "function" ? texOf(tex) : null;
if (t)
m.map = t;
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
else if (!o.flat) {
m.emissive = new THREE.Color(dpxLite() ? 0x2A2A2A : col);
m.emissiveIntensity = dpxLite() ? 1 : 0.16;
}
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.side)
m.side = THREE.DoubleSide;
m.userData.ldShared = 1;
return (DPX.mats[k] = m);
},
function (g, pts, mat, x, y, z, seg) {
var v = pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), geo = new THREE.LatheGeometry(v, seg || 18);
var len = 0;
for (var i = 1; i < pts.length; i++)
len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
var rm = 0;
pts.forEach(function (p) { rm = Math.max(rm, p[0]); });
dpxUV(geo, Math.PI * 2 * rm, len);
return dpxAdd(g, geo, mat, x, y, z);
},
function (g, mat, x, y, z, size, seed, tipMat) {
var R = wRand(seed || 7), lite = dpxLite();
function grow(px, py, pz, dx, dy, dz, len, rad, depth) {
var ex = px + dx * len, ey = py + dy * len, ez = pz + dz * len, mid = new THREE.Vector3((px + ex) / 2, (py + ey) / 2, (pz + ez) / 2);
var c = new THREE.Mesh(new THREE.CylinderGeometry(rad * 0.72, rad, len, lite ? 4 : 6), mat);
c.position.copy(mid);
c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
g.add(c);
if (depth <= 0 || rad < 0.06) {
var t = new THREE.Mesh(new THREE.ConeGeometry(rad * 0.75, rad * 5, lite ? 4 : 6), tipMat || mat);
t.position.set(ex + dx * rad * 2.4, ey + dy * rad * 2.4, ez + dz * rad * 2.4);
t.quaternion.copy(c.quaternion);
g.add(t);
return;
}
var n = lite ? 2 : (R() < 0.4 ? 3 : 2);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, sp = 0.45 + R() * 0.45, nx = dx + Math.cos(a) * sp, ny = dy + 0.25, nz = dz + Math.sin(a) * sp, L = Math.hypot(nx, ny, nz);
grow(ex, ey, ez, nx / L, ny / L, nz / L, len * (0.62 + R() * 0.2), rad * 0.66, depth - 1);
}
}
grow(x, y, z, 0, 1, 0, size * 0.38, size * 0.09, lite ? 2 : 3);
},
function (r, ribs) {
var pos = [], idx = [], n = ribs || 9, seg = dpxLite() ? 5 : 8;
for (var i = 0; i <= n * 2; i++) {
var a = -Math.PI * 0.42 + i / (n * 2) * Math.PI * 0.84, rib = (i % 2) ? 0.05 * r : 0;
for (var s = 0; s <= seg; s++) {
var t = s / seg, rr = r * t;
pos.push(Math.sin(a) * rr, (rib + Math.sin(t * Math.PI) * 0.18 * r) * t, Math.cos(a) * rr);
}
}
for (var j = 0; j < n * 2; j++)
for (var k = 0; k < seg; k++) {
var a0 = j * (seg + 1) + k, b0 = (j + 1) * (seg + 1) + k;
idx.push(a0, b0, a0 + 1, b0, b0 + 1, a0 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
var uv = [];
for (var q = 0; q < pos.length; q += 3)
uv.push(pos[q] * 0.5, pos[q + 2] * 0.5);
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
return g;
},
function (r, h) {
var pts = [], n = dpxLite() ? 16 : 30, turns = 5;
for (var i = 0; i <= n; i++) {
var t = i / n, y = t * h, body = t < 0.22 ? Math.sin(t / 0.22 * Math.PI / 2) : Math.pow(1 - (t - 0.22) / 0.78, 1.15), ph = (t * turns) % 1, whorl = 0.8 + 0.22 * Math.sin(ph * Math.PI);
pts.push(new THREE.Vector2(Math.max(0.02, r * body * (t < 0.22 ? 1 : whorl)), y));
}
var g = new THREE.LatheGeometry(pts, dpxLite() ? 12 : 22);
dpxUV(g, Math.PI * 2 * r, h);
return g;
},
function (g, r, h, mat, y0) {
var pts = [], turns = 5, n = dpxLite() ? 40 : 90;
for (var i = 0; i <= n; i++) {
var t = 0.22 + i / n * 0.76, a = t * turns * Math.PI * 2, body = Math.pow(1 - (t - 0.22) / 0.78, 1.15) * r * 0.82;
pts.push(new THREE.Vector3(Math.cos(a) * body, y0 + t * h, Math.sin(a) * body));
}
var geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n, 0.28 * r / 6, 5, false);
return dpxAdd(g, geo, mat, 0, 0, 0);
},
function (it) {
var D = it.dpxDoor;
if (!D || typeof EVB === "undefined" || typeof LD === "undefined")
return;
var X = LD.ox + it.x, Z = LD.oz + it.z, r = it.rot || 0, c = Math.cos(r), sn = Math.sin(r), lx = D.lx || 0, lz = D.lz;
var spec = { id: "dpx_" + D.theme + "_" + Math.round(it.x) + "_" + Math.round(it.z), archetype: "merpalace", attrs: {}, x: X, z: Z, rot: r,
realm: store.here || 0, label: D.name, inside: {}, evb: { theme: D.theme, src: "ld", land: LD.kind, dpx: D } };
spec.evbDoor = { x: X + lx * c + lz * sn, z: Z - lx * sn + lz * c, out: { x: sn, z: c } };
EVB.doors.push({ spec: spec, src: "ld", info: { name: D.name, doors: D.doors || "the doors" } });
DPX.doors++;
},
function (title, body, btns) {
if (typeof worldCard !== "function") {
dpxSay("<b>" + dpxEsc(title) + "</b> " + body);
return;
}
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#BFF0FF;margin-bottom:6px'>" + dpxEsc(title) + "</div><div style='line-height:1.5'>" + body + "</div>";
(btns || []).forEach(function (b, i) {
var k = "b" + i;
fns[k] = function () { try {
b[1]();
}
catch (e) {
if (window.console)
console.warn("[deep-realm] card", e);
} };
h += typeof worldBtn === "function" ? worldBtn(k, dpxEsc(b[0]), b[2] ? dpxEsc(b[2]) : "") : "<div data-w='" + k + "'>" + dpxEsc(b[0]) + "</div>";
});
worldCard(h, fns);
},
function (title, qs, done) {
var i = 0, score = 0;
function ask() {
if (i >= qs.length) {
dpxCard(title, "You got <b>" + score + " of " + qs.length + "</b> right." + (score === qs.length ? " Every one! 🌊" : " Have another look round and try again."), [["Close", dpxClose]]);
if (done)
done(score, qs.length);
return;
}
var q = qs[i], order = q[1].map(function (a, k) { return k; }).sort(function () { return Math.random() - 0.5; });
dpxCard(title + " · " + (i + 1) + " of " + qs.length, dpxEsc(q[0]), order.map(function (k) {
return [q[1][k], function () {
var ok = k === q[2];
if (ok)
score++;
i++;
dpxCard(title, (ok ? "✅ <b>Right.</b> " : "❌ <b>Not quite:</b> it is <b>" + dpxEsc(q[1][q[2]]) + "</b>. ") + (q[3] ? dpxEsc(q[3]) : ""), [["Next", ask]]);
}];
}));
}
ask();
},
function () {
if (typeof LD === "undefined" || !LD.solids || LD.solids.dpxPal)
return;
LD.solids.dpxPal = 1;
DPX_DECKS = [];
DPX_DECKS.dpxFor = LD.solids;
var K = DPX_KING, T = 3, S = LD.solids;
function box(x, z, hw, hd, h) { S.push({ x: K.x + x, z: K.z + z, rot: 0, hw: hw, hd: hd, h: h }); }
function cyl(x, z, r, h) { S.push({ x: K.x + x, z: K.z + z, r: r, h: h }); }
function deck(x0, x1, z0, z1, top) { DPX_DECKS.push({ x0: K.x + x0, x1: K.x + x1, z0: K.z + z0, z1: K.z + z1, top: top }); }
deck(-62, 62, -50, 46, T);
box(0, -2, 61.6, 47.6, 2.4);
DPX_KING_STEPS.forEach(function (q) { deck(-q.w / 2, q.w / 2, q.z0, q.z1 + (q.top < 1 ? 0.3 : 0), q.top); box(-18, (q.z0 + q.z1) / 2, 1.2, (q.z1 - q.z0) / 2, q.top + 1.1); box(18, (q.z0 + q.z1) / 2, 1.2, (q.z1 - q.z0) / 2, q.top + 1.1); });
box(0, -4.5, 29.1, 26.2, T + 32);
cyl(0, -6, 10, T + 79);
[-1, 1].forEach(function (sd) { box(sd * 44, -6, 15.5, 20.5, T + 21); cyl(sd * 44, -6, 13, T + 31); cyl(sd * 5.6, 22.4, 1.1, T + 17.6); });
[[-58, -28], [58, -28], [-58, 16], [58, 16]].forEach(function (p) { cyl(p[0], p[1], 6.9, T + 58); });
[[-30, 22], [30, 22], [-60, 24], [60, 24], [-60, -38], [60, -38], [-30, -34], [30, -34], [-46, 30], [46, 30]].forEach(function (p) { cyl(p[0], p[1], 0.9, T + 8); });
[-1, 1].forEach(function (sd) {
box(sd * 40.8, 45.4, 20.6, 0.3, T + 1.15);
box(sd * 61.6, 22, 0.3, 23, T + 1.15);
cyl(sd * 10.5, 25.5, 1.3, T + 8.8);
cyl(sd * 15, 34, 3.6, T + 4.2);
box(sd * 21.5, 57, 1.75, 1.75, 3.2);
});
[[-15, 42], [15, 42], [-22, 30], [22, 30], [-38, 20], [38, 20], [-50, 20], [50, 20]].forEach(function (q) { cyl(q[0], q[1], 1.0, T + 2.4); });
[[-31, 40], [31, 40], [-48, 30], [48, 30]].forEach(function (q) { cyl(q[0], q[1], 2.6, T + 1.0); });
[[-27, 36], [27, 36], [-34, 40], [34, 40], [-44, 38], [44, 38], [-55, 34], [55, 34], [-56, -44], [56, -44]].forEach(function (q) { cyl(q[0], q[1], 0.5, T + 4.5); });
},
function (G, H) {
var lite = dpxLite(), M = dpxMat, P = DPX_PAL;
var stone = M(P.coralPale, DPX_CT()), coral = M(P.coral, DPX_CT()), deep = M(P.coralDeep, DPX_CT()), pearl = M(P.pearl, "marble"), nacre = M(P.nacre, "marble");
var amber = window.DXU_OFF ? M(P.amber, null, { e: P.amberGlow, ei: 0.85 }) : M(0x140E0A, null, { e: 0x4A2A10, ei: 0.55 }), frame = M(0x8A3A30, DPX_CT()), gold = M(P.gold, "metal", { e: 0x3A2A06, ei: 0.5 }), dark = M(0x2A1A1A);
dpxPalaceSolid();
dpxBox(G, 124, 8, 96, stone, 0, -1, -2);
DPX_KING_STEPS.forEach(function (q, s) {
dpxBox(G, q.w, q.top, q.z1 - q.z0, stone, 0, q.top / 2, (q.z0 + q.z1) / 2);
[-1, 1].forEach(function (sd) { dpxBox(G, 2.4, q.top + 1.1, q.z1 - q.z0 + 0.02, coral, sd * 18, (q.top + 1.1) / 2, (q.z0 + q.z1) / 2); });
});
var bigPearl = M(0xF8F6FF, null, { e: 0xB8C8E8, ei: 0.55 });
[-1, 1].forEach(function (sd) { dpxSph(G, 1.3, bigPearl, sd * 18, 4.1 + 1.3, 45.1, 16); dpxSph(G, 1.3, bigPearl, sd * 18, 1.6 + 1.3, 56.1, 16); dpxTorus(G, 1.0, 0.12, gold, sd * 18, 4.15, 45.1, Math.PI / 2, null, 16); dpxTorus(G, 1.0, 0.12, gold, sd * 18, 1.65, 56.1, Math.PI / 2, null, 16); });
var T = 3;
dpxBox(G, 56, 30, 50, coral, 0, T + 15, -4);
dpxBox(G, 58, 1.6, 52, deep, 0, T + 30.5, -4);
dpxBox(G, 57, 1.2, 51, deep, 0, T + 0.6, -4);
for (var px = -27; px <= 27.1; px += 6.75) {
dpxBox(G, 1.4, 30, 1.2, deep, px, T + 15, 21.4);
}
for (var pz = -28; pz <= 20.1; pz += 8) {
[-1, 1].forEach(function (sd) { dpxBox(G, 1.2, 30, 1.4, deep, sd * 28.4, T + 15, pz); });
}
var hole = (!window.DXU_OFF && typeof dxsWinMat === "function") ? dxsWinMat() : amber;
var win = dpxGothic(3.2, 10), win2 = dpxGothic(2.6, 7), fr = dpxGothic(4.0, 11.2), fr2 = dpxGothic(3.4, 8.1);
for (var wx = -23.6; wx <= 23.7; wx += 6.75) {
if (Math.abs(wx) < 5)
continue;
dxsWinPair(G, frame, hole, wx, T + 4, 21.14, 0, 3.2, 10);
dxsWinPair(G, frame, hole, wx, T + 19, 21.14, 0, 2.6, 7);
}
for (var wz = -24; wz <= 16.1; wz += 8) {
[-1, 1].forEach(function (sd) {
var ry = sd * Math.PI / 2, x0 = sd * 28.08, x1 = sd * 28.14;
dxsWinPair(G, frame, hole, x1, T + 4, wz, ry, 3.2, 10);
dxsWinPair(G, frame, hole, x1, T + 19, wz, ry, 2.6, 7);
});
}
dpxFlat(G, dpxGothic(9, 15), frame, 0, T, 21.1);
dpxFlat(G, dpxGothic(7, 13), dark, 0, T, 21.18);
dpxFlat(G, dpxGothic(3.2, 11), M(0x5A2A1A, "wood"), -1.65, T, 21.24);
dpxFlat(G, dpxGothic(3.2, 11), M(0x5A2A1A, "wood"), 1.65, T, 21.24);
[-1, 1].forEach(function (sd) { for (var k = 0; k < 7; k++) {
dpxTorus(G, 0.85, 0.32, coral, sd * 5.6, T + 1 + k * 2.2, 22.4, Math.PI / 2, null, 12);
} dpxCyl(G, 0.7, 0.7, 15.5, deep, sd * 5.6, T + 7.75, 22.4, 10); dpxSph(G, 1.2, pearl, sd * 5.6, T + 16.4, 22.4, 12); });
dpxTorus(G, 4.4, 0.55, frame, 0, T + 22, 21.3, 0, null, 28);
var rose = dpxCyl(G, 4.0, 4.0, 0.2, amber, 0, T + 22, 21.2, 28);
rose.rotation.x = Math.PI / 2;
for (var sp = 0; sp < 12; sp++) {
var a = sp / 12 * Math.PI * 2, b = dpxBox(G, 0.3, 8, 0.25, frame, 0, T + 22, 21.35);
b.rotation.z = a;
}
dpxSph(G, 1.1, pearl, 0, T + 22, 21.5, 12);
[-1, 1].forEach(function (sd) {
var cx = sd * 44;
dpxBox(G, 30, 20, 40, coral, cx, T + 10, -6);
dpxBox(G, 31, 1.2, 41, deep, cx, T + 20.4, -6);
dpxDome(G, 13, nacre, cx, T + 21, -6, lite ? 14 : 24, 0.75);
dpxCyl(G, 0.5, 0.5, 6, deep, cx, T + 31, -6, 8);
dpxSph(G, 1.1, pearl, cx, T + 34.4, -6, 12);
for (var k = 0; k < 3; k++) {
var x = cx - 9 + k * 9;
dxsWinPair(G, frame, hole, x, T + 5.6, 14.14, 0, 2.6, 7);
}
for (var j = 0; j < 4; j++) {
var z = -22 + j * 10.5;
dxsWinPair(G, frame, hole, cx + sd * 15.14, T + 5.6, z, sd * Math.PI / 2, 2.6, 7);
}
});
var conch = dpxConchGeo(8, 18);
[[-58, -28], [58, -28], [-58, 16], [58, 16]].forEach(function (p, i) {
dpxCyl(G, 6, 6.8, 40, coral, p[0], T + 20, p[1], lite ? 12 : 20);
dpxTorus(G, 6.3, 0.5, deep, p[0], T + 12, p[1], Math.PI / 2, null, 24);
dpxTorus(G, 6.1, 0.5, deep, p[0], T + 28, p[1], Math.PI / 2, null, 24);
dpxTorus(G, 6.6, 0.9, deep, p[0], T + 40, p[1], Math.PI / 2, null, 24);
var c = dpxAdd(G, conch, i % 2 ? pearl : nacre, p[0], T + 40, p[1]);
c.rotation.y = i;
var sm = new THREE.Group();
sm.position.set(p[0], 0, p[1]);
G.add(sm);
dpxConchSeam(sm, 8, 18, deep, T + 40);
for (var k = 0; k < 3; k++) {
var a = k * 2.1 + i, wx = p[0] + Math.sin(a) * 6.15, wz = p[1] + Math.cos(a) * 6.15;
dxsWinPair(G, frame, hole, wx, T + 16 + k * 7, wz, a, 2.6, 7);
}
});
dpxCyl(G, 9, 10, 22, coral, 0, T + 41, -6, lite ? 14 : 24);
dpxTorus(G, 9.6, 0.8, deep, 0, T + 52, -6, Math.PI / 2, null, 28);
for (var t = 0; t < 8; t++) {
var a = t / 8 * Math.PI * 2;
dxsWinPair(G, frame, hole, Math.sin(a) * 9.6, T + 38, -6 + Math.cos(a) * 9.6, a, 2.6, 7);
}
dpxAdd(G, dpxConchGeo(11.5, 26), pearl, 0, T + 52, -6);
var ts = new THREE.Group();
ts.position.set(0, 0, -6);
G.add(ts);
dpxConchSeam(ts, 11.5, 26, deep, T + 52);
dpxSph(G, 2.2, M(0xF6F4FF, null, { e: 0xB8C8E8, ei: 0.9 }), 0, T + 79, -6, 16);
var R = wRand(4401), tips = [M(0xF2804A, DPX_CT()), M(0xE85A7A, DPX_CT()), M(0xF8C84A, DPX_CT()), M(0xA85AC8, DPX_CT())];
var spots = [[-30, 22], [30, 22], [-60, 24], [60, 24], [-60, -38], [60, -38], [-30, -34], [30, -34], [-46, 30], [46, 30]];
spots.forEach(function (q, i) { dpxCoralTree(G, deep, q[0], T, q[1], 5 + R() * 4, 4410 + i, tips[i % 4]); });
if (!lite)
[[-17, 13], [17, 13], [0, 30], [-44, 8], [44, 8]].forEach(function (q) { var gl = wGlow(0xFFB060, 14, 0.22); gl.position.set(q[0], T + q[1], 23); G.add(gl); });
dpxPalaceDress(G);
},
function (G, x, y, z, ry, mb, gold) {
var S = new THREE.Group();
S.position.set(x, y, z);
S.rotation.y = ry || 0;
G.add(S);
dpxBox(S, 2.2, 1.2, 2.2, mb, 0, 0.6, 0);
dpxBox(S, 2.6, 0.25, 2.6, gold, 0, 1.3, 0);
dpxBox(S, 2.0, 0.2, 2.0, mb, 0, 1.52, 0);
[[0, 1.9, 0.15, 0.62, 0.55], [0, 2.5, 0.05, 0.56, 0.5], [0, 3.1, 0, 0.5, 0.46]].forEach(function (q) { dpxCyl(S, q[4], q[3], 0.7, mb, q[0], q[1], q[2], 12); });
var t1 = dpxTorus(S, 0.5, 0.32, mb, 0, 1.9, -0.45, 0, Math.PI * 1.2, 12);
t1.rotation.set(0, Math.PI / 2, 0);
var f1 = dpxSph(S, 0.55, mb, -0.45, 2.1, -1.0, 10, 0.25), f2 = dpxSph(S, 0.55, mb, 0.45, 2.1, -1.0, 10, 0.25);
f1.rotation.z = 0.6;
f2.rotation.z = -0.6;
for (var k = 0; k < 4; k++)
dpxTorus(S, 0.5 - k * 0.02, 0.05, gold, 0, 1.75 + k * 0.45, 0.02, Math.PI / 2, null, 14);
dpxCyl(S, 0.62, 0.48, 1.3, mb, 0, 4.05, 0, 12);
dpxSph(S, 0.66, mb, 0, 4.75, 0, 12, 0.55);
dpxSph(S, 0.3, mb, -0.62, 4.7, 0, 8);
dpxSph(S, 0.3, mb, 0.62, 4.7, 0, 8);
var la = dpxCyl(S, 0.16, 0.14, 1.2, mb, -0.78, 4.2, 0.2, 6);
la.rotation.set(-0.5, 0, 0.25);
var ra = dpxCyl(S, 0.16, 0.14, 1.1, mb, 0.82, 4.5, 0.1, 6);
ra.rotation.set(0, 0, -0.15);
dpxCyl(S, 0.14, 0.16, 0.25, mb, 0, 5.15, 0, 8);
dpxSph(S, 0.38, mb, 0, 5.5, 0, 12);
dpxCone(S, 0.3, 0.5, mb, 0, 5.15, 0.18, 8).rotation.x = Math.PI;
dpxCyl(S, 0.4, 0.36, 0.3, gold, 0, 5.88, 0, 12);
for (var c = 0; c < 5; c++) {
var a = c / 5 * Math.PI * 2;
dpxCone(S, 0.08, 0.3, gold, Math.sin(a) * 0.36, 6.15, Math.cos(a) * 0.36, 5);
}
dpxCyl(S, 0.07, 0.07, 6.2, gold, 1.0, 4.4, 0.1, 6);
dpxBox(S, 0.9, 0.1, 0.1, gold, 1.0, 7.4, 0.1);
[-0.42, 0, 0.42].forEach(function (o, i) { dpxCyl(S, 0.05, 0.05, i === 1 ? 1.0 : 0.75, gold, 1.0 + o, i === 1 ? 7.95 : 7.8, 0.1, 5); dpxCone(S, 0.11, 0.3, gold, 1.0 + o, i === 1 ? 8.6 : 8.3, 0.1, 5); });
return S;
},
function (G, x, y, z, ry, shell, gold, glows, seed) {
var U = new THREE.Group();
U.position.set(x, y, z);
U.rotation.y = ry || 0;
G.add(U);
var lite = dpxLite();
dpxCyl(U, 0.7, 0.9, 1.1, shell, 0, 0.55, 0, 12);
dpxTorus(U, 0.75, 0.1, gold, 0, 1.1, 0, Math.PI / 2, null, 14);
var geo = DPX.geos.urnShell || (DPX.geos.urnShell = (function () { var g = dpxScallopGeo(1.6, 9); g.userData.shared = true; return g; })());
var lo = dpxAdd(U, geo, shell, 0, 1.2, -0.8);
lo.rotation.x = Math.PI;
lo.scale.y = 0.9;
var up = dpxAdd(U, geo, shell, 0, 1.35, -0.8);
up.rotation.x = -0.9;
var R = wRand(seed || 3);
for (var i = 0; i < (lite ? 3 : 6); i++) {
var ax = (R() - 0.5) * 1.3, az = -0.2 + (R() - 0.3) * 0.8, h = 0.35 + R() * 0.4, m = glows[i % glows.length];
dpxCyl(U, 0.1, 0.14, h, m, ax, 1.3 + h / 2, az, 6);
dpxSph(U, 0.2, m, ax, 1.3 + h, az, 8, 0.6);
if (!lite)
for (var t = 0; t < 6; t++) {
var a = t / 6 * Math.PI * 2;
var tc = dpxCyl(U, 0.025, 0.04, 0.35, m, ax + Math.sin(a) * 0.16, 1.42 + h, az + Math.cos(a) * 0.16, 4);
tc.rotation.set(Math.cos(a) * 0.7, 0, -Math.sin(a) * 0.7);
}
}
dpxSph(U, 0.22, dpxMat(DPX_PAL.pearl, null, { e: 0xC8D0E8, ei: 0.7 }), 0, 1.35, 0.55, 10);
return U;
},
function (G, x, y, z, ry, h, mat) {
var lite = dpxLite(), F = new THREE.Group();
F.position.set(x, y, z);
F.rotation.y = ry || 0;
G.add(F);
dpxCyl(F, 0.12, 0.2, h * 0.25, mat, 0, h * 0.12, 0, 6);
for (var i = 0; i < (lite ? 5 : 9); i++) {
var a = -1.1 + i * 2.2 / ((lite ? 5 : 9) - 1), L = h * (0.55 + 0.3 * Math.cos(a * 1.4));
var b = dpxCyl(F, 0.03, 0.07, L, mat, Math.sin(a) * L * 0.45, h * 0.22 + Math.cos(a) * L * 0.45, 0, 4);
b.rotation.z = -a;
if (!lite) {
var b2 = dpxCyl(F, 0.02, 0.04, L * 0.5, mat, Math.sin(a) * L * 0.75 + Math.sin(a + 0.5) * L * 0.12, h * 0.22 + Math.cos(a) * L * 0.75 + Math.cos(a + 0.5) * L * 0.12, 0, 4);
b2.rotation.z = -(a + 0.5);
}
}
return F;
},
function (G) {
var lite = dpxLite(), M = dpxMat, P = DPX_PAL, T = 3;
var pearlStone = M(P.nacre, "marble"), coral = M(P.coral, DPX_CT()), deep = M(P.coralDeep, DPX_CT()), mb = M(0xF2F0EA, "marble");
var gold = M(P.gold, "metal", { e: 0x5A3A08, ei: 0.55 }), shell = M(0xF4D8CC, "marble"), lamp = M(0xFFF2D8, null, { e: 0xFFD890, ei: 1.0 });
var glows = [M(0xFF6AA8, null, { e: 0xC02A6A, ei: 0.8 }), M(0x6AE8FF, null, { e: 0x1A90B8, ei: 0.8 }), M(0xFFD84A, null, { e: 0xB8800A, ei: 0.8 }), M(0xB08AFF, null, { e: 0x5A2AC8, ei: 0.8 })];
var y0 = T + 0.03;
var rose = dpxCyl(G, 9, 9, 0.06, pearlStone, 0, y0, 34, lite ? 24 : 40);
dpxTorus(G, 9, 0.35, coral, 0, y0 + 0.03, 34, Math.PI / 2, null, lite ? 24 : 40);
dpxTorus(G, 6.2, 0.18, gold, 0, y0 + 0.05, 34, Math.PI / 2, null, lite ? 20 : 32);
for (var r = 0; r < 8; r++) {
var a = r / 8 * Math.PI * 2, L = r % 2 ? 5.5 : 8.4, pt = dpxBox(G, r % 2 ? 0.9 : 1.4, 0.05, L, r % 2 ? deep : coral, Math.sin(a) * L / 2, y0 + 0.06, 34 + Math.cos(a) * L / 2);
pt.rotation.y = a;
}
dpxCyl(G, 1.2, 1.2, 0.1, gold, 0, y0 + 0.08, 34, 16);
[-1, 1].forEach(function (sd) { dpxBox(G, 1.0, 0.05, 22, coral, sd * 17.8, y0, 33); dpxBox(G, 40, 0.05, 1.0, coral, sd * 41, y0, 44.6); dpxBox(G, 0.6, 0.05, 22, deep, sd * 61, y0, 33); });
dpxBox(G, 34, 0.05, 0.8, deep, 0, y0, 23.6);
var pstep = lite ? 4 : 2.4;
[-1, 1].forEach(function (sd) {
for (var x = 20.4; x <= 61.1; x += pstep) {
dpxCyl(G, 0.22, 0.28, 1.0, coral, sd * x, T + 0.5, 45.4, lite ? 6 : 8);
if (!lite)
dpxSph(G, 0.2, pearlStone, sd * x, T + 1.18, 45.4, 8);
}
dpxBox(G, 41, 0.22, 0.5, deep, sd * 40.7, T + 1.05, 45.4);
dpxBox(G, 0.5, 0.22, 46, deep, sd * 61.6, T + 1.05, 22);
for (var z = 0; z <= 44; z += lite ? 6 : 3)
dpxCyl(G, 0.22, 0.28, 1.0, coral, sd * 61.6, T + 0.5, z, lite ? 6 : 8);
});
DPX_KING_STEPS.forEach(function (q, s) {
if (lite && s % 2)
return;
[-1, 1].forEach(function (sd) {
var y = q.top + 1.1, z = (q.z0 + q.z1) / 2;
dpxCyl(G, 0.12, 0.18, 0.9, gold, sd * 18, y + 0.45, z, 6);
dpxSph(G, 0.32, lamp, sd * 18, y + 1.05, z, 10);
dpxTorus(G, 0.34, 0.05, gold, sd * 18, y + 1.05, z, Math.PI / 2, null, 12);
});
});
if (!lite)
[-1, 1].forEach(function (sd) { var gl = wGlow(0xFFD890, 10, 0.18); gl.position.set(sd * 18, 4.5, 50); G.add(gl); });
[-1, 1].forEach(function (sd) {
dpxBox(G, 3.2, 1.2, 3.2, coral, sd * 21.5, 0.6, 57);
dpxBox(G, 3.5, 0.2, 3.5, gold, sd * 21.5, 1.3, 57);
var c = dpxAdd(G, dpxConchGeo(1.4, 4.4), shell, sd * 21.5, 1.5, 57);
c.rotation.set(Math.PI / 2 * 0.9, 0, sd * 0.35);
dpxTorus(G, 1.0, 0.22, M(0xF8C0B0, "marble"), sd * 21.5 + sd * 0.3, 1.95, 58.9, 0.2, null, 14);
});
[-1, 1].forEach(function (sd) { dpxMerStatue(G, sd * 10.5, T, 25.5, sd * 0.25, mb, gold); });
[[-15, 42], [15, 42], [-22, 30], [22, 30], [-38, 20], [38, 20], [-50, 20], [50, 20]].forEach(function (q, i) { if (lite && i > 5)
return; dpxClamUrn(G, q[0], T, q[1], Math.atan2(-q[0], 12) * 0.6, shell, gold, glows, 5100 + i); });
var fans = [M(0xE8506A, DPX_CT()), M(0xA85AC8, DPX_CT()), M(0xF8A04A, DPX_CT())];
[[-27, 36], [27, 36], [-34, 40], [34, 40], [-44, 38], [44, 38], [-55, 34], [55, 34], [-56, -44], [56, -44]].forEach(function (q, i) { if (lite && i % 2)
return; dpxSeaFan(G, q[0], T, q[1], i * 0.7, 3.2 + (i % 3) * 0.8, fans[i % 3]); });
[[-31, 40], [31, 40], [-48, 30], [48, 30]].forEach(function (q, i) {
var bed = dpxCyl(G, 2.6, 2.8, 0.4, deep, q[0], T + 0.2, q[1], 14);
var R = wRand(5300 + i);
for (var k = 0; k < (lite ? 5 : 12); k++) {
var a = R() * 6.28, d = R() * 2.1, m = glows[(k + i) % 4], h = 0.3 + R() * 0.5, x = q[0] + Math.sin(a) * d, z = q[1] + Math.cos(a) * d;
dpxCyl(G, 0.09, 0.13, h, m, x, T + 0.4 + h / 2, z, 5);
dpxSph(G, 0.18, m, x, T + 0.4 + h, z, 7, 0.6);
}
});
var silk = M(0x2E7A5A, null, { side: 1, e: 0x0E3A2A, ei: 0.4 }), trim = M(P.gold, "metal", { side: 1, e: 0x5A3A08, ei: 0.5 });
[-20.25, -13.5, 13.5, 20.25].forEach(function (x) {
var b = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 12), silk);
b.position.set(x, T + 22.5, 21.9);
G.add(b);
var tail = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.6, 3), silk);
tail.rotation.set(Math.PI, 0, 0);
tail.scale.z = 0.05;
tail.position.set(x, T + 15.7, 21.9);
G.add(tail);
dpxCyl(G, 0.12, 0.12, 3.2, gold, x, T + 28.6, 22.0, 6).rotation.z = Math.PI / 2;
var em = dpxAdd(G, DPX.geos.urnShell || dpxScallopGeo(1.6, 9), trim, x, T + 22.4, 21.95);
em.rotation.x = -Math.PI / 2;
em.rotation.z = Math.PI;
em.scale.set(0.6, 0.6, 0.6);
});
},
function (G) {
var lite = dpxLite(), T = 3, shell = dpxMat(0xF4D8CC, "marble"), coral = dpxMat(DPX_PAL.coral, DPX_CT()), gold = dpxMat(DPX_PAL.gold, "metal", { e: 0x5A3A08, ei: 0.55 });
var water = dpxMat(0x9AE0F0, null, { op: 0.45 }), pearl = dpxMat(0xF8F6FF, null, { e: 0xC8D0E8, ei: 0.9 }), bub = dpxMat(0xDFF8FF, null, { op: 0.5, e: 0x8AD8F0, ei: 0.6 });
var bg = DPX.geos.bubble || (DPX.geos.bubble = (function () { var g = new THREE.SphereGeometry(0.12, 8, 6); g.userData.shared = true; return g; })());
var all = [];
[-1, 1].forEach(function (sd) {
var x = sd * 15, z = 34;
dpxCyl(G, 3.4, 3.7, 0.9, coral, x, T + 0.45, z, lite ? 14 : 24);
dpxTorus(G, 3.45, 0.22, gold, x, T + 0.92, z, Math.PI / 2, null, lite ? 18 : 30);
dpxCyl(G, 3.1, 3.1, 0.1, water, x, T + 0.8, z, lite ? 14 : 24);
dpxCyl(G, 0.35, 0.6, 2.4, coral, x, T + 2.0, z, 10);
var geo = DPX.geos.urnShell || (DPX.geos.urnShell = (function () { var g = dpxScallopGeo(1.6, 9); g.userData.shared = true; return g; })());
for (var k = 0; k < 3; k++) {
var s = dpxAdd(G, geo, shell, x, T + 3.1, z);
s.rotation.y = k * Math.PI * 2 / 3;
s.scale.set(1.1, 0.6, 1.1);
}
dpxSph(G, 0.55, pearl, x, T + 3.6, z, 14);
for (var i = 0; i < (lite ? 8 : 20); i++) {
var b = new THREE.Mesh(bg, bub);
b.userData.ph = i / (lite ? 8 : 20);
b.userData.a = i * 2.4;
b.userData.x = x;
b.userData.z = z;
G.add(b);
all.push(b);
}
});
G.userData.ldAnim = function (m, t) {
for (var i = 0; i < all.length; i++) {
var b = all[i], u = b.userData, f = (t * 0.12 + u.ph) % 1, r = 0.3 + f * 0.9;
b.position.set(u.x + Math.sin(u.a + t * 0.4) * r, T + 3.9 + f * 9, u.z + Math.cos(u.a + t * 0.4) * r);
b.scale.setScalar(0.6 + f * 1.2);
}
};
return true;
},
function (G) {
var lite = dpxLite(), geo = DPX.geos.scallop || (DPX.geos.scallop = (function () { var g = dpxScallopGeo(2.6, 9); g.userData.shared = true; return g; })());
var lid = dpxMat(0xF0C8B8, "marble", { side: 1 }), base = dpxMat(0xE8B0A0, "marble", { side: 1 }), pearl = dpxMat(0xF8F6FF, null, { e: 0xC8D0E8, ei: 0.8 });
var pg = DPX.geos.pearl || (DPX.geos.pearl = (function () { var g = new THREE.SphereGeometry(0.55, 12, 8); g.userData.shared = true; return g; })());
var shells = [], nx = lite ? 4 : 6, nz = lite ? 3 : 5;
for (var ix = 0; ix < nx; ix++)
for (var iz = 0; iz < nz; iz++) {
var x = -22 + ix * 44 / (nx - 1), z = -24 + iz * 40 / (nz - 1), S = new THREE.Group();
S.position.set(x, 33.6, z);
S.rotation.y = (ix + iz) % 2 ? 0.4 : -0.4;
var b = new THREE.Mesh(geo, base);
b.rotation.x = Math.PI;
b.scale.y = 0.6;
S.add(b);
var top = new THREE.Group();
top.position.z = 0;
var l = new THREE.Mesh(geo, lid);
top.add(l);
S.add(top);
var p = new THREE.Mesh(pg, pearl);
p.position.set(0, 0.4, 1.1);
S.add(p);
S.userData.ph = ix * 0.9 + iz * 1.7;
S.userData.lid = top;
shells.push(S);
G.add(S);
}
G.userData.ldAnim = function (m, t) { for (var i = 0; i < shells.length; i++) {
var s = shells[i];
s.userData.lid.rotation.x = -0.15 - 0.55 * (0.5 + 0.5 * Math.sin(t * 0.5 + s.userData.ph));
} };
return true;
},
function (G, shape, cols, n, seed, y) {
var R = wRand(seed), lite = dpxLite(), pts = shape.getPoints(24), minx = 1e9, maxx = -1e9, minz = 1e9, maxz = -1e9;
pts.forEach(function (p) { minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x); minz = Math.min(minz, p.y); maxz = Math.max(maxz, p.y); });
function inside(x, z) { var c = false; for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
var a = pts[i], b = pts[j];
if (((a.y > z) !== (b.y > z)) && (x < (b.x - a.x) * (z - a.y) / (b.y - a.y) + a.x))
c = !c;
} return c; }
var cone = DPX.geos.bloom2 || (DPX.geos.bloom2 = (function () {
var g = new THREE.CircleGeometry(0.2, 20), p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), r = Math.hypot(x, y), a = Math.atan2(y, x), k = 0.5 + 0.5 * Math.abs(Math.cos(a * 2.5));
p.setXYZ(i, x * k, y * k, r * r * 2.2);
}
g.rotateX(-Math.PI / 2);
g.translate(0, 0.55, 0);
g.computeVertexNormals();
g.userData.shared = true;
return g;
})());
var stem = DPX.geos.stem || (DPX.geos.stem = (function () { var g = new THREE.CylinderGeometry(0.03, 0.04, 0.55, 4); g.translate(0, 0.27, 0); g.userData.shared = true; return g; })());
var want = lite ? Math.ceil(n * 0.5) : n, per = {}, o = new THREE.Object3D(), tries = 0, made = 0;
while (made < want && tries < want * 6) {
tries++;
var x = minx + R() * (maxx - minx), z = minz + R() * (maxz - minz);
if (!inside(x, z))
continue;
made++;
var c = cols[(R() * cols.length) | 0];
(per[c] || (per[c] = [])).push([x, z, 0.8 + R() * 0.7]);
}
Object.keys(per).forEach(function (c) {
var L = per[c], fm = new THREE.InstancedMesh(cone, dpxMat(+c, null, { e: +c, ei: 0.25, side: 1 }), L.length), sm = new THREE.InstancedMesh(stem, dpxMat(DPX_PAL.kelp), L.length);
L.forEach(function (q, i) { o.position.set(q[0], y || 0, -q[1]); o.rotation.set(0, i, 0); o.scale.setScalar(q[2]); o.updateMatrix(); fm.setMatrixAt(i, o.matrix); sm.setMatrixAt(i, o.matrix); });
G.add(sm);
G.add(fm);
});
},
function (G, shape, col, flowers, seed) {
var rim = dpxMat(0xE8DCC8, DPX_CT()), soil = dpxMat(0x6A4A30, "earth");
var s = dpxSlab(G, shape, 0.5, rim, 0, 0.25, 0);
s.rotation.x = -Math.PI / 2;
s.scale.set(1.08, 1.08, 1);
s.position.y = 0.12;
var top = dpxSlab(G, shape, 0.4, soil, 0, 0.32, 0);
top.rotation.x = -Math.PI / 2;
dpxFlowers(G, shape, flowers, 140, seed, 0.55);
},
function (kind) {
var s = new THREE.Shape();
if (kind === "sun") {
s.absarc(0, 0, 7, 0, Math.PI * 2, false);
return s;
}
if (kind === "whale") {
s.moveTo(-9, 0);
s.bezierCurveTo(-8, 5, 4, 6, 8, 2);
s.bezierCurveTo(9, 1, 10, 0, 12, 3);
s.lineTo(13, 4.5);
s.lineTo(11.5, 0);
s.lineTo(13, -4.5);
s.lineTo(12, -3);
s.bezierCurveTo(10, 0, 9, -1, 8, -2);
s.bezierCurveTo(4, -5, -8, -4, -9, 0);
return s;
}
if (kind === "mermaid") {
s.moveTo(0, 8);
s.absarc(0, 7, 1.6, Math.PI / 2, Math.PI * 2.5, false);
s.moveTo(-2, 5);
s.bezierCurveTo(-3, 2, -2.5, -2, -1, -5);
s.lineTo(-4, -8);
s.lineTo(0, -6.5);
s.lineTo(4, -8);
s.lineTo(1, -5);
s.bezierCurveTo(2.5, -2, 3, 2, 2, 5);
s.lineTo(-2, 5);
return s;
}
if (kind === "star") {
for (var i = 0; i < 10; i++) {
var r = i % 2 ? 3.4 : 8, a = Math.PI / 2 + i * Math.PI / 5;
if (i)
s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
else
s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
}
return s;
}
if (kind === "shell") {
s.moveTo(0, -6);
for (var j = 0; j <= 12; j++) {
var b = -Math.PI * 0.4 + j / 12 * Math.PI * 0.8, rr = 8 + (j % 2) * 0.8;
s.lineTo(Math.sin(b) * rr, -6 + Math.cos(b) * rr);
}
s.lineTo(0, -6);
return s;
}
s.moveTo(0, 8);
s.bezierCurveTo(3, 8, 4, 6, 3, 4);
s.lineTo(6, 4.6);
s.lineTo(6, 3.4);
s.lineTo(3, 3);
s.bezierCurveTo(5, 0, 4, -4, 1, -5);
s.bezierCurveTo(-1, -6, -1, -8, 1, -8.5);
s.bezierCurveTo(3, -9, 3, -7, 1.6, -7);
s.bezierCurveTo(0.5, -7, 0.6, -6, 1.4, -6);
s.bezierCurveTo(-2, -5, -2, -1, -1, 2);
s.bezierCurveTo(-2, 5, -2, 8, 0, 8);
return s;
},
function (G) {
var mb = dpxMat(0xF2F0EA, "marble");
dpxBox(G, 1.6, 1.4, 1.6, mb, 0, 0.7, 0);
dpxBox(G, 1.9, 0.2, 1.9, mb, 0, 1.45, 0);
dpxCyl(G, 0.17, 0.15, 1.0, mb, -0.18, 2.05, 0, 8);
dpxCyl(G, 0.17, 0.15, 1.0, mb, 0.18, 2.05, 0, 8);
dpxCyl(G, 0.36, 0.3, 1.0, mb, 0, 3.0, 0, 10);
dpxSph(G, 0.38, mb, 0, 3.35, 0, 10, 0.8);
dpxCyl(G, 0.1, 0.1, 0.9, mb, -0.48, 3.0, 0.1, 6).rotation.z = 0.25;
var arm = dpxCyl(G, 0.1, 0.1, 0.9, mb, 0.5, 3.4, 0.25, 6);
arm.rotation.set(-0.9, 0, -0.3);
dpxCyl(G, 0.09, 0.1, 0.2, mb, 0, 3.7, 0, 6);
dpxSph(G, 0.26, mb, 0, 4.0, 0, 12);
dpxSph(G, 0.27, mb, 0, 4.09, -0.04, 10, 0.6);
},
function (G, x, z) {
var bark = dpxMat(0x6A3A3A, "bark"), leaf = dpxMat(0xF06A8A, null, { e: 0x501020, ei: 0.4 }), lite = dpxLite();
dpxCyl(G, 0.35, 0.55, 6, bark, x, 3, z, 8);
for (var i = 0; i < (lite ? 10 : 22); i++) {
var a = i / (lite ? 10 : 22) * Math.PI * 2, r = 1.2 + (i % 3) * 0.6;
var c = dpxCyl(G, 0.06, 0.12, 4.5, leaf, x + Math.sin(a) * r, 4.4, z + Math.cos(a) * r, 4);
c.rotation.set(Math.cos(a) * 0.25, 0, -Math.sin(a) * 0.25);
}
dpxSph(G, 2.4, leaf, x, 6.6, z, 12, 0.55);
},
function (G, col, seed) {
var shell = dpxMat(col, "marble"), rim = dpxMat(0x8A5A4A, DPX_CT()), glow = dpxMat(0xFFE0A0, null, { e: 0xC89040, ei: 0.8 }), dark = dpxMat(0x2A1A18);
dpxCyl(G, 6.6, 7, 2, dpxMat(0xC8B8A0, DPX_CT()), 0, -0.2, 0, 16);
var c = dpxAdd(G, dpxConchGeo(6.4, 17), shell, 0, 0.8, 0);
c.rotation.y = seed;
dpxConchSeam(G, 6.4, 17, rim, 0.8);
var lip = dpxTorus(G, 4.2, 0.9, dpxMat(0xF8C8C0, "marble"), 0, 2.6, 3.4, 0.25, Math.PI * 1.1, 16);
lip.rotation.y = 0;
lip.rotation.z = -0.1;
for (var k = 0; k < 7; k++) {
var ka = k / 7 * Math.PI * 2;
dpxCone(G, 0.5, 1.6, shell, Math.cos(ka) * 5.6, 5.8, Math.sin(ka) * 5.6, 6).rotation.set(Math.sin(ka) * 0.9, 0, -Math.cos(ka) * 0.9);
}
var R = wRand(seed * 97 + 3);
for (var i = 0; i < 4; i++) {
var a = R() * 6.283, y = 4 + i * 2.6, r = 6.2 * (1 - (y - 0.8 - 4.25) / 12.75) + 0.1;
if (Math.abs(a - 0) < 0.6)
a += 1.2;
dpxCyl(G, 0.55, 0.55, 0.12, glow, Math.sin(a) * r, y, Math.cos(a) * r, 10).rotation.set(Math.PI / 2, 0, -a);
}
dpxFlat(G, dpxRound(2.8, 3.8), rim, 0, 0.8, 6.05);
dpxFlat(G, dpxRound(2.2, 3.4), dark, 0, 0.8, 6.12);
dpxTorus(G, 1.5, 0.18, rim, 0, 3.0, 6.1, 0, Math.PI, 12);
},
function (G, col, seed) {
var wall = dpxMat(col, DPX_CT()), trim = dpxMat(0x9A4A40, DPX_CT()), glow = dpxMat(0xFFE0A0, null, { e: 0xC89040, ei: 0.8 }), dark = dpxMat(0x2A1A18), pearl = dpxMat(DPX_PAL.pearl, "marble");
dpxCyl(G, 7.4, 7.6, 1.6, dpxMat(0xC8B8A0, DPX_CT()), 0, 0, 0, 18);
dpxCyl(G, 7, 7, 3, wall, 0, 2.2, 0, dpxLite() ? 14 : 22);
dpxDome(G, 7, wall, 0, 3.7, 0, dpxLite() ? 14 : 22, 0.85);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2;
dpxSph(G, 0.8, trim, Math.sin(a) * 7.05, 3.7, Math.cos(a) * 7.05, 8, 0.7);
}
[0.9, 2.2, -0.9, -2.2, 3.1].forEach(function (a) { dpxCyl(G, 0.7, 0.7, 0.14, glow, Math.sin(a) * 7.02, 2.4, Math.cos(a) * 7.02, 12).rotation.set(Math.PI / 2, 0, -a); });
dpxFlat(G, dpxRound(2.6, 3.6), trim, 0, 0.8, 7.02);
dpxFlat(G, dpxRound(2.0, 3.2), dark, 0, 0.8, 7.08);
dpxCyl(G, 0.7, 0.8, 4, wall, 3, 8.5, -2, 10);
dpxTorus(G, 0.72, 0.16, trim, 3, 10.5, -2, Math.PI / 2, null, 12);
dpxSph(G, 0.6, pearl, 0, 9.8, 0, 10);
},
function (G, col, seed) {
var geo = dpxScallopGeo(8, 11), sh = dpxMat(col, "marble", { side: 1 }), base = dpxMat(0xC8B8A0, DPX_CT()), glow = dpxMat(0xFFE0A0, null, { e: 0xC89040, ei: 0.8 }), dark = dpxMat(0x2A1A18), pearl = dpxMat(DPX_PAL.pearl, "marble");
dpxCyl(G, 7, 7.2, 1.6, base, 0, 0, 0, 18);
var lo = dpxAdd(G, geo, sh, 0, 1.0, -4.5);
lo.rotation.x = Math.PI;
lo.scale.set(1, 1.6, 1);
lo.position.y = 1.6;
var up = dpxAdd(G, geo, sh, 0, 4.6, -4.5);
up.rotation.x = -0.22;
up.scale.set(1, 1.2, 1);
dpxCyl(G, 5.4, 5.4, 4, dpxMat(0xE8D8C8, "plaster"), 0, 3, 0.5, 18, false);
dpxFlat(G, dpxRound(2.6, 3.4), dpxMat(0x8A5A4A, DPX_CT()), 0, 1, 5.92);
dpxFlat(G, dpxRound(2.0, 3.0), dark, 0, 1, 5.98);
[-3.2, 3.2].forEach(function (x) { dpxCyl(G, 0.6, 0.6, 0.12, glow, x, 3, 4.75, 12).rotation.x = Math.PI / 2; });
dpxSph(G, 1.0, pearl, 0, 6.6, -2.6, 12);
},
function (G) {
var rock = dpxMat(0x4A4E4C, DPX_CT()), bone = dpxMat(DPX_PAL.bone, DPX_CT()), glow = dpxMat(0x7AF0A0, null, { e: 0x30A050, ei: 0.9 }), dark = dpxMat(0x101814);
dpxCyl(G, 15, 16, 3, dpxMat(0x3A3E3C, DPX_CT()), 0, 0, 0, 20);
dpxDome(G, 13, rock, 0, 1, 0, dpxLite() ? 14 : 24, 0.8);
for (var i = 0; i < 7; i++) {
var z = -10 + i * 3.4, r = 13.6 - Math.abs(i - 3) * 1.1;
dpxTorus(G, r, 0.55, bone, 0, 1, z, 0, Math.PI, dpxLite() ? 12 : 20);
}
dpxTorus(G, 4, 0.7, bone, 0, 1, 12.8, 0, Math.PI, 16);
dpxTorus(G, 3.2, 0.45, bone, 0, 1, 13.4, 0, Math.PI, 14);
dpxFlat(G, dpxRound(3.4, 4.4), dark, 0, 1, 12.95);
[[-6, 4, 10.9, -0.5], [6, 4, 10.9, 0.5], [-10, 5, 4, -1.1], [10, 5, 4, 1.1]].forEach(function (q) { dpxCyl(G, 0.9, 0.9, 0.2, glow, q[0], q[1], q[2], 12).rotation.set(Math.PI / 2, 0, -q[3]); });
dpxCyl(G, 0.9, 1.4, 6, rock, -5, 10.5, -3, 8);
var gl = wGlow(0x7AF0A0, 8, 0.25);
gl.position.set(-5, 14, -3);
G.add(gl);
},
function (G, x, z, s, seed) {
var R = wRand(seed), stalk = dpxMat(0x6A7A60, "bark"), arm = dpxMat(0x8A9A70), lite = dpxLite();
var h = (5 + R() * 5) * s;
dpxCyl(G, 0.25 * s, 0.5 * s, h, stalk, x, h / 2, z, 6);
dpxSph(G, 1.0 * s, dpxMat(0x9AA870), x, h, z, 10, 0.28);
for (var i = 0; i < (lite ? 3 : 6); i++) {
var a = i / 6 * Math.PI * 2 + R(), L = (2.4 + R() * 2) * s, c = dpxCyl(G, 0.05 * s, 0.12 * s, L, arm, x + Math.sin(a) * L * 0.42, h + 0.2 + L * 0.2, z + Math.cos(a) * L * 0.42, 4);
c.rotation.set(Math.cos(a) * 1.1, 0, -Math.sin(a) * 1.1);
}
},
function (G) {
var m = dpxMat(0x9AB8C0, null, { op: 0.28, side: 1 }), m2 = dpxMat(0xC8D8D8, null, { op: 0.18, side: 1 }), lite = dpxLite();
var f = new THREE.Group();
G.add(f);
var cone = new THREE.Mesh(new THREE.CylinderGeometry(9, 0.6, 14, lite ? 12 : 20, 4, true), m);
cone.position.y = 7;
f.add(cone);
for (var i = 0; i < (lite ? 3 : 6); i++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(1.4 + i * 1.3, 0.08, 4, lite ? 16 : 28, Math.PI * 1.4), m2);
t.rotation.x = Math.PI / 2;
t.position.y = 1 + i * 2.2;
t.rotation.z = i * 0.9;
f.add(t);
}
if (typeof particles === "function" && !lite) {
var p = particles(70, [14, 12, 14], 0xD8E8E8, 1.1, 0.55);
p.position.y = 6;
f.add(p);
}
f.userData.ldAnim = function (o, t, dt) { o.rotation.y += dt * 0.7; };
return true;
},
function (G, n, r, col, seed) {
var lite = dpxLite(), k = lite ? Math.ceil(n / 2) : n, R = wRand(seed);
var geo = DPX.geos.fish || (DPX.geos.fish = (function () {
var b = new THREE.SphereGeometry(0.22, 6, 4);
b.scale(0.45, 0.7, 1.4);
var t = new THREE.ConeGeometry(0.2, 0.35, 4);
t.rotateX(-Math.PI / 2);
t.translate(0, 0, -0.42);
var g = (typeof THREE.BufferGeometryUtils !== "undefined" && THREE.BufferGeometryUtils.mergeBufferGeometries) ? THREE.BufferGeometryUtils.mergeBufferGeometries([b.toNonIndexed(), t.toNonIndexed()]) : b;
g.userData.shared = true;
return g;
})());
var im = new THREE.InstancedMesh(geo, dpxMat(col, null, { e: col, ei: 0.2 }), k), o = new THREE.Object3D(), fish = [];
for (var i = 0; i < k; i++)
fish.push({ a: R() * 6.283, r: r * (0.5 + R() * 0.5), y: (R() - 0.5) * r * 0.5, sp: 0.25 + R() * 0.2 });
function place(t) { for (var i = 0; i < k; i++) {
var f = fish[i], a = f.a + t * f.sp;
o.position.set(Math.cos(a) * f.r, f.y + Math.sin(t * 0.7 + i) * 0.4, Math.sin(a) * f.r);
o.rotation.set(0, -a, 0);
o.updateMatrix();
im.setMatrixAt(i, o.matrix);
} im.instanceMatrix.needsUpdate = true; }
place(0);
im.frustumCulled = false;
G.add(im);
G.userData.ldAnim = function (m, t) { place(t); };
return true;
},
function (G, H, r0, r1, mat, lift, segA) {
var n = segA || (dpxLite() ? 48 : 96), rs = Math.max(1, Math.ceil((r1 - r0) / 12)), pos = [], uv = [], idx = [];
for (var i = 0; i <= n; i++) {
var a = i / n * Math.PI * 2, s = Math.sin(a), c = Math.cos(a);
for (var j = 0; j <= rs; j++) {
var r = r0 + (r1 - r0) * j / rs, x = s * r, z = c * r;
pos.push(x, H.y(x, z) + lift, z);
uv.push(a * r1 / 4, r / 4);
}
}
for (var i2 = 0; i2 < n; i2++)
for (var j2 = 0; j2 < rs; j2++) {
var a0 = i2 * (rs + 1) + j2, b0 = (i2 + 1) * (rs + 1) + j2;
idx.push(a0, a0 + 1, b0, b0, a0 + 1, b0 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
G.add(m);
return m;
},
function (G, H, x0, z0, x1, z1, w, mat, lift) {
var L = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.ceil(L / 8)), dx = (x1 - x0) / L, dz = (z1 - z0) / L, nx = -dz * w / 2, nz = dx * w / 2, pos = [], uv = [], idx = [];
for (var i = 0; i <= n; i++) {
var x = x0 + (x1 - x0) * i / n, z = z0 + (z1 - z0) * i / n;
pos.push(x + nx, H.y(x + nx, z + nz) + lift, z + nz, x - nx, H.y(x - nx, z - nz) + lift, z - nz);
uv.push(0, i * L / n / 4, w / 4, i * L / n / 4);
if (i) {
var b = (i - 1) * 2;
idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
G.add(m);
return m;
},
function (G, H, ox, oz, r, h, thick, mat, cap, gaps, gapW, tower, towerMat) {
var seg = dpxLite() ? 10 : 6, n = Math.ceil(Math.PI * 2 * r / seg), half = Math.asin(Math.min(1, gapW / 2 / r));
var RB = wRand(Math.round(r * 7));
for (var i = 0; i < n; i++) {
var a = (i + 0.5) / n * Math.PI * 2;
if (gaps && dpxGapAt(a, gaps, half))
continue;
var x = Math.sin(a) * r, z = Math.cos(a) * r, y = H.y(x, z), L = Math.PI * 2 * r / n + 0.15;
if (!window.DXU_OFF && RB() < 0.07 && !(tower && i % tower === 0)) {
for (var rb = 0; rb < (dpxLite() ? 2 : 5); rb++) {
var bx = x + Math.sin(a + 1.57) * (RB() - 0.5) * L + Math.sin(a) * (RB() * 6 - 1), bz = z + Math.cos(a + 1.57) * (RB() - 0.5) * L + Math.cos(a) * (RB() * 6 - 1);
var blk = dpxBox(G, 1.4 + RB() * 2, 0.9 + RB() * 1.2, thick * (0.8 + RB() * 0.6), mat, bx, H.y(bx, bz) + 0.4, bz, a + RB());
blk.rotation.x = RB() * 0.8 - 0.4;
blk.rotation.z = RB() * 0.8 - 0.4;
}
var stub = dpxBox(G, L, 1.2 + RB() * 2, thick, mat, x, y + 0.3, z, a);
continue;
}
var b = dpxBox(G, L, h + 3, thick, mat, x, y + h / 2 - 1.5, z, a);
if (cap) {
dpxBox(G, L, 0.5, thick + 0.6, cap, x, y + h + 0.25, z, a);
if (!dpxLite() && i % 2 === 0) {
var m = dpxBox(G, 1.4, 1.1, thick + 0.2, cap, x, y + h + 1.05, z, a);
}
}
if (typeof LD !== "undefined")
LD.solids.push({ x: ox + x, z: oz + z, rot: a, hw: L / 2, hd: thick / 2 + 0.2, h: h });
if (tower && i % tower === 0) {
var t = dpxCyl(G, thick * 1.3, thick * 1.45, h + 6, towerMat || mat, x, y + (h + 6) / 2 - 1.5, z, 10);
dpxCone(G, thick * 1.6, 4, cap || mat, x, y + h + 6.4, z, 10);
if (typeof LD !== "undefined")
LD.solids.push({ x: ox + x, z: oz + z, r: thick * 1.45, h: h + 6 });
}
}
if (gaps)
gaps.forEach(function (g) {
[-1, 1].forEach(function (sd) {
var a = g + sd * (half + 0.012), x = Math.sin(a) * r, z = Math.cos(a) * r, y = H.y(x, z);
dpxBox(G, thick * 2.6, h + 9, thick * 2.6, towerMat || mat, x, y + (h + 9) / 2 - 1.5, z, a);
dpxBox(G, thick * 2.9, 0.6, thick * 2.9, cap || mat, x, y + h + 7.8, z, a);
if (typeof LD !== "undefined")
LD.solids.push({ x: ox + x, z: oz + z, rot: a, hw: thick * 1.3, hd: thick * 1.3, h: h + 9 });
});
});
},
function (G, H, ox, oz, r, gaps, gapW) {
var cols = [dpxMat(0xECE6DA, "stone"), dpxMat(0x3A3634, "stone"), dpxMat(0xA8442E, "stone")], seg = dpxLite() ? 12 : 8, n = Math.ceil(Math.PI * 2 * r / seg), half = Math.asin(Math.min(1, gapW / 2 / r));
for (var i = 0; i < n; i++) {
var a = (i + 0.5) / n * Math.PI * 2;
if (dpxGapAt(a, gaps, half))
continue;
var x = Math.sin(a) * r, z = Math.cos(a) * r, y = H.y(x, z), L = Math.PI * 2 * r / n + 0.1;
dpxBox(G, L, 2.4, 0.9, cols[i % 3], x, y, z, a);
if (typeof LD !== "undefined")
LD.solids.push({ x: ox + x, z: oz + z, rot: a, hw: L / 2, hd: 0.6, h: 1.2 });
}
},
function (G, H, a, r0, r1, w, stone, trim) {
var s = Math.sin(a), c = Math.cos(a), mid = (r0 + r1) / 2, L = r1 - r0 + 4, x = s * mid, z = c * mid, y = Math.max(H.y(s * r0, c * r0), H.y(s * r1, c * r1));
dpxBox(G, w, 1.2, L, stone, x, y + 0.75, z, a);
[-1, 1].forEach(function (sd) { var px = x + c * sd * (w / 2 - 0.25), pz = z - s * sd * (w / 2 - 0.25); dpxBox(G, 0.5, 1.1, L, trim, px, y + 1.9, pz, a); });
for (var k = 0; k < 3; k++) {
var rr = r0 + 2 + k * (r1 - r0 - 4) / 2;
var p = dpxCyl(G, 1.2, 1.5, 5, stone, s * rr, y - 2, c * rr, 10);
}
[r0 - 3.5, r1 + 3.5].forEach(function (rr) {
[-1, 1].forEach(function (sd) {
var tx = s * rr + c * sd * (w / 2 + 2.2), tz = c * rr - s * sd * (w / 2 + 2.2), ty = H.y(tx, tz);
dpxBox(G, 4, 13, 4, stone, tx, ty + 5.5, tz, a);
dpxBox(G, 4.6, 0.6, 4.6, trim, tx, ty + 12.3, tz, a);
dpxCone(G, 2.8, 3, trim, tx, ty + 14.1, tz, 4).rotation.y = a + Math.PI / 4;
});
});
},
function (G) {
var lite = dpxLite(), silver = dpxMat(0xD8DCE4, "metal", { e: 0x50545C, ei: 0.6 }), gold = dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.7 }), white = dpxMat(0xF0ECE4, "marble"), orich = dpxMat(0xE8743A, "metal", { e: 0x7A2A08, ei: 0.7 }), dark = dpxMat(0x1A1A22);
dpxBox(G, 34, 2.4, 62, white, 0, -0.4, 0);
for (var s = 0; s < 4; s++)
dpxBox(G, 14, 0.25, 1.2, white, 0, 0.9 - s * 0.3, 31.6 + s * 1.1);
dpxBox(G, 26, 18, 52, silver, 0, 9.8, -1);
var step = lite ? 6 : 4;
for (var x = -15; x <= 15.1; x += step)
[31, -31].forEach(function (z) { dpxCyl(G, 0.75, 0.85, 17, white, x, 9.3, z < 0 ? z + 1 : z - 1.5, 10); dpxCyl(G, 1.1, 0.8, 0.8, gold, x, 18, z < 0 ? z + 1 : z - 1.5, 10); });
for (var z2 = -27; z2 <= 27.1; z2 += step)
[-1, 1].forEach(function (sd) { dpxCyl(G, 0.75, 0.85, 17, white, sd * 15.5, 9.3, z2, 10); dpxCyl(G, 1.1, 0.8, 0.8, gold, sd * 15.5, 18, z2, 10); });
dpxBox(G, 34, 1.6, 62, silver, 0, 19.2, -0.5);
dpxBox(G, 34.4, 0.4, 62.4, gold, 0, 20.1, -0.5);
var sh = new THREE.Shape();
sh.moveTo(-17, 0);
sh.lineTo(17, 0);
sh.lineTo(0, 9);
sh.lineTo(-17, 0);
var roof = dpxSlab(G, sh, 62, silver, 0, 20.3, -0.5);
for (var p = -28; p <= 28.1; p += lite ? 14 : 7) {
dpxCone(G, 0.9, 5, gold, 0, 31.5, p, 8);
dpxSph(G, 0.6, gold, 0, 29.4, p, 8);
}
[[-16, 30], [16, 30], [-16, -31], [16, -31]].forEach(function (q) { dpxCone(G, 1.0, 6, gold, q[0], 23.3, q[1], 8); });
var tri = new THREE.Group();
tri.position.set(0, 23.5, 30.6);
G.add(tri);
dpxBox(tri, 0.35, 6, 0.2, gold, 0, 0, 0);
[-1, 0, 1].forEach(function (k) { dpxCone(tri, 0.4, 1.4, gold, k * 1.1, 3.4, 0, 6); });
dpxBox(tri, 2.6, 0.3, 0.2, gold, 0, 2.6, 0);
dpxFlat(G, dpxRound(7, 12), orich, 0, 1, 25.05);
dpxFlat(G, dpxRound(5.6, 10.8), dark, 0, 1, 25.1);
dpxFlat(G, dpxRound(2.6, 10), silver, -1.4, 1, 25.15);
dpxFlat(G, dpxRound(2.6, 10), silver, 1.4, 1, 25.15);
if (!lite) {
var gl = wGlow(0xE8E8FF, 40, 0.12);
gl.position.set(0, 32, 0);
G.add(gl);
}
},
function (G, H, w, d, gapZ) {
var gold = dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.7 }), step = dpxLite() ? 4 : 2.5;
function post(x, z) { var y = H.y(x, z); dpxCyl(G, 0.12, 0.12, 2.6, gold, x, y + 1.3, z, 6); dpxSph(G, 0.22, gold, x, y + 2.7, z, 8); }
for (var x = -w / 2; x <= w / 2 + 0.01; x += step) {
post(x, -d / 2);
if (Math.abs(x) > 5)
post(x, d / 2);
}
for (var z = -d / 2 + step; z < d / 2; z += step) {
post(-w / 2, z);
post(w / 2, z);
}
[[0, -d / 2, w], [-w / 2 + (w / 2 - 5) / 2 - 0.0, d / 2, w / 2 - 5], [w / 2 - (w / 2 - 5) / 2, d / 2, w / 2 - 5]].forEach(function (q, i) { if (i === 0) {
dpxBox(G, q[2], 0.12, 0.12, gold, q[0], H.y(q[0], q[1]) + 2.2, q[1]);
}
else {
dpxBox(G, q[2], 0.12, 0.12, gold, q[0], H.y(q[0], q[1]) + 2.2, q[1]);
} });
[-1, 1].forEach(function (sd) { var b = dpxBox(G, 0.12, 0.12, d, gold, sd * w / 2, H.y(sd * w / 2, 0) + 2.2, 0); });
},
function (G) {
var lite = dpxLite(), white = dpxMat(0xECE6DA, "stone"), red = dpxMat(0xA8442E, "stone"), black = dpxMat(0x3A3634, "stone"), orich = dpxMat(0xE8743A, "metal", { e: 0x7A2A08, ei: 0.7 }), gold = dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.6 }), dark = dpxMat(0x1A1612), glow = dpxMat(0xFFD890, null, { e: 0xC89040, ei: 0.8 });
dpxBox(G, 44, 2, 34, black, 0, 0, 0);
dpxBox(G, 40, 9, 30, white, 0, 5.5, 0);
dpxBox(G, 40.4, 1, 30.4, red, 0, 10.4, 0);
dpxBox(G, 36, 8, 26, white, 0, 15, 0);
dpxBox(G, 36.4, 0.8, 26.4, orich, 0, 19.2, 0);
for (var b = 0; b < 3; b++)
dpxBox(G, 40.2, 0.5, 30.2, b % 2 ? black : red, 0, 2.5 + b * 2.6, 0);
[[-20, -15], [20, -15], [-20, 15], [20, 15]].forEach(function (q) { dpxBox(G, 7, 24, 7, white, q[0], 12, q[1]); dpxBox(G, 7.6, 1, 7.6, orich, q[0], 24.4, q[1]); dpxBox(G, 6, 3, 6, red, q[0], 26.2, q[1]); dpxCone(G, 4, 5, gold, q[0], 30.2, q[1], 4).rotation.y = Math.PI / 4; });
for (var x = -12; x <= 12.1; x += lite ? 6 : 4) {
dpxCyl(G, 0.6, 0.7, 9, white, x, 5.5, 17.5, 10);
dpxCyl(G, 0.9, 0.6, 0.6, gold, x, 10.2, 17.5, 10);
}
dpxBox(G, 28, 1, 4, orich, 0, 10.9, 17);
var sh = new THREE.Shape();
sh.moveTo(-14, 0);
sh.lineTo(14, 0);
sh.lineTo(0, 4);
sh.lineTo(-14, 0);
dpxSlab(G, sh, 4, red, 0, 11.4, 17);
dpxFlat(G, dpxRound(5, 7), orich, 0, 1, 15.05);
dpxFlat(G, dpxRound(4, 6.4), dark, 0, 1, 15.1);
for (var w = -16; w <= 16.1; w += 4) {
if (Math.abs(w) < 4)
continue;
dpxFlat(G, dpxRound(1.6, 3), glow, w, 4, 15.07);
dpxFlat(G, dpxRound(1.4, 2.6), glow, w * 0.9, 13, 13.07);
}
[-1, 1].forEach(function (sd) { for (var z = -10; z <= 10.1; z += 5) {
dpxFlat(G, dpxRound(1.6, 3), glow, sd * 20.07, 4, z, sd * Math.PI / 2);
} });
},
function (G) {
var white = dpxMat(0xECE6DA, "stone"), red = dpxMat(0xA8442E, "stone"), orich = dpxMat(0xE8743A, "metal", { e: 0x7A2A08, ei: 0.6 }), dark = dpxMat(0x1A1612), glow = dpxMat(0xFFD890, null, { e: 0xC89040, ei: 0.8 });
dpxBox(G, 24, 1.6, 20, red, 0, 0, 0);
dpxBox(G, 22, 8, 18, white, 0, 4.5, 0);
dpxBox(G, 22.4, 0.6, 18.4, orich, 0, 8.7, 0);
dpxCyl(G, 7, 7, 3, white, 0, 10.4, 0, 24);
dpxDome(G, 7, dpxMat(0xD8DCE4, "metal", { e: 0x40444A, ei: 0.5 }), 0, 11.8, 0, 24, 0.7);
dpxSph(G, 0.8, orich, 0, 17, 0, 10);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
dpxCyl(G, 0.7, 0.7, 0.2, glow, Math.sin(a) * 7.05, 10.6, Math.cos(a) * 7.05, 12).rotation.set(Math.PI / 2, 0, -a);
}
dpxFlat(G, dpxRound(4, 6), orich, 0, 0.8, 9.05);
dpxFlat(G, dpxRound(3.2, 5.4), dark, 0, 0.8, 9.1);
if (!dpxLite() && typeof particles === "function") {
var p = particles(40, [3, 10, 3], 0xF0F4F8, 1.6, 0.35);
p.position.set(5, 16, -4);
G.add(p);
}
},
function (G) {
var white = dpxMat(0xECE6DA, "stone"), red = dpxMat(0xA8442E, "stone"), black = dpxMat(0x3A3634, "stone"), roofm = dpxMat(0xB8603A, "tile"), dark = dpxMat(0x1A1612);
dpxBox(G, 28, 1.2, 18, black, 0, 0, 0);
dpxBox(G, 24, 7, 12, white, 0, 4, -1);
for (var x = -13; x <= 13.1; x += dpxLite() ? 5.2 : 2.6) {
dpxCyl(G, 0.4, 0.48, 6.4, white, x, 3.8, 7.2, 8);
}
dpxBox(G, 28, 0.8, 16, red, 0, 7.6, 0);
var sh = new THREE.Shape();
sh.moveTo(-8.5, 0);
sh.lineTo(8.5, 0);
sh.lineTo(0, 3.6);
sh.lineTo(-8.5, 0);
var r = dpxSlab(G, sh, 28, roofm, 0, 8, 0);
r.rotation.y = Math.PI / 2;
dpxFlat(G, dpxRound(3, 4.6), dark, 0, 0.6, 5.06);
},
function (G) {
var white = dpxMat(0xF0ECE4, "marble"), red = dpxMat(0xA8442E, "stone"), gold = dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.6 }), dark = dpxMat(0x1A1612);
dpxBox(G, 13, 1.2, 15, white, 0, 0, 0);
dpxBox(G, 8, 7, 10, white, 0, 4, -1.5);
[-5.2, -1.75, 1.75, 5.2].forEach(function (x) { dpxCyl(G, 0.42, 0.5, 6.6, white, x, 4, 6, 10); });
[-4, 0, 4].forEach(function (z) { [-5.2, 5.2].forEach(function (x) { dpxCyl(G, 0.42, 0.5, 6.6, white, x, 4, z, 10); }); });
dpxBox(G, 12, 1, 14, red, 0, 7.8, 0);
var sh = new THREE.Shape();
sh.moveTo(-6.4, 0);
sh.lineTo(6.4, 0);
sh.lineTo(0, 2.8);
sh.lineTo(-6.4, 0);
dpxSlab(G, sh, 14, white, 0, 8.3, 0);
dpxCone(G, 0.6, 1.8, gold, 0, 11.9, 7, 6);
dpxFlat(G, dpxRound(2.4, 4), dark, 0, 0.6, 3.56);
},
function (G) {
var black = dpxMat(0x3A3634, "stone"), red = dpxMat(0xA8442E, "stone"), bronze = dpxMat(0xB8783A, "metal", { e: 0x3A1A06, ei: 0.5 }), dark = dpxMat(0x1A1612), glow = dpxMat(0xFFD890, null, { e: 0xC89040, ei: 0.8 });
dpxBox(G, 10, 12, 10, black, 0, 5.5, 0);
for (var b = 0; b < 3; b++)
dpxBox(G, 10.2, 0.6, 10.2, red, 0, 2 + b * 3.6, 0);
dpxBox(G, 11, 1, 11, bronze, 0, 12, 0);
for (var i = -1; i <= 1; i++)
[-1, 1].forEach(function (sd) { dpxBox(G, 1.4, 1.2, 0.6, black, i * 3.6, 13.1, sd * 5.2); dpxBox(G, 0.6, 1.2, 1.4, black, sd * 5.2, 13.1, i * 3.6); });
dpxFlat(G, dpxRound(2.4, 3.6), bronze, 0, 0, 5.03);
dpxFlat(G, dpxRound(2, 3.2), dark, 0, 0, 5.08);
dpxFlat(G, dpxRound(1, 1.8), glow, -3, 7, 5.04);
dpxFlat(G, dpxRound(1, 1.8), glow, 3, 7, 5.04);
},
function (G, seed) {
var R = wRand(seed), white = dpxMat([0xF0ECE4, 0xE8DCC8, 0xF0E0D0][seed % 3], "plaster"), red = dpxMat(0xA8442E, "stone"), black = dpxMat(0x3A3634, "stone"), tile = dpxMat(0xB8603A, "tile"), dark = dpxMat(0x1A1612), glow = dpxMat(0xFFD890, null, { e: 0xC89040, ei: 0.8 });
dpxBox(G, 13, 1, 13, black, 0, 0, 0);
dpxBox(G, 12, 6, 12, white, 0, 3.5, 0);
dpxBox(G, 12.2, 0.5, 12.2, red, 0, 1.2, 0);
dpxBox(G, 12.2, 0.4, 12.2, black, 0, 6.3, 0);
var sh = new THREE.Shape();
sh.moveTo(-3.4, 0);
sh.lineTo(3.4, 0);
sh.lineTo(0, 2.2);
sh.lineTo(-3.4, 0);
[-1, 1].forEach(function (sd) { var r = dpxSlab(G, sh, 12.6, tile, sd * 3.2, 6.5, 0); });
dpxBox(G, 4.6, 0.4, 2.6, red, 0, 6.4, 7);
[-1.8, 1.8].forEach(function (x) { dpxCyl(G, 0.25, 0.3, 5, white, x, 3.7, 7.8, 8); });
dpxFlat(G, dpxRound(2, 3.2), dark, 0, 0.5, 6.05);
[-4, 4].forEach(function (x) { dpxFlat(G, dpxRound(1, 1.6), glow, x, 3.4, 6.04); });
if (R() < 0.5) {
dpxCoralTree(G, dpxMat(0x3A7A4A, "bark"), 5.5, 0.5, 7.5, 4, seed + 1, dpxMat(0x7ACA6A));
}
},
function (G) {
var white = dpxMat(0xECE6DA, "stone"), black = dpxMat(0x3A3634, "stone"), tile = dpxMat(0xB8603A, "tile"), hull = dpxMat(0x2A2420, "wood"), dark = dpxMat(0x1A1612), bronze = dpxMat(0xB8783A, "metal", { e: 0x3A1A06, ei: 0.5 });
dpxBox(G, 16, 1, 34, black, 0, 0, 0);
[-1, 1].forEach(function (sd) { dpxBox(G, 1.2, 9, 32, white, sd * 7.4, 5, 0); });
dpxBox(G, 16, 9, 1.2, white, 0, 5, 16);
var sh = new THREE.Shape();
sh.moveTo(-8.4, 0);
sh.lineTo(8.4, 0);
sh.lineTo(0, 4);
sh.lineTo(-8.4, 0);
var r = dpxSlab(G, sh, 34, tile, 0, 9.5, 0);
var h = dpxSph(G, 1, hull, 0, 2.2, 2, 12);
h.scale.set(2.2, 1.5, 12);
dpxCone(G, 0.5, 2.4, bronze, 0, 1.6, -14.2, 8).rotation.x = -Math.PI / 2;
dpxFlat(G, dpxRound(4, 6), dark, 0, 0.5, 16.65);
},
function (G) {
if (!window.DXU_OFF && typeof dxaWreck === "function")
return dxaWreck(G);
var hull = dpxMat(0x2A2420, "wood"), deck = dpxMat(0x6A4A2A, "wood"), bronze = dpxMat(0xB8783A, "metal", { e: 0x3A1A06, ei: 0.5 }), oar = dpxMat(0x8A6A40, "wood"), eye = dpxMat(0xF0ECE4, "plaster"), sail = dpxMat(0xE8DCC0, "plaster", { side: 1 });
var h = dpxSph(G, 1, hull, 0, 1.4, 0, 14);
h.scale.set(2.4, 1.6, 17);
dpxBox(G, 4, 0.25, 30, deck, 0, 2.6, 0);
dpxCone(G, 0.55, 3, bronze, 0, 0.9, 18.2, 8).rotation.x = Math.PI / 2;
var st = dpxCyl(G, 0.3, 0.5, 5, hull, 0, 4.4, -15.6, 8);
st.rotation.x = -0.6;
dpxSph(G, 0.5, eye, 1.6, 2.2, 14.5, 8);
dpxSph(G, 0.5, eye, -1.6, 2.2, 14.5, 8);
dpxCyl(G, 0.2, 0.25, 14, deck, 0, 9.5, 1, 8);
dpxBox(G, 10, 0.25, 0.25, deck, 0, 14.6, 1);
var s = dpxBox(G, 9.6, 7, 0.08, sail, 0, 11, 1.2);
for (var i = 0; i < (dpxLite() ? 8 : 16); i++) {
[-1, 1].forEach(function (sd) { var o = dpxCyl(G, 0.06, 0.06, 5.5, oar, sd * 3.6, 1.4, -12 + i * (dpxLite() ? 3.2 : 1.6), 5); o.rotation.z = sd * 1.2; });
}
},
function (G) {
var gold = dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.6 }), white = dpxMat(0xF0ECE4, "marble"), orich = dpxMat(0xE8743A, "metal", { e: 0x7A2A08, ei: 0.6 });
dpxBox(G, 2.4, 2.2, 2.4, white, 0, 1.1, 0);
dpxBox(G, 2.6, 0.25, 2.6, orich, 0, 2.3, 0);
dpxCyl(G, 0.55, 0.75, 3.2, gold, 0, 4.0, 0, 12);
dpxCyl(G, 0.07, 0.07, 4.2, gold, 0.8, 4.3, 0.2, 6);
dpxSph(G, 0.42, gold, 0, 6.0, 0, 12);
dpxCyl(G, 0.45, 0.4, 0.35, gold, 0, 6.45, 0, 10);
},
function (i) {
var q = DPX_RIDES[i];
if (!q || typeof LD === "undefined" || !LD.g)
return;
try {
var x = LD.ox + q[1], z = LD.oz + q[2], y = (typeof terrainY === "function" ? terrainY(x, z) || 0 : 0) + 1.72;
camera.position.set(x, y, z);
if (typeof yaw !== "undefined")
yaw = 0;
}
catch (e) { }
dpxClose();
dpxSay("🐬 The dolphin sets you down at <b>" + dpxEsc(q[0]) + "</b>.");
},
function (i) {
var t = DPX_TALE[i];
dpxMark("tale" + (i + 1));
var btns = [];
if (i > 0)
btns.push(["◀ The part before", function () { dpxTaleCard(i - 1); }]);
if (i < 9)
btns.push(["The next part ▶", function () { dpxTaleCard(i + 1); }]);
if (dpxCount("tale", 10) >= 10)
btns.push(["Take the story quiz", dpxActMerQuiz]);
btns.push(["Close", dpxClose]);
dpxCard("The Little Mermaid · " + (i + 1) + " of 10: " + t[0], dpxP([t[1], t[2]]) + dpxStamp("tale", 10, "story shells"), btns);
},
function (kind) {
if (kind === "palace")
return dpxCard("The Sea King's chamberlain", dpxP(["Welcome to the Sea King's palace! Every room is open to you. The throne room is at the heart of the ground floor; the ballroom where the merfolk sing is beside it; the princesses' rooms and the grandmother's are up the coral stair.", "Look for the shell book in the library: the whole story of the youngest princess is written in it."]), [["Read the story", dpxActStory], ["Take the story quiz", dpxActMerQuiz], ["Close", dpxClose]]);
if (kind === "temple")
return dpxCard("The temple guide", dpxP(["This is the Temple of Poseidon, as Plato describes it: a stadium long (about 185 metres in his telling; smaller here), silver outside, its roof of ivory inside, worked with gold, silver and orichalcum.", "Find the god in his chariot, the hundred Nereids on dolphins, the pillar of the laws, and the golden kings."]), [["Hear the history", dpxActHistory], ["Take the Atlantis quiz", dpxActAtlQuiz], ["Close", dpxClose]]);
return dpxCard("The palace steward", dpxP(["This is the palace of the ten kings of Atlantis. Plato says each king, generation after generation, added to it, trying to outdo the one before, \"until they made the building a marvel to see for size and beauty.\"", "The hall of the ten kingdoms is ahead; the council room, the robes, and the archives are through the doors."]), [["Hear the history", dpxActHistory], ["The ten kingdoms", dpxActTenKingdoms], ["Close", dpxClose]]);
},
function () { dpxLearn("amber", "The amber windows", ["The windows are pointed and tall, of the clearest amber, just as Andersen wrote. The fish swim in through them the way swallows fly into our houses, and come right up to the princesses to eat out of their hands and be stroked.", "Amber is fossil tree resin, millions of years old. The best of it washes up on the shores of the Baltic Sea, not far from Andersen's Denmark."]); },
function () {
dpxCard("Look up toward the surface", dpxP(["Far, far above, the light of the sun comes down blue and dim. Andersen's princesses could see the sun from here, \"like a purple flower with light streaming from its calyx\".", "In the real ocean, sunlight runs out at about 200 metres down. Below a thousand metres it is pitch dark, and the only lights are the ones that animals make."]), [["Pretend to rise to the surface", function () { dpxMark("surface"); dpxCard("Up, up, light as a bubble…", dpxP(["You break the surface. The sky is pink, a ship lies on the calm sea with lanterns in its rigging, and music comes across the water.", "Then you remember you are dreaming, and sink gently back down."]), [["Close", dpxClose]]); }], ["Close", dpxClose]]);
},
function () { dpxLearn("king", "The Sea King's throne", ["The Sea King of Andersen's tale was a widower, and his old mother ran his house. He had six daughters and gave each a garden.", "He is not named in the story; nor is the little mermaid. Andersen called her simply \"the little mermaid\", den lille Havfrue in Danish."], [["Sit on the throne for a moment", function () { dpxSay("👑 You sit on the shell throne. Nobody minds. It is a dream, after all."); dpxClose(); }]]); },
function () {
var tune = [], got = [], len = 3;
function play() {
tune = [];
for (var i = 0; i < len; i++)
tune.push((Math.random() * 4) | 0);
got = [];
dpxCard("Sing with the merfolk", "<p>The choir sings: <b style='font-size:22px'>" + tune.map(function (n) { return DPX_NOTES[n]; }).join(" ") + "</b></p><p>Remember it, then sing it back.</p>", [["I'm ready", ask]]);
}
function ask() {
dpxCard("Sing it back", "<p>" + (got.length ? got.map(function (n) { return DPX_NOTES[n]; }).join(" ") : "Which note comes first?") + "</p>", DPX_NOTES.map(function (s, n) {
return [s, function () {
got.push(n);
if (got[got.length - 1] !== tune[got.length - 1]) {
dpxCard("Oops!", "<p>The choir laughs kindly. You sang " + (got.length - 1) + " notes right. The tune was " + tune.map(function (n) { return DPX_NOTES[n]; }).join(" ") + ".</p>", [["Try again", function () { len = 3; play(); }], ["Close", dpxClose]]);
return;
}
if (got.length === tune.length) {
len++;
if (len > 7) {
dpxMark("singer");
dpxCard("🎶 Beautiful!", "<p>You sang a tune of seven notes! In Andersen's tale the little mermaid had the loveliest voice in the sea, and gave it to the Sea Witch.</p>", [["Close", dpxClose]]);
}
else
dpxCard("🎶 Lovely!", "<p>Right! The next tune is one note longer.</p>", [["Next tune", play]]);
return;
}
ask();
}];
}));
}
play();
},
function () { dpxLearn("charts", "The merfolk's charts of the sea", ["These charts show the oceans as the merfolk know them. The Pacific is the biggest and deepest: its Mariana Trench reaches almost 11,000 metres down.", "The ocean covers about 71 per cent of the Earth, and people have mapped the land of the Moon in more detail than the floor of their own sea."]); },
function () { dpxLearn("treasure", "The treasury of wrecks", ["Things sink to the floor of the sea from wrecked ships: coins, cannon, figureheads, statues like the youngest princess's marble boy.", "Real treasure from wrecks belongs, by law, to its owners or to the nation whose waters it lies in; divers who find it must report it."]); },
function () {
var pearl = (Math.random() * 3) | 0;
dpxCard("Find the pearl", "<p>The merchild hides a pearl under one of three shells and shuffles them very fast. Which one?</p>", [0, 1, 2].map(function (i) {
return ["🐚 Shell " + (i + 1), function () {
dpxCard(i === pearl ? "⚪ Found it!" : "Empty!", "<p>" + (i === pearl ? "The pearl was under shell " + (i + 1) + ". The merchild claps." : "The pearl was under shell " + (pearl + 1) + ".") + "</p><p>Real pearls grow inside oysters and mussels: a speck of grit gets in, and the animal coats it with layer on layer of nacre.</p>", [["Play again", dpxActShellGame], ["Close", dpxClose]]);
}];
}));
},
function () { dpxLearn("feast", "The feast for her birthday", ["When the youngest princess turned fifteen, her grandmother dressed her with a wreath of white lilies, each petal half a pearl, and fastened eight great oysters to her tail to show her high rank.", "\"It hurts so,\" said the little mermaid. \"One must suffer to be beautiful,\" said the old lady."]); },
function () { dpxCard("The palace kitchen", dpxP(["Nothing can be roasted at the bottom of the sea, so the merfolk's cooks keep their food fresh and cold: sea grapes, kelp, sea lettuce, sweet sea urchin.", "Real seaweeds such as nori, kelp and dulse are eaten all over the world, and are full of vitamins and iodine."]), [["Make a kelp-wrap", function () { dpxSay("🌿 You roll a kelp-wrap with sea grapes. The cook says it's the best she's seen today."); dpxClose(); }], ["Close", dpxClose]]); },
function () { dpxLearn("ball", "The ball in the great hall", ["Andersen describes a ball beneath the sea: walls and ceiling of thick clear glass, hundreds of giant shells round them in rows, rose-red and grass-green, each with a blue flame that lit the whole hall and shone out through the walls into the sea.", "The merfolk danced to their own singing, and the youngest princess sang the most beautifully of all."], [["Dance", function () { dpxSay("💃 You spin in the water among the merfolk dancers."); dpxClose(); }]]); },
function () { dpxLearn("gran", "The grandmother's room", ["The Sea King's mother was a wise old lady, very proud of her noble birth. She told the princesses everything she knew about ships and towns, people and animals \"up above\".", "It surprised them most that up there the flowers had a scent, and that the fish (the birds) sang in the trees."], [["Ask her about the soul", function () { dpxTaleCard(6); }]]); },
function () { dpxLearn("oysters", "Twelve oysters on her tail", ["The grandmother wore twelve oysters on her tail; other fine folk might wear six. It was how the merfolk showed rank, much as people above wear jewels.", "An oyster filters about 50 gallons of seawater a day, and a reef of them keeps a whole bay clean."]); },
function () {
dpxQuiz("The Little Mermaid quiz", [
["Who wrote The Little Mermaid, and when?", ["Hans Christian Andersen, 1837", "The Brothers Grimm, 1812", "Charles Perrault, 1697"], 0, "Andersen, in Copenhagen, Denmark."],
["How old did a princess have to be before she could rise to the surface?", ["Twelve", "Fifteen", "Eighteen"], 1, "Each sister went up on her fifteenth birthday."],
["What were the palace windows made of?", ["Pearl", "Glass", "Amber"], 2, "Tall pointed windows of the clearest amber."],
["What shape did the youngest make her garden?", ["A whale", "Round like the sun", "A little mermaid"], 1, "With flowers as red as the sun."],
["What was her only other treasure?", ["A golden comb", "A marble statue of a boy", "A ship's bell"], 1, "It had sunk from a wreck."],
["How long do merfolk live, in the story?", ["Three hundred years", "A thousand years", "For ever"], 0, "And then they become foam on the sea."],
["What did the Sea Witch take as payment?", ["Her hair", "Her voice", "Her pearls"], 1, "\"The loveliest voice in the sea.\""],
["What did her sisters give the witch, to try to save her?", ["Their crowns", "Their long hair", "Their gardens"], 1, "They came up with their hair cut short."],
["What did she become at the end?", ["Sea foam", "A daughter of the air", "A queen"], 1, "Who can earn a soul by good deeds."]
], function (s, n) { if (s === n)
dpxMark("merquiz"); });
},
function () { dpxLearn("watch", "The palace guard", ["The guards keep watch for sharks and for the Sea Witch's polyps.", "Real merfolk legends come from all over the world: the Greek Sirens and Nereids, the selkies of Scotland, Mami Wata in Africa, Iara in Brazil. Sailors may have mistaken manatees and dugongs for them."]); },
function () { dpxLearn("net", "The net-weaver's knots", ["Nets are tied with the same knot over and over: the sheet bend, which holds even when wet and pulled.", "Lost fishing nets, \"ghost nets\", drift in the real sea and trap animals for years. Divers cut them free and haul them out."], [["Tie a knot", function () { dpxSay("🪢 Over, under, through: a sheet bend. The net-weaver nods."); dpxClose(); }]]); },
function () {
var D = DPX.here || {}, who = D.who || "a family of merfolk";
dpxCard(D.name || "A merfolk home", dpxP(["This is the home of " + dpxEsc(who) + ". Merfolk houses grow from great shells and coral, and stay cool and dim even at noon.", "Everything here is made from the sea: beds in clam shells, lamps of pearl and of glowing jellies, rugs of sponge, tables of coral."]), [["Help with the day's work", function () { dpxSay("🤝 You lend a hand. " + dpxEsc(who.charAt(0).toUpperCase() + who.slice(1)) + " thanks you with a song."); dpxClose(); }], ["Hear a part of the story", dpxActStory], ["Close", dpxClose]]);
},
function () { dpxCard("Make something of the sea", dpxP(["Choose what to make from shells, sea-glass and pearl."]), [["A shell necklace", function () { dpxSay("📿 You thread a necklace of tiny cowrie shells."); dpxClose(); }], ["A comb of carved shell", function () { dpxSay("🐚 You carve a comb, as the mermaids used."); dpxClose(); }], ["A lamp of sea-glass", function () { dpxSay("🏮 You set sea-glass round a pearl. It glows green and blue."); dpxClose(); }], ["Close", dpxClose]]); },
function () { dpxCard("The witch's cauldron", dpxP(["The cauldron bubbles with shapes that look like crying faces, just as Andersen describes it. \"Cleanliness is a good thing,\" said the witch, and scoured it out with snakes.", "Stir it? It only makes the shapes swirl."]), [["Stir", function () { dpxSay("🫧 The cauldron swirls green and gold, and sighs."); dpxClose(); }], ["Close", dpxClose]]); },
function () {
dpxCard("The Sea Witch's bargain", dpxP(["\"So you want legs instead of a tail,\" says the Sea Witch. \"What will you give me?\"", "In the story the little mermaid gave her voice. What would you give for your dearest wish?"]), [["My voice, as she did", function () { dpxCard("The witch cackles", "<p>\"Ha! Just like the last one.\" Then she remembers that this is your dream, and gives it back.</p>", [["Close", dpxClose]]); }], ["Nothing: I'll find another way", function () { dpxMark("refused"); dpxCard("Wise", "<p>\"Clever little thing,\" mutters the witch. Some wishes are best earned rather than bought.</p>", [["Close", dpxClose]]); }], ["Hear what happened", function () { dpxTaleCard(7); }]]);
},
function (i) {
var t = DPX_HIST[i];
dpxMark("hist" + (i + 1));
var btns = [];
if (i > 0)
btns.push(["◀ Before", function () { dpxHistCard(i - 1); }]);
if (i < 9)
btns.push(["Next ▶", function () { dpxHistCard(i + 1); }]);
if (dpxCount("hist", 10) >= 10)
btns.push(["Take the Atlantis quiz", dpxActAtlQuiz]);
btns.push(["Close", dpxClose]);
dpxCard("Atlantis · tablet " + (i + 1) + " of 10: " + t[0], dpxP([t[1], t[2]]) + dpxStamp("hist", 10, "orichalcum tablets"), btns);
},
function () {
dpxCard("The ten kings of Atlantis", "<p>Five pairs of twins, the sons of Poseidon and Cleito:</p><ol style='margin:4px 0 4px 18px;padding:0'>" + DPX_KINGS.map(function (k) { return "<li><b>" + k[0] + "</b>" + (k[1] ? ": " + k[1] : "") + "</li>"; }).join("") + "</ol>", [["Test me on the twins", function () { dpxQuiz("The twins", [["Who was Atlas's twin?", ["Gadeirus", "Mestor", "Azaes"], 0], ["Who was Ampheres's twin?", ["Diaprepes", "Evaemon", "Autochthon"], 1], ["Who was Elasippus's twin?", ["Mestor", "Mneseus", "Atlas"], 0], ["Who was Azaes's twin?", ["Diaprepes", "Gadeirus", "Evaemon"], 0]], function (s, n) { if (s === n)
dpxMark("twins"); }); }], ["Close", dpxClose]]);
dpxMark("kings");
},
function () { dpxLearn("robes", "The blue robes", ["After judging, when the fire of the sacrifice had cooled, the ten kings put on \"most beautiful azure robes\", sat on the ground by the embers through the night, and gave judgement.", "At dawn they wrote their judgements on a golden tablet, and dedicated it with their robes as a memorial."]); },
function () { dpxLearn("pillar", "The pillar of orichalcum", ["The laws of Poseidon were carved on a pillar of orichalcum in the middle of the island, at the temple. On it too was an oath with fearful curses for any who broke the laws.", "The ten kings met there every fifth year and every sixth year in turn, \"giving equal honour to the odd and the even number\", to talk over shared business and judge whether any had broken the law."]); },
function () { dpxLearn("poseidon", "Poseidon in his chariot", ["The god stood in a chariot drawn by six winged horses; his head touched the roof. Round him were a hundred Nereids riding dolphins, \"for such was thought to be the number of them\".", "Poseidon was the Greek god of the sea, of earthquakes and of horses. He was called the Earth-Shaker."]); },
function () { dpxLearn("roof", "The ivory roof", ["\"In the interior of the temple the roof was of ivory, curiously wrought everywhere with gold and silver and orichalcum; and all the other parts, the walls and pillars and floor, they coated with orichalcum.\"", "Ivory then came from elephants; today the trade is banned almost everywhere to protect them."]); },
function () { dpxCard("The altar", dpxP(["Before the temple stood an altar that matched it in size and in its making. Greek offerings were often of food, wine, oil, or the first fruits of the harvest."]), [["Leave an offering of olives", function () { dpxSay("🫒 You leave a bowl of olives on the altar."); dpxClose(); }], ["Leave a flower", function () { dpxSay("🌸 You leave a flower on the altar."); dpxClose(); }], ["Close", dpxClose]]); },
function () {
dpxCard("Sit in judgement", dpxP(["You sit with the kings by the embers. A case is brought: one city has taken water from the springs that belonged to all. What do you decide?"]), [["They must share the water fairly", function () { dpxMark("judge"); dpxCard("A fair judgement", "<p>The kings nod. Their law said none should take up arms against another, and that they should decide together, as the house of Atlas had always led.</p>", [["Close", dpxClose]]); }],
["The strongest city keeps it", function () { dpxCard("The kings frown", "<p>That is how Atlantis began to go wrong, says Plato: when power and greed mattered more than the law.</p>", [["Think again", dpxActJudge], ["Close", dpxClose]]); }]]);
},
function () { dpxLearn("orich", "Orichalcum", ["\"Orichalcum\" means \"mountain copper\". Plato says it was second only to gold in value, and was mined in Atlantis but known by his time only by name.", "In 2015, divers found 39 metal ingots in an ancient wreck off Gela in Sicily, of copper with zinc; some called it orichalcum. Many scholars think the old word meant a kind of brass."]); },
function () { dpxCard("The two springs", dpxP(["One spring runs warm, the other cold: Poseidon's gift to Cleito. Plato says both had water \"of wonderful excellence\".", "Hot springs are heated deep in the earth, often near volcanoes. The ancient Greeks and Romans built famous baths over them."]), [["Dip your hand in the warm one", function () { dpxMark("springs"); dpxSay("♨️ Warm as a bath."); dpxClose(); }], ["Dip your hand in the cold one", function () { dpxMark("springs"); dpxSay("❄️ So cold your fingers tingle!"); dpxClose(); }], ["Close", dpxClose]]); },
function () {
var n = 1 + ((Math.random() * 5) | 0);
dpxCard("Knucklebones", "<p>You toss five knucklebones and catch <b>" + n + "</b> on the back of your hand.</p><p>Greek children played this with the ankle bones of sheep; it's the old game of jacks.</p>", [["Throw again", dpxActKnuckles], ["Close", dpxClose]]);
if (n === 5)
dpxMark("knuckles");
},
function () { dpxCard("The loom", dpxP(["Greek looms stood upright, with the threads weighted by clay weights at the bottom. Weaving was a great art: cloth was among the most precious things a house owned."]), [["Weave a row", function () { dpxSay("🧵 Clack! You pass the shuttle through and beat the thread up tight."); dpxClose(); }], ["Close", dpxClose]]); },
function () {
dpxQuiz("The Atlantis quiz", [
["Who first wrote about Atlantis?", ["Homer", "Plato", "Herodotus"], 1, "In the Timaeus and the Critias, about 360 BC."],
["Where did Solon hear the story, according to Plato?", ["From the priests of Sais in Egypt", "From the oracle at Delphi", "From a sailor in Crete"], 0],
["How many rings of water were round Cleito's hill?", ["One", "Three", "Seven"], 1, "Two of land and three of water."],
["What covered the outside of the Temple of Poseidon?", ["Gold", "Silver", "Bronze"], 1, "With gold on its pinnacles."],
["What metal \"flashed with the red light of fire\"?", ["Orichalcum", "Tin", "Iron"], 0],
["How many kings ruled Atlantis together?", ["Three", "Ten", "Twelve"], 1, "Five pairs of twins."],
["Which ocean is named after Atlas?", ["The Pacific", "The Atlantic", "The Indian"], 1],
["How quickly did Atlantis sink, says Plato?", ["In a hundred years", "In a single day and night", "Over a winter"], 1],
["Which real Greek city sank in an earthquake in 373 BC?", ["Athens", "Helike", "Sparta"], 1, "It was found again in 2001."],
["What do most historians think about Atlantis?", ["It was in the Atlantic", "Plato invented it as a lesson", "It was Crete"], 1, "Though real disasters may have inspired it."]
], function (s, n) { if (s === n)
dpxMark("atlquiz"); });
},
function () {
var you = null, opts = ["Grab", "Trip", "Push"];
dpxCard("Wrestling", "<p>Your opponent circles you. What do you try?</p>", opts.map(function (o, i) {
return [o, function () {
var them = (Math.random() * 3) | 0, win = (i + 3 - them) % 3 === 1, draw = i === them;
dpxCard(draw ? "A stand-off" : win ? "🏆 You win the fall!" : "Thump! You're down.", "<p>They tried to " + opts[them].toLowerCase() + ". " + (draw ? "Neither of you moves." : win ? "Three falls wins a Greek wrestling match. That's one!" : "Three falls loses, so you still have a chance.") + "</p>", [["Again", dpxActWrestle], ["Close", dpxClose]]);
if (win)
dpxMark("wrestle");
}];
}));
},
function () {
dpxCard("Throw the discus", "<p>How hard do you throw?</p>", [["Gently", 1], ["Hard", 2], ["As hard as I can!", 3]].map(function (o) {
return [o[0], function () {
var d = Math.round(20 + o[1] * 8 + Math.random() * 12 - (o[1] === 3 ? Math.random() * 22 : 0));
dpxCard("🥏 " + d + " metres!", "<p>" + (d >= 45 ? "A wonderful throw!" : "Not bad.") + " The record at the ancient Olympics is not known; today's record is over 74 metres.</p>", [["Throw again", dpxActThrow], ["Close", dpxClose]]);
if (d >= 45)
dpxMark("discus");
}];
}));
},
function () {
var t = (11 + Math.random() * 3).toFixed(1);
dpxCard("The stadion race", "<p>You sprint the length of the track: " + t + " seconds!</p><p>The stadion, one length of the stadium, about 192 metres at Olympia, was the oldest race of the Olympic Games. Our word \"stadium\" comes from it.</p>", [["Run again", dpxActSprint], ["Close", dpxClose]]);
},
function () {
var horses = ["Swift", "Sea-Foam", "Thunder", "Silver"];
dpxCard("The chariot race", "<p>The four-horse chariots line up on the course that runs right round the ring. Which team will win?</p>", horses.map(function (h, i) {
return [h, function () {
var w = (Math.random() * 4) | 0;
dpxCard(w === i ? "🏆 " + h + " wins!" : horses[w] + " wins", "<p>" + (w === i ? "Your pick came in first!" : "Your pick, " + h + ", came in " + ["second", "third", "last"][(i + 4 - w) % 3] + ".") + " Chariot races were the most dangerous and the most loved event of the Greek games.</p>", [["Another race", dpxActRace], ["Close", dpxClose]]);
if (w === i)
dpxMark("race");
}];
}));
},
function () {
var D = DPX.here || {};
dpxCard(D.name || "A house of Atlantis", dpxP(["A Greek house was built round a courtyard open to the sky, with an altar in it. The rooms were cool and dim; the women's rooms were upstairs or at the back.", "Plato says the people of Atlantis lived in plenty, and for many generations \"despised everything but virtue\", until pride got the better of them."]), [["Hear the history", dpxActHistory], ["Close", dpxClose]]);
},
function (m, k) {
if (!m || m.userData.dxuCaus || !dxuOn())
return m;
m.userData.dxuCaus = 1;
var prev = m.onBeforeCompile, kk = k || 1;
m.onBeforeCompile = function (sh, rd) {
if (prev)
prev.call(this, sh, rd);
sh.uniforms.dxuT = DXU.u.t;
sh.uniforms.dxuK = DXU.u.k;
sh.vertexShader = "varying vec3 vDxuW;\n" + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n  vDxuW=(modelMatrix*vec4(transformed,1.0)).xyz;");
if (sh.vertexShader.indexOf("instanceMatrix") >= 0 && /#ifdef USE_INSTANCING/.test(sh.vertexShader))
sh.vertexShader = sh.vertexShader.replace("vDxuW=(modelMatrix*vec4(transformed,1.0)).xyz;", "#ifdef USE_INSTANCING\n  vDxuW=(modelMatrix*instanceMatrix*vec4(transformed,1.0)).xyz;\n#else\n  vDxuW=(modelMatrix*vec4(transformed,1.0)).xyz;\n#endif");
sh.fragmentShader = DXU_CAUS_GLSL + "\n" + sh.fragmentShader.replace("#include <fog_fragment>", "  { float dxc=dxuCaus(vDxuW.xz+vec2(vDxuW.y*0.35,0.0)); float dxf=clamp(1.0-distance(vDxuW,cameraPosition)/70.0,0.0,1.0); gl_FragColor.rgb+=vec3(0.55,0.85,0.95)*dxc*dxuK*dxf*" + (kk * 0.85).toFixed(2) + "*(0.35+0.65*clamp(gl_FragColor.g*1.6,0.0,1.0)); }\n#include <fog_fragment>");
};
var ck = m.customProgramCacheKey;
m.customProgramCacheKey = function () { return (ck ? ck.call(this) : "") + "|dxu" + kk; };
m.needsUpdate = true;
return m;
},
function () {
if (typeof realmGrounds === "undefined" || typeof realms !== "function")
return;
realms().forEach(function (r) {
if (r.kind !== "depths")
return;
var g = realmGrounds[r.id];
if (!g || !g.material)
return;
var m = g.material;
if (m.userData.dxuCaus)
return;
if (m.color)
m.color.setHex(0xC8B690);
var t = typeof texOf === "function" ? texOf("dxusand") : null;
if (t && (!m.map || !m.userData.dxuSand)) {
m.map = t;
m.userData.dxuSand = 1;
}
dxuCausPatch(m, 1.15);
DXU.patched.push(m);
});
},
function () {
if (DXU.snow)
return DXU.snow;
var lite = typeof LITE !== "undefined" && !!LITE, n = lite ? 420 : 1500, B = 70, pos = new Float32Array(n * 3), sz = new Float32Array(n);
for (var i = 0; i < n; i++) {
pos[i * 3] = (Math.random() - 0.5) * B;
pos[i * 3 + 1] = Math.random() * 40;
pos[i * 3 + 2] = (Math.random() - 0.5) * B;
sz[i] = 0.5 + Math.random() * 1.2;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("sz", new THREE.BufferAttribute(sz, 1));
g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 20, 0), 1e5);
var m = new THREE.ShaderMaterial({ uniforms: { t: DXU.u.t, c: { value: new THREE.Vector3(0, 0, 0) }, B: { value: B } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
vertexShader: ["uniform float t; uniform vec3 c; uniform float B; attribute float sz; varying float vA;",
"void main(){ vec3 p=position; p.y=mod(p.y-t*0.18*sz,40.0); p.x+=sin(t*0.2+p.y)*0.6; p.z+=cos(t*0.17+p.x)*0.6;",
" p.xz=mod(p.xz-c.xz+B*0.5,B)-B*0.5+c.xz; p.y+=c.y-14.0;",
" vec4 mv=modelViewMatrix*vec4(p,1.0); gl_Position=projectionMatrix*mv; float d=-mv.z;",
" gl_PointSize=clamp(sz*90.0/d,1.0,6.0); vA=clamp(1.0-d/36.0,0.0,1.0)*0.55; }"].join("\n"),
fragmentShader: "varying float vA; void main(){ vec2 q=gl_PointCoord-0.5; float a=smoothstep(0.5,0.1,length(q))*vA; gl_FragColor=vec4(0.85,0.95,1.0,a); }" });
var p = new THREE.Points(g, m);
p.frustumCulled = false;
p.renderOrder = 5;
p.userData.dxu = 1;
return (DXU.snow = p);
},
function (kind, cb) {
var K = DXL_KIND[kind];
if (!K)
return;
if (DXL.geo[kind])
return cb(DXL.geo[kind]);
if (DXL.wait[kind]) {
DXL.wait[kind].push(cb);
return;
}
DXL.wait[kind] = [cb];
if (typeof modelsLoader !== "function" || typeof MODELS === "undefined")
return;
modelsLoader(function (L) {
L.load(MODELS.base + DXL_DIR + K.f, function (gl) {
try {
var sc = gl.scene;
sc.updateMatrixWorld(true);
var parts = [];
sc.traverse(function (m) {
if (!m.isMesh)
return;
var mats = Array.isArray(m.material) ? m.material : [m.material];
var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
g.applyMatrix4(m.matrixWorld);
if (!g.attributes.normal)
g.computeVertexNormals();
if (m.geometry.groups && m.geometry.groups.length > 1 && mats.length > 1) {
m.geometry.groups.forEach(function (gr) { var sub = new THREE.BufferGeometry(); ["position", "normal"].forEach(function (a) { var A = g.attributes[a]; sub.setAttribute(a, new THREE.BufferAttribute(A.array.slice(gr.start * 3, (gr.start + gr.count) * 3), 3)); }); parts.push({ g: sub, m: mats[gr.materialIndex] }); });
}
else
parts.push({ g: g, m: mats[0] });
});
var box = new THREE.Box3();
parts.forEach(function (p) { p.g.computeBoundingBox(); box.union(p.g.boundingBox); });
var c = box.getCenter(new THREE.Vector3()), s = 1 / Math.max(0.001, box.max.z - box.min.z);
var n = 0;
parts.forEach(function (p) { n += p.g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), out = new THREE.BufferGeometry(), o = 0, mats = [];
parts.forEach(function (p, i) {
var P = p.g.attributes.position, N = p.g.attributes.normal, cnt = P.count;
for (var v = 0; v < cnt; v++) {
pos[(o + v) * 3] = (P.getX(v) - c.x) * s;
pos[(o + v) * 3 + 1] = (P.getY(v) - c.y) * s;
pos[(o + v) * 3 + 2] = (P.getZ(v) - c.z) * s;
nor[(o + v) * 3] = N.getX(v);
nor[(o + v) * 3 + 1] = N.getY(v);
nor[(o + v) * 3 + 2] = N.getZ(v);
}
out.addGroup(o, cnt, i);
o += cnt;
var nm = (p.m && p.m.name) || "", col = K.cols && K.cols[nm] !== undefined ? new THREE.Color(K.cols[nm]) : (p.m && p.m.color ? p.m.color.clone() : new THREE.Color(0x888888));
mats.push(dxlMat(kind, i, col, K));
});
out.setAttribute("position", new THREE.BufferAttribute(pos, 3));
out.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
var R = null;
try {
if (typeof crsSmoothed === "function") {
var sm = crsSmoothed(out);
if (sm && typeof fineSplit === "function" && !dxlLite()) {
R = fineSplit(sm) || sm;
}
else
R = sm;
}
}
catch (e) {
R = null;
}
var geo = R || out;
if (!geo.groups.length)
out.groups.forEach(function (gq) { geo.addGroup(gq.start, gq.count, gq.materialIndex); });
geo.computeBoundingSphere();
geo.boundingSphere.radius = Math.max(geo.boundingSphere.radius, 0.8);
geo.userData.shared = 1;
geo.userData.keepOnChip = 1;
DXL.geo[kind] = { geo: geo, mats: mats };
}
catch (e) {
if (window.console)
console.warn("[deep-realm] sea life", kind, e);
DXL.geo[kind] = null;
}
var w = DXL.wait[kind] || [];
DXL.wait[kind] = null;
if (DXL.geo[kind])
w.forEach(function (f) { try {
f(DXL.geo[kind]);
}
catch (e) {
if (window.console)
console.warn("[deep-realm] sea life", e);
} });
}, undefined, function () { DXL.wait[kind] = null; });
});
},
function (kind, i, col, K) {
var key = kind + "|" + i;
if (DXL.mats[key])
return DXL.mats[key];
var m = new THREE.MeshStandardMaterial({ color: col, roughness: K.rough || 0.5, metalness: 0.05 });
m.emissive = col.clone().multiplyScalar(0.12);
var ax = K.bend === "y" ? "y" : "x";
m.onBeforeCompile = function (sh) {
sh.uniforms.dxlT = DXL.t;
sh.vertexShader = "uniform float dxlT;\n" + sh.vertexShader.replace("#include <begin_vertex>", [
"#include <begin_vertex>",
"#ifdef USE_INSTANCING",
"  float dxlP=dot(instanceMatrix[3].xyz,vec3(0.37,0.11,0.23));",
"#else",
"  float dxlP=dot(modelMatrix[3].xyz,vec3(0.37,0.11,0.23));",
"#endif",
"  float dxlK=clamp(0.62-transformed.z,0.0,1.2);",
"  transformed." + ax + "+=sin(transformed.z*" + K.freq.toFixed(2) + "-dxlT*" + K.speed.toFixed(2) + "+dxlP)*" + K.amp.toFixed(3) + "*dxlK*dxlK;"
].join("\n"));
};
m.customProgramCacheKey = function () { return "dxl" + kind; };
m.userData.ldShared = 1;
if (typeof dxuCausPatch === "function")
dxuCausPatch(m, 0.6);
return (DXL.mats[key] = m);
},
function (obj, P, a) {
dxlPath(DXL_V1, P, a);
dxlPath(DXL_V2, P, a + (P.sp >= 0 ? 0.02 : -0.02));
obj.position.copy(DXL_V1);
var dx = DXL_V2.x - DXL_V1.x, dy = DXL_V2.y - DXL_V1.y, dz = DXL_V2.z - DXL_V1.z;
obj.rotation.set(0, 0, 0);
obj.rotation.order = "YXZ";
obj.rotation.y = Math.atan2(dx, dz);
obj.rotation.x = -Math.atan2(dy, Math.hypot(dx, dz)) * (P.pitchK || 1);
if (P.roll)
obj.rotation.z = P.roll;
},
function (G, kind, n, P, scale) {
dxlGet(kind, function (D) {
var im = new THREE.InstancedMesh(D.geo, D.mats, n);
im.frustumCulled = false;
im.userData.fish = [];
for (var i = 0; i < n; i++) {
var u = Math.random(), v = Math.random(), w = Math.random();
im.userData.fish.push({ ox: (u - 0.5) * P.spread, oy: (v - 0.5) * P.spread * 0.5, oz: (w - 0.5) * P.spread * 1.4, ph: Math.random() * 6.28, s: (scale || DXL_KIND[kind].len) * (0.8 + Math.random() * 0.4) });
}
G.add(im);
var S = { im: im, P: P, a: P.a0 || 0 };
DXL.schools.push(S);
dxlSchoolPlace(S, 0);
});
},
function (S, t) {
var P = S.P;
dxlPath(DXL_V1, P, S.a);
dxlPath(DXL_V2, P, S.a + (P.sp >= 0 ? 0.02 : -0.02));
var hy = Math.atan2(DXL_V2.x - DXL_V1.x, DXL_V2.z - DXL_V1.z), c = Math.cos(hy), s = Math.sin(hy);
S.im.userData.fish.forEach(function (f, i) {
var wx = f.ox + Math.sin(t * 0.7 + f.ph) * 0.4, wy = f.oy + Math.sin(t * 0.9 + f.ph * 1.3) * 0.25, wz = f.oz;
DXL_P.set(DXL_V1.x + wx * c + wz * s, DXL_V1.y + wy, DXL_V1.z - wx * s + wz * c);
DXL_E.set(Math.sin(t + f.ph) * 0.08, hy + Math.sin(t * 1.3 + f.ph) * 0.18, 0);
DXL_Q.setFromEuler(DXL_E);
DXL_S.setScalar(f.s);
DXL_M.compose(DXL_P, DXL_Q, DXL_S);
S.im.setMatrixAt(i, DXL_M);
});
S.im.instanceMatrix.needsUpdate = true;
},
function () {
if (DXL_RAY)
return DXL_RAY;
var nx = dxlLite() ? 10 : 18, nz = dxlLite() ? 6 : 10, pos = [], idx = [];
for (var j = 0; j <= nz; j++)
for (var i = 0; i <= nx; i++) {
var u = i / nx * 2 - 1, v = j / nz;
var half = Math.max(0.02, (v < 0.45 ? v / 0.45 : 1 - (v - 0.45) / 0.55 * 0.85)), x = u * half * 1.1, z = 0.5 - v, y = (1 - Math.abs(u)) * 0.08 * (1 - v) + 0.03 * Math.cos(u * 1.5);
pos.push(x, y, z);
}
for (var j2 = 0; j2 < nz; j2++)
for (var i2 = 0; i2 < nx; i2++) {
var a = j2 * (nx + 1) + i2, b = a + nx + 1;
idx.push(a, b, a + 1, b, b + 1, a + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
g.userData.shared = 1;
DXL_RAY = g;
return g;
},
function () {
if (DXL.mats.ray)
return DXL.mats.ray;
var m = new THREE.MeshStandardMaterial({ color: 0x2A3440, roughness: 0.6, side: THREE.DoubleSide, emissive: 0x0A1018 });
m.onBeforeCompile = function (sh) {
sh.uniforms.dxlT = DXL.t;
sh.vertexShader = "uniform float dxlT;\n" + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n  float dxlP=dot(modelMatrix[3].xyz,vec3(0.3,0.1,0.2));\n  transformed.y+=sin(dxlT*1.6+dxlP-transformed.z*2.0)*0.28*transformed.x*transformed.x;");
};
m.customProgramCacheKey = function () { return "dxlray"; };
m.userData.ldShared = 1;
return (DXL.mats.ray = m);
},
function (G, P, size) {
var g = new THREE.Group(), body = new THREE.Mesh(dxlRayGeo(), dxlRayMat());
body.scale.setScalar(size);
g.add(body);
var belly = new THREE.Mesh(dxlRayGeo(), dpxMat(0xE8E8E0, null, { side: 1 }));
belly.scale.set(size * 0.6, size * 0.4, size * 0.6);
belly.position.y = -0.02 * size;
g.add(belly);
var tail = new THREE.Mesh(new THREE.CylinderGeometry(0.004 * size, 0.02 * size, 0.8 * size, 4), dxlRayMat());
tail.rotation.x = Math.PI / 2;
tail.position.z = -0.85 * size;
g.add(tail);
G.add(g);
var M = { P: P, a: P.a0 || 0, o: g };
DXL.movers.push(M);
dxlPlace(g, P, M.a);
return M;
},
function (G, i, P) {
if (typeof wPerson !== "function")
return;
var f = i % 2 === 0, cols = [0x2F8A7A, 0x3A6AC8, 0xC84A6A, 0x8A4AC8, 0xD8A030, 0x2A9AB8, 0x4AAA5A, 0xE07A5A];
if (typeof build !== "function")
return;
var p = build({ id: "dxl_mer_" + i, archetype: f ? "mermaid" : "merman", label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, look: { top: cols[i % cols.length] } });
var holder = new THREE.Group();
p.rotation.x = 1.32;
p.position.y = 0.2;
holder.add(p);
G.add(holder);
var M = { P: P, a: P.a0 || 0, o: holder, mer: p };
DXL.movers.push(M);
dxlPlace(holder, P, M.a);
return M;
},
function (dt) {
DXL.t.value += dt;
for (var i = 0; i < DXL.movers.length; i++) {
var M = DXL.movers[i];
if (!M.o)
continue;
M.a += dt * M.P.sp;
dxlPlace(M.o, M.P, M.a);
if (M.mer) {
M.mer.rotation.z = Math.sin(DXL.t.value * 1.7 + i) * 0.08;
}
}
for (var j = 0; j < DXL.schools.length; j++) {
var S = DXL.schools[j];
S.a += dt * S.P.sp;
if (!S.im.parent)
continue;
var d = S.im.parent.parent ? Math.hypot(camera.position.x - (LD.ox + dxlPath(DXL_V1, S.P, S.a).x), camera.position.z - (LD.oz + DXL_V1.z)) : 0;
if (d < 160 || (DXL.frame % 6) === j % 6)
dxlSchoolPlace(S, DXL.t.value);
}
DXL.frame = (DXL.frame || 0) + 1;
},
function () {
if (DXL.helmet)
return DXL.helmet;
var cu = dpxMat(0xC87A3A, "metal", { e: 0x4A2008, ei: 0.35 }), br = dpxMat(0xD8B060, "metal", { e: 0x4A3A10, ei: 0.35 }), gl = dpxMat(0x8ACCE0, null, { op: 0.5 }), lead = dpxMat(0x6A6A70, "metal"), hose = dpxMat(0x3A3A30);
var H = new THREE.Group();
dpxSph(H, 0.21, cu, 0, 1.66, 0.02, 18, 1.08);
[[0, 0, 1], [1, 0, 0.15], [-1, 0, 0.15]].forEach(function (d, k) {
var L = Math.hypot(d[0], d[2]), R = new THREE.Group();
R.position.set(d[0] / L * 0.2, 1.65, 0.02 + d[2] / L * 0.2);
R.lookAt(d[0] * 5, 1.65, d[2] * 5);
R.add(new THREE.Mesh(new THREE.TorusGeometry(k ? 0.05 : 0.075, 0.016, 6, 16), br));
R.add(new THREE.Mesh(new THREE.CircleGeometry(k ? 0.05 : 0.075, 16), gl));
if (!k)
for (var b = -1; b <= 1; b++) {
var bar = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.15, 4), br);
bar.position.x = b * 0.035;
R.add(bar);
}
H.add(R);
});
dpxCyl(H, 0.03, 0.035, 0.07, br, 0, 1.87, -0.06, 8);
var pl = dpxSph(H, 0.32, cu, 0, 1.42, 0, 16, 0.35);
pl.scale.set(1, 0.35, 0.82);
dpxCyl(H, 0.2, 0.23, 0.07, br, 0, 1.47, 0.02, 18);
dpxBox(H, 0.26, 0.16, 0.04, lead, 0, 1.2, 0.16);
dpxBox(H, 0.26, 0.16, 0.04, lead, 0, 1.2, -0.16);
var pts = [];
for (var k = 0; k <= 8; k++) {
var t = k / 8;
pts.push(new THREE.Vector3(Math.sin(t * 2.2) * 0.5, 1.7 + t * 3.0, -0.2 - t * 0.8));
}
H.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.028, 5, false), hose));
H.traverse(function (m) { if (m.isMesh) {
m.raycast = function () { };
m.castShadow = true;
} });
return (DXL.helmet = H);
},
function (G) {
DXL.movers = [];
DXL.schools = [];
try {
dxlDivers();
}
catch (e) { }
var root = new THREE.Group();
root.name = "dxl-sea-life";
root.userData.dxlRoot = 1;
G.add(root);
var lite = dxlLite(), R = wRand(9090);
DXL.spots.forEach(function (s, i) {
if (s.a === "dolphin")
dxlSwimmer(root, "dolphin", { cx: s.x, cz: s.z, r: s.w ? Math.max(10, s.w) : 2.2, y: s.w ? 5 + (i % 3) * 2 : 2.4, sp: s.w ? 0.22 + (i % 3) * 0.04 : 0.25, bob: s.w ? 1.6 : 0.3, bf: 3, ph: i, a0: i * 0.9 });
else if (s.a === "whale" && i % 2 === 0)
dxlSwimmer(root, "whale", { cx: s.x, cz: s.z, r: 220, y: 38, sp: 0.03, bob: 3, bf: 1, ph: i, e: 0.7, pitchK: 0.3 });
});
var pods = [[0, -90, 40], [-120, -300, 50], [640, -120, 46], [300, -200, 60], [640, -760, 60], [-300, -420, 50]];
pods.slice(0, lite ? 2 : pods.length).forEach(function (q, k) { for (var d = 0; d < (lite ? 2 : 4); d++)
dxlSwimmer(root, "dolphin", { cx: q[0] + d * 2.5, cz: q[1] + (d % 2) * 3, r: q[2] + d * 1.5, y: 6 + d * 0.7, sp: 0.16, bob: 2.2, bf: 4, ph: d * 0.6, a0: k + d * 0.07 }); });
for (var w = 0; w < (lite ? 1 : 2); w++)
dxlSwimmer(root, "whale", { cx: w ? 600 : -80, cz: w ? -480 : -320, r: w ? 300 : 260, y: 44 + w * 8, sp: w ? -0.022 : 0.025, bob: 4, bf: 1, ph: w, e: 0.8, pitchK: 0.3, a0: w * 2 });
[[-430, -580, 36], [-470, -640, 26], [640, -900, 70]].slice(0, lite ? 1 : 3).forEach(function (q, k) { dxlSwimmer(root, "shark", { cx: q[0], cz: q[1], r: q[2], y: 3 + k * 2, sp: k % 2 ? -0.1 : 0.12, bob: 0.8, bf: 2, ph: k, a0: k }); });
[[-60, -40, 46, 6], [640, -520, 140, 14], [200, -330, 80, 9], [-200, -120, 60, 7]].slice(0, lite ? 1 : 4).forEach(function (q, k) { dxlRay(root, { cx: q[0], cz: q[1], r: q[2], y: q[3], sp: (k % 2 ? -1 : 1) * (0.05 + k * 0.01), bob: 1.2, bf: 2, ph: k, pitchK: 0.4, a0: k * 1.7 }, 3.2 + k * 0.4); });
var sch = [[0, -180, 26, 4, "fish1"], [-215, -250, 30, 3.5, "fish2"], [215, -270, 30, 4, "fish3"], [120, 20, 18, 3, "fish3"], [-60, 30, 20, 2.5, "fish2"], [640, -540, 40, 9, "fish1"],
[640, -400, 60, 6, "fish2"], [760, -520, 22, 4, "fish3"], [0, -262, 60, 16, "fish1"], [-440, -600, 24, 5, "fish2"], [60, -60, 16, 3, "fish1"], [640, -200, 30, 4, "fish3"]];
sch.slice(0, lite ? 5 : sch.length).forEach(function (q, k) { dxlSchool(root, q[4], lite ? 18 : (k % 3 ? 36 : 56), { cx: q[0], cz: q[1], r: q[2], y: q[3], sp: (k % 2 ? -1 : 1) * (0.22 + R() * 0.12), bob: 1, bf: 2, ph: k, spread: 4 + k % 3 * 2, a0: R() * 6 }, null); });
var ms = [[0, -140, 30, 7], [0, -262, 70, 22], [-215, -250, 26, 8], [215, -270, 26, 9], [640, -520, 110, 18], [640, -520, 60, 12], [640, -300, 40, 8], [-60, -40, 30, 6], [300, -150, 50, 10], [-300, -400, 40, 9], [760, -620, 40, 10], [520, -420, 40, 10]];
ms.slice(0, lite ? 3 : ms.length).forEach(function (q, k) { dxlMerSwimmer(root, k, { cx: q[0], cz: q[1], r: q[2], y: q[3], sp: (k % 2 ? -1 : 1) * (0.08 + (k % 3) * 0.02), bob: 0.8, bf: 2, ph: k, a0: k * 0.8, pitchK: 0.6 }); });
root.userData.ldAnim = function (m, t, dt) { try {
dxlTick(dt);
}
catch (e) {
if (window.console && !DXL.warned) {
DXL.warned = 1;
console.warn("[deep-realm] sea life tick", e);
}
} };
DXL.built++;
},
function (list) {
var n = 0;
list.forEach(function (g) { n += (g.index ? g.index.count : g.attributes.position.count); });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), o = 0;
list.forEach(function (g0) { var g = g0.index ? g0.toNonIndexed() : g0; if (!g.attributes.normal)
g.computeVertexNormals(); pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; });
var out = new THREE.BufferGeometry();
out.setAttribute("position", new THREE.BufferAttribute(pos, 3));
out.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
out.computeBoundingSphere();
out.userData.shared = 1;
return out;
},
function (list, x0, y0, z0, x1, y1, z1, r0, r1, seg) {
var L = Math.hypot(x1 - x0, y1 - y0, z1 - z0), g = new THREE.CylinderGeometry(r1, r0, L, seg || 5, 1, false);
var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x1 - x0, y1 - y0, z1 - z0).normalize());
g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
list.push(g);
},
function (k) {
if (DXR_GEO[k])
return DXR_GEO[k];
var lite = typeof LITE !== "undefined" && !!LITE, L = [], R = wRand(k.length * 97 + 3), g;
if (k === "brain") {
g = new THREE.IcosahedronGeometry(1, lite ? 2 : 3);
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), rr = 1 + 0.06 * Math.sin(x * 14 + Math.sin(z * 9) * 2) * Math.cos(z * 13 + y * 5);
if (y < 0)
y *= 0.15;
p.setXYZ(i, x * rr, Math.max(-0.05, y * 0.75 * rr), z * rr);
}
g.computeVertexNormals();
g = g.index ? g.toNonIndexed() : g;
g.userData.shared = 1;
}
else if (k === "table") {
dxrBranch(L, 0, 0, 0, 0, 0.5, 0, 0.12, 0.09, 6);
var pts = [];
for (var t = 0; t <= 8; t++) {
var r = t / 8;
pts.push(new THREE.Vector2(r * 1.0, 0.5 + r * r * 0.12));
}
for (var t2 = 8; t2 >= 0; t2--) {
var r2 = t2 / 8;
pts.push(new THREE.Vector2(r2 * 1.0, 0.46 + r2 * r2 * 0.1));
}
var lg = new THREE.LatheGeometry(pts, lite ? 10 : 16);
var lp = lg.attributes.position;
for (var j = 0; j < lp.count; j++) {
var a = Math.atan2(lp.getZ(j), lp.getX(j)), d = Math.hypot(lp.getX(j), lp.getZ(j));
lp.setY(j, lp.getY(j) + Math.sin(a * 7) * 0.04 * d);
}
lg.computeVertexNormals();
L.push(lg);
g = dxrMerge(L);
}
else if (k === "stag") {
(function grow(x, y, z, dx, dy, dz, len, r, d) {
var ex = x + dx * len, ey = y + dy * len, ez = z + dz * len;
dxrBranch(L, x, y, z, ex, ey, ez, r, d <= 0 ? 0.004 : r * 0.7, lite ? 4 : 5);
if (d <= 0)
return;
var n = d > 1 ? 3 : 2;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, sp = 0.5 + R() * 0.4, nx = dx + Math.cos(a) * sp, ny = dy + 0.35, nz = dz + Math.sin(a) * sp, l = Math.hypot(nx, ny, nz);
grow(ex, ey, ez, nx / l, ny / l, nz / l, len * 0.72, r * 0.66, d - 1);
}
})(0, 0, 0, 0, 1, 0, 0.35, 0.07, lite ? 2 : 3);
g = dxrMerge(L);
}
else if (k === "fan") {
(function grow(x, y, dx, dy, len, r, d) {
var ex = x + dx * len, ey = y + dy * len;
dxrBranch(L, x, y, 0, ex, ey, 0, r, r * 0.75, 3);
if (d <= 0)
return;
[-1, 1].forEach(function (s) { var a = Math.atan2(dy, dx) + s * (0.35 + R() * 0.25); grow(ex, ey, Math.cos(a), Math.sin(a), len * 0.78, r * 0.75, d - 1); });
})(0, 0, 0, 1, 0.3, 0.03, lite ? 4 : 5);
g = dxrMerge(L);
}
else if (k === "sponge") {
for (var s = 0; s < 4; s++) {
var a2 = s * 1.7, rr2 = 0.08 + R() * 0.06, h = 0.5 + R() * 0.7, c = new THREE.CylinderGeometry(rr2 * 1.15, rr2 * 0.9, h, 8, 1, true);
c.translate(Math.cos(a2) * 0.14, h / 2, Math.sin(a2) * 0.14);
L.push(c);
var lip = new THREE.TorusGeometry(rr2 * 1.15, 0.018, 4, 10);
lip.rotateX(Math.PI / 2);
lip.translate(Math.cos(a2) * 0.14, h, Math.sin(a2) * 0.14);
L.push(lip);
}
g = dxrMerge(L);
}
else if (k === "anem") {
var col = new THREE.CylinderGeometry(0.16, 0.2, 0.22, 10);
col.translate(0, 0.11, 0);
L.push(col);
var disc = new THREE.CircleGeometry(0.17, 10);
disc.rotateX(-Math.PI / 2);
disc.translate(0, 0.225, 0);
L.push(disc);
for (var t3 = 0; t3 < (lite ? 14 : 26); t3++) {
var a3 = t3 * 2.4, rr3 = 0.06 + ((t3 * 7) % 10) / 10 * 0.11, ox = Math.cos(a3) * rr3, oz = Math.sin(a3) * rr3;
dxrBranch(L, ox, 0.22, oz, ox * 2.1, 0.36 + R() * 0.06, oz * 2.1, 0.014, 0.003, 3);
}
g = dxrMerge(L);
}
else if (k === "kelp") {
var segs = lite ? 10 : 16;
for (var b = 0; b < 3; b++) {
var pos = [], idx = [], ang = b * 2.1, w0 = 0.16 + b * 0.03, bx = Math.cos(ang) * 0.12, bz = Math.sin(ang) * 0.12;
for (var q = 0; q <= segs; q++) {
var v = q / segs, w = w0 * (0.4 + Math.sin(Math.min(1, v * 1.4) * Math.PI * 0.5) * 0.9) * (1 - v * 0.5), ruff = Math.sin(v * 40 + b) * 0.025;
var cx = bx + Math.sin(v * 3 + b) * 0.12, cz = bz + Math.cos(v * 2.5 + b) * 0.08;
pos.push(cx - Math.cos(ang + 1.2) * w, v, cz - Math.sin(ang + 1.2) * w + ruff, cx + Math.cos(ang + 1.2) * w, v, cz + Math.sin(ang + 1.2) * w - ruff);
if (q) {
var o2 = (q - 1) * 2;
idx.push(o2, o2 + 2, o2 + 1, o2 + 1, o2 + 2, o2 + 3);
}
}
var kg = new THREE.BufferGeometry();
kg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
kg.setIndex(idx);
kg.computeVertexNormals();
L.push(kg);
}
var stipe = new THREE.CylinderGeometry(0.02, 0.03, 1, 4, 1);
stipe.translate(0, 0.5, 0);
L.push(stipe);
g = dxrMerge(L);
}
else if (k === "grass") {
for (var gb = 0; gb < (lite ? 5 : 8); gb++) {
var a4 = gb * 0.8, h4 = 0.5 + R() * 0.5, bl = new THREE.PlaneGeometry(0.035, h4, 1, 3);
var bp = bl.attributes.position;
for (var e = 0; e < bp.count; e++) {
var yy = bp.getY(e) + h4 / 2;
bp.setZ(e, yy * yy * 0.25);
bp.setY(e, yy);
}
bl.rotateY(a4);
bl.translate(Math.cos(a4) * 0.1, 0, Math.sin(a4) * 0.1);
L.push(bl);
}
g = dxrMerge(L);
}
else if (k === "rock") {
g = new THREE.IcosahedronGeometry(1, 1);
var rp = g.attributes.position;
for (var ri = 0; ri < rp.count; ri++) {
var x2 = rp.getX(ri), y2 = rp.getY(ri), z2 = rp.getZ(ri), n2 = 0.75 + 0.35 * Math.abs(Math.sin(x2 * 3.1 + z2 * 2.3) * Math.cos(y2 * 2.7 + x2));
rp.setXYZ(ri, x2 * n2, Math.max(-0.3, y2 * 0.7 * n2), z2 * n2);
}
g.computeVertexNormals();
g = g.toNonIndexed();
g.computeVertexNormals();
g.userData.shared = 1;
}
g.userData.shared = 1;
DXR_GEO[k] = g;
return g;
},
function (k) {
if (DXR.mats[k])
return DXR.mats[k];
var m = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: k === "rock" ? 0.95 : 0.7, metalness: 0, side: (k === "kelp" || k === "grass" || k === "sponge") ? THREE.DoubleSide : THREE.FrontSide });
if (k === "anem" || k === "fan") {
m.emissive = new THREE.Color(0x201018);
}
var sway = { kelp: 0.9, grass: 0.25, fan: 0.12, anem: 0.05 }[k];
if (sway) {
m.onBeforeCompile = function (sh) {
sh.uniforms.dxlT = DXL.t;
sh.vertexShader = "uniform float dxlT;\n" + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n#ifdef USE_INSTANCING\n  float dxrP=dot(instanceMatrix[3].xz,vec2(0.21,0.17));\n#else\n  float dxrP=0.0;\n#endif\n  float dxrH=max(transformed.y,0.0);\n  transformed.x+=sin(dxlT*0.7+dxrP)*" + sway.toFixed(2) + "*dxrH*dxrH*0.25;\n  transformed.z+=cos(dxlT*0.55+dxrP*1.3)*" + sway.toFixed(2) + "*dxrH*dxrH*0.18;");
};
m.customProgramCacheKey = function () { return "dxr" + k; };
}
m.userData.ldShared = 1;
if (typeof dxuCausPatch === "function")
dxuCausPatch(m, k === "rock" ? 1 : 0.7);
return (DXR.mats[k] = m);
},
function (x, z) {
if (Math.abs(x) < 14 && z > -80 && z < 20)
return false;
if (Math.abs(x) < 60 && z > -330 && z < -180)
return false;
if (Math.abs(x) < 52 && z > -200 && z < -110)
return Math.random() < 0.25;
if (typeof DPX_TOWN !== "undefined")
for (var i = 0; i < DPX_TOWN.length; i++)
if (Math.hypot(x - DPX_TOWN[i].x, z - DPX_TOWN[i].z) < 48)
return false;
if (Math.hypot(x + 440, z + 600) < 34)
return false;
var A = typeof DPX_ATL !== "undefined" ? DPX_ATL : { x: 640, z: -520 };
if (Math.hypot(x - A.x, z - A.z) < 445)
return false;
if (Math.abs(x - A.x) < 34 && z > A.z + 200 && z < A.z + 420)
return false;
var rd = [[40, -40], [260, -120], [480, -150], [614, -164]];
for (var j = 1; j < rd.length; j++) {
var ax = rd[j - 1][0], az = rd[j - 1][1], bx = rd[j][0], bz = rd[j][1], dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz)));
if (Math.hypot(x - ax - dx * t, z - az - dz * t) < 10)
return false;
}
if (Math.hypot(x - 120, z - 20) < 14)
return false;
if (Math.hypot(x - 70, z + 60) < 20)
return false;
return true;
},
function (G, k, patches, s0, s1, cols, seed, yk, tilt) {
var lite = typeof LITE !== "undefined" && !!LITE, R = wRand(seed), list = [];
patches.forEach(function (p) {
var n = Math.ceil(p[3] * (lite ? 0.35 : 1));
for (var i = 0; i < n * 3 && list.length < 99999; i++) {
if (n <= 0)
break;
var a = R() * 6.283, d = Math.sqrt(R()) * p[2], x = p[0] + Math.sin(a) * d, z = p[1] + Math.cos(a) * d;
if (!dxrClear(x, z))
continue;
list.push([x, z, s0 + R() * (s1 - s0), R() * 6.283, cols[(R() * cols.length) | 0], R()]);
n--;
}
});
if (!list.length)
return null;
var im = new THREE.InstancedMesh(dxrGeo(k), dxrMat(k), list.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), Pp = new THREE.Vector3(), C = new THREE.Color();
list.forEach(function (q, i) {
var y = (typeof ldY === "function" ? ldY(q[0], q[1]) : 0) + (yk || 0) * q[2];
E.set(tilt ? (q[5] - 0.5) * tilt : 0, q[3], tilt ? (q[5] - 0.5) * tilt * 0.7 : 0);
Q.setFromEuler(E);
if (k === "kelp")
S.set(1.5 + q[5], q[2], 1.5 + q[5]);
else
S.set(q[2], q[2] * (k === "rock" ? 0.6 + q[5] * 0.5 : 1), q[2]);
Pp.set(q[0], y, q[1]);
M.compose(Pp, Q, S);
im.setMatrixAt(i, M);
C.setHex(q[4]);
C.offsetHSL(0, 0, (q[5] - 0.5) * 0.08);
im.setColorAt(i, C);
});
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.castShadow = false;
im.receiveShadow = true;
G.add(im);
return im;
},
function (G) {
if (window.DXU_OFF)
return;
var root = new THREE.Group();
root.name = "dxr-sea-floor";
G.add(root);
var reefs = [[-70, 30, 60, 1], [-150, -40, 50, 1], [110, -30, 60, 1], [180, -120, 50, 1], [-120, -170, 40, 1], [-300, -240, 70, 1], [320, -280, 70, 1], [-260, -480, 60, 1], [120, -440, 80, 1], [380, -460, 60, 1],
[-60, -460, 60, 1], [300, -40, 70, 1], [-340, -60, 70, 1], [500, -300, 60, 1], [460, -60, 60, 1], [-500, -300, 70, 1], [-200, -700, 70, 1], [200, -650, 80, 1], [880, -300, 80, 1], [900, -700, 90, 1], [640, -900, 100, 1], [380, -820, 80, 1]];
function pk(m) { return reefs.map(function (r) { return [r[0], r[1], r[2], m]; }); }
dxrScatter(root, "brain", pk(10), 0.5, 1.6, [0xC8A86A, 0xD89A6A, 0xA8B86A, 0xE0C890, 0x9AC8A0], 101, 0, 0.2);
dxrScatter(root, "table", pk(4), 0.8, 2.2, [0xB8C890, 0xD8B080, 0xA0C8B8, 0xE8C8A0], 102, 0, 0.1);
dxrScatter(root, "stag", pk(12), 0.9, 2.4, [0xE8A0B0, 0xF0C080, 0xC8A0E8, 0x90D8C8, 0xF08A6A, 0xE8E0C8], 103, 0, 0.3);
dxrScatter(root, "fan", pk(6), 0.9, 2.2, [0xC83A6A, 0xE86A3A, 0x8A3AA8, 0xE8C040, 0xD84A8A], 104, 0, 0.25);
dxrScatter(root, "sponge", pk(5), 0.8, 1.6, [0xE8A030, 0x8A5AC8, 0xC8583A, 0xD8C850], 105, 0, 0.15);
dxrScatter(root, "anem", pk(9), 0.8, 1.8, [0xFF7AB8, 0xFFB04A, 0x7AE8C8, 0xC88AFF, 0xFF6A6A], 106, 0, 0);
dxrScatter(root, "rock", pk(9), 0.5, 4, [0x6A645A, 0x5A5A56, 0x7A7062, 0x4E4E4C], 107, -0.15, 0.6);
var kelp = [[-180, -80, 70, 140], [-380, -180, 90, 160], [-420, -470, 80, 140], [260, -520, 90, 140], [80, -560, 70, 110], [-120, -560, 80, 120], [420, -180, 60, 90], [860, -460, 90, 140], [200, 60, 60, 80], [-250, 40, 60, 80], [440, -760, 90, 120], [-320, -760, 90, 120]];
dxrScatter(root, "kelp", kelp, 9, 19, [0x6A7A2A, 0x7A8A30, 0x5A6A26, 0x8A7A30], 108, 0, 0.15);
var grass = [[0, -120, 120, 500], [-200, -140, 120, 400], [200, -160, 120, 400], [360, -120, 120, 300], [-100, -380, 140, 400], [300, -380, 140, 400], [0, -600, 160, 300], [-400, -300, 120, 260], [800, -200, 140, 260]];
dxrScatter(root, "grass", grass, 0.8, 1.6, [0x5A8A3A, 0x6A9A40, 0x4A7A36], 109, 0, 0.2);
var far = [], R = wRand(110);
for (var i = 0; i < (typeof LITE !== "undefined" && LITE ? 10 : 22); i++) {
var a = i / 22 * 6.283 + R() * 0.2, d = 1150 + R() * 250;
far.push([180 + Math.sin(a) * d, -380 + Math.cos(a) * d, 1, 1]);
}
var fm = dxrScatter(root, "rock", far, 80, 190, [0x3A4A52, 0x34444C, 0x2E3E46], 111, -0.3, 0.3);
return root;
},
function (G) {
var hull = dpxMat(0x3A3026, "wood"), rib = dpxMat(0x4A3A2A, "wood"), deck = dpxMat(0x5A4630, "wood"), bronze = dpxMat(0x5A9A82, "metal", { e: 0x10302A, ei: 0.4 }), cloth = dpxMat(0xB8AC8A, "plaster", { side: 1 });
var W = new THREE.Group();
W.rotation.z = 0.42;
W.rotation.x = 0.04;
W.position.y = -0.9;
G.add(W);
var h = dpxSph(W, 1, hull, 0, 1.4, 2, 14);
h.scale.set(2.4, 1.6, 13);
for (var i = 0; i < (dpxLite() ? 4 : 8); i++) {
var t = dpxTorus(W, 2.1 - i * 0.05, 0.09, rib, 0, 1.6, -9 - i * 1.1, 0, Math.PI, 8);
t.rotation.set(0, Math.PI / 2, Math.PI / 2);
t.rotation.order = "YXZ";
t.rotation.y = Math.PI / 2;
}
dpxBox(W, 0.2, 0.25, 10, rib, 0, 0.4, -13);
dpxBox(W, 3.8, 0.22, 20, deck, 0, 2.6, 3);
dpxCone(W, 0.55, 3, bronze, 0, 0.9, 15.2, 8).rotation.x = Math.PI / 2;
dpxSph(W, 0.45, dpxMat(0xD8D0C0, "plaster"), 1.6, 2.1, 12, 8);
dpxSph(W, 0.45, dpxMat(0xD8D0C0, "plaster"), -1.6, 2.1, 12, 8);
var mast = dpxCyl(G, 0.18, 0.24, 13, deck, 4.5, 0.3, 1, 8);
mast.rotation.z = Math.PI / 2;
mast.rotation.y = 0.3;
var rag = dpxBox(G, 3.2, 2.2, 0.05, cloth, 6.5, 0.9, 1.5, 0.3);
rag.rotation.x = -1.2;
for (var o = 0; o < (dpxLite() ? 3 : 7); o++) {
var oar = dpxCyl(G, 0.05, 0.05, 5, deck, -4 + o * 1.2, 0.1, -6 + o * 2.2, 5);
oar.rotation.z = Math.PI / 2;
oar.rotation.y = o * 0.7;
}
for (var a = 0; a < (dpxLite() ? 3 : 8); a++)
dxaAmphora(G, -3 + a * 0.9, 0, 6 + ((a * 37) % 5), a * 0.9, a % 3 === 0);
dxaGrowth(G, [[0, 2.6, 4], [1.5, 3, -3], [-1, 2, 9], [2, 1, 0]], 3, 7);
},
function (G, x, y, z, ry, lying) {
var c = dpxMat(0xB8603A, "plaster"), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
if (lying) {
g.rotation.z = Math.PI / 2;
g.position.y += 0.3;
}
G.add(g);
dpxLathe(g, [[0.02, 0], [0.1, 0.06], [0.22, 0.35], [0.24, 0.55], [0.16, 0.8], [0.07, 0.9], [0.08, 1.05], [0.09, 1.1]], c, 0, 0, 0, lite12());
[-1, 1].forEach(function (s) { dpxTorus(g, 0.08, 0.02, c, s * 0.1, 0.93, 0, 0, Math.PI, 6).rotation.y = Math.PI / 2; });
},
function (G, spots, n, seed) {
var R = wRand(seed || 5);
spots.forEach(function (s, k) {
for (var i = 0; i < (dpxLite() ? Math.max(1, n >> 1) : n); i++) {
var x = s[0] + (R() - 0.5) * 2.4, z = s[2] + (R() - 0.5) * 2.4, y = s[1], kind = (i + k) % 4, col = DXA_GROW_COLS[(R() * DXA_GROW_COLS.length) | 0];
if (kind === 0) {
var m = dpxMat(col, "stone");
(function grow(px, py, pz, dx, dy, dz, len, r, d) {
var ex = px + dx * len, ey = py + dy * len, ez = pz + dz * len, c = new THREE.Mesh(new THREE.CylinderGeometry(d <= 0 ? 0.005 : r * 0.7, r, len, 5), m);
c.position.set((px + ex) / 2, (py + ey) / 2, (pz + ez) / 2);
c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
G.add(c);
if (d > 0)
for (var b = 0; b < 2; b++) {
var a = R() * 6.283, nx = dx + Math.cos(a) * 0.6, ny = dy + 0.3, nz = dz + Math.sin(a) * 0.6, l = Math.hypot(nx, ny, nz);
grow(ex, ey, ez, nx / l, ny / l, nz / l, len * 0.7, r * 0.66, d - 1);
}
})(x, y, z, 0, 1, 0, 0.45 + R() * 0.3, 0.06, 2);
}
else if (kind === 1) {
var b = dpxSph(G, 0.35 + R() * 0.4, dpxMat(col, "stone"), x, y, z, 10);
b.scale.y = 0.55;
}
else if (kind === 2) {
for (var t = 0; t < 3; t++) {
var cy = dpxCyl(G, 0.09, 0.07, 0.4 + R() * 0.5, dpxMat(0xE8A030, "stone"), x + t * 0.16, y + 0.25, z + (t % 2) * 0.12, 7, true);
}
}
else {
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.6 + R() * 0.4, 9, 0, Math.PI), dpxMat(col, null, { side: 1 }));
fan.position.set(x, y, z);
fan.rotation.y = R() * 3;
G.add(fan);
}
}
});
},
function (G) {
var br = dpxMat(0x5E9E86, "metal", { e: 0x10302A, ei: 0.45 }), dark = dpxMat(0x3E6E5E, "metal", { e: 0x0A201A, ei: 0.4 }), gold = dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.6 }), st = dpxMat(0xE0DACA, window.DXU_OFF ? "stone" : "dxuslab");
dpxBox(G, 16, 2, 16, st, 0, 1, 0);
dpxBox(G, 12, 2, 12, st, 0, 3, 0);
dpxBox(G, 9, 3, 9, st, 0, 5.5, 0);
var S = new THREE.Group();
S.position.y = 7;
S.rotation.z = 0.03;
G.add(S);
[-1, 1].forEach(function (s) { var l = dpxCyl(S, 0.9, 1.15, 10, br, s * 1.5, 5, s * 0.6, 10); l.rotation.x = s * 0.08; dpxBox(S, 1.6, 0.9, 3, br, s * 1.5, 0.45, s * 0.6 + 0.6); });
dpxLathe(S, [[2.8, 9], [2.6, 11], [2.3, 13], [2.6, 15.5], [3.0, 17.5], [2.6, 19], [1.2, 20]], br, 0, 0, 0, lite12() + 4);
dpxLathe(S, [[3.2, 8.2], [3.0, 10], [2.6, 12]], dark, 0, 0, 0, lite12() + 4);
dpxSph(S, 1.35, br, 0, 21.6, 0, 14);
var bd = dpxCone(S, 1.0, 2.2, dark, 0, 20.3, 0.6, 10);
bd.rotation.x = Math.PI;
dpxSph(S, 1.2, dark, 0, 22.3, -0.35, 12);
for (var c = 0; c < 7; c++) {
var a = c / 7 * Math.PI * 2;
dpxCone(S, 0.22, 1.2, gold, Math.sin(a) * 1.25, 23.2, Math.cos(a) * 1.25, 6);
}
var la = dpxCyl(S, 0.55, 0.7, 8, br, -3.2, 14.5, 0.2, 8);
la.rotation.z = 0.35;
var ra = dpxCyl(S, 0.55, 0.7, 7, br, 3.0, 19.5, 0, 8);
ra.rotation.z = -0.45;
var tr = new THREE.Group();
tr.position.set(4.8, 22, 0.2);
S.add(tr);
dpxCyl(tr, 0.18, 0.18, 26, gold, 0, 0, 0, 8);
[-1, 0, 1].forEach(function (k) { dpxCone(tr, 0.32, 2.6, gold, k * 0.9, 14.2, 0, 6); if (k)
dpxCyl(tr, 0.12, 0.12, 1.4, gold, k * 0.9, 12.4, 0, 6); });
dpxBox(tr, 2.2, 0.3, 0.3, gold, 0, 12.9, 0);
dxaGrowth(G, [[5, 2, 5], [-5, 2, 4], [4, 4, -4], [-6, 2, -5], [0, 8, 4]], 3, 41);
var d = dpxSph(S, 0.9, br, -1.8, 1.4, 2.8, 10);
d.scale.set(0.7, 0.8, 2.4);
d.rotation.x = 0.5;
},
function () {
if (DXA_FRESCO || typeof document === "undefined")
return DXA_FRESCO;
var c = document.createElement("canvas");
c.width = 512;
c.height = 192;
var x = c.getContext("2d");
if (!x)
return null;
x.fillStyle = "#3A78B8";
x.fillRect(0, 0, 512, 192);
[["#E8B840", 0, 10], ["#B83A24", 10, 6], ["#F0E8D8", 16, 4]].forEach(function (b) { x.fillStyle = b[0]; x.fillRect(0, b[1], 512, b[2]); x.fillRect(0, 192 - b[1] - b[2], 512, b[2]); });
for (var i = 0; i < 32; i++) {
x.fillStyle = i % 2 ? "#B83A24" : "#E8B840";
x.beginPath();
x.arc(i * 16 + 8, 20, 5, 0, Math.PI);
x.fill();
x.beginPath();
x.arc(i * 16 + 8, 172, 5, Math.PI, 0);
x.fill();
}
function bull(ox, oy, s, flip) {
x.save();
x.translate(ox, oy);
x.scale(flip ? -s : s, s);
x.fillStyle = "#9A3A1E";
x.beginPath();
x.ellipse(0, 0, 62, 22, -0.05, 0, 6.283);
x.fill();
x.beginPath();
x.ellipse(48, -8, 20, 18, 0, 0, 6.283);
x.fill();
x.beginPath();
x.moveTo(56, -14);
x.lineTo(92, -4);
x.lineTo(90, 10);
x.lineTo(60, 8);
x.fill();
x.strokeStyle = "#F0E8D8";
x.lineWidth = 4;
x.beginPath();
x.moveTo(78, -8);
x.quadraticCurveTo(84, -36, 104, -30);
x.stroke();
x.beginPath();
x.moveTo(74, -6);
x.quadraticCurveTo(72, -34, 92, -38);
x.stroke();
x.strokeStyle = "#9A3A1E";
x.lineWidth = 7;
x.lineCap = "round";
x.beginPath();
x.moveTo(40, 12);
x.lineTo(84, 34);
x.stroke();
x.beginPath();
x.moveTo(30, 14);
x.lineTo(70, 40);
x.stroke();
x.beginPath();
x.moveTo(-44, 10);
x.lineTo(-92, 26);
x.stroke();
x.beginPath();
x.moveTo(-50, 6);
x.lineTo(-96, 14);
x.stroke();
x.lineWidth = 3;
x.beginPath();
x.moveTo(-60, -6);
x.quadraticCurveTo(-80, -30, -70, -50);
x.stroke();
x.fillStyle = "#F0E8D8";
for (var k = 0; k < 7; k++) {
x.beginPath();
x.ellipse(-30 + k * 12, -4 + (k % 2) * 8, 4, 6, 0, 0, 6.283);
x.fill();
}
x.fillStyle = "#1A1A1A";
x.beginPath();
x.arc(84, -4, 2.5, 0, 6.283);
x.fill();
x.restore();
}
function leaper(px, py, rot, skin, s) {
x.save();
x.translate(px, py);
x.rotate(rot);
x.scale(s, s);
x.strokeStyle = skin;
x.fillStyle = skin;
x.lineWidth = 5;
x.lineCap = "round";
x.beginPath();
x.moveTo(0, 0);
x.lineTo(0, 26);
x.stroke();
x.beginPath();
x.arc(0, -7, 6, 0, 6.283);
x.fill();
x.beginPath();
x.moveTo(0, 4);
x.lineTo(-12, 18);
x.stroke();
x.beginPath();
x.moveTo(0, 4);
x.lineTo(12, 16);
x.stroke();
x.beginPath();
x.moveTo(0, 26);
x.lineTo(-8, 44);
x.stroke();
x.beginPath();
x.moveTo(0, 26);
x.lineTo(10, 42);
x.stroke();
x.fillStyle = "#F0E8D8";
x.fillRect(-6, 20, 12, 7);
x.fillStyle = "#1A1A1A";
x.beginPath();
x.moveTo(-5, -12);
x.quadraticCurveTo(-16, 0, -12, 14);
x.lineTo(-8, 14);
x.quadraticCurveTo(-10, 0, -2, -10);
x.fill();
x.restore();
}
bull(250, 104, 1, false);
leaper(236, 40, Math.PI * 0.95, "#A8502E", 1);
leaper(352, 80, -0.4, "#F0E0D0", 0.95);
leaper(120, 104, 0.1, "#F0E0D0", 0.95);
x.fillStyle = "rgba(240,220,180,0.25)";
for (var n = 0; n < 600; n++)
x.fillRect(Math.random() * 512, Math.random() * 192, 1.5, 1.5);
for (var cr = 0; cr < 10; cr++) {
x.strokeStyle = "rgba(60,40,30,0.35)";
x.lineWidth = 1;
x.beginPath();
var sx = Math.random() * 512, sy = Math.random() * 192;
x.moveTo(sx, sy);
x.lineTo(sx + Math.random() * 60 - 30, sy + Math.random() * 40 - 20);
x.stroke();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = THREE.RepeatWrapping;
DXA_FRESCO = t;
return t;
},
function (G, x, z, mat) {
dpxCyl(G, 0.08, 0.1, 4.2, mat, x, 2.1, z, 6);
var s = new THREE.Shape();
s.moveTo(0, 0.12);
s.quadraticCurveTo(0.5, 0.6, 0.8, 0.55);
s.quadraticCurveTo(0.65, 0, 0.8, -0.55);
s.quadraticCurveTo(0.5, -0.6, 0, -0.12);
s.lineTo(0, 0.12);
[-1, 1].forEach(function (k) { var m = dpxSlab(G, s, 0.06, mat, x, 4.0, z, 0); m.scale.x = k; });
},
function (G, x, z, ry, s, mat) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s || 1);
G.add(g);
var b = dpxSph(g, 1, mat, 0, 1.7, 0, 14);
b.scale.set(0.85, 0.85, 1.9);
var ch = dpxSph(g, 1, mat, 0, 1.9, 1.2, 12);
ch.scale.set(0.95, 1.0, 0.9);
var hd = dpxSph(g, 0.55, mat, 0, 1.5, 2.5, 10);
hd.scale.set(0.8, 0.9, 1.3);
var mz = dpxBox(g, 0.6, 0.5, 0.6, mat, 0, 1.2, 3.1);
[-1, 1].forEach(function (k) {
var pts = [];
for (var i = 0; i <= 6; i++) {
var t = i / 6;
pts.push(new THREE.Vector3(k * (0.35 + t * 0.9), 1.85 + Math.sin(t * 2.4) * 0.55, 2.4 + t * 0.35 - t * t * 0.5));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 8, 0.09, 5, false), dpxMat(0xF0E8D8, "marble")));
var fl = dpxCyl(g, 0.16, 0.12, 1.5, mat, k * 0.45, 0.95, 1.7, 6);
fl.rotation.x = -0.7;
var hl = dpxCyl(g, 0.18, 0.12, 1.6, mat, k * 0.45, 0.95, -1.4, 6);
hl.rotation.x = 0.7;
});
var tl = dpxCyl(g, 0.06, 0.03, 1.6, mat, 0, 2.3, -2.2, 5);
tl.rotation.x = -0.9;
return g;
},
function (P, cx, cz, R0, name, big) {
var lite = P.lite;
P.make(cx, cz, 0, 1, function (G, H) {
var st = dpxMat(0xE8DCC8, window.DXU_OFF ? "stone" : "dxuashlar"), wh = dpxMat(0xF0E8D8, "marble"), red = dpxMat(0xA8442E, "stone"), sand = dpxMat(0xD0B890, window.DXU_OFF ? "sand" : "dxusand"), br = dpxMat(0x5E9E86, "metal", { e: 0x10302A, ei: 0.45 });
var fres = dxaFresco(), fm = fres ? new THREE.MeshLambertMaterial({ map: fres }) : red;
if (fres) {
fm.userData.ldShared = 1;
if (typeof dxuCausPatch === "function")
dxuCausPatch(fm, 0.7);
}
dpxAnnulus(G, H, 0.01, R0, sand, 0.1, lite ? 24 : 48);
var tiers = big ? 5 : 3, seg = lite ? 16 : 28, RB = wRand(Math.round(cx));
for (var k = 0; k < tiers; k++) {
var r = R0 + 1.2 + k * 1.6, h = 1.0 + k * 0.9;
for (var i = 0; i < seg; i++) {
var a = (i + 0.5) / seg * Math.PI * 2;
if (Math.abs(Math.sin(a)) < 0.12 && Math.cos(a) > 0)
continue;
if (Math.abs(Math.sin(a)) < 0.12 && Math.cos(a) < 0)
continue;
var L = Math.PI * 2 * r / seg + 0.05, x = Math.sin(a) * r, z = Math.cos(a) * r;
if (RB() < 0.08) {
var bk = dpxBox(G, L * 0.6, 0.8, 1.2, st, x, 0.4, z, a + RB());
bk.rotation.z = 0.3;
continue;
}
dpxBox(G, L, h, 1.6, st, x, h / 2, z, a);
if (k === tiers - 1 && i % 3 === 0)
dxaHorns(G, x * 1.02, h, z * 1.02, 0.7, wh, a);
if (k === 0)
LD.solids.push({ x: cx + x, z: cz + z, rot: a, hw: L / 2, hd: 0.8, h: h });
}
}
var rw = R0 + 1.2 + tiers * 1.6 + 0.6, n = lite ? 12 : 24, wh2 = big ? 6.5 : 5;
for (var j = 0; j < n; j++) {
var a2 = (j + 0.5) / n * Math.PI * 2;
if (Math.abs(Math.sin(a2)) < 0.12)
continue;
var x2 = Math.sin(a2) * rw, z2 = Math.cos(a2) * rw, L2 = Math.PI * 2 * rw / n + 0.1;
dpxBox(G, L2, wh2, 0.9, st, x2, wh2 / 2, z2, a2);
LD.solids.push({ x: cx + x2, z: cz + z2, rot: a2, hw: L2 / 2, hd: 0.6, h: wh2 });
var pnl = new THREE.Mesh(new THREE.PlaneGeometry(L2, 1.8), fm);
pnl.position.set(Math.sin(a2) * (rw - 0.47), wh2 - 1.6, Math.cos(a2) * (rw - 0.47));
pnl.rotation.y = a2 + Math.PI;
G.add(pnl);
if (j % 2 === 0)
dxaHorns(G, x2, wh2, z2, 0.9, red, a2);
}
[0, Math.PI].forEach(function (ga) {
[-1, 1].forEach(function (sd) {
var gx = Math.sin(ga) * rw + Math.cos(ga) * sd * 4, gz = Math.cos(ga) * rw - Math.sin(ga) * sd * 4;
dpxCyl(G, 0.7, 0.5, wh2 + 1, red, gx, (wh2 + 1) / 2, gz, 12);
dpxCyl(G, 0.85, 0.85, 0.5, dpxMat(0x1A1A1A, "stone"), gx, wh2 + 1.2, gz, 12);
LD.solids.push({ x: cx + gx, z: cz + gz, r: 0.8, h: wh2 + 1 });
});
dpxBox(G, 9.5, 0.9, 1.6, red, Math.sin(ga) * rw, wh2 + 1.9, Math.cos(ga) * rw, ga);
});
var alt = dpxBox(G, 3.2, 1.1, 2.0, st, 0, 0.55, 0, 0.7);
alt.rotation.z = 0.12;
dpxBox(G, 1.4, 0.7, 1.1, st, 2.6, 0.35, 1.2, 1.9);
LD.solids.push({ x: cx, z: cz, r: 1.9, h: 1.1 });
if (!lite) {
dxaLabrys(G, R0 * 0.6, R0 * 0.3, dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.6 }));
dxaLabrys(G, -R0 * 0.6, -R0 * 0.3, dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.6 }));
}
dxaGrowth(G, [[R0 * 0.7, 0, R0 * 0.5], [-R0 * 0.8, 0, -R0 * 0.2], [R0 * 0.2, 0, -R0 * 0.8], [rw * 0.95, wh2, 0]], big ? 4 : 3, Math.round(cz));
for (var q = 0; q < (lite ? 2 : 6); q++)
dxaAmphora(G, (RB() - 0.5) * R0 * 1.4, 0, (RB() - 0.5) * R0 * 1.4, RB() * 6, RB() < 0.6);
}, null);
dpxDo(P, cx, cz + R0 * 0.5, 5, name, "picture the old bull dance", function () { dxaBullDance(name); });
dpxDo(P, cx + R0 * 0.55, cz - R0 * 0.1, 4, "The bull-leapers' wall", "look at the painting", function () { dxaFrescoCard(); });
},
function (where) {
var steps = [
["The bull is charging straight at you, head low. What do you do?", [["Stand still and wait for the horns", 1], ["Run to the side", 0], ["Turn your back", 0]], "Right: the leapers met the bull head-on and waited for it to toss its head."],
["It tosses its head up. Now!", [["Grab both horns and let it throw you up", 1], ["Let go and duck", 0], ["Jump to the left", 0]], "Right: the toss is what lifts the leaper into the air."],
["You are flying over its back, upside down.", [["Push off its back with your hands", 1], ["Grab its tail", 0], ["Shut your eyes", 0]], "Right: in the fresco the leaper does a handspring off the bull's back."],
["You are coming down behind it.", [["Land on your feet into your friend's arms", 1], ["Land on your back", 0], ["Hold on to the bull", 0]], "Right: a third dancer stands behind the bull to catch and steady the leaper, as in the painting."]
];
var i = 0, score = 0;
function next() {
if (i >= steps.length) {
dpxMark("bulldance");
dpxCard(where, score === steps.length ? "🐂 <b>You danced with the bull!</b> Grab, toss, handspring, land: the leap painted on the walls of Knossos some 3,400 years ago." : "The bull thunders past. You got <b>" + score + " of " + steps.length + "</b> moves right. The dancers trained for years; try again.", [["Dance again", function () { i = 0; score = 0; next(); }], ["Close", dpxClose]]);
return;
}
var s = steps[i], order = s[1].slice().sort(function () { return Math.random() - 0.5; });
dpxCard(where + " · move " + (i + 1) + " of " + steps.length, dpxEsc(s[0]), order.map(function (o) { return [o[0], function () { if (o[1])
score++; var tip = o[1] ? "✅ " + s[2] : "❌ The bull swerves away. " + s[2].replace(/^Right: /, "The dancers' way: "); i++; dpxCard(where, dpxEsc(tip), [["Next", next]]); }]; }));
}
next();
},
function () {
dpxLearn("fresco", "The bull-leapers", ["This wall copies the style of the famous \"bull-leaping fresco\" from the palace of Knossos on Crete, painted about 1450 BC and now in the Heraklion Archaeological Museum: a red bull at full gallop, a young athlete vaulting over its back, one at the horns, one waiting to catch.",
"The Minoans of Crete held bull games in their palace courts. Nobody knows for sure how the leap was done; some think it is partly the painter's imagination.",
"Plato's Atlantis has bulls too: the ten kings, he writes in the Critias, hunted the bulls that roamed free in Poseidon's temple, \"with staves and nooses\" and no weapons, and sacrificed the one they caught at the pillar of the laws.",
"Many writers since have tied Atlantis to Minoan Crete, which was struck by the huge eruption of Thera (Santorini) about 1600 BC. The horns of consecration on the walls and the double axes are Minoan signs."]);
},
function () {
if (DXA_RUIN)
return DXA_RUIN;
var L = [];
function bx(w, h, d, x, y, z) { var g = new THREE.BoxGeometry(w, h, d); g.translate(x, y, z); L.push(g); }
bx(10, 3.2, 0.6, 0, 1.6, -4.7);
bx(0.6, 2.4, 9.4, -4.7, 1.2, 0);
bx(0.6, 3.6, 9.4, 4.7, 1.8, 0);
bx(3.6, 2.0, 0.6, -3.2, 1.0, 4.7);
bx(3.6, 1.2, 0.6, 3.2, 0.6, 4.7);
bx(0.6, 1.6, 5, 0.4, 0.8, -2.2);
bx(10.6, 0.3, 10.6, 0, 0.15, 0);
var c = new THREE.CylinderGeometry(0.28, 0.32, 3.4, 8);
c.translate(-1.2, 1.7, 6.2);
L.push(c);
var c2 = new THREE.CylinderGeometry(0.3, 0.32, 1.1, 8);
c2.translate(1.2, 0.55, 6.2);
L.push(c2);
DXA_RUIN = dxrMerge(L);
return DXA_RUIN;
},
function (P, A) {
var lite = P.lite, R = wRand(7171), list = [];
var want = lite ? 70 : 220;
for (var t = 0; t < want * 4 && list.length < want; t++) {
var a = R() * Math.PI * 2, r = 232 + Math.sqrt(R()) * 190, x = A.x + Math.sin(a) * r, z = A.z + Math.cos(a) * r;
if (Math.abs(x - A.x) < 40 && z > A.z)
continue;
if (Math.hypot(x - (A.x + 300), z - A.z) < 52 || Math.hypot(x - (A.x - 300), z - (A.z + 40)) < 42)
continue;
if (Math.hypot(x - A.x, z - (A.z + (A.canal ? A.canal[1] : 360) + 20)) < 40)
continue;
var ok = true;
for (var q = 0; q < list.length; q++) {
if (Math.hypot(list[q][0] - x, list[q][1] - z) < 13.5) {
ok = false;
break;
}
}
if (!ok)
continue;
list.push([x, z, Math.atan2(A.x - x, A.z - z), [0xF0EAE0, 0xE8DCC8, 0xE0D0B8, 0xD8B8A0, 0xC8C4B8][(R() * 5) | 0], 0.85 + R() * 0.35]);
}
P.make(A.x, A.z, 0, 1, function (G, H) {
var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x2A2824, map: typeof texOf === "function" ? texOf("stone") : null });
m.userData.ldShared = 1;
if (typeof dxuCausPatch === "function")
dxuCausPatch(m, 1);
var geo = dxaRuinGeo();
if (!geo.attributes.uv) {
var n = geo.attributes.position.count, uv = new Float32Array(n * 2), p = geo.attributes.position, nr = geo.attributes.normal;
for (var i = 0; i < n; i++) {
var ax = Math.abs(nr.getX(i)) > 0.5;
uv[i * 2] = (ax ? p.getZ(i) : p.getX(i)) / 4;
uv[i * 2 + 1] = p.getY(i) / 4;
}
geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}
var im = new THREE.InstancedMesh(geo, m, list.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), C = new THREE.Color(), Y = new THREE.Vector3(0, 1, 0);
list.forEach(function (q, i) { Q.setFromAxisAngle(Y, q[2]); M.compose(new THREE.Vector3(q[0] - A.x, H.y(q[0] - A.x, q[1] - A.z) - 0.1, q[1] - A.z), Q, new THREE.Vector3(q[4], q[4] * (0.8 + ((i * 13) % 7) / 14), q[4])); im.setMatrixAt(i, M); C.setHex(q[3]); im.setColorAt(i, C); });
im.instanceMatrix.needsUpdate = true;
im.receiveShadow = true;
G.add(im);
var pv = dpxMat(0xD0C8B4, window.DXU_OFF ? "paving" : "dxuslab");
[260, 320, 380].forEach(function (rr) { dpxAnnulus(G, H, rr - 3, rr + 3, pv, 0.07, lite ? 36 : 72); });
for (var s = 0; s < 8; s++) {
var sa = s / 8 * Math.PI * 2 + 0.2;
if (Math.cos(sa) > 0.9)
continue;
dpxStrip(G, H, Math.sin(sa) * 214, Math.cos(sa) * 214, Math.sin(sa) * 425, Math.cos(sa) * 425, 6, pv, 0.08);
}
return true;
}, null);
var ex = [[0, -4.7, 5, 0.4], [-4.7, 0, 0.4, 4.7], [4.7, 0, 0.4, 4.7], [-3.2, 4.7, 1.8, 0.4], [3.2, 4.7, 1.8, 0.4]];
list.forEach(function (q) { var c = Math.cos(q[2]), s = Math.sin(q[2]); ex.forEach(function (e) { var lx = e[0] * q[4], lz = e[1] * q[4]; DXA_SOLIDS.push({ x: q[0] + lx * c + lz * s, z: q[1] - lx * s + lz * c, rot: q[2], hw: e[2] * q[4], hd: e[3] * q[4], h: 3 }); }); });
},
function (G, x, z, ry, fallen, mat, seed) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
dpxBox(g, 2.4, 1.6, 2.4, dpxMat(0xE0DACA, window.DXU_OFF ? "stone" : "dxuslab"), 0, 0.8, 0);
var F = new THREE.Group();
F.position.y = 1.6;
g.add(F);
if (fallen) {
F.rotation.x = Math.PI / 2 * 0.96;
F.position.set(0, 0.4, 2.2);
}
dpxLathe(F, [[0.6, 0], [0.62, 1.2], [0.5, 2.4], [0.62, 3.2], [0.7, 3.8], [0.35, 4.2]], mat, 0, 0, 0, 10);
dpxSph(F, 0.42, mat, 0, 4.6, 0, 10);
dpxCyl(F, 0.42, 0.38, 0.3, dpxMat(0xE8C060, "metal", { e: 0x6A4A10, ei: 0.6 }), 0, 5.0, 0, 10);
[-1, 1].forEach(function (s) { var a = dpxCyl(F, 0.17, 0.15, 2.2, mat, s * 0.72, 2.9, 0, 6); a.rotation.z = s * 0.06; });
if (fallen)
dpxSph(g, 0.42, mat, 0.8, 0.42, 6.4, 10);
},
function (G, x, z, col) {
var br = dpxMat(0x6A8A70, "metal", { e: 0x10201A, ei: 0.4 }), c = col || 0x8AF0E8;
dpxCyl(G, 0.5, 0.6, 0.25, br, x, 0.12, z, 10);
dpxLathe(G, [[0.3, 0.25], [0.18, 0.6], [0.16, 1.6], [0.2, 1.9], [0.32, 2.0]], br, x, 0, z, 10);
dpxLathe(G, [[0.2, 2.0], [0.75, 2.2], [0.85, 2.42], [0.8, 2.45]], br, x, 0, z, 14);
var s = dpxCyl(G, 0.74, 0.74, 0.04, dpxGlow(c, 0.95), x, 2.38, z, 14);
var h = dpxSph(G, 1.1, dpxGlow(c, 0.14), x, 2.6, z, 10);
h.scale.y = 0.6;
},
function () {
if (DXI.shaft)
return DXI.shaft;
var c = document.createElement("canvas");
c.width = 64;
c.height = 128;
var x = c.getContext("2d"), img = x.createImageData(64, 128);
for (var yy = 0; yy < 128; yy++)
for (var xx = 0; xx < 64; xx++) {
var u = xx / 63, v = yy / 127, side = Math.pow(Math.sin(u * Math.PI), 2.2), fall = Math.pow(1 - v, 1.6) * 0.85 + 0.05 * (1 - v), a = side * fall, i = (yy * 64 + xx) * 4;
img.data[i] = 220;
img.data[i + 1] = 245;
img.data[i + 2] = 255;
img.data[i + 3] = Math.round(a * 255);
}
x.putImageData(img, 0, 0);
var t = new THREE.CanvasTexture(c), m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, opacity: 0.32 });
m.userData.ldShared = 1;
return (DXI.shaft = m);
},
function (n, h) {
var pos = new Float32Array(n * 3), sz = new Float32Array(n);
for (var i = 0; i < n; i++) {
pos[i * 3] = (Math.random() - 0.5) * 0.5;
pos[i * 3 + 1] = Math.random() * h;
pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
sz[i] = 0.6 + Math.random();
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("sz", new THREE.BufferAttribute(sz, 1));
if (!DXI.bub)
DXI.bub = new THREE.ShaderMaterial({ uniforms: { t: DXU.u.t, H: { value: h } }, transparent: true, depthWrite: false,
vertexShader: "uniform float t; uniform float H; attribute float sz; void main(){ vec3 p=position; p.y=mod(p.y+t*0.5*sz,H); p.x+=sin(t*2.0+p.y*3.0)*0.05*sz; vec4 mv=modelViewMatrix*vec4(p,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=clamp(sz*60.0/-mv.z,1.5,14.0); }",
fragmentShader: "void main(){ vec2 q=gl_PointCoord-0.5; float d=length(q); float a=smoothstep(0.5,0.42,d)*(0.25+0.75*smoothstep(0.25,0.45,d)); a+=smoothstep(0.18,0.0,length(q-vec2(-0.14,0.14)))*0.6; gl_FragColor=vec4(0.9,0.98,1.0,a*0.75); }" });
var p = new THREE.Points(g, DXI.bub);
p.frustumCulled = false;
return p;
},
function (I) {
if (!I || !I.root || !I.ce || !I.ce.rooms)
return;
var lite = dxpLiteSafe(), root = I.root, fish = 0;
root.traverse(function (m) { if (!m.isMesh || !m.material || Array.isArray(m.material))
return; var mt = m.material; if (mt.type === "MeshBasicMaterial" || mt.transparent || mt.type === "ShaderMaterial")
return; dxuCausPatch(mt, 0.75); });
var fl = I.floor || 4.8;
I.ce.rooms.forEach(function (r, i) {
var w = r.x1 - r.x0, d = r.z1 - r.z0, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, y0 = (r.L || 0) * fl, big = w >= 7 && d >= 7;
if (lite && !big)
return;
var sh = new THREE.Group();
sh.position.set(cx, y0, cz);
root.add(sh);
for (var k = 0; k < (big ? 3 : 1); k++) {
var p = new THREE.Mesh(new THREE.PlaneGeometry(1.2 + k * 0.4, fl * 0.98), dxiShaftMat());
p.position.set((k - 1) * w * 0.22, fl * 0.49, (k % 2 ? -1 : 1) * d * 0.12);
p.rotation.set(0.0, k * 1.1, 0.22);
sh.add(p);
var p2 = p.clone();
p2.rotation.y += Math.PI / 2;
sh.add(p2);
}
var b = dxiBubbles(big ? 40 : 16, fl * 0.95);
b.position.set(r.x0 + w * 0.8, y0, r.z0 + d * 0.25);
root.add(b);
if (big && fish < (lite ? 2 : 8) && typeof dxlSchool === "function") {
fish++;
var S0 = DXL.schools.length;
dxlSchool(root, ["fish1", "fish2", "fish3"][i % 3], lite ? 8 : 14, { cx: cx, cz: cz, r: Math.min(w, d) * 0.3, y: y0 + fl * 0.62, sp: (i % 2 ? -1 : 1) * 0.35, bob: 0.2, bf: 2, ph: i, spread: 1.4, a0: i }, 0.26);
DXI.list.push(1);
}
});
},
function (I) {
var fl = I.floor || 4.8, wall = dxiSurf("dxunacre"), floor = dxiSurf("dxumosaic");
I.root.updateMatrixWorld(true);
I.root.traverse(function (m) {
if (!m.isMesh || !m.material || Array.isArray(m.material) || m.material.type !== "MeshLambertMaterial" || !m.material.map)
return;
var g = m.geometry;
if (!g.boundingBox)
g.computeBoundingBox();
var s = g.boundingBox.getSize(new THREE.Vector3()), c = g.boundingBox.getCenter(new THREE.Vector3());
m.localToWorld(c);
var ly = ((c.y % fl) + fl) % fl;
if (s.y > 2.6 && Math.max(s.x, s.z) > 1.0 && !(m.parent && m.parent.userData && m.parent.userData.furn))
m.material = wall;
else if (s.y < 0.4 && s.x > 3 && s.z > 3 && ly < 0.5)
m.material = floor;
});
},
function () {
if (DXS.mat)
return DXS.mat;
var c = document.createElement("canvas");
c.width = 256;
c.height = 512;
var x = c.getContext("2d"), W = 256, H = 512;
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#1A0E08");
g.addColorStop(0.55, "#4A2A14");
g.addColorStop(1, "#2A160C");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var r = x.createRadialGradient(W / 2, H * 0.62, 10, W / 2, H * 0.62, W * 0.9);
r.addColorStop(0, "rgba(255,196,120,0.95)");
r.addColorStop(0.35, "rgba(230,140,70,0.45)");
r.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = r;
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(255,220,170,0.18)";
x.lineWidth = 2;
for (var i = -6; i <= 6; i++) {
x.beginPath();
x.moveTo(W / 2 + i * 6, H * 0.66);
x.lineTo(W / 2 + i * 60, H);
x.stroke();
}
for (var k = 0; k < 6; k++) {
var y = H * 0.66 + Math.pow(k / 6, 1.8) * H * 0.34;
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
for (var p = 0; p < 4; p++) {
var s = 1 - p * 0.22, pw = 34 * s, ph = H * 0.9 * s, cy = H * 0.66, top = cy - ph * 0.78, sh = 60 + p * 36;
[-1, 1].forEach(function (sd) {
var px = W / 2 + sd * (W * 0.42 * s) - pw / 2;
var pg = x.createLinearGradient(px, 0, px + pw, 0);
pg.addColorStop(0, "rgb(" + (sh * 0.5 | 0) + "," + (sh * 0.28 | 0) + "," + (sh * 0.18 | 0) + ")");
pg.addColorStop(sd < 0 ? 0.8 : 0.2, "rgb(" + (sh + 70) + "," + ((sh * 0.8 + 40) | 0) + "," + ((sh * 0.6 + 30) | 0) + ")");
pg.addColorStop(1, "rgb(" + (sh * 0.5 | 0) + "," + (sh * 0.28 | 0) + "," + (sh * 0.18 | 0) + ")");
x.fillStyle = pg;
x.beginPath();
var st = 24;
for (var q = 0; q <= st; q++) {
var yy = top + ph * q / st;
x.lineTo(px + Math.sin(q * 1.3 + p) * pw * 0.18 - (q === st ? pw * 0.25 : 0), yy);
}
for (var q2 = st; q2 >= 0; q2--) {
var y2 = top + ph * q2 / st;
x.lineTo(px + pw + Math.sin(q2 * 1.7 + p * 2) * pw * 0.18 + (q2 === st ? pw * 0.25 : 0), y2);
}
x.closePath();
x.fill();
});
}
var l = x.createRadialGradient(W / 2, H * 0.36, 2, W / 2, H * 0.36, 40);
l.addColorStop(0, "rgba(255,240,200,1)");
l.addColorStop(1, "rgba(255,200,120,0)");
x.fillStyle = l;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(40,24,14,0.85)";
[[90, 250], [150, 230], [120, 300], [170, 280]].forEach(function (f) { x.beginPath(); x.ellipse(f[0], f[1], 7, 3, 0, 0, 6.283); x.fill(); x.beginPath(); x.moveTo(f[0] - 6, f[1]); x.lineTo(f[0] - 12, f[1] - 4); x.lineTo(f[0] - 12, f[1] + 4); x.fill(); });
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
if (typeof renderer !== "undefined" && renderer.capabilities)
t.anisotropy = 4;
var m = new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide });
m.userData.ldShared = 1;
return (DXS.mat = m);
},
function (w, h, seed, grow, bottom) {
var R = wRand(seed), n = 40, pts = [], ph = [R() * 6, R() * 6, R() * 6], cx = 0, cy = h / 2, rx = w / 2 + grow, ry = h / 2 + grow, k = bottom || 0;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
var e = s < 0 ? 3.2 : 2.2, px = Math.sign(c) * Math.pow(Math.abs(c), 2 / e), py = Math.sign(s) * Math.pow(Math.abs(s), 2 / e);
var j = 1 + 0.06 * Math.sin(a * 3 + ph[0]) + 0.04 * Math.sin(a * 7 + ph[1]) + 0.025 * Math.sin(a * 13 + ph[2]) + (R() - 0.5) * 0.03 + k * 0.02;
pts.push(new THREE.Vector2(cx + px * rx * j, cy + py * ry * j));
}
return pts;
},
function (G, frame, hole, x, y, z, ry, w, h) {
ry = ry || 0;
if (window.DXU_OFF) {
dpxFlat(G, dpxGothic(w + 0.8, h + 1.2), frame, x - Math.sin(ry) * 0.06, y - 0.6, z - Math.cos(ry) * 0.06, ry);
return dpxFlat(G, dpxGothic(w, h), hole, x, y, z, ry);
}
var seed = Math.round(x * 31 + z * 17 + y * 7) + 5000;
var inner = dxsRough(w, h, seed, 0), outer = dxsRough(w, h, seed + 11, 0.55 + w * 0.08, 1);
var ring = new THREE.Shape(outer), hp = new THREE.Path(inner.slice().reverse());
ring.holes.push(hp);
var geo = new THREE.ExtrudeGeometry(ring, { depth: 0.7, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 2, curveSegments: 4 });
geo.translate(0, 0, -0.35);
if (typeof dpxUV === "function")
dpxUV(geo, 1, 1);
dpxAdd(G, geo, frame, x + Math.sin(ry) * 0.25, y, z + Math.cos(ry) * 0.25, 0, ry, 0);
var m = dpxAdd(G, new THREE.ShapeGeometry(new THREE.Shape(inner)), hole, x - Math.sin(ry) * 0.1, y, z - Math.cos(ry) * 0.1, 0, ry, 0);
return dxsFit(m, w, h);
},
function () {
if (DXS.wins)
return DXS.wins;
var T = 3, W = [];
for (var wx = -23.6; wx <= 23.7; wx += 6.75) {
if (Math.abs(wx) < 5)
continue;
W.push({ x: wx, z: 21.14, ox: 0, oz: 1, y: T + 4, h: 10, w: 3.2, side: wx < 0 ? "fl" : "fr" });
W.push({ x: wx, z: 21.14, ox: 0, oz: 1, y: T + 19, h: 7, w: 2.6, side: wx < 0 ? "fl" : "fr" });
}
for (var wz = -24; wz <= 16.1; wz += 8) {
[-1, 1].forEach(function (sd) {
W.push({ x: sd * 28.14, z: wz, ox: sd, oz: 0, y: T + 4, h: 10, w: 3.2, side: sd < 0 ? "l" : "r" });
W.push({ x: sd * 28.14, z: wz, ox: sd, oz: 0, y: T + 19, h: 7, w: 2.6, side: sd < 0 ? "l" : "r" });
});
}
return (DXS.wins = W);
},
function (feet) {
if (DXS.cool > 0 || typeof LD === "undefined" || !LD.g || typeof DPX_KING === "undefined")
return;
var P = camera.position, lx = P.x - LD.ox - DPX_KING.x, lz = P.z - LD.oz - DPX_KING.z;
if (Math.abs(lx) > 34 || lz > 26 || lz < -34)
return;
var W = dxsWins();
for (var i = 0; i < W.length; i++) {
var w = W[i], dx = lx - w.x, dz = lz - w.z, out = dx * w.ox + dz * w.oz, side = Math.abs(dx * w.oz - dz * w.ox);
if (out < -0.2 || out > 2.6 || side > w.w / 2 + 0.4 || feet < w.y - 1.2 || feet > w.y + w.h - 1.4)
continue;
var D = dxsPalaceDoor();
if (!D || typeof evbEnter !== "function")
return;
DXS.cool = 2;
evbEnter(D);
if (typeof INT !== "undefined" && INT && INT.dxsWin) {
var a = INT.dxsWin[w.side] || INT.dxsWin.fl;
if (a) {
camera.position.x = INT.ox + a.x;
camera.position.z = INT.oz + a.z;
yaw = a.face;
}
}
if (typeof setStatus === "function")
setStatus("<b>You swim in through the window.</b> The open windows in the outer walls take you back out into the sea.");
return;
}
},
function () {
if (DXS.sea)
return DXS.sea;
var c = document.createElement("canvas");
c.width = 256;
c.height = 384;
var x = c.getContext("2d"), W = 256, H = 384, R = wRand(331);
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#7FD0E8");
g.addColorStop(0.45, "#2A8AB0");
g.addColorStop(1, "#0E3A58");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 7; i++) {
var x0 = R() * W, w = 10 + R() * 24;
var rg = x.createLinearGradient(0, 0, 0, H * 0.8);
rg.addColorStop(0, "rgba(230,250,255,0.35)");
rg.addColorStop(1, "rgba(230,250,255,0)");
x.fillStyle = rg;
x.beginPath();
x.moveTo(x0, 0);
x.lineTo(x0 + w, 0);
x.lineTo(x0 + w * 2.4 - 30, H * 0.8);
x.lineTo(x0 - 30, H * 0.8);
x.fill();
}
x.fillStyle = "#1E5068";
x.beginPath();
x.moveTo(0, H);
for (var k = 0; k <= 16; k++) {
x.lineTo(k * W / 16, H * 0.8 - R() * 30 - (k % 5 === 2 ? 40 : 0));
}
x.lineTo(W, H);
x.fill();
var cols = ["#E8805A", "#D85A7A", "#E8C060", "#9A6AC8"];
for (var j = 0; j < 14; j++) {
x.fillStyle = cols[j % 4];
var bx = R() * W, by = H * 0.8 + R() * H * 0.15, s = 4 + R() * 9;
x.beginPath();
x.moveTo(bx, by);
x.lineTo(bx - s, by - s * 2.2);
x.lineTo(bx + s, by - s * 2.2);
x.fill();
}
x.fillStyle = "rgba(20,50,70,0.8)";
for (var f = 0; f < 12; f++) {
var fx = R() * W, fy = H * 0.25 + R() * H * 0.4, s2 = 3 + R() * 5;
x.beginPath();
x.ellipse(fx, fy, s2 * 1.6, s2 * 0.6, 0, 0, 6.283);
x.fill();
x.beginPath();
x.moveTo(fx - s2 * 1.4, fy);
x.lineTo(fx - s2 * 2.6, fy - s2);
x.lineTo(fx - s2 * 2.6, fy + s2);
x.fill();
}
var t = new THREE.CanvasTexture(c);
var m = new THREE.MeshBasicMaterial({ map: t });
return (DXS.sea = m);
},
function (I, palace) {
if (!I || !I.root)
return;
var panes = [];
I.root.traverse(function (m) { if (dxsIsPane(m))
panes.push(m); });
var sea = dxsSeaMat(), ringMat = dpxMat(0xE0B0A0, "dxucoral");
panes.forEach(function (m, i) {
m.material = sea;
var pr = m.geometry.parameters || {}, w = pr.width || 1.9, hh = pr.height || 2.0, seed = 4100 + i * 13;
var inner = dxsRough(w, hh, seed, 0), outer = dxsRough(w, hh, seed + 5, 0.35, 1);
var sg = new THREE.ShapeGeometry(new THREE.Shape(inner));
sg.translate(0, -hh / 2, 0);
m.geometry = sg;
var p = sg.attributes.position, uv = sg.attributes.uv;
for (var k = 0; k < p.count; k++)
uv.setXY(k, (p.getX(k) + w / 2) / w, (p.getY(k) + hh / 2) / hh);
var ring = new THREE.Shape(outer);
ring.holes.push(new THREE.Path(inner.slice().reverse()));
var rg = new THREE.ExtrudeGeometry(ring, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 1, curveSegments: 4 });
rg.translate(0, -hh / 2, 0);
if (typeof dpxUV === "function")
dpxUV(rg, 1, 1);
var rm = new THREE.Mesh(rg, ringMat);
rm.position.copy(m.position);
rm.rotation.copy(m.rotation);
m.parent.add(rm);
});
if (!palace || !I.evbActs || !I.start)
return;
var sx = I.start.x - (I.ox || 0), sz = I.start.z - (I.oz || 0);
var R = (I.ce && I.ce.rooms || []).filter(function (r) { return !(r.L || 0); }), cx = 0, cz = 0;
if (R.length) {
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
R.forEach(function (r) { x0 = Math.min(x0, r.x0); x1 = Math.max(x1, r.x1); z0 = Math.min(z0, r.z0); z1 = Math.max(z1, r.z1); });
cx = (x0 + x1) / 2;
cz = (z0 + z1) / 2;
}
var fx = sx - cx, fz = sz - cz;
if (Math.abs(fx) > Math.abs(fz)) {
fx = Math.sign(fx);
fz = 0;
}
else {
fz = Math.sign(fz) || 1;
fx = 0;
}
var rx = fz, rz = -fx;
I.dxsWin = {};
panes.forEach(function (m) {
if (m.position.y > 4)
return;
var ix = Math.sin(m.rotation.y), iz = Math.cos(m.rotation.y), ox = -ix, oz = -iz, side = null;
if (ox * fx + oz * fz > 0.7)
side = ((m.position.x - cx) * rx + (m.position.z - cz) * rz) < 0 ? "fl" : "fr";
else if (ox * rx + oz * rz > 0.7)
side = "r";
else if (ox * rx + oz * rz < -0.7)
side = "l";
else
side = "r";
var ax = m.position.x + ix * 1.2, az = m.position.z + iz * 1.2;
if (!I.dxsWin[side])
I.dxsWin[side] = { x: ax, z: az, face: Math.atan2(ox, oz) };
I.evbActs.push({ L: 0, x: ax, z: az, r: 1.6, name: "An open window", verb: "swim out into the sea", fn: function () { dxsWindowOut(side); } });
});
if (!I.dxsWin.fr)
I.dxsWin.fr = I.dxsWin.fl || I.dxsWin.r || I.dxsWin.l;
if (!I.dxsWin.fl)
I.dxsWin.fl = I.dxsWin.fr;
if (!I.dxsWin.r)
I.dxsWin.r = I.dxsWin.fr;
if (!I.dxsWin.l)
I.dxsWin.l = I.dxsWin.fl;
},
function (side) {
if (typeof exitInterior !== "function" || typeof LD === "undefined" || typeof DPX_KING === "undefined")
return;
var W = dxsWins().filter(function (w) { return w.side === side && w.y < 10; }), w = W[(W.length / 2) | 0] || dxsWins()[0];
exitInterior(true);
if (!DXS.swim) {
DXS.swim = true;
DXS.keep = !!canFly;
window.DXU_SWIM = 1;
}
canFly = true;
DXS.cool = 2.5;
var feet = w.y + 1.5, X = LD.ox + DPX_KING.x + w.x + w.ox * 3.6, Z = LD.oz + DPX_KING.z + w.z + w.oz * 3.6;
camera.position.set(X, feet + 1.72, Z);
if (typeof flyY !== "undefined")
flyY = feet;
if (typeof flyVz !== "undefined")
flyVz = 0;
yaw = Math.atan2(-w.ox, -w.oz) + Math.PI;
pitch = 0;
if (typeof setStatus === "function")
setStatus("<b>Out through the window,</b> into the open sea. Space to rise, C to sink.");
},
function (G, seed, bark, moss, leaf) {
var R = wRand(seed), t = new THREE.Group();
t.scale.setScalar(1.4 + R() * 0.3);
G.add(t);
var h = 1.6 + R() * 0.8, lean = (R() - 0.5) * 0.3;
var tr = dpxCyl(t, 0.22, 0.36, h, bark, 0, h / 2, 0, 8);
tr.rotation.z = lean;
var top = new THREE.Vector3(Math.sin(-lean) * h * 0.5, h, 0), n = 4 + ((R() * 2) | 0);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.6, L = 1.4 + R() * 1.2, up = 0.5 + R() * 0.5;
var end = new THREE.Vector3(top.x + Math.sin(a) * L, top.y + up * L * 0.6, Math.cos(a) * L), mid = top.clone().lerp(end, 0.5);
mid.y += 0.25;
t.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(top, mid, end), 6, 0.12, 6, false), bark));
for (var j = 0; j < 2; j++) {
var b = a + (j ? 0.6 : -0.6), l2 = 0.6 + R() * 0.6, e2 = new THREE.Vector3(end.x + Math.sin(b) * l2, end.y + 0.3 + R() * 0.4, end.z + Math.cos(b) * l2);
t.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(end, e2), 2, 0.04, 4, false), bark));
for (var q = 0; q < (dpxLite() ? 2 : 5); q++) {
var lf = new THREE.Mesh(DXS.leaf || (DXS.leaf = new THREE.CircleGeometry(0.22, 6)), q % 3 ? moss : leaf);
lf.scale.set(1, 1.8, 1);
lf.position.set(e2.x + (R() - 0.5) * 0.5, e2.y + (R() - 0.3) * 0.4, e2.z + (R() - 0.5) * 0.5);
lf.rotation.set(R() * 3, R() * 3, R() * 3);
t.add(lf);
}
}
}
return t;
},
function (h, seed) {
var R = wRand(seed), pts = [], n = 12;
for (var i = 0; i <= n; i++) {
var t = i / n, r = 0.55 - 0.25 * t + 0.18 * Math.sin(t * 9 + R() * 2) + (t > 0.85 ? (t - 0.85) * 3.2 : 0);
pts.push(new THREE.Vector2(Math.max(0.12, r), t * h));
}
var g = new THREE.LatheGeometry(pts, 9), p = g.attributes.position;
for (var j = 0; j < p.count; j++) {
var y = p.getY(j), a = Math.atan2(p.getZ(j), p.getX(j)), k = 1 + 0.18 * Math.sin(a * 3 + y * 2.1) + 0.1 * Math.sin(a * 5 - y * 3.3);
p.setX(j, p.getX(j) * k + Math.sin(y * 1.4) * 0.08);
p.setZ(j, p.getZ(j) * k);
}
g.computeVertexNormals();
var uv = g.attributes.uv;
for (var u = 0; u < uv.count; u++)
uv.setXY(u, uv.getX(u) * 2, uv.getY(u) * h / 2);
return g;
},
function (I) {
if (!I || !I.root || !I.ce || !I.ce.rooms)
return;
var lite = typeof LITE !== "undefined" && !!LITE, fl = I.floor || 4.8;
var wall = dxiSurf("dxucoralin"), floor = dxiSurf("dxusandfloor"), ceil = dxiSurf("dxushellceil"), low = dxiSurf("dxucoral");
I.root.updateMatrixWorld(true);
I.root.traverse(function (m) {
if (!m.isMesh || !m.material || Array.isArray(m.material))
return;
var mt = m.material;
if (mt.type !== "MeshLambertMaterial" || !mt.map)
return;
if (m.parent && m.parent.userData && m.parent.userData.furn)
return;
var g = m.geometry;
if (!g.boundingBox)
g.computeBoundingBox();
var s = g.boundingBox.getSize(new THREE.Vector3()), c = g.boundingBox.getCenter(new THREE.Vector3());
m.localToWorld(c);
var ly = ((c.y % fl) + fl) % fl;
if (s.y > 2.6 && Math.max(s.x, s.z) > 1.0) {
m.material = wall;
}
else if (s.y > 0.5 && s.y <= 2.6 && Math.max(s.x, s.z) > 1.0 && Math.min(s.x, s.z) < 0.4 && ly < 1.4)
m.material = low;
else if (s.y < 0.4 && s.x > 3 && s.z > 3) {
if (ly < 0.5)
m.material = floor;
else if (ly > fl - 0.8)
m.material = ceil;
}
});
var cm = dpxMat(0xD89080, "dxucoral"), geos = [], RG = wRand(4242), mat4 = new THREE.Matrix4();
I.ce.rooms.forEach(function (r, i) {
if (lite && i % 2)
return;
var y0 = (r.L || 0) * fl;
[[r.x0 + 0.45, r.z0 + 0.45], [r.x1 - 0.45, r.z0 + 0.45], [r.x0 + 0.45, r.z1 - 0.45], [r.x1 - 0.45, r.z1 - 0.45]].forEach(function (q, k) {
if (RG() < 0.25)
return;
var g = dxsCornerCoral(fl - 0.05, i * 7 + k).clone();
mat4.makeRotationY(RG() * 6.283);
g.applyMatrix4(mat4);
mat4.makeTranslation(q[0], y0, q[1]);
g.applyMatrix4(mat4);
geos.push(g);
});
});
if (geos.length) {
var L = geos.map(function (g) { return g.index ? g.toNonIndexed() : g; }), n = 0;
L.forEach(function (g) { n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), o = 0;
L.forEach(function (g) { pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); uv.set(g.attributes.uv.array, o * 2); o += g.attributes.position.count; });
var mg = new THREE.BufferGeometry();
mg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
mg.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
mg.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
geos.concat(L).forEach(function (g) { g.dispose(); });
I.root.add(new THREE.Mesh(mg, cm));
}
}
];
});
