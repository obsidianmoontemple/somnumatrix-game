/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(174, function () {
"use strict";
return [
function (pt) {
var S = pt.s || [1], w, h, d;
if (pt.g === "box") {
w = S[0];
h = S[1] || S[0];
d = S[2] || S[0];
}
else if (pt.g === "cyl") {
w = d = 2 * Math.max(S[0], S[1] || S[0]);
h = S[2] || S[0];
}
else if (pt.g === "cone") {
w = d = 2 * S[0];
h = S[1] || S[0];
}
else if (pt.g === "ell") {
w = 2 * S[0];
h = 2 * (S[1] || S[0]);
d = 2 * (S[2] || S[0]);
}
else if (pt.g === "tor") {
w = d = 2 * (S[0] + (S[1] || 0));
h = 2 * (S[1] || 0.1);
}
else if (pt.g === "tri") {
w = S[0];
h = S[1] || 1;
d = S[2] || S[0];
}
else {
w = h = d = 2 * S[0];
}
var r = pt.r || [0, 0, 0], q = function (a) { return Math.abs(Math.sin(a)) > 0.7; };
if (q(r[0])) {
var t = h;
h = d;
d = t;
}
if (q(r[2])) {
var u = h;
h = w;
w = u;
}
return { w: w, h: h, d: d, y0: (pt.p ? pt.p[1] : 0) - h / 2, y1: (pt.p ? pt.p[1] : 0) + h / 2 };
},
function (def) {
if (!def || def.cat !== "structure" || !Array.isArray(def.parts) || !Array.isArray(def.size))
return def;
var W = def.size[0], H = def.size[1], D = def.size[2], foot = W * D;
if (!(W > 0 && H > 0 && D > 0))
return def;
var body = null, roof = null, big = null, bigV = 0, top = null, topY = -1;
def.parts.forEach(function (pt) {
if (!pt || !pt.s || !pt.p)
return;
var e = dbExtent(pt), v = e.w * e.h * e.d;
if (v > bigV && pt.g !== "cone") {
bigV = v;
big = pt;
}
if (e.y1 > topY && e.w * e.d > foot * 0.08) {
topY = e.y1;
top = pt;
}
if ((pt.g === "box" || pt.g === "cyl" || pt.g === "ell") && e.w * e.d >= foot * 0.35 && e.h >= H * 0.28 && e.y0 <= H * 0.2)
body = body || pt;
if ((e.y0 >= H * 0.35 && e.w * e.d >= foot * 0.25) || (pt.g === "cone" && e.w * e.d >= foot * 0.25))
roof = roof || pt;
});
if (body)
return def;
var d = Object.assign({}, def), parts = def.parts.slice();
var wallC = (big && dbHex(big.c) !== null) ? big.c : "#C8B8A0";
var bh = Math.max(2.4, Math.min(H * 0.58, H - 1)), bw = W * 0.84, bd = D * 0.84;
parts.unshift({ g: "box", s: [bw, bh, bd], p: [0, bh / 2, 0], c: wallC });
if (!roof) {
var roofC = (top && top !== big && dbHex(top.c) !== null) ? top.c : "#5A3A2E";
var side = Math.max(bw, bd) * 1.08, rh = Math.max(1.2, Math.min(H - bh, side * 0.45));
parts.push({ g: "cone", s: [side / Math.SQRT2, rh, 4], p: [0, bh + rh / 2, 0], r: [0, 0.785, 0], c: roofC });
}
d.parts = parts.slice(0, 40);
return d;
},
function (label) {
var w = String(label || "").toLowerCase().replace(/[^a-z ]/g, " ").split(/\s+/).filter(Boolean), c = [];
for (var i = w.length - 1; i >= 0; i--) {
c.push(w[i]);
if (i > 0)
c.push(w[i - 1] + w[i]);
}
for (var j = 0; j < c.length; j++) {
var k = c[j];
if (k.length < 4)
continue;
var d = KIT[k];
if (d && !d.grown && d.cat === "structure")
return k;
}
return null;
},
function (g, list, x, y, zFar) {
var p = g.position.clone(), r = g.rotation.clone(), s = g.scale.clone();
g.position.set(0, 0, 0);
g.rotation.set(0, 0, 0);
g.scale.set(1, 1, 1);
g.updateMatrixWorld(true);
var M = g.matrixWorld.clone(), inv = M.clone().invert();
var o = new THREE.Vector3(x, y, zFar).applyMatrix4(M), d = new THREE.Vector3(0, 0, -1).transformDirection(M);
var rc = new THREE.Raycaster(o, d, 0, zFar * 3 + 40), meshes = [];
list.forEach(function (c) { c.traverse(function (m) { if (m.isMesh && !m.userData.contact && m.visible !== false)
meshes.push(m); }); });
var hit = null;
try {
hit = rc.intersectObjects(meshes, false).filter(function (h) { var mt = h.object.material; return !(mt && mt.opacity !== undefined && mt.transparent && mt.opacity < 0.3); })[0];
}
catch (e) { }
var z = hit ? hit.point.clone().applyMatrix4(inv).z : null;
g.position.copy(p);
g.rotation.copy(r);
g.scale.copy(s);
g.updateMatrixWorld(true);
return z;
},
function (spec, gs, k, size) {
var a = spec.attrs || {}, col = a.dc !== undefined ? a.dc : DOOR_DEFAULT, st = a.ds || "plain";
k = k || 1;
var w = (st === "double" ? 2.1 : st === "barn" ? 2.8 : 1.3) * k, h = (st === "barn" ? 3 : 2.35) * k;
if (size) {
w = Math.max(w, size[0]);
h = Math.max(h, size[1]);
}
var dg = new THREE.Group();
dg.userData.dbDoor = 1;
dg.name = "front door";
var inner = new THREE.Group();
dg.add(inner);
inner.scale.set(1 / gs.x, 1 / gs.y, 1 / gs.z);
var M = function (c) { return new THREE.MeshLambertMaterial({ color: c }); };
var frame = M(shade(col, -0.35)), wood = M(st === "iron" && a.dc === undefined ? 0x2E3036 : col), brass = M(GOLD);
var add = function (geo, m, x, y, z) { var me = new THREE.Mesh(geo, m); me.position.set(x, y, z); me.castShadow = true; me.receiveShadow = true; inner.add(me); return me; };
add(new THREE.BoxGeometry(w + 0.36, 0.22, 0.26), frame, 0, h + 0.11, 0.1);
add(new THREE.BoxGeometry(0.18, h, 0.24), frame, -(w / 2 + 0.09), h / 2, 0.1);
add(new THREE.BoxGeometry(0.18, h, 0.24), frame, (w / 2 + 0.09), h / 2, 0.1);
add(new THREE.BoxGeometry(w, h, 0.1), wood, 0, h / 2, 0.06);
if (st === "arched" || st === "round")
add(new THREE.CylinderGeometry(w / 2, w / 2, 0.1, 18, 1, false, Math.PI / 2, Math.PI), wood, 0, h, 0.06).rotation.x = Math.PI / 2;
if (st === "double")
add(new THREE.BoxGeometry(0.04, h, 0.02), M(0x1A1A1E), 0, h / 2, 0.12);
[[-1, 0.72], [1, 0.72], [-1, 0.28], [1, 0.28]].forEach(function (q) { if (st === "double" || st === "plain" || st === "arched")
add(new THREE.BoxGeometry(w * 0.34, h * 0.3, 0.03), M(shade(col, 0.12)), q[0] * w * 0.22, h * q[1], 0.125); });
add(new THREE.SphereGeometry(0.07, 10, 8), brass, w * 0.36, h * 0.47, 0.16);
add(new THREE.BoxGeometry(w + 0.8, 0.16, 0.9), M(0x8A8478), 0, 0.08, 0.5);
var lamp = add(new THREE.SphereGeometry(0.13, 10, 8), new THREE.MeshBasicMaterial({ color: 0xFFE2A0 }), 0, h + 0.42, 0.22);
lamp.castShadow = false;
return dg;
}
];
});
