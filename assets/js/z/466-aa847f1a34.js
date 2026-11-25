/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(466, function () {
"use strict";
return [
function (nb, hMin, hVar, seed) {
var pos = [], col = [], R = wRand(seed || 4401);
for (var b = 0; b < nb; b++) {
var a = b / nb * 6.283 + R() * 0.8, lean = 0.18 + R() * 0.35, h = hMin + R() * hVar, w = 0.03 + R() * 0.016, ca = Math.cos(a), sa = Math.sin(a), ox = ca * R() * 0.12, oz = sa * R() * 0.12;
var px = -sa * w, pz = ca * w, tx = ox + ca * lean * h, tz = oz + sa * lean * h, mx = ox + ca * lean * h * 0.35, mz = oz + sa * lean * h * 0.35;
var v = [[ox - px, 0, oz - pz], [ox + px, 0, oz + pz], [mx + px * 0.7, h * 0.55, mz + pz * 0.7], [mx - px * 0.7, h * 0.55, mz - pz * 0.7], [tx, h, tz]], c = [0.62, 0.62, 0.86, 0.86, 1.1];
[[0, 1, 2], [0, 2, 3], [3, 2, 4]].forEach(function (t) { t.forEach(function (i) { pos.push(v[i][0], v[i][1], v[i][2]); col.push(c[i], c[i], c[i]); }); });
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.computeVertexNormals();
var n = g.attributes.normal;
for (var i = 0; i < n.count; i++)
n.setXYZ(i, n.getX(i) * 0.35, 0.94, n.getZ(i) * 0.35);
g.computeBoundingSphere();
return g;
},
function (G, o) {
var RAD = o.lite ? 18 : 30, STEP = o.lite ? 0.7 : 0.5;
function hsh(i, j, k) { var h = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453; return h - Math.floor(h); }
var mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
mat.userData.realKind = "rubber";
var U = { value: 0 };
mat.onBeforeCompile = function (sh) {
sh.uniforms.uWind = U;
sh.fragmentShader = sh.fragmentShader.replace("? vIndirectFront : vIndirectBack", "? vIndirectFront : vIndirectFront").replace("? vLightFront : vLightBack", "? vLightFront : vLightFront");
sh.vertexShader = "uniform float uWind;\n" + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\n#ifdef USE_INSTANCING\n vec2 wp=vec2(instanceMatrix[3][0],instanceMatrix[3][2]);\n#else\n vec2 wp=vec2(0.0);\n#endif\n float sw=sin(uWind*1.1+wp.x*0.21+wp.y*0.17)*0.6+sin(uWind*1.9+wp.x*0.5)*0.4;\n transformed.x+=sw*0.08*position.y*position.y; transformed.z+=sw*0.05*position.y*position.y;");
};
mat.customProgramCacheKey = function () { return "aupMeadow"; };
var cap = Math.ceil(Math.PI * RAD * RAD / (STEP * STEP) * 1.05), im = new THREE.InstancedMesh(aupMeadowGeo(o.lite ? 6 : 9, o.hMin || 0.12, o.hVar || 0.2, o.seed), mat, cap);
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc3 = new THREE.Vector3(), c = new THREE.Color(), at = { x: 1e9, z: 1e9 };
var C = o.cols, base = new THREE.Color(C.base), lush = new THREE.Color(C.lush), dry = new THREE.Color(C.dry);
function lay(cx, cz) {
var k = 0, n = Math.ceil(RAD / STEP), i0 = Math.round(cx / STEP), j0 = Math.round(cz / STEP);
for (var i = i0 - n; i <= i0 + n; i++)
for (var j = j0 - n; j <= j0 + n; j++) {
var x = (i + hsh(i, j, 1) - 0.5) * STEP, z = (j + hsh(i, j, 2) - 0.5) * STEP, dx = x - cx, dz = z - cz, dd = dx * dx + dz * dz;
if (dd > RAD * RAD || k >= cap)
continue;
if (!o.grow(x, z))
continue;
var dr = wFbm(x * 0.04, z * 0.04, 77, 2);
if (hsh(i, j, 3) > (o.dens !== undefined ? o.dens : 0.45) + dr * 0.8)
continue;
var sz = (0.55 + hsh(i, j, 4) * 0.5 + dr * 0.5) * Math.min(1, (RAD - Math.sqrt(dd)) / (RAD * 0.35) + 0.15);
e.set(0, hsh(i, j, 5) * 6.283, 0);
q.setFromEuler(e);
v.set(x, o.height(x, z) - 0.03, z);
sc3.set(sz, sz * (0.5 + hsh(i, j, 6) * 0.5 + dr * 0.6), sz);
m4.compose(v, q, sc3);
im.setMatrixAt(k, m4);
c.copy(base).lerp(lush, Math.max(0, 0.5 - dr) * 0.8).lerp(dry, hsh(i, j, 7) * 0.35 + Math.max(0, dr - 0.5) * 0.5).multiplyScalar(0.9 + hsh(i, j, 8) * 0.25);
im.setColorAt(k, c);
k++;
}
im.count = k;
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
at.x = cx;
at.z = cz;
}
lay(o.start ? o.start[0] : 0, o.start ? o.start[1] : 0);
im.name = "aup-meadow";
im.userData.keep = 1;
im.userData.noCull = true;
im.frustumCulled = false;
im.receiveShadow = true;
im.raycast = function () { };
im.onBeforeRender = function () {
U.value = performance.now() / 1000;
var cx = camera.position.x - (o.origin || 0), cz = camera.position.z;
if (Math.abs(cx - at.x) > RAD * 0.18 || Math.abs(cz - at.z) > RAD * 0.18)
lay(cx, cz);
};
G.add(im);
return im;
},
function (G, o) {
var NA = o.lite ? 110 : 200, NR = o.lite ? 10 : 18, seed = o.seed || 5, pos = [], col = [], idx = [], hs = [], hMax = 1, C = new THREE.Color();
var mc = new THREE.Color(o.col), foot = new THREE.Color(o.foot), top = mc.clone().lerp(new THREE.Color(o.crest || 0xE8E0F0), 0.3), dark = mc.clone().multiplyScalar(0.6);
for (var i = 0; i < NA; i++) {
var a = i / NA * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
for (var j = 0; j <= NR; j++) {
var t = j / NR, r = o.r0 + (o.r1 - o.r0) * Math.pow(t, 0.85), x = ca * r, z = sa * r * (o.sz || 1);
var e = Math.min(1, Math.max(0, (r - o.r0) / 110));
e = e * e * (3 - 2 * e);
var f = Math.min(1, Math.max(0, (o.r1 - r) / 140));
e *= f * f * (3 - 2 * f);
var n1 = wFbm(x * 0.004 + 40, z * 0.004, seed, 4), rd = 1 - Math.abs(2 * wFbm(x * 0.009, z * 0.009 + 90, seed + 1, 4) - 1), n3 = wFbm(x * 0.03, z * 0.03, seed + 2, 2);
var h = e * (o.hMin + o.hMax * Math.pow(n1, 1.3) * (0.55 + 0.75 * rd * rd)) + e * (n3 - 0.5) * 8 - 6;
pos.push((o.cx || 0) + x, h, (o.cz || 0) + z);
hs.push(h);
if (h > hMax)
hMax = h;
}
}
for (var i2 = 0; i2 < NA; i2++) {
var i3 = (i2 + 1) % NA;
for (var j2 = 0; j2 < NR; j2++) {
var A = i2 * (NR + 1) + j2, B = i3 * (NR + 1) + j2;
idx.push(A, B, A + 1, B, B + 1, A + 1);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
var nr = g.attributes.normal;
for (var k = 0; k < hs.length; k++) {
var ny = nr.getY(k), steep = 1 - Math.min(1, Math.max(0, (ny - 0.55) / 0.4)), hh = Math.max(0, hs[k]) / hMax, gr = wFbm(pos[k * 3] * 0.02, pos[k * 3 + 2] * 0.02, seed + 3, 2);
C.copy(foot).lerp(mc, Math.min(1, hh * 2.6 + steep * 0.5));
if (hh > 0.6)
C.lerp(top, Math.min(1, (hh - 0.6) * 3) * (1 - steep * 0.6));
C.lerp(dark, steep * 0.4);
C.multiplyScalar(0.88 + gr * 0.24);
col.push(C.r, C.g, C.b);
}
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.computeBoundingSphere();
var m = new THREE.MeshLambertMaterial({ vertexColors: true });
var tx = typeof texOf === "function" && o.tex ? texOf(o.tex) : null;
if (tx) {
var uv = [];
for (var p = 0; p < pos.length; p += 3)
uv.push((pos[p] + pos[p + 2] * 0.7) / 9, pos[p + 1] / 9);
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
m.map = tx;
}
var mesh = new THREE.Mesh(g, m);
mesh.name = "aup-range";
mesh.raycast = function () { };
mesh.userData.keep = 1;
G.add(mesh);
return mesh;
},
function (G) {
var lite = !!PP.lite, out = PP.out || G;
var old = [];
out.traverse(function (m) { if (m.isMesh && m.geometry && m.geometry.type === "ConeGeometry" && m.geometry.parameters && m.geometry.parameters.radialSegments === 7 && Math.hypot(m.position.x, m.position.z) > 450)
old.push(m); });
old.forEach(function (m) { if (m.parent)
m.parent.remove(m); m.geometry.dispose(); });
aupRange(out, { lite: lite, r0: 440, r1: 860, hMin: 20, hMax: 120, col: 0x3E2E58, foot: 0x4A3A62, crest: 0xC8B0E8, seed: 808, tex: "stone" });
var gr = null;
out.traverse(function (m) { if (!gr && m.isMesh && m.geometry && m.geometry.parameters && m.geometry.parameters.width === 1000 && m.geometry.attributes.color)
gr = m; });
var gt = typeof texOf === "function" ? texOf("grass") : null;
if (gr && gt && gr.geometry.attributes.uv) {
var p = gr.geometry.attributes.position, uv = gr.geometry.attributes.uv;
for (var i = 0; i < p.count; i++)
uv.setXY(i, p.getX(i) + gr.position.x, p.getZ(i) + gr.position.z);
uv.needsUpdate = true;
gr.material = gr.material.clone();
gr.material.map = gt;
gr.material.color = new THREE.Color(0xFFFFFF);
gr.material.needsUpdate = true;
var cl = gr.geometry.attributes.color;
for (var j = 0; j < cl.count; j++)
cl.setXYZ(j, Math.min(1, cl.getX(j) * 1.25), Math.min(1, cl.getY(j) * 1.25), Math.min(1, cl.getZ(j) * 1.25));
cl.needsUpdate = true;
}
var pave = PP.aupPave || [], MS = 2, MN = 480, mask = new Uint8Array(MN * MN);
function inSolid(x, z) {
for (var k = 0; k < PP.solids.length; k++) {
var S = PP.solids[k];
if (S.r !== undefined) {
if (Math.hypot(x - S.x, z - S.z) < S.r + 0.8)
return true;
continue;
}
if (S.hw !== undefined) {
var dx = x - S.x, dz = z - S.z, c = Math.cos(-(S.rot || 0)), s = Math.sin(-(S.rot || 0)), lx = dx * c - dz * s, lz = dx * s + dz * c;
if (Math.abs(lx) < S.hw + 0.8 && Math.abs(lz) < S.hd + 0.8)
return true;
}
}
return false;
}
var hit = new Uint8Array(MN * MN);
for (var sk = 0; sk < PP.solids.length; sk++) {
var S = PP.solids[sk], R;
if (S.r !== undefined)
R = S.r + 0.8;
else if (S.hw !== undefined)
R = Math.hypot(S.hw + 0.8, S.hd + 0.8);
else
continue;
var i0 = Math.max(0, Math.floor((S.x - R) / MS + MN / 2 - 0.5) - 1), i1 = Math.min(MN - 1, Math.ceil((S.x + R) / MS + MN / 2 - 0.5) + 1), j0 = Math.max(0, Math.floor((S.z - R) / MS + MN / 2 - 0.5) - 1), j1 = Math.min(MN - 1, Math.ceil((S.z + R) / MS + MN / 2 - 0.5) + 1);
if (!(i0 <= i1 && j0 <= j1))
continue;
var cr = Math.cos(-(S.rot || 0)), sr = Math.sin(-(S.rot || 0));
for (var hi = i0; hi <= i1; hi++)
for (var hj = j0; hj <= j1; hj++) {
var hx = (hi - MN / 2 + 0.5) * MS, hz = (hj - MN / 2 + 0.5) * MS, at = hi * MN + hj;
if (hit[at])
continue;
if (S.r !== undefined) {
if (Math.hypot(hx - S.x, hz - S.z) < S.r + 0.8)
hit[at] = 1;
}
else {
var dx = hx - S.x, dz = hz - S.z, lx = dx * cr - dz * sr, lz = dx * sr + dz * cr;
if (Math.abs(lx) < S.hw + 0.8 && Math.abs(lz) < S.hd + 0.8)
hit[at] = 1;
}
}
}
for (var mi = 0; mi < MN; mi++)
for (var mj = 0; mj < MN; mj++) {
var x = (mi - MN / 2 + 0.5) * MS, z = (mj - MN / 2 + 0.5) * MS, ok = 1;
if (Math.hypot(x, z) > 430)
ok = 0;
else if (Math.hypot(x - 190, z + 170) < 114)
ok = 0;
else {
for (var q = 0; q < pave.length && ok; q++) {
var P = pave[q];
if (P.rr !== undefined) {
if (Math.hypot(x - P.x, z - P.z) < P.rr)
ok = 0;
}
else if (x > P.x0 && x < P.x1 && z > P.z0 && z < P.z1)
ok = 0;
}
for (var w = 0; w < (PP.pads || []).length && ok; w++) {
var D = PP.pads[w];
if (x > D.x0 - 0.8 && x < D.x1 + 0.8 && z > D.z0 - 0.8 && z < D.z1 + 0.8)
ok = 0;
}
if (ok && hit[mi * MN + mj])
ok = 0;
}
mask[mi * MN + mj] = ok;
}
function grow(x, z) { var i = Math.floor(x / MS + MN / 2), j = Math.floor(z / MS + MN / 2); return i >= 0 && j >= 0 && i < MN && j < MN && mask[i * MN + j] === 1; }
var fest = function (x, z) { return x < -60 && x > -340 && z > -190 && z < 160; };
aupMeadow(out, { lite: lite, origin: PP.base, start: [0, 340], height: ppOutH, grow: function (x, z) { return !fest(x, z) && grow(x, z); }, hMin: 0.08, hVar: 0.16, seed: 4411,
cols: { base: 0x8A70B0, lush: 0x6A5498, dry: 0xC0A8D8 } });
aupMeadow(out, { lite: lite, origin: PP.base, start: [-200, 0], height: ppOutH, grow: function (x, z) { return fest(x, z) && grow(x, z); }, hMin: 0.12, hVar: 0.22, seed: 4412,
cols: { base: 0x6A8A48, lush: 0x4E7A38, dry: 0x9A9A58 } });
}
];
});
