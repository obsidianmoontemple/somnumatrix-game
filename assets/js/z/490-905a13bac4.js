/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(490, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (ARW.tex[k])
return ARW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = arwLite();
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
return (ARW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (ARW.mats[k])
return ARW.mats[k];
var own = name.slice(0, 2) === "b:", map = arwPhotoTex(name, mpt || 2), m;
if (arwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = arwPhotoTex(name, mpt || 2, true);
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
return (ARW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return arwM(k, function () {
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
return arwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return arwCanvas("bamboo", 64, 256, function (x, W, H) {
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
arwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return arwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return arwCanvas("tuft", 128, 64, function (x, W, H) {
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
return arwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return arwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
arwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return arwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = ARW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / ARW_CELL) + "," + Math.floor(z / ARW_CELL)];
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
p = dlnPerson("arw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("arw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || ARW.scG || ARW.G).add(p);
var P = { g: p, y: y, o: o };
ARW.people.push(P);
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
ARW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (arwLite() ? 8 : 4)));
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
var lite = arwLite(), leaf = arwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
arwInst(P, arwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), arwMat("pale"), list, { shadow: !lite });
arwInst(P, arwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), arwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
arwInst(P, arwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), arwMat("bark"), list, { shadow: !lite });
arwInst(P, arwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), arwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
arwInst(P, arwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), arwMat("darkbark"), list, { shadow: !lite });
arwInst(P, arwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), arwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
arwInst(P, arwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), arwMat("bark"), list, { shadow: !lite });
arwInst(P, arwGeo("pfronds", function () { var g = arwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), arwLam(0xFFFFFF, { ds: 1, map: arwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
arwInst(P, arwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), arwMat("darkbark"), list, {});
arwInst(P, arwGeo("mfronds", function () { return arwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), arwLam(0xFFFFFF, { ds: 1, map: arwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
arwInst(P, arwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), arwMat("darkbark"), list, {});
arwInst(P, arwGeo("ffronds", function () { return arwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), arwLam(0xFFFFFF, { ds: 1, map: arwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
arwInst(P, arwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), arwMat("darkbark"), list, {});
arwInst(P, arwGeo("cyf", function () { return arwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), arwLam(0xFFFFFF, { ds: 1, map: arwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
arwInst(P, arwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), arwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: arwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
arwInst(P, arwGeo("bamL", function () { return arwCards(3, 2.6, 2.2, 5.4); }), arwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
arwInst(P, arwGeo("reed" + kind, function () { return arwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), arwLam(0xFFFFFF, { ds: 1, map: arwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
arwInst(P, arwGeo("tuft", function () { return arwCards(2, 1.6, 0.7, 0); }), arwLam(o.col || 0xFFFFFF, { ds: 1, map: arwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
arwInst(P, arwGeo("flw", function () { return arwCards(2, 0.9, 0.7, 0); }), arwLam(0xFFFFFF, { ds: 1, map: arwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
arwInst(P, arwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), arwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
arwInst(P, arwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || arwMat("rock"), list, {});
break;
}
case "cactus": {
arwInst(P, arwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), arwLam(0x4A7A3A), list, {});
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
function (kind, col) { return arwM("skinM" + kind + (col || ""), function () { var t = arwSkinTex(kind); t.repeat.set(2, 2); var m = arwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = arwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(arwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = arwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(arwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
arwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return arwGeo(k, function () {
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
var t = arwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), arwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || arwS("b:stucco", o.col || 0xF0E2C8, 3), trim = arwLam(0xFAF6EE), sh = arwLam(o.shut || 0x3A6A4A), glass = arwShine(0x1A2228, 0.2, 0.3);
arwBox(g, w, h, d, wall, 0, 0, 0);
arwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
arwBox(g, w + 0.12, 0.5, d + 0.12, arwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(arwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || arwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
arwBox(g, 1.3, 2.6, 0.12, arwMat("oak"), wx, 0, d / 2 + 0.02);
arwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = arwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = arwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!arwLite())
[-1, 1].forEach(function (s) { arwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
arwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
arwBox(g, 0.05, 0.9, 0.05, arwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
arwBox(g, 1.8, 0.05, 0.05, arwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
arwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (ARW.scG) {
if (ARW.scG.parent)
ARW.scG.parent.remove(ARW.scG);
ARW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
ARW.scG = null;
ARW.solids = [];
ARW.sgrid = null;
ARW.floors = [];
ARW.spots = [];
ARW.talk = [];
ARW.people = [];
ARW.beasts = [];
ARW.fx = [];
ARW.water = [];
ARW.inst = [];
ARW.hgt = null;
ARW.scBuilt = null;
if (typeof arbSceneDrop === "function")
try {
arbSceneDrop();
}
catch (e) { }
},
function (k) {
if (ARW.scBuilt === k && ARW.scG)
return;
arwSceneDrop();
var D = ARW_SCN[k], S = ARW_SC[k];
if (!D || !S || !ARW.G)
return;
ARW.sc = k;
ARW.scG = new THREE.Group();
ARW.scG.position.x = S.x;
ARW.G.add(ARW.scG);
ARW.hgt = D.h || function () { return 0; };
try {
D.build(ARW.scG);
}
catch (e) {
if (window.console)
console.warn("[arcturus] scene", k, e);
}
ARW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
ARW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = arwAtPt(at);
if (!A)
return;
var v = arwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
ARW.moving = true;
setTimeout(function () {
if (WLD.on !== ARW_KEY) {
v.style.opacity = "0";
ARW.moving = false;
return;
}
arwScene(A.sc);
var S = ARW_SC[A.sc], y = A.y != null ? A.y : arwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(ARW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(arwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; ARW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(arwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), arwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; ARW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(arwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), arwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(arwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), arwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(arwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), arwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!arwLite() && typeof THREE.PointLight === "function" && (ARW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
ARW.lights = (ARW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
ARW.fx.push(g);
return g;
},
function (k) {
switch (k) {
case "brick": return arwS("brick", 0xC07A5E, 1.6);
case "yellowbrick": return arwS("brick", 0xD8C098, 1.6);
case "ashlar": return arwS("b:ashlar", 0xE8E0D0, 2.4);
case "stone": return arwS("stone", 0xD0C8B8, 2.4);
case "slate": return arwS("b:slate", 0x6A6E78, 2);
case "oak": return arwS("b:oak", 0x8A5E3A, 1.4);
case "floor": return arwS("b:oak", 0xA87A50, 1.8);
case "planks": return arwS("b:planks", 0x9A8060, 2);
case "damask": return arwS("b:damask", 0x8A3A3A, 1.2);
case "greenpaper": return arwS("b:damask", 0x4A6A52, 1.2);
case "bluepaper": return arwS("b:damask", 0x4A5A7A, 1.2);
case "velvet": return arwS("b:velvet", 0x6A1E22, 0.8);
case "greenvelvet": return arwS("b:velvet", 0x2E4A34, 0.8);
case "leather": return arwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return arwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return arwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "plaster": return arwS("plaster", 0xF0EAD8, 4);
case "ceiling": return arwLam(0xEDE6D6);
case "brass": return arwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "nickel": return arwShine(0xD8DCE0, 0.25, 0.9);
case "iron": return arwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "ivory": return arwShine(0xF2EAD8, 0.35, 0.05);
case "quartz": return arwM("quartz", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F4FF, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.55, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "granite": return arwS("b:limestone", 0x9A948C, 4);
case "terracotta": return arwS("b:terracotta", 0xC87A5A, 1.6);
case "earth": return arwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return arwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "lawn": return arwS("grass", 0xA8C888, 4);
case "gravel": return arwS("sand", 0xC8B898, 3);
case "paving": return arwS("paving", 0xC8C0B0, 2.4);
case "road": return arwS("asphalt", 0x8A8478, 5);
case "white": return arwS("b:marble", 0xF8F6F2, 3, { shine: 30 });
case "bronze": return arwS("b:brass", 0x7A6A3A, 1.6, { shine: 60 });
case "verdigris": return arwS("b:brass", 0x6A9A8A, 1.6, { shine: 30 });
case "greystone": return arwS("b:limestone", 0xB0ACA4, 4);
case "ruin": return arwS("b:limestone", 0xA8A498, 4);
case "porcelain": return arwS("b:darktile", 0x8AC8A8, 2, { shine: 90 });
case "rock": return arwS("b:strata", 0x8A7A6A, 6);
case "redrock": return arwS("b:strata", 0x8A3A2A, 8);
case "cave": return arwS("b:cave", 0x7A746C, 4);
case "moss": return arwS("b:moss", 0x7A9A5A, 3);
case "bark": return arwS("bark", 0x8A7A64, 2.5);
case "darkbark": return arwS("bark", 0x5A4E40, 3);
case "pale": return arwS("bark", 0xC8BCA8, 3);
case "sand": return arwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "snow": return arwS("snow", 0xF4F6FA, 4);
}
return arwS("earth", 0x8A7058, 5);
},
function (P, x, z, ry, mat, arm) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = arwMat("oak");
if (arm) {
arwBox(g, 0.9, 0.42, 0.85, mat, 0, 0, 0);
arwBox(g, 0.9, 0.8, 0.22, mat, 0, 0.4, 0.34);
[-1, 1].forEach(function (k) { arwBox(g, 0.18, 0.3, 0.85, mat, k * 0.4, 0.42, 0); });
arwBox(g, 0.7, 0.1, 0.6, mat, 0, 0.42, -0.04);
}
else {
arwBox(g, 0.46, 0.06, 0.46, mat, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { arwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.2); });
arwBox(g, 0.44, 0.56, 0.05, wd, 0, 0.5, 0.21);
}
return g;
},
function (P, x, z, w, h, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = arwMat("oak"), R = wRand(Math.round(x * 7 + z * 13));
arwBox(g, w, h, 0.36, wd, 0, 0, 0);
var n = Math.floor(h / 0.42);
for (var i = 0; i < n; i++) {
var y = 0.12 + i * 0.42, bx = -w / 2 + 0.1;
while (bx < w / 2 - 0.12) {
var bw = 0.04 + R() * 0.05, bh = 0.24 + R() * 0.12;
arwBox(g, bw, bh, 0.24, arwLam([0x6A1E1E, 0x1E3A2A, 0x2A2A4A, 0x5A3A1E, 0x8A6A3A, 0x3A1A2A][Math.floor(R() * 6)]), bx + bw / 2, y, -0.2);
bx += bw + 0.005;
}
}
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ag = arwShine(0xE0E4E8, 0.25, 0.9);
arwCyl(g, 0.015, 0.02, 0.5, ag, 0, 0, 0, 6);
[0, 1, 2].forEach(function (i) {
var a = i / 3 * 6.283, f = new THREE.Group();
f.position.set(Math.cos(a) * 0.14, 0.5, Math.sin(a) * 0.14);
f.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
g.add(f);
var c = new THREE.Mesh(arwGeo("lilyc", function () { return new THREE.ConeGeometry(0.07, 0.14, 8, 1, true); }), ag);
c.rotation.x = Math.PI;
f.add(c);
var b = new THREE.Mesh(arwGeo("lilyb", function () { return new THREE.SphereGeometry(0.035, 8, 6); }), arwGlowM(0xFFF0C0));
b.position.y = -0.04;
f.add(b);
});
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), arwM("rug" + col, function () {
var t = arwCanvas("rugt" + col, 256, 256, function (c, W, H) {
c.fillStyle = "#" + col.toString(16).padStart(6, "0");
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(232,200,120,.7)";
c.lineWidth = 10;
c.strokeRect(14, 14, W - 28, H - 28);
c.lineWidth = 3;
c.strokeRect(34, 34, W - 68, H - 68);
for (var i = 0; i < 6; i++) {
c.beginPath();
c.arc(W / 2, H / 2, 20 + i * 14, 0, 7);
c.stroke();
}
arwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
function (P, z, x0, x1, mat, inner, gaps, h) {
h = h || ARW_HOUSE.h1;
var segs = [[x0, x1]];
(gaps || []).forEach(function (G) {
var a = G[0] - G[1] / 2, b = G[0] + G[1] / 2, ns = [];
segs.forEach(function (s) { if (b <= s[0] || a >= s[1]) {
ns.push(s);
return;
} if (a > s[0])
ns.push([s[0], a]); if (b < s[1])
ns.push([b, s[1]]); });
segs = ns;
arwBox(P, G[1], h - 2.4, 0.3, inner || mat, G[0], 2.4, z);
});
segs.forEach(function (s) { var w = s[1] - s[0]; if (w < 0.05)
return; arwBox(P, w, h, 0.3, mat, (s[0] + s[1]) / 2, 0, z, 0, true); if (inner) {
arwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z + 0.16);
arwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z - 0.16);
} });
},
function (P, x, z0, z1, mat, inner, gaps, h) {
h = h || ARW_HOUSE.h1;
var segs = [[z0, z1]];
(gaps || []).forEach(function (G) {
var a = G[0] - G[1] / 2, b = G[0] + G[1] / 2, ns = [];
segs.forEach(function (s) { if (b <= s[0] || a >= s[1]) {
ns.push(s);
return;
} if (a > s[0])
ns.push([s[0], a]); if (b < s[1])
ns.push([b, s[1]]); });
segs = ns;
arwBox(P, 0.3, h - 2.4, G[1], inner || mat, x, 2.4, G[0]);
});
segs.forEach(function (s) { var d = s[1] - s[0]; if (d < 0.05)
return; arwBox(P, 0.3, h, d, mat, x, 0, (s[0] + s[1]) / 2, 0, true); });
},
function (P, x0, x1, z0, z1, mat, dx, dz) {
var H = ARW_HOUSE.h1 - 0.02, w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, wd = arwMat("oak");
arwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z0 + 0.17);
arwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z1 - 0.17);
[x0 + 0.17, x1 - 0.17].forEach(function (x) {
var segs = [[z0 + 0.16, z1 - 0.16]];
if (dx != null && Math.abs(x - dx) < 0.5) {
segs = [[z0 + 0.16, dz - 0.65], [dz + 0.65, z1 - 0.16]];
arwBox(P, 0.02, H - 2.4, 1.3, mat, x, 2.4, dz);
}
segs.forEach(function (sg) { var L = sg[1] - sg[0]; arwBox(P, 0.02, H, L, mat, x, 0, (sg[0] + sg[1]) / 2); arwBox(P, 0.04, 0.06, L, wd, x + (x < cx ? 0.02 : -0.02), 0.95, (sg[0] + sg[1]) / 2); arwBox(P, 0.04, 0.18, L, wd, x + (x < cx ? 0.02 : -0.02), 0, (sg[0] + sg[1]) / 2); });
});
[z0 + 0.19, z1 - 0.19].forEach(function (z) { arwBox(P, w - 0.34, 0.06, 0.04, wd, cx, 0.95, z); arwBox(P, w - 0.34, 0.18, 0.04, wd, cx, 0, z); });
},
function (g) { var mats = []; g.traverse(function (o) { if (o.material) {
var m = o.material.clone();
m.transparent = true;
m.opacity = 0.6;
m.depthWrite = false;
if (m.color)
m.color.lerp(new THREE.Color(0xE8ECF8), 0.4);
if (m.emissive)
m.emissive.setHex(0x2A2A3A);
o.material = m;
mats.push(m);
} }); g.userData.mats = mats; ARW.ghosts.push(g); return g; },
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("arw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("arw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (g, o) {
o = o || {};
var skin = null;
g.traverse(function (x) { if (!skin && x.material && /head/i.test(x.name || ""))
skin = x.material; });
var M = arwM("organ" + (o.skin || 0), function () { var m = new THREE.MeshPhongMaterial({ color: o.skin || 0xD8B8A0, shininess: 30, specular: 0x3A2A2A }); m.userData.noPhoto = 1; return m; });
var add = function (geo, x, y, z, sx, sy, sz, rx) { var m = new THREE.Mesh(geo, M); m.position.set(x, y, z); m.scale.set(sx || 1, sy || 1, sz || 1); if (rx)
m.rotation.x = rx; g.add(m); return m; };
if (o.breve !== false) {
add(arwGeo("breve", function () { return new THREE.SphereGeometry(0.026, 10, 8); }), 0, 1.705, 0.112, 1, 0.9, 0.7);
var hole = new THREE.Mesh(arwGeo("breveH", function () { return new THREE.CircleGeometry(0.008, 8); }), arwLam(0x2A0A0A));
hole.position.set(0, 1.705, 0.131);
g.add(hole);
}
if (o.poigns !== false)
[-1, 1].forEach(function (k) { add(arwGeo("poign", function () { return new THREE.SphereGeometry(0.02, 8, 6); }), k * 0.075, 1.53, 0.02, 0.8, 1, 0.9); });
if (o.eye3) {
var e = new THREE.Mesh(arwGeo("eye3", function () { return new THREE.SphereGeometry(0.016, 10, 8); }), arwShine(0xF4F0E8, 0.2, 0.05));
e.position.set(0, 1.73, 0.118);
g.add(e);
var pu = new THREE.Mesh(arwGeo("eye3p", function () { return new THREE.CircleGeometry(0.008, 10); }), arwLam(o.eyeCol || 0x2A1A3A));
pu.position.set(0, 1.73, 0.135);
g.add(pu);
}
if (o.magn) {
var arm = o.magn === "arm", len = arm ? 0.62 : 0.5, pts = arm ? [[0, 1.32, 0.13], [0.04, 1.22, 0.24], [0.08, 1.02, 0.28], [0.1, 0.86, 0.22]] : [[0, 1.3, 0.13], [0.05, 1.2, 0.22], [0.02, 1.06, 0.24], [-0.04, 0.96, 0.2], [-0.02, 0.9, 0.16]];
var t = new THREE.Mesh(arwTaper(pts, arm ? [0.045, 0.04, 0.034, 0.03] : [0.03, 0.024, 0.016, 0.008], 12, 7), M);
t.castShadow = false;
g.add(t);
t.userData.magn = 1;
if (arm) {
var h = add(arwGeo("magnhand", function () { var b = new THREE.BoxGeometry(0.07, 0.1, 0.03); return b; }), 0.1, 0.8, 0.22);
}
}
return g;
},
function (key, x, z, ry, o) {
var F = ARW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : arwGround(x, z, o.feet != null ? o.feet : 500);
var g = arwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
if (F.org)
arwOrgans(g, Object.assign({ skin: F.skin }, F.org === true ? {} : F.org));
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || ARW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
ARW.people.push(P);
if (!o.mute)
arwTalk(P, F.name, arwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, n, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [];
for (var i = 0; i < n; i++) {
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (o.ok && !o.ok(x, z)) {
continue;
}
var f = R() < (o.women != null ? o.women : 0.45);
var sk = o.skins ? o.skins[Math.floor(R() * o.skins.length)] : (o.skin || null);
var d = f ? (o.dressF || o.dress) : o.dress, g = arwDressed(seed + "c" + i, d, { sex: f ? "f" : "m", beard: !f && R() < (o.beardP == null ? 0.35 : o.beardP) ? (R() < 0.5 ? "full" : "mustache") : null, hair: o.hair ? o.hair(R) : null, skin: sk, child: o.childP && R() < o.childP });
if (o.org)
arwOrgans(g, { skin: sk || 0xD8B8A0, magn: o.magn ? (R() < 0.5 ? (typeof o.magn === "string" ? o.magn : "tentacle") : false) : false, eye3: o.eye3 });
var y = arwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
ARW.scG.add(g);
var P = { g: g, y: y, o: { wander: o.wander == null ? 10 : o.wander, sp: o.sp || 0.6 } };
ARW.people.push(P);
if (o.names && R() < (o.talkP == null ? 0.6 : o.talkP))
arwTalk(P, o.names[i % o.names.length], arwPersona(o.persona || "native"), (o.says || ["Good day to you."])[i % (o.says || [1]).length], 2.8);
out.push(P);
}
return out;
},
function (G, sc, i, W, D, H, o) {
o = o || {};
var A = arwInAt(sc, i), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
var wall = o.wall || arwMat("plaster"), inner = o.paper || null;
arwBox(g, W, 0.12, D, o.floor || arwMat("floor"), 0, -0.12, 0);
arwBox(g, W, 0.2, D, o.ceil || arwMat("ceiling"), 0, H, 0);
arwFloor(A.x, A.z, W, D, ARW_IN_Y);
var h0 = ARW_HOUSE.h1;
ARW_HOUSE.h1 = H;
try {
arwWallZ(g, -D / 2, -W / 2, W / 2, wall, inner, o.gapN || [], H);
arwWallZ(g, D / 2, -W / 2, W / 2, wall, inner, [[0, 1.6]], H);
arwWallX(g, -W / 2, -D / 2, D / 2, wall, inner, [], H);
arwWallX(g, W / 2, -D / 2, D / 2, wall, inner, [], H);
}
finally {
ARW_HOUSE.h1 = h0;
}
arwBox(g, 1.6, 2.5, 0.06, arwGlowM(o.day || 0xF4ECD8, 0.9), 0, 0, D / 2 + 0.2);
for (var k = 0; k < (W > 16 ? 4 : 2); k++) {
var lx = (k % 2 ? 1 : -1) * W * 0.3, lz = (k < 2 ? -1 : 1) * D * 0.25;
var c = arwCyl(g, 0.05, 0.05, 0.5, arwMat("brass"), lx, H - 0.5, lz, 6);
var b = new THREE.Mesh(arwGeo("rlamp", function () { return new THREE.SphereGeometry(0.16, 10, 8); }), arwGlowM(0xFFE8B8));
b.position.set(lx, H - 0.6, lz);
g.add(b);
}
arwRoom(sc, A.x - W / 2, A.x + W / 2, A.z - D / 2, A.z + D / 2, o.env || "indoor");
var out = o.out;
arwSpot(A.x, A.z + D / 2 - 0.8, 1.5, o.doorName || "The door", "go out", function () { var bk = ARW.back && ARW.back[sc + i]; if (bk)
out = bk; if (out)
arwGo({ sc: sc, x: out.x, z: out.z, ry: out.ry }, null, typeof arbPopulate === "function" ? arbPopulate : null); }, ARW_IN_Y);
g.userData.A = A;
g.userData.W = W;
g.userData.D = D;
g.userData.H = H;
return g;
},
function (G, sc, i, x, z, ry, name, W, D, o) {
o = o || {};
var A = arwInAt(sc, i), y = o.y != null ? o.y : arwLand(x, z);
var dg = new THREE.Group();
dg.position.set(x, y, z);
dg.rotation.y = ry || 0;
G.add(dg);
arwBox(dg, 1.7, 2.7, 0.14, o.frame || arwMat("ashlar"), 0, 0, 0);
arwBox(dg, 1.25, 2.35, 0.1, arwLam(o.col || 0x4A2E1A), 0, 0.04, 0.07);
arwBox(dg, 0.09, 0.09, 0.06, arwMat("brass"), 0.42, 1.1, 0.15);
arwBox(dg, 2.0, 0.16, 0.5, o.frame || arwMat("ashlar"), 0, -0.02, 0.35);
var fx = x + Math.sin(ry || 0) * 1.6, fz = z + Math.cos(ry || 0) * 1.6;
arwSpot(fx, fz, 1.7, name, "go in", function () { (ARW.back || (ARW.back = {}))[sc + i] = { x: fx, z: fz, ry: (ry || 0) + Math.PI }; ARW.lastBack = { sc: sc, x: fx, z: fz, ry: (ry || 0) + Math.PI }; arwGo({ sc: sc, x: A.x, z: A.z + D / 2 - 2.2, y: ARW_IN_Y, ry: 0 }, o.msg || ("🚪 <b>" + name.replace(/^The door of /, "") + "</b>"), typeof arbPopulate === "function" ? arbPopulate : null); }, y);
return { x: fx, z: fz, ry: (ry || 0) };
},
function (G, sc, i, x, z, ry, name, room, o) {
o = o || {};
var W = room.W || 12, D = room.D || 10, H = room.H || 4;
var dw = o.door != null ? o.door : 0, ca = Math.cos(ry || 0), sa = Math.sin(ry || 0), front = o.front != null ? o.front : (o.d || 10) / 2 + 0.08;
var dx = x + sa * front + ca * dw, dz = z + ca * front - sa * dw;
var d = arwDoorTo(G, sc, i, dx, dz, ry, name, W, D, o);
var g = arwRoomBuild(G, sc, i, W, D, H, Object.assign({}, room, { out: { x: d.x, z: d.z, ry: (ry || 0) + Math.PI }, doorName: "The door, out to " + (o.outName || "the street") }));
if (room.fill)
try {
room.fill(g, W, D, H, arwInAt(sc, i));
}
catch (e) {
if (window.console)
console.warn("[arcturus] room", name, e);
}
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = arwMat("oak");
arwBox(g, 1.6, 0.5, 2.1, wd, 0, 0, 0);
arwBox(g, 1.5, 0.22, 2.0, arwLam(0xF2EEE4), 0, 0.5, 0);
arwBox(g, 1.52, 0.08, 1.3, arwLam(col || 0x6A2A2A), 0, 0.72, 0.35);
arwBox(g, 1.2, 0.16, 0.4, arwLam(0xFAF8F2), 0, 0.72, -0.75);
arwBox(g, 1.7, 1.4, 0.1, wd, 0, 0, -1.05);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { arwBox(g, 0.08, 2.2, 0.08, wd, q[0] * 0.78, 0, q[1] * 1.02); });
arwBox(g, 1.7, 0.3, 2.2, arwLam(col || 0x6A2A2A), 0, 2.2, 0);
return g;
},
function (P, x, z, s, sky) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
s = s || 1;
var wd = arwMat("oak");
[0, 1, 2].forEach(function (i) { var a = i / 3 * 6.283; var l = arwBox(g, 0.05 * s, 0.8 * s, 0.05 * s, wd, Math.cos(a) * 0.32 * s, 0, Math.sin(a) * 0.32 * s); l.rotation.z = Math.cos(a) * 0.2; });
var t = arwCanvas(sky ? "gl:sky" : "gl:earth", 256, 128, function (c, W, H) {
c.fillStyle = sky ? "#1A2A5A" : "#C8B888";
c.fillRect(0, 0, W, H);
var R = wRand(sky ? 5 : 7);
if (sky) {
c.fillStyle = "#F0E0A0";
for (var i = 0; i < 160; i++) {
c.beginPath();
c.arc(R() * W, R() * H, 0.6 + R() * 1.6, 0, 7);
c.fill();
}
c.strokeStyle = "rgba(240,224,160,.5)";
c.lineWidth = 1;
for (i = 0; i < 9; i++) {
c.beginPath();
var x = R() * W, y = R() * H;
c.moveTo(x, y);
for (var j = 0; j < 4; j++) {
x += (R() - 0.5) * 40;
y += (R() - 0.5) * 30;
c.lineTo(x, y);
}
c.stroke();
}
}
else {
c.fillStyle = "#7A9A6A";
for (i = 0; i < 9; i++) {
c.beginPath();
var cx = R() * W, cy = 20 + R() * (H - 40);
for (var q = 0; q < 10; q++) {
var a = q / 10 * 6.283, r = 10 + R() * 24;
c.lineTo(cx + Math.cos(a) * r * 1.5, cy + Math.sin(a) * r);
}
c.fill();
}
c.strokeStyle = "rgba(90,60,30,.4)";
for (i = 0; i < 8; i++) {
c.beginPath();
c.moveTo(0, i * H / 8);
c.lineTo(W, i * H / 8);
c.stroke();
c.beginPath();
c.moveTo(i * W / 8, 0);
c.lineTo(i * W / 8, H);
c.stroke();
}
}
});
var b = new THREE.Mesh(arwGeo("globe", function () { return new THREE.SphereGeometry(0.36, 24, 16); }), arwLam(0xFFFFFF, { map: t, mapk: sky ? "gl:sky" : "gl:earth" }));
b.scale.setScalar(s);
b.position.y = 1.05 * s;
b.rotation.z = 0.4;
g.add(b);
var m = new THREE.Mesh(arwGeo("gmer", function () { return new THREE.TorusGeometry(0.4, 0.015, 6, 32); }), arwMat("brass"));
m.scale.setScalar(s);
m.position.y = 1.05 * s;
g.add(m);
return g;
},
function (P, x, z, ry, len, y) {
var g = new THREE.Group();
g.position.set(x, y || 0, z);
g.rotation.y = ry || 0;
P.add(g);
len = len || 3;
[-1, 1].forEach(function (k) { var l = arwBox(g, 0.06, 1.3, 0.06, arwMat("oak"), k * 0.4, 0, 0); l.rotation.z = k * 0.25; });
arwBox(g, 0.06, 1.3, 0.06, arwMat("oak"), 0, 0, -0.45).rotation.x = -0.3;
var t = new THREE.Mesh(arwGeo("tscope" + len, function () { var c = new THREE.CylinderGeometry(0.07, 0.13, len, 12); c.rotateX(Math.PI / 2); return c; }), arwMat("brass"));
t.position.set(0, 1.35, 0);
t.rotation.x = -0.6;
g.add(t);
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
arwBox(g, 0.5, 1.0, 0.5, arwMat("oak"), 0, 0, 0);
var q = new THREE.Mesh(arwGeo("quad", function () { return new THREE.RingGeometry(0.55, 0.7, 16, 1, 0, Math.PI / 2); }), arwM("quadm", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE0B050, shininess: 80, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
q.position.set(-0.3, 1.05, 0);
g.add(q);
arwBox(g, 0.04, 0.7, 0.04, arwMat("brass"), -0.3, 1.0, 0).rotation.z = -0.7;
return g;
},
function (g, W, D, kind, seed) {
var R = wRand(seed || 7);
if (kind === "home") {
arwRug(g, 0, 0, W * 0.5, D * 0.45, [0x6A2A2A, 0x2A3A6A, 0x5A4A2A][Math.floor(R() * 3)]);
var t = arwTable(g, 0, -0.4, 1.8, 1.0, 0.78, arwMat("oak"));
[-1, 1].forEach(function (k) { arwChair(g, k * 1.2, -0.4, k * Math.PI / 2, arwMat("velvet")); });
arwBed(g, W / 2 - 1.3, -D / 2 + 1.4, 0);
arwChest(g, -W / 2 + 1.0, -D / 2 + 0.6, 0);
arwShelves(g, -W / 2 + 0.3, 1.0, 2.2, 2.2, Math.PI / 2);
}
else if (kind === "poor") {
arwTable(g, 0, 0, 1.4, 0.8, 0.74, arwMat("planks"));
arwChair(g, 0.9, 0, Math.PI / 2, arwMat("planks"));
arwBox(g, 1.8, 0.35, 0.9, arwMat("planks"), W / 2 - 1.2, 0, -D / 2 + 0.8);
arwBox(g, 1.7, 0.1, 0.8, arwLam(0x8A7A60), W / 2 - 1.2, 0.35, -D / 2 + 0.8);
arwChest(g, -W / 2 + 0.8, -D / 2 + 0.6, 0);
arwFire(g, -W / 2 + 1.0, 0, D / 2 - 1.4, 0.6);
}
else if (kind === "shop") {
arwBox(g, W * 0.7, 0.95, 0.7, arwMat("oak"), 0, 0, -D / 2 + 1.6);
arwShelves(g, 0, -D / 2 + 0.3, W * 0.8, 2.6, 0);
arwChair(g, W / 2 - 1, 0.5, -Math.PI / 2, arwMat("oak"));
}
else if (kind === "east") {
arwBox(g, W * 0.8, 0.06, D * 0.7, arwLam(0xC8B888), 0, 0, 0);
for (var i = 0; i < 4; i++)
arwBox(g, 0.9, 0.12, 0.9, arwLam([0x8A2A2A, 0x2A4A6A, 0x6A5A2A, 0x3A5A3A][i]), -1.5 + i, 0.06, -0.8);
arwBox(g, 1.2, 0.35, 0.8, arwLam(0x2A1A10), 0, 0, 0.2);
arwBox(g, 0.5, 1.4, 0.04, arwLam(0xF0E8D8), -W / 2 + 1.2, 0, -D / 2 + 0.3);
}
},
function (k) {
switch (k) {
case "scarlet": return arwS("sand", 0xFFFFFF, 5, { vc: 1 });
case "mould": return arwS("earth", 0xFFFFFF, 5, { vc: 1 });
case "blackrock": return arwS("b:strata", 0x3A3438, 7);
case "darkrock": return arwS("b:cave", 0x4A4248, 5);
case "redrock": return arwS("b:strata", 0x9A3A2A, 7);
case "whitesand": return arwS("sand", 0xFFFFFF, 5, { vc: 1 });
case "greensnow": return arwS("snow", 0xC8F0D0, 4);
case "glassbark": return arwM("glassbark", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8E8F0, shininess: 110, specular: 0xFFFFFF, transparent: true, opacity: 0.72 }); m.userData.noPhoto = 1; return m; });
case "crystal": return arwM("crystalleaf", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8F4FF, emissive: 0x1A2A34, shininess: 140, specular: 0xFFFFFF, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "blackbark": return arwS("bark", 0x1E1A1E, 2.5);
case "purplebark": return arwS("bark", 0x6A3A6A, 2.5);
case "purpleleaf": return arwM("pleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8A3A9A, map: arwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
case "jale": return arwM("jaleM", function () { var m = new THREE.MeshPhongMaterial({ color: 0xB86AC8, emissive: 0x3A1A4A, shininess: 60, specular: 0x8AE0C8 }); m.userData.noPhoto = 1; m.userData.shimmer = [0xB86AC8, 0x6AC8B0]; return m; });
case "ulfire": return arwM("ulfireM", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD84A6A, emissive: 0x3A0A2A, shininess: 60, specular: 0x8A9AFF }); m.userData.noPhoto = 1; m.userData.shimmer = [0xD84A6A, 0x6A5AE8]; return m; });
case "gnawl": return arwWaterM(0x2A5A3A, 0.9);
case "lake": return arwWaterM(0x3A4A5A, 0.86);
case "sea": return arwWaterM(0x2A4A6A, 0.88);
}
return arwMat(k);
},
function (kind) {
return function (x, z, y, c) {
var n = arwFbm(x * 0.02, z * 0.02, 3), m = arwFbm(x * 0.004 + 7, z * 0.004, 2);
if (kind === "scarlet") {
c.setRGB(0.86 + n * 0.14, 0.22 + n * 0.14 + m * 0.08, 0.16 + n * 0.08);
return;
}
if (kind === "mould") {
c.setRGB(0.38 + n * 0.12, 0.24 + n * 0.08, 0.36 + n * 0.12);
return;
}
if (kind === "ifdawn") {
var r = y > 30 ? 0.7 : 1;
c.setRGB((0.62 + n * 0.2) * r, (0.32 + n * 0.12) * r, (0.28 + n * 0.1) * r);
return;
}
if (kind === "white") {
c.setRGB(0.94 + n * 0.06, 0.92 + n * 0.06, 0.88 + n * 0.08);
return;
}
if (kind === "grey") {
c.setRGB(0.5 + n * 0.12, 0.48 + n * 0.12, 0.5 + n * 0.14);
return;
}
if (kind === "green") {
c.setRGB(0.42 + n * 0.14, 0.56 + n * 0.16, 0.4 + n * 0.12);
return;
}
c.setRGB(0.7 + n * 0.2, 0.5 + n * 0.15, 0.4 + n * 0.1);
};
},
function (G, o) {
o = o || {};
var g = new THREE.Group();
g.userData.live = 1;
G.add(g);
ARW.sky = g;
var disc = function (col, r, glowCol, glowR, x, y, z) {
var s = new THREE.Group();
s.position.set(x, y, z);
g.add(s);
var d = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), new THREE.MeshBasicMaterial({ color: col, fog: false }));
s.add(d);
var gl = new THREE.Mesh(new THREE.SphereGeometry(glowR, 24, 16), new THREE.MeshBasicMaterial({ color: glowCol, fog: false, transparent: true, opacity: 0.22, depthWrite: false }));
s.add(gl);
var gl2 = new THREE.Mesh(new THREE.SphereGeometry(glowR * 1.9, 24, 16), new THREE.MeshBasicMaterial({ color: glowCol, fog: false, transparent: true, opacity: 0.08, depthWrite: false }));
s.add(gl2);
return s;
};
if (o.branch !== false) {
var b = o.branch || [600, 1500, -1700];
ARW.branch = disc(0xFFFFFF, 95, 0xFFF8F0, 150, b[0], b[1], b[2]);
}
if (o.alp) {
var a = o.alp;
ARW.alp = disc(0xA8C8FF, 70, 0x4A8AFF, 120, a[0], a[1], a[2]);
}
if (o.moon) {
var m = o.moon;
ARW.moon = disc(0xE8E4D8, 60, 0xC8D0E8, 80, m[0], m[1], m[2]);
}
return g;
},
function (P, kind, list, o) {
o = o || {};
if (!list || !list.length)
return;
var lite = arwLite();
if (lite && list.length > 50 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "crystree": {
arwInst(P, arwGeo("ctrk", function () {
var parts = [], R = wRand(41);
var t = new THREE.CylinderGeometry(0.28, 0.45, 7, 7);
t.translate(0, 3.5, 0);
parts.push(t.toNonIndexed());
for (var i = 0; i < 4; i++) {
var b = new THREE.CylinderGeometry(0.08, 0.16, 3.2, 5);
b.translate(0, 1.6, 0);
b.rotateZ(0.7 + R() * 0.3);
b.rotateY(i / 4 * 6.283 + R());
b.translate(0, 4.6 + R() * 1.6, 0);
parts.push(b.toNonIndexed());
}
return gwMerge(parts);
}), arwTMat("glassbark"), list, { shadow: false });
arwInst(P, arwGeo("ccrn", function () { var parts = [], R = wRand(43); for (var i = 0; i < (lite ? 5 : 9); i++) {
var c = new THREE.OctahedronGeometry(1.4 + R() * 1.1, 0);
c.scale(1, 1.5, 1);
c.translate((R() - 0.5) * 5, 7 + R() * 3.4, (R() - 0.5) * 5);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), arwTMat("crystal"), list, {});
break;
}
case "blacktree": {
arwInst(P, arwGeo("btrk", function () {
var parts = [], R = wRand(47);
var t = new THREE.CylinderGeometry(0.5, 0.9, 16, 9);
t.translate(0, 8, 0);
parts.push(t.toNonIndexed());
for (var i = 0; i < 7; i++) {
var b = new THREE.CylinderGeometry(0.1, 0.24, 6, 6);
b.translate(0, 3, 0);
b.rotateZ(0.5 + R() * 0.5);
b.rotateY(i / 7 * 6.283);
b.translate(0, 10 + R() * 5, 0);
parts.push(b.toNonIndexed());
}
return gwMerge(parts);
}), arwTMat("blackbark"), list, { shadow: !lite });
arwInst(P, arwGeo("bcrn", function () { var parts = [], R = wRand(49); for (var i = 0; i < (lite ? 8 : 16); i++) {
var c = new THREE.OctahedronGeometry(1.6 + R() * 1.4, 0);
c.scale(1, 1.4, 1);
c.translate((R() - 0.5) * 11, 15 + R() * 6, (R() - 0.5) * 11);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), arwTMat("crystal"), list, {});
break;
}
case "purpletree": {
arwInst(P, arwGeo("ptrk", function () { var parts = []; var t = arwTaper([[0, 0, 0], [0.3, 1.5, 0.1], [-0.2, 3, 0.3], [0.4, 4.2, -0.1]], [0.32, 0.24, 0.18, 0.1], 10, 6); parts.push(t.index ? t.toNonIndexed() : t); return gwMerge(parts); }), arwTMat("purplebark"), list, { shadow: !lite });
arwInst(P, arwGeo("pcrn", function () { var parts = [], R = wRand(53); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(1.1 + R() * 0.9, 1);
c.scale(1.2, 0.7 + R() * 0.5, 1);
c.translate((R() - 0.5) * 3.2, 3.6 + R() * 1.8, (R() - 0.5) * 3.2);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), arwTMat("purpleleaf"), list, {});
break;
}
case "wombtree": {
arwInst(P, arwGeo("wtrk", function () { var g = new THREE.CylinderGeometry(2.2, 3.6, 70, 12, 4); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
pa.setX(i, pa.getX(i) * (1 + Math.sin(y * 0.3) * 0.04));
} g.translate(0, 35, 0); return g; }), arwS("bark", o.col || 0x5A3A3A, 4), list, { shadow: !lite });
arwInst(P, arwGeo("wcrn", function () { var parts = [], R = wRand(59); for (var i = 0; i < (lite ? 5 : 9); i++) {
var c = new THREE.IcosahedronGeometry(6 + R() * 4, 1);
c.scale(1.4, 0.6, 1.4);
c.translate((R() - 0.5) * 16, 62 + R() * 10, (R() - 0.5) * 16);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), arwM("wleaf" + (o.leaf || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.leaf || 0x3A5A3A, map: arwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "pgrass":
arwInst(P, arwGeo("tuft", function () { return arwCards(2, 1.6, 0.7, 0); }), arwLam(o.col || 0xB86AD8, { ds: 1, map: arwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
case "preeds":
arwInst(P, arwGeo("reedreeds", function () { return arwCards(3, 1.8, 2.2, 0); }), arwLam(0xC88AE0, { ds: 1, map: arwReedTex("reeds"), mapk: "reedreeds", cut: 0.45 }), list, {});
break;
case "jalebush": {
arwInst(P, arwGeo("jbush", function () { var parts = [], R = wRand(61); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.7 + R() * 0.4, 1);
c.translate((R() - 0.5) * 1.4, 0.6 + R() * 0.4, (R() - 0.5) * 1.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), arwTMat("crystal"), list, {});
arwInst(P, arwGeo("jblos", function () { var parts = [], R = wRand(67); for (var i = 0; i < 10; i++) {
var c = new THREE.SphereGeometry(0.12, 6, 4);
c.translate((R() - 0.5) * 1.8, 0.5 + R() * 1.2, (R() - 0.5) * 1.8);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), arwTMat(o.ulfire ? "ulfire" : "jale"), list, {});
break;
}
case "bluefruit":
arwInst(P, arwGeo("bfruit", function () { var g = new THREE.SphereGeometry(0.11, 10, 8); g.scale(1, 1.35, 1); g.translate(0, 0.11, 0); return g; }), arwShine(0x3A6AE8, 0.35, 0.1), list, {});
break;
case "spire": {
arwInst(P, arwGeo("spire", function () { var g = new THREE.ConeGeometry(4, 30, 7, 6); var pa = g.attributes.position, R = wRand(71); for (var i = 0; i < pa.count; i++) {
pa.setX(i, pa.getX(i) * (0.8 + R() * 0.4));
pa.setZ(i, pa.getZ(i) * (0.8 + R() * 0.4));
} g.translate(0, 15, 0); g.computeVertexNormals(); return g; }), o.mat || arwTMat("blackrock"), list, {});
break;
}
default: arwPlant(P, kind, list, o);
}
},
function (P, n, x0, z0, x1, z1, hfn, seed) {
var R = wRand(seed || 73);
for (var i = 0; i < n; i++) {
var g = new THREE.Group(), x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), y = (hfn ? hfn(x, z) : 0) + 2 + R() * 6;
g.position.set(x, y, z);
P.add(g);
var b = new THREE.Mesh(arwGeo("airball", function () { return new THREE.IcosahedronGeometry(0.45, 2); }), arwLam(0xF8F0FF, { op: 0.55 }));
g.add(b);
var c = new THREE.Mesh(arwGeo("airroot", function () { var c = new THREE.CylinderGeometry(0.01, 0.02, 0.5, 4); c.translate(0, -0.6, 0); return c; }), arwLam(0xC8A8D8));
g.add(c);
g.userData.y0 = y;
g.userData.ph = R() * 6;
g.userData.dr = [(R() - 0.5) * 0.6, (R() - 0.5) * 0.6];
g.userData.home = [x, z];
g.userData.kind = "air";
ARW.bob.push(g);
}
},
function (P, n, x0, z0, x1, z1, hfn, seed) {
var R = wRand(seed || 79);
for (var i = 0; i < n; i++) {
var g = new THREE.Group(), x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), y = (hfn ? hfn(x, z) : 0) + 3 + R() * 5;
g.position.set(x, y, z);
P.add(g);
var b = new THREE.Mesh(arwGeo("jelly", function () { return new THREE.SphereGeometry(0.35, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55); }), arwLam(0x8AB8F0, { op: 0.5, e: 0x2A4A8A }));
g.add(b);
for (var k = 0; k < 4; k++) {
var t = new THREE.Mesh(arwGeo("jtent", function () { var c = new THREE.CylinderGeometry(0.01, 0.02, 0.7, 4); c.translate(0, -0.35, 0); return c; }), arwLam(0x8AB8F0, { op: 0.45 }));
t.position.set(Math.cos(k * 1.6) * 0.18, 0, Math.sin(k * 1.6) * 0.18);
g.add(t);
}
g.userData.y0 = y;
g.userData.ph = R() * 6;
g.userData.dr = [(R() - 0.5) * 0.4, (R() - 0.5) * 0.4];
g.userData.home = [x, z];
g.userData.kind = "air";
ARW.bob.push(g);
}
},
function (P, x, z, hfn) {
var g = new THREE.Group();
g.position.set(x, hfn ? hfn(x, z) : 0, z);
P.add(g);
var list = [];
for (var i = 0; i < 26; i++) {
var a = i * 2.39, r = Math.sqrt(i / 26) * 0.8;
list.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, y: 0, s: 0.6 + (i % 3) * 0.1, ry: i });
}
arwTPlant(g, "pgrass", list, { keepAll: 1 });
g.userData.kind = "walk";
g.userData.home = [x, z];
g.userData.ph = x * 0.1;
g.userData.hfn = hfn;
ARW.bob.push(g);
return g;
},
function (P, x, z, hfn) {
var g = new THREE.Group();
g.position.set(x, hfn ? hfn(x, z) : 0, z);
P.add(g);
var body = new THREE.Group();
body.position.y = 0.55;
g.add(body);
arwEll(body, arwTMat("ulfire"), 0.32, 0.26, 0.36, 0, 0, 0, 12);
arwEll(body, arwTMat("jale"), 0.12, 0.12, 0.12, 0, 0.2, 0.3, 8);
for (var k = 0; k < 3; k++) {
var l = new THREE.Mesh(arwGeo("wleg", function () { var c = new THREE.CylinderGeometry(0.035, 0.05, 0.6, 6); c.translate(0, -0.3, 0); return c; }), arwLam([0xE8C040, 0x40A8E8, 0xE84A8A][k]));
l.position.set(Math.cos(k * 2.094) * 0.18, 0, Math.sin(k * 2.094) * 0.18);
l.rotation.z = Math.cos(k * 2.094) * 0.3;
l.rotation.x = -Math.sin(k * 2.094) * 0.3;
body.add(l);
}
g.userData.kind = "waltz";
g.userData.home = [x, z];
g.userData.ph = z * 0.1;
g.userData.hfn = hfn;
ARW.bob.push(g);
return g;
},
function (P, x, z, ry, hfn) {
var g = new THREE.Group();
g.position.set(x, hfn ? hfn(x, z) : 0, z);
g.rotation.y = ry || 0;
P.add(g);
var sk = arwSkinM("leather", 0x6A5A6A);
arwEll(g, sk, 0.6, 0.55, 1.4, 0, 1.5, 0, 14);
var nk = new THREE.Mesh(arwTaper([[0, 1.7, 1.1], [0, 2.3, 1.6], [0, 2.6, 1.9]], [0.28, 0.2, 0.16], 8, 8), sk);
g.add(nk);
arwEll(g, sk, 0.22, 0.2, 0.4, 0, 2.6, 2.1, 10);
arwEye(g, 0.12, 2.7, 2.2, 0.04, 0x8AE0FF);
arwEye(g, -0.12, 2.7, 2.2, 0.04, 0x8AE0FF);
[[0.4, 0.8], [-0.4, 0.8], [0.4, -0.8], [-0.4, -0.8]].forEach(function (q) { arwLeg(g, sk, q[0], 1.3, q[1], 1.3, 0.14, { knee: 0.5 }); });
var tl = new THREE.Mesh(arwTaper([[0, 1.5, -1.3], [0, 1.2, -2], [0, 0.8, -2.4]], [0.16, 0.1, 0.04], 8, 6), sk);
g.add(tl);
g.userData.live = 1;
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : arwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var r = o.r || 4;
var wall = o.wall || arwS("b:stucco", o.col || 0xB89888, 3), roof = o.roof || arwS("b:moss", o.roofCol || 0x8A5A8A, 3);
var body = new THREE.Mesh(arwGeo("thut" + r, function () { var g = new THREE.CylinderGeometry(r, r * 1.1, 3.2, 18, 1); g.translate(0, 1.6, 0); return g; }), wall);
g.add(body);
var dome = new THREE.Mesh(arwGeo("thdome" + r, function () { var g = new THREE.SphereGeometry(r * 1.08, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.5); g.scale(1, 0.7, 1); g.translate(0, 3.1, 0); return g; }), roof);
g.add(dome);
var win = arwTMat("crystal");
[1.2, -1.2, Math.PI].forEach(function (a) { var w = new THREE.Mesh(arwGeo("thwin", function () { return new THREE.CircleGeometry(0.5, 12); }), win); w.position.set(Math.sin(a) * (r + 0.02), 1.9, Math.cos(a) * (r + 0.02)); w.rotation.y = a; g.add(w); });
arwBox(g, 1.6, 2.4, 0.4, arwLam(0x2A1A20), 0, 0, r - 0.1);
arwBox(g, 2.0, 0.25, 0.6, arwTMat("blackrock"), 0, 2.4, r);
arwRound(x, z, r + 0.3, y - 1, y + 6);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : arwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var rk = o.mat || arwTMat("blackrock");
var m = new THREE.Mesh(arwGeo("cmouth", function () { var g = new THREE.TorusGeometry(2.2, 1.1, 8, 16, Math.PI); return g; }), rk);
m.position.y = 0;
g.add(m);
var dark = new THREE.Mesh(arwGeo("cdark", function () { return new THREE.CircleGeometry(2.0, 16, 0, Math.PI); }), arwLam(0x060408));
dark.position.set(0, 0.02, -0.2);
g.add(dark);
[-1, 1].forEach(function (k) { var r = new THREE.Mesh(arwGeo("crock", function () { var g = new THREE.DodecahedronGeometry(2.4, 1); g.scale(1, 1.4, 1); return g; }), rk); r.position.set(k * 3.6, 1.2, -0.6); g.add(r); arwRound(x + Math.cos(ry || 0) * k * 3.6, z - Math.sin(ry || 0) * k * 3.6, 2.2, y - 1, y + 5); });
return g;
},
function (g, W, D, kind, seed) {
var R = wRand(seed || 5), rk = arwTMat("darkrock");
arwBox(g, 2.2, 0.4, 1.2, rk, -W / 2 + 1.4, 0, -D / 2 + 1);
arwBox(g, 2.0, 0.08, 1.0, arwLam(kind === "ifdawn" ? 0x7A5A3A : 0xC8D8C0), -W / 2 + 1.4, 0.4, -D / 2 + 1);
arwBox(g, 1.8, 0.45, 0.6, rk, W / 2 - 1.2, 0, 0);
for (var i = 0; i < 3; i++) {
var s = new THREE.Mesh(arwGeo("shell", function () { var s = new THREE.SphereGeometry(0.16, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.5); s.rotateX(Math.PI); return s; }), arwShine(0xF0E0D8, 0.3, 0.1));
s.position.set(W / 2 - 1.6 + i * 0.4, 0.62, 0);
g.add(s);
}
for (i = 0; i < (W > 10 ? 4 : 2); i++) {
var gl = new THREE.Mesh(arwGeo("phos", function () { return new THREE.SphereGeometry(0.22, 10, 8); }), arwGlowM(0x9AF0C0, 0.85));
gl.position.set((i % 2 ? 1 : -1) * W * 0.3, 2.6, (i < 2 ? -1 : 1) * D * 0.25);
g.add(gl);
}
if (kind === "fruit")
for (i = 0; i < 9; i++) {
var f = new THREE.Mesh(arwGeo("bfruit", function () { var g = new THREE.SphereGeometry(0.11, 10, 8); g.scale(1, 1.35, 1); g.translate(0, 0.11, 0); return g; }), arwShine(0x3A6AE8, 0.35, 0.1));
f.position.set(-0.6 + R() * 1.2, 0.45, -D / 2 + 0.8 + R() * 0.6);
g.add(f);
}
arwRug(g, 0, 0.5, W * 0.45, D * 0.35, [0x5A2A4A, 0x2A4A4A, 0x6A4A2A][Math.floor(R() * 3)]);
},
function (G) {
var lite = arwLite(), H = arwHampH, R = wRand(1901);
arwTerrain(G, -340, -340, 680, 680, lite ? 14 : 8, H, arwMat("grass"), function (x, z, y, c) { var n = arwFbm(x * 0.03, z * 0.03, 3); c.setRGB(0.28 + n * 0.1, 0.36 + n * 0.1, 0.24 + n * 0.08); });
var road = [];
for (var x = -330; x <= 330; x += 4)
road.push([x, 10]);
arwStrip(G, road, 9, H, arwMat("road"), 0.3);
[[4.5 + 1.6], [15.5 - 1.6]].forEach(function (q) { var pv = []; for (var x = -330; x <= 330; x += 4)
pv.push([x, q[0]]); arwStrip(G, pv, 3, H, arwMat("paving"), 0.42); });
for (x = -320; x <= 320; x += 24) {
[3.2, 16.8].forEach(function (z, k) {
var lx = x + (k ? 12 : 0);
var lg = new THREE.Group();
lg.position.set(lx, H(lx, z), z);
G.add(lg);
arwCyl(lg, 0.07, 0.1, 3.8, arwMat("iron"), 0, 0, 0, 8);
arwBox(lg, 0.5, 0.06, 0.06, arwMat("iron"), 0, 3.4, 0);
var gl = new THREE.Mesh(arwGeo("gaslamp", function () { var c = new THREE.CylinderGeometry(0.22, 0.14, 0.5, 4); return c; }), arwGlowM(0xFFD890, 0.92));
gl.position.y = 4.05;
lg.add(gl);
arwBox(lg, 0.5, 0.08, 0.5, arwMat("iron"), 0, 4.3, 0);
arwRound(lx, z, 0.2);
});
}
if (!lite) {
var L = new THREE.PointLight(0xFFD08A, 0.9, 30);
L.position.set(0, H(0, 3) + 4, 3.2);
G.add(L);
var L2 = new THREE.PointLight(0xFFD08A, 0.7, 26);
L2.position.set(-60, H(-60, 3) + 4, 3.2);
G.add(L2);
}
(function () {
var x = 0, z = -40, y = H(x, z);
arwHouse(G, x, z, 22, 14, 10.5, { y: y, col: 0xA86A50, wall: arwS("brick", 0xB87A5E, 1.6), roof: arwMat("slate"), shut: 0x1A2A1A, noDoor: true });
arwBox(G, 3.4, 3.2, 1.2, arwMat("ashlar"), 0, y, -32.4);
arwBox(G, 4, 0.3, 1.8, arwMat("ashlar"), 0, y + 3.2, -32.2);
[-1, 1].forEach(function (k) { arwCyl(G, 0.2, 0.2, 3.2, arwMat("white"), k * 1.5, y, -31.6, 10); });
arwSign(G, "PROLANDS", 3.2, 0.5, 4.5, y + 1.6, -4.8, 0, { bg: "#1A1A1A", ink: "#E8D8A0" });
for (var i = 0; i < 6; i++)
for (var f = 0; f < 2; f++) {
var w = new THREE.Mesh(arwGeo("hwin", function () { return new THREE.PlaneGeometry(1.0, 1.9); }), arwGlowM(0xFFD898, 0.85));
w.position.set(-9 + i * 3.6, y + 1.3 + f * 4.2, -32.92);
G.add(w);
}
[[-30, -3.5], [3.5, 30]].forEach(function (q) { arwBox(G, q[1] - q[0], 1.6, 0.4, arwS("brick", 0xA86A50, 1.6), (q[0] + q[1]) / 2, H((q[0] + q[1]) / 2, -5), -5, 0, true); });
[-1, 1].forEach(function (k) { arwBox(G, 0.7, 2.2, 0.7, arwMat("ashlar"), k * 3.5, H(k * 3.5, -5), -5, 0, true); });
arwStrip(G, [[0, -5], [0, -31]], 2.4, H, arwMat("gravel"), 0.1);
arwPlant(G, "bush", arwScatter(1902, lite ? 10 : 24, -28, -30, 28, -8, function (x, z) { return Math.abs(x) > 3; }, H, 0.9, 1.4), { col: 0x2A4A2A, keepAll: 1 });
[[-30, -5, -30, -33], [30, -5, 30, -33]].forEach(function (q) { arwBox(G, 0.4, 1.6, 28, arwS("brick", 0xA86A50, 1.6), q[0], H(q[0], -19), -19, 0, true); });
})();
arwDoorTo(G, "hampstead", 0, 0, -32.9, 0, "The front door of Prolands", 14, 10, { col: 0x1A1A20, frame: arwMat("white") });
var hs = [];
for (var i = 0; i < 10; i++) {
var hx = -300 + i * 60;
if (Math.abs(hx) < 40)
continue;
hs.push([hx, -34, 0]);
}
for (i = 0; i < 11; i++) {
hs.push([-300 + i * 60, 54, Math.PI]);
}
hs.forEach(function (q, k) {
var col = [0xB87A5E, 0xC8B898, 0xA8705A, 0xD8D0C0, 0x9A6A50][k % 5], y = H(q[0], q[1]);
arwHouse(G, q[0], q[1], 16, 12, 9, { y: y, ry: q[2], wall: arwS("brick", col, 1.6), roof: arwMat("slate"), shut: 0x1A2A1A, noDoor: true });
var fz = q[1] + (q[2] ? -1 : 1) * 6.1;
arwDoorTo(G, "hampstead", 3 + (k % 3), q[0], fz, q[2], "The door of a house in the street", 12, 10, { col: [0x2A1A1A, 0x1A2A3A, 0x1E2E1E][k % 3], frame: arwMat("white") });
for (var w = 0; w < 4; w++)
if (R() < 0.7) {
var wm = new THREE.Mesh(arwGeo("hwin", function () { return new THREE.PlaneGeometry(1.0, 1.9); }), arwGlowM(0xFFD898, 0.7 + R() * 0.2));
wm.position.set(q[0] - 5.4 + w * 3.6, y + 1.4 + (w % 2) * 3.6, q[1] + (q[2] ? -1 : 1) * 6.07);
wm.rotation.y = q[2];
G.add(wm);
}
});
var trees = [];
for (x = -310; x <= 310; x += 30) {
if (Math.abs(x) < 12)
continue;
trees.push({ x: x + 7, z: 1.6, y: H(x + 7, 1.6), s: 1.1, ry: x });
trees.push({ x: x - 7, z: 18.6, y: H(x - 7, 18.6), s: 1.0, ry: x });
}
arwPlant(G, "tree", trees, { col: 0x3A4A2A, keepAll: 1 });
trees.forEach(function (t) { arwRound(t.x, t.z, 0.6); });
arwPlant(G, "tree", arwScatter(1903, lite ? 40 : 110, -330, -330, 330, -110, null, H, 0.9, 1.5), { col: 0x2A3A24 });
var far = new THREE.Mesh(new THREE.RingGeometry(360, 4000, 48, 1), arwLam(0x0E1218));
far.rotation.x = -Math.PI / 2;
far.position.y = -6;
G.add(far);
var lt = [];
for (i = 0; i < (lite ? 120 : 300); i++) {
var a = R() * Math.PI * 2, r = 600 + R() * 1800;
lt.push({ x: Math.cos(a) * r, z: Math.sin(a) * r + 400, y: -4, s: 1 });
}
arwInst(G, arwGeo("farlt", function () { return new THREE.SphereGeometry(1.4, 6, 4); }), arwGlowM(0xFFD080, 0.7), lt, { cull: false });
var arc = new THREE.Mesh(new THREE.SphereGeometry(5, 12, 8), new THREE.MeshBasicMaterial({ color: 0xFFC870, fog: false }));
arc.position.set(900, 500, 1100);
G.add(arc);
ARW.arcStar = arc;
var ag = new THREE.Mesh(new THREE.SphereGeometry(14, 12, 8), new THREE.MeshBasicMaterial({ color: 0xFFB050, fog: false, transparent: true, opacity: 0.2, depthWrite: false }));
ag.position.copy(arc.position);
G.add(ag);
(function () {
var c = new THREE.Group(), x = 40, z = 12, y = H(x, z);
c.position.set(x, y, z);
c.rotation.y = Math.PI / 2;
G.add(c);
var bl = arwLam(0x101014);
arwBox(c, 1.5, 1.6, 1.4, bl, 0, 0.9, 0);
arwBox(c, 1.6, 0.1, 1.5, bl, 0, 2.5, 0);
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(arwGeo("hwheel", function () { return new THREE.TorusGeometry(0.85, 0.05, 6, 24); }), arwLam(0x2A1A10)); w.position.set(k * 0.85, 0.85, 0); w.rotation.y = Math.PI / 2; c.add(w); });
arwBox(c, 0.08, 0.08, 3, arwLam(0x2A1A10), 0.5, 0.9, 2.2);
arwBox(c, 0.08, 0.08, 3, arwLam(0x2A1A10), -0.5, 0.9, 2.2);
arwSolid(x, z, 2, 4, y - 1, y + 3, 0);
if (typeof wHorse === "function")
try {
var hz = wHorse("arwcab", { col: 0x3A2A1E });
hz.position.set(x + 3.4, y, z);
hz.rotation.y = Math.PI / 2;
G.add(hz);
}
catch (e) { }
})();
arwCrowd("hstreet", lite ? 6 : 14, -300, 4, 300, 17, { dress: "arcoat", dressF: "argown", women: 0.4, wander: 24, sp: 0.7, names: ["A gentleman walking home", "A lady in furs", "A cabman", "A policeman on his beat", "A neighbour"], persona: "guest",
says: ["Cold, isn't it? Clear, though. You can see every star.", "Faull's giving one of his evenings, I hear. Spirits, this time.", "Cab, sir? Hampstead to anywhere, a fair price.", "Evening, sir. All quiet. Mind the frost on the kerb.", "There's a medium in that house tonight, they say. A real one."] });
arwHampRooms(G);
},
function (G) {
var dk = arwMat("oak");
arwRoomBuild(G, "hampstead", 0, 14, 10, 4, { paper: arwMat("greenpaper"), floor: arwMat("floor"), out: { x: 0, z: -30, ry: Math.PI }, doorName: "The front door, out to the street", env: "gas" });
(function () {
var A = arwInAt("hampstead", 0), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwShelves(g, -6.6, 0, 4, 3.4, Math.PI / 2);
arwShelves(g, 6.6, -1, 4, 3.4, -Math.PI / 2);
arwShelves(g, 0, -4.75, 8, 3.4, 0);
arwTable(g, 0, -2, 2.4, 1.2, 0.78, dk);
arwChair(g, -1.5, 0.6, Math.PI * 0.8, arwMat("leather"), true);
arwChair(g, 1.5, 0.6, -Math.PI * 0.8, arwMat("leather"), true);
arwRug(g, 0, 0, 7, 5, 0x5A1E1E);
arwFire(g, -6.2, 0, 3, 0.7);
arwSpot(A.x + 4.5, A.z + 1, 1.6, "The stairs up to the lounge hall", "go up", function () { arwGo({ sc: "hampstead", x: ARW_AT.lounge.x, z: ARW_AT.lounge.z + 3, y: ARW_IN_Y, ry: 0 }, "🎭 <b>The lounge hall</b>, upstairs.", typeof arbPopulate === "function" ? arbPopulate : null); }, ARW_IN_Y);
arwSpot(A.x - 4.5, A.z + 1, 1.6, "The drawing room door", "go in", function () { arwGo({ sc: "hampstead", x: ARW_AT.drawing.x, z: ARW_AT.drawing.z + 3, y: ARW_IN_Y, ry: 0 }, "🎹 <b>The drawing room.</b>", typeof arbPopulate === "function" ? arbPopulate : null); }, ARW_IN_Y);
})();
arwRoomBuild(G, "hampstead", 1, 16, 12, 4.2, { paper: arwMat("damask"), floor: arwMat("floor"), out: { x: ARW_AT.study.x, z: ARW_AT.study.z, ry: 0 }, doorName: "The door, back to the study", env: "gas" });
(function () {
var A = arwInAt("hampstead", 1), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
var bl = arwLam(0x0E0E10);
var pg = new THREE.Group();
pg.position.set(-4, 0, -4);
pg.rotation.y = 0.3;
g.add(pg);
arwBox(pg, 1.6, 0.3, 2.4, bl, 0, 0.8, 0);
[[-0.7, -1], [0.7, -1], [0, 1]].forEach(function (q) { arwBox(pg, 0.12, 0.8, 0.12, bl, q[0], 0, q[1]); });
arwBox(pg, 1.4, 0.05, 0.3, arwMat("ivory"), 0, 1.12, -1.05);
var lid = arwBox(pg, 1.6, 0.04, 2.4, bl, 0, 1.1, 0);
lid.rotation.z = 0.7;
lid.position.set(-0.5, 1.6, 0);
arwChair(g, -4.4, -2.6, Math.PI + 0.3, arwMat("velvet"));
[-1, 1].forEach(function (k) { var s = new THREE.Group(); s.position.set(k * 4, 0, 1.5); s.rotation.y = -k * Math.PI / 2; g.add(s); arwBox(s, 2.6, 0.45, 0.9, arwMat("velvet"), 0, 0, 0); arwBox(s, 2.6, 0.6, 0.2, arwMat("velvet"), 0, 0.45, 0.35); });
arwTable(g, 0, 1.5, 1.6, 0.9, 0.5, dk);
arwRug(g, 0, 1, 8, 6, 0x3A2A4A);
for (var i = 0; i < 3; i++) {
var c = new THREE.Mesh(arwGeo("cup", function () { return new THREE.CylinderGeometry(0.05, 0.04, 0.07, 10); }), arwShine(0xF4F0E8, 0.3, 0.05));
c.position.set(-0.4 + i * 0.4, 0.54, 1.5);
g.add(c);
}
[-7, 7].forEach(function (x) { arwPlant(g, "palm", [{ x: x, z: -5, y: 0, s: 0.22 }], { keepAll: 1 }); });
arwLily(g, 6.5, 0, -5.4);
})();
arwRoomBuild(G, "hampstead", 2, 14, 22, 7, { paper: arwMat("velvet"), floor: arwMat("floor"), out: { x: ARW_AT.study.x, z: ARW_AT.study.z, ry: 0 }, doorName: "The stairs, down to the study", env: "gas" });
(function () {
var A = arwInAt("hampstead", 2), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
g.userData.keep = 1;
for (var r = 0; r < 3; r++)
for (var c = 0; c < 6; c++)
arwChair(g, -4 + c * 1.6, 3 + r * 1.6, 0, arwMat("velvet"), true);
var ct = new THREE.Group();
ct.position.set(0, 0, -1);
g.add(ct);
ARW.curtain = ct;
var cm = arwM("brocade", function () {
var t = arwCanvas("brocade", 256, 256, function (c, W, H) { c.fillStyle = "#6A1020"; c.fillRect(0, 0, W, H); c.strokeStyle = "rgba(232,192,96,.6)"; c.lineWidth = 3; for (var i = 0; i < 8; i++)
for (var j = 0; j < 8; j++) {
c.beginPath();
c.ellipse(i * 32 + 16, j * 32 + 16, 10, 14, 0, 0, 7);
c.stroke();
} for (i = 0; i < W; i += 16) {
c.fillStyle = "rgba(0,0,0,.25)";
c.fillRect(i, 0, 6, H);
} });
var m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
});
[-1, 1].forEach(function (k) { var p = new THREE.Mesh(new THREE.PlaneGeometry(7, 6.8, 12, 1), cm); var pa = p.geometry.attributes.position; for (var i = 0; i < pa.count; i++)
pa.setZ(i, Math.sin(pa.getX(i) * 3) * 0.12); p.geometry.computeVertexNormals(); p.position.set(k * 3.5, 3.4, 0); p.userData.side = k; ct.add(p); });
arwSolid(A.x, A.z - 1, 14, 0.4, ARW_IN_Y - 1, ARW_IN_Y + 7).curtain = 1;
var stn = arwS("b:limestone", 0x8A7A60, 3);
for (var i = 0; i < 6; i++) {
var px = (i % 2 ? 1 : -1) * (3 + Math.floor(i / 2) * 0.4), pz = -3 - Math.floor(i / 2) * 2.6;
arwCyl(g, 0.45, 0.55, 6.2, stn, px, 0, pz, 14);
arwBox(g, 1.4, 0.4, 1.4, stn, px, 6.2, pz);
}
arwBox(g, 13, 0.6, 1.2, stn, 0, 6.4, -6);
arwBox(g, 4, 0.5, 2.4, stn, 0, 0, -7.5);
arwBox(g, 2.4, 0.4, 0.9, arwMat("oak"), 0, 0.5, -6.8);
arwBox(g, 2.3, 0.12, 0.8, arwLam(0xC8B898), 0, 0.9, -6.8);
arwBox(g, 1.2, 1.4, 1.2, stn, 0, 0, -9.6);
arwBox(g, 0.8, 2.6, 0.6, arwMat("white"), 0, 1.4, -9.6);
var bk = new THREE.Mesh(new THREE.PlaneGeometry(13.6, 6.8), arwM("templebk", function () {
var t = arwCanvas("templebk", 512, 256, function (c, W, H) {
var gr = c.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#0A0A14");
gr.addColorStop(1, "#3A2A1A");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
c.fillStyle = "#5A4A3A";
for (var i = 0; i < 7; i++) {
c.fillRect(30 + i * 70, 40, 26, H - 40);
}
c.fillStyle = "rgba(255,200,120,.25)";
c.beginPath();
c.arc(W / 2, H * 0.4, 60, 0, 7);
c.fill();
c.fillStyle = "#C8B080";
c.font = "bold 22px Georgia";
c.textAlign = "center";
c.fillText("☉", W / 2, H * 0.42);
});
var m = new THREE.MeshBasicMaterial({ map: t });
m.userData.noPhoto = 1;
return m;
}));
bk.position.set(0, 3.4, -10.8);
g.add(bk);
arwFire(g, -4.5, 0, -8.5, 0.6);
arwFire(g, 4.5, 0, -8.5, 0.6);
})();
[3, 4, 5].forEach(function (s) {
arwRoomBuild(G, "hampstead", s, 12, 10, 3.6, { paper: [arwMat("bluepaper"), arwMat("damask"), arwMat("greenpaper")][s - 3], floor: arwMat("floor"), out: { x: 0, z: 14, ry: 0 }, doorName: "The door, out to the street", env: "gas" });
var A = arwInAt("hampstead", s), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwFurnish(g, 12, 10, "home", 190 + s);
arwFire(g, -5.4, 0, 3, 0.5);
arwCrowd("hn" + s, 2, A.x - 3, A.z - 2, A.x + 3, A.z + 2, { dress: "arcoat", dressF: "argown", women: 0.5, wander: 2, sp: 0.3, feet: ARW_IN_Y + 1, talkP: 1, names: ["A neighbour at home", "His wife"], persona: "guest",
says: ["Faull's séance? We weren't asked. Just as well: I don't hold with it.", "Did you hear that crash just now? Like a house coming down. And nothing fallen, they say."] });
});
},
function (G) {
var lite = arwLite(), H = arwStkH, R = wRand(2201), S = ARW_STK;
arwTerrain(G, -780, -780, 1560, 1560, lite ? 14 : 8, H, arwMat("grass"), function (x, z, y, c) {
var n = arwFbm(x * 0.03, z * 0.03, 3), cl = arwStkCliff(z);
if (x > cl - 2) {
c.setRGB(0.42 + n * 0.1, 0.4 + n * 0.1, 0.38 + n * 0.1);
return;
}
var heather = arwFbm(x * 0.01 + 3, z * 0.01, 2);
c.setRGB(0.38 + n * 0.1 + heather * 0.18, 0.42 + n * 0.12 - heather * 0.08, 0.26 + n * 0.06 + heather * 0.1);
});
arwWater(G, 500, 0, 1600, 1600, 0, 0x1E3A34, 0.92);
var far = new THREE.Mesh(new THREE.RingGeometry(780, 6000, 48, 1), arwLam(0x1A3430));
far.rotation.x = -Math.PI / 2;
far.position.set(0, -0.05, 0);
G.add(far);
var foam = [];
for (var i = 0; i < (lite ? 40 : 120); i++) {
var fz = -760 + R() * 1520, fx = arwStkCliff(fz) + 14 + R() * 40;
foam.push({ x: fx, z: fz, y: 0.05, s: 0.6 + R() * 1.4, ry: R() * 6 });
}
arwInst(G, arwGeo("foam", function () { var g = new THREE.CircleGeometry(2.2, 10); g.rotateX(-Math.PI / 2); return g; }), arwLam(0xE8F0F0, { op: 0.55 }), foam, {});
var rocks = [];
for (i = 0; i < (lite ? 50 : 140); i++) {
var rz = -760 + R() * 1520, rx = arwStkCliff(rz) + 8 + R() * 24;
rocks.push({ x: rx, z: rz, y: -2 + R() * 3, s: 2 + R() * 5, ry: R() * 6 });
}
arwPlant(G, "rock", rocks, { mat: arwMat("rock"), keepAll: 1 });
var road = arwDense([[-780, 780], [-520, 520], [-300, 300], [-60, 60], [100, 12], [118, -100], [130, -300], [60, -500], [-300, -760]], 6);
arwStrip(G, road, 4, H, arwMat("gravel"), 0.1);
arwStrip(G, arwDense([[130, -300], [172, -420], [178, -520], [182, -560]], 4), 1.2, H, arwS("earth", 0x7A6A50, 3), 0.08);
var dsw = arwS("b:limestone", 0x8A8478, 2);
[[[-760, 700], [-300, 320]], [[-280, 280], [-80, 90]], [[-200, -120], [-40, -380]]].forEach(function (seg) {
var a = seg[0], b = seg[1], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 4);
for (var k = 0; k < n; k++) {
var x = a[0] + (b[0] - a[0]) * k / n + 5, z = a[1] + (b[1] - a[1]) * k / n + 5;
arwBox(G, 4.2, 1.1, 0.6, dsw, x, H(x, z) - 0.1, z, Math.atan2(-(b[1] - a[1]), b[0] - a[0]), true);
}
});
var hx = S.house[0], hz = S.house[1], hy = H(hx - 10, hz), stn = arwS("b:ashlar", 0x8A8478, 2.4);
(function () {
var g = new THREE.Group();
g.position.set(hx, hy, hz);
G.add(g);
arwBox(g, 26, 8, 14, stn, 0, -8, 0);
arwBox(g, 26, 7.6, 14, stn, 0, 0, 0);
var rf = new THREE.Mesh(arwGeo("stkroof", function () { var s = new THREE.Shape(); s.moveTo(-7.4, 0); s.lineTo(0, 4.2); s.lineTo(7.4, 0); s.lineTo(-7.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 26.4, bevelEnabled: false }); e.translate(0, 0, -13.2); e.rotateY(Math.PI / 2); return e; }), arwMat("slate"));
rf.position.y = 7.6;
g.add(rf);
[-11, 11].forEach(function (x) { arwBox(g, 1.4, 3.2, 1.6, stn, x, 9.6, 0); });
for (var i = 0; i < 4; i++)
for (var f = 0; f < 2; f++) {
var wx = -9 + i * 6;
if (f === 0 && i === 1)
continue;
arwBox(g, 1.4, 1.8, 0.1, arwShine(0x1A2228, 0.2, 0.3), wx, 1.2 + f * 3.8, 7.05);
arwBox(g, 1.6, 0.14, 0.2, arwMat("granite"), wx, 1.1 + f * 3.8, 7.1);
arwBox(g, 1.4, 1.8, 0.1, arwShine(0x1A2228, 0.2, 0.3), wx, 1.2 + f * 3.8, -7.05);
}
arwBox(g, 1.4, 1.8, 0.1, arwShine(0x1A2228, 0.2, 0.3), -13.06, 1.2, -3);
arwBox(g, 1.4, 1.8, 0.1, arwShine(0x1A2228, 0.2, 0.3), -13.06, 5.0, 2);
arwSolid(hx, hz, 26.6, 14.6, hy - 12, hy + 14);
})();
arwDoorTo(G, "starkness", 0, hx - 13.3, hz - 0, -Math.PI / 2, "The front door of the house", 12, 10, { col: 0x2A2A24, frame: arwMat("granite"), y: hy });
(function () {
var x = S.shop[0], z = S.shop[1], y = H(x - 8, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
arwBox(g, 18, 4.2, 8, stn, 0, -2, 0);
arwBox(g, 18.6, 0.4, 8.6, arwMat("slate"), 0, 4.2, 0);
arwBox(g, 18, 0.6, 8.4, arwMat("slate"), 0, 4.4, 0).rotation.x = 0.04;
arwBox(g, 1.2, 1.0, 0.1, arwShine(0x1A2228, 0.2, 0.3), -4, 1.6, -4.05);
arwBox(g, 1.2, 1.0, 0.1, arwShine(0x1A2228, 0.2, 0.3), 4, 1.6, -4.05);
arwSolid(x, z, 18.4, 8.4, y - 4, y + 6);
})();
arwDoorTo(G, "starkness", 2, S.shop[0] - 9.2, S.shop[1], -Math.PI / 2, "The workshop door", 12, 8, { col: 0x3A2A1A, frame: arwMat("granite"), y: H(S.shop[0] - 10, S.shop[1]) });
[[128, -12, 128, 44], [128, 44, 164, 44], [128, -12, 137, -12]].forEach(function (q) { var cx = (q[0] + q[2]) / 2, cz = (q[1] + q[3]) / 2, L = Math.hypot(q[2] - q[0], q[3] - q[1]); arwBox(G, q[0] === q[2] ? 0.7 : L, 1.8, q[0] === q[2] ? L : 0.7, dsw, cx, H(cx, cz) - 0.2, cz, 0, true); });
arwSolid(128, 12, 0.2, 0.2, 0, 0).off = true;
var junk = [];
for (i = 0; i < 16; i++)
junk.push({ x: 132 + R() * 12, z: 14 + R() * 8, y: H(136, 18), s: 0.3 + R() * 0.5, ry: R() * 6 });
arwPlant(G, "rock", junk, { mat: arwMat("iron"), keepAll: 1 });
(function () { var x = 136, z = 20, y = H(x, z), g = new THREE.Group(); g.position.set(x, y, z); G.add(g); arwCyl(g, 0.18, 0.22, 1.4, arwMat("iron"), 0, 0, 0, 10); var h = arwBox(g, 0.06, 0.06, 0.9, arwMat("iron"), 0, 1.3, 0.3); h.rotation.x = -0.5; arwBox(g, 0.5, 0.3, 0.5, arwS("b:limestone", 0x7A7A70, 2), 0, 0, 0.6); arwRound(x, z, 0.4); })();
(function () {
var T = S.tower, x = T[0], z = T[1], y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var gr = arwS("b:limestone", 0x9A9490, 2.4), h = S.twH;
arwBox(g, 7, h, 7, gr, 0, -1, 0);
arwBox(g, 7.6, 0.5, 7.6, arwMat("granite"), 0, h - 1, 0);
for (var i = 0; i < 4; i++) {
var a = i * Math.PI / 2;
arwBox(g, 7.6, 1.0, 0.4, gr, Math.sin(a) * 3.6, h - 0.5, Math.cos(a) * 3.6, a);
}
for (i = 0; i < 6; i++) {
var wy = 2 + i * 3.2;
arwBox(g, 0.12, 1.6, 1.0, arwShine(0x283038, 0.15, 0.4), 3.52, wy, 0);
arwBox(g, 0.3, 0.15, 1.3, arwMat("granite"), 3.6, wy - 0.12, 0);
}
arwBox(g, 1.6, 2.6, 0.12, arwLam(0x2A2018), 0, 0, 3.52);
arwBox(g, 4, 1.2, 4, arwMat("iron"), 0, h - 0.5, 0);
arwFloor(x, z, 7, 7, y + h - 0.5);
arwFloor(x, z, 4, 4, y + h + 0.7);
arwSolid(x, z, 7.2, 7.2, y - 2, y + h - 0.9);
var tp = arwTorpedo();
tp.position.set(0, h + 0.7, 0);
tp.rotation.y = Math.PI * 0.75;
g.add(tp);
ARW.torpedo = tp;
ARW_AT.ktop.y = y + h + 0.7;
ARW_AT.ktop.x = x + 1.6;
ARW_AT.ktop.z = z + 1.6;
arwSpot(x + 1.4, z - 1.4, 1.4, "The trap, down into the tower", "climb down", function () { arwGo({ sc: "starkness", x: ARW_AT.toproom.x, z: ARW_AT.toproom.z + 1.6, y: ARW_IN_Y, ry: 0 }, null, typeof arbPopulate === "function" ? arbPopulate : null); }, y + h + 0.7);
arwSpot(x - 1.2, z + 1.2, 2.2, "The door of the crystal torpedo", "get in", function () { if (!ARW.torpGo)
setStatus("✴️ <b>The torpedo of crystal.</b> Its door is shut and screwed up: only Krag, its pilot, can open it."); }, y + h + 0.7);
})();
arwDoorTo(G, "starkness", 3, S.tower[0], S.tower[1] + 3.6, 0, "The gate of the tower", 8, 8, { col: 0x2A2018, frame: arwMat("granite"), y: H(S.tower[0], S.tower[1] + 3.6) });
(function () {
var pts = [[182, -560, H(170, -560) - 1], [184, -600, 40], [178, -630, 30], [168, -660, 24]];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]), r = Math.atan2(b[0] - a[0], b[1] - a[1]);
arwRamp(cx, cz, 1.4, L + 0.6, Math.max(a[2], b[2]), Math.min(a[2], b[2]), r);
var m = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, L), arwMat("rock"));
m.position.set(cx, (a[2] + b[2]) / 2 - 0.2, cz);
m.rotation.order = "YXZ";
m.rotation.y = r;
m.rotation.x = Math.atan2(a[2] - b[2], L);
G.add(m);
}
var g = pts[3];
arwFloor(g[0], g[1], 10, 8, g[2]);
arwBox(G, 10, 0.8, 8, arwMat("rock"), g[0], g[2] - 0.8, g[1]);
ARW_AT.kgap.y = g[2];
ARW_AT.kledge.y = null;
})();
arwPlant(G, "grass", arwScatter(2202, lite ? 260 : 700, -760, -760, 700, 760, function (x, z) { return x < arwStkCliff(z) - 6 && arwPathD(x, z, road) > 4; }, H, 0.7, 1.3), { col: 0xA89A70 });
arwPlant(G, "bush", arwScatter(2203, lite ? 50 : 140, -760, -760, 700, 760, function (x, z) { return x < arwStkCliff(z) - 8 && arwPathD(x, z, road) > 6 && Math.hypot(x - 140, z - 10) > 40 && Math.hypot(x - 120, z + 180) > 16; }, H, 0.5, 1.0), { col: 0x5A6A2A });
arwPlant(G, "flowers", arwScatter(2204, lite ? 60 : 180, -760, -760, 700, 760, function (x, z) { return x < arwStkCliff(z) - 6 && arwPathD(x, z, road) > 4; }, H, 0.8, 1.2), { col: "#E8D040" });
arwStkSheep(G, lite ? 8 : 18, H);
(function () { var C = S.croft, x = C[0], z = C[1], y = H(x, z); arwHouse(G, x, z, 10, 6, 3, { y: y, wall: arwS("b:limestone", 0xD8D4C8, 2), roof: arwS("b:moss", 0x8A7A50, 3), shut: 0x2A4A3A, noDoor: true }); arwSmoke(G, x + 3, y + 5, z, 0x8A8A8A, 6); })();
arwDoorTo(G, "starkness", 5, S.croft[0], S.croft[1] + 3.1, 0, "The door of the crofter's cottage", 10, 8, { col: 0x3A4A3A, frame: arwS("b:limestone", 0xD8D4C8, 2), y: H(S.croft[0], S.croft[1] + 3.1) });
arwCrowd("stk", lite ? 3 : 5, -500, 200, -250, 500, { dress: "arcoat", dressF: "armaid", women: 0.4, wander: 30, sp: 0.5, names: ["A shepherd", "The crofter's wife", "A coastguard on his round"], persona: "A Scottish crofting neighbour of the Starkness Observatory, a few miles from Haillar, in the early twentieth century: plain-spoken, kind, a little wary of the empty observatory.",
says: ["Starkness? Nobody's lived there since the spring. Lights in the tower, some nights. I don't go near.", "Ye'll be wanting the observatory. Mind the cliffs: four hundred feet, and nothing at the bottom but the sea.", "The Gap of Sorgie? Aye. Folk say ye can hear drums down there, of an evening. I never have."] });
arwStkRooms(G);
},
function (G, n, H) {
var R = wRand(2205), fl = arwS("b:quilt", 0xE8E4D8, 0.6), dk = arwLam(0x1A1A1A);
for (var i = 0; i < n; i++) {
var x = -500 + R() * 560, z = -400 + R() * 900;
if (Math.hypot(x - 140, z - 10) < 60)
continue;
var g = new THREE.Group();
g.position.set(x, H(x, z), z);
g.rotation.y = R() * 6.28;
G.add(g);
arwEll(g, fl, 0.38, 0.34, 0.6, 0, 0.62, 0, 10);
arwEll(g, dk, 0.13, 0.15, 0.22, 0, 0.78, 0.62, 8);
[[0.18, 0.3], [-0.18, 0.3], [0.18, -0.32], [-0.18, -0.32]].forEach(function (q) { arwCyl(g, 0.04, 0.04, 0.42, dk, q[0], 0, q[1], 5); });
var P = { g: g, y: g.position.y, o: { wander: 14, sp: 0.25 } };
ARW.people.push(P);
}
},
function () {
var g = new THREE.Group();
g.userData.live = 1;
var cr = arwM("torpcr", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F4FF, shininess: 150, specular: 0xFFFFFF, transparent: true, opacity: 0.42, side: THREE.DoubleSide, depthWrite: false }); m.userData.noPhoto = 1; return m; });
var hull = new THREE.Mesh(arwGeo("torphull", function () { var p = []; for (var i = 0; i <= 24; i++) {
var t = i / 24, y = (t - 0.5) * 12.2, r = 1.22 * Math.pow(Math.sin(Math.min(1, t * 1.6) * Math.PI * 0.5), 0.6) * (t > 0.8 ? 1 - (t - 0.8) * 1.2 : 1);
p.push(new THREE.Vector2(Math.max(0.05, r), y));
} var g = new THREE.LatheGeometry(p, 24); g.rotateX(Math.PI / 2); return g; }), cr);
hull.position.y = 1.3;
g.add(hull);
var tank = new THREE.Mesh(arwGeo("torptank", function () { var c = new THREE.CylinderGeometry(0.8, 0.6, 3.6, 18); c.rotateX(Math.PI / 2); return c; }), arwGlowM(0xFFE0A0, 0.35));
tank.position.set(0, 1.3, 3.6);
g.add(tank);
var fl = arwBox(g, 1.6, 0.08, 5, arwMat("oak"), 0, 0.55, -1.8);
for (var i = 0; i < 3; i++) {
arwBox(g, 0.9, 0.5, 0.7, arwMat("leather"), 0, 0.6, -0.2 - i * 1.5);
arwBox(g, 0.9, 0.7, 0.12, arwMat("leather"), 0, 1.1, -0.55 - i * 1.5);
}
arwBox(g, 1.2, 0.5, 0.4, arwMat("brass"), 0, 0.9, 1.2);
var lv = arwBox(g, 0.05, 0.5, 0.05, arwMat("brass"), 0.3, 1.4, 1.2);
var gl = new THREE.Mesh(arwGeo("torpgauge", function () { return new THREE.CircleGeometry(0.12, 14); }), arwGlowM(0x9AF0C0, 0.9));
gl.position.set(-0.3, 1.26, 1.0);
g.add(gl);
arwBox(g, 3, 1.2, 13, arwMat("iron"), 0, -0.6, 0);
return g;
},
function (G) {
var pl = arwMat("plaster"), dust = arwS("b:planks", 0x6A5A48, 2);
arwRoomBuild(G, "starkness", 0, 12, 10, 3.4, { wall: pl, floor: dust, out: { x: 132, z: 0, ry: Math.PI / 2 }, doorName: "The front door, out to the yard", env: "indoor" });
(function () {
var A = arwInAt("starkness", 0), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTable(g, 0, -1, 2, 1, 0.78, dust);
var c = arwChair(g, 1.2, -1, -Math.PI / 2, dust);
c.rotation.z = 0.3;
arwChair(g, -1.4, 0.2, 0.8, dust);
arwBox(g, 2.2, 1.6, 0.6, arwMat("iron"), -4, 0, -4.6);
arwFire(g, -4, 0, -4.2, 0.5);
arwBox(g, 1.4, 1.8, 0.5, dust, 4.6, 0, -4.6);
for (var i = 0; i < 10; i++) {
var R = wRand(2210 + i);
arwBox(g, 0.3 + R() * 0.4, 0.1, 0.2 + R() * 0.3, arwLam(0x5A5048), -4 + R() * 8, 0, -3 + R() * 6);
}
arwSpot(A.x + 4.5, A.z + 1, 1.6, "The stairs up to the library", "go up", function () { arwGo({ sc: "starkness", x: ARW_AT.library.x, z: ARW_AT.library.z + 3, y: ARW_IN_Y, ry: 0 }, "📚 <b>The library</b>, upstairs.", typeof arbPopulate === "function" ? arbPopulate : null); }, ARW_IN_Y);
arwSpot(A.x - 4.5, A.z + 1, 1.6, "The dining room door", "go in", function () { arwGo({ sc: "starkness", x: ARW_AT.dining.x, z: ARW_AT.dining.z + 3, y: ARW_IN_Y, ry: 0 }, "🍽️ <b>The dining room.</b>", typeof arbPopulate === "function" ? arbPopulate : null); }, ARW_IN_Y);
})();
arwRoomBuild(G, "starkness", 1, 12, 10, 3.4, { paper: arwMat("greenpaper"), floor: dust, out: { x: ARW_AT.kitchen.x, z: ARW_AT.kitchen.z, ry: 0 }, doorName: "The stairs, down to the kitchen", env: "indoor" });
(function () {
var A = arwInAt("starkness", 1), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwShelves(g, 5.6, 0, 6, 3, -Math.PI / 2);
arwShelves(g, -5.6, 1, 4, 3, Math.PI / 2);
arwTable(g, 0, -3.4, 2.4, 1.1, 0.78, arwMat("oak"));
arwChair(g, 2.4, -1, -0.6, arwMat("leather"), true);
arwRug(g, 0, 0, 6, 5, 0x3A3A2A);
arwFire(g, 5.4, 0, -3.4, 0.5);
var win = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.8), arwGlowM(0xC8D0C8, 0.8));
win.position.set(0, 1.9, -4.82);
g.add(win);
var cb = new THREE.Group();
cb.position.set(-4.4, 0, -4.5);
g.add(cb);
arwBox(cb, 1.6, 2.2, 0.5, arwMat("oak"), 0, 0.6, 0);
arwBox(cb, 1.4, 2.0, 0.04, arwMat("quartz"), 0, 0.7, 0.27);
for (var s = 0; s < 3; s++)
arwBox(cb, 1.5, 0.04, 0.44, arwMat("oak"), 0, 0.9 + s * 0.6, 0);
[[-0.45, 0.22, 0.26], [-0.15, 0.16, 0.18], [0.15, 0.16, 0.18], [0.45, 0.16, 0.18]].forEach(function (q, i) { var b = new THREE.Mesh(arwGeo("bottle" + i, function () { var p = []; for (var k = 0; k <= 10; k++) {
var t = k / 10;
p.push(new THREE.Vector2(0.04 * Math.sin(Math.min(1, t * 1.4) * Math.PI * 0.5) + 0.01, t * q[2]));
} return new THREE.LatheGeometry(p, 10); }), arwMat("quartz")); b.position.set(q[0], 0.94, 0); cb.add(b); });
})();
arwRoomBuild(G, "starkness", 2, 12, 8, 3.6, { wall: arwS("b:limestone", 0x8A8478, 2), floor: arwMat("gravel"), out: { x: 136, z: 30, ry: Math.PI / 2 }, doorName: "The door, out to the yard", env: "indoor" });
(function () {
var A = arwInAt("starkness", 2), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwBox(g, 6, 0.9, 1, arwMat("oak"), -1, 0, -3.2);
arwBox(g, 1.2, 1.2, 1.0, arwMat("iron"), 4, 0, -3);
arwChest(g, 4.4, 2, 0);
arwChest(g, -4.6, 2, 0.4);
for (var i = 0; i < 6; i++)
arwBox(g, 0.06, 0.5, 0.06, arwMat("iron"), -3 + i * 0.6, 0.9, -3.4);
arwTorpedoSmall(g, 0, 0.9, -3.2);
})();
arwRoomBuild(G, "starkness", 3, 8, 8, 9, { wall: arwS("b:limestone", 0x9A9490, 2.4), floor: arwMat("granite"), out: { x: 120, z: -172, ry: 0 }, doorName: "The gate, out of the tower", env: "tower" });
(function () {
var A = arwInAt("starkness", 3), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
var st = arwS("b:limestone", 0x9A9490, 2.4);
arwCyl(g, 0.4, 0.4, 9, st, 0, 0, 0, 12);
for (var i = 0; i < 24; i++) {
var a = i / 12 * Math.PI, s = new THREE.Mesh(arwGeo("spstep", function () { var b = new THREE.BoxGeometry(2.6, 0.18, 0.9); b.translate(1.5, 0, 0); return b; }), st);
s.position.y = 0.3 + i * 0.36;
s.rotation.y = a;
g.add(s);
}
arwRound(A.x, A.z, 1.1, ARW_IN_Y - 1, ARW_IN_Y + 9);
arwSpot(A.x + 1.6, A.z + 1.4, 1.6, "The spiral stair", "climb up", function () { if (!ARW.stairOK) {
setStatus("🪨 <b>The weight.</b> " + "After half a dozen steps it is as though you carried three of yourself: your heart thumps, your lungs cannot fill. You can go no higher.");
return;
} arwGo({ sc: "starkness", x: ARW_AT.toproom.x, z: ARW_AT.toproom.z + 1.6, y: ARW_IN_Y, ry: 0 }, "🏚️ <b>The top of the tower</b>: a small room shut off by rough planking.", typeof arbPopulate === "function" ? arbPopulate : null); }, ARW_IN_Y);
arwSpot(A.x, A.z - 2.9, 1.3, "The lowest window", "look out", function () { arwStkLens(); }, ARW_IN_Y);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.6), arwM("tlens", function () {
var t = arwCanvas("tlens", 256, 384, function (c, W, H) {
c.fillStyle = "#04060E";
c.fillRect(0, 0, W, H);
var gr = c.createRadialGradient(W * 0.42, H * 0.4, 2, W * 0.42, H * 0.4, 40);
gr.addColorStop(0, "#FFF4C0");
gr.addColorStop(1, "rgba(255,220,120,0)");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
var g2 = c.createRadialGradient(W * 0.62, H * 0.46, 2, W * 0.62, H * 0.46, 26);
g2.addColorStop(0, "#C8E0FF");
g2.addColorStop(1, "rgba(80,140,255,0)");
c.fillStyle = g2;
c.fillRect(0, 0, W, H);
c.fillStyle = "#C88A6A";
c.beginPath();
c.arc(W * 0.3, H * 0.6, 6, 0, 7);
c.fill();
});
var m = new THREE.MeshBasicMaterial({ map: t });
m.userData.noPhoto = 1;
return m;
}));
win.position.set(0, 3.2, -3.82);
g.add(win);
arwBox(g, 1.6, 0.3, 0.8, st, 0, 2.2, -3.6);
})();
arwRoomBuild(G, "starkness", 4, 7, 7, 3, { wall: arwS("b:planks", 0x6A5A48, 2), floor: arwS("b:planks", 0x6A5A48, 2), out: { x: ARW_AT.stair.x, z: ARW_AT.stair.z, ry: 0 }, doorName: "The stair, down the tower", env: "tower" });
(function () {
var A = arwInAt("starkness", 4), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTable(g, 0, -1, 1.6, 0.9, 0.78, arwMat("planks"));
var ln = new THREE.Mesh(arwGeo("lantern", function () { return new THREE.CylinderGeometry(0.1, 0.12, 0.26, 8); }), arwGlowM(0xFFD890, 0.9));
ln.position.set(0, 0.92, -1);
g.add(ln);
for (var i = 0; i < 3; i++) {
var c = new THREE.Mesh(arwGeo("cup", function () { return new THREE.CylinderGeometry(0.05, 0.04, 0.07, 10); }), arwShine(0xF4F0E8, 0.3, 0.05));
c.position.set(-0.4 + i * 0.4, 0.82, -0.7);
g.add(c);
}
arwSpot(A.x + 2.8, A.z - 2.6, 1.4, "The iron ladder, up through the trap", "climb up", function () { arwGo("ktop", "✴️ <b>The flat roof of the tower</b>, and the platform.", typeof arbPopulate === "function" ? arbPopulate : null); }, ARW_IN_Y);
for (i = 0; i < 8; i++)
arwBox(g, 0.5, 0.05, 0.05, arwMat("iron"), 2.8, 0.3 + i * 0.34, -3.2);
arwBox(g, 0.05, 2.8, 0.05, arwMat("iron"), 2.55, 0, -3.2);
arwBox(g, 0.05, 2.8, 0.05, arwMat("iron"), 3.05, 0, -3.2);
})();
arwRoomBuild(G, "starkness", 5, 10, 8, 3, { wall: arwS("plaster", 0xE8E0D0, 4), floor: arwMat("gravel"), out: { x: -380, z: 336, ry: 0 }, doorName: "The door, out to the road", env: "indoor" });
(function () {
var A = arwInAt("starkness", 5), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwFurnish(g, 10, 8, "poor", 2230);
arwShelves(g, 4.6, -1, 2, 2, -Math.PI / 2);
arwCrowd("croft", 3, A.x - 2, A.z - 1, A.x + 2, A.z + 1, { dress: "arcoat", dressF: "armaid", women: 0.6, childP: 0.3, wander: 2, sp: 0.3, feet: ARW_IN_Y + 1, talkP: 1, names: ["The crofter", "The crofter's wife", "Their bairn"], persona: "A Scottish crofter's family a few miles from Starkness, kind, plain-spoken.",
says: ["Sit ye down by the fire. It's a cold wind off the sea the day.", "Two gentlemen walking to Starkness? Ye'll find it shut. Have a scone first.", "There's a man that comes at night to the tower, wi' a lantern. A wee broad man. He laughs."] });
})();
arwRoomBuild(G, "starkness", 6, 10, 8, 3.4, { paper: arwMat("bluepaper"), floor: dust, out: { x: ARW_AT.kitchen.x, z: ARW_AT.kitchen.z, ry: 0 }, doorName: "The door, back to the kitchen", env: "indoor" });
(function () { var A = arwInAt("starkness", 6), g = new THREE.Group(); g.position.set(A.x, ARW_IN_Y, A.z); G.add(g); arwTable(g, 0, 0, 2.6, 1.2, 0.78, arwMat("oak")); for (var i = 0; i < 4; i++)
arwChair(g, -1.2 + i * 0.8, 1, Math.PI, arwMat("oak")); arwBox(g, 1.6, 1.8, 0.5, arwMat("oak"), 3.6, 0, -3.6); arwBed(g, -3.4, -2.6, 0); })();
},
function () { try {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🔭 Not a window, but a lens</div><div style='margin:8px 0'><svg viewBox='0 0 320 180' width='100%' style='background:#04060E;border-radius:6px'><defs><radialGradient id='aY'><stop offset='0' stop-color='#FFF6C8'/><stop offset='1' stop-color='#FFC860' stop-opacity='0'/></radialGradient><radialGradient id='aB'><stop offset='0' stop-color='#D8E8FF'/><stop offset='1' stop-color='#4A8AFF' stop-opacity='0'/></radialGradient></defs><circle cx='130' cy='80' r='46' fill='url(#aY)'/><circle cx='130' cy='80' r='18' fill='#FFF8E0'/><circle cx='205' cy='92' r='30' fill='url(#aB)'/><circle cx='205' cy='92' r='11' fill='#E0ECFF'/><circle cx='88' cy='128' r='7' fill='#C8805A'/><circle cx='88' cy='128' r='7' fill='none' stroke='#FFE0B0' stroke-opacity='.4'/></svg></div><div style='opacity:.9'>Two suns, one white-gold and one blue, close together like small moons; and near them a little world shining by their light. " + arQ("Maskull knew at once that the system of spheres at which he was gazing was what is known to astronomy as the star Arcturus....") + "</div>" + worldBtn("go", "Close", ""), { go: function () { worldCard(null); } });
}
catch (e) { } },
function (P, x, y, z) { var b = new THREE.Mesh(arwGeo("tsmall", function () { var p = []; for (var k = 0; k <= 10; k++) {
var t = k / 10;
p.push(new THREE.Vector2(0.06 * Math.sin(Math.min(1, t * 1.4) * Math.PI * 0.5) + 0.01, t * 0.4));
} var g = new THREE.LatheGeometry(p, 10); g.rotateZ(Math.PI / 2); return g; }), arwMat("quartz")); b.position.set(x, y + 0.06, z); P.add(b); return b; },
function (x, z) {
var n = arwFbm(x * 0.008, z * 0.008, 3), nb = 2 + n * 6, M = ARW_POOL.mtn, d2 = Math.hypot(x - M[0], z - M[1]);
var L = ARW_POOL.lake, ex = (x - L[0]) / L[2], ez = (z - L[1]) / L[3], e = ex * ex + ez * ez, lk = arwSmooth(0.85, 1.15, e);
var d = Math.hypot(x - ARW_POOL.shrine[0], z - ARW_POOL.shrine[1]);
nb += 18 * arwSmooth(30, 50, d) * (1 - arwSmooth(75, 110, d));
nb *= arwSmooth(46, 80, d2);
var h = 0.2 + (nb - 0.2) * lk;
h += 62 * arwSmooth(212, 240, -z) - 48 * arwSmooth(620, 720, -z);
if (d2 < 46)
return 158.3;
var m = d2 < 70 ? 130 - 34 * (1 - arwSmooth(44, 70, d2)) : 130 * (1 - arwSmooth(70, 230, d2));
h += m;
var rd = Math.abs(z - ARW_POOL.river);
h -= 9 * (1 - arwSmooth(10, 24, rd));
return h;
},
function (G) {
var lite = arwLite(), H = arwPoolH, R = wRand(3301), P = ARW_POOL;
arwTerrain(G, -900, -900, 1800, 1800, lite ? 14 : 8, H, arwTMat("scarlet"), function (x, z, y, c) {
var n = arwFbm(x * 0.02, z * 0.02, 3), d2 = Math.hypot(x - P.mtn[0], z - P.mtn[1]);
if (z < -212 && z > -640 && d2 > 40) {
var r = arwSmooth(90, 170, d2);
c.setRGB(0.22 + n * 0.08 + r * 0.04, 0.2 + n * 0.06, 0.24 + n * 0.08);
if (d2 < 210 && y > 90) {
c.setRGB(0.42 + n * 0.1, 0.46 + n * 0.1, 0.5 + n * 0.1);
}
return;
}
if (z < -640) {
c.setRGB(0.34 + n * 0.1, 0.22 + n * 0.08, 0.32 + n * 0.1);
return;
}
var dh = Math.hypot(x - P.shrine[0], z - P.shrine[1]);
if (dh > 34 && dh < 108) {
c.setRGB(0.3 + n * 0.1, 0.2 + n * 0.06, 0.24 + n * 0.08);
return;
}
arwTCol("scarlet")(x, z, y, c);
});
arwSkyPut(G, { branch: [700, 1500, 900] });
var far = new THREE.Mesh(new THREE.RingGeometry(900, 7000, 48, 1), arwLam(0xB8402A));
far.rotation.x = -Math.PI / 2;
far.position.y = 0.5;
G.add(far);
var aft = new THREE.Mesh(new THREE.PlaneGeometry(6000, 700), new THREE.MeshBasicMaterial({ color: 0x4A8AFF, transparent: true, opacity: 0.2, fog: false, depthWrite: false }));
aft.position.set(0, 260, -5200);
G.add(aft);
var hills = [];
for (var i = 0; i < (lite ? 10 : 22); i++) {
var a = -1.2 + i / 22 * 2.4;
hills.push({ x: Math.sin(a) * 3600, z: -Math.cos(a) * 3600, y: 0, s: 3 + R() * 4, ry: R() * 6 });
}
arwTPlant(G, "spire", hills, { keepAll: 1, mat: arwTMat("blackrock") });
arwTPlant(G, "purpletree", arwScatter(3302, lite ? 14 : 30, -120, 640, 120, 820, function (x, z) { return Math.hypot(x, z - 720) > 6; }, H, 0.3, 0.5));
var ring = function (x, z) { var d = Math.hypot(x - P.shrine[0], z - P.shrine[1]); return d > 40 && d < 104; };
var pt = arwScatter(3303, lite ? 60 : 150, 30, 430, 250, 650, ring, H, 0.8, 1.5);
arwTPlant(G, "purpletree", pt);
var fr = [];
pt.forEach(function (t, k) { for (var j = 0; j < 3; j++) {
var x = t.x + (R() - 0.5) * 3, z = t.z + (R() - 0.5) * 3;
fr.push({ x: x, z: z, y: H(x, z), s: 1, ry: R() * 6 });
} });
arwTPlant(G, "bluefruit", fr, { keepAll: 1 });
arwTPlant(G, "jalebush", arwScatter(3304, lite ? 12 : 30, 40, 440, 240, 640, ring, H, 0.8, 1.2), { ulfire: 1 });
arwTPlant(G, "blacktree", [{ x: P.shrine[0], z: P.shrine[1] - 6, y: H(P.shrine[0], P.shrine[1] - 6), s: 1, ry: 0.4 }], { keepAll: 1 });
arwRound(P.shrine[0], P.shrine[1] - 6, 0.9);
(function () {
var x = P.well[0], z = P.well[1], y = H(x, z), w = new THREE.Mesh(arwGeo("wellring", function () { var g = new THREE.TorusGeometry(2.1, 0.45, 8, 24); g.rotateX(Math.PI / 2); return g; }), arwTMat("blackrock"));
w.position.set(x, y + 0.25, z);
G.add(w);
var wa = new THREE.Mesh(arwGeo("welldisc", function () { var g = new THREE.CircleGeometry(1.8, 24); g.rotateX(-Math.PI / 2); return g; }), arwTMat("gnawl"));
wa.position.set(x, y + 0.4, z);
G.add(wa);
arwRound(x, z, 2.4, y - 2, y + 0.9);
})();
(function () {
var g = new THREE.Group(), x = P.shrine[0], z = P.shrine[1], m = arwLam(0xFFFFFF, { op: 0.55, e: 0x8A8A8A });
for (var i = 0; i < 16; i++) {
var a = i / 16 * 6.283;
var c = arwCyl(g, 0.9, 1.0, 9 + ((i * 7) % 5), m, Math.sin(a) * 26, -2, Math.cos(a) * 26, 14);
}
g.position.set(x, H(x, z), z);
g.visible = false;
G.add(g);
ARW.shows.mirage = g;
})();
for (i = 0; i < (lite ? 4 : 8); i++)
arwWalkGrass(G, -60 + R() * 240, 380 + R() * 260, H);
arwAirballs(G, lite ? 14 : 34, -200, 150, 300, 700, H, 3305);
[[72, 300], [96, 330], [30, 470]].forEach(function (q) { arwWaltzer(G, q[0], q[1], H); });
(function () {
var x = P.fount[0], z = P.fount[1], y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var col = new THREE.Mesh(arwGeo("fcol", function () { var c = new THREE.CylinderGeometry(0.8, 1.1, 16, 16, 8, true); c.translate(0, 8, 0); return c; }), arwTMat("gnawl"));
g.add(col);
var pool = new THREE.Mesh(arwGeo("fpool", function () { var c = new THREE.CircleGeometry(3, 20); c.rotateX(-Math.PI / 2); return c; }), arwTMat("gnawl"));
pool.position.y = 0.15;
g.add(pool);
var cap = new THREE.Group();
cap.position.y = 16;
g.add(cap);
for (var k = 0; k < 10; k++) {
var s = new THREE.Mesh(arwGeo("fvap", function () { return new THREE.IcosahedronGeometry(1, 1); }), arwLam(0xC8E0D0, { op: 0.35 }));
var a = k / 10 * 6.283;
s.position.set(Math.cos(a) * (1.4 + (k % 3) * 0.6), (k % 4) * 0.6, Math.sin(a) * (1.4 + (k % 3) * 0.6));
s.scale.setScalar(0.8 + (k % 3) * 0.4);
cap.add(s);
}
cap.userData.sp = 0.25;
ARW.spin.push(cap);
arwRound(x, z, 1.4, y - 1, y + 17);
})();
arwStrip(G, arwDense([[40, -20], [46, 40], [52, 110], [58, 170], [62, 204]], 4), 2.4, H, arwTMat("gnawl"), 0.14);
(function () { var L = P.lake, m = new THREE.Mesh(arwGeo("hlake", function () { var g = new THREE.CircleGeometry(1, 64); g.rotateX(-Math.PI / 2); return g; }), arwTMat("gnawl")); m.scale.set(L[2] * 1.02, 1, L[3] * 1.02); m.position.set(L[0], 0.32, L[1]); m.renderOrder = 2; G.add(m); ARW.water.push(m); })();
arwTPlant(G, "preeds", arwScatter(3306, lite ? 60 : 160, -280, -220, 360, -20, function (x, z) { var ex = (x - 40) / 300, ez = (z + 120) / 95, e = ex * ex + ez * ez; return e > 0.7 && e < 1.08; }, H, 0.8, 1.4));
var rk = arwTMat("blackrock");
[[40, -14, 3], [46, -210, 5], [30, -214, 4], [56, -216, 4]].forEach(function (q) { var r = new THREE.Mesh(arwGeo("prock", function () { var g = new THREE.DodecahedronGeometry(1, 1); return g; }), rk); r.scale.set(q[2], q[2] * 0.6, q[2]); r.position.set(q[0], H(q[0], q[1]) - q[2] * 0.2, q[1]); G.add(r); });
arwFloor(40, -14, 5, 5, H(40, -14) + 1.6);
arwStrip(G, arwDense([[40, -206], [28, -218], [48, -228], [34, -238], [40, -252]], 3), 1.6, H, arwTMat("darkrock"), 0.1);
var ct = arwScatter(3307, lite ? 70 : 180, -220, -690, 220, -250, function (x, z) { var d = Math.hypot(x - P.mtn[0], z - P.mtn[1]); return d > 74 && d < 215 && Math.abs(x) > 4; }, H, 0.6, 1.3);
arwTPlant(G, "crystree", ct);
arwTPlant(G, "jalebush", arwScatter(3308, lite ? 20 : 60, -200, -680, 200, -260, function (x, z) { var d = Math.hypot(x - P.mtn[0], z - P.mtn[1]); return d > 72 && d < 200; }, H, 0.8, 1.3));
(function () {
var m = new THREE.Mesh(arwGeo("clake", function () { var g = new THREE.CircleGeometry(46, 40); g.rotateX(-Math.PI / 2); return g; }), arwWaterM(0x8AA4B4, 0.55));
m.position.set(P.mtn[0], 158.4, P.mtn[1]);
m.renderOrder = 2;
G.add(m);
ARW.water.push(m);
var dk = new THREE.Mesh(arwGeo("cdeep", function () { var g = new THREE.CircleGeometry(40, 32); g.rotateX(-Math.PI / 2); return g; }), arwLam(0x0A1418));
dk.position.set(P.mtn[0], 140, P.mtn[1]);
G.add(dk);
})();
(function () { var x = 0, z = -596, y = H(x, z); arwCaveMouth(G, x, z, Math.PI, { y: y }); })();
arwDoorTo(G, "pool", 0, 0, -594, Math.PI, "The mouth of Panawe's cave", 16, 20, { col: 0x08060A, frame: arwTMat("blackrock"), y: H(0, -594), msg: "🕳️ <b>Panawe's cave.</b> Dark inside, until the floor is sprinkled." });
arwTRoom(G, "pool", 0, 16, 20, 6, { rock: "blackrock", floorCol: 0xD8C8A8, env: "glow", out: { x: 0, z: -591, ry: Math.PI }, doorName: "The mouth of the cave, out to the mountain" });
(function () {
var A = arwInAt("pool", 0), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 16, 20, "cave", 31);
for (var k = 0; k < 4; k++) {
var f = arwBox(g, 2.2, 0.3, 1.1, arwLam(0x6A7A4A), -5 + k * 3.2, 0, -6);
}
var wl = new THREE.Mesh(arwGeo("cwell", function () { var g = new THREE.TorusGeometry(0.9, 0.25, 8, 18); g.rotateX(Math.PI / 2); return g; }), arwTMat("darkrock"));
wl.position.set(5, 0.2, -7);
g.add(wl);
var ww = new THREE.Mesh(arwGeo("cwellw", function () { var g = new THREE.CircleGeometry(0.75, 18); g.rotateX(-Math.PI / 2); return g; }), arwTMat("gnawl"));
ww.position.set(5, 0.25, -7);
g.add(ww);
})();
arwStrip(G, arwDense([[0, -600], [8, -630], [-4, -660], [0, -700], [0, -850], [6, -866]], 4), 3, H, arwS("earth", 0x6A4A5A, 3), 0.08);
(function () { var x = 0, z = -646, y = H(x, z); var s = new THREE.Mesh(arwGeo("spr", function () { var g = new THREE.CircleGeometry(1.4, 16); g.rotateX(-Math.PI / 2); return g; }), arwWaterM(0xB8D8E0, 0.7)); s.position.set(x + 3, y + 0.2, z); G.add(s); })();
var fo = arwScatter(3309, lite ? 180 : 520, -880, -866, 880, -700, function (x, z) { return Math.abs(x) > 6 && Math.hypot(x, z + 790) > 24 && Math.abs(z - P.river) > 16; }, H, 1.8, 3.0);
arwTPlant(G, "crystree", fo);
arwTPlant(G, "pgrass", arwScatter(3310, lite ? 120 : 340, -300, -860, 300, -700, function (x, z) { return Math.abs(z - P.river) > 14; }, H, 0.8, 1.4), { col: 0x9A5AB8 });
arwWater(G, 0, P.river, 1800, 26, 13, 0x1A2A3A, 0.9);
arwTPlant(G, "crystree", arwScatter(3311, lite ? 60 : 160, -880, -900, 880, -893, null, H, 1.6, 2.6));
(function () {
var x = 50, z = -856, y = H(x, z), g = new THREE.Group();
g.position.set(x, y + 0.1, z);
G.add(g);
var s = new THREE.Mesh(arwGeo("drude", function () { var g = new THREE.SphereGeometry(0.09, 12, 10); g.scale(1, 0.8, 1.25); return g; }), arwGlowM(0xFF3A2A));
g.add(s);
var gl = new THREE.Mesh(arwGeo("drudeg", function () { return new THREE.SphereGeometry(0.6, 12, 10); }), arwGlowM(0xFF2A1A, 0.18));
g.add(gl);
g.visible = false;
ARW.shows.drude = g;
})();
var huts = [[170, -262, 0.3], [214, -280, -0.4], [186, -318, 2.6], [236, -326, -2.2], [150, -300, 1.4], [262, -292, -1.2]];
huts.forEach(function (q, k) {
var x = q[0], z = q[1], ry = q[2], y = H(x, z), r = 4.2;
arwTorHut(G, x, z, ry, { y: y, r: r, col: [0xC8B0A8, 0xB8A8B8, 0xD0C0B0][k % 3], roofCol: [0x7A4A7A, 0x5A6A8A, 0x8A5A6A][k % 3] });
var dx = x + Math.sin(ry) * (r + 0.2), dz = z + Math.cos(ry) * (r + 0.2);
arwDoorTo(G, "pool", k + 1, dx, dz, ry, ["The home of a water-drinker", "A singer's house", "The house of an old woman of Poolingdred", "A home of two lovers", "A shepherd of airballs' house", "The house of a young girl"][k], 8, 8, { col: 0x2A1A20, frame: arwTMat("blackrock"), y: y });
arwTRoom(G, "pool", k + 1, 8, 8, 3.4, { rock: "darkrock", out: { x: dx + Math.sin(ry) * 1.6, z: dz + Math.cos(ry) * 1.6, ry: ry }, doorName: "The door, out to the plateau", env: "glow" });
var A = arwInAt("pool", k + 1), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 8, 8, k % 2 ? "fruit" : "home", 40 + k);
});
var pf = ["A woman of Poolingdred", "A man of Poolingdred", "A water-drinker", "A girl with a magn like a vine", "An old man in white"];
var ps = ["We eat nothing that lives. The gnawl water is enough: drink at the fountain, you will see.", "Joiwind went all that way for you? Of course she did. What is greater than loving-kindness?", "Blodsombre is coming: four hours of Branchspell at its worst. Come under the trees, or into a cave.", "Your blood is very red. It will thin, if you live as we live.", "Do not look too long at the blue light over the northern hills. Alppain pulls."];
arwCrowd("poolv", lite ? 6 : 12, 140, -340, 280, -240, { dress: "arwhite", dressF: "arrobe", women: 0.55, org: 1, magn: 1, skins: ARW_SKINS, wander: 14, sp: 0.4, names: pf, persona: "native", says: ps, talkP: 0.8 });
arwCrowd("poold", lite ? 3 : 6, 0, 120, 160, 520, { dress: "arwhite", dressF: "arrobe", women: 0.5, org: 1, magn: 1, skins: ARW_SKINS, wander: 30, sp: 0.5, names: pf, persona: "native", says: ps, talkP: 0.7 });
arwCrowd("poolf", lite ? 3 : 6, -260, -860, 260, -720, { dress: "arwhite", dressF: "arrobe", women: 0.5, org: 1, magn: 1, skins: ARW_SKINS, wander: 20, sp: 0.4, ok: function (x, z) { return Math.abs(z - P.river) > 16; }, names: ["A traveller on the Lusion Plain", "A listener in the forest"], persona: "native", says: ["Do you hear it? The forest sings, if you are quiet.", "The river runs north to south. Beyond it is the Marest: go carefully, they sorb men there."], talkP: 0.7 });
},
function (x, z) {
var n = arwFbm(x * 0.01, z * 0.01, 3);
if (z > 480) {
var rv = (Math.abs(x) < 16 && z > 556) || (Math.abs(z - 560) < 16 && x < 0);
return rv ? 12 : 14 + n * 3;
}
var top = 150 + n * 12, cliff = arwSmooth(440, 478, z);
var h = top + (14 - top) * cliff;
if (z < 440) {
var c = arwIfCrack(x, z);
if (c)
h = h + (-60 - h) * c;
}
var P = ARW_IFD.pen, dp = Math.hypot(x - P[0], z - P[1]);
if (dp < 175) {
var inPen = (Math.abs(x - P[0]) < 44 && z < P[1] + 80 && z > P[1] - 90) || (Math.abs(x - P[0]) < 7 && z >= P[1] + 80);
if (!inPen)
h = -80;
}
var K = ARW_IFD.peak, dx = Math.abs(x - K[0]), dz = Math.abs(z - K[1]), m = Math.max(dx, dz);
for (var k = 0; k < 5; k++)
h += 52 * arwSmooth(176 - 28 * k, 168 - 28 * k, m);
var B = ARW_IFD.burn, db = Math.hypot(x - B[0], z - B[1]);
if (db < 50)
h = h + (80 - h) * arwSmooth(50, 40, db);
h -= 60 * arwSmooth(-740, -900, z);
return h;
},
function (G) {
var lite = arwLite(), H = arwIfH, R = wRand(4401), I = ARW_IFD;
arwTerrain(G, -950, -950, 1900, 1900, lite ? 14 : 8, H, arwTMat("mould"), function (x, z, y, c) {
var n = arwFbm(x * 0.02, z * 0.02, 3);
if (y < 0) {
c.setRGB(0.06, 0.04, 0.06);
return;
}
if (z > 478) {
c.setRGB(0.3 + n * 0.1, 0.22 + n * 0.08, 0.3 + n * 0.1);
return;
}
var K = I.peak, m = Math.max(Math.abs(x - K[0]), Math.abs(z - K[1]));
if (m < 178) {
if (y > 390) {
c.setRGB(0.66, 0.86, 0.7);
return;
}
var band = Math.floor(y / 26) % 3;
c.setRGB([0.16, 0.62, 0.66][band] + n * 0.08, [0.14, 0.46, 0.12][band] + n * 0.06, [0.16, 0.12, 0.14][band] + n * 0.06);
return;
}
if (z > 436) {
var b = Math.floor((y + n * 10) / 22) % 5;
var C = [[0.78, 0.2, 0.12], [0.12, 0.56, 0.32], [0.86, 0.74, 0.18], [0.8, 0.28, 0.5], [0.1, 0.08, 0.1]][b];
c.setRGB(C[0], C[1], C[2]);
return;
}
c.setRGB(0.4 + n * 0.14, 0.3 + n * 0.1, 0.28 + n * 0.1);
});
arwSkyPut(G, { branch: [-500, 1500, 1000], alp: [200, 260, -3200] });
var abyss = new THREE.Mesh(new THREE.PlaneGeometry(1900, 1900), arwLam(0x040306));
abyss.rotation.x = -Math.PI / 2;
abyss.position.set(0, -40, 0);
G.add(abyss);
var far = new THREE.Mesh(new THREE.RingGeometry(950, 7000, 48, 1), arwLam(0x6A3A4A));
far.rotation.x = -Math.PI / 2;
far.position.y = 60;
G.add(far);
arwWater(G, 0, 728, 30, 344, 12.3, 0x1A3040, 0.9);
arwWater(G, -475, 560, 950, 32, 12.3, 0x1A3040, 0.9);
(function () { var r = new THREE.Mesh(arwGeo("isle", function () { var g = new THREE.CylinderGeometry(7, 8, 1.6, 12); g.translate(0, 0.8, 0); return g; }), arwTMat("blackrock")); r.position.set(0, 12, 592); G.add(r); arwFloor(0, 592, 12, 12, 13.6, { r: 7.5 }); })();
arwTPlant(G, "crystree", arwScatter(4402, lite ? 60 : 160, -900, 600, 900, 940, function (x, z) { return Math.abs(x) > 22 && Math.abs(z - 560) > 20; }, H, 1.4, 2.4));
arwTPlant(G, "pgrass", arwScatter(4403, lite ? 80 : 200, -300, 620, 300, 940, function (x, z) { return Math.abs(x) > 18; }, H, 0.8, 1.3), { col: 0x9A5AB8 });
arwShrowk(G, 34, 604, -Math.PI / 2, H);
arwShrowk(G, 74, 212, 0.6, H);
for (var i = 0; i < (lite ? 2 : 5); i++) {
var s = arwShrowk(G, -300 + i * 160, 380 + (i % 2) * 40, i, function () { return 0; });
s.position.y = 200 + i * 14;
s.userData.y0 = s.position.y;
s.userData.ph = i;
s.userData.kind = "float";
s.userData.amp = 6;
s.userData.f = 0.2;
ARW.bob.push(s);
}
arwPlant(G, "rock", arwScatter(4404, lite ? 20 : 50, 20, 170, 110, 240, null, H, 1, 3), { mat: arwTMat("redrock"), keepAll: 1 });
arwTPlant(G, "purpletree", arwScatter(4405, lite ? 120 : 320, -900, -740, 900, 430, function (x, z) { return H(x, z) > 120 && arwPathD(x, z, I.route) > 4 && Math.max(Math.abs(x - I.peak[0]), Math.abs(z - I.peak[1])) > 180; }, H, 1.2, 2.2));
arwTPlant(G, "jalebush", arwScatter(4406, lite ? 30 : 90, -900, -740, 900, 430, function (x, z) { return H(x, z) > 120; }, H, 0.8, 1.4));
arwTPlant(G, "spire", arwScatter(4407, lite ? 10 : 26, -900, -700, 900, 420, function (x, z) { return H(x, z) > 120 && arwPathD(x, z, I.route) > 20 && Math.max(Math.abs(x - I.peak[0]), Math.abs(z - I.peak[1])) > 190 && Math.hypot(x - I.pen[0], z - I.pen[1]) > 180; }, H, 0.4, 1.0), { mat: arwTMat("redrock") });
(function () {
var R2 = I.route;
for (var k = 0; k < R2.length - 1; k++) {
var a = R2[k], b = R2[k + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var t = 0; t < L; t += 2) {
var x = a[0] + (b[0] - a[0]) * t / L, z = a[1] + (b[1] - a[1]) * t / L, best = 1e9;
I.cracks.forEach(function (c) { var d = arwPathD(x, z, c); if (d < best)
best = d; });
if (best < 1.2) {
var ang = Math.atan2(b[0] - a[0], b[1] - a[1]);
[-1.4, 0, 1.4].forEach(function (o) { var lg = new THREE.Mesh(arwGeo("ilog", function () { var g = new THREE.CylinderGeometry(0.32, 0.38, 16, 8); g.rotateX(Math.PI / 2); return g; }), arwS("bark", 0x5A4030, 2)); lg.position.set(x + Math.cos(ang) * o, H(x, z) + 0.1, z - Math.sin(ang) * o); lg.rotation.y = ang; G.add(lg); });
t += 12;
}
}
}
})();
arwStrip(G, arwDense(I.route.slice(4), 5), 2.2, H, arwS("earth", 0x6A4A3A, 3), 0.1);
(function () {
var s = I.slip, g = new THREE.Group();
G.add(g);
var y = 150;
arwBox(g, 64, 8, 64, arwTMat("redrock"), s[0], y - 8, s[1]);
arwTPlant(g, "purpletree", arwScatter(4408, lite ? 10 : 22, s[0] - 30, s[1] - 30, s[0] + 30, s[1] + 30, null, function () { return y; }, 1.2, 2.2), { keepAll: 1 });
g.userData.floor = arwFloor(s[0], s[1], 64, 64, y);
ARW.sinkG = g;
})();
(function () {
var P = I.pen, x = P[0] + 4, z = P[1] - 10, y = H(x, z);
arwTPlant(G, "wombtree", [{ x: x, z: z - 6, y: y, s: 0.42, ry: 0 }], { keepAll: 1, col: 0x4A3A2A, leaf: 0x3A8A7A });
arwRound(x, z - 6, 1.6);
var f = new THREE.Mesh(arwGeo("ifont", function () { var g = new THREE.CircleGeometry(1.4, 16); g.rotateX(-Math.PI / 2); return g; }), arwWaterM(0x8A2A1A, 0.92));
f.position.set(x + 6, y + 0.25, z - 2);
G.add(f);
var fr = new THREE.Mesh(arwGeo("ifontr", function () { var g = new THREE.TorusGeometry(1.5, 0.3, 8, 16); g.rotateX(Math.PI / 2); return g; }), arwTMat("darkrock"));
fr.position.set(x + 6, y + 0.2, z - 2);
G.add(fr);
arwBox(G, 3.4, 1.1, 1.6, arwS("b:moss", 0x5A7A3A, 2), x - 4, y, z + 2);
for (var k = 0; k < 6; k++) {
var p = new THREE.Mesh(arwGeo("plum", function () { return new THREE.SphereGeometry(0.06, 8, 6); }), arwShine(0x6A2A6A, 0.3, 0.1));
p.position.set(x - 4.8 + k * 0.12, y + 1.16, z + 2.3);
G.add(p);
}
arwTPlant(G, "jalebush", arwScatter(4409, lite ? 16 : 40, P[0] - 40, P[1] - 84, P[0] + 40, P[1] + 76, function (xx, zz) { return Math.hypot(xx - x, zz - z) > 10; }, H, 0.7, 1.2), { ulfire: 1 });
arwTPlant(G, "purpletree", arwScatter(4410, lite ? 12 : 30, P[0] - 40, P[1] - 84, P[0] + 40, P[1] + 76, function (xx, zz) { return Math.hypot(xx - x, zz - z) > 14; }, H, 0.6, 1.1));
})();
(function () { var K = I.peak; [[-60, -176], [50, -176], [176, 40], [-176, -20]].forEach(function (q, k) { var x = K[0] + q[0], z = K[1] + q[1], th = new THREE.Mesh(arwGeo("ithread", function () { var g = new THREE.PlaneGeometry(1.4, 220); g.translate(0, 110, 0); return g; }), arwLam(0xA8E8C8, { op: 0.6, ds: 1 })); th.position.set(x, 150, z); th.rotation.y = k < 2 ? 0 : Math.PI / 2; G.add(th); }); })();
arwCaveMouth(G, 330, -347, 0, { y: H(330, -344) });
arwDoorTo(G, "ifdawn", 0, 330, -345, 0, "The mouth of Tydomin's cave", 8, 36, { col: 0x050406, frame: arwTMat("blackrock"), y: H(330, -344), msg: "🕳️ <b>Tydomin's cave.</b> Impenetrably black." });
arwTRoom(G, "ifdawn", 0, 8, 36, 4, { rock: "blackrock", floorCol: 0x5A5058, env: "cave", out: { x: 330, z: -340, ry: 0 }, doorName: "The mouth of the cave, out to the light" });
(function () { var A = arwInAt("ifdawn", 0); arwSpot(A.x, A.z - 16.5, 1.6, "The inner chamber, in the blackness", "go in", function () { arwGo({ sc: "ifdawn", x: ARW_AT.ivision.x, z: ARW_AT.ivision.z + 2, y: ARW_IN_Y, ry: Math.PI }, "🛋️ <b>A strangely decorated room</b>, lighted by electricity.", typeof arbPopulate === "function" ? arbPopulate : null); }, ARW_IN_Y); })();
arwRoomBuild(G, "ifdawn", 1, 14, 22, 7, { wall: arwMat("plaster"), paper: arwMat("greenpaper"), floor: arwMat("floor"), out: { x: ARW_AT.tunnel.x, z: ARW_AT.tunnel.z - 12, ry: Math.PI }, doorName: "Darkness again", env: "gas" });
(function () {
var A = arwInAt("ifdawn", 1), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
var oak = arwMat("oak");
arwBox(g, 2.2, 0.5, 1.0, oak, 0, 0, -8.6);
arwBox(g, 2.2, 0.3, 0.3, oak, 0, 0.5, -9.1);
for (var k = 0; k < 8; k++) {
var c = arwChair(g, -4 + (k % 4) * 2.6, -1 + Math.floor(k / 4) * 3, 0, arwMat("velvet"));
}
arwRug(g, 0, 0, 8, 10, 0x5A2A2A);
})();
(function () {
var B = I.burn, lv = new THREE.Mesh(arwGeo("lava", function () { var g = new THREE.CircleGeometry(42, 32); g.rotateX(-Math.PI / 2); return g; }), arwGlowM(0x4AD86A, 0.95));
lv.position.set(B[0], 86, B[1]);
G.add(lv);
var hz = new THREE.Mesh(arwGeo("haze", function () { var g = new THREE.CylinderGeometry(44, 40, 46, 24, 1, true); g.translate(0, 23, 0); return g; }), arwLam(0x8AF0A0, { op: 0.16, ds: 1 }));
hz.position.set(B[0], 90, B[1]);
hz.userData.y0 = 90;
hz.userData.ph = 0;
hz.userData.kind = "float";
hz.userData.amp = 0.6;
hz.userData.f = 0.6;
G.add(hz);
ARW.bob.push(hz);
var pl = new THREE.PointLight(0x6AF08A, 1.2, 140);
pl.position.set(B[0], 100, B[1]);
G.add(pl);
})();
arwStrip(G, arwDense([[140, -628], [150, -612]], 2), 1.6, H, arwWaterM(0xB8E0E8, 0.8), 0.12);
(function () {
var x = 160, z = -800, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
arwCyl(g, 0.14, 0.18, 4.6, arwS("bark", 0x5A4A3A, 2), 0, 0, 0, 8);
[-1, 0, 1].forEach(function (k) { var b = new THREE.Mesh(arwGeo("trib", function () { var c = new THREE.CylinderGeometry(0.05, 0.08, 2.0, 6); c.translate(0, 1, 0); return c; }), arwS("bark", 0x5A4A3A, 2)); b.position.set(0, 4.5, 0); b.rotation.z = k * 0.45; g.add(b); });
arwRound(x, z, 0.4);
})();
arwJellies(G, lite ? 14 : 34, -60, -900, 240, -760, H, 4411);
(function () {
var x = 40, z = -760, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
arwCyl(g, 1.2, 1.6, 3, arwS("bark", 0x4A3A4A, 2), 0, 0, 0, 10);
for (var k = 0; k < 16; k++) {
var t = new THREE.Mesh(arwTaper([[0, 3, 0], [Math.cos(k) * 1.6, 4.4, Math.sin(k) * 1.6], [Math.cos(k) * 3.2, 4.2 + (k % 3), Math.sin(k) * 3.2]], [0.12, 0.08, 0.03], 8, 6), arwS("bark", 0x6A4A5A, 2));
g.add(t);
}
g.userData.kind = "spin";
g.userData.sp = 0.15;
ARW.bob.push(g);
arwRound(x, z, 1.8);
})();
for (i = 0; i < (lite ? 5 : 9); i++) {
var cx = -140 + R() * 200, cz = -920 + R() * 90, sp = new THREE.Mesh(arwGeo("spout", function () { var g = new THREE.CylinderGeometry(1.4, 2.6, 90, 12, 1, true); g.translate(0, 45, 0); return g; }), arwLam(0x6AF0A0, { op: 0.35, e: 0x2A8A4A, ds: 1 }));
sp.position.set(cx, H(cx, cz), cz);
G.add(sp);
sp.userData.home = [cx, cz];
sp.userData.y0 = sp.position.y;
sp.userData.ph = R() * 6;
sp.userData.dr = [1.2 + R(), 1.2 + R()];
sp.userData.kind = "air";
ARW.bob.push(sp);
}
[[120, 100, 0.4], [170, 130, -0.6], [150, 60, 2.8]].forEach(function (q, k) {
var x = q[0], z = q[1], ry = q[2], y = H(x, z), r = 4;
arwTorHut(G, x, z, ry, { y: y, r: r, wall: arwTMat("redrock"), roof: arwTMat("blackrock") });
var dx = x + Math.sin(ry) * (r + 0.2), dz = z + Math.cos(ry) * (r + 0.2);
arwDoorTo(G, "ifdawn", k + 2, dx, dz, ry, ["A hunter's hut", "The hut of a woman who sorbs", "An old man's hut"][k], 8, 8, { col: 0x1A0A0A, frame: arwTMat("redrock"), y: y });
arwTRoom(G, "ifdawn", k + 2, 8, 8, 3.4, { rock: "redrock", out: { x: dx + Math.sin(ry) * 1.6, z: dz + Math.cos(ry) * 1.6, ry: ry }, doorName: "The door, out to the island", env: "glow" });
var A = arwInAt("ifdawn", k + 2), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 8, 8, "ifdawn", 60 + k);
});
var nf = ["A man of Ifdawn", "A woman of Ifdawn", "A hunter with three arms", "An Ifdawn girl"];
var sf = ["Mind the ground: here it plunges down or rushes up without warning. One may call Ifdawn a place of quick decisions.", "You came through Poolingdred? Water-drinkers. Here we eat, and we sorb, and we live.", "A shrowk will drain you dry, if your will is weaker than its own. Learn the signs.", "Crimtyphon? Nobody goes on his peninsula unless he calls them."];
arwCrowd("ifv", lite ? 5 : 10, 60, 20, 220, 180, { dress: "arskin", dressF: "arskinf", women: 0.45, org: 1, eye3: 1, magn: "arm", skins: [0xC8987A, 0xB87A6A, 0xD8A88A, 0xA86A5A], wander: 16, sp: 0.6, names: nf, persona: "native", says: sf, talkP: 0.8 });
arwCrowd("ifs", lite ? 3 : 6, -300, 500, 300, 900, { dress: "arskin", dressF: "arskinf", women: 0.45, org: 1, eye3: 1, magn: "arm", skins: [0xC8987A, 0xB87A6A, 0xD8A88A], wander: 30, sp: 0.6, ok: function (x, z) { return Math.abs(x) > 20 && Math.abs(z - 560) > 20; }, names: nf, persona: "native", says: sf, talkP: 0.7 });
},
function (x, z) {
var S = ARW_SANT, n = arwFbm(x * 0.01, z * 0.01, 3);
if (z > S.wall + 4) {
return 20 + (S.low - 20) * arwSmooth(860, 200, z) + n * 6;
}
if (z > S.wall - 4) {
var t = (z - (S.wall - 4)) / 8;
return S.top + (S.low - S.top) * t;
}
if (z > S.edge + 4) {
var h = S.top + n * 5;
var P = S.pool;
if (Math.hypot(x - P[0], z - P[1]) < 9)
h -= 0.8;
return h;
}
if (z > S.edge - 4) {
var u = (z - (S.edge - 4)) / 8;
return S.forest + (S.top - S.forest) * u;
}
return S.forest + n * 4;
},
function (G, x0, z0, y0, y1, dir, mat) {
var n = Math.ceil(Math.abs(y1 - y0) / 30), dy = (y1 - y0) / n, L = 36, out = [];
for (var k = 0; k < n; k++) {
var ya = y0 + dy * k, yb = ya + dy, fwd = k % 2 === 0, xa = x0 + (fwd ? -L / 2 : L / 2), xb = x0 + (fwd ? L / 2 : -L / 2);
var r = arwRamp(x0, z0, 3, L, fwd ? ya : yb, fwd ? yb : ya, Math.PI / 2);
var m = new THREE.Mesh(new THREE.BoxGeometry(L + 0.4, 0.6, 3.2), mat);
m.position.set(x0, (ya + yb) / 2 - 0.32, z0);
m.rotation.z = Math.atan2(yb - ya, xb - xa);
G.add(m);
var st = [];
for (var s = 0; s < L; s += 0.8) {
var xx = xa + (xb - xa) * s / L, yy = ya + (yb - ya) * s / L;
st.push({ x: xx, z: z0, y: yy - 0.05, s: 1, ry: 0 });
}
arwInst(G, arwGeo("sstep", function () { var g = new THREE.BoxGeometry(0.8, 0.22, 3.0); g.translate(0, 0.11, 0); return g; }), mat, st, {});
var par = new THREE.Mesh(new THREE.BoxGeometry(L, 1.0, 0.3), mat);
par.position.set(x0, (ya + yb) / 2 + 0.3, z0 + 1.6);
par.rotation.z = m.rotation.z;
G.add(par);
arwFloor(xb + (fwd ? 2.4 : -2.4), z0, 5, 4, yb);
var ld = new THREE.Mesh(arwGeo("sland", function () { return new THREE.BoxGeometry(5, 0.6, 4); }), mat);
ld.position.set(xb + (fwd ? 2.4 : -2.4), yb - 0.3, z0);
G.add(ld);
out.push([xb, yb]);
}
arwFloor(x0 - L / 2 - 2.4, z0, 5, 4, y0);
return out;
},
function (G) {
var lite = arwLite(), H = arwSantH, R = wRand(5501), S = ARW_SANT;
arwTerrain(G, -900, -900, 1800, 1800, lite ? 14 : 8, H, arwTMat("whitesand"), function (x, z, y, c) {
var n = arwFbm(x * 0.02, z * 0.02, 3);
if (z > S.wall + 4) {
c.setRGB(0.5 + n * 0.1, 0.66 + n * 0.1, 0.56 + n * 0.08);
return;
}
if (z > S.wall - 4 || (z < S.edge + 4 && z > S.edge - 4)) {
c.setRGB(0.1 + n * 0.05, 0.1 + n * 0.05, 0.12 + n * 0.05);
return;
}
if (z > S.edge) {
c.setRGB(0.92 + n * 0.08, 0.9 + n * 0.08, 0.86 + n * 0.1);
return;
}
c.setRGB(0.18 + n * 0.06, 0.14 + n * 0.05, 0.12 + n * 0.04);
});
arwSkyPut(G, { branch: [-1400, 500, -400] });
var far = new THREE.Mesh(new THREE.RingGeometry(900, 7000, 48, 1), arwLam(0x8A9AA0));
far.rotation.x = -Math.PI / 2;
far.position.y = 10;
G.add(far);
(function () { var p = new THREE.Mesh(arwGeo("dfar", function () { var g = new THREE.ConeGeometry(260, 180, 4, 1); g.rotateY(Math.PI / 4); g.translate(0, 90, 0); return g; }), arwLam(0x5A3A3A)); p.position.set(-400, 0, 3400); G.add(p); })();
arwPlant(G, "rock", arwScatter(5502, lite ? 30 : 80, -880, 240, 880, 880, null, H, 1, 3), { mat: arwTMat("blackrock"), keepAll: 1 });
var bl = arwTMat("blackrock");
arwSantStair(G, S.stair.x, S.stair.z, S.low, S.top, 1, arwS("b:limestone", 0x3A383C, 2));
arwFloor(S.stair.x - 20, S.stair.z - 8, 6, 18, S.top);
arwTPlant(G, "spire", arwScatter(5503, lite ? 16 : 40, -880, 170, 880, 200, function (x) { return Math.abs(x) > 40; }, function (x, z) { return S.low - 10; }, 1.4, 2.6), { mat: bl, keepAll: 1 });
arwTPlant(G, "spire", arwScatter(5504, lite ? 20 : 50, -880, -480, 880, 160, function (x, z) { return Math.hypot(x - S.pool[0], z - S.pool[1]) > 40 && Math.abs(x) > 14; }, H, 0.3, 0.7), { mat: bl, keepAll: 1 });
[[60, -140], [-200, -260], [240, -60], [S.pool[0], S.pool[1]]].forEach(function (q, k) {
var r = k === 3 ? 8 : 12 + k * 3, w = new THREE.Mesh(arwGeo("spool" + r, function () { var g = new THREE.CircleGeometry(r, 24); g.rotateX(-Math.PI / 2); return g; }), arwWaterM(0xB8CCD0, 0.7));
w.position.set(q[0], H(q[0], q[1]) + 0.12, q[1]);
G.add(w);
if (k < 3) {
var t = [];
for (var j = 0; j < 8; j++) {
var a = j / 8 * 6.283;
t.push({ x: q[0] + Math.cos(a) * (r + 3), z: q[1] + Math.sin(a) * (r + 3), y: H(q[0], q[1]), s: 0.7, ry: a });
}
arwTPlant(G, "purpletree", t, { keepAll: 1 });
}
});
(function () {
var P = S.pool, x = P[0] + 5, z = P[1] + 2, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
arwCyl(g, 0.05, 0.07, 2.2, arwS("bark", 0x5A4A3A, 2), 0, 0, 0, 6);
[-1, 0, 1].forEach(function (k) { var b = new THREE.Mesh(arwGeo("trib2", function () { var c = new THREE.CylinderGeometry(0.03, 0.05, 0.9, 6); c.translate(0, 0.45, 0); return c; }), arwS("bark", 0x5A4A3A, 2)); b.position.set(0, 2.1, 0); b.rotation.z = k * 0.45; g.add(b); });
arwPlant(G, "rock", arwScatter(5505, 12, P[0] - 16, P[1] - 4, P[0] - 8, P[1] + 6, null, H, 0.8, 1.8), { mat: bl, keepAll: 1 });
})();
arwSantStair(G, S.stair2.x, S.stair2.z, S.forest, S.top, 1, arwS("b:limestone", 0x2A2A2E, 2));
arwFloor(S.stair2.x - 20, S.stair2.z + 7, 6, 18, S.top);
[[-140, -60, 0.3], [-180, -110, 1.2], [-110, -130, -2.6]].forEach(function (q, k) {
var x = q[0], z = q[1], ry = q[2], y = H(x, z), r = 4;
arwTorHut(G, x, z, ry, { y: y, r: r, wall: arwS("b:limestone", 0xD8D4CC, 2), roof: arwTMat("blackrock") });
var dx = x + Math.sin(ry) * (r + 0.2), dz = z + Math.cos(ry) * (r + 0.2);
arwDoorTo(G, "sant", k, dx, dz, ry, ["A Hator man's hut", "The hut of the brooders", "An old disciple's hut"][k], 8, 8, { col: 0x1A1A1A, frame: bl, y: y });
arwTRoom(G, "sant", k, 8, 8, 3.4, { rock: "blackrock", floorCol: 0xE8E4DC, out: { x: dx + Math.sin(ry) * 1.6, z: dz + Math.cos(ry) * 1.6, ry: ry }, doorName: "The door, out to the desert", env: "glow" });
var A = arwInAt("sant", k), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 8, 8, "poor", 70 + k);
});
arwCrowd("santm", lite ? 5 : 10, -240, -200, 120, 40, { dress: "arloin", women: 0, org: 1, skins: [0xD8C890, 0xC8B880, 0xB8A878, 0xE0D0A0], wander: 24, sp: 0.5, beardP: 0.1, names: ["A man of Sant", "A disciple of Hator", "A brooder"], persona: "You are a man of Sant on Tormance, a disciple of Hator: you hate pleasure, speak harshly and briefly, and despise women and soft speech.",
says: ["Pleasure is the enemy. It waits at every corner of the road of life.", "Women? None come to Sant. If they do, they die.", "The trifork: hatred of pleasure, disentanglement, power, and the ice-cold water.", "Catice stands in his pool. He is the most wholehearted of us all."], talkP: 0.8 });
arwCrowd("santp", lite ? 2 : 5, -300, 300, 300, 800, { dress: "arskin", women: 0.2, org: 1, eye3: 1, skins: ARW_SKINS, wander: 30, sp: 0.5, names: ["A traveller going up to Sant", "A pilgrim with a scarred soul"], persona: "native", says: ["Men throng to Sant from all parts, to have the scars of their souls healed.", "More than a thousand steps. I shall rest at the foot of them first."], talkP: 0.8 });
var tr = [];
for (var gx = -860; gx <= 860; gx += 58)
for (var gz = -560; gz >= -900; gz -= 58) {
var x = gx + (R() - 0.5) * 30, z = gz + (R() - 0.5) * 30;
if (Math.abs(x - 60) < 10 && z < -600)
continue;
if (Math.hypot(x - 100, z + 860) < 30)
continue;
tr.push({ x: x, z: z, y: H(x, z) - 1, s: 1.4 + R() * 0.4, ry: R() * 6 });
}
arwTPlant(G, "wombtree", tr, { keepAll: 1, col: 0x4A3A34, leaf: 0x2A4A34 });
tr.forEach(function (t) { arwRound(t.x, t.z, 3.4 * t.s, t.y - 2, t.y + 90); });
arwPlant(G, "rock", arwScatter(5506, lite ? 40 : 120, -860, -900, 860, -520, null, H, 0.4, 0.9), { mat: arwS("earth", 0x3A2A20, 3), keepAll: 1 });
(function () { var g = new THREE.Mesh(arwGeo("sbright", function () { return new THREE.SphereGeometry(14, 20, 14); }), arwGlowM(0xFFF6E0, 0.22)); g.position.set(100, H(100, -860) + 10, -880); G.add(g); g.visible = false; ARW.shows.bright = g; })();
arwCrowd("santf", lite ? 2 : 4, -400, -860, 300, -600, { dress: "arloin", women: 0.3, org: 1, eye3: 1, skins: [0xA8C8B8, 0x98B8A8], wander: 20, sp: 0.4, names: ["A pale dweller of the forest"], persona: "You live in the Wombflash Forest on Tormance, in its twilight under the giant trees. You speak softly and listen always for the drums.", says: ["Do you hear it? The drums come and go. Follow them, if you dare."], talkP: 0.9 });
},
function (x, z) {
var S = ARW_SHR, n = arwFbm(x * 0.012, z * 0.012, 3);
if (z > S.sea) {
var h = z > 300 ? 6 + n * 4 + (z - 300) * 0.04 : 1.2 + (z - S.sea) * 0.04 + n * 0.8;
var cd = arwPathD(x, z, S.creek);
if (cd < 14)
h = h + (-3 - h) * arwSmooth(14, 9, cd);
return h;
}
var I = S.isl, ex = (x - I[0]) / I[2], ez = (z - I[1]) / I[3], e = Math.sqrt(ex * ex + ez * ez);
if (e > 1.05)
return -8;
var h = -8 + (10 + n * 4 + 8) * arwSmooth(1.05, 0.9, e);
h += (26 + n * 20) * arwSmooth(0.82, 0.6, e) * (0.6 + 0.4 * arwFbm(x * 0.03, z * 0.03, 2));
var L = S.lake, dl = Math.hypot(x - L[0], z - L[1]);
if (dl < 110) {
var rim = 18 * arwSmooth(110, 70, dl) * arwSmooth(40, 60, dl);
h += rim;
if (dl < 52)
h = h + (36 - h) * arwSmooth(52, 42, dl);
}
return h;
},
function (G) {
var lite = arwLite(), H = arwShoreH, R = wRand(6601), S = ARW_SHR;
arwTerrain(G, -950, -950, 1900, 1900, lite ? 14 : 8, H, arwTMat("scarlet"), function (x, z, y, c) {
var n = arwFbm(x * 0.02, z * 0.02, 3), v = arwFbm(x * 0.006 + 3, z * 0.006, 2);
if (z > 300) {
c.setRGB(0.3 + n * 0.08, 0.18 + n * 0.06, 0.22 + n * 0.08);
return;
}
if (z > S.sea - 4) {
if (v > 0.62)
c.setRGB(0.56 + n * 0.1, 0.34 + n * 0.08, 0.7 + n * 0.1);
else
c.setRGB(0.96, 0.56 + n * 0.1, 0.16 + n * 0.08);
return;
}
if (y < 4) {
c.setRGB(0.86 + n * 0.08, 0.6 + n * 0.08, 0.36 + n * 0.06);
return;
}
c.setRGB(0.32 + n * 0.08, 0.22 + n * 0.06, 0.16 + n * 0.05);
});
arwSkyPut(G, { branch: [-200, 1600, 300], moon: [1200, 500, -1400] });
var sea = new THREE.Mesh(new THREE.PlaneGeometry(1900, 1150), arwWaterM(0x1A8A5A, 0.9));
sea.rotation.x = -Math.PI / 2;
sea.position.set(0, 0, S.sea - 575);
sea.renderOrder = 2;
G.add(sea);
ARW.water.push(sea);
var far = new THREE.Mesh(new THREE.RingGeometry(950, 7000, 48, 1), arwLam(0x1A7A5A));
far.rotation.x = -Math.PI / 2;
far.position.y = -0.2;
G.add(far);
[[-60, -950, 140, 1100], [260, -800, 60, 700]].forEach(function (q) { var c = new THREE.Mesh(new THREE.PlaneGeometry(q[2], q[3]), arwWaterM(0x0A4A3A, 0.95)); c.rotation.x = -Math.PI / 2; c.rotation.z = 0.3; c.position.set(q[0] + q[2] / 2, 0.05, S.sea - q[3] / 2 - 20); c.renderOrder = 3; G.add(c); });
var cols = [0x2AC88A, 0xE8C84A, 0x4A8AE8, 0xE85A4A, 0x3AB87A];
for (var i = 0; i < (lite ? 14 : 40); i++) {
var x = -800 + R() * 1600, z = S.sea - 30 - R() * 900;
if (H(x, z) > -2)
continue;
var p = new THREE.Mesh(arwGeo("pinn", function () { var g = new THREE.ConeGeometry(2.2, 6, 10, 1, true); g.translate(0, 3, 0); return g; }), arwLam(cols[i % 5], { op: 0.6 }));
p.position.set(x, -3, z);
G.add(p);
p.userData.y0 = -3;
p.userData.ph = R() * 6;
p.userData.kind = "float";
p.userData.amp = 3.4;
p.userData.f = 0.25 + R() * 0.2;
ARW.bob.push(p);
}
var tr = [];
for (var gx = -920; gx <= 920; gx += 56)
for (var gz = 330; gz <= 930; gz += 56) {
var x = gx + (R() - 0.5) * 26, z = gz + (R() - 0.5) * 26;
if (arwPathD(x, z, S.creek) < 20 || Math.hypot(x - 150, z - 470) < 16 || Math.abs(x) < 8 && z > 500)
continue;
tr.push({ x: x, z: z, y: H(x, z) - 1, s: 1.2 + R() * 0.4, ry: R() * 6 });
}
arwTPlant(G, "wombtree", tr, { keepAll: 1, col: 0x6A1A1A, leaf: 0xC83A6A });
tr.forEach(function (t) { arwRound(t.x, t.z, 3.4 * t.s, t.y - 2, t.y + 90); });
arwStrip(G, arwDense(S.creek, 4), 20, function () { return -0.05; }, arwWaterM(0x1A3A2A, 0.92), 0);
(function () {
var g = new THREE.Group();
g.position.set(196, 0.1, 384);
G.add(g);
for (var k = 0; k < 7; k++) {
var lg = new THREE.Mesh(arwGeo("rlog", function () { var c = new THREE.CylinderGeometry(0.18, 0.2, 5, 8); c.rotateX(Math.PI / 2); return c; }), arwS("bark", 0x5A4030, 2));
lg.position.set(-1.4 + k * 0.46, 0, 0);
g.add(lg);
}
g.userData.y0 = 0.1;
g.userData.ph = 0;
g.userData.kind = "float";
g.userData.amp = 0.06;
g.userData.f = 0.8;
ARW.bob.push(g);
})();
(function () { var x = 166, z = 432, y = H(x, z), t = new THREE.Mesh(arwGeo("plug", function () { return new THREE.CylinderGeometry(0.12, 0.12, 0.3, 8); }), arwS("bark", 0x2A1A10, 2)); t.rotation.x = Math.PI / 2; t.position.set(x, y + 1.4, z + 3.2); G.add(t); })();
arwTorHut(G, 150, 470, 0.4, { y: H(150, 470), r: 5, wall: arwS("bark", 0x6A3A2A, 3), roof: arwS("b:moss", 0x8A3A5A, 3) });
arwDoorTo(G, "shore", 0, 150 + Math.sin(0.4) * 5.2, 470 + Math.cos(0.4) * 5.2, 0.4, "The door of Polecrab's home", 10, 10, { col: 0x2A1A10, frame: arwS("bark", 0x4A2A1A, 2), y: H(150, 470) });
arwTRoom(G, "shore", 0, 10, 10, 3.6, { rock: "darkrock", floorCol: 0xD89A5A, out: { x: 150 + Math.sin(0.4) * 6.8, z: 470 + Math.cos(0.4) * 6.8, ry: 0.4 }, doorName: "The door, out to the forest", env: "glow" });
(function () { var A = arwInAt("shore", 0), g = new THREE.Group(); g.position.set(A.x, ARW_IN_Y, A.z); G.add(g); arwTFurnish(g, 10, 10, "home", 81); for (var k = 0; k < 3; k++)
arwBox(g, 1.6, 0.3, 0.8, arwLam(0x8A6A4A), -3 + k * 2, 0, -4); })();
arwCrowd("shf", lite ? 4 : 12, -500, 200, 500, 300, { dress: "arskin", dressF: "arskinf", women: 0.4, org: 1, eye3: 1, skins: [0x9A6A4A, 0xB87A5A, 0xC89A6A], wander: 30, sp: 0.5, names: ["A fisherman of the shore", "A woman gathering shells", "A man with a trained arg"], persona: "native",
says: ["The sea will not bear you here. Swim, if you must, but keep out of the currents.", "On moonlit nights you can hear Earthrid's music coming over from the island. Don't listen too long.", "Polecrab? Up the creek, at the bend, with his feet in the water. He always is."], talkP: 0.8 });
var bn = [];
for (i = 0; i < (lite ? 40 : 110); i++) {
var x = -260 + R() * 520, z = -780 + R() * 320;
var h = H(x, z);
if (h < 4)
continue;
bn.push({ x: x, z: z, y: h + 0.05, s: 0.6 + R() * 0.8, ry: R() * 6 });
}
arwInst(G, arwGeo("bone", function () { var g = new THREE.CylinderGeometry(0.04, 0.05, 0.6, 6); g.rotateZ(Math.PI / 2); g.translate(0, 0.05, 0); return g; }), arwLam(0xE8E0C8), bn, {});
arwInst(G, arwGeo("skull", function () { var g = new THREE.SphereGeometry(0.12, 10, 8); g.scale(1, 0.9, 1.2); g.translate(0.4, 0.1, 0.2); return g; }), arwLam(0xD8D0B0), bn.filter(function (b, k) { return k % 4 === 0; }), {});
(function () {
var L = S.lake, w = new THREE.Mesh(arwGeo("irontick", function () { var g = new THREE.CircleGeometry(42, 36); g.rotateX(-Math.PI / 2); return g; }), arwWaterM(0x3A4A6A, 0.9));
w.position.set(L[0], 36.3, L[1]);
w.renderOrder = 2;
G.add(w);
ARW.water.push(w);
ARW.shows.irontick = w;
w.userData.def = 1;
var cr = new THREE.Group();
cr.position.set(L[0], 0, L[1]);
G.add(cr);
var dk = new THREE.Mesh(arwGeo("crdark", function () { var g = new THREE.CircleGeometry(41, 30); g.rotateX(-Math.PI / 2); return g; }), arwLam(0x050304));
dk.position.y = 30;
cr.add(dk);
for (var k = 0; k < 24; k++) {
var a = k / 24 * 6.283, r = new THREE.Mesh(arwGeo("crrock", function () { return new THREE.DodecahedronGeometry(3, 0); }), arwTMat("blackrock"));
r.position.set(Math.cos(a) * 44, 34 + (k % 3), Math.sin(a) * 44);
r.rotation.set(k, k * 2, 0);
cr.add(r);
}
cr.visible = false;
ARW.shows.crater = cr;
})();
(function () { var g = new THREE.Mesh(arwGeo("mrad", function () { return new THREE.SphereGeometry(30, 20, 14); }), arwGlowM(0xFFFFF0, 0.16)); g.position.set(S.lake[0], 60, S.lake[1]); g.visible = false; G.add(g); ARW.shows.muspel = g; })();
(function () {
var g = new THREE.Group();
g.visible = false;
G.add(g);
ARW.shows.spouts = g;
for (var k = 0; k < 14; k++) {
var a = k * 2.4, r = 6 + (k % 5) * 7, s = new THREE.Mesh(arwGeo("lspout", function () { var c = new THREE.CylinderGeometry(0.3, 1.0, 6, 8, 1, true); c.translate(0, 3, 0); return c; }), arwLam(0xC8D8F0, { op: 0.5 }));
s.position.set(S.lake[0] + Math.cos(a) * r, 36, S.lake[1] + Math.sin(a) * r);
s.userData.y0 = 33;
s.userData.ph = k;
s.userData.kind = "float";
s.userData.amp = 3;
s.userData.f = 0.5;
g.add(s);
ARW.bob.push(s);
}
})();
var mtn = [];
for (i = 0; i < 14; i++)
mtn.push({ x: -2400 + i * 380, z: -3600 - (i % 3) * 200, y: 0, s: 6 + (i % 4) * 2, ry: i });
arwTPlant(G, "spire", mtn, { keepAll: 1, mat: arwLam(0xE8A08A) });
},
function (x, z) {
var M = ARW_MAT, n = arwFbm(x * 0.012, z * 0.012, 3);
if (z > M.sea)
return -6;
if (z > M.beach)
return 1 + (M.sea - z) * 0.04 + n;
var hills = 50 + n * 16;
if (z < M.head) {
return 140 + n * 10;
}
var d = arwPathD(x, z, M.stream), w = arwMatW(z), h = z < -100 ? 110 + n * 10 : hills;
var fl = 1 + n * 1.2 + (560 - z) * 0.03;
var t = arwSmooth(w, w + (z < -100 ? 8 : 60), d);
h = fl + (h - fl) * t;
if (d < (z < -100 ? 3 : 15))
h = fl - 0.6;
if (z > M.beach - 30) {
var gap = arwSmooth(40, 60, Math.abs(x));
h = Math.min(h, fl + gap * 30);
}
if (z < M.head + 30)
h = h + (140 - h) * arwSmooth(M.head + 30, M.head + 4, z);
return h;
},
function (G) {
var lite = arwLite(), H = arwMatH, R = wRand(7701), M = ARW_MAT;
arwTerrain(G, -800, -800, 1600, 1600, lite ? 14 : 8, H, arwTMat("mould"), function (x, z, y, c) {
var n = arwFbm(x * 0.02, z * 0.02, 3), d = arwPathD(x, z, M.stream);
if (z > M.beach - 4) {
c.setRGB(0.88, 0.78 + n * 0.08, 0.6 + n * 0.08);
return;
}
if (z < M.head + 6 && z > M.head - 30) {
c.setRGB(0.92 + n * 0.06, 0.9 + n * 0.06, 0.88 + n * 0.08);
return;
}
if (d < arwMatW(z) + 8 && y < 60) {
c.setRGB(0.3 + n * 0.1, 0.42 + n * 0.12, 0.24 + n * 0.08);
return;
}
c.setRGB(0.5 + n * 0.1, 0.42 + n * 0.08, 0.36 + n * 0.08);
});
arwSkyPut(G, { branch: [300, 1600, -200] });
var sea = new THREE.Mesh(new THREE.PlaneGeometry(1600, 400), arwWaterM(0x1A8A5A, 0.9));
sea.rotation.x = -Math.PI / 2;
sea.position.set(0, 0, M.sea + 200);
sea.renderOrder = 2;
G.add(sea);
ARW.water.push(sea);
var far = new THREE.Mesh(new THREE.RingGeometry(800, 7000, 48, 1), arwLam(0x6A5A4A));
far.rotation.x = -Math.PI / 2;
far.position.y = 30;
G.add(far);
(function () {
var x = 40, z = M.sea + 30, g = new THREE.Group();
g.position.set(x, -4, z);
G.add(g);
arwCyl(g, 0.9, 1.4, 14, arwS("bark", 0x3A4A3A, 2), 0, 0, 0, 10);
arwEll(g, arwSkinM("leather", 0x5A6A4A), 1.2, 1.0, 1.2, 0, 14.6, 0, 12);
for (var k = 0; k < 10; k++) {
var a = k / 10 * 6.283;
arwEye(g, Math.cos(a) * 1.15, 14.8, Math.sin(a) * 1.15, 0.14, 0xD8E8C8);
}
arwTPlant(g, "purpletree", [{ x: 0, z: 0, y: 3, s: 2.2, ry: 0 }, { x: 0, z: 0, y: 7, s: 1.8, ry: 2 }], { keepAll: 1 });
g.userData.y0 = -4;
g.userData.ph = 0;
g.userData.kind = "float";
g.userData.amp = 0.3;
g.userData.f = 0.4;
ARW.bob.push(g);
})();
var sp = arwDense(M.stream, 6);
arwStrip(G, sp.filter(function (p) { return p[1] > -100; }), 26, function (x, z) { return H(x, z) + 0.08; }, arwWaterM(0x3AA87A, 0.8), 0);
arwStrip(G, sp.filter(function (p) { return p[1] <= -100; }), 6, function (x, z) { return H(x, z) + 0.08; }, arwWaterM(0x6AE8A8, 0.75), 0);
var fl = function (x, z) { var d = arwPathD(x, z, M.stream); return z < M.beach - 40 && z > -100 && d > 16 && d < arwMatW(z) + 50 && Math.hypot(x - 110, z - 360) > 40; };
arwTPlant(G, "purpletree", arwScatter(7702, lite ? 140 : 420, -260, -100, 260, 520, fl, H, 0.6, 1.4));
arwTPlant(G, "jalebush", arwScatter(7703, lite ? 60 : 180, -260, -100, 260, 520, fl, H, 0.8, 1.6));
arwTPlant(G, "jalebush", arwScatter(7704, lite ? 60 : 180, -260, -100, 260, 520, fl, H, 0.8, 1.6), { ulfire: 1 });
arwTPlant(G, "crystree", arwScatter(7705, lite ? 30 : 90, -260, -100, 260, 520, fl, H, 0.6, 1.0));
arwPlant(G, "bush", arwScatter(7706, lite ? 80 : 240, -260, -100, 260, 520, fl, H, 0.6, 1.4), { col: 0x3AA84A });
arwPlant(G, "flowers", arwScatter(7707, lite ? 80 : 220, -260, -100, 260, 520, fl, H, 0.8, 1.3), { col: "#E84AA8" });
arwPlant(G, "rock", arwScatter(7708, lite ? 60 : 160, -60, -590, 60, -100, function (x, z) { var d = arwPathD(x, z, M.stream); return d > 3.5 && d < arwMatW(z); }, H, 0.8, 2.4), { mat: arwS("b:limestone", 0xC8C0B8, 2), keepAll: 1 });
arwAirballs(G, lite ? 10 : 30, -260, -100, 260, 500, H, 7709);
for (var i = 0; i < (lite ? 4 : 10); i++)
arwWaltzer(G, -120 + R() * 240, -60 + R() * 500, H);
(function () {
var x = -6, z = 272, g = new THREE.Group();
g.position.set(x, H(x, z), z);
G.add(g);
var sh = arwShine(0x8A3A2A, 0.3, 0.2);
arwEll(g, sh, 0.8, 0.5, 1.2, 0, 0.9, 0, 14);
arwEll(g, sh, 0.4, 0.3, 0.4, 0, 1.0, 1.2, 10);
arwEye(g, 0.16, 1.2, 1.5, 0.06, 0xE8C84A);
arwEye(g, -0.16, 1.2, 1.5, 0.06, 0xE8C84A);
for (var k = 0; k < 6; k++) {
var l = new THREE.Mesh(arwGeo("cleg", function () { var c = new THREE.CylinderGeometry(0.05, 0.07, 1.1, 6); c.translate(0, -0.55, 0); return c; }), sh);
l.position.set((k % 2 ? 1 : -1) * 0.6, 0.9, -0.7 + Math.floor(k / 2) * 0.7);
l.rotation.z = (k % 2 ? 1 : -1) * 0.7;
g.add(l);
}
arwRound(x, z, 1.2);
})();
(function () {
var c = new THREE.Mesh(new THREE.BoxGeometry(260, 140, 20), arwS("b:limestone", 0xF0ECE4, 6));
c.position.set(0, 70, M.head - 14);
G.add(c);
arwSolid(0, M.head - 14, 260, 20, -10, 140);
var h = new THREE.Mesh(arwGeo("mhole", function () { return new THREE.CircleGeometry(0.9, 14); }), arwLam(0x0A0A0A));
h.position.set(0, H(0, M.head + 6) + 2, M.head - 3.9);
G.add(h);
})();
var cones = [];
for (i = 0; i < 10; i++)
cones.push({ x: -2600 + i * 560, z: -3800 - (i % 3) * 260, y: 0, s: 7 + (i % 3) * 2, ry: i });
arwTPlant(G, "spire", cones, { keepAll: 1, mat: arwLam(0x8A7A8A) });
cones.forEach(function (c, k) { var b = new THREE.Mesh(arwGeo("lmass", function () { return new THREE.BoxGeometry(60, 40, 60); }), arwLam(0x7A6A7A)); b.position.set(c.x + (k % 2 ? 30 : -30), c.s * 30 + 10, c.z); b.rotation.z = (k % 2 ? 0.5 : -0.4); G.add(b); });
[[110, 350, 0.2], [140, 380, -0.8], [96, 392, 2.4]].forEach(function (q, k) {
var x = q[0], z = q[1], ry = q[2], y = H(x, z), r = 4;
arwTorHut(G, x, z, ry, { y: y, r: r, col: [0xD8C8A8, 0xC8B8A0, 0xE0D0B8][k], roofCol: [0x4A8A4A, 0x8A4A8A, 0x4A6A9A][k] });
var dx = x + Math.sin(ry) * (r + 0.2), dz = z + Math.cos(ry) * (r + 0.2);
arwDoorTo(G, "matter", k, dx, dz, ry, ["A Matterplay man's home", "The home of a family of Matterplay", "The house of a truthful old woman"][k], 8, 8, { col: 0x2A2A1A, frame: arwTMat("darkrock"), y: y });
arwTRoom(G, "matter", k, 8, 8, 3.4, { rock: "darkrock", out: { x: dx + Math.sin(ry) * 1.6, z: dz + Math.cos(ry) * 1.6, ry: ry }, doorName: "The door, out to the valley", env: "glow" });
var A = arwInAt("matter", k), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 8, 8, k === 1 ? "fruit" : "home", 90 + k);
});
arwCrowd("matm", lite ? 4 : 9, 60, 320, 180, 420, { dress: "arwhite", dressF: "arrobe", women: 0.45, org: 1, eye3: 1, skins: [0xE0D0C8, 0xD8C8B8, 0xC8B8A8], wander: 16, sp: 0.5, names: ["A man of Matterplay", "A woman of Matterplay", "A truthful boy"], persona: "You are one of the men or women of Matterplay on Tormance, Digrung's people: you say only what corresponds with the real events of the world; lies, even kind ones, are shameful to you.",
says: ["Here thoughts and words must correspond with the real events of the world. Say what is.", "Shapes come into the world here without parents. You will see one, if you watch the brook.", "Digrung? Joiwind's brother. He went to Ifdawn and has not come back."], talkP: 0.9 });
},
function (x, z) {
var n = arwFbm(x * 0.015, z * 0.015, 3);
if (z > 650)
return n * 3 + 60 * arwSmooth(650, 690, z);
if (z > 200)
return n * 4;
if (z > -200) {
var w = arwThW(z), fl = (200 - z) * 0.03;
return fl + n * 1.5 + 90 * arwSmooth(w, w + 22, Math.abs(x));
}
var cw = arwThCw(x);
if (z > -230)
return 12;
if (z > -230 - cw)
return (x > -664 && x < -656) ? 12 : -220;
if (z > -230 - cw - 20)
return 14;
return 140 + n * 10;
},
function (G) {
var lite = arwLite(), H = arwThH, R = wRand(8801);
arwTerrain(G, -700, -700, 1400, 1400, lite ? 12 : 7, H, arwMat("rock"), function (x, z, y, c) { var n = arwFbm(x * 0.03, z * 0.03, 3); var v = y < -40 ? 0.03 : 0.18 + n * 0.12 + (y > 20 ? 0.25 : 0); c.setRGB(v, v, v * 1.02); });
var roof = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), arwLam(0x1A1A1C));
roof.rotation.x = Math.PI / 2;
roof.position.y = 260;
G.add(roof);
var sh = arwScatter(8802, lite ? 14 : 34, -680, -700, 680, 640, function (x, z) { return (z > 220 && Math.abs(x) > 20) || z < -330; }, H, 1, 1);
arwInst(G, arwGeo("tshaft", function () { var g = new THREE.CylinderGeometry(9, 14, 280, 9, 8); var p = g.attributes.position, Rr = wRand(9); for (var i = 0; i < p.count; i++) {
var k = 1 + (Rr() - 0.5) * 0.3;
p.setX(i, p.getX(i) * k);
p.setZ(i, p.getZ(i) * k);
} g.translate(0, 130, 0); g.computeVertexNormals(); return g; }), arwLam(0xB8B8B4), sh, {});
sh.forEach(function (s) { arwRound(s.x, s.z, 12); });
arwStrip(G, arwDense([[-300, 640], [-100, 500], [60, 380], [30, 240], [0, 200]], 6), 4, function (x, z) { return H(x, z) + 0.08; }, arwWaterM(0xD8D8E0, 0.7), 0);
arwStrip(G, arwDense([[0, 60], [0, -150], [0, -214]], 4), 2.4, function (x, z) { return H(x, z) + 0.08; }, arwWaterM(0xD8D8E0, 0.7), 0);
(function () { var bridge = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, cwA() + 4), arwWaterM(0xD8D8E0, 0.75)); function cwA() { return arwThCw(0); } bridge.position.set(0, 11.8, -230 - arwThCw(0) / 2); G.add(bridge); })();
var rt = arwScatter(8803, lite ? 40 : 120, -500, 220, 400, 640, function (x, z) { return arwPathD(x, z, [[-300, 640], [-100, 500], [60, 380], [30, 240], [0, 200]]) < 30; }, H, 0.8, 1.6);
arwInst(G, arwGeo("rtree", function () { var parts = [], Rr = wRand(17); var t = new THREE.CylinderGeometry(0.3, 0.5, 5, 7); t.translate(0, 2.5, 0); parts.push(t.toNonIndexed()); for (var i = 0; i < 9; i++) {
var b = new THREE.CylinderGeometry(0.04, 0.14, 5 + Rr() * 3, 5);
b.translate(0, 2.5, 0);
b.rotateZ(2.2 + Rr() * 0.6);
b.rotateY(i / 9 * 6.283);
b.translate(0, 5, 0);
parts.push(b.toNonIndexed());
} return gwMerge(parts); }), arwLam(0xE8E8E4), rt, {});
for (var i = 0; i < 3; i++) {
(function (k) {
var x = -616 + k * 16, z = -230 - arwThCw(-600) - 10, y = 14, g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var st = arwS("b:limestone", 0xC8C8C4, 3);
arwBox(g, 3.0, 4.4, 1.8, st, 0, 0, 0);
arwBox(g, 3.4, 4.2, 2.0, st, 0, 4.4, 0);
arwBox(g, 1.0, 0.9, 1.0, st, 0, 8.6, 0);
arwEll(g, st, 1.0, 1.2, 1.0, 0, 10.4, 0, 10);
arwBox(g, 0.9, 4.6, 0.9, st, -2.1, 3.6, 0);
arwBox(g, 0.9, 4.6, 0.9, st, 2.1, 3.6, 0);
var glow = new THREE.Mesh(arwGeo("figglow", function () { return new THREE.SphereGeometry(7, 16, 12); }), arwGlowM([0xFFB8A0, 0xFFD870, 0xE8E8FF][k], 0.22));
glow.position.y = 7;
g.add(glow);
glow.visible = false;
ARW.shows["fig" + k] = glow;
})(i);
}
(function () { var x = -660, cw = arwThCw(x); var b = new THREE.Mesh(new THREE.BoxGeometry(8, 2, cw + 2), arwMat("rock")); b.position.set(x, 11, -230 - cw / 2); G.add(b); arwFloor(x, -230 - cw / 2, 8, cw + 2, 12); })();
arwCaveMouth(G, -660, -316, 0, { y: 14, mat: arwMat("rock") });
[[-120, 656], [-160, 656]].forEach(function (q, k) {
arwDoorTo(G, "threal", k, q[0], q[1] - 2, Math.PI, ["A pilgrim's cell in the rock wall", "An old hermit's cell"][k], 8, 8, { col: 0x0A0A0A, frame: arwMat("rock"), y: H(q[0], q[1] - 2) });
arwBox(G, 10, 8, 6, arwMat("rock"), q[0], H(q[0], q[1]) - 1, q[1] + 1.2, 0, true);
arwTRoom(G, "threal", k, 8, 8, 3.4, { rock: "darkrock", floorCol: 0x8A8A88, out: { x: q[0], z: q[1] - 5, ry: Math.PI }, doorName: "The door, out to the airlit plain", env: "airlit" });
var A = arwInAt("threal", k), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 8, 8, "poor", 100 + k);
});
arwCrowd("thr", lite ? 4 : 10, -260, 420, 200, 640, { dress: "arrobem", dressF: "arrobe", women: 0.4, org: 1, skins: [0xC8C8C4, 0xB8B8B4, 0xD8D8D4], wander: 20, sp: 0.35, names: ["A pilgrim of Threal", "A dying man come to Threal", "A woman praying to Thire"], persona: "You are a pilgrim in Threal, the airlit land under the ground on Tormance, where Thire is worshipped and where many come to die. You speak in a low voice, as in a cathedral.",
says: ["Lower your voice. Here there are no shadows, and no colours.", "Corpang has walked these plains for a lifetime, seeking Thire.", "They come from Matterplay and from everywhere, to die here."], talkP: 0.9 });
},
function (x, z) {
var n = arwFbm(x * 0.012, z * 0.012, 3);
if (z > 300) {
var d = Math.hypot(x - 60, z - 720);
return n * 3 + (z - 300) * 0.02 + 14 * (1 - arwSmooth(8, 22, d));
}
var shelf = 200 + 20 * Math.max(0, Math.min(1, (x + 200) / 500));
if (z > 230) {
if (x > -206 && x < -194 && z < 242)
return 200;
var t = arwSmooth(230, 300, z);
return shelf * (1 - t) + (n * 3 + (z - 300) * 0.02) * t - n * 6 * Math.sin(t * 3.14);
}
if (Math.abs(x - 300) < 6 && z <= 230 && z > 150)
return 220 + 40 * Math.max(0, Math.min(1, (228 - z) / 78));
if (z > 210)
return shelf + n * 0.4;
if (z > 190)
return shelf + (260 - shelf) * arwSmooth(210, 204, z) + n * 2;
var b = arwLichBase(z), c = arwLichC(z), w = arwLichW(z), e = Math.abs(x - c);
return b + n * (z < -290 && z > -390 ? 1.2 : 3) - 420 * arwSmooth(w, w + 50, e);
},
function (G) {
var lite = arwLite(), H = arwLichH, R = wRand(9901);
arwTerrain(G, -900, -900, 1800, 1800, lite ? 14 : 8, H, arwTMat("mould"), function (x, z, y, c) {
var n = arwFbm(x * 0.03, z * 0.03, 3);
if (z > 300) {
c.setRGB(0.42 + n * 0.1, 0.3 + n * 0.08, 0.4 + n * 0.08);
return;
}
if (z > 230 || y < 150) {
c.setRGB(0.14 + n * 0.06, 0.13 + n * 0.05, 0.16 + n * 0.06);
return;
}
if (z < -290 && z > -390) {
c.setRGB(0.24 + n * 0.08, 0.32 + n * 0.08, 0.18 + n * 0.06);
return;
}
if (z > 60 && z < 190) {
c.setRGB(0.28 + n * 0.1, 0.5 + n * 0.12, 0.34 + n * 0.08);
return;
}
if (n > 0.62) {
c.setRGB(0.08, 0.08, 0.1);
return;
}
c.setRGB(0.5 + n * 0.12, 0.86 + n * 0.1, 0.58 + n * 0.1);
});
arwSkyPut(G, { branch: [-1700, 220, 200], moon: [200, 900, 1400] });
var far = new THREE.Mesh(new THREE.RingGeometry(900, 7000, 48, 1), arwLam(0x1A1A2A));
far.rotation.x = -Math.PI / 2;
far.position.y = -60;
G.add(far);
var cones = [];
for (var i = 0; i < (lite ? 12 : 22); i++) {
var a = i / 22 * 6.283, r = 1300 + (i % 4) * 260;
cones.push({ x: Math.cos(a) * r, z: Math.sin(a) * r - 200, y: -120, s: 9 + (i % 3) * 3, ry: i });
}
cones.push({ x: 300, z: -1900, y: -120, s: 24, ry: 0 });
arwTPlant(G, "spire", cones, { keepAll: 1, mat: arwLam(0x6A8A72) });
cones.forEach(function (c, k) {
var b = new THREE.Mesh(arwGeo("lcap" + (k % 4), function () { return k % 4 === 0 ? new THREE.BoxGeometry(70, 36, 50) : k % 4 === 1 ? new THREE.ConeGeometry(40, 70, 6) : k % 4 === 2 ? new THREE.SphereGeometry(34, 10, 8) : new THREE.TorusGeometry(30, 10, 6, 10); }), arwLam(0x8AC89A));
b.position.set(c.x + (k % 2 ? 34 : -34), c.y + c.s * 30 + 20, c.z);
b.rotation.z = (k % 2 ? 0.55 : -0.45);
b.rotation.x = (k % 3 - 1) * 0.3;
G.add(b);
});
(function () { var g = new THREE.Group(); g.position.set(-1100, -120, -500); G.add(g); var m = arwLam(0x14141A); arwCyl(g, 6, 40, 700, m, 0, 0, 0, 8); var h = new THREE.Mesh(new THREE.TorusGeometry(40, 6, 6, 12, Math.PI * 0.7), m); h.position.set(30, 700, 0); g.add(h); })();
arwPlant(G, "rock", arwScatter(9902, lite ? 16 : 40, 40, 700, 80, 740, function (x, z) { return Math.hypot(x - 60, z - 720) < 18; }, H, 2, 5), { mat: arwTMat("darkrock"), keepAll: 1 });
arwTPlant(G, "pgrass", arwScatter(9903, lite ? 120 : 360, -600, 320, 600, 880, null, H, 0.8, 1.4));
arwTPlant(G, "blacktree", arwScatter(9904, lite ? 20 : 60, -600, 360, 600, 880, function (x, z) { return Math.hypot(x - 60, z - 720) > 30 && Math.hypot(x, z - 840) > 20; }, H, 0.8, 1.4));
arwCaveMouth(G, 0, 860, Math.PI, { y: H(0, 860), mat: arwTMat("darkrock") });
function boat(x, y, z, ry, key) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var sk = arwSkinM("leather", 0x8A6A48);
arwBox(g, 1.3, 0.7, 3.0, sk, 0, 0, 0.4);
arwBox(g, 0.9, 0.7, 1.8, sk, 0, 0, -1.9);
arwBox(g, 0.4, 0.7, 1.0, sk, 0, 0, -3.2);
arwBox(g, 0.2, 0.3, 0.6, arwSkinM("leather", 0x6A5A4A), 0.2, 0.5, 0.6);
arwEll(g, arwSkinM("fur", 0x7A6A5A), 0.5, 0.35, 0.8, 0, 0.5, 1.0, 10);
var st = new THREE.Mesh(arwGeo("mstone", function () { return new THREE.OctahedronGeometry(0.25); }), arwGlowM(0x8AB8FF));
st.position.set(0, -0.5, 0);
g.add(st);
var pole = new THREE.Mesh(arwGeo("mpole", function () { return new THREE.CylinderGeometry(0.04, 0.04, 1.6, 6); }), arwLam(0x4A3A2A));
pole.position.set(0, 1.0, -3.4);
g.add(pole);
var st2 = st.clone();
st2.position.set(0, 1.85, -3.4);
g.add(st2);
var haze = new THREE.Mesh(arwGeo("mhaze", function () { return new THREE.SphereGeometry(1.6, 12, 8); }), arwGlowM(0x4A7AE8, 0.12));
haze.position.y = -0.8;
haze.scale.set(1, 0.4, 2.2);
g.add(haze);
g.userData.def = 0;
g.visible = false;
ARW.shows[key] = g;
g.userData.y0 = y;
g.userData.ph = key.length;
g.userData.kind = "float";
g.userData.amp = 0.25;
g.userData.f = 0.5;
ARW.bob.push(g);
}
boat(74, 13, 724, 0.6, "boat1");
boat(-190, 200.8, 250, 0.2, "boat2");
var snowM = arwS("b:marble", 0xA8F0B8, 4);
arwBox(G, 12, 2, 12, snowM, -200, 199, 236);
arwCaveMouth(G, -200, 210, 0, { y: 200, mat: arwTMat("darkrock") });
arwDoorTo(G, "lich", 0, -200, 211, 0, "Haunte's cave", 8, 8, { col: 0x050508, frame: arwTMat("darkrock"), y: 200 });
arwTRoom(G, "lich", 0, 14, 9, 4, { rock: "darkrock", floorCol: 0x4A4440, out: { x: -170, z: 220, ry: Math.PI / 2 }, doorName: "The far door, out to the ledge", env: "glow" });
(function () {
var A = arwInAt("lich", 0), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 14, 9, "hunter", 120);
for (var k = 0; k < 6; k++)
arwEll(g, arwSkinM("leather", 0x7A4A2A), 0.18, 0.28, 0.12, -5 + k * 0.6, 2.6, -4.2, 8);
for (k = 0; k < 3; k++)
arwEll(g, arwSkinM("leather", 0x5A3A1A), 0.35, 0.45, 0.35, 5.6, 0.45, -3.4 + k * 0.8, 8);
for (k = 0; k < 2; k++) {
var sp = new THREE.Mesh(arwGeo("lspear", function () { return new THREE.CylinderGeometry(0.03, 0.03, 2.2, 5); }), arwLam(0x5A4A3A));
sp.position.set(6.6, 1.1, 1 + k * 0.5);
sp.rotation.z = 0.15;
g.add(sp);
var hd = new THREE.Mesh(arwGeo("lspearh", function () { return new THREE.OctahedronGeometry(0.12); }), arwGlowM(0xC8E8FF, 0.8));
hd.position.set(6.75, 2.25, 1 + k * 0.5);
hd.scale.y = 2;
g.add(hd);
}
var ms = new THREE.Mesh(arwGeo("mstone", function () { return new THREE.OctahedronGeometry(0.25); }), arwGlowM(0x8AB8FF));
ms.position.set(0, 0.3, 4);
g.add(ms);
})();
arwPlant(G, "rock", arwScatter(9905, lite ? 20 : 60, -300, 190, 700, 232, function (x, z) { return Math.abs(x - 300) > 8 && (z < 206 || z > 228); }, H, 0.6, 1.6), { mat: arwTMat("darkrock") });
var top = function (x, z) { return z < 186 && z > -30 && Math.hypot(x - 358, z - 106) > 16 && Math.hypot(x - 90, z - 110) > 30 && Math.abs(x - arwLichC(z)) < arwLichW(z) - 10; };
arwTPlant(G, "jalebush", arwScatter(9906, lite ? 50 : 150, -400, -30, 750, 186, top, H, 0.8, 1.4), { ulfire: 1 });
arwTPlant(G, "crystree", arwScatter(9907, lite ? 20 : 60, -400, -30, 750, 186, top, H, 0.6, 1.0));
arwTPlant(G, "pgrass", arwScatter(9908, lite ? 100 : 300, -400, 40, 750, 186, top, H, 0.8, 1.3));
(function () {
var x = 366, z = 104, g = new THREE.Group();
g.position.set(x, H(x, z) - 0.3, z);
G.add(g);
var bm = arwGlowM(0xE8C8A8, 0.9), Rr = wRand(77);
arwCyl(g, 1.0, 1.6, 7, arwS("bark", 0x3A2A2A, 2), 0, 0, 0, 10);
for (var k = 0; k < 14; k++) {
var b = new THREE.Mesh(arwGeo("lbr", function () { var c = new THREE.CylinderGeometry(0.08, 0.3, 7, 6); c.translate(0, 3.5, 0); return c; }), bm);
b.position.y = 6;
b.rotation.z = 0.6 + Rr() * 0.6;
b.rotation.y = k / 14 * 6.283;
b.rotation.order = "YZX";
g.add(b);
for (var f = 0; f < 3; f++) {
var L = 2.5 + f * 1.7, a = b.rotation.z, yy = 6 + Math.cos(a) * L, rr = Math.sin(a) * L;
var fr = new THREE.Mesh(arwGeo("lfruit", function () { return new THREE.SphereGeometry(0.28, 10, 8); }), arwGlowM(0xE83A2A, 0.95));
fr.position.set(Math.sin(b.rotation.y) * rr, yy - 0.5, Math.cos(b.rotation.y) * rr);
fr.scale.y = 1.3;
g.add(fr);
}
}
arwRound(x, z, 1.6);
})();
[[78, 96, 0.8], [104, 124, -0.6], [70, 132, 2.6]].forEach(function (q, k) {
var x = q[0], z = q[1], ry = q[2], y = H(x, z), r = 4;
arwTorHut(G, x, z, ry, { y: y, r: r, col: [0x4A4A50, 0x3A3A40, 0x5A5A5A][k], roofCol: [0x6AA87A, 0x5A8A6A, 0x7AB88A][k] });
var dx = x + Math.sin(ry) * (r + 0.2), dz = z + Math.cos(ry) * (r + 0.2);
arwDoorTo(G, "lich", k + 1, dx, dz, ry, ["A hunter's stone hut", "The hut of a woman of Lichstorm", "An old man's hut on the heights"][k], 8, 8, { col: 0x0A0A0A, frame: arwTMat("darkrock"), y: y });
arwTRoom(G, "lich", k + 1, 8, 8, 3.4, { rock: "darkrock", out: { x: dx + Math.sin(ry) * 1.6, z: dz + Math.cos(ry) * 1.6, ry: ry }, doorName: "The door, out onto the heights", env: "glow" });
var A = arwInAt("lich", k + 1), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 8, 8, k === 0 ? "hunter" : "home", 130 + k);
});
arwPlant(G, "rock", arwScatter(9909, lite ? 40 : 120, 0, -640, 600, -40, function (x, z) { return Math.abs(x - arwLichC(z)) < arwLichW(z) - 6 && Math.hypot(x - 300, z - (-660)) > 14; }, H, 1, 3), { mat: arwLam(0x101014) });
arwTPlant(G, "preeds", arwScatter(9910, lite ? 60 : 180, 100, -390, 500, -290, function (x, z) { return Math.abs(x - 300) < arwLichW(z) - 6; }, H, 0.8, 1.4));
arwPlant(G, "rock", [{ x: 396, z: -414, y: H(396, -414), s: 3.5, ry: 0 }], { mat: arwTMat("darkrock"), keepAll: 1 });
arwRound(396, -414, 2.6);
for (i = 0; i < 5; i++) {
var tb = new THREE.Mesh(new THREE.BoxGeometry(160, 8, 40), arwTMat("darkrock"));
tb.position.set(520 + i * 40, 170 - i * 40, -410);
G.add(tb);
}
for (i = 0; i < 30; i++) {
var px = 300 - 290 + i * 20, pz = -720 + (R() - 0.5) * 4, py = H(px, pz), post = new THREE.Mesh(arwGeo("lpost", function () { return new THREE.BoxGeometry(2.4, 11, 1.6); }), arwS("b:limestone", 0x9A9AA0, 2));
post.position.set(px, py + 5, pz);
post.rotation.z = (i % 4 === 1 ? 0.22 : i % 5 === 2 ? -0.18 : 0) * (R() + 0.3);
post.rotation.y = (R() - 0.5) * 0.2;
G.add(post);
arwRound(px, pz, 1.3);
}
(function () {
var g = new THREE.Group();
g.position.set(300, 330, -900);
G.add(g);
var a = new THREE.Mesh(new THREE.SphereGeometry(260, 24, 16), arwGlowM(0xF4F4F0, 0.35));
a.scale.set(1.6, 0.7, 0.6);
g.add(a);
var b = new THREE.Mesh(new THREE.SphereGeometry(160, 24, 16), arwGlowM(0xFFFFFF, 0.5));
b.scale.set(1.6, 0.6, 0.5);
g.add(b);
g.userData.def = 0;
g.visible = false;
ARW.shows.muspel = g;
})();
arwCrowd("lichm", lite ? 4 : 8, 40, 40, 240, 180, { dress: "arfur", dressF: "arsullen", women: 0.4, org: 1, skins: [0xC8A890, 0xB89880, 0xD8B8A8], wander: 16, sp: 0.45, names: ["A hunter of Lichstorm", "A woman of Lichstorm", "A hill-man of Sarclash"], persona: "You are one of the hill-folk of Lichstorm on Tormance, where the sexes are pure and passion is hard: men and women there keep apart and are wary of each other. You live on the heights of Sarclash and hunt in Matterplay. You speak bluntly.",
says: ["Mind the lich wind. It makes men foolish.", "Haunte flies to Matterplay in his boat of skins, on his male stones.", "Beyond the Mornstab Pass is Barey, and then the sea."], talkP: 0.9 });
arwCrowd("lichp", lite ? 3 : 5, -200, 600, 200, 820, { dress: "arrobem", dressF: "arrobe", women: 0.4, org: 1, skins: [0xC8C8C4, 0xB8B8B4], wander: 20, sp: 0.4, names: ["A pilgrim bound for Threal", "A traveller from Matterplay"], persona: "You are a traveller on the rising plain below the mountains of Lichstorm on Tormance, on your way to Threal, the airlit land under the ground.",
says: ["The peaks have changed colour. The lich wind is coming.", "Threal is under that hill. Go softly there.", "Passion keeps those peaks from falling, they say."], talkP: 0.9 });
},
function (x, z) {
var n = arwFbm(x * 0.012, z * 0.012, 3), ax = Math.abs(x);
if (z > 380) {
var t = Math.min(1, (z - 380) / 240), s = Math.floor(t * 10) / 10, h = 150 + 150 * (s * 0.75 + t * 0.25) + n * 4 + 130 * arwSmooth(150, 200, ax) * t;
if (Math.hypot(x - 30, z - 520) < 6)
h -= 1.2;
return h;
}
if (z > 200) {
var b = 150 - 10 * (380 - z) / 180;
return b + n * 2 + 12 * arwSmooth(250, 330, ax) - 3 * (1 - arwSmooth(14, 22, Math.abs(x + 90)));
}
if (z > 185)
return 140 - 20 * arwSmooth(200, 188, z) + n * 2;
if (z > 60)
return 120 - 10 * (185 - z) / 125 + n * 2 - 0.8 * (1 - arwSmooth(2, 5, Math.abs(x - 20)));
if (z > -200)
return 110 - 107 * arwSmooth(60, -200, z) + n * 2;
if (z > -470) {
if (ax < 160)
return -2 + n * 0.6;
return 2 + n * 1.5;
}
return -10;
},
function (G) {
var lite = arwLite(), H = arwBarH, R = wRand(6601);
arwTerrain(G, -620, -620, 1240, 1240, lite ? 12 : 7, H, arwTMat("mould"), function (x, z, y, c) {
var n = arwFbm(x * 0.03, z * 0.03, 3);
if (z > 380) {
c.setRGB(0.36 + n * 0.1, 0.26 + n * 0.08, 0.2 + n * 0.06);
return;
}
if (z < -200 && y < 0) {
c.setRGB(0.3, 0.26, 0.22);
return;
}
if (z < 60 && z > -200) {
c.setRGB(0.5 + n * 0.1, 0.32 + n * 0.08, 0.36 + n * 0.08);
return;
}
c.setRGB(0.4 + n * 0.1, 0.3 + n * 0.08, 0.24 + n * 0.06);
});
arwSkyPut(G, { branch: [-200, 600, 1700], alp: [0, 40, -1700] });
if (ARW.alp) {
ARW.alp.userData.def = 0;
ARW.alp.visible = false;
ARW.shows.alp = ARW.alp;
}
var sea = new THREE.Mesh(new THREE.PlaneGeometry(1240, 420), arwWaterM(0x3A5A8A, 0.9));
sea.rotation.x = -Math.PI / 2;
sea.position.set(0, 0, -410);
sea.renderOrder = 2;
G.add(sea);
ARW.water.push(sea);
arwStrip(G, arwDense([[-90, 376], [-90, 202]], 6), 30, function (x, z) { return arwBarW(-90, z) + 0.05; }, arwWaterM(0x6A8AB8, 0.85), 0);
var far = new THREE.Mesh(new THREE.RingGeometry(620, 7000, 48, 1), arwWaterM(0x2A4A7A, 0.95));
far.rotation.x = -Math.PI / 2;
far.position.y = -0.2;
G.add(far);
var cones = [];
for (var i = 0; i < 12; i++)
cones.push({ x: -1800 + i * 330, z: 1500 + (i % 3) * 240, y: -120, s: 10 + (i % 3) * 3, ry: i });
arwTPlant(G, "spire", cones, { keepAll: 1, mat: arwLam(0x6A8A72) });
arwEll(G, arwS("sand", 0x4A3020, 2), 2.2, 0.4, 1.0, -8, H(-8, 566) + 0.1, 566, 10);
arwBox(G, 0.6, 0.08, 1.4, arwTMat("darkrock"), -5, H(-5, 568) + 0.3, 568, 0.4);
(function () {
var p = new THREE.Mesh(new THREE.CircleGeometry(5, 20), arwWaterM(0x8AC8C8, 0.8));
p.rotation.x = -Math.PI / 2;
p.position.set(30, H(30, 520) + 1.0, 520);
G.add(p);
for (var k = 0; k < 5; k++) {
var s = new THREE.Mesh(arwGeo("steam", function () { return new THREE.SphereGeometry(1.6, 10, 8); }), arwGlowM(0xF0F0F0, 0.12));
s.position.set(28 + k * 0.8, H(30, 520) + 2 + k * 1.4, 520 + k * 0.3);
s.scale.set(1 + k * 0.3, 0.7, 1 + k * 0.3);
G.add(s);
}
})();
arwPlant(G, "rock", arwScatter(6602, lite ? 40 : 120, -150, 380, 150, 600, function (x, z) { return Math.hypot(x, z - 560) > 10 && Math.hypot(x - 30, z - 520) > 8 && Math.abs(x) > 8; }, H, 1, 3), { mat: arwTMat("darkrock") });
arwPlant(G, "tree", arwScatter(6603, lite ? 60 : 180, -60, 200, 200, 378, function (x, z) { return Math.abs(x + 40) > 6; }, H, 0.6, 0.9), { col: 0x7A3A6A });
arwPlant(G, "tree", arwScatter(6604, lite ? 80 : 240, -200, 62, 250, 184, function (x, z) { return Math.abs(x - 20) > 5; }, H, 0.8, 1.2), { col: 0x6A3A7A });
arwPlant(G, "tree", arwScatter(6605, lite ? 90 : 280, -300, -196, 300, 58, function (x, z) { return Math.abs(x) > 6; }, H, 1.0, 1.5), { col: 0xE8A0B0 });
arwPlant(G, "tree", arwScatter(6606, lite ? 50 : 150, -600, -470, 600, -200, function (x, z) { return Math.abs(x) > 170 && Math.hypot(x - 200, z + 280) > 30; }, H, 0.7, 1.1), { col: 0x7A3A6A });
arwTPlant(G, "preeds", arwScatter(6607, lite ? 60 : 180, -170, -470, 170, -200, function (x, z) { return Math.abs(x) > 130 || z > -216; }, function (x, z) { return 0; }, 0.8, 1.3));
for (i = 0; i < 6; i++) {
var f = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 20), arwWaterM(0xE8F0F8, 0.7));
f.position.set(-100 + i * 4, 130, 200);
G.add(f);
}
function raft(x, z, key, def) {
var g = new THREE.Group();
g.position.set(x, 0, z);
G.add(g);
var m = new THREE.Mesh(arwGeo("peat", function () { var s = new THREE.CylinderGeometry(1, 1, 0.8, 16); s.scale(2.4, 1, 1.2); return s; }), arwS("sand", 0x8A6A4A, 2));
m.position.y = 0.05;
m.rotation.y = Math.PI / 2;
g.add(m);
g.userData.def = def;
g.visible = !!def;
ARW.shows[key] = g;
arwFloor(x, z, 2.2, 4.6, 0.45);
g.userData.y0 = 0;
g.userData.ph = x;
g.userData.kind = "float";
g.userData.amp = 0.08;
g.userData.f = 0.3;
ARW.bob.push(g);
}
raft(0, -214, "raft1", 1);
raft(0, -540, "raft2", 0);
raft(-300, -586, "raft3", 0);
raft(-60, -232, "raft4", 1);
raft(46, -240, "raft5", 1);
[[200, -270, -1.5], [214, -300, -1.6], [190, -312, -1.2]].forEach(function (q, k) {
var x = q[0], z = q[1], ry = q[2], y = H(x, z), r = 4;
arwTorHut(G, x, z, ry, { y: y, r: r, col: [0xC8A88A, 0xB89880, 0xD8B898][k], roofCol: [0x7A3A6A, 0x6A4A7A, 0x8A4A6A][k] });
var dx = x + Math.sin(ry) * (r + 0.2), dz = z + Math.cos(ry) * (r + 0.2);
arwDoorTo(G, "barey", k, dx, dz, ry, ["A lake-fisher's home", "The home of a family of Barey", "An old boatwoman's house"][k], 8, 8, { col: 0x2A1A1A, frame: arwTMat("darkrock"), y: y });
arwTRoom(G, "barey", k, 8, 8, 3.4, { rock: "darkrock", out: { x: dx + Math.sin(ry) * 1.6, z: dz + Math.cos(ry) * 1.6, ry: ry }, doorName: "The door, out to the lakes", env: "glow" });
var A = arwInAt("barey", k), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
arwTFurnish(g, 8, 8, k === 1 ? "fruit" : "home", 150 + k);
});
(function () {
var g = new THREE.Group();
G.add(g);
var w = new THREE.Mesh(new THREE.BoxGeometry(1240, 400, 4), arwLam(0x030305));
w.position.set(0, 190, -598);
g.add(w);
var gate = new THREE.Mesh(new THREE.PlaneGeometry(6, 10), arwGlowM(0xFFF4E0, 0.95));
gate.position.set(-300, 5, -595.9);
g.add(gate);
var halo = new THREE.Mesh(new THREE.PlaneGeometry(26, 30), arwGlowM(0xFFE8C8, 0.18));
halo.position.set(-300, 8, -595.8);
g.add(halo);
arwBox(g, 10, 0.6, 4, arwTMat("blackrock"), -300, 0.3, -593);
var tw = new THREE.Mesh(new THREE.BoxGeometry(5, 52, 5), arwTMat("blackrock"));
tw.position.set(-300, 14, -610);
g.add(tw);
for (var k = 0; k < 4; k++) {
var px = k < 2 ? 0 : (k === 2 ? -2.4 : 2.4), pz = k < 2 ? (k ? 2.4 : -2.4) : 0;
arwBox(g, k < 2 ? 5 : 0.3, 0.9, k < 2 ? 0.3 : 5, arwTMat("blackrock"), -300 + px, 40, -610 + pz);
}
g.userData.def = 0;
g.visible = false;
ARW.shows.wall = g;
})();
arwSolid(0, -598, 1240, 4, -50, 400);
arwFloor(-300, -593, 10, 4, 0.6);
arwFloor(-300, -610, 4.6, 4.6, 40);
arwDoorTo(G, "barey", 4, -300, -594.5, 0, "The doorway of Muspel", 6, 6, { col: 0xFFF0D8, frame: arwTMat("blackrock"), y: 0.6, msg: "🌑 <b>Through the gateway.</b> The light vanishes; all is dark and quiet." });
var vis = [function (x, W, Hh) { x.fillStyle = "#06060A"; x.fillRect(0, 0, W, Hh); x.strokeStyle = "rgba(120,120,140,.25)"; for (var r = 10; r < W; r += 14) {
x.beginPath();
x.arc(W / 2, Hh / 2, r, 0, 6.283);
x.stroke();
} },
function (x, W, Hh) { x.fillStyle = "#08060A"; x.fillRect(0, 0, W, Hh); for (var r = 8; r < W; r += 10) {
x.strokeStyle = r % 20 ? "rgba(160,60,60,.3)" : "rgba(200,200,220,.2)";
x.beginPath();
x.arc(W / 2, Hh / 2, r, 0, 6.283);
x.stroke();
} },
function (x, W, Hh) {
var Rr = wRand(3);
x.fillStyle = "#04040A";
x.fillRect(0, 0, W, Hh);
var g = x.createRadialGradient(W / 2, Hh / 2, 10, W / 2, Hh / 2, W * 0.45);
g.addColorStop(0, "#E8E8F0");
g.addColorStop(1, "#3A3A4A");
x.fillStyle = g;
x.beginPath();
x.arc(W / 2, Hh / 2, W * 0.45, 0, 6.283);
x.fill();
for (var i = 0; i < 40; i++) {
x.strokeStyle = "rgba(255,255,255,.5)";
x.beginPath();
x.arc(W * (0.15 + Rr() * 0.7), Hh * (0.15 + Rr() * 0.7), 6 + Rr() * 14, 0, 5);
x.stroke();
}
for (i = 0; i < 500; i++) {
x.fillStyle = "#3AE86A";
x.fillRect(W * (0.12 + Rr() * 0.76), Hh * (0.12 + Rr() * 0.76), 1 + Rr() * 2, 1 + Rr() * 2);
}
},
function (x, W, Hh) {
var Rr = wRand(4);
x.fillStyle = "#04040A";
x.fillRect(0, 0, W, Hh);
var g = x.createRadialGradient(W / 2, Hh / 2, 10, W / 2, Hh / 2, W * 0.45);
g.addColorStop(0, "#5A8AC8");
g.addColorStop(0.6, "#4A7A3A");
g.addColorStop(1, "#6A5A4A");
x.fillStyle = g;
x.beginPath();
x.arc(W / 2, Hh / 2, W * 0.45, 0, 6.283);
x.fill();
for (var i = 0; i < 60; i++) {
x.fillStyle = ["#8A6A4A", "#3A8A3A", "#C8C8C8", "#2A5AA8"][i % 4];
x.fillRect(W * (0.2 + Rr() * 0.6), Hh * (0.2 + Rr() * 0.6), 3 + Rr() * 8, 3 + Rr() * 8);
}
for (i = 0; i < 300; i++) {
x.fillStyle = "#3AE86A";
x.fillRect(W * (0.15 + Rr() * 0.7), Hh * (0.15 + Rr() * 0.7), 1 + Rr() * 3, 1 + Rr() * 3);
}
},
function (x, W, Hh) { x.fillStyle = "#04040A"; x.fillRect(0, 0, W, Hh); var g = x.createRadialGradient(W * 0.62, Hh / 2, 10, W * 0.62, Hh / 2, W * 0.32); g.addColorStop(0, "#C8D8C8"); g.addColorStop(1, "#2A3A3A"); x.fillStyle = g; x.beginPath(); x.arc(W * 0.62, Hh / 2, W * 0.32, 0, 6.283); x.fill(); x.fillStyle = "rgba(80,70,90,.55)"; x.beginPath(); x.ellipse(W * 0.32, Hh / 2, W * 0.2, Hh * 0.42, 0, 0, 6.283); x.fill(); x.fillStyle = "rgba(255,240,200,.35)"; x.fillRect(0, Hh * 0.45, W * 0.32, Hh * 0.1); },
function (x, W, Hh) { x.fillStyle = "#0A0A10"; x.fillRect(0, 0, W, Hh); var g = x.createLinearGradient(0, 0, W, Hh); g.addColorStop(0, "rgba(255,220,220,.55)"); g.addColorStop(0.5, "rgba(220,230,255,.45)"); g.addColorStop(1, "rgba(255,240,210,.55)"); x.fillStyle = g; x.fillRect(0, 0, W, Hh); x.fillStyle = "rgba(120,200,140,.5)"; x.beginPath(); x.arc(W / 2, Hh / 2, W * 0.3, 0, 6.283); x.fill(); x.fillStyle = "rgba(255,250,235,.6)"; x.fillRect(0, Hh * 0.46, W, Hh * 0.08); }];
for (i = 0; i < 6; i++) {
(function (k) {
var ri = 4 + k;
arwTRoom(G, "barey", ri, 6, 6, 5, { rock: "blackrock", floorCol: 0x2A2A2E, out: { x: -300, z: -591.5, ry: Math.PI }, doorName: "Back down the stair, and out", env: "muspel" });
var A = arwInAt("barey", ri), g = new THREE.Group();
g.position.set(A.x, ARW_IN_Y, A.z);
G.add(g);
for (var s = 0; s < 5; s++)
arwBox(g, 1.4, 0.24 * (s + 1), 0.6, arwTMat("blackrock"), 2.2, 0, 1.6 - s * 0.6);
arwBox(g, 2.4, 0.7, 0.8, arwTMat("blackrock"), 0, 0, -2.6);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.5), new THREE.MeshBasicMaterial({ map: arwCanvas("mwin" + k, 256, 200, vis[k]) }));
win.position.set(0, 2.0, -2.92);
g.add(win);
})(i);
}
arwCrowd("barf", lite ? 4 : 8, 170, -330, 240, -250, { dress: "arfisher", dressF: "arskinf", women: 0.45, org: 1, skins: [0xD8B898, 0xC8A888, 0xE0C8A8], wander: 16, sp: 0.45, names: ["A lake-fisher of Barey", "A woman of Barey", "A boatwoman"], persona: "You are one of the lake-folk of Barey on Tormance, a country of lakes and woods running down to the sea in the north, where Alppain, the blue sun, rises. You fish from floating islands of peat. You are calm and gentle.",
says: ["The islands drift on the current, out to the sea. We ride them home again by the shallows.", "When Alppain rises, folk go quiet. You will see why.", "Our leaves fold up in Branchspell's heat. They open at evening."], talkP: 0.9 });
arwCrowd("barw", lite ? 3 : 5, -160, 90, 160, 330, { dress: "arfisher", dressF: "arskinf", women: 0.45, org: 1, skins: [0xD8B898, 0xC8A888], wander: 20, sp: 0.4, names: ["A woodsman of Barey", "A girl gathering eggs"], persona: "You are a woodsman or woman of the upper slopes of Barey on Tormance, among low thin trees with folded dolm-coloured leaves, under the Lichstorm mountains.",
says: ["Down the landslip is the Mornstab Pass. Few come down it alive.", "The eggs in these woods are good, if you knock the ends off."], talkP: 0.9 });
},
function () {
var S = arwSc(), k = S.env, L = null;
try {
var Lw = worldLocal();
L = { x: Lw.x - S.x, z: Lw.z };
}
catch (e) { }
if (ARW.envK && ARW_ENV[ARW.envK])
k = ARW.envK;
if (ARW.night && !gS0(ARW.sc).under)
k = ARW_SC[ARW.sc] && ARW_SC[ARW.sc].tor ? "tnight" : "enight";
var R = L ? arwRoomAt(L.x, L.z) : null;
if (R)
k = R.env;
var E = {}, B = ARW_ENV[k] || ARW_ENV.land;
for (var q in B)
E[q] = B[q];
if (arwLite() && E.fogD)
E.fogD *= 1.4;
return E;
},
function (x, z, feet) {
if (ARW.moving || ARW.ride)
return true;
var S = arwSc(), D = ARW_SCN[ARW.sc];
if (!D)
return false;
if ((Math.abs(x) > S.bound || Math.abs(z) > S.bound) && arwFloorAt(x, z, feet) === null)
return true;
if (D.edge && x < S.bound + 60 && D.edge(x, z))
return true;
if (arwSolidAt(x, z, feet))
return true;
var fl = arwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = arwLand(x, z);
if (hh > feet + 1.2)
return true;
if (feet - hh > 6)
return true;
var w = D.wl ? D.wl(x, z) : null;
if (w !== null && w - hh > 1.1)
return true;
return false;
},
function (dt) {
ARW.t += dt;
if (!ARW.built || !ARW.scG)
return;
var S = arwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
ARW.et = (ARW.et || 0) + dt;
if (ARW.et > 0.8) {
ARW.et = 0;
worldEnv(arwEnvNow());
}
var flow = ARW.t * 0.02;
ARW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * 0.4, flow); });
ARW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (ARW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(ARW.t * 3 + i * 2)) * 0.3; f.rotation.y = ARW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(ARW.t * 1.3) * 0.08;
}
});
ARW.bob.forEach(function (g, i) {
var u = g.userData, k = u.kind;
if (Math.abs(g.position.x - L.x) + Math.abs(g.position.z - L.z) > 260)
return;
if (k === "air") {
g.position.x = u.home[0] + Math.sin(ARW.t * 0.05 + u.ph) * 20 * u.dr[0] * 2;
g.position.z = u.home[1] + Math.cos(ARW.t * 0.04 + u.ph) * 20 * u.dr[1] * 2;
g.position.y = u.y0 + Math.sin(ARW.t * 0.4 + u.ph) * 0.8;
g.rotation.y += dt * 0.2;
}
else if (k === "walk") {
var a = ARW.t * 0.03 + u.ph;
g.position.x = u.home[0] + Math.sin(a) * 8;
g.position.z = u.home[1] + Math.cos(a * 0.7) * 8;
if (u.hfn)
g.position.y = u.hfn(g.position.x, g.position.z);
}
else if (k === "waltz") {
var b = ARW.t * 0.08 + u.ph;
g.position.x = u.home[0] + Math.sin(b) * 10;
g.position.z = u.home[1] + Math.sin(b * 2) * 5;
if (u.hfn)
g.position.y = u.hfn(g.position.x, g.position.z);
g.children[0].rotation.y = ARW.t * 2.2;
g.children[0].position.y = 0.55 + Math.abs(Math.sin(ARW.t * 3.3)) * 0.08;
}
else if (k === "spin") {
g.rotation.y += dt * (u.sp || 0.3);
}
else if (k === "float") {
g.position.y = u.y0 + Math.sin(ARW.t * (u.f || 0.3) + u.ph) * (u.amp || 1);
}
});
ARW.ghosts.forEach(function (g, i) { var m = g.userData.mats; if (m)
m.forEach(function (x) { x.opacity = 0.55 + Math.sin(ARW.t * 0.8 + i) * 0.1; }); });
if (!ARW.shim)
ARW.shim = {};
ARW.shimT = (ARW.shimT || 0) + dt;
if (ARW.shimT > 0.1) {
ARW.shimT = 0;
["jaleM", "ulfireM"].forEach(function (k) { var m = ARW.mats[k]; if (!m || !m.userData.shimmer)
return; var a = new THREE.Color(m.userData.shimmer[0]), b = new THREE.Color(m.userData.shimmer[1]); m.color.copy(a).lerp(b, 0.5 + 0.5 * Math.sin(ARW.t * 0.35)); });
}
ARW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return arwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof arbTick === "function")
try {
arbTick(dt, L);
}
catch (e) {
if (!ARW.e1) {
ARW.e1 = 1;
if (window.console)
console.warn("[arcturus] book", e);
}
}
if (!ARW.bannerBook)
worldBanner("<b>✴️ " + ARW_NAME + "</b> · " + esc(arwPlaceName(L)) + (ARW.night ? " · night" : ""));
ARW.pt = (ARW.pt || 0) + dt;
if (ARW.pt < 0.15)
return;
ARW.pt = 0;
if (ARW.moving || ARW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
ARW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof arbTalk === "function" && arbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
ARW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : arwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof arbSpot === "function")
arbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof arbIdlePrompt === "function")
arbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = arwAtPt(opt.at) || (typeof arbStartAt === "function" && arbStartAt()) || arwAtPt("hstreet");
arwScene(A.sc);
var S = ARW_SC[A.sc], y = A.y != null ? A.y : arwGround(A.x, A.z);
camera.position.set(ARW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
ARW.moving = false;
ARW.ride = null;
worldEnv(arwEnvNow());
setStatus("✴️ <b>" + ARW_NAME + ".</b> David Lindsay's A Voyage to Arcturus (1920), the whole of it: the séance at Hampstead, the tower at Starkness, and Tormance, the planet of Arcturus, from Poolingdred to Muspel. <b>Press E</b> for the book.");
if (typeof arbEnter === "function")
try {
arbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[arcturus] enter", e);
}
},
function () {
arwSceneDrop();
for (var k in ARW.mats) {
var m = ARW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in ARW.tex) {
var x = ARW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in ARW_GEO) {
try {
ARW_GEO[g].dispose();
}
catch (e) { }
}
ARW.mats = {};
ARW.tex = {};
ARW_GEO = {};
ARW.built = false;
ARW.G = null;
ARW.lights = 0;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = ARW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = ARW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: ARW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return arbPos(at.at);
var C = ARB_CH[arbS().ch], i = arbS().s, c = C && C.cast ? C.cast.filter(function (d) { return arbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? arbPos(c.at) : null;
}
if (at.spot) {
var Sp = ARW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: ARW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return arbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || ARW.sc, x: at.x, z: at.z, y: at.y };
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
if (ARB.beam && ARB.beam.parent === ARW.scG)
return ARB.beam;
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
ARW.scG.add(g);
ARB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return arwLam(c); }, m;
switch (kind) {
case "load":
m = arwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
arwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = arwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = arwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = arwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = arwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = arwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
arwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = arwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
arwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), arwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = arwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "skin":
m = arwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = arwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
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
if (!P || !ARW.scG || P.sc !== ARW.sc)
return null;
var g = arbItemMesh(kind), y = P.y != null ? P.y : arwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
ARW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = arwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (ARB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = ARW.spots.indexOf(I.S); if (j >= 0)
ARW.spots.splice(j, 1); ARB.items = ARB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.arb = 1;
ARB.items.push(I);
return I;
},
function (k) {
if (ARB.tuneKey === k)
return;
ARB.tuneKey = k;
var old = ARB.tune;
ARB.tune = null;
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
if (!k || !ARB_TUNES[k])
return;
try {
var A = new Audio(ARB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
ARB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (ARB.tune !== A) {
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
if (ARB.text)
return fn(ARB.text);
if (ARB.textWait) {
ARB.textWait.push(fn);
return;
}
ARB.textWait = [fn];
var done = function (B) { ARB.text = B; var w = ARB.textWait; ARB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/arcturus/arcturus.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
arbText(function (B) {
var C = ARB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3>" + ARB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(arbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); ARB.readOpen = 0; ARB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = arbS(), C = ARB_CH[S.ch];
if (!C)
return;
ARB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
ARB.readAsk = 0;
ARB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "A Voyage to Arcturus") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? arbOpening(T).map(arbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); ARB.readOpen = 0; arbStepDone(); }, all: function () { arbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Lindsay's own words, all of it");
b += arbKeeperBtns(fns);
worldCard(b, fns);
};
arbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
ARB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); arbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = arbS(), C = ARB_CH[S.ch];
if (!C)
return;
arbItemsClear();
arbCastClear();
ARB.hold = 0;
var go = function () { arbWorldState(); arbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[arb] setup", S.ch, e);
} arbTune(C.tune || null); arbStepBegin(); };
if (place && C.start) {
var P = arbPos(C.start);
if (P && WLD.on === ARW_KEY) {
arwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (ARW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = arbStep();
arbItemsClear();
ARB.hold = 0;
ARB.puzOpen = 0;
if (!b)
return;
b._key = arbKey();
arbWorldState();
try {
if (b.on)
b.on(arbS().f);
}
catch (e) {
if (window.console)
console.warn("[arb] on", e);
}
if (b.k === "read") {
arbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { ARB.rew[k] = 0; });
if (b.k === "find") {
var Pf = arbPos(b.at);
if (Pf && Pf.sc === ARW.sc)
arbItemAdd(b.item, Pf, b.name, b.verb, function () { if (arbKey() === b._key)
arbStepDone(); });
}
if (b.k === "gather") {
var P = arbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(arbS().ch * 97 + arbS().s * 13 + 7);
ARB.got = 0;
if (P && P.sc === ARW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = arwGround(Q.x, Q.z, (P.y != null ? P.y : arwLand(P.x, P.z)) + 1);
arbItemAdd(b.item, Q, b.name, b.verb, function () { if (arbKey() !== b._key)
return; ARB.got++; try {
if (b.each)
b.each(ARB.got);
}
catch (e) { } if (ARB.got < n) {
arbSay((b.eachSay || "Got one.") + " " + ARB.got + " of " + n + ".");
return;
} arbStepDone(); });
}
}
if (b.h)
arbSay("<b>" + esc(ARB_CH[arbS().ch].t) + ".</b> " + b.h);
},
function (b) {
ARB.puzOpen = 1;
ARB.puzT = performance.now();
var k = arbKey(), fns = {}, h = ARB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
arbSay(b.yes);
if (arbKey() === k)
arbStepDone();
return;
}
arbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (arbKey() === k)
ARB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = arbS(), C = ARB_CH[S.ch], b = arbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[arb] done", e);
}
if (b.say)
arbSay(b.say);
S.s++;
if (window.ARB_LOG)
ARB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= ARB_CH.length - 1) {
S.done = 1;
S.s = 0;
arbSave();
arbItemsClear();
arbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
arbSave();
var nx = ARB_CH[S.ch];
setTimeout(function () { try {
arbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[arb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
arbSave();
arbStepBegin();
},
function () {
arbTune("end");
var S = arbS();
var b = "<h3 style='margin:4px 0'>Muspel</h3><p style='font-style:italic'>" + arQ("Nightspore looked at him strangely. \"Are you not Surtur, Krag?\"") + "</p><p style='font-style:italic'>" + arQ("\"Yes,\" said Nightspore in a slow voice, without surprise. \"But what is your name on Earth?\"") + "</p><p style='font-style:italic'>" + arQ("\"It is pain.\"") + "</p><p style='font-size:12px;opacity:.75'>David Lindsay, A Voyage to Arcturus (1920), Chapter 21</p><p>You have walked the whole book: the séance at Prolands and the tower at Starkness; and on Tormance, Joiwind and Panawe, Oceaxe and the Marest, Spadevil, the Wombflash Forest, Polecrab's shore and Earthrid's music, Leehallfae, Corpang and the three Figures of Threal, Haunte and Sullenbode in Lichstorm, Gangnet in Barey, and the tower of Muspel by the sea.</p><p>Keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; arbSave(); arbChapterBegin(true); } };
b += worldBtn("again", "Walk it again from the start", "Prolands, a March evening");
worldCard(b, fns);
},
function (c) {
var C = ARB.cast[c.key || c.k];
if (arbCastLive(C))
return C;
var P = arbPos(c.at);
if (!P || P.sc !== ARW.sc)
return null;
var F = ARW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = arwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = arwDressed("arb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : arwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
ARW.scG.add(g);
Pp = { g: g, y: y, o: {} };
ARW.people.push(Pp);
if (c.name && !c.mute)
arwTalk(Pp, c.name, arwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
ARB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return ARB.cast[c.key || c.k];
},
function () {
var C = ARB_CH[arbS().ch];
if (!C || !C.cast)
return;
var idx = arbS().s;
C.cast.forEach(function (c) { var key = c.key || c.k; if (c.from != null && idx < c.from) {
if (ARB.cast[key])
arbCastHide(key);
return;
} if (c.until != null && idx >= c.until) {
if (ARB.cast[key])
arbCastHide(key);
return;
} if (!arbCastLive(ARB.cast[key]))
arbCastAdd(c); });
},
function () {
if (!ARW.scG)
return;
arbCastClear();
var S = arbS(), C = ARB_CH[S.ch];
if (S.started && !S.done && C && C.cast && arbCastHere(C)) {
arbCastTick();
return;
}
(ARB_FOLK_AT[ARW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = arwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
ARB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!arbActive())
return false;
var b = arbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = arbKey();
worldPrompt(null);
var next = function () { if (arbKey() === k)
arbStepDone(); };
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
worldCard(ARB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
ARB.wt += dt;
if (ARB.wt > 0.5) {
ARB.wt = 0;
if (arbActive() && arbCastHere(ARB_CH[arbS().ch]))
arbCastTick();
var S0 = arbS();
S0.seen[ARW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!arbActive()) {
if (ARB.beam)
ARB.beam.visible = false;
ARW.bannerBook = false;
return;
}
var S = arbS(), b = arbStep(), t = ARW.t, feet = camera.position.y - 1.72;
ARB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? arbPos(b.at) : null, here = P && P.sc === ARW.sc, bm = arbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + arbScName(P.sc) + ": press E for the book)";
if (here && !ARW.moving && !ARW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : arwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = arbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !ARW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (ARB.readAsk)
break;
if (!ARB.readOpen)
arbChapterCard();
else {
ARB.readOpen = 0;
arbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
arbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
ARB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(ARB.hold, dt);
}
catch (e) { }
if (ARB.hold >= (b.sec || 8)) {
arbStepDone();
return;
}
}
else
ARB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return ARB.rew[k]; })) {
arbStepDone();
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
arbStepDone();
return;
}
break;
}
case "puzzle":
if ((!ARB.puzOpen || performance.now() - (ARB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
arbPuzzleCard(b);
break;
}
}
var C = ARB_CH[S.ch], prog = b && b.k === "hold" && ARB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - ARB.hold)) + " s)" : b && b.k === "gather" ? " (" + (ARB.got || 0) + " of " + (b.n || 3) + ")" : "";
ARW.bannerBook = true;
worldBanner("⏳ <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = arbS(), C = ARB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>David Lindsay · A Voyage to Arcturus (1920), the whole book</div><h3 style='margin:4px 0'>✴️ A Voyage to Arcturus</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((arbStep() || {}).h || "") + "</p>";
var st = arbStep(), P = st && st.at ? arbPos(st.at) : null, Cs = arbPos(C.start);
var to = P && P.sc !== ARW.sc ? P : (!P && Cs && Cs.sc !== ARW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + arbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); arwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { arbPopulate(); arbStepBegin(); }); };
}
}
else
b += "<p>A March evening at Prolands, in Hampstead. A medium raises a ghost for Montague Faull's guests; and a rough, broad-shouldered stranger named Krag bursts in and wrings its neck. He tells Maskull, a kind of giant, and his friend Nightspore of Tormance, the one inhabited planet of the star Arcturus, and asks them to come there. From a tower on the Scottish coast a torpedo of crystal carries them through space; and Maskull wakes alone on Tormance's scarlet sand, with new organs in his body and a world of strange people, new colours and two suns before him, walking north toward a drumming he cannot find, and toward Muspel.</p><p style='opacity:.8'>21 chapters, every one played: walk, talk, help, solve. Hours of it.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Prolands, a March evening", S.started ? "Back to where you were" : "\"On a march evening, at eight o'clock\"");
fns.go = function () { worldCard(null); arbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; arbSave(); arbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(ARW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(ARW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (ARW_SCN[k].start || { x: 0, z: 0 }); arwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, arbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += arbKeeperBtns(fns);
worldCard(b, fns);
},
function (C) {
var R = function (v) { return typeof v === "string" ? arbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
ARB_CH.push(C);
return C;
},
function (st, s) {
var V = function (v) { return typeof v === "function" ? v(s) : v; };
if (ARW.curtain) {
var open = !!V(st.curtain);
ARW.curtainOpen = open;
}
if (ARW.torpedo)
ARW.torpedo.visible = V(st.torpedo) !== false;
ARW.stairOK = !!V(st.stair);
ARW.torpGo = !!V(st.torpGo);
ARW.sinkGo = !!V(st.sink);
if (ARW.shows)
for (var k in ARW.shows) {
var o = ARW.shows[k];
if (o)
o.visible = st[k] === undefined ? !!o.userData.def : !!V(st[k]);
}
if (ARW.stateFns)
ARW.stateFns.forEach(function (f) { try {
f(st, V, s);
}
catch (e) { } });
},
function () { if (ARW.sc !== "ifdawn" || ARW.spots.some(function (s) { return s.name === "The shrowk's back, again"; }))
return; var P = ARW_AT.ishrowk2; arwSpot(P.x, P.z, 3, "The shrowk's back, again", "climb on", function () { setTimeout(function () { arwGo("iland", "🦇 <b>Over the mountains, to a broad peninsula.</b> " + arQ("Fly away home!"), arbPopulate); }, 300); }, arwGround(P.x, P.z, 500)); },
function (G, H, hx, hz, face, k) {
var s = face ? -1 : 1, fz = hz + s * 6.1, wz = fz + s * 7.5, brick = arwS("brick", [0xA86A50, 0x9A5E48, 0xB87A5E][k % 3], 1.6), cap = arwMat("ashlar"), iron = arwMat("iron");
var dx = 0;
arwSwWall(G, H, hx - 8, hx + dx - 1.1, wz, brick, cap, iron);
arwSwWall(G, H, hx + dx + 1.1, hx + 8, wz, brick, cap, iron);
[-1, 1].forEach(function (q) { var px = hx + dx + q * 1.15, py = H(px, wz); arwBox(G, 0.5, 1.5, 0.5, cap, px, py, wz); var b = arwBox(G, 0.3, 0.3, 0.3, cap, px, py + 1.5, wz); arwRound(px, wz, 0.35, py - 1, py + 2); });
var pz = (fz + wz) / 2, py2 = H(hx + dx, pz);
var p = arwBox(G, 1.3, 0.06, Math.abs(wz - fz), arwS("paving", 0xB89A80, 0.6), hx + dx, py2, pz);
var bush = [];
for (var i = 0; i < (arwLite() ? 3 : 6); i++) {
var bx = hx - 6.5 + i * 2.1;
if (Math.abs(bx - (hx + dx)) < 1.6)
continue;
bush.push({ x: bx, z: wz - s * 1.0, y: H(bx, wz), s: 0.55 + (i % 2) * 0.2, ry: i });
}
arwPlant(G, "bush", bush, { col: [0x2A4A2A, 0x34502C][k % 2], keepAll: 1 });
bush.forEach(function (b) { arwRound(b.x, b.z, 0.6); });
var ly = H(hx + dx, fz);
var lm = new THREE.Mesh(arwGeo("swporch", function () { return new THREE.BoxGeometry(0.26, 0.36, 0.26); }), arwGlowM(0xFFD898, 0.9));
lm.position.set(hx + dx + 1.2, ly + 2.7, fz + s * 0.2);
G.add(lm);
},
function (G, H, x, z, ry) {
var y = H(x, z), w = arwMat("oak"), ir = arwMat("iron");
arwBox(G, 1.8, 0.06, 0.45, w, x, y + 0.42, z, ry);
var bk = arwBox(G, 1.8, 0.4, 0.05, w, x - Math.sin(ry) * 0.22, y + 0.5, z - Math.cos(ry) * 0.22, ry);
[-0.75, 0.75].forEach(function (q) { arwBox(G, 0.06, 0.45, 0.45, ir, x + Math.cos(ry) * q, y, z - Math.sin(ry) * q, ry); });
arwSolid(x, z, 1.9, 0.6, y - 1, y + 1, ry);
},
function (G, H, x, z) {
var y = H(x, z), lg = new THREE.Group();
lg.position.set(x, y, z);
G.add(lg);
arwCyl(lg, 0.07, 0.1, 3.8, arwMat("iron"), 0, 0, 0, 8);
var gl = new THREE.Mesh(arwGeo("gaslamp", function () { return new THREE.CylinderGeometry(0.22, 0.14, 0.5, 4); }), arwGlowM(0xFFD890, 0.92));
gl.position.y = 4.05;
lg.add(gl);
arwBox(lg, 0.5, 0.08, 0.5, arwMat("iron"), 0, 4.3, 0);
arwRound(x, z, 0.2);
},
function (G) {
var H = arwHampH, lite = arwLite(), R = wRand(1920);
var hs = [];
for (var i = 0; i < 10; i++) {
var hx = -300 + i * 60;
if (Math.abs(hx) < 40)
continue;
hs.push([hx, -34, 0]);
}
for (i = 0; i < 11; i++) {
hs.push([-300 + i * 60, 54, Math.PI]);
}
hs.forEach(function (q, k) { if (lite && k % 2)
return; arwSwGarden(G, H, q[0], q[1], q[2], k); });
[[-150, 3.6], [90, 16.4], [230, 3.6], [-260, 16.4]].forEach(function (p, i) { if (lite && i % 2)
return; arwSwPillarBox(G, H, p[0] + 5, p[1]); });
[[-90, 17.2, Math.PI], [150, 2.8, 0], [270, 17.2, Math.PI]].forEach(function (p) { arwSwBench(G, H, p[0], p[1], p[2]); });
arwSwTrough(G, H, 64, 2.6);
var path = [];
for (var x = -300; x <= 300; x += 6)
path.push([x, -150 + Math.sin(x * 0.02) * 18]);
arwStrip(G, path, 2.6, H, arwMat("gravel"), 0.06);
for (x = -280; x <= 280; x += lite ? 80 : 40) {
var pz = -150 + Math.sin(x * 0.02) * 18;
arwSwLamp(G, H, x, pz + 2.6);
}
for (x = -260; x <= 260; x += lite ? 120 : 60) {
var bz = -150 + Math.sin(x * 0.02) * 18;
arwSwBench(G, H, x + 14, bz - 2.6, Math.PI);
}
arwPlant(G, "bush", arwScatter(1921, lite ? 40 : 110, -320, -320, 320, -100, function (x, z) { return Math.abs(z - (-150 + Math.sin(x * 0.02) * 18)) > 4; }, H, 0.6, 1.3), { col: 0x4A5A2A });
var gorse = arwScatter(1922, lite ? 30 : 80, -320, -320, 320, -100, function (x, z) { return Math.abs(z - (-150 + Math.sin(x * 0.02) * 18)) > 4; }, H, 0.5, 0.9);
arwPlant(G, "bush", gorse, { col: 0x6A6A2A });
gorse.forEach(function (g, i) { if (i % 3 === 0)
arwRound(g.x, g.z, 0.6); });
if (typeof arwCrowd === "function")
try {
arwCrowd("hheath", lite ? 4 : 10, -280, -200, 280, -110, { dress: "arcoat", dressF: "argown", women: 0.45, wander: 20, sp: 0.6, names: ["A walker on the Heath", "A couple taking the air", "A man with a dog", "A neighbour"], persona: "guest",
says: ["The Heath's lovely on a clear night. You can see all London's lamps from the top.", "Frosty. Mind the gravel, it's slippery.", "Faull's party, is it? Everyone's talking about the medium."] });
}
catch (e) { }
}
];
});
