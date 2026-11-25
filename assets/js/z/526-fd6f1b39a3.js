/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(526, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (CVW.tex[k])
return CVW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = cvwLite();
var url = own ? "assets/textures/bundles/" + nm + (nrm ? "_n" : (lite ? "" : "-1k")) + ".jpg" : "assets/textures/photo/" + nm + (lite ? "" : "-1k") + ".jpg";
var t = new THREE.TextureLoader().load(url);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / mpt, 1 / mpt);
try {
t.anisotropy = Math.min(lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (!nrm && THREE.sRGBEncoding && typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (CVW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (CVW.mats[k])
return CVW.mats[k];
var own = name.slice(0, 2) === "b:", map = cvwPhotoTex(name, mpt || 2), m;
if (cvwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = cvwPhotoTex(name, mpt || 2, true);
var nn = o.n === undefined ? 1 : o.n;
m.normalScale = new THREE.Vector2(nn, nn);
}
}
if (o.vc)
m.vertexColors = true;
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.noPhoto = 1;
m.userData.ldShared = 1;
return (CVW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return cvwM(k, function () {
var m = new THREE.MeshLambertMaterial({ color: col });
if (o.e !== undefined)
m.emissive = new THREE.Color(o.e);
if (o.ds)
m.side = THREE.DoubleSide;
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.map) {
m.map = o.map;
}
if (o.cut) {
m.alphaTest = o.cut;
m.transparent = false;
}
m.userData.noPhoto = 1;
return m;
});
},
function (kind) {
return cvwCanvas("frond" + kind, 128, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(kind.length * 7 + 3), col = kind === "fern" ? "#3E7A2E" : kind === "cycad" ? "#2E5A26" : "#4A7A30";
x.strokeStyle = kind === "fern" ? "#5A4A2A" : "#6A6A30";
x.lineWidth = 3;
x.beginPath();
x.moveTo(W / 2, H);
x.quadraticCurveTo(W / 2 + 6, H / 2, W / 2, 6);
x.stroke();
var n = kind === "palm" ? 26 : kind === "cycad" ? 22 : 34;
for (var i = 0; i < n; i++) {
var t = i / n, y = H - 8 - t * (H - 20), L = (kind === "palm" ? 52 : kind === "cycad" ? 40 : 44) * (1 - t * 0.7) * (0.8 + R() * 0.3);
for (var s = -1; s <= 1; s += 2) {
x.fillStyle = col;
x.globalAlpha = 0.92;
x.beginPath();
x.moveTo(W / 2, y);
if (kind === "fern") {
for (var j = 0; j < 5; j++) {
var px = W / 2 + s * L * (j + 1) / 5, py = y - (kind === "palm" ? 14 : 6) * (j + 1) / 5;
x.lineTo(px, py - 3);
x.lineTo(px, py + 3);
}
x.lineTo(W / 2, y + 3);
}
else {
x.quadraticCurveTo(W / 2 + s * L * 0.6, y - (kind === "palm" ? 18 : 8), W / 2 + s * L, y + (kind === "palm" ? 16 : 4));
x.quadraticCurveTo(W / 2 + s * L * 0.5, y + 6, W / 2, y + 3);
}
x.fill();
}
}
x.globalAlpha = 1;
});
},
function () {
return cvwCanvas("bamboo", 64, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, W, 0);
g.addColorStop(0, "#8A8A3A");
g.addColorStop(0.4, "#D8C870");
g.addColorStop(1, "#7A7A30");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var y = 10; y < H; y += 48) {
x.fillStyle = "#5A5A20";
x.fillRect(0, y, W, 4);
x.fillStyle = "rgba(255,250,200,.4)";
x.fillRect(0, y + 4, W, 2);
}
cvwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return cvwCanvas("reed" + kind, 64, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(kind === "horse" ? 5 : 9);
for (var i = 0; i < 14; i++) {
var px = 6 + R() * (W - 12), top = 10 + R() * 60;
x.strokeStyle = kind === "horse" ? "#3A6A30" : "#8AB858";
x.lineWidth = kind === "horse" ? 3 : 2;
x.beginPath();
x.moveTo(px, H);
x.lineTo(px + (R() - 0.5) * 10, top);
x.stroke();
if (kind === "horse") {
for (var y = top + 10; y < H; y += 14) {
x.strokeStyle = "#2A4A20";
x.lineWidth = 1.4;
x.beginPath();
x.moveTo(px - 8, y + 6);
x.lineTo(px, y);
x.lineTo(px + 8, y + 6);
x.stroke();
}
}
}
});
},
function () {
return cvwCanvas("tuft", 128, 64, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(17);
for (var i = 0; i < 60; i++) {
var px = R() * W, h = 20 + R() * 40;
x.strokeStyle = "rgba(" + (70 + R() * 50 | 0) + "," + (110 + R() * 60 | 0) + "," + (40 + R() * 30 | 0) + ",0.95)";
x.lineWidth = 1.2 + R();
x.beginPath();
x.moveTo(px, H);
x.quadraticCurveTo(px + (R() - 0.5) * 14, H - h * 0.6, px + (R() - 0.5) * 20, H - h);
x.stroke();
}
});
},
function (col) {
return cvwCanvas("flw" + col, 64, 64, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(col.length * 13);
for (var i = 0; i < 9; i++) {
var px = 8 + R() * 48, py = 14 + R() * 40;
x.strokeStyle = "#4A7A30";
x.lineWidth = 1.5;
x.beginPath();
x.moveTo(px, H);
x.lineTo(px, py);
x.stroke();
x.fillStyle = col;
for (var p = 0; p < 5; p++) {
var a = p / 5 * 6.283;
x.beginPath();
x.arc(px + Math.cos(a) * 3, py + Math.sin(a) * 3, 2.4, 0, 7);
x.fill();
}
x.fillStyle = "#E8C040";
x.beginPath();
x.arc(px, py, 1.6, 0, 7);
x.fill();
}
});
},
function (kind) {
return cvwCanvas("skin" + kind, 256, 256, function (x, W, H) {
var R = wRand(kind.length * 31 + 5);
var base = { slate: "#4E5458", black: "#2A2E30", toad: "#5A5238", stego: "#6A6250", leather: "#6A5E54", plesio: "#3A4A48", elk: "#7A5A3A", fur: "#8A4A26", grey: "#6A6A64" }[kind] || "#5A5A5A";
x.fillStyle = base;
x.fillRect(0, 0, W, H);
if (kind === "fur" || kind === "elk") {
for (var i = 0; i < 2600; i++) {
var px = R() * W, py = R() * H;
x.strokeStyle = "rgba(" + (kind === "fur" ? "190,110,60" : "130,96,64") + "," + (0.2 + R() * 0.4) + ")";
x.lineWidth = 1;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + (R() - 0.5) * 3, py + 4 + R() * 6);
x.stroke();
}
return;
}
if (kind === "leather") {
for (var j = 0; j < 40; j++) {
x.strokeStyle = "rgba(30,20,16," + (0.15 + R() * 0.2) + ")";
x.lineWidth = 1 + R() * 2;
x.beginPath();
var sx = R() * W;
x.moveTo(sx, 0);
x.bezierCurveTo(sx + 30, H * 0.3, sx - 30, H * 0.6, sx + 10, H);
x.stroke();
}
cvwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
return;
}
var s = kind === "toad" ? 14 : 9;
for (var yy = 0; yy < H + s; yy += s * 0.86)
for (var xx = ((yy / s | 0) % 2) * s / 2; xx < W + s; xx += s) {
var v = R();
x.fillStyle = "rgba(" + (v < 0.5 ? "0,0,0" : "255,255,255") + "," + (0.06 + R() * 0.12) + ")";
x.beginPath();
x.ellipse(xx, yy, s * 0.48, s * 0.4, 0, 0, 7);
x.fill();
x.strokeStyle = "rgba(0,0,0,.22)";
x.lineWidth = 1;
x.stroke();
}
if (kind === "toad") {
for (var w = 0; w < 120; w++) {
var px2 = R() * W, py2 = R() * H, r = 2 + R() * 5;
var g = x.createRadialGradient(px2, py2, 0, px2, py2, r);
g.addColorStop(0, "rgba(200,180,120,.6)");
g.addColorStop(1, "rgba(60,50,30,0)");
x.fillStyle = g;
x.fillRect(px2 - r, py2 - r, r * 2, r * 2);
}
for (var c = 0; c < 26; c++) {
x.fillStyle = "hsla(" + (R() * 360 | 0) + ",60%,55%,0.10)";
x.fillRect(R() * W, R() * H, 40, 40);
}
}
if (kind === "stego") {
for (var b = 0; b < 30; b++) {
x.fillStyle = "rgba(40,36,20,.25)";
x.beginPath();
x.ellipse(R() * W, R() * H, 10 + R() * 20, 6 + R() * 10, R() * 3, 0, 7);
x.fill();
}
}
});
},
function () {
return cvwCanvas("ripple", 256, 256, function (x, W, H) {
var r = wRand(97);
x.fillStyle = "#808080";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 160; i++) {
x.strokeStyle = "rgba(" + (r() < 0.5 ? "255,255,255" : "0,0,0") + "," + (0.05 + r() * 0.12) + ")";
x.lineWidth = 1 + r() * 2;
var px = r() * W, py = r() * H, L = 20 + r() * 60;
x.beginPath();
x.moveTo(px, py);
x.bezierCurveTo(px + L * 0.3, py - 3, px + L * 0.6, py + 3, px + L, py);
x.stroke();
}
});
},
function (x, z, feet) {
var g = CVW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / CVW_CELL) + "," + Math.floor(z / CVW_CELL)];
if (!L)
return false;
for (var i = 0; i < L.length; i++) {
var S = L[i];
if (S.off || feet >= S.y1 - 0.4 || feet + 1.7 <= S.y0)
continue;
var dx = x - S.x, dz = z - S.z;
if (S.r !== undefined) {
if (dx * dx + dz * dz < S.r * S.r)
return true;
continue;
}
var lx = dx * S.c - dz * S.s, lz = dx * S.s + dz * S.c;
if (Math.abs(lx) < S.hw && Math.abs(lz) < S.hd)
return true;
}
return false;
},
function (seed, x, z, y, o, ry) {
o = o || {};
var p = null;
try {
if (typeof dlnPerson === "function" && o.dress)
p = dlnPerson("cvw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("cvw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || CVW.scG || CVW.G).add(p);
var P = { g: p, y: y, o: o };
CVW.people.push(P);
return P;
},
function (P, x0, z0, w, d, step, hfn, mat, cfn) {
var nx = Math.max(2, Math.round(w / step)), nz = Math.max(2, Math.round(d / step)), g = new THREE.PlaneGeometry(w, d, nx, nz);
g.rotateX(-Math.PI / 2);
var pa = g.attributes.position, uva = g.attributes.uv, col = new Float32Array(pa.count * 3), c = new THREE.Color();
for (var i = 0; i < pa.count; i++) {
var x = pa.getX(i) + x0 + w / 2, z = pa.getZ(i) + z0 + d / 2, y = hfn(x, z);
pa.setY(i, y);
uva.setXY(i, x, -z);
if (cfn) {
cfn(x, z, y, c);
}
else
c.setRGB(1, 1, 1);
col[i * 3] = c.r;
col[i * 3 + 1] = c.g;
col[i * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.position.set(x0 + w / 2, 0, z0 + d / 2);
m.receiveShadow = true;
P.add(m);
return m;
},
function (pos, col, idx, bx, bz, h, w, ry, lx, lz, c0, c1) {
var n = pos.length / 3, seg = 4, cx = Math.cos(ry), sz = -Math.sin(ry);
for (var k = 0; k <= seg; k++) {
var t = k / seg, bend = Math.pow(t, 1.7), x = bx + lx * bend, z = bz + lz * bend, y = h * t - Math.abs(lx + lz) * 0.15 * bend, hw = w * (1 - t) * 0.5 + 0.004;
pos.push(x - cx * hw, y, z - sz * hw, x + cx * hw, y, z + sz * hw);
var r = c0[0] + (c1[0] - c0[0]) * t, g = c0[1] + (c1[1] - c0[1]) * t, b = c0[2] + (c1[2] - c0[2]) * t;
col.push(r, g, b, r, g, b);
if (k) {
var o = n + (k - 1) * 2;
idx.push(o, o + 2, o + 1, o + 1, o + 2, o + 3);
}
}
},
function () {
return cvwGeo("reedClump", function () {
var lite = cvwLite(), R = wRand(97), pos = [], col = [], idx = [];
var pal = [[0.46, 0.62, 0.24], [0.56, 0.72, 0.30], [0.72, 0.70, 0.38], [0.66, 0.52, 0.28], [0.40, 0.54, 0.22], [0.80, 0.70, 0.44]];
for (var i = 0; i < (lite ? 12 : 22); i++) {
var a = R() * 6.283, r = R() * 0.45, h = 1.1 + R() * 1.3, c1 = pal[Math.floor(R() * pal.length)], c0 = [c1[0] * 0.55, c1[1] * 0.55, c1[2] * 0.5], la = a + (R() - 0.5) * 0.8, lean = 0.15 + R() * 0.55;
cvwBlade(pos, col, idx, Math.cos(a) * r, Math.sin(a) * r, h, 0.05 + R() * 0.04, R() * 3.14, Math.cos(la) * lean, Math.sin(la) * lean, c0, c1);
}
for (var j = 0; j < (lite ? 1 : 3); j++) {
var x = (R() - 0.5) * 0.5, z = (R() - 0.5) * 0.5, H = 2.0 + R() * 0.5;
cvwBlade(pos, col, idx, x, z, H, 0.025, R() * 3, 0.05, 0.03, [0.25, 0.3, 0.14], [0.4, 0.42, 0.22]);
var n = pos.length / 3, b = new THREE.CylinderGeometry(0.05, 0.05, 0.32, 6).toNonIndexed(), bp = b.attributes.position;
for (var v = 0; v < bp.count; v++) {
pos.push(bp.getX(v) + x + 0.03, bp.getY(v) + H * 0.88, bp.getZ(v) + z + 0.02);
col.push(0.32, 0.2, 0.1);
idx.push(n + v);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setIndex(idx);
g.computeVertexNormals();
return g;
});
},
function (n, len, wid, droop, y0, ring) {
var parts = [];
for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(wid, len, 1, 4);
p.translate(0, len / 2, 0);
var pa = p.attributes.position;
for (var j = 0; j < pa.count; j++) {
var t = pa.getY(j) / len;
pa.setZ(j, -droop * t * t * len);
}
p.rotateX(-(ring !== undefined ? ring : 1.05));
p.rotateY(i / n * Math.PI * 2 + (i % 2) * 0.3);
p.translate(0, y0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
}
var g = gwMerge(parts);
g.computeVertexNormals();
return g;
},
function (P, geo, mat, list, o) {
o = o || {};
if (!list.length)
return null;
var m = new THREE.InstancedMesh(geo, mat, list.length), d = new THREE.Object3D();
list.forEach(function (t, i) { d.position.set(t.x, t.y || 0, t.z); d.rotation.set(t.rx || 0, t.ry || 0, t.rz || 0); var s = t.s || 1; d.scale.set(t.sx || s, t.sy || s, t.sz || s); d.updateMatrix(); m.setMatrixAt(i, d.matrix); });
m.instanceMatrix.needsUpdate = true;
m.castShadow = !!o.shadow;
m.frustumCulled = o.cull !== false;
P.add(m);
CVW.inst.push(m);
try {
m.computeBoundingSphere && m.computeBoundingSphere();
}
catch (e) { }
return m;
},
function (x, z, pts) { var best = 1e9, SB = wSegBoxes(pts); for (var i = 0; i < pts.length - 1; i++) {
if (best < 1e9 && wSegFar(SB, i, x, z, best))
continue;
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? ((x - a[0]) * dx + (z - a[1]) * dz) / L : 0;
t = Math.max(0, Math.min(1, t));
var px = a[0] + dx * t - x, pz = a[1] + dz * t - z, d = Math.sqrt(px * px + pz * pz);
if (d < best)
best = d;
} return best; },
function (P, pts, w, hfn, mat, lift) {
if (hfn) {
var rs = [pts[0]];
for (var q = 1; q < pts.length; q++) {
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (cvwLite() ? 8 : 4)));
for (var k0 = 1; k0 <= n0; k0++)
rs.push([a0[0] + (b0[0] - a0[0]) * k0 / n0, a0[1] + (b0[1] - a0[1]) * k0 / n0]);
}
pts = rs;
}
var pos = [], uv = [], idx = [], acc = 0;
for (var i = 0; i < pts.length; i++) {
var a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L * w / 2, nz = dx / L * w / 2, p = pts[i];
if (i)
acc += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
[[p[0] + nx, p[1] + nz], [p[0] - nx, p[1] - nz]].forEach(function (q, k) { pos.push(q[0], (hfn ? hfn(q[0], q[1]) : 0) + (lift || 0.06), q[1]); uv.push(k, acc / w); });
if (i) {
var o = (i - 1) * 2;
idx.push(o, o + 2, o + 1, o + 1, o + 2, o + 3);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.receiveShadow = true;
P.add(m);
return m;
},
function (P, kind, list, o) {
o = o || {};
if (!list || !list.length)
return;
var lite = cvwLite(), leaf = cvwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
cvwInst(P, cvwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), cvwMat("pale"), list, { shadow: !lite });
cvwInst(P, cvwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), cvwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
cvwInst(P, cvwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), cvwMat("bark"), list, { shadow: !lite });
cvwInst(P, cvwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), cvwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
cvwInst(P, cvwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), cvwMat("darkbark"), list, { shadow: !lite });
cvwInst(P, cvwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), cvwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
cvwInst(P, cvwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), cvwMat("bark"), list, { shadow: !lite });
cvwInst(P, cvwGeo("pfronds", function () { var g = cvwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), cvwLam(0xFFFFFF, { ds: 1, map: cvwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
cvwInst(P, cvwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), cvwMat("darkbark"), list, {});
cvwInst(P, cvwGeo("mfronds", function () { return cvwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), cvwLam(0xFFFFFF, { ds: 1, map: cvwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
cvwInst(P, cvwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), cvwMat("darkbark"), list, {});
cvwInst(P, cvwGeo("ffronds", function () { return cvwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), cvwLam(0xFFFFFF, { ds: 1, map: cvwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
cvwInst(P, cvwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), cvwMat("darkbark"), list, {});
cvwInst(P, cvwGeo("cyf", function () { return cvwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), cvwLam(0xFFFFFF, { ds: 1, map: cvwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
cvwInst(P, cvwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), cvwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: cvwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
cvwInst(P, cvwGeo("bamL", function () { return cvwCards(3, 2.6, 2.2, 5.4); }), cvwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds": {
cvwInst(P, cvwReedClumpGeo(), cvwVcM("reedVC"), list, {});
break;
}
case "horse": {
cvwInst(P, cvwGeo("reed" + kind, function () { return cvwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), cvwLam(0xFFFFFF, { ds: 1, map: cvwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
cvwInst(P, cvwGeo("tuft", function () { return cvwCards(2, 1.6, 0.7, 0); }), cvwLam(o.col || 0xFFFFFF, { ds: 1, map: cvwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
cvwInst(P, cvwGeo("flw", function () { return cvwCards(2, 0.9, 0.7, 0); }), cvwLam(0xFFFFFF, { ds: 1, map: cvwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
cvwInst(P, cvwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), cvwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
cvwInst(P, cvwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || cvwMat("rock"), list, {});
break;
}
case "cactus": {
cvwInst(P, cvwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), cvwLam(0x4A7A3A), list, {});
break;
}
}
},
function (pts, rads, seg, rs, flat) {
var curve = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); })), n = seg || 16, r = rs || 8, pos = [], idx = [], uv = [];
var frames = curve.computeFrenetFrames(n, false);
for (var i = 0; i <= n; i++) {
var t = i / n, P = curve.getPointAt(t), N = frames.normals[i], B = frames.binormals[i], f = t * (rads.length - 1), k = Math.min(rads.length - 2, Math.floor(f)), rad = rads[k] + (rads[k + 1] - rads[k]) * (f - k);
for (var j = 0; j <= r; j++) {
var a = j / r * Math.PI * 2, cx = Math.cos(a), sy = Math.sin(a) * (flat || 1);
pos.push(P.x + rad * (cx * N.x + sy * B.x), P.y + rad * (cx * N.y + sy * B.y), P.z + rad * (cx * N.z + sy * B.z));
uv.push(j / r, t * 3);
}
}
for (i = 0; i < n; i++)
for (var j2 = 0; j2 < r; j2++) {
var a1 = i * (r + 1) + j2, b1 = a1 + r + 1;
idx.push(a1, b1, a1 + 1, b1, b1 + 1, a1 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function (kind, col) { return cvwM("skinM" + kind + (col || ""), function () { var t = cvwSkinTex(kind); t.repeat.set(2, 2); var m = cvwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = cvwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(cvwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = cvwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(cvwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
cvwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return cvwGeo(k, function () {
var g = new THREE.BoxGeometry(w, h, d), uv = g.attributes.uv, dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
for (var f = 0; f < 6; f++)
for (var v = 0; v < 4; v++) {
var i = f * 4 + v;
uv.setXY(i, uv.getX(i) * dims[f][0], uv.getY(i) * dims[f][1]);
}
return g;
});
},
function (P, text, w, h, x, y, z, ry, o) {
o = o || {};
var t = cvwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
c.fillStyle = o.bg || "#F2EAD4";
c.fillRect(0, 0, W, H);
c.strokeStyle = o.ink || "#2A1A10";
c.lineWidth = 6;
c.strokeRect(6, 6, W - 12, H - 12);
c.fillStyle = o.ink || "#2A1A10";
var fs = Math.min(H * 0.5, W / Math.max(6, text.length) * 1.6);
c.font = (o.it ? "italic " : "") + "bold " + fs + "px Georgia";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(text, W / 2, H / 2);
});
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), cvwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
return m;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = o.wall || cvwS("b:stucco", o.col || 0xF0E2C8, 3), trim = cvwLam(0xFAF6EE), sh = cvwLam(o.shut || 0x3A6A4A), glass = cvwShine(0x1A2228, 0.2, 0.3);
cvwBox(g, w, h, d, wall, 0, 0, 0);
cvwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
cvwBox(g, w + 0.12, 0.5, d + 0.12, cvwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(cvwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || cvwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
cvwBox(g, 1.3, 2.6, 0.12, cvwMat("oak"), wx, 0, d / 2 + 0.02);
cvwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = cvwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = cvwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!cvwLite())
[-1, 1].forEach(function (s) { cvwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
cvwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
cvwBox(g, 0.05, 0.9, 0.05, cvwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
cvwBox(g, 1.8, 0.05, 0.05, cvwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
cvwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (CVW.scG) {
if (CVW.scG.parent)
CVW.scG.parent.remove(CVW.scG);
CVW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
CVW.scG = null;
CVW.solids = [];
CVW.sgrid = null;
CVW.floors = [];
CVW.spots = [];
CVW.talk = [];
CVW.people = [];
CVW.beasts = [];
CVW.fx = [];
CVW.water = [];
CVW.inst = [];
CVW.hgt = null;
CVW.scBuilt = null;
CVW.rooms = [];
CVW.doors = [];
CVW.lights = 0;
CVW.ticks = [];
CVW.tripods = [];
CVW.handlers = [];
CVW.smoke = [];
CVW.live = null;
CVW.thing = null;
CVW.rlDoor = null;
CVW.rlDark = null;
CVW.emma = null;
CVW.alert = null;
CVW.rlAlert = null;
if (typeof cvbSceneDrop === "function")
try {
cvbSceneDrop();
}
catch (e) { }
},
function (k) {
if (CVW.scBuilt === k && CVW.scG)
return;
cvwSceneDrop();
var D = CVW_SCN[k], S = CVW_SC[k];
if (!D || !S || !CVW.G)
return;
CVW.sc = k;
CVW.scG = new THREE.Group();
CVW.scG.position.x = S.x;
CVW.G.add(CVW.scG);
CVW.hgt = D.h || function () { return 0; };
try {
D.build(CVW.scG);
}
catch (e) {
if (window.console)
console.warn("[cthulhu-void] scene", k, e);
}
CVW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
CVW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = cvwAtPt(at);
if (!A)
return;
var v = cvwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
CVW.moving = true;
setTimeout(function () {
if (WLD.on !== CVW_KEY) {
v.style.opacity = "0";
CVW.moving = false;
return;
}
cvwScene(A.sc);
var S = CVW_SC[A.sc], y = A.y != null ? A.y : cvwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(CVW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(cvwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; CVW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(cvwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), cvwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; CVW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(cvwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), cvwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(cvwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), cvwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(cvwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), cvwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!cvwLite() && typeof THREE.PointLight === "function" && (CVW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
CVW.lights = (CVW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
CVW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("cvw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("cvw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = CVW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : cvwGround(x, z, o.feet != null ? o.feet : 500);
var g = F.voice ? cvwVoiceG() : cvwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
if (F.idol)
cvwIdolHeld(g);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || CVW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
CVW.people.push(P);
if (!o.mute)
cvwTalk(P, o.name || F.name, cvwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = cvwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = cvwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: [0x141414, 0x3A2A1A, 0x6A4A2A, 0x8A7A6A, 0xB8A060][Math.floor(R() * 5)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
var y = o.y != null ? o.y : cvwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || CVW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
CVW.people.push(P);
cvwTalk(P, L[0], L[4] || o.persona || CVP.townfolk, L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, dress, x, z, ry, greet, o) {
o = o || {};
var g = cvwDressed(seed, dress, { sex: sex, child: !!o.child, beard: o.beard, hair: o.hair, skin: o.skin });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : cvwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || CVW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
CVW.people.push(P);
if (name)
cvwTalk(P, name, o.persona || CVP.townfolk, greet || "Good day.", o.r || 3.0);
return P;
},
function (k) {
switch (k) {
case "plaster": return cvwS("plaster", 0xF0EAD8, 4);
case "render": return cvwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return cvwS("b:stucco", 0xE8CC98, 3);
case "rose": return cvwS("b:stucco", 0xE8C0B0, 3);
case "grey": return cvwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return cvwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return cvwS("stone", 0xC8C0B0, 2.4);
case "greystone": return cvwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return cvwS("b:limestone", 0x6A6660, 4);
case "brick": return cvwS("brick", 0xB87A5E, 1.6);
case "slate": return cvwS("b:slate", 0x5A5E68, 2);
case "tile": return cvwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return cvwS("shingle", 0x7A5A44, 2);
case "thatch": return cvwThatchM();
case "oak": return cvwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return cvwS("b:oak", 0x4A3020, 1.4);
case "floor": return cvwS("b:oak", 0xA87A50, 1.8);
case "planks": return cvwS("b:planks", 0x9A8060, 2);
case "deck": return cvwS("b:deck", 0xB8A07A, 2);
case "hull": return cvwS("b:planks", 0x4A3A2A, 2);
case "damask": return cvwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return cvwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return cvwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return cvwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return cvwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return cvwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return cvwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return cvwLam(0xEDE6D6);
case "beams": return cvwS("b:oak", 0x5A3E26, 1.4);
case "brass": return cvwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return cvwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return cvwShine(0xC87A4A, 0.35, 0.85);
case "glass": return cvwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return cvwShine(0x26323A, 0.15, 0.3);
case "earth": return cvwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return cvwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return cvwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return cvwS("paving", 0x6C685F, 2.4);
case "cobble": return cvwS("b:cotto", 0x9A9088, 1.2);
case "setts": return cvwS("paving", 0x8A8478, 2.4);
case "gravel": return cvwS("sand", 0x9A8C72, 3);
case "sand": return cvwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return cvwS("b:strata", 0x8A847A, 6);
case "darkrock": return cvwS("b:strata", 0x5A5650, 7);
case "granite": return cvwS("b:limestone", 0x9A948C, 5);
case "moss": return cvwS("b:moss", 0x7A9A5A, 3);
case "bark": return cvwS("bark", 0x8A7A64, 2.5);
case "darkbark": return cvwS("bark", 0x5A4E40, 3);
case "birch": return cvwS("bark", 0xE8E4DA, 2);
case "slush": return cvwS("sand", 0xC4BCB0, 3);
case "snowroof": return cvwS("snow", 0xB8BEC6, 3);
case "snow": return cvwS("snow", 0xD0D6DE, 5, { vc: 1 });
case "snowwall": return cvwS("snow", 0xF0F4FA, 3);
case "ice": return cvwM("icem", function () { var m = cvwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: cvwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: cvwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return cvwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return cvwLam(0xE8DCC4, { ds: 1 });
case "sail": return cvwLam(0xE8E0CC, { ds: 1 });
case "rope": return cvwLam(0x8A7A5A);
}
return cvwS("earth", 0x8A7058, 5);
},
function () {
return cvwM("thatch", function () {
var t = cvwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
var x = R() * W, y = R() * H;
c.strokeStyle = "rgba(" + (100 + R() * 80 | 0) + "," + (84 + R() * 60 | 0) + "," + (40 + R() * 30 | 0) + ",0.8)";
c.lineWidth = 1 + R() * 1.5;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + (R() - 0.5) * 4, y + 10 + R() * 12);
c.stroke();
} });
t.repeat.set(3, 3);
var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: t, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
});
},
function (P, key, cx, cz, w, d, o) {
o = o || {};
var y = CVW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = cvwMat(o.wall || "plaster"), fl = cvwMat(o.floor || "floor");
cvwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
cvwBox(g, w, 0.1, d, o.ceil ? cvwMat(o.ceil) : cvwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = 1.2;
cvwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
cvwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
cvwBox(g, dw, h - 2.3, 0.2, wall, 0, 2.3, q[1]);
cvwBox(g, dw, 2.3, 0.08, cvwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
cvwBox(g, 0.06, 0.06, 0.04, cvwMat("brass"), 0.42, 1.0, q[1] - 0.12);
}
else
cvwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
cvwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
cvwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = cvwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { cvwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { cvwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
cvwBox(g, 0.18, 0.22, d - 0.2, cvwMat("beams"), b, h - 0.22, 0);
cvwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
cvwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
cvwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
cvwSolid(cx - (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
cvwSolid(cx + (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
cvwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
CVW.rooms.push(R);
if (o.light !== false && !cvwLite() && (CVW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
CVW.lights = (CVW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
cvwSpot(ox, oz, 1.8, name, "go in", function () { cvwGo({ sc: CVW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + cvEsc(R.name) + ".</b>"); if (typeof cvbNote === "function")
cvbNote("in:" + R.key); });
cvwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { cvwGo({ sc: CVW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof cvbNote === "function")
cvbNote("out:" + R.key); }, R.y);
CVW.doors.push(R);
return R;
},
function (fromKey, toKey, lx, lz, name, verb) {
var A = CVW.rooms.filter(function (r) { return r.key === fromKey; })[0], B = CVW.rooms.filter(function (r) { return r.key === toKey; })[0];
if (!A || !B)
return;
var x = A.cx + lx, z = A.cz + lz;
B.out = { x: x, z: z, ry: Math.PI, inner: fromKey };
cvwSpot(x, z, 1.5, name, verb || "go through", function () { cvwGo({ sc: CVW.sc, x: B.cx, z: B.z1 - 1.2, y: B.y, ry: 0 }, "🚪 <b>" + cvEsc(B.name) + ".</b>"); if (typeof cvbNote === "function")
cvbNote("in:" + B.key); }, A.y);
cvwSpot(B.cx, B.z1 - 0.6, 1.4, "Back to " + A.name, "go", function () { cvwGo({ sc: CVW.sc, x: x, z: z + 1.2, y: A.y, ry: 0 }, null); if (typeof cvbNote === "function")
cvbNote("out:" + B.key); }, B.y);
CVW.doors.push(B);
return B;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = cvwMat(o.mat || "oak");
cvwBox(g, w, 0.06, d, o.cloth ? cvwLam(o.cloth) : wd, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { cvwBox(g, 0.07, h - 0.06, 0.07, wd, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = cvwMat(o.mat || "oak");
cvwBox(g, 0.46, 0.05, 0.44, o.seat ? cvwMat(o.seat) : wd, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { cvwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.19); });
cvwBox(g, 0.46, 0.5, 0.04, wd, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { cvwBox(g, 0.05, 0.22, 0.42, wd, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = cvwMat(o.mat || "oak");
cvwBox(g, 1.1, 0.4, 2.0, wd, 0, 0, 0);
cvwBox(g, 1.04, 0.18, 1.94, cvwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
cvwBox(g, 0.8, 0.12, 0.36, cvwLam(0xF4F0E8), 0, 0.58, -0.7);
cvwBox(g, 1.1, 0.9, 0.06, wd, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { cvwBox(g, 0.07, 1.9, 0.07, wd, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = cvwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
cvwBox(g, w, h, 0.06, wd, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { cvwBox(g, 0.05, h, 0.36, wd, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
cvwBox(g, w, 0.04, 0.36, wd, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(cvwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? cvwMat("glass") : cvwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
cvwBox(g, bw, bh, 0.24, cvwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
bx += bw + 0.004;
}
}
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var st = cvwMat(o.mat || "ashlar");
cvwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
cvwBox(g, 1.0, 0.8, 0.52, cvwLam(0x141210), 0, 0, 0.02);
cvwBox(g, 2.0, 0.1, 0.6, cvwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
cvwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = cvwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
cvwCyl(g, 0.2, 0.16, 0.26, cvwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
cvwCyl(g, 0.06, 0.07, 0.03, cvwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
cvwCyl(g, 0.018, 0.018, 0.16, cvwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(cvwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), cvwGlowM(0xFFD070, 0.9));
f.position.y = 0.215;
g.add(f);
var gl = wGlow(0xFFC860, 0.25, 0.35);
gl.position.y = 0.22;
g.add(gl);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = cvwTable(P, x, z, o.w || 2.4, o.d || 0.8, 0.92, { ry: ry, mat: "darkoak" });
var R = wRand(Math.round(x * 13 + z * 7));
for (var i = 0; i < (o.n || 6); i++) {
var px = -((o.w || 2.4) / 2) + 0.25 + i * (((o.w || 2.4) - 0.5) / Math.max(1, (o.n || 6) - 1)), k = i % 4;
if (k === 0) {
var fl = new THREE.Mesh(cvwGeo("flask", function () { return new THREE.SphereGeometry(0.1, 12, 10); }), cvwMat("glass"));
fl.position.set(px, 1.02, 0);
g.add(fl);
cvwCyl(g, 0.025, 0.025, 0.16, cvwMat("glass"), px, 1.08, 0, 8);
var liq = new THREE.Mesh(cvwGeo("liq", function () { return new THREE.SphereGeometry(0.075, 10, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), cvwLam([0x8A3A2A, 0x3A6A8A, 0x6A8A3A][i % 3], { op: 0.75 }));
liq.position.set(px, 1.02, 0);
g.add(liq);
}
else if (k === 1) {
var rt = new THREE.Mesh(cvwGeo("retort", function () { return new THREE.SphereGeometry(0.09, 12, 10); }), cvwMat("glass"));
rt.position.set(px, 1.0, 0);
g.add(rt);
var nk = new THREE.Mesh(cvwGeo("retn", function () { var c = new THREE.CylinderGeometry(0.012, 0.03, 0.4, 8); c.rotateZ(1.1); return c; }), cvwMat("glass"));
nk.position.set(px + 0.16, 1.1, 0);
g.add(nk);
}
else if (k === 2) {
cvwCyl(g, 0.07, 0.05, 0.12, cvwLam(0xC8B8A0), px, 0.92, 0, 10);
cvwCyl(g, 0.12, 0.12, 0.02, cvwMat("iron"), px, 0.92, 0, 12);
}
else {
for (var t = 0; t < 3; t++)
cvwCyl(g, 0.012, 0.012, 0.22, cvwMat("glass"), px - 0.05 + t * 0.05, 0.92, 0.1, 6);
cvwBox(g, 0.2, 0.04, 0.06, cvwMat("darkoak"), px, 0.92, 0.1);
}
}
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), cvwM("rug" + col, function () {
var t = cvwCanvas("rugt" + col, 256, 256, function (c, W, H) {
c.fillStyle = "#" + col.toString(16).padStart(6, "0");
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(232,200,120,.7)";
c.lineWidth = 10;
c.strokeRect(14, 14, W - 28, H - 28);
c.lineWidth = 3;
c.strokeRect(34, 34, W - 68, H - 68);
for (var i = 0; i < 5; i++) {
c.beginPath();
c.arc(W / 2, H / 2, 20 + i * 16, 0, 7);
c.stroke();
}
cvwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
});
var mm = new THREE.MeshLambertMaterial({ map: t });
mm.userData.noPhoto = 1;
return mm;
}));
m.rotation.x = -Math.PI / 2;
m.position.set(x, 0.012, z);
P.add(m);
return m;
},
function (P, x, y, z, ry, w, h, draw) {
var t = cvwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
cvwBox(g, w + 0.12, h + 0.12, 0.04, cvwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), cvwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
m.position.z = 0.025;
g.add(m);
return g;
},
function (P, x, y, z, ry, w, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var col = o.sky || 0xC8D8E8;
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), cvwGlowM(col));
m.position.z = 0.02;
g.add(m);
cvwBox(g, w + 0.16, 0.08, 0.12, cvwMat("oak"), 0, -h / 2 - 0.04, 0.04);
cvwBox(g, 0.05, h, 0.06, cvwMat("oak"), 0, -h / 2, 0.05);
cvwBox(g, w, 0.04, 0.06, cvwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { cvwBox(g, 0.05, h, 0.06, cvwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : cvwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = o.wallM || cvwMat(o.wall || "render"), trim = cvwMat(o.trim || "ashlar"), sh = cvwLam(o.shut || 0x4A6A4A), pane = cvwMat("pane"), lite = cvwLite();
cvwBox(g, w, h, d, wall, 0, 0, 0);
cvwBox(g, w + 0.1, 0.6, d + 0.1, cvwMat("greystone"), 0, 0, 0);
cvwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = cvwMat(o.roof || "tile");
var rf = new THREE.Mesh(cvwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
if (o.hip) {
var c = new THREE.ConeGeometry(0.7072, 1, 4, 1);
c.rotateY(Math.PI / 4);
c.translate(0, 0.5, 0);
c.scale(w + 0.6, rh, d + 0.6);
return c;
}
var s = new THREE.Shape();
s.moveTo(-w / 2 - 0.35, 0);
s.lineTo(0, rh);
s.lineTo(w / 2 + 0.35, 0);
s.lineTo(-w / 2 - 0.35, 0);
var e = new THREE.ExtrudeGeometry(s, { depth: d + 0.5, bevelEnabled: false });
e.translate(0, 0, -(d + 0.5) / 2);
return e;
}), roofM);
rf.position.y = h;
g.add(rf);
if (!o.hip) { }
cvwBox(g, 0.7, rh * 0.9, 0.7, cvwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); cvwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); cvwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
cvwBox(g, 1.2, 2.4, 0.1, cvwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
cvwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
cvwBox(g, 1.6, 0.14, 0.6, cvwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
cvwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
cvwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
cvwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { cvwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
cvwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = cvwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = cvwMat(o.wall || "ashlar"), roof = cvwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
cvwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(cvwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { cvwBox(g, 0.12, 5, 1.6, cvwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); cvwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
cvwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
cvwBox(g, T + 0.4, 0.4, T + 0.4, cvwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), cvwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = cvwBox(g, 0.08, 0.9, 0.04, cvwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = cvwBox(g, 0.06, 1.1, 0.04, cvwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(cvwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), cvwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(cvwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || cvwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
cvwBox(g, 2.2, 3.6, 0.2, cvwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
cvwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var tz = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
cvwSolid(x + tx, z + tz, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = cvwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
cvwBox(P, seg + 0.2, h, 2, st, mx, cvwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
cvwBox(P, 1.2, 0.8, 2, st, cx, cvwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = cvwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
cvwInst(P, cvwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), cvwMat("darkbark"), list, { shadow: !lite });
cvwInst(P, cvwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), cvwM("firM" + (o.snow ? "s" : ""), function () {
var t = cvwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
c.strokeStyle = "rgba(" + (30 + R() * 40 | 0) + "," + (70 + R() * 50 | 0) + "," + (40 + R() * 30 | 0) + ",0.8)";
c.lineWidth = 1;
var x = R() * W, y = R() * H;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + (R() - 0.5) * 6, y + 3 + R() * 4);
c.stroke();
} if (o.snow) {
for (var s = 0; s < 400; s++) {
c.fillStyle = "rgba(250,252,255," + (0.5 + R() * 0.5) + ")";
c.fillRect(R() * W, R() * H * 0.6, 3 + R() * 5, 2);
}
} });
t.repeat.set(2, 2);
var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: t });
m.userData.noPhoto = 1;
return m;
}), list, { shadow: false });
},
function (P, list) {
if (!list.length)
return;
var lite = cvwLite();
cvwInst(P, cvwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), cvwMat("birch"), list, {});
cvwInst(P, cvwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), cvwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: cvwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = cvwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || cvwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
var cap = new THREE.Mesh(geo, cvwMat("snowwall"));
var cs = o.snowLine || 0.45;
cap.scale.set(r * cs * 1.04, h * cs, r * cs * 1.04 * (o.sz || 1));
cap.position.y = h * (1 - cs) + 0.2;
g.add(cap);
g.userData.keep = 1;
return g;
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var hull = cvwMat(o.hull || "hull");
var h = new THREE.Mesh(cvwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
cvwBox(g, 1.5, 0.06, 0.3, cvwMat("planks"), 0, 0.38, -0.6);
cvwBox(g, 1.5, 0.06, 0.3, cvwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = cvwBox(g, 0.05, 0.05, 2.6, cvwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
cvwCyl(g, 0.04, 0.05, 3.4, cvwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), cvwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : cvwLand(x, z), w = o.w || 9, d = o.d || 8, h = o.h || 6.4, lite = cvwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var brick = cvwS("brick", o.brick || 0xB86A4E, 1.4), trim = cvwLam(0xF2EEE2), stone = cvwMat("ashlar"), pane = cvwMat("pane"), slate = cvwMat("slate");
cvwBox(g, w, h, d, brick, 0, 0, 0);
cvwBox(g, w + 0.12, 0.5, d + 0.12, cvwMat("darkstone"), 0, 0, 0);
cvwBox(g, w + 0.2, 0.16, d + 0.2, stone, 0, 3.1, 0);
cvwBox(g, w + 0.3, 0.2, d + 0.3, trim, 0, h - 0.2, 0);
var rh = o.rh || 3.2;
var rf = new THREE.Mesh(cvwGeo("hip" + w + "|" + d + "|" + rh, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.8, rh, d + 0.8); return c; }), slate);
rf.position.y = h;
g.add(rf);
[-1, 1].forEach(function (s) { cvwBox(g, 0.9, rh + 1.8, 0.6, brick, s * w * 0.3, h, 0); cvwCyl(g, 0.12, 0.12, 0.5, cvwLam(0xA85A3A), s * w * 0.3 - 0.2, h + rh + 1.8, 0, 8); cvwCyl(g, 0.12, 0.12, 0.5, cvwLam(0xA85A3A), s * w * 0.3 + 0.2, h + rh + 1.8, 0, 8); });
var bx = -w * 0.22;
cvwBox(g, 3.2, h - 0.6, 1.2, brick, bx, 0, d / 2 + 0.6);
var br = cvwBox(g, 3.6, 0.5, 1.6, slate, bx, h - 0.6, d / 2 + 0.6);
br.rotation.x = -0.25;
[0.9, 4.0].forEach(function (wy) { cvwBox(g, 2.6, 1.7, 0.06, trim, bx, wy, d / 2 + 1.22); cvwBox(g, 2.4, 1.5, 0.06, pane, bx, wy + 0.1, d / 2 + 1.25); cvwBox(g, 0.06, 1.5, 0.08, trim, bx - 0.8, wy + 0.1, d / 2 + 1.27); cvwBox(g, 0.06, 1.5, 0.08, trim, bx + 0.8, wy + 0.1, d / 2 + 1.27); });
var dx = w * 0.25;
cvwBox(g, 1.1, 2.4, 0.08, cvwLam(o.door || 0x2A3A2A), dx, 0.2, d / 2 + 0.04);
cvwBox(g, 1.6, 0.14, 1.2, trim, dx, 2.8, d / 2 + 0.6);
[-1, 1].forEach(function (s) { cvwBox(g, 0.1, 2.6, 0.1, trim, dx + s * 0.7, 0.2, d / 2 + 1.1); });
cvwBox(g, 1.6, 0.2, 1.0, stone, dx, 0, d / 2 + 0.6);
cvwBox(g, 0.5, 0.05, 0.4, cvwLam(0xC8B080), dx + 0.3, 1.6, d / 2 + 0.08);
var win = function (wx, wy, zz, rot) { var q = new THREE.Group(); q.position.set(wx, wy, zz); q.rotation.y = rot; g.add(q); cvwBox(q, 1.1, 1.7, 0.06, trim, 0, 0, 0); cvwBox(q, 0.9, 1.5, 0.06, pane, 0, 0.1, 0.02); cvwBox(q, 1.3, 0.12, 0.2, stone, 0, -0.06, 0.06); cvwBox(q, 1.2, 0.16, 0.12, stone, 0, 1.7, 0.03); };
win(dx, 4.0, d / 2 + 0.02, 0);
[-w * 0.25, w * 0.2].forEach(function (wx) { win(wx, 0.9, -d / 2 - 0.02, Math.PI); win(wx, 4.0, -d / 2 - 0.02, Math.PI); });
[-1, 1].forEach(function (s) { win(s * (w / 2 + 0.02), 4.0, 0, s * Math.PI / 2); });
if (o.garden !== false) {
var gz = d / 2 + (o.gd || 6);
cvwBox(g, w + 4, 0.7, 0.3, brick, 0, 0, gz);
cvwBox(g, w + 4.2, 0.1, 0.4, stone, 0, 0.7, gz);
cvwBox(g, 1.2, 0.05, gz - d / 2 - 0.6, cvwMat("gravel"), dx, 0.02, (gz + d / 2) / 2 + 0.3);
if (!lite)
cvwPlant(P, "bush", [{ x: x + Math.cos(o.ry || 0) * (-w * 0.4) + Math.sin(o.ry || 0) * (d / 2 + 3), z: z - Math.sin(o.ry || 0) * (-w * 0.4) + Math.cos(o.ry || 0) * (d / 2 + 3), y: y, s: 0.9, ry: 0 }], { col: 0x2E4A26, keepAll: true });
}
cvwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
g.userData.door = { x: dx, z: d / 2 + 1.6 };
return g;
},
function (P, x, z, n, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : cvwLand(x, z), sw = o.sw || 6, d = o.d || 9, h = o.h || 8.6;
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var names = o.names || ["GROCER", "BUTCHER", "DRAPER", "CHEMIST", "IRONMONGER", "BAKER", "TOBACCONIST", "NEWSAGENT", "BOOTMAKER", "POST OFFICE"], cols = [0x2A3A5A, 0x5A1E1E, 0x2A4A2A, 0x3A2A1A, 0x4A3A5A, 0x1E3A3A], R = wRand(Math.round(x * 3 + z));
var brick = cvwS("brick", 0xA86048, 1.4), slate = cvwMat("slate"), trim = cvwLam(0xF2EEE2), pane = cvwMat("pane");
for (var i = 0; i < n; i++) {
var cx = -((n - 1) * sw) / 2 + i * sw, c = cols[Math.floor(R() * cols.length)], ht = h + (i % 3) * 0.4;
cvwBox(g, sw - 0.05, ht, d, brick, cx, 0, 0);
var rf = new THREE.Mesh(cvwGeo("shr" + sw + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.3, 0); s.lineTo(0, 2.6); s.lineTo(d / 2 + 0.3, 0); s.lineTo(-d / 2 - 0.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false }); e.translate(0, 0, -sw / 2); e.rotateY(Math.PI / 2); return e; }), slate);
rf.position.set(cx, ht, 0);
g.add(rf);
cvwBox(g, sw - 0.3, 3.3, 0.12, cvwLam(c), cx, 0, d / 2 + 0.04);
cvwBox(g, sw - 1.6, 2.3, 0.06, pane, cx - 0.5, 0.5, d / 2 + 0.12);
cvwBox(g, 1.0, 2.4, 0.08, cvwLam(0x1E1A16), cx + sw / 2 - 0.9, 0, d / 2 + 0.12);
cvwSign(g, o.names ? names[i % names.length] : names[Math.floor(R() * names.length)], sw - 0.6, 0.62, cx, 3.0, d / 2 + 0.2, 0, { bg: "#" + c.toString(16).padStart(6, "0"), ink: "#F0D890" });
if (!cvwLite()) {
var aw = cvwBox(g, sw - 0.4, 0.06, 1.6, cvwLam([0xC8B080, 0x8A3A2A, 0x3A5A3A][i % 3], { ds: 1 }), cx, 2.7, d / 2 + 0.8);
aw.rotation.x = 0.3;
}
[0, 1].forEach(function (f) { for (var k = -1; k <= 1; k += 2) {
cvwBox(g, 1.0, 1.6, 0.06, trim, cx + k * sw * 0.22, 4.2 + f * 2.4, d / 2 + 0.03);
cvwBox(g, 0.8, 1.4, 0.06, pane, cx + k * sw * 0.22, 4.3 + f * 2.4, d / 2 + 0.06);
} });
}
cvwSolid(x, z, n * sw, d, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, pts, hfn) {
var lite = cvwLite();
cvwStrip(P, pts, 7, hfn, cvwMat("gravel"), 0.12);
var sl = [], rl = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (lite ? 1.6 : 0.8));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
[-1.6, 1.6].forEach(function (o) { sl.push({ x: x + Math.cos(ry) * o, z: z - Math.sin(ry) * o, y: hfn(x, z) + 0.16, ry: ry }); });
}
[-2.32, -0.88, 0.88, 2.32].forEach(function (o) { var m = new THREE.Mesh(cvwGeo("rail", function () { return new THREE.BoxGeometry(0.08, 0.14, 1); }), cvwMat("iron")); var mx = (a[0] + b[0]) / 2 + Math.cos(ry) * o, mz = (a[1] + b[1]) / 2 - Math.sin(ry) * o; m.position.set(mx, hfn(mx, mz) + 0.3, mz); m.rotation.y = ry; m.scale.z = L; P.add(m); });
}
cvwInst(P, cvwGeo("sleeper", function () { return new THREE.BoxGeometry(2.4, 0.14, 0.26); }), cvwMat("darkoak"), sl, {});
},
function (P, x, z, len, name, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : cvwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
cvwBox(g, 6, 1.0, len, cvwMat("paving"), 0, 0, 0);
cvwBox(g, 6.1, 0.12, len, cvwMat("ashlar"), 0, 1.0, 0);
for (var i = 0; i < Math.floor(len / 6); i++) {
var cz = -len / 2 + 3 + i * 6;
cvwCyl(g, 0.1, 0.12, 4, cvwLam(0x2A4A3A), 1.6, 1, cz, 8);
}
var cn = cvwBox(g, 5, 0.1, len * 0.7, cvwLam(0xD8D0C0, { ds: 1 }), 0.6, 5.0, 0);
cn.rotation.z = 0.12;
cvwBox(g, 0.2, 0.4, len * 0.7, cvwLam(0x2A4A3A), 3, 4.8, 0);
cvwBox(g, 4, 3.8, 12, cvwS("brick", 0xA86048, 1.4), -1, 1, 0);
cvwBox(g, 4.4, 0.3, 12.4, cvwLam(0xF2EEE2), -1, 4.8, 0);
cvwBox(g, 1.2, 2.3, 0.08, cvwLam(0x2A3A2A), 1.02, 1, 0);
cvwSign(g, name, 5, 0.8, 2.9, 2.6, len / 2 - 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
cvwSign(g, name, 5, 0.8, 2.9, 2.6, -len / 2 + 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
cvwFloor(x, z, 6, len, y + 1.12, {});
cvwSolid(x + Math.cos(o.ry || 0) * (-1), z - Math.sin(o.ry || 0) * (-1), 4, 12, y, y + 5, o.ry || 0);
return g;
},
function (P, x, z, len, w, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = cvwS("brick", 0x9A5A40, 1.4), rise = o.rise || 1.6, n = 8;
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, z0 = -len / 2 + len * t0, z1 = -len / 2 + len * t1, y0 = Math.sin(t0 * Math.PI) * rise, y1 = Math.sin(t1 * Math.PI) * rise, seg = cvwBox(g, w, 0.5, len / n + 0.05, br, 0, (y0 + y1) / 2 - 0.4, (z0 + z1) / 2);
seg.rotation.x = -Math.atan2(y1 - y0, len / n);
[-1, 1].forEach(function (s) { var pr = cvwBox(g, 0.4, 1.0, len / n + 0.05, br, s * (w / 2 - 0.2), (y0 + y1) / 2, (z0 + z1) / 2); pr.rotation.x = -Math.atan2(y1 - y0, len / n); });
}
var ar = new THREE.Mesh(cvwGeo("arch" + w, function () { var t = new THREE.TorusGeometry(3, 0.6, 6, 12, Math.PI); return t; }), br);
ar.rotation.y = Math.PI / 2;
ar.position.y = -3.2;
g.add(ar);
var ry = o.ry || 0, cx = function (lz) { return x + Math.sin(ry) * lz; }, cz = function (lz) { return z + Math.cos(ry) * lz; };
cvwRamp(cx(-len / 4), cz(-len / 4), w - 0.8, len / 2, y - 0.1, y + rise - 0.1, ry);
cvwRamp(cx(len / 4), cz(len / 4), w - 0.8, len / 2, y + rise - 0.1, y - 0.1, ry);
[-1, 1].forEach(function (s) { cvwSolid(x + Math.cos(ry) * s * (w / 2 - 0.2), z - Math.sin(ry) * s * (w / 2 - 0.2), 0.4, len, y - 1, y + rise + 1.1, ry); });
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = cvwLam(0x1E2A22);
cvwCyl(g, 0.07, 0.12, 3.4, ir, 0, 0, 0, 8);
cvwBox(g, 0.7, 0.06, 0.06, ir, 0, 3.1, 0);
var lt = cvwBox(g, 0.34, 0.5, 0.34, cvwGlowM(o.lit ? 0xFFE0A0 : 0xE8E4D0, o.lit ? 0.95 : 0.6), 0, 3.4, 0);
var cap = new THREE.Mesh(cvwGeo("lampcap", function () { return new THREE.ConeGeometry(0.3, 0.3, 4); }), ir);
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
if (o.lit) {
var gl = wGlow(0xFFD890, 0.9, 2.4);
gl.position.y = 3.6;
g.add(gl);
}
cvwRound(x, z, 0.2, hfn(x, z) - 1, hfn(x, z) + 3.5);
return g;
},
function (P, pts, hfn, gap) {
var list = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (gap || 40));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
list.push({ x: x, z: z, y: hfn(x, z), ry: Math.atan2(b[0] - a[0], b[1] - a[1]) });
}
}
cvwInst(P, cvwGeo("tpole", function () { var p = new THREE.CylinderGeometry(0.1, 0.14, 8, 6); p.translate(0, 4, 0); var c = new THREE.BoxGeometry(1.6, 0.1, 0.1); c.translate(0, 7.4, 0); var c2 = new THREE.BoxGeometry(1.2, 0.1, 0.1); c2.translate(0, 6.8, 0); return gwMerge([p.toNonIndexed(), c, c2].map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), cvwMat("darkoak"), list, {});
},
function (P, pts, hfn, o) {
o = o || {};
var list = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.floor(L / 2.4));
for (var k = 0; k < n; k++) {
var t = (k + 0.5) / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
list.push({ x: x, z: z, y: hfn(x, z), ry: ry });
}
}
if (o.hedge) {
cvwPlant(P, "bush", list.map(function (q, i) { return { x: q.x, z: q.z, y: q.y - 0.2, s: (o.hs || 0.85) + ((i * 37) % 10) / 40, ry: i * 1.7 }; }), { col: o.col || 0x4A6A30, keepAll: true });
return;
}
cvwInst(P, cvwGeo(o.hedge ? "hedge" : "paling", function () { if (o.hedge) {
var h = new THREE.BoxGeometry(0.9, 1.4, 2.5, 2, 2, 2);
h.translate(0, 0.7, 0);
return h;
} var parts = []; for (var j = 0; j < 6; j++) {
var s = new THREE.BoxGeometry(0.06, 1.1, 0.08);
s.translate(0, 0.55, -1.0 + j * 0.4);
parts.push(s);
} var r = new THREE.BoxGeometry(0.05, 0.08, 2.4); r.translate(0, 0.85, 0); parts.push(r); var r2 = r.clone(); r2.translate(0, -0.5, 0); parts.push(r2); return gwMerge(parts.map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), o.hedge ? cvwM("hedgeM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A5A2A, map: cvwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }) : cvwLam(o.col || 0xE8E2D2), list, {});
},
function (P, x, z, r, hfn, fires) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 18), cvwM("scorch", function () { var mm = new THREE.MeshLambertMaterial({ color: 0x14100C, transparent: true, opacity: 0.85, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, hfn(x, z) + 0.05, z);
P.add(m);
var R = wRand(Math.round(x * 7 + z));
for (var i = 0; i < (fires || 0); i++) {
var a = R() * 6.283, d = R() * r * 0.8, fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
var f = cvwFire(P, fx, hfn(fx, fz), fz, 0.6 + R() * 0.8);
f.userData.keep = 1;
}
return m;
},
function (P, list) { if (!list.length)
return; cvwInst(P, cvwGeo("deadT", function () { var t = new THREE.CylinderGeometry(0.12, 0.3, 6, 6); t.translate(0, 3, 0); var b = new THREE.CylinderGeometry(0.05, 0.1, 2.4, 5); b.rotateZ(0.9); b.translate(0.8, 4.2, 0); var b2 = b.clone(); b2.rotateY(2.4); return gwMerge([t.toNonIndexed(), b.toNonIndexed(), b2.toNonIndexed()]); }), cvwLam(0x1A1612), list, {}); },
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : cvwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var wd = cvwMat(o.mat || "oak"), blk = cvwLam(0x1A1612);
var L = o.len || 2.6, W = o.w || 1.5;
cvwBox(g, W, 0.5, L, wd, 0, 0.8, 0);
if (o.seat)
cvwBox(g, W, 0.5, 0.5, cvwLam(o.seatCol || 0x3A2A1E), 0, 1.3, -0.3);
if (o.load)
for (var i = 0; i < o.load; i++)
cvwBox(g, 0.6, 0.4 + i % 2 * 0.2, 0.6, cvwLam([0x8A6A4A, 0x5A4A3A, 0xC8B898, 0x6A3A2A][i % 4]), -0.4 + (i % 3) * 0.4, 1.3, -0.8 + Math.floor(i / 3) * 0.6);
[-1, 1].forEach(function (s) { var wh = new THREE.Mesh(cvwGeo("cwheel", function () { return new THREE.TorusGeometry(0.75, 0.05, 6, 16); }), blk); wh.position.set(s * (W / 2 + 0.1), 0.75, 0.2); wh.rotation.y = Math.PI / 2; g.add(wh); for (var k = 0; k < 5; k++) {
var sp = cvwBox(g, 0.03, 1.5, 0.03, wd, s * (W / 2 + 0.1), 0, 0.2);
sp.position.y = 0.75;
sp.rotation.x = k / 5 * Math.PI;
} });
[-1, 1].forEach(function (s) { cvwBox(g, 0.06, 0.06, 2.4, wd, s * 0.45, 0.9, -L / 2 - 1.1); });
if (o.horse !== false)
cvwHorse(g, 0, 0, -L / 2 - 2.0, 0, { col: o.hcol || 0x5A3A22, kind: o.kind });
if (!o.nosolid)
cvwSolid(x, z, W + 0.6, L + 2, y - 1, y + 2.2, ry || 0);
return g;
},
function (P, hfn, col, o) {
o = o || {};
var R = o.r || 2600, st = cvwLite() ? 160 : 100, E = o.edge || 820, cl = function (v) { return Math.max(-E, Math.min(E, v)); };
return cvwTerrain(P, -R, -R, 2 * R, 2 * R, st, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)), k = cvwSmooth(E, R, e); return hfn(cl(x), cl(z)) * (1 - k) + (o.rise || 18) * k * cvwFbm(x * 0.002, z * 0.002, 2) - 0.6 - 8 * (1 - k); }, cvwMat("meadow"), function (x, z, y, c) { var g = 0.75 + cvwFbm(x * 0.01, z * 0.01, 2) * 0.2, C = typeof col === "number" ? [((col >> 16) & 255) / 255, ((col >> 8) & 255) / 255, (col & 255) / 255] : (col || [0.56, 0.74, 0.42]); c.setRGB(C[0] * g, C[1] * g, C[2] * g); });
},
function (pts, s) {
var L = 0;
for (var i = 1; i < pts.length; i++) {
var a = pts[i - 1], b = pts[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
if (s <= L + d) {
var t = (s - L) / d;
return { x: a[0] + (b[0] - a[0]) * t, z: a[1] + (b[1] - a[1]) * t, ry: Math.atan2(b[0] - a[0], b[1] - a[1]), nx: -(b[1] - a[1]) / d, nz: (b[0] - a[0]) / d };
}
L += d;
}
var p = pts[pts.length - 1], q = pts[pts.length - 2];
return { x: p[0], z: p[1], ry: Math.atan2(p[0] - q[0], p[1] - q[1]), nx: 0, nz: 0 };
},
function (P, pts, hfn, o) {
o = o || {};
var lite = cvwLite(), R = wRand(o.seed || 5), L = cvwPathLen(pts), W = o.w || 8, mv = [], g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var dress = o.dress || ["gent", "lady", "maid", "worker", "boy", "girl", "porter", "cabby", "clergy", "newsboy"], n = lite ? Math.round((o.n || 40) * 0.4) : (o.n || 40), nc = lite ? Math.round((o.carts || 8) * 0.5) : (o.carts || 8);
for (var i = 0; i < n; i++) {
var d = dress[Math.floor(R() * dress.length)], kid = d === "boy" || d === "girl", m = cvwDressed((o.seed || 5) * 100 + i, d, { sex: d === "lady" || d === "maid" || d === "girl" ? "f" : "m", child: kid });
g.add(m);
mv.push({ g: m, s: R() * L, off: (R() - 0.5) * W, sp: (o.sp || 1.4) * (0.8 + R() * 0.5) });
}
for (i = 0; i < nc; i++) {
var c = cvwCart(g, 0, 0, 0, { y: 0, nosolid: true, seat: R() < 0.6, load: Math.floor(R() * 6), hcol: [0x5A3A22, 0x2A1E16, 0x8A6A4A, 0x3A3028][i % 4], len: 2 + R() * 1.4 });
mv.push({ g: c, s: R() * L, off: (R() - 0.5) * W * 0.5, sp: (o.sp || 1.4) * (0.9 + R() * 0.3), cart: 1 });
}
var on = true;
CVW.ticks.push(function (dt) { if (!g.parent || !on)
return; mv.forEach(function (M) { M.s += M.sp * dt; if (M.s > L)
M.s -= L; var p = cvwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); }); });
mv.forEach(function (M) { var p = cvwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); });
g.userData.stop = function () { on = false; };
return g;
},
function (c, W, H, seed, ink, bg) {
var R = wRand(seed || 7);
if (bg) {
c.fillStyle = bg;
c.fillRect(0, 0, W, H);
}
c.strokeStyle = ink || "rgba(20,24,20,.85)";
c.lineCap = "round";
var rows = Math.max(2, Math.round(H / 26)), cols = Math.max(3, Math.round(W / 22));
for (var r = 0; r < rows; r++)
for (var k = 0; k < cols; k++) {
var x = 10 + k * (W - 20) / cols, y = 8 + r * (H - 16) / rows, s = Math.min((W - 20) / cols, (H - 16) / rows) * 0.8;
c.lineWidth = Math.max(1.2, s * 0.09);
var n = 2 + Math.floor(R() * 3);
c.beginPath();
for (var j = 0; j < n; j++) {
var t = R();
if (t < 0.3) {
c.moveTo(x + R() * s, y + R() * s);
c.lineTo(x + R() * s, y + R() * s);
}
else if (t < 0.55) {
c.moveTo(x + s * 0.5 + s * 0.3, y + s * 0.5);
c.arc(x + s * 0.5, y + s * 0.5, s * (0.15 + R() * 0.2), 0, Math.PI * (1 + R()));
}
else if (t < 0.8) {
c.moveTo(x + R() * s * 0.3, y + s * 0.2);
c.quadraticCurveTo(x + s * 0.5, y + s * (R()), x + s * 0.9, y + s * 0.3 + R() * s * 0.6);
}
else {
c.moveTo(x + s * 0.2, y + s * 0.8);
c.lineTo(x + s * 0.5, y + s * 0.2);
c.lineTo(x + s * 0.8, y + s * 0.8);
}
}
c.stroke();
}
},
function (c, W, H, o) {
o = o || {};
var cx = W / 2, cy = H * 0.42, s = Math.min(W, H) * 0.36, ink = o.ink || "rgba(18,22,16,.9)", hi = o.hi || "rgba(255,255,240,.18)";
if (o.bg) {
c.fillStyle = o.bg;
c.fillRect(0, 0, W, H);
}
c.strokeStyle = ink;
c.lineWidth = Math.max(1, s * 0.03);
for (var i = 0; i < 7; i++) {
var bx = W * 0.05 + i * W * 0.13, bw = W * 0.11, bh = H * (0.25 + ((i * 37) % 5) * 0.06);
c.beginPath();
c.moveTo(bx, H * 0.66);
c.lineTo(bx + bw * 0.2, H * 0.66 - bh);
c.lineTo(bx + bw, H * 0.66 - bh * 0.86);
c.lineTo(bx + bw * 0.9, H * 0.66);
c.stroke();
}
c.fillStyle = ink;
[-1, 1].forEach(function (k) { c.beginPath(); c.moveTo(cx + k * s * 0.25, cy + s * 0.15); c.quadraticCurveTo(cx + k * s * 0.95, cy - s * 0.55, cx + k * s * 0.8, cy + s * 0.35); c.quadraticCurveTo(cx + k * s * 0.5, cy + s * 0.2, cx + k * s * 0.25, cy + s * 0.35); c.fill(); });
c.beginPath();
c.ellipse(cx, cy + s * 0.45, s * 0.36, s * 0.42, 0, 0, 7);
c.fill();
c.beginPath();
c.ellipse(cx, cy - s * 0.12, s * 0.24, s * 0.3, 0, 0, 7);
c.fill();
c.lineWidth = Math.max(1.4, s * 0.045);
c.strokeStyle = ink;
for (var f = 0; f < 9; f++) {
var a = -0.9 + f * 0.225, x0 = cx + Math.sin(a) * s * 0.16;
c.beginPath();
c.moveTo(x0, cy + s * 0.05);
c.bezierCurveTo(x0 + Math.sin(a) * s * 0.2, cy + s * 0.25, x0 - Math.sin(a * 2) * s * 0.15, cy + s * 0.35, x0 + Math.sin(a * 3) * s * 0.1, cy + s * 0.52);
c.stroke();
}
[-1, 1].forEach(function (k) { for (var t = 0; t < 3; t++) {
c.beginPath();
c.moveTo(cx + k * s * (0.22 + t * 0.05), cy + s * 0.8);
c.quadraticCurveTo(cx + k * s * (0.26 + t * 0.05), cy + s * 0.95, cx + k * s * (0.2 + t * 0.05), cy + s * 1.0);
c.stroke();
} });
c.fillStyle = hi;
c.beginPath();
c.ellipse(cx - s * 0.08, cy - s * 0.22, s * 0.06, s * 0.1, 0.3, 0, 7);
c.fill();
if (o.glyphs !== false) {
c.save();
c.translate(0, H * 0.72);
cvwGlyphDraw(c, W, H * 0.26, o.seed || 11, ink);
c.restore();
}
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var s = o.s || 1;
var t = cvwCanvas("basrel" + (o.wet ? "w" : ""), 256, 300, function (c, W, H) {
var gr = c.createLinearGradient(0, 0, W, H);
gr.addColorStop(0, o.wet ? "#7A6048" : "#9A7E60");
gr.addColorStop(1, o.wet ? "#5A4634" : "#7A6046");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
cvwNoise(c, W, H, 2400, 0.18, 23, "40,28,18");
cvwFigureDraw(c, W, H, { ink: "rgba(40,28,18,.85)", hi: "rgba(255,230,200,.25)", seed: 31 });
});
var m = new THREE.Mesh(new THREE.BoxGeometry(0.15 * s, 0.13 * s, 0.02 * s), [cvwLam(0x7A6046), cvwLam(0x7A6046), cvwLam(0x7A6046), cvwLam(0x7A6046), cvwM("basrelM" + (o.wet ? "w" : ""), function () { var mm = cvwLite() ? new THREE.MeshLambertMaterial({ map: t }) : new THREE.MeshPhongMaterial({ map: t, shininess: o.wet ? 60 : 8, specular: o.wet ? 0x5A4A3A : 0x111111 }); mm.userData.noPhoto = 1; return mm; }), cvwLam(0x6A5038)]);
m.rotation.x = o.flat ? -Math.PI / 2 : 0;
m.position.y = o.flat ? 0.012 * s : 0.065 * s;
g.add(m);
return g;
},
function () {
return cvwM("idolM", function () {
var t = cvwCanvas("idolTex", 256, 256, function (c, W, H) {
c.fillStyle = "#1E2A22";
c.fillRect(0, 0, W, H);
var R = wRand(61);
for (var i = 0; i < 60; i++) {
c.strokeStyle = "rgba(" + (R() < 0.5 ? "40,60,48" : "14,20,16") + "," + (0.3 + R() * 0.4) + ")";
c.lineWidth = 1 + R() * 3;
c.beginPath();
var y = R() * H;
c.moveTo(0, y);
c.bezierCurveTo(W * 0.3, y + (R() - 0.5) * 40, W * 0.6, y + (R() - 0.5) * 40, W, y + (R() - 0.5) * 30);
c.stroke();
}
for (i = 0; i < 420; i++) {
c.fillStyle = R() < 0.7 ? "rgba(214,180,90," + (0.4 + R() * 0.5) + ")" : "rgba(140,220,200," + (0.3 + R() * 0.4) + ")";
c.fillRect(R() * W, R() * H, 1 + R() * 2, 1 + R() * 2);
}
});
var m = cvwLite() ? new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: 0xFFFFFF, map: t, shininess: 70, specular: 0x4A5A4A });
m.userData.noPhoto = 1;
return m;
});
},
function () {
return cvwM("rlcarveM", function () {
var t = cvwCanvas("rlcarve", 512, 512, function (c, W, H) {
c.fillStyle = "#2E3A34";
c.fillRect(0, 0, W, H);
cvwNoise(c, W, H, 5000, 0.25, 71, "10,16,12");
c.save();
c.translate(W * 0.1, H * 0.04);
cvwFigureDraw(c, W * 0.8, H * 0.62, { ink: "rgba(12,18,14,.75)", hi: "rgba(140,180,150,.12)", glyphs: false });
c.restore();
c.save();
c.translate(0, H * 0.66);
cvwGlyphDraw(c, W, H * 0.32, 77, "rgba(12,18,14,.7)");
c.restore();
for (var i = 0; i < 26; i++) {
var R = wRand(i + 90);
c.fillStyle = "rgba(74,110,58," + (0.15 + R() * 0.25) + ")";
c.beginPath();
c.ellipse(R() * W, R() * H * 0.2, 10 + R() * 50, 30 + R() * 120, 0, 0, 7);
c.fill();
}
});
var m = cvwLite() ? new THREE.MeshLambertMaterial({ color: 0xC8D0C8, map: t }) : new THREE.MeshPhongMaterial({ color: 0xC8D0C8, map: t, shininess: 40, specular: 0x3A4A3A });
m.userData.noPhoto = 1;
return m;
});
},
function (lite) {
return cvwGeo("squidHead" + (lite ? "L" : ""), function () {
var pr = [[0.0, -0.1], [0.15, -0.08], [0.23, 0.02], [0.26, 0.14], [0.25, 0.28], [0.21, 0.42], [0.15, 0.54], [0.08, 0.62], [0.0, 0.65]].map(function (q) { return new THREE.Vector2(q[0], q[1]); });
var g = new THREE.LatheGeometry(pr, lite ? 14 : 24);
var pa = g.attributes.position;
for (var i = 0; i < pa.count; i++) {
var x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i), an = Math.atan2(z, x), r = 1 + 0.07 * Math.sin(an * 7) * Math.min(1, Math.max(0, y / 0.3));
pa.setX(i, x * r * 1.05);
pa.setZ(i, z * r * 0.95 - Math.max(0, y) * 0.35);
}
g.computeVertexNormals();
return g;
});
},
function (mat, o) {
o = o || {};
var g = new THREE.Group(), lite = cvwLite(), dark = o.dark || mat, nf = o.feelers || (lite ? 8 : 12);
var body = cvwEll(g, mat, 0.42, 0.5, 0.38, 0, 0.62, 0, o.seg || 14);
if (!lite || o.big)
for (var i = 0; i < 6; i++) {
var pl = cvwEll(g, dark, 0.12, 0.06, 0.1, 0, 0.92 - i * 0.1, -0.3 - i * 0.02, 6);
pl.rotation.x = 0.6;
}
var head = cvwPiv(g, 0, 1.08, 0.14);
head.rotation.x = 0.3;
var mantle = new THREE.Mesh(cvwSquidHeadG(lite), mat);
head.add(mantle);
[-1, 1].forEach(function (k) { var br = cvwEll(head, dark, 0.09, 0.035, 0.05, k * 0.1, 0.2, 0.2, 8); br.rotation.z = -k * 0.35; });
if (o.eyes) {
[-1, 1].forEach(function (k) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 6), cvwGlowM(o.eyes, 0.75)); e.position.set(k * 0.1, 0.15, 0.205); head.add(e); });
}
var feel = [], nfa = Math.round(nf * 1.5);
for (var f = 0; f < nfa; f++) {
var a = (f / (nfa - 1) - 0.5) * 2.6, row = f % 2, piv = cvwPiv(head, Math.sin(a) * (0.17 - row * 0.04), 0.04 - row * 0.05, 0.12 + Math.cos(a) * 0.1), L = 0.55 + ((f * 7) % 6) * 0.06, cu = (f % 3 - 1) * 0.06, sx = Math.sin(a);
piv.add(new THREE.Mesh(cvwTaper([[0, 0, 0], [sx * 0.04, -L * 0.28, 0.08], [sx * 0.07, -L * 0.55, 0.06], [sx * 0.05 + cu, -L * 0.78, 0.1], [sx * 0.01 + cu * 1.6, -L * 0.92, 0.18], [cu * 2, -L * 0.97, 0.24]], [0.05, 0.04, 0.03, 0.02, 0.011, 0.004], lite ? 6 : 9, lite ? 6 : 10), mat));
piv.userData.ph = f * 0.7;
feel.push(piv);
}
[-1, 1].forEach(function (k) {
var sh = cvwPiv(g, k * 0.36, 0.92, 0.1);
sh.add(new THREE.Mesh(cvwTaper([[0, 0, 0], [k * 0.12, -0.18, 0.14], [k * 0.06, -0.36, 0.24]], [0.09, 0.075, 0.06], 6, 8), mat));
for (var c = 0; c < 4; c++) {
var fx = k * 0.06 + (c - 1.5) * 0.045;
sh.add(new THREE.Mesh(cvwTaper([[fx, -0.36, 0.26], [fx + (c - 1.5) * 0.015, -0.44, 0.34], [fx + (c - 1.5) * 0.02, -0.5, 0.38]], [0.03, 0.024, 0.018], 5, 4), mat));
var cl = new THREE.Mesh(cvwGeo("claw2", function () { var cc = new THREE.ConeGeometry(0.02, 0.2, 6); cc.translate(0, -0.1, 0); return cc; }), dark);
cl.position.set(fx + (c - 1.5) * 0.02, -0.5, 0.39);
cl.rotation.x = -1.2;
sh.add(cl);
}
g.userData["arm" + k] = sh;
});
[-1, 1].forEach(function (k) {
var hp = cvwPiv(g, k * 0.26, 0.36, 0.12);
hp.add(new THREE.Mesh(cvwTaper([[0, 0, 0], [k * 0.08, 0.06, 0.2], [k * 0.04, -0.24, 0.24]], [0.11, 0.09, 0.06], 6, 8), mat));
for (var c = 0; c < 3; c++) {
var cl = new THREE.Mesh(cvwGeo("hclaw", function () { var cc = new THREE.ConeGeometry(0.03, 0.22, 6); cc.translate(0, -0.11, 0); return cc; }), dark);
cl.position.set(k * 0.04 + (c - 1) * 0.045, -0.24, 0.32);
cl.rotation.x = 0.2;
hp.add(cl);
}
});
var wing = cvwGeo("cvwing2", function () { var s = new THREE.Shape(); s.moveTo(0, 0); s.quadraticCurveTo(0.3, 0.62, 0.72, 0.58); s.quadraticCurveTo(0.62, 0.42, 0.7, 0.26); s.quadraticCurveTo(0.54, 0.2, 0.6, -0.02); s.quadraticCurveTo(0.44, -0.02, 0.46, -0.3); s.quadraticCurveTo(0.3, -0.24, 0.24, -0.46); s.quadraticCurveTo(0.12, -0.2, 0, -0.1); s.lineTo(0, 0); var gg = new THREE.ShapeGeometry(s, 10); return gg; });
var wm = o.wingMat || cvwM("cvwingM" + mat.uuid, function () { var m = mat.clone(); m.side = THREE.DoubleSide; m.userData.noPhoto = 1; return m; });
[-1, 1].forEach(function (k) {
var wp = cvwPiv(g, k * 0.16, 0.95, -0.3);
var w = new THREE.Mesh(wing, wm);
w.scale.set(k, 1, 1);
w.rotation.y = k * 0.5;
wp.add(w);
g.userData["wing" + k] = wp;
w.scale.set(k * 1.3, 1.3, 1.3);
for (var rb = 0; rb < 4; rb++) {
var tip = [[0.72, 0.58], [0.7, 0.26], [0.6, -0.02], [0.46, -0.3]][rb];
var r = new THREE.Mesh(cvwTaper([[0, 0, 0], [k * tip[0] * 0.55 * 1.3 * Math.cos(0.5), tip[1] * 0.6 * 1.3, -k * tip[0] * 0.55 * 1.3 * Math.sin(0.5) * k], [k * tip[0] * 1.3 * Math.cos(0.5), tip[1] * 1.3, -tip[0] * 1.3 * Math.sin(0.5)]], [0.024, 0.014, 0.004], 5, 5), dark);
wp.add(r);
}
});
g.userData.feel = feel;
g.userData.head = head;
g.userData.body = body;
return g;
},
function (s, o) {
o = o || {};
var g = new THREE.Group(), M = cvwIdolM(), k = s / 1.9;
var blk = new THREE.Mesh(cvwGeo("idolBlk", function () { return new THREE.BoxGeometry(1.0, 0.6, 0.9); }), [M, M, M, M, cvwM("idolGlyph", function () { var t = cvwGlyphTex(41, "rgba(214,180,90,.55)", "#1E2A22"); var m = new THREE.MeshPhongMaterial({ map: t, shininess: 60, specular: 0x4A5A4A }); m.userData.noPhoto = 1; return m; }), M]);
blk.position.y = 0.3;
var inner = new THREE.Group();
inner.add(blk);
var F = cvwForm(M, { feelers: o.lite ? 6 : 10 });
F.position.set(0, 0.6, 0);
F.scale.setScalar(1.15);
inner.add(F);
inner.scale.setScalar(k);
g.add(inner);
g.userData.keep = 1;
return g;
},
function (P, x, y, z, ry, s) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var M = cvwM("thingM", function () {
var t = cvwCanvas("thingTex2", 256, 256, function (c, W, H) {
c.fillStyle = "#24401F";
c.fillRect(0, 0, W, H);
var R = wRand(5);
for (var row = 0; row < 18; row++)
for (var col = 0; col < 17; col++) {
var x = col * 16 + (row % 2) * 8, y = row * 15, gr = c.createRadialGradient(x, y - 4, 1, x, y, 11);
gr.addColorStop(0, "rgba(130,170,96,.75)");
gr.addColorStop(0.7, "rgba(60,96,48,.6)");
gr.addColorStop(1, "rgba(14,26,12,.9)");
c.fillStyle = gr;
c.beginPath();
c.arc(x, y, 10, 0, Math.PI);
c.fill();
c.strokeStyle = "rgba(10,20,8,.7)";
c.lineWidth = 1.2;
c.beginPath();
c.arc(x, y, 10, 0, Math.PI);
c.stroke();
}
for (var i = 0; i < 120; i++) {
c.fillStyle = "rgba(170,220,150," + (0.06 + R() * 0.12) + ")";
c.fillRect(R() * W, R() * H, 1 + R() * 2, 4 + R() * 12);
}
});
t.repeat.set(3, 3);
var m = cvwLite() ? new THREE.MeshLambertMaterial({ color: 0x6A9A5A, map: t }) : new THREE.MeshPhongMaterial({ color: 0x6A9A5A, map: t, shininess: 90, specular: 0x8AB87A, transparent: true, opacity: 0.94 });
m.userData.noPhoto = 1;
return m;
}), D = cvwM("thingD", function () { var m = new THREE.MeshLambertMaterial({ color: 0x1E2E1A }); m.userData.noPhoto = 1; return m; });
var F = cvwForm(M, { dark: D, feelers: cvwLite() ? 10 : 16, seg: 22, big: 1, eyes: 0x9AC88A });
F.scale.setScalar(s / 1.6);
g.add(F);
g.userData.form = F;
g.userData.live = 1;
g.userData.keep = 1;
g.userData.t0 = CVW.t;
CVW.beasts.push(g);
return g;
},
function (g, t, amp) {
var F = g.userData.form || g;
(F.userData.feel || []).forEach(function (p) { p.rotation.x = Math.sin(t * 0.9 + p.userData.ph) * 0.28 * amp; p.rotation.z = Math.sin(t * 0.6 + p.userData.ph * 1.3) * 0.22 * amp; });
[-1, 1].forEach(function (k) { var w = F.userData["wing" + k]; if (w)
w.rotation.z = k * Math.sin(t * 0.35) * 0.12 * amp; var a = F.userData["arm" + k]; if (a)
a.rotation.x = Math.sin(t * 0.5 + k) * 0.18 * amp; });
if (F.userData.body)
F.userData.body.scale.y = 0.5 * (1 + Math.sin(t * 0.7) * 0.03 * amp);
},
function (P, w, h, d, x, y, z, ry, o) {
o = o || {};
var k = "titan" + [w, h, d, o.sx || 0, o.sz || 0, o.tw || 0].map(function (v) { return (+v).toFixed(2); }).join("|");
var geo = cvwGeo(k, function () {
var gg = new THREE.BoxGeometry(w, h, d, 1, 1, 1);
var pa = gg.attributes.position, uv = gg.attributes.uv;
for (var i = 0; i < pa.count; i++) {
var px = pa.getX(i), py = pa.getY(i), pz = pa.getZ(i), t = (py + h / 2) / h;
pa.setX(i, px + (o.sx || 0) * t * h + (o.tw || 0) * pz * t);
pa.setZ(i, pz + (o.sz || 0) * t * h - (o.tw || 0) * px * t * 0.5);
}
var dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
for (var f = 0; f < 6; f++)
for (var v = 0; v < 4; v++) {
var j = f * 4 + v;
uv.setXY(j, uv.getX(j) * dims[f][0] / (o.mpt || 6), uv.getY(j) * dims[f][1] / (o.mpt || 6));
}
gg.computeVertexNormals();
return gg;
});
var mat = o.carve ? [cvwMat("rlstone"), cvwMat("rlstone"), cvwMat("ooze"), cvwMat("rlstoneD"), cvwMat("rlcarve"), cvwMat("rlcarve")] : (o.mat || cvwMat("rlstone"));
var m = new THREE.Mesh(geo, mat);
m.position.set(x, y + h / 2, z);
m.rotation.y = ry || 0;
m.castShadow = !cvwLite();
m.receiveShadow = true;
P.add(m);
if (o.solid)
cvwSolid(x, z, w + Math.abs(o.sx || 0) * h, d + Math.abs(o.sz || 0) * h, y - 1, y + h, ry || 0);
if (o.top)
cvwFloor(x + (o.sx || 0) * h * Math.cos(ry || 0), z, w * 0.9, d * 0.9, y + h, { rot: ry || 0 });
return m;
},
function (P, x, y, z, w, h, ry) {
var m = new THREE.Mesh(cvwGeo("oozeSh" + w.toFixed(1) + "|" + h.toFixed(1), function () { var gg = new THREE.PlaneGeometry(w, h, 4, 6); var pa = gg.attributes.position; for (var i = 0; i < pa.count; i++) {
var yy = pa.getY(i);
if (yy < -h * 0.2)
pa.setY(i, yy - Math.abs(Math.sin(pa.getX(i) * 2.3)) * h * 0.12);
} gg.computeVertexNormals(); return gg; }), cvwMat("ooze"));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
return m;
},
function (P, o) {
o = o || {};
var lite = cvwLite(), n = lite ? 500 : 1400, pos = new Float32Array(n * 3), R = wRand(o.seed || 909);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, e = 0.05 + R() * 1.4, r = 2400;
pos[i * 3] = Math.cos(a) * Math.cos(e) * r;
pos[i * 3 + 1] = Math.sin(e) * r * 0.8 + 80;
pos[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var st = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xDCE8FF, size: lite ? 2.4 : 1.8, sizeAttenuation: false, transparent: true, opacity: o.op || 0.75, depthWrite: false, fog: false }));
st.frustumCulled = false;
P.add(st);
var rockM = cvwMat("rlstoneD");
for (var k = 0; k < (lite ? 3 : 6); k++) {
var a2 = k / 6 * 6.283 + 0.4, d = 900 + R() * 500, isl = new THREE.Group();
isl.position.set(Math.cos(a2) * d, 140 + R() * 260, Math.sin(a2) * d);
var und = new THREE.Mesh(new THREE.ConeGeometry(30 + R() * 30, 70 + R() * 60, 9, 1), rockM);
und.rotation.x = Math.PI;
und.position.y = -30;
isl.add(und);
var top = new THREE.Mesh(new THREE.CylinderGeometry(34, 30, 8, 9), rockM);
isl.add(top);
isl.userData.kind = "float";
isl.userData.y0 = isl.position.y;
isl.userData.ph = R() * 6;
P.add(isl);
CVW.fx.push(isl);
}
if (o.lamp !== false) {
var lh = new THREE.Group();
lh.position.set(-1300, 120, -1500);
P.add(lh);
cvwCyl(lh, 10, 14, 90, cvwLam(0x3A3A5A), 0, 0, 0, 12);
var lp = new THREE.Mesh(new THREE.SphereGeometry(9, 12, 10), new THREE.MeshBasicMaterial({ color: 0xFFE8A0, fog: false }));
lp.position.y = 98;
lh.add(lp);
var gl = wGlow(0xFFE0A0, 60, 0.5);
gl.position.y = 98;
lh.add(gl);
}
return st;
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var tin = cvwShine(0x6A6A62, 0.45, 0.6);
cvwBox3(g, 0.42, 0.16, 0.3, tin, 0, 0, 0);
var lid = cvwBox3(g, 0.43, 0.03, 0.31, tin, 0, o.open ? 0.3 : 0.16, o.open ? -0.15 : 0);
if (o.open) {
lid.rotation.x = -1.3;
}
if (o.open) {
cvwBox3(g, 0.36, 0.04, 0.25, cvwLam(0xE8E0CC), 0, 0.14, 0);
cvwBasRelief(g, -0.08, 0.18, 0.02, 0, { flat: 1 });
}
return g;
},
function (L, B, D) {
return cvwGeo("hull" + L + "|" + B + "|" + D, function () {
var s = new THREE.Shape(), hb = B / 2;
s.moveTo(0, -L / 2);
s.bezierCurveTo(hb * 0.7, -L / 2 + L * 0.08, hb, -L / 2 + L * 0.28, hb, -L * 0.05);
s.lineTo(hb * 0.96, L * 0.36);
s.bezierCurveTo(hb * 0.9, L / 2, -hb * 0.9, L / 2, -hb * 0.96, L * 0.36);
s.lineTo(-hb, -L * 0.05);
s.bezierCurveTo(-hb, -L / 2 + L * 0.28, -hb * 0.7, -L / 2 + L * 0.08, 0, -L / 2);
var g = new THREE.ExtrudeGeometry(s, { depth: D, bevelEnabled: false, curveSegments: 10 });
g.rotateX(Math.PI / 2);
var pa = g.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i), t = -y / D;
pa.setX(i, pa.getX(i) * (1 - t * 0.42));
var z = pa.getZ(i);
if (t > 0.5)
pa.setZ(i, z * (1 - (t - 0.5) * 0.2));
if (y > -0.01)
pa.setY(i, y + Math.max(0, -z / L - 0.1) * 0.9);
}
g.computeVertexNormals();
return g;
});
},
function (P, x, wy, z, ry, o) {
o = o || {};
var g = new THREE.Group(), L = o.L || 30, B = o.B || 7, D = o.D || 4, fb = o.free || 1.6, dy = wy + fb, lite = cvwLite();
g.position.set(x, dy, z);
g.rotation.y = ry || 0;
P.add(g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
var hullM = cvwS("b:planks", o.hullCol || 0x2A2A2E, 2), deckM = cvwMat("deck"), rail = cvwMat("darkoak"), wood = cvwMat("oak"), iron = cvwMat("iron"), brass = cvwMat("brass");
var h = new THREE.Mesh(cvwHullGeo(L, B, D + fb), [deckM, hullM]);
h.position.y = 0;
g.add(h);
var bt = new THREE.Mesh(cvwHullGeo(L * 1.003, B * 1.01, 0.3), cvwLam(o.stripe || 0xE8E2D4));
bt.position.y = -fb + 0.15;
g.add(bt);
var n = lite ? 14 : 26;
for (var i = 0; i < n; i++) {
var t = i / (n - 1), zz = -L / 2 + 1.2 + t * (L - 1.8), hw = zz < -L * 0.05 ? (B / 2) * Math.min(1, Math.max(0.15, (zz + L / 2) / (L * 0.45))) : (zz > L * 0.36 ? B / 2 * 0.92 : B / 2);
[-1, 1].forEach(function (k) { cvwBox(g, 0.12, 0.9, (L - 1.8) / (n - 1) + 0.05, rail, k * (hw - 0.08), 0, zz); });
}
cvwName(g, o.name || "", B, L, fb);
(o.masts || []).forEach(function (mz, i) {
cvwCyl(g, 0.16, 0.24, o.mastH || 18, wood, 0, 0, mz, 10);
cvwCyl(g, 0.08, 0.1, 6, wood, 0, (o.mastH || 18) - 0.5, mz, 8);
var bm = cvwBox(g, 0.14, 0.14, i === (o.masts.length - 1) ? L * 0.4 : L * 0.3, wood, 0, 2.2, mz + (i === (o.masts.length - 1) ? L * 0.2 : L * 0.15));
if (o.sails !== false) {
var sl = new THREE.Mesh(cvwGeo("gaff" + L + i, function () { var sh = new THREE.Shape(), bl = (i === (o.masts.length - 1) ? L * 0.4 : L * 0.3); sh.moveTo(0, 0); sh.lineTo(bl * 0.95, 0); sh.lineTo(bl * 0.7, (o.mastH || 18) * 0.62); sh.lineTo(0, (o.mastH || 18) * 0.72); sh.lineTo(0, 0); return new THREE.ShapeGeometry(sh); }), cvwMat("sail"));
sl.position.set(0, 2.4, mz);
sl.rotation.y = -Math.PI / 2;
g.add(sl);
}
if (!lite)
[-1, 1].forEach(function (k) { for (var r = 0; r < 3; r++) {
var sh = new THREE.Mesh(cvwGeo("shroud", function () { return new THREE.CylinderGeometry(0.02, 0.02, 1, 4); }), cvwMat("rope"));
cvwStick(sh, { x: k * (B / 2 - 0.1), y: 0.9, z: mz - 0.6 + r * 0.6 }, { x: 0, y: (o.mastH || 18) - 1, z: mz });
g.add(sh);
} });
});
if (o.jib && o.masts && o.masts.length) {
var jb = new THREE.Mesh(cvwGeo("jib" + L, function () { var sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(L * 0.32, 0); sh.lineTo(0, (o.mastH || 18) * 0.7); sh.lineTo(0, 0); return new THREE.ShapeGeometry(sh); }), cvwMat("sail"));
jb.position.set(0, 1.2, o.masts[0] - 0.3);
jb.rotation.y = Math.PI / 2;
g.add(jb);
var bsp = cvwCyl(g, 0.08, 0.12, 7, wood, 0, 0.6, -L / 2 - 1.5, 8);
bsp.rotation.x = Math.PI / 2 - 0.2;
}
if (o.funnel != null) {
cvwCyl(g, 0.9, 1.0, 6.5, cvwLam(o.funnelCol || 0xC8B898), 0, 2.6, o.funnel, 14);
cvwCyl(g, 0.95, 0.95, 0.9, cvwLam(0x141414), 0, 8.6, o.funnel, 14);
cvwBox(g, B * 0.5, 2.6, L * 0.28, cvwS("b:oak", 0xE8E2D4, 1.2), 0, 0, o.funnel + 0.4);
cvwBox(g, B * 0.54, 0.12, L * 0.3, rail, 0, 2.6, o.funnel + 0.4);
for (var w = 0; w < 4; w++)
[-1, 1].forEach(function (k) { cvwBox(g, 0.05, 0.5, 0.6, cvwMat("pane"), k * B * 0.25 + k * 0.01, 1.4, o.funnel - L * 0.12 + w * L * 0.075); });
for (var v = 0; v < 2; v++) {
var vent = cvwCyl(g, 0.3, 0.3, 1.6, cvwLam(0xE8E2D4), (v ? 1 : -1) * 1.6, 0, o.funnel - 2.8, 10);
var cw = new THREE.Mesh(cvwGeo("cowl", function () { var cc = new THREE.SphereGeometry(0.5, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2); return cc; }), cvwLam(0xA83A2A, { ds: 1 }));
cw.position.set((v ? 1 : -1) * 1.6, 1.8, o.funnel - 2.8);
cw.rotation.x = -1.2;
g.add(cw);
}
if (o.smoke)
cvwSmoke(g, 0, 9.4, o.funnel, 0x3A3A3A, 8);
}
var wz = L * 0.38;
cvwBox(g, 0.12, 1.1, 0.12, wood, 0, 0, wz);
var wh = new THREE.Mesh(cvwGeo("wheel", function () { return new THREE.TorusGeometry(0.45, 0.035, 6, 18); }), wood);
wh.position.set(0, 1.2, wz - 0.1);
g.add(wh);
for (var sp = 0; sp < 8; sp++) {
var spk = cvwBox(g, 0.03, 0.6, 0.03, wood, 0, 0.9, wz - 0.1);
spk.position.y = 1.2;
spk.rotation.z = sp / 8 * Math.PI;
}
cvwCyl(g, 0.22, 0.26, 1.1, brass, 0, 0, wz - 1.4, 10);
cvwBox(g, 2.2, 0.5, 1.8, wood, 0, 0, -L * 0.18);
cvwBox(g, 1.6, 0.6, 1.3, cvwMat("glass"), 0, 0, L * 0.2);
for (var k2 = 0; k2 < (o.cannon || 0); k2++) {
var side = k2 % 2 ? 1 : -1, cz = -L * 0.25 + Math.floor(k2 / 2) * L * 0.17, gun = new THREE.Group();
gun.position.set(side * (B / 2 - 1.1), 0, cz);
gun.rotation.y = side * Math.PI / 2;
g.add(gun);
cvwBox(gun, 0.7, 0.35, 0.9, cvwMat("darkoak"), 0, 0, 0);
var br = cvwCyl(gun, 0.13, 0.2, 1.7, brass, 0, 0.45, 0, 12);
br.rotation.x = Math.PI / 2;
br.position.set(0, 0.55, -0.6);
}
if (o.boat) {
var bt2 = new THREE.Group();
bt2.position.set(B / 2 - 0.6, 0.9, L * 0.12);
g.add(bt2);
cvwBoat(bt2, 0, -0.5, 0, 0, {});
}
var slices = 8;
for (var q = 0; q < slices; q++) {
var z0 = -L / 2 + 1 + q * (L - 1.4) / slices, z1 = z0 + (L - 1.4) / slices, zm = (z0 + z1) / 2, hw2 = zm < -L * 0.05 ? (B / 2 - 0.3) * Math.min(1, Math.max(0.12, (zm + L / 2) / (L * 0.45))) : (zm > L * 0.36 ? B / 2 * 0.9 - 0.3 : B / 2 - 0.3);
var wx = x + (c * 0) + s * zm, wz2 = z + c * zm;
cvwFloor(wx, wz2, hw2 * 2, z1 - z0 + 0.1, dy + 0.02, { rot: ry || 0, deck: 1 });
[-1, 1].forEach(function (k) { cvwSolid(x + c * k * (hw2 + 0.25) + s * zm, z - s * k * (hw2 + 0.25) + c * zm, 0.3, z1 - z0 + 0.2, dy - 1, dy + 1.3, ry || 0); });
}
cvwSolid(x + s * (-L / 2 + 0.6), z + c * (-L / 2 + 0.6), 1.2, 0.4, dy - 1, dy + 1.3, ry || 0);
cvwSolid(x + s * (L / 2 - 0.3), z + c * (L / 2 - 0.3), B * 0.8, 0.4, dy - 1, dy + 1.3, ry || 0);
if (o.funnel != null)
cvwSolid(x + s * (o.funnel + 0.4), z + c * (o.funnel + 0.4), B * 0.5, L * 0.28, dy - 1, dy + 3, ry || 0);
(o.masts || []).forEach(function (mz) { cvwRound(x + s * mz, z + c * mz, 0.4, dy - 1, dy + 20); });
g.userData.keep = 1;
return { g: g, deckY: dy, at: function (lx, lz) { return { x: x + c * lx + s * lz, z: z - s * lx + c * lz, y: dy + 0.02 }; } };
},
function (P, x, wy, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, wy + (o.free || 2.4), z);
g.rotation.y = ry || 0;
P.add(g);
var L = o.L || 50, B = o.B || 10;
var h = new THREE.Mesh(cvwHullGeo(L, B, (o.D || 5) + (o.free || 2.4)), cvwS("b:planks", o.hullCol || 0x1E1E22, 3));
g.add(h);
var bt = new THREE.Mesh(cvwHullGeo(L * 1.003, B * 1.01, 0.5), cvwLam(0x8A2A1E));
bt.position.y = -(o.free || 2.4) + 0.25;
g.add(bt);
cvwBox(g, B * 0.7, 4, L * 0.32, cvwLam(o.house || 0xF0ECE0), 0, 0, -L * 0.02);
cvwBox(g, B * 0.5, 2.4, L * 0.18, cvwLam(o.house || 0xF0ECE0), 0, 4, -L * 0.04);
for (var w = 0; w < 8; w++)
[-1, 1].forEach(function (k) { cvwBox(g, 0.05, 0.6, 0.7, cvwMat("pane"), k * B * 0.35 + k * 0.01, 2.2, -L * 0.15 + w * L * 0.04); });
cvwCyl(g, 1.2, 1.3, 8, cvwLam(o.funnel || 0x2A2A2A), 0, 6, L * 0.08, 14);
cvwCyl(g, 1.25, 1.25, 1.2, cvwLam(o.band || 0xC83A2A), 0, 11.5, L * 0.08, 14);
if (o.masts !== false) {
cvwCyl(g, 0.2, 0.3, 16, cvwMat("oak"), 0, 0, -L * 0.36, 8);
cvwCyl(g, 0.2, 0.3, 14, cvwMat("oak"), 0, 0, L * 0.36, 8);
}
if (o.smoke)
cvwSmoke(g, 0, 13, L * 0.08, 0x3A3A3A, 8);
cvwName(g, o.name || "", B, L, o.free || 2.4);
g.userData.keep = 1;
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : cvwLand(x, z), w = o.w || 11, d = o.d || 8, st = o.st || 2, h = st * 3.1 + 0.4, lite = cvwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = cvwMat(o.wall || "clap"), trim = cvwMat("white"), pane = cvwMat("pane"), sh = cvwLam(o.shut || 0x2A3A2A), roofM = cvwMat(o.roof || "shingle");
cvwBox(g, w, h, d, wall, 0, 0, 0);
cvwBox(g, w + 0.1, 0.7, d + 0.1, cvwMat("granite"), 0, -0.3, 0);
cvwBox(g, w + 0.3, 0.25, d + 0.3, trim, 0, h - 0.25, 0);
[-1, 1].forEach(function (k) { [-1, 1].forEach(function (j) { cvwBox(g, 0.18, h, 0.18, trim, k * (w / 2 + 0.02), 0, j * (d / 2 + 0.02)); }); });
var rh = o.rh || (o.gambrel ? 4.2 : 3.4);
var rf = new THREE.Mesh(cvwGeo("colr" + w + "|" + d + "|" + rh + (o.gambrel ? "g" : ""), function () {
var s = new THREE.Shape(), hd = d / 2 + 0.45;
if (o.gambrel) {
s.moveTo(-hd, 0);
s.lineTo(-hd * 0.72, rh * 0.62);
s.lineTo(0, rh);
s.lineTo(hd * 0.72, rh * 0.62);
s.lineTo(hd, 0);
s.lineTo(-hd, 0);
}
else {
s.moveTo(-hd, 0);
s.lineTo(0, rh);
s.lineTo(hd, 0);
s.lineTo(-hd, 0);
}
var e = new THREE.ExtrudeGeometry(s, { depth: w + 0.5, bevelEnabled: false });
e.translate(0, 0, -(w + 0.5) / 2);
e.rotateY(Math.PI / 2);
var uv = e.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) / 2, uv.getY(i) / 2);
return e;
}), roofM);
rf.position.y = h;
g.add(rf);
var chm = cvwMat("redbrick");
if (o.central)
cvwBox(g, 1.4, rh + 1.6, 1.4, chm, 0, h - 0.4, 0);
else
[-1, 1].forEach(function (k) { cvwBox(g, 1.0, rh + 1.4, 0.9, chm, k * (w / 2 - 0.7), h - 0.4, 0); });
var n = Math.max(3, Math.floor(w / 2.4) | 1);
for (var f = 0; f < st; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * 3.1;
if (f === 0 && i === (n - 1) / 2 && !o.noDoor) {
cvwBox(g, 1.1, 2.3, 0.1, cvwLam(o.door || 0x2A1E14), wx, 0.2, d / 2 + 0.03);
var fan = new THREE.Mesh(cvwGeo("fan", function () { return new THREE.CircleGeometry(0.55, 12, 0, Math.PI); }), cvwGlowM(o.lit ? 0xFFD890 : 0x6A7480));
fan.position.set(wx, 2.55, d / 2 + 0.06);
g.add(fan);
cvwBox(g, 1.7, 0.18, 0.3, trim, wx, 3.05, d / 2 + 0.12);
[-1, 1].forEach(function (k) { cvwBox(g, 0.2, 2.9, 0.2, trim, wx + k * 0.75, 0.2, d / 2 + 0.1); });
cvwBox(g, 1.8, 0.2, 1.0, cvwMat("granite"), wx, 0, d / 2 + 0.5);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
cvwBox(g, 1.05, 1.75, 0.06, trim, wx, wy, zz);
cvwBox(g, 0.85, 1.55, 0.05, o.lit && ((i + f) % 3 === 0) ? cvwGlowM(0xFFD890) : pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
cvwBox(g, 0.85, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { cvwBox(g, 0.42, 1.65, 0.05, sh, wx + s * 0.66, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
if (o.dormers && !lite)
for (var dm = 0; dm < o.dormers; dm++) {
var dg = new THREE.Group();
dg.position.set(-w / 2 + (dm + 0.5) * w / o.dormers, h + rh * 0.2, d / 2 - rh * 0.35);
g.add(dg);
cvwBox(dg, 1.2, 1.4, 1.2, wall, 0, 0, 0);
cvwBox(dg, 0.7, 0.9, 0.05, pane, 0, 0.25, 0.62);
var dr = new THREE.Mesh(cvwGeo("drm", function () { var c = new THREE.ConeGeometry(0.95, 0.8, 4, 1); c.rotateY(Math.PI / 4); return c; }), roofM);
dr.position.y = 1.8;
dr.scale.set(1, 1, 1.1);
dg.add(dr);
}
cvwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : cvwLand(x, z), w = o.w || 14, d = o.d || 12, st = o.st || 3, h = st * 3.4, lite = cvwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = o.mat ? cvwMat(o.mat) : cvwS("brick", o.col || 0xA85A44, 1.4), stone = cvwMat(o.stone || "ashlar"), pane = cvwMat("pane");
cvwBox(g, w, h, d, br, 0, 0, 0);
cvwBox(g, w + 0.4, 0.6, d + 0.4, stone, 0, h, 0);
cvwBox(g, w + 0.1, 0.5, d + 0.1, cvwMat("granite"), 0, 0, 0);
if (o.roof === "hip") {
var rf = new THREE.Mesh(cvwGeo("bhip" + w + "|" + d, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.6, Math.min(w, d) * 0.32, d + 0.6); return c; }), cvwMat("slate"));
rf.position.y = h + 0.6;
g.add(rf);
}
if (o.cupola) {
var cg = new THREE.Group();
cg.position.y = h + 0.6 + Math.min(w, d) * 0.28;
g.add(cg);
cvwBox(cg, 2.6, 2.2, 2.6, cvwMat("white"), 0, 0, 0);
for (var c = 0; c < 4; c++) {
var a = c * Math.PI / 2;
cvwBox(cg, 0.9, 1.4, 0.05, cvwLam(0x1A1A1A), Math.sin(a) * 1.32, 0.4, Math.cos(a) * 1.32).rotation.y = a;
}
var dm = new THREE.Mesh(new THREE.ConeGeometry(1.8, 1.6, 8), cvwMat("slate"));
dm.position.y = 3.0;
cg.add(dm);
}
var n = Math.max(2, Math.floor(w / 2.8));
for (var f = 0; f < st; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.4;
if (f === 0 && o.shops) {
cvwBox(g, w / n - 0.5, 2.6, 0.08, o.lit ? cvwGlowM(0xF2C67A) : cvwMat("pane"), wx, 0.5, d / 2 + 0.04);
cvwBox(g, w / n - 0.3, 0.5, 0.14, cvwLam(o.fascia || 0x1E2A22), wx, 3.0, d / 2 + 0.08);
continue;
}
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
cvwBox(g, 1.4, 2.6, 0.1, cvwLam(0x2A1E14), wx, 0, d / 2 + 0.03);
cvwBox(g, 1.9, 0.3, 0.2, stone, wx, 2.7, d / 2 + 0.08);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) { cvwBox(g, 1.0, 1.8, 0.06, o.lit && ((i + f) % 3 === 1) ? cvwGlowM(0xF2C67A) : pane, wx, wy + 0.2, zz); cvwBox(g, 1.2, 0.14, 0.14, stone, wx, wy + 0.1, zz + (k ? -0.05 : 0.05)); cvwBox(g, 1.2, 0.2, 0.14, stone, wx, wy + 2.05, zz + (k ? -0.05 : 0.05)); });
}
if (o.sign)
cvwSign(g, o.sign, Math.min(w - 1, o.sign.length * 0.42), 0.7, 0, o.shops ? 3.0 : h - 0.5, d / 2 + 0.18, 0, { bg: o.signBg || "#1E2A22", ink: o.signInk || "#E8D8A0" });
cvwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + h + 2, o.ry || 0);
return g;
},
function () {
return cvwGeo("sedWheel", function () {
var parts = [], t = new THREE.TorusGeometry(0.29, 0.022, 6, 22);
t.rotateY(Math.PI / 2);
parts.push(t.toNonIndexed());
for (var i = 0; i < 12; i++) {
var b = new THREE.BoxGeometry(0.024, 0.56, 0.03);
b.rotateX(i / 12 * Math.PI);
parts.push(b.toNonIndexed());
}
var h = new THREE.CylinderGeometry(0.075, 0.075, 0.15, 10);
h.rotateZ(Math.PI / 2);
parts.push(h.toNonIndexed());
return gwMerge(parts);
});
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : cvwLand(x, z), lite = cvwLite();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var body = cvwShine(o.col || 0x14161A, 0.3, 0.45), blk = cvwLam(0x0E0E0E), chrome = cvwShine(0xD4D4D0, 0.18, 0.95), pane = cvwMat("pane"), tire = cvwLam(0x141414), spoke = cvwLam(o.spoke || 0xB8A888), wingM = cvwM("sedWingM" + (o.col || 0x14161A), function () { var m = body.clone(); m.side = THREE.DoubleSide; m.userData.noPhoto = 1; return m; });
cvwBox(g, 1.05, 0.2, 3.9, blk, 0, 0.3, 0.05);
cvwBox(g, 0.98, 0.56, 1.32, body, 0, 0.6, -1.28);
cvwBox(g, 0.1, 0.5, 1.3, chrome, 0, 1.08, -1.28);
cvwBox(g, 0.92, 0.9, 0.12, chrome, 0, 0.42, -2.0);
cvwBox(g, 0.72, 0.7, 0.04, blk, 0, 0.52, -2.07);
cvwCyl(g, 0.04, 0.05, 0.1, chrome, 0, 1.32, -2.0, 8);
cvwBox(g, 1.46, 0.5, 2.12, body, 0, 0.6, 0.5);
cvwBox(g, 1.46, 0.48, 2.12, body, 0, 1.1, 0.5).scale.set(1, 1, 1);
[-1, 1].forEach(function (k) { cvwBox(g, 0.03, 0.4, 0.82, pane, k * 0.74, 1.14, 0.02); cvwBox(g, 0.03, 0.4, 0.82, pane, k * 0.74, 1.14, 0.98); cvwBox(g, 0.035, 0.42, 0.06, body, k * 0.74, 1.13, 0.5); });
var ws = cvwBox(g, 1.28, 0.46, 0.04, pane, 0, 1.12, -0.57);
ws.rotation.x = 0.08;
cvwBox(g, 1.0, 0.36, 0.04, pane, 0, 1.16, 1.57);
cvwBox(g, 1.56, 0.08, 2.3, blk, 0, 1.6, 0.48);
cvwBox(g, 1.4, 0.05, 0.22, blk, 0, 1.58, -0.72);
[[-1.3], [1.32]].forEach(function (q, i) {
[-1, 1].forEach(function (k) {
var w = new THREE.Mesh(cvwSedanWingG(), wingM);
w.position.set(k * 0.8, 0.44, q[0]);
g.add(w);
var t = new THREE.Mesh(cvwSedanTireG(), tire);
t.position.set(k * 0.8, 0.43, q[0]);
g.add(t);
var s = new THREE.Mesh(cvwSedanWheelG(), spoke);
s.position.set(k * 0.8, 0.43, q[0]);
g.add(s);
});
});
[-1, 1].forEach(function (k) {
cvwBox(g, 0.3, 0.05, 1.7, blk, k * 0.84, 0.36, 0.02);
var fw = cvwBox(g, 0.34, 0.04, 0.55, body, k * 0.8, 0.5, -0.82);
fw.rotation.x = -0.42;
var rw = cvwBox(g, 0.34, 0.04, 0.45, body, k * 0.8, 0.5, 0.88);
rw.rotation.x = 0.45;
var hl = new THREE.Mesh(cvwGeo("sedLamp", function () { var c = new THREE.CylinderGeometry(0.14, 0.12, 0.22, 12); c.rotateX(Math.PI / 2); return c; }), chrome);
hl.position.set(k * 0.52, 1.0, -2.02);
g.add(hl);
var ln = new THREE.Mesh(cvwGeo("sedLens", function () { return new THREE.CircleGeometry(0.12, 12); }), o.lit ? cvwGlowM(0xFFF0C0) : cvwLam(0xE8E6DA));
ln.position.set(k * 0.52, 1.0, -2.135);
ln.rotation.y = Math.PI;
g.add(ln);
cvwBox(g, 0.08, 0.05, 0.05, cvwLam(0x8A1A14), k * 0.6, 0.62, 2.14);
});
cvwBox(g, 1.0, 0.04, 0.04, chrome, 0, 0.98, -2.02);
cvwBox(g, 1.7, 0.09, 0.09, chrome, 0, 0.34, -2.18);
cvwBox(g, 1.7, 0.09, 0.09, chrome, 0, 0.34, 2.24);
var sp = new THREE.Mesh(cvwSedanTireG(), tire);
sp.rotation.y = Math.PI / 2;
sp.position.set(0, 0.8, 1.8);
g.add(sp);
if (!lite) {
var ss = new THREE.Mesh(cvwSedanWheelG(), spoke);
ss.rotation.y = Math.PI / 2;
ss.position.set(0, 0.8, 1.8);
g.add(ss);
}
cvwSolid(x, z, 1.9, 4.5, y - 0.5, y + 1.8, ry || 0);
g.userData.keep = 1;
return g;
},
function () {
return cvwGeo("elm", function () {
var parts = [], R = wRand(23);
var t = new THREE.CylinderGeometry(0.28, 0.5, 5, 7);
t.translate(0, 2.5, 0);
parts.push(t.toNonIndexed());
for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.283 + R() * 0.5, L = 5 + R() * 3;
var b = cvwTaper([[0, 4.4, 0], [Math.cos(a) * 1.6, 7 + R(), Math.sin(a) * 1.6], [Math.cos(a) * 3.2, 9.5 + R() * 2, Math.sin(a) * 3.2], [Math.cos(a) * (3.6 + R()), 11 + R() * 2.5, Math.sin(a) * (3.6 + R())]], [0.22, 0.15, 0.08, 0.03], 6, 5);
parts.push(b.index ? b.toNonIndexed() : b);
for (var j = 0; j < 2; j++) {
var a2 = a + (R() - 0.5) * 1.2;
var c = cvwTaper([[Math.cos(a) * 2.2, 8.4, Math.sin(a) * 2.2], [Math.cos(a2) * 3.6, 10.5 + R() * 2, Math.sin(a2) * 3.6], [Math.cos(a2) * 4.6, 12 + R() * 2, Math.sin(a2) * 4.6]], [0.07, 0.04, 0.015], 4, 4);
parts.push(c.index ? c.toNonIndexed() : c);
}
}
parts.forEach(function (p) { if (p.attributes.uv)
p.deleteAttribute("uv"); if (p.attributes.normal)
p.deleteAttribute("normal"); });
var g = gwMerge(parts);
g.computeVertexNormals();
return g;
});
},
function (P, list, leaf) {
if (!list.length)
return;
var lite = cvwLite();
if (lite && list.length > 40)
list = list.filter(function (t, i) { return i % 2 === 0; });
cvwInst(P, cvwElmGeo(), cvwLam(0x4A4038), list, { shadow: !lite });
if (leaf)
cvwInst(P, cvwGeo("elmC" + (lite ? "l" : ""), function () { var parts = [], R = wRand(29); for (var i = 0; i < (lite ? 5 : 9); i++) {
var a = i / 9 * 6.283, r = 2.6 + R() * 1.6, c = new THREE.IcosahedronGeometry(1.8 + R() * 1.2, 1);
c.translate(Math.cos(a) * r, 10.5 + R() * 2.5, Math.sin(a) * r);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), cvwM("elmL" + leaf, function () { var m = new THREE.MeshLambertMaterial({ color: leaf, map: cvwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = cvwLam(0x1E2422);
cvwCyl(g, 0.08, 0.14, 4.2, ir, 0, 0, 0, 8);
cvwCyl(g, 0.2, 0.24, 0.4, ir, 0, 0, 0, 8);
var gl = new THREE.Mesh(cvwGeo("eglobe", function () { return new THREE.SphereGeometry(0.26, 12, 10); }), o.lit ? cvwGlowM(0xFFE8B8) : cvwLam(0xE8E4D8));
gl.position.y = 4.45;
g.add(gl);
if (o.lit) {
var w = wGlow(0xFFD890, 1.6, 0.35);
w.position.y = 4.45;
g.add(w);
}
cvwRound(x, z, 0.2);
return g;
},
function (P, pts, w, hfn, o) {
o = o || {};
var off = (w / 2) + (o.sw || 1.6);
[-1, 1].forEach(function (k) {
var line = [];
for (var i = 0; i < pts.length; i++) {
var a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz) || 1;
line.push([pts[i][0] - dz / L * off * k, pts[i][1] + dx / L * off * k]);
}
cvwStrip(P, line, (o.sw || 1.6) * 2, hfn, cvwS("brick", 0x9A5A48, 0.6), 0.09);
});
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.cvcow)
return;
var tail = function (c) { return { l: 0.8, r: 0.07, up: -1.3, col: c }; };
CRX_PLANS.cvdark = function () { return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x2A1C14, back: 0x1E140E, muzzle: 0x1A1210, mane: 0x0E0A08, foot: "hoof", tail: tail(0x0E0A08), neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0 }); };
CRX_PLANS.cvmule = function () { return crxQuad({ L: 0.95, H: 0.92, G: 0.32, W: 0.74, legR: 0.045, head: "horse", hs: 1.25, col: 0x6A625A, back: 0x5A524A, muzzle: 0x3A3430, mane: 0x2A2622, foot: "hoof", tail: tail(0x2A2622), neck: { l: 0.5, up: 0.8 }, neckR0: 0.5, neckR1: 0.32, stride: 1.6, runAt: 3.0 }); };
CRX_PLANS.cvcow = function () { return crxQuad({ L: 1.15, H: 0.9, G: 0.42, W: 0.86, legR: 0.06, head: "bull", hs: 1.05, col: 0xD8CCB8, back: 0x8A5A3A, belly: 0xE8E0D0, muzzle: 0xC89A8A, mane: 0x8A5A3A, foot: "hoof", tail: { l: 0.7, r: 0.04, up: -1.5, col: 0x8A5A3A }, neck: { l: 0.35, up: 0.5 }, neckR0: 0.6, neckR1: 0.45, stride: 1.4, runAt: 2.4 }); };
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = null, key = o.kind || "horse";
if (o.plain)
return cvwPlainBeast(P, x, y, z, ry, o);
var crx = false;
try {
cvwCrxKinds();
crx = typeof crxBuild === "function" && typeof crxHas === "function" && crxHas(key) && !cvwLite() && typeof CRX !== "undefined";
}
catch (e) { }
if (crx && CRX.geo[key]) {
try {
g = crxBuild(key);
if (g) {
var w = new THREE.Group();
w.add(g);
g.scale.multiplyScalar(o.s || 1.55);
g = w;
}
}
catch (e) {
g = null;
}
}
else if (crx) {
try {
crxWarm([key]);
}
catch (e) { }
var hold = new THREE.Group();
hold.position.set(x, y, z);
hold.rotation.y = ry || 0;
hold.userData.live = 1;
hold.userData.keep = 1;
P.add(hold);
var stand = cvwHorse(hold, 0, 0, 0, 0, { col: o.col, plain: 1, kind: key });
CVW.ticks.push(function () { if (!hold.parent || hold.userData.done || !CRX.geo[key])
return; hold.userData.done = 1; try {
var c = crxBuild(key);
if (c) {
c.scale.multiplyScalar(o.s || 1.55);
hold.remove(stand);
hold.add(c);
}
}
catch (e) { } });
return hold;
}
if (!g)
return cvwPlainBeast(P, x, y, z, ry, o);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), cow = o.kind === "cvcow", c = cvwLam(o.col || (cow ? 0xD8CCB8 : 0x5A3A22)), dk = cvwLam(0x1A120C);
{
if (cow)
g.scale.set(1.15, 0.9, 1.05);
cvwEll(g, c, 0.34, 0.36, 0.85, 0, 1.25, 0, 12);
var nk = cvwCyl(g, 0.16, 0.24, 0.8, c, 0, 1.3, -0.7, 8);
nk.rotation.x = -0.7;
var hd = cvwEll(g, c, 0.13, 0.15, 0.34, 0, 1.85, -1.05, 10);
hd.rotation.x = 0.6;
[[-0.2, -0.55], [0.2, -0.55], [-0.2, 0.55], [0.2, 0.55]].forEach(function (q) { cvwCyl(g, 0.06, 0.05, 1.0, c, q[0], 0, q[1], 6); cvwCyl(g, 0.07, 0.07, 0.1, dk, q[0], 0, q[1], 6); });
var mn = cvwBox(g, 0.05, 0.4, 0.7, dk, 0, 1.45, -0.75);
mn.rotation.x = -0.7;
var tl = cvwCyl(g, 0.06, 0.03, 0.7, dk, 0, 0.9, 0.95, 6);
tl.rotation.x = 0.3;
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group(), w = cvwLam(0xE8E2D4), dk = cvwLam(0x3A2E26);
var b = cvwEll(g, w, 0.32, 0.3, 0.5, 0, 0.62, 0, 10);
var h = cvwEll(g, dk, 0.1, 0.11, 0.16, 0, 0.62, -0.56, 8);
h.rotation.x = 0.5;
cvwEll(g, w, 0.13, 0.1, 0.12, 0, 0.76, -0.44, 8);
[[-0.14, -0.28], [0.14, -0.28], [-0.14, 0.28], [0.14, 0.28]].forEach(function (q) { cvwCyl(g, 0.035, 0.03, 0.42, dk, q[0], 0, q[1], 6); });
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
P.add(g);
return g;
},
function (G) {
var X = CVW_ROOMXZ.providence, R, lite = cvwLite(), st = CVW.st;
R = cvwRoom(G, "angell", X.angell[0], X.angell[1], 10, 8, { wall: "damask", name: "Professor Angell's study, Williams Street", env: "study", lightI: 0.85 });
cvwShelves(R.g, -4.8, -1, 3.4, 2.6, Math.PI / 2, {});
cvwShelves(R.g, -4.8, 2.2, 2.4, 2.6, Math.PI / 2, {});
cvwShelves(R.g, 4.8, -1, 3.4, 2.6, -Math.PI / 2, {});
cvwShelves(R.g, 0, -3.8, 4, 2.8, 0, {});
cvwTable(R.g, 0.4, -0.6, 2.2, 1.1, 0.78, { mat: "darkoak" });
cvwChair(R.g, 0.4, 0.2, Math.PI, { arm: 1, seat: "leather" });
cvwChair(R.g, -2.2, 1.6, Math.PI / 2, { arm: 1, seat: "leather" });
cvwRug(R.g, 0, 0.6, 4, 3, 0x5A2A22);
cvwHearth(R.g, 4.7, 2.2, -Math.PI / 2, { h: R.h });
cvwWindowIn(R.g, -1.6, 2.0, 3.88, Math.PI, 1.2, 1.5, { sky: st.season === "winter" ? 0xC8D0D8 : 0xB8D0E8 });
cvwWindowIn(R.g, 1.6, 2.0, 3.88, Math.PI, 1.2, 1.5, { sky: st.season === "winter" ? 0xC8D0D8 : 0xB8D0E8 });
cvwPapers(R.g, 0.2, 0.79, -0.7, 14);
cvwCandle(R.g, 1.2, 0.79, -0.9, { brass: 1 });
cvwTinBox(R.g, -0.4, 0.79, -0.6, 0.2, { open: !!st.boxOpen });
for (var b = 0; b < (lite ? 4 : 9); b++)
cvwBox3(R.g, 0.5, 0.32, 0.4, cvwLam([0x6A5A44, 0x5A4A36, 0x7A6A50][b % 3]), -3.4 + ((b * 1.3) % 3), b % 2 ? 0.32 : 0, -2.6 + (b % 3) * 0.5);
cvwPicture(R.g, 0, 2.2, 3.88, Math.PI, 1.0, 0.7, function (c, W, H) { c.fillStyle = "#C8BCA0"; c.fillRect(0, 0, W, H); cvwGlyphDraw(c, W, H, 5, "rgba(60,40,20,.8)"); });
R = cvwRoom(G, "angellhall", X.angellhall[0], X.angellhall[1], 7, 6, { wall: "greenpaper", name: "the hall of Professor Angell's house", env: "study" });
cvwTable(R.g, -2.4, -1.4, 1.2, 0.5, 0.85, {});
cvwPicture(R.g, 0, 2.1, -2.88, 0, 1.2, 0.9);
cvwRug(R.g, 0, 0, 2.4, 4, 0x3A2A4A);
cvwChair(R.g, 2.4, -2, 0, {});
[["fleur", 0], ["fleur26", 1]].forEach(function (F) {
R = cvwRoom(G, F[0], X[F[0]][0], X[F[0]][1], 10, 8, { wall: "plaster", floor: "planks", name: F[1] ? "Wilcox's rooms in the Fleur-de-Lys Building, 1926" : "Wilcox's rooms in the Fleur-de-Lys Building, 1925", beams: true, env: "garret", lightI: 0.75 });
cvwBed(R.g, -3.6, -1.8, Math.PI / 2, { cover: 0x5A5A6A });
cvwTable(R.g, 1.6, -2.8, 2.4, 0.9, 0.8, { mat: "planks" });
cvwChair(R.g, 1.6, -2, Math.PI, {});
cvwWindowIn(R.g, 0, 2.2, 3.88, Math.PI, 1.6, 1.6, { sky: 0x9AA8B8 });
cvwCyl(R.g, 0.35, 0.4, 0.9, cvwMat("oak"), 0.4, 0, 0.4, 10);
cvwBasRelief(R.g, 0.4, 0.9, 0.4, 0, { wet: !F[1], s: 3 });
for (var i = 0; i < 5; i++) {
var bl = cvwEll(R.g, cvwMat("clay"), 0.18, 0.14, 0.16, 2.6 + ((i * 0.37) % 1), 0.83, -2.9 + ((i * 0.29) % 0.5), 8);
}
for (var s2 = 0; s2 < (lite ? 3 : 6); s2++) {
var sc = new THREE.Group();
sc.position.set(-4.2 + s2 * 0.7, 0, 3.4);
R.g.add(sc);
cvwCyl(sc, 0.2, 0.22, 0.9, cvwMat("white"), 0, 0, 0, 8);
var bust = cvwEll(sc, cvwMat("clay"), 0.14, 0.2, 0.14, 0, 1.1, 0, 8);
}
if (F[1]) {
var stt = new THREE.Group();
stt.position.set(3.6, 0, 1.6);
stt.rotation.y = -2.2;
R.g.add(stt);
cvwCyl(stt, 0.5, 0.55, 0.8, cvwMat("oak"), 0, 0, 0, 10);
var Fm = cvwForm(cvwMat("clay"), { feelers: lite ? 6 : 10 });
Fm.scale.setScalar(0.85);
Fm.position.y = 0.8;
stt.add(Fm);
stt.userData.keep = 1;
}
cvwCandle(R.g, 1.0, 0.81, -3.0, {});
});
R = cvwRoom(G, "wilbed", X.wilbed[0], X.wilbed[1], 8, 7, { wall: "bluepaper", name: "Wilcox's bedroom, Waterman Street", lightI: 0.6 });
cvwBed(R.g, -2.2, -1.2, Math.PI / 2, { posts: 1, cover: 0xE8E4DA });
cvwChair(R.g, -0.6, -0.6, -Math.PI / 2, {});
cvwTable(R.g, 2.8, -2.6, 1.0, 0.6, 0.8, {});
cvwCyl(R.g, 0.2, 0.16, 0.14, cvwLam(0xF0ECE4), 2.8, 0.8, -2.6, 16);
cvwWindowIn(R.g, 0, 2.0, -3.38, 0, 1.2, 1.4, { sky: 0xA8B8C8 });
cvwCandle(R.g, 2.6, 0.81, -2.4, { brass: 1 });
cvwRug(R.g, 0, 0.6, 3, 2, 0x4A5A7A);
R = cvwRoom(G, "tobey", X.tobey[0], X.tobey[1], 8, 7, { wall: "greenpaper", name: "Dr. Tobey's office, Thayer Street" });
cvwTable(R.g, 0, -1.6, 1.8, 0.9, 0.78, { mat: "darkoak" });
cvwChair(R.g, 0, -2.4, 0, { arm: 1, seat: "leather" });
cvwChair(R.g, 0, -0.6, Math.PI, {});
cvwShelves(R.g, 3.8, 0, 3, 2.4, -Math.PI / 2, { jars: 1 });
cvwShelves(R.g, -3.8, 0, 3, 2.4, Math.PI / 2, {});
cvwBed(R.g, -2.6, 2.0, 0, { cover: 0xF4F2EC });
cvwPapers(R.g, 0.2, 0.79, -1.6, 5);
R = cvwRoom(G, "boston", X.boston[0], X.boston[1], 10, 8, { wall: "damask", name: "Thurston's quarters in Boston", env: "study", lightI: 0.8 });
cvwShelves(R.g, -4.8, 0, 4, 2.6, Math.PI / 2, {});
cvwShelves(R.g, 4.8, 0, 4, 2.6, -Math.PI / 2, {});
cvwTable(R.g, 0, -1.4, 2.4, 1.2, 0.78, { mat: "darkoak" });
cvwChair(R.g, 0, -0.6, Math.PI, { arm: 1, seat: "leather" });
for (var b2 = 0; b2 < (lite ? 5 : 12); b2++)
cvwBox3(R.g, 0.5, 0.32, 0.4, cvwLam([0x6A5A44, 0x5A4A36, 0x7A6A50][b2 % 3]), -3 + ((b2 * 1.7) % 6), b2 > 6 ? 0.32 : 0, 2.4 + (b2 % 2) * 0.5);
cvwPapers(R.g, 0, 0.79, -1.4, 20);
cvwCandle(R.g, 1.0, 0.79, -1.8, { brass: 1 });
cvwTinBox(R.g, -0.6, 0.79, -1.3, 0, { open: st.boxOpen !== false });
cvwWindowIn(R.g, 0, 2.0, -3.88, 0, 1.6, 1.5, { sky: 0xA8B4C0 });
cvwHearth(R.g, -4.7, -3, Math.PI / 2, { h: R.h });
R = cvwRoom(G, "paterson", X.paterson[0], X.paterson[1], 12, 8, { wall: "plaster", floor: "planks", name: "the rear room of the museum, Paterson, New Jersey", bare: 1, lightI: 0.7 });
for (var sh = 0; sh < 4; sh++) {
var shf = cvwShelves(R.g, -4.5 + sh * 3, -1.6 + (sh % 2) * 3, 2.4, 2.4, sh % 2 ? Math.PI : 0, {});
}
var Rr = wRand(818);
for (var k = 0; k < (lite ? 18 : 46); k++) {
var st2 = new THREE.Mesh(cvwGeo("spec" + (k % 4), function () { var dd = new THREE.DodecahedronGeometry(0.1 + (k % 4) * 0.03, 0); return dd; }), cvwLam([0x8A7A6A, 0xB8A890, 0x6A7A8A, 0xA88A6A, 0xD8D0C0][k % 5]));
st2.position.set(-5.4 + Rr() * 10.8, 0.48 + Math.floor(Rr() * 5) * 0.47, -1.6 + (Rr() < 0.5 ? 0 : 3) + (Rr() - 0.5) * 0.2);
R.g.add(st2);
}
cvwTable(R.g, 0, 2.6, 2.6, 1.0, 0.8, { mat: "planks" });
cvwPapers(R.g, 0, 0.81, 2.6, 8);
R = cvwRoom(G, "club", X.club[0], X.club[1], 10, 8, { wall: "damask", name: "the Providence Art Club", lightI: 0.8 });
for (var p = 0; p < 6; p++)
cvwPicture(R.g, -4 + p * 1.6, 2.1, -3.88, 0, 1.1, 0.8, null);
cvwTable(R.g, 0, 0, 2, 1, 0.78, {});
for (var c2 = 0; c2 < 4; c2++)
cvwChair(R.g, -1.4 + c2 * 0.9, 1.0, Math.PI, {});
cvwHearth(R.g, 4.7, 0, -Math.PI / 2, { h: R.h });
},
function (G, x, z, H) {
var g = new THREE.Group(), y = H(x, z);
g.position.set(x, y, z);
G.add(g);
var w = 16, d = 12, h = 10;
var stucco = cvwS("b:stucco", 0xD8CCB0, 3), timber = cvwMat("darkoak"), pane = cvwMat("pane");
cvwBox(g, w, h, d, stucco, 0, 0, 0);
cvwBox(g, w + 0.2, 0.6, d + 0.2, cvwMat("granite"), 0, 0, 0);
for (var i = 0; i <= 8; i++)
cvwBox(g, 0.22, h - 0.6, 0.08, timber, -w / 2 + i * w / 8, 0.6, d / 2 + 0.05);
[3.4, 6.6, h - 0.3].forEach(function (yy) { cvwBox(g, w, 0.22, 0.08, timber, 0, yy, d / 2 + 0.05); });
for (i = 0; i < 8; i++) {
var br = cvwBox(g, 0.16, 3.6, 0.07, timber, -w / 2 + (i + 0.5) * w / 8, 3.4, d / 2 + 0.06);
br.rotation.z = (i % 2 ? 1 : -1) * 0.6;
}
[-5, 0, 5].forEach(function (gx, k) {
var gh = k === 1 ? 7 : 5, gw = k === 1 ? 6 : 4.6;
var gb = new THREE.Mesh(cvwGeo("fgab" + gw + gh, function () { var s = new THREE.Shape(); s.moveTo(-gw / 2, 0); s.lineTo(0, gh); s.lineTo(gw / 2, 0); s.lineTo(-gw / 2, 0); return new THREE.ExtrudeGeometry(s, { depth: 0.4, bevelEnabled: false }); }), stucco);
gb.position.set(gx, h, d / 2 - 0.35);
g.add(gb);
[-1, 1].forEach(function (s) { var bb = cvwBox(g, 0.2, Math.hypot(gw / 2, gh) + 0.2, 0.1, timber, gx + s * gw / 4, h, d / 2 + 0.08); bb.rotation.z = s * Math.atan2(gw / 2, gh); });
cvwBox(g, 1.0, 1.4, 0.06, pane, gx, h + 1.2, d / 2 + 0.08);
});
var fl = cvwSign(g, "⚜", 1.0, 1.0, 0, h + 4.4, d / 2 + 0.12, 0, { bg: "#D8CCB0", ink: "#3A2A1A" });
var rf = new THREE.Mesh(cvwGeo("fleurroof", function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.4, 0); s.lineTo(0, 6.5); s.lineTo(d / 2 + 0.4, 0); s.lineTo(-d / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: w + 0.6, bevelEnabled: false }); e.translate(0, 0, -(w + 0.6) / 2); e.rotateY(Math.PI / 2); return e; }), cvwMat("slate"));
rf.position.y = h;
g.add(rf);
[-6, 6].forEach(function (cx) { cvwBox(g, 1.1, 5, 1.1, cvwMat("redbrick"), cx, h + 1.5, -2); });
for (var f = 0; f < 2; f++)
for (i = 0; i < 6; i++) {
if (f === 0 && (i === 2 || i === 3))
continue;
cvwBox(g, 1.1, 1.6, 0.06, pane, -w / 2 + 1.4 + i * 2.65, 1.2 + f * 3.4, d / 2 + 0.1);
}
cvwBox(g, 3.4, 2.6, 1.2, stucco, 0, 4.0, d / 2 + 0.6);
cvwBox(g, 3.0, 1.8, 0.06, pane, 0, 4.4, d / 2 + 1.22);
cvwBox(g, 3.6, 0.3, 1.4, timber, 0, 3.8, d / 2 + 0.6);
cvwBox(g, 1.6, 2.8, 0.12, cvwLam(0x2A1A10), 0, 0.4, d / 2 + 0.1);
cvwSign(g, "THE FLEUR-DE-LYS", 3.2, 0.42, 0, 3.25, d / 2 + 0.14, 0, { bg: "#2A1A10", ink: "#E8D8A0" });
cvwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + h + 7, 0);
g.rotation.y = Math.PI;
return g;
},
function (G, x, z, H) {
var g = new THREE.Group(), y = H(x, z);
g.position.set(x, y, z);
G.add(g);
var W = 24, L = 24, Hh = 12, white = cvwMat("white"), pane = cvwMat("pane");
cvwBox(g, W, Hh, L, white, 0, 0, 0);
cvwBox(g, W + 0.3, 1.0, L + 0.3, cvwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(cvwGeo("mhroof", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(W + 1, 6, L + 1); return c; }), cvwMat("slate"));
rf.position.y = Hh;
g.add(rf);
for (var i = 0; i < 5; i++)
[-1, 1].forEach(function (k) { cvwBox(g, 0.08, 3.2, 1.5, pane, k * (W / 2 + 0.02), 1.8, -L / 2 + 3 + i * (L - 6) / 4); cvwBox(g, 0.08, 2.6, 1.5, pane, k * (W / 2 + 0.02), 6.8, -L / 2 + 3 + i * (L - 6) / 4); });
var T = new THREE.Group();
T.position.set(0, 0, L / 2 + 3);
g.add(T);
cvwBox(T, 7, 16, 6, white, 0, 0, 0);
cvwBox(T, 2.4, 4, 0.1, cvwLam(0x3A2A1A), 0, 0, 3.05);
cvwBox(T, 7.6, 0.5, 6.6, white, 0, 16, 0);
var bel = new THREE.Group();
bel.position.y = 16.5;
T.add(bel);
cvwBox(bel, 5.6, 6, 5.6, cvwLam(0x2A2A2A), 0, 0, 0);
for (var c = 0; c < 8; c++) {
var a = c / 8 * 6.283;
cvwCyl(bel, 0.22, 0.24, 6, white, Math.cos(a) * 3.1, 0, Math.sin(a) * 3.1, 10);
}
cvwBox(bel, 6.8, 0.6, 6.8, white, 0, 6, 0);
var oc = cvwCyl(bel, 2.6, 2.8, 5, white, 0, 6.6, 0, 8);
var oc2 = cvwCyl(bel, 1.9, 2.1, 4, white, 0, 11.6, 0, 8);
for (c = 0; c < 8; c++) {
var a2 = c / 8 * 6.283;
cvwBox(bel, 0.6, 2.2, 0.05, cvwLam(0x2A2A2A), Math.cos(a2) * 2.72, 7.6, Math.sin(a2) * 2.72).rotation.y = -a2 + Math.PI / 2;
}
var sp = new THREE.Mesh(cvwGeo("mhspire", function () { var cc = new THREE.ConeGeometry(1.9, 18, 8); cc.translate(0, 9, 0); return cc; }), white);
sp.position.y = 15.6;
bel.add(sp);
var vane = cvwCyl(bel, 0.06, 0.06, 2.4, cvwMat("brass"), 0, 33.6, 0, 6);
cvwSolid(x, z, W + 0.6, L + 0.6, y - 1, y + Hh + 6, 0);
cvwSolid(x, z + L / 2 + 3, 7.4, 6.4, y - 1, y + 60, 0);
g.rotation.y = Math.PI;
return g;
},
function (G) {
var lite = cvwLite(), H = cvwPvH, st = CVW.st, win = st.season === "winter", night = !!CVW.night, D;
cvwFar(G, H, win ? 0xC8CCD0 : 0x6A7A5A);
cvwTerrain(G, -620, -620, 1240, 1240, lite ? 16 : 8, H, cvwMat(win ? "snow" : "grass"), function (x, z, y, c) {
var g = 0.84 + cvwFbm(x * 0.03, z * 0.03, 2) * 0.2;
if (y < 0) {
c.setRGB(0.32, 0.3, 0.26);
return;
}
if (win) {
var sn = 0.78 + cvwFbm(x * 0.05, z * 0.05, 2) * 0.12;
c.setRGB(sn, sn * 1.01, sn * 1.03);
return;
}
c.setRGB(0.5 * g, 0.58 * g, 0.36 * g);
});
cvwWater(G, -500, 0, 240, 1240, 0.2, 0x3A4A52, 0.92);
Object.keys(CV_PV_ROADS).forEach(function (k) { var w = k === "main" ? 12 : (k === "thomas" || k === "prospect" ? 6 : 8); cvwStrip(G, CV_PV_ROADS[k], w, H, cvwMat(k === "main" || k === "thomas" ? "cobbles" : "asphalt"), 0.07); if (!lite)
cvwSidewalks(G, CV_PV_ROADS[k], w, H, {}); });
cvwStrip(G, CV_PV_COURTS, 3, H, cvwMat("cobbles"), 0.08);
D = function (key, p, nm) { var Rm = CVW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
cvwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
var roof = win ? "snowroof" : "shingle";
cvwBox(G, 30, 1.6, 240, cvwMat("planks"), CV_PV.wharf, 0, 40);
cvwFloor(CV_PV.wharf, 40, 30, 240, 1.6);
for (var p = 0; p < 24; p++)
cvwCyl(G, 0.25, 0.25, 4.4, cvwMat("darkbark"), CV_PV.wharf - 14.5, -2.8, -75 + p * 10, 8);
cvwSteamer(G, -404, 0.2, 80, Math.PI, { L: 64, B: 12, name: "NEWPORT", house: 0xF4F0E4, funnel: 0x1A1A1A, band: 0xE8E0D0, smoke: !lite });
for (var wh = 0; wh < 5; wh++)
cvwBrick(G, -372, -200 + wh * 48 + (wh > 2 ? 40 : 0), { w: 20, d: 16, st: wh % 2 ? 3 : 2, ry: Math.PI / 2, mat: wh % 2 ? null : "brick", col: 0x8A4A3A, noDoor: wh % 2, sign: ["COAL", "SHIP CHANDLER", "NEWPORT LINE", "FISH", "STORES"][wh] });
for (var bl = 0; bl < (lite ? 6 : 14); bl++) {
var bx = CV_PV.wharf - 8 + (bl % 3) * 3, bz = -40 + Math.floor(bl / 3) * 34;
cvwBox3(G, 1.2, 1.0, 1.2, cvwMat("planks"), bx, 1.6, bz);
if (bl % 2)
cvwCyl(G, 0.4, 0.4, 1.0, cvwMat("oak"), bx + 1.6, 1.6, bz + 1, 10);
}
for (var i = 0; i < 10; i++) {
var zz = -480 + i * 100 + (i > 4 ? 20 : 0);
if (Math.abs(zz - 60) < 24 || Math.abs(zz + 160) < 20 || Math.abs(zz + 200) < 20)
continue;
cvwBrick(G, -322, zz, { w: 22, d: 14, st: 3, ry: -Math.PI / 2, shops: i % 2 === 0, col: [0x9A5040, 0x7A4A3A, 0x8A5A48][i % 3], sign: i % 2 === 0 ? ["CHANDLERY", "OYSTER HOUSE", "SAILORS' HOME", "LODGINGS", "HARDWARE"][i / 2] : null });
}
CV_PV_COURTS.forEach(function (q, k) { if (k === 0 || k === CV_PV_COURTS.length - 1)
return; [-1, 1].forEach(function (s) { cvwColonial(G, q[0] + 3, q[1] + s * 7.5, { w: 9, d: 6, st: 2 + (k % 2), ry: s < 0 ? 0 : Math.PI, wall: k % 2 ? "clapgrey" : "clap", roof: roof, shut: 0x2A2A2A, noDoor: false }); }); });
var hs = [];
for (var hx0 = -318; hx0 < 415; hx0 += (lite ? 26 : 14.5))
hs.push(hx0);
hs.forEach(function (hx, k) {
[-1, 1].forEach(function (s) {
if (s < 0 && hx < -80)
return;
if (s > 0 && Math.abs(hx - CV_PV.angell[0]) < 16)
return;
if (Math.abs(hx + 170) < 13 || Math.abs(hx - 30) < 11 || Math.abs(hx - 200) < 11)
return;
if (k % 6 === 2 && hx > -160 && hx < 20) {
cvwBrick(G, hx, 60 + s * 13, { w: 11, d: 9, st: 2 + ((k + s) % 2), ry: s > 0 ? Math.PI : 0, shops: true, col: [0x9A5040, 0x8A4A3A][(k + s + 2) % 2], fascia: [0x1E2A22, 0x2A1E1E][(k + s + 2) % 2], sign: s > 0 ? (hx < -60 ? "GROCER" : "DRUGS") : (hx < -60 ? "BAKERY" : "NEWS & TOBACCO"), lit: night || win });
return;
}
cvwColonial(G, hx, 60 + s * 14, { w: 10 + (k % 3) * 0.8, d: 8, st: 2 + ((k + s) % 2), ry: s > 0 ? Math.PI : 0, wall: ["clap", "clapgrey", "clapyel", "clap"][(k + (s > 0 ? 1 : 0)) % 4], roof: roof, gambrel: k % 3 === 1, central: k % 2 === 0, dormers: k % 2 ? 2 : 0, lit: night || win });
});
});
cvwColonial(G, CV_PV.angell[0], CV_PV.angell[1] + 8, { w: 14, d: 10, st: 3, ry: Math.PI, wall: "clap", roof: roof, dormers: 3, lit: night, shut: 0x1E2A1E });
D("angell", { x: CV_PV.angell[0], z: CV_PV.angell[1] - 0.6, ry: Math.PI }, "Professor Angell's door");
cvwInDoor("angell", "angellhall", 3.6, 3.2, "The door to the hall");
cvwSign(G, "PROF. G. G. ANGELL", 1.4, 0.3, CV_PV.angell[0] + 1.4, H(CV_PV.angell[0], CV_PV.angell[1]) + 1.6, CV_PV.angell[1] + 2.9, Math.PI, { bg: "#C8A048", ink: "#1A1A1A" });
for (i = 0; i < 12; i++) {
var bz2 = -520 + i * 90;
if (Math.abs(bz2 - 60) < 20 || Math.abs(bz2 + 160) < 22 || Math.abs(bz2 + 200) < 20 || Math.abs(bz2 + 60) < 20)
continue;
[-1, 1].forEach(function (s) { if (i % 3 === 2)
cvwBrick(G, -170 + s * 15, bz2, { w: 14, d: 11, st: 3, ry: s < 0 ? Math.PI / 2 : -Math.PI / 2, col: 0x9A5040, roof: "hip" });
else
cvwColonial(G, -170 + s * 14, bz2, { w: 11, d: 8, st: 2 + (i % 2), ry: s < 0 ? Math.PI / 2 : -Math.PI / 2, wall: ["clap", "clapyel", "clapgrey"][i % 3], roof: roof, gambrel: i % 4 === 1, lit: night }); });
}
cvwFleurDeLys(G, CV_PV.fleur[0], CV_PV.fleur[1], H);
D("fleur", { x: -250, z: -153.5, ry: Math.PI }, "The door of the Fleur-de-Lys Building");
cvwBrick(G, CV_PV.club[0], CV_PV.club[1] + 1, { w: 12, d: 12, st: 3, ry: Math.PI, col: 0x8A4A3A, sign: "PROVIDENCE ART CLUB" });
D("club", { x: -218, z: -152.5, ry: Math.PI }, "The door of the Providence Art Club");
cvwMeetingHouse(G, CV_PV.meeting[0], CV_PV.meeting[1] - 16, H);
cvwBrick(G, -200, -100, { w: 30, d: 18, st: 4, ry: Math.PI / 2, col: 0x9A5A44, roof: "hip", sign: "RHODE ISLAND SCHOOL OF DESIGN" });
[-120, -60, 40, 80, 180, 240, 300, 360].forEach(function (wx, k) { [-1, 1].forEach(function (s) { if (s < 0 && Math.abs(wx - CV_PV.wilcox[0]) < 30)
return; if (Math.abs(wx - 200) < 14 || Math.abs(wx - 30) < 12)
return; cvwColonial(G, wx, -200 + s * 14, { w: 11, d: 8, st: 2 + (k % 2), ry: s > 0 ? Math.PI : 0, wall: ["clapgrey", "clap", "clapyel"][k % 3], roof: roof, gambrel: k % 3 === 0, lit: night }); }); });
cvwBrick(G, CV_PV.wilcox[0], CV_PV.wilcox[1] - 6, { w: 16, d: 12, st: 3, col: 0xA85A44, roof: "hip" });
D("wilbed", { x: 130, z: -205.4, ry: Math.PI }, "The door of the Wilcox house");
for (i = 0; i < 9; i++) {
var tz = -380 + i * 80;
if (Math.abs(tz - 60) < 20 || Math.abs(tz + 200) < 20)
continue;
[-1, 1].forEach(function (s) { if (s > 0 && Math.abs(tz + 120) < 20)
return; cvwBrick(G, 200 + s * 14, tz, { w: 14, d: 11, st: 2 + (i % 2), ry: s > 0 ? -Math.PI / 2 : Math.PI / 2, shops: i % 2 === 0, col: [0x9A5040, 0xA86A50, 0x8A4A3A][i % 3], fascia: [0x1E2A22, 0x2A1E1E, 0x1E1E2A][i % 3], sign: i % 2 === 0 ? ["DRUGS", "BOOKS", "LUNCH", "TOBACCO", "HABERDASHER"][(i / 2) | 0] : null }); });
}
cvwBrick(G, 214, -120, { w: 12, d: 10, st: 2, ry: -Math.PI / 2, col: 0xB87A5E });
D("tobey", { x: 206.4, z: -120, ry: Math.PI / 2 }, "Dr. Tobey's door");
cvwSign(G, "DR. TOBEY", 0.9, 0.3, 207.9, H(208, -118) + 1.6, -118.2, -Math.PI / 2, { bg: "#C8A048", ink: "#1A1A1A" });
cvwBrick(G, CV_PV.uhall[0], CV_PV.uhall[1] - 14, { w: 34, d: 14, st: 4, col: 0x9A5040, roof: "hip", cupola: 1 });
var mh = new THREE.Group(), my = H(70, -110);
mh.position.set(70, my, -110);
G.add(mh);
cvwBox(mh, 12, 9, 16, cvwS("plaster", 0xE8E0D0, 3), 0, 0, 0);
for (var c3 = 0; c3 < 4; c3++)
cvwCyl(mh, 0.5, 0.55, 8, cvwMat("white"), -4.5 + c3 * 3, 0, 8.6, 14);
var pd = new THREE.Mesh(cvwGeo("mhped", function () { var s = new THREE.Shape(); s.moveTo(-6.4, 0); s.lineTo(0, 2.6); s.lineTo(6.4, 0); return new THREE.ExtrudeGeometry(s, { depth: 17, bevelEnabled: false }); }), cvwMat("white"));
pd.position.set(0, 9, -8.4);
mh.add(pd);
cvwSolid(70, -110, 12, 18, my - 1, my + 12, 0);
cvwBrick(G, 170, -100, { w: 30, d: 12, st: 4, ry: -Math.PI / 2, col: 0xA05A40, roof: "hip" });
[-1, 1].forEach(function (s) { var gp = cvwBox(G, 1.4, 6, 1.4, cvwMat("sandstone"), 54, H(54, -60 + s * 5), -60 + s * 5); var lp = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), cvwLam(0xE8E4D8)); lp.position.set(54, H(54, -60) + 6.4, -60 + s * 5); G.add(lp); cvwRound(54, -60 + s * 5, 0.9); });
var ok = function (x, z) { return x > -330 && Object.keys(CV_PV_ROADS).every(function (k) { return cvwPathD(x, z, CV_PV_ROADS[k]) > 7; }); };
var street = [];
[CV_PV_ROADS.williams, CV_PV_ROADS.waterman, CV_PV_ROADS.prospect, CV_PV_ROADS.benefit].forEach(function (r, ri) { for (var q = 0; q < r.length - 1; q++) {
var a = r[q], b2 = r[q + 1], LL = Math.hypot(b2[0] - a[0], b2[1] - a[1]);
for (var u = 20; u < LL; u += 38) {
var tx = a[0] + (b2[0] - a[0]) * u / LL, tz2 = a[1] + (b2[1] - a[1]) * u / LL, dx = (b2[1] - a[1]) / LL * 6.4, dz = -(b2[0] - a[0]) / LL * 6.4;
[[tx + dx, tz2 + dz], [tx - dx, tz2 - dz]].forEach(function (t) { if (t[0] > -330)
street.push({ x: t[0], z: t[1], y: H(t[0], t[1]), s: 0.85 + ((t[0] * 7 + t[1]) % 10) / 30, ry: (t[0] + t[1]) % 6 }); });
}
} });
var grn = cvwScatter(71, lite ? 14 : 30, 70, -80, 190, -30, null, H, 0.9, 1.3);
cvwElms(G, street.concat(grn), win ? null : 0x8AAA5A);
street.concat(grn).forEach(function (t) { cvwRound(t.x, t.z, 0.5); });
if (!win) {
cvwPlant(G, "grass", cvwScatter(72, lite ? 120 : 320, -330, -560, 560, 560, ok, H, 0.6, 1.1), { col: 0xA8B878 });
cvwPlant(G, "bush", cvwScatter(73, lite ? 40 : 120, -320, -560, 560, 560, ok, H, 0.4, 0.8), { col: 0x4A5A3A });
}
else
cvwPlant(G, "bush", cvwScatter(73, lite ? 30 : 90, -320, -560, 560, 560, ok, H, 0.4, 0.8), { col: 0xC8CCD0 });
for (i = 0; i < (lite ? 8 : 18); i++) {
var la = [[-345, -400 + i * 50], [-170, -420 + i * 50], [-60 + i * 30, 60]][i % 3];
cvwELamp(G, la[0] + (i % 3 === 2 ? 0 : 5.4), la[1] + (i % 3 === 2 ? 5.6 : 0), H, { lit: night || win });
}
cvwPoles(G, [[-339, -560], [-339, 560]], H, 40);
cvwPoles(G, [[-200, 66], [420, 66]], H, 40);
[[-338, -20, 0], [-352, 140, Math.PI], [-60, 54, Math.PI / 2], [110, 54, -Math.PI / 2], [196, -60, 0], [204, -260, Math.PI], [-176, -120, 0], [140, -206, Math.PI / 2], [-164, 200, Math.PI]].forEach(function (a, k) { if (lite && k % 2)
return; cvwAuto(G, a[0], a[1], a[2], { col: [0x14161A, 0x1A1A22, 0x2A1E16, 0x1E2A22][k % 4], lit: night && k % 3 === 0 }); });
cvwCart(G, -356, -60, 0, { seat: true, len: 2.4, w: 1.4, hcol: 0x2A1A10 });
cvwHorse(G, -356, H(-356, -63.4), -63.4, 0, {});
},
function (G) {
var st = CVW.st, win = st.season === "winter";
cvwCrowd("pvwharf", [["A longshoreman", "m", "worker", "Newport boat's in. Mind the bales."], ["A ship's chandler", "m", "worker", "Rope, paint, oakum, lamps. What does she need?"], ["A seaman off the boat", "m", "cvsailor", "Rough passage from Newport."], ["A woman with a basket", "f", "lady", "Oysters, if they've any left."], ["A carter", "m", "worker", "Back her up, back her up!"], ["A fisherman", "m", "cvsailor", win ? "Cold enough to freeze your fingers to the line." : "Bass are running."]], -372, -60, -345, 160, { wander: 8 });
cvwCrowd("pvhill", [["A gentleman with a cane", "m", "gent", "Steep, this street. One does not hurry up it at my age."], ["A lady in furs", "f", "lady", win ? "Bitter, isn't it? The river's half frozen." : "Spring at last."], ["A delivery boy", "m", "boy", "Groceries for Benefit Street!", null, true], ["A housemaid", "f", "maid", "Ma'am sent me for thread."], ["A student", "m", "gent", "Off to the library. Exams."]], -160, 40, 200, 80, { wander: 10 });
cvwCrowd("pvthayer", [["A shopkeeper", "m", "worker", "Open till six."], ["A girl with her schoolbooks", "f", "girl", "Hello!", null, true], ["A policeman", "m", "police", "Move along, now, nothing to see."], ["A druggist", "m", "dispenser", "Something for the cold, sir?"], ["A professor", "m", "cvprof", "Have you read the Journal this month?"]], 190, -300, 215, 60, { wander: 10 });
cvwCrowd("pvcollege", [["A student in a raccoon coat", "m", "gent", "Brown'll beat Yale this year, you watch."], ["An instructor", "m", "cvprof", "The Department of Semitic Languages? Over by University Hall."], ["A young woman from Pembroke", "f", "lady", "We have lectures here too, you know."]], 60, -100, 190, -40, { wander: 12 });
cvwCrowd("pvthomas", [["A painter with his easel", "m", "cvartist", "The light on the steeple at four o'clock: nothing like it."], ["A sculptor's model", "f", "lady", "They keep the stove too hot in there."], ["An old Providence lady", "f", "lady", "That Fleur-de-Lys Building: an eyesore, among our lovely old houses."]], -300, -170, -180, -140, { wander: 6 });
},
function (x, z) {
var n = cvwFbm(x * 0.02, z * 0.02, 3), h = -0.45 + n * 0.6;
var gd = Math.hypot(x - CV_BY.glade[0], z - CV_BY.glade[1]);
if (gd < 40)
h = Math.max(h, 0.55 - Math.max(0, gd - 30) * 0.06);
var hd = Math.hypot(x - CV_BY.huts[0], z - CV_BY.huts[1]);
if (hd < 34)
h = Math.max(h, 0.3 - Math.max(0, hd - 26) * 0.05);
if (z > 380)
h = Math.max(h, 0.2 + cvwSmooth(380, 480, z) * 0.8);
if (z < CV_BY.lakeZ + 60)
h -= cvwSmooth(CV_BY.lakeZ + 60, CV_BY.lakeZ, z) * 1.6;
return h;
},
function (G) {
var X = CVW_ROOMXZ.bayou, R, lite = cvwLite();
R = cvwRoom(G, "hq", X.hq[0], X.hq[1], 12, 9, { wall: "ochre", floor: "planks", name: "police headquarters, New Orleans", lightI: 0.9 });
cvwTable(R.g, 0, -2.6, 3.4, 1.0, 0.9, { mat: "darkoak" });
cvwChair(R.g, 0, -3.4, 0, { arm: 1 });
cvwShelves(R.g, -5.8, 0, 3.6, 2.4, Math.PI / 2, {});
for (var b = 0; b < 8; b++)
cvwChair(R.g, -3 + b * 0.8, 3.6, Math.PI, {});
cvwPapers(R.g, 0.3, 0.91, -2.6, 6);
cvwPicture(R.g, 0, 2.4, -4.38, 0, 1.6, 1.1, function (c, W, H) { c.fillStyle = "#E8E0C8"; c.fillRect(0, 0, W, H); c.strokeStyle = "#5A4A3A"; for (var i = 0; i < 14; i++) {
c.beginPath();
c.moveTo(Math.random() * W, Math.random() * H);
c.lineTo(Math.random() * W, Math.random() * H);
c.stroke();
} c.fillStyle = "#2A1A10"; c.font = "bold 12px Georgia"; c.fillText("PARISH OF ST. BERNARD", 8, 16); });
cvwWindowIn(R.g, -3, 2.0, 4.38, Math.PI, 1.2, 1.4, { sky: 0x6A7A8A });
cvwWindowIn(R.g, 3, 2.0, 4.38, Math.PI, 1.2, 1.4, { sky: 0x6A7A8A });
R = cvwRoom(G, "cells", X.cells[0], X.cells[1], 10, 8, { wall: "stone", floor: "cobble", name: "the cells at headquarters", bare: 1, env: "cell", lightI: 0.55, lightCol: 0xE8D8B0 });
for (var i = 0; i < 9; i++)
cvwBox(R.g, 0.06, 3.2, 0.06, cvwMat("iron"), -4.4 + i * 0.5, 0, -1.4);
cvwBox(R.g, 4.4, 0.08, 0.08, cvwMat("iron"), -2.4, 3.1, -1.4);
cvwBed(R.g, -3.4, -3.0, Math.PI / 2, { cover: 0x5A5040 });
cvwTable(R.g, 2, 1, 1.2, 0.8, 0.78, {});
cvwChair(R.g, 2, 1.8, Math.PI, {});
cvwChair(R.g, 2, 0.2, 0, {});
cvwCandle(R.g, 2, 0.79, 1, {});
R = cvwRoom(G, "stlouis", X.stlouis[0], X.stlouis[1], 16, 12, { wall: "damask", floor: "floor", name: "the meeting of the American Archaeological Society, St. Louis, 1908", env: "hall", h: 5, lightI: 1.0 });
cvwTable(R.g, 0, -3.6, 6, 1.4, 0.8, { cloth: 0x2A3A2A });
for (var r = 0; r < 4; r++)
for (var c = 0; c < 8; c++)
cvwChair(R.g, -5.6 + c * 1.6, 0.4 + r * 1.4, Math.PI, {});
for (var w = 0; w < 4; w++) {
cvwWindowIn(R.g, -6 + w * 4, 3.0, -5.88, 0, 1.4, 2.4, { sky: 0xD8E0E8 });
}
cvwSign(R.g, "AMERICAN ARCHÆOLOGICAL SOCIETY · ANNUAL MEETING · 1908", 8, 0.6, 0, 4.2, -5.86, 0, { bg: "#2A3A2A", ink: "#E8D8A0" });
cvwPapers(R.g, -1.6, 0.81, -3.6, 6);
cvwPicture(R.g, -7.88, 2.6, 0, Math.PI / 2, 2, 1.4);
cvwPicture(R.g, 7.88, 2.6, 0, -Math.PI / 2, 2, 1.4);
R = cvwRoom(G, "legrasse", X.legrasse[0], X.legrasse[1], 9, 8, { wall: "greenpaper", name: "Inspector Legrasse's home, 121 Bienville Street", lightI: 0.8 });
cvwTable(R.g, 0, 0.4, 1.8, 1.0, 0.78, {});
cvwChair(R.g, -0.8, 1.2, Math.PI, { arm: 1 });
cvwChair(R.g, 0.8, -0.4, 0, { arm: 1 });
cvwShelves(R.g, 0, -3.8, 3, 2.4, 0, {});
var idl = cvwIdol(0.2);
idl.position.set(0, 1.31, -3.75);
R.g.add(idl);
cvwRug(R.g, 0, 0.4, 3.4, 2.4, 0x6A3A2A);
cvwWindowIn(R.g, 3, 2.0, 3.88, Math.PI, 1.2, 1.5, { sky: 0xE8D8B0 });
},
function () {
return cvwGeo("cypT", function () {
var parts = [], R = wRand(41);
var t = new THREE.CylinderGeometry(0.35, 1.25, 16, cvwLite() ? 12 : 18, 10);
var pa = t.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 8, an = Math.atan2(pa.getZ(i), pa.getX(i)), f = y < 5 ? 1 + Math.pow((5 - y) / 5, 1.7) * 2.4 * (0.35 + 0.65 * Math.pow(Math.abs(Math.sin(an * 3 + 0.4)), 0.55)) : 1;
f *= 1 + 0.05 * Math.sin(an * 11 + y * 1.3);
pa.setX(i, pa.getX(i) * f);
pa.setZ(i, pa.getZ(i) * f);
}
t.translate(0, 8, 0);
parts.push(t.toNonIndexed());
for (var k = 0; k < 6; k++) {
var a = k / 6 * 6.283 + R();
var b = cvwTaper([[0, 11 + R() * 3, 0], [Math.cos(a) * 2.4, 14 + R() * 2, Math.sin(a) * 2.4], [Math.cos(a) * 4.6, 15.5 + R(), Math.sin(a) * 4.6]], [0.2, 0.12, 0.05], 5, 5);
parts.push(b.index ? b.toNonIndexed() : b);
}
parts.forEach(function (p) { if (p.attributes.uv)
p.deleteAttribute("uv"); if (p.attributes.normal)
p.deleteAttribute("normal"); });
var g = gwMerge(parts);
var P2 = g.attributes.position, uv = new Float32Array(P2.count * 2);
for (var v = 0; v < P2.count; v++) {
uv[v * 2] = (Math.atan2(P2.getZ(v), P2.getX(v)) / 6.283 + 0.5) * 3;
uv[v * 2 + 1] = P2.getY(v) / 2.2;
}
g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g.computeVertexNormals();
return g;
});
},
function () {
return cvwCanvas("smoss", 64, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(13);
for (var i = 0; i < 26; i++) {
var px = 4 + R() * (W - 8), L = H * (0.4 + R() * 0.6);
x.strokeStyle = "rgba(" + (150 + R() * 40 | 0) + "," + (160 + R() * 40 | 0) + "," + (140 + R() * 30 | 0) + ",0.85)";
x.lineWidth = 1 + R() * 1.6;
x.beginPath();
x.moveTo(px, 0);
for (var y = 0; y < L; y += 8) {
x.lineTo(px + Math.sin(y * 0.08 + i) * 4 + (R() - 0.5) * 3, y);
}
x.stroke();
}
});
},
function (P, list) {
if (!list.length)
return;
var lite = cvwLite();
if (lite && list.length > 60)
list = list.filter(function (t, i) { return i % 2 === 0; });
cvwInst(P, cvwCypressGeo(), cvwMat("cypress"), list, { shadow: !lite });
cvwInst(P, cvwGeo("cypC", function () { var parts = [], R = wRand(43); for (var i = 0; i < (lite ? 5 : 9); i++) {
var a = R() * 6.283, r = R() * 4.4, c = new THREE.IcosahedronGeometry(1.6 + R() * 1.2, 1);
c.scale(1.5, 0.55, 1.5);
c.translate(Math.cos(a) * r, 15 + R() * 2.4, Math.sin(a) * r);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), cvwM("cypL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A5A34, map: cvwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
cvwInst(P, cvwGeo("mossS", function () {
var R = wRand(47), pos = [], col = [], idx = [];
for (var i = 0; i < (lite ? 14 : 34); i++) {
var a = R() * 6.283, r = 0.8 + R() * 4.2, top = 14.2 + R() * 1.8, L = 1.6 + R() * 3.4, w = 0.12 + R() * 0.16, ry = R() * 3.14, cx = Math.cos(ry), sz = -Math.sin(ry), seg = 7, g0 = 0.62 + R() * 0.16, ph = R() * 6;
var bx = Math.cos(a) * r, bz = Math.sin(a) * r, n = pos.length / 3;
for (var k = 0; k <= seg; k++) {
var t = k / seg, sw = Math.sin(t * 5 + ph) * 0.12 * t, x = bx + sw * sz, z = bz - sw * cx, y = top - L * t, hw = w * (1 - t * 0.8) * 0.5;
pos.push(x - cx * hw, y, z - sz * hw, x + cx * hw, y, z + sz * hw);
var gg = g0 * (1 - t * 0.25);
col.push(gg * 0.92, gg, gg * 0.86, gg * 0.92, gg, gg * 0.86);
if (k) {
var o = n + (k - 1) * 2;
idx.push(o, o + 2, o + 1, o + 1, o + 2, o + 3);
}
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setIndex(idx);
g.computeVertexNormals();
return g;
}), cvwVcM("mossVC"), list, {});
cvwInst(P, cvwGeo("knees" + (lite ? "L" : ""), function () { var parts = [], R = wRand(53); for (var i = 0; i < (lite ? 4 : 9); i++) {
var a = R() * 6.283, r = 2.6 + R() * 3.2, h = 0.6 + R() * 1.1, c = new THREE.CylinderGeometry(0.06, 0.22, h, 7, 2);
c.translate(Math.cos(a) * r, h / 2 - 0.15, Math.sin(a) * r);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), cvwMat("cypress"), list, {});
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = cvwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var w = o.w || 5, d = o.d || 4, wd = cvwS("b:planks", 0x7A6A58, 1.6);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { cvwCyl(g, 0.1, 0.12, 1.0, cvwMat("darkbark"), q[0] * (w / 2 - 0.2), -0.2, q[1] * (d / 2 - 0.2), 6); });
cvwBox(g, w, 2.4, d, wd, 0, 0.8, 0);
cvwBox(g, w + 0.6, 0.1, 1.6, cvwMat("planks"), 0, 0.8, d / 2 + 0.8);
for (var p = 0; p < 3; p++)
cvwCyl(g, 0.06, 0.06, 2.2, cvwMat("darkbark"), -w / 2 + p * w / 2, 0.8, d / 2 + 1.5, 6);
var rf = new THREE.Mesh(cvwGeo("hutr" + w + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 1.8, 0); s.lineTo(0, 1.6); s.lineTo(d / 2 + 0.4, 0); s.lineTo(-d / 2 - 1.8, 0); var e = new THREE.ExtrudeGeometry(s, { depth: w + 0.6, bevelEnabled: false }); e.translate(0, 0, -(w + 0.6) / 2); e.rotateY(Math.PI / 2); return e; }), cvwS("metalroof", 0x8A7A6A, 2));
rf.position.y = 3.2;
rf.rotation.y = Math.PI;
g.add(rf);
cvwBox(g, 0.9, 1.8, 0.06, cvwLam(0x3A2A1A), 0, 0.8, d / 2 + 0.03);
cvwBox(g, 0.7, 0.6, 0.05, o.lit ? cvwGlowM(0xFFB060) : cvwMat("pane"), w / 2 - 1.2, 1.8, d / 2 + 0.04);
cvwCyl(g, 0.25, 0.25, 1.2, cvwS("metal", 0x6A6A68, 1), -w / 2 + 0.5, 3.6, -0.6, 8);
cvwSolid(x, z, w + 0.4, d + 0.4, y - 1, y + 4.4, ry || 0);
return g;
},
function (P, x, z, ry) { var g = new THREE.Group(); g.position.set(x, cvwLand(x, z) + 0.1, z); g.rotation.y = ry || 0; P.add(g); var h = new THREE.Mesh(cvwGeo("pirog", function () { var c = new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.45, 0.3, 2.6); return c; }), cvwMat("cypress")); h.position.y = 0.3; g.add(h); cvwBox(g, 0.06, 0.06, 2.2, cvwMat("oak"), 0.3, 0.3, 0).rotation.z = 0.3; return g; },
function (G) {
var lite = cvwLite(), H = cvwByH, st = CVW.st, rite = !!st.rite, raid = !!st.raid, D;
cvwFar(G, H, 0x2A3020, { edge: 620 });
cvwTerrain(G, -620, -620, 1240, 1240, lite ? 16 : 8, H, cvwMat("mud"), function (x, z, y, c) { var g = 0.8 + cvwFbm(x * 0.04, z * 0.04, 2) * 0.3; if (y > 0.3) {
c.setRGB(0.34 * g, 0.4 * g, 0.22 * g);
return;
} c.setRGB(0.26 * g, 0.24 * g, 0.16 * g); });
var wt = cvwWater(G, 0, 0, 1240, 1240, 0.02, 0x1E241A, 0.9);
wt.material = cvwSwampWaterM(!!CVW.st.rite);
wt.userData.fx = 0.05;
wt.userData.fz = 0.1;
cvwStrip(G, [[0, 620], [0, 470]], 5, H, cvwMat("mud"), 0.08);
var clear = function (x, z) { return Math.hypot(x - CV_BY.glade[0], z - CV_BY.glade[1]) > 46 && Math.hypot(x - CV_BY.huts[0], z - CV_BY.huts[1]) > 30 && cvwPathD(x, z, CV_BY_TRAIL) > 5 && !(z > 420 && Math.abs(x) < 30); };
var cy = cvwScatter(81, lite ? 220 : 620, -620, -620, 620, 620, clear, function (x, z) { return H(x, z) - 0.2; }, 0.75, 1.35);
cvwCypress(G, cy);
cy.forEach(function (t) { if (Math.abs(t.x) < 200 && Math.abs(t.z) < 520)
cvwRound(t.x, t.z, 1.1 * t.s); });
cvwPlant(G, "fern", cvwScatter(82, lite ? 60 : 180, -400, -560, 400, 480, clear, H, 0.5, 0.9), {});
cvwPlant(G, "reeds", cvwScatter(83, lite ? 120 : 360, -500, -600, 500, 500, clear, H, 0.8, 1.4), {});
cvwPlant(G, "bush", cvwScatter(84, lite ? 50 : 140, -400, -560, 400, 480, clear, H, 0.5, 0.9), { col: 0x2A3A1E });
if (!lite) {
var fung = cvwScatter(85, 90, -300, -500, 300, 420, clear, H, 0.2, 0.4);
cvwInst(G, cvwGeo("fungus", function () { var c = new THREE.SphereGeometry(1, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1, 0.4, 1); return c; }), cvwLam(0xC8B890), fung, {});
}
[[24, 300], [-60, 160], [40, 40], [-30, -90]].forEach(function (q, k) { for (var s = 0; s < 7; s++) {
var rk = cvwBox(G, 0.8 + ((s * 7) % 3) * 0.3, 0.5 + ((s * 3) % 4) * 0.25, 0.7, cvwS("b:limestone", 0x5A5A4A, 2), q[0] + (s % 3) * 0.9 - 1, H(q[0], q[1]) - 0.1, q[1] + Math.floor(s / 3) * 0.8, s * 0.7);
} cvwBox(G, 4, 1.6 + k * 0.3, 0.5, cvwS("brick", 0x6A4A3A, 1.2), q[0] + 3, H(q[0], q[1]) - 0.3, q[1] - 2, 0.4); cvwRound(q[0], q[1], 2.2); });
var cz = CV_BY.carriages;
cvwCart(G, cz[0], cz[1], Math.PI, { seat: true, len: 2.6, w: 1.5, hcol: 0x1A1A1E });
cvwHorse(G, cz[0], H(cz[0], cz[1] - 3.6), cz[1] - 3.6, Math.PI, {});
cvwCart(G, cz[0] - 8, cz[1] + 4, Math.PI, { seat: true, len: 2.6, w: 1.5, hcol: 0x1A1A1E });
cvwHorse(G, cz[0] - 8, H(cz[0] - 8, cz[1] + 0.4), cz[1] + 0.4, Math.PI, {});
cvwAuto(G, -16, 452, Math.PI, { col: 0x3A1A14, open: 1 });
[[0, 0, 0.2], [14, -10, -0.6], [-12, -12, 0.5], [8, 14, Math.PI - 0.3], [-14, 10, Math.PI + 0.2], [22, 6, -1.4]].forEach(function (q, k) { cvwHut(G, CV_BY.huts[0] + q[0], CV_BY.huts[1] + q[1], q[2], { w: 4.6 + (k % 2), d: 4, lit: !raid }); });
[[30, -20, 0.5], [34, -14, 0.9], [-26, -22, -0.4]].forEach(function (q) { cvwPirogue(G, CV_BY.huts[0] + q[0], CV_BY.huts[1] + q[1], q[2]); });
cvwFire(G, CV_BY.huts[0] + 2, H(CV_BY.huts[0] + 2, CV_BY.huts[1] + 5) + 0.05, CV_BY.huts[1] + 5, 0.7);
cvwSmoke(G, CV_BY.huts[0] + 2, H(CV_BY.huts[0], CV_BY.huts[1]) + 1, CV_BY.huts[1] + 5, 0x6A6A60, 6);
for (var ln = 0; ln < 3; ln++) {
var lx = CV_BY.huts[0] - 6 + ln * 6;
cvwBox(G, 0.04, 0.04, 4, cvwMat("rope"), lx, H(lx, CV_BY.huts[1] - 18) + 1.8, CV_BY.huts[1] - 18);
}
var gx = CV_BY.glade[0], gz = CV_BY.glade[1], gy = H(gx, gz);
cvwPlant(G, "grass", cvwScatter(86, lite ? 80 : 240, gx - 34, gz - 34, gx + 34, gz + 34, function (x, z) { var d = Math.hypot(x - gx, z - gz); return d < 32 && d > (rite ? 9 : 3); }, H, 0.7, 1.2), { col: 0x8A9A5A });
var mono = cvwTitan(G, 1.0, 2.45, 0.9, gx, gy, gz, 0.3, { mat: cvwS("b:limestone", 0x6A6A68, 2), solid: true });
if (!st.taken) {
var idl = cvwIdol(0.2);
idl.position.set(gx, gy + 2.45, gz);
idl.rotation.y = Math.PI;
G.add(idl);
}
if (rite) {
var ring = new THREE.Group();
ring.position.set(gx, gy, gz);
G.add(ring);
var fl = [], n = lite ? 18 : 36;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283, r = 6.2;
for (var k2 = 0; k2 < 2; k2++) {
var f = new THREE.Mesh(cvwGeo("rflame", function () { return new THREE.ConeGeometry(0.5, 2.4, 7); }), cvwGlowM([0xFF8A30, 0xFFC060][k2], 0.82));
f.position.set(Math.cos(a) * (r + k2 * 0.4), 1.0, Math.sin(a) * (r + k2 * 0.4));
f.userData.ph = i * 0.9 + k2;
ring.add(f);
fl.push(f);
}
var lg = cvwCyl(ring, 0.12, 0.14, 1.6, cvwMat("darkbark"), Math.cos(a) * r, 0.1, Math.sin(a) * r, 6);
lg.rotation.z = 1.3;
lg.rotation.y = a;
}
if (!lite) {
[0, 2.1, 4.2].forEach(function (a) { var L = new THREE.PointLight(0xFF8A3A, 1.4, 40); L.position.set(Math.cos(a) * 6, 2.4, Math.sin(a) * 6); ring.add(L); });
}
var gl = wGlow(0xFF9A40, 14, 0.25);
gl.position.y = 2;
ring.add(gl);
ring.userData.keep = 1;
CVW.ticks.push(function (dt) { var t = CVW.t; fl.forEach(function (f) { f.scale.y = 0.8 + 0.25 * Math.abs(Math.sin(t * 1.6 + f.userData.ph)); f.rotation.y = t * 0.5 + f.userData.ph; }); });
cvwSmoke(G, gx, gy + 3, gz, 0x4A3A30, 10);
}
for (var sc = 0; sc < 10; sc++) {
var a2 = sc / 10 * 6.283, sx = gx + Math.cos(a2) * 19, sz = gz + Math.sin(a2) * 19, sg = new THREE.Group();
sg.position.set(sx, H(sx, sz), sz);
sg.rotation.y = -a2 + Math.PI / 2;
G.add(sg);
var wd = cvwMat("darkbark");
cvwCyl(sg, 0.12, 0.14, 4.2, wd, -1.1, 0, 0, 6);
cvwCyl(sg, 0.12, 0.14, 4.2, wd, 1.1, 0, 0, 6);
cvwBox(sg, 2.6, 0.2, 0.2, wd, 0, 4.0, 0);
var br = cvwBox(sg, 0.12, 2.4, 0.12, wd, -0.6, 0.8, 0);
br.rotation.z = 0.5;
if (rite && cvbAdult()) {
var hb = cvwEll(sg, cvwLam(0x3A2A22), 0.22, 0.85, 0.2, 0, 2.6, 0, 8);
cvwBox(sg, 0.03, 0.6, 0.03, cvwMat("rope"), 0, 3.4, 0);
}
cvwRound(sx, sz, 0.8);
}
if (st.ashes) {
var ash = new THREE.Mesh(new THREE.RingGeometry(5.4, 7.2, 40), cvwLam(0x2A2622));
ash.rotation.x = -Math.PI / 2;
ash.position.set(gx, gy + 0.04, gz);
G.add(ash);
}
if (rite && !raid) {
var dn = lite ? 14 : 30, dancers = [];
for (var d = 0; d < dn; d++) {
var p = cvwDressed("cult" + d, "cvcult", { sex: "m", hair: [0x141414, 0x3A2A1A, 0x5A4A3A][d % 3] });
G.add(p);
dancers.push({ g: p, a: d / dn * 6.283, r: 11 + (d % 3) * 1.8, ph: d * 1.3 });
CVW.people.push({ g: p, y: gy, o: {} });
}
CVW.ticks.push(function (dt) { var t = CVW.t; dancers.forEach(function (D2) { D2.a -= dt * 0.22; var r = D2.r + Math.sin(t * 0.8 + D2.ph) * 0.8, x = gx + Math.cos(D2.a) * r, z = gz + Math.sin(D2.a) * r; D2.g.position.set(x, H(x, z) + Math.abs(Math.sin(t * 2.2 + D2.ph)) * 0.35, z); D2.g.rotation.y = -D2.a + Math.PI; D2.g.rotation.z = Math.sin(t * 1.7 + D2.ph) * 0.18; }); });
}
for (var m = 0; m < (lite ? 4 : 9); m++) {
var mist = new THREE.Mesh(cvwGeo("mistp", function () { return new THREE.PlaneGeometry(120, 18); }), cvwM("mistM", function () { var mm = new THREE.MeshBasicMaterial({ color: 0xC8CCC0, transparent: true, opacity: 0.12, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
mist.position.set(-240 + m * 60, 6, CV_BY.lakeZ - 20 + ((m * 37) % 40));
mist.rotation.y = (m % 3 - 1) * 0.3;
G.add(mist);
}
if (st.lanterns) {
for (var l = 0; l < (lite ? 5 : 10); l++) {
var tp = CV_BY_TRAIL[Math.min(CV_BY_TRAIL.length - 1, 2 + l)], lg2 = new THREE.Group();
lg2.position.set(tp[0] + (l % 2 ? 2 : -2), H(tp[0], tp[1]) + 1.3, tp[1]);
G.add(lg2);
var lb = new THREE.Mesh(cvwGeo("lantB", function () { return new THREE.BoxGeometry(0.2, 0.3, 0.2); }), cvwGlowM(0xFFD080, 0.9));
lg2.add(lb);
lg2.userData.ph = l;
lg2.userData.y0 = lg2.position.y;
lg2.userData.kind = "float";
CVW.fx.push(lg2);
}
}
},
function (G) {
var st = CVW.st;
if (!st.raid && !st.rite)
cvwCrowd("byhuts", [["A squatter mending a net", "m", "cvsquatter", "My grandfather's grandfather sailed with Lafitte, they say."], ["A squatter's wife", "f", "cvsquatterf", "The drums. Every night now. We keep the children in."], ["An old squatter", "m", "cvsquatter", "Nobody goes past the dead cypress. Nobody."], ["A boy with a pole", "m", "cvsquatter", "I catch crawfish here. Never up yonder.", null, true], ["A woman at the washtub", "f", "cvsquatterf", "My sister's girl is gone. Gone in the night."], ["A fisherman in his pirogue", "m", "cvsquatter", "Water's high this fall."]], CV_BY.huts[0] - 20, CV_BY.huts[1] - 20, CV_BY.huts[0] + 20, CV_BY.huts[1] + 20, { wander: 5 });
if (st.raid || st.lanterns)
cvwCrowd("bypolice", [["A policeman with a lantern", "m", "cvpolice", "Keep together. Keep the lanterns low."], ["A patrolman, wet to the knees", "m", "cvpolice", "Miles of this. Miles."], ["A sergeant", "m", "cvpolice", "Revolvers ready, men."], ["A young officer", "m", "cvpolice", "I've never been this far in."], ["A policeman with a rifle", "m", "cvpolice", "What's that glow ahead? Fire?"], ["A patrolman counting heads", "m", "cvpolice", "Nineteen and the inspector. All here."]], -20, st.raid ? -220 : 300, 20, st.raid ? -180 : 420, { wander: 4 });
if (!st.raid && !st.rite)
cvwCrowd("bycarr", [["A carriage driver", "m", "worker", "I'll wait here with the horses, and gladly."], ["The automobile's driver", "m", "worker", "She won't go a yard further. Road's done."]], -10, 436, 20, 456, { wander: 3 });
},
function (fire) {
return cvwM("swampWater" + (fire ? 1 : 0), function () {
var lite = cvwLite(), t = cvwRippleTex(), sk = fire ? "0.55,0.26,0.10" : "0.30,0.34,0.36";
var m = lite ? new THREE.MeshLambertMaterial({ color: 0x0A0C0A, map: t, transparent: true, opacity: 0.96, depthWrite: false }) : new THREE.MeshPhongMaterial({ color: 0x080A08, map: t, shininess: 160, specular: fire ? 0xC88A52 : 0x8A9488, transparent: true, opacity: 0.96, depthWrite: false });
if (!lite) {
m.onBeforeCompile = function (sh) { sh.fragmentShader = sh.fragmentShader.replace("#include <fog_fragment>", "{ vec3 cvV=normalize(vViewPosition); float cvF=pow(1.0-abs(dot(normalize(normal),cvV)),3.0); gl_FragColor.rgb+=vec3(" + sk + ")*cvF*0.9; }\n#include <fog_fragment>"); };
m.customProgramCacheKey = function () { return "swampWater" + (fire ? 1 : 0); };
}
else
m.emissive = new THREE.Color(fire ? 0x140804 : 0x080A0A);
m.userData.noPhoto = 1;
return m;
});
},
function (G) {
var X = CVW_ROOMXZ.harbour, R, lite = cvwLite();
R = cvwRoom(G, "dunedin", X.dunedin[0], X.dunedin[1], 12, 9, { wall: "render", floor: "planks", name: "an old sea tavern on the Dunedin waterfront", beams: true, env: "garret", lightI: 0.7 });
cvwBox(R.g, 6, 1.1, 0.8, cvwMat("darkoak"), 0, 0, -3.2);
cvwShelves(R.g, 0, -4.2, 5, 2.2, 0, { jars: 1 });
for (var t = 0; t < 3; t++) {
cvwTable(R.g, -3.6 + t * 3.6, 1.4, 1.4, 0.9, 0.74, {});
cvwChair(R.g, -3.6 + t * 3.6, 2.2, Math.PI, {});
cvwChair(R.g, -3.6 + t * 3.6, 0.6, 0, {});
}
cvwHearth(R.g, -5.8, -1, Math.PI / 2, { h: R.h });
cvwWindowIn(R.g, 3, 2, 4.38, Math.PI, 1.2, 1, { sky: 0x6A7A8A });
cvwSign(R.g, "ALES · RUM · WHISKY", 3, 0.4, 0, 2.6, -4.36, 0, { bg: "#2A1A10", ink: "#F0D890" });
R = cvwRoom(G, "auckland", X.auckland[0], X.auckland[1], 9, 7, { wall: "ochre", name: "a shipping office on the Auckland waterfront", lightI: 0.9 });
cvwBox(R.g, 6, 1.1, 0.6, cvwMat("oak"), 0, 0, -1);
cvwShelves(R.g, 0, -3.3, 5, 2.4, 0, {});
cvwPicture(R.g, -3, 2.2, 3.38, Math.PI, 1.6, 1.0, function (c, W, H) { c.fillStyle = "#E8E0C8"; c.fillRect(0, 0, W, H); c.strokeStyle = "#3A4A6A"; c.lineWidth = 2; c.beginPath(); c.moveTo(10, H * 0.7); c.quadraticCurveTo(W / 2, H * 0.2, W - 10, H * 0.6); c.stroke(); c.fillStyle = "#1A1A1A"; c.font = "bold 11px Georgia"; c.fillText("AUCKLAND · CALLAO", 8, 14); });
cvwPapers(R.g, 1, 1.11, -1, 6);
R = cvwRoom(G, "court", X.court[0], X.court[1], 14, 11, { wall: "damask", floor: "floor", name: "the vice-admiralty court, Sydney", env: "hall", h: 5, lightI: 1.0 });
cvwBox(R.g, 6, 1.4, 1.4, cvwMat("darkoak"), 0, 0, -4.4);
cvwBox(R.g, 2, 0.6, 1, cvwMat("darkoak"), 0, 1.4, -4.6);
cvwChair(R.g, 0, -4.9, 0, { arm: 1, seat: "leather" });
cvwBox(R.g, 1.4, 1.1, 1.2, cvwMat("darkoak"), -4, 0, -1.6);
for (var r = 0; r < 3; r++)
cvwBox(R.g, 9, 0.5, 0.5, cvwMat("oak"), 0, 0, 1.4 + r * 1.4);
cvwSign(R.g, "VICE-ADMIRALTY COURT", 4, 0.5, 0, 4.2, -5.36, 0, { bg: "#2A1A10", ink: "#E8D8A0" });
cvwPicture(R.g, 0, 3.4, -5.38, 0, 1.4, 1.4, function (c, W, H) { c.fillStyle = "#2A1A3A"; c.fillRect(0, 0, W, H); c.fillStyle = "#E8C860"; c.beginPath(); c.arc(W / 2, H / 2, W * 0.32, 0, 7); c.fill(); c.fillStyle = "#2A1A3A"; c.beginPath(); c.arc(W / 2, H / 2, W * 0.22, 0, 7); c.fill(); });
R = cvwRoom(G, "museum", X.museum[0], X.museum[1], 16, 12, { wall: "plaster", floor: "marble", name: "a gallery of the Museum in College Street", env: "hall", h: 5.5, lightI: 1.0 });
for (var c = 0; c < 6; c++) {
var cx = -6 + (c % 3) * 6, cz = -3 + Math.floor(c / 3) * 6;
if (c === 1)
continue;
cvwBox(R.g, 2.4, 0.9, 1.2, cvwMat("darkoak"), cx, 0, cz);
cvwBox(R.g, 2.4, 0.8, 1.2, cvwMat("glass"), cx, 0.9, cz);
for (var k = 0; k < 4; k++)
cvwEll(R.g, cvwLam([0xC8B898, 0x8A7A6A, 0xD8D0C0, 0x6A5A4A][k]), 0.12, 0.08, 0.1, cx - 0.9 + k * 0.6, 1.0, cz, 8);
}
cvwBox(R.g, 1.4, 1.0, 1.4, cvwMat("darkoak"), 0, 0, -3);
var big = cvwIdol(0.31);
big.position.set(0, 1.0, -3);
big.rotation.y = Math.PI * 0.9;
R.g.add(big);
cvwBox(R.g, 1.4, 0.9, 1.4, cvwMat("glass"), 0, 1.0, -3);
cvwSign(R.g, "STONE IMAGE · FROM THE YACHT ALERT, 1925 · ORIGIN UNKNOWN", 4.4, 0.3, 0, 0.95, -2.28, 0, { bg: "#F2EAD4" });
for (var w = 0; w < 3; w++)
cvwWindowIn(R.g, -5 + w * 5, 3.4, 5.88, Math.PI, 1.6, 2.2, { sky: 0xD8E8F4 });
},
function (P, x, z, o) {
o = o || {};
var g = cvwBrick(P, x, z, { w: o.w || 24, d: o.d || 16, st: o.st || 4, ry: o.ry || 0, mat: "sandstone", stone: "ashlar", roof: "hip", sign: o.sign, signBg: "#2A2A2A", signInk: "#E8D8A0", noDoor: true });
for (var i = 0; i < 3; i++) {
cvwBox(g, 2.6, 3.6, 0.12, cvwLam(0x3A2A1A), -((o.w || 24) / 3) + i * ((o.w || 24) / 3), 0, (o.d || 16) / 2 + 0.06);
cvwBox(g, 1.2, 0.12, 1.4, cvwMat("iron"), -((o.w || 24) / 3) + i * ((o.w || 24) / 3), (o.st || 4) * 3.4 - 1.2, (o.d || 16) / 2 + 0.7);
}
return g;
},
function (G) {
var lite = cvwLite(), H = cvwHbH, D;
cvwFar(G, H, 0x6A7A5A, { edge: 520 });
cvwTerrain(G, -520, -520, 1040, 1040, lite ? 16 : 8, H, cvwMat("grass"), function (x, z, y, c) { var g = 0.85 + cvwFbm(x * 0.03, z * 0.03, 2) * 0.2; if (y < 0) {
c.setRGB(0.3, 0.32, 0.3);
return;
} c.setRGB(0.56 * g, 0.6 * g, 0.42 * g); });
cvwWater(G, 0, -300, 1040, 520, 0.2, 0x2A5A7A, 0.9);
cvwStrip(G, CV_HB_ROADS.quay, 18, H, cvwMat("paving"), 0.08);
for (var q = 0; q < CV_HB_ROADS.quay.length - 1; q++) {
var a = CV_HB_ROADS.quay[q], b = CV_HB_ROADS.quay[q + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]);
cvwBox(G, 1.2, 6, L + 1, cvwMat("sandstone"), (a[0] + b[0]) / 2, -4.4, (a[1] + b[1]) / 2 - 10, ry);
}
[60, 120, 180].forEach(function (jx) { cvwBox(G, 8, 1.6, 40, cvwMat("planks"), jx, 0, -60); cvwFloor(jx, -60, 8, 40, 1.6); for (var p = 0; p < 8; p++)
[-1, 1].forEach(function (k) { cvwCyl(G, 0.2, 0.2, 5, cvwMat("darkbark"), jx + k * 3.8, -3.4, -78 + p * 5, 6); }); });
["Kuramia", "Kai Kai", "Lady Denman"].forEach(function (n, k) { cvwSteamer(G, 64 + k * 60 + 12, 0.2, -70, 0, { L: 34, B: 8, name: n.toUpperCase(), house: 0xF4F0E0, funnel: 0xE8C850, band: 0x1A1A1A, masts: false, smoke: !lite && k === 1, free: 1.8 }); });
CVW.alertQ = cvwShip(G, -120, 0.2, -70, 0, { L: 38, B: 7, D: 3, free: 1.8, masts: [-6, 8], funnel: 1, mastH: 16, sails: false, name: "ALERT", hullCol: 0x1E1E22, stripe: 0xC8B888, cannon: 0 });
cvwBox(G, 3, 1.6, 20, cvwMat("planks"), -112, 0, -46);
cvwFloor(-112, -46, 3, 20, 1.6);
cvwBox(G, 30, 1.6, 120, cvwMat("planks"), -400, 0, -80);
cvwFloor(-400, -80, 30, 120, 1.6);
cvwSteamer(G, -440, 0.2, -90, 0, { L: 90, B: 14, name: "VIGILANT", house: 0xE8E0D0, funnel: 0x1A1A1A, band: 0xC83A2A, smoke: !lite, free: 3 });
for (var cr = 0; cr < 3; cr++) {
var cg = new THREE.Group();
cg.position.set(-388, 1.6, -120 + cr * 40);
G.add(cg);
cvwBox(cg, 0.6, 10, 0.6, cvwMat("iron"), 0, 0, 0);
var jib = cvwBox(cg, 0.4, 0.4, 12, cvwMat("iron"), 0, 10, -5);
jib.rotation.x = 0.4;
}
[[-300, 10], [-220, 14], [-150, 10], [150, 10], [230, 14], [320, 10]].forEach(function (p, k) { cvwBondStore(G, p[0], p[1], { w: 30 + (k % 2) * 8, d: 18, st: 4 + (k % 2), ry: Math.PI, sign: ["BOND STORE No. 3", "WOOL", "MORT & CO.", "SHIPPING", "PRODUCE EXCHANGE", "STORES"][k] }); });
cvwBrick(G, 0, 26, { w: 40, d: 22, st: 4, ry: Math.PI, mat: "sandstone", stone: "ashlar", roof: "hip", cupola: 1, sign: "CUSTOMS HOUSE", signBg: "#1E2A3A" });
Object.keys(CV_HB_ROADS).forEach(function (k) { if (k === "quay")
return; cvwStrip(G, CV_HB_ROADS[k], k === "park" ? 5 : 12, H, cvwMat(k === "park" ? "gravel" : "asphalt"), 0.08); if (!lite && k !== "park")
cvwSidewalks(G, CV_HB_ROADS[k], 12, H, {}); });
for (var i = 0; i < 8; i++) {
var z = 60 + i * 56;
if (Math.abs(z - 120) < 20)
continue;
[-1, 1].forEach(function (s) { [[-80, 0], [80, 1]].forEach(function (st) { if (st[1] && z > 200)
return; cvwBrick(G, st[0] + s * 17, z, { w: 16, d: 14, st: 3 + ((i + st[1]) % 3), ry: s < 0 ? Math.PI / 2 : -Math.PI / 2, mat: (i + st[1]) % 2 ? "sandstone" : null, col: 0xA86A50, shops: i % 2 === 0, fascia: [0x1E2A3A, 0x2A1E1E, 0x1E2A22][i % 3], sign: i % 2 === 0 ? ["HOTEL", "OUTFITTERS", "CHEMIST", "TEA ROOMS", "TOBACCONIST", "BANK"][(i + st[1] * 3) % 6] : null }); }); });
}
var ct = cvwBrick(G, -80, 138, { w: 26, d: 16, st: 3, mat: "sandstone", stone: "ashlar", roof: "hip", noDoor: true, sign: "VICE-ADMIRALTY COURT" });
for (var c = 0; c < 6; c++)
cvwCyl(ct, 0.5, 0.55, 9, cvwMat("sandstone"), -7.5 + c * 3, 0, 8.6, 12);
D = function (key, p, nm) { var Rm = CVW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
cvwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
D("court", { x: -80, z: 128, ry: Math.PI }, "The doors of the vice-admiralty court");
var mu = cvwBrick(G, 190, 300, { w: 60, d: 22, st: 3, ry: -Math.PI / 2, mat: "sandstone", stone: "ashlar", roof: "hip", noDoor: true, sign: "AUSTRALIAN MUSEUM" });
for (c = 0; c < 8; c++)
cvwCyl(mu, 0.7, 0.75, 10, cvwMat("sandstone"), -14 + c * 4, 0, 11.6, 12);
D("museum", { x: 176.6, z: 300, ry: -Math.PI / 2 }, "The doors of the Museum");
var park = function (x, z) { return x > 90 && x < 300 && z > 210 && z < 480 && cvwPathD(x, z, CV_HB_ROADS.park) > 4; };
cvwPlant(G, "tree", cvwScatter(91, lite ? 20 : 46, 95, 215, 150, 480, park, H, 1.2, 1.7), { col: 0x2E4A2A });
cvwPlant(G, "grass", cvwScatter(92, lite ? 80 : 220, 90, 210, 300, 480, park, H, 0.7, 1.1), { col: 0x8AB060 });
cvwPlant(G, "palm", cvwScatter(93, lite ? 6 : 14, -300, 40, 300, 200, function (x, z) { return Math.abs(x + 80) > 12 && Math.abs(x - 80) > 12 && Math.abs(z - 120) > 12; }, H, 0.8, 1.1), {});
for (i = 0; i < (lite ? 6 : 14); i++) {
var lx = -300 + i * 44;
cvwELamp(G, lx, -14, H, {});
}
cvwPoles(G, [[-86, 0], [-86, 500]], H, 40);
[[-70, 40, 0], [-90, 90, Math.PI], [70, 60, 0], [90, 160, Math.PI], [30, -8, Math.PI / 2]].forEach(function (a, k) { if (lite && k % 2)
return; cvwAuto(G, a[0], a[1], a[2], { col: [0x14161A, 0x2A1E16, 0x1E2A22][k % 3] }); });
for (var bl = 0; bl < (lite ? 6 : 14); bl++)
cvwBox3(G, 1.2, 1.0, 1.2, cvwMat("planks"), -250 + bl * 36, 1.4, -34);
},
function (G) {
cvwCrowd("hbquay", [["A wharf labourer", "m", "worker", "The Alert? Bought by a trading firm. Nothing queer about her now."], ["A ferry hand", "m", "cvsailor", "Manly boat in ten minutes!"], ["A lady with a parasol", "f", "lady", "Such a lovely morning on the harbour."], ["A newsboy", "m", "newsboy", "Herald! Herald! Read all about it!", null, true], ["A seaman of the Alert's new owners", "m", "cvsailor", "Copra and tinned goods, island to island. That's all she does now."], ["A customs officer", "m", "porter", "Papers, please."], ["A grey old salt", "m", "cvsailor", "I heard Johansen went home with his yellow hair turned white."]], -260, -36, 260, -14, { wander: 10 });
cvwCrowd("hbstreet", [["A clerk", "m", "gent", "Lunch at the tea rooms, then back to the ledgers."], ["A shopgirl", "f", "lady", "We've the new hats in from London."], ["A policeman", "m", "police", "Good morning."], ["A schoolboy", "m", "boy", "Race you to the park!", null, true], ["A woman with a pram", "f", "lady", "Lovely day for it."]], -95, 40, 95, 240, { wander: 12 });
cvwCrowd("hbpark", [["A gardener", "m", "worker", "The figs want water."], ["A man on a bench", "m", "gent", "Morning paper and the sun. Can't beat it."], ["A girl feeding pigeons", "f", "girl", "They're so greedy!", null, true]], 100, 230, 280, 460, { wander: 10 });
},
function (G) {
cvwHbRooms(G);
cvwHarbour(G);
cvwHbFolk(G);
var X = CVW_ROOMXZ.harbour;
[["dunedin", [["A Dunedin waterfront man", "m", "cvsailor", "That crew off the Alert? Kept to themselves. Night trips to the woods."], ["The tavern keeper", "m", "worker", "Drumming on the hills, red flame, one night. Then they sailed."], ["A drinker by the fire", "m", "worker", "Don't ask about them. Not in here."]]], ["auckland", [["The shipping clerk", "m", "gent", "Johansen? Sold his cottage in West Street and sailed for Oslo with his wife."]]], ["court", [["An officer of the court", "m", "porter", "The inquiry? Perfunctory and inconclusive, sir."], ["A seaman waiting to be called", "m", "cvsailor", "They say the Emma's men fought like demons. Had to."]]], ["museum", []]].forEach(function (F) {
var R = CVW.rooms.filter(function (r) { return r.key === F[0]; })[0];
if (!R)
return;
cvwCrowd("hbin" + F[0], F[1], R.x0 + 1.5, R.z0 + 3, R.x1 - 1.5, R.z1 - 2, { y: R.y, wander: 1.5 });
});
},
function (G) {
var X = CVW_ROOMXZ.oslo, R;
R = cvwRoom(G, "johansen", X.johansen[0], X.johansen[1], 9, 8, { wall: "bluepaper", name: "the Johansens' parlour, Oslo", lightI: 0.8 });
cvwTable(R.g, 0, 0, 1.6, 1.0, 0.76, { cloth: 0xF4F0E8 });
cvwChair(R.g, -0.9, 0, Math.PI / 2, {});
cvwChair(R.g, 0.9, 0, -Math.PI / 2, {});
cvwShelves(R.g, 0, -3.8, 2.4, 2, 0, {});
cvwHearth(R.g, -4.3, -1.4, Math.PI / 2, { h: R.h, mat: "white" });
cvwPicture(R.g, 2, 2.2, -3.88, 0, 1.0, 0.7, function (c, W, H) { c.fillStyle = "#9AB0C8"; c.fillRect(0, 0, W, H); c.fillStyle = "#1E2A3A"; c.fillRect(0, H * 0.6, W, H * 0.4); c.fillStyle = "#F4F0E0"; c.beginPath(); c.moveTo(W * 0.3, H * 0.6); c.lineTo(W * 0.5, H * 0.15); c.lineTo(W * 0.5, H * 0.6); c.fill(); c.fillRect(W * 0.32, H * 0.6, W * 0.36, H * 0.08); });
cvwWindowIn(R.g, 2, 2, 3.88, Math.PI, 1.2, 1.4, { sky: 0xD8C8A8 });
cvwRug(R.g, 0, 0.4, 3, 2.2, 0x6A2A2A);
cvwTinBox(R.g, 0.2, 0.77, 0.1, 0, {});
cvwPapers(R.g, -0.3, 0.77, 0.2, 6);
R = cvwRoom(G, "londonboat", X.londonboat[0], X.londonboat[1], 7, 5, { wall: "oak", floor: "planks", name: "a cabin on the London boat", lightI: 0.6, env: "garret" });
cvwBed(R.g, -2.4, -0.6, Math.PI / 2, { cover: 0x4A5A6A });
cvwTable(R.g, 1.6, -1.4, 1.0, 0.6, 0.74, {});
cvwChair(R.g, 1.6, -0.8, Math.PI, {});
cvwPapers(R.g, 1.6, 0.75, -1.4, 10);
var port = new THREE.Mesh(new THREE.CircleGeometry(0.3, 16), cvwGlowM(0x8AA0B0));
port.position.set(0, 1.8, -2.38);
R.g.add(port);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.05, 6, 16), cvwMat("brass"));
rim.position.set(0, 1.8, -2.36);
R.g.add(rim);
cvwCandle(R.g, 1.9, 0.75, -1.6, { brass: 1 });
},
function (G) {
var lite = cvwLite(), H = cvwOsH, D;
cvwFar(G, H, 0x5A6A3A, { edge: 460 });
cvwTerrain(G, -460, -460, 920, 920, lite ? 16 : 8, H, cvwMat("grass"), function (x, z, y, c) { var g = 0.85 + cvwFbm(x * 0.03, z * 0.03, 2) * 0.2; if (y < 0) {
c.setRGB(0.3, 0.3, 0.28);
return;
} if (x > 90) {
c.setRGB(0.42 * g, 0.44 * g, 0.26 * g);
return;
} c.setRGB(0.52 * g, 0.56 * g, 0.36 * g); });
cvwWater(G, 0, -260, 920, 420, 0.2, 0x2A4A5A, 0.92);
cvwStrip(G, CV_OS_ROADS.quay, 16, H, cvwMat("cobbles"), 0.08);
cvwBox(G, 920, 5, 1.2, cvwMat("granite"), 0, -4.4, -58.6);
Object.keys(CV_OS_ROADS).forEach(function (k) { if (k !== "quay")
cvwStrip(G, CV_OS_ROADS[k], k === "lane" ? 3 : 6, H, cvwMat("cobbles"), 0.08); });
cvwSteamer(G, -200, 0.2, -80, Math.PI / 2, { L: 70, B: 11, name: "LONDON", house: 0xE8E0D0, funnel: 0x1A1A1A, band: 0xE8C040, smoke: !lite, free: 2.6 });
cvwShip(G, 120, 0.2, -82, Math.PI / 2, { L: 32, B: 7.5, D: 3, free: 1.6, masts: [-6, 6], mastH: 18, sails: false, name: "SOLVEIG", hullCol: 0x2A3A4A, stripe: 0xE8E0D0, jib: 1 });
cvwSteamer(G, 320, 0.2, -84, Math.PI / 2, { L: 56, B: 10, name: "BERGEN", house: 0xF4F0E4, funnel: 0xC83A2A, band: 0x1A1A1A, free: 2.2 });
for (var s = 0; s < 5; s++)
cvwBrick(G, -380 + s * 170, -26, { w: 32, d: 14, st: 2, ry: Math.PI, col: [0x8A3A2A, 0x6A5A4A, 0xA85A44][s % 3], roof: "hip", noDoor: true, sign: ["TOLLBOD", "LAGER", "PAKKHUS", "DAMPSKIBS-EXPEDITION", "LAGER"][s] });
for (var b = 0; b < (lite ? 8 : 20); b++)
cvwCyl(G, 0.4, 0.4, 1.0, cvwMat("oak"), -420 + b * 44, H(-420 + b * 44, -44), -44 + (b % 2) * 1.2, 10);
D = function (key, p, nm) { var Rm = CVW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
cvwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
var cols = [0xE8D8B8, 0xD8B890, 0xE8E0D0, 0xC89870, 0xE0C8A0, 0xF0E8D8];
var lots = [[-140, 10, 1], [-100, 10, -1], [-140, 50, 1], [-100, 50, -1], [-140, 90, 1], [-100, 90, -1], [-140, 130, 1], [-100, 152, -1], [-90, 180, -1], [-30, 200, -1], [-60, 230, 1], [10, 220, -1], [-260, 0, 1], [-260, 40, 1], [-340, 0, -1], [-340, 40, -1], [-200, 80, 1], [-200, 110, -1], [0, 110, 1], [40, 130, 1], [60, 80, -1]];
lots.forEach(function (l, k) { var ry = l[2] > 0 ? Math.PI / 2 : -Math.PI / 2; cvwTownHouse(G, l[0], l[1], 12, 9, 8 + (k % 3) * 1.6, { wall: "render", roof: k % 3 ? "tile" : "slate", ry: ry, shut: [0x2A3A4A, 0x5A2A1E, 0x2A4A3A][k % 3] }); });
D("johansen", { x: -106.4, z: 152, ry: Math.PI / 2 }, "Johansen's door");
cvwSign(G, "JOHANSEN", 0.8, 0.22, -105.9, H(-106, 153.6) + 1.7, 153.6, Math.PI / 2, { bg: "#E8E0C8" });
[[-312, 10], [-288, 30], [-312, 50]].forEach(function (p, k) { cvwBrick(G, p[0], p[1], { w: 14, d: 10, st: 4, ry: k === 1 ? -Math.PI / 2 : Math.PI / 2, col: 0x7A4A3A, noDoor: true }); });
var hill = function (x, z) { return x > 90 && z > -30; };
cvwConifer(G, cvwScatter(95, lite ? 60 : 160, 90, -30, 460, 460, hill, H, 0.8, 1.3), {});
cvwBirch(G, cvwScatter(96, lite ? 40 : 110, 40, -20, 460, 460, function (x, z) { return x > 40 && z > -20 && cvwPathD(x, z, CV_OS_ROADS.egeberg) > 5; }, H, 0.8, 1.3));
cvwPlant(G, "bush", cvwScatter(97, lite ? 40 : 100, -460, -30, 460, 460, function (x, z) { return Object.keys(CV_OS_ROADS).every(function (k) { return cvwPathD(x, z, CV_OS_ROADS[k]) > 6; }); }, H, 0.4, 0.8), { col: 0x8A6A2A });
for (var i = 0; i < (lite ? 6 : 14); i++)
cvwLamp(G, -420 + i * 62, -40, H, {});
cvwPoles(G, [[-460, -36], [460, -36]], H, 40);
cvwAuto(G, -60, -38, Math.PI / 2, { col: 0x1A1A22, open: 0 });
cvwCart(G, 40, -40, Math.PI / 2, { seat: true, len: 2.2, w: 1.4, hcol: 0x2A1A10 });
cvwHorse(G, 40, H(36.4, -40), -40, Math.PI / 2, {});
},
function (G) {
cvwCrowd("osquay", [["A Norwegian docker", "m", "worker", "God dag. The London boat sails on the tide."], ["A fishwife", "f", "cvsquatterf", "Fersk fisk! Fresh fish!"], ["A ship's officer", "m", "cvsailor", "Bergen line. We put in from the north this morning."], ["A taxi driver", "m", "worker", "Taxi? The Old Town is not far."], ["A girl with a basket of apples", "f", "girl", "Epler! Apples!", null, true], ["A harbour policeman", "m", "police", "Good day, sir."]], -420, -48, 420, -34, { wander: 12 });
cvwCrowd("osold", [["An old woman at her door", "f", "cvwidow", "The Old Town is old Oslo, the true one."], ["A carpenter", "m", "worker", "These houses were here before Christiania was."], ["A schoolboy", "m", "boy", "Hei!", null, true], ["A housewife", "f", "lady", "The birches turn so quickly in autumn."], ["A neighbour of the Johansens", "f", "lady", "Poor Mrs. Johansen. He was never the same after the sea."]], -150, 0, 20, 220, { wander: 8 });
},
function (G) {
var X = CVW_ROOMXZ.sea, R, lite = cvwLite();
R = cvwRoom(G, "alertcabin", X.alertcabin[0], X.alertcabin[1], 8, 6, { wall: "oak", floor: "planks", name: "the Alert's cabin", lightI: 0.6, env: "garret" });
cvwTable(R.g, 0, 0, 1.6, 0.9, 0.74, {});
cvwBed(R.g, -2.8, -1, Math.PI / 2, { cover: 0x3A3A4A });
cvwBed(R.g, 2.8, -1, -Math.PI / 2, { cover: 0x3A3A4A });
var sh = new THREE.Group();
sh.position.set(0, 0, -2.6);
R.g.add(sh);
cvwBox(sh, 1.2, 1.0, 0.6, cvwMat("darkoak"), 0, 0, 0);
cvwBox(sh, 1.0, 1.0, 0.5, cvwMat("darkoak"), 0, 1.0, -0.04);
var roof = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.5, 4), cvwMat("darkoak"));
roof.rotation.y = Math.PI / 4;
roof.position.y = 2.25;
sh.add(roof);
if (!CVW.st.idolTaken) {
var idl = cvwIdol(0.3);
idl.position.set(0, 1.02, 0.05);
sh.add(idl);
}
sh.userData.keep = 1;
var port = new THREE.Mesh(new THREE.CircleGeometry(0.25, 14), cvwGlowM(CVW.st.storm ? 0x3A4450 : 0x9AB0C0));
port.position.set(2, 1.7, -2.88);
R.g.add(port);
cvwCandle(R.g, 0.4, 0.75, 0.2, { brass: 1 });
R = cvwRoom(G, "engine", X.engine[0], X.engine[1], 9, 6, { wall: "iron", floor: "iron", name: "the Alert's engine room", lightI: 0.8, lightCol: 0xFFB070, env: "garret", bare: 1 });
cvwBox(R.g, 2.6, 2.2, 3.4, cvwMat("iron"), -2, 0, -0.6);
cvwCyl(R.g, 0.9, 0.9, 3.0, cvwMat("iron"), 2, 0, -1, 14).rotation.z = Math.PI / 2;
for (var g = 0; g < 4; g++) {
var gau = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.05, 14), cvwMat("brass"));
gau.rotation.x = Math.PI / 2;
gau.position.set(-3 + g * 0.5, 1.8, -2.32);
R.g.add(gau);
}
cvwBox(R.g, 1.2, 0.8, 1.0, cvwLam(0x2A2A2A), 2.6, 0, 1.8);
cvwFire(R.g, -2, 0.35, 1.25, 0.5);
var whl = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.05, 6, 18), cvwMat("iron"));
whl.position.set(3.4, 1.4, -1);
whl.rotation.y = Math.PI / 2;
R.g.add(whl);
R = cvwRoom(G, "emmacabin", X.emmacabin[0], X.emmacabin[1], 7, 5, { wall: "oak", floor: "planks", name: "the Emma's cabin", lightI: 0.6, env: "garret" });
cvwTable(R.g, 0, 0, 1.4, 0.8, 0.74, {});
cvwBed(R.g, -2.4, -0.6, Math.PI / 2, { cover: 0x5A4A3A });
cvwPapers(R.g, 0, 0.75, 0, 5);
cvwCandle(R.g, 0.4, 0.75, 0.2, {});
var chart = cvwPicture(R.g, 2, 2.0, -2.38, 0, 1.2, 0.8, function (c, W, H) { c.fillStyle = "#E8DCC0"; c.fillRect(0, 0, W, H); c.strokeStyle = "rgba(60,80,120,.5)"; for (var i = 0; i < 8; i++) {
c.beginPath();
c.moveTo(0, i * H / 8);
c.lineTo(W, i * H / 8);
c.stroke();
c.beginPath();
c.moveTo(i * W / 8, 0);
c.lineTo(i * W / 8, H);
c.stroke();
} c.strokeStyle = "#8A2A1A"; c.beginPath(); c.moveTo(10, H - 12); c.lineTo(W * 0.5, H * 0.6); c.lineTo(W * 0.62, H * 0.7); c.stroke(); });
},
function (G) {
var lite = cvwLite(), st = CVW.st, S = cvwSeaShips();
var n = lite ? 28 : 64, geo = new THREE.PlaneGeometry(1400, 1400, n, n);
geo.rotateX(-Math.PI / 2);
(function () { var p0 = geo.attributes.position, u0 = geo.attributes.uv; for (var i = 0; i < p0.count; i++) {
var x = p0.getX(i) / 700, z = p0.getZ(i) / 700;
x = Math.sign(x) * x * x * 700;
z = Math.sign(z) * z * z * 700;
p0.setX(i, x);
p0.setZ(i, z);
u0.setXY(i, x / 1400 + 0.5, 0.5 - z / 1400);
} })();
var sea = new THREE.Mesh(geo, cvwWaterM(st.storm ? 0x2A3A44 : (st.rlyehWater ? 0x2A3A30 : 0x2A5A7A), 0.95));
sea.position.y = 0;
G.add(sea);
CVW.water.push(sea);
var far = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000), cvwLam(st.storm ? 0x2A343C : 0x2A4A62));
far.rotation.x = -Math.PI / 2;
far.position.y = -2.6;
G.add(far);
var amp = st.storm ? 1.6 : 0.75, pa = geo.attributes.position, base = new Float32Array(pa.count);
for (var i = 0; i < pa.count; i++)
base[i] = 0;
var swell = function (t) { for (var i = 0; i < pa.count; i++) {
var x = pa.getX(i), z = pa.getZ(i), d = Math.hypot(x, z), k = d < 40 ? 0.1 + 0.9 * d / 40 : 1;
pa.setY(i, (Math.sin(x * 0.03 + t * 0.7) * 0.6 + Math.sin(z * 0.045 - t * 0.5) * 0.5 + Math.sin((x + z) * 0.07 + t * 1.1) * 0.25) * amp * k - 0.3);
} pa.needsUpdate = true; geo.computeVertexNormals(); };
swell(0);
if (!lite)
CVW.ticks.push(function (dt) { CVW.wt2 = (CVW.wt2 || 0) + dt; if (CVW.wt2 < 0.05)
return; CVW.wt2 = 0; swell(CVW.t); });
if (!st.storm || true) {
var fm = cvwM("seaFoam", function () {
var ft = cvwCanvas("seaFoamT", 256, 256, function (c, W, H) { c.clearRect(0, 0, W, H); var R = wRand(404); for (var i = 0; i < 80; i++) {
var x = R() * W, y = R() * H, l = 6 + R() * 24, gr = c.createRadialGradient(x, y, 0, x, y, l);
gr.addColorStop(0, "rgba(255,255,255," + (0.55 + R() * 0.35) + ")");
gr.addColorStop(1, "rgba(255,255,255,0)");
c.save();
c.translate(x, y);
c.scale(1, 0.35);
c.translate(-x, -y);
c.fillStyle = gr;
c.beginPath();
c.arc(x, y, l, 0, 7);
c.fill();
c.restore();
} });
ft.repeat.set(26, 26);
var m = new THREE.MeshLambertMaterial({ color: 0xF4F8FA, map: ft, transparent: true, opacity: st.storm ? 0.9 : 0.75, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
m.userData.noPhoto = 1;
return m;
});
var caps = new THREE.Mesh(geo, fm);
caps.renderOrder = 3;
G.add(caps);
caps.userData.fx = 0.12;
caps.userData.fz = 0.3;
CVW.water.push(caps);
}
if (S.emma) {
var sink = st.sinking ? 1 : 0;
CVW.emma = cvwShip(G, 0, 0.2 - sink * 0.9, 0, 0, { L: 34, B: 7.6, D: 3.4, free: 1.7, masts: [-6, 6], mastH: 20, jib: 1, sails: !st.battle, name: "EMMA", hullCol: 0x1E2A2E, stripe: 0xE8E0D0, boat: 1 });
if (sink) {
CVW.emma.g.rotation.z = 0.12;
CVW.emma.g.rotation.x = -0.05;
}
}
if (S.alert) {
CVW.alert = cvwShip(G, S.alertX, 0.2, st.alertOurs ? 0 : 6, 0, { L: 38, B: 7, D: 3, free: 1.8, masts: [-6, 8], funnel: 1, mastH: 16, sails: false, name: "ALERT", hullCol: 0x14161A, stripe: 0xC8B888, cannon: 6, boat: !st.alertOurs, smoke: !lite && (st.steam || st.alertNear) });
if (st.battle && !lite) {
for (var k = 0; k < 3; k++)
cvwSmoke(G, S.alertX + 3.2, 2.2, -6 + k * 6, 0xC8C4B8, 6);
}
}
if (st.pillar) {
var pl = cvwTitan(G, 14, 90, 12, 260, -20, -520, 0.4, { carve: 1, sx: 0.08, sz: -0.05 });
var cap = cvwTitan(G, 18, 8, 16, 260 + 7, 70, -520 - 4, 0.6, { sx: 0.2 });
}
if (st.storm) {
var r = cvwSnowfall(G, lite ? 260 : 700, 7);
r.material.color.setHex(0x9AAAB8);
r.material.size = lite ? 0.08 : 0.05;
}
if (st.dreamstorm)
cvwVoidSky(G, { op: 0.9 });
if (st.vigilant)
cvwSteamer(G, 120, 0.2, -160, -0.6, { L: 90, B: 14, name: "VIGILANT", house: 0xE8E0D0, funnel: 0x1A1A1A, band: 0xC83A2A, smoke: !lite, free: 3 });
},
function (st) {
var c = st.chase || 0, T = CVW.thing;
if (c && (!T || !T.parent) && CVW.scG) {
T = CVW.thing = cvwThing(CVW.scG, 0, -20, 90, Math.PI, 70);
T.userData.sp = 7;
}
if (T && !c) {
T.visible = false;
return;
}
if (!T)
return;
T.visible = true;
if (T.userData.c === c)
return;
T.userData.c = c;
if (c === 1) {
T.position.set(0, -24, 110);
T.userData.goal = [0, -22, 70];
}
else if (c === 2) {
T.position.set(0, -30, -70);
T.userData.goal = [0, -26, -44];
}
else if (c === 3) {
T.position.set(0, -40, 140);
T.userData.goal = [0, -36, 260];
T.scale.setScalar(0.85);
}
},
function (G) {
cvwSeaRooms(G);
cvwSea(G);
CVW.live = cvwSeaLive;
cvwSeaLive(CVW.st);
if (!cvwBookHere()) {
var dk = CVW.emma || CVW.alert;
if (dk) {
var gx = dk.g.position.x, gz = dk.g.position.z;
cvwCrowd("seawatch", [["A deckhand of the Emma", "m", "cvsailor", "Fair wind for Callao, if it holds."], ["The ship's cook", "m", "worker", "Salt beef again. Don't look at me like that."], ["A seaman at the shrouds", "m", "cvsailor", "Nothing on the horizon but the horizon."], ["A Swedish seaman", "m", "cvsailor", "Long way from home, this sea."], ["The boy who keeps the lamps", "m", "boy", "I trim the lamps and I fetch the tea.", null, true], ["An old hand splicing rope", "m", "cvsailor", "Southern ocean's a cold one, even in summer."]], gx - 2, gz - 12, gx + 2, gz + 12, { wander: 3 });
}
}
},
function (x, z) {
var dx = x / 1.0, dz = (z + 40) / 1.15, r = Math.hypot(dx, dz) + cvwFbm(x * 0.01, z * 0.01, 3) * 60 - 30;
var h = 34 * (1 - cvwSmooth(60, 250, r));
h += cvwFbm(x * 0.03, z * 0.03, 2) * 1.4 * (h > 1 ? 1 : 0);
if (z > 150 && z < 240 && Math.abs(x) < 60)
h = Math.max(h, 0.6 + cvwSmooth(240, 150, z) * 3);
var dd = Math.hypot(x - CV_RL.door[0], z - CV_RL.door[1] - 14);
if (dd < 40)
h = Math.max(h, 34);
if (r > 320)
h = -24;
return h - 4;
},
function (G) {
var lite = cvwLite(), st = CVW.st, H = cvwRlH, dream = !!st.dream;
var sea = cvwWater(G, 0, 0, 2400, 2400, 0, dream ? 0x1A2A26 : 0x26342A, 0.95);
sea.userData.fx = 0.04;
sea.userData.fz = 0.08;
cvwTerrain(G, -620, -620, 1240, 1240, lite ? 14 : 7, H, cvwS("b:strata", 0xC4E0C4, 6, { vc: 1, n: 1.8, shine: 48, spec: 0x4A6A4A }), function (x, z, y, c) { var g = 0.75 + cvwFbm(x * 0.05, z * 0.05, 2) * 0.35; if (y < 0.2) {
c.setRGB(0.4 * g, 0.46 * g, 0.32 * g);
return;
} var w = cvwFbm(x * 0.02 + 3, z * 0.02, 2); c.setRGB((0.38 + w * 0.14) * g, (0.54 + w * 0.18) * g, (0.4 + w * 0.08) * g); });
var R = wRand(7171), n = lite ? 40 : 96, blocks = 0, RW = wRand(7272);
for (var i = 0; i < n * 3 && blocks < n; i++) {
var x = (R() - 0.5) * 520, z = -260 + R() * 440, hh = H(x, z);
if (hh < -1 || cvwPathD(x, z, CV_RL_PATH) < 12 || Math.hypot(x - CV_RL.door[0], z - CV_RL.door[1]) < 46 || Math.hypot(x - CV_RL.mono[0], z - CV_RL.mono[1]) < 30)
continue;
var w = 6 + R() * 22, h = 4 + R() * 26 * (hh > 10 ? 1.2 : 0.6), d = 6 + R() * 18;
cvwTitan(G, w, h, d, x, hh - 1.5, z, R() * 6.283, { carve: R() < 0.55, sx: (R() - 0.5) * 0.4, sz: (R() - 0.5) * 0.4, tw: (R() - 0.5) * 0.03, solid: true });
blocks++;
if (typeof cvdWeedGeo === "function" && RW() < (lite ? 0.25 : 0.6)) {
var tb = G.children[G.children.length - 1], wg = new THREE.Group();
wg.position.copy(tb.position);
wg.rotation.y = tb.rotation.y;
G.add(wg);
var ww = Math.max(3, Math.round(w * 0.8)), pa = tb.geometry.attributes.position, tx = 0, tn = 0, zmax = -1e9, zmin = 1e9;
for (var v = 0; v < pa.count; v++) {
if (pa.getY(v) > h / 2 - 0.01) {
tx += pa.getX(v);
tn++;
zmax = Math.max(zmax, pa.getZ(v));
zmin = Math.min(zmin, pa.getZ(v));
}
}
tx /= tn || 1;
[zmax + 0.08, zmin - 0.08].forEach(function (zz) { var wm = new THREE.Mesh(cvdWeedGeo(ww), cvwVcM("weedVC")); wm.position.set(tx, h / 2 - 0.2, zz); wg.add(wm); });
}
if (!lite && R() < 0.4)
cvwOozeOn(G, x, hh + h * 0.5, z + d / 2 + 0.3, w * 0.6, h * 0.8, 0);
}
for (var s = 1; s < CV_RL_PATH.length - 1; s++) {
var p = CV_RL_PATH[s];
[-1, 1].forEach(function (k) { var bx = p[0] + k * (10 + ((s * 7) % 5)), bz = p[1]; cvwTitan(G, 8, 6 + (s % 3) * 3, 10, bx, H(bx, bz) - 1, bz, s * 0.7, { carve: s % 2 === 0, sx: k * 0.12, sz: 0.08, solid: true }); });
}
[[-70, 10, 0.4, 28], [80, -20, -0.5, 34], [-110, -110, 0.9, 40], [110, -120, -0.9, 38], [60, 100, -0.2, 20]].forEach(function (q, k) {
var sg = new THREE.Group(), y = H(q[0], q[1]) - 1;
sg.position.set(q[0], y, q[1]);
sg.rotation.set((k % 2 ? 0.12 : -0.08), q[2] + Math.PI, (k % 2 ? -0.1 : 0.14));
G.add(sg);
var blk = cvwTitan(sg, q[3] * 0.6, q[3] * 0.3, q[3] * 0.5, 0, 0, 0, 0, { carve: 1 });
var F = cvwForm(cvwMat("rlstone"), { dark: cvwMat("rlstoneD"), feelers: lite ? 6 : 10, seg: 12, big: 1 });
F.scale.setScalar(q[3] * 0.5);
F.position.y = q[3] * 0.3;
sg.add(F);
cvwSolid(q[0], q[1], q[3] * 0.6, q[3] * 0.5, y - 1, y + q[3] * 1.4, q[2]);
});
var my = H(CV_RL.mono[0], CV_RL.mono[1]) - 2;
var mono = cvwTitan(G, 30, 150, 26, CV_RL.mono[0], my, CV_RL.mono[1], 0.18, { carve: 1, sx: 0.05, sz: -0.03, tw: 0.004, mpt: 9, solid: true });
cvwTitan(G, 46, 22, 40, CV_RL.mono[0], my - 4, CV_RL.mono[1] - 6, 0.5, { carve: 1, sx: -0.2, solid: true });
var dg = new THREE.Group(), dy = H(CV_RL.door[0], CV_RL.door[1]);
dg.position.set(CV_RL.door[0], dy, CV_RL.door[1]);
G.add(dg);
dg.userData.keep = 1;
var W = 34, Hd = 26, frame = cvwMat("rlstoneD");
cvwTitan(dg, W + 12, 2.4, 8, 0, -1.4, 4, 0, { mat: frame });
[-1, 1].forEach(function (k) { cvwTitan(dg, 6, Hd + 4, 7, k * (W / 2 + 3), -1, -2, 0, { carve: 1, sx: k * 0.06, tw: 0.01 }); });
cvwTitan(dg, W + 16, 6, 8, 0, Hd + 1, -4, 0, { carve: 1, sx: 0.04 });
var piv = new THREE.Group();
piv.position.set(0, Hd + 0.5, -6);
dg.add(piv);
piv.rotation.x = 0.9;
var panel = new THREE.Mesh(cvwGeo("rldoor", function () { var g = new THREE.BoxGeometry(W, Hd + 6, 1.6); g.translate(0, -(Hd + 6) / 2, 0); return g; }), [cvwMat("rlstoneD"), cvwMat("rlstoneD"), cvwMat("rlstoneD"), cvwMat("rlstoneD"), cvwM("rldoorF", function () {
var t = cvwCanvas("rldoorT", 512, 512, function (c, W2, H2) { c.fillStyle = "#24302A"; c.fillRect(0, 0, W2, H2); cvwNoise(c, W2, H2, 6000, 0.3, 5, "8,12,10"); c.strokeStyle = "rgba(10,14,12,.8)"; c.lineWidth = 12; c.strokeRect(14, 14, W2 - 28, H2 - 28); c.save(); c.translate(W2 * 0.12, H2 * 0.08); cvwFigureDraw(c, W2 * 0.76, H2 * 0.7, { ink: "rgba(8,12,10,.85)", hi: "rgba(140,190,150,.14)", glyphs: false }); c.restore(); c.save(); c.translate(20, H2 * 0.78); cvwGlyphDraw(c, W2 - 40, H2 * 0.18, 93, "rgba(8,12,10,.75)"); c.restore(); });
var m = cvwLite() ? new THREE.MeshLambertMaterial({ color: 0xB8C8B8, map: t }) : new THREE.MeshPhongMaterial({ color: 0xB8C8B8, map: t, shininess: 50, specular: 0x3A4A3A });
m.userData.noPhoto = 1;
return m;
}), cvwMat("rlstoneD")]);
piv.add(panel);
piv.userData.closed = 0.9;
CVW.rlDoor = piv;
var dark = new THREE.Mesh(new THREE.PlaneGeometry(W - 1, Hd + 3), new THREE.MeshBasicMaterial({ color: 0x000000 }));
dark.position.set(0, Hd / 2 - 1, -6.6);
dg.add(dark);
dark.visible = !!st.doorOpen;
CVW.rlDark = dark;
cvwSolid(CV_RL.door[0], CV_RL.door[1] - 8, W + 12, 10, dy - 2, dy + Hd + 8, 0);
CVW.rlEdge = [];
for (var e = 0; e < 6; e++) {
var ex = -W / 2 + 2 + e * (W - 4) / 5;
CVW.rlEdge.push({ x: CV_RL.door[0] + ex, z: CV_RL.door[1] + 3 });
}
cvwPlant(G, "reeds", cvwScatter(301, lite ? 80 : 240, -260, -60, 260, 260, function (x, z) { var h = H(x, z); return h > -0.5 && h < 6 && cvwPathD(x, z, CV_RL_PATH) > 3; }, H, 0.6, 1.2), {});
var pools = cvwScatter(302, lite ? 10 : 26, -200, 40, 200, 240, function (x, z) { return H(x, z) > 0.5 && cvwPathD(x, z, CV_RL_PATH) > 6; }, H, 1, 1);
pools.forEach(function (p) { var pm = new THREE.Mesh(new THREE.CircleGeometry(2 + ((p.x * 7) % 3), 14), cvwWaterM(0x2A3A28, 0.85)); pm.rotation.x = -Math.PI / 2; pm.position.set(p.x, p.y + 0.05, p.z); G.add(pm); });
if (!lite)
cvwPlant(G, "rock", cvwScatter(303, 140, -300, -260, 300, 260, function (x, z) { return H(x, z) > -0.5 && cvwPathD(x, z, CV_RL_PATH) > 3; }, H, 0.6, 2.2), { mat: cvwMat("rlstone") });
var ca = cvwTitan(G, 14, 18, 3, CV_RL_PATH[3][0] - 30, H(-26, 70) - 1, 70, 0.5, { carve: 1, sx: 0.3, tw: 0.05, solid: true });
var cb = cvwTitan(G, 14, 18, 3, CV_RL_PATH[3][0] - 38, H(-38, 66) - 1, 66, -0.6, { carve: 1, sx: -0.3, tw: -0.05, solid: true });
var sun = new THREE.Mesh(new THREE.CircleGeometry(60, 32), new THREE.MeshBasicMaterial({ color: dream ? 0x8AB0A0 : 0xD8E0A0, transparent: true, opacity: dream ? 0.25 : 0.55, fog: false, depthWrite: false }));
sun.position.set(900, 700, -1500);
sun.lookAt(0, 0, 0);
sun.scale.set(1.5, 0.62, 1);
sun.rotation.z += 0.5;
G.add(sun);
cvwVoidSky(G, { op: dream ? 0.95 : 0.55, seed: 313 });
for (var m = 0; m < (lite ? 5 : 12); m++) {
var hz = new THREE.Mesh(cvwGeo("rlhaze", function () { return new THREE.PlaneGeometry(160, 24); }), cvwM("rlhazeM", function () { var mm = new THREE.MeshBasicMaterial({ color: 0x8AA088, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide }); mm.userData.noPhoto = 1; return mm; }));
var a = m / 12 * 6.283;
hz.position.set(Math.cos(a) * 220, 10 + (m % 3) * 6, Math.sin(a) * 220 - 40);
hz.rotation.y = -a + Math.PI / 2;
G.add(hz);
}
if (!dream) {
CVW.rlAlert = cvwShip(G, CV_RL.alert[0], 0.2, CV_RL.alert[1], 0.3, { L: 38, B: 7, D: 3, free: 1.8, masts: [-6, 8], funnel: 1, mastH: 16, sails: false, name: "ALERT", hullCol: 0x14161A, stripe: 0xC8B888, cannon: 6, smoke: !lite });
if (!st.boatGone) {
var bt = new THREE.Group();
bt.position.set(CV_RL.boat[0], 0.3, CV_RL.boat[1] + 6);
G.add(bt);
cvwBoat(bt, 0, 0, 0, 0.2, {});
}
}
if (st.doorOpen) {
var sm = [];
for (var k = 0; k < (lite ? 8 : 20); k++) {
var b = new THREE.Mesh(cvwGeo("dsmk", function () { return new THREE.IcosahedronGeometry(4, 1); }), cvwLam(0x050506, { op: 0.55 }));
b.userData.ph = k / (lite ? 8 : 20);
dg.add(b);
sm.push(b);
}
CVW.ticks.push(function (dt) { var t = CVW.t; sm.forEach(function (b) { var u = (t * 0.04 + b.userData.ph) % 1; b.position.set(Math.sin(u * 7 + b.userData.ph * 9) * 20 * u, Hd * 0.5 + u * 160, -6 - u * 120); b.scale.set(1 + u * 3, (1 + u * 3) * (0.5 + 0.5 * Math.abs(Math.sin(t * 0.9 + b.userData.ph * 6))), 1 + u * 3); b.material.opacity = 0.55 * (1 - u); }); });
}
},
function (st) {
var P = CVW.rlDoor;
if (P) {
P.userData.goal = st.doorOpen ? -0.35 : 0.9;
}
if (CVW.rlDark)
CVW.rlDark.visible = !!st.doorOpen;
var T = CVW.thing;
if (st.thing && (!T || !T.parent) && CVW.scG) {
T = CVW.thing = cvwThing(CVW.scG, 0, cvwRlH(0, CV_RL.door[1]) - 30, CV_RL.door[1] - 14, 0, 60);
T.userData.sp = 3;
}
if (T)
T.visible = !!st.thing;
if (T) {
var k = st.thing || 0, dy = cvwRlH(0, CV_RL.door[1]);
if (k === 1)
T.userData.goal = [0, dy - 8, CV_RL.door[1] - 8];
else if (k === 2)
T.userData.goal = [0, dy - 10, CV_RL.door[1] + 60];
else if (k >= 3)
T.userData.goal = [10, -16, 190];
}
},
function (G) {
cvwRlyeh(G);
CVW.live = cvwRlLive;
cvwRlLive(CVW.st);
if (!cvwBookHere())
cvwCrowd("rldream", [["A sculptor, asleep on his feet", "m", "cvartist", "Titan blocks... sky-flung monoliths... I must remember it to model it."], ["A poet in her nightgown", "f", "lady", "It calls from underneath. Can you hear? Not with your ears."], ["An architect, dreaming", "m", "gent", "The angles. Look at the angles. None of them is right."], ["A painter from Paris", "m", "cvartist", "I shall paint this, and call it a Dream Landscape."], ["A dreamer from Providence", "f", "lady", "I wrote to the old professor about this place. He never wrote back."], ["A sleepwalking sailor", "m", "cvsailor", "We came ashore here once. Or I dreamed it."]], -60, 0, 60, 200, { wander: 6, ok: function (x, z) { return cvwRlH(x, z) > 0.4; } });
},
function (G, x, y, z, w, h, ry, col, op) {
var m = new THREE.Mesh(cvwGeo("dfog" + w + "|" + h, function () { return new THREE.PlaneGeometry(w, h); }), cvwM("dfogM" + col + "|" + op, function () { var mm = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide, map: cvwCanvas("dfogT", 128, 64, function (c, W, H) { var g = c.createRadialGradient(W / 2, H / 2, 2, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); }) }); mm.userData.noPhoto = 1; return mm; }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
G.add(m);
return m;
},
function (col) {
return cvwM("cvdFac" + col, function () {
var t = cvwCanvas("cvdFacT", 128, 128, function (c, W, H) {
c.fillStyle = "#E8E8E8";
c.fillRect(0, 0, W, H);
cvwNoise(c, W, H, 900, 0.18, 3, "90,80,70");
var R = wRand(31);
for (var j = 0; j < 2; j++)
for (var i = 0; i < 2; i++) {
var x = i * 64 + 18, y = j * 64 + 12;
c.fillStyle = "#C8C0B4";
c.fillRect(x - 4, y - 4, 36, 48);
var lit = R() < 0.22;
c.fillStyle = lit ? "#D8B060" : "#2A3036";
c.fillRect(x, y, 28, 40);
c.fillStyle = "rgba(200,190,170,.9)";
c.fillRect(x + 13, y, 2, 40);
c.fillRect(x, y + 18, 28, 2);
}
c.fillStyle = "rgba(60,50,40,.35)";
c.fillRect(0, 56, W, 4);
c.fillRect(0, 120, W, 4);
});
var m = new THREE.MeshLambertMaterial({ color: col, map: t });
m.userData.noPhoto = 1;
return m;
});
},
function (G, x, y, z, w, d, h, col, ry) {
var geo = new THREE.BoxGeometry(w, h, d), uv = geo.attributes.uv, dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
for (var f = 0; f < 6; f++)
for (var v = 0; v < 4; v++) {
var i = f * 4 + v;
uv.setXY(i, uv.getX(i) * dims[f][0] / 8, uv.getY(i) * dims[f][1] / 6.8);
}
var roof = cvwLam(0x4A4642), m = new THREE.Mesh(geo, [cvdFacadeM(col), cvdFacadeM(col), roof, roof, cvdFacadeM(col), cvdFacadeM(col)]);
m.position.set(x, y + h / 2, z);
m.rotation.y = ry || 0;
G.add(m);
var vr = Math.abs(Math.round(x * 7.13 + z * 3.71)) % 5, top = h, lite = cvwLite(), ash = cvwMat("ashlar"), P = new THREE.Group();
P.position.set(x, y, z);
P.rotation.y = ry || 0;
G.add(P);
cvwBox(P, w + 1.0, 0.5, d + 1.0, ash, 0, h - 0.2, 0);
cvwBox(P, w + 0.4, 0.35, d + 0.4, ash, 0, h - 0.75, 0);
cvwBox(P, w + 0.3, 0.5, d + 0.3, ash, 0, 3.9, 0);
if (vr === 0) {
cvwBox(P, w, 1.2, 0.5, ash, 0, h + 0.3, -d / 2 + 0.25);
cvwBox(P, w, 1.2, 0.5, ash, 0, h + 0.3, d / 2 - 0.25);
cvwBox(P, 0.5, 1.2, d, ash, -w / 2 + 0.25, h + 0.3, 0);
cvwBox(P, 0.5, 1.2, d, ash, w / 2 - 0.25, h + 0.3, 0);
if (!lite)
for (var pi = 0; pi < 5; pi++)
cvwBox(P, 0.9, 1.8, 0.8, ash, -w / 2 + 0.45 + pi * (w - 0.9) / 4, h + 0.3, -d / 2 + 0.4);
top = h + 1.5;
}
else if (vr === 1) {
var hr = new THREE.Mesh(cvwGeo("cvdHip", function () { var c = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), cvwLam(0x4A4E56));
hr.scale.set(w + 0.6, Math.min(w, d) * 0.32, d + 0.6);
hr.position.y = h + 0.3;
P.add(hr);
}
else if (vr === 2) {
var uw = w * 0.68, ud = d * 0.66;
var um = new THREE.Mesh(cvwBoxG(uw, 4.2, ud), cvdFacadeM(col));
um.position.set(0, h + 2.4, d * 0.08);
P.add(um);
cvwBox(P, uw + 0.7, 0.4, ud + 0.7, ash, 0, h + 4.3, d * 0.08);
top = h + 4.7;
}
else if (vr === 3) {
var pr = new THREE.Mesh(cvwGeo("cvdGable", function () { var sh = new THREE.Shape(); sh.moveTo(-0.5, 0); sh.lineTo(0.5, 0); sh.lineTo(0, 1); sh.lineTo(-0.5, 0); var e = new THREE.ExtrudeGeometry(sh, { depth: 1, bevelEnabled: false }); e.translate(0, 0, -0.5); return e; }), cvwLam(0x8A3A2A));
pr.scale.set(w + 0.6, Math.min(w, d) * 0.36, d + 0.6);
pr.position.y = h + 0.3;
P.add(pr);
}
else {
var lr = new THREE.Mesh(cvwGeo("cvdHip"), cvwLam(0x5A6A62));
lr.scale.set(w * 0.3, 3, d * 0.3);
lr.position.y = h + 0.3;
P.add(lr);
}
if (vr !== 2 && vr !== 4) {
var vm = cvwLam(vr === 1 ? 0x6A6E70 : 0x3A4A3E);
var vb = new THREE.Mesh(cvwBoxG(w - 0.6, 0.18, 3.0), vm);
vb.position.set(0, 3.6, -d / 2 - 1.5);
vb.rotation.x = -0.1;
P.add(vb);
cvwBox(P, w - 0.6, 0.3, 0.12, cvwLam(0xE0D8C0), 0, 3.32, -d / 2 - 3.0);
var np = lite ? 2 : Math.max(3, Math.round(w / 5));
for (var vp = 0; vp < np; vp++)
cvwBox(P, 0.14, 3.4, 0.14, cvwLam(0x2A322C), -w / 2 + 0.6 + vp * (w - 1.2) / (np - 1), 0, -d / 2 - 2.9);
}
cvwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + top + 1, ry || 0);
return m;
},
function (G, x, y, z, w, h, d, ry, lean, i, lite) {
var T = new THREE.Group();
T.position.set(x, y, z);
T.rotation.y = ry;
G.add(T);
var cv = [cvwMat("rlstoneD"), cvwMat("rlstoneD"), cvwMat("ooze"), cvwMat("rlstoneD"), cvwMat("rlcarve"), cvwMat("rlcarve")], cs = [cvwMat("rlcarve"), cvwMat("rlcarve"), cvwMat("ooze"), cvwMat("rlstoneD"), cvdWetStoneM(), cvdWetStoneM()];
var fr = [0.4, 0.27, 0.19, 0.14], yy = 0, ox = 0, n = lite ? 3 : 4;
for (var j = 0; j < n; j++) {
var th = h * fr[j], tw = w * (1 - 0.17 * j), td = d * (1 - 0.14 * j), sg = (i + j) % 2 ? 1 : -1;
var tg = new THREE.Group();
tg.position.set(ox, yy, j * d * 0.03 * sg);
tg.rotation.set(0.04 * sg, 0.12 * j * sg, (lean || 0) * 0.6 + 0.05 * sg);
T.add(tg);
cvwTitan(tg, tw, th, td, 0, 0, 0, 0, { mat: j % 2 ? cs : cv, sx: (lean || 0) + 0.06 * sg, tw: j ? 0.006 * sg : 0, mpt: 10 });
if (!lite || j < 2)
cvwTitan(tg, tw + 2.4, 1.6, td + 2.4, 0, th - 0.8, 0, 0.04 * sg, { mat: cvwMat("rlstoneD") });
yy += th * 0.96;
ox += w * 0.07 * sg;
}
var cr = new THREE.Mesh(cvwGeo("cvdCrown", function () { var c = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); var pa = c.attributes.position; for (var v = 0; v < pa.count; v++)
if (pa.getY(v) > 0.9)
pa.setX(v, pa.getX(v) + 0.35); c.computeVertexNormals(); return c; }), cvwMat("rlstoneD"));
cr.scale.set(w * 0.55, h * 0.22, d * 0.6);
cr.position.set(ox, yy, 0);
cr.rotation.z = -(lean || 0) * 1.5;
T.add(cr);
if (!lite)
[-1, 1].forEach(function (s) { var b = cvwTitan(T, w * 0.16, h * 0.5, d * 0.5, s * (w * 0.5 + h * 0.12), -2, 0, 0, { mat: cv, sx: -s * 0.38, mpt: 10 }); b.rotation.z = -s * 0.08; b.rotation.y = s * 0.18; });
},
function () { return cvwGeo("picket", function () { var parts = []; for (var i = 0; i < 4; i++) {
var b = new THREE.BoxGeometry(0.08, 1.0, 0.04);
b.translate(-0.75 + i * 0.5, 0.5, 0);
parts.push(b.toNonIndexed());
} var r = new THREE.BoxGeometry(2.0, 0.08, 0.05); r.translate(0, 0.75, 0); parts.push(r.toNonIndexed()); r = new THREE.BoxGeometry(2.0, 0.08, 0.05); r.translate(0, 0.3, 0); parts.push(r.toNonIndexed()); return gwMerge(parts); }); },
function () {
return cvwGeo("pbench", function () {
var parts = [];
for (var i = 0; i < 3; i++) {
var b = new THREE.BoxGeometry(1.8, 0.04, 0.11);
b.translate(0, 0.45, -0.14 + i * 0.14);
parts.push(b.toNonIndexed());
}
for (i = 0; i < 3; i++) {
var c = new THREE.BoxGeometry(1.8, 0.1, 0.03);
c.translate(0, 0.6 + i * 0.13, -0.26);
c.rotateX(0);
parts.push(c.toNonIndexed());
}
[-0.82, 0.82].forEach(function (x) { var e = new THREE.BoxGeometry(0.06, 0.45, 0.42); e.translate(x, 0.22, 0); parts.push(e.toNonIndexed()); var k = new THREE.BoxGeometry(0.06, 0.5, 0.05); k.translate(x, 0.7, -0.26); parts.push(k.toNonIndexed()); });
return gwMerge(parts);
});
},
function () {
return cvwM("cvdWetStone", function () {
var t = cvwCanvas("cvdWetT", 256, 512, function (c, W, H) {
c.fillStyle = "#3A5444";
c.fillRect(0, 0, W, H);
cvwNoise(c, W, H, 6000, 0.3, 19, "14,24,16");
for (var r = 0; r < 6; r++) {
var y = 20 + r * 84;
c.fillStyle = "rgba(10,18,12,.55)";
c.fillRect(8, y, W - 16, 4);
c.fillRect(8, y + 60, W - 16, 3);
c.save();
c.translate(14, y + 8);
cvwGlyphDraw(c, W - 28, 48, 200 + r, "rgba(8,14,10,.7)");
c.restore();
}
var R = wRand(23);
for (var i = 0; i < 34; i++) {
var x = R() * W, w = 3 + R() * 10, L = H * (0.2 + R() * 0.6);
var g = c.createLinearGradient(0, 0, 0, L);
g.addColorStop(0, "rgba(70,110,50,.75)");
g.addColorStop(1, "rgba(40,70,30,0)");
c.fillStyle = g;
c.fillRect(x, 0, w, L);
}
for (i = 0; i < 40; i++) {
c.fillStyle = "rgba(170,220,180," + (0.05 + R() * 0.12) + ")";
c.fillRect(R() * W, R() * H, 1 + R() * 2, 8 + R() * 40);
}
});
var m = cvwLite() ? new THREE.MeshLambertMaterial({ color: 0xC8DCC8, map: t }) : new THREE.MeshPhongMaterial({ color: 0xC8DCC8, map: t, shininess: 70, specular: 0x5A7A5A });
m.userData.noPhoto = 1;
return m;
});
},
function (w) {
return cvwGeo("cvdWeed" + w, function () {
var R = wRand(61), pos = [], col = [], idx = [], n = Math.round(w * (cvwLite() ? 2 : 4));
for (var i = 0; i < n; i++) {
var bx = (R() - 0.5) * w, L = 1.5 + R() * 6, wd = 0.15 + R() * 0.3, seg = 6, ph = R() * 6, c0 = [0.16 + R() * 0.08, 0.28 + R() * 0.1, 0.12], c1 = [0.22, 0.2, 0.1], n0 = pos.length / 3;
for (var k = 0; k <= seg; k++) {
var t = k / seg, sw = Math.sin(t * 4 + ph) * 0.12 * t, y = -L * t, hw = wd * (1 - t * 0.7) * 0.5;
pos.push(bx - hw, y, sw, bx + hw, y, sw);
var r = c0[0] + (c1[0] - c0[0]) * t, g = c0[1] + (c1[1] - c0[1]) * t, b = c0[2] + (c1[2] - c0[2]) * t;
col.push(r, g, b, r, g, b);
if (k) {
var o = n0 + (k - 1) * 2;
idx.push(o, o + 2, o + 1, o + 1, o + 2, o + 3);
}
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setIndex(idx);
g.computeVertexNormals();
return g;
});
},
function () {
var S = cvwSc(), k = S.env;
if (CVW.envK && CVW_ENV[CVW.envK])
k = CVW.envK;
if (CVW.night && !CVW.envK)
k = { providence: "provnight", bayou: "swampnight" }[CVW.sc] || k;
if (cvwInRoom()) {
var L = cvwLocalSc(), R = cvwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
var E = {}, B = CVW_ENV[k] || CVW_ENV.prov;
for (var q in B)
E[q] = B[q];
if (cvwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (CVW.moving || CVW.ride)
return true;
var S = cvwSc(), D = CVW_SCN[CVW.sc];
if (!D)
return false;
if (cvwInRoom()) {
if (cvwSolidAt(x, z, feet))
return true;
return cvwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (cvwSolidAt(x, z, feet))
return true;
var fl = cvwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = cvwLand(x, z);
if (hh > feet + 1.3)
return true;
if (feet - hh > 7)
return true;
var w = D.wl ? D.wl(x, z) : null;
if (w !== null && w - hh > 1.1)
return true;
return false;
},
function (dt) {
CVW.t += dt;
if (!CVW.built || !CVW.scG)
return;
var S = cvwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
CVW.inRm = cvwInRoom();
CVW.et = (CVW.et || 0) + dt;
if (CVW.et > 0.8) {
CVW.et = 0;
worldEnv(cvwEnvNow());
}
var flow = CVW.t * 0.03;
CVW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
CVW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (CVW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(CVW.t * 3 + i * 2)) * 0.3; f.rotation.y = CVW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(CVW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(CVW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, CVW.inRm ? -500 : cvwLand(L.x, L.z), L.z);
}
});
(CVW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
(CVW.smoke || []).forEach(function (g) { g.children.forEach(function (m, i) { m.position.x += Math.sin(CVW.t * 0.1 + i) * dt * 0.4; m.rotation.y += dt * 0.02; }); });
CVW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return cvwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof cvbTick === "function")
try {
cvbTick(dt, L);
}
catch (e) {
if (!CVW.e1) {
CVW.e1 = 1;
if (window.console)
console.warn("[cthulhu-void] book", e);
}
}
if (!CVW.bannerBook)
worldBanner("<b>🐙 " + CVW_NAME + "</b> · " + esc(cvwPlaceName(L)) + (CVW.night ? " · night" : ""));
CVW.pt = (CVW.pt || 0) + dt;
if (CVW.pt < 0.15)
return;
CVW.pt = 0;
if (CVW.moving || CVW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
CVW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof cvbTalk === "function" && cvbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
CVW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : cvwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof cvbSpot === "function")
cvbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof cvbIdlePrompt === "function")
cvbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = cvwAtPt(opt.at) || (typeof cvbStartAt === "function" && cvbStartAt()) || cvwAtPt("provIn");
try {
cvwCrxKinds();
if (typeof crxWarm === "function" && !cvwLite())
crxWarm(["horse"]);
}
catch (e) { }
cvwScene(A.sc);
var S = CVW_SC[A.sc], y = A.y != null ? A.y : cvwGround(A.x, A.z);
camera.position.set(CVW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
CVW.moving = false;
CVW.ride = null;
CVW.inRm = cvwInRoom();
worldEnv(cvwEnvNow());
setStatus("🐙 <b>" + CVW_NAME + ".</b> Lovecraft's story, the whole of it, dreamed out of the Void: Providence, the Louisiana swamp, Sydney, Oslo, the South Pacific and R'lyeh. <b>Press E</b> for the book.");
if (typeof cvbEnter === "function")
try {
cvbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[cthulhu-void] enter", e);
}
},
function () {
cvwSceneDrop();
for (var k in CVW.mats) {
var m = CVW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in CVW.tex) {
var x = CVW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in CVW_GEO) {
try {
CVW_GEO[g].dispose();
}
catch (e) { }
}
CVW.mats = {};
CVW.tex = {};
CVW_GEO = {};
CVW.built = false;
CVW.G = null;
CVW.lights = 0;
},
function (P, n, sp) {
var lite = cvwLite();
n = lite ? Math.round(n * 0.5) : n;
var pos = new Float32Array(n * 3), R = wRand(77);
for (var i = 0; i < n; i++) {
pos[i * 3] = (R() - 0.5) * 60;
pos[i * 3 + 1] = R() * 40;
pos[i * 3 + 2] = (R() - 0.5) * 60;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var m = new THREE.PointsMaterial({ color: 0xFFFFFF, size: lite ? 0.14 : 0.1, transparent: true, opacity: 0.85, depthWrite: false });
var p = new THREE.Points(g, m);
p.frustumCulled = false;
p.userData.kind = "snowfall";
p.userData.sp = sp || 1.4;
P.add(p);
CVW.fx.push(p);
return p;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = CVW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = CVW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: CVW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return cvbPos(at.at);
var C = CVB_CH[cvbS().ch], i = cvbS().s, c = C && C.cast ? C.cast.filter(function (d) { return cvbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? cvbPos(c.at) : null;
}
if (at.spot) {
var Sp = CVW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: CVW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return cvbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || CVW.sc, x: at.x, z: at.z, y: at.y };
return null;
},
function (P, L) {
var dx = P.x - L.x, dz = P.z - L.z, d = Math.hypot(dx, dz);
if (d < 2)
return "right here";
var a = Math.atan2(-dx, -dz) - yaw;
while (a > Math.PI)
a -= Math.PI * 2;
while (a < -Math.PI)
a += Math.PI * 2;
var w = Math.abs(a) < 0.4 ? "ahead" : Math.abs(a) > 2.6 ? "behind you" : a > 0 ? (a < 1.6 ? "ahead, to your left" : "to your left, behind") : (a > -1.6 ? "ahead, to your right" : "to your right, behind");
var up = P.y != null && Math.abs(P.y - (camera.position.y - 1.72)) > 10 ? (P.y > camera.position.y ? " (up above)" : " (down below)") : "";
return (d >= 1000 ? (d / 1000).toFixed(1) + " km " : Math.round(d) + " m ") + w + up;
},
function () {
if (CVB.beam && CVB.beam.parent === CVW.scG)
return CVB.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xE8FFD8, transparent: true, opacity: 0.11, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xD8FFC8, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF8D8, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
CVW.scG.add(g);
CVB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return cvwLam(c); }, m;
switch (kind) {
case "load":
m = cvwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
cvwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = cvwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = cvwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = cvwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = cvwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
break;
case "fruit":
m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), M(0xE8A030));
m.position.y = 0.1;
g.add(m);
break;
case "egg":
m = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), M(0xE8E0C8));
m.scale.y = 1.3;
m.position.y = 0.2;
g.add(m);
break;
case "bone":
m = cvwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
cvwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = cvwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
cvwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), cvwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = cvwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "paper":
m = cvwBox(g, 0.34, 0.03, 0.46, M(0xE8E2D0), 0, 0.02, 0);
cvwBox(g, 0.3, 0.005, 0.08, M(0x2A2A2A), 0, 0.04, -0.16);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M(0xC8945A));
m.scale.set(1.5, 0.8, 1);
m.position.y = 0.1;
g.add(m);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 10), cvwShine(0x1A3A1A, 0.2, 0));
m.position.y = 0.15;
g.add(m);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 8), cvwShine(0x1A3A1A, 0.2, 0));
nk.position.y = 0.35;
g.add(nk);
break;
case "tin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), cvwShine(0xA8A8A0, 0.4, 0.6));
m.position.y = 0.05;
g.add(m);
break;
case "coin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 12), cvwShine(0xE8C060, 0.3, 0.9));
m.position.y = 0.01;
g.add(m);
break;
case "spade":
m = cvwBox(g, 0.05, 0.05, 1.0, M(0x6A4A2A), 0, 0.03, 0);
cvwBox(g, 0.2, 0.02, 0.26, cvwShine(0x8A8A88, 0.4, 0.7), 0, 0.02, 0.6);
break;
case "post":
m = cvwBox(g, 0.08, 1.1, 0.08, M(0xE8E0CC), 0, 0, 0);
break;
case "skin":
m = cvwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = cvwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = cvwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
cvwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = cvwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
cvwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), M(0xC8904A));
m.scale.set(1.4, 0.7, 1);
m.position.y = 0.08;
g.add(m);
break;
case "berries":
for (var bi = 0; bi < 6; bi++) {
var be = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), M(0x6A1A3A));
be.position.set((bi % 3 - 1) * 0.06, 0.04, (bi > 2 ? 1 : -1) * 0.04);
g.add(be);
}
m = g.children[0];
break;
case "acorn":
for (var ai = 0; ai < 4; ai++) {
var ac = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5), M(0x8A6A3A));
ac.position.set((ai - 1.5) * 0.07, 0.04, 0);
g.add(ac);
}
m = g.children[0];
break;
case "root":
m = cvwBox(g, 0.3, 0.06, 0.06, M(0x9A7A5A), 0, 0.03, 0);
break;
case "lantern":
m = cvwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), cvwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = cvwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
cvwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), cvwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), cvwMat("glass"));
m.position.y = 0.08;
g.add(m);
cvwCyl(g, 0.02, 0.02, 0.1, cvwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = cvwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = cvwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
cvwFire(g, 0, 0.08, 0, 0.4);
break;
case "idol":
m = cvwIdol(0.12);
g.add(m);
break;
case "chain":
m = cvwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
break;
default:
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), M(0xE8E0D0));
m.position.y = 0.12;
g.add(m);
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.3;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P || !CVW.scG || P.sc !== CVW.sc)
return null;
var g = cvbItemMesh(kind), y = P.y != null ? P.y : cvwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
CVW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = cvwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (CVB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = CVW.spots.indexOf(I.S); if (j >= 0)
CVW.spots.splice(j, 1); CVB.items = CVB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.cvb = 1;
CVB.items.push(I);
return I;
},
function (k) {
if (CVB.tuneKey === k)
return;
CVB.tuneKey = k;
var old = CVB.tune;
CVB.tune = null;
if (old) {
var o = old, f = setInterval(function () { try {
o.volume = Math.max(0, o.volume - 0.04);
if (o.volume <= 0.01) {
o.pause();
clearInterval(f);
}
}
catch (e) {
clearInterval(f);
} }, 80);
}
if (!k || !CVB_TUNES[k])
return;
try {
var A = new Audio(CVB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
CVB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (CVB.tune !== A) {
clearInterval(fi);
return;
}
A.volume = Math.min(v, A.volume + 0.03);
if (A.volume >= v)
clearInterval(fi);
}
catch (e) {
clearInterval(fi);
} }, 90);
}
catch (e) { }
},
function (fn) {
if (CVB.text)
return fn(CVB.text);
if (CVB.textWait) {
CVB.textWait.push(fn);
return;
}
CVB.textWait = [fn];
var done = function (B) { CVB.text = B; var w = CVB.textWait; CVB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/cthulhu/cthulhu.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
cvbText(function (B) {
var C = CVB_CH[i], T = cvbSec(B, C);
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + cvbNum(i) + ". " + esc(C.t) + "</h3>" + CVB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(cvbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); CVB.readOpen = 0; CVB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = cvbS(), C = CVB_CH[S.ch];
if (!C)
return;
CVB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
CVB.readAsk = 0;
CVB.readOpen = 1;
var T = cvbSec(B, C);
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "The Call of Cthulhu") + "</div><h3 style='margin:4px 0'>" + cvbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? cvbOpening(T).map(cvbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); CVB.readOpen = 0; cvbStepDone(); }, all: function () { cvbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read these pages whole", "Lovecraft's own words, all of this part");
b += cvbKeeperBtns(fns);
worldCard(b, fns);
};
cvbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
CVB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); cvbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = cvbS(), C = CVB_CH[S.ch];
if (!C)
return;
cvbItemsClear();
cvbCastClear();
CVB.hold = 0;
var go = function () { cvbWorldState(); cvbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[cvb] setup", S.ch, e);
} cvbTune(C.tune || null); cvbStepBegin(); };
if (place && C.start) {
var P = cvbPos(C.start);
if (P && WLD.on === CVW_KEY) {
cvwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (CVW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = cvbStep();
cvbItemsClear();
CVB.hold = 0;
CVB.puzOpen = 0;
if (!b)
return;
b._key = cvbKey();
cvbWorldState();
try {
if (b.on)
b.on(cvbS().f);
}
catch (e) {
if (window.console)
console.warn("[cvb] on", e);
}
if (b.k === "read") {
cvbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { CVB.rew[k] = 0; });
if (b.k === "find") {
var Pf = cvbPos(b.at);
if (Pf && Pf.sc === CVW.sc)
cvbItemAdd(b.item, Pf, b.name, b.verb, function () { if (cvbKey() === b._key)
cvbStepDone(); });
}
if (b.k === "gather") {
var P = cvbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(cvbS().ch * 97 + cvbS().s * 13 + 7);
CVB.got = 0;
if (P && P.sc === CVW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = cvwGround(Q.x, Q.z, (P.y != null ? P.y : cvwLand(P.x, P.z)) + 1);
cvbItemAdd(b.item, Q, b.name, b.verb, function () { if (cvbKey() !== b._key)
return; CVB.got++; try {
if (b.each)
b.each(CVB.got);
}
catch (e) { } if (CVB.got < n) {
cvbSay((b.eachSay || "Got one.") + " " + CVB.got + " of " + n + ".");
return;
} cvbStepDone(); });
}
}
if (b.h)
cvbSay("<b>" + esc(CVB_CH[cvbS().ch].t) + ".</b> " + b.h);
},
function (b) {
CVB.puzOpen = 1;
CVB.puzT = performance.now();
var k = cvbKey(), fns = {}, h = CVB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
cvbSay(b.yes);
if (cvbKey() === k)
cvbStepDone();
return;
}
cvbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (cvbKey() === k)
CVB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = cvbS(), C = CVB_CH[S.ch], b = cvbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[cvb] done", e);
}
if (b.say)
cvbSay(b.say);
S.s++;
if (window.CVB_LOG)
CVB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= CVB_CH.length - 1) {
S.done = 1;
S.s = 0;
cvbSave();
cvbItemsClear();
cvbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
cvbSave();
var nx = CVB_CH[S.ch];
setTimeout(function () { try {
cvbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[cvb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
cvbSave();
cvbStepBegin();
},
function () {
cvbTune("end");
var S = cvbS();
var b = "<h3 style='margin:4px 0'>The tin box is shut</h3><p style='font-style:italic'>" + cvQ("What has risen may sink, and what has sunk may rise.") + "</p><p style='font-size:12px;opacity:.75'>H. P. Lovecraft, The Call of Cthulhu (1928), 3. The Madness from the Sea</p><p>You have opened Professor Angell's box, heard Wilcox tell his dream of the city of green stone, sat through his fever, read the dreamers' letters; stood in St. Louis while Legrasse unwrapped his idol, waded the swamp to the ring of fire, heard old Castro whisper; found the Sydney Bulletin under the stones at Paterson, followed it to Dunedin, Sydney and Oslo; sailed with Johansen on the Emma and the Alert, climbed R'lyeh, seen the great door open and what came out of it, and lived through the storm of April 2nd. The city has sunk once more. Your keepsakes:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; cvbSave(); cvbChapterBegin(true); } };
b += worldBtn("again", "Dream it again from the start", "Professor Angell's house in Williams Street, Providence");
fns.void = function () { worldCard(null); cvbBackToVoid(); };
b += worldBtn("void", "🌑 Wake in the Void", "Back to the carved stone and the Lamplighter's light");
if (typeof bhnOpen === "function") {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen("cthulhu"); };
}
worldCard(b, fns);
},
function (c) {
var C = CVB.cast[c.key || c.k];
if (cvbCastLive(C))
return C;
var P = cvbPos(c.at);
if (!P || P.sc !== CVW.sc)
return null;
var F = CVW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute, name: c.name };
var Pp;
if (F.name && !c.dress)
Pp = cvwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = cvwDressed("cvb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : cvwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
CVW.scG.add(g);
Pp = { g: g, y: y, o: {} };
CVW.people.push(Pp);
if (c.name && !c.mute)
cvwTalk(Pp, c.name, cvwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
CVB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return CVB.cast[c.key || c.k];
},
function () {
var C = CVB_CH[cvbS().ch];
if (!C || !C.cast)
return;
var idx = cvbS().s;
var on = {};
C.cast.forEach(function (c) { var key = c.key || c.k; if (!(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until) && !on[key])
on[key] = c; });
C.cast.forEach(function (c) {
var key = c.key || c.k, want = on[key], have = CVB.cast[key];
if (!want) {
if (have)
cvbCastHide(key);
return;
}
if (want !== c)
return;
if (have && have.c && have.c !== c)
cvbCastHide(key);
if (!cvbCastLive(CVB.cast[key]))
cvbCastAdd(c);
});
},
function () {
var b = cvbStep(), key = "pass", have = CVB.cast[key];
var want = b && b.k === "talk" && b.at && b.at.at ? b : null, P = want ? cvbPos(want.at.at) : null;
if (!want || !P || P.sc !== CVW.sc) {
if (have)
cvbCastHide(key);
return;
}
if (have && have.b === want && cvbCastLive(have))
return;
if (have)
cvbCastHide(key);
if (!want.pass && CVW.talk.some(function (T) { return T.name === want.who && T.p && T.p.g && T.p.g.parent; }))
return;
var pa = want.pass || {}, nm = String(want.who), fem = /woman|lady|girl|wife|Mrs|Miss|mother|maid/i.test(nm), kid = pa.child || /boy|girl|child/i.test(nm);
var dr = pa.dress || (/police|officer|constable|patrolman/i.test(nm) ? "cvpolice" : (/squatter/i.test(nm) ? (fem ? "cvsquatterf" : "cvsquatter") : (/sailor|seaman|boatman|captain|mate|stoker|wharf/i.test(nm) ? "cvsailor" : (fem ? (kid ? "girl" : "lady") : (kid ? "boy" : (/porter|labourer|carter|docker|cabman|driver/i.test(nm) ? "worker" : "gent"))))));
var Pp = cvwOne("pass" + cvbS().ch + "_" + cvbS().s, want.who, pa.sex || (fem ? "f" : "m"), dr, P.x, P.z, pa.ry || 0, pa.greet || "", { y: P.y, child: !!kid, persona: CVP.townfolk });
if (Pp)
CVB.cast[key] = { g: Pp.g, P: Pp, c: { k: key }, b: want };
},
function () {
if (!CVW.scG)
return;
cvbCastClear();
var S = cvbS(), C = CVB_CH[S.ch];
if (S.started && !S.done && C && C.cast && cvbCastHere(C)) {
cvbCastTick();
return;
}
(CVB_FOLK_AT[CVW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = cvwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
CVB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!cvbActive())
return false;
var b = cvbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = cvbKey();
worldPrompt(null);
var next = function () { if (cvbKey() === k)
cvbStepDone(); };
if (b.card) {
var fns = { go: function () { worldCard(null); if (b.act) {
try {
b.act(next);
}
catch (e) {
next();
}
}
else
next(); } };
worldCard(CVB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
return true;
}
if (b.act) {
try {
b.act(next);
}
catch (e) {
next();
}
return true;
}
next();
return true;
},
function (dt, L) {
CVB.wt += dt;
if (CVB.wt > 0.5) {
CVB.wt = 0;
if (cvbActive() && cvbCastHere(CVB_CH[cvbS().ch]))
cvbCastTick();
if (cvbActive())
cvbPassTick();
var S0 = cvbS();
S0.seen[CVW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!cvbActive()) {
if (CVB.beam)
CVB.beam.visible = false;
CVW.bannerBook = false;
return;
}
var S = cvbS(), b = cvbStep(), t = CVW.t, feet = camera.position.y - 1.72;
CVB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? cvbPos(b.at) : null, here = P && P.sc === CVW.sc, bm = cvbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + cvbScName(P.sc) + ": press E for the book)";
if (here && !CVW.moving && !CVW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : cvwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = cvbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !CVW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (CVB.readAsk)
break;
if (!CVB.readOpen)
cvbChapterCard();
else {
CVB.readOpen = 0;
cvbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
cvbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
CVB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(CVB.hold, dt);
}
catch (e) { }
if (CVB.hold >= (b.sec || 8)) {
cvbStepDone();
return;
}
}
else
CVB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return CVB.rew[k]; })) {
cvbStepDone();
return;
}
break;
case "until": {
var ok = false;
try {
ok = b.test(S.f, dt);
}
catch (e) { }
if (ok) {
cvbStepDone();
return;
}
break;
}
case "puzzle":
if ((!CVB.puzOpen || performance.now() - (CVB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
cvbPuzzleCard(b);
break;
}
}
var C = CVB_CH[S.ch], prog = b && b.k === "hold" && CVB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - CVB.hold)) + " s)" : b && b.k === "gather" ? " (" + (CVB.got || 0) + " of " + (b.n || 3) + ")" : "";
CVW.bannerBook = true;
worldBanner("⚡ <b>" + cvbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = cvbS(), C = CVB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>H. P. Lovecraft · The Call of Cthulhu (1928), the whole story</div><h3 style='margin:4px 0'>🐙 The Call of Cthulhu</h3>";
if (S.done)
b += "<p>You have dreamed the whole story. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + cvbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((cvbStep() || {}).h || "") + "</p>";
var st = cvbStep(), P = st && st.at ? cvbPos(st.at) : null, Cs = cvbPos(C.start);
var to = P && P.sc !== CVW.sc ? P : (!P && Cs && Cs.sc !== CVW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + cvbScName(to.sc), "The dream takes you where the papers go next");
fns.there = function () { worldCard(null); cvwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { cvbPopulate(); cvbStepBegin(); }); };
}
}
else
b += "<p>Out of the Void, a dream that is not yours: the papers Francis Wayland Thurston left in a tin box. Providence, the winter of 1926-27: a professor of ninety-two is dead on a steep hill street, and among his papers is a locked box. The whole story, every page of its three parts, played: Professor Angell's box and the bas-relief, Wilcox's dreams and fever, St. Louis in 1908 and the swamp in 1907, old Castro, the Sydney Bulletin, Dunedin, Sydney and Oslo, Johansen's voyage, R'lyeh and the great door, and the storm of April 2nd. About three and a half hours at your own pace, with puzzles; your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Williams Street, Providence, the winter of 1926-27", S.started ? "Back to where you were" : "\"The most merciful thing in the world, I think, is the inability of the human mind to correlate all its contents.\"");
fns.go = function () { worldCard(null); cvbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; cvbSave(); cvbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(CVW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(CVW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (CVW_SCN[k].start || { x: 0, z: 0 }); cvwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, cvbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += cvbKeeperBtns(fns);
worldCard(b, fns);
},
function (st, s) {
var v = function (k) { return cvbStV(st[k]); }, reb = false;
Object.keys(CVW.st).forEach(function (k) { if (!(k in st) && CVW.st[k] != null && CVW.st[k] !== false) {
delete CVW.st[k];
if (CVW_LIVEK.indexOf(k) < 0)
reb = true;
} });
Object.keys(st).forEach(function (k) { if (k === "env" || k === "night" || k === "nightUntil" || k === "nightFrom")
return; var nv = v(k); if (CVW.st[k] !== nv) {
CVW.st[k] = nv;
if (CVW_LIVEK.indexOf(k) < 0)
reb = true;
} });
if (typeof cvwLiveState === "function")
try {
cvwLiveState();
}
catch (e) { }
if (reb && !CVW.rebuilding && CVW.scBuilt) {
CVW.rebuilding = 1;
try {
cvwRebuild();
}
catch (e) { }
CVW.rebuilding = 0;
}
},
function (o) {
o = o || {};
var g = new THREE.Group(), lite = !!o.lite, R = wRand(o.seed || 4747), s = o.s || 1;
var M = function (c, e) { return new THREE.MeshLambertMaterial({ color: c, emissive: e || 0x000000, fog: !!o.fog }); };
var stone = M(CV_LOOK.stone, 0x0A120E), dark = M(CV_LOOK.stoneD, 0x05080A), ooze = M(CV_LOOK.ooze, 0x0C160C);
var pts = [];
for (var i = 0; i <= 10; i++) {
var t = i / 10;
pts.push(new THREE.Vector2(Math.max(0.01, (1 - t * t) * 260 * s), t * 80 * s));
}
var mound = new THREE.Mesh(new THREE.LatheGeometry(pts, lite ? 10 : 18), dark);
g.add(mound);
var n = lite ? 16 : 42;
for (var b = 0; b < n; b++) {
var a = R() * 6.283, r = (20 + R() * 210) * s, h = (1 - Math.pow(r / (262 * s), 2)) * 80 * s;
var w = (10 + R() * 30) * s, hh = (10 + R() * 44) * s, d = (10 + R() * 26) * s, geo = new THREE.BoxGeometry(w, hh, d), pa = geo.attributes.position, sx = (R() - 0.5) * 0.5;
for (var v = 0; v < pa.count; v++) {
var ty = (pa.getY(v) + hh / 2) / hh;
pa.setX(v, pa.getX(v) + sx * ty * hh);
}
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, R() < 0.3 ? ooze : (R() < 0.5 ? stone : dark));
m.position.set(Math.cos(a) * r, h + hh * 0.4, Math.sin(a) * r);
m.rotation.set((R() - 0.5) * 0.2, R() * 6.283, (R() - 0.5) * 0.2);
g.add(m);
}
var mono = new THREE.Mesh(new THREE.BoxGeometry(30 * s, 180 * s, 26 * s), stone);
mono.position.set(0, 80 * s + 86 * s, -10 * s);
mono.rotation.set(0.05, 0.2, -0.07);
g.add(mono);
var cap = new THREE.Mesh(new THREE.BoxGeometry(44 * s, 16 * s, 36 * s), dark);
cap.position.set(-6 * s, 80 * s + 176 * s, -14 * s);
cap.rotation.set(0.04, 0.6, -0.1);
g.add(cap);
var door = new THREE.Mesh(new THREE.BoxGeometry(34 * s, 30 * s, 2 * s), M(0x0A0E0C));
door.position.set(0, 80 * s + 12 * s, 6 * s);
door.rotation.x = -0.6;
g.add(door);
var hz = cvwCanvas("rlFarHaze", 256, 64, function (c, W, H) { var gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "rgba(122,216,168,0)"); gr.addColorStop(0.6, "rgba(90,150,110,.28)"); gr.addColorStop(1, "rgba(60,90,70,0)"); c.fillStyle = gr; c.fillRect(0, 0, W, H); });
var hm = new THREE.MeshBasicMaterial({ map: hz, transparent: true, depthWrite: false, fog: false, side: THREE.DoubleSide });
hm.userData.noPhoto = 1;
for (var k = 0; k < (lite ? 2 : 4); k++) {
var p = new THREE.Mesh(new THREE.PlaneGeometry(620 * s, 70 * s), hm);
p.position.set(0, 24 * s + k * 10 * s, 40 * s - k * 30 * s);
p.rotation.y = (k - 1.5) * 0.12;
g.add(p);
}
g.userData.keep = 1;
return g;
},
function (g) {
var st = cvwMat("rlstone"), dk = cvwMat("rlstoneD");
[[6, 0.4, 4.6], [4.6, 0.4, 3.4], [3.4, 0.35, 2.4]].forEach(function (d, i) { var m = new THREE.Mesh(new THREE.BoxGeometry(d[0], d[1], d[2]), i % 2 ? st : dk); m.position.y = 0.2 + i * 0.4; g.add(m); });
var face = cvwM("voidStoneF", function () {
var t = cvwCanvas("voidStoneT", 256, 384, function (c, W, H) { c.fillStyle = "#26342C"; c.fillRect(0, 0, W, H); cvwNoise(c, W, H, 3000, 0.3, 4, "10,16,12"); c.save(); c.translate(W * 0.1, H * 0.06); cvwFigureDraw(c, W * 0.8, H * 0.5, { ink: "rgba(6,10,8,.85)", hi: "rgba(140,220,170,.22)", glyphs: false }); c.restore(); c.save(); c.translate(14, H * 0.6); cvwGlyphDraw(c, W - 28, H * 0.34, 71, "rgba(6,10,8,.8)"); c.restore(); });
var m = new THREE.MeshLambertMaterial({ color: 0xC8D8C8, map: t, emissive: 0x0E2418 });
m.userData.noPhoto = 1;
return m;
});
var slab = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.0, 0.7), [st, st, cvwMat("ooze"), st, face, dk]);
slab.position.set(0, 1.15 + 2.0, 0);
slab.rotation.set(-0.08, 0, 0.05);
g.add(slab);
for (var i = 0; i < 5; i++) {
var o = new THREE.Mesh(new THREE.SphereGeometry(0.14 + i * 0.02, 8, 6), cvwMat("ooze"));
o.scale.set(1, 2.4, 0.6);
o.position.set(-1.1 + i * 0.55, 1.3 + ((i * 7) % 5) * 0.5, 0.38);
g.add(o);
}
if (typeof wGlow === "function") {
var gl = wGlow(CV_LOOK.glow, 5, 0.22);
gl.position.set(0, 3.2, 0.9);
g.add(gl);
}
},
function (g, s, i) {
var w = 2.2 * s, h = 1.6 * s, d = 1.8 * s, geo = new THREE.BoxGeometry(w, h, d), pa = geo.attributes.position;
for (var v = 0; v < pa.count; v++) {
var t = (pa.getY(v) + h / 2) / h;
pa.setX(v, pa.getX(v) + (i % 2 ? 0.3 : -0.25) * t * h);
}
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, [cvwMat("rlstone"), cvwMat("rlstone"), cvwMat("ooze"), cvwMat("rlstoneD"), cvwMat("rlcarve"), cvwMat("rlcarve")]);
m.position.y = h * 0.4;
m.rotation.set(0.1 * (i % 3 - 1), 0, 0.12 * (i % 2 ? 1 : -1));
g.add(m);
},
function (g) {
var face = cvwM("voidStoneF2", function () {
var t = cvwCanvas("voidMarkT", 128, 384, function (c, W, H) { c.fillStyle = "#26342C"; c.fillRect(0, 0, W, H); cvwNoise(c, W, H, 1500, 0.3, 6, "10,16,12"); cvwGlyphDraw(c, W, H, 33, "rgba(6,10,8,.85)"); });
var m = new THREE.MeshLambertMaterial({ color: 0xC8D8C8, map: t, emissive: 0x0E2418 });
m.userData.noPhoto = 1;
return m;
});
var b = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 1.2), cvwMat("rlstoneD"));
b.position.y = 0.2;
g.add(b);
var p = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.6, 0.6), [cvwMat("rlstone"), cvwMat("rlstone"), cvwMat("ooze"), cvwMat("rlstone"), face, face]);
p.position.y = 1.7;
p.rotation.z = 0.06;
g.add(p);
if (typeof wGlow === "function") {
var gl = wGlow(CV_LOOK.glow, 2.6, 0.25);
gl.position.set(0, 2.2, 0.5);
g.add(gl);
}
},
function (g, o, pts, ox, oz) {
var R = wRand(7373), list = [], lite = cvwLite(), dense = [];
for (var i = 1; i < pts.length; i++) {
var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uz = (b[1] - a[1]) / L;
for (var u = 0; u < L; u += 1.15)
dense.push([a[0] + ux * u, a[1] + uz * u, Math.atan2(ux, uz)]);
}
dense.forEach(function (p, k) {
if (lite && k > 70)
return;
[-0.72, 0.72].forEach(function (sd, j) {
if (R() < 0.06)
return;
var ry = p[2], lx = p[0] + Math.cos(ry) * sd, lz = p[1] - Math.sin(ry) * sd;
var x = lx - ox, z = lz - oz;
list.push({ x: x, z: z, y: (o && o.y ? o.y(x, z) : 0) + 0.1, ry: ry + (R() - 0.5) * 0.12, rz: (R() - 0.5) * 0.05, sx: 1.3 + R() * 0.12, sy: 1, sz: 1.0 + R() * 0.12 });
});
});
var m = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.16, 1), cvwMat("rlstone"), list.length), d = new THREE.Object3D();
list.forEach(function (t, i) { d.position.set(t.x, t.y, t.z); d.rotation.set(0, t.ry, t.rz); d.scale.set(t.sx, t.sy, t.sz); d.updateMatrix(); m.setMatrixAt(i, d.matrix); });
m.instanceMatrix.needsUpdate = true;
m.receiveShadow = true;
g.add(m);
if (typeof wGlow === "function") {
var gl = wGlow(CV_LOOK.glow, 6, 0.12);
gl.position.set(0 - ox, 1.0, 2 - oz);
g.add(gl);
}
return false;
},
function (g, i) {
var st = cvwMat("rlstone"), dk = cvwMat("rlstoneD"), tall = i % 2 ? 1 : 0, h = tall ? 3.6 + (i % 3) * 0.8 : 1.4 + (i % 3) * 0.4;
var base = new THREE.Mesh(cvwGeo("vpBase", function () { return new THREE.BoxGeometry(1.5, 0.4, 1.5); }), dk);
base.position.y = 0.2;
base.rotation.z = 0.03 * (i % 3 - 1);
g.add(base);
var sh = new THREE.Mesh(cvwGeo("vpShaft" + h.toFixed(1), function () { var c = new THREE.CylinderGeometry(0.5, 0.58, h, cvwLite() ? 8 : 14, 4), pa = c.attributes.position; for (var v = 0; v < pa.count; v++) {
var x = pa.getX(v), z = pa.getZ(v), y = pa.getY(v), an = Math.atan2(z, x), f = 1 - 0.07 * Math.pow(Math.abs(Math.cos(an * cvwLiteN(4, 7))), 3);
if (y > h / 2 - 0.01)
y += Math.cos(an) * 0.45 - 0.3;
pa.setXYZ(v, x * f, y, z * f);
} c.computeVertexNormals(); return c; }), st);
sh.position.y = 0.4 + h / 2;
sh.rotation.z = (i % 2 ? 0.06 : -0.09);
sh.castShadow = !cvwLite();
g.add(sh);
var dr = new THREE.Mesh(cvwGeo("vpDrum", function () { return new THREE.CylinderGeometry(0.5, 0.5, 1.1, cvwLite() ? 8 : 12); }), st);
dr.rotation.set(Math.PI / 2, 0, 0.5 + i);
dr.position.set(i % 2 ? 1.3 : -1.2, 0.45, 0.6);
g.add(dr);
},
function () {
return cvwM("voidGlyphM", function () {
var t = cvwCanvas("voidGlyphT", 128, 128, function (c, W, H) { c.fillStyle = "#1E2A24"; c.fillRect(0, 0, W, H); cvwNoise(c, W, H, 700, 0.3, 4, "8,14,10"); cvwGlyphDraw(c, W, H, 61, "rgba(150,240,170,.95)"); });
var e = cvwCanvas("voidGlyphE", 128, 128, function (c, W, H) { c.fillStyle = "#000"; c.fillRect(0, 0, W, H); cvwGlyphDraw(c, W, H, 61, "rgba(120,230,150,1)"); });
var m = new THREE.MeshLambertMaterial({ map: t, emissive: 0x8AF0AA, emissiveMap: e, emissiveIntensity: 1.8 });
m.userData.noPhoto = 1;
return m;
});
},
function (g, i) {
var gm = cvwVoidGlyphM();
var dk = cvwMat("rlstoneD"), m = new THREE.Mesh(cvwGeo("vgStone", function () { var b = new THREE.BoxGeometry(1.3, 0.9, 0.5), pa = b.attributes.position; for (var v = 0; v < pa.count; v++)
if (pa.getY(v) > 0)
pa.setX(v, pa.getX(v) + 0.18); b.computeVertexNormals(); return b; }), [dk, dk, dk, dk, gm, dk]);
m.position.y = 0.4;
m.rotation.x = -0.25;
m.rotation.z = 0.05 * ((i % 3) - 1);
g.add(m);
if (typeof wGlow === "function") {
var gl = wGlow(CV_LOOK.glow, 3.2, 0.3);
gl.position.set(0, 0.8, 0.6);
g.add(gl);
}
cvwVoidPool(g, 0, 0.5, 3.6, 0.8);
},
function (g, x, z, r, op) {
var m = cvwM("voidPoolM" + op, function () {
var t = cvwCanvas("voidPoolT", 128, 128, function (c, W, H) { var gr = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); gr.addColorStop(0, "rgba(120,240,150,1)"); gr.addColorStop(0.35, "rgba(80,200,110,.55)"); gr.addColorStop(1, "rgba(40,120,60,0)"); c.fillStyle = gr; c.fillRect(0, 0, W, H); });
var mm = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 });
mm.userData.noPhoto = 1;
return mm;
});
var d = new THREE.Mesh(cvwGeo("voidPoolG", function () { var c = new THREE.CircleGeometry(1, 24); c.rotateX(-Math.PI / 2); return c; }), m);
d.scale.set(r, 1, r);
d.position.set(x, 0.04, z);
d.renderOrder = 2;
g.add(d);
return d;
},
function (g, lite, near) {
var n = near ? (lite ? 40 : 140) : (lite ? 60 : 260), R = wRand(near ? 9192 : 9191), pos = new Float32Array(n * 3);
for (var i = 0; i < n; i++) {
var t = R();
if (near) {
pos[i * 3] = (R() - 0.5) * 16;
pos[i * 3 + 1] = 0.3 + R() * 3;
pos[i * 3 + 2] = 12 - R() * 26;
continue;
}
pos[i * 3] = -6 + t * 34 * (R() < 0.5 ? 1 : -0.4) + (R() - 0.5) * 10;
pos[i * 3 + 1] = 0.4 + R() * 3.6;
pos[i * 3 + 2] = 40 - t * 100 + (R() - 0.5) * 8;
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var tex = cvwCanvas("voidMoteT", 32, 32, function (c, W, H) { var gr = c.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, "rgba(200,255,210,1)"); gr.addColorStop(0.4, "rgba(140,230,160,.5)"); gr.addColorStop(1, "rgba(80,200,120,0)"); c.fillStyle = gr; c.fillRect(0, 0, W, H); });
var pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: lite ? 0.5 : 0.45, map: tex, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending, color: 0x9AF0B0 }));
pts.frustumCulled = false;
g.add(pts);
pts.onBeforeRender = function () { var t = performance.now() / 1000; pts.position.y = Math.sin(t * 0.25) * 0.35; pts.rotation.y = Math.sin(t * 0.05) * 0.03; };
},
function (g, s) {
var dk = cvwMat("rlstoneD"), gm = cvwVoidGlyphM(), st = cvwMat("rlstone");
var b = new THREE.Mesh(cvwGeo("vgPostB", function () { return new THREE.BoxGeometry(1.4, 0.5, 1.4); }), dk);
b.position.y = 0.25;
g.add(b);
var p = new THREE.Mesh(cvwGeo("vgPost", function () { var bb = new THREE.BoxGeometry(1.0, 5.4, 1.0, 1, 4, 1), pa = bb.attributes.position; for (var v = 0; v < pa.count; v++) {
var t = (pa.getY(v) + 2.7) / 5.4;
pa.setX(v, pa.getX(v) * (1 - 0.18 * t) + 0.22 * t);
pa.setZ(v, pa.getZ(v) * (1 - 0.12 * t));
} bb.computeVertexNormals(); return bb; }), [st, st, dk, dk, gm, gm]);
p.position.y = 3.2;
p.rotation.z = -s * 0.05;
p.scale.x = s;
g.add(p);
cvwVoidPool(g, 0, 0, 2.6, 0.4);
if (typeof wGlow === "function") {
var gl = wGlow(CV_LOOK.glow, 2.4, 0.22);
gl.position.set(0, 3, 0.7);
g.add(gl);
}
},
function (g) {
var dk = cvwMat("rlstoneD"), st = cvwMat("rlstone"), gm = cvwM("voidGlyphM");
var l = new THREE.Mesh(cvwGeo("vgLintel", function () { var bb = new THREE.BoxGeometry(7.6, 1.0, 1.3), pa = bb.attributes.position; for (var v = 0; v < pa.count; v++)
if (pa.getY(v) > 0)
pa.setX(v, pa.getX(v) * 1.08 + 0.3); bb.computeVertexNormals(); return bb; }), [dk, dk, st, dk, gm, gm]);
l.position.set(0.1, 6.2, 0);
l.rotation.z = 0.07;
l.rotation.y = 0.05;
g.add(l);
var c = new THREE.Mesh(cvwGeo("vgCap", function () { return new THREE.BoxGeometry(3.2, 0.9, 1.0); }), st);
c.position.set(-0.6, 7.0, 0.1);
c.rotation.z = -0.12;
g.add(c);
var c2 = new THREE.Mesh(cvwGeo("vgCap2", function () { var cc = new THREE.ConeGeometry(0.7, 1.4, 4); cc.rotateY(Math.PI / 4); return cc; }), dk);
c2.position.set(1.6, 7.5, 0);
c2.rotation.z = 0.3;
g.add(c2);
},
function (g, w, h, i) {
var st = cvwMat("rlstone"), dk = cvwMat("rlstoneD"), n = Math.max(2, Math.round(w / 1.6)), R = wRand(611 + i);
for (var k = 0; k < n; k++) {
var hh = h * (0.45 + R() * 0.55) * (k === 0 || k === n - 1 ? 0.7 : 1), bw = w / n;
var m = new THREE.Mesh(cvwGeo("vwB" + bw.toFixed(1), function () { return new THREE.BoxGeometry(bw * 0.98, 1, 0.8); }), k % 2 ? dk : st);
m.scale.y = hh;
m.position.set(-w / 2 + bw * (k + 0.5), hh / 2, (R() - 0.5) * 0.12);
m.rotation.z = (R() - 0.5) * 0.06;
g.add(m);
}
var f = new THREE.Mesh(cvwGeo("vwFall", function () { return new THREE.BoxGeometry(1.2, 0.7, 0.8); }), dk);
f.position.set(w * 0.2, 0.3, 1.0);
f.rotation.set(0.3, 0.6, 0.2);
g.add(f);
},
function (g) {
var st = cvwMat("rlstone"), dk = cvwMat("rlstoneD");
for (var k = 0; k < 5; k++) {
var m = new THREE.Mesh(cvwGeo("vsStep", function () { return new THREE.BoxGeometry(3.6, 0.45, 1.0); }), k % 2 ? dk : st);
m.position.set(0, 0.22 + k * 0.45, 1.8 - k * 0.8);
m.rotation.y = k * 0.04;
m.rotation.z = (k % 2 ? 0.03 : -0.02);
g.add(m);
}
var land = new THREE.Mesh(cvwGeo("vsLand", function () { return new THREE.BoxGeometry(3.8, 2.4, 1.6); }), dk);
land.position.set(0.2, 1.2, -2.2);
land.rotation.z = 0.06;
g.add(land);
var pl = new THREE.Mesh(cvwGeo("vsPier", function () { return new THREE.BoxGeometry(0.8, 2.2, 0.8); }), st);
pl.position.set(-1.6, 3.3, -2.4);
pl.rotation.z = 0.14;
g.add(pl);
},
function (g, lite) {
var R = wRand(4747), fung = [], reeds = [];
var side = function (z) { return z > -60 ? 0 : (-60 - z) * 0.6; }, oz = 26;
for (var i = 0; i < (lite ? 40 : 130); i++) {
var z = 12 - R() * 80, s = R() < 0.5 ? -1 : 1, x = side(z) + s * (2.1 + R() * 5);
if (Math.abs(x - side(z)) < 2)
continue;
var cl = 1 + Math.floor(R() * (lite ? 2 : 4));
for (var c = 0; c < cl; c++)
fung.push([x + (R() - 0.5) * 0.8, z + (R() - 0.5) * 0.8, 0.5 + R() * 0.9, R() * 6]);
}
for (i = 0; i < (lite ? 14 : 44); i++) {
var zr = 10 - R() * 76, sr = R() < 0.5 ? -1 : 1;
reeds.push([side(zr) + sr * (3 + R() * 6), zr, 0.7 + R() * 0.6, R() * 6]);
}
var fm = cvwM("voidFungM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xDCE8D0, emissive: 0x5A8A6A, emissiveIntensity: 0.7 }); m.userData.noPhoto = 1; return m; });
var fg = cvwGeo("voidFungG", function () { var cap = new THREE.SphereGeometry(0.16, cvwLite() ? 6 : 10, 5, 0, Math.PI * 2, 0, Math.PI * 0.5); cap.scale(1, 0.55, 1); cap.translate(0, 0.26, 0); var st = new THREE.CylinderGeometry(0.035, 0.05, 0.27, 6); st.translate(0, 0.135, 0); return gwMerge([cap.toNonIndexed(), st.toNonIndexed()]); });
var im = new THREE.InstancedMesh(fg, fm, fung.length), d = new THREE.Object3D();
fung.forEach(function (f, k) { d.position.set(f[0], 0, f[1] + oz); d.rotation.set(0, f[3], (f[2] - 1) * 0.2); d.scale.setScalar(f[2]); d.updateMatrix(); im.setMatrixAt(k, d.matrix); });
im.instanceMatrix.needsUpdate = true;
g.add(im);
var rm = cvwM("voidReedM", function () { var m = new THREE.MeshLambertMaterial({ vertexColors: true, color: 0x2A2E2C, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
var ri = new THREE.InstancedMesh(cvwReedClumpGeo(), rm, reeds.length);
reeds.forEach(function (r, k) { d.position.set(r[0], 0, r[1] + oz); d.rotation.set(0, r[3], 0); d.scale.setScalar(r[2]); d.updateMatrix(); ri.setMatrixAt(k, d.matrix); });
ri.instanceMatrix.needsUpdate = true;
g.add(ri);
for (i = 0; i < fung.length; i += lite ? 8 : 5)
cvwVoidPool(g, fung[i][0], fung[i][1] + oz, 1.3, 0.28);
}
];
});
