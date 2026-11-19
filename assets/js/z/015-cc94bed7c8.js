/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(15, function () {
"use strict";
return [
function (g, spec, f) {
var W = 54, D = 36, SX = 54, SZ = 36;
var geo = new THREE.PlaneGeometry(W, D, SX, SZ), pos = geo.attributes && geo.attributes.position;
var h = hash(spec.id), turn = (h % 628) / 100, A = 5.2 + ((h >>> 5) % 30) / 10;
for (var i = 0; pos && i < pos.count; i++) {
var x = pos.getX(i), z = -pos.getY(i);
var u = x / (W / 2), v = z / (D / 2);
var edge = Math.max(0, 1 - (u * u + v * v));
var crest = Math.exp(-(u * u) / 0.34);
var lee = v < 0 ? Math.exp(-(v * v) / 0.10) : Math.exp(-(v * v) / 0.62);
var ripple = (typeof vnoise === "function" ? vnoise(x / 7 + h % 50, z / 7) : 0) * 0.35 * edge;
pos.setZ(i, Math.max(0, A * crest * lee * edge * edge + ripple));
}
if (pos) {
pos.needsUpdate = true;
if (geo.computeVertexNormals)
geo.computeVertexNormals();
}
if (typeof metreUVs === "function")
metreUVs(geo, "pln", [W, D]);
var mat = new THREE.MeshLambertMaterial({ color: SAND });
var tx = (typeof texOf === "function" && f > 0.5) ? texOf("sand") : null;
if (tx)
mat.map = tx;
var m = new THREE.Mesh(geo, mat);
m.rotation.x = -Math.PI / 2;
m.position.y = 0.02;
m.receiveShadow = true;
m.castShadow = false;
g.rotation.y = turn;
g.add(m);
},
function (g) {
var R = 3.6, m = new THREE.MeshBasicMaterial({ color: 0xE8C27A, transparent: true, opacity: 0.9, depthWrite: false });
for (var k = 0; k < 5; k++) {
var a1 = Math.PI / 2 + k * 2 * Math.PI / 5, a2 = Math.PI / 2 + (k + 2) * 2 * Math.PI / 5;
var x1 = Math.cos(a1) * R, z1 = -Math.sin(a1) * R, x2 = Math.cos(a2) * R, z2 = -Math.sin(a2) * R;
var len = Math.sqrt((x2 - x1) * (x2 - x1) + (z2 - z1) * (z2 - z1));
var bar = new THREE.Mesh(new THREE.BoxGeometry(len, .05, .14), m);
bar.position.set((x1 + x2) / 2, .1, (z1 + z2) / 2);
bar.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
g.add(bar);
}
},
function (g, spec, f) {
var wheel = new THREE.Group();
wheel.position.set(0, 14, 1.4);
var m = new THREE.MeshLambertMaterial({ color: ROLE.metal });
var rim = new THREE.Mesh(new THREE.TorusGeometry(11, .25, 6, 40), m);
wheel.add(rim);
for (var i = 0; i < 8; i++) {
var sp = new THREE.Mesh(new THREE.BoxGeometry(.2, 22, .2), m);
sp.rotation.z = i * Math.PI / 8;
wheel.add(sp);
}
var cabCol = [0xA8322B, 0x2F5E9E, 0xC7A043, 0x3F7A3A];
for (var k = 0; k < 12; k++) {
var a = k * Math.PI / 6, cab = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), new THREE.MeshLambertMaterial({ color: cabCol[k % 4] }));
cab.position.set(Math.cos(a) * 11, Math.sin(a) * 11, 0);
wheel.add(cab);
}
g.add(wheel);
g.userData.wheel = wheel;
},
function (g) {
var spin = new THREE.Group();
var roof = new THREE.Mesh(new THREE.ConeGeometry(6.4, 2.6, 20), new THREE.MeshLambertMaterial({ color: 0xA8322B }));
roof.position.y = 7;
spin.add(roof);
var disc = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.2, .4, 20), new THREE.MeshLambertMaterial({ color: 0xC7A043 }));
disc.position.y = 5.6;
spin.add(disc);
for (var i = 0; i < 8; i++) {
var a = i * Math.PI / 4, pole = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, 5, 5), new THREE.MeshLambertMaterial({ color: GOLD }));
pole.position.set(Math.cos(a) * 4.6, 3.2, Math.sin(a) * 4.6);
spin.add(pole);
var horse = new THREE.Mesh(new THREE.BoxGeometry(.4, .7, 1.3), new THREE.MeshLambertMaterial({ color: i % 2 ? 0xF2EEE6 : 0x5E3A2A }));
horse.position.set(Math.cos(a) * 4.6, 2 + (i % 2) * .5, Math.sin(a) * 4.6);
horse.rotation.y = -a;
spin.add(horse);
}
g.add(spin);
g.userData.spin = spin;
},
function (g) {
var bolt = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: 0xE8F0FF });
var y = 40, x = 0;
for (var i = 0; i < 6; i++) {
var len = 7, seg = new THREE.Mesh(new THREE.BoxGeometry(.5, len, .5), m);
var nx = x + (Math.random() - .5) * 5;
seg.position.set((x + nx) / 2, y - len / 2, 0);
seg.rotation.z = Math.atan2(nx - x, len) * -1;
bolt.add(seg);
x = nx;
y -= len;
}
bolt.visible = false;
g.add(bolt);
g.userData.bolt = bolt;
}
];
});
