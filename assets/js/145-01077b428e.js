/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof KIT === "undefined" || !KIT.cave)
return;
if (typeof CUSTOM_SHAPE !== "undefined" && CUSTOM_SHAPE.ell)
KIT.cave.parts = [
{ g: "ell", s: [6.5, 4.6, 5.5], p: [0, 2.2, -1], c: 0x6B655C },
{ g: "ell", s: [3.8, 3.2, 3.4], p: [-3.6, 1.6, 0.8], c: 0x5E584F },
{ g: "ell", s: [3.4, 2.8, 3.2], p: [3.8, 1.4, 0.6], c: 0x635D54 },
{ g: "ell", s: [2.6, 2.2, 2.4], p: [1.2, 4.6, -1.6], c: 0x726B61 },
{ g: "ell", s: [1.9, 2.3, 0.9], p: [0, 1.2, 3.95], c: 0x0E0C0B },
{ g: "ell", s: [0.9, 0.7, 0.8], p: [-2.8, 0.5, 4.3], c: 0x575148 },
{ g: "ell", s: [0.8, 0.55, 0.7], p: [2.9, 0.4, 4.1], c: 0x5E584F }
];
else
(KIT.cave.parts || []).forEach(function (pt) { if (pt.g === "pln" && pt.c === "dark") {
pt.p = [0, 2.4, 4.05];
pt.s = [4.6, 4.4];
} });
var ROCK = 0x5C564E, DARKROCK = 0x403B35;
function rockMat(c) { return new THREE.MeshLambertMaterial({ color: c, flatShading: true }); }
if (typeof FURN !== "undefined") {
FURN.stalagmite = function () {
var g = F([P(cone(.45, 1.8, 7), rockMat(ROCK), 0, .9, 0), P(cone(.28, 1.1, 6), rockMat(DARKROCK), .55, .55, .2), P(cone(.2, .8, 6), rockMat(ROCK), -.4, .4, -.25)]);
return g;
};
FURN.stalactites = function () {
var H = (typeof INT_H !== "undefined" ? INT_H : 3.2);
var g = F([]);
[[0, 0, 1.3], [.7, .3, .9], [-.6, -.4, 1.1], [.2, -.8, .7]].forEach(function (q) { var m = P(cone(.22, q[2], 6), rockMat(DARKROCK), q[0], H - q[2] / 2, q[1]); m.rotation.x = Math.PI; g.add(m); });
return g;
};
FURN.boulder = function () {
return F([P(new THREE.DodecahedronGeometry(.9, 0), rockMat(ROCK), 0, .6, 0), P(new THREE.DodecahedronGeometry(.55, 0), rockMat(DARKROCK), .9, .35, .4)]);
};
FURN.crystals = function () {
var g = F([]);
[[0, 0, 1.1, 0], [.3, .15, .8, .35], [-.25, .2, .7, -.4], [.1, -.3, .6, .2]].forEach(function (q) {
var m = P(new THREE.OctahedronGeometry(.18, 0), new THREE.MeshBasicMaterial({ color: 0x8FD8F0 }), q[0], q[2] / 2, q[1]);
m.scale.set(1, q[2] * 2.6, 1);
m.rotation.z = q[3];
g.add(m);
});
return g;
};
FURN.cavepool = function () {
return F([P(new THREE.CylinderGeometry(1.6, 1.6, .04, 14), new THREE.MeshLambertMaterial({ color: 0x1E3A4A, transparent: true, opacity: .85 }), 0, .03, 0)]);
};
}
if (typeof SOLIDFURN !== "undefined") {
SOLIDFURN.boulder = 1;
SOLIDFURN.stalagmite = 1;
}
if (typeof PLANS !== "undefined")
PLANS.cave = { mode: "hall", w: 14, d: 20, fill: "cave", wall: DARKROCK, floor: "stone" };
if (typeof ROOMNAME !== "undefined")
ROOMNAME.cave = "the cavern";
if (typeof fillHall === "function") {
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
if (kind !== "cave")
return fh.apply(this, arguments);
for (var z = -D / 2 + 2; z < D / 2 - 3; z += 3.2) {
put("boulder", -W / 2 + 1.1, z, z);
put("boulder", W / 2 - 1.1, z + 1.4, -z);
}
[[-W / 4, -D / 4], [W / 4, -D / 6], [-W / 6, D / 8], [W / 5, D / 5], [0, -D / 2 + 2.2]].forEach(function (q, i) { put("stalagmite", q[0], q[1], i); });
[[-W / 5, -D / 3], [W / 6, 0], [0, D / 4]].forEach(function (q) { put("stalactites", q[0], q[1], 0); });
put("crystals", -W / 2 + 2.2, -D / 2 + 2, 0);
put("crystals", W / 2 - 2.4, -D / 8, 0);
put("crystals", -W / 2 + 2.4, D / 5, 0);
put("cavepool", W / 6, -D / 3, 0);
spots.push({ x: 0, z: D / 6, room: "cavern" });
};
}
function isCave(spec) { return !!(spec && (spec.archetype === "cave" || (KIT[spec.archetype] && KIT[spec.archetype].caveLike))); }
if (typeof enterable === "function") {
var en = enterable;
enterable = function (spec) { if (isCave(spec) && !spec.filler)
return true; return en.apply(this, arguments); };
}
if (typeof doorWorld === "function") {
var dw = doorWorld;
doorWorld = function (spec) {
if (!isCave(spec))
return dw.apply(this, arguments);
var a = spec.attrs || {}, s = a.s || 1, lz = ((KIT[spec.archetype] || {}).doorZ || 5.0) * s * (a.d || 1) + 0.6, r = spec.rot || 0;
return { x: spec.x + lz * Math.sin(r), z: spec.z + lz * Math.cos(r), out: { x: Math.sin(r), z: Math.cos(r) } };
};
}
if (typeof makeInterior === "function") {
var mi = makeInterior;
makeInterior = function (spec) {
var I = mi.apply(this, arguments);
if (!isCave(spec) || !I)
return I;
var hide = {};
(I.winMats || []).concat(I.winGlints || []).forEach(function (m) { hide[m.uuid] = 1; });
I.root.traverse(function (m) { if (m.isMesh && m.material && hide[m.material.uuid])
m.visible = false; });
I.winMats = [];
I.winGlints = [];
I.lightSpots = [];
I.cave = true;
var H = I.ceilH || 3.2, roof = rockMat(0x332F2A);
I.root.add(P(box(I.W + 0.4, 0.4, I.D + 0.4), roof, 0, H + 0.2, 0));
return I;
};
}
})();
