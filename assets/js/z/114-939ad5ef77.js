/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(114, function () {
"use strict";
return [
function (spec) {
var F = spec.field, g = new THREE.Group();
g.userData.id = spec.id;
g.userData.field = 1;
var rnd = fieldRnd(fieldHash(spec.id + ":" + (F.seed || 0)));
var of = (F.of || []).filter(function (k) { return KIT[k[0]] && KIT[k[0]].cat !== "being"; });
if (!of.length)
return g;
var tot = of.reduce(function (a, k) { return a + (k[1] || 1); }, 0);
var n = Math.max(1, Math.min(FIELD_MAX, F.n | 0)), R = Math.max(5, Math.min(450, +F.r || 60));
var spots = {};
of.forEach(function (k) { spots[k[0]] = []; });
var big = of.length === 1 && /^(mountain|dune|hill)$/.test(of[0][0]);
var hole = (!F.grid && +F.hole > 0 && +F.hole < R - 4) ? +F.hole : 0;
var blk = (typeof fieldBlockers === "function") ? fieldBlockers(spec) : null;
for (var i = 0; i < n; i++) {
var pick = rnd() * tot, kind = of[0][0];
for (var j = 0; j < of.length; j++) {
pick -= (of[j][1] || 1);
if (pick <= 0) {
kind = of[j][0];
break;
}
}
var a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * R, x, z;
if (big) {
d = R * (0.35 + 0.65 * rnd());
}
if (F.grid) {
var gs = Math.max(F.grid, 2 * R / Math.sqrt(n)), per = Math.max(1, Math.floor(2 * R / gs)), row = Math.floor(i / per), col = i % per;
x = -R + col * gs + (rnd() - 0.5) * gs * 0.25;
z = -R + row * gs + (rnd() - 0.5) * gs * 0.25;
if (z > R)
continue;
}
else {
if (hole)
d = Math.sqrt(hole * hole + rnd() * (R * R - hole * hole));
x = Math.cos(a) * d;
z = Math.sin(a) * d;
}
if (blk && blk(x, z))
continue;
var sc = (big ? 0.6 + rnd() * 1.2 : 0.75 + rnd() * 0.55) * (F.s || 1);
var y = F.lift ? F.lift[0] + rnd() * (F.lift[1] - F.lift[0]) : 0;
spots[kind].push({ i: i, x: x, y: y, z: z, yaw: F.grid ? 0 : rnd() * Math.PI * 2, s: sc, tint: 0.86 + rnd() * 0.28 });
}
var M = new THREE.Matrix4(), L = new THREE.Matrix4(), P = new THREE.Vector3(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), E = new THREE.Euler(), C = new THREE.Color();
Object.keys(spots).forEach(function (kind) {
var list = spots[kind];
if (!list.length)
return;
var def = KIT[kind];
(def.parts || []).forEach(function (pt) {
if (!pt || !pt.s || pt.g === "pln" && def.cat !== "nature")
return;
var reps = [];
var n1 = pt.rep ? pt.rep[0] : 1, n2 = pt.rep2 ? pt.rep2[0] : 1;
for (var r1 = 0; r1 < n1; r1++)
for (var r2 = 0; r2 < n2; r2++)
reps.push([pt.p[0] + (pt.rep ? pt.rep[1] * r1 : 0) + (pt.rep2 ? pt.rep2[1] * r2 : 0), pt.p[1] + (pt.rep ? pt.rep[2] * r1 : 0) + (pt.rep2 ? pt.rep2[2] * r2 : 0), pt.p[2] + (pt.rep ? pt.rep[3] * r1 : 0) + (pt.rep2 ? pt.rep2[3] * r2 : 0)]);
var count = list.length * reps.length;
if (count > 12000)
return;
var col = resolveColor(pt.c, spec);
var mat = pt.glow ? new THREE.MeshBasicMaterial({ color: 0xFFFFFF }) : new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
if (def.cat === "nature" && !pt.glow && typeof windify === "function") {
var wh = Math.max(1.2, def.size[1] || 2);
windify(mat, pt.p[1], Math.min(0.3, wh * 0.03), wh);
}
var mesh = new THREE.InstancedMesh(geo(pt.g, pt.s), mat, count);
var k = 0;
list.forEach(function (sp) {
reps.forEach(function (rp) {
E.set((pt.r && pt.r[0]) || 0, (pt.r && pt.r[1]) || 0, (pt.r && pt.r[2]) || 0);
Q.setFromEuler(E);
L.compose(P.set(rp[0], rp[1], rp[2]), Q, S.set(1, 1, 1));
E.set(0, sp.yaw, 0);
Q.setFromEuler(E);
M.compose(P.set(sp.x, sp.y || 0, sp.z), Q, S.set(sp.s, sp.s, sp.s));
M.multiply(L);
mesh.setMatrixAt(k, M);
C.setHex(pt.c === "nature" && typeof natureColor === "function" ? natureColor({ archetype: kind, id: spec.id + ":" + sp.i, attrs: spec.attrs }) : col);
C.multiplyScalar(sp.tint);
mesh.setColorAt(k, C);
k++;
});
});
mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor)
mesh.instanceColor.needsUpdate = true;
mesh.receiveShadow = false;
mesh.castShadow = false;
fieldBound(mesh, k);
g.add(mesh);
});
});
if (F.base !== undefined && F.base !== null && !hole) {
var disc = new THREE.Mesh(F.grid ? new THREE.PlaneGeometry(2 * R + 2, 2 * R + 2) : new THREE.CircleGeometry(R * 1.05, 40), new THREE.MeshLambertMaterial({ color: F.base, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }));
disc.rotation.x = -Math.PI / 2;
disc.position.y = 0.06;
g.add(disc);
}
return g;
},
function (mesh, n) {
try {
var sg = mesh.geometry;
if (!sg || !sg.attributes || !sg.attributes.position || !n) {
mesh.frustumCulled = false;
return;
}
if (!sg.boundingSphere)
sg.computeBoundingSphere();
var own = sg.boundingSphere, M = new THREE.Matrix4(), c = new THREE.Vector3(), lo = new THREE.Vector3(Infinity, Infinity, Infinity), hi = new THREE.Vector3(-Infinity, -Infinity, -Infinity), pts = [];
for (var i = 0; i < n; i++) {
mesh.getMatrixAt(i, M);
var p = own.center.clone().applyMatrix4(M), r = own.radius * M.getMaxScaleOnAxis();
pts.push(p, r);
lo.min(p);
hi.max(p);
}
c.addVectors(lo, hi).multiplyScalar(0.5);
var rad = 0;
for (var j = 0; j < pts.length; j += 2)
rad = Math.max(rad, c.distanceTo(pts[j]) + pts[j + 1]);
if (!isFinite(rad)) {
mesh.frustumCulled = false;
return;
}
var px = new THREE.BufferGeometry();
Object.keys(sg.attributes).forEach(function (k) { px.setAttribute(k, sg.attributes[k]); });
if (sg.index)
px.setIndex(sg.index);
px.userData.ownSphere = own;
px.type = sg.type;
if (sg.parameters)
px.parameters = sg.parameters;
px.boundingSphere = new THREE.Sphere(c, rad + 2.5);
mesh.geometry = px;
mesh.frustumCulled = true;
}
catch (e) {
mesh.frustumCulled = false;
}
},
function (label, of, n, r, opts) {
opts = opts || {};
of = (of || []).filter(function (k) { return KIT[k[0]] && KIT[k[0]].cat !== "being"; });
if (!of.length)
return null;
n = Math.max(2, Math.min(FIELD_MAX, n | 0));
r = Math.max(8, Math.min(450, +r || Math.sqrt(n) * 7));
var here = store.here || 0, have = store.objects.filter(function (o) { return o.archetype === "field" && (o.realm || 0) === here && String(o.label).toLowerCase() === String(label).toLowerCase(); })[0];
var extra = { grid: opts.grid, base: opts.base, lift: opts.lift };
if (have) {
have.field = Object.assign({ of: of, n: n, r: r, seed: have.field.seed || 1, s: opts.s || 1 }, extra);
if (typeof refresh === "function")
refresh(have);
return have;
}
var spec = place("field", label, {}, {});
if (!spec)
return null;
spec.field = Object.assign({ of: of, n: n, r: r, seed: fieldHash(label) % 997 + 1, s: opts.s || 1 }, extra);
spec.solid = false;
spec.instant = !!opts.instant;
var C = (typeof dreamCluster === "function") ? dreamCluster() : null;
var mountains = /^(mountain|dune|hill)$/.test(of[0][0]);
if (opts.at) {
spec.x = opts.at.x;
spec.z = opts.at.z;
C = null;
var k = KIT[opts.at.archetype], rr = k ? Math.max(k.size[0], k.size[2]) * 0.5 * ((opts.at.attrs && opts.at.attrs.s) || 1) : r;
spec.field.r = Math.max(10, Math.min(r, rr));
}
if (C) {
var a = (fieldHash(label + ":" + here) % 628) / 100, dx = Math.cos(a), dz = Math.sin(a);
var reach = Math.max(30, C.spread * 1.2);
var gap = mountains ? r * 0.6 : (opts.around ? -reach : 12);
var d = reach + gap + (opts.around ? 0 : r);
spec.x = C.x + dx * d;
spec.z = C.z + dz * d;
if (opts.around) {
spec.x = C.x;
spec.z = C.z;
spec.field.hole = reach;
}
}
if (typeof refresh === "function")
refresh(spec);
if (typeof save === "function")
save();
return spec;
}
];
});
