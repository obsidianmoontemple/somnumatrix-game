/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(484, function () {
return [
function (grp, X, Z, r, col, op) {
var d = new THREE.Mesh(new THREE.SphereGeometry(r, VRN.lite ? 16 : 28, VRN.lite ? 10 : 16), new THREE.MeshBasicMaterial({ color: col, side: THREE.BackSide, transparent: true, opacity: op, depthWrite: false, fog: false }));
d.position.set(X, 0, Z);
grp.add(d);
if (!VRN.lite) {
var n = 260, pos = new Float32Array(n * 3), R = wRand(77);
for (var i = 0; i < n; i++) {
var a = R() * 6.28, e = 0.15 + R() * 1.3, rr = r * 0.97;
pos[i * 3] = Math.cos(a) * Math.cos(e) * rr;
pos[i * 3 + 1] = Math.sin(e) * rr;
pos[i * 3 + 2] = Math.sin(a) * Math.cos(e) * rr;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var st = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xE8EEFF, size: 1.4, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.8 }));
st.position.copy(d.position);
st.userData.stars = 1;
grp.add(st);
d.userData.stars = st;
}
return d;
},
function (o) {
vlgAimEnd(true);
var A = VLG.aim = { o: o, n: 0, cd: 0, left: o.targets.slice() };
vrnRidePanel(true, [[o.label || "🔱 Throw", function () { vlgAimHit(); }]]);
if (!VLG.keyOn) {
VLG.keyOn = 1;
document.addEventListener("keydown", function (e) { if (!VLG.aim)
return; if ((e.key === "f" || e.key === "F") && !(e.target && /input|textarea/i.test(e.target.tagName)))
vlgAimHit(); });
}
if (o.msg)
setStatus(o.msg);
return A;
},
function () {
var A = VLG.aim;
if (!A || A.cd > 0)
return;
A.cd = 0.45;
var o = A.o, L = worldLocal(), best = null, bd = 1e9;
A.left.forEach(function (T) {
var P = vlgAimPos(T), dx = P.x - L.x, dz = P.z - L.z, d = Math.hypot(dx, dz);
if (d > (o.range || 40))
return;
var rel = Math.atan2(-dx, -dz) - yaw;
rel = Math.abs(Math.atan2(Math.sin(rel), Math.cos(rel)));
var tol = Math.max(o.tol || 0.32, Math.atan2(T.r || 1.5, d));
if (rel < tol && rel < bd) {
bd = rel;
best = T;
}
});
if (typeof playTone === "function")
playTone(best ? (o.tone || 180) : 320, 0.18);
if (!best) {
setStatus(o.miss || "Not that way: turn to face it first. The light shows where.");
return;
}
A.left = A.left.filter(function (T) { return T !== best; });
A.n++;
try {
if (o.onHit)
o.onHit(best, A.n);
}
catch (e) {
if (window.console)
console.warn("[vlg] hit", e);
}
if (A.n >= (o.need || o.targets.length)) {
vlgAimEnd();
try {
if (o.done)
o.done();
}
catch (e) {
if (window.console)
console.warn("[vlg] aim done", e);
}
return;
}
if (o.each)
setStatus(o.each(A.n));
},
function (pts, o, done) {
o = o || {};
vlgSailEnd(true);
if (!o.boat && o.boat !== false)
vrnSubOut();
var S = VLG.sail = { pts: pts, i: 0, t: 0, sp: o.sp || 22, fast: 1, done: done, o: o };
vrnMove(pts[0].x, pts[0].z, null, o.msg || null, pts[0].y, { fn: function () {
VRN.ride = { k: "vlg", keep: 1, off: function () { vlgSailEnd(true); } };
vrnRidePanel(true, [["⏩ Faster", function () { if (VLG.sail)
VLG.sail.fast = VLG.sail.fast > 1 ? 1 : 3; }], ["⏭ On to the end", function () { vlgSailFinish(); }]]);
} });
},
function (dt) {
var S = VLG.sail;
if (!S || VRN.moving || !VRN.ride || VRN.ride.k !== "vlg")
return;
var a = S.pts[S.i], b = S.pts[S.i + 1];
if (!b) {
vlgSailFinish();
return;
}
var len = Math.hypot(b.x - a.x, b.z - a.z, (b.y || 0) - (a.y || 0)) || 1;
S.t = Math.min(1, S.t + dt * S.sp * S.fast / len);
var e = S.t, x = a.x + (b.x - a.x) * e, z = a.z + (b.z - a.z) * e, y = (a.y || 0) + ((b.y || 0) - (a.y || 0)) * e, h = Math.atan2(b.x - a.x, b.z - a.z);
var sub = S.o.boat === false ? null : (S.o.boat || VRN.sub);
if (sub) {
sub.position.set(x, y - (S.o.sink != null ? S.o.sink : 1.6), z);
sub.rotation.y = h + (S.o.turn != null ? S.o.turn : Math.PI);
if (sub.userData.prop)
sub.userData.prop.rotation.z += dt * 6;
}
camera.position.set(VRN.base + x + Math.sin(h) * (S.o.behind || -4), y + (S.o.up || 0.6), z + Math.cos(h) * (S.o.behind || -4));
if (typeof flyY !== "undefined")
flyY = 0;
if (S.o.look !== false) {
var want = Math.atan2(-(b.x - a.x), -(b.z - a.z));
var d = want - yaw;
d = Math.atan2(Math.sin(d), Math.cos(d));
yaw += d * Math.min(1, dt * 0.8);
}
if (b.say && !b._said) {
b._said = 1;
setStatus(b.say);
}
if (S.t >= 1) {
S.i++;
S.t = 0;
}
},
function (grp, x0, z0, x1, z1, y, h, mat) {
var l = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(z1 - z0, x1 - x0), n = Math.max(2, Math.round(l / 1.6));
var bar = vrnBoxM(l, 0.08, 0.08, mat, (x0 + x1) / 2, y + h, (z0 + z1) / 2, grp);
bar.rotation.y = -a;
for (var i = 0; i <= n; i++) {
var t = i / n;
wCyl(0.035, 0.035, h, mat, x0 + (x1 - x0) * t, y + h / 2, z0 + (z1 - z0) * t, grp, 5);
}
vrnSolid({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: l / 2, hd: 0.12, rot: a, h: h + 1, b: y - 0.5 });
},
function (L, B, D, o) {
o = o || {};
var N = VRN.lite ? 18 : 34, M = VRN.lite ? 8 : 14, wl = o.wl != null ? o.wl : -D * 0.62, pos = [], col = [], idx = [];
var cCu = new THREE.Color(o.bottom || 0x7A3A22), cBk = new THREE.Color(o.hull || 0x16171A), cWh = new THREE.Color(o.band || 0xE8E4DA), cBt = new THREE.Color(o.boot || 0xD8D2C4);
for (var i = 0; i <= N; i++) {
var t = i / N, x = -L / 2 + t * L;
var hb = t < 0.18 ? 0.72 + 0.28 * Math.sin(t / 0.18 * Math.PI / 2) : t < 0.58 ? 1 : Math.max(0, 1 - Math.pow((t - 0.58) / 0.42, 1.8));
if (t > 0.995)
hb = 0;
var b = B / 2 * hb, sh = o.sheer == null ? 1.2 : o.sheer, top = sh * Math.pow(2 * t - 1, 2) + (t > 0.85 ? (t - 0.85) * 4 : 0), dep = D * (t > 0.8 ? 1 - (t - 0.8) * 1.6 : 1) * (t < 0.06 ? 0.86 : 1);
for (var k = 0; k <= M; k++) {
var a = k / M * Math.PI, ca = Math.cos(a), sa = Math.sin(a), z = b * (ca < 0 ? -1 : 1) * Math.pow(Math.abs(ca), 0.55), y = top - (top + dep) * Math.pow(sa, 1.6) * (k === 0 || k === M ? 0 : 1);
if (k === 0 || k === M)
y = top;
pos.push(x, y, z);
var c = y < wl ? cCu : y < wl + 0.35 ? cBt : (y > top - 1.9 && y < top - 0.9 && o.band !== false) ? cWh : cBk;
col.push(c.r, c.g, c.b);
}
}
for (var i2 = 0; i2 < N; i2++)
for (var k2 = 0; k2 < M; k2++) {
var a0 = i2 * (M + 1) + k2, b0 = a0 + M + 1;
idx.push(a0, b0, a0 + 1, a0 + 1, b0, b0 + 1);
}
var c0 = pos.length / 3, sx = pos[0], sy = 0, n0 = 0;
for (var k3 = 0; k3 <= M; k3++) {
sy += pos[k3 * 3 + 1];
n0++;
}
pos.push(sx, sy / n0, 0);
var ct = new THREE.Color(o.hull || 0x16171A);
col.push(ct.r, ct.g, ct.b);
for (var k4 = 0; k4 < M; k4++)
idx.push(c0, k4 + 1, k4);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function (r0, r1, h) {
var g = new THREE.CylinderGeometry(r0, r1, h, VRN.lite ? 20 : 48, VRN.lite ? 4 : 12, true), p = g.attributes.position, col = [], c = new THREE.Color();
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), a = Math.atan2(z, x), t = (y + h / 2) / h, n = 1 + 0.05 * Math.sin(a * 9 + y * 0.3) + 0.035 * Math.sin(a * 23 + y * 0.7) + 0.02 * Math.sin(a * 51);
p.setXYZ(i, x * n, y, z * n);
var band = 0.5 + 0.5 * Math.sin(y * 0.45 + Math.sin(a * 5) * 1.5);
c.setHex(0x1E1C1A).lerp(new THREE.Color(0x4A4038), band * 0.7).lerp(new THREE.Color(0x6A6050), t * 0.35);
var su = Math.sin(a * 7 + y * 0.21) * Math.sin(a * 3 - y * 0.13);
if (su > 0.72)
c.lerp(new THREE.Color(0xB8A030), (su - 0.72) * 2.2);
else if (su < -0.8)
c.lerp(new THREE.Color(0x7A2A12), (-su - 0.8) * 2.5);
col.push(c.r, c.g, c.b);
}
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.computeVertexNormals();
var m = VRN.lite ? new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }) : new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide, map: vrnTex("stone", 6) });
return new THREE.Mesh(g, m);
},
function (r, R) {
var g = new THREE.SphereGeometry(r, VRN.lite ? 14 : 30, VRN.lite ? 8 : 14, 0.5, Math.PI * 2 - 1.0, 0, Math.PI / 2), p = g.attributes.position, col = [], c = new THREE.Color(), s0 = R() * 9;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), a = Math.atan2(z, x), n = 1 + 0.1 * Math.sin(a * 6 + s0) + 0.07 * Math.sin(y * 1.3 + a * 9) + 0.05 * Math.sin(a * 17 + y);
p.setXYZ(i, x * n, y * n, z * n);
var t = y / r, f = 0.5 + 0.5 * Math.sin(a * 13 + y * 2 + s0);
c.setHex(0x2A3634).lerp(new THREE.Color(0x5A6A60), f * 0.6);
if (t < 0.22)
c.lerp(new THREE.Color(0x3A5A2A), 0.5 * (1 - t / 0.22));
col.push(c.r, c.g, c.b);
}
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.computeVertexNormals();
var m = VRN.lite ? new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }) : new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide, map: vrnTex("stone", 3) });
return new THREE.Mesh(g, m);
},
function (r, hgt, R) {
var g = new THREE.SphereGeometry(1, VRN.lite ? 14 : 28, VRN.lite ? 8 : 16, 0, Math.PI * 2, 0, Math.PI / 2), p = g.attributes.position, col = [], c = new THREE.Color(), s0 = R() * 10;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), a = Math.atan2(z, x), n = 0.82 + 0.12 * Math.sin(a * 3 + s0) + 0.08 * Math.sin(a * 7 + s0 * 2) + 0.06 * Math.sin(y * 9 + a * 5);
p.setXYZ(i, x * r * n, Math.pow(y, 0.8) * hgt * (0.9 + 0.1 * Math.sin(a * 4 + s0)), z * r * n);
var f = 0.5 + 0.5 * Math.sin(a * 11 + y * 13 + s0);
if (y > 0.82)
c.setHex(0x6A6A5A).lerp(new THREE.Color(0x3A5A2A), f * 0.6);
else
c.setHex(0x2A5A22).lerp(new THREE.Color(0x4A7A30), f * 0.7);
col.push(c.r, c.g, c.b);
}
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.computeVertexNormals();
var m = vrnC(0xFFFFFF, {}).clone();
m.vertexColors = true;
m.needsUpdate = true;
return new THREE.Mesh(g, m);
},
function () {
if (VLG.flagM)
return VLG.flagM;
var c = document.createElement("canvas");
c.width = 190;
c.height = 100;
var x = c.getContext("2d");
for (var i = 0; i < 13; i++) {
x.fillStyle = i % 2 ? "#F4F0E6" : "#B22234";
x.fillRect(0, i * 100 / 13, 190, 100 / 13 + 0.5);
}
x.fillStyle = "#3C3B6E";
x.fillRect(0, 0, 76, 54);
x.fillStyle = "#F4F0E6";
for (var r = 0; r < 5; r++)
for (var k = 0; k < 8; k++)
if (r * 8 + k < 37) {
x.beginPath();
x.arc(6 + k * 9.2, 6 + r * 10.4, 2.1, 0, 6.3);
x.fill();
}
var t = new THREE.CanvasTexture(c);
VLG.flagM = new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide });
return VLG.flagM;
},
function (o) {
o = o || {};
var g = new THREE.Group(), L = o.L || 70, B = o.B || 12, D = o.D || 7, lite = VRN.lite, spar = vrnSurf("wood", 0x5A4632, 1), deckW = vrnSurf("wood", 0xB89A6A, 3), rope = vlgMat(0x2A2018), canvas = vlgMat(0xEDE6D2), iron = vrnMetal(0x2A2A2E);
var h = vlgHullMesh(L, B, D, { hull: o.hull, band: o.band });
h.position.y = 0.9;
g.add(h);
vrnBoxM(L * 0.9, 0.25, B * 0.92, deckW, -L * 0.02, 0.6, 0, g);
[-1, 1].forEach(function (s) { var bw = vrnBoxM(L * 0.86, 1.0, 0.2, vlgMat(o.hull || 0x16171A), -L * 0.03, 1.3, s * (B / 2 - 0.15), g); wBox(L * 0.86, 0.12, 0.36, vlgMat(0xE8E4DA), -L * 0.03, 1.86, s * (B / 2 - 0.15), g); });
if (o.ports !== false)
for (var p = -L / 2 + 7; p < L * 0.3; p += lite ? 7 : 3.6)
[-1, 1].forEach(function (s) { wBox(0.9, 0.75, 0.12, vlgMat(0x0E0E10), p, -0.4, s * (B / 2 + 0.06), g); });
var bs = wCyl(0.32, 0.5, L * 0.26, spar, L / 2 + L * 0.08, 2.6, 0, g, 8);
bs.rotation.z = Math.PI / 2 - 0.22;
var masts = o.masts || [L * 0.27, 0, -L * 0.28], mh = o.mh || 32;
masts.forEach(function (mx, i) {
var H = mh * (i === 0 ? 0.92 : i === 1 ? 1 : 0.84);
wCyl(0.3, 0.5, H * 0.6, spar, mx, H * 0.3, 0, g, 8);
wCyl(0.18, 0.28, H * 0.42, spar, mx, H * 0.79, 0, g, 7);
vrnBoxM(3.4, 0.18, 3.4, spar, mx, H * 0.58, 0, g);
[[0.34, 1], [0.55, 0.8], [0.74, 0.62], [0.9, 0.44]].forEach(function (f) {
var w = B * 1.35 * f[1], yd = wCyl(0.14, 0.14, w, spar, mx, H * f[0], 0, g, 6);
yd.rotation.x = Math.PI / 2;
if (!lite || f[0] < 0.6) {
var sl = wCyl(0.32, 0.32, w * 0.92, canvas, mx + 0.15, H * f[0] + 0.28, 0, g, 7);
sl.rotation.x = Math.PI / 2;
}
});
if (!lite)
[-1, 1].forEach(function (s) { for (var r = 0; r < 5; r++) {
var x0 = mx - 1.2 + r * 0.6, z0 = s * (B / 2 + 0.3), y1 = H * 0.58, dz = -s * (B / 2 + 0.3 - 1.6), len = Math.hypot(y1 - 1.9, dz), sh = wCyl(0.035, 0.035, len, rope, x0, (1.9 + y1) / 2, (z0 + s * 1.6) / 2, g, 3);
sh.rotation.x = s * Math.atan2(B / 2 + 0.3 - 1.6, y1 - 1.9);
} });
if (i < masts.length - 1 || true) {
var tx = i === 0 ? L / 2 + L * 0.18 : masts[i - 1], ty = i === 0 ? 5 : mh * 0.6, dx = tx - mx, dy = ty - H * 0.85, st = wCyl(0.03, 0.03, Math.hypot(dx, dy), rope, (mx + tx) / 2, (H * 0.85 + ty) / 2, 0, g, 3);
st.rotation.z = -Math.atan2(dx, dy);
}
});
if (o.funnel !== false) {
var fx = o.fx != null ? o.fx : -L * 0.1;
wCyl(1.4, 1.4, 9, vlgMat(0x22222A), fx, 5, 0, g, 14);
wCyl(1.48, 1.48, 1.2, vlgMat(o.band2 || 0xB83A2A), fx, 8.6, 0, g, 14);
wCyl(1.6, 1.4, 0.4, iron, fx, 9.7, 0, g, 14);
}
if (!lite)
[-1, 1].forEach(function (s) { [-L * 0.18, L * 0.12].forEach(function (bx) { var bt = vrnBoxM(5.5, 0.8, 1.5, vlgMat(0xE8E4DA), bx, 2.6, s * (B / 2 + 0.6), g); [-2.2, 2.2].forEach(function (d) { var dv = wCyl(0.07, 0.07, 3, iron, bx + d, 2.4, s * (B / 2 + 0.2), g, 4); }); }); });
vrnBoxM(4, 0.8, 2.6, vrnSurf("wood", 0x6A4A2A, 2), -L * 0.2, 1.1, 0, g);
if (o.flag !== false) {
var fl = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), vlgFlagMat());
fl.position.set(-L / 2 - 1.4, 6.4, 0);
g.add(fl);
wCyl(0.05, 0.05, 6, spar, -L / 2 - 0.4, 4, 0, g, 4);
}
if (o.lamps) {
[[L / 2, 8, 0, 0xFFFFFF], [0, 4, B / 2, 0x2AE05A], [0, 4, -B / 2, 0xE0302A]].forEach(function (l) { var gl = wGlow(l[3], 3, 0.6); gl.position.set(l[0], l[1], l[2]); g.add(gl); });
}
return g;
},
function (grp, X0, Z0, dy, L, hb, masts, o) {
o = o || {};
var lite = VRN.lite, wood = vrnSurf("wood", 0x6A4A2A, 1), dark = vlgMat(0x2A1E14), iron = vrnMetal(0x26262A), rope = vlgMat(0x2A2018), white = vlgMat(0xE8E4DA), canvas = vlgMat(0xEDE6D2), gilt = vlgMat(0xC8A040, { shine: 60, spec: 0x5a4a20 }), hull = vlgMat(0x16171A), bowX = L / 2, sternX = -L / 2;
function P(x, y, z) { return [X0 + x, dy + y, Z0 + z]; }
function line(a, b, r, m) { var A = new THREE.Vector3(a[0], a[1], a[2]), B2 = new THREE.Vector3(b[0], b[1], b[2]), c = wCyl(r || 0.03, r || 0.03, A.distanceTo(B2), m || rope, (A.x + B2.x) / 2, (A.y + B2.y) / 2, (A.z + B2.z) / 2, grp, 3); c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B2.clone().sub(A).normalize()); return c; }
[-1, 1].forEach(function (s) {
for (var x = sternX + 3; x < bowX - 6; x += 1.0) {
var hm = wCyl(0.18, 0.18, 0.95, vlgMat([0xD8D0C0, 0xC8C0B0, 0xE0D8C8][((x * 7) | 0) % 3]), X0 + x, dy + 1.35, Z0 + s * (hb - 0.05), grp, 6);
hm.rotation.z = Math.PI / 2;
}
[-0.3, 0.05, 0.32].forEach(function (f) {
var px = f * L;
vrnBoxM(3.2, 0.12, 0.25, wood, X0 + px, dy + 0.9, Z0 + s * (hb - 0.35), grp);
for (var b = 0; b < 8; b++)
wCyl(0.03, 0.03, 0.35, vlgMat(0x8A6A44), X0 + px - 1.4 + b * 0.4, dy + 1.0, Z0 + s * (hb - 0.35), grp, 4);
for (var c = 0; c < 3; c++) {
var co = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 4, 10), vlgMat(0xA88A5A));
co.position.set(X0 + px - 1 + c, dy + 0.7, Z0 + s * (hb - 0.2));
grp.add(co);
}
});
});
(o.hatches || [-0.18, 0.15]).forEach(function (f) { var hx = X0 + f * L; vrnBoxM(3, 0.35, 2.4, wood, hx, dy + 0.18, Z0, grp); for (var g = 0; g < 6; g++)
vrnBoxM(2.8, 0.06, 0.08, dark, hx, dy + 0.38, Z0 - 1.0 + g * 0.4, grp); for (var g2 = 0; g2 < 7; g2++)
vrnBoxM(0.08, 0.06, 2.2, dark, hx - 1.2 + g2 * 0.4, dy + 0.39, Z0, grp); if (!o.noSolid)
vrnSolid({ x: hx, z: Z0, hw: 1.5, hd: 1.2, h: 0.5 }); });
var cx = X0 + (o.capstan != null ? o.capstan : 0.2 * L);
wCyl(0.55, 0.7, 1.1, wood, cx, dy + 0.55, Z0, grp, 12);
wCyl(0.75, 0.75, 0.12, dark, cx, dy + 1.12, Z0, grp, 12);
for (var k = 0; k < 8; k++) {
var bar = wBox(2.6, 0.07, 0.07, wood, cx, dy + 1.0, Z0, grp);
bar.rotation.y = k * Math.PI / 8;
}
if (!o.noSolid)
vrnSolid({ x: cx, z: Z0, r: 0.8 });
[-1, 1].forEach(function (s) { var ax = X0 + bowX - 5; vrnBoxM(1.6, 0.3, 0.3, wood, ax, dy + 1.5, Z0 + s * (hb + 0.4), grp); var sh = wBox(0.15, 2.2, 0.15, iron, ax + 0.4, dy + 0.3, Z0 + s * (hb + 0.7), grp); var st = wBox(0.15, 0.15, 1.6, iron, ax + 0.4, dy + 1.3, Z0 + s * (hb + 0.7), grp); var fl = wBox(1.4, 0.12, 0.12, iron, ax + 0.4, dy - 0.7, Z0 + s * (hb + 0.7), grp); fl.rotation.z = 0.4; });
if (o.bs) {
var fm = masts[masts.length - 1];
[[0.95, 0.0], [0.82, 0.3], [0.7, 0.6]].forEach(function (h, i) { var top = P(fm[0], fm[1] * h[0], 0), end = P(bowX + o.bs * (0.6 + h[1] * 0.6), 2.6 + h[1] * 0.8, 0); line(top, end, 0.035); if (!lite && i < 2) {
var j = line([top[0] * 0.35 + end[0] * 0.65, top[1] * 0.35 + end[1] * 0.65, top[2]], [end[0] - 1, end[1] + 0.4, end[2]], 0.16, canvas);
} });
}
masts.forEach(function (m, i) {
var mx = m[0], H = m[1];
if (!lite)
[-1, 1].forEach(function (s) { for (var y = 1.2; y < H * 0.55; y += 0.55) {
var t = y / (H * 0.6), z = s * (hb + 0.3 - (hb - 0.6) * t);
vrnBoxM(2.6 * (1 - t * 0.6), 0.02, 0.02, rope, X0 + mx, dy + y, Z0 + z, grp);
} line(P(mx, H * 0.95, 0), P(mx - H * 0.25, 1.2, s * (hb + 0.2)), 0.03); });
if (i < masts.length - 1) {
var nx = masts[i + 1];
line(P(mx, H * 0.9, 0), P(nx[0], nx[1] * 0.58, 0), 0.035);
line(P(mx, H * 0.62, 0), P(nx[0], 1.6, 0), 0.035);
}
vrnBoxM(0.2, 0.2, 4.2, wood, X0 + mx, dy + H * 0.82, Z0, grp);
});
var mm = masts[1] || masts[0], pn = new THREE.Mesh(new THREE.PlaneGeometry(9, 0.35), vlgMat(0xB22234, { ds: true }));
pn.position.set(X0 + mm[0] - 4.5, dy + mm[1] - 0.4, Z0);
pn.rotation.z = -0.04;
grp.add(pn);
if (!o.noBoats)
[-1, 1].forEach(function (s) {
var bx = X0 + sternX + 9, bt = new THREE.Mesh(new THREE.SphereGeometry(1, lite ? 8 : 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), white);
bt.scale.set(3, 0.8, 0.85);
bt.position.set(bx, dy + 2.6, Z0 + s * (hb + 1.4));
grp.add(bt);
wBox(5.8, 0.06, 1.4, vlgMat(0x6A5A44), bx, dy + 2.62, Z0 + s * (hb + 1.4), grp);
[-2.4, 2.4].forEach(function (d) { wCyl(0.08, 0.1, 3.6, iron, bx + d, dy + 1.8, Z0 + s * (hb + 0.3), grp, 6); var arm = wCyl(0.07, 0.07, 1.3, iron, bx + d, dy + 3.55, Z0 + s * (hb + 0.9), grp, 6); arm.rotation.x = Math.PI / 2; line(P(bx - X0 + d, 3.5, s * (hb + 1.4)), P(bx - X0 + d, 2.7, s * (hb + 1.4)), 0.015); });
});
for (var w = -2; w <= 2; w++) {
var wn = wBox(0.08, 0.9, 0.8, vlgMat(0xF0D890, { e: 0xC8A040, ei: 0.5 }), X0 + sternX - o.st, dy - 0.6, Z0 + w * 1.6, grp);
wBox(0.1, 1.1, 1.0, gilt, X0 + sternX - o.st + 0.03, dy - 0.6, Z0 + w * 1.6, grp).scale.set(1, 1, 1);
}
vrnBoxM(0.15, 0.25, hb * 1.5, gilt, X0 + sternX - o.st + 0.05, dy + 0.2, Z0, grp);
[-1.6, 0, 1.6].forEach(function (z, i) { var lh = i === 1 ? 1.0 : 0.75; wCyl(0.05, 0.05, 1.2, iron, X0 + sternX + 0.3, dy + 1.8, Z0 + z, grp, 4); wCyl(0.25, 0.3, lh, vlgMat(0xFFE8B0, { e: 0xFFD080, ei: 0.7 }), X0 + sternX + 0.3, dy + 2.6 + lh / 2, Z0 + z, grp, 6); wCone(0.32, 0.35, gilt, X0 + sternX + 0.3, dy + 3.0 + lh, Z0 + z, grp, 6); });
var eg = new THREE.Group();
eg.position.set(X0 + bowX + o.head, dy + o.headY, Z0);
grp.add(eg);
wSph(0.5, gilt, 0, 0, 0, eg, 8).scale.set(1.4, 0.9, 0.8);
wSph(0.25, gilt, 0.6, 0.35, 0, eg, 8);
wCone(0.12, 0.4, gilt, 0.95, 0.32, 0, eg, 6).rotation.z = -Math.PI / 2;
[-1, 1].forEach(function (s) { var wg = wBox(0.9, 0.08, 1.4, gilt, -0.2, 0.3, s * 0.8, eg); wg.rotation.x = s * 0.6; });
if (o.ports)
[-1, 1].forEach(function (s) { for (var p = -L / 2 + 7; p < L * 0.3; p += lite ? 7 : 3.6) {
var gb = wCyl(0.14, 0.18, 1.2, iron, X0 + p, dy + o.ports, Z0 + s * (hb + o.portOut), grp, 8);
gb.rotation.x = Math.PI / 2;
} });
var cr = o.crew || [];
cr.forEach(function (c, i) { var off = c[2] === "gent"; vrnFolk(grp, 4300 + i + (o.seed || 0), X0 + c[0], Z0 + c[1], off ? { still: 1, y: dy, look: { sex: "m", top: 0xF2EEE2, bottom: 0x1A2238, topKind: null, layer: "suit", layerColor: 0x1A2238, hat: "cap", hatColor: 0x1A2238 } } : { still: 1, y: dy, sailor: 1 }); });
},
function (grp, I) {
var X = I.x, Z = I.z, wall = vrnSurf("plaster", 0xD8CCB0, 2), wood = vrnSurf("wood", 0x7A4A2A, 2);
vrnInFloor(grp, X, Z, 36, 26, 0, vrnSurf("wood", 0x8A5A34, 3));
vrnIWall(grp, X - 18, Z - 13, X + 18, Z - 13, 4.4, wall);
vrnIWall(grp, X - 18, Z + 13, X + 18, Z + 13, 4.4, wall, [[18, 2.2, 2.8]]);
vrnIWall(grp, X - 18, Z - 13, X - 18, Z + 13, 4.4, wall);
vrnIWall(grp, X + 18, Z - 13, X + 18, Z + 13, 4.4, wall);
vrnIWall(grp, X + 5, Z - 13, X + 5, Z + 13, 4.4, wall, [[13, 2, 2.6]]);
vrnBoxM(36, 0.2, 26, vlgMat(0xEAE2D0), X, 4.5, Z, grp);
[-12, -4, 10].forEach(function (wx) { var w = new THREE.Mesh(new THREE.PlaneGeometry(2, 2.6), vlgMat(0xB8C8D8, { e: 0x8A9AB0, ei: 0.5 })); w.position.set(X + wx, 2.4, Z - 12.8); grp.add(w); vrnBoxM(2.4, 0.15, 0.3, wood, X + wx, 1.05, Z - 12.75, grp); });
for (var l = -12; l <= 12; l += 12) {
var g = wGlow(0xFFE8B8, 5, 0.3);
g.position.set(X + l, 4, Z);
grp.add(g);
wBox(0.4, 0.3, 0.4, vlgMat(0xF8E8C0, { e: 0xFFD890, ei: 0.8 }), X + l, 4.2, Z, grp);
}
vrnRug(grp, X - 6, Z, 14, 10, 0x6A2A2A);
vrnTable(grp, X - 11, Z - 8, 3, 1.4, 0, 0x4A2A16);
vrnChair(grp, X - 11, Z - 6.6, Math.PI, 0x5A2A1A);
for (var n = 0; n < 4; n++) {
var pp = wBox(0.42, 0.01, 0.3, vlgMat(0xEDE6D4), X - 12 + n * 0.5, 0.86, Z - 8 + (n % 2) * 0.2, grp);
pp.rotation.y = n * 0.3;
}
vrnSpot(X - 11, Z - 7, 2.6, "The newspapers on the desk", "read what the world says of the monster", function () { worldCard(VRN_H + "📰 The newspapers, March 1867</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>The New York Herald, the Times of London, the Journal des Débats: every one of them has the monster. " + Q("In every place of great resort the monster was the fashion.") + " They sang of it in the cafés, mocked it in the papers, and represented it on the stage.</div>", {}); }, 0);
var crate = vrnSurf("wood", 0xA88A5A, 1.5);
[[-15, 6], [-13, 9], [-9, 9.5], [-15, 10], [-6, 10]].forEach(function (c, i) { vrnBoxM(1.6, 1.1 + (i % 2) * 0.5, 1.2, crate, X + c[0], 0.6, Z + c[1], grp); vrnSolid({ x: X + c[0], z: Z + c[1], hw: 0.9, hd: 0.7 }); });
var bison = new THREE.Group();
bison.position.set(X - 17.6, 2.6, Z + 2);
grp.add(bison);
wSph(0.6, vlgMat(0x4A3420), 0, 0, 0.3, bison, 10);
[-1, 1].forEach(function (s) { var h = wCone(0.08, 0.4, vlgMat(0x2A2A2A), s * 0.4, 0.35, 0.3, bison, 6); h.rotation.z = -s * 1.2; });
for (var t = 0; t < 3; t++) {
vrnBoxM(1.2, 0.1, 0.8, wood, X - 2, 0.8 + t * 0.5, Z + 11.6, grp);
for (var r = 0; r < 4; r++)
wSph(0.08, vlgMat([0xC8B898, 0x8A7A6A, 0xD8C8A8, 0x6A5A4A][r]), X - 2.4 + r * 0.25, 0.9 + t * 0.5, Z + 11.6, grp, 6);
}
vrnSpot(X - 11, Z + 8, 3, "The Nebraska collection", "look at the crates", function () { worldCard(VRN_H + "🦬 The Nebraska collection</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>Six months of mineralogy, botany and zoology from the badlands of Nebraska, waiting for the ship to Paris. " + Q("After six months in Nebraska, I arrived in New York towards the end of March, laden with a precious collection.") + "</div>", {}); }, 0);
var bed = new THREE.Group();
bed.position.set(X + 13, 0, Z - 8);
grp.add(bed);
vrnBoxM(2.2, 0.6, 4, vlgMat(0xF0EAE0), 0, 0.6, 0, bed);
vrnBoxM(2.4, 1.4, 0.2, wood, 0, 0.9, -2, bed);
vrnSolid({ x: X + 13, z: Z - 8, hw: 1.2, hd: 2 });
[[10, 6], [12.5, 6.4], [15, 6]].forEach(function (c, i) { var tr = vrnBoxM(1.6, 0.9, 0.9, vlgMat([0x5A3A22, 0x3A2A1E, 0x6A4A2A][i]), X + c[0], 0.45, Z + c[1], grp); wBox(1.62, 0.1, 0.92, vrnBrass(), X + c[0], 0.7, Z + c[1], grp); });
vrnSpot(X + 12.5, Z + 4.8, 2.6, "The trunks", "see what Conseil is packing", function () { setStatus("🧳 Shirts, instruments, the professor's notebooks; and on top, carefully, the case of preserved specimens Conseil has classified himself."); }, 0);
vrnSpot(X, Z + 12, 2.6, "The door to the street", "go down to Brooklyn pier", function () { vrnLeave("vlg_hotel"); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, deck = vrnSurf("wood", 0xB89A6A, 4), hullM = vlgMat(0x1A1A1E), wood = vrnSurf("wood", 0x6A4A2A, 2), white = vlgMat(0xE8E4DA), brass = vrnBrass(), iron = vrnMetal(0x2A2A2E);
vlgSea(grp, X, Z, -2.6, 900);
I.night = vlgDome(grp, X, Z, 280, 0x050A18, 0.86);
I.night.visible = false;
if (I.night.userData.stars)
I.night.userData.stars.visible = false;
var hl = vlgHullMesh(102, 13.6, 7.8, { sheer: 0.9 });
hl.position.set(X + 3, -0.15, Z);
grp.add(hl);
[-1, 1].forEach(function (s) { for (var p = -40; p < 30; p += 3.6)
wBox(0.9, 0.7, 0.12, vlgMat(0x0E0E10), X + p, -1.3, Z + s * 6.86, grp); });
var ens = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), vlgFlagMat());
ens.position.set(X - 50, 5.4, Z);
grp.add(ens);
wCyl(0.05, 0.05, 6, vrnSurf("wood", 0x5A4632, 1), X - 48.4, 3, Z, grp, 4);
vrnInFloor(grp, X, Z, 92, 12, 0, deck);
vrnFloor(X + 48, Z, 4, 3.6, 0, { inside: 1 });
vrnBoxM(8, 0.2, 7, deck, X + 48, -0.1, Z, grp);
vlgRail(grp, X - 46, Z - 6, X + 44, Z - 6, 0, 1.1, wood);
vlgRail(grp, X - 46, Z + 6, X + 44, Z + 6, 0, 1.1, wood);
vlgRail(grp, X - 46, Z - 6, X - 46, Z + 6, 0, 1.1, wood);
vlgRail(grp, X + 44, Z - 6, X + 52, Z, 0, 1.1, wood);
vlgRail(grp, X + 44, Z + 6, X + 52, Z, 0, 1.1, wood);
var bs = wCyl(0.35, 0.5, 18, wood, X + 58, 3, Z, grp, 8);
bs.rotation.z = Math.PI / 2 - 0.25;
[[-24, 30, "mizzen"], [2, 36, "main"], [26, 33, "fore"]].forEach(function (m) {
var mx = X + m[0];
wCyl(0.35, 0.55, m[1], vrnSurf("wood", 0x6A5A44, 1), mx, m[1] / 2, Z, grp, 8);
vrnSolid({ x: mx, z: Z, r: 0.7 });
[0.42, 0.62, 0.8].forEach(function (f, k) { var yy = m[1] * f, yd = wCyl(0.16, 0.16, 15 - k * 3, vrnSurf("wood", 0x6A5A44, 1), mx, yy, Z, grp, 5); yd.rotation.x = Math.PI / 2; var sl = wCyl(0.32, 0.32, 14 - k * 3, white, mx, yy + 0.3, Z, grp, 6); sl.rotation.x = Math.PI / 2; });
[-1, 1].forEach(function (s) { for (var r = 0; r < 4; r++) {
var sh = wCyl(0.03, 0.03, m[1] * 0.75, vlgMat(0x2A2018), mx - 1.5 + r, m[1] * 0.38, Z + s * 4.2, grp, 3);
sh.rotation.x = s * 0.17;
} });
});
vrnBoxM(4, 0.2, 4, wood, X + 2, 22, Z, grp);
vrnFloor(X + 2, Z, 2, 2, 22.1, { inside: 1 });
vlgRail(grp, X, Z - 2, X + 4, Z - 2, 22.1, 0.9, wood);
vlgRail(grp, X, Z + 2, X + 4, Z + 2, 22.1, 0.9, wood);
vlgRail(grp, X + 4, Z - 2, X + 4, Z + 2, 22.1, 0.9, wood);
vrnSpot(X + 2.5, Z + 4.6, 2.4, "The shrouds of the mainmast", "climb to the main top", function () { vrnMove(X + 1, Z, Math.PI / 2, "🔭 <b>The main top.</b> Twenty-two metres over the deck, the whole sea round you. Every man aboard would give a year's pay to be the first to see the monster.", 22.1); }, 0);
vrnSpot(X + 1, Z + 1, 1.6, "The way down the shrouds", "climb down to the deck", function () { vrnMove(X + 2.5, Z + 4.2, null, null, 0); }, 22.1);
wCyl(1.6, 1.6, 11, vlgMat(0x2A2A2A), X - 10, 5.5, Z, grp, 14);
wCyl(1.65, 1.65, 1.2, vlgMat(0xB8302A), X - 10, 10.4, Z, grp, 14);
vrnSolid({ x: X - 10, z: Z, r: 1.8 });
vrnBoxM(5, 1.1, 3.4, wood, X - 3, 0.55, Z, grp);
vrnSolid({ x: X - 3, z: Z, hw: 2.6, hd: 1.8 });
vrnSpot(X - 3, Z + 2.6, 2.4, "The engine-room skylight", "listen to the engines", function () { setStatus("🔥 Below, the stokers feed the furnaces; the high-pressure engines thud. " + Q("Under this the Abraham Lincoln attained the mean speed of nearly eighteen knots and a third an hour")); }, 0);
for (var g = 0; g < 4; g++)
[-1, 1].forEach(function (s) { var gx = X - 30 + g * 14, gz = Z + s * 4.6; vrnBoxM(1.6, 0.6, 1.2, wood, gx, 0.3, gz, grp); var b = wCyl(0.25, 0.32, 3, iron, gx, 0.85, gz + s * 0.6, grp, 10); b.rotation.x = s * Math.PI / 2; vrnSolid({ x: gx, z: gz, hw: 0.9, hd: 0.9 }); });
var lg = wCyl(0.3, 0.42, 4.4, iron, X + 38, 1.1, Z, grp, 12);
lg.rotation.z = Math.PI / 2;
vrnBoxM(2.2, 0.8, 1.4, wood, X + 37, 0.4, Z, grp);
vrnSolid({ x: X + 37, z: Z, hw: 1.4, hd: 0.9 });
vrnSpot(X + 36, Z + 2, 2.4, "The long gun on the forecastle", "look at it", function () { setStatus("💥 A breech-loading gun, the newest the arsenals had; it throws a shell of four kilos nine miles."); }, 0);
var rack = new THREE.Group();
rack.position.set(X + 40, 0, Z - 4.6);
grp.add(rack);
vrnBoxM(3, 0.2, 0.6, wood, 0, 1.5, 0, rack);
for (var h = 0; h < 5; h++) {
wCyl(0.02, 0.02, 2.2, vrnSurf("wood", 0x7A5A3A, 1), -1.2 + h * 0.6, 1.1, 0, rack, 5);
wCone(0.05, 0.2, iron, -1.2 + h * 0.6, 2.3, 0, rack, 4);
}
vrnSpot(X + 40, Z - 3, 2.4, "Ned Land's harpoons", "look at the harpoons", function () { setStatus("🔱 Five harpoons and the lines coiled in their tubs. Ned Land's own is the long one, its iron worn bright."); }, 0);
var wh = new THREE.Group();
wh.position.set(X - 42, 1.4, Z);
grp.add(wh);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.06, 5, 20), wood);
rim.rotation.y = Math.PI / 2;
wh.add(rim);
for (var sp = 0; sp < 8; sp++) {
var s2 = wBox(0.05, 1.9, 0.05, wood, 0, 0, 0, wh);
s2.rotation.x = sp / 8 * Math.PI;
}
vrnBoxM(0.4, 1.4, 0.4, wood, X - 42.5, 0.7, Z, grp);
wCyl(0.35, 0.4, 1.1, brass, X - 39.5, 0.55, Z, grp, 10);
vrnSolid({ x: X - 42, z: Z, r: 1 });
vrnSpot(X - 41, Z + 1.6, 2.4, "The frigate's wheel", "look at the compass", function () { setStatus("🧭 The binnacle compass swings and settles: the frigate's course is set for the North Pacific, where the monster was last seen."); }, 0);
var dh = vrnSurf("wood", 0x8A6A44, 2);
vrnIWall(grp, X - 38, Z - 4, X - 26, Z - 4, 2.6, dh);
vrnIWall(grp, X - 38, Z + 4, X - 26, Z + 4, 2.6, dh);
vrnIWall(grp, X - 38, Z - 4, X - 38, Z + 4, 2.6, dh);
vrnIWall(grp, X - 26, Z - 4, X - 26, Z + 4, 2.6, dh, [[2, 1.2, 2.1], [6, 1.2, 2.1]]);
vrnIWall(grp, X - 32, Z - 4, X - 32, Z + 4, 2.6, dh);
vrnBoxM(12.4, 0.2, 8.4, dh, X - 32, 2.7, Z, grp);
vrnTable(grp, X - 35, Z - 2, 2, 1, 0, 0x4A2A16);
vrnChair(grp, X - 35, Z - 0.8, Math.PI, 0x3A2A1A);
vrnBoxM(1.6, 0.5, 3, vlgMat(0xE8E0D0), X - 29, 0.4, Z + 2, grp);
var gl = wGlow(0xFFE0A0, 3, 0.35);
gl.position.set(X - 32, 2.2, Z);
grp.add(gl);
(function () {
var oak = vrnSurf("wood", 0x5A3A22, 1), lin = vlgMat(0xEDE8DC), red = vlgMat(0x7A2A22), navy = vlgMat(0x1E2A4A), sea = vlgMat(0x8AB8D8, { e: 0x3A6A8A, ei: 0.35 }), glass = vlgMat(0xC8E0D0, { op: 0.55 });
vrnBoxM(5, 0.03, 6, red, X - 35, 0.02, Z, grp);
for (var r = 0; r < 5; r++)
vrnBoxM(5, 0.035, 0.12, vlgMat(0xC8A060), X - 35, 0.03, Z - 2.4 + r * 1.2, grp);
vrnBoxM(1.1, 0.5, 2.2, oak, X - 37.4, 0.35, Z + 2.6, grp);
vrnBoxM(1.0, 0.14, 2.0, navy, X - 37.4, 0.66, Z + 2.6, grp);
vrnBoxM(0.8, 0.16, 0.5, lin, X - 37.4, 0.78, Z + 3.4, grp);
vrnSolid({ x: X - 37.4, z: Z + 2.6, hw: 0.6, hd: 1.1 });
vrnBoxM(2.4, 2.1, 0.4, oak, X - 35, 1.05, Z + 3.75, grp);
for (var sh = 0; sh < 4; sh++) {
vrnBoxM(2.3, 0.05, 0.36, oak, X - 35, 0.3 + sh * 0.5, Z + 3.73, grp);
for (var b = 0; b < 9; b++)
vrnBoxM(0.18, 0.38, 0.28, vlgMat([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x8A6A3A][(b + sh) % 4]), X - 36 + b * 0.24, 0.52 + sh * 0.5, Z + 3.72, grp);
}
vrnBoxM(0.9, 0.5, 0.55, oak, X - 33, 0.25, Z - 3.6, grp);
vrnBoxM(0.95, 0.06, 0.6, iron, X - 33, 0.51, Z - 3.6, grp);
var ch = new THREE.Group();
ch.position.set(X - 35.6, 0.86, Z - 2.2);
grp.add(ch);
vrnBoxM(0.4, 0.2, 0.4, oak, 0, 0, 0, ch);
wCyl(0.14, 0.14, 0.04, brass, 0, 0.11, 0, ch, 12);
vrnBoxM(0.5, 0.02, 0.7, vlgMat(0xE8DCB8), X - 34.6, 0.82, Z - 2, grp);
wCyl(0.05, 0.06, 0.12, vlgMat(0x1A1A1A), X - 34.2, 0.86, Z - 2.3, grp, 6);
[-36.5, -33.5].forEach(function (px) { vrnBoxM(0.7, 0.5, 0.06, sea, X + px, 1.6, Z - 3.97, grp); vrnBoxM(0.82, 0.62, 0.04, brass, X + px, 1.6, Z - 3.99, grp); });
var pf = wBox(0.06, 0.7, 0.9, vlgMat(0x6A5A44), X - 37.95, 1.6, Z - 1, grp);
wBox(0.05, 0.55, 0.75, vlgMat(0x3A5A6A), X - 37.9, 1.6, Z - 1, grp);
vrnBoxM(1.5, 0.12, 2.8, lin, X - 29, 0.71, Z + 2, grp);
vrnBoxM(1.4, 0.08, 1.8, vlgMat(0x6A7A5A), X - 29, 0.8, Z + 1.6, grp);
vrnBoxM(0.7, 0.16, 0.5, lin, X - 29, 0.84, Z + 3.2, grp);
vrnBoxM(1.3, 0.5, 0.8, vlgMat(0x5A3A26), X - 29.6, 0.25, Z - 0.6, grp);
vrnBoxM(1.32, 0.06, 0.82, brass, X - 29.6, 0.42, Z - 0.6, grp);
vrnBoxM(0.9, 0.42, 0.6, vlgMat(0x3A2A1A), X - 28.2, 0.21, Z - 0.8, grp);
vrnBoxM(0.8, 0.9, 0.5, oak, X - 31.5, 0.45, Z - 3.6, grp);
wCyl(0.25, 0.18, 0.12, lin, X - 31.5, 0.96, Z - 3.6, grp, 10);
wCyl(0.1, 0.12, 0.3, lin, X - 31.3, 1.06, Z - 3.55, grp, 8);
vrnBoxM(0.6, 0.7, 0.04, vlgMat(0xB8C8D0, { shine: 90, spec: 0x8a8a8a }), X - 31.5, 1.6, Z - 3.96, grp);
vrnBoxM(2.2, 0.05, 0.3, oak, X - 28.6, 1.5, Z - 3.82, grp);
for (var j = 0; j < 7; j++) {
wCyl(0.08, 0.08, 0.26, glass, X - 29.5 + j * 0.3, 1.66, Z - 3.82, grp, 8);
wSph(0.05, vlgMat([0xC8A060, 0x6A8A5A, 0xB86A4A][j % 3]), X - 29.5 + j * 0.3, 1.62, Z - 3.82, grp, 6);
}
vrnBoxM(0.7, 0.5, 0.06, sea, X - 27.5, 1.6, Z + 3.97, grp);
vrnBoxM(0.82, 0.62, 0.04, brass, X - 27.5, 1.6, Z + 3.99, grp);
[[-35, -1], [-29, 0.6]].forEach(function (l) { wCyl(0.012, 0.012, 0.4, iron, X + l[0], 2.4, Z + l[1], grp, 3); wCyl(0.14, 0.18, 0.28, vlgMat(0xFFE8B0, { e: 0xFFC870, ei: 0.8 }), X + l[0], 2.06, Z + l[1], grp, 8); });
})();
vrnSpot(X - 35, Z - 1, 2, "The commander's charts", "look at the charts", function () { setStatus("🗺️ Farragut's charts of the Pacific, the monster's sightings marked in red ink, each with its date."); }, 0);
vrnSpot(X - 29, Z + 1, 2, "Cabin No. 2, the professor's", "go into your cabin", function () { setStatus("🛏️ A cabin aft, opening on the wardroom; Conseil has stowed the trunks under the bunk."); }, 0);
var cask = new THREE.Group();
cask.position.set(X + 76, -2.4, Z + 14);
grp.add(cask);
var cb = wCyl(0.6, 0.6, 1.4, vrnSurf("wood", 0x8A6A3A, 1), 0, 0, 0, cask, 10);
cb.rotation.z = Math.PI / 2;
I.cask = vlgLoose(cask);
VRN.fx.push({ k: "bob", m: cask, ph: 1 });
[[-20, 0], [10, 0], [38, 3]].forEach(function (p) { var lp = wGlow(0xFFE0A0, 3, 0.3); lp.position.set(X + p[0], 3, Z + p[1]); grp.add(lp); });
vrnSpot(X - 44, Z + 4, 2.4, "The gangway", "go back down to the quay", function () { vrnLeave("vlg_lincoln"); }, 0);
var mon = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 10), new THREE.MeshBasicMaterial({ color: 0xBFF0FF, transparent: true, opacity: 0.5, depthWrite: false, fog: false }));
mon.scale.set(36, 1.2, 6);
mon.position.set(X + 150, -2.2, Z - 60);
mon.visible = false;
grp.add(mon);
I.glow = mon;
vlgFrigateKit(grp, X - 1, Z, 0, 94, 6, [[-23, 30], [3, 36], [27, 33]], { bs: 14, st: 0.2, head: 3.5, headY: 1.2, hatches: [-0.17, 0.155], capstan: 0.215, ports: -1.3, portOut: 0.95,
crew: [[8, -3.4, "sailor"], [9.4, -3.6, "sailor"], [20.4, 1.6, "sailor"], [33, 3.4, "sailor"], [-39, -2.6, "gent"], [-20, 4.8, "sailor"], [16, 4.6, "sailor"], [-43, -4.2, "sailor"]] });
},
function (grp, I) {
var X = I.x, Z = I.z, plate = vlgMat(0x6A6458, { shine: 40, spec: 0x5A5A5A }), wood = vrnSurf("wood", 0x5A3420, 2), brass = vrnBrass(), steel = vrnMetal(0x5A6068);
vrnInFloor(grp, X, Z, 92, 20, 0, vrnSurf("wood", 0x6A3A22, 2));
vrnBoxM(92, 0.2, 20, plate, X, 3.6, Z, grp);
vrnIWall(grp, X - 46, Z - 10, X + 46, Z - 10, 3.6, plate);
vrnIWall(grp, X - 46, Z + 10, X + 46, Z + 10, 3.6, plate);
vrnIWall(grp, X - 46, Z - 10, X - 46, Z + 10, 3.6, plate);
vrnIWall(grp, X + 46, Z - 10, X + 46, Z + 10, 3.6, plate);
var N = [[-46, -34, "cell"], [-34, -22, "aronnax"], [-22, -12, "ned"], [-12, -2, "stair"], [-2, 14, "nemo"], [14, 46, "crewN"]], S = [[-46, -32, "galley"], [-32, -22, "bath"], [-22, -12, "boat"], [-12, -2, "salonway"], [-2, 46, "crew"]];
var pan = vrnSurf("wood", 0x6A3A22, 2), panD = vrnSurf("wood", 0x3A2014, 2);
function side(list, z) {
list.forEach(function (r) {
var mid = (r[1] - r[0]) / 2, dx = X + r[0] + mid;
vrnIWall(grp, X + r[0], Z + z, X + r[1], Z + z, 3.6, pan, [[mid, 1.4, 2.3]]);
vrnIWall(grp, X + r[1], Z + z, X + r[1], Z + z * 6.25, 3.6, plate);
[-0.75, 0.75].forEach(function (o) { wBox(0.1, 2.4, 0.36, brass, dx + o, 1.2, Z + z, grp); });
wBox(1.6, 0.12, 0.36, brass, dx, 2.36, Z + z, grp);
var dr = vrnBoxM(1.3, 2.2, 0.08, panD, dx - 0.7, 1.1, Z + z + (z < 0 ? -0.7 : 0.7), grp);
dr.rotation.y = Math.PI / 2;
});
}
side(N, -1.6);
side(S, 1.6);
vrnRug(grp, X, Z, 88, 2.2, 0x7A1A1A);
[-1, 1].forEach(function (s) { wBox(90, 0.07, 0.07, brass, X, 1.0, Z + s * 1.4, grp); wBox(90, 0.1, 0.06, brass, X, 1.2, Z + s * 1.43, grp); });
var seaM = vlgMat(0x1A5A7A, { e: 0x0A3A5A, ei: 0.9 });
[-9.8, 9.8].forEach(function (pz) {
for (var px = -42; px <= 42; px += VRN.lite ? 14 : 7) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.08, 6, 18), brass);
ring.position.set(X + px, 2.1, Z + pz);
grp.add(ring);
var gl = new THREE.Mesh(new THREE.CircleGeometry(0.4, 18), seaM);
gl.position.set(X + px, 2.1, Z + pz + (pz < 0 ? 0.02 : -0.02));
if (pz > 0)
gl.rotation.y = Math.PI;
grp.add(gl);
}
});
if (!VRN.lite) {
var rv = vrnMetal(0x4A4A44);
[-9.82, 9.82].forEach(function (pz) { [0.5, 3.3].forEach(function (ry) { for (var q = -45; q <= 45; q += 0.9)
wSph(0.05, rv, X + q, ry, Z + pz, grp, 4); }); });
}
for (var k = -42; k <= 42; k += 7) {
wSph(0.22, vlgMat(0xF8F0D8, { e: 0xFFF0C8, ei: 1 }), X + k, 3.3, Z, grp, 8);
}
for (var r = -44; r <= 44; r += 4) {
var rb = wBox(0.15, 0.15, 20, brass, X + r, 3.45, Z, grp);
}
vrnTable(grp, X - 40, Z - 6, 2, 1.2, 0, 0x3A3A3A);
for (var s = 0; s < 5; s++)
wCyl(0.25, 0.25, 0.5, steel, X - 43 + s * 1.4, 0.25, Z - 8.4, grp, 8);
I.cellLamp = wGlow(0xFFF4D8, 6, 0.0);
I.cellLamp.position.set(X - 40, 3, Z - 6);
grp.add(I.cellLamp);
vrnSpot(X - 40, Z - 5, 2.4, "The cell's iron walls", "feel the walls", function () { setStatus("🔩 Sheet-iron, bolted, without a seam you could get a nail into. No window. A door with no handle on this side."); }, 0);
vrnBoxM(1.8, 0.6, 3.6, vlgMat(0xF0EAE0), X - 31, 0.6, Z - 7, grp);
vrnTable(grp, X - 25, Z - 7.6, 2, 1, 0, 0x4A2A16);
vrnShelf(grp, X - 28, Z - 9.6, 4, 0, 2.6);
vrnSpot(X - 27, Z - 6, 2.4, "Your cabin", "rest a while", function () { setStatus("🛏️ A room fit for a guest: a bed, a dressing-table, a desk, and close by, the iron hull; beyond it, the sea."); }, 0);
[[-20, -7], [-14, -7]].forEach(function (b) { vrnBoxM(1.6, 0.5, 3.2, vlgMat(0xE8E0D0), X + b[0], 0.55, Z + b[1], grp); });
vrnSpot(X - 17, Z - 5, 2.4, "Ned and Conseil's cabin", "look in", function () { setStatus("🛏️ Two bunks. Ned Land's harpoon leans in the corner (Nemo lets him keep it); Conseil's notebook of classifications lies open on the other."); }, 0);
for (var st = 0; st < 9; st++)
vrnBoxM(2.2, 0.12, 0.6, steel, X - 7, 0.2 + st * 0.38, Z - 3 + (-st * 0.6), grp);
vrnSpot(X - 7, Z - 3, 2.6, "The iron stair to the platform", "go up onto the platform", function () { vrnEnter("vlg_deck"); }, 0);
vrnBoxM(1.4, 0.5, 3.4, vlgMat(0x3A3A3A), X + 11, 0.5, Z - 7.4, grp);
vrnTable(grp, X + 2, Z - 7.6, 2.6, 1.2, 0, 0x2A1A10);
vrnChair(grp, X + 2, Z - 6.4, Math.PI, 0x2A1A10);
var dials = [[0xF2EEE2, "thermometer"], [0xE8E0C8, "barometer"], [0xF2EEE2, "hygrometer"], [0xD8E8F0, "storm-glass"], [0xF2EEE2, "compass"], [0xE8E0C8, "sextant"], [0xF2EEE2, "chronometer"], [0xD8D0B8, "manometer"]];
dials.forEach(function (d, i) { var dx = X + 0.5 + i * 1.3, ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 6, 20), brass); ring.position.set(dx, 2.1, Z - 9.75); grp.add(ring); var face = new THREE.Mesh(new THREE.CircleGeometry(0.4, 20), vlgMat(d[0])); face.position.set(dx, 2.1, Z - 9.8); grp.add(face); });
vrnSpot(X + 5, Z - 8, 2.6, "The instruments in Captain Nemo's room", "look at the instruments", function () { worldCard(VRN_H + "🧭 The instruments</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>Thermometer, barometer, hygrometer, storm-glass, compass, sextant, chronometers, and the manometer that tells by the pressure of the water how deep she is. " + Q("\"These are the usual nautical instruments,\"") + " says Nemo. " + Q("here are the contrivances required for the navigation of the Nautilus.") + "</div>", {}); }, 0);
var pf = vrnSurf("wood", 0x2A1A0E, 1);
for (var p = 0; p < 7; p++) {
var px = X + 0.4 + p * 1.9;
vrnBoxM(1.3, 1.6, 0.08, pf, px, 2.2, Z - 1.75, grp);
wBox(1.1, 1.4, 0.02, vlgMat([0x6A5A4A, 0x5A4A3A, 0x7A6A5A, 0x4A3A2A, 0x6A5040, 0x5A5048, 0x4A4038][p]), px, 2.2, Z - 1.8, grp);
}
vrnBoxM(1, 1.2, 0.08, pf, X + 12.4, 1.6, Z - 9.75, grp);
wBox(0.84, 1.04, 0.02, vlgMat(0x8A7A6A), X + 12.4, 1.6, Z - 9.7, grp);
vrnSpot(X + 6, Z - 3, 2.4, "The portraits on Nemo's wall", "look at the portraits", function () { worldCard(VRN_H + "🖼️ The portraits</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>Engravings of the great men who gave their lives for the freedom of their people: Kosciusko, Botzaris, O'Connell, Washington, Manin, Lincoln, and John Brown. And over the bed, a small portrait of a young woman and two little children.</div>", {}); }, 0);
vrnBoxM(4, 1, 1.4, steel, X - 42, 0.5, Z + 8.4, grp);
for (var c = 0; c < 3; c++)
wCyl(0.3, 0.3, 0.25, vrnMetal(0x2A2A2A), X - 43.4 + c * 1.4, 1.1, Z + 8.4, grp, 10);
wCyl(0.7, 0.7, 2.2, brass, X - 36, 1.1, Z + 8, grp, 12);
var pipe = wCyl(0.08, 0.08, 4, brass, X - 38, 2.6, Z + 8, grp, 6);
pipe.rotation.z = Math.PI / 2;
vrnSpot(X - 38, Z + 6, 2.6, "The galley's still", "ask how it works", function () { setStatus("💧 " + Q("Then a door opened into a kitchen nine feet long, situated between the large store-rooms.") + " Beside it, the still that boils sea-water and gives fresh water to drink."); }, 0);
var tub = wCyl(0.9, 0.8, 0.8, vlgMat(0xF2F2F2, { shine: 60 }), X - 27, 0.4, Z + 7, grp, 16);
tub.scale.z = 1.8;
vrnSpot(X - 27, Z + 4.5, 2.2, "The bath-room", "look in", function () { setStatus("🛁 A bath-room, with hot and cold taps. Everything aboard, Nemo says, is done by electricity."); }, 0);
for (var lr = 0; lr < 8; lr++)
wBox(1.2, 0.06, 0.06, steel, X - 17, 0.4 + lr * 0.4, Z + 9.6, grp);
vrnSpot(X - 17, Z + 7.4, 2.4, "The ladder to the dinghy", "look up the ladder", function () { setStatus("🚣 The ladder climbs through a manhole into the dinghy, fitted into a recess of the hull. Both hatches close tight: the boat leaves the Nautilus, under the sea or on it."); }, 0);
for (var lr2 = 0; lr2 < 8; lr2++)
wBox(1.2, 0.06, 0.06, steel, X - 7, 0.4 + lr2 * 0.4, Z + 9.6, grp);
vrnSpot(X - 7, Z + 6, 2.6, "The ladder to the salon", "go up to the library and the salon", function () { var J = VRN_IN.nautilus; vrnInBuild(J); vrnMove(J.x - 24, J.z, Math.PI / 2, null, 0); }, 0);
for (var hm = 0; hm < 9; hm++) {
var hx = X + 2 + hm * 4.6;
[3, 8].forEach(function (hz) { var hk = wCyl(0.35, 0.35, 2.4, vlgMat(0xC8BC9A, { ds: true }), hx, 1.6, Z + hz, grp, 8, 0); hk.rotation.x = Math.PI / 2; hk.scale.y = 1; });
vrnBoxM(1, 0.6, 0.6, wood, hx, 0.3, Z + 5.5, grp);
}
vrnSpot(X + 20, Z + 4, 3, "The crew's quarters", "look in", function () { setStatus("🛌 Hammocks for twenty men, sea chests between. The crew speak among themselves a language no one aboard but they understands."); }, 0);
for (var bx = 0; bx < 6; bx++)
vrnBoxM(1.4, 1.2, 1.2, vrnSurf("wood", 0x8A6A44, 1.5), X + 18 + bx * 4, 0.6, Z - 6.5, grp);
vrnSpot(X + 28, Z - 4, 3, "The storerooms", "look in", function () { setStatus("📦 Casks of preserved fish, sea-weed flour, sugar from the sea-wrack, oil, the sodium in sealed jars."); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, iron = vrnMetal(0x3A4048), rail = vrnMetal(0x5A6068);
I.sea = vlgSea(grp, X, Z, 0, 1200);
VRN.fx.push({ k: "bob", m: I.sea, ph: 0, amp: 0.08 });
var sub = vrnNautilusModel();
sub.position.set(X, 0, Z);
sub.rotation.y = Math.PI / 2;
grp.add(sub);
I.sub = sub;
vrnBoxM(36, 0.25, 4, vlgMat(0x4A5058, { shine: 40 }), X, 4.15, Z, grp);
vrnFloor(X, Z, 18, 2, 4.3, { inside: 1 });
vlgRail(grp, X - 18, Z - 2, X + 18, Z - 2, 4.3, 0.8, rail);
vlgRail(grp, X - 18, Z + 2, X + 18, Z + 2, 4.3, 0.8, rail);
vlgRail(grp, X - 18, Z - 2, X - 18, Z + 2, 4.3, 0.8, rail);
vlgRail(grp, X + 18, Z - 2, X + 18, Z + 2, 4.3, 0.8, rail);
var hatch = wCyl(0.6, 0.6, 0.3, iron, X + 4, 4.45, Z, grp, 14);
var lid = wCyl(0.62, 0.62, 0.06, iron, X + 4.5, 5, Z, grp, 14);
lid.rotation.z = 1.2;
vrnSpot(X + 4, Z + 0.8, 2, "The hatch", "go down into the Nautilus", function () { var J = VRN_IN.vlg_cabins; vrnInBuild(J); vrnMove(J.x - 7, J.z - 2, Math.PI / 2, null, 0); }, 4.3);
I.dinghy = vrnBoxM(5, 0.7, 1.6, vrnSurf("wood", 0x6A4A2A, 1), X - 9, 4.6, Z, grp);
var nt = new THREE.Group();
grp.add(nt);
vlgSet("night", nt);
vlgDome(nt, X, Z, 300, 0x050A18, 0.88);
var fr = vlgShipModel({ lamps: 1, L: 70 });
fr.position.set(X - 170, 3.4, Z + 110);
fr.rotation.y = 0.6;
nt.add(fr);
var stg = new THREE.Group();
grp.add(stg);
vlgSet("storm", stg);
vlgDome(stg, X, Z, 300, 0x2A3038, 0.8);
var isl = new THREE.Group();
grp.add(isl);
vlgSet("isle", isl);
var IX = X, IZ = Z - 170, R = wRand(1868);
I.isle = { x: IX, z: IZ };
var sand = new THREE.Mesh(new THREE.CylinderGeometry(105, 118, 3, VRN.lite ? 18 : 36), vlgMat(0xE8D8A8));
sand.position.set(IX, -0.5, IZ);
isl.add(sand);
var grass = new THREE.Mesh(new THREE.CylinderGeometry(88, 96, 1.2, VRN.lite ? 16 : 32), vlgMat(0x4A7A3A));
grass.position.set(IX, 0.42, IZ);
isl.add(grass);
vlgSetFloor("isle", vrnFloor(IX, IZ, 0, 0, 1.0, { r: 104, inside: 1 }));
[[0, -60, 40, 40], [-40, -40, 30, 30], [45, -35, 26, 34]].forEach(function (h) { var hl = vlgHill(h[2], h[3], R); hl.position.set(IX + h[0], 0, IZ + h[1]); isl.add(hl); vrnSolid({ x: IX + h[0], z: IZ + h[1], r: h[2] * 0.85 }); });
for (var p = 0; p < (VRN.lite ? 22 : 46); p++) {
var a = R() * 6.28, rr = 60 + R() * 38, px = IX + Math.cos(a) * rr, pz = IZ + Math.sin(a) * rr;
if (pz > IZ + 70 && Math.abs(px - IX) < 14)
continue;
vlgPalm(isl, px, 1, pz, 7 + R() * 5, R);
}
for (var t = 0; t < (VRN.lite ? 14 : 30); t++) {
var ta = R() * 6.28, tr = 20 + R() * 45, tx = IX + Math.cos(ta) * tr, tz = IZ + Math.sin(ta) * tr;
if (Math.hypot(tx - IX, tz - IZ + 60) < 45 || Math.abs(tx - IX) < 8)
continue;
vlgTree(isl, tx, 1, tz, 0.9 + R() * 0.6, [0x2E6A2A, 0x3A7A34, 0x2A5A26][t % 3], R);
}
I.bread = { x: IX - 22, z: IZ + 30 };
vlgTree(isl, I.bread.x, 1, I.bread.z, 1.5, 0x2A6A2A, R);
for (var f = 0; f < 9; f++)
wSph(0.3, vlgMat(0x9AB848), I.bread.x + (R() - 0.5) * 5, 9 + R() * 2, I.bread.z + (R() - 0.5) * 5, isl, 7);
I.banana = { x: IX + 26, z: IZ + 34 };
for (var b = 0; b < 6; b++) {
var bx = I.banana.x + (R() - 0.5) * 8, bz = I.banana.z + (R() - 0.5) * 8;
wCyl(0.2, 0.25, 3, vlgMat(0x6A8A3A), bx, 2.5, bz, isl, 6);
for (var lf = 0; lf < 5; lf++) {
var L2 = wBox(0.8, 0.03, 2.6, vlgMat(0x4A9A3A, { ds: true }), bx, 4, bz, isl);
L2.rotation.set(0.7, lf * 1.25, 0);
L2.translateZ(1);
}
}
I.sago = { x: IX - 36, z: IZ + 8 };
I.mango = { x: IX + 10, z: IZ + 12 };
vlgSetSpot("isle", IX, IZ + 92, 4, "The dinghy, drawn up on the beach", "row back to the Nautilus", function () { vrnMove(X - 6, Z, -Math.PI / 2, null, 4.3); }, 1);
vlgSetSpot("isle", X - 9, Z + 1.4, 2.4, "The dinghy", "row ashore to Gilboa", function () { vrnMove(IX, IZ + 88, 0, "🏝️ <b>Gilboa.</b> White sand, coral at the water's edge, and behind it the forest climbing the hills: " + Q("the Island of Gilboa") + ".", 1); }, 4.3);
for (var c = 0; c < (VRN.lite ? 20 : 44); c++) {
var cx = X + (R() - 0.5) * 180, cz = Z - 30 - R() * 60;
var ch = new THREE.Mesh(new THREE.DodecahedronGeometry(1.2 + R() * 2.4, 0), vlgMat(VRN_CORALC[c % VRN_CORALC.length]));
ch.position.set(cx, -0.4, cz);
ch.scale.y = 0.5;
isl.add(ch);
}
for (var k = 0; k < 5; k++) {
var cn = vrnBoxM(7, 0.6, 0.9, vrnSurf("wood", 0x5A3A22, 1), IX - 30 + k * 12, 1.3, IZ + 80, isl);
cn.rotation.y = 0.2 * (k - 2);
var ot = wCyl(0.08, 0.08, 3, vrnSurf("wood", 0x6A4A2A, 1), IX - 30 + k * 12, 1.4, IZ + 81.4, isl, 5);
ot.rotation.z = Math.PI / 2;
}
var sg = new THREE.Group();
grp.add(sg);
vlgSet("sargasso", sg);
var wm = vlgMat(0x8A7A2A, { ds: true }), wm2 = vlgMat(0x6A6A22, { ds: true });
for (var w = 0; w < (VRN.lite ? 50 : 140); w++) {
var wa = R() * 6.28, wr = 12 + R() * 260, wp = new THREE.Mesh(new THREE.CircleGeometry(2 + R() * 7, 7), w % 2 ? wm : wm2);
wp.rotation.x = -Math.PI / 2;
wp.scale.set(1, 0.4 + R() * 0.8, 1);
wp.position.set(X + Math.cos(wa) * wr, 0.08, Z + Math.sin(wa) * wr);
sg.add(wp);
}
var wh = new THREE.Group();
grp.add(wh);
vlgSet("whales", wh);
I.whales = [];
for (var q = 0; q < 5; q++) {
var cr = vlgLoose(vrnCreature("whale", q < 3 ? 2.2 : 1.6, q));
if (!cr)
continue;
cr.position.set(X + 60 + q * 30, -1.2, Z + 80 - q * 25);
wh.add(cr);
I.whales.push({ g: cr, a: q * 1.3, r: 90 + q * 14, sp: 0.04 + q * 0.008, k: q < 3 ? "whale" : "cachalot" });
if (q >= 3)
cr.traverse(function (m) { if (m.material && m.material.color) {
m.material = m.material.clone();
m.material.color.multiplyScalar(0.5);
} });
}
var rs = new THREE.Group();
grp.add(rs);
vlgSet("redsea", rs);
[-1, 1].forEach(function (s) { for (var d = 0; d < 8; d++) {
var dn = new THREE.Mesh(new THREE.ConeGeometry(30 + R() * 30, 10 + R() * 16, 8), vlgMat(0xD8B878));
dn.position.set(X - 300 + d * 85, 0, Z + s * (230 + R() * 30));
dn.scale.z = 0.4;
rs.add(dn);
} });
var dug = vrnCreature("seal", 2.4, 7);
if (dug) {
vlgLoose(dug);
dug.position.set(X + 40, -0.6, Z + 30);
rs.add(dug);
I.dugong = dug;
}
var ic = new THREE.Group();
grp.add(ic);
vlgSet("ice", ic);
var iceM = vlgMat(0xE8F4FA, { shine: 80, spec: 0xFFFFFF });
for (var e = 0; e < (VRN.lite ? 24 : 60); e++) {
var ea = R() * 6.28, er = 30 + R() * 240, fw = 8 + R() * 30;
var fl = vrnBoxM(fw, 2 + R() * 2, fw * (0.5 + R() * 0.6), iceM, X + Math.cos(ea) * er, 0.6, Z + Math.sin(ea) * er, ic);
fl.rotation.y = R() * 3;
}
for (var bg = 0; bg < (VRN.lite ? 6 : 14); bg++) {
var ba = R() * 6.28, br = 120 + R() * 150;
wCone(14 + R() * 18, 24 + R() * 40, iceM, X + Math.cos(ba) * br, 10, Z + Math.sin(ba) * br, ic, 6);
}
var ws = new THREE.Group();
grp.add(ws);
vlgSet("warship", ws);
var war = vlgShipModel({ hull: 0x22262A, band: 0x30343A, L: 90, B: 16, D: 8, lamps: 0, mh: 30, flag: false });
war.position.set(X + 240, 3.8, Z - 30);
war.rotation.y = -0.25;
ws.add(war);
I.war = war;
var sq = new THREE.Group();
grp.add(sq);
vlgSet("squid", sq);
I.arms = [];
for (var a2 = 0; a2 < 6; a2++) {
var ang = a2 / 6 * Math.PI * 2, kr = vrnCreature("kraken", 0.32, a2);
if (!kr) {
kr = new THREE.Group();
wCyl(0.2, 0.6, 7, vlgMat(0x8A3A3A), 0, 3.5, 0, kr, 8);
}
vlgLoose(kr);
kr.position.set(X - 12 + a2 * 4.8, 3.2, Z + (a2 % 2 ? 3.2 : -3.2));
kr.rotation.y = a2 % 2 ? Math.PI : 0;
sq.add(kr);
I.arms.push(kr);
}
vlgBakeSets();
},
function (grp, I) {
var X = I.x, Z = I.z, rock = VRN.lite ? vlgMat(0x2A2624, { ds: true }) : new THREE.MeshLambertMaterial({ color: 0x34302C, side: THREE.DoubleSide, map: vrnTex("stone", 6) }), basalt = vrnSurf("stone", 0x3A3632, 3);
var wall = vlgCraterWall(108, 124, 70);
wall.position.set(X, 32, Z);
grp.add(wall);
var shaft = new THREE.Mesh(new THREE.CylinderGeometry(70, 96, 70, VRN.lite ? 12 : 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFF4D8, transparent: true, opacity: 0.06, depthWrite: false, side: THREE.DoubleSide, fog: false }));
shaft.position.set(X + 20, 32, Z);
grp.add(shaft);
var coal = vlgMat(0x141414, { shine: 50, spec: 0x4A4A4A });
[[-44, 24, 5], [-36, 30, 3.5], [-50, 34, 4], [-20, -14, 3]].forEach(function (c) { var hp = vlgHill(c[2], c[2] * 0.7, wRand(c[0] * 7)); hp.material = coal; hp.position.set(X + c[0], 0, Z + c[1]); grp.add(hp); vrnSolid({ x: X + c[0], z: Z + c[1], r: c[2] * 0.8 }); });
[-0.7, 0.7].forEach(function (o) { wBox(70, 0.12, 0.12, vrnMetal(0x5A5048), X - 55, 0.1, Z + 30 + o, grp); });
for (var sl = -88; sl < -20; sl += 1.6)
wBox(0.3, 0.08, 2.2, vrnSurf("wood", 0x4A3A2A, 1), X + sl, 0.04, Z + 30, grp);
for (var lp2 = 0; lp2 < 6; lp2++) {
var lx = X - 80 + lp2 * 14, lz = Z + (lp2 % 2 ? -12 : 16);
wCyl(0.1, 0.12, 3.6, vrnMetal(0x2A2A2A), lx, 1.8, lz, grp, 6);
wBox(0.5, 0.6, 0.5, vlgMat(0xFFE0A0, { e: 0xFFC060, ei: 1 }), lx, 3.8, lz, grp);
var lg = wGlow(0xFFD080, 5, 0.4);
lg.position.set(lx, 3.8, lz);
grp.add(lg);
}
var cm = vrnMetal(0x3A3A3A);
wCyl(0.4, 0.5, 14, cm, X + 6, 7, Z - 9, grp, 8);
var jib = wBox(16, 0.5, 0.5, cm, X + 13, 13.6, Z - 9, grp);
jib.rotation.z = 0.12;
wCyl(0.03, 0.03, 9, vlgMat(0x2A2018), X + 20, 9.4, Z - 9, grp, 3);
vrnSolid({ x: X + 6, z: Z - 9, r: 0.6 });
var lake = new THREE.Mesh(new THREE.CircleGeometry(60, VRN.lite ? 16 : 32), vrnWaterMat(0x1E3A48, 0.95));
lake.rotation.x = -Math.PI / 2;
lake.position.set(X + 40, -1, Z);
grp.add(lake);
vrnInFloor(grp, X - 60, Z, 100, 200, 0, basalt);
vrnInFloor(grp, X + 30, Z - 80, 80, 40, 0, basalt);
vrnInFloor(grp, X + 30, Z + 80, 80, 40, 0, basalt);
var sub = vrnNautilusModel();
sub.position.set(X + 30, -1, Z);
sub.rotation.y = Math.PI / 2;
grp.add(sub);
vrnBoxM(30, 1, 4, basalt, X + 0, 0, Z - 6, grp);
vrnFloor(X + 0, Z - 6, 15, 2, 0.5, { inside: 1 });
for (var s = 0; s < 8; s++) {
var a = Math.PI * 0.6 + s * 0.17, sx = X + Math.cos(a) * 104, sz = Z + Math.sin(a) * 104;
var seam = vrnBoxM(8, 3, 1.4, vlgMat(0x101010, { shine: 60, spec: 0x3A3A3A }), sx, 2 + (s % 3), sz, grp);
seam.rotation.y = -a + Math.PI / 2;
var lp = wGlow(0xFFD890, 4, 0.35);
lp.position.set(sx * 0.98 + X * 0.02, 4, sz * 0.98 + Z * 0.02);
grp.add(lp);
}
for (var t = 0; t < 4; t++) {
var tx = X - 50 + t * 6, tk = vrnBoxM(1.6, 1, 1, vrnMetal(0x3A3A3A), tx, 0.6, Z + 30, grp);
wSph(0.4, vlgMat(0x141414), tx, 1.2, Z + 30, grp, 6);
}
vrnSpot(X - 90, Z + 20, 4, "The coal seam", "see the mine", function () { setStatus("⛏️ " + Q("Here, in their diving-dresses, pick axe and shovel in hand, my men extract the coal, which I do not even ask from the mines of the earth.") + " The seam runs black and shining through the lava; the crew cut it and wheel it to the quay."); }, 0);
for (var f = 0; f < 3; f++) {
var fx = X - 70, fz = Z - 30 + f * 10;
vrnBoxM(4, 4, 4, vrnSurf("brick", 0x8A4A3A, 1), fx, 2, fz, grp);
var fg = wGlow(0xFF8A3A, 4, 0.45);
fg.position.set(fx + 2.1, 1.4, fz);
grp.add(fg);
vrnSolid({ x: fx, z: fz, hw: 2.2, hd: 2.2 });
}
vrnSpot(X - 64, Z - 20, 4, "The sodium works", "ask what is made here", function () { setStatus("⚗️ The coal heats the furnaces; the furnaces break down the salt of the sea; out of it comes sodium, and the sodium makes the Nautilus's electricity."); }, 0);
vrnFloor(X - 60, Z - 80, 3, 30, 0, { inside: 1, ramp: "z", y0: 34, y1: 0 });
var rp = vrnBoxM(6, 0.6, 62, basalt, X - 60, 17, Z - 80, grp);
rp.rotation.x = Math.atan2(34, 60);
vrnBoxM(16, 1, 10, basalt, X - 60, 33.5, Z - 115, grp);
vrnFloor(X - 60, Z - 115, 8, 5, 34, { inside: 1 });
vrnSpot(X - 60, Z - 116, 4, "The ledge high in the crater", "look out", function () { setStatus("🌋 Far below, the lake and the Nautilus, small as a fish; high above, the round of sky. The walls are black lava, streaked with sulphur."); }, 34);
var sky = wGlow(0xE8F0FF, 60, 0.12);
sky.position.set(X, 80, Z);
grp.add(sky);
vrnSpot(X + 12, Z - 6, 3, "The Nautilus, at the basalt quay", "go aboard", function () { var J = VRN_IN.nautilus; vrnInBuild(J); vrnMove(J.x - 12, J.z, Math.PI / 2, null, 0); }, 0.5);
},
function (grp, I) {
var X = I.x, Z = I.z, ice = vlgMat(0xBFE4F4, { op: 0.92, shine: 90, spec: 0xFFFFFF, ds: true }), iceF = vlgMat(0xD8EEF8, { shine: 60, spec: 0xFFFFFF });
vrnInFloor(grp, X, Z, 160, 80, 0, iceF);
var box = new THREE.Mesh(new THREE.BoxGeometry(160, 30, 80), ice);
box.position.set(X, 15, Z);
box.material.side = THREE.BackSide;
grp.add(box);
vrnSolid({ x: X, z: Z - 40, hw: 80, hd: 0.5, h: 30 });
vrnSolid({ x: X, z: Z + 40, hw: 80, hd: 0.5, h: 30 });
vrnSolid({ x: X - 80, z: Z, hw: 0.5, hd: 40, h: 30 });
vrnSolid({ x: X + 80, z: Z, hw: 0.5, hd: 40, h: 30 });
var sub = vrnNautilusModel();
sub.position.set(X, 10, Z);
sub.rotation.y = Math.PI / 2;
grp.add(sub);
var lamp = wGlow(0xD8F0FF, 40, 0.3);
lamp.position.set(X + 36, 10, Z);
grp.add(lamp);
for (var c = 0; c < (VRN.lite ? 12 : 30); c++) {
var R = wRand(c + 5), ic = wCone(0.6 + R() * 1.4, 3 + R() * 6, ice, X - 70 + R() * 140, 30 - 1.5, Z - 36 + R() * 72, grp, 5);
ic.rotation.x = Math.PI;
}
I.blocks = [];
for (var b = 0; b < 14; b++) {
var bx = X - 30 + (b % 7) * 10, bz = Z + (b < 7 ? -6 : 6), bl = vlgLoose(vrnBoxM(4, 1.6, 4, vlgMat(0xA8D8F0, { shine: 80, spec: 0xFFFFFF }), bx, 0.8, bz, grp));
I.blocks.push({ g: bl, x: bx, z: bz, y: 1, r: 2 });
}
I.jets = [];
for (var j = 0; j < 4; j++) {
var jg = wGlow(0xF0F8FF, 6, 0.0);
jg.position.set(X - 24 + j * 16, 1.5, Z);
grp.add(jg);
I.jets.push(jg);
}
vrnSpot(X - 34, Z + 2, 3, "The diving hatch of the Nautilus", "go back aboard", function () { var J = VRN_IN.nautilus; vrnInBuild(J); vrnMove(J.x - 12, J.z, Math.PI / 2, null, 0); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, plank = vrnSurf("wood", 0x8A6A44, 2.5), dark = vrnSurf("wood", 0x5A4430, 2);
vrnInFloor(grp, X, Z, 28, 20, 0, plank);
vrnIWall(grp, X - 14, Z - 10, X + 14, Z - 10, 3.4, dark);
vrnIWall(grp, X - 14, Z + 10, X + 14, Z + 10, 3.4, dark, [[14, 2, 2.4]]);
vrnIWall(grp, X - 14, Z - 10, X - 14, Z + 10, 3.4, dark);
vrnIWall(grp, X + 14, Z - 10, X + 14, Z + 10, 3.4, dark);
[-1, 1].forEach(function (sd) { var rf = vrnBoxM(29, 0.2, 10.9, dark, X, 4.75, Z + sd * 5.2, grp); rf.rotation.x = sd * 0.26; });
wBox(29, 0.3, 0.3, vrnSurf("wood", 0x3A2A1A, 1), X, 6.15, Z, grp);
for (var rt = -13; rt <= 13; rt += 3.2)
[-1, 1].forEach(function (sd) { var ra = wBox(0.18, 0.22, 10.6, vrnSurf("wood", 0x3A2A1A, 1), X + rt, 4.6, Z + sd * 5.1, grp); ra.rotation.x = sd * 0.26; });
[-1, 1].forEach(function (sd) { var gb = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 3.4, -10), new THREE.Vector3(0, 3.4, 10), new THREE.Vector3(0, 6.1, 0)]), dark); gb.geometry.computeVertexNormals(); gb.material = vrnSurf("wood", 0x5A4430, 2, { ds: true }); gb.position.set(X + sd * 14, 0, Z); grp.add(gb); });
wCyl(0.18, 0.18, 4, vrnMetal(0x2A2A2A), X + 10, 3.3, Z - 8, grp, 8);
for (var fl2 = 0; fl2 < 8; fl2++)
wSph(0.16, vlgMat(fl2 % 2 ? 0xC8A040 : 0x8A3A2A), X + 3.6 + fl2 * 0.6, 1.1, Z + 9.5, grp, 6);
[[-13.6, -4], [-13.6, -3.4]].forEach(function (o) { var oar = wCyl(0.05, 0.05, 3.6, vrnSurf("wood", 0xA88A5A, 1), X + o[0], 1.8, Z + o[1], grp, 5); oar.rotation.x = 0.2; });
wCyl(0.02, 0.02, 8, vlgMat(0x6A5A40), X - 6, 2.9, Z + 9, grp, 3).rotation.z = Math.PI / 2;
for (var fs = 0; fs < 9; fs++) {
var fsh = wBox(0.12, 0.7, 0.3, vlgMat(0xC8B890, { shine: 30 }), X - 9.6 + fs * 0.8, 2.45, Z + 9, grp);
}
vrnShelf(grp, X + 5, Z - 9.6, 3, 0, 2.2);
for (var cp = 0; cp < 6; cp++)
wCyl(0.14, 0.12, 0.24, vlgMat([0xE8E0D0, 0x3A5A8A, 0xD8C8A8][cp % 3]), X + 3.9 + cp * 0.45, 1.75, Z - 9.5, grp, 8);
var lamp = wCyl(0.14, 0.18, 0.4, vrnBrass(), X, 1.12, Z, grp, 8);
var lgw = wGlow(0xFFD890, 3, 0.45);
lgw.position.set(X, 1.5, Z);
grp.add(lgw);
vrnRug(grp, X - 3, Z + 2, 5, 3.5, 0x6A4A3A);
var w = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6), vlgMat(0x9AB0C0, { e: 0x6A8090, ei: 0.6 }));
w.position.set(X - 4, 2, Z - 9.8);
grp.add(w);
vrnBoxM(1.6, 1.4, 1.2, vrnMetal(0x2A2A2A), X + 10, 0.7, Z - 8, grp);
var fire = wGlow(0xFF9A4A, 3, 0.4);
fire.position.set(X + 10, 0.8, Z - 7.3);
grp.add(fire);
vrnSolid({ x: X + 10, z: Z - 8, hw: 0.9, hd: 0.7 });
[[-10, -6], [-10, 0]].forEach(function (b) { vrnBoxM(2, 0.5, 3.6, vlgMat(0xD8D0C0), X + b[0], 0.5, Z + b[1], grp); });
for (var n = 0; n < 6; n++) {
var nt = wBox(2.6, 1.6, 0.04, vlgMat(0x6A6A5A, { op: 0.6, ds: true }), X + 4 + n * 0.5, 2, Z + 9.6, grp);
nt.rotation.y = 0.1 * n;
}
vrnTable(grp, X, Z, 2.4, 1.2, 0, 0x6A4A2A);
vrnChair(grp, X, Z + 1.2, Math.PI, 0x5A3A22);
vrnSpot(X - 4, Z - 8.6, 2.6, "The window over the sea", "look out", function () { setStatus("🌊 Grey sea, grey sky, the far shore of the mainland. Somewhere out there, the Maelstrom, quiet now with the turn of the tide."); }, 0);
vrnSpot(X, Z + 10, 2.6, "The door of the hut", "go out", function () { vrnLeave("vlg_hut"); }, 0);
},
function (G) {
var grp = new THREE.Group();
grp.name = "vlg-deep";
G.add(grp);
var R = wRand(1788), wood = vrnSurf("wood", 0x4A3A2A, 2), iron = vrnMetal(0x3A3430), coralM = function (i) { return vlgMat(VRN_CORALC[i % VRN_CORALC.length]); };
var V = VLG_VANI, vy = vrnLand(V.x, V.z);
for (var r = 0; r < 12; r++) {
var rb = new THREE.Mesh(new THREE.TorusGeometry(5, 0.35, 5, 12, Math.PI), wood);
rb.position.set(V.x - 24 + r * 4, vy, V.z);
rb.rotation.y = Math.PI / 2;
rb.rotation.z = (R() - 0.5) * 0.3;
grp.add(rb);
}
vrnBoxM(50, 0.8, 1.2, wood, V.x, vy + 0.3, V.z, grp);
for (var c = 0; c < 7; c++) {
var cx = V.x - 20 + R() * 44, cz = V.z - 14 + R() * 28, cn = wCyl(0.3, 0.4, 2.8, iron, cx, vrnLand(cx, cz) + 0.35, cz, grp, 8);
cn.rotation.z = Math.PI / 2;
cn.rotation.y = R() * 3;
var co = wSph(0.4, coralM(c), cx, vrnLand(cx, cz) + 0.7, cz, grp, 6);
co.scale.y = 0.5;
}
[[-14, 10], [16, -9]].forEach(function (a) { var ax = V.x + a[0], az = V.z + a[1], ay = vrnLand(ax, az); var sh = wCyl(0.18, 0.18, 4, iron, ax, ay + 0.4, az, grp, 6); sh.rotation.z = Math.PI / 2 - 0.3; var ar = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.18, 5, 10, Math.PI), iron); ar.position.set(ax + 1.8, ay + 0.6, az); ar.rotation.y = Math.PI / 2; grp.add(ar); });
for (var k = 0; k < (VRN.lite ? 14 : 30); k++) {
var kx = V.x - 26 + R() * 52, kz = V.z - 16 + R() * 32, kh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.6 + R() * 1.2, 0), coralM(k));
kh.position.set(kx, vrnLand(kx, kz) + 0.3, kz);
kh.scale.y = 0.6;
grp.add(kh);
}
var bell = wCyl(0.25, 0.45, 0.7, vrnBrass(), V.x + 4, vy + 0.5, V.z + 5, grp, 12);
vrnSpot(V.x, V.z + 12, 6, "The wrecks of Vanikoro", "look at the wrecks", function () { worldCard(VRN_H + "⚓ Vanikoro, 1788</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>The ribs of two frigates under the coral: cannon, anchors, a bronze bell. The Boussole and the Astrolabe of the Count de La Pérouse, sent round the world by King Louis XVI, were lost here in a hurricane in 1788. Nobody knew where, until Dumont d'Urville found these in 1828.</div>", {}); }, vy);
var O = VLG_OYSTER, oy = vrnLand(O.x, O.z), rock = vrnSurf("stone", 0x5A6A64, 3);
var arch = vlgGrotto(10, R);
arch.scale.set(1.3, 0.75, 1);
arch.position.set(O.x, oy, O.z);
arch.rotation.y = -0.67;
grp.add(arch);
for (var cg = 0; cg < (VRN.lite ? 10 : 26); cg++) {
var ca = R() * 6.28, cr = 12 + R() * 8, cx = O.x + Math.cos(ca) * cr, cz = O.z + Math.sin(ca) * cr, cy = vrnLand(cx, cz);
if (cg % 3 === 0) {
var fan = new THREE.Mesh(new THREE.CircleGeometry(1 + R() * 1.4, 10, 0, Math.PI), vlgMat([0xC83A5A, 0xE8803A, 0x9A3AA8][(cg / 3 | 0) % 3], { ds: true, e: 0x3A0A1A, ei: 0.3 }));
fan.position.set(cx, cy, cz);
fan.rotation.y = R() * 3;
grp.add(fan);
}
else {
var cl = new THREE.Mesh(new THREE.DodecahedronGeometry(0.6 + R() * 1.1, 0), coralM(cg));
cl.position.set(cx, cy + 0.3, cz);
cl.scale.y = 0.7 + R() * 0.8;
grp.add(cl);
for (var br = 0; br < 3; br++)
wCyl(0.08, 0.12, 1 + R() * 1.4, coralM(cg + br + 1), cx + (R() - 0.5) * 1.4, cy + 0.7, cz + (R() - 0.5) * 1.4, grp, 5);
}
}
void (0);
var oyster = new THREE.Group();
oyster.position.set(O.x, oy + 0.2, O.z);
grp.add(oyster);
[0, 1].forEach(function (k) { var sh = new THREE.Mesh(new THREE.SphereGeometry(1.4, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2), vlgMat(0x8A8478, { ds: true })); sh.scale.set(1.3, 0.45, 1); if (k) {
sh.rotation.x = Math.PI - 0.55;
sh.position.set(0, 0.15, -0.5);
} oyster.add(sh); });
var nacre = new THREE.Mesh(new THREE.CircleGeometry(1.4, 16), vlgMat(0xF0ECF4, { shine: 100, spec: 0xFFFFFF }));
nacre.rotation.x = -Math.PI / 2;
nacre.position.y = 0.05;
nacre.scale.set(1.3, 1, 1);
oyster.add(nacre);
var pearl = wSph(0.22, vlgMat(0xF8F4F0, { shine: 120, spec: 0xFFFFFF }), 0, 0.25, 0.1, oyster, 14);
vrnSpot(O.x, O.z + 7, 5, "The great oyster in the grotto", "look at the oyster", function () { setStatus("🦪 A tridacna more than two metres across, its shell half open; inside, on the folds of its mantle, a pearl the size of a coconut. Captain Nemo will not take it. He lets it grow."); }, oy);
VRN.districts.push({ g: grp, x: 800, z: 1200, r: 1500 });
},
function (S) {
vbkTune("largo");
var b = "<h3 style='margin:4px 0'>📘 Twenty Thousand Leagues Under the Sea</h3><p>From Brooklyn pier to the Lofoten Isles: the frigate and the monster, the Nautilus and her captain, the forest of Crespo, the coral cemetery, the pearls of Ceylon, the Arabian Tunnel, Atlantis by the light of its volcano, the South Pole, the prison of ice, the poulps, the Maelstrom. Every chapter of the book, as Verne wrote it.</p><p style='font-style:italic'>" + Q("Does Captain Nemo still live?") + " Verne tells us, five years later, in another book: The Mysterious Island.</p><p>Your keepsakes, one from every chapter:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + vbkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; vbkSave(); vbkChapterBegin(true); }, shelf: function () { vbkOpen("voy"); } };
b += worldBtn("again", "Read it again from the start", "The frigate at Brooklyn pier");
b += worldBtn("shelf", "Verne's other books", "The Extraordinary Voyages");
worldCard(b, fns);
},
function (G) {
var P = VLG_PIER, f = vlgShipModel({ L: 84, B: 13, D: 7.6, lamps: 0, mh: 34 });
f.position.set(P.x, 3.6, P.z);
G.add(f);
VRN.fx.push({ k: "bob", m: f, ph: 0.7 });
var nm = wSign(["ABRAHAM LINCOLN"], 7, 0.9, "#1A1A1E", "#E8D8A8");
nm.position.set(-42.25, 1.5, 0);
nm.rotation.y = -Math.PI / 2;
f.add(nm);
vlgFrigateKit(f, 0, 0, 0.73, 84, 6, [[-23.5, 28.6], [0, 34], [22.7, 31.3]], { bs: 16, st: 0.15, head: 3, headY: 1.4, noBoats: 1, noSolid: 1, ports: -1.13, portOut: 0.6, seed: 20,
crew: [[6, -3, "sailor"], [7.4, -3.4, "sailor"], [17, 1.2, "sailor"], [30, 2.6, "sailor"], [-33, -2, "gent"], [-12, 4.2, "sailor"]] });
var gw = vrnBoxM(1.6, 0.2, 12, vrnSurf("wood", 0x8A6A4A, 1), P.x - 20, 3.6, P.z - 10, G);
gw.rotation.x = -0.12;
vrnSign(["U.S. FRIGATE ABRAHAM LINCOLN", "Commander Farragut · sails tonight for the Pacific", "Twenty Thousand Leagues Under the Sea"], 6, 1.5, P.x - 20, 5.4, 148.6, Math.PI, G);
vrnSpot(P.x - 20, 146, 4, "The Abraham Lincoln, at Brooklyn pier", "go up the gangway", function () {
var S = store.vleagues;
if (VBK_BK !== "leagues" || !S || !S.started || S.done) {
vbkOpen("leagues");
return;
}
vrnEnter("vlg_lincoln");
}, P.y);
},
function (grp, I) {
var X = I.x, Z = I.z, steel = vrnMetal(0x5A6068);
for (var s = 0; s < 6; s++)
wBox(1.4, 0.08, 0.4, steel, X - 24, 0.2 + s * 0.3, Z + 3.6 - s * 0.35, grp);
vrnSpot(X - 24, Z + 3, 2.4, "The stair down to the cabins", "go down to the cabins", function () { var J = VRN_IN.vlg_cabins; vrnInBuild(J); vrnMove(J.x - 7, J.z + 4, -Math.PI / 2, null, 0); }, 0);
var ch = new THREE.Group();
ch.position.set(X - 6, 0, Z + 3.4);
grp.add(ch);
vrnBoxM(1.6, 0.9, 0.9, vrnSurf("wood", 0x5A3A22, 1), 0, 0.45, 0, ch);
wBox(1.62, 0.1, 0.92, vrnBrass(), 0, 0.8, 0, ch);
for (var g = 0; g < 5; g++)
wBox(0.3, 0.12, 0.15, vrnC(0xE8C048, { e: 0x8A6A10, ei: 0.4 }), -0.6 + g * 0.3, 0.96, 0, ch);
vrnSpot(X - 6, Z + 2.2, 2, "The chest bound with iron", "look at the chest", function () { setStatus("💰 An iron-bound chest, full of ingots of gold. On the lid, in Greek: an address in Crete."); }, 0);
},
function (dt) {
VLG.t += dt;
if (VLG.aim && VLG.aim.cd > 0)
VLG.aim.cd -= dt;
vlgSailTick(dt);
var D = VRN_IN.vlg_deck;
if (D && D.built && D.whales && VLG.sets.whales && VLG.sets.whales.on)
D.whales.forEach(function (w) { w.a += dt * w.sp; w.g.position.set(D.x + Math.cos(w.a) * w.r, -1.2 + Math.sin(VLG.t * 0.6 + w.a * 3) * 0.6, D.z + Math.sin(w.a) * w.r * 0.7); w.g.rotation.y = -w.a; });
if (D && D.built && D.dugong && VLG.sets.redsea && VLG.sets.redsea.on && D.dugong.visible) {
var a = VLG.t * 0.12;
D.dugong.position.set(D.x + 34 + Math.cos(a) * 16, -0.5, D.z + 26 + Math.sin(a) * 10);
D.dugong.rotation.y = -a;
}
},
function (C, place) {
if (!C.dive) {
if (VRN.dive)
vrnDive(false, true);
if (C.sub)
vlgSubAt(C.sub[0], C.sub[1], C.sub[2], C.sub[3] || 0);
else if (!VLG.sail)
vrnSubHome();
return;
}
var D = C.dive;
vrnDive(true, true);
if (D.sub)
vlgSubAt(D.sub[0], D.sub[1], D.sub[2], D.sub[3] || 0);
var L = worldLocal();
if (place || VRN.insideOf || Math.hypot(L.x - D.x, L.z - D.z) > 300)
vrnMove(D.x, D.z, D.ry != null ? D.ry : null, D.msg || null, vrnLand(D.x, D.z));
}
];
});
