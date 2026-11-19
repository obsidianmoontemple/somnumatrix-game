/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var HATF = { mats: {}, list: { cap: 1, brimmed: 1, beanie: 1, bandana: 1, tophat: 1, cowboy: 1, wizard: 1, witch: 1, helmet: 1, flowercrown: 1, tiara: 1, crown: 1, vinecrown: 1, jester: 1 } };
function hfTex(key, w, h, fn) { if (HATF.mats["t:" + key])
return HATF.mats["t:" + key]; var c = document.createElement("canvas"); c.width = w; c.height = h; fn(c.getContext("2d"), w, h); var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; HATF.mats["t:" + key] = t; return t; }
function hfRnd(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function hfCloth(col, kind) {
var k = kind + ":" + col;
if (HATF.mats[k])
return HATF.mats[k];
var tex = kind === "knit" ? hfTex("knit2", 256, 256, function (x, W, H) {
var R = hfRnd(7);
x.fillStyle = "#A4A4A4";
x.fillRect(0, 0, W, H);
var cw = W / 32, rh = H / 40;
for (var r = 0; r < 40; r++)
for (var c = 0; c < 32; c++) {
var cx = c * cw + cw / 2, cy = r * rh, v = 0.85 + R() * 0.15;
[-1, 1].forEach(function (sd) {
x.save();
x.translate(cx + sd * cw * 0.22, cy + rh * 0.55);
x.rotate(sd * 0.55);
var g = x.createLinearGradient(-cw * 0.3, 0, cw * 0.3, 0);
g.addColorStop(0, "rgba(150,150,150,1)");
g.addColorStop(0.5, "rgba(" + Math.round(255 * v) + "," + Math.round(255 * v) + "," + Math.round(255 * v) + ",1)");
g.addColorStop(1, "rgba(140,140,140,1)");
x.fillStyle = g;
x.beginPath();
x.ellipse(0, 0, cw * 0.26, rh * 0.78, 0, 0, Math.PI * 2);
x.fill();
x.restore();
});
}
for (var c2 = 0; c2 < 32; c2++) {
x.fillStyle = "rgba(0,0,0,.14)";
x.fillRect(c2 * cw - 0.6, 0, 1.2, H);
}
for (var i = 0; i < 1800; i++) {
x.fillStyle = "rgba(255,255,255," + (R() * 0.08) + ")";
x.fillRect(R() * W, R() * H, 1, 1);
}
})
: kind === "felt" ? hfTex("felt2", 256, 256, function (x, W, H) {
var R = hfRnd(11);
x.fillStyle = "#EDEDED";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 60; i++) {
var gx = R() * W, gy = R() * H, gr = 10 + R() * 30, g = x.createRadialGradient(gx, gy, 0, gx, gy, gr);
var d = R() < 0.5;
g.addColorStop(0, d ? "rgba(0,0,0,.035)" : "rgba(255,255,255,.05)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
}
x.lineWidth = 0.6;
for (var j = 0; j < 5000; j++) {
var fx = R() * W, fy = R() * H, an = R() * Math.PI * 2, ln = 1 + R() * 3;
x.strokeStyle = R() < 0.5 ? "rgba(0,0,0," + (0.03 + R() * 0.04) + ")" : "rgba(255,255,255," + (0.04 + R() * 0.06) + ")";
x.beginPath();
x.moveTo(fx, fy);
x.lineTo(fx + Math.cos(an) * ln, fy + Math.sin(an) * ln);
x.stroke();
}
})
: kind === "paisley" ? hfTex("paisley", 128, 128, function (x, W, H) { x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H); x.strokeStyle = "rgba(255,255,255,0)"; for (var i = 0; i < 14; i++) {
var px = (i * 37) % W, py = (i * 53) % H;
x.fillStyle = "rgba(20,10,10,.55)";
x.beginPath();
x.ellipse(px, py, 9, 5, i, 0, 6.3);
x.fill();
x.fillStyle = "rgba(255,250,235,.9)";
x.beginPath();
x.ellipse(px, py, 5, 2.5, i, 0, 6.3);
x.fill();
x.fillStyle = "rgba(20,10,10,.6)";
x.beginPath();
x.arc(px + 12, py + 6, 1.8, 0, 6.3);
x.fill();
} })
: hfTex(kind === "weave" ? "twill2s" : "twill2", 256, 256, function (x, W, H) {
var R = hfRnd(5);
x.fillStyle = "#E6E6E6";
x.fillRect(0, 0, W, H);
x.lineWidth = 1;
for (var i = -H; i < W; i += 3) {
x.strokeStyle = "rgba(0,0,0,.07)";
x.beginPath();
x.moveTo(i, H);
x.lineTo(i + H * 0.6, 0);
x.stroke();
x.strokeStyle = "rgba(255,255,255,.12)";
x.beginPath();
x.moveTo(i + 1.4, H);
x.lineTo(i + 1.4 + H * 0.6, 0);
x.stroke();
}
for (var j = 0; j < 1500; j++) {
x.fillStyle = "rgba(0,0,0," + (R() * 0.05) + ")";
x.fillRect(R() * W, R() * H, 1, 1);
}
if (kind === "weave")
[0, W / 2].forEach(function (sx) {
x.fillStyle = "rgba(0,0,0,.28)";
x.fillRect(sx - 1, 0, 2, H);
x.fillStyle = "rgba(255,255,255,.18)";
x.fillRect(sx + 1, 0, 1, H);
for (var y = 2; y < H; y += 5) {
x.fillStyle = "rgba(0,0,0,.22)";
x.fillRect(sx + 4, y, 1, 3);
x.fillRect(sx - 5, y, 1, 3);
}
});
});
var m = kind === "paisley" ? new THREE.MeshLambertMaterial({ color: col, map: tex, side: THREE.DoubleSide })
: new THREE.MeshPhongMaterial({ color: col, map: tex, bumpMap: tex, bumpScale: kind === "knit" ? 0.012 : 0.003, shininess: kind === "felt" ? 14 : 6, specular: kind === "felt" ? 0x2A2A2A : 0x161616, side: THREE.DoubleSide });
HATF.mats[k] = m;
return m;
}
function hfMat(k) {
if (HATF.mats[k])
return HATF.mats[k];
var m = { gold: new THREE.MeshPhongMaterial({ color: 0xD4A63E, shininess: 110, specular: 0xFFE9B0, emissive: 0x2A1A00, side: THREE.DoubleSide }),
silver: new THREE.MeshPhongMaterial({ color: 0xDCE2EA, shininess: 120, specular: 0xFFFFFF, emissive: 0x101418, side: THREE.DoubleSide }),
steel: new THREE.MeshPhongMaterial({ color: 0x56606E, shininess: 100, specular: 0xD8E0EA, emissive: 0x05070A, side: THREE.DoubleSide }),
leather: new THREE.MeshPhongMaterial({ color: 0x4A2E1C, shininess: 30, specular: 0x403020, side: THREE.DoubleSide }),
satin: new THREE.MeshPhongMaterial({ color: 0x18181C, shininess: 80, specular: 0x606070, side: THREE.DoubleSide }),
velvet: new THREE.MeshLambertMaterial({ color: 0x8A1428, side: THREE.DoubleSide }),
leaf: new THREE.MeshLambertMaterial({ color: 0x3E8A3A, side: THREE.DoubleSide }),
ruby: new THREE.MeshPhongMaterial({ color: 0xD02040, shininess: 150, specular: 0xFFFFFF, emissive: 0x400810, flatShading: true }),
sapphire: new THREE.MeshPhongMaterial({ color: 0x3A70E0, shininess: 150, specular: 0xFFFFFF, emissive: 0x0A1840, flatShading: true }),
emerald: new THREE.MeshPhongMaterial({ color: 0x2AB070, shininess: 150, specular: 0xFFFFFF, emissive: 0x083018, flatShading: true }),
pearl: new THREE.MeshPhongMaterial({ color: 0xF4F0EA, shininess: 120, specular: 0xFFFFFF }) }[k];
HATF.mats[k] = m;
return m;
}
function hfHead(E) {
var root = E.model, body = E.g.children[0], hb = null;
root.traverse(function (o) { if (!hb && o.isBone && /^head$/i.test(o.name))
hb = o; });
if (!hb || !body)
return null;
body.updateMatrixWorld(true);
root.updateMatrixWorld(true);
var G = rlFitFrame(hb, body), inv = new THREE.Matrix4().copy(G.matrixWorld).invert(), pts = [], face = [], eyes = [], v = new THREE.Vector3(), acc = new THREE.Vector3(), tv = new THREE.Vector3(), mt = new THREE.Matrix4();
root.traverse(function (m) {
if (!m.isSkinnedMesh || !m.visible)
return;
var g = m.geometry, P = g.attributes.position, SI = g.attributes.skinIndex, SW = g.attributes.skinWeight;
if (!P || !SI || !SW)
return;
var bones = m.skeleton.bones, hi = bones.indexOf(hb);
if (hi < 0)
return;
var hset = {};
bones.forEach(function (bn, ix) { for (var o = bn; o; o = o.parent) {
if (o === hb) {
hset[ix] = 1;
break;
}
if (o.isBone !== true)
break;
} });
var isEye = /^eyes?$/i.test(m.name || "");
var skin = !m.userData.hdfHair && !/hood|hat|helm|hair|cap|mask/i.test(m.name || "");
for (var i = 0; i < P.count; i++) {
var bi = 0, bw = -1;
for (var k = 0; k < 4; k++) {
var w = rlC(SW, i, k);
if (w > bw) {
bw = w;
bi = rlC(SI, i, k);
}
}
if (!hset[bi])
continue;
v.fromBufferAttribute(P, i).applyMatrix4(m.bindMatrix);
acc.set(0, 0, 0);
for (var k2 = 0; k2 < 4; k2++) {
var w2 = rlC(SW, i, k2);
if (!w2)
continue;
var b = bones[rlC(SI, i, k2)];
if (!b)
continue;
mt.multiplyMatrices(b.matrixWorld, m.skeleton.boneInverses[rlC(SI, i, k2)]);
acc.addScaledVector(tv.copy(v).applyMatrix4(mt), w2);
}
var q = acc.clone().applyMatrix4(inv);
pts.push(q);
if (skin)
face.push(q);
if (isEye)
eyes.push(q);
}
});
if (pts.length < 30) {
hb.remove(G);
return null;
}
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
var H = { G: G, hb: hb, pts: pts, face: face, eyes: eyes, ymax: ymax, ymin: ymin, cx: cx, cz: cz };
H.ring = function (y, NA) {
NA = NA || 32;
var R = [];
for (var j = 0; j < NA; j++)
R.push(0);
pts.forEach(function (p) { if (Math.abs(p.y - y) > 0.02)
return; var dx = p.x - cx, dz = p.z - cz, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx), b = Math.round((a / (Math.PI * 2) + 1) * NA) % NA; for (var e = -1; e <= 1; e++) {
var bb = (b + e + NA) % NA;
if (r > R[bb])
R[bb] = r;
} });
var mx = Math.max.apply(null, R);
for (var j2 = 0; j2 < NA; j2++)
if (R[j2] < mx * 0.6)
R[j2] = mx * 0.85;
for (var s = 0; s < 2; s++)
R = R.map(function (r, j) { return Math.max(r, (R[(j + NA - 1) % NA] + 2 * r + R[(j + 1) % NA]) / 4); });
return R;
};
H.at = function (R, a) { var NA = R.length, f = ((a / (Math.PI * 2)) % 1 + 1) % 1 * NA, j = Math.floor(f), k = f - j; return R[j % NA] * (1 - k) + R[(j + 1) % NA] * k; };
return H;
}
function hfGeo(pos, idx, uv) { var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); if (uv)
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); return g; }
function hfLoft(H, rings, apex, uvs) {
var NA = 40, pos = [], uv = [], idx = [];
rings.forEach(function (rg, i) { for (var j = 0; j <= NA; j++) {
var a = j / NA * Math.PI * 2, q = rg(a);
pos.push(H.cx + Math.cos(a) * q.r + (q.dx || 0), q.y, H.cz + Math.sin(a) * q.r + (q.dz || 0));
uv.push(j / NA * (uvs || 3), i / (rings.length - 1 || 1));
} });
for (var i = 0; i < rings.length - 1; i++)
for (var j = 0; j < NA; j++) {
var a0 = i * (NA + 1) + j, c0 = a0 + NA + 1;
idx.push(a0, c0, a0 + 1, a0 + 1, c0, c0 + 1);
}
if (apex) {
var ai = pos.length / 3;
pos.push(apex.x, apex.y, apex.z);
uv.push(0.5, 1);
var l = (rings.length - 1) * (NA + 1);
for (var j2 = 0; j2 < NA; j2++)
idx.push(l + j2, ai, l + j2 + 1);
}
return hfGeo(pos, idx, uv);
}
function hfHull(R) {
var n = R.length, M = [], O = [];
for (var j = 0; j < n; j++) {
var m = 0;
for (var d = -2; d <= 2; d++)
m = Math.max(m, R[(j + d + n) % n]);
M.push(m);
}
for (var k = 0; k < n; k++) {
var sm = 0, w = 0;
for (var e = -3; e <= 3; e++) {
var f = 4 - Math.abs(e);
sm += M[(k + e + n) % n] * f;
w += f;
}
O.push(Math.max(R[k], sm / w));
}
return O;
}
function hfDome(H, y0, gap, steps, shape, rise) {
var rs = [], up = rise == null ? 0.02 : rise, apexY = H.ymax + gap + up, Rb = hfHull(H.ring(y0 + 0.004)), N = Math.max(steps, 9);
for (var i = 0; i < N; i++) {
(function (i) {
var t = i / N, ang = t * Math.PI / 2, y = y0 + (apexY - y0) * Math.sin(ang), Rm = hfHull(H.ring(Math.min(H.ymax - 0.004, y)));
rs.push(function (a) { var base = H.at(Rb, a) + gap, ell = base * Math.cos(ang), meas = H.at(Rm, a) + gap * 0.6; var r = Math.max(ell, y < H.ymax - 0.01 ? meas * (1 - 0.35 * t * t) : 0); if (shape)
r = shape(r, a, t); return { r: r, y: y }; });
})(i);
}
return hfLoft(H, rs, new THREE.Vector3(H.cx, apexY, H.cz));
}
function hfRim(H, R, y, gap, rad, mat, a0, a1) { var pts = [], n = 48; for (var k = 0; k <= n; k++) {
var a = a0 != null ? a0 + (a1 - a0) * k / n : k / n * Math.PI * 2;
var r = H.at(R, a) + gap;
pts.push(new THREE.Vector3(H.cx + Math.cos(a) * r, typeof y === "function" ? y(a) : y, H.cz + Math.sin(a) * r));
} return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, a0 == null), n * 2, rad, 6, a0 == null), mat); }
function hfBrim(H, R, y, gap, w, up, mat, thick) {
var NA = 48, NR = 4, pos = [], idx = [], uv = [];
for (var i = 0; i <= NR; i++) {
var f = i / NR;
for (var j = 0; j <= NA; j++) {
var a = j / NA * Math.PI * 2, r = H.at(R, a) + gap + w(a) * f, yy = y + up(a) * f * f;
pos.push(H.cx + Math.cos(a) * r, yy, H.cz + Math.sin(a) * r);
uv.push(j / NA * 4, f);
}
}
for (var i2 = 0; i2 < NR; i2++)
for (var j2 = 0; j2 < NA; j2++) {
var a0 = i2 * (NA + 1) + j2, c0 = a0 + NA + 1;
idx.push(a0, c0, a0 + 1, a0 + 1, c0, c0 + 1);
}
var g = hfGeo(pos, idx, uv), m = new THREE.Mesh(g, mat);
var grp = new THREE.Group();
grp.add(m);
if (thick) {
var m2 = new THREE.Mesh(g, mat);
m2.position.y = -thick;
grp.add(m2);
var edge = [];
for (var k = 0; k <= NA; k++) {
var a2 = k / NA * Math.PI * 2, r2 = H.at(R, a2) + gap + w(a2);
edge.push(new THREE.Vector3(H.cx + Math.cos(a2) * r2, y + up(a2) - thick / 2, H.cz + Math.sin(a2) * r2));
}
grp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edge, true), NA * 2, thick * 0.6, 5, true), mat));
}
return grp;
}
function hfGem(G, mat, p, n, s) { var o = new THREE.Mesh(new THREE.OctahedronGeometry(s, 0), mat); o.scale.set(1, 1.2, 0.6); o.position.copy(p); o.lookAt(p.clone().add(n)); G.add(o); return o; }
function hfPt(H, R, a, y, gap) { var r = H.at(R, a) + (gap || 0); return new THREE.Vector3(H.cx + Math.cos(a) * r, y, H.cz + Math.sin(a) * r); }
function hfOut(a) { return new THREE.Vector3(Math.cos(a), 0, Math.sin(a)); }
var HF_FRONT = Math.PI / 2, HF_BACK = Math.PI * 1.5;
function hfBandTop(H) {
var b = hfBandTop0(H);
return isFinite(H.ymin) ? Math.max(b, Math.min(H.ymin + 0.245, b + 0.04)) : b;
}
function hfBandTop0(H) {
var sk = -1e9;
(H.face || []).forEach(function (p) { if (p.y > sk)
sk = p.y; });
if (!(sk > -1e8) || (H.face || []).length < 60)
return H.ymax;
if (H.ymax - sk > 0.045)
return H.ymax - 0.02;
return Math.max(H.ymax - 0.02, Math.min(H.ymax, sk + 0.01));
}
var HF_CIRC = { crown: 1, tiara: 1, vinecrown: 1, flowercrown: 1 };
function hfSeat(H) { return __ZC(198, 0, this, arguments, new.target); }
function hfMerge(list) { return __ZC(198, 1, this, arguments, new.target); }
function hfBatch() {
var M = [];
return {
put: function (mat, geo, mx) { var e = null; for (var i = 0; i < M.length; i++)
if (M[i].m === mat)
e = M[i]; if (!e) {
e = { m: mat, l: [] };
M.push(e);
} e.l.push([geo, mx || new THREE.Matrix4()]); },
done: function (G) { M.forEach(function (e) { G.add(new THREE.Mesh(hfMerge(e.l), e.m)); }); }
};
}
function hfFrame(p, yd, zh, sx, sy, sz) {
var y = yd.clone().normalize(), z = zh.clone().addScaledVector(y, -zh.dot(y));
if (z.lengthSq() < 1e-8)
z.set(0, 0, 1);
z.normalize();
var x = new THREE.Vector3().crossVectors(y, z);
return new THREE.Matrix4().makeBasis(x, y, z).scale(new THREE.Vector3(sx, sy == null ? sx : sy, sz == null ? sx : sz)).setPosition(p);
}
function hfM(key, make) { return HATF.mats["c:" + key] || (HATF.mats["c:" + key] = make()); }
function hfUnit(k) { return hfM("g" + k, function () { return k === "ball" ? new THREE.SphereGeometry(1, 10, 8) : k === "oct" ? new THREE.OctahedronGeometry(1, 0) : k === "ring" ? new THREE.TorusGeometry(1, 0.24, 5, 14) : new THREE.BoxGeometry(1, 1, 1); }); }
function hfLeafGeo(kind) { return __ZC(198, 2, this, arguments, new.target); }
function hfLeafTex() { return __ZC(198, 3, this, arguments, new.target); }
function hfPetalTex() { return __ZC(198, 4, this, arguments, new.target); }
function hfCirclet(H, G, hat, col) { return __ZC(198, 5, this, arguments, new.target); }
function hfMake(E, hat, L) {
var H = hfHead(E);
if (!H)
return null;
var G = H.G, top = H.ymax, col = (L && L.hatColor != null) ? L.hatColor : null;
var bt = hfBandTop(H);
if (E && E.rbPreTop != null)
bt = Math.max(bt, Math.min(E.rbPreTop - 0.02, bt + 0.04));
function add(o) { G.add(o); return o; }
if (HF_CIRC[hat])
hfCirclet(H, G, hat, col);
else if (hat === "cap") {
var c = hfCloth(col != null ? col : 0x2A4A8A, "weave"), y0 = bt - 0.1;
add(new THREE.Mesh(hfDome(H, y0, 0.012, 6, null, 0.012), c));
var R = H.ring(y0 + 0.004);
add(hfRim(H, R, y0 + 0.004, 0.013, 0.006, hfCloth(col != null ? col : 0x2A4A8A, "felt")));
var btn = add(new THREE.Mesh(new THREE.SphereGeometry(0.011, 10, 6), c));
btn.position.set(H.cx, top + 0.026, H.cz);
var bill = hfBrim(H, R, y0 + 0.004, 0.012, function (a) { var d = Math.cos(a - HF_FRONT); return d > 0.35 ? 0.085 * Math.pow((d - 0.35) / 0.65, 0.6) : 0; }, function (a) { var d = Math.cos(a - HF_FRONT); return d > 0.35 ? -0.012 : 0; }, hfCloth(col != null ? col : 0x2A4A8A, "twill"), 0.004);
add(bill);
var st = add(new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.014, 0.006), hfMat("silver")));
st.position.copy(hfPt(H, R, HF_BACK, y0 + 0.012, 0.016));
}
else if (hat === "beanie") {
var kn = hfCloth(col != null ? col : 0x8A2A2A, "knit"), y1 = bt - 0.118;
add(new THREE.Mesh(hfDome(H, y1, 0.014, 7, function (r, a, t) { return r + 0.006 * Math.sin(t * Math.PI); }, 0.03), kn));
var R1 = H.ring(y1 + 0.02);
var cuff = [[-0.003, 0.006], [0.002, 0.016], [0.008, 0.019], [0.036, 0.019], [0.043, 0.012]].map(function (q) { return function (a) { return { r: H.at(R1, a) + q[1], y: y1 + q[0] }; }; });
add(new THREE.Mesh(hfLoft(H, cuff, null, 3), hfCloth(col != null ? col : 0x8A2A2A, "knit")));
}
else if (hat === "bandana") {
var bc = hfCloth(col != null ? col : 0xA82A2A, "paisley"), y2 = bt - 0.1;
add(new THREE.Mesh(hfDome(H, y2, 0.007, 6, null, 0.006), bc));
var R2 = H.ring(y2 + 0.003);
add(hfRim(H, R2, function (a) { return y2 + 0.004 + 0.012 * Math.max(0, Math.cos(a - HF_FRONT)); }, 0.009, 0.006, bc));
var kp = hfPt(H, R2, HF_BACK, y2 + 0.01, 0.02);
var knot = add(new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), bc));
knot.position.copy(kp);
knot.scale.set(1.2, 0.8, 0.8);
[-1, 1].forEach(function (sx) {
var tail = new THREE.Shape();
tail.moveTo(-0.018, 0);
tail.lineTo(0.018, 0);
tail.lineTo(0.026, -0.11);
tail.lineTo(0.004, -0.095);
tail.lineTo(-0.014, -0.12);
tail.closePath();
var tm = add(new THREE.Mesh(new THREE.ShapeGeometry(tail), bc));
tm.position.copy(kp).add(new THREE.Vector3(sx * 0.012, -0.005, -0.012));
tm.rotation.set(0.35, Math.PI, sx * 0.25);
});
}
else if (hat === "tophat" || hat === "brimmed" || hat === "cowboy") {
var felt = hfCloth(col != null ? col : (hat === "tophat" ? 0x18181C : hat === "cowboy" ? 0x7A5236 : 0x4A4036), "felt");
var yb = bt - (hat === "tophat" ? 0.085 : 0.09), Rb = H.ring(yb + 0.005), Rt = H.ring(Math.min(top - 0.01, yb + 0.04));
var Rmax = Rb.map(function (r, j) { return Math.max(r, Rt[j]); });
var hgt = hat === "tophat" ? 0.2 : hat === "cowboy" ? 0.14 : 0.13, gap = 0.012;
var crownTop = Math.max(top + 0.02, yb + hgt);
var rings = [];
for (var i = 0; i <= 6; i++) {
(function (i) {
var t = i / 6, y = yb + (crownTop - yb) * t;
rings.push(function (a) {
var r = H.at(Rmax, a) + gap;
if (hat === "tophat")
r *= 1 + 0.07 * t;
else {
var fr = Math.abs(Math.cos(a - HF_FRONT));
r *= 1 - 0.1 * t * t - (t > 0.6 ? 0.06 * (t - 0.6) / 0.4 * Math.pow(Math.max(0, Math.sin(a - HF_FRONT)), 2) * 0 : 0);
if (t > 0.75)
r *= 1 - 0.08 * ((t - 0.75) / 0.25) * fr;
}
return { r: r, y: y };
});
})(i);
}
var apex = new THREE.Vector3(H.cx, crownTop - (hat === "tophat" ? 0 : 0.03), H.cz);
if (hat !== "tophat")
rings.push(function (a) { var r = H.at(Rmax, a) + gap; return { r: r * 0.45 * (0.6 + 0.4 * Math.abs(Math.sin(a))), y: crownTop - 0.02 - 0.012 * Math.abs(Math.cos(a - HF_FRONT)) }; });
else
rings.push(function (a) { return { r: (H.at(Rmax, a) + gap) * 0.5, y: crownTop }; });
add(new THREE.Mesh(hfLoft(H, rings, apex), felt));
var bandM = hat === "cowboy" ? hfMat("leather") : hfMat("satin");
var band = [];
for (var i3 = 0; i3 <= 3; i3++) {
(function (i3) { var y = yb + 0.004 + i3 * 0.011; band.push(function (a) { var t = (y - yb) / (crownTop - yb); var r = (H.at(Rmax, a) + gap) * (hat === "tophat" ? 1 + 0.07 * t : 1) + 0.002; return { r: r, y: y }; }); })(i3);
}
add(new THREE.Mesh(hfLoft(H, band, null, 6), bandM));
if (hat === "cowboy") {
var con = add(new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.004, 14), hfMat("silver")));
var cp = hfPt(H, Rmax, HF_FRONT, yb + 0.02, gap + 0.005);
con.position.copy(cp);
con.rotation.x = Math.PI / 2;
}
if (hat === "brimmed") {
var bow = add(new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.026, 0.008), bandM));
bow.position.copy(hfPt(H, Rmax, Math.PI * 1.1, yb + 0.02, gap + 0.004));
bow.lookAt(bow.position.clone().add(hfOut(Math.PI * 1.1)));
}
var bw = hat === "tophat" ? 0.055 : hat === "cowboy" ? 0.11 : 0.07;
var up = hat === "tophat" ? function (a) { return 0.022 * Math.pow(Math.cos(a), 2); } : hat === "cowboy" ? function (a) { return 0.06 * Math.pow(Math.cos(a), 2) - 0.008 * Math.pow(Math.sin(a), 2); } : function (a) { return 0.012 * Math.pow(Math.cos(a), 2) - 0.014 * Math.max(0, Math.sin(a - 0)) * 0; };
add(hfBrim(H, Rmax, yb, gap - 0.002, function () { return bw; }, up, felt, 0.005));
}
else if (hat === "wizard" || hat === "witch") {
var wc = hfCloth(col != null ? col : (hat === "wizard" ? 0x2A2A6A : 0x141418), "felt"), yw = bt - 0.08, Rw = H.ring(yw + 0.005), Rt2 = H.ring(Math.min(top - 0.01, yw + 0.035));
var Rm = Rw.map(function (r, j) { return Math.max(r, Rt2[j]); });
var hh = hat === "wizard" ? 0.44 : 0.4, rg = [];
for (var q = 0; q <= 10; q++) {
(function (q) {
var t = q / 10, bend = hat === "wizard" ? Math.pow(t, 2) * 0.12 : (t > 0.55 ? Math.pow((t - 0.55) / 0.45, 1.5) * 0.16 : 0) + t * 0.02;
rg.push(function (a) { return { r: (H.at(Rm, a) + 0.012) * Math.pow(1 - t, 1.15) + 0.004, y: yw + hh * t - (hat === "witch" && t > 0.6 ? (t - 0.6) * 0.08 : 0), dz: -bend }; });
})(q);
}
var tipY = yw + hh - (hat === "witch" ? 0.032 : 0) + 0.01, tip = new THREE.Vector3(H.cx, tipY, H.cz - (hat === "wizard" ? 0.125 : 0.18));
add(new THREE.Mesh(hfLoft(H, rg, tip), wc));
add(hfBrim(H, Rm, yw, 0.01, function () { return hat === "witch" ? 0.13 : 0.065; }, function (a) { return hat === "wizard" ? -0.01 : 0.004 * Math.cos(a * 2); }, wc, 0.004));
var bandW = [];
for (var b2 = 0; b2 <= 2; b2++) {
(function (b2) { var y = yw + 0.004 + b2 * 0.012; bandW.push(function (a) { var t = (y - yw) / hh; return { r: (H.at(Rm, a) + 0.012) * Math.pow(1 - t, 1.15) + 0.006, y: y }; }); })(b2);
}
add(new THREE.Mesh(hfLoft(H, bandW, null, 6), hat === "wizard" ? hfMat("gold") : new THREE.MeshLambertMaterial({ color: 0x5A2A7A, side: THREE.DoubleSide })));
if (hat === "witch") {
var bk = add(new THREE.Mesh(new THREE.TorusGeometry(0.016, 0.004, 4, 4), hfMat("silver")));
bk.position.copy(hfPt(H, Rm, HF_FRONT, yw + 0.016, 0.02));
bk.rotation.z = Math.PI / 4;
}
else {
var star = new THREE.Shape();
for (var p5 = 0; p5 < 10; p5++) {
var aa = p5 / 10 * Math.PI * 2, rr = p5 % 2 ? 0.006 : 0.015;
if (p5 === 0)
star.moveTo(Math.sin(aa) * rr, Math.cos(aa) * rr);
else
star.lineTo(Math.sin(aa) * rr, Math.cos(aa) * rr);
}
star.closePath();
var sg = new THREE.ShapeGeometry(star);
[[0.15, 0.4], [0.3, 1.2], [0.45, 2.2], [0.2, 3.3], [0.55, 4.4], [0.38, 5.5]].forEach(function (sp) {
var t = sp[0], a = sp[1], bend = Math.pow(t, 2) * 0.12, r = (H.at(Rm, a) + 0.012) * Math.pow(1 - t, 1.15) + 0.006;
var o = add(new THREE.Mesh(sg, hfMat("gold")));
o.position.set(H.cx + Math.cos(a) * r, yw + hh * t, H.cz + Math.sin(a) * r - bend);
o.lookAt(o.position.clone().add(hfOut(a)));
});
var moon = new THREE.Shape();
moon.absarc(0, 0, 0.022, Math.PI * 0.25, Math.PI * 1.75, false);
moon.absarc(0.01, 0, 0.017, Math.PI * 1.65, Math.PI * 0.35, true);
var mo = add(new THREE.Mesh(new THREE.ShapeGeometry(moon), hfMat("silver")));
var am = HF_FRONT, tm2 = 0.28, rm = (H.at(Rm, am) + 0.012) * Math.pow(1 - tm2, 1.15) + 0.007;
mo.position.set(H.cx, yw + hh * tm2, H.cz + rm - Math.pow(tm2, 2) * 0.12);
}
}
else if (hat === "helmet") {
var sm = col != null ? new THREE.MeshPhongMaterial({ color: col, shininess: 90, specular: 0xE8EEF4, side: THREE.DoubleSide }) : hfMat("steel"), yh = bt - 0.1;
add(new THREE.Mesh(hfDome(H, yh, 0.018, 7, null, 0.022), sm));
var Rh = H.ring(yh + 0.004);
add(hfRim(H, Rh, yh + 0.006, 0.02, 0.009, hfMat("gold")));
var nas = add(new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.062, 0.006), sm));
var np = hfPt(H, Rh, HF_FRONT, yh - 0.022, 0.016);
nas.position.copy(np);
nas.rotation.x = 0.12;
var crest = [];
for (var c3 = 0; c3 <= 12; c3++) {
var t3 = c3 / 12, a3 = HF_FRONT + Math.PI * t3, yy3 = yh + 0.02 + (top - yh) * Math.sin(t3 * Math.PI) * 0.98, Rr3 = H.ring(Math.min(top - 0.005, yy3));
var r3 = (Math.abs(Math.sin(t3 * Math.PI)) > 0.97 ? 0 : H.at(Rr3, a3) * Math.cos(t3 * Math.PI));
}
var cr = [];
for (var c4 = 0; c4 <= 16; c4++) {
var t4 = c4 / 16, ang = Math.PI * t4;
var z4 = Math.cos(ang), yy4 = yh + 0.03 + (top + 0.02 - yh - 0.03) * Math.sin(ang);
var Rr4 = H.ring(Math.min(top - 0.004, yy4));
var rz = (z4 >= 0 ? H.at(Rr4, HF_FRONT) : H.at(Rr4, HF_BACK)) * Math.abs(z4) + 0.024;
cr.push(new THREE.Vector3(H.cx, yy4 + 0.012 * Math.sin(ang), H.cz + (z4 >= 0 ? rz : -rz) * Math.min(1, Math.abs(z4) * 1.2)));
}
add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cr), 32, 0.008, 6, false), hfMat("gold")));
for (var rv = 0; rv < 14; rv++) {
var a5 = rv / 14 * Math.PI * 2;
var o5 = add(new THREE.Mesh(new THREE.SphereGeometry(0.005, 6, 4), hfMat("gold")));
o5.position.copy(hfPt(H, Rh, a5, yh + 0.022, 0.021));
}
}
else if (hat === "jester") {
var jc = [col != null ? col : 0x8A1A9A, 0xE8B020, 0x2A6AC8], yj = bt - 0.075, Rj = H.ring(yj);
add(hfRim(H, Rj, yj, 0.04, 0.012, hfCloth(jc[0], "felt")));
add(new THREE.Mesh(hfDome(H, yj, 0.012, 6, null, 0.012), hfCloth(jc[0], "felt")));
for (var j3 = 0; j3 < 3; j3++) {
var aj = HF_FRONT + Math.PI / 2 + (j3 - 1) * 1.05 + (j3 === 1 ? Math.PI : 0), bp = hfPt(H, Rj, aj, yj + 0.03, 0.01);
var pts = [];
for (var k3 = 0; k3 <= 8; k3++) {
var t9 = k3 / 8;
pts.push(new THREE.Vector3(bp.x + (bp.x - H.cx) * t9 * 1.4, bp.y + 0.09 * Math.sin(t9 * Math.PI * 0.9) - 0.02 * t9, bp.z + (bp.z - H.cz) * t9 * 1.4));
}
var cu = new THREE.CatmullRomCurve3(pts), tube = new THREE.TubeGeometry(cu, 12, 0.022, 8, false), pa = tube.attributes.position;
add(new THREE.Mesh(tube, hfCloth(jc[j3], "felt")));
var bl = add(new THREE.Mesh(new THREE.SphereGeometry(0.016, 10, 8), hfMat("gold")));
bl.position.copy(pts[8]);
}
}
G.name = "hat-" + hat;
G.traverse(function (m) { m.userData.hdf = 1; m.userData.hatFit = 1; if (m.isMesh) {
m.castShadow = true;
m.raycast = function () { };
} });
return G;
}
function hfGlasses(E, face) {
var H = hfHead(E);
if (!H)
return null;
var G = H.G;
if (H.eyes.length < 6) {
H.hb.remove(G);
return null;
}
var ey = 0, ez = -1e9;
H.eyes.forEach(function (p) { ey += p.y; if (p.z > ez)
ez = p.z; });
ey /= H.eyes.length;
var R = H.ring(ey), fz = ez + 0.014;
var frame = face === "monocle" ? hfMat("gold") : new THREE.MeshPhongMaterial({ color: 0x18181C, shininess: 60, specular: 0x555555 });
var sides = face === "monocle" ? [1] : [-1, 1], lr = 0.022;
sides.forEach(function (sx) {
var x = H.cx + sx * 0.033, rim = new THREE.Mesh(new THREE.TorusGeometry(lr, 0.0028, 6, 20), frame);
rim.position.set(x, ey, fz);
G.add(rim);
var lens = new THREE.Mesh(new THREE.CircleGeometry(lr, 20), face === "sunglasses" ? new THREE.MeshPhongMaterial({ color: 0x101014, shininess: 120, specular: 0x8899AA, transparent: true, opacity: 0.85 }) : new THREE.MeshPhongMaterial({ color: 0xDDEEFF, transparent: true, opacity: 0.18, shininess: 150, specular: 0xFFFFFF, depthWrite: false }));
lens.position.set(x, ey, fz - 0.001);
G.add(lens);
if (face !== "monocle") {
var ex = H.cx + sx * (H.at(R, sx > 0 ? 0 : Math.PI) + 0.004), arm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(x + sx * lr, ey, fz), new THREE.Vector3(ex, ey + 0.004, fz - 0.03), new THREE.Vector3(ex, ey, H.cz - 0.01), new THREE.Vector3(ex - sx * 0.006, ey - 0.02, H.cz - 0.03)]), 12, 0.0022, 4, false), frame);
G.add(arm);
}
else {
var ch = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(x, ey - lr, fz), new THREE.Vector3(x + 0.01, ey - 0.07, fz - 0.01), new THREE.Vector3(x + 0.03, ey - 0.13, fz - 0.03)]), 10, 0.0012, 3, false), frame);
G.add(ch);
}
});
if (face !== "monocle") {
var br = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(H.cx - 0.011, ey + 0.004, fz), new THREE.Vector3(H.cx, ey + 0.008, fz + 0.002), new THREE.Vector3(H.cx + 0.011, ey + 0.004, fz)]), 8, 0.0025, 4, false), frame);
G.add(br);
}
G.name = "glasses-" + face;
G.traverse(function (m) { m.userData.hdf = 1; if (m.isMesh)
m.raycast = function () { }; });
return G;
}
function hfSpec(m) { var q = m.geometry && m.geometry.parameters || {}; return (m.geometry.type === "TorusGeometry" && q.radius === 0.026 && q.tube === 0.005) || (m.geometry.type === "BoxGeometry" && q.width === 0.03 && q.height === 0.006); }
(function () {
if (typeof accessorize !== "function")
return;
var ac = accessorize;
accessorize = function (g, spec) { if (spec && /^presence_/.test(String(spec.id)))
return; return ac.apply(this, arguments); };
})();
(function () {
if (typeof hdfAttach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E) {
var r = ha.apply(this, arguments);
try {
var L = E && E.spec && (typeof lookOf === "function" ? lookOf(E.spec) : E.spec.look), hat = L && L.hat;
if (E && E.model && ((hat && HATF.list[hat]) || (L && L.face))) {
try {
if (typeof bshApply === "function")
bshApply(E);
}
catch (e) { }
if (E.mixer)
E.mixer.update(0);
E.model.updateMatrixWorld(true);
}
var crowned = E && E.g && E.g.userData.rlKeys && E.g.userData.rlKeys.indexOf("polecrown") >= 0;
if (E.model && hat && HATF.list[hat] && !E.hatFit && !crowned && !(E.spec && E.spec.wCostume && E.spec.wCostume.c && E.spec.wCostume.c.ownHead)) {
var G = hfMake(E, hat, L);
if (G) {
E.hatFit = G;
E.hatHid = [];
(E.hats || []).forEach(function (m) { if (m.visible) {
m.visible = false;
E.hatHid.push(m);
} });
}
}
var face = L && L.face;
var specs = [];
if (E.g)
E.g.traverse(function (m) { if (m.isMesh && m.userData.acc && m.visible && hfSpec(m))
specs.push(m); });
if (specs.length && !face)
face = "glasses";
if (E.model && (face === "glasses" || face === "sunglasses" || face === "monocle") && !E.glassFit) {
var Gg = hfGlasses(E, face);
if (Gg) {
E.glassFit = Gg;
E.glassHid = [];
E.g.traverse(function (m) { if (m.isMesh && m.visible && (/^(lens|shade|bridge)$/.test(m.userData.part || "") || (m.userData.acc && hfSpec(m)))) {
m.visible = false;
E.glassHid.push(m);
} });
}
}
}
catch (e) {
if (window.console)
console.warn("[hats]", e);
}
return r;
};
var hd = hdfDetach;
hdfDetach = function (E) { try {
if (E && E.hatFit) {
if (E.hatFit.parent)
E.hatFit.parent.remove(E.hatFit);
E.hatFit = null;
(E.hatHid || []).forEach(function (m) { m.visible = true; });
E.hatHid = null;
}
if (E && E.glassFit) {
if (E.glassFit.parent)
E.glassFit.parent.remove(E.glassFit);
E.glassFit = null;
(E.glassHid || []).forEach(function (m) { m.visible = true; });
E.glassHid = null;
}
}
catch (e) { } return hd.apply(this, arguments); };
})();
