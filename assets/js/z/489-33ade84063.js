/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(489, function () {
return [
function (P, rad) {
var list = [], bb = new THREE.Box3(), sph = new THREE.Sphere(), skip = new Set(), st = null, w = WLD.w;
try {
Object.keys(window).forEach(function (k) { if (st || !/^[A-Z][A-Z0-9_]{1,6}$/.test(k))
return; var o = window[k]; if (o && typeof o === "object" && o.base === w.base && Array.isArray(o.spots))
st = o; });
}
catch (e) { }
if (st)
["people", "talk", "talkers", "movers"].forEach(function (k) { (st[k] || []).forEach(function (p) { var g = p && (p.g || (p.p && p.p.g)); if (g)
skip.add(g); }); });
scene.traverseVisible(function (o) {
if (!o.isMesh || o.isSkinnedMesh)
return;
for (var p = o; p; p = p.parent)
if (skip.has(p))
return;
var m = Array.isArray(o.material) ? o.material[0] : o.material;
if (!m || m.colorWrite === false)
return;
if (m.transparent && (m.opacity < 0.6 || m.blending === THREE.AdditiveBlending || m.depthWrite === false))
return;
var g = o.geometry;
if (!g)
return;
if (o.isInstancedMesh) {
list.push(o);
return;
}
if (!g.boundingBox)
try {
g.computeBoundingBox();
}
catch (e) {
return;
}
bb.copy(g.boundingBox).applyMatrix4(o.matrixWorld);
bb.getBoundingSphere(sph);
if (sph.center.distanceTo(P) - sph.radius < rad)
list.push(o);
});
return list;
},
function (list, x, z, from) {
if (!QPL.rc) {
QPL.rc = new THREE.Raycaster();
QPL.rc.camera = camera;
}
var sides = [];
list.forEach(function (o) { var m = o.material; (Array.isArray(m) ? m : [m]).forEach(function (q) { if (q && q.side !== THREE.DoubleSide) {
sides.push([q, q.side]);
q.side = THREE.DoubleSide;
} }); });
try {
QPL.rc.set(new THREE.Vector3(WLD.w.base + x, from, z), new THREE.Vector3(0, -1, 0));
QPL.rc.near = 0;
QPL.rc.far = 6;
var h = QPL.rc.intersectObjects(list, false);
return h.length ? h[0].point.y : null;
}
finally {
sides.forEach(function (s) { s[0].side = s[1]; });
}
},
function (P, kind) {
if (!QPL.on || !P || P.x == null || !WLD.w || typeof scene === "undefined" || !isFinite(P.y))
return P;
try {
var y0 = P.y, list = qplMeshes(new THREE.Vector3(WLD.w.base + P.x, y0, P.z), 4);
if (!list.length)
return P;
var open = 0;
for (var a = 0; a < 16 && !open; a++)
for (var r = 0.75; r <= 3; r += 0.75) {
var x = P.x + Math.cos(a / 16 * Math.PI * 2) * r, z = P.z + Math.sin(a / 16 * Math.PI * 2) * r;
if (!qplBlocked(x, z, qplGround(x, z, y0 + 0.4))) {
open = 1;
break;
}
}
if (!open) {
P._qplLater = 1;
return P;
}
var inside = qplBlocked(P.x, P.z, y0), top = qplTop(list, P.x, P.z, y0 + 1.45), why = "";
if (!inside) {
if (top != null && top > y0 - 0.05 && top <= y0 + 0.35) {
if (top > y0 + 0.01) {
P.y = top;
why = "lifted onto the drawn ground";
}
}
else if (top != null && top > y0 + 0.35 && top <= y0 + 1.3) {
P.y = top;
why = "on top of what stands over it";
}
else if (top != null && top > y0 + 1.3) {
inside = true;
}
}
else if (top != null && top > y0 + 0.3 && top <= y0 + 1.3) {
var near = 0;
for (var b = 0; b < 16 && !near; b++)
for (var r2 = 0.5; r2 <= 1.4; r2 += 0.3) {
var x2 = P.x + Math.cos(b / 16 * Math.PI * 2) * r2, z2 = P.z + Math.sin(b / 16 * Math.PI * 2) * r2, f2 = qplGround(x2, z2, y0 + 0.4);
if (Math.abs(f2 - y0) < 0.5 && !qplBlocked(x2, z2, f2)) {
near = 1;
break;
}
}
if (near) {
P.y = top;
inside = false;
why = "on top of the table, bench or press it was inside";
}
}
if (inside) {
var best = null;
for (var rr = 0.4; rr <= 3.01 && !best; rr += 0.2)
for (var c = 0; c < 24; c++) {
var aa = c / 24 * Math.PI * 2, x3 = P.x + Math.cos(aa) * rr, z3 = P.z + Math.sin(aa) * rr, f3 = qplGround(x3, z3, y0 + 0.4);
if (Math.abs(f3 - y0) > 0.5 || qplBlocked(x3, z3, f3))
continue;
var t3 = qplTop(list, x3, z3, f3 + 1.45);
if (t3 != null && (t3 > f3 + 0.35))
continue;
best = { x: x3, z: z3, y: (t3 != null && t3 > f3) ? t3 : f3 };
break;
}
if (best) {
P.x = best.x;
P.z = best.z;
P.y = best.y;
why = "on clear floor beside what it was inside";
}
}
if (why)
QPL.moved.push({ kind: kind, why: why, x: Math.round(P.x * 10) / 10, z: Math.round(P.z * 10) / 10, dy: Math.round((P.y - y0) * 100) / 100 });
}
catch (e) {
if (window.console)
console.warn("[qpl]", e);
}
return P;
},
function (I, kind) {
var n = 0, iv = setInterval(function () {
if (++n > 240 || !I.g || !I.g.parent) {
clearInterval(iv);
return;
}
var Q = { x: I.P.x, z: I.P.z, y: I.P.y, area: I.P.area };
qplSettle(Q, kind);
if (Q._qplLater)
return;
clearInterval(iv);
if (Q.x === I.P.x && Q.z === I.P.z && Q.y === I.P.y)
return;
I.g.position.x += Q.x - I.P.x;
I.g.position.z += Q.z - I.P.z;
I.g.position.y += Q.y - I.P.y;
if (I.S) {
I.S.x = Q.x;
I.S.z = Q.z;
if (I.S.y != null)
I.S.y = Q.y;
}
I.P.x = Q.x;
I.P.z = Q.z;
I.P.y = Q.y;
}, 500);
}
];
});
