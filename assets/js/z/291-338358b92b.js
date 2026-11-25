/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(291, function () {
"use strict";
return [
function (col, o) {
o = o || {};
var k = col + "|" + (o.e || 0) + "|" + (o.op || 1) + "|" + (o.ds ? 1 : 0) + "|" + (o.b ? 1 : 0);
if (PP_MATS[k])
return PP_MATS[k];
var m = o.b ? new THREE.MeshBasicMaterial({ color: col }) : new THREE.MeshLambertMaterial({ color: col });
if (o.e !== undefined && !o.b) {
m.emissive = new THREE.Color(o.e);
}
if (o.op !== undefined && o.op < 1) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
PP_MATS[k] = m;
return m;
},
function (G, cell) {
if (!G)
return;
G.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(G.matrixWorld).invert(), by = {}, drop = [], wp = new THREE.Vector3();
G.traverse(function (o) {
if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh || !o.geometry || Array.isArray(o.material))
return;
for (var p = o; p && p !== G; p = p.parent)
if (p.userData.keep || p.userData.figure)
return;
var m = o.material;
if (m.map && !o.geometry.attributes.uv)
return;
var k = m.uuid;
if (cell) {
o.getWorldPosition(wp);
wp.applyMatrix4(inv);
k += "|" + Math.floor(wp.x / cell) + "," + Math.floor(wp.z / cell);
}
(by[k] || (by[k] = { m: m, list: [] })).list.push(o);
});
var mt = new THREE.Matrix4();
Object.keys(by).forEach(function (k) {
var B = by[k];
if (B.list.length < 2)
return;
var parts = [], n = 0, uv = !!B.m.map;
B.list.forEach(function (o) {
var g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
if (!g.attributes.normal)
g.computeVertexNormals();
mt.multiplyMatrices(inv, o.matrixWorld);
g.applyMatrix4(mt);
parts.push(g);
n += g.attributes.position.count;
drop.push(o);
});
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uvs = uv ? new Float32Array(n * 2) : null, at = 0;
parts.forEach(function (g) {
var c = g.attributes.position.count;
pos.set(g.attributes.position.array.subarray(0, c * 3), at * 3);
nor.set(g.attributes.normal.array.subarray(0, c * 3), at * 3);
if (uvs && g.attributes.uv)
uvs.set(g.attributes.uv.array.subarray(0, c * 2), at * 2);
at += c;
g.dispose();
});
var ng = new THREE.BufferGeometry();
ng.setAttribute("position", new THREE.BufferAttribute(pos, 3));
ng.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
if (uvs)
ng.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
ng.computeBoundingSphere();
var mesh = new THREE.Mesh(ng, B.m);
mesh.matrixAutoUpdate = false;
G.add(mesh);
});
drop.forEach(function (o) { if (o.parent)
o.parent.remove(o); });
},
function (G, x0, x1, z0, z1, h, mat, gaps, noSolid) {
gaps = gaps || [];
var t = 0.3;
function side(s, a0, a1, fixed, alongX) {
var cuts = gaps.filter(function (g) { return g.s === s; }).map(function (g) { return [g.c - g.w / 2, g.c + g.w / 2]; }).sort(function (a, b) { return a[0] - b[0]; });
var segs = [], at = a0;
cuts.forEach(function (c) { if (c[0] > at)
segs.push([at, c[0]]); at = Math.max(at, c[1]); });
if (at < a1)
segs.push([at, a1]);
segs.forEach(function (sg) {
var L = sg[1] - sg[0], mid = (sg[0] + sg[1]) / 2;
if (L < 0.05)
return;
if (alongX) {
ppBox(L, h, t, mat, mid, h / 2, fixed, G);
if (!noSolid)
ppSolid(mid, fixed, L / 2, t / 2);
}
else {
ppBox(t, h, L, mat, fixed, h / 2, mid, G);
if (!noSolid)
ppSolid(fixed, mid, t / 2, L / 2);
}
});
cuts.forEach(function (c) {
var L = c[1] - c[0], mid = (c[0] + c[1]) / 2;
if (h < 3.2)
return;
if (alongX)
ppBox(L, h - 2.9, t, mat, mid, 2.9 + (h - 2.9) / 2, fixed, G);
else
ppBox(t, h - 2.9, L, mat, fixed, 2.9 + (h - 2.9) / 2, mid, G);
});
}
side("n", x0, x1, z0, true);
side("s", x0, x1, z1, true);
side("w", z0, z1, x0, false);
side("e", z0, z1, x1, false);
},
function () {
var Z = PP.zoneDef || {};
if (Z.indoor)
return { top: 0x0A0614, low: 0x120A20, fog: Z.fog || 0x140A22, fogD: 0.004, sun: 0.25, sunCol: 0xE8D8FF, sunDir: [0.2, 0.9, 0.3], hemi: Z.hemi || 0.95, hemiCol: Z.hemiCol || 0xF0E0FF, hemiGround: 0x3A2440, stars: 0 };
return { top: 0x120838, low: 0x46205E, fog: 0x2C1446, fogD: 0.0012, sun: 0.5, sunCol: 0xD8C8FF, sunDir: [-0.4, 0.7, -0.5], hemi: 0.78, hemiCol: 0xE0D0FF, hemiGround: 0x4A2A3A, stars: 1 };
},
function (x, z, feet) {
var y = null;
for (var i = 0; i < PP.walk.length; i++) {
var w = PP.walk[i];
if (ppIn(w, x, z)) {
y = w.y;
break;
}
}
if (y === null)
y = Math.hypot(x, z) < 460 ? ppOutH(x, z) : 0;
for (var j = 0; j < PP.pads.length; j++) {
var p = PP.pads[j];
if (ppIn(p, x, z) && (feet === undefined || feet > p.h - 0.75))
y = Math.max(y, p.h);
}
for (var k = 0; k < PP.ramps.length; k++) {
var q = PP.ramps[k];
if (!ppIn(q, x, z))
continue;
var f = q.axis === "x" ? (x - q.x0) / (q.x1 - q.x0) : (z - q.z0) / (q.z1 - q.z0);
y = Math.max(y, q.h0 + (q.h1 - q.h0) * f);
}
return y;
},
function (x, z, feet) {
var inside = null;
for (var i = 0; i < PP.walk.length; i++) {
if (ppIn(PP.walk[i], x, z)) {
inside = PP.walk[i];
break;
}
}
if (!inside && Math.hypot(x, z) > 440)
return true;
if (!inside && Math.abs(x) > 1200)
return true;
if (!inside && feet > 8)
return true;
if (worldSolidAt(PP.solids, x, z, feet))
return true;
if (ppWater(x, z))
return true;
for (var g = 0; g < PP.gates.length; g++) {
var G = PP.gates[g];
if (ppIn(G, x, z) && !ppAllowed(G.need)) {
if (Date.now() - PP.gateSaid > 4000) {
PP.gateSaid = Date.now();
setStatus("<b>" + esc(G.name) + ".</b> " + PP_NEED_SAY[G.need]);
}
return true;
}
}
return false;
}
];
});
