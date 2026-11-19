/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WH = { cache: {}, mats: {}, tex: {}, n: 0, fails: 0 };
var WH_UP = new THREE.Vector3(0, 1, 0), WH_X = new THREE.Vector3(1, 0, 0), WH_Z = new THREE.Vector3(0, 0, 1);
function whRegion(n) {
n = String(n || "");
if (/^(pelvis|hips|spine(_0\d)?|abdomen|chest|torso|body|clavicle_[lr]|shoulder\.[lr])$/i.test(n))
return "torso";
if (/^neck/i.test(n))
return "neck";
if (/^head$/i.test(n))
return "head";
var m = /^(upperarm|lowerarm|hand|wrist|thigh|upperleg|calf|lowerleg|foot|ball|toes)[_.]([lr])$/i.exec(n);
if (m) {
var k = m[1].toLowerCase();
k = { wrist: "hand", upperleg: "thigh", lowerleg: "calf", toes: "foot", ball: "foot" }[k] || k;
return k + "_" + m[2].toLowerCase();
}
var f = /^(index|middle|ring|pinky|thumb)\w*?[_.]([lr])$/i.exec(n);
if (f)
return "fingers_" + f[2].toLowerCase();
return "other";
}
var WH_LM = { pelvis: /^(pelvis|hips)$/i, waist: /^(spine_01|spine|abdomen)$/i, spine2: /^(spine_02|chest|torso)$/i, chest: /^(spine_03|chest|torso)$/i,
neck: /^(neck_01|neck)$/i, head: /^head$/i };
["l", "r"].forEach(function (s) {
WH_LM["upperarm_" + s] = new RegExp("^upperarm[_.]" + s + "$", "i");
WH_LM["lowerarm_" + s] = new RegExp("^lowerarm[_.]" + s + "$", "i");
WH_LM["hand_" + s] = new RegExp("^(hand_" + s + "|wrist\\." + s + ")$", "i");
WH_LM["finger_" + s] = new RegExp("^(middle_02_" + s + "|middle2\\." + s + "|hand\\." + s + ")$", "i");
WH_LM["thigh_" + s] = new RegExp("^(thigh_" + s + "|upperleg\\." + s + ")$", "i");
WH_LM["calf_" + s] = new RegExp("^(calf_" + s + "|lowerleg\\." + s + ")$", "i");
WH_LM["foot_" + s] = new RegExp("^foot[_.]" + s + "$", "i");
WH_LM["ball_" + s] = new RegExp("^(ball_" + s + "|toes\\." + s + ")$", "i");
});
function whHost(root) { var h = null; root.traverse(function (m) { if (m.isSkinnedMesh && m.skeleton && (!h || m.skeleton.bones.length > h.skeleton.bones.length))
h = m; }); return h; }
function whMeasure(root) {
var host = whHost(root);
if (!host)
return null;
var HB = host.skeleton.bones, idx = {};
HB.forEach(function (b, i) { if (idx[b.name] == null)
idx[b.name] = i; });
var V = [], v = new THREE.Vector3(), lo = 1e9, hi = -1e9;
root.traverse(function (m) {
if (!m.isSkinnedMesh || !m.visible || !m.skeleton)
return;
var G = m.geometry, P = G.attributes.position, SI = G.attributes.skinIndex, SW = G.attributes.skinWeight;
if (!P || !SI || !SW)
return;
var hair = !!m.userData.hdfHair || /hair|beard|eyebrow|eyes/i.test(m.name), skull = /Superhero/i.test(m.name), mb = m.skeleton.bones;
var step = Math.max(1, Math.floor(P.count / 8000));
var over = typeof whOverOf === "function" ? whOverOf(m) : null;
for (var i = 0; i < P.count; i += step) {
v.fromBufferAttribute(P, i).applyMatrix4(m.bindMatrix);
var b = [0, 0, 0, 0], w = [0, 0, 0, 0], bw = -1, bn = "";
for (var k = 0; k < 4; k++) {
var wk = rlC(SW, i, k), bo = mb[rlC(SI, i, k)];
if (!bo || !wk)
continue;
var j = idx[bo.name];
if (j == null)
continue;
b[k] = j;
w[k] = wk;
if (wk > bw) {
bw = wk;
bn = bo.name;
}
}
if (bw < 0)
continue;
V.push({ x: v.x, y: v.y, z: v.z, b: b, w: w, r: whRegion(bn), hair: hair, skull: skull, over: over && over(i) ? 1 : 0 });
if (v.y < lo)
lo = v.y;
if (v.y > hi)
hi = v.y;
}
});
if (V.length < 200)
return null;
var LM = {}, mt = new THREE.Matrix4();
HB.forEach(function (b, i) { if (LM[b.name])
return; mt.copy(host.skeleton.boneInverses[i]).invert(); LM[b.name] = new THREE.Vector3().setFromMatrixPosition(mt); });
var D = { V: V, LM: LM, idx: idx, names: HB.map(function (b) { return b.name; }), inv: host.skeleton.boneInverses.map(function (q) { return q.clone(); }), lo: lo, hi: hi };
D.s = Math.max(0.3, (hi - lo) / 1.84);
return D;
}
function whBone(D, key) { var rx = WH_LM[key]; if (!rx)
return null; for (var i = 0; i < D.names.length; i++)
if (rx.test(D.names[i]))
return D.names[i]; return null; }
function whLm(D, key) { var n = whBone(D, key); return n ? D.LM[n].clone() : null; }
function whPts(D, test) { var a = []; for (var i = 0; i < D.V.length; i++) {
var q = D.V[i];
if (!q.hair && test(q))
a.push(new THREE.Vector3(q.x, q.y, q.z));
} return a; }
function whTuck(R, pts, over, O, L, gap, minR, s, seat) {
var NS = R.length, NA = R[0].length, M = [], N = [], B = [], i, j;
for (i = 0; i < NS; i++) {
M.push(new Float32Array(NA));
N.push(new Float32Array(NA));
B.push(new Float32Array(NA));
}
function lay(A, list, near) {
list.forEach(function (p) {
var t = (p.y - O.y) / L;
if (t < -0.08 || t > 1.08)
return;
var k = Math.max(0, Math.min(NS - 1, Math.round(t * (NS - 1)))), x = p.x - O.x, z = p.z - O.z, r = Math.hypot(x, z), b = Math.round((Math.atan2(z, x) / (Math.PI * 2) + 1) * NA) % NA;
for (var e = -1; e <= 1; e++) {
var bb = (b + e + NA) % NA;
if (near ? (!A[k][bb] || r < A[k][bb]) : r > A[k][bb])
A[k][bb] = r;
}
});
}
lay(M, over);
lay(N, over, true);
lay(B, pts);
if (seat) {
var Q = [], has = [];
for (i = 0; i < NS; i++) {
var known = [], any = 0, row2 = new Float32Array(NA);
for (j = 0; j < NA; j++) {
known[j] = 1;
var nn = N[i][j] || N[Math.min(NS - 1, i + 1)][j] || N[Math.max(0, i - 1)][j];
if (B[i][j] > 0) {
row2[j] = B[i][j];
any++;
}
else if (nn > 0) {
row2[j] = Math.max(nn - gap - 0.03 * s, minR);
any++;
}
else
known[j] = 0;
}
if (any >= NA / 3)
for (j = 0; j < NA; j++) {
if (known[j])
continue;
var da = 1, db = 1;
while (da < NA && !known[(j + NA - da) % NA])
da++;
while (db < NA && !known[(j + db) % NA])
db++;
row2[j] = (row2[(j + NA - da) % NA] * db + row2[(j + db) % NA] * da) / (da + db);
}
Q.push(row2);
has.push(any >= NA / 3);
}
if (has.some(Boolean)) {
for (i = 0; i < NS; i++) {
if (has[i])
continue;
var src = null;
for (var q2 = 1; q2 < NS && !src; q2++) {
if (i - q2 >= 0 && has[i - q2])
src = Q[i - q2];
else if (i + q2 < NS && has[i + q2])
src = Q[i + q2];
}
Q[i] = src;
}
for (i = 0; i < NS; i++)
for (j = 0; j < NA; j++) {
var l2 = Q[i][(j + NA - 1) % NA], r2 = Q[i][(j + 1) % NA];
R[i][j] = Math.min(R[i][j], Math.max(minR, (l2 + Q[i][j] * 2 + r2) / 4));
}
}
for (var ps = 0; ps < 3; ps++) {
var R3 = R.map(function (r0, i2) { return r0.map(function (r, j2) { var up = R[Math.min(NS - 1, i2 + 1)][j2], dn = R[Math.max(0, i2 - 1)][j2], l = r0[(j2 + NA - 1) % NA], rr = r0[(j2 + 1) % NA]; return Math.min(r, (up + dn + l + rr + r * 4) / 8); }); });
for (i = 0; i < NS; i++)
for (j = 0; j < NA; j++)
R[i][j] = Math.max(R3[i][j], minR);
}
return R;
}
for (i = 0; i < NS; i++) {
var row = M[i], n = 0;
for (j = 0; j < NA; j++)
if (row[j] > 0)
n++;
if (n < NA / 4)
continue;
var F = new Float32Array(NA), Fn = new Float32Array(NA), nr = N[i];
for (j = 0; j < NA; j++) {
if (row[j] > 0) {
F[j] = row[j];
Fn[j] = nr[j];
continue;
}
var a = 0, b2 = 0, da = 0, db = 0;
for (da = 1; da < NA; da++) {
a = row[(j + NA - da) % NA];
if (a > 0)
break;
}
for (db = 1; db < NA; db++) {
b2 = row[(j + db) % NA];
if (b2 > 0)
break;
}
F[j] = (a * db + b2 * da) / (da + db);
Fn[j] = (nr[(j + NA - da) % NA] * db + nr[(j + db) % NA] * da) / (da + db);
}
for (j = 0; j < NA; j++) {
if (!(F[j] > B[i][j]))
continue;
var lim = Math.max(Fn[j] - gap - 0.012 * s, minR * 0.6);
if (R[i][j] > lim)
R[i][j] = lim;
}
}
var R2 = R.map(function (r0, i2) { return r0.map(function (r, j2) { var up = R[Math.min(NS - 1, i2 + 1)][j2], dn = R[Math.max(0, i2 - 1)][j2], l = r0[(j2 + NA - 1) % NA], rr = r0[(j2 + 1) % NA]; return Math.min(r, (up + dn + l + rr + r * 4) / 8); }); });
for (i = 0; i < NS; i++)
for (j = 0; j < NA; j++)
R[i][j] = Math.max(R2[i][j], minR * 0.6);
return R;
}
function whUnder(D, test) {
var all = whPts(D, test), body = [], over = [];
for (var i = 0; i < D.V.length; i++) {
var q = D.V[i];
if (q.hair || !test(q))
continue;
(q.over ? over : body).push(new THREE.Vector3(q.x, q.y, q.z));
}
if (!over.length || body.length < 40)
return { pts: all, over: null, hem: null };
var cx = 0, cz = 0, NA = 24, low = [], hs = [];
body.forEach(function (p) { cx += p.x; cz += p.z; });
cx /= body.length;
cz /= body.length;
over.forEach(function (p) { var b = Math.round((Math.atan2(p.z - cz, p.x - cx) / (Math.PI * 2) + 1) * NA) % NA; if (low[b] == null || p.y < low[b])
low[b] = p.y; });
for (var j = 0; j < NA; j++)
if (low[j] != null)
hs.push(low[j]);
hs.sort(function (a, b) { return a - b; });
return { pts: body, over: over, hem: hs.length >= NA / 2 ? hs[Math.floor(hs.length / 2)] : null };
}
function whTube(D, pts, y0, y1, gap, prof, open, NS, hang, over, seat) {
var s = D.s, cx = 0, cz = 0, n = 0;
pts.forEach(function (p) { if (p.y > y0 && p.y < y1) {
cx += p.x;
cz += p.z;
n++;
} });
if (n) {
cx /= n;
cz /= n;
}
var O = new THREE.Vector3(cx, y0, cz), L = y1 - y0;
if (!(L > 0.01))
return null;
var R = rlFitRadii(pts, O, WH_UP, WH_X, WH_Z, L, 0, 1, NS || 12, 32, 0.05 * s);
if (over && over.length)
R = whTuck(R, pts, over, O, L, gap * s, 0.05 * s, s, seat);
if (hang)
R = whHang(R);
var arc = open ? [Math.PI / 2 + open / 2, Math.PI / 2 + Math.PI * 2 - open / 2] : null;
var g = rlFitShell(O, WH_UP, WH_X, WH_Z, L, 0, 1, R, gap * s, prof, arc);
return { geo: g, O: O, L: L, R: R, arc: arc, gap: gap * s, prof: prof };
}
function whHang(R) {
var NA = R[0].length;
R = R.map(function (row) {
var P = row.map(function (r, j) { var a = j / NA * Math.PI * 2; return [Math.cos(a) * r, Math.sin(a) * r]; });
var H = P.map(function (p, j) { return j; }), changed = true;
while (changed && H.length > 3) {
changed = false;
for (var k = 0; k < H.length && H.length > 3; k++) {
var a = P[H[(k + H.length - 1) % H.length]], b = P[H[k]], c = P[H[(k + 1) % H.length]];
if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) <= 0) {
H.splice(k, 1);
k--;
changed = true;
}
}
}
return row.map(function (r, j) {
var a = j / NA * Math.PI * 2, dx = Math.cos(a), dz = Math.sin(a), best = r;
for (var k = 0; k < H.length; k++) {
var p = P[H[k]], q = P[H[(k + 1) % H.length]], ex = q[0] - p[0], ez = q[1] - p[1], den = dx * ez - dz * ex;
if (Math.abs(den) < 1e-9)
continue;
var t = (p[0] * ez - p[1] * ex) / den, u = (p[0] * dz - p[1] * dx) / den;
if (t > 0 && u >= -1e-6 && u <= 1 + 1e-6 && t > best)
best = t;
}
return best;
});
});
for (var i = R.length - 2; i >= 0; i--)
for (var j = 0; j < NA; j++)
if (R[i + 1][j] > R[i][j])
R[i][j] = R[i + 1][j];
return R;
}
function whLimb(D, a, b, regions, t0, t1, gap, prof, arc, minR, close) {
var O = whLm(D, a), C = whLm(D, b);
if (!O || !C)
return null;
var d = C.clone().sub(O), L = d.length();
if (!(L > 0.02))
return null;
var ax = d.normalize(), A = rlFitAxes(ax);
var pts = whPts(D, function (q) { return regions.test(q.r); });
if (pts.length < 12)
return null;
var R = rlFitRadii(pts, O, ax, A.u, A.w, L, t0, t1, 9, 20, (minR || 0.025) * D.s);
if (close)
R = R.map(function (row, i) { var k = close[i]; return k == null ? row : row.map(function (r) { return r * k; }); });
var sd = (/_([lr])$/.exec(a) || [])[1], sk = null;
if (sd)
sk = { allow: /^(upperarm|lowerarm|hand)/.test(a) ? new RegExp("^(torso|upperarm_" + sd + "|lowerarm_" + sd + "|hand_" + sd + "|fingers_" + sd + ")$") : new RegExp("^(thigh_" + sd + "|calf_" + sd + "|foot_" + sd + ")$") };
return { geo: rlFitShell(O, ax, A.u, A.w, L, t0, t1, R, gap * D.s, prof, arc), O: O, ax: ax, u: A.u, w: A.w, L: L, R: R, sk: sk };
}
function whYoke(D, T, yNeck, neckR, arc) {
var NA = 32, top = T.R[T.R.length - 1], pos = [], idx = [], ST = 5, y0 = T.O.y + T.L, s = D.s;
var a0 = arc ? arc[0] : 0, a1 = arc ? arc[1] : Math.PI * 2, na = arc ? Math.max(2, Math.round((a1 - a0) / (Math.PI * 2) * NA) + 1) : NA + 1;
function rad(R, a) { var f = (((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * NA, j = Math.floor(f), k = f - j; return R[j % NA] * (1 - k) + R[(j + 1) % NA] * k; }
for (var st = 0; st <= ST; st++) {
var f = st / ST, yy = y0 + (yNeck - y0) * f;
for (var j = 0; j < na; j++) {
var a = a0 + (a1 - a0) * j / (na - 1), r0 = rad(top, a) + T.gap + (T.prof ? T.prof(1, a) : 0), r1 = rad(neckR, a) + T.gap + 0.008 * s, r = r0 + (r1 - r0) * (1 - Math.cos(f * Math.PI / 2));
pos.push(T.O.x + Math.cos(a) * r, yy + Math.sin(f * Math.PI) * 0.01 * s, T.O.z + Math.sin(a) * r);
}
}
for (var s2 = 0; s2 < ST; s2++)
for (var j2 = 0; j2 < na - 1; j2++) {
var p = s2 * na + j2, q = p + na;
idx.push(p, q, p + 1, p + 1, q, q + 1);
}
var uv = [];
for (var i = 0; i < pos.length / 3; i++)
uv.push((i % na) / na * 3, Math.floor(i / na) / ST * 0.3);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
}
function whNeckR(D, yN) {
var s = D.s, pts = whPts(D, function (q) { return q.r === "neck" || (q.r === "head" && q.y < yN + 0.06 * s) || (q.r === "torso" && q.y > yN - 0.02 * s); }).filter(function (p) { return p.y > yN - 0.03 * s && p.y < yN + 0.06 * s; });
var cx = 0, cz = 0;
pts.forEach(function (p) { cx += p.x; cz += p.z; });
if (pts.length) {
cx /= pts.length;
cz /= pts.length;
}
var R = rlFitRadii(pts, new THREE.Vector3(cx, yN - 0.03 * s, cz), WH_UP, WH_X, WH_Z, 0.09 * s, 0, 1, 3, 32, 0.05 * s);
return { R: R[1].map(function (r) { return Math.min(r, 0.085 * s); }), cx: cx, cz: cz };
}
function whTubeAlong(pts, r, closed) { var c = new THREE.CatmullRomCurve3(pts, !!closed); return new THREE.TubeGeometry(c, Math.max(24, pts.length * 2), r, 6, !!closed); }
function whRingPts(cx, y, cz, R, extra, a0, a1, n, sag) {
var out = [];
n = n || 40;
var NA = R.length;
for (var k = 0; k <= n; k++) {
var a = a0 != null ? a0 + (a1 - a0) * k / n : k / n * Math.PI * 2, f = (((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * NA, j = Math.floor(f) % NA, r = R[j] + extra;
out.push(new THREE.Vector3(cx + Math.cos(a) * r, y - (sag ? sag * Math.max(0, Math.sin(a)) : 0), cz + Math.sin(a) * r));
}
return out;
}
function whPlace(g, pos, look, up) {
var o = new THREE.Object3D();
o.position.copy(pos);
if (look) {
o.lookAt(pos.clone().add(look));
}
if (up)
o.rotateZ(up);
o.updateMatrix();
g.applyMatrix4(o.matrix);
return g;
}
function whRAt(R, a) { var NA = R.length, f = (((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * NA, j = Math.floor(f), k = f - j; return R[j % NA] * (1 - k) + R[(j + 1) % NA] * k; }
function whGrid(D) {
if (D.grid)
return D.grid;
var c = 0.05 * D.s, G = { c: c, m: {}, n: new Map() };
D.V.forEach(function (q, i) {
if (q.hair)
return;
var x = Math.floor(q.x / c), y = Math.floor(q.y / c), z = Math.floor(q.z / c), k = x + "," + y + "," + z;
(G.m[k] || (G.m[k] = [])).push(i);
if (G.n) {
if (Math.abs(x) > 1000 || Math.abs(y) > 1000 || Math.abs(z) > 1000)
G.n = null;
else
G.n.set(whCell(x, y, z), G.m[k]);
}
});
return (D.grid = G);
}
function whCell(x, y, z) { return ((x + 1024) * 2048 + (y + 1024)) * 2048 + (z + 1024); }
var WH_ARMS = /^(upperarm|lowerarm|hand|fingers)_/, WH_LEGS = /^(thigh|calf|foot)_/;
function whLegSides(D) {
if (D.legI !== undefined)
return D.legI;
var a = whBone(D, "thigh_l"), b = whBone(D, "thigh_r");
D.legI = null;
if (!a || !b)
return null;
if (!D.reg) {
D.reg = {};
D.names.forEach(function (nm, i) { if (D.reg[i] == null)
D.reg[i] = whRegion(nm); });
}
var A = D.LM[a], B = D.LM[b];
if (!A || !B)
return null;
var ia = D.idx[a], ib = D.idx[b], hiA = A.x > B.x, ca = D.idx[whBone(D, "calf_l") || ""], cb = D.idx[whBone(D, "calf_r") || ""];
D.legI = { cx: (A.x + B.x) / 2, w: Math.max(0.02, Math.abs(A.x - B.x) * 0.9), hi: hiA ? ia : ib, lo: hiA ? ib : ia, hiC: hiA ? ca : cb, loC: hiA ? cb : ca };
return D.legI;
}
function whSkin(D, geo, o) {
o = o || {};
var G = whGrid(D), P = geo.attributes.position, n = P.count, SI = new Uint16Array(n * 4), SW = new Float32Array(n * 4), allow = o.allow || null;
var pel = D.idx[whBone(D, "pelvis") || ""], hips = o.hips || null, armY = o.armY != null ? o.armY : null, split = !!o.split, legI = split ? whLegSides(D) : null;
for (var i = 0; i < n; i++) {
var x = P.getX(i), y = P.getY(i), z = P.getZ(i), cx = Math.floor(x / G.c), cy = Math.floor(y / G.c), cz = Math.floor(z / G.c), best = [];
for (var r = 1; r <= 6 && best.length < 6; r++) {
best = [];
for (var a = -r; a <= r; a++)
for (var b = -r; b <= r; b++)
for (var c = -r; c <= r; c++) {
var L = G.n && Math.abs(cx) < 1000 && Math.abs(cy) < 1000 && Math.abs(cz) < 1000 ? G.n.get(whCell(cx + a, cy + b, cz + c)) : G.m[(cx + a) + "," + (cy + b) + "," + (cz + c)];
if (!L)
continue;
for (var t = 0; t < L.length; t++) {
var q = D.V[L[t]];
if (allow && !allow.test(q.r))
continue;
if (armY != null && y < armY && WH_ARMS.test(q.r))
continue;
var d = (q.x - x) * (q.x - x) + (q.y - y) * (q.y - y) + (q.z - z) * (q.z - z);
best.push([d, q]);
}
}
}
best.sort(function (p, q) { return p[0] - q[0]; });
best = best.slice(0, 6);
var acc = {};
best.forEach(function (e) { var wt = 1 / (Math.sqrt(e[0]) + 0.004); for (var k = 0; k < 4; k++)
if (e[1].w[k])
acc[e[1].b[k]] = (acc[e[1].b[k]] || 0) + e[1].w[k] * wt; });
if (split && legI) {
var wt2 = 0, wc2 = 0, kk2, rg2;
for (kk2 in acc) {
rg2 = D.reg[kk2] || "";
if (WH_LEGS.test(rg2)) {
if (/^thigh_/.test(rg2))
wt2 += acc[kk2];
else
wc2 += acc[kk2];
delete acc[kk2];
}
}
if (wt2 + wc2 > 0) {
var f = Math.max(0, Math.min(1, 0.5 + (x - legI.cx) / legI.w * 0.5));
f = f * f * (3 - 2 * f);
if (legI.hiC == null || legI.loC == null) {
wt2 += wc2;
wc2 = 0;
}
acc[legI.hi] = (acc[legI.hi] || 0) + wt2 * f;
acc[legI.lo] = (acc[legI.lo] || 0) + wt2 * (1 - f);
if (wc2 > 0) {
acc[legI.hiC] = (acc[legI.hiC] || 0) + wc2 * f;
acc[legI.loC] = (acc[legI.loC] || 0) + wc2 * (1 - f);
}
}
}
if (hips && pel != null) {
var keep = hips(y), tot = 0, kk;
for (kk in acc)
tot += acc[kk];
if (tot > 0) {
for (kk in acc)
acc[kk] *= (1 - keep);
acc[pel] = (acc[pel] || 0) + tot * keep;
}
}
var arr = Object.keys(acc).map(function (k) { return [+k, acc[k]]; }).sort(function (p, q) { return q[1] - p[1]; }).slice(0, 4), sum = 0;
arr.forEach(function (e) { sum += e[1]; });
if (!arr.length) {
arr = [[pel || 0, 1]];
sum = 1;
}
for (var k2 = 0; k2 < 4; k2++) {
SI[i * 4 + k2] = arr[k2] ? arr[k2][0] : 0;
SW[i * 4 + k2] = arr[k2] ? arr[k2][1] / sum : 0;
}
}
geo.setAttribute("skinIndex", new THREE.BufferAttribute(SI, 4));
geo.setAttribute("skinWeight", new THREE.BufferAttribute(SW, 4));
return geo;
}
function whMerge(list) {
list = list.filter(Boolean);
if (!list.length)
return null;
var pos = [], nor = [], uv = [], idx = [], si = [], sw = [], base = 0, hasSkin = !!list[0].attributes.skinIndex;
list.forEach(function (g) {
if (!g.attributes.normal)
g.computeVertexNormals();
var P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv, n = P.count;
for (var i = 0; i < n; i++) {
pos.push(P.getX(i), P.getY(i), P.getZ(i));
nor.push(N.getX(i), N.getY(i), N.getZ(i));
uv.push(U ? U.getX(i) : 0, U ? U.getY(i) : 0);
if (hasSkin) {
var A = g.attributes.skinIndex, B = g.attributes.skinWeight;
si.push(A.getX(i), A.getY(i), A.getZ(i), A.getW(i));
sw.push(B.getX(i), B.getY(i), B.getZ(i), B.getW(i));
}
}
if (g.index) {
var I = g.index;
for (var j = 0; j < I.count; j++)
idx.push(I.getX(j) + base);
}
else
for (var j2 = 0; j2 < n; j2++)
idx.push(j2 + base);
base += n;
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
G.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
if (hasSkin) {
G.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(si, 4));
G.setAttribute("skinWeight", new THREE.Float32BufferAttribute(sw, 4));
}
G.setIndex(base > 65000 ? new THREE.Uint32BufferAttribute(idx, 1) : new THREE.Uint16BufferAttribute(idx, 1));
G.computeBoundingSphere();
return G;
}
function whCanvas(key, w, h, fn) { if (WH.tex[key])
return WH.tex[key]; var c = document.createElement("canvas"); c.width = w; c.height = h; fn(c.getContext("2d"), w, h); var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (WH.tex[key] = t); }
function whRnd(i) { var s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
var WH_STUFF = {
cloth: function () {
return whCanvas("cloth", 128, 128, function (x, W, H) {
x.fillStyle = "#ddd";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 2) {
x.fillStyle = "rgba(255,255,255," + (0.05 + whRnd(y) * 0.08) + ")";
x.fillRect(0, y, W, 1);
}
for (var xx = 0; xx < W; xx += 2) {
x.fillStyle = "rgba(0,0,0," + (0.03 + whRnd(xx + 9) * 0.06) + ")";
x.fillRect(xx, 0, 1, H);
}
});
},
knit: function () {
return whCanvas("knit", 128, 128, function (x, W, H) {
x.fillStyle = "#ddd";
x.fillRect(0, 0, W, H);
for (var c = 0; c < W; c += 8)
for (var r = 0; r < H; r += 8) {
x.strokeStyle = "rgba(0,0,0,0.18)";
x.lineWidth = 1.5;
x.beginPath();
x.moveTo(c, r);
x.lineTo(c + 4, r + 8);
x.lineTo(c + 8, r);
x.stroke();
}
});
},
denim: function () {
return whCanvas("denim", 128, 128, function (x, W, H) {
x.fillStyle = "#ddd";
x.fillRect(0, 0, W, H);
for (var i = -H; i < W; i += 3) {
x.strokeStyle = "rgba(255,255,255," + (0.08 + whRnd(i) * 0.1) + ")";
x.lineWidth = 1;
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i + H, H);
x.stroke();
}
for (var k = 0; k < 300; k++) {
x.fillStyle = "rgba(255,255,255,0.08)";
x.fillRect(whRnd(k) * W, whRnd(k + 0.5) * H, 2, 1);
}
});
},
tartan: function () { return __ZC(265, 0, this, arguments, new.target); },
leather: function () {
return whCanvas("leather", 128, 128, function (x, W, H) {
x.fillStyle = "#ddd";
x.fillRect(0, 0, W, H);
for (var k = 0; k < 500; k++) {
x.fillStyle = "rgba(0,0,0," + (0.04 + whRnd(k) * 0.06) + ")";
x.beginPath();
x.arc(whRnd(k + 1) * W, whRnd(k + 2) * H, 1 + whRnd(k + 3) * 2, 0, 7);
x.fill();
}
});
}
};
var WH_SHADOW_OUT = 0.12;
function whShadowOut(sh) {
var c = THREE.ShaderChunk.shadowmap_vertex.split("shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias").join("shadowWorldNormal * ( directionalLightShadows[ i ].shadowNormalBias + " + WH_SHADOW_OUT.toFixed(3) + " )");
sh.vertexShader = sh.vertexShader.replace("#include <shadowmap_vertex>", c);
}
function whMatCompile(sh, r) { if (typeof TOON !== "undefined" && TOON && this.isMeshToonMaterial)
TOON.hook(sh, r); whShadowOut(sh); }
function whMat(kind, col) {
var key = kind + ":" + col;
if (WH.mats[key])
return WH.mats[key];
var M;
if (kind === "metal")
M = new THREE.MeshPhongMaterial({ color: col, shininess: 30, specular: 0x3A3A3A });
else if (kind === "gold")
M = new THREE.MeshPhongMaterial({ color: col, shininess: 90, specular: 0xFFE6A0 });
else if (kind === "gem")
M = new THREE.MeshPhongMaterial({ color: col, shininess: 120, specular: 0xFFFFFF, emissive: new THREE.Color(col).multiplyScalar(0.18) });
else {
var t = WH_STUFF[kind] ? WH_STUFF[kind]() : WH_STUFF.cloth();
var tt = WH.tex[kind + ":tiled"];
if (!tt) {
tt = t.clone();
tt.needsUpdate = true;
tt.repeat.set(kind === "tartan" ? 2 : 4, kind === "tartan" ? 2 : 4);
WH.tex[kind + ":tiled"] = tt;
}
M = new THREE.MeshLambertMaterial({ color: col, map: tt });
}
M.side = THREE.DoubleSide;
M.skinning = true;
M.onBeforeCompile = whMatCompile;
return (WH.mats[key] = M);
}
function whRigidMat(kind, col) { var key = "r:" + kind + ":" + col; if (WH.mats[key])
return WH.mats[key]; var M = whMat(kind, col).clone(); M.skinning = false; M.onBeforeCompile = whMatCompile; return (WH.mats[key] = M); }
function whCol(role, L) {
if (typeof role === "number")
return role;
var top = L.top != null ? L.top : 0x8E877B;
switch (role) {
case "layer": return L.layerColor != null ? L.layerColor : wshade(top, 0.62);
case "acc": return L.accColor != null ? L.accColor : 0x8A2E2E;
case "back": return L.backColor != null ? L.backColor : (L.back === "cloak" ? 0x3A2E26 : L.back === "backpack" ? 0x3A5A3A : 0x6A1A2A);
case "top": return top;
case "bottom": return L.bottom != null ? L.bottom : (L.bottomKind === "jeans" ? 0x3A5A8A : 0x77716A);
case "jeans": return L.bottom != null ? L.bottom : 0x3A5A8A;
case "shoes": return L.shoes != null ? L.shoes : 0x2A2420;
case "glove": return L.accColor != null ? L.accColor : 0x2A2420;
case "hat": return L.hatColor != null ? L.hatColor : 0x2A2A30;
case "darklayer": return wshade(whCol("layer", L), 0.78);
case "darkback": return wshade(whCol("back", L), 0.7);
case "darktop": return wshade(top, 0.75);
}
return 0x888888;
}
function whBuild(D, id) {
var s = D.s, P = [], yP = (whLm(D, "pelvis") || {}).y, yW = (whLm(D, "waist") || {}).y, yC = (whLm(D, "chest") || {}).y, yN = (whLm(D, "neck") || {}).y;
var ua = whLm(D, "upperarm_l"), th = whLm(D, "thigh_l"), cf = whLm(D, "calf_l"), ft = whLm(D, "foot_l");
if (yP == null || yW == null || yC == null || yN == null || !ua)
return P;
var yA = ua.y, yTop = Math.min(yA + 0.03 * s, yN - 0.04 * s), yKnee = cf ? cf.y : yP - 0.45 * s, yAnkle = ft ? ft.y + 0.06 * s : yP - 0.85 * s, yHipTop = th ? th.y : yP - 0.06 * s;
var TORSO = function (q) { return q.r === "torso" || (/^thigh_/.test(q.r) && q.y > yHipTop - 0.1 * s) || (q.r === "neck" && q.y < yN); };
function push(g, k, c, o) { if (g)
P.push({ g: g, k: k, c: c, skin: o || null }); }
function rigid(g, k, c, bone) { if (g && bone)
P.push({ g: g, k: k, c: c, bone: bone }); }
function torso(bot, gap, open, flare, col, k) {
var pts = whPts(D, TORSO);
var prof = function (t, a) { var y = bot + t * (yTop - bot); return (flare || 0) * s * Math.max(0, (yW - y) / Math.max(0.01, yW - bot)); };
var T = whTube(D, pts, bot, yTop, gap, prof, open, 14);
if (!T)
return null;
push(T.geo, k || "cloth", col, { armY: yA - 0.05 * s, split: true });
var NR = whNeckR(D, yN);
push(whYoke(D, T, yN, NR.R, T.arc), k || "cloth", col);
T.NR = NR;
return T;
}
function sleeves(col, gap, len, bell, k) {
["l", "r"].forEach(function (sd) {
var U = whLimb(D, "upperarm_" + sd, "lowerarm_" + sd, new RegExp("^upperarm_" + sd + "$"), -0.12, 1.04, gap, null, null, 0.035);
if (U)
push(U.geo, k || "cloth", col, U.sk);
if (len > 0) {
var Lw = whLimb(D, "lowerarm_" + sd, "hand_" + sd, new RegExp("^lowerarm_" + sd + "$"), -0.06, len, gap, bell ? function (t) { return bell * s * Math.max(0, t); } : null, null, 0.028);
if (Lw) {
push(Lw.geo, k || "cloth", col, Lw.sk);
if (!bell)
push(whTubeAlong(Lw.geo.userData.ring(len, 0.004 * s), 0.008 * s, true), k || "cloth", typeof col === "string" ? "dark" + col : wshade(col, 0.85), Lw.sk);
}
}
});
}
function skirt(top, bot, gap, flare, col, k, open, room) {
var U = whUnder(D, function (q) { return q.r === "torso" && q.y < yW + 0.05 * s || /^(thigh|calf)_/.test(q.r); }), pts = U.pts;
var prof = function (t, a) { return flare * s * Math.pow(1 - t, 1.2) + (room || 0) * s * Math.max(0, 1 - Math.abs(t - 0.5) / 0.45) - (room ? (gap + 0.01) * s * Math.max(0, (t - 0.8) / 0.2) : (gap + 0.008) * s * Math.pow(Math.max(0, (t - 0.78) / 0.22), 1.5)); };
var T = whTube(D, pts, bot, top, gap + 0.014, prof, open, 12, true, U.over);
if (!T)
return null;
var span = Math.max(0.01, top - bot);
T.sk = { allow: /^(torso|thigh_[lr]|calf_[lr])$/, split: true, hips: function (y) { return Math.max(0.35, Math.min(1, (y - bot) / span)); } };
push(T.geo, k || "cloth", col, T.sk);
return T;
}
function edges(T, col, k) { if (!T || !T.arc)
return; [T.arc[0], T.arc[1]].forEach(function (a) { var pts = []; for (var i = 0; i <= 10; i++) {
var t = i / 10, y = T.O.y + t * T.L, r = 0, row = Math.round(t * (T.R.length - 1));
r = whRAt(T.R[row], a) + T.gap + (T.prof ? T.prof(t, a) : 0) + 0.004 * s;
pts.push(new THREE.Vector3(T.O.x + Math.cos(a) * r, y, T.O.z + Math.sin(a) * r));
} push(whTubeAlong(pts, 0.007 * s, false), k || "cloth", col, T.sk); }); }
function collar(T, col, k, r) { if (!T)
return; var NR = T.NR; push(whTubeAlong(whRingPts(NR.cx, yN + 0.012 * s, NR.cz, NR.R, T.gap + 0.012 * s, T.arc ? T.arc[0] : null, T.arc ? T.arc[1] : null), (r || 0.012) * s, !T.arc), k || "cloth", col); }
function hem(T, col, k, r) { if (!T)
return; push(whTubeAlong(T.geo.userData.ring(0, 0.003 * s, T.arc ? T.arc[0] : null, T.arc ? T.arc[1] : null), (r || 0.009) * s, !T.arc), k || "cloth", col, T.sk); }
function buttons(T, n, y0, y1, col) {
if (!T)
return;
for (var i = 0; i < n; i++) {
var y = y0 + (y1 - y0) * i / Math.max(1, n - 1), t = (y - T.O.y) / T.L, row = Math.max(0, Math.min(T.R.length - 1, Math.round(t * (T.R.length - 1)))), a = Math.PI / 2 + (T.arc ? -0.14 : 0);
var r = whRAt(T.R[row], T.arc ? T.arc[1] - 0.05 : Math.PI / 2) + T.gap + (T.prof ? T.prof(t, a) : 0) + 0.004 * s;
push(whPlace(new THREE.SphereGeometry(0.011 * s, 8, 6), new THREE.Vector3(T.O.x + Math.cos(T.arc ? T.arc[1] - 0.07 : a) * r, y, T.O.z + Math.sin(T.arc ? T.arc[1] - 0.07 : a) * r)), "gold", col || 0xC9A04A);
}
}
function frontAt(T, y, out) { var t = (y - T.O.y) / T.L, row = Math.max(0, Math.min(T.R.length - 1, Math.round(t * (T.R.length - 1)))); return new THREE.Vector3(T.O.x, y, T.O.z + whRAt(T.R[row], Math.PI / 2) + T.gap + (T.prof ? T.prof(t, Math.PI / 2) : 0) + (out || 0)); }
function backAt(T, y, out) { var t = (y - T.O.y) / T.L, row = Math.max(0, Math.min(T.R.length - 1, Math.round(t * (T.R.length - 1)))); return new THREE.Vector3(T.O.x, y, T.O.z - whRAt(T.R[row], -Math.PI / 2) - T.gap - (out || 0)); }
var T;
switch (id) {
case "jacket":
case "suit":
case "uniform":
case "labcoat":
case "longcoat": {
var col = id === "labcoat" ? 0xF4F4F0 : "layer", open = id === "suit" ? 0.8 : id === "uniform" ? 0.14 : 0.5;
var longc = id === "longcoat" || id === "labcoat";
T = torso(yP - (id === "suit" ? 0.13 : longc ? 0.15 : 0.1) * s, 0.016, open, longc ? 0.11 : 0.03, col);
sleeves(col, 0.014, 0.9);
edges(T, id === "labcoat" ? 0xDCDCD6 : "darklayer");
collar(T, id === "labcoat" ? 0xE8E8E2 : "darklayer", null, 0.016);
if (id === "longcoat" || id === "labcoat") {
var sk = skirt(yW, id === "labcoat" ? yKnee + 0.02 * s : yKnee - 0.18 * s, 0.05, 0.08, col, "cloth", 0.55, 0.03);
edges(sk, id === "labcoat" ? 0xDCDCD6 : "darklayer");
hem(sk, id === "labcoat" ? 0xDCDCD6 : "darklayer");
}
if (id === "suit" && T) {
var NR = T.NR;
push(whTubeAlong(whRingPts(NR.cx, yN + 0.005 * s, NR.cz, NR.R, 0.012 * s, Math.PI / 2 - 0.9, Math.PI / 2 + 0.9), 0.01 * s, false), "cloth", 0xF4F2EC);
var f1 = frontAt(T, yN - 0.03 * s, 0.004 * s), f2 = frontAt(T, yW - 0.02 * s, 0.004 * s);
var tie = new THREE.BoxGeometry(0.036 * s, f1.y - f2.y, 0.01 * s);
push(whPlace(tie, new THREE.Vector3(f1.x, (f1.y + f2.y) / 2, (f1.z + f2.z) / 2 - 0.006 * s), new THREE.Vector3(0, 0, 1)), "cloth", "acc");
push(whPlace(new THREE.BoxGeometry(0.045 * s, 0.035 * s, 0.02 * s), f1.clone().add(new THREE.Vector3(0, 0.005 * s, 0))), "cloth", "acc");
}
if (id === "uniform" && T) {
buttons(T, 5, yC + 0.04 * s, yW - 0.04 * s);
var bd = frontAt(T, yC, 0.004 * s);
bd.x -= 0.08 * s;
push(whPlace(new THREE.BoxGeometry(0.04 * s, 0.05 * s, 0.008 * s), bd, new THREE.Vector3(0, 0, 1)), "gold", 0xC9A04A);
["l", "r"].forEach(function (sd) { var u = whLm(D, "upperarm_" + sd); if (u)
push(whPlace(new THREE.BoxGeometry(0.1 * s, 0.012 * s, 0.06 * s), u.clone().add(new THREE.Vector3(u.x > 0 ? -0.04 * s : 0.04 * s, 0.05 * s, 0))), "gold", 0xC9A04A); });
}
if (id === "jacket" && T)
buttons(T, 2, yW + 0.08 * s, yW - 0.02 * s, 0x2A2420);
if (id === "labcoat" && T)
buttons(T, 4, yC, yP - 0.02 * s, 0xE0E0E0);
break;
}
case "vest":
T = torso(yP - 0.04 * s, 0.014, 0.6, 0.01, "layer");
edges(T, "darklayer");
buttons(T, 4, yC - 0.02 * s, yW - 0.04 * s);
break;
case "hoodie":
case "sweater": {
var kk = id === "sweater" ? "knit" : "cloth";
T = torso(yP - 0.08 * s, 0.016, 0, 0.02, "layer", kk);
sleeves("layer", 0.015, 0.92, 0, kk);
hem(T, "darklayer", kk, 0.014);
collar(T, "darklayer", kk, 0.014);
if (id === "hoodie" && T) {
var NR2 = T.NR, hb = new THREE.SphereGeometry(0.15 * s, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55);
hb.rotateX(-1.9);
hb.scale(1, 0.8, 0.75);
push(whPlace(hb, new THREE.Vector3(NR2.cx, yN + 0.02 * s, NR2.cz - whRAt(NR2.R, -Math.PI / 2) - 0.05 * s)), "cloth", "layer", { allow: /^(torso|neck)$/ });
var pk = T.geo.userData.ring((yW - 0.05 * s - T.O.y) / T.L, 0.006 * s, Math.PI / 2 - 0.55, Math.PI / 2 + 0.55);
var pk2 = T.geo.userData.ring((yP - 0.02 * s - T.O.y) / T.L, 0.006 * s, Math.PI / 2 - 0.6, Math.PI / 2 + 0.6);
push(whStrip(pk, pk2), "cloth", "darklayer");
}
break;
}
case "tunic":
T = torso(yKnee + 0.22 * s, 0.016, 0, 0.09, "layer");
sleeves("layer", 0.014, 0.55);
hem(T, "darklayer");
if (T) {
var br = whTube(D, whPts(D, TORSO), yW - 0.04 * s, yW + 0.02 * s, 0.024, null, 0, 3);
if (br)
push(br.geo, "leather", 0x4A3220);
}
break;
case "kimono":
T = torso(yP - 0.02 * s, 0.016, 0, 0.02, "layer");
sleeves("layer", 0.016, 0.85, 0.16);
collar(T, "acc", null, 0.016);
if (T) {
var ks = skirt(yP + 0.02 * s, yAnkle + 0.02 * s, 0.03, 0.12, "layer");
hem(ks, "darklayer");
var ob = whTube(D, whPts(D, TORSO), yW - 0.06 * s, yW + 0.06 * s, 0.03, null, 0, 3);
if (ob)
push(ob.geo, "cloth", "acc");
}
break;
case "apron": {
var ap = whTube(D, whPts(D, TORSO), yW - 0.02 * s, yC + 0.02 * s, 0.026, null, 0, 6), aa = [Math.PI / 2 - 0.8, Math.PI / 2 + 0.8];
if (ap) {
var bib = rlFitShell(ap.O, WH_UP, WH_X, WH_Z, ap.L, 0, 1, ap.R, 0.026 * s, null, aa);
push(bib, "cloth", whColApron);
}
var as = whTube(D, whPts(D, function (q) { return q.r === "torso" && q.y < yW + 0.05 * s || /^thigh_/.test(q.r); }), yKnee + 0.05 * s, yW, 0.032, function (t) { return 0.05 * s * (1 - t); }, 0, 8);
if (as) {
var sk2 = rlFitShell(as.O, WH_UP, WH_X, WH_Z, as.L, 0, 1, as.R, 0.032 * s, as.prof, [Math.PI / 2 - 0.75, Math.PI / 2 + 0.75]);
push(sk2, "cloth", whColApron, { allow: /^(torso|thigh_[lr])$/, hips: function (y) { return Math.max(0.4, Math.min(1, (y - yKnee) / (yW - yKnee))); } });
}
if (ap) {
var nk = whNeckR(D, yN);
push(whTubeAlong(whRingPts(nk.cx, yN - 0.01 * s, nk.cz, nk.R, 0.02 * s, Math.PI * 0.2, Math.PI * 0.8), 0.006 * s, false), "cloth", whColApron);
push(whTubeAlong(whRingPts(ap.O.x, yW, ap.O.z, ap.R[0], 0.03 * s), 0.007 * s, true), "cloth", whColApron);
}
break;
}
case "armor": {
T = torso(yHipTop + 0.01 * s, 0.02, 0, 0.0, 0x7C828A, "metal");
if (T) {
hem(T, 0xA8884A, "gold", 0.008);
collar(T, 0xA8884A, "gold", 0.011);
["l", "r"].forEach(function (sd) {
var Pa = whLimb(D, "upperarm_" + sd, "lowerarm_" + sd, new RegExp("^upperarm_" + sd + "$"), -0.16, 0.42, 0.028, function (t) { return 0.022 * s * Math.max(0, t); }, null, 0.04);
if (Pa) {
push(Pa.geo, "metal", 0x7C828A, Pa.sk);
push(whTubeAlong(Pa.geo.userData.ring(0.42, 0.004 * s), 0.006 * s, true), "gold", 0xA8884A, Pa.sk);
}
var Ts = whLimb(D, "thigh_" + sd, "calf_" + sd, new RegExp("^thigh_" + sd + "$"), -0.04, 0.36, 0.024, function (t) { return 0.01 * s * Math.max(0, t); }, null, 0.05);
if (Ts) {
push(Ts.geo, "metal", 0x7C828A, Ts.sk);
push(whTubeAlong(Ts.geo.userData.ring(0.36, 0.004 * s), 0.006 * s, true), "gold", 0xA8884A, Ts.sk);
}
var V2 = whLimb(D, "lowerarm_" + sd, "hand_" + sd, new RegExp("^lowerarm_" + sd + "$"), 0.25, 0.88, 0.016, null, null, 0.03);
if (V2)
push(V2.geo, "metal", 0x7C828A, V2.sk);
});
}
break;
}
case "jeans":
case "trousersleg":
case "jeanscalf": {
var Us = id === "jeanscalf" ? null : whUnder(D, function (q) { return q.r === "torso" && q.y < yW + 0.05 * s || (/^thigh_/.test(q.r) && q.y > yHipTop - 0.06 * s); });
var legIn = Us && Us.hem != null ? [0.45, 0.8] : null;
["l", "r"].forEach(function (sd) {
var A = id === "jeanscalf" ? null : whLimb(D, "thigh_" + sd, "calf_" + sd, new RegExp("^thigh_" + sd + "$"), -0.06, 1.05, 0.018, null, null, 0.05, legIn);
if (A)
push(A.geo, "denim", "jeans", A.sk);
var B = whLimb(D, "calf_" + sd, "foot_" + sd, new RegExp("^calf_" + sd + "$"), -0.05, 0.9, 0.018, function (t) { return 0.008 * s * t; }, null, 0.035);
if (B) {
push(B.geo, "denim", "jeans", B.sk);
push(whTubeAlong(B.geo.userData.ring(0.9, 0.018 * s), 0.009 * s, true), "denim", "darkjeans", B.sk);
}
});
var sTop = Us && Us.hem != null ? Math.min(yW + 0.02 * s, Us.hem + 0.03 * s) : yW + 0.02 * s;
var sIn = Us && Us.hem != null ? function (t) { return -0.04 * s * Math.pow(Math.max(0, (t - 0.55) / 0.45), 1.6); } : null;
var seat = id === "jeanscalf" ? null : whTube(D, Us.pts, yHipTop - 0.04 * s, sTop, 0.018, sIn, 0, sIn ? 7 : 5, false, sIn ? Us.over : null, true);
if (seat) {
push(seat.geo, "denim", "jeans", { armY: 9e9, split: true });
if (sTop >= yW + 0.02 * s - 1e-6)
push(whTubeAlong(seat.geo.userData.ring(1, 0.004 * s), 0.009 * s, true), "leather", 0x3A2618);
}
break;
}
case "shorts": {
var Uh = whUnder(D, function (q) { return q.r === "torso" && q.y < yW + 0.05 * s || (/^thigh_/.test(q.r) && q.y > yHipTop - 0.06 * s); });
var shIn = Uh.hem != null;
["l", "r"].forEach(function (sd) { var A = whLimb(D, "thigh_" + sd, "calf_" + sd, new RegExp("^thigh_" + sd + "$"), -0.06, 0.55, 0.012, function (t) { return 0.012 * s * t; }, null, 0.05, shIn ? [0.4, 0.6, 0.85] : null); if (A) {
push(A.geo, "cloth", "bottom", A.sk);
push(whTubeAlong(A.geo.userData.ring(0.55, 0.014 * s), 0.007 * s, true), "cloth", "darkbottom", A.sk);
} });
var st = whTube(D, Uh.pts, yHipTop - 0.05 * s, Uh.hem != null ? Math.min(yW + 0.02 * s, Uh.hem + 0.03 * s) : yW + 0.02 * s, 0.012, Uh.hem != null ? function (t) { return -0.035 * s * Math.pow(Math.max(0, (t - 0.55) / 0.45), 1.6); } : null, 0, Uh.hem != null ? 7 : 5, false, Uh.hem != null ? Uh.over : null, true);
if (st)
push(st.geo, "cloth", "bottom", { armY: 9e9, split: true });
break;
}
case "kilt": {
var kt = skirt(yW + 0.01 * s, yKnee + 0.04 * s, 0.02, 0.08, "bottom", "tartan");
if (kt) {
hem(kt, "acc", "cloth", 0.008);
push(whTubeAlong(kt.geo.userData.ring(1, 0.006 * s), 0.012 * s, true), "leather", 0x3A2618, kt.sk);
}
break;
}
case "skirt": {
var sk3 = skirt(yW + 0.01 * s, yKnee - 0.04 * s, 0.02, 0.1, "bottom");
hem(sk3, "darkbottom");
break;
}
case "skirtunder": {
var sk4 = skirt(yW + 0.01 * s, yKnee - 0.04 * s, 0.004, 0.04, "bottom");
hem(sk4, "darkbottom", null, 0.006);
break;
}
case "kiltunder": {
var kt2 = skirt(yW + 0.01 * s, yKnee + 0.04 * s, 0.004, 0.04, "bottom", "tartan");
hem(kt2, "acc", "cloth", 0.006);
break;
}
case "dress": {
var dr = skirt(yW + 0.02 * s, yKnee - 0.08 * s, 0.024, 0.13, "top");
hem(dr, "darktop");
break;
}
case "robe": {
var rb = skirt(yW + 0.02 * s, yAnkle, 0.03, 0.16, "top");
hem(rb, "darktop");
break;
}
case "coat": {
T = torso(yP - 0.1 * s, 0.016, 0.4, 0.03, "top");
sleeves("top", 0.014, 0.9);
edges(T, "darktop");
collar(T, "darktop", null, 0.016);
var ck = skirt(yP - 0.06 * s, yKnee - 0.1 * s, 0.03, 0.11, "top", "cloth", 0.5);
edges(ck, "darktop");
hem(ck, "darktop");
break;
}
case "backpack": {
var bt = whTube(D, whPts(D, TORSO), yW, yTop, 0.0, null, 0, 8);
if (!bt)
break;
var by = yC - 0.08 * s, bz = backAt(bt, by, 0.0);
var pack = new THREE.BoxGeometry(0.28 * s, 0.36 * s, 0.13 * s, 2, 2, 2);
pack.translate(bt.O.x, by, bz.z - 0.065 * s);
rigid(pack, "cloth", "back", whBone(D, "chest"));
var flap = new THREE.BoxGeometry(0.29 * s, 0.12 * s, 0.14 * s);
flap.translate(bt.O.x, by + 0.13 * s, bz.z - 0.068 * s);
rigid(flap, "cloth", "darkback", whBone(D, "chest"));
var pkt = new THREE.BoxGeometry(0.18 * s, 0.1 * s, 0.04 * s);
pkt.translate(bt.O.x, by - 0.08 * s, bz.z - 0.15 * s);
rigid(pkt, "cloth", "darkback", whBone(D, "chest"));
var NR3 = whNeckR(D, yN);
[-1, 1].forEach(function (sd) {
var x0 = bt.O.x + sd * 0.08 * s, f1 = frontAt(bt, yC - 0.02 * s, 0.006 * s), pts = [new THREE.Vector3(x0, by + 0.12 * s, bz.z - 0.01 * s), new THREE.Vector3(x0 + sd * 0.02 * s, yTop + 0.03 * s, bt.O.z - whRAt(NR3.R, -Math.PI / 2) * 0.6), new THREE.Vector3(x0 + sd * 0.03 * s, yTop + 0.035 * s, bt.O.z + whRAt(NR3.R, Math.PI / 2) * 0.7), new THREE.Vector3(x0 + sd * 0.02 * s, yC, f1.z), new THREE.Vector3(x0 + sd * 0.05 * s, yW + 0.06 * s, frontAt(bt, yW + 0.06 * s, 0.006 * s).z)];
push(whTubeAlong(pts, 0.012 * s, false), "leather", 0x2A2A2A);
});
break;
}
case "cloakhood": {
var NR4 = whNeckR(D, yN), hd = new THREE.SphereGeometry(0.17 * s, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55);
hd.rotateX(-1.75);
hd.scale(1, 0.85, 0.8);
push(whPlace(hd, new THREE.Vector3(NR4.cx, yN + 0.03 * s, NR4.cz - whRAt(NR4.R, -Math.PI / 2) - 0.06 * s)), "cloth", "back", { allow: /^(torso|neck)$/ });
break;
}
case "scarf": {
var NR5 = whNeckR(D, yN);
push(whTubeAlong(whRingPts(NR5.cx, yN - 0.03 * s, NR5.cz, NR5.R, 0.04 * s), 0.04 * s, true), "knit", "acc", { allow: /^(torso|neck)$/ });
var tl = [new THREE.Vector3(NR5.cx + 0.05 * s, yN - 0.04 * s, NR5.cz + whRAt(NR5.R, 1.2) + 0.05 * s), new THREE.Vector3(NR5.cx + 0.07 * s, yN - 0.14 * s, NR5.cz + whRAt(NR5.R, 1.2) + 0.07 * s), new THREE.Vector3(NR5.cx + 0.075 * s, yN - 0.3 * s, NR5.cz + whRAt(NR5.R, 1.2) + 0.065 * s)];
var tail = whTubeAlong(tl, 0.032 * s, false);
push(tail, "knit", "acc", { allow: /^(torso|neck)$/ });
break;
}
case "bowtie": {
var NR6 = whNeckR(D, yN), c6 = new THREE.Vector3(NR6.cx, yN - 0.035 * s, NR6.cz + whRAt(NR6.R, Math.PI / 2) + 0.03 * s);
[-1, 1].forEach(function (sd) { var g = new THREE.ConeGeometry(0.03 * s, 0.06 * s, 4); g.rotateZ(sd * Math.PI / 2); g.scale(1, 1, 0.4); g.translate(sd * 0.03 * s, 0, 0); push(whPlace(g, c6), "cloth", "acc", { allow: /^(torso|neck)$/ }); });
push(whPlace(new THREE.SphereGeometry(0.014 * s, 8, 6), c6), "cloth", "acc", { allow: /^(torso|neck)$/ });
break;
}
case "necklace":
case "medal": {
var NR7 = whNeckR(D, yN), rp = whRingPts(NR7.cx, yN - 0.02 * s, NR7.cz, NR7.R, 0.03 * s, null, null, 48, 0.07 * s);
push(whTubeAlong(rp, (id === "medal" ? 0.009 : 0.004) * s, true), id === "medal" ? "cloth" : "gold", id === "medal" ? 0x6A2A9A : 0xC9A04A, { allow: /^(torso|neck)$/ });
var lowF = rp[12].clone();
lowF.z += 0.008 * s;
lowF.y -= (id === "medal" ? 0.035 : 0.02) * s;
if (id === "medal") {
var md = new THREE.CylinderGeometry(0.035 * s, 0.035 * s, 0.008 * s, 18);
md.rotateX(Math.PI / 2);
push(whPlace(md, lowF), "gold", 0xC9A04A, { allow: /^torso$/ });
}
else {
var pd = new THREE.OctahedronGeometry(0.02 * s, 0);
pd.scale(1, 1.3, 0.6);
push(whPlace(pd, lowF), "gem", 0x3A9AD8, { allow: /^torso$/ });
}
break;
}
case "ribbon": {
var Tr = whTube(D, whPts(D, TORSO), yW, yTop, 0.0, null, 0, 8);
if (!Tr)
break;
var rpos = frontAt(Tr, yC - 0.02 * s, 0.012 * s);
rpos.x += 0.08 * s;
var ro = new THREE.CylinderGeometry(0.042 * s, 0.042 * s, 0.012 * s, 16);
ro.rotateX(Math.PI / 2);
push(whPlace(ro, rpos), "cloth", 0x6A2A9A, { allow: /^torso$/ });
var rm = new THREE.CylinderGeometry(0.022 * s, 0.022 * s, 0.016 * s, 12);
rm.rotateX(Math.PI / 2);
push(whPlace(rm, rpos.clone().add(new THREE.Vector3(0, 0, 0.006 * s))), "gold", 0xC9A04A, { allow: /^torso$/ });
[-1, 1].forEach(function (sd) { var t2 = new THREE.BoxGeometry(0.022 * s, 0.08 * s, 0.006 * s); t2.rotateZ(sd * 0.2); t2.translate(sd * 0.014 * s, -0.065 * s, 0); push(whPlace(t2, rpos), "cloth", sd < 0 ? 0xC9A04A : 0x6A2A9A, { allow: /^torso$/ }); });
break;
}
case "earrings": {
var hn = whBone(D, "head");
if (!hn)
break;
var sk = whPts(D, function (q) { return q.skull && q.r === "head"; }), hair = [];
D.V.forEach(function (q) { if (q.hair && q.r === "head" && !/eye/i.test(q.r))
hair.push(new THREE.Vector3(q.x, q.y, q.z)); });
if (sk.length < 30)
break;
var bb = new THREE.Box3().setFromPoints(sk), hh = bb.max.y - bb.min.y, ey = bb.min.y + hh * 0.42, zc = (bb.min.z + bb.max.z) / 2 - (bb.max.z - bb.min.z) * 0.08;
[-1, 1].forEach(function (sd) {
var ex = 0;
sk.forEach(function (p) { if (Math.abs(p.y - ey) < hh * 0.08 && Math.abs(p.z - zc) < hh * 0.15)
ex = Math.max(ex, p.x * sd); });
hair.forEach(function (p) { if (Math.abs(p.y - ey) < hh * 0.1 && Math.abs(p.z - zc) < hh * 0.12)
ex = Math.max(ex, p.x * sd - 0.004 * s); });
var at = new THREE.Vector3(sd * (ex + 0.006 * s), ey - 0.012 * s, zc);
var hoop = new THREE.TorusGeometry(0.014 * s, 0.0028 * s, 6, 16);
hoop.rotateY(Math.PI / 2);
hoop.translate(at.x, at.y - 0.012 * s, at.z);
rigid(hoop, "gold", 0xD8B048, hn);
var gm = new THREE.OctahedronGeometry(0.011 * s, 0);
gm.scale(1, 1.5, 1);
gm.translate(at.x, at.y - 0.038 * s, at.z);
rigid(gm, "gem", 0x3A9AD8, hn);
});
break;
}
case "gloves":
["l", "r"].forEach(function (sd) {
var H = whLimb(D, "hand_" + sd, "finger_" + sd, new RegExp("^hand_" + sd + "$"), -0.2, 0.95, 0.005, null, null, 0.012);
if (H) {
push(H.geo, "leather", "glove", H.sk);
push(whTubeAlong(H.geo.userData.ring(-0.2, 0.008 * s), 0.008 * s, true), "leather", "glove", H.sk);
}
var Lw = whLimb(D, "lowerarm_" + sd, "hand_" + sd, new RegExp("^lowerarm_" + sd + "$"), 0.8, 1.02, 0.01, null, null, 0.025);
if (Lw)
push(Lw.geo, "leather", "glove", Lw.sk);
});
break;
case "belt": {
var bl = whTube(D, whPts(D, TORSO), yW - 0.05 * s, yW - 0.005 * s, 0.012, null, 0, 3);
if (!bl)
break;
push(bl.geo, "leather", 0x3A2618);
var bk = frontAt(bl, yW - 0.028 * s, 0.006 * s), bkg = new THREE.TorusGeometry(0.022 * s, 0.005 * s, 4, 4);
bkg.rotateZ(Math.PI / 4);
bkg.scale(1.2, 1, 1);
push(whPlace(bkg, bk), "gold", 0xC9A04A, { allow: /^torso$/ });
break;
}
case "satchel": {
var sb = whTube(D, whPts(D, TORSO), yP - 0.08 * s, yTop, 0.0, null, 0, 10);
if (!sb)
break;
var sp = new THREE.Vector3(sb.O.x + whRAt(sb.R[3], 0) + 0.05 * s, yP - 0.02 * s, sb.O.z + 0.02 * s), bag = new THREE.BoxGeometry(0.07 * s, 0.17 * s, 0.21 * s);
bag.translate(sp.x, sp.y, sp.z);
push(bag, "leather", 0x7A5236, { allow: /^(torso)$/, hips: function () { return 0.9; } });
var fl2 = new THREE.BoxGeometry(0.075 * s, 0.07 * s, 0.215 * s);
fl2.translate(sp.x + 0.002 * s, sp.y + 0.055 * s, sp.z);
push(fl2, "leather", 0x5A3A22, { allow: /^torso$/, hips: function () { return 0.9; } });
var NR8 = whNeckR(D, yN), str = [sp.clone().add(new THREE.Vector3(-0.01 * s, 0.08 * s, 0.06 * s)), frontAt(sb, yW + 0.02 * s, 0.008 * s).add(new THREE.Vector3(0.05 * s, 0, 0)), frontAt(sb, yC, 0.008 * s).add(new THREE.Vector3(-0.06 * s, 0, 0)),
new THREE.Vector3(NR8.cx - whRAt(NR8.R, Math.PI) - 0.05 * s, yTop + 0.03 * s, NR8.cz), backAt(sb, yC, 0.008 * s).add(new THREE.Vector3(-0.04 * s, 0, 0)), backAt(sb, yW + 0.05 * s, 0.008 * s).add(new THREE.Vector3(0.08 * s, 0, 0)), sp.clone().add(new THREE.Vector3(-0.01 * s, 0.08 * s, -0.06 * s))];
push(whTubeAlong(str, 0.009 * s, false), "leather", 0x5A3A22);
break;
}
case "boots":
["l", "r"].forEach(function (sd) { var B = whLimb(D, "calf_" + sd, "foot_" + sd, new RegExp("^calf_" + sd + "$"), 0.42, 1.02, 0.03, function (t) { return 0.006 * s * (1 - t); }, null, 0.035); if (B) {
push(B.geo, "leather", "shoes", B.sk);
push(whTubeAlong(B.geo.userData.ring(0.42, 0.01 * s), 0.013 * s, true), "leather", "shoes", B.sk);
} });
break;
case "sneakers":
case "sandals":
case "heels":
["l", "r"].forEach(function (sd) {
var own = new RegExp("^foot_" + sd + "$"), sk = { allow: own };
var fp = whPts(D, function (q) { return q.r === "foot_" + sd; });
if (fp.length < 10)
return;
var fb = new THREE.Box3().setFromPoints(fp), fl3 = fb.max.z - fb.min.z, fw = fb.max.x - fb.min.x, cx = (fb.min.x + fb.max.x) / 2;
if (id === "sandals") {
var sole = new THREE.BoxGeometry(fw * 0.95, 0.012 * s, fl3 * 0.98);
sole.translate(cx, fb.min.y + 0.004 * s, (fb.min.z + fb.max.z) / 2);
push(sole, "leather", "shoes", sk);
for (var k3 = 0; k3 < 3; k3++) {
var zz = fb.min.z + fl3 * (0.35 + k3 * 0.2), rg = new THREE.TorusGeometry(fw * 0.55, 0.006 * s, 4, 16, Math.PI);
rg.scale(1, 0.8, 1);
rg.translate(cx, fb.min.y + 0.01 * s, zz);
push(rg, "leather", "shoes", sk);
}
}
if (id === "heels") {
var hl = new THREE.CylinderGeometry(0.014 * s, 0.009 * s, 0.06 * s, 8);
hl.translate(cx, fb.min.y - 0.012 * s, fb.min.z + 0.035 * s);
push(hl, "leather", "shoes", sk);
}
});
break;
}
return P;
}
function whColApron() { return 0; }
function whStrip(a, b) { return __ZC(265, 1, this, arguments, new.target); }
function whCapeBuild(D, cloak) { return __ZC(265, 2, this, arguments, new.target); }
function whWants(L) {
var w = [];
var lay = L.layer;
if (lay && lay !== "none")
w.push(lay);
else if (L.topKind === "coat")
w.push("coat");
if (L.topKind === "dress" && !lay)
w.push("dress");
if (L.topKind === "robe")
w.push("robe");
if (L.back === "backpack")
w.push("backpack");
if (L.back === "cloak" && L.hat !== "hood")
w.push("cloakhood");
["neck", "ears", "hands", "waist"].forEach(function (k) { if (L[k] && L[k] !== "none")
w.push(L[k]); });
if (L.shoeKind && L.shoeKind !== "shoes")
w.push(L.shoeKind);
var bk = L.bottomKind, under = lay === "longcoat" || lay === "labcoat" || w.indexOf("coat") >= 0;
var robed = w.indexOf("robe") >= 0, dressed = w.indexOf("dress") >= 0;
if (robed)
return w;
if (dressed) {
if (bk === "jeans")
w.push("jeanscalf");
return w;
}
if (bk === "jeans" || bk === "shorts")
w.push(bk);
else if (bk === "kilt")
w.push(under ? "kiltunder" : "kilt");
else if (bk === "skirt" && w.indexOf("dress") < 0 && w.indexOf("robe") < 0)
w.push(under ? "skirtunder" : "skirt");
return w;
}
function whBareLegs(L, w) { return w.indexOf("shorts") >= 0 || w.indexOf("kilt") >= 0 || w.indexOf("skirt") >= 0 || w.indexOf("skirtunder") >= 0 || w.indexOf("kiltunder") >= 0 || w.indexOf("dress") >= 0; }
function whLegsGeo(m) { return __ZC(265, 3, this, arguments, new.target); }
var WH_KEEP = 24, WH_GKEEP = 90, WH_TRIM = 0;
function whTrim() {
var ks = Object.keys(WH.cache), size = function (k) { return Object.keys(WH.cache[k].g || {}).length; }, tot = 0;
ks.forEach(function (k) { tot += size(k); });
if (ks.length < WH_KEEP && tot <= WH_GKEEP)
return;
ks.sort(function (a, b) { return (WH.cache[a].t || 0) - (WH.cache[b].t || 0); });
var now = performance.now();
for (var i = 0; i < ks.length - 1 && (ks.length - i >= WH_KEEP || tot > WH_GKEEP); i++) {
var k = ks[i], C = WH.cache[k];
if (now - (C.t || 0) < 5000)
break;
tot -= size(k);
delete WH.cache[k];
Object.keys(C.g || {}).forEach(function (id) { var v = C.g[id]; (Array.isArray(v) ? v.map(function (p) { return p && p.g; }) : [v]).forEach(function (g) { try {
if (g && g.dispose)
g.dispose();
}
catch (e) { } }); });
}
}
var WH_DKEEP = 4;
function WH_NORAY() { }
function whLetGoOfMeasure(g) { if (g && g.userData && typeof g.userData.ring === "function")
delete g.userData.ring; }
function whTrimMeasures(keep) {
var ks = Object.keys(WH.cache).filter(function (k) { return WH.cache[k].D && WH.cache[k] !== keep; });
if (ks.length < WH_DKEEP)
return;
ks.sort(function (a, b) { return (WH.cache[b].Dt || 0) - (WH.cache[a].Dt || 0); });
for (var i = WH_DKEEP - 1; i < ks.length; i++)
WH.cache[ks[i]].D = null;
}
function whKey(E) { return E.plan.type === "human" ? [E.plan.body].concat(E.plan.parts).join("|") : "own:" + (E.plan.main || ""); }
function whDress(E) {
if (!E || !E.model || !E.plan || E.wh)
return;
var L = E.plan.L || {}, wants = whWants(L), cape = L.back === "cape" || L.back === "cloak";
if (!wants.length && !cape)
return;
var key = whKey(E), C = WH.cache[key];
if (!C || ++WH_TRIM % 8 === 0)
whTrim();
C = WH.cache[key] || (WH.cache[key] = { D: null, g: {} });
C.t = performance.now();
if (!C.D) {
if (C.bad)
return;
C.D = whMeasure(E.model);
if (!C.D) {
C.bad = 1;
return;
}
}
C.Dt = performance.now();
whTrimMeasures(C);
var D = C.D, host = whHost(E.model);
if (!host)
return;
var st = { meshes: [], rigid: [], hid: [], capes: [] };
E.wh = st;
var bones = {};
host.skeleton.bones.forEach(function (b) { if (!bones[b.name])
bones[b.name] = b; });
var groups = {}, rigids = [];
wants.forEach(function (id) {
var parts = C.g[id];
if (!parts) {
try {
parts = whBuild(D, id).map(function (p) { if (!p.bone)
whSkin(D, p.g, p.skin); p.skin = null; whLetGoOfMeasure(p.g); return p; });
}
catch (e) {
parts = [];
if (window.console)
console.warn("[wear]", id, e);
}
C.g[id] = parts;
}
parts.forEach(function (p) {
var c = whCol(p.c, L);
if (p.c === whColApron)
c = L.layerColor != null ? L.layerColor : 0xF2EEE2;
else if (typeof p.c === "string" && /^dark/.test(p.c) && !/^dark(layer|back|top)$/.test(p.c))
c = wshade(whCol(p.c.slice(4), L), 0.7);
var dz = typeof dyeWhPart === "function" ? dyeWhPart(L, id, parts, p) : null, rk = (typeof p.c === "function" ? "apron" : p.c) + (dz ? "@" + dz.id : "");
if (p.bone)
rigids.push({ p: p, c: c, dz: dz });
else {
var gk = p.k + ":" + rk + ":" + c + (dz ? ":" + dz.sig : "");
(groups[gk] = groups[gk] || { k: p.k, c: c, role: rk, dz: dz, list: [] }).list.push(p.g);
}
});
});
var par = host.parent || E.model;
Object.keys(groups).forEach(function (gk) {
var Gr = groups[gk], ck = wants.join(",") + "|" + Gr.k + ":" + Gr.role + ":" + Gr.list.length, geo = C.g["m:" + ck] || (C.g["m:" + ck] = whMerge(Gr.list));
if (!geo)
return;
var m = new THREE.SkinnedMesh(geo, Gr.dz ? dyeWhMat(Gr.dz, Gr.k, true, geo) : whMat(Gr.k, Gr.c));
m.bind(host.skeleton, new THREE.Matrix4());
m.frustumCulled = false;
m.castShadow = true;
m.receiveShadow = true;
m.raycast = WH_NORAY;
m.userData.hdf = 1;
m.userData.wearHd = 1;
m.name = "worn " + Gr.k;
par.add(m);
st.meshes.push(m);
});
rigids.forEach(function (q) {
var b = bones[q.p.bone], i = D.idx[q.p.bone];
if (!b || i == null)
return;
var g = q.p.g.clone();
g.applyMatrix4(D.inv[i]);
var m = new THREE.Mesh(g, q.dz ? dyeWhMat(q.dz, q.p.k, false, g) : whRigidMat(q.p.k, q.c));
m.castShadow = true;
m.raycast = WH_NORAY;
m.userData.hdf = 1;
m.userData.wearHd = 1;
b.add(m);
st.rigid.push(m);
});
if (cape) {
try {
whCape(E, C, D, bones, L);
}
catch (e) {
if (window.console)
console.warn("[wear cape]", e);
}
}
if (whBareLegs(L, wants)) {
E.model.traverse(function (m) {
if (m.isSkinnedMesh && /_Legs$/i.test(m.name) && m.visible) {
m.visible = false;
st.hid.push(m);
}
if (m.isSkinnedMesh && /Superhero/i.test(m.name)) {
var lg = whLegsGeo(m);
if (lg) {
st.headGeo = st.headGeo || [];
st.headGeo.push([m, m.geometry]);
m.geometry = lg;
}
}
});
}
if (L.hands === "gloves")
E.model.traverse(function (m) {
if (!m.isSkinnedMesh || !Array.isArray(m.material))
return;
var ch = false;
var nm = m.material.map(function (x) { if (/Regular/i.test(x.name || "")) {
ch = true;
var gd = typeof dyeOf === "function" && dyeOf(L, "hands:gloves");
return gd ? dyeMat({ tri: gd, zone: 0, kind: "leather", skin: true, map: x.map || null }) : hdfSkinMat(x, whCol("glove", L));
} return x; });
if (ch) {
(st.mats = st.mats || []).push([m, m.material]);
m.material = nm;
}
});
if ((L.shoeKind === "sandals" || L.shoeKind === "sneakers") && !(L.shoeKind === "sneakers" && typeof dyeOf === "function" && dyeOf(L, "feet:sneakers")))
E.model.traverse(function (m) {
if (m.isSkinnedMesh && /_Feet/i.test(m.name) && !st.feetMat) {
st.feetMat = [m, m.material];
m.material = hdfSkinMat(Array.isArray(m.material) ? m.material[0] : m.material, L.shoeKind === "sneakers" ? 0xF4F4F0 : (L.skin != null ? L.skin : 0xC89878));
}
});
var body = E.g.children[0];
if (body)
body.traverse(function (m) {
var k = m.userData && m.userData.wk;
if (!k)
return;
if (/^(earring|cape|cloakhood|pack|strap)$/.test(k) && m.visible) {
m.visible = false;
st.hid.push(m);
}
});
WH.n++;
}
function whCape(E, C, D, bones, L) { return __ZC(265, 4, this, arguments, new.target); }
function whUndress(E) { return __ZC(265, 5, this, arguments, new.target); }
(function () {
if (typeof hdfAttach !== "function" || typeof hdfDetach !== "function" || typeof rlFitRadii !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E) {
var r = ha.apply(this, arguments);
try {
if (E && E.model && !E.wh)
whDress(E);
}
catch (e) {
WH.fails++;
if (window.console)
console.warn("[wear]", e);
}
return r;
};
var hd = hdfDetach;
hdfDetach = function (E) { try {
whUndress(E);
}
catch (e) { } return hd.apply(this, arguments); };
})();
