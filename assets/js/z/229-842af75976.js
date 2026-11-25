/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(229, function () {
return [
function (id, i, role, col) {
var L = (typeof randomLook === "function") ? randomLook(id, "human") : {};
L.sex = i % 2 ? "m" : "f";
var c = col || FEST_COLS[i % 6];
L.top = c;
L.bottom = [0xFFFFFF, 0x1A1A22, 0xFFD040][i % 3];
L.layer = (role === "drum" || role === "horn" || role === "major") ? "uniform" : "tunic";
L.layerColor = (role === "drum" || role === "horn" || role === "major") ? 0xC8283A : FEST_COLS[(i + 2) % 6];
L.hat = (role === "drum" || role === "horn") ? "cap" : role === "major" ? "tophat" : role === "stilt" ? "tophat" : (i % 3 === 0 ? "crown" : null);
L.hatColor = (role === "drum" || role === "horn") ? 0xC8283A : 0xFFD040;
L.back = (role === "dance" || role === "acro") ? "cape" : null;
L.backColor = FEST_COLS[(i + 3) % 6];
var g = buildFigure({ id: "__" + id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
if (role === "stilt") {
g.scale.setScalar(1.45);
}
if (role === "drum") {
var dr = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.32, 14), fM(0xF4ECD8));
dr.position.set(0, 1.0, 0.32);
dr.rotation.x = Math.PI / 2;
g.add(dr);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 6, 16), fM(0xC8283A));
rim.position.set(0, 1.0, 0.48);
g.add(rim);
}
if (role === "horn") {
var bell = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.55, 12, 1, true), new THREE.MeshLambertMaterial({ color: 0xE8C040, side: THREE.DoubleSide }));
bell.rotation.x = -Math.PI / 2;
bell.position.set(0.05, 1.52, 0.5);
g.add(bell);
}
if (role === "major") {
var bat = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.2, 6), fM(0xFFFFFF));
bat.position.set(0.35, 1.6, 0.2);
g.add(bat);
var knob = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), fM(0xFFD040));
knob.position.set(0.35, 2.2, 0.2);
g.add(knob);
g.userData.baton = bat;
}
if (role === "flag") {
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.2, 6), fM(0xE8E0D0));
pole.position.set(0.32, 1.7, 0.1);
g.add(pole);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.6), new THREE.MeshLambertMaterial({ color: FEST_COLS[(i + 1) % 6], side: THREE.DoubleSide }));
fl.position.set(0.32 + 0.45, 2.45, 0.1);
g.add(fl);
g.userData.flag = fl;
}
if (role === "juggle") {
for (var b = 0; b < 3; b++) {
var fb = new THREE.Group();
var core = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFFE0A0 }));
var flame = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 8), new THREE.MeshBasicMaterial({ color: 0xFF9A3A, transparent: true, opacity: 0.85, depthWrite: false }));
flame.position.y = 0.14;
fb.add(core);
fb.add(flame);
fb.userData.jb = b;
g.add(fb);
}
}
if (role === "dance") {
var mk = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), fM(i % 2 ? 0xFFD040 : 0xC8A0E8));
mk.rotation.x = Math.PI / 2;
mk.scale.set(1.2, 0.6, 0.5);
mk.position.set(0, 1.62, 0.12);
g.add(mk);
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (w, l, col) {
var g = new THREE.Group();
var deck = new THREE.Mesh(new THREE.BoxGeometry(w, 0.5, l), fM(col));
deck.position.y = 0.95;
g.add(deck);
var sk = festStripes("#" + new THREE.Color(col).getHexString(), "#FFD040", 16);
sk.repeat.set(3, 1);
var skirt = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.75, l + 0.1), new THREE.MeshLambertMaterial({ map: sk }));
skirt.position.y = 0.38;
g.add(skirt);
[[0, w / 2], [0, -w / 2]].forEach(function (q) { var r = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, l), fM(0xE8C040)); r.position.set(q[1], 1.5, 0); g.add(r); });
for (var k = 0; k <= 6; k++) {
[-1, 1].forEach(function (sd) { var post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), fM(0xE8C040)); post.position.set(sd * w / 2, 1.25, -l / 2 + k * l / 6); g.add(post); });
}
return g;
},
function (col, horn) {
var g = new THREE.Group(), m = fM(col), gold = fM(0xE8C040);
var body = new THREE.Mesh(new THREE.SphereGeometry(0.45, 14, 10), m);
body.scale.set(0.75, 0.7, 1.45);
g.add(body);
var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.75, 10), m);
neck.position.set(0, 0.42, 0.5);
neck.rotation.x = -0.6;
g.add(neck);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), m);
head.scale.set(0.8, 0.85, 1.5);
head.position.set(0, 0.75, 0.82);
head.rotation.x = 0.4;
g.add(head);
for (var k = 0; k < 4; k++) {
var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.75, 6), m);
leg.position.set(k % 2 ? 0.18 : -0.18, -0.5, k < 2 ? 0.38 : -0.38);
leg.rotation.x = k < 2 ? -0.5 : 0.5;
g.add(leg);
}
var mane = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.4), gold);
mane.position.set(0, 0.62, 0.46);
mane.rotation.x = -0.6;
g.add(mane);
var saddle = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.12, 0.5), fM(0xC8283A));
saddle.position.y = 0.33;
g.add(saddle);
if (horn) {
var hn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.4, 8), gold);
hn.position.set(0, 1.02, 0.98);
hn.rotation.x = 0.9;
g.add(hn);
}
return g;
},
function (ti) {
var g = new THREE.Group(), gold = fM(0xE8C040);
function add(geo, mat, x, y, z, rx, ry, rz) { var o = new THREE.Mesh(geo, mat); o.position.set(x || 0, y || 0, z || 0); o.rotation.set(rx || 0, ry || 0, rz || 0); g.add(o); return o; }
function glow(c) { return new THREE.MeshBasicMaterial({ color: c }); }
function star(r) { var sh = new THREE.Shape(); for (var k = 0; k < 10; k++) {
var rr = k % 2 ? r * 0.45 : r, a = k / 10 * Math.PI * 2 + Math.PI / 2;
if (k === 0)
sh.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
else
sh.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
} return new THREE.ExtrudeGeometry(sh, { depth: r * 0.25, bevelEnabled: false }); }
function moon(r) { return new THREE.ExtrudeGeometry(festCrescent(r), { depth: r * 0.3, bevelEnabled: false, curveSegments: 24 }); }
switch (ti) {
case 0:
add(new THREE.BoxGeometry(3, 2.4, 3), fM(0xC8283A), 0, 2.4, 0);
add(new THREE.BoxGeometry(3.1, 2.5, 0.4), gold, 0, 2.4, 0);
add(new THREE.BoxGeometry(0.4, 2.5, 3.1), gold, 0, 2.4, 0);
add(new THREE.TorusGeometry(0.6, 0.15, 8, 16), gold, -0.5, 3.9, 0, 0, 0, 0.6);
add(new THREE.TorusGeometry(0.6, 0.15, 8, 16), gold, 0.5, 3.9, 0, 0, 0, -0.6);
for (var s0 = 0; s0 < 6; s0++) {
var a0 = s0 / 6 * Math.PI * 2;
add(new THREE.CylinderGeometry(0.03, 0.03, 2.5, 5), gold, Math.cos(a0) * 0.9, 5, Math.sin(a0) * 0.9, Math.sin(a0) * 0.4, 0, -Math.cos(a0) * 0.4);
add(star(0.45), glow(FEST_COLS[s0]), Math.cos(a0) * 1.4, 6.2, Math.sin(a0) * 1.4);
}
break;
case 1:
for (var l1 = 0; l1 < 9; l1++) {
var x1 = (l1 % 3 - 1) * 1.2, z1 = (Math.floor(l1 / 3) - 1) * 2.4, h1 = 2.6 + (l1 % 2) * 1.4;
add(new THREE.CylinderGeometry(0.02, 0.02, h1, 5), gold, x1, 1.2 + h1 / 2, z1);
add(new THREE.CylinderGeometry(0.42, 0.42, 0.9, 12), glow([0xFF5A3A, 0xFFC83A, 0xFF8A2A][l1 % 3]), x1, 1.2 + h1 + 0.4, z1);
add(new THREE.CylinderGeometry(0.46, 0.46, 0.08, 12), gold, x1, 1.2 + h1 + 0.88, z1);
}
break;
case 2:
add(new THREE.SphereGeometry(1.2, 16, 12), fM(0xC8283A), 0, 2.8, 1.5).scale.set(1, 0.8, 1.5);
add(new THREE.BoxGeometry(1.8, 0.5, 1.8), fM(0xC8283A), 0, 2.0, 2.8);
[-0.6, 0.6].forEach(function (x) { add(new THREE.ConeGeometry(0.2, 1.3, 8), gold, x, 4.1, 1.0, -0.5); add(new THREE.SphereGeometry(0.25, 10, 8), fM(0xFFFFFF), x, 3.3, 2.6); });
for (var c2 = 0; c2 < 20; c2++)
add(new THREE.CylinderGeometry(0.22, 0.22, 0.06, 12), gold, Math.sin(c2 * 2.3) * 1.2, 1.25 + 0.06 * (c2 % 5), -2 + Math.cos(c2 * 1.7) * 1.2);
break;
case 3:
[[-1.1, 0xFFD040, 1], [1.1, 0xC8A0E8, -1]].forEach(function (q) {
var f = add(new THREE.SphereGeometry(1.3, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), fM(q[1]), q[0], 3.6, 0, Math.PI / 2, 0, q[2] * 0.2);
f.scale.set(1, 0.5, 1.25);
[-0.42, 0.42].forEach(function (ex) { add(new THREE.SphereGeometry(0.2, 10, 8), fM(0x1A0A2A), q[0] + ex, 3.85, 0.62).scale.set(1.3, 0.8, 0.4); });
var mo = add(new THREE.TorusGeometry(0.4, 0.08, 6, 16, Math.PI), fM(0x1A0A2A), q[0], 3.1, 0.62);
mo.rotation.z = q[2] > 0 ? Math.PI : 0;
});
add(new THREE.CylinderGeometry(0.08, 0.08, 3, 6), gold, 0, 2.5, -0.4);
break;
case 4:
add(moon(1.8), fM(0xFFE8A0), -0.4, 4.2, 0, 0, Math.PI / 2, 0);
for (var s4 = 0; s4 < 7; s4++) {
var hh = 2.2 + ((s4 * 37) % 5) * 0.6;
add(new THREE.CylinderGeometry(0.02, 0.02, hh, 5), gold, (s4 % 2 ? 1 : -1) * 1.3, 1.2 + hh / 2, -3 + s4);
add(star(0.38), glow(0xFFF4C0), (s4 % 2 ? 1 : -1) * 1.3, 1.3 + hh, -3 + s4, 0, Math.PI / 2, 0);
}
break;
case 5:
add(new THREE.CircleGeometry(2.2, 32), glow(0xFF9A3A), 0, 4.6, -1.5, 0, 0, 0);
add(new THREE.CircleGeometry(2.2, 32), glow(0xFF9A3A), 0, 4.6, -1.52, 0, Math.PI, 0);
for (var w5 = 0; w5 < 6; w5++) {
var sx = (w5 % 3 - 1) * 1.1, sz = 1 + Math.floor(w5 / 3) * 1.6;
add(new THREE.ConeGeometry(0.4, 1.4, 8), fM(0xD8B048), sx, 1.9, sz, Math.PI);
add(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 8), fM(0xA8782A), sx, 1.5, sz);
}
for (var p5 = 0; p5 < 5; p5++) {
add(new THREE.SphereGeometry(0.42, 12, 8), fM(0xE87A2A), -1.4 + p5 * 0.7, 1.5, -3.6).scale.set(1.2, 0.85, 1.2);
}
break;
case 6:
for (var q6 = 0; q6 < 26; q6++) {
var r6 = q6 < 1 ? 0 : q6 < 7 ? 0.7 : q6 < 15 ? 1.1 : q6 < 21 ? 0.8 : 0.4, lay = q6 < 1 ? 0 : q6 < 7 ? 1 : q6 < 15 ? 2 : q6 < 21 ? 3 : 4, aa = q6 * 2.39;
add(new THREE.SphereGeometry(0.45, 10, 8), fM(0x6A2A7A), Math.cos(aa) * r6, 5.4 - lay * 0.62, -1 + Math.sin(aa) * r6);
}
var amph = new THREE.LatheGeometry([[0.1, 0], [0.6, 0.3], [0.8, 1.0], [0.55, 1.8], [0.3, 2.1], [0.4, 2.4]].map(function (p) { return new THREE.Vector2(p[0], p[1]); }), 16);
add(amph, fM(0xB8602A), 0, 1.2, 2.2);
break;
case 7:
FEST_COLS.slice(0, 6).forEach(function (c, k) { add(new THREE.TorusGeometry(3.2 - k * 0.25, 0.12, 6, 32, Math.PI), fM(c), 0, 1.2, 0, 0, Math.PI / 2, 0); });
for (var p7 = 0; p7 < 4; p7++) {
add(new THREE.CylinderGeometry(0.4, 0.35, 0.6, 12), fM(0xE8E0D0), (p7 % 2 ? 0.9 : -0.9), 1.5, (p7 < 2 ? -2 : 2));
add(new THREE.CylinderGeometry(0.38, 0.38, 0.05, 12), fM(FEST_COLS[p7]), (p7 % 2 ? 0.9 : -0.9), 1.81, (p7 < 2 ? -2 : 2));
}
break;
case 8:
add(new THREE.CircleGeometry(1.8, 32), glow(0xFFB03A), 0, 4.6, 0, 0, Math.PI / 2, 0);
add(new THREE.CircleGeometry(1.8, 32), glow(0xFFB03A), 0, 4.6, 0, 0, -Math.PI / 2, 0);
for (var r8 = 0; r8 < 12; r8++) {
var a8 = r8 / 12 * Math.PI * 2;
add(new THREE.ConeGeometry(0.25, 1, 4), glow(0xFF7A2A), 0, 4.6 + Math.sin(a8) * 2.4, Math.cos(a8) * 2.4, -a8 + Math.PI / 2, 0, 0);
}
[-3, 3].forEach(function (z) { add(new THREE.CylinderGeometry(0.5, 0.3, 0.7, 10), fM(0x3A2A22), 0, 1.55, z); add(new THREE.ConeGeometry(0.45, 1.1, 10), new THREE.MeshBasicMaterial({ color: 0xFF8A2A, transparent: true, opacity: 0.85, depthWrite: false }), 0, 2.4, z); });
break;
case 9:
var hull = add(new THREE.BoxGeometry(2.2, 1, 5), fM(0x6A4228), 0, 1.7, 0);
add(new THREE.ConeGeometry(1.1, 1.4, 4), fM(0x6A4228), 0, 1.7, 3.1, Math.PI / 2, Math.PI / 4, 0);
add(new THREE.CylinderGeometry(0.08, 0.08, 4.5, 6), fM(0x5A3A22), 0, 4.2, 0);
add(new THREE.PlaneGeometry(2.4, 2.2), new THREE.MeshLambertMaterial({ color: 0xF4ECD8, side: THREE.DoubleSide }), 0, 4.4, 0.05, 0, Math.PI / 2, 0);
var wh = add(new THREE.SphereGeometry(0.9, 14, 10), fM(0x3A5A8A), 1.2, 1.7, -3.4);
wh.scale.set(0.9, 0.75, 1.6);
add(new THREE.ConeGeometry(0.2, 1.4, 8, 1, true), new THREE.MeshBasicMaterial({ color: 0xC8E8FF, transparent: true, opacity: 0.6, side: THREE.DoubleSide }), 1.2, 3.0, -3.0, Math.PI);
[-0.9, 0.9].forEach(function (x) { var tail = add(new THREE.ConeGeometry(0.22, 1, 8), fM(0x2AA88A), x, 1.7, -1.6, 0.3); var mm = frpFig("mermaid" + x, x > 0 ? 2 : 4, "dance", 0x2AA88A); mm.position.set(x, 1.2, -1.6); mm.scale.setScalar(0.9); g.add(mm); });
break;
case 10:
var t10 = festStripes("#C8283A", "#FFF4E0", 16);
t10.repeat.set(2, 1);
add(new THREE.ConeGeometry(2.2, 2.4, 16, 1, true), new THREE.MeshLambertMaterial({ map: t10, side: THREE.DoubleSide }), 0, 4.4, 0);
add(new THREE.CylinderGeometry(2.2, 2.2, 2.2, 16, 1, true), new THREE.MeshLambertMaterial({ map: t10, side: THREE.DoubleSide }), 0, 2.3, 0);
add(new THREE.ConeGeometry(0.15, 0.5, 4), fM(0xFFD040), 0, 5.9, 0);
var rm = frpFig("ringmaster", 1, "major", 0xC8283A);
rm.position.set(0, 1.2, 3);
g.add(rm);
add(new THREE.SphereGeometry(0.45, 12, 8), fM(0x3A3A44), 0, 1.6, -3.2).scale.set(0.7, 1.4, 0.7);
add(new THREE.SphereGeometry(0.3, 12, 8), fM(0x3A8AE8), 0, 2.6, -3.2);
break;
case 11:
var lyre = new THREE.TorusGeometry(1.4, 0.14, 8, 24, Math.PI * 1.3);
add(lyre, gold, 0, 3.6, 0, 0, Math.PI / 2, -Math.PI * 0.15 - Math.PI / 2);
for (var s11 = 0; s11 < 6; s11++)
add(new THREE.CylinderGeometry(0.02, 0.02, 2.2, 4), fM(0xFFF4E0), 0, 3.5, -0.75 + s11 * 0.3);
for (var n11 = 0; n11 < 5; n11++) {
var nx = (n11 % 2 ? 1 : -1) * 1.2, ny = 2.4 + n11 * 0.6, nz = -3 + n11 * 1.5;
add(new THREE.SphereGeometry(0.25, 10, 8), fM(0x1A1A22), nx, ny, nz).scale.set(1.3, 0.9, 0.6);
add(new THREE.CylinderGeometry(0.04, 0.04, 1, 5), fM(0x1A1A22), nx + 0.28, ny + 0.5, nz);
}
break;
case 12:
add(new THREE.CylinderGeometry(1.2, 1.2, 1, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0x8A8A90, side: THREE.DoubleSide }), 0, 1.7, 0);
add(new THREE.CircleGeometry(1.15, 16), glow(0x3A8AE8), 0, 1.9, 0, -Math.PI / 2);
[-1, 1].forEach(function (x) { add(new THREE.CylinderGeometry(0.07, 0.07, 2.2, 6), fM(0x6A4228), x, 3, 0); });
add(new THREE.ConeGeometry(1.6, 0.9, 4), fM(0x8A2A2A), 0, 4.5, 0, 0, Math.PI / 4, 0);
for (var w12 = 0; w12 < 6; w12++)
add(star(0.3), glow(0xFFF4C0), Math.sin(w12 * 1.9) * 1.5, 5.4 + w12 * 0.4, -2.5 + w12);
break;
default:
add(new THREE.CylinderGeometry(1.6, 1.6, 1.4, 24, 1, true), new THREE.MeshLambertMaterial({ color: 0xE8C040, side: THREE.DoubleSide }), 0, 2.6, 0);
for (var c13 = 0; c13 < 8; c13++) {
var a13 = c13 / 8 * Math.PI * 2;
add(new THREE.ConeGeometry(0.28, 1, 6), gold, Math.cos(a13) * 1.6, 3.8, Math.sin(a13) * 1.6);
add(new THREE.SphereGeometry(0.18, 10, 8), glow(FEST_COLS[c13 % 6]), Math.cos(a13) * 1.62, 2.6, Math.sin(a13) * 1.62);
}
for (var s13 = 0; s13 < 6; s13++)
add(star(0.35), glow(0xFFE890), (s13 % 2 ? 1 : -1) * 1.4, 4.6 + (s13 % 3) * 0.6, -3.6 + s13 * 1.4, 0, Math.PI / 2, 0);
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (kind) {
var g = new THREE.Group(), y = 10;
function bm(c) { return new THREE.MeshLambertMaterial({ color: c, emissive: c, emissiveIntensity: 0.15 }); }
if (kind === "dragon") {
for (var k = 0; k < 7; k++) {
var s = k === 0 ? 1.5 : 1.25 - k * 0.1;
var b = new THREE.Mesh(new THREE.SphereGeometry(s, 14, 10), bm(k % 2 ? 0x2AA84A : 0x6AE87A));
b.position.set(0, y + Math.sin(k * 0.9) * 0.6, -k * 1.9);
g.add(b);
}
[-0.6, 0.6].forEach(function (x) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), bm(0xFFFFFF)); e.position.set(x, y + 0.6, 1.2); g.add(e); var hn = new THREE.Mesh(new THREE.ConeGeometry(0.25, 1.1, 8), bm(0xFFD040)); hn.position.set(x, y + 1.6, 0.2); g.add(hn); });
[-1, 1].forEach(function (sd) { var w = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 8), bm(0x6AE87A)); w.scale.set(1.4, 0.2, 0.8); w.position.set(sd * 2.2, y + 0.8, -3); w.rotation.z = sd * 0.3; g.add(w); });
}
else if (kind === "moon") {
var sh = festCrescent(2.4);
var m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 1.2, bevelEnabled: true, bevelSize: 0.3, bevelThickness: 0.3, curveSegments: 24 }), bm(0xFFE8A0));
m.position.set(0, y, -0.6);
m.rotation.y = Math.PI / 2;
g.add(m);
var cap = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.6, 10), bm(0x3A3A9A));
cap.position.set(0, y + 2.4, -1.4);
cap.rotation.x = 0.5;
g.add(cap);
}
else {
var u = frpHorse(0xFFFFFF, true);
u.scale.setScalar(3.2);
u.position.y = y;
g.add(u);
var mane = new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 8), bm(0xFF8AC8));
mane.scale.set(0.4, 1, 1.2);
mane.position.set(0, y + 1.9, 1.2);
g.add(mane);
}
var lm = new THREE.LineBasicMaterial({ color: 0xE8E0D0 });
[[-1.5, 1.2], [1.5, 1.2], [-1.5, -3], [1.5, -3]].forEach(function (q) { var ge = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(q[0], 1.4, q[1]), new THREE.Vector3(q[0] * 0.3, y - 1, q[1] * 0.5)]); g.add(new THREE.Line(ge, lm)); });
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function () {
var g = frpFloat(4.4, 9, 0x5A1A7A), gold = fM(0xE8C040);
var steps = [[1.6, 2.2], [1.3, 2.0], [1.0, 1.8], [0.75, 1.6], [0.5, 1.4]], y = 1.2;
steps.forEach(function (s, i) { var t = new THREE.Mesh(new THREE.CylinderGeometry(s[0] * 0.92, s[0], s[1], 12), i % 2 ? fM(0xF4ECD8) : gold); t.position.set(0, y + s[1] / 2, -1); g.add(t); y += s[1]; });
var spire = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.6, 12), gold);
spire.position.set(0, y + 0.8, -1);
g.add(spire);
var crown = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.5, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0xFFD040, side: THREE.DoubleSide }));
crown.position.set(0, y + 1.9, -1);
g.add(crown);
for (var k = 0; k < 6; k++) {
var a = k / 6 * Math.PI * 2, pt = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 5), gold);
pt.position.set(Math.cos(a) * 0.7, y + 2.35, -1 + Math.sin(a) * 0.7);
g.add(pt);
}
var sign = festSignMesh("SOMNUCOR", "the Grand Opening", 3.6, 0.9);
sign.position.set(0, 1.8, 3.6);
sign.rotation.y = 0;
g.add(sign);
var acro = [];
for (var i = 0; i < 3; i++) {
var f = frpFig("acro" + i, i + 5, "acro");
f.position.set(-1.2 + i * 1.2, 1.2, 2.4);
g.add(f);
acro.push(f);
}
g.userData.acro = acro;
return g;
},
function () {
var g = frpFloat(4.8, 8, 0x2A5AC8), top = new THREE.Group();
top.position.set(0, 1.2, 0);
g.add(top);
var base = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.25, 24), fM(0xF4ECD8));
base.position.y = 0.12;
top.add(base);
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.6, 10), fM(0xE8C040));
pole.position.y = 1.8;
top.add(pole);
var tx = festStripes("#C8283A", "#FFF4E0", 16);
tx.repeat.set(2, 1);
var can = new THREE.Mesh(new THREE.ConeGeometry(2.4, 1.4, 24, 1, true), new THREE.MeshLambertMaterial({ map: tx, side: THREE.DoubleSide }));
can.position.y = 4.2;
top.add(can);
var flag = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 6), fM(0xFFD040));
flag.position.y = 5.1;
top.add(flag);
var horses = [];
for (var k = 0; k < 6; k++) {
var a = k / 6 * Math.PI * 2, h = frpHorse([0xFFFFFF, 0xF4C8E0, 0xC8E0F4][k % 3], k % 2 === 0);
var r = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.3, 5), fM(0xE8C040));
r.position.set(Math.cos(a) * 1.6, 1.9, Math.sin(a) * 1.6);
top.add(r);
h.position.set(Math.cos(a) * 1.6, 1.3, Math.sin(a) * 1.6);
h.rotation.y = -a;
top.add(h);
horses.push(h);
}
g.userData.spin = top;
g.userData.horses = horses;
return g;
},
function () {
var g = new THREE.Group();
g.add(P(new THREE.BoxGeometry(3, 0.8, 5), fM(0x6A2A7A), 0, 1.0, 0));
for (var w = 0; w < 4; w++) {
var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.2, 16), fM(0xE8C040));
wh.rotation.z = Math.PI / 2;
wh.position.set(w < 2 ? -1.6 : 1.6, 0.55, w % 2 ? -1.7 : 1.7);
g.add(wh);
}
for (var q = 0; q < 20; q++) {
var r = q < 1 ? 0 : q < 7 ? 0.6 : q < 14 ? 0.9 : 0.4, lay = q < 1 ? 0 : q < 7 ? 1 : q < 14 ? 2 : 3, aa = q * 2.39;
g.add(P(new THREE.SphereGeometry(0.4, 10, 8), fM(0x6A2A7A), Math.cos(aa) * r, 4.0 - lay * 0.55, -1.2 + Math.sin(aa) * r));
}
g.add(P(new THREE.ConeGeometry(0.8, 0.5, 5), fM(0x3E7A2E), 0, 4.4, -1.2));
g.add(P(new THREE.CylinderGeometry(0.7, 0.7, 1.4, 14), fM(0x8A5A30), 0, 1.9, 1.5, 0, 0, Math.PI / 2));
var sign = festSignMesh("BACCHUS", "cheer for tickets!", 2.6, 0.7);
sign.position.set(0, 1.0, 2.55);
g.add(sign);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function () {
var N = 260, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), c = new THREE.Color();
for (var i = 0; i < N; i++) {
pos[i * 3] = (Math.random() - 0.5) * 6;
pos[i * 3 + 1] = Math.random() * 7;
pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
c.setHex(FEST_COLS[i % 6]);
col[i * 3] = c.r;
col[i * 3 + 1] = c.g;
col[i * 3 + 2] = c.b;
}
var ge = new THREE.BufferGeometry();
ge.setAttribute("position", new THREE.BufferAttribute(pos, 3));
ge.setAttribute("color", new THREE.BufferAttribute(col, 3));
var p = new THREE.Points(ge, new THREE.PointsMaterial({ size: 0.18, vertexColors: true, sizeAttenuation: true }));
p.raycast = function () { };
p.frustumCulled = false;
return p;
},
function () {
var g = new THREE.Group();
g.name = "ring parade";
scene.add(g);
var lite = typeof LITE !== "undefined" && LITE, items = [], s = 0, ti = festThemeIdx(), day = festDay();
function put(o, ds, l, role, lift) { g.add(o); items.push({ o: o, s: s, l: l || 0, role: role || "", lift: lift || 0 }); s += ds || 0; }
put(frpFig("rp_major", 1, "major"), 3, 0, "walk");
var nf = lite ? 4 : 6;
for (var f = 0; f < nf; f++)
put(frpFig("rp_flag" + f, f, "flag"), f % 2 ? 2.4 : 0, f % 2 ? 1.6 : -1.6, "flag");
var nb = lite ? 8 : 12;
for (var b = 0; b < nb; b++)
put(frpFig("rp_band" + b, b, b % 4 < 2 ? "drum" : "horn"), b % 4 === 3 ? 2.2 : 0, -2.4 + (b % 4) * 1.6, "walk");
s += 3;
if (ti === 2) {
var segs = [];
for (var k = 0; k < 16; k++) {
var seg = new THREE.Group(), sc = k === 0 ? 1.3 : 1 - k * 0.03;
var body = new THREE.Mesh(new THREE.SphereGeometry(0.9 * sc, 12, 10), fM(k % 2 ? 0xC8283A : 0xE8B030));
body.scale.set(1, 0.9, 1.4);
seg.add(body);
if (k === 0) {
[-0.5, 0.5].forEach(function (x) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), fM(0xFFFFFF)); e.position.set(x, 0.4, 0.9); seg.add(e); var hn = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.9, 6), fM(0xFFD040)); hn.position.set(x, 1.1, 0.1); hn.rotation.x = -0.5; seg.add(hn); });
var jaw = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 1.4), fM(0xC8283A));
jaw.position.set(0, -0.5, 0.9);
seg.add(jaw);
}
var fin = new THREE.Mesh(new THREE.ConeGeometry(0.25 * sc, 0.7, 4), fM(0xFFD040));
fin.position.y = 0.95 * sc;
seg.add(fin);
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2, 4), fM(0x5A3A22));
pole.position.y = -1.6;
seg.add(pole);
seg.traverse(function (m) { m.raycast = function () { }; });
put(seg, 1.3, 0, "dragon", 2.4);
segs.push(seg);
if (k % 2 === 0) {
var cr = frpFig("rp_carry" + k, k, "dance");
g.add(cr);
items.push({ o: cr, s: s - 1.3, l: 0.0, role: "walk" });
}
}
s += 2;
}
else {
var tf = frpFloat(4.6, 10, [0xC8283A, 0x2A5AC8, 0x2A8A3A, 0x5A1A7A, 0x1A2A6A, 0xA8582A, 0x5A1A5A, 0xE8E0D0, 0x8A2A1A, 0x1A5A8A, 0xC8283A, 0x3A1A5A, 0x1A3A6A, 0x5A1A7A][ti]);
var th = frpTheme(ti);
tf.add(th);
put(tf, 12, 0, "float");
}
var ns = lite ? 2 : 4;
for (var st = 0; st < ns; st++)
put(frpFig("rp_stilt" + st, st + 2, "stilt"), st % 2 ? 3 : 0, st % 2 ? 1.8 : -1.8, "walk");
s += 2;
["dragon", "moon", "unicorn"].forEach(function (k, i) { put(frpBalloon(k), 0, 0, "balloon"); for (var hd = 0; hd < 2; hd++) {
var hf = frpFig("rp_hand" + i + hd, i * 2 + hd, "walk");
g.add(hf);
items.push({ o: hf, s: s + (hd ? 3 : -1), l: hd ? 1.5 : -1.5, role: "walk" });
} s += lite ? 7 : 9; });
var tw = frpTowerFloat();
put(tw, 11, 0, "float");
var nj = 2;
for (var j = 0; j < nj; j++)
put(frpFig("rp_jug" + j, j + 3, "juggle"), j ? 3 : 0, j ? 1.4 : -1.4, "juggle");
var car = frpCarouselFloat();
var cf = frpConfetti();
car.add(cf);
put(car, 10, 0, "carousel");
var nd = lite ? 2 : 4;
for (var d = 0; d < nd; d++)
put(frpFig("rp_dance" + d, d + 1, "dance"), d % 2 ? 2.4 : 0, d % 2 ? 1.5 : -1.5, "dance");
put(frpWagon(), 6, 0, "float");
g.traverse(function (m) { m.raycast = function () { }; });
FRP.g = g;
FRP.items = items;
FRP.len = s;
FRP.conf = cf;
FRP.tower = tw;
FRP.car = car;
FRP.day = day;
},
function () {
var which = null;
if (FRP.near && FRP.cur)
which = FRP.cur.q;
else if (FEST.parade && FEST.parade.near)
which = FEST.parade.when === "evening" ? "lantern" : "dreams";
else if (typeof BAC !== "undefined" && BAC.proc && BAC.proc.g.visible && BAC.procNear < 25)
which = "bacchus";
if (!which)
return false;
function done(o) { setStatus(o && o.ok ? "<b>You cheer the parade!</b> " + o.won + " tickets." : esc((o && o.say) || "")); festPaint(); }
if (festSigned()) {
cityRpc("fest_cheer", { p_parade: which }).then(function (o) { if (o && o.ok && FEST.st)
FEST.st.tickets = o.tickets; done(o); })
.catch(function (e) { if (/function|404|PGRST/i.test(String(e && e.message)))
festPlay("parade", 0).then(done);
else
done({ ok: false, say: String(e && e.message || e) }); });
}
else {
var L = festLocal(), key = "cheer_" + new Date().toDateString();
L[key] = L[key] || [];
if (L[key].indexOf(which + Math.floor(dreamHour())) >= 0) {
done({ ok: false, say: "You cheered this parade already." });
return true;
}
L[key].push(which + Math.floor(dreamHour()));
festPlay("parade", 0).then(done);
}
return true;
},
function () {
var day = festDay();
if (FHUNT.spots && FHUNT.day === day)
return FHUNT.spots;
var H = festHunt(), n = H[2].length > 1 ? 14 : 7, rnd = fhRand(day * 7919 + 13), out = [];
var stand = (typeof festStand === "function") ? festStand() : [], lay = FEST.layout || [];
for (var i = 0; i < n; i++) {
var q = H[2][i % H[2].length], radii = FEST_QRINGS[q], R = radii[Math.floor(rnd() * radii.length)], a = rnd() * Math.PI * 2, x = 0, z = 0, ok = false;
var plaza = q === "plaza", rr = plaza ? R : R + (rnd() < 0.5 ? 1 : -1) * (ATL_ROAD + 3);
for (var tries = 0; tries < 120 && !ok; tries++) {
x = ATLC.x + Math.cos(a) * rr;
z = ATLC.z + Math.sin(a) * rr;
ok = true;
if (!plaza && !atlClearAt(rr, a, 1, 2))
ok = false;
if (ok && plaza) {
for (var s = 0; s < stand.length && ok; s++)
if (Math.hypot(stand[s].x - x, stand[s].z - z) < stand[s].r + 1.5)
ok = false;
for (var g = 0; g < lay.length && ok; g++)
if (Math.hypot(lay[g].x - x, lay[g].z - z) < lay[g].rad + 2)
ok = false;
}
if (ok && typeof blockedAt === "function" && blockedAt(x, z, 0))
ok = false;
for (var o = 0; o < out.length && ok; o++)
if (Math.hypot(out[o].x - x, out[o].z - z) < 40)
ok = false;
if (!ok)
a += 0.019;
}
out.push({ n: i + 1, x: x, z: z, q: q });
}
FHUNT.spots = out;
FHUNT.day = day;
FHUNT.found = {};
try {
FHUNT.clues = JSON.parse(localStorage.getItem("somnu_hunt_clues_" + day) || "{}") || {};
}
catch (e) {
FHUNT.clues = {};
}
festHuntLoad(true);
return out;
},
function (force) {
var day = festDay();
if (!force && Date.now() - FHUNT.loaded < 120000)
return;
FHUNT.loaded = Date.now();
var L = festLocal(), lk = "hunt_" + (FEST.start ? FEST.start.toISOString().slice(0, 10) : "") + "_" + day;
(L[lk] || []).forEach(function (n) { FHUNT.found[n] = 1; });
if (festSigned())
cityRpc("fest_hunt_state", { p_day: day }).then(function (o) { ((o && o.found) || []).forEach(function (n) { FHUNT.found[n] = 1; }); }).catch(function () { });
},
function (kind) {
var g = new THREE.Group(), gold = new THREE.MeshLambertMaterial({ color: 0xFFD040, emissive: 0x5A4010 });
function add(geo, mat, x, y, z, rx, ry, rz) { var o = new THREE.Mesh(geo, mat); o.position.set(x || 0, y || 0, z || 0); o.rotation.set(rx || 0, ry || 0, rz || 0); g.add(o); return o; }
function lam(c, e) { return new THREE.MeshLambertMaterial({ color: c, emissive: e || 0x000000 }); }
switch (kind) {
case "key":
add(new THREE.TorusGeometry(0.16, 0.05, 8, 16), gold, 0, 0.25, 0);
add(new THREE.CylinderGeometry(0.04, 0.04, 0.55, 8), gold, 0, -0.15, 0);
add(new THREE.BoxGeometry(0.14, 0.05, 0.05), gold, 0.07, -0.36, 0);
add(new THREE.BoxGeometry(0.1, 0.05, 0.05), gold, 0.05, -0.25, 0);
break;
case "lantern":
add(new THREE.CylinderGeometry(0.2, 0.2, 0.4, 12), new THREE.MeshBasicMaterial({ color: 0xFF5A3A }), 0, 0, 0);
add(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 12), gold, 0, 0.22, 0);
add(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 12), gold, 0, -0.22, 0);
add(new THREE.TorusGeometry(0.08, 0.015, 6, 12), gold, 0, 0.32, 0);
break;
case "egg":
add(new THREE.SphereGeometry(0.22, 16, 12), lam(0x2A8A5A, 0x0A2A1A), 0, 0, 0).scale.set(1, 1.35, 1);
for (var k = 0; k < 6; k++) {
var a = k * 1.05;
add(new THREE.SphereGeometry(0.05, 8, 6), gold, Math.cos(a) * 0.2, Math.sin(k * 2.1) * 0.15, Math.sin(a) * 0.2);
}
break;
case "mask":
var mf = add(new THREE.SphereGeometry(0.3, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), lam(0xC83A8A, 0x3A0A2A), 0, 0, 0, Math.PI / 2);
mf.scale.set(1.2, 0.5, 0.7);
[-0.13, 0.13].forEach(function (x) { add(new THREE.SphereGeometry(0.06, 8, 6), lam(0x1A0A2A), x, 0.03, 0.14).scale.set(1.4, 0.8, 0.5); });
for (var f = 0; f < 3; f++)
add(new THREE.ConeGeometry(0.04, 0.4, 4), lam(FEST_COLS[f]), -0.12 + f * 0.12, 0.3, -0.03, 0, 0, (f - 1) * 0.3);
break;
case "star":
var sh = new THREE.Shape();
for (var s = 0; s < 10; s++) {
var rr = s % 2 ? 0.12 : 0.28, aa = s / 10 * Math.PI * 2 + Math.PI / 2;
if (s === 0)
sh.moveTo(Math.cos(aa) * rr, Math.sin(aa) * rr);
else
sh.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr);
}
add(new THREE.ExtrudeGeometry(sh, { depth: 0.08, bevelEnabled: false }), new THREE.MeshBasicMaterial({ color: 0xFFF0A0 }), 0, 0, -0.04);
break;
case "moon":
add(new THREE.ExtrudeGeometry(festCrescent(0.28), { depth: 0.08, bevelEnabled: false, curveSegments: 20 }), new THREE.MeshBasicMaterial({ color: 0xFFA040 }), 0, 0, -0.04);
break;
case "grapes":
for (var q = 0; q < 10; q++) {
var r = q < 1 ? 0 : q < 4 ? 0.1 : q < 8 ? 0.16 : 0.08, l = q < 1 ? 0 : q < 4 ? 1 : q < 8 ? 2 : 3, ag = q * 2.39;
add(new THREE.SphereGeometry(0.07, 10, 8), gold, Math.cos(ag) * r, 0.2 - l * 0.1, Math.sin(ag) * r);
}
add(new THREE.ConeGeometry(0.1, 0.12, 5), lam(0x3E7A2E), 0, 0.28, 0);
break;
case "paint":
add(new THREE.CylinderGeometry(0.18, 0.15, 0.3, 14), lam(0xE8E0D0), 0, 0, 0);
add(new THREE.CylinderGeometry(0.17, 0.17, 0.03, 14), lam(0x3AA8E8, 0x0A2A3A), 0, 0.16, 0);
add(new THREE.CylinderGeometry(0.015, 0.015, 0.45, 6), lam(0x8A5A30), 0.08, 0.3, 0, 0, 0, -0.4);
add(new THREE.TorusGeometry(0.15, 0.01, 4, 12, Math.PI), lam(0x888888), 0, 0.16, 0, 0, 0, 0);
break;
case "opal":
add(new THREE.OctahedronGeometry(0.22, 0), new THREE.MeshBasicMaterial({ color: 0xFF6A2A }), 0, 0, 0).scale.set(1, 1.3, 1);
add(new THREE.OctahedronGeometry(0.12, 0), new THREE.MeshBasicMaterial({ color: 0xFFE07A }), 0, 0, 0);
break;
case "pearl":
var shell = add(new THREE.SphereGeometry(0.25, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xF4C8B8, side: THREE.DoubleSide }), 0, -0.1, 0, Math.PI);
shell.scale.set(1, 0.4, 1);
add(new THREE.SphereGeometry(0.1, 14, 10), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x3A3A40 }), 0, 0, 0);
break;
case "ticket":
var tc = hallCanvas(128, 64, function (c, w, h) { c.fillStyle = "#C8283A"; c.fillRect(0, 0, w, h); c.strokeStyle = "#FFD040"; c.lineWidth = 5; c.strokeRect(5, 5, w - 10, h - 10); hallText(c, "ADMIT ONE", w / 2, h / 2 + 8, w - 20, "bold 22px Georgia,serif", "#FFF4D0", "center"); }).tex;
add(new THREE.BoxGeometry(0.5, 0.25, 0.02), new THREE.MeshBasicMaterial({ map: tc }), 0, 0, 0);
break;
case "note":
add(new THREE.SphereGeometry(0.1, 12, 8), lam(0x1A1A22, 0x1A1A10), 0, -0.18, 0).scale.set(1.3, 0.9, 0.7);
add(new THREE.CylinderGeometry(0.02, 0.02, 0.45, 6), lam(0x1A1A22), 0.11, 0.05, 0);
add(new THREE.BoxGeometry(0.15, 0.05, 0.02), gold, 0.18, 0.25, 0, 0, 0, -0.4);
break;
case "stone":
add(new THREE.DodecahedronGeometry(0.22, 0), lam(0x6A8AB8, 0x1A2A4A), 0, 0, 0);
add(new THREE.TorusGeometry(0.3, 0.012, 6, 24), new THREE.MeshBasicMaterial({ color: 0xC8E0FF }), 0, 0, 0, Math.PI / 2);
break;
default:
add(new THREE.CylinderGeometry(0.22, 0.22, 0.18, 16, 1, true), new THREE.MeshLambertMaterial({ color: 0xFFD040, emissive: 0x5A4010, side: THREE.DoubleSide }), 0, 0, 0);
for (var c = 0; c < 6; c++) {
var ca = c / 6 * Math.PI * 2;
add(new THREE.ConeGeometry(0.04, 0.14, 5), gold, Math.cos(ca) * 0.22, 0.15, Math.sin(ca) * 0.22);
add(new THREE.SphereGeometry(0.03, 6, 4), new THREE.MeshBasicMaterial({ color: FEST_COLS[c] }), Math.cos(ca) * 0.225, 0, Math.sin(ca) * 0.225);
}
}
g.scale.setScalar(1.5);
var halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: festGlowTex(), color: 0xFFE8A0, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
halo.scale.set(2.4, 2.4, 1);
g.add(halo);
g.userData.halo = halo;
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (s) {
FHUNT.busy = true;
var day = festDay(), H = festHunt(), need = FHUNT.spots.length;
function local(note) {
var L = festLocal(), lk = "hunt_" + (FEST.start ? FEST.start.toISOString().slice(0, 10) : "") + "_" + day;
L[lk] = L[lk] || [];
if (L[lk].indexOf(s.n) < 0) {
L[lk].push(s.n);
L.tickets += 15;
festLocalSave();
}
FHUNT.found[s.n] = 1;
FHUNT.busy = false;
var c = L[lk].length;
setStatus("<b>" + (c >= need ? "You found all " + need + " " + esc(H[3]) + "!" : "One of today's " + esc(H[3]) + ": " + c + " of " + need + ".") + "</b> " + esc(note || "15 tickets (kept on this device: sign in to keep them)."));
festPaint();
}
if (festSigned()) {
cityRpc("fest_hunt_find", { p_day: day, p_n: s.n }).then(function (o) {
FHUNT.busy = false;
if (o && o.ok) {
FHUNT.found[s.n] = 1;
if (FEST.st)
FEST.st.tickets = o.tickets;
setStatus("<b>" + esc(o.say) + "</b>");
festPaint();
}
else if (o && /already/.test(o.say || ""))
FHUNT.found[s.n] = 1;
else if (o && o.say) {
setStatus(esc(o.say));
FHUNT.found[s.n] = 1;
}
}).catch(function (e) { if (/function|404|PGRST/i.test(String(e && e.message)))
local("The hunt keeps your finds on this device for now.");
else
FHUNT.busy = false; });
}
else
local();
},
function () {
if (!festHuntOpen() || !ATLC)
return null;
var spots = festHuntSpots(), H = festHunt(), s = null;
for (var i = 0; i < spots.length; i++)
if (!FHUNT.found[spots[i].n] && !FHUNT.clues[spots[i].n]) {
s = spots[i];
break;
}
if (!s)
for (var j = 0; j < spots.length; j++)
if (!FHUNT.found[spots[j].n]) {
s = spots[j];
break;
}
if (!s)
return "You have found every one of today's " + H[3] + ". Come back tomorrow for a new hunt.";
var a = Math.atan2(s.z - ATLC.z, s.x - ATLC.x), w = FEST_WINDS[((Math.round(a / (Math.PI / 4)) % 8) + 8) % 8];
var nearName = null, nd = 140;
if (store.workplaceAt)
Object.keys(store.workplaceAt).forEach(function (k) { var p = store.workplaceAt[k]; if (!p)
return; var d = Math.hypot(p.x - s.x, p.z - s.z); if (d < nd) {
nd = d;
nearName = k;
} });
var txt = "One of today's " + H[3] + " waits on " + (FEST_QNAME[s.q] || s.q) + ", to the " + w + " of the Tower" + (nearName ? ", not far from " + nearName : "") + ".";
FHUNT.clues[s.n] = txt;
try {
localStorage.setItem("somnu_hunt_clues_" + FHUNT.day, JSON.stringify(FHUNT.clues));
}
catch (e) { }
return txt;
},
function () {
var h = dreamHour(), day = festDay();
if (day === 12 && h >= 21.5 && h < 22.5)
return "musopen";
if (h >= 11.5 && h < 12)
return "musopen";
if (h >= 14.5 && h < 15)
return "macleod";
if (h >= 17.5 && h < 18.5)
return "woodward";
if (h >= 20 && h < 23)
return "shaw";
if (h >= 10 && h < 20) {
var m = new Date().getMonth();
return m === 11 ? (Math.floor(h) % 2 ? "holiday" : "pop") : FEST_MODERN[Math.floor(h) % FEST_MODERN.length];
}
return null;
},
function (act, cb) {
if (FMUS.tracks[act] === null && FMUS.fail[act] && Date.now() - FMUS.fail[act] > 300000) {
delete FMUS.tracks[act];
FMUS.asked[act] = 0;
}
if (FMUS.tracks[act] !== undefined) {
cb(FMUS.tracks[act]);
return;
}
if (FMUS.asked[act])
return;
FMUS.asked[act] = 1;
var A = FEST_ACTS[act];
var url = "https://archive.org/advancedsearch.php?q=" + encodeURIComponent(A.q) + "&fl%5B%5D=identifier&fl%5B%5D=licenseurl&fl%5B%5D=creator&sort%5B%5D=downloads+desc&rows=25&output=json";
fetch(url, { mode: "cors", credentials: "omit" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
var docs = ((j && j.response && j.response.docs) || []).filter(function (d) { return d.identifier && fmusLicOk(d.licenseurl, A.gov); }), who = {}, lic = {};
docs.forEach(function (d) { who[d.identifier] = String(Array.isArray(d.creator) ? d.creator[0] : (d.creator || "")).slice(0, 60); lic[d.identifier] = fmusLicName(d.licenseurl); });
var ids = docs.map(function (d) { return d.identifier; });
if (!ids.length) {
FMUS.tracks[act] = null;
cb(null);
return;
}
var pick = ids.slice(0, 8), out = [], left = pick.length;
pick.forEach(function (id) {
fetch("https://archive.org/metadata/" + encodeURIComponent(id), { mode: "cors", credentials: "omit" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (m) {
((m && m.files) || []).forEach(function (f) { if (/\.mp3$/i.test(f.name || "") && !/_64kb|sample/i.test(f.name) && (+f.size || 0) < 4e7)
out.push({ who: who[id] || "", lic: lic[id] || "", url: "https://archive.org/download/" + encodeURIComponent(id) + "/" + f.name.split("/").map(encodeURIComponent).join("/"), title: String(f.title || f.name.replace(/\.mp3$/i, "").replace(/[_-]+/g, " ")).slice(0, 80) }); });
}).catch(function () { }).then(function () { if (--left === 0) {
FMUS.tracks[act] = out.length ? out : null;
cb(FMUS.tracks[act]);
} });
});
}).catch(function () { FMUS.tracks[act] = null; FMUS.fail[act] = Date.now(); cb(null); });
},
function (act) {
var L = FMUS.tracks[act];
if (!L || !L.length)
return;
if (!FMUS.el) {
FMUS.el = new Audio();
FMUS.el.crossOrigin = "anonymous";
FMUS.el.preload = "auto";
FMUS.el.addEventListener("ended", function () { if (FMUS.act)
fmusPlay(FMUS.act); });
FMUS.el.addEventListener("error", function () { if (FMUS.act)
setTimeout(function () { if (FMUS.act)
fmusPlay(FMUS.act); }, 1500); });
}
var tr = L[Math.floor(Math.random() * L.length)];
FMUS.title = tr.title;
FMUS.who = tr.who;
FMUS.lic = tr.lic;
FMUS.el.src = tr.url;
FMUS.el.volume = 0;
var p = FMUS.el.play();
if (p && p.catch)
p.catch(function () { });
fmusCredit();
},
function () {
var act = FMUS.act, A = act && FEST_ACTS[act], txt = A ? (A.many && FMUS.who ? FMUS.who : A.who) : "", lc = A ? (A.many && FMUS.lic ? FMUS.lic : A.lic) : "", sub = A ? ((FMUS.title ? "“" + FMUS.title + "” · " : "") + lc + (FMUS.tracks[act] ? " · from the Internet Archive" : " · the game's own music")) : "music · fire dancers · every night";
FMUS.credit = A ? txt + " · " + lc : "";
var st = FEST.pieces;
if (!st || !st.stage || !st.stage.g)
return;
var key = txt + "|" + sub;
if (st.stage.creditKey === key)
return;
st.stage.creditKey = key;
if (st.stage.credit) {
st.stage.g.remove(st.stage.credit);
}
var sign = festSignMesh(A ? "NOW ON STAGE: " + txt.toUpperCase() : "THE BACCHANAL STAGE", sub, 9, 1.6);
sign.position.set(0, 9.1, 3.3);
st.stage.g.add(sign);
st.stage.credit = sign;
},
function (on) {
var st = FEST.pieces;
if (!st || !st.stage || !st.stage.g)
return;
if (!st.stage.band) {
var band = new THREE.Group();
var roles = ["horn", "drum", "horn", "dance"];
roles.forEach(function (r, i) { var f = frpFig("stage_mus" + i, i + 2, r); f.position.set(-3.6 + i * 2.4, 1.2, -0.8); band.add(f); });
var piano = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 0.7), fM(0x1A1A22));
piano.position.set(4.4, 1.7, -1.6);
band.add(piano);
st.stage.g.add(band);
st.stage.band = band;
}
st.stage.band.visible = on;
},
function () {
if (!FMUS.act)
return "";
var A = FEST_ACTS[FMUS.act];
return '<div style="margin-top:6px;color:#C8B8D8">♪ Now playing: <b style="color:#FFF4E0">' + esc(A.many && FMUS.who ? FMUS.who : A.who) + '</b>' + (FMUS.title ? ' · ' + esc(FMUS.title) : '') + ' <span style="font-size:12px">(' + esc(A.many && FMUS.lic ? FMUS.lic : A.lic) + (FMUS.tracks[FMUS.act] ? ', from the Internet Archive' : ', the game\'s own music') + ')</span></div>';
},
function (tab) {
var h = "";
if (tab === "sched") {
var today = festDay();
h += '<div style="color:#C8B8D8;margin-bottom:6px">Fourteen days, each with its own theme, hunt and special event. The daily timetable is on the Today tab.</div>';
h += '<div><b>Ring parades every day</b> <span style="color:#C8B8D8">(20 minutes, round the ring\'s terrace; never the Warrens)</span><br>' + FEST_RPAR.map(function (p) { return festHM(p.h) + ' ' + esc(p.name); }).join(' · ') + '<br><span style="color:#C8B8D8">and round the Tower: 12:00 the Parade of Dreams, 19:00 the Lantern Parade; 22:00 the Bacchus Procession.</span></div>';
for (var d = 1; d <= FEST.days; d++) {
var ti = festThemeIdx(d), H = FEST_HUNTS[ti], cur = d === today && festOn();
h += '<div style="margin-top:6px;padding:5px 8px;border-left:3px solid ' + (cur ? "#FFD040" : "#3A2A4A") + ';background:' + (cur ? "rgba(255,208,64,.08)" : "transparent") + '"><b style="color:' + (cur ? "#FFD040" : "#FFF4E0") + '">Day ' + d + (festDayDate(d) ? ' · ' + esc(festDayDate(d)) : '') + ': ' + esc(FEST_THEMES[(d - 1) % FEST_THEMES.length]) + '</b>' +
'<div style="color:#C8B8D8;font-size:12px">Hunt: ' + esc(H[0]) + ' (' + esc(H[2].length > 1 ? "every ring but the Warrens" : FEST_QNAME[H[2][0]]) + ') · ' + esc(FEST_SPECIAL[ti]) + '</div></div>';
}
h += '<div style="margin-top:8px"><b>The music</b><div style="color:#C8B8D8;font-size:12px">Parades: the United States Marine Band and the United States Army Band (public domain). 11:30 Musopen performers (public domain). 14:30 and between sets Kevin MacLeod (CC BY 4.0). 17:30 Josh Woodward (CC BY 4.0). 19:00 Lantern Parade: Chris Zabriskie (CC BY 4.0). 20:00 to 23:00 fire dancers to Jason Shaw / Audionautix (CC BY 4.0). Streamed from the Internet Archive; the game\'s own music if the Archive cannot be reached.</div></div>';
}
else if (tab === "hunt") {
var Hh = festHunt(), sp = ATLC ? festHuntSpots() : [], got = sp.filter(function (s) { return FHUNT.found[s.n]; }).length;
h += '<div>Today\'s hunt: <b style="color:#FFD040">' + esc(Hh[0]) + '</b><br><span style="color:#C8B8D8">' + sp.length + ' ' + esc(Hh[3]) + ' hidden on ' + esc(Hh[2].length > 1 ? "every ring but the Warrens" : FEST_QNAME[Hh[2][0]]) + ', from 10:00 to 22:00. They glow softly once you are within fifteen metres: walk right up to one to take it. 15 tickets each.</span></div>';
h += '<div style="margin-top:6px">You have found <b style="color:#FFD040">' + got + ' of ' + sp.length + '</b>' + (festHuntOpen() ? '' : ' <span style="color:#FFB89A">(the hunt is closed right now)</span>') + '.</div><div style="margin-top:4px">' +
sp.map(function (s) { var g = FHUNT.found[s.n]; return '<span style="display:inline-block;margin:2px 4px 2px 0;padding:2px 7px;border-radius:10px;border:1px solid ' + (g ? "#FFD040" : "#5A4A6A") + ';color:' + (g ? "#FFD040" : "#C8B8D8") + '">' + s.n + (g ? " ✓" : "") + '</span>'; }).join("") + '</div>';
var cl = Object.keys(FHUNT.clues || {}).filter(function (n) { return !FHUNT.found[n]; });
h += '<div style="margin-top:8px"><b>Clues</b> <span style="color:#C8B8D8">(Madame Zelda at the Midway gives one with every fortune)</span>' + (cl.length ? cl.map(function (n) { return '<div style="color:#E8D8FF;margin-top:3px">• ' + esc(FHUNT.clues[n]) + '</div>'; }).join("") : '<div style="color:#C8B8D8">None yet.</div>') + '</div>';
h += '<div style="margin-top:6px;color:#C8B8D8;font-size:12px">Find them all for an Extravaganza ribbon; the first to finish is read out by the Keeper at 22:30.</div>';
}
else if (tab === "prizes") {
h += festPrizeBoardHtml();
}
return h;
},
function (day) {
FPB.day = day;
FPB.busy = true;
FPB.msg = "Reading the books…";
festPaint();
cityRpc("fest_prize_board", { p_day: day }).then(function (o) { FPB.busy = false; FPB.data = o; FPB.msg = o && o.ok ? "" : ((o && o.say) || "No answer."); festPaint(); })
.catch(function (e) { FPB.busy = false; FPB.data = null; FPB.msg = /function|404|PGRST/i.test(String(e && e.message)) ? "The Prize Board opens soon." : String(e && e.message || e); festPaint(); });
},
function () {
var day = FPB.day || festDay();
if (!FPB.day && !FPB.busy)
setTimeout(function () { festPrizeLoad(day); }, 0);
var h = '<div style="color:#C8B8D8">Every contest\'s winners, for you to read out at 22:30 and reward. Use Keeper grants on the admin page to give gold or keepsakes (Copy id puts the dreamer\'s id on the clipboard).</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin:6px 0">';
for (var d = 1; d <= FEST.days; d++)
h += '<button class="btn" data-fpb="' + d + '" style="padding:3px 7px' + (d === day ? ';border-color:#FFD040;color:#FFD040' : '') + '">' + d + '</button>';
h += '</div>';
if (FPB.msg)
h += '<div style="color:#FFB89A">' + esc(FPB.msg) + '</div>';
var o = FPB.data;
if (!o || !o.ok)
return h;
function who(r, extra) { return '<div style="padding:2px 0">' + esc(r.name) + (extra ? ' <span style="color:#C8B8D8">· ' + extra + '</span>' : '') + ' <button class="btn" data-fpcopy="' + esc(r.id) + '" style="padding:1px 6px;font-size:11px">Copy id</button></div>'; }
function sec(title, prize, list, fmt) { return '<div style="margin-top:8px"><b style="color:#FFD040">' + title + '</b> <span style="color:#C8B8D8;font-size:12px">(suggested: ' + prize + ')</span>' + (list && list.length ? list.map(fmt).join("") : '<div style="color:#C8B8D8">Nobody yet.</div>') + '</div>'; }
h += sec("Daily Midway Champion", "250 gold and a Plush dragon", (o.midway || []).slice(0, 3), function (r, i) { return who(r, (i === 0 ? "winner · " : "") + r.tickets + " tickets"); });
h += sec("Arcade High Scores", "100 gold each", o.arcade, function (r) { return who(r, r.game + ": " + r.score); });
h += sec("Daily Hunt: first to finish", "300 gold and a Carnival mask", (o.hunt || []).slice(0, 1), function (r) { return who(r, "finished " + new Date(r.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })); });
h += sec("Daily Hunt: every finisher", "an Extravaganza ribbon", o.hunt, function (r) { return who(r, ""); });
h += sec("Parade Spotters (cheered all six ring parades)", "150 gold", o.spotters, function (r) { return who(r, ""); });
h += sec("Golden Mask Hunter (first to find all 13)", "2,000 gold and the Golden Extravaganza trophy", (o.masks || []).slice(0, 3), function (r, i) { return who(r, (i === 0 ? "first · " : "") + new Date(r.at).toLocaleString()); });
if (day === o.days)
h += sec("Grand Finale Champion", "5,000 gold and the Grand Opening medal", (o.grand || []).slice(0, 3), function (r, i) { return who(r, r.tickets + " tickets over the fortnight"); });
else
h += '<div style="margin-top:8px;color:#C8B8D8;font-size:12px">On the last day the Grand Finale Champion appears here. Leading now: ' + ((o.grand || [])[0] ? esc(o.grand[0].name) + ' (' + o.grand[0].tickets + ' tickets)' : 'nobody') + '. Best Masquerade Costume (Day 4, 20:30) is your choice on the night.</div>';
return h;
}
];
});
