/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(198, function () {
return [
function (H) {
var P = H.pts, cs = 0.015, grid = {};
P.forEach(function (p) { var k = Math.floor(p.x / cs) + "," + Math.floor(p.y / cs) + "," + Math.floor(p.z / cs); (grid[k] || (grid[k] = [])).push(p); });
function near(p) {
var n = 0, ix = Math.floor(p.x / cs), iy = Math.floor(p.y / cs), iz = Math.floor(p.z / cs);
for (var a = -1; a <= 1; a++)
for (var b = -1; b <= 1; b++)
for (var c = -1; c <= 1; c++) {
var L = grid[(ix + a) + "," + (iy + b) + "," + (iz + c)];
if (!L)
continue;
for (var i = 0; i < L.length; i++) {
var q = L[i];
if (Math.abs(q.x - p.x) < cs && Math.abs(q.y - p.y) < cs && Math.abs(q.z - p.z) < cs)
n++;
}
}
return n;
}
function pc(A, f) { A.sort(function (a, b) { return a - b; }); return A[Math.min(A.length - 1, Math.floor(A.length * f))]; }
var byY = P.slice().sort(function (a, b) { return b.y - a.y; }), B0 = hfBandTop(H), S = B0, cx = H.cx, cz = H.cz;
var faceless = P.filter(function (p) { return p.z > 0.09 && p.y > 0 && p.y < 0.13; }).length < 15;
if (faceless) {
cx = 0;
cz = 0.032;
}
for (var pass = 0; pass < 2; pass++) {
var top = null;
for (var i = 0; i < byY.length && i < 900; i++) {
var p0 = byY[i];
if (pass && (Math.abs(p0.x - cx) > 0.05 || p0.z < cz - 0.035 || p0.z > cz + 0.07))
continue;
if (near(p0) >= 10) {
top = p0.y;
break;
}
}
S = top != null ? Math.min(B0, top + 0.01) : B0;
var xs = [], zs = [];
P.forEach(function (p) { if (p.y > S - 0.11 && p.y < S - 0.04) {
xs.push(p.x);
zs.push(p.z);
} });
if (faceless) {
cx = 0;
cz = 0.032;
S = Math.min(B0, 0.205);
break;
}
else if (xs.length > 20) {
var x0 = pc(xs, 0.05), x1 = pc(xs, 0.95), zf = pc(zs, 0.97), zb = pc(zs, 0.05);
cx = (x0 + x1) / 2;
cz = Math.max((zf + zb) / 2, zf - (x1 - x0) * 0.62);
}
}
var NA = 36, cache = {};
function ring(k) {
if (cache[k])
return cache[k];
var y = S + k * 0.01, B = [];
for (var j = 0; j < NA; j++)
B.push([]);
P.forEach(function (p) { if (Math.abs(p.y - y) > 0.01)
return; var dx = p.x - cx, dz = p.z - cz, a = Math.atan2(dz, dx), b = Math.round((a / (Math.PI * 2) + 1) * NA) % NA; B[b].push(Math.hypot(dx, dz)); });
var R0 = B.map(function (L) { return L.length >= 2 ? pc(L, 0.85) : null; }), any = R0.some(function (r) { return r != null; });
var R = R0.map(function (r, j) {
if (r != null)
return r;
if (!any)
return 0.02;
for (var d = 1; d < NA; d++) {
var l = R0[(j - d + NA) % NA], h = R0[(j + d) % NA];
if (l != null && h != null)
return (l + h) / 2;
if (l != null)
return l;
if (h != null)
return h;
}
return 0.07;
});
for (var s = 0; s < 2; s++)
R = R.map(function (r, j) { return (R[(j + NA - 1) % NA] + 2 * r + R[(j + 1) % NA]) / 4; });
return (cache[k] = R);
}
function rA(R, a) { var f = ((a / (Math.PI * 2)) % 1 + 1) % 1 * NA, j = Math.floor(f), t = f - j; return R[j % NA] * (1 - t) + R[(j + 1) % NA] * t; }
var Q = { S: S, cx: cx, cz: cz };
Q.r = function (a, y) { var f = Math.max(-14, Math.min(4, (y - S) / 0.01)), k0 = Math.floor(f), t = f - k0, r0 = rA(ring(k0), a); return t > 0 ? r0 * (1 - t) + rA(ring(k0 + 1), a) * t : r0; };
if (faceless)
Q.r = function (a, y) { var c = Math.cos(a), sn = Math.sin(a), rz = sn > 0 ? 0.092 : 0.1, r = 1 / Math.sqrt(c * c / (0.077 * 0.077) + sn * sn / (rz * rz)), h = (y - (S - 0.09)) / 0.1; return r * (h > 0 ? Math.sqrt(Math.max(0.05, 1 - h * h)) : 1) + 0.008; };
Q.pt = function (a, y, gap) { var r = Q.r(a, y) + (gap || 0); return new THREE.Vector3(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r); };
return Q;
},
function (list) {
var pos = [], nor = [], uv = [], idx = [], v = new THREE.Vector3(), nm = new THREE.Matrix3();
list.forEach(function (it) {
var g = it[0], mx = it[1], P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv, base = pos.length / 3;
nm.getNormalMatrix(mx);
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(mx);
pos.push(v.x, v.y, v.z);
if (N) {
v.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
nor.push(v.x, v.y, v.z);
}
else
nor.push(0, 1, 0);
if (U)
uv.push(U.getX(i), U.getY(i));
else
uv.push(0, 0);
}
if (g.index) {
for (var k = 0; k < g.index.count; k++)
idx.push(base + g.index.getX(k));
}
else
for (var k2 = 0; k2 < P.count; k2++)
idx.push(base + k2);
});
var o = new THREE.BufferGeometry();
o.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
o.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
o.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
o.setIndex(idx);
return o;
},
function (kind) {
return hfM("leafgeo" + kind, function () {
var pos = [], uv = [], idx = [];
if (kind === "vine") {
var n = 44, lobes = [[0, 1], [-0.95, 0.82], [0.95, 0.82], [-1.9, 0.58], [1.9, 0.58]];
pos.push(0, 0.3, 0);
uv.push(0.5, 0.3);
for (var i = 0; i <= n; i++) {
var th = -2.6 + 5.2 * i / n, R = 0.28;
lobes.forEach(function (l) { R = Math.max(R, l[1] * Math.exp(-Math.pow((th - l[0]) / 0.3, 2))); });
R *= 0.66;
var x = Math.sin(th) * R, y = 0.3 + Math.cos(th) * R;
pos.push(x, y, -0.14 * x * x - 0.06 * (y - 0.3) * (y - 0.3));
uv.push(0.5 + x * 0.75, y);
}
for (var j = 1; j <= n; j++)
idx.push(0, j, j + 1);
}
else {
var rows = 10, cols = 6, pet = kind === "petal", W = pet ? 0.42 : 0.3, cup = pet ? 0.9 : 0.4;
for (var r = 0; r <= rows; r++) {
var t = r / rows, w = pet ? W * Math.pow(Math.sin(Math.PI * (0.08 + 0.8 * t)), 0.6) : W * Math.pow(Math.sin(Math.PI * t), 0.7) * (1 - 0.2 * t);
for (var c = 0; c <= cols; c++) {
var u = c / cols * 2 - 1, x2 = u * w;
pos.push(x2, t, -cup * x2 * x2 - (pet ? -0.08 : 0.1) * t * t);
uv.push(u * 0.5 + 0.5, t);
}
}
for (var r2 = 0; r2 < rows; r2++)
for (var c2 = 0; c2 < cols; c2++) {
var a = r2 * (cols + 1) + c2, b = a + cols + 1;
idx.push(a, b, a + 1, a + 1, b, b + 1);
}
}
return hfGeo(pos, idx, uv);
});
},
function () {
return hfTex("leafveins", 128, 128, function (x, w, h) {
var gr = x.createLinearGradient(0, h, 0, 0);
gr.addColorStop(0, "#BEBEBE");
gr.addColorStop(1, "#E2E2E2");
x.fillStyle = gr;
x.fillRect(0, 0, w, h);
x.strokeStyle = "rgba(255,255,255,0.8)";
x.lineWidth = 3;
x.beginPath();
x.moveTo(w / 2, h);
x.lineTo(w / 2, 0);
x.stroke();
x.lineWidth = 1.4;
x.strokeStyle = "rgba(255,255,255,0.5)";
for (var i = 1; i < 8; i++) {
var y = h - i * h / 8.5;
x.beginPath();
x.moveTo(w / 2, y + 8);
x.quadraticCurveTo(w * 0.3, y, w * 0.03, y - 16);
x.moveTo(w / 2, y + 8);
x.quadraticCurveTo(w * 0.7, y, w * 0.97, y - 16);
x.stroke();
}
var R = hfRnd(7);
for (var k = 0; k < 600; k++) {
x.fillStyle = "rgba(0,0,0," + (R() * 0.07).toFixed(3) + ")";
x.fillRect(R() * w, R() * h, 2, 2);
}
});
},
function () {
return hfTex("petalstreaks", 64, 128, function (x, w, h) {
var gr = x.createLinearGradient(0, h, 0, 0);
gr.addColorStop(0, "#B8B8B8");
gr.addColorStop(0.35, "#F0F0F0");
gr.addColorStop(1, "#FFFFFF");
x.fillStyle = gr;
x.fillRect(0, 0, w, h);
var R = hfRnd(11);
x.strokeStyle = "rgba(0,0,0,0.06)";
x.lineWidth = 1;
for (var i = 0; i < 14; i++) {
var sx = w * (0.1 + 0.8 * R());
x.beginPath();
x.moveTo(w / 2, h);
x.quadraticCurveTo(sx, h * 0.5, sx + (R() - 0.5) * 8, h * 0.08);
x.stroke();
}
});
},
function (H, G, hat, col) {
var Q = hfSeat(H), S = Q.S, F = HF_FRONT, B = hfBatch(), U = new THREE.Vector3(0, 1, 0), C = { cx: Q.cx, cz: Q.cz };
function O(a) { return new THREE.Vector3(Math.cos(a), 0, Math.sin(a)); }
function T(a) { return new THREE.Vector3(-Math.sin(a), 0, Math.cos(a)); }
function at(a, y, r) { return new THREE.Vector3(Q.cx + Math.cos(a) * r, y, Q.cz + Math.sin(a) * r); }
function tube(pts, rad, mat, closed, seg) { B.put(mat, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, !!closed), seg || pts.length * 3, rad, 6, !!closed)); }
function ring(fy, fr, rad, mat, wob) { var pts = []; for (var k = 0; k < 64; k++) {
var a = k / 64 * Math.PI * 2, w = wob ? wob(a) : null;
pts.push(at(a, fy(a) + (w ? w[1] : 0), fr(a) + (w ? w[0] : 0)));
} tube(pts, rad, mat, true, 192); }
function ball(mat, p, s, sy, sz) { B.put(mat, hfUnit("ball"), new THREE.Matrix4().makeScale(s, sy == null ? s : sy, sz == null ? s : sz).setPosition(p)); }
function phong(c, sh, sp, em) { return hfM("ph" + c + "_" + sh, function () { return new THREE.MeshPhongMaterial({ color: c, shininess: sh, specular: sp, emissive: em || 0, side: THREE.DoubleSide }); }); }
var pearl = hfMat("pearl"), diamond = hfM("diamond", function () { return new THREE.MeshPhongMaterial({ color: 0xF2F6FF, shininess: 220, specular: 0xFFFFFF, emissive: 0x182030, flatShading: true }); });
function leafMat(c) { return hfM("leaf" + c, function () { return new THREE.MeshPhongMaterial({ color: c, map: hfLeafTex(), shininess: 16, specular: 0x223322, side: THREE.DoubleSide }); }); }
function petalMat(c) { return hfM("petal" + c, function () { return new THREE.MeshPhongMaterial({ color: c, map: hfPetalTex(), shininess: 8, specular: 0x222222, side: THREE.DoubleSide }); }); }
var goldLeaf = hfM("goldleaf", function () { return new THREE.MeshPhongMaterial({ color: 0xE2B44A, map: hfLeafTex(), shininess: 110, specular: 0xFFE9B0, emissive: 0x2A1A00, side: THREE.DoubleSide }); });
if (hat === "crown") {
var gold = col != null ? phong(col, 110, 0xFFE9B0, 0x1A1000) : hfMat("gold");
var yb = function (a) { return S - 0.068 + 0.007 * Math.cos(a - F); };
var rb = function (a) { var y = yb(a); return Math.max(Q.r(a, y + 0.004), Q.r(a, y + 0.018), Q.r(a, y + 0.034)) + 0.007; };
var fur = hfCloth(0xF6F2EA, "felt");
ring(yb, function (a) { return rb(a) + 0.003; }, 0.0085, fur);
for (var e = 0; e < 14; e++) {
var ae = e / 14 * Math.PI * 2 + 0.1;
ball(phong(0x141414, 20, 0x333333), at(ae, yb(ae) + 0.002, rb(ae) + 0.011), 0.0032, 0.0075, 0.0032);
}
var band = [];
for (var b = 0; b < 4; b++) {
(function (b) { band.push(function (a) { return { r: rb(a) + 0.004 + b * 0.0011, y: yb(a) + 0.008 + b * 0.009 }; }); })(b);
}
B.put(gold, hfLoft(C, band, null, 6));
ring(function (a) { return yb(a) + 0.009; }, function (a) { return rb(a) + 0.0045; }, 0.0024, gold);
ring(function (a) { return yb(a) + 0.035; }, function (a) { return rb(a) + 0.0078; }, 0.0024, gold);
for (var g = 0; g < 16; g++) {
var ag = F + g / 16 * Math.PI * 2, gp = at(ag, yb(ag) + 0.022, rb(ag) + 0.0075), go = O(ag);
if (g % 2 === 0) {
var gm = [hfMat("ruby"), hfMat("sapphire"), hfMat("emerald")][(g / 2) % 3];
B.put(gm, hfUnit("ball"), hfFrame(gp.clone().addScaledVector(go, 0.002), U, go, 0.0062, 0.0078, 0.0034));
B.put(gold, hfUnit("ring"), hfFrame(gp, U, go, 0.0072, 0.0088, 0.0072));
}
else
B.put(diamond, hfUnit("oct"), hfFrame(gp.clone().addScaledVector(go, 0.001), U, go, 0.0034, 0.0042, 0.0024));
}
for (var pq = 0; pq < 32; pq++) {
var ap = pq / 32 * Math.PI * 2;
ball(pearl, at(ap, yb(ap) + 0.038, rb(ap) + 0.0078), 0.0026);
}
var tops = [];
for (var p9 = 0; p9 < 8; p9++) {
var a9 = F + p9 / 8 * Math.PI * 2, o9 = O(a9), base = at(a9, yb(a9) + 0.039, rb(a9) + 0.0078);
tops.push(base);
if (p9 % 2 === 0) {
B.put(gold, hfUnit("box"), hfFrame(base.clone().addScaledVector(U, 0.016), U, o9, 0.0065, 0.03, 0.004));
B.put(gold, hfUnit("box"), hfFrame(base.clone().addScaledVector(U, 0.02), U, o9, 0.022, 0.0065, 0.004));
B.put(diamond, hfUnit("oct"), hfFrame(base.clone().addScaledVector(U, 0.02).addScaledVector(o9, 0.003), U, o9, 0.0032, 0.0032, 0.002));
}
else {
var lg = hfLeafGeo("petal"), tg = T(a9);
B.put(gold, lg, hfFrame(base, U, o9, 0.016, 0.03, 0.016));
B.put(gold, lg, hfFrame(base.clone().addScaledVector(U, 0.004), U.clone().addScaledVector(tg, 1.1), o9, 0.012, 0.02, 0.012));
B.put(gold, lg, hfFrame(base.clone().addScaledVector(U, 0.004), U.clone().addScaledVector(tg, -1.1), o9, 0.012, 0.02, 0.012));
B.put(gold, hfUnit("box"), hfFrame(base.clone().addScaledVector(U, 0.006), U, o9, 0.016, 0.004, 0.005));
ball(pearl, base.clone().addScaledVector(U, 0.033), 0.0034);
}
}
var yt = function (a) { return yb(a) + 0.03; }, vel = [], vtop = Math.max(S + 0.014, Math.min(H.ymax, S + 0.02) + 0.004);
for (var v4 = 0; v4 <= 6; v4++) {
(function (v4) { var t = v4 / 6; vel.push(function (a) { var y = yt(a) + (vtop - yt(a)) * Math.sin(t * Math.PI / 2); return { r: Math.max((rb(a) + 0.003) * Math.cos(t * Math.PI / 2 * 0.94), t < 1 ? Q.r(a, y) + 0.005 : 0), y: y }; }); })(v4);
}
B.put(hfCloth(0x6A0F22, "felt"), hfLoft(C, vel, new THREE.Vector3(Q.cx, vtop + 0.002, Q.cz), 4));
var apex = vtop + 0.016;
[0, 2].forEach(function (k) {
var p0 = tops[k], p1 = tops[k + 4], arc = [];
for (var i = 0; i <= 20; i++) {
var t = i / 20, ph = Math.PI * t, c = Math.cos(ph), q = c >= 0 ? p0 : p1, h = Math.pow(Math.sin(ph), 0.55);
var dx = (q.x - Q.cx) * Math.abs(c), dz = (q.z - Q.cz) * Math.abs(c);
arc.push(new THREE.Vector3(Q.cx + dx, q.y + 0.02 + (apex - q.y - 0.02) * h - 0.01 * Math.exp(-Math.pow((t - 0.5) / 0.1, 2)), Q.cz + dz));
}
tube(arc, 0.0034, gold, false, 60);
arc.forEach(function (p, i) { if (i % 2 === 1 && i !== 9 && i !== 11)
ball(pearl, p.clone().add(new THREE.Vector3(p.x - Q.cx, 0.02, p.z - Q.cz).normalize().multiplyScalar(0.004)), 0.0028); });
});
ball(gold, new THREE.Vector3(Q.cx, apex + 0.006, Q.cz), 0.009);
B.put(gold, hfUnit("box"), hfFrame(new THREE.Vector3(Q.cx, apex + 0.024, Q.cz), U, O(F), 0.004, 0.02, 0.004));
B.put(gold, hfUnit("box"), hfFrame(new THREE.Vector3(Q.cx, apex + 0.027, Q.cz), U, O(F), 0.013, 0.004, 0.004));
}
else if (hat === "tiara") {
var met = col != null ? phong(col, 130, 0xFFFFFF, 0x101418) : hfMat("silver");
var N = 32, base = [], ups = [], fwd = [], hc = new THREE.Vector3(Q.cx, S - 0.09, Q.cz);
for (var i = 0; i <= N; i++) {
var t = i / N * 2 - 1, a = F + t * Math.PI * 0.47, y = S - 0.024 - 0.048 * t * t, p = Q.pt(a, y, 0.004);
var n = p.clone().sub(hc).normalize(), d = n.clone().add(U.clone().multiplyScalar(0.7)).normalize();
base.push(p);
ups.push(d);
fwd.push(O(a).addScaledVector(d, -O(a).dot(d)).normalize());
}
var hgt = function (i) { var t = i / N * 2 - 1; return 0.004 + 0.036 * Math.pow(Math.cos(t * Math.PI / 2), 1.5); };
var off = function (i, h) { return base[i].clone().addScaledVector(ups[i], h); };
tube(base, 0.0026, met, false, 96);
tube(base.map(function (p, i) { return off(i, 0.0065); }), 0.0016, met, false, 96);
for (var k = 0; k <= N; k++)
B.put(diamond, hfUnit("oct"), hfFrame(off(k, 0.0033), ups[k], fwd[k], 0.0024, 0.0024, 0.0016));
var topl = [];
for (var k2 = 0; k2 <= N; k2++) {
var t2 = k2 / N * 2 - 1;
topl.push(off(k2, hgt(k2) * (0.84 + 0.16 * Math.pow(Math.cos(t2 * Math.PI * 3.5), 2))));
}
tube(topl, 0.0016, met, false, 128);
for (var k3 = 2; k3 <= N - 2; k3 += 2) {
var t3 = k3 / N * 2 - 1;
if (Math.abs(Math.cos(t3 * Math.PI * 3.5)) > 0.9)
ball(pearl, topl[k3].clone().addScaledVector(ups[k3], 0.003), 0.0031);
}
for (var k4 = 2; k4 <= N - 2; k4 += 2) {
var h4 = hgt(k4);
if (h4 < 0.012)
continue;
var tg = base[Math.min(N, k4 + 1)].clone().sub(base[Math.max(0, k4 - 1)]).normalize();
var p0 = off(k4, 0.0065), p1 = off(k4, h4 * 0.88);
tube([p0, p0.clone().lerp(p1, 0.33).addScaledVector(tg, 0.0035), p0.clone().lerp(p1, 0.66).addScaledVector(tg, -0.0035), p1], 0.0012, met, false, 12);
if (k4 % 4 === 2 && h4 > 0.018)
B.put(met, hfUnit("ring"), hfFrame(off(k4 + 1, h4 * 0.5), ups[k4], fwd[k4], 0.004, 0.004, 0.004));
else if (h4 > 0.018)
B.put(diamond, hfUnit("oct"), hfFrame(off(k4 + 1, h4 * 0.55), ups[k4], fwd[k4], 0.003, 0.003, 0.002));
}
var mc = N / 2, cp = off(mc, 0.021), cu = ups[mc], cf = fwd[mc];
B.put(hfMat("sapphire"), hfUnit("ball"), hfFrame(cp.clone().addScaledVector(cf, 0.002), cu, cf, 0.0068, 0.0095, 0.0042));
for (var h5 = 0; h5 < 10; h5++) {
var an = h5 / 10 * Math.PI * 2, side = new THREE.Vector3().crossVectors(cu, cf);
B.put(diamond, hfUnit("oct"), hfFrame(cp.clone().addScaledVector(side, Math.cos(an) * 0.0105).addScaledVector(cu, Math.sin(an) * 0.013).addScaledVector(cf, 0.001), cu, cf, 0.0022, 0.0022, 0.0015));
}
B.put(diamond, hfUnit("oct"), hfFrame(off(mc, hgt(mc) + 0.006), cu, cf, 0.0048, 0.0062, 0.003));
}
else {
var vine = hat === "vinecrown", yw = function (a) { return S - (vine ? 0.052 : 0.055) + (vine ? 0.009 : 0.011) * Math.cos(a - F); };
var rw = function (a) { var y = yw(a); return Math.max(Q.r(a, y), Q.r(a, y + 0.012)) + 0.004; };
var stem = phong(vine ? 0x5A4028 : 0x55683A, 12, 0x222222);
for (var s2 = 0; s2 < 2; s2++)
ring(yw, rw, vine ? 0.0026 : 0.0021, stem, function (a) { var w = Math.sin(a * 14 + s2 * Math.PI); return [0.0028 * w, 0.0026 * Math.cos(a * 14 + s2 * Math.PI)]; });
var nl = vine ? 16 : 30, lcol = vine ? (col != null ? col : 0x3E7A2E) : 0x3E7A34;
for (var l = 0; l < nl; l++) {
var al = l / nl * Math.PI * 2 + (l % 2 ? 0.06 : 0), dir = l % 2 ? 1 : -1, lp = at(al, yw(al), rw(al) + 0.002), o = O(al);
var yd = T(al).multiplyScalar(dir * 0.8).addScaledVector(U, vine ? 0.55 : 0.3).addScaledVector(o, 0.25), zh = o.clone().addScaledVector(U, 0.5);
if (vine)
B.put(l % 3 === 1 ? goldLeaf : leafMat(lcol), hfLeafGeo("vine"), hfFrame(lp, yd, zh, 0.042, 0.042, 0.042));
else
B.put(leafMat(l % 3 ? lcol : 0x5E9440), hfLeafGeo("leaf"), hfFrame(lp, yd, zh, 0.034, 0.028, 0.034));
}
if (vine) {
[F + 1.8, F - 1.8].forEach(function (ag, ci) {
var o = O(ag), bp = at(ag, yw(ag) - 0.006, rw(ag) + 0.012), rows = [4, 4, 3, 3, 2, 1], gm = [phong(0x4A1660, 70, 0x775588), phong(0x5E2272, 70, 0x775588)];
rows.forEach(function (nr, ri) {
var rr = 0.0075 * (nr > 1 ? 1 : 0) * (1 - ri * 0.06);
for (var q = 0; q < nr; q++) {
var aq = q / nr * Math.PI * 2 + ri * 0.7, tg = T(ag);
ball(gm[(q + ri + ci) % 2], bp.clone().addScaledVector(U, -ri * 0.0105).addScaledVector(tg, Math.cos(aq) * rr).addScaledVector(o, 0.007 + Math.sin(aq) * rr * 0.8), 0.0072);
}
});
var leaf2 = at(ag + 0.25 * (ci ? -1 : 1), yw(ag) + 0.004, rw(ag) + 0.004);
B.put(leafMat(lcol), hfLeafGeo("vine"), hfFrame(leaf2, U.clone().addScaledVector(T(ag), ci ? 1 : -1), o, 0.05));
});
[F + 1.2, F - 1.2, F + 2.5, F - 2.5].forEach(function (at0) {
var bp = at(at0, yw(at0), rw(at0) + 0.004), o = O(at0), tg = T(at0), cur = [];
for (var q = 0; q <= 24; q++) {
var t = q / 24, an = t * Math.PI * 7;
cur.push(bp.clone().addScaledVector(U, t * 0.012).addScaledVector(o, 0.004 + t * 0.01 + Math.cos(an) * 0.004 * (1 - t * 0.5)).addScaledVector(tg, Math.sin(an) * 0.004 * (1 - t * 0.5)));
}
tube(cur, 0.0008, phong(0x6A8A3A, 10, 0x222222), false, 72);
});
}
else {
var pal = col != null ? [col, 0xF8F4EE, col, 0xF6D35A] : [0xF2A0B4, 0xF8F4EE, 0xF6D35A, 0xC8A0E0, 0xF4906A, 0xE86A84];
var kinds = ["rose", "daisy", "blossom", "daisy", "rose", "blossom"], nf = 14;
for (var f = 0; f < nf; f++) {
var af = F + f / nf * Math.PI * 2, fr = Math.cos(af - F), sz = 0.013 + 0.007 * Math.max(0, fr), fp = at(af, yw(af) + 0.003, rw(af) + 0.006), o2 = O(af);
var n2 = o2.clone().multiplyScalar(0.75).addScaledVector(U, 0.65).normalize(), x2 = T(af), y2 = new THREE.Vector3().crossVectors(n2, x2).normalize();
x2 = new THREE.Vector3().crossVectors(y2, n2);
var kind = kinds[f % kinds.length], pc2 = pal[f % pal.length], pm = petalMat(pc2);
var petal = function (th, len, wid, lift, dist) { var rd = x2.clone().multiplyScalar(Math.cos(th)).addScaledVector(y2, Math.sin(th)); B.put(pm, hfLeafGeo("petal"), hfFrame(fp.clone().addScaledVector(rd, dist).addScaledVector(n2, 0.001), rd.clone().addScaledVector(n2, lift), n2, wid, len, wid)); };
if (kind === "daisy") {
pm = petalMat(f % 2 ? 0xFAF8F2 : pc2);
for (var d = 0; d < 14; d++)
petal(d / 14 * Math.PI * 2, sz, sz * 0.32, 0.2, sz * 0.15);
ball(phong(0xE8B020, 20, 0x333300), fp.clone().addScaledVector(n2, 0.002), sz * 0.3, sz * 0.3, sz * 0.3);
}
else if (kind === "blossom") {
for (var d2 = 0; d2 < 5; d2++)
petal(d2 / 5 * Math.PI * 2 + f, sz * 0.85, sz * 0.85, 0.45, sz * 0.08);
for (var st = 0; st < 5; st++) {
var sa = st / 5 * Math.PI * 2;
ball(phong(0xF0D060, 20, 0x333300), fp.clone().addScaledVector(n2, 0.004).addScaledVector(x2, Math.cos(sa) * sz * 0.15).addScaledVector(y2, Math.sin(sa) * sz * 0.15), 0.0012);
}
}
else {
[[5, 1, 0.55, 0.3], [5, 0.78, 0.9, 0.18], [4, 0.56, 1.5, 0.06]].forEach(function (rg, ri) { for (var d3 = 0; d3 < rg[0]; d3++)
petal(d3 / rg[0] * Math.PI * 2 + ri * 0.6, sz * rg[1], sz * rg[1] * 0.95, rg[2], sz * rg[3]); });
ball(pm, fp.clone().addScaledVector(n2, sz * 0.35), sz * 0.22, sz * 0.22, sz * 0.3);
}
var sp = at(af + Math.PI / nf, yw(af + Math.PI / nf) + 0.004, rw(af + Math.PI / nf) + 0.006);
for (var bb = 0; bb < 5; bb++) {
var ba = bb / 5 * Math.PI * 2 + f;
ball(phong(0xFAFAF4, 10, 0x222222), sp.clone().addScaledVector(x2, Math.cos(ba) * 0.004).addScaledVector(U, 0.002 + Math.sin(ba) * 0.003).addScaledVector(o2, 0.003), 0.0022);
}
}
}
}
B.done(G);
}
];
});
