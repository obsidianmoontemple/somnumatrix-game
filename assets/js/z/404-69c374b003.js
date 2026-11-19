/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(404, function () {
"use strict";
return [
function (d) {
var t = d.trad || "", out = [];
function has(k) { return hasIcon(d, k); }
var hat = iconVal(d, "hat");
if (hat === "brimmed")
out.push(["widehat", {}]);
else if (hat === "cap")
out.push([t === "Persian" ? "phrygian" : t === "Japanese" ? "kanmuri" : "pilos", {}]);
else if (hat)
out.push([hat, {}]);
if (has("crownwhite") && has("crownred"))
out.push(["pschent", {}]);
else if (has("crownwhite"))
out.push(["hedjet", {}]);
else if (has("crownred"))
out.push(["deshret", {}]);
if (has("crown"))
out.push(t === "Hindu" ? ["kirita", {}] : t === "Mesopotamian" ? ["horned", {}] : t === "Chinese" ? ["mianguan", {}] : ["crown", { n: 8, cap: false }]);
if (has("helmet"))
out.push([t === "Norse" || t === "Anglo-Saxon" ? "spangen" : t === "Japanese" ? "kabuto" : t === "Chinese" ? "kui" : "corinthian", {}]);
if (has("wingedhelm"))
out.push(["petasos", {}]);
if (has("laurel"))
out.push(["laurel", {}]);
if (has("mooncrown"))
out.push(["moon", {}]);
if (has("veil"))
out.push(["veil", { c: has("robe:black") ? 0x1A1A1E : 0xF0ECE2, from: out.length ? "crown" : null }]);
if (has("hood"))
out.push(["hood", {}]);
if (has("cowhorns"))
out.push(["horndisc", {}]);
else if (has("sundisc"))
out.push(["sundisc", {}]);
if (has("horns"))
out.push(["horns", { kind: "goat" }]);
if (has("antlers"))
out.push(["antlers", {}]);
if (has("plumes"))
out.push(["amun", {}]);
if (has("feather"))
out.push(["maat", {}]);
return out;
},
function (kind, col) {
var key = kind + ":" + (col == null ? "" : col);
if (DGX.mats[key])
return DGX.mats[key];
var m, DS = THREE.DoubleSide;
if (kind === "gold")
m = new THREE.MeshPhongMaterial({ color: col != null ? col : 0xD4A63E, shininess: 110, specular: 0xFFE9B0, emissive: 0x2A1A00, side: DS });
else if (kind === "silver")
m = new THREE.MeshPhongMaterial({ color: col != null ? col : 0xDCE2EA, shininess: 120, specular: 0xFFFFFF, emissive: 0x101418, side: DS });
else if (kind === "bronze")
m = new THREE.MeshPhongMaterial({ color: col != null ? col : 0xB07A3A, shininess: 90, specular: 0xF0C890, emissive: 0x1A0E00, side: DS });
else if (kind === "iron")
m = new THREE.MeshPhongMaterial({ color: col != null ? col : 0x55595F, shininess: 70, specular: 0xB8C0C8, emissive: 0x050608, side: DS });
else if (kind === "lacquer")
m = new THREE.MeshPhongMaterial({ color: col != null ? col : 0x121214, shininess: 90, specular: 0x7A7A80, side: DS });
else if (kind === "gem")
m = new THREE.MeshPhongMaterial({ color: col, shininess: 150, specular: 0xFFFFFF, emissive: new THREE.Color(col).multiplyScalar(0.22), flatShading: true });
else if (kind === "pearl")
m = new THREE.MeshPhongMaterial({ color: col != null ? col : 0xF4F0EA, shininess: 120, specular: 0xFFFFFF });
else if (kind === "glow")
m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.85, depthWrite: false, side: DS });
else if (kind === "horn")
m = new THREE.MeshPhongMaterial({ color: col != null ? col : 0xD8CCB0, shininess: 40, specular: 0x504838, side: DS });
else if (kind === "feather")
m = new THREE.MeshLambertMaterial({ color: col, side: DS, map: dgxTex("feather", 32, 128, function (x, W, H) {
x.fillStyle = "#FFFFFF";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(0,0,0,.28)";
x.fillRect(W / 2 - 1, 0, 2, H);
for (var i = 0; i < H; i += 3) {
x.fillStyle = "rgba(0,0,0," + (0.05 + 0.06 * Math.random()) + ")";
x.fillRect(0, i, W / 2 - 1, 1);
x.fillRect(W / 2 + 1, i + 1, W / 2, 1);
}
}) });
else if (kind === "leaf")
m = new THREE.MeshLambertMaterial({ color: col != null ? col : 0x3E7A34, side: DS });
else if (kind === "straw")
m = new THREE.MeshLambertMaterial({ color: col != null ? col : 0xC8A866, side: DS, map: dgxTex("straw", 64, 64, function (x, W, H) { x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H); for (var i = 0; i < W; i += 2) {
x.fillStyle = "rgba(80,50,10," + (0.08 + 0.12 * Math.random()) + ")";
x.fillRect(i, 0, 1, H);
} }) });
else if (kind === "stripes")
m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: DS, map: dgxTex("stripe:" + col, 64, 64, function (x, W, H) { var c = String(col).split("/"); for (var i = 0; i < H; i += 8) {
x.fillStyle = c[0];
x.fillRect(0, i, W, 5);
x.fillStyle = c[1];
x.fillRect(0, i + 5, W, 3);
} }) });
else if (kind === "beads")
m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: DS, map: dgxTex("beads:" + col, 64, 64, function (x, W, H) {
var c = String(col).split("/");
for (var j = 0; j < 8; j++)
for (var i = 0; i < 8; i++) {
x.fillStyle = c[(Math.floor(j / 2) + ((i + j) % 3 === 0 ? 1 : 0)) % c.length];
x.beginPath();
x.arc(i * 8 + 4, j * 8 + 4, 3.6, 0, 7);
x.fill();
}
}) });
else if (kind === "fur")
m = new THREE.MeshLambertMaterial({ color: col, side: DS, map: dgxTex("fur", 64, 64, function (x, W, H) { x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H); for (var i = 0; i < 700; i++) {
x.fillStyle = "rgba(0,0,0," + (Math.random() * 0.18) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 1, 4);
} }) });
else
m = new THREE.MeshLambertMaterial({ color: col != null ? col : 0xE8E4DA, side: DS, map: dgxTex("weave", 64, 64, function (x, W, H) { x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H); for (var i = 0; i < W; i += 2) {
x.fillStyle = "rgba(0,0,0," + (i % 4 ? 0.04 : 0.08) + ")";
x.fillRect(i, 0, 1, H);
x.fillRect(0, i, W, 1);
} }) });
m.userData.dgx = 1;
return (DGX.mats[key] = m);
},
function (G, pts, face, eyes) {
if (pts.length < 20)
return null;
var ymax = -1e9, ymin = 1e9;
pts.forEach(function (p) { if (p.y > ymax)
ymax = p.y; if (p.y < ymin)
ymin = p.y; });
var cx = 0, cz = 0, n = 0;
pts.forEach(function (p) { if (p.y > ymax - 0.1) {
cx += p.x;
cz += p.z;
n++;
} });
cx /= n || 1;
cz /= n || 1;
var H = { G: G, pts: pts, face: face || [], eyes: eyes || [], ymax: ymax, ymin: ymin, cx: cx, cz: cz, memo: {} };
H.ring = function (y, NA) {
NA = NA || 32;
var k = Math.round(y * 500) + ":" + NA;
if (H.memo[k])
return H.memo[k];
var R = [], band = Math.max(0.012, (ymax - ymin) / 40);
for (var j = 0; j < NA; j++)
R.push(0);
pts.forEach(function (p) { if (Math.abs(p.y - y) > band)
return; var dx = p.x - cx, dz = p.z - cz, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx), b = Math.round((a / (Math.PI * 2) + 1) * NA) % NA; for (var e = -1; e <= 1; e++) {
var bb = (b + e + NA) % NA;
if (r > R[bb])
R[bb] = r;
} });
var mx = Math.max.apply(null, R);
if (!(mx > 0))
mx = 0.05;
for (var j2 = 0; j2 < NA; j2++)
if (R[j2] < mx * 0.6)
R[j2] = mx * 0.85;
for (var s = 0; s < 2; s++)
R = R.map(function (r, j) { return Math.max(r, (R[(j + NA - 1) % NA] + 2 * r + R[(j + 1) % NA]) / 4); });
return (H.memo[k] = R);
};
H.at = function (R, a) { var NA = R.length, f = ((a / (Math.PI * 2)) % 1 + 1) % 1 * NA, j = Math.floor(f), k = f - j; return R[j % NA] * (1 - k) + R[(j + 1) % NA] * k; };
dgxHeadMore(H);
return H;
},
function (H) {
var ey = null, ez = -1e9;
if (H.eyes.length > 5) {
ey = 0;
H.eyes.forEach(function (p) { ey += p.y; if (p.z > ez)
ez = p.z; });
ey /= H.eyes.length;
}
var F = H.face.length > 30 ? H.face : H.pts, fy = 1e9, fz = -1e9;
F.forEach(function (p) { if (p.y < fy)
fy = p.y; if (p.z > fz)
fz = p.z; });
var top = H.ymax, h = top - fy;
H.eyeY = ey != null ? ey : top - h * 0.48;
H.eyeZ = ez > -1e8 ? ez : H.cz + 0.09;
H.chinY = fy;
H.faceZ = fz;
var cz = -1e9, cy = 1e9;
F.forEach(function (p) { if (Math.abs(p.x - H.cx) < 0.03 && p.y < fy + 0.03) {
if (p.z > cz)
cz = p.z;
if (p.y < cy)
cy = p.y;
} });
H.chin = new THREE.Vector3(H.cx, cy < 1e8 ? cy : fy, cz > -1e8 ? cz : H.cz + 0.06);
H.browY = Math.min(top - 0.02, H.eyeY + h * 0.14);
H.earY = H.eyeY - h * 0.06;
return H;
},
function (body, extra) {
body.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(body.matrixWorld).invert(), pts = [], face = [], eyes = [], v = new THREE.Vector3(), M = new THREE.Matrix4();
function take(m, kind) {
var P = m.geometry && m.geometry.attributes.position;
if (!P)
return;
M.multiplyMatrices(inv, m.matrixWorld);
var step = Math.max(1, Math.floor(P.count / 400));
for (var i = 0; i < P.count; i += step) {
v.fromBufferAttribute(P, i).applyMatrix4(M);
var q = v.clone();
pts.push(q);
if (kind === "face")
face.push(q);
if (kind === "eye")
eyes.push(q);
}
}
body.children.forEach(function (m) {
if (!m.visible)
return;
if (m.isMesh && m.userData && DGX_KITHEAD.test(m.userData.part || ""))
take(m, m.userData.part === "eye" ? "eye" : m.userData.part === "head" ? "face" : "hair");
});
(extra || []).forEach(function (o) { o.updateMatrixWorld(true); o.traverse(function (m) { if (m.isMesh && m.visible !== false)
take(m, "face"); }); });
var G = new THREE.Group();
G.name = "dgx-kit-frame";
body.add(G);
var H = dgxHeadFrom(G, pts, face, eyes);
if (!H) {
body.remove(G);
return null;
}
return H;
},
function (H, rings, o) {
o = o || {};
var NA = o.NA || 40, a0 = o.a0 != null ? o.a0 : 0, a1 = o.a1 != null ? o.a1 : Math.PI * 2, full = o.a0 == null, pos = [], uv = [], idx = [];
rings.forEach(function (rg, i) { for (var j = 0; j <= NA; j++) {
var a = a0 + (a1 - a0) * j / NA, q = rg(a, j / NA);
pos.push(H.cx + Math.cos(a) * q.r + (q.dx || 0), q.y, H.cz + Math.sin(a) * q.r + (q.dz || 0));
uv.push(j / NA * (o.u || 3), i / (rings.length - 1 || 1) * (o.v || 1));
} });
for (var i = 0; i < rings.length - 1; i++)
for (var j = 0; j < NA; j++) {
var p0 = i * (NA + 1) + j, c0 = p0 + NA + 1;
idx.push(p0, c0, p0 + 1, p0 + 1, c0, c0 + 1);
}
if (o.apex) {
var ai = pos.length / 3;
pos.push(o.apex.x, o.apex.y, o.apex.z);
uv.push(0.5, 1);
var l = (rings.length - 1) * (NA + 1);
for (var j2 = 0; j2 < NA; j2++)
idx.push(l + j2, ai, l + j2 + 1);
}
return dgxGeo(pos, idx, uv);
},
function (H, y0, h, gap, mat, o) {
o = o || {};
var hf = typeof h === "function" ? h : function () { return h; }, R = o.R || dgxRmax(H, y0, y0 + (o.hmax || (typeof h === "number" ? h : 0.05))), N = o.rows || 3, rs = [];
for (var i = 0; i <= N; i++) {
(function (t) { rs.push(function (a) { return { r: H.at(R, a) + gap + (o.flare || 0) * t + (o.bulge || 0) * Math.sin(t * Math.PI), y: y0 + hf(a) * t }; }); })(i / N);
}
var m = new THREE.Mesh(dgxLoft(H, rs, o), mat);
m.userData.dgxBand = 1;
return m;
},
function (H, R, y, gap, rad, mat, a0, a1) {
var pts = [], n = 48, full = a0 == null;
for (var k = 0; k <= n; k++) {
var a = full ? k / n * Math.PI * 2 : a0 + (a1 - a0) * k / n, r = H.at(R, a) + gap;
pts.push(new THREE.Vector3(H.cx + Math.cos(a) * r, typeof y === "function" ? y(a) : y, H.cz + Math.sin(a) * r));
}
if (full)
pts.pop();
return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, full), full ? 64 : 40, rad, 6, full), mat);
},
function (H, y0, gap, rise, mat, o) {
o = o || {};
var rs = [], apexY = H.ymax + gap + (rise || 0), Rb = dgxRmax(H, y0, y0 + 0.02), N = o.rows || 9;
for (var i = 0; i < N; i++) {
(function (i) {
var t = i / N, ang = t * Math.PI / 2, y = y0 + (apexY - y0) * Math.sin(ang), Rm = H.ring(Math.min(H.ymax - 0.004, y));
rs.push(function (a) { var base = H.at(Rb, a) + gap, ell = base * Math.cos(ang), meas = H.at(Rm, a) + gap * 0.7; var r = Math.max(ell, y < H.ymax - 0.01 ? meas * (1 - 0.35 * t * t) : 0); if (o.shape)
r = o.shape(r, a, t); return { r: r, y: y }; });
})(i);
}
var m = new THREE.Mesh(dgxLoft(H, rs, { a0: o.a0, a1: o.a1, apex: o.a0 == null ? new THREE.Vector3(H.cx, apexY, H.cz) : null, NA: o.NA }), mat);
m.userData.dgxBand = 1;
return m;
},
function (pts, r0, r1, mat, seg) {
var c = new THREE.CatmullRomCurve3(pts), N = Math.max(12, pts.length * 4), S = seg || 8, F = c.computeFrenetFrames(N, false), pos = [], idx = [], uv = [];
for (var i = 0; i <= N; i++) {
var t = i / N, p = c.getPointAt(t), r = r0 + (r1 - r0) * t, nn = F.normals[i], bb = F.binormals[i];
for (var j = 0; j <= S; j++) {
var a = j / S * Math.PI * 2, cs = Math.cos(a) * r, sn = Math.sin(a) * r;
pos.push(p.x + nn.x * cs + bb.x * sn, p.y + nn.y * cs + bb.y * sn, p.z + nn.z * cs + bb.z * sn);
uv.push(j / S, t);
}
}
for (var i2 = 0; i2 < N; i2++)
for (var j2 = 0; j2 < S; j2++) {
var a0 = i2 * (S + 1) + j2, b0 = a0 + S + 1;
idx.push(a0, b0, a0 + 1, a0 + 1, b0, b0 + 1);
}
return new THREE.Mesh(dgxGeo(pos, idx, uv), mat);
},
function (kind) {
if (DGX_SHAPES[kind])
return DGX_SHAPES[kind];
var s = new THREE.Shape();
if (kind === "leaf") {
s.moveTo(0, 0);
s.quadraticCurveTo(0.5, 0.35, 0, 1);
s.quadraticCurveTo(-0.5, 0.35, 0, 0);
}
else if (kind === "oak") {
s.moveTo(0, 0);
var L = [[0.3, 0.12], [0.18, 0.22], [0.38, 0.35], [0.2, 0.48], [0.36, 0.62], [0.18, 0.74], [0.26, 0.88], [0, 1]];
L.forEach(function (p) { s.lineTo(p[0], p[1]); });
for (var i = L.length - 2; i >= 0; i--)
s.lineTo(-L[i][0], L[i][1]);
s.lineTo(0, 0);
}
else if (kind === "feather") {
s.moveTo(-0.08, 0);
s.lineTo(0.08, 0);
s.quadraticCurveTo(0.55, 0.4, 0.3, 0.92);
s.quadraticCurveTo(0.1, 1.04, -0.05, 1);
s.quadraticCurveTo(-0.5, 0.5, -0.08, 0);
}
else if (kind === "plume") {
s.moveTo(-0.5, 0);
s.lineTo(0.5, 0);
s.lineTo(0.42, 0.97);
s.quadraticCurveTo(0, 1.06, -0.42, 0.97);
s.lineTo(-0.5, 0);
}
else if (kind === "ray") {
s.moveTo(-0.5, 0);
s.lineTo(0.5, 0);
s.lineTo(0, 1);
s.lineTo(-0.5, 0);
}
else if (kind === "petal") {
s.moveTo(0, 0);
s.bezierCurveTo(0.6, 0.2, 0.5, 0.9, 0, 1);
s.bezierCurveTo(-0.5, 0.9, -0.6, 0.2, 0, 0);
}
else if (kind === "crescent") {
s.absarc(0, 0, 0.5, Math.PI * 0.08, Math.PI * 0.92, false);
s.absarc(0, 0.17, 0.4, Math.PI * 0.88, Math.PI * 0.12, true);
}
else if (kind === "disc") {
s.absarc(0, 0, 0.5, 0, Math.PI * 2, false);
}
else {
s.moveTo(-0.5, 0);
s.lineTo(0.5, 0);
s.lineTo(0.5, 1);
s.lineTo(-0.5, 1);
s.lineTo(-0.5, 0);
}
var g = kind === "crescent" || kind === "disc" ? new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 16 }) : new THREE.ShapeGeometry(s, 8);
if (kind === "crescent" || kind === "disc")
g.translate(0, 0, -0.04);
g.userData.dgxShared = 1;
return (DGX_SHAPES[kind] = g);
},
function (G, kind, mat, p, dir, face, L, W, bend) {
var m = new THREE.Mesh(dgxShapeGeo(kind), mat);
var d = dir.clone().normalize(), f = face ? face.clone().normalize() : new THREE.Vector3(0, 0, 1);
var x = new THREE.Vector3().crossVectors(d, f).normalize();
f = new THREE.Vector3().crossVectors(x, d).normalize();
var M = new THREE.Matrix4().makeBasis(x, d, f);
m.quaternion.setFromRotationMatrix(M);
m.scale.set(W, L, kind === "crescent" || kind === "disc" ? W : 1);
m.position.copy(p);
if (bend)
m.rotateX(bend);
G.add(m);
return m;
},
function (H, G, y, gap, mat, o) {
o = o || {};
var R = dgxRmax(H, y - 0.01, y + 0.02), n = o.n || 16, open = o.open != null ? o.open : 0.32, kind = o.kind || "leaf", L = o.L || 0.034, W = o.W || 0.016;
G.add(dgxRim(H, R, y, gap, o.stem || 0.0035, o.stemMat || mat));
[-1, 1].forEach(function (sd) {
for (var i = 0; i < n; i++) {
var t = i / (n - 1), a = DGX_BACK + sd * (Math.PI - open) * t, p = dgxPt(H, R, a, y, gap + 0.004), tan = new THREE.Vector3(-Math.sin(a) * sd, 0, Math.cos(a) * sd);
[-1, 1].forEach(function (row) {
var dir = tan.clone().add(new THREE.Vector3(0, 0.55 * row, 0)).add(dgxOut(a).multiplyScalar(0.25)).normalize();
dgxFlat(G, kind, mat, p.clone().add(new THREE.Vector3(0, row * 0.004, 0)), dir, dgxOut(a), L * (0.85 + 0.3 * Math.sin(t * Math.PI)), W);
});
if (o.berry && i % 3 === 1)
dgxBall(G, o.berry, p.clone().add(dgxOut(a).multiplyScalar(0.012)).add(new THREE.Vector3(0, 0.002, 0)), 0.0075);
}
});
},
function (H, G, o) {
var y = H.browY + 0.004, gm = dgxMat("gold", o.c), hf = function (a) { var d = Math.cos(a - DGX_FRONT); return 0.01 + 0.038 * Math.pow(Math.max(0, d), 1.4); };
G.add(dgxBand(H, y, hf, 0.008, gm, { hmax: 0.05, rows: 4 }));
var R = dgxRmax(H, y, y + 0.05);
G.add(dgxRim(H, R, function (a) { return y + hf(a); }, 0.009, 0.0035, gm));
G.add(dgxRim(H, R, y, 0.009, 0.0035, gm));
for (var i = -3; i <= 3; i++) {
var a = DGX_FRONT + i * 0.2, h = hf(a);
dgxFlat(G, "petal", gm, dgxPt(H, R, a, y + h * 0.25, 0.012), new THREE.Vector3(0, 1, 0), dgxOut(a), h * 0.7, 0.022);
}
dgxGem(G, o.gem || 0x2E6AD0, dgxPt(H, R, DGX_FRONT, y + 0.022, 0.014), dgxOut(DGX_FRONT), 0.009);
},
function (H, G, o) {
var y = H.browY - 0.004, h = Math.max(o.h || 0.06, H.ymax - y + 0.008), gm = dgxMat(o.metal || "gold", o.c), R = dgxRmax(H, y, y + 0.05);
G.add(dgxBand(H, y, h, 0.007, gm, { R: R, flare: 0.008, rows: 4 }));
G.add(dgxRim(H, R, y, 0.011, 0.004, gm));
G.add(dgxRim(H, R, y + h, 0.023, 0.004, gm));
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2, p = dgxPt(H, R, a, y + h * 0.3, 0.014 + 0.012 * 0.3);
dgxFlat(G, "petal", dgxMat("gold", 0xE8C25A), p, new THREE.Vector3(0, 1, 0).add(dgxOut(a).multiplyScalar(0.25)), dgxOut(a), h * 0.5, 0.022);
}
if (o.wheat)
for (var j = 0; j < 9; j++) {
var aw = DGX_FRONT + (j - 4) * 0.16, pw = dgxPt(H, R, aw, y + h, 0.03);
G.add(dgxTaper([pw, pw.clone().add(new THREE.Vector3(0, 0.045, 0)).add(dgxOut(aw).multiplyScalar(0.012))], 0.004, 0.002, dgxMat("gold", 0xD8B848), 4));
dgxBall(G, dgxMat("gold", 0xE0C060), pw.clone().add(new THREE.Vector3(0, 0.05, 0)).add(dgxOut(aw).multiplyScalar(0.014)), 0.008, 0.7, 1.8, 0.7);
}
var top = dgxRmax(H, y + h - 0.01, y + h);
var cap = [];
for (var k = 0; k <= 3; k++) {
(function (t) { cap.push(function (a) { return { r: (H.at(R, a) + 0.02) * (1 - t), y: y + h - 0.002 }; }); })(k / 3);
}
G.add(new THREE.Mesh(dgxLoft(H, cap), gm));
if (o.veil)
DGX_HW.veil(H, G, { c: o.veil, from: y + h * 0.5, open: 0.85 });
},
function (H, G, o) {
var from = o.from === "crown" ? H.ymax - 0.012 : o.from;
var col = o.c != null ? o.c : 0xF0ECE2, m = dgxMat("cloth", col), y0 = from != null ? from : H.ymax - 0.03, low = H.chinY - (o.drop || 0.16), open = o.open || 0.72;
var a0 = DGX_FRONT + open, a1 = DGX_FRONT + Math.PI * 2 - open, rs = [], Rtop = dgxRmax(H, y0 - 0.04, y0), N = 10;
if (from == null)
G.add(dgxDome(H, y0, 0.012, 0.008, m, { a0: a0 - 0.12, a1: a1 + 0.12 }));
for (var i = 0; i <= N; i++) {
(function (t) {
var y = y0 - (y0 - low) * t, Ry = H.ring(Math.max(H.ymin + 0.01, Math.min(H.ymax - 0.005, y)));
rs.push(function (a) {
var base = Math.max(H.at(Rtop, a), y > H.chinY ? H.at(Ry, a) : 0) + 0.014, fold = 0.005 * Math.sin(a * 11) * t, flare = 0.07 * Math.pow(t, 1.6);
return { r: base + flare + fold, y: y - 0.012 * Math.pow(Math.abs(Math.cos(a - DGX_BACK)), 2) * t };
});
})(i / N);
}
var mm = new THREE.Mesh(dgxLoft(H, rs, { a0: a0 - 0.12, a1: a1 + 0.12, NA: 44 }), m);
mm.userData.dgxDrape = 1;
G.add(mm);
if (o.band != null) {
var R = dgxRmax(H, H.browY, H.browY + 0.03);
G.add(dgxRim(H, R, H.browY + 0.012, 0.02, 0.005, dgxMat("gold", o.band), a0 - 0.3, a1 + 0.3));
}
},
function (H, G, o) {
var col = o.c != null ? o.c : 0x3A3634, m = dgxMat("cloth", col);
DGX_HW.veil(H, G, { c: col, open: 0.6, drop: 0.2, from: H.ymax + 0.02 });
G.add(dgxDome(H, H.browY - 0.02, 0.022, 0.03, m, { shape: function (r, a, t) { return r + 0.012 * t * Math.max(0, Math.cos(a - DGX_BACK)); } }));
var R = dgxRmax(H, H.chinY, H.ymax), pts = [];
for (var k = 0; k <= 20; k++) {
var t = k / 20, ang = -0.25 + t * (Math.PI + 0.5), a = DGX_FRONT + Math.cos(ang) * 0.75, y = H.eyeY + Math.sin(ang) * (H.ymax - H.eyeY + 0.03);
pts.push(dgxPt(H, R, a, Math.max(H.chinY - 0.02, y), 0.022));
}
G.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.012, 6, false), dgxMat("cloth", (typeof wshade === "function") ? wshade(col, 0.8) : col)));
},
function (H, G, o) {
var y = H.browY, sm = dgxMat(o.metal || "silver", o.c), R = dgxRmax(H, y, y);
G.add(dgxRim(H, R, y, 0.007, 0.0035, sm));
var p = dgxPt(H, R, DGX_FRONT, y + 0.04, 0.012);
var cr = dgxFlat(G, "crescent", o.glow ? dgxMat("glow", o.glow) : sm, p, new THREE.Vector3(0, 1, 0), dgxOut(DGX_FRONT), 0.085, 0.105);
if (o.disc)
dgxFlat(G, "disc", dgxMat("gold"), p.clone().add(new THREE.Vector3(0, 0.04, -0.004)), new THREE.Vector3(0, 1, 0), dgxOut(DGX_FRONT), 0.04, 0.04);
},
function (H, G, o) {
var y = H.browY + 0.004, gm = dgxMat("gold", o.c), R = dgxRmax(H, y, y + 0.03), n = o.n || 13;
G.add(dgxBand(H, y, 0.016, 0.008, gm, { R: R }));
G.add(dgxRim(H, R, y + 0.016, 0.009, 0.003, gm));
for (var i = 0; i < n; i++) {
var t = i / (n - 1), a = DGX_FRONT - Math.PI * 0.62 + Math.PI * 1.24 * t, len = (o.L || 0.075) * (0.7 + 0.3 * Math.cos((t - 0.5) * Math.PI)), p = dgxPt(H, R, a, y + 0.012, 0.01);
dgxFlat(G, "ray", gm, p, new THREE.Vector3(0, 1, 0).add(dgxOut(a).multiplyScalar(0.45)), dgxOut(a), len, 0.022);
}
if (o.disc) {
var d = dgxFlat(G, "disc", dgxMat("gold"), dgxPt(H, R, DGX_FRONT, y + 0.02, 0.016), new THREE.Vector3(0, 1, 0), dgxOut(DGX_FRONT), 0.032, 0.032);
}
},
function (H, G, o) {
var y = H.browY + (o.up || 0.004), gm = dgxMat(o.metal || "gold", o.c), R = dgxRmax(H, y, y + 0.02);
G.add(dgxBand(H, y, o.h || 0.012, 0.007, gm, { R: R }));
G.add(dgxRim(H, R, y, 0.008, 0.003, gm));
G.add(dgxRim(H, R, y + (o.h || 0.012), 0.008, 0.003, gm));
if (o.gem !== false)
dgxGem(G, o.gem || 0xC0302A, dgxPt(H, R, DGX_FRONT, y + (o.h || 0.012) / 2, 0.012), dgxOut(DGX_FRONT), 0.01);
if (o.boss)
for (var i = -1; i <= 1; i += 2)
dgxBall(G, gm, dgxPt(H, R, DGX_FRONT + i * 0.5, y + 0.006, 0.011), 0.008, 1, 1, 0.6);
},
function (H, G, o) {
var y = H.browY + 0.002, gm = dgxMat(o.metal || "gold", o.c), h = o.h || 0.03, R = dgxRmax(H, y, y + 0.04), n = o.n || 8;
G.add(dgxBand(H, y, h, 0.009, gm, { R: R, flare: 0.006 }));
G.add(dgxRim(H, R, y, 0.01, 0.0038, gm));
G.add(dgxRim(H, R, y + h, 0.016, 0.0035, gm));
for (var i = 0; i < n; i++) {
var a = DGX_FRONT + i / n * Math.PI * 2, p = dgxPt(H, R, a, y + h - 0.002, 0.015);
if (o.spikes) {
G.add(dgxTaper([p, p.clone().add(new THREE.Vector3(0, o.spikes, 0)).add(dgxOut(a).multiplyScalar(0.012))], 0.008, 0.0008, gm, 6));
}
else {
dgxFlat(G, i % 2 ? "ray" : "petal", gm, p, new THREE.Vector3(0, 1, 0).add(dgxOut(a).multiplyScalar(0.12)), dgxOut(a), i % 2 ? 0.03 : 0.04, 0.03);
dgxBall(G, dgxMat("pearl"), p.clone().add(new THREE.Vector3(0, i % 2 ? 0.032 : 0.044, 0)), 0.005);
}
dgxGem(G, o.gems ? o.gems[i % o.gems.length] : [0xC0202E, 0x2A5AD0, 0x2A9A5A][i % 3], dgxPt(H, R, a, y + h * 0.45, 0.014), dgxOut(a), 0.007);
}
if (o.cap !== false) {
var vel = [];
for (var k = 0; k <= 5; k++) {
(function (t) { vel.push(function (a) { return { r: (H.at(R, a) + 0.006) * Math.cos(t * Math.PI / 2 * 0.92), y: y + h * 0.8 + Math.sin(t * Math.PI / 2) * (H.ymax + 0.02 - y - h * 0.8) }; }); })(k / 5);
}
G.add(new THREE.Mesh(dgxLoft(H, vel, { apex: new THREE.Vector3(H.cx, H.ymax + 0.024, H.cz) }), dgxMat("cloth", o.cap || 0x7A1424)));
}
},
function (H, G, o) {
var bm = dgxMat("bronze", o.c != null ? o.c : 0x8E6430), y0 = H.browY - 0.01, gap = 0.016, apexY = H.ymax + 0.036;
G.add(dgxDome(H, y0, gap, 0.02, bm));
var R = dgxRmax(H, y0 - 0.06, y0 + 0.02), rs = [];
for (var i = 0; i <= 4; i++) {
(function (t) { rs.push(function (a) { var back = Math.max(0, -Math.sin(a)); return { r: H.at(R, a) + gap + 0.002 + 0.03 * t * t * back, y: y0 + 0.002 - (0.05 + 0.035 * back) * t }; }); })(i / 4);
}
var g = new THREE.Mesh(dgxLoft(H, rs, { a0: DGX_FRONT + 0.75, a1: DGX_FRONT + Math.PI * 2 - 0.75 }), bm);
G.add(g);
var fp = [];
for (var k = 0; k <= 3; k++) {
(function (t) { fp.push(function (a) { return { r: H.at(R, a) + gap + 0.006 + 0.02 * t, y: y0 + 0.01 + 0.03 * t }; }); })(k / 3);
}
G.add(new THREE.Mesh(dgxLoft(H, fp, { a0: DGX_FRONT - 0.9, a1: DGX_FRONT + 0.9, NA: 20 }), bm));
var cr = dgxMat("cloth", o.crest != null ? o.crest : 0xA8221E), Rz = dgxRmax(H, y0, y0 + 0.03), zf = H.at(Rz, DGX_FRONT) + gap, zb = H.at(Rz, DGX_BACK) + gap, sh = new THREE.Shape(), N = 18, bot = [], top = [];
for (var j = 0; j <= N; j++) {
var t = j / N, ang = t * Math.PI, z = Math.cos(ang) * (ang < Math.PI / 2 ? zf : zb), yy = y0 + (apexY - y0) * Math.sin(ang);
bot.push([z, yy]);
top.push([z - 0.012 * t, yy + 0.012 + 0.075 * Math.pow(Math.sin(ang), 0.6) + (t > 0.75 ? -0.08 * (t - 0.75) : 0)]);
}
sh.moveTo(bot[0][0], bot[0][1]);
bot.forEach(function (p) { sh.lineTo(p[0], p[1]); });
var tail = [bot[N][0] - 0.05, bot[N][1] - 0.11];
sh.lineTo(tail[0], tail[1]);
for (var j2 = N; j2 >= 0; j2--)
sh.lineTo(top[j2][0], top[j2][1]);
sh.lineTo(bot[0][0], bot[0][1]);
var eg = new THREE.ExtrudeGeometry(sh, { depth: 0.022, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.004, bevelSegments: 1, curveSegments: 4 });
eg.translate(0, 0, -0.011);
eg.rotateY(-Math.PI / 2);
eg.translate(H.cx, 0, H.cz);
G.add(new THREE.Mesh(eg, cr));
var hold = [];
bot.forEach(function (p) { hold.push(new THREE.Vector3(H.cx, p[1] + 0.004, H.cz + p[0])); });
G.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hold), 30, 0.008, 6, false), dgxMat("gold")));
},
function (H, G, o) {
var fm = dgxMat("cloth", o.c != null ? o.c : 0x8A6A3A), y0 = H.ymax - 0.06, R = dgxRmax(H, y0, y0 + 0.04);
G.add(dgxDome(H, y0, 0.012, 0.012, fm));
var br = [];
for (var i = 0; i <= 4; i++) {
(function (t) { br.push(function (a) { return { r: H.at(R, a) + 0.012 + 0.075 * t, y: y0 + 0.002 - 0.018 * t * t }; }); })(i / 4);
}
G.add(new THREE.Mesh(dgxLoft(H, br), fm));
G.add(dgxRim(H, R, y0 + 0.006, 0.014, 0.004, dgxMat("gold")));
[0, Math.PI].forEach(function (a) {
var base = dgxPt(H, R, a, y0 + 0.03, 0.014);
for (var f = 0; f < 4; f++) {
var dir = new THREE.Vector3(Math.cos(a) * 0.45, 1, 0).add(new THREE.Vector3(0, 0, -0.35 - f * 0.28)).normalize();
dgxFlat(G, "feather", dgxMat("feather", 0xF4F0E8), base.clone().add(new THREE.Vector3(0, 0, -f * 0.006)), dir, dgxOut(a), 0.085 - f * 0.012, 0.03);
}
});
},
function (H, G, o) {
var fm = dgxMat("cloth", o.c != null ? o.c : 0x5A4632), y0 = H.ymax - 0.075, R = dgxRmax(H, y0, y0 + 0.05), hh = 0.13, rs = [];
for (var i = 0; i <= 8; i++) {
(function (t) { rs.push(function (a) { return { r: (H.at(R, a) + 0.012) * (1 - Math.pow(t, 1.3) * 0.92), y: y0 + hh * t }; }); })(i / 8);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx, y0 + hh + 0.012, H.cz) }), fm));
G.add(dgxRim(H, R, y0 + 0.006, 0.014, 0.006, fm));
},
function (H, G, o) {
var fm = dgxMat("cloth", o.c != null ? o.c : 0xA8261E), y0 = H.browY - 0.012, R = dgxRmax(H, y0, y0 + 0.06), rs = [];
for (var i = 0; i <= 10; i++) {
(function (t) { var fw = Math.pow(t, 2.2) * 0.1; rs.push(function (a) { return { r: (H.at(R, a) + 0.014) * (1 - Math.pow(t, 1.6) * 0.8), y: y0 + 0.15 * Math.sin(t * Math.PI * 0.55), dz: fw }; }); })(i / 10);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx, y0 + 0.13, H.cz + 0.13) }), fm));
[-1, 1].forEach(function (sd) { var a = sd > 0 ? 0 : Math.PI; var p = dgxPt(H, R, a, y0 - 0.035, 0.016); var m = dgxBox(G, fm, p, 0.012, 0.07, 0.05); m.rotation.y = sd * 0.0; });
G.add(dgxRim(H, R, y0 + 0.004, 0.016, 0.005, dgxMat("gold")));
},
function (H, G, R, y, gap, s) {
s = s || 1;
var gm = dgxMat("gold"), b = dgxPt(H, R, DGX_FRONT, y, gap + 0.004), o = dgxOut(DGX_FRONT);
var pts = [b.clone().add(new THREE.Vector3(0, -0.004, -0.01)), b.clone().add(o.clone().multiplyScalar(0.012 * s)), b.clone().add(o.clone().multiplyScalar(0.016 * s)).add(new THREE.Vector3(0, 0.025 * s, 0)), b.clone().add(o.clone().multiplyScalar(0.012 * s)).add(new THREE.Vector3(0, 0.045 * s, 0))];
G.add(dgxTaper(pts, 0.007 * s, 0.005 * s, gm, 6));
dgxBall(G, gm, pts[3].clone().add(new THREE.Vector3(0, 0.008 * s, 0)), 0.012 * s, 1.1, 1.3, 0.45);
dgxBall(G, dgxMat("gem", 0x2A5AD0), pts[3].clone().add(o.clone().multiplyScalar(0.006 * s)), 0.004 * s);
},
function (H, G, o) {
var sm = dgxMat("stripes", o.stripes || "#2A4FA8/#D8B048"), y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.04);
G.add(dgxDome(H, y0, 0.014, 0.006, sm));
var rs = [], low = H.chinY - 0.08;
for (var i = 0; i <= 8; i++) {
(function (t) { var y = y0 - (y0 - low) * t; rs.push(function (a) { var side = Math.pow(Math.abs(Math.cos(a)), 0.7); return { r: H.at(R, a) + 0.016 + 0.05 * Math.sin(Math.min(1, t * 1.6) * Math.PI / 2) * side, y: y }; }); })(i / 8);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { a0: DGX_FRONT + 0.62, a1: DGX_FRONT + Math.PI * 2 - 0.62, NA: 36 }), sm));
[-1, 1].forEach(function (sd) { var a = DGX_FRONT + sd * 0.95, p = dgxPt(H, R, a, low + 0.02, 0.04); dgxBox(G, sm, p.clone().add(new THREE.Vector3(0, -0.06, 0.02)), 0.05, 0.14, 0.012, 0.1, sd * -0.4, 0); });
G.add(dgxRim(H, R, y0 + 0.004, 0.016, 0.005, dgxMat("gold")));
dgxUraeus(H, G, R, y0 + 0.008, 0.016);
},
function (H, G, y0, R, hh, col, gap) {
var rs = [];
for (var i = 0; i <= 10; i++) {
(function (t) {
var w = t < 0.12 ? 1 - 0.6 * t : t < 0.72 ? 0.928 - 0.5 * (t - 0.12) : 0.628 - 0.5 * Math.pow((t - 0.72) / 0.28, 1.5);
var bul = t > 0.7 ? 0.12 * Math.sin(Math.min(1, (t - 0.7) / 0.3) * Math.PI * 0.85) : 0;
rs.push(function (a) { return { r: (H.at(R, a) + gap) * Math.max(0.12, w + bul), y: y0 + hh * t }; });
})(i / 10);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx, y0 + hh + 0.008, H.cz) }), dgxMat("cloth", col)));
dgxBall(G, dgxMat("cloth", col), new THREE.Vector3(H.cx, y0 + hh + 0.004, H.cz), 0.022, 1, 0.8, 1);
},
function (H, G, o) {
var y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.05), fm = dgxMat("feather", 0xF2EEE6);
dgxHedjet(H, G, y0, R, 0.24, 0xF2EEE2, 0.012);
[-1, 1].forEach(function (sd) {
var a = sd > 0 ? 0 : Math.PI, base = dgxPt(H, R, a, y0 + 0.02, 0.006);
var f = dgxFlat(G, "plume", fm, base, new THREE.Vector3(sd * 0.1, 1, 0), new THREE.Vector3(0, 0, 1), 0.23, 0.036);
G.add(dgxTaper([base.clone().add(new THREE.Vector3(sd * 0.022, 0.2, 0)), base.clone().add(new THREE.Vector3(sd * 0.05, 0.215, 0)), base.clone().add(new THREE.Vector3(sd * 0.06, 0.195, 0))], 0.012, 0.006, fm, 6));
G.add(dgxTaper([dgxPt(H, R, a, y0 + 0.012, 0.0), dgxPt(H, R, a, y0 + 0.014, 0.04), dgxPt(H, R, a, y0 + 0.004, 0.075).add(new THREE.Vector3(0, 0, 0.01))], 0.009, 0.002, dgxMat("horn", 0xCCB890), 6));
});
G.add(dgxRim(H, R, y0 + 0.004, 0.014, 0.004, dgxMat("gold")));
dgxUraeus(H, G, R, y0 + 0.01, 0.014);
},
function (H, G, y0, R, col, inner) {
var rm = dgxMat("cloth", col), hh = 0.06;
G.add(dgxBand(H, y0, hh, 0.014, rm, { R: R, rows: 3, flare: 0.008 }));
var cap = [];
for (var k = 0; k <= 3; k++) {
(function (t) { cap.push(function (a) { return { r: (H.at(R, a) + 0.022) * (1 - t * (inner ? 0.45 : 1)), y: y0 + hh }; }); })(k / 3);
}
G.add(new THREE.Mesh(dgxLoft(H, cap), rm));
var bk = dgxPt(H, R, DGX_BACK, y0 + hh, 0.0);
dgxBox(G, rm, bk.clone().add(new THREE.Vector3(0, 0.07, 0.012)), 0.05, 0.15, 0.016);
var c0 = dgxPt(H, R, DGX_FRONT, y0 + hh, -0.01), cp = [c0];
for (var i = 1; i <= 12; i++) {
var t = i / 12;
cp.push(c0.clone().add(new THREE.Vector3(0, 0.05 * Math.sin(t * Math.PI * 0.6), 0.03 * t + 0.012 * Math.sin(t * Math.PI * 2))));
}
G.add(dgxTaper(cp, 0.004, 0.006, dgxMat("gold"), 5));
},
function (H, G, o) {
var yb = H.browY - 0.006, y0 = H.ymax + 0.012, R = dgxRmax(H, yb, Math.min(H.ymax, yb + 0.045)), gm = dgxMat("gold"), pm = dgxMat("stripes", "#C9A040/#2A6A8A");
G.add(dgxBand(H, yb, y0 - yb, 0.012, dgxMat("gold", 0xC09A40), { R: R, rows: 4, flare: 0.004 }));
G.add(dgxRim(H, R, yb + 0.003, 0.013, 0.004, gm));
G.add(dgxRim(H, R, y0, 0.016, 0.004, gm));
var cap = [];
for (var k = 0; k <= 3; k++) {
(function (t) { cap.push(function (a) { return { r: (H.at(R, a) + 0.016) * (1 - t), y: y0 }; }); })(k / 3);
}
G.add(new THREE.Mesh(dgxLoft(H, cap), gm));
dgxUraeus(H, G, R, yb + 0.008, 0.013);
[-1, 1].forEach(function (sd) { var p = new THREE.Vector3(H.cx + sd * 0.018, y0, H.cz); dgxFlat(G, "plume", pm, p, new THREE.Vector3(sd * 0.04, 1, 0), new THREE.Vector3(0, 0, 1), 0.26, 0.034); });
var rb = dgxPt(H, R, DGX_BACK, y0 - 0.02, 0.014);
dgxBox(G, dgxMat("cloth", 0xB0302A), rb.clone().add(new THREE.Vector3(0, -0.12, -0.01)), 0.02, 0.24, 0.004, 0.12, 0, 0);
},
function (H, G, o) {
var y0 = H.ymax - 0.035, R = dgxRmax(H, y0, y0 + 0.03), hm = dgxMat("horn", 0x2A2420);
if (o.vulture)
DGX_HW.vulture(H, G, {});
G.add(dgxBand(H, y0, 0.028, 0.006, dgxMat("gold"), { R: R, rows: 2 }));
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2, p = dgxPt(H, R, a, y0 + 0.028, 0.006);
dgxBall(G, dgxMat("gold"), p.clone().add(new THREE.Vector3(0, 0.008, 0)), 0.007, 1, 1.6, 0.6);
}
var base = new THREE.Vector3(H.cx, y0 + 0.03, H.cz);
[-1, 1].forEach(function (sd) { var pts = [base.clone().add(new THREE.Vector3(sd * 0.01, 0, 0)), base.clone().add(new THREE.Vector3(sd * 0.075, 0.035, 0)), base.clone().add(new THREE.Vector3(sd * 0.088, 0.1, 0)), base.clone().add(new THREE.Vector3(sd * 0.055, 0.16, 0))]; G.add(dgxTaper(pts, 0.011, 0.004, hm, 7)); });
var d = dgxFlat(G, "disc", dgxMat("gem", o.disc || 0xC8401E), base.clone().add(new THREE.Vector3(0, 0.085, -0.004)), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), 0.13, 0.13);
dgxUraeus(H, G, dgxRmax(H, H.browY, H.browY + 0.02), H.browY + 0.004, 0.012, 0.9);
},
function (H, G, o) {
var vm = dgxMat("gold", 0xC9A040), y0 = H.browY - 0.004, R = dgxRmax(H, y0 - 0.05, y0 + 0.04);
G.add(dgxDome(H, y0, 0.013, 0.006, dgxMat("stripes", "#C9A040/#2A5A9A")));
[-1, 1].forEach(function (sd) {
var rs = [];
for (var i = 0; i <= 5; i++) {
(function (t) { var y = y0 + 0.01 - 0.075 * t, Ry = dgxRmax(H, y, y0 + 0.01); rs.push(function (a) { return { r: H.at(Ry, a) + 0.012, y: y - 0.02 * Math.max(0, -Math.sin(a)) * t }; }); })(i / 5);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { a0: sd > 0 ? DGX_FRONT - 0.55 : DGX_FRONT + 0.55, a1: sd > 0 ? DGX_FRONT - 2.4 : DGX_FRONT + 2.4, NA: 16 }), dgxMat("stripes", "#2A5A9A/#C9A040")));
});
var hp = dgxPt(H, R, DGX_FRONT, y0 + 0.01, 0.018);
dgxBall(G, vm, hp, 0.012, 0.8, 1, 1.2);
},
function (H, G, o) {
var wm = dgxMat("stripes", o.stripes || "#141214/#2A2420"), y0 = H.ymax + 0.006, low = H.chinY - 0.14, R = dgxRmax(H, H.eyeY, H.ymax), rs = [];
G.add(dgxDome(H, H.browY - 0.004, 0.01, 0.004, wm));
for (var i = 0; i <= 8; i++) {
(function (t) { var y = H.browY - (H.browY - low) * t; rs.push(function (a) { var side = Math.abs(Math.cos(a)); return { r: H.at(R, a) + 0.012 + 0.03 * side * Math.min(1, t * 2), y: y }; }); })(i / 8);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { a0: DGX_FRONT + 0.5, a1: DGX_FRONT + Math.PI * 2 - 0.5, NA: 36 }), wm));
G.add(dgxRim(H, R, H.browY + 0.004, 0.014, 0.004, dgxMat("gold")));
},
function (H, G, o) {
var im = dgxMat(o.metal || "iron", o.c), y0 = H.browY - 0.006, R = dgxRmax(H, y0, y0 + 0.04);
G.add(dgxDome(H, y0, 0.016, 0.03, im, { shape: function (r, a, t) { return r * (1 - 0.04 * t); } }));
G.add(dgxRim(H, R, y0 + 0.004, 0.018, 0.006, dgxMat("bronze")));
for (var q = 0; q < 4; q++) {
var a = q * Math.PI / 2 + Math.PI / 4, pts = [];
for (var k = 0; k <= 8; k++) {
var t = k / 8, ang = t * Math.PI / 2, y = y0 + (H.ymax + 0.046 - y0) * Math.sin(ang);
pts.push(dgxPt(H, R, a, y, 0.019).sub(new THREE.Vector3(H.cx, 0, H.cz)).multiplyScalar(Math.cos(ang) * 0.98 + 0.02).add(new THREE.Vector3(H.cx, 0, H.cz)).setY(y));
}
G.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.005, 5, false), dgxMat("bronze")));
}
dgxBall(G, dgxMat("bronze"), new THREE.Vector3(H.cx, H.ymax + 0.048, H.cz), 0.009);
var ez = H.eyeZ + 0.012, eyy = H.eyeY + 0.004;
[-1, 1].forEach(function (sd) { var ring = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.005, 6, 18, Math.PI * 1.25), im); ring.position.set(H.cx + sd * 0.034, eyy, ez); ring.rotation.z = Math.PI * -0.125; G.add(ring); });
dgxBox(G, im, new THREE.Vector3(H.cx, eyy - 0.004, ez + 0.004), 0.012, 0.06, 0.006);
if (o.gold)
G.add(dgxRim(H, R, y0 + 0.015, 0.02, 0.004, dgxMat("gold")));
},
function (H, G, o) {
var fm = dgxMat("cloth", o.c != null ? o.c : 0x5E6064), y0 = H.ymax - 0.075, R = dgxRmax(H, y0, y0 + 0.05), rs = [];
for (var i = 0; i <= 6; i++) {
(function (t) { rs.push(function (a) { return { r: (H.at(R, a) + 0.014) * (1 - 0.12 * t * t), y: y0 + 0.1 * t - 0.012 * t * Math.max(0, Math.cos(a - DGX_FRONT)) }; }); })(i / 6);
}
rs.push(function (a) { return { r: (H.at(R, a) + 0.014) * 0.5, y: y0 + 0.098 }; });
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx, y0 + 0.096, H.cz) }), fm));
var br = [];
for (var j = 0; j <= 4; j++) {
(function (t) { br.push(function (a) { var fr = Math.max(0, Math.cos(a - DGX_FRONT)); return { r: H.at(R, a) + 0.014 + 0.11 * t, y: y0 + 0.004 - 0.03 * t * t * (0.4 + fr) }; }); })(j / 4);
}
G.add(new THREE.Mesh(dgxLoft(H, br), fm));
G.add(dgxRim(H, R, y0 + 0.012, 0.016, 0.006, dgxMat("cloth", 0x2A2622)));
},
function (H, G, o) {
var am = dgxMat("horn", o.c != null ? o.c : 0x6A5A44), y = H.ymax - 0.035, R = dgxRmax(H, y, y + 0.03);
[-1, 1].forEach(function (sd) {
var a = sd > 0 ? DGX_FRONT - 1.1 : DGX_FRONT + 1.1, b = dgxPt(H, R, a, y, -0.004), o2 = dgxOut(a);
var main = [b, b.clone().add(o2.clone().multiplyScalar(0.05)).add(new THREE.Vector3(0, 0.06, 0)), b.clone().add(o2.clone().multiplyScalar(0.11)).add(new THREE.Vector3(0, 0.15, -0.03)), b.clone().add(o2.clone().multiplyScalar(0.13)).add(new THREE.Vector3(0, 0.26, -0.02))];
G.add(dgxTaper(main, 0.012, 0.004, am, 7));
var c = new THREE.CatmullRomCurve3(main);
[0.3, 0.55, 0.8].forEach(function (t, i) { var p = c.getPointAt(t); G.add(dgxTaper([p, p.clone().add(new THREE.Vector3(0, 0.05, 0.03 - i * 0.012)).add(o2.clone().multiplyScalar(-0.012 + i * 0.01))], 0.006, 0.002, am, 5)); });
});
},
function (H, G, o) {
var hm = dgxMat("horn", o.c != null ? o.c : 0x2A2420), y = H.ymax - 0.05, R = dgxRmax(H, y, y + 0.03), kind = o.kind || "goat";
[-1, 1].forEach(function (sd) {
var a = sd > 0 ? DGX_FRONT - 0.75 : DGX_FRONT + 0.75, b = dgxPt(H, R, a, y, -0.006), ox = new THREE.Vector3(sd, 0, 0), pts;
if (kind === "ram")
pts = [b, b.clone().add(new THREE.Vector3(sd * 0.04, 0.03, -0.03)), b.clone().add(new THREE.Vector3(sd * 0.075, -0.01, -0.05)), b.clone().add(new THREE.Vector3(sd * 0.07, -0.06, -0.01)), b.clone().add(new THREE.Vector3(sd * 0.05, -0.05, 0.03))];
else if (kind === "bull")
pts = [b, b.clone().add(new THREE.Vector3(sd * 0.07, 0.02, 0)), b.clone().add(new THREE.Vector3(sd * 0.13, 0.06, 0.01)), b.clone().add(new THREE.Vector3(sd * 0.14, 0.12, 0.03))];
else
pts = [b, b.clone().add(new THREE.Vector3(sd * 0.02, 0.05, -0.02)), b.clone().add(new THREE.Vector3(sd * 0.04, 0.1, -0.06)), b.clone().add(new THREE.Vector3(sd * 0.035, 0.14, -0.11))];
G.add(dgxTaper(pts, kind === "ram" ? 0.016 : 0.013, 0.003, hm, 7));
});
},
function (H, G, o) {
var p = new THREE.Vector3(H.cx, H.ymax + 0.07, H.cz - 0.01);
dgxFlat(G, "disc", dgxMat("gem", o.c || 0xD8401E), p, new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), 0.14, 0.14);
var cob = [];
for (var i = 0; i <= 16; i++) {
var a = Math.PI * 1.05 + i / 16 * Math.PI * 0.9;
cob.push(new THREE.Vector3(H.cx + Math.cos(a) * 0.074, p.y + Math.sin(a) * 0.074, p.z + 0.012));
}
G.add(dgxTaper(cob, 0.006, 0.008, dgxMat("gold"), 6));
dgxBall(G, dgxMat("gold"), cob[16].clone().add(new THREE.Vector3(0, 0.012, 0.004)), 0.011, 1, 1.3, 0.5);
dgxAdd(G, new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.03, 12), dgxMat("gold"))).position.set(H.cx, H.ymax + 0.006, H.cz);
},
function (H, G, o) {
var p = new THREE.Vector3(H.cx, H.ymax + 0.05, H.cz);
dgxFlat(G, "crescent", dgxMat("silver"), p.clone().add(new THREE.Vector3(0, -0.035, 0)), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), 0.11, 0.14);
dgxFlat(G, "disc", dgxMat("silver", 0xE8ECF4), p.clone().add(new THREE.Vector3(0, 0.0, -0.004)), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), 0.1, 0.1);
},
function (H, G, o) {
var y = H.ymax + 0.012, gm = dgxMat("gold"), bm = dgxMat("gem", 0x2A4AA0);
dgxBox(G, bm, new THREE.Vector3(H.cx, y + 0.03, H.cz), 0.07, 0.06, 0.03);
dgxBox(G, gm, new THREE.Vector3(H.cx, y + 0.022, H.cz + 0.016), 0.03, 0.04, 0.004);
var bk = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), gm);
bk.scale.set(1, 0.6, 0.5);
bk.position.set(H.cx, y + 0.09, H.cz);
G.add(bk);
dgxAdd(G, new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.006, 16), gm)).position.set(H.cx, y + 0.09, H.cz);
},
function (H, G, o) {
var y = H.ymax - 0.01, p = new THREE.Vector3(H.cx, y + 0.02, H.cz - 0.02), pm = dgxMat("stripes", "#C9A040/#2A6A8A");
[-1, 1].forEach(function (sd) {
dgxFlat(G, "plume", pm, p.clone().add(new THREE.Vector3(sd * 0.02, 0, 0)), new THREE.Vector3(sd * 0.05, 1, 0), new THREE.Vector3(0, 0, 1), 0.22, 0.03);
G.add(dgxTaper([p.clone(), p.clone().add(new THREE.Vector3(sd * 0.06, 0.01, 0)), p.clone().add(new THREE.Vector3(sd * 0.1, -0.01, 0.01))], 0.01, 0.003, dgxMat("horn", 0xCCB890), 6));
});
dgxFlat(G, "disc", dgxMat("gem", 0xD8401E), p.clone().add(new THREE.Vector3(0, 0.05, 0.01)), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), 0.07, 0.07);
},
function (H, G, o) {
var y = H.browY + 0.006, R = dgxRmax(H, y, y + 0.02);
G.add(dgxBand(H, y, 0.016, 0.016, dgxMat("gem", 0x1A2A6A), { R: R, rows: 1 }));
for (var i = 0; i < 11; i++) {
var a = DGX_FRONT + (i - 5) * 0.26, p = dgxPt(H, R, a, y + 0.008, 0.02);
var s = new THREE.Mesh(DGX.star || (DGX.star = new THREE.OctahedronGeometry(0.008, 0)), dgxMat("gold", 0xF0D070));
s.position.copy(p);
s.scale.set(1, 1, 0.4);
s.lookAt(p.clone().add(dgxOut(a)));
G.add(s);
}
},
function (H, G, o) {
var y = H.browY + 0.016, R = dgxRmax(H, y - 0.01, y + 0.02), cols = o.cols || [0xE8607A, 0xF0D060, 0xF8F4F0], n = o.n || 14;
G.add(dgxRim(H, R, y, 0.008, 0.005, dgxMat("leaf", 0x3E7A34)));
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + 0.1, p = dgxPt(H, R, a, y + 0.004, 0.014), nn = dgxOut(a).add(new THREE.Vector3(0, 0.6, 0)).normalize(), pm = dgxMat("leaf", cols[i % cols.length]);
for (var q = 0; q < 5; q++) {
var pa = q / 5 * Math.PI * 2;
var dir = new THREE.Vector3(Math.cos(pa), Math.sin(pa), 0);
var fg = new THREE.Group();
fg.position.copy(p);
fg.lookAt(p.clone().add(nn));
G.add(fg);
dgxFlat(fg, "petal", pm, new THREE.Vector3(0, 0, 0.002), dir, new THREE.Vector3(0, 0, 1), 0.018, 0.014);
}
dgxBall(G, dgxMat("gold", 0xE8B020), p.clone().add(nn.clone().multiplyScalar(0.004)), 0.005);
dgxFlat(G, "leaf", dgxMat("leaf", 0x3E7A34), dgxPt(H, R, a + Math.PI / n, y, 0.012), new THREE.Vector3(-Math.sin(a), 0.2, Math.cos(a)), dgxOut(a), 0.026, 0.014);
}
},
function (H, G, o) {
var cols = (o.cols || ["#F4F2EC", "#C0302A"]).join("/"), bm = dgxMat("beads", cols), y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.04), hh = o.short ? 0.13 : 0.2, rs = [];
for (var i = 0; i <= 8; i++) {
(function (t) { rs.push(function (a) { return { r: (H.at(R, a) + 0.014) * (1 - 0.62 * Math.pow(t, 1.2)) + 0.004 * Math.sin(t * Math.PI), y: y0 + hh * t }; }); })(i / 8);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx, y0 + hh + 0.006, H.cz), u: 6, v: 3 }), bm));
G.add(dgxRim(H, R, y0 + 0.002, 0.016, 0.006, dgxMat("beads", cols)));
dgxBall(G, dgxMat("beads", (o.cols || ["#F4F2EC"])[0] + "/#1A1A1A"), dgxPt(H, R, DGX_FRONT, y0 + hh * 0.35, 0.018), 0.016, 1, 1.2, 0.4);
var bc = dgxMat("beads", dgxHex(o.bird != null ? o.bird : 0xF4F2EC) + "/#C0302A"), tp = new THREE.Vector3(H.cx, y0 + hh + 0.01, H.cz);
dgxBall(G, bc, tp.clone().add(new THREE.Vector3(0, 0.016, 0)), 0.016, 0.8, 0.8, 1.3);
dgxBall(G, bc, tp.clone().add(new THREE.Vector3(0, 0.03, 0.018)), 0.009);
G.add(dgxTaper([tp.clone().add(new THREE.Vector3(0, 0.03, 0.026)), tp.clone().add(new THREE.Vector3(0, 0.028, 0.038))], 0.003, 0.0005, dgxMat("gold"), 4));
var sm = dgxMat("beads", cols), lo = o.short ? H.eyeY - 0.01 : H.chinY - 0.02;
for (var k = 0; k < 15; k++) {
var a = DGX_FRONT + (k - 7) * 0.11, p0 = dgxPt(H, R, a, y0 + 0.002, 0.018), p1 = dgxPt(H, dgxRmax(H, lo, y0), a, lo, 0.026);
G.add(dgxTaper([p0, p0.clone().lerp(p1, 0.5).add(dgxOut(a).multiplyScalar(0.006)), p1], 0.0028, 0.0028, sm, 4));
dgxBall(G, dgxMat("gem", 0xC0302A), p1, 0.0045);
}
},
function (H, G, o) {
var y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.04), rm = dgxMat("cloth", 0xA8221E), km = dgxMat("cloth", 0x1A1A1E);
G.add(dgxDome(H, y0, 0.012, 0.012, rm, { a0: DGX_FRONT - Math.PI, a1: DGX_FRONT }));
G.add(dgxDome(H, y0, 0.0125, 0.012, km, { a0: DGX_FRONT, a1: DGX_FRONT + Math.PI }));
var b = new THREE.Vector3(H.cx, H.ymax + 0.01, H.cz - 0.02), pts = [b, b.clone().add(new THREE.Vector3(0, 0.05, -0.04)), b.clone().add(new THREE.Vector3(0, 0.06, -0.11)), b.clone().add(new THREE.Vector3(0, 0.01, -0.16))];
G.add(dgxTaper(pts, 0.03, 0.006, rm, 10));
for (var i = 0; i < 9; i++) {
var a = DGX_FRONT + (i - 4) * 0.3;
dgxBall(G, dgxMat("pearl", 0xF4EEDC), dgxPt(H, R, a, y0 + 0.008, 0.016), 0.007, 1, 0.7, 0.5);
}
},
function (H, G, o) {
var y = H.browY + 0.006, R = dgxRmax(H, y, y + 0.02), pm = dgxMat("straw", 0xB8C060);
G.add(dgxRim(H, R, y, 0.01, 0.007, dgxMat("cloth", 0x2E6A3A)));
for (var i = 0; i < 34; i++) {
var a = i / 34 * Math.PI * 2;
if (Math.abs(Math.cos(a - DGX_FRONT) - 1) < 0.08)
continue;
var p = dgxPt(H, R, a, y, 0.012);
dgxFlat(G, "plume", pm, p, new THREE.Vector3(0, -1, 0).add(dgxOut(a).multiplyScalar(0.35)), dgxOut(a), 0.07 + 0.02 * Math.sin(i * 1.7), 0.008);
}
},
function (H, G, o) {
var cm = dgxMat("cloth", o.c != null ? o.c : 0xF4F2EC), y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.04), rs = [];
for (var i = 0; i <= 8; i++) {
(function (t) { rs.push(function (a) { var lean = Math.max(0, Math.cos(a)) * 0.04 * t; return { r: (H.at(R, a) + 0.012) * (1 - 0.15 * t) + lean * 0.3, y: y0 + (H.ymax - y0 + 0.05) * t - 0.02 * t * t * Math.max(0, -Math.cos(a)), dx: 0.035 * t * t }; }); })(i / 8);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx + 0.04, H.ymax + 0.04, H.cz) }), cm));
if (o.c2 != null)
G.add(dgxRim(H, R, y0 + 0.01, 0.014, 0.007, dgxMat("cloth", o.c2)));
if (o.horn) {
var p = dgxPt(H, R, 0, y0 + 0.03, 0.014);
G.add(dgxTaper([p, p.clone().add(new THREE.Vector3(0.02, 0.04, 0)), p.clone().add(new THREE.Vector3(0.015, 0.07, -0.01))], 0.009, 0.002, dgxMat("horn", 0xE8DCC0), 6));
}
},
function (H, G, o) {
var sm = dgxMat("straw"), y0 = H.ymax + 0.03, low = H.chinY - 0.2, rs = [];
for (var i = 0; i <= 10; i++) {
(function (t) { var y = y0 - (y0 - low) * t, Ry = H.ring(Math.max(H.ymin + 0.01, Math.min(H.ymax - 0.005, y))); rs.push(function (a) { return { r: (y > H.ymin ? H.at(Ry, a) : 0.08) * Math.min(1, 0.4 + t * 3) + 0.02 + 0.1 * Math.pow(t, 1.4) + 0.004 * Math.sin(a * 30), y: y }; }); })(i / 10);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx, y0 + 0.03, H.cz), NA: 60, u: 12 }), sm));
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2, R = dgxRmax(H, H.eyeY, H.eyeY + 0.01), p = dgxPt(H, R, a, H.eyeY + 0.01, 0.06);
dgxBall(G, dgxMat("pearl", 0xF4EEDC), p, 0.008, 1, 0.7, 0.5);
}
},
function (H, G, o) {
var cm = dgxMat("cloth", o.c != null ? o.c : 0x2A6A9A), y0 = H.browY - 0.01, R = dgxRmax(H, y0, H.ymax);
G.add(dgxDome(H, y0, 0.014, 0.03, cm, { shape: function (r, a, t) { return r + 0.02 * t * Math.max(0, -Math.sin(a)) + 0.004 * Math.sin(a * 8) * t; } }));
for (var i = 0; i < 7; i++) {
var a = DGX_BACK + (i - 3) * 0.32, p = dgxPt(H, R, a, H.ymax - 0.02, 0.0);
var fan = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), cm);
fan.scale.set(0.35, 1.3, 1);
fan.position.copy(p).add(new THREE.Vector3(0, 0.02, 0));
fan.rotation.set(-0.4, -a + Math.PI / 2, 0);
G.add(fan);
}
if (o.c2 != null)
G.add(dgxRim(H, R, y0 + 0.01, 0.016, 0.006, dgxMat("gold", o.c2)));
},
function (H, G, o) {
var y = H.browY - 0.004, gm = dgxMat("gold", o.c), R = dgxRmax(H, y, H.ymax);
G.add(dgxDome(H, y, 0.012, 0.012, dgxMat("cloth", 0x1A1A1E)));
G.add(dgxBand(H, y, 0.035, 0.016, gm, { R: R, rows: 2 }));
for (var i = 0; i < 8; i++) {
var a = DGX_FRONT + i / 8 * Math.PI * 2, p = dgxPt(H, R, a, y + 0.018, 0.022);
var pl = dgxFlat(G, "disc", gm, p, new THREE.Vector3(0, 1, 0), dgxOut(a), 0.032, 0.032);
}
dgxBall(G, gm, dgxPt(H, R, DGX_FRONT, y + 0.05, 0.012), 0.016, 1, 1, 0.5);
},
function (H, G, o) {
var sm = dgxMat("straw", o.c), y0 = H.ymax - 0.065, R = dgxRmax(H, y0, y0 + 0.05), rs = [];
for (var i = 0; i <= 5; i++) {
(function (t) { rs.push(function (a) { return { r: (H.at(R, a) + 0.012) * (1 - 0.1 * t), y: y0 + 0.09 * t }; }); })(i / 5);
}
G.add(new THREE.Mesh(dgxLoft(H, rs), sm));
dgxCapTop(H, G, R, y0 + 0.09, 0.011, sm);
var br = [];
for (var j = 0; j <= 4; j++) {
(function (t) { br.push(function (a) { return { r: H.at(R, a) + 0.012 + 0.09 * t, y: y0 + 0.002 - 0.012 * t * t }; }); })(j / 4);
}
G.add(new THREE.Mesh(dgxLoft(H, br, { u: 8 }), sm));
G.add(dgxRim(H, R, y0 + 0.012, 0.014, 0.006, dgxMat("cloth", 0x2A2420)));
},
function (H, G, o) {
var fm = dgxMat("lacquer", 0x141418), y0 = H.ymax - 0.06, R = dgxRmax(H, y0, y0 + 0.05), rs = [];
for (var i = 0; i <= 5; i++) {
(function (t) { rs.push(function (a) { return { r: (H.at(R, a) + 0.01) * (1 + 0.07 * t), y: y0 + 0.2 * t }; }); })(i / 5);
}
G.add(new THREE.Mesh(dgxLoft(H, rs), fm));
dgxCapTop(H, G, R.map(function (r) { return r * 1.07; }), y0 + 0.2, 0.011, fm);
var br = [];
for (var j = 0; j <= 3; j++) {
(function (t) { br.push(function (a) { return { r: H.at(R, a) + 0.01 + 0.055 * t, y: y0 + 0.022 * t * t * Math.pow(Math.cos(a), 2) }; }); })(j / 3);
}
G.add(new THREE.Mesh(dgxLoft(H, br), fm));
G.add(dgxBand(H, y0 + 0.01, 0.03, 0.012, dgxMat("cloth", 0x5A2A6A), { R: R, rows: 1 }));
},
function (H, G, o) {
var cm = dgxMat("cloth", o.c != null ? o.c : 0xC0201E), y0 = H.browY - 0.008;
G.add(dgxDome(H, y0, 0.012, 0.02, cm, { shape: function (r, a, t) { return r + 0.003 * Math.sin(a * 7 + t * 4); } }));
var R = dgxRmax(H, y0, y0 + 0.03);
G.add(dgxRim(H, R, y0 + 0.006, 0.014, 0.008, cm));
var kp = dgxPt(H, R, o.knot ? DGX_FRONT : DGX_BACK, o.knot ? H.ymax - 0.02 : y0 + 0.02, 0.016);
dgxBall(G, cm, kp, 0.022, 1.2, 0.9, 0.8);
if (!o.knot)
[-1, 1].forEach(function (sd) { dgxBox(G, cm, kp.clone().add(new THREE.Vector3(sd * 0.012, -0.05, -0.01)), 0.03, 0.08, 0.005, 0.2, 0, sd * 0.2); });
},
function (H, G, o) {
var lm = dgxMat("lacquer", 0x141416), y0 = H.browY - 0.004, R = dgxRmax(H, y0, H.ymax);
G.add(dgxDome(H, y0, 0.012, 0.02, lm));
var top = H.ymax + 0.05, bw = 0.14, bl = 0.26, bc = new THREE.Vector3(H.cx, top, H.cz);
dgxBox(G, dgxMat("lacquer", o.c != null ? o.c : 0x141416), bc, bw, 0.012, bl, 0.06, 0, 0);
dgxBox(G, dgxMat("cloth", 0x8A1A1A), bc.clone().add(new THREE.Vector3(0, -0.007, 0)), bw - 0.01, 0.003, bl - 0.01, 0.06, 0, 0);
dgxBox(G, dgxMat("gold"), new THREE.Vector3(H.cx, (top + H.ymax) / 2, H.cz), 0.03, top - H.ymax, 0.06);
var cols = [0xE8E4DA, 0x2A8A5A, 0xC0302A, 0x2A5AD0, 0xE0B030];
[1, -1].forEach(function (fb) {
var zEdge = bl / 2 * fb, yEdge = top - 0.06 * bl / 2 * fb;
for (var s = 0; s < 11; s++) {
var x = H.cx + (s - 5) * bw / 10.5, z = H.cz + zEdge, n = fb > 0 ? 6 : 5;
for (var b = 0; b < n; b++)
dgxBall(G, dgxMat("gem", cols[(s + b) % cols.length]), new THREE.Vector3(x, yEdge - 0.012 - b * 0.014, z), 0.005);
}
});
dgxBox(G, dgxMat("gold"), new THREE.Vector3(H.cx, H.ymax - 0.02, H.cz), 0.28, 0.006, 0.006);
},
function (H, G, o) {
var gm = dgxMat("gold"), y = H.ymax - 0.01;
dgxBall(G, dgxMat("cloth", 0x1A1612), new THREE.Vector3(H.cx, H.ymax + 0.02, H.cz - 0.01), 0.05, 1, 0.8, 1);
dgxBox(G, gm, new THREE.Vector3(H.cx, y + 0.01, H.cz), 0.32, 0.012, 0.012);
[-1, 1].forEach(function (sd) {
var p = new THREE.Vector3(H.cx + sd * 0.16, y + 0.01, H.cz);
dgxFlat(G, "disc", gm, p, new THREE.Vector3(0, 1, 0), new THREE.Vector3(sd, 0, 0), 0.06, 0.06);
dgxFlat(G, "disc", dgxMat("gem", 0x2A8A5A), p.clone().add(new THREE.Vector3(sd * 0.004, 0, 0)), new THREE.Vector3(0, 1, 0), new THREE.Vector3(sd, 0, 0), 0.03, 0.03);
});
DGX_HW.fengguan(H, G, { small: 1, noPhoenix: 1 });
},
function (H, G, o) {
var gm = dgxMat(o.c != null ? "lacquer" : "gold", o.c), tp = new THREE.Vector3(H.cx, H.ymax - 0.005, H.cz - 0.01);
dgxBall(G, dgxMat("cloth", 0x1A1612), tp, 0.032, 1, 0.8, 1);
dgxAdd(G, new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.026, 0.04, 10, 1, true), gm)).position.copy(tp.clone().add(new THREE.Vector3(0, 0.02, 0)));
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2;
dgxFlat(G, "petal", gm, tp.clone().add(new THREE.Vector3(Math.cos(a) * 0.028, 0.035, Math.sin(a) * 0.028)), new THREE.Vector3(Math.cos(a) * 0.3, 1, Math.sin(a) * 0.3), dgxOut(a), 0.03, 0.026);
}
dgxBox(G, dgxMat("gold"), tp.clone().add(new THREE.Vector3(0, 0.025, 0)), 0.14, 0.006, 0.006);
},
function (H, G, o) {
var im = dgxMat("iron", 0x4A4E54), y0 = H.browY - 0.012, R = dgxRmax(H, y0 - 0.05, H.ymax);
G.add(dgxDome(H, y0, 0.016, 0.035, im, { shape: function (r, a, t) { return r * (1 - 0.08 * t * t); } }));
var rs = [];
for (var i = 0; i <= 3; i++) {
(function (t) { rs.push(function (a) { return { r: H.at(R, a) + 0.018 + 0.03 * t, y: y0 - 0.075 * t }; }); })(i / 3);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { a0: DGX_FRONT + 0.9, a1: DGX_FRONT + Math.PI * 2 - 0.9 }), dgxMat("cloth", 0x8A1A1A)));
G.add(dgxRim(H, R, y0 + 0.004, 0.02, 0.006, dgxMat("gold")));
var tp = new THREE.Vector3(H.cx, H.ymax + 0.05, H.cz);
G.add(dgxTaper([tp, tp.clone().add(new THREE.Vector3(0, 0.06, 0))], 0.006, 0.002, dgxMat("gold"), 6));
for (var k = 0; k < 10; k++) {
var a = k / 10 * Math.PI * 2;
dgxFlat(G, "plume", dgxMat("cloth", 0xC0201E), tp.clone().add(new THREE.Vector3(0, 0.04, 0)), new THREE.Vector3(Math.cos(a) * 0.6, -0.5, Math.sin(a) * 0.6), dgxOut(a), 0.06, 0.014);
}
},
function (H, G, o) {
var gm = dgxMat("gold"), y = H.browY + 0.004, R = dgxRmax(H, y, H.ymax), s = o.small ? 0.75 : 1;
if (!o.noPhoenix)
G.add(dgxDome(H, y, 0.012, 0.02, dgxMat("cloth", 0x1A1612)));
G.add(dgxBand(H, y, 0.03 * s, 0.014, gm, { R: R, rows: 2 }));
for (var i = 0; i < 9; i++) {
var a = DGX_FRONT + (i - 4) * 0.34, p = dgxPt(H, R, a, y + 0.03 * s, 0.018);
for (var q = 0; q < 5; q++) {
var pa = q / 5 * Math.PI * 2;
dgxFlat(G, "petal", i % 2 ? gm : dgxMat("gem", 0x2A7AC8), p, new THREE.Vector3(Math.cos(pa) * 0.6, 1, Math.sin(pa) * 0.6).normalize(), dgxOut(a), 0.026 * s, 0.02 * s);
}
dgxBall(G, dgxMat("pearl"), p.clone().add(new THREE.Vector3(0, 0.006, 0)), 0.006);
}
if (!o.noPhoenix)
[-1, 1].forEach(function (sd) {
var a = DGX_FRONT + sd * 0.9, p = dgxPt(H, R, a, y + 0.05 * s, 0.02);
dgxBall(G, gm, p, 0.012, 1, 0.8, 1.6);
dgxFlat(G, "feather", gm, p, new THREE.Vector3(sd * 0.4, 0.5, -1), dgxOut(a), 0.08 * s, 0.04 * s);
var tp = dgxPt(H, R, a + sd * 0.4, y, 0.02);
for (var b = 0; b < 6; b++)
dgxBall(G, dgxMat("pearl"), tp.clone().add(new THREE.Vector3(0, -0.012 * b, 0)), 0.0045);
});
},
function (H, G, o) {
var gm = dgxMat("gold"), tp = new THREE.Vector3(H.cx, H.ymax + 0.02, H.cz - 0.005);
DGX_HW.veil(H, G, { c: 0xF8F6F0, open: 0.66, drop: 0.2, from: H.ymax + 0.02 });
G.add(dgxDome(H, H.browY - 0.01, 0.018, 0.05, dgxMat("cloth", 0xF8F6F0)));
var R = dgxRmax(H, H.browY, H.browY + 0.02);
for (var i = 0; i < 5; i++) {
var a = DGX_FRONT + (i - 2) * 0.35, p = dgxPt(H, R, a, H.browY + 0.02, 0.024);
dgxFlat(G, "petal", gm, p, new THREE.Vector3(0, 1, 0).add(dgxOut(a).multiplyScalar(0.2)), dgxOut(a), 0.05, 0.035);
}
var sp = dgxPt(H, R, DGX_FRONT, H.browY + 0.045, 0.03);
dgxBall(G, gm, sp, 0.008);
dgxBall(G, gm, sp.clone().add(new THREE.Vector3(0, -0.014, 0)), 0.011, 1.2, 0.9, 0.7);
},
function (H, G, o) {
var cm = dgxMat("cloth", 0x2E7A4A), y0 = H.browY - 0.012;
G.add(dgxDome(H, y0, 0.014, 0.03, cm));
var R = dgxRmax(H, y0, y0 + 0.03);
G.add(dgxRim(H, R, y0 + 0.006, 0.016, 0.007, dgxMat("gold")));
dgxBall(G, dgxMat("gem", 0xC0302A), dgxPt(H, R, DGX_FRONT, y0 + 0.02, 0.02), 0.01, 1, 1, 0.5);
[-1, 1].forEach(function (sd) { dgxBox(G, cm, dgxPt(H, R, DGX_BACK + sd * 0.35, y0 - 0.03, 0.018), 0.03, 0.11, 0.006, 0.15, 0, sd * 0.1); });
},
function (H, G, o) {
var lm = dgxMat("lacquer", 0x141416), y0 = H.browY - 0.004, R = dgxRmax(H, y0, H.ymax);
G.add(dgxDome(H, y0, 0.012, 0.012, lm));
var bp = new THREE.Vector3(H.cx, H.ymax - 0.01, H.cz - 0.04);
dgxBall(G, lm, bp, 0.05, 1.1, 0.9, 0.8);
if (o.wings)
[-1, 1].forEach(function (sd) { dgxBox(G, lm, new THREE.Vector3(H.cx + sd * 0.17, H.ymax - 0.02, H.cz - 0.06), 0.24, 0.008, 0.024); });
},
function (H, G, o) {
var hm = dgxMat("cloth", 0x1A1612);
[-1, 1].forEach(function (sd) {
var p = new THREE.Vector3(H.cx + sd * 0.05, H.ymax - 0.005, H.cz - 0.005);
dgxBall(G, hm, p, 0.035, 1, 0.9, 1);
G.add(dgxTaper([p.clone().add(new THREE.Vector3(sd * 0.02, -0.01, -0.02)), p.clone().add(new THREE.Vector3(sd * 0.05, -0.06, -0.03))], 0.006, 0.004, dgxMat("cloth", 0xC0302A), 4));
});
},
function (H, G, o) {
var tp = new THREE.Vector3(H.cx, H.ymax + 0.005, H.cz - 0.01);
dgxBall(G, dgxMat("cloth", 0x1A1612), tp, 0.034, 1, 0.85, 1);
for (var r = 0; r < 2; r++)
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2 + r * 0.4;
dgxFlat(G, "petal", dgxMat("leaf", r ? 0xF4C8D8 : 0xE890B0), tp.clone().add(new THREE.Vector3(Math.cos(a) * 0.02, 0.025 + r * 0.004, Math.sin(a) * 0.02)), new THREE.Vector3(Math.cos(a) * (0.6 - r * 0.3), 1, Math.sin(a) * (0.6 - r * 0.3)), dgxOut(a), 0.045 - r * 0.01, 0.03);
}
},
function (H, G, o) {
var gm = dgxMat("gold", o.c != null && o.c !== 0xC0302A ? o.c : null), y = H.browY, R = dgxRmax(H, y, y + 0.03);
G.add(dgxBand(H, y, function (a) { return 0.018 + 0.05 * Math.pow(Math.max(0, Math.cos(a - DGX_FRONT)), 3); }, 0.01, gm, { R: R, rows: 4, hmax: 0.07 }));
for (var i = 0; i < 7; i++) {
var a = DGX_FRONT + (i - 3) * 0.3, p = dgxPt(H, R, a, y + 0.02, 0.014);
dgxFlat(G, "ray", gm, p, new THREE.Vector3(0, 1, 0), dgxOut(a), 0.03 + 0.03 * Math.pow(Math.cos((i - 3) * 0.3), 6), 0.02);
}
dgxGem(G, o.c === 0xC0302A ? 0xC0302A : 0x2A8A5A, dgxPt(H, R, DGX_FRONT, y + 0.03, 0.016), dgxOut(DGX_FRONT), 0.01);
if (o.torii) {
var tp = dgxPt(H, R, DGX_FRONT, y + 0.075, 0.012), rm = dgxMat("cloth", 0xC0201E);
dgxBox(G, rm, tp.clone().add(new THREE.Vector3(0, 0.012, 0)), 0.05, 0.006, 0.006);
[-1, 1].forEach(function (sd) { dgxBox(G, rm, tp.clone().add(new THREE.Vector3(sd * 0.016, -0.005, 0)), 0.005, 0.035, 0.005); });
var sn = [];
for (var k = 0; k <= 10; k++) {
var t = k / 10;
sn.push(tp.clone().add(new THREE.Vector3(Math.sin(t * 6) * 0.012, -0.02 + t * 0.02, 0.006)));
}
G.add(dgxTaper(sn, 0.004, 0.002, dgxMat("pearl"), 5));
}
},
function (H, G, o) {
var hm = dgxMat("cloth", 0x14121A), y = H.earY;
[-1, 1].forEach(function (sd) {
var R = dgxRmax(H, y, y + 0.02), a = sd > 0 ? 0 : Math.PI, p = dgxPt(H, R, a, y - 0.02, 0.016);
var lp = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.011, 6, 14), hm);
lp.position.copy(p).add(new THREE.Vector3(0, -0.02, 0));
lp.rotation.y = Math.PI / 2;
lp.scale.set(1, 1.5, 1);
G.add(lp);
G.add(dgxRim(H, R, y + 0.01, 0.008, 0.004, dgxMat("cloth", 0xF4F2EC), a - 0.3, a + 0.3));
});
var R2 = dgxRmax(H, H.browY, H.browY + 0.01);
G.add(dgxRim(H, R2, H.browY + 0.012, 0.006, 0.004, dgxMat("cloth", 0xF4F2EC)));
},
function (H, G, o) {
var im = dgxMat("iron", 0x2A2A2E), y0 = H.browY - 0.006, R = dgxRmax(H, y0 - 0.05, H.ymax);
G.add(dgxDome(H, y0, 0.018, 0.02, im));
for (var l = 0; l < 4; l++) {
var rs = [];
for (var i = 0; i <= 2; i++) {
(function (t) { rs.push(function (a) { return { r: H.at(R, a) + 0.02 + 0.02 * l + 0.018 * t, y: y0 - 0.02 * l - 0.022 * t }; }); })(i / 2);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { a0: DGX_FRONT + 0.75, a1: DGX_FRONT + Math.PI * 2 - 0.75 }), dgxMat("lacquer", l % 2 ? 0x1A1A2A : 0x2A2A4A)));
}
[-1, 1].forEach(function (sd) { var a = DGX_FRONT + sd * 0.85; dgxBox(G, dgxMat("lacquer", 0x2A2A4A), dgxPt(H, R, a, y0 - 0.01, 0.05), 0.035, 0.04, 0.006, 0, -a + Math.PI / 2, 0); });
var fp = dgxPt(H, R, DGX_FRONT, y0 + 0.012, 0.02);
[-1, 1].forEach(function (sd) { G.add(dgxTaper([fp.clone().add(new THREE.Vector3(sd * 0.01, 0, 0)), fp.clone().add(new THREE.Vector3(sd * 0.05, 0.06, 0.01)), fp.clone().add(new THREE.Vector3(sd * 0.07, 0.13, 0))], 0.008, 0.004, dgxMat("gold"), 4)); });
dgxFlat(G, "disc", dgxMat("gold"), fp.clone().add(new THREE.Vector3(0, 0.012, 0.004)), new THREE.Vector3(0, 1, 0), dgxOut(DGX_FRONT), 0.028, 0.028);
},
function (H, G, o) {
var lm = dgxMat("lacquer", 0x141416), y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.04), rs = [];
for (var i = 0; i <= 8; i++) {
(function (t) { var fold = o.folded && t > 0.55 ? (t - 0.55) * 0.4 : 0; rs.push(function (a) { return { r: (H.at(R, a) + 0.012) * (1 - 0.4 * t), y: y0 + 0.16 * t - fold * 0.2, dz: -0.03 * t - fold * 0.25 }; }); })(i / 8);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx, y0 + 0.16 - (o.folded ? 0.03 : 0), H.cz - (o.folded ? 0.15 : 0.04)) }), lm));
},
function (H, G, o) {
var lm = dgxMat("lacquer", 0x141416), y0 = H.browY - 0.004;
G.add(dgxDome(H, y0, 0.012, 0.012, lm));
var bp = new THREE.Vector3(H.cx, H.ymax + 0.02, H.cz - 0.04);
dgxAdd(G, new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.06, 12), lm)).position.copy(bp);
var tl = dgxBox(G, lm, bp.clone().add(new THREE.Vector3(0, 0.06, -0.03)), 0.04, 0.16, 0.004, -0.35, 0, 0);
},
function (H, G, o) {
var gm = dgxMat("gold", o.c), y0 = H.browY - 0.006, R = dgxRmax(H, y0, y0 + 0.04), hh = (o.f ? 0.15 : 0.2) * (o.low ? 0.8 : 1), rs = [];
for (var i = 0; i <= 10; i++) {
(function (t) { var step = Math.floor(t * 4) / 4; rs.push(function (a) { return { r: (H.at(R, a) + 0.012) * (1 - 0.62 * t) + 0.008 * (t * 4 - Math.floor(t * 4) < 0.2 ? 1 : 0), y: y0 + hh * t }; }); })(i / 10);
}
G.add(new THREE.Mesh(dgxLoft(H, rs, { apex: new THREE.Vector3(H.cx, y0 + hh + 0.01, H.cz) }), gm));
G.add(dgxRim(H, R, y0 + 0.004, 0.014, 0.006, gm));
for (var q = 1; q <= 3; q++) {
var yq = y0 + hh * q / 4, Rq = R.map(function (r) { return (r + 0.012) * (1 - 0.62 * q / 4) - 0.012; });
G.add(dgxRim(H, Rq, yq, 0.016, 0.004, gm));
}
dgxBall(G, gm, new THREE.Vector3(H.cx, y0 + hh + 0.018, H.cz), 0.012, 1, 1.4, 1);
for (var k = 0; k < 9; k++) {
var a = DGX_FRONT + (k - 4) * 0.36;
dgxGem(G, [0xC0202E, 0x2A9A5A, 0x2A5AD0][k % 3], dgxPt(H, R, a, y0 + 0.02, 0.02), dgxOut(a), 0.008);
}
dgxFlat(G, "petal", gm, dgxPt(H, R, DGX_FRONT, y0 + 0.012, 0.02), new THREE.Vector3(0, 1, 0), dgxOut(DGX_FRONT), 0.07, 0.05);
[-1, 1].forEach(function (sd) { var a = sd > 0 ? 0 : Math.PI; dgxFlat(G, "petal", gm, dgxPt(H, R, a, y0 + 0.004, 0.014), new THREE.Vector3(sd * 0.4, 1, -0.3), dgxOut(a), 0.06, 0.04); });
if (o.peacock) {
var pp = dgxPt(H, R, DGX_FRONT + 0.5, y0 + hh * 0.5, 0.0);
dgxFlat(G, "feather", dgxMat("feather", 0x2A7A6A), pp, new THREE.Vector3(0.25, 1, -0.2), dgxOut(DGX_FRONT), 0.16, 0.05);
dgxFlat(G, "disc", dgxMat("gem", 0x1A3A9A), pp.clone().add(new THREE.Vector3(0.035, 0.13, -0.02)), new THREE.Vector3(0, 1, 0), dgxOut(DGX_FRONT), 0.03, 0.024);
}
if (o.rays)
DGX_HW.rays(H, G, { L: 0.09, n: 15 });
},
function (H, G, o) {
var hm = dgxMat("fur", 0x2A1E16), tp = new THREE.Vector3(H.cx, H.ymax + 0.03, H.cz - 0.01);
G.add(dgxDome(H, H.browY - 0.004, 0.01, 0.01, hm));
dgxBall(G, hm, tp, 0.05, 0.9, 1.3, 0.9);
dgxBall(G, hm, tp.clone().add(new THREE.Vector3(0, 0.05, 0)), 0.035, 0.9, 1.1, 0.9);
G.add(dgxRim(H, dgxRmax(H, H.ymax - 0.02, H.ymax), H.ymax - 0.01, 0.004, 0.005, dgxMat("pearl")));
dgxFlat(G, "crescent", dgxMat("silver", 0xF4F6FA), tp.clone().add(new THREE.Vector3(0.04, 0.0, 0.03)), new THREE.Vector3(0.3, 1, 0), new THREE.Vector3(0.5, 0, 1), 0.05, 0.06);
G.add(dgxTaper([tp.clone().add(new THREE.Vector3(0, 0.08, 0)), tp.clone().add(new THREE.Vector3(-0.02, 0.1, 0.01)), tp.clone().add(new THREE.Vector3(-0.05, 0.06, 0.02))], 0.006, 0.002, dgxMat("glow", 0xA8E0FF), 6));
var sn = [];
for (var i = 0; i <= 14; i++) {
var a = i / 14 * Math.PI * 1.7;
sn.push(tp.clone().add(new THREE.Vector3(Math.cos(a) * 0.055, -0.02 + i * 0.002, Math.sin(a) * 0.05)));
}
G.add(dgxTaper(sn, 0.006, 0.003, dgxMat("leaf", 0x2E5A3A), 5));
},
function (H, G, o) {
var cm = dgxMat("cloth", o.c != null ? o.c : 0xC8B48A), hm = dgxMat("gold", 0xC9A040), y0 = H.browY - 0.006, hh = o.tall ? 0.14 : 0.1, R = dgxCyl(H, G, y0, hh, 0.012, cm, { flare: 0.006 });
for (var k = 0; k < (o.tall ? 4 : 3); k++) {
var y = y0 + 0.012 + k * 0.028;
[-1, 1].forEach(function (sd) { var pts = []; for (var i = 0; i <= 12; i++) {
var t = i / 12, a = DGX_FRONT + sd * (0.08 + t * 2.4);
pts.push(dgxPt(H, R, a, y + 0.012 * t, 0.017 + 0.004 * Math.sin(t * Math.PI)));
} G.add(dgxTaper(pts, 0.007, 0.0025, hm, 5)); });
}
dgxBall(G, hm, new THREE.Vector3(H.cx, y0 + hh + 0.012, H.cz), 0.014);
if (o.moon)
dgxFlat(G, "crescent", dgxMat("silver"), new THREE.Vector3(H.cx, y0 + hh + 0.04, H.cz), new THREE.Vector3(0, 1, 0), dgxOut(DGX_FRONT), 0.06, 0.08);
},
function (H, G, o) {
var gm = dgxMat("gold"), y0 = H.browY - 0.006, hh = 0.12, R = dgxCyl(H, G, y0, hh, 0.012, gm, { flare: 0.012, top: true });
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, p = dgxPt(H, R, a, y0 + hh + 0.008, 0.022);
dgxBox(G, gm, p, 0.022, 0.022, 0.008, 0, -a + Math.PI / 2, 0);
}
for (var k = 0; k < 16; k++) {
var a2 = k / 16 * Math.PI * 2;
dgxBox(G, dgxMat("gold", 0xB08A30), dgxPt(H, R, a2, y0 + hh / 2, 0.019), 0.004, hh * 0.9, 0.004, 0, -a2 + Math.PI / 2, 0);
}
},
function (H, G, o) {
var gm = dgxMat("gold"), y0 = H.browY - 0.004;
DGX_HW.crown(H, G, { n: 8, h: 0.035, cap: false, gems: [0x2A5AD0] });
var R = dgxRmax(H, y0, y0 + 0.04);
for (var i = 0; i < 20; i++) {
var a = i / 20 * Math.PI * 2, p = dgxPt(H, R, a, y0 + 0.018, 0.02);
var s = new THREE.Mesh(DGX.star || (DGX.star = new THREE.OctahedronGeometry(0.008, 0)), dgxMat("silver", 0xF8F8FF));
s.position.copy(p);
s.scale.set(0.8, 0.8, 0.3);
G.add(s);
}
},
function (H, G, o) {
var y = H.browY, R = dgxRmax(H, y, y + 0.03), s = o.small ? 0.6 : 1, fc = o.c != null ? o.c : 0x1E8A5A;
G.add(dgxBand(H, y, 0.03, 0.012, dgxMat("beads", "#2A9A8A/#C9A040/#C0302A"), { R: R, rows: 1 }));
for (var i = 0; i < 15; i++) {
var t = i / 14, a = DGX_BACK + (t - 0.5) * 2.8, p = dgxPt(H, R, a, y + 0.02, 0.006), dir = dgxOut(a).multiplyScalar(0.35).add(new THREE.Vector3(0, 1, 0)).add(new THREE.Vector3(0, 0, -0.25));
dgxFlat(G, "feather", dgxMat("feather", i % 3 === 1 ? 0xC0302A : fc), p, dir, dgxOut(a), (0.2 + 0.08 * Math.sin(t * Math.PI)) * s, 0.04);
}
for (var k = 0; k < 5; k++) {
var a2 = DGX_FRONT + (k - 2) * 0.5;
dgxGem(G, 0x2AAA8A, dgxPt(H, R, a2, y + 0.015, 0.018), dgxOut(a2), 0.009);
}
if (o.flowers)
DGX_HW.flowers(H, G, { cols: [0xF4C030, 0xE85A6A, 0xF4F2EC], n: 7 });
if (o.mirror) {
var mp = dgxPt(H, R, Math.PI * 0.95, y + 0.01, 0.03);
dgxFlat(G, "disc", dgxMat("lacquer", 0x0A0A0C), mp, new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0), 0.05, 0.05);
for (var q = 0; q < 3; q++)
dgxBall(G, dgxMat("glow", 0x8A8A90), mp.clone().add(new THREE.Vector3(-0.01, 0.03 + q * 0.025, 0)), 0.015 - q * 0.003);
}
},
function (H, G, o) {
var fm = dgxMat("feather", 0x2A8AA0), y0 = H.browY - 0.004, R = dgxRmax(H, y0, H.ymax);
G.add(dgxDome(H, y0, 0.016, 0.03, dgxMat("beads", "#2A8AA0/#2AAA6A/#1A5A8A")));
var fp = dgxPt(H, R, DGX_FRONT, y0 + 0.035, 0.016);
G.add(dgxTaper([fp, fp.clone().add(new THREE.Vector3(0, -0.01, 0.06)), fp.clone().add(new THREE.Vector3(0, -0.03, 0.11))], 0.012, 0.002, dgxMat("lacquer", 0x1A1A1E), 6));
[-1, 1].forEach(function (sd) { dgxBall(G, dgxMat("pearl"), fp.clone().add(new THREE.Vector3(sd * 0.03, 0.012, -0.01)), 0.008); });
DGX_HW.quetzal(H, G, { c: 0x2A8AA0 });
},
function (H, G, o) {
var y = H.browY - 0.004, R = dgxCyl(H, G, y, 0.07, 0.012, dgxMat("beads", "#2AAA8A/#1A6A5A/#C9A040"), { flare: 0.02 });
dgxBall(G, dgxMat("gem", 0x2AAA8A), dgxPt(H, R, DGX_FRONT, y + 0.04, 0.03), 0.022, 1.1, 1, 0.6);
for (var i = 0; i < 11; i++) {
var t = i / 10, a = DGX_FRONT + (t - 0.5) * 1.4, p = dgxPt(H, R, a, y + 0.07, 0.01);
dgxFlat(G, "feather", dgxMat("feather", i % 2 ? 0x1E8A5A : (o.c != null ? o.c : 0xF4F2EC)), p, new THREE.Vector3(0, 1, -0.2).add(dgxOut(a).multiplyScalar(0.4)), dgxOut(a), 0.14, 0.04);
}
},
function (H, G, o) {
var sm = dgxMat("leaf", 0x3A7A3A), y = H.browY + 0.006, R = dgxRmax(H, y, y + 0.03), pts = [];
for (var i = 0; i <= 40; i++) {
var t = i / 40, a = DGX_FRONT + 0.2 + t * Math.PI * 2.2;
pts.push(dgxPt(H, R, a, y + t * 0.04, 0.018));
}
G.add(dgxTaper(pts, 0.012, 0.004, sm, 7));
dgxBall(G, sm, dgxPt(H, R, DGX_FRONT + 0.15, y, 0.03), 0.018, 1, 0.8, 1.4);
},
function (H, G, o) {
var gm = dgxMat("gold"), c = new THREE.Vector3(H.cx, (H.eyeY + H.ymax) / 2, H.cz - 0.09);
if (!o.plain) {
dgxFlat(G, "disc", gm, c, new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), 0.3, 0.3);
for (var i = 0; i < 18; i++) {
var a = i / 18 * Math.PI * 2;
dgxFlat(G, "ray", gm, c.clone().add(new THREE.Vector3(Math.cos(a) * 0.14, Math.sin(a) * 0.14, 0)), new THREE.Vector3(Math.cos(a), Math.sin(a), 0), new THREE.Vector3(0, 0, 1), 0.07, 0.03);
}
}
DGX_HW.mascaypacha(H, G, { c: 0xC0201E });
if (o.plain)
DGX_HW.rays(H, G, { n: 9, L: 0.06 });
},
function (H, G, o) {
var y = H.browY + 0.004, R = dgxRmax(H, y, y + 0.02);
G.add(dgxBand(H, y, 0.016, 0.008, dgxMat("beads", "#C0302A/#E0B030/#2A2A2A/#2A6AC8"), { R: R, rows: 1 }));
for (var i = 0; i < 12; i++) {
var a = DGX_FRONT + (i - 5.5) * 0.08;
dgxBox(G, dgxMat("cloth", o.c != null ? o.c : 0xC0201E), dgxPt(H, R, a, y - 0.012, 0.012), 0.008, 0.028, 0.004, 0, -a + Math.PI / 2, 0);
}
},
function (H, G, o) {
var cm = dgxMat("cloth", o.c != null ? o.c : 0xB0302A), y = H.browY - 0.004, R = dgxRmax(H, y, H.ymax);
G.add(dgxBand(H, y, function (a) { return 0.03 + 0.09 * Math.pow(Math.max(0, Math.cos(a - DGX_FRONT)), 1.5); }, 0.014, cm, { R: R, rows: 5, hmax: 0.12, a0: DGX_FRONT - 1.5, a1: DGX_FRONT + 1.5, flare: 0.02 }));
var edge = [];
for (var k = 0; k <= 24; k++) {
var a = DGX_FRONT - 1.5 + k / 24 * 3, h = 0.03 + 0.09 * Math.pow(Math.max(0, Math.cos(a - DGX_FRONT)), 1.5);
edge.push(dgxPt(H, R, a, y + h, 0.034));
}
G.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edge), 48, 0.005, 5, false), dgxMat("gold")));
for (var i = 0; i < 14; i++) {
var a2 = DGX_FRONT - 1.3 + i / 13 * 2.6;
dgxBall(G, dgxMat("pearl"), dgxPt(H, R, a2, y + 0.008, 0.02), 0.005);
}
dgxGem(G, 0xE0B030, dgxPt(H, R, DGX_FRONT, y + 0.06, 0.03), dgxOut(DGX_FRONT), 0.014);
G.add(dgxDome(H, y, 0.012, 0.006, cm, { a0: DGX_FRONT + 1.2, a1: DGX_FRONT + Math.PI * 2 - 1.2 }));
},
function (H, G, o) {
var y = H.browY, R = dgxRmax(H, y, y + 0.02);
G.add(dgxBand(H, y, 0.02, 0.01, dgxMat("beads", "#C8201E/#E0B030"), { R: R, rows: 1 }));
for (var i = 0; i < 24; i++) {
var a = i / 24 * Math.PI * 2;
dgxFlat(G, "feather", dgxMat("feather", i % 3 ? o.c || 0xC8201E : 0xE0B030), dgxPt(H, R, a, y + 0.016, 0.012), new THREE.Vector3(0, 1, 0).add(dgxOut(a).multiplyScalar(0.25)), dgxOut(a), 0.07, 0.025);
}
},
function (H, G, o) {
DGX_HW.circlet(H, G, { c: 0xE8D8A0, gem: false });
var R = dgxRmax(H, H.browY, H.browY + 0.02), p = dgxPt(H, R, DGX_FRONT, H.browY + 0.03, 0.02);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
dgxFlat(G, "ray", dgxMat("glow", 0xFFF4D0), p, new THREE.Vector3(Math.cos(a), Math.sin(a), 0), dgxOut(DGX_FRONT), i % 2 ? 0.025 : 0.045, 0.016);
}
dgxBall(G, dgxMat("glow", 0xFFFFFF), p, 0.01);
},
function (H, G, o) {
var p = new THREE.Vector3(H.cx, H.ymax + 0.01, H.cz);
G.add(dgxTaper([p, p.clone().add(new THREE.Vector3(0, 0.08, 0))], 0.012, 0.016, dgxMat("bronze", 0x5A3A22), 6));
dgxFlat(G, "petal", dgxMat("glow", 0xFFB23A), p.clone().add(new THREE.Vector3(0, 0.08, 0)), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), 0.08, 0.05);
dgxFlat(G, "petal", dgxMat("glow", 0xFFB23A), p.clone().add(new THREE.Vector3(0, 0.08, 0)), new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0), 0.08, 0.05);
},
function (body, kit) {
var out = [];
body.children.forEach(function (o) {
if (kit && kit.has(o))
return;
var p = o.position;
if (Math.abs(p.x) > 0.1 || p.y < 1.62 || p.y > 1.82)
return;
if (o.isGroup && !o.userData.dl && !o.userData.dgxKitHw)
out.push(o);
else if (o.isMesh && o.geometry && o.geometry.type === "SphereGeometry" && o.geometry.parameters && o.geometry.parameters.radius > 0.09)
out.push(o);
});
return out;
},
function (g, spec, d, list) {
var body = g.children[0];
if (!body)
return;
var kit = g.userData.hdfKit, L = lookOf(spec);
var old = DGX_OLDGEO.map(function (k) { return typeof DL_GEO !== "undefined" ? DL_GEO[k] : null; }).filter(Boolean);
body.children.forEach(function (o) { if (o.isMesh && old.indexOf(o.geometry) >= 0)
o.visible = false; });
if (!list.length)
return;
var ex = dgxKitExtras(body, kit), key = [d.key, L.sex, L.hairStyle, L.species || "", ex.length, list.map(function (q) { return q[0]; }).join("+")].join("|");
var T = DGX.kit[key];
if (!T) {
if (list.some(function (q) { return DGX_COVERS[q[0]]; }))
body.children.forEach(function (m) { if (m.isMesh && DGX_KITHAIR.test(m.userData.part || ""))
m.visible = false; });
var H = dgxHeadKit(body, ex);
if (!H)
return;
ex.forEach(function (o) { if (o.userData.dgxBrow != null)
H.browY = Math.min(H.ymax - 0.03, o.position.y + o.userData.dgxBrow); });
var built = dgxBuild(H, list, d, L, true);
body.remove(H.G);
T = DGX.kit[key] = { g: H.G, hair: built.hair };
}
body.children.forEach(function (m) { if (m.isMesh && m.userData.part === "tuft")
m.visible = false; });
var G = T.g.clone();
G.userData.dgxKitHw = 1;
G.traverse(function (m) { m.userData.dgxKitHw = 1; if (m.isMesh) {
m.raycast = function () { };
m.castShadow = true;
} });
body.add(G);
if (T.hair)
body.children.forEach(function (m) { if (m.isMesh && DGX_KITHAIR.test(m.userData.part || ""))
m.visible = false; });
g.userData.dgxList = list;
},
function (H, list, d, L, kit) {
var hair = false;
list.forEach(function (q) {
try {
DGX_HW[q[0]](H, H.G, q[1] || {}, d, L, kit);
if (DGX_COVERS[q[0]])
hair = true;
}
catch (e) {
DGX.fails++;
if (window.console)
console.warn("[deity looks] " + q[0] + ":", e);
}
});
H.G.name = "dgx-headwear";
H.G.userData.dgxHw = 1;
H.G.traverse(function (m) { m.userData.hdf = m.userData.hdf || !kit; if (m.isMesh) {
m.raycast = function () { };
m.castShadow = true;
} });
return { hair: hair };
},
function (E) {
if (!E)
return;
if (E.dgxFit) {
if (E.dgxFit.parent)
E.dgxFit.parent.remove(E.dgxFit);
E.dgxFit.traverse(function (m) { if (m.isMesh && m.geometry && !m.geometry.userData.dgxShared && m.geometry !== DGX.ball && m.geometry !== DGX.box && m.geometry !== DGX.oct)
m.geometry.dispose(); });
E.dgxFit = null;
}
(E.dgxHid || []).forEach(function (m) { m.visible = true; });
E.dgxHid = null;
},
function (g) {
var body = g.children[0];
if (!body)
return;
body.children.forEach(function (w) {
if (!w.isGroup || !w.userData.wing || w.userData.dgxWing)
return;
w.userData.dgxWing = 1;
var sd = w.userData.wing, col = 0xF2EEE6;
w.children.forEach(function (m) { if (m.material && m.material.color)
col = m.material.color.getHex(); });
w.children.slice().forEach(function (m) { w.remove(m); });
var fm = dgxMat("feather", col), dk = dgxMat("feather", (typeof wshade === "function") ? wshade(col, 0.82) : col);
for (var row = 0; row < 3; row++)
for (var i = 0; i < 9; i++) {
var t = i / 8, ang = 0.15 + t * 1.55, len = (row === 2 ? 0.62 : row === 1 ? 0.42 : 0.26) * (0.75 + 0.25 * Math.sin(t * Math.PI) + (row === 2 ? t * 0.4 : 0));
var base = new THREE.Vector3(sd * (0.04 + t * 0.62 * (0.6 + row * 0.2)), 0.18 - t * 0.1 - row * 0.05, -row * 0.012);
dgxFlat(w, "feather", row === 0 ? dk : fm, base, new THREE.Vector3(sd * Math.sin(ang) * 0.6, -Math.cos(ang) * 0.2 - 0.9 + t * 0.2, 0).normalize(), new THREE.Vector3(0, 0, 1), len, 0.1);
}
});
},
function (L, d) {
var g = DGX_GODS[d.key] || {}, S = L.src = L.src || {};
function may(k) { return !S[k] || S[k] === "tradition"; }
if (g.skin != null && may("skin")) {
L.skin = g.skin;
S.skin = "tradition";
}
if (g.hair != null && may("hair")) {
L.hair = g.hair;
S.hair = "tradition";
}
if (may("hairStyle")) {
if (g.style) {
L.hairStyle = g.style;
S.hairStyle = "tradition";
}
else if (/^(afro|coily|locs|headwrap|curly)$/.test(L.hairStyle || "")) {
L.hairStyle = DGX_SHORTHAIR[d.trad] ? (L.sex === "f" ? "braids" : "buzz") : (L.sex === "f" ? "long" : "waves");
S.hairStyle = "tradition";
}
}
},
function (H, G) {
var worst = { lo: 1e9, hi: -1e9, n: 0 }, v = new THREE.Vector3();
G.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(G.matrixWorld).invert();
G.traverse(function (m) {
if (!m.isMesh || !m.userData.dgxBand || !m.visible)
return;
var P = m.geometry.attributes.position, M = new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld), lo = 1e9;
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(M);
if (v.y < lo)
lo = v.y;
}
for (var j = 0; j < P.count; j++) {
v.fromBufferAttribute(P, j).applyMatrix4(M);
if (v.y > lo + 0.004 || v.y > H.ymax - 0.004)
continue;
var a = Math.atan2(v.z - H.cz, v.x - H.cx), gap = Math.hypot(v.x - H.cx, v.z - H.cz) - H.at(H.ring(v.y), a);
if (gap < worst.lo)
worst.lo = gap;
if (gap > worst.hi)
worst.hi = gap;
worst.n++;
}
});
var bb = new THREE.Box3();
G.traverse(function (m) { if (m.isMesh && m.visible && !m.userData.dgxDrape) {
m.geometry.computeBoundingBox();
var b = m.geometry.boundingBox.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld));
bb.union(b);
} });
worst.bottom = bb.isEmpty() ? null : bb.min.y;
worst.ymax = H.ymax;
worst.ymin = H.ymin;
return worst;
},
function (x, W, H) {
var g = x.createLinearGradient(0, 0, W, 0);
g.addColorStop(0, "#E8E8E8");
g.addColorStop(0.5, "#FFFFFF");
g.addColorStop(1, "#E0E0E0");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 14; i++) {
var cx = (i * 37) % W, cy = (i * 53) % H;
x.strokeStyle = "rgba(0,0,0,.07)";
x.lineWidth = 2;
x.beginPath();
x.arc(cx, cy, 9, 0, Math.PI * 1.4);
x.stroke();
x.beginPath();
x.arc(cx + 12, cy, 6, Math.PI, Math.PI * 2.4);
x.stroke();
}
},
function (x, W, H) { var c = ["#E0B020", "#2A8A3A", "#C0201E", "#1A1A1A", "#E0B020", "#2A4AA0"]; for (var j = 0; j < 8; j++)
for (var i = 0; i < 8; i++) {
x.fillStyle = c[(i + j * 2) % c.length];
x.fillRect(i * 16, j * 16, 16, 16);
x.fillStyle = "rgba(0,0,0,.25)";
for (var k = 0; k < 16; k += 4)
x.fillRect(i * 16 + ((j % 2) ? k : 0), j * 16 + ((j % 2) ? 0 : k), (j % 2) ? 2 : 16, (j % 2) ? 16 : 2);
} },
function (d, L) {
var g = DGX_GODS[d.key] || {}, t = d.trad, c1 = L.top != null ? L.top : 0xE8E4DA, sg = typeof deitySign === "function" ? deitySign(d) : { col: 0xC9A040 };
var trim = (typeof PRECINCT !== "undefined" && PRECINCT[t] && PRECINCT[t].trim) || 0xC9A868;
var pale = (((c1 >> 16) & 255) + ((c1 >> 8) & 255) + (c1 & 255)) / 3 > 200;
var c2 = g.c2 != null ? g.c2 : pale ? blend(sg.col, 0x3A2A4A, 0.25) : blend(c1, 0xF4F0E6, 0.45);
return { c1: g.c1 != null ? g.c1 : c1, c2: c2, c3: g.c3 != null ? g.c3 : (pale ? trim : wshade(c1, 0.6)), c4: 0xC9A040 };
},
function (R, s) {
var NA = R[0].length, W = [0.06, 0.12, 0.18, 0.28, 0.18, 0.12, 0.06];
var A = R.map(function (row) { return row.map(function (r, j) { var t = 0; for (var k = -3; k <= 3; k++)
t += row[(j + k + NA) % NA] * W[k + 3]; return Math.max(t, r - 0.008 * s); }); });
if (A.length > 2)
A = A.map(function (row, i) { return row.map(function (r, j) { var u = A[Math.max(0, i - 1)][j], d = A[Math.min(A.length - 1, i + 1)][j], m = (u + 2 * r + d) / 4; return Math.max(m, R[i][j] - 0.008 * s); }); });
return A;
},
function (D, pts, y0, y1, gap, prof, open, NS, hang) {
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
if (hang)
R = whHang(R);
R = dgxEase(R, s);
if (hang)
for (var i = R.length - 2; i >= 0; i--)
for (var j = 0; j < R[i].length; j++)
if (R[i + 1][j] > R[i][j])
R[i][j] = R[i + 1][j];
var arc = open ? [Math.PI / 2 + open / 2, Math.PI / 2 + Math.PI * 2 - open / 2] : null;
var g = rlFitShell(O, WH_UP, WH_X, WH_Z, L, 0, 1, R, gap * s, prof, arc);
return { geo: g, O: O, L: L, R: R, arc: arc, gap: gap * s, prof: prof };
},
function (D, name) {
var R = DGX_DRESS[name];
if (!R)
return [];
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
function col(c) { return DGX_FIXED[c] != null ? DGX_FIXED[c] : ("dg" + c); }
function stuff(k, c) { return k; }
function torso(bot, gap, open, flare, c, k, top) {
var pts = whPts(D, TORSO), yt = top || yTop;
var prof = function (t, a) { var y = bot + t * (yt - bot); return (flare || 0) * s * Math.max(0, (yW - y) / Math.max(0.01, yW - bot)); };
var T = dgxTube(D, pts, bot, yt, gap, prof, open, 14);
if (!T)
return null;
push(T.geo, k || "cloth", c);
if (!top) {
var NR = whNeckR(D, yN);
push(whYoke(D, T, yN, NR.R, T.arc), k || "cloth", c);
T.NR = NR;
}
return T;
}
function sleeves(c, gap, len, bell, k) {
["l", "r"].forEach(function (sd) {
var U = whLimb(D, "upperarm_" + sd, "lowerarm_" + sd, new RegExp("^upperarm_" + sd + "$"), -0.12, len <= 0 ? 0.45 : 1.04, gap, null, null, 0.035);
if (U)
push(U.geo, k || "cloth", c, U.sk);
if (len > 0) {
var Lw = whLimb(D, "lowerarm_" + sd, "hand_" + sd, new RegExp("^lowerarm_" + sd + "$"), -0.06, len, gap, bell ? function (t) { return bell * s * Math.max(0, t); } : null, null, 0.028);
if (Lw) {
push(Lw.geo, k || "cloth", c, Lw.sk);
if (!(bell > 0.08))
push(whTubeAlong(Lw.geo.userData.ring(len, 0.004 * s + (bell || 0) * s * Math.max(0, len)), 0.008 * s, true), "cloth", "darkdgc3", Lw.sk);
}
}
});
}
function skirt(top, bot, gap, flare, c, k, open, room, ragged) {
var pts = whPts(D, function (q) { return q.r === "torso" && q.y < yW + 0.05 * s || /^(thigh|calf)_/.test(q.r); });
var prof = function (t, a) { return flare * s * Math.pow(1 - t, 1.6) + (room || 0) * s * Math.max(0, 1 - Math.abs(t - 0.5) / 0.45) - (room ? (gap + 0.004) * s * Math.max(0, (t - 0.8) / 0.2) : 0) + (ragged && t < 0.08 ? 0.02 * s * Math.sin(a * 9) : 0); };
var T = dgxTube(D, pts, bot, top, gap + 0.004, prof, open, 16, true);
if (!T)
return null;
var span = Math.max(0.01, top - bot);
T.sk = { allow: /^(torso|thigh_[lr]|calf_[lr])$/, split: true, hips: function (y) { return Math.max(0.35, Math.min(1, (y - bot) / span)); } };
push(T.geo, k || "cloth", c, T.sk);
return T;
}
function hem(T, c, k, r) { if (!T)
return; push(whTubeAlong(T.geo.userData.ring(0, 0.003 * s, T.arc ? T.arc[0] : null, T.arc ? T.arc[1] : null), (r || 0.009) * s, !T.arc), k || "cloth", c, T.sk); }
function ringAt(T, y, out) {
var t = (y - T.O.y) / T.L, row = Math.max(0, Math.min(T.R.length - 1, Math.round(t * (T.R.length - 1)))), pts = [];
for (var j = 0; j <= 32; j++) {
var a = j / 32 * Math.PI * 2, r = whRAt(T.R[row], a) + T.gap + (T.prof ? T.prof(t, a) : 0) + (out || 0);
pts.push(new THREE.Vector3(T.O.x + Math.cos(a) * r, y, T.O.z + Math.sin(a) * r));
}
pts.pop();
return pts;
}
function drape(c, k, w, low) {
var body = dgxTube(D, whPts(D, function (q) { return q.r === "torso" || (/^thigh_/.test(q.r) && q.y > yP - 0.2 * s) || (q.r === "neck" && q.y < yN) || (/^upperarm_l$/.test(q.r) && q.y > yA - 0.12 * s); }), (low ? yP - 0.2 * s : yW - 0.05 * s), yTop + 0.02 * s, 0.03, null, 0, 16);
if (!body)
return;
var NA = 48, NR = 6, pos = [], uv = [], idx = [], yHi = yTop - 0.01 * s, yLo = low ? yP - 0.12 * s : yW - 0.02 * s, aHi = Math.PI * 1.0, W = w * s;
for (var i = 0; i <= NR; i++) {
var f = i / NR - 0.5;
for (var j = 0; j <= NA; j++) {
var a = j / NA * Math.PI * 2, hi = (1 + Math.cos(a - 0)) / 2, yc = yLo + (yHi - yLo) * Math.pow(hi, 1.3), y = yc + f * W * (0.6 + 0.4 * (1 - hi));
y = Math.max(body.O.y + 0.005, Math.min(body.O.y + body.L - 0.002, y));
var t = (y - body.O.y) / body.L, row = Math.max(0, Math.min(body.R.length - 1, Math.round(t * (body.R.length - 1)))), r = whRAt(body.R[row], a) + 0.02 * s + 0.004 * s * Math.sin(a * 7 + f * 3) + (hi > 0.85 ? 0.008 * s : 0);
pos.push(body.O.x + Math.cos(a) * r, y, body.O.z + Math.sin(a) * r);
uv.push(j / NA * 4, i / NR);
}
}
for (var i2 = 0; i2 < NR; i2++)
for (var j2 = 0; j2 < NA; j2++) {
var p0 = i2 * (NA + 1) + j2, q0 = p0 + NA + 1;
idx.push(p0, q0, p0 + 1, p0 + 1, q0, q0 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
push(g, k || "cloth", c, { allow: /^(torso|neck|upperarm_l|thigh_[lr])$/ });
var bk = new THREE.BoxGeometry(W * 0.8, (yHi - yP + 0.25 * s), 0.01 * s);
bk.translate(body.O.x + 0.04 * s, (yHi + yP - 0.25 * s) / 2, body.O.z - whRAt(body.R[body.R.length - 1], -Math.PI / 2) - 0.035 * s);
push(bk, k || "cloth", c, { allow: /^(torso)$/ });
}
var tops = null, sk = null;
R.forEach(function (q) {
var o = q[1] || {}, id = q[0], c = col(o.c);
if (id === "top") {
var bot = o.len === "waist" ? yW - 0.02 * s : o.len === "chest" ? yC - 0.06 * s : yP - 0.1 * s;
tops = torso(bot, 0.009, 0, o.len === "chest" ? 0 : 0.015, c, o.k);
if (o.sl != null)
sleeves(c, 0.014, o.sl, o.bell || 0, o.k);
}
else if (id === "skirt") {
var from = o.from === "hip" ? yW + 0.04 * s : o.from === "chest" ? yC : yW + 0.02 * s, to = o.to === "knee" ? yKnee - 0.02 * s : o.to === "calf" ? yKnee - 0.22 * s : o.to === "thigh" ? yKnee + 0.16 * s : yAnkle;
sk = skirt(from, to, 0.014, (o.flare != null ? o.flare : 0.1) * 0.6, c, o.k, 0, o.to === "ankle" || !o.to ? 0.012 : 0, o.ragged);
if (sk && !o.ragged)
hem(sk, "dgc3", "cloth", 0.01);
}
else if (id === "overfold" && tops) {
var ov = torso(yW - 0.06 * s, 0.016, 0, 0, c, o.k, yC + 0.02 * s);
if (ov)
hem(ov, "dgc3", "cloth", 0.006);
}
else if (id === "belt") {
var bt = whTube(D, whPts(D, TORSO), yW - 0.03 * s, yW + 0.03 * s, 0.04, null, 0, 4);
if (bt)
push(whTubeAlong(ringAt(bt, yW, 0.006 * s), 0.012 * s, true), o.c === "leather" ? "leather" : o.c === "c4" ? "gold" : "cloth", c, { allow: /^torso$/ });
}
else if (id === "sash") {
var st = whTube(D, whPts(D, TORSO), yW - 0.06 * s, yW + 0.06 * s, 0.04, null, 0, 6);
if (st) {
push(whTubeAlong(ringAt(st, yW, 0.008 * s), 0.02 * s, true), "cloth", c, { allow: /^torso$/ });
var fp = ringAt(st, yW, 0.012 * s)[Math.round(32 * 0.25) + 2];
var tail = new THREE.BoxGeometry(0.07 * s, 0.3 * s, 0.008 * s);
tail.translate(fp.x, yW - 0.15 * s, fp.z);
push(tail, "cloth", c, { allow: /^(torso|thigh_l)$/ });
}
}
else if (id === "drape")
drape(c, o.k, (o.w || 0.16) * 1.7, o.low);
else if (id === "usekh" || id === "aegis" || id === "neckwork") {
var T = dgxTube(D, whPts(D, TORSO), yC - 0.1 * s, yTop, 0.02, null, 0, 8);
if (!T)
return;
var NR = whNeckR(D, yN), N = 6, NA = 40, pos = [], uv = [], idx = [], wide = id === "aegis" ? 1.3 : id === "neckwork" ? 0.7 : 1.15;
for (var i = 0; i <= N; i++) {
var f = i / N;
for (var j = 0; j <= NA; j++) {
var a = j / NA * Math.PI * 2, yy = yN - 0.01 * s - (yN - (yTop - 0.07 * s * wide)) * f, row0 = Math.max(0, Math.min(T.R.length - 1, Math.round((yy - T.O.y) / T.L * (T.R.length - 1)))), rr = whRAt(NR.R, a) * (1 - f) + (whRAt(T.R[row0], a) + 0.014 * s) * f + 0.012 * s;
if (id !== "aegis" && Math.sin(a) < 0)
yy = yN - 0.01 * s - (0.05 * s) * f;
pos.push(NR.cx + (T.O.x - NR.cx) * f + Math.cos(a) * rr, yy - (id === "aegis" ? 0.05 * s * f * Math.max(0, Math.sin(a)) : 0), NR.cz + (T.O.z - NR.cz) * f + Math.sin(a) * rr);
uv.push(j / NA * 6, f);
}
}
for (var i3 = 0; i3 < N; i3++)
for (var j3 = 0; j3 < NA; j3++) {
var p1 = i3 * (NA + 1) + j3, q1 = p1 + NA + 1;
idx.push(p1, q1, p1 + 1, p1 + 1, q1, q1 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
push(g, id === "aegis" ? "scales" : id === "neckwork" ? "silk" : "usekh", id === "aegis" ? "dgc4" : id === "neckwork" ? c : "white", { allow: /^(torso|neck)$/ });
if (id === "aegis") {
var fr = new THREE.Vector3(T.O.x, yTop - 0.06 * s, T.O.z + whRAt(T.R[T.R.length - 1], Math.PI / 2) + 0.05 * s);
var gd = new THREE.CylinderGeometry(0.045 * s, 0.045 * s, 0.012 * s, 20);
gd.rotateX(Math.PI / 2);
gd.translate(fr.x, fr.y, fr.z);
push(gd, "gold", "dgc4", { allow: /^torso$/ });
}
}
else if (id === "pteruges") {
var pt = whTube(D, whPts(D, function (q) { return q.r === "torso" && q.y < yW + 0.05 * s || /^thigh_/.test(q.r); }), yP - 0.22 * s, yW, 0.05, null, 0, 6);
if (pt)
for (var k2 = 0; k2 < 14; k2++) {
var a2 = k2 / 14 * Math.PI * 2, r2 = whRAt(pt.R[2], a2) + 0.06 * s, sp = new THREE.BoxGeometry(0.055 * s, 0.2 * s, 0.008 * s);
sp.rotateY(-a2 + Math.PI / 2);
sp.translate(pt.O.x + Math.cos(a2) * r2, yP - 0.12 * s, pt.O.z + Math.sin(a2) * r2);
push(sp, "leather", c, { allow: /^(torso|thigh_[lr])$/ });
}
}
else if (id === "crossneck" && tops) {
var NRc = tops.NR || whNeckR(D, yN), p0 = new THREE.Vector3(NRc.cx - 0.06 * s, yN, NRc.cz + whRAt(NRc.R, Math.PI / 2) * 0.6), p1 = new THREE.Vector3(NRc.cx + 0.11 * s, yC - 0.08 * s, NRc.cz + whRAt(tops.R[Math.round(tops.R.length * 0.7)], Math.PI / 2) + 0.03 * s);
var pp = [];
for (var u = 0; u <= 8; u++) {
var tt = u / 8, q2 = p0.clone().lerp(p1, tt);
q2.z += Math.sin(tt * Math.PI) * 0.025 * s;
pp.push(q2);
}
push(whTubeAlong(pp, 0.016 * s, false), "cloth", c, { allow: /^(torso|neck)$/ });
}
else if (id === "apron") {
var ap = whTube(D, whPts(D, TORSO), yW - 0.1 * s, yC + 0.06 * s, 0.03, null, 0, 8);
if (!ap)
return;
[Math.PI / 2, -Math.PI / 2].forEach(function (fa) {
var r3 = whRAt(ap.R[ap.R.length - 1], fa) + 0.035 * s, pg = new THREE.PlaneGeometry(0.26 * s, yC + 0.06 * s - yKnee, 1, 6);
var zz = ap.O.z + Math.sin(fa) * r3;
pg.translate(ap.O.x, (yC + 0.06 * s + yKnee) / 2, 0);
var pa = pg.attributes.position;
for (var v = 0; v < pa.count; v++) {
var yv = pa.getY(v), fl = Math.max(0, (yW - yv) / (yW - yKnee));
pa.setZ(v, zz + Math.sin(fa) * (0.08 * s * fl + 0.02 * s));
}
pg.computeVertexNormals();
push(pg, "linen", c, { allow: /^(torso|thigh_[lr]|calf_[lr])$/ });
});
}
else if (id === "brooches") {
[-1, 1].forEach(function (sd) { var b = new THREE.SphereGeometry(0.035 * s, 14, 8); b.scale(1, 1.3, 0.45); var tt2 = whTube(D, whPts(D, TORSO), yC - 0.05 * s, yC + 0.1 * s, 0.03, null, 0, 4); if (!tt2)
return; var a4 = Math.PI / 2 + sd * 0.45; b.translate(tt2.O.x + Math.cos(a4) * (whRAt(tt2.R[3], a4) + 0.05 * s), yC + 0.04 * s, tt2.O.z + Math.sin(a4) * (whRAt(tt2.R[3], a4) + 0.05 * s)); push(b, "gold", "dgc4", { allow: /^torso$/ }); });
var bp = whTube(D, whPts(D, TORSO), yC - 0.05 * s, yC + 0.1 * s, 0.03, null, 0, 4);
if (bp) {
var pts2 = [];
for (var u3 = 0; u3 <= 10; u3++) {
var a5 = Math.PI / 2 - 0.45 + 0.9 * u3 / 10;
var r5 = whRAt(bp.R[2], a5) + 0.055 * s;
pts2.push(new THREE.Vector3(bp.O.x + Math.cos(a5) * r5, yC + 0.02 * s - 0.06 * s * Math.sin(u3 / 10 * Math.PI), bp.O.z + Math.sin(a5) * r5));
}
push(whTubeAlong(pts2, 0.008 * s, false), "gem", 0xC8601E, { allow: /^torso$/ });
}
}
else if (id === "beads" || id === "lei" || id === "torc" || id === "thread") {
var nt = whTube(D, whPts(D, TORSO), yC - 0.1 * s, yTop, 0.03, null, 0, 6), NRb = whNeckR(D, yN);
if (!nt)
return;
var mk = function (drop, out, rad, kind, cc) { var pts3 = []; for (var u4 = 0; u4 <= 36; u4++) {
var a6 = u4 / 36 * Math.PI * 2, f2 = Math.max(0, Math.sin(a6)), rr3 = whRAt(NRb.R, a6) * (1 - f2 * 0.4) + (whRAt(nt.R[nt.R.length - 1], a6)) * f2 * 0.4 + out * s;
pts3.push(new THREE.Vector3(NRb.cx + Math.cos(a6) * rr3, yN - 0.01 * s - drop * s * f2, NRb.cz + Math.sin(a6) * rr3));
} pts3.pop(); push(whTubeAlong(pts3, rad * s, true), kind, cc, { allow: /^(torso|neck)$/ }); };
if (id === "torc") {
mk(0.0, 0.02, 0.012, "gold", "dgc4");
}
else if (id === "lei") {
mk(0.1, 0.035, 0.03, "feather", 0xE8606A);
}
else if (id === "thread") {
var tt3 = whTube(D, whPts(D, TORSO), yW - 0.05 * s, yTop, 0.02, null, 0, 10);
if (tt3) {
var pts4 = [];
for (var u5 = 0; u5 <= 48; u5++) {
var a7 = u5 / 48 * Math.PI * 2, hi2 = (1 + Math.cos(a7)) / 2, y7 = yW + (yTop - 0.02 * s - yW) * hi2, t7 = (y7 - tt3.O.y) / tt3.L, row7 = Math.max(0, Math.min(tt3.R.length - 1, Math.round(t7 * (tt3.R.length - 1)))), r7 = whRAt(tt3.R[row7], a7) + 0.026 * s;
pts4.push(new THREE.Vector3(tt3.O.x + Math.cos(a7) * r7, y7, tt3.O.z + Math.sin(a7) * r7));
}
pts4.pop();
push(whTubeAlong(pts4, 0.004 * s, true), "cloth", 0xF4F0E0, { allow: /^(torso|neck|upperarm_l)$/ });
}
}
else {
mk(0.06, 0.025, 0.01, o.jade ? "gem" : o.gold ? "gold" : o.coral ? "gem" : o.rudra ? "leather" : "gem", o.jade ? 0x2AAA7A : o.gold ? 0xD4A63E : o.coral ? 0xC84030 : o.rudra ? 0x5A2A1A : "dgc2");
mk(0.12, 0.03, 0.008, o.gold ? "gold" : "gem", o.gold ? 0xD4A63E : o.jade ? 0x2A8A5A : "dgc3");
}
}
else if (id === "bands") {
["l", "r"].forEach(function (sd) {
var U = whLimb(D, "upperarm_" + sd, "lowerarm_" + sd, new RegExp("^upperarm_" + sd + "$"), 0.3, 0.42, 0.008, null, null, 0.03);
if (U)
push(U.geo, "gold", "dgc4", U.sk);
var W2 = whLimb(D, "lowerarm_" + sd, "hand_" + sd, new RegExp("^lowerarm_" + sd + "$"), 0.82, 0.94, 0.008, null, null, 0.024);
if (W2)
push(W2.geo, "gold", "dgc4", W2.sk);
});
}
else if (id === "trousers") {
["l", "r"].forEach(function (sd) {
var Lg = whLimb(D, "thigh_" + sd, "calf_" + sd, new RegExp("^thigh_" + sd + "$"), -0.05, 1.02, 0.012, null, null, 0.04);
if (Lg)
push(Lg.geo, "cloth", c, Lg.sk);
var Cg = whLimb(D, "calf_" + sd, "foot_" + sd, new RegExp("^calf_" + sd + "$"), -0.04, 0.98, 0.012, null, null, 0.032);
if (Cg)
push(Cg.geo, "cloth", c, Cg.sk);
});
}
else if (id === "ribbon" && tops) {
["l", "r"].forEach(function (sd) { var U = whLimb(D, "lowerarm_" + sd, "hand_" + sd, new RegExp("^lowerarm_" + sd + "$"), 0.2, 0.95, 0.05, function (t) { return 0.06 * s * t; }, [Math.PI * 0.1, Math.PI * 0.9], 0.03); if (U)
push(U.geo, "silk", c, U.sk); });
}
});
return P;
},
function (m) {
var H = m.geometry;
if (H.userData.dgxWhole)
return H.userData.dgxWhole;
var src = null;
try {
Object.keys(HDF.files).forEach(function (f) { var F = HDF.files[f]; if (!src && F && F.scene)
F.scene.traverse(function (o) { if (!src && o.isSkinnedMesh && o.geometry && o.geometry.userData.hdfHead === H)
src = o.geometry; }); });
}
catch (e) { }
return src ? (H.userData.dgxWhole = src) : null;
},
function (G, col) {
var wm = dgxMat("stripes", col || "#1A1A24/#2A4A9A");
var back = new THREE.Mesh(new THREE.SphereGeometry(0.122, 18, 12, Math.PI * 0.95, Math.PI * 1.1, 0, Math.PI * 0.72), wm);
back.material.side = THREE.DoubleSide;
back.position.set(0, 0.0, -0.025);
back.scale.set(1, 1.06, 1);
G.add(back);
[-1, 1].forEach(function (sd) { dgxBox(G, wm, new THREE.Vector3(sd * 0.1, -0.14, 0.03), 0.065, 0.24, 0.04, 0.08, 0, sd * -0.06); });
return wm;
},
function (G, p, col) {
dgxBall(G, dgxMat("pearl", 0xF2EEE0), p, 0.018, 1, 0.75, 0.5);
dgxBall(G, dgxMat("lacquer", col || 0x14100C), p.clone().add(new THREE.Vector3(0, 0, 0.006)), 0.01, 1, 1, 0.5);
dgxBox(G, dgxMat("lacquer", 0x14100C), p.clone().add(new THREE.Vector3(p.x > 0 ? 0.02 : -0.02, -0.006, 0.0)), 0.03, 0.004, 0.004, 0, 0, p.x > 0 ? -0.25 : 0.25);
},
function () {
var G = new THREE.Group(), f = dgxMat("feather", 0x6A5238), w = dgxMat("leaf", 0xE8DCC0);
dgxWigBack(G);
dgxEgg(G, f, new THREE.Vector3(0, 0.01, 0), 0.12, 0.13, 0.13);
dgxEgg(G, w, new THREE.Vector3(0, -0.03, 0.06), 0.08, 0.08, 0.08);
G.add(dgxTaper([new THREE.Vector3(0, 0.015, 0.11), new THREE.Vector3(0, 0.01, 0.16), new THREE.Vector3(0, -0.02, 0.185), new THREE.Vector3(0, -0.045, 0.17)], 0.026, 0.004, dgxMat("horn", 0x2A2420), 8));
[-1, 1].forEach(function (sd) { dgxEye(G, new THREE.Vector3(sd * 0.06, 0.03, 0.09)); dgxBox(G, dgxMat("lacquer", 0x2A2018), new THREE.Vector3(sd * 0.065, -0.01, 0.085), 0.012, 0.05, 0.006, 0, 0, 0); });
return G;
},
function () {
var G = new THREE.Group(), b = dgxMat("leaf", 0x1C1C20);
dgxWigBack(G);
dgxEgg(G, b, new THREE.Vector3(0, 0.01, 0), 0.1, 0.11, 0.12);
G.add(dgxTaper([new THREE.Vector3(0, 0.0, 0.09), new THREE.Vector3(0, -0.03, 0.2), new THREE.Vector3(0, -0.1, 0.3), new THREE.Vector3(0, -0.2, 0.33)], 0.022, 0.004, dgxMat("horn", 0x1A1A1E), 8));
[-1, 1].forEach(function (sd) { dgxEye(G, new THREE.Vector3(sd * 0.055, 0.03, 0.075)); });
return G;
},
function () {
var G = new THREE.Group(), k = dgxMat("leaf", 0x15151A);
dgxWigBack(G);
dgxEgg(G, k, new THREE.Vector3(0, 0.02, -0.01), 0.11, 0.11, 0.12);
G.add(dgxTaper([new THREE.Vector3(0, 0.0, 0.07), new THREE.Vector3(0, -0.02, 0.16), new THREE.Vector3(0, -0.035, 0.24)], 0.055, 0.018, k, 10));
dgxBall(G, dgxMat("lacquer", 0x050505), new THREE.Vector3(0, -0.03, 0.245), 0.014);
[-1, 1].forEach(function (sd) { G.add(dgxTaper([new THREE.Vector3(sd * 0.05, 0.09, -0.02), new THREE.Vector3(sd * 0.065, 0.19, -0.04), new THREE.Vector3(sd * 0.07, 0.28, -0.05)], 0.035, 0.003, k, 4)); dgxEye(G, new THREE.Vector3(sd * 0.05, 0.04, 0.085), 0x8A6A1A); });
return G;
},
function () {
var G = new THREE.Group(), fur = dgxMat("fur", 0xC0904A);
dgxWigBack(G, "#8A5A2A/#C0904A");
dgxEgg(G, fur, new THREE.Vector3(0, 0.01, 0), 0.13, 0.13, 0.13);
dgxEgg(G, fur, new THREE.Vector3(0, -0.03, 0.09), 0.07, 0.06, 0.07);
dgxBall(G, dgxMat("lacquer", 0x3A2418), new THREE.Vector3(0, -0.01, 0.155), 0.016, 1.2, 0.8, 0.7);
[-1, 1].forEach(function (sd) { dgxEgg(G, fur, new THREE.Vector3(sd * 0.08, 0.12, -0.01), 0.03, 0.035, 0.015); dgxEye(G, new THREE.Vector3(sd * 0.05, 0.04, 0.11), 0x9A7A1A); });
return G;
},
function () {
var G = new THREE.Group(), c = dgxMat("fur", 0x1A1A1E);
dgxEgg(G, c, new THREE.Vector3(0, 0.01, 0), 0.11, 0.11, 0.11);
dgxEgg(G, c, new THREE.Vector3(0, -0.03, 0.08), 0.05, 0.04, 0.05);
[-1, 1].forEach(function (sd) { G.add(dgxTaper([new THREE.Vector3(sd * 0.06, 0.08, 0), new THREE.Vector3(sd * 0.075, 0.17, -0.01)], 0.035, 0.004, c, 4)); dgxEye(G, new THREE.Vector3(sd * 0.045, 0.035, 0.09), 0x5AA040); });
dgxBall(G, dgxMat("gold"), new THREE.Vector3(0.11, -0.03, 0.0), 0.012);
return G;
},
function () {
var G = new THREE.Group(), g = dgxMat("scales", 0x3E5A34);
dgxWigBack(G);
dgxEgg(G, g, new THREE.Vector3(0, 0.02, -0.01), 0.1, 0.09, 0.11);
G.add(dgxTaper([new THREE.Vector3(0, 0.0, 0.07), new THREE.Vector3(0, -0.015, 0.2), new THREE.Vector3(0, -0.02, 0.32)], 0.05, 0.03, g, 8));
[-1, 1].forEach(function (sd) { dgxBall(G, g, new THREE.Vector3(sd * 0.04, 0.08, 0.06), 0.025); dgxEye(G, new THREE.Vector3(sd * 0.04, 0.09, 0.075), 0xC8A020); });
return G;
},
function () {
var G = new THREE.Group(), h = dgxMat("leaf", 0x7A6A6A);
dgxWigBack(G);
dgxEgg(G, h, new THREE.Vector3(0, 0.0, 0), 0.13, 0.12, 0.14);
dgxEgg(G, h, new THREE.Vector3(0, -0.04, 0.12), 0.12, 0.08, 0.09);
[-1, 1].forEach(function (sd) { dgxBall(G, h, new THREE.Vector3(sd * 0.07, 0.11, -0.02), 0.025); dgxEye(G, new THREE.Vector3(sd * 0.06, 0.06, 0.09)); });
return G;
},
function () {
var G = new THREE.Group(), r = dgxMat("leaf", 0x8A3A2A);
dgxWigBack(G);
dgxEgg(G, r, new THREE.Vector3(0, 0.01, 0), 0.1, 0.11, 0.11);
G.add(dgxTaper([new THREE.Vector3(0, 0.0, 0.07), new THREE.Vector3(0, -0.04, 0.17), new THREE.Vector3(0, -0.09, 0.24)], 0.04, 0.012, r, 8));
[-1, 1].forEach(function (sd) { dgxBox(G, r, new THREE.Vector3(sd * 0.04, 0.18, -0.03), 0.04, 0.16, 0.015, 0, 0, 0); dgxEye(G, new THREE.Vector3(sd * 0.05, 0.04, 0.08)); });
return G;
}
];
});
