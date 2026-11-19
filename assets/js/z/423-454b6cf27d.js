/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(423, function () {
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
function (seed) {
var w = (123456789 + seed) & 0xffffffff, z = (987654321 - seed) & 0xffffffff;
return function (max, min) {
if (max === undefined)
max = 1;
if (min === undefined)
min = 0;
z = (36969 * (z & 65535) + (z >> 16)) & 0xffffffff;
w = (18000 * (w & 65535) + (w >> 16)) & 0xffffffff;
var r = (((z << 16) + (w & 65535)) >>> 0) / 4294967296;
return (max - min) * r + min;
};
},
function (P) {
var rnd = rtRng(P.seed), B = P.branch, Lf = P.leaves, ever = P.type === "evergreen";
var bv = [], bn = [], bu = [], bi = [], lv = [], ln = [], lu = [], li = [], queue = [];
var V = THREE.Vector3, Q = THREE.Quaternion, E = THREE.Euler, up = new V(0, 1, 0), X = new V(1, 0, 0);
function leaf(o, orient) {
var size = Lf.size * (1 + rnd(Lf.vary, -Lf.vary)), W = size, L = size;
[0, Math.PI / 2].forEach(function (rot) {
var i = lv.length / 3, e0 = new E(0, rot, 0);
[[-W / 2, L], [-W / 2, 0], [W / 2, 0], [W / 2, L]].forEach(function (p) { var v = new V(p[0], p[1], 0).applyEuler(e0).applyEuler(orient).add(o); lv.push(v.x, v.y, v.z); });
var n = new V(0, 0, 1).applyEuler(e0).applyEuler(orient);
for (var k = 0; k < 4; k++)
ln.push(n.x, n.y, n.z);
lu.push(0, 1, 0, 0, 1, 0, 1, 1);
li.push(i, i + 1, i + 2, i, i + 2, i + 3);
});
}
function along(secs, t) {
var si = Math.floor(t * (secs.length - 1)), A = secs[si], Bq = si === secs.length - 1 ? A : secs[si + 1], al = (t - si / (secs.length - 1)) * (secs.length - 1);
var q = new Q().setFromEuler(Bq.orientation).slerp(new Q().setFromEuler(A.orientation), al);
return { o: new V().lerpVectors(A.origin, Bq.origin, al), q: q, r: (1 - al) * A.radius + al * Bq.radius };
}
queue.push({ origin: new V(), orientation: new E(), length: B.length[0], radius: B.radius[0], level: 0, sec: B.sections[0], seg: B.segments[0] });
while (queue.length) {
var br = queue.shift(), off = bv.length / 3, ori = br.orientation.clone(), org = br.origin.clone();
var secLen = br.length / br.sec / (ever ? 1 : B.levels - 1), secs = [];
for (var i = 0; i <= br.sec; i++) {
var r = br.radius;
if (i === br.sec && br.level === B.levels)
r = 0.001;
else if (!ever)
r *= 1 - B.taper[br.level] * (i / br.sec);
else
r *= 1 - i / br.sec;
var first = null;
for (var j = 0; j < br.seg; j++) {
var a = 2 * Math.PI * j / br.seg, n = new V(Math.cos(a), 0, Math.sin(a)).applyEuler(ori).normalize(), v = n.clone().multiplyScalar(r).add(org);
bv.push(v.x, v.y, v.z);
bn.push(n.x, n.y, n.z);
bu.push(j / br.seg, i % 2 ? 1 : 0);
if (!j)
first = [v, n];
}
bv.push(first[0].x, first[0].y, first[0].z);
bn.push(first[1].x, first[1].y, first[1].z);
bu.push(1, i % 2 ? 1 : 0);
secs.push({ origin: org.clone(), orientation: ori.clone(), radius: r });
org.add(new V(0, secLen, 0).applyEuler(ori));
var g = Math.max(1, 1 / Math.sqrt(Math.max(r, 0.0001))) * B.gnarl[br.level];
ori.x += rnd(g, -g);
ori.z += rnd(g, -g);
var qs = new Q().setFromEuler(ori);
qs.multiply(new Q().setFromAxisAngle(up, B.twist[br.level]));
qs.rotateTowards(new Q().setFromUnitVectors(up, up), B.force / Math.max(r, 0.0001));
ori.setFromQuaternion(qs);
}
var N = br.seg + 1;
for (var s2 = 0; s2 < br.sec; s2++)
for (var j2 = 0; j2 < br.seg; j2++) {
var v1 = off + s2 * N + j2, v2 = v1 + 1, v3 = v1 + N, v4 = v2 + N;
bi.push(v1, v3, v2, v2, v3, v4);
}
var last = secs[secs.length - 1];
if (!ever) {
if (br.level < B.levels)
queue.push({ origin: last.origin, orientation: last.orientation, length: B.length[br.level + 1], radius: last.radius, level: br.level + 1, sec: br.sec, seg: br.seg });
else
leaf(last.origin, last.orientation);
}
if (br.level === B.levels) {
var ro = rnd();
for (var k = 0; k < Lf.count; k++) {
var at = along(secs, rnd(1, Lf.start));
var q1 = new Q().setFromAxisAngle(X, Lf.angle * Math.PI / 180), q2 = new Q().setFromAxisAngle(up, 2 * Math.PI * (ro + k / Lf.count));
leaf(at.o, new E().setFromQuaternion(at.q.multiply(q2.multiply(q1))));
}
}
else {
var ro2 = rnd(), lvl = br.level + 1;
for (var c = 0; c < B.children[br.level]; c++) {
var st = rnd(1, B.start[lvl]), at2 = along(secs, st);
var qa = new Q().setFromAxisAngle(X, B.angle[lvl] * Math.PI / 180), qb = new Q().setFromAxisAngle(up, 2 * Math.PI * (ro2 + c / B.children[br.level]));
queue.push({ origin: at2.o, orientation: new E().setFromQuaternion(at2.q.multiply(qb.multiply(qa))), length: B.length[lvl] * (ever ? 1 - st : 1), radius: B.radius[lvl] * at2.r, level: lvl, sec: B.sections[lvl], seg: B.segments[lvl] });
}
}
}
function geo(v, n, u, ix) {
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
G.setAttribute("normal", new THREE.Float32BufferAttribute(n, 3));
G.setAttribute("uv", new THREE.Float32BufferAttribute(u, 2));
G.setIndex(v.length / 3 > 65535 ? new THREE.Uint32BufferAttribute(ix, 1) : new THREE.Uint16BufferAttribute(ix, 1));
G.computeBoundingBox();
G.computeBoundingSphere();
return G;
}
var wood = geo(bv, bn, bu, bi), leaves = geo(lv, ln, lu, li);
var lb = leaves.boundingBox, cx = (lb.min.x + lb.max.x) / 2, cy = (lb.min.y + lb.max.y) / 2, cz = (lb.min.z + lb.max.z) / 2, LN = leaves.attributes.normal, LP = leaves.attributes.position;
for (var m = 0; m < LN.count; m++) {
var dx = LP.getX(m) - cx, dy = (LP.getY(m) - cy) * 0.8 + (lb.max.y - lb.min.y) * 0.25, dz = LP.getZ(m) - cz, l = Math.hypot(dx, dy, dz) || 1;
LN.setXYZ(m, dx / l, dy / l, dz / l);
}
return { wood: wood, leaves: leaves };
},
function (url, srgb, rep) {
var T = RT.tex[url];
if (T)
return T;
T = RT.tex[url] = new THREE.TextureLoader().load(url);
if (srgb)
T.encoding = THREE.sRGBEncoding;
if (rep) {
T.wrapS = T.wrapT = THREE.RepeatWrapping;
T.repeat.set(rep[0], 1 / rep[1]);
}
T.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1);
return T;
},
function (sh) {
sh.uniforms.rtTime = RT.u.time;
sh.vertexShader = "uniform float rtTime;\n" + sh.vertexShader.replace("#include <begin_vertex>", [
"#include <begin_vertex>",
"{ vec4 wp=vec4( transformed, 1.0 );",
"  #ifdef USE_INSTANCING",
"  wp=instanceMatrix*wp;",
"  #endif",
"  float ph=wp.x*0.21+wp.z*0.17, h=clamp( position.y/30.0, 0.0, 1.0 );",
"  transformed.x+=( sin( rtTime*1.7+ph )*0.35+sin( rtTime*4.3+ph*3.0 )*0.12 )*h;",
"  transformed.z+=( cos( rtTime*1.3+ph )*0.3+sin( rtTime*3.7+ph*2.0 )*0.1 )*h; }"
].join("\n"));
sh.fragmentShader = sh.fragmentShader.replace("#include <alphatest_fragment>", [
"{ vec2 tu=vUv*512.0; float lod=0.5*log2( max( max( dot( dFdx( tu ), dFdx( tu ) ), dot( dFdy( tu ), dFdy( tu ) ) ), 1.0 ) );",
"  diffuseColor.a*=1.0+lod*0.3; }",
"#include <alphatest_fragment>"
].join("\n"));
sh.fragmentShader = sh.fragmentShader.replace("#include <lights_fragment_end>", [
"#include <lights_fragment_end>",
"#if NUM_DIR_LIGHTS > 0",
"{ float bl=max( dot( -normalize( vViewPosition ), directionalLights[ 0 ].direction ), 0.0 );",
"  reflectedLight.directDiffuse+=diffuseColor.rgb*directionalLights[ 0 ].color*( pow( bl, 4.0 )*0.6+0.1 ); }",
"#endif"
].join("\n"));
},
function (name) {
var K = RT.kinds[name];
if (K)
return K;
var P = RT.PRESETS[name], t0 = performance.now(), g = rtGrow(P);
var bb = g.wood.boundingBox.clone().union(g.leaves.boundingBox), h = bb.max.y - bb.min.y, want = name === "pine" ? 17 : 13, k = want / h;
[g.wood, g.leaves].forEach(function (G) { G.scale(k, k, k); G.computeBoundingSphere(); G.userData.keepOnChip = 1; });
var base = "assets/textures/trees/";
var wm = new THREE.MeshStandardMaterial({ color: P.bark.tint, roughness: 0.92, metalness: 0,
map: rtTex(base + "bark-" + P.bark.type + ".jpg", true, P.bark.scale), normalMap: rtTex(base + "bark-" + P.bark.type + "-normal.jpg", false, P.bark.scale) });
var lm = new THREE.MeshStandardMaterial({ color: P.leaves.tint, roughness: 0.8, metalness: 0, side: THREE.DoubleSide, alphaTest: P.leaves.alpha,
map: rtTex(base + "leaves-" + P.leaves.type + ".png", true, null) });
lm.onBeforeCompile = rtLeafShader;
lm.extensions = { derivatives: true };
lm.customProgramCacheKey = function () { return "rtLeaf"; };
[wm, lm].forEach(function (m) { m.userData.noReal = 1; });
var dm = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: lm.map, alphaTest: P.leaves.alpha });
K = RT.kinds[name] = { name: name, wood: g.wood, leaves: g.leaves, wm: wm, lm: lm, dm: dm, im: null, ms: Date.now() - 0, grow: Math.round(performance.now() - t0) };
RT.made++;
return K;
},
function (o) {
if (o.userData.rtCol)
return o.userData.rtCol;
var c = null, c2 = null;
o.traverse(function (m) {
if (c || !m.isMesh || !m.material)
return;
var M = Array.isArray(m.material) ? m.material[0] : m.material;
if (M && M.color && m.userData.rtPart === "leaf") {
if (m.geometry && m.geometry.userData.leaves)
c = M.color;
else if (!c2)
c2 = M.color;
}
});
c = c || c2;
return (o.userData.rtCol = c ? c.clone() : new THREE.Color(0x4E7A34));
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
