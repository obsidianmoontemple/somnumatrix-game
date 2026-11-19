/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(303, function () {
"use strict";
return [
function () {
if (GW_PADS)
return GW_PADS;
var S = GW_SITE;
GW_PADS = [[-42, 92, 19], [42, 92, 19], [112, 132, 19.5], [-164, 30, 19.5], [-120, 74, 10], [-48, 166, 6.5], [-196, 86, 8.5], [-96, 96, 3.6], [-100, 14, 4], [154, 4, 3.6]];
if (S.press)
GW_PADS.push([S.press.x, S.press.z, 6]);
if (S.mill)
GW_PADS.push([S.mill.x, S.mill.z, 7]);
GW_PADS.forEach(function (q) { q[3] = gwHeight0(q[0], q[1]); });
return GW_PADS;
},
function (x, z) {
var h = gwRaw(x, z);
for (var i = 0; i < GW_SITES.length; i++) {
var s = GW_SITES[i], d = Math.hypot(x - s[1], z - s[2]);
if (d >= s[3] + 16)
continue;
if (s[5] === undefined)
s[5] = gwRaw(s[1], s[2]);
var k = d <= s[3] ? 1 : 1 - (d - s[3]) / 16;
k = k * k * (3 - 2 * k);
h = h + (s[5] - h) * k;
}
var p = GW_SITE.pond, pd = Math.hypot(x - p.x, z - p.z);
if (pd < p.r - 3)
h -= Math.min(1.4, (p.r - 3 - pd) * 0.35);
return h;
},
function (kind) {
if (GW_IGEO[kind])
return GW_IGEO[kind];
var g;
switch (kind) {
case "ball":
g = new THREE.IcosahedronGeometry(0.5, 1);
break;
case "fruit":
g = new THREE.SphereGeometry(0.5, 6, 4);
break;
case "leafy":
g = new THREE.IcosahedronGeometry(0.5, 0);
break;
case "cone":
g = new THREE.ConeGeometry(0.5, 1, 5);
g.translate(0, 0.5, 0);
break;
case "stalk":
g = new THREE.CylinderGeometry(0.5, 0.5, 1, 4);
g.translate(0, 0.5, 0);
break;
case "trunk":
g = new THREE.CylinderGeometry(0.35, 0.5, 1, 6);
g.translate(0, 0.5, 0);
break;
case "box":
g = new THREE.BoxGeometry(1, 1, 1);
break;
case "post":
g = new THREE.BoxGeometry(1, 1, 1);
g.translate(0, 0.5, 0);
break;
case "bloom":
g = new THREE.OctahedronGeometry(0.5, 0);
break;
case "canopy":
g = new THREE.IcosahedronGeometry(0.5, 1);
break;
case "pine":
g = new THREE.ConeGeometry(0.5, 1, 7);
g.translate(0, 0.5, 0);
break;
case "tuft":
g = new THREE.ConeGeometry(0.5, 1, 3);
g.translate(0, 0.5, 0);
break;
default: g = new THREE.BoxGeometry(1, 1, 1);
}
return (GW_IGEO[kind] = g);
},
function (G) {
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), c = new THREE.Color();
Object.keys(GW.ins).forEach(function (kind) {
var L = GW.ins[kind];
if (!L.list.length)
return;
var mat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
var mesh = new THREE.InstancedMesh(gwIGeo(kind), mat, L.list.length);
mesh.name = "gw-" + kind;
mesh.userData.keep = 1;
L.list.forEach(function (r, i) { e.set(0, r[6], 0); q.setFromEuler(e); v.set(r[0], r[1], r[2]); s.set(r[3], r[4], r[5]); m4.compose(v, q, s); mesh.setMatrixAt(i, m4); c.setHex(r[7]); mesh.setColorAt(i, c); });
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.frustumCulled = false;
G.add(mesh);
L.mesh = mesh;
});
},
function (hs, on) {
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), touched = {};
(hs || []).forEach(function (h) {
var L = GW.ins[h.k];
if (!L || !L.mesh)
return;
var r = L.list[h.i];
var want = on ? 1 : 0;
if (r[8] === want)
return;
r[8] = want;
e.set(0, r[6], 0);
q.setFromEuler(e);
v.set(r[0], r[1], r[2]);
var k = on ? 1 : 0.0001;
s.set(r[3] * k, r[4] * k, r[5] * k);
m4.compose(v, q, s);
L.mesh.setMatrixAt(h.i, m4);
touched[h.k] = L.mesh;
});
Object.keys(touched).forEach(function (k) { touched[k].instanceMatrix.needsUpdate = true; });
},
function (hs, col) {
var c = new THREE.Color(col), touched = {};
(hs || []).forEach(function (h) { var L = GW.ins[h.k]; if (!L || !L.mesh || !L.mesh.instanceColor)
return; L.list[h.i][7] = col; L.mesh.setColorAt(h.i, c); touched[h.k] = L.mesh; });
Object.keys(touched).forEach(function (k) { touched[k].instanceColor.needsUpdate = true; });
},
function (G, x0, z0, rot, y0) {
var y = y0 === undefined ? gwHeight(x0, z0) : y0, g = new THREE.Group();
g.position.set(x0, y, z0);
g.rotation.y = rot;
G.add(g);
var c = Math.cos(rot), s = Math.sin(rot);
var F = { g: g, x0: x0, z0: z0, rot: rot, y: y,
at: function (lx, lz) { return { x: x0 + lx * c + lz * s, z: z0 - lx * s + lz * c }; },
box: function (w, h, d, mat, lx, ly, lz, solid, parent) { var m = wBox(w, h, d, mat, lx, ly, lz, parent || g); if (solid) {
var p = F.at(lx, lz);
GW.solids.push({ x: p.x, z: p.z, hw: w / 2, hd: d / 2, rot: rot });
} return m; },
solid: function (lx, lz, hw, hd) { var p = F.at(lx, lz); GW.solids.push({ x: p.x, z: p.z, hw: hw, hd: hd, rot: rot }); },
ring: function (lx, lz, r) { var p = F.at(lx, lz); GW.solids.push({ x: p.x, z: p.z, r: r }); },
wallX: function (z, x1, x2, h, mat, gaps, t) {
t = t || 0.25;
gaps = (gaps || []).slice().sort(function (a, b) { return a[0] - b[0]; });
var a = x1;
gaps.forEach(function (q) { var e = q[0] - q[1] / 2; if (e > a + 0.05)
F.box(e - a, h, t, mat, (a + e) / 2, h / 2, z, true); var top = q[2] || 2.4; if (h > top)
F.box(q[1], h - top, t, mat, q[0], top + (h - top) / 2, z, false); a = q[0] + q[1] / 2; });
if (x2 > a + 0.05)
F.box(x2 - a, h, t, mat, (a + x2) / 2, h / 2, z, true);
},
wallZ: function (x, z1, z2, h, mat, gaps, t) {
t = t || 0.25;
gaps = (gaps || []).slice().sort(function (a, b) { return a[0] - b[0]; });
var a = z1;
gaps.forEach(function (q) { var e = q[0] - q[1] / 2; if (e > a + 0.05)
F.box(t, h, e - a, mat, x, h / 2, (a + e) / 2, true); var top = q[2] || 2.4; if (h > top)
F.box(t, h - top, q[1], mat, x, top + (h - top) / 2, q[0], false); a = q[0] + q[1] / 2; });
if (z2 > a + 0.05)
F.box(t, h, z2 - a, mat, x, h / 2, (a + z2) / 2, true);
},
floor: function (w, d, mat, lx, lz, top) { top = top || 0.12; F.box(w, top, d, mat, lx || 0, top / 2, lz || 0, false); var p = F.at(lx || 0, lz || 0); GW.floors.push({ x: p.x, z: p.z, hw: w / 2, hd: d / 2, rot: rot, y: y + top }); },
roof: function (w, d, h, rise, mat, endMat) {
var half = d / 2 + 0.5, L = Math.hypot(half, rise) + 0.15, a = Math.atan2(rise, half);
[-1, 1].forEach(function (sd) { var m = wBox(w + 0.8, 0.18, L, mat, 0, h + rise / 2, sd * half / 2, g); m.rotation.x = sd * a; });
if (endMat) {
var sh = new THREE.Shape();
sh.moveTo(-d / 2, 0);
sh.lineTo(d / 2, 0);
sh.lineTo(0, rise);
sh.lineTo(-d / 2, 0);
[-1, 1].forEach(function (sd) { var m = new THREE.Mesh(new THREE.ShapeGeometry(sh), endMat); m.material.side = THREE.DoubleSide; m.rotation.y = Math.PI / 2; m.position.set(sd * w / 2, h, 0); g.add(m); });
}
},
room: function (name, x1, z1, x2, z2, badge) { var p = F.at((x1 + x2) / 2, (z1 + z2) / 2); GW.rooms.push({ name: name, x: p.x, z: p.z, hw: Math.abs(x2 - x1) / 2, hd: Math.abs(z2 - z1) / 2, rot: rot, badge: !!badge, y: y }); },
badgeDoor: function (lx, lz, w, alongX, mat) {
var p = F.at(lx, lz), d = new THREE.Group();
d.position.set(lx, 0, lz);
d.userData.keep = 1;
g.add(d);
var leaf = wBox(alongX ? w : 0.08, 2.3, alongX ? 0.08 : w, mat || gwM(0x5A4030), 0, 1.15, 0, d);
wBox(alongX ? 0.3 : 0.1, 0.3, alongX ? 0.1 : 0.3, gwBasic(0xC8A040), alongX ? w / 2 - 0.3 : 0.06, 1.2, alongX ? 0.06 : w / 2 - 0.3, d);
var sign = wSign(["Staff only", "Greenwold Estate badge"], 0.9, 0.42, "#2A3A22", "#E8E2C8");
sign.position.set(0, 2.0, alongX ? 0.07 : 0);
if (!alongX) {
sign.rotation.y = Math.PI / 2;
sign.position.x = 0.07;
}
d.add(sign);
GW.badge.push({ x: p.x, z: p.z, hw: alongX ? w / 2 : 0.2, hd: alongX ? 0.2 : w / 2, rot: rot, door: d, leaf: leaf, along: alongX, w: w, open: false });
}
};
return F;
},
function (x, z, o) {
o = o || {};
var s = o.s || 1, y = gwHeight(x, z), R = o.R || Math.random;
var T = { x: x, z: z, crown: [], fruit: [], blossom: [], ever: !!o.ever };
T.trunk = gwI("trunk", x, y, z, 0.5 * s, 2.2 * s, 0.5 * s, R() * 6, o.bark || 0x5A4030);
var cc = o.leaf || GW_LEAF, cr = (o.crown || 2.3) * s, ch = y + 2.2 * s + cr * 0.6;
T.crown.push(gwI("canopy", x, ch, z, cr * 2, cr * 1.6, cr * 2, R() * 6, cc));
T.crown.push(gwI("canopy", x + cr * 0.45, ch + cr * 0.25, z - cr * 0.3, cr * 1.3, cr * 1.1, cr * 1.3, R() * 6, new THREE.Color(cc).offsetHSL(0, 0, 0.04).getHex()));
T.ch = ch;
T.cr = cr;
var n = GW_LITE ? Math.min(6, o.n || 10) : (o.n || 12);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, b = R() * 0.9 - 0.35, rr = cr * (1.0 + R() * 0.12), fx = x + Math.cos(a) * rr * Math.cos(b), fz = z + Math.sin(a) * rr * Math.cos(b), fy = ch + Math.sin(b) * cr * 0.8 - 0.1;
if (o.fruit !== undefined)
T.fruit.push(gwI(o.fshape || "fruit", fx, fy, fz, (o.fs || 0.22) * s, (o.fsy || o.fs || 0.22) * s, (o.fs || 0.22) * s, 0, o.fruit));
if (!o.ever && !GW_LITE && i % 2 === 0)
T.blossom.push(gwI("bloom", fx, fy + 0.15, fz, 0.3 * s, 0.3 * s, 0.3 * s, R() * 3, o.bloom || 0xF6E4EC));
}
GW.solids.push({ x: x, z: z, r: 0.35 * s });
(GW.trees = GW.trees || []).push(T);
return T;
},
function (x, z, len, rot, crop, o) {
o = o || {};
var c = Math.cos(rot), s = Math.sin(rot), y = gwHeight(x, z) + (o.y || 0), R = o.R || Math.random, hs = [], col = GW_COL[crop] || 0x8A3A2A;
var w = o.w || 1.5, raised = o.raised === undefined ? 0.22 : o.raised;
if (!o.noSoil) {
var b = wBox(len, raised, w, gwM(o.soil || GW_SOIL), x, y + raised / 2, z, GW.G);
b.rotation.y = rot;
if (raised > 0.1) {
[-1, 1].forEach(function (sd) { var e = wBox(len + 0.1, raised + 0.06, 0.08, gwM(0x6A5034), x - s * sd * w / 2, y + raised / 2, z - c * sd * w / 2, GW.G); e.rotation.y = rot; });
}
}
var top = y + raised, n = Math.max(3, Math.round(len / (o.step || 0.8))), P = function (t, off) { return { x: x + c * t + s * (off || 0), z: z - s * t + c * (off || 0) }; };
var kind = o.kind || GW_STYLE[crop] || "leafy";
for (var i = 0; i < n; i++) {
var t = -len / 2 + 0.4 + (len - 0.8) * i / Math.max(1, n - 1);
[-0.35, 0.35].forEach(function (off, j) {
if (o.oneRow && j)
return;
var p = P(t + (j ? 0.2 : 0), off), r = R(), q;
switch (kind) {
case "leafy":
q = gwI("leafy", p.x, top + 0.14, p.z, 0.42 + r * 0.12, 0.3, 0.42 + r * 0.12, r * 6, new THREE.Color(col).offsetHSL(0, 0, (r - 0.5) * 0.08).getHex());
hs.push(q);
break;
case "root":
gwI("tuft", p.x, top, p.z, 0.18, 0.42 + r * 0.12, 0.18, r * 6, 0x5A9A3A);
hs.push(gwI("fruit", p.x, top + 0.03, p.z, 0.13, crop === "carrots" || crop === "parsnips" ? 0.18 : 0.13, 0.13, 0, col));
break;
case "potato":
gwI("ball", p.x, top + 0.22, p.z, 0.55, 0.45, 0.55, r * 6, 0x3A6A2A);
hs.push(gwI("fruit", p.x + 0.18, top + 0.04, p.z, 0.14, 0.11, 0.14, 0, col));
hs.push(gwI("fruit", p.x - 0.15, top + 0.04, p.z + 0.1, 0.12, 0.1, 0.12, 0, col));
break;
case "leek":
hs.push(gwI("stalk", p.x, top, p.z, 0.07, 0.55, 0.07, 0, 0xE8F0D8));
hs.push(gwI("tuft", p.x, top + 0.5, p.z, 0.16, 0.4, 0.16, r * 6, 0x4A7A4A));
break;
case "cane":
if (j === 0 && i % 2 === 0)
gwI("stalk", p.x, top, p.z + 0.35 * c, 0.03, 2.0, 0.03, 0, 0x7A5A3A);
gwI("ball", p.x, top + 0.7 + r * 0.6, p.z, 0.38, 0.7, 0.38, r * 6, 0x3E7A30);
hs.push(gwI("fruit", p.x + 0.12, top + 0.8 + r * 0.7, p.z, 0.1, crop === "beans" || crop === "peas" ? 0.3 : 0.12, 0.1, 0, col));
hs.push(gwI("fruit", p.x - 0.1, top + 1.2, p.z + 0.08, 0.1, crop === "beans" || crop === "peas" ? 0.3 : 0.12, 0.1, 0, col));
break;
case "sprawl":
if (j === 0) {
gwI("leafy", p.x, top + 0.15, p.z, 1.0, 0.3, 1.0, r * 6, 0x3E7A2E);
hs.push(gwI("fruit", p.x + 0.3, top + (crop === "pumpkins" ? 0.28 : 0.1), p.z, crop === "pumpkins" ? 0.6 : 0.16, crop === "pumpkins" ? 0.45 : 0.16, crop === "pumpkins" ? 0.6 : 0.4, r * 3, col));
}
break;
case "corn":
if (j === 0 || i % 2) {
gwI("stalk", p.x, top, p.z, 0.06, 2.1, 0.06, 0, 0x6A9A3A);
gwI("tuft", p.x, top + 0.9, p.z, 0.5, 1.1, 0.5, r * 6, 0x7AAA44);
hs.push(gwI("fruit", p.x + 0.08, top + 1.2, p.z, 0.1, 0.28, 0.1, 0, col));
}
break;
case "rhubarb":
if (j === 0) {
gwI("leafy", p.x, top + 0.55, p.z, 1.0, 0.25, 1.0, r * 6, 0x3E7A30);
hs.push(gwI("stalk", p.x, top, p.z, 0.06, 0.55, 0.06, 0, col));
hs.push(gwI("stalk", p.x + 0.12, top, p.z + 0.1, 0.05, 0.5, 0.05, 0, col));
}
break;
case "strawb":
gwI("leafy", p.x, top + 0.1, p.z, 0.4, 0.18, 0.4, r * 6, 0x3A7A2E);
hs.push(gwI("fruit", p.x + 0.12, top + 0.06, p.z, 0.07, 0.08, 0.07, 0, col));
hs.push(gwI("fruit", p.x - 0.1, top + 0.06, p.z + 0.06, 0.07, 0.08, 0.07, 0, col));
break;
case "bush":
if (j === 0 && i % 2 === 0) {
gwI("ball", p.x, top + 0.55, p.z, 1.0, 1.0, 1.0, r * 6, 0x3A6A2E);
for (var k = 0; k < 4; k++)
hs.push(gwI("fruit", p.x + (R() - 0.5) * 0.9, top + 0.35 + R() * 0.6, p.z + (R() - 0.5) * 0.9, 0.07, 0.07, 0.07, 0, col));
}
break;
case "herb":
gwI("ball", p.x, top + 0.18, p.z, 0.45, 0.36, 0.45, r * 6, new THREE.Color(col).offsetHSL(0, -0.05, -0.08).getHex());
hs.push(gwI(crop === "lavender" || crop === "chamomile" ? "bloom" : "ball", p.x, top + 0.36, p.z, 0.32, 0.16, 0.32, r * 6, crop === "lavender" ? 0x9A7AD8 : col));
break;
case "flower":
gwI("stalk", p.x, top, p.z, 0.03, crop === "sunflowers" ? 1.8 : 0.6, 0.03, 0, 0x4A8A3A);
gwI("tuft", p.x, top, p.z, 0.22, 0.35, 0.22, r * 6, 0x4A8A3A);
hs.push(gwI("bloom", p.x, top + (crop === "sunflowers" ? 1.85 : 0.62), p.z, crop === "sunflowers" ? 0.55 : 0.22, crop === "sunflowers" ? 0.2 : 0.2, crop === "sunflowers" ? 0.55 : 0.22, r * 3, col));
if (crop === "sunflowers")
gwI("fruit", p.x, top + 1.86, p.z + 0.02, 0.25, 0.1, 0.25, 0, 0x5A3A1A);
break;
case "glassveg":
gwI("stalk", p.x, top, p.z, 0.03, 1.4, 0.03, 0, 0x7A6A4A);
gwI("ball", p.x, top + 0.8, p.z, 0.45, 0.9, 0.45, r * 6, 0x3E7A30);
hs.push(gwI("fruit", p.x + 0.15, top + 0.8, p.z, 0.1, crop === "cucumbers" ? 0.3 : 0.13, 0.1, 0, col));
hs.push(gwI("fruit", p.x - 0.1, top + 1.1, p.z, 0.1, crop === "cucumbers" ? 0.3 : 0.13, 0.1, 0, col));
break;
}
});
}
if (!o.noClover && !GW_LITE)
for (var k2 = 0; k2 < 3; k2++) {
var p2 = P(-len / 2 + len * (k2 + 0.5) / 3, 0);
gwI("leafy", p2.x, top + 0.03, p2.z, 0.35, 0.06, 0.35, k2, 0x5A8A3A);
}
var N = gwNode({ crop: crop, x: x, z: z, r: Math.max(2.4, len / 2 + 1.2), hs: hs, label: o.label, glass: !!o.glass, rect: { x: x, z: z, hw: len / 2 + 1, hd: w / 2 + 1, rot: rot } });
return N;
},
function (F, lx, lz, len, alongX, cols, h) {
h = h || 2;
var wood = gwM(0x6A4A2E);
F.box(alongX ? len : 0.45, h, alongX ? 0.45 : len, wood, lx, h / 2, lz, true);
for (var k = 0; k < 3; k++)
for (var i = 0; i < Math.floor(len / 0.4); i++) {
var o = -len / 2 + 0.25 + i * 0.4, c = cols[(i + k) % cols.length];
F.box(0.3, 0.22, 0.3, gwM(c), lx + (alongX ? o : 0.05), 0.4 + k * (h - 0.4) / 3, lz + (alongX ? 0.05 : o));
}
},
function (F, lx, lz, crops) {
(crops || []).forEach(function (k, i) {
var x = lx + (i % 3) * 0.75 - 0.75, z = lz + Math.floor(i / 3) * 0.75;
F.box(0.68, 0.4, 0.6, gwM(0x8A6A44), x, 0.2, z);
F.box(0.6, 0.04, 0.52, gwM(0x6A5034), x, 0.4, z);
var col = GW_COL[k] || 0x8A8A4A, R = wRand(lx * 31 + lz * 17 + i * 7), big = /pumpkin|squash|cabbage|melon/.test(k), n = big ? 3 : 9, sz = big ? 0.24 : 0.13;
for (var j = 0; j < n; j++) {
var ox = (R() - 0.5) * 0.42, oz = (R() - 0.5) * 0.36, oy = 0.42 + sz * 0.4 + (0.2 - Math.hypot(ox, oz) * 0.4) * (big ? 0 : 0.5), p = F.at(x + ox, z + oz);
gwI("fruit", p.x, F.y + oy, p.z, sz, sz * (big ? 0.8 : 1), sz, R() * 6, new THREE.Color(col).offsetHSL(0, 0, (R() - 0.5) * 0.08).getHex());
}
if (GW_LITE)
return;
var tag = wSign([gwName(k)], 0.5, 0.16, "#F4ECD8", "#3A2A1A");
tag.position.set(x, 0.48, z + 0.31);
tag.rotation.x = -0.5;
F.g.add(tag);
});
F.solid(lx, lz + 0.4, 1.2, 0.8);
},
function (G, x, z, rot, label) {
var y = gwHeight(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = rot;
G.add(g);
wBox(0.12, 1.05, 0.12, gwM(0x5A4030), 0, 0.52, 0, g);
var top = wBox(0.7, 0.06, 0.5, gwM(0x6A4A2E), 0, 1.08, 0.02, g);
top.rotation.x = -0.35;
var bk = wBox(0.55, 0.03, 0.38, gwM(0xF0E8D0), 0, 1.13, 0.02, g);
bk.rotation.x = -0.35;
var s = wSign(["🎓 " + label, "World Learning · press E"], 1.0, 0.3, "#22361E", "#E8E2C8");
s.position.set(0, 1.5, 0);
g.add(s);
GW.lecterns.push({ x: x, z: z });
return g;
},
function (G, x, z, lines, rot, w, h) {
var y = gwHeight(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = rot || 0;
G.add(g);
w = w || 2.2;
h = h || 1.1;
wBox(0.12, 1.7 + h / 2, 0.12, gwM(0x5A4030), -w / 2 + 0.1, (1.7 + h / 2) / 2, 0, g);
wBox(0.12, 1.7 + h / 2, 0.12, gwM(0x5A4030), w / 2 - 0.1, (1.7 + h / 2) / 2, 0, g);
var s = wSign(lines, w, h, "#2A3A22", "#E8E2C8");
s.position.set(0, 1.7, 0.07);
g.add(s);
var s2 = s.clone();
s2.rotation.y = Math.PI;
s2.position.z = -0.07;
g.add(s2);
return g;
},
function (G, x, z) {
var y = gwHeight(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
wCyl(0.07, 0.09, 3.2, gwM(0x2E3A2A), 0, 1.6, 0, g, 6);
wBox(0.5, 0.08, 0.08, gwM(0x2E3A2A), 0.2, 3.15, 0, g);
var l = new THREE.Group();
l.position.set(0.42, 2.85, 0);
l.userData.keep = 1;
g.add(l);
wBox(0.26, 0.34, 0.26, gwBasic(0xFFE2A8), 0, 0, 0, l);
var gl = wGlow(0xFFD890, 1.8, 0.45);
l.add(gl);
GW.lamps = (GW.lamps || []);
GW.lamps.push(l);
GW.solids.push({ x: x, z: z, r: 0.15 });
},
function (x, z) {
var best = 1e9;
for (var i = 0; i < GW_PATHS.length; i++) {
var P = GW_PATHS[i];
for (var j = 0; j < P.length - 1; j++) {
var a = P[j], b = P[j + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = px * px + pz * pz;
if (d < best)
best = d;
}
}
return Math.sqrt(best);
},
function (G) {
var seg = GW_LITE ? 150 : 230, R = wRand(9090);
var gr = wGround(1100, seg, function (x, z) {
var h = gwHeight(x, z), c = new THREE.Color(0x5E8E3E), n = wNoise(x * 0.05, z * 0.05, 4);
c.offsetHSL((n - 0.5) * 0.04, 0, (n - 0.5) * 0.08);
var d = Math.hypot(x, z);
if (d > 340)
c.lerp(new THREE.Color(0x4A7A3A), Math.min(1, (d - 340) / 60));
var p = gwPathDist(x, z);
if (p < 2.2)
c.lerp(new THREE.Color(0xA89070), p < 1.4 ? 1 : (2.2 - p) / 0.8);
var fx = Math.abs(Math.abs(x - GW_SITE.fields.x) - 36), fz = Math.abs(Math.abs(z - GW_SITE.fields.z) - 36);
if (fx < 32 && fz < 32) {
var fm = gwMonth();
c.lerp(new THREE.Color(fm >= 8 || fm <= 1 ? 0x9A8A5E : fm <= 3 ? 0x6A5638 : 0x6A8A3A), Math.min(1, (32 - Math.max(fx, fz)) / 2) * 0.85);
}
var pd = Math.hypot(x - GW_SITE.pond.x, z - GW_SITE.pond.z);
if (pd < GW_SITE.pond.r - 2)
c.setHex(0x3A4A2A);
return [h, c.getHex()];
});
gr.name = "gw-ground";
gr.userData.keep = 1;
G.add(gr);
},
function (G) {
var s = GW_SITE.heartwood, y = gwHeight(s.x, s.z), g = new THREE.Group();
g.position.set(0, y, -4);
G.add(g);
var bark = gwM(0x5A4632), moss = gwM(0x4E7A3A);
wCyl(3.6, 5.2, 15, bark, 0, 7.5, 0, g, 14);
for (var r = 0; r < 9; r++) {
var a = r / 9 * 6.283, root = wBox(1.2, 1.1, 7, bark, Math.cos(a) * 4.5, 0.35, Math.sin(a) * 4.5, g);
root.rotation.y = -a + Math.PI / 2;
root.rotation.x = 0.12;
}
for (var b = 0; b < 6; b++) {
var a2 = b / 6 * 6.283 + 0.3, lg = new THREE.Group();
lg.position.set(Math.cos(a2) * 2.2, 14.5, Math.sin(a2) * 2.2);
lg.rotation.y = -a2;
g.add(lg);
var limb = wCyl(0.7, 1.2, 8, bark, 0, 0, 0, lg, 8);
limb.rotation.z = -0.95;
limb.position.set(2.8, 2.2, 0);
}
wCyl(3.7, 3.9, 2, moss, 0, 1, 0, g, 14);
var R = wRand(77);
GW.heartCrown = [];
for (var k = 0; k < 16; k++) {
var a3 = R() * 6.283, d = R() * 12, hh = 17 + R() * 9;
GW.heartCrown.push(gwI("canopy", Math.cos(a3) * d, y + hh, -4 + Math.sin(a3) * d, 14 + R() * 8, 8 + R() * 5, 14 + R() * 8, R() * 6, 0x3E6E30));
}
GW.solids.push({ x: 0, z: -4, r: 5.4 });
var sp = new THREE.Group();
sp.position.set(0, y, 16);
G.add(sp);
for (var i = 0; i < 16; i++) {
var a4 = i / 16 * 6.283;
wBox(1.1, 0.55, 0.8, gwM(i % 2 ? 0x8A8A7A : 0x7A7E6A), Math.cos(a4) * 4.6, 0.27, Math.sin(a4) * 4.6, sp).rotation.y = -a4;
}
var w = wCyl(4.3, 4.3, 0.12, new THREE.MeshPhongMaterial({ color: 0x3A7A8A, shininess: 80, specular: 0x88A8B0, transparent: true, opacity: 0.86 }), 0, 0.18, 0, sp, 24);
sp.userData.keep = 1;
GW.spring = w;
GW.solids.push({ x: 0, z: 16, r: 4.4 });
for (var j = 0; j < 12; j++) {
var a5 = j / 12 * 6.283 + 0.13, st = wBox(1.1, 2.2 + (j % 3) * 0.4, 0.6, gwM(0x8A8A80), Math.cos(a5) * 26, gwHeight(Math.cos(a5) * 26, 8 + Math.sin(a5) * 26) - y + 1, 8 + Math.sin(a5) * 26 - 0, G);
st.position.y = gwHeight(Math.cos(a5) * 26, 8 + Math.sin(a5) * 26) + 1;
st.rotation.y = -a5;
wBox(1.14, 0.3, 0.64, moss, st.position.x, st.position.y + 1.15 + (j % 3) * 0.2, st.position.z, G).rotation.y = -a5;
GW.solids.push({ x: st.position.x, z: st.position.z, r: 0.6 });
}
var R2 = wRand(78);
for (var f = 0; f < (GW_LITE ? 60 : 180); f++) {
var a6 = R2() * 6.283, d6 = 7 + R2() * 18, fx = Math.cos(a6) * d6, fz = 8 + Math.sin(a6) * d6;
if (Math.hypot(fx, fz - 16) < 5.5)
continue;
gwI("bloom", fx, gwHeight(fx, fz) + 0.2, fz, 0.18, 0.18, 0.18, R2() * 3, [0xF4E8F0, 0xE8D84A, 0xB89AE0, 0xE88AA8, 0xF0F0E0][f % 5]);
}
gwLectern(G, 9, 22, gwFaceRot(9, 22, 0, 40), "Sunlight into food");
GW.lessonAt.heartwood = { x: 9, z: 22 };
},
function (G) {
var s = GW_SITE.village, y = gwHeight(s.x, s.z);
var sd = new THREE.Group();
sd.position.set(0, y, 92);
G.add(sd);
wCyl(1.4, 1.6, 0.3, gwM(0x9A9688), 0, 0.15, 0, sd, 16);
wCyl(0.4, 0.5, 1.1, gwM(0x9A9688), 0, 0.85, 0, sd, 10);
wCyl(0.8, 0.8, 0.08, gwM(0xB8A060), 0, 1.44, 0, sd, 20);
var gn = wBox(0.05, 0.5, 0.6, gwM(0x8A7040), 0, 1.7, 0, sd);
gn.rotation.x = 0.6;
for (var i = 0; i < 12; i++) {
var a = i / 12 * 6.283;
wBox(0.5, 0.06, 1.1, gwM(i % 3 === 0 ? 0xB89A6A : 0xA89A88), Math.cos(a) * 6, 0.04, Math.sin(a) * 6, sd).rotation.y = -a;
}
GW.solids.push({ x: 0, z: 92, r: 1.5 });
gwSpot(0, 92, 3.2, "The Sundial Lawn", "read the calendar of what is ripe", function () { gwRipeCard(); });
gwLectern(G, 5, 99, gwFaceRot(5, 99, 0, 120), "The seasons");
GW.lessonAt.sundial = { x: 5, z: 99 };
var wl = new THREE.Group();
wl.position.set(16, gwHeight(16, 80), 80);
G.add(wl);
wCyl(1.2, 1.25, 0.9, gwM(0x8A8478), 0, 0.45, 0, wl, 14);
wCyl(1.0, 1.0, 0.05, gwBasic(0x1E2A30), 0, 0.86, 0, wl, 14);
[-1, 1].forEach(function (k) { wBox(0.15, 2.2, 0.15, gwM(0x5A4030), k * 1.05, 1.1, 0, wl); });
wBox(2.4, 0.12, 0.12, gwM(0x5A4030), 0, 2.1, 0, wl);
var rf = wBox(2.8, 0.1, 1.6, gwM(0x6A4030), 0, 2.5, 0.4, wl);
rf.rotation.x = 0.4;
var rf2 = wBox(2.8, 0.1, 1.6, gwM(0x6A4030), 0, 2.5, -0.4, wl);
rf2.rotation.x = -0.4;
wCyl(0.25, 0.22, 0.35, gwM(0x6A5A44), 0.5, 1.0, 0, wl, 8);
GW.solids.push({ x: 16, z: 80, r: 1.3 });
gwSpot(16, 80, 3, "The well", "fill a watering can", gwFillCan);
gwLectern(G, 22, 84, gwFaceRot(22, 84, 0, 92), "Water and the thirsty field");
GW.lessonAt.well = { x: 22, z: 84 };
[[-12, 104, 0], [12, 104, 0], [-12, 80, Math.PI], [12, 72, Math.PI]].forEach(function (q) { var F = gwFrame(G, q[0], q[1], q[2]); gwBench(F, 0, 0, 2.2, true); });
gwPost(G, -6, 120, ["The Greenwold", "↑ the Heartwood · the Orchards", "← the Farmstead · the Apiary", "→ the Market Garden · the Glasshouses"], 0, 3.0, 1.6);
for (var lp = 0; lp < GW_PATHS.length; lp++) {
var P = GW_PATHS[lp];
for (var j = 0; j < P.length - 1; j++) {
var a2 = P[j], b = P[j + 1], L = Math.hypot(b[0] - a2[0], b[1] - a2[1]);
for (var t = 12; t < L; t += (GW_LITE ? 60 : 34)) {
var k = t / L, x = a2[0] + (b[0] - a2[0]) * k, z = a2[1] + (b[1] - a2[1]) * k, nx = -(b[1] - a2[1]) / L, nz = (b[0] - a2[0]) / L;
gwLamp(G, x + nx * 2.6, z + nz * 2.6);
}
}
}
},
function (G) {
var F = gwFrame(G, -42, 92, Math.PI / 2), wall = gwM(0xC8B89A), timber = gwM(0x5A4030), floor = gwM(0x8A6A4A), stone = gwM(0x9A9488);
F.floor(30, 20, floor);
F.wallX(10, -15, 15, 5, wall, [[-5, 3.2, 3]]);
F.wallX(-10, -15, 15, 5, wall, []);
F.wallZ(-15, -10, 10, 5, wall, []);
F.wallZ(15, -10, 10, 5, wall, []);
F.wallZ(5, 2, 10, 3.2, wall, [[6, 1.6]], 0.18);
F.wallX(-2, -15, 5, 3.2, wall, [[-8, 1.8], [3, 1.2, 2.3]], 0.18);
F.wallZ(-1, -10, -2, 3.2, wall, [], 0.18);
F.wallX(2, 7, 15, 3.2, wall, [[11, 1.2, 2.3]], 0.18);
F.wallZ(7, -10, 2, 3.2, wall, [], 0.18);
F.wallX(-2, 5, 7, 3.2, wall, [], 0.18);
F.badgeDoor(3, -2, 1.2, true);
F.badgeDoor(11, 2, 1.2, true);
F.roof(30.6, 20.6, 5, 4.2, gwM(0x6A3A2A), wall);
for (var b = -12; b <= 12; b += 6)
F.box(0.25, 0.3, 20, timber, b, 4.9, 0);
var sg = wSign(["THE HARVEST HALL", "Market · Seeds · Hearth Kitchen"], 5, 1.2, "#2A3A22", "#F0E2B8");
sg.position.set(-5, 4.2, 10.16);
F.g.add(sg);
F.room("the Market Floor", -15, -2, 5, 10);
F.room("the Seed Counter", 5, 2, 15, 10);
F.room("the Hearth Kitchen", -15, -10, -1, -2);
F.room("the Cold Store", -1, -10, 7, -2, true);
F.room("the Office", 7, -10, 15, 2, true);
gwCrates(F, -11, 5, ["apples", "pears", "pumpkins", "carrots", "potatoes", "onions"]);
gwCrates(F, -4, 5, ["cabbages", "leeks", "beetroot", "kale", "parsnips", "squash"]);
gwCrates(F, -11, 0.5, ["plums", "grapes", "quinces", "walnuts", "chestnuts", "mushrooms"]);
F.box(5, 1.0, 0.8, timber, 0, 0.5, 1.5, true);
F.box(5.2, 0.08, 0.9, gwM(0x8A6A44), 0, 1.04, 1.5);
F.box(0.5, 0.25, 0.4, gwM(0x9A9AA0), -1.5, 1.2, 1.5);
var pane = gwM(0xB8D0DC, { ds: 1 }), sill = gwM(0x6A5034);
[-12, -6, 6, 12].forEach(function (wx) { [-9.9, 9.9].forEach(function (wz) { if (wz > 0 && wx < -3 && wx > -7)
return; F.box(1.6, 1.4, 0.04, pane, wx, 2.3, wz * 0.994); F.box(1.6, 1.4, 0.04, pane, wx, 2.3, wz * 1.026); F.box(1.8, 0.1, 0.25, sill, wx, 1.55, wz * 0.98); F.box(0.08, 1.4, 0.06, sill, wx, 2.3, wz * 0.992); }); });
[[-10, 3], [-4, 3], [-8, -6], [10, 6]].forEach(function (q) { F.box(0.03, 1.6, 0.03, gwM(0x2A2A2A), q[0], 4.1, q[1]); var sh = wCone(0.35, 0.3, gwM(0x2A4A2A), q[0], 3.2, q[1], F.g, 10); sh.rotation.x = Math.PI; var b = wSph(0.1, gwBasic(0xD8C090), q[0], 3.12, q[1], F.g, 8); });
var cb = wSign(["TODAY AT THE MARKET", "picked this morning", "sold by the basket"], 2.2, 1.2, "#1E2A22", "#F0ECE0");
cb.position.set(-14.85, 2.2, 4);
cb.rotation.y = Math.PI / 2;
F.g.add(cb);
[[-7.5, 8.6], [-6.6, 8.8], [-2.8, 8.6]].forEach(function (q) { wCyl(0.32, 0.24, 0.34, gwM(0x9A7A4A), q[0], 0.17, q[1], F.g, 10); });
F.box(1.8, 0.9, 0.7, timber, -13.6, 0.45, -0.6, true);
F.box(0.6, 0.5, 0.4, gwM(0x9A9AA0), -13.6, 1.15, -0.6);
var mp = F.at(0, 3.2);
gwSpot(mp.x, mp.z, 2.4, "The market counter", "sell to the city's stores", function () { gwSellCard(); });
gwShelves(F, 14.6, 6, 7, false, [0x8A6A44, 0x7A5A3A, 0x9A7A4A], 2.6);
F.box(0.7, 1.0, 4, timber, 11, 0.5, 6, true);
var sp = F.at(9.6, 6);
gwSpot(sp.x, sp.z, 2.2, "The seed counter", "buy seeds for your garden", function () { gwSeedCard(); });
F.box(4, 0.95, 0.8, gwM(0x2A2A2E), -10, 0.48, -9.4, true);
for (var r = 0; r < 4; r++)
F.box(0.5, 0.03, 0.5, gwBasic(0x3A3A3E), -11.5 + r, 0.98, -9.4);
F.box(4, 0.95, 0.8, gwM(0xE8E0D0), -5, 0.48, -9.4, true);
F.box(1, 0.1, 0.6, gwM(0x9AA0A8), -4, 0.98, -9.4);
gwShelves(F, -14.6, -6, 6, false, [0xD8301E, 0xE8761E, 0x7A1A3A, 0xE0A020, 0x5A2A6A], 2.2);
gwTable(F, -8, -5.6, 4.2, 1.2);
[[-11.4, 0.18], [-10.4, 0.24], [-9.4, 0.15]].forEach(function (q) { wCyl(0.2, 0.2, q[1], gwM(0x5A5A60), q[0], 1.0 + q[1] / 2, -9.4, F.g, 12); });
F.box(4, 0.04, 0.04, gwM(0x3A3A3A), -10, 2.2, -9.7);
for (var pn = 0; pn < 5; pn++) {
var pp = wCyl(0.17, 0.17, 0.04, gwM(pn % 2 ? 0x8A5A3A : 0x4A4A50), -11.6 + pn * 0.8, 1.95, -9.66, F.g, 10);
pp.rotation.x = Math.PI / 2;
}
wSph(0.22, gwM(0xC8904A), -8.8, 0.98, -5.6, F.g, 8).scale.set(1.4, 0.6, 0.9);
wCyl(0.3, 0.2, 0.14, gwM(0xE8E0D0), -7.2, 0.94, -5.6, F.g, 12);
for (var fb = 0; fb < 5; fb++)
wSph(0.08, gwM([0xC8302A, 0xE0A020, 0x9AB03A, 0xC8302A, 0xE07A2A][fb]), -7.3 + (fb % 3) * 0.1, 1.04 + (fb > 2 ? 0.06 : 0), -5.6 + (fb % 2) * 0.08, F.g, 6);
F.box(2, 2, 0.45, timber, -3, 1, -9.6, true);
for (var pl = 0; pl < 6; pl++)
wCyl(0.17, 0.17, 0.02, gwM(0xF0ECE0), -3.7 + pl * 0.28, 1.45, -9.36, F.g, 10).rotation.x = Math.PI / 2 - 0.15;
[-9.6, -7.6, -6.4].forEach(function (cz) { F.box(0.45, 0.45, 0.45, timber, -8 + (cz < -7 ? -1.2 : 1.2), 0.23, cz === -9.6 ? -4.6 : cz); });
var kp = F.at(-8, -7.2);
gwSpot(kp.x, kp.z, 2.6, "The Hearth Kitchen", "cook with what you have picked", function () { gwMakeCard("kitchen"); });
GW.lessonAt.kitchen = F.at(-12, -4);
gwLectern(G, GW.lessonAt.kitchen.x, GW.lessonAt.kitchen.z, Math.PI / 2 + Math.PI, "Keeping the harvest");
gwShelves(F, 3, -9.5, 7, true, [0xC8342A, 0xC8A878, 0xE8761E, 0xD8B87A], 2.4);
gwShelves(F, 0.2, -6, 6, false, [0x6A9A4A, 0x2E5A3A, 0xE8DCC0], 2.4);
F.box(1.6, 0.78, 0.8, timber, 11, 0.39, -7, true);
F.box(0.5, 0.4, 0.05, gwBasic(0x6A8AB8), 11, 1.05, -7.2);
gwShelves(F, 14.6, -5, 4, false, [0x8A6A44, 0xE8E0D0], 2);
},
function (G) {
var F = gwFrame(G, 42, 92, -Math.PI / 2), wall = gwM(0xB8A88A), brick = gwM(0x8A4A3A), floor = gwM(0x9A7A5A), timber = gwM(0x5A4030);
F.floor(30, 20, floor);
F.wallX(10, -15, 15, 4.6, brick, [[1, 2.6, 2.8]]);
F.wallX(-10, -15, 15, 4.6, brick, []);
F.wallZ(-15, -10, 10, 4.6, brick, []);
F.wallZ(15, -10, 10, 4.6, brick, []);
F.wallZ(-3, -2, 10, 3.2, wall, [[4, 1.8]], 0.18);
F.wallZ(5, -2, 10, 3.2, wall, [[4, 1.8]], 0.18);
F.wallX(-2, -15, 15, 3.2, wall, [[-9, 1.6], [1, 1.6], [11, 1.2, 2.3]], 0.18);
F.wallZ(-3, -10, -2, 3.2, wall, [], 0.18);
F.wallZ(7, -10, -2, 3.2, wall, [], 0.18);
F.badgeDoor(11, -2, 1.2, true);
F.roof(30.6, 20.6, 4.6, 4, gwM(0x4A4E56), brick);
var sg = wSign(["THE GRANGE SCHOOL", "and the Seed Library · World Learning: Growing"], 6, 1.2, "#3A2A1E", "#F0E2B8");
sg.position.set(1, 3.9, 10.16);
F.g.add(sg);
F.room("the Seed Library", -15, -2, -3, 10);
F.room("the entrance hall", -3, -2, 5, 10);
F.room("the Growing classroom", 5, -2, 15, 10);
F.room("the Soil and Seed lab", -15, -10, -3, -2);
F.room("the Plant Science classroom", -3, -10, 7, -2);
F.room("the teachers' room", 7, -10, 15, -2, true);
F.box(2.6, 1.05, 0.7, timber, 1, 0.53, 3.4, true);
F.box(2.8, 0.06, 0.8, gwM(0x8A6A44), 1, 1.08, 3.4);
F.box(0.4, 0.3, 0.3, gwM(0x2A2A2E), 0.2, 1.26, 3.4);
var nb = wSign(["NOTICES", "Growing: sixteen lessons, two questions each", "Seed swap on the first day of each month", "Harvest supper in the Harvest Hall"], 2.4, 1.4, "#6A4A2E", "#F4ECD8");
nb.position.set(-2.88, 1.8, 5);
nb.rotation.y = Math.PI / 2;
F.g.add(nb);
for (var pg = 0; pg < 6; pg++) {
F.box(0.05, 0.05, 0.18, timber, 4.85, 1.65, 1.2 + pg * 0.5);
if (pg % 2 === 0)
F.box(0.12, 0.75, 0.35, gwM([0x3A5A7A, 0x8A3A2A, 0x4A6A3A][pg / 2 | 0]), 4.75, 1.3, 1.2 + pg * 0.5);
}
F.box(0.45, 0.45, 2.6, timber, 4.6, 0.23, 7, true);
F.box(1.6, 1.6, 0.5, gwM(0x6A4A2E), -1.6, 0.8, 9.6, true);
F.box(1.5, 1.3, 0.04, gwM(0xB8D0DC, { ds: 1 }), -1.6, 0.95, 9.33);
for (var dj = 0; dj < 6; dj++)
F.box(0.18, 0.22, 0.18, gwM([0xC8A060, 0x8A6A4A, 0xE8D8A0, 0x5A4030, 0xD8B860, 0x9A7A4A][dj]), -2.1 + (dj % 3) * 0.5, 0.5 + Math.floor(dj / 3) * 0.55, 9.6);
[[-2.4, -1.4], [4.4, -1.4], [-2.4, 9.3], [4.3, 9.3]].forEach(function (q) { wCyl(0.25, 0.2, 0.4, gwM(0x9A5A3A), q[0], 0.2, q[1], F.g, 10); wSph(0.38, gwM(0x3E6E30), q[0], 0.75, q[1], F.g, 8); });
var spane = gwM(0xB8D0DC, { ds: 1 });
[-12, -7, 9, 13].forEach(function (wx) { [-9.84, 9.84].forEach(function (wz) { F.box(1.6, 1.5, 0.04, spane, wx, 2.2, wz); F.box(1.6, 1.5, 0.04, spane, wx, 2.2, wz * 1.033); F.box(1.8, 0.1, 0.25, timber, wx, 1.4, wz * 0.985); }); });
gwShelves(F, -14.6, 4, 11, false, [0x8A6A44, 0x7A5A3A, 0x9A7A4A, 0xA88A5A], 2.6);
gwShelves(F, -9, 9.6, 10, true, [0x8A6A44, 0x7A5A3A, 0x9A7A4A], 2.4);
gwTable(F, -9, 3, 3, 1.4);
var lib = F.at(-9, 1.4);
gwSpot(lib.x, lib.z, 2.4, "The Seed Library", "look through the seed drawers", function () { gwSeedCard(true); });
GW.lessonAt.seedlib = F.at(-6, 6);
[[10, 4], [2, -6]].forEach(function (q, ci) {
var cx = q[0], cz = q[1];
F.box(ci ? 6 : 6, 1.4, 0.06, gwM(0x2A3A2E), cx, 1.6, ci ? -9.85 : -1.85);
F.box(1.2, 0.75, 0.6, timber, cx, 0.38, ci ? -8.4 : -0.6, true);
for (var r = 0; r < 3; r++)
for (var c = 0; c < 3; c++) {
var dx = cx - 2.4 + c * 2.4, dz = (ci ? -6.6 : 1.6) + r * 1.6 * (ci ? 1 : 1);
F.box(0.9, 0.06, 0.55, gwM(0x9A7A4A), dx, 0.72, dz);
F.box(0.06, 0.7, 0.5, timber, dx - 0.4, 0.35, dz);
F.box(0.06, 0.7, 0.5, timber, dx + 0.4, 0.35, dz);
}
});
F.box(8, 0.9, 1, gwM(0xD8D0C0), -9, 0.45, -9.2, true);
for (var t = 0; t < 8; t++)
F.box(0.7, 0.12, 0.5, gwM(t % 2 ? 0x4A3424 : 0x5A8A3A), -12.5 + t, 0.96, -9.2);
F.box(1, 0.9, 5, gwM(0xD8D0C0), -14.2, 0.45, -5.5, true);
for (var j = 0; j < 4; j++)
F.box(0.2, 0.35, 0.2, gwM([0xC8A060, 0x8A6A4A, 0x5A4030, 0x6A5040][j]), -14.2, 1.08, -7.5 + j * 1.2);
GW.teacherAt = F.at(10, -0.2);
GW.lessonAt.school = F.at(1, -0.5);
var tp = F.at(10, 1.5);
gwSpot(tp.x, tp.z, 2.6, "The Growing classroom", "open World Learning: Growing", function () { gwCourseCard(); });
},
function (G) {
var R = wRand(1201), beds = ["potatoes", "carrots", "onions", "garlic", "cabbages", "lettuce", "tomatoes", "beans", "peas", "pumpkins", "courgettes", "beetroot", "kale", "leeks", "parsnips", "spinach", "radishes", "rhubarb", "sweetcorn", "carrots", "potatoes", "cabbages", "lettuce", "onions"];
var i = 0;
for (var c = 0; c < 4; c++)
for (var r = 0; r < 6; r++) {
var x = 84 + c * 16, z = -2 + r * 9.5;
if (i >= beds.length)
break;
gwBed(x, z, 10, 0, beds[i], { R: R, label: "a bed of " + GW_CROP[beds[i]].n.toLowerCase() });
i++;
}
GW.lessonAt.garden = { x: 100, z: -10 };
gwLectern(G, 100, -10, gwFaceRot(100, -10, 100, 10), "Crop rotation");
gwPost(G, 76, -12, ["The Market Garden", "Four groups of beds move round each year:", "roots, legumes, cabbages, potatoes"], gwFaceRot(76, -12, 40, -20), 3.2, 1.4);
for (var m = 0; m < 6; m++) {
var mx = 150 + (m % 3) * 5, mz = 24 + Math.floor(m / 3) * 6, my = gwHeight(mx, mz);
wCyl(1.6, 2, 0.5, gwM(GW_SOIL), mx, my + 0.25, mz, G, 12);
}
gwBed(155, 27, 10, 0, "sweetcorn", { noSoil: true, oneRow: true, step: 1.6, y: 0.4, label: "the Three Sisters' corn" });
gwBed(155, 32, 10, 0, "beans", { noSoil: true, oneRow: true, step: 1.6, y: 0.4, label: "the Three Sisters' beans" });
gwBed(155, 22, 10, 0, "pumpkins", { noSoil: true, oneRow: true, step: 2, y: 0.4, label: "the Three Sisters' squash" });
GW.lessonAt.sisters = { x: 146, z: 40 };
gwLectern(G, 146, 40, gwFaceRot(146, 40, 140, 60), "The Three Sisters");
var sp = gwFrame(G, 92, 64, Math.PI);
["sand", "silt", "clay"].forEach(function (k, j) { sp.box(1.2, 0.6, 1.0, gwM(0x6A5034), -1.6 + j * 1.6, 0.3, 0, true); sp.box(1.0, 0.06, 0.8, gwM([0xD8C08A, 0x9A8060, 0x8A5A3A][j]), -1.6 + j * 1.6, 0.62, 0); });
gwPost(G, 92, 61, ["The Soil Pit", "sand · silt · clay"], Math.PI, 2.2, 0.8);
GW.lessonAt.soilpit = { x: 88, z: 58 };
var cp = gwFrame(G, 154, 62, Math.PI);
for (var b = 0; b < 3; b++) {
var bx = -3.2 + b * 3.2;
cp.box(0.12, 1.1, 2.6, gwM(0x6A5034), bx - 1.5, 0.55, 0, true);
cp.box(2.9, 0.9 - b * 0.2, 2.3, gwM([0x6A7A3A, 0x5A4A30, 0x3A2A1E][b]), bx, 0.45 - b * 0.1, 0);
}
cp.box(0.12, 1.1, 2.6, gwM(0x6A5034), 3.2 + 1.5, 0.55, 0, true);
cp.box(9.8, 1.1, 0.12, gwM(0x6A5034), 0, 0.55, -1.3, true);
gwPost(G, 154, 66, ["The Compost Yard", "new · cooking · ready"], Math.PI, 2.4, 0.8);
GW.lessonAt.compost = { x: 149, z: 68 };
for (var hz = -12; hz < 60; hz += 2.2) {
if (hz > 4 && hz < 16)
continue;
gwI("ball", 68, gwHeight(68, hz) + 0.9, hz, 2.4, 1.9, 2.2, hz, 0x3E6A2E);
if (!GW_LITE && (hz | 0) % 3 === 0)
gwI("bloom", 68.6, gwHeight(68, hz) + 1.6, hz, 0.2, 0.2, 0.2, 0, 0xF4E8E0);
GW.solids.push({ x: 68, z: hz, r: 1.1 });
}
var ih = gwFrame(G, 68, 10, Math.PI / 2);
ih.box(2.2, 2.4, 0.8, gwM(0x6A4A2E), 0, 1.2, 0, true);
ih.roof(2.4, 0.8, 2.4, 0.4, gwM(0x5A3A2A));
for (var hy = 0; hy < 4; hy++)
for (var hx = 0; hx < 4; hx++)
ih.box(0.4, 0.4, 0.05, gwM([0x8A6A4A, 0xC8A878, 0x4A3424, 0x9A7A5A][(hx + hy) % 4]), -0.75 + hx * 0.5, 0.4 + hy * 0.5, 0.41);
GW.lessonAt.hedgerow = { x: 72, z: 10 };
gwLectern(G, 72, 14, gwFaceRot(72, 14, 90, 14), "Friends against pests");
var ps = gwFrame(G, 154, 4, -Math.PI / 2);
ps.floor(5, 4, gwM(0x7A5A3A));
ps.wallX(2, -2.5, 2.5, 2.6, gwM(0x6A5A44), [[0, 1.2]]);
ps.wallX(-2, -2.5, 2.5, 2.6, gwM(0x6A5A44));
ps.wallZ(-2.5, -2, 2, 2.6, gwM(0x6A5A44));
ps.wallZ(2.5, -2, 2, 2.6, gwM(0x6A5A44));
ps.roof(5.4, 4.4, 2.6, 0.9, gwM(0x4A4A40), gwM(0x6A5A44));
ps.box(4, 0.9, 0.7, gwM(0x8A6A4A), 0, 0.45, -1.5, true);
for (var pp = 0; pp < 6; pp++)
ps.box(0.25, 0.25, 0.25, gwM(0xB86A3A), -1.6 + pp * 0.6, 1.05, -1.5);
ps.room("the potting shed", -2.5, -2, 2.5, 2);
var wb = ps.at(2, 3.2);
wCyl(0.5, 0.45, 1.1, gwM(0x3A4A3A), wb.x, gwHeight(wb.x, wb.z) + 0.55, wb.z, G, 10);
GW.solids.push({ x: wb.x, z: wb.z, r: 0.55 });
gwSpot(wb.x, wb.z, 2.4, "The water butt", "fill a watering can", gwFillCan);
},
function (G) {
var F = gwFrame(G, 112, 132, Math.PI), iron = gwM(0xE8EAE4), glass = gwGlass(), floor = gwM(0x9A8A6A);
F.floor(34, 16, floor);
[-8, 8].forEach(function (z) {
for (var x = -17; x <= 17; x += 2.83)
F.box(0.12, 6, 0.12, iron, x, 3, z);
F.box(34, 0.12, 0.12, iron, 0, 6, z);
F.box(34, 0.12, 0.12, iron, 0, 1, z);
F.wallX(z, -17, 17, 6, glass, z > 0 ? [[0, 2.4, 2.6]] : [], 0.05);
});
[-17, 17].forEach(function (x) { F.box(0.05, 6, 16, glass, x, 3, 0, true); for (var z2 = -8; z2 <= 8; z2 += 2.66)
F.box(0.12, 6, 0.12, iron, x, 3, z2); });
var pitch = Math.atan2(2.6, 8), slope = Math.hypot(2.6, 8) + 0.2, gable = glass;
[-1, 1].forEach(function (sd) { var r = F.box(34, 0.05, slope, glass, 0, 7.3, sd * 4); r.rotation.x = sd * pitch; });
F.box(34, 0.18, 0.18, iron, 0, 8.6, 0);
for (var rx = -17; rx <= 17; rx += 4.25) {
[-1, 1].forEach(function (sd) { var rr = F.box(0.1, 0.1, slope, iron, rx, 7.36, sd * 4); rr.rotation.x = sd * pitch; });
}
[-17, 17].forEach(function (gx) {
var sh = new THREE.Shape();
sh.moveTo(-8, 0);
sh.lineTo(8, 0);
sh.lineTo(0, 2.6);
sh.lineTo(-8, 0);
var gm = new THREE.Mesh(new THREE.ShapeGeometry(sh), gable);
gm.position.set(gx, 6, 0);
gm.rotation.y = Math.PI / 2;
F.g.add(gm);
});
var lt = new THREE.Group();
lt.userData.keep = 1;
F.g.add(lt);
F.box(5, 0.1, 4, iron, 0, 9.2, 0);
F.box(4.6, 1.2, 3.6, glass, 0, 9.8, 0);
var sg = wSign(["THE PALM HOUSE", "the tropics under glass"], 4, 0.8, "#22361E", "#F0E8C8");
sg.position.set(0, 6.9, 8.14);
F.g.add(sg);
F.room("the Palm House", -17, -8, 17, 8);
var R = wRand(1501);
[-13, -9].forEach(function (lx, i) {
var p = F.at(lx, -4), y = F.y + 0.12;
gwI("stalk", p.x, y, p.z, 0.35, 3.4, 0.35, 0, 0x7A8A4A);
for (var k = 0; k < 7; k++) {
var a = k / 7 * 6.283;
gwI("leafy", p.x + Math.cos(a) * 1.4, y + 3.6, p.z + Math.sin(a) * 1.4, 2.6, 0.2, 0.8, -a, 0x4A8A3A);
}
var hs = [];
for (var b = 0; b < 6; b++)
hs.push(gwI("fruit", p.x + 0.3, y + 2.6 - b * 0.2, p.z + (b % 2 ? 0.15 : -0.15), 0.1, 0.3, 0.1, 0, GW_COL.bananas));
gwNode({ crop: "bananas", x: p.x, z: p.z, r: 2.6, hs: hs, glass: true, label: "a banana plant" });
GW.solids.push({ x: p.x, z: p.z, r: 0.5 });
});
var pa = F.at(-11, 3);
gwBed(pa.x, pa.z, 6, Math.PI, "pineapples", { kind: "leafy", glass: true, label: "the pineapple bed", R: R });
[-4, -1].forEach(function (lx) { var p = F.at(lx, -5); var T = gwTree(p.x, p.z, { s: 0.6, crown: 2, leaf: 0x2E6A2E, fruit: GW_COL.coffee, fs: 0.12, n: 14, ever: true, R: R }); gwNode({ crop: "coffee", x: p.x, z: p.z, r: 2.4, hs: T.fruit, glass: true, label: "a coffee bush" }); });
[3, 6].forEach(function (lx) {
var p = F.at(lx, -4.5);
var T = gwTree(p.x, p.z, { s: 0.9, crown: 2.2, leaf: 0x3A6A2A, fruit: GW_COL.cacao, fs: 0.22, fsy: 0.4, n: 6, ever: true, R: R });
T.fruit.forEach(function (h) { var r = GW.ins[h.k].list[h.i]; var a = Math.atan2(r[2] - p.z, r[0] - p.x); r[0] = p.x + Math.cos(a) * 0.4; r[2] = p.z + Math.sin(a) * 0.4; r[1] = F.y + 1 + Math.random() * 1.2; });
gwNode({ crop: "cacao", x: p.x, z: p.z, r: 2.4, hs: T.fruit, glass: true, label: "a cacao tree" });
});
[[10, -4, "oranges"], [13, -4, "lemons"], [10, 4, "oranges"], [13, 4, "lemons"]].forEach(function (q) {
var p = F.at(q[0], q[1]);
wCyl(0.6, 0.5, 0.6, gwM(0xB86A3A), p.x, F.y + 0.42, p.z, G, 10);
var T = gwTree(p.x, p.z, { s: 0.7, crown: 1.6, leaf: 0x2E5A2A, fruit: GW_COL[q[2]], fs: 0.2, n: 12, ever: true, R: R });
gwNode({ crop: q[2], x: p.x, z: p.z, r: 2.2, hs: T.fruit, glass: true, label: "an " + (q[2] === "oranges" ? "orange" : "lemon") + " tree in a tub" });
});
[["peppers", -1], ["chillies", 2], ["cucumbers", 5]].forEach(function (q) { var p = F.at(q[1], 4.5); F.box(2.4, 0.8, 1.2, gwM(0x8A6A4A), q[1], 0.4, 4.5, true); gwBed(p.x, p.z, 2.2, Math.PI, q[0], { y: 0.8, raised: 0.1, w: 1, step: 0.6, glass: true, label: "a bench of " + GW_CROP[q[0]].n.toLowerCase(), R: R }); });
var bp = F.at(-4, 4.5);
F.box(2.4, 0.8, 1.2, gwM(0x8A6A4A), -4, 0.4, 4.5, true);
gwBed(bp.x, bp.z, 2.2, Math.PI, "basil", { y: 0.8, raised: 0.1, w: 1, step: 0.5, glass: true, label: "a bench of basil", R: R });
GW.lessonAt.palmhouse = F.at(-6, 1);
var ph = GW_SITE.physic, herbs = ["lavender", "mint", "chamomile", "sage", "thyme", "rosemary", "parsley", "lavender"];
herbs.forEach(function (h, i) { var a = i / herbs.length * 6.283, x = ph.x + Math.cos(a) * 9, z = ph.z + Math.sin(a) * 9; gwBed(x, z, 5, -a + Math.PI / 2, h, { R: R, label: "the " + GW_CROP[h].n.toLowerCase() + " bed", w: 1.3 }); });
for (var b = 0; b < 28; b++) {
var a2 = b / 28 * 6.283;
gwI("ball", ph.x + Math.cos(a2) * 14, gwHeight(ph.x, ph.z) + 0.45, ph.z + Math.sin(a2) * 14, 1.0, 0.8, 1.0, a2, 0x2E5A2A);
}
wCyl(0.7, 0.9, 1.1, gwM(0x9A9688), ph.x, gwHeight(ph.x, ph.z) + 0.55, ph.z, G, 10);
GW.solids.push({ x: ph.x, z: ph.z, r: 0.9 });
gwPost(G, ph.x - 16, ph.z - 2, ["The Physic Garden", "herbs for the kitchen and the apothecary"], -Math.PI / 2, 3, 0.8);
},
function (G) {
var o = GW_SITE.orchard, kinds = [["apples", 0x4A7A32], ["pears", 0x4A7032], ["plums", 0x406A30], ["cherries", 0x3E6A2E], ["peaches", 0x4E7A36], ["apricots", 0x4A7434], ["figs", 0x5A8A3A], ["quinces", 0x587A3A]];
var R = wRand(3301), n = GW_LITE ? 3 : 4;
kinds.forEach(function (k, b) {
var bx = o.x - 54 + (b % 4) * 36, bz = o.z - 22 + Math.floor(b / 4) * 44;
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++) {
var x = bx - (n - 1) * 3.5 + i * 7 + (R() - 0.5), z = bz - (n - 1) * 3.5 + j * 7 + (R() - 0.5);
var T = gwTree(x, z, { s: 0.85 + R() * 0.25, crown: k[0] === "figs" ? 2.4 : 2.1, leaf: k[1], fruit: GW_COL[k[0]], fs: k[0] === "cherries" ? 0.16 : k[0] === "figs" ? 0.22 : 0.27, bloom: k[0] === "cherries" || k[0] === "peaches" || k[0] === "apricots" ? 0xF4C8D8 : 0xF6ECEE, R: R, n: k[0] === "cherries" ? 16 : 12 });
gwNode({ crop: k[0], x: x, z: z, r: 2.6, hs: T.fruit, tree: T, label: GW_TREE_NAME[k[0]] });
}
gwPost(G, bx, bz + (n * 3.5) + 3, [GW_CROP[k[0]].n, "ripe " + gwMonthsText(GW_CROP[k[0]])], 0, 2.4, 0.8);
});
GW.lessonAt.orchard = { x: 96, z: -98 };
gwLectern(G, 96, -98, gwFaceRot(96, -98, 70, -70), "The orchard and the graft");
var pr = GW_SITE.press, F = gwFrame(G, pr.x, pr.z, gwFaceRot(pr.x, pr.z, 0, 8)), wall = gwM(0xB8A88A);
F.floor(9, 7, gwM(0x7A5A3A));
F.wallX(3.5, -4.5, 4.5, 3, wall, [[0, 1.8]]);
F.wallX(-3.5, -4.5, 4.5, 3, wall);
F.wallZ(-4.5, -3.5, 3.5, 3, wall);
F.wallZ(4.5, -3.5, 3.5, 3, wall);
F.roof(9.4, 7.4, 3, 1.6, gwM(0x6A3A2A), wall);
F.room("the Press House", -4.5, -3.5, 4.5, 3.5);
F.box(1.6, 0.9, 1.6, gwM(0x6A4A2E), -1.5, 0.45, -1.6, true);
F.box(0.2, 1.8, 0.2, gwM(0x3A3A3E), -1.5, 1.8, -1.6);
F.box(1.2, 0.1, 0.1, gwM(0x3A3A3E), -1.5, 2.6, -1.6);
for (var bb = 0; bb < 4; bb++) {
F.box(0.9, 1.1, 0.9, gwM(0x7A5230), 2.2 + (bb % 2) * 1.1 - 0.5, 0.55, -2.2 + Math.floor(bb / 2) * 1.1, true);
}
var pp = F.at(-1.5, 0);
gwSpot(pp.x, pp.z, 2.2, "The apple press", "press juice", function () { gwMakeCard("press"); });
},
function (G) {
var b = GW_SITE.berries, R = wRand(4401);
[["strawberries", -12], ["strawberries", -8], ["gooseberries", -2], ["blueberries", 4], ["raspberries", 10], ["raspberries", 14]].forEach(function (q) {
gwBed(b.x, b.z + q[1], 18, 0, q[0], { R: R, label: "a row of " + GW_CROP[q[0]].n.toLowerCase(), step: q[0] === "strawberries" ? 0.7 : 1.0 });
});
for (var x = -14; x <= 14; x += 7)
gwBed(b.x + x, b.z - 20, 6.5, 0, "blackberries", { noSoil: true, R: R, label: "the bramble hedge" });
var F = gwFrame(G, b.x, b.z + 1, 0), net = new THREE.MeshLambertMaterial({ color: 0x2A3A2A, transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false });
[-10, 10].forEach(function (x2) { [-16, -4, 8, 17].forEach(function (z2) { F.box(0.1, 2.4, 0.1, gwM(0x5A4A3A), x2, 1.2, z2); }); });
[-10, 10].forEach(function (x2) { F.box(0.02, 2.4, 33, net, x2, 1.2, 0.5); });
F.box(20, 0.02, 33, net, 0, 2.4, 0.5);
gwPost(G, b.x - 12, b.z - 26, ["The Berry Garden", "strawberries · raspberries · blueberries", "gooseberries · the bramble hedge"], 0, 3, 1.1);
var v = GW_SITE.vineyard;
for (var r = 0; r < 7; r++) {
var x3 = v.x - 21 + r * 7, len = 36;
for (var z3 = -len / 2; z3 <= len / 2; z3 += 6) {
var yy = gwHeight(x3, v.z + z3);
wBox(0.12, 1.9, 0.12, gwM(0x6A5034), x3, yy + 0.95, v.z + z3, G);
}
gwBed(x3, v.z, len, Math.PI / 2, "grapes", { kind: "bush", noSoil: true, R: R, step: 1.2, oneRow: true, label: "a row of vines", noClover: true });
var N = GW.nodes[GW.nodes.length - 1];
N.hs.forEach(function (h) { var q = GW.ins[h.k].list[h.i]; q[1] += 0.6; q[3] = 0.16; q[4] = 0.24; q[5] = 0.16; });
}
gwPost(G, v.x - 26, v.z - 20, ["The Vineyard", "grapes ripen in September and October"], gwFaceRot(v.x - 26, v.z - 20, 200, 30), 2.8, 0.8);
},
function (G) {
var f = GW_SITE.fields, R = wRand(5501), crops = ["wheat", "barley", "oats", "rye"], per = GW_LITE ? 560 : 760, m = gwMonth();
GW.grain = [];
crops.forEach(function (k, qi) {
var cx = f.x + (qi % 2 ? 36 : -36), cz = f.z + (qi < 2 ? -36 : 36), ripe = gwRipe(GW_CROP[k], m), col = GW_COL[k];
var all = [];
for (var i = 0; i < per; i++) {
var x = cx + (R() - 0.5) * 64, z = cz + (R() - 0.5) * 64, y = gwHeight(x, z), h = 0.9 + R() * 0.3;
var cm = GW_CROP[k].m, last = cm[cm.length - 1], stub = !ripe && (m > last || m < 3);
gwI("tuft", x, y, z, stub ? 0.8 : 0.42, stub ? 0.24 : ripe ? h : h * Math.min(1, 0.4 + 0.15 * (m - 2)), stub ? 0.8 : 0.42, R() * 6, ripe ? new THREE.Color(col).offsetHSL(0, 0, (R() - 0.5) * 0.06).getHex() : stub ? new THREE.Color(0xC8B070).offsetHSL(0, 0, (R() - 0.5) * 0.08).getHex() : 0x7A9A4A);
all.push({ h: gwI("stalk", x, y + h * 0.8, z, 0.08, 0.28, 0.08, 0, col), x: x, z: z });
}
var cm2 = GW_CROP[k].m;
if (!ripe && (m > cm2[cm2.length - 1] || m < 3))
for (var sx = -3; sx <= 3; sx++)
for (var sz = -3; sz <= 3; sz += 1.5) {
var kx = cx + sx * 8.5 + (R() - 0.5) * 2, kz = cz + sz * 8.5 + (sx % 2 ? 4 : 0) + (R() - 0.5) * 2, ky = gwHeight(kx, kz);
for (var sh = 0; sh < 8; sh++) {
var a = sh / 8 * 6.283;
gwI("tuft", kx + Math.cos(a) * 0.45, ky, kz + Math.sin(a) * 0.45, 0.9, 1.7, 0.9, a, new THREE.Color(col).offsetHSL(0, -0.1, (R() - 0.6) * 0.08).getHex());
}
}
[[0, -30], [0, 30], [-30, 0], [30, 0]].forEach(function (e) {
var nx = cx + e[0], nz = cz + e[1], hs = all.filter(function (q) { return Math.hypot(q.x - nx, q.z - nz) < 9; }).map(function (q) { return q.h; });
gwNode({ crop: k, x: nx, z: nz, r: 4, hs: hs, label: "the " + GW_CROP[k].n.toLowerCase() + " field" });
});
GW.grain.push({ k: k, all: all });
gwPost(G, cx + (qi % 2 ? -31 : 31), cz + (qi < 2 ? 31 : -31), ["The " + GW_CROP[k].n + " field", "cut " + gwMonthsText(GW_CROP[k])], 0, 2.4, 0.8);
});
var w = GW_SITE.mill, F = gwFrame(G, w.x, w.z, gwFaceRot(w.x, w.z, 0, 8)), wall = gwM(0xD8D0C0);
F.floor(9, 9, gwM(0x8A7A5A));
for (var s = 0; s < 8; s++) {
var a = s / 8 * 6.283, cx2 = Math.sin(a) * 4.4, cz2 = Math.cos(a) * 4.4;
if (s === 0) {
F.box(3.64, 9.6, 0.35, wall, 0, 7.2, 4.4);
F.box(1.0, 2.4, 0.35, wall, -1.32, 1.2, 4.4);
F.box(1.0, 2.4, 0.35, wall, 1.32, 1.2, 4.4);
}
else
F.box(3.64, 12, 0.35, wall, cx2, 6, cz2).rotation.y = a;
}
for (var sa = 0; sa < 40; sa++) {
var a6 = sa / 40 * 6.283;
if (Math.abs(Math.atan2(Math.sin(a6), Math.cos(a6))) < 0.2)
continue;
var pp6 = F.at(Math.sin(a6) * 4.5, Math.cos(a6) * 4.5);
GW.solids.push({ x: pp6.x, z: pp6.z, r: 0.3 });
}
var cap = wCone(5.6, 4, gwM(0x5A3A2A), 0, 14, 0, F.g, 8);
var ring = wCyl(5.2, 5.2, 0.6, gwM(0x5A4030), 0, 12.1, 0, F.g, 8);
var sails = new THREE.Group();
sails.position.set(0, 12.5, 5.4);
sails.userData.keep = 1;
F.g.add(sails);
wCyl(0.5, 0.5, 1, gwM(0x5A4030), 0, 0, 0, sails).rotation.x = Math.PI / 2;
for (var k2 = 0; k2 < 4; k2++) {
var arm = new THREE.Group();
arm.rotation.z = k2 * Math.PI / 2;
sails.add(arm);
wBox(0.3, 9, 0.2, gwM(0x6A4A2E), 0, 4.6, 0, arm);
wBox(1.8, 7, 0.06, gwM(0xE8E0CC), 0.95, 5.2, 0, arm);
}
GW.spin.push({ o: sails, ax: "z", sp: 0.5, wind: 1 });
F.room("the Windmill", -4, -4, 4, 4);
wCyl(1.3, 1.3, 0.45, gwM(0x9A9488), 0, 0.35, -0.8, F.g, 16);
wCyl(1.3, 1.3, 0.35, gwM(0x8A8478), 0, 0.75, -0.8, F.g, 16);
wBox(0.2, 2.4, 0.2, gwM(0x5A4030), 0, 1.6, -0.8, F.g);
F.ring(0, -0.8, 1.4);
for (var sk = 0; sk < 5; sk++)
F.box(0.6, 0.8, 0.45, gwM(0xE8DCC0), -2.6 + sk * 0.3, 0.4, 1.8 + ((sk % 2) * 0.4));
var mp = F.at(0, 1);
gwSpot(mp.x, mp.z, 2.4, "The millstones", "grind flour or roll oats", function () { gwMakeCard("mill"); });
GW.lessonAt.mill = F.at(1, 8);
var lp = GW.lessonAt.mill;
gwLectern(G, lp.x, lp.z, gwFaceRot(lp.x, lp.z, 0, 8), "Grain, the first harvest");
},
function (G) {
var wall = gwM(0x8A3A2A), plank = gwM(0x6A4A30), floor = gwM(0x8A7A5A), R = wRand(6601);
var F = gwFrame(G, -164, 30, Math.PI / 2);
F.floor(34, 18, floor);
F.wallX(9, -17, 17, 7, wall, [[0, 5, 4.6]]);
F.wallX(-9, -17, 17, 7, wall, []);
F.wallZ(-17, -9, 9, 7, wall, []);
F.wallZ(17, -9, 9, 7, wall, [[0, 2.4]]);
F.roof(34.6, 18.6, 7, 5, gwM(0x4A4A50), wall);
var sg = wSign(["THE GREAT BARN"], 4, 0.7, "#3A1E14", "#F0E2B8");
sg.position.set(0, 5.6, 9.16);
F.g.add(sg);
F.room("the threshing floor", -6, -9, 6, 9);
F.room("the cattle stalls", -17, -9, -6, -1);
F.room("the hay bay", -17, 1, -6, 9);
F.room("the feed room", 6, -9, 12, -1);
F.room("the tack room", 12, -9, 17, -1, true);
F.room("the cart bay", 6, 1, 17, 9);
for (var s = 0; s < 4; s++) {
var sx = -16 + s * 2.6;
F.box(0.12, 1.3, 6, plank, sx + 2.5, 0.65, -5, true);
F.box(2.4, 0.4, 0.5, gwM(0x9A8A6A), sx + 1.2, 0.3, -8.4);
}
F.box(11, 1.3, 0.12, plank, -11.5, 0.65, -1.5, true);
for (var hb = 0; hb < 10; hb++) {
F.box(1.6, 1, 1.1, gwM(0xD8B45A), -15.5 + (hb % 5) * 2, 0.5 + Math.floor(hb / 5), 6.5);
}
F.solid(-11.5, 6.5, 5, 0.8);
F.wallZ(6, -9, -1, 3, plank, [[-5, 1.4]], 0.15);
F.wallZ(12, -9, -1, 3, plank, [[-5, 1.2, 2.3]], 0.15);
F.wallX(-1, 6, 17, 3, plank, [[9, 1.4]], 0.15);
F.badgeDoor(12, -5, 1.2, false);
for (var fs = 0; fs < 6; fs++)
F.box(0.8, 0.9, 0.6, gwM(0xE8DCC0), 7.4 + (fs % 3) * 1.1, 0.45, -8 + Math.floor(fs / 3) * 0.8);
F.box(3, 0.8, 1.4, gwM(0x6A4A2E), 13, 0.4, 5, true);
[-1, 1].forEach(function (k) { wCyl(0.7, 0.7, 0.12, gwM(0x3A2A1E), 13 + k * 1.2, 0.7, 5.75, F.g, 12).rotation.x = Math.PI / 2; });
for (var tk = 0; tk < 4; tk++)
F.box(0.5, 0.6, 0.2, gwM(0x5A3A1E), 13.5 + tk * 0.8, 1.6, -8.8);
for (var bm = -15; bm <= 15; bm += 5)
F.box(0.3, 0.3, 18, plank, bm, 6.8, 0);
F.box(1.6, 1.4, 1.2, gwM(0x7A5230), 2.5, 0.7, -6.5, true);
var fan = wCyl(0.6, 0.6, 0.1, gwM(0x5A3A1E), 3.35, 1.0, -6.5, F.g, 8);
fan.rotation.z = Math.PI / 2;
F.box(0.9, 0.5, 0.9, gwM(0x6A4A2E), 2.5, 1.65, -6.5);
for (var sk = 0; sk < 8; sk++)
F.box(0.55, 0.75, 0.4, gwM(sk % 2 ? 0xD8C8A0 : 0xC8B890), -4.6 + (sk % 4) * 0.6, 0.38 + Math.floor(sk / 4) * 0.0, -7.6 - Math.floor(sk / 4) * 0.5);
F.solid(-3.7, -7.9, 1.3, 0.6);
for (var fl = 0; fl < 5; fl++) {
F.box(0.05, 1.8, 0.05, gwM(0x8A6A44), -5 + fl * 0.6, 1.7, -8.85);
if (fl % 2)
F.box(0.4, 0.06, 0.06, gwM(0x6A5034), -5 + fl * 0.6, 2.6, -8.85);
}
F.box(2.2, 0.15, 3.6, gwM(0x8A6A44), 2.5, 0.9, 4.5, true);
F.box(2.2, 0.6, 0.08, gwM(0x7A5A3A), 2.5, 1.25, 2.7);
F.box(2.2, 0.6, 0.08, gwM(0x7A5A3A), 2.5, 1.25, 6.3);
F.box(0.08, 0.6, 3.6, gwM(0x7A5A3A), 1.4, 1.25, 4.5);
F.box(0.08, 0.6, 3.6, gwM(0x7A5A3A), 3.6, 1.25, 4.5);
[[1.3, 3.3], [3.7, 3.3], [1.3, 5.7], [3.7, 5.7]].forEach(function (q) { var wh = wCyl(0.55, 0.55, 0.1, gwM(0x5A3A1E), q[0], 0.55, q[1], F.g, 12); wh.rotation.z = Math.PI / 2; });
for (var hl = 0; hl < 6; hl++)
F.box(1.1, 0.35, 0.7, gwM(0xD8B45A), 2.5 + (hl % 2) * 0.5 - 0.25, 1.2 + Math.floor(hl / 2) * 0.35, 4.5 + (hl % 3 - 1) * 0.9);
[[-3, 0], [3, 0], [0, -6], [0, 6]].forEach(function (q) { F.box(0.03, 1.4, 0.03, gwM(0x2A2A2A), q[0], 5.8, q[1]); F.box(0.3, 0.4, 0.3, gwM(0x3A3A3A), q[0], 4.9, q[1]); wSph(0.1, gwBasic(0xD8B880), q[0], 4.9, q[1], F.g, 8); });
GW.lessonAt.barn = F.at(-3, 5);
var lb = GW.lessonAt.barn;
gwLectern(G, lb.x, lb.z, Math.PI / 2, "The animals of the farm");
GW.barnStalls = [F.at(-14.8, -6), F.at(-12.2, -6), F.at(-9.6, -6)];
var D = gwFrame(G, -120, 74, Math.PI), dw = gwM(0xE8E0D0);
D.floor(16, 10, gwM(0xA8A8A0));
D.wallX(5, -8, 8, 3.4, dw, [[-3, 1.8]]);
D.wallX(-5, -8, 8, 3.4, dw);
D.wallZ(-8, -5, 5, 3.4, dw);
D.wallZ(8, -5, 5, 3.4, dw);
D.wallZ(2, -5, 5, 3, dw, [[3, 1.4]], 0.15);
D.wallX(0, 2, 8, 3, dw, [[5, 1.2, 2.3]], 0.15);
D.badgeDoor(5, 0, 1.2, true);
D.roof(16.4, 10.4, 3.4, 2.4, gwM(0x5A5A60), dw);
var dsg = wSign(["THE DAIRY"], 3, 0.6, "#22361E", "#F0E8C8");
dsg.position.set(-3, 2.9, 5.16);
D.g.add(dsg);
D.room("the milking parlour", -8, -5, 2, 5);
D.room("the cool room", 2, 0, 8, 5);
D.room("the cheese room", 2, -5, 8, 0, true);
for (var st = 0; st < 3; st++) {
D.box(0.1, 1.2, 3, gwM(0x9AA0A8), -7 + st * 3, 0.6, -2.5, true);
}
D.box(1, 1.2, 1, gwM(0xC8CCD2), 4.5, 0.6, 3, true);
D.box(3, 0.9, 0.8, gwM(0xC8CCD2), 5.5, 0.45, 4.4, true);
gwShelves(D, 7.6, -2.5, 4, false, [0xE8C860, 0xF0D880, 0xD8B850], 2.2);
for (var ch = 0; ch < 4; ch++) {
wCyl(0.22, 0.26, 0.75, gwM(0xC8CCD2), -7.4 + ch * 0.55, 0.38, 4.4, D.g, 12);
wCyl(0.12, 0.12, 0.12, gwM(0xA8ACB2), -7.4 + ch * 0.55, 0.8, 4.4, D.g, 10);
}
[[-5.5, -0.4], [-2.5, -0.4]].forEach(function (q) { wCyl(0.16, 0.13, 0.28, gwM(0xA8ACB2), q[0] + 0.5, 0.14, q[1], D.g, 10); wCyl(0.18, 0.18, 0.05, gwM(0x6A4A2E), q[0] - 0.4, 0.35, q[1], D.g, 10); [-1, 1].forEach(function (k) { D.box(0.04, 0.33, 0.04, gwM(0x6A4A2E), q[0] - 0.4 + k * 0.1, 0.17, q[1]); }); });
wCyl(0.35, 0.35, 0.12, gwM(0x3A5A3A), -7.85, 1.4, 0, D.g, 12).rotation.z = Math.PI / 2;
D.box(0.9, 1.4, 0.7, gwM(0x6A4A2E), 6.8, 0.7, -1.4, true);
wCyl(0.25, 0.25, 0.3, gwM(0xE8C860), 6.8, 1.55, -1.4, D.g, 12);
GW.parlour = [D.at(-5.5, -2.5), D.at(-2.5, -2.5)];
var dp = D.at(-4, 1);
gwNode({ crop: "milk", x: dp.x, z: dp.z, r: 3, label: "the milking parlour" });
var dc = D.at(5, 2.5);
gwSpot(dc.x, dc.z, 2.2, "The dairy bench", "churn butter or make cheese", function () { gwMakeCard("dairy"); });
var gp = gwFrame(G, -96, 96, Math.PI / 2);
gp.floor(5, 4, plank);
gp.wallX(-2, -2.5, 2.5, 2.2, plank);
gp.wallZ(-2.5, -2, 2, 2.2, plank);
gp.wallZ(2.5, -2, 2, 2.2, plank);
gp.roof(5.4, 4.4, 2.2, 0.8, gwM(0x5A5A60));
gwFence(G, -96 + 6, 96, 10, 8);
var gpp = gp.at(0, 3);
gwNode({ crop: "goatmilk", x: gpp.x, z: gpp.z, r: 3, label: "the goat shed" });
GW.goatPen = { x: -90, z: 96, hw: 4, hd: 3 };
var H = gwFrame(G, -100, 14, -Math.PI / 2);
H.floor(6, 4, plank);
H.wallX(2, -3, 3, 2.4, plank, [[0, 1.2]]);
H.wallX(-2, -3, 3, 2.4, plank);
H.wallZ(-3, -2, 2, 2.4, plank);
H.wallZ(3, -2, 2, 2.4, plank);
H.roof(6.4, 4.4, 2.4, 1, gwM(0x5A3A2A), plank);
H.room("the hen house", -3, -2, 3, 2);
for (var nb = 0; nb < 5; nb++) {
H.box(0.8, 0.6, 0.6, gwM(0x8A6A44), -2 + nb, 0.9, -1.6);
H.box(0.6, 0.12, 0.45, gwM(0xD8B45A), -2 + nb, 1.15, -1.6);
}
var ehs = [];
for (var e = 0; e < 5; e++) {
var ep = H.at(-2 + e, -1.6);
ehs.push(gwI("fruit", ep.x, H.y + 1.28, ep.z, 0.08, 0.1, 0.08, 0, 0xEDE2CC));
}
var hp = H.at(0, 0);
gwNode({ crop: "eggs", x: hp.x, z: hp.z, r: 2.6, hs: ehs, label: "the nest boxes" });
gwFence(G, -100 - 8, 14, 10, 10);
GW.henRun = { x: -108, z: 14, hw: 4.5, hd: 4.5 };
var W = gwFrame(G, -196, 86, Math.PI / 2);
W.floor(14, 9, plank);
W.wallX(4.5, -7, 7, 3.4, plank, [[0, 2.2]]);
W.wallX(-4.5, -7, 7, 3.4, plank);
W.wallZ(-7, -4.5, 4.5, 3.4, plank, [[0, 2]]);
W.wallZ(7, -4.5, 4.5, 3.4, plank);
W.roof(14.4, 9.4, 3.4, 2.2, gwM(0x5A5A60), plank);
W.room("the Wool Shed", -7, -4.5, 7, 4.5);
var wsg = wSign(["THE WOOL SHED"], 3, 0.6, "#2A1E14", "#F0E2B8");
wsg.position.set(0, 2.9, 4.66);
W.g.add(wsg);
W.box(4, 0.2, 3, gwM(0x9A8A6A), -3, 0.1, -1);
W.box(2.4, 0.9, 1.4, gwM(0x6A4A2E), 3, 0.45, -2.5, true);
for (var fl = 0; fl < 4; fl++)
W.box(0.8, 0.4, 0.6, gwM(0xE8E2D2), 2.2 + (fl % 2) * 0.9, 1.1, -2.8 + Math.floor(fl / 2) * 0.6);
var wh = wCyl(0.5, 0.5, 0.06, gwM(0x7A5434), 5, 1.0, 2, W.g, 16);
wh.rotation.z = Math.PI / 2;
W.box(0.6, 0.5, 0.4, gwM(0x6A4A2E), 5, 0.25, 2.4);
var wn = W.at(-3, -1);
gwNode({ crop: "wool", x: wn.x, z: wn.z, r: 3, label: "the shearing board" });
var wsp = W.at(4.4, 1.4);
gwSpot(wsp.x, wsp.z, 2, "The spinning wheel", "spin yarn", function () { gwMakeCard("wool"); });
var p = GW_SITE.pasture;
gwFence(G, p.x, p.z - 18, 62, 30);
gwFence(G, p.x, p.z + 18, 62, 30);
GW.cowField = { x: p.x, z: p.z - 18, hw: 28, hd: 12 };
GW.sheepField = { x: p.x, z: p.z + 18, hw: 28, hd: 12 };
wBox(3, 0.6, 1, gwM(0x6A6A70), p.x + 20, gwHeight(p.x + 20, p.z - 14) + 0.3, p.z - 14, G);
GW.solids.push({ x: p.x + 20, z: p.z - 14, hw: 1.5, hd: 0.5 });
for (var hb2 = 0; hb2 < 4; hb2++) {
var bx = p.x - 24 + hb2 * 3, bz = p.z + 4;
var bl = wCyl(0.8, 0.8, 1.4, gwM(0xD8B45A), bx, gwHeight(bx, bz) + 0.8, bz, G, 12);
bl.rotation.z = Math.PI / 2;
GW.solids.push({ x: bx, z: bz, r: 0.9 });
}
gwPost(G, -128, 62, ["The Farmstead", "the Great Barn · the Dairy · the hen house", "the Wool Shed · the pastures"], Math.PI / 2, 3, 1.1);
},
function (G, x, z, w, d) {
var y0 = gwHeight(x, z), wood = gwM(0x7A5A3A);
function run(x1, z1, x2, z2, gap) {
var L = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.round(L / 2.5)), a = Math.atan2(x2 - x1, z2 - z1);
for (var i = 0; i <= n; i++) {
var t = i / n, px = x1 + (x2 - x1) * t, pz = z1 + (z2 - z1) * t;
if (gap && Math.abs(t - 0.5) * L < 1.4)
continue;
wBox(0.12, 1.2, 0.12, wood, px, gwHeight(px, pz) + 0.6, pz, G);
}
for (var j = 0; j < n; j++) {
var t1 = j / n, t2 = (j + 1) / n, mx = x1 + (x2 - x1) * (t1 + t2) / 2, mz = z1 + (z2 - z1) * (t1 + t2) / 2;
if (gap && Math.abs((t1 + t2) / 2 - 0.5) * L < 1.4)
continue;
[0.5, 1.0].forEach(function (hh) { var r = wBox(0.06, 0.1, L / n, wood, mx, gwHeight(mx, mz) + hh, mz, G); r.rotation.y = a; });
GW.solids.push({ x: mx, z: mz, hw: 0.1, hd: L / n / 2, rot: a });
}
}
run(x - w / 2, z - d / 2, x + w / 2, z - d / 2);
run(x + w / 2, z - d / 2, x + w / 2, z + d / 2);
run(x + w / 2, z + d / 2, x - w / 2, z + d / 2, true);
run(x - w / 2, z + d / 2, x - w / 2, z - d / 2);
},
function (G) {
var a = GW_SITE.apiary, R = wRand(7701);
GW.hives = [];
for (var i = 0; i < 8; i++) {
var x = a.x - 16 + (i % 4) * 4.2, z = a.z + 4 + Math.floor(i / 4) * 5, y = gwHeight(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = Math.PI;
G.add(g);
wBox(0.7, 0.35, 0.7, gwM(0x6A5A44), 0, 0.18, 0, g);
for (var b = 0; b < 3; b++)
wBox(0.6, 0.3, 0.6, gwM([0xF0E8D0, 0xE8DCB8, 0xDCD8C8][b]), 0, 0.5 + b * 0.31, 0, g);
wBox(0.72, 0.08, 0.72, gwM(0x6A6A70), 0, 1.0, 0, g);
wBox(0.3, 0.03, 0.08, gwBasic(0x2A1E10), 0, 0.38, 0.31, g);
GW.solids.push({ x: x, z: z, r: 0.5 });
GW.hives.push({ x: x, y: y, z: z });
var hs = [gwI("box", x, y + 1.06, z, 0.2, 0.08, 0.2, 0, GW_COL.honey)];
gwNode({ crop: "honey", x: x, z: z, r: 1.6, hs: hs, label: "a beehive" });
}
for (var f = 0; f < (GW_LITE ? 120 : 420); f++) {
var fx = a.x - 34 + R() * 44, fz = a.z - 12 + R() * 40;
if (Math.hypot(fx - (a.x - 10), fz - (a.z + 6)) < 9)
continue;
if (Math.hypot(fx + 50, fz - 170) < 8)
continue;
gwI("bloom", fx, gwHeight(fx, fz) + 0.25 + R() * 0.2, fz, 0.16, 0.16, 0.16, R() * 3, [0xE8D84A, 0xB89AE0, 0xE84A6A, 0xF4F0E0, 0x6A8AE8, 0xF0A040][f % 6]);
}
gwBench(gwFrame(G, a.x - 10, a.z - 3, 0), 0, 0, 2.4, true);
GW.lessonAt.apiary = { x: a.x - 3, z: a.z - 4 };
gwLectern(G, a.x - 3, a.z - 4, 0, "Bees and pollination");
var F = gwFrame(G, -48, 166, gwFaceRot(-48, 166, 0, 92)), wall = gwM(0xE8D8B0);
F.floor(10, 7, gwM(0x9A8A6A));
F.wallX(3.5, -5, 5, 3, wall, [[0, 1.6]]);
F.wallX(-3.5, -5, 5, 3, wall);
F.wallZ(-5, -3.5, 3.5, 3, wall);
F.wallZ(5, -3.5, 3.5, 3, wall);
F.wallZ(1, -3.5, 3.5, 2.8, wall, [[0, 1.4]], 0.15);
F.roof(10.4, 7.4, 3, 1.8, gwM(0x6A3A2A), wall);
F.room("the extracting room", -5, -3.5, 1, 3.5);
F.room("the bottling room", 1, -3.5, 5, 3.5);
var sg = wSign(["THE HONEY HOUSE"], 3, 0.6, "#3A2A10", "#F8E8B8");
sg.position.set(0, 2.5, 3.66);
F.g.add(sg);
var ex = new THREE.Group();
ex.position.set(-2.6, 0, -1.6);
ex.userData.keep = 1;
F.g.add(ex);
wCyl(0.7, 0.7, 1.1, gwM(0xC8CCD2), 0, 0.65, 0, ex, 16);
var crank = wBox(0.6, 0.06, 0.06, gwM(0x3A3A3E), 0, 1.3, 0, ex);
GW.spin.push({ o: crank, ax: "y", sp: 0.6 });
F.ring(-2.6, -1.6, 0.8);
F.box(1.6, 0.9, 0.7, gwM(0x8A6A44), -2.6, 0.45, 1.9, true);
F.box(1.2, 0.05, 0.5, gwM(0xE8D070), -2.6, 0.92, 1.9);
gwShelves(F, 4.6, 0, 6, false, [0xE0A020, 0xD89018, 0xE8B030], 2.2);
var cp = F.at(-2.6, 1.2);
gwNode({ crop: "beeswax", x: cp.x, z: cp.z, r: 2, hs: [], label: "the cappings tray", inside: 1 });
var mk = F.at(2.6, 0);
gwSpot(mk.x, mk.z, 2, "The wax melter and the stove", "dip candles or boil maple syrup", function () { gwMakeCard("honey"); });
},
function (G) {
var w = GW_SITE.woods, R = wRand(8801);
[[-26, 14], [-34, 4], [-20, 26], [-40, 20]].forEach(function (q) { var x = w.x + q[0], z = w.z + q[1]; var T = gwTree(x, z, { s: 1.5, crown: 3, leaf: 0x3E6A2E, fruit: GW_COL.walnuts, fs: 0.12, n: 12, R: R }); gwNode({ crop: "walnuts", x: x, z: z, r: 3.4, hs: T.fruit, tree: T, label: "a walnut tree" }); });
[[-6, 24], [0, 30], [6, 22], [-2, 16], [10, 30], [14, 18]].forEach(function (q) {
var x = w.x + q[0], z = w.z + q[1];
var hs = [];
for (var s = 0; s < 5; s++) {
var a = s * 1.256;
gwI("stalk", x + Math.cos(a) * 0.4, gwHeight(x, z), z + Math.sin(a) * 0.4, 0.06, 3.2, 0.06, 0, 0x6A5A3A);
}
gwI("ball", x, gwHeight(x, z) + 2.6, z, 2.6, 2.2, 2.6, R() * 6, 0x4A7A32);
for (var n = 0; n < 6; n++)
hs.push(gwI("fruit", x + (R() - 0.5) * 1.8, gwHeight(x, z) + 1.8 + R() * 1.2, z + (R() - 0.5) * 1.8, 0.07, 0.07, 0.07, 0, GW_COL.hazelnuts));
GW.solids.push({ x: x, z: z, r: 0.6 });
gwNode({ crop: "hazelnuts", x: x, z: z, r: 2.4, hs: hs, label: "the hazel coppice" });
});
[[24, -6], [34, 6], [20, -18], [38, -14]].forEach(function (q) { var x = w.x + q[0], z = w.z + q[1]; var T = gwTree(x, z, { s: 1.6, crown: 3.2, leaf: 0x3A6A2A, fruit: 0x7A8A3A, fs: 0.18, n: 12, R: R }); gwNode({ crop: "chestnuts", x: x, z: z, r: 3.4, hs: T.fruit, tree: T, label: "a sweet chestnut tree" }); });
[[-4, -8], [2, -12], [8, -6]].forEach(function (q) {
var x = w.x + q[0], z = w.z + q[1], y = gwHeight(x, z), hs = [];
for (var l = 0; l < 4; l++) {
var lg = wCyl(0.22, 0.22, 2.4, gwM(0x5A4632), x, y + 0.25 + l * 0.32, z + (l % 2 ? 0.2 : -0.2), G, 8);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = l % 2 ? 0.3 : -0.3;
}
for (var m = 0; m < 10; m++) {
hs.push(gwI("fruit", x + (R() - 0.5) * 2, y + 0.3 + R() * 1.0, z + (R() > 0.5 ? 0.42 : -0.42), 0.12, 0.06, 0.12, 0, 0xC8A880));
}
GW.solids.push({ x: x, z: z, hw: 1.3, hd: 0.6 });
gwNode({ crop: "mushrooms", x: x, z: z, r: 2.6, hs: hs, label: "the mushroom logs" });
});
[[22, 22], [28, 30], [16, 32], [32, 20]].forEach(function (q) {
var x = w.x + q[0], z = w.z + q[1], y = gwHeight(x, z);
gwI("ball", x, y + 1.6, z, 3, 2.6, 3, R() * 6, 0x4A7A3A);
var fl = [], be = [];
for (var n = 0; n < 8; n++) {
var px = x + (R() - 0.5) * 2.4, py = y + 1.6 + R() * 1.2, pz = z + (R() - 0.5) * 2.4;
fl.push(gwI("bloom", px, py, pz, 0.3, 0.12, 0.3, 0, 0xF4F0E0));
be.push(gwI("fruit", px, py - 0.1, pz, 0.12, 0.12, 0.12, 0, 0x2A1A2A));
}
GW.solids.push({ x: x, z: z, r: 0.8 });
gwNode({ crops: ["elderflowers", "elderberries"], crop: "elderflowers", hsBy: { elderflowers: fl, elderberries: be }, x: x, z: z, r: 2.6, hs: fl.concat(be), label: "an elder bush" });
});
[[-20, -26], [-8, -32], [4, -28], [-30, -36]].forEach(function (q) {
var x = w.x + q[0], z = w.z + q[1], y = gwHeight(x, z);
var T = gwTree(x, z, { s: 1.5, crown: 3, leaf: 0x4A7A2E, R: R });
wCyl(0.18, 0.16, 0.3, gwM(0x9AA0A8), x + 0.75, y + 1.0, z, G, 8);
var hs = [gwI("box", x + 0.75, y + 1.12, z, 0.24, 0.04, 0.24, 0, 0xC89040)];
gwNode({ crop: "maplesap", x: x, z: z, r: 2.6, hs: hs, tree: T, label: "a tapped sugar maple" });
});
gwPost(G, w.x + 8, w.z + 40, ["The Old Wood", "walnuts · hazels · chestnuts · mushroom logs", "elder · sugar maples"], 0, 3.2, 1.1);
},
function (G) {
var c = GW_SITE.cutting, R = wRand(9901), rows = ["sunflowers", "roses", "tulips", "daffodils", "dahlias", "sweetpeas", "chrysanthemums", "hellebores"];
rows.forEach(function (k, i) { gwBed(c.x, c.z - 16 + i * 4.4, 26, 0, k, { R: R, label: "a row of " + GW_CROP[k].n.toLowerCase(), step: k === "sunflowers" ? 1.1 : 0.8 }); });
gwPost(G, c.x - 17, c.z - 20, ["The Cutting Garden", "flowers for the city's florists"], gwFaceRot(c.x - 17, c.z - 20, 0, 150), 3, 0.8);
var p = GW_SITE.pond, y = gwHeight(p.x, p.z) + 0.0;
var water = wCyl(p.r - 3.2, p.r - 3.2, 0.1, new THREE.MeshPhongMaterial({ color: 0x3A6A6A, shininess: 70, specular: 0x7A9A9A, transparent: true, opacity: 0.9 }), p.x, gwRaw(p.x, p.z) - 0.25, p.z, G, 28);
water.userData.keep = 1;
water.position.y = gwSiteY("pond") - 0.3;
GW.pond = water;
for (var l = 0; l < (GW_LITE ? 10 : 24); l++) {
var a = R() * 6.283, d = R() * (p.r - 5);
gwI("leafy", p.x + Math.cos(a) * d, water.position.y + 0.08, p.z + Math.sin(a) * d, 0.9, 0.03, 0.9, R() * 6, 0x3A7A3A);
if (l % 3 === 0)
gwI("bloom", p.x + Math.cos(a) * d, water.position.y + 0.16, p.z + Math.sin(a) * d, 0.25, 0.15, 0.25, 0, 0xF4D8E8);
}
for (var r = 0; r < 40; r++) {
var a2 = r / 40 * 6.283 + R() * 0.1, d2 = p.r - 3 + R() * 1.5;
gwI("tuft", p.x + Math.cos(a2) * d2, gwHeight(p.x + Math.cos(a2) * d2, p.z + Math.sin(a2) * d2), p.z + Math.sin(a2) * d2, 0.25, 1.4 + R() * 0.6, 0.25, R() * 6, 0x6A8A4A);
}
GW.solids.push({ x: p.x, z: p.z, r: p.r - 3.4 });
gwPost(G, p.x + 13, p.z + 6, ["The Lily Pond"], gwFaceRot(p.x + 13, p.z + 6, 0, 8), 2, 0.6);
},
function (G) {
var R = wRand(1111), n = GW_LITE ? 90 : 240;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = i < n * 0.7 ? 300 + R() * 150 : 60 + R() * 260, x = Math.cos(a) * d, z = Math.sin(a) * d;
if (gwSiteAt(x, z) || gwPathDist(x, z) < 5)
continue;
var pine = R() < 0.3, s = 0.9 + R() * 0.9, y = gwHeight(x, z);
if (pine) {
gwI("trunk", x, y, z, 0.4 * s, 2 * s, 0.4 * s, 0, 0x4A3020);
gwI("pine", x, y + 1.5 * s, z, 3.6 * s, 7 * s, 3.6 * s, R() * 6, 0x2E5A34);
GW.solids.push({ x: x, z: z, r: 0.35 * s });
}
else
gwTree(x, z, { s: s * 1.2, crown: 2.6, leaf: [0x4A7A32, 0x3E6E2E, 0x557E36][i % 3], R: R, wild: 1 });
}
},
function (G) {
GW_PEOPLE.forEach(function (p, i) {
var at = p.at === "teacher" ? GW.teacherAt : p.at ? GW.lessonAt[p.at] : { x: p.x, z: p.z };
if (!at)
return;
if (p.at === "seedlib") {
at = { x: at.x + 1.4, z: at.z - 1 };
}
if (p.at === "kitchen") {
at = { x: at.x + 2, z: at.z + 1.2 };
}
var g = null;
if (p.k === "mother")
try {
g = build({ id: "gw_mother", archetype: "deity", deity: "gaia", attrs: {}, nights: [], city: true, solid: false, detail: 3, name: p.name, label: p.name });
}
catch (e) {
g = null;
}
if (!g)
try {
g = wPerson("gw_" + p.k, { title: p.title || "gardener", place: "the Greenwold", sex: p.sex, look: p.look });
}
catch (e) {
return;
}
g.position.set(at.x, gwFloorY(at.x, at.z), at.z);
g.rotation.y = p.face ? gwFaceRot(at.x, at.z, p.face[0], p.face[1]) : Math.random() * 6;
G.add(g);
var P = { g: g, def: p, wander: p.wander ? { r: p.wander, sp: 0.7 } : null };
if (p.k === "mother")
gwMotherDress(G, g, P);
GW.people.push(P);
GW.talk.push({ p: P, r: 3.4, name: p.name, t: { name: p.name, persona: p.persona + GW_SAFE, greet: p.greet } });
});
if (!GW_LITE)
GW_WALKERS.forEach(function (w, i) {
var s = GW_SITE[w[1]];
if (!s)
return;
var g;
try {
g = wPerson("gw_walk_" + i, { title: w[0], place: "the Greenwold" });
}
catch (e) {
return;
}
var x = s.x + (i % 2 ? 6 : -6), z = s.z + ((i * 7) % 11) - 5;
g.position.set(x, gwHeight(x, z), z);
G.add(g);
GW.people.push({ g: g, wander: { r: w[2], sp: 0.9 } });
});
},
function (G, g, P) {
P.crown = false;
var halo = wGlow(0xD8F0C0, 3.2, 0.22);
halo.position.set(g.position.x, g.position.y + 1.3, g.position.z);
G.add(halo);
GW.mother = { g: g, halo: halo };
var sh = new THREE.Group();
sh.position.copy(g.position);
G.add(sh);
for (var i = 0; i < 28; i++) {
var a = i / 28 * 6.283, r = 1.1 + (i % 3) * 0.18;
gwI("leafy", g.position.x + Math.cos(a) * r, g.position.y + 0.05, g.position.z + Math.sin(a) * r, 0.22, 0.08, 0.22, a, 0x4A8A3A);
gwI("bloom", g.position.x + Math.cos(a) * r, g.position.y + 0.16, g.position.z + Math.sin(a) * r, 0.09, 0.09, 0.09, a, [0xE8A0B8, 0xF0D860, 0xB8A0E0, 0xF4F0E0][i % 4]);
}
},
function () {
GW.people.forEach(function (P) {
if (!P.crown || P.crowned)
return;
var hb = null;
P.g.traverse(function (o) { if (!hb && o.isBone && /^head$/i.test(o.name))
hb = o; });
if (!hb)
return;
P.crowned = 1;
var k = P.g.getWorldScale(new THREE.Vector3()).y / Math.max(0.001, hb.getWorldScale(new THREE.Vector3()).y), c = new THREE.Group();
for (var i = 0; i < 12; i++) {
var a = i / 12 * 6.283, l = wBox(0.09, 0.03, 0.16, wM(i % 3 ? 0x4A8A3A : 0x6AA84A), Math.cos(a) * 0.12, 0.17, Math.sin(a) * 0.12, c);
l.rotation.y = -a;
l.rotation.x = 0.5;
if (i % 3 === 0)
wSph(0.03, wM([0xF0D860, 0xE8A0B8, 0xF4F0E0][i / 3 % 3]), Math.cos(a) * 0.13, 0.2, Math.sin(a) * 0.13, c, 6);
}
c.scale.setScalar(k);
hb.add(c);
});
},
function (G, kind, i, pen, s) {
var a;
try {
a = build({ id: "gw_" + kind + "_" + i, archetype: kind, attrs: { s: s || 1 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
}
catch (e) {
return null;
}
var R = wRand(4000 + i * 31 + kind.length), x = pen.x + (R() - 0.5) * pen.hw * 1.6, z = pen.z + (R() - 0.5) * pen.hd * 1.6;
a.position.set(x, gwHeight(x, z), z);
a.rotation.y = R() * 6.283;
G.add(a);
var A = { g: a, kind: kind, pen: pen, sp: kind === "chicken" ? 0.6 : 0.35 };
GW.animals.push(A);
return A;
},
function (G) {
var n = GW_LITE ? 0.5 : 1, i;
for (i = 0; i < Math.round(6 * n); i++)
gwAnimal(G, "cow", i, GW.cowField, 1.1);
for (i = 0; i < Math.round(10 * n); i++)
gwAnimal(G, "sheep", i, GW.sheepField, 1.0);
for (i = 0; i < Math.round(4 * n); i++)
gwAnimal(G, "goat", i, GW.goatPen, 0.9);
for (i = 0; i < Math.round(8 * n); i++)
gwAnimal(G, "chicken", i, GW.henRun, 1.0);
var sty = { x: -136, z: -6, hw: 4, hd: 3 };
gwFence(G, sty.x, sty.z, 10, 8);
for (i = 0; i < Math.round(3 * n); i++)
gwAnimal(G, "pig", i, sty, 1.0);
var pad = { x: -196, z: 14, hw: 9, hd: 6 };
gwFence(G, pad.x, pad.z, 22, 16);
for (i = 0; i < 2; i++)
gwAnimal(G, "horse", i, pad, 1.1);
GW.talk.push({ x: GW.cowField.x, z: GW.cowField.z + 13, r: 4, name: "The cows' field", verb: "look", fn: function () { worldCard(worldFacts("The cows", "Buttercup, Clementine, Daisy and friends", [["Milk", "in the Dairy's parlour, all year"], ["Eat", "grass and hay; four stomach chambers"]], ["A dairy cow gives about 25 to 30 litres of milk a day.", "Cows chew the cud: they bring grass back up to chew again, which helps them digest it."])); } });
GW.talk.push({ x: GW.sheepField.x, z: GW.sheepField.z + 13, r: 4, name: "The sheep's field", verb: "look", fn: function () { worldCard(worldFacts("The sheep", "the Greenwold flock", [["Shearing", "late spring, once a year"], ["Wool", "to the Wool Shed: spin it into yarn"]], ["A sheep's fleece keeps growing all its life, so it must be shorn each year.", "One fleece can make about ten metres of yarn for every kilogram of wool."])); } });
},
function (dt) {
GW.animals.forEach(function (A) {
var g = A.g, u = A.u || (A.u = { tx: g.position.x, tz: g.position.z, w: Math.random() * 5 });
if (u.w > 0) {
u.w -= dt;
return;
}
var dx = u.tx - g.position.x, dz = u.tz - g.position.z, d = Math.hypot(dx, dz);
if (d < 0.25) {
u.w = 3 + Math.random() * 9;
u.tx = A.pen.x + (Math.random() - 0.5) * A.pen.hw * 1.8;
u.tz = A.pen.z + (Math.random() - 0.5) * A.pen.hd * 1.8;
return;
}
var st = Math.min(d, A.sp * dt);
g.position.x += dx / d * st;
g.position.z += dz / d * st;
g.rotation.y = Math.atan2(dx, dz);
g.position.y = gwHeight(g.position.x, g.position.z);
});
},
function (G) {
var bn = GW_LITE ? 40 : 120, bp = new Float32Array(bn * 3);
var bg = new THREE.BufferGeometry();
bg.setAttribute("position", new THREE.BufferAttribute(bp, 3));
GW.bees = new THREE.Points(bg, new THREE.PointsMaterial({ color: 0xE8B830, size: 0.09, sizeAttenuation: true }));
GW.bees.frustumCulled = false;
G.add(GW.bees);
GW.beeSeeds = [];
for (var i = 0; i < bn; i++) {
var h = GW.hives[i % GW.hives.length];
GW.beeSeeds.push({ h: h, a: Math.random() * 6.283, r: 2 + Math.random() * 12, sp: 0.3 + Math.random() * 0.5, yy: 0.6 + Math.random() * 1.5 });
}
GW.flies = [];
var fn = GW_LITE ? 8 : 24, cols = [0xF0C040, 0xF4F0E8, 0x8AB0E8, 0xE88A4A, 0xC8A0E8];
for (var f = 0; f < fn; f++) {
var s = [GW_SITE.apiary, GW_SITE.cutting, GW_SITE.heartwood, GW_SITE.physic, GW_SITE.garden][f % 5], b = new THREE.Group();
[-1, 1].forEach(function (sd) { var w = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.12), gwM(cols[f % 5], { ds: 1 })); w.position.x = sd * 0.08; var piv = new THREE.Group(); piv.add(w); b.add(piv); });
b.userData.keep = 1;
G.add(b);
GW.flies.push({ g: b, cx: s.x + (Math.random() - 0.5) * 20, cz: s.z + (Math.random() - 0.5) * 20, a: Math.random() * 6, r: 3 + Math.random() * 6, sp: 0.25 + Math.random() * 0.2, ph: Math.random() * 6 });
}
GW.glow = [];
var gn = GW_LITE ? 10 : 30;
for (var k = 0; k < gn; k++) {
var s2 = k % 2 ? GW_SITE.pond : GW_SITE.heartwood, sp = wGlow(0xD8F088, 0.5, 0);
sp.userData.keep = 1;
G.add(sp);
GW.glow.push({ s: sp, cx: s2.x + (Math.random() - 0.5) * 30, cz: s2.z + (Math.random() - 0.5) * 30, ph: Math.random() * 6, r: 2 + Math.random() * 4 });
}
var rn = GW_LITE ? 600 : 1600;
GW.rain = wPoints(rn, function () { return [(Math.random() - 0.5) * 80, Math.random() * 40, (Math.random() - 0.5) * 80]; }, 0xA8B8C8, 0.06, true);
GW.rain.visible = false;
GW.rain.frustumCulled = false;
G.add(GW.rain);
GW.snow = wPoints(rn, function () { return [(Math.random() - 0.5) * 80, Math.random() * 40, (Math.random() - 0.5) * 80]; }, 0xF0F2F4, 0.12, true);
GW.snow.visible = false;
GW.snow.frustumCulled = false;
G.add(GW.snow);
GW.rain.material.opacity = 0.6;
GW.snow.material.opacity = 0.8;
},
function (dt, L) {
var t = GW.t, i;
var h = typeof dreamHour === "function" ? dreamHour() : 12, day = typeof daylight === "function" ? daylight(h) : 1, m = gwMonth();
var beesOut = GW.wx !== "storm" && GW.wx !== "rain" && GW.wx !== "snow" && day > 0.3 && m >= 3 && m <= 10;
GW.bees.visible = beesOut && Math.hypot(L.x - GW_SITE.apiary.x, L.z - GW_SITE.apiary.z) < 90;
if (GW.bees.visible) {
var p = GW.bees.geometry.attributes.position;
for (i = 0; i < GW.beeSeeds.length; i++) {
var b = GW.beeSeeds[i];
b.a += dt * b.sp;
var rr = b.r * (0.5 + 0.5 * Math.abs(Math.sin(b.a * 0.5)));
p.setXYZ(i, b.h.x + Math.cos(b.a) * rr - 6, b.h.y + b.yy + Math.sin(b.a * 3) * 0.2, b.h.z + Math.sin(b.a) * rr - 6);
}
p.needsUpdate = true;
}
var fliesOut = beesOut && m >= 4 && m <= 9;
GW.flies.forEach(function (F) {
F.g.visible = fliesOut;
if (!fliesOut)
return;
F.a += dt * F.sp;
var x = F.cx + Math.cos(F.a) * F.r, z = F.cz + Math.sin(F.a * 1.3) * F.r;
F.g.position.set(x, gwHeight(x, z) + 1.0 + Math.sin(F.a * 2) * 0.4, z);
F.g.rotation.y = -F.a;
var fl = Math.sin(t * 9 + F.ph) * 0.7;
F.g.children[0].rotation.z = fl;
F.g.children[1].rotation.z = -fl;
});
var dusk = (m >= 5 && m <= 8 && day < 0.35 && GW.wx !== "rain" && GW.wx !== "storm") ? Math.min(1, (0.35 - day) / 0.2) : 0;
GW.glow.forEach(function (F) {
F.s.visible = dusk > 0;
if (!dusk)
return;
F.ph += dt * 0.25;
var x = F.cx + Math.cos(F.ph) * F.r, z = F.cz + Math.sin(F.ph * 0.7) * F.r;
F.s.position.set(x, gwHeight(x, z) + 0.8 + Math.sin(F.ph * 1.7) * 0.4, z);
F.s.material.opacity = 0.55 * dusk;
});
var inside = !!gwRoomAt(L.x, L.z);
GW.rain.visible = (GW.wx === "rain" || GW.wx === "storm") && !inside;
GW.snow.visible = GW.wx === "snow" && !inside;
[[GW.rain, GW.wx === "storm" ? 22 : 14], [GW.snow, 1.6]].forEach(function (q) {
var P = q[0];
if (!P.visible)
return;
P.position.set(L.x, L.y - 15, L.z);
var a = P.geometry.attributes.position;
for (var j = 0; j < a.count; j++) {
var y = a.getY(j) - dt * q[1];
if (y < 0)
y += 40;
a.setY(j, y);
if (P === GW.snow)
a.setX(j, a.getX(j) + Math.sin(t + j) * dt * 0.3);
}
a.needsUpdate = true;
});
if (GW.mother && GW.mother.halo)
GW.mother.halo.position.set(GW.mother.g.position.x, GW.mother.g.position.y + 1.3, GW.mother.g.position.z);
},
function () {
var m = gwMonth(), se = gwSeason(m), now = Date.now();
if (GW.lastMonth === m && GW.lastPaint && now - GW.lastPaint < 20000)
return gwNodesPaint();
GW.lastMonth = m;
GW.lastPaint = now;
GW.lastSeason = se;
(GW.trees || []).forEach(function (T, i) {
if (T.ever)
return;
var turn = m === 11 || (m === 10 && i % 3 === 0), green = i % 2 ? 0x4A7A32 : 0x3E6E2E;
gwIColour(T.crown, se === "spring" ? 0x6AA848 : turn ? GW_AUTUMN[i % 4] : green);
gwIShow(T.crown, se !== "winter");
gwIShow(T.blossom, m >= 3 && m <= 5);
});
if (GW.heartCrown)
gwIColour(GW.heartCrown, se === "autumn" ? 0x9A7A2A : se === "winter" ? 0x6A5A3A : se === "spring" ? 0x5A9A40 : 0x3E6E30);
gwNodesPaint();
},
function () {
GW.nodes.forEach(function (n) {
var r = gwNodeReady(n), k = gwNodeCrop(n);
if (n.hsBy) {
Object.keys(n.hsBy).forEach(function (c) { gwIShow(n.hsBy[c], r === 1 && c === k); });
return;
}
var f = GW_CROP[k] && GW_CROP[k].f, keep = f === "veg" || f === "herb" || f === "flower" || f === "glass" || f === "berry";
if (r === 1)
gwIShow(n.hs, true);
else {
gwIShow(n.hs, false);
if (keep && n.hs.length)
gwIShow(n.hs.filter(function (h, i) { return i % 3 === 0; }), r === -1);
}
});
(GW.grain || []).forEach(function (G2) { var ripe = gwRipe(GW_CROP[G2.k]); gwIShow(G2.all.map(function (q) { return q.h; }), ripe); });
},
function () {
var h = typeof dreamHour === "function" ? dreamHour() : 12, d = typeof daylight === "function" ? daylight(h) : 1, w = GW.wx;
var dull = w === "rain" || w === "storm" ? 0.45 : w === "fog" ? 0.3 : w === "snow" ? 0.25 : 0;
var dayTop = new THREE.Color(0x6AA8E0).lerp(new THREE.Color(0x8A96A4), dull), dayLow = new THREE.Color(0xCFE6F0).lerp(new THREE.Color(0xB8C0C8), dull);
var nTop = new THREE.Color(0x0E1A30), nLow = new THREE.Color(0x24344A);
var dawn = (h > 5 && h < 8) || (h > 17 && h < 20.5) ? Math.max(0, 1 - Math.abs(d - 0.45) * 2.2) : 0;
var top = nTop.clone().lerp(dayTop, d), low = nLow.clone().lerp(dayLow, d);
if (dawn)
low.lerp(new THREE.Color(0xF0C8A0), dawn * 0.5);
var sa = (h - 6) / 12 * Math.PI;
return { top: top.getHex(), low: low.getHex(), fog: low.getHex(), fogD: w === "fog" ? 0.006 : 0.0021 + dull * 0.0012, sun: 0.25 + 0.75 * d * (1 - dull * 0.6), sunCol: dawn ? 0xFFD8A8 : 0xFFF2DC,
sunDir: [Math.cos(sa) * 0.7, Math.max(0.15, Math.sin(sa)), 0.4], hemi: 0.45 + 0.4 * d, hemiCol: 0xD8E4E8, hemiGround: 0x4A6A3A, stars: Math.max(0, 0.8 - d * 1.6) * (1 - dull * 3.3) };
},
function (n) {
var k = gwNodeCrop(n), c = GW_CROP[k], r = gwNodeReady(n), lbl = n.label || c.n;
if (r === 1)
return "<b>" + esc(lbl) + "</b> · " + c.e + " <b>press E</b> to pick " + esc(c.n.toLowerCase()) + (GW.can && !n.glass && !GW.watered[n.id] && c.f !== "farm" ? " (and water it)" : "");
if (r === 0)
return "<b>" + esc(lbl) + "</b> · resting: " + esc(c.n.toLowerCase()) + " ripen " + esc(gwMonthsText(c)) + (gwNextRipe(c) ? ", next in " + esc(gwNextRipe(c)) : "") + " · <b>E</b> to learn about it";
var mins = Math.max(1, Math.ceil((GW.picked[n.id] - Date.now()) / 60000));
return "<b>" + esc(lbl) + "</b> · picked; ready again in about " + mins + " minute" + (mins > 1 ? "s" : "") + (GW.can && !n.glass && !GW.watered[n.id] && c.f !== "farm" ? " · <b>E</b> to water it" : " · <b>E</b> to learn about it");
},
function (n) {
GW.watered[n.id] = 1;
if (GW.picked[n.id]) {
var left = GW.picked[n.id] - Date.now();
if (left > 0) {
GW.picked[n.id] = Date.now() + left * 0.6;
gwPickedSave();
}
}
GW.canUses = (GW.canUses || 0) + 1;
if (GW.canUses >= 6) {
GW.can = false;
GW.canUses = 0;
}
setStatus("<b>Watered.</b> It will bear sooner." + (GW.can ? "" : " Your can is empty: fill it at the well or a water butt."));
if (typeof playTone === "function")
playTone(660, 0.15);
},
function () {
GW.can = true;
GW.canUses = 0;
var w = GW.wx, dry = w === "clear" || w === "heat";
setStatus("<b>Your watering can is full.</b> " + (dry ? "Water the beds that have been picked and they bear again sooner." : "It is wet out already: the beds outdoors are watered, but you can still give a picked bed a drink."));
},
function (n) {
if (GW.busy)
return;
var k = gwNodeCrop(n), c = GW_CROP[k];
var mins = gwRegrow(n);
if (GW.can && !n.glass && c.f !== "farm") {
GW.watered[n.id] = 1;
}
GW.picked[n.id] = Date.now() + mins * 60000;
gwPickedSave();
gwNodesPaint();
if (typeof playTone === "function")
playTone(880, 0.12);
if (!gwSigned()) {
var g = c.y[0] + Math.floor(Math.random() * (c.y[1] - c.y[0] + 1));
GW.basket[k] = (GW.basket[k] || 0) + g;
setStatus("<b>You pick " + g + " " + esc(c.n.toLowerCase()) + "</b> " + c.e + ". Sign in and what you pick goes to your backpack, to eat, cook, sell or plant at home.");
return;
}
GW.busy = true;
cityRpc("green_harvest", { p_kind: k, p_spot: n.id }).then(function (o) {
GW.busy = false;
if (!o || o.ok === false) {
setStatus(esc((o && o.say) || "Not just now."));
if (o && o.wait) {
GW.picked[n.id] = Date.now() + o.wait * 1000;
gwPickedSave();
gwNodesPaint();
}
return;
}
GW.day.units = o.units || GW.day.units;
GW.day.cap = o.cap || GW.day.cap;
var line = "<b>You pick " + o.got + " " + esc(c.n.toLowerCase()) + "</b> " + c.e + " (in your backpack)";
if (o.seed)
line += " and save " + o.seed + " " + esc(c.n.toLowerCase()) + " seed for your own garden 🌱";
if (o.bonus)
line += ". " + esc(o.bonus);
line += "." + (o.cap && o.units >= o.cap ? " That is all you can carry today: come back tomorrow." : "");
setStatus(line);
if (typeof loadStock === "function")
loadStock();
}).catch(function (e) { GW.busy = false; setStatus(gwSaySoft(e)); });
},
function (k) {
var c = GW_CROP[k];
if (!c)
return;
var uses = GW_RECIPES.filter(function (r) { return r.need[k]; }).map(function (r) { return r.n + " (" + GW_AT[r.at].split(" (")[0] + ")"; });
var rows = [["Ripe", gwMonthsText(c) + (gwRipe(c) ? " · ripe now" : "")], ["The city pays", c.b + " gold each, at the Harvest Hall or anywhere stock is sold"]];
if (c.fd || c.dr)
rows.push(["Eaten as it is", (c.fd ? "food +" + c.fd : "") + (c.fd && c.dr ? ", " : "") + (c.dr ? "drink +" + c.dr : "")]);
if (c.s)
rows.push(["Seed", "saved now and then as you pick; or buy it at the seed counter. Plant it at home."]);
worldCard(worldFacts(c.e + " " + c.n, GW_WX_LINE[GW.wx] || "", rows, uses.length ? ["Used in: " + uses.join("; ")] : []), {});
},
function () {
var m = gwMonth(), fams = [["fruit", "The Orchards"], ["berry", "The Berry Garden and the Vineyard"], ["veg", "The Market Garden"], ["herb", "The Physic Garden"], ["flower", "The Cutting Garden"], ["grain", "The Grain Fields"], ["nut", "The Old Wood"], ["wood", "The Old Wood"], ["farm", "The Farmstead and the Apiary"], ["glass", "Under glass, all year"]];
var h = "<div style='margin:6px 0'>" + esc(GW_WX_LINE[GW.wx] || "") + "</div>";
fams.forEach(function (f) {
var all = GW_CROPS.filter(function (c) { return c.f === f[0]; });
if (!all.length)
return;
var ripe = all.filter(function (c) { return gwRipe(c, m); }), rest = all.filter(function (c) { return !gwRipe(c, m); });
h += "<div style='margin:8px 0 2px'><b>" + esc(f[1]) + "</b></div>";
h += "<div style='font-size:12.5px'>" + (ripe.length ? ripe.map(function (c) { return c.e + " " + esc(c.n); }).join(" · ") : "<span style='opacity:.7'>nothing ripe this month</span>") + "</div>";
if (rest.length)
h += "<div style='font-size:12px;opacity:.7'>Later: " + rest.map(function (c) { return esc(c.n) + " (" + esc(gwNextRipe(c)) + ")"; }).join(", ") + "</div>";
});
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Sundial Lawn</div><div style='opacity:.8'>" + esc(GW_MONTHS[m - 1]) + ", " + esc(gwSeason(m)) + ". What is ripe in the Greenwold now.</div>" + h, {});
},
function (msg) {
var fns = {}, h = "<div style='opacity:.85;margin-bottom:6px'>The Harvest Hall buys for the city's stores: the grocers, bakers, cooks, florists and apothecaries all draw on what you bring. Or list it on the market in the city for other dreamers.</div>";
if (!gwSigned()) {
worldCard(worldFacts("The market counter", "", [], ["Sign in to sell what you pick: it is kept in your backpack."]), {});
return;
}
var S = gwGreenStock();
if (!S.length)
h += "<div style='opacity:.75'>You have nothing from the Greenwold yet. Pick something ripe and bring it here.</div>";
S.forEach(function (s) {
var k = s.kind;
h += gwBtn("s1-" + k, gwIcon(k) + " " + esc(gwName(k)) + " × " + s.amount, "sell one for " + s.buys + " gold" + (s.amount > 1 ? " · tap again for more" : ""));
fns["s1-" + k] = function () { gwSell(k, 1); };
if (s.amount > 1) {
h += gwBtn("sa-" + k, "Sell all " + s.amount + " " + esc(gwName(k).toLowerCase()), "for " + (s.amount * s.buys) + " gold");
fns["sa-" + k] = function () { gwSell(k, s.amount); };
}
});
if (msg)
h += "<div style='margin-top:8px;color:#FFE7B0'>" + msg + "</div>";
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The market counter</div>" + h, fns);
},
function (k, n) {
if (GW.busy)
return;
GW.busy = true;
cityRpc("sell_stock", { p_kind: k, p_amount: n }).then(function (o) {
GW.busy = false;
var ok = o === "ok";
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () {
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
gwSellCard(ok ? "Sold " + n + " " + esc(gwName(k).toLowerCase()) + " to the city." : esc(String(o)));
});
})
.catch(function (e) { GW.busy = false; gwSellCard(gwSaySoft(e)); });
},
function (lib, msg) {
var fns = {}, seedable = GW_CROPS.filter(function (c) { return c.s; });
var h = "<div style='opacity:.85;margin-bottom:6px'>" + (lib ? "The Seed Library keeps every variety grown here. A seed packet is one gold, to plant in the kitchen garden at your home." : "A seed packet is one gold. Plant it in the kitchen garden at your home (four beds beside your lot's board).") + "</div>";
if (!gwSigned())
h += "<div style='opacity:.75'>Sign in to buy seeds.</div>";
seedable.forEach(function (c) {
var have = gwHave("seed_" + c.k), nm = "b-" + c.k;
h += gwBtn(nm, "🌱 " + esc(c.n) + (have ? " · you have " + have : ""), "sow it now, ripe in " + (c.g * 2) + " minutes at home" + (gwRipe(c) ? "" : " (indoors it grows in any season)"));
fns[nm] = function () { gwBuySeed(c.k, lib); };
});
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + (lib ? "The Seed Library" : "The seed counter") + "</div>" + h, fns);
},
function (k, lib) {
if (!gwSigned() || GW.busy)
return;
GW.busy = true;
cityRpc("green_buy_seed", { p_crop: k, p_amount: 1 }).then(function (o) {
GW.busy = false;
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { gwSeedCard(lib, esc((o && o.say) || "")); });
})
.catch(function (e) { GW.busy = false; gwSeedCard(lib, gwSaySoft(e)); });
},
function (at, msg, home) {
var fns = {}, list = GW_RECIPES.filter(function (r) { return r.at === at; });
var h = "<div style='opacity:.85;margin-bottom:6px'>" + esc(home ? "Your own kitchen. Cook with what you have picked." : "Make something from what you have picked.") + "</div>";
if (!gwSigned())
h += "<div style='opacity:.75'>Sign in to use your harvest: it is kept in your backpack.</div>";
list.forEach(function (r) {
var m = GW_MADE_BY[r.make] || {}, can = true;
var need = Object.keys(r.need).map(function (k) { var have = gwHave(k); if (have < r.need[k])
can = false; return r.need[k] + " " + gwName(k).toLowerCase() + " (" + have + ")"; }).join(", ");
h += gwBtn("m-" + r.k, (can ? "" : "<span style='opacity:.55'>") + (m.e || "🍽️") + " " + esc(r.n) + (r.x > 1 ? " × " + r.x : "") + (can ? "" : "</span>"), "needs " + esc(need) + (m.fd || m.dr ? " · food +" + (m.fd || 0) + (m.dr ? ", drink +" + m.dr : "") : "") + (m.b ? " · the city pays " + m.b : ""));
fns["m-" + r.k] = function () { if (!can) {
gwMakeCard(at, "You need " + esc(need) + ".", home);
return;
} gwMake(r, at, home); };
});
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
var ttl = home ? "Your kitchen" : at === "kitchen" ? "The Hearth Kitchen" : GW_AT[at];
ttl = ttl.charAt(0).toUpperCase() + ttl.slice(1);
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(ttl) + "</div>" + h, fns);
},
function (r, at, home) {
if (GW.busy)
return;
GW.busy = true;
cityRpc("green_cook", { p_recipe: r.k }).then(function (o) {
GW.busy = false;
if (typeof playTone === "function")
playTone(520, 0.2);
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { gwMakeCard(at, esc((o && o.say) || ""), home); });
})
.catch(function (e) { GW.busy = false; gwMakeCard(at, gwSaySoft(e), home); });
},
function (k, after) {
if (!gwSigned() || GW.busy)
return;
GW.busy = true;
cityRpc("green_eat", { p_kind: k }).then(function (o) {
GW.busy = false;
if (o && o.ok !== false && typeof needsGot === "function")
try {
needsGot(o);
}
catch (e) { }
setStatus(esc((o && o.say) || ""));
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { if (after)
after(); });
})
.catch(function (e) { GW.busy = false; setStatus(gwSaySoft(e)); });
},
function (t) {
var fns = { talk: function () { worldCard(null); wTalk(t); }, gift: gwGift, ripe: gwRipeCard, learn: gwCourseCard };
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#D8F0C0'>Mother Nature</div><div style='opacity:.85;margin-bottom:6px'>She keeps the Greenwold. Her fox watches you with interest.</div>" +
gwBtn("talk", "🌿 Talk with her", "she knows everything that grows") + gwBtn("gift", "🧺 Ask for today's gift", "a basket from the garden, once a day") +
gwBtn("ripe", "🌞 What is ripe this month", "the calendar of the Greenwold") + gwBtn("learn", "🎓 World Learning: Growing", "sixteen lessons, out where they happen"), fns);
},
function () {
if (!gwSigned()) {
worldCard(worldFacts("Mother Nature smiles", "", [], ["\"Come back when you have signed in, little seedling, and I will have a basket ready for you.\""]), {});
return;
}
if (GW.busy)
return;
GW.busy = true;
cityRpc("green_gift", {}).then(function (o) {
GW.busy = false;
var got = (o && o.got) || [];
worldCard(worldFacts(o && o.ok ? "A basket from Mother Nature" : "Mother Nature", "", got.map(function (g) { return [gwIcon(g.kind) + " " + gwName(g.kind), "× " + g.amount]; }), [(o && o.say) || ""]), {});
if (typeof loadStock === "function")
loadStock();
})
.catch(function (e) { GW.busy = false; worldCard(worldFacts("Mother Nature", "", [], [gwSaySoft(e)]), {}); });
},
function (l) {
if (GWL.cur !== l.k) {
GWL.cur = l.k;
GWL.ans = {};
GWL.msg = "";
GWL.t0 = Date.now();
if (gwSigned())
cityRpc("school_begin", { p_course: "world-green", p_unit: l.n }).catch(function () { });
}
if (GWL.guide === l.k)
GWL.guide = null;
var fns = {}, b = "";
b += "<div style='opacity:.7;font-size:12px'>Lesson " + l.n + " of " + GW_LESSONS.length + " · World Learning: Growing · the Department of Education" + (gwlDone(l.n) ? " · ✓ stamped" : "") + "</div>";
b += "<div style='margin:6px 0'><b>What is true.</b> " + esc(l.real) + "</div><div style='margin:6px 0'><b>The science.</b> " + esc(l.science) + "</div>";
b += "<div style='margin:6px 0'><b>A word from here: " + esc(l.word[0]) + "</b>, " + esc(l.word[1]) + "</div>";
b += "<div style='margin:6px 0'><b>Try it.</b> " + esc(l.tryit) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Two questions</b> for your Growing stamp</div>";
l.quiz.forEach(function (q, k) {
b += "<div style='margin:6px 0 2px'>" + (k + 1) + ". " + esc(q[0]) + "</div>";
gwlOpt(l, k).forEach(function (o, j) {
var on = GWL.ans[k] === o, nm = "q" + k + "_" + j;
b += "<div role='button' data-w='" + nm + "' style='margin:3px 0;padding:5px 9px;border-radius:4px;border:1px solid " + (on ? (o === q[1] ? "#7AD08A" : "#E07A6A") : "rgba(143,180,232,.4)") + ";background:" + (on ? (o === q[1] ? "rgba(122,208,138,.15)" : "rgba(224,122,106,.15)") : "transparent") + "'>" + esc(o) + (on ? (o === q[1] ? " ✓" : " ✗") : "") + "</div>";
fns[nm] = function () { GWL.ans[k] = o; gwlCheck(l); gwlCard(l); };
});
});
if (GWL.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + GWL.msg + "</div>";
b += gwBtn("all", "🎓 Every lesson", "your Growing record: " + gwlCount() + " of " + GW_LESSONS.length + " stamped");
fns.all = gwCourseCard;
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#D8F0C0'>🎓 " + esc(l.title) + "</div>" + b, fns);
},
function (l) {
if (gwlDone(l.n))
return;
if (!l.quiz.every(function (q, k) { return GWL.ans[k] === q[1]; }))
return;
var L = gwlLog();
L[l.n] = new Date().toISOString();
if (typeof save === "function")
save();
var n = gwlCount();
GWL.msg = "🌱 Stamped: " + esc(l.title) + ". " + n + " of " + GW_LESSONS.length + "." + (n === GW_LESSONS.length ? " <b>Greenwold Grower!</b> The certificate is in your backpack." : "");
setStatus("<b>Growing stamp</b> (" + n + " of " + GW_LESSONS.length + ")." + (n === GW_LESSONS.length ? " <b>You are a Greenwold Grower.</b>" : ""));
if (gwSigned()) {
var wait = Math.max(0, 21000 - (Date.now() - GWL.t0));
setTimeout(function () { cityRpc("school_pass", { p_course: "world-green", p_unit: l.n }).catch(function () { }); }, wait);
}
},
function () {
var fns = {}, h = "<div style='opacity:.85'>Sixteen lessons, each taught out where it happens. Get both questions right at each one for a stamp; all sixteen make a <b>Greenwold Grower</b> (a certificate in your backpack and a line on your school report card). " + gwlCount() + " of " + GW_LESSONS.length + " stamped.</div>";
GW_LESSONS.forEach(function (l) {
var nm = "l-" + l.k;
h += gwBtn(nm, (gwlDone(l.n) ? "🌱 " : "○ ") + l.n + ". " + esc(l.title), "at " + esc(GW_LESSON_PLACE[l.at] || l.at) + (WLD.on === "greenwold" ? " · tap to be shown the way" : ""));
fns[nm] = function () { if (WLD.on !== "greenwold") {
gwlCard(l);
return;
} GWL.guide = l.k; worldCard(null); setStatus("<b>" + esc(l.title) + "</b>: follow the arrow at the top to " + esc(GW_LESSON_PLACE[l.at] || l.at) + "."); };
});
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#D8F0C0'>World Learning: Growing</div>" + h, fns);
},
function (L) {
if (!GWL.guide)
return "";
var l = GW_LESSON[GWL.guide], p = l && GW.lessonAt[l.at];
if (!p)
return "";
var dx = p.x - L.x, dz = p.z - L.z, d = Math.hypot(dx, dz);
if (d < 4)
return "";
var want = Math.atan2(-dx, -dz), rel = want - (typeof yaw !== "undefined" ? yaw : 0);
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
var arrows = ["⬆️", "↖️", "⬅️", "↙️", "⬇️", "↘️", "➡️", "↗️"], i = ((Math.round(rel / (Math.PI / 4)) % 8) + 8) % 8;
return "<div style='color:#D8F0C0'>" + arrows[i] + " " + esc(l.title) + " · " + Math.round(d) + " m</div>";
},
function (G) {
var d = GW_SITE.door, y = gwHeight(d.x, d.z + 4), g = new THREE.Group();
g.position.set(d.x, y, d.z + 4);
G.add(g);
var stone = gwM(0x8A8A7E), ivy = gwM(0x3E6E30);
[-1, 1].forEach(function (s) { wBox(1.2, 4.4, 1.2, stone, s * 2.1, 2.2, 0, g); wBox(1.3, 0.3, 1.3, stone, s * 2.1, 4.5, 0, g); });
for (var i = 0; i <= 8; i++) {
var a = i / 8 * Math.PI, b = wBox(0.9, 0.6, 1.2, stone, Math.cos(a) * 2.1, 4.4 + Math.sin(a) * 1.6, 0, g);
b.rotation.z = a - Math.PI / 2;
}
var door = new THREE.Group();
door.position.set(0, 0, -0.1);
door.userData.keep = 1;
g.add(door);
wBox(3, 4.4, 0.18, gwM(0x2E5A34), 0, 2.2, 0, door);
for (var p = -1; p <= 1; p += 0.5)
wBox(0.06, 4.2, 0.2, gwM(0x24482A), p * 1.4, 2.2, 0.02, door);
wSph(0.12, gwBasic(0xC8A040), 1.0, 2.0, 0.14, door, 8);
var gl = wGlow(0xD8F0C0, 4.5, 0.25);
gl.position.set(0, 2.4, 0.4);
door.add(gl);
var R = wRand(55);
for (var k = 0; k < 46; k++) {
var a2 = R() * Math.PI, side = R() < 0.5 ? -1 : 1, onArch = R() < 0.55;
var x = onArch ? Math.cos(a2) * 2.2 : side * (2.1 + (R() - 0.5) * 1.2), yy = onArch ? 4.4 + Math.sin(a2) * 1.7 : R() * 4.4;
gwI("leafy", d.x + x, y + yy, d.z + 4 + 0.62 * (R() < 0.5 ? 1 : -1), 0.45, 0.3, 0.45, R() * 6, R() < 0.15 ? 0xE8D84A : 0x3E6E30);
}
var sg = wSign(["THE GREEN DOOR", "back to Somnucor · press E"], 2.4, 0.6, "#22361E", "#E8E2C8");
sg.position.set(0, 6.8, 0.65);
g.add(sg);
GW.solids.push({ x: d.x - 2.1, z: d.z + 4, r: 0.8 }, { x: d.x + 2.1, z: d.z + 4, r: 0.8 }, { x: d.x, z: d.z + 4, hw: 1.6, hd: 0.2 });
GW.homeDoor = { x: d.x, z: d.z + 2.6 };
},
function (G) {
GW.G = G;
gwPickedLoad();
gwBuildGround(G);
gwGreenDoor(G);
gwHeartwood(G);
gwVillage(G);
gwHarvestHall(G);
gwGrangeSchool(G);
gwMarketGarden(G);
gwGlasshouses(G);
gwOrchards(G);
gwBerries(G);
gwFields(G);
gwFarmstead(G);
gwApiary(G);
gwWoods(G);
gwCutting(G);
gwWild(G);
GW_LESSONS.forEach(function (l) {
var p = GW.lessonAt[l.at];
if (!p)
return;
if (!GW.lecterns.some(function (q) { return Math.hypot(q.x - p.x, q.z - p.z) < 2.5; }))
gwLectern(G, p.x, p.z, gwFaceRot(p.x, p.z, 0, 92), l.title);
});
try {
if (typeof whRaise === "function" && WH_PLAN.greenwold)
whRaise("greenwold", WORLDS.greenwold, G, GW.solids);
}
catch (e) {
if (window.console)
console.warn("[greenwold homes]", e);
}
try {
gwMeadow(G);
}
catch (e) {
if (window.console)
console.warn("[greenwold meadow]", e);
}
gwPeople(G);
gwAnimals(G);
gwSmall(G);
gwIBuild(G);
gwBake(G);
GW.built = true;
GW.wx = gwWeather();
gwSeasonPaint();
},
function (dt) {
var L = worldLocal();
GW.t += dt;
if (!GW.wxAt || GW.t - GW.wxAt > 5) {
GW.wxAt = GW.t;
GW.wx = gwWeather();
gwSeasonPaint();
}
var wind = GW.wx === "wind" ? 2.6 : GW.wx === "storm" ? 2.2 : 1;
GW.spin.forEach(function (s) { s.o.rotation[s.ax] += dt * s.sp * (s.wind ? wind : 1); });
GW.people.forEach(function (P) { if (P.wander)
wWander(P.g, dt, gwGround, P.wander); });
gwCrowns();
gwAnimalsTick(dt);
gwSmallTick(dt, L);
var day = typeof daylight === "function" ? daylight(typeof dreamHour === "function" ? dreamHour() : 12) : 1;
if (GW.lampsOn !== (day < 0.5)) {
GW.lampsOn = day < 0.5;
GW.lamps.forEach(function (l) { l.visible = GW.lampsOn; });
}
if (gwBadge())
GW.badge.forEach(function (b) { var near = Math.hypot(L.x - b.x, L.z - b.z) < 2.6; if (near !== b.open) {
b.open = near;
b.leaf.visible = !near;
} });
var room = gwRoomAt(L.x, L.z), site = room ? null : gwSiteAt(L.x, L.z), m = gwMonth();
worldBanner("<b>The Greenwold</b> · " + esc(room ? room.name : site || "the meadows") + " · " + esc(GW_MONTHS[m - 1]) + ", " + esc(gwSeason(m)) + (GW.wx !== "clear" ? " · " + esc(GW.wx === "heat" ? "a heat wave" : GW.wx) : "") + gwlArrow(L));
GW.pt = (GW.pt || 0) + dt;
if (GW.pt < 0.15)
return;
GW.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
if (GW.homeDoor && Math.hypot(L.x - GW.homeDoor.x, L.z - GW.homeDoor.z) < 3.4)
return worldPrompt("<b>The Green Door</b> · <b>press E</b> to go home to Somnucor", gwHome);
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
GW.talk.forEach(function (T) {
var x = T.p ? T.p.g.position.x : T.x, z = T.p ? T.p.g.position.z : T.z;
cand(x, z, T.r, T.fn ? T.fn : T.p && T.p.def && T.p.def.k === "mother" ? function () { gwMotherCard(T.t); } : function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to " + (T.verb || (T.fn ? "look" : "talk")));
});
GW.spots.forEach(function (s) { cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb)); });
GW_LESSONS.forEach(function (l) { var p = GW.lessonAt[l.at]; if (p)
cand(p.x, p.z, 2.4, function () { gwlCard(l); }, "🎓 <b>" + esc(l.title) + "</b> · <b>press E</b> for the lesson" + (gwlDone(l.n) ? " (stamped)" : "")); });
(WHM.homes && WHM.homes.greenwold || []).forEach(function (h) {
if (gwMyLots().indexOf(h.name) < 0)
return;
var c = Math.cos(h.rot), s = Math.sin(h.rot), gx = h.x + (-h.hw - 1.6) * c + (h.door) * s, gz = h.z - (-h.hw - 1.6) * s + (h.door) * c;
cand(gx, gz, 2.6, function () { gwHomeCard(h.name); }, "<b>Your kitchen garden</b> · <b>press E</b> to plant or pick");
});
if (bd > 0.6)
GW.nodes.forEach(function (n) { cand(n.x, n.z, n.r, function () { gwUse(n); }, gwPrompt(n)); });
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
},
function (opt) {
var d = GW.homeDoor || { x: 0, z: 152 };
camera.position.set(GW.base + d.x, gwGround(d.x, d.z - 6) + 1.72, d.z - 6);
yaw = 0;
pitch = 0;
if (typeof loadStock === "function" && gwSigned())
loadStock();
var m = gwMonth();
setStatus("<b>The Greenwold.</b> You step through the Green Door into " + esc(gwSeason(m)) + " sunshine and birdsong: gardens, orchards and fields as far as the hills, and the great oak of the Heartwood ahead, where Mother Nature waits. " +
"Pick anything that is ripe (press E); it goes to your backpack. The Green Door behind you takes you home.");
},
function (name) {
var g = GWH.g[name];
if (!g)
return;
g.userData.beds.forEach(function (pl, i) {
while (pl.children.length)
pl.remove(pl.children[0]);
var b = (GWH.beds[name] || []).filter(function (q) { return q.slot === i + 1; })[0];
if (!b || !b.crop)
return;
var ready = b.ready, col = GW_COL[b.crop] || 0x8A3A2A;
for (var k = 0; k < 4; k++) {
var px = (k % 2 ? 0.25 : -0.25), pz = (k < 2 ? -0.2 : 0.2);
wSph(ready ? 0.17 : 0.1, wM(0x4A8A3A), px, 0.1, pz, pl, 6);
if (ready)
wSph(0.08, wM(col), px + 0.08, 0.2, pz, pl, 6);
}
});
},
function (name, msg) {
var fns = {}, beds = GWH.beds[name] || [];
var h = "<div style='opacity:.85;margin-bottom:6px'>Four beds by your board at " + esc(name) + ". Plant seeds you saved in the Greenwold or bought at its seed counter; they grow here in any season.</div>";
for (var i = 1; i <= 4; i++) {
(function (slot) {
var b = beds.filter(function (q) { return q.slot === slot; })[0], c = b && b.crop && GW_CROP[b.crop];
if (c && b.ready) {
h += gwBtn("p" + slot, "Bed " + slot + ": " + c.e + " " + esc(c.n) + " · ready", "press to pick");
fns["p" + slot] = function () { gwHomeDo(name, slot, "pick", null); };
}
else if (c) {
var mins = Math.max(1, Math.ceil((b.mins || 0)));
h += "<div style='margin:6px 0;padding:7px 10px;border:1px solid rgba(143,180,232,.3);border-radius:4px'>Bed " + slot + ": " + c.e + " " + esc(c.n) + " · growing, ready in about " + mins + " minute" + (mins > 1 ? "s" : "") + "</div>";
}
else {
var seeds = gwGreenStock().filter(function (s) { return /^seed_/.test(s.kind); });
if (!seeds.length)
h += "<div style='margin:6px 0;opacity:.7'>Bed " + slot + ": empty. You have no seeds: save some as you pick in the Greenwold, or buy them at its seed counter.</div>";
else {
h += "<div style='margin:8px 0 2px'>Bed " + slot + ": empty. Plant…</div>";
seeds.forEach(function (s) { var k = s.kind.slice(5), nm = "s" + slot + "-" + k; h += gwBtn(nm, "🌱 " + esc(GW_CROP[k] ? GW_CROP[k].n : k) + " × " + s.amount, "ready in " + ((GW_CROP[k] && GW_CROP[k].g * 2) || 60) + " minutes"); fns[nm] = function () { gwHomeDo(name, slot, "plant", k); }; });
}
}
})(i);
}
h += gwBtn("cook", "🍳 Cook in your kitchen", "with what you have picked");
fns.cook = function () { gwMakeCard("kitchen", "", true); };
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#D8F0C0'>Your kitchen garden</div>" + h, fns);
},
function (name, slot, act, crop) {
if (GW.busy)
return;
GW.busy = true;
cityRpc("green_home", { p_lot: name, p_slot: slot, p_action: act, p_crop: crop }).then(function (o) {
GW.busy = false;
if (o && o.beds)
GWH.beds[name] = o.beds;
gwHomePaint(name);
return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { gwHomeCard(name, esc((o && o.say) || "")); });
})
.catch(function (e) { GW.busy = false; gwHomeCard(name, gwSaySoft(e)); });
},
function () {
var pos = [], col = [], nb = 9, R = wRand(4401);
for (var b = 0; b < nb; b++) {
var a = b / nb * 6.283 + R() * 0.8, lean = 0.18 + R() * 0.35, h = 0.16 + R() * 0.26, w = 0.022 + R() * 0.014, ca = Math.cos(a), sa = Math.sin(a), ox = ca * R() * 0.12, oz = sa * R() * 0.12;
var px = -sa * w, pz = ca * w, tx = ox + ca * lean * h, tz = oz + sa * lean * h, mx = ox + ca * lean * h * 0.35, mz = oz + sa * lean * h * 0.35;
var v = [[ox - px, 0, oz - pz], [ox + px, 0, oz + pz], [mx + px * 0.7, h * 0.55, mz + pz * 0.7], [mx - px * 0.7, h * 0.55, mz - pz * 0.7], [tx, h, tz]];
var c = [0.62, 0.62, 0.86, 0.86, 1.08];
[[0, 1, 2], [0, 2, 3], [3, 2, 4]].forEach(function (t) { t.forEach(function (i) { pos.push(v[i][0], v[i][1], v[i][2]); col.push(c[i], c[i], c[i]); }); });
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.computeVertexNormals();
var n = g.attributes.normal;
for (var i = 0; i < n.count; i++) {
n.setXYZ(i, n.getX(i) * 0.35, 0.94, n.getZ(i) * 0.35);
}
g.computeBoundingSphere();
return g;
},
function (G) {
var gr = G.getObjectByName("gw-ground"), gt = typeof texOf === "function" ? texOf("grass") : null;
if (gr && gt && gr.geometry.attributes.uv) {
var p = gr.geometry.attributes.position, uv = gr.geometry.attributes.uv;
for (var i = 0; i < p.count; i++)
uv.setXY(i, p.getX(i) + gr.position.x, p.getZ(i) + gr.position.z);
uv.needsUpdate = true;
gr.material = gr.material.clone();
gr.material.map = gt;
gr.material.color = new THREE.Color(0xFFFFFF);
gr.material.needsUpdate = true;
var cl = gr.geometry.attributes.color;
if (cl && !gr.userData.gwLift) {
gr.userData.gwLift = 1;
for (var j = 0; j < cl.count; j++)
cl.setXYZ(j, Math.min(1, cl.getX(j) * 1.3), Math.min(1, cl.getY(j) * 1.3), Math.min(1, cl.getZ(j) * 1.3));
cl.needsUpdate = true;
}
}
var lite = GW_LITE, RAD = lite ? 18 : 30, STEP = lite ? 0.7 : 0.5, fs = GW_SITE.fields, pd = GW_SITE.pond, m = gwMonth();
var MS = 2, MN = 340, mask = new Uint8Array(MN * MN);
for (var mi = 0; mi < MN; mi++)
for (var mj = 0; mj < MN; mj++) {
var x = (mi - MN / 2 + 0.5) * MS, z = (mj - MN / 2 + 0.5) * MS, ok = 1;
if (Math.hypot(x, z) > 460)
ok = 0;
else if (gwPathDist(x, z) < 2.4)
ok = 0;
else if (pd && Math.hypot(x - pd.x, z - pd.z) < pd.r + 1.2)
ok = 0;
else if (fs && Math.abs(x - fs.x) < 70 && Math.abs(z - fs.z) < 70)
ok = 0;
else
for (var si = 0; si < GW.solids.length; si++) {
var S = GW.solids[si], rr = S.r !== undefined ? S.r : S.hw !== undefined ? Math.hypot(S.hw, S.hd) : null;
if (rr !== null && S.x !== undefined && Math.hypot(x - S.x, z - S.z) < rr + 1.2) {
ok = 0;
break;
}
if (S.x0 !== undefined && x > S.x0 - 1.2 && x < S.x1 + 1.2 && z > S.z0 - 1.2 && z < S.z1 + 1.2) {
ok = 0;
break;
}
}
mask[mi * MN + mj] = ok;
}
function canGrow(x, z) { var i = Math.floor(x / MS + MN / 2), j = Math.floor(z / MS + MN / 2); return i >= 0 && j >= 0 && i < MN && j < MN && mask[i * MN + j] === 1; }
function hsh(i, j, k) { var h = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453; return h - Math.floor(h); }
var base = new THREE.Color(m >= 9 && m <= 11 ? 0x86904A : (m === 12 || m <= 2) ? 0x9A8E5E : 0x6A9A40), dry = new THREE.Color(m >= 6 && m <= 11 ? 0xC2AA5C : 0xB0A270), lush = new THREE.Color(0x4E8A34);
var mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
var U = { value: 0 };
mat.onBeforeCompile = function (sh) {
sh.uniforms.uWind = U;
sh.vertexShader = "uniform float uWind;\n" + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n#ifdef USE_INSTANCING\n vec2 wp=vec2(instanceMatrix[3][0],instanceMatrix[3][2]);\n#else\n vec2 wp=vec2(0.0);\n#endif\n float sw=sin(uWind*1.3+wp.x*0.21+wp.y*0.17)*0.6+sin(uWind*2.1+wp.x*0.5)*0.4;\n transformed.x+=sw*0.12*position.y*position.y; transformed.z+=sw*0.07*position.y*position.y;");
};
mat.customProgramCacheKey = function () { return "gwMeadow"; };
var cap = Math.ceil(Math.PI * RAD * RAD / (STEP * STEP) * 1.05), im = new THREE.InstancedMesh(gwMeadowGeo(), mat, cap);
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc3 = new THREE.Vector3(), c = new THREE.Color(), at = { x: 1e9, z: 1e9 };
function lay(cx, cz) {
var k = 0, n = Math.ceil(RAD / STEP), i0 = Math.round(cx / STEP), j0 = Math.round(cz / STEP);
for (var i = i0 - n; i <= i0 + n; i++)
for (var j = j0 - n; j <= j0 + n; j++) {
var x = (i + hsh(i, j, 1) - 0.5) * STEP, z = (j + hsh(i, j, 2) - 0.5) * STEP, dx = x - cx, dz = z - cz;
if (dx * dx + dz * dz > RAD * RAD || k >= cap)
continue;
if (!canGrow(x, z))
continue;
var dr = wFbm(x * 0.04, z * 0.04, 77, 2);
if (hsh(i, j, 3) > 0.45 + dr * 0.8)
continue;
var sz = (0.55 + hsh(i, j, 4) * 0.5 + dr * 0.5) * Math.min(1, (RAD - Math.sqrt(dx * dx + dz * dz)) / (RAD * 0.35) + 0.15);
e.set(0, hsh(i, j, 5) * 6.283, 0);
q.setFromEuler(e);
v.set(x, gwHeight(x, z) - 0.03, z);
sc3.set(sz, sz * (0.5 + hsh(i, j, 6) * 0.5 + dr * 0.6), sz);
m4.compose(v, q, sc3);
im.setMatrixAt(k, m4);
c.copy(base).lerp(lush, Math.max(0, 0.5 - dr) * 0.8).lerp(dry, hsh(i, j, 7) * 0.35 + Math.max(0, dr - 0.5) * 0.5).multiplyScalar(0.9 + hsh(i, j, 8) * 0.25);
im.setColorAt(k, c);
k++;
}
im.count = k;
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
at.x = cx;
at.z = cz;
}
lay(0, -6);
im.name = "gw-meadow";
im.userData.keep = 1;
im.userData.noCull = true;
im.frustumCulled = false;
im.receiveShadow = true;
im.raycast = function () { };
im.onBeforeRender = function () {
U.value = performance.now() / 1000;
var cx = camera.position.x - (GW.base || 0), cz = camera.position.z;
if (Math.abs(cx - at.x) > RAD * 0.18 || Math.abs(cz - at.z) > RAD * 0.18)
lay(cx, cz);
};
G.add(im);
GW.meadow = im;
return im;
},
function (G) {
if (typeof swkTree !== "function")
return;
var gr = function (x, z) { return gwGround(x, z); }, D = new THREE.Group();
D.name = "gw-sweep";
G.add(D);
function at(x, z, ry) { return swkAt(D, x, gr(x, z), z, ry || 0); }
var wood = swkM(0x6A4A2E, "wood");
function cart(x, z, ry, load) {
var C = at(x, z, ry);
swkBox(C, 2.8, 0.12, 1.4, wood, 0, 0.85, 0);
[-0.68, 0.68].forEach(function (e) { swkBox(C, 2.8, 0.4, 0.08, wood, 0, 1.1, e); });
[-1, 1].forEach(function (s) { var w = swkCyl(C, 0.55, 0.55, 0.1, swkM(0x4A3420, "wood"), -0.3, 0.55, s * 0.76, 14); w.rotation.x = Math.PI / 2; });
swkBox(C, 1.8, 0.08, 0.08, wood, 2.2, 0.7, 0.25);
swkBox(C, 1.8, 0.08, 0.08, wood, 2.2, 0.7, -0.25);
for (var i = 0; i < 6; i++)
if (load === "sheaf")
swkCyl(C, 0.25, 0.3, 1.0, swkM(0xC8A858, "thatch"), -1.0 + (i % 3) * 0.8, 1.4, (i < 3 ? -0.3 : 0.3), 8).rotation.z = Math.PI / 2;
else
swkBall(C, 0.32, swkM(load || 0xE07A2A), -1.0 + (i % 3) * 0.8, 1.2, (i < 3 ? -0.3 : 0.3), 1);
}
function crate(x, z, ry, fruit) { var K = at(x, z, ry); swkBox(K, 0.7, 0.4, 0.5, swkM(0x9A7A50, "wood"), 0, 0.2, 0); for (var f = 0; f < 4; f++)
swkBall(K, 0.11, swkM(fruit), -0.18 + (f % 2) * 0.3, 0.42, -0.1 + Math.floor(f / 2) * 0.2, 0); }
function ladder(x, z, ry) { var L = at(x, z, ry); [-0.25, 0.25].forEach(function (e) { var r = swkBox(L, 0.06, 3.6, 0.06, wood, e, 1.7, 0.5); r.rotation.x = -0.28; }); for (var s = 0; s < 8; s++) {
var rg = swkBox(L, 0.5, 0.04, 0.04, wood, 0, 0.3 + s * 0.42, 0.92 - s * 0.12);
} }
function bale(x, z, ry) { var B = at(x, z, ry); swkBox(B, 1.1, 0.5, 0.6, swkM(0xC8A858, "thatch"), 0, 0.25, 0); return B; }
var F = GW_SITE.farm;
cart(F.x + 18, F.z + 14, 0.6, 0xE07A2A);
bale(F.x + 24, F.z + 4, 0.2);
bale(F.x + 25, F.z + 5.2, 0.1);
bale(F.x + 24.5, F.z + 4.6, 0.3).position.y += 0.5;
[[F.x + 12, F.z + 20, 0xC8302A], [F.x + 13, F.z + 20.8, 0xE07A2A], [F.x + 11.2, F.z + 21, 0xC8302A]].forEach(function (c) { crate(c[0], c[1], 0.2, c[2]); });
swkBarrel(D, F.x + 16, F.z + 22, { y: gr(F.x + 16, F.z + 22) });
swkBarrel(D, F.x + 16.8, F.z + 22.6, { y: gr(F.x + 16.8, F.z + 22.6) });
var Ch = at(F.x + 8, F.z + 16, 0);
swkCyl(Ch, 0.35, 0.4, 0.6, swkM(0x6A4A2E, "bark"), 0, 0.3, 0, 10);
for (var l = 0; l < (swkLite() ? 5 : 10); l++) {
var lg = swkCyl(Ch, 0.14, 0.14, 0.9, swkM(0x8A6A4A, "wood"), 1.2 + (l % 5) * 0.3, 0.14 + Math.floor(l / 5) * 0.26, 0.4, 7);
lg.rotation.x = Math.PI / 2;
}
for (var h = 0; h < 6; h++) {
var hx = F.x + 6 + h * 1.4, hz = F.z + 24 + (h % 2), H = at(hx, hz, h);
swkBall(H, 0.16, swkM(h % 2 ? 0xE8E0D0 : 0x8A4A2A), 0, 0.2, 0, 1).scale.set(1, 0.9, 1.4);
swkBall(H, 0.07, swkM(0xC83A2A), 0, 0.36, 0.17, 0);
}
var O = GW_SITE.orchard;
[[-20, 10], [6, -14], [24, 18], [-8, 30]].forEach(function (p, i) { if (swkKeep(i))
ladder(O.x + p[0], O.z + p[1], i * 1.3); crate(O.x + p[0] + 1.5, O.z + p[1] + 1, i, 0xC8302A); crate(O.x + p[0] + 2.2, O.z + p[1] + 0.4, i + 1, 0xA8B83A); });
cart(O.x - 30, O.z + 40, 1.2, 0xB8302A);
var M = GW_SITE.garden, Wb = at(M.x - 20, M.z + 30, 0.8);
swkBox(Wb, 0.7, 0.3, 1.0, swkM(0x5A6A4A, "metal"), 0, 0.5, 0);
var wh = swkCyl(Wb, 0.22, 0.22, 0.08, swkM(0x2A2A2A), 0, 0.22, 0.6, 12);
wh.rotation.z = Math.PI / 2;
swkBox(Wb, 0.05, 0.05, 1.2, wood, 0.3, 0.45, -0.7);
swkBox(Wb, 0.05, 0.05, 1.2, wood, -0.3, 0.45, -0.7);
[[M.x - 24, M.z + 34, 0xE07A2A], [M.x - 25, M.z + 33, 0xC88A3A], [M.x - 23, M.z + 35, 0x8A3A5A]].forEach(function (c) { crate(c[0], c[1], 0.4, c[2]); });
var Fi = GW_SITE.fields;
cart(Fi.x + 30, Fi.z + 40, 0.3, "sheaf");
var L = [], hand = { top: 0x6A5A3A, bottom: 0x3A3A2E, hat: "cap", hatColor: 0x4A3A2A }, pick = { top: 0x8A3A2A, layer: "apron", layerColor: 0xD8D0B8 };
[[F.x + 20, F.z + 16, 2.0, "farmer", hand], [F.x + 10, F.z + 18, 0.8, "farmer", pick], [F.x + 14, F.z + 24, -1.0, "", { top: 0x3A5A3A }, 6],
[O.x - 18, O.z + 12, 0.4, "farmer", pick], [O.x + 8, O.z - 12, 2.2, "farmer", hand], [O.x + 26, O.z + 20, -0.8, "", { top: 0x5A3A6A }, 5], [O.x - 6, O.z + 32, 1.4, "farmer", pick],
[M.x - 22, M.z + 31, 1.6, "gardener", hand], [M.x - 10, M.z + 20, 0, "gardener", pick], [M.x + 10, M.z + 10, 3, "gardener", hand, 4],
[GW_SITE.berries.x - 6, GW_SITE.berries.z + 4, 0.5, "farmer", pick], [GW_SITE.berries.x + 8, GW_SITE.berries.z - 6, 2.5, "farmer", hand],
[Fi.x + 28, Fi.z + 36, 0.3, "farmer", hand], [Fi.x + 10, Fi.z + 20, 1.2, "farmer", pick, 8]].forEach(function (p, i) { L.push([p[0], p[1], p[2], p[3], { walk: p[5] || 0, look: p[4], child: i === 2 }]); });
swkPeople(D, "gw_sweep", L, gr);
}
];
});
