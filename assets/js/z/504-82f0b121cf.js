/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(504, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (MRW.tex[k])
return MRW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = mrwLite();
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
return (MRW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (MRW.mats[k])
return MRW.mats[k];
var own = name.slice(0, 2) === "b:", map = mrwPhotoTex(name, mpt || 2), m;
if (mrwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = mrwPhotoTex(name, mpt || 2, true);
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
return (MRW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return mrwM(k, function () {
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
return mrwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return mrwCanvas("bamboo", 64, 256, function (x, W, H) {
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
mrwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return mrwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return mrwCanvas("tuft", 128, 64, function (x, W, H) {
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
return mrwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return mrwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
mrwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return mrwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = MRW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / MRW_CELL) + "," + Math.floor(z / MRW_CELL)];
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
p = dlnPerson("mrw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("mrw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || MRW.scG || MRW.G).add(p);
var P = { g: p, y: y, o: o };
MRW.people.push(P);
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
MRW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (mrwLite() ? 8 : 4)));
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
var lite = mrwLite(), leaf = mrwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
mrwInst(P, mrwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), mrwMat("pale"), list, { shadow: !lite });
mrwInst(P, mrwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), mrwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
mrwInst(P, mrwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), mrwMat("bark"), list, { shadow: !lite });
mrwInst(P, mrwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), mrwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
mrwInst(P, mrwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), mrwMat("darkbark"), list, { shadow: !lite });
mrwInst(P, mrwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), mrwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
mrwInst(P, mrwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), mrwMat("bark"), list, { shadow: !lite });
mrwInst(P, mrwGeo("pfronds", function () { var g = mrwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), mrwLam(0xFFFFFF, { ds: 1, map: mrwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
mrwInst(P, mrwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), mrwMat("darkbark"), list, {});
mrwInst(P, mrwGeo("mfronds", function () { return mrwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), mrwLam(0xFFFFFF, { ds: 1, map: mrwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
mrwInst(P, mrwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), mrwMat("darkbark"), list, {});
mrwInst(P, mrwGeo("ffronds", function () { return mrwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), mrwLam(0xFFFFFF, { ds: 1, map: mrwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
mrwInst(P, mrwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), mrwMat("darkbark"), list, {});
mrwInst(P, mrwGeo("cyf", function () { return mrwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), mrwLam(0xFFFFFF, { ds: 1, map: mrwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
mrwInst(P, mrwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), mrwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: mrwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
mrwInst(P, mrwGeo("bamL", function () { return mrwCards(3, 2.6, 2.2, 5.4); }), mrwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
mrwInst(P, mrwGeo("reed" + kind, function () { return mrwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), mrwLam(0xFFFFFF, { ds: 1, map: mrwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
mrwInst(P, mrwGeo("tuft", function () { return mrwCards(2, 1.6, 0.7, 0); }), mrwLam(o.col || 0xFFFFFF, { ds: 1, map: mrwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
mrwInst(P, mrwGeo("flw", function () { return mrwCards(2, 0.9, 0.7, 0); }), mrwLam(0xFFFFFF, { ds: 1, map: mrwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
mrwInst(P, mrwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), mrwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
mrwInst(P, mrwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || mrwMat("rock"), list, {});
break;
}
case "cactus": {
mrwInst(P, mrwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), mrwLam(0x4A7A3A), list, {});
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
function (kind, col) { return mrwM("skinM" + kind + (col || ""), function () { var t = mrwSkinTex(kind); t.repeat.set(2, 2); var m = mrwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = mrwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(mrwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = mrwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(mrwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
mrwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return mrwGeo(k, function () {
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
var t = mrwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mrwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || mrwS("b:stucco", o.col || 0xF0E2C8, 3), trim = mrwLam(0xFAF6EE), sh = mrwLam(o.shut || 0x3A6A4A), glass = mrwShine(0x1A2228, 0.2, 0.3);
mrwBox(g, w, h, d, wall, 0, 0, 0);
mrwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
mrwBox(g, w + 0.12, 0.5, d + 0.12, mrwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(mrwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || mrwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
mrwBox(g, 1.3, 2.6, 0.12, mrwMat("oak"), wx, 0, d / 2 + 0.02);
mrwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = mrwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = mrwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!mrwLite())
[-1, 1].forEach(function (s) { mrwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
mrwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
mrwBox(g, 0.05, 0.9, 0.05, mrwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
mrwBox(g, 1.8, 0.05, 0.05, mrwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
mrwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (MRW.scG) {
if (MRW.scG.parent)
MRW.scG.parent.remove(MRW.scG);
MRW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
MRW.scG = null;
MRW.solids = [];
MRW.sgrid = null;
MRW.floors = [];
MRW.spots = [];
MRW.talk = [];
MRW.people = [];
MRW.beasts = [];
MRW.fx = [];
MRW.water = [];
MRW.inst = [];
MRW.hgt = null;
MRW.scBuilt = null;
MRW.rooms = [];
MRW.doors = [];
MRW.lights = 0;
MRW.ticks = [];
MRW.tripods = [];
MRW.handlers = [];
MRW.smoke = [];
MRW.live = null;
if (typeof mrbSceneDrop === "function")
try {
mrbSceneDrop();
}
catch (e) { }
},
function (k) {
if (MRW.scBuilt === k && MRW.scG)
return;
mrwSceneDrop();
var D = MRW_SCN[k], S = MRW_SC[k];
if (!D || !S || !MRW.G)
return;
MRW.sc = k;
MRW.scG = new THREE.Group();
MRW.scG.position.x = S.x;
MRW.G.add(MRW.scG);
MRW.hgt = D.h || function () { return 0; };
try {
D.build(MRW.scG);
}
catch (e) {
if (window.console)
console.warn("[war-worlds] scene", k, e);
}
MRW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
MRW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = mrwAtPt(at);
if (!A)
return;
var v = mrwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
MRW.moving = true;
setTimeout(function () {
if (WLD.on !== MRW_KEY) {
v.style.opacity = "0";
MRW.moving = false;
return;
}
mrwScene(A.sc);
var S = MRW_SC[A.sc], y = A.y != null ? A.y : mrwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(MRW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(mrwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; MRW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(mrwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), mrwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; MRW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(mrwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), mrwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(mrwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), mrwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(mrwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), mrwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!mrwLite() && typeof THREE.PointLight === "function" && (MRW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
MRW.lights = (MRW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
MRW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("mrw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("mrw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = MRW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : mrwGround(x, z, o.feet != null ? o.feet : 500);
var g = mrwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || MRW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
MRW.people.push(P);
if (!o.mute)
mrwTalk(P, F.name, mrwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = mrwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = mrwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: [0x141414, 0x3A2A1A, 0x6A4A2A, 0x8A7A6A, 0xB8A060][Math.floor(R() * 5)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
var y = o.y != null ? o.y : mrwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || MRW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
MRW.people.push(P);
mrwTalk(P, L[0], L[4] || o.persona || MRP.townfolk, L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, dress, x, z, ry, greet, o) {
o = o || {};
var g = mrwDressed(seed, dress, { sex: sex, child: !!o.child, beard: o.beard, hair: o.hair, skin: o.skin });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : mrwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || MRW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
MRW.people.push(P);
if (name)
mrwTalk(P, name, o.persona || MRP.townfolk, greet || "Good day.", o.r || 3.0);
return P;
},
function (k) {
switch (k) {
case "plaster": return mrwS("plaster", 0xF0EAD8, 4);
case "render": return mrwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return mrwS("b:stucco", 0xE8CC98, 3);
case "rose": return mrwS("b:stucco", 0xE8C0B0, 3);
case "grey": return mrwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return mrwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return mrwS("stone", 0xC8C0B0, 2.4);
case "greystone": return mrwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return mrwS("b:limestone", 0x6A6660, 4);
case "brick": return mrwS("brick", 0xB87A5E, 1.6);
case "slate": return mrwS("b:slate", 0x5A5E68, 2);
case "tile": return mrwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return mrwS("shingle", 0x7A5A44, 2);
case "thatch": return mrwThatchM();
case "oak": return mrwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return mrwS("b:oak", 0x4A3020, 1.4);
case "floor": return mrwS("b:oak", 0xA87A50, 1.8);
case "planks": return mrwS("b:planks", 0x9A8060, 2);
case "deck": return mrwS("b:deck", 0xB8A07A, 2);
case "hull": return mrwS("b:planks", 0x4A3A2A, 2);
case "damask": return mrwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return mrwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return mrwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return mrwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return mrwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return mrwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return mrwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return mrwLam(0xEDE6D6);
case "beams": return mrwS("b:oak", 0x5A3E26, 1.4);
case "brass": return mrwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return mrwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return mrwShine(0xC87A4A, 0.35, 0.85);
case "glass": return mrwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return mrwShine(0x26323A, 0.15, 0.3);
case "earth": return mrwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return mrwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return mrwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return mrwS("paving", 0xC8C0B0, 2.4);
case "cobble": return mrwS("b:cotto", 0x9A9088, 1.2);
case "gravel": return mrwS("sand", 0x9A8C72, 3);
case "sand": return mrwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return mrwS("b:strata", 0x8A847A, 6);
case "darkrock": return mrwS("b:strata", 0x5A5650, 7);
case "granite": return mrwS("b:limestone", 0x9A948C, 5);
case "moss": return mrwS("b:moss", 0x7A9A5A, 3);
case "bark": return mrwS("bark", 0x8A7A64, 2.5);
case "darkbark": return mrwS("bark", 0x5A4E40, 3);
case "birch": return mrwS("bark", 0xE8E4DA, 2);
case "snow": return mrwS("snow", 0xF4F6FA, 5, { vc: 1 });
case "snowwall": return mrwS("snow", 0xF0F4FA, 3);
case "ice": return mrwM("icem", function () { var m = mrwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: mrwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: mrwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return mrwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return mrwLam(0xE8DCC4, { ds: 1 });
case "sail": return mrwLam(0xE8E0CC, { ds: 1 });
case "rope": return mrwLam(0x8A7A5A);
}
return mrwS("earth", 0x8A7058, 5);
},
function () {
return mrwM("thatch", function () {
var t = mrwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
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
var y = MRW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = mrwMat(o.wall || "plaster"), fl = mrwMat(o.floor || "floor");
mrwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
mrwBox(g, w, 0.1, d, o.ceil ? mrwMat(o.ceil) : mrwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = 1.2;
mrwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
mrwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
mrwBox(g, dw, h - 2.3, 0.2, wall, 0, 2.3, q[1]);
mrwBox(g, dw, 2.3, 0.08, mrwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
mrwBox(g, 0.06, 0.06, 0.04, mrwMat("brass"), 0.42, 1.0, q[1] - 0.12);
}
else
mrwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
mrwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
mrwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = mrwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { mrwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { mrwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
mrwBox(g, 0.18, 0.22, d - 0.2, mrwMat("beams"), b, h - 0.22, 0);
mrwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
mrwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
mrwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
mrwSolid(cx - (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
mrwSolid(cx + (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
mrwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
MRW.rooms.push(R);
if (o.light !== false && !mrwLite() && (MRW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
MRW.lights = (MRW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
mrwSpot(ox, oz, 1.8, name, "go in", function () { mrwGo({ sc: MRW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + mrEsc(R.name) + ".</b>"); if (typeof mrbNote === "function")
mrbNote("in:" + R.key); });
mrwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { mrwGo({ sc: MRW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof mrbNote === "function")
mrbNote("out:" + R.key); }, R.y);
MRW.doors.push(R);
return R;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = mrwMat(o.mat || "oak");
mrwBox(g, w, 0.06, d, o.cloth ? mrwLam(o.cloth) : wd, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { mrwBox(g, 0.07, h - 0.06, 0.07, wd, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = mrwMat(o.mat || "oak");
mrwBox(g, 0.46, 0.05, 0.44, o.seat ? mrwMat(o.seat) : wd, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { mrwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.19); });
mrwBox(g, 0.46, 0.5, 0.04, wd, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { mrwBox(g, 0.05, 0.22, 0.42, wd, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = mrwMat(o.mat || "oak");
mrwBox(g, 1.1, 0.4, 2.0, wd, 0, 0, 0);
mrwBox(g, 1.04, 0.18, 1.94, mrwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
mrwBox(g, 0.8, 0.12, 0.36, mrwLam(0xF4F0E8), 0, 0.58, -0.7);
mrwBox(g, 1.1, 0.9, 0.06, wd, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { mrwBox(g, 0.07, 1.9, 0.07, wd, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = mrwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
mrwBox(g, w, h, 0.06, wd, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { mrwBox(g, 0.05, h, 0.36, wd, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
mrwBox(g, w, 0.04, 0.36, wd, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(mrwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? mrwMat("glass") : mrwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
mrwBox(g, bw, bh, 0.24, mrwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
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
var st = mrwMat(o.mat || "ashlar");
mrwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
mrwBox(g, 1.0, 0.8, 0.52, mrwLam(0x141210), 0, 0, 0.02);
mrwBox(g, 2.0, 0.1, 0.6, mrwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
mrwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = mrwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
mrwCyl(g, 0.2, 0.16, 0.26, mrwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
mrwCyl(g, 0.06, 0.07, 0.03, mrwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
mrwCyl(g, 0.018, 0.018, 0.16, mrwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(mrwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), mrwGlowM(0xFFD070, 0.9));
f.position.y = 0.215;
g.add(f);
var gl = wGlow(0xFFC860, 0.25, 0.35);
gl.position.y = 0.22;
g.add(gl);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = mrwTable(P, x, z, o.w || 2.4, o.d || 0.8, 0.92, { ry: ry, mat: "darkoak" });
var R = wRand(Math.round(x * 13 + z * 7));
for (var i = 0; i < (o.n || 6); i++) {
var px = -((o.w || 2.4) / 2) + 0.25 + i * (((o.w || 2.4) - 0.5) / Math.max(1, (o.n || 6) - 1)), k = i % 4;
if (k === 0) {
var fl = new THREE.Mesh(mrwGeo("flask", function () { return new THREE.SphereGeometry(0.1, 12, 10); }), mrwMat("glass"));
fl.position.set(px, 1.02, 0);
g.add(fl);
mrwCyl(g, 0.025, 0.025, 0.16, mrwMat("glass"), px, 1.08, 0, 8);
var liq = new THREE.Mesh(mrwGeo("liq", function () { return new THREE.SphereGeometry(0.075, 10, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), mrwLam([0x8A3A2A, 0x3A6A8A, 0x6A8A3A][i % 3], { op: 0.75 }));
liq.position.set(px, 1.02, 0);
g.add(liq);
}
else if (k === 1) {
var rt = new THREE.Mesh(mrwGeo("retort", function () { return new THREE.SphereGeometry(0.09, 12, 10); }), mrwMat("glass"));
rt.position.set(px, 1.0, 0);
g.add(rt);
var nk = new THREE.Mesh(mrwGeo("retn", function () { var c = new THREE.CylinderGeometry(0.012, 0.03, 0.4, 8); c.rotateZ(1.1); return c; }), mrwMat("glass"));
nk.position.set(px + 0.16, 1.1, 0);
g.add(nk);
}
else if (k === 2) {
mrwCyl(g, 0.07, 0.05, 0.12, mrwLam(0xC8B8A0), px, 0.92, 0, 10);
mrwCyl(g, 0.12, 0.12, 0.02, mrwMat("iron"), px, 0.92, 0, 12);
}
else {
for (var t = 0; t < 3; t++)
mrwCyl(g, 0.012, 0.012, 0.22, mrwMat("glass"), px - 0.05 + t * 0.05, 0.92, 0.1, 6);
mrwBox(g, 0.2, 0.04, 0.06, mrwMat("darkoak"), px, 0.92, 0.1);
}
}
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mrwM("rug" + col, function () {
var t = mrwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
mrwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
var t = mrwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
mrwBox(g, w + 0.12, h + 0.12, 0.04, mrwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mrwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mrwGlowM(col));
m.position.z = 0.02;
g.add(m);
mrwBox(g, w + 0.16, 0.08, 0.12, mrwMat("oak"), 0, -h / 2 - 0.04, 0.04);
mrwBox(g, 0.05, h, 0.06, mrwMat("oak"), 0, -h / 2, 0.05);
mrwBox(g, w, 0.04, 0.06, mrwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { mrwBox(g, 0.05, h, 0.06, mrwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : mrwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = mrwMat(o.wall || "render"), trim = mrwMat(o.trim || "ashlar"), sh = mrwLam(o.shut || 0x4A6A4A), pane = mrwMat("pane"), lite = mrwLite();
mrwBox(g, w, h, d, wall, 0, 0, 0);
mrwBox(g, w + 0.1, 0.6, d + 0.1, mrwMat("greystone"), 0, 0, 0);
mrwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = mrwMat(o.roof || "tile");
var rf = new THREE.Mesh(mrwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
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
mrwBox(g, 0.7, rh * 0.9, 0.7, mrwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); mrwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); mrwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
mrwBox(g, 1.2, 2.4, 0.1, mrwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
mrwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
mrwBox(g, 1.6, 0.14, 0.6, mrwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
mrwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
mrwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
mrwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { mrwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
mrwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = mrwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = mrwMat(o.wall || "ashlar"), roof = mrwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
mrwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(mrwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { mrwBox(g, 0.12, 5, 1.6, mrwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); mrwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
mrwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
mrwBox(g, T + 0.4, 0.4, T + 0.4, mrwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), mrwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = mrwBox(g, 0.08, 0.9, 0.04, mrwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = mrwBox(g, 0.06, 1.1, 0.04, mrwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(mrwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), mrwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(mrwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || mrwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
mrwBox(g, 2.2, 3.6, 0.2, mrwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
mrwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var tz = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
mrwSolid(x + tx, z + tz, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = mrwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
mrwBox(P, seg + 0.2, h, 2, st, mx, mrwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
mrwBox(P, 1.2, 0.8, 2, st, cx, mrwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = mrwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
mrwInst(P, mrwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), mrwMat("darkbark"), list, { shadow: !lite });
mrwInst(P, mrwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), mrwM("firM" + (o.snow ? "s" : ""), function () {
var t = mrwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
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
var lite = mrwLite();
mrwInst(P, mrwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), mrwMat("birch"), list, {});
mrwInst(P, mrwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), mrwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: mrwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = mrwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || mrwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
var cap = new THREE.Mesh(geo, mrwMat("snowwall"));
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
var hull = mrwMat(o.hull || "hull");
var h = new THREE.Mesh(mrwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
mrwBox(g, 1.5, 0.06, 0.3, mrwMat("planks"), 0, 0.38, -0.6);
mrwBox(g, 1.5, 0.06, 0.3, mrwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = mrwBox(g, 0.05, 0.05, 2.6, mrwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
mrwCyl(g, 0.04, 0.05, 3.4, mrwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), mrwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : mrwLand(x, z), w = o.w || 9, d = o.d || 8, h = o.h || 6.4, lite = mrwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var brick = mrwS("brick", o.brick || 0xB86A4E, 1.4), trim = mrwLam(0xF2EEE2), stone = mrwMat("ashlar"), pane = mrwMat("pane"), slate = mrwMat("slate");
mrwBox(g, w, h, d, brick, 0, 0, 0);
mrwBox(g, w + 0.12, 0.5, d + 0.12, mrwMat("darkstone"), 0, 0, 0);
mrwBox(g, w + 0.2, 0.16, d + 0.2, stone, 0, 3.1, 0);
mrwBox(g, w + 0.3, 0.2, d + 0.3, trim, 0, h - 0.2, 0);
var rh = o.rh || 3.2;
var rf = new THREE.Mesh(mrwGeo("hip" + w + "|" + d + "|" + rh, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.8, rh, d + 0.8); return c; }), slate);
rf.position.y = h;
g.add(rf);
[-1, 1].forEach(function (s) { mrwBox(g, 0.9, rh + 1.8, 0.6, brick, s * w * 0.3, h, 0); mrwCyl(g, 0.12, 0.12, 0.5, mrwLam(0xA85A3A), s * w * 0.3 - 0.2, h + rh + 1.8, 0, 8); mrwCyl(g, 0.12, 0.12, 0.5, mrwLam(0xA85A3A), s * w * 0.3 + 0.2, h + rh + 1.8, 0, 8); });
var bx = -w * 0.22;
mrwBox(g, 3.2, h - 0.6, 1.2, brick, bx, 0, d / 2 + 0.6);
var br = mrwBox(g, 3.6, 0.5, 1.6, slate, bx, h - 0.6, d / 2 + 0.6);
br.rotation.x = -0.25;
[0.9, 4.0].forEach(function (wy) { mrwBox(g, 2.6, 1.7, 0.06, trim, bx, wy, d / 2 + 1.22); mrwBox(g, 2.4, 1.5, 0.06, pane, bx, wy + 0.1, d / 2 + 1.25); mrwBox(g, 0.06, 1.5, 0.08, trim, bx - 0.8, wy + 0.1, d / 2 + 1.27); mrwBox(g, 0.06, 1.5, 0.08, trim, bx + 0.8, wy + 0.1, d / 2 + 1.27); });
var dx = w * 0.25;
mrwBox(g, 1.1, 2.4, 0.08, mrwLam(o.door || 0x2A3A2A), dx, 0.2, d / 2 + 0.04);
mrwBox(g, 1.6, 0.14, 1.2, trim, dx, 2.8, d / 2 + 0.6);
[-1, 1].forEach(function (s) { mrwBox(g, 0.1, 2.6, 0.1, trim, dx + s * 0.7, 0.2, d / 2 + 1.1); });
mrwBox(g, 1.6, 0.2, 1.0, stone, dx, 0, d / 2 + 0.6);
mrwBox(g, 0.5, 0.05, 0.4, mrwLam(0xC8B080), dx + 0.3, 1.6, d / 2 + 0.08);
var win = function (wx, wy, zz, rot) { var q = new THREE.Group(); q.position.set(wx, wy, zz); q.rotation.y = rot; g.add(q); mrwBox(q, 1.1, 1.7, 0.06, trim, 0, 0, 0); mrwBox(q, 0.9, 1.5, 0.06, pane, 0, 0.1, 0.02); mrwBox(q, 1.3, 0.12, 0.2, stone, 0, -0.06, 0.06); mrwBox(q, 1.2, 0.16, 0.12, stone, 0, 1.7, 0.03); };
win(dx, 4.0, d / 2 + 0.02, 0);
[-w * 0.25, w * 0.2].forEach(function (wx) { win(wx, 0.9, -d / 2 - 0.02, Math.PI); win(wx, 4.0, -d / 2 - 0.02, Math.PI); });
[-1, 1].forEach(function (s) { win(s * (w / 2 + 0.02), 4.0, 0, s * Math.PI / 2); });
if (o.garden !== false) {
var gz = d / 2 + (o.gd || 6);
mrwBox(g, w + 4, 0.7, 0.3, brick, 0, 0, gz);
mrwBox(g, w + 4.2, 0.1, 0.4, stone, 0, 0.7, gz);
mrwBox(g, 1.2, 0.05, gz - d / 2 - 0.6, mrwMat("gravel"), dx, 0.02, (gz + d / 2) / 2 + 0.3);
if (!lite)
mrwPlant(P, "bush", [{ x: x + Math.cos(o.ry || 0) * (-w * 0.4) + Math.sin(o.ry || 0) * (d / 2 + 3), z: z - Math.sin(o.ry || 0) * (-w * 0.4) + Math.cos(o.ry || 0) * (d / 2 + 3), y: y, s: 0.9, ry: 0 }], { col: 0x2E4A26, keepAll: true });
}
mrwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
g.userData.door = { x: dx, z: d / 2 + 1.6 };
return g;
},
function (P, x, z, n, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : mrwLand(x, z), sw = o.sw || 6, d = o.d || 9, h = o.h || 8.6;
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var names = o.names || ["GROCER", "BUTCHER", "DRAPER", "CHEMIST", "IRONMONGER", "BAKER", "TOBACCONIST", "NEWSAGENT", "BOOTMAKER", "POST OFFICE"], cols = [0x2A3A5A, 0x5A1E1E, 0x2A4A2A, 0x3A2A1A, 0x4A3A5A, 0x1E3A3A], R = wRand(Math.round(x * 3 + z));
var brick = mrwS("brick", 0xA86048, 1.4), slate = mrwMat("slate"), trim = mrwLam(0xF2EEE2), pane = mrwMat("pane");
for (var i = 0; i < n; i++) {
var cx = -((n - 1) * sw) / 2 + i * sw, c = cols[Math.floor(R() * cols.length)], ht = h + (i % 3) * 0.4;
mrwBox(g, sw - 0.05, ht, d, brick, cx, 0, 0);
var rf = new THREE.Mesh(mrwGeo("shr" + sw + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.3, 0); s.lineTo(0, 2.6); s.lineTo(d / 2 + 0.3, 0); s.lineTo(-d / 2 - 0.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false }); e.translate(0, 0, -sw / 2); e.rotateY(Math.PI / 2); return e; }), slate);
rf.position.set(cx, ht, 0);
g.add(rf);
mrwBox(g, sw - 0.3, 3.3, 0.12, mrwLam(c), cx, 0, d / 2 + 0.04);
mrwBox(g, sw - 1.6, 2.3, 0.06, pane, cx - 0.5, 0.5, d / 2 + 0.12);
mrwBox(g, 1.0, 2.4, 0.08, mrwLam(0x1E1A16), cx + sw / 2 - 0.9, 0, d / 2 + 0.12);
mrwSign(g, o.names ? names[i % names.length] : names[Math.floor(R() * names.length)], sw - 0.6, 0.62, cx, 3.0, d / 2 + 0.2, 0, { bg: "#" + c.toString(16).padStart(6, "0"), ink: "#F0D890" });
if (!mrwLite()) {
var aw = mrwBox(g, sw - 0.4, 0.06, 1.6, mrwLam([0xC8B080, 0x8A3A2A, 0x3A5A3A][i % 3], { ds: 1 }), cx, 2.7, d / 2 + 0.8);
aw.rotation.x = 0.3;
}
[0, 1].forEach(function (f) { for (var k = -1; k <= 1; k += 2) {
mrwBox(g, 1.0, 1.6, 0.06, trim, cx + k * sw * 0.22, 4.2 + f * 2.4, d / 2 + 0.03);
mrwBox(g, 0.8, 1.4, 0.06, pane, cx + k * sw * 0.22, 4.3 + f * 2.4, d / 2 + 0.06);
} });
}
mrwSolid(x, z, n * sw, d, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, pts, hfn) {
var lite = mrwLite();
mrwStrip(P, pts, 7, hfn, mrwMat("gravel"), 0.12);
var sl = [], rl = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (lite ? 1.6 : 0.8));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
[-1.6, 1.6].forEach(function (o) { sl.push({ x: x + Math.cos(ry) * o, z: z - Math.sin(ry) * o, y: hfn(x, z) + 0.16, ry: ry }); });
}
[-2.32, -0.88, 0.88, 2.32].forEach(function (o) { var m = new THREE.Mesh(mrwGeo("rail", function () { return new THREE.BoxGeometry(0.08, 0.14, 1); }), mrwMat("iron")); var mx = (a[0] + b[0]) / 2 + Math.cos(ry) * o, mz = (a[1] + b[1]) / 2 - Math.sin(ry) * o; m.position.set(mx, hfn(mx, mz) + 0.3, mz); m.rotation.y = ry; m.scale.z = L; P.add(m); });
}
mrwInst(P, mrwGeo("sleeper", function () { return new THREE.BoxGeometry(2.4, 0.14, 0.26); }), mrwMat("darkoak"), sl, {});
},
function (P, x, z, len, name, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : mrwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
mrwBox(g, 6, 1.0, len, mrwMat("paving"), 0, 0, 0);
mrwBox(g, 6.1, 0.12, len, mrwMat("ashlar"), 0, 1.0, 0);
for (var i = 0; i < Math.floor(len / 6); i++) {
var cz = -len / 2 + 3 + i * 6;
mrwCyl(g, 0.1, 0.12, 4, mrwLam(0x2A4A3A), 1.6, 1, cz, 8);
}
var cn = mrwBox(g, 5, 0.1, len * 0.7, mrwLam(0xD8D0C0, { ds: 1 }), 0.6, 5.0, 0);
cn.rotation.z = 0.12;
mrwBox(g, 0.2, 0.4, len * 0.7, mrwLam(0x2A4A3A), 3, 4.8, 0);
mrwBox(g, 4, 3.8, 12, mrwS("brick", 0xA86048, 1.4), -1, 1, 0);
mrwBox(g, 4.4, 0.3, 12.4, mrwLam(0xF2EEE2), -1, 4.8, 0);
mrwBox(g, 1.2, 2.3, 0.08, mrwLam(0x2A3A2A), 1.02, 1, 0);
mrwSign(g, name, 5, 0.8, 2.9, 2.6, len / 2 - 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
mrwSign(g, name, 5, 0.8, 2.9, 2.6, -len / 2 + 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
mrwFloor(x, z, 6, len, y + 1.12, {});
mrwSolid(x + Math.cos(o.ry || 0) * (-1), z - Math.sin(o.ry || 0) * (-1), 4, 12, y, y + 5, o.ry || 0);
return g;
},
function (P, x, z, len, w, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = mrwS("brick", 0x9A5A40, 1.4), rise = o.rise || 1.6, n = 8;
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, z0 = -len / 2 + len * t0, z1 = -len / 2 + len * t1, y0 = Math.sin(t0 * Math.PI) * rise, y1 = Math.sin(t1 * Math.PI) * rise, seg = mrwBox(g, w, 0.5, len / n + 0.05, br, 0, (y0 + y1) / 2 - 0.4, (z0 + z1) / 2);
seg.rotation.x = -Math.atan2(y1 - y0, len / n);
[-1, 1].forEach(function (s) { var pr = mrwBox(g, 0.4, 1.0, len / n + 0.05, br, s * (w / 2 - 0.2), (y0 + y1) / 2, (z0 + z1) / 2); pr.rotation.x = -Math.atan2(y1 - y0, len / n); });
}
var ar = new THREE.Mesh(mrwGeo("arch" + w, function () { var t = new THREE.TorusGeometry(3, 0.6, 6, 12, Math.PI); return t; }), br);
ar.rotation.y = Math.PI / 2;
ar.position.y = -3.2;
g.add(ar);
var ry = o.ry || 0, cx = function (lz) { return x + Math.sin(ry) * lz; }, cz = function (lz) { return z + Math.cos(ry) * lz; };
mrwRamp(cx(-len / 4), cz(-len / 4), w - 0.8, len / 2, y - 0.1, y + rise - 0.1, ry);
mrwRamp(cx(len / 4), cz(len / 4), w - 0.8, len / 2, y + rise - 0.1, y - 0.1, ry);
[-1, 1].forEach(function (s) { mrwSolid(x + Math.cos(ry) * s * (w / 2 - 0.2), z - Math.sin(ry) * s * (w / 2 - 0.2), 0.4, len, y - 1, y + rise + 1.1, ry); });
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = mrwLam(0x1E2A22);
mrwCyl(g, 0.07, 0.12, 3.4, ir, 0, 0, 0, 8);
mrwBox(g, 0.7, 0.06, 0.06, ir, 0, 3.1, 0);
var lt = mrwBox(g, 0.34, 0.5, 0.34, mrwGlowM(o.lit ? 0xFFE0A0 : 0xE8E4D0, o.lit ? 0.95 : 0.6), 0, 3.4, 0);
var cap = new THREE.Mesh(mrwGeo("lampcap", function () { return new THREE.ConeGeometry(0.3, 0.3, 4); }), ir);
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
if (o.lit) {
var gl = wGlow(0xFFD890, 0.9, 2.4);
gl.position.y = 3.6;
g.add(gl);
}
mrwRound(x, z, 0.2, hfn(x, z) - 1, hfn(x, z) + 3.5);
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
mrwInst(P, mrwGeo("tpole", function () { var p = new THREE.CylinderGeometry(0.1, 0.14, 8, 6); p.translate(0, 4, 0); var c = new THREE.BoxGeometry(1.6, 0.1, 0.1); c.translate(0, 7.4, 0); var c2 = new THREE.BoxGeometry(1.2, 0.1, 0.1); c2.translate(0, 6.8, 0); return gwMerge([p.toNonIndexed(), c, c2].map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), mrwMat("darkoak"), list, {});
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
mrwPlant(P, "bush", list.map(function (q, i) { return { x: q.x, z: q.z, y: q.y - 0.2, s: 0.85 + ((i * 37) % 10) / 40, ry: i * 1.7 }; }), { col: 0x4A6A30, keepAll: true });
return;
}
mrwInst(P, mrwGeo(o.hedge ? "hedge" : "paling", function () { if (o.hedge) {
var h = new THREE.BoxGeometry(0.9, 1.4, 2.5, 2, 2, 2);
h.translate(0, 0.7, 0);
return h;
} var parts = []; for (var j = 0; j < 6; j++) {
var s = new THREE.BoxGeometry(0.06, 1.1, 0.08);
s.translate(0, 0.55, -1.0 + j * 0.4);
parts.push(s);
} var r = new THREE.BoxGeometry(0.05, 0.08, 2.4); r.translate(0, 0.85, 0); parts.push(r); var r2 = r.clone(); r2.translate(0, -0.5, 0); parts.push(r2); return gwMerge(parts.map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), o.hedge ? mrwM("hedgeM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A5A2A, map: mrwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }) : mrwLam(o.col || 0xE8E2D2), list, {});
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.set(o.rx || 0.18, o.ry || 0, 0);
P.add(g);
g.userData.keep = 1;
var crust = mrwS("b:strata", 0x8A7A5E, 3), metal = mrwShine(0xC8C0B0, 0.35, 0.85);
var body = new THREE.Mesh(mrwGeo("mcyl", function () { return new THREE.CylinderGeometry(13.5, 13.5, 22, 28, 3); }), crust);
body.rotation.x = Math.PI / 2;
g.add(body);
var end = new THREE.Group();
end.position.z = 11.05;
g.add(end);
var lid = new THREE.Mesh(mrwGeo("mlid", function () { return new THREE.CylinderGeometry(13, 13, 0.5, 28); }), o.open ? metal : crust);
lid.rotation.x = Math.PI / 2;
end.add(lid);
var rim = new THREE.Mesh(mrwGeo("mrim", function () { return new THREE.TorusGeometry(13.2, 0.35, 8, 36); }), metal);
end.add(rim);
g.userData.lid = end;
g.userData.lidM = lid;
[[0.3, 8], [2.1, -6], [4.0, 3]].forEach(function (q) { var sp = new THREE.Mesh(mrwGeo("mspot", function () { var s = new THREE.CircleGeometry(2.4, 12); return s; }), metal); sp.position.set(Math.cos(q[0]) * 13.6, Math.sin(q[0]) * 13.6, q[1]); sp.lookAt(Math.cos(q[0]) * 30, Math.sin(q[0]) * 30, q[1]); g.add(sp); });
return g;
},
function (P, x, z, o) {
o = o || {};
var lite = mrwLite(), H = o.h || 30, g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var metal = mrwShine(0xB8B4A8, 0.4, 0.85), dark = mrwShine(0x3A3832, 0.5, 0.6), brass = mrwShine(0xC8A060, 0.45, 0.85);
var hood = new THREE.Group();
g.add(hood);
hood.position.y = H;
var cow = new THREE.Mesh(mrwGeo("thood", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.2, Math.sin(t * Math.PI * 0.62) * 4.2 + 0.4), t * 4.4 - 1.6));
} return new THREE.LatheGeometry(pts, lite ? 12 : 24); }), brass);
hood.add(cow);
var body = new THREE.Mesh(mrwGeo("tbody", function () { var s = new THREE.SphereGeometry(3.4, lite ? 12 : 20, 10, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65); s.scale(1.2, 0.8, 1.0); return s; }), metal);
body.position.y = -0.8;
hood.add(body);
var arm = new THREE.Group();
arm.position.set(2.2, -1.6, 2.6);
hood.add(arm);
mrwCyl(arm, 0.18, 0.18, 2.4, dark, 0, -2.2, 0, 8);
var box = mrwBox(arm, 0.9, 0.7, 1.4, dark, 0, -2.6, 0.4);
var lens = new THREE.Mesh(mrwGeo("tlens", function () { return new THREE.CircleGeometry(0.28, 14); }), mrwGlowM(0x8AA0A8, 0.7));
lens.position.set(0, -2.25, 1.12);
arm.add(lens);
g.userData.ray = arm;
for (var i = 0; i < 3; i++) {
var sl = mrwBox(hood, 0.9, 0.16, 0.06, mrwLam(0x0A0A0A), -1 + i, 0.6, 4.02);
}
var tents = [];
if (!lite)
for (i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, t = new THREE.Group();
t.position.set(Math.cos(a) * 2.2, -2.6, Math.sin(a) * 2.2);
hood.add(t);
var segs = [];
for (var k = 0; k < 6; k++) {
var m = new THREE.Mesh(mrwGeo("tseg", function () { var c = new THREE.CylinderGeometry(0.09, 0.12, 1, 6); c.translate(0, -0.5, 0); return c; }), metal);
m.position.y = -k * 1.3;
if (k)
segs[k - 1].add(m);
else
t.add(m);
m.scale.y = 1.3;
segs.push(m);
}
tents.push({ g: t, s: segs, ph: i * 1.3 });
}
var legM = new THREE.Mesh(mrwGeo("tleg", function () { return new THREE.CylinderGeometry(0.42, 0.32, 1, lite ? 6 : 10); }), metal);
var legs = [];
for (i = 0; i < 3; i++) {
var up = legM.clone(), lo = legM.clone();
up.scale.set(1, 1, 1);
g.add(up);
g.add(lo);
var kn = new THREE.Mesh(mrwGeo("tknee", function () { return new THREE.SphereGeometry(0.7, 10, 8); }), dark);
g.add(kn);
var ft = new THREE.Mesh(mrwGeo("tfoot", function () { return new THREE.CylinderGeometry(0.9, 1.3, 0.6, 10); }), dark);
g.add(ft);
legs.push({ up: up, lo: lo, kn: kn, ft: ft, a: i / 3 * Math.PI * 2 + Math.PI / 6, fx: 0, fz: 0, lift: 0 });
}
var T = { g: g, hood: hood, legs: legs, tents: tents, x: x, z: z, ry: o.ry || 0, H: H, t: Math.random() * 10, sp: o.sp || 0, path: o.path || null, pi: 0, hfn: o.hfn || mrwLand, dead: !!o.dead, ray: 0, rayM: null, look: 0 };
legs.forEach(function (L) { L.fx = x + Math.sin(L.a + T.ry) * H * 0.32; L.fz = z + Math.cos(L.a + T.ry) * H * 0.32; });
mrwTripodPose(T, 0);
MRW.tripods = MRW.tripods || [];
MRW.tripods.push(T);
return T;
},
function (T, dt) {
var H = T.H, g = T.g, hy = T.hfn(T.x, T.z);
if (T.dead) {
g.position.set(T.x, hy, T.z);
T.hood.position.set(0, 2.6, 0);
T.hood.rotation.set(1.2, T.ry, 0.3);
T.legs.forEach(function (L, i) { var a = L.a + T.ry, fx = Math.sin(a) * H * 0.8, fz = Math.cos(a) * H * 0.8, kx = fx * 0.5, kz = fz * 0.5; mrwStick(L.up, { x: 0, y: 2.6, z: 0 }, { x: kx, y: 1.2 + i, z: kz }); mrwStick(L.lo, { x: kx, y: 1.2 + i, z: kz }, { x: fx, y: 0.6, z: fz }); L.kn.position.set(kx, 1.2 + i, kz); L.ft.position.set(fx, 0.4, fz); });
return;
}
T.t += dt;
var bob = Math.sin(T.t * 1.6) * 0.5 * (T.sp > 0 ? 1 : 0.2);
g.position.set(T.x, hy, T.z);
T.hood.position.y = H + bob;
T.hood.rotation.y = T.ry + Math.sin(T.t * 0.4) * 0.25 + T.look;
T.legs.forEach(function (L, i) {
var a = L.a + T.ry, rx = T.x + Math.sin(a) * H * 0.32, rz = T.z + Math.cos(a) * H * 0.32;
var ph = (T.t * 0.9 + i / 3) % 1, moving = T.sp > 0.05;
if (moving) {
var stepF = Math.sin(T.ry) * T.sp * 1.1, stepB = Math.cos(T.ry) * T.sp * 1.1;
if (ph < 0.33) {
var u = ph / 0.33;
L.fx += (rx + stepF - L.fx) * Math.min(1, dt * 6);
L.fz += (rz + stepB - L.fz) * Math.min(1, dt * 6);
L.lift = Math.sin(u * Math.PI) * H * 0.12;
}
else
L.lift *= 0.8;
}
else {
L.fx += (rx - L.fx) * Math.min(1, dt * 2);
L.fz += (rz - L.fz) * Math.min(1, dt * 2);
L.lift *= 0.8;
}
var fy = T.hfn(L.fx, L.fz) + L.lift, hx = Math.sin(a) * 2.6, hz = Math.cos(a) * 2.6, top = { x: hx, y: H + bob - 1.6, z: hz }, foot = { x: L.fx - T.x, y: fy - hy, z: L.fz - T.z }, kn = { x: (top.x + foot.x) / 2 + Math.sin(a) * H * 0.18, y: (top.y + foot.y) / 2 + H * 0.14, z: (top.z + foot.z) / 2 + Math.cos(a) * H * 0.18 };
mrwStick(L.up, top, kn);
mrwStick(L.lo, kn, foot);
L.kn.position.set(kn.x, kn.y, kn.z);
L.ft.position.set(foot.x, foot.y + 0.2, foot.z);
});
T.tents.forEach(function (Tn) { Tn.s.forEach(function (s, k) { s.rotation.x = Math.sin(T.t * 1.3 + Tn.ph + k * 0.5) * 0.18; s.rotation.z = Math.cos(T.t * 1.1 + Tn.ph + k * 0.4) * 0.14; }); });
},
function (dt) {
(MRW.tripods || []).forEach(function (T) {
if (!T.g.parent)
return;
if (T.path && T.sp > 0 && !T.dead) {
var p = T.path[T.pi % T.path.length], dx = p[0] - T.x, dz = p[1] - T.z, d = Math.hypot(dx, dz);
if (d < 3) {
T.pi++;
}
else {
var want = Math.atan2(dx, dz), da = Math.atan2(Math.sin(want - T.ry), Math.cos(want - T.ry));
T.ry += da * Math.min(1, dt * 0.8);
T.x += Math.sin(T.ry) * T.sp * dt;
T.z += Math.cos(T.ry) * T.sp * dt;
}
}
mrwTripodPose(T, dt);
mrwRayTick(T, dt);
});
},
function (T, dt) {
var want = T.rayOn ? 1 : 0;
T.ray += (want - T.ray) * Math.min(1, dt * 2.5);
if (T.ray < 0.02 && !T.rayOn) {
if (T.rayM)
T.rayM.visible = false;
return;
}
if (!T.rayM) {
T.rayM = new THREE.Mesh(mrwGeo("raybeam", function () { var c = new THREE.CylinderGeometry(0.18, 0.5, 1, 8, 1, true); return c; }), new THREE.MeshBasicMaterial({ color: 0xFFE8B0, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide }));
MRW.scG.add(T.rayM);
T.rayM.userData.keep = 1;
T.rayF = mrwFire(MRW.scG, 0, 0, 0, 1.6);
T.rayF.userData.keep = 1;
}
var hy = T.hfn(T.x, T.z), a = { x: T.x + Math.sin(T.hood.rotation.y) * 2.6, y: hy + T.hood.position.y - 4, z: T.z + Math.cos(T.hood.rotation.y) * 2.6 }, b = { x: T.rayTo.x, y: T.hfn(T.rayTo.x, T.rayTo.z) + 0.4, z: T.rayTo.z };
T.look = Math.atan2(Math.sin(Math.atan2(b.x - T.x, b.z - T.z) - T.ry), Math.cos(Math.atan2(b.x - T.x, b.z - T.z) - T.ry)) * 0.8;
mrwStick(T.rayM, a, b);
T.rayM.visible = true;
T.rayM.material.opacity = 0.10 * T.ray + Math.sin(T.t * 3) * 0.015 * T.ray;
T.rayF.position.set(b.x, b.y - 0.4, b.z);
T.rayF.visible = T.ray > 0.3;
},
function (P, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var metal = mrwShine(0xA8A498, 0.4, 0.85), dark = mrwShine(0x3A3832, 0.5, 0.6);
var b = mrwEll(g, metal, 1.6, 0.9, 2.2, 0, 3.2, 0, 14);
var legs = [];
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2, L = new THREE.Group();
L.position.set(Math.sin(a) * 1.4, 3.0, Math.cos(a) * 1.8);
L.rotation.y = a;
g.add(L);
var up = mrwCyl(L, 0.12, 0.12, 2.4, metal, 0, 0, 0, 6);
up.rotation.x = 1.0;
var lo = new THREE.Group();
lo.position.set(0, 1.2, 2.0);
L.add(lo);
var l2 = mrwCyl(lo, 0.1, 0.08, 3.4, dark, 0, -3.4, 0, 6);
legs.push(L);
}
for (i = 0; i < 3; i++) {
var t = mrwCyl(g, 0.06, 0.04, 2.4, metal, -0.8 + i * 0.8, 1.0, 2.0, 6);
t.rotation.x = 0.8;
}
MRW.handlers = MRW.handlers || [];
MRW.handlers.push({ g: g, legs: legs, t: Math.random() * 9 });
return g;
},
function (P, x, y, z, ry, o) {
o = o || {};
var crx = false;
try {
crx = typeof crxBuild === "function" && typeof crxHas === "function" && crxHas("martian") && !mrwLite() && typeof CRX !== "undefined";
}
catch (e) { }
var hold = new THREE.Group();
hold.position.set(x, y, z);
hold.rotation.y = ry || 0;
hold.userData.live = 1;
hold.userData.keep = 1;
P.add(hold);
var s = o.s || 1.6;
var plain = new THREE.Group();
hold.add(plain);
var skin = mrwLam(o.dead ? 0x6A625A : 0x8E8278), dk = mrwLam(0x1A1210);
mrwEll(plain, skin, 0.7 * s, 0.62 * s, 0.72 * s, 0, 0.7 * s, 0, 14);
mrwEll(plain, dk, 0.13 * s, 0.15 * s, 0.08 * s, 0.26 * s, 0.95 * s, 0.6 * s, 10);
mrwEll(plain, dk, 0.13 * s, 0.15 * s, 0.08 * s, -0.26 * s, 0.95 * s, 0.6 * s, 10);
for (var i = 0; i < 16; i++) {
var a = (i / 16 - 0.5) * 2.2, t = mrwCyl(plain, 0.03 * s, 0.012 * s, 0.7 * s, skin, Math.sin(a) * 0.3 * s, 0.3 * s, 0.6 * s + Math.cos(a) * 0.1 * s, 5);
t.rotation.x = o.dead ? 1.4 : 0.5;
t.rotation.z = a * 0.4;
}
if (o.dead) {
hold.rotation.z = 1.2;
hold.position.y = y + 0.3;
}
if (crx) {
if (!CRX.geo.martian)
try {
crxWarm(["martian"]);
}
catch (e) { }
MRW.ticks.push(function () { if (!hold.parent || hold.userData.done || !CRX.geo.martian)
return; hold.userData.done = 1; try {
var c = crxBuild("martian");
if (c) {
c.scale.multiplyScalar(s);
hold.remove(plain);
hold.add(c);
if (o.dead)
crxActOn(c, "die");
}
}
catch (e) { } });
}
return hold;
},
function (P, x, z, r, hfn, o) {
o = o || {};
var g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var R = wRand(Math.round(x + z)), n = mrwLite() ? 10 : 24;
var mt = new THREE.MeshLambertMaterial({ color: 0x14120F, transparent: true, opacity: 0.62, depthWrite: false });
mt.userData.noPhoto = 1;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = R() * r, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d, s = 4 + R() * 7;
var m = new THREE.Mesh(mrwGeo("bsm", function () { return new THREE.IcosahedronGeometry(1, 1); }), mt);
m.position.set(px, hfn(px, pz) + s * 0.35, pz);
m.scale.set(s * 1.6, s * 0.6, s * 1.4);
g.add(m);
}
MRW.smoke = MRW.smoke || [];
MRW.smoke.push(g);
return g;
},
function (P, list) {
if (!list.length)
return;
var lite = mrwLite();
if (lite && list.length > 200)
list = list.filter(function (t, i) { return i % 2 === 0; });
mrwInst(P, mrwGeo("rweed", function () { var parts = [], R = wRand(77); for (var i = 0; i < (lite ? 5 : 9); i++) {
var c = new THREE.CylinderGeometry(0.05, 0.12, 1.2 + R() * 1.0, 5);
c.translate(0, 0.6, 0);
c.rotateZ((R() - 0.5) * 1.4);
c.rotateY(R() * 6.283);
parts.push(c.toNonIndexed());
var b = new THREE.IcosahedronGeometry(0.22 + R() * 0.14, 0);
b.translate((R() - 0.5) * 1.2, 0.9 + R() * 0.8, (R() - 0.5) * 1.2);
parts.push(b);
} return gwMerge(parts); }), mrwM("rweedM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x9A1E14, emissive: 0x1A0402 }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, hfn, fires) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 18), mrwM("scorch", function () { var mm = new THREE.MeshLambertMaterial({ color: 0x14100C, transparent: true, opacity: 0.85, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, hfn(x, z) + 0.05, z);
P.add(m);
var R = wRand(Math.round(x * 7 + z));
for (var i = 0; i < (fires || 0); i++) {
var a = R() * 6.283, d = R() * r * 0.8, fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
var f = mrwFire(P, fx, hfn(fx, fz), fz, 0.6 + R() * 0.8);
f.userData.keep = 1;
}
return m;
},
function (P, list) { if (!list.length)
return; mrwInst(P, mrwGeo("deadT", function () { var t = new THREE.CylinderGeometry(0.12, 0.3, 6, 6); t.translate(0, 3, 0); var b = new THREE.CylinderGeometry(0.05, 0.1, 2.4, 5); b.rotateZ(0.9); b.translate(0.8, 4.2, 0); var b2 = b.clone(); b2.rotateY(2.4); return gwMerge([t.toNonIndexed(), b.toNonIndexed(), b2.toNonIndexed()]); }), mrwLam(0x1A1612), list, {}); },
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : mrwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var wd = mrwMat(o.mat || "oak"), blk = mrwLam(0x1A1612);
var L = o.len || 2.6, W = o.w || 1.5;
mrwBox(g, W, 0.5, L, wd, 0, 0.8, 0);
if (o.seat)
mrwBox(g, W, 0.5, 0.5, mrwLam(o.seatCol || 0x3A2A1E), 0, 1.3, -0.3);
if (o.load)
for (var i = 0; i < o.load; i++)
mrwBox(g, 0.6, 0.4 + i % 2 * 0.2, 0.6, mrwLam([0x8A6A4A, 0x5A4A3A, 0xC8B898, 0x6A3A2A][i % 4]), -0.4 + (i % 3) * 0.4, 1.3, -0.8 + Math.floor(i / 3) * 0.6);
[-1, 1].forEach(function (s) { var wh = new THREE.Mesh(mrwGeo("cwheel", function () { return new THREE.TorusGeometry(0.75, 0.05, 6, 16); }), blk); wh.position.set(s * (W / 2 + 0.1), 0.75, 0.2); wh.rotation.y = Math.PI / 2; g.add(wh); for (var k = 0; k < 5; k++) {
var sp = mrwBox(g, 0.03, 1.5, 0.03, wd, s * (W / 2 + 0.1), 0, 0.2);
sp.position.y = 0.75;
sp.rotation.x = k / 5 * Math.PI;
} });
[-1, 1].forEach(function (s) { mrwBox(g, 0.06, 0.06, 2.4, wd, s * 0.45, 0.9, -L / 2 - 1.1); });
if (o.horse !== false)
mrwHorse(g, 0, 0, -L / 2 - 2.0, 0, { col: o.hcol || 0x5A3A22, kind: o.kind });
if (!o.nosolid)
mrwSolid(x, z, W + 0.6, L + 2, y - 1, y + 2.2, ry || 0);
return g;
},
function (P, hfn, col, o) {
o = o || {};
var R = o.r || 2600, st = mrwLite() ? 160 : 100, E = o.edge || 820, cl = function (v) { return Math.max(-E, Math.min(E, v)); };
return mrwTerrain(P, -R, -R, 2 * R, 2 * R, st, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)), k = mrwSmooth(E, R, e); return hfn(cl(x), cl(z)) * (1 - k) + (o.rise || 18) * k * mrwFbm(x * 0.002, z * 0.002, 2) - 0.6 - 8 * (1 - k); }, mrwMat("meadow"), function (x, z, y, c) { var g = 0.75 + mrwFbm(x * 0.01, z * 0.01, 2) * 0.2, C = typeof col === "number" ? [((col >> 16) & 255) / 255, ((col >> 8) & 255) / 255, (col & 255) / 255] : (col || [0.56, 0.74, 0.42]); c.setRGB(C[0] * g, C[1] * g, C[2] * g); });
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
var lite = mrwLite(), R = wRand(o.seed || 5), L = mrwPathLen(pts), W = o.w || 8, mv = [], g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var dress = o.dress || ["gent", "lady", "maid", "worker", "boy", "girl", "porter", "cabby", "clergy", "newsboy"], n = lite ? Math.round((o.n || 40) * 0.4) : (o.n || 40), nc = lite ? Math.round((o.carts || 8) * 0.5) : (o.carts || 8);
for (var i = 0; i < n; i++) {
var d = dress[Math.floor(R() * dress.length)], kid = d === "boy" || d === "girl", m = mrwDressed((o.seed || 5) * 100 + i, d, { sex: d === "lady" || d === "maid" || d === "girl" ? "f" : "m", child: kid });
g.add(m);
mv.push({ g: m, s: R() * L, off: (R() - 0.5) * W, sp: (o.sp || 1.4) * (0.8 + R() * 0.5) });
}
for (i = 0; i < nc; i++) {
var c = mrwCart(g, 0, 0, 0, { y: 0, nosolid: true, seat: R() < 0.6, load: Math.floor(R() * 6), hcol: [0x5A3A22, 0x2A1E16, 0x8A6A4A, 0x3A3028][i % 4], len: 2 + R() * 1.4 });
mv.push({ g: c, s: R() * L, off: (R() - 0.5) * W * 0.5, sp: (o.sp || 1.4) * (0.9 + R() * 0.3), cart: 1 });
}
var on = true;
MRW.ticks.push(function (dt) { if (!g.parent || !on)
return; mv.forEach(function (M) { M.s += M.sp * dt; if (M.s > L)
M.s -= L; var p = mrwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); }); });
mv.forEach(function (M) { var p = mrwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); });
g.userData.stop = function () { on = false; };
return g;
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.mrcow)
return;
var tail = function (c) { return { l: 0.8, r: 0.07, up: -1.3, col: c }; };
CRX_PLANS.mrdark = function () { return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x2A1C14, back: 0x1E140E, muzzle: 0x1A1210, mane: 0x0E0A08, foot: "hoof", tail: tail(0x0E0A08), neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0 }); };
CRX_PLANS.mrmule = function () { return crxQuad({ L: 0.95, H: 0.92, G: 0.32, W: 0.74, legR: 0.045, head: "horse", hs: 1.25, col: 0x6A625A, back: 0x5A524A, muzzle: 0x3A3430, mane: 0x2A2622, foot: "hoof", tail: tail(0x2A2622), neck: { l: 0.5, up: 0.8 }, neckR0: 0.5, neckR1: 0.32, stride: 1.6, runAt: 3.0 }); };
CRX_PLANS.mrcow = function () { return crxQuad({ L: 1.15, H: 0.9, G: 0.42, W: 0.86, legR: 0.06, head: "bull", hs: 1.05, col: 0xD8CCB8, back: 0x8A5A3A, belly: 0xE8E0D0, muzzle: 0xC89A8A, mane: 0x8A5A3A, foot: "hoof", tail: { l: 0.7, r: 0.04, up: -1.5, col: 0x8A5A3A }, neck: { l: 0.35, up: 0.5 }, neckR0: 0.6, neckR1: 0.45, stride: 1.4, runAt: 2.4 }); };
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = null, key = o.kind || "horse";
if (o.plain)
return mrwPlainBeast(P, x, y, z, ry, o);
var crx = false;
try {
mrwCrxKinds();
crx = typeof crxBuild === "function" && typeof crxHas === "function" && crxHas(key) && !mrwLite() && typeof CRX !== "undefined";
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
var stand = mrwHorse(hold, 0, 0, 0, 0, { col: o.col, plain: 1, kind: key });
MRW.ticks.push(function () { if (!hold.parent || hold.userData.done || !CRX.geo[key])
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
return mrwPlainBeast(P, x, y, z, ry, o);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), cow = o.kind === "mrcow", c = mrwLam(o.col || (cow ? 0xD8CCB8 : 0x5A3A22)), dk = mrwLam(0x1A120C);
{
if (cow)
g.scale.set(1.15, 0.9, 1.05);
mrwEll(g, c, 0.34, 0.36, 0.85, 0, 1.25, 0, 12);
var nk = mrwCyl(g, 0.16, 0.24, 0.8, c, 0, 1.3, -0.7, 8);
nk.rotation.x = -0.7;
var hd = mrwEll(g, c, 0.13, 0.15, 0.34, 0, 1.85, -1.05, 10);
hd.rotation.x = 0.6;
[[-0.2, -0.55], [0.2, -0.55], [-0.2, 0.55], [0.2, 0.55]].forEach(function (q) { mrwCyl(g, 0.06, 0.05, 1.0, c, q[0], 0, q[1], 6); mrwCyl(g, 0.07, 0.07, 0.1, dk, q[0], 0, q[1], 6); });
var mn = mrwBox(g, 0.05, 0.4, 0.7, dk, 0, 1.45, -0.75);
mn.rotation.x = -0.7;
var tl = mrwCyl(g, 0.06, 0.03, 0.7, dk, 0, 0.9, 0.95, 6);
tl.rotation.x = 0.3;
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (x, z) {
var n = mrwFbm(x * 0.006, z * 0.006, 4), h = 2 + n * 7;
h += Math.max(0, 1 - Math.hypot(x - 60, z + 690) / 260) * 22;
h += Math.max(0, Math.min(1, (x - 180) / 240)) * 16 * Math.max(0, 1 - Math.abs(z - 30) / 420);
var cd = Math.abs(z - MRW_WK.canal);
if (cd < 16) {
var t = Math.max(0, 1 - cd / 16);
h = h * (1 - t) + (-0.2) * t;
if (cd < 6)
h = -1.6;
}
var rd = Math.abs(z - MRW_WK.rail);
if (rd < 12)
h = h * (rd / 12) + 3.2 * (1 - rd / 12);
var p = mrwPit(MRW_WK.pit[0], MRW_WK.pit[1], 22, 8)(x, z);
if (p)
h += p;
return h;
},
function (G) {
var X = MRW_ROOMXZ.woking, R, lite = mrwLite();
R = mrwRoom(G, "study", X.study[0], X.study[1], 8, 7, { wall: "greenpaper", name: "my study", beams: false, lightI: 0.8 });
mrwShelves(R.g, -3.8, -1, 3.2, 2.6, Math.PI / 2, {});
mrwShelves(R.g, -3.8, 2.2, 2.6, 2.6, Math.PI / 2, {});
mrwTable(R.g, 1.6, -2.2, 1.8, 0.9, 0.78, { mat: "darkoak" });
mrwChair(R.g, 1.6, -1.4, Math.PI, { arm: 1, seat: "leather" });
for (var p = 0; p < 6; p++)
mrwBox(R.g, 0.22, 0.01, 0.3, mrwLam(0xF4F0E4), 1.0 + p * 0.2, 0.79, -2.3 + (p % 2) * 0.1);
mrwCandle(R.g, 2.3, 0.78, -2.4, { brass: 1 });
mrwWindowIn(R.g, 0, 2.2, -3.38, 0, 1.6, 1.6, { sky: 0xA8C0D8 });
mrwRug(R.g, 0, 0.6, 3.4, 2.4, 0x6A2A22);
mrwHearth(R.g, 3.8, 0.6, -Math.PI / 2, { h: R.h });
R = mrwRoom(G, "dining", X.dining[0], X.dining[1], 8, 7, { wall: "damask", name: "the dining-room", lightI: 0.9 });
mrwTable(R.g, 0, 0, 2.4, 1.2, 0.76, { cloth: 0xF4F0E8 });
[-0.8, 0, 0.8].forEach(function (dx) { mrwChair(R.g, dx, -0.9, 0, {}); mrwChair(R.g, dx, 0.9, Math.PI, {}); });
mrwCandle(R.g, 0, 0.76, 0, { brass: 1 });
for (var d = 0; d < 4; d++)
mrwCyl(R.g, 0.12, 0.12, 0.02, mrwLam(0xF8F6F0), -0.8 + d * 0.55, 0.77, 0.3, 14);
mrwBox(R.g, 0.7, 0.24, 0.3, mrwLam(0xC8A87A), 0.3, 0.77, -0.2);
mrwShelves(R.g, -3.8, 0, 2.4, 2.0, Math.PI / 2, { jars: 1 });
mrwWindowIn(R.g, 2, 2.4, -3.38, 0, 1.2, 2.2, { sky: 0xB8D0E0 });
mrwHearth(R.g, 3.8, 0, -Math.PI / 2, { h: R.h });
R = mrwRoom(G, "obs", X.obs[0], X.obs[1], 10, 10, { wall: "planks", floor: "planks", h: 6.4, name: "Ogilvy's observatory", bare: 1, lightI: 0.5, lightCol: 0xC8D8FF, env: "night" });
var tel = new THREE.Group();
tel.position.set(0, 0, -1);
R.g.add(tel);
mrwCyl(tel, 0.5, 0.7, 1.8, mrwMat("iron"), 0, 0, 0, 12);
var tb = mrwCyl(tel, 0.26, 0.32, 4.2, mrwShine(0x2A2A30, 0.4, 0.7), 0, 1.6, 0, 14);
tb.rotation.x = -0.75;
tb.position.set(0, 2.4, -0.6);
mrwBox(R.g, 1.2, 1.0, 0.8, mrwMat("darkoak"), 3, 0, -3);
mrwBox(R.g, 0.5, 0.5, 0.5, mrwMat("brass"), 3, 1.0, -3);
var sl = mrwBox(R.g, 1.6, 0.06, 8, mrwGlowM(0x0A1428, 0.95), 0, 6.3, 0);
mrwChair(R.g, -1.2, 0.8, Math.PI * 0.8, {});
mrwTable(R.g, -3, 2, 1.4, 0.8, 0.76, {});
mrwCandle(R.g, -3, 0.76, 2, {});
R = mrwRoom(G, "spotted", X.spotted[0], X.spotted[1], 10, 8, { wall: "render", name: "the Spotted Dog", beams: true });
mrwBox(R.g, 6, 1.1, 0.8, mrwMat("darkoak"), 0, 0, -2.6);
for (var t = 0; t < 4; t++)
mrwCyl(R.g, 0.3, 0.3, 0.7, mrwMat("oak"), -2 + t * 1.2, 1.1, -3.4, 10);
mrwHearth(R.g, -4.8, 1, Math.PI / 2, { h: R.h });
for (t = 0; t < 2; t++) {
mrwTable(R.g, -1.5 + t * 3.4, 1.4, 1.4, 0.8, 0.74, {});
mrwBench(R.g, -1.5 + t * 3.4, 2.2, 0, { w: 1.6, d: 0.4 });
}
mrwSign(R.g, "ALES · STOUT · CIDER", 3, 0.5, 0, 2.4, -3.86, 0, { bg: "#2A1A10", ink: "#F0D890" });
R = mrwRoom(G, "booking", X.booking[0], X.booking[1], 12, 8, { wall: "ochre", floor: "cobble", name: "the booking hall of Woking station", bare: 1, lightI: 0.9 });
mrwBox(R.g, 5, 1.2, 0.8, mrwMat("darkoak"), -2, 0, -3);
mrwBox(R.g, 5, 1.4, 0.06, mrwMat("pane"), -2, 1.2, -3.1);
for (t = 0; t < 3; t++)
mrwBench(R.g, -4 + t * 3, 2, 0, { w: 2.2, d: 0.5 });
mrwSign(R.g, "LONDON & SOUTH WESTERN RAILWAY", 6, 0.6, 2, 2.8, -3.86, 0, { bg: "#1E3A5A", ink: "#F4F0E0" });
mrwSign(R.g, "WATERLOO 50 MIN · WEYBRIDGE · GUILDFORD", 5, 0.4, 2, 2.0, -3.86, 0, { bg: "#F4F0E0", ink: "#1E2A3A" });
R = mrwRoom(G, "college", X.college[0], X.college[1], 10, 8, { wall: "greenpaper", name: "the College Arms", beams: true });
mrwBox(R.g, 5, 1.1, 0.8, mrwMat("darkoak"), 1, 0, -2.6);
mrwHearth(R.g, -4.8, 0, Math.PI / 2, { h: R.h });
for (t = 0; t < 3; t++) {
mrwTable(R.g, -2 + t * 2.4, 1.6, 1.0, 0.8, 0.74, {});
mrwChair(R.g, -2 + t * 2.4, 2.3, Math.PI, {});
}
R = mrwRoom(G, "news", X.news[0], X.news[1], 7, 6, { wall: "plaster", name: "the newsagent's by the station", bare: 1 });
mrwBox(R.g, 4, 1.0, 0.7, mrwMat("oak"), 0, 0, -1.8);
for (t = 0; t < 8; t++)
mrwBox(R.g, 0.36, 0.04, 0.5, mrwLam(0xE8E2D0), -1.6 + t * 0.45, 1.0, -1.8);
mrwShelves(R.g, -3.3, 0.6, 2.4, 2.2, Math.PI / 2, {});
R = mrwRoom(G, "cousin", X.cousin[0], X.cousin[1], 9, 7, { wall: "bluepaper", name: "my cousin's house at Leatherhead" });
mrwTable(R.g, 0, 0, 1.8, 1.0, 0.76, { cloth: 0xF4F0E8 });
mrwChair(R.g, -0.6, -0.8, 0, {});
mrwChair(R.g, 0.6, -0.8, 0, {});
mrwHearth(R.g, -4.3, 0, Math.PI / 2, { h: R.h });
mrwShelves(R.g, 4.3, 0, 2.6, 2.2, -Math.PI / 2, {});
mrwPicture(R.g, 0, 2.4, -3.38, 0, 1.2, 0.8);
R = mrwRoom(G, "cott", X.cott[0], X.cott[1], 7, 6, { wall: "plaster", floor: "planks", name: "a cottage at Horsell", beams: true });
mrwHearth(R.g, 0, -2.8, 0, { h: R.h, pot: 1 });
mrwTable(R.g, 1.4, 0.6, 1.2, 0.8, 0.74, {});
mrwChair(R.g, 1.4, 1.3, Math.PI, {});
mrwBed(R.g, -2.4, 0.4, Math.PI / 2, {});
},
function (G) {
var st = MRW.st, P = MRW_WK.pit, y = mrwWokH(P[0], P[1]), cyl = st.cyl || "none";
if (cyl === "none")
return;
var c = mrwCylinder(G, P[0], y + 4, P[1], { rx: 0.22, ry: 0.6, open: cyl === "open" || cyl === "empty" });
MRW.wkCyl = c;
if (cyl === "open" || cyl === "empty") {
var L = c.userData.lid;
L.position.x = -6;
L.position.z = 13;
L.rotation.y = 0.5;
L.rotation.x = 0.3;
}
mrwSolid(P[0], P[1], 26, 26, y - 2, y + 16, 0.6);
mrwPlant(G, "rock", mrwScatter(301, mrwLite() ? 10 : 24, P[0] - 34, P[1] - 34, P[0] + 34, P[1] + 34, function (x, z) { var d = Math.hypot(x - P[0], z - P[1]); return d > 18 && d < 34; }, mrwWokH, 0.4, 1.0), { mat: mrwMat("sand"), keepAll: true });
if (cyl === "open" && !st.burnt) {
for (var i = 0; i < 2; i++)
mrwMartian(G, P[0] + 4 - i * 7, y + 2, P[1] + 10 + i * 2, Math.PI * 0.8, { s: 1.8 });
}
if (st.pitray) {
var T = mrwTripod(G, P[0] - 2, P[1] + 6, { h: 5, hfn: mrwWokH, ry: Math.PI * 0.7 });
MRW.wkHump = T;
}
if (cyl === "empty") {
mrwHandler(G, P[0] + 8, y - 1, P[1] - 6, 1.2);
}
},
function (G) {
var lite = mrwLite(), X = MRW_ROOMXZ.woking, st = MRW.st, burnt = !!st.burnt, H = mrwWokH;
mrwFar(G, H);
mrwTerrain(G, -900, -900, 1800, 1800, lite ? 18 : 10, H, mrwMat("meadow"), function (x, z, y, c) {
var g = 0.8 + mrwFbm(x * 0.03, z * 0.03, 2) * 0.24, dp = Math.hypot(x - MRW_WK.pit[0], z - MRW_WK.pit[1]);
if (dp < 24) {
c.setRGB(0.86, 0.76, 0.56);
return;
}
var heath = z < -90 && x < 120 && x > -760;
if (burnt && heath && dp < 330 && x < 40) {
c.setRGB(0.22 * g, 0.2 * g, 0.18 * g);
return;
}
if (heath) {
c.setRGB(0.6 * g, 0.56 * g, 0.42 * g);
return;
}
if (y < 0) {
c.setRGB(0.5, 0.46, 0.36);
return;
}
c.setRGB(0.66 * g, 0.82 * g, 0.48 * g);
});
var cn = mrwWater(G, 0, MRW_WK.canal, 1800, 10, -0.5, 0x3A4A3A, 0.9);
cn.userData.fz = 0;
cn.userData.fx = 0.3;
Object.keys(MRW_WK_ROADS).forEach(function (k) { mrwStrip(G, MRW_WK_ROADS[k], k === "town" ? 14 : 6, H, mrwMat(k === "town" ? "paving" : "gravel"), 0.06); });
mrwRailway(G, [[-900, MRW_WK.rail], [900, MRW_WK.rail]], H);
mrwStation(G, 0, MRW_WK.rail - 6.6, 120, "WOKING", { ry: Math.PI / 2, y: H(0, MRW_WK.rail - 6) });
mrwSignal(G, -120, MRW_WK.rail + 5, H);
mrwSignal(G, 140, MRW_WK.rail - 5, H);
mrwPoles(G, [[-900, MRW_WK.rail + 9], [900, MRW_WK.rail + 9]], H, 44);
mrwBridge(G, -110, MRW_WK.canal, 22, 7, 0.6, { ry: 0.55 });
mrwBridge(G, 420, MRW_WK.canal, 22, 6, 0.6, {});
var D = function (key, p, nm) { var Rm = MRW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
mrwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
mrwShops(G, -60, 52, 6, { ry: Math.PI, names: ["GROCER", "DRAPER", "CHEMIST", "NEWSAGENT", "IRONMONGER", "BAKER"] });
D("news", mrwShopDoor(-60, 52, 6, 3, { ry: Math.PI }), "The newsagent's door");
mrwShops(G, 110, 52, 5, { ry: Math.PI, names: ["BUTCHER", "BOOTMAKER", "POST OFFICE", "TOBACCONIST", "GROCER"] });
mrwTownHouse(G, -140, 58, 12, 10, 8, { wall: "render", roof: "slate", ry: Math.PI });
mrwSign(G, "THE COLLEGE ARMS", 5, 0.7, -140, H(-140, 58) + 5.4, 52.9, Math.PI, { bg: "#2A3A2A", ink: "#F0D890" });
D("college", { x: -140, z: 51.6, ry: 0 }, "The door of the College Arms");
var rB = MRW.rooms.filter(function (r) { return r.key === "booking"; })[0];
if (rB)
mrwDoor(rB, "The booking hall", -5, MRW_WK.rail - 6.6 + 20, -Math.PI / 2);
for (var i = 0; i < (lite ? 6 : 12); i++) {
var lx = -110 + i * 20;
mrwLamp(G, lx, 64, H, { lit: !!st.night });
mrwLamp(G, lx + 10, 82, H, { lit: !!st.night });
}
var vil = [[100, 22, 0], [150, 18, 0], [260, 18, 0], [320, 14, 0], [470, 20, 0], [520, 24, 0], [110, 124, Math.PI], [170, 128, Math.PI], [250, 124, Math.PI], [330, 120, Math.PI], [430, 118, Math.PI], [500, 126, Math.PI]];
vil.forEach(function (v, i) { mrwVilla(G, v[0], v[1], { ry: v[2], w: 9 + (i % 3), d: 8, brick: [0xB86A4E, 0xA85A42, 0xC8806A, 0xB87A5E][i % 4], door: [0x2A3A2A, 0x3A1E1E, 0x1E2A3A][i % 3] }); });
mrwVilla(G, 400, 8, { w: 11, d: 9, ry: 0, brick: 0xB0644A });
var hd = mrwVillaDoor(400, 8, { w: 11, d: 9 });
MRW.wkHomeDoor = hd;
var rS = MRW.rooms.filter(function (r) { return r.key === "study"; })[0];
if (rS)
mrwDoor(rS, "The front door of my house", hd.x, hd.z, hd.ry);
var rD = MRW.rooms.filter(function (r) { return r.key === "dining"; })[0];
if (rD)
mrwDoor(rD, "The garden door, into the dining-room", 392, -3.6, 0);
mrwPaling(G, [[384, -6], [384, -40], [420, -40], [420, -6]], H, { hedge: true });
mrwPlant(G, "tree", [{ x: 404, z: -26, y: H(404, -26), s: 0.9, ry: 0 }], { col: 0x5A8A3A, keepAll: true });
if (!lite)
mrwPlant(G, "flowers", mrwScatter(31, 40, 388, -36, 416, -10, null, H, 0.7, 1.1), { col: "#E8A0C0" });
mrwTownHouse(G, 210, 30, 14, 10, 8, { wall: "render", roof: "tile", trim: "oak" });
D("spotted", { x: 210, z: 36.4, ry: Math.PI }, "The door of the Spotted Dog");
var post = mrwCyl(G, 0.12, 0.14, 5, mrwMat("darkoak"), 226, H(226, 40), 40, 8);
mrwSign(G, "THE SPOTTED DOG", 2.6, 1.4, 226, H(226, 40) + 4.2, 40.2, 0, { bg: "#F2EAD4", ink: "#2A1A10" });
mrwCart(G, 196, 44, Math.PI / 2, { seat: true, len: 2.2, w: 1.4, hcol: 0x3A2A1A });
MRW_AT.dogcart = { sc: "woking", x: 192, z: 50, name: "the landlord's dog-cart" };
for (i = 0; i < 8; i++) {
var hx = -300 - i * 26, hz = -110 + (i % 2 ? -22 : 20);
mrwTownHouse(G, hx, hz, 9, 8, 6, { wall: i % 3 ? "render" : "brick", roof: i % 2 ? "tile" : "slate", ry: i % 2 ? 0 : Math.PI });
}
var rC = MRW.rooms.filter(function (r) { return r.key === "cott"; })[0];
if (rC)
mrwDoor(rC, "The door of a cottage at Horsell", -300, -110 + 20 - 4.6, 0);
mrwChurch(G, -480, -170, { len: 22, w: 10, h: 9, tower: 5, th: 18, ry: Math.PI / 2 });
var onCommon = function (x, z) { return z < -90 && x < 120 && x > -760 && Math.hypot(x - MRW_WK.pit[0], z - MRW_WK.pit[1]) > 36 && mrwPathD(x, z, MRW_WK_ROADS.stn) > 6 && mrwPathD(x, z, MRW_WK_ROADS.chob) > 6 && mrwPathD(x, z, MRW_WK_ROADS.ott) > 6; };
var pines = mrwScatter(41, lite ? 90 : 240, -760, -860, 140, -90, onCommon, H, 0.8, 1.3);
if (burnt) {
var near = function (t) { return Math.hypot(t.x - MRW_WK.pit[0], t.z - MRW_WK.pit[1]) < 300 && t.x < 40; };
mrwConifer(G, pines.filter(function (t) { return !near(t); }));
mrwDeadTrees(G, pines.filter(near).map(function (t) { return { x: t.x, z: t.z, y: t.y, s: t.s * 1.3, ry: t.ry }; }));
if (!lite)
for (i = 0; i < 9; i++) {
var a = i * 0.7, fx = MRW_WK.pit[0] + Math.cos(a) * (70 + i * 22), fz = MRW_WK.pit[1] + Math.sin(a) * (60 + i * 18);
var f = mrwFire(G, fx, H(fx, fz), fz, 1.2 + i % 3 * 0.5);
f.userData.keep = 1;
mrwSmoke(G, fx, H(fx, fz) + 2, fz, 0x3A3430, 6);
}
mrwScorch(G, -160, -290, 60, H, lite ? 2 : 5);
mrwScorch(G, -300, -380, 50, H, lite ? 1 : 4);
}
else
mrwConifer(G, pines);
mrwPlant(G, "bush", mrwScatter(42, lite ? 160 : 420, -760, -860, 140, -90, onCommon, H, 0.3, 0.7), { col: burnt ? 0x2A2620 : 0x6A4A5A });
mrwPlant(G, "bush", mrwScatter(43, lite ? 60 : 160, -760, -860, 140, -90, onCommon, H, 0.4, 0.8), { col: burnt ? 0x2A2620 : 0x8A8A2A });
var oy = H(60, -690), ob = new THREE.Group();
ob.position.set(60, oy, -690);
G.add(ob);
mrwCyl(ob, 6, 6, 5, mrwS("brick", 0xA86048, 1.4), 0, 0, 0, 24);
var dm = new THREE.Mesh(mrwGeo("odome", function () { return new THREE.SphereGeometry(6.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2); }), mrwShine(0xC8CCD0, 0.45, 0.6));
dm.position.y = 5;
ob.add(dm);
mrwBox(ob, 1.4, 6, 0.4, mrwLam(0x1A1A20), 0, 6, 0);
mrwBox(ob, 1.3, 2.3, 0.1, mrwMat("darkoak"), 0, 0, 6.02);
mrwRound(60, -690, 6.2, oy - 1, oy + 11);
var rO = MRW.rooms.filter(function (r) { return r.key === "obs"; })[0];
if (rO)
mrwDoor(rO, "The door of the observatory", 60, -682.8, 0);
mrwPlant(G, "tree", mrwScatter(44, lite ? 14 : 30, -40, -800, 160, -600, function (x, z) { return Math.hypot(x - 60, z + 690) > 16; }, H, 0.8, 1.2), { col: 0x4A7A34 });
mrwPaling(G, [[38, -662], [38, -712], [82, -712], [82, -662], [64, -662]], H, {});
mrwPaling(G, [[56, -662], [38, -662]], H, {});
mrwLamp(G, 64.5, -681.5, H, { lit: true });
mrwBench(G, 51, -676, Math.PI / 2, {});
mrwCart(G, 74, -668, 2.4, {});
var heath = function (x, z) { var d = Math.hypot(x - 60, z + 690); return d > 9 && !(Math.abs(x - 60) < 3.5 && z > -683 && z < -655) && mrwPathD(x, z, MRW_WK_ROADS.ott) > 5 && !(Math.abs(z + 662) < 1.6 && x > 36 && x < 84); };
mrwPlant(G, "bush", mrwScatter(47, lite ? 30 : 80, 10, -740, 110, -630, heath, H, 0.4, 0.8), { col: 0x5A3A5A });
mrwPlant(G, "bush", mrwScatter(48, lite ? 16 : 40, 10, -740, 110, -630, heath, H, 0.5, 0.9), { col: 0x6A7A2A });
mrwPlant(G, "conifer", mrwScatter(49, lite ? 6 : 14, 0, -760, 130, -620, function (x, z) { return Math.hypot(x - 60, z + 690) > 22 && Math.abs(x - 60) > 6 && mrwPathD(x, z, MRW_WK_ROADS.ott) > 6; }, H, 0.6, 0.9), { col: 0x2A3A22 });
var field = function (x, z) { return !(z < -90 && x < 120 && x > -760) && Math.abs(z - MRW_WK.canal) > 12 && Math.abs(z - MRW_WK.rail) > 14 && !(x > -180 && x < 240 && z > 30 && z < 140) && Object.keys(MRW_WK_ROADS).every(function (k) { return mrwPathD(x, z, MRW_WK_ROADS[k]) > 8; }) && !(Math.abs(x - 400) < 40 && Math.abs(z - 10) < 40); };
mrwPlant(G, "tree", mrwScatter(45, lite ? 120 : 300, -880, -880, 880, 880, field, H, 0.8, 1.4), { col: 0x4A7A34 });
mrwPlant(G, "grass", mrwScatter(46, lite ? 200 : 520, -880, 140, 880, 880, field, H, 0.8, 1.4), { col: 0xC8D898 });
for (i = 0; i < 7; i++) {
var lx2 = 700 + (i % 3) * 30 - 30, lz2 = 650 + Math.floor(i / 3) * 30;
mrwVilla(G, lx2, lz2, { w: 8, d: 7, ry: Math.PI / 2, garden: false, brick: [0xB86A4E, 0xC8806A][i % 2] });
}
var cd = mrwVillaDoor(700, 710, { w: 9, d: 8, ry: Math.PI / 2 });
mrwVilla(G, 700, 710, { w: 9, d: 8, ry: Math.PI / 2 });
var rCu = MRW.rooms.filter(function (r) { return r.key === "cousin"; })[0];
if (rCu)
mrwDoor(rCu, "The door of my cousin's house", cd.x, cd.z, cd.ry);
mrwChurch(G, 780, 760, { len: 22, w: 10, h: 9, tower: 5, th: 20 });
for (i = 0; i < 6; i++) {
var bp = MRW_WK_ROADS.byf[2 + (i % 3)];
mrwTownHouse(G, bp[0] + (i % 2 ? 18 : -18), bp[1] + i * 6 - 10, 8, 7, 6, { wall: "brick", roof: "slate", ry: i % 2 ? -Math.PI / 2 : Math.PI / 2 });
}
mrwPaling(G, [[60, 140], [60, 300], [300, 300], [300, 140]], H, { hedge: true });
mrwPaling(G, [[-300, 200], [-140, 200], [-140, 320]], H, { hedge: true });
mrwPaling(G, [[480, 120], [560, 320]], H, { hedge: true });
mrwPoles(G, MRW_WK_ROADS.may, H, 40);
mrwPoles(G, MRW_WK_ROADS.lea, H, 50);
if (st.weed)
mrwRedWeed(G, mrwScatter(47, lite ? 120 : 320, -760, -860, 500, 200, function (x, z) { return (onCommon(x, z) || Math.abs(z - MRW_WK.canal) < 18) && Math.abs(z - MRW_WK.canal) > 5; }, H, 0.7, 1.6));
mrwWokPit(G);
},
function (G) {
var st = MRW.st, H = mrwWokH, P = MRW_WK.pit;
if (st.crowd) {
mrwCrowd("pitc", [["A boy on the edge of the pit", "m", "boy", "It's 'ollow! Someone's inside, unscrewin' it!", null, true], ["A cyclist", "m", "gent", "Rode over from Chertsey as soon as I heard. Is it a meteorite or isn't it?"],
["A jobbing gardener", "m", "worker", "I do the gardening for Mr. Stent's man, sir. Never saw the like."], ["A girl with a baby", "f", "maid", "They say there's men in it, from Mars! I don't believe it."], ["A young man selling ginger-beer", "m", "worker", "Ginger-beer! Penny a bottle! Fresh this morning!"],
["A shop assistant", "m", "gent", "Closed the shop. Everyone's here."], ["A lady in a hat", "f", "lady", "Do you think it's safe, standing so near?"], ["Two lads from the station", "m", "boy", "We're going to throw stones at it.", null, true],
["A man with a dog", "m", "worker", "Dog won't go near it. Look at him."], ["A cab-driver", "m", "cabby", "Brought four from the station, I have. Busy day."], ["An old woman", "f", "maid", "It's a judgement, that's what it is."], ["A railwayman", "m", "porter", "Trains all running late with the crowds."]], P[0] - 60, P[1] - 10, P[0] + 30, P[1] + 50, { wander: 5, ok: function (x, z) { return Math.hypot(x - P[0], z - P[1]) > 26; } });
}
if (st.soldiers) {
mrwCrowd("sold", [["A soldier of the Cardigan regiment", "m", "mrarty", "Back, sir. No one past the bridge."], ["A sergeant", "m", "mrarty", "They've sent for guns from Aldershot."], ["A trooper", "m", "mrhussar", "We go round by Horsell, sir."], ["A sapper", "m", "mrarty", "Digging a trench, we are. Orders."], ["A young private", "m", "mrarty", "What do they look like? Is it true they've got no legs?"]], -150, -120, -60, -40, { wander: 4, persona: MRP.soldier });
if (!mrwLite())
[[-140, -110], [-90, -100]].forEach(function (q, i) { var g = new THREE.Group(); g.position.set(q[0], H(q[0], q[1]), q[1]); g.rotation.y = Math.PI * 0.9; MRW.scG.add(g); g.userData.keep = 1; mrwCyl(g, 0.7, 0.7, 0.1, mrwMat("darkoak"), -0.9, 0.7, 0, 14).rotation.z = Math.PI / 2; mrwCyl(g, 0.7, 0.7, 0.1, mrwMat("darkoak"), 0.9, 0.7, 0, 14).rotation.z = Math.PI / 2; var br = mrwCyl(g, 0.12, 0.16, 2.6, mrwMat("iron"), 0, 1.0, -0.6, 10); br.rotation.x = Math.PI / 2 - 0.15; mrwBox(g, 0.6, 0.4, 1.6, mrwMat("darkoak"), 0, 0.7, 0.8); });
}
if (!st.empty) {
mrwCrowd("town", [["The stationmaster", "m", "porter", "The 6.45 from Waterloo's due."], ["A newsboy", "m", "newsboy", "Star fallen on 'Orsell Common! Read all about it!", null, true], ["A lady with a basket", "f", "lady", "Such a fuss over a meteorite."], ["A cabman", "m", "cabby", "Cab, sir? To the common? A shilling."],
["A porter", "m", "porter", "Mind your backs!"], ["A clergyman", "m", "clergy", "A wonderful thing, a visitor from the skies, if it is one."], ["A schoolmaster", "m", "gent", "I've told the boys to stay away. Naturally they've all gone."], ["A housemaid", "f", "maid", "Cook says the milk's gone off with the heat."], ["A carrier", "m", "worker", "Got a load for Byfleet. Anyone want a ride?"]], -100, 60, 160, 90, { wander: 6 });
}
if (st.empty) {
mrwCrowd("flee", [["A man loading a cart", "m", "worker", "Going while we can. You'd best do the same."], ["A woman with a bundle", "f", "maid", "Have you seen my husband? He went to the common."]], -80, 60, 120, 90, { wander: 4 });
}
mrwCrowd("hor", [["A Horsell cottager", "m", "worker", "My chimney's facing the common. Saw the light come down."], ["A woman at her gate", "f", "maid", "I've told the children to keep in."], ["The Horsell carrier", "m", "worker", "Going to Chobham, if they'll let me past."]], -420, -140, -300, -90, { wander: 5 });
mrwCrowd("may", [["A neighbour at his gate", "m", "gent", "Good evening! Been to see the thing? I'm told it's quite cool now."], ["A nursemaid with a perambulator", "f", "maid", "Off to see the fun, sir?"], ["The milkman", "m", "worker", "Milk-o! Same as any other day, sir."]], 250, 30, 470, 60, { wander: 5 });
mrwCrowd("lea", [["A Leatherhead shopkeeper", "m", "gent", "Martians, at Woking? You don't say. Twelve miles is a long way."], ["A woman at the pump", "f", "maid", "Quiet here, thank goodness."]], 690, 650, 770, 740, { wander: 4 });
},
function (st) {
var T = MRW.wkHump;
if (T) {
T.rayOn = !!st.ray;
if (st.ray) {
var t = MRW.t * 0.25, P = MRW_WK.pit;
T.rayTo = { x: P[0] + 60 + Math.sin(t) * 50, z: P[1] + 70 + Math.cos(t * 0.7) * 30 };
}
}
(MRW.tripods || []).forEach(function (Tr) { if (Tr === T)
return; Tr.sp = st.tri === "walk" || st.tri === "storm" ? 6 : 0; Tr.rayOn = st.tri === "fire"; if (Tr.rayOn)
Tr.rayTo = { x: Tr.x + Math.sin(Tr.ry) * 120, z: Tr.z + Math.cos(Tr.ry) * 120 }; });
},
function (G) {
mrwWokRooms(G);
mrwWoking(G);
mrwWokFolk(G);
var st = MRW.st, H = mrwWokH;
if (st.tri === "storm")
mrwTripod(G, 560, 240, { hfn: H, ry: -0.6, path: [[560, 240], [300, 420], [-60, 520], [-300, 200], [60, -100], [420, -60]], sp: 6 });
if (st.tri === "far" || st.tri === "walk" || st.tri === "fire") {
mrwTripod(G, -260, -420, { hfn: H, ry: 0.9, path: [[-260, -420], [-80, -300], [-200, -160], [-380, -300]], sp: 0 });
mrwTripod(G, -420, -260, { hfn: H, ry: 0.2, path: [[-420, -260], [-300, -120], [-520, -180]], sp: 0 });
}
if (st.tri === "fallen")
mrwTripod(G, -60, -160, { hfn: H, ry: 1.1, dead: true });
MRW.live = mrwWokLive;
mrwWokLive(st);
[["spotted", "The landlord of the Spotted Dog", "m", "worker", "What'll it be? Everyone's talking of nothing but the common."], ["booking", "The booking clerk", "m", "porter", "Return to Waterloo, sir? Trains are all behind today."], ["news", "The newsagent", "m", "gent", "Evening papers aren't in yet. Everyone wants them."], ["college", "The barman of the College Arms", "m", "worker", "They say the Astronomer Royal himself's come down."], ["cott", "The cottager's wife", "f", "maid", "Will you sit, sir? You look all in."]].forEach(function (F, i) {
var R = MRW.rooms.filter(function (r) { return r.key === F[0]; })[0];
if (R && !(F[0] === "spotted" && st.noLandlord))
mrwOne("wkr" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 1.2, Math.PI, F[4], { y: R.y, persona: MRP.townfolk });
});
},
function (x, z) {
var n = mrwFbm(x * 0.007, z * 0.007, 3), h = 1.6 + n * 2.2;
var d = Math.abs(z - mrwThZ(x)), H = MRW_TH.half;
if (d < H + 14) {
var t = Math.max(0, (d - H) / 14);
var bed = d < H ? (-3.2 + 2.6 * Math.pow(d / H, 3)) : (-0.6 + (h + 0.6) * mrwSmooth(0, 1, t));
h = d < H ? bed : Math.min(h, bed);
}
if (z > mrwThZ(x) + H - 4) {
var dw = Math.abs(x - mrwWeyX(z));
if (dw < MRW_TH.wey + 8) {
var bw = dw < MRW_TH.wey ? (-2.2 + 1.6 * Math.pow(dw / MRW_TH.wey, 2)) : Math.min(h, -0.6 + (h + 0.6) * mrwSmooth(0, 1, (dw - MRW_TH.wey) / 8));
h = Math.min(h, bw);
}
}
var db = Math.hypot(x - MRW_TH.conf[0], z - MRW_TH.conf[1]);
if (db < 44 && z > mrwThZ(x)) {
var s = Math.max(-0.95, 0.6 - (44 - db) * 0.045);
h = Math.max(h, s);
}
return h;
},
function (G) {
var X = MRW_ROOMXZ.thames, R;
R = mrwRoom(G, "wshop", X.wshop[0], X.wshop[1], 9, 7, { wall: "render", name: "a grocer's shop at Weybridge", bare: 1 });
mrwBox(R.g, 5, 1.0, 0.7, mrwMat("oak"), 0, 0, -1.8);
mrwShelves(R.g, -4.3, 0, 3.4, 2.6, Math.PI / 2, { jars: 1 });
mrwShelves(R.g, 4.3, 0, 3.4, 2.6, -Math.PI / 2, { jars: 1 });
for (var i = 0; i < 5; i++)
mrwBox(R.g, 0.5, 0.5, 0.5, mrwMat("planks"), -2 + i * 0.9, 0, 1.6);
R = mrwRoom(G, "wcott", X.wcott[0], X.wcott[1], 7, 6, { wall: "plaster", floor: "planks", name: "a labourer's cottage", beams: true });
mrwHearth(R.g, 0, -2.8, 0, { h: R.h, pot: 1 });
mrwTable(R.g, 1.4, 0.4, 1.2, 0.8, 0.74, {});
mrwBed(R.g, -2.4, 0.6, Math.PI / 2, {});
R = mrwRoom(G, "ferry", X.ferry[0], X.ferry[1], 7, 6, { wall: "render", floor: "planks", name: "the ferryman's house" });
mrwHearth(R.g, -3.3, 0, Math.PI / 2, { h: R.h });
mrwTable(R.g, 1, 0, 1.2, 0.8, 0.74, {});
mrwChair(R.g, 1, 0.8, Math.PI, {});
for (i = 0; i < 3; i++)
mrwBox(R.g, 0.06, 2.6, 0.06, mrwMat("oak"), 3.2, 0, -2 + i * 0.3);
R = mrwRoom(G, "sinn", X.sinn[0], X.sinn[1], 10, 8, { wall: "greenpaper", name: "an inn at Shepperton", beams: true });
mrwBox(R.g, 5, 1.1, 0.8, mrwMat("darkoak"), 0, 0, -2.6);
mrwHearth(R.g, -4.8, 0, Math.PI / 2, { h: R.h });
for (i = 0; i < 3; i++) {
mrwTable(R.g, -2 + i * 2.4, 1.6, 1.0, 0.8, 0.74, {});
mrwChair(R.g, -2 + i * 2.4, 2.3, Math.PI, {});
}
R = mrwRoom(G, "uhouse", X.uhouse[0], X.uhouse[1], 9, 8, { wall: "bluepaper", name: "a deserted house at Upper Halliford", lightI: 0.5 });
mrwWindowIn(R.g, 0, 1.8, -3.88, 0, 2.0, 1.6, { sky: 0x2A3040 });
mrwTable(R.g, 0, -2.4, 1.6, 0.7, 0.76, {});
mrwChair(R.g, -0.6, -1.8, Math.PI, {});
mrwChair(R.g, 0.6, -1.8, Math.PI, {});
mrwShelves(R.g, -4.3, 0, 2.6, 2.4, Math.PI / 2, {});
mrwHearth(R.g, 4.3, 0.5, -Math.PI / 2, { h: R.h });
mrwRug(R.g, 0, 0.4, 3, 2, 0x5A3A2A);
R = mrwRoom(G, "hparl", X.hparl[0], X.hparl[1], 8, 7, { wall: "plaster", floor: "planks", name: "the kitchen of the house at Upper Halliford", bare: 1 });
mrwHearth(R.g, 0, -3.3, 0, { h: R.h, pot: 1 });
mrwTable(R.g, 0, 0, 1.8, 0.9, 0.76, {});
mrwShelves(R.g, -3.8, 0, 2.6, 2.2, Math.PI / 2, { jars: 1 });
mrwShelves(R.g, 3.8, 0, 2.6, 2.2, -Math.PI / 2, { jars: 1 });
},
function (G) {
var lite = mrwLite(), st = MRW.st, H = mrwThH, burnt = !!st.thburnt;
mrwFar(G, H);
mrwTerrain(G, -860, -860, 1720, 1720, lite ? 18 : 10, H, mrwMat("meadow"), function (x, z, y, c) {
var g = 0.8 + mrwFbm(x * 0.03, z * 0.03, 2) * 0.24;
if (y < 0.9) {
c.setRGB(0.62 * g, 0.58 * g, 0.46 * g);
return;
}
if (burnt && x > -460 && x < 60 && z > -60 && z < 300) {
c.setRGB(0.3 * g, 0.28 * g, 0.24 * g);
return;
}
c.setRGB(0.6 * g, 0.8 * g, 0.44 * g);
});
var wt = mrwWater(G, 0, 0, 5200, 5200, 0, 0x4A5A50, 0.88);
wt.userData.fx = 0.4;
wt.userData.fz = 0.1;
Object.keys(MRW_TH_ROADS).forEach(function (k) { mrwStrip(G, MRW_TH_ROADS[k], k === "high" ? 9 : 6, H, mrwMat(k === "high" ? "paving" : "gravel"), 0.06); });
mrwShops(G, -420, 206, 6, { ry: Math.PI, names: ["GROCER", "DRAPER", "CHEMIST", "SADDLER", "BUTCHER", "BAKER"] });
var sd = mrwShopDoor(-420, 206, 6, 0, { ry: Math.PI });
var rW = MRW.rooms.filter(function (r) { return r.key === "wshop"; })[0];
if (rW)
mrwDoor(rW, "The grocer's door, smashed open", sd.x, sd.z, sd.ry);
mrwShops(G, -420, 236, 6, { ry: 0, names: ["IRONMONGER", "STATIONER", "POST OFFICE", "TOBACCONIST", "DAIRY", "HOTEL"] });
var fy = H(MRW_TH.fount[0], MRW_TH.fount[1]), fg = new THREE.Group();
fg.position.set(MRW_TH.fount[0], fy, MRW_TH.fount[1]);
G.add(fg);
mrwCyl(fg, 1.4, 1.6, 0.6, mrwMat("ashlar"), 0, 0, 0, 16);
mrwCyl(fg, 0.4, 0.5, 2.4, mrwMat("ashlar"), 0, 0.6, 0, 10);
mrwCyl(fg, 0.7, 0.5, 0.3, mrwMat("granite"), 0, 3, 0, 12);
mrwBox(fg, 0.6, 0.6, 0.6, mrwMat("ashlar"), 0, 3.3, 0);
mrwRound(MRW_TH.fount[0], MRW_TH.fount[1], 1.6, fy - 1, fy + 3);
mrwChurch(G, -520, 150, { len: 24, w: 11, h: 10, tower: 6, th: 22, ry: Math.PI / 2 });
[[-300, 270], [-260, 280], [-460, 290], [-500, 170], [-560, 250], [-330, 140], [-470, 120]].forEach(function (v, i) { mrwVilla(G, v[0], v[1], { ry: i % 2 ? Math.PI : 0, w: 9 + (i % 3), d: 8, brick: [0xB86A4E, 0xC8806A, 0xA85A42][i % 3] }); });
for (var i = 0; i < (lite ? 5 : 10); i++) {
mrwLamp(G, -480 + i * 22, 214, H, {});
}
mrwBridge(G, MRW_TH.bridge[0], MRW_TH.bridge[1], 30, 8, 0.2, { ry: Math.PI / 2 });
if (!st.thburnt) {
var rp = [[-170, 170], [-150, 178], [-130, 184], [-110, 188]];
mrwStrip(G, [[-176, 196], [-100, 206]], 6, function (x, z) { return H(x, z) + 1.3; }, mrwMat("earth"), 0);
rp.forEach(function (q) { var g = new THREE.Group(); g.position.set(q[0], H(q[0], q[1]), q[1]); g.rotation.y = Math.PI * 0.85; G.add(g); mrwCyl(g, 0.7, 0.7, 0.1, mrwMat("darkoak"), -0.9, 0.7, 0, 14).rotation.z = Math.PI / 2; mrwCyl(g, 0.7, 0.7, 0.1, mrwMat("darkoak"), 0.9, 0.7, 0, 14).rotation.z = Math.PI / 2; var br = mrwCyl(g, 0.12, 0.16, 2.6, mrwMat("iron"), 0, 1.0, -0.6, 10); br.rotation.x = Math.PI / 2 - 0.15; mrwBox(g, 0.6, 0.4, 1.6, mrwMat("darkoak"), 0, 0.7, 0.8); });
}
var fl = mrwBox(G, 6, 0.3, 14, mrwMat("planks"), -232, 0.4, -110);
mrwFloor(-232, -110, 6, 14, 0.7);
mrwTownHouse(G, -256, -70, 8, 7, 6, { wall: "render", roof: "tile", ry: Math.PI / 2 });
var rF = MRW.rooms.filter(function (r) { return r.key === "ferry"; })[0];
if (rF)
mrwDoor(rF, "The ferryman's door", -251.6, -70, -Math.PI / 2);
var boats = [[-226, -128, 0.3], [-240, -132, -0.2], [-200, -150, 1.2], [-252, -140, 0.6], [-180, -128, 1.5], [-264, -206, 0.1], [-288, -210, 2.6], [-160, -170, 0.9]];
if (!lite)
boats = boats.concat([[-140, -150, 2.2], [-300, -160, 0.4], [-120, -180, 1.9]]);
boats.forEach(function (b) { var bb = mrwBoat(G, b[0], 0.05, b[1], b[2], {}); bb.userData.keep = 1; if (Math.round(b[0]) % 3 === 0)
mrwBox(bb, 0.8, 0.5, 0.6, mrwMat("planks"), 0, 0.6, 0.8); });
mrwBox(G, 6, 0.3, 10, mrwMat("planks"), -276, 0.4, -212);
mrwFloor(-276, -212, 6, 10, 0.7);
mrwChurch(G, -320, -350, { len: 20, w: 10, h: 9, tower: 6, th: 24 });
for (i = 0; i < 9; i++) {
var sx = -230 - (i % 3) * 28, sz = -300 - Math.floor(i / 3) * 30;
mrwTownHouse(G, sx, sz, 9, 8, 7, { wall: i % 2 ? "brick" : "render", roof: i % 3 ? "tile" : "slate", ry: Math.PI / 2 });
}
mrwTownHouse(G, -250, -260, 12, 9, 8, { wall: "render", roof: "slate", ry: Math.PI });
mrwSign(G, "THE SHIP", 3, 0.7, -250, H(-250, -260) + 5, -255.4, 0, { bg: "#1E2A3A", ink: "#F0D890" });
var rI = MRW.rooms.filter(function (r) { return r.key === "sinn"; })[0];
if (rI)
mrwDoor(rI, "The door of the Ship", -250, -254.6, 0);
for (i = 0; i < 8; i++)
mrwVilla(G, 220 + (i % 4) * 34, -20 + Math.floor(i / 4) * 60, { ry: i < 4 ? 0 : Math.PI, w: 9, d: 8, brick: [0xB86A4E, 0xC8806A][i % 2] });
mrwChurch(G, 320, 80, { len: 22, w: 10, h: 9, tower: 5, th: 20, ry: Math.PI / 2 });
for (i = 0; i < 7; i++)
mrwTownHouse(G, 380 + i * 26, -266 - (i % 2) * 44, 9, 8, 6, { wall: i % 2 ? "brick" : "render", roof: i % 2 ? "tile" : "slate", ry: i % 2 ? 0 : Math.PI });
for (i = 0; i < 5; i++)
mrwTownHouse(G, 700 + i * 26, -290 - (i % 2) * 50, 9, 8, 6, { wall: "brick", roof: "slate", ry: i % 2 ? 0 : Math.PI });
for (i = 0; i < 5; i++)
mrwTownHouse(G, -560 - i * 30, -280 - (i % 2) * 40, 9, 8, 6, { wall: "render", roof: "tile", ry: i % 2 ? 0 : Math.PI });
mrwPaling(G, [[380, -360], [560, -376], [620, -420]], H, { hedge: true });
mrwPaling(G, [[440, -420], [440, -500]], H, { hedge: true });
mrwVilla(G, 500, -560, { w: 11, d: 9, ry: Math.PI, brick: 0xB0644A });
var uhd = mrwVillaDoor(500, -560, { w: 11, d: 9, ry: Math.PI });
var rU = MRW.rooms.filter(function (r) { return r.key === "uhouse"; })[0];
if (rU)
mrwDoor(rU, "The front door of the deserted house", uhd.x, uhd.z, uhd.ry);
var rK = MRW.rooms.filter(function (r) { return r.key === "hparl"; })[0];
if (rK)
mrwDoor(rK, "The back door, to the kitchen", 508, -578, Math.PI);
MRW_AT.uhback = { sc: "thames", x: 508, z: -580, name: "the back of the house at Upper Halliford" };
mrwPaling(G, [[480, -530], [520, -530]], H, {});
mrwTownHouse(G, -640, 370, 8, 7, 6, { wall: "brick", roof: "tile", ry: -0.6 });
var rC = MRW.rooms.filter(function (r) { return r.key === "wcott"; })[0];
if (rC)
mrwDoor(rC, "The cottage door", -637, 374, -0.6 + Math.PI);
var dry = function (x, z) { return mrwThWl(x, z) === null && Math.abs(z - mrwThZ(x)) > MRW_TH.half + 6 && Object.keys(MRW_TH_ROADS).every(function (k) { return mrwPathD(x, z, MRW_TH_ROADS[k]) > 7; }) && !(x > -560 && x < -240 && z > 100 && z < 320) && !(x > -340 && x < -200 && z > -400 && z < -200) && Math.hypot(x - MRW_TH.conf[0], z - MRW_TH.conf[1]) > 50; };
var bank = mrwScatter(51, lite ? 60 : 150, -860, -860, 860, 860, function (x, z) { var d = Math.abs(z - mrwThZ(x)); return d > MRW_TH.half + 4 && d < MRW_TH.half + 20 && dry(x, z); }, H, 0.9, 1.3);
mrwPlant(G, "tree", bank, { col: 0x8AA060 });
mrwConifer(G, mrwScatter(52, lite ? 80 : 200, -860, 300, -200, 860, dry, H, 0.8, 1.3));
mrwPlant(G, "tree", mrwScatter(53, lite ? 100 : 240, -860, -860, 860, 860, function (x, z) { return dry(x, z) && !(x > -860 && x < -200 && z > 300); }, H, 0.8, 1.4), { col: 0x4A7A34 });
mrwPlant(G, "grass", mrwScatter(54, lite ? 200 : 520, -860, -860, 860, 860, dry, H, 0.8, 1.3), { col: 0xC8D898 });
if (!lite)
mrwPlant(G, "flowers", mrwScatter(55, 120, 300, -500, 700, -340, dry, H, 0.6, 1.0), { col: "#F0E070" });
mrwPoles(G, MRW_TH_ROADS.high, H, 40);
if (st.thdead) {
mrwTripod(G, -150, -168, { hfn: function () { return -2.5; }, ry: 0.4, dead: true });
if (st.thdead === "steam")
for (i = 0; i < (lite ? 2 : 5); i++)
mrwSmoke(G, -150 + i * 8, 0.5, -168 + i * 3, 0xE8ECF0, 8);
}
if (burnt) {
for (i = 0; i < (lite ? 4 : 10); i++) {
var bx = -460 + i * 48, bz = 180 + (i % 3) * 30;
var f = mrwFire(G, bx, H(bx, bz) + 2, bz, 1.4 + (i % 3) * 0.5);
f.userData.keep = 1;
mrwSmoke(G, bx, H(bx, bz) + 6, bz, 0x2A2622, 6);
}
for (i = 0; i < (lite ? 2 : 6); i++) {
var cx = -300 + i * 30, cz = -320 - (i % 2) * 30;
var f2 = mrwFire(G, cx, H(cx, cz) + 2, cz, 1.6);
f2.userData.keep = 1;
}
}
},
function (G) {
var st = MRW.st, H = mrwThH;
if (st.thcrowd) {
mrwCrowd("thc", [["A boatman", "m", "worker", "Shepperton side, a shilling! Shilling a head!"], ["A man in a blue jersey", "m", "mrsailor", "They're just men in armour, I tell you. Our guns'll settle 'em."], ["A woman beside you", "f", "maid", "The sojers'll stop 'em."], ["A man with a yelping dog", "m", "gent", "Shut up, you fool! Shut up!"], ["An old man with orchids", "m", "gent", "These is vallyble. Vallyble, d'you hear? I can't leave 'em."],
["A lady with a hamper", "f", "lady", "We've been waiting an hour for the ferry."], ["A boy in a sailor suit", "m", "boy", "Will we see the Martians, Mother?", null, true], ["A gentleman with luggage", "m", "gent", "Disgraceful. No one in charge."], ["A carrier's wife", "f", "maid", "Everything we own's on that cart."], ["A waterman", "m", "mrsailor", "Punts, skiffs, anything that floats. Name your price."],
["A clerk from Walton", "m", "gent", "I heard the guns at dawn. Thought it was thunder."], ["A nursemaid", "f", "maid", "Hold my hand, Master Robert, and don't let go."], ["A butcher's boy", "m", "boy", "Me master's gone back for 'is money. 'E's mad.", null, true], ["A labourer", "m", "worker", "Me and the missus are going to Hampton. Got a sister there."]], -260, -130, -170, -60, { wander: 4, ok: function (x, z) { return mrwThWl(x, z) === null; } });
}
if (st.thtown) {
mrwCrowd("tht", [["A hussar", "m", "mrhussar", "Clear out! Everyone's to clear out! Orders!"], ["A woman loading a cart", "f", "maid", "Where are we to go? Nobody tells us anything."], ["A man in a white fatigue jacket", "m", "mrarty", "Digging since dawn, we have."], ["A patrol sergeant", "m", "mrarty", "Make for Shepperton or Walton. Keep off the Chertsey road."], ["A grocer", "m", "worker", "Take what you like. I'm not stopping."], ["A man with a perambulator full of clocks", "m", "gent", "They're worth something, you know."]], -460, 190, -280, 260, { wander: 6 });
}
if (mrwCalm(st, ["thcrowd", "thtown", "thburnt", "thtri", "thdead", "thhall", "thray"])) {
mrwCrowd("thw", [["A Weybridge lady with a parasol", "f", "lady", "Such a lovely morning for the river."], ["A gentleman reading the Sunday paper", "m", "gent", "Something about Woking in here. A meteorite, they say."], ["A boy with a hoop", "m", "boy", "Race you to the bridge!", null, true], ["A carter", "m", "worker", "Mind your backs. Coming through."], ["A girl with a basket of cress", "f", "maid", "Watercress! Fresh this morning!"], ["A churchwarden", "m", "gent", "Morning service at eleven, as ever."]], -520, 250, -300, 330, { wander: 5 });
mrwCrowd("ths", [["A waterman by his skiffs", "m", "mrsailor", "Skiffs by the hour, sir. Up to Chertsey and back."], ["A young couple in a punt", "f", "lady", "Let's go as far as the lock."], ["A fisherman", "m", "worker", "Not a bite all morning. Too bright."], ["A Shepperton baker", "m", "worker", "Fresh bread and buns, Sunday or no."], ["A lady sketching the river", "f", "lady", "The light on the water is perfect just now."]], -230, -260, -60, -210, { wander: 4, ok: function (x, z) { return mrwThWl(x, z) === null; } });
if (!st.thhall)
mrwCrowd("thq", [["A Halliford gardener", "m", "worker", "Roses are fine this year."], ["A woman shelling peas on her step", "f", "maid", "Did you hear guns last night? Thunder, I expect."], ["A little girl with a kitten", "f", "girl", "Her name is Smut.", null, true]], 380, -310, 520, -260, { wander: 4 });
}
if (st.thhall) {
mrwCrowd("thh", [["A Halliford man at his gate", "m", "worker", "Saw the steam go up the river. Never seen the like."], ["A woman with two children", "f", "maid", "My husband's at Walton. Is it true about Weybridge?"]], 380, -310, 520, -260, { wander: 4 });
}
},
function (G) {
mrwThRooms(G);
mrwThames(G);
mrwThFolk(G);
var st = MRW.st, H = mrwThH;
if (st.thtri === "come") {
mrwTripod(G, -700, 60, { hfn: H, ry: 0.9, path: [[-700, 60], [-520, 0], [-360, -40], [-260, -80]], sp: 5 });
mrwTripod(G, -760, -20, { hfn: H, ry: 0.8, path: [[-760, -20], [-600, -80], [-460, -120]], sp: 4 });
mrwTripod(G, -640, 160, { hfn: H, ry: 1.0, path: [[-640, 160], [-460, 100], [-300, 60]], sp: 4 });
mrwTripod(G, -800, 120, { hfn: H, ry: 0.9, path: [[-800, 120], [-640, 40]], sp: 3 });
mrwTripod(G, -560, -200, { hfn: H, ry: 1.3, path: [[-560, -200], [-300, -160], [-150, -168]], sp: 7 });
}
if (st.thtri === "storm") {
mrwTripod(G, -340, -120, { hfn: function (x, z) { return Math.max(-2.4, H(x, z)); }, ry: 1.2, path: [[-340, -120], [-200, -150], [-60, -130], [-200, -110]], sp: 3 });
mrwTripod(G, -480, -220, { hfn: function (x, z) { return Math.max(-2.4, H(x, z)); }, ry: 1.0, path: [[-480, -220], [-560, -200]], sp: 2 });
}
if (st.thtri === "sentinel") {
mrwTripod(G, 760, -500, { hfn: H, ry: -Math.PI / 2, sp: 0 });
mrwTripod(G, -760, -480, { hfn: H, ry: Math.PI / 2, sp: 0 });
}
if (st.thtri === "smoke") {
mrwTripod(G, 760, -500, { hfn: H, ry: -Math.PI / 2, path: [[760, -500], [820, -200], [840, 100]], sp: 3 });
mrwBlackSmoke(G, 680, -80, 90, H);
mrwBlackSmoke(G, 200, -760, 80, H);
mrwBlackSmoke(G, 820, -660, 70, H);
}
MRW.live = mrwThLive;
mrwThLive(st);
[["wshop", null], ["ferry", "The ferryman", "m", "mrsailor", "Can't take no more, sir, not till I've been across and back."], ["sinn", "The landlord of the Ship", "m", "worker", "Are they coming this side? Tell me straight."]].forEach(function (F, i) {
if (!F[1])
return;
var R = MRW.rooms.filter(function (r) { return r.key === F[0]; })[0];
if (R && !st.thburnt)
mrwOne("thr" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 1.2, Math.PI, F[4], { y: R.y, persona: MRP.townfolk });
});
},
function (G) {
var X = MRW_ROOMXZ.north, R;
R = mrwRoom(G, "edgshop", X.edgshop[0], X.edgshop[1], 9, 7, { wall: "render", name: "a cycle-shop at Edgware", bare: 1 });
mrwBox(R.g, 4, 1.0, 0.7, mrwMat("oak"), 0, 0, -1.8);
for (var i = 0; i < 4; i++) {
var w = mrwCyl(R.g, 0.34, 0.34, 0.04, mrwMat("iron"), -3 + i * 1.2, 0.36, 1.6, 14);
w.rotation.z = Math.PI / 2;
var w2 = mrwCyl(R.g, 0.34, 0.34, 0.04, mrwMat("iron"), -3 + i * 1.2, 0.36, 2.6, 14);
w2.rotation.z = Math.PI / 2;
mrwBox(R.g, 0.05, 0.05, 1.0, mrwMat("iron"), -3 + i * 1.2, 0.7, 2.1);
}
mrwShelves(R.g, -4.3, 0, 2.6, 2.4, Math.PI / 2, {});
R = mrwRoom(G, "corner", X.corner[0], X.corner[1], 9, 8, { wall: "damask", name: "the corner house" });
mrwBox(R.g, 1.2, 0.9, 0.6, mrwMat("darkoak"), 3.4, 0, -3.4);
mrwCyl(R.g, 0.05, 0.05, 0.4, mrwMat("brass"), 3.4, 0.9, -3.6, 8);
mrwTable(R.g, 0, 0, 1.6, 0.9, 0.76, { cloth: 0xF4F0E8 });
mrwChair(R.g, -0.6, -0.8, 0, {});
mrwHearth(R.g, -4.3, 0, Math.PI / 2, { h: R.h });
mrwPicture(R.g, 0, 2.2, -3.88, 0, 1.2, 0.8);
R = mrwRoom(G, "tavern", X.tavern[0], X.tavern[1], 10, 8, { wall: "render", name: "the Green Man, emptied by the crowd", beams: true });
mrwBox(R.g, 5, 1.1, 0.8, mrwMat("darkoak"), 0, 0, -2.6);
mrwHearth(R.g, -4.8, 0, Math.PI / 2, { h: R.h });
for (i = 0; i < 3; i++)
mrwTable(R.g, -2 + i * 2.4, 1.6, 1.0, 0.8, 0.74, {});
R = mrwRoom(G, "hcot", X.hcot[0], X.hcot[1], 7, 6, { wall: "plaster", floor: "planks", name: "a cottage at Hadley", beams: true });
mrwHearth(R.g, 0, -2.8, 0, { h: R.h, pot: 1 });
mrwTable(R.g, 1.4, 0.4, 1.2, 0.8, 0.74, {});
mrwBed(R.g, -2.4, 0.6, Math.PI / 2, {});
},
function (G) {
var lite = mrwLite(), st = MRW.st, H = mrwNoH;
mrwFar(G, H);
mrwTerrain(G, -760, -760, 1520, 1520, lite ? 18 : 10, H, mrwMat("meadow"), function (x, z, y, c) { var g = 0.8 + mrwFbm(x * 0.03, z * 0.03, 2) * 0.24, dust = Math.abs(x) < 30 && st.stream; if (dust) {
c.setRGB(0.66 * g, 0.62 * g, 0.52 * g);
return;
} if (mrwFbm(x * 0.004, z * 0.004, 2) > 0.62) {
c.setRGB(0.78 * g, 0.74 * g, 0.42 * g);
return;
} c.setRGB(0.6 * g, 0.8 * g, 0.44 * g); });
Object.keys(MRW_NO_ROADS).forEach(function (k) { mrwStrip(G, MRW_NO_ROADS[k], k === "great" ? 16 : 6, H, mrwMat(k === "great" ? "gravel" : "gravel"), 0.06); });
var vil = [[-34, 40, Math.PI / 2], [-34, 124, Math.PI / 2], [-34, 170, Math.PI / 2], [-34, -40, Math.PI / 2], [34, 40, -Math.PI / 2], [34, 120, -Math.PI / 2], [34, -30, -Math.PI / 2], [34, -80, -Math.PI / 2], [-34, 230, Math.PI / 2], [34, 220, -Math.PI / 2]];
vil.forEach(function (v, i) { mrwVilla(G, v[0], v[1], { ry: v[2], w: 9 + (i % 3), d: 8, brick: [0xB86A4E, 0xA85A42, 0xC8806A, 0xE0D8C8][i % 4] }); });
mrwVilla(G, -34, 100, { ry: Math.PI / 2, w: 11, d: 9, brick: 0xB0644A });
var cd = mrwVillaDoor(-34, 100, { ry: Math.PI / 2, w: 11, d: 9 });
var rC = MRW.rooms.filter(function (r) { return r.key === "corner"; })[0];
if (rC)
mrwDoor(rC, "The door of the corner house", cd.x, cd.z, cd.ry);
mrwPaling(G, [[-24, 88], [-24, 112]], H, {});
var ty = H(-14, 62);
mrwBox(G, 3, 0.8, 1, mrwMat("granite"), -14, ty, 62);
mrwBox(G, 2.7, 0.05, 0.8, mrwWaterM ? mrwWaterM(0x4A5A60, 0.8) : mrwMat("glass"), -14, ty + 0.72, 62);
mrwShops(G, -680, 92, 6, { ry: Math.PI, names: ["CYCLES", "GROCER", "DRAPER", "CHEMIST", "SADDLER", "BAKER"] });
var sd = mrwShopDoor(-680, 92, 6, 0, { ry: Math.PI });
var rE = MRW.rooms.filter(function (r) { return r.key === "edgshop"; })[0];
if (rE)
mrwDoor(rE, "The cycle-shop door", sd.x, sd.z, sd.ry);
mrwShops(G, -680, 128, 5, { ry: 0, names: ["IRONMONGER", "POST OFFICE", "BUTCHER", "TOBACCONIST", "DAIRY"] });
mrwChurch(G, -620, 200, { len: 22, w: 10, h: 9, tower: 5, th: 20 });
mrwTownHouse(G, -560, 130, 12, 9, 8, { wall: "render", roof: "slate" });
mrwSign(G, "THE GREEN MAN", 4, 0.7, -560, H(-560, 130) + 5, 125.4, Math.PI, { bg: "#1E3A1E", ink: "#F0D890" });
var rT = MRW.rooms.filter(function (r) { return r.key === "tavern"; })[0];
if (rT)
mrwDoor(rT, "The door of the Green Man", -560, 124.6, Math.PI);
var lane = MRW_NO_ROADS.lane;
for (var i = 1; i < lane.length; i++) {
var a = lane[i - 1], b = lane[i], dx = b[0] - a[0], dz = b[1] - a[1], d = Math.hypot(dx, dz), nx = -dz / d * 6, nz = dx / d * 6;
if (a[0] > -620 && b[0] < -40) {
mrwPaling(G, [[a[0] + nx, a[1] + nz], [b[0] + nx, b[1] + nz]], H, { hedge: true });
mrwPaling(G, [[a[0] - nx, a[1] - nz], [b[0] - nx, b[1] - nz]], H, { hedge: true });
}
}
mrwChurch(G, 460, -170, { len: 22, w: 10, h: 9, tower: 6, th: 22, ry: Math.PI / 2 });
for (i = 0; i < 8; i++)
mrwTownHouse(G, 360 + i * 30, -250 - (i % 2) * 36, 9, 8, 6, { wall: i % 2 ? "brick" : "render", roof: i % 3 ? "tile" : "slate", ry: i % 2 ? 0 : Math.PI });
var rH = MRW.rooms.filter(function (r) { return r.key === "hcot"; })[0];
if (rH)
mrwDoor(rH, "A cottage door at Hadley", 360, -245.4, 0);
for (i = 0; i < 10; i++)
mrwTownHouse(G, (i % 2 ? 40 : -40), -340 - Math.floor(i / 2) * 30, 10, 9, 8, { wall: i % 3 ? "brick" : "render", roof: "slate", ry: i % 2 ? -Math.PI / 2 : Math.PI / 2 });
mrwChurch(G, -80, -520, { len: 24, w: 11, h: 10, tower: 6, th: 26, ry: Math.PI / 2 });
var free = function (x, z) { return Object.keys(MRW_NO_ROADS).every(function (k) { return mrwPathD(x, z, MRW_NO_ROADS[k]) > 10; }) && !(Math.abs(x) < 60 && z > -120 && z < 260) && !(x < -520 && Math.abs(z - 110) < 60) && !(x > 320 && x < 640 && z > -300 && z < -140) && !(Math.abs(x) < 70 && z < -300); };
mrwPlant(G, "tree", mrwScatter(61, lite ? 120 : 300, -760, -760, 760, 760, free, H, 0.8, 1.4), { col: 0x4A7A34 });
mrwPlant(G, "grass", mrwScatter(62, lite ? 260 : 700, -760, -760, 760, 760, function (x, z) { return free(x, z) && mrwFbm(x * 0.004, z * 0.004, 2) > 0.62; }, H, 1.0, 1.5), { col: 0xC8C878 });
mrwPlant(G, "grass", mrwScatter(63, lite ? 160 : 420, -760, -760, 760, 760, free, H, 0.8, 1.3), { col: 0xA8C890 });
mrwPoles(G, MRW_NO_ROADS.great, H, 44);
if (st.stream) {
var road = MRW_NO_ROADS.great.slice();
mrwStream(G, road, H, { n: st.stream === "thin" ? 16 : 70, carts: st.stream === "thin" ? 3 : 16, sp: 1.6, w: 12, seed: 71 });
if (!lite)
mrwSmoke(G, 0, H(0, 300) + 4, 300, 0xB8B0A0, 10);
}
if (st.chaise) {
var cp = MRW_AT[st.chaise] || MRW_AT.camp;
var ch = mrwCart(G, cp.x + 4, cp.z + 3, 1.3, { seat: true, len: 2, w: 1.4, hcol: 0x8A6A4A, seatCol: 0x2A2A3A });
MRW.noChaise = ch;
}
},
function (G) {
var st = MRW.st;
mrwCrowd("edg", [["A shopman at his door", "m", "gent", "They're all coming through. Nothing left to sell."], ["A woman at the pump", "f", "maid", "Is it true about the Black Smoke?"], ["A carter", "m", "worker", "Going to St. Albans if the horse holds."], ["A cyclist", "m", "gent", "Rode up from Kilburn. The roads are choked."]], -720, 90, -600, 140, { wander: 5 });
if (st.flee) {
mrwCrowd("lnf", [["A family on foot", "m", "worker", "Is this the way to Barnet?"], ["A woman with a bundle", "f", "maid", "They said we'd be safe at Edgware. Now they say go on."], ["A man pushing a barrow", "m", "worker", "Everything I own."], ["A girl with a cat in a basket", "f", "girl", "She's called Toby. She's frightened.", null, true]], -420, 60, -120, 100, { wander: 5 });
}
if (st.stream === "full") {
mrwCrowd("meetc", [["A man on horseback", "m", "mrhussar", "They are coming. They're at Kilburn now, I tell you."], ["A coachman", "m", "cabby", "Out of the way, there!"], ["A woman with a little girl", "f", "maid", "I can't go on! I can't go on!"], ["An old man with a military moustache", "m", "gent", "I can't go further. Leave me."], ["A lost little girl", "f", "girl", "Ellen? Mother?", null, true], ["A man in a frock coat", "m", "gent", "Is there any water? Anyone?"]], -40, 70, -20, 110, { wander: 2 });
}
mrwCrowd("had", [["A Hadley woman at her gate", "f", "maid", "We've had people through since dawn. Have some water."], ["A farmer", "m", "worker", "Don't go through my wheat, that's all I ask."], ["The vicar of Hadley", "m", "clergy", "God keep you on your way."]], 380, -260, 540, -190, { wander: 4 });
},
function (G) {
mrwNoRooms(G);
mrwNorth(G);
mrwNoFolk(G);
var st = MRW.st;
[["edgshop", "The cycle-dealer", "m", "worker", "Last one I've got, sir, and the price is the price. Everyone wants a machine today."], ["tavern", "The landlord of the Green Man", "m", "worker", "Drunk dry since six this morning. Water in the yard, that's all."], ["hcot", "The cottager at Hadley", "f", "maid", "Come in and rest, you poor things. Has the smoke come as far as Finchley?"]].forEach(function (F, i) {
var R = MRW.rooms.filter(function (r) { return r.key === F[0]; })[0];
if (R)
mrwOne("nor" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 1.2, Math.PI, F[4], { y: R.y, persona: MRP.townfolk });
});
},
function () {
var S = mrwSc(), k = S.env;
if (MRW.envK && MRW_ENV[MRW.envK])
k = MRW.envK;
if (MRW.night)
k = MRW.envK === "moon" || MRW.envK === "storm" ? MRW.envK : "night";
if (mrwInRoom()) {
var L = mrwLocalSc(), R = mrwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
var E = {}, B = MRW_ENV[k] || MRW_ENV.lake;
for (var q in B)
E[q] = B[q];
if (mrwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (MRW.moving || MRW.ride)
return true;
var S = mrwSc(), D = MRW_SCN[MRW.sc];
if (!D)
return false;
if (mrwInRoom()) {
if (mrwSolidAt(x, z, feet))
return true;
return mrwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (mrwSolidAt(x, z, feet))
return true;
var fl = mrwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = mrwLand(x, z);
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
MRW.t += dt;
if (!MRW.built || !MRW.scG)
return;
var S = mrwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
MRW.inRm = mrwInRoom();
MRW.et = (MRW.et || 0) + dt;
if (MRW.et > 0.8) {
MRW.et = 0;
worldEnv(mrwEnvNow());
}
var flow = MRW.t * 0.03;
MRW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
MRW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (MRW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(MRW.t * 3 + i * 2)) * 0.3; f.rotation.y = MRW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(MRW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(MRW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, MRW.inRm ? -500 : mrwLand(L.x, L.z), L.z);
}
});
(MRW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
try {
mrwTripodTick(dt);
mrwHandlerTick(dt);
}
catch (e) { }
(MRW.smoke || []).forEach(function (g) { g.children.forEach(function (m, i) { m.position.x += Math.sin(MRW.t * 0.1 + i) * dt * 0.4; m.rotation.y += dt * 0.02; }); });
MRW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return mrwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof mrbTick === "function")
try {
mrbTick(dt, L);
}
catch (e) {
if (!MRW.e1) {
MRW.e1 = 1;
if (window.console)
console.warn("[war-worlds] book", e);
}
}
if (!MRW.bannerBook)
worldBanner("<b>⚡ " + MRW_NAME + "</b> · " + esc(mrwPlaceName(L)) + (MRW.night ? " · night" : ""));
MRW.pt = (MRW.pt || 0) + dt;
if (MRW.pt < 0.15)
return;
MRW.pt = 0;
if (MRW.moving || MRW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
MRW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof mrbTalk === "function" && mrbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
MRW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : mrwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof mrbSpot === "function")
mrbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof mrbIdlePrompt === "function")
mrbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = mrwAtPt(opt.at) || (typeof mrbStartAt === "function" && mrbStartAt()) || mrwAtPt("obs");
try {
mrwCrxKinds();
if (typeof crxWarm === "function" && !mrwLite())
crxWarm(["horse", "mrdark", "martian"]);
}
catch (e) { }
mrwScene(A.sc);
var S = MRW_SC[A.sc], y = A.y != null ? A.y : mrwGround(A.x, A.z);
camera.position.set(MRW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
MRW.moving = false;
MRW.ride = null;
MRW.inRm = mrwInRoom();
worldEnv(mrwEnvNow());
setStatus("🛸 <b>" + MRW_NAME + ".</b> H. G. Wells's book, the whole of it: Ogilvy's observatory, Horsell Common and the sand pit, Woking, the Thames at Shepperton, the north road, the sea, Sheen, Putney and Primrose Hill. <b>Press E</b> for the book.");
if (typeof mrbEnter === "function")
try {
mrbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[war-worlds] enter", e);
}
},
function () {
mrwSceneDrop();
for (var k in MRW.mats) {
var m = MRW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in MRW.tex) {
var x = MRW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in MRW_GEO) {
try {
MRW_GEO[g].dispose();
}
catch (e) { }
}
MRW.mats = {};
MRW.tex = {};
MRW_GEO = {};
MRW.built = false;
MRW.G = null;
MRW.lights = 0;
},
function (P, n, sp) {
var lite = mrwLite();
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
MRW.fx.push(p);
return p;
},
function (x, z) {
var n = mrwFbm(x * 0.006, z * 0.006, 3), land = 3 + n * 5;
if (z > 60)
return land + Math.max(0, 1 - Math.hypot(x, z - 420) / 300) * 6;
if (z > 20)
return mrwSmooth(20, 60, z) * land + (1 - mrwSmooth(20, 60, z)) * 1.2;
if (z > -10)
return 1.2 - (20 - z) / 30 * 2.0;
return -0.8 - Math.min(1, (-10 - z) / 120) * 10;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var hull = mrwS("b:planks", 0x1E1E22, 2), wh = mrwLam(0xEDE8DC), red = mrwLam(0x8A2A1E);
var H = new THREE.Mesh(mrwGeo("stmH", function () { var s = new THREE.Shape(); s.moveTo(0, -20); s.quadraticCurveTo(4.2, -14, 4.2, -4); s.lineTo(4.2, 14); s.quadraticCurveTo(4.2, 20, 0, 20.6); s.quadraticCurveTo(-4.2, 20, -4.2, 14); s.lineTo(-4.2, -4); s.quadraticCurveTo(-4.2, -14, 0, -20); var e = new THREE.ExtrudeGeometry(s, { depth: 3.2, bevelEnabled: false }); e.rotateX(Math.PI / 2); e.translate(0, 3.0, 0); return e; }), hull);
g.add(H);
mrwBox(g, 8.2, 0.12, 40, mrwMat("deck"), 0, 2.9, 0.3);
mrwBox(g, 8.4, 0.6, 40.6, wh, 0, 2.4, 0.3);
[-1, 1].forEach(function (s) { var pb = new THREE.Mesh(mrwGeo("stmP", function () { var c = new THREE.CylinderGeometry(3.4, 3.4, 1.6, 20, 1, false, 0, Math.PI); c.rotateZ(Math.PI / 2); c.rotateY(Math.PI / 2); return c; }), wh); pb.position.set(s * 5, 1.6, 0); pb.rotation.y = Math.PI / 2; pb.scale.set(1, 1, 1); g.add(pb); var wheel = mrwCyl(g, 2.8, 2.8, 1.2, mrwLam(0x3A2A1A), s * 5, 0.2, 0, 16); wheel.rotation.z = Math.PI / 2; wheel.userData.paddle = 1; });
mrwBox(g, 10, 0.2, 2, mrwMat("planks"), 0, 5.4, 0);
mrwBox(g, 10, 1, 0.06, wh, 0, 5.6, 1);
var f = mrwCyl(g, 0.9, 0.9, 8, mrwLam(0x1A1A1A), 0, 3, -3, 14);
mrwCyl(g, 0.92, 0.92, 1.2, red, 0, 9.2, -3, 14);
mrwCyl(g, 0.12, 0.14, 12, mrwMat("oak"), 0, 3, -14, 8);
for (var i = 0; i < 8; i++)
mrwBench(g, (i % 2 ? 2.4 : -2.4), 6 - Math.floor(i / 2) * 4, i % 2 ? -Math.PI / 2 : Math.PI / 2, { w: 2.6, d: 0.5 });
mrwBox(g, 8.4, 1.0, 0.12, wh, 0, 2.9, -19.6);
mrwBox(g, 0.12, 1.0, 40, wh, 4.2, 2.9, 0.3);
mrwBox(g, 0.12, 1.0, 40, wh, -4.2, 2.9, 0.3);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var grey = mrwShine(0x3A3E44, 0.6, 0.4), blk = mrwLam(0x141416);
var H = new THREE.Mesh(mrwGeo("icH", function () { var s = new THREE.Shape(); s.moveTo(0, -48); s.lineTo(7, -30); s.lineTo(8, 30); s.quadraticCurveTo(7, 44, 0, 46); s.quadraticCurveTo(-7, 44, -8, 30); s.lineTo(-7, -30); s.lineTo(0, -48); var e = new THREE.ExtrudeGeometry(s, { depth: 4, bevelEnabled: false }); e.rotateX(Math.PI / 2); e.translate(0, 1.6, 0); return e; }), grey);
g.add(H);
mrwCyl(g, 4.2, 4.4, 3, grey, 0, 1.6, -18, 18);
var gun = mrwCyl(g, 0.5, 0.6, 10, blk, 0, 3.6, -26, 10);
gun.rotation.x = Math.PI / 2;
mrwCyl(g, 4.2, 4.4, 3, grey, 0, 1.6, 18, 18);
var gun2 = mrwCyl(g, 0.5, 0.6, 10, blk, 0, 3.6, 26, 10);
gun2.rotation.x = Math.PI / 2;
mrwBox(g, 8, 4, 10, grey, 0, 1.6, 0);
mrwCyl(g, 1.4, 1.4, 8, blk, 0, 5.6, -2.4, 14);
mrwCyl(g, 1.4, 1.4, 8, blk, 0, 5.6, 2.4, 14);
mrwCyl(g, 0.3, 0.3, 22, blk, 0, 5.6, -8, 8);
mrwCyl(g, 0.3, 0.3, 16, blk, 0, 5.6, 10, 8);
if (o.name)
mrwSign(g, o.name, 6, 0.8, 0, 2.2, 46.4, 0, { bg: "#2A2E34", ink: "#E8E0C8" });
return g;
},
function (P) {
var lite = mrwLite(), R = wRand(81), n = lite ? 14 : 34;
for (var i = 0; i < n; i++) {
var a = -1.2 + R() * 2.4, d = 520 + R() * 360, x = Math.sin(a) * d, z = -Math.cos(a) * d * 0.8 - 60;
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = R() * 6.283;
P.add(g);
g.userData.keep = 1;
var big = R() < 0.25, L = big ? 40 + R() * 30 : 12 + R() * 14, W = L * 0.18;
mrwBox(g, W, big ? 5 : 2.2, L, mrwLam([0x1A1A1E, 0x3A2A1E, 0x2A3A4A, 0xE0D8C8][i % 4]), 0, -0.6, 0);
if (big) {
mrwBox(g, W * 0.8, 3, L * 0.5, mrwLam(0xEDE8DC), 0, 4.4, 0);
mrwCyl(g, 1.2, 1.2, 7, mrwLam([0xC86A2A, 0x1A1A1A, 0xD8C8A8][i % 3]), 0, 7.4, 0, 12);
}
else {
mrwCyl(g, 0.14, 0.18, L * 0.9, mrwMat("oak"), 0, 1.6, -L * 0.1, 6);
var sail = mrwBox(g, 0.06, L * 0.6, L * 0.4, mrwLam([0x8A3A22, 0xE8E0C8, 0x6A4A32][i % 3]), 0, 2.4, L * 0.1);
}
}
},
function (G) {
var X = MRW_ROOMXZ.sea, R;
R = mrwRoom(G, "tinn", X.tinn[0], X.tinn[1], 10, 8, { wall: "render", name: "the inn at Tillingham", beams: true });
mrwBox(R.g, 5, 1.1, 0.8, mrwMat("darkoak"), 0, 0, -2.6);
mrwHearth(R.g, -4.8, 0, Math.PI / 2, { h: R.h });
for (var i = 0; i < 3; i++) {
mrwTable(R.g, -2 + i * 2.4, 1.6, 1.0, 0.8, 0.74, {});
mrwChair(R.g, -2 + i * 2.4, 2.3, Math.PI, {});
}
R = mrwRoom(G, "tch", X.tch[0], X.tch[1], 10, 16, { wall: "stone", floor: "stone", h: 7, name: "Tillingham church", bare: 1, lightI: 0.6 });
for (i = 0; i < 5; i++) {
mrwBench(R.g, -2, -4 + i * 2, 0, { w: 3, d: 0.5 });
mrwBench(R.g, 2, -4 + i * 2, 0, { w: 3, d: 0.5 });
}
mrwBox(R.g, 2, 1, 1, mrwMat("stone"), 0, 0, -6.6);
mrwWindowIn(R.g, 0, 3.2, -7.88, 0, 1.6, 3, { sky: 0xD8E4F0 });
R = mrwRoom(G, "cabin", X.cabin[0], X.cabin[1], 8, 5, { wall: "planks", floor: "deck", name: "the saloon of the steamer", bare: 1 });
for (i = 0; i < 3; i++)
mrwBench(R.g, -2.4 + i * 2.4, -1.6, 0, { w: 2, d: 0.5 });
mrwTable(R.g, 0, 0.4, 2.4, 0.8, 0.74, {});
mrwWindowIn(R.g, -3.88, 1.6, 0, Math.PI / 2, 1, 0.7, { sky: 0xA8C0D8 });
mrwWindowIn(R.g, 3.88, 1.6, 0, -Math.PI / 2, 1, 0.7, { sky: 0xA8C0D8 });
},
function (G) {
var lite = mrwLite(), st = MRW.st, H = mrwSeH;
mrwFar(G, function (x, z) { return z < -10 ? -12 : H(x, z); });
mrwTerrain(G, -760, -760, 1520, 1520, lite ? 18 : 10, H, mrwMat("meadow"), function (x, z, y, c) {
var g = 0.8 + mrwFbm(x * 0.03, z * 0.03, 2) * 0.24;
if (z < 20) {
c.setRGB(0.66 * g, 0.62 * g, 0.54 * g);
return;
}
if (z < 60) {
c.setRGB(0.5 * g, 0.6 * g, 0.44 * g);
return;
}
c.setRGB(0.58 * g, 0.76 * g, 0.42 * g);
});
var wt = mrwWater(G, 0, 0, 5200, 5200, 0, 0x4A5E64, 0.92);
wt.userData.fx = 0.2;
wt.userData.fz = 0.5;
Object.keys(MRW_SE_ROADS).forEach(function (k) { mrwStrip(G, MRW_SE_ROADS[k], 6, H, mrwMat("gravel"), 0.06); });
mrwChurch(G, -60, 360, { len: 24, w: 11, h: 10, tower: 6, th: 26 });
var rC = MRW.rooms.filter(function (r) { return r.key === "tch"; })[0];
if (rC)
mrwDoor(rC, "The church door", -60, 372.6, Math.PI);
for (var i = 0; i < 12; i++) {
var vx = -130 + (i % 6) * 50, vz = i < 6 ? 404 : 440;
mrwTownHouse(G, vx, vz, 9, 8, 6, { wall: i % 3 ? "render" : "brick", roof: i % 2 ? "tile" : "thatch", ry: i < 6 ? Math.PI : 0 });
}
mrwTownHouse(G, 40, 404, 12, 9, 7, { wall: "render", roof: "tile", ry: Math.PI });
mrwSign(G, "THE CHEQUERS", 3.4, 0.6, 40, H(40, 404) + 4.6, 408.6, Math.PI, { bg: "#2A1E14", ink: "#F0D890" });
var rI = MRW.rooms.filter(function (r) { return r.key === "tinn"; })[0];
if (rI)
mrwDoor(rI, "The door of the Chequers", 40, 408.8, Math.PI);
mrwPlant(G, "grass", mrwScatter(91, lite ? 220 : 600, -760, 20, 760, 70, null, H, 0.8, 1.4), { col: 0xB8B888 });
mrwStrip(G, [[-760, 24], [760, 24]], 5, function (x, z) { return H(x, z) + 1.0; }, mrwMat("earth"), 0);
[[30, -6, 0.2], [12, 4, 1.4], [60, 6, 2.8], [-40, 8, 0.6], [90, 2, 1.9], [-80, 6, 0.1], [130, 8, 2.4]].forEach(function (b) { var bb = mrwBoat(G, b[0], b[1] < 0 ? 0.05 : H(b[0], b[1]), b[1], b[2], {}); bb.userData.keep = 1; });
var free = function (x, z) { return z > 80 && Object.keys(MRW_SE_ROADS).every(function (k) { return mrwPathD(x, z, MRW_SE_ROADS[k]) > 8; }) && !(Math.abs(x) < 180 && Math.abs(z - 420) < 70); };
mrwPlant(G, "tree", mrwScatter(92, lite ? 80 : 200, -760, 80, 760, 760, free, H, 0.8, 1.3), { col: 0x4A7A34 });
mrwPlant(G, "grass", mrwScatter(93, lite ? 160 : 400, -760, 80, 760, 760, free, H, 0.9, 1.4), { col: 0xC8C878 });
mrwShipping(G);
MRW.seSteam = mrwSteamer(G, MRW_SE.steam[0], MRW_SE.steam[1], 0);
mrwFloor(MRW_SE.steam[0], MRW_SE.steam[1] + 0.3, 8, 40, 3.0, { deck: 1 });
var sx = MRW_SE.steam[0], sz = MRW_SE.steam[1];
mrwSolid(sx, sz - 20.4, 8.4, 0.3, 2.4, 4.4);
mrwSolid(sx + 4.2, sz, 0.3, 40.6, 2.4, 4.4);
mrwSolid(sx - 4.2, sz, 0.3, 40.6, 2.4, 4.4);
mrwSolid(sx, sz + 20.8, 8.4, 0.3, 2.4, 4.4);
var rS = MRW.rooms.filter(function (r) { return r.key === "cabin"; })[0];
if (rS)
mrwDoor(rS, "The saloon door", sx, sz + 4, Math.PI);
var tcAt = st.tcAt || MRW_SE.tc;
MRW.seTC = mrwIronclad(G, tcAt[0], tcAt[1], st.tcRy != null ? st.tcRy : -0.3, { name: "THUNDER CHILD" });
if (st.tcSunk) {
MRW.seTC.position.y = -3.6;
MRW.seTC.rotation.z = 0.5;
for (i = 0; i < (lite ? 2 : 5); i++)
mrwSmoke(G, tcAt[0] + i * 6, 1, tcAt[1] + i * 4, 0xE8ECF0, 8);
}
[[-620, -520, 0.4], [-760, -440, 0.2], [620, -680, -0.3]].forEach(function (q) { mrwIronclad(G, q[0], q[1], q[2]); });
},
function (G) {
var st = MRW.st;
mrwCrowd("til", [["A Tillingham man", "m", "worker", "Watching from the tower since dawn, we are. Nothing yet."], ["A fisherman's wife", "f", "maid", "The boats are all going out to the ships. You'll pay, mind."], ["A boy on the wall", "m", "boy", "Look at all the ships! Hundreds!", null, true], ["A farmer", "m", "worker", "Food's dear as gold here. Folk from London'll pay anything."]], -120, 380, 120, 450, { wander: 5 });
if (st.seCrowd) {
mrwCrowd("sec", [["A boatman", "m", "mrsailor", "Out to the steamers, two pound a head. Take it or leave it."], ["A woman with a child", "f", "maid", "Is it safe on the water? They can't come on the water, can they?"], ["A gentleman with a portmanteau", "m", "gent", "I've paid fifty pounds to the captain of that steamer. Fifty!"], ["A fisher-lad", "m", "boy", "I'll row you, sir, for a sovereign.", null, true], ["A sailor off a collier", "m", "mrsailor", "Shipping's come round from the Thames. No way up the river now."]], -60, 8, 100, 40, { wander: 4, ok: function (x, z) { return z > -1; } });
}
if (st.onDeck) {
var sx = MRW_SE.steam[0], sz = MRW_SE.steam[1];
mrwCrowd("dek", [["A passenger in a frock coat", "m", "gent", "It's Shoeburyness, the firing. Bound to be."], ["A lady passenger", "f", "lady", "Ostend. I've never been to Ostend."], ["A stoker on deck", "m", "worker", "Captain'll not go till she's full. He's greedy, he is."], ["A young clerk", "m", "gent", "Spent my last money on this passage."], ["An old lady with a parrot", "f", "lady", "Polly doesn't like the sea."], ["A boy", "m", "boy", "There's an ironclad! Look, low in the water!", null, true]], sx - 3, sz - 12, sx + 3, sz + 12, { wander: 2, y: 3.0 });
}
},
function (G) {
mrwSeaRooms(G);
mrwSea(G);
mrwSeaFolk(G);
var st = MRW.st, H = function (x, z) { return Math.max(-7, mrwSeH(x, z)); };
if (st.seTri === "wade") {
mrwTripod(G, 560, -20, { hfn: H, ry: -1.9, path: [[560, -20], [380, -140], [200, -300], [60, -460]], sp: 4 });
mrwTripod(G, 720, 40, { hfn: H, ry: -2.1, path: [[720, 40], [560, -160], [400, -380]], sp: 3 });
mrwTripod(G, 380, 60, { hfn: H, ry: -2.4, path: [[380, 60], [240, -120], [120, -280]], sp: 3 });
}
if (st.seTri === "fight") {
mrwTripod(G, -120, -300, { hfn: H, ry: Math.PI * 0.6, sp: 0 });
mrwTripod(G, 40, -420, { hfn: H, ry: Math.PI * 0.5, path: [[40, -420], [300, -240], [560, -40]], sp: 3 });
mrwTripod(G, 300, -200, { hfn: H, ry: Math.PI * 0.8, path: [[300, -200], [600, -20]], sp: 3 });
}
if (st.seTri === "after") {
mrwTripod(G, -190, -330, { hfn: function () { return -6; }, ry: 0.8, dead: true });
mrwTripod(G, -230, -380, { hfn: function () { return -6; }, ry: 2.2, dead: true });
for (var i = 0; i < (mrwLite() ? 3 : 7); i++)
mrwSmoke(G, -220 + i * 14, 1, -360 + i * 6, 0xE8ECF0, 9);
mrwBlackSmoke(G, -140, -260, 60, function () { return 0.5; });
}
var stm = MRW.seSteam;
MRW.ticks.push(function (dt) { if (!stm || !stm.parent)
return; stm.children.forEach(function (c) { if (c.userData.paddle)
c.rotation.x += dt * (st.steaming ? 2.4 : 0); }); if (st.steaming) {
stm.position.y = Math.sin(MRW.t * 0.9) * 0.12;
stm.rotation.z = Math.sin(MRW.t * 0.7) * 0.02;
} });
var tc = MRW.seTC;
if (st.tcCharge && !st.tcSunk)
MRW.ticks.push(function (dt) { if (!tc.parent)
return; var tx = 60, tz = -300, dx = tx - tc.position.x, dz = tz - tc.position.z, d = Math.hypot(dx, dz); if (d > 30) {
tc.position.x += dx / d * dt * 12;
tc.position.z += dz / d * dt * 12;
tc.rotation.y = Math.atan2(dx, dz) + Math.PI;
} });
MRW.live = mrwSeaLive;
mrwSeaLive(st);
var R = MRW.rooms.filter(function (r) { return r.key === "tinn"; })[0];
if (R)
mrwOne("sein", "The landlady of the Chequers", "f", "maid", R.cx + 0.6, R.cz - 1.2, Math.PI, "Bread's a shilling a loaf today, and I'm sorry for it. The Londoners have eaten us bare.", { y: R.y, persona: MRP.townfolk });
},
function (x, z) {
var n = mrwFbm(x * 0.006, z * 0.006, 4), h = 3 + n * 6;
h += Math.max(0, 1 - Math.hypot(x - 620, z + 300) / 420) * 26;
var d = Math.abs(z - MRW_SH.river - 14 * Math.sin(x / 200));
if (d < 60) {
var t = Math.max(0, (d - 44) / 16);
h = d < 44 ? -2.6 + 1.6 * Math.pow(d / 44, 3) : Math.min(h, -1 + (h + 1) * mrwSmooth(0, 1, t));
}
var p = MRW.st && MRW.st.shpit ? mrwPit(MRW_SH.pit[0], MRW_SH.pit[1], 44, 14)(x, z) : 0;
if (p && !(Math.abs(x) < 5 && z > -12 && z < 4))
h += p;
if (Math.abs(x) < 6 && z > -11 && z < 4)
h = 3 + mrwFbm(0, 0, 4) * 6;
return h;
},
function (G) {
var x = MRW_SH.sc[0], z = MRW_SH.sc[1], y = mrwShH(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
g.userData.keep = 0;
var wall = mrwMat("plaster"), brick = mrwS("brick", 0x8A5A44, 1.4), w = 10, d = 12, h = 2.8;
mrwBox(g, w, 0.12, d, mrwMat("cobble"), 0, -0.12, 0);
mrwBox(g, w + 0.4, 0.4, d + 0.4, mrwMat("planks"), 0, h, 0);
mrwBox(g, w / 2 - 0.7, h, 0.4, brick, -w / 4 - 0.35, 0, -d / 2);
mrwBox(g, w / 2 - 0.7, h, 0.4, brick, w / 4 + 0.35, 0, -d / 2);
mrwBox(g, 1.4, 1.3, 0.4, brick, 0, 0, -d / 2);
mrwBox(g, 1.4, 1.1, 0.4, brick, 0, 1.7, -d / 2);
mrwBox(g, 0.4, h, d, brick, -w / 2, 0, 0);
mrwBox(g, 0.4, h, d, brick, w / 2, 0, 0);
mrwBox(g, w / 2 - 0.8, h, 0.4, wall, -w / 4 - 0.4, 0, d / 2);
mrwBox(g, w / 2 - 0.8, h, 0.4, wall, w / 4 + 0.4, 0, d / 2);
mrwBox(g, 1.6, 0.6, 0.4, wall, 0, 2.2, d / 2);
mrwBox(g, 0.9, 1.0, 0.6, mrwMat("granite"), 3.4, 0, -4.6);
mrwCyl(g, 0.5, 0.5, 1.0, mrwMat("copper"), -3.6, 0, -4.4, 14);
mrwShelves(g, 4.6, 0.6, 2.6, 2.0, -Math.PI / 2, { jars: 1 });
mrwBox(g, 3, h, 0.2, brick, -3.5, 0, 0.6);
mrwBox(g, 0.2, h, 3, brick, -2.0, 0, 2.1);
mrwBox(g, 0.9, 2.0, 0.06, mrwMat("darkoak"), -2.0, 0, 1.8).rotation.y = Math.PI / 2;
for (var i = 0; i < 8; i++)
mrwBox(g, 0.4, 0.3, 0.4, mrwLam(0x141210), -3.4 + (i % 3) * 0.4, 0, 2.2 + Math.floor(i / 3) * 0.4);
mrwPlant(G, "rock", mrwScatter(101, mrwLite() ? 14 : 30, x - 8, z - 8, x + 8, z + 8, null, function () { return y + h + 0.2; }, 0.6, 1.4), { mat: mrwMat("earth"), keepAll: true });
for (i = 0; i < 6; i++) {
var b = mrwBox(G, 0.3, 0.3, 5, mrwMat("darkoak"), x - 4 + i * 1.6, y + h + 0.8, z - 2 + i % 2);
b.rotation.set(0.3 * (i % 3), i * 0.8, 0.2);
}
mrwSolid(x, z - d / 2, w, 0.5, y - 1, y + h + 0.5);
mrwSolid(x - w / 2, z, 0.5, d, y - 1, y + h + 0.5);
mrwSolid(x + w / 2, z, 0.5, d, y - 1, y + h + 0.5);
mrwSolid(x - w / 4 - 0.4, z + d / 2, w / 2 - 0.8, 0.5, y - 1, y + h + 0.5);
mrwSolid(x + w / 4 + 0.4, z + d / 2, w / 2 - 0.8, 0.5, y - 1, y + h + 0.5);
mrwSolid(x - 3.5, z + 0.6, 3, 0.3, y - 1, y + h);
mrwSolid(x - 2.0, z + 2.1, 0.3, 3, y - 1, y + h);
mrwFloor(x, z, w, d, y);
if (typeof THREE.PointLight === "function" && !mrwLite()) {
var L = new THREE.PointLight(0xC8D8A0, 0.5, 14);
L.position.set(0, 1.8, -4);
g.add(L);
}
return g;
},
function (G) {
var X = MRW_ROOMXZ.sheen, R;
R = mrwRoom(G, "villa", X.villa[0], X.villa[1], 9, 7, { wall: "greenpaper", name: "a small semi-detached villa at Sheen", lightI: 0.5 });
mrwTable(R.g, 0, 0, 1.6, 0.9, 0.76, {});
mrwChair(R.g, -0.6, 0.8, Math.PI, {});
mrwShelves(R.g, -4.3, 0, 2.6, 2.2, Math.PI / 2, { jars: 1 });
mrwHearth(R.g, 4.3, 0, -Math.PI / 2, { h: R.h });
mrwBox(R.g, 0.8, 0.3, 0.5, mrwLam(0xB8865A), 0.3, 0.76, -0.1);
R = mrwRoom(G, "kitchen", X.kitchen[0], X.kitchen[1], 8, 7, { wall: "plaster", floor: "cobble", name: "the kitchen of the white house", bare: 1, lightI: 0.4 });
mrwHearth(R.g, 0, -3.3, 0, { h: R.h, pot: 1 });
mrwTable(R.g, 0, 0, 1.8, 0.9, 0.76, {});
mrwShelves(R.g, -3.8, 0, 2.6, 2.2, Math.PI / 2, { jars: 1 });
mrwBox(R.g, 1.6, 1.8, 0.5, mrwMat("oak"), 3.4, 0, -2.8);
R = mrwRoom(G, "arty", X.arty[0], X.arty[1], 10, 8, { wall: "damask", name: "the house on Putney Hill", lightI: 0.6 });
mrwTable(R.g, 0, 0, 1.8, 1, 0.76, { cloth: 0xF4F0E8 });
mrwChair(R.g, -0.7, -0.8, 0, {});
mrwChair(R.g, 0.7, 0.8, Math.PI, {});
mrwShelves(R.g, -4.8, 0, 3, 2.4, Math.PI / 2, {});
mrwHearth(R.g, 4.8, 0, -Math.PI / 2, { h: R.h });
for (var i = 0; i < 3; i++)
mrwCyl(R.g, 0.05, 0.06, 0.32, mrwLam(0x1A3A1A), -0.4 + i * 0.3, 0.76, 0.2, 8);
R = mrwRoom(G, "arcell", X.arcell[0], X.arcell[1], 8, 7, { wall: "stone", floor: "earth", name: "the cellar, and the mouth of his drain", bare: 1, lightI: 0.5 });
mrwBox(R.g, 1.4, 1.2, 0.6, mrwLam(0x0A0806), 0, 0, -3.2);
for (i = 0; i < 6; i++)
mrwBox(R.g, 0.5, 0.4, 0.5, mrwMat("earth"), -3 + i * 0.5, 0, -1.8 + (i % 2) * 0.4);
mrwBox(R.g, 0.1, 1.4, 0.1, mrwMat("oak"), 2, 0, 0);
mrwBox(R.g, 0.3, 0.05, 1.2, mrwMat("iron"), 2.2, 0.4, 0.2);
R = mrwRoom(G, "pub", X.pub[0], X.pub[1], 10, 8, { wall: "render", name: "a public-house on Putney Hill, empty", beams: true, lightI: 0.5 });
mrwBox(R.g, 5, 1.1, 0.8, mrwMat("darkoak"), 0, 0, -2.6);
mrwHearth(R.g, -4.8, 0, Math.PI / 2, { h: R.h });
for (i = 0; i < 3; i++)
mrwTable(R.g, -2 + i * 2.4, 1.6, 1.0, 0.8, 0.74, {});
},
function (G) {
var lite = mrwLite(), st = MRW.st, H = mrwShH, weed = st.weed || 0, P = MRW_SH.pit;
mrwFar(G, function (x, z) { return Math.max(-1, H(Math.max(-800, Math.min(800, x)), z)); });
mrwTerrain(G, -860, -860, 1720, 1720, lite ? 18 : 10, H, mrwMat("meadow"), function (x, z, y, c) {
var g = 0.8 + mrwFbm(x * 0.03, z * 0.03, 2) * 0.24, dp = Math.hypot(x - P[0], z - P[1]);
if (st.shpit && dp < 46) {
c.setRGB(0.7 * g, 0.6 * g, 0.44 * g);
return;
}
if (y < 0.4) {
c.setRGB(0.5, 0.44, 0.36);
return;
}
var r = weed >= 2 ? mrwFbm(x * 0.01, z * 0.01, 2) : 0;
if (weed >= 2 && r > 0.45) {
c.setRGB(0.6 * g, 0.18 * g, 0.12 * g);
return;
}
if (st.grey) {
c.setRGB(0.36 * g, 0.34 * g, 0.3 * g);
return;
}
c.setRGB(0.6 * g, 0.78 * g, 0.44 * g);
});
var wt = mrwWater(G, 0, MRW_SH.river, 5200, 140, 0, weed >= 3 ? 0x6A2A1E : 0x4A5A50, 0.9);
wt.userData.fx = 0.3;
Object.keys(MRW_SH_ROADS).forEach(function (k) { mrwStrip(G, MRW_SH_ROADS[k], k === "kew" ? 9 : 6, H, mrwMat("gravel"), 0.06); });
var vil = [[-600, -6, 0], [-560, -6, 0], [-500, 40, Math.PI], [-440, -6, 0], [-400, 40, Math.PI], [-340, -8, 0], [-260, 40, Math.PI], [-220, -8, 0], [-160, 40, Math.PI], [-110, -10, 0], [110, 40, Math.PI], [160, 40, Math.PI], [240, 40, Math.PI], [260, -30, 0]];
vil.forEach(function (v, i) { mrwVilla(G, v[0], v[1], { ry: v[2], w: 9 + (i % 3), d: 8, brick: [0xB86A4E, 0xE0D8C8, 0xC8806A, 0xA85A42][i % 4] }); });
var vd = mrwVillaDoor(-400, 40, { ry: Math.PI });
var rV = MRW.rooms.filter(function (r) { return r.key === "villa"; })[0];
if (rV)
mrwDoor(rV, "The villa's window, forced open", vd.x, vd.z, vd.ry);
if (!st.shpit) {
mrwVilla(G, 0, -30, { w: 10, d: 9, ry: 0, brick: 0xB86A4E });
mrwVilla(G, 24, 8, { w: 10, d: 9, ry: 0, brick: 0xEDE8DC });
var wd = mrwVillaDoor(24, 8, { w: 10, d: 9 });
var rK = MRW.rooms.filter(function (r) { return r.key === "kitchen"; })[0];
if (rK)
mrwDoor(rK, "The door of the white house", wd.x, wd.z, wd.ry);
}
mrwPaling(G, [[12, 20], [44, 20], [44, -6]], H, { col: 0xE8E2D2 });
if (st.shpit)
mrwShScullery(G);
if (st.shpit) {
var py = H(P[0], P[1]);
mrwCylinder(G, P[0] + 6, py + 3, P[1] - 6, { rx: 0.12, ry: 1.1, open: true });
mrwSolid(P[0] + 6, P[1] - 6, 26, 26, py - 2, py + 14, 1.1);
mrwPlant(G, "rock", mrwScatter(102, lite ? 12 : 30, P[0] - 60, P[1] - 60, P[0] + 60, P[1] + 60, function (x, z) { var d = Math.hypot(x - P[0], z - P[1]); return d > 44 && d < 66 && !(Math.abs(x) < 8 && z > -12); }, H, 0.5, 1.4), { mat: mrwMat("brick"), keepAll: true });
for (var i = 0; i < (lite ? 4 : 10); i++) {
var a = i * 0.63, bx = P[0] + Math.cos(a) * 52, bz = P[1] + Math.sin(a) * 52;
if (Math.abs(bx) < 10 && bz > -14)
continue;
var b = mrwBox(G, 0.3, 0.3, 4 + i % 3, mrwMat("darkoak"), bx, H(bx, bz) + 0.4, bz);
b.rotation.set(0.2, a, 0.3);
}
if (st.handler)
mrwHandler(G, P[0] - 10, py - 2, P[1] + 8, 2.4);
if (st.handler2)
mrwHandler(G, P[0] + 14, py - 2, P[1] + 14, -2.0);
var nm = st.mars || 0;
for (i = 0; i < nm; i++)
mrwMartian(G, P[0] - 14 + i * 6, py - 1, P[1] + 18 - (i % 2) * 4, Math.PI * 0.9, { s: 1.7, dead: !!st.marsDead });
if (st.guard)
mrwTripod(G, P[0] + 40, P[1] - 50, { hfn: H, ry: Math.PI * 0.2, sp: 0 });
if (st.building) {
var mk = new THREE.Group();
mk.position.set(P[0] + 18, py - 1, P[1] - 14);
G.add(mk);
mk.userData.keep = 1;
mrwBox(mk, 3, 2, 4, mrwShine(0xA8A498, 0.4, 0.85), 0, 0, 0);
mrwCyl(mk, 0.5, 0.5, 5, mrwShine(0x3A3832, 0.5, 0.6), 0, 2, 0, 10);
mrwSmoke(G, P[0] + 18, py + 6, P[1] - 14, 0x7A8A6A, 6);
}
if (st.marsDead) {
mrwPlant(G, "rock", mrwScatter(103, 6, P[0] - 20, P[1] - 10, P[0] + 20, P[1] + 20, null, H, 0.3, 0.6), { mat: mrwMat("earth"), keepAll: true });
}
}
if (weed) {
var nw = [0, lite ? 80 : 200, lite ? 260 : 700, lite ? 360 : 1000][weed];
mrwRedWeed(G, mrwScatter(104, nw, -860, -860, 860, 860, function (x, z) { return mrwShWl(x, z) === null || weed >= 3; }, function (x, z) { return Math.max(0, H(x, z)); }, 0.6, 1.6));
}
var ph = [[580, -250, 0], [600, -370, Math.PI], [680, -260, 0], [700, -370, Math.PI], [560, -420, Math.PI], [720, -440, Math.PI]];
ph.forEach(function (v, i) { mrwVilla(G, v[0], v[1], { ry: v[2], w: 10, d: 9, brick: [0xB86A4E, 0xE0D8C8, 0xC8806A][i % 3] }); });
mrwVilla(G, 640, -330, { w: 11, d: 9, ry: Math.PI / 2, brick: 0xC8B8A0 });
var ad = mrwVillaDoor(640, -330, { w: 11, d: 9, ry: Math.PI / 2 });
var rA = MRW.rooms.filter(function (r) { return r.key === "arty"; })[0];
if (rA)
mrwDoor(rA, "The door of the house", ad.x, ad.z, ad.ry);
var rAc = MRW.rooms.filter(function (r) { return r.key === "arcell"; })[0];
if (rAc)
mrwDoor(rAc, "The cellar steps", 652, -344, Math.PI);
var ry0 = H(648, -336);
MRW_AT.roof.y = ry0 + 9.2;
mrwFloor(648, -336, 6, 6, ry0 + 9.2);
mrwBox(G, 6, 0.2, 6, mrwMat("slate"), 648, ry0 + 9.0, -336);
mrwRamp(654, -326, 2, 10, ry0, ry0 + 9.2, 0);
mrwBox(G, 1.6, 0.1, 10, mrwMat("oak"), 654, ry0 + 4.6, -326).rotation.x = -0.75;
mrwTownHouse(G, 600, -300, 12, 9, 8, { wall: "render", roof: "slate", ry: Math.PI / 2 });
var rP = MRW.rooms.filter(function (r) { return r.key === "pub"; })[0];
if (rP)
mrwDoor(rP, "The door of the public-house", 605.4, -300, Math.PI / 2);
mrwBridge(G, MRW_SH.bridge[0], MRW_SH.river - 14 * Math.sin(660 / 200) * 0, 100, 10, 1.2, {});
for (i = 0; i < 8; i++)
mrwTownHouse(G, 620 + (i % 2) * 80, -640 - Math.floor(i / 2) * 20, 10, 9, 9, { wall: "brick", roof: "slate", ry: i % 2 ? -Math.PI / 2 : Math.PI / 2 });
var free = function (x, z) { return mrwShWl(x, z) === null && Object.keys(MRW_SH_ROADS).every(function (k) { return mrwPathD(x, z, MRW_SH_ROADS[k]) > 8; }) && Math.hypot(x - P[0], z - P[1]) > 70 && !(Math.abs(z - 15) < 40 && x > -640 && x < 300) && !(x > 540 && x < 760 && z > -460 && z < -220); };
var trees = mrwScatter(105, lite ? 120 : 300, -860, -860, 860, 860, free, H, 0.8, 1.4);
if (st.grey) {
mrwDeadTrees(G, trees.filter(function (t, i) { return i % 2; }));
mrwPlant(G, "tree", trees.filter(function (t, i) { return !(i % 2); }), { col: 0x4A5A3A });
}
else
mrwPlant(G, "tree", trees, { col: 0x4A7A34 });
if (!st.grey && !weed)
mrwPlant(G, "grass", mrwScatter(106, lite ? 200 : 500, -860, -860, 860, 860, free, H, 0.8, 1.3), { col: 0xC8D898 });
mrwPoles(G, MRW_SH_ROADS.kew, H, 40);
if (st.grey)
for (i = 0; i < (lite ? 3 : 8); i++) {
var dx = -700 + i * 90, dz = 10 + (i % 2) * 8;
mrwCart(G, dx, dz, 0.4 + i, { seat: true, horse: false, hcol: 0x2A2A2A });
}
},
function (G) {
var st = MRW.st;
if (st.arty) { }
if (mrwCalm(st, ["grey", "shpit", "shkew", "shtri", "handler", "mars", "weed", "drunk"])) {
mrwCrowd("shq", [["A Sheen grocer at his door", "m", "worker", "Fine weather. Folk are all out on the river."], ["A nursemaid with a pram", "f", "maid", "Hush now, baby, hush."], ["A clergyman", "m", "clergy", "Good morning to you. Evensong at six."], ["A boy with a paper", "m", "newsboy", "Star fallen at Woking! Read all about it!", null, true], ["A lady in a straw hat", "f", "lady", "We're taking the train to Richmond."], ["A cabman", "m", "cabby", "Kew Gardens, sir? A shilling."]], -120, -30, 160, 40, { wander: 5 });
mrwCrowd("shp", [["A Putney publican", "m", "worker", "Come in, come in, the beer's cold."], ["A rowing man", "m", "gent", "The crews are out at Putney today."], ["A flower-seller", "f", "maid", "Violets! Penny a bunch!"], ["A girl with a skipping rope", "f", "girl", "One, two, three, four...", null, true]], 560, -340, 700, -260, { wander: 5 });
mrwCrowd("shm", [["A Mortlake brewer's man", "m", "worker", "Mind the dray."], ["A lady by the river", "f", "lady", "The water is so high this year."]], 120, -640, 300, -560, { wander: 4, ok: function (x, z) { return mrwShWl(x, z) === null; } });
}
if (st.drunk) {
mrwOne("shdr", "A man lying in the road", "m", "worker", 640, -800, 0, "Go 'way. Lemme be. Wha' d'you want?", { persona: MRP.townfolk });
}
if (st.shkew) {
mrwCrowd("kew", [["A man running towards the river", "m", "gent", "Back! Back! A Martian! Get under cover!"], ["A woman with a child", "f", "maid", "Where can we go? Where?"]], -760, 10, -660, 60, { wander: 6 });
}
},
function (G) {
mrwShRooms(G);
mrwSheen(G);
mrwShFolk(G);
var st = MRW.st, H = mrwShH;
if (st.shtri === "kew")
mrwTripod(G, -600, -200, { hfn: H, ry: 0.6, path: [[-600, -200], [-760, 20], [-600, 200], [-420, 40]], sp: 5 });
if (st.shtri === "far")
mrwTripod(G, 300, -500, { hfn: H, ry: -0.4, path: [[300, -500], [500, -600], [200, -700]], sp: 2 });
if (st.shtri === "still")
mrwTripod(G, 700, -860, { hfn: H, ry: Math.PI, sp: 0 });
},
function (x, z) {
var n = mrwFbm(x * 0.006, z * 0.006, 3), h = 6 + n * 5;
var d = Math.hypot(x - MRW_PR.top[0], (z - MRW_PR.top[1]) * 1.2);
h += Math.max(0, 1 - d / 300) * Math.max(0, 1 - d / 300) * 42;
var cd = Math.abs(z - MRW_PR.canal - 20 * Math.sin(x / 220));
if (cd < 10)
h = Math.min(h, cd < 6 ? -1.6 : -1.6 + (cd - 6) / 4 * (h + 1.6));
var p = mrwPit(MRW_PR.pit[0], MRW_PR.pit[1], 46, 10)(x, z);
if (p)
h += p;
return h;
},
function (G) {
var X = MRW_ROOMXZ.primrose, R;
R = mrwRoom(G, "kind", X.kind[0], X.kind[1], 10, 8, { wall: "bluepaper", name: "the house of the kind people, St. John's Wood" });
mrwTable(R.g, 0, 0, 1.8, 1, 0.76, { cloth: 0xF4F0E8 });
mrwChair(R.g, -0.7, -0.8, 0, {});
mrwChair(R.g, 0.7, 0.8, Math.PI, {});
mrwHearth(R.g, -4.8, 0, Math.PI / 2, { h: R.h });
mrwShelves(R.g, 4.8, 0, 3, 2.4, -Math.PI / 2, {});
mrwPicture(R.g, 0, 2.2, -3.88, 0, 1.2, 0.8);
mrwRug(R.g, 0, 0, 3.4, 2.4, 0x6A2A22);
R = mrwRoom(G, "kbed", X.kbed[0], X.kbed[1], 8, 7, { wall: "greenpaper", name: "the room they gave you" });
mrwBed(R.g, -2, 0, Math.PI / 2, {});
mrwChair(R.g, 2, 1, Math.PI, {});
mrwWindowIn(R.g, 0, 1.8, -3.38, 0, 1.4, 1.4, { sky: 0xA8C0D8 });
mrwCandle(R.g, 1, 0.76, -2.6, {});
R = mrwRoom(G, "cab", X.cab[0], X.cab[1], 6, 5, { wall: "planks", name: "a cabman's shelter", bare: 1 });
mrwBench(R.g, -1.6, 0, Math.PI / 2, { w: 3, d: 0.5 });
mrwBench(R.g, 1.6, 0, -Math.PI / 2, { w: 3, d: 0.5 });
mrwHearth(R.g, 0, -2.3, 0, { h: R.h });
},
function (G) {
var lite = mrwLite(), R = wRand(121), stone = mrwLam(0x9A968C), dark = mrwLam(0x6A645A), g = new THREE.Group();
G.add(g);
g.userData.keep = 1;
for (var i = 0; i < (lite ? 60 : 160); i++) {
var a = 0.2 + R() * 2.4, d = 1300 + R() * 1100, x = Math.sin(a) * d, z = Math.cos(a) * d * 0.9 + 200;
mrwBox(g, 20 + R() * 40, 8 + R() * 22, 20 + R() * 40, R() < 0.5 ? stone : dark, x, 0, z);
}
var sp = new THREE.Group();
sp.position.set(1700, 0, 1500);
g.add(sp);
mrwBox(sp, 60, 34, 140, stone, 0, 0, 0);
mrwCyl(sp, 22, 22, 26, stone, 0, 34, 0, 24);
var dm = new THREE.Mesh(mrwGeo("prdome", function () { return new THREE.SphereGeometry(22, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2); }), mrwShine(0x8A8C88, 0.6, 0.3));
dm.position.y = 60;
sp.add(dm);
mrwCyl(sp, 3, 4, 16, stone, 0, 80, 0, 10);
mrwBox(sp, 1, 8, 1, mrwMat("brass"), 0, 96, 0);
mrwBox(sp, 4, 1, 1, mrwMat("brass"), 0, 100, 0);
var ah = new THREE.Group();
ah.position.set(-300, 0, 1700);
g.add(ah);
mrwCyl(ah, 40, 40, 26, mrwLam(0xA85A42), 0, 0, 0, 28);
var ad = new THREE.Mesh(mrwGeo("prah", function () { return new THREE.SphereGeometry(40, 24, 8, 0, Math.PI * 2, 0, Math.PI / 5); }), mrwLam(0x8A9890));
ad.position.y = 12;
ah.add(ad);
mrwBox(g, 30, 12, 120, stone, 900, 0, 2300);
var ct = mrwBox(g, 10, 90, 10, stone, 960, 0, 2240);
mrwCyl(g, 0.1, 8, 20, dark, 960, 90, 2240, 4);
var cp = new THREE.Group();
cp.position.set(1400, 30, 3000);
g.add(cp);
mrwBox(cp, 360, 30, 60, mrwShine(0xC8D0D8, 0.2, 0.6), 0, 0, 0);
mrwCyl(cp, 7, 7, 80, stone, -200, 0, 0, 10);
mrwCyl(cp, 7, 7, 80, stone, 200, 0, 0, 10);
for (i = 0; i < (lite ? 8 : 20); i++) {
var sa = 0.3 + R() * 2.2, sd = 1200 + R() * 1100;
mrwCyl(g, 0.4, 4, 30 + R() * 30, stone, Math.sin(sa) * sd, 0, Math.cos(sa) * sd * 0.9 + 200, 6);
}
return g;
},
function (G) {
var lite = mrwLite(), st = MRW.st, H = mrwPrH, P = MRW_PR.pit;
mrwFar(G, function (x, z) { return Math.min(8, H(x, z)); });
mrwTerrain(G, -760, -760, 1520, 1520, lite ? 18 : 10, H, mrwMat("meadow"), function (x, z, y, c) {
var g = 0.8 + mrwFbm(x * 0.03, z * 0.03, 2) * 0.24, dp = Math.hypot(x - P[0], z - P[1]);
if (dp < 50) {
c.setRGB(0.62 * g, 0.54 * g, 0.42 * g);
return;
}
var r = st.weed ? mrwFbm(x * 0.01, z * 0.01, 2) : 0;
if (r > 0.55 && !st.after) {
c.setRGB(0.56 * g, 0.2 * g, 0.14 * g);
return;
}
if (r > 0.55) {
c.setRGB(0.44 * g, 0.34 * g, 0.28 * g);
return;
}
c.setRGB(0.58 * g, 0.76 * g, 0.42 * g);
});
var cw = mrwWater(G, 0, MRW_PR.canal, 1520, 20, -0.4, 0x3A4A3A, 0.9);
cw.userData.fx = 0.2;
Object.keys(MRW_PR_ROADS).forEach(function (k) { mrwStrip(G, MRW_PR_ROADS[k], k === "hill" ? 4 : (k === "rpr" ? 10 : 7), H, mrwMat(k === "hill" ? "earth" : "gravel"), 0.06); });
mrwPrSkyline(G);
var py = H(P[0], P[1]);
[[P[0] - 12, P[1] - 10, 0.8], [P[0] + 16, P[1] + 4, 2.1], [P[0] - 2, P[1] + 18, 1.5]].forEach(function (c, i) { mrwCylinder(G, c[0], py + 2.6, c[1], { rx: 0.14, ry: c[2], open: true }); mrwSolid(c[0], c[1], 20, 20, py - 2, py + 12, c[2]); });
mrwHandler(G, P[0] + 24, py - 1, P[1] - 18, 1.2);
mrwHandler(G, P[0] - 26, py - 1, P[1] + 6, -0.6);
mrwPlant(G, "rock", mrwScatter(122, lite ? 14 : 36, P[0] - 60, P[1] - 60, P[0] + 60, P[1] + 60, function (x, z) { var d = Math.hypot(x - P[0], z - P[1]); return d > 46 && d < 70; }, H, 0.6, 1.6), { mat: mrwMat("earth"), keepAll: true });
if (st.prdead) {
for (var i = 0; i < (lite ? 6 : 12); i++) {
var a = i * 0.52, d = 12 + (i % 3) * 10;
mrwMartian(G, P[0] + Math.cos(a) * d, py + (d > 30 ? 2 : -0.6), P[1] + Math.sin(a) * d, a, { s: 1.7, dead: true });
}
mrwTripod(G, P[0] + 70, P[1] + 40, { hfn: H, ry: 0.8, dead: true });
mrwTripod(G, P[0] - 80, P[1] - 10, { hfn: H, ry: 2.4, dead: true });
mrwTripod(G, P[0] + 10, P[1] - 90, { hfn: H, ry: -0.6, dead: true });
var bg = new THREE.Group();
G.add(bg);
bg.userData.keep = 1;
bg.userData.live = 1;
var bm = mrwLam(0x0A0A0C), birds = [];
for (i = 0; i < (lite ? 8 : 22); i++) {
var b = new THREE.Group();
var body = mrwEll(b, bm, 0.18, 0.12, 0.3, 0, 0, 0, 6);
var w1 = mrwBox(b, 0.8, 0.02, 0.24, bm, 0.42, 0, 0);
var w2 = mrwBox(b, 0.8, 0.02, 0.24, bm, -0.42, 0, 0);
b.userData.w = [w1, w2];
b.userData.a = i * 0.7;
b.userData.r = 14 + (i % 5) * 6;
b.userData.h = py + 12 + (i % 4) * 4;
bg.add(b);
birds.push(b);
}
MRW.ticks.push(function (dt) { if (!bg.parent)
return; birds.forEach(function (b, i) { b.userData.a += dt * (0.4 + (i % 3) * 0.1); var a = b.userData.a; b.position.set(P[0] + Math.cos(a) * b.userData.r, b.userData.h + Math.sin(a * 2) * 2, P[1] + Math.sin(a) * b.userData.r); b.rotation.y = -a; var f = Math.sin(MRW.t * 8 + i) * 0.5; b.userData.w[0].rotation.z = f; b.userData.w[1].rotation.z = -f; }); });
}
if (st.prhowl)
mrwTripod(G, P[0] + 40, P[1] + 30, { hfn: H, ry: Math.PI * 0.7, sp: 0 });
for (var t = 0; t < 14; t++) {
var tx = -600 + t * 90;
if (Math.abs(tx + 100) < 30)
continue;
mrwTownHouse(G, tx, 236, 16, 10, 12, { wall: t % 3 ? "render" : "ochre", roof: "slate", ry: Math.PI });
}
for (t = 0; t < 8; t++) {
mrwTownHouse(G, -560 + t * 150, 272, 16, 10, 12, { wall: "render", roof: "slate", ry: 0 });
}
mrwBridge(G, 0, MRW_PR.canal, 22, 8, 1.0, { ry: Math.PI / 2 });
[[-660, 90, Math.PI / 2], [-600, 60, Math.PI / 2], [-560, 170, 0], [-700, 160, Math.PI], [-640, 200, 0], [-520, 210, Math.PI], [-680, -20, Math.PI / 2], [-600, -60, -Math.PI / 2]].forEach(function (v, i) { mrwVilla(G, v[0], v[1], { ry: v[2], w: 10, d: 9, brick: [0xEDE8DC, 0xC8B8A0, 0xB86A4E][i % 3] }); });
mrwVilla(G, -600, 150, { w: 11, d: 9, ry: Math.PI, brick: 0xEDE8DC });
var kd = mrwVillaDoor(-600, 150, { w: 11, d: 9, ry: Math.PI });
var rK = MRW.rooms.filter(function (r) { return r.key === "kind"; })[0];
if (rK)
mrwDoor(rK, "The door of the kind people's house", kd.x, kd.z, kd.ry);
var rB = MRW.rooms.filter(function (r) { return r.key === "kbed"; })[0];
if (rB)
mrwDoor(rB, "The garden door, up to your room", -592, 158, 0);
var rC = MRW.rooms.filter(function (r) { return r.key === "cab"; })[0];
var cy = H(-400, 256);
mrwBox(G, 4, 3, 3, mrwMat("planks"), -400, cy, 262);
mrwBox(G, 4.4, 0.3, 3.4, mrwLam(0x1E3A1E), -400, cy + 3, 262);
if (rC)
mrwDoor(rC, "The cabman's shelter", -400, 259.6, Math.PI);
var free = function (x, z) { return mrwPrWl(x, z) === null && Object.keys(MRW_PR_ROADS).every(function (k) { return mrwPathD(x, z, MRW_PR_ROADS[k]) > 8; }) && Math.hypot(x - P[0], z - P[1]) > 80 && !(z > 220 && z < 290) && !(x < -480 && z > -100 && z < 240); };
mrwPlant(G, "tree", mrwScatter(123, lite ? 110 : 280, -760, -760, 760, 760, free, H, 0.9, 1.5), { col: st.after ? 0x5A8A3A : 0x4A6A34 });
mrwPlant(G, "grass", mrwScatter(124, lite ? 160 : 420, -760, -760, 760, 760, free, H, 0.8, 1.3), { col: 0xB8C888 });
if (st.weed && !st.after)
mrwRedWeed(G, mrwScatter(125, lite ? 100 : 260, -760, -200, 760, 760, function (x, z) { return free(x, z) || mrwPrWl(x, z) !== null; }, function (x, z) { return Math.max(-0.4, H(x, z)); }, 0.5, 1.4));
mrwPoles(G, MRW_PR_ROADS.rpr, H, 40);
},
function (G) {
mrwPrRooms(G);
mrwPrimrose(G);
var st = MRW.st;
if (st.prkind) {
var R = MRW.rooms.filter(function (r) { return r.key === "kind"; })[0];
if (R) {
mrwOne("prk1", "The man of the house", "m", "gent", R.cx - 0.6, R.cz - 1.2, 0, "You're awake. Good. You've been three days with us. Sit, and eat something.", { y: R.y, persona: MRP.townfolk });
mrwOne("prk2", "His wife", "f", "lady", R.cx + 0.8, R.cz - 0.6, Math.PI, "You were wandering in the road, singing. We brought you in. You're safe now.", { y: R.y, persona: MRP.townfolk });
}
}
if (st.prpeople || mrwCalm(st, ["prdead", "prhowl", "after", "prkind", "prpeople", "weed"])) {
mrwCrowd("prp", [["A man come back from the country", "m", "gent", "Is it true? They're all dead? All of them?"], ["A woman weeping", "f", "maid", "My husband was in London. I've walked from St. Albans."], ["A boy with a loaf", "m", "boy", "There's bread at the Mansion House! The French sent it!", null, true], ["A cabman", "m", "cabby", "First fare in a fortnight. Where to, sir?"], ["A clergyman", "m", "clergy", "There will be a service of thanksgiving at St. Paul's."], ["A soldier", "m", "mrarty", "Back from Dover. You never saw such a sight as the hill."]], -500, 230, 200, 270, { wander: 6 });
}
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = MRW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = MRW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: MRW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return mrbPos(at.at);
var C = MRB_CH[mrbS().ch], i = mrbS().s, c = C && C.cast ? C.cast.filter(function (d) { return mrbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? mrbPos(c.at) : null;
}
if (at.spot) {
var Sp = MRW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: MRW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return mrbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || MRW.sc, x: at.x, z: at.z, y: at.y };
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
if (MRB.beam && MRB.beam.parent === MRW.scG)
return MRB.beam;
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
MRW.scG.add(g);
MRB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return mrwLam(c); }, m;
switch (kind) {
case "load":
m = mrwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
mrwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = mrwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = mrwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = mrwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = mrwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = mrwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
mrwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = mrwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
mrwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), mrwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = mrwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "paper":
m = mrwBox(g, 0.34, 0.03, 0.46, M(0xE8E2D0), 0, 0.02, 0);
mrwBox(g, 0.3, 0.005, 0.08, M(0x2A2A2A), 0, 0.04, -0.16);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M(0xC8945A));
m.scale.set(1.5, 0.8, 1);
m.position.y = 0.1;
g.add(m);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 10), mrwShine(0x1A3A1A, 0.2, 0));
m.position.y = 0.15;
g.add(m);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 8), mrwShine(0x1A3A1A, 0.2, 0));
nk.position.y = 0.35;
g.add(nk);
break;
case "tin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), mrwShine(0xA8A8A0, 0.4, 0.6));
m.position.y = 0.05;
g.add(m);
break;
case "coin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 12), mrwShine(0xE8C060, 0.3, 0.9));
m.position.y = 0.01;
g.add(m);
break;
case "spade":
m = mrwBox(g, 0.05, 0.05, 1.0, M(0x6A4A2A), 0, 0.03, 0);
mrwBox(g, 0.2, 0.02, 0.26, mrwShine(0x8A8A88, 0.4, 0.7), 0, 0.02, 0.6);
break;
case "post":
m = mrwBox(g, 0.08, 1.1, 0.08, M(0xE8E0CC), 0, 0, 0);
break;
case "skin":
m = mrwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = mrwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = mrwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
mrwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = mrwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
mrwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
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
m = mrwBox(g, 0.3, 0.06, 0.06, M(0x9A7A5A), 0, 0.03, 0);
break;
case "lantern":
m = mrwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), mrwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = mrwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
mrwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), mrwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), mrwMat("glass"));
m.position.y = 0.08;
g.add(m);
mrwCyl(g, 0.02, 0.02, 0.1, mrwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = mrwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = mrwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
mrwFire(g, 0, 0.08, 0, 0.4);
break;
case "chain":
m = mrwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
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
if (!P || !MRW.scG || P.sc !== MRW.sc)
return null;
var g = mrbItemMesh(kind), y = P.y != null ? P.y : mrwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
MRW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = mrwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (MRB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = MRW.spots.indexOf(I.S); if (j >= 0)
MRW.spots.splice(j, 1); MRB.items = MRB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.mrb = 1;
MRB.items.push(I);
return I;
},
function (k) {
if (MRB.tuneKey === k)
return;
MRB.tuneKey = k;
var old = MRB.tune;
MRB.tune = null;
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
if (!k || !MRB_TUNES[k])
return;
try {
var A = new Audio(MRB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
MRB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (MRB.tune !== A) {
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
if (MRB.text)
return fn(MRB.text);
if (MRB.textWait) {
MRB.textWait.push(fn);
return;
}
MRB.textWait = [fn];
var done = function (B) { MRB.text = B; var w = MRB.textWait; MRB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/war-worlds/war-worlds.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
mrbText(function (B) {
var C = MRB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + mrbNum(i) + ". " + esc(C.t) + "</h3>" + MRB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(mrbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); MRB.readOpen = 0; MRB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = mrbS(), C = MRB_CH[S.ch];
if (!C)
return;
MRB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
MRB.readAsk = 0;
MRB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "The War of the Worlds") + "</div><h3 style='margin:4px 0'>" + mrbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? mrbOpening(T).map(mrbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); MRB.readOpen = 0; mrbStepDone(); }, all: function () { mrbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Wells's own words, all of it");
b += mrbKeeperBtns(fns);
worldCard(b, fns);
};
mrbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
MRB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); mrbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = mrbS(), C = MRB_CH[S.ch];
if (!C)
return;
mrbItemsClear();
mrbCastClear();
MRB.hold = 0;
var go = function () { mrbWorldState(); mrbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[mrb] setup", S.ch, e);
} mrbTune(C.tune || null); mrbStepBegin(); };
if (place && C.start) {
var P = mrbPos(C.start);
if (P && WLD.on === MRW_KEY) {
mrwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (MRW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = mrbStep();
mrbItemsClear();
MRB.hold = 0;
MRB.puzOpen = 0;
if (!b)
return;
b._key = mrbKey();
mrbWorldState();
try {
if (b.on)
b.on(mrbS().f);
}
catch (e) {
if (window.console)
console.warn("[mrb] on", e);
}
if (b.k === "read") {
mrbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { MRB.rew[k] = 0; });
if (b.k === "find") {
var Pf = mrbPos(b.at);
if (Pf && Pf.sc === MRW.sc)
mrbItemAdd(b.item, Pf, b.name, b.verb, function () { if (mrbKey() === b._key)
mrbStepDone(); });
}
if (b.k === "gather") {
var P = mrbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(mrbS().ch * 97 + mrbS().s * 13 + 7);
MRB.got = 0;
if (P && P.sc === MRW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = mrwGround(Q.x, Q.z, (P.y != null ? P.y : mrwLand(P.x, P.z)) + 1);
mrbItemAdd(b.item, Q, b.name, b.verb, function () { if (mrbKey() !== b._key)
return; MRB.got++; try {
if (b.each)
b.each(MRB.got);
}
catch (e) { } if (MRB.got < n) {
mrbSay((b.eachSay || "Got one.") + " " + MRB.got + " of " + n + ".");
return;
} mrbStepDone(); });
}
}
if (b.h)
mrbSay("<b>" + esc(MRB_CH[mrbS().ch].t) + ".</b> " + b.h);
},
function (b) {
MRB.puzOpen = 1;
MRB.puzT = performance.now();
var k = mrbKey(), fns = {}, h = MRB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
mrbSay(b.yes);
if (mrbKey() === k)
mrbStepDone();
return;
}
mrbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (mrbKey() === k)
MRB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = mrbS(), C = MRB_CH[S.ch], b = mrbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[mrb] done", e);
}
if (b.say)
mrbSay(b.say);
S.s++;
if (window.MRB_LOG)
MRB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= MRB_CH.length - 1) {
S.done = 1;
S.s = 0;
mrbSave();
mrbItemsClear();
mrbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
mrbSave();
var nx = MRB_CH[S.ch];
setTimeout(function () { try {
mrbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[mrb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
mrbSave();
mrbStepBegin();
},
function () {
mrbTune("end");
var S = mrbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + mrQ("And strangest of all is it to hold my wife's hand again, and to think that I have counted her, and that she has counted me, among the dead.") + "</p><p style='font-size:12px;opacity:.75'>H. G. Wells, The War of the Worlds (1898), the Epilogue</p><p>You have seen the falling star land on Horsell Common, watched the cylinder unscrew, run from the heat-ray, driven through the storm to Leatherhead and back, seen Shepperton fall, fled London with your brother and watched the Thunder Child go down, lived buried in the ruined house at Sheen, crossed a red and empty world, and found the Martians dead on Primrose Hill. Your keepsakes:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; mrbSave(); mrbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "Ogilvy's observatory, at Ottershaw");
if (typeof bhnOpen === "function") {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen("martians"); };
}
worldCard(b, fns);
},
function (c) {
var C = MRB.cast[c.key || c.k];
if (mrbCastLive(C))
return C;
var P = mrbPos(c.at);
if (!P || P.sc !== MRW.sc)
return null;
var F = MRW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = mrwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = mrwDressed("mrb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : mrwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
MRW.scG.add(g);
Pp = { g: g, y: y, o: {} };
MRW.people.push(Pp);
if (c.name && !c.mute)
mrwTalk(Pp, c.name, mrwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
MRB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return MRB.cast[c.key || c.k];
},
function () {
var C = MRB_CH[mrbS().ch];
if (!C || !C.cast)
return;
var idx = mrbS().s;
var on = {};
C.cast.forEach(function (c) { var key = c.key || c.k; if (!(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until) && !on[key])
on[key] = c; });
C.cast.forEach(function (c) {
var key = c.key || c.k, want = on[key], have = MRB.cast[key];
if (!want) {
if (have)
mrbCastHide(key);
return;
}
if (want !== c)
return;
if (have && have.c && have.c !== c)
mrbCastHide(key);
if (!mrbCastLive(MRB.cast[key]))
mrbCastAdd(c);
});
},
function () {
var b = mrbStep(), key = "pass", have = MRB.cast[key];
var want = b && b.k === "talk" && b.at && b.at.at ? b : null, P = want ? mrbPos(want.at.at) : null;
if (!want || !P || P.sc !== MRW.sc) {
if (have)
mrbCastHide(key);
return;
}
if (have && have.b === want && mrbCastLive(have))
return;
if (have)
mrbCastHide(key);
if (!want.pass && MRW.talk.some(function (T) { return T.name === want.who && T.p && T.p.g && T.p.g.parent; }))
return;
var pa = want.pass || {}, nm = String(want.who), fem = /woman|lady|girl|wife|Mrs|Miss|mother|maid/i.test(nm), kid = pa.child || /boy|girl|child/i.test(nm);
var dr = pa.dress || (/hussar|cavalry|lieutenant/i.test(nm) ? "mrhussar" : (/soldier|gunner|artillery|sergeant/i.test(nm) ? "mrarty" : (/sailor|boatman|waterman|captain/i.test(nm) ? "mrsailor" : (fem ? (kid ? "girl" : "maid") : (kid ? "boy" : (/milkman|carter|labourer|porter|landlord|man with/i.test(nm) ? "worker" : "gent"))))));
var Pp = mrwOne("pass" + mrbS().ch + "_" + mrbS().s, want.who, pa.sex || (fem ? "f" : "m"), dr, P.x, P.z, pa.ry || 0, pa.greet || "", { y: P.y, child: !!kid, persona: MRP.townfolk });
if (Pp)
MRB.cast[key] = { g: Pp.g, P: Pp, c: { k: key }, b: want };
},
function () {
if (!MRW.scG)
return;
mrbCastClear();
var S = mrbS(), C = MRB_CH[S.ch];
if (S.started && !S.done && C && C.cast && mrbCastHere(C)) {
mrbCastTick();
return;
}
(MRB_FOLK_AT[MRW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = mrwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
MRB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!mrbActive())
return false;
var b = mrbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = mrbKey();
worldPrompt(null);
var next = function () { if (mrbKey() === k)
mrbStepDone(); };
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
worldCard(MRB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
MRB.wt += dt;
if (MRB.wt > 0.5) {
MRB.wt = 0;
if (mrbActive() && mrbCastHere(MRB_CH[mrbS().ch]))
mrbCastTick();
if (mrbActive())
mrbPassTick();
var S0 = mrbS();
S0.seen[MRW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!mrbActive()) {
if (MRB.beam)
MRB.beam.visible = false;
MRW.bannerBook = false;
return;
}
var S = mrbS(), b = mrbStep(), t = MRW.t, feet = camera.position.y - 1.72;
MRB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? mrbPos(b.at) : null, here = P && P.sc === MRW.sc, bm = mrbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + mrbScName(P.sc) + ": press E for the book)";
if (here && !MRW.moving && !MRW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : mrwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = mrbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !MRW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (MRB.readAsk)
break;
if (!MRB.readOpen)
mrbChapterCard();
else {
MRB.readOpen = 0;
mrbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
mrbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
MRB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(MRB.hold, dt);
}
catch (e) { }
if (MRB.hold >= (b.sec || 8)) {
mrbStepDone();
return;
}
}
else
MRB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return MRB.rew[k]; })) {
mrbStepDone();
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
mrbStepDone();
return;
}
break;
}
case "puzzle":
if ((!MRB.puzOpen || performance.now() - (MRB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
mrbPuzzleCard(b);
break;
}
}
var C = MRB_CH[S.ch], prog = b && b.k === "hold" && MRB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - MRB.hold)) + " s)" : b && b.k === "gather" ? " (" + (MRB.got || 0) + " of " + (b.n || 3) + ")" : "";
MRW.bannerBook = true;
worldBanner("⚡ <b>" + mrbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = mrbS(), C = MRB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>H. G. Wells · The War of the Worlds (1898), the whole book</div><h3 style='margin:4px 0'>🛸 The War of the Worlds</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + mrbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((mrbStep() || {}).h || "") + "</p>";
var st = mrbStep(), P = st && st.at ? mrbPos(st.at) : null, Cs = mrbPos(C.start);
var to = P && P.sc !== MRW.sc ? P : (!P && Cs && Cs.sc !== MRW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + mrbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); mrwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { mrbPopulate(); mrbStepBegin(); }); };
}
}
else
b += "<p>Surrey, 1898. A writer on philosophy, living on Maybury Hill near Woking, looks at Mars through his friend Ogilvy's telescope and sees a flash of light. Days later a falling star comes down on Horsell Common. All twenty-seven chapters, every one played: Woking and the sand pit, the heat-ray, the storm, Weybridge and Shepperton, your brother's flight from London and the Thunder Child, the ruined house at Sheen, the red weed, Putney Hill, and Primrose Hill. About three and a half hours at your own pace; your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Ogilvy's observatory, at Ottershaw", S.started ? "Back to where you were" : "\"No one would have believed in the last years of the nineteenth century that this world was being watched\"");
fns.go = function () { worldCard(null); mrbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; mrbSave(); mrbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(MRW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(MRW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (MRW_SCN[k].start || { x: 0, z: 0 }); mrwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, mrbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += mrbKeeperBtns(fns);
worldCard(b, fns);
},
function (C) {
var R = function (v) { return typeof v === "string" ? mrbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
MRB_CH.push(C);
return C;
},
function (st, s) {
var v = function (k) { return mrbStV(st[k]); }, reb = false;
Object.keys(MRW.st).forEach(function (k) { if (!(k in st) && MRW.st[k] != null && MRW.st[k] !== false) {
delete MRW.st[k];
if (MRW_LIVEK.indexOf(k) < 0)
reb = true;
} });
Object.keys(st).forEach(function (k) { if (k === "env" || k === "night" || k === "nightUntil" || k === "nightFrom")
return; var nv = v(k); if (MRW.st[k] !== nv) {
MRW.st[k] = nv;
if (MRW_LIVEK.indexOf(k) < 0)
reb = true;
} });
if (typeof mrwLiveState === "function")
try {
mrwLiveState();
}
catch (e) { }
if (reb && !MRW.rebuilding && MRW.scBuilt) {
MRW.rebuilding = 1;
try {
mrwRebuild();
}
catch (e) { }
MRW.rebuilding = 0;
}
}
];
});
