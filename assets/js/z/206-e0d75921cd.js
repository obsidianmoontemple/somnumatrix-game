/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(206, function () {
return [
function () {
if (DLR.tex.sc)
return DLR.tex.sc;
var N = 256, c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d");
x.fillStyle = "#a0a0a0";
x.fillRect(0, 0, N, N);
var rows = 8, cols = 8, w = N / cols, h = N / rows;
for (var r = -1; r <= rows; r++)
for (var k = -1; k <= cols; k++) {
var cx = (k + (r % 2 ? 0.5 : 0)) * w + w / 2, cy = r * h;
var g = x.createRadialGradient(cx, cy + h * 0.2, 1, cx, cy + h * 0.35, w * 0.75);
g.addColorStop(0, "#f4f4f4");
g.addColorStop(0.6, "#d6d6d6");
g.addColorStop(1, "#a2a2a2");
x.fillStyle = g;
x.beginPath();
x.ellipse(cx, cy + h * 0.35, w * 0.55, h * 0.85, 0, 0, Math.PI);
x.closePath();
x.fill();
x.strokeStyle = "rgba(50,40,40,0.32)";
x.lineWidth = 1.5;
x.beginPath();
x.ellipse(cx, cy + h * 0.35, w * 0.55, h * 0.85, 0, 0, Math.PI);
x.stroke();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = 4;
return (DLR.tex.sc = t);
},
function () {
if (DLR.tex.lava)
return DLR.tex.lava;
var N = 256, c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d"), im = x.createImageData(N, N), D = im.data;
var s = 17, rnd = function () { s = (s * 16807) % 2147483647; return (s % 100000) / 100000; };
var K = 70, px = [], py = [], molten = [], shade = [];
for (var k = 0; k < K; k++) {
px.push(rnd() * N);
py.push(rnd() * N);
molten.push(rnd() < 0.18);
shade.push(0.75 + rnd() * 0.5);
}
for (var y = 0; y < N; y++)
for (var xx = 0; xx < N; xx++) {
var d1 = 1e9, d2 = 1e9, n1 = 0;
for (k = 0; k < K; k++) {
var dx = Math.abs(xx - px[k]), dy = Math.abs(y - py[k]);
if (dx > N / 2)
dx = N - dx;
if (dy > N / 2)
dy = N - dy;
var d = dx * dx + dy * dy;
if (d < d1) {
d2 = d1;
d1 = d;
n1 = k;
}
else if (d < d2)
d2 = d;
}
var edge = Math.sqrt(d2) - Math.sqrt(d1), i = (y * N + xx) * 4, r, g, b;
var glow = Math.max(0, 1 - edge / 3.2);
if (molten[n1]) {
var m = Math.max(0, 1 - edge / 12);
r = 210 + 40 * m;
g = 60 + 50 * m;
b = 8;
}
else {
var sh = shade[n1] * (0.8 + 0.2 * Math.min(1, edge / 10));
r = 34 * sh;
g = 14 * sh;
b = 10 * sh;
}
var gl = glow * glow;
r = r + (250 - r) * gl;
g = g + (120 - g) * gl;
b = b + (16 - b) * gl;
D[i] = r;
D[i + 1] = g;
D[i + 2] = b;
D[i + 3] = 255;
}
x.putImageData(im, 0, 0);
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = 4;
return (DLR.tex.lava = t);
},
function (k) {
if (DLR.mats[k])
return DLR.mats[k];
var M;
switch (k) {
case "hide":
M = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, map: dlrScaleTex(), vertexColors: true, roughness: 0.5, metalness: 0.18, emissive: 0x2A0604 });
break;
case "horn":
M = new THREE.MeshStandardMaterial({ color: 0xE6D6B4, roughness: 0.45, metalness: 0.05 });
break;
case "hornD":
M = new THREE.MeshStandardMaterial({ color: 0x3A2A22, roughness: 0.5 });
break;
case "spine":
M = new THREE.MeshStandardMaterial({ color: 0x4A0E10, roughness: 0.5, metalness: 0.1 });
break;
case "wing":
M = new THREE.MeshStandardMaterial({ color: 0x7A1416, roughness: 0.75, side: THREE.DoubleSide });
break;
case "wingB":
M = new THREE.MeshStandardMaterial({ color: 0x5A0C0E, roughness: 0.6 });
break;
case "head":
M = new THREE.MeshStandardMaterial({ color: 0xA41E1C, roughness: 0.5, metalness: 0.12, flatShading: true });
break;
case "jaw":
M = new THREE.MeshStandardMaterial({ color: 0xD49A50, roughness: 0.6, flatShading: true });
break;
case "lid":
M = new THREE.MeshStandardMaterial({ color: 0x5E0E0E, roughness: 0.6 });
break;
case "claw":
M = new THREE.MeshStandardMaterial({ color: 0x1E1614, roughness: 0.4 });
break;
case "rock":
M = new THREE.MeshLambertMaterial({ color: 0x2C2624, flatShading: true });
break;
case "rockL":
M = new THREE.MeshLambertMaterial({ color: 0x463C36, flatShading: true });
break;
case "crust":
M = new THREE.MeshLambertMaterial({ color: 0x1A1412, flatShading: true });
break;
case "gold":
M = new THREE.MeshPhongMaterial({ color: 0xD9A93A, emissive: 0x3A2606, specular: 0xFFE7A8, shininess: 70 });
break;
default: M = new THREE.MeshLambertMaterial({ color: 0xFF00FF });
}
return (DLR.mats[k] = M);
},
function (P, R, M, o) {
o = o || {};
M = M || 14;
var n = P.length, pos = [], col = [], uv = [], idx = [], len = 0, back = new THREE.Color(o.back || 0xB4221E), belly = new THREE.Color(o.belly || 0xE2A85A);
var up = new THREE.Vector3(0, 1, 0), T = new THREE.Vector3(), N = new THREE.Vector3(), B = new THREE.Vector3(), prevN = null;
for (var i = 0; i < n; i++) {
var a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)];
T.subVectors(b, a).normalize();
if (i > 0)
len += P[i].distanceTo(P[i - 1]);
N.crossVectors(up, T);
if (N.lengthSq() < 1e-6)
N.copy(prevN || new THREE.Vector3(1, 0, 0));
N.normalize();
prevN = N.clone();
B.crossVectors(T, N).normalize();
for (var j = 0; j <= M; j++) {
var ang = j / M * Math.PI * 2, cs = Math.cos(ang), sn = Math.sin(ang);
var ry = (sn < 0 ? sn * 0.78 : sn * 0.95) * (o.ay ? o.ay[i] : 1), rx = cs * 1.06 * (o.ax ? o.ax[i] : 1);
var r = R[i];
pos.push(P[i].x + N.x * rx * r + B.x * ry * r, P[i].y + N.y * rx * r + B.y * ry * r, P[i].z + N.z * rx * r + B.z * ry * r);
var k = Math.max(0, Math.min(1, (-sn - 0.25) / 0.5)), c = back.clone().lerp(belly, k);
col.push(c.r, c.g, c.b);
uv.push(len / (o.su || 1.6), j / M * (o.sv || 3));
}
}
for (i = 0; i < n - 1; i++)
for (j = 0; j < M; j++) {
var A = i * (M + 1) + j, Bq = A + M + 1;
idx.push(A, Bq, A + 1, A + 1, Bq, Bq + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function (len, r0, bend, mat) {
var g = new THREE.Group(), n = 6, p = new THREE.Vector3(), dir = new THREE.Vector3(0, 0, -1), seg = len / n;
for (var i = 0; i < n; i++) {
var ra = r0 * (1 - i / n), rb = r0 * (1 - (i + 1) / n) + 0.01;
var c = dlrMesh(new THREE.CylinderGeometry(rb, ra, seg * 1.08, 8), mat);
var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
c.quaternion.copy(q);
c.position.copy(p).addScaledVector(dir, seg / 2);
g.add(c);
p.addScaledVector(dir, seg);
dir.applyAxisAngle(new THREE.Vector3(1, 0, 0), bend / n).normalize();
}
return g;
},
function (g, P, R, i0, i1, sd, S) {
var NU = 28, NV = 9, pos = [], col = [], idx = [], up = new THREE.Vector3(0, 1, 0), T = new THREE.Vector3(), Sd = new THREE.Vector3();
var top = new THREE.Color(0x8E1A18), low = new THREE.Color(0x4E0A0C), tmp = new THREE.Color();
var ridge = [];
function frame(u) {
var f = i0 + (i1 - i0) * u, a = Math.floor(f), b = Math.min(P.length - 1, a + 1), w = f - a;
var p = P[a].clone().lerp(P[b], w), r = R[a] + (R[b] - R[a]) * w;
T.subVectors(P[Math.min(P.length - 1, a + 2)], P[Math.max(0, a - 2)]).setY(0).normalize();
Sd.crossVectors(up, T).normalize().multiplyScalar(sd);
return { p: p, r: r, s: Sd.clone() };
}
function ridgeH(u) { return S * (0.25 + 1.35 * Math.exp(-Math.pow((u - 0.2) / 0.17, 2)) + 0.25 * (1 - u)); }
function lobe(u) { return 0.82 + 0.26 * Math.pow(Math.abs(Math.sin((u - 0.15) * Math.PI * 3.4)), 0.6); }
for (var i = 0; i <= NU; i++) {
var u = i / NU, F = frame(u), rh = ridgeH(u), lk = lobe(u) * (u < 0.12 ? u / 0.12 : 1);
for (var j = 0; j <= NV; j++) {
var v = j / NV * lk;
var drop = Math.pow(v, 1.15) * (F.r * 0.7 + rh), out = F.r * 1.12 * Math.sin(Math.min(1, v) * Math.PI / 2) + 0.12 * S;
var q = F.p.clone().addScaledVector(up, F.r * 0.82 + rh - drop).addScaledVector(F.s, out * Math.min(1, v * 1.2));
pos.push(q.x, q.y, q.z);
tmp.copy(top).lerp(low, Math.min(1, v));
col.push(tmp.r, tmp.g, tmp.b);
if (j === 0)
ridge.push(q.clone());
}
}
for (i = 0; i < NU; i++)
for (var j2 = 0; j2 < NV; j2++) {
var a = i * (NV + 1) + j2, b = a + NV + 1;
idx.push(a, b, a + 1, b, b + 1, a + 1);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
geo.setIndex(idx);
geo.computeVertexNormals();
if (!DLR.mats.wingF)
DLR.mats.wingF = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, vertexColors: true, roughness: 0.8, side: THREE.DoubleSide });
var mem = new THREE.Mesh(geo, DLR.mats.wingF);
mem.castShadow = true;
mem.receiveShadow = true;
g.add(mem);
var arm = ridge.slice(0, Math.round(NU * 0.75)), ar = arm.map(function (p, k) { var t = k / (arm.length - 1); return (0.24 - 0.14 * t) * S; });
g.add(new THREE.Mesh(dlrTube(arm, ar, 8, { back: 0x5A0C0E, belly: 0x5A0C0E, su: 4 * S, sv: 1 }), dlrM("wingB")));
var kn = ridge[Math.round(NU * 0.2)];
g.add(dlrMesh(new THREE.SphereGeometry(0.28 * S, 8, 6), "wingB", kn.x, kn.y, kn.z));
var cl = dlrMesh(new THREE.ConeGeometry(0.1 * S, 0.45 * S, 6), "claw", kn.x, kn.y + 0.3 * S, kn.z);
g.add(cl);
[0.32, 0.5, 0.68, 0.86].forEach(function (u) {
var i = Math.round(u * NU), line = [], rr = [];
for (var j = 0; j <= NV; j++) {
var k = i * (NV + 1) + j;
line.push(new THREE.Vector3(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]).addScaledVector(frame(u).s, 0.03 * S));
rr.push((0.09 - 0.05 * j / NV) * S);
}
g.add(new THREE.Mesh(dlrTube(line, rr, 6, { back: 0x4A0A0C, belly: 0x4A0A0C, su: 4 * S, sv: 1 }), dlrM("wingB")));
});
},
function (g, F, S) {
function at(u, side, up, out) { var f = F(u); return f.p.clone().addScaledVector(f.s, side * f.w).addScaledVector(f.up, up * f.h).addScaledVector(f.fw, out || 0); }
[-1, 1].forEach(function (sd) {
var e = at(0.36, sd * 0.78, 0.42), f = F(0.36);
var lid = dlrMesh(new THREE.SphereGeometry(0.26 * S, 12, 8), "head");
lid.position.copy(e);
lid.scale.set(0.55, 0.5, 1.25);
lid.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), f.fw);
g.add(lid);
var seam = dlrMesh(new THREE.BoxGeometry(0.035 * S, 0.03 * S, 0.5 * S), "lid");
seam.position.copy(at(0.36, sd * 0.9, 0.36));
seam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), f.fw);
g.add(seam);
var br = dlrMesh(new THREE.ConeGeometry(0.2 * S, 0.9 * S, 5), "spine");
br.position.copy(at(0.3, sd * 0.72, 0.78));
br.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), f.fw.clone().multiplyScalar(-1).addScaledVector(f.s, sd * 0.5).addScaledVector(f.up, 0.4).normalize());
g.add(br);
var mp = [];
for (var k = 0; k <= 10; k++) {
mp.push(at(0.98 - k * 0.075, sd * 0.98, -0.18));
}
var mt = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(mp), 30, 0.035 * S, 5, false), dlrM("lid"));
g.add(mt);
var fg = dlrMesh(new THREE.ConeGeometry(0.06 * S, 0.3 * S, 6), "horn");
fg.position.copy(at(0.84, sd * 0.86, -0.42));
g.add(fg);
fg.rotation.x = Math.PI;
var ns = dlrMesh(new THREE.SphereGeometry(0.08 * S, 8, 6), "lid");
ns.position.copy(at(0.97, sd * 0.42, 0.5));
ns.scale.set(1, 0.6, 1);
g.add(ns);
var fb = F(0.12), dir = fb.fw.clone().multiplyScalar(-1).addScaledVector(fb.up, 0.35).addScaledVector(fb.s, sd * 0.35).normalize();
var H1 = dlrHorn(2.6 * S, 0.24 * S, 0.7, "horn");
H1.position.copy(at(0.14, sd * 0.55, 0.8));
H1.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), dir);
g.add(H1);
var dir2 = fb.fw.clone().multiplyScalar(-1).addScaledVector(fb.s, sd * 0.8).normalize();
var H2 = dlrHorn(1.3 * S, 0.13 * S, 0.5, "horn");
H2.position.copy(at(0.18, sd * 0.95, 0.15));
H2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), dir2);
g.add(H2);
for (var i = 0; i < 4; i++) {
var fp = at(0.06 + i * 0.05, sd * 0.95, -0.35 + i * 0.08), fd = fb.fw.clone().multiplyScalar(-0.7).addScaledVector(fb.s, sd).addScaledVector(fb.up, -0.2).normalize();
var fr = dlrMesh(new THREE.ConeGeometry(0.1 * S, (0.8 - i * 0.1) * S, 5), "spine");
fr.position.copy(fp);
fr.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), fd);
g.add(fr);
}
});
for (var k = 0; k < 5; k++) {
var f2 = F(0.2 + k * 0.12), sp = dlrMesh(new THREE.ConeGeometry(0.07 * S, (0.36 - k * 0.05) * S, 5), "spine");
sp.position.copy(at(0.2 + k * 0.12, 0, 0.98));
sp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), f2.up.clone().addScaledVector(f2.fw, -0.7).normalize());
g.add(sp);
}
},
function (g, pts, rad, S) {
var curve = new THREE.CatmullRomCurve3(pts), P = curve.getPoints(18), R = P.map(function (p, i) { var t = i / 18, k = t * (rad.length - 1), a = Math.floor(k), b = Math.min(rad.length - 1, a + 1); return (rad[a] + (rad[b] - rad[a]) * (k - a)) * S; });
var m = new THREE.Mesh(dlrTube(P, R, 10, { su: 1.2 * S, sv: 2 }), dlrM("hide"));
m.castShadow = true;
m.receiveShadow = true;
g.add(m);
var e = P[P.length - 1], d = new THREE.Vector3().subVectors(P[P.length - 1], P[P.length - 3]).setY(0).normalize(), s = new THREE.Vector3(d.z, 0, -d.x);
var ft = dlrMesh(new THREE.SphereGeometry(0.52 * S, 10, 8), "hide");
ft.position.copy(e).setY(0.32 * S);
ft.scale.set(1.15, 0.55, 1.25);
ft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), d);
g.add(ft);
for (var c = -1; c <= 1; c++) {
var cl = dlrMesh(new THREE.ConeGeometry(0.1 * S, 0.48 * S, 6), "claw");
cl.position.copy(e).addScaledVector(s, c * 0.3 * S).addScaledVector(d, 0.55 * S).setY(0.18 * S);
cl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().addScaledVector(s, c * 0.3).setY(-0.35).normalize());
g.add(cl);
}
},
function (Rc) {
var g = new THREE.Group();
g.name = "sleeping-dragon";
var S = Rc / 7;
var P = [], R = [], n = 150, th1 = 2.3 * Math.PI;
for (var i = 0; i <= n; i++) {
var t = i / n, th = th1 * t;
var r = (3.5 + 1.5 * th / Math.PI) * S;
var rad = (t < 0.06 ? 1.4 + t * 3 : t < 0.32 ? 1.6 - 0.18 * ((t - 0.06) / 0.26) : 1.42 * Math.pow(1 - (t - 0.32) / 0.68, 1.2) + 0.05) * S;
var y = rad * 0.74 + (t > 0.88 ? Math.pow((t - 0.88) / 0.12, 2) * 1.6 * S : 0);
P.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r));
R.push(rad);
}
var body = new THREE.Mesh(dlrTube(P, R, 18, { su: 2.6 * S, sv: 4 }), dlrM("hide"));
body.castShadow = true;
body.receiveShadow = true;
g.add(body);
for (i = 2; i < n * 0.9; i += 5) {
var a = P[i], b = P[i + 1], d = new THREE.Vector3().subVectors(b, a).normalize(), rr = R[i], hh = rr * (0.85 - 0.45 * i / n);
var sp = dlrMesh(new THREE.ConeGeometry(rr * 0.2, hh, 4), "spine");
sp.position.set(a.x, a.y + rr * 0.82 + hh * 0.35, a.z);
sp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1, 0).addScaledVector(d, -0.9).normalize());
sp.scale.z = 0.45;
g.add(sp);
}
var s0 = P[0].clone(), d0 = new THREE.Vector3().subVectors(P[0], P[3]).normalize();
var ha = -0.75, headBack = new THREE.Vector3(Math.cos(ha) * 7.4 * S, 0.95 * S, Math.sin(ha) * 7.4 * S);
var hf = new THREE.Vector3(Math.cos(ha + 1.25), 0, Math.sin(ha + 1.25)).normalize();
var curve = new THREE.CubicBezierCurve3(s0.clone().setY(R[0] * 0.85), s0.clone().addScaledVector(d0, 2.6 * S).setY(3.3 * S), headBack.clone().addScaledVector(hf, -2.2 * S).setY(2.4 * S), headBack);
var NP = curve.getPoints(36), NR = [], AX = [], AY = [];
NP.forEach(function (p, k) { var t = k / 36; NR.push((1.42 - 0.5 * t) * S); AX.push(1); AY.push(1); });
var HL = 3.4 * S, HN = 24, prof = [[0, 0.95, 1.0, 1.0], [0.15, 1.05, 1.12, 1.05], [0.32, 1.0, 1.05, 1.0], [0.5, 0.82, 0.92, 0.8], [0.7, 0.66, 0.86, 0.68], [0.88, 0.55, 0.82, 0.6], [0.97, 0.42, 0.8, 0.55], [1, 0.16, 0.9, 0.6]];
function pf(u, j) { for (var q = 0; q < prof.length - 1; q++) {
if (u <= prof[q + 1][0]) {
var k = (u - prof[q][0]) / (prof[q + 1][0] - prof[q][0]);
return prof[q][j] + (prof[q + 1][j] - prof[q][j]) * k;
}
} return prof[prof.length - 1][j]; }
var HS = 0.9 * S, hp0 = NP[36].clone();
for (i = 1; i <= HN; i++) {
var u = i / HN;
NP.push(hp0.clone().addScaledVector(hf, u * HL).setY(hp0.y - 0.3 * S * u));
NR.push(pf(u, 1) * HS);
AX.push(pf(u, 2));
AY.push(pf(u, 3));
}
var neck = new THREE.Mesh(dlrTube(NP, NR, 18, { su: 1.8 * S, sv: 3, ax: AX, ay: AY }), dlrM("hide"));
neck.castShadow = true;
neck.receiveShadow = true;
g.add(neck);
var tipC = dlrMesh(new THREE.SphereGeometry(pf(0.98, 1) * HS * 1.0, 12, 8), "hide");
tipC.position.copy(NP[NP.length - 1]);
tipC.scale.set(0.85, 0.55, 0.5);
tipC.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), hf);
g.add(tipC);
for (i = 2; i < 34; i += 4) {
var nr = NR[i], sp2 = dlrMesh(new THREE.ConeGeometry(nr * 0.2, nr * 0.75, 4), "spine", NP[i].x, NP[i].y + nr * 0.8, NP[i].z);
sp2.scale.z = 0.45;
g.add(sp2);
}
var up = new THREE.Vector3(0, 1, 0), side = new THREE.Vector3().crossVectors(up, hf).normalize();
dlrFace(g, function (u) {
var x = Math.max(0, Math.min(1, u)), k = 36 + x * HN, a = Math.floor(k), b = Math.min(NP.length - 1, a + 1), w = k - a;
var p = NP[a].clone().lerp(NP[b], w);
var r = NR[a] + (NR[b] - NR[a]) * w;
return { p: p, fw: hf, s: side, up: up, w: r * 1.06 * pf(x, 2), h: r * 0.95 * pf(x, 3) };
}, S);
var c0 = P[4], cdir = new THREE.Vector3().subVectors(P[2], P[8]).setY(0).normalize(), cout = new THREE.Vector3(c0.x, 0, c0.z).normalize();
var sh1 = c0.clone().addScaledVector(cout, R[4] * 0.7).setY(R[4] * 0.9);
dlrLimb(g, [sh1, sh1.clone().addScaledVector(cout, 1.2 * S).setY(0.9 * S), sh1.clone().addScaledVector(cout, 1.6 * S).addScaledVector(hf, 1.8 * S).setY(0.55 * S), sh1.clone().addScaledVector(cout, 1.9 * S).addScaledVector(hf, 3.4 * S).setY(0.45 * S)], [0.75, 0.6, 0.45, 0.38], S);
var cin = cout.clone().multiplyScalar(-1), sh2 = P[9].clone().addScaledVector(cin, R[9] * 0.6).setY(R[9] * 0.7);
dlrLimb(g, [sh2, sh2.clone().addScaledVector(cin, 1.1 * S).setY(0.7 * S), sh2.clone().addScaledVector(cin, 1.4 * S).addScaledVector(cdir, 1.4 * S).setY(0.45 * S)], [0.7, 0.5, 0.4], S);
var hi = Math.round(n * 0.3), hpq = P[hi], hout = new THREE.Vector3(hpq.x, 0, hpq.z).normalize(), hdir = new THREE.Vector3().subVectors(P[hi - 3], P[hi + 3]).setY(0).normalize();
var hip = hpq.clone().addScaledVector(hout, R[hi] * 0.75).setY(R[hi] * 1.0);
dlrLimb(g, [hip, hip.clone().addScaledVector(hout, 0.9 * S).addScaledVector(hdir, 1.6 * S).setY(1.2 * S), hip.clone().addScaledVector(hout, 1.3 * S).addScaledVector(hdir, 0.2 * S).setY(0.55 * S), hip.clone().addScaledVector(hout, 1.4 * S).addScaledVector(hdir, 1.8 * S).setY(0.42 * S)], [1.0, 0.7, 0.48, 0.4], S);
[-1, 1].forEach(function (sd) { dlrWingFold(g, P, R, Math.round(n * 0.05), Math.round(n * 0.3), sd, S); });
var t0 = Math.random() * 10;
body.onBeforeRender = function () { var k = 1 + Math.sin(performance.now() / 1000 * 0.75 + t0) * 0.016; g.scale.set(1, k, 1); };
return g;
},
function (Rb, seed) {
var g = new THREE.Group();
g.name = "lava-bed";
var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s % 10000) / 10000; }; })(seed || 91);
var sh = new THREE.Shape(), m = 40;
for (var i = 0; i <= m; i++) {
var a = i / m * Math.PI * 2, r = Rb * (0.9 + 0.1 * Math.sin(a * 5 + 1) + 0.04 * Math.sin(a * 11));
if (i === 0)
sh.moveTo(Math.cos(a) * r, Math.sin(a) * r);
else
sh.lineTo(Math.cos(a) * r, Math.sin(a) * r);
}
var lg = new THREE.ShapeGeometry(sh, 2);
lg.rotateX(-Math.PI / 2);
var uv = lg.attributes.uv;
for (i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) / 6, uv.getY(i) / 6);
var lava = new THREE.Mesh(lg, dlrLavaMat());
lava.position.y = 0.06;
lava.userData.psKeep = 1;
var lt = dlrLavaTex();
lava.onBeforeRender = function () { var k = performance.now() / 1000; lt.offset.set(Math.sin(k * 0.021) * 0.05, k * 0.0035); };
g.add(lava);
var crust = new THREE.Mesh(new THREE.RingGeometry(Rb * 0.9, Rb * 1.08, 48, 1), dlrM("crust"));
crust.rotation.x = -Math.PI / 2;
crust.position.y = 0.07;
g.add(crust);
for (i = 0; i < 90; i++) {
var a3 = i / 90 * Math.PI * 2 + rnd() * 0.06, r3 = Rb * (1.04 + rnd() * 0.12), s = 0.25 + rnd() * 0.5;
var rk = dlrMesh(new THREE.DodecahedronGeometry(s, 0), rnd() < 0.5 ? "rock" : "rockL", Math.cos(a3) * r3, s * 0.35, Math.sin(a3) * r3, rnd() * 3, rnd() * 3, rnd() * 3);
rk.scale.y = 0.55 + rnd() * 0.3;
g.add(rk);
}
return g;
},
function () {
var g = new THREE.Group(), Rb = DLR.Rb || 10;
g.add(dlrBed(Rb, 57));
var d = dlrDragon(Rb * 0.66);
d.position.y = -0.18;
d.rotation.y = 0.4;
g.add(d);
var L = new THREE.PointLight(0xFF8A40, 1.6, Rb * 3.6, 1.6);
L.position.set(0, 2.2, 0);
g.add(L);
return g;
},
function (W, D, put, spots) {
DLR.Rb = Math.max(6, Math.min(13, Math.min(W, D) * 0.3));
put("dragonlair", 0, -D * 0.06, 0);
var hasPs = typeof FURN !== "undefined" && FURN.goldhoard;
if (hasPs) {
put("goldhoard", -W / 2 + 6, -D / 2 + 6, 0.6);
put("goldhoard", W / 2 - 6, -D / 2 + 6, 2.4);
put("goldhoard", 0, -D / 2 + 3.5, 0);
}
var R = DLR.Rb * 1.25 + 2, z0 = -D * 0.06;
[[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(function (q) { var x = q[0] * Math.min(W / 2 - 2.5, R * 0.8), z = z0 + q[1] * Math.min(D / 2 - 2.5, R * 0.8); put(hasPs && FURN.brazier ? "brazier" : "candles", x, z, 0); });
if (hasPs && typeof psEdge === "function") {
psEdge(W, D, ["gemheap", "stalagmite", "treasurechest", "stalagmite", "crystalcluster"], 5, 1.6, put);
}
if (typeof psSconces === "function")
psSconces(W, D, put);
spots.push({ x: 0, z: D / 2 - 4, room: "the dragon's lair" });
}
];
});
