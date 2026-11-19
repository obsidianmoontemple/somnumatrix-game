/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(503, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (FKW.tex[k])
return FKW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = fkwLite();
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
return (FKW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (FKW.mats[k])
return FKW.mats[k];
var own = name.slice(0, 2) === "b:", map = fkwPhotoTex(name, mpt || 2), m;
if (fkwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = fkwPhotoTex(name, mpt || 2, true);
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
return (FKW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return fkwM(k, function () {
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
return fkwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return fkwCanvas("bamboo", 64, 256, function (x, W, H) {
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
fkwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return fkwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return fkwCanvas("tuft", 128, 64, function (x, W, H) {
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
return fkwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return fkwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
fkwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return fkwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = FKW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / FKW_CELL) + "," + Math.floor(z / FKW_CELL)];
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
p = dlnPerson("fkw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("fkw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || FKW.scG || FKW.G).add(p);
var P = { g: p, y: y, o: o };
FKW.people.push(P);
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
FKW.inst.push(m);
try {
m.computeBoundingSphere && m.computeBoundingSphere();
}
catch (e) { }
return m;
},
function (P, pts, w, hfn, mat, lift) {
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
var lite = fkwLite(), leaf = fkwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
fkwInst(P, fkwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), fkwMat("pale"), list, { shadow: !lite });
fkwInst(P, fkwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), fkwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
fkwInst(P, fkwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), fkwMat("bark"), list, { shadow: !lite });
fkwInst(P, fkwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), fkwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
fkwInst(P, fkwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), fkwMat("darkbark"), list, { shadow: !lite });
fkwInst(P, fkwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), fkwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
fkwInst(P, fkwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), fkwMat("bark"), list, { shadow: !lite });
fkwInst(P, fkwGeo("pfronds", function () { var g = fkwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), fkwLam(0xFFFFFF, { ds: 1, map: fkwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
fkwInst(P, fkwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), fkwMat("darkbark"), list, {});
fkwInst(P, fkwGeo("mfronds", function () { return fkwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), fkwLam(0xFFFFFF, { ds: 1, map: fkwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
fkwInst(P, fkwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), fkwMat("darkbark"), list, {});
fkwInst(P, fkwGeo("ffronds", function () { return fkwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), fkwLam(0xFFFFFF, { ds: 1, map: fkwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
fkwInst(P, fkwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), fkwMat("darkbark"), list, {});
fkwInst(P, fkwGeo("cyf", function () { return fkwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), fkwLam(0xFFFFFF, { ds: 1, map: fkwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
fkwInst(P, fkwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), fkwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: fkwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
fkwInst(P, fkwGeo("bamL", function () { return fkwCards(3, 2.6, 2.2, 5.4); }), fkwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
fkwInst(P, fkwGeo("reed" + kind, function () { return fkwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), fkwLam(0xFFFFFF, { ds: 1, map: fkwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
fkwInst(P, fkwGeo("tuft", function () { return fkwCards(2, 1.6, 0.7, 0); }), fkwLam(o.col || 0xFFFFFF, { ds: 1, map: fkwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
fkwInst(P, fkwGeo("flw", function () { return fkwCards(2, 0.9, 0.7, 0); }), fkwLam(0xFFFFFF, { ds: 1, map: fkwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
fkwInst(P, fkwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), fkwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
fkwInst(P, fkwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || fkwMat("rock"), list, {});
break;
}
case "cactus": {
fkwInst(P, fkwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), fkwLam(0x4A7A3A), list, {});
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
function (kind, col) { return fkwM("skinM" + kind + (col || ""), function () { var t = fkwSkinTex(kind); t.repeat.set(2, 2); var m = fkwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = fkwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(fkwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = fkwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(fkwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
fkwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return fkwGeo(k, function () {
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
var t = fkwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), fkwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || fkwS("b:stucco", o.col || 0xF0E2C8, 3), trim = fkwLam(0xFAF6EE), sh = fkwLam(o.shut || 0x3A6A4A), glass = fkwShine(0x1A2228, 0.2, 0.3);
fkwBox(g, w, h, d, wall, 0, 0, 0);
fkwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
fkwBox(g, w + 0.12, 0.5, d + 0.12, fkwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(fkwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || fkwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
fkwBox(g, 1.3, 2.6, 0.12, fkwMat("oak"), wx, 0, d / 2 + 0.02);
fkwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = fkwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = fkwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!fkwLite())
[-1, 1].forEach(function (s) { fkwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
fkwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
fkwBox(g, 0.05, 0.9, 0.05, fkwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
fkwBox(g, 1.8, 0.05, 0.05, fkwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
fkwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (FKW.scG) {
if (FKW.scG.parent)
FKW.scG.parent.remove(FKW.scG);
FKW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
FKW.scG = null;
FKW.solids = [];
FKW.sgrid = null;
FKW.floors = [];
FKW.spots = [];
FKW.talk = [];
FKW.people = [];
FKW.beasts = [];
FKW.fx = [];
FKW.water = [];
FKW.inst = [];
FKW.hgt = null;
FKW.scBuilt = null;
FKW.rooms = [];
FKW.doors = [];
FKW.lights = 0;
FKW.ticks = [];
if (typeof fkbSceneDrop === "function")
try {
fkbSceneDrop();
}
catch (e) { }
},
function (k) {
if (FKW.scBuilt === k && FKW.scG)
return;
fkwSceneDrop();
var D = FKW_SCN[k], S = FKW_SC[k];
if (!D || !S || !FKW.G)
return;
FKW.sc = k;
FKW.scG = new THREE.Group();
FKW.scG.position.x = S.x;
FKW.G.add(FKW.scG);
FKW.hgt = D.h || function () { return 0; };
try {
D.build(FKW.scG);
}
catch (e) {
if (window.console)
console.warn("[frankenstein] scene", k, e);
}
FKW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
FKW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = fkwAtPt(at);
if (!A)
return;
var v = fkwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
FKW.moving = true;
setTimeout(function () {
if (WLD.on !== FKW_KEY) {
v.style.opacity = "0";
FKW.moving = false;
return;
}
fkwScene(A.sc);
var S = FKW_SC[A.sc], y = A.y != null ? A.y : fkwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(FKW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(fkwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; FKW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(fkwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), fkwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; FKW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(fkwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), fkwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(fkwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), fkwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(fkwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), fkwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!fkwLite() && typeof THREE.PointLight === "function" && (FKW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
FKW.lights = (FKW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
FKW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("fkw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("fkw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = FKW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : fkwGround(x, z, o.feet != null ? o.feet : 500);
var g = fkwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || FKW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
FKW.people.push(P);
if (!o.mute)
fkwTalk(P, F.name, fkwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = fkwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = fkwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: [0x141414, 0x3A2A1A, 0x6A4A2A, 0x8A7A6A, 0xB8A060][Math.floor(R() * 5)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
var y = o.y != null ? o.y : fkwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || FKW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
FKW.people.push(P);
fkwTalk(P, L[0], L[4] || o.persona || FKP.townfolk, L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, dress, x, z, ry, greet, o) {
o = o || {};
var g = fkwDressed(seed, dress, { sex: sex, child: !!o.child, beard: o.beard, hair: o.hair, skin: o.skin });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : fkwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || FKW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
FKW.people.push(P);
if (name)
fkwTalk(P, name, o.persona || FKP.townfolk, greet || "Good day.", o.r || 3.0);
return P;
},
function (k) {
switch (k) {
case "plaster": return fkwS("plaster", 0xF0EAD8, 4);
case "render": return fkwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return fkwS("b:stucco", 0xE8CC98, 3);
case "rose": return fkwS("b:stucco", 0xE8C0B0, 3);
case "grey": return fkwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return fkwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return fkwS("stone", 0xC8C0B0, 2.4);
case "greystone": return fkwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return fkwS("b:limestone", 0x6A6660, 4);
case "brick": return fkwS("brick", 0xB87A5E, 1.6);
case "slate": return fkwS("b:slate", 0x5A5E68, 2);
case "tile": return fkwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return fkwS("shingle", 0x7A5A44, 2);
case "thatch": return fkwThatchM();
case "oak": return fkwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return fkwS("b:oak", 0x4A3020, 1.4);
case "floor": return fkwS("b:oak", 0xA87A50, 1.8);
case "planks": return fkwS("b:planks", 0x9A8060, 2);
case "deck": return fkwS("b:deck", 0xB8A07A, 2);
case "hull": return fkwS("b:planks", 0x4A3A2A, 2);
case "damask": return fkwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return fkwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return fkwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return fkwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return fkwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return fkwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return fkwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return fkwLam(0xEDE6D6);
case "beams": return fkwS("b:oak", 0x5A3E26, 1.4);
case "brass": return fkwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return fkwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return fkwShine(0xC87A4A, 0.35, 0.85);
case "glass": return fkwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return fkwShine(0x26323A, 0.15, 0.3);
case "earth": return fkwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return fkwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return fkwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return fkwS("paving", 0xC8C0B0, 2.4);
case "cobble": return fkwS("b:cotto", 0x9A9088, 1.2);
case "gravel": return fkwS("sand", 0xC8B898, 3);
case "sand": return fkwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return fkwS("b:strata", 0x8A847A, 6);
case "darkrock": return fkwS("b:strata", 0x5A5650, 7);
case "granite": return fkwS("b:limestone", 0x9A948C, 5);
case "moss": return fkwS("b:moss", 0x7A9A5A, 3);
case "bark": return fkwS("bark", 0x8A7A64, 2.5);
case "darkbark": return fkwS("bark", 0x5A4E40, 3);
case "birch": return fkwS("bark", 0xE8E4DA, 2);
case "snow": return fkwS("snow", 0xF4F6FA, 5, { vc: 1 });
case "snowwall": return fkwS("snow", 0xF0F4FA, 3);
case "ice": return fkwM("icem", function () { var m = fkwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: fkwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: fkwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return fkwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return fkwLam(0xE8DCC4, { ds: 1 });
case "sail": return fkwLam(0xE8E0CC, { ds: 1 });
case "rope": return fkwLam(0x8A7A5A);
}
return fkwS("earth", 0x8A7058, 5);
},
function () {
return fkwM("thatch", function () {
var t = fkwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
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
var y = FKW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = fkwMat(o.wall || "plaster"), fl = fkwMat(o.floor || "floor");
fkwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
fkwBox(g, w, 0.1, d, o.ceil ? fkwMat(o.ceil) : fkwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = 1.2;
fkwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
fkwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
fkwBox(g, dw, h - 2.3, 0.2, wall, 0, 2.3, q[1]);
fkwBox(g, dw, 2.3, 0.08, fkwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
fkwBox(g, 0.06, 0.06, 0.04, fkwMat("brass"), 0.42, 1.0, q[1] - 0.12);
}
else
fkwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
fkwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
fkwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = fkwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { fkwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { fkwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
fkwBox(g, 0.18, 0.22, d - 0.2, fkwMat("beams"), b, h - 0.22, 0);
fkwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
fkwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
fkwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
fkwSolid(cx - (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
fkwSolid(cx + (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
fkwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
FKW.rooms.push(R);
if (o.light !== false && !fkwLite() && (FKW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
FKW.lights = (FKW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
fkwSpot(ox, oz, 1.8, name, "go in", function () { fkwGo({ sc: FKW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + fkEsc(R.name) + ".</b>"); if (typeof fkbNote === "function")
fkbNote("in:" + R.key); });
fkwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { fkwGo({ sc: FKW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof fkbNote === "function")
fkbNote("out:" + R.key); }, R.y);
FKW.doors.push(R);
return R;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = fkwMat(o.mat || "oak");
fkwBox(g, w, 0.06, d, o.cloth ? fkwLam(o.cloth) : wd, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { fkwBox(g, 0.07, h - 0.06, 0.07, wd, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = fkwMat(o.mat || "oak");
fkwBox(g, 0.46, 0.05, 0.44, o.seat ? fkwMat(o.seat) : wd, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { fkwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.19); });
fkwBox(g, 0.46, 0.5, 0.04, wd, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { fkwBox(g, 0.05, 0.22, 0.42, wd, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = fkwMat(o.mat || "oak");
fkwBox(g, 1.1, 0.4, 2.0, wd, 0, 0, 0);
fkwBox(g, 1.04, 0.18, 1.94, fkwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
fkwBox(g, 0.8, 0.12, 0.36, fkwLam(0xF4F0E8), 0, 0.58, -0.7);
fkwBox(g, 1.1, 0.9, 0.06, wd, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { fkwBox(g, 0.07, 1.9, 0.07, wd, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = fkwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
fkwBox(g, w, h, 0.06, wd, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { fkwBox(g, 0.05, h, 0.36, wd, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
fkwBox(g, w, 0.04, 0.36, wd, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(fkwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? fkwMat("glass") : fkwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
fkwBox(g, bw, bh, 0.24, fkwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
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
var st = fkwMat(o.mat || "ashlar");
fkwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
fkwBox(g, 1.0, 0.8, 0.52, fkwLam(0x141210), 0, 0, 0.02);
fkwBox(g, 2.0, 0.1, 0.6, fkwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
fkwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = fkwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
fkwCyl(g, 0.2, 0.16, 0.26, fkwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
fkwCyl(g, 0.06, 0.07, 0.03, fkwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
fkwCyl(g, 0.018, 0.018, 0.16, fkwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(fkwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), fkwGlowM(0xFFD070, 0.9));
f.position.y = 0.215;
g.add(f);
var gl = wGlow(0xFFC860, 0.25, 0.35);
gl.position.y = 0.22;
g.add(gl);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = fkwTable(P, x, z, o.w || 2.4, o.d || 0.8, 0.92, { ry: ry, mat: "darkoak" });
var R = wRand(Math.round(x * 13 + z * 7));
for (var i = 0; i < (o.n || 6); i++) {
var px = -((o.w || 2.4) / 2) + 0.25 + i * (((o.w || 2.4) - 0.5) / Math.max(1, (o.n || 6) - 1)), k = i % 4;
if (k === 0) {
var fl = new THREE.Mesh(fkwGeo("flask", function () { return new THREE.SphereGeometry(0.1, 12, 10); }), fkwMat("glass"));
fl.position.set(px, 1.02, 0);
g.add(fl);
fkwCyl(g, 0.025, 0.025, 0.16, fkwMat("glass"), px, 1.08, 0, 8);
var liq = new THREE.Mesh(fkwGeo("liq", function () { return new THREE.SphereGeometry(0.075, 10, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), fkwLam([0x8A3A2A, 0x3A6A8A, 0x6A8A3A][i % 3], { op: 0.75 }));
liq.position.set(px, 1.02, 0);
g.add(liq);
}
else if (k === 1) {
var rt = new THREE.Mesh(fkwGeo("retort", function () { return new THREE.SphereGeometry(0.09, 12, 10); }), fkwMat("glass"));
rt.position.set(px, 1.0, 0);
g.add(rt);
var nk = new THREE.Mesh(fkwGeo("retn", function () { var c = new THREE.CylinderGeometry(0.012, 0.03, 0.4, 8); c.rotateZ(1.1); return c; }), fkwMat("glass"));
nk.position.set(px + 0.16, 1.1, 0);
g.add(nk);
}
else if (k === 2) {
fkwCyl(g, 0.07, 0.05, 0.12, fkwLam(0xC8B8A0), px, 0.92, 0, 10);
fkwCyl(g, 0.12, 0.12, 0.02, fkwMat("iron"), px, 0.92, 0, 12);
}
else {
for (var t = 0; t < 3; t++)
fkwCyl(g, 0.012, 0.012, 0.22, fkwMat("glass"), px - 0.05 + t * 0.05, 0.92, 0.1, 6);
fkwBox(g, 0.2, 0.04, 0.06, fkwMat("darkoak"), px, 0.92, 0.1);
}
}
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), fkwM("rug" + col, function () {
var t = fkwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
fkwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
var t = fkwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
fkwBox(g, w + 0.12, h + 0.12, 0.04, fkwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), fkwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), fkwGlowM(col));
m.position.z = 0.02;
g.add(m);
fkwBox(g, w + 0.16, 0.08, 0.12, fkwMat("oak"), 0, -h / 2 - 0.04, 0.04);
fkwBox(g, 0.05, h, 0.06, fkwMat("oak"), 0, -h / 2, 0.05);
fkwBox(g, w, 0.04, 0.06, fkwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { fkwBox(g, 0.05, h, 0.06, fkwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : fkwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = fkwMat(o.wall || "render"), trim = fkwMat(o.trim || "ashlar"), sh = fkwLam(o.shut || 0x4A6A4A), pane = fkwMat("pane"), lite = fkwLite();
fkwBox(g, w, h, d, wall, 0, 0, 0);
fkwBox(g, w + 0.1, 0.6, d + 0.1, fkwMat("greystone"), 0, 0, 0);
fkwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = fkwMat(o.roof || "tile");
var rf = new THREE.Mesh(fkwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
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
fkwBox(g, 0.7, rh * 0.9, 0.7, fkwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); fkwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); fkwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
fkwBox(g, 1.2, 2.4, 0.1, fkwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
fkwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
fkwBox(g, 1.6, 0.14, 0.6, fkwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
fkwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
fkwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
fkwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { fkwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
fkwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = fkwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = fkwMat(o.wall || "ashlar"), roof = fkwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
fkwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(fkwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { fkwBox(g, 0.12, 5, 1.6, fkwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); fkwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
fkwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
fkwBox(g, T + 0.4, 0.4, T + 0.4, fkwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), fkwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = fkwBox(g, 0.08, 0.9, 0.04, fkwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = fkwBox(g, 0.06, 1.1, 0.04, fkwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(fkwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), fkwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(fkwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || fkwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
fkwBox(g, 2.2, 3.6, 0.2, fkwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
fkwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var tz = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
fkwSolid(x + tx, z + tz, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = fkwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
fkwBox(P, seg + 0.2, h, 2, st, mx, fkwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
fkwBox(P, 1.2, 0.8, 2, st, cx, fkwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = fkwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
fkwInst(P, fkwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), fkwMat("darkbark"), list, { shadow: !lite });
fkwInst(P, fkwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), fkwM("firM" + (o.snow ? "s" : ""), function () {
var t = fkwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
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
var lite = fkwLite();
fkwInst(P, fkwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), fkwMat("birch"), list, {});
fkwInst(P, fkwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), fkwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: fkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = fkwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || fkwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
var cap = new THREE.Mesh(geo, fkwMat("snowwall"));
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
var hull = fkwMat(o.hull || "hull");
var h = new THREE.Mesh(fkwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
fkwBox(g, 1.5, 0.06, 0.3, fkwMat("planks"), 0, 0.38, -0.6);
fkwBox(g, 1.5, 0.06, 0.3, fkwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = fkwBox(g, 0.05, 0.05, 2.6, fkwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
fkwCyl(g, 0.04, 0.05, 3.4, fkwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), fkwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (x, z) {
var h = fkwFbm(x * 0.012, z * 0.012, 3) * 1.2 - 0.5;
var r1 = Math.max(0, 1 - Math.abs((x * 0.5 + z) + 150) / 10) * 4.5 * fkwFbm(x * 0.02, z * 0.02, 2), r2 = Math.max(0, 1 - Math.abs((x - z * 0.3) - 160) / 8) * 3.5 * fkwFbm(x * 0.03 + 5, z * 0.03, 2), r3 = Math.max(0, 1 - Math.abs(z + 330) / 12) * 5 * fkwFbm(x * 0.02, 7, 2);
h += r1 + r2 + r3;
var ds = Math.hypot(x / 1.6, z / 2.2);
if (ds < 40)
h *= fkwSmooth(18, 40, ds);
if (FKW.st.lead && z < -38 && z > -90 && Math.abs(x) < 60)
h = -1.2;
return h;
},
function (P) {
var g = new THREE.Group();
P.add(g);
var hull = fkwMat("hull"), dk = fkwMat("deck"), wd = fkwMat("oak"), dark = fkwMat("darkoak"), lite = fkwLite(), D = FKW_SHIP.deck;
var sh = new THREE.Shape();
sh.moveTo(-3.4, 15);
sh.lineTo(3.4, 15);
sh.quadraticCurveTo(3.8, 4, 3.5, -6);
sh.quadraticCurveTo(2.6, -13, 0, -17);
sh.quadraticCurveTo(-2.6, -13, -3.5, -6);
sh.quadraticCurveTo(-3.8, 4, -3.4, 15);
var hm = new THREE.Mesh(fkwGeo("wship", function () { var e = new THREE.ExtrudeGeometry(sh, { depth: 5.2, bevelEnabled: false }); e.rotateX(-Math.PI / 2); e.translate(0, -2.0, 0); return e; }), hull);
g.add(hm);
var wale = new THREE.Mesh(fkwGeo("wwale", function () { var e = new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: false }); e.rotateX(-Math.PI / 2); e.scale(1.02, 1, 1.01); e.translate(0, D - 0.9, 0); return e; }), fkwLam(0x1A1A1A));
g.add(wale);
var deck = new THREE.Mesh(fkwGeo("wdeck", function () { var e = new THREE.ShapeGeometry(sh); e.rotateX(-Math.PI / 2); var uv = e.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 0.5, uv.getY(i) * 0.5); return e; }), dk);
deck.position.y = D;
g.add(deck);
for (var z = -14; z <= 14.5; z += 1.0) {
var hw = z < -6 ? 3.5 * Math.max(0.15, 1 - (-6 - z) / 11) : 3.45;
[-1, 1].forEach(function (k) { if (k > 0 && Math.abs(z) < 1.0)
return; fkwBox(g, 0.12, 0.9, 1.02, hull, k * hw, D, z); });
}
fkwSolid(-3.45, 1, 0.4, 28, D - 0.2, D + 1.2);
fkwSolid(3.45, -7.5, 0.4, 13, D - 0.2, D + 1.2);
fkwSolid(3.45, 8, 0.4, 14, D - 0.2, D + 1.2);
fkwSolid(0, 14.9, 7, 0.4, D - 0.2, D + 1.2);
fkwSolid(-1.9, -13, 0.4, 7, D - 0.2, D + 1.2, 0.4);
fkwSolid(1.9, -13, 0.4, 7, D - 0.2, D + 1.2, -0.4);
fkwFloor(0, -1, 6.8, 30, D);
fkwFloor(0, -14, 3.4, 4, D);
fkwSolid(0, -1, 7.2, 31, -3, D - 0.05);
fkwSolid(0, -15, 4, 5, -3, D - 0.05);
var gw = fkwBox(g, 5.8, 0.08, 1.1, wd, 0, 0, 0);
gw.position.set(5.9, D / 2, 0);
gw.rotation.z = -Math.atan2(D, 5.0);
fkwRamp(5.9, 0, 1.3, 5.6, 0.05, D, -Math.PI / 2);
[[-6, 24], [4, 27]].forEach(function (m, i) {
fkwCyl(g, 0.2, 0.28, m[1], wd, 0, D, m[0], 10);
fkwCyl(g, 0.12, 0.16, 8, wd, 0, D + m[1] - 1, m[0], 8);
fkwRound(0, m[0], 0.35, D - 0.1, D + 20);
[9, 15, 20].forEach(function (yy, j) {
var L = 10 - j * 2.4, y = fkwCyl(g, 0.08, 0.08, L, wd, 0, D + yy, m[0], 6);
y.rotation.z = Math.PI / 2;
y.position.set(0, D + yy + L * 0, m[0]);
var fs = new THREE.Mesh(fkwGeo("furl" + j, function () { var c = new THREE.CylinderGeometry(0.22, 0.22, L * 0.9, 8); c.rotateZ(Math.PI / 2); return c; }), fkwMat("sail"));
fs.position.set(0, D + yy - 0.25, m[0]);
g.add(fs);
});
fkwBox(g, 2.2, 0.12, 2.2, wd, 0, D + 12.5, m[0]);
if (!lite)
for (var s = -1; s <= 1; s += 2)
for (var r = 0; r < 4; r++) {
var sh2 = new THREE.Mesh(fkwGeo("shroud", function () { var c = new THREE.CylinderGeometry(0.018, 0.018, 13.5, 4); return c; }), fkwMat("rope"));
var bx = s * 3.3, bz = m[0] - 1.2 + r * 0.8;
sh2.position.set((bx) / 2, D + 6.5, (bz + m[0]) / 2);
sh2.rotation.z = s * 0.24;
g.add(sh2);
}
});
var bs = fkwCyl(g, 0.16, 0.22, 10, wd, 0, D + 0.6, -19, 8);
bs.rotation.x = Math.PI / 2 - 0.25;
bs.position.set(0, D + 1.6, -19.5);
fkwBox(g, 2.0, 0.4, 2.4, dark, 0, D, -1);
fkwBox(g, 1.6, 0.4, 1.6, dark, 0, D, -10);
fkwCyl(g, 0.45, 0.55, 0.9, wd, 0, D, 1.8, 10);
[-1, 1].forEach(function (k) { var bt = fkwBoat(g, k * 1.9, D + 0.25, -4, 0); bt.scale.set(0.7, 0.7, 0.8); });
fkwBox(g, 0.2, 1.1, 0.2, wd, 0, D, 14.2);
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.05, 6, 18), wd);
wh.position.set(0, D + 1.4, 14.1);
g.add(wh);
for (var sp = 0; sp < 8; sp++) {
var spk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 4), wd);
spk.rotation.z = sp / 8 * Math.PI;
spk.position.copy(wh.position);
g.add(spk);
}
for (var b = 0; b < 6; b++)
fkwCyl(g, 0.32, 0.3, 0.8, fkwMat("oak"), -2.6 + (b % 2) * 0.7, D, -7.5 + Math.floor(b / 2) * 0.7, 10);
[[2.6, -8], [-2.6, 4], [2.4, 12]].forEach(function (q) { var c = new THREE.Mesh(fkwGeo("coil", function () { return new THREE.TorusGeometry(0.28, 0.08, 6, 14); }), fkwMat("rope")); c.rotation.x = Math.PI / 2; c.position.set(q[0], D + 0.1, q[1]); g.add(c); });
[[-2.8, -12], [2.8, -3], [-2.9, 8], [0, -15.5]].forEach(function (q) { var s = new THREE.Mesh(fkwGeo("drift", function () { var c = new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(0.8, 0.25, 1.6); return c; }), fkwMat("snowwall")); s.position.set(q[0], D, q[1]); g.add(s); });
fkwSign(g, "ARCHANGEL", 3.0, 0.45, 0, D - 1.4, 15.06, 0, { bg: "#2A2018", ink: "#E8D8A0" });
var cw = 5.6, cz0 = 6, cz1 = 13, ch = 2.5, wl = fkwMat("planks");
fkwBox(g, cw, ch, 0.15, wl, 0, D, cz1);
fkwBox(g, 0.15, ch, cz1 - cz0, wl, -cw / 2, D, (cz0 + cz1) / 2);
fkwBox(g, 0.15, ch, cz1 - cz0, wl, cw / 2, D, (cz0 + cz1) / 2);
fkwBox(g, (cw - 1.1) / 2, ch, 0.15, wl, -(cw + 1.1) / 4, D, cz0);
fkwBox(g, (cw - 1.1) / 2, ch, 0.15, wl, (cw + 1.1) / 4, D, cz0);
fkwBox(g, 1.1, ch - 2.0, 0.15, wl, 0, D + 2.0, cz0);
fkwBox(g, cw + 0.4, 0.15, cz1 - cz0 + 0.4, dark, 0, D + ch, (cz0 + cz1) / 2);
fkwSolid(0, cz1, cw, 0.3, D - 0.2, D + ch);
fkwSolid(-cw / 2, (cz0 + cz1) / 2, 0.3, cz1 - cz0, D - 0.2, D + ch);
fkwSolid(cw / 2, (cz0 + cz1) / 2, 0.3, cz1 - cz0, D - 0.2, D + ch);
fkwSolid(-(cw + 1.1) / 4, cz0, (cw - 1.1) / 2, 0.3, D - 0.2, D + ch);
fkwSolid((cw + 1.1) / 4, cz0, (cw - 1.1) / 2, 0.3, D - 0.2, D + ch);
var cab = new THREE.Group();
cab.position.set(0, D, 0);
g.add(cab);
fkwBed(cab, -1.8, 11.6, 0, { cover: 0x6A5A4A });
fkwTable(cab, 1.6, 11.9, 1.3, 0.7, 0.78, { mat: "darkoak" });
fkwChair(cab, 1.6, 11.1, Math.PI, { arm: 1 });
fkwShelves(cab, 2.6, 9.2, 1.4, 1.6, -Math.PI / 2);
fkwCandle(cab, 1.3, 0.78, 11.8, { brass: 1 });
fkwBox(cab, 0.24, 0.02, 0.32, fkwLam(0xF0E8D4), 1.75, 0.78, 11.8);
fkwCyl(cab, 0.32, 0.36, 0.8, fkwMat("iron"), -2.2, 0, 7.0, 12);
fkwCyl(cab, 0.07, 0.07, 1.8, fkwMat("iron"), -2.2, 0.8, 7.0, 6);
fkwWindowIn(cab, 0, 1.9, 12.9, Math.PI, 1.0, 0.7, { sky: 0xD8E8F4 });
if (!lite && typeof THREE.PointLight === "function") {
var CL = new THREE.PointLight(0xFFD090, 0.9, 8);
CL.position.set(0, D + 2, 9.5);
g.add(CL);
FKW.lights = (FKW.lights || 0) + 1;
}
var port = fkwGlowM(0xFFC878), rime = fkwLam(0xC8D4E0);
var hullN = hull.clone();
hullN.emissive = new THREE.Color(0x2E2418);
hm.material = hullN;
[-1, 1].forEach(function (k) { for (var pz = -5; pz <= 5.5; pz += 3.5)
fkwBox(g, 0.06, 0.34, 0.42, port, k * 3.84, D - 1.5, pz); });
for (var sx = -1.6; sx <= 1.6; sx += 1.6)
fkwBox(g, 0.5, 0.4, 0.06, port, sx, D - 0.9, 15.04);
[[-3.2, -6], [3.2, 4], [3.0, 1.4]].forEach(function (q) { fkwCyl(g, 0.12, 0.12, 0.36, fkwGlowM(0xFFD898), q[0], D + 1.6, q[1], 8); if (typeof wGlow === "function") {
var gl = wGlow(0xFFC878, 0.8, 2.2);
gl.position.set(q[0], D + 1.78, q[1]);
g.add(gl);
} });
[-1, 1].forEach(function (k) { var r = fkwBox(g, 0.16, 0.06, 28, rime, k * 3.48, D + 0.9, 0.5); });
return g;
},
function (P, x, z, s, k) {
var y = fkwArcticH(x, z);
var m = new THREE.Mesh(fkwGeo("berg" + k, function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(k * 13 + 3); for (var i = 0; i < pa.count; i++) {
var yy = pa.getY(i);
pa.setXYZ(i, pa.getX(i) * (0.8 + R() * 0.5), yy > 0 ? yy * (1.0 + R() * 0.8) : yy * 0.3, pa.getZ(i) * (0.8 + R() * 0.5));
} g.computeVertexNormals(); return g; }), fkwMat("blueice"));
m.scale.set(s, s * 0.8, s * 1.2);
m.position.set(x, y, z);
m.rotation.y = k;
P.add(m);
fkwRound(x, z, s * 0.95, -5, y + s * 1.5);
return m;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, fkwLand(x, z), z);
g.rotation.y = ry || 0;
P.add(g);
var wd = fkwMat("oak");
[-1, 1].forEach(function (s) { var r = fkwBox(g, 0.06, 0.06, 2.6, wd, s * 0.4, 0.04, 0); var tip = fkwBox(g, 0.06, 0.4, 0.06, wd, s * 0.4, 0.04, -1.3); });
fkwBox(g, 0.9, 0.05, 2.0, fkwMat("planks"), 0, 0.35, 0.1);
for (var p = 0; p < 3; p++)
fkwBox(g, 0.05, 0.3, 0.05, wd, (p - 1) * 0.4, 0.05, 0.9);
fkwBox(g, 0.9, 0.05, 0.05, wd, 0, 0.75, 1.1);
if (o.load)
fkwBox(g, 0.7, 0.35, 1.2, fkwLam(0x6A5A44), 0, 0.4, 0.2);
if (o.dogs)
for (var d = 0; d < o.dogs; d++) {
var dog = fkwDog();
dog.position.set((d % 2 ? 0.35 : -0.35), 0, -2.2 - Math.floor(d / 2) * 1.1);
g.add(dog);
}
return g;
},
function () {
var g = new THREE.Group(), fur = fkwLam(0x8A7A6A), dk = fkwLam(0x3A322A);
fkwEll(g, fur, 0.18, 0.18, 0.42, 0, 0.5, 0, 10);
fkwEll(g, fur, 0.13, 0.13, 0.17, 0, 0.68, -0.42, 10);
fkwEll(g, dk, 0.05, 0.05, 0.09, 0, 0.64, -0.58, 8);
[-1, 1].forEach(function (s) { var e = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 5), fur); e.position.set(s * 0.07, 0.84, -0.42); g.add(e); [-0.28, 0.28].forEach(function (zz) { fkwCyl(g, 0.035, 0.03, 0.42, fur, s * 0.1, 0, zz, 6); }); });
var t = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 0.3, 6), fur);
t.position.set(0, 0.62, 0.48);
t.rotation.x = -0.8;
g.add(t);
return g;
},
function (G) {
var lite = fkwLite();
fkwTerrain(G, -760, -760, 1520, 1520, lite ? 16 : 9, fkwArcticH, fkwMat("ice"), function (x, z, y, c) { var v = 0.9 + fkwFbm(x * 0.05, z * 0.05, 2) * 0.12 + Math.min(0.1, Math.max(0, y) * 0.03); c.setRGB(v * 0.95, v * 0.98, v); });
var lead = fkwWater(G, 0, -64, 120, 52, -0.15, 0x24384A, 0.94);
lead.visible = !!FKW.st.lead;
FKW.leadM = lead;
lead.userData.fz = 0.4;
fkwShip(G);
var R = wRand(9);
for (var i = 0; i < (lite ? 14 : 28); i++) {
var a = R() * 6.283, r = 80 + R() * 560;
fkwBerg(G, Math.cos(a) * r, Math.sin(a) * r, 6 + R() * 16, i);
}
fkwPlant(G, "rock", fkwScatter(31, lite ? 80 : 180, -700, -700, 700, 700, function (x, z) { return Math.hypot(x, z) > 30; }, fkwArcticH, 0.4, 1.6), { mat: fkwMat("snowwall") });
fkwSledge(G, 14, 12, 0.3, { dogs: 4, load: 1 });
fkwCrowd("arctic", [["A sailor coiling a rope", "m", "fksailor", "Cold enough to freeze the words in your mouth. Captain says the ice'll open. I hope he's right."], ["Old Thomas, the carpenter", "m", "fksailor", "She's sound, sir, for all the ice squeezes her. Hear her groan at night? That's the ice, not her."],
["A sailor with a lantern", "m", "fksailor", "Keep moving, that's the trick. Stand still out here and you'll never move again."], ["The cook", "m", "fksailor", "Hot soup, if you want it, below. It's the only warm thing for a thousand miles."], ["A young sailor", "m", "fksailor", "I came for the gold the captain promised. I didn't know it'd be like this."],
["A sailor on watch", "m", "fksailor", "Nothing but white, all round, as far as the eye goes. And the fog comes and goes."]], -3, -12, 3, 8, { y: FKW_SHIP.deck, wander: 2, sp: 0.4, persona: FKP.sailor });
fkwCrowd("arcticice", [["A sailor stamping his feet", "m", "fksailor", "We're out to stretch our legs, sir. Mind the cracks: some of them go down to the sea."], ["A sailor with a boat-hook", "m", "fksailor", "Testing the ice. Thick as a church wall here."], ["A sailor by the dogs", "m", "fksailor", "Poor beasts. The gentleman's sledge had fourteen dogs once, they say. Only one left now."]], 10, -10, 30, 24, { wander: 6 });
fkwSnowfall(G, lite ? 260 : 520, 1.1);
},
function (x, z) {
if (z < -62)
return -3.2;
var h = 0.7;
if (z < -46)
h = -3.2 + (z + 62) / 16 * 3.9;
else
h = 0.7 + Math.max(0, z + 46) * 0.004 + fkwFbm(x * 0.01, z * 0.01, 3) * 0.5;
if (x > -340 && x < 70 && z > -44 && z < 160)
h = 0.9 + Math.max(0, z + 44) * 0.006;
var d = Math.hypot(x - 760, z - 760);
if (d < 700)
h += Math.pow((700 - d) / 700, 1.8) * 170 * (0.85 + fkwFbm(x * 0.008, z * 0.008, 3) * 0.3);
var d2 = Math.hypot(x + 700, z - 700);
if (d2 < 500)
h += Math.pow((500 - d2) / 500, 2) * 60;
return h;
},
function (G) {
var X = FKW_ROOMXZ.geneva, lite = fkwLite(), R;
R = fkwRoom(G, "fhouse", X.fhouse[0], X.fhouse[1], 12, 9, { wall: "bluepaper", name: "the Frankensteins' house: the drawing-room and library", beams: false });
fkwRug(R.g, 0, 0, 6, 4, 0x6A3A2A);
fkwHearth(R.g, 0, -4.2, 0, { h: R.h });
fkwShelves(R.g, -5.6, -1, 3.2, 2.6, Math.PI / 2);
fkwShelves(R.g, 5.6, -1, 3.2, 2.6, -Math.PI / 2);
fkwTable(R.g, -2.6, 1, 1.8, 1.0, 0.76, { cloth: 0xE8E0D0 });
fkwChair(R.g, -2.6, 0.2, 0, { seat: "velvet" });
fkwChair(R.g, -2.6, 1.8, Math.PI, { seat: "velvet" });
fkwChair(R.g, 1.6, -2.4, 0.6, { arm: 1, seat: "velvet" });
fkwChair(R.g, -1.6, -2.4, -0.6, { arm: 1, seat: "velvet" });
fkwCandle(R.g, -2.6, 0.76, 1, { brass: 1 });
fkwPicture(R.g, 3, 2.8, -4.3, 0, 1.2, 1.5, function (c, W, H) { c.fillStyle = "#2A2018"; c.fillRect(0, 0, W, H); c.fillStyle = "#C8A890"; c.beginPath(); c.ellipse(W / 2, H * 0.4, W * 0.2, H * 0.18, 0, 0, 7); c.fill(); c.fillStyle = "#3A2A1A"; c.fillRect(W * 0.25, H * 0.58, W * 0.5, H * 0.42); c.fillStyle = "#6A4A30"; c.beginPath(); c.ellipse(W / 2, H * 0.28, W * 0.24, H * 0.12, 0, 0, 7); c.fill(); });
fkwWindowIn(R.g, -3.5, 2.6, 4.35, Math.PI, 1.2, 1.6, { sky: 0xA8C8E8 });
fkwWindowIn(R.g, 3.5, 2.6, 4.35, Math.PI, 1.2, 1.6, { sky: 0xA8C8E8 });
R = fkwRoom(G, "court", X.court[0], X.court[1], 16, 14, { wall: "ashlar", floor: "marble", h: 6, name: "the court-house at Geneva", lightI: 1.1 });
fkwBox(R.g, 8, 1.1, 1.6, fkwMat("darkoak"), 0, 0, -5.6);
fkwBox(R.g, 8, 0.4, 1.8, fkwMat("darkoak"), 0, 1.1, -5.6);
for (var j = -1; j <= 1; j++)
fkwChair(R.g, j * 2.4, -6.3, 0, { arm: 1, seat: "velvet", mat: "darkoak" });
fkwBox(R.g, 2.4, 1.1, 1.8, fkwMat("darkoak"), 5.5, 0, -1);
for (var r = 0; r < 4; r++)
fkwBox(R.g, 9, 0.5, 0.6, fkwMat("oak"), -1, 0, 1 + r * 1.4);
fkwWindowIn(R.g, -7.9, 4.6, -2, Math.PI / 2, 1.2, 2.4, { sky: 0xC8D0D8 });
fkwWindowIn(R.g, 7.9, 4.6, -2, -Math.PI / 2, 1.2, 2.4, { sky: 0xC8D0D8 });
fkwSpot(R.cx + 6.5, R.cz - 5.5, 1.6, "The stair down to the cells", "go down", function () { var C = FKW.rooms.filter(function (q) { return q.key === "cell"; })[0]; if (C)
fkwGo({ sc: "geneva", x: C.cx, z: C.z1 - 1.2, y: C.y, ry: 0 }, "🗝️ <b>Down to the cells.</b> Stone steps, a gaoler with his keys, a door with a grating."); }, FKW_RY);
R = fkwRoom(G, "cell", X.cell[0], X.cell[1], 5, 5, { wall: "darkstone", floor: "greystone", h: 3.2, name: "a cell in the prison", env: "cell", bare: 1, lightI: 0.5 });
fkwBox(R.g, 1.6, 0.42, 0.7, fkwMat("darkoak"), -1.4, 0, -1.9);
fkwBox(R.g, 1.6, 0.1, 1.0, fkwLam(0xB8A060), 1.2, 0, -1.6);
fkwWindowIn(R.g, 0, 2.9, -2.4, 0, 0.6, 0.4, { sky: 0x8A9AA8 });
R = fkwRoom(G, "belrive", X.belrive[0], X.belrive[1], 12, 9, { wall: "greenpaper", name: "Belrive: the drawing-room over the lake" });
fkwRug(R.g, 0, 0.4, 6, 4, 0x2A4A5A);
fkwHearth(R.g, -5.6, 0, Math.PI / 2, { h: R.h });
fkwTable(R.g, 1.5, 0.6, 2.2, 1.1, 0.76, { cloth: 0xF0ECE0 });
for (var c = 0; c < 4; c++)
fkwChair(R.g, 0.5 + c * 0.7, (c % 2 ? 1.5 : -0.3), c % 2 ? Math.PI : 0);
var harp = new THREE.Group();
harp.position.set(4.6, 0, -3);
R.g.add(harp);
fkwBox(harp, 0.4, 0.2, 0.6, fkwMat("brass"), 0, 0, 0);
fkwCyl(harp, 0.05, 0.05, 1.7, fkwMat("brass"), 0, 0.2, -0.2, 8);
var hb = fkwBox(harp, 0.05, 0.05, 0.9, fkwMat("brass"), 0, 1.7, 0.2);
hb.rotation.x = 0.3;
fkwWindowIn(R.g, -2, 2.6, -4.35, 0, 1.6, 2.2, { sky: 0x9AC0E0 });
fkwWindowIn(R.g, 2, 2.6, -4.35, 0, 1.6, 2.2, { sky: 0x9AC0E0 });
fkwShelves(R.g, 5.6, 1.5, 2.4, 2.2, -Math.PI / 2);
R = fkwRoom(G, "cathedral", X.cathedral[0], X.cathedral[1], 18, 26, { wall: "ashlar", floor: "greystone", h: 13, name: "the cathedral of Saint Pierre", lightI: 1.2, bare: 1 });
for (var p = 0; p < 8; p++) {
fkwBox(R.g, 6, 0.8, 0.5, fkwMat("oak"), -4.6, 0, -6 + p * 2);
fkwBox(R.g, 6, 0.8, 0.5, fkwMat("oak"), 4.6, 0, -6 + p * 2);
}
[-1, 1].forEach(function (s) { for (var k = 0; k < 5; k++)
fkwCyl(R.g, 0.55, 0.6, 12.5, fkwMat("ashlar"), s * 7.6, 0, -10 + k * 5, 12); });
fkwCyl(R.g, 0.7, 0.5, 1.8, fkwMat("darkoak"), -3, 0, -10, 10);
fkwBox(R.g, 1.6, 0.1, 1.6, fkwMat("darkoak"), -3, 3.0, -10);
fkwCyl(R.g, 0.08, 0.08, 1.2, fkwMat("darkoak"), -3, 1.8, -10, 6);
fkwWindowIn(R.g, 0, 11, -12.9, 0, 3, 5, { sky: 0xD8E0F0 });
R = fkwRoom(G, "inn", X.inn[0], X.inn[1], 10, 8, { wall: "render", name: "the inn at Sécheron", beams: true });
fkwHearth(R.g, 0, -3.7, 0, { h: R.h, pot: 1 });
for (var t = 0; t < 3; t++) {
fkwTable(R.g, -3 + t * 3, 0.8, 1.6, 0.9, 0.76, {});
fkwChair(R.g, -3 + t * 3, 0.1, 0);
fkwChair(R.g, -3 + t * 3, 1.5, Math.PI);
}
fkwBox(R.g, 3, 1.1, 0.7, fkwMat("darkoak"), 3, 0, -2.6);
fkwShelves(R.g, 3, -3.7, 2.6, 1.8, 0, { jars: 1 });
var homes = [["watch", "a watchmaker's workshop", function (g) { fkwTable(g, 0, -1, 3, 0.9, 0.92, { mat: "darkoak" }); for (var i = 0; i < 5; i++)
fkwCyl(g, 0.1, 0.1, 0.04, fkwMat("brass"), -1.2 + i * 0.6, 0.92, -1, 14); fkwShelves(g, -3.6, 1, 2.4, 2.2, Math.PI / 2); fkwChair(g, 0, -0.3, Math.PI); }],
["books", "a bookseller's shop", function (g) { fkwShelves(g, -3.6, 0, 3.6, 2.6, Math.PI / 2); fkwShelves(g, 3.6, 0, 3.6, 2.6, -Math.PI / 2); fkwShelves(g, 0, -2.8, 3.6, 2.6, 0); fkwTable(g, 0, 0.8, 2, 0.8, 0.9, { mat: "darkoak" }); }],
["baker", "a baker's house", function (g) { fkwHearth(g, 0, -2.8, 0, { h: 3.2, pot: 1 }); fkwTable(g, 0, 0.4, 2.6, 1, 0.9, {}); for (var i = 0; i < 6; i++)
fkwEll(g, fkwLam(0xC88A4A), 0.18, 0.1, 0.12, -1 + i * 0.4, 1.0, 0.4, 8); }],
["widow", "a widow's parlour", function (g) { fkwRug(g, 0, 0, 3, 2.4, 0x5A3A4A); fkwChair(g, -1, -0.8, 0.5, { arm: 1, seat: "velvet" }); fkwTable(g, 0.6, -0.4, 0.9, 0.9, 0.72, { cloth: 0xF0E8E0 }); fkwCandle(g, 0.6, 0.72, -0.4, { brass: 1 }); fkwHearth(g, 0, -2.8, 0, { h: 3.2 }); }],
["pastor", "the pastor's study", function (g) { fkwShelves(g, 0, -2.8, 4, 2.6, 0); fkwTable(g, 0, 0, 1.6, 0.9, 0.76, { mat: "darkoak" }); fkwChair(g, 0, -0.6, 0, { arm: 1 }); fkwCandle(g, 0.4, 0.76, 0.1, {}); }]];
homes.forEach(function (H) { var A = X[H[0]], Rm = fkwRoom(G, H[0], A[0], A[1], 8, 6.4, { wall: ["render", "ochre", "rose", "grey", "plaster"][Math.floor(Math.abs(A[0])) % 5], name: "Geneva: " + H[1], beams: true, light: !lite }); H[2](Rm.g); });
},
function (G) {
var lite = fkwLite(), X = FKW_ROOMXZ.geneva;
fkwTerrain(G, -860, -860, 1720, 1720, lite ? 18 : 10, fkwGenH, fkwMat("meadow"), function (x, z, y, c) { if (y < 0.4) {
var v = 0.95;
c.setRGB(0.92 * v, 0.88 * v, 0.78 * v);
return;
} var g = 0.8 + fkwFbm(x * 0.03, z * 0.03, 2) * 0.25; if (y > 40) {
var t = Math.min(1, (y - 40) / 90);
c.setRGB(0.8 * g + t * 0.1, 0.85 * g, 0.7 * g);
return;
} c.setRGB(0.82 * g, 0.95 * g, 0.72 * g); });
var lake = fkwWater(G, 0, -460, 1720, 820, 0, 0x3A6A8A, 0.9);
lake.userData.fz = 0.2;
[[-1600, -2600, 900, 420, 1], [-400, -2800, 1100, 520, 2], [900, -2700, 900, 380, 3], [2000, -2400, 800, 300, 4]].forEach(function (q) { fkwPeak(G, q[0], q[1], q[2], q[3], { k: q[4], snowLine: 0.12, mat: fkwMat("moss") }); });
fkwPeak(G, 2600, 2200, 1200, 1500, { k: 7, snowLine: 0.62 });
fkwPeak(G, 3400, 1700, 900, 1100, { k: 8, snowLine: 0.55 });
fkwPeak(G, 1800, 2600, 800, 900, { k: 9, snowLine: 0.5 });
fkwBox(G, 380, 1.4, 6, fkwMat("greystone"), -140, -1.2, -49);
for (var b = 0; b < 6; b++) {
var bt = fkwBoat(G, -280 + b * 42, 0.05, -58 - (b % 2) * 5, Math.PI / 2 + (b % 3 - 1) * 0.2, { mast: b % 2 === 0 });
}
var north = [], south = [];
for (var x = -320; x < 20; x += 17)
north.push(x);
for (x = -312; x < 20; x += 17)
south.push(x);
var colours = ["render", "ochre", "rose", "grey", "plaster"], shut = [0x4A6A4A, 0x3A4A6A, 0x6A4A3A, 0x5A5A4A];
north.forEach(function (x, i) { var w = 14 + (i % 3) * 1.2, h = 10 + (i % 4) * 1.6; fkwTownHouse(G, x, 4, w, 14, h, { wall: colours[i % 5], shut: shut[i % 4], dormer: i % 2 === 0, roof: i % 3 ? "tile" : "slate" }); });
south.forEach(function (x, i) { if (Math.abs(x + 60) < 20)
return; var w = 14 + (i % 3) * 1.2, h = 10 + (i % 4) * 1.4; fkwTownHouse(G, x, 36, w, 14, h, { wall: colours[(i + 2) % 5], shut: shut[(i + 1) % 4], ry: Math.PI, dormer: i % 2 === 1, roof: i % 3 ? "tile" : "slate" }); });
var st = new THREE.Mesh(new THREE.PlaneGeometry(360, 14), fkwMat("cobble"));
st.rotation.x = -Math.PI / 2;
st.position.set(-150, fkwGenH(-150, 20) + 0.05, 20);
G.add(st);
fkwTownHouse(G, -60, 40, 26, 18, 13, { wall: "ashlar", trim: "greystone", shut: 0x2A2A2A, ry: Math.PI, roof: "slate", hip: true });
fkwSign(G, "PALAIS DE JUSTICE", 6, 0.8, -60, fkwGenH(-60, 30) + 6.5, 30.9, Math.PI, { bg: "#E8E0D0", ink: "#2A2A2A" });
fkwChurch(G, -262, 118, { len: 40, w: 16, h: 16, tower: 8, th: 32, ry: Math.PI, roof: "slate", spireM: fkwShine(0x4A6A5A, 0.5, 0.5) });
var D = function (key, x, z, ry) { var Rm = FKW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
fkwDoor(Rm, "The door of " + Rm.name.replace(/^Geneva: /, ""), x, z, ry); };
var near = function (L, v) { return L.reduce(function (a, b) { return Math.abs(b - v) < Math.abs(a - v) ? b : a; }); }, fx = near(north, -160);
D("fhouse", fx, 13.4, Math.PI);
D("court", -60, 29, 0);
D("cathedral", -262, 88.6, 0);
[["watch", -286], ["books", -218], ["baker", -116], ["widow", -14]].forEach(function (q) { var hx = near(north, q[1]); D(q[0], hx, 13.4, Math.PI); });
D("pastor", south[3], 28.6, 0);
fkwSign(G, "FRANKENSTEIN", 2.4, 0.4, fx, fkwGenH(fx, 12) + 3.2, 11.12, 0, { bg: "#F2EAD4", ink: "#2A1A10", it: 1 });
fkwTownWall(G, 50, -46, 50, 160, 7, [50, 20]);
var gt = new THREE.Group();
gt.position.set(50, fkwGenH(50, 20), 20);
G.add(gt);
gt.userData.keep = 1;
fkwBox(gt, 4, 9, 4, fkwMat("greystone"), 0, 0, -5);
fkwBox(gt, 4, 9, 4, fkwMat("greystone"), 0, 0, 5);
fkwBox(gt, 4, 2.4, 14, fkwMat("greystone"), 0, 7, 0);
var gate = fkwBox(gt, 0.3, 6.8, 6, fkwMat("darkoak"), 0, 0, 0);
FKW.genGate = gate;
FKW.genGateS = fkwSolid(50, 20, 1, 6, -5, 20);
gate.visible = !!FKW.st.gateShut;
FKW.genGateS.off = !FKW.st.gateShut;
fkwSolid(50, 15, 4, 4, -5, 20);
fkwSolid(50, 25, 4, 4, -5, 20);
fkwTownHouse(G, 130, -14, 14, 10, 8, { wall: "ochre", ry: Math.PI / 2, roof: "tile" });
D("inn", 122, -14, -Math.PI / 2);
fkwSign(G, "AUBERGE", 2, 0.5, 122.6, fkwGenH(122, -14) + 3, -14, -Math.PI / 2, { bg: "#F2E8D0" });
fkwTownHouse(G, 150, 16, 10, 9, 7, { wall: "render", ry: -Math.PI / 2 });
fkwTownHouse(G, 110, 30, 10, 9, 7, { wall: "rose" });
fkwPlant(G, "tree", fkwScatter(17, lite ? 40 : 90, -300, 220, 120, 520, null, fkwGenH, 0.8, 1.3), { col: 0x4A7A34 });
fkwPlant(G, "grass", fkwScatter(18, lite ? 160 : 420, -320, 180, 180, 560, null, fkwGenH, 0.8, 1.4), { col: 0xD8E8B0 });
fkwPlant(G, "flowers", fkwScatter(19, lite ? 60 : 160, -300, 200, 100, 520, null, fkwGenH, 0.8, 1.2), { col: "#F4F0E0" });
fkwConifer(G, fkwScatter(21, lite ? 120 : 300, 250, 200, 840, 840, function (x, z) { return fkwGenH(x, z) > 12; }, fkwGenH, 0.9, 1.5));
fkwPlant(G, "tree", fkwScatter(22, lite ? 50 : 120, 160, -40, 700, 260, function (x, z) { return fkwGenH(x, z) > 0.8 && Math.hypot(x - 400, z + 10) > 40; }, fkwGenH, 0.8, 1.3), { col: 0x5A8A3A });
fkwTownHouse(G, 400, -20, 22, 14, 11, { wall: "render", trim: "ashlar", shut: 0x3A5A6A, hip: true, roof: "slate", dormer: true });
D("belrive", 400, -11.6, Math.PI);
fkwBox(G, 8, 0.6, 22, fkwMat("planks"), 400, -0.4, -64);
fkwFloor(400, -64, 8, 22, 0.2);
fkwBoat(G, 406, 0.05, -70, 0.2, { mast: true });
fkwBoat(G, 394, 0.05, -74, -0.1, {});
fkwPlant(G, "flowers", fkwScatter(23, lite ? 30 : 80, 380, -4, 430, 20, null, fkwGenH, 0.8, 1.2), { col: "#E8A0B0" });
fkwPlant(G, "bush", fkwScatter(24, lite ? 10 : 26, 370, -6, 440, 26, null, fkwGenH, 0.6, 1.0), { col: 0x3E6A2E });
var oak = new THREE.Group();
oak.position.set(430, fkwGenH(430, 50), 50);
G.add(oak);
oak.userData.keep = 1;
FKW.genOak = oak;
fkwCyl(oak, 0.8, 1.2, 7, fkwMat("bark"), 0, 0, 0, 10);
var cr = new THREE.Mesh(fkwGeo("oakcr", function () { var parts = [], R = wRand(5); for (var i = 0; i < 8; i++) {
var c = new THREE.IcosahedronGeometry(3 + R() * 1.6, 1);
c.translate((R() - 0.5) * 7, 8 + R() * 4, (R() - 0.5) * 7);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), fkwM("oakL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: fkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
oak.add(cr);
oak.userData.crown = cr;
var stump = new THREE.Group();
stump.position.copy(oak.position);
G.add(stump);
stump.userData.keep = 1;
FKW.genStump = stump;
for (var s = 0; s < 6; s++) {
var sp = fkwBox(stump, 0.25, 1.2 + s * 0.3, 0.2, fkwLam(0x2A221A), Math.cos(s) * 0.5, 0, Math.sin(s) * 0.5);
sp.rotation.z = (s - 3) * 0.12;
}
fkwCyl(stump, 0.9, 1.2, 1.2, fkwLam(0x2A221A), 0, 0, 0, 10);
fkwRound(430, 50, 1.2);
fkwOakState();
fkwSpot(430, 47, 3, "The old oak", "look at it", function () { if (FKW.st.oakGone)
setStatus("🌳 A blasted stump, splintered into thin ribbons of wood, where a beautiful old oak stood.");
else
setStatus("🌳 An old and beautiful oak, twenty paces from the house."); });
fkwCrowd("gen1", [["A merchant of the town", "m", "fkgent", "Good day. Grain is dear this year: the harvest over in Savoy was poor."], ["A lady with her maid", "f", "fklady", "Good day. We are walking to the cathedral; the view of the lake from the hill is very fine."], ["A watchmaker's apprentice", "m", "fkwork", "Running an errand for the master. Every boy in Geneva wants to make watches."],
["A woman with a basket of fish", "f", "fkmaid", "Fresh from the lake this morning: féra and perch!"], ["A student home from Lausanne", "m", "fkgent", "I have been reading Rousseau. You know he was born here, in this very street almost?"], ["A boatman", "m", "fkwork", "Want to cross to Belrive? The wind's fair. Or Évian, if you have the time."],
["An old syndic", "m", "fkelder", "Good day, good day. The Council meets this afternoon. Dull business."], ["A girl with a hoop", "f", "fkmaid", "Watch my hoop! It goes all the way down to the lake!", null, true], ["A soldier of the town guard", "m", "fkblack", "The gates shut at ten. Mind you're inside by then."],
["A carter", "m", "fkwork", "Wine from the Pays de Vaud, for the inns of the town."], ["A laundress", "f", "fkmaid", "The lake water is soft: the best for washing in all Switzerland."]], -320, 10, 30, 30, { wander: 10 });
fkwCrowd("gen2", [["A family walking on Plainpalais", "m", "fkgent", "A fine evening for a walk. The children love the fields here."], ["A mother with her little ones", "f", "fklady", "Don't go too far, my darlings! Stay where I can see you!"], ["A shepherd boy", "m", "fkwork", "My sheep graze here when the townsfolk let them."], ["Two students arguing", "m", "fkgent", "He says the soul is in the pineal gland. I say he's a fool."], ["An old woman gathering herbs", "f", "fkmaid", "Chamomile for sleep, yarrow for wounds."]], -260, 240, 60, 460, { wander: 14 });
fkwCrowd("gen3", [["The gardener at Belrive", "m", "fkwork", "The roses are doing well this year. The young ladies like them for the table."], ["A maid of the house", "f", "fkmaid", "The family will be down to the lake after dinner, if it stays fine."], ["A fisherman by the landing", "m", "fkwork", "Storms come down off the mountains in a moment here. Watch the sky over the Jura."]], 370, -50, 430, 30, { wander: 6 });
fkwCrowd("gen4", [["The innkeeper at Sécheron", "m", "fkwork", "A bed for the night? The town gates shut at ten, sir: many a traveller sleeps here."], ["A carter resting", "m", "fkwork", "Just come from Lausanne. The road along the lake is beautiful by day."]], 110, -30, 150, 20, { wander: 5 });
},
function (G) {
fkwGenRooms(G);
fkwGeneva(G);
FKW_GEN_FOLK.forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("genh" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
var Rc = FKW.rooms.filter(function (r) { return r.key === "cathedral"; })[0];
if (Rc)
fkwCrowd("genc", [["A woman at prayer", "f", "fklady", "(She bows her head, and does not look up.)"], ["The verger", "m", "fkblack", "Saint Pierre has stood here since before Calvin, sir. Its stones have seen a great deal."]], Rc.cx - 4, Rc.cz - 6, Rc.cx + 4, Rc.cz + 6, { y: FKW_RY, wander: 2 });
var Ri = FKW.rooms.filter(function (r) { return r.key === "inn"; })[0];
if (Ri)
fkwCrowd("geni", [["A traveller at supper", "m", "fkgent", "Shut out by the gates, like me? The soup is good, at least."], ["The innkeeper's wife", "f", "fkmaid", "A bed is two francs, and supper one."]], Ri.cx - 3, Ri.cz - 2, Ri.cx + 3, Ri.cz + 2, { y: FKW_RY, wander: 1.5 });
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.fkcow)
return;
var tail = function (c) { return { l: 0.8, r: 0.07, up: -1.3, col: c }; };
CRX_PLANS.fkdark = function () { return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x2A1C14, back: 0x1E140E, muzzle: 0x1A1210, mane: 0x0E0A08, foot: "hoof", tail: tail(0x0E0A08), neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0 }); };
CRX_PLANS.fkmule = function () { return crxQuad({ L: 0.95, H: 0.92, G: 0.32, W: 0.74, legR: 0.045, head: "horse", hs: 1.25, col: 0x6A625A, back: 0x5A524A, muzzle: 0x3A3430, mane: 0x2A2622, foot: "hoof", tail: tail(0x2A2622), neck: { l: 0.5, up: 0.8 }, neckR0: 0.5, neckR1: 0.32, stride: 1.6, runAt: 3.0 }); };
CRX_PLANS.fkcow = function () { return crxQuad({ L: 1.15, H: 0.9, G: 0.42, W: 0.86, legR: 0.06, head: "bull", hs: 1.05, col: 0xD8CCB8, back: 0x8A5A3A, belly: 0xE8E0D0, muzzle: 0xC89A8A, mane: 0x8A5A3A, foot: "hoof", tail: { l: 0.7, r: 0.04, up: -1.5, col: 0x8A5A3A }, neck: { l: 0.35, up: 0.5 }, neckR0: 0.6, neckR1: 0.45, stride: 1.4, runAt: 2.4 }); };
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = null, key = o.kind || "horse";
if (o.plain)
return fkwPlainBeast(P, x, y, z, ry, o);
var crx = false;
try {
fkwCrxKinds();
crx = typeof crxBuild === "function" && typeof crxHas === "function" && crxHas(key) && !fkwLite() && typeof CRX !== "undefined";
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
var stand = fkwHorse(hold, 0, 0, 0, 0, { col: o.col, plain: 1, kind: key });
FKW.ticks.push(function () { if (!hold.parent || hold.userData.done || !CRX.geo[key])
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
return fkwPlainBeast(P, x, y, z, ry, o);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), cow = o.kind === "fkcow", c = fkwLam(o.col || (cow ? 0xD8CCB8 : 0x5A3A22)), dk = fkwLam(0x1A120C);
{
if (cow)
g.scale.set(1.15, 0.9, 1.05);
fkwEll(g, c, 0.34, 0.36, 0.85, 0, 1.25, 0, 12);
var nk = fkwCyl(g, 0.16, 0.24, 0.8, c, 0, 1.3, -0.7, 8);
nk.rotation.x = -0.7;
var hd = fkwEll(g, c, 0.13, 0.15, 0.34, 0, 1.85, -1.05, 10);
hd.rotation.x = 0.6;
[[-0.2, -0.55], [0.2, -0.55], [-0.2, 0.55], [0.2, 0.55]].forEach(function (q) { fkwCyl(g, 0.06, 0.05, 1.0, c, q[0], 0, q[1], 6); fkwCyl(g, 0.07, 0.07, 0.1, dk, q[0], 0, q[1], 6); });
var mn = fkwBox(g, 0.05, 0.4, 0.7, dk, 0, 1.45, -0.75);
mn.rotation.x = -0.7;
var tl = fkwCyl(g, 0.06, 0.03, 0.7, dk, 0, 0.9, 0.95, 6);
tl.rotation.x = 0.3;
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = fkwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var body = fkwLam(o.col || 0x3A2A1E), trim = fkwLam(0xB8902A), wd = fkwMat("darkoak"), blk = fkwLam(0x1A1612);
fkwBox(g, 1.8, 1.5, 3.0, body, 0, 1.0, 0);
fkwBox(g, 1.9, 0.12, 3.2, trim, 0, 2.5, 0);
fkwBox(g, 1.6, 0.4, 2.6, fkwLam(0x5A4A3A), 0, 2.62, 0);
[-1, 1].forEach(function (s) { fkwBox(g, 0.04, 0.6, 0.7, fkwMat("pane"), s * 0.92, 1.65, -0.6); fkwBox(g, 0.04, 0.6, 0.7, fkwMat("pane"), s * 0.92, 1.65, 0.6); fkwBox(g, 0.05, 1.2, 0.7, body, s * 0.93, 1.05, 0); });
fkwBox(g, 1.4, 0.5, 0.6, wd, 0, 1.5, -1.9);
[[-1, -1.1, 0.55], [1, -1.1, 0.55], [-1, 1.1, 0.7], [1, 1.1, 0.7]].forEach(function (q) {
var wh = new THREE.Mesh(fkwGeo("wheel" + q[2], function () { var t = new THREE.TorusGeometry(q[2], 0.05, 6, 18); return t; }), blk);
wh.position.set(q[0] * 1.0, q[2], q[1]);
wh.rotation.y = Math.PI / 2;
g.add(wh);
for (var s = 0; s < 6; s++) {
var sp = fkwBox(g, 0.03, q[2] * 2, 0.03, wd, q[0] * 1.0, 0, q[1]);
sp.position.y = q[2];
sp.rotation.x = s / 6 * Math.PI;
}
});
fkwBox(g, 0.08, 0.08, 2.6, wd, 0, 0.4, -2.8);
if (o.horses !== false) {
fkwHorse(g, -0.6, 0, -4.0, 0, { col: 0x4A3020 });
fkwHorse(g, 0.6, 0, -4.0, 0, { col: 0x2A1E14, kind: "fkdark" });
}
fkwSolid(x, z, 2.4, 4, y - 1, y + 3, ry || 0);
return g;
},
function (G) {
var X = FKW_ROOMXZ.ingol, lite = fkwLite(), R;
R = fkwRoom(G, "lodging", X.lodging[0], X.lodging[1], 9, 7, { wall: "greenpaper", name: "Victor's rooms in Ingolstadt", beams: true });
fkwRug(R.g, 0, 0, 4, 3, 0x5A2A2A);
fkwHearth(R.g, 0, -3.3, 0, { h: R.h });
fkwShelves(R.g, -4.2, -0.5, 3, 2.4, Math.PI / 2);
fkwShelves(R.g, 4.2, -0.5, 3, 2.4, -Math.PI / 2);
fkwTable(R.g, 0.5, 0.8, 1.6, 0.9, 0.76, { mat: "darkoak" });
fkwChair(R.g, 0.5, 0.1, 0, { arm: 1, seat: "leather" });
fkwChair(R.g, -1.6, -1.6, 0.5, { arm: 1, seat: "velvet" });
fkwCandle(R.g, 0.9, 0.76, 0.9, { brass: 1 });
for (var i = 0; i < 6; i++)
fkwBox(R.g, 0.22, 0.05 + i * 0.01, 0.3, fkwLam([0x6A2A1A, 0x2A3A5A, 0x4A3A1A][i % 3]), 0.1 + i * 0.08, 0.76 + i * 0.05, 0.6);
fkwWindowIn(R.g, -2.4, 2.4, 3.35, Math.PI, 1.1, 1.5, { sky: 0xB8C8D8 });
fkwWindowIn(R.g, 2.4, 2.4, 3.35, Math.PI, 1.1, 1.5, { sky: 0xB8C8D8 });
fkwSpot(R.cx + 3.6, R.cz - 2.6, 1.4, "The stair, up to the top of the house", "go up", function () { fkwGo(fkwIn("ingol", "workshop", 0, 1.6)(), "🕯️ <b>Up the stair to the garret.</b> A solitary chamber, or rather cell, at the top of the house."); }, FKW_RY);
fkwSpot(R.cx - 3.6, R.cz - 2.6, 1.4, "The door of the bedchamber", "go in", function () { fkwGo(fkwIn("ingol", "bedroom", 0, 1.4)(), "🛏️ <b>Victor's bedchamber.</b>"); }, FKW_RY);
fkwSpot(R.cx + 3.6, R.cz + 2.4, 1.2, "The back stair, down to the courtyard", "go down", function () { fkwGo("yard", "🌧️ <b>The courtyard behind the house.</b>"); }, FKW_RY);
R = fkwRoom(G, "bedroom", X.bedroom[0], X.bedroom[1], 6, 6, { wall: "greenpaper", name: "Victor's bedchamber", beams: true });
fkwBed(R.g, -1.4, -1.4, 0, { posts: 1, cover: 0xD8D0C0 });
[-1, 1].forEach(function (s) { var c = fkwBox(R.g, 0.04, 1.8, 1.9, fkwLam(0x6A2A2A, { ds: 1 }), -1.4 + s * 0.56, 0.05, -1.4); });
fkwBox(R.g, 1.2, 0.04, 2.0, fkwLam(0x6A2A2A), -1.4, 1.95, -1.4);
fkwTable(R.g, 1.8, -2.2, 0.9, 0.5, 0.8, {});
fkwCyl(R.g, 0.22, 0.16, 0.12, fkwLam(0xF0ECE4), 1.8, 0.8, -2.2, 12);
fkwBox(R.g, 1.0, 0.5, 0.5, fkwMat("darkoak"), 1.8, 0, 1.8);
fkwWindowIn(R.g, 0, 2.4, -2.9, 0, 0.9, 1.4, { sky: 0x5A6A8A });
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The door", "go out", function () { fkwGo(fkwIn("ingol", "lodging", -3.6, -1.6)(), null); }, FKW_RY);
R = fkwRoom(G, "workshop", X.workshop[0], X.workshop[1], 8, 7, { wall: "plaster", floor: "planks", h: 3.0, name: "the workshop at the top of the house", env: "garret", beams: true, lightI: 0.6, lightCol: 0xFFC890 });
fkwBench(R.g, -2, -2.9, 0, { w: 3, n: 8 });
fkwBench(R.g, 3.4, -1, -Math.PI / 2, { w: 2.6, n: 5 });
fkwShelves(R.g, -3.8, 0.6, 2.6, 2.4, Math.PI / 2, { jars: 1 });
fkwShelves(R.g, 1, -3.3, 1.8, 2.2, 0, {});
var slab = new THREE.Group();
slab.position.set(0, 0, 0.5);
R.g.add(slab);
fkwTable(slab, 0, 0, 1.0, 2.4, 0.9, { mat: "darkoak" });
var sheet = fkwBox(slab, 1.1, 0.32, 2.3, fkwLam(0xD8D2C4, { ds: 1 }), 0, 0.9, 0);
FKW.ingSheet = sheet;
slab.userData.keep = 1;
var hand = fkwEll(slab, fkwLam(0xC8B888), 0.07, 0.03, 0.14, 0.62, 0.92, 0.2, 8);
FKW.ingHand = hand;
fkwCandle(R.g, -2.6, 0.92, -2.9, {});
fkwCandle(R.g, -1.2, 0.92, -2.9, {});
fkwWindowIn(R.g, 0, 2.3, -3.4, 0, 0.7, 0.6, { sky: 0x5A6A80 });
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The stair, down to his rooms", "go down", function () { fkwGo(fkwIn("ingol", "lodging", 3.6, -1.6)(), null); }, FKW_RY);
R = fkwRoom(G, "lecture", X.lecture[0], X.lecture[1], 16, 14, { wall: "ashlar", floor: "floor", h: 6, name: "the lecture hall of the university", lightI: 1.1 });
fkwTable(R.g, 0, -5.2, 3.6, 1.0, 1.0, { mat: "darkoak" });
fkwBench(R.g, 0, -5.2, 0, { w: 3.4, n: 7 });
fkwBox(R.g, 6, 2.2, 0.1, fkwLam(0x1E2420), 0, 1.2, -6.85);
for (var r = 0; r < 5; r++) {
fkwBox(R.g, 12, 0.3 + r * 0.3, 1.2, fkwMat("oak"), 0, 0, -1.2 + r * 1.4);
fkwBox(R.g, 12, 0.5, 0.4, fkwMat("darkoak"), 0, 0.3 + r * 0.3, -0.8 + r * 1.4);
fkwFloor(R.cx, R.cz - 1.2 + r * 1.4, 12, 1.2, FKW_RY + 0.3 + r * 0.3);
}
fkwWindowIn(R.g, -7.9, 4, -2, Math.PI / 2, 1.2, 2.4, {});
fkwWindowIn(R.g, 7.9, 4, -2, -Math.PI / 2, 1.2, 2.4, {});
fkwSpot(R.cx + 6, R.cz - 5.5, 1.4, "The door to M. Waldman's laboratory", "go in", function () { fkwGo(fkwIn("ingol", "waldlab", 0, 2)(), "⚗️ <b>M. Waldman's laboratory.</b>"); }, FKW_RY);
fkwSpot(R.cx - 6, R.cz - 5.5, 1.4, "The door to M. Krempe's study", "go in", function () { fkwGo(fkwIn("ingol", "krempe", 0, 1.8)(), "📚 <b>M. Krempe's study.</b>"); }, FKW_RY);
fkwSpot(R.cx - 6, R.cz + 5.5, 1.4, "The stair down to the dissecting room", "go down", function () { fkwGo(fkwIn("ingol", "dissect", 0, 2)(), "🕯️ <b>The dissecting room.</b> Cold, and smelling of spirits."); }, FKW_RY);
R = fkwRoom(G, "waldlab", X.waldlab[0], X.waldlab[1], 10, 8, { wall: "plaster", floor: "greystone", name: "M. Waldman's laboratory", lightI: 1.0 });
fkwBench(R.g, -2, -3.3, 0, { w: 4, n: 9 });
fkwBench(R.g, 3, 0, -Math.PI / 2, { w: 3, n: 6 });
fkwShelves(R.g, -4.6, 0.5, 3, 2.4, Math.PI / 2, { jars: 1 });
var em = new THREE.Group();
em.position.set(0, 0, 0.8);
R.g.add(em);
fkwBox(em, 1.2, 0.8, 0.6, fkwMat("darkoak"), 0, 0, 0);
var disc = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.03, 24), fkwMat("glass"));
disc.rotation.z = Math.PI / 2;
disc.position.set(0, 1.35, 0);
em.add(disc);
fkwCyl(em, 0.12, 0.12, 0.5, fkwMat("brass"), 0.6, 0.8, 0, 10);
fkwEll(em, fkwMat("brass"), 0.12, 0.12, 0.12, 0.6, 1.42, 0, 10);
for (var j = 0; j < 4; j++) {
fkwCyl(R.g, 0.09, 0.09, 0.32, fkwMat("glass"), -1.6 + j * 0.3, 0, 2.6, 10);
fkwCyl(R.g, 0.02, 0.02, 0.1, fkwMat("brass"), -1.6 + j * 0.3, 0.32, 2.6, 6);
}
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The door", "go out", function () { fkwGo(fkwIn("ingol", "lecture", 6, -4.2)(), null); }, FKW_RY);
R = fkwRoom(G, "krempe", X.krempe[0], X.krempe[1], 7, 6, { wall: "bluepaper", name: "M. Krempe's study", beams: true });
fkwShelves(R.g, 0, -2.8, 6, 2.6, 0);
fkwTable(R.g, 0, 0, 1.6, 0.9, 0.76, { mat: "darkoak" });
fkwChair(R.g, 0, -0.7, 0, { arm: 1, seat: "leather" });
fkwCandle(R.g, 0.5, 0.76, 0.2, { brass: 1 });
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The door", "go out", function () { fkwGo(fkwIn("ingol", "lecture", -6, -4.2)(), null); }, FKW_RY);
R = fkwRoom(G, "dissect", X.dissect[0], X.dissect[1], 9, 8, { wall: "greystone", floor: "greystone", name: "the dissecting room", env: "cell", bare: 1, lightI: 0.7, lightCol: 0xE0E8F0 });
for (var t = 0; t < 3; t++) {
fkwTable(R.g, -3 + t * 3, -1, 0.9, 2.1, 0.9, { mat: "darkoak" });
fkwBox(R.g, 1.0, 0.22, 2.1, fkwLam(0xC8C2B4, { ds: 1 }), -3 + t * 3, 0.9, -1);
}
fkwShelves(R.g, 0, -3.8, 4, 2.2, 0, { jars: 1 });
fkwCyl(R.g, 0.2, 0.2, 0.02, fkwMat("iron"), 0, 0, 1.2, 10);
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The stair up", "go up", function () { fkwGo(fkwIn("ingol", "lecture", -6, 4.6)(), null); }, FKW_RY);
R = fkwRoom(G, "inn", X.inn[0], X.inn[1], 11, 8, { wall: "render", name: "the inn at Ingolstadt", beams: true });
fkwHearth(R.g, -3, -3.7, 0, { h: R.h, pot: 1 });
for (t = 0; t < 3; t++) {
fkwTable(R.g, -3.4 + t * 3.4, 1, 1.8, 0.9, 0.76, {});
fkwChair(R.g, -3.4 + t * 3.4, 0.3, 0);
fkwChair(R.g, -3.4 + t * 3.4, 1.7, Math.PI);
}
fkwBox(R.g, 3.4, 1.1, 0.7, fkwMat("darkoak"), 3.2, 0, -2.8);
fkwShelves(R.g, 3.2, -3.7, 3, 1.8, 0, { jars: 1 });
for (t = 0; t < 4; t++)
fkwCyl(R.g, 0.3, 0.3, 0.7, fkwMat("oak"), 5.0, 0, -1 + t * 0.8, 10);
R = fkwRoom(G, "church", X.church[0], X.church[1], 18, 28, { wall: "plaster", floor: "greystone", h: 14, name: "the church with the white steeple", lightI: 1.2, bare: 1 });
for (var p = 0; p < 8; p++) {
fkwBox(R.g, 6, 0.8, 0.5, fkwMat("darkoak"), -4.6, 0, -4 + p * 2);
fkwBox(R.g, 6, 0.8, 0.5, fkwMat("darkoak"), 4.6, 0, -4 + p * 2);
}
[-1, 1].forEach(function (s) { for (var k = 0; k < 6; k++)
fkwCyl(R.g, 0.5, 0.6, 13.5, fkwMat("ashlar"), s * 7.6, 0, -11 + k * 4.6, 12); });
fkwBox(R.g, 4, 1.1, 1.6, fkwMat("marble"), 0, 0, -11.5);
fkwBox(R.g, 5, 6, 0.4, fkwMat("brass"), 0, 1.1, -13.5);
fkwBox(R.g, 4.2, 5.2, 0.1, fkwLam(0x6A3A2A), 0, 1.5, -13.25);
fkwCandle(R.g, -1.4, 1.1, -11.5, { brass: 1 });
fkwCandle(R.g, 1.4, 1.1, -11.5, { brass: 1 });
fkwWindowIn(R.g, 0, 11, -13.9, 0, 3, 5, { sky: 0xD8E0F0 });
R = fkwRoom(G, "charnel", X.charnel[0], X.charnel[1], 7, 6, { wall: "darkstone", floor: "greystone", h: 3, name: "the charnel-house", env: "cell", bare: 1, lightI: 0.45, lightCol: 0xFFC890 });
[-1, 1].forEach(function (s) { var sh = fkwShelves(R.g, s * 3.1, 0, 4.6, 2.4, -s * Math.PI / 2, { mat: "darkoak", jars: false }); });
for (var b = 0; b < 14; b++) {
fkwEll(R.g, fkwLam(0xD8D0B8), 0.11, 0.12, 0.13, (b % 2 ? -1 : 1) * 3.0, 0.25 + Math.floor(b / 7) * 0.8, -1.8 + (b % 7) * 0.6, 8);
}
fkwCandle(R.g, 0, 0, -2.4, {});
var homes = [["apoth", "the apothecary's shop", function (g) { fkwShelves(g, 0, -2.8, 5, 2.4, 0, { jars: 1 }); fkwShelves(g, -3.4, 0, 3, 2.4, Math.PI / 2, { jars: 1 }); fkwTable(g, 0, 0.4, 2.6, 0.7, 0.95, { mat: "darkoak" }); fkwCyl(g, 0.12, 0.09, 0.16, fkwMat("brass"), 0.6, 0.95, 0.4, 10); }],
["tailor", "a tailor's shop", function (g) { fkwTable(g, 0, -0.5, 2.6, 1.2, 0.86, {}); for (var i = 0; i < 4; i++)
fkwBox(g, 0.5, 0.03, 0.7, fkwLam([0x2A3A5A, 0x6A2A2A, 0x3A3A2A, 0xD8D0C0][i]), -0.9 + i * 0.6, 0.86, -0.5); fkwShelves(g, 0, -2.8, 4, 2.2, 0); fkwCyl(g, 0.2, 0.24, 1.4, fkwLam(0xE8DCC4), 2.4, 0, 0.6, 10); }],
["beer", "the beer-house", function (g) { for (var i = 0; i < 2; i++) {
fkwTable(g, -1.8 + i * 3.6, 0.4, 1.8, 0.9, 0.76, {});
fkwChair(g, -1.8 + i * 3.6, -0.3, 0);
fkwChair(g, -1.8 + i * 3.6, 1.1, Math.PI);
} fkwHearth(g, 0, -2.8, 0, { h: 3.2 }); for (i = 0; i < 3; i++)
fkwCyl(g, 0.32, 0.32, 0.75, fkwMat("oak"), 3.4, 0, -2 + i * 0.8, 10); }],
["butcher", "the butcher's shop", function (g) { fkwTable(g, 0, -0.6, 2.4, 0.9, 0.9, { mat: "darkoak" }); fkwBox(g, 4, 0.08, 0.08, fkwMat("iron"), 0, 2.4, -2.6); for (var i = 0; i < 5; i++)
fkwEll(g, fkwLam(0x8A3A2A), 0.16, 0.26, 0.1, -1.6 + i * 0.8, 2.0, -2.6, 8); }],
["student", "a student's room", function (g) { fkwBed(g, -2.6, -1.8, 0, {}); fkwTable(g, 1, -1.6, 1.4, 0.8, 0.76, {}); fkwChair(g, 1, -0.9, Math.PI); fkwShelves(g, 3.4, 0.2, 2.2, 2, -Math.PI / 2); fkwCandle(g, 1.3, 0.76, -1.6, {}); }],
["binder", "a bookbinder's shop", function (g) { fkwShelves(g, 0, -2.8, 5, 2.4, 0); fkwTable(g, 0, 0, 2.4, 1, 0.9, { mat: "darkoak" }); fkwBox(g, 0.6, 0.5, 0.4, fkwMat("iron"), 0.6, 0.9, 0); for (var i = 0; i < 6; i++)
fkwBox(g, 0.25, 0.04, 0.34, fkwLam(0x5A3A1A), -0.8 + i * 0.28, 0.9 + i * 0.03, -0.2); }],
["widowi", "Frau Huber's parlour", function (g) { fkwRug(g, 0, 0, 3, 2.4, 0x4A3A5A); fkwChair(g, -1, -0.8, 0.5, { arm: 1, seat: "velvet" }); fkwTable(g, 0.6, -0.4, 0.9, 0.9, 0.72, { cloth: 0xF0E8E0 }); fkwHearth(g, 0, -2.8, 0, { h: 3.2 }); fkwCandle(g, 0.6, 0.72, -0.4, {}); }]];
homes.forEach(function (H, i) { var A = X[H[0]], Rm = fkwRoom(G, H[0], A[0], A[1], 8, 6.4, { wall: ["render", "ochre", "rose", "grey", "plaster"][i % 5], name: "Ingolstadt: " + H[1], beams: true, light: !lite }); H[2](Rm.g); });
},
function (G) {
var lite = fkwLite(), X = FKW_ROOMXZ.ingol;
fkwTerrain(G, -560, -560, 1120, 1120, lite ? 16 : 8, fkwIngH, fkwMat("meadow"), function (x, z, y, c) { var g = 0.8 + fkwFbm(x * 0.03, z * 0.03, 2) * 0.25; if (y < 0) {
c.setRGB(0.6, 0.56, 0.46);
return;
} c.setRGB(0.8 * g, 0.92 * g, 0.7 * g); });
var dan = fkwWater(G, 0, 145, 1120, 64, -0.3, 0x4A6A6A, 0.92);
dan.userData.fx = 1;
dan.userData.fz = 0.05;
var br = new THREE.Group();
br.position.set(0, 0, 145);
G.add(br);
fkwBox(br, 9, 1.0, 74, fkwMat("greystone"), 0, 0.7, 0);
for (var a = -2; a <= 2; a++)
fkwBox(br, 9, 3.5, 3, fkwMat("greystone"), 0, -3, a * 14);
[-1, 1].forEach(function (s) { fkwBox(br, 0.5, 1.0, 74, fkwMat("greystone"), s * 4.3, 1.7, 0); fkwSolid(s * 4.3, 145, 0.5, 74, -5, 4); });
fkwFloor(0, 145, 8.4, 74, 1.7);
var st = new THREE.Mesh(new THREE.PlaneGeometry(460, 12), fkwMat("cobble"));
st.rotation.x = -Math.PI / 2;
st.position.set(0, 1.06, 10);
G.add(st);
var sq = new THREE.Mesh(new THREE.PlaneGeometry(90, 70), fkwMat("paving"));
sq.rotation.x = -Math.PI / 2;
sq.position.set(0, 1.07, 10);
G.add(sq);
var ln = new THREE.Mesh(new THREE.PlaneGeometry(10, 120), fkwMat("cobble"));
ln.rotation.x = -Math.PI / 2;
ln.position.set(0, 1.06, 80);
G.add(ln);
var fn = new THREE.Group();
fn.position.set(0, fkwIngH(0, 10), 10);
G.add(fn);
fkwCyl(fn, 4, 4.2, 0.8, fkwMat("greystone"), 0, 0, 0, 24);
var fw = new THREE.Mesh(new THREE.CircleGeometry(3.7, 24), fkwWaterM(0x4A6A7A, 0.9));
fw.rotation.x = -Math.PI / 2;
fw.position.y = 0.65;
fn.add(fw);
fkwCyl(fn, 0.4, 0.5, 7, fkwMat("ashlar"), 0, 0.6, 0, 12);
fkwCyl(fn, 0.32, 0.4, 1.6, fkwMat("brass"), 0, 7.6, 0, 10);
fkwEll(fn, fkwMat("brass"), 0.22, 0.24, 0.22, 0, 9.4, 0, 10);
fkwRound(0, 10, 4.3);
var colours = ["render", "ochre", "rose", "grey", "plaster"], shut = [0x2A4A3A, 0x5A3A2A, 0x3A4A6A, 0x6A5A3A], north = [], south = [];
for (var x = -226; x < 230; x += 15)
if (Math.abs(x) > 52 && Math.abs(x - 90) > 24)
north.push(x);
for (x = -222; x < 230; x += 15)
if (Math.abs(x) > 52 && Math.abs(x - 150) > 14)
south.push(x);
north.forEach(function (x, i) { var w = 12.5 + (i % 3) * 0.8, h = 9 + (i % 4) * 1.6; fkwTownHouse(G, x, -12, w, 14, h, { wall: colours[i % 5], shut: shut[i % 4], rh: w * 0.85, dormer: i % 2 === 0 }); });
south.forEach(function (x, i) { var w = 12.5 + (i % 3) * 0.8, h = 9 + (i % 4) * 1.4; fkwTownHouse(G, x, 32, w, 14, h, { wall: colours[(i + 2) % 5], shut: shut[(i + 1) % 4], ry: Math.PI, rh: w * 0.85, dormer: i % 2 === 1 }); });
fkwTownHouse(G, -60, 10, 14, 24, 13, { wall: "ochre", ry: Math.PI / 2, rh: 10, trim: "ashlar", shut: 0x2A2A2A });
fkwSign(G, "RATHAUS", 4, 0.7, -52.8, fkwIngH(-60, 10) + 6, 10, Math.PI / 2, { bg: "#F0E4C8" });
fkwTownHouse(G, 60, 10, 14, 24, 12, { wall: "rose", ry: -Math.PI / 2, rh: 10, shut: 0x3A4A6A });
fkwChurch(G, 0, -62, { len: 36, w: 16, h: 15, tower: 7, th: 30, clock: true });
fkwTownHouse(G, 90, -22, 40, 20, 14, { wall: "render", trim: "ashlar", hip: true, roof: "slate", shut: 0x2A3A2A });
fkwSign(G, "UNIVERSITAS INGOLSTADIENSIS", 10, 0.9, 90, fkwIngH(90, -12) + 11, -11.85, 0, { bg: "#F0E8D4", ink: "#2A1A10" });
fkwTownHouse(G, 150, 32, 22, 14, 11, { wall: "ochre", ry: Math.PI, rh: 12, dormer: true });
fkwSign(G, "ZUM GOLDENEN HIRSCHEN", 6, 0.8, 150, fkwIngH(150, 25) + 3.6, 24.85, Math.PI, { bg: "#F2E2B0" });
fkwCoach(G, 150, 15, Math.PI / 2, {});
fkwBox(G, 1.4, 0.5, 0.8, fkwMat("oak"), 146, 1.0, 19);
fkwBox(G, 0.9, 0.6, 0.6, fkwLam(0x5A4030), 147.6, 1.0, 19.2);
var near = function (L, v) { return L.reduce(function (a, b) { return Math.abs(b - v) < Math.abs(a - v) ? b : a; }); };
var D = function (key, x, z, ry, nm) { var Rm = FKW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
fkwDoor(Rm, nm || ("The door of " + Rm.name.replace(/^Ingolstadt: /, "")), x, z, ry); };
var lx = near(south, -70);
D("lodging", lx, 23.4, 0, "The door of the house where Victor lodges");
D("lecture", 90, -10.4, Math.PI, "The door of the university");
D("inn", 150, 23.4, 0);
D("church", 0, -37.5, Math.PI);
[["apoth", -130], ["tailor", -175]].forEach(function (q) { D(q[0], near(north, q[1]), -3.6, Math.PI); });
[["beer", 120], ["butcher", 205]].forEach(function (q) { D(q[0], near(north, q[1]), -3.6, Math.PI); });
[["student", -115], ["binder", 70], ["widowi", -190]].forEach(function (q) { D(q[0], near(south, q[1]), 23.4, 0); });
fkwSign(G, "APOTHEKE", 2.4, 0.5, near(north, -130), fkwIngH(-130, -5) + 3.2, -4.85, 0, { bg: "#E8F0E0", ink: "#1A3A1A" });
var yz = 58;
fkwBox(G, 0.6, 3, 22, fkwMat("greystone"), lx - 11, fkwIngH(lx, yz), yz, 0, true);
fkwBox(G, 0.6, 3, 22, fkwMat("greystone"), lx + 11, fkwIngH(lx, yz), yz, 0, true);
fkwBox(G, 8, 3, 0.6, fkwMat("greystone"), lx - 7, fkwIngH(lx, yz), yz + 11, 0, true);
fkwBox(G, 8, 3, 0.6, fkwMat("greystone"), lx + 7, fkwIngH(lx, yz), yz + 11, 0, true);
fkwCyl(G, 0.2, 0.24, 1.4, fkwMat("iron"), lx + 4, fkwIngH(lx, yz), yz - 4, 8);
fkwBox(G, 1.2, 0.5, 0.7, fkwMat("greystone"), lx + 4, fkwIngH(lx, yz), yz - 3.3);
fkwTownWall(G, -50, -100, 50, -100, 2.6, null);
fkwTownWall(G, -50, -150, 50, -150, 2.6, [0, -150]);
fkwTownWall(G, -50, -100, -50, -150, 2.6, null);
fkwTownWall(G, 50, -100, 50, -150, 2.6, null);
var R = wRand(77);
for (var g = 0; g < (lite ? 24 : 60); g++) {
var gx = -44 + R() * 88, gz = -145 + R() * 40;
if (Math.abs(gx + 24) < 6 && Math.abs(gz + 118) < 6)
continue;
var cr = new THREE.Group();
cr.position.set(gx, fkwIngH(gx, gz), gz);
cr.rotation.y = (R() - 0.5) * 0.3;
G.add(cr);
if (R() < 0.5) {
fkwBox(cr, 0.12, 1.2, 0.12, fkwMat("iron"), 0, 0, 0);
fkwBox(cr, 0.6, 0.1, 0.1, fkwMat("iron"), 0, 0.85, 0);
}
else {
fkwBox(cr, 0.7, 0.9 + R() * 0.4, 0.18, fkwMat("greystone"), 0, 0, 0);
}
fkwBox(cr, 0.8, 0.1, 1.8, fkwMat("earth"), 0, 0, 0.9);
}
fkwTownHouse(G, -24, -124, 8, 6, 4, { wall: "darkstone", roof: "slate", shut: 0x1A1A1A });
D("charnel", -24, -119.6, Math.PI, "The door of the charnel-house");
fkwConifer(G, fkwScatter(31, lite ? 6 : 12, -48, -148, 48, -104, function (x, z) { return Math.abs(x + 24) > 8; }, fkwIngH, 0.7, 0.9));
fkwTownWall(G, -245, -160, 245, -160, 8, null);
fkwTownWall(G, -245, 95, 245, 95, 8, [0, 95]);
fkwTownWall(G, -245, -160, -245, 95, 8, [-245, 10]);
fkwTownWall(G, 245, -160, 245, 95, 8, [245, 10]);
[[0, 95, 0], [-245, 10, Math.PI / 2], [245, 10, Math.PI / 2]].forEach(function (q) {
var gt = new THREE.Group();
gt.position.set(q[0], fkwIngH(q[0], q[1]), q[1]);
gt.rotation.y = q[2];
G.add(gt);
fkwBox(gt, 12, 13, 6, fkwMat("brick"), 0, 0, 0);
var sh = new THREE.Mesh(fkwGeo("gtroof", function () { var c = new THREE.ConeGeometry(8.8, 7, 4); c.rotateY(Math.PI / 4); return c; }), fkwMat("tile"));
sh.position.y = 16.5;
sh.scale.set(1, 1, 0.55);
gt.add(sh);
var c = Math.cos(q[2]), s = Math.sin(q[2]);
fkwSolid(q[0] + c * 4.5, q[1] - s * 4.5, 3, 6, -5, 30, q[2]);
fkwSolid(q[0] - c * 4.5, q[1] + s * 4.5, 3, 6, -5, 30, q[2]);
});
fkwPlant(G, "tree", fkwScatter(41, lite ? 30 : 80, -540, -540, 540, -180, null, fkwIngH, 0.8, 1.3), { col: 0x4A7A34 });
fkwPlant(G, "grass", fkwScatter(42, lite ? 150 : 400, -540, -540, 540, 540, function (x, z) { return !(x > -250 && x < 250 && z > -165 && z < 100) && (z < 105 || z > 185); }, fkwIngH, 0.8, 1.4), { col: 0xD0E0A8 });
fkwPlant(G, "tree", fkwScatter(43, lite ? 60 : 160, -400, 260, 200, 540, function (x, z) { return Math.abs(x) > 8; }, fkwIngH, 0.9, 1.4), { col: 0x3E6A2E });
fkwConifer(G, fkwScatter(44, lite ? 50 : 120, -540, 300, -60, 540, function (x, z) { return Math.abs(x) > 8; }, fkwIngH, 0.9, 1.4));
fkwPlant(G, "reeds", fkwScatter(45, lite ? 40 : 120, -540, 108, 540, 118, null, fkwIngH, 0.8, 1.2), {});
fkwStrip(G, [[0, 180], [0, 240], [-40, 290], [-120, 330], [-200, 380]], 5, fkwIngH, fkwMat("earth"), 0.08);
for (var b = 0; b < 4; b++)
fkwBoat(G, -260 + b * 60, -0.25, 140 + (b % 2) * 8, Math.PI / 2 * (b % 2 ? 1 : -1), { mast: b === 2 });
fkwCrowd("ing1", [["A professor in his gown", "m", "fkblack", "Good day, good day. Late for my lecture on anatomy, as ever."], ["Two students laughing", "m", "fkgent", "Come to the beer-house tonight! We drink to the new philosophy!"], ["A market-woman", "f", "fkmaid", "Cabbages! Turnips! Apples from the Altmühl!"],
["A soldier of the garrison", "m", "fkblack", "The fortress? It's on the Danube side. Not that anyone's attacked it this year."], ["A priest", "m", "fkblack", "God be with you. Mass at seven, if you would come."], ["A lady with her daughter", "f", "fklady", "We are going to the draper's. The new muslin has come from Augsburg."],
["A water-carrier", "m", "fkwork", "Water from the fountain, fresh as snow."], ["A boy selling pretzels", "m", "fkwork", "Brezen! Hot Brezen!", null, true], ["A carter", "m", "fkwork", "Wood from the forest, for the winter fires."], ["A maid on an errand", "f", "fkmaid", "The mistress wants candles, and soap, and I'm late already."],
["An old woman with a stick", "f", "fkmaid", "I remember when the Jesuits ran the university. Now it's all new ideas."], ["A watchman", "m", "fkblack", "Ten o'clock and all's well, I'll be calling tonight. Mind the gates."]], -200, -5, 200, 25, { wander: 10 });
fkwCrowd("ing2", [["A student with his books", "m", "fkgent", "Chemistry with Waldman at eleven. You should come; he makes the old masters sound almost sensible."], ["A girl selling flowers", "f", "fkmaid", "Flowers for your lady, sir?", null, true], ["A pedlar", "m", "fkwork", "Ribbons, needles, almanacs!"], ["A beggar by the fountain", "m", "fkworn", "A kreuzer, for the love of God."]], -40, -20, 40, 40, { wander: 8 });
fkwCrowd("ing3", [["The coachman of the diligence", "m", "fkwork", "Geneva to Ingolstadt: days and days of jolting. The horses deserve their oats."], ["The ostler", "m", "fkwork", "I'll water the horses, sir; they've come a long road."]], 138, 8, 162, 20, { wander: 3 });
fkwCrowd("ing4", [["A gravedigger", "m", "fkworn", "Dig them deep, I do. The young doctors come at night otherwise, and the parson doesn't like it."], ["A widow at a grave", "f", "fklady", "(She does not look up from the grave.)"]], -40, -145, 40, -108, { wander: 4 });
fkwCrowd("ing5", [["A fisherman on the Danube", "m", "fkwork", "Carp and pike. The river's high this spring."], ["A washerwoman", "f", "fkmaid", "The Danube's cold even in June."], ["A farmer going to market", "m", "fkwork", "Geese for the market. Mind they don't nip you."]], -200, 100, 200, 190, { wander: 8, ok: function (x, z) { return z < 112 || z > 182 || Math.abs(x) < 3.5; } });
},
function (G) {
fkwIngRooms(G);
fkwIngol(G);
FKW_ING_FOLK.forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("ingh" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
var Ri = FKW.rooms.filter(function (r) { return r.key === "inn"; })[0];
if (Ri)
fkwCrowd("ingi", [["A traveller from Munich", "m", "fkgent", "The roads were frightful. Four days in that coach."], ["The innkeeper", "m", "fkwork", "Soup, bread, beer, a bed: all you need, sir."], ["The innkeeper's wife", "f", "fkmaid", "The Genevese gentleman? He came on the diligence, a year ago or more."]], Ri.cx - 4, Ri.cz - 2, Ri.cx + 4, Ri.cz + 2, { y: FKW_RY, wander: 1.5 });
var Rl = FKW.rooms.filter(function (r) { return r.key === "lecture"; })[0];
if (Rl)
fkwCrowd("ingl", [["A student taking notes", "m", "fkgent", "Shh. The lecture begins at eleven."], ["A student asleep", "m", "fkgent", "(He snores softly over his notebook.)"], ["A keen young man", "m", "fkgent", "Have you read Waldman's paper on the airs? Astonishing!"]], Rl.cx - 5, Rl.cz - 1, Rl.cx + 5, Rl.cz + 4, { y: FKW_RY + 0.6, wander: 0 });
var Rc = FKW.rooms.filter(function (r) { return r.key === "church"; })[0];
if (Rc)
fkwCrowd("ingc", [["An old woman praying", "f", "fkmaid", "(She tells her beads in a whisper.)"], ["The sacristan", "m", "fkblack", "The steeple was whitewashed only last year. You can see it from miles off."]], Rc.cx - 4, Rc.cz - 6, Rc.cx + 4, Rc.cz + 6, { y: FKW_RY, wander: 2 });
},
function (x, z) {
var n = fkwFbm(x * 0.006, z * 0.006, 4), h;
if (z > -40)
h = 2 + Math.max(0, z - 90) * 0.5 + n * 6;
else
h = 2 + (-40 - z) * 0.55 + n * 30 + Math.max(0, Math.abs(x) - 400) * 0.25;
var d = fkwPathD(x, z, FKW_GLAC);
if (d < 90 && z < -100) {
var floor = 2 + (-40 - z) * 0.5 - 14;
var t = Math.max(0, 1 - d / 90);
t = t * t * (3 - 2 * t);
h = h * (1 - t) + floor * t;
}
var rz = 48 + Math.sin(x * 0.01) * 6;
if (Math.abs(z - rz) < 10)
h = Math.min(h, -0.8 - (10 - Math.abs(z - rz)) * 0.12);
if (Math.hypot(x, z) < 90)
h = 2 + n * 1.2;
var mv = Math.hypot(x - 210, z + 420);
if (mv < 26)
h = h * (mv / 26) + (2 + 380 * 0.55 - 6) * (1 - mv / 26);
var hu = Math.hypot(x - 520, z + 760);
if (hu < 20)
h = h * (hu / 20) + fkwAlpsBase(520, -760) * (1 - hu / 20);
return h;
},
function (P, x, z, w, d, o) {
o = o || {};
var g = new THREE.Group(), y = fkwAlpsH(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = fkwMat("oak"), st = fkwMat("greystone");
fkwBox(g, w, 2.4, d, st, 0, -0.4, 0);
fkwBox(g, w, 3.4, d, fkwS("b:planks", 0x6A4A2E, 1.8), 0, 2.0, 0);
var rf = new THREE.Mesh(fkwGeo("chr" + w + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-w / 2 - 1.2, 0); s.lineTo(0, w * 0.28); s.lineTo(w / 2 + 1.2, 0); s.lineTo(-w / 2 - 1.2, 0); var e = new THREE.ExtrudeGeometry(s, { depth: d + 1.6, bevelEnabled: false }); e.translate(0, 0, -(d + 1.6) / 2); return e; }), fkwMat(o.roof || "shingle"));
rf.position.y = 5.4;
g.add(rf);
if (!fkwLite())
for (var i = 0; i < 5; i++)
fkwEll(g, fkwMat("greystone"), 0.35, 0.2, 0.3, (i - 2) * w * 0.18, 5.4 + w * 0.28 * (1 - Math.abs(i - 2) / 2.6) - 0.05, (i % 2 - 0.5) * d * 0.4, 8);
fkwBox(g, w * 0.8, 0.1, 1.1, wd, 0, 2.4, d / 2 + 0.55);
fkwBox(g, w * 0.8, 0.9, 0.06, wd, 0, 2.5, d / 2 + 1.08);
fkwBox(g, 1.1, 2.1, 0.08, fkwMat("darkoak"), 0, 0, d / 2 + 0.02);
[-1, 1].forEach(function (s) { fkwBox(g, 0.8, 0.8, 0.06, fkwMat("pane"), s * w * 0.28, 3.0, d / 2 + 0.03); fkwBox(g, 0.8, 0.8, 0.06, fkwMat("pane"), s * w * 0.28, 0.9, d / 2 + 0.03); });
for (var k = 0; k < 6; k++)
fkwBox(g, 0.9, 0.12, 0.7, fkwMat("oak"), -w / 2 - 0.6, 0.12 * k, -d / 2 + 0.6 + k % 2 * 0.2);
fkwSolid(x, z, w, d, y - 1, y + 9, o.ry || 0);
return g;
},
function (G) {
var X = FKW_ROOMXZ.alps, R, lite = fkwLite();
R = fkwRoom(G, "chinn", X.chinn[0], X.chinn[1], 11, 8, { wall: "planks", floor: "planks", name: "the inn at Chamounix", beams: true });
fkwHearth(R.g, -3, -3.7, 0, { h: R.h, pot: 1 });
for (var t = 0; t < 3; t++) {
fkwTable(R.g, -3.4 + t * 3.4, 1, 1.8, 0.9, 0.76, {});
fkwChair(R.g, -3.4 + t * 3.4, 0.3, 0);
fkwChair(R.g, -3.4 + t * 3.4, 1.7, Math.PI);
}
fkwBox(R.g, 3, 1.1, 0.7, fkwMat("darkoak"), 3.2, 0, -2.8);
fkwShelves(R.g, 3.2, -3.7, 3, 1.8, 0, { jars: 1 });
fkwWindowIn(R.g, -2, 2.3, -3.85, 0, 1.0, 1.0, { sky: 0xD8E8F8 });
fkwWindowIn(R.g, 2, 2.3, -3.85, 0, 1.0, 1.0, { sky: 0xD8E8F8 });
R = fkwRoom(G, "church", X.church[0], X.church[1], 14, 22, { wall: "plaster", floor: "greystone", h: 9, name: "the church of Chamounix", bare: 1, lightI: 1.0 });
for (var p = 0; p < 7; p++) {
fkwBox(R.g, 4.6, 0.8, 0.5, fkwMat("darkoak"), -3.6, 0, -4 + p * 1.9);
fkwBox(R.g, 4.6, 0.8, 0.5, fkwMat("darkoak"), 3.6, 0, -4 + p * 1.9);
}
fkwBox(R.g, 3, 1.1, 1.4, fkwMat("marble"), 0, 0, -9);
fkwBox(R.g, 3.6, 4.4, 0.3, fkwMat("brass"), 0, 1.1, -10.6);
fkwBox(R.g, 3, 3.8, 0.1, fkwLam(0x3A4A8A), 0, 1.4, -10.4);
fkwCandle(R.g, -1, 1.1, -9, { brass: 1 });
fkwCandle(R.g, 1, 1.1, -9, { brass: 1 });
var homes = [["guide", "Jacques Balmat's house, a guide", function (g) { fkwHearth(g, 0, -2.8, 0, { h: 3.2 }); fkwTable(g, 0, 0.4, 1.8, 0.9, 0.76, {}); fkwChair(g, 0, -0.3, 0); for (var i = 0; i < 4; i++) {
var a = fkwCyl(g, 0.03, 0.03, 1.6, fkwMat("oak"), -3.4, 0, -2 + i * 0.4, 6);
a.rotation.z = 0.15;
} fkwBox(g, 0.8, 0.12, 0.5, fkwLam(0x8A7A5A), 2.6, 0.9, -2.4); }],
["cheese", "the cheesemaker's chalet", function (g) { fkwCyl(g, 0.7, 0.6, 0.9, fkwMat("copper"), 0, 0, -1.6, 16); fkwHearth(g, 0, -2.8, 0, { h: 3.2, chimney: true }); fkwShelves(g, -3.4, 0, 4, 2.2, Math.PI / 2); for (var i = 0; i < 8; i++)
fkwCyl(g, 0.32, 0.32, 0.12, fkwLam(0xE8C878), -3.2, 0.12 + Math.floor(i / 4) * 0.55, -1.4 + (i % 4) * 0.9, 14); }],
["priest", "the curé's house", function (g) { fkwShelves(g, 0, -2.8, 4, 2.4, 0); fkwTable(g, 0, 0, 1.6, 0.9, 0.76, { mat: "darkoak" }); fkwChair(g, 0, -0.6, 0, { arm: 1 }); fkwCandle(g, 0.4, 0.76, 0.1, {}); fkwPicture(g, 2, 2.1, -2.95, 0, 0.6, 0.8); }],
["chalet", "a herdsman's chalet", function (g) { fkwHearth(g, 0, -2.8, 0, { h: 3.2, pot: 1 }); fkwBed(g, -2.6, -1.4, 0, { cover: 0x8A6A4A }); fkwTable(g, 1.6, 0.6, 1.4, 0.8, 0.76, {}); fkwBox(g, 0.4, 0.6, 0.4, fkwMat("oak"), 2.8, 0, -2); }]];
homes.forEach(function (H, i) { var A = X[H[0]], Rm = fkwRoom(G, H[0], A[0], A[1], 8, 6.4, { wall: "planks", floor: "planks", name: "Chamounix: " + H[1], beams: true, light: !lite }); H[2](Rm.g); });
R = fkwRoom(G, "temple", X.temple[0], X.temple[1], 7, 6, { wall: "greystone", floor: "greystone", h: 3.4, name: "the stone shelter on Montanvert", bare: 1, lightI: 0.7 });
fkwBox(R.g, 3, 0.45, 0.6, fkwMat("oak"), 0, 0, -2.5);
fkwBox(R.g, 0.6, 0.45, 2, fkwMat("oak"), -3, 0, 0);
fkwWindowIn(R.g, 0, 2.2, -2.9, 0, 1.2, 1.0, { sky: 0xE8F0F8 });
fkwHearth(R.g, 2.6, -1.8, -Math.PI / 2, { h: 3.4, mat: "greystone" });
var bk = fkwBox(R.g, 0.5, 0.06, 0.36, fkwLam(0x5A3A1A), 0, 0.45, -2.5);
R = fkwRoom(G, "hut", X.hut[0], X.hut[1], 6, 5, { wall: "darkstone", floor: "earth", h: 3, name: "the creature's hut on the mountain", bare: 1, env: "garret", lightI: 0.7, lightCol: 0xFFB070 });
fkwFire(R.g, 0, 0.02, -0.6, 0.8);
for (var s = 0; s < 5; s++) {
var st = fkwBox(R.g, 0.4, 0.25, 0.3, fkwMat("darkrock"), Math.cos(s * 1.26) * 0.7, 0, -0.6 + Math.sin(s * 1.26) * 0.7);
}
fkwBox(R.g, 2, 0.2, 1, fkwLam(0x5A4A3A), -1.6, 0, 1.2);
fkwBox(R.g, 0.5, 0.4, 0.4, fkwLam(0x7A5A3A), 2, 0, -1.8);
fkwBox(R.g, 0.8, 0.05, 0.5, fkwLam(0xC8A040), 1.8, 0, 1.4);
},
function (G) {
var lite = fkwLite(), X = FKW_ROOMXZ.alps;
fkwTerrain(G, -1340, -1340, 2680, 2680, lite ? 26 : 14, fkwAlpsH, fkwMat("meadow"), function (x, z, y, c) {
var g = 0.82 + fkwFbm(x * 0.02, z * 0.02, 2) * 0.22, d = fkwPathD(x, z, FKW_GLAC);
if (d < 70 && z < -110) {
var t = Math.min(1, (70 - d) / 18);
c.setRGB(0.86 * (1 - t) + 0.9 * t, 0.88 * (1 - t) + 0.95 * t, 0.86 * (1 - t) + 1 * t);
return;
}
if (y > 250) {
c.setRGB(0.96, 0.97, 1);
return;
}
if (y > 150) {
var u = (y - 150) / 100;
c.setRGB(0.55 * (1 - u) + 0.95 * u, 0.55 * (1 - u) + 0.96 * u, 0.5 * (1 - u) + 0.99 * u);
return;
}
if (y > 70) {
c.setRGB(0.62 * g, 0.66 * g, 0.5 * g);
return;
}
if (y < 0) {
c.setRGB(0.6, 0.58, 0.5);
return;
}
c.setRGB(0.75 * g, 0.9 * g, 0.6 * g);
});
var pts = [];
for (var x = -1300; x <= 1300; x += 40)
pts.push([x, 48 + Math.sin(x * 0.01) * 6]);
var arve = fkwStrip(G, pts, 16, function () { return -0.3; }, fkwWaterM(0x8A9A9A, 0.92), 0);
FKW.water.push(arve);
arve.userData.fx = 0.05;
arve.userData.fz = 1;
var apts = [[180, -125], [160, -80], [130, -30], [110, 10], [100, 48]];
var arv = fkwStrip(G, apts, 5, function (x, z) { return fkwAlpsH(x, z) + 0.15; }, fkwWaterM(0x9AAAB0, 0.9), 0);
FKW.water.push(arv);
fkwBox(G, 6, 0.6, 26, fkwMat("planks"), -320, 1.2, 44);
fkwFloor(-320, 44, 6, 26, 1.8);
[-1, 1].forEach(function (s) { fkwBox(G, 0.2, 1, 26, fkwMat("oak"), -320 + s * 2.9, 1.8, 44); fkwSolid(-320 + s * 2.9, 44, 0.3, 26, -4, 4); });
fkwStrip(G, [[-1300, 20], [-700, 24], [-330, 32], [-320, 57], [-200, 30], [-60, 12], [0, 10], [90, 6], [300, 10], [1300, 20]], 5, fkwAlpsH, fkwMat("gravel"), 0.08);
var zz = [[70, -60], [40, -110], [110, -150], [60, -200], [150, -240], [110, -290], [190, -330], [160, -380], [210, -420]];
fkwStrip(G, zz, 2.6, fkwAlpsH, fkwMat("earth"), 0.1);
var R = wRand(9);
for (var c = 0; c < (lite ? 40 : 110); c++) {
var u = R(), seg = Math.floor(u * (FKW_GLAC.length - 1)), a = FKW_GLAC[seg], b = FKW_GLAC[seg + 1], f = R(), gx = a[0] + (b[0] - a[0]) * f + (R() - 0.5) * 90, gz = a[1] + (b[1] - a[1]) * f + (R() - 0.5) * 50;
if (gz > -130)
continue;
if (R() < 0.55) {
var cv = fkwBox(G, 1.2 + R() * 1.2, 0.4, 10 + R() * 16, fkwLam(0x3A6A8A), gx, fkwAlpsH(gx, gz) - 0.3, gz, R() * 0.5 + 0.6);
}
else {
var sr = new THREE.Mesh(fkwGeo("serac", function () { var g = new THREE.DodecahedronGeometry(1, 0); g.scale(1, 1.6, 0.8); return g; }), fkwMat("blueice"));
sr.position.set(gx, fkwAlpsH(gx, gz) + 1, gz);
sr.scale.setScalar(1.6 + R() * 3);
sr.rotation.y = R() * 6;
G.add(sr);
}
}
var cave = new THREE.Mesh(new THREE.TorusGeometry(7, 2.6, 8, 14, Math.PI), fkwMat("blueice"));
cave.position.set(182, fkwAlpsH(182, -130) - 0.5, -130);
G.add(cave);
var cdk = new THREE.Mesh(new THREE.CircleGeometry(6, 14, 0, Math.PI), fkwLam(0x0E1E2A));
cdk.position.set(182, fkwAlpsH(182, -130) - 0.5, -131);
G.add(cdk);
[[60, -640, 60, 180], [150, -820, 70, 240], [620, -560, 60, 200], [700, -900, 80, 280], [420, -1100, 90, 320], [-80, -520, 60, 170]].forEach(function (q, i) { fkwPeak(G, q[0], q[1], q[2], q[3], { k: 20 + i, snowLine: 0.32, y: fkwAlpsH(q[0], q[1]) - 10, mat: fkwMat("darkrock"), sz: 0.6 }); });
fkwPeak(G, 300, 2200, 1500, 1900, { k: 31, snowLine: 0.7 });
fkwPeak(G, -500, 1900, 900, 1300, { k: 32, snowLine: 0.6 });
fkwPeak(G, 1100, 1800, 900, 1400, { k: 33, snowLine: 0.6 });
fkwPeak(G, -1600, -900, 900, 900, { k: 34, snowLine: 0.35, mat: fkwMat("darkrock") });
fkwConifer(G, fkwScatter(51, lite ? 160 : 420, -1300, -480, 1300, 1300, function (x, z) { var y = fkwAlpsH(x, z); return y > 3 && y < 190 && fkwPathD(x, z, FKW_GLAC) > 80 && fkwPathD(x, z, zz) > 4 && Math.hypot(x, z) > 80 && Math.abs(z - 48) > 14; }, fkwAlpsH, 0.9, 1.6), { snow: true });
for (var b = 0; b < (lite ? 8 : 20); b++) {
var bx = 60 + R() * 160, bz = -120 - R() * 260, lg = fkwBox(G, 0.5, 0.5, 8, fkwMat("darkbark"), bx, fkwAlpsH(bx, bz) + 0.2, bz, R() * 3);
lg.rotation.z = 0.1;
}
fkwPlant(G, "rock", fkwScatter(52, lite ? 60 : 140, -600, -1200, 1000, -100, function (x, z) { return fkwPathD(x, z, FKW_GLAC) < 110; }, fkwAlpsH, 0.8, 3.0), { mat: fkwMat("rock") });
fkwPlant(G, "grass", fkwScatter(53, lite ? 120 : 340, -900, -60, 900, 300, function (x, z) { var y = fkwAlpsH(x, z); return y > 0.5 && y < 60; }, fkwAlpsH, 0.8, 1.4), { col: 0xD8E8B8 });
fkwPlant(G, "flowers", fkwScatter(54, lite ? 40 : 120, -600, 60, 600, 300, null, fkwAlpsH, 0.7, 1.1), { col: "#C8A0E0" });
fkwChurch(G, -40, -30, { len: 22, w: 14, h: 9, tower: 5, th: 20, ry: Math.PI, roof: "shingle", spireM: fkwShine(0x5A5A60, 0.4, 0.6) });
fkwChalet(G, 30, -10, 14, 10, {});
fkwSign(G, "AUBERGE DE L'UNION", 4, 0.6, 30, fkwAlpsH(30, -10) + 3.0, -4.9, 0, { bg: "#F2E8D0" });
var ch = [[-60, 30, 0], [-20, 40, Math.PI], [60, 30, 0], [-80, -10, 0.2], [80, -30, -0.3], [100, 20, Math.PI], [-110, 20, 0.4], [-30, 60, Math.PI]];
ch.forEach(function (q, i) { fkwChalet(G, q[0], q[1], 10 + (i % 3), 8 + (i % 2), { ry: q[2] }); });
var D = function (key, x, z, ry, nm) { var Rm = FKW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
fkwDoor(Rm, nm || ("The door of " + Rm.name.replace(/^Chamounix: /, "")), x, z, ry); };
D("chinn", 30, -3.4, Math.PI);
D("church", -40, -49.5, 0);
var dor = function (i) { var q = ch[i]; return [q[0] + Math.sin(q[2]) * 6.4, q[1] + Math.cos(q[2]) * 6.4]; };
[["guide", 0], ["cheese", 2], ["priest", 3], ["chalet", 5]].forEach(function (k) { var p = dor(k[1]); D(k[0], p[0], p[1], ch[k[1]][2] + Math.PI); });
[[-150, -10], [-170, 10], [200, 30], [230, 10], [250, 40]].forEach(function (q, i) { fkwHorse(G, q[0], fkwAlpsH(q[0], q[1]), q[1], i * 1.3, { col: [0x8A6A4A, 0xE8E0D0, 0x5A3A2A][i % 3], s: 1.4, kind: "fkcow" }); });
[[38, -2], [42, -1]].forEach(function (q) { fkwHorse(G, q[0], fkwAlpsH(q[0], q[1]), q[1], Math.PI / 2, { col: 0x6A6A6A, s: 1.4, kind: "fkmule" }); });
var my = fkwAlpsH(210, -420);
var tm = new THREE.Group();
tm.position.set(210, my, -430);
G.add(tm);
fkwBox(tm, 8, 3.6, 7, fkwMat("greystone"), 0, 0, 0);
var tr = new THREE.Mesh(fkwGeo("tmr", function () { var c = new THREE.ConeGeometry(6, 2.4, 4); c.rotateY(Math.PI / 4); return c; }), fkwMat("slate"));
tr.position.y = 4.8;
tr.scale.set(1, 1, 0.9);
tm.add(tr);
fkwBox(tm, 1.1, 2.1, 0.1, fkwMat("darkoak"), 0, 0, 3.52);
fkwSolid(210, -430, 8, 7, my - 1, my + 6);
D("temple", 210, -425, Math.PI, "The door of the shelter on Montanvert");
var hy = fkwAlpsH(520, -760), hut = new THREE.Group();
hut.position.set(520, hy, -766);
G.add(hut);
fkwBox(hut, 6, 2.6, 5, fkwMat("darkrock"), 0, 0, 0);
var hr = fkwBox(hut, 7, 0.4, 6, fkwLam(0x4A3A2A), 0, 2.6, 0);
hr.rotation.x = 0.12;
fkwBox(hut, 1, 1.8, 0.1, fkwLam(0x1A120A), 0, 0, 2.52);
fkwSmoke(hut, 1.4, 3.2, -1, 0x8A8A8A, 6);
fkwSolid(520, -766, 6, 5, hy - 1, hy + 4);
D("hut", 520, -762, Math.PI, "The low door of the hut");
fkwCrowd("alp1", [["A guide with his alpenstock", "m", "fkwork", "The Mer de Glace is three hours up. Start early, before the clouds come down."], ["A woman carrying hay", "f", "fkmaid", "Heavy work, but the cows must eat all winter."], ["An English traveller", "m", "fkgent", "Sublime! Utterly sublime! I have filled two sketchbooks."],
["A boy with goats", "m", "fkwork", "My goats know the path better than the guides!", null, true], ["A woman at the well", "f", "fkmaid", "The water comes straight down off the glacier. Cold enough to stop your heart."], ["A muleteer", "m", "fkwork", "Mules are surer than horses on the mountain roads."], ["An old man on a bench", "m", "fkelder", "I have seen sixty winters here. The glaciers grow, and shrink, and grow."]], -120, -40, 120, 60, { wander: 8, ok: function (x, z) { return Math.abs(z - 48) > 12; } });
fkwCrowd("alp2", [["A crystal-hunter", "m", "fkwork", "I look for crystals in the rocks by the glacier. Dangerous work, but the travellers pay well."], ["Two travellers with a guide", "m", "fkgent", "We are going up to the Temple of Nature, they call it. A hut, really."]], 60, -220, 160, -120, { wander: 6 });
},
function (G) {
fkwAlpRooms(G);
fkwAlps(G);
FKW_ALP_FOLK.forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("alph" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
var Ri = FKW.rooms.filter(function (r) { return r.key === "chinn"; })[0];
if (Ri)
fkwCrowd("alpi", [["The innkeeper", "m", "fkwork", "A room with a view of the glacier, monsieur. And the best trout in Savoy."], ["A tired traveller", "m", "fkgent", "We came up from Servox today. My legs are done for."]], Ri.cx - 4, Ri.cz - 2, Ri.cx + 4, Ri.cz + 2, { y: FKW_RY, wander: 1.5 });
},
function (x, z) {
var n = fkwFbm(x * 0.008, z * 0.008, 4), h = 4 + n * 16;
if (Math.hypot(x, z - 10) < 46)
h = 4 + n * 2;
if (Math.hypot(x + 300, z - 40) < 70)
h = 4 + n * 3;
var sd = Math.abs(x - 60 - Math.sin(z * 0.02) * 12);
if (sd < 7 && z > -220 && z < 260)
h = Math.min(h, 2.4 + sd * 0.2);
var rd = fkwPathD(x, z, [[560, -360], [260, -310], [200, -300], [120, -340], [-560, -300]]);
if (rd < 22)
h = Math.min(h, -2.2 + rd * 0.1);
else if (rd < 40)
h = Math.min(h, h * (rd - 22) / 18 + (-0.2) * (40 - rd) / 18);
return h;
},
function (G) {
var X = FKW_ROOMXZ.cottage, R, lite = fkwLite();
R = fkwRoom(G, "cott", X.cott[0], X.cott[1], 10, 8, { wall: "plaster", floor: "planks", name: "the De Laceys' cottage", beams: true, h: 3.0, lightI: 0.85 });
fkwHearth(R.g, 0, -3.7, 0, { h: R.h, pot: 1 });
fkwTable(R.g, 1.6, 0.8, 1.8, 0.9, 0.74, {});
fkwChair(R.g, 1.0, 0.1, 0);
fkwChair(R.g, 2.2, 0.1, 0);
fkwChair(R.g, 1.6, 1.6, Math.PI);
fkwChair(R.g, -1.8, -2.2, 0.6, { arm: 1, seat: "leather" });
var gu = new THREE.Group();
gu.position.set(-2.5, 0.45, -2.1);
gu.rotation.z = 0.5;
R.g.add(gu);
fkwEll(gu, fkwMat("oak"), 0.18, 0.04, 0.24, 0, 0, 0, 10);
fkwBox(gu, 0.05, 0.04, 0.5, fkwMat("darkoak"), 0, 0, -0.45);
FKW.cotGuitar = gu;
var sw = new THREE.Group();
sw.position.set(-3.6, 0, 0.8);
R.g.add(sw);
fkwBox(sw, 0.2, 0.5, 1.0, fkwMat("oak"), 0, 0, 0);
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.03, 6, 18), fkwMat("oak"));
wh.position.set(0, 0.95, 0.2);
wh.rotation.y = Math.PI / 2;
sw.add(wh);
fkwCyl(sw, 0.04, 0.04, 0.4, fkwLam(0xE8DCC4), 0, 0.6, -0.4, 8);
fkwShelves(R.g, 4.6, -1.4, 2.4, 2, -Math.PI / 2);
fkwBox(R.g, 0.8, 0.5, 0.5, fkwMat("darkoak"), 4.2, 0, 2.6);
for (var i = 0; i < 4; i++)
fkwCyl(R.g, 0.12, 0.1, 0.14, fkwLam([0xC8B8A0, 0x8A6A4A, 0xD8D0C0, 0x6A5A44][i]), 3.4 + i * 0.25, 1.6, -3.7, 10);
fkwWindowIn(R.g, -2.6, 2.0, 3.85, Math.PI, 0.9, 0.9, { sky: 0xC8D8C8 });
fkwWindowIn(R.g, 2.6, 2.0, 3.85, Math.PI, 0.9, 0.9, { sky: 0xC8D8C8 });
fkwBox(R.g, 0.03, 0.04, 0.3, fkwLam(0xFFF0C8), -1.2, 1.3, -3.88);
fkwSpot(R.cx + 4.6, R.cz + 2.4, 1.2, "The door to the inner room", "go in", function () { fkwGo(fkwIn("cottage", "inner", 0, 1.6)(), null); }, FKW_RY);
R = fkwRoom(G, "inner", X.inner[0], X.inner[1], 6, 5, { wall: "plaster", floor: "planks", name: "the inner room of the cottage", beams: true, h: 2.8, light: !lite });
fkwBed(R.g, -1.6, -1.2, 0, { cover: 0x8A7A5A });
fkwBed(R.g, 1.4, -1.2, 0, { cover: 0x5A6A7A });
fkwBox(R.g, 0.9, 0.5, 0.5, fkwMat("darkoak"), 0, 0, -2.1);
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The door", "go out", function () { fkwGo(fkwIn("cottage", "cott", 4.6, 1.6)(), null); }, FKW_RY);
R = fkwRoom(G, "shep", X.shep[0], X.shep[1], 5, 5, { wall: "planks", floor: "earth", name: "the shepherd's hut", h: 2.6, bare: 1, lightI: 0.7 });
fkwHearth(R.g, 0, -2.3, 0, { h: 2.6, mat: "greystone" });
fkwTable(R.g, 0.8, 0.4, 1.0, 0.7, 0.72, {});
fkwCyl(R.g, 0.14, 0.12, 0.1, fkwLam(0xC8904A), 0.6, 0.72, 0.4, 10);
fkwCyl(R.g, 0.08, 0.08, 0.14, fkwLam(0xE8DCC4), 1.0, 0.72, 0.3, 10);
fkwEll(R.g, fkwLam(0xE8D088), 0.12, 0.06, 0.1, 0.9, 0.76, 0.6, 8);
[["vil1", "the best cottage in the village", 0], ["vil2", "a weaver's cottage", 1], ["vil3", "the smith's house", 2]].forEach(function (H) {
var A = X[H[0]], Rm = fkwRoom(G, H[0], A[0], A[1], 7, 6, { wall: "plaster", floor: "planks", name: "the village: " + H[1], beams: true, light: !lite });
fkwHearth(Rm.g, 0, -2.8, 0, { h: 3.2, pot: H[2] === 0 });
fkwTable(Rm.g, 1.6, 0.4, 1.4, 0.8, 0.74, {});
fkwChair(Rm.g, 1.6, -0.3, 0);
fkwBed(Rm.g, -2.4, 0.2, Math.PI / 2, {});
if (H[2] === 0)
for (var k = 0; k < 5; k++)
fkwEll(Rm.g, fkwLam([0xC8904A, 0xE8D088, 0xA84A2A][k % 3]), 0.1, 0.07, 0.1, 1.2 + k * 0.2, 0.78, 0.4, 8);
if (H[2] === 1) {
var lm = fkwBox(Rm.g, 1.6, 1.4, 1.0, fkwMat("oak"), -0.6, 0, 1.6);
}
if (H[2] === 2) {
fkwBox(Rm.g, 0.5, 0.7, 0.3, fkwMat("iron"), 2.4, 0, -1.4);
fkwBox(Rm.g, 0.9, 0.12, 0.3, fkwMat("iron"), 2.4, 0.7, -1.4);
}
});
},
function (P, x, z, w, d, o) {
o = o || {};
var g = new THREE.Group(), y = fkwCotH(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
fkwBox(g, w, 2.8, d, fkwMat(o.wall || "plaster"), 0, 0, 0);
fkwBox(g, w + 0.1, 0.5, d + 0.1, fkwMat("greystone"), 0, 0, 0);
var rf = new THREE.Mesh(fkwGeo("ctr" + w + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-w / 2 - 0.7, 0); s.lineTo(-0.3, w * 0.5); s.lineTo(0.3, w * 0.5); s.lineTo(w / 2 + 0.7, 0); s.lineTo(-w / 2 - 0.7, 0); var e = new THREE.ExtrudeGeometry(s, { depth: d + 1, bevelEnabled: true, bevelSize: 0.25, bevelThickness: 0.25, bevelSegments: 2 }); e.translate(0, 0, -(d + 1) / 2); return e; }), fkwMat("thatch"));
rf.position.y = 2.6;
g.add(rf);
fkwBox(g, 0.7, w * 0.5 + 1, 0.7, fkwMat("stone"), w * 0.3, 2.4, 0);
fkwBox(g, 1.0, 2.0, 0.08, fkwMat("darkoak"), 0, 0, d / 2 + 0.02);
[-1, 1].forEach(function (s) { fkwBox(g, 0.8, 0.8, 0.06, fkwMat("pane"), s * w * 0.3, 1.2, d / 2 + 0.03); fkwBox(g, 0.9, 0.08, 0.12, fkwMat("oak"), s * w * 0.3, 1.15, d / 2 + 0.06); });
if (o.smoke !== false)
fkwSmoke(g, w * 0.3, w * 0.5 + 3.6, 0, 0x9A9A9A, 6);
fkwSolid(x, z, w, d, y - 1, y + 6, o.ry || 0);
return g;
},
function (G) {
var lite = fkwLite(), sea = fkwSeason(), X = FKW_ROOMXZ.cottage;
var tint = { winter: [0.92, 0.94, 0.97], spring: [0.7, 0.92, 0.55], summer: [0.66, 0.86, 0.48], autumn: [0.86, 0.76, 0.5] }[sea] || [0.7, 0.9, 0.55];
fkwTerrain(G, -600, -600, 1200, 1200, lite ? 16 : 9, fkwCotH, sea === "winter" ? fkwMat("snow") : fkwMat("meadow"), function (x, z, y, c) { var g = 0.82 + fkwFbm(x * 0.03, z * 0.03, 2) * 0.22; if (y < 0) {
c.setRGB(0.55, 0.5, 0.42);
return;
} c.setRGB(tint[0] * g, tint[1] * g, tint[2] * g); });
var sp = [];
for (var z = -220; z <= 260; z += 20)
sp.push([60 + Math.sin(z * 0.02) * 12, z]);
var st = fkwStrip(G, sp, 5, function () { return 2.6; }, fkwWaterM(0x4A6A6A, 0.9), 0);
FKW.water.push(st);
st.userData.fx = 0;
st.userData.fz = -1;
var rv = fkwStrip(G, [[560, -360], [260, -310], [200, -300], [120, -340], [-560, -300]], 40, function () { return -0.6; }, fkwWaterM(0x3A5A5A, 0.94), 0);
FKW.water.push(rv);
rv.userData.fx = 1;
rv.userData.fz = 0.1;
if (sea === "winter")
fkwBox(G, 6, 0.2, 520, fkwMat("ice"), 60, 2.55, 20, 0);
fkwBox(G, 1.2, 0.3, 7, fkwMat("planks"), 60, 2.7, -40);
fkwFloor(60, -40, 1.2, 7, 3.0);
var burnt = !!FKW.st.burnt;
fkwCottage(G, 0, 16, 12, 9, burnt ? { wall: "darkstone", smoke: false } : {});
var cy = fkwCotH(0, 16);
if (burnt) {
[[-4, 14], [0, 17], [4, 15], [-2, 19], [3, 12]].forEach(function (q, i) { var f = fkwFire(G, q[0], cy + 2.6 + (i % 2) * 1.6, q[1], 2.2); });
fkwSmoke(G, 0, cy + 8, 16, 0x3A3A3A, 10);
}
var hv = new THREE.Group();
hv.position.set(0, cy, 8.3);
G.add(hv);
hv.userData.keep = 1;
var wd = fkwMat("planks");
fkwBox(hv, 0.2, 1.9, 6, wd, -3, 0, -0.3);
fkwBox(hv, 0.2, 1.9, 6, wd, 3, 0, -0.3);
fkwBox(hv, 2.0, 1.9, 0.2, wd, -2, 0, -3.2);
fkwBox(hv, 2.0, 1.9, 0.2, wd, 2, 0, -3.2);
var hr = fkwBox(hv, 6.6, 0.15, 6.6, fkwMat("thatch"), 0, 1.9, -0.3);
hr.rotation.x = -0.18;
fkwBox(hv, 5.6, 0.1, 5.6, fkwLam(0xB8A060), 0, 0.02, -0.3);
fkwBox(hv, 1.2, 1.7, 0.15, fkwMat("planks"), -0.1, 0, -3.4);
FKW.cotBoard = hv.children[hv.children.length - 1];
fkwSolid(-3, 8, 0.3, 6, cy - 1, cy + 2.2);
fkwSolid(3, 8, 0.3, 6, cy - 1, cy + 2.2);
fkwSolid(-2, 5.1, 2, 0.3, cy - 1, cy + 2.2);
fkwSolid(2, 5.1, 2, 0.3, cy - 1, cy + 2.2);
fkwBox(G, 0.06, 0.04, 0.3, fkwGlowM(0xFFE8B0), -1.2, cy + 1.3, 11.42);
fkwPlant(G, "flowers", fkwScatter(61, lite ? 20 : 50, 2, 22, 16, 32, null, fkwCotH, 0.7, 1.0), { col: sea === "winter" ? "#D8D8D8" : "#E8D080" });
for (var r = 0; r < 5; r++) {
fkwBox(G, 8, 0.25, 0.6, fkwMat("earth"), 10, cy, 24 + r * 1.4);
if (sea !== "winter")
fkwPlant(G, "bush", fkwScatter(62 + r, 6, 6, 24 + r * 1.4, 14, 24.4 + r * 1.4, null, fkwCotH, 0.25, 0.35), { col: 0x4A8A3A });
}
var wp = new THREE.Group();
wp.position.set(-14, cy, 20);
G.add(wp);
for (var k = 0; k < 18; k++) {
var lg = fkwCyl(wp, 0.14, 0.14, 1.2, fkwMat("bark"), (k % 6 - 2.5) * 0.3, 0.14 + Math.floor(k / 6) * 0.28, 0, 8);
lg.rotation.x = Math.PI / 2;
lg.position.y = 0.14 + Math.floor(k / 6) * 0.27;
}
fkwBox(G, 0.5, 0.6, 0.4, fkwMat("oak"), -11.5, cy, 22);
var axe = fkwBox(G, 0.04, 0.04, 0.8, fkwMat("oak"), -11.5, cy + 0.62, 22);
fkwSolid(-14, 20, 2.2, 1.4, cy - 1, cy + 1.2);
var sty = new THREE.Group();
sty.position.set(14, cy, 6);
G.add(sty);
[[0, -2, 4, 0.1], [0, 2, 4, 0.1], [-2, 0, 0.1, 4], [2, 0, 0.1, 4]].forEach(function (q) { fkwBox(sty, q[2], 1, q[3], fkwMat("oak"), q[0], 0, q[1]); });
fkwSolid(14, 6, 4, 4, cy - 1, cy + 1.2);
fkwBox(G, 0.2, 1.1, 24, fkwMat("oak"), -18, cy, 20);
fkwBox(G, 0.2, 1.1, 24, fkwMat("oak"), 18, cy, 20);
fkwBox(G, 36, 1.1, 0.2, fkwMat("oak"), 0, cy, 32);
fkwSolid(-18, 20, 0.3, 24, cy - 1, cy + 1.2);
fkwSolid(18, 20, 0.3, 24, cy - 1, cy + 1.2);
fkwSolid(-10, 32, 16, 0.3, cy - 1, cy + 1.2);
fkwSolid(10, 32, 16, 0.3, cy - 1, cy + 1.2);
var D = function (key, x, z, ry, nm) { var Rm = FKW.rooms.filter(function (q) { return q.key === key; })[0]; if (Rm)
fkwDoor(Rm, nm || ("The door of " + Rm.name.replace(/^the village: /, "")), x, z, ry); };
if (!burnt)
D("cott", 0, 22, Math.PI, "The cottage door");
var sh = new THREE.Group(), shy = fkwCotH(-150, 196);
sh.position.set(-150, shy, 196);
G.add(sh);
fkwBox(sh, 5, 2.4, 5, fkwMat("planks"), 0, 0, 0);
var shr = new THREE.Mesh(fkwGeo("shr", function () { var c = new THREE.ConeGeometry(4.2, 2.4, 4); c.rotateY(Math.PI / 4); return c; }), fkwMat("thatch"));
shr.position.y = 3.6;
sh.add(shr);
fkwBox(sh, 0.9, 1.8, 0.06, fkwMat("darkoak"), 0, 0, 2.52);
fkwSolid(-150, 196, 5, 5, shy - 1, shy + 4);
D("shep", -150, 200, Math.PI, "The door of the hut");
var vil = [[-320, 20, 0, "vil1"], [-290, 60, Math.PI, "vil2"], [-260, 24, 0, "vil3"], [-340, 70, Math.PI], [-280, -10, 0], [-240, 64, Math.PI], [-350, -6, 0.3]];
vil.forEach(function (q) { fkwCottage(G, q[0], q[1], 9, 7, { ry: q[2], wall: q[3] ? "plaster" : "render" }); if (q[3])
D(q[3], q[0] + Math.sin(q[2]) * 5, q[1] + Math.cos(q[2]) * 5, q[2] + Math.PI); });
var leaf = { winter: 0x8A7A6A, spring: 0x7AB04A, summer: 0x4A7A34, autumn: 0xC87A2A }[sea] || 0x4A7A34;
var clear = function (x, z) { return Math.hypot(x, z - 10) > 40 && Math.hypot(x + 300, z - 40) > 72 && Math.hypot(x + 150, z - 196) > 12 && Math.abs(x - 60 - Math.sin(z * 0.02) * 12) > 8 && fkwPathD(x, z, [[560, -360], [260, -310], [200, -300], [120, -340], [-560, -300]]) > 26; };
fkwPlant(G, "tree", fkwScatter(71, lite ? 110 : 300, -590, -590, 590, 590, clear, fkwCotH, 0.9, 1.5), { col: leaf });
fkwConifer(G, fkwScatter(72, lite ? 80 : 200, -590, -590, 590, 590, clear, fkwCotH, 0.9, 1.5), { snow: sea === "winter" });
if (sea !== "winter") {
fkwPlant(G, "bush", fkwScatter(73, lite ? 50 : 140, -590, -590, 590, 590, clear, fkwCotH, 0.6, 1.1), { col: 0x3E6A2E });
fkwPlant(G, "grass", fkwScatter(74, lite ? 120 : 340, -80, -80, 80, 100, null, fkwCotH, 0.8, 1.3), { col: 0xD0E0A0 });
}
if (sea === "spring" || sea === "summer")
fkwPlant(G, "flowers", fkwScatter(75, lite ? 50 : 140, -100, -100, 100, 120, null, fkwCotH, 0.7, 1.1), { col: "#F0E0F0" });
if (sea === "winter")
fkwSnowfall(G, lite ? 200 : 420, 1.0);
var sat = new THREE.Group();
sat.position.set(130, fkwCotH(130, -160), -160);
G.add(sat);
sat.userData.keep = 1;
fkwBox(sat, 0.6, 0.3, 0.4, fkwLam(0x5A3A1E), 0, 0, 0);
fkwBox(sat, 0.62, 0.06, 0.3, fkwLam(0x4A2E16), 0, 0.3, -0.04);
FKW.cotSatchel = sat;
sat.visible = !FKW.st.satchel;
fkwCrowd("cot1", [["A villager", "m", "fkwork", "Strange tracks in the snow this winter. Huge. A bear, the old men say."], ["A woman with a pail", "f", "fkmaid", "Milk from the cow, warm still."], ["Children playing", "m", "fkwork", "Catch me if you can!", null, true], ["An old woman spinning at her door", "f", "fkmaid", "The De Laceys? Poor folk from France, living in the old cottage in the wood. Gentlefolk once, they say."], ["A woodcutter", "m", "fkwork", "Wolves this winter, they say. Keep to the path."]], -340, 0, -240, 80, { wander: 9 });
},
function (G) {
var X = FKW_ROOMXZ.rhine, R, lite = fkwLite();
R = fkwRoom(G, "rinn", X.rinn[0], X.rinn[1], 11, 8, { wall: "render", name: "the inn on the Rhine", beams: true });
fkwHearth(R.g, -3, -3.7, 0, { h: R.h, pot: 1 });
for (var t = 0; t < 3; t++) {
fkwTable(R.g, -3.4 + t * 3.4, 1, 1.8, 0.9, 0.76, {});
fkwChair(R.g, -3.4 + t * 3.4, 0.3, 0);
fkwChair(R.g, -3.4 + t * 3.4, 1.7, Math.PI);
}
fkwBox(R.g, 3, 1.1, 0.7, fkwMat("darkoak"), 3.2, 0, -2.8);
for (t = 0; t < 4; t++)
fkwCyl(R.g, 0.36, 0.36, 0.8, fkwMat("oak"), 5.0, 0, -1 + t * 0.85, 12);
fkwWindowIn(R.g, -2, 2.3, -3.85, 0, 1.1, 1.2, { sky: 0xA8C8E0 });
fkwWindowIn(R.g, 2, 2.3, -3.85, 0, 1.1, 1.2, { sky: 0xA8C8E0 });
R = fkwRoom(G, "vint", X.vint[0], X.vint[1], 9, 7, { wall: "plaster", floor: "greystone", name: "a vintner's house and cellar", beams: true, light: !lite });
for (t = 0; t < 6; t++) {
var b = fkwCyl(R.g, 0.5, 0.5, 1.2, fkwMat("oak"), -3 + t * 1.2, 0.5, -2.6, 14);
b.rotation.x = Math.PI / 2;
}
fkwTable(R.g, 1, 1, 1.4, 0.8, 0.8, {});
for (t = 0; t < 4; t++)
fkwCyl(R.g, 0.04, 0.05, 0.28, fkwLam(0x2A4A2A, { op: 0.85 }), 0.6 + t * 0.25, 0.8, 1, 8);
R = fkwRoom(G, "rchurch", X.rchurch[0], X.rchurch[1], 12, 18, { wall: "plaster", floor: "greystone", h: 9, name: "the church of the little town", bare: 1, lightI: 1.0 });
for (var p = 0; p < 6; p++) {
fkwBox(R.g, 4, 0.8, 0.5, fkwMat("darkoak"), -3, 0, -3 + p * 1.9);
fkwBox(R.g, 4, 0.8, 0.5, fkwMat("darkoak"), 3, 0, -3 + p * 1.9);
}
fkwBox(R.g, 2.6, 1.1, 1.2, fkwMat("marble"), 0, 0, -7.4);
fkwBox(R.g, 3, 3.6, 0.2, fkwMat("brass"), 0, 1.1, -8.7);
R = fkwRoom(G, "ferry", X.ferry[0], X.ferry[1], 7, 6, { wall: "planks", floor: "planks", name: "the ferryman's house", beams: true, light: !lite });
fkwHearth(R.g, 0, -2.8, 0, { h: 3.2 });
fkwTable(R.g, 1.6, 0.4, 1.2, 0.8, 0.74, {});
fkwBed(R.g, -2.2, 0, Math.PI / 2, {});
var oar = fkwBox(R.g, 0.06, 0.06, 2.6, fkwMat("oak"), 3.1, 1.2, 0);
oar.rotation.x = 0.3;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = fkwRhH(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var st = fkwMat(o.mat || "greystone"), R = wRand(Math.round(x * 3 + z));
fkwPlant(P, "rock", [{ x: x, z: z, y: y - 6, s: 9, ry: 0 }, { x: x + 8, z: z + 6, y: y - 5, s: 7, ry: 1 }], { mat: fkwMat("darkrock"), keepAll: true });
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, h = 4 + R() * 7, seg = fkwBox(g, 9, h, 1.4, st, Math.cos(a) * 12, 0, Math.sin(a) * 12, -a + Math.PI / 2);
if (i === 2)
seg.visible = false;
}
for (i = 0; i < 8; i++) {
if (i === 2)
continue;
var a2 = i / 8 * Math.PI * 2;
fkwSolid(x + Math.cos(a2) * 12, z + Math.sin(a2) * 12, 9, 1.6, y - 1, y + 12, -a2 + Math.PI / 2);
}
var tw = fkwCyl(g, 4, 4.4, 20, st, 8, 0, -8, 14);
var kp = new THREE.Group();
kp.position.set(-4, 0, 0);
g.add(kp);
fkwBox(kp, 10, 14, 0.8, st, 0, 0, -4);
fkwBox(kp, 0.8, 10, 8, st, -5, 0, 0);
fkwBox(kp, 6, 16, 0.8, st, -2, 0, 4);
for (i = 0; i < 3; i++)
fkwBox(kp, 1, 1.6, 0.82, fkwLam(0x141210), -3 + i * 3, 8, -4.01);
fkwRound(x + 8, z - 8, 4.4, y - 1, y + 22);
fkwSolid(x - 4, z - 4, 10, 0.9, y - 1, y + 15);
fkwSolid(x - 9, z, 0.9, 8, y - 1, y + 11);
fkwFloor(x, z, 24, 24, y + 0.1, { r: 12 });
fkwPlant(P, "bush", fkwScatter(Math.round(x), 10, x - 11, z - 11, x + 11, z + 11, null, fkwRhH, 0.5, 1.0), { col: 0x3E5A2E });
return g;
},
function (G) {
var lite = fkwLite();
fkwTerrain(G, -600, -600, 1200, 1200, lite ? 16 : 9, fkwRhH, fkwMat("meadow"), function (x, z, y, c) { var g = 0.8 + fkwFbm(x * 0.03, z * 0.03, 2) * 0.24; if (y < 0.5) {
c.setRGB(0.66, 0.6, 0.5);
return;
} if (y > 60) {
c.setRGB(0.5 * g, 0.56 * g, 0.42 * g);
return;
} c.setRGB(0.66 * g, 0.8 * g, 0.5 * g); });
var rv = fkwWater(G, 0, 0, 1200, 1200, -0.4, 0x4A6A5A, 0.94);
rv.userData.fx = 0;
rv.userData.fz = -1;
var vines = [];
for (var z = -500; z < 500; z += 6)
for (var k = 0; k < 8; k++) {
var cx = fkwRhC(z), w = 34 + Math.sin(z * 0.006) * 8, x = cx - w - 16 - k * 7;
if (fkwRhH(x, z) < 110 && (Math.abs(z - 120) < 240 || Math.abs(z + 300) < 120))
vines.push({ x: x, z: z, y: fkwRhH(x, z), s: 0.5, ry: 0 });
}
fkwPlant(G, "bush", lite ? vines.filter(function (v, i) { return i % 2 === 0; }) : vines, { col: 0x5A8A3A, keepAll: true });
fkwConifer(G, fkwScatter(81, lite ? 120 : 320, 30, -590, 590, 590, function (x, z) { return x - fkwRhC(z) > 60; }, fkwRhH, 0.9, 1.5));
fkwPlant(G, "tree", fkwScatter(82, lite ? 60 : 160, -590, -590, -60, 590, function (x, z) { return fkwRhC(z) - x > 60 && Math.abs(z - 120) > 240; }, fkwRhH, 0.9, 1.4), { col: 0x4A7A34 });
fkwRuin(G, -120, -220, {});
fkwRuin(G, 120, 160, { ry: 1 });
fkwRuin(G, -150, 380, { ry: 2 });
fkwBox(G, 14, 1.2, 80, fkwMat("earth"), fkwRhC(-60) + 4, -1, -60);
fkwPlant(G, "tree", fkwScatter(83, 12, fkwRhC(-60) - 1, -96, fkwRhC(-60) + 9, -24, null, function () { return 0.2; }, 0.7, 1.0), { col: 0x5A8A3A });
var tz = 40, tx = function (z) { return fkwRhC(z) - 48; }, colours = ["render", "ochre", "rose", "grey", "plaster"];
for (var i = 0; i < 9; i++) {
var hz = tz - 70 + i * 16, hx = tx(hz) - 14;
fkwTownHouse(G, hx, hz, 11, 12, 8 + (i % 3) * 1.4, { y: fkwRhH(hx, hz), wall: colours[i % 5], ry: Math.PI / 2, rh: 9, shut: 0x3A4A3A, dormer: i % 2 === 0 });
}
fkwChurch(G, tx(10) - 44, 10, { len: 22, w: 12, h: 9, tower: 5, th: 22, ry: Math.PI / 2 });
var quay = new THREE.Mesh(new THREE.PlaneGeometry(10, 180), fkwMat("paving"));
quay.rotation.x = -Math.PI / 2;
quay.position.set(tx(tz) + 2, 0.86, tz);
G.add(quay);
fkwFloor(tx(tz) + 2, tz, 10, 180, 0.86);
var D = function (key, x, z, ry, nm) { var Rm = FKW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
fkwDoor(Rm, nm || ("The door of " + Rm.name), x, z, ry); };
var dx = function (i) { var hz = tz - 70 + i * 16; return [tx(hz) - 14 + 7.6, hz]; };
var p = dx(4);
D("rinn", p[0], p[1], -Math.PI / 2);
fkwSign(G, "GASTHAUS ZUM SCHIFF", 4, 0.6, p[0] - 1.4, fkwRhH(p[0], p[1]) + 3.2, p[1], Math.PI / 2, { bg: "#F2E8D0" });
p = dx(2);
D("vint", p[0], p[1], -Math.PI / 2);
p = dx(7);
D("ferry", p[0], p[1], -Math.PI / 2);
D("rchurch", tx(10) - 44 + 18, 10, -Math.PI / 2);
for (var b = 0; b < 4; b++)
fkwBoat(G, tx(tz) + 8, -0.35, tz - 40 + b * 22, 0.1, { mast: b % 2 === 0 });
fkwHorse(G, tx(-200) - 4, fkwRhH(tx(-200) - 4, -200), -200, Math.PI, {});
fkwHorse(G, tx(-196) - 5, fkwRhH(tx(-196) - 5, -196), -196, Math.PI, { kind: "fkdark" });
var bt = new THREE.Group();
G.add(bt);
bt.userData.keep = 1;
bt.userData.live = 1;
FKW.rhBoat = bt;
var hull = fkwMat("hull");
var hl = new THREE.Mesh(fkwGeo("rhhull", function () { var c = new THREE.SphereGeometry(1, 18, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(2.2, 1.0, 7); return c; }), hull);
hl.position.y = 0.6;
bt.add(hl);
fkwBox(bt, 3.6, 0.1, 12, fkwMat("deck"), 0, 0.55, 0);
fkwBox(bt, 2.2, 1.4, 3, fkwMat("planks"), 0, 0.6, 3);
fkwBox(bt, 2.6, 0.1, 3.4, fkwMat("planks"), 0, 2.0, 3);
fkwCyl(bt, 0.08, 0.1, 8, fkwMat("oak"), 0, 0.6, -1.6, 8);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(3, 5.4), fkwMat("sail"));
sl.position.set(0, 4.4, -0.4);
sl.rotation.y = Math.PI / 2;
bt.add(sl);
fkwBox(bt, 0.6, 0.4, 1.0, fkwMat("oak"), 0.9, 0.65, -4);
fkwBox(bt, 0.6, 0.4, 1.0, fkwMat("oak"), -0.9, 0.65, -4);
FKW.rhZ = FKW.rhZ != null ? FKW.rhZ : 420;
var bf = fkwFloor(0, 0, 3.4, 9, 0.65, { deck: 1 });
FKW.rhFloor = bf;
var place = function () { var z = FKW.rhZ, x = fkwRhC(z); bt.position.set(x, 0, z); bt.rotation.y = -Math.atan(Math.cos(z * 0.004) * 0.12); bf.x = x; bf.z = z - 1.2; };
place();
FKW.ticks.push(function (dt, L) {
var on = Math.abs(L.x - bt.position.x) < 1.9 && Math.abs(L.z - bt.position.z) < 5.2 && camera.position.y - 1.72 > 0.3 && camera.position.y - 1.72 < 1.6;
if (!on && !FKW.st.rhSail)
return;
var sp = on ? 3.2 : 0, old = FKW.rhZ;
FKW.rhZ -= sp * dt;
if (FKW.rhZ < -470) {
FKW.rhZ = 420;
if (on) {
fkwGo({ sc: "rhine", x: fkwRhC(420), z: 418.8, y: 0.65, ry: Math.PI }, "⛵ <b>The river carries you on</b>, past more towns and more castles, day after day.");
}
}
place();
if (on) {
camera.position.z += FKW.rhZ - old;
camera.position.x += fkwRhC(FKW.rhZ) - fkwRhC(old);
}
});
fkwCrowd("rh1", [["A vintner with his basket", "m", "fkwork", "The best wine on the Rhine, from these very slopes. The sun is on them all day."], ["A girl picking grapes", "f", "fkmaid", "We sing while we pick. Shall I teach you the song?", null, true], ["A bargeman", "m", "fkwork", "Down to Mainz, then Cologne, then Holland. Two weeks, if the wind holds."],
["A woman mending nets", "f", "fkmaid", "The salmon come up in spring."], ["An old soldier", "m", "fkelder", "Those castles? Robbers' nests, once. The robber knights took tolls from every boat."], ["A priest on the quay", "m", "fkblack", "God speed your journey."], ["A boy with a dog", "m", "fkwork", "My dog can swim across the Rhine!", null, true]], tx(tz) - 30, tz - 80, tx(tz) + 4, tz + 80, { wander: 8 });
},
function (G) {
fkwRhRooms(G);
fkwRhine(G);
var Ri = FKW.rooms.filter(function (r) { return r.key === "rinn"; })[0];
if (Ri)
fkwCrowd("rhi", [["The landlord", "m", "fkwork", "Wine from our own hill, sir: taste it."], ["A merchant from Basel", "m", "fkgent", "Going down to Rotterdam with cloth. And you?"], ["The landlord's daughter", "f", "fkmaid", "Will the gentlemen stay the night? The rooms look over the river."]], Ri.cx - 4, Ri.cz - 2, Ri.cx + 4, Ri.cz + 2, { y: FKW_RY, wander: 1.5 });
[["vint", "Herr Kessler, the vintner", "m", "fkwork", "Taste this, from my best year. The slopes are steep; we carry the earth back up on our backs when the rain washes it down."], ["ferry", "Old Jakob, the ferryman", "m", "fkwork", "Sixty years on this river. I've seen it frozen right across, once."], ["rchurch", "The pastor", "m", "fkblack", "Welcome, travellers. Our church is small, but it is old: older than the castles."]].forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("rhh" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
},
function (x, z) {
var n = fkwFbm(x * 0.012, z * 0.012, 4), d = Math.hypot(x * 0.9, z * 1.1) + n * 40;
if (d > 200)
return -6 - (d - 200) * 0.05;
var h = Math.min(28, (200 - d) * 0.35) + n * 6;
if (Math.hypot(x + 70, z + 90) < 60)
h += Math.max(0, 60 - Math.hypot(x + 70, z + 90)) * 0.5;
if (Math.hypot(x - 130, z - 20) < 34)
h = Math.min(h, 0.6 + (Math.hypot(x - 130, z - 20)) * 0.05);
return h;
},
function (G) {
var X = FKW_ROOMXZ.orkney, R, lite = fkwLite();
R = fkwRoom(G, "olab", X.olab[0], X.olab[1], 6, 5, { wall: "darkstone", floor: "greystone", h: 2.6, name: "Victor's hut: the first room", bare: 1, lightI: 0.7 });
fkwHearth(R.g, 0, -2.3, 0, { h: 2.6, mat: "greystone", pot: 1 });
fkwBed(R.g, -1.8, 0.2, Math.PI / 2, { cover: 0x6A5A4A });
fkwTable(R.g, 1.6, 0.4, 1.0, 0.7, 0.72, {});
fkwChair(R.g, 1.6, -0.2, 0);
fkwCandle(R.g, 1.6, 0.72, 0.4, {});
fkwSpot(R.cx + 2.6, R.cz - 1.6, 1.2, "The door to the inner room", "go in", function () { fkwGo(fkwIn("orkney", "olab2", 0, 1.4)(), "🕯️ <b>The inner room.</b> Your work waits on the table."); }, FKW_RY);
R = fkwRoom(G, "olab2", X.olab2[0], X.olab2[1], 6, 5, { wall: "darkstone", floor: "greystone", h: 2.6, name: "Victor's hut: the laboratory", env: "garret", bare: 1, lightI: 0.6, lightCol: 0xFFC890 });
fkwBench(R.g, -1, -2, 0, { w: 2.6, n: 7 });
fkwShelves(R.g, 2.6, -0.4, 2, 2.2, -Math.PI / 2, { jars: 1 });
var tb = new THREE.Group();
tb.position.set(-0.6, 0, 0.6);
R.g.add(tb);
tb.userData.keep = 1;
fkwTable(tb, 0, 0, 0.9, 2.1, 0.86, { mat: "darkoak" });
var cl = fkwBox(tb, 1.0, 0.26, 2.0, fkwLam(0xD8D2C4, { ds: 1 }), 0, 0.86, 0);
FKW.orkCloth = cl;
var torn = new THREE.Group();
tb.add(torn);
for (var i = 0; i < 7; i++) {
var p = fkwBox(torn, 0.3 + i % 3 * 0.1, 0.04, 0.2, fkwLam(0xD8D2C4, { ds: 1 }), (i % 3 - 1) * 0.4, 0, (i - 3) * 0.3);
p.rotation.y = i;
}
torn.position.y = 0.02;
FKW.orkTorn = torn;
fkwWindowIn(R.g, 0, 1.9, -2.4, 0, 0.6, 0.5, { sky: 0x6A7A90 });
var face = new THREE.Group();
face.position.set(0, 1.75, -2.62);
R.g.add(face);
face.userData.keep = 1;
fkwEll(face, fkwLam(0xC8B888), 0.18, 0.22, 0.12, 0, 0, 0, 10);
fkwBox(face, 0.36, 0.18, 0.1, fkwLam(0x0A0A0C), 0, 0.14, 0.02);
[-1, 1].forEach(function (s) { fkwEll(face, fkwGlowM(0xE8E0C0, 0.6), 0.025, 0.02, 0.01, s * 0.07, 0.03, 0.12, 6); });
FKW.orkFace = face;
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The door", "go out", function () { fkwGo(fkwIn("orkney", "olab", 2.6, -0.6)(), null); }, FKW_RY);
[["ohut1", "a crofter's hut"], ["ohut2", "a fisherman's hut"]].forEach(function (H, k) {
var A = X[H[0]], Rm = fkwRoom(G, H[0], A[0], A[1], 6, 5, { wall: "darkstone", floor: "earth", h: 2.6, name: "Orkney: " + H[1], bare: 1, light: !lite });
fkwHearth(Rm.g, 0, -2.3, 0, { h: 2.6, mat: "greystone", pot: 1 });
fkwBox(Rm.g, 1.8, 0.4, 1.0, fkwLam(0x6A5A44), -1.8, 0, 0.4);
fkwBox(Rm.g, 1.0, 0.6, 0.5, fkwMat("darkoak"), 1.8, 0, -1.6);
if (k === 1) {
var n = fkwBox(Rm.g, 2, 0.05, 1.4, fkwLam(0x8A7A5A), 1.4, 1.2, 1.0);
n.rotation.x = 1.2;
}
});
},
function (G) {
var lite = fkwLite(), X = FKW_ROOMXZ.orkney;
fkwTerrain(G, -500, -500, 1000, 1000, lite ? 16 : 9, fkwOrkH, fkwMat("grass"), function (x, z, y, c) { var g = 0.8 + fkwFbm(x * 0.04, z * 0.04, 2) * 0.24; if (y < 0.3) {
c.setRGB(0.5, 0.5, 0.46);
return;
} if (y > 24) {
c.setRGB(0.52 * g, 0.5 * g, 0.46 * g);
return;
} c.setRGB(0.6 * g, 0.68 * g, 0.5 * g); });
var sea = fkwWater(G, 0, 0, 4000, 4000, 0, 0x3A4A52, 0.95);
sea.userData.fx = 0.2;
sea.userData.fz = 0.6;
fkwPlant(G, "rock", fkwScatter(91, lite ? 60 : 140, -260, -260, 260, 260, function (x, z) { var h = fkwOrkH(x, z); return h > -2 && h < 3; }, fkwOrkH, 1, 3.4), { mat: fkwMat("darkrock") });
fkwPlant(G, "grass", fkwScatter(92, lite ? 120 : 320, -200, -200, 200, 200, function (x, z) { return fkwOrkH(x, z) > 1; }, fkwOrkH, 0.6, 1.1), { col: 0xB8B890 });
var huts = [[40, 0, "olab"], [16, -26, "ohut1"], [-6, -6, "ohut2"]];
huts.forEach(function (q) {
var y = fkwOrkH(q[0], q[1]), g = new THREE.Group();
g.position.set(q[0], y, q[1]);
G.add(g);
fkwBox(g, 7, 2.2, 5, fkwMat("darkstone"), 0, 0, 0);
var rf = new THREE.Mesh(fkwGeo("orkr", function () { var s = new THREE.Shape(); s.moveTo(-4, 0); s.lineTo(0, 1.8); s.lineTo(4, 0); s.lineTo(-4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 5.6, bevelEnabled: false }); e.translate(0, 0, -2.8); return e; }), fkwLam(0x5A5A34));
rf.position.y = 2.2;
g.add(rf);
for (var k = 0; k < 4; k++)
fkwBox(g, 0.1, 0.1, 5.4, fkwLam(0x3A3A30), -3 + k * 2, 2.2 + (1.8 - Math.abs(-3 + k * 2) * 0.45) - 0.05, 0);
fkwBox(g, 0.9, 1.7, 0.08, fkwMat("darkoak"), 0, 0, 2.52);
if (q[2] !== "olab")
fkwSmoke(g, 2, 4.2, 0, 0x8A8A8A, 5);
fkwSolid(q[0], q[1], 7, 5, y - 1, y + 4);
var R = FKW.rooms.filter(function (r) { return r.key === q[2]; })[0];
if (R)
fkwDoor(R, q[2] === "olab" ? "The door of the hut you have hired" : "The door of " + R.name.replace(/^Orkney: /, ""), q[0], q[1] + 3.8, Math.PI);
});
for (var k = 0; k < 12; k++)
fkwBox(G, 0.5, 0.25, 0.3, fkwLam(0x3A2A1A), 24 + (k % 4) * 0.55, fkwOrkH(24, -14) + Math.floor(k / 4) * 0.25, -14);
for (var r = 0; r < 8; r++)
fkwPlant(G, "grass", fkwScatter(93 + r, 14, -30, 20 + r * 1.4, 0, 20.6 + r * 1.4, null, fkwOrkH, 0.5, 0.7), { col: 0xD8C878 });
[[60, -60], [80, -40], [-30, -60]].forEach(function (q, i) { fkwHorse(G, q[0], fkwOrkH(q[0], q[1]), q[1], i * 2, { kind: "fkcow", s: 1.2 }); });
fkwBoat(G, 130, fkwOrkH(130, 14) + 0.1, 14, 1.2, { mast: true });
fkwBoat(G, 124, fkwOrkH(124, 28) + 0.1, 28, 0.9, {});
FKW.orkBoat = fkwBoat(G, 142, 0.05, 46, 0.3, { mast: true });
FKW.orkBoat.userData.keep = 1;
FKW.orkBoat.visible = !!FKW.st.orkBoat;
fkwCrowd("ork1", [["A boy minding the cows", "m", "fkworn", "Cows don't give much here. The grass is too thin.", null, true], ["A woman cutting peat", "f", "fkmaid", "Peat for the fire. There's not a tree on the island."], ["A fisherman mending his boat", "m", "fkwork", "Storms every week, sir. The sea's always hungry here."]], -30, -60, 90, 20, { wander: 6 });
},
function (G) {
var X = FKW_ROOMXZ.ireland, R, lite = fkwLite();
R = fkwRoom(G, "kirwin", X.kirwin[0], X.kirwin[1], 10, 8, { wall: "bluepaper", name: "Mr. Kirwin's house: the magistrate's room", beams: false });
fkwTable(R.g, 0, -1.8, 2.6, 1.1, 0.78, { mat: "darkoak" });
fkwChair(R.g, 0, -2.6, 0, { arm: 1, seat: "leather" });
fkwShelves(R.g, -4.6, 0, 3, 2.6, Math.PI / 2);
fkwShelves(R.g, 4.6, 0, 3, 2.6, -Math.PI / 2);
fkwCandle(R.g, 0.6, 0.78, -1.8, { brass: 1 });
for (var b = 0; b < 2; b++)
fkwBox(R.g, 4, 0.5, 0.5, fkwMat("oak"), 0, 0, 1.2 + b * 1.4);
fkwWindowIn(R.g, -2.4, 2.5, -3.85, 0, 1.2, 1.5, { sky: 0xA8B8C8 });
R = fkwRoom(G, "iinn", X.iinn[0], X.iinn[1], 10, 8, { wall: "render", name: "the inn, by the harbour", beams: true });
fkwHearth(R.g, -3, -3.7, 0, { h: R.h, pot: 1 });
for (var t = 0; t < 2; t++) {
fkwTable(R.g, -2 + t * 4, 1, 1.8, 0.9, 0.76, {});
fkwChair(R.g, -2 + t * 4, 0.3, 0);
fkwChair(R.g, -2 + t * 4, 1.7, Math.PI);
}
fkwBox(R.g, 3, 1.1, 0.7, fkwMat("darkoak"), 3, 0, -2.8);
var bier = new THREE.Group();
bier.position.set(3.4, 0, 1.6);
R.g.add(bier);
bier.userData.keep = 1;
fkwTable(bier, 0, 0, 0.9, 2.0, 0.8, { mat: "darkoak" });
fkwBox(bier, 1.0, 0.26, 1.9, fkwLam(0xE8E4DA, { ds: 1 }), 0, 0.8, 0);
FKW.ireBier = bier;
bier.visible = !FKW.st.bierGone;
R = fkwRoom(G, "iprison", X.iprison[0], X.iprison[1], 8, 6, { wall: "greystone", floor: "greystone", name: "the prison: the gaoler's room", bare: 1, lightI: 0.7 });
fkwTable(R.g, 0, 0, 1.4, 0.8, 0.76, {});
fkwChair(R.g, 0, -0.6, 0);
fkwBox(R.g, 0.04, 0.5, 0.6, fkwMat("iron"), 3.8, 1.4, -1);
fkwSpot(R.cx + 3, R.cz - 2.2, 1.2, "The door to the cells", "go in", function () { fkwGo(fkwIn("ireland", "icell", 0, 1.4)(), "🗝️ <b>A cell in the prison.</b> A wretched bed, barred windows."); }, FKW_RY);
R = fkwRoom(G, "icell", X.icell[0], X.icell[1], 5, 5, { wall: "darkstone", floor: "greystone", h: 3.2, name: "a cell in the Irish prison", env: "cell", bare: 1, lightI: 0.5 });
fkwBed(R.g, -1.4, -0.9, 0, { cover: 0x5A5A4A });
fkwWindowIn(R.g, 0.8, 2.6, -2.4, 0, 0.6, 0.5, { sky: 0x8A9AA8 });
for (var bb = 0; bb < 4; bb++)
fkwBox(R.g, 0.03, 0.5, 0.03, fkwMat("iron"), 0.6 + bb * 0.14, 2.35, -2.38);
fkwChair(R.g, 1.4, 0.6, -0.4);
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The cell door", "go out", function () { fkwGo(fkwIn("ireland", "iprison", 3, -1)(), null); }, FKW_RY);
[["ihome1", "a fisherman's cottage"], ["ihome2", "a weaver's cottage"]].forEach(function (H, k) {
var A = X[H[0]], Rm = fkwRoom(G, H[0], A[0], A[1], 7, 6, { wall: "plaster", floor: "earth", name: "Ireland: " + H[1], beams: true, light: !lite });
fkwHearth(Rm.g, 0, -2.8, 0, { h: 3.2, pot: 1 });
fkwTable(Rm.g, 1.6, 0.4, 1.4, 0.8, 0.74, {});
fkwBed(Rm.g, -2.4, 0.2, Math.PI / 2, {});
if (k === 1)
fkwBox(Rm.g, 1.6, 1.4, 1.0, fkwMat("oak"), 1.6, 0, 2);
});
},
function (G) {
var lite = fkwLite();
fkwTerrain(G, -400, -400, 800, 800, lite ? 14 : 8, fkwIreH, fkwMat("grass"), function (x, z, y, c) { var g = 0.82 + fkwFbm(x * 0.04, z * 0.04, 2) * 0.22; if (y < 0.8) {
c.setRGB(0.86, 0.8, 0.66);
return;
} c.setRGB(0.5 * g, 0.74 * g, 0.42 * g); });
var sea = fkwWater(G, 0, -1200, 4000, 2240, 0, 0x3A5A62, 0.95);
sea.userData.fz = 0.4;
fkwBox(G, 90, 2.4, 6, fkwMat("greystone"), 20, -1.2, -56);
fkwFloor(20, -56, 90, 6, 1.2);
fkwBox(G, 6, 2.4, 40, fkwMat("greystone"), 62, -1.2, -76);
fkwFloor(62, -76, 6, 40, 1.2);
for (var b = 0; b < 5; b++)
fkwBoat(G, -10 + b * 16, 0.05, -68 - (b % 2) * 6, Math.PI / 2, { mast: b % 2 === 0 });
var colours = ["render", "ochre", "rose", "grey", "plaster"], at = {};
[[-60, 0, "iinn"], [-30, 0], [0, 0], [30, 0, "kirwin"], [60, 0], [-50, 40, "ihome1"], [-20, 40], [10, 40, "ihome2"], [80, 40, "iprison"]].forEach(function (q, i) {
var w = q[2] === "iprison" ? 18 : 12;
fkwTownHouse(G, q[0], q[1] - 8, w, 12, q[2] === "iprison" ? 9 : 8, { wall: q[2] === "iprison" ? "greystone" : colours[i % 5], roof: "slate", shut: 0x2A3A4A, rh: 5 });
if (q[2]) {
var R = FKW.rooms.filter(function (r) { return r.key === q[2]; })[0];
if (R)
fkwDoor(R, "The door of " + R.name.replace(/^Ireland: /, "").replace(/: the .*$/, ""), q[0], q[1] - 0.4, Math.PI);
}
});
fkwSign(G, "INN", 1.4, 0.5, -60, fkwIreH(-60, -2) + 3.2, -1.9, 0, { bg: "#F2E8D0" });
fkwSign(G, "GAOL", 1.6, 0.5, 80, fkwIreH(80, 38) + 3.6, 38.1, 0, { bg: "#D8D8D0" });
fkwChurch(G, -110, 30, { len: 20, w: 10, h: 8, tower: 5, th: 16, roof: "slate" });
fkwPlant(G, "rock", fkwScatter(101, lite ? 30 : 70, -200, -90, -40, -60, null, fkwIreH, 0.8, 2.2), { mat: fkwMat("darkrock") });
fkwPlant(G, "grass", fkwScatter(102, lite ? 120 : 300, -380, 60, 380, 380, null, fkwIreH, 0.7, 1.3), { col: 0xC8E0A0 });
fkwPlant(G, "bush", fkwScatter(103, lite ? 30 : 80, -380, 80, 380, 380, null, fkwIreH, 0.6, 1.1), { col: 0x3E6A2E });
for (var w = 0; w < 6; w++)
fkwBox(G, 60, 1.0, 0.8, fkwMat("darkstone"), -200 + w * 80, fkwIreH(-200 + w * 80, 120) - 0.2, 120 + (w % 2) * 30);
fkwCrowd("ire1", [["A fisherman", "m", "fkwork", "A stranger, is it? Come on with you to Mr. Kirwin's: there's been a murder here last night."], ["A woman with a shawl", "f", "fkmaid", "God save us, a murder!"], ["A boy", "m", "fkwork", "They found him on the sands! I saw them carry him up!", null, true], ["An old man with a pipe", "m", "fkelder", "Mr. Kirwin's a fair man. He'll hear you out."], ["A girl with a basket of herring", "f", "fkmaid", "Herring, fresh herring!"], ["A carter", "m", "fkwork", "The coach to Dublin goes on Thursday."]], -80, -50, 90, 30, { wander: 8 });
},
function (G) {
fkwOrkRooms(G);
fkwOrkney(G);
FKW_ORK_FOLK.forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("orkh" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
if (FKW.orkCloth)
FKW.orkCloth.visible = !FKW.st.femaleTorn;
if (FKW.orkTorn)
FKW.orkTorn.visible = !!FKW.st.femaleTorn;
if (FKW.orkFace)
FKW.orkFace.visible = false;
},
function (G) {
fkwIreRooms(G);
fkwIreland(G);
FKW_IRE_FOLK.forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("ireh" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
var Ri = FKW.rooms.filter(function (r) { return r.key === "iinn"; })[0];
if (Ri)
fkwCrowd("irei", [["The landlady", "f", "fkmaid", "They brought him in here, the poor young gentleman. Lord have mercy."], ["A sailor", "m", "fkwork", "Wind's from the north-east. Boat came in on it last night, they say."]], Ri.cx - 4, Ri.cz - 2, Ri.cx, Ri.cz + 2, { y: FKW_RY, wander: 1.2 });
},
function (G) {
var X = FKW_ROOMXZ.evian, R, lite = fkwLite();
R = fkwRoom(G, "einn", X.einn[0], X.einn[1], 11, 8, { wall: "rose", name: "the inn at Évian: the parlour", beams: true });
fkwHearth(R.g, -3, -3.7, 0, { h: R.h });
fkwRug(R.g, 1.4, 0.6, 4, 3, 0x6A3A3A);
fkwTable(R.g, 1.4, 0.6, 1.6, 1.0, 0.76, { cloth: 0xF0ECE0 });
fkwChair(R.g, 0.8, 0, 0.3, { arm: 1, seat: "velvet" });
fkwChair(R.g, 2.0, 0, -0.3, { arm: 1, seat: "velvet" });
fkwCandle(R.g, 1.4, 0.76, 0.6, { brass: 1 });
fkwWindowIn(R.g, -2, 2.3, -3.85, 0, 1.2, 1.6, { sky: 0x3A4A6A });
fkwWindowIn(R.g, 2, 2.3, -3.85, 0, 1.2, 1.6, { sky: 0x3A4A6A });
fkwSpot(R.cx + 5, R.cz - 2.6, 1.2, "The stair, up to the passages", "go up", function () { fkwGo(fkwIn("evian", "epass", -3.6, 1.2)(), "🕯️ <b>The passages of the inn,</b> dark and creaking."); }, FKW_RY);
R = fkwRoom(G, "epass", X.epass[0], X.epass[1], 10, 3, { wall: "rose", name: "the passages of the inn", beams: true, lightI: 0.4 });
for (var d = 0; d < 3; d++)
fkwBox(R.g, 1.0, 2.1, 0.06, fkwMat("darkoak"), -3 + d * 3, 0, -1.42);
fkwCandle(R.g, 4.4, 1.2, -1.3, {});
fkwSpot(R.cx - 3.6, R.cz + 0.6, 1.0, "The stair, down to the parlour", "go down", function () { fkwGo(fkwIn("evian", "einn", 5, -1.6)(), null); }, FKW_RY);
fkwSpot(R.cx + 3, R.cz - 0.8, 1.2, "The door of the room where Elizabeth is", "go in", function () { fkwGo(fkwIn("evian", "eroom", 0, 1.8)(), null); }, FKW_RY);
R = fkwRoom(G, "eroom", X.eroom[0], X.eroom[1], 7, 6, { wall: "rose", name: "the bridal room at the inn", beams: true, lightI: 0.6 });
fkwBed(R.g, -1.4, -1.4, 0, { posts: 1, cover: 0xE8E0D0 });
fkwBox(R.g, 1.2, 0.04, 2.0, fkwLam(0xE8E0D0), -1.4, 1.95, -1.4);
fkwTable(R.g, 2, -2, 0.9, 0.5, 0.8, {});
fkwCandle(R.g, 2, 0.8, -2, { brass: 1 });
var win = fkwWindowIn(R.g, 1.6, 2.0, -2.85, 0, 1.2, 1.6, { sky: 0x2A3A5A });
var sh = new THREE.Group();
sh.position.set(1.6, 1.2, -2.84);
R.g.add(sh);
sh.userData.keep = 1;
[-1, 1].forEach(function (s) { var p = fkwBox(sh, 0.6, 1.6, 0.04, fkwLam(0x3A4A3A), s * 0.62, 0, 0.05); p.rotation.y = s * 1.2; });
FKW.evShutter = sh;
var face = new THREE.Group();
face.position.set(1.6, 2.0, -3.05);
R.g.add(face);
face.userData.keep = 1;
fkwEll(face, fkwLam(0xC8B888), 0.2, 0.24, 0.12, 0, 0, 0, 10);
fkwBox(face, 0.4, 0.2, 0.1, fkwLam(0x0A0A0C), 0, 0.16, 0.02);
FKW.evFace = face;
face.visible = false;
fkwSpot(R.cx, R.z1 - 0.6, 1.2, "The door", "go out", function () { fkwGo(fkwIn("evian", "epass", 3, 0.4)(), null); }, FKW_RY);
R = fkwRoom(G, "echurch", X.echurch[0], X.echurch[1], 12, 18, { wall: "plaster", floor: "greystone", h: 9, name: "the church of Évian", bare: 1, lightI: 1.0 });
for (var p = 0; p < 6; p++) {
fkwBox(R.g, 4, 0.8, 0.5, fkwMat("darkoak"), -3, 0, -3 + p * 1.9);
fkwBox(R.g, 4, 0.8, 0.5, fkwMat("darkoak"), 3, 0, -3 + p * 1.9);
}
fkwBox(R.g, 2.6, 1.1, 1.2, fkwMat("marble"), 0, 0, -7.4);
fkwBox(R.g, 3, 3.6, 0.2, fkwMat("brass"), 0, 1.1, -8.7);
fkwCandle(R.g, -0.9, 1.1, -7.4, { brass: 1 });
fkwCandle(R.g, 0.9, 1.1, -7.4, { brass: 1 });
R = fkwRoom(G, "thonon", X.thonon[0], X.thonon[1], 10, 8, { wall: "greenpaper", name: "the inn at the baths near Thonon", beams: true, light: !lite });
fkwHearth(R.g, 0, -3.7, 0, { h: R.h });
fkwShelves(R.g, -4.6, 0, 3, 2.4, Math.PI / 2);
fkwShelves(R.g, 4.6, 0, 3, 2.4, -Math.PI / 2);
fkwTable(R.g, 0, 0.6, 2, 1, 0.76, { cloth: 0xE8E0D0 });
for (var c = 0; c < 4; c++)
fkwChair(R.g, -0.7 + (c % 2) * 1.4, c < 2 ? -0.1 : 1.3, c < 2 ? 0 : Math.PI);
fkwWindowIn(R.g, -2, 2.3, 3.85, Math.PI, 1.2, 1.4, { sky: 0x6A7A8A });
fkwWindowIn(R.g, 2, 2.3, 3.85, Math.PI, 1.2, 1.4, { sky: 0x6A7A8A });
[["ehome1", "a boatman's house"], ["ehome2", "a lace-maker's house"]].forEach(function (H, k) { var A = X[H[0]], Rm = fkwRoom(G, H[0], A[0], A[1], 7, 6, { wall: k ? "ochre" : "render", name: "Évian: " + H[1], beams: true, light: !lite }); fkwHearth(Rm.g, 0, -2.8, 0, { h: 3.2, pot: !k }); fkwTable(Rm.g, 1.6, 0.4, 1.4, 0.8, 0.74, {}); fkwChair(Rm.g, 1.6, -0.3, 0); fkwBed(Rm.g, -2.4, 0.2, Math.PI / 2, {}); if (k)
fkwBox(Rm.g, 0.8, 0.3, 0.6, fkwLam(0xE8E0D0), 1.6, 0.74, 0.4); });
},
function (G) {
var lite = fkwLite();
fkwTerrain(G, -400, -400, 800, 800, lite ? 14 : 8, fkwEvH, fkwMat("meadow"), function (x, z, y, c) { var g = 0.82 + fkwFbm(x * 0.04, z * 0.04, 2) * 0.22; if (y < 0.4) {
c.setRGB(0.82, 0.78, 0.68);
return;
} c.setRGB(0.66 * g, 0.84 * g, 0.54 * g); });
var lake = fkwWater(G, 0, -1250, 4000, 2400, 0, 0x3A5A7A, 0.92);
lake.userData.fz = 0.2;
fkwPeak(G, -800, -2600, 1200, 500, { k: 41, snowLine: 0.15, mat: fkwMat("moss") });
fkwPeak(G, 700, -2700, 1000, 420, { k: 42, snowLine: 0.1, mat: fkwMat("moss") });
fkwPeak(G, 300, 1600, 700, 900, { k: 43, snowLine: 0.4 });
fkwPeak(G, -600, 1500, 600, 700, { k: 44, snowLine: 0.35 });
fkwBox(G, 6, 0.5, 22, fkwMat("planks"), 0, -0.3, -48);
fkwFloor(0, -48, 6, 22, 0.2);
fkwBoat(G, 5, 0.05, -54, 0.3, { mast: true });
fkwBoat(G, -6, 0.05, -58, -0.2, {});
var colours = ["render", "ochre", "rose", "grey", "plaster"];
[[0, 10, "einn"], [-30, 6, "thonon"], [30, 8], [-56, 14, "ehome1"], [56, 12, "ehome2"], [-20, 44], [24, 46]].forEach(function (q, i) {
var big = q[2] === "einn";
fkwTownHouse(G, q[0], q[1], big ? 18 : 11, 12, big ? 11 : 8, { wall: big ? "rose" : colours[i % 5], ry: Math.PI, roof: big ? "slate" : "tile", shut: 0x3A5A4A, dormer: big });
if (q[2]) {
var R = FKW.rooms.filter(function (r) { return r.key === q[2]; })[0];
if (R)
fkwDoor(R, "The door of " + R.name.replace(/^Évian: /, "").replace(/: the parlour$/, ""), q[0], q[1] - 7.6, 0);
}
});
fkwSign(G, "HÔTEL DU LAC", 4, 0.6, 0, fkwEvH(0, 4) + 3.6, 3.9, Math.PI, { bg: "#F4ECD8" });
fkwChurch(G, -10, 80, { len: 22, w: 12, h: 9, tower: 5, th: 18, ry: Math.PI, dome: true, domeCol: 0x6A7A8A });
var Rc = FKW.rooms.filter(function (r) { return r.key === "echurch"; })[0];
if (Rc)
fkwDoor(Rc, "The door of the church", -10, 62.4, 0);
fkwPlant(G, "tree", fkwScatter(111, lite ? 40 : 100, -380, 60, 380, 380, function (x, z) { return Math.hypot(x + 10, z - 80) > 20; }, fkwEvH, 0.8, 1.3), { col: 0x4A7A34 });
fkwPlant(G, "tree", [[-40, -30], [-20, -32], [20, -31], [40, -30], [60, -28], [-60, -28]].map(function (q) { return { x: q[0], z: q[1], y: fkwEvH(q[0], q[1]), s: 1.1, ry: q[0] }; }), { col: 0x5A8A3A, keepAll: true });
fkwPlant(G, "grass", fkwScatter(112, lite ? 100 : 260, -380, -36, 380, 120, null, fkwEvH, 0.7, 1.2), { col: 0xD0E0A8 });
fkwCrowd("ev1", [["A boatman", "m", "fkwork", "The wind's getting up. A storm off the mountains tonight, I'd say."], ["A woman with a basket", "f", "fkmaid", "A wedding party? God bless you both!"], ["A child", "f", "fkmaid", "Are you the bride? You're very pretty.", null, true], ["The innkeeper", "m", "fkwork", "The best rooms in Évian for the new couple, monsieur."], ["A priest", "m", "fkblack", "Bless you, my children."]], -60, -36, 60, 30, { wander: 8 });
},
function (G) {
var X = FKW_ROOMXZ.chase, lite = fkwLite();
[["chut", "a peasant's hut on the snows"], ["izba1", "a cottage in the hamlet by the sea: where they sell sledges and dogs"], ["izba2", "a fisherman's cottage in the hamlet"], ["izba3", "the elder's house in the hamlet"]].forEach(function (H, k) {
var A = X[H[0]], R = fkwRoom(G, H[0], A[0], A[1], 7, 6, { wall: "oak", floor: "planks", name: H[1].charAt(0).toUpperCase() + H[1].slice(1), beams: true, light: k < 3 && !lite, lightI: 0.8 });
var st = new THREE.Group();
st.position.set(-2.2, 0, -2);
R.g.add(st);
fkwBox(st, 1.8, 1.4, 1.6, fkwMat("plaster"), 0, 0, 0);
fkwBox(st, 1.4, 0.5, 1.2, fkwMat("plaster"), 0, 1.4, 0);
fkwFire(st, 0, 0.3, 0.82, 0.4);
fkwTable(R.g, 1.6, 0.6, 1.6, 0.9, 0.74, {});
fkwBox(R.g, 2.4, 0.45, 0.5, fkwMat("oak"), 1.6, 0, -0.4);
fkwBox(R.g, 2.4, 0.45, 0.5, fkwMat("oak"), 1.6, 0, 1.6);
fkwPicture(R.g, 3.3, 2.1, -2.9, 0, 0.4, 0.5, function (c, W, H) { c.fillStyle = "#C8902A"; c.fillRect(0, 0, W, H); c.fillStyle = "#3A2A1A"; c.fillRect(W * 0.2, H * 0.15, W * 0.6, H * 0.7); c.fillStyle = "#E8C8A0"; c.beginPath(); c.arc(W / 2, H * 0.4, W * 0.14, 0, 7); c.fill(); });
if (k === 1) {
var sl = fkwSledge(R.g, 0, 1.6, Math.PI / 2, {});
for (var h = 0; h < 4; h++)
fkwBox(R.g, 0.04, 0.04, 1.4, fkwLam(0x5A3A1E), -3.2, 1.4 + h * 0.2, -1 + h * 0.3);
}
});
},
function (G) {
var lite = fkwLite();
fkwTerrain(G, -1000, -1000, 2000, 2000, lite ? 22 : 12, fkwChH, fkwMat("snow"), function (x, z, y, c) { var v = 0.94 + fkwFbm(x * 0.02, z * 0.02, 2) * 0.06; if (z < -420)
c.setRGB(0.82 * v, 0.9 * v, 0.98 * v);
else
c.setRGB(0.95 * v, 0.96 * v, 0.99 * v); });
fkwConifer(G, fkwScatter(121, lite ? 120 : 320, -990, -360, 990, 990, function (x, z) { return Math.abs(x - 0) > 20 || z < 0; }, fkwChH, 0.8, 1.5), { snow: true });
fkwBirch(G, fkwScatter(122, lite ? 40 : 100, -600, -300, 600, 600, null, fkwChH, 0.8, 1.3));
for (var r = 0; r < (lite ? 20 : 50); r++) {
var R = wRand(r + 5), x = (R() - 0.5) * 1800, z = -460 - R() * 500, sr = new THREE.Mesh(fkwGeo("ichunk", function () { var g = new THREE.DodecahedronGeometry(1, 0); g.scale(1.6, 0.8, 1); return g; }), fkwMat("ice"));
sr.position.set(x, 0.6, z);
sr.scale.setScalar(1.2 + R() * 3);
sr.rotation.y = R() * 6;
G.add(sr);
}
var mk = new THREE.Group();
mk.position.set(60, fkwChH(60, 120), 120);
G.add(mk);
fkwCyl(mk, 0.5, 0.7, 10, fkwMat("darkbark"), 0, 0, 0, 10);
fkwBox(mk, 0.5, 0.6, 0.08, fkwLam(0xE8D8B0), 0, 1.6, 0.6);
var stn = new THREE.Group();
stn.position.set(-80, fkwChH(-80, -40), -40);
G.add(stn);
fkwBox(stn, 2.2, 1.6, 0.8, fkwMat("granite"), 0, 0, 0);
fkwBox(stn, 1.4, 0.6, 0.02, fkwLam(0x3A3A3A), 0, 0.8, 0.41);
fkwEll(G, fkwLam(0x8A7A6A), 0.25, 0.14, 0.4, 40, fkwChH(40, -200) + 0.14, -200, 8);
var izba = function (x, z, ry, key) {
var y = fkwChH(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
for (var l = 0; l < 9; l++) {
[-1, 1].forEach(function (s) { var lg = fkwCyl(g, 0.16, 0.16, 8.4, fkwMat("bark"), 0, 0, s * 3.1, 8); lg.rotation.x = Math.PI / 2; lg.position.y = 0.16 + l * 0.3; var lg2 = fkwCyl(g, 0.16, 0.16, 6.6, fkwMat("bark"), 0, 0, 0, 8); lg2.rotation.z = Math.PI / 2; lg2.position.set(s * 4.0, 0.3 + l * 0.3, 0); });
}
var rf = new THREE.Mesh(fkwGeo("izr", function () { var s = new THREE.Shape(); s.moveTo(-3.8, 0); s.lineTo(0, 2.6); s.lineTo(3.8, 0); s.lineTo(-3.8, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 9.4, bevelEnabled: false }); e.translate(0, 0, -4.7); e.rotateY(Math.PI / 2); return e; }), fkwMat("snowwall"));
rf.position.y = 2.8;
g.add(rf);
fkwBox(g, 0.9, 1.8, 0.1, fkwMat("darkoak"), 0, 0, 3.3);
fkwBox(g, 0.6, 0.6, 0.06, fkwGlowM(0xFFC870, 0.8), 2.4, 1.2, 3.31);
fkwSmoke(g, 1.6, 5.4, 0, 0x9A9AA0, 5);
fkwSolid(x, z, 8.4, 6.6, y - 1, y + 5, ry || 0);
var Rm = FKW.rooms.filter(function (q) { return q.key === key; })[0];
if (Rm)
fkwDoor(Rm, "The door of " + Rm.name.charAt(0).toLowerCase() + Rm.name.slice(1).replace(/:.*$/, ""), x + Math.sin(ry || 0) * 4.8, z + Math.cos(ry || 0) * 4.8, (ry || 0) + Math.PI);
};
izba(-40, 214, 0, "chut");
izba(-20, -330, 0, "izba1");
izba(-48, -336, 0.2, "izba2");
izba(10, -342, -0.2, "izba3");
izba(30, -322, 0);
izba(-70, -318, 0.4);
for (var d = 0; d < 6; d++) {
var dg = fkwDog();
dg.position.set(-14 + d * 1.2, fkwChH(-14, -322), -322);
dg.rotation.y = d;
G.add(dg);
}
fkwSledge(G, -8, -322, 0.3, { load: true });
FKW.chSledge = fkwSledge(G, 0, -410, Math.PI, { load: true });
FKW.chSledge.userData.keep = 1;
fkwSnowfall(G, lite ? 220 : 480, 1.6);
fkwCrowd("ch1", [["A woman carrying water", "f", "fkmaid", "Cold, so cold. Even the sea is frozen."], ["A boy with a dog", "m", "fkwork", "My dogs pull faster than any in the hamlet!", null, true], ["A fisherman", "m", "fkwork", "We fish through holes in the ice. In spring the ice breaks up, with a noise like guns."]], -80, -350, 40, -300, { wander: 6 });
},
function (G) {
fkwEvRooms(G);
fkwEvian(G);
[["ehome1", "A boatman's wife", "f", "fkmaid", "My husband says the storm will be a bad one. Stay in tonight, madame."], ["ehome2", "Madame Chessex, the lace-maker", "f", "fklady", "Lace for the bride? I made a veil once for a countess."], ["echurch", "The curé of Évian", "m", "fkblack", "Welcome to Évian, monsieur, madame. May your marriage be blessed."]].forEach(function (F, i) { var R = FKW.rooms.filter(function (r) { return r.key === F[0]; })[0]; if (R)
fkwOne("evh" + i, F[1], F[2], F[3], R.cx + 0.6, R.cz - 0.6, Math.PI * 0.9, F[4], { y: R.y, persona: FKP.townfolk }); });
},
function () {
var S = fkwSc(), k = S.env;
if (FKW.envK && FKW_ENV[FKW.envK])
k = FKW.envK;
if (FKW.night)
k = FKW.sc === "arctic" || FKW.sc === "chase" ? "icenight" : (FKW.envK === "moon" || FKW.sc === "orkney" || FKW.sc === "evian" || FKW.sc === "alps" ? "moon" : "night");
if (fkwInRoom()) {
var L = fkwLocalSc(), R = fkwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
var E = {}, B = FKW_ENV[k] || FKW_ENV.lake;
for (var q in B)
E[q] = B[q];
if (fkwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (FKW.moving || FKW.ride)
return true;
var S = fkwSc(), D = FKW_SCN[FKW.sc];
if (!D)
return false;
if (fkwInRoom()) {
if (fkwSolidAt(x, z, feet))
return true;
return fkwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (fkwSolidAt(x, z, feet))
return true;
var fl = fkwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = fkwLand(x, z);
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
FKW.t += dt;
if (!FKW.built || !FKW.scG)
return;
var S = fkwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
FKW.inRm = fkwInRoom();
FKW.et = (FKW.et || 0) + dt;
if (FKW.et > 0.8) {
FKW.et = 0;
worldEnv(fkwEnvNow());
}
var flow = FKW.t * 0.03;
FKW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
FKW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (FKW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(FKW.t * 3 + i * 2)) * 0.3; f.rotation.y = FKW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(FKW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(FKW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, FKW.inRm ? -500 : fkwLand(L.x, L.z), L.z);
}
});
(FKW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
FKW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return fkwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof fkbTick === "function")
try {
fkbTick(dt, L);
}
catch (e) {
if (!FKW.e1) {
FKW.e1 = 1;
if (window.console)
console.warn("[frankenstein] book", e);
}
}
if (!FKW.bannerBook)
worldBanner("<b>⚡ " + FKW_NAME + "</b> · " + esc(fkwPlaceName(L)) + (FKW.night ? " · night" : ""));
FKW.pt = (FKW.pt || 0) + dt;
if (FKW.pt < 0.15)
return;
FKW.pt = 0;
if (FKW.moving || FKW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
FKW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof fkbTalk === "function" && fkbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
FKW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : fkwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof fkbSpot === "function")
fkbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof fkbIdlePrompt === "function")
fkbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = fkwAtPt(opt.at) || (typeof fkbStartAt === "function" && fkbStartAt()) || fkwAtPt("ship");
try {
fkwCrxKinds();
if (typeof crxWarm === "function" && !fkwLite())
crxWarm(["horse", "fkdark", "fkmule", "fkcow"]);
}
catch (e) { }
fkwScene(A.sc);
var S = FKW_SC[A.sc], y = A.y != null ? A.y : fkwGround(A.x, A.z);
camera.position.set(FKW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
FKW.moving = false;
FKW.ride = null;
FKW.inRm = fkwInRoom();
worldEnv(fkwEnvNow());
setStatus("⚡ <b>" + FKW_NAME + ".</b> Mary Shelley's book, the whole of it: Walton's ship in the ice, Geneva and its lake, Ingolstadt, the Mer de Glace, the cottage in the forest, the Orkneys, and the chase to the frozen sea. <b>Press E</b> for the book.");
if (typeof fkbEnter === "function")
try {
fkbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[frankenstein] enter", e);
}
},
function () {
fkwSceneDrop();
for (var k in FKW.mats) {
var m = FKW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in FKW.tex) {
var x = FKW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in FKW_GEO) {
try {
FKW_GEO[g].dispose();
}
catch (e) { }
}
FKW.mats = {};
FKW.tex = {};
FKW_GEO = {};
FKW.built = false;
FKW.G = null;
FKW.lights = 0;
},
function (P, n, sp) {
var lite = fkwLite();
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
FKW.fx.push(p);
return p;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = FKW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = FKW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: FKW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return fkbPos(at.at);
var C = FKB_CH[fkbS().ch], i = fkbS().s, c = C && C.cast ? C.cast.filter(function (d) { return fkbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? fkbPos(c.at) : null;
}
if (at.spot) {
var Sp = FKW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: FKW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return fkbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || FKW.sc, x: at.x, z: at.z, y: at.y };
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
if (FKB.beam && FKB.beam.parent === FKW.scG)
return FKB.beam;
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
FKW.scG.add(g);
FKB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return fkwLam(c); }, m;
switch (kind) {
case "load":
m = fkwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
fkwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = fkwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = fkwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = fkwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = fkwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = fkwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
fkwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = fkwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
fkwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), fkwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = fkwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "skin":
m = fkwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = fkwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = fkwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
fkwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = fkwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
fkwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
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
m = fkwBox(g, 0.3, 0.06, 0.06, M(0x9A7A5A), 0, 0.03, 0);
break;
case "lantern":
m = fkwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), fkwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = fkwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
fkwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), fkwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), fkwMat("glass"));
m.position.y = 0.08;
g.add(m);
fkwCyl(g, 0.02, 0.02, 0.1, fkwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = fkwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = fkwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
fkwFire(g, 0, 0.08, 0, 0.4);
break;
case "chain":
m = fkwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
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
if (!P || !FKW.scG || P.sc !== FKW.sc)
return null;
var g = fkbItemMesh(kind), y = P.y != null ? P.y : fkwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
FKW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = fkwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (FKB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = FKW.spots.indexOf(I.S); if (j >= 0)
FKW.spots.splice(j, 1); FKB.items = FKB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.fkb = 1;
FKB.items.push(I);
return I;
},
function (k) {
if (FKB.tuneKey === k)
return;
FKB.tuneKey = k;
var old = FKB.tune;
FKB.tune = null;
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
if (!k || !FKB_TUNES[k])
return;
try {
var A = new Audio(FKB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
FKB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (FKB.tune !== A) {
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
if (FKB.text)
return fn(FKB.text);
if (FKB.textWait) {
FKB.textWait.push(fn);
return;
}
FKB.textWait = [fn];
var done = function (B) { FKB.text = B; var w = FKB.textWait; FKB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/frankenstein/frankenstein.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
fkbText(function (B) {
var C = FKB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + fkbNum(i) + ". " + esc(C.t) + "</h3>" + FKB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(fkbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); FKB.readOpen = 0; FKB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = fkbS(), C = FKB_CH[S.ch];
if (!C)
return;
FKB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
FKB.readAsk = 0;
FKB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "Frankenstein") + "</div><h3 style='margin:4px 0'>" + fkbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? fkbOpening(T).map(fkbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); FKB.readOpen = 0; fkbStepDone(); }, all: function () { fkbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Mary Shelley's own words, all of it");
b += fkbKeeperBtns(fns);
worldCard(b, fns);
};
fkbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
FKB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); fkbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = fkbS(), C = FKB_CH[S.ch];
if (!C)
return;
fkbItemsClear();
fkbCastClear();
FKB.hold = 0;
var go = function () { fkbWorldState(); fkbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[fkb] setup", S.ch, e);
} fkbTune(C.tune || null); fkbStepBegin(); };
if (place && C.start) {
var P = fkbPos(C.start);
if (P && WLD.on === FKW_KEY) {
fkwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (FKW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = fkbStep();
fkbItemsClear();
FKB.hold = 0;
FKB.puzOpen = 0;
if (!b)
return;
b._key = fkbKey();
fkbWorldState();
try {
if (b.on)
b.on(fkbS().f);
}
catch (e) {
if (window.console)
console.warn("[fkb] on", e);
}
if (b.k === "read") {
fkbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { FKB.rew[k] = 0; });
if (b.k === "find") {
var Pf = fkbPos(b.at);
if (Pf && Pf.sc === FKW.sc)
fkbItemAdd(b.item, Pf, b.name, b.verb, function () { if (fkbKey() === b._key)
fkbStepDone(); });
}
if (b.k === "gather") {
var P = fkbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(fkbS().ch * 97 + fkbS().s * 13 + 7);
FKB.got = 0;
if (P && P.sc === FKW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = fkwGround(Q.x, Q.z, (P.y != null ? P.y : fkwLand(P.x, P.z)) + 1);
fkbItemAdd(b.item, Q, b.name, b.verb, function () { if (fkbKey() !== b._key)
return; FKB.got++; try {
if (b.each)
b.each(FKB.got);
}
catch (e) { } if (FKB.got < n) {
fkbSay((b.eachSay || "Got one.") + " " + FKB.got + " of " + n + ".");
return;
} fkbStepDone(); });
}
}
if (b.h)
fkbSay("<b>" + esc(FKB_CH[fkbS().ch].t) + ".</b> " + b.h);
},
function (b) {
FKB.puzOpen = 1;
FKB.puzT = performance.now();
var k = fkbKey(), fns = {}, h = FKB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
fkbSay(b.yes);
if (fkbKey() === k)
fkbStepDone();
return;
}
fkbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (fkbKey() === k)
FKB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = fkbS(), C = FKB_CH[S.ch], b = fkbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[fkb] done", e);
}
if (b.say)
fkbSay(b.say);
S.s++;
if (window.FKB_LOG)
FKB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= FKB_CH.length - 1) {
S.done = 1;
S.s = 0;
fkbSave();
fkbItemsClear();
fkbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
fkbSave();
var nx = FKB_CH[S.ch];
setTimeout(function () { try {
fkbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[fkb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
fkbSave();
fkbStepBegin();
},
function () {
fkbTune("end");
var S = fkbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + fkQ("He was soon borne away by the waves and lost in darkness and distance.") + "</p><p style='font-size:12px;opacity:.75'>Mary Shelley, Frankenstein (1831 text), Walton's last letter</p><p>You have sailed north with Walton, grown up by the lake at Geneva, studied at Ingolstadt and seen the dull yellow eye open, stood in the court for Justine, met the creature on the Mer de Glace and heard his own story of the cottage, built and broken the second being on the Orkneys, lost Clerval and Elizabeth, and followed him over the ice to the end. Your keepsakes:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; fkbSave(); fkbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "Walton's ship, in the ice");
if (typeof bhnOpen === "function") {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen("frankenstein"); };
}
worldCard(b, fns);
},
function (c) {
var C = FKB.cast[c.key || c.k];
if (fkbCastLive(C))
return C;
var P = fkbPos(c.at);
if (!P || P.sc !== FKW.sc)
return null;
var F = FKW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = fkwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = fkwDressed("fkb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : fkwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
FKW.scG.add(g);
Pp = { g: g, y: y, o: {} };
FKW.people.push(Pp);
if (c.name && !c.mute)
fkwTalk(Pp, c.name, fkwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
FKB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return FKB.cast[c.key || c.k];
},
function () {
var C = FKB_CH[fkbS().ch];
if (!C || !C.cast)
return;
var idx = fkbS().s;
C.cast.forEach(function (c) { var key = c.key || c.k; if (c.from != null && idx < c.from) {
if (FKB.cast[key])
fkbCastHide(key);
return;
} if (c.until != null && idx >= c.until) {
if (FKB.cast[key])
fkbCastHide(key);
return;
} if (!fkbCastLive(FKB.cast[key]))
fkbCastAdd(c); });
},
function () {
if (!FKW.scG)
return;
fkbCastClear();
var S = fkbS(), C = FKB_CH[S.ch];
if (S.started && !S.done && C && C.cast && fkbCastHere(C)) {
fkbCastTick();
return;
}
(FKB_FOLK_AT[FKW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = fkwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
FKB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!fkbActive())
return false;
var b = fkbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = fkbKey();
worldPrompt(null);
var next = function () { if (fkbKey() === k)
fkbStepDone(); };
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
worldCard(FKB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
FKB.wt += dt;
if (FKB.wt > 0.5) {
FKB.wt = 0;
if (fkbActive() && fkbCastHere(FKB_CH[fkbS().ch]))
fkbCastTick();
var S0 = fkbS();
S0.seen[FKW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!fkbActive()) {
if (FKB.beam)
FKB.beam.visible = false;
FKW.bannerBook = false;
return;
}
var S = fkbS(), b = fkbStep(), t = FKW.t, feet = camera.position.y - 1.72;
FKB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? fkbPos(b.at) : null, here = P && P.sc === FKW.sc, bm = fkbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + fkbScName(P.sc) + ": press E for the book)";
if (here && !FKW.moving && !FKW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : fkwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = fkbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !FKW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (FKB.readAsk)
break;
if (!FKB.readOpen)
fkbChapterCard();
else {
FKB.readOpen = 0;
fkbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
fkbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
FKB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(FKB.hold, dt);
}
catch (e) { }
if (FKB.hold >= (b.sec || 8)) {
fkbStepDone();
return;
}
}
else
FKB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return FKB.rew[k]; })) {
fkbStepDone();
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
fkbStepDone();
return;
}
break;
}
case "puzzle":
if ((!FKB.puzOpen || performance.now() - (FKB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
fkbPuzzleCard(b);
break;
}
}
var C = FKB_CH[S.ch], prog = b && b.k === "hold" && FKB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - FKB.hold)) + " s)" : b && b.k === "gather" ? " (" + (FKB.got || 0) + " of " + (b.n || 3) + ")" : "";
FKW.bannerBook = true;
worldBanner("⚡ <b>" + fkbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = fkbS(), C = FKB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Mary Shelley · Frankenstein; or, The Modern Prometheus (1831 text), the whole book</div><h3 style='margin:4px 0'>⚡ Frankenstein</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + fkbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((fkbStep() || {}).h || "") + "</p>";
var st = fkbStep(), P = st && st.at ? fkbPos(st.at) : null, Cs = fkbPos(C.start);
var to = P && P.sc !== FKW.sc ? P : (!P && Cs && Cs.sc !== FKW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + fkbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); fkwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { fkbPopulate(); fkbStepBegin(); }); };
}
}
else
b += "<p>The Arctic, 1790s. Robert Walton's ship is locked in the ice when a dying man on a dog-sledge is taken on board: Victor Frankenstein of Geneva, who made a living being out of dead matter at Ingolstadt and fled from it. He tells his story, and the creature tells his own. All four of Walton's letters and all twenty-four chapters, every one played: Geneva and its lake, Ingolstadt and the garret workshop, the Alps and the Mer de Glace, the De Laceys' cottage, the Orkneys, Ireland, Évian, and the chase over the ice. About three and a half hours at your own pace; your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Walton's ship, in the ice", S.started ? "Back to where you were" : "\"You will rejoice to hear that no disaster has accompanied the commencement of an enterprise\"");
fns.go = function () { worldCard(null); fkbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; fkbSave(); fkbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(FKW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(FKW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (FKW_SCN[k].start || { x: 0, z: 0 }); fkwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, fkbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += fkbKeeperBtns(fns);
worldCard(b, fns);
},
function (C) {
var R = function (v) { return typeof v === "string" ? fkbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
FKB_CH.push(C);
return C;
},
function (st, s) {
var v = function (k) { return fkbStV(st[k]); }, B = function (k) { return !!v(k); };
var reb = false;
if (st.lead !== undefined && FKW.st.lead !== B("lead")) {
FKW.st.lead = B("lead");
if (FKW.sc === "arctic")
reb = true;
}
if (st.season !== undefined && FKW.st.season !== v("season")) {
FKW.st.season = v("season");
if (FKW.sc === "cottage")
reb = true;
}
if (st.burnt !== undefined && FKW.st.burnt !== B("burnt")) {
FKW.st.burnt = B("burnt");
if (FKW.sc === "cottage")
reb = true;
}
FKW.st.oakGone = B("oakGone");
if (typeof fkwOakState === "function")
fkwOakState();
FKW.st.gateShut = B("gateShut");
if (typeof fkwGateState === "function")
fkwGateState();
if (FKW.ingSheet) {
FKW.ingSheet.visible = B("body");
if (FKW.ingHand)
FKW.ingHand.visible = B("body");
}
FKW.st.femaleTorn = B("torn");
if (FKW.orkCloth)
FKW.orkCloth.visible = !FKW.st.femaleTorn;
if (FKW.orkTorn)
FKW.orkTorn.visible = FKW.st.femaleTorn;
if (FKW.orkFace)
FKW.orkFace.visible = B("orkFace");
if (FKW.evFace)
FKW.evFace.visible = B("evFace");
FKW.st.orkBoat = B("orkBoat");
if (FKW.orkBoat)
FKW.orkBoat.visible = FKW.st.orkBoat;
FKW.st.satchel = B("satchelGone");
if (FKW.cotSatchel)
FKW.cotSatchel.visible = !FKW.st.satchel;
FKW.st.rhSail = B("sail");
if (FKW.cotBoard)
FKW.cotBoard.visible = !B("boardOff");
if (reb && !FKW.rebuilding) {
FKW.rebuilding = 1;
try {
fkwRebuild();
}
catch (e) { }
FKW.rebuilding = 0;
}
}
];
});
