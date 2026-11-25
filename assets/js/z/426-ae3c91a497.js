/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(426, function () {
"use strict";
return [
function (g) {
g.traverse(function (o) {
var m = o.material;
if (!m)
return;
(Array.isArray(m) ? m : [m]).forEach(function (x) {
if (!x || x.map || x.isMeshBasicMaterial || x.isShaderMaterial || !x.color || (x.userData && x.userData.realKind))
return;
if (!(x.isMeshLambertMaterial || x.isMeshPhongMaterial))
return;
x.userData.realKind = realKindOfColour(x.color);
x.needsUpdate = true;
});
});
},
function (G) {
var P = G.attributes.position, N = G.attributes.normal;
if (!P || !N)
return null;
var ix = G.index, tc = ix ? ix.count : P.count, i, k, nm;
var used = {}, vmap = [], nv = 0;
for (i = 0; i < tc; i++) {
var v = ix ? ix.getX(i) : i;
if (used[v] === undefined) {
used[v] = nv++;
vmap.push(v);
}
}
var groups = {}, pos = [], wN = new Float32Array(nv * 3), wid = new Int32Array(nv);
for (i = 0; i < nv; i++) {
var o = vmap[i], key = Math.round(P.getX(o) * 1e4) + "," + Math.round(P.getY(o) * 1e4) + "," + Math.round(P.getZ(o) * 1e4);
(groups[key] || (groups[key] = [])).push(i);
wid[i] = 0;
}
var nn = function (v) { var o = vmap[v], x = N.getX(o), y = N.getY(o), z = N.getZ(o), l = Math.hypot(x, y, z) || 1; return [x / l, y / l, z / l]; };
Object.keys(groups).forEach(function (key, gi) {
var g = groups[key], ns = g.map(nn);
g.forEach(function (v, a) {
var sx = 0, sy = 0, sz = 0;
for (var b = 0; b < g.length; b++) {
var d = ns[a][0] * ns[b][0] + ns[a][1] * ns[b][1] + ns[a][2] * ns[b][2];
if (d > 0.5) {
sx += ns[b][0];
sy += ns[b][1];
sz += ns[b][2];
}
}
var l = Math.hypot(sx, sy, sz) || 1;
wN[v * 3] = sx / l;
wN[v * 3 + 1] = sy / l;
wN[v * 3 + 2] = sz / l;
wid[v] = gi;
});
});
var edges = {}, mids = [], tris = [];
function mid(a, b) { var x = a < b ? a + "_" + b : b + "_" + a, m = edges[x]; if (m !== undefined)
return m; m = edges[x] = nv + mids.length / 2; mids.push(a, b); return m; }
for (i = 0; i < tc; i += 3) {
var a = used[ix ? ix.getX(i) : i], b = used[ix ? ix.getX(i + 1) : i + 1], c = used[ix ? ix.getX(i + 2) : i + 2];
var ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
tris.push(a, ab, ca, ab, b, bc, ca, bc, c, ab, bc, ca);
}
var total = nv + mids.length / 2, H = new THREE.BufferGeometry();
Object.keys(G.attributes).forEach(function (name) {
var A = G.attributes[name], s = A.itemSize, src = fineFlat(A), Arr = src.constructor, nrm = A.normalized;
if (name === "normal" && !(src instanceof Float32Array)) {
var sc0 = src instanceof Int8Array ? 127 : src instanceof Int16Array ? 32767 : 1, fl = new Float32Array(src.length);
for (i = 0; i < src.length; i++)
fl[i] = Math.max(-1, src[i] / sc0);
src = fl;
Arr = Float32Array;
nrm = false;
}
var out = new Arr(total * s);
for (i = 0; i < nv; i++)
for (k = 0; k < s; k++)
out[i * s + k] = src[vmap[i] * s + k];
var isIdx = name === "skinIndex", isW = name === "skinWeight";
for (var m = 0; m < mids.length; m += 2) {
var p = vmap[mids[m]], q = vmap[mids[m + 1]], at = (nv + m / 2) * s;
if (isIdx || isW) {
if (!isIdx)
continue;
var SW = G.attributes.skinWeight, inf = {}, SIa = src, SWa0 = fineFlat(SW);
[p, q].forEach(function (v) { for (var j = 0; j < 4; j++) {
var bi = SIa[v * 4 + j], bw = SWa0[v * 4 + j] * (SW.normalized ? (SWa0 instanceof Uint8Array ? 1 / 255 : SWa0 instanceof Uint16Array ? 1 / 65535 : 1) : 1);
if (bw > 0)
inf[bi] = (inf[bi] || 0) + bw * 0.5;
} });
var top = Object.keys(inf).map(function (b) { return [+b, inf[b]]; }).sort(function (x, y) { return y[1] - x[1]; }).slice(0, 4), sum = 0;
top.forEach(function (t) { sum += t[1]; });
for (var j2 = 0; j2 < 4; j2++) {
out[at + j2] = top[j2] ? top[j2][0] : 0;
}
H.__fineW = H.__fineW || [];
H.__fineW.push(at, top.map(function (t) { return t[1] / (sum || 1); }));
continue;
}
if (name === "position") {
var wa = mids[m], wb = mids[m + 1];
if (wid[wa] > wid[wb]) {
var t = p;
p = q;
q = t;
t = wa;
wa = wb;
wb = t;
}
var px = src[p * 3], py = src[p * 3 + 1], pz = src[p * 3 + 2], qx = src[q * 3], qy = src[q * 3 + 1], qz = src[q * 3 + 2];
var n1x = wN[wa * 3], n1y = wN[wa * 3 + 1], n1z = wN[wa * 3 + 2], n2x = wN[wb * 3], n2y = wN[wb * 3 + 1], n2z = wN[wb * 3 + 2];
var dx = qx - px, dy = qy - py, dz = qz - pz, w12 = dx * n1x + dy * n1y + dz * n1z, w21 = -(dx * n2x + dy * n2y + dz * n2z);
var ox = -(w12 * n1x + w21 * n2x) / 8, oy = -(w12 * n1y + w21 * n2y) / 8, oz = -(w12 * n1z + w21 * n2z) / 8, ol = Math.hypot(ox, oy, oz), el = Math.hypot(dx, dy, dz) * 0.2;
if (ol > el) {
ox *= el / ol;
oy *= el / ol;
oz *= el / ol;
}
out[at] = (px + qx) / 2 + ox;
out[at + 1] = (py + qy) / 2 + oy;
out[at + 2] = (pz + qz) / 2 + oz;
continue;
}
for (k = 0; k < s; k++)
out[at + k] = (src[p * s + k] + src[q * s + k]) / 2;
}
var NA = new THREE.BufferAttribute(out, s, nrm);
H.setAttribute(name, NA);
});
if (H.__fineW) {
var SWa = H.attributes.skinWeight, SWo = SWa.array, sc = !SWa.normalized ? 1 : SWo instanceof Uint8Array ? 255 : SWo instanceof Uint16Array ? 65535 : 1;
for (i = 0; i < H.__fineW.length; i += 2) {
var o2 = H.__fineW[i], ws = H.__fineW[i + 1];
for (k = 0; k < 4; k++)
SWo[o2 + k] = sc === 1 ? (ws[k] || 0) : Math.round((ws[k] || 0) * sc);
}
delete H.__fineW;
}
H.setIndex(total > 65535 ? new THREE.Uint32BufferAttribute(tris, 1) : new THREE.Uint16BufferAttribute(tris, 1));
fineNormals(H);
if (G.groups && G.groups.length)
G.groups.forEach(function (g) { H.addGroup(g.start * 4, g.count * 4, g.materialIndex); });
H.boundingSphere = G.boundingSphere ? G.boundingSphere.clone() : null;
H.boundingBox = G.boundingBox ? G.boundingBox.clone() : null;
H.userData.fineOf = G;
return H;
},
function (H) {
var P = H.attributes.position.array, N = H.attributes.normal.array, I = H.index.array, n = P.length / 3, i;
var ref = new Float32Array(N), acc = new Float32Array(n * 3), weld = {}, grp = new Int32Array(n), fn = new Float32Array(I.length);
for (i = 0; i < n; i++) {
var key = Math.round(P[i * 3] * 1e4) + "," + Math.round(P[i * 3 + 1] * 1e4) + "," + Math.round(P[i * 3 + 2] * 1e4);
var w = weld[key];
if (w === undefined)
w = weld[key] = i;
grp[i] = w;
}
var faces = {};
for (var t = 0; t < I.length; t += 3) {
var a = I[t], b = I[t + 1], c = I[t + 2];
var ux = P[b * 3] - P[a * 3], uy = P[b * 3 + 1] - P[a * 3 + 1], uz = P[b * 3 + 2] - P[a * 3 + 2], vx = P[c * 3] - P[a * 3], vy = P[c * 3 + 1] - P[a * 3 + 1], vz = P[c * 3 + 2] - P[a * 3 + 2];
var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
[a, b, c].forEach(function (v) { var g = grp[v]; (faces[g] || (faces[g] = [])).push(nx, ny, nz); });
}
for (i = 0; i < n; i++) {
var F = faces[grp[i]];
if (!F)
continue;
var rx = ref[i * 3], ry = ref[i * 3 + 1], rz = ref[i * 3 + 2], sx = 0, sy = 0, sz = 0;
for (var f = 0; f < F.length; f += 3) {
var l = Math.hypot(F[f], F[f + 1], F[f + 2]) || 1;
if ((F[f] * rx + F[f + 1] * ry + F[f + 2] * rz) / l > 0.45) {
sx += F[f];
sy += F[f + 1];
sz += F[f + 2];
}
}
var L = Math.hypot(sx, sy, sz);
if (L > 0) {
N[i * 3] = sx / L;
N[i * 3 + 1] = sy / L;
N[i * 3 + 2] = sz / L;
}
else {
L = Math.hypot(rx, ry, rz) || 1;
N[i * 3] = rx / L;
N[i * 3 + 1] = ry / L;
N[i * 3 + 2] = rz / L;
}
}
},
function (E, on) {
if (!E.model || E.fine === on)
return;
var waiting = false;
E.model.traverse(function (m) {
if (!m.isSkinnedMesh || !m.geometry)
return;
var G = m.userData.fineCoarse || m.geometry;
if (on) {
if (!G.index || !G.userData.fineOk)
return;
var F = fineGet(G);
if (!F) {
waiting = true;
return;
}
if (m.geometry !== F) {
m.userData.fineCoarse = G;
m.geometry = F;
}
}
else if (m.userData.fineCoarse) {
m.geometry = m.userData.fineCoarse;
m.userData.fineCoarse = null;
}
});
if (!waiting)
E.fine = on;
},
function (G) {
var P = G.attributes.position;
if (!P || !G.attributes.normal)
return null;
var H = new THREE.BufferGeometry();
Object.keys(G.attributes).forEach(function (n) {
var A = G.attributes[n], src = fineFlat(A), Arr = src.constructor;
if (n === "normal" && !(src instanceof Float32Array)) {
var sc = src instanceof Int8Array ? 127 : src instanceof Int16Array ? 32767 : 1, fl = new Float32Array(src.length);
for (var i = 0; i < src.length; i++)
fl[i] = Math.max(-1, src[i] / sc);
src = fl;
H.setAttribute(n, new THREE.BufferAttribute(src, A.itemSize, false));
return;
}
H.setAttribute(n, new THREE.BufferAttribute(Arr === src.constructor ? src.slice() : src, A.itemSize, A.normalized));
});
var idx = G.index ? Array.from(G.index.array) : null;
if (!idx) {
idx = [];
for (var v = 0; v < P.count; v++)
idx.push(v);
}
H.setIndex(idx);
G.groups.forEach(function (g) { H.addGroup(g.start, g.count, g.materialIndex); });
var p = H.attributes.position.array, N = H.attributes.normal.array, n = p.length / 3, weld = {}, grp = new Int32Array(n), faces = {}, i, t;
for (i = 0; i < n; i++) {
var key = Math.round(p[i * 3] * 1e4) + "," + Math.round(p[i * 3 + 1] * 1e4) + "," + Math.round(p[i * 3 + 2] * 1e4);
var w = weld[key];
if (w === undefined)
w = weld[key] = i;
grp[i] = w;
}
var own = new Float32Array(n * 3);
for (t = 0; t < idx.length; t += 3) {
var a = idx[t], b = idx[t + 1], c = idx[t + 2];
var ux = p[b * 3] - p[a * 3], uy = p[b * 3 + 1] - p[a * 3 + 1], uz = p[b * 3 + 2] - p[a * 3 + 2], vx = p[c * 3] - p[a * 3], vy = p[c * 3 + 1] - p[a * 3 + 1], vz = p[c * 3 + 2] - p[a * 3 + 2];
var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, l = Math.hypot(nx, ny, nz) || 1;
[a, b, c].forEach(function (q) { own[q * 3] += nx / l; own[q * 3 + 1] += ny / l; own[q * 3 + 2] += nz / l; (faces[grp[q]] || (faces[grp[q]] = [])).push(nx, ny, nz); });
}
for (i = 0; i < n; i++) {
var F = faces[grp[i]];
if (!F)
continue;
var rx = own[i * 3], ry = own[i * 3 + 1], rz = own[i * 3 + 2], rl = Math.hypot(rx, ry, rz) || 1;
rx /= rl;
ry /= rl;
rz /= rl;
var sx = 0, sy = 0, sz = 0;
for (var f = 0; f < F.length; f += 3) {
var L = Math.hypot(F[f], F[f + 1], F[f + 2]) || 1;
if ((F[f] * rx + F[f + 1] * ry + F[f + 2] * rz) / L > 0.15) {
sx += F[f];
sy += F[f + 1];
sz += F[f + 2];
}
}
var S = Math.hypot(sx, sy, sz);
if (S > 0) {
N[i * 3] = sx / S;
N[i * 3 + 1] = sy / S;
N[i * 3 + 2] = sz / S;
}
}
H.boundingSphere = G.boundingSphere ? G.boundingSphere.clone() : null;
H.boundingBox = G.boundingBox ? G.boundingBox.clone() : null;
return H;
},
function (G) {
if (CRS.geo.has(G))
return CRS.geo.get(G);
var R = null;
try {
var S = crsSmoothed(G);
if (S) {
R = fineSplit(S);
var tri = R && R.index ? R.index.count / 3 : 0;
if (R && tri < 12000) {
var R2 = fineSplit(R);
if (R2)
R = R2;
}
}
if (R) {
R.userData.keepOnChip = 1;
CRS.made++;
CRS.tri = (CRS.tri || 0) + (R.index ? R.index.count / 3 : 0);
Object.keys(R.attributes).forEach(function (n) { CRS.bytes = (CRS.bytes || 0) + R.attributes[n].array.byteLength; });
if (R.index)
CRS.bytes += R.index.array.byteLength;
}
}
catch (e) {
R = null;
if (window.console)
console.warn("[creatures]", e);
}
CRS.geo.set(G, R);
return R;
}
];
});
