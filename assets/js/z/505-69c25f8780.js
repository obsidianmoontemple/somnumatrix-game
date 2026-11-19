/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(505, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (IMW.tex[k])
return IMW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = imwLite();
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
return (IMW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (IMW.mats[k])
return IMW.mats[k];
var own = name.slice(0, 2) === "b:", map = imwPhotoTex(name, mpt || 2), m;
if (imwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = imwPhotoTex(name, mpt || 2, true);
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
return (IMW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return imwM(k, function () {
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
return imwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return imwCanvas("bamboo", 64, 256, function (x, W, H) {
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
imwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return imwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return imwCanvas("tuft", 128, 64, function (x, W, H) {
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
return imwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return imwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
imwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return imwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = IMW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / IMW_CELL) + "," + Math.floor(z / IMW_CELL)];
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
p = dlnPerson("imw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("imw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || IMW.scG || IMW.G).add(p);
var P = { g: p, y: y, o: o };
IMW.people.push(P);
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
IMW.inst.push(m);
try {
m.computeBoundingSphere && m.computeBoundingSphere();
}
catch (e) { }
return m;
},
function (P, pts, w, hfn, mat, lift) {
if (hfn) {
var rs = [pts[0]];
for (var q = 1; q < pts.length; q++) {
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (imwLite() ? 8 : 4)));
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
var lite = imwLite(), leaf = imwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
imwInst(P, imwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), imwMat("pale"), list, { shadow: !lite });
imwInst(P, imwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), imwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
imwInst(P, imwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), imwMat("bark"), list, { shadow: !lite });
imwInst(P, imwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), imwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
imwInst(P, imwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), imwMat("darkbark"), list, { shadow: !lite });
imwInst(P, imwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), imwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
imwInst(P, imwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), imwMat("bark"), list, { shadow: !lite });
imwInst(P, imwGeo("pfronds", function () { var g = imwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), imwLam(0xFFFFFF, { ds: 1, map: imwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
imwInst(P, imwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), imwMat("darkbark"), list, {});
imwInst(P, imwGeo("mfronds", function () { return imwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), imwLam(0xFFFFFF, { ds: 1, map: imwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
imwInst(P, imwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), imwMat("darkbark"), list, {});
imwInst(P, imwGeo("ffronds", function () { return imwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), imwLam(0xFFFFFF, { ds: 1, map: imwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
imwInst(P, imwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), imwMat("darkbark"), list, {});
imwInst(P, imwGeo("cyf", function () { return imwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), imwLam(0xFFFFFF, { ds: 1, map: imwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
imwInst(P, imwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), imwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: imwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
imwInst(P, imwGeo("bamL", function () { return imwCards(3, 2.6, 2.2, 5.4); }), imwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
imwInst(P, imwGeo("reed" + kind, function () { return imwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), imwLam(0xFFFFFF, { ds: 1, map: imwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
imwInst(P, imwGeo("tuft", function () { return imwCards(2, 1.6, 0.7, 0); }), imwLam(o.col || 0xFFFFFF, { ds: 1, map: imwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
imwInst(P, imwGeo("flw", function () { return imwCards(2, 0.9, 0.7, 0); }), imwLam(0xFFFFFF, { ds: 1, map: imwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
imwInst(P, imwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), imwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
imwInst(P, imwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || imwMat("rock"), list, {});
break;
}
case "cactus": {
imwInst(P, imwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), imwLam(0x4A7A3A), list, {});
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
function (kind, col) { return imwM("skinM" + kind + (col || ""), function () { var t = imwSkinTex(kind); t.repeat.set(2, 2); var m = imwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = imwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(imwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = imwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(imwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
imwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return imwGeo(k, function () {
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
var t = imwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), imwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || imwS("b:stucco", o.col || 0xF0E2C8, 3), trim = imwLam(0xFAF6EE), sh = imwLam(o.shut || 0x3A6A4A), glass = imwShine(0x1A2228, 0.2, 0.3);
imwBox(g, w, h, d, wall, 0, 0, 0);
imwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
imwBox(g, w + 0.12, 0.5, d + 0.12, imwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(imwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || imwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
imwBox(g, 1.3, 2.6, 0.12, imwMat("oak"), wx, 0, d / 2 + 0.02);
imwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = imwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = imwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!imwLite())
[-1, 1].forEach(function (s) { imwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
imwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
imwBox(g, 0.05, 0.9, 0.05, imwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
imwBox(g, 1.8, 0.05, 0.05, imwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
imwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (IMW.scG) {
if (IMW.scG.parent)
IMW.scG.parent.remove(IMW.scG);
IMW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
IMW.scG = null;
IMW.solids = [];
IMW.sgrid = null;
IMW.floors = [];
IMW.spots = [];
IMW.talk = [];
IMW.people = [];
IMW.beasts = [];
IMW.fx = [];
IMW.water = [];
IMW.inst = [];
IMW.hgt = null;
IMW.scBuilt = null;
IMW.rooms = [];
IMW.doors = [];
IMW.lights = 0;
IMW.ticks = [];
IMW.tripods = [];
IMW.handlers = [];
IMW.smoke = [];
IMW.live = null;
if (typeof imbSceneDrop === "function")
try {
imbSceneDrop();
}
catch (e) { }
},
function (k) {
if (IMW.scBuilt === k && IMW.scG)
return;
imwSceneDrop();
var D = IMW_SCN[k], S = IMW_SC[k];
if (!D || !S || !IMW.G)
return;
IMW.sc = k;
IMW.scG = new THREE.Group();
IMW.scG.position.x = S.x;
IMW.G.add(IMW.scG);
IMW.hgt = D.h || function () { return 0; };
try {
D.build(IMW.scG);
}
catch (e) {
if (window.console)
console.warn("[invisible-man] scene", k, e);
}
IMW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
IMW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = imwAtPt(at);
if (!A)
return;
var v = imwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
IMW.moving = true;
setTimeout(function () {
if (WLD.on !== IMW_KEY) {
v.style.opacity = "0";
IMW.moving = false;
return;
}
imwScene(A.sc);
var S = IMW_SC[A.sc], y = A.y != null ? A.y : imwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(IMW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(imwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; IMW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(imwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), imwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; IMW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(imwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), imwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(imwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), imwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(imwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), imwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!imwLite() && typeof THREE.PointLight === "function" && (IMW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
IMW.lights = (IMW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
IMW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("imw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("imw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = IMW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : imwGround(x, z, o.feet != null ? o.feet : 500);
var g = F.voice ? imwVoiceG() : imwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
if (F.head)
imwGriffinHead(g);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || IMW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
IMW.people.push(P);
if (!o.mute)
imwTalk(P, o.name || F.name, imwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = imwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = imwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: [0x141414, 0x3A2A1A, 0x6A4A2A, 0x8A7A6A, 0xB8A060][Math.floor(R() * 5)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
var y = o.y != null ? o.y : imwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || IMW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
IMW.people.push(P);
imwTalk(P, L[0], L[4] || o.persona || IMP.townfolk, L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, dress, x, z, ry, greet, o) {
o = o || {};
var g = imwDressed(seed, dress, { sex: sex, child: !!o.child, beard: o.beard, hair: o.hair, skin: o.skin });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : imwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || IMW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
IMW.people.push(P);
if (name)
imwTalk(P, name, o.persona || IMP.townfolk, greet || "Good day.", o.r || 3.0);
return P;
},
function (g) {
var H = new THREE.Group();
H.position.set(0, 1.6, 0);
g.add(H);
var band = new THREE.Mesh(imwGeo("gfHead", function () { return new THREE.SphereGeometry(0.115, 14, 12); }), imwLam(0xF4F0E6));
band.scale.set(1, 1.18, 1.08);
band.position.y = 0.06;
H.add(band);
[-0.045, 0.045].forEach(function (x) { var e = new THREE.Mesh(imwGeo("gfLens", function () { return new THREE.CylinderGeometry(0.034, 0.034, 0.02, 14); }), imwShine(0x1E3A6A, 0.2, 0.6)); e.rotation.x = Math.PI / 2; e.position.set(x, 0.08, 0.11); H.add(e); });
var br = new THREE.Mesh(imwGeo("gfBridge", function () { return new THREE.BoxGeometry(0.03, 0.006, 0.006); }), imwLam(0x2A2A2A));
br.position.set(0, 0.085, 0.12);
H.add(br);
var nose = new THREE.Mesh(imwGeo("gfNose", function () { return new THREE.SphereGeometry(0.022, 10, 8); }), imwShine(0xE8909A, 0.3, 0));
nose.scale.set(1, 1, 1.3);
nose.position.set(0, 0.04, 0.125);
H.add(nose);
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(imwGeo("gfWhisk", function () { return new THREE.BoxGeometry(0.02, 0.07, 0.04); }), imwLam(0x3A2A1A)); w.position.set(k * 0.1, 0.02, 0.04); H.add(w); });
var brim = new THREE.Mesh(imwGeo("gfBrim", function () { return new THREE.CylinderGeometry(0.2, 0.2, 0.012, 20); }), imwLam(0x1E1A16));
brim.position.y = 0.17;
H.add(brim);
var crown = new THREE.Mesh(imwGeo("gfCrown", function () { return new THREE.CylinderGeometry(0.1, 0.115, 0.1, 16); }), imwLam(0x1E1A16));
crown.position.y = 0.22;
H.add(crown);
return H;
},
function (k) {
switch (k) {
case "plaster": return imwS("plaster", 0xF0EAD8, 4);
case "render": return imwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return imwS("b:stucco", 0xE8CC98, 3);
case "rose": return imwS("b:stucco", 0xE8C0B0, 3);
case "grey": return imwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return imwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return imwS("stone", 0xC8C0B0, 2.4);
case "greystone": return imwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return imwS("b:limestone", 0x6A6660, 4);
case "brick": return imwS("brick", 0xB87A5E, 1.6);
case "slate": return imwS("b:slate", 0x5A5E68, 2);
case "tile": return imwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return imwS("shingle", 0x7A5A44, 2);
case "thatch": return imwThatchM();
case "oak": return imwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return imwS("b:oak", 0x4A3020, 1.4);
case "floor": return imwS("b:oak", 0xA87A50, 1.8);
case "planks": return imwS("b:planks", 0x9A8060, 2);
case "deck": return imwS("b:deck", 0xB8A07A, 2);
case "hull": return imwS("b:planks", 0x4A3A2A, 2);
case "damask": return imwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return imwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return imwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return imwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return imwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return imwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return imwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return imwLam(0xEDE6D6);
case "beams": return imwS("b:oak", 0x5A3E26, 1.4);
case "brass": return imwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return imwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return imwShine(0xC87A4A, 0.35, 0.85);
case "glass": return imwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return imwShine(0x26323A, 0.15, 0.3);
case "earth": return imwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return imwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return imwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return imwS("paving", 0xC8C0B0, 2.4);
case "cobble": return imwS("b:cotto", 0x9A9088, 1.2);
case "setts": return imwS("paving", 0x8A8478, 2.4);
case "gravel": return imwS("sand", 0x9A8C72, 3);
case "sand": return imwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return imwS("b:strata", 0x8A847A, 6);
case "darkrock": return imwS("b:strata", 0x5A5650, 7);
case "granite": return imwS("b:limestone", 0x9A948C, 5);
case "moss": return imwS("b:moss", 0x7A9A5A, 3);
case "bark": return imwS("bark", 0x8A7A64, 2.5);
case "darkbark": return imwS("bark", 0x5A4E40, 3);
case "birch": return imwS("bark", 0xE8E4DA, 2);
case "slush": return imwS("sand", 0xC4BCB0, 3);
case "snowroof": return imwS("snow", 0xB8BEC6, 3);
case "snow": return imwS("snow", 0xD0D6DE, 5, { vc: 1 });
case "snowwall": return imwS("snow", 0xF0F4FA, 3);
case "ice": return imwM("icem", function () { var m = imwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: imwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: imwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return imwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return imwLam(0xE8DCC4, { ds: 1 });
case "sail": return imwLam(0xE8E0CC, { ds: 1 });
case "rope": return imwLam(0x8A7A5A);
}
return imwS("earth", 0x8A7058, 5);
},
function () {
return imwM("thatch", function () {
var t = imwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
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
var y = IMW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = imwMat(o.wall || "plaster"), fl = imwMat(o.floor || "floor");
imwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
imwBox(g, w, 0.1, d, o.ceil ? imwMat(o.ceil) : imwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = 1.2;
imwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
imwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
imwBox(g, dw, h - 2.3, 0.2, wall, 0, 2.3, q[1]);
imwBox(g, dw, 2.3, 0.08, imwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
imwBox(g, 0.06, 0.06, 0.04, imwMat("brass"), 0.42, 1.0, q[1] - 0.12);
}
else
imwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
imwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
imwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = imwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { imwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { imwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
imwBox(g, 0.18, 0.22, d - 0.2, imwMat("beams"), b, h - 0.22, 0);
imwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
imwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
imwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
imwSolid(cx - (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
imwSolid(cx + (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
imwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
IMW.rooms.push(R);
if (o.light !== false && !imwLite() && (IMW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
IMW.lights = (IMW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
imwSpot(ox, oz, 1.8, name, "go in", function () { imwGo({ sc: IMW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + imEsc(R.name) + ".</b>"); if (typeof imbNote === "function")
imbNote("in:" + R.key); });
imwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { imwGo({ sc: IMW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof imbNote === "function")
imbNote("out:" + R.key); }, R.y);
IMW.doors.push(R);
return R;
},
function (fromKey, toKey, lx, lz, name, verb) {
var A = IMW.rooms.filter(function (r) { return r.key === fromKey; })[0], B = IMW.rooms.filter(function (r) { return r.key === toKey; })[0];
if (!A || !B)
return;
var x = A.cx + lx, z = A.cz + lz;
B.out = { x: x, z: z, ry: Math.PI, inner: fromKey };
imwSpot(x, z, 1.5, name, verb || "go through", function () { imwGo({ sc: IMW.sc, x: B.cx, z: B.z1 - 1.2, y: B.y, ry: 0 }, "🚪 <b>" + imEsc(B.name) + ".</b>"); if (typeof imbNote === "function")
imbNote("in:" + B.key); }, A.y);
imwSpot(B.cx, B.z1 - 0.6, 1.4, "Back to " + A.name, "go", function () { imwGo({ sc: IMW.sc, x: x, z: z + 1.2, y: A.y, ry: 0 }, null); if (typeof imbNote === "function")
imbNote("out:" + B.key); }, B.y);
IMW.doors.push(B);
return B;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = imwMat(o.mat || "oak");
imwBox(g, w, 0.06, d, o.cloth ? imwLam(o.cloth) : wd, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { imwBox(g, 0.07, h - 0.06, 0.07, wd, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = imwMat(o.mat || "oak");
imwBox(g, 0.46, 0.05, 0.44, o.seat ? imwMat(o.seat) : wd, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { imwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.19); });
imwBox(g, 0.46, 0.5, 0.04, wd, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { imwBox(g, 0.05, 0.22, 0.42, wd, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = imwMat(o.mat || "oak");
imwBox(g, 1.1, 0.4, 2.0, wd, 0, 0, 0);
imwBox(g, 1.04, 0.18, 1.94, imwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
imwBox(g, 0.8, 0.12, 0.36, imwLam(0xF4F0E8), 0, 0.58, -0.7);
imwBox(g, 1.1, 0.9, 0.06, wd, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { imwBox(g, 0.07, 1.9, 0.07, wd, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = imwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
imwBox(g, w, h, 0.06, wd, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { imwBox(g, 0.05, h, 0.36, wd, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
imwBox(g, w, 0.04, 0.36, wd, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(imwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? imwMat("glass") : imwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
imwBox(g, bw, bh, 0.24, imwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
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
var st = imwMat(o.mat || "ashlar");
imwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
imwBox(g, 1.0, 0.8, 0.52, imwLam(0x141210), 0, 0, 0.02);
imwBox(g, 2.0, 0.1, 0.6, imwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
imwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = imwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
imwCyl(g, 0.2, 0.16, 0.26, imwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
imwCyl(g, 0.06, 0.07, 0.03, imwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
imwCyl(g, 0.018, 0.018, 0.16, imwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(imwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), imwGlowM(0xFFD070, 0.9));
f.position.y = 0.215;
g.add(f);
var gl = wGlow(0xFFC860, 0.25, 0.35);
gl.position.y = 0.22;
g.add(gl);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = imwTable(P, x, z, o.w || 2.4, o.d || 0.8, 0.92, { ry: ry, mat: "darkoak" });
var R = wRand(Math.round(x * 13 + z * 7));
for (var i = 0; i < (o.n || 6); i++) {
var px = -((o.w || 2.4) / 2) + 0.25 + i * (((o.w || 2.4) - 0.5) / Math.max(1, (o.n || 6) - 1)), k = i % 4;
if (k === 0) {
var fl = new THREE.Mesh(imwGeo("flask", function () { return new THREE.SphereGeometry(0.1, 12, 10); }), imwMat("glass"));
fl.position.set(px, 1.02, 0);
g.add(fl);
imwCyl(g, 0.025, 0.025, 0.16, imwMat("glass"), px, 1.08, 0, 8);
var liq = new THREE.Mesh(imwGeo("liq", function () { return new THREE.SphereGeometry(0.075, 10, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), imwLam([0x8A3A2A, 0x3A6A8A, 0x6A8A3A][i % 3], { op: 0.75 }));
liq.position.set(px, 1.02, 0);
g.add(liq);
}
else if (k === 1) {
var rt = new THREE.Mesh(imwGeo("retort", function () { return new THREE.SphereGeometry(0.09, 12, 10); }), imwMat("glass"));
rt.position.set(px, 1.0, 0);
g.add(rt);
var nk = new THREE.Mesh(imwGeo("retn", function () { var c = new THREE.CylinderGeometry(0.012, 0.03, 0.4, 8); c.rotateZ(1.1); return c; }), imwMat("glass"));
nk.position.set(px + 0.16, 1.1, 0);
g.add(nk);
}
else if (k === 2) {
imwCyl(g, 0.07, 0.05, 0.12, imwLam(0xC8B8A0), px, 0.92, 0, 10);
imwCyl(g, 0.12, 0.12, 0.02, imwMat("iron"), px, 0.92, 0, 12);
}
else {
for (var t = 0; t < 3; t++)
imwCyl(g, 0.012, 0.012, 0.22, imwMat("glass"), px - 0.05 + t * 0.05, 0.92, 0.1, 6);
imwBox(g, 0.2, 0.04, 0.06, imwMat("darkoak"), px, 0.92, 0.1);
}
}
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), imwM("rug" + col, function () {
var t = imwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
imwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
var t = imwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
imwBox(g, w + 0.12, h + 0.12, 0.04, imwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), imwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), imwGlowM(col));
m.position.z = 0.02;
g.add(m);
imwBox(g, w + 0.16, 0.08, 0.12, imwMat("oak"), 0, -h / 2 - 0.04, 0.04);
imwBox(g, 0.05, h, 0.06, imwMat("oak"), 0, -h / 2, 0.05);
imwBox(g, w, 0.04, 0.06, imwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { imwBox(g, 0.05, h, 0.06, imwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : imwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = imwMat(o.wall || "render"), trim = imwMat(o.trim || "ashlar"), sh = imwLam(o.shut || 0x4A6A4A), pane = imwMat("pane"), lite = imwLite();
imwBox(g, w, h, d, wall, 0, 0, 0);
imwBox(g, w + 0.1, 0.6, d + 0.1, imwMat("greystone"), 0, 0, 0);
imwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = imwMat(o.roof || "tile");
var rf = new THREE.Mesh(imwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
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
imwBox(g, 0.7, rh * 0.9, 0.7, imwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); imwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); imwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
imwBox(g, 1.2, 2.4, 0.1, imwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
imwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
imwBox(g, 1.6, 0.14, 0.6, imwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
imwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
imwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
imwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { imwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
imwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = imwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = imwMat(o.wall || "ashlar"), roof = imwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
imwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(imwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { imwBox(g, 0.12, 5, 1.6, imwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); imwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
imwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
imwBox(g, T + 0.4, 0.4, T + 0.4, imwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), imwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = imwBox(g, 0.08, 0.9, 0.04, imwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = imwBox(g, 0.06, 1.1, 0.04, imwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(imwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), imwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(imwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || imwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
imwBox(g, 2.2, 3.6, 0.2, imwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
imwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var tz = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
imwSolid(x + tx, z + tz, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = imwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
imwBox(P, seg + 0.2, h, 2, st, mx, imwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
imwBox(P, 1.2, 0.8, 2, st, cx, imwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = imwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
imwInst(P, imwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), imwMat("darkbark"), list, { shadow: !lite });
imwInst(P, imwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), imwM("firM" + (o.snow ? "s" : ""), function () {
var t = imwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
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
var lite = imwLite();
imwInst(P, imwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), imwMat("birch"), list, {});
imwInst(P, imwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), imwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: imwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = imwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || imwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
var cap = new THREE.Mesh(geo, imwMat("snowwall"));
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
var hull = imwMat(o.hull || "hull");
var h = new THREE.Mesh(imwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
imwBox(g, 1.5, 0.06, 0.3, imwMat("planks"), 0, 0.38, -0.6);
imwBox(g, 1.5, 0.06, 0.3, imwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = imwBox(g, 0.05, 0.05, 2.6, imwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
imwCyl(g, 0.04, 0.05, 3.4, imwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), imwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : imwLand(x, z), w = o.w || 9, d = o.d || 8, h = o.h || 6.4, lite = imwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var brick = imwS("brick", o.brick || 0xB86A4E, 1.4), trim = imwLam(0xF2EEE2), stone = imwMat("ashlar"), pane = imwMat("pane"), slate = imwMat("slate");
imwBox(g, w, h, d, brick, 0, 0, 0);
imwBox(g, w + 0.12, 0.5, d + 0.12, imwMat("darkstone"), 0, 0, 0);
imwBox(g, w + 0.2, 0.16, d + 0.2, stone, 0, 3.1, 0);
imwBox(g, w + 0.3, 0.2, d + 0.3, trim, 0, h - 0.2, 0);
var rh = o.rh || 3.2;
var rf = new THREE.Mesh(imwGeo("hip" + w + "|" + d + "|" + rh, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.8, rh, d + 0.8); return c; }), slate);
rf.position.y = h;
g.add(rf);
[-1, 1].forEach(function (s) { imwBox(g, 0.9, rh + 1.8, 0.6, brick, s * w * 0.3, h, 0); imwCyl(g, 0.12, 0.12, 0.5, imwLam(0xA85A3A), s * w * 0.3 - 0.2, h + rh + 1.8, 0, 8); imwCyl(g, 0.12, 0.12, 0.5, imwLam(0xA85A3A), s * w * 0.3 + 0.2, h + rh + 1.8, 0, 8); });
var bx = -w * 0.22;
imwBox(g, 3.2, h - 0.6, 1.2, brick, bx, 0, d / 2 + 0.6);
var br = imwBox(g, 3.6, 0.5, 1.6, slate, bx, h - 0.6, d / 2 + 0.6);
br.rotation.x = -0.25;
[0.9, 4.0].forEach(function (wy) { imwBox(g, 2.6, 1.7, 0.06, trim, bx, wy, d / 2 + 1.22); imwBox(g, 2.4, 1.5, 0.06, pane, bx, wy + 0.1, d / 2 + 1.25); imwBox(g, 0.06, 1.5, 0.08, trim, bx - 0.8, wy + 0.1, d / 2 + 1.27); imwBox(g, 0.06, 1.5, 0.08, trim, bx + 0.8, wy + 0.1, d / 2 + 1.27); });
var dx = w * 0.25;
imwBox(g, 1.1, 2.4, 0.08, imwLam(o.door || 0x2A3A2A), dx, 0.2, d / 2 + 0.04);
imwBox(g, 1.6, 0.14, 1.2, trim, dx, 2.8, d / 2 + 0.6);
[-1, 1].forEach(function (s) { imwBox(g, 0.1, 2.6, 0.1, trim, dx + s * 0.7, 0.2, d / 2 + 1.1); });
imwBox(g, 1.6, 0.2, 1.0, stone, dx, 0, d / 2 + 0.6);
imwBox(g, 0.5, 0.05, 0.4, imwLam(0xC8B080), dx + 0.3, 1.6, d / 2 + 0.08);
var win = function (wx, wy, zz, rot) { var q = new THREE.Group(); q.position.set(wx, wy, zz); q.rotation.y = rot; g.add(q); imwBox(q, 1.1, 1.7, 0.06, trim, 0, 0, 0); imwBox(q, 0.9, 1.5, 0.06, pane, 0, 0.1, 0.02); imwBox(q, 1.3, 0.12, 0.2, stone, 0, -0.06, 0.06); imwBox(q, 1.2, 0.16, 0.12, stone, 0, 1.7, 0.03); };
win(dx, 4.0, d / 2 + 0.02, 0);
[-w * 0.25, w * 0.2].forEach(function (wx) { win(wx, 0.9, -d / 2 - 0.02, Math.PI); win(wx, 4.0, -d / 2 - 0.02, Math.PI); });
[-1, 1].forEach(function (s) { win(s * (w / 2 + 0.02), 4.0, 0, s * Math.PI / 2); });
if (o.garden !== false) {
var gz = d / 2 + (o.gd || 6);
imwBox(g, w + 4, 0.7, 0.3, brick, 0, 0, gz);
imwBox(g, w + 4.2, 0.1, 0.4, stone, 0, 0.7, gz);
imwBox(g, 1.2, 0.05, gz - d / 2 - 0.6, imwMat("gravel"), dx, 0.02, (gz + d / 2) / 2 + 0.3);
if (!lite)
imwPlant(P, "bush", [{ x: x + Math.cos(o.ry || 0) * (-w * 0.4) + Math.sin(o.ry || 0) * (d / 2 + 3), z: z - Math.sin(o.ry || 0) * (-w * 0.4) + Math.cos(o.ry || 0) * (d / 2 + 3), y: y, s: 0.9, ry: 0 }], { col: 0x2E4A26, keepAll: true });
}
imwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
g.userData.door = { x: dx, z: d / 2 + 1.6 };
return g;
},
function (P, x, z, n, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : imwLand(x, z), sw = o.sw || 6, d = o.d || 9, h = o.h || 8.6;
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var names = o.names || ["GROCER", "BUTCHER", "DRAPER", "CHEMIST", "IRONMONGER", "BAKER", "TOBACCONIST", "NEWSAGENT", "BOOTMAKER", "POST OFFICE"], cols = [0x2A3A5A, 0x5A1E1E, 0x2A4A2A, 0x3A2A1A, 0x4A3A5A, 0x1E3A3A], R = wRand(Math.round(x * 3 + z));
var brick = imwS("brick", 0xA86048, 1.4), slate = imwMat("slate"), trim = imwLam(0xF2EEE2), pane = imwMat("pane");
for (var i = 0; i < n; i++) {
var cx = -((n - 1) * sw) / 2 + i * sw, c = cols[Math.floor(R() * cols.length)], ht = h + (i % 3) * 0.4;
imwBox(g, sw - 0.05, ht, d, brick, cx, 0, 0);
var rf = new THREE.Mesh(imwGeo("shr" + sw + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.3, 0); s.lineTo(0, 2.6); s.lineTo(d / 2 + 0.3, 0); s.lineTo(-d / 2 - 0.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false }); e.translate(0, 0, -sw / 2); e.rotateY(Math.PI / 2); return e; }), slate);
rf.position.set(cx, ht, 0);
g.add(rf);
imwBox(g, sw - 0.3, 3.3, 0.12, imwLam(c), cx, 0, d / 2 + 0.04);
imwBox(g, sw - 1.6, 2.3, 0.06, pane, cx - 0.5, 0.5, d / 2 + 0.12);
imwBox(g, 1.0, 2.4, 0.08, imwLam(0x1E1A16), cx + sw / 2 - 0.9, 0, d / 2 + 0.12);
imwSign(g, o.names ? names[i % names.length] : names[Math.floor(R() * names.length)], sw - 0.6, 0.62, cx, 3.0, d / 2 + 0.2, 0, { bg: "#" + c.toString(16).padStart(6, "0"), ink: "#F0D890" });
if (!imwLite()) {
var aw = imwBox(g, sw - 0.4, 0.06, 1.6, imwLam([0xC8B080, 0x8A3A2A, 0x3A5A3A][i % 3], { ds: 1 }), cx, 2.7, d / 2 + 0.8);
aw.rotation.x = 0.3;
}
[0, 1].forEach(function (f) { for (var k = -1; k <= 1; k += 2) {
imwBox(g, 1.0, 1.6, 0.06, trim, cx + k * sw * 0.22, 4.2 + f * 2.4, d / 2 + 0.03);
imwBox(g, 0.8, 1.4, 0.06, pane, cx + k * sw * 0.22, 4.3 + f * 2.4, d / 2 + 0.06);
} });
}
imwSolid(x, z, n * sw, d, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, pts, hfn) {
var lite = imwLite();
imwStrip(P, pts, 7, hfn, imwMat("gravel"), 0.12);
var sl = [], rl = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (lite ? 1.6 : 0.8));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
[-1.6, 1.6].forEach(function (o) { sl.push({ x: x + Math.cos(ry) * o, z: z - Math.sin(ry) * o, y: hfn(x, z) + 0.16, ry: ry }); });
}
[-2.32, -0.88, 0.88, 2.32].forEach(function (o) { var m = new THREE.Mesh(imwGeo("rail", function () { return new THREE.BoxGeometry(0.08, 0.14, 1); }), imwMat("iron")); var mx = (a[0] + b[0]) / 2 + Math.cos(ry) * o, mz = (a[1] + b[1]) / 2 - Math.sin(ry) * o; m.position.set(mx, hfn(mx, mz) + 0.3, mz); m.rotation.y = ry; m.scale.z = L; P.add(m); });
}
imwInst(P, imwGeo("sleeper", function () { return new THREE.BoxGeometry(2.4, 0.14, 0.26); }), imwMat("darkoak"), sl, {});
},
function (P, x, z, len, name, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : imwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
imwBox(g, 6, 1.0, len, imwMat("paving"), 0, 0, 0);
imwBox(g, 6.1, 0.12, len, imwMat("ashlar"), 0, 1.0, 0);
for (var i = 0; i < Math.floor(len / 6); i++) {
var cz = -len / 2 + 3 + i * 6;
imwCyl(g, 0.1, 0.12, 4, imwLam(0x2A4A3A), 1.6, 1, cz, 8);
}
var cn = imwBox(g, 5, 0.1, len * 0.7, imwLam(0xD8D0C0, { ds: 1 }), 0.6, 5.0, 0);
cn.rotation.z = 0.12;
imwBox(g, 0.2, 0.4, len * 0.7, imwLam(0x2A4A3A), 3, 4.8, 0);
imwBox(g, 4, 3.8, 12, imwS("brick", 0xA86048, 1.4), -1, 1, 0);
imwBox(g, 4.4, 0.3, 12.4, imwLam(0xF2EEE2), -1, 4.8, 0);
imwBox(g, 1.2, 2.3, 0.08, imwLam(0x2A3A2A), 1.02, 1, 0);
imwSign(g, name, 5, 0.8, 2.9, 2.6, len / 2 - 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
imwSign(g, name, 5, 0.8, 2.9, 2.6, -len / 2 + 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
imwFloor(x, z, 6, len, y + 1.12, {});
imwSolid(x + Math.cos(o.ry || 0) * (-1), z - Math.sin(o.ry || 0) * (-1), 4, 12, y, y + 5, o.ry || 0);
return g;
},
function (P, x, z, len, w, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = imwS("brick", 0x9A5A40, 1.4), rise = o.rise || 1.6, n = 8;
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, z0 = -len / 2 + len * t0, z1 = -len / 2 + len * t1, y0 = Math.sin(t0 * Math.PI) * rise, y1 = Math.sin(t1 * Math.PI) * rise, seg = imwBox(g, w, 0.5, len / n + 0.05, br, 0, (y0 + y1) / 2 - 0.4, (z0 + z1) / 2);
seg.rotation.x = -Math.atan2(y1 - y0, len / n);
[-1, 1].forEach(function (s) { var pr = imwBox(g, 0.4, 1.0, len / n + 0.05, br, s * (w / 2 - 0.2), (y0 + y1) / 2, (z0 + z1) / 2); pr.rotation.x = -Math.atan2(y1 - y0, len / n); });
}
var ar = new THREE.Mesh(imwGeo("arch" + w, function () { var t = new THREE.TorusGeometry(3, 0.6, 6, 12, Math.PI); return t; }), br);
ar.rotation.y = Math.PI / 2;
ar.position.y = -3.2;
g.add(ar);
var ry = o.ry || 0, cx = function (lz) { return x + Math.sin(ry) * lz; }, cz = function (lz) { return z + Math.cos(ry) * lz; };
imwRamp(cx(-len / 4), cz(-len / 4), w - 0.8, len / 2, y - 0.1, y + rise - 0.1, ry);
imwRamp(cx(len / 4), cz(len / 4), w - 0.8, len / 2, y + rise - 0.1, y - 0.1, ry);
[-1, 1].forEach(function (s) { imwSolid(x + Math.cos(ry) * s * (w / 2 - 0.2), z - Math.sin(ry) * s * (w / 2 - 0.2), 0.4, len, y - 1, y + rise + 1.1, ry); });
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = imwLam(0x1E2A22);
imwCyl(g, 0.07, 0.12, 3.4, ir, 0, 0, 0, 8);
imwBox(g, 0.7, 0.06, 0.06, ir, 0, 3.1, 0);
var lt = imwBox(g, 0.34, 0.5, 0.34, imwGlowM(o.lit ? 0xFFE0A0 : 0xE8E4D0, o.lit ? 0.95 : 0.6), 0, 3.4, 0);
var cap = new THREE.Mesh(imwGeo("lampcap", function () { return new THREE.ConeGeometry(0.3, 0.3, 4); }), ir);
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
if (o.lit) {
var gl = wGlow(0xFFD890, 0.9, 2.4);
gl.position.y = 3.6;
g.add(gl);
}
imwRound(x, z, 0.2, hfn(x, z) - 1, hfn(x, z) + 3.5);
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
imwInst(P, imwGeo("tpole", function () { var p = new THREE.CylinderGeometry(0.1, 0.14, 8, 6); p.translate(0, 4, 0); var c = new THREE.BoxGeometry(1.6, 0.1, 0.1); c.translate(0, 7.4, 0); var c2 = new THREE.BoxGeometry(1.2, 0.1, 0.1); c2.translate(0, 6.8, 0); return gwMerge([p.toNonIndexed(), c, c2].map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), imwMat("darkoak"), list, {});
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
imwPlant(P, "bush", list.map(function (q, i) { return { x: q.x, z: q.z, y: q.y - 0.2, s: (o.hs || 0.85) + ((i * 37) % 10) / 40, ry: i * 1.7 }; }), { col: o.col || 0x4A6A30, keepAll: true });
return;
}
imwInst(P, imwGeo(o.hedge ? "hedge" : "paling", function () { if (o.hedge) {
var h = new THREE.BoxGeometry(0.9, 1.4, 2.5, 2, 2, 2);
h.translate(0, 0.7, 0);
return h;
} var parts = []; for (var j = 0; j < 6; j++) {
var s = new THREE.BoxGeometry(0.06, 1.1, 0.08);
s.translate(0, 0.55, -1.0 + j * 0.4);
parts.push(s);
} var r = new THREE.BoxGeometry(0.05, 0.08, 2.4); r.translate(0, 0.85, 0); parts.push(r); var r2 = r.clone(); r2.translate(0, -0.5, 0); parts.push(r2); return gwMerge(parts.map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), o.hedge ? imwM("hedgeM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A5A2A, map: imwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }) : imwLam(o.col || 0xE8E2D2), list, {});
},
function (P, x, z, r, hfn, fires) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 18), imwM("scorch", function () { var mm = new THREE.MeshLambertMaterial({ color: 0x14100C, transparent: true, opacity: 0.85, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, hfn(x, z) + 0.05, z);
P.add(m);
var R = wRand(Math.round(x * 7 + z));
for (var i = 0; i < (fires || 0); i++) {
var a = R() * 6.283, d = R() * r * 0.8, fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
var f = imwFire(P, fx, hfn(fx, fz), fz, 0.6 + R() * 0.8);
f.userData.keep = 1;
}
return m;
},
function (P, list) { if (!list.length)
return; imwInst(P, imwGeo("deadT", function () { var t = new THREE.CylinderGeometry(0.12, 0.3, 6, 6); t.translate(0, 3, 0); var b = new THREE.CylinderGeometry(0.05, 0.1, 2.4, 5); b.rotateZ(0.9); b.translate(0.8, 4.2, 0); var b2 = b.clone(); b2.rotateY(2.4); return gwMerge([t.toNonIndexed(), b.toNonIndexed(), b2.toNonIndexed()]); }), imwLam(0x1A1612), list, {}); },
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : imwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var wd = imwMat(o.mat || "oak"), blk = imwLam(0x1A1612);
var L = o.len || 2.6, W = o.w || 1.5;
imwBox(g, W, 0.5, L, wd, 0, 0.8, 0);
if (o.seat)
imwBox(g, W, 0.5, 0.5, imwLam(o.seatCol || 0x3A2A1E), 0, 1.3, -0.3);
if (o.load)
for (var i = 0; i < o.load; i++)
imwBox(g, 0.6, 0.4 + i % 2 * 0.2, 0.6, imwLam([0x8A6A4A, 0x5A4A3A, 0xC8B898, 0x6A3A2A][i % 4]), -0.4 + (i % 3) * 0.4, 1.3, -0.8 + Math.floor(i / 3) * 0.6);
[-1, 1].forEach(function (s) { var wh = new THREE.Mesh(imwGeo("cwheel", function () { return new THREE.TorusGeometry(0.75, 0.05, 6, 16); }), blk); wh.position.set(s * (W / 2 + 0.1), 0.75, 0.2); wh.rotation.y = Math.PI / 2; g.add(wh); for (var k = 0; k < 5; k++) {
var sp = imwBox(g, 0.03, 1.5, 0.03, wd, s * (W / 2 + 0.1), 0, 0.2);
sp.position.y = 0.75;
sp.rotation.x = k / 5 * Math.PI;
} });
[-1, 1].forEach(function (s) { imwBox(g, 0.06, 0.06, 2.4, wd, s * 0.45, 0.9, -L / 2 - 1.1); });
if (o.horse !== false)
imwHorse(g, 0, 0, -L / 2 - 2.0, 0, { col: o.hcol || 0x5A3A22, kind: o.kind });
if (!o.nosolid)
imwSolid(x, z, W + 0.6, L + 2, y - 1, y + 2.2, ry || 0);
return g;
},
function (P, hfn, col, o) {
o = o || {};
var R = o.r || 2600, st = imwLite() ? 160 : 100, E = o.edge || 820, cl = function (v) { return Math.max(-E, Math.min(E, v)); };
return imwTerrain(P, -R, -R, 2 * R, 2 * R, st, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)), k = imwSmooth(E, R, e); return hfn(cl(x), cl(z)) * (1 - k) + (o.rise || 18) * k * imwFbm(x * 0.002, z * 0.002, 2) - 0.6 - 8 * (1 - k); }, imwMat("meadow"), function (x, z, y, c) { var g = 0.75 + imwFbm(x * 0.01, z * 0.01, 2) * 0.2, C = typeof col === "number" ? [((col >> 16) & 255) / 255, ((col >> 8) & 255) / 255, (col & 255) / 255] : (col || [0.56, 0.74, 0.42]); c.setRGB(C[0] * g, C[1] * g, C[2] * g); });
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
var lite = imwLite(), R = wRand(o.seed || 5), L = imwPathLen(pts), W = o.w || 8, mv = [], g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var dress = o.dress || ["gent", "lady", "maid", "worker", "boy", "girl", "porter", "cabby", "clergy", "newsboy"], n = lite ? Math.round((o.n || 40) * 0.4) : (o.n || 40), nc = lite ? Math.round((o.carts || 8) * 0.5) : (o.carts || 8);
for (var i = 0; i < n; i++) {
var d = dress[Math.floor(R() * dress.length)], kid = d === "boy" || d === "girl", m = imwDressed((o.seed || 5) * 100 + i, d, { sex: d === "lady" || d === "maid" || d === "girl" ? "f" : "m", child: kid });
g.add(m);
mv.push({ g: m, s: R() * L, off: (R() - 0.5) * W, sp: (o.sp || 1.4) * (0.8 + R() * 0.5) });
}
for (i = 0; i < nc; i++) {
var c = imwCart(g, 0, 0, 0, { y: 0, nosolid: true, seat: R() < 0.6, load: Math.floor(R() * 6), hcol: [0x5A3A22, 0x2A1E16, 0x8A6A4A, 0x3A3028][i % 4], len: 2 + R() * 1.4 });
mv.push({ g: c, s: R() * L, off: (R() - 0.5) * W * 0.5, sp: (o.sp || 1.4) * (0.9 + R() * 0.3), cart: 1 });
}
var on = true;
IMW.ticks.push(function (dt) { if (!g.parent || !on)
return; mv.forEach(function (M) { M.s += M.sp * dt; if (M.s > L)
M.s -= L; var p = imwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); }); });
mv.forEach(function (M) { var p = imwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); });
g.userData.stop = function () { on = false; };
return g;
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.imcow)
return;
var tail = function (c) { return { l: 0.8, r: 0.07, up: -1.3, col: c }; };
CRX_PLANS.imdark = function () { return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x2A1C14, back: 0x1E140E, muzzle: 0x1A1210, mane: 0x0E0A08, foot: "hoof", tail: tail(0x0E0A08), neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0 }); };
CRX_PLANS.immule = function () { return crxQuad({ L: 0.95, H: 0.92, G: 0.32, W: 0.74, legR: 0.045, head: "horse", hs: 1.25, col: 0x6A625A, back: 0x5A524A, muzzle: 0x3A3430, mane: 0x2A2622, foot: "hoof", tail: tail(0x2A2622), neck: { l: 0.5, up: 0.8 }, neckR0: 0.5, neckR1: 0.32, stride: 1.6, runAt: 3.0 }); };
CRX_PLANS.imcow = function () { return crxQuad({ L: 1.15, H: 0.9, G: 0.42, W: 0.86, legR: 0.06, head: "bull", hs: 1.05, col: 0xD8CCB8, back: 0x8A5A3A, belly: 0xE8E0D0, muzzle: 0xC89A8A, mane: 0x8A5A3A, foot: "hoof", tail: { l: 0.7, r: 0.04, up: -1.5, col: 0x8A5A3A }, neck: { l: 0.35, up: 0.5 }, neckR0: 0.6, neckR1: 0.45, stride: 1.4, runAt: 2.4 }); };
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = null, key = o.kind || "horse";
if (o.plain)
return imwPlainBeast(P, x, y, z, ry, o);
var crx = false;
try {
imwCrxKinds();
crx = typeof crxBuild === "function" && typeof crxHas === "function" && crxHas(key) && !imwLite() && typeof CRX !== "undefined";
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
var stand = imwHorse(hold, 0, 0, 0, 0, { col: o.col, plain: 1, kind: key });
IMW.ticks.push(function () { if (!hold.parent || hold.userData.done || !CRX.geo[key])
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
return imwPlainBeast(P, x, y, z, ry, o);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), cow = o.kind === "imcow", c = imwLam(o.col || (cow ? 0xD8CCB8 : 0x5A3A22)), dk = imwLam(0x1A120C);
{
if (cow)
g.scale.set(1.15, 0.9, 1.05);
imwEll(g, c, 0.34, 0.36, 0.85, 0, 1.25, 0, 12);
var nk = imwCyl(g, 0.16, 0.24, 0.8, c, 0, 1.3, -0.7, 8);
nk.rotation.x = -0.7;
var hd = imwEll(g, c, 0.13, 0.15, 0.34, 0, 1.85, -1.05, 10);
hd.rotation.x = 0.6;
[[-0.2, -0.55], [0.2, -0.55], [-0.2, 0.55], [0.2, 0.55]].forEach(function (q) { imwCyl(g, 0.06, 0.05, 1.0, c, q[0], 0, q[1], 6); imwCyl(g, 0.07, 0.07, 0.1, dk, q[0], 0, q[1], 6); });
var mn = imwBox(g, 0.05, 0.4, 0.7, dk, 0, 1.45, -0.75);
mn.rotation.x = -0.7;
var tl = imwCyl(g, 0.06, 0.03, 0.7, dk, 0, 0.9, 0.95, 6);
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
var g = new THREE.Group(), w = imwLam(0xE8E2D4), dk = imwLam(0x3A2E26);
var b = imwEll(g, w, 0.32, 0.3, 0.5, 0, 0.62, 0, 10);
var h = imwEll(g, dk, 0.1, 0.11, 0.16, 0, 0.62, -0.56, 8);
h.rotation.x = 0.5;
imwEll(g, w, 0.13, 0.1, 0.12, 0, 0.76, -0.44, 8);
[[-0.14, -0.28], [0.14, -0.28], [-0.14, 0.28], [0.14, 0.28]].forEach(function (q) { imwCyl(g, 0.035, 0.03, 0.42, dk, q[0], 0, q[1], 6); });
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
P.add(g);
return g;
},
function (x, z) {
var n = imwFbm(x * 0.006, z * 0.006, 4), h = 4 + n * 6;
h += imwSmooth(-60, -420, z) * 38 * (0.8 + 0.2 * imwFbm(x * 0.01, 3, 2));
h += imwSmooth(260, 820, Math.abs(x)) * 16 * (z < 120 ? 1 : 0.5);
var rd = Math.abs(z - IMW_IP.river - 10 * Math.sin(x / 90));
if (rd < 20) {
var t = 1 - rd / 20;
h = h * (1 - t) + (-0.6) * t;
if (rd < 7)
h = -1.4;
}
var sd = Math.abs(z);
if (sd < 18 && Math.abs(x) < 340)
h = h * (sd / 18) + 4.6 * (1 - sd / 18);
return h;
},
function (G) {
var X = IMW_ROOMXZ.iping, R, lite = imwLite(), st = IMW.st;
R = imwRoom(G, "cbar", X.cbar[0], X.cbar[1], 10, 8, { wall: "render", floor: "planks", name: "the bar of the Coach and Horses", beams: true });
imwBox(R.g, 5.6, 1.1, 0.8, imwMat("darkoak"), 0.6, 0, -2.6);
for (var t = 0; t < 4; t++)
imwCyl(R.g, 0.3, 0.3, 0.7, imwMat("oak"), -1.6 + t * 1.2, 1.1, -3.4, 10);
imwHearth(R.g, -4.8, 0.6, Math.PI / 2, { h: R.h });
for (t = 0; t < 2; t++) {
imwTable(R.g, -1.8 + t * 3.6, 1.4, 1.4, 0.8, 0.74, {});
imwBench(R.g, -1.8 + t * 3.6, 2.2, 0, { w: 1.6, d: 0.4 });
}
imwShelves(R.g, 4.8, -1, 2.6, 2.2, -Math.PI / 2, { jars: 1 });
imwSign(R.g, "ALES · STOUT · CIDER · SPIRITS", 3.6, 0.45, 0.6, 2.5, -3.86, 0, { bg: "#2A1A10", ink: "#F0D890" });
imwWindowIn(R.g, 2.4, 2.0, 3.38, Math.PI, 1.2, 1.2, { sky: st.season === "whit" ? 0xB8D8F0 : 0xE0E6EC });
R = imwRoom(G, "cparl", X.cparl[0], X.cparl[1], 9, 8, { wall: "greenpaper", name: "the parlour of the Coach and Horses", lightI: 0.85 });
imwHearth(R.g, -4.3, 0, Math.PI / 2, { h: R.h });
imwTable(R.g, 0.6, -1.4, 2.2, 1.1, 0.76, { cloth: st.mess ? null : 0xF4F0E8 });
imwChair(R.g, 0.6, -0.6, Math.PI, { arm: 1, seat: "leather" });
imwChair(R.g, -2.6, 1.2, Math.PI / 2, { arm: 1 });
imwShelves(R.g, 4.3, -1, 3.0, 2.4, -Math.PI / 2, { jars: 1 });
imwWindowIn(R.g, 0, 2.0, -3.88, 0, 1.6, 1.4, { sky: st.season === "whit" ? 0xB8D8F0 : 0xE0E6EC });
imwRug(R.g, 0, 0.4, 3.4, 2.4, 0x6A3A2A);
imwPicture(R.g, -1.6, 2.2, 3.88, Math.PI, 0.8, 0.6);
if (st.bottles) {
var cols = [0x2A4A2A, 0x5A2A1A, 0xC8D8D0, 0x1A2A4A, 0x8A6A2A, 0xE8E0C8, 0x3A2A4A], Rn = wRand(51);
for (var b = 0; b < (lite ? 14 : 34); b++) {
var bx = -0.3 + Rn() * 1.8, bz = -1.8 + Rn() * 0.8, bh = 0.14 + Rn() * 0.2;
imwCyl(R.g, 0.035 + Rn() * 0.03, 0.04 + Rn() * 0.03, bh, imwShine(cols[b % cols.length], 0.15, 0), bx, 0.76, bz, 10);
}
for (b = 0; b < (lite ? 8 : 20); b++) {
var sx = 4.05, sy = 0.5 + Math.floor(b / 6) * 0.55, sz = -2.2 + (b % 6) * 0.32;
imwCyl(R.g, 0.04, 0.05, 0.18 + (b % 3) * 0.05, imwShine(cols[(b + 3) % cols.length], 0.15, 0), sx, sy, sz, 10);
}
imwBox(R.g, 0.5, 0.04, 0.3, imwMat("brass"), 1.3, 0.76, -1.5);
imwBox(R.g, 0.6, 0.5, 0.5, imwMat("oak"), -3, 0, -2.4);
imwBox(R.g, 0.6, 0.5, 0.5, imwMat("oak"), -3, 0, -1.7);
if (!lite)
imwPlant(R.g, "grass", imwScatter(52, 40, -4, -3.6, 4, 3.6, null, function () { return 0; }, 0.15, 0.3), { col: 0xD8C890 });
}
if (st.mess) {
imwBox(R.g, 0.9, 0.5, 0.06, imwLam(0x5A3A2A), -1.2, 0.02, 0.6).rotation.z = 1.2;
imwBox(R.g, 0.5, 0.5, 0.5, imwMat("oak"), 2.2, 0, 1.6).rotation.y = 0.7;
}
R = imwRoom(G, "cbed", X.cbed[0], X.cbed[1], 8, 7, { wall: "bluepaper", name: "the stranger's bedroom", lightI: 0.7 });
imwBed(R.g, -2.4, -1, Math.PI / 2, {});
imwChair(R.g, 1.6, 0.6, st.mess ? 2.2 : Math.PI, {});
imwTable(R.g, 2.6, -2.4, 1.0, 0.6, 0.8, {});
imwCyl(R.g, 0.22, 0.16, 0.14, imwLam(0xF0ECE4), 2.6, 0.8, -2.4, 16);
imwWindowIn(R.g, 0, 2.0, -3.38, 0, 1.2, 1.4, { sky: 0xD8E0E8 });
if (st.mess)
imwBox(R.g, 1.4, 0.2, 0.8, imwLam(0xE8E4DA), -2.2, 0.1, 1.2).rotation.y = 0.6;
R = imwRoom(G, "ccell", X.ccell[0], X.ccell[1], 8, 7, { wall: "stone", floor: "cobble", name: "the cellar of the Coach and Horses", bare: 1, lightI: 0.45, env: "garret" });
for (t = 0; t < 6; t++) {
var bl = imwCyl(R.g, 0.42, 0.42, 0.9, imwMat("oak"), -3 + t * 1.1, 0.42, -2.6, 14);
bl.rotation.z = Math.PI / 2;
}
imwShelves(R.g, 3.8, 1, 2.4, 2.0, -Math.PI / 2, { jars: 1 });
imwCandle(R.g, 0, 0.9, -1.6, {});
R = imwRoom(G, "vstudy", X.vstudy[0], X.vstudy[1], 9, 8, { wall: "damask", name: "Mr. Bunting's study at the vicarage", lightI: 0.7 });
imwShelves(R.g, -4.3, -1, 3.2, 2.6, Math.PI / 2, {});
imwShelves(R.g, -4.3, 2.2, 2.4, 2.6, Math.PI / 2, {});
imwTable(R.g, 1.6, -2.4, 1.8, 0.9, 0.78, { mat: "darkoak" });
imwChair(R.g, 1.6, -1.6, Math.PI, { arm: 1, seat: "leather" });
imwBox(R.g, 1.2, 1.2, 0.6, imwMat("darkoak"), 3.4, 0, -3.4);
imwHearth(R.g, 4.3, 1, -Math.PI / 2, { h: R.h });
imwCandle(R.g, 2.2, 0.78, -2.6, { brass: 1 });
imwRug(R.g, 0, 0.6, 3.6, 2.6, 0x3A2A4A);
R = imwRoom(G, "clock", X.clock[0], X.clock[1], 7, 6, { wall: "plaster", name: "Henfrey's clock shop", bare: 1 });
imwBox(R.g, 4, 0.9, 0.7, imwMat("oak"), 0, 0, -1.8);
for (t = 0; t < 9; t++) {
var cx = -3 + (t % 5) * 1.4, cy = 1.4 + Math.floor(t / 5) * 0.8;
var cl = imwCyl(R.g, 0.22, 0.22, 0.06, imwMat("darkoak"), cx, cy, -2.86, 18);
cl.rotation.x = Math.PI / 2;
var fc = imwCyl(R.g, 0.18, 0.18, 0.02, imwLam(0xF4F0E4), cx, cy, -2.82, 18);
fc.rotation.x = Math.PI / 2;
}
imwBox(R.g, 0.5, 2.1, 0.4, imwMat("darkoak"), 3, 0, -2.6);
R = imwRoom(G, "huxter", X.huxter[0], X.huxter[1], 8, 6, { wall: "ochre", name: "Huxter's general shop", bare: 1 });
imwBox(R.g, 5, 1.0, 0.7, imwMat("oak"), 0, 0, -1.8);
imwShelves(R.g, -3.8, 0, 2.6, 2.4, Math.PI / 2, { jars: 1 });
imwShelves(R.g, 0, -2.86, 4.6, 2.4, 0, { jars: 1 });
imwSign(R.g, "TOBACCO · SWEETS · STRING · CANDLES", 4, 0.4, 0, 2.7, -2.9, 0, { bg: "#1E2A3A", ink: "#F0E8C8" });
R = imwRoom(G, "cuss", X.cuss[0], X.cuss[1], 8, 7, { wall: "greenpaper", name: "Mr. Cuss's surgery" });
imwBed(R.g, -2.6, 0, Math.PI / 2, {});
imwTable(R.g, 1.6, -2.2, 1.6, 0.8, 0.78, {});
imwChair(R.g, 1.6, -1.4, Math.PI, {});
imwShelves(R.g, 3.8, 0.6, 2.6, 2.4, -Math.PI / 2, { jars: 1 });
R = imwRoom(G, "cott", X.cott[0], X.cott[1], 7, 6, { wall: "plaster", floor: "planks", name: "a cottage in Iping", beams: true });
imwHearth(R.g, 0, -2.8, 0, { h: R.h, pot: 1 });
imwTable(R.g, 1.4, 0.6, 1.2, 0.8, 0.74, {});
imwChair(R.g, 1.4, 1.3, Math.PI, {});
imwBed(R.g, -2.4, 0.4, Math.PI / 2, {});
R = imwRoom(G, "smithy", X.smithy[0], X.smithy[1], 9, 8, { wall: "stone", floor: "cobble", name: "Wadgers' forge", bare: 1, lightCol: 0xFFA860 });
imwBox(R.g, 1.6, 0.9, 1.2, imwMat("greystone"), -2.6, 0, -2.4);
var fg = imwFire(R.g, -2.6, 0.9, -2.4, 0.6);
fg.userData.keep = 1;
imwBox(R.g, 0.5, 0.6, 0.3, imwMat("iron"), 0.6, 0.4, -1.4);
imwCyl(R.g, 0.2, 0.24, 0.4, imwMat("darkoak"), 0.6, 0, -1.4, 10);
},
function (G) {
var lite = imwLite(), st = IMW.st, whit = st.season === "whit", H = imwIpH, D;
imwFar(G, H, whit ? 0x6A8A4A : 0xE8ECF0);
imwTerrain(G, -820, -820, 1640, 1640, lite ? 18 : 10, H, imwMat(whit ? "meadow" : "snow"), function (x, z, y, c) {
var g = 0.84 + imwFbm(x * 0.03, z * 0.03, 2) * 0.2;
if (y < -0.5) {
c.setRGB(0.42, 0.38, 0.3);
return;
}
if (!whit) {
var sn = 0.82 + imwFbm(x * 0.05, z * 0.05, 2) * 0.1;
c.setRGB(sn, sn * 1.01, sn * 1.03);
return;
}
if (z < -80) {
c.setRGB(0.42 * g, 0.5 * g, 0.28 * g);
return;
}
c.setRGB(0.58 * g, 0.76 * g, 0.4 * g);
});
var rv = [];
for (var x = -820; x <= 820; x += 40)
rv.push([x, imwIpRiverZ(x)]);
imwStrip(G, rv, 14, function () { return -0.5; }, imwWaterM(0x3A4A4A, 0.9), 0);
Object.keys(IMW_IP_ROADS).forEach(function (k) { imwStrip(G, IMW_IP_ROADS[k], k === "street" ? 10 : 5, H, imwMat(whit ? "gravel" : "slush"), 0.06); });
D = function (key, p, nm) { var Rm = IMW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
imwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
var roof = whit ? "tile" : "snowroof";
imwTownHouse(G, 0, -22, 18, 10, 8, { wall: "render", roof: roof, trim: "oak", dormer: 1 });
D("cbar", { x: 0, z: -15.6, ry: Math.PI }, "The door of the Coach and Horses");
var post = imwCyl(G, 0.14, 0.16, 5, imwMat("darkoak"), -11, H(-11, -10), -10, 8);
imwSign(G, "THE COACH AND HORSES", 3.4, 1.4, -11, H(-11, -10) + 4.4, -9.8, 0, { bg: "#2A3A2A", ink: "#F0D890" });
imwInDoor("cbar", "cparl", -3.6, -3.2, "The parlour door");
imwInDoor("cbar", "cbed", 4.0, -3.2, "The stairs up to the stranger's room", "go up");
imwInDoor("cbar", "ccell", 4.0, 2.6, "The cellar steps", "go down");
imwTownHouse(G, 22, -30, 10, 10, 6, { wall: "brick", roof: roof });
imwPaling(G, [[14, -14], [30, -14]], H, {});
IMW_AT.innyard.y = null;
imwCart(G, 24, -8, Math.PI / 2, { seat: true, len: 2.2, w: 1.4, hcol: 0x3A2A1A });
if (st.barred) {
for (var w = 0; w < 4; w++)
imwBox(G, 1.2, 1.4, 0.1, imwLam(0x3A2A1E), -6 + w * 4, H(-6 + w * 4, -16.9) + 2.4, -16.9);
}
imwTownHouse(G, 10, 22, 10, 9, 7, { wall: "ochre", roof: roof, ry: Math.PI });
D("huxter", { x: 10, z: 16.1, ry: 0 }, "The door of Huxter's shop");
imwSign(G, "HUXTER · GENERAL STORES", 4.2, 0.6, 10, H(10, 17) + 3.6, 17.4, Math.PI, { bg: "#1E2A3A", ink: "#F0E8C8" });
imwTownHouse(G, -60, -20, 9, 8, 6.4, { wall: "brick", roof: roof });
D("clock", { x: -60, z: -14.6, ry: Math.PI }, "The door of Henfrey's clock shop");
imwSign(G, "T. HENFREY · CLOCKS MENDED", 3.6, 0.5, -60, H(-60, -16) + 3.2, -15.9, 0, { bg: "#3A2A1A", ink: "#F0D890" });
imwTownHouse(G, -110, 22, 11, 9, 7, { wall: "render", roof: roof, ry: Math.PI });
D("cuss", { x: -110, z: 16.1, ry: 0 }, "Mr. Cuss's door");
imwTownHouse(G, -170, -22, 12, 10, 6, { wall: "stone", roof: roof });
D("smithy", { x: -170, z: -15.6, ry: Math.PI }, "The door of the forge");
imwSign(G, "WADGERS · SMITH & FARRIER", 3.8, 0.5, -170, H(-170, -17) + 3.4, -16.9, 0, { bg: "#1A1A1A", ink: "#E8C060" });
imwTownHouse(G, 60, 20, 9, 8, 6.4, { wall: "brick", roof: roof, ry: Math.PI });
imwSign(G, "POST OFFICE", 2.4, 0.45, 60, H(60, 16) + 3.2, 15.9, Math.PI, { bg: "#8A1A1A", ink: "#F4F0E0" });
var cots = [[-230, -20, 0], [-280, -22, 0], [-230, 22, Math.PI], [-280, 20, Math.PI], [-60, 22, Math.PI], [100, -20, 0], [160, -22, 0], [180, 22, Math.PI], [220, -20, 0], [240, 22, Math.PI], [280, -22, 0], [300, 22, Math.PI]];
cots.forEach(function (c, i) { imwTownHouse(G, c[0], c[1], 8 + (i % 3), 7, 5.6, { wall: ["plaster", "brick", "render", "stone"][i % 4], roof: roof, ry: c[2] }); });
D("cott", { x: 220, z: -14.1, ry: Math.PI }, "The door of a cottage");
for (var i = 0; i < (lite ? 5 : 10); i++) {
var lx = -260 + i * 56;
imwLamp(G, lx, i % 2 ? 8 : -8, H, { lit: !!st.night });
}
imwPoles(G, [[-340, -10], [340, -10], [560, -40], [800, -48]], H, 46);
imwChurch(G, IMW_IP.church[0], IMW_IP.church[1], { len: 24, w: 10, h: 9, tower: 5, th: 18, ry: Math.PI / 2, roof: whit ? "slate" : "snowroof" });
imwVilla(G, IMW_IP.vic[0], IMW_IP.vic[1] - 8, { w: 11, d: 9, ry: 0, brick: 0xA86048 });
var vd = imwVillaDoor(IMW_IP.vic[0], IMW_IP.vic[1] - 8, { w: 11, d: 9 });
D("vstudy", vd, "The vicarage door");
imwPaling(G, [[130, -90], [176, -90], [176, -150], [130, -150]], H, {});
imwPlant(G, "conifer", [{ x: 136, z: -96, y: H(136, -96), s: 0.7, ry: 0 }, { x: 170, z: -146, y: H(170, -146), s: 0.8, ry: 1 }], { col: 0x2A3A22, keepAll: true });
imwBridge(G, -34, IMW_IP.river, 22, 6, 0.6, { ry: Math.PI / 2 });
var hang = imwScatter(61, lite ? 120 : 300, -760, -780, 760, -150, function (x, z) { return imwPathD(x, z, IMW_IP_ROADS.church) > 8; }, H, 0.9, 1.4);
if (whit)
imwPlant(G, "tree", hang, { col: 0x4A7A34 });
else
imwDeadTrees(G, hang);
var fld = function (x, z) { return z > -150 && Math.abs(z) > 34 && Math.abs(z - imwIpRiverZ(x)) > 16 && !(x > 60 && x < 190 && z > 60 && z < 160) && Object.keys(IMW_IP_ROADS).every(function (k) { return imwPathD(x, z, IMW_IP_ROADS[k]) > 8; }) && !(x > 90 && x < 190 && z < -80 && z > -160); };
var trees = imwScatter(62, lite ? 60 : 150, -800, -150, 800, 800, fld, H, 0.8, 1.4);
if (whit)
imwPlant(G, "tree", trees, { col: 0x5A8A3A });
else
imwDeadTrees(G, trees);
imwPlant(G, "bush", imwScatter(63, lite ? 60 : 180, -800, -150, 800, 800, fld, H, 0.4, 0.8), { col: whit ? 0x4A6A2A : 0xD8DCE0 });
if (whit) {
imwPlant(G, "grass", imwScatter(64, lite ? 160 : 420, -800, 40, 800, 800, fld, H, 0.8, 1.3), { col: 0xB8D088 });
if (!lite)
imwPlant(G, "flowers", imwScatter(65, 60, -300, 40, 300, 400, fld, H, 0.6, 1), { col: "#F0E060" });
}
else if (!lite)
imwSnowfall(G, st.snowing ? 600 : 200, st.snowing ? 1.6 : 0.8);
imwPaling(G, [[-340, 40], [-120, 40]], H, { hedge: true });
imwPaling(G, [[200, 40], [340, 40]], H, { hedge: true });
imwPaling(G, [[-340, -40], [-200, -40]], H, { hedge: true });
imwIpRoadside(G, H, whit, lite, roof);
if (st.fest)
imwIpFestival(G);
},
function (G) {
var H = imwIpH, gx = IMW_IP.green[0], gz = IMW_IP.green[1], lite = imwLite();
var cols = [0xC82A2A, 0xF0F0F0, 0x2A4AA8, 0xE8C040];
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.283, px = gx + Math.cos(a) * 40, pz = gz + Math.sin(a) * 30;
imwCyl(G, 0.08, 0.1, 6, imwMat("oak"), px, H(px, pz), pz, 6);
}
for (i = 0; i < (lite ? 18 : 40); i++) {
var t = i / (lite ? 18 : 40) * 6.283, fx = gx + Math.cos(t) * 40, fz = gz + Math.sin(t) * 30;
imwBox(G, 0.5, 0.4, 0.02, imwLam(cols[i % 4]), fx, H(fx, fz) + 5.2, fz).rotation.y = t;
}
var sw = new THREE.Group();
sw.position.set(gx - 18, H(gx - 18, gz), gz);
G.add(sw);
imwBox(sw, 0.2, 5, 0.2, imwMat("oak"), -3, 0, 0);
imwBox(sw, 0.2, 5, 0.2, imwMat("oak"), 3, 0, 0);
imwBox(sw, 6.4, 0.2, 0.2, imwMat("oak"), 0, 5, 0);
[-1.4, 1.4].forEach(function (x, k) { var b = new THREE.Group(); b.position.set(x, 5, 0); sw.add(b); imwBox(b, 0.04, 3.6, 0.04, imwMat("iron"), -0.4, -3.6, 0); imwBox(b, 0.04, 3.6, 0.04, imwMat("iron"), 0.4, -3.6, 0); imwBox(b, 1.0, 0.5, 1.8, imwLam(cols[k]), 0, -4.1, 0); b.userData.swing = k; IMW.fx.push(b); b.userData.kind = "swing"; });
imwBox(G, 6, 0.1, 0.4, imwMat("oak"), gx + 16, H(gx + 16, gz - 8) + 1.0, gz - 8);
for (i = 0; i < 6; i++) {
imwCyl(G, 0.03, 0.03, 0.6, imwMat("oak"), gx + 13.6 + i, H(gx + 13.6 + i, gz - 8) + 1.1, gz - 8, 6);
imwCyl(G, 0.11, 0.11, 0.2, imwLam(0x5A3A1E), gx + 13.6 + i, H(gx + 13.6 + i, gz - 8) + 1.7, gz - 8, 8);
}
imwBox(G, 6.4, 2.6, 0.1, imwLam(0xC82A2A), gx + 16, H(gx + 16, gz - 9.4), gz - 9.4);
imwSign(G, "COCONUT SHY · 3 BALLS A PENNY", 4, 0.5, gx + 16, H(gx + 16, gz - 9.4) + 2.9, gz - 9.3, 0, { bg: "#F4F0E0", ink: "#8A1A1A" });
imwBox(G, 10, 3, 6, imwLam(0xF0ECE0), gx, H(gx, gz + 16), gz + 16);
imwSign(G, "REFRESHMENTS", 3, 0.5, gx, H(gx, gz + 12.9) + 2.4, gz + 12.9, Math.PI, { bg: "#2A4A2A", ink: "#F4F0E0" });
var org = new THREE.Group();
org.position.set(gx + 22, H(gx + 22, gz + 14), gz + 14);
G.add(org);
imwBox(org, 5, 2.6, 2.2, imwLam(0x8A1A1A), 0, 0.8, 0);
imwBox(org, 4.6, 1.6, 0.1, imwMat("brass"), 0, 1.4, 1.12);
for (i = 0; i < 2; i++)
imwCyl(org, 0.5, 0.5, 0.12, imwMat("darkoak"), i ? 1.6 : -1.6, 0.5, 1.1, 14).rotation.x = Math.PI / 2;
},
function (G) {
var st = IMW.st, whit = st.season === "whit";
if (!st.empty) {
imwCrowd("ipst", [["The Iping postman", "m", "porter", whit ? "Hot for Whitsun." : "Snow's drifting on the Bramblehurst road."], ["A woman with a basket", "f", "maid", "Have you seen him? The one at the Coach and Horses, all bandaged?"], ["A farm boy", "m", "boy", "They say he's a anarchist, making bombs.", null, true],
["Mrs. Fearenside", "f", "maid", "My husband swears the man's leg was black as your hat."], ["An old man on a bench", "m", "imvillager", "Iping's a quiet place. Was, I mean."], ["A girl with a hoop", "f", "girl", "Mother says not to go near the inn.", null, true], ["A carter", "m", "imvillager", "Coming through! Mind the wheel."], ["A woman at her door", "f", "maid", "He pays well, Mrs. Hall says. That's all she cares about."]], -260, -6, 260, 8, { wander: 6, ok: function (x, z) { return Math.abs(z) < 9; } });
}
if (st.fest) {
imwCrowd("fest", [["A lad on the swings", "m", "boy", "Higher! Push us higher!", null, true], ["A man throwing at the coconuts", "m", "imvillager", "Missed! Again!"], ["The steam organ man", "m", "worker", "Lovely music, all day long, for the Club."], ["A Club member with his rosette", "m", "gent", "Club Festival, every Whit Monday. Best day of the year."],
["A girl with a ribbon", "f", "girl", "I won a coconut!", null, true], ["A lady with a parasol", "f", "lady", "So pleasant, after all that unpleasantness at the inn."], ["A boy with a toffee apple", "m", "boy", "Can I have another penny?", null, true], ["The refreshment woman", "f", "maid", "Tea, lemonade, buns! Ha'penny each!"], ["A young couple", "f", "lady", "Shall we walk down by the river?"], ["A farm hand in his Sunday best", "m", "imvillager", "Day off. Best day of the year."]], IMW_IP.green[0] - 34, IMW_IP.green[1] - 24, IMW_IP.green[0] + 34, IMW_IP.green[1] + 24, { wander: 6 });
}
if (st.hunt) {
imwCrowd("hunt", [["A man with a stick", "m", "imvillager", "Beat the hedges! He can't hide forever!"], ["A young man with a dog", "m", "imvillager", "The dog can smell him, I tell you!"], ["Wadgers' mate", "m", "worker", "Spread out! Feel about for him!"], ["A woman calling", "f", "maid", "Shut your doors! Shut your doors!"]], -200, -30, 200, 40, { wander: 8 });
}
imwCrowd("ipdown", [["A shepherd", "m", "imvillager", whit ? "Lambs all doing well." : "Bad weather for the ewes."], ["A carrier on the downs road", "m", "imvillager", "Going to Bramblehurst. Want a lift?"]], -700, 20, -500, 60, { wander: 5 });
imwCrowd("ipchurch", [["The sexton", "m", "imvillager", "Cold work, digging, this weather."], ["A churchwarden", "m", "gent", "The vicar's been robbed, did you hear? In his own house!"]], 120, -100, 170, -60, { wander: 4 });
},
function (G) {
imwIpRooms(G);
imwIping(G);
imwIpFolk(G);
var st = IMW.st;
IMW.live = imwIpLive;
imwIpLive(st);
[["huxter", "huxter"], ["clock", "henfrey"], ["smithy", "wadgers"], ["cott", null]].forEach(function (F, i) {
var R = IMW.rooms.filter(function (r) { return r.key === F[0]; })[0];
if (!R)
return;
if (F[1])
imwFolk(F[1], R.cx + 0.6, R.cz - 1.2, Math.PI, { y: R.y, seed: "in" });
else
imwOne("ipc" + i, "An old woman by her fire", "f", "maid", R.cx - 1, R.cz - 1.4, 0, "Shut the door, dear, the cold gets in.", { y: R.y });
});
},
function (G, H, whit, lite, roof) {
var rnd = wRand(1117), gaps = [[-470, 1], [-700, -1], [470, 1], [690, -1]];
["west", "east"].forEach(function (k) {
var road = IMW_IP_ROADS[k].slice(1);
[-1, 1].forEach(function (sd) {
var line = imwIpOffset(road, sd * 6.5), bits = [], cur = [];
for (var i = 0; i < line.length - 1; i++) {
var a = line[i], b = line[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 10));
for (var j = 0; j < n; j++) {
var x = a[0] + (b[0] - a[0]) * j / n, z = a[1] + (b[1] - a[1]) * j / n, gap = gaps.some(function (g) { return g[1] === sd && Math.abs(g[0] - x) < 5; });
if (gap) {
if (cur.length > 1)
bits.push(cur);
cur = [];
}
else
cur.push([x, z]);
}
}
cur.push(line[line.length - 1]);
if (cur.length > 1)
bits.push(cur);
bits.forEach(function (b) { imwPaling(G, b, H, { hedge: true, col: whit ? null : 0x8A7E6C, hs: whit ? 0.85 : 0.55 }); });
var tl = [];
for (var t = 0; t < line.length - 1; t++) {
var p = line[t], q = line[t + 1], LL = Math.hypot(q[0] - p[0], q[1] - p[1]);
for (var u = rnd() * 30; u < LL; u += (lite ? 60 : 34) + rnd() * 20) {
var x2 = p[0] + (q[0] - p[0]) * u / LL, z2 = p[1] + (q[1] - p[1]) * u / LL;
x2 += sd * (1 + rnd() * 1.5);
tl.push({ x: x2, z: z2, y: H(x2, z2), s: 0.9 + rnd() * 0.5, ry: rnd() * 6.283 });
}
}
if (whit)
imwPlant(G, "tree", tl, { col: 0x4A7A34, keepAll: true });
else
imwDeadTrees(G, tl);
tl.forEach(function (q) { imwRound(q.x, q.z, 0.45); });
});
});
imwPoles(G, imwIpOffset(IMW_IP_ROADS.west.slice(1), -9), H, 46);
gaps.forEach(function (g) {
var k = g[0] < 0 ? "west" : "east", z = 0, road = IMW_IP_ROADS[k];
for (var i = 0; i < road.length - 1; i++) {
var a = road[i], b = road[i + 1];
if ((g[0] - a[0]) * (g[0] - b[0]) <= 0) {
z = a[1] + (b[1] - a[1]) * (g[0] - a[0]) / ((b[0] - a[0]) || 1);
var ry = Math.atan2(b[0] - a[0], b[1] - a[1]);
break;
}
}
var gz = z + g[1] * 6.5, x = g[0], y = H(x, gz), wd = imwMat("darkoak");
var gt = new THREE.Group();
gt.position.set(x, y, gz);
gt.rotation.y = (ry || Math.PI / 2) + Math.PI / 2;
G.add(gt);
imwBox(gt, 0.22, 1.5, 0.22, wd, -2.2, 0, 0);
imwBox(gt, 0.22, 1.5, 0.22, wd, 2.2, 0, 0);
for (var r = 0; r < 5; r++)
imwBox(gt, 4.2, 0.1, 0.07, imwMat("oak"), 0, 0.25 + r * 0.25, 0);
var br = imwBox(gt, 4.4, 0.1, 0.07, imwMat("oak"), 0, 0.7, 0);
br.rotation.z = 0.3;
imwSolid(x, gz, 4.6, 0.4, y - 0.2, y + 1.4, (ry || Math.PI / 2) + Math.PI / 2);
});
var mx = -590, mz = 35.8 - 4.6;
var ms = imwBox(G, 0.55, 0.9, 0.3, imwMat("stone"), mx, H(mx, mz) - 0.1, mz, 0.2);
imwSign(G, "IPING 1 · BRAMBLEHURST 2", 0.5, 0.34, mx, H(mx, mz) + 0.5, mz - 0.17, Math.PI + 0.2, { bg: "#D8D4C8" });
imwRound(mx, mz, 0.4);
var fx = -500, fz = 25.6 + 4.8, fy = H(fx, fz), fp = new THREE.Group();
fp.position.set(fx, fy, fz);
G.add(fp);
imwCyl(fp, 0.08, 0.1, 3.2, imwMat("darkoak"), 0, 0, 0, 6);
[["IPING", Math.PI / 2 + 0.15], ["BRAMBLEHURST", -Math.PI / 2 - 0.1], ["ADDERDEAN", Math.PI * 0.9]].forEach(function (a, i) { var arm = new THREE.Group(); arm.position.set(0, 2.8 - i * 0.32, 0); arm.rotation.y = a[1]; fp.add(arm); imwSign(arm, a[0], 1.5, 0.24, 0.75, 0, 0.05, 0, { bg: "#F2EAD4" }); imwSign(arm, a[0], 1.5, 0.24, 0.75, 0, -0.05, Math.PI, { bg: "#F2EAD4" }); });
imwRound(fx, fz, 0.3);
var fxh = -640, fzh = -34;
imwTownHouse(G, fxh, fzh, 10, 8, 6, { wall: "stone", roof: roof });
var cr = IMW.rooms.filter(function (r) { return r.key === "cott"; })[0];
if (cr)
imwDoor(cr, "The farmhouse door", fxh, fzh + 5.4, Math.PI);
var rick = new THREE.Mesh(imwGeo("rick", function () { var b = new THREE.CylinderGeometry(2.6, 2.4, 3, 12); b.translate(0, 1.5, 0); var c = new THREE.ConeGeometry(2.9, 2.4, 12); c.translate(0, 4.2, 0); return gwMerge([b.toNonIndexed(), c.toNonIndexed()]); }), imwLam(whit ? 0xC8A858 : 0xD8D2C4));
rick.position.set(fxh - 16, H(fxh - 16, fzh - 4), fzh - 4);
rick.castShadow = !lite;
G.add(rick);
imwRound(fxh - 16, fzh - 4, 2.6);
imwCart(G, fxh + 8, fzh + 10, 0.5, {});
imwPaling(G, [[fxh - 24, fzh + 12], [fxh - 24, fzh - 18], [fxh + 32, fzh - 18], [fxh + 32, fzh + 12]], H, {});
},
function (G) {
var lite = imwLite(), st = IMW.st, whit = st.season === "whit", H = imwIpH, roof = whit ? "tile" : "snowroof";
var snowCap = imwLam(0xD0D6DE), walls = ["plaster", "brick", "render", "stone", "ochre", "brick"];
var R = wRand(7101);
var fronts = [];
["n", "s"].forEach(function (side) {
IMW_IP_INFILL[side].forEach(function (x, i) {
var z = side === "n" ? -(20 + R() * 2) : (20 + R() * 2), w = 7.4 + R() * 2.2, d = 6.6 + R() * 1.2;
imwTownHouse(G, x, z, w, d, 5.2 + R() * 1.4, { wall: walls[(i + (side === "s" ? 2 : 0)) % walls.length], roof: roof, ry: side === "n" ? 0 : Math.PI, shut: [0x4A6A4A, 0x3A4A6A, 0x6A3A2A, 0x2A3A2A][i % 4], dormer: i % 3 === 0 ? 1 : 0 });
fronts.push({ x: x, w: w, side: side });
});
});
var houseXs = { n: [-280, -230, -170, -60, 0, 100, 160, 220, 280], s: [-280, -230, -110, -60, 10, 60, 180, 240, 300] };
Object.keys(houseXs).forEach(function (side) { houseXs[side].forEach(function (x) { fronts.push({ x: x, w: 9, side: side, old: 1 }); }); });
var open = function (x, side) {
if (side === "n")
return (x > -14 && x < 32) || (x > -182 && x < -158) || (x > 102 && x < 140) || (x > -66 && x < -54);
return (x > 2 && x < 18) || (x > 54 && x < 66) || (x > 72 && x < 104) || (x > -50 && x < -30) || (x > -116 && x < -104);
};
var flint = imwMat("greystone"), bushes = [], firs = [], butts = [], stacks = [];
fronts.forEach(function (f, i) {
if (open(f.x, f.side))
return;
var zs = f.side === "n" ? -12.4 : 12.4, zh = f.side === "n" ? -15.6 : 15.6, x0 = f.x - f.w / 2 - 1.6, x1 = f.x + f.w / 2 + 1.6;
if (i % 3 === 1) {
imwBox(G, (x1 - x0) / 2 - 0.7, 0.9, 0.4, flint, (x0 + f.x - 0.7) / 2, H((x0 + f.x) / 2, zs) - 0.1, zs, 0, true);
imwBox(G, (x1 - x0) / 2 - 0.7, 0.9, 0.4, flint, (f.x + 0.7 + x1) / 2, H((f.x + x1) / 2, zs) - 0.1, zs, 0, true);
if (!whit) {
imwBox(G, (x1 - x0) / 2 - 0.7, 0.08, 0.46, snowCap, (x0 + f.x - 0.7) / 2, H((x0 + f.x) / 2, zs) + 0.8, zs);
imwBox(G, (x1 - x0) / 2 - 0.7, 0.08, 0.46, snowCap, (f.x + 0.7 + x1) / 2, H((f.x + x1) / 2, zs) + 0.8, zs);
}
}
else {
imwPaling(G, [[x0, zs], [f.x - 0.8, zs]], H, {});
imwPaling(G, [[f.x + 0.8, zs], [x1, zs]], H, {});
}
imwBox(G, 0.18, 1.2, 0.18, imwMat("darkoak"), f.x - 0.85, H(f.x - 0.85, zs), zs);
imwBox(G, 0.18, 1.2, 0.18, imwMat("darkoak"), f.x + 0.85, H(f.x + 0.85, zs), zs);
imwBox(G, 1.1, 0.06, Math.abs(zh - zs), imwMat(whit ? "gravel" : "slush"), f.x, H(f.x, (zs + zh) / 2) + 0.02, (zs + zh) / 2);
var gx = f.x - f.w / 2 + 0.8, gz = (zs + zh) / 2;
bushes.push({ x: gx, z: gz, y: H(gx, gz), s: 0.5 + R() * 0.3, ry: R() * 6 });
bushes.push({ x: f.x + f.w / 2 - 0.8, z: gz, y: H(f.x + f.w / 2 - 0.8, gz), s: 0.45 + R() * 0.3, ry: R() * 6 });
if (i % 4 === 2)
firs.push({ x: f.x + f.w / 2 - 1.2, z: zs + (f.side === "n" ? -1.4 : 1.4), y: H(f.x, zs), s: 0.32 + R() * 0.12, ry: R() * 6 });
var bx = f.x + (i % 2 ? 1 : -1) * (f.w / 2 - 0.5), bz = zh + (f.side === "n" ? 1.0 : -1.0);
butts.push([bx, bz]);
if (i % 2 === 0)
stacks.push([f.x - (i % 2 ? 1 : -1) * (f.w / 2 - 1.2), zh + (f.side === "n" ? 0.9 : -0.9), f.side]);
});
imwPlant(G, "bush", bushes, { col: whit ? 0x3E5E2A : 0x4E6048, keepAll: true });
if (firs.length)
imwConifer(G, firs, {});
butts.forEach(function (b) { imwCyl(G, 0.38, 0.34, 0.95, imwMat("oak"), b[0], H(b[0], b[1]), b[1], 12); if (!whit)
imwCyl(G, 0.38, 0.38, 0.05, snowCap, b[0], H(b[0], b[1]) + 0.95, b[1], 12); });
stacks.forEach(function (s) {
var y = H(s[0], s[1]);
for (var r = 0; r < 3; r++)
for (var c = 0; c < 5; c++) {
var l = imwCyl(G, 0.09, 0.09, 1.0, imwLam([0x6A4A30, 0x7A5A3A, 0x5A3A26][(r + c) % 3]), s[0] - 0.8 + c * 0.2 + (r % 2) * 0.1, y + 0.1 + r * 0.18, s[1], 7);
l.rotation.x = Math.PI / 2;
}
if (!whit)
imwBox(G, 1.1, 0.06, 1.0, snowCap, s[0] - 0.4, y + 0.62, s[1]);
});
var py = H(-18, -10);
imwCyl(G, 0.2, 0.24, 1.7, imwMat("darkoak"), -18, py, -10.4, 10);
imwBox(G, 0.08, 0.08, 0.7, imwMat("iron"), -18, py + 1.4, -10.0).rotation.x = -0.5;
imwBox(G, 0.1, 0.1, 0.4, imwMat("iron"), -18, py + 1.2, -10.2);
imwBox(G, 2.2, 0.6, 0.8, imwMat("greystone"), -18, py, -9.2, 0, true);
imwBox(G, 2.0, 0.04, 0.6, imwWaterM(whit ? 0x4A5A5A : 0xC8D4DC, 0.9), -18, py + 0.56, -9.2);
imwBench(G, -4.8, -15.2, Math.PI, { w: 1.8, d: 0.42 });
imwBench(G, 4.8, -15.2, Math.PI, { w: 1.8, d: 0.42 });
imwBox(G, 1.0, 0.7, 0.8, imwMat("greystone"), -9, H(-9, -12), -12.4, 0, true);
imwHorse(G, 24, H(24, -5.6), -5.6, Math.PI / 2, { col: 0x3A2A1E });
imwCart(G, -130, 4, -Math.PI / 2, { len: 3, w: 1.6, load: 6, seat: true });
imwHorse(G, -133.4, H(-133.4, 4), 4, -Math.PI / 2, { col: 0x6A4A2A });
imwCart(G, 150, -5, 0.2, { len: 2, w: 1.3, load: 3 });
if (!whit) {
var sl = new THREE.Group();
sl.position.set(-72, H(-72, 7), 7);
sl.rotation.y = 0.6;
G.add(sl);
imwBox(sl, 0.6, 0.08, 1.4, imwMat("oak"), 0, 0.24, 0);
imwBox(sl, 0.05, 0.24, 1.6, imwMat("iron"), -0.27, 0, 0);
imwBox(sl, 0.05, 0.24, 1.6, imwMat("iron"), 0.27, 0, 0);
}
imwBox(G, 0.5, 4.2, 0.08, imwMat("oak"), -176, H(-176, -16.4), -16.4).rotation.z = 0.12;
imwBox(G, 1.2, 0.12, 0.12, imwMat("iron"), -164, H(-164, -13) + 0.8, -13);
imwCyl(G, 0.5, 0.5, 0.06, imwMat("iron"), -164, H(-164, -13), -13.6, 16).rotation.x = Math.PI / 2;
if (!whit && !st.hunt) {
var sx = 50, sz = 11.2, sy = H(sx, sz), sm = imwLam(0xEEF0F2);
imwEll(G, sm, 0.62, 0.56, 0.62, sx, sy + 0.5, sz, 14);
imwEll(G, sm, 0.44, 0.4, 0.44, sx, sy + 1.38, sz, 12);
imwEll(G, sm, 0.3, 0.3, 0.3, sx, sy + 2.0, sz, 12);
imwCyl(G, 0.26, 0.26, 0.36, imwLam(0x1A1A1A), sx, sy + 2.24, sz, 12);
imwCyl(G, 0.04, 0.0, 0.24, imwLam(0xD86A1A), sx, sy + 2.0, sz - 0.38, 6).rotation.x = -Math.PI / 2;
imwBox(G, 0.06, 0.06, 1.0, imwMat("darkbark"), sx - 0.6, sy + 1.4, sz).rotation.z = 1.0;
imwBox(G, 0.7, 0.1, 0.06, imwLam(0x8A1A1A), sx, sy + 1.72, sz - 0.28);
}
var gr = wRand(7102), stones = imwMat("ashlar");
for (var g = 0; g < (lite ? 14 : 34); g++) {
var gx2 = 134 + gr() * 38, gz2 = gr() < 0.5 ? -96 - gr() * 12 : -132 - gr() * 14;
var hs = imwBox(G, 0.6, 0.7 + gr() * 0.5, 0.12, stones, gx2, H(gx2, gz2) - 0.1, gz2);
hs.rotation.y = Math.PI / 2 + (gr() - 0.5) * 0.12;
hs.rotation.z = (gr() - 0.5) * 0.1;
if (!whit)
imwBox(G, 0.62, 0.05, 0.16, snowCap, gx2, H(gx2, gz2) + 0.55 + 0.05, gz2).rotation.y = Math.PI / 2;
}
for (g = 0; g < 4; g++) {
var tx = 140 + g * 9, tz = -140;
imwBox(G, 2.0, 0.8, 1.0, stones, tx, H(tx, tz), tz, 0, true);
}
var fld = function (x, z) { return Math.abs(z) > 32 && Math.abs(z - imwIpRiverZ(x)) > 14 && !(x > 60 && x < 190 && z > 50 && z < 170) && !(x > 90 && x < 190 && z < -80 && z > -160) && Object.keys(IMW_IP_ROADS).every(function (k) { return imwPathD(x, z, IMW_IP_ROADS[k]) > 7; }); };
var hedge = [], lines = [];
[-640, -520, -400, -300, -190, -90, 40, 200, 330, 450, 570].forEach(function (x) { lines.push([[x, 36], [x + 8, 150]]); lines.push([[x + 6, -38], [x - 4, -150]]); });
[[-760, 96, -120], [200, 96, 760], [-760, -96, 90], [150, -96, 760]].forEach(function (l) { lines.push([[l[0], l[1]], [l[2], l[1]]]); });
[[-760, 36], [-60, 36], [110, 36], [760, 36]].forEach(function (p, i, a) { if (i % 2 === 0)
lines.push([p, a[i + 1]]); });
[[-760, -36], [-20, -36], [150, -36], [760, -36]].forEach(function (p, i, a) { if (i % 2 === 0)
lines.push([p, a[i + 1]]); });
lines.forEach(function (L, li) {
var a = L[0], b = L[1], n = Math.floor(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2.6);
for (var k = 0; k < n; k++) {
if (k % 23 === 11)
continue;
var t = (k + 0.5) / n, x = a[0] + (b[0] - a[0]) * t + (R() - 0.5) * 0.8, z = a[1] + (b[1] - a[1]) * t + (R() - 0.5) * 0.8;
if (!fld(x, z))
continue;
hedge.push({ x: x, z: z, y: H(x, z) - 0.25, s: 0.8 + R() * 0.35, ry: R() * 6 });
}
});
if (lite)
hedge = hedge.filter(function (h, i) { return i % 2 === 0; });
imwPlant(G, "bush", hedge, { col: whit ? 0x4A6A30 : 0x7A7064, keepAll: true });
var oaks = hedge.filter(function (h, i) { return i % 19 === 7; }).map(function (h) { return { x: h.x, z: h.z, y: h.y + 0.2, s: 1.0 + R() * 0.4, ry: R() * 6 }; });
if (whit)
imwPlant(G, "tree", oaks, { col: 0x4E7A34 });
else
imwDeadTrees(G, oaks);
[[-250, 70], [-262, 78], [-238, 84], [260, -70], [272, -62], [-470, -70], [420, 120]].forEach(function (p) { var y = H(p[0], p[1]); imwCyl(G, 2.4, 2.6, 3.4, imwLam(0xB8A060), p[0], y, p[1], 14); var c = new THREE.Mesh(imwGeo("rickC", function () { return new THREE.ConeGeometry(2.8, 2.4, 14); }), whit ? imwThatchM() : snowCap); c.position.set(p[0], y + 4.6, p[1]); G.add(c); imwSolid(p[0], p[1], 5, 5, y, y + 5, 0); });
[[-300, 74, 0], [300, -74, Math.PI]].forEach(function (F, fi) {
imwTownHouse(G, F[0], F[1], 18, 9, 6.4, { wall: fi ? "stone" : "brick", roof: roof, ry: F[2] });
imwTownHouse(G, F[0] + 22 * (fi ? -1 : 1), F[1] + 8 * (fi ? -1 : 1), 12, 7, 4.6, { wall: "render", roof: roof, ry: F[2] + Math.PI / 2 });
var yx = F[0] + (fi ? -10 : 10), yz = F[1] + (fi ? -14 : 14);
imwCart(G, yx, yz, 0.5 + fi, { len: 2.6, w: 1.5, load: 2 });
imwPaling(G, [[F[0] - 14, F[1] + (fi ? -22 : 22)], [F[0] + 30 * (fi ? -1 : 1), F[1] + (fi ? -22 : 22)]], H, {});
});
var flock = function (seed, x0, z0, x1, z1, n) { var q = wRand(seed); for (var s = 0; s < n; s++) {
var x = x0 + q() * (x1 - x0), z = z0 + q() * (z1 - z0);
if (!fld(x, z))
continue;
imwSheep(G, x, H(x, z), z, q() * 6.283);
} };
flock(7110, -520, 50, -420, 90, lite ? 8 : 18);
flock(7111, 220, 110, 320, 150, lite ? 8 : 16);
flock(7112, -640, -110, -540, -60, lite ? 6 : 12);
if (whit) {
var cw = wRand(7113);
for (var c = 0; c < (lite ? 3 : 7); c++) {
var cx = -260 + cw() * 140, cz = imwIpRiverZ(-200) - 26 - cw() * 10;
imwHorse(G, cx, H(cx, cz), cz, cw() * 6.283, { kind: "cow", col: 0x8A5A3A });
}
}
if (!whit) {
imwPaling(G, [[-524, 46], [-416, 46], [-416, 94], [-524, 94], [-524, 46]], H, {});
}
if (!st.empty && !st.hunt) {
imwCrowd("ipmore", [["Mrs. Huxter at her gate", "f", "maid", whit ? "Fine weather for the Club." : "Bitter, isn't it? Coal's gone up again."], ["A man splitting wood", "m", "imvillager", "Can't stand here gossiping, there's wood to split."],
["A boy with a sledge", "m", "boy", whit ? "Wish it would snow again." : "We built the snowman! Don't knock him over.", null, true], ["A little girl", "f", "girl", "My mother says the stranger's a Lunatic.", null, true],
["An old woman shaking a mat", "f", "maid", "Mind your boots on my step."], ["A labourer going home", "m", "imvillager", "Up at five, home at six. That's the way of it."], ["The baker's boy", "m", "boy", "Bread! Fresh bread from Bramblehurst!", null, true], ["A woman at her pump", "f", "maid", "Frozen solid, the pump in our yard. I have to come to this one."]], -300, -14, 300, 14, { wander: 4, ok: function (x, z) { return Math.abs(z) > 6 && Math.abs(z) < 13.5; } });
}
if (!st.empty)
imwCrowd("ipfield", [["A shepherd with his crook", "m", "imvillager", whit ? "They'll be shorn in June." : "Folded them on the turnips. They'll do."], ["A hedger at his work", "m", "worker", "Laying the hedge, before the sap rises."], ["A ploughboy", "m", "boy", "Mr. Fearenside's horses. I mind them.", null, true]], -540, 40, -400, 110, { wander: 5 });
},
function (x, z) {
var n = imwFbm(x * 0.004, z * 0.004, 4), h = 18 + n * 22;
h += Math.sin(x / 260) * 8 + Math.cos(z / 300) * 6;
var ce = imwSmooth(120, 560, x) * imwSmooth(-200, 360, z);
h = h * (1 - ce) + (4 + n * 6) * ce;
var sd = z - (IMW_DN.sea - 60 * Math.sin(x / 240));
if (sd > -30) {
var t = Math.min(1, (sd + 30) / 40);
h = h * (1 - t) + (-3) * t;
}
return h;
},
function (G) {
var X = IMW_ROOMXZ.downs, R;
R = imwRoom(G, "stowinn", X.stowinn[0], X.stowinn[1], 9, 7, { wall: "render", floor: "planks", name: "the little inn at Port Stowe", beams: true });
imwBox(R.g, 4.4, 1.1, 0.8, imwMat("darkoak"), 1, 0, -2.2);
imwHearth(R.g, -4.3, 0, Math.PI / 2, { h: R.h });
for (var t = 0; t < 2; t++) {
imwTable(R.g, -1.6 + t * 3, 1.4, 1.2, 0.8, 0.74, {});
imwBench(R.g, -1.6 + t * 3, 2.2, 0, { w: 1.4, d: 0.4 });
}
imwPicture(R.g, -1, 2.2, -3.38, 0, 1.0, 0.7);
imwPicture(R.g, 2, 2.2, -3.38, 0, 0.8, 0.6);
R = imwRoom(G, "epiinn", X.epiinn[0], X.epiinn[1], 9, 8, { wall: "greenpaper", floor: "planks", name: "the parlour of Mr. Marvel's inn", beams: true, lightI: 0.75 });
imwBox(R.g, 4.4, 1.1, 0.8, imwMat("darkoak"), 1.2, 0, -2.6);
imwHearth(R.g, -4.3, 0, Math.PI / 2, { h: R.h });
imwTable(R.g, -1.4, 1.0, 1.4, 0.9, 0.74, {});
imwChair(R.g, -1.4, 1.8, Math.PI, { arm: 1 });
imwBox(R.g, 1.2, 2.0, 0.5, imwMat("darkoak"), 4.0, 0, 1.8);
imwBox(R.g, 0.05, 0.05, 0.05, imwMat("brass"), 3.7, 1.0, 2.06);
imwShelves(R.g, 4.3, -1.4, 2.0, 2.2, -Math.PI / 2, { jars: 1 });
R = imwRoom(G, "scott", X.scott[0], X.scott[1], 7, 6, { wall: "plaster", floor: "planks", name: "a fisherman's cottage", beams: true });
imwHearth(R.g, 0, -2.8, 0, { h: R.h, pot: 1 });
imwTable(R.g, 1.4, 0.6, 1.2, 0.8, 0.74, {});
imwBed(R.g, -2.4, 0.4, Math.PI / 2, {});
imwBox(R.g, 1.6, 0.06, 0.9, imwMat("rope"), 2.2, 0.02, -1.8);
R = imwRoom(G, "sshop", X.sshop[0], X.sshop[1], 8, 6, { wall: "ochre", name: "the chandler's shop", bare: 1 });
imwBox(R.g, 5, 1.0, 0.7, imwMat("oak"), 0, 0, -1.8);
imwShelves(R.g, -3.8, 0, 2.6, 2.4, Math.PI / 2, { jars: 1 });
imwShelves(R.g, 0, -2.86, 4.6, 2.4, 0, {});
imwSign(R.g, "ROPE · TAR · OILSKINS · LAMPS", 4, 0.4, 0, 2.7, -2.9, 0, { bg: "#1E2A3A", ink: "#F0E8C8" });
R = imwRoom(G, "sbarn", X.sbarn[0], X.sbarn[1], 10, 8, { wall: "planks", floor: "earth", name: "a barn on the downs", bare: 1, h: 5 });
for (t = 0; t < 5; t++)
imwBox(R.g, 1.2, 1.0, 1.0, imwLam(0xC8B070), -3.6 + t * 1.6, 0, -3);
imwCart(R.g, 1.6, 1.2, 0.3, { len: 2.4, w: 1.4 });
},
function (G) {
var lite = imwLite(), st = IMW.st, H = imwDnH, D;
imwFar(G, H, 0x7A9A5A);
imwTerrain(G, -820, -820, 1640, 1640, lite ? 18 : 10, H, imwMat("meadow"), function (x, z, y, c) {
var g = 0.84 + imwFbm(x * 0.03, z * 0.03, 2) * 0.2;
if (y < 0.4) {
c.setRGB(0.8, 0.74, 0.6);
return;
}
var chalk = imwFbm(x * 0.02, z * 0.02, 3);
if (y > 26 && chalk > 0.62) {
c.setRGB(0.86, 0.84, 0.78);
return;
}
c.setRGB(0.6 * g, 0.74 * g, 0.42 * g);
});
imwWater(G, 0, 700, 1700, 700, -1.2, 0x3A5A6A, 0.92);
IMW.water[IMW.water.length - 1].userData.fz = 0.4;
Object.keys(IMW_DN_ROADS).forEach(function (k) { imwStrip(G, IMW_DN_ROADS[k], k === "stow" || k === "quay" ? 8 : 5, H, imwMat(k === "quay" ? "cobble" : "gravel"), 0.06); });
D = function (key, p, nm) { var Rm = IMW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
imwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
imwTownHouse(G, 260, 30, 12, 9, 6.4, { wall: "render", roof: "tile" });
D("stowinn", { x: 260, z: 35.9, ry: Math.PI }, "The door of the little inn");
imwBench(G, 266, 38, 0, { w: 2.2, d: 0.5 });
imwSign(G, "THE SHIP", 2.2, 0.5, 260, H(260, 35) + 3.6, 34.6, 0, { bg: "#1E3A5A", ink: "#F0E8C8" });
imwTownHouse(G, 180, -64, 12, 9, 6.4, { wall: "brick", roof: "tile" });
D("epiinn", { x: 180, z: -58.1, ry: Math.PI }, st.epi ? "The door of Mr. Marvel's inn" : "The door of the inn on the hill");
var pz = -56, px = 192;
imwCyl(G, 0.12, 0.14, 5, imwMat("darkoak"), px, H(px, pz), pz, 8);
var bd = imwBox(G, 2.2, 1.4, 0.1, imwLam(0x5A3A22), px, H(px, pz) + 3.8, pz);
if (st.epi) {
imwCyl(G, 0.22, 0.24, 0.32, imwLam(0x1A1A1A), px - 0.4, H(px, pz) + 4.4, pz + 0.1, 14);
imwBox(G, 0.5, 0.12, 0.24, imwLam(0x1A1A1A), px + 0.5, H(px, pz) + 4.0, pz + 0.1);
imwBox(G, 0.5, 0.12, 0.24, imwLam(0x1A1A1A), px + 0.5, H(px, pz) + 3.6, pz + 0.1);
}
var hs = [[420, 130, 0.4], [450, 120, 0.4], [490, 150, 0.9], [500, 190, 1.2], [470, 210, 1.2], [560, 210, -1.9], [560, 250, -1.6], [500, 250, 1.6], [480, 290, 1.6], [580, 290, -1.6], [440, 180, 0.6], [600, 170, -2.2]];
hs.forEach(function (h, i) { imwTownHouse(G, h[0], h[1], 8 + (i % 3), 7, 6 + (i % 2), { wall: ["render", "brick", "plaster", "ochre"][i % 4], roof: i % 3 ? "slate" : "tile", ry: h[2] }); });
D("scott", { x: 494, z: 198, ry: -1.9 }, "The door of a fisherman's cottage");
D("sshop", { x: 551, z: 213, ry: 1.2 }, "The door of the chandler's shop");
imwChurch(G, 400, 240, { len: 20, w: 9, h: 8, tower: 4.5, th: 16, ry: Math.PI / 2 });
imwBox(G, 240, 2.2, 4, imwMat("greystone"), 530, H(530, 334) - 0.6, 334);
imwBox(G, 4, 2.2, 80, imwMat("greystone"), 648, H(648, 370) - 0.6, 370);
for (var b = 0; b < (lite ? 3 : 6); b++) {
var bx = 470 + b * 30, bz = 350 + (b % 2) * 12;
imwBoat(G, bx, -0.9, bz, 0.3 + b * 0.4, {});
}
for (var i = 0; i < (lite ? 4 : 8); i++)
imwLamp(G, 440 + i * 24, 150 + i * 20, H, { lit: !!st.night });
var dn = function (x, z) { return z < imwDnSeaZ(x) - 40 && Object.keys(IMW_DN_ROADS).every(function (k) { return imwPathD(x, z, IMW_DN_ROADS[k]) > 8; }) && !(x > 360 && x < 660 && z > 100); };
imwPlant(G, "tree", imwScatter(81, lite ? 50 : 130, -800, -800, 300, -120, dn, H, 0.9, 1.4), { col: 0x4A7A34 });
imwPlant(G, "tree", imwScatter(82, lite ? 20 : 60, -300, -200, -100, 0, dn, H, 0.9, 1.3), { col: 0x5A8A3A });
imwPlant(G, "bush", imwScatter(83, lite ? 80 : 220, -800, -800, 800, 400, dn, H, 0.4, 0.8), { col: 0x5A7A3A });
imwPlant(G, "grass", imwScatter(84, lite ? 140 : 380, -800, -800, 800, 400, dn, H, 0.8, 1.3), { col: 0xB8C888 });
if (!lite)
imwPlant(G, "flowers", imwScatter(85, 80, -600, -400, 200, 200, dn, H, 0.6, 1), { col: "#E8E070" });
imwPaling(G, [[-640, -10], [-200, -4]], H, { hedge: true });
imwPaling(G, [[-480, -60], [-160, -80]], H, { hedge: true });
imwTownHouse(G, -260, -160, 14, 10, 7, { wall: "planks", roof: "thatch" });
D("sbarn", { x: -260, z: -153.6, ry: Math.PI }, "The door of the barn");
for (i = 0; i < (lite ? 6 : 16); i++) {
var sx = -560 + i * 34 + (i % 3) * 12, sz = -260 - (i % 4) * 30;
imwSheep(G, sx, H(sx, sz), sz, i * 0.9);
}
imwPoles(G, IMW_DN_ROADS.downs, H, 46);
},
function (G) {
var st = IMW.st;
imwCrowd("stow", [["A fisherman mending nets", "m", "imsailor", "Fair weather for the boats today."], ["A fishwife", "f", "maid", "Fresh mackerel! Fresh this morning!"], ["A coastguard", "m", "imsailor", "Nothing on the water but the colliers."], ["A boy on the quay", "m", "boy", "I caught a crab! A big 'un!", null, true],
["A Port Stowe shopkeeper", "m", "gent", "They say money's been flying about. Out of the bank, in the air, by itself!"], ["A lady visitor", "f", "lady", "Port Stowe is so quiet. That's why we come."], ["An old sailor", "m", "imsailor", "Seen a lot of strange things at sea. Never an invisible man."], ["A girl selling shells", "f", "girl", "Shells, a farthing each!", null, true]], 420, 140, 620, 320, { wander: 6, ok: function (x, z) { return z < imwDnSeaZ(x) - 20; } });
imwCrowd("dnrd", [["A shepherd on the downs", "m", "imvillager", "Fine day for walking. Where you bound?"], ["A carter going to Bramblehurst", "m", "imvillager", "Whoa, there. Lovely day, eh?"], ["A labourer at the hedge", "m", "worker", "Hedging and ditching, all the year."]], -640, -80, -200, 20, { wander: 5 });
if (st.epi)
imwCrowd("epi", [["A Port Stowe regular", "m", "imsailor", "The landlord? A rare one for stories, if you buy him a drink."], ["A young barmaid", "f", "maid", "He's a fine landlord, Mr. Marvel. Very respected."]], 150, -50, 210, -30, { wander: 3 });
},
function (G) {
imwDnRooms(G);
imwDowns(G);
imwDnFolk(G);
var st = IMW.st;
[["sshop", "The chandler", "m", "imsailor", "Rope, tar, lamp oil. What do you need?"], ["scott", "A fisherman's wife", "f", "maid", "Mind the nets, they're drying."]].forEach(function (F, i) { var R = IMW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
imwOne("dnr" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 1.2, Math.PI, F[4], { y: R.y }); });
if (!st.epi) {
var Ri = IMW.rooms.filter(function (r) { return r.key === "stowinn"; })[0];
if (Ri)
imwOne("dnri", "The landlady of the Ship", "f", "maid", Ri.cx + 0.8, Ri.cz - 1.4, Math.PI, "Bread and cheese and a pint, love? Sit you down.", { y: Ri.y });
}
},
function (x, z) {
var n = imwFbm(x * 0.005, z * 0.005, 4), h = 4 + n * 6;
h += imwSmooth(300, -420, z) * 44 * Math.max(0, 1 - Math.abs(x) / 700);
h += imwSmooth(-300, -800, x) * 10;
var p = Math.hypot(x - IMW_BK.pit[0], z - IMW_BK.pit[1]);
if (p < 36)
h -= (1 - p / 36) * 7;
var sd = z - IMW_BK.sea;
if (sd > -40) {
var t = Math.min(1, (sd + 40) / 50);
h = h * (1 - t) + (-3) * t;
}
return h;
},
function (G) {
var X = IMW_ROOMXZ.burdock, R, st = IMW.st;
R = imwRoom(G, "kstudy", X.kstudy[0], X.kstudy[1], 9, 8, { wall: "damask", name: "Dr. Kemp's study", lightI: 0.85 });
imwShelves(R.g, -4.3, -1, 3.2, 2.6, Math.PI / 2, {});
imwShelves(R.g, -4.3, 2.2, 2.4, 2.6, Math.PI / 2, { jars: 1 });
imwTable(R.g, 1.6, -2.4, 2.0, 1.0, 0.78, { mat: "darkoak" });
imwChair(R.g, 1.6, -1.6, Math.PI, { arm: 1, seat: "leather" });
for (var p = 0; p < 6; p++)
imwBox(R.g, 0.22, 0.01, 0.3, imwLam(0xF4F0E4), 0.8 + p * 0.26, 0.79, -2.4);
var mic = imwCyl(R.g, 0.05, 0.07, 0.36, imwMat("brass"), 2.4, 0.78, -2.6, 10);
imwCandle(R.g, 0.6, 0.78, -2.7, { brass: 1 });
imwWindowIn(R.g, 0, 2.0, -3.88, 0, 2.0, 1.6, { sky: st.night ? 0x1A2238 : 0xA8C0D8 });
imwRug(R.g, 0, 0.6, 3.6, 2.6, 0x5A2A22);
imwHearth(R.g, 4.3, 0.6, -Math.PI / 2, { h: R.h });
if (st.blood)
imwBox(R.g, 0.3, 0.01, 0.2, imwLam(0x6A1010), -1.6, 0.01, 1.2);
R = imwRoom(G, "kbelv", X.kbelv[0], X.kbelv[1], 6, 6, { wall: "plaster", name: "the belvedere on Dr. Kemp's roof", bare: 1, lightI: 0.6 });
[-2.88, 2.88].forEach(function (z) { imwWindowIn(R.g, 0, 1.0, z, z < 0 ? 0 : Math.PI, 4.6, 1.8, { sky: st.night ? 0x141C30 : 0xB8D0E8 }); });
imwWindowIn(R.g, -2.88, 1.0, 0, Math.PI / 2, 4.6, 1.8, { sky: 0xB8D0E8 });
imwChair(R.g, 0, 0, Math.PI, {});
imwBox(R.g, 0.3, 1.2, 0.1, imwMat("brass"), 1.6, 0.8, -2.4);
R = imwRoom(G, "kbed", X.kbed[0], X.kbed[1], 8, 7, { wall: "bluepaper", name: "Dr. Kemp's spare bedroom", lightI: 0.7 });
imwBed(R.g, -2.4, -1, Math.PI / 2, {});
imwChair(R.g, 1.6, 0.6, Math.PI, {});
imwTable(R.g, 2.6, -2.4, 1.0, 0.6, 0.8, {});
imwWindowIn(R.g, 0, 2.0, -3.38, 0, 1.2, 1.4, { sky: 0xD8E0E8 });
if (st.blood) {
imwBox(R.g, 0.5, 0.02, 0.12, imwLam(0xE8E0D0), 0.4, 0.02, 0.8).rotation.y = 0.5;
imwBox(R.g, 0.12, 0.01, 0.12, imwLam(0x7A1010), 0.6, 0.025, 0.9);
}
R = imwRoom(G, "kdine", X.kdine[0], X.kdine[1], 8, 7, { wall: "greenpaper", name: "Dr. Kemp's dining-room", lightI: 0.85 });
imwTable(R.g, 0, 0, 2.4, 1.2, 0.76, { cloth: 0xF4F0E8 });
[-0.8, 0, 0.8].forEach(function (dx) { imwChair(R.g, dx, -0.9, 0, {}); imwChair(R.g, dx, 0.9, Math.PI, {}); });
imwShelves(R.g, -3.8, 0, 2.4, 2.0, Math.PI / 2, { jars: 1 });
imwHearth(R.g, 3.8, 0, -Math.PI / 2, { h: R.h });
if (st.siege) {
imwBox(R.g, 1.6, 1.6, 0.1, imwLam(0x3A2A1A), 0, 1.0, -3.3);
}
R = imwRoom(G, "kkitch", X.kkitch[0], X.kkitch[1], 8, 7, { wall: "plaster", floor: "cobble", name: "Dr. Kemp's kitchen", bare: 1 });
imwHearth(R.g, 0, -3.2, 0, { h: R.h, pot: 1 });
imwTable(R.g, 0, 0.4, 2.0, 1.0, 0.8, {});
imwShelves(R.g, 3.8, 0, 2.6, 2.2, -Math.PI / 2, { jars: 1 });
R = imwRoom(G, "cricket", X.cricket[0], X.cricket[1], 11, 8, { wall: "render", floor: "planks", name: "the bar of the Jolly Cricketers", beams: true });
imwBox(R.g, 6, 1.1, 0.8, imwMat("darkoak"), 0.6, 0, -2.6);
for (var t = 0; t < 5; t++)
imwCyl(R.g, 0.3, 0.3, 0.7, imwMat("oak"), -2 + t * 1.2, 1.1, -3.4, 10);
imwHearth(R.g, -5.3, 0.6, Math.PI / 2, { h: R.h });
for (t = 0; t < 2; t++) {
imwTable(R.g, -2 + t * 3.6, 1.4, 1.4, 0.8, 0.74, {});
imwBench(R.g, -2 + t * 3.6, 2.2, 0, { w: 1.6, d: 0.4 });
}
imwSign(R.g, "JOLLY CRICKETERS · ALES & STOUT", 4, 0.45, 0.6, 2.5, -3.86, 0, { bg: "#2A3A1A", ink: "#F0D890" });
imwBox(R.g, 1.0, 2.2, 0.08, imwMat("darkoak"), -3.6, 0, -3.86);
R = imwRoom(G, "police", X.police[0], X.police[1], 9, 7, { wall: "ochre", name: "Burdock police station", bare: 1, lightI: 0.9 });
imwBox(R.g, 4, 1.1, 0.7, imwMat("darkoak"), 0, 0, -2.2);
imwBench(R.g, -2.8, 1.6, 0, { w: 2.4, d: 0.5 });
imwSign(R.g, "BURDOCK POLICE", 3, 0.5, 0, 2.6, -3.36, 0, { bg: "#1E2A4A", ink: "#F4F0E0" });
R = imwRoom(G, "bvilla", X.bvilla[0], X.bvilla[1], 9, 7, { wall: "bluepaper", name: "a villa on the hill road" });
imwTable(R.g, 0, 0, 1.8, 1.0, 0.76, { cloth: 0xF4F0E8 });
imwChair(R.g, -0.6, -0.8, 0, {});
imwHearth(R.g, -4.3, 0, Math.PI / 2, { h: R.h });
imwPicture(R.g, 0, 2.4, -3.38, 0, 1.2, 0.8);
R = imwRoom(G, "lodge", X.lodge[0], X.lodge[1], 7, 6, { wall: "plaster", floor: "planks", name: "the lodge at Lord Burdock's gate", beams: true });
imwHearth(R.g, 0, -2.8, 0, { h: R.h, pot: 1 });
imwTable(R.g, 1.4, 0.6, 1.2, 0.8, 0.74, {});
imwBed(R.g, -2.4, 0.4, Math.PI / 2, {});
imwInDoor("kstudy", "kbelv", 3.6, -3.2, "The stair up to the belvedere", "go up");
imwInDoor("kstudy", "kbed", -3.6, 3.0, "The door to the spare bedroom");
imwInDoor("kstudy", "kdine", 3.6, 3.0, "The stairs down to the dining-room", "go down");
imwInDoor("kdine", "kkitch", -3.0, -2.6, "The kitchen door");
},
function (G) {
var lite = imwLite(), st = IMW.st, H = imwBkH, D;
imwFar(G, H, 0x6A8A4A);
imwTerrain(G, -820, -820, 1640, 1640, lite ? 18 : 10, H, imwMat("meadow"), function (x, z, y, c) {
var g = 0.84 + imwFbm(x * 0.03, z * 0.03, 2) * 0.2;
if (y < 0.4) {
c.setRGB(0.8, 0.74, 0.6);
return;
}
var pd = Math.hypot(x - IMW_BK.pit[0], z - IMW_BK.pit[1]);
if (pd < 36) {
c.setRGB(0.76, 0.66, 0.48);
return;
}
c.setRGB(0.6 * g, 0.76 * g, 0.42 * g);
});
imwWater(G, 0, 800, 1700, 700, -1.2, 0x3A5A6A, 0.92);
Object.keys(IMW_BK_ROADS).forEach(function (k) { imwStrip(G, IMW_BK_ROADS[k], k === "high" ? 14 : (k === "hinton" ? 6 : 8), H, imwMat(k === "high" || k === "harbour" ? "setts" : "gravel"), 0.06); });
if (!lite) {
[-0.8, 0.8].forEach(function (o) { imwStrip(G, IMW_BK_ROADS.high.map(function (p) { return [p[0], p[1] + o]; }), 0.12, H, imwMat("iron"), 0.09); });
}
D = function (key, p, nm) { var Rm = IMW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
imwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
var K = IMW_BK.kemp;
imwVilla(G, K[0] - 20, K[1] - 20, { w: 13, d: 11, ry: 0, brick: 0xB86A4E, h: 8 });
var kd = imwVillaDoor(K[0] - 20, K[1] - 20, { w: 13, d: 11 });
D("kstudy", kd, "The front door of Dr. Kemp's house");
var by = H(K[0] - 20, K[1] - 20) + 8;
imwBox(G, 4, 3, 4, imwMat("pane"), K[0] - 20, by, K[1] - 20);
imwBox(G, 4.4, 0.3, 4.4, imwMat("slate"), K[0] - 20, by + 3, K[1] - 20);
if (st.siege)
for (var w = 0; w < 4; w++)
imwBox(G, 1.6, 1.6, 0.1, imwLam(0x3A2A1A), K[0] - 26 + w * 4, H(K[0] - 26 + w * 4, K[1] - 14) + 2, K[1] - 14.4);
imwPaling(G, [[K[0] - 44, K[1] + 2], [K[0] - 4, K[1] + 2], [K[0] + 4, K[1] + 2], [K[0] + 4, K[1] - 44], [K[0] - 44, K[1] - 44], [K[0] - 44, K[1] + 2]], H, { hedge: true });
if (!lite)
imwPlant(G, "flowers", imwScatter(91, 50, K[0] - 40, K[1] - 40, K[0] - 2, K[1], function (x, z) { return Math.hypot(x - K[0] + 20, z - K[1] + 20) > 10; }, H, 0.7, 1.1), { col: "#E890B0" });
for (var i = 0; i < 10; i++) {
var vz = -300 + i * 36, vx = i % 2 ? 28 : -28;
imwVilla(G, vx, vz, { w: 9 + (i % 3), d: 8, ry: i % 2 ? -Math.PI / 2 : Math.PI / 2, brick: [0xB86A4E, 0xA85A42, 0xC8806A][i % 3] });
}
D("bvilla", imwVillaDoor(-28, -264, { w: 10, d: 8, ry: Math.PI / 2 }), "The door of a villa on the hill");
imwTownHouse(G, 0, 96, 16, 10, 8, { wall: "render", roof: "slate", trim: "oak" });
D("cricket", { x: 0, z: 102.4, ry: 0 }, "The door of the Jolly Cricketers");
imwSign(G, "THE JOLLY CRICKETERS", 4, 0.7, 0, H(0, 101) + 5.2, 101.2, 0, { bg: "#2A3A1A", ink: "#F0D890" });
imwCart(G, 24, 132, 0, { seat: true, len: 2.4, w: 1.5, hcol: 0x2A2A2A });
imwCart(G, 34, 132, 0, { seat: true, len: 2.4, w: 1.5, hcol: 0x2A2A2A });
var tram = new THREE.Group();
tram.position.set(-60, H(-60, 141), 141);
tram.rotation.y = Math.PI / 2;
G.add(tram);
imwBox(tram, 2.2, 2.6, 8, imwLam(0x6A1A1A), 0, 0.4, 0);
imwBox(tram, 2.3, 0.2, 8.2, imwLam(0xE8E0C8), 0, 3.0, 0);
imwBox(tram, 2.24, 0.9, 7.6, imwMat("pane"), 0, 1.8, 0);
for (i = 0; i < 2; i++)
imwCyl(tram, 0.4, 0.4, 2.3, imwMat("iron"), 0, 0.4, i ? 2.6 : -2.6, 12).rotation.z = Math.PI / 2;
var hz = function (x) { return x < 0 ? 170 + (x + 260) * (-30 / 260) : (x < 260 ? 140 + x * (30 / 260) : 170 + (x - 260) * (30 / 140)); };
var NAMES = [["DRAPER", "CHEMIST", "GROCER", "BOOTMAKER"], ["BUTCHER", "NEWSAGENT", "TOBACCONIST", "POST OFFICE"], ["HATTER", "CORN MERCHANT", "SADDLER", "WATCHMAKER"], ["DAIRY", "TEA ROOMS", "OUTFITTER", "PRINTER"], ["HAIRDRESSER", "CONFECTIONER", "PAWNBROKER", "GREENGROCER"], ["COAL OFFICE", "WINE & SPIRITS", "FURNISHER", "MUSIC SELLER"]], ni = 0;
[-230, -180, -130, -80, -36, 40, 80, 180, 220, 300, 350].forEach(function (x, i) { var z = hz(x); if (!(x > -20 && x < 20))
imwShops(G, x, z - 17, 4, { names: NAMES[(ni++) % NAMES.length] }); if (!(x > 0 && x < 70) && !(x > 90 && x < 150) && !(x > 200 && x < 260))
imwShops(G, x, z + 17, 4, { ry: Math.PI, names: NAMES[(ni++) % NAMES.length] }); });
imwTownHouse(G, 120, 196, 14, 10, 8, { wall: "brick", roof: "slate", ry: Math.PI });
D("police", { x: 120, z: 189.6, ry: 0 }, "The door of the police station");
imwSign(G, "POLICE", 2, 0.5, 120, H(120, 190) + 3.4, 190.9, Math.PI, { bg: "#1E2A4A", ink: "#F4F0E0" });
imwShops(G, 240, 206, 4, { ry: Math.PI, names: ["LONDON & COUNTY BANK", "FISHMONGER", "CHANDLER", "STATIONER"] });
for (i = 0; i < (lite ? 6 : 12); i++) {
var lx = -260 + i * 48;
imwLamp(G, lx, i % 2 ? 150 : 190, H, { lit: !!st.night });
}
imwBox(G, 6, 1.2, 120, imwMat("planks"), IMW_BK.pier[0], -0.2, IMW_BK.pier[1]);
for (i = 0; i < 12; i++)
imwCyl(G, 0.2, 0.2, 4, imwMat("darkoak"), IMW_BK.pier[0] + (i % 2 ? 2.6 : -2.6), -3.4, IMW_BK.pier[1] - 55 + i * 10, 8);
for (var b = 0; b < (lite ? 3 : 6); b++)
imwBoat(G, 60 + b * 26, -0.9, 440 + (b % 2) * 14, 0.4 + b * 0.3, {});
imwBox(G, 200, 2, 4, imwMat("greystone"), 80, H(80, 430) - 0.6, 430);
imwPaling(G, [[-500, -40], [-500, -300], [-800, -300]], H, {});
imwTownHouse(G, -490, -70, 8, 7, 5.6, { wall: "render", roof: "tile", ry: -Math.PI / 2 });
D("lodge", { x: -485.1, z: -70, ry: Math.PI / 2 }, "The lodge door");
imwPlant(G, "rock", imwScatter(92, lite ? 8 : 20, IMW_BK.pit[0] - 30, IMW_BK.pit[1] - 30, IMW_BK.pit[0] + 30, IMW_BK.pit[1] + 30, function (x, z) { return Math.hypot(x - IMW_BK.pit[0], z - IMW_BK.pit[1]) < 30; }, H, 0.4, 0.9), { mat: imwMat("gravel"), keepAll: true });
var fld = function (x, z) { return z < IMW_BK.sea - 40 && Object.keys(IMW_BK_ROADS).every(function (k) { return imwPathD(x, z, IMW_BK_ROADS[k]) > 10; }) && !(Math.abs(x) < 60 && z > -420 && z < 120) && !(x > -300 && x < 420 && z > 100 && z < 240) && Math.hypot(x - IMW_BK.pit[0], z - IMW_BK.pit[1]) > 40; };
imwPlant(G, "tree", imwScatter(93, lite ? 80 : 220, -800, -800, 800, 420, fld, H, 0.8, 1.4), { col: 0x4A7A34 });
imwPlant(G, "bush", imwScatter(94, lite ? 60 : 180, -800, -800, 800, 420, fld, H, 0.4, 0.8), { col: 0x5A7A3A });
imwPlant(G, "grass", imwScatter(95, lite ? 140 : 380, -800, -800, 800, 420, fld, H, 0.8, 1.3), { col: 0xB8C888 });
imwPoles(G, IMW_BK_ROADS.hinton, H, 46);
},
function (G) {
var st = IMW.st;
if (!st.terror) {
imwCrowd("bkh", [["A tram conductor", "m", "porter", "All aboard for Port Burdock harbour!"], ["A cabman on the rank", "m", "cabby", "Cab, sir? Station, a shilling."], ["A lady shopping", "f", "lady", "They say the Invisible Man is coming this way. I don't believe a word."], ["A newsboy", "m", "newsboy", "Invisible Man at large! Read all about it!", null, true],
["A bank clerk", "m", "gent", "Port Stowe bank was robbed, did you hear? Notes flying in the air!"], ["A nursemaid", "f", "maid", "Hold my hand, Master Charles."], ["A fishmonger", "m", "worker", "Fresh fish! Up from the harbour this morning!"], ["A schoolboy", "m", "boy", "I'm going to catch him! With flour!", null, true], ["A curate", "m", "clergy", "Strange days. Strange days indeed."], ["A delivery boy", "m", "boy", "Groceries for the doctor on the hill.", null, true]], -240, 130, 300, 200, { wander: 7, ok: function (x, z) { return true; } });
imwCrowd("bkharb", [["A boatman", "m", "imsailor", "Trip round the bay, sir? Sixpence."], ["A fisherman", "m", "imsailor", "Herring's running well."], ["A lady on the pier", "f", "lady", "The sea air does one so much good."]], 60, 360, 200, 440, { wander: 5 });
}
if (st.terror) {
imwCrowd("bkt", [["A policeman on the corner", "m", "police", "Keep indoors, sir! He's about!"], ["A man with a shotgun", "m", "imvillager", "Let him come near me, that's all."], ["A woman bolting her door", "f", "maid", "Go home! Lock your doors!"]], -120, 120, 160, 190, { wander: 5 });
}
if (st.hunt) {
imwCrowd("bkhunt", [["A labourer with a spade", "m", "worker", "Spread out! Feel about for him!"], ["A man with a dog", "m", "imvillager", "The dog'll smell him!"], ["A mounted policeman", "m", "police", "Every road watched, every house shut."], ["A young man with a stick", "m", "imvillager", "He's along here, I tell you!"]], -600, -220, -360, 80, { wander: 8 });
}
imwCrowd("bkhill", [["A gardener at a villa", "m", "worker", "The doctor? Nice gentleman. Keeps himself to himself."], ["A maid shaking a mat", "f", "maid", "Morning, sir."]], -40, -300, 40, -120, { wander: 4 });
},
function (G) {
imwBkRooms(G);
imwBurdock(G);
imwBkFolk(G);
var st = IMW.st;
[["police", "A police sergeant", "m", "police", "Colonel Adye's out. Can I help you?"], ["lodge", "The lodge-keeper's wife", "f", "maid", "His lordship's away, sir. The park's shut."], ["bvilla", "A lady at her tea", "f", "lady", "Oh! I didn't hear the bell. Are you from the doctor's?"]].forEach(function (F, i) { var R = IMW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R && !(st.terror && F[0] === "lodge"))
imwOne("bkr" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 1.2, Math.PI, F[4], { y: R.y }); });
},
function () {
var S = imwSc(), k = S.env;
if (IMW.envK && IMW_ENV[IMW.envK])
k = IMW.envK;
if (IMW.night)
k = IMW.envK === "moon" || IMW.envK === "storm" ? IMW.envK : "night";
if (imwInRoom()) {
var L = imwLocalSc(), R = imwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
var E = {}, B = IMW_ENV[k] || IMW_ENV.lake;
for (var q in B)
E[q] = B[q];
if (imwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (IMW.moving || IMW.ride)
return true;
var S = imwSc(), D = IMW_SCN[IMW.sc];
if (!D)
return false;
if (imwInRoom()) {
if (imwSolidAt(x, z, feet))
return true;
return imwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (imwSolidAt(x, z, feet))
return true;
var fl = imwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = imwLand(x, z);
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
IMW.t += dt;
if (!IMW.built || !IMW.scG)
return;
var S = imwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
IMW.inRm = imwInRoom();
IMW.et = (IMW.et || 0) + dt;
if (IMW.et > 0.8) {
IMW.et = 0;
worldEnv(imwEnvNow());
}
var flow = IMW.t * 0.03;
IMW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
IMW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (IMW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(IMW.t * 3 + i * 2)) * 0.3; f.rotation.y = IMW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(IMW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(IMW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, IMW.inRm ? -500 : imwLand(L.x, L.z), L.z);
}
});
(IMW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
(IMW.smoke || []).forEach(function (g) { g.children.forEach(function (m, i) { m.position.x += Math.sin(IMW.t * 0.1 + i) * dt * 0.4; m.rotation.y += dt * 0.02; }); });
IMW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return imwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof imbTick === "function")
try {
imbTick(dt, L);
}
catch (e) {
if (!IMW.e1) {
IMW.e1 = 1;
if (window.console)
console.warn("[invisible-man] book", e);
}
}
if (!IMW.bannerBook)
worldBanner("<b>🕶️ " + IMW_NAME + "</b> · " + esc(imwPlaceName(L)) + (IMW.night ? " · night" : ""));
IMW.pt = (IMW.pt || 0) + dt;
if (IMW.pt < 0.15)
return;
IMW.pt = 0;
if (IMW.moving || IMW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
IMW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof imbTalk === "function" && imbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
IMW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : imwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof imbSpot === "function")
imbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof imbIdlePrompt === "function")
imbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = imwAtPt(opt.at) || (typeof imbStartAt === "function" && imbStartAt()) || imwAtPt("road");
try {
imwCrxKinds();
if (typeof crxWarm === "function" && !imwLite())
crxWarm(["horse", "imdark"]);
}
catch (e) { }
imwScene(A.sc);
var S = IMW_SC[A.sc], y = A.y != null ? A.y : imwGround(A.x, A.z);
camera.position.set(IMW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
IMW.moving = false;
IMW.ride = null;
IMW.inRm = imwInRoom();
worldEnv(imwEnvNow());
setStatus("🕶️ <b>" + IMW_NAME + ".</b> H. G. Wells's book, the whole of it: Iping and the Coach and Horses, the downs and Port Stowe, Burdock and Dr. Kemp's house on the hill. <b>Press E</b> for the book.");
if (typeof imbEnter === "function")
try {
imbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[invisible-man] enter", e);
}
},
function () {
imwSceneDrop();
for (var k in IMW.mats) {
var m = IMW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in IMW.tex) {
var x = IMW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in IMW_GEO) {
try {
IMW_GEO[g].dispose();
}
catch (e) { }
}
IMW.mats = {};
IMW.tex = {};
IMW_GEO = {};
IMW.built = false;
IMW.G = null;
IMW.lights = 0;
},
function (P, n, sp) {
var lite = imwLite();
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
IMW.fx.push(p);
return p;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = IMW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = IMW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: IMW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return imbPos(at.at);
var C = IMB_CH[imbS().ch], i = imbS().s, c = C && C.cast ? C.cast.filter(function (d) { return imbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? imbPos(c.at) : null;
}
if (at.spot) {
var Sp = IMW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: IMW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return imbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || IMW.sc, x: at.x, z: at.z, y: at.y };
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
if (IMB.beam && IMB.beam.parent === IMW.scG)
return IMB.beam;
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
IMW.scG.add(g);
IMB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return imwLam(c); }, m;
switch (kind) {
case "load":
m = imwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
imwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = imwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = imwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = imwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = imwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = imwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
imwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = imwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
imwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), imwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = imwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "paper":
m = imwBox(g, 0.34, 0.03, 0.46, M(0xE8E2D0), 0, 0.02, 0);
imwBox(g, 0.3, 0.005, 0.08, M(0x2A2A2A), 0, 0.04, -0.16);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M(0xC8945A));
m.scale.set(1.5, 0.8, 1);
m.position.y = 0.1;
g.add(m);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 10), imwShine(0x1A3A1A, 0.2, 0));
m.position.y = 0.15;
g.add(m);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 8), imwShine(0x1A3A1A, 0.2, 0));
nk.position.y = 0.35;
g.add(nk);
break;
case "tin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), imwShine(0xA8A8A0, 0.4, 0.6));
m.position.y = 0.05;
g.add(m);
break;
case "coin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 12), imwShine(0xE8C060, 0.3, 0.9));
m.position.y = 0.01;
g.add(m);
break;
case "spade":
m = imwBox(g, 0.05, 0.05, 1.0, M(0x6A4A2A), 0, 0.03, 0);
imwBox(g, 0.2, 0.02, 0.26, imwShine(0x8A8A88, 0.4, 0.7), 0, 0.02, 0.6);
break;
case "post":
m = imwBox(g, 0.08, 1.1, 0.08, M(0xE8E0CC), 0, 0, 0);
break;
case "skin":
m = imwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = imwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = imwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
imwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = imwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
imwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
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
m = imwBox(g, 0.3, 0.06, 0.06, M(0x9A7A5A), 0, 0.03, 0);
break;
case "lantern":
m = imwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), imwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = imwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
imwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), imwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), imwMat("glass"));
m.position.y = 0.08;
g.add(m);
imwCyl(g, 0.02, 0.02, 0.1, imwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = imwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = imwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
imwFire(g, 0, 0.08, 0, 0.4);
break;
case "chain":
m = imwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
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
if (!P || !IMW.scG || P.sc !== IMW.sc)
return null;
var g = imbItemMesh(kind), y = P.y != null ? P.y : imwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
IMW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = imwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (IMB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = IMW.spots.indexOf(I.S); if (j >= 0)
IMW.spots.splice(j, 1); IMB.items = IMB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.imb = 1;
IMB.items.push(I);
return I;
},
function (k) {
if (IMB.tuneKey === k)
return;
IMB.tuneKey = k;
var old = IMB.tune;
IMB.tune = null;
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
if (!k || !IMB_TUNES[k])
return;
try {
var A = new Audio(IMB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
IMB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (IMB.tune !== A) {
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
if (IMB.text)
return fn(IMB.text);
if (IMB.textWait) {
IMB.textWait.push(fn);
return;
}
IMB.textWait = [fn];
var done = function (B) { IMB.text = B; var w = IMB.textWait; IMB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/invisible-man/invisible-man.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
imbText(function (B) {
var C = IMB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + imbNum(i) + ". " + esc(C.t) + "</h3>" + IMB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(imbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); IMB.readOpen = 0; IMB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = imbS(), C = IMB_CH[S.ch];
if (!C)
return;
IMB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
IMB.readAsk = 0;
IMB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "The Invisible Man") + "</div><h3 style='margin:4px 0'>" + imbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? imbOpening(T).map(imbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); IMB.readOpen = 0; imbStepDone(); }, all: function () { imbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Wells's own words, all of it");
b += imbKeeperBtns(fns);
worldCard(b, fns);
};
imbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
IMB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); imbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = imbS(), C = IMB_CH[S.ch];
if (!C)
return;
imbItemsClear();
imbCastClear();
IMB.hold = 0;
var go = function () { imbWorldState(); imbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[imb] setup", S.ch, e);
} imbTune(C.tune || null); imbStepBegin(); };
if (place && C.start) {
var P = imbPos(C.start);
if (P && WLD.on === IMW_KEY) {
imwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (IMW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = imbStep();
imbItemsClear();
IMB.hold = 0;
IMB.puzOpen = 0;
if (!b)
return;
b._key = imbKey();
imbWorldState();
try {
if (b.on)
b.on(imbS().f);
}
catch (e) {
if (window.console)
console.warn("[imb] on", e);
}
if (b.k === "read") {
imbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { IMB.rew[k] = 0; });
if (b.k === "find") {
var Pf = imbPos(b.at);
if (Pf && Pf.sc === IMW.sc)
imbItemAdd(b.item, Pf, b.name, b.verb, function () { if (imbKey() === b._key)
imbStepDone(); });
}
if (b.k === "gather") {
var P = imbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(imbS().ch * 97 + imbS().s * 13 + 7);
IMB.got = 0;
if (P && P.sc === IMW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = imwGround(Q.x, Q.z, (P.y != null ? P.y : imwLand(P.x, P.z)) + 1);
imbItemAdd(b.item, Q, b.name, b.verb, function () { if (imbKey() !== b._key)
return; IMB.got++; try {
if (b.each)
b.each(IMB.got);
}
catch (e) { } if (IMB.got < n) {
imbSay((b.eachSay || "Got one.") + " " + IMB.got + " of " + n + ".");
return;
} imbStepDone(); });
}
}
if (b.h)
imbSay("<b>" + esc(IMB_CH[imbS().ch].t) + ".</b> " + b.h);
},
function (b) {
IMB.puzOpen = 1;
IMB.puzT = performance.now();
var k = imbKey(), fns = {}, h = IMB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
imbSay(b.yes);
if (imbKey() === k)
imbStepDone();
return;
}
imbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (imbKey() === k)
IMB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = imbS(), C = IMB_CH[S.ch], b = imbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[imb] done", e);
}
if (b.say)
imbSay(b.say);
S.s++;
if (window.IMB_LOG)
IMB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= IMB_CH.length - 1) {
S.done = 1;
S.s = 0;
imbSave();
imbItemsClear();
imbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
imbSave();
var nx = IMB_CH[S.ch];
setTimeout(function () { try {
imbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[imb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
imbSave();
imbStepBegin();
},
function () {
imbTune("end");
var S = imbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + imQ("So he lapses into a dream, the undying wonderful dream of his life.") + "</p><p style='font-size:12px;opacity:.75'>H. G. Wells, The Invisible Man (1897), the Epilogue</p><p>You have seen the bandaged stranger come out of the snow to the Coach and Horses, the bottles unpacked, the furniture go mad, the unveiling in the parlour; walked the downs with Thomas Marvel and the voice at his ear; sat on the bench at Port Stowe; heard Griffin tell his whole story in Kemp's house on the hill; and joined the hunt for him to its end before the Jolly Cricketers. Your keepsakes:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; imbSave(); imbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "The road into Iping, in the snow");
if (typeof bhnOpen === "function") {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen("invisible"); };
}
worldCard(b, fns);
},
function (c) {
var C = IMB.cast[c.key || c.k];
if (imbCastLive(C))
return C;
var P = imbPos(c.at);
if (!P || P.sc !== IMW.sc)
return null;
var F = IMW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute, name: c.name };
var Pp;
if (F.name && !c.dress)
Pp = imwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = imwDressed("imb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : imwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
IMW.scG.add(g);
Pp = { g: g, y: y, o: {} };
IMW.people.push(Pp);
if (c.name && !c.mute)
imwTalk(Pp, c.name, imwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
IMB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return IMB.cast[c.key || c.k];
},
function () {
var C = IMB_CH[imbS().ch];
if (!C || !C.cast)
return;
var idx = imbS().s;
var on = {};
C.cast.forEach(function (c) { var key = c.key || c.k; if (!(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until) && !on[key])
on[key] = c; });
C.cast.forEach(function (c) {
var key = c.key || c.k, want = on[key], have = IMB.cast[key];
if (!want) {
if (have)
imbCastHide(key);
return;
}
if (want !== c)
return;
if (have && have.c && have.c !== c)
imbCastHide(key);
if (!imbCastLive(IMB.cast[key]))
imbCastAdd(c);
});
},
function () {
var b = imbStep(), key = "pass", have = IMB.cast[key];
var want = b && b.k === "talk" && b.at && b.at.at ? b : null, P = want ? imbPos(want.at.at) : null;
if (!want || !P || P.sc !== IMW.sc) {
if (have)
imbCastHide(key);
return;
}
if (have && have.b === want && imbCastLive(have))
return;
if (have)
imbCastHide(key);
if (!want.pass && IMW.talk.some(function (T) { return T.name === want.who && T.p && T.p.g && T.p.g.parent; }))
return;
var pa = want.pass || {}, nm = String(want.who), fem = /woman|lady|girl|wife|Mrs|Miss|mother|maid/i.test(nm), kid = pa.child || /boy|girl|child/i.test(nm);
var dr = pa.dress || (/hussar|cavalry|lieutenant/i.test(nm) ? "imhussar" : (/soldier|gunner|artillery|sergeant/i.test(nm) ? "imarty" : (/sailor|boatman|waterman|captain/i.test(nm) ? "imsailor" : (fem ? (kid ? "girl" : "maid") : (kid ? "boy" : (/milkman|carter|labourer|porter|landlord|man with/i.test(nm) ? "worker" : "gent"))))));
var Pp = imwOne("pass" + imbS().ch + "_" + imbS().s, want.who, pa.sex || (fem ? "f" : "m"), dr, P.x, P.z, pa.ry || 0, pa.greet || "", { y: P.y, child: !!kid, persona: IMP.townfolk });
if (Pp)
IMB.cast[key] = { g: Pp.g, P: Pp, c: { k: key }, b: want };
},
function () {
if (!IMW.scG)
return;
imbCastClear();
var S = imbS(), C = IMB_CH[S.ch];
if (S.started && !S.done && C && C.cast && imbCastHere(C)) {
imbCastTick();
return;
}
(IMB_FOLK_AT[IMW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = imwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
IMB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!imbActive())
return false;
var b = imbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = imbKey();
worldPrompt(null);
var next = function () { if (imbKey() === k)
imbStepDone(); };
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
worldCard(IMB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
IMB.wt += dt;
if (IMB.wt > 0.5) {
IMB.wt = 0;
if (imbActive() && imbCastHere(IMB_CH[imbS().ch]))
imbCastTick();
if (imbActive())
imbPassTick();
var S0 = imbS();
S0.seen[IMW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!imbActive()) {
if (IMB.beam)
IMB.beam.visible = false;
IMW.bannerBook = false;
return;
}
var S = imbS(), b = imbStep(), t = IMW.t, feet = camera.position.y - 1.72;
IMB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? imbPos(b.at) : null, here = P && P.sc === IMW.sc, bm = imbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + imbScName(P.sc) + ": press E for the book)";
if (here && !IMW.moving && !IMW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : imwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = imbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !IMW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (IMB.readAsk)
break;
if (!IMB.readOpen)
imbChapterCard();
else {
IMB.readOpen = 0;
imbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
imbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
IMB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(IMB.hold, dt);
}
catch (e) { }
if (IMB.hold >= (b.sec || 8)) {
imbStepDone();
return;
}
}
else
IMB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return IMB.rew[k]; })) {
imbStepDone();
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
imbStepDone();
return;
}
break;
}
case "puzzle":
if ((!IMB.puzOpen || performance.now() - (IMB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
imbPuzzleCard(b);
break;
}
}
var C = IMB_CH[S.ch], prog = b && b.k === "hold" && IMB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - IMB.hold)) + " s)" : b && b.k === "gather" ? " (" + (IMB.got || 0) + " of " + (b.n || 3) + ")" : "";
IMW.bannerBook = true;
worldBanner("⚡ <b>" + imbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = imbS(), C = IMB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>H. G. Wells · The Invisible Man (1897), the whole book</div><h3 style='margin:4px 0'>🕶️ The Invisible Man</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + imbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((imbStep() || {}).h || "") + "</p>";
var st = imbStep(), P = st && st.at ? imbPos(st.at) : null, Cs = imbPos(C.start);
var to = P && P.sc !== IMW.sc ? P : (!P && Cs && Cs.sc !== IMW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + imbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); imwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { imbPopulate(); imbStepBegin(); }); };
}
}
else
b += "<p>West Sussex, February 1897. A stranger walks out of the snow into the Coach and Horses at Iping, muffled from head to foot, his face hidden in bandages behind blue spectacles. All twenty-eight chapters and the Epilogue, every one played: Mrs. Hall's inn and the bottles, the burglary at the vicarage, the unveiling, Thomas Marvel on the downs, Port Stowe, Dr. Kemp's house above Burdock and Griffin's whole story, the reign of terror, the siege, and the hunter hunted. About three and a half hours at your own pace; your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the road into Iping, in the snow", S.started ? "Back to where you were" : "\"The stranger came early in February, one wintry day\"");
fns.go = function () { worldCard(null); imbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; imbSave(); imbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(IMW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(IMW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (IMW_SCN[k].start || { x: 0, z: 0 }); imwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, imbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += imbKeeperBtns(fns);
worldCard(b, fns);
},
function (C) {
var R = function (v) { return typeof v === "string" ? imbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
IMB_CH.push(C);
return C;
},
function (st, s) {
var v = function (k) { return imbStV(st[k]); }, reb = false;
Object.keys(IMW.st).forEach(function (k) { if (!(k in st) && IMW.st[k] != null && IMW.st[k] !== false) {
delete IMW.st[k];
if (IMW_LIVEK.indexOf(k) < 0)
reb = true;
} });
Object.keys(st).forEach(function (k) { if (k === "env" || k === "night" || k === "nightUntil" || k === "nightFrom")
return; var nv = v(k); if (IMW.st[k] !== nv) {
IMW.st[k] = nv;
if (IMW_LIVEK.indexOf(k) < 0)
reb = true;
} });
if (typeof imwLiveState === "function")
try {
imwLiveState();
}
catch (e) { }
if (reb && !IMW.rebuilding && IMW.scBuilt) {
IMW.rebuilding = 1;
try {
imwRebuild();
}
catch (e) { }
IMW.rebuilding = 0;
}
}
];
});
