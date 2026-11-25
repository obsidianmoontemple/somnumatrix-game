/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(188, function () {
"use strict";
return [
function (spec) {
if (!spec)
return null;
if (spec.psSetting)
return spec.psSetting;
if (spec.psInside)
return "volcano";
var a = spec.archetype;
if (a === "dragonlair" || a === "firepalace")
return "volcano";
if (a === "dwarvenhall" || a === "earthpalace")
return "rock";
if (spec.dlNest && (a === "castle" || a === "fortress" || a === "wizardschool" || a === "temple"))
return "rock";
if (a === "castle" || a === "fortress" || a === "wizardschool")
return "stone";
return null;
},
function () {
if (PS.tex.glow)
return PS.tex.glow;
var lines = psRockTex("volcano").userData.lines;
var t = psCanvasTex(512, function (x, N) {
x.fillStyle = "#000";
x.fillRect(0, 0, N, N);
x.strokeStyle = "rgba(255,70,10,.55)";
psStroke(x, lines, N, 7);
x.strokeStyle = "#FF7A1E";
psStroke(x, lines, N, 3);
x.strokeStyle = "#FFD27A";
psStroke(x, lines, N, 1.2);
});
PS.tex.glow = t;
return t;
},
function () {
if (PS.tex.coin)
return PS.tex.coin;
var t = psCanvasTex(256, function (x, N) {
x.fillStyle = "#B8861E";
x.fillRect(0, 0, N, N);
var r = psRand(11);
for (var i = 0; i < 520; i++) {
var px = r() * N, py = r() * N, rad = 4 + r() * 6;
x.fillStyle = r() < 0.5 ? "#E8C254" : "#C9982A";
x.beginPath();
x.ellipse(px, py, rad, rad * (0.45 + r() * 0.55), r() * 3, 0, 6.283);
x.fill();
x.strokeStyle = "rgba(90,60,10,.6)";
x.lineWidth = 1;
x.stroke();
x.fillStyle = "rgba(255,248,210,.7)";
x.fillRect(px - rad * 0.4, py - 1, rad * 0.5, 1.2);
}
}, 1);
PS.tex.coin = t;
return t;
},
function (g, n, R, y0, seed) {
var r = psRand(seed || 5), geo = new THREE.CylinderGeometry(.09, .09, .022, 10), im = new THREE.InstancedMesh(geo, psM("gold"), n), d = new THREE.Object3D();
for (var i = 0; i < n; i++) {
var a = r() * 6.283, rr = R * (0.35 + 0.65 * Math.sqrt(r()));
d.position.set(Math.cos(a) * rr, (y0 || 0) + .012 + r() * 0.02, Math.sin(a) * rr);
d.rotation.set((r() - 0.5) * 0.6, r() * 3, (r() - 0.5) * 0.6);
d.updateMatrix();
im.setMatrixAt(i, d.matrix);
}
im.userData.psKeep = 1;
g.add(im);
return im;
},
function (g, x, y, z, s) {
s = s || 1;
psAdd(g, new THREE.CylinderGeometry(.2 * s, .18 * s, .14 * s, 14, 1, true), "gold", x, y + .07 * s, z);
for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.283;
psAdd(g, new THREE.ConeGeometry(.04 * s, .14 * s, 5), "gold", x + Math.cos(a) * .19 * s, y + .2 * s, z + Math.sin(a) * .19 * s);
psGem(g, PS_GEMS[i % 4], x + Math.cos(a) * .205 * s, y + .07 * s, z + Math.sin(a) * .205 * s, .35 * s);
}
},
function () {
var g = psG(), r = psRand(23);
psAdd(g, psMound(3, 2.3, 24), "coins", 0, 0, 0);
psAdd(g, psMound(1.8, 1.3, 18), "coins", 2.2, 0, 1.2);
psAdd(g, psMound(1.6, 1.1, 18), "coins", -2.1, 0, -1.3);
psAdd(g, psMound(1.2, .8, 16), "coins", -1.6, 0, 1.9);
psCoins(g, 140, 4.2, 0, 7);
for (var i = 0; i < 18; i++) {
var a = r() * 6.283, rr = 1 + r() * 2.6, h = Math.max(0.15, 2.2 * (1 - Math.pow(rr / 3.2, 2)));
psGem(g, PS_GEMS[i % 5], Math.cos(a) * rr, h, Math.sin(a) * rr, 1.2);
}
[[1.4, 1.5, .4], [-1.2, 1.6, .6], [.3, 1.9, -1.1]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.03, .05, .22, 8), "gold", q[0], q[1] + .11, q[2]); psAdd(g, new THREE.CylinderGeometry(.13, .05, .2, 10), "gold", q[0], q[1] + .3, q[2]); });
psCrown(g, 0, 2.28, 0, 1.4);
psAdd(g, new THREE.BoxGeometry(.1, 1.5, .03), "steel", .7, 2.4, .5, 0, 0, .2);
psAdd(g, new THREE.BoxGeometry(.5, .07, .08), "gold", .55, 1.75, .5, 0, 0, .2);
psAdd(g, new THREE.SphereGeometry(.07, 8, 6), "ruby", .5, 1.55, .5);
psAdd(g, new THREE.CylinderGeometry(.6, .6, .06, 16), "gold", -2.6, .6, 1.6, 1.1, 0, .3);
psAdd(g, new THREE.SphereGeometry(.12, 8, 6), "sapphire", -2.55, .63, 1.66);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(1.3, .7, .8), "woodD", 0, .35, 0);
[-0.5, 0, 0.5].forEach(function (x) { psAdd(g, new THREE.BoxGeometry(.08, .72, .82), "gold", x, .36, 0); });
psAdd(g, new THREE.BoxGeometry(1.32, .06, .82), "gold", 0, .7, 0);
var lid = psAdd(g, new THREE.CylinderGeometry(.4, .4, 1.3, 12, 1, false, 0, Math.PI), "woodD", 0, .72, -.4, 0, 0, Math.PI / 2);
lid.rotation.set(-1.2, 0, Math.PI / 2);
lid.position.set(0, 1.0, -.62);
psAdd(g, new THREE.SphereGeometry(.62, 16, 8, 0, 6.283, 0, Math.PI / 2), "coins", 0, .62, 0).scale.set(1, .45, .6);
psGem(g, "ruby", -.3, .95, .1, 1.2);
psGem(g, "emerald", .25, .92, -.05, 1.2);
psGem(g, "sapphire", .05, .98, .15, 1.1);
psGem(g, "diamond", .4, .9, .15, 1);
psAdd(g, new THREE.TorusGeometry(.12, .03, 6, 14), "gold", -.15, .92, .25, 1.2, 0, 0);
psCoins(g, 26, .9, 0, 13);
return psMerge(g);
},
function () {
var g = psG(), G = "gold";
psAdd(g, new THREE.BoxGeometry(1.6, 1.1, 1.6), "marble", 0, .55, 0);
psAdd(g, new THREE.BoxGeometry(1.75, .12, 1.75), "gold", 0, 1.1, 0);
psAdd(g, new THREE.BoxGeometry(1.75, .12, 1.75), "gold", 0, .06, 0);
var b = psAdd(g, new THREE.SphereGeometry(.5, 14, 10), G, 0, 1.75, 0);
b.scale.set(.8, .9, 1.3);
psAdd(g, new THREE.CylinderGeometry(.16, .26, 1, 10), G, 0, 2.35, .45, -.6, 0, 0);
var h = psAdd(g, new THREE.ConeGeometry(.2, .7, 8), G, 0, 2.85, .95, 1.75, 0, 0);
h.scale.set(1, 1, .8);
psAdd(g, new THREE.ConeGeometry(.05, .3, 5), G, -.1, 3.0, .72, -.5, 0, 0);
psAdd(g, new THREE.ConeGeometry(.05, .3, 5), G, .1, 3.0, .72, -.5, 0, 0);
psAdd(g, new THREE.SphereGeometry(.05, 6, 5), "ruby", -.1, 2.88, 1.05);
psAdd(g, new THREE.SphereGeometry(.05, 6, 5), "ruby", .1, 2.88, 1.05);
var sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.lineTo(1.3, .9);
sh.lineTo(1.1, .2);
sh.lineTo(1.4, -.1);
sh.lineTo(.9, -.2);
sh.lineTo(.4, -.4);
sh.lineTo(0, 0);
var wg = new THREE.ShapeGeometry(sh);
var w1 = psAdd(g, wg, new THREE.MeshPhongMaterial({ color: 0xD9A93A, emissive: 0x3A2606, specular: 0xFFE7A8, shininess: 70, side: THREE.DoubleSide }), .25, 1.95, 0, 0, -.4, .35);
var w2 = psAdd(g, wg, w1.material, -.25, 1.95, 0, 0, Math.PI + .4, -.35);
psAdd(g, new THREE.ConeGeometry(.16, 1.3, 8), G, 0, 1.5, -.95, -1.9, 0, 0);
[[-.3, .35], [.3, .35], [-.3, -.35], [.3, -.35]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.08, .1, .5, 6), G, q[0], 1.38, q[1]); });
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.CylinderGeometry(.28, .36, 1.1, 12), "marble", 0, .55, 0);
psAdd(g, new THREE.CylinderGeometry(.38, .38, .08, 14), "gold", 0, 1.12, 0);
psAdd(g, new THREE.BoxGeometry(.5, .12, .5), "velvet", 0, 1.22, 0);
psCrown(g, 0, 1.28, 0, 1);
psAdd(g, new THREE.SphereGeometry(.42, 16, 10, 0, 6.283, 0, Math.PI / 2), "glass", 0, 1.16, 0);
return psMerge(g);
},
function () {
var g = psG(), S = "steel";
psAdd(g, new THREE.BoxGeometry(.8, .12, .6), "woodD", 0, .06, 0);
psAdd(g, new THREE.CylinderGeometry(.09, .08, .85, 8), S, -.14, .55, 0);
psAdd(g, new THREE.CylinderGeometry(.09, .08, .85, 8), S, .14, .55, 0);
psAdd(g, new THREE.CylinderGeometry(.27, .22, .7, 10), S, 0, 1.3, 0);
psAdd(g, new THREE.CylinderGeometry(.24, .28, .16, 10), S, 0, .95, 0);
psAdd(g, new THREE.SphereGeometry(.14, 10, 8), S, -.32, 1.6, 0);
psAdd(g, new THREE.SphereGeometry(.14, 10, 8), S, .32, 1.6, 0);
psAdd(g, new THREE.CylinderGeometry(.06, .06, .6, 6), S, -.36, 1.25, 0);
psAdd(g, new THREE.CylinderGeometry(.06, .06, .6, 6), S, .36, 1.25, 0);
psAdd(g, new THREE.SphereGeometry(.15, 12, 10), S, 0, 1.86, 0);
psAdd(g, new THREE.BoxGeometry(.22, .04, .05), "iron", 0, 1.86, .14);
psAdd(g, new THREE.ConeGeometry(.05, .24, 6), "velvet", 0, 2.08, 0);
psAdd(g, new THREE.CylinderGeometry(.32, .32, .04, 14), "velvet", .42, 1.15, .12, 0, 0, Math.PI / 2);
psAdd(g, new THREE.SphereGeometry(.07, 8, 6), "gold", .45, 1.15, .12);
psAdd(g, new THREE.CylinderGeometry(.02, .02, 2.4, 6), "woodD", -.5, 1.2, .05);
psAdd(g, new THREE.ConeGeometry(.05, .25, 5), S, -.5, 2.5, .05);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(2, .1, .4), "woodD", 0, .05, 0);
psAdd(g, new THREE.BoxGeometry(2, .08, .12), "woodD", 0, 1.7, -.12);
psAdd(g, new THREE.BoxGeometry(2, .08, .12), "woodD", 0, .9, -.12);
psAdd(g, new THREE.BoxGeometry(.08, 1.9, .1), "woodD", -.98, .95, -.12);
psAdd(g, new THREE.BoxGeometry(.08, 1.9, .1), "woodD", .98, .95, -.12);
[-.7, -.35, 0, .35, .7].forEach(function (x, i) {
if (i % 2 === 0) {
psAdd(g, new THREE.BoxGeometry(.06, 1.2, .02), "steel", x, 1.05, 0);
psAdd(g, new THREE.BoxGeometry(.28, .05, .06), "gold", x, .42, 0);
psAdd(g, new THREE.CylinderGeometry(.025, .025, .3, 6), "woodD", x, .25, 0);
}
else {
psAdd(g, new THREE.CylinderGeometry(.025, .025, 1.7, 6), "wood", x, .9, 0);
var ax = psAdd(g, new THREE.CylinderGeometry(.22, .22, .03, 10, 1, false, 0, Math.PI), "steel", x + .1, 1.6, 0, Math.PI / 2, 0, 0);
ax.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
}
});
return psMerge(g);
},
function () {
var g = psG(), H = Math.max(4, (PS.H || 7) - 0.1);
psAdd(g, new THREE.CylinderGeometry(.55, .6, H - 1, 8), "basaltL", 0, H / 2, 0);
psAdd(g, new THREE.BoxGeometry(1.5, .5, 1.5), "basalt", 0, .25, 0);
psAdd(g, new THREE.CylinderGeometry(.68, .68, .14, 12), "gold", 0, .55, 0);
psAdd(g, new THREE.BoxGeometry(1.5, .45, 1.5), "basalt", 0, H - .22, 0);
psAdd(g, new THREE.CylinderGeometry(.75, .6, .3, 12), "gold", 0, H - .6, 0);
[H * .35, H * .62].forEach(function (y) { psAdd(g, new THREE.CylinderGeometry(.6, .6, .1, 12), "gold", 0, y, 0); });
return psMerge(g);
},
function () {
var g = psG(), y = Math.max(3, (PS.H || 7) - 1.6);
psAdd(g, new THREE.CylinderGeometry(.03, .03, (PS.H || 7) - y, 5), "iron", 0, y + ((PS.H || 7) - y) / 2, 0);
psAdd(g, new THREE.TorusGeometry(1.1, .06, 6, 24), "iron", 0, y, 0, Math.PI / 2, 0, 0);
psAdd(g, new THREE.TorusGeometry(.6, .05, 6, 18), "gold", 0, y + .3, 0, Math.PI / 2, 0, 0);
for (var i = 0; i < 10; i++) {
var a = i / 10 * 6.283;
psAdd(g, new THREE.CylinderGeometry(.05, .05, .24, 6), "cloth", Math.cos(a) * 1.1, y + .16, Math.sin(a) * 1.1);
psFlame(g, Math.cos(a) * 1.1, y + .28, Math.sin(a) * 1.1, .45);
}
[0, 2.09, 4.19].forEach(function (a) { var c = psAdd(g, new THREE.CylinderGeometry(.02, .02, 1.4, 4), "iron", Math.cos(a) * .55, y + .6, Math.sin(a) * .55); c.rotation.set(Math.sin(a) * .65, 0, -Math.cos(a) * .65); });
return psMerge(g);
},
function () {
var g = psG(), r = psRand(41);
psAdd(g, new THREE.BoxGeometry(6.2, .14, 1.5), "woodD", 0, .86, 0);
[[-2.8, -.6], [2.8, -.6], [-2.8, .6], [2.8, .6], [0, -.6], [0, .6]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.09, .12, .8, 8), "woodD", q[0], .42, q[1]); });
psAdd(g, new THREE.BoxGeometry(6.3, .02, .6), "velvet", 0, .94, 0);
psAdd(g, new THREE.BoxGeometry(6.3, .3, .02), "velvet", 0, .8, .3);
psAdd(g, new THREE.BoxGeometry(6.3, .3, .02), "velvet", 0, .8, -.3);
for (var i = 0; i < 6; i++) {
var x = -2.5 + i;
[-.52, .52].forEach(function (z) {
psAdd(g, new THREE.CylinderGeometry(.17, .14, .02, 14), "gold", x, .945, z);
psAdd(g, new THREE.CylinderGeometry(.025, .04, .14, 8), "gold", x + .24, 1.0, z * .8);
psAdd(g, new THREE.CylinderGeometry(.06, .03, .1, 10), "gold", x + .24, 1.11, z * .8);
var s = z > 0 ? 1 : -1;
psAdd(g, new THREE.BoxGeometry(.5, .08, .5), "velvet", x, .5, z + s * .55);
psAdd(g, new THREE.BoxGeometry(.5, 1.2, .08), "woodD", x, 1.0, z + s * .8);
psAdd(g, new THREE.BoxGeometry(.06, .5, .06), "woodD", x - .2, .25, z + s * .4);
psAdd(g, new THREE.BoxGeometry(.06, .5, .06), "woodD", x + .2, .25, z + s * .4);
psAdd(g, new THREE.ConeGeometry(.05, .16, 5), "gold", x, 1.68, z + s * .8);
});
}
[-1.5, 1.5].forEach(function (x) {
psAdd(g, new THREE.CylinderGeometry(.06, .14, .5, 8), "gold", x, 1.18, 0);
psAdd(g, new THREE.BoxGeometry(.7, .04, .04), "gold", x, 1.42, 0);
[-.35, 0, .35].forEach(function (dx) { psAdd(g, new THREE.CylinderGeometry(.035, .035, .22, 6), "cloth", x + dx, 1.55, 0); psFlame(g, x + dx, 1.66, 0, .3); });
});
[-2.4, 0, 2.4].forEach(function (x, j) {
psAdd(g, new THREE.CylinderGeometry(.34, .3, .04, 16), "gold", x + .6, .96, 0);
if (j === 1) {
var roast = psAdd(g, new THREE.SphereGeometry(.24, 12, 8), "food", x + .6, 1.12, 0);
roast.scale.set(1.4, .8, 1);
}
else {
for (var k = 0; k < 6; k++)
psAdd(g, new THREE.SphereGeometry(.07, 8, 6), k % 2 ? "fruit" : "fruitG", x + .6 + (r() - .5) * .36, 1.03 + r() * .08, (r() - .5) * .3);
}
});
[-.9, .9].forEach(function (x) { var br = psAdd(g, new THREE.SphereGeometry(.14, 10, 8), "bread", x, 1.0, .05); br.scale.set(1.5, .7, 1); psAdd(g, new THREE.CylinderGeometry(.06, .07, .3, 8), "wine", x + .3, 1.1, -.05); });
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(2.2, .5, 2.6), "woodD", 0, .3, 0);
psAdd(g, new THREE.BoxGeometry(2.1, .25, 2.5), "cloth", 0, .66, 0);
psAdd(g, new THREE.BoxGeometry(2.14, .08, 1.7), "velvet", 0, .82, .42);
psAdd(g, new THREE.BoxGeometry(2.14, .1, .2), "gold", 0, .84, -.36);
psAdd(g, new THREE.BoxGeometry(.7, .2, .4), "cloth", -.5, .88, -1.0);
psAdd(g, new THREE.BoxGeometry(.7, .2, .4), "cloth", .5, .88, -1.0);
psAdd(g, new THREE.BoxGeometry(2.2, 1.4, .12), "woodD", 0, 1.2, -1.28);
psAdd(g, new THREE.BoxGeometry(1.6, .8, .04), "velvet", 0, 1.35, -1.21);
[[-1.05, -1.25], [1.05, -1.25], [-1.05, 1.25], [1.05, 1.25]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.07, .08, 2.8, 8), "woodD", q[0], 1.4, q[1]); psAdd(g, new THREE.SphereGeometry(.1, 8, 6), "gold", q[0], 2.85, q[1]); });
psAdd(g, new THREE.BoxGeometry(2.3, .14, 2.7), "velvetD", 0, 2.78, 0);
psAdd(g, new THREE.BoxGeometry(2.32, .05, 2.72), "gold", 0, 2.7, 0);
[[-1.12, 0, Math.PI / 2], [1.12, 0, Math.PI / 2]].forEach(function (q) { psAdd(g, new THREE.PlaneGeometry(2.5, 2.2), new THREE.MeshLambertMaterial({ color: 0x7A1020, side: THREE.DoubleSide, transparent: true, opacity: .85 }), q[0], 1.6, q[1], 0, q[2], 0); });
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(1.2, .6, .6), "woodD", 0, .3, 0);
psAdd(g, new THREE.CylinderGeometry(.3, .3, 1.2, 10, 1, false, 0, Math.PI), "woodD", 0, .6, 0, 0, 0, Math.PI / 2);
[-.45, .45].forEach(function (x) { psAdd(g, new THREE.BoxGeometry(.08, .62, .62), "gold", x, .31, 0); });
psAdd(g, new THREE.BoxGeometry(.14, .16, .04), "gold", 0, .5, .31);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(6, .35, 4.2), "basaltL", 0, .18, 0);
psAdd(g, new THREE.BoxGeometry(4.6, .35, 3.2), "basaltL", 0, .53, -.3);
psAdd(g, new THREE.BoxGeometry(6.04, .06, 4.24), "gold", 0, .36, 0);
psAdd(g, new THREE.BoxGeometry(4.64, .06, 3.24), "gold", 0, .71, -.3);
psAdd(g, new THREE.BoxGeometry(3.4, .04, 2), "velvet", 0, .74, -.2);
psAdd(g, new THREE.BoxGeometry(1.6, .6, 1.2), "gold", 0, 1.05, -.5);
psAdd(g, new THREE.BoxGeometry(1.4, .14, 1.0), "velvet", 0, 1.42, -.45);
psAdd(g, new THREE.BoxGeometry(1.8, 3.6, .3), "gold", 0, 2.5, -1.1);
psAdd(g, new THREE.BoxGeometry(1.3, 2.6, .06), "velvet", 0, 2.35, -.93);
psAdd(g, new THREE.BoxGeometry(.24, .7, 1.1), "gold", -.85, 1.65, -.5);
psAdd(g, new THREE.BoxGeometry(.24, .7, 1.1), "gold", .85, 1.65, -.5);
psAdd(g, new THREE.SphereGeometry(.16, 10, 8), "gold", -.85, 2.05, 0);
psAdd(g, new THREE.SphereGeometry(.16, 10, 8), "gold", .85, 2.05, 0);
[-.7, -.35, 0, .35, .7].forEach(function (x, i) { psAdd(g, new THREE.ConeGeometry(.1, .6 + (i === 2 ? .5 : 0) - Math.abs(x) * .3, 6), "gold", x, 4.55 + (i === 2 ? .25 : 0) - Math.abs(x) * .15, -1.1); });
psAdd(g, new THREE.SphereGeometry(.2, 10, 8), "ruby", 0, 3.95, -.92);
psAdd(g, new THREE.OctahedronGeometry(.12, 0), "sapphire", -.5, 3.6, -.93);
psAdd(g, new THREE.OctahedronGeometry(.12, 0), "emerald", .5, 3.6, -.93);
return psMerge(g);
},
function () {
var g = psG(), H = PS.H || 7;
psAdd(g, new THREE.BoxGeometry(4, 1.1, 2.6), "basaltL", 0, .55, 0);
psAdd(g, new THREE.BoxGeometry(4.1, .12, 2.7), "bronze", 0, 1.12, 0);
psAdd(g, new THREE.BoxGeometry(2.4, .5, .06), "coal", 0, .55, 1.31);
psAdd(g, new THREE.BoxGeometry(2.6, .08, .1), "bronze", 0, .84, 1.32);
var lava = psAdd(g, new THREE.BoxGeometry(3.2, .06, 1.8), "lava", 0, 1.18, 0);
lava.userData.psKeep = 1;
lava.onBeforeRender = psFlow;
psAdd(g, new THREE.CylinderGeometry(.4, 2.0, 1.6, 4), "iron", 0, 2.5, 0, 0, Math.PI / 4, 0);
psAdd(g, new THREE.BoxGeometry(1, Math.max(1, H - 3.3), 1), "iron", 0, 3.3 + (H - 3.3) / 2, 0);
psAdd(g, new THREE.BoxGeometry(.9, .5, .6), "wood", -2.5, .6, .4);
psAdd(g, new THREE.ConeGeometry(.3, .8, 6), "fur", -2.5, .6, -.05, Math.PI / 2, 0, 0);
psAdd(g, new THREE.BoxGeometry(.5, .7, .5), "iron", 0, .35, 2.2);
psAdd(g, new THREE.BoxGeometry(1.1, .32, .45), "steel", 0, .86, 2.2);
psAdd(g, new THREE.ConeGeometry(.16, .5, 6), "steel", .75, .86, 2.2, 0, 0, -Math.PI / 2);
psAdd(g, new THREE.CylinderGeometry(.03, .03, .5, 6), "woodD", .2, 1.1, 2.3, 0, 0, .6);
psAdd(g, new THREE.BoxGeometry(.18, .12, .12), "iron", .36, 1.3, 2.3);
return psMerge(g);
},
function () {
var g = psG();
var p = psAdd(g, new THREE.CylinderGeometry(2, 2, .05, 24), "lava", 0, .06, 0);
p.userData.psKeep = 1;
p.onBeforeRender = psFlow;
for (var i = 0; i < 14; i++) {
var a = i / 14 * 6.283;
var rk = psAdd(g, new THREE.DodecahedronGeometry(.42 + ((i * 7) % 3) * .1, 0), "basalt", Math.cos(a) * 2.2, .22, Math.sin(a) * 2.2);
rk.scale.y = .6;
}
return psMerge(g);
},
function () {
var g = psG(), r = psRand(53);
psAdd(g, new THREE.BoxGeometry(1.2, .7, 1.7), "iron", 0, .65, 0);
psAdd(g, new THREE.BoxGeometry(1.26, .08, 1.76), "bronze", 0, 1.0, 0);
[[-.6, -.55], [.6, -.55], [-.6, .55], [.6, .55]].forEach(function (q) { psAdd(g, new THREE.CylinderGeometry(.22, .22, .1, 12), "iron", q[0], .24, q[1], 0, 0, Math.PI / 2); });
var m = psAdd(g, new THREE.SphereGeometry(.62, 12, 8, 0, 6.283, 0, Math.PI / 2), "coins", 0, .98, 0);
m.scale.set(.95, .55, 1.35);
for (var i = 0; i < 7; i++)
psGem(g, PS_GEMS[i % 5], (r() - .5) * .8, 1.15 + r() * .15, (r() - .5) * 1.2, 1.2);
for (var k = 0; k < 5; k++) {
var o = psAdd(g, new THREE.DodecahedronGeometry(.16, 0), "ore", (r() - .5) * .7, 1.2, (r() - .5) * 1.1);
}
return psMerge(g);
},
function () {
var g = psG(), H = Math.min(4.2, (PS.H || 7) - .5);
psAdd(g, new THREE.BoxGeometry(.3, H, .3), "wood", -1.8, H / 2, 0);
psAdd(g, new THREE.BoxGeometry(.3, H, .3), "wood", 1.8, H / 2, 0);
psAdd(g, new THREE.BoxGeometry(4.2, .34, .36), "wood", 0, H, 0);
psAdd(g, new THREE.BoxGeometry(.5, .3, .3), "wood", -1.55, H - .32, 0, 0, 0, .7);
psAdd(g, new THREE.BoxGeometry(.5, .3, .3), "wood", 1.55, H - .32, 0, 0, 0, -.7);
psAdd(g, new THREE.CylinderGeometry(.03, .03, .5, 5), "iron", 0, H - .4, 0);
psAdd(g, new THREE.BoxGeometry(.26, .34, .26), "iron", 0, H - .8, 0);
psAdd(g, new THREE.BoxGeometry(.18, .24, .18), "fireC", 0, H - .8, 0);
return psMerge(g);
},
function () {
var g = psG(), r = psRand(61);
for (var i = 0; i < 16; i++) {
var a = r() * 6.283, rr = r() * 1.1, s = .25 + r() * .3;
var o = psAdd(g, new THREE.DodecahedronGeometry(s, 0), "ore", Math.cos(a) * rr, s * .7 + (1.1 - rr) * .4, Math.sin(a) * rr);
o.rotation.set(r() * 3, r() * 3, 0);
}
for (var k = 0; k < 10; k++) {
var a2 = r() * 6.283, r2 = r() * 1.0;
psAdd(g, new THREE.DodecahedronGeometry(.1, 0), "gold", Math.cos(a2) * r2, .3 + (1 - r2) * .5, Math.sin(a2) * r2);
}
for (var c = 0; c < 4; c++) {
var cr = psAdd(g, new THREE.OctahedronGeometry(.14, 0), "crystal", (r() - .5) * 1.2, .55 + r() * .3, (r() - .5) * 1.2);
cr.scale.y = 2.6;
cr.rotation.z = (r() - .5) * .8;
}
return psMerge(g);
},
function () {
var g = psG(), r = psRand(71);
psAdd(g, new THREE.DodecahedronGeometry(.7, 0), "rock", 0, .3, 0).scale.y = .5;
for (var i = 0; i < 9; i++) {
var h = .6 + r() * 1.6, c = psAdd(g, new THREE.OctahedronGeometry(.2, 0), "crystal", (r() - .5) * .9, h * .55, (r() - .5) * .9);
c.scale.set(1, h * 2.2, 1);
c.rotation.set((r() - .5) * .7, r() * 3, (r() - .5) * .7);
}
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.CylinderGeometry(1.25, 1.25, 4, 20), "copper", 0, 1.65, 0, 0, 0, Math.PI / 2);
[-1.6, -.5, .5, 1.6].forEach(function (x) { psAdd(g, new THREE.CylinderGeometry(1.3, 1.3, .12, 20), "brass", x, 1.65, 0, 0, 0, Math.PI / 2); });
psAdd(g, new THREE.SphereGeometry(1.25, 16, 10, 0, Math.PI), "copper", 2, 1.65, 0, 0, Math.PI / 2, 0);
psAdd(g, new THREE.SphereGeometry(1.25, 16, 10, 0, Math.PI), "copper", -2, 1.65, 0, 0, -Math.PI / 2, 0);
psAdd(g, new THREE.BoxGeometry(4.4, .4, 2), "iron", 0, .2, 0);
[-1.6, 1.6].forEach(function (x) { psAdd(g, new THREE.BoxGeometry(.3, .9, 1.8), "iron", x, .6, 0); });
psAdd(g, new THREE.BoxGeometry(1, .9, .2), "iron", 2.9, .9, 0, 0, Math.PI / 2, 0);
psAdd(g, new THREE.BoxGeometry(.6, .5, .06), "coal", 3.02, .9, 0, 0, Math.PI / 2, 0);
psAdd(g, new THREE.CylinderGeometry(.3, .3, Math.max(2, (PS.H || 7) - 3), 12), "iron", -1.2, 2.9 + Math.max(2, (PS.H || 7) - 3) / 2, 0);
psAdd(g, new THREE.CylinderGeometry(.22, .22, .06, 16), "gauge", .6, 2.95, 0, 0, 0, 0);
psAdd(g, new THREE.CylinderGeometry(.24, .24, .05, 16), "brass", .6, 2.93, 0);
psAdd(g, new THREE.CylinderGeometry(.12, .12, 1.6, 10), "brass", 1.2, 3.6, 0);
psAdd(g, new THREE.TorusGeometry(.2, .04, 6, 14), "valve", 1.2, 4.1, 0, Math.PI / 2, 0, 0);
var st = psAdd(g, new THREE.SphereGeometry(.4, 10, 8), "steam", 1.2, 4.6, 0);
st.userData.psKeep = 1;
st.onBeforeRender = function () { var t = performance.now() / 1000; st.scale.setScalar(1 + 0.25 * Math.sin(t * 0.8)); st.position.y = 4.6 + 0.2 * Math.sin(t * 0.5); };
return psMerge(g);
},
function () {
var g = psG(), W = psG();
psAdd(W, new THREE.TorusGeometry(1.8, .16, 8, 32), "iron", 0, 0, 0);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI;
psAdd(W, new THREE.BoxGeometry(3.5, .12, .12), "iron", 0, 0, 0, 0, 0, a);
}
psAdd(W, new THREE.CylinderGeometry(.32, .32, .4, 14), "brass", 0, 0, 0, Math.PI / 2, 0, 0);
var wm = psMerge(W);
wm.position.set(0, 2.2, 0);
wm.userData.psKeep = 1;
wm.onBeforeRender = function () { };
wm.children.forEach(function (c) { c.onBeforeRender = function () { wm.rotation.z = -(performance.now() / 1000) * 0.5; }; });
g.add(wm);
psAdd(g, new THREE.BoxGeometry(.4, 2.3, .6), "iron", 0, 1.15, -.45);
psAdd(g, new THREE.BoxGeometry(.4, 2.3, .6), "iron", 0, 1.15, .45);
psAdd(g, new THREE.BoxGeometry(1.2, .3, 1.6), "iron", 0, .15, 0);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.CylinderGeometry(.5, .5, 2, 16), "brass", 0, 1.3, 0);
psAdd(g, new THREE.CylinderGeometry(.56, .56, .14, 16), "copper", 0, 2.3, 0);
psAdd(g, new THREE.CylinderGeometry(.56, .56, .14, 16), "copper", 0, .3, 0);
psAdd(g, new THREE.BoxGeometry(1.4, .3, 1.4), "iron", 0, .15, 0);
var rod = psAdd(g, new THREE.CylinderGeometry(.1, .1, 1.6, 8), "steel", 0, 3.1, 0);
rod.userData.psKeep = 1;
rod.onBeforeRender = function () { rod.position.y = 3.1 + 0.35 * Math.sin(performance.now() / 1000 * 1.1); };
return psMerge(g);
},
function () {
var g = psG(), H = PS.H || 7;
[-.7, 0, .7].forEach(function (x, i) { psAdd(g, new THREE.CylinderGeometry(.13, .13, H - .4, 10), i === 1 ? "brass" : "copper", x, (H - .4) / 2, 0); psAdd(g, new THREE.TorusGeometry(.16, .04, 6, 12), "brass", x, 1.2 + i * .6, 0, Math.PI / 2, 0, 0); });
psAdd(g, new THREE.CylinderGeometry(.13, .13, 1.6, 10), "copper", 0, H - .8, 0, 0, 0, Math.PI / 2);
psAdd(g, new THREE.TorusGeometry(.22, .05, 6, 14), "valve", 0, 1.6, .2);
psAdd(g, new THREE.CylinderGeometry(.18, .18, .05, 14), "gauge", -.7, 1.9, .15, Math.PI / 2, 0, 0);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.CylinderGeometry(.05, .06, 2.2, 6), "iron", 0, 1.1, 0);
psAdd(g, new THREE.BoxGeometry(.4, .06, .06), "iron", .2, 2.2, 0);
psAdd(g, new THREE.BoxGeometry(.24, .32, .24), "iron", .38, 1.95, 0);
psAdd(g, new THREE.BoxGeometry(.18, .24, .18), "fireC", .38, 1.95, 0);
psAdd(g, new THREE.ConeGeometry(.2, .14, 4), "iron", .38, 2.17, 0, 0, Math.PI / 4, 0);
return psMerge(g);
},
function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(.7, .1, .7), "velvet", 0, .5, 0);
psAdd(g, new THREE.BoxGeometry(.7, 1.4, .1), "woodD", 0, 1.15, -.32);
[[-.3, -.3], [.3, -.3], [-.3, .3], [.3, .3]].forEach(function (q) { psAdd(g, new THREE.BoxGeometry(.08, .5, .08), "woodD", q[0], .25, q[1]); });
psAdd(g, new THREE.ConeGeometry(.06, .18, 5), "gold", 0, 1.95, -.32);
return psMerge(g);
},
function (W, D, put, spots) {
put("grandthrone", 0, -D / 2 + 3.4, 0);
put("goldstatue", -5.2, -D / 2 + 3.6, 0);
put("goldstatue", 5.2, -D / 2 + 3.6, 0);
put("brazier", -3.6, -D / 2 + 6.2, 0);
put("brazier", 3.6, -D / 2 + 6.2, 0);
psRunner(D, put, -D / 2 + 5.6, D / 2 - 1.2);
var cx = Math.min(W / 2 - 5, Math.max(5, W / 4));
for (var z = -D / 2 + 9; z < D / 2 - 4; z += 7) {
put("goldcolumn", -cx, z, 0);
put("goldcolumn", cx, z, 0);
if (z + 3.5 < D / 2 - 4) {
put("brazier", -cx, z + 3.5, 0);
put("brazier", cx, z + 3.5, 0);
}
}
for (var z2 = -D / 2 + 8; z2 < D / 2 - 3; z2 += 10)
put("ironchandelier", 0, z2, 0);
psEdge(W, D, ["hallbanner", "armourstand", "hallbanner", "weaponrack"], 5, 1.6, put);
psSconces(W, D, put);
if (W > 30)
for (var z3 = -D / 2 + 10; z3 < D / 2 - 6; z3 += 12) {
put("feasttable", -(cx + W / 2) / 2, z3, Math.PI / 2);
put("feasttable", (cx + W / 2) / 2, z3, Math.PI / 2);
}
spots.push({ x: 0, z: -D / 2 + 7, room: "the throne" });
spots.push({ x: 0, z: 0, room: "the great hall" });
},
function (k, W, D, put, spots) {
var x, z, i = 0;
if (k === "treasury") {
put("goldhoard", 0, -D / 2 + 8, 0);
put("vaultround", 0, -D / 2 + .25, 0);
psRunner(D, put, -D / 2 + 12.5, D / 2 - 1.2);
put("goldhoard", -W / 2 + 7, -D / 2 + 7, 1.3);
put("goldhoard", W / 2 - 7, -D / 2 + 7, 2.6);
if (D > 34) {
put("goldhoard", -W / 2 + 7, D / 2 - 9, .6);
put("goldhoard", W / 2 - 7, D / 2 - 9, 2.1);
}
for (z = -D / 2 + 14; z < D / 2 - 6; z += 5) {
put("treasurechest", -3.2, z, Math.PI / 2);
put("treasurechest", 3.2, z, -Math.PI / 2);
put(i % 2 ? "crownstand" : "gemheap", -6, z + 2.4, 0);
put(i % 2 ? "gemheap" : "crownstand", 6, z + 2.4, 0);
i++;
}
put("goldstatue", -4.6, -D / 2 + 12, 0);
put("goldstatue", 4.6, -D / 2 + 12, 0);
for (z = -D / 2 + 16; z < D / 2 - 6; z += 10) {
put("goldcolumn", -W / 2 + 11, z, 0);
put("goldcolumn", W / 2 - 11, z, 0);
}
psEdge(W, D, ["treasurechest", "gemheap", "armourstand", "treasurechest", "crownstand"], 4.4, 1.7, put);
for (z = -D / 2 + 6; z < D / 2 - 3; z += 10)
put("ironchandelier", 0, z, 0);
psSconces(W, D, put);
[[-W / 4, -D / 2 + 16], [W / 4, -D / 2 + 16], [-W / 4, D / 2 - 10], [W / 4, D / 2 - 10]].forEach(function (q) { put("brazier", q[0], q[1], 0); });
}
else if (k === "banquet") {
put("grandthrone", 0, -D / 2 + 2.4, 0);
put("feasttable", 0, -D / 2 + 6.6, 0);
for (x = -W / 2 + 7; x <= W / 2 - 7; x += Math.max(7, (W - 14) / 2))
for (z = -D / 2 + 12; z < D / 2 - 6; z += 7.5)
put("feasttable", x, z, Math.PI / 2);
for (z = -D / 2 + 8; z < D / 2 - 4; z += 9) {
put("ironchandelier", -W / 4, z, 0);
put("ironchandelier", W / 4, z, 0);
}
psEdge(W, D, ["hallbanner", "brazier", "hallbanner", "armourstand"], 5, 1.6, put);
put("fireplace", -W / 2 + .45, 0, Math.PI / 2);
put("fireplace", W / 2 - .45, 0, -Math.PI / 2);
psSconces(W, D, put);
}
else if (k === "forge") {
put("lavaforge", 0, -D / 2 + 2.2, 0);
put("goldstatue", -4.2, -D / 2 + 2.4, 0);
put("goldstatue", 4.2, -D / 2 + 2.4, 0);
put("hephaestus", 0, -D / 2 + 6.4, 0);
for (z = -D / 2 + 9; z < D / 2 - 6; z += 8) {
put("lavaforge", -W / 2 + 3.2, z, Math.PI / 2);
put("lavaforge", W / 2 - 3.2, z, -Math.PI / 2);
put("anvil", -W / 2 + 6.4, z, Math.PI / 2);
put("anvil", W / 2 - 6.4, z, -Math.PI / 2);
}
put("lavapool", 0, -D / 2 + 12, 0);
for (z = -D / 2 + 18; z < D / 2 - 10; z += 7) {
put("armourstand", -2.6, z, Math.PI / 2);
put("weaponrack", 2.6, z, -Math.PI / 2);
put("brazier", 0, z + 3.5, 0);
}
psBack(W, D, ["weaponrack", "crates", "barrel"], 5, .6, put, 7);
for (z = -D / 2 + 8; z < D / 2 - 3; z += 10)
put("ironchandelier", 0, z, 0);
psSconces(W, D, put);
}
else if (k === "mine") {
[-W / 4, W / 4].forEach(function (rx, j) {
PS.runL = D - 6;
put("minerails", rx, 1, 0);
PS.runL = null;
for (z = -D / 2 + 6; z < D / 2 - 4; z += 6)
put("mineprop", rx, z, 0);
put("minecart", rx, -D / 2 + 10 + j * 6, 0);
put("minecart", rx, D / 2 - 12 - j * 4, 0);
});
for (z = -D / 2 + 5; z < D / 2 - 6; z += 6) {
put(i % 2 ? "crystalcluster" : "oreheap", 0, z, i);
i++;
}
psEdge(W, D, ["crystalcluster", "oreheap", "boulder", "lantern", "stalagmite", "crates"], 4, 1.6, put);
psBack(W, D, ["crystalcluster", "oreheap", "lantern"], 5, 1.6, put);
}
else if (k === "engine") {
for (z = -D / 2 + 5; z < D / 2 - 7; z += 7) {
put("boiler", -W / 4, z, 0);
put("boiler", W / 4, z, 0);
}
for (z = -D / 2 + 8.5; z < D / 2 - 7; z += 7) {
put("flywheel", 0, z, Math.PI / 2);
put("piston", -W / 4 + 3.6, z, 0);
put("piston", W / 4 - 3.6, z, 0);
}
psEdge(W, D, ["pipes", "barrel", "pipes", "oreheap"], 4, .6, put);
psBack(W, D, ["pipes"], 3, .4, put);
for (z = -D / 2 + 6; z < D / 2 - 3; z += 9)
put("lantern", -W / 2 + 3, z, 0);
}
else if (k === "bedroom") {
for (z = -D / 2 + 5; z < D / 2 - 6; z += 7) {
put("fourposter", -W / 2 + 3, z, Math.PI / 2);
put("footchest", -W / 2 + 5, z, Math.PI / 2);
put("fourposter", W / 2 - 3, z, -Math.PI / 2);
put("footchest", W / 2 - 5, z, -Math.PI / 2);
}
psRunner(D, put, -D / 2 + 3, D / 2 - 1.5);
for (z = -D / 2 + 6; z < D / 2 - 5; z += 9) {
put("pelt", 0, z, 0);
put("highchair", -1.4, z, Math.PI / 2);
put("highchair", 1.4, z, -Math.PI / 2);
put("ironchandelier", 0, z, 0);
}
put("fireplace", 0, -D / 2 + .45, 0);
psBack(W, D, ["wardrobe", "hallbanner"], 6, .5, put, 4);
psSconces(W, D, put);
}
else if (k === "armoury") {
for (z = -D / 2 + 5; z < D / 2 - 6; z += 4) {
put("armourstand", -4, z, Math.PI / 2);
put("armourstand", 4, z, -Math.PI / 2);
}
psEdge(W, D, ["weaponrack", "weaponrack", "hallbanner"], 3, .6, put);
psSconces(W, D, put);
for (z = -D / 2 + 6; z < D / 2 - 3; z += 10)
put("ironchandelier", 0, z, 0);
}
else
return false;
spots.push({ x: 0, z: 0, room: (typeof ROOMNAME !== "undefined" && ROOMNAME[k]) || k });
return true;
},
function (I, setting) {
var root = I.root, F = I.floor || 7.5, H = I.ceilH || 7, L = I.levels || 1, W = I.W, D = I.D;
var rockT = psRockTex(setting === "stone" ? "stone" : setting === "volcano" ? "volcano" : "rock");
var wallM = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: rockT });
var floorM = new THREE.MeshLambertMaterial({ color: setting === "stone" ? 0xC8C0B4 : 0xE0D8D0, map: rockT });
var ceilM = new THREE.MeshLambertMaterial({ color: setting === "stone" ? 0x9A9288 : 0xA8A098, map: rockT, side: THREE.DoubleSide });
if (setting === "volcano") {
floorM.emissiveMap = psGlowTex();
floorM.emissive = new THREE.Color(0xFFFFFF);
floorM.emissiveIntensity = 0.6;
wallM.emissiveMap = psGlowTex();
wallM.emissive = new THREE.Color(0xFFFFFF);
wallM.emissiveIntensity = 0.4;
}
[wallM, floorM, ceilM].forEach(function (m) { m.map = rockT; m.needsUpdate = true; });
if (rockT.repeat)
rockT.repeat.set(1 / 9, 1 / 9);
if (floorM.emissiveMap)
floorM.emissiveMap.repeat.set(1 / 9, 1 / 9);
var top = null;
root.children.slice().forEach(function (m) {
if (m.isLight)
return;
if (m.userData && m.userData.furn) {
var to = PS_SWAP[m.userData.furn];
if (to && FURN[to]) {
var n = FURN[to]();
n.userData.furn = to;
n.position.copy(m.position);
n.rotation.copy(m.rotation);
root.remove(m);
root.add(n);
}
else if (m.userData.furn === "chandelier" && FURN.ironchandelier) {
var c = FURN.ironchandelier();
c.userData.furn = "ironchandelier";
c.position.copy(m.position);
root.remove(m);
root.add(c);
}
return;
}
if (!m.isMesh || !m.geometry)
return;
var t = m.geometry.type, p = m.geometry.parameters || {};
if (m.userData.liveDone) {
root.remove(m);
return;
}
if (t === "PlaneGeometry") {
root.remove(m);
return;
}
if (t === "SphereGeometry" && Math.abs((p.radius || 0) - 0.14) < 0.001) {
root.remove(m);
return;
}
if (t !== "BoxGeometry")
return;
var w = p.width, h = p.height, d = p.depth;
if (Math.abs(w - 1.7) < 0.01 && Math.abs(h - 2.25) < 0.01) {
m.material = psM("iron");
return;
}
var g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
if (h <= 0.45 && w > 3 && d > 3) {
m.geometry = g;
m.material = [ceilM, ceilM, floorM, ceilM, ceilM, ceilM];
if (!top || m.position.y > top.position.y)
top = m;
return;
}
if (h >= 0.6 && Math.min(w, d) <= 0.3) {
m.geometry = g;
m.material = wallM;
}
});
if (top && top.position.y > 2)
top.material = ceilM;
I.winMats = [];
I.winGlints = [];
var lc = setting === "volcano" ? 0xFF9A5A : setting === "rock" ? 0xFFC890 : 0xFFD6A0;
(I.lightPool || []).forEach(function (l) { l.color.setHex(lc); });
if (I.lightFill)
I.lightFill.color.setHex(setting === "volcano" ? 0xFFB080 : 0xFFE0C0);
root.children.forEach(function (c) { if (c.isHemisphereLight) {
c.color.setHex(setting === "volcano" ? 0xFFB890 : 0xFFE8D0);
c.groundColor.setHex(setting === "volcano" ? 0x3A1408 : 0x2A2018);
} });
var deco = new THREE.Group();
deco.userData.psDeco = 1;
root.add(deco);
for (var lv = 0; lv < L; lv++) {
var y = lv * F, d2 = new THREE.Group();
d2.userData.psLvl = lv;
deco.add(d2);
var r = psRand(101 + lv);
var stM = setting === "stone" ? null : psM("basaltL");
if (stM)
for (var s = 0; s < Math.min(40, Math.floor(W * D / 60)); s++) {
var len = .6 + r() * 1.8, st = new THREE.Mesh(new THREE.ConeGeometry(.25 + r() * .35, len, 6), stM);
st.rotation.x = Math.PI;
st.position.set(-W / 2 + 2 + r() * (W - 4), y + H - len / 2, -D / 2 + 2 + r() * (D - 4));
d2.add(st);
}
if (setting === "volcano") {
[-1, 1].forEach(function (sd) {
var lx = sd * (W / 2 - 0.5);
var ch = new THREE.Mesh(new THREE.BoxGeometry(.7, .05, D - 1.2), psM("lava"));
ch.position.set(lx, y + .04, 0);
ch.onBeforeRender = psFlow;
d2.add(ch);
var curb = new THREE.Mesh(new THREE.BoxGeometry(.22, .3, D - 1.2), psM("basalt"));
curb.position.set(lx - sd * .46, y + .15, 0);
d2.add(curb);
if (lv === 0) {
var fall = new THREE.Mesh(new THREE.BoxGeometry(.8, H, .12), psM("lava"));
fall.position.set(lx, y + H / 2, -D / 2 + .2);
fall.onBeforeRender = psFlow;
d2.add(fall);
var pool = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, .06, 14), psM("lava"));
pool.position.set(lx - sd * .2, y + .05, -D / 2 + 1.1);
d2.add(pool);
}
});
if (lv > 0)
d2.add(new THREE.PointLight(0xFF6A2A, 0.35, Math.max(W, D)));
}
}
},
function (T, L) {
if (!T || !L || T.archetype === "volcano")
return false;
var Ls = (L.attrs && L.attrs.s) || 1, Rb = PS_V.R * Ls;
var C = (typeof dreamCluster === "function") ? dreamCluster() : null, me = (typeof dlMe === "function") ? dlMe() : { x: camera.position.x, z: camera.position.z };
var fx = (C ? C.x : me.x) - L.x, fz = (C ? C.z : me.z) - L.z, fl = Math.hypot(fx, fz);
if (fl < 5) {
fx = me.x - L.x;
fz = me.z - L.z;
fl = Math.hypot(fx, fz);
}
if (fl < 1) {
fx = 0;
fz = 1;
fl = 1;
}
fx /= fl;
fz /= fl;
L.attrs = L.attrs || {};
if (!(L.attrs.s >= 1.7)) {
L.attrs.s = 1.7;
Ls = 1.7;
Rb = PS_V.R * Ls;
}
T.rot = Math.atan2(fx, fz);
T.y = 0;
T.psInside = L.id;
T.attrs = T.attrs || {};
T.attrs.noModel = 1;
T.x = L.x;
T.z = L.z;
var D = doorWorld(T), gx = L.x + fx * (Rb * 1.12 + 14), gz = L.z + fz * (Rb * 1.12 + 14);
T.x += gx - (D.x - D.out.x * 0.6);
T.z += gz - (D.z - D.out.z * 0.6);
T.dlNest = 1;
T.dlAt = { x: T.x, z: T.z, y: 0 };
if (typeof refresh === "function") {
refresh(T);
refresh(L);
}
var side = 0;
store.objects.forEach(function (o) {
if (o.archetype !== "tunnel" || (o.realm || 0) !== (store.here || 0) || o.city)
return;
var sd = (side++ % 2 ? 1 : -1) * (30 + Math.floor(side / 2) * 14), px = -fz, pz = fx;
o.x = gx + px * sd - fx * 2;
o.z = gz + pz * sd - fz * 2;
o.rot = T.rot;
o.y = 0;
o.dlNest = 1;
o.dlAt = { x: o.x, z: o.z, y: 0 };
if (typeof refresh === "function")
refresh(o);
});
var sx = gx + fx * 105, sz = gz + fz * 105;
if (typeof dlStand === "function") {
dlStand(sx, (typeof terrainY === "function") ? terrainY(sx, sz) : 0, sz, gx, gz);
if (DL.stand)
DL.stand.firm = 1;
}
return true;
}
];
});
