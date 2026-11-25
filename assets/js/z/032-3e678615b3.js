/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(32, function () {
"use strict";
return [
function (g, spec, f) {
var rock = new THREE.MeshLambertMaterial({ color: 0x3A2E2A, side: THREE.DoubleSide });
var rock2 = new THREE.MeshLambertMaterial({ color: 0x2A2220 });
var metal = new THREE.MeshLambertMaterial({ color: 0x4A4E56 }), glowO = mG(0xFF7A1E, .95), glowY = mG(0xFFD08A, .95), screen = mG(0x5AE0C8, .95);
var shell = new THREE.Mesh(new THREE.CylinderGeometry(9, LAIR_R, 34, 40, 6, true, LAIR_GAP, Math.PI * 2 - LAIR_GAP * 2), rock);
shell.position.y = 17;
g.add(shell);
var rim = new THREE.Mesh(new THREE.TorusGeometry(9, 1.2, 6, 30), rock2);
rim.rotation.x = Math.PI / 2;
rim.position.y = 34;
g.add(rim);
[-1, 1].forEach(function (sd) { var w = P(box(1.6, 8, 12), rock2, sd * 6.2, 4, LAIR_R - 4); g.add(w); });
g.add(P(box(14, 2.4, 12), rock2, 0, 9, LAIR_R - 4));
g.add(P(box(10, .2, 16), mL(0x2A2826), 0, .06, LAIR_R - 6));
for (var i = 0; i < 6; i++)
g.add(P(sph(.25), glowY, (i % 2 ? 1 : -1) * 4.6, 3.2, LAIR_R + 1 - i * 2.4));
g.add(P(cyl(LAIR_R - 1, LAIR_R - 1, .1, 48), mL(0x33292A), 0, .05, 0));
g.add(P(cyl(10.8, 11.2, .5, 36), rock2, 0, .25, 0));
var lava = P(cyl(10, 10, .12, 36), glowO, 0, .56, 0);
g.add(lava);
g.userData.lava = lava;
g.add(P(cyl(3.2, 3.6, 1.4, 20), rock2, 0, .7, 0));
g.add(P(box(2.4, .4, 12), metal, 0, 1.2, 6.5));
g.add(P(box(1.6, 1, 1.2), mL(0x1B1C20), 0, 1.7, -1));
g.add(P(box(1.6, 2.4, .3), mL(0x1B1C20), 0, 2.6, -1.5));
g.add(P(box(.3, .3, .3), glowO, -.9, 3.9, -1.5));
g.add(P(box(.3, .3, .3), glowO, .9, 3.9, -1.5));
var ring = new THREE.Mesh(new THREE.RingGeometry(22, 27, 40, 1, 0, Math.PI * 2), new THREE.MeshLambertMaterial({ color: 0x3E3A38, side: THREE.DoubleSide }));
ring.rotation.x = -Math.PI / 2;
ring.position.y = .12;
g.add(ring);
for (var c = 0; c < 9; c++) {
var a = -Math.PI / 2 + (c - 4) * .34;
var con = new THREE.Group();
con.position.set(Math.cos(a) * 25, 0, Math.sin(a) * 25);
con.rotation.y = -a - Math.PI / 2;
con.add(P(box(3, 1.2, 1.2), metal, 0, .6, 0));
con.add(P(box(2.6, 1.4, .1), screen, 0, 1.9, -.45, -.2));
con.add(P(sph(.12), mG(c % 2 ? 0xFF3A1E : 0x6AF08A, 1), 1.1, 1.3, .4));
g.add(con);
}
for (var p = 0; p < 8; p++) {
var b = p * .785 + .39;
g.add(P(cyl(.9, 1.2, 16, 10), rock2, Math.cos(b) * 18, 8, Math.sin(b) * 18));
}
for (var l = 0; l < 10; l++) {
var la = l * .628;
g.add(P(sph(.4), glowY, Math.cos(la) * 28, 6, Math.sin(la) * 28));
}
g.add(P(cyl(1.4, 1.4, 14, 12), mL(0xDCDCD8), -12, 9, -12));
g.add(P(cone(1.4, 3, 12), mL(0xA8322B), -12, 17.5, -12));
g.add(P(box(.4, 18, .4), metal, -10, 9, -12));
g.add(P(box(.4, 18, .4), metal, -14, 9, -12));
var smoke = particles(80, [8, 30, 8], 0x6A605A, 2.4, .35);
smoke.position.y = 4;
g.add(smoke);
var sparks = particles(60, [9, 5, 9], 0xFFB23A, 1, .9);
g.add(sparks);
g.userData.anim = function (t, dt) { rise(smoke, dt, 2.2, .1); rise(sparks, dt, 1.5, 0); lava.material.opacity = .85 + .1 * Math.sin(t * 1.7); };
}
];
});
