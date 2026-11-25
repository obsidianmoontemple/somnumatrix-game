/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(122, function () {
"use strict";
return [
function (c, kind) {
var k = c + "|" + (kind || "");
if (TLM[k])
return TLM[k];
var m;
if (kind === "glow")
m = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.92, depthWrite: false });
else if (kind === "ds")
m = new THREE.MeshLambertMaterial({ color: c, side: THREE.DoubleSide });
else if (kind === "water")
m = new THREE.MeshPhongMaterial({ color: c, shininess: 90, transparent: true, opacity: 0.85 });
else
m = new THREE.MeshLambertMaterial({ color: c });
return TLM[k] = m;
},
function (spec, W, D, H) {
var ox = INT_X0 - intSlot(spec) * 500, root = new THREE.Group();
root.position.set(ox, 0, 0);
var C = { spec: spec, root: root, ox: ox, W: W, D: D, H: H, walls: [], spots: [], lights: [], flames: [], smokes: [], glows: [], cong: [], gifts: [] };
C.add = function (geo, mat, x, y, z, ry, rx, rz, par) {
var m = new THREE.Mesh(geo, mat);
m.position.set(x || 0, y || 0, z || 0);
if (ry || rx || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0);
(par || root).add(m);
return m;
};
C.solid = function (x, z, hw, hd, h) { C.walls.push({ x: ox + x, z: z, rot: 0, hw: hw, hd: hd, h: h || 1.2, level: 0 }); };
C.block = function (w, h, d, mat, x, y, z) { var m = C.add(gB(w, h, d), mat, x, y + h / 2, z); C.solid(x, z, w / 2, d / 2, y + h); return m; };
C.flame = function (x, y, z, s) { var f = C.add(gK(0.05 * (s || 1), 0.16 * (s || 1), 6), tlm(0xFFB23A, "glow"), x, y, z); C.flames.push(f); return f; };
C.smoke = function (x, y, z, n, col) {
if (typeof particles !== "function")
return null;
var p = particles(n || 14, [0.12, 2.4, 0.12], col || 0xD8D4CC, 0.32, 0.32);
p.position.set(x, y, z);
root.add(p);
C.smokes.push(p);
return p;
};
C.column = function (x, z, r, h, mat, capMat) { C.add(gC(r, r * 1.08, h, 12), mat, x, h / 2, z); if (capMat)
C.add(gB(r * 2.6, 0.3, r * 2.6), capMat, x, h - 0.15, z); C.solid(x, z, r, r, h); };
C.light = function (x, z) { C.lights.push({ x: x, z: z, y: 0 }); };
return C;
},
function (C, wallM, floorM, ceilM, opt) {
opt = opt || {};
var W = C.W, D = C.D, H = C.H, gap = 2.4;
C.add(gB(W, 0.1, D), floorM, 0, -0.05, 0);
C.add(gB(W + 2.4, 0.4, D + 2.4), floorM, 0, -0.25, 0);
if (!opt.open)
C.add(gB(W + 0.6, 0.3, D + 0.6), ceilM, 0, H + 0.15, 0);
function wall(x, z, w, d) { C.add(gB(w, H, d), wallM, x, H / 2, z); C.solid(x, z, w / 2, d / 2, H); }
wall(0, -D / 2, W, 0.3);
wall(-W / 2, 0, 0.3, D);
wall(W / 2, 0, 0.3, D);
var side = (W - gap) / 2;
wall(-(gap / 2 + side / 2), D / 2, side, 0.3);
wall(gap / 2 + side / 2, D / 2, side, 0.3);
C.add(gB(gap, H - 2.5, 0.3), wallM, 0, 2.5 + (H - 2.5) / 2, D / 2);
C.add(gB(1.7, 2.25, 0.12), tlm(opt.door || 0x5A3A22), 0, 1.12, D / 2 - 0.1);
},
function (C, d, x, y, z, h) {
var body = null;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.id === "sd" + d.key) {
body = o;
break;
}
}
var spec;
try {
spec = JSON.parse(JSON.stringify(body || { archetype: d.dragon ? "dragon" : "deity", deity: d.key, attrs: {}, nights: [store.session], detail: 4, city: true }));
}
catch (e) {
spec = { archetype: d.dragon ? "dragon" : "deity", deity: d.key, attrs: {} };
}
spec.id = "__tlimg_" + d.key;
spec.x = 0;
spec.z = 0;
spec.rot = 0;
spec.deity = d.key;
spec.archetype = d.dragon ? "dragon" : "deity";
if (!d.dragon && !spec.look && typeof lookOf === "function") {
lookOf(spec);
if (typeof deityLook === "function")
deityLook(spec, d);
}
var g = null;
try {
g = build(spec);
}
catch (e) {
g = null;
}
if (!g) {
var s = signShape(deitySign(d).kind, deitySign(d).col, true);
s.position.set(x, y + h * 0.6, z);
s.scale.setScalar(h * 0.6);
C.root.add(s);
return s;
}
var bb = new THREE.Box3().setFromObject(g), sz = new THREE.Vector3();
bb.getSize(sz);
var k = d.dragon ? h / Math.max(sz.x, sz.y, sz.z, 0.1) * 1.4 : h / Math.max(sz.y, 0.1);
g.scale.multiplyScalar(k);
var holder = new THREE.Group();
holder.add(g);
holder.position.set(x, y, z);
g.position.set(-(bb.min.x + bb.max.x) / 2 * k, -bb.min.y * k, -(bb.min.z + bb.max.z) / 2 * k);
holder.traverse(function (m) { m.raycast = function () { }; });
C.root.add(holder);
C.imageMesh = holder;
return holder;
},
function (C, x, z, mat) {
C.add(gC(0.05, 0.07, 1.0, 8), mat, x, 0.5, z);
C.add(gC(0.55, 0.5, 0.06, 16), mat, x, 1.02, z);
C.candles = [];
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, r = i % 2 ? 0.42 : 0.26, cx = x + Math.cos(a) * r, cz = z + Math.sin(a) * r;
var c = C.add(gC(0.025, 0.025, 0.18, 6), tlm(0xF2EEE6), cx, 1.14, cz);
var f = C.add(gK(0.025, 0.08, 5), tlm(0xFFB23A, "glow"), cx, 1.27, cz);
f.visible = false;
C.flames.push(f);
C.candles.push({ c: c, f: f });
}
C.solid(x, z, 0.5, 0.5, 1.1);
C.candleAt = { x: x, z: z };
},
function (C, d, I) {
var marble = tlm(I.roman ? 0xE4DCC8 : 0xEAE6DC), wall = tlm(I.roman ? 0xB8452E : 0xE6DFCC), frieze = tlm(I.roman ? 0x2A3A2A : 0xB0543A), blue = tlm(0x2F5E9E), gold = tlm(0xC9A040);
tlShell(C, wall, marble, tlm(0xD8D0BC));
[-1, 1].forEach(function (s) {
C.add(gB(0.05, 0.6, C.D - 0.6), frieze, s * (C.W / 2 - 0.18), C.H - 0.7, 0);
C.add(gB(0.05, 0.14, C.D - 0.6), blue, s * (C.W / 2 - 0.18), C.H - 1.08, 0);
if (I.roman)
C.add(gB(0.05, 1.2, C.D - 0.6), tlm(0x6E2A20), s * (C.W / 2 - 0.18), 0.6, 0);
});
for (var i = 0; i < 6; i++) {
var z = -C.D / 2 + 3.5 + i * 3;
[-1, 1].forEach(function (s) { C.column(s * (C.W / 2 - 2.4), z, 0.38, C.H, marble, marble); });
C.light(0, z);
}
C.block(3.2, 1.3, 2.2, marble, 0, 0, -C.D / 2 + 1.6);
C.add(gB(3.4, 0.12, 2.4), gold, 0, 1.3, -C.D / 2 + 1.6);
C.img = { x: 0, y: 1.36, z: -C.D / 2 + 1.6, h: 3.0 };
C.add(gB(3, 0.05, 1.6), tlm(0x2F4E6A, "water"), 0, 0.03, -C.D / 2 + 4.2);
tlOfferTable(C, 0, -C.D / 2 + 5.8, 1.8, marble, tlm(0xA8322B));
tlCandleStand(C, -2.6, -C.D / 2 + 5.6, gold);
tlIncense(C, 2.6, -C.D / 2 + 5.6, tlm(0x9A6A3A));
tlCongregation(C, -C.D / 2 + 8.5, C.D / 2 - 3.5);
},
function (C, d, I) {
var sand = tlm(0xD8C08A), paint = [tlm(0x2F5E9E), tlm(0xC0392B), tlm(0x3F7A3A), tlm(0xD4A43C)], dark = tlm(0x1C2648);
tlShell(C, sand, tlm(0xC8B080), dark);
for (var s = 0; s < 26; s++)
C.add(gB(0.12, 0.02, 0.12), tlm(0xE8C27A, "glow"), ((s * 37) % C.W) - C.W / 2 + 0.5, C.H - 0.02, ((s * 53) % C.D) - C.D / 2 + 0.5);
[-1, 1].forEach(function (sd) { for (var b = 0; b < 4; b++)
C.add(gB(0.05, 0.18, C.D - 0.6), paint[b], sd * (C.W / 2 - 0.18), 1.0 + b * 0.22, 0); });
for (var r = 0; r < 4; r++)
[-1, 1].forEach(function (sd) {
[3.2, 5.8].forEach(function (xo) {
var x = sd * xo, z = -C.D / 2 + 6 + r * 3.6;
C.column(x, z, 0.62, C.H - 0.6, sand);
C.add(gK(0.95, 0.8, 12), paint[(r + (xo > 3 ? 1 : 0)) % 4], x, C.H - 0.6, z, 0, Math.PI);
C.add(gC(0.64, 0.64, 0.5, 12), paint[(r + 2) % 4], x, 1.4, z);
});
C.light(0, -C.D / 2 + 6 + r * 3.6);
});
var shrine = tlm(0x9A8A6A);
C.block(3.0, 0.5, 2.4, shrine, 0, 0, -C.D / 2 + 1.5);
C.add(gB(0.25, 2.8, 2.0), shrine, -1.2, 1.9, -C.D / 2 + 1.5);
C.add(gB(0.25, 2.8, 2.0), shrine, 1.2, 1.9, -C.D / 2 + 1.5);
C.add(gB(2.7, 0.3, 2.2), shrine, 0, 3.45, -C.D / 2 + 1.5);
C.add(gB(2.7, 0.2, 0.2), tlm(0xC9A040), 0, 3.2, -C.D / 2 + 2.5);
C.add(gB(0.06, 2.4, 0.9), tlm(0x6A4A2A), -1.6, 1.7, -C.D / 2 + 2.9, 0.9);
C.add(gB(0.06, 2.4, 0.9), tlm(0x6A4A2A), 1.6, 1.7, -C.D / 2 + 2.9, -0.9);
C.img = { x: 0, y: 0.5, z: -C.D / 2 + 1.5, h: 2.4 };
tlOfferTable(C, 0, -C.D / 2 + 4.2, 1.6, tlm(0x8A7A5A), tlm(0xF2EEE6));
tlCandleStand(C, -2.2, -C.D / 2 + 4.6, tlm(0xC9A040));
tlIncense(C, 2.2, -C.D / 2 + 4.6, tlm(0x9A6A3A));
tlCongregation(C, -C.D / 2 + 6.5, C.D / 2 - 3.5, [-0.9, 0.9]);
C.dim = true;
},
function (C, d, I) {
var wood = tlm(I.slavic ? 0x8A6A44 : 0x5E4028), dark = tlm(0x3A2818), stone = tlm(0x6E6A64);
tlShell(C, wood, tlm(0x4A3A28), dark);
[-1, 1].forEach(function (s) { for (var z = -C.D / 2 + 2; z < C.D / 2 - 1; z += 4) {
C.add(gB(0.06, C.H, 0.25), dark, s * (C.W / 2 - 0.18), C.H / 2, z);
} });
for (var i = 0; i < 5; i++) {
var z = -C.D / 2 + 4 + i * 4;
[-1, 1].forEach(function (s) { C.column(s * (C.W / 2 - 2.6), z, 0.25, C.H, dark); });
C.light(0, z);
}
for (var b = 0; b < 5; b++)
C.add(gB(C.W, 0.25, 0.3), dark, 0, C.H - 0.4, -C.D / 2 + 4 + b * 4);
C.add(gB(1.6, 0.3, 7), stone, 0, 0.15, 1.0);
C.add(gB(1.2, 0.32, 6.6), tlm(0x1A1410), 0, 0.16, 1.0);
C.solid(0, 1.0, 0.8, 3.5, 0.4);
for (var f = 0; f < 7; f++) {
C.flame(((f * 7) % 3 - 1) * 0.25, 0.42, -1.8 + f * 0.95, 1.7);
}
C.smoke(0, 0.6, 1.0, 18, 0x8A8680);
C.fire = { x: 0, z: 1.0 };
for (var s2 = 0; s2 < 4; s2++)
[-1, 1].forEach(function (sd) {
var z = -C.D / 2 + 5 + s2 * 4.2;
if (I.slavic) {
C.add(gB(0.04, 1.4, 0.42), tlm(0xF2EEE6), sd * (C.W / 2 - 0.2), 2.2, z);
C.add(gB(0.05, 0.12, 0.42), tlm(0xB0302A), sd * (C.W / 2 - 0.2), 1.7, z);
}
else
C.add(gC(0.5, 0.5, 0.08, 14), tlm([0xA8322B, 0xD4B83C, 0x2F5E9E, 0xE8E4DA][(s2 + (sd > 0 ? 1 : 0)) % 4]), sd * (C.W / 2 - 0.24), 2.3, z, 0, 0, Math.PI / 2);
});
C.block(3.6, 0.7, 2.6, dark, 0, 0, -C.D / 2 + 1.6);
C.img = { x: 0, y: 0.7, z: -C.D / 2 + 1.6, h: 2.8 };
tlOfferTable(C, 0, -C.D / 2 + 4.2, 1.8, stone, null);
if (!I.slavic)
C.add(gT(0.22, 0.03), tlm(0xC9A040), 0.5, 0.92, -C.D / 2 + 4.2, 0, Math.PI / 2);
C.add(gC(0.16, 0.12, 0.28, 10), tlm(0x8A6A3A), -0.5, 1.0, -C.D / 2 + 4.2);
tlCandleStand(C, -2.4, -C.D / 2 + 5.2, dark);
tlIncense(C, 2.4, -C.D / 2 + 5.2, stone);
C.cong = [];
[-1, 1].forEach(function (s) { for (var z = -1.5; z <= 4; z += 1.5)
C.cong.push({ x: s * 1.5, z: z }); });
},
function (C, d, I) {
var wood = tlm(0xB08A5A), verm = tlm(0xC0392B), black = tlm(0x1A1A1E), gravel = tlm(0xB8B4AA), straw = tlm(0xD8C890), paper = tlm(0xF8F6F0, "ds");
tlShell(C, tlm(0xE8E2D4), gravel, tlm(0x6A4A2A));
var tz = C.D / 2 - 3.5;
[-1, 1].forEach(function (s) { C.add(gC(0.17, 0.2, 4, 10), verm, s * 1.8, 2, tz); C.solid(s * 1.8, tz, 0.2, 0.2, 4); });
C.add(gB(5.0, 0.25, 0.4), black, 0, 4.1, tz);
C.add(gB(4.2, 0.18, 0.25), verm, 0, 3.5, tz);
C.block(1.4, 0.7, 0.8, tlm(0x8A8680), -3.6, 0, tz - 1.4);
C.add(gB(1.2, 0.05, 0.6), tlm(0x5A8AA8, "water"), -3.6, 0.71, tz - 1.4);
C.add(gC(0.03, 0.03, 0.4, 6), wood, -3.3, 0.95, tz - 1.4, 0, 0, 1.2);
[-1, 1].forEach(function (s) {
var x = s * 2.8, z = -1;
C.add(gC(0.15, 0.25, 1.2, 8), tlm(0x9A9690), x, 0.6, z);
C.add(gB(0.6, 0.5, 0.6), tlm(0x9A9690), x, 1.45, z);
C.add(gB(0.3, 0.3, 0.62), tlm(0xFFD08A, "glow"), x, 1.45, z);
C.add(gK(0.55, 0.4, 4), tlm(0x8A8680), x, 1.9, z, Math.PI / 4);
C.solid(x, z, 0.3, 0.3, 2);
C.light(x, z);
});
var hz = -C.D / 2 + 4.2;
C.block(C.W - 1, 0.6, 7.4, wood, 0, 0, hz);
C.add(gB(C.W - 1.2, 0.05, 0.4), black, 0, 0.62, hz + 3.5);
C.add(gB(1.6, 0.6, 0.7), tlm(0x6A4A2A), 0, 0.6, hz + 3.2);
for (var sl = 0; sl < 6; sl++)
C.add(gB(0.04, 0.04, 0.66), black, -0.7 + sl * 0.28, 1.22, hz + 3.2);
C.add(gS(0.16), tlm(0xC9A040), 0, 3.2, hz + 3.6);
C.add(gC(0.04, 0.04, 2.2, 6), tlm(0xF2EEE6), 0, 2.0, hz + 3.6);
C.add(gC(0.042, 0.042, 1.0, 6), verm, 0.06, 1.6, hz + 3.62);
C.add(gC(0.16, 0.16, C.W - 1.6, 10), straw, 0, C.H - 1.2, hz + 2.4, 0, 0, Math.PI / 2);
for (var sh = 0; sh < 5; sh++) {
var x = -3 + sh * 1.5;
C.add(gP(0.18, 0.5), paper, x, C.H - 1.65, hz + 2.45);
}
[-1, 1].forEach(function (s) { C.add(gC(0.1, 0.08, 0.4, 8), tlm(0xF2EEE6), s * 1.6, 0.8, hz); C.add(new THREE.IcosahedronGeometry(0.35, 0), tlm(0x2E5A2E), s * 1.6, 1.25, hz); });
C.add(gB(4.4, 3.2, 2.2), wood, 0, 0.6 + 1.6, -C.D / 2 + 1.4);
C.solid(0, -C.D / 2 + 1.4, 2.2, 1.1, 3.8);
C.add(gB(3.0, 2.4, 0.06), tlm(0x8A5A2A), 0, 0.6 + 1.4, -C.D / 2 + 2.52);
C.add(gB(0.04, 2.4, 0.07), tlm(0xC9A040), 0, 0.6 + 1.4, -C.D / 2 + 2.54);
C.add(gK(3.3, 1.2, 4), tlm(0x5A4030), 0, 0.6 + 3.8, -C.D / 2 + 1.4, Math.PI / 4);
C.add(gC(0.42, 0.42, 0.06, 24), tlm(0xD8DCE0), 0, 0.6 + 1.0 + 0.45, hz - 1.8, 0, Math.PI / 2);
C.add(gB(0.2, 0.6, 0.2), wood, 0, 0.6 + 0.3, hz - 1.8);
C.mirror = { x: 0, y: 1.6, z: hz - 1.8 };
C.img = null;
C.aniconic = "The kami is not shown in an image. The sanctuary (honden) is closed; the mirror reflects whoever comes to pray.";
C.imgAt = { x: 0, y: 1.6, z: hz - 1.8 };
C.offerAt = { x: 0, z: hz + 3.2, w: 1.4, y: 1.22 };
tlCandleStand(C, -2.6, hz + 4.4, tlm(0x6A6A6A));
tlIncense(C, 2.6, hz + 4.4, tlm(0x5A5A5A));
tlCongregation(C, hz + 5.6, C.D / 2 - 5, [-1.6, 0, 1.6]);
C.priestAt = { x: 0, z: hz + 0.8, y: 0.6 };
},
function (C, d, I) {
var stone = tlm(0xC8B898), carve = tlm(0xA8946A), brass = tlm(0xC9A040), dark = tlm(0x2A2018), marig = tlm(0xF29A1A);
tlShell(C, stone, tlm(0xD8D0C0), tlm(0xB8A888));
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2;
C.add(gB(0.12, 0.01, 0.12), tlm(0xF8F6F0), Math.cos(a) * 0.9, 0.01, C.D / 2 - 3 + Math.sin(a) * 0.9);
}
C.add(gT(0.55, 0.03), tlm(0xF8F6F0), 0, 0.01, C.D / 2 - 3, 0, Math.PI / 2);
for (var i = 0; i < 4; i++) {
var z = -C.D / 2 + 7 + i * 3;
[-1, 1].forEach(function (s) {
var x = s * 3;
C.column(x, z, 0.32, C.H, carve);
for (var b = 0; b < 4; b++)
C.add(gB(0.62, 0.2, 0.62), stone, x, 0.5 + b * 1.6, z);
});
C.light(0, z);
}
[-0.8, 0, 0.8].forEach(function (x) { C.add(gC(0.01, 0.01, 1.2, 4), brass, x, C.H - 0.6, -C.D / 2 + 5.0); C.add(gK(0.16, 0.3, 10), brass, x, C.H - 1.3, -C.D / 2 + 5.0); });
var gz = -C.D / 2 + 2.2;
C.add(gB(0.6, C.H, 4.0), dark, -2.2, C.H / 2, gz);
C.solid(-2.2, gz, 0.3, 2, C.H);
C.add(gB(0.6, C.H, 4.0), dark, 2.2, C.H / 2, gz);
C.solid(2.2, gz, 0.3, 2, C.H);
C.add(gB(5.0, C.H - 3.2, 0.6), dark, 0, 3.2 + (C.H - 3.2) / 2, gz + 2.0);
C.add(gT(1.0, 0.12, Math.PI), marig, 0, 3.2, gz + 2.35);
C.block(1.6, 0.9, 1.4, tlm(0x5A5048), 0, 0, gz - 0.4);
C.img = { x: 0, y: 0.9, z: gz - 0.4, h: 2.0 };
[-1, 1].forEach(function (s) {
var x = s * 1.4, z = gz + 1.3;
C.add(gC(0.05, 0.1, 1.4, 8), brass, x, 0.7, z);
C.add(gC(0.2, 0.05, 0.08, 10), brass, x, 1.42, z);
for (var w = 0; w < 5; w++) {
var a = w / 5 * Math.PI * 2;
C.flame(x + Math.cos(a) * 0.15, 1.52, z + Math.sin(a) * 0.15, 0.9);
}
C.solid(x, z, 0.2, 0.2, 1.5);
});
C.warm = { x: 0, z: gz };
tlOfferTable(C, 0, -C.D / 2 + 5.6, 1.4, stone, tlm(0xC8462A));
tlCandleStand(C, -3.2, -C.D / 2 + 5.4, brass);
tlIncense(C, 3.2, -C.D / 2 + 5.4, brass);
tlCongregation(C, -C.D / 2 + 8, C.D / 2 - 3.5, [-1.5, 0, 1.5]);
},
function (C, d, I) {
var red = tlm(0xB03A2E), lacq = tlm(0x3A1A14), gold = tlm(0xC9A040), white = tlm(0xEDE6D8), bronze = tlm(0x6A5A3A);
tlShell(C, white, tlm(0x8A8680), tlm(0x6A2A20));
[-1, 1].forEach(function (s) { C.add(gB(0.05, 1.4, C.D - 0.6), red, s * (C.W / 2 - 0.18), 0.7, 0); C.add(gB(0.05, 0.3, C.D - 0.6), tlm(0x2E6A5A), s * (C.W / 2 - 0.18), C.H - 0.6, 0); });
for (var i = 0; i < 4; i++) {
var z = -C.D / 2 + 5 + i * 3.6;
[-1, 1].forEach(function (s) { C.column(s * 3.2, z, 0.32, C.H, red); });
C.add(gC(0.01, 0.01, 0.8, 4), gold, 0, C.H - 0.4, z);
C.add(gS(0.36), tlm(0xD8402A, "glow"), 0, C.H - 1.1, z);
C.light(0, z);
}
var sz = -C.D / 2 + 1.4;
C.add(gB(3.6, 4.2, 0.3), lacq, 0, 2.1, sz - 0.9);
C.add(gB(3.6, 0.4, 1.8), gold, 0, 4.0, sz);
C.add(gB(0.2, 3.6, 1.8), red, -1.7, 2.0, sz);
C.add(gB(0.2, 3.6, 1.8), red, 1.7, 2.0, sz);
C.block(3.0, 1.0, 1.6, lacq, 0, 0, sz);
if (I.buddhist) {
C.add(gC(0.8, 0.5, 0.4, 12), tlm(0xE8A6B8), 0, 1.2, sz);
}
C.img = { x: 0, y: I.buddhist ? 1.4 : 1.0, z: sz, h: 2.1 };
C.block(3.4, 0.9, 0.9, lacq, 0, 0, sz + 2.0);
C.add(gB(3.5, 0.04, 0.95), tlm(0xC0392B), 0, 0.92, sz + 2.0);
C.offerAt = { x: 0, z: sz + 2.0, w: 3.0, y: 0.95 };
var bz = sz + 4.4;
C.add(gC(0.55, 0.45, 0.6, 12), bronze, 0, 0.9, bz);
[0, 2.1, 4.2].forEach(function (a) { C.add(gC(0.07, 0.05, 0.6, 6), bronze, Math.cos(a) * 0.4, 0.3, bz + Math.sin(a) * 0.4); });
C.add(gT(0.55, 0.05), bronze, 0, 1.2, bz, 0, Math.PI / 2);
C.solid(0, bz, 0.6, 0.6, 1.2);
for (var j = 0; j < 5; j++) {
var x = -0.24 + j * 0.12;
C.add(gC(0.012, 0.012, 0.5, 4), tlm(0xA8322B), x, 1.45, bz);
C.add(gS(0.02), tlm(0xFF6A2A, "glow"), x, 1.7, bz);
}
C.smoke(0, 1.7, bz, 20);
[-1, 0, 1].forEach(function (x) { C.add(gC(0.3, 0.3, 0.15, 10), tlm(0xA8322B), x * 1.2, 0.08, bz + 1.6); });
tlCandleStand(C, -2.4, sz + 3.0, gold);
tlCongregation(C, bz + 3.0, C.D / 2 - 3, [-2.4, -0.8, 0.8, 2.4]);
},
function (C, d, I) {
var bark = tlm(0x5A4632), leaf = tlm(0x3F6A34), leaf2 = tlm(0x58824A), stone = tlm(0x8A8C88);
tlShell(C, tlm(0x4E6640), tlm(0x4E6E3A), tlm(0x2E3E2A));
var ico = tlg("ico", function () { return new THREE.IcosahedronGeometry(1.4, 0); });
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2, r = 5.2, x = Math.cos(a) * r * 0.85, z = Math.sin(a) * r + 0.5;
C.column(x, z, 0.32, C.H, bark);
C.add(ico, i % 2 ? leaf : leaf2, x, C.H - 0.9, z);
}
C.light(0, 0);
C.light(0, -4);
C.light(0, 4);
for (var s = 0; s < 7; s++) {
var b = s / 7 * Math.PI * 2 + 0.3, x2 = Math.cos(b) * 2.4, z2 = Math.sin(b) * 2.4 + 1.4;
C.block(0.45, 1.1 + (s % 3) * 0.25, 0.35, stone, x2, 0, z2);
}
C.add(gC(0.7, 0.8, 0.25, 10), tlm(0x3A342E), 0, 0.12, 1.4);
C.solid(0, 1.4, 0.6, 0.6, 0.3);
for (var f = 0; f < 4; f++) {
C.flame(Math.cos(f * 1.6) * 0.2, 0.33, 1.4 + Math.sin(f * 1.6) * 0.2, 2);
}
C.smoke(0, 0.5, 1.4, 14, 0x9A9890);
C.fire = { x: 0, z: 1.4 };
var wz = -C.D / 2 + 4.2;
C.add(gC(1.2, 1.25, 0.4, 16), stone, 0, 0.2, wz);
C.add(gC(1.0, 1.0, 0.05, 16), tlm(0x3A6A7A, "water"), 0, 0.38, wz);
C.solid(0, wz, 1.2, 1.2, 0.5);
C.offerAt = { x: 0, z: wz, w: 1.2, y: 0.42, water: true };
C.block(1.6, 0.6, 1.2, stone, 0, 0, -C.D / 2 + 1.4);
C.img = { x: 0, y: 0.6, z: -C.D / 2 + 1.4, h: 2.3 };
C.add(gC(0.05, 0.05, 1.6, 6), tlm(0xD4B83C), -1.3, 0.8, -C.D / 2 + 1.6);
tlCandleStand(C, -3.0, -C.D / 2 + 5.6, bark);
tlIncense(C, 3.0, -C.D / 2 + 5.6, stone);
C.cong = [];
for (var c = 0; c < 8; c++) {
var ca = Math.PI * 0.15 + c / 7 * Math.PI * 0.7;
C.cong.push({ x: Math.cos(ca) * 4.0, z: 1.4 + Math.sin(ca) * 3.6 });
}
},
function (C, d, I) {
var stone = tlm(I.inca ? 0x8A8070 : 0x9A8A70), red = tlm(0xA8322B), turq = tlm(0x2E8A7A), gold = tlm(0xD4B83C), dark = tlm(0x2A2620);
tlShell(C, stone, tlm(0x7A6E5E), tlm(0x5A5040));
if (I.inca) {
[-1, 1].forEach(function (s) { for (var n = 0; n < 5; n++) {
var z = -C.D / 2 + 5 + n * 3.4;
C.add(gB(0.05, 1.5, 0.7), dark, s * (C.W / 2 - 0.17), 1.6, z);
C.add(gB(0.05, 0.12, 0.9), stone, s * (C.W / 2 - 0.18), 2.4, z);
} });
}
else {
[-1, 1].forEach(function (s) {
C.add(gB(0.05, 0.35, C.D - 0.6), red, s * (C.W / 2 - 0.18), 1.2, 0);
C.add(gB(0.05, 0.25, C.D - 0.6), turq, s * (C.W / 2 - 0.18), 1.55, 0);
for (var g = 0; g < 8; g++)
C.add(gB(0.06, 0.25, 0.25), gold, s * (C.W / 2 - 0.19), 1.2, -C.D / 2 + 2 + g * 2.6);
});
}
for (var i = 0; i < 3; i++)
C.light(0, -C.D / 2 + 5 + i * 5);
for (var t = 0; t < 3; t++)
C.block(5.6 - t * 1.4, 0.55, 4.2 - t * 0.9, t % 2 ? stone : tlm(0x8A7A62), 0, t * 0.55, -C.D / 2 + 2.3 - t * 0.2);
C.img = { x: 0, y: 1.65, z: -C.D / 2 + 1.9, h: 2.2 };
if (d.key === "inti" || d.key === "kinichahau" || d.key === "huitzilopochtli") {
C.add(gC(1.3, 1.3, 0.08, 28), tlm(0xF2C23A, "glow"), 0, 4.6, -C.D / 2 + 0.3, 0, Math.PI / 2);
}
[-1, 1].forEach(function (s) {
var x = s * 3.4, z = -C.D / 2 + 5.2;
C.add(gC(0.4, 0.25, 0.7, 10), tlm(0x6A4A3A), x, 0.35, z);
C.solid(x, z, 0.4, 0.4, 0.8);
for (var f = 0; f < 3; f++)
C.flame(x + (f - 1) * 0.15, 0.82, z, 2.2);
C.smoke(x, 0.9, z, 16, 0xE8E4DA);
});
tlOfferTable(C, 0, -C.D / 2 + 6.2, 2.2, tlm(0x7A6A52), tlm(I.inca ? 0xC8302A : 0x2E8A6A));
for (var m = 0; m < 10; m++)
C.add(gS(0.1), tlm(m % 2 ? 0xF29A1A : 0xE8C23A), -1.6 + m * 0.36, 0.05, -C.D / 2 + 7.2);
tlCandleStand(C, -3.4, -C.D / 2 + 7.4, dark);
tlIncense(C, 3.4, -C.D / 2 + 7.4, tlm(0x6A4A3A));
tlCongregation(C, -C.D / 2 + 9, C.D / 2 - 3.5, [-1.6, 0, 1.6]);
},
function (C, d, I) {
var brick = tlm(0xC8A882), glaze = tlm(0x2A5A9A), yellow = tlm(0xE8C23A), cedar = tlm(0x6A4A2A);
tlShell(C, brick, tlm(0xB89A72), cedar);
[-1, 1].forEach(function (s) {
C.add(gB(0.05, 0.9, C.D - 0.6), glaze, s * (C.W / 2 - 0.18), 2.6, 0);
for (var r = 0; r < 7; r++) {
C.add(gC(0.16, 0.16, 0.04, 10), yellow, s * (C.W / 2 - 0.21), 2.6, -C.D / 2 + 2 + r * 2.6, 0, 0, Math.PI / 2);
}
});
for (var b = 0; b < 6; b++) {
C.add(gB(C.W, 0.22, 0.25), cedar, 0, C.H - 0.3, -C.D / 2 + 2 + b * 3.4);
C.light(0, -C.D / 2 + 2 + b * 3.4);
}
[-1, 1].forEach(function (s) { for (var n = 0; n < 5; n++)
C.add(gB(0.5, C.H, 0.7), brick, s * (C.W / 2 - 0.4), C.H / 2, -C.D / 2 + 3 + n * 3.6); });
C.add(gB(3.4, C.H, 0.8), tlm(0xB8986E), -2.5, C.H / 2, -C.D / 2 + 1.4);
C.add(gB(3.4, C.H, 0.8), tlm(0xB8986E), 2.5, C.H / 2, -C.D / 2 + 1.4);
C.block(2.6, 0.9, 1.6, tlm(0xA88A62), 0, 0, -C.D / 2 + 1.2);
C.img = { x: 0, y: 0.9, z: -C.D / 2 + 1.2, h: 2.4 };
tlOfferTable(C, 0, -C.D / 2 + 3.6, 2.2, cedar, tlm(0xE8DCC4));
[-0.7, 0, 0.7].forEach(function (x) { C.add(gC(0.14, 0.1, 0.3, 8), tlm(0xA86A3A), x, 1.02, -C.D / 2 + 3.5); });
tlCandleStand(C, -2.4, -C.D / 2 + 4.6, tlm(0x9A6A3A));
tlIncense(C, 2.4, -C.D / 2 + 4.6, tlm(0x8A6A4A));
tlCongregation(C, -C.D / 2 + 6.5, C.D / 2 - 3.5, [-1.6, 0, 1.6]);
},
function (C, d, I) {
var earth = tlm(0xA86A40), red = tlm(0x8A2A1A), white = tlm(0xF2EEE6), black = tlm(0x1A1410), thatch = tlm(0xB89A5A);
var col = (TRAD_ROBE && ICONCOL) ? ((function () { var c = null; d.icons.forEach(function (x) { var p = x.split(":"); if (p[0] === "robe" && ICONCOL[p[1]] !== undefined)
c = ICONCOL[p[1]]; }); return c; })() || 0xF2EEE6) : 0xF2EEE6;
tlShell(C, earth, tlm(0x7A5A3A), thatch);
[-1, 1].forEach(function (s) {
C.add(gB(0.05, 0.3, C.D - 0.6), white, s * (C.W / 2 - 0.18), 1.2, 0);
C.add(gB(0.05, 0.15, C.D - 0.6), black, s * (C.W / 2 - 0.18), 1.45, 0);
for (var t = 0; t < 10; t++)
C.add(gB(0.06, 0.3, 0.3), red, s * (C.W / 2 - 0.19), 0.7, -C.D / 2 + 1.5 + t * 1.4, 0, 0.785);
});
for (var p = 0; p < 3; p++) {
C.column(0, -C.D / 2 + 6 + p * 3.4, 0.2, C.H, tlm(0x5A3A22));
C.light(0, -C.D / 2 + 6 + p * 3.4);
}
for (var m = 0; m < 4; m++)
C.add(gB(1.6, 0.02, 1.0), tlm(m % 2 ? 0xC8A060 : 0xB08A50), -1.7 + (m % 2) * 3.4, 0.01, 2 + Math.floor(m / 2) * 1.8);
var sz = -C.D / 2 + 1.5;
if (I.akan && (d.key === "nyame" || d.key === "asaseyaa")) {
if (d.key === "nyame") {
C.add(gC(0.08, 0.1, 1.6, 6), tlm(0x6A4A2A), 0, 0.8, sz + 0.6);
C.add(gC(0.04, 0.05, 0.6, 6), tlm(0x6A4A2A), -0.18, 1.8, sz + 0.6, 0, 0, 0.5);
C.add(gC(0.04, 0.05, 0.6, 6), tlm(0x6A4A2A), 0.18, 1.8, sz + 0.6, 0, 0, -0.5);
C.add(gS(0.32), tlm(0x8A5A3A), 0, 2.15, sz + 0.6);
C.add(gC(0.24, 0.24, 0.03, 12), tlm(0x5A8AA8, "water"), 0, 2.4, sz + 0.6);
C.solid(0, sz + 0.6, 0.4, 0.4, 2.5);
C.aniconic = "Onyame is not made in an image. The Nyame dua, a forked branch holding a pot of rain water, is the place of offering.";
C.imgAt = { x: 0, y: 2.2, z: sz + 0.6 };
}
else {
C.add(gS(1.0), tlm(0x5A3A22), 0, -0.2, sz + 0.6);
C.solid(0, sz + 0.6, 1, 1, 0.8);
C.aniconic = "Asase Yaa has no shrine and no image: she is the earth itself, honoured by libation poured to the ground.";
C.imgAt = { x: 0, y: 0.6, z: sz + 0.6 };
}
C.img = null;
}
else {
C.block(3.6, 0.5, 1.6, tlm(0x6A4A2A), 0, 0, sz);
C.add(gB(3.6, 0.03, 1.6), tlm(col), 0, 0.52, sz);
[-1.3, -0.65, 0.65, 1.3].forEach(function (x, i) { C.add(i % 2 ? gS(0.28) : gC(0.26, 0.2, 0.5, 10), tlm(i % 2 ? 0xE8E0CC : 0x8A5A3A), x, 0.75, sz + 0.2); C.add(gC(0.27, 0.27, 0.04, 10), tlm(col), x, 1.02, sz + 0.2); });
for (var c = 0; c < 16; c++)
C.add(gS(0.035), white, -1.4 + c * 0.19, 0.56, sz + 0.65);
C.img = { x: 0, y: 0.52, z: sz - 0.3, h: 1.9 };
}
tlOfferTable(C, 0, -C.D / 2 + 4.0, 1.6, tlm(0x5A3A22), tlm(col));
tlCandleStand(C, -2.4, -C.D / 2 + 4.8, tlm(0x5A3A22));
tlIncense(C, 2.4, -C.D / 2 + 4.8, tlm(0x6A4A3A));
if (!I.akan) {
[-1, 0, 1].forEach(function (x) { C.add(gC(0.22, 0.18, 0.7, 10), tlm(0x6A3A22), x * 0.6 - 3.4, 0.35, -C.D / 2 + 6.8); C.add(gC(0.22, 0.22, 0.02, 10), tlm(0xE8DCC4), x * 0.6 - 3.4, 0.71, -C.D / 2 + 6.8); });
}
tlCongregation(C, -C.D / 2 + 6.5, C.D / 2 - 3, [-1.4, 0, 1.4]);
},
function (C, d, I) {
var wall = tlm(0xE8E0CC), blue = tlm(0x3A6AA8), red = tlm(0xA8322B), white = tlm(0xF2EEE6), wood = tlm(0x6A4A2A);
tlShell(C, wall, tlm(0x9A8A70), tlm(0xC8B898));
[-1, 1].forEach(function (s) { C.add(gB(0.05, 1.0, C.D - 0.6), blue, s * (C.W / 2 - 0.18), 0.5, 0); });
var pz = 1.0;
C.add(gC(0.22, 0.24, C.H, 12), red, 0, C.H / 2, pz);
for (var b = 0; b < 4; b++)
C.add(gC(0.24, 0.24, 0.25, 12), white, 0, 0.6 + b * 1.4, pz);
C.add(gC(0.8, 0.9, 0.4, 14), tlm(0x8A7A62), 0, 0.2, pz);
C.solid(0, pz, 0.9, 0.9, C.H);
var cm = tlm(0xF2E6C0);
for (var v = 0; v < 4; v++) {
var a = v * Math.PI / 2 + Math.PI / 4;
C.add(gB(0.06, 0.01, 1.6), cm, Math.cos(a) * 1.8, 0.01, pz + Math.sin(a) * 1.8, -a);
C.add(gT(0.3, 0.03), cm, Math.cos(a) * 2.6, 0.01, pz + Math.sin(a) * 2.6, 0, Math.PI / 2);
}
C.add(gT(1.3, 0.03), cm, 0, 0.01, pz, 0, Math.PI / 2);
C.light(0, -3);
C.light(0, 3);
C.light(-3, -6);
C.light(3, -6);
[[-3.2, 0.9], [-2.6, 0.7], [-2.1, 0.55]].forEach(function (q, i) { C.add(gC(0.24, 0.18, q[1], 12), wood, q[0], q[1] / 2, C.D / 2 - 3.4); C.add(gC(0.25, 0.25, 0.02, 12), tlm(0xE8DCC4), q[0], q[1] + 0.01, C.D / 2 - 3.4); });
var az = -C.D / 2 + 1.2;
C.block(4.0, 1.0, 1.2, wood, 0, 0, az);
C.add(gB(4.1, 0.03, 1.25), tlm(0xF2EEE6), 0, 1.02, az);
for (var bt = 0; bt < 6; bt++)
C.add(gC(0.07, 0.08, 0.4, 8), tlm([0x3A5A2A, 0x6A2A1A, 0xC8A040][bt % 3]), -1.7 + bt * 0.22, 1.24, az + 0.3);
[-1.3, 1.3].forEach(function (x, i) { C.add(gB(0.7, 0.9, 0.04), tlm(0xC9A040), x, 2.2, az - 0.55); C.add(gB(0.6, 0.8, 0.02), tlm(i ? 0x5A7AB8 : 0xC86A8A), x, 2.2, az - 0.52); });
[-1, 1].forEach(function (s) { C.add(gC(0.03, 0.03, 2.6, 6), tlm(0xC9A040), s * 2.6, 1.3, az + 1.0); C.add(gP(0.9, 0.7), tlm(s > 0 ? 0xA8322B : 0x3A6AA8, "ds"), s * 2.6 + s * 0.46, 2.2, az + 1.0); });
C.img = { x: 0, y: 1.05, z: az - 0.1, h: 1.6 };
for (var k = 0; k < 6; k++)
C.flame(-0.9 + k * 0.36, 1.25, az + 0.45, 0.8);
C.offerAt = { x: 0, z: az + 0.35, w: 3.2, y: 1.04 };
tlCandleStand(C, -3.0, az + 2.4, wood);
tlIncense(C, 3.0, az + 2.4, tlm(0x6A6A6A));
C.cong = [];
for (var c = 0; c < 10; c++) {
var ca = c / 10 * Math.PI * 2;
C.cong.push({ x: Math.cos(ca) * 3.6, z: pz + Math.sin(ca) * 3.4 });
}
C.priestAt = { x: 0, z: pz - 1.6, y: 0 };
},
function (C, d, I) {
var weave = tlm(0xC8A870), post = tlm(0x8A2A1A), mat = tlm(0xD8C090), dark = tlm(0x3A2A22), lava = tlm(0x2A2626);
tlShell(C, weave, mat, tlm(0x9A7A4A));
[-1, 1].forEach(function (s) {
for (var p = 0; p < 5; p++) {
var z = -C.D / 2 + 2.5 + p * 3;
C.add(gB(0.5, C.H, 0.25), post, s * (C.W / 2 - 0.3), C.H / 2, z);
for (var f = 0; f < 3; f++)
C.add(gS(0.07), tlm(0xE8DCC4), s * (C.W / 2 - 0.56), 1.2 + f * 1.1, z);
}
for (var t = 0; t < 4; t++)
C.add(gB(0.05, 1.6, 1.8), tlm(t % 2 ? 0xE8DCC4 : 0x6A3A22), s * (C.W / 2 - 0.18), 1.6, -C.D / 2 + 4 + t * 3);
});
C.add(gB(0.3, 0.3, C.D), post, 0, C.H - 0.2, 0);
C.light(0, -3);
C.light(0, 3);
var az = -C.D / 2 + 2.0;
for (var s = 0; s < 14; s++) {
var x = -1.6 + (s % 5) * 0.8, y = Math.floor(s / 5) * 0.3;
C.add(new THREE.IcosahedronGeometry(0.34, 0), I.hawaiian ? lava : tlm(0x6A6660), x, 0.25 + y, az + ((s * 3) % 2) * 0.3);
}
C.solid(0, az, 1.9, 0.7, 1.0);
C.img = { x: 0, y: 0.95, z: az - 0.2, h: 2.0 };
for (var l = 0; l < 4; l++) {
C.add(gS(0.12), tlm(0x3A7A3A), -1.2 + l * 0.8, 0.98, az + 0.6);
C.add(gT(0.18, 0.04), tlm([0xE85A8A, 0xF2C23A, 0xE8E4DA, 0xC8302A][l]), -1.2 + l * 0.8, 1.0, az + 0.4, 0, Math.PI / 2);
}
C.offerAt = { x: 0, z: az + 0.5, w: 2.6, y: 1.0 };
tlCandleStand(C, -3.0, az + 3.4, dark);
tlIncense(C, 3.0, az + 3.4, dark);
tlCongregation(C, az + 5, C.D / 2 - 3, [-1.6, 0, 1.6]);
},
function (C, d, I) {
var plaster = tlm(0xEDE8DC), brass = tlm(0xC9A040), stone = tlm(0xB8B0A0), sandal = tlm(0xA8784A);
tlShell(C, plaster, tlm(0xD8D2C4), tlm(0xE0DACC));
[-1, 1].forEach(function (s) { for (var a = 0; a < 4; a++) {
var z = -C.D / 2 + 6 + a * 3.2;
C.add(gB(0.4, C.H, 0.4), stone, s * (C.W / 2 - 0.35), C.H / 2, z);
C.light(s * 2, z);
} });
var fz = -C.D / 2 + 0.2;
C.add(gC(0.35, 0.35, 0.06, 20), brass, 0, 4.4, fz, 0, Math.PI / 2);
[-1, 1].forEach(function (s) { for (var w = 0; w < 3; w++)
C.add(gB(1.6 - w * 0.3, 0.14, 0.05), brass, s * (1.1 - w * 0.1), 4.5 - w * 0.16, fz); });
C.add(gB(0.6, 0.5, 0.05), brass, 0, 3.9, fz);
var cz = -C.D / 2 + 2.6;
C.add(gB(0.3, 3.2, 3.2), stone, -2.1, 1.6, cz);
C.add(gB(0.3, 3.2, 3.2), stone, 2.1, 1.6, cz);
C.solid(-2.1, cz, 0.15, 1.6, 3.2);
C.solid(2.1, cz, 0.15, 1.6, 3.2);
C.add(gB(4.5, 0.6, 0.3), stone, 0, 3.5, cz + 1.6);
for (var g = 0; g < 9; g++)
C.add(gB(0.05, 1.2, 0.05), brass, -1.6 + g * 0.4, 0.6, cz + 1.6);
C.add(gB(3.6, 0.06, 0.08), brass, 0, 1.2, cz + 1.6);
C.solid(0, cz + 1.6, 1.8, 0.1, 1.2);
C.add(gC(0.5, 0.3, 0.6, 12), brass, 0, 1.1, cz);
C.add(gC(0.2, 0.4, 0.8, 12), brass, 0, 0.4, cz);
for (var f = 0; f < 6; f++) {
C.flame(Math.cos(f) * 0.15, 1.52, cz + Math.sin(f) * 0.15, 2.4);
}
for (var sw = 0; sw < 4; sw++)
C.add(gB(0.4, 0.08, 0.08), sandal, -0.3 + sw * 0.2, 1.42, cz, sw);
C.smoke(0, 1.9, cz, 12, 0xE8E4DA);
C.fire = { x: 0, z: cz };
C.warm = { x: 0, z: cz };
C.img = null;
C.aniconic = "Ahura Mazda is never made in an image. The fire is not worshipped: it is the sign of truth and light, and prayers are said facing it.";
C.imgAt = { x: 0, y: 1.6, z: cz };
tlOfferTable(C, 0, cz + 3.0, 1.8, stone, tlm(0xF8F6F0));
tlCandleStand(C, -2.8, cz + 4.0, brass);
tlIncense(C, 2.8, cz + 4.0, brass);
tlCongregation(C, cz + 5.2, C.D / 2 - 3, [-1.6, 0, 1.6]);
C.priestAt = { x: 0.9, z: cz + 2.1, y: 0 };
},
function (C, d, I) {
var stone = tlm(0x4A464A), wood = tlm(0x3A2A1E), parch = tlm(0xE8DCC0), red = tlm(0x6A1A1A);
tlShell(C, stone, tlm(0x2E2C30), tlm(0x222024));
[-1, 1].forEach(function (s) {
for (var b = 0; b < 4; b++) {
var z = -C.D / 2 + 4 + b * 3.2, x = s * (C.W / 2 - 0.45);
C.add(gB(0.5, 2.4, 2.4), wood, x, 1.2, z);
C.solid(x, z, 0.25, 1.2, 2.4);
for (var r = 0; r < 4; r++)
C.add(gB(0.36, 0.32, 2.2), tlm([0x6A2A22, 0x2F4A6E, 0x3F5A3A, 0xA8883A][(r + b) % 4]), x - s * 0.08, 0.35 + r * 0.55, z);
}
});
[-1, 1].forEach(function (s) {
var x = s * 1.6, z = 1.0;
C.add(gC(0.06, 0.1, 1.0, 6), wood, x, 0.5, z);
C.add(gB(0.7, 0.04, 0.5), wood, x, 1.05, z, 0, -0.4);
C.add(gB(0.6, 0.03, 0.42), parch, x, 1.1, z, 0, -0.4);
C.solid(x, z, 0.35, 0.3, 1.1);
C.flame(x + 0.4, 1.2, z, 0.8);
C.light(x, z);
});
C.light(0, -C.D / 2 + 3);
var sg = deitySign(d), s1 = signShape(sg.kind, 0x8A7A5A, false);
s1.position.set(0, 4.0, -C.D / 2 + 0.25);
s1.scale.setScalar(1.4);
C.root.add(s1);
C.block(2.0, 0.8, 1.4, stone, 0, 0, -C.D / 2 + 1.3);
C.img = { x: 0, y: 0.8, z: -C.D / 2 + 1.3, h: 1.6 };
C.add(gB(4.0, 0.06, 0.06), tlm(0x8A7A5A), 0, 0.9, -C.D / 2 + 2.8);
[-2, -1, 0, 1, 2].forEach(function (x) { C.add(gC(0.03, 0.03, 0.9, 6), tlm(0x8A7A5A), x, 0.45, -C.D / 2 + 2.8); });
C.solid(0, -C.D / 2 + 2.8, 2, 0.08, 0.9);
tlOfferTable(C, 0, -C.D / 2 + 4.0, 1.4, wood, red);
tlCandleStand(C, -2.4, -C.D / 2 + 4.6, wood);
tlIncense(C, 2.4, -C.D / 2 + 4.6, stone);
tlCongregation(C, 2.8, C.D / 2 - 3, [-1.6, 0, 1.6]);
C.dim = true;
},
function (spec) {
var d = DEITY[spec.deity], I = tlInfo(d), st = tlStyleOf(d), dm = TL_DIMS[st] || [12, 20, 6];
var C = tlCtx(spec, dm[0], dm[1], dm[2]);
(TL_STYLE[st] || TL_STYLE.naos)(C, d, I);
if (C.img)
tlImage(C, d, C.img.x, C.img.y, C.img.z, C.img.h);
var imgAt = C.img ? { x: C.img.x, y: C.img.y + C.img.h * 0.7, z: C.img.z } : (C.imgAt || { x: 0, y: 1.6, z: -C.D / 2 + 2 });
var warm = new THREE.PointLight(0xFFC88A, C.dim ? 0.9 : 0.6, 9, 1.6);
warm.position.set(imgAt.x, imgAt.y + 1.2, imgAt.z + 1.6);
C.root.add(warm);
var off = C.offerAt || { x: 0, z: -C.D / 2 + 4 };
var pa = C.priestAt || { x: 0, z: off.z + 1.1, y: 0 };
C.spots.push({ x: Math.min(C.W / 2 - 1.6, 3.6), z: off.z - 0.6, room: "sanctuary", level: 0 });
C.spots.push({ x: pa.x, z: pa.z, room: "altar", level: 0 });
C.cong.forEach(function (q) { C.spots.push({ x: q.x, z: q.z, room: "nave", level: 0 }); });
var lightPool = [];
for (var i = 0; i < 8; i++) {
var pl = new THREE.PointLight(0xFFE2B8, 0, 16, 1.6);
C.root.add(pl);
lightPool.push(pl);
}
var fill = new THREE.PointLight(0xFFF0DC, 0, Math.max(C.W, C.D) * 1.3, 1.1);
C.root.add(fill);
var amb = new THREE.HemisphereLight(0xFFF0D8, 0x2A2018, C.dim ? 0.18 : 0.3);
amb.position.set(0, C.H, 0);
C.root.add(amb);
return { spec: spec, root: C.root, walls: C.walls, spots: C.spots, ox: C.ox, oz: 0, exit: { x: C.ox, z: C.D / 2 - 1.0 }, start: { x: C.ox, z: C.D / 2 - 2.4 },
winMats: [], winGlints: [], W: C.W, D: C.D, levels: 1, floor: C.H + 0.5, stairs: [], lifts: [], level: 0, holes: [], locked: null, unlocked: false,
floorNames: ["The house of " + d.name], asBuilt: [], wpKey: null, wpSaved: false,
lightSpots: C.lights, lightPool: lightPool, lightFill: fill, ceilH: C.H, lightAt: -1, lightLevel: -1,
temple: { deity: d.key, style: st, info: I, imgAt: imgAt, offerAt: off, priestAt: pa, cong: C.cong, flames: C.flames, smokes: C.smokes, candles: C.candles || [],
candleAt: C.candleAt, aniconic: C.aniconic || null, fire: C.fire || null, warm: warm, gifts: [] } };
},
function (kind) {
if (typeof audio === "undefined" || !audio.on || !audio.ctx)
return;
var ctx = audio.ctx, t = ctx.currentTime, out = audio.master;
function tone(f, dur, gain, type, at) {
var o = ctx.createOscillator(), g = ctx.createGain();
o.type = type || "sine";
o.frequency.value = f;
g.gain.setValueAtTime(0.0001, t + (at || 0));
g.gain.exponentialRampToValueAtTime(gain, t + (at || 0) + 0.01);
g.gain.exponentialRampToValueAtTime(0.0001, t + (at || 0) + dur);
o.connect(g);
g.connect(out);
o.start(t + (at || 0));
o.stop(t + (at || 0) + dur + 0.05);
}
function noise(dur, freq, gain, at) {
var s = ctx.createBufferSource();
s.buffer = audio.buf;
var f = ctx.createBiquadFilter();
f.type = "bandpass";
f.frequency.value = freq;
f.Q.value = 1.5;
var g = ctx.createGain();
g.gain.setValueAtTime(gain, t + at);
g.gain.exponentialRampToValueAtTime(0.0001, t + at + dur);
s.connect(f);
f.connect(g);
g.connect(out);
s.start(t + at);
s.stop(t + at + dur + 0.05);
}
if (kind === "bell" || kind === "sistrum" || kind === "asson") {
[1, 2.76, 5.4].forEach(function (p, i) { tone(620 * p, 2.6 / (i + 1), 0.12 / (i + 1)); });
if (kind !== "bell")
for (var r = 0; r < 5; r++)
noise(0.05, 5200, 0.05, r * 0.07);
}
else if (kind === "suzu") {
for (var s = 0; s < 6; s++)
tone(1800 + ((s * 137) % 300), 0.4, 0.05, "sine", s * 0.06);
}
else if (kind === "bowl") {
tone(220, 6, 0.14);
tone(221.6, 6, 0.1);
tone(605, 3, 0.04);
}
else if (kind === "gong") {
tone(110, 5, 0.16);
tone(163, 4, 0.07);
tone(247, 3, 0.04);
}
else if (kind === "conch") {
var o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
o.type = "sawtooth";
o.frequency.value = 174;
f.type = "lowpass";
f.frequency.value = 700;
g.gain.setValueAtTime(0.0001, t);
g.gain.exponentialRampToValueAtTime(0.09, t + 0.5);
g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
o.connect(f);
f.connect(g);
g.connect(out);
o.start(t);
o.stop(t + 2.3);
}
else if (kind === "drum") {
for (var b = 0; b < 3; b++) {
var o2 = ctx.createOscillator(), g2 = ctx.createGain();
o2.frequency.setValueAtTime(120, t + b * 0.45);
o2.frequency.exponentialRampToValueAtTime(55, t + b * 0.45 + 0.3);
g2.gain.setValueAtTime(0.25, t + b * 0.45);
g2.gain.exponentialRampToValueAtTime(0.0001, t + b * 0.45 + 0.4);
o2.connect(g2);
g2.connect(out);
o2.start(t + b * 0.45);
o2.stop(t + b * 0.45 + 0.45);
}
}
else if (kind === "clap") {
noise(0.08, 1400, 0.4, 0);
noise(0.08, 1400, 0.4, 0.35);
}
},
function () {
var T = INT.temple, d = DEITY[T.deity], I = T.info;
TL.here = T.deity;
TL.svc = null;
TL.svcAt = 0;
TL.lastStep = -1;
TL.joined = false;
TL.pray = null;
TL.local = null;
tlCandlesShow();
(TL.gifts[T.deity] || []).forEach(function (g) { tlGiftMesh(g); });
tlBoardLoad(true);
tlPanel();
tlPaint();
setStatus("<b>Inside " + esc(tlHouseName(d)) + ".</b> " + (T.aniconic ? esc(T.aniconic) + " " : "") +
"<b>P</b> to pray, <b>C</b> to light a " + I.light + ", <b>O</b> to make an offering, <b>R</b> to read. Walk back out through the door you came in by.");
},
function () {
var T = INT && INT.temple;
if (!T)
return;
var d = DEITY[T.deity], I = T.info;
TL.pray = { t: 0, dur: 16, x: camera.position.x, z: camera.position.z };
tlSound(T.style === "shinto" ? "clap" : I.bell);
if (T.style === "shinto")
setTimeout(function () { tlSound("suzu"); }, 900);
setStatus("<b>A quiet moment.</b> " + esc(I.gesture) + (I.lore ? "" : " Take as long as you like; walk on when you are ready."));
},
function (dt) {
var p = TL.pray, T = INT && INT.temple;
if (!p || !T)
return;
p.t += dt;
if (p.t > p.dur || Math.hypot(camera.position.x - p.x, camera.position.z - p.z) > 0.6) {
TL.pray = null;
return;
}
var a = T.imgAt, wx = INT.ox + a.x, wz = a.z, dx = wx - camera.position.x, dz = wz - camera.position.z;
var want = Math.atan2(-dx, -dz), dy = Math.atan2((a.y || 1.6) - camera.position.y, Math.hypot(dx, dz)) * 0.7;
var dr = ((want - yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI, k = Math.min(1, dt * 1.4);
yaw += dr * k;
pitch += (dy - pitch) * k;
},
function (what) {
var T = INT && INT.temple;
if (!T)
return;
var list = TL.gifts[T.deity] || (TL.gifts[T.deity] = []);
if (list.length >= 8)
list.shift();
var g = { what: what, i: list.length + Math.floor(Math.random() * 5) };
list.push(g);
tlGiftMesh(g);
tlSound(T.info.bell);
setStatus("<b>" + esc(what.charAt(0).toUpperCase() + what.slice(1)) + "</b> — left before " + esc(DEITY[T.deity].name) + ". Nothing is asked in return.");
},
function (g) {
var T = INT && INT.temple;
if (!T)
return;
var o = T.offerAt, n = T.gifts.length, x = o.x - (o.w || 1.4) / 2 + 0.25 + (n % 6) * ((o.w || 1.4) - 0.5) / 5, y = o.y || 0.88, z = o.z + ((n >> 1) % 2 ? 0.15 : -0.15);
var w = g.what, col = /wine|chicha|rum|kvass|sake|beer|mead/.test(w) ? 0x8A1A2A : /milk|rice|salt|clay|water/.test(w) ? 0xF2EEE6 : /honey|ghee|oil/.test(w) ? 0xE8B23A :
/flower|marigold|lotus|lei|garland/.test(w) ? 0xF29A1A : /fruit|orange|apple|dates|berr/.test(w) ? 0xE8762A : /coin|gold/.test(w) ? 0xC9A040 : /incense|copal|sandal|cedar|frankincense/.test(w) ? 0x8A6A4A : 0xC8A060;
var geo = /wine|mead|sake|beer|kvass|chicha|rum|milk|water|oil|ghee|honey/.test(w) ? gC(0.07, 0.06, 0.18, 8) : /coin/.test(w) ? gC(0.05, 0.05, 0.01, 10) : gS(0.08);
if (o.water && /coin/.test(w)) {
y = 0.36;
}
var m = new THREE.Mesh(geo, tlm(col));
m.position.set(x, y + 0.08, z);
INT.root.add(m);
T.gifts.push(m);
},
function (d) {
return d.icons.filter(function (t) { return !TL_SKIP_ICON.test(t); }).map(function (t) { return t.split(":")[0].replace(/([a-z])([A-Z])/g, "$1 $2"); })
.map(function (t) {
return { thunderbolt: "the thunderbolt", mooncrown: "a crown of the moon", wingedhelm: "a winged helmet", tripleface: "three faces", twoface: "two faces",
thirdeye: "the third eye", serpenttail: "a serpent's tail", flowerbasket: "a basket of flowers", crownwhite: "the white crown", crownred: "the red crown", sundisc: "the sun disc" }[t] || t;
});
},
function () {
var d = tlD();
if (!d)
return;
tlReadClose();
var T = INT.temple, I = T.info, p = TL_POSTS[d.key], sh = I.shift, sym = tlSymbols(d);
var lore = I.lore ? (TL_LORE_DEITY[d.key] || TL_LORE_NOTE[d.trad] || "") : "";
var bg = document.createElement("div");
bg.id = "tl-read";
bg.style.cssText = "position:fixed;inset:0;z-index:9000;background:rgba(5,6,10,.7);display:grid;place-items:center;padding:16px";
bg.innerHTML = "<div style='width:min(520px,100%);max-height:82vh;overflow:auto;background:rgba(10,12,18,.97);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:18px 20px;font:14px var(--sans);color:var(--bone);line-height:1.6'>" +
"<div style='font-family:var(--serif);font-size:21px'>" + esc(d.name) + "</div>" +
"<div style='color:var(--dim);margin-bottom:8px'>" + esc(d.trad) + (d.aka && d.aka.length ? " · also " + esc(d.aka.slice(0, 3).join(", ")) : "") + "</div>" +
(I.lore ? "<p><b>Named for</b> " + esc(d.domains) + ".</p><p>" + esc(lore) + "</p>" : "<p><b>Honoured for</b> " + esc(d.domains) + ".</p>") +
(sym.length ? "<p><b>Shown with</b> " + esc(sym.join(", ")) + ".</p>" : "") +
(T.aniconic ? "<p>" + esc(T.aniconic) + "</p>" : "") +
(I.lore ? "" : "<p><b>How " + esc(d.trad === "Welsh" || d.trad === "Gaulish" || d.trad === "Irish" ? "the Celtic peoples honour" : (I.buddhist ? "Buddhists honour" : "the " + d.trad + " tradition honours")) + " them.</b> " + esc(I.how) + "</p>") +
"<p><b>The house's keeper</b> is its " + esc(p ? p.title : tlTitle(d)) + " — " + esc(I.word) + ". " + (I.lore ? "Readings" : "Services") + " at " + esc(hm(sh[0])) + " and " + esc(hm(sh[2])) + " city time, every twenty minutes for two hours.</p>" +
"<p style='color:var(--dim);font-size:12.5px'>" + (I.lore ? "Kept as a reading room: told about, never served." : "Living traditions are described here with respect; what is shown is a small likeness, not the real rite.") + "</p>" +
"<div style='text-align:right;margin-top:8px'><button class='btn' id='tl-read-x'>Close</button></div></div>";
document.body.appendChild(bg);
bg.onclick = function (e) { if (e.target === bg)
tlReadClose(); };
document.getElementById("tl-read-x").onclick = tlReadClose;
TL.read = bg;
},
function (key, h) {
var I = tlInfo(DEITY[key]), sh = I.shift, dur = TL_STEP_SECS * TL_STEPS;
for (var w = 0; w < 2; w++) {
var s = sh[w * 2], l = sh[w * 2 + 1], rel = ((h - s) % 24 + 24) % 24;
if (rel < l) {
var k = Math.floor(rel / TL_SLOT_H), into = (rel - k * TL_SLOT_H) * 3600;
return { on: true, w: w, k: k, into: into, running: into < dur, step: Math.min(TL_STEPS - 1, Math.floor(into / TL_STEP_SECS)), next: Math.max(0, (TL_SLOT_H * 3600 - into)) };
}
}
return { on: false };
},
function (name, args) {
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl)
return Promise.resolve(null);
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: JSON.stringify(args || {}) })
.then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
},
function () {
var key = TL.here;
if (!key)
return;
TL.svcAt = Date.now();
var ask = (typeof signedIn === "function" && signedIn()) ? cityRpc("temple_service_now", { p_deity: key }).catch(function () { return null; }) : tlPublicRpc("temple_service_now", { p_deity: key });
ask.then(function (s) {
if (TL.here !== key)
return;
if (s && s.id) {
TL.svc = { kind: "server", id: s.id, step: s.step || 0, priest: s.priest || "the priest", title: s.title, mine: !!s.mine,
age: +s.secs || 0, at: Date.now(), attendees: s.attendees || 0 };
}
else if (TL.svc && TL.svc.kind === "server")
TL.svc = null;
});
},
function () {
var key = TL.here;
if (!key)
return null;
if (TL.svc && TL.svc.kind === "server")
return { kind: "server", step: TL.svc.step, by: TL.svc.priest, id: TL.svc.id, mine: TL.svc.mine };
if (TL.local) {
var into = (Date.now() - TL.local.at) / 1000;
if (into < TL_STEP_SECS * TL_STEPS)
return { kind: "local", step: Math.floor(into / TL_STEP_SECS), into: into, by: TL.local.by };
TL.local = null;
tlSay("The service is over.");
}
var t = tlStandinFor(key);
if (!t)
return null;
var sl = tlStandinSlot(key, tlHour());
if (!sl.on)
return { kind: "off", by: t.name };
if (sl.running)
return { kind: "standin", step: sl.step, into: sl.into, by: t.name, slot: sl };
return { kind: "waiting", by: t.name, next: sl.next };
},
function () {
var key = TL.here;
if (!key)
return;
var j = tlMyJob(key), p = TL_POSTS[key];
if (!j)
return tlSay("Only the " + esc(p ? p.title : "priest") + " begins a service here.");
if (!j.clocked_in)
return tlSay("Clock in first, inside your hours — from <b>Your work</b>.");
if (typeof presenceSendNow === "function")
presenceSendNow();
setTimeout(function () {
cityRpc("begin_service", { p_deity: key }).then(function (o) {
if (!o || !o.ok) {
tlSay(esc((o && o.say) || "The service could not begin."));
return;
}
TL.svc = { kind: "server", id: o.id, step: 0, priest: "you", mine: true, at: Date.now() };
if (typeof WORK !== "undefined")
WORK.lastWork = Date.now();
tlStep(0, true);
tlPaint();
}).catch(function (e) { tlSay(/function|schema/i.test(e.message) ? "The temple services are not ready yet — run the temples update." : esc(e.message)); });
}, 400);
},
function () {
var s = TL.svc;
if (!s || s.kind !== "server" || !s.mine)
return;
if (s.step >= TL_STEPS - 1)
return tlEnd();
cityRpc("service_step", { p_service: s.id, p_step: s.step + 1 }).then(function (o) {
if (!o || !o.ok) {
tlSay(esc((o && o.say) || "Not yet."));
return;
}
s.step++;
if (typeof WORK !== "undefined")
WORK.lastWork = Date.now();
tlPaint();
}).catch(function (e) { tlSay(esc(e.message)); });
},
function () {
var s = TL.svc;
if (!s || s.kind !== "server" || !s.mine)
return;
cityRpc("end_service", { p_service: s.id }).then(function (o) {
TL.svc = null;
tlPaint();
var w = o && o.work;
tlSay("<b>The service is ended.</b> " + (w && w.ok ? "It counts toward your work." : esc((w && w.say) || "")));
if (typeof workRefresh === "function")
workRefresh(true);
}).catch(function (e) { tlSay(esc(e.message)); });
},
function () {
var T = INT && INT.temple;
if (!T)
return;
var n = tlNow();
if (!n || (n.kind !== "server" && n.kind !== "standin" && n.kind !== "local"))
return tlSay("No service is under way just now.");
var spots = T.cong.length ? T.cong : [{ x: 0, z: 0 }], q = spots[(Date.now() >> 8) % spots.length];
camera.position.x = INT.ox + q.x;
camera.position.z = q.z;
var a = T.imgAt, dx = INT.ox + a.x - camera.position.x, dz = a.z - camera.position.z;
yaw = Math.atan2(-dx, -dz);
pitch = 0;
TL.joined = true;
if (typeof signedIn === "function" && signedIn() && (n.kind === "server" || n.kind === "standin")) {
if (typeof presenceSendNow === "function")
presenceSendNow();
setTimeout(function () {
cityRpc("attend_service", { p_service: n.kind === "server" ? n.id : null, p_deity: TL.here }).then(function (o) {
if (o && o.ok)
tlSay("<b>You join the congregation.</b>" + (o.merit ? " Your presence is remembered (+" + o.merit + " merit)." : ""));
else if (o && o.say)
tlSay(esc(o.say));
}).catch(function () { });
}, 400);
}
tlSay("<b>You join the congregation.</b>");
},
function () {
var key = TL.here, t = key && tlStandinFor(key);
if (!t)
return;
var sl = tlStandinSlot(key, tlHour());
if (!sl.on)
return tlSay("The " + esc(TL_POSTS[key].title) + " is not in. " + esc(tlHoursWords(key)));
TL.local = { at: Date.now(), by: t.name };
TL.lastStep = -1;
tlSay("<b>" + esc(t.name) + "</b> begins a short service, for you.");
},
function (name) {
var T = INT.temple;
if (TL.fig && TL.fig.parent === INT.root)
return TL.fig;
var t = tlStandinFor(T.deity), I = T.info, L;
if (t && typeof tempLook === "function")
L = tempLook(t);
else {
L = randomLook("__tlpr_" + T.deity, "human");
tlVest(L, I);
}
var g = buildFigure({ id: "__tlpr_" + T.deity, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [] }, 1);
if (typeof makeTag === "function") {
var tag = makeTag((name || "The priest") + " · " + (TL_POSTS[T.deity] ? TL_POSTS[T.deity].title : "priest"), false);
tag.position.y = 2.15;
g.add(tag);
}
g.traverse(function (m) { m.raycast = function () { }; });
INT.root.add(g);
TL.fig = g;
return g;
},
function (dt, n) {
var T = INT.temple, show = n && (n.kind === "standin" || n.kind === "local" || n.kind === "waiting");
if (!show) {
if (TL.fig) {
INT.root.remove(TL.fig);
TL.fig = null;
}
return;
}
var g = tlPriestFig(n.by), pa = T.priestAt, img = T.imgAt, lm = g.userData.limbs, tt = performance.now() / 1000;
var at = n.kind === "waiting" ? { x: (T.offerAt.x || 0) + 2.0, z: T.offerAt.z + 1.6 } : { x: pa.x, z: pa.z };
g.position.x += (at.x - g.position.x) * Math.min(1, dt * 2);
g.position.z += (at.z - g.position.z) * Math.min(1, dt * 2);
g.position.y = pa.y || 0;
var toImg = Math.atan2(img.x - g.position.x, img.z - g.position.z), toPeople = toImg + Math.PI;
var face = n.kind === "waiting" ? toPeople : (n.step === TL_STEPS - 1 || n.step === 0 ? toPeople : toImg);
var dr = ((face - g.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
g.rotation.y += dr * Math.min(1, dt * 3);
if (!lm)
return;
var st = n.step | 0, w = Math.sin(tt * 1.6) * 0.08;
var la = -0.2, ra = -0.2;
if (n.kind !== "waiting") {
if (st === 0 || st === 4) {
la = -2.4 + w;
ra = -2.4 - w;
}
else if (st === 1) {
la = -1.2;
ra = -1.2 + Math.sin(tt * 3) * 0.3;
}
else if (st === 2) {
la = -0.9 + w;
ra = -0.9 - w;
}
else {
la = -1.5;
ra = -1.5;
}
}
lm.la.rotation.x += (la - lm.la.rotation.x) * Math.min(1, dt * 4);
lm.ra.rotation.x += (ra - lm.ra.rotation.x) * Math.min(1, dt * 4);
},
function () {
if (TL.panel || typeof document === "undefined" || !document.body)
return;
var css = document.createElement("style");
css.textContent = "#tl-panel{position:fixed;left:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:44;display:none;width:min(360px,calc(100vw - 24px));" +
"background:rgba(8,10,16,.93);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:10px 12px;font:13px var(--sans);color:var(--bone);line-height:1.45}" +
"#tl-panel .row{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}#tl-panel .btn{font-size:12.5px}#tl-panel .dim{color:var(--dim)}" +
"#tl-cap{position:fixed;left:50%;top:calc(64px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:44;display:none;width:min(560px,calc(100vw - 24px));" +
"background:rgba(8,10,16,.9);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:10px 14px;font:13.5px var(--sans);color:var(--bone);text-align:center;line-height:1.5}" +
"#tl-cap .bar{height:4px;background:#22252C;border-radius:3px;overflow:hidden;margin-top:7px}#tl-cap .bar i{display:block;height:4px;background:#E8C27A}" +
"#tl-offer{position:fixed;inset:0;z-index:9000;background:rgba(5,6,10,.6);display:grid;place-items:center;padding:16px}";
document.head.appendChild(css);
TL.panel = document.createElement("div");
TL.panel.id = "tl-panel";
document.body.appendChild(TL.panel);
TL.cap = document.createElement("div");
TL.cap.id = "tl-cap";
document.body.appendChild(TL.cap);
TL.panel.addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-tl]") : null;
if (!b)
return;
var a = b.getAttribute("data-tl");
({ pray: tlPray, light: tlLight, offer: function () { if (typeof templeOfferPanel === "function")
templeOfferPanel(TL.here); }, read: tlRead,
join: tlJoin, ask: tlAsk, begin: tlBegin, next: tlNext, end: tlEnd }[a] || function () { })();
});
},
function () {
if (!TL.panel)
return;
var T = INT && INT.temple;
if (!T || !walkMode) {
TL.panel.style.display = "none";
if (TL.cap)
TL.cap.style.display = "none";
return;
}
var d = DEITY[T.deity], I = T.info, p = TL_POSTS[T.deity], n = tlNow(), lit = (typeof candleCount === "function") ? candleCount(T.deity) : 0;
var h = "<div><b>" + esc(tlHouseName(d)) + "</b> <span class='dim'>· " + esc(d.trad) + "</span></div>";
var s = "";
if (n && (n.kind === "server" || n.kind === "standin" || n.kind === "local"))
s = "<span style='color:#8FCB8A'>A " + (I.lore ? "reading" : "service") + " is under way</span>, led by " + esc(n.by) + ".";
else if (n && n.kind === "waiting")
s = esc(n.by) + ", the " + esc(p ? p.title : "priest") + ", is here. The next " + (I.lore ? "reading" : "service") + " begins in " + Math.ceil(n.next / 60) + " min.";
else if (n && n.kind === "off")
s = "<span class='dim'>" + esc(tlHoursWords(T.deity)) + "</span>";
else
s = "<span class='dim'>" + esc(p ? p.title : "The priest") + ": a dreamer holds this post. " + esc(tlHoursWords(T.deity)) + "</span>";
h += "<div style='margin-top:4px'>" + s + "</div>";
h += "<div class='dim' style='margin-top:3px'>" + lit + " " + I.light + (lit === 1 ? "" : "s") + " burning here.</div>";
h += "<div class='row'><button class='btn' data-tl='pray'>" + (I.lore ? "Reflect" : "Pray") + " (P)</button><button class='btn' data-tl='light'>Light a " + I.light + " (C)</button>" +
"<button class='btn' data-tl='offer'>" + (I.lore ? "Leave a candle" : "Offer") + " (O)</button><button class='btn' data-tl='read'>Read (R)</button></div>";
var row = "";
if (n && (n.kind === "server" || n.kind === "standin" || n.kind === "local") && !n.mine)
row += "<button class='btn' data-tl='join'>" + (TL.joined ? "Stand with the others" : "Join the congregation") + " (J)</button>";
if (n && n.kind === "waiting")
row += "<button class='btn' data-tl='ask'>Ask for a short " + (I.lore ? "reading" : "service") + "</button>";
var mj = tlMyJob(T.deity);
if (mj) {
if (TL.svc && TL.svc.kind === "server" && TL.svc.mine)
row += (TL.svc.step < TL_STEPS - 1 ? "<button class='btn' data-tl='next'>Next: " + esc(I.steps[TL.svc.step + 1][0]) + "</button>" : "") + "<button class='btn' data-tl='end'>End the " + (I.lore ? "reading" : "service") + "</button>";
else if (!(TL.svc && TL.svc.kind === "server"))
row += "<button class='btn' data-tl='begin'>" + (mj.clocked_in ? "Begin a " : "Clock in to hold a ") + (I.lore ? "reading" : "service") + "</button>";
}
if (row)
h += "<div class='row'>" + row + "</div>";
if (TL.panel.dataset.h !== h) {
TL.panel.dataset.h = h;
TL.panel.innerHTML = h;
}
TL.panel.style.display = "block";
if (n && (n.kind === "server" || n.kind === "standin" || n.kind === "local")) {
var st = Math.max(0, Math.min(TL_STEPS - 1, n.step | 0)), step = I.steps[st];
var pct = n.into !== undefined ? ((n.into - st * TL_STEP_SECS) / TL_STEP_SECS * 100) : 100;
var c = "<div style='font-size:12px;color:var(--dim)'>" + (I.lore ? "The reading" : "The service") + " · step " + (st + 1) + " of " + TL_STEPS + "</div>" +
"<div style='font-family:var(--serif);font-size:17px;margin:2px 0'>" + esc(step[0]) + "</div><div>" + esc(step[1]) + "</div>" +
"<div class='bar'><i style='width:" + Math.max(0, Math.min(100, pct)).toFixed(0) + "%'></i></div>";
if (TL.cap.dataset.h !== c) {
TL.cap.dataset.h = c;
TL.cap.innerHTML = c;
}
TL.cap.style.display = "block";
if (st !== TL.lastStep) {
TL.lastStep = st;
tlSound(I.bell);
}
}
else {
TL.cap.style.display = "none";
TL.lastStep = -1;
}
}
];
});
