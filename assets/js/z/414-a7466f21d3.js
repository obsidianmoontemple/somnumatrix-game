/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(414, function () {
"use strict";
return [
function (shape, w, d, rise, o, side) {
side = side || 1;
var key = [shape, w.toFixed(2), d.toFixed(2), rise.toFixed(2), o, side].join("|");
if (CVL_GEOS[key])
return CVL_GEOS[key];
var X = w / 2 + o, Z = d / 2 + o, roof = [], ends = [];
function tri(list, a, b, c) { list.push(a, b, c); }
function quad(list, a, b, c, d2) { tri(list, a, b, c); tri(list, a, c, d2); }
if (shape === "front") {
quad(roof, [X, 0, Z], [X, 0, -Z], [0, rise, -Z], [0, rise, Z]);
quad(roof, [-X, 0, -Z], [-X, 0, Z], [0, rise, Z], [0, rise, -Z]);
[1, -1].forEach(function (s) { var zz = s * d / 2; tri(ends, [-w / 2 * s, 0, zz], [w / 2 * s, 0, zz], [0, rise * (1 - o / X), zz]); });
}
else if (shape === "hip") {
if (X >= Z) {
var hr = X - Z;
quad(roof, [-X, 0, Z], [X, 0, Z], [hr, rise, 0], [-hr, rise, 0]);
quad(roof, [X, 0, -Z], [-X, 0, -Z], [-hr, rise, 0], [hr, rise, 0]);
tri(roof, [X, 0, Z], [X, 0, -Z], [hr, rise, 0]);
tri(roof, [-X, 0, -Z], [-X, 0, Z], [-hr, rise, 0]);
}
else {
var hz = Z - X;
quad(roof, [X, 0, Z], [X, 0, -Z], [0, rise, -hz], [0, rise, hz]);
quad(roof, [-X, 0, -Z], [-X, 0, Z], [0, rise, hz], [0, rise, -hz]);
tri(roof, [-X, 0, Z], [X, 0, Z], [0, rise, hz]);
tri(roof, [X, 0, -Z], [-X, 0, -Z], [0, rise, -hz]);
}
}
else if (shape === "saltbox") {
var zr = -d * 0.18, rb = rise * (Z - zr) / Z;
quad(roof, [-X, 0, Z], [X, 0, Z], [X, rb, zr], [-X, rb, zr]);
quad(roof, [X, 0, -Z], [-X, 0, -Z], [-X, rb, zr], [X, rb, zr]);
[1, -1].forEach(function (s) { var xx = s * w / 2; tri(ends, [xx, 0, s * d / 2], [xx, 0, -s * d / 2], [xx, rb * 0.96, zr]); });
}
else {
quad(roof, [-X, 0, Z], [X, 0, Z], [X, rise, 0], [-X, rise, 0]);
quad(roof, [X, 0, -Z], [-X, 0, -Z], [-X, rise, 0], [X, rise, 0]);
[1, -1].forEach(function (s) { var xx = s * w / 2; tri(ends, [xx, 0, s * d / 2], [xx, 0, -s * d / 2], [xx, rise * (1 - o / Z) + 0.02, 0]); });
if (shape === "cross") {
var cw = w * 0.46, cx = side * (w / 2 - cw / 2 - 0.4), cX = cw / 2 + o * 0.8, r2 = Math.min(rise * 0.88, cX * 1.05), z1 = Z + 0.05;
quad(roof, [cx + cX, 0, z1], [cx + cX, 0, 0], [cx, r2, 0], [cx, r2, z1]);
quad(roof, [cx - cX, 0, 0], [cx - cX, 0, z1], [cx, r2, z1], [cx, r2, 0]);
tri(ends, [cx - cw / 2, 0, d / 2], [cx + cw / 2, 0, d / 2], [cx, r2 * (1 - o * 0.8 / cX), d / 2]);
}
}
function make(list, wallUV) {
if (!list.length)
return null;
var pos = new Float32Array(list.length * 3), uv = new Float32Array(list.length * 2);
var A = new THREE.Vector3(), B = new THREE.Vector3(), C = new THREE.Vector3(), n = new THREE.Vector3(), u = new THREE.Vector3(), v = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
for (var i = 0; i < list.length; i += 3) {
A.fromArray(list[i]);
B.fromArray(list[i + 1]);
C.fromArray(list[i + 2]);
n.subVectors(B, A).cross(v.subVectors(C, A)).normalize();
if (Math.abs(n.y) > 0.98)
u.set(1, 0, 0);
else
u.crossVectors(up, n).normalize();
v.crossVectors(n, u).normalize();
[A, B, C].forEach(function (P, j) { var k = i + j; pos[k * 3] = P.x; pos[k * 3 + 1] = P.y; pos[k * 3 + 2] = P.z; uv[k * 2] = P.dot(u); uv[k * 2 + 1] = wallUV ? P.y : P.dot(v); });
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
G.computeVertexNormals();
return G;
}
return (CVL_GEOS[key] = { roof: make(roof, false), ends: make(ends, true) });
},
function (t, s, bg, fg) {
var k = t + "|" + s + "|" + bg + "|" + fg;
if (CVL_SIGNS[k])
return CVL_SIGNS[k];
var c = document.createElement("canvas");
c.width = 256;
c.height = 72;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, 256, 72);
x.strokeStyle = fg;
x.globalAlpha = 0.6;
x.lineWidth = 3;
x.strokeRect(4, 4, 248, 64);
x.globalAlpha = 1;
x.fillStyle = fg;
x.textAlign = "center";
x.textBaseline = "middle";
var fs = 30;
x.font = "700 " + fs + "px Georgia, serif";
while (x.measureText(t).width > 232 && fs > 14) {
fs--;
x.font = "700 " + fs + "px Georgia, serif";
}
x.fillText(t, 128, 27);
x.font = "italic 400 15px Georgia, serif";
x.fillText(s, 128, 54);
var tex = new THREE.CanvasTexture(c);
tex.anisotropy = 4;
return (CVL_SIGNS[k] = tex);
},
function (g, spec) {
var T = spec.cvlTrade, def = KIT[spec.archetype], parts = levelParts(def, spec), body = cvlBodyPart(parts);
if (!T || !body)
return;
var R = cvlRng(cvlHash("trade|" + spec.id)), a = spec.attrs || {}, front = body.p[2] + body.s[2] / 2, door = frontDoorOf(parts), dx = door ? door.p[0] : 0;
var side = R() < 0.5 ? -1 : 1, bx = dx + side * 2.3, wood = cvlMat(a.dc !== undefined ? a.dc : 0x3A2A1E, "wood");
cvlBox(g, 3.0, 0.5, 0.6, wood, bx, 0.55, front + 0.22);
cvlBox(g, 3.0, 0.32, 0.62, wood, bx, 2.9, front + 0.22);
cvlBox(g, 2.8, 1.9, 0.05, cvlMat(cvlPick(R, [0xF0DCA8, 0xE8D0B0, 0xF4E4C0, 0xD8C8E8, 0xE0E8D0]), null, { basic: true }), bx, 1.75, front + 0.5);
[-1, 0, 1].forEach(function (k) { cvlBox(g, 0.08, 1.9, 0.08, wood, bx + k * 1.4, 1.75, front + 0.5); });
for (var i = 0; i < 5; i++)
cvlBox(g, 0.32, 0.22 + R() * 0.3, 0.18, cvlMat(cvlPick(R, [0x7A2A2A, 0x2A3A5A, 0xC8A040, 0x3A5A3A, 0xE8E4DA, 0x5A3A6A, 0x8A6A48])), bx - 1.1 + i * 0.55, 1.0, front + 0.38);
var bg = cvlPick(R, ["#1E2A3A", "#2A1A14", "#1A2A1E", "#3A1A22", "#1E1E24", "#E8DCC0"]), fg = bg === "#E8DCC0" ? "#2A1E14" : cvlPick(R, ["#E8D49A", "#F0E6D0", "#D8C8A8"]);
var sx = dx - side * 1.5;
cvlBox(g, 0.06, 0.06, 0.9, cvlMat(0x1E1E22), sx, 3.3, front + 0.45);
var sk = T.t + "|" + bg, SM = CVL_SIGNS["m|" + sk] || (CVL_SIGNS["m|" + sk] = new THREE.MeshLambertMaterial({ map: cvlTradeTex(T.t, T.s, bg, fg), side: THREE.DoubleSide, emissive: 0x111111 }));
var sg = new THREE.Mesh(CVL_SIGNS.plane || (CVL_SIGNS.plane = new THREE.PlaneGeometry(1.7, 0.48)), SM);
sg.position.set(sx, 3.0, front + 0.8);
sg.rotation.y = Math.PI / 2;
g.add(sg);
cvlBox(g, 0.22, 0.34, 0.22, cvlMat(0xFFD890, null, { basic: true }), dx + side * 0.95, 2.6, front + 0.2);
}
];
});
