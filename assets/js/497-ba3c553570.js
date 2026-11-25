/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CRX = { geo: {}, mat: {}, made: 0, live: [], t0: 0, frame: 0 };
try {
if (/[?&]crxoff=1/.test(location.search))
window.CRX_OFF = 1;
}
catch (e) { }
function crxLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof GFX_PHONE !== "undefined" && !!GFX_PHONE); }
function crxOn() { return !window.CRX_OFF && typeof THREE !== "undefined"; }
var CRX_RQ = typeof WeakMap !== "undefined" ? new WeakMap() : null;
function crxRot(v, r) {
if (!r)
return v;
if (!CRX_RQ)
return v.applyEuler(new THREE.Euler(-r[0], -r[1], -r[2], "ZYX"));
var e = CRX_RQ.get(r);
if (!e || e.a !== r[0] || e.b !== r[1] || e.c !== r[2]) {
e = { a: r[0], b: r[1], c: r[2], q: new THREE.Quaternion().setFromEuler(new THREE.Euler(-r[0], -r[1], -r[2], "ZYX")) };
CRX_RQ.set(r, e);
}
return v.applyQuaternion(e.q);
}
var CRX_T = new THREE.Vector3();
function crxSd(P, x, y, z) {
if (P.t === "e") {
var t = CRX_T.set(x - P.c[0], y - P.c[1], z - P.c[2]);
if (P.rot)
crxRot(t, P.rot);
var a = t.x / P.r[0], b = t.y / P.r[1], c = t.z / P.r[2], k0 = Math.sqrt(a * a + b * b + c * c), k1 = Math.sqrt(a * a / (P.r[0] * P.r[0]) + b * b / (P.r[1] * P.r[1]) + c * c / (P.r[2] * P.r[2]));
return k1 > 1e-9 ? k0 * (k0 - 1) / k1 : -Math.min(P.r[0], P.r[1], P.r[2]);
}
if (P.t === "b") {
var u = CRX_T.set(x - P.c[0], y - P.c[1], z - P.c[2]);
if (P.rot)
crxRot(u, P.rot);
var rr = P.rad || 0, qx = Math.abs(u.x) - P.h[0] + rr, qy = Math.abs(u.y) - P.h[1] + rr, qz = Math.abs(u.z) - P.h[2] + rr;
return Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qy, qz), 0) - rr;
}
var ax = P.b[0] - P.a[0], ay = P.b[1] - P.a[1], az = P.b[2] - P.a[2], px = x - P.a[0], py = y - P.a[1], pz = z - P.a[2];
var h = Math.max(0, Math.min(1, (px * ax + py * ay + pz * az) / (ax * ax + ay * ay + az * az || 1)));
return Math.hypot(px - ax * h, py - ay * h, pz - az * h) - (P.r0 + (P.r1 - P.r0) * h);
}
function crxSmin(a, b, k) { if (k <= 0)
return Math.min(a, b); var h = Math.max(0, Math.min(1, 0.5 + 0.5 * (b - a) / k)); return b + (a - b) * h - k * h * (1 - h); }
function crxBounds(P) {
var R;
if (P.t === "e") {
R = Math.max(P.r[0], P.r[1], P.r[2]);
return [P.c[0] - R, P.c[1] - R, P.c[2] - R, P.c[0] + R, P.c[1] + R, P.c[2] + R];
}
if (P.t === "b") {
R = Math.hypot(P.h[0], P.h[1], P.h[2]);
return [P.c[0] - R, P.c[1] - R, P.c[2] - R, P.c[0] + R, P.c[1] + R, P.c[2] + R];
}
R = Math.max(P.r0, P.r1);
return [Math.min(P.a[0], P.b[0]) - R, Math.min(P.a[1], P.b[1]) - R, Math.min(P.a[2], P.b[2]) - R, Math.max(P.a[0], P.b[0]) + R, Math.max(P.a[1], P.b[1]) + R, Math.max(P.a[2], P.b[2]) + R];
}
function crxPath(pts, r0, r1, o) { var out = [], n = pts.length - 1; for (var i = 0; i < n; i++) {
var P = { t: "c", a: pts[i], b: pts[i + 1], r0: r0 + (r1 - r0) * i / n, r1: r0 + (r1 - r0) * (i + 1) / n };
for (var k in o)
P[k] = Array.isArray(o[k]) ? o[k][Math.min(i, o[k].length - 1)] : o[k];
out.push(P);
} return out; }
function crxMirror(list) {
var out = [];
list.forEach(function (P) {
out.push(P);
var Q = JSON.parse(JSON.stringify(P));
if (Q.c)
Q.c[0] = -Q.c[0];
if (Q.a) {
Q.a[0] = -Q.a[0];
Q.b[0] = -Q.b[0];
}
if (Q.rot) {
Q.rot[1] = -Q.rot[1];
Q.rot[2] = -Q.rot[2];
}
if (Q.bone)
Q.bone = Q.bone.replace(/^L_/, "#").replace(/^R_/, "L_").replace(/^#/, "R_");
if (Q.c && Math.abs(P.c[0]) < 1e-6)
return;
out.push(Q);
});
return out;
}
function crxBonesMirror(list) { var out = []; list.forEach(function (B) { out.push(B); if (/^L_/.test(B[0]))
out.push(["R_" + B[0].slice(2), B[1] && /^L_/.test(B[1]) ? "R_" + B[1].slice(2) : B[1], [-B[2][0], B[2][1], B[2][2]]]); }); return out; }
function* crxMeshGen(plan) {
var prims = plan.prims, K = plan.k || 0.06, size = 0, i, j, k;
var lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
prims.forEach(function (P) { P.bb = crxBounds(P); if (P.cut)
return; for (var q = 0; q < 3; q++) {
lo[q] = Math.min(lo[q], P.bb[q]);
hi[q] = Math.max(hi[q], P.bb[q + 3]);
} });
size = Math.max(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]);
var cell = plan.cell || size / (crxLite() ? 38 : (plan.fine || 70));
for (i = 0; i < 3; i++) {
lo[i] -= cell * 3;
hi[i] += cell * 3;
}
var nx = Math.ceil((hi[0] - lo[0]) / cell) + 1, ny = Math.ceil((hi[1] - lo[1]) / cell) + 1, nz = Math.ceil((hi[2] - lo[2]) / cell) + 1;
var F = new Float32Array(nx * ny * nz), pad = K + cell * 2;
var sdf = function (x, y, z, list) {
var d = 1e9, first = true;
list = list || prims;
for (var q = 0; q < list.length; q++) {
var P = list[q];
if (!P.cut && first === false && (x < P.bb[0] - pad || x > P.bb[3] + pad || y < P.bb[1] - pad || y > P.bb[4] + pad || z < P.bb[2] - pad || z > P.bb[5] + pad))
continue;
var s = crxSd(P, x, y, z);
if (P.cut) {
d = Math.max(d, -s);
continue;
}
if (first) {
d = s;
first = false;
}
else
d = crxSmin(d, s, P.k !== undefined ? P.k : K);
}
return d;
};
for (k = 0; k < nz; k++) {
var z = lo[2] + k * cell;
var zl = prims.filter(function (P) { return P.cut || (z >= P.bb[2] - pad && z <= P.bb[5] + pad); });
for (j = 0; j < ny; j++) {
var y = lo[1] + j * cell;
var yl = zl.filter(function (P) { return P.cut || (y >= P.bb[1] - pad && y <= P.bb[4] + pad); });
for (i = 0; i < nx; i++) {
var x = lo[0] + i * cell;
F[i + nx * (j + ny * k)] = yl.length ? sdf(x, y, z, yl) : 1;
}
}
yield;
}
var V = new Int32Array(nx * ny * nz).fill(-1), pos = [], idx = [];
var at = function (i, j, k) { return F[i + nx * (j + ny * k)]; };
var c = new Float32Array(8);
for (k = 0; k < nz - 1; k++)
for (j = 0; j < ny - 1; j++)
for (i = 0; i < nx - 1; i++) {
var inside = 0;
for (var q = 0; q < 8; q++) {
var v = at(i + (q & 1), j + ((q >> 1) & 1), k + ((q >> 2) & 1));
c[q] = v;
if (v < 0)
inside++;
}
if (inside === 0 || inside === 8)
continue;
var sx = 0, sy = 0, sz = 0, n = 0;
for (var e = 0; e < 8; e++)
for (var b = 0; b < 3; b++) {
var f = e ^ (1 << b);
if (f < e)
continue;
var a0 = c[e], a1 = c[f];
if ((a0 < 0) === (a1 < 0))
continue;
var t = a0 / (a0 - a1);
sx += ((e & 1) + ((f & 1) - (e & 1)) * t);
sy += (((e >> 1) & 1) + (((f >> 1) & 1) - ((e >> 1) & 1)) * t);
sz += (((e >> 2) & 1) + (((f >> 2) & 1) - ((e >> 2) & 1)) * t);
n++;
}
V[i + nx * (j + ny * k)] = pos.length / 3;
pos.push(lo[0] + (i + sx / n) * cell, lo[1] + (j + sy / n) * cell, lo[2] + (k + sz / n) * cell);
}
var cid = function (i, j, k) { return V[i + nx * (j + ny * k)]; };
for (k = 1; k < nz - 1; k++)
for (j = 1; j < ny - 1; j++)
for (i = 1; i < nx - 1; i++) {
var v0 = at(i, j, k) < 0, A, B, C, D;
if ((at(i + 1, j, k) < 0) !== v0) {
A = cid(i, j - 1, k - 1);
B = cid(i, j, k - 1);
C = cid(i, j, k);
D = cid(i, j - 1, k);
if (A >= 0 && B >= 0 && C >= 0 && D >= 0) {
if (v0)
idx.push(A, B, C, A, C, D);
else
idx.push(A, C, B, A, D, C);
}
}
if ((at(i, j + 1, k) < 0) !== v0) {
A = cid(i - 1, j, k - 1);
B = cid(i, j, k - 1);
C = cid(i, j, k);
D = cid(i - 1, j, k);
if (A >= 0 && B >= 0 && C >= 0 && D >= 0) {
if (v0)
idx.push(A, C, B, A, D, C);
else
idx.push(A, B, C, A, C, D);
}
}
if ((at(i, j, k + 1) < 0) !== v0) {
A = cid(i - 1, j - 1, k);
B = cid(i, j - 1, k);
C = cid(i, j, k);
D = cid(i - 1, j, k);
if (A >= 0 && B >= 0 && C >= 0 && D >= 0) {
if (v0)
idx.push(A, B, C, A, C, D);
else
idx.push(A, C, B, A, D, C);
}
}
}
var N = pos.length / 3, nor = new Float32Array(N * 3), col = new Float32Array(N * 3), gl = new Float32Array(N), si = new Float32Array(N * 4), sw = new Float32Array(N * 4);
var h = cell * 0.5, cc = new THREE.Color(), c2 = new THREE.Color(), boneIx = {}, sig = Math.max(K * 0.55, cell * 1.5);
plan.bones.forEach(function (B, bi) { boneIx[B[0]] = bi; });
var solid = prims.filter(function (P) { return !P.cut; });
var belly = plan.belly !== undefined ? new THREE.Color(plan.belly) : null, back = plan.back !== undefined ? new THREE.Color(plan.back) : null;
for (var vi = 0; vi < N; vi++) {
if (vi % 400 === 399)
yield;
var x = pos[vi * 3], y = pos[vi * 3 + 1], z = pos[vi * 3 + 2];
var gx = sdf(x + h, y, z) - sdf(x - h, y, z), gy = sdf(x, y + h, z) - sdf(x, y - h, z), gz = sdf(x, y, z + h) - sdf(x, y, z - h), gn = Math.hypot(gx, gy, gz) || 1;
gx /= gn;
gy /= gn;
gz /= gn;
nor[vi * 3] = gx;
nor[vi * 3 + 1] = gy;
nor[vi * 3 + 2] = gz;
var best = 1e9, ds = [];
for (var p = 0; p < solid.length; p++) {
var P = solid[p], bb = P.bb;
if (x < bb[0] - sig * 4 || x > bb[3] + sig * 4 || y < bb[1] - sig * 4 || y > bb[4] + sig * 4 || z < bb[2] - sig * 4 || z > bb[5] + sig * 4) {
ds.push(1e9);
continue;
}
var dd = crxSd(P, x, y, z);
ds.push(dd);
if (dd < best)
best = dd;
}
var wsum = 0, r = 0, g = 0, bl = 0, gls = 0, bw = {};
for (p = 0; p < solid.length; p++) {
if (ds[p] >= 1e8)
continue;
var w = Math.exp(-(ds[p] - best) / (cell * 1.2));
if (w < 0.02)
continue;
cc.setHex(solid[p].col !== undefined ? solid[p].col : plan.col);
r += cc.r * w;
g += cc.g * w;
bl += cc.b * w;
gls += (solid[p].g || 0) * w;
wsum += w;
}
cc.setRGB(r / wsum, g / wsum, bl / wsum);
if (belly && gy < -0.15)
cc.lerp(belly, Math.min(1, (-gy - 0.15) * 1.6) * (plan.bellyAmt || 0.7));
if (back && gy > 0.35)
cc.lerp(back, Math.min(1, (gy - 0.35) * 1.5) * (plan.backAmt || 0.5));
if (plan.stripes) {
var sn = Math.sin(z * plan.stripes[0] + Math.sin(y * 9 + x * 4) * 1.4 + Math.sin(z * 3.1) * 0.8);
if (sn > plan.stripes[1] && gy > -0.5)
cc.lerp(c2.setHex(plan.stripes[2]), Math.min(1, (sn - plan.stripes[1]) * 6));
}
if (plan.spots) {
var sp = Math.sin(x * plan.spots[0]) * Math.sin(y * plan.spots[0] * 1.1 + 1.3) * Math.sin(z * plan.spots[0] * 0.9 + 0.7);
if (sp > plan.spots[1])
cc.lerp(c2.setHex(plan.spots[2]), 0.85);
}
if (typeof LOOK_OFF === "undefined")
cc.convertSRGBToLinear();
col[vi * 3] = cc.r;
col[vi * 3 + 1] = cc.g;
col[vi * 3 + 2] = cc.b;
gl[vi] = gls / wsum;
for (p = 0; p < solid.length; p++) {
if (ds[p] >= 1e8)
continue;
var bn = solid[p].bone || plan.bones[0][0], ww = Math.exp(-(ds[p] - best) / sig);
if (ww < 0.01)
continue;
bw[bn] = (bw[bn] || 0) + ww;
}
var top = Object.keys(bw).sort(function (a, b) { return bw[b] - bw[a]; }).slice(0, 4), tot = 0;
top.forEach(function (b) { tot += bw[b]; });
for (var q2 = 0; q2 < 4; q2++) {
var nm = top[q2];
si[vi * 4 + q2] = nm !== undefined ? (boneIx[nm] || 0) : 0;
sw[vi * 4 + q2] = nm !== undefined ? bw[nm] / tot : 0;
}
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("color", new THREE.BufferAttribute(col, 3));
G.setAttribute("crxGloss", new THREE.BufferAttribute(gl, 1));
G.setAttribute("skinIndex", new THREE.BufferAttribute(new Uint16Array(si), 4));
G.setAttribute("skinWeight", new THREE.BufferAttribute(sw, 4));
G.setIndex(N > 65535 ? new THREE.Uint32BufferAttribute(idx, 1) : new THREE.Uint16BufferAttribute(idx, 1));
G.computeBoundingBox();
G.computeBoundingSphere();
G.boundingSphere.radius *= 1.35;
CRX.made++;
return G;
}
function crxMesh(plan) { var it = crxMeshGen(plan), r; do {
r = it.next();
} while (!r.done); return r.value; }
CRX.queue = [];
CRX.job = null;
function crxWarm(keys) {
if (!crxOn())
return;
(keys || []).forEach(function (k) { if (k && !CRX.geo[k] && typeof crxPlan === "function" && crxPlan(k) && CRX.queue.indexOf(k) < 0)
CRX.queue.push(k); });
if (!CRX.job && CRX.queue.length)
crxWork();
}
function crxWork() { return __ZC(497, 0, this, arguments, new.target); }
var CRX_SURF = {
fur: { rough: 0.92, metal: 0, bump: 0.55, sheen: 0.35 },
hide: { rough: 0.78, metal: 0, bump: 0.5, sheen: 0.12 },
scale: { rough: 0.55, metal: 0, bump: 0.85, sheen: 0.18 },
chitin: { rough: 0.32, metal: 0.05, bump: 0.35, sheen: 0.25 },
flesh: { rough: 0.42, metal: 0, bump: 0.6, sheen: 0.2 },
stone: { rough: 0.95, metal: 0, bump: 1.1, sheen: 0 },
metal: { rough: 0.38, metal: 0.85, bump: 0.7, sheen: 0 },
brass: { rough: 0.3, metal: 0.95, bump: 0.6, sheen: 0 },
ecto: { rough: 0.4, metal: 0, bump: 0.2, sheen: 0.6, ghost: 1 },
fire: { rough: 1, metal: 0, bump: 0.3, sheen: 0, fire: 1 }
};
var CRX_GLSL_NOISE = [
"float crxH(vec3 p){ p=fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }",
"float crxN(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);",
"  return mix(mix(mix(crxH(i),crxH(i+vec3(1,0,0)),f.x),mix(crxH(i+vec3(0,1,0)),crxH(i+vec3(1,1,0)),f.x),f.y),",
"             mix(mix(crxH(i+vec3(0,0,1)),crxH(i+vec3(1,0,1)),f.x),mix(crxH(i+vec3(0,1,1)),crxH(i+vec3(1,1,1)),f.x),f.y),f.z); }",
"float crxF(vec3 p){ return crxN(p)*0.5+crxN(p*2.03)*0.25+crxN(p*4.01)*0.125; }",
"float crxCell(vec3 p){ vec3 i=floor(p), f=fract(p); float d=1.0; for(int a=-1;a<=1;a++) for(int b=-1;b<=1;b++) for(int c=-1;c<=1;c++){ vec3 o=vec3(float(a),float(b),float(c)); vec3 r=o+vec3(crxH(i+o),crxH(i+o+3.1),crxH(i+o+7.7))-f; d=min(d,dot(r,r)); } return sqrt(d); }"
].join("\n");
var CRX_RELIEF = {
fur: "float s1=crxN(vec3(q.x*90.0,q.y*90.0,q.z*24.0)+crxN(q*6.0)*3.0); float s2=crxN(vec3(q.x*180.0,q.y*60.0,q.z*180.0)); h=s1*0.7+s2*0.3+crxF(q*7.0)*0.6; ao=mix(0.78,1.06,s1);",
hide: "float w=crxF(q*14.0); float pores=crxN(q*160.0); h=w*0.8+abs(sin(q.y*70.0+w*9.0))*0.25+pores*0.18; ao=mix(0.85,1.05,w);",
scale: "float d=crxCell(vec3(q.x*38.0,q.y*38.0,q.z*30.0)); h=1.0-d*d*1.2+crxN(q*90.0)*0.1; ao=mix(0.62,1.08,smoothstep(0.0,0.75,1.0-d));",
chitin: "float w=crxF(q*9.0); float band=smoothstep(0.92,1.0,abs(sin(q.z*26.0+w*2.0))); h=w*0.5-band*0.6+crxN(q*120.0)*0.08; ao=1.0-band*0.35;",
flesh: "float w=crxF(q*11.0); float vein=1.0-smoothstep(0.0,0.06,abs(crxN(q*7.0)-0.5)); h=w*0.7+vein*0.35+crxN(q*140.0)*0.12; ao=mix(0.8,1.05,w)-vein*0.12;",
stone: "float w=crxF(q*5.0); float cr=crxCell(q*9.0); h=w*1.2+cr*0.6+crxN(q*70.0)*0.25; ao=mix(0.8,1.05,smoothstep(0.05,0.5,cr))*mix(0.82,1.05,w);",
metal: "vec3 g=abs(fract(q*vec3(4.0,5.0,4.0)+0.5)-0.5); float seam=1.0-smoothstep(0.0,0.018,min(g.x,min(g.y,g.z))); float wear=crxF(q*22.0); h=-seam*0.9+crxN(q*260.0)*0.06+wear*0.15; ao=1.0-seam*0.55;",
brass: "vec3 g=abs(fract(q*vec3(3.0,4.0,3.0)+0.5)-0.5); float seam=1.0-smoothstep(0.0,0.02,min(g.x,min(g.y,g.z))); float rv=1.0-smoothstep(0.0,0.03,length(fract(q*vec3(12.0,12.0,12.0))-0.5)-0.06); h=-seam*0.7+rv*0.5+crxF(q*30.0)*0.2; ao=1.0-seam*0.4;",
ecto: "float w=crxF(q*4.0+vec3(0.0,-crxTime*0.6,0.0)); h=w; ao=1.0;",
fire: "float w=crxF(q*5.0+vec3(0.0,-crxTime*2.2,0.0)); h=w; ao=1.0;"
};
function crxMat(surf, opt) {
opt = opt || {};
var key = surf + "|" + (opt.emit || 0) + "|" + (opt.tint || "");
if (CRX.mat[key])
return CRX.mat[key];
var S = CRX_SURF[surf] || CRX_SURF.hide, lite = crxLite();
var inGame = typeof REAL !== "undefined";
var o = { vertexColors: true, skinning: true, transparent: !!S.ghost, opacity: S.ghost ? 0.62 : 1, depthWrite: !S.ghost, side: S.ghost ? THREE.DoubleSide : THREE.FrontSide };
var m = inGame ? new THREE.MeshLambertMaterial(o) : new THREE.MeshStandardMaterial(Object.assign(o, { roughness: S.rough, metalness: S.metal }));
m.userData.realRough = S.rough;
if (S.metal > 0.5)
m.userData.realRough = Math.min(S.rough, 0.34);
if (surf === "fur")
m.userData.realFur = 1;
if (S.fire) {
m.emissive = new THREE.Color(0xFF5A14);
m.emissiveIntensity = 1.4;
}
if (S.ghost) {
m.emissive = new THREE.Color(opt.tint || 0x8AA8D8);
m.emissiveIntensity = 0.55;
}
if (opt.emit) {
m.emissive = new THREE.Color(opt.emit);
m.emissiveIntensity = 0.5;
}
m.userData.crxSurf = surf;
if (window.CRX_PLAIN) {
CRX.mat[key] = m;
return m;
}
m.extensions = { derivatives: true };
m.onBeforeCompile = function (sh) {
sh.uniforms.crxTime = CRX.timeU;
sh.vertexShader = "attribute float crxGloss;\nvarying float vCrxGloss;\nvarying vec3 vCrxRest;\n" + sh.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nvCrxRest=position; vCrxGloss=crxGloss;");
var relief = CRX_RELIEF[surf] || CRX_RELIEF.hide, amt = (S.bump * (lite ? 0.6 : 1)).toFixed(3);
var phys = (sh.fragmentShader.indexOf("roughnessFactor") >= 0 || sh.fragmentShader.indexOf("<roughnessmap_fragment>") >= 0) && sh.fragmentShader.indexOf("#include <emissivemap_fragment>") >= 0;
var f = "uniform float crxTime;\nvarying float vCrxGloss;\nvarying vec3 vCrxRest;\n" + CRX_GLSL_NOISE + "\n" +
"vec3 crxBumpN(vec3 sp,vec3 sn,float hh){ vec3 dx=dFdx(sp), dy=dFdy(sp); vec3 r1=cross(dy,sn), r2=cross(sn,dx); float det=dot(dx,r1); vec3 gr=sign(det)*(dFdx(hh)*r1+dFdy(hh)*r2); return normalize(abs(det)*sn-gr); }\n" +
sh.fragmentShader.replace("#include <color_fragment>", "#include <color_fragment>\nvec3 q=vCrxRest; float h=0.0, ao=1.0;\n" + relief + "\ndiffuseColor.rgb*=ao;");
if (phys)
f = f.replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n" +
"roughnessFactor=mix(roughnessFactor,0.12,vCrxGloss);\n" +
"normal=crxBumpN(-vViewPosition,normal,h*" + amt + "*0.004);\n" +
(S.sheen ? "float crxRim=pow(1.0-abs(dot(normal,normalize(vViewPosition))),3.0); diffuseColor.rgb+=diffuseColor.rgb*crxRim*" + S.sheen.toFixed(2) + ";\n" : "") +
(S.ghost ? "float crxF2=pow(1.0-abs(dot(normal,normalize(vViewPosition))),2.0); diffuseColor.a*=0.35+crxF2*0.9*(0.7+h*0.6);\n" : "") +
(S.fire ? "float crxHot=smoothstep(0.3,0.85,h); diffuseColor.rgb=mix(vec3(0.16,0.05,0.03),vec3(0.05,0.02,0.015),crxHot); totalEmissiveRadiance=mix(vec3(0.9,0.12,0.01),vec3(1.0,0.78,0.3),smoothstep(0.6,0.95,h))*(0.15+2.2*crxHot);\n" : ""));
else if (S.fire)
f = f.replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance*=0.55+h*1.1;");
sh.fragmentShader = f;
};
m.customProgramCacheKey = function () { return "crx-" + surf + (lite ? "-l" : "") + (inGame ? "-g" : ""); };
CRX.mat[key] = m;
return m;
}
CRX.timeU = { value: 0 };
var CRX_EYE = {};
function crxEye(r, iris, pupil, glow) {
var key = iris + "|" + (pupil || "r") + "|" + (glow ? 1 : 0);
var M = CRX_EYE[key];
if (!M) {
var cv = document.createElement("canvas");
cv.width = 128;
cv.height = 64;
var x = cv.getContext("2d");
x.fillStyle = pupil === "full" ? "#" + new THREE.Color(iris).multiplyScalar(0.4).getHexString() : "#EDE6DA";
x.fillRect(0, 0, 128, 64);
x.translate(64, 0);
x.scale(2, 1);
x.translate(-32, 0);
var ir = new THREE.Color(iris), grd = x.createRadialGradient(32, 32, 4, 32, 32, 22);
grd.addColorStop(0, "#" + ir.clone().multiplyScalar(1.25).getHexString());
grd.addColorStop(0.75, "#" + ir.getHexString());
grd.addColorStop(1, "#" + ir.clone().multiplyScalar(0.35).getHexString());
x.fillStyle = grd;
x.beginPath();
x.arc(32, 32, pupil === "full" ? 32 : 22, 0, 7);
x.fill();
x.fillStyle = "#050505";
x.beginPath();
if (pupil === "slit")
x.ellipse(32, 32, 3, 16, 0, 0, 7);
else if (pupil === "bar")
x.ellipse(32, 32, 13, 4, 0, 0, 7);
else if (pupil !== "none")
x.arc(32, 32, pupil === "full" ? 14 : 9, 0, 7);
x.fill();
var tx = new THREE.CanvasTexture(cv);
M = CRX_EYE[key] = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.05, metalness: 0, emissive: glow ? new THREE.Color(iris) : new THREE.Color(0), emissiveIntensity: glow ? 1.2 : 0, emissiveMap: glow ? tx : null });
}
var e = new THREE.Mesh(CRX.eyeGeo || (CRX.eyeGeo = new THREE.SphereGeometry(1, crxLite() ? 10 : 16, crxLite() ? 8 : 12)), M);
e.scale.setScalar(r);
e.rotation.y = -Math.PI / 2;
return e;
}
var CRX_PLANS = {};
var CRX_PLAN = {};
function crxPlan(key) {
if (CRX_PLAN[key])
return CRX_PLAN[key];
var f = CRX_PLANS[key];
if (!f)
return null;
var p = f();
p.key = key;
CRX_PLAN[key] = p;
return p;
}
function crxHas(key) { return !!CRX_PLANS[key]; }
function crxBuild(key, opt) {
opt = opt || {};
var plan = crxPlan(key);
if (!plan)
return null;
var G = CRX.geo[key];
if (!G && CRX.job && CRX.job.k === key) {
var J = CRX.job, r;
CRX.job = null;
do {
r = J.it.next();
} while (!r.done);
G = CRX.geo[key] = r.value;
}
if (!G) {
G = CRX.geo[key] = crxMesh(plan);
}
var bones = {}, list = [], at = {};
plan.bones.forEach(function (B) { at[B[0]] = B[2]; });
plan.bones.forEach(function (B) { var b = new THREE.Bone(); b.name = B[0]; bones[B[0]] = b; list.push(b); });
plan.bones.forEach(function (B) { var b = bones[B[0]], pp = B[1] ? at[B[1]] : [0, 0, 0]; b.position.set(B[2][0] - pp[0], B[2][1] - pp[1], B[2][2] - pp[2]); if (B[1])
bones[B[1]].add(b); });
var mesh = new THREE.SkinnedMesh(G, crxMat(plan.surf, plan.matOpt));
mesh.add(bones[plan.bones[0][0]]);
mesh.updateMatrixWorld(true);
mesh.bind(new THREE.Skeleton(list));
mesh.castShadow = !crxLite();
mesh.receiveShadow = false;
mesh.frustumCulled = true;
var g = new THREE.Group();
g.name = "crx_" + key;
g.add(mesh);
(plan.eyes || []).forEach(function (E) {
if (!E.fit && !E.one) {
E.fit = crxEyeFit(plan, E.at, E.r);
}
var A = E.fit || E.at;
[1, -1].forEach(function (sd) {
if (sd < 0 && E.one)
return;
var e = crxEye(E.r, E.iris, E.pupil, E.glow), b = bones[E.bone] || bones[plan.bones[0][0]], o = at[b.name];
e.position.set(A[0] * sd - o[0], A[1] - o[1], A[2] - o[2]);
if (E.turn)
e.rotation.y += E.turn * sd;
if (E.pitch)
e.rotation.x = E.pitch;
if (E.sx)
e.scale.x *= E.sx;
b.add(e);
});
});
var I = { key: key, plan: plan, g: g, mesh: mesh, bones: bones, at: at, base: {}, ph: Math.random(), t: Math.random() * 20, spd: 0, last: null, lastT: 0, act: null, actT: 0, look: 0, lookP: 0, seed: Math.random() * 100, dead: 0 };
plan.bones.forEach(function (B) { var b = bones[B[0]], r = (plan.pose && plan.pose[B[0]]) || [0, 0, 0]; I.base[B[0]] = r; b.rotation.set(r[0], r[1], r[2]); });
if (plan.extras)
try {
plan.extras(I);
}
catch (e) { }
mesh.onBeforeRender = function () { var f = THREE.Object3D.prototype.onBeforeRender; if (f)
try {
f.apply(this, arguments);
}
catch (e) { } crxTick(I); };
g.userData.crx = I;
g.userData.crxAct = function (what) { I.act = what; I.actT = 0; if (what === "die")
I.dead = 1; if (what === "live")
I.dead = 0; };
return g;
}
function crxSdfAt(plan, x, y, z) {
var d = 1e9, first = true, K = plan.k || 0.06;
for (var q = 0; q < plan.prims.length; q++) {
var P = plan.prims[q], s = crxSd(P, x, y, z);
if (P.cut) {
d = Math.max(d, -s);
continue;
}
if (first) {
d = s;
first = false;
}
else
d = crxSmin(d, s, P.k !== undefined ? P.k : K);
}
return d;
}
function crxEyeFit(plan, at, r) {
var p = at.slice(), h = Math.max(0.002, r * 0.2);
for (var it = 0; it < 6; it++) {
var d = crxSdfAt(plan, p[0], p[1], p[2]), gx = crxSdfAt(plan, p[0] + h, p[1], p[2]) - crxSdfAt(plan, p[0] - h, p[1], p[2]), gy = crxSdfAt(plan, p[0], p[1] + h, p[2]) - crxSdfAt(plan, p[0], p[1] - h, p[2]), gz = crxSdfAt(plan, p[0], p[1], p[2] + h) - crxSdfAt(plan, p[0], p[1], p[2] - h), gl = Math.hypot(gx, gy, gz) || 1;
var want = -r * 0.35, mv = d - want;
p[0] -= gx / gl * mv;
p[1] -= gy / gl * mv;
p[2] -= gz / gl * mv;
if (Math.abs(mv) < r * 0.03)
break;
}
return p;
}
var CRX_V = new THREE.Vector3(), CRX_C = new THREE.Vector3();
function crxR(I, n, x, y, z) { var b = I.bones[n]; if (!b)
return; var r = I.base[n]; b.rotation.set(r[0] + (x || 0), r[1] + (y || 0), r[2] + (z || 0)); }
function crxTick(I) { return __ZC(497, 1, this, arguments, new.target); }
function crxStrike(I) { if (I.act !== "strike")
return 0; var t = I.actT; return t < 0.35 ? -t / 0.35 : t < 0.5 ? -1 + (t - 0.35) / 0.15 * 2 : 1 - (t - 0.5) / 0.25; }
function crxHurt(I) { return I.act === "hurt" ? Math.sin(I.actT / 0.35 * Math.PI) : 0; }
var CRX_ANIM = {
quad: function (I, dt) { return __ZC(497, 2, this, arguments, new.target); },
biped: function (I, dt) { return __ZC(497, 3, this, arguments, new.target); },
spider: function (I, dt) {
var P = I.plan, s = I.spd, stride = P.stride || 0.9;
I.ph += dt * Math.max(0, s) / stride;
var amp = Math.min(1, s / 0.8) * 0.38, w = I.ph * Math.PI * 2, st = crxStrike(I), hu = crxHurt(I);
for (var i = 1; i <= 4; i++)
["L", "R"].forEach(function (sd, j) {
var grp = (i + j) % 2, a = w + grp * Math.PI, sg = sd === "L" ? 1 : -1;
crxR(I, sd + "_" + i + "u", 0, Math.sin(a) * amp * sg, -Math.max(0, Math.cos(a)) * amp * 0.8 * sg);
crxR(I, sd + "_" + i + "l", 0, 0, Math.max(0, Math.cos(a)) * amp * 0.5 * sg);
});
var root = I.bones.body;
root.position.y = I.at.body[1] + Math.abs(Math.sin(w * 2)) * 0.02 * Math.min(1, s);
crxR(I, "body", st * 0.25, 0, hu * 0.12);
if (P.front) {
crxR(I, "L_1u", st * 0.9, 0, 0);
crxR(I, "R_1u", st * 0.9, 0, 0);
}
crxR(I, "abdomen", Math.sin(I.t * 1.4) * 0.03, Math.sin(I.t * 0.8) * 0.05, 0);
var tw = Math.sin(I.t * 1.3 + I.seed) * 0.12;
for (var k = 1; k <= 6; k++)
crxR(I, "tail" + k, (I.act === "strike" ? (st < 0 ? 0.25 * (-st) : -0.6 * st) : Math.sin(I.t * 1.1 + k * 0.5) * 0.05), tw, 0);
var pin = Math.max(0, Math.sin(I.t * 1.7 + I.seed)) * 0.3 + (I.act === "strike" ? 0.5 : 0);
crxR(I, "L_claw", 0, -pin, 0);
crxR(I, "R_claw", 0, pin, 0);
crxR(I, "L_palp", 0, I.look * 0.2 + Math.sin(I.t * 1.1) * 0.1, 0);
crxR(I, "R_palp", 0, I.look * 0.2 - Math.sin(I.t * 1.3) * 0.1, 0);
crxR(I, "head", 0, I.look * 0.25, 0);
crxDie(I, root, dt);
},
float: function (I, dt) { return __ZC(497, 4, this, arguments, new.target); },
tripod: function (I, dt) { return __ZC(497, 5, this, arguments, new.target); }
};
function crxDie(I, root, dt) {
if (!I.dead)
return;
I.dead = Math.min(1, I.dead + dt * 1.6);
var r = I.base[root.name];
root.rotation.z = r[2] + I.dead * Math.PI * 0.48 * (I.plan.anim === "float" ? 0.3 : 1);
}
function crxQuad(p) {
var L = p.L || 0.9, H = p.H || 0.8, G = p.G || 0.3, W = p.W || 1, lr = p.legR || 0.065, col = p.col, prims = [], hs = p.hs || 1;
var yb = H + G * 0.25;
var sh = [0, yb + G * 0.05, L * 0.5], hp = [0, yb, -L * 0.5];
var nk = p.neck || { l: 0.38, up: 0.6 }, nUp = nk.up, nE = [0, sh[1] + G * 0.55 + Math.sin(nUp) * nk.l, sh[2] + G * 0.35 + Math.cos(nUp) * nk.l];
prims.push({ t: "e", c: [0, yb, L * 0.28], r: [G * 0.86 * W, G * 1.08, L * 0.46], bone: "chest", col: col });
prims.push({ t: "e", c: [0, yb - G * 0.05, -L * 0.1], r: [G * 0.78 * W, G * 0.92, L * 0.45], bone: "hips", col: col });
prims.push({ t: "e", c: [0, yb + G * 0.05, -L * 0.42], r: [G * 0.82 * W, G * 0.92, G * 1.05], bone: "hips", col: col });
prims.push({ t: "e", c: [0, yb + G * 0.08, L * 0.05], r: [G * 0.82 * W, G * 1.0, L * 0.42], bone: "hips", col: col, k: 0.08 });
if (p.hump)
prims.push({ t: "e", c: [0, yb + G * 0.75, L * 0.42], r: [G * 0.6, G * 0.55, G * 0.9], bone: "chest", col: p.humpCol || col });
prims = prims.concat(crxMirror([
{ t: "e", c: [G * 0.6 * W, yb - G * 0.1, L * 0.46], r: [G * 0.32, G * 0.85, G * 0.62], rot: [0.25, 0, 0], bone: "L_fu", col: col },
{ t: "e", c: [G * 0.55 * W, yb - G * 0.05, -L * 0.46], r: [G * 0.38, G * 0.95, G * 0.8], bone: "L_bu", col: col }
]));
var fx = G * 0.58 * W, bx = G * 0.55 * W, foot = p.foot || "paw", fc = p.footCol !== undefined ? p.footCol : (foot === "hoof" ? 0x2A231E : col);
var fe = [fx, H * 0.42, L * 0.5], ff = [fx, 0.05 + lr * 0.4, L * 0.52];
var bk = [bx, H * 0.58, -L * 0.34], bh = [bx, H * 0.27, -L * 0.58], bf = [bx, 0.05 + lr * 0.4, -L * 0.52];
var leg = [
{ t: "c", a: [fx, yb - G * 0.2, L * 0.46], b: fe, r0: lr * 1.55, r1: lr * 1.05, bone: "L_fu", col: col },
{ t: "c", a: fe, b: ff, r0: lr * 1.0, r1: lr * 0.75, bone: "L_fl", col: col },
{ t: "c", a: [bx, yb - G * 0.1, -L * 0.46], b: bk, r0: lr * 2.1, r1: lr * 1.25, bone: "L_bu", col: col },
{ t: "c", a: bk, b: bh, r0: lr * 1.15, r1: lr * 0.8, bone: "L_bl", col: col },
{ t: "c", a: bh, b: bf, r0: lr * 0.8, r1: lr * 0.72, bone: "L_bl", col: col }
];
if (foot === "hoof")
leg.push({ t: "c", a: [fx, 0.12, L * 0.53], b: [fx, 0.02, L * 0.55], r0: lr * 0.85, r1: lr * 1.05, bone: "L_fl", col: fc, g: 0.35, k: 0.015 }, { t: "c", a: [bx, 0.12, -L * 0.51], b: [bx, 0.02, -L * 0.49], r0: lr * 0.85, r1: lr * 1.05, bone: "L_bl", col: fc, g: 0.35, k: 0.015 });
else
leg.push({ t: "e", c: [fx, 0.05, L * 0.52 + lr * 0.6], r: [lr * 1.15, 0.05, lr * 1.7], bone: "L_fl", col: fc, k: 0.03 }, { t: "e", c: [bx, 0.05, -L * 0.52 + lr * 0.6], r: [lr * 1.1, 0.05, lr * 1.6], bone: "L_bl", col: fc, k: 0.03 });
if (p.claws)
[-1, 0, 1].forEach(function (i) { leg.push({ t: "c", a: [fx + i * lr * 0.6, 0.05, L * 0.52 + lr * 1.9], b: [fx + i * lr * 0.65, 0.015, L * 0.52 + lr * 2.6], r0: lr * 0.22, r1: lr * 0.05, bone: "L_fl", col: 0x1A1612, g: 0.6, k: 0.01 }); });
prims = prims.concat(crxMirror(leg));
prims.push({ t: "c", a: [0, sh[1] + G * 0.25, sh[2]], b: nE, r0: G * (p.neckR0 || 0.62), r1: G * (p.neckR1 || 0.42) * hs, bone: "neck", col: col });
if (p.mane)
prims.push({ t: "c", a: [0, sh[1] + G * 0.75, sh[2] - G * 0.1], b: [0, nE[1] + 0.12 * hs, nE[2] - 0.05], r0: G * 0.28, r1: G * 0.2, bone: "neck", col: p.mane });
var T = p.tail || { l: 0.6, r: 0.06 }, t0 = [0, yb + G * 0.35, -L * 0.5 - G * 0.85], ta = T.up || -0.9, tl = T.l;
var t1 = [0, t0[1] + Math.sin(ta) * tl * 0.33, t0[2] - Math.cos(ta) * tl * 0.33], t2 = [0, t1[1] + Math.sin(ta - 0.3) * tl * 0.33, t1[2] - Math.cos(ta - 0.3) * tl * 0.33], t3 = [0, t2[1] + Math.sin(ta - 0.5) * tl * 0.34, t2[2] - Math.cos(ta - 0.5) * tl * 0.34];
if (tl > 0) {
prims.push({ t: "c", a: [0, t0[1] - 0.02, t0[2] + 0.12], b: t1, r0: T.r * 1.2, r1: T.r * (T.bushy ? 1.6 : 0.85), bone: "tail1", col: T.col || col });
prims.push({ t: "c", a: t1, b: t2, r0: T.r * (T.bushy ? 1.6 : 0.85), r1: T.r * (T.bushy ? 1.7 : 0.6), bone: "tail2", col: T.col || col });
prims.push({ t: "c", a: t2, b: t3, r0: T.r * (T.bushy ? 1.7 : 0.6), r1: T.r * (T.bushy ? 0.6 : 0.35), bone: "tail3", col: T.tip !== undefined ? T.tip : (T.col || col) });
if (T.tuft)
prims.push({ t: "e", c: t3, r: [T.r * 1.5, T.r * 1.5, T.r * 2.4], bone: "tail3", col: T.tuft });
}
var bones = [
["hips", null, [0, yb, -L * 0.15]], ["chest", "hips", [0, yb, L * 0.2]], ["neck", "chest", [0, sh[1] + G * 0.3, sh[2]]], ["head", "neck", nE],
["L_fu", "chest", [fx, yb - G * 0.2, L * 0.46]], ["L_fl", "L_fu", fe], ["L_bu", "hips", [bx, yb - G * 0.1, -L * 0.46]], ["L_bl", "L_bu", bk],
["tail1", "hips", t0], ["tail2", "tail1", t1], ["tail3", "tail2", t2]
];
var eyes = [];
var Hd = crxHead(p.head || "dog", nE, hs, p, eyes, bones);
prims = prims.concat(Hd);
if (p.heads === 3) {
[-1, 1].forEach(function (sd, i) {
var n = "head" + (i + 2), E = [nE[0] + sd * 0.34 * hs, nE[1] - 0.06, nE[2] - 0.12];
prims.push({ t: "c", a: [sd * G * 0.4, sh[1] + G * 0.25, sh[2]], b: E, r0: G * 0.42, r1: G * 0.36 * hs, bone: n, col: col });
bones.push([n, "chest", [sd * G * 0.4, sh[1] + G * 0.3, sh[2]]]);
var hp2 = crxHead(p.head || "dog", E, hs * 0.95, p, eyes, null, n);
prims = prims.concat(hp2);
});
}
if (p.wings) {
var Wn = crxWings(p.wings, [0, yb + G * 0.85, L * 0.3], G);
prims = prims.concat(Wn.prims);
bones = bones.concat(Wn.bones);
}
if (p.more)
prims = prims.concat(p.more(nE, yb, L, G, H));
return { prims: crxMirrorFix(prims), bones: crxBonesMirror(bones), eyes: eyes, col: col, belly: p.belly, back: p.back, bellyAmt: p.bellyAmt, backAmt: p.backAmt, stripes: p.stripes, spots: p.spots,
surf: p.surf || "fur", anim: "quad", k: p.k || 0.055, stride: p.stride || (H * 1.6), runAt: p.runAt || (H * 3.6), fine: p.fine || 96, tailSway: p.tailSway, tailUp: p.tailUp, flap: !!p.wings, heads: p.heads, matOpt: p.matOpt,
pose: Object.assign({ tail1: [0, 0, 0] }, p.pose || {}) };
}
function crxMirrorFix(list) { return list; }
function crxHead(kind, E, hs, p, eyes, bones, boneName) {
var B = boneName || "head", s = hs, out = [], c = p.headCol !== undefined ? p.headCol : p.col, nose = p.noseCol !== undefined ? p.noseCol : 0x1A1614;
var at = function (x, y, z) { return [E[0] + x * s, E[1] + y * s, E[2] + z * s]; };
var jaw = boneName ? B : "jaw";
if (bones && !boneName)
bones.push(["jaw", "head", at(0, -0.04, 0.04)]);
var eye = function (x, y, z, r, iris, pupil, glow) { eyes.push({ bone: B, at: at(x, y, z), r: r * s, iris: iris, pupil: pupil, glow: glow, turn: 0.35 }); };
var iris = p.eyeCol || 0xB07A2A, glow = !!p.glowEyes;
if (kind === "dog" || kind === "wolf" || kind === "fox") {
var ml = kind === "fox" ? 1.1 : 1;
out.push({ t: "e", c: at(0, 0.05, 0.03), r: [0.105 * s, 0.095 * s, 0.12 * s], bone: B, col: c });
out.push({ t: "e", c: at(0, 0.02, 0.1), r: [0.085 * s, 0.07 * s, 0.08 * s], bone: B, col: c });
out.push({ t: "c", a: at(0, 0.035, 0.1), b: at(0, 0.0, 0.27 * ml), r0: 0.06 * s, r1: 0.036 * s, bone: B, col: p.muzzle !== undefined ? p.muzzle : c });
out.push({ t: "e", c: at(0, 0.012, 0.28 * ml), r: [0.026 * s, 0.02 * s, 0.02 * s], bone: B, col: nose, g: 0.8, k: 0.012 });
out.push({ t: "c", a: at(0, -0.035, 0.08), b: at(0, -0.04, 0.24 * ml), r0: 0.045 * s, r1: 0.026 * s, bone: jaw, col: p.muzzle !== undefined ? p.muzzle : c });
out = out.concat(crxMirror([{ t: "c", a: at(0.06, 0.11, 0.0), b: at(0.075, 0.23 * (kind === "fox" ? 1.1 : 1), -0.02), r0: 0.04 * s, r1: 0.006 * s, bone: B, col: c, k: 0.02 }]));
out.push({ t: "c", a: at(0, 0.06, 0.12), b: at(0, 0.04, 0.2), r0: 0.03 * s, r1: 0.02 * s, bone: B, col: c, k: 0.03 });
if (p.fangs)
out = out.concat(crxMirror([{ t: "c", a: at(0.025, -0.005, 0.22 * ml), b: at(0.026, -0.05, 0.225 * ml), r0: 0.009 * s, r1: 0.002 * s, bone: B, col: 0xEDE4D0, g: 0.6, k: 0.004 }]));
eye(0.052, 0.06, 0.115, 0.02, iris, "r", glow);
}
else if (kind === "cat" || kind === "lion") {
out.push({ t: "e", c: at(0, 0.06, 0.04), r: [0.12 * s, 0.11 * s, 0.12 * s], bone: B, col: c });
out = out.concat(crxMirror([{ t: "e", c: at(0.06, 0.0, 0.13), r: [0.065 * s, 0.06 * s, 0.06 * s], bone: B, col: p.muzzle !== undefined ? p.muzzle : c }]));
out.push({ t: "c", a: at(0, 0.04, 0.12), b: at(0, 0.01, 0.2), r0: 0.055 * s, r1: 0.045 * s, bone: B, col: c });
out.push({ t: "e", c: at(0, 0.015, 0.205), r: [0.03 * s, 0.022 * s, 0.02 * s], bone: B, col: p.noseCol !== undefined ? p.noseCol : 0x6A3A30, g: 0.6, k: 0.012 });
out.push({ t: "e", c: at(0, -0.045, 0.14), r: [0.05 * s, 0.03 * s, 0.05 * s], bone: jaw, col: p.muzzle !== undefined ? p.muzzle : c });
out = out.concat(crxMirror([{ t: "e", c: at(0.085, 0.15, 0.0), r: [0.035 * s, 0.04 * s, 0.015 * s], rot: [0, 0.3, 0.4], bone: B, col: c, k: 0.02 }]));
if (p.fangs)
out = out.concat(crxMirror([{ t: "c", a: at(0.03, -0.01, 0.18), b: at(0.03, -0.06, 0.18), r0: 0.011 * s, r1: 0.002 * s, bone: B, col: 0xEDE4D0, g: 0.6, k: 0.004 }]));
if (kind === "lion" && p.maneCol !== undefined) {
out.push({ t: "e", c: at(0, 0.06, -0.04), r: [0.17 * s, 0.19 * s, 0.1 * s], bone: B, col: p.maneCol, k: 0.04 });
out.push({ t: "e", c: at(0, -0.08, -0.16), r: [0.16 * s, 0.2 * s, 0.2 * s], bone: "neck", col: p.maneCol, k: 0.05 });
for (var ml = 0; ml < 7; ml++) {
var ma = (ml - 3) * 0.45;
out.push({ t: "c", a: at(Math.sin(ma) * 0.13, 0.06 + Math.cos(ma) * 0.12, -0.06), b: at(Math.sin(ma) * 0.17, -0.12 + Math.cos(ma) * 0.06, -0.2), r0: 0.06 * s, r1: 0.03 * s, bone: "neck", col: ml % 2 ? p.maneCol : (p.maneCol2 !== undefined ? p.maneCol2 : p.maneCol), k: 0.04 });
}
}
eye(0.055, 0.075, 0.135, 0.021, iris, "slit", glow);
}
else if (kind === "bear") {
out.push({ t: "e", c: at(0, 0.06, 0.03), r: [0.15 * s, 0.13 * s, 0.14 * s], bone: B, col: c });
out.push({ t: "c", a: at(0, 0.04, 0.1), b: at(0, 0.0, 0.26), r0: 0.085 * s, r1: 0.06 * s, bone: B, col: p.muzzle !== undefined ? p.muzzle : c });
out.push({ t: "e", c: at(0, 0.01, 0.27), r: [0.035 * s, 0.026 * s, 0.024 * s], bone: B, col: nose, g: 0.8, k: 0.012 });
out.push({ t: "c", a: at(0, -0.05, 0.07), b: at(0, -0.05, 0.21), r0: 0.06 * s, r1: 0.04 * s, bone: jaw, col: p.muzzle !== undefined ? p.muzzle : c });
out = out.concat(crxMirror([{ t: "e", c: at(0.11, 0.16, -0.01), r: [0.04 * s, 0.04 * s, 0.022 * s], bone: B, col: c, k: 0.025 }]));
eye(0.062, 0.085, 0.135, 0.017, 0x3A2416, "r", glow);
}
else if (kind === "boar") {
out.push({ t: "c", a: at(0, 0.06, -0.04), b: at(0, -0.04, 0.32), r0: 0.15 * s, r1: 0.07 * s, bone: B, col: c });
out.push({ t: "e", c: at(0, -0.04, 0.34), r: [0.065 * s, 0.06 * s, 0.025 * s], bone: B, col: 0x5A3A34, g: 0.4, k: 0.015 });
out.push({ t: "c", a: at(0, -0.09, 0.05), b: at(0, -0.09, 0.25), r0: 0.07 * s, r1: 0.045 * s, bone: jaw, col: c });
out = out.concat(crxMirror([{ t: "c", a: at(0.06, -0.08, 0.24), b: at(0.11, 0.0, 0.27), r0: 0.02 * s, r1: 0.004 * s, bone: jaw, col: 0xEDE2C8, g: 0.6, k: 0.008 },
{ t: "c", a: at(0.08, 0.12, -0.02), b: at(0.13, 0.2, -0.06), r0: 0.04 * s, r1: 0.008 * s, bone: B, col: c, k: 0.02 }]));
eye(0.075, 0.07, 0.1, 0.016, 0x2A1A10, "r", glow);
}
else if (kind === "horse") {
out.push({ t: "e", c: at(0, 0.07, 0.02), r: [0.09 * s, 0.1 * s, 0.13 * s], bone: B, col: c });
out.push({ t: "c", a: at(0, 0.06, 0.06), b: at(0, -0.16, 0.42), r0: 0.085 * s, r1: 0.07 * s, bone: B, col: c });
out.push({ t: "e", c: at(0, -0.17, 0.44), r: [0.075 * s, 0.07 * s, 0.07 * s], bone: B, col: p.muzzle !== undefined ? p.muzzle : c });
out = out.concat(crxMirror([{ t: "e", c: at(0.04, -0.15, 0.5), r: [0.016 * s, 0.02 * s, 0.01 * s], bone: B, col: 0x1A1210, cut: false, k: 0.01 },
{ t: "e", c: at(0.075, -0.02, 0.1), r: [0.03 * s, 0.08 * s, 0.07 * s], bone: jaw, col: c, k: 0.03 },
{ t: "c", a: at(0.05, 0.15, 0.0), b: at(0.06, 0.27, 0.02), r0: 0.03 * s, r1: 0.006 * s, bone: B, col: c, k: 0.015 }]));
out.push({ t: "c", a: at(0, -0.2, 0.38), b: at(0, -0.22, 0.47), r0: 0.045 * s, r1: 0.04 * s, bone: jaw, col: p.muzzle !== undefined ? p.muzzle : c });
if (p.horn)
out.push({ t: "c", a: at(0, 0.16, 0.12), b: at(0, 0.48, 0.3), r0: 0.03 * s, r1: 0.003 * s, bone: B, col: p.horn, g: 0.8, k: 0.01 });
if (p.mane)
out.push({ t: "e", c: at(0, 0.16, -0.04), r: [0.03 * s, 0.06 * s, 0.09 * s], bone: B, col: p.mane, k: 0.02 });
eye(0.08, 0.04, 0.17, 0.024, 0x241610, "bar", glow);
}
else if (kind === "eagle") {
out.push({ t: "e", c: at(0, 0.06, 0.03), r: [0.1 * s, 0.1 * s, 0.12 * s], bone: B, col: p.headCol !== undefined ? p.headCol : 0xF2EEE6 });
out = out.concat(crxPath([at(0, 0.06, 0.12), at(0, 0.05, 0.2), at(0, 0.0, 0.26), at(0, -0.06, 0.25)], 0.045 * s, 0.006 * s, { bone: B, col: 0xD8A63A, g: 0.55, k: 0.015 }));
out.push({ t: "c", a: at(0, -0.01, 0.12), b: at(0, -0.03, 0.2), r0: 0.03 * s, r1: 0.012 * s, bone: jaw, col: 0xD8A63A, g: 0.5, k: 0.01 });
out = out.concat(crxMirror([{ t: "e", c: at(0.06, 0.09, 0.08), r: [0.02 * s, 0.015 * s, 0.04 * s], bone: B, col: p.headCol !== undefined ? p.headCol : 0xF2EEE6, k: 0.02 }]));
eye(0.065, 0.07, 0.1, 0.022, 0xE8B23A, "r", glow);
}
else if (kind === "rabbit" || kind === "rat") {
var rab = kind === "rabbit";
out.push({ t: "e", c: at(0, 0.04, 0.04), r: [0.085 * s, 0.08 * s, 0.1 * s], bone: B, col: c });
out.push({ t: "c", a: at(0, 0.03, 0.08), b: at(0, 0.0, rab ? 0.16 : 0.22), r0: 0.055 * s, r1: rab ? 0.04 * s : 0.02 * s, bone: B, col: c });
out.push({ t: "e", c: at(0, 0.005, rab ? 0.17 : 0.225), r: [0.015 * s, 0.012 * s, 0.01 * s], bone: B, col: rab ? 0xC88A8A : 0xD8A0A0, g: 0.6, k: 0.008 });
out = out.concat(crxMirror([rab ? { t: "c", a: at(0.035, 0.1, 0.0), b: at(0.06, 0.33, -0.08), r0: 0.035 * s, r1: 0.02 * s, bone: B, col: c, k: 0.015 } : { t: "e", c: at(0.06, 0.1, 0.0), r: [0.04 * s, 0.04 * s, 0.012 * s], bone: B, col: 0xC8A0A0, k: 0.015 }]));
eye(0.055, 0.06, 0.09, 0.02, 0x1A1210, "r", glow);
}
else if (kind === "elephant") {
out.push({ t: "e", c: at(0, 0.1, 0.06), r: [0.26 * s, 0.3 * s, 0.28 * s], bone: B, col: c });
out.push({ t: "e", c: at(0, 0.0, 0.2), r: [0.18 * s, 0.24 * s, 0.15 * s], bone: B, col: c });
out = out.concat(crxPath([at(0, -0.04, 0.3), at(0, -0.3, 0.38)], 0.11 * s, 0.075 * s, { bone: "trunk1", col: c }));
out = out.concat(crxPath([at(0, -0.3, 0.38), at(0, -0.62, 0.36), at(0, -0.85, 0.4)], 0.075 * s, 0.045 * s, { bone: "trunk2", col: c }));
out = out.concat(crxMirror([{ t: "e", c: at(0.3, 0.02, -0.04), r: [0.03 * s, 0.32 * s, 0.26 * s], rot: [0, 0.5, 0], bone: B, col: c, k: 0.04 }]));
if (p.tusks)
out = out.concat(crxMirror([crxPath([at(0.1, -0.12, 0.24), at(0.14, -0.38, 0.42), at(0.1, -0.42, 0.62), at(0.02, -0.3, 0.74)], 0.045 * s, 0.015 * s, { bone: B, col: 0xEDE2C8, g: 0.6, k: 0.01 })].reduce(function (a, b) { return a.concat(b); }, [])));
if (bones && !boneName) {
bones.push(["trunk1", "head", at(0, -0.04, 0.3)]);
bones.push(["trunk2", "trunk1", at(0, -0.3, 0.38)]);
}
eye(0.2, 0.08, 0.24, 0.025, 0x2A1A10, "r", glow);
}
else if (kind === "bull") {
out.push({ t: "e", c: at(0, 0.06, 0.05), r: [0.13 * s, 0.13 * s, 0.14 * s], bone: B, col: c });
out.push({ t: "c", a: at(0, 0.04, 0.1), b: at(0, -0.08, 0.3), r0: 0.1 * s, r1: 0.085 * s, bone: B, col: c });
out.push({ t: "e", c: at(0, -0.09, 0.32), r: [0.09 * s, 0.065 * s, 0.06 * s], bone: B, col: p.muzzle !== undefined ? p.muzzle : 0x4A3A34, g: 0.3 });
out = out.concat(crxMirror(crxPath([at(0.1, 0.15, 0.02), at(0.24, 0.17, 0.04), at(0.32, 0.28, 0.1), at(0.3, 0.4, 0.16)], 0.04 * s, 0.006 * s, { bone: B, col: 0xE8DCC2, g: 0.5, k: 0.015 })));
eye(0.095, 0.08, 0.14, 0.022, 0x2A1410, "bar", glow);
}
return out;
}
function crxWings(w, root, G) { return __ZC(497, 6, this, arguments, new.target); }
CRX_PLANS.wolf = function () {
return crxQuad({ L: 0.72, H: 0.62, G: 0.22, W: 0.85, legR: 0.045, head: "wolf", hs: 1.05, col: 0x6E655A, belly: 0xD8D0C2, back: 0x3A342E, muzzle: 0xB8AC98,
tail: { l: 0.5, r: 0.06, up: -1.1, bushy: 1, tip: 0x2A2622 }, neck: { l: 0.3, up: 0.55 }, fangs: 1, eyeCol: 0xC8962A, stride: 1.15 });
};
CRX_PLANS.hellhound = function () { return __ZC(497, 7, this, arguments, new.target); };
CRX_PLANS.cerberus = function () {
var p = CRX_PLANS.hellhound();
return crxQuad({ L: 0.82, H: 0.7, G: 0.28, W: 0.95, legR: 0.055, head: "dog", hs: 1.05, heads: 3, col: 0x1E1A1A, back: 0x0E0C0C, belly: 0x3A2A26, muzzle: 0x2A2020,
tail: { l: 0.6, r: 0.06, up: -0.8 }, neck: { l: 0.28, up: 0.5 }, fangs: 1, eyeCol: 0xFF4A1E, glowEyes: 1, claws: 1, surf: "hide", stride: 1.3 });
};
CRX_PLANS.fox = function () {
return crxQuad({ L: 0.62, H: 0.5, G: 0.19, W: 0.8, legR: 0.036, head: "fox", hs: 0.9, col: 0xC0602A, belly: 0xF0E8DA, back: 0x9A4A22, muzzle: 0xF0E8DA,
tail: { l: 0.55, r: 0.07, up: -1.2, bushy: 1, tip: 0xF2EEE6 }, neck: { l: 0.24, up: 0.6 }, eyeCol: 0xC89A2A, stride: 0.95, pose: { L_ear: [0, 0, 0] } });
};
CRX_PLANS.kitsune = function () { return __ZC(497, 8, this, arguments, new.target); };
CRX_PLANS.lion = function () {
return crxQuad({ L: 1.0, H: 0.82, G: 0.3, W: 0.85, legR: 0.06, head: "lion", hs: 1.3, col: 0xC0924A, belly: 0xE8D2A8, back: 0xA87A3A, muzzle: 0xE8D8B8, maneCol: 0x7A4A22, maneCol2: 0x5A3418,
tail: { l: 0.85, r: 0.035, up: -1.2, tuft: 0x4A2A14 }, neck: { l: 0.3, up: 0.4 }, fangs: 1, eyeCol: 0xC8902A, claws: 1, stride: 1.6 });
};
CRX_PLANS.tiger = function () {
return crxQuad({ L: 1.1, H: 0.8, G: 0.3, W: 0.82, legR: 0.062, head: "cat", hs: 1.25, col: 0xD8782A, belly: 0xF4EEE2, muzzle: 0xF4EEE2,
stripes: [22, 0.55, 0x1A1210], tail: { l: 0.9, r: 0.04, up: -1.1, tip: 0x1A1210 }, neck: { l: 0.28, up: 0.4 }, fangs: 1, eyeCol: 0xD8B03A, claws: 1, stride: 1.6 });
};
CRX_PLANS.bear = function () {
return crxQuad({ L: 0.9, H: 0.72, G: 0.42, W: 0.95, legR: 0.09, head: "bear", hs: 1.3, col: 0x4A3020, back: 0x3A2418, belly: 0x3A2618, muzzle: 0x7A5A3A,
tail: { l: 0.12, r: 0.06, up: -0.5 }, neck: { l: 0.3, up: 0.25 }, neckR0: 0.7, neckR1: 0.55, claws: 1, stride: 1.4, runAt: 3.4, hump: 0 });
};
CRX_PLANS.snowbear = function () {
return crxQuad({ L: 0.95, H: 0.75, G: 0.44, W: 0.95, legR: 0.095, head: "bear", hs: 1.3, col: 0xEDE8DC, back: 0xF8F4EC, belly: 0xD8D0BE, muzzle: 0xE0D8C8, hump: 0,
tail: { l: 0.12, r: 0.06, up: -0.5 }, neck: { l: 0.4, up: 0.2 }, neckR0: 0.7, neckR1: 0.5, claws: 1, stride: 1.4, runAt: 3.4 });
};
CRX_PLANS.boar = function () { return __ZC(497, 9, this, arguments, new.target); };
CRX_PLANS.horse = function () {
return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x6A3E22, back: 0x5A321A, muzzle: 0x3A2A22, mane: 0x1A1210, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0x1A1210 }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0 });
};
CRX_PLANS.unicorn = function () { return __ZC(497, 10, this, arguments, new.target); };
CRX_PLANS.pegasus = function () { return __ZC(497, 11, this, arguments, new.target); };
CRX_PLANS.nightmare = function () {
return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x141214, back: 0x0A0A0C, muzzle: 0x1E1A1A, mane: 0x3A1410, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0x3A1410 }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0, eyeCol: 0xFF3A1E, glowEyes: 1, surf: "hide" });
};
CRX_PLANS.kelpie = function () {
return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x3E5A54, back: 0x2E4440, muzzle: 0x2A3A36, mane: 0x2F5A3A, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0x2F5A3A }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0, surf: "flesh" });
};
CRX_PLANS.griffin = function () { return __ZC(497, 12, this, arguments, new.target); };
CRX_PLANS.hippogriff = function () {
return crxQuad({ L: 1.05, H: 0.95, G: 0.32, W: 0.8, legR: 0.05, head: "eagle", hs: 1.4, col: 0x8A6A4A, headCol: 0xD8CCB8, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: 0x4A3A2A }, neck: { l: 0.45, up: 0.85 }, neckR1: 0.45, stride: 1.9, wings: { col: 0x7A5A3A, col2: 0x9A7A54, s: 1.4 } });
};
CRX_PLANS.manticore = function () { return __ZC(497, 13, this, arguments, new.target); };
CRX_PLANS.chimera = function () { return __ZC(497, 14, this, arguments, new.target); };
CRX_PLANS.fenrir = function () {
return crxQuad({ L: 0.72, H: 0.62, G: 0.22, W: 0.85, legR: 0.045, head: "wolf", hs: 1.05, col: 0x5E5A58, belly: 0xA8A49E, back: 0x3A3836, muzzle: 0x8A8680,
tail: { l: 0.5, r: 0.06, up: -1.1, bushy: 1 }, neck: { l: 0.3, up: 0.55 }, fangs: 1, eyeCol: 0xE8B23A, glowEyes: 1, stride: 1.15 });
};
CRX_PLANS.elephant = function () {
return crxQuad({ L: 1.1, H: 1.25, G: 0.62, W: 0.9, legR: 0.15, head: "elephant", hs: 1.5, col: 0x7A7676, back: 0x6A6666, belly: 0x8A8684,
tail: { l: 0.7, r: 0.03, up: -1.4, tuft: 0x2A2622 }, neck: { l: 0.12, up: 0.3 }, neckR0: 0.8, neckR1: 0.7, foot: "paw", footCol: 0x8A8482, surf: "hide", stride: 1.8, runAt: 4.5, tailSway: 0.15 });
};
CRX_PLANS.mammoth = function () {
return crxQuad({ L: 1.1, H: 1.25, G: 0.66, W: 0.95, legR: 0.16, head: "elephant", hs: 1.55, col: 0x5A3A26, back: 0x4A2E1E, belly: 0x6A4A32, tusks: 1, hump: 1,
tail: { l: 0.4, r: 0.04, up: -1.4, tuft: 0x2A1A10 }, neck: { l: 0.12, up: 0.3 }, neckR0: 0.8, neckR1: 0.7, stride: 1.8, runAt: 4.5, tailSway: 0.15 });
};
CRX_PLANS.rabbit = function () {
return crxQuad({ L: 0.22, H: 0.14, G: 0.11, W: 1, legR: 0.022, head: "rabbit", hs: 0.65, col: 0xA8987E, belly: 0xF0E8DC,
tail: { l: 0.04, r: 0.035, up: 0.2, col: 0xF4F0EA }, neck: { l: 0.06, up: 0.9 }, stride: 0.3, fine: 70 });
};
CRX_PLANS.rat = function () {
return crxQuad({ L: 0.22, H: 0.1, G: 0.08, W: 1, legR: 0.014, head: "rat", hs: 0.55, col: 0x5E5650, belly: 0xA89E94,
tail: { l: 0.35, r: 0.012, up: -0.3, col: 0xC89A94 }, neck: { l: 0.06, up: 0.4 }, stride: 0.22, fine: 70 });
};
CRX_PLANS.giantrat = function () {
return crxQuad({ L: 0.75, H: 0.36, G: 0.26, W: 0.9, legR: 0.04, head: "rat", hs: 1.8, col: 0x4A423C, back: 0x2E2824, belly: 0x8A8076,
tail: { l: 1.1, r: 0.035, up: -0.3, col: 0xB08A84 }, neck: { l: 0.18, up: 0.3 }, fangs: 1, eyeCol: 0xE83A2A, glowEyes: 1, claws: 1, stride: 0.8, surf: "fur" });
};
CRX_PLANS.stag = function () { return __ZC(497, 15, this, arguments, new.target); };
function crxBiped(p) { return __ZC(497, 16, this, arguments, new.target); }
function crxFace(kind, E, s, p, eyes, bones) { return __ZC(497, 17, this, arguments, new.target); }
CRX_PLANS.troll = function () { return __ZC(497, 18, this, arguments, new.target); };
CRX_PLANS.deeptroll = function () {
var p = crxBiped({ h: 2.9, b: 1.4, hunch: 0.75, arm: 1.3, gut: 0.5, head: "brute", hs: 1.5, col: 0x5A6268, skin: 0x5A6268, col2: 0x2E2A26, legCol: 0x4E565C, hand: 0x4E5258,
claws: 1, tusks: 1, ears: "long", nose: 0.05, eyeCol: 0xC8D8FF, glowEyes: 1, back: 1, surf: "stone", fingers: 3, stride: 2.0 });
return p;
};
CRX_PLANS.ogre = function () {
return crxBiped({ h: 3.0, b: 1.55, hunch: 0.35, arm: 1.1, gut: 1.4, head: "brute", hs: 1.5, col: 0x8A9A5A, skin: 0x8A9A5A, col2: 0x5A4028, legCol: 0x5A4028, hand: 0x7A8A50,
tusks: 1, ears: "round", nose: 0.045, hair: 0x2A1E14, eyeCol: 0x8A6A2A, surf: "hide", fingers: 4, stride: 2.1 });
};
CRX_PLANS.oni = function () {
return crxBiped({ h: 2.8, b: 1.4, hunch: 0.25, arm: 1.1, gut: 0.4, head: "brute", hs: 1.5, col: 0x3E5EA8, skin: 0x3E5EA8, col2: 0xC7A043, legCol: 0x3E5EA8, hand: 0x3A5498,
tusks: 1, ears: "long", horns: "short", hornCol: 0xE8DCC2, hair: 0x1A1A1E, eyeCol: 0xFFD24A, glowEyes: 1, claws: 1, surf: "hide", fingers: 3, stride: 2.0 });
};
CRX_PLANS.magmabrute = function () {
return crxBiped({ h: 3.0, b: 1.5, hunch: 0.35, arm: 1.15, gut: 0.4, head: "brute", hs: 1.4, col: 0x2A2220, skin: 0x2A2220, col2: 0x3A1A10, legCol: 0x2A2220, hand: 0x3A2420,
tusks: 1, ears: false, horns: "long", hornCol: 0x1A1414, eyeCol: 0xFFA040, glowEyes: 1, claws: 1, surf: "stone", fingers: 3, stride: 2.0, matOpt: { emit: 0x5A1A06 } });
};
CRX_PLANS.demon = function () { return __ZC(497, 19, this, arguments, new.target); };
CRX_PLANS.brimfiend = function () { return __ZC(497, 20, this, arguments, new.target); };
CRX_PLANS.imp = function () { return __ZC(497, 21, this, arguments, new.target); };
CRX_PLANS.werewolf = function () {
return crxBiped({ h: 2.25, b: 1.15, hunch: 0.55, arm: 1.2, head: "wolf", hs: 1.2, col: 0x4A3E32, skin: 0x4A3E32, col2: 0x3A2E24, legCol: 0x4A3E32, hand: 0x3A302A, muzzle: 0x6A5E50, ruff: 0x5A4E40,
claws: 1, digi: 1, tail: 1, tailCol: 0x3A2E24, eyeCol: 0xE8B23A, glowEyes: 1, surf: "fur", back: 1, stride: 1.8 });
};
CRX_PLANS.minotaur = function () {
return crxBiped({ h: 2.6, b: 1.35, hunch: 0.2, arm: 1.05, head: "bull", hs: 1.15, col: 0x4A3022, skin: 0x4A3022, col2: 0x5A3A22, legCol: 0x3A261A, hand: 0x4A3022, muzzle: 0x2A1E1A,
hooves: 1, digi: 1, tail: 1, tailCol: 0x2A1A12, eyeCol: 0x3A1A10, surf: "fur", back: 1, stride: 1.9 });
};
CRX_PLANS.golem = function () { return __ZC(497, 22, this, arguments, new.target); };
CRX_PLANS.earthelemental = function () {
return crxBiped({ h: 3.4, b: 1.7, hunch: 0.35, arm: 1.25, head: "golem", hs: 0.9, col: 0x6B5A48, skin: 0x6B5A48, col2: 0x5A4A38, legCol: 0x5A4A38, hand: 0x6B5A48,
eyeCol: 0x8AE85A, surf: "stone", fingers: 3, stride: 2.2, back: 1, k: 0.03 });
};
CRX_PLANS.fireelemental = function () { return __ZC(497, 23, this, arguments, new.target); };
CRX_PLANS.yeti = function () { return __ZC(497, 24, this, arguments, new.target); };
CRX_PLANS.zombie = null;
CRX_PLANS.sentinel = function () { return __ZC(497, 25, this, arguments, new.target); };
CRX_PLANS.automaton = function () { return __ZC(497, 26, this, arguments, new.target); };
CRX_PLANS.grey = function () {
return crxBiped({ h: 1.35, b: 0.7, hunch: 0.05, arm: 1.2, head: "grey", hs: 1.25, col: 0x9AA6A0, skin: 0x9AA6A0, col2: 0x9AA6A0, legCol: 0x929E98, hand: 0x9AA6A0,
surf: "flesh", fingers: 3, stride: 1.0, runAt: 2.6, fine: 100 });
};
CRX_PLANS.selenite = function () { return __ZC(497, 27, this, arguments, new.target); };
function crxLamp(I, bone, at, col, r) {
var b = I.bones[bone];
if (!b)
return;
var m = new THREE.Mesh(CRX.lampGeo || (CRX.lampGeo = new THREE.SphereGeometry(1, 10, 8)), new THREE.MeshBasicMaterial({ color: col }));
m.scale.setScalar(r);
var o = I.at[bone];
m.position.set(at[0] - o[0], at[1] - o[1], at[2] - o[2]);
b.add(m);
}
function crxBug(p) { return __ZC(497, 28, this, arguments, new.target); }
CRX_PLANS.spider = function () { return crxBug({ kind: "spider", s: 1, col: 0x221C1A, abdCol: 0x2A2220, legCol: 0x1E1816, mark: 0x6A1E14, hair: 0x2E2622, surf: "chitin", eyeCol: 0x3A0A0A, glowEyes: 0, spots: [16, 0.75, 0x4A3A2A] }); };
CRX_PLANS.cavespider = function () { return crxBug({ kind: "spider", s: 1, col: 0x2A2632, abdCol: 0x3A3048, legCol: 0x24202C, mark: 0x8A6AE0, hair: 0x3A3444, surf: "chitin", eyeCol: 0xB08AFF, glowEyes: 1 }); };
CRX_PLANS.glassstalker = function () { return crxBug({ kind: "spider", s: 1, col: 0xB8C8E0, abdCol: 0xD8E4F4, legCol: 0xA8B8D8, mark: 0xF08AD8, surf: "chitin", eyeCol: 0xF08AD8, glowEyes: 1, legW: 0.7, hi: 0.55 }); };
CRX_PLANS.scorpion = function () { return crxBug({ kind: "scorpion", s: 1, col: 0x3A2A1E, legCol: 0x4A3626, tipCol: 0x1E140E, surf: "chitin", hi: 0.2, belly: 0x6A5440 }); };
CRX_PLANS.dustscorp = function () { return crxBug({ kind: "scorpion", s: 1, col: 0xB89A6A, legCol: 0xC8AA7A, tipCol: 0x4A3626, surf: "chitin", hi: 0.2, belly: 0xE0CCA8 }); };
CRX_PLANS.rockcrawler = function () { return crxBug({ kind: "scorpion", s: 1, col: 0x5A5048, legCol: 0x4A423C, tipCol: 0xC84A1A, surf: "stone", hi: 0.2, eyeCol: 0xFF8A3A, glowEyes: 1 }); };
CRX_PLANS.crab = function () { return crxBug({ kind: "crab", s: 1, col: 0xA8322B, legCol: 0xB84232, tipCol: 0x2A1410, surf: "chitin", hi: 0.22, belly: 0xE8C8A8 }); };
CRX_PLANS.spiderbot = function () { return __ZC(497, 29, this, arguments, new.target); };
CRX_PLANS.hullcrawler = function () { return __ZC(497, 30, this, arguments, new.target); };
function crxShade(p) { return __ZC(497, 31, this, arguments, new.target); }
CRX_PLANS.ghost = function () { return crxShade({ col: 0xDCE6F0, face: 0xE8EEF4, eyeCol: 0x8AA8D8, tint: 0x9AB8E0 }); };
CRX_PLANS.wraith = function () { return crxShade({ col: 0x2A2E38, face: 0x1A1C22, hood: 1, eyeCol: 0x9A7AE0, tint: 0x3A3060 }); };
CRX_PLANS.deepshade = function () { return crxShade({ col: 0x2A2440, face: 0x14121E, hood: 1, eyeCol: 0xB08AFF, tint: 0x5A4AA0 }); };
CRX_PLANS.hollowshade = function () { return crxShade({ col: 0x262A3A, face: 0x12141C, hood: 1, eyeCol: 0x8A9AE8, tint: 0x3A4280 }); };
CRX_PLANS.banshee = function () { return crxShade({ col: 0xDCE4F0, face: 0xE8EEF4, hair: 0xEDF2F8, eyeCol: 0xC8D8FF, tint: 0xA8B8E0 }); };
CRX_PLANS.discord = function () { return crxShade({ col: 0xB89AD8, face: 0xD8C8F0, hair: 0xE0D0F4, eyeCol: 0xF08AD8, tint: 0xC8A0F0 }); };
CRX_PLANS.acidwraith = function () { return crxShade({ col: 0xB8C84A, face: 0xD8E080, hood: 1, eyeCol: 0xE8F04A, tint: 0xA8C83A }); };
CRX_PLANS.airelemental = function () { return crxShade({ col: 0xDCE8F0, face: 0xEAF2F8, eyeCol: 0xFFFFFF, tint: 0xC8DCF0 }); };
CRX_PLANS.floatingeye = function () { return __ZC(497, 32, this, arguments, new.target); };
CRX_PLANS.martian = function () { return __ZC(497, 33, this, arguments, new.target); };
CRX_PLANS.tripod = function () { return __ZC(497, 34, this, arguments, new.target); };
var CRX_ARCH = {
unicorn: ["unicorn", 1], pegasus: ["pegasus", 1], nightmare: ["nightmare", 1], kelpie: ["kelpie", 1], griffin: ["griffin", 1.15], hippogriff: ["hippogriff", 1],
manticore: ["manticore", 1.15], chimera: ["chimera", 1.15], cerberus: ["cerberus", 2], hellhound: ["hellhound", 1.1], fenrir: ["fenrir", 3.4], kitsune: ["kitsune", 1.3],
fox: ["fox", 1], bear: ["bear", 1.1], lion: ["lion", 1], tiger: ["tiger", 1], elephant: ["elephant", 1.15], mammoth: ["mammoth", 1.3], boar: ["boar", 1], rabbit: ["rabbit", 1], rat: ["rat", 1],
wolf: ["wolf", 1], stag: ["stag", 1],
troll: ["troll", 1.1], ogre: ["ogre", 1.1], oni: ["oni", 1], demon: ["demon", 1], imp: ["imp", 1], werewolf: ["werewolf", 1], minotaur: ["minotaur", 1], golem: ["golem", 1.15],
earthelemental: ["earthelemental", 1], fireelemental: ["fireelemental", 1], robot: ["robot", 0.85], grey: ["grey", 1], alien: ["alien", 1],
ghost: ["ghost", 1], wraith: ["wraith", 1], banshee: ["banshee", 1], airelemental: ["airelemental", 1.1], floatingeye: ["floatingeye", 1],
spider: ["spider", 0.5], scorpion: ["scorpion", 0.5], crab: ["crab", 0.4], xeno: ["hullcrawler", 0.8],
martian: ["martian", 1], selenite: ["selenite", 1], tripod: ["tripod", 1], sentinel: ["sentinel", 1], spiderbot: ["spiderbot", 1], automaton: ["automaton", 1], giantrat: ["giantrat", 1]
};
CRX_PLANS.robot = function () { var p = CRX_PLANS.sentinel(); p.eyes.forEach(function (e) { e.iris = 0x6AD8FF; }); p.extras = function (I) { crxLamp(I, "chest", [0, I.at.chest[1] + 0.12, I.at.chest[2] + 0.2], 0x6AD8FF, 0.05); }; return p; };
CRX_PLANS.alien = function () { return crxBiped({ h: 1.75, b: 0.72, hunch: 0.05, arm: 1.2, head: "grey", hs: 1.15, col: 0x7AA890, skin: 0x7AA890, col2: 0x3A5A6A, legCol: 0x3A5A6A, hand: 0x7AA890, surf: "flesh", fingers: 3, stride: 1.2, fine: 100 }); };
function crxMake(key, f, o) {
var c = crxBuild(key);
if (!c)
return null;
var g = new THREE.Group();
g.name = "crxc_" + key;
g.add(c);
c.scale.multiplyScalar(f || 1);
try {
if (o && !o.big && typeof contactShadow === "function" && CRX_PLAN[key].anim !== "float" && CRX_PLAN[key].anim !== "tripod")
g.add(contactShadow(0.7 * (f || 1) * (CRX_PLAN[key].anim === "spider" ? 1.6 : 1)));
}
catch (e) { }
try {
if (o && typeof addAura === "function") {
var au = featVal(o, "aura");
if (au)
addAura(g, au[0]);
if (hasFeat(o, "glow") && o.kind !== "beast")
addAura(g, "glow");
}
}
catch (e) { }
g.userData.crxAct = c.userData.crxAct;
g.userData.crx = c.userData.crx;
g.userData.anim = function () { };
return g;
}
var crxOldBuildCreature = typeof buildCreature === "function" ? buildCreature : null;
if (crxOldBuildCreature)
buildCreature = function (spec, f) { return __ZC(497, 35, this, arguments, new.target); };
(function () {
if (typeof C !== "function" || typeof CREATURE === "undefined")
return;
var add = function (k, w, kind, o) { if (CREATURE[k])
return; try {
C(k, w, kind, o);
}
catch (e) { } };
add("wolf", ["wolf", "wolves", "grey wolf", "timber wolf", "pack of wolves"], "beast", { col: 0x6E655A, head: "dog", roam: 1, night: 1 });
add("stag", ["stag", "deer", "red deer", "hart"], "beast", { col: 0x8A5A34, head: "horse", roam: 1 });
add("martian", ["martian", "martians", "a martian", "the martians", "a thing from mars"], "float", { col: 0x7A7470, night: 1, realm: "stars" });
add("selenite", ["selenite", "selenites", "moon man", "man in the moon", "moon people"], "folk", { skin: 0x7A6A52, top: 0x7A6A52, realm: "stars" });
add("tripod", ["tripod", "fighting machine", "fighting-machine", "martian machine", "war machine on three legs", "heat-ray"], "float", { col: 0x9AA0A8, big: 1, night: 1 });
add("sentinel", ["sentinel", "sentinel robot", "security robot", "war robot", "killer robot"], "folk", { skin: 0x8A949E, top: 0x8A949E, night: 1 });
add("spiderbot", ["spider robot", "robot spider", "spider-bot", "spiderbot", "mechanical spider", "scuttler"], "crawl", { col: 0x5A626C, body: "spider", night: 1 });
add("automaton", ["clockwork man", "brass man", "clockwork robot", "brass automaton", "steam man", "tin man"], "folk", { skin: 0xB8883A, top: 0xB8883A });
add("giantrat", ["giant rat", "giant rats", "rat the size of a dog", "sewer rat"], "beast", { col: 0x4A423C, head: "rat", night: 1, roam: 1 });
try {
if (MORE_VOCAB.xeno)
MORE_VOCAB.xeno = MORE_VOCAB.xeno.filter(function (w) { return !/xenomorph|creature from the ship/.test(w); }).concat(["hull crawler", "hull-crawler", "crawling alien"]);
}
catch (e) { }
})();
var CRX_KIND_PLAN = { cavespider: "cavespider", glassstalker: "glassstalker", mirespider: "spider", rockcrawler: "rockcrawler", brimcrawler: "scorpion", dustscorp: "dustscorp", canyonscorp: "dustscorp",
deeptroll: "deeptroll", slaggolem: "ogre", magmagolem: "magmabrute", brimfiend: "brimfiend", emberhound: "hellhound", ashhound: "hellhound", cinderimp: "imp", kilnimp: "imp",
deepshade: "deepshade", hollowshade: "hollowshade", discord: "discord", acidwraith: "acidwraith", watcher: "floatingeye", faceless: null,
sunwisp: "fireelemental", emberel: "fireelemental", lavawisp: "fireelemental", snowbear: "snowbear", wildbear: "bear", wildboar: "boar", scavhog: "boar", werewolf: "werewolf", rimeyeti: "yeti" };
var CRX_KIND_SIZE = { sunwisp: 0.6, lavawisp: 0.6, emberel: 1, slaggolem: 1.05, scavhog: 1.45, wildboar: 1.3, rockcrawler: 0.5, brimcrawler: 0.45, dustscorp: 0.5, canyonscorp: 0.5, cavespider: 0.5, mirespider: 0.55, glassstalker: 0.5 };
var CRX_NEW_KINDS = {
sentinel: { name: "Rogue sentinel", body: "crx", plan: "sentinel", hp: 130, spd: 3.2, dmg: 13, reach: 2.4, big: 1, shot: { r: 18, c: 0xFF4A3A }, spoil: ["Sentinel's cracked red lens", "🔴"], growl: 90 },
spiderbot: { name: "Scuttler", body: "crx", plan: "spiderbot", scale: 0.7, hp: 60, spd: 5.2, dmg: 8, reach: 2.4, spoil: ["Scuttler's leg servo", "⚙️"], growl: 700 },
chromeraider: { name: "Chrome raider", body: "person", cyborg: 1, arm: "cutlass", hp: 70, spd: 3.9, dmg: 10, reach: 2.1,
look: { layer: "longcoat", layerColor: 0x2A2E34, top: 0x3A3E44, bottom: 0x22262A, shoes: 0x16181A }, spoil: ["Raider's chrome knuckle", "🦾"], growl: 250 },
automaton: { name: "Runaway brass automaton", body: "crx", plan: "automaton", hp: 150, spd: 2.6, dmg: 14, reach: 2.3, big: 1, spoil: ["Automaton's mainspring", "🌀"], growl: 120 },
martian: { name: "Martian", body: "crx", plan: "martian", hp: 95, spd: 1.9, dmg: 11, reach: 2.6, spoil: ["A Martian's tentacle-tip", "🐙"], growl: 70 },
tripod: { name: "Martian fighting-machine", body: "crx", plan: "tripod", scale: 0.75, hp: 420, spd: 2.4, dmg: 22, reach: 5, big: 1, shot: { r: 30, c: 0xFFE8A0 }, spoil: ["A heat-ray's cracked lens", "🔆"], growl: 60 },
selenite: { name: "Selenite of the Moon", body: "crx", plan: "selenite", hp: 50, spd: 4.0, dmg: 8, reach: 2, spoil: ["Selenite's goad", "🔱"], growl: 520 },
greywatcher: { name: "Little grey", body: "crx", plan: "grey", hp: 40, spd: 3.4, dmg: 7, reach: 1.8, shot: { r: 15, c: 0x8AFFB0 }, spoil: ["A grey's humming probe", "🛸"], growl: 640 },
hullcrawler: { name: "Hull crawler", body: "crx", plan: "hullcrawler", scale: 0.8, hp: 75, spd: 5.0, dmg: 10, reach: 2.6, spoil: ["Hull crawler's spine", "🦴"], growl: 160 },
timberwolf: { name: "Timber wolf", body: "crx", plan: "wolf", hp: 60, spd: 6.0, dmg: 9, reach: 2.0, spoil: ["Wolf's fang", "🐺"], growl: 200 },
giantrat: { name: "Giant rat", body: "crx", plan: "giantrat", hp: 35, spd: 5.0, dmg: 6, reach: 1.7, spoil: ["Rat's yellow tooth", "🐀"], growl: 900 },
hilltroll: { name: "Hill troll", body: "crx", plan: "troll", hp: 170, spd: 2.9, dmg: 16, reach: 2.8, big: 1, spoil: ["Troll's knuckle-bone", "🦴"], growl: 100 },
ghost: { name: "Restless ghost", body: "crx", plan: "ghost", hp: 45, spd: 3.4, dmg: 8, reach: 2, shot: { r: 13, c: 0xA8C8FF }, spoil: ["A cold breath, kept in glass", "👻"], growl: 440 },
stonegolem: { name: "Stone golem", body: "crx", plan: "golem", scale: 0.8, hp: 200, spd: 2.2, dmg: 18, reach: 2.8, big: 1, spoil: ["Golem's rune-stone", "🪨"], growl: 80 },
minotaur: { name: "The bull of the maze", body: "crx", plan: "minotaur", hp: 220, spd: 3.6, dmg: 18, reach: 2.6, big: 1, spoil: ["The bull's broken horn", "🐂"], growl: 90 }
};
var CRX_NEW_WHERE = {
wasteland: ["chromeraider", "spiderbot"], future: ["sentinel", "spiderbot", "chromeraider", "sentinel"], mars: ["martian", "martian", "tripod", "martian"],
moon: ["selenite", "selenite", "greywatcher"], space: ["hullcrawler", "greywatcher", "hullcrawler"], mmin: ["automaton", "spiderbot", "automaton"],
underground: ["giantrat", "giantrat", "ghost"], dead: ["ghost", "ghost", "wraith"], frozen: ["timberwolf", "timberwolf", "rimeyeti"], other: ["timberwolf", "hilltroll"],
veyar: ["greywatcher"], desert: ["dustscorp", "martian"], faerie: ["timberwolf", "hilltroll"], elsewhere: ["stonegolem", "timberwolf"], stars: ["greywatcher", "hullcrawler"],
underdark: ["stonegolem"]
};
var CRX_NEW_DUNGEON = { belfry: ["ghost"], barrow: ["ghost"], foundry: ["automaton", "spiderbot"], silk: ["giantrat"] };
(function () {
if (typeof DGB_KINDS === "undefined")
return;
Object.keys(CRX_NEW_KINDS).forEach(function (k) { if (!DGB_KINDS[k])
DGB_KINDS[k] = CRX_NEW_KINDS[k]; });
if (!DGB_KINDS.wraith)
DGB_KINDS.wraith = { name: "Wraith", body: "crx", plan: "wraith", hp: 55, spd: 3.6, dmg: 10, reach: 2, spoil: ["A wraith's tatter", "🌑"], growl: 150 };
Object.keys(DGB_KINDS).forEach(function (k) { DGB_KINDS[k].key = DGB_KINDS[k].key || k; });
if (typeof DGB_WHERE !== "undefined")
Object.keys(CRX_NEW_WHERE).forEach(function (w) {
var have = DGB_WHERE[w];
DGB_WHERE[w] = (have || []).concat(CRX_NEW_WHERE[w]).filter(function (k) { return !!DGB_KINDS[k]; });
});
if (typeof SGA_DUNGEONS !== "undefined")
Object.keys(CRX_NEW_DUNGEON).forEach(function (d) {
var D = SGA_DUNGEONS[d];
if (!D)
return;
CRX_NEW_DUNGEON[d].forEach(function (k) { if (D.mobs.indexOf(k) < 0 && DGB_KINDS[k])
D.mobs.push(k); });
});
})();
function crxPlanOfKind(K) {
if (!K)
return null;
var key = K.body === "crx" ? K.plan : (K.key && CRX_KIND_PLAN[K.key] !== undefined ? CRX_KIND_PLAN[K.key] : null);
if (!key && K.body === "kit" && K.arch && CRX_ARCH[K.arch])
key = CRX_ARCH[K.arch][0];
return key;
}
setInterval(function () {
if (!crxOn() || typeof DGB_KINDS === "undefined")
return;
try {
var list = [];
if (typeof SGA !== "undefined" && SGA.delve && typeof SGA_DUNGEONS !== "undefined") {
var D = SGA_DUNGEONS[SGA.delve.d];
if (D)
list = D.mobs.concat([D.boss.kind]);
}
else if (typeof dgbLevel === "function" && dgbLevel() >= 3 && typeof dgbList === "function")
list = dgbList();
if (list.length)
crxWarm(list.map(function (k) { return crxPlanOfKind(DGB_KINDS[k]); }));
}
catch (e) { }
}, 4000);
var crxOldDgbBody = typeof dgbBody === "function" ? dgbBody : null;
if (crxOldDgbBody)
dgbBody = function (K, seed) { return __ZC(497, 36, this, arguments, new.target); };
function crxActOn(g, what) { try {
if (g && g.userData && g.userData.crxAct)
g.userData.crxAct(what);
}
catch (e) { } }
(function () {
var wrap = function (n, f) { var old = window[n]; if (typeof old !== "function")
return; window[n] = function () { var r = old.apply(this, arguments); try {
f.apply(this, arguments);
}
catch (e) { } return r; }; };
wrap("dgbBlow", function (B) { if (B && B.cool > 1)
crxActOn(B.g, "strike"); });
wrap("dgbThrow", function (B) { crxActOn(B && B.g, "strike"); });
wrap("dgbStrike", function (B) { crxActOn(B && B.g, "hurt"); });
wrap("dgbSpellHit", function (B) { crxActOn(B && B.g, "hurt"); });
wrap("sgaDlvDamage", function (M) { crxActOn(M && M.g, "hurt"); });
wrap("sgaVigHurt", function (d, name) {
var S = typeof SGA !== "undefined" && SGA.delve;
if (!S)
return;
var best = null, bd = 1e9, P = camera.position;
(S.mobs || []).concat(S.boss ? [S.boss] : []).forEach(function (M) { if (!M.g || !(M.K && M.K.name === name || (S.boss === M)))
return; var w = new THREE.Vector3(); M.g.getWorldPosition(w); var dd = w.distanceTo(P); if (dd < bd) {
bd = dd;
best = M;
} });
if (best)
crxActOn(best.g, "strike");
});
})();
function crxCyborg(g) { return __ZC(497, 37, this, arguments, new.target); }
function crxDrop(o) { setTimeout(function () { if (o.parent)
o.parent.remove(o); }, 0); }
function crxCyborgFit(g) { return __ZC(497, 38, this, arguments, new.target); }
function crxRigid(M) { if (M.userData.rigid)
return M.userData.rigid; var R = M.clone(); R.skinning = false; R.vertexColors = false; R.color = new THREE.Color(0x9AA2AC); R.onBeforeCompile = function () { }; R.customProgramCacheKey = function () { return "crx-rigid"; }; M.userData.rigid = R; return R; }
CRX_PLANS.dog = function () {
return crxQuad({ L: 0.5, H: 0.46, G: 0.17, W: 0.85, legR: 0.034, head: "dog", hs: 0.85, col: 0x8A5E36, belly: 0xEDE2D0, back: 0x5A3C22, muzzle: 0xE8DCC8,
tail: { l: 0.38, r: 0.035, up: 0.5, tip: 0xEDE2D0 }, neck: { l: 0.22, up: 0.65 }, eyeCol: 0x4A2A12, stride: 0.95, runAt: 2.8, surf: "fur" });
};
CRX_PLANS.cat = function () {
return crxQuad({ L: 0.3, H: 0.24, G: 0.1, W: 0.85, legR: 0.02, head: "cat", hs: 0.5, col: 0x5A5048, belly: 0xD8D0C4, back: 0x3A342E, muzzle: 0xE8E0D4,
stripes: [14, 0.45, 0x2A2420], tail: { l: 0.36, r: 0.022, up: 0.9, tip: 0x2A2420 }, neck: { l: 0.1, up: 0.5 }, eyeCol: 0x8AB83A, stride: 0.6, runAt: 2.2, surf: "fur" });
};
CRX_PLANS.cow = function () { return __ZC(497, 39, this, arguments, new.target); };
CRX_PLANS.sheep = function () { return __ZC(497, 40, this, arguments, new.target); };
CRX_PLANS.pig = function () {
return crxQuad({ L: 0.62, H: 0.4, G: 0.3, W: 0.82, legR: 0.04, head: "boar", hs: 1.0, col: 0xE8B4A4, back: 0xF0C0B0, belly: 0xE0A898, foot: "hoof", footCol: 0x6A4A40,
tail: { l: 0.14, r: 0.02, up: 0.6, col: 0xE8B4A4 }, neck: { l: 0.1, up: 0.1 }, neckR0: 0.9, neckR1: 0.75, eyeCol: 0x2A1A12, stride: 0.8, runAt: 2.4, surf: "flesh" });
};
CRX_PLANS.goat = function () { return __ZC(497, 41, this, arguments, new.target); };
CRX_PLANS.camel = function () { return __ZC(497, 42, this, arguments, new.target); };
(function () {
if (typeof CRX_ARCH === "undefined")
return;
[["cow", 1], ["sheep", 1], ["pig", 1], ["goat", 1], ["camel", 1], ["horse", 1], ["dog", 1], ["cat", 1]].forEach(function (k) { if (!CRX_ARCH[k[0]])
CRX_ARCH[k[0]] = [k[0], k[1]]; });
})();
var CRX_KIT = { dog: ["dog", 1], cat: ["cat", 1], horse: ["horse", 1] };
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var m = spec && CRX_KIT[spec.archetype];
if (m && crxOn())
try {
var g = crxMake(m[0], m[1], null);
if (g) {
var a = spec.attrs || {}, s = a.s || 1;
g.scale.multiplyScalar(s);
g.userData.id = spec.id;
if (typeof shadowsFor === "function")
shadowsFor(g, true);
return g;
}
}
catch (e) {
if (window.CRX_DEBUG)
console.warn("[creature-real] kit", e);
}
return b0.apply(this, arguments);
};
})();
var G3D_J = { "alien-grey-lite": { "joints": { "hips": [0, 0.605, 0.008], "spine": [0, 0.786, 0.009], "chest": [0, 0.997, -0.015], "neck": [0, 1.209, 0.033], "head": [0, 1.241, 0.035], "L_arm": [0.13, 1.144, 0.032], "L_fore": [0.118, 0.715, -0.019], "L_hand": [0.108, 0.358, -0.013], "R_arm": [-0.13, 1.144, 0.032], "R_fore": [-0.118, 0.724, -0.021], "R_hand": [-0.107, 0.374, -0.017], "L_thigh": [0.065, 0.54, 0.011], "L_shin": [0.076, 0.276, -0.036], "L_foot": [0.092, 0.091, -0.019], "R_thigh": [-0.065, 0.54, 0.005], "R_shin": [-0.07, 0.276, -0.04], "R_foot": [-0.093, 0.091, -0.02] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "alien-grey-pc": { "joints": { "hips": [0, 0.579, 0.005], "spine": [0, 0.723, 0.021], "chest": [0, 0.891, -0.027], "neck": [0, 1.059, -0.018], "head": [0, 1.144, 0.035], "L_arm": [0.13, 0.994, -0.014], "L_fore": [0.121, 0.633, -0.049], "L_hand": [0.113, 0.332, -0.03], "R_arm": [-0.13, 0.994, -0.014], "R_fore": [-0.119, 0.632, -0.048], "R_hand": [-0.111, 0.331, -0.03], "L_thigh": [0.066, 0.514, 0.007], "L_shin": [0.079, 0.263, -0.031], "L_foot": [0.092, 0.091, -0.022], "R_thigh": [-0.062, 0.514, 0.003], "R_shin": [-0.088, 0.263, -0.034], "R_foot": [-0.094, 0.091, -0.023] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "bear-lite": { "joints": { "hips": [0, 0.725, -0.677], "chest": [0, 0.843, -0.016], "neck": [0, 1.124, 0.165], "head": [0, 0.907, 0.67], "L_fu": [0.221, 0.442, 0.132], "L_fl": [0.221, 0.199, 0.092], "R_fu": [-0.28, 0.442, 0.118], "R_fl": [-0.28, 0.199, 0.078], "L_bu": [0.27, 0.483, -0.808], "L_bl": [0.27, 0.217, -0.748], "R_bu": [-0.191, 0.483, -0.83], "R_bl": [-0.191, 0.217, -0.77] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "bear-pc": { "joints": { "hips": [0, 0.77, -0.677], "chest": [0, 0.871, -0.018], "neck": [0, 1.133, 0.164], "head": [0, 0.91, 0.672], "L_fu": [0.221, 0.496, 0.135], "L_fl": [0.221, 0.223, 0.095], "R_fu": [-0.284, 0.496, 0.113], "R_fl": [-0.284, 0.223, 0.073], "L_bu": [0.268, 0.551, -0.804], "L_bl": [0.268, 0.248, -0.744], "R_bu": [-0.197, 0.551, -0.832], "R_bl": [-0.197, 0.248, -0.772] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "bull-lite": { "joints": { "hips": [0, 0.561, -0.627], "chest": [0, 0.644, 0.065], "neck": [0, 0.899, 0.254], "head": [0, 0.832, 0.706], "L_fu": [0.1, 0.279, 0.218], "L_fl": [0.1, 0.126, 0.178], "R_fu": [-0.248, 0.279, 0.21], "R_fl": [-0.248, 0.126, 0.17], "L_bu": [0.19, 0.279, -0.788], "L_bl": [0.19, 0.126, -0.728], "R_bu": [-0.127, 0.279, -0.764], "R_bl": [-0.127, 0.126, -0.704] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "bull-pc": { "joints": { "hips": [0, 0.559, -0.627], "chest": [0, 0.643, 0.065], "neck": [0, 0.898, 0.253], "head": [0, 0.823, 0.708], "L_fu": [0.099, 0.279, 0.216], "L_fl": [0.099, 0.126, 0.176], "R_fu": [-0.247, 0.279, 0.211], "R_fl": [-0.247, 0.126, 0.171], "L_bu": [0.187, 0.279, -0.784], "L_bl": [0.187, 0.126, -0.724], "R_bu": [-0.127, 0.279, -0.766], "R_bl": [-0.127, 0.126, -0.706] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "cat-lite": { "joints": { "hips": [0, 1.518, -0.432], "chest": [0, 1.044, 0.3], "neck": [0, 1.433, 0.497], "head": [0, 1.324, 0.755], "L_fu": [0.078, 0.488, 0.446], "L_fl": [0.078, 0.22, 0.406], "R_fu": [-0.275, 0.488, 0.467], "R_fl": [-0.275, 0.22, 0.427], "L_bu": [0.163, 1.091, -0.621], "L_bl": [0.163, 0.491, -0.561], "R_bu": [-0.24, 1.091, -0.556], "R_bl": [-0.24, 0.491, -0.496], "tail1": [0, 1.62, -0.828], "tail2": [0.055, 1.631, -0.886], "tail3": [0, 1.643, -0.943] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "cat-pc": { "joints": { "hips": [0, 1.517, -0.427], "chest": [0, 1.06, 0.301], "neck": [0, 1.462, 0.498], "head": [0, 1.308, 0.751], "L_fu": [0.089, 0.486, 0.447], "L_fl": [0.089, 0.219, 0.407], "R_fu": [-0.263, 0.486, 0.468], "R_fl": [-0.263, 0.219, 0.428], "L_bu": [0.163, 1.086, -0.618], "L_bl": [0.163, 0.489, -0.558], "R_bu": [-0.236, 1.086, -0.549], "R_bl": [-0.236, 0.489, -0.489], "tail1": [0, 1.619, -0.823], "tail2": [0.052, 1.629, -0.882], "tail3": [0, 1.64, -0.941] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "cheetah-lite": { "joints": { "hips": [0, 0.756, -0.464], "chest": [0, 0.828, 0.16], "neck": [0, 0.949, 0.334], "head": [0, 0.926, 0.729], "L_fu": [0.179, 0.656, -0.153], "L_fl": [0.179, 0.295, -0.193], "R_fu": [-0.007, 0.656, 0.742], "R_fl": [-0.007, 0.295, 0.702], "L_bu": [-0.058, 0.697, -0.828], "L_bl": [-0.058, 0.314, -0.768], "R_bu": [-0.118, 0.697, -0.368], "R_bl": [-0.118, 0.314, -0.308], "tail1": [0, 0.162, -0.838], "tail2": [-0.03, 0.17, -0.891], "tail3": [0, 0.179, -0.944] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "cheetah-pc": { "joints": { "hips": [0, 0.75, -0.466], "chest": [0, 0.909, 0.159], "neck": [0, 0.971, 0.333], "head": [0, 0.883, 0.725], "L_fu": [0.18, 0.82, -0.155], "L_fl": [0.18, 0.369, -0.195], "R_fu": [-0.005, 0.82, 0.741], "R_fl": [-0.005, 0.369, 0.701], "L_bu": [-0.059, 0.695, -0.833], "L_bl": [-0.059, 0.313, -0.773], "R_bu": [-0.121, 0.695, -0.366], "R_bl": [-0.121, 0.313, -0.306], "tail1": [0, 0.155, -0.84], "tail2": [-0.029, 0.164, -0.891], "tail3": [0, 0.174, -0.942] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "cow-lite": { "joints": { "hips": [0, 0.695, -0.528], "chest": [0, 0.702, 0.081], "neck": [0, 0.939, 0.252], "head": [0, 0.999, 0.709], "L_fu": [0.038, 0.364, 0.225], "L_fl": [0.038, 0.164, 0.185], "R_fu": [-0.199, 0.364, 0.199], "R_fl": [-0.199, 0.164, 0.159], "L_bu": [0.152, 0.364, -0.669], "L_bl": [0.152, 0.164, -0.609], "R_bu": [-0.129, 0.364, -0.648], "R_bl": [-0.129, 0.164, -0.588], "tail1": [0, 0.39, -0.898], "tail2": [0.016, 0.38, -0.932], "tail3": [0, 0.369, -0.965] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "cow-pc": { "joints": { "hips": [0, 0.695, -0.531], "chest": [0, 0.701, 0.076], "neck": [0, 0.938, 0.246], "head": [0, 0.998, 0.705], "L_fu": [0.038, 0.363, 0.219], "L_fl": [0.038, 0.163, 0.179], "R_fu": [-0.197, 0.363, 0.193], "R_fl": [-0.197, 0.163, 0.153], "L_bu": [0.152, 0.363, -0.67], "L_bl": [0.152, 0.163, -0.61], "R_bu": [-0.127, 0.363, -0.651], "R_bl": [-0.127, 0.163, -0.591], "tail1": [0, 0.396, -0.901], "tail2": [0.017, 0.384, -0.934], "tail3": [0, 0.371, -0.968] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "crocodile-lite": { "joints": { "hips": [0, 0.155, -0.048], "chest": [0, 0.172, 0.423], "neck": [0, 0.201, 0.564], "head": [0, 0.074, 0.68], "L_fu": [0.129, 0.132, 0.519], "L_fl": [0.129, 0.059, 0.479], "R_fu": [-0.109, 0.132, 0.53], "R_fl": [-0.109, 0.059, 0.49], "L_bu": [0.112, 0.132, -0.275], "L_bl": [0.112, 0.059, -0.215], "R_bu": [-0.129, 0.132, -0.024], "R_bl": [-0.129, 0.059, 0.036], "tail1": [0, 0.094, -0.39], "tail2": [0.034, 0.074, -0.576], "tail3": [0, 0.054, -0.761] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "crocodile-pc": { "joints": { "hips": [0, 0.157, -0.044], "chest": [0, 0.173, 0.443], "neck": [0, 0.201, 0.587], "head": [0, 0.075, 0.679], "L_fu": [0.147, 0.132, 0.543], "L_fl": [0.147, 0.059, 0.503], "R_fu": [-0.128, 0.132, 0.551], "R_fl": [-0.128, 0.059, 0.511], "L_bu": [0.114, 0.132, -0.286], "L_bl": [0.114, 0.059, -0.226], "R_bu": [-0.152, 0.132, -0.01], "R_bl": [-0.152, 0.059, 0.05], "tail1": [0, 0.102, -0.388], "tail2": [0.033, 0.078, -0.574], "tail3": [0, 0.055, -0.76] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "deer-lite": { "joints": { "hips": [0, 1.161, -0.66], "chest": [0, 1.382, 0.05], "neck": [0, 1.875, 0.242], "head": [0, 1.67, 0.65], "L_fu": [0.207, 0.677, 0.198], "L_fl": [0.207, 0.305, 0.158], "R_fu": [-0.142, 0.677, 0.205], "R_fl": [-0.142, 0.305, 0.165], "L_bu": [0.194, 1.032, -0.749], "L_bl": [0.194, 0.464, -0.689], "R_bu": [-0.17, 1.032, -0.875], "R_bl": [-0.17, 0.464, -0.815] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "deer-pc": { "joints": { "hips": [0, 1.074, -0.66], "chest": [0, 1.376, 0.049], "neck": [0, 1.868, 0.241], "head": [0, 1.66, 0.654], "L_fu": [0.207, 0.674, 0.197], "L_fl": [0.207, 0.303, 0.157], "R_fu": [-0.14, 0.674, 0.205], "R_fl": [-0.14, 0.303, 0.165], "L_bu": [0.192, 0.863, -0.747], "L_bl": [0.192, 0.388, -0.687], "R_bu": [-0.172, 0.863, -0.877], "R_bl": [-0.172, 0.388, -0.817] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "dog-lite": { "joints": { "hips": [0, 0.726, -0.436], "chest": [0, 1.002, 0.287], "neck": [0, 1.277, 0.482], "head": [0, 1.275, 0.693], "L_fu": [0.188, 0.61, 0.454], "L_fl": [0.188, 0.274, 0.414], "R_fu": [-0.125, 0.61, 0.431], "R_fl": [-0.125, 0.274, 0.391], "L_bu": [0.195, 0.42, -0.573], "L_bl": [0.195, 0.189, -0.513], "R_bu": [-0.188, 0.42, -0.611], "R_bl": [-0.188, 0.189, -0.551], "tail1": [0, 0.518, -0.832], "tail2": [-0.06, 0.51, -0.882], "tail3": [0, 0.502, -0.933] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "dog-pc": { "joints": { "hips": [0, 0.735, -0.438], "chest": [0, 1.002, 0.286], "neck": [0, 1.278, 0.481], "head": [0, 1.266, 0.691], "L_fu": [0.19, 0.608, 0.454], "L_fl": [0.19, 0.273, 0.414], "R_fu": [-0.124, 0.608, 0.428], "R_fl": [-0.124, 0.273, 0.388], "L_bu": [0.193, 0.45, -0.576], "L_bl": [0.193, 0.203, -0.516], "R_bu": [-0.19, 0.45, -0.61], "R_bl": [-0.19, 0.203, -0.55], "tail1": [0, 0.505, -0.833], "tail2": [-0.06, 0.501, -0.883], "tail3": [0, 0.497, -0.934] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "elephant-lite": { "joints": { "hips": [0, 0.783, -0.552], "chest": [0, 0.678, 0.174], "neck": [0, 1.069, 0.37], "head": [0, 0.67, 0.693], "L_fu": [0.116, 0.118, 0.335], "L_fl": [0.116, 0.053, 0.295], "R_fu": [-0.129, 0.118, 0.325], "R_fl": [-0.129, 0.053, 0.285], "L_bu": [0.132, 0.421, -0.705], "L_bl": [0.132, 0.19, -0.645], "R_bu": [-0.117, 0.421, -0.71], "R_bl": [-0.117, 0.19, -0.65] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "elephant-pc": { "joints": { "hips": [0, 0.793, -0.55], "chest": [0, 0.673, 0.158], "neck": [0, 1.064, 0.35], "head": [0, 0.665, 0.696], "L_fu": [0.12, 0.115, 0.317], "L_fl": [0.12, 0.052, 0.277], "R_fu": [-0.133, 0.115, 0.304], "R_fl": [-0.133, 0.052, 0.264], "L_bu": [0.13, 0.437, -0.703], "L_bl": [0.13, 0.197, -0.643], "R_bu": [-0.125, 0.437, -0.701], "R_bl": [-0.125, 0.197, -0.641], "tail1": [0, 0.484, -0.942], "tail2": [-0.005, 0.435, -0.961], "tail3": [0, 0.386, -0.98] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "fox-lite": { "joints": { "hips": [0, 0.595, -0.816], "chest": [0, 0.844, -0.527], "neck": [0, 0.923, -0.425], "head": [0, 1.005, 0.711], "L_fu": [0.042, 0.731, -0.422], "L_fl": [0.042, 0.329, -0.462], "R_fu": [-0.128, 0.731, -0.507], "R_fl": [-0.128, 0.329, -0.547], "L_bu": [-0.025, 0.731, -0.867], "L_bl": [-0.025, 0.329, -0.807], "R_bu": [-0.137, 0.731, -0.889], "R_bl": [-0.137, 0.329, -0.829] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "fox-pc": { "joints": { "hips": [0, 0.621, -0.789], "chest": [0, 0.862, -0.453], "neck": [0, 0.953, -0.341], "head": [0, 0.996, 0.707], "L_fu": [0.057, 0.731, -0.322], "L_fl": [0.057, 0.329, -0.362], "R_fu": [-0.127, 0.731, -0.44], "R_fl": [-0.127, 0.329, -0.48], "L_bu": [-0.024, 0.731, -0.849], "L_bl": [-0.024, 0.329, -0.789], "R_bu": [-0.141, 0.731, -0.873], "R_bl": [-0.141, 0.329, -0.813] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "giraffe-lite": { "joints": { "hips": [0, 1.124, -0.524], "chest": [0, 1.548, 0.024], "neck": [0, 2.093, 0.181], "head": [0, 2.775, 0.704], "L_fu": [0.205, 0.77, 0.144], "L_fl": [0.205, 0.347, 0.104], "R_fu": [-0.195, 0.77, 0.138], "R_fl": [-0.195, 0.347, 0.098], "L_bu": [0.168, 0.607, -0.647], "L_bl": [0.168, 0.273, -0.587], "R_bu": [-0.177, 0.607, -0.635], "R_bl": [-0.177, 0.273, -0.575], "tail1": [0, 0.695, -0.881], "tail2": [0.001, 0.68, -0.92], "tail3": [0, 0.664, -0.958] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "giraffe-pc": { "joints": { "hips": [0, 1.118, -0.526], "chest": [0, 1.526, 0.02], "neck": [0, 2.08, 0.177], "head": [0, 2.761, 0.699], "L_fu": [0.202, 0.735, 0.14], "L_fl": [0.202, 0.331, 0.1], "R_fu": [-0.194, 0.735, 0.134], "R_fl": [-0.194, 0.331, 0.094], "L_bu": [0.166, 0.605, -0.647], "L_bl": [0.166, 0.272, -0.587], "R_bu": [-0.173, 0.605, -0.639], "R_bl": [-0.173, 0.272, -0.579], "tail1": [0, 0.679, -0.883], "tail2": [0.001, 0.672, -0.921], "tail3": [0, 0.664, -0.959] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "goblin-lite": { "joints": { "hips": [0, 0.42, -0.015], "spine": [0, 0.569, -0.001], "chest": [0, 0.744, 0.026], "neck": [0, 0.918, -0.021], "head": [0, 1.017, -0.002], "L_arm": [0.163, 0.858, 0.015], "L_fore": [0.181, 0.63, -0.007], "L_hand": [0.196, 0.44, 0.019], "R_arm": [-0.163, 0.858, 0.015], "R_fore": [-0.181, 0.628, -0.009], "R_hand": [-0.196, 0.437, 0.014], "L_thigh": [0.095, 0.36, 0.001], "L_shin": [0.11, 0.186, -0.039], "L_foot": [0.137, 0.084, -0.011], "R_thigh": [-0.089, 0.36, -0.012], "R_shin": [-0.118, 0.186, -0.044], "R_foot": [-0.139, 0.084, -0.001] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "goblin-pc": { "joints": { "hips": [0, 0.42, -0.011], "spine": [0, 0.58, -0.005], "chest": [0, 0.767, 0.014], "neck": [0, 0.954, -0.018], "head": [0, 1.04, -0.003], "L_arm": [0.17, 0.894, -0.021], "L_fore": [0.183, 0.645, -0.023], "L_hand": [0.193, 0.438, 0.019], "R_arm": [-0.17, 0.894, -0.021], "R_fore": [-0.185, 0.644, -0.027], "R_hand": [-0.196, 0.435, 0.012], "L_thigh": [0.092, 0.36, 0.003], "L_shin": [0.11, 0.186, -0.038], "L_foot": [0.133, 0.084, -0.017], "R_thigh": [-0.091, 0.36, -0.009], "R_shin": [-0.119, 0.186, -0.041], "R_foot": [-0.135, 0.084, -0.006] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "griffin-lite": { "joints": { "hips": [0, 1.112, -0.41], "chest": [0, 1.151, 0.04], "neck": [0, 1.385, 0.177], "head": [0, 0.838, 0.696], "L_fu": [0.371, 0.817, -0.035], "L_fl": [0.371, 0.368, -0.075], "R_fu": [0.098, 0.817, 0.309], "R_fl": [0.098, 0.368, 0.269], "L_bu": [-0.465, 0.817, -0.154], "L_bl": [-0.465, 0.368, -0.094], "R_bu": [-0.702, 0.817, -0.858], "R_bl": [-0.702, 0.368, -0.798], "tail1": [0, 0.708, -0.746], "tail2": [-0.185, 0.587, -0.823], "tail3": [0, 0.466, -0.9] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "griffin-pc": { "joints": { "hips": [0, 1.101, -0.272], "chest": [0, 1.138, 0.064], "neck": [0, 1.369, 0.176], "head": [0, 0.817, 0.692], "L_fu": [0.372, 0.808, -0.033], "L_fl": [0.372, 0.363, -0.073], "R_fu": [0.102, 0.808, 0.304], "R_fl": [0.102, 0.363, 0.264], "L_bu": [-0.222, 0.808, -0.531], "L_bl": [-0.222, 0.363, -0.471], "R_bu": [-0.454, 0.808, -0.156], "R_bl": [-0.454, 0.363, -0.096], "tail1": [0, 0.876, -0.584], "tail2": [-0.188, 0.694, -0.712], "tail3": [0, 0.513, -0.839] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "hippo-lite": { "joints": { "hips": [0, 0.688, -0.668], "chest": [0, 0.695, 0.025], "neck": [0, 0.849, 0.214], "head": [0, 0.793, 0.733], "L_fu": [0.21, 0.474, 0.059], "L_fl": [0.21, 0.213, 0.019], "R_fu": [-0.167, 0.474, 0.29], "R_fl": [-0.167, 0.213, 0.25], "L_bu": [0.135, 0.59, -0.914], "L_bl": [0.135, 0.265, -0.854], "R_bu": [-0.179, 0.59, -0.72], "R_bl": [-0.179, 0.265, -0.66] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "hippo-pc": { "joints": { "hips": [0, 0.687, -0.668], "chest": [0, 0.692, 0.026], "neck": [0, 0.845, 0.215], "head": [0, 0.789, 0.736], "L_fu": [0.207, 0.474, 0.059], "L_fl": [0.207, 0.213, 0.019], "R_fu": [-0.167, 0.474, 0.291], "R_fl": [-0.167, 0.213, 0.251], "L_bu": [0.134, 0.59, -0.912], "L_bl": [0.134, 0.265, -0.852], "R_bu": [-0.182, 0.59, -0.723], "R_bl": [-0.182, 0.265, -0.663] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "horse-lite": { "joints": { "hips": [0, 0.865, -0.85], "chest": [0, 1.068, -0.419], "neck": [0, 1.168, -0.286], "head": [0, 1.486, 0.73], "L_fu": [0.12, 0.925, -0.337], "L_fl": [0.12, 0.416, -0.377], "R_fu": [-0.129, 0.925, -0.316], "R_fl": [-0.129, 0.416, -0.356], "L_bu": [0.027, 0.597, -0.943], "L_bl": [0.027, 0.269, -0.883], "R_bu": [-0.034, 0.597, -0.943], "R_bl": [-0.034, 0.269, -0.883] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "horse-pc": { "joints": { "hips": [0, 0.844, -0.829], "chest": [0, 1.052, -0.327], "neck": [0, 1.143, -0.179], "head": [0, 1.473, 0.732], "L_fu": [0.12, 0.923, -0.206], "L_fl": [0.12, 0.415, -0.246], "R_fu": [-0.128, 0.923, -0.232], "R_fl": [-0.128, 0.415, -0.272], "L_bu": [0.033, 0.56, -0.935], "L_bl": [0.033, 0.252, -0.875], "R_bu": [-0.035, 0.56, -0.938], "R_bl": [-0.035, 0.252, -0.878] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "kitsune-fox-lite": { "joints": { "hips": [0, 1.845, -0.312], "chest": [0, 1.425, 0.237], "neck": [0, 1.478, 0.395], "head": [0, 1.053, 0.668], "L_fu": [0.229, 1.35, 0.327], "L_fl": [0.229, 0.608, 0.287], "R_fu": [-0.268, 1.35, 0.382], "R_fl": [-0.268, 0.608, 0.342], "L_bu": [0.531, 1.35, -0.44], "L_bl": [0.531, 0.608, -0.38], "R_bu": [-0.523, 1.35, -0.419], "R_bl": [-0.523, 0.608, -0.359], "tail1": [0, 1.198, -0.669], "tail2": [-0.055, 1.37, -0.755], "tail3": [0, 1.542, -0.84] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "kitsune-fox-pc": { "joints": { "hips": [0, 1.825, -0.312], "chest": [0, 1.42, 0.252], "neck": [0, 1.477, 0.412], "head": [0, 1.027, 0.669], "L_fu": [0.238, 1.338, 0.351], "L_fl": [0.238, 0.602, 0.311], "R_fu": [-0.275, 1.338, 0.394], "R_fl": [-0.275, 0.602, 0.354], "L_bu": [0.573, 1.338, -0.451], "L_bl": [0.573, 0.602, -0.391], "R_bu": [-0.566, 1.338, -0.414], "R_bl": [-0.566, 0.602, -0.354], "tail1": [0, 1.166, -0.673], "tail2": [-0.059, 1.338, -0.759], "tail3": [0, 1.51, -0.845] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "lion-lite": { "joints": { "hips": [0, 0.437, -0.587], "chest": [0, 0.623, -0.006], "neck": [0, 0.795, 0.158], "head": [0, 0.894, 0.701], "L_fu": [0.016, 0.378, 0.545], "L_fl": [0.016, 0.17, 0.505], "R_fu": [-0.173, 0.378, -0.309], "R_fl": [-0.173, 0.17, -0.349], "L_bu": [0.101, 0.285, -0.46], "L_bl": [0.101, 0.128, -0.4], "R_bu": [0.067, 0.285, -0.963], "R_bl": [0.067, 0.128, -0.903], "tail1": [0, 0.242, -0.951], "tail2": [0.024, 0.242, -0.966], "tail3": [0, 0.241, -0.982] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "lion-pc": { "joints": { "hips": [0, 0.619, -0.588], "chest": [0, 0.634, -0.009], "neck": [0, 0.794, 0.156], "head": [0, 0.887, 0.698], "L_fu": [0.003, 0.404, 0.546], "L_fl": [0.003, 0.182, 0.506], "R_fu": [-0.166, 0.404, -0.315], "R_fl": [-0.166, 0.182, -0.355], "L_bu": [0.108, 0.549, -0.462], "L_bl": [0.108, 0.247, -0.402], "R_bu": [0.075, 0.549, -0.963], "R_bl": [0.075, 0.247, -0.903], "tail1": [0, 0.246, -0.952], "tail2": [0.027, 0.245, -0.968], "tail3": [0, 0.244, -0.984] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "llama-lite": { "joints": { "hips": [0, 1.124, -0.482], "chest": [0, 1.076, 0.156], "neck": [0, 1.422, 0.332], "head": [0, 1.533, 0.682], "L_fu": [0.157, 0.581, 0.288], "L_fl": [0.157, 0.262, 0.248], "R_fu": [-0.231, 0.581, 0.297], "R_fl": [-0.231, 0.262, 0.257], "L_bu": [0.227, 0.633, -0.591], "L_bl": [0.227, 0.285, -0.531], "R_bu": [-0.192, 0.633, -0.647], "R_bl": [-0.192, 0.285, -0.587], "tail1": [0, 1.332, -0.859], "tail2": [0.002, 1.328, -0.899], "tail3": [0, 1.323, -0.94] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "llama-pc": { "joints": { "hips": [0, 1.127, -0.483], "chest": [0, 1.079, 0.157], "neck": [0, 1.426, 0.334], "head": [0, 1.567, 0.681], "L_fu": [0.161, 0.584, 0.292], "L_fl": [0.161, 0.263, 0.252], "R_fu": [-0.229, 0.584, 0.297], "R_fl": [-0.229, 0.263, 0.257], "L_bu": [0.231, 0.636, -0.592], "L_bl": [0.231, 0.286, -0.532], "R_bu": [-0.195, 0.636, -0.649], "R_bl": [-0.195, 0.286, -0.589], "tail1": [0, 1.339, -0.861], "tail2": [0.006, 1.335, -0.901], "tail3": [0, 1.33, -0.941] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "lynx-lite": { "joints": { "hips": [0, 1.022, -0.24], "chest": [0, 1.111, 0.416], "neck": [0, 1.396, 0.597], "head": [0, 1.1, 0.719], "L_fu": [0.184, 0.704, 0.553], "L_fl": [0.184, 0.317, 0.513], "R_fu": [-0.12, 0.704, 0.561], "R_fl": [-0.12, 0.317, 0.521], "L_bu": [0.226, 0.835, -0.241], "L_bl": [0.226, 0.376, -0.181], "R_bu": [-0.176, 0.835, -0.521], "R_bl": [-0.176, 0.376, -0.461], "tail1": [0, 0.935, -0.621], "tail2": [-0.004, 1.031, -0.744], "tail3": [0, 1.128, -0.868] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "lynx-pc": { "joints": { "hips": [0, 1.007, -0.245], "chest": [0, 1.131, 0.419], "neck": [0, 1.39, 0.601], "head": [0, 1.046, 0.715], "L_fu": [0.181, 0.761, 0.557], "L_fl": [0.181, 0.343, 0.517], "R_fu": [-0.124, 0.761, 0.566], "R_fl": [-0.124, 0.343, 0.526], "L_bu": [0.22, 0.826, -0.249], "L_bl": [0.22, 0.372, -0.189], "R_bu": [-0.175, 0.826, -0.526], "R_bl": [-0.175, 0.372, -0.466], "tail1": [0, 0.893, -0.627], "tail2": [-0.005, 0.999, -0.748], "tail3": [0, 1.104, -0.868] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "mammoth-lite": { "joints": { "hips": [0, 0.689, -0.597], "chest": [0, 0.822, -0.036], "neck": [0, 1.066, 0.125], "head": [0, 0.663, 0.657], "L_fu": [0.168, 0.474, 0.026], "L_fl": [0.168, 0.213, -0.014], "R_fu": [-0.217, 0.474, 0.144], "R_fl": [-0.217, 0.213, 0.104], "L_bu": [0.193, 0.487, -0.742], "L_bl": [0.193, 0.219, -0.682], "R_bu": [-0.209, 0.487, -0.693], "R_bl": [-0.209, 0.219, -0.633] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "mammoth-pc": { "joints": { "hips": [0, 0.638, -0.598], "chest": [0, 0.806, -0.051], "neck": [0, 1.045, 0.106], "head": [0, 0.64, 0.654], "L_fu": [0.158, 0.465, 0.01], "L_fl": [0.158, 0.209, -0.03], "R_fu": [-0.206, 0.465, 0.122], "R_fl": [-0.206, 0.209, 0.082], "L_bu": [0.187, 0.398, -0.735], "L_bl": [0.187, 0.179, -0.675], "R_bu": [-0.204, 0.398, -0.695], "R_bl": [-0.204, 0.179, -0.635] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "moose-lite": { "joints": { "hips": [0, 0.979, -0.691], "chest": [0, 1.261, -0.053], "neck": [0, 1.682, 0.123], "head": [0, 1.417, 0.689], "L_fu": [0.302, 0.661, 0.097], "L_fl": [0.302, 0.298, 0.057], "R_fu": [-0.149, 0.661, 0.069], "R_fl": [-0.149, 0.298, 0.029], "L_bu": [0.178, 0.661, -0.817], "L_bl": [0.178, 0.298, -0.757], "R_bu": [-0.263, 0.661, -0.838], "R_bl": [-0.263, 0.298, -0.778] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "moose-pc": { "joints": { "hips": [0, 0.97, -0.692], "chest": [0, 1.256, -0.063], "neck": [0, 1.674, 0.112], "head": [0, 1.397, 0.685], "L_fu": [0.295, 0.658, 0.086], "L_fl": [0.295, 0.296, 0.046], "R_fu": [-0.149, 0.658, 0.058], "R_fl": [-0.149, 0.296, 0.018], "L_bu": [0.177, 0.658, -0.818], "L_bl": [0.177, 0.296, -0.758], "R_bu": [-0.258, 0.658, -0.835], "R_bl": [-0.258, 0.296, -0.775] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "orc-lite": { "joints": { "hips": [0, 0.8, 0.05], "spine": [0, 1.016, 0.037], "chest": [0, 1.268, 0.038], "neck": [0, 1.52, -0.028], "head": [0, 1.688, -0.068], "L_arm": [0.261, 1.42, -0.064], "L_fore": [0.279, 0.976, -0.065], "L_hand": [0.294, 0.607, 0.007], "R_arm": [-0.261, 1.42, -0.064], "R_fore": [-0.278, 0.987, -0.092], "R_hand": [-0.293, 0.626, -0.042], "L_thigh": [0.156, 0.7, 0.073], "L_shin": [0.168, 0.36, -0.023], "L_foot": [0.199, 0.14, -0.027], "R_thigh": [-0.167, 0.7, 0.085], "R_shin": [-0.201, 0.36, -0.035], "R_foot": [-0.196, 0.14, -0.055] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "orc-pc": { "joints": { "hips": [0, 0.74, 0.047], "spine": [0, 1.076, -0.016], "chest": [0, 1.468, -0.011], "neck": [0, 1.86, -0.082], "head": [0, 1.909, -0.098], "L_arm": [0.266, 1.76, -0.048], "L_fore": [0.284, 1.149, -0.061], "L_hand": [0.298, 0.64, 0.001], "R_arm": [-0.266, 1.76, -0.048], "R_fore": [-0.283, 1.257, -0.032], "R_hand": [-0.298, 0.837, 0.055], "L_thigh": [0.163, 0.64, 0.062], "L_shin": [0.193, 0.33, -0.004], "L_foot": [0.202, 0.14, -0.029], "R_thigh": [-0.194, 0.64, 0.003], "R_shin": [-0.193, 0.33, -0.011], "R_foot": [-0.195, 0.14, -0.049] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "panda-lite": { "joints": { "hips": [0, 0.904, -0.529], "chest": [0, 0.958, 0.144], "neck": [0, 1.123, 0.328], "head": [0, 1.018, 0.685], "L_fu": [0.265, 0.721, 0.243], "L_fl": [0.265, 0.325, 0.203], "R_fu": [-0.189, 0.721, 0.333], "R_fl": [-0.189, 0.325, 0.293], "L_bu": [0.188, 0.692, -0.726], "L_bl": [0.188, 0.312, -0.666], "R_bu": [-0.271, 0.692, -0.62], "R_bl": [-0.271, 0.312, -0.56], "tail1": [0, 0.525, -0.913], "tail2": [0.04, 0.55, -0.937], "tail3": [0, 0.574, -0.96] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "panda-pc": { "joints": { "hips": [0, 0.89, -0.542], "chest": [0, 0.92, 0.13], "neck": [0, 1.091, 0.314], "head": [0, 0.969, 0.684], "L_fu": [0.269, 0.677, 0.226], "L_fl": [0.269, 0.305, 0.186], "R_fu": [-0.18, 0.677, 0.322], "R_fl": [-0.18, 0.305, 0.282], "L_bu": [0.187, 0.677, -0.744], "L_bl": [0.187, 0.305, -0.684], "R_bu": [-0.277, 0.677, -0.628], "R_bl": [-0.277, 0.305, -0.568], "tail1": [0, 0.503, -0.926], "tail2": [0.039, 0.529, -0.95], "tail3": [0, 0.555, -0.973] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "pig-lite": { "joints": { "hips": [0, 0.641, -0.563], "chest": [0, 0.642, 0.067], "neck": [0, 0.878, 0.242], "head": [0, 0.811, 0.702], "L_fu": [0.256, 0.305, 0.195], "L_fl": [0.256, 0.137, 0.155], "R_fu": [-0.088, 0.305, 0.208], "R_fl": [-0.088, 0.137, 0.168], "L_bu": [0.154, 0.305, -0.719], "L_bl": [0.154, 0.137, -0.659], "R_bu": [-0.178, 0.305, -0.677], "R_bl": [-0.178, 0.137, -0.617], "tail1": [0, 0.908, -0.938], "tail2": [-0.04, 0.913, -0.956], "tail3": [0, 0.918, -0.974] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "pig-pc": { "joints": { "hips": [0, 0.637, -0.566], "chest": [0, 0.642, 0.062], "neck": [0, 0.879, 0.237], "head": [0, 0.803, 0.706], "L_fu": [0.257, 0.304, 0.19], "L_fl": [0.257, 0.137, 0.15], "R_fu": [-0.086, 0.304, 0.204], "R_fl": [-0.086, 0.137, 0.164], "L_bu": [0.151, 0.304, -0.722], "L_bl": [0.151, 0.137, -0.662], "R_bu": [-0.178, 0.304, -0.679], "R_bl": [-0.178, 0.137, -0.619], "tail1": [0, 0.907, -0.941], "tail2": [-0.041, 0.91, -0.96], "tail3": [0, 0.913, -0.978] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "polar-bear-lite": { "joints": { "hips": [0, 0.921, -0.171], "chest": [0, 0.856, 0.612], "neck": [0, 0.997, 0.82], "head": [0, 0.402, 0.749], "L_fu": [0.225, 0.654, 0.797], "L_fl": [0.225, 0.294, 0.757], "R_fu": [-0.18, 0.654, 0.764], "R_fl": [-0.18, 0.294, 0.724], "L_bu": [0.128, 0.654, -0.168], "L_bl": [0.128, 0.294, -0.108], "R_bu": [-0.147, 0.654, -0.51], "R_bl": [-0.147, 0.294, -0.45], "tail1": [0, 0.621, -0.579], "tail2": [0.06, 0.683, -0.69], "tail3": [0, 0.745, -0.802] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "polar-bear-pc": { "joints": { "hips": [0, 0.917, -0.166], "chest": [0, 0.859, 0.617], "neck": [0, 1.004, 0.824], "head": [0, 0.412, 0.747], "L_fu": [0.227, 0.651, 0.803], "L_fl": [0.227, 0.293, 0.763], "R_fu": [-0.18, 0.651, 0.766], "R_fl": [-0.18, 0.293, 0.726], "L_bu": [0.127, 0.651, -0.162], "L_bl": [0.127, 0.293, -0.102], "R_bu": [-0.149, 0.651, -0.506], "R_bl": [-0.149, 0.293, -0.446], "tail1": [0, 0.643, -0.574], "tail2": [0.063, 0.691, -0.692], "tail3": [0, 0.739, -0.809] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "raccoon-lite": { "joints": { "hips": [0, 1.778, -0.122], "chest": [0, 1.772, 0.588], "neck": [0, 2.066, 0.78], "head": [0, 0.356, 0.754], "L_fu": [0.22, 1.353, 0.755], "L_fl": [0.22, 0.609, 0.715], "R_fu": [-0.4, 1.353, 0.725], "R_fl": [-0.4, 0.609, 0.685], "L_bu": [0.345, 1.353, -0.358], "L_bl": [0.345, 0.609, -0.298], "R_bu": [-0.669, 1.353, -0.19], "R_bl": [-0.669, 0.609, -0.13], "tail1": [0, 0.968, -0.514], "tail2": [0.004, 0.904, -0.659], "tail3": [0, 0.84, -0.803] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "raccoon-pc": { "joints": { "hips": [0, 1.771, -0.123], "chest": [0, 1.773, 0.584], "neck": [0, 2.067, 0.775], "head": [0, 0.364, 0.752], "L_fu": [0.217, 1.353, 0.751], "L_fl": [0.217, 0.609, 0.711], "R_fu": [-0.403, 1.353, 0.719], "R_fl": [-0.403, 0.609, 0.679], "L_bu": [0.344, 1.353, -0.353], "L_bl": [0.344, 0.609, -0.293], "R_bu": [-0.664, 1.353, -0.196], "R_bl": [-0.664, 0.609, -0.136], "tail1": [0, 0.956, -0.515], "tail2": [0.004, 0.894, -0.656], "tail3": [0, 0.832, -0.796] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "rat-lite": { "joints": { "hips": [0, 1.609, 0.037], "chest": [0, 2.052, 0.386], "neck": [0, 2.464, 0.501], "head": [0, 1.61, 0.654], "L_fu": [0.28, 1.463, 0.524], "L_fl": [0.28, 0.658, 0.484], "R_fu": [-0.185, 1.463, 0.397], "R_fl": [-0.185, 0.658, 0.357], "L_bu": [0.287, 1.463, -0.118], "L_bl": [0.287, 0.658, -0.058], "R_bu": [-0.202, 1.463, 0.043], "R_bl": [-0.202, 0.658, 0.103], "tail1": [0, 0.317, -0.278], "tail2": [-0.054, 0.22, -0.518], "tail3": [0, 0.123, -0.758] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "rat-pc": { "joints": { "hips": [0, 1.584, 0.021], "chest": [0, 2.052, 0.381], "neck": [0, 2.464, 0.498], "head": [0, 1.605, 0.655], "L_fu": [0.279, 1.463, 0.525], "L_fl": [0.279, 0.658, 0.485], "R_fu": [-0.19, 1.463, 0.392], "R_fl": [-0.19, 0.658, 0.352], "L_bu": [0.287, 1.463, -0.134], "L_bl": [0.287, 0.658, -0.074], "R_bu": [-0.207, 1.463, 0.021], "R_bl": [-0.207, 0.658, 0.081], "tail1": [0, 0.27, -0.296], "tail2": [-0.045, 0.19, -0.531], "tail3": [0, 0.111, -0.766] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "reindeer-lite": { "joints": { "hips": [0, 0.951, -0.582], "chest": [0, 1.284, 0.018], "neck": [0, 1.795, 0.186], "head": [0, 1.535, 0.666], "L_fu": [0.19, 0.555, 0.15], "L_fl": [0.19, 0.25, 0.11], "R_fu": [-0.138, 0.555, 0.143], "R_fl": [-0.138, 0.25, 0.103], "L_bu": [0.19, 0.667, -0.679], "L_bl": [0.19, 0.3, -0.619], "R_bu": [-0.156, 0.667, -0.743], "R_bl": [-0.156, 0.3, -0.683], "tail1": [0, 0.952, -0.951], "tail2": [-0.001, 0.955, -0.967], "tail3": [0, 0.957, -0.983] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "reindeer-pc": { "joints": { "hips": [0, 0.964, -0.582], "chest": [0, 1.279, 0.014], "neck": [0, 1.786, 0.181], "head": [0, 1.528, 0.665], "L_fu": [0.19, 0.555, 0.145], "L_fl": [0.19, 0.25, 0.105], "R_fu": [-0.139, 0.555, 0.138], "R_fl": [-0.139, 0.25, 0.098], "L_bu": [0.188, 0.69, -0.675], "L_bl": [0.188, 0.311, -0.615], "R_bu": [-0.155, 0.69, -0.745], "R_bl": [-0.155, 0.311, -0.685], "tail1": [0, 0.952, -0.95], "tail2": [-0.002, 0.957, -0.966], "tail3": [0, 0.961, -0.982] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "rhino-lite": { "joints": { "hips": [0, 0.558, -0.663], "chest": [0, 0.598, -0.015], "neck": [0, 0.851, 0.164], "head": [0, 0.473, 0.678], "L_fu": [0.091, 0.236, 0.12], "L_fl": [0.091, 0.106, 0.08], "R_fu": [-0.098, 0.236, 0.128], "R_fl": [-0.098, 0.106, 0.088], "L_bu": [0.126, 0.236, -0.805], "L_bl": [0.126, 0.106, -0.745], "R_bu": [-0.146, 0.236, -0.799], "R_bl": [-0.146, 0.106, -0.739] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "rhino-pc": { "joints": { "hips": [0, 0.554, -0.663], "chest": [0, 0.607, -0.011], "neck": [0, 0.852, 0.168], "head": [0, 0.475, 0.679], "L_fu": [0.089, 0.256, 0.125], "L_fl": [0.089, 0.115, 0.085], "R_fu": [-0.093, 0.256, 0.132], "R_fl": [-0.093, 0.115, 0.092], "L_bu": [0.129, 0.236, -0.806], "L_bl": [0.129, 0.106, -0.746], "R_bu": [-0.142, 0.236, -0.798], "R_bl": [-0.142, 0.106, -0.738] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "sabertooth-tiger-lite": { "joints": { "hips": [0, 0.641, -0.287], "chest": [0, 0.758, 0.45], "neck": [0, 0.912, 0.648], "head": [0, 0.664, 0.695], "L_fu": [0.127, 0.538, 0.733], "L_fl": [0.127, 0.242, 0.693], "R_fu": [-0.072, 0.538, 0.483], "R_fl": [-0.072, 0.242, 0.443], "L_bu": [0.188, 0.475, -0.378], "L_bl": [0.188, 0.214, -0.318], "R_bu": [-0.24, 0.475, -0.512], "R_bl": [-0.24, 0.214, -0.452], "tail1": [0, 0.733, -0.685], "tail2": [0.003, 0.727, -0.792], "tail3": [0, 0.721, -0.898] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "sabertooth-tiger-pc": { "joints": { "hips": [0, 0.739, -0.29], "chest": [0, 0.752, 0.442], "neck": [0, 0.905, 0.639], "head": [0, 0.657, 0.692], "L_fu": [0.119, 0.534, 0.722], "L_fl": [0.119, 0.24, 0.682], "R_fu": [-0.077, 0.534, 0.477], "R_fl": [-0.077, 0.24, 0.437], "L_bu": [0.189, 0.641, -0.38], "L_bl": [0.189, 0.288, -0.32], "R_bu": [-0.238, 0.641, -0.514], "R_bl": [-0.238, 0.288, -0.454], "tail1": [0, 0.727, -0.687], "tail2": [0.004, 0.721, -0.792], "tail3": [0, 0.715, -0.897] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "sheep-lite": { "joints": { "hips": [0, 0.807, -0.555], "chest": [0, 0.846, 0.148], "neck": [0, 1.148, 0.339], "head": [0, 1.094, 0.638], "L_fu": [0.122, 0.413, 0.298], "L_fl": [0.122, 0.186, 0.258], "R_fu": [-0.168, 0.413, 0.3], "R_fl": [-0.168, 0.186, 0.26], "L_bu": [0.175, 0.413, -0.703], "L_bl": [0.175, 0.186, -0.643], "R_bu": [-0.156, 0.413, -0.708], "R_bl": [-0.156, 0.186, -0.648] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "sheep-pc": { "joints": { "hips": [0, 0.787, -0.563], "chest": [0, 0.828, 0.14], "neck": [0, 1.143, 0.33], "head": [0, 1.092, 0.64], "L_fu": [0.122, 0.379, 0.291], "L_fl": [0.122, 0.171, 0.251], "R_fu": [-0.171, 0.379, 0.29], "R_fl": [-0.171, 0.171, 0.25], "L_bu": [0.176, 0.379, -0.708], "L_bl": [0.176, 0.171, -0.648], "R_bu": [-0.153, 0.379, -0.718], "R_bl": [-0.153, 0.171, -0.658] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "skeleton-warrior-lite": { "joints": { "hips": [0, 0.879, 0.052], "spine": [0, 1.07, 0.001], "chest": [0, 1.294, 0.045], "neck": [0, 1.517, 0.034], "head": [0, 1.634, 0.016], "L_arm": [0.185, 1.424, -0.029], "L_fore": [0.212, 0.915, -0.082], "L_hand": [0.235, 0.491, -0.058], "R_arm": [-0.185, 1.424, -0.029], "R_fore": [-0.207, 0.915, -0.095], "R_hand": [-0.226, 0.49, -0.081], "L_thigh": [0.137, 0.786, -0.039], "L_shin": [0.187, 0.402, -0.041], "L_foot": [0.176, 0.13, -0.039], "R_thigh": [-0.14, 0.786, -0.051], "R_shin": [-0.182, 0.402, -0.042], "R_foot": [-0.179, 0.13, 0.042] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "skeleton-warrior-pc": { "joints": { "hips": [0, 0.869, 0.027], "spine": [0, 1.061, 0.002], "chest": [0, 1.284, 0.025], "neck": [0, 1.508, 0.019], "head": [0, 1.628, 0.015], "L_arm": [0.185, 1.415, -0.022], "L_fore": [0.206, 0.909, -0.068], "L_hand": [0.223, 0.488, -0.039], "R_arm": [-0.185, 1.415, -0.022], "R_fore": [-0.204, 0.912, -0.077], "R_hand": [-0.22, 0.493, -0.056], "L_thigh": [0.137, 0.777, -0.026], "L_shin": [0.185, 0.398, -0.042], "L_foot": [0.179, 0.13, -0.022], "R_thigh": [-0.141, 0.777, -0.035], "R_shin": [-0.185, 0.398, -0.042], "R_foot": [-0.18, 0.13, 0.001] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "spirit-stag-lite": { "joints": { "hips": [0, 1.585, -0.551], "chest": [0, 2.389, 0.169], "neck": [0, 2.678, 0.363], "head": [0, 2.283, 0.712], "L_fu": [0.142, 1.976, 0.433], "L_fl": [0.142, 0.889, 0.393], "R_fu": [-0.272, 1.976, 0.213], "R_fl": [-0.272, 0.889, 0.173], "L_bu": [0.63, 1.621, -0.52], "L_bl": [0.63, 0.729, -0.46], "R_bu": [0.333, 1.621, -0.891], "R_bl": [0.333, 0.729, -0.831] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu" } }, "spirit-stag-pc": { "joints": { "hips": [0, 1.573, -0.541], "chest": [0, 2.374, 0.191], "neck": [0, 2.666, 0.388], "head": [0, 2.21, 0.709], "L_fu": [0.15, 1.957, 0.445], "L_fl": [0.15, 0.881, 0.405], "R_fu": [-0.269, 1.957, 0.25], "R_fl": [-0.269, 0.881, 0.21], "L_bu": [0.581, 1.605, -0.518], "L_bl": [0.581, 0.722, -0.458], "R_bu": [0.277, 1.605, -0.877], "R_bl": [0.277, 0.722, -0.817], "tail1": [0, 0.876, -0.938], "tail2": [0.184, 0.981, -0.954], "tail3": [0, 1.085, -0.971] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "stone-golem-lite": { "joints": { "hips": [0, 1.485, 0.024], "spine": [0, 1.701, 0.065], "chest": [0, 1.953, -0.119], "neck": [0, 2.205, 0.079], "head": [0, 2.483, -0.025], "L_arm": [0.391, 2.055, -0.007], "L_fore": [0.675, 1.464, 0.04], "L_hand": [0.912, 0.971, 0.19], "R_arm": [-0.391, 2.055, -0.007], "R_fore": [-0.587, 1.435, -0.041], "R_hand": [-0.75, 0.919, 0.04], "L_thigh": [0.32, 1.335, -0.051], "L_shin": [0.312, 0.683, -0.145], "L_foot": [0.324, 0.21, 0.082], "R_thigh": [-0.302, 1.335, 0.016], "R_shin": [-0.293, 0.683, -0.119], "R_foot": [-0.292, 0.21, 0.07] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "stone-golem-pc": { "joints": { "hips": [0, 1.485, 0.012], "spine": [0, 1.728, 0.047], "chest": [0, 2.012, -0.002], "neck": [0, 2.295, 0.075], "head": [0, 2.542, -0.038], "L_arm": [0.39, 2.145, 0.014], "L_fore": [0.543, 1.453, -0.053], "L_hand": [0.671, 0.876, 0.001], "R_arm": [-0.39, 2.145, 0.014], "R_fore": [-0.469, 1.43, -0.087], "R_hand": [-0.534, 0.835, -0.061], "L_thigh": [0.336, 1.335, -0.021], "L_shin": [0.309, 0.683, -0.13], "L_foot": [0.315, 0.21, 0.106], "R_thigh": [-0.3, 1.335, 0.034], "R_shin": [-0.289, 0.683, -0.125], "R_foot": [-0.285, 0.21, 0.09] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "tiger-lite": { "joints": { "hips": [0, 0.711, -0.516], "chest": [0, 0.688, 0.011], "neck": [0, 0.826, 0.164], "head": [0, 0.814, 0.722], "L_fu": [0.209, 0.492, -0.303], "L_fl": [0.209, 0.222, -0.343], "R_fu": [-0.059, 0.492, 0.55], "R_fl": [-0.059, 0.222, 0.51], "L_bu": [0.135, 0.613, -0.898], "L_bl": [0.135, 0.276, -0.838], "R_bu": [-0.163, 0.613, -0.361], "R_bl": [-0.163, 0.276, -0.301], "tail1": [0, 0.075, -0.869], "tail2": [0.051, 0.086, -0.913], "tail3": [0, 0.097, -0.956] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "tiger-pc": { "joints": { "hips": [0, 0.719, -0.515], "chest": [0, 0.685, 0.01], "neck": [0, 0.821, 0.162], "head": [0, 0.811, 0.722], "L_fu": [0.207, 0.49, -0.308], "L_fl": [0.207, 0.22, -0.348], "R_fu": [-0.059, 0.49, 0.552], "R_fl": [-0.059, 0.22, 0.512], "L_bu": [0.132, 0.61, -0.894], "L_bl": [0.132, 0.274, -0.834], "R_bu": [-0.162, 0.61, -0.361], "R_bl": [-0.162, 0.274, -0.301], "tail1": [0, 0.07, -0.867], "tail2": [0.048, 0.081, -0.912], "tail3": [0, 0.093, -0.956] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "troll-lite": { "joints": { "hips": [0, 0.806, 0.06], "spine": [0, 1.138, 0.15], "chest": [0, 1.524, -0.031], "neck": [0, 1.911, 0.137], "head": [0, 2.152, -0.033], "L_arm": [0.572, 1.781, 0.129], "L_fore": [0.817, 1.356, 0.142], "L_hand": [1.021, 1.002, 0.248], "R_arm": [-0.572, 1.781, 0.129], "R_fore": [-0.79, 1.357, 0.208], "R_hand": [-0.972, 1.003, 0.369], "L_thigh": [0.311, 0.676, -0.011], "L_shin": [0.304, 0.351, 0.11], "L_foot": [0.414, 0.182, 0.27], "R_thigh": [-0.251, 0.676, 0.038], "R_shin": [-0.336, 0.351, 0.066], "R_foot": [-0.346, 0.182, 0.3] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "troll-pc": { "joints": { "hips": [0, 0.767, 0.061], "spine": [0, 1.106, 0.137], "chest": [0, 1.502, -0.017], "neck": [0, 1.898, 0.111], "head": [0, 2.144, -0.045], "L_arm": [0.584, 1.768, 0.106], "L_fore": [0.832, 1.316, 0.109], "L_hand": [1.039, 0.939, 0.206], "R_arm": [-0.584, 1.768, 0.106], "R_fore": [-0.827, 1.315, 0.116], "R_hand": [-1.03, 0.938, 0.219], "L_thigh": [0.293, 0.637, -0.01], "L_shin": [0.299, 0.332, 0.073], "L_foot": [0.373, 0.182, 0.166], "R_thigh": [-0.268, 0.637, 0.026], "R_shin": [-0.343, 0.332, 0.048], "R_foot": [-0.35, 0.182, 0.23] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "unicorn-lite": { "joints": { "hips": [0, 1.204, -0.4], "chest": [0, 1.396, 0.357], "neck": [0, 1.724, 0.559], "head": [0, 1.477, 0.641], "L_fu": [0.198, 0.928, 0.572], "L_fl": [0.198, 0.418, 0.532], "R_fu": [-0.118, 0.928, 0.466], "R_fl": [-0.118, 0.418, 0.426], "L_bu": [0.271, 1.102, -0.382], "L_bl": [0.271, 0.496, -0.322], "R_bu": [0.02, 1.102, -0.741], "R_bl": [0.02, 0.496, -0.681], "tail1": [0, 0.581, -0.802], "tail2": [0, 0.489, -0.851], "tail3": [0, 0.398, -0.9] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "unicorn-pc": { "joints": { "hips": [0, 1.201, -0.401], "chest": [0, 1.394, 0.355], "neck": [0, 1.72, 0.557], "head": [0, 1.483, 0.647], "L_fu": [0.19, 0.928, 0.572], "L_fl": [0.19, 0.418, 0.532], "R_fu": [-0.122, 0.928, 0.462], "R_fl": [-0.122, 0.418, 0.422], "L_bu": [0.266, 1.101, -0.382], "L_bl": [0.266, 0.496, -0.322], "R_bu": [0.021, 1.101, -0.744], "R_bl": [0.021, 0.496, -0.684], "tail1": [0, 0.575, -0.803], "tail2": [0.001, 0.487, -0.853], "tail3": [0, 0.399, -0.902] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "werewolf-lite": { "joints": { "hips": [0, 1.023, 0.183], "spine": [0, 1.33, 0.063], "chest": [0, 1.688, -0.147], "neck": [0, 2.046, 0.046], "head": [0, 2.1, 0.12], "L_arm": [0.22, 1.936, 0.095], "L_fore": [0.257, 1.213, -0.048], "L_hand": [0.287, 0.61, -0.086], "R_arm": [-0.22, 1.936, 0.095], "R_fore": [-0.221, 1.212, -0.032], "R_hand": [-0.222, 0.608, -0.057], "L_thigh": [0.042, 0.913, -0.006], "L_shin": [0.176, 0.468, 0], "L_foot": [0.176, 0.154, 0], "R_thigh": [-0.044, 0.913, 0.029], "R_shin": [-0.176, 0.468, 0], "R_foot": [-0.176, 0.154, 0] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "werewolf-pc": { "joints": { "hips": [0, 0.891, 0.031], "spine": [0, 1.237, 0.099], "chest": [0, 1.642, -0.008], "neck": [0, 2.046, 0.063], "head": [0, 2.1, 0.119], "L_arm": [0.22, 1.936, 0.077], "L_fore": [0.264, 1.188, -0.071], "L_hand": [0.301, 0.565, -0.114], "R_arm": [-0.22, 1.936, 0.077], "R_fore": [-0.264, 1.19, -0.069], "R_hand": [-0.301, 0.568, -0.109], "L_thigh": [0.12, 0.781, 0.08], "L_shin": [0.205, 0.402, -0.067], "L_foot": [0.22, 0.154, -0.105], "R_thigh": [-0.116, 0.781, 0.069], "R_shin": [-0.198, 0.402, -0.07], "R_foot": [-0.222, 0.154, -0.113] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "white-tiger-lite": { "joints": { "hips": [0, 0.584, -0.328], "chest": [0, 0.64, 0.363], "neck": [0, 0.85, 0.552], "head": [0, 0.642, 0.706], "L_fu": [0.081, 0.34, 0.51], "L_fl": [0.081, 0.153, 0.47], "R_fu": [-0.063, 0.34, 0.513], "R_fl": [-0.063, 0.153, 0.473], "L_bu": [0.064, 0.298, -0.416], "L_bl": [0.064, 0.134, -0.356], "R_bu": [-0.158, 0.298, -0.537], "R_bl": [-0.158, 0.134, -0.477], "tail1": [0, 0.452, -0.717], "tail2": [-0.096, 0.412, -0.809], "tail3": [0, 0.372, -0.902] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "white-tiger-pc": { "joints": { "hips": [0, 0.585, -0.327], "chest": [0, 0.641, 0.365], "neck": [0, 0.852, 0.553], "head": [0, 0.648, 0.706], "L_fu": [0.081, 0.34, 0.513], "L_fl": [0.081, 0.153, 0.473], "R_fu": [-0.064, 0.34, 0.513], "R_fl": [-0.064, 0.153, 0.473], "L_bu": [0.069, 0.299, -0.411], "L_bl": [0.069, 0.134, -0.351], "R_bu": [-0.153, 0.299, -0.539], "R_bl": [-0.153, 0.134, -0.479], "tail1": [0, 0.454, -0.715], "tail2": [-0.093, 0.413, -0.81], "tail3": [0, 0.371, -0.904] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "wolf-lite": { "joints": { "hips": [0, 0.793, -0.4], "chest": [0, 0.901, 0.285], "neck": [0, 1.166, 0.472], "head": [0, 1.093, 0.71], "L_fu": [0.081, 0.524, 0.433], "L_fl": [0.081, 0.236, 0.393], "R_fu": [-0.189, 0.524, 0.431], "R_fl": [-0.189, 0.236, 0.391], "L_bu": [0.16, 0.493, -0.519], "L_bl": [0.16, 0.222, -0.459], "R_bu": [-0.156, 0.493, -0.575], "R_bl": [-0.156, 0.222, -0.515], "tail1": [0, 0.434, -0.787], "tail2": [0.022, 0.387, -0.854], "tail3": [0, 0.34, -0.921] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "wolf-pc": { "joints": { "hips": [0, 0.786, -0.4], "chest": [0, 0.899, 0.285], "neck": [0, 1.162, 0.472], "head": [0, 1.088, 0.708], "L_fu": [0.084, 0.523, 0.433], "L_fl": [0.084, 0.235, 0.393], "R_fu": [-0.187, 0.523, 0.431], "R_fl": [-0.187, 0.235, 0.391], "L_bu": [0.159, 0.492, -0.519], "L_bl": [0.159, 0.222, -0.459], "R_bu": [-0.155, 0.492, -0.574], "R_bl": [-0.155, 0.222, -0.514], "tail1": [0, 0.436, -0.786], "tail2": [0.023, 0.383, -0.854], "tail3": [0, 0.33, -0.922] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "yeti-lite": { "joints": { "hips": [0, 0.949, -0.022], "spine": [0, 1.265, -0.034], "chest": [0, 1.633, 0.027], "neck": [0, 2.002, -0.009], "head": [0, 2.211, 0.066], "L_arm": [0.381, 1.872, 0.029], "L_fore": [0.427, 1.165, -0.067], "L_hand": [0.466, 0.576, -0.051], "R_arm": [-0.381, 1.872, 0.029], "R_fore": [-0.418, 1.165, -0.069], "R_hand": [-0.449, 0.575, -0.055], "L_thigh": [0.244, 0.819, -0.018], "L_shin": [0.264, 0.423, -0.1], "L_foot": [0.267, 0.182, 0.006], "R_thigh": [-0.243, 0.819, -0.017], "R_shin": [-0.247, 0.423, -0.085], "R_foot": [-0.284, 0.182, -0.006] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "yeti-pc": { "joints": { "hips": [0, 0.923, -0.018], "spine": [0, 1.371, 0.041], "chest": [0, 1.895, 0.06], "neck": [0, 2.418, 0.01], "head": [0, 2.482, 0.006], "L_arm": [0.418, 2.288, 0.074], "L_fore": [0.449, 1.39, -0.047], "L_hand": [0.475, 0.642, -0.052], "R_arm": [-0.418, 2.288, 0.074], "R_fore": [-0.449, 1.381, -0.038], "R_hand": [-0.474, 0.625, -0.036], "L_thigh": [0.248, 0.793, -0.002], "L_shin": [0.265, 0.41, -0.075], "L_foot": [0.277, 0.182, -0.016], "R_thigh": [-0.25, 0.793, 0], "R_shin": [-0.256, 0.41, -0.058], "R_foot": [-0.298, 0.182, -0.008] }, "parent": { "spine": "hips", "chest": "spine", "neck": "chest", "head": "neck", "L_arm": "chest", "L_fore": "L_arm", "L_hand": "L_fore", "R_arm": "chest", "R_fore": "R_arm", "R_hand": "R_fore", "L_thigh": "hips", "L_shin": "L_thigh", "L_foot": "L_shin", "R_thigh": "hips", "R_shin": "R_thigh", "R_foot": "R_shin" } }, "zebra-lite": { "joints": { "hips": [0, 0.766, -0.478], "chest": [0, 0.898, 0.146], "neck": [0, 1.174, 0.319], "head": [0, 1.145, 0.694], "L_fu": [0.128, 0.504, 0.299], "L_fl": [0.128, 0.227, 0.259], "R_fu": [-0.067, 0.504, 0.26], "R_fl": [-0.067, 0.227, 0.22], "L_bu": [0.086, 0.535, -0.544], "L_bl": [0.086, 0.241, -0.484], "R_bu": [-0.09, 0.535, -0.678], "R_bl": [-0.09, 0.241, -0.618], "tail1": [0, 0.52, -0.851], "tail2": [-0.007, 0.484, -0.901], "tail3": [0, 0.449, -0.95] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } }, "zebra-pc": { "joints": { "hips": [0, 0.769, -0.477], "chest": [0, 0.899, 0.145], "neck": [0, 1.175, 0.319], "head": [0, 1.143, 0.696], "L_fu": [0.127, 0.503, 0.299], "L_fl": [0.127, 0.226, 0.259], "R_fu": [-0.066, 0.503, 0.259], "R_fl": [-0.066, 0.226, 0.219], "L_bu": [0.087, 0.503, -0.545], "L_bl": [0.087, 0.226, -0.485], "R_bu": [-0.089, 0.503, -0.677], "R_bl": [-0.089, 0.226, -0.617], "tail1": [0, 0.512, -0.851], "tail2": [-0.006, 0.478, -0.9], "tail3": [0, 0.445, -0.95] }, "parent": { "chest": "hips", "neck": "chest", "head": "neck", "L_fu": "chest", "L_fl": "L_fu", "R_fu": "chest", "R_fl": "R_fu", "L_bu": "hips", "L_bl": "L_bu", "R_bu": "hips", "R_bl": "R_bu", "tail1": "hips", "tail2": "tail1", "tail3": "tail2" } } };
var G3D = { dir: "assets/models/grab3d/", geo: {}, wait: {}, off: /[?&]g3doff=1/.test(location.search) };
var G3D_OF = { tiger: "tiger", lion: "lion", wolf: "wolf", bear: "bear", snowbear: "polar-bear", horse: "horse", elephant: "elephant",
mammoth: "mammoth", stag: "deer", fox: "fox", dog: "dog", cat: "cat", cow: "cow", pig: "pig", sheep: "sheep",
rat: "rat", giantrat: "rat", unicorn: "unicorn", griffin: "griffin", hippogriff: "griffin", fenrir: "wolf", hellhound: "wolf",
troll: "troll", deeptroll: "troll", werewolf: "werewolf", yeti: "yeti", golem: "stone-golem", grey: "alien-grey" };
function g3dGet(name, cb) {
var v = crxLite() ? "lite" : "pc", k = name + "-" + v;
if (G3D.geo[k])
return cb(G3D.geo[k]);
if (G3D.geo[k] === false)
return;
if (G3D.wait[k]) {
G3D.wait[k].push(cb);
return;
}
G3D.wait[k] = [cb];
var J = (typeof G3D_J !== "undefined") && G3D_J[k];
if (!J) {
G3D.geo[k] = false;
return;
}
modelsLoader(function (L) {
L.load(G3D.dir + k + ".glb", function (gl) {
var sm = null;
gl.scene.traverse(function (o) { if (o.isSkinnedMesh && !sm)
sm = o; });
if (!sm) {
G3D.geo[k] = false;
return;
}
var src = sm.material, inGame = typeof REAL !== "undefined";
var o = { map: src.map || null, skinning: true, color: 0xffffff };
var m = inGame ? new THREE.MeshLambertMaterial(o) : new THREE.MeshStandardMaterial(Object.assign(o, { normalMap: src.normalMap || null, roughness: 0.85, metalness: 0 }));
if (m.map)
m.map.encoding = THREE.sRGBEncoding;
m.userData.realRough = 0.85;
m.name = "g3d_" + name;
var geo = sm.geometry;
geo.computeBoundingBox();
var order = sm.skeleton.bones.map(function (b) { return b.name; });
var e = { geo: geo, mat: m, j: J, order: order, h: geo.boundingBox.max.y - geo.boundingBox.min.y };
G3D.geo[k] = e;
var w = G3D.wait[k];
G3D.wait[k] = null;
w.forEach(function (f) { try {
f(e);
}
catch (x) { } });
}, undefined, function () { G3D.geo[k] = false; G3D.wait[k] = null; });
});
}
function g3dSwap(g, name, realH) {
g3dGet(name, function (e) {
var I = g.userData.crx;
if (!I || I.g3d)
return;
var old = I.mesh, J = e.j.joints, P = e.j.parent;
var bones = {}, list = [];
e.order.forEach(function (n) { var b = new THREE.Bone(); b.name = n; bones[n] = b; list.push(b); });
e.order.forEach(function (n) { var b = bones[n], pp = P[n] ? J[P[n]] : [0, 0, 0]; b.position.set(J[n][0] - pp[0], J[n][1] - pp[1], J[n][2] - pp[2]); if (P[n] && bones[P[n]])
bones[P[n]].add(b); });
var mesh = new THREE.SkinnedMesh(e.geo, e.mat);
var root = e.order.filter(function (n) { return !P[n]; })[0];
mesh.add(bones[root]);
mesh.updateMatrixWorld(true);
mesh.bind(new THREE.Skeleton(list));
var oh = 1;
try {
var bb = old.geometry.boundingBox || (old.geometry.computeBoundingBox(), old.geometry.boundingBox);
oh = bb.max.y - bb.min.y;
}
catch (x) { }
mesh.scale.setScalar((realH || oh) / (e.h || 1));
mesh.position.copy(old.position);
mesh.castShadow = old.castShadow;
mesh.receiveShadow = false;
mesh.frustumCulled = true;
mesh.onBeforeRender = old.onBeforeRender;
var par = old.parent;
par.add(mesh);
par.remove(old);
I.mesh = mesh;
I.bones = bones;
I.at = {};
I.base = {};
I.g3d = name;
var PO = e.j.pose || {};
e.order.forEach(function (n) { I.at[n] = J[n]; I.base[n] = PO[n] || [0, 0, 0]; bones[n].rotation.set(I.base[n][0], I.base[n][1], I.base[n][2]); });
if (I.plan && I.plan.bones && I.plan.bones[0][0] !== root) {
I.bones[I.plan.bones[0][0]] = bones[root];
I.at[I.plan.bones[0][0]] = J[root];
}
});
}
(function () {
if (typeof crxBuild !== "function")
return;
var build = crxBuild;
crxBuild = function (key, opt) {
var real = !G3D.off && !window.G3D_OFF && typeof modelsLoader === "function", N = G3D_NEW[key];
var g = build(N && real ? N[0] : key, opt);
try {
if (g && real) {
if (N) {
crxPlan(key);
g3dSwap(g, N[1], (opt && opt.g3dH) || N[2]);
}
else if (G3D_OF[key])
g3dSwap(g, G3D_OF[key], opt && opt.g3dH);
}
}
catch (e) { }
return g;
};
})();
var G3D_NEW = {
zebra: ["horse", "zebra", 1.5], giraffe: ["horse", "giraffe", 5.0], llama: ["horse", "llama", 1.8],
rhino: ["bear", "rhino", 1.8], hippo: ["bear", "hippo", 1.55], panda: ["bear", "panda", 1.05],
cheetah: ["tiger", "cheetah", 0.95], whitetiger: ["tiger", "white-tiger", 1.1], sabertooth: ["tiger", "sabertooth-tiger", 1.25],
lynx: ["fox", "lynx", 0.7], raccoon: ["fox", "raccoon", 0.4],
reindeer: ["stag", "reindeer", 1.75], moose: ["stag", "moose", 2.5], spiritstag: ["stag", "spirit-stag", 2.3],
bull: ["cow", "bull", 1.75],
goblin: ["imp", "goblin", 1.25], orc: ["ogre", "orc", 2.0], skeleton: ["troll", "skeleton-warrior", 1.85]
};
Object.keys(G3D_NEW).forEach(function (k) { var N = G3D_NEW[k]; if (!CRX_PLANS[k] && CRX_PLANS[N[0]])
CRX_PLANS[k] = function () { return CRX_PLANS[N[0]](); }; });
(function () {
if (typeof C !== "function" || typeof CREATURE === "undefined")
return;
var W = { zebra: ["zebra", "zebras", "a herd of zebra"], giraffe: ["giraffe", "giraffes"], llama: ["llama", "llamas", "alpaca"],
rhino: ["rhino", "rhinos", "rhinoceros"], hippo: ["hippo", "hippos", "hippopotamus"], panda: ["panda", "pandas", "giant panda"],
cheetah: ["cheetah", "cheetahs"], whitetiger: ["white tiger", "white tigers"], sabertooth: ["sabertooth", "sabre-toothed tiger", "saber-toothed cat", "smilodon"],
lynx: ["lynx", "bobcat"], raccoon: ["raccoon", "raccoons"], reindeer: ["reindeer", "caribou"], moose: ["moose", "elk"],
spiritstag: ["spirit stag", "the white stag", "ghost stag"], bull: ["bull", "a bull", "bulls", "the bull"] };
var night = { rhino: 1, sabertooth: 1, whitetiger: 1, cheetah: 1, moose: 1, bull: 1 };
Object.keys(W).forEach(function (k) {
if (CREATURE[k])
return;
try {
C(k, W[k], "beast", { col: 0x9A8A72, s: G3D_NEW[k][2] / 1.2, roam: 1, night: night[k] ? 1 : 0 });
}
catch (e) { }
});
if (typeof CRX_ARCH !== "undefined")
Object.keys(W).forEach(function (k) { if (!CRX_ARCH[k])
CRX_ARCH[k] = [k, 1]; });
})();
var G3D_ZOO = { lion: ["lion", 1.2], lioness: ["lion", 1.02], tiger: ["tiger", 1.1], bear: ["bear", 1.45], elephant: ["elephant", 3.2],
giraffe: ["giraffe", 5.0], zebra: ["zebra", 1.5], hippo: ["hippo", 1.55] };
(function () {
if (typeof kzaHerd !== "function" || typeof kzaTick !== "function")
return;
var herd = kzaHerd, tick = kzaTick;
kzaHerd = function (G, kind, n, area, o) {
var Z = G3D_ZOO[kind], H = herd.apply(this, arguments);
if (!H || !Z || G3D.off || window.G3D_OFF || typeof crxOn !== "function" || !crxOn())
return H;
try {
if (H.parts.eyes)
G.remove(H.parts.eyes);
H.G = new THREE.Group();
H.real = [];
H.list.forEach(function (A) {
var c = crxBuild(Z[0], { g3dH: Z[1] });
if (!c)
return;
var w = new THREE.Group();
w.name = "g3d-zoo-" + kind;
w.add(c);
w.scale.setScalar(A.sc / (H.sc || 1));
w.userData.noCull = true;
G.add(w);
H.real.push([A, w]);
});
}
catch (e) {
if (window.CRX_DEBUG)
console.warn("[g3d zoo]", e);
}
return H;
};
kzaTick = function (dt, near) {
tick.apply(this, arguments);
if (typeof KZA_ALL === "undefined")
return;
KZA_ALL.forEach(function (H) {
if (!H.real)
return;
H.real.forEach(function (R) {
var A = R[0], w = R[1];
w.visible = !!near;
if (!near)
return;
var y = (H.o.ground ? H.o.ground(A.x, A.z) : kzHeight(A.x, A.z)) - A.sink * A.sc * 0.6;
w.position.set(A.x, y, A.z);
w.rotation.y = A.yaw;
});
});
};
})();
var G3D_SPECIES = { goblin: "goblin", orc: "orc", skeleton: "skeleton" };
(function () {
if (typeof crxPlanOfKind !== "function")
return;
var of = crxPlanOfKind;
crxPlanOfKind = function (K) { if (K && K.body === "person" && G3D_SPECIES[K.species] && !G3D.off && !window.G3D_OFF && !K.cyborg)
return G3D_SPECIES[K.species]; return of.apply(this, arguments); };
})();
var G3D_PET = { dog: ["dog", 0.62], cat: ["cat", 0.3], fox: ["fox", 0.5], raccoon: ["raccoon", 0.38], lynx: ["lynx", 0.62], wolfpup: ["wolf", 0.5],
bearcub: ["bear", 0.5], tigercub: ["tiger", 0.55], pandacub: ["panda", 0.55] };
var G3D_PET_NEW = [["raccoon", "Raccoon", "🦝"], ["lynx", "Lynx", "🐈"], ["wolfpup", "Wolf pup", "🐺"], ["bearcub", "Bear cub", "🐻"], ["tigercub", "Tiger cub", "🐯"], ["pandacub", "Panda cub", "🐼"]];
(function () {
if (typeof PT_KINDS !== "undefined")
G3D_PET_NEW.forEach(function (K) { if (!PT_KINDS.some(function (x) { return x[0] === K[0]; }))
PT_KINDS.push(K); });
if (typeof PT_COLOURS !== "undefined")
G3D_PET_NEW.forEach(function (K) { if (!PT_COLOURS[K[0]])
PT_COLOURS[K[0]] = ["#A07850"]; });
if (typeof ptBuild !== "function")
return;
var pb = ptBuild;
ptBuild = function (kind, colour) {
var P = G3D_PET[kind], real = P && !G3D.off && !window.G3D_OFF && typeof crxBuild === "function" && typeof crxOn === "function" && crxOn();
if (!real)
return pb.apply(this, G3D_PET_NEW.some(function (K) { return K[0] === kind; }) ? ["dog", colour] : arguments);
try {
var c = crxBuild(P[0], { g3dH: P[1] });
if (!c)
return pb.apply(this, arguments);
var I = c.userData.crx;
if (I && !I.g3d) {
c.updateMatrixWorld(true);
var bb = new THREE.Box3().setFromObject(c), hh = bb.max.y - bb.min.y;
if (hh > 0.01)
c.scale.setScalar(P[1] / hh);
var w = setInterval(function () { if (I.g3d) {
c.scale.setScalar(1);
clearInterval(w);
} }, 400);
setTimeout(function () { clearInterval(w); }, 60000);
}
var g = new THREE.Group(), body = new THREE.Group();
body.add(c);
g.add(body);
g.userData.body = body;
g.userData.kind = kind;
g.userData.legs = null;
g.userData.g3dPet = 1;
return g;
}
catch (e) {
return pb.apply(this, arguments);
}
};
})();
(function () {
if (typeof RIDE_SEAT === "undefined")
return;
var S = { zebra: 1.1, moose: 1.75, reindeer: 1.15, rhino: 1.5, llama: 1.05, giraffe: 2.7, sabertooth: 0.95, whitetiger: 0.85, bull: 1.35, spiritstag: 1.45 };
Object.keys(S).forEach(function (k) { if (RIDE_SEAT[k] === undefined)
RIDE_SEAT[k] = S[k]; });
})();
(function () { if (typeof PT_MOUNTS !== "undefined")
["llama", "bull", "reindeer", "moose", "zebra", "spiritstag", "sabertooth", "whitetiger", "rhino", "giraffe"].forEach(function (k) { if (PT_MOUNTS.indexOf(k) < 0)
PT_MOUNTS.push(k); }); })();
var SF_CARS = "sketchfab/cars/";
var SF_CAR_OF = { car: ["negotiator-80", "fairheaven-lt-80", "phoenix-455-71", "doutrive-78"], coupe: ["phoenix-455-71"], sportscar: ["cyberpunk-car"],
roadster: ["coupe-33-hotrod"], vintagecar: ["coupe-33-hotrod"], van: ["shvan-92"], truck: ["lct-3000-95", "lightbody-lifted-85"] };
function sfCarsPatch(M) {
if (!M || !M.a || M.sfCars || G3D.off || window.G3D_OFF)
return;
M.sfCars = 1;
Object.keys(SF_CAR_OF).forEach(function (k) {
var e = M.a[k] || { fit: "stretch", t: 0.75 };
e.f = SF_CAR_OF[k].map(function (n) { return SF_CARS + n + ".glb"; });
e.lic = "CC-BY-4.0";
e.fit = "stretch";
M.a[k] = e;
});
}
(function () {
if (typeof modelsManifest === "function") {
var mm = modelsManifest;
modelsManifest = function (cb) { return mm.call(this, function (M) { try {
sfCarsPatch(M);
}
catch (e) { } return cb(M); }); };
}
if (typeof modelPick === "function") {
var mp = modelPick;
modelPick = function (e, spec) {
var f = mp.apply(this, arguments);
try {
if (typeof f === "string" && f.indexOf(SF_CARS) === 0 && typeof crxLite === "function" && crxLite())
f = f.replace(/\.glb$/, "-lite.glb");
}
catch (x) { }
return f;
};
}
})();
var G3D_CREDITS = [
["People and creatures", "Grab3D", "Realistic animals, monsters and people (each given a skeleton here)", "CC0 1.0 (public domain)", "https://grab3d.com"],
["Buildings, furniture and things", "Daniel Zhabotinsky (Sketchfab)", "Motor cars: Negotiator '80, Fairheaven LT '80, Phoenix 455 '71, Doutrive '78, Lightbody Lifted '85, Shvan '92, LCT 3000 '95, Coupe '33 Hot Rod #2, MD '84 Armored", "CC BY 4.0", "https://sketchfab.com/DanielZhabotinsky"],
["Buildings, furniture and things", "3d_Bob (Sketchfab)", "Cyberpunk car", "CC BY 4.0", "https://sketchfab.com/3d_Bob"],
["People and creatures", "WildMesh 3D (Sketchfab)", "Realistic animated bear, elk, doe and donkey, with their own moves", "CC BY 4.0", "https://sketchfab.com/WildMesh_3D"],
["Buildings, furniture and things", "Swiss_Fox (Sketchfab)", "Jester Butane Reworked (Death Races buggy)", "CC BY 4.0", "https://sketchfab.com/Swiss_Fox"],
["Buildings, furniture and things", "Rzyas (Sketchfab)", "Buggy_2 (Death Races buggy)", "CC BY 4.0", "https://sketchfab.com/rzyas"],
["Buildings, furniture and things", "ferofluid (Sketchfab)", "Green Bug Stylized Scifi Car (Death Races bubble car)", "CC BY 4.0", "https://sketchfab.com/ferofluid"],
["Buildings, furniture and things", "seangorman (Sketchfab)", "Zombie Pickup Truck (Death Races van)", "CC BY 4.0", "https://sketchfab.com/seangorman"]
];
(function () {
if (typeof CRD_DEFAULT !== "undefined" && CRD_DEFAULT.list)
G3D_CREDITS.forEach(function (r) { if (!CRD_DEFAULT.list.some(function (x) { return x[1] === r[1] && x[2] === r[2]; }))
CRD_DEFAULT.list.push(r); });
if (typeof crdUse === "function") {
var cu = crdUse;
crdUse = function (v) {
var D = cu.apply(this, arguments);
try {
if (D && D.list && D !== CRD_DEFAULT) {
D = { intro: D.intro, list: D.list.slice() };
G3D_CREDITS.forEach(function (r) { if (!D.list.some(function (x) { return x[1] === r[1] && x[2] === r[2]; }))
D.list.push(r); });
}
}
catch (e) { }
return D;
};
}
})();
var PY_REAL = { buggy: ["buggy-2", "jester-butane"], bubble: ["green-bug"], muscle: ["cyberpunk-car", "phoenix-455-71"],
van: ["md-84-armored", "zombie-pickup"], roadster: ["coupe-33-hotrod"] };
var PY_REAL_OPEN = { buggy: 1 };
(function () {
if (typeof pyBuildCar !== "function" || typeof pyFitArms !== "function")
return;
var b0 = pyBuildCar, a0 = pyFitArms;
pyFitArms = function (g) { if (g && g.userData)
g.userData.pyArmsFrom = g.children.length; return a0.apply(this, arguments); };
pyBuildCar = function (car, opt) {
var g = b0.apply(this, arguments);
try {
var L = car && PY_REAL[car.style];
if (!L || G3D.off || window.G3D_OFF || typeof modelFile !== "function" || !modelsOn())
return g;
var lite = !!((opt && opt.lite) || (typeof PY !== "undefined" && PY.lite) || crxLite());
var file = SF_CARS + L[(car.i || 0) % L.length] + (lite ? "-lite" : "") + ".glb", S = PY_STYLE[car.style];
var keep = g.children.length, from = g.userData.pyArmsFrom || keep;
modelFile(file, function (F) {
if (!F.scene || g.userData.pyReal)
return;
var m = F.scene.clone(true), B = new THREE.Box3().setFromObject(m), sz = new THREE.Vector3();
B.getSize(sz);
if (!(sz.z > 0.1))
return;
var top = 0;
S.top.forEach(function (p) { top = Math.max(top, p[1]); });
var k = S.L / sz.z, kx = Math.min(1.15, Math.max(0.85, S.W * (S.wide || 1) / (sz.x * k))), ky = Math.min(1.15, Math.max(0.85, (top + 0.15) / (sz.y * k)));
m.scale.set(k * kx, k * ky, k);
m.position.y = -B.min.y * k * ky;
m.traverse(function (o) { if (o.isMesh) {
o.raycast = function () { };
o.castShadow = !lite;
} });
for (var i = 0; i < from; i++) {
var c = g.children[i];
if (c === g.userData.cockpit && PY_REAL_OPEN[car.style])
continue;
c.visible = false;
}
g.add(m);
g.userData.pyReal = m;
});
}
catch (e) { }
return g;
};
})();
var WMESH = { dir: "assets/models/sketchfab/animals/", files: {},
of: { bear: ["wm-bear", "bear", 1.15], elk: ["wm-elk", "stag", 2.05], doe: ["wm-doe", "stag", 1.3], donkey: ["wm-donkey", "horse", 1.4, -Math.PI / 2] } };
function wmFile(name, cb) { return __ZC(497, 43, this, arguments, new.target); }
function wmMeasure(body, mix, F) { return __ZC(497, 44, this, arguments, new.target); }
function wmSwap(g, kind, realH) { return __ZC(497, 45, this, arguments, new.target); }
function wmPlay(I, n, fade) {
var M = I.wm, a = M.acts[n];
if (!a || M.cur === n)
return;
var was = M.cur && M.acts[M.cur];
a.reset();
a.enabled = true;
a.setEffectiveWeight(1);
a.play();
if (was && fade)
a.crossFadeFrom(was, fade, false);
else if (was)
was.stop();
M.cur = n;
}
function wmTick(I) { return __ZC(497, 46, this, arguments, new.target); }
(function () {
if (typeof crxTick !== "function")
return;
var t0 = crxTick;
crxTick = function (I) { var r = t0.apply(this, arguments); if (I && I.wm)
try {
wmTick(I);
}
catch (e) { } return r; };
})();
(function () {
if (typeof crxBuild !== "function")
return;
if (typeof G3D_OF !== "undefined")
delete G3D_OF.bear;
Object.keys(WMESH.of).forEach(function (k) { var B = WMESH.of[k][1]; if (typeof CRX_PLANS !== "undefined" && !CRX_PLANS[k] && CRX_PLANS[B])
CRX_PLANS[k] = function () { return CRX_PLANS[B](); }; });
var build = crxBuild;
crxBuild = function (key, opt) {
var W = WMESH.of[key], real = W && !G3D.off && !window.G3D_OFF && typeof modelsLoader === "function";
var g = build(real && key !== "bear" ? W[1] : key, opt);
try {
if (g && real) {
if (key !== "bear")
crxPlan(key);
wmSwap(g, key, opt && opt.g3dH);
}
}
catch (e) { }
return g;
};
})();
(function () {
if (typeof C !== "function" || typeof CREATURE === "undefined")
return;
var W = { elk: ["elk", "elks", "wapiti", "bull elk"], doe: ["doe", "does", "a hind", "fawn"], donkey: ["donkey", "donkeys", "burro", "mule"] };
Object.keys(W).forEach(function (k) { if (CREATURE[k])
return; try {
C(k, W[k], "beast", { col: 0x8A7A62, s: WMESH.of[k][2] / 1.2, roam: 1 });
}
catch (e) { } });
if (typeof CRX_ARCH !== "undefined")
Object.keys(W).forEach(function (k) { if (!CRX_ARCH[k])
CRX_ARCH[k] = [k, 1]; });
})();
(function () {
if (typeof RIDE_SEAT !== "undefined") {
if (RIDE_SEAT.donkey === undefined)
RIDE_SEAT.donkey = 1.0;
if (RIDE_SEAT.elk === undefined)
RIDE_SEAT.elk = 1.45;
}
if (typeof PT_MOUNTS !== "undefined")
["donkey", "elk"].forEach(function (k) { if (PT_MOUNTS.indexOf(k) < 0)
PT_MOUNTS.push(k); });
})();
var CRX_DOORKEYS = { "neverland": ["dog"], "sea": ["dog", "goat", "sheep", "lion", "pig", "horse", "cow"], "greenwold": ["cow", "sheep", "goat", "pig", "horse"], "kidszone": ["unicorn", "pegasus", "stag", "fox", "rabbit", "kitsune", "sheep", "goat", "lion", "horse", "elephant", "bear", "tiger"], "guildlands": ["stag", "fox", "horse", "dog"], "erebos": ["chimera", "hellhound", "bear", "boar"], "wonders": ["camel", "horse", "cow", "sheep"], "delve": ["troll", "ghost"] };
var CRXD = { seen: {}, n: 0, cap: 30 };
function crxdLearned() { try {
return JSON.parse(localStorage.getItem("crx_world_keys") || "{}") || {};
}
catch (e) {
return {};
} }
function crxdKeysFor(w) { var a = (CRX_DOORKEYS[w] || []).slice(), L = crxdLearned()[w] || []; L.forEach(function (k) { if (a.indexOf(k) < 0)
a.push(k); }); return a; }
(function () {
if (typeof worldGo !== "function")
return;
var g0 = worldGo;
worldGo = function (key) {
var before = null;
try {
if (typeof CRX !== "undefined" && WORLDS[key] && !WORLDS[key].g)
before = Object.keys(CRX.geo);
}
catch (e) { }
var r = g0.apply(this, arguments);
try {
if (before) {
var had = {};
before.forEach(function (k) { had[k] = 1; });
var used = Object.keys(CRX.geo).filter(function (k) { return !had[k]; });
var old = crxDoorWorldKeysUsed(key);
old.forEach(function (k) { if (used.indexOf(k) < 0)
used.push(k); });
if (used.length) {
var L = crxdLearned();
L[key] = used.slice(0, 40);
localStorage.setItem("crx_world_keys", JSON.stringify(L));
}
}
}
catch (e) { }
return r;
};
})();
function crxDoorWorldKeysUsed(key) { var a = crxdLearned()[key]; return Array.isArray(a) ? a : []; }
setInterval(function () {
try {
if (typeof crxWarm !== "function" || typeof WFD === "undefined" || !WFD.doors || !WFD.g || !WFD.g.visible)
return;
if (typeof WLD !== "undefined" && WLD.on)
return;
var P = camera.position, best = null, bd = 26;
for (var i = 0; i < WFD.doors.length; i++) {
var d = WFD.doors[i], dd = Math.hypot(d.x - P.x, d.z - P.z);
if (dd < bd) {
bd = dd;
best = d;
}
}
if (!best || CRXD.seen[best.D.k])
return;
CRXD.seen[best.D.k] = 1;
var keys = crxdKeysFor(best.D.k).filter(function (k) { return !CRX.geo[k]; });
keys = keys.slice(0, Math.max(0, CRXD.cap - CRXD.n));
CRXD.n += keys.length;
if (keys.length)
crxWarm(keys);
}
catch (e) { }
}, 700);
