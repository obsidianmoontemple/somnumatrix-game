/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(192, function () {
"use strict";
return [
function (kind) {
var g = new THREE.Group(), wood = spM(0x5A3A22), woodD = spM(0x3E2814), hash0 = 0;
function add(geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); g.add(m); return m; }
add(new THREE.BoxGeometry(2.4, 1.9, 0.05), woodD, 0, 0.95, -0.2);
[-1.17, 1.17].forEach(function (x) { add(new THREE.BoxGeometry(0.06, 1.95, 0.45), wood, x, 0.975, 0); });
add(new THREE.BoxGeometry(2.46, 0.08, 0.5), wood, 0, 1.94, 0.01);
add(new THREE.BoxGeometry(2.34, 0.14, 0.42), woodD, 0, 0.07, 0.01);
var shelfY = [0.16, 0.74, 1.32];
shelfY.forEach(function (y) { add(new THREE.BoxGeometry(2.3, 0.04, 0.42), wood, 0, y, 0); });
function r() { hash0 = (hash0 * 9301 + 49297) % 233280; return hash0 / 233280; }
hash0 = kind.length * 977;
var COLS = { jars: [0x6A9A5A, 0xB8862E, 0x8A4A3A, 0x3A6A8A, 0xC8C0A0], cloth: [0x7A1E2A, 0x2A4A7A, 0x3A6A3A, 0xC9A040, 0x6A3A6A, 0xE8E0CC, 0x8A6A4A],
shoes: [0x4A2E1A, 0x1A1A1E, 0x7A4A2A, 0x8A2A2A], books: [0x7A1E22, 0x1E3A5A, 0x2E4A2E, 0x5A3A1A, 0x4A2A5A, 0xB8862E], candles: [0xF4EAD0, 0xE8D8A8, 0xC83A3A, 0xE8C850],
bottles: [0x2A5A2A, 0x5A1A2A, 0x3A2A1A, 0x8A6A2A], gems: [0xD02A4A, 0x2A7AD0, 0x2AB86A, 0xE8C850, 0xA84AD0], toys: [0xE84A3A, 0x3A8AE8, 0xF4C83A, 0x4AC86A, 0xE87AC8],
pots: [0xB86A3A, 0x8A5A3A, 0xE8E0D0, 0x4A6A8A, 0xC8A87A], tools: [0x6A6A70, 0x4A4A50, 0x8A6A4A], hats: [0x2A2A2E, 0x6A4A2A, 0x7A1E2A, 0x2A3A5A, 0xC8B88A],
tins: [0xB8862E, 0x7A1E22, 0x2E4A2E, 0x1E3A5A, 0xE8D8B0], flowers: [0xE84A6A, 0xF4D03A, 0xE8E0F0, 0xA84AE8, 0xF47A3A], mixed: [0xA88A5A, 0x6A9A5A, 0x8A4A3A, 0xC8C0A0, 0x3A6A8A] };
var cols = COLS[kind] || COLS.mixed;
shelfY.forEach(function (y, si) {
var x = -1.05, top = y + 0.02;
while (x < 1.0) {
var c = cols[Math.floor(r() * cols.length)], w;
if (kind === "jars") {
w = 0.16 + r() * 0.06;
var hgt = 0.18 + r() * 0.14;
add(new THREE.CylinderGeometry(w / 2, w / 2, hgt, 10), spM(c, "glass"), x + w / 2, top + hgt / 2, 0.02);
add(new THREE.CylinderGeometry(w / 2.4, w / 2.4, 0.04, 10), woodD, x + w / 2, top + hgt + 0.02, 0.02);
if (r() < 0.25) {
add(new THREE.ConeGeometry(0.06, 0.3, 6), spM(0x6A7A3A), x + w / 2, y + 0.42, 0.12, Math.PI);
}
}
else if (kind === "cloth") {
w = 0.22;
add(new THREE.CylinderGeometry(0.1, 0.1, 0.38, 12), spM(c), x + w / 2, top + 0.1, 0.02, Math.PI / 2, 0, 0);
if (si < 2 && r() < 0.5)
add(new THREE.CylinderGeometry(0.1, 0.1, 0.38, 12), spM(cols[(Math.floor(r() * cols.length))]), x + w / 2, top + 0.3, 0.02, Math.PI / 2, 0, 0);
}
else if (kind === "shoes") {
w = 0.36;
[-0.08, 0.08].forEach(function (o) { add(new THREE.BoxGeometry(0.1, 0.09, 0.28), spM(c), x + w / 2 + o, top + 0.045, 0.02); add(new THREE.BoxGeometry(0.1, 0.14, 0.1), spM(c), x + w / 2 + o, top + 0.11, -0.08); });
}
else if (kind === "books") {
w = 0.035 + r() * 0.04;
var bh = 0.26 + r() * 0.14;
add(new THREE.BoxGeometry(w, bh, 0.3), spM(c), x + w / 2, top + bh / 2, 0.0, 0, 0, r() < 0.08 ? 0.18 : 0);
}
else if (kind === "candles") {
w = 0.1;
var ch = 0.15 + r() * 0.3;
add(new THREE.CylinderGeometry(0.035, 0.04, ch, 8), spM(c), x + w / 2, top + ch / 2, 0.04);
}
else if (kind === "bottles") {
w = 0.12;
add(new THREE.CylinderGeometry(0.045, 0.045, 0.24, 10), spM(c, "glass"), x + w / 2, top + 0.12, 0.02);
add(new THREE.CylinderGeometry(0.015, 0.03, 0.1, 8), spM(c, "glass"), x + w / 2, top + 0.29, 0.02);
}
else if (kind === "gems") {
w = 0.3;
add(new THREE.BoxGeometry(0.24, 0.08, 0.2), spM(0x4A1A2A), x + w / 2, top + 0.04, 0.04);
add(new THREE.OctahedronGeometry(0.05), spM(c, "shine"), x + w / 2, top + 0.13, 0.04);
}
else if (kind === "toys") {
w = 0.22;
var t = Math.floor(r() * 3);
if (t === 0)
add(new THREE.BoxGeometry(0.15, 0.15, 0.15), spM(c), x + w / 2, top + 0.075, 0.04, 0, r(), 0);
else if (t === 1)
add(new THREE.SphereGeometry(0.08, 10, 8), spM(c), x + w / 2, top + 0.08, 0.04);
else {
add(new THREE.CylinderGeometry(0.06, 0.08, 0.18, 8), spM(c), x + w / 2, top + 0.09, 0.04);
add(new THREE.SphereGeometry(0.06, 8, 6), spM(0xF0D8B8), x + w / 2, top + 0.23, 0.04);
}
}
else if (kind === "pots") {
w = 0.26;
add(new THREE.CylinderGeometry(0.07, 0.1, 0.22, 12), spM(c), x + w / 2, top + 0.11, 0.03);
add(new THREE.SphereGeometry(0.1, 12, 8, 0, 6.29, 0, 1.6), spM(c), x + w / 2, top + 0.17, 0.03);
}
else if (kind === "tools") {
w = 0.24;
add(new THREE.CylinderGeometry(0.015, 0.015, 0.36, 6), woodD, x + w / 2, top + 0.04, 0.05, 0, 0, Math.PI / 2);
add(new THREE.BoxGeometry(0.06, 0.06, 0.12), spM(c, "shine"), x + w / 2 + 0.16, top + 0.04, 0.05);
}
else if (kind === "hats") {
w = 0.36;
add(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 16), spM(c), x + w / 2, top + 0.01, 0.03);
add(new THREE.CylinderGeometry(0.09, 0.1, 0.14, 16), spM(c), x + w / 2, top + 0.08, 0.03);
}
else if (kind === "tins") {
w = 0.14;
add(new THREE.CylinderGeometry(0.055, 0.055, 0.15, 12), spM(c, "shine"), x + w / 2, top + 0.075, 0.03);
}
else if (kind === "flowers") {
w = 0.22;
add(new THREE.CylinderGeometry(0.07, 0.06, 0.16, 10), spM(0x8A5A3A), x + w / 2, top + 0.08, 0.03);
add(new THREE.SphereGeometry(0.1, 8, 6), spM(c), x + w / 2, top + 0.24, 0.03);
add(new THREE.SphereGeometry(0.09, 8, 6), spM(0x3A7A3A), x + w / 2 + 0.04, top + 0.2, 0.0);
}
else {
w = 0.2 + r() * 0.1;
if (r() < 0.5)
add(new THREE.BoxGeometry(w * 0.9, 0.18 + r() * 0.1, 0.26), spM(c), x + w / 2, top + 0.12, 0.02);
else
add(new THREE.CylinderGeometry(0.07, 0.07, 0.2, 10), spM(c, "glass"), x + w / 2, top + 0.1, 0.03);
}
x += w + 0.02 + r() * 0.04;
}
});
if (typeof psMerge === "function") {
try {
var mg = psMerge(g);
if (mg)
g = mg;
}
catch (e) { }
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (c, role) {
var col = new THREE.Color(c), hsl = {};
col.getHSL(hsl);
if (role === "floor") {
if (hsl.s > 0.45 && (hsl.h < 0.05 || hsl.h > 0.92))
return null;
if (hsl.h > 0.04 && hsl.h < 0.14 && hsl.s > 0.3 && hsl.l < 0.5)
return "wood";
if (hsl.l > 0.72)
return "marble";
if (hsl.s < 0.25)
return "paving";
return "floortile";
}
if (role === "ceil") {
if (hsl.l < 0.22)
return null;
return hsl.h > 0.04 && hsl.h < 0.14 && hsl.s > 0.3 && hsl.l < 0.45 ? "wood" : "plaster";
}
if (hsl.h > 0.04 && hsl.h < 0.14 && hsl.s > 0.3 && hsl.l < 0.42)
return "wood";
if (hsl.s < 0.2 && hsl.l < 0.7)
return "stone";
if (hsl.l > 0.8)
return "marble";
return "plaster";
},
function (mat, kind) {
var c = mat.color.getHex(), key = c + "|" + kind;
if (SP_SURFMAT[key])
return SP_SURFMAT[key];
var tx = (typeof texOf === "function") ? texOf(kind) : null;
if (!tx)
return null;
var col = new THREE.Color(c);
if (kind !== "wood")
col.lerp(new THREE.Color(0xFFFFFF), 0.18);
var m = new THREE.MeshLambertMaterial({ color: col, map: tx });
return (SP_SURFMAT[key] = m);
},
function (I) {
if (!I || !I.root || I.spFinished || typeof metreUVs !== "function")
return;
I.spFinished = true;
var fl = I.floor || 3.5;
I.root.traverse(function (m) {
if (!m.isMesh || !m.geometry || m.geometry.type !== "BoxGeometry" || m.userData.furn || m.userData.liveDone)
return;
var mt = m.material;
if (!mt || Array.isArray(mt) || mt.map || !mt.color || mt.transparent || mt.isMeshBasicMaterial)
return;
var p = m.geometry.parameters, s = m.scale, w = p.width * s.x, h = p.height * s.y, d = p.depth * s.z, y = m.position.y, role = null;
if (h <= 0.45 && w > 2.5 && d > 2.5)
role = (y > 2) ? ((Math.abs(y - Math.round(y / fl) * fl) < 0.4) ? "floor" : "ceil") : "floor";
else if (h >= 2 && Math.min(w, d) <= 0.7 && Math.max(w, d) >= 1.2)
role = "wall";
else if (w > 3 && d > 3 && h > 0.45 && h < 1.2 && y < 0)
role = "floor";
if (!role)
return;
var kind = spSurfKind(mt.color.getHex(), role);
if (!kind)
return;
var nm = spSurfMat(mt, kind);
if (!nm)
return;
try {
m.geometry = m.geometry.clone();
metreUVs(m.geometry, "box", [w, h, d]);
}
catch (e) {
return;
}
m.material = nm;
});
},
function (I, opt) {
opt = opt || {};
var ph = opt.h || 1.6, panel = new THREE.MeshLambertMaterial({ color: 0x5A3A22, map: (typeof texOf === "function") ? texOf("wood") : null }), rail = new THREE.MeshLambertMaterial({ color: 0x3E2814 }), corn = new THREE.MeshLambertMaterial({ color: 0x8C857A, map: (typeof texOf === "function") ? texOf("stone") : null });
var add = [];
I.root.children.forEach(function (m) {
if (!m.isMesh || !m.geometry || m.geometry.type !== "BoxGeometry" || m.userData.furn || m.userData.liveDone)
return;
var p = m.geometry.parameters, w = p.width, h = p.height, d = p.depth, base = m.position.y - h / 2;
if (h < (opt.minH || 3) || Math.min(w, d) > 0.7 || Math.max(w, d) < 1.2 || base > 0.3)
return;
var horiz = w > d, len = horiz ? w : d;
var g1 = new THREE.BoxGeometry(horiz ? len : w + 0.1, ph, horiz ? d + 0.1 : len);
if (typeof metreUVs === "function")
metreUVs(g1, "box", [horiz ? len : w + 0.1, ph, horiz ? d + 0.1 : len]);
var a = new THREE.Mesh(g1, panel);
a.position.set(m.position.x, base + ph / 2, m.position.z);
a.userData.liveDone = 1;
add.push(a);
var b = new THREE.Mesh(new THREE.BoxGeometry(horiz ? len : w + 0.16, 0.08, horiz ? d + 0.16 : len), rail);
b.position.set(m.position.x, base + ph + 0.04, m.position.z);
b.userData.liveDone = 1;
add.push(b);
var c = new THREE.Mesh(new THREE.BoxGeometry(horiz ? len : w + 0.06, 0.12, horiz ? d + 0.06 : len), rail);
c.position.set(m.position.x, base + 0.06, m.position.z);
c.userData.liveDone = 1;
add.push(c);
if (opt.cornice) {
var top = base + h;
var e = new THREE.Mesh(new THREE.BoxGeometry(horiz ? len : w + 0.3, 0.35, horiz ? d + 0.3 : len), corn);
e.position.set(m.position.x, top - 0.5, m.position.z);
e.userData.liveDone = 1;
add.push(e);
}
});
add.forEach(function (m) { m.raycast = function () { }; I.root.add(m); });
},
function (I) {
if (!I || !I.academy || I.spAc)
return;
I.spAc = true;
var root = I.root, H = AC_H;
spPanelWalls(I, { h: 1.7, minH: 4, cornice: true });
var stone = new THREE.MeshLambertMaterial({ color: 0x9A9286, map: (typeof texOf === "function") ? texOf("stone") : null }), gold = tlm(0xC9A040);
function add(geo, mat, x, y, z, ry) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; m.raycast = function () { }; root.add(m); return m; }
for (var z = -18; z <= 28; z += 5) {
var arch = new THREE.Mesh(new THREE.TorusGeometry(15.6, 0.32, 8, 40, Math.PI), stone);
arch.position.set(0, H - 6.2, z);
arch.scale.y = 0.38;
arch.raycast = function () { };
root.add(arch);
[-15.5, 15.5].forEach(function (x) { add(new THREE.BoxGeometry(0.9, 0.6, 0.9), stone, x, H - 6.4, z); add(new THREE.CylinderGeometry(0.22, 0.22, H - 6.4, 10), stone, x + (x < 0 ? 0.3 : -0.3), (H - 6.4) / 2, z); });
}
[-7, 0, 7].forEach(function (x) { add(new THREE.BoxGeometry(2.2, 0.03, 40), tlm(0x7A1E22), x, 0.025, 6); add(new THREE.BoxGeometry(2.0, 0.035, 39.8), gold, x, 0.028, 6); add(new THREE.BoxGeometry(1.8, 0.04, 39.6), tlm(0x7A1E22), x, 0.031, 6); });
function chandelier(x, z, y) { spChandelier(root, x, z, y, H); }
chandelier(0, 38, 6.5);
chandelier(-6, -36.5, 6.5);
chandelier(6, -36.5, 6.5);
[-19, 19].forEach(function (x) { for (var z = -30; z <= 40; z += 14)
chandelier(x, z, 6.8); });
var cand = null;
root.children.forEach(function (m) { if (m.isInstancedMesh && m.count === 120 && m.geometry.type === "CylinderGeometry")
cand = m; });
if (cand && typeof festGlowTex === "function" || cand) {
var n = cand.count, pos = new Float32Array(n * 3), g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var tex = (typeof festGlowTex === "function") ? festGlowTex() : null;
var pm = new THREE.PointsMaterial({ color: 0xFFC870, size: 0.9, map: tex, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
var P = new THREE.Points(g, pm);
P.frustumCulled = false;
P.raycast = function () { };
root.add(P);
I.spAcGlow = { cand: cand, P: P, m: new THREE.Matrix4(), v: new THREE.Vector3() };
}
},
function (root, x, z, y, H) {
var g = new THREE.Group();
g.position.set(x, y, z);
root.add(g);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.06, 6, 24), tlm(0x2A2A2E));
ring.rotation.x = Math.PI / 2;
g.add(ring);
var ch = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, H - y, 4), tlm(0x2A2A2E));
ch.position.y = (H - y) / 2;
g.add(ch);
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2;
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.22, 6), tlm(0xF4EAD0));
c.position.set(Math.cos(a) * 1.1, 0.14, Math.sin(a) * 1.1);
g.add(c);
var f = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 5), tlm(0xFFB23A, "glow"));
f.position.set(Math.cos(a) * 1.1, 0.31, Math.sin(a) * 1.1);
g.add(f);
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (C, w, d, x, z) {
var along = w > d, oak = tlm(0x6A4428), oakD = tlm(0x3E2814), g = new THREE.Group();
g.position.set(x, 0, z);
if (!along)
g.rotation.y = Math.PI / 2;
var L = Math.max(w, d), D = Math.min(w, d);
function P(geo, mat, px, py, pz) { var m = new THREE.Mesh(geo, mat); m.position.set(px, py, pz); g.add(m); return m; }
P(new THREE.BoxGeometry(L, 0.06, D * 0.75), oak, 0, 0.76, -D * 0.12);
P(new THREE.BoxGeometry(L - 0.1, 0.3, 0.04), oakD, 0, 0.58, -D * 0.48);
[-1, 1].forEach(function (s) { P(new THREE.BoxGeometry(0.06, 0.74, D * 0.7), oakD, s * (L / 2 - 0.06), 0.37, -D * 0.12); });
P(new THREE.BoxGeometry(L, 0.05, 0.32), oak, 0, 0.45, D * 0.42);
[-1, 1].forEach(function (s) { P(new THREE.BoxGeometry(0.05, 0.45, 0.3), oakD, s * (L / 2 - 0.08), 0.22, D * 0.42); });
P(new THREE.BoxGeometry(0.22, 0.04, 0.3), tlm(0x7A1E22), -L * 0.22, 0.81, -D * 0.1);
P(new THREE.CylinderGeometry(0.03, 0.035, 0.06, 8), tlm(0x1A1A2A), L * 0.25, 0.82, -D * 0.25);
P(new THREE.BoxGeometry(0.3, 0.005, 0.22), tlm(0xE8DCC0), L * 0.05, 0.795, -D * 0.1);
g.traverse(function (m) { m.raycast = function () { }; });
C.root.add(g);
C.solid(x, z, w / 2, d / 2, 0.8);
return g;
}
];
});
