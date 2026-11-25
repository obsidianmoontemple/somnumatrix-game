/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(379, function () {
"use strict";
return [
function () {
if (MH.on || typeof MALL === "undefined" || !MALL.g)
return;
MH.on = true;
var G = new THREE.Group();
G.name = "mall-helipad";
MALL.g.add(G);
var steel = mdM(0x5E646E), deckM = mdM(0x8A8E96), gold = mdM(0xC9A868), wood = mdM(0x6A4A3A), cream = mdM(0xF4EEE6);
var deck = mdCyl(G, MH.r, MH.r, 0.3, 48, deckM, MH.x, MH.y - 0.13, MH.z);
[-8, -3, 3, 8].forEach(function (z) { mdBox(G, 9.8, 0.35, 0.35, steel, MH.x - 6.7, MH.y - 2.6, z, 0, -0.51); });
for (var i = 0; i < 40; i++) {
var a = i / 40 * Math.PI * 2, px = MH.x + Math.cos(a) * (MH.r - 0.2), pz = MH.z + Math.sin(a) * (MH.r - 0.2);
if (Math.cos(a) > 0.55)
continue;
mdCyl(G, 0.05, 0.05, 1.1, 6, steel, px, MH.y + 0.55, pz);
var seg = mdBox(G, 0.08, 0.08, MH.r * Math.PI * 2 / 40 + 0.05, gold, px, MH.y + 1.1, pz);
seg.rotation.y = -a;
}
var S = new THREE.Group();
S.position.set(MH.x, MH.y, MH.z + 11.6);
G.add(S);
mdBox(S, 3.6, 3.2, 2.4, cream, 0, 1.6, 0);
mdBox(S, 3.9, 0.25, 2.7, gold, 0, 3.3, 0);
mdBox(S, 1.3, 2.3, 0.08, wood, 0, 1.15, -1.22);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mdB(0xFFE6A8));
lamp.position.set(0, 2.6, -1.35);
S.add(lamp);
var sg = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 0.6), new THREE.MeshBasicMaterial({ map: mdSignTex(["Stairs down into the Mall"], 512, 96, "#2A2440", "#FFF0C8", "#C9A868") }));
sg.position.set(0, 2.95, -1.3);
sg.rotation.y = Math.PI;
S.add(sg);
MH.stair = { x: MH.x, z: MH.z + 9.9 };
MH.sols = [{ x: MH.x, z: MH.z + 11.6, hw: 1.8, hd: 1.2 }];
try {
hpMakePad("mall", G, MH.x, MH.y + 0.05, MH.z, 0, 0, MH.sols);
}
catch (e) {
if (window.console)
console.warn("[mall-helipad]", e);
}
var D = new THREE.Group();
D.position.set(-MALL.A - 3.2, 2 * MD.FL, 0);
D.rotation.y = Math.PI / 2;
MALL.g.add(D);
mdBox(D, 2.0, 3.0, 0.2, gold, 0, 1.5, 0);
mdBox(D, 1.6, 2.7, 0.24, wood, 0, 1.35, 0.02);
var dg = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.9), new THREE.MeshBasicMaterial({ map: mdSignTex(["Stairs up to the helipad", "the Keeper and appointed officials"], 512, 136, "#2A1E4A", "#F0E0B0", "#C9A868") }));
dg.position.set(0, 3.7, 0.14);
D.add(dg);
MH.door = { x: -MALL.A + 0.5, z: 0 };
}
];
});
