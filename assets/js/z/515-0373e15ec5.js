/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(515, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (LKW.tex[k])
return LKW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = lkwLite();
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
return (LKW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (LKW.mats[k])
return LKW.mats[k];
var own = name.slice(0, 2) === "b:", map = lkwPhotoTex(name, mpt || 2), m;
if (lkwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = lkwPhotoTex(name, mpt || 2, true);
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
return (LKW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return lkwM(k, function () {
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
return lkwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return lkwCanvas("bamboo", 64, 256, function (x, W, H) {
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
lkwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return lkwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return lkwCanvas("tuft", 128, 64, function (x, W, H) {
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
return lkwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return lkwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
lkwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return lkwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = LKW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / LKW_CELL) + "," + Math.floor(z / LKW_CELL)];
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
p = dlnPerson("lkw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("lkw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || LKW.scG || LKW.G).add(p);
var P = { g: p, y: y, o: o };
LKW.people.push(P);
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
LKW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (lkwLite() ? 8 : 4)));
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
var lite = lkwLite(), leaf = lkwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
lkwInst(P, lkwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), lkwMat("pale"), list, { shadow: !lite });
lkwInst(P, lkwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), lkwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
lkwInst(P, lkwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), lkwMat("bark"), list, { shadow: !lite });
lkwInst(P, lkwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), lkwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
lkwInst(P, lkwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), lkwMat("darkbark"), list, { shadow: !lite });
lkwInst(P, lkwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lkwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
lkwInst(P, lkwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), lkwMat("bark"), list, { shadow: !lite });
lkwInst(P, lkwGeo("pfronds", function () { var g = lkwFronds(lite ? 8 : 14, 5.6, 1.7, 0.55, 12, 1.0); g.translate(1.4, 0, 0); return g; }), lkwLam(0xFFFFFF, { ds: 1, map: lkwFrondTex("palm"), mapk: "palm", cut: 0.5, e: 0x1E2C14 }), list, {});
break;
}
case "mauritia": {
lkwInst(P, lkwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), lkwMat("darkbark"), list, {});
lkwInst(P, lkwGeo("mfronds", function () { return lkwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), lkwLam(0xFFFFFF, { ds: 1, map: lkwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
lkwInst(P, lkwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), lkwMat("darkbark"), list, {});
lkwInst(P, lkwGeo("ffronds", function () { return lkwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), lkwLam(0xFFFFFF, { ds: 1, map: lkwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
lkwInst(P, lkwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), lkwMat("darkbark"), list, {});
lkwInst(P, lkwGeo("cyf", function () { return lkwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), lkwLam(0xFFFFFF, { ds: 1, map: lkwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
lkwInst(P, lkwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lkwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: lkwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
lkwInst(P, lkwGeo("bamL", function () { return lkwCards(3, 2.6, 2.2, 5.4); }), lkwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
lkwInst(P, lkwGeo("reed" + kind, function () { return lkwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), lkwLam(0xFFFFFF, { ds: 1, map: lkwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
lkwInst(P, lkwGeo("tuft", function () { return lkwCards(2, 1.6, 0.7, 0); }), lkwLam(o.col || 0xFFFFFF, { ds: 1, map: lkwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
lkwInst(P, lkwGeo("flw", function () { return lkwCards(2, 0.9, 0.7, 0); }), lkwLam(0xFFFFFF, { ds: 1, map: lkwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
lkwInst(P, lkwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), lkwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
lkwInst(P, lkwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || lkwMat("rock"), list, {});
break;
}
case "cactus": {
lkwInst(P, lkwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), lkwLam(0x4A7A3A), list, {});
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
function (kind, col) { return lkwM("skinM" + kind + (col || ""), function () { var t = lkwSkinTex(kind); t.repeat.set(2, 2); var m = lkwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = lkwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(lkwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = lkwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(lkwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
lkwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return lkwGeo(k, function () {
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
var t = lkwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lkwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || lkwS("b:stucco", o.col || 0xF0E2C8, 3), trim = lkwLam(0xFAF6EE), sh = lkwLam(o.shut || 0x3A6A4A), glass = lkwShine(0x1A2228, 0.2, 0.3);
lkwBox(g, w, h, d, wall, 0, 0, 0);
lkwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
lkwBox(g, w + 0.12, 0.5, d + 0.12, lkwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(lkwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || lkwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
lkwBox(g, 1.3, 2.6, 0.12, lkwMat("oak"), wx, 0, d / 2 + 0.02);
lkwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = lkwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = lkwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!lkwLite())
[-1, 1].forEach(function (s) { lkwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
lkwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
lkwBox(g, 0.05, 0.9, 0.05, lkwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
lkwBox(g, 1.8, 0.05, 0.05, lkwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
lkwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
LKW.near = null;
if (LKW.scG) {
if (LKW.scG.parent)
LKW.scG.parent.remove(LKW.scG);
LKW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
LKW.scG = null;
LKW.solids = [];
LKW.sgrid = null;
LKW.floors = [];
LKW.spots = [];
LKW.talk = [];
LKW.people = [];
LKW.beasts = [];
LKW.fx = [];
LKW.water = [];
LKW.inst = [];
LKW.hgt = null;
LKW.scBuilt = null;
LKW.rooms = [];
LKW.doors = [];
LKW.lights = 0;
LKW.ticks = [];
LKW.far = [];
LKW.tripods = [];
LKW.handlers = [];
LKW.smoke = [];
LKW.live = null;
if (typeof lkbSceneDrop === "function")
try {
lkbSceneDrop();
}
catch (e) { }
},
function (k) {
if (LKW.scBuilt === k && LKW.scG)
return;
lkwSceneDrop();
var D = LKW_SCN[k], S = LKW_SC[k];
if (!D || !S || !LKW.G)
return;
LKW.sc = k;
LKW.scG = new THREE.Group();
LKW.scG.position.x = S.x;
LKW.G.add(LKW.scG);
LKW.hgt = D.h || function () { return 0; };
try {
D.build(LKW.scG);
}
catch (e) {
if (window.console)
console.warn("[looking-glass] scene", k, e);
}
LKW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
LKW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = lkwAtPt(at);
if (!A)
return;
var v = lkwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
LKW.moving = true;
setTimeout(function () {
if (WLD.on !== LKW_KEY) {
v.style.opacity = "0";
LKW.moving = false;
return;
}
lkwScene(A.sc);
var S = LKW_SC[A.sc], y = A.y != null ? A.y : lkwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(LKW.base + S.x + A.x, y + 1.72 + lkwEyeOff(), A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(lkwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; LKW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(lkwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), lkwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; LKW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(lkwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), lkwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(lkwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), lkwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(lkwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), lkwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!lkwLite() && typeof THREE.PointLight === "function" && (LKW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
LKW.lights = (LKW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
LKW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("lkw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("lkw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = LKW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : lkwGround(x, z, o.feet != null ? o.feet : 500);
var g = F.voice ? lkwVoiceG() : (F.chess || o.chess) ? lkxChessman(o.chess || F.chess) : (F.flower || o.flower) ? lkxLiveFlower(o.flower || F.flower) : F.make ? lkwCreature(F.make, o.seed || key) : lkwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
if (o.s)
g.scale.multiplyScalar(o.s);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || LKW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
LKW.people.push(P);
if (!o.mute && !F.mute)
lkwTalk(P, o.name || F.name, lkwPersona(F.persona), o.greet || F.greet, o.r || (3.4 * Math.max(0.5, o.s || 1)), o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = lkwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = lkwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: [0x141414, 0x3A2A1A, 0x6A4A2A, 0x8A7A6A, 0xB8A060][Math.floor(R() * 5)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
var y = o.y != null ? o.y : lkwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || LKW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
LKW.people.push(P);
lkwTalk(P, L[0], L[4] || o.persona || LKP.creature, L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, dress, x, z, ry, greet, o) {
o = o || {};
var g = lkwDressed(seed, dress, { sex: sex, child: !!o.child, beard: o.beard, hair: o.hair, skin: o.skin });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : lkwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || LKW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
LKW.people.push(P);
if (name)
lkwTalk(P, name, o.persona || LKP.creature, greet || "Good day.", o.r || 3.0);
return P;
},
function (k) {
switch (k) {
case "plaster": return lkwS("plaster", 0xF0EAD8, 4);
case "render": return lkwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return lkwS("b:stucco", 0xE8CC98, 3);
case "rose": return lkwS("b:stucco", 0xE8C0B0, 3);
case "grey": return lkwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return lkwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return lkwS("stone", 0xC8C0B0, 2.4);
case "greystone": return lkwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return lkwS("b:limestone", 0x6A6660, 4);
case "brick": return lkwS("brick", 0xB87A5E, 1.6);
case "slate": return lkwS("b:slate", 0x5A5E68, 2);
case "tile": return lkwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return lkwS("shingle", 0x7A5A44, 2);
case "thatch": return lkwThatchM();
case "oak": return lkwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return lkwS("b:oak", 0x4A3020, 1.4);
case "floor": return lkwS("b:oak", 0xA87A50, 1.8);
case "planks": return lkwS("b:planks", 0x9A8060, 2);
case "deck": return lkwS("b:deck", 0xB8A07A, 2);
case "hull": return lkwS("b:planks", 0x4A3A2A, 2);
case "damask": return lkwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return lkwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return lkwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return lkwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return lkwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return lkwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return lkwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return lkwLam(0xEDE6D6);
case "beams": return lkwS("b:oak", 0x5A3E26, 1.4);
case "brass": return lkwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return lkwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return lkwShine(0xC87A4A, 0.35, 0.85);
case "glass": return lkwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return lkwShine(0x26323A, 0.15, 0.3);
case "earth": return lkwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return lkwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return lkwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return lkwS("paving", 0xC8C0B0, 2.4);
case "cobble": return lkwS("b:cotto", 0x9A9088, 1.2);
case "setts": return lkwS("paving", 0x8A8478, 2.4);
case "gravel": return lkwS("sand", 0x9A8C72, 3);
case "sand": return lkwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return lkwS("b:strata", 0x8A847A, 6);
case "darkrock": return lkwS("b:strata", 0x5A5650, 7);
case "granite": return lkwS("b:limestone", 0x9A948C, 5);
case "moss": return lkwS("b:moss", 0x7A9A5A, 3);
case "bark": return lkwS("bark", 0x8A7A64, 2.5);
case "darkbark": return lkwS("bark", 0x5A4E40, 3);
case "birch": return lkwS("bark", 0xE8E4DA, 2);
case "slush": return lkwS("sand", 0xC4BCB0, 3);
case "snowroof": return lkwS("snow", 0xD4D8DE, 3);
case "snow": return lkwS("snow", 0xF4F6FA, 5, { vc: 1 });
case "snowwall": return lkwS("snow", 0xF0F4FA, 3);
case "ice": return lkwM("icem", function () { var m = lkwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: lkwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: lkwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return lkwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return lkwLam(0xE8DCC4, { ds: 1 });
case "sail": return lkwLam(0xE8E0CC, { ds: 1 });
case "rope": return lkwLam(0x8A7A5A);
case "gilt": return lkwS("b:brass", 0xF0C860, 0.7, { shine: 110 });
case "redvelvet": return lkwS("b:velvet", 0x9A1A20, 0.6);
case "greenmarble": return lkwS("b:marble", 0x3A6A50, 1.8, { shine: 70 });
case "redmarble": return lkwS("b:marble", 0x9A4A3A, 1.8, { shine: 70 });
case "onyx": return lkwS("b:marble", 0xE8D4A8, 1.4, { shine: 90 });
case "zinc": return lkwS("b:slate", 0x7A8290, 2);
case "patina": return lkwS("b:brass", 0x7AB098, 1.6, { shine: 30 });
case "cave": return lkwS("b:cave", 0x8A8478, 4);
case "wetstone": return lkwS("b:limestone", 0x5A5A58, 3, { shine: 60 });
case "pinkgranite": return lkwS("b:limestone", 0xC8988A, 4);
case "mirror": return lkwShine(0xE8ECF0, 0.04, 1.0);
case "blackcloth": return lkwLam(0x0E0C10);
case "canvas": return lkwLam(0xD8CCB0, { ds: 1 });
case "logs": return lkwS("bark", 0x8A7458, 1.6);
case "siding": return lkwS("siding", 0xF2F0EA, 2.4);
case "mud": return lkwS("b:stucco", 0xA8744A, 2.4);
case "clay": return lkwS("earth", 0x9A6A44, 3);
case "pot": return lkwS("b:terracotta", 0xA8643E, 0.8);
case "trail": return lkwS("earth", 0x8A6A48, 3);
case "jungleground": return lkwS("earth", 0xC8C0A8, 6, { vc: 1 });
case "shoreground": return lkwS("sand", 0xFFFFFF, 5, { vc: 1 });
case "mossbark": return lkwS("b:moss", 0x6A7A4A, 1.6);
}
return lkwS("earth", 0x8A7058, 5);
},
function () {
return lkwM("thatch", function () {
var t = lkwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
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
var y = LKW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = lkwMat(o.wall || "plaster"), fl = lkwMat(o.floor || "floor");
lkwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
lkwBox(g, w, 0.1, d, o.ceil ? lkwMat(o.ceil) : lkwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = o.dw || 1.2, dh = o.dh || 2.3;
lkwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
lkwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
lkwBox(g, dw, h - dh, 0.2, wall, 0, dh, q[1]);
lkwBox(g, dw, dh, 0.08, lkwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
lkwBox(g, 0.06 * dw / 1.2, 0.06 * dw / 1.2, 0.04, lkwMat("brass"), 0.42 * dw / 1.2, dh * 0.43, q[1] - 0.12);
}
else
lkwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
lkwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
lkwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = lkwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { lkwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { lkwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
lkwBox(g, 0.18, 0.22, d - 0.2, lkwMat("beams"), b, h - 0.22, 0);
lkwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
lkwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
lkwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
var DW = o.dw || 1.2;
lkwSolid(cx - (w + DW) / 4, cz + d / 2, (w - DW) / 2, 0.3, y - 1, y + h + 1);
lkwSolid(cx + (w + DW) / 4, cz + d / 2, (w - DW) / 2, 0.3, y - 1, y + h + 1);
lkwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
LKW.rooms.push(R);
if (o.light !== false && !lkwLite() && (LKW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
LKW.lights = (LKW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
lkwSpot(ox, oz, 1.8, name, "go in", function () { lkwGo({ sc: LKW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + lkEsc(R.name) + ".</b>"); if (typeof lkbNote === "function")
lkbNote("in:" + R.key); });
lkwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { lkwGo({ sc: LKW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof lkbNote === "function")
lkbNote("out:" + R.key); }, R.y);
LKW.doors.push(R);
return R;
},
function (fromKey, toKey, lx, lz, name, verb) {
var A = LKW.rooms.filter(function (r) { return r.key === fromKey; })[0], B = LKW.rooms.filter(function (r) { return r.key === toKey; })[0];
if (!A || !B)
return;
var x = A.cx + lx, z = A.cz + lz;
B.out = { x: x, z: z, ry: Math.PI, inner: fromKey };
lkwSpot(x, z, 1.5, name, verb || "go through", function () { lkwGo({ sc: LKW.sc, x: B.cx, z: B.z1 - 1.2, y: B.y, ry: 0 }, "🚪 <b>" + lkEsc(B.name) + ".</b>"); if (typeof lkbNote === "function")
lkbNote("in:" + B.key); }, A.y);
lkwSpot(B.cx, B.z1 - 0.6, 1.4, "Back to " + A.name, "go", function () { lkwGo({ sc: LKW.sc, x: x, z: z + 1.2, y: A.y, ry: 0 }, null); if (typeof lkbNote === "function")
lkbNote("out:" + B.key); }, B.y);
LKW.doors.push(B);
return B;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var lk = lkwMat(o.mat || "oak");
lkwBox(g, w, 0.06, d, o.cloth ? lkwLam(o.cloth) : lk, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { lkwBox(g, 0.07, h - 0.06, 0.07, lk, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var lk = lkwMat(o.mat || "oak");
lkwBox(g, 0.46, 0.05, 0.44, o.seat ? lkwMat(o.seat) : lk, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { lkwBox(g, 0.04, 0.44, 0.04, lk, q[0] * 0.2, 0, q[1] * 0.19); });
lkwBox(g, 0.46, 0.5, 0.04, lk, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { lkwBox(g, 0.05, 0.22, 0.42, lk, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var lk = lkwMat(o.mat || "oak");
lkwBox(g, 1.1, 0.4, 2.0, lk, 0, 0, 0);
lkwBox(g, 1.04, 0.18, 1.94, lkwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
lkwBox(g, 0.8, 0.12, 0.36, lkwLam(0xF4F0E8), 0, 0.58, -0.7);
lkwBox(g, 1.1, 0.9, 0.06, lk, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { lkwBox(g, 0.07, 1.9, 0.07, lk, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var lk = lkwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
lkwBox(g, w, h, 0.06, lk, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { lkwBox(g, 0.05, h, 0.36, lk, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
lkwBox(g, w, 0.04, 0.36, lk, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(lkwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? lkwMat("glass") : lkwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
lkwBox(g, bw, bh, 0.24, lkwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
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
var st = lkwMat(o.mat || "ashlar");
lkwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
lkwBox(g, 1.0, 0.8, 0.52, lkwLam(0x141210), 0, 0, 0.02);
lkwBox(g, 2.0, 0.1, 0.6, lkwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
lkwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = lkwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
lkwCyl(g, 0.2, 0.16, 0.26, lkwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
lkwCyl(g, 0.06, 0.07, 0.03, lkwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
lkwCyl(g, 0.018, 0.018, 0.16, lkwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(lkwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), lkwGlowM(0xFFD070, 0.9));
f.position.y = 0.215;
g.add(f);
var gl = wGlow(0xFFC860, 0.25, 0.35);
gl.position.y = 0.22;
g.add(gl);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var w = o.w || 2.4, d = Math.max(0.36, o.d || 0.42), g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var m = lkwMat(o.mat || "darkoak");
lkwBox(g, w, 0.07, d, m, 0, 0.42, 0);
[-1, 1].forEach(function (k) { lkwBox(g, 0.07, 0.42, d * 0.86, m, k * (w / 2 - 0.12), 0, 0); });
if (w > 2.6)
lkwBox(g, 0.07, 0.42, d * 0.86, m, 0, 0, 0);
if (o.back !== false) {
lkwBox(g, w, 0.55, 0.06, m, 0, 0.49, -d / 2 + 0.03);
lkwBox(g, w, 0.05, 0.09, m, 0, 1.03, -d / 2 + 0.04);
}
if (o.cushion)
lkwBox(g, w - 0.1, 0.06, d - 0.06, lkwLam(o.cushion), 0, 0.49, 0.02);
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), lkwM("rug" + col, function () {
var t = lkwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
lkwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
var t = lkwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
lkwBox(g, w + 0.12, h + 0.12, 0.04, lkwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lkwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lkwGlowM(col));
m.position.z = 0.02;
g.add(m);
lkwBox(g, w + 0.16, 0.08, 0.12, lkwMat("oak"), 0, -h / 2 - 0.04, 0.04);
lkwBox(g, 0.05, h, 0.06, lkwMat("oak"), 0, -h / 2, 0.05);
lkwBox(g, w, 0.04, 0.06, lkwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { lkwBox(g, 0.05, h, 0.06, lkwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : lkwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = lkwMat(o.wall || "render"), trim = lkwMat(o.trim || "ashlar"), sh = lkwLam(o.shut || 0x4A6A4A), pane = lkwMat("pane"), lite = lkwLite();
lkwBox(g, w, h, d, wall, 0, 0, 0);
lkwBox(g, w + 0.1, 0.6, d + 0.1, lkwMat("greystone"), 0, 0, 0);
lkwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = lkwMat(o.roof || "tile");
var rf = new THREE.Mesh(lkwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
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
lkwBox(g, 0.7, rh * 0.9, 0.7, lkwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); lkwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); lkwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
lkwBox(g, 1.2, 2.4, 0.1, lkwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
lkwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
lkwBox(g, 1.6, 0.14, 0.6, lkwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
lkwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
lkwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
lkwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { lkwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
lkwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = lkwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = lkwMat(o.wall || "ashlar"), roof = lkwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
lkwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(lkwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { lkwBox(g, 0.12, 5, 1.6, lkwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); lkwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
lkwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
lkwBox(g, T + 0.4, 0.4, T + 0.4, lkwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), lkwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = lkwBox(g, 0.08, 0.9, 0.04, lkwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = lkwBox(g, 0.06, 1.1, 0.04, lkwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(lkwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), lkwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(lkwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || lkwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
lkwBox(g, 2.2, 3.6, 0.2, lkwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
lkwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var lk = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
lkwSolid(x + tx, z + lk, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = lkwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
lkwBox(P, seg + 0.2, h, 2, st, mx, lkwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
lkwBox(P, 1.2, 0.8, 2, st, cx, lkwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = lkwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
lkwInst(P, lkwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), lkwMat("darkbark"), list, { shadow: !lite });
lkwInst(P, lkwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lkwM("firM" + (o.snow ? "s" : ""), function () {
var t = lkwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
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
var lite = lkwLite();
lkwInst(P, lkwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), lkwMat("birch"), list, {});
lkwInst(P, lkwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), lkwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: lkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = lkwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || lkwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
var cap = new THREE.Mesh(geo, lkwMat("snowwall"));
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
var hull = lkwMat(o.hull || "hull");
var h = new THREE.Mesh(lkwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
lkwBox(g, 1.5, 0.06, 0.3, lkwMat("planks"), 0, 0.38, -0.6);
lkwBox(g, 1.5, 0.06, 0.3, lkwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = lkwBox(g, 0.05, 0.05, 2.6, lkwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
lkwCyl(g, 0.04, 0.05, 3.4, lkwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), lkwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : lkwLand(x, z), w = o.w || 9, d = o.d || 8, h = o.h || 6.4, lite = lkwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var brick = lkwS("brick", o.brick || 0xB86A4E, 1.4), trim = lkwLam(0xF2EEE2), stone = lkwMat("ashlar"), pane = lkwMat("pane"), slate = lkwMat("slate");
lkwBox(g, w, h, d, brick, 0, 0, 0);
lkwBox(g, w + 0.12, 0.5, d + 0.12, lkwMat("darkstone"), 0, 0, 0);
lkwBox(g, w + 0.2, 0.16, d + 0.2, stone, 0, 3.1, 0);
lkwBox(g, w + 0.3, 0.2, d + 0.3, trim, 0, h - 0.2, 0);
var rh = o.rh || 3.2;
var rf = new THREE.Mesh(lkwGeo("hip" + w + "|" + d + "|" + rh, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.8, rh, d + 0.8); return c; }), slate);
rf.position.y = h;
g.add(rf);
[-1, 1].forEach(function (s) { lkwBox(g, 0.9, rh + 1.8, 0.6, brick, s * w * 0.3, h, 0); lkwCyl(g, 0.12, 0.12, 0.5, lkwLam(0xA85A3A), s * w * 0.3 - 0.2, h + rh + 1.8, 0, 8); lkwCyl(g, 0.12, 0.12, 0.5, lkwLam(0xA85A3A), s * w * 0.3 + 0.2, h + rh + 1.8, 0, 8); });
var bx = -w * 0.22;
lkwBox(g, 3.2, h - 0.6, 1.2, brick, bx, 0, d / 2 + 0.6);
var br = lkwBox(g, 3.6, 0.5, 1.6, slate, bx, h - 0.6, d / 2 + 0.6);
br.rotation.x = -0.25;
[0.9, 4.0].forEach(function (wy) { lkwBox(g, 2.6, 1.7, 0.06, trim, bx, wy, d / 2 + 1.22); lkwBox(g, 2.4, 1.5, 0.06, pane, bx, wy + 0.1, d / 2 + 1.25); lkwBox(g, 0.06, 1.5, 0.08, trim, bx - 0.8, wy + 0.1, d / 2 + 1.27); lkwBox(g, 0.06, 1.5, 0.08, trim, bx + 0.8, wy + 0.1, d / 2 + 1.27); });
var dx = w * 0.25;
lkwBox(g, 1.1, 2.4, 0.08, lkwLam(o.door || 0x2A3A2A), dx, 0.2, d / 2 + 0.04);
lkwBox(g, 1.6, 0.14, 1.2, trim, dx, 2.8, d / 2 + 0.6);
[-1, 1].forEach(function (s) { lkwBox(g, 0.1, 2.6, 0.1, trim, dx + s * 0.7, 0.2, d / 2 + 1.1); });
lkwBox(g, 1.6, 0.2, 1.0, stone, dx, 0, d / 2 + 0.6);
lkwBox(g, 0.5, 0.05, 0.4, lkwLam(0xC8B080), dx + 0.3, 1.6, d / 2 + 0.08);
var win = function (wx, wy, zz, rot) { var q = new THREE.Group(); q.position.set(wx, wy, zz); q.rotation.y = rot; g.add(q); lkwBox(q, 1.1, 1.7, 0.06, trim, 0, 0, 0); lkwBox(q, 0.9, 1.5, 0.06, pane, 0, 0.1, 0.02); lkwBox(q, 1.3, 0.12, 0.2, stone, 0, -0.06, 0.06); lkwBox(q, 1.2, 0.16, 0.12, stone, 0, 1.7, 0.03); };
win(dx, 4.0, d / 2 + 0.02, 0);
[-w * 0.25, w * 0.2].forEach(function (wx) { win(wx, 0.9, -d / 2 - 0.02, Math.PI); win(wx, 4.0, -d / 2 - 0.02, Math.PI); });
[-1, 1].forEach(function (s) { win(s * (w / 2 + 0.02), 4.0, 0, s * Math.PI / 2); });
if (o.garden !== false) {
var gz = d / 2 + (o.gd || 6);
lkwBox(g, w + 4, 0.7, 0.3, brick, 0, 0, gz);
lkwBox(g, w + 4.2, 0.1, 0.4, stone, 0, 0.7, gz);
lkwBox(g, 1.2, 0.05, gz - d / 2 - 0.6, lkwMat("gravel"), dx, 0.02, (gz + d / 2) / 2 + 0.3);
if (!lite)
lkwPlant(P, "bush", [{ x: x + Math.cos(o.ry || 0) * (-w * 0.4) + Math.sin(o.ry || 0) * (d / 2 + 3), z: z - Math.sin(o.ry || 0) * (-w * 0.4) + Math.cos(o.ry || 0) * (d / 2 + 3), y: y, s: 0.9, ry: 0 }], { col: 0x2E4A26, keepAll: true });
}
lkwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
g.userData.door = { x: dx, z: d / 2 + 1.6 };
return g;
},
function (P, x, z, n, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : lkwLand(x, z), sw = o.sw || 6, d = o.d || 9, h = o.h || 8.6;
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var names = o.names || ["GROCER", "BUTCHER", "DRAPER", "CHEMIST", "IRONMONGER", "BAKER", "TOBACCONIST", "NEWSAGENT", "BOOTMAKER", "POST OFFICE"], cols = [0x2A3A5A, 0x5A1E1E, 0x2A4A2A, 0x3A2A1A, 0x4A3A5A, 0x1E3A3A], R = wRand(Math.round(x * 3 + z));
var brick = lkwS("brick", 0xA86048, 1.4), slate = lkwMat("slate"), trim = lkwLam(0xF2EEE2), pane = lkwMat("pane");
for (var i = 0; i < n; i++) {
var cx = -((n - 1) * sw) / 2 + i * sw, c = cols[Math.floor(R() * cols.length)], ht = h + (i % 3) * 0.4;
lkwBox(g, sw - 0.05, ht, d, brick, cx, 0, 0);
var rf = new THREE.Mesh(lkwGeo("shr" + sw + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.3, 0); s.lineTo(0, 2.6); s.lineTo(d / 2 + 0.3, 0); s.lineTo(-d / 2 - 0.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false }); e.translate(0, 0, -sw / 2); e.rotateY(Math.PI / 2); return e; }), slate);
rf.position.set(cx, ht, 0);
g.add(rf);
lkwBox(g, sw - 0.3, 3.3, 0.12, lkwLam(c), cx, 0, d / 2 + 0.04);
lkwBox(g, sw - 1.6, 2.3, 0.06, pane, cx - 0.5, 0.5, d / 2 + 0.12);
lkwBox(g, 1.0, 2.4, 0.08, lkwLam(0x1E1A16), cx + sw / 2 - 0.9, 0, d / 2 + 0.12);
lkwSign(g, o.names ? names[i % names.length] : names[Math.floor(R() * names.length)], sw - 0.6, 0.62, cx, 3.0, d / 2 + 0.2, 0, { bg: "#" + c.toString(16).padStart(6, "0"), ink: "#F0D890" });
if (!lkwLite()) {
var aw = lkwBox(g, sw - 0.4, 0.06, 1.6, lkwLam([0xC8B080, 0x8A3A2A, 0x3A5A3A][i % 3], { ds: 1 }), cx, 2.7, d / 2 + 0.8);
aw.rotation.x = 0.3;
}
[0, 1].forEach(function (f) { for (var k = -1; k <= 1; k += 2) {
lkwBox(g, 1.0, 1.6, 0.06, trim, cx + k * sw * 0.22, 4.2 + f * 2.4, d / 2 + 0.03);
lkwBox(g, 0.8, 1.4, 0.06, pane, cx + k * sw * 0.22, 4.3 + f * 2.4, d / 2 + 0.06);
} });
}
lkwSolid(x, z, n * sw, d, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, pts, hfn) {
var lite = lkwLite();
lkwStrip(P, pts, 7, hfn, lkwMat("gravel"), 0.12);
var sl = [], rl = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (lite ? 1.6 : 0.8));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
[-1.6, 1.6].forEach(function (o) { sl.push({ x: x + Math.cos(ry) * o, z: z - Math.sin(ry) * o, y: hfn(x, z) + 0.16, ry: ry }); });
}
[-2.32, -0.88, 0.88, 2.32].forEach(function (o) { var m = new THREE.Mesh(lkwGeo("rail", function () { return new THREE.BoxGeometry(0.08, 0.14, 1); }), lkwMat("iron")); var mx = (a[0] + b[0]) / 2 + Math.cos(ry) * o, mz = (a[1] + b[1]) / 2 - Math.sin(ry) * o; m.position.set(mx, hfn(mx, mz) + 0.3, mz); m.rotation.y = ry; m.scale.z = L; P.add(m); });
}
lkwInst(P, lkwGeo("sleeper", function () { return new THREE.BoxGeometry(2.4, 0.14, 0.26); }), lkwMat("darkoak"), sl, {});
},
function (P, x, z, len, name, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : lkwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
lkwBox(g, 6, 1.0, len, lkwMat("paving"), 0, 0, 0);
lkwBox(g, 6.1, 0.12, len, lkwMat("ashlar"), 0, 1.0, 0);
for (var i = 0; i < Math.floor(len / 6); i++) {
var cz = -len / 2 + 3 + i * 6;
lkwCyl(g, 0.1, 0.12, 4, lkwLam(0x2A4A3A), 1.6, 1, cz, 8);
}
var cn = lkwBox(g, 5, 0.1, len * 0.7, lkwLam(0xD8D0C0, { ds: 1 }), 0.6, 5.0, 0);
cn.rotation.z = 0.12;
lkwBox(g, 0.2, 0.4, len * 0.7, lkwLam(0x2A4A3A), 3, 4.8, 0);
lkwBox(g, 4, 3.8, 12, lkwS("brick", 0xA86048, 1.4), -1, 1, 0);
lkwBox(g, 4.4, 0.3, 12.4, lkwLam(0xF2EEE2), -1, 4.8, 0);
lkwBox(g, 1.2, 2.3, 0.08, lkwLam(0x2A3A2A), 1.02, 1, 0);
lkwSign(g, name, 5, 0.8, 2.9, 2.6, len / 2 - 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
lkwSign(g, name, 5, 0.8, 2.9, 2.6, -len / 2 + 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
lkwFloor(x, z, 6, len, y + 1.12, {});
lkwSolid(x + Math.cos(o.ry || 0) * (-1), z - Math.sin(o.ry || 0) * (-1), 4, 12, y, y + 5, o.ry || 0);
return g;
},
function (P, x, z, len, w, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = lkwS("brick", 0x9A5A40, 1.4), rise = o.rise || 1.6, n = 8;
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, z0 = -len / 2 + len * t0, z1 = -len / 2 + len * t1, y0 = Math.sin(t0 * Math.PI) * rise, y1 = Math.sin(t1 * Math.PI) * rise, seg = lkwBox(g, w, 0.5, len / n + 0.05, br, 0, (y0 + y1) / 2 - 0.4, (z0 + z1) / 2);
seg.rotation.x = -Math.atan2(y1 - y0, len / n);
[-1, 1].forEach(function (s) { var pr = lkwBox(g, 0.4, 1.0, len / n + 0.05, br, s * (w / 2 - 0.2), (y0 + y1) / 2, (z0 + z1) / 2); pr.rotation.x = -Math.atan2(y1 - y0, len / n); });
}
var ar = new THREE.Mesh(lkwGeo("arch" + w, function () { var t = new THREE.TorusGeometry(3, 0.6, 6, 12, Math.PI); return t; }), br);
ar.rotation.y = Math.PI / 2;
ar.position.y = -3.2;
g.add(ar);
var ry = o.ry || 0, cx = function (lz) { return x + Math.sin(ry) * lz; }, cz = function (lz) { return z + Math.cos(ry) * lz; };
lkwRamp(cx(-len / 4), cz(-len / 4), w - 0.8, len / 2, y - 0.1, y + rise - 0.1, ry);
lkwRamp(cx(len / 4), cz(len / 4), w - 0.8, len / 2, y + rise - 0.1, y - 0.1, ry);
[-1, 1].forEach(function (s) { lkwSolid(x + Math.cos(ry) * s * (w / 2 - 0.2), z - Math.sin(ry) * s * (w / 2 - 0.2), 0.4, len, y - 1, y + rise + 1.1, ry); });
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = lkwLam(0x1E2A22);
lkwCyl(g, 0.07, 0.12, 3.4, ir, 0, 0, 0, 8);
lkwBox(g, 0.7, 0.06, 0.06, ir, 0, 3.1, 0);
var lt = lkwBox(g, 0.34, 0.5, 0.34, lkwGlowM(o.lit ? 0xFFE0A0 : 0xE8E4D0, o.lit ? 0.95 : 0.6), 0, 3.4, 0);
var cap = new THREE.Mesh(lkwGeo("lampcap", function () { return new THREE.ConeGeometry(0.3, 0.3, 4); }), ir);
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
if (o.lit) {
var gl = wGlow(0xFFD890, 0.9, 2.4);
gl.position.y = 3.6;
g.add(gl);
}
lkwRound(x, z, 0.2, hfn(x, z) - 1, hfn(x, z) + 3.5);
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
lkwInst(P, lkwGeo("tpole", function () { var p = new THREE.CylinderGeometry(0.1, 0.14, 8, 6); p.translate(0, 4, 0); var c = new THREE.BoxGeometry(1.6, 0.1, 0.1); c.translate(0, 7.4, 0); var c2 = new THREE.BoxGeometry(1.2, 0.1, 0.1); c2.translate(0, 6.8, 0); return gwMerge([p.toNonIndexed(), c, c2].map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), lkwMat("darkoak"), list, {});
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
if (o.wall) {
lkwInst(P, lkwGeo("drywall", function () { var b = new THREE.BoxGeometry(0.7, 1.1, 2.5); b.translate(0, 0.5, 0); return b; }), lkwMat("granite"), list, {});
list.forEach(function (q) { lkwSolid(q.x, q.z, 0.8, 2.5, q.y - 1, q.y + 1.1, q.ry); });
return;
}
if (o.hedge) {
lkwPlant(P, "bush", list.map(function (q, i) { return { x: q.x, z: q.z, y: q.y - 0.2, s: 0.85 + ((i * 37) % 10) / 40, ry: i * 1.7 }; }), { col: 0x4A6A30, keepAll: true });
return;
}
lkwInst(P, lkwGeo(o.hedge ? "hedge" : "paling", function () { if (o.hedge) {
var h = new THREE.BoxGeometry(0.9, 1.4, 2.5, 2, 2, 2);
h.translate(0, 0.7, 0);
return h;
} var parts = []; for (var j = 0; j < 6; j++) {
var s = new THREE.BoxGeometry(0.06, 1.1, 0.08);
s.translate(0, 0.55, -1.0 + j * 0.4);
parts.push(s);
} var r = new THREE.BoxGeometry(0.05, 0.08, 2.4); r.translate(0, 0.85, 0); parts.push(r); var r2 = r.clone(); r2.translate(0, -0.5, 0); parts.push(r2); return gwMerge(parts.map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), o.hedge ? lkwM("hedgeM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A5A2A, map: lkwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }) : lkwLam(o.col || 0xE8E2D2), list, {});
},
function (P, x, z, r, hfn, fires) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 18), lkwM("scorch", function () { var mm = new THREE.MeshLambertMaterial({ color: 0x14100C, transparent: true, opacity: 0.85, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, hfn(x, z) + 0.05, z);
P.add(m);
var R = wRand(Math.round(x * 7 + z));
for (var i = 0; i < (fires || 0); i++) {
var a = R() * 6.283, d = R() * r * 0.8, fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
var f = lkwFire(P, fx, hfn(fx, fz), fz, 0.6 + R() * 0.8);
f.userData.keep = 1;
}
return m;
},
function (P, list) { if (!list.length)
return; lkwInst(P, lkwGeo("deadT", function () { var t = new THREE.CylinderGeometry(0.12, 0.3, 6, 6); t.translate(0, 3, 0); var b = new THREE.CylinderGeometry(0.05, 0.1, 2.4, 5); b.rotateZ(0.9); b.translate(0.8, 4.2, 0); var b2 = b.clone(); b2.rotateY(2.4); return gwMerge([t.toNonIndexed(), b.toNonIndexed(), b2.toNonIndexed()]); }), lkwLam(0x1A1612), list, {}); },
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : lkwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var lk = lkwMat(o.mat || "oak"), blk = lkwLam(0x1A1612);
var L = o.len || 2.6, W = o.w || 1.5;
lkwBox(g, W, 0.5, L, lk, 0, 0.8, 0);
if (o.seat)
lkwBox(g, W, 0.5, 0.5, lkwLam(o.seatCol || 0x3A2A1E), 0, 1.3, -0.3);
if (o.load)
for (var i = 0; i < o.load; i++)
lkwBox(g, 0.6, 0.4 + i % 2 * 0.2, 0.6, lkwLam([0x8A6A4A, 0x5A4A3A, 0xC8B898, 0x6A3A2A][i % 4]), -0.4 + (i % 3) * 0.4, 1.3, -0.8 + Math.floor(i / 3) * 0.6);
[-1, 1].forEach(function (s) { var wh = new THREE.Mesh(lkwGeo("cwheel", function () { return new THREE.TorusGeometry(0.75, 0.05, 6, 16); }), blk); wh.position.set(s * (W / 2 + 0.1), 0.75, 0.2); wh.rotation.y = Math.PI / 2; g.add(wh); for (var k = 0; k < 5; k++) {
var sp = lkwBox(g, 0.03, 1.5, 0.03, lk, s * (W / 2 + 0.1), 0, 0.2);
sp.position.y = 0.75;
sp.rotation.x = k / 5 * Math.PI;
} });
[-1, 1].forEach(function (s) { lkwBox(g, 0.06, 0.06, 2.4, lk, s * 0.45, 0.9, -L / 2 - 1.1); });
if (o.horse && typeof lkwHorse === "function")
lkwHorse(g, 0, 0, -L / 2 - 2.0, 0, { col: o.hcol || 0x5A3A22, kind: o.kind });
if (!o.nosolid)
lkwSolid(x, z, W + 0.6, L + 2, y - 1, y + 2.2, ry || 0);
return g;
},
function (P, hfn, col, o) {
o = o || {};
var R = o.r || 2600, st = lkwLite() ? 160 : 100, E = o.edge || 820, cl = function (v) { return Math.max(-E, Math.min(E, v)); };
return lkwTerrain(P, -R, -R, 2 * R, 2 * R, st, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)), k = lkwSmooth(E, R, e); return hfn(cl(x), cl(z)) * (1 - k) + (o.rise || 18) * k * lkwFbm(x * 0.002, z * 0.002, 2) - 0.6 - 8 * (1 - k); }, lkwMat("meadow"), function (x, z, y, c) { var g = 0.75 + lkwFbm(x * 0.01, z * 0.01, 2) * 0.2, C = typeof col === "number" ? [((col >> 16) & 255) / 255, ((col >> 8) & 255) / 255, (col & 255) / 255] : (col || [0.56, 0.74, 0.42]); c.setRGB(C[0] * g, C[1] * g, C[2] * g); });
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
var lite = lkwLite(), R = wRand(o.seed || 5), L = lkwPathLen(pts), W = o.w || 8, mv = [], g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var dress = o.dress || ["gent", "lady", "maid", "worker", "boy", "girl", "porter", "cabby", "clergy", "newsboy"], n = lite ? Math.round((o.n || 40) * 0.4) : (o.n || 40), nc = lite ? Math.round((o.carts || 8) * 0.5) : (o.carts || 8);
for (var i = 0; i < n; i++) {
var d = dress[Math.floor(R() * dress.length)], kid = d === "boy" || d === "girl", m = lkwDressed((o.seed || 5) * 100 + i, d, { sex: d === "lady" || d === "maid" || d === "girl" ? "f" : "m", child: kid });
g.add(m);
mv.push({ g: m, s: R() * L, off: (R() - 0.5) * W, sp: (o.sp || 1.4) * (0.8 + R() * 0.5) });
}
for (i = 0; i < nc; i++) {
var c = lkwCart(g, 0, 0, 0, { y: 0, nosolid: true, seat: R() < 0.6, load: Math.floor(R() * 6), hcol: [0x5A3A22, 0x2A1E16, 0x8A6A4A, 0x3A3028][i % 4], len: 2 + R() * 1.4 });
mv.push({ g: c, s: R() * L, off: (R() - 0.5) * W * 0.5, sp: (o.sp || 1.4) * (0.9 + R() * 0.3), cart: 1 });
}
var on = true;
LKW.ticks.push(function (dt) { if (!g.parent || !on)
return; mv.forEach(function (M) { M.s += M.sp * dt; if (M.s > L)
M.s -= L; var p = lkwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); }); });
mv.forEach(function (M) { var p = lkwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); });
g.userData.stop = function () { on = false; };
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ir = lkwLam(0x1E1E1A), br = lkwMat(o.brass ? "brass" : "iron");
if (o.hang)
lkwCyl(g, 0.012, 0.012, o.hang, ir, 0, 0.34, 0, 4);
lkwCyl(g, 0.12, 0.12, 0.03, br, 0, 0, 0, 8);
lkwCyl(g, 0.1, 0.1, 0.24, lkwGlowM(0xFFD890, 0.75), 0, 0.03, 0, 8);
lkwCyl(g, 0.04, 0.12, 0.08, br, 0, 0.27, 0, 8);
return g;
},
function (P, x, y, z, s) { s = s || 1; var m = new THREE.Mesh(lkwGeo("lkGourd", function () { var pts = []; for (var i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(new THREE.Vector2(Math.max(0.01, (t < 0.55 ? Math.sin(t / 0.55 * Math.PI) * 0.16 : Math.sin((t - 0.55) / 0.45 * Math.PI) * 0.08 + 0.02)), t * 0.5));
} return new THREE.LatheGeometry(pts, 10); }), lkwLam(0xC8A050)); m.position.set(x, y, z); m.scale.setScalar(s); P.add(m); return m; },
function (P, x, y, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var m = new THREE.Mesh(lkwGeo("lkShield", function () { var c = new THREE.CircleGeometry(0.5, 16); c.scale(0.55, 1, 1); return c; }), lkwLam(col || 0x6A4A2A, { ds: 1 }));
g.add(m);
var b = new THREE.Mesh(lkwGeo("lkShieldB", function () { var c = new THREE.PlaneGeometry(0.06, 0.95); return c; }), lkwLam(0xE8E0C8, { ds: 1 }));
b.position.z = 0.005;
g.add(b);
return g;
},
function (P, x, y, z, ry, items) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
lkwBox(g, 0.2 + items.length * 0.45, 0.08, 0.04, lkwMat("darkoak"), 0, 0, 0);
items.forEach(function (it, i) {
var px = -items.length * 0.225 + 0.22 + i * 0.45;
lkwCyl(g, 0.02, 0.02, 0.1, lkwMat("oak"), px, 0.0, 0.06, 5).rotation.x = Math.PI / 2;
if (it === "coat")
lkwBox(g, 0.42, 0.9, 0.08, lkwLam(0x3A3A30), px, -0.92, 0.08);
else if (it === "hat")
lkwCyl(g, 0.15, 0.17, 0.12, lkwLam(0xD8C8A0), px, -0.06, 0.12, 10);
else if (it === "rope") {
var r = new THREE.Mesh(lkwGeo("lkRopeC", function () { return new THREE.TorusGeometry(0.16, 0.03, 5, 14); }), lkwLam(0xB8A070));
r.position.set(px, -0.2, 0.08);
g.add(r);
}
else if (it === "bag")
lkwBox(g, 0.3, 0.36, 0.14, lkwLam(0x6A4A2A), px, -0.42, 0.1);
});
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
lkwBox(g, 0.42, 0.52, 0.1, lkwMat("darkoak"), 0, 0, 0);
var f = new THREE.Mesh(new THREE.CircleGeometry(0.15, 20), lkwLam(0xF4F0E4));
f.position.set(0, 0.3, 0.052);
g.add(f);
var h = lkwBox(g, 0.015, 0.11, 0.01, lkwLam(0x141414), 0, 0.3, 0.056);
h.rotation.z = 0.8;
lkwBox(g, 0.012, 0.13, 0.01, lkwLam(0x141414), 0, 0.3, 0.058);
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var ir = lkwShine(0x1E1E1E, 0.6, 0.5);
lkwCyl(g, 0.32, 0.36, 0.9, ir, 0, 0.12, 0, 14);
lkwCyl(g, 0.38, 0.38, 0.06, ir, 0, 1.0, 0, 14);
[[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]].forEach(function (q) { lkwBox(g, 0.06, 0.14, 0.06, ir, q[0], 0, q[1]); });
lkwCyl(g, 0.07, 0.07, 2.0, ir, 0, 1.06, 0, 8);
lkwBox(g, 0.18, 0.14, 0.02, lkwGlowM(0xFF8A3A, 0.8), 0, 0.4, 0.35);
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var c = lkwLam(col || 0x2A1A14), lk = lkwMat("darkoak");
lkwBox(g, 1.9, 0.42, 0.7, c, 0, 0.12, 0);
lkwBox(g, 1.9, 0.55, 0.16, c, 0, 0.5, -0.28);
[-1, 1].forEach(function (s) { lkwBox(g, 0.14, 0.32, 0.7, c, s * 0.95, 0.5, 0); });
[[-0.85, -0.3], [0.85, -0.3], [-0.85, 0.3], [0.85, 0.3]].forEach(function (q) { lkwBox(g, 0.06, 0.12, 0.06, lk, q[0], 0, q[1]); });
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
lkwTable(g, 0, 0, 0.6, 0.6, 0.7, { mat: "darkoak" });
lkwCyl(g, 0.1, 0.12, 0.04, lkwMat("brass"), 0, 0.7, 0, 10);
lkwCyl(g, 0.08, 0.1, 0.18, lkwGlowM(0xFFE0A8, 0.7), 0, 0.74, 0, 10);
lkwCyl(g, 0.04, 0.06, 0.2, lkwShine(0xEAF2F4, 0.1, 0.05), 0, 0.92, 0, 8);
if (o.book)
lkwBox(g, 0.22, 0.05, 0.3, lkwLam(0x6A2A1A), 0.14, 0.7, 0.1);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var lk = lkwMat(o.mat || "oak");
lkwBox(g, 1.4, 0.9, 0.5, lk, 0, 0, 0);
for (var i = 0; i < 2; i++) {
lkwBox(g, 0.62, 0.3, 0.02, lkwMat("darkoak"), -0.34 + i * 0.68, 0.15, 0.26);
lkwBox(g, 0.62, 0.3, 0.02, lkwMat("darkoak"), -0.34 + i * 0.68, 0.52, 0.26);
}
if (o.hutch) {
lkwBox(g, 1.4, 1.0, 0.3, lk, 0, 0.9, -0.1);
for (var p = 0; p < 5; p++)
lkwCyl(g, 0.12, 0.12, 0.02, lkwLam([0xF4F2EA, 0x3A6A9A, 0xF4F2EA, 0xC8A060, 0xF4F2EA][p]), -0.5 + p * 0.25, 1.55, 0.0, 12).rotation.x = Math.PI / 2.4;
lkwBox(g, 1.3, 0.03, 0.25, lk, 0, 1.4, -0.08);
}
return g;
},
function (P, x, y, z, ry) {
lkwPicture(P, x, y, z, ry || 0, 0.9, 0.7, function (c, W, H) {
c.fillStyle = "#F2EAD4";
c.fillRect(0, 0, W, H);
c.fillStyle = "#2A1A10";
c.font = "bold " + Math.round(H * 0.13) + "px serif";
c.textAlign = "center";
c.fillText("TRAINS", W / 2, H * 0.18);
c.font = Math.round(H * 0.09) + "px serif";
["South  4.10 p.m.", "North  9.25 a.m.", "Mail   12.40", "Freight daily"].forEach(function (t, i) { c.fillText(t, W / 2, H * (0.36 + i * 0.16)); });
});
},
function (p, hf, df) {
var H = p.h || 1, b = p.b || 1, am = p.arm || 1, col = p.col, c2 = p.col2 !== undefined ? p.col2 : col, cs = p.skin !== undefined ? p.skin : col, lc = p.legCol !== undefined ? p.legCol : c2, fc = p.foot !== undefined ? p.foot : lc, hc = p.hand !== undefined ? p.hand : cs;
var prims = [], bones = [], eyes = [], bird = !!p.bird, hipY = H * (p.legs || 0.42), sY = hipY + H * (bird ? 0.33 : 0.36), sX = 0.11 * b * H, E = [0, sY + H * (bird ? 0.05 : 0.06), H * (bird ? 0.06 : 0.015)], F = 0.1 * b * H;
var e = function (c, r, cl, bn, o) { prims.push(lkcE(c, r, cl, bn, o)); }, cy = function (a, bb, r0, r1, cl, bn, o) { prims.push(lkcC(a, bb, r0, r1, cl, bn, o)); };
if (bird) {
e([0, hipY + 0.17 * H, 0.0], [0.15 * b * H, 0.2 * H, 0.19 * b * H], col, "spine", { rot: [0.35, 0, 0], k: 0.03 * H });
e([0, hipY + 0.15 * H, 0.07 * H], [0.12 * b * H, 0.15 * H, 0.12 * b * H], c2, "spine", { rot: [0.35, 0, 0], k: 0.03 * H });
e([0, hipY + 0.05 * H, -0.2 * H], [0.07 * b * H, 0.03 * H, 0.12 * H], p.tailCol !== undefined ? p.tailCol : col, "hips", { rot: [-0.4, 0, 0], k: 0.02 * H });
cy([0, sY - 0.04 * H, 0.03 * H], [E[0], E[1], E[2]], 0.07 * b * H, 0.06 * H * (p.hs || 1) * 0.6, col, "neck", { k: 0.03 * H });
}
else {
e([0, hipY + 0.05 * H, -0.005 * H], [0.13 * b * H, 0.1 * H, 0.11 * b * H], col, "hips", { k: 0.03 * H });
e([0, hipY + 0.17 * H, 0.01 * H], [0.135 * b * H * (1 + (p.gut || 0) * 0.25), 0.13 * H, (0.115 + (p.gut || 0) * 0.035) * b * H], col, "spine", { k: 0.03 * H });
e([0, hipY + 0.29 * H, 0], [0.12 * b * H, 0.1 * H, 0.095 * b * H], col, "chest", { k: 0.03 * H });
e([0, hipY + 0.22 * H, 0.05 * b * H], [0.09 * b * H, 0.14 * H, 0.07 * b * H], c2, "spine", { k: 0.03 * H });
cy([0, sY - 0.03 * H, 0], [E[0], E[1] + 0.01 * H, E[2] - 0.01 * H], 0.05 * b * H, 0.04 * H, cs, "neck", { k: 0.02 * H });
}
var el = [sX + 0.02 * H, sY - 0.15 * H * am, 0.0], wr = [sX + 0.025 * H, sY - 0.29 * H * am, 0.03 * H], hd = [wr[0], wr[1] - 0.035 * H, wr[2] + 0.01 * H], arm = [];
if (bird) {
var wc = p.wingCol !== undefined ? p.wingCol : col;
arm.push(lkcE([sX + 0.03 * b * H, sY - 0.12 * H, -0.04 * H], [0.035 * H, 0.13 * H, 0.19 * H], wc, "L_arm", { rot: [0.45, 0, 0.08], k: 0.02 * H }), lkcE([sX + 0.02 * b * H, sY - 0.17 * H, -0.2 * H], [0.025 * H, 0.06 * H, 0.12 * H], p.tipCol !== undefined ? p.tipCol : wc, "L_fore", { rot: [0.6, 0, 0], k: 0.015 * H }));
el = [sX + 0.03 * H, sY - 0.1 * H, -0.1 * H];
wr = [sX + 0.03 * H, sY - 0.16 * H, -0.2 * H];
}
else {
var ar = (p.limb || 1) * 0.034 * b * H;
arm.push(lkcC([sX, sY - 0.01 * H, 0], el, ar * 1.15, ar, col, "L_arm", { k: 0.01 * H }), lkcC(el, wr, ar, ar * 0.85, col, "L_fore", { k: 0.01 * H }), lkcE([wr[0], wr[1] + 0.01 * H, wr[2]], [ar * 1.15, ar * 0.7, ar * 1.15], p.cuff !== undefined ? p.cuff : col, "L_fore", { k: 0.006 * H }), lkcE(hd, [ar * 0.75, 0.035 * H, ar * 0.95], hc, "L_hand", { k: 0.01 * H }));
for (var f = 0; f < 3; f++)
arm.push(lkcC([hd[0], hd[1] - 0.02 * H, hd[2] + (f - 1) * ar * 0.5], [hd[0] + 0.003 * H, hd[1] - 0.055 * H, hd[2] + (f - 1) * ar * 0.55 + 0.006 * H], ar * 0.3, ar * 0.22, hc, "L_hand", { k: 0.005 * H }));
}
var hx = 0.07 * b * H, kn, an, toe, FL = (p.footL || 0.12) * H, lr = (p.limb || 1) * (bird ? 0.012 : 0.045) * b * H;
if (p.digi) {
kn = [hx, hipY * 0.62, 0.05 * H];
an = [hx, hipY * 0.2, -0.06 * H];
}
else {
kn = [hx, hipY * 0.52, 0.02 * H];
an = [hx, 0.04 * H, -0.01 * H];
}
toe = [hx, 0.02 * H, an[2] + FL];
var legs = [];
if (bird) {
legs.push(lkcE([hx, hipY + 0.02 * H, 0.0], [0.06 * b * H, 0.08 * H, 0.07 * b * H], col, "L_thigh", { k: 0.02 * H }), lkcC([hx, hipY - 0.04 * H, 0.0], kn, lr * 1.2, lr, lc, "L_thigh"), lkcC(kn, an, lr, lr, lc, "L_shin"));
[-0.5, 0, 0.5].forEach(function (a) { legs.push(lkcC(an, [an[0] + Math.sin(a) * FL * 0.7, 0.008 * H, an[2] + Math.cos(a) * FL * 0.7], lr * 0.8, lr * 0.5, fc, "L_foot", { k: 0.003 * H })); });
legs.push(lkcC(an, [an[0], 0.01 * H, an[2] - FL * 0.35], lr * 0.7, lr * 0.4, fc, "L_foot"));
}
else {
legs.push(lkcE([hx, hipY - 0.06 * H, 0.01 * H], [lr * 1.6, 0.11 * H, lr * 1.6], lc, "L_thigh", { k: 0.02 * H }), lkcC([hx, hipY - 0.04 * H, 0], kn, lr * 1.35, lr * 1.05, lc, "L_thigh", { k: 0.01 * H }), lkcC(kn, an, lr * 1.05, lr * 0.8, lc, "L_shin", { k: 0.01 * H }));
if (p.digi)
legs.push(lkcC(an, [an[0], 0.03 * H, an[2] + 0.01 * H], lr * 0.8, lr * 0.75, lc, "L_foot", { k: 0.008 * H }));
legs.push(lkcE([hx, 0.03 * H, an[2] + FL * 0.5], [lr * 1.05, 0.03 * H, FL * 0.55], fc, "L_foot", { k: 0.012 * H }));
if (p.hooves)
legs.push(lkcE([hx, 0.035 * H, an[2] + FL * 0.5], [lr * 1.15, 0.04 * H, FL * 0.45], 0x1E1814, "L_foot", { g: 0.4, k: 0.01 * H }));
}
prims = prims.concat(crxMirror(arm.concat(legs)));
bones.push(["hips", null, [0, hipY, 0]], ["spine", "hips", [0, hipY + 0.1 * H, 0]], ["chest", "spine", [0, hipY + 0.25 * H, 0]], ["neck", "chest", [0, sY - 0.01 * H, 0]], ["head", "neck", E], ["L_arm", "chest", [sX, sY - 0.01 * H, 0]], ["L_fore", "L_arm", el], ["L_hand", "L_fore", wr], ["L_thigh", "hips", [hx, hipY - 0.04 * H, 0]], ["L_shin", "L_thigh", kn], ["L_foot", "L_shin", an], ["jaw", "head", [E[0], E[1], E[2] + 0.02 * H]]);
if (p.tail) {
var t0 = [0, hipY, -0.1 * H], t1 = [0, hipY * 0.55, -0.32 * H], t2 = [0, 0.03 * H, -0.62 * H], tc = p.tailCol !== undefined ? p.tailCol : col;
cy(t0, t1, 0.03 * H, 0.02 * H, tc, "tail1", { k: 0.01 * H });
cy(t1, t2, 0.02 * H, 0.006 * H, tc, "tail2", { k: 0.006 * H });
bones.push(["tail1", "hips", t0], ["tail2", "tail1", t1]);
}
var I = { E: E, sY: sY, sX: sX, hipY: hipY, H: H, b: b, u: H / 1.85, F: F, zc: 0 };
if (hf)
prims = prims.concat(hf(lkcAt(E, (H / 1.85) * (p.hs || 1)), (H / 1.85) * (p.hs || 1), eyes, I));
if (df)
prims = prims.concat(df(I));
var pose = { L_arm: [0, 0, -0.1], R_arm: [0, 0, 0.1], L_fore: [-0.3, 0, 0], R_fore: [-0.3, 0, 0] };
if (bird) {
pose.L_arm = [0, 0, 0];
pose.R_arm = [0, 0, 0];
pose.L_fore = [0, 0, 0];
pose.R_fore = [0, 0, 0];
}
return { prims: prims, bones: crxBonesMirror(bones), eyes: eyes, col: col, surf: p.surf || "fur", anim: "biped", k: p.k || 0.03 * H, stride: p.stride || 0.8 * H, runAt: p.runAt || 2.4 * H, fine: p.fine || 110, pose: Object.assign(pose, p.pose || {}), extras: p.extras };
},
function (at, s, eyes, fur, inner, eyeCol, hare) {
var o = [], B = "head";
o.push(lkcE(at(0, 0.07, 0.01), [0.078 * s, 0.08 * s, 0.095 * s], fur, B));
o.push(lkcE(at(0, 0.035, 0.085), [0.055 * s, 0.046 * s, 0.055 * s], fur, B, { k: 0.02 * s }));
o.push(lkcE(at(0.032, 0.025, 0.1), [0.03 * s, 0.026 * s, 0.028 * s], fur, B, { k: 0.01 * s }), lkcE(at(-0.032, 0.025, 0.1), [0.03 * s, 0.026 * s, 0.028 * s], fur, B, { k: 0.01 * s }));
o.push(lkcE(at(0, 0.045, 0.138), [0.014 * s, 0.011 * s, 0.009 * s], 0xD88A92, B, { g: 0.6, k: 0.004 * s }));
o.push(lkcE(at(0, 0.005, 0.11), [0.02 * s, 0.012 * s, 0.016 * s], fur, B, { k: 0.01 * s }));
var L = hare ? 0.36 : 0.42;
[-1, 1].forEach(function (sd) {
o.push(lkcC(at(sd * 0.035, 0.13, -0.01), at(sd * (hare ? 0.09 : 0.06), 0.13 + L * 0.55, -0.05), 0.032 * s, 0.03 * s, fur, B, { k: 0.012 * s }));
o.push(lkcC(at(sd * (hare ? 0.09 : 0.06), 0.13 + L * 0.55, -0.05), at(sd * (hare ? 0.13 : 0.075), 0.13 + L, -0.085), 0.03 * s, 0.012 * s, fur, B, { k: 0.01 * s }));
o.push(lkcE(at(sd * (hare ? 0.085 : 0.058), 0.13 + L * 0.55, -0.022), [0.012 * s, L * 0.36 * s, 0.016 * s], inner, B, { rot: [-0.12, 0, sd * (hare ? -0.18 : -0.08)], k: 0.004 * s }));
});
lkcEye(eyes, at(0.05, 0.08, 0.075), 0.016 * s, eyeCol, "r");
return o;
},
function (at, s, eyes, fur, inner) {
var o = [], B = "head";
o.push(lkcE(at(0, 0.06, 0.02), [0.07 * s, 0.068 * s, 0.08 * s], fur, B));
o.push(lkcC(at(0, 0.05, 0.07), at(0, 0.03, 0.17), 0.05 * s, 0.018 * s, fur, B, { k: 0.015 * s }));
o.push(lkcE(at(0, 0.032, 0.175), [0.012 * s, 0.01 * s, 0.01 * s], 0xC88A8A, B, { g: 0.5, k: 0.004 * s }));
[-1, 1].forEach(function (sd) { o.push(lkcE(at(sd * 0.06, 0.12, -0.01), [0.05 * s, 0.05 * s, 0.012 * s], fur, B, { rot: [0, sd * 0.3, 0], k: 0.01 * s }), lkcE(at(sd * 0.06, 0.12, 0.0), [0.036 * s, 0.036 * s, 0.008 * s], inner, B, { rot: [0, sd * 0.3, 0], k: 0.004 * s })); });
lkcEye(eyes, at(0.042, 0.075, 0.075), 0.016 * s, 0x0E0A08, "r");
return o;
},
function (at, s, eyes, col, beakCol, kind, eyeCol) {
var o = [], B = "head";
o.push(lkcE(at(0, 0.06, 0.02), [0.075 * s, 0.075 * s, 0.08 * s], col, B));
if (kind === "dodo") {
o.push(lkcC(at(0, 0.06, 0.07), at(0, 0.03, 0.2), 0.05 * s, 0.04 * s, beakCol, B, { g: 0.5, k: 0.015 * s }));
o.push(lkcE(at(0, 0.0, 0.22), [0.04 * s, 0.045 * s, 0.045 * s], beakCol, B, { g: 0.5, k: 0.02 * s }));
o.push(lkcE(at(0, -0.02, 0.18), [0.032 * s, 0.02 * s, 0.06 * s], beakCol, B, { g: 0.5 }));
}
else if (kind === "hook") {
o.push(lkcC(at(0, 0.07, 0.08), at(0, 0.04, 0.15), 0.03 * s, 0.02 * s, beakCol, B, { g: 0.55, k: 0.01 * s }));
o.push(lkcC(at(0, 0.04, 0.15), at(0, -0.01, 0.16), 0.02 * s, 0.006 * s, beakCol, B, { g: 0.55, k: 0.006 * s }));
}
else if (kind === "flat") {
o.push(lkcE(at(0, 0.04, 0.12), [0.035 * s, 0.012 * s, 0.07 * s], beakCol, B, { g: 0.45, k: 0.01 * s }));
}
else {
o.push(lkcC(at(0, 0.06, 0.08), at(0, 0.05, 0.13), 0.018 * s, 0.004 * s, beakCol, B, { g: 0.5, k: 0.006 * s }));
}
lkcEye(eyes, at(0.05, 0.08, 0.06), 0.015 * s, eyeCol || 0x2A1A0A, "r");
return o;
},
function (at, s, eyes, skin) {
var o = [], B = "head";
o.push(lkcE(at(0, 0.05, 0.03), [0.11 * s, 0.07 * s, 0.1 * s], skin, B));
o.push(lkcE(at(0, 0.02, 0.09), [0.1 * s, 0.035 * s, 0.05 * s], skin, B, { k: 0.02 * s }));
o.push(lkcC(at(-0.09, 0.015, 0.11), at(0.09, 0.015, 0.11), 0.008 * s, 0.008 * s, 0x3A2A1A, B, { k: 0.004 * s }));
[-1, 1].forEach(function (sd) { o.push(lkcE(at(sd * 0.06, 0.11, 0.05), [0.035 * s, 0.035 * s, 0.035 * s], skin, B, { k: 0.01 * s })); });
lkcEye(eyes, at(0.06, 0.115, 0.078), 0.022 * s, 0xC8A030, "bar");
return o;
},
function (at, s, eyes, skin) {
var o = [], B = "head";
o.push(lkcE(at(0, 0.07, 0.04), [0.07 * s, 0.11 * s, 0.13 * s], skin, B));
o.push(lkcE(at(0, 0.05, 0.16), [0.035 * s, 0.035 * s, 0.02 * s], 0xC87A6A, B, { k: 0.01 * s }));
o.push(lkcE(at(0, 0.18, -0.02), [0.01 * s, 0.06 * s, 0.08 * s], 0x8A9AA8, B, { rot: [0.3, 0, 0], k: 0.01 * s }));
lkcEye(eyes, at(0.06, 0.1, 0.09), 0.022 * s, 0xE8D8A0, "r");
return o;
},
function (at, s, eyes, hide) {
var o = [], B = "head";
o.push(lkcE(at(0, 0.07, 0.03), [0.09 * s, 0.09 * s, 0.1 * s], hide, B));
o.push(lkcC(at(0, 0.05, 0.08), at(0, 0.0, 0.2), 0.075 * s, 0.06 * s, hide, B, { k: 0.02 * s }));
o.push(lkcE(at(0, -0.01, 0.22), [0.06 * s, 0.045 * s, 0.04 * s], 0x8A6A5A, B, { g: 0.3, k: 0.01 * s }));
[-1, 1].forEach(function (sd) { o.push(lkcE(at(sd * 0.11, 0.1, -0.01), [0.06 * s, 0.02 * s, 0.03 * s], hide, B, { rot: [0, 0, sd * -0.4], k: 0.01 * s }), lkcC(at(sd * 0.05, 0.15, 0.0), at(sd * 0.07, 0.19, 0.0), 0.012 * s, 0.005 * s, 0xE8DCC0, B, { g: 0.4, k: 0.005 * s })); });
lkcEye(eyes, at(0.065, 0.09, 0.08), 0.02 * s, 0x3A2210, "r", { turn: 0.5 });
return o;
},
function (at, s, eyes, wool, specs) {
var o = [], B = "head";
o.push(lkcE(at(0, 0.08, -0.01), [0.085 * s, 0.075 * s, 0.08 * s], wool, B, { k: 0.03 * s }));
for (var i = 0; i < 7; i++) {
var a = i / 7 * 6.283;
o.push(lkcE(at(Math.sin(a) * 0.06, 0.12 + Math.cos(a) * 0.02, Math.cos(a) * 0.05 - 0.02), [0.035 * s, 0.03 * s, 0.035 * s], wool, B, { k: 0.012 * s }));
}
o.push(lkcC(at(0, 0.07, 0.04), at(0, 0.02, 0.17), 0.05 * s, 0.035 * s, 0x3A3230, B, { k: 0.015 * s }));
o.push(lkcE(at(0, 0.01, 0.175), [0.03 * s, 0.022 * s, 0.02 * s], 0x2A2220, B, { k: 0.008 * s }));
[-1, 1].forEach(function (sd) { o.push(lkcE(at(sd * 0.1, 0.07, 0.0), [0.055 * s, 0.016 * s, 0.026 * s], 0x3A3230, B, { rot: [0, 0, sd * 0.3], k: 0.006 * s })); });
if (specs) {
[-1, 1].forEach(function (sd) { o.push(lkcE(at(sd * 0.04, 0.085, 0.11), [0.022 * s, 0.022 * s, 0.004 * s], 0xC8B060, B, { g: 0.9, m: 0.8, k: 0.002 * s })); });
o.push(lkcC(at(-0.02, 0.085, 0.115), at(0.02, 0.085, 0.115), 0.003 * s, 0.003 * s, 0xC8B060, B));
}
lkcEye(eyes, at(0.045, 0.085, 0.09), 0.014 * s, 0xC8A050, "bar");
return o;
},
function (at, s, eyes, hide) {
var o = lkcSheepHead(at, s, eyes, hide, 0).slice(0, 1), B = "head";
o.push(lkcC(at(0, 0.07, 0.04), at(0, 0.02, 0.18), 0.05 * s, 0.032 * s, hide, B, { k: 0.015 * s }));
o.push(lkcC(at(0, -0.01, 0.12), at(0, -0.12, 0.1), 0.02 * s, 0.006 * s, 0xE8E4DC, B, { k: 0.006 * s }));
[-1, 1].forEach(function (sd) { o.push(lkcC(at(sd * 0.03, 0.14, 0.02), at(sd * 0.08, 0.24, -0.1), 0.018 * s, 0.006 * s, 0x5A4A3A, B, { k: 0.006 * s })); o.push(lkcE(at(sd * 0.1, 0.08, 0.0), [0.05 * s, 0.014 * s, 0.022 * s], hide, B, { rot: [0, 0, sd * 0.5] })); });
return o;
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.lk_rabbit)
return;
var F = function (k, f) { CRX_PLANS["lk_" + k] = f; LKW_CRX[k] = "lk_" + k; };
var WHITE = 0xF4F2EC, PINK = 0xE8A8B0;
var coat = function (I, tails, vest, bow, collar) {
var H = I.H, h = I.hipY, o = [];
if (vest != null)
o.push(lkcE([0, h + 0.21 * H, I.F * 0.72], [0.075 * I.b * H, 0.11 * H, 0.035 * H], vest, "spine", { k: 0.012 * H }));
if (collar != null)
o.push(lkcC([-0.045 * H, I.sY + 0.005 * H, 0.035 * H], [0.045 * H, I.sY + 0.005 * H, 0.035 * H], 0.022 * H, 0.022 * H, collar, "chest", { k: 0.008 * H }));
if (bow != null)
o.push(lkcE([0, I.sY - 0.012 * H, 0.075 * H], [0.04 * H, 0.018 * H, 0.016 * H], bow, "chest", { k: 0.005 * H }));
if (tails != null)
[-1, 1].forEach(function (sd) { o.push(lkcC([sd * 0.05 * H, h + 0.06 * H, -0.08 * H], [sd * 0.06 * H, h - 0.2 * H, -0.12 * H], 0.04 * H, 0.022 * H, tails, "hips", { k: 0.012 * H })); });
return o;
};
var rab = function (herald) {
return lkcSoft({ h: 1.0, b: 0.85, legs: 0.4, digi: 1, footL: 0.2, hs: 1.25, col: herald ? 0xF4F0E8 : 0x8A2E2A, col2: herald ? 0xF4F0E8 : 0xE0C050, skin: WHITE, hand: WHITE, legCol: WHITE, foot: WHITE, cuff: WHITE, limb: 0.85 }, function (at, s, e) { return lkcRabbitHead(at, s, e, WHITE, PINK, 0xD84A5A); }, function (I) {
var o = coat(I, herald ? null : 0x8A2E2A, herald ? null : 0xE0C050, 0xB82A2A, 0xF8F6F0);
var H = I.H;
if (!herald)
o.push(lkcC([0.0, I.hipY + 0.25 * H, I.F * 0.98], [0.07 * H, I.hipY + 0.2 * H, I.F * 0.9], 0.004 * H, 0.004 * H, 0xE8C048, "spine", { g: 0.8, k: 0.002 * H }), lkcE([0.07 * H, I.hipY + 0.19 * H, I.F * 0.92], [0.022 * H, 0.022 * H, 0.008 * H], 0xE8C048, "spine", { g: 0.8 }));
o.push(lkcE([0, I.hipY + 0.02 * H, -0.13 * H], [0.05 * H, 0.05 * H, 0.05 * H], WHITE, "hips", { k: 0.02 * H }));
return o;
});
};
F("rabbit", function () { return rab(false); });
F("herald", function () { var p = rab(true); p.extras = function (I) { lkcHearts(I); lkcTrumpet(I); }; return p; });
F("hare", function () {
return lkcSoft({ h: 1.2, b: 0.85, legs: 0.43, digi: 1, footL: 0.2, hs: 1.2, col: 0x6A5A3A, col2: 0xE8E0C8, skin: 0xA8865A, hand: 0xA8865A, legCol: 0x8A7A5A, foot: 0xA8865A, limb: 0.85 }, function (at, s, e) { var o = lkcRabbitHead(at, s, e, 0xA8865A, 0xD8A8A0, 0xC8902A, true); for (var i = 0; i < 7; i++) {
var a = i * 0.9;
o.push(lkcC(at(Math.sin(a) * 0.06, 0.14, Math.cos(a) * 0.05 - 0.01), at(Math.sin(a) * 0.14, 0.2 + (i % 3) * 0.03, Math.cos(a) * 0.1), 0.006 * s, 0.004 * s, 0xD8C060, "head", { k: 0.002 * s }));
} return o; }, function (I) { return coat(I, 0x6A5A3A, 0xE8D8A8, 0x2A4A8A, 0xF8F6F0); });
});
F("mouse", function () { var p = crxQuad({ L: 0.16, H: 0.06, G: 0.06, W: 1.1, legR: 0.012, head: "rat", hs: 0.34, col: 0x8A7A6A, belly: 0xC8B8A8, muzzle: 0xA89888, tail: { l: 0.24, r: 0.008, up: -0.4 }, neck: { l: 0.04, up: 0.6 }, eyeCol: 0x0E0A08, surf: "fur" }); return p; });
F("dormouse", function () { var p = crxQuad({ L: 0.13, H: 0.05, G: 0.07, W: 1.35, legR: 0.012, head: "rat", hs: 0.32, col: 0xB8864A, belly: 0xE8D0A8, muzzle: 0xD8B088, tail: { l: 0.16, r: 0.02, up: -0.2 }, neck: { l: 0.03, up: 0.5 }, eyeCol: 0x1A0E08, surf: "fur" }); return p; });
var bird = function (h, o, kind) { return lkcSoft(Object.assign({ h: h, b: 1.0, legs: 0.24, bird: 1, footL: 0.07, hs: 1.5, surf: "fur", stride: 0.5 * h }, o), function (at, s, e) { return lkcBirdHead(at, s, e, o.headCol != null ? o.headCol : o.col, o.beak, kind, o.eye); }); };
F("dodo", function () { var p = bird(1.0, { col: 0x8A8A84, col2: 0xC8C0A8, beak: 0xD8C060, legCol: 0xD8C060, foot: 0xD8C060, eye: 0xE8D040, wingCol: 0x6A6A64, tailCol: 0xE8E4DC, b: 1.25, hs: 1.7 }, "dodo"); p.extras = function (I) { lkcStick(I, 0.9); }; return p; });
F("lory", function () { return bird(0.55, { col: 0xC82A2A, col2: 0xD84A2A, beak: 0xE8A030, legCol: 0x5A5A5A, foot: 0x5A5A5A, eye: 0xE89030, wingCol: 0x2A8A3A, tipCol: 0x2A4AB8, tailCol: 0x2A4AB8, headCol: 0x3A3AA8 }, "hook"); });
F("eaglet", function () { return bird(0.55, { col: 0x6A4A2A, col2: 0xA8865A, beak: 0xE8C040, legCol: 0xE8C040, foot: 0xE8C040, eye: 0xE8B020, wingCol: 0x4A321A, headCol: 0xC8A878 }, "hook"); });
F("duck", function () { return bird(0.55, { col: 0xF0EEE6, col2: 0xF6F4EE, beak: 0xE8A030, legCol: 0xE8A030, foot: 0xE8A030, eye: 0x2A2018, wingCol: 0xE0DCD0 }, "flat"); });
F("magpie", function () { return bird(0.45, { col: 0x141418, col2: 0xF4F4F0, beak: 0x1A1A1A, legCol: 0x1A1A1A, foot: 0x1A1A1A, eye: 0x1A1A1A, wingCol: 0x1A2A4A, tipCol: 0xF0F0F0, tailCol: 0x1A2A3A }, "short"); });
F("canary", function () { return bird(0.3, { col: 0xF0D840, col2: 0xF4E070, beak: 0xE8B080, legCol: 0xC8A0A0, foot: 0xC8A0A0, eye: 0x1A1A1A, wingCol: 0xE0C030 }, "short"); });
F("pigeon", function () { return bird(0.48, { col: 0x8A8AA0, col2: 0xA0A0B8, beak: 0x3A3A3A, legCol: 0xC86A6A, foot: 0xC86A6A, eye: 0xE8783A, wingCol: 0x6A6A80, tipCol: 0x3A3A4A, headCol: 0x6A7A8A }, "short"); });
F("flamingo", function () {
return lkcSoft({ h: 1.3, b: 0.8, legs: 0.55, bird: 1, footL: 0.07, hs: 0.9, col: 0xF08AA0, col2: 0xF4A0B4, legCol: 0xE87A90, foot: 0xE87A90, wingCol: 0xE87090, tipCol: 0x1A1A1A, surf: "fur", limb: 0.8 }, function (at, s, e) { return [lkcC(at(0, -0.1, -0.02), at(0, -0.85, 0.05), 0.035 * s, 0.045 * s, 0xF4A0B4, "head", { k: 0.02 * s })].concat(lkcBirdHead(at, s, e, 0xF4A0B4, 0x2A2A2A, "hook", 0xE8D040)); });
});
F("bill", function () { return lkcSoft({ h: 0.6, b: 0.85, legs: 0.36, hs: 1.4, col: 0x6A8A3A, col2: 0xB8C890, skin: 0x7A9A44, hand: 0x7A9A44, legCol: 0x6A8A3A, foot: 0x6A8A3A, tail: 1, tailCol: 0x5A7A32, surf: "scale" }, function (at, s, e) { return lkcLizHead(at, s, e, 0x7A9A44); }, function (I) { return coat(I, null, 0xC8A040, null, null); }); });
var wig = function (at, s) { var o = []; for (var i = 0; i < 9; i++) {
var a = (i / 8 - 0.5) * 3.0;
o.push(lkcE(at(Math.sin(a) * 0.11, 0.12 - Math.abs(Math.sin(a)) * 0.05, Math.cos(a) * 0.03 - 0.06), [0.04 * s, 0.04 * s, 0.04 * s], 0xF4F2EE, "head", { k: 0.02 * s }));
} return o; };
var footman = function (liv, face) { return function (I) { var o = coat(I, liv, 0xF0E8D0, null, 0xF8F6F0), H = I.H; [0.04, 0.1, 0.16].forEach(function (y) { o.push(lkcE([0.04 * H, I.hipY + (0.12 + y) * H, I.F * 0.98], [0.008 * H, 0.008 * H, 0.005 * H], 0xE8C048, "spine", { g: 0.8 }), lkcE([-0.04 * H, I.hipY + (0.12 + y) * H, I.F * 0.98], [0.008 * H, 0.008 * H, 0.005 * H], 0xE8C048, "spine", { g: 0.8 })); }); return o; }; };
F("frogfoot", function () { return lkcSoft({ h: 1.6, b: 1.0, legs: 0.45, hs: 1.35, col: 0x2A4A8A, col2: 0xF0E8D0, skin: 0x7A9A5A, hand: 0x7A9A5A, legCol: 0xE8E0C8, foot: 0x1A1A1A, footL: 0.12, cuff: 0xF0E8D0, surf: "hide", limb: 0.75 }, function (at, s, e) { return lkcFrogHead(at, s, e, 0x7A9A5A).concat(wig(at, s)); }, footman(0x2A4A8A)); });
F("fishfoot", function () { return lkcSoft({ h: 1.65, b: 1.0, legs: 0.45, hs: 1.3, col: 0x6A2A3A, col2: 0xF0E8D0, skin: 0x9AAAB8, hand: 0x9AAAB8, legCol: 0xE8E0C8, foot: 0x1A1A1A, footL: 0.12, cuff: 0xF0E8D0, surf: "scale", limb: 0.75 }, function (at, s, e) { return lkcFishHead(at, s, e, 0x9AAAB8).concat(wig(at, s)); }, footman(0x6A2A3A)); });
F("pat", function () { return lkcSoft({ h: 0.7, b: 1.1, legs: 0.34, hs: 1.4, gut: 0.5, col: 0xE8E0D0, col2: 0x8A7A5A, skin: 0x3A3434, hand: 0xD8A8A0, legCol: 0x4A3A2A, foot: 0xD8A8A0, footL: 0.14 }, function (at, s, e) { return lkcMouseHead(at, s, e, 0x3A3434, 0x5A4A4A); }, function (I) { var H = I.H; return [lkcE([0, I.hipY + 0.08 * H, I.F * 0.7], [0.11 * H, 0.16 * H, 0.03 * H], 0x8A7A5A, "spine", { k: 0.01 * H })]; }); });
F("puppy", function () { return crxQuad({ L: 0.62, H: 0.48, G: 0.24, W: 1.0, legR: 0.06, head: "dog", hs: 1.4, col: 0xD8C0A0, belly: 0xF0E4D0, muzzle: 0xF0E4D0, tail: { l: 0.3, r: 0.05, up: 0.6 }, neck: { l: 0.22, up: 0.6 }, eyeCol: 0x3A2410, stride: 0.9 }); });
F("pig", function () { return crxQuad({ L: 0.3, H: 0.16, G: 0.12, W: 1.15, legR: 0.03, head: "boar", hs: 0.62, col: 0xF0B8B0, belly: 0xF4C8C0, muzzle: 0xE8A0A0, tail: { l: 0.08, r: 0.012, up: 0.8 }, neck: { l: 0.08, up: 0.3 }, surf: "flesh", foot: "hoof", footCol: 0x8A6A60, eyeCol: 0x2A1A10 }); });
F("cat", function () { return crxQuad({ L: 0.62, H: 0.42, G: 0.21, W: 1.2, legR: 0.045, head: "cat", hs: 1.3, col: 0x8A7A64, belly: 0xE8E0D0, muzzle: 0xF4ECDC, stripes: 0x4A3A2A, tail: { l: 0.6, r: 0.05, up: 0.4 }, neck: { l: 0.16, up: 0.7 }, eyeCol: 0xC8D040, stride: 0.95 }); });
F("hedgehog", function () { return crxQuad({ L: 0.18, H: 0.07, G: 0.09, W: 1.3, legR: 0.016, head: "rat", hs: 0.42, col: 0x6A5A44, belly: 0xC8B898, muzzle: 0xC8B898, neck: { l: 0.04, up: 0.2 }, surf: "fur", eyeCol: 0x0E0A08 }); });
F("caterpillar", function () {
var prims = [], bones = [["c0", null, [0, 0.1, 0]]], col = 0x4A8AC8, col2 = 0x7AB0E0, eyes = [], n = 9;
for (var i = 0; i < n; i++) {
var t = i / (n - 1), y = 0.1 + (t < 0.45 ? 0 : (t - 0.45) * 1.3), z = t < 0.45 ? -0.5 + t * 0.9 : -0.1 + (t - 0.45) * 0.15, r = 0.11 - t * 0.025, b = "c" + Math.min(4, Math.floor(i / 2));
prims.push(lkcE([0, y, z], [r, r * 0.95, r * 1.05], i % 2 ? col : col2, b, { k: 0.04 }));
if (i < n - 2 && i % 2 === 0)
[-1, 1].forEach(function (sd) { prims.push(lkcC([sd * r * 0.8, y - r * 0.5, z], [sd * r * 1.15, y - r * 0.95, z + 0.02], 0.022, 0.016, 0x2A4A8A, b, { k: 0.01 })); });
}
for (var bi = 1; bi < 5; bi++) {
var tt = (bi * 2) / (n - 1);
bones.push(["c" + bi, "c" + (bi - 1), [0, 0.1 + (tt < 0.45 ? 0 : (tt - 0.45) * 1.3), tt < 0.45 ? -0.5 + tt * 0.9 : -0.1 + (tt - 0.45) * 0.15]]);
}
var hy = 0.1 + 0.55 * 1.3 + 0.06, hz = -0.1 + 0.55 * 0.15 + 0.02;
bones.push(["head", "c4", [0, hy, hz]]);
prims.push(lkcE([0, hy + 0.04, hz + 0.02], [0.1, 0.1, 0.1], col, "head", { k: 0.03 }));
prims.push(lkcE([0, hy + 0.0, hz + 0.09], [0.05, 0.035, 0.035], 0x2A5A9A, "head", { k: 0.015 }));
[-1, 1].forEach(function (sd) { prims.push(lkcC([sd * 0.1, hy - 0.12, hz + 0.02], [sd * 0.02, hy - 0.2, hz + 0.1], 0.025, 0.02, 0x3A7AB8, "c4", { k: 0.015 })); });
eyes.push({ bone: "head", at: [0.045, hy + 0.07, hz + 0.08], r: 0.022, iris: 0x1A1A2A, pupil: "r", turn: 0.3 });
return { prims: prims, bones: crxBonesMirror(bones), eyes: eyes, col: col, surf: "flesh", anim: "float", k: 0.05, stride: 1, runAt: 9, fine: 110, pose: {} };
});
F("gryphon", function () { return crxQuad({ L: 1.15, H: 0.8, G: 0.32, W: 0.95, legR: 0.07, head: "eagle", hs: 2.0, col: 0xC8A060, belly: 0xE8D8B0, muzzle: 0xF2EEE6, headCol: 0xE8DCC0, tail: { l: 0.9, r: 0.06, up: -0.2 }, neck: { l: 0.45, up: 0.7 }, claws: 1, eyeCol: 0xE8B23A, stride: 1.4, wings: { col: 0xB8904A, col2: 0x8A6A3A, s: 1.5 } }); });
F("turtle", function () {
return lkcSoft({ h: 1.15, b: 1.35, legs: 0.3, hs: 1.4, gut: 1.0, col: 0x8A9A6A, col2: 0xD8C890, skin: 0x8A9A6A, hand: 0x8A9A6A, legCol: 0x8A6A4A, foot: 0x2A1E14, hooves: 1, tail: 1, tailCol: 0x8A6A4A, surf: "hide", footL: 0.12 }, function (at, s, e) { return lkcCalfHead(at, s, e, 0x8A6A4A); }, function (I) {
var H = I.H, o = [];
o.push(lkcE([0, I.hipY + 0.2 * H, -0.07 * H], [0.22 * H, 0.25 * H, 0.14 * H], 0x5A6A32, "spine", { k: 0.03 * H }));
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2;
o.push(lkcE([Math.sin(a) * 0.11 * H, I.hipY + 0.2 * H + Math.cos(a) * 0.14 * H, -0.18 * H], [0.055 * H, 0.055 * H, 0.02 * H], 0x4A5A2A, "spine", { k: 0.01 * H }));
}
o.push(lkcE([0, I.hipY + 0.2 * H, -0.21 * H], [0.06 * H, 0.06 * H, 0.02 * H], 0x4A5A2A, "spine", { k: 0.01 * H }));
return o;
});
});
var recol = function (p, c, sc) {
p.prims.forEach(function (q) { q.col = c; if (sc !== 1) {
if (q.c)
q.c = q.c.map(function (v) { return v * sc; });
if (q.a) {
q.a = q.a.map(function (v) { return v * sc; });
q.b = q.b.map(function (v) { return v * sc; });
q.r0 *= sc;
q.r1 *= sc;
}
if (q.r && q.r.map)
q.r = q.r.map(function (v) { return v * sc; });
if (q.k)
q.k *= sc;
} });
if (sc !== 1) {
p.bones = p.bones.map(function (b) { return [b[0], b[1], b[2].map(function (v) { return v * sc; })]; });
(p.eyes || []).forEach(function (e) { e.at = e.at.map(function (v) { return v * sc; }); e.r *= sc; });
}
p.col = c;
return p;
};
F("crab", function () { return recol(CRX_PLANS.crab(), 0xC85A3A, 1); });
F("crabyoung", function () { return recol(CRX_PLANS.crab(), 0xD8783A, 0.65); });
F("lobster", function () {
return lkcSoft({ h: 1.0, b: 0.7, legs: 0.4, hs: 1.3, col: 0xC83A2A, col2: 0xD85A3A, skin: 0xC83A2A, hand: 0xC83A2A, legCol: 0xB83020, foot: 0xB83020, surf: "chitin", tail: 1, tailCol: 0xB83020, limb: 0.7 }, function (at, s, e) {
var o = [lkcE(at(0, 0.05, 0.04), [0.06 * s, 0.05 * s, 0.09 * s], 0xC83A2A, "head")];
[-1, 1].forEach(function (sd) { o.push(lkcC(at(sd * 0.03, 0.08, 0.1), at(sd * 0.2, 0.4, 0.3), 0.006 * s, 0.003 * s, 0xA82A1A, "head", { k: 0.004 * s })); });
lkcEye(e, at(0.035, 0.09, 0.09), 0.012 * s, 0x0A0A0A, "r");
return o;
}, function (I) { var H = I.H; return [lkcE([I.sX + 0.03 * H, I.sY - 0.38 * H, 0.06 * H], [0.05 * H, 0.09 * H, 0.04 * H], 0xC83A2A, "L_hand", { k: 0.015 * H }), lkcE([-I.sX - 0.03 * H, I.sY - 0.38 * H, 0.06 * H], [0.05 * H, 0.09 * H, 0.04 * H], 0xC83A2A, "R_hand", { k: 0.015 * H })]; });
});
F("humpty", function () {
var EGG = 0xF0E6CC, p = lkcSoft({ h: 1.7, b: 0.8, legs: 0.3, hs: 0.4, col: EGG, col2: EGG, skin: EGG, hand: 0xF4F0E8, legCol: 0x5A6A8A, foot: 0x1A1410, footL: 0.16, limb: 0.7 }, function (at, s, e) { return []; }, function (I) {
var H = I.H, y0 = I.hipY + 0.27 * H, o = [], B = "spine";
o.push(lkcE([0, y0, 0], [0.3 * H, 0.4 * H, 0.28 * H], EGG, B, { k: 0.04 * H }));
o.push(lkcE([0, y0 + 0.07 * H, 0.275 * H], [0.025 * H, 0.03 * H, 0.03 * H], 0xE8C8A8, B, { k: 0.01 * H }));
o.push(lkcC([-0.15 * H, y0 - 0.03 * H, 0.235 * H], [0.15 * H, y0 - 0.03 * H, 0.235 * H], 0.012 * H, 0.012 * H, 0x7A2A22, B, { k: 0.006 * H }));
o.push(lkcE([0, y0 - 0.05 * H, 0.255 * H], [0.13 * H, 0.022 * H, 0.02 * H], 0x8A3A2A, B, { k: 0.008 * H }));
[-1, 1].forEach(function (sd) {
o.push(lkcC([sd * 0.06 * H, y0 + 0.17 * H, 0.25 * H], [sd * 0.15 * H, y0 + 0.16 * H, 0.22 * H], 0.01 * H, 0.008 * H, 0x6A5A3A, B, { k: 0.004 * H }), lkcE([sd * 0.13 * H, y0 + 0.02 * H, 0.22 * H], [0.04 * H, 0.03 * H, 0.02 * H], 0xF0C8B0, B, { k: 0.01 * H }), lkcE([sd * 0.29 * H, y0 + 0.03 * H, 0.0], [0.02 * H, 0.045 * H, 0.03 * H], EGG, B, { k: 0.008 * H }));
});
o.push(lkcE([0, y0 - 0.15 * H, 0.0], [0.29 * H, 0.04 * H, 0.27 * H], 0xE07A2A, B, { k: 0.01 * H }));
o.push(lkcE([0, y0 - 0.15 * H, 0.27 * H], [0.06 * H, 0.035 * H, 0.03 * H], 0x2A4A9A, B, { k: 0.01 * H }), lkcE([-0.055 * H, y0 - 0.15 * H, 0.265 * H], [0.04 * H, 0.03 * H, 0.02 * H], 0xE07A2A, B, { k: 0.01 * H }), lkcE([0.055 * H, y0 - 0.15 * H, 0.265 * H], [0.04 * H, 0.03 * H, 0.02 * H], 0xE07A2A, B, { k: 0.01 * H }));
o.push(lkcE([0, I.hipY + 0.02 * H, 0], [0.2 * H, 0.09 * H, 0.18 * H], 0x5A6A8A, "hips", { k: 0.02 * H }));
return o;
});
lkcEye(p.eyes, [0.075 * 1.7, 0.3 * 1.7 + 0.27 * 1.7 + 0.12 * 1.7, 0.25 * 1.7], 0.024 * 1.7, 0x3A2A1A, "r", { bone: "spine" });
return p;
});
F("ewe", function () {
var W = 0xE8E2D2, p = lkcSoft({ h: 1.35, b: 1.15, legs: 0.36, hs: 1.35, gut: 0.8, col: 0x6A3A5A, col2: 0xE8E0D0, skin: W, hand: 0x3A3230, legCol: 0x3A3230, foot: 0x1A1612, footL: 0.1, hooves: 1, limb: 0.8 }, function (at, s, e) { return lkcSheepHead(at, s, e, W, 1); }, function (I) {
var H = I.H, o = [];
o.push(lkcE([0, I.sY - 0.05 * H, -0.01 * H], [0.17 * H, 0.08 * H, 0.14 * H], 0x8A5A3A, "chest", { k: 0.02 * H }), lkcE([0, I.sY - 0.12 * H, 0.09 * H], [0.09 * H, 0.08 * H, 0.03 * H], 0x8A5A3A, "chest", { k: 0.015 * H }));
o.push(lkcE([0, I.hipY + 0.05 * H, 0.1 * H], [0.12 * H, 0.14 * H, 0.03 * H], 0xF0ECE0, "hips", { k: 0.01 * H }));
return o;
});
p.extras = function (I) { lkcStick(I, 0.32); };
return p;
});
F("goat", function () {
return lkcSoft({ h: 1.4, b: 0.95, legs: 0.4, hs: 1.3, col: 0x3A3A4A, col2: 0xE8E0D0, skin: 0xD8D0C0, hand: 0x2A2420, legCol: 0x4A4A5A, foot: 0x1A1612, hooves: 1, footL: 0.1, limb: 0.8 }, function (at, s, e) { return lkcGoatHead(at, s, e, 0xD8D0C0); }, function (I) { var H = I.H; return [lkcC([-0.045 * H, I.sY + 0.005 * H, 0.035 * H], [0.045 * H, I.sY + 0.005 * H, 0.035 * H], 0.02 * H, 0.02 * H, 0xF8F6F0, "chest", { k: 0.008 * H })]; });
});
F("beetle", function () {
var B = 0x2A3A2A;
return lkcSoft({ h: 0.9, b: 1.4, legs: 0.3, hs: 1.1, gut: 0.8, col: B, col2: 0x4A5A3A, skin: B, hand: 0x1A1A14, legCol: 0x1A1A14, foot: 0x1A1A14, footL: 0.08, limb: 0.55, surf: "chitin" }, function (at, s, e) {
var o = [lkcE(at(0, 0.05, 0.04), [0.07 * s, 0.05 * s, 0.07 * s], B, "head", { g: 0.7, k: 0.01 * s })];
[-1, 1].forEach(function (sd) { o.push(lkcC(at(sd * 0.03, 0.08, 0.09), at(sd * 0.12, 0.2, 0.18), 0.006 * s, 0.004 * s, 0x1A1A14, "head", { k: 0.003 * s })); });
lkcEye(e, at(0.045, 0.07, 0.08), 0.014 * s, 0x0A0A0A, "r");
return o;
}, function (I) { var H = I.H, o = []; [-1, 1].forEach(function (sd) { o.push(lkcE([sd * 0.07 * H, I.hipY + 0.2 * H, -0.08 * H], [0.09 * H, 0.2 * H, 0.07 * H], 0x3A5A3A, "spine", { g: 0.75, rot: [0.2, 0, sd * 0.08], k: 0.02 * H })); }); return o; });
});
F("gnat", function () {
var p = lkcSoft({ h: 0.5, b: 0.6, legs: 0.42, bird: 1, footL: 0.18, hs: 1.2, col: 0x5A5A4A, col2: 0x8A8A6A, legCol: 0x3A3A2A, foot: 0x3A3A2A, wingCol: 0xC8D4DA, tipCol: 0xB8C8D0, tailCol: 0x6A6A52, surf: "chitin", stride: 0.3 }, function (at, s, e) {
var o = [lkcE(at(0, 0.05, 0.02), [0.06 * s, 0.06 * s, 0.065 * s], 0x4A4A3A, "head"), lkcC(at(0, 0.03, 0.07), at(0, -0.04, 0.22), 0.008 * s, 0.003 * s, 0x2A2A1A, "head", { k: 0.003 * s })];
[-1, 1].forEach(function (sd) { o.push(lkcC(at(sd * 0.02, 0.1, 0.05), at(sd * 0.08, 0.22, 0.12), 0.005 * s, 0.002 * s, 0x2A2A1A, "head")); });
lkcEye(e, at(0.035, 0.07, 0.05), 0.022 * s, 0x5A2A1A, "r");
return o;
});
return p;
});
F("fawn", function () {
var p = crxQuad({ L: 0.62, H: 0.66, G: 0.2, W: 0.8, legR: 0.026, head: "horse", hs: 0.62, col: 0xB07A44, belly: 0xF0E4D0, back: 0x9A6838, muzzle: 0x3A2A22, foot: "hoof", tail: { l: 0.1, r: 0.035, up: -1.0, col: 0xF4EEE6 }, neck: { l: 0.34, up: 1.0 }, neckR0: 0.5, neckR1: 0.42, stride: 1.4, runAt: 3.6,
more: function (E, yb, L, G) {
var o = [];
for (var i = 0; i < 16; i++) {
var sd = i % 2 ? 1 : -1;
o.push({ t: "e", c: [sd * G * 0.55, yb + G * (0.1 + ((i * 0.37) % 0.5)), -L * 0.45 + ((i * 0.29) % 1) * L * 0.9], r: [0.01, 0.018, 0.018], bone: i % 3 ? "chest" : "hips", col: 0xF4ECDC });
}
[-1, 1].forEach(function (sd) { o.push({ t: "e", c: [E[0] + sd * 0.07, E[1] + 0.1, E[2] - 0.04], r: [0.025, 0.06, 0.015], bone: "head", col: 0xB07A44, rot: [0, 0, sd * -0.5] }); });
return o;
} });
return p;
});
var horse = function (col, back, mane, white) {
var L = 1.05, G = 0.34, W = 0.78, lr = 0.05, fx = G * 0.58 * W, bx = G * 0.55 * W;
return crxQuad({ L: L, H: 1.0, G: G, W: W, legR: lr, head: "horse", hs: 1.2, col: col, back: back, muzzle: 0x3A2A22, mane: mane, foot: "hoof",
tail: { l: 0.8, r: 0.07, up: -1.3, col: mane }, neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0,
more: function (E, yb) {
var o = [], s = yb + 0.34 * 0.25;
o.push({ t: "e", c: [0, s + 0.06, 0.0], r: [0.24, 0.05, 0.3], bone: "chest", col: white ? 0xE8E8F0 : 0xC82A2A }, { t: "e", c: [0, s + 0.11, -0.02], r: [0.15, 0.05, 0.2], bone: "chest", col: 0x5A3A22 });
if (white) {
[["L_fl", fx, L * 0.53], ["R_fl", -fx, L * 0.53], ["L_bl", bx, -L * 0.5], ["R_bl", -bx, -L * 0.5]].forEach(function (q) { o.push({ t: "e", c: [q[1], 0.2, q[2]], r: [lr * 1.6, 0.025, lr * 1.6], bone: q[0], col: 0xC8CCD4, g: 0.85, m: 0.8 }); o.push({ t: "e", c: [q[1], 0.28, q[2]], r: [lr * 1.5, 0.02, lr * 1.5], bone: q[0], col: 0xC8CCD4, g: 0.85 }); });
o.push({ t: "e", c: [0.3, s, -0.32], r: [0.1, 0.12, 0.1], bone: "hips", col: 0xC8A048 }, { t: "e", c: [0.3, s + 0.1, -0.32], r: [0.07, 0.05, 0.07], bone: "hips", col: 0xB89040 });
o.push({ t: "e", c: [-0.3, s - 0.02, -0.3], r: [0.08, 0.06, 0.12], bone: "hips", col: 0x8A6A4A });
o.push({ t: "c", a: [-0.28, s + 0.05, 0.12], b: [-0.34, s - 0.28, 0.2], r0: 0.03, r1: 0.03, bone: "chest", col: 0x3A3A3A, m: 0.6 }, { t: "c", a: [-0.25, s + 0.05, 0.15], b: [-0.3, s - 0.28, 0.24], r0: 0.015, r1: 0.015, bone: "chest", col: 0x5A5A5A, m: 0.6 });
o.push({ t: "e", c: [0.3, s - 0.04, 0.14], r: [0.13, 0.03, 0.13], bone: "chest", col: 0xD8D8DC, g: 0.8 });
}
return o;
} });
};
F("wkhorse", function () { return horse(0xE8E4DC, 0xF4F0EA, 0xC8C0B0, 1); });
F("rkhorse", function () { return horse(0x4A2A1A, 0x3A2014, 0x1A1210, 0); });
F("lion", function () { return CRX_PLANS.lion(); });
F("unicorn", function () { return CRX_PLANS.unicorn(); });
var kit = function (col, belly, s, eyeCol) { return crxQuad({ L: 0.62 * s, H: 0.42 * s, G: 0.21 * s, W: 1.2, legR: 0.045 * s, head: "cat", hs: 1.3 * s * (s < 0.6 ? 1.25 : 1), col: col, belly: belly, muzzle: belly, tail: { l: 0.6 * s, r: 0.05 * s, up: 0.4 }, neck: { l: 0.16 * s, up: 0.7 }, eyeCol: eyeCol }); };
F("kitty", function () { return kit(0x141416, 0x2A2A2E, 0.42, 0x9AB848); });
F("snowdrop", function () { return kit(0xF6F4F0, 0xFFFFFF, 0.42, 0x5A8AC8); });
F("dinah", function () { var p = crxQuad({ L: 0.62 * 0.62, H: 0.42 * 0.62, G: 0.21 * 0.62, W: 1.3, legR: 0.045 * 0.62, head: "cat", hs: 1.3 * 0.62, col: 0x7A6E64, belly: 0xE8E0D0, muzzle: 0xF4ECDC, stripes: 0x3A322A, tail: { l: 0.6 * 0.62, r: 0.05 * 0.62, up: 0.4 }, neck: { l: 0.16 * 0.62, up: 0.7 }, eyeCol: 0xC8B030 }); return p; });
F("crow", function () { return bird(2.8, { col: 0x101014, col2: 0x18181E, beak: 0x141414, legCol: 0x141414, foot: 0x141414, eye: 0x3A2A1A, wingCol: 0x0A0A0E, tipCol: 0x08080A, tailCol: 0x0A0A0E, b: 1.1, hs: 1.4 }, "hook"); });
F("frog", function () { return lkcSoft({ h: 1.3, b: 1.1, legs: 0.4, hs: 1.4, col: 0xE8C830, col2: 0xF0E0A0, skin: 0x7A9A5A, hand: 0x7A9A5A, legCol: 0xE8C830, foot: 0x3A2A1A, footL: 0.2, cuff: 0xF0E0A0, surf: "hide", limb: 0.75 }, function (at, s, e) { return lkcFrogHead(at, s, e, 0x7A9A5A); }); });
F("walrus", function () {
return lkcSoft({ h: 1.6, b: 1.6, legs: 0.22, hs: 1.4, gut: 1.2, col: 0x8A6A5A, col2: 0x9A7A6A, skin: 0x8A6A5A, hand: 0x7A5A4A, legCol: 0x7A5A4A, foot: 0x6A4A3A, footL: 0.22, surf: "hide", limb: 0.9 }, function (at, s, e) {
var o = [lkcE(at(0, 0.05, 0.04), [0.1 * s, 0.09 * s, 0.1 * s], 0x8A6A5A, "head"), lkcE(at(0, 0.0, 0.12), [0.08 * s, 0.05 * s, 0.05 * s], 0x9A7A6A, "head", { k: 0.02 * s })];
[-1, 1].forEach(function (sd) { o.push(lkcC(at(sd * 0.035, -0.02, 0.14), at(sd * 0.04, -0.2, 0.15), 0.012 * s, 0.006 * s, 0xF4ECD8, "head", { g: 0.5, k: 0.004 * s })); });
lkcEye(e, at(0.05, 0.08, 0.08), 0.012 * s, 0x1A1410, "r");
return o;
});
});
},
function (I) {
var bone = "chest", w = 0.3, b = I.bones[bone];
if (!b)
return;
var o = I.at[bone];
var t = lkwCanvas("tabard", 128, 192, function (c, W, H) { c.fillStyle = "#F4F0E8"; c.fillRect(0, 0, W, H); c.fillStyle = "#C82A2A"; [[W / 2, H * 0.3], [W * 0.28, H * 0.62], [W * 0.72, H * 0.62]].forEach(function (p) { c.beginPath(); c.moveTo(p[0], p[1] + 18); c.bezierCurveTo(p[0] - 30, p[1] - 6, p[0] - 14, p[1] - 30, p[0], p[1] - 12); c.bezierCurveTo(p[0] + 14, p[1] - 30, p[0] + 30, p[1] - 6, p[0], p[1] + 18); c.fill(); }); c.strokeStyle = "#C8A040"; c.lineWidth = 6; c.strokeRect(3, 3, W - 6, H - 6); });
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, w * 1.4), new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
m.position.set(-o[0], -0.06, 0.1 - o[2]);
b.add(m);
},
function (I) {
var b = I.bones.R_hand || I.bones.L_hand;
if (!b)
return;
var g = new THREE.Group(), br = new THREE.MeshStandardMaterial({ color: 0xE8C048, metalness: 0.9, roughness: 0.3 });
var tb = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.4, 6), br);
tb.rotation.x = Math.PI / 2;
tb.position.z = 0.2;
g.add(tb);
var bell = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 12, 1, true), br);
bell.material.side = THREE.DoubleSide;
bell.rotation.x = -Math.PI / 2;
bell.position.z = 0.42;
g.add(bell);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.12), new THREE.MeshLambertMaterial({ color: 0xC82A2A, side: THREE.DoubleSide }));
fl.position.set(0, -0.07, 0.22);
g.add(fl);
b.add(g);
},
function (plan) {
var parts = [], c = new THREE.Color(), lite = lkwLite();
plan.prims.forEach(function (P) {
if (P.cut)
return;
var g;
if (P.t === "e") {
g = new THREE.SphereGeometry(1, lite ? 8 : 12, lite ? 6 : 9);
g.scale(P.r[0], P.r[1], P.r[2]);
if (P.rot)
g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(P.rot[0], P.rot[1], P.rot[2])));
g.translate(P.c[0], P.c[1], P.c[2]);
}
else if (P.t === "c") {
var a = new THREE.Vector3(P.a[0], P.a[1], P.a[2]), b = new THREE.Vector3(P.b[0], P.b[1], P.b[2]), L = a.distanceTo(b);
if (L < 1e-4)
return;
g = new THREE.CylinderGeometry(P.r1, P.r0, L, lite ? 6 : 9, 1, false);
var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
var m = a.clone().add(b).multiplyScalar(0.5);
g.translate(m.x, m.y, m.z);
var s0 = new THREE.SphereGeometry(P.r0, lite ? 6 : 8, lite ? 4 : 6);
s0.translate(a.x, a.y, a.z);
var s1 = new THREE.SphereGeometry(P.r1, lite ? 6 : 8, lite ? 4 : 6);
s1.translate(b.x, b.y, b.z);
[s0, s1].forEach(function (x) { x = x.toNonIndexed(); var n = x.attributes.position.count, cl = new Float32Array(n * 3); c.set(P.col != null ? P.col : plan.col || 0xFFFFFF); for (var i = 0; i < n; i++) {
cl[i * 3] = c.r;
cl[i * 3 + 1] = c.g;
cl[i * 3 + 2] = c.b;
} x.setAttribute("color", new THREE.BufferAttribute(cl, 3)); x.deleteAttribute("uv"); parts.push(x); });
}
if (!g)
return;
g = g.toNonIndexed();
var n = g.attributes.position.count, cl = new Float32Array(n * 3);
c.set(P.col != null ? P.col : plan.col || 0xFFFFFF);
for (var i = 0; i < n; i++) {
cl[i * 3] = c.r;
cl[i * 3 + 1] = c.g;
cl[i * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(cl, 3));
if (g.attributes.uv)
g.deleteAttribute("uv");
parts.push(g);
});
return parts.length ? lkwMergeC(parts) : null;
},
function (list) {
var n = 0;
list.forEach(function (g) { n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3), o = 0;
list.forEach(function (g) { var P = g.attributes.position, N = g.attributes.normal, C = g.attributes.color, c = P.count; pos.set(P.array.subarray(0, c * 3), o * 3); if (N)
nor.set(N.array.subarray(0, c * 3), o * 3); if (C)
col.set(C.array.subarray(0, c * 3), o * 3);
else
col.fill(1, o * 3, (o + c) * 3); o += c; g.dispose(); });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("color", new THREE.BufferAttribute(col, 3));
G.computeBoundingSphere();
return G;
},
function (key) {
var plan = typeof crxPlan === "function" ? crxPlan(key) : null;
if (!plan)
return new THREE.Group();
var G = LKW_GEO["si_" + key] || (LKW_GEO["si_" + key] = (function () { var g = lkwPartsGeo(plan); if (g)
g.userData.shared = 1; return g; })());
var grp = new THREE.Group();
if (!G)
return grp;
var m = new THREE.Mesh(G, lkwM("siMat", function () { return new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0 }); }));
m.castShadow = !lkwLite();
grp.add(m);
(plan.eyes || []).forEach(function (E) { [1, -1].forEach(function (sd) { if (sd < 0 && E.one)
return; var e = new THREE.Mesh(lkwGeo("siEye", function () { return new THREE.SphereGeometry(1, 10, 8); }), lkwShine(0x0E0A08, 0.1, 0.2)); e.scale.setScalar(E.r); e.position.set(E.at[0] * sd, E.at[1], E.at[2] + E.r * 0.35); grp.add(e); }); });
return grp;
},
function (suit, n) {
return lkwCanvas("card" + suit + n, 256, 360, function (c, W, H) {
var S = LKW_SUITS[suit] || LKW_SUITS.spades;
c.fillStyle = "#FAF8F2";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#C8C0B0";
c.lineWidth = 6;
c.strokeRect(3, 3, W - 6, H - 6);
c.fillStyle = S[1];
var lab = n === 1 ? "A" : n === 11 ? "J" : n === 12 ? "Q" : n === 13 ? "K" : String(n);
c.font = "bold 40px Georgia";
c.textAlign = "left";
c.fillText(lab, 14, 46);
c.font = "34px Georgia";
c.fillText(S[0], 16, 82);
c.save();
c.translate(W, H);
c.rotate(Math.PI);
c.font = "bold 40px Georgia";
c.fillText(lab, 14, 46);
c.font = "34px Georgia";
c.fillText(S[0], 16, 82);
c.restore();
var L = { 1: [[0.5, 0.5]], 2: [[0.5, 0.22], [0.5, 0.78]], 3: [[0.5, 0.22], [0.5, 0.5], [0.5, 0.78]], 4: [[0.3, 0.22], [0.7, 0.22], [0.3, 0.78], [0.7, 0.78]], 5: [[0.3, 0.22], [0.7, 0.22], [0.5, 0.5], [0.3, 0.78], [0.7, 0.78]], 6: [[0.3, 0.22], [0.7, 0.22], [0.3, 0.5], [0.7, 0.5], [0.3, 0.78], [0.7, 0.78]],
7: [[0.3, 0.22], [0.7, 0.22], [0.5, 0.36], [0.3, 0.5], [0.7, 0.5], [0.3, 0.78], [0.7, 0.78]], 8: [[0.3, 0.22], [0.7, 0.22], [0.5, 0.36], [0.3, 0.5], [0.7, 0.5], [0.5, 0.64], [0.3, 0.78], [0.7, 0.78]], 9: [[0.3, 0.2], [0.7, 0.2], [0.3, 0.4], [0.7, 0.4], [0.5, 0.5], [0.3, 0.6], [0.7, 0.6], [0.3, 0.8], [0.7, 0.8]], 10: [[0.3, 0.2], [0.7, 0.2], [0.5, 0.3], [0.3, 0.4], [0.7, 0.4], [0.3, 0.6], [0.7, 0.6], [0.5, 0.7], [0.3, 0.8], [0.7, 0.8]] }[Math.min(10, n)] || [[0.5, 0.5]];
c.textAlign = "center";
c.textBaseline = "middle";
c.font = (n === 1 ? 140 : 64) + "px Georgia";
L.forEach(function (p) { c.fillText(S[0], p[0] * W, p[1] * H); });
});
},
function () { return lkwCanvas("cardback", 128, 180, function (c, W, H) { c.fillStyle = "#2A3A8A"; c.fillRect(0, 0, W, H); c.strokeStyle = "#E8E0F0"; c.lineWidth = 2; for (var i = -H; i < W + H; i += 10) {
c.beginPath();
c.moveTo(i, 0);
c.lineTo(i + H, H);
c.stroke();
c.beginPath();
c.moveTo(i + H, 0);
c.lineTo(i, H);
c.stroke();
} c.strokeStyle = "#FAF8F2"; c.lineWidth = 8; c.strokeRect(4, 4, W - 8, H - 8); }); },
function (kind, seed) {
var k = kind.split(":"), suit = k[1] || "spades", n = +(k[2] || 5), g = new THREE.Group(), R = wRand(String(seed || kind).length * 31 + n), lite = lkwLite();
var W = 0.62, H = 0.86, body = new THREE.Group();
body.position.y = 0.62;
g.add(body);
var face = new THREE.Mesh(lkwGeo("cardPl", function () { return new THREE.PlaneGeometry(W, H); }), lkwM("cardF" + suit + n, function () { return new THREE.MeshLambertMaterial({ map: lkwCardFace(suit, n) }); }));
face.position.set(0, H / 2, 0.021);
body.add(face);
var back = new THREE.Mesh(lkwGeo("cardPl", function () { return new THREE.PlaneGeometry(W, H); }), lkwM("cardB", function () { return new THREE.MeshLambertMaterial({ map: lkwCardBack() }); }));
back.position.set(0, H / 2, -0.021);
back.rotation.y = Math.PI;
body.add(back);
lkwBox(body, W, H, 0.036, lkwLam(0xF0ECE2), 0, 0, 0);
var limb = lkwLam(0x1A1A1E), skin = lkwLam([0xF0D0B8, 0xE8C0A0, 0xD8A888][Math.floor(R() * 3)]);
var leg = function (x) { var p = new THREE.Group(); p.position.set(x, 0.62, 0); g.add(p); var l = new THREE.Mesh(lkwGeo("cardLeg", function () { var c = new THREE.CylinderGeometry(0.025, 0.022, 0.6, 6); c.translate(0, -0.3, 0); return c; }), limb); p.add(l); var f = new THREE.Mesh(lkwGeo("cardFoot", function () { var b = new THREE.BoxGeometry(0.08, 0.04, 0.15); b.translate(0, -0.6, 0.04); return b; }), limb); p.add(f); return p; };
var arm = function (x) { var p = new THREE.Group(); p.position.set(x, 0.62 + H * 0.82, 0); g.add(p); var a = new THREE.Mesh(lkwGeo("cardArm", function () { var c = new THREE.CylinderGeometry(0.022, 0.02, 0.5, 6); c.translate(0, -0.25, 0); return c; }), limb); p.add(a); var h = new THREE.Mesh(lkwGeo("cardHand", function () { var s = new THREE.SphereGeometry(0.04, 8, 6); s.translate(0, -0.52, 0); return s; }), skin); p.add(h); p.rotation.z = x > 0 ? 0.25 : -0.25; return p; };
var Ll = leg(-W * 0.32), Lr = leg(W * 0.32), Al = arm(-W / 2 - 0.02), Ar = arm(W / 2 + 0.02);
var hd = new THREE.Group();
hd.position.y = 0.62 + H + 0.02;
g.add(hd);
var neck = new THREE.Mesh(lkwGeo("cardNeck", function () { return new THREE.CylinderGeometry(0.035, 0.04, 0.06, 8); }), skin);
neck.position.y = 0.03;
hd.add(neck);
var head = new THREE.Mesh(lkwGeo("cardHead", function () { var s = new THREE.SphereGeometry(0.11, 14, 10); s.scale(1, 1.12, 1); return s; }), skin);
head.position.y = 0.15;
hd.add(head);
[-1, 1].forEach(function (sd) { var e = new THREE.Mesh(lkwGeo("cardEye", function () { return new THREE.SphereGeometry(0.014, 6, 5); }), lkwLam(0x141414)); e.position.set(sd * 0.038, 0.17, 0.098); hd.add(e); });
var nose = new THREE.Mesh(lkwGeo("cardNose", function () { return new THREE.SphereGeometry(0.018, 6, 5); }), skin);
nose.position.set(0, 0.14, 0.11);
hd.add(nose);
var hairC = [0x2A1E14, 0x5A3A1E, 0x8A6A3A, 0x141414][Math.floor(R() * 4)], hair = new THREE.Mesh(lkwGeo("cardHair", function () { var s = new THREE.SphereGeometry(0.118, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55); s.scale(1, 1.1, 1.05); return s; }), lkwLam(hairC));
hair.position.set(0, 0.17, -0.01);
hd.add(hair);
if (suit === "clubs") {
var sp = new THREE.Mesh(lkwGeo("cardPike", function () { var c = new THREE.CylinderGeometry(0.012, 0.012, 1.8, 5); c.translate(0, 0.4, 0); return c; }), lkwLam(0x5A3A1E));
sp.position.set(0, -0.5, 0.05);
Ar.add(sp);
}
g.userData.card = { L: [Ll, Lr], A: [Al, Ar], ph: R() * 6 };
g.userData.cardMan = 1;
return g;
},
function (kind, seed) {
var g = new THREE.Group();
g.userData.live = 1;
g.userData.keep = 1;
if (/^card:/.test(kind)) {
g.add(lkwCardMan(kind, seed));
g.userData.cardIn = g.children[0];
return g;
}
try {
lkwCrxKinds();
}
catch (e) { }
var key = LKW_CRX[kind];
if (!key || typeof crxPlan !== "function" || !crxPlan(key))
return g;
var useCrx = typeof crxBuild === "function" && typeof CRX !== "undefined" && !lkwLite();
if (useCrx && CRX.geo[key]) {
try {
var c = crxBuild(key);
if (c) {
g.add(c);
return g;
}
}
catch (e) { }
}
var stand = lkwStandInC(key);
g.add(stand);
if (useCrx) {
try {
crxWarm([key]);
}
catch (e) { }
LKW.ticks.push(function () { if (!g.parent || g.userData.done || !CRX.geo[key])
return; g.userData.done = 1; try {
var c = crxBuild(key);
if (c) {
g.remove(stand);
g.add(c);
}
}
catch (e) { } });
}
return g;
},
function () { return lkwCanvas("lkxHalo", 128, 128, function (c, W, H) { var g = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.18, "rgba(255,240,210,.55)"); g.addColorStop(0.5, "rgba(255,210,150,.16)"); g.addColorStop(1, "rgba(255,200,140,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); }); },
function (P, L, size) {
if (!L || !L.pos.length)
return null;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(L.pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(L.col, 3));
var m = new THREE.PointsMaterial({ size: size || 0.7, map: lkxHaloTex(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
m.userData.noPhoto = 1;
var p = new THREE.Points(g, m);
p.frustumCulled = false;
p.raycast = function () { };
P.add(p);
return p;
},
function (P, list, L, o) {
o = o || {};
if (!list.length)
return;
var wax = lkwLam(o.wax || 0xF2E6CE), fl = lkwGlowM(o.flame || 0xFFC860);
lkwInst(P, lkwGeo("lkxWax", function () { var g = new THREE.CylinderGeometry(0.035, 0.04, 1, 8); g.translate(0, 0.5, 0); return g; }), wax, list.map(function (c) { return { x: c.x, y: c.y, z: c.z, sx: c.s || 1, sz: c.s || 1, sy: c.h || 0.18 }; }));
lkwInst(P, lkwGeo("lkxFlame", function () { var g = new THREE.SphereGeometry(0.03, 6, 5); g.scale(1, 2.2, 1); return g; }), fl, list.map(function (c) { return { x: c.x, y: c.y + (c.h || 0.18) + 0.05, z: c.z }; }));
list.forEach(function (c) { lkxGlow(L, c.x, c.y + (c.h || 0.18) + 0.06, c.z, o.halo || 0xFFB860, o.hs || 0.55); });
},
function (P, x, y, z, ry, L, cl) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var b = lkxBrass();
var bp = new THREE.Mesh(lkwGeo("lkxBP", function () { var s = new THREE.SphereGeometry(0.16, 10, 8); s.scale(1, 1.6, 0.25); return s; }), b);
bp.position.z = 0.03;
g.add(bp);
var arm = new THREE.Mesh(lkwGeo("lkxArm", function () { return new THREE.TorusGeometry(0.18, 0.018, 6, 16, Math.PI); }), b);
arm.rotation.set(0, Math.PI / 2, Math.PI / 2);
arm.position.set(0, -0.02, 0.2);
g.add(arm);
var cups = [];
[-0.16, 0.16].forEach(function (dx) { var cu = new THREE.Mesh(lkwGeo("lkxCup", function () { return new THREE.CylinderGeometry(0.06, 0.03, 0.05, 10); }), b); cu.position.set(dx, 0.12, 0.24); g.add(cu); cups.push(new THREE.Vector3(dx, 0.15, 0.24)); });
g.updateMatrixWorld(true);
var inv = new THREE.Matrix4();
P.updateMatrixWorld(true);
inv.copy(P.matrixWorld).invert();
if (cl)
cups.forEach(function (v) { var w = v.clone().applyMatrix4(g.matrixWorld).applyMatrix4(inv); cl.push({ x: w.x, y: w.y, z: w.z }); });
return g;
},
function (P, x, y, z, r, tiers, L, cl, ceil) {
var own = !cl;
if (own)
cl = [];
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var b = lkxBrass(), lite = lkwLite(), cry = lkwShine(0xF4F8FF, 0.05, 0.2);
if (ceil != null) {
var ch = new THREE.Mesh(lkwGeo("lkxChain", function () { return new THREE.CylinderGeometry(0.02, 0.02, 1, 5); }), b);
ch.scale.y = Math.max(0.1, ceil - y);
ch.position.y = (ceil - y) / 2;
g.add(ch);
}
var drops = [];
for (var t = 0; t < tiers; t++) {
var rr = r * (1 - t * 0.38), yy = -t * 0.55;
var ring = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.035, 6, Math.max(16, Math.round(rr * 20))), b);
ring.rotation.x = Math.PI / 2;
ring.position.y = yy;
g.add(ring);
var n = Math.max(6, Math.round(rr * (lite ? 5 : 8)));
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
cl.push({ x: x + Math.cos(a) * rr, y: y + yy + 0.02, z: z + Math.sin(a) * rr, h: 0.16 });
drops.push({ x: Math.cos(a + Math.PI / n) * rr, y: yy - 0.16, z: Math.sin(a + Math.PI / n) * rr });
if (!lite)
drops.push({ x: Math.cos(a + Math.PI / n) * rr * 0.92, y: yy - 0.34, z: Math.sin(a + Math.PI / n) * rr * 0.92, s: 0.7 });
}
for (i = 0; i < 4; i++) {
var a2 = i / 4 * Math.PI * 2, sp = new THREE.Mesh(lkwGeo("lkxSpoke", function () { return new THREE.CylinderGeometry(0.015, 0.015, 1, 4); }), b);
sp.scale.y = rr;
sp.rotation.z = Math.PI / 2;
sp.rotation.y = -a2;
sp.position.set(Math.cos(a2) * rr / 2, yy, Math.sin(a2) * rr / 2);
g.add(sp);
}
}
var bowl = new THREE.Mesh(lkwGeo("lkxBowl", function () { var s = new THREE.SphereGeometry(0.3, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); return s; }), b);
bowl.position.y = -(tiers - 1) * 0.55 - 0.1;
g.add(bowl);
var fin = new THREE.Mesh(lkwGeo("lkxFinial", function () { return new THREE.OctahedronGeometry(0.12, 0); }), cry);
fin.scale.y = 2;
fin.position.y = bowl.position.y - 0.45;
g.add(fin);
lkwInst(g, lkwGeo("lkxDrop", function () { var o = new THREE.OctahedronGeometry(0.05, 0); o.scale(1, 2, 1); return o; }), cry, drops);
lkxGlow(L, x, y - 0.4, z, 0xFFD8A0, r * 2.6);
if (own)
lkxCandles(P, cl, null, {});
return g;
},
function (w, h, folds, depth) {
var k = "lkxDr" + w.toFixed(1) + "|" + h.toFixed(1) + "|" + folds + "|" + depth;
return lkwGeo(k, function () {
var g = new THREE.PlaneGeometry(w, h, folds * 6, 4), p = g.attributes.position, uv = g.attributes.uv;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i);
p.setZ(i, Math.sin((x / w + 0.5) * folds * Math.PI * 2) * depth * (0.75 + 0.25 * (0.5 - y / h)));
uv.setXY(i, (x + w / 2) / 1.2, (y + h / 2) / 1.2);
}
g.translate(0, -h / 2, 0);
g.computeVertexNormals();
return g;
});
},
function (P, x, y, z, w, h, ry, mat, o) {
o = o || {};
var m = new THREE.Mesh(lkxDrapeGeo(w, h, Math.max(2, Math.round(w * (o.fold || 1.6))), o.depth || 0.12), mat);
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
if (o.fringe) {
var f = new THREE.Mesh(lkwBoxG(w, 0.12, 0.06), lkxGilt());
f.position.set(0, -h - 0.04, 0.02);
m.add(f);
}
if (o.tie) {
var t = new THREE.Mesh(lkwBoxG(Math.min(0.5, w * 0.5), 0.07, 0.34), lkxGilt());
t.position.set(0, -h * 0.58, 0.05);
m.add(t);
}
return m;
},
function (P, x, y, z, w, drop, ry, mat) {
var g = new THREE.Mesh(new THREE.TorusGeometry(w / 2, 0.18, 8, 24, Math.PI), mat);
g.rotation.set(0, ry || 0, Math.PI);
g.scale.set(1, drop * 2 / w, 0.6);
g.position.set(x, y, z);
P.add(g);
var t = new THREE.Mesh(new THREE.TorusGeometry(w / 2, 0.03, 4, 24, Math.PI), lkxGilt());
t.rotation.copy(g.rotation);
t.scale.set(1, (drop + 0.16) * 2 / w, 0.6);
t.position.set(x, y, z);
P.add(t);
return g;
},
function (tint) {
var key = "lkxMirG" + (tint || "warm");
return lkwM(key, function () {
var t = lkwCanvas(key + "T", 128, 256, function (c, W, H) {
var warm = (tint || "warm") === "warm";
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, warm ? "#2A1410" : "#1A2434");
g.addColorStop(0.55, warm ? "#4A2418" : "#2A3A54");
g.addColorStop(1, warm ? "#1A0C08" : "#121A28");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
var R = wRand(key.length * 31);
for (var i = 0; i < 26; i++) {
var x = R() * W, y = H * 0.15 + R() * H * 0.6, r = 2 + R() * 9, gg = c.createRadialGradient(x, y, 0, x, y, r * 3);
gg.addColorStop(0, warm ? "rgba(255,220,150,.9)" : "rgba(220,236,255,.9)");
gg.addColorStop(1, "rgba(255,200,140,0)");
c.fillStyle = gg;
c.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
}
var sh = c.createLinearGradient(0, 0, W, H);
sh.addColorStop(0.3, "rgba(255,255,255,0)");
sh.addColorStop(0.45, "rgba(255,255,255,.18)");
sh.addColorStop(0.55, "rgba(255,255,255,0)");
c.fillStyle = sh;
c.fillRect(0, 0, W, H);
});
var m = new THREE.MeshStandardMaterial({ map: t, roughness: 0.08, metalness: 0.6, emissive: 0xFFFFFF, emissiveMap: t, emissiveIntensity: 0.35 });
m.userData.noPhoto = 1;
return m;
});
},
function (P, x, y, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var gi = lkxGilt();
var gl = new THREE.Mesh(lkwGeo(o.oval ? "lkxMirOv" : "lkxMirRe", function () { return o.oval ? new THREE.CircleGeometry(0.5, 32) : new THREE.PlaneGeometry(1, 1); }), lkxMirrorGlassM(o.tint));
gl.scale.set(w, h, 1);
gl.position.set(0, h / 2, 0.04);
g.add(gl);
if (o.oval) {
var fr = new THREE.Mesh(lkwGeo("lkxMirOvF", function () { return new THREE.TorusGeometry(0.5, 0.05, 8, 40); }), gi);
fr.scale.set(w, h, 1);
fr.position.set(0, h / 2, 0.05);
g.add(fr);
}
else {
[[0, h, w + 0.24, 0.16], [0, -0.04, w + 0.24, 0.14]].forEach(function (b) { lkwBox(g, b[2], b[3], 0.1, gi, b[0], b[1] - b[3] / 2, 0.04); });
[-1, 1].forEach(function (s) { lkwBox(g, 0.12, h, 0.1, gi, s * (w / 2 + 0.06), 0, 0.04); });
var cr = new THREE.Mesh(lkwGeo("lkxCrest", function () { return new THREE.TorusKnotGeometry(0.14, 0.035, 40, 6, 2, 3); }), gi);
cr.position.set(0, h + 0.22, 0.06);
cr.scale.set(1.4, 0.8, 0.4);
g.add(cr);
}
return g;
},
function (P, w, d, H, o) {
o = o || {};
var wood = o.wood || lkwS("b:oak", 0x3A1E10, 1.4), gi = o.trim || lkxGilt(), h0 = o.h0 || 1.2, step = o.step || 4, skip = o.skip || [];
function inGap(side, u) { return skip.some(function (s) { return s[0] === side && Math.abs(u - s[1]) < (s[2] || 1.2); }); }
[["n", -d / 2, 1], ["s", d / 2, -1]].forEach(function (S) {
for (var u = -w / 2 + 0.5; u < w / 2 - 0.4; u += 1) {
if (inGap(S[0], u + 0.5))
continue;
lkwBox(P, 1, h0, 0.08, wood, u + 0.5, 0, S[1] + S[2] * 0.04);
}
lkwBox(P, w, 0.08, 0.12, gi, 0, h0, S[1] + S[2] * 0.06);
lkwBox(P, w, 0.3, 0.24, gi, 0, H - 0.3, S[1] + S[2] * 0.12);
for (u = -w / 2 + step / 2; u < w / 2; u += step) {
if (inGap(S[0], u))
continue;
lkwBox(P, 0.36, H - h0 - 0.3, 0.16, gi, u, h0 + 0.08, S[1] + S[2] * 0.08);
}
});
[["w", -w / 2, 1], ["e", w / 2, -1]].forEach(function (S) {
for (var u = -d / 2 + 0.5; u < d / 2 - 0.4; u += 1) {
if (inGap(S[0], u + 0.5))
continue;
lkwBox(P, 0.08, h0, 1, wood, S[1] + S[2] * 0.04, 0, u + 0.5);
}
lkwBox(P, 0.12, 0.08, d, gi, S[1] + S[2] * 0.06, h0, 0);
lkwBox(P, 0.24, 0.3, d, gi, S[1] + S[2] * 0.12, H - 0.3, 0);
for (u = -d / 2 + step / 2; u < d / 2; u += step) {
if (inGap(S[0], u))
continue;
lkwBox(P, 0.16, H - h0 - 0.3, 0.36, gi, S[1] + S[2] * 0.08, h0 + 0.08, u);
}
});
},
function (P, x, y, z, len, r0, r1, col, op, tx, ty, tz) {
var q = Math.max(0.02, Math.min(1, r0 / r1)).toFixed(2);
var m = new THREE.Mesh(lkwGeo("lkxShaft" + q, function () { var g = new THREE.CylinderGeometry(+q, 1, 1, 24, 1, true); g.translate(0, -0.5, 0); return g; }), lkwM("lkxShaftM" + col + "|" + op, function () {
var t = lkwCanvas("lkxShaftT", 16, 128, function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); });
var mm = new THREE.MeshBasicMaterial({ color: col, map: t, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
mm.userData.noPhoto = 1;
return mm;
}));
m.scale.set(r1, len, r1);
m.position.set(x, y, z);
m.raycast = function () { };
P.add(m);
if (tx != null) {
var v = new THREE.Vector3(tx - x, ty - y, tz - z).normalize();
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), v);
}
return m;
},
function (P, x, y, z, r, col, op) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 32), lkwM("lkxPool" + col + "|" + op, function () { var mm = new THREE.MeshBasicMaterial({ color: col, map: lkxHaloTex(), transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, y, z);
P.add(m);
return m;
},
function (P, x, z, r, cloth, L, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var c = new THREE.Mesh(lkwGeo("lkxCloth" + r, function () { var pts = [new THREE.Vector2(0, 0.78), new THREE.Vector2(r, 0.78), new THREE.Vector2(r + 0.04, 0.74), new THREE.Vector2(r + 0.12, 0.4), new THREE.Vector2(r + 0.2, 0.02), new THREE.Vector2(r + 0.21, 0)]; var gg = new THREE.LatheGeometry(pts, 28); return gg; }), cloth);
g.add(c);
lkxLamp(g, 0, 0.78, 0, null);
lkxGlow(L, x, 0.98, z, 0xFFB050, 0.9);
if (o.wine !== false)
[[0.3, 0.2], [-0.28, -0.18]].forEach(function (p) { var w = new THREE.Mesh(lkwGeo("lkxGlass", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.04, 0), new THREE.Vector2(0.006, 0.01), new THREE.Vector2(0.006, 0.09), new THREE.Vector2(0.045, 0.13), new THREE.Vector2(0.05, 0.2)], 10); }), wqiIce(0x8A1A24, { op: 0.75 })); w.position.set(p[0], 0.78, p[1]); g.add(w); });
return g;
},
function (P, x, y, z, L, col) {
lkwCyl(P, 0.05, 0.05, 0.18, lkxBrass(), x, y, z, 8);
var sh = new THREE.Mesh(lkwGeo("lkxShade", function () { return new THREE.CylinderGeometry(0.07, 0.14, 0.14, 12, 1, true); }), lkwM("lkxShadeM" + (col || ""), function () { var m = new THREE.MeshBasicMaterial({ color: col || 0xFFB050, side: THREE.DoubleSide, transparent: true, opacity: 0.95 }); m.userData.noPhoto = 1; return m; }));
sh.position.set(x, y + 0.24, z);
P.add(sh);
if (L)
lkxGlow(L, x, y + 0.22, z, col || 0xFFB050, 1.0);
return sh;
},
function (P, cx, cy, cz, rx, ry, rz, n, seed, cols) {
var R = wRand(seed || 77);
(cols || [0xB8281A, 0xE0A030, 0xC8601A]).forEach(function (col, ci) {
var list = [];
for (var i = 0; i < Math.round(n / 3); i++)
list.push({ x: cx + (R() - 0.5) * rx * 2, y: cy + R() * ry, z: cz + (R() - 0.5) * rz * 2, rx: R() * 6, ry: R() * 6, rz: R() * 6, s: 0.7 + R() * 0.6 });
lkwInst(P, lkwGeo("lkxLeaf", function () { var s = new THREE.Shape(); s.moveTo(0, -0.08); s.quadraticCurveTo(0.07, 0, 0, 0.09); s.quadraticCurveTo(-0.07, 0, 0, -0.08); return new THREE.ShapeGeometry(s); }), lkwLam(col, { ds: 1, e: ci === 1 ? 0x3A2008 : 0x200804 }), list);
});
},
function (kind) {
return lkwGeo("lkxT_" + kind, function () {
var R = wRand(kind.length * 131 + 7), parts = [], lite = lkwLite();
var H0 = kind === "oak" ? 7 : kind === "birch" ? 9 : kind === "pine" ? 3 : 8, r0 = kind === "oak" ? 0.55 : kind === "birch" ? 0.2 : 0.42;
var tr = new THREE.CylinderGeometry(r0 * 0.55, r0, H0 + 2, 8, 4);
tr.translate(0, (H0 + 2) / 2, 0);
var p = tr.attributes.position;
for (var i = 0; i < p.count; i++) {
var y = p.getY(i) / (H0 + 2);
if (y < 0.1) {
var f = 1 + (0.1 - y) * 4;
p.setX(i, p.getX(i) * f);
p.setZ(i, p.getZ(i) * f);
}
p.setX(i, p.getX(i) + Math.sin(y * 3) * 0.25);
}
parts.push(tr.toNonIndexed());
var nb = kind === "pine" ? 0 : kind === "oak" ? 6 : 4;
for (var b = 0; b < nb; b++) {
var a = b / nb * Math.PI * 2 + R(), L = (kind === "oak" ? 5 : 3.4) + R() * 1.5, br = new THREE.CylinderGeometry(r0 * 0.18, r0 * 0.4, L, 5);
br.translate(0, L / 2, 0);
br.rotateZ(-(kind === "oak" ? 1.0 : 0.7) - R() * 0.3);
br.rotateY(a);
br.translate(0, H0 * (0.6 + R() * 0.3), 0);
parts.push(br.toNonIndexed());
}
return gwMerge(parts);
});
},
function (kind) {
return lkwGeo("lkxC_" + kind + (lkwLite() ? "L" : ""), function () {
var R = wRand(kind.length * 977 + 3), parts = [], lite = lkwLite();
var n = kind === "oak" ? (lite ? 24 : 96) : kind === "birch" ? (lite ? 14 : 54) : kind === "pine" ? (lite ? 12 : 40) : (lite ? 22 : 86), cx = kind === "oak" ? 5.4 : kind === "birch" ? 2.4 : kind === "pine" ? 2.6 : 3.8, cy = kind === "oak" ? 3.4 : kind === "birch" ? 4 : kind === "pine" ? 7 : 4.2, y0 = kind === "oak" ? 9.4 : kind === "birch" ? 11 : kind === "pine" ? 9 : 10.4;
for (var i = 0; i < n; i++) {
var u = R() * Math.PI * 2, v = Math.acos(2 * R() - 1), rr = 0.55 + R() * 0.45, x = Math.sin(v) * Math.cos(u) * cx * rr, y = Math.cos(v) * cy * rr, z = Math.sin(v) * Math.sin(u) * cx * rr;
if (kind === "pine") {
var t = (y / cy + 1) / 2;
x *= 1 - t;
z *= 1 - t;
}
var s = (kind === "oak" ? 2.7 : kind === "birch" ? 1.8 : 2.3) * (0.75 + R() * 0.5), c = lkwCards(2, s, s, -s / 2, 0);
c.rotateX((R() - 0.5) * 1.2);
c.rotateZ((R() - 0.5) * 1.2);
c.rotateY(R() * 3);
c.translate(x, y0 + y, z);
parts.push(c);
}
if (kind !== "pine") {
var ns = Math.round(n * 0.4);
for (i = 0; i < ns; i++) {
var a2 = R() * Math.PI * 2, rr2 = cx * (0.55 + R() * 0.5), yy = y0 - cy * (0.5 + R() * 0.55), s2 = (kind === "oak" ? 2.4 : kind === "birch" ? 1.6 : 2.1) * (0.75 + R() * 0.5), c2 = lkwCards(2, s2, s2, -s2 / 2, 0);
c2.rotateX((R() - 0.5) * 1.2);
c2.rotateZ((R() - 0.5) * 1.2);
c2.rotateY(R() * 3);
c2.translate(Math.cos(a2) * rr2, yy, Math.sin(a2) * rr2);
parts.push(c2);
}
}
var g = gwMerge(parts);
g.computeVertexNormals();
var nm = g.attributes.normal, ps = g.attributes.position;
for (i = 0; i < nm.count; i++) {
var vx = ps.getX(i), vy = ps.getY(i) - y0, vz = ps.getZ(i), l = Math.hypot(vx, vy, vz) || 1;
nm.setXYZ(i, vx / l, vy / l, vz / l);
}
return g;
});
},
function (P, kind, list, cols, o) {
o = o || {};
if (!list.length)
return;
var lite = lkwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
var bark = kind === "birch" ? lkwS("b:limestone", 0xE8E4DC, 1.2) : lkwMat("bark");
lkwInst(P, lkxTreeGeo(kind), bark, list, { shadow: !lite });
(cols || [0x3A6A2A]).forEach(function (col, k) { var sub = list.filter(function (t, i) { return i % cols.length === k; }); if (sub.length)
lkwInst(P, lkxCrownGeo(kind), lkxLeafM(col), sub, {}); });
if (!o.noSolid)
list.forEach(function (t) { lkwRound(t.x, t.z, 0.6 * (t.s || 1), (t.y || 0) - 1, (t.y || 0) + 6); });
},
function (kind) {
return lkwCanvas("lkxSG" + kind, 128, 320, function (c, W, H) {
var R = wRand(kind.length * 53 + 11), pal = kind === "frost" ? ["#9AC8F0", "#D8ECFF", "#5A8AC8", "#E8F4FF", "#7AA8E0"] : ["#C8301A", "#E8A030", "#7A1A3A", "#D86A1A", "#F0C860", "#5A2A6A", "#3A6A2A"];
c.fillStyle = pal[0];
c.fillRect(0, 0, W, H);
for (var i = 0; i < 70; i++) {
c.fillStyle = pal[Math.floor(R() * pal.length)];
c.beginPath();
var x = R() * W, y = R() * H;
c.moveTo(x, y);
for (var k = 0; k < 5; k++)
c.lineTo(x + (R() - 0.5) * 50, y + (R() - 0.5) * 50);
c.closePath();
c.fill();
}
c.strokeStyle = "#1A0E08";
c.lineWidth = 3;
for (i = 0; i < 40; i++) {
c.beginPath();
var x2 = R() * W, y2 = R() * H;
c.moveTo(x2, y2);
c.bezierCurveTo(x2 + (R() - 0.5) * 60, y2 + (R() - 0.5) * 60, x2 + (R() - 0.5) * 60, y2 + (R() - 0.5) * 60, x2 + (R() - 0.5) * 70, y2 + (R() - 0.5) * 70);
c.stroke();
}
c.lineWidth = 2.5;
for (i = 0; i < 9; i++) {
var lx = W * 0.2 + R() * W * 0.6, ly = H * 0.2 + R() * H * 0.6;
c.save();
c.translate(lx, ly);
c.rotate(R() * 6);
c.fillStyle = pal[(i + 1) % pal.length];
c.beginPath();
c.moveTo(0, -22);
c.quadraticCurveTo(18, 0, 0, 22);
c.quadraticCurveTo(-18, 0, 0, -22);
c.fill();
c.stroke();
c.beginPath();
c.moveTo(0, -22);
c.lineTo(0, 22);
c.stroke();
c.restore();
}
c.lineWidth = 7;
c.strokeRect(0, 0, W, H);
c.beginPath();
c.moveTo(W / 2, W / 2);
c.lineTo(W / 2, H);
c.stroke();
c.globalCompositeOperation = "destination-in";
c.beginPath();
c.moveTo(0, H);
c.lineTo(0, W / 2);
c.quadraticCurveTo(0, 0, W / 2, 0);
c.quadraticCurveTo(W, 0, W, W / 2);
c.lineTo(W, H);
c.closePath();
c.fill();
});
},
function (P, x, y, z, L, h) {
h = h || 2.8;
var ir = lkwShine(0x1A1A1A, 0.6, 0.6);
lkwCyl(P, 0.06, 0.09, h, ir, x, y, z, 8);
lkwBox(P, 0.34, 0.06, 0.34, ir, x, y + h, z);
var gl = new THREE.Mesh(lkwBoxG(0.26, 0.36, 0.26), lkwGlowM(0xFFC070, 0.92));
gl.position.set(x, y + h + 0.24, z);
P.add(gl);
var cap = new THREE.Mesh(lkwGeo("lanCap", function () { return new THREE.ConeGeometry(0.26, 0.22, 4); }), ir);
cap.rotation.y = Math.PI / 4;
cap.position.set(x, y + h + 0.53, z);
P.add(cap);
lkxGlow(L, x, y + h + 0.24, z, 0xFFB060, 2.2);
},
function () {
return lkwGeo("lkxWillow", function () {
var R = wRand(41), parts = [], lite = lkwLite();
var tr = new THREE.CylinderGeometry(0.45, 0.8, 6, 8, 3);
tr.translate(0, 3, 0);
tr.rotateZ(0.12);
parts.push(tr.toNonIndexed());
for (var b = 0; b < 5; b++) {
var a = b / 5 * 6.283 + R(), L = 4 + R() * 2, br = new THREE.CylinderGeometry(0.12, 0.28, L, 5);
br.translate(0, L / 2, 0);
br.rotateZ(-0.9 - R() * 0.3);
br.rotateY(a);
br.translate(0.6, 5.4, 0);
parts.push(br.toNonIndexed());
}
return gwMerge(parts);
});
},
function () {
return lkwGeo("lkxWillowF" + (lkwLite() ? "L" : ""), function () {
var R = wRand(43), parts = [], n = lkwLite() ? 26 : 64;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, r = 2.2 + R() * 4.4, top = 7.5 + R() * 2.2 - r * 0.25, len = 4 + R() * 4.5, p = new THREE.PlaneGeometry(0.9 + R() * 0.6, len);
p.translate(0, top - len / 2, 0);
p.rotateY(a + Math.PI / 2 + (R() - 0.5) * 0.6);
p.translate(Math.cos(a) * r, 0, Math.sin(a) * r);
parts.push(p);
}
return gwMerge(parts);
});
},
function () {
return lkwCanvas("lkxWillowT", 64, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
var R = wRand(47);
for (var s = 0; s < 7; s++) {
var x0 = 6 + R() * (W - 12);
c.strokeStyle = "rgba(90,110,50,0.9)";
c.lineWidth = 1;
c.beginPath();
c.moveTo(x0, 0);
c.quadraticCurveTo(x0 + (R() - 0.5) * 8, H * 0.5, x0 + (R() - 0.5) * 10, H - 4 - R() * 30);
c.stroke();
for (var y = 4; y < H - 10; y += 5) {
var g = 110 + R() * 60 | 0;
c.fillStyle = "rgba(" + (70 + R() * 40 | 0) + "," + g + "," + (40 + R() * 20 | 0) + ",0.95)";
c.save();
c.translate(x0 + (y / H) * (R() - 0.5) * 6, y);
c.rotate((R() - 0.5) * 0.9 + (R() < 0.5 ? 0.5 : -0.5));
c.beginPath();
c.ellipse(0, 4, 1.6, 6, 0, 0, 7);
c.fill();
c.restore();
}
}
});
},
function (P, list) {
if (!list.length)
return;
lkwInst(P, lkxWillowGeo(), lkwMat("bark"), list, { shadow: !lkwLite() });
lkwInst(P, lkxWillowFall(), lkwM("lkxWillowM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xC8D890, map: lkxWillowTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
list.forEach(function (t) { lkwRound(t.x, t.z, 0.7 * (t.s || 1), (t.y || 0) - 1, (t.y || 0) + 5); });
},
function (P, pts, hfn, o) {
o = o || {};
var list = [], fl = [], R = wRand(o.seed || 7), step = lkwLite() ? 2.6 : 1.5;
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.ceil(L / step);
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t + (R() - 0.5) * 0.6, z = a[1] + (b[1] - a[1]) * t + (R() - 0.5) * 0.6;
if (o.gap && o.gap(x, z))
continue;
var y = hfn(x, z);
list.push({ x: x, y: y, z: z, s: (o.s || 1.1) * (0.8 + R() * 0.4), sy: (o.s || 1.1) * (0.9 + R() * 0.5), ry: R() * 6 });
if (R() < 0.5)
fl.push({ x: x + (R() - 0.5), y: y + 1.2 + R() * 0.8, z: z + (R() - 0.5), s: 0.8 + R() * 0.5, ry: R() * 6 });
}
}
lkwPlant(P, "bush", list, { col: o.col || 0x3E6A2E, keepAll: 1 });
if (!o.bare)
lkwPlant(P, "flowers", fl, { col: o.flower || "#F4F2EA", keepAll: 1 });
for (i = 0; i < pts.length - 1; i++) {
var A = pts[i], B = pts[i + 1], cx = (A[0] + B[0]) / 2, cz = (A[1] + B[1]) / 2, LL = Math.hypot(B[0] - A[0], B[1] - A[1]);
if (!o.gap)
lkwSolid(cx, cz, LL, 2.2, hfn(cx, cz) - 1, hfn(cx, cz) + 3, Math.atan2(B[1] - A[1], B[0] - A[0]) * -1);
}
return list;
},
function (P, x0, z0, x1, z1, hfn, ok, seed, o) {
o = o || {};
var lite = lkwLite(), k = lite ? 0.35 : 1, d = o.dens || 1;
lkwPlant(P, "grass", lkwScatter(seed, Math.round(2600 * k * d), x0, z0, x1, z1, ok, hfn, 0.5, 1.0), { col: o.grass || 0xFFFFFF, keepAll: 1 });
lkwPlant(P, "flowers", lkwScatter(seed + 1, Math.round(900 * k * d), x0, z0, x1, z1, ok, hfn, 0.4, 0.7), { col: "#F8F6EE", keepAll: 1 });
lkwPlant(P, "flowers", lkwScatter(seed + 2, Math.round(700 * k * d), x0, z0, x1, z1, ok, hfn, 0.5, 0.8), { col: "#F4D020", keepAll: 1 });
lkwPlant(P, "flowers", lkwScatter(seed + 3, Math.round(300 * k * d), x0, z0, x1, z1, ok, hfn, 0.4, 0.6), { col: "#D88AB0", keepAll: 1 });
if (o.poppies !== false)
lkwPlant(P, "flowers", lkwScatter(seed + 4, Math.round(160 * k * d), x0, z0, x1, z1, ok, hfn, 0.6, 0.9), { col: "#D8281A", keepAll: 1 });
},
function (col, paint) {
return lkwCanvas("lkxRose" + col + (paint || ""), 128, 128, function (c, W, H) {
c.clearRect(0, 0, W, H);
var R = wRand(col.length * 11 + (paint ? 5 : 0));
for (var i = 0; i < 12; i++) {
var x = 10 + R() * 108, y = 10 + R() * 108, r = 7 + R() * 6, cc = paint && R() < 0.55 ? paint : col;
c.fillStyle = "#3A5A2A";
c.beginPath();
c.ellipse(x + r * 0.8, y + r * 0.6, r * 0.7, r * 0.35, 0.6, 0, 7);
c.fill();
for (var p = 0; p < 3; p++) {
c.fillStyle = cc;
c.globalAlpha = 1 - p * 0.2;
c.beginPath();
c.arc(x, y, r * (1 - p * 0.3), 0, 7);
c.fill();
c.globalAlpha = 1;
c.strokeStyle = "rgba(0,0,0,0.18)";
c.lineWidth = 1;
c.beginPath();
c.arc(x + (p - 1), y, r * (0.8 - p * 0.25), 0.5, 3.8);
c.stroke();
}
}
});
},
function (P, x, z, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var s = o.s || 1;
lkwCyl(g, 0.06 * s, 0.09 * s, 1.0 * s, lkwMat("bark"), 0, 0, 0, 6);
var leaf = lkwM("lkxRoseLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3E6A2E, map: lkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
var ball = new THREE.Mesh(lkwGeo("lkxRoseBall", function () { var parts = [], R = wRand(3); for (var i = 0; i < 5; i++) {
var c = new THREE.IcosahedronGeometry(0.55 + R() * 0.2, 1);
c.translate((R() - 0.5) * 0.7, (R() - 0.5) * 0.5, (R() - 0.5) * 0.7);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), leaf);
ball.position.y = 1.5 * s;
ball.scale.setScalar(s);
g.add(ball);
var fl = new THREE.Mesh(lkwGeo("lkxRoseFl", function () { var parts = [], R = wRand(5); for (var i = 0; i < 6; i++) {
var c = new THREE.IcosahedronGeometry(0.68 + R() * 0.15, 1);
c.translate((R() - 0.5) * 0.5, (R() - 0.5) * 0.4, (R() - 0.5) * 0.5);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lkwM("lkxRoseM" + (o.col || "w") + (o.paint || ""), function () { var t = lkxRoseTex(o.col || "#F6F4EE", o.paint); var m = new THREE.MeshLambertMaterial({ map: t, alphaTest: 0.5, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
fl.position.y = 1.5 * s;
fl.scale.setScalar(s);
g.add(fl);
g.userData.roses = fl;
lkwRound(x, z, 0.6 * s, y - 1, y + 2.5 * s);
return g;
},
function (P, x, z, y, s, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var lite = lkwLite();
var stem = new THREE.Mesh(lkwGeo("lkxStem" + (lite ? "L" : ""), function () { var pts = []; for (var i = 0; i <= 8; i++) {
var t = i / 8;
pts.push(new THREE.Vector2(0.12 + 0.05 * Math.sin(t * 3.1) + (t < 0.12 ? 0.06 * (1 - t / 0.12) : 0), t * 0.9));
} return new THREE.LatheGeometry(pts, lite ? 8 : 14); }), lkwLam(o.stem || 0xF0E8D8));
stem.scale.setScalar(s);
g.add(stem);
var cap = new THREE.Mesh(lkwGeo("lkxCap" + (lite ? "L" : ""), function () { var pts = []; for (var i = 0; i <= 10; i++) {
var a = i / 10 * Math.PI / 2;
pts.push(new THREE.Vector2(Math.cos(a) * 0.55 + 0.001, Math.sin(a) * 0.32));
} pts.unshift(new THREE.Vector2(0.001, -0.02)); pts.splice(1, 0, new THREE.Vector2(0.5, -0.04)); return new THREE.LatheGeometry(pts.reverse(), lite ? 12 : 24); }), o.capM || lkwM("lkxCapM" + (o.cap || 0xC83A2A) + (o.spots ? "s" : ""), function () {
var t = lkwCanvas("lkxCapT" + (o.cap || 0xC83A2A) + (o.spots ? "s" : ""), 128, 64, function (c, W, H) {
c.fillStyle = "#" + (o.cap || 0xC83A2A).toString(16).padStart(6, "0");
c.fillRect(0, 0, W, H);
var R = wRand(9);
for (var i = 0; i < 1400; i++) {
c.fillStyle = "rgba(0,0,0," + (R() * 0.06) + ")";
c.fillRect(R() * W, R() * H, 2, 2);
}
if (o.spots)
for (i = 0; i < 16; i++) {
c.fillStyle = "#F6F2E8";
c.beginPath();
c.arc(R() * W, 10 + R() * (H - 14), 2 + R() * 4, 0, 7);
c.fill();
}
});
return new THREE.MeshLambertMaterial({ map: t });
}));
cap.position.y = 0.86 * s;
cap.scale.setScalar(s);
g.add(cap);
var gill = new THREE.Mesh(lkwGeo("lkxGill", function () { var c = new THREE.CircleGeometry(0.52, 24); c.rotateX(Math.PI / 2); return c; }), lkwLam(o.gill || 0xD8C8A8));
gill.position.y = 0.85 * s;
gill.scale.setScalar(s);
g.add(gill);
if (s > 1.6 && !o.noSolid) {
lkwRound(x, z, 0.16 * s, y - 1, y + 0.8 * s);
if (o.top)
lkwFloor(x, z, 0.7 * s, 0.7 * s, y + 1.16 * s, { r: 0.5 * s });
}
return g;
},
function (P, x, z, y, s, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
lkwCyl(g, 0.012 * s, 0.02 * s, 1.4 * s, lkwLam(0x4A7A30), 0, 0, 0, 5);
var bell = lkwLam(col || 0xC860A8);
for (var i = 0; i < 9; i++) {
var b = lkwCyl(g, 0.035 * s, 0.06 * s, 0.1 * s, bell, Math.sin(i * 2.4) * 0.05 * s, 0.7 * s + i * 0.07 * s, Math.cos(i * 2.4) * 0.05 * s, 6);
b.rotation.z = 0.5 * Math.sin(i * 2.4);
b.rotation.x = 0.5 * Math.cos(i * 2.4);
}
for (i = 0; i < 5; i++) {
var l = new THREE.Mesh(lkwGeo("lkxFgLeaf", function () { var p = new THREE.PlaneGeometry(0.12, 0.4); p.translate(0, 0.2, 0); p.rotateX(-1.0); return p; }), lkwLam(0x3E6A2E, { ds: 1 }));
l.rotation.y = i * 1.3;
l.scale.setScalar(s);
g.add(l);
}
return g;
},
function (P, x, z, y, s) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var gr = lkwLam(0x5A7A4A), pu = lkwLam(0x8A4AA8);
lkwCyl(g, 0.03 * s, 0.05 * s, 1.2 * s, gr, 0, 0, 0, 6);
for (var i = 0; i < 3; i++) {
var a = i * 2.1, br = new THREE.Group();
br.position.y = 0.8 * s;
br.rotation.set(0.5 * Math.cos(a), 0, 0.5 * Math.sin(a));
g.add(br);
lkwCyl(br, 0.02 * s, 0.025 * s, 0.5 * s, gr, 0, 0, 0, 5);
var hd = new THREE.Mesh(lkwGeo("lkxThHead", function () { return new THREE.SphereGeometry(0.08, 8, 6); }), gr);
hd.position.y = 0.55 * s;
hd.scale.setScalar(s);
br.add(hd);
var tf = lkwCyl(br, 0.05 * s, 0.08 * s, 0.12 * s, pu, 0, 0.6 * s, 0, 8);
}
for (i = 0; i < 6; i++) {
var l = new THREE.Mesh(lkwGeo("lkxThLeaf", function () { var sh = new THREE.Shape(); sh.moveTo(0, 0); for (var k = 0; k <= 8; k++) {
var t = k / 8;
sh.lineTo((k % 2 ? 0.12 : 0.06) * (1 - t), t * 0.6);
} for (k = 8; k >= 0; k--) {
var t2 = k / 8;
sh.lineTo(-(k % 2 ? 0.12 : 0.06) * (1 - t2), t2 * 0.6);
} var gg = new THREE.ShapeGeometry(sh); gg.rotateX(-1.1); return gg; }), lkwLam(0x5A7A4A, { ds: 1 }));
l.rotation.y = i * 1.05;
l.position.y = 0.1 * s;
l.scale.setScalar(s);
g.add(l);
}
return g;
},
function () {
if (typeof CRX_PLANS === "undefined" || CRX_PLANS.lk_sheep || typeof crxQuad !== "function")
return;
CRX_PLANS.lk_sheep = function () { return crxQuad({ L: 0.55, H: 0.36, G: 0.3, W: 1.25, legR: 0.035, head: "horse", hs: 0.42, col: 0xE8E2D2, belly: 0xD8D0C0, muzzle: 0x2A2420, headCol: 0x2A2420, tail: { l: 0.12, r: 0.05, up: -0.8 }, neck: { l: 0.14, up: 0.5 }, surf: "fur", foot: "hoof", footCol: 0x1A1614, eyeCol: 0x3A2A10 }); };
LKW_CRX.sheep = "lk_sheep";
CRX_PLANS.lk_cow = function () { return crxQuad({ L: 1.2, H: 0.72, G: 0.38, W: 1.1, legR: 0.065, head: "bull", hs: 1.05, col: 0x8A5A3A, belly: 0xF0ECE4, muzzle: 0xD8B8A8, spots: 0xF4F0E8, tail: { l: 0.8, r: 0.03, up: -1.2 }, neck: { l: 0.3, up: 0.3 }, surf: "hide", foot: "hoof", footCol: 0x1A1614, eyeCol: 0x2A1A0A }); };
LKW_CRX.cow = "lk_cow";
},
function (P, x0, x1, z, y, o) {
o = o || {};
var R = wRand(o.seed || 3), china = lkwShine(0xF6F4EE, 0.25, 0), blue = lkwShine(0x3A5AA8, 0.3, 0), gilt = lkwShine(0xD8B048, 0.3, 0.8), tea = lkwShine(0x6A3A1A, 0.1, 0), bread = lkwLam(0xE8D0A0), butter = lkwLam(0xF4E08A);
for (var x = x0; x <= x1; x += o.gap || 0.7) {
[-1, 1].forEach(function (sd) {
var zz = z + sd * (o.w || 0.45) * 0.7, cx = x + (R() - 0.5) * 0.2;
if (R() < (o.messy ? 0.3 : 0.1))
return;
var sau = lkwCyl(P, 0.07, 0.06, 0.012, china, cx, y, zz, 14);
var cup = lkwCyl(P, 0.045, 0.035, 0.06, R() < 0.5 ? china : blue, cx, y + 0.012, zz, 12);
if (!o.empty && R() < 0.5)
lkwCyl(P, 0.04, 0.04, 0.004, tea, cx, y + 0.06, zz, 12);
if (R() < 0.5) {
var h = new THREE.Mesh(lkwGeo("lkxHandle", function () { return new THREE.TorusGeometry(0.018, 0.004, 5, 10); }), china);
h.position.set(cx + 0.05, y + 0.04, zz);
P.add(h);
}
if (o.messy && R() < 0.25) {
var tip = lkwCyl(P, 0.045, 0.035, 0.06, china, cx + 0.12, y + 0.03, zz, 12);
tip.rotation.z = 1.5;
}
});
if (R() < 0.35) {
var pot = new THREE.Mesh(lkwGeo("lkxPot", function () { var s = new THREE.SphereGeometry(0.1, 14, 10); s.scale(1, 0.85, 1); return s; }), R() < 0.5 ? china : blue);
pot.position.set(x, y + 0.09, z);
P.add(pot);
lkwCyl(P, 0.03, 0.02, 0.04, china, x, y + 0.16, z, 8);
var sp = lkwCyl(P, 0.012, 0.02, 0.12, china, x + 0.11, y + 0.07, z, 6);
sp.rotation.z = -0.9;
}
else if (R() < 0.45) {
lkwCyl(P, 0.13, 0.11, 0.012, china, x, y, z, 16);
for (var b = 0; b < 4; b++) {
lkwBox(P, 0.07, 0.012, 0.05, bread, x + (b % 2 - 0.5) * 0.08, y + 0.012 + Math.floor(b / 2) * 0.012, z + (b % 2 ? 0.02 : -0.02));
}
lkwBox(P, 0.05, 0.02, 0.03, butter, x + 0.06, y + 0.012, z + 0.05);
}
else if (R() < 0.3) {
lkwCyl(P, 0.035, 0.045, 0.1, china, x, y, z, 10);
lkwCyl(P, 0.05, 0.05, 0.008, gilt, x, y + 0.1, z, 10);
}
}
},
function (x, z) {
var T = LKW.terr || [], best = null, ba = 1e18;
for (var n = 0; n < T.length; n++) {
var t = T[n];
if (x < t.x0 || x > t.x0 + t.w || z < t.z0 || z > t.z0 + t.d || t.w * t.d >= ba)
continue;
best = t;
ba = t.w * t.d;
}
if (!best)
return null;
var t = best, i = Math.round((x - t.x0) / t.w * t.nx), j = Math.round((z - t.z0) / t.d * t.nz), q = (j * (t.nx + 1) + i) * 3;
return { r: t.col[q], g: t.col[q + 1], b: t.col[q + 2], mead: t.mead };
},
function (x, z, y) {
var c = lklCol(x, z);
if (!c || !c.mead || !(c.g > c.r * 1.08 && c.g > c.b * 1.35))
return null;
var S = LKW.strips || [];
for (var i = 0; i < S.length; i++) {
var s = S[i];
if (x < s.x0 || x > s.x1 || z < s.z0 || z > s.z1)
continue;
if (lkwPathD(x, z, s.pts) < s.w / 2 + 0.3)
return null;
}
var N = LKW.noTurf || [];
for (i = 0; i < N.length; i++) {
var o = N[i];
if (o.r !== undefined ? Math.hypot(x - o.x, z - o.z) < o.r : (x > o.x0 && x < o.x1 && z > o.z0 && z < o.z1))
return null;
}
var Wt = LKW.water || [];
for (i = 0; i < Wt.length; i++) {
var m = Wt[i], p = m.geometry && m.geometry.parameters;
if (!p || !p.width)
continue;
var hw = p.width * m.scale.x / 2, hd = p.height * m.scale.y / 2;
if (Math.abs(x - m.position.x) < hw && Math.abs(z - m.position.z) < hd && y < m.position.y + 0.08)
return null;
}
if (lkwSolidAt(x, z, y))
return null;
return c;
},
function (key, w, h, fill, fn) {
if (LKW.tex[key])
return LKW.tex[key];
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d", { willReadFrequently: true });
fn(x, w, h);
var D = x.getImageData(0, 0, w, h).data, out = new Uint8Array(w * h * 4), F = new THREE.Color(fill);
for (var j = 0; j < h; j++)
for (var i = 0; i < w; i++) {
var s = (j * w + i) * 4, d = ((h - 1 - j) * w + i) * 4, a = D[s + 3];
if (a > 0) {
out[d] = D[s];
out[d + 1] = D[s + 1];
out[d + 2] = D[s + 2];
}
else {
out[d] = F.r * 255;
out[d + 1] = F.g * 255;
out[d + 2] = F.b * 255;
}
out[d + 3] = a;
}
var t = new THREE.DataTexture(out, w, h, THREE.RGBAFormat);
t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
t.generateMipmaps = true;
t.minFilter = THREE.LinearMipmapLinearFilter;
t.magFilter = THREE.LinearFilter;
t.needsUpdate = true;
return (LKW.tex[key] = t);
},
function () {
return lklCardTex("lklTuftD", 256, 128, 0x9CBC6A, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(29);
for (var i = 0; i < 120; i++) {
var px = 6 + R() * (W - 12), h = H * (0.3 + R() * 0.66), lean = (R() - 0.5) * 18, lk = 0.8 + R() * 1.2, v = R();
var g = x.createLinearGradient(0, H, 0, H - h);
g.addColorStop(0, "rgba(" + (120 + v * 20 | 0) + "," + (150 + v * 30 | 0) + "," + (80 + v * 10 | 0) + ",1)");
g.addColorStop(0.55, "rgba(" + (150 + v * 40 | 0) + "," + (190 + v * 40 | 0) + "," + (110 + v * 30 | 0) + ",1)");
g.addColorStop(1, "rgba(" + (200 + v * 40 | 0) + "," + (226 + v * 28 | 0) + "," + (150 + v * 40 | 0) + ",1)");
x.fillStyle = g;
x.beginPath();
x.moveTo(px - lk, H);
x.quadraticCurveTo(px - lk * 0.4 + lean * 0.3, H - h * 0.6, px + lean, H - h);
x.quadraticCurveTo(px + lk * 0.4 + lean * 0.3, H - h * 0.6, px + lk, H);
x.closePath();
x.fill();
}
});
},
function () {
return lklCardTex("lklFlwD", 256, 64, 0x4E7A34, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(31);
for (var k = 0; k < 4; k++) {
var ox = k * 64;
for (var i = 0; i < 5; i++) {
var px = ox + 10 + R() * 44, py = 12 + R() * 30;
x.strokeStyle = "#3E6A2A";
x.lineWidth = 1.6;
x.beginPath();
x.moveTo(px, H);
x.quadraticCurveTo(px + (R() - 0.5) * 8, (H + py) / 2, px, py);
x.stroke();
if (k === 0) {
x.fillStyle = "#FBFAF2";
for (var p = 0; p < 12; p++) {
var a = p / 12 * 6.283;
x.beginPath();
x.ellipse(px + Math.cos(a) * 3.6, py + Math.sin(a) * 1.8, 2.6, 1.1, a, 0, 7);
x.fill();
}
x.fillStyle = "#F0C020";
x.beginPath();
x.arc(px, py, 1.9, 0, 7);
x.fill();
}
else if (k === 1) {
x.fillStyle = "#F6D020";
for (p = 0; p < 5; p++) {
a = p / 5 * 6.283;
x.beginPath();
x.arc(px + Math.cos(a) * 2.4, py + Math.sin(a) * 1.4, 2.3, 0, 7);
x.fill();
}
x.fillStyle = "#D8A010";
x.beginPath();
x.arc(px, py, 1.2, 0, 7);
x.fill();
}
else if (k === 2) {
for (p = 0; p < 14; p++) {
x.fillStyle = p % 2 ? "#E8B8D0" : "#D890B8";
x.beginPath();
x.arc(px + (R() - 0.5) * 5, py + (R() - 0.5) * 5, 1.5, 0, 7);
x.fill();
}
x.fillStyle = "#4A7A30";
for (p = 0; p < 3; p++) {
a = p / 3 * 6.283;
x.beginPath();
x.arc(px + Math.cos(a) * 4, py + 10 + Math.sin(a) * 2, 2.4, 0, 7);
x.fill();
}
}
else {
x.fillStyle = "#7A90E8";
for (p = 0; p < 4; p++) {
a = p / 4 * 6.283;
x.beginPath();
x.arc(px + Math.cos(a) * 1.8, py + Math.sin(a) * 1.8, 1.6, 0, 7);
x.fill();
}
x.fillStyle = "#F4F4FF";
x.beginPath();
x.arc(px, py, 0.7, 0, 7);
x.fill();
}
}
}
});
},
function (h, flw, kind) {
return lkwGeo("lklTuft" + h + (flw ? "f" + kind : ""), function () {
var parts = [], n = flw ? 2 : 3, w = flw ? 0.34 : 0.3;
for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
p.rotateY(i / n * Math.PI + 0.3);
var nm = p.attributes.normal;
for (var v = 0; v < nm.count; v++)
nm.setXYZ(v, 0, 1, 0);
if (flw) {
var uv = p.attributes.uv;
for (v = 0; v < uv.count; v++)
uv.setX(v, uv.getX(v) * 0.25 + kind * 0.25);
}
parts.push(p);
var b = p.clone();
b.rotateY(Math.PI);
var bn = b.attributes.normal;
for (v = 0; v < bn.count; v++)
bn.setXYZ(v, 0, 1, 0);
parts.push(b);
}
return gwMerge(parts);
});
},
function (g) {
var a = g.index ? g.toNonIndexed() : g, P = a.attributes.position, U = a.attributes.uv, n = P.count, pos = new Float32Array(n * 6), uv = U ? new Float32Array(n * 4) : null, nm = new Float32Array(n * 6);
for (var i = 0; i < n; i++) {
pos[i * 3] = P.getX(i);
pos[i * 3 + 1] = P.getY(i);
pos[i * 3 + 2] = P.getZ(i);
if (uv) {
uv[i * 2] = U.getX(i);
uv[i * 2 + 1] = U.getY(i);
}
}
for (var t = 0; t < n; t += 3) {
[0, 2, 1].forEach(function (o, k) { var s0 = t + o, d = n + t + k; pos[d * 3] = P.getX(s0); pos[d * 3 + 1] = P.getY(s0); pos[d * 3 + 2] = P.getZ(s0); if (uv) {
uv[d * 2] = U.getX(s0);
uv[d * 2 + 1] = U.getY(s0);
} });
}
for (i = 0; i < n * 2; i++) {
nm[i * 3 + 1] = 1;
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nm, 3));
if (uv)
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
return G;
},
function (k) {
var C = LKL_CFG[k];
if (!C || !LKW.scG)
return;
var lite = lkwLite(), cell = lite ? 0.7 : 0.34, half = lite ? 13 : 36, Rr = half * cell, N = half * 2, tot = N * N;
var gm = lkwM("lklTuftM", function () { var m = new THREE.MeshLambertMaterial({ map: lklTuftTex(), alphaTest: 0.42 }); m.userData.noPhoto = 1; return m; });
var fm = lkwM("lklFlwM", function () { var m = new THREE.MeshLambertMaterial({ map: lklFlowerTex(), alphaTest: 0.4 }); m.userData.noPhoto = 1; return m; });
var g = new THREE.InstancedMesh(lklTuftGeo(C.h, 0), gm, tot), nf = Math.max(4, Math.round(tot * C.fl / 4) + 4), F = [0, 1, 2, 3].map(function (kd) { return new THREE.InstancedMesh(lklTuftGeo(C.h * 0.75, 1, kd), fm, nf); });
var c0 = new THREE.Color(1, 1, 1);
g.setColorAt(0, c0);
if (g.instanceColor && g.instanceColor.count < tot) {
g.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(tot * 3), 3);
}
[g].concat(F).forEach(function (m) { m.frustumCulled = false; m.count = 0; m.userData.keep = 1; m.renderOrder = 1; LKW.scG.add(m); });
var KW = C.kinds || [0.4, 0.3, 0.2, 0.1];
var st = { cx: 1e9, cz: 1e9 }, d = new THREE.Object3D(), col = new THREE.Color();
function lay(L) {
var bx = Math.floor(L.x / cell), bz = Math.floor(L.z / cell), ng = 0, nk = [0, 0, 0, 0];
for (var j = 0; j < N; j++)
for (var i = 0; i < N; i++) {
var gx = bx + i - half, gz = bz + j - half, h1 = lkwHash(gx * 1.37, gz * 0.91), h2 = lkwHash(gz * 2.11 + 7, gx * 1.73);
var x = (gx + h1) * cell, z = (gz + h2) * cell, dd = Math.hypot(x - L.x, z - L.z);
if (dd > Rr)
continue;
var y = LKW.hgt ? LKW.hgt(x, z) : 0, c = lklTurf(x, z, y);
if (!c)
continue;
var fade = lkwSmooth(Rr, Rr * 0.62, dd), s = (0.7 + h1 * 0.6) * fade;
if (s < 0.05)
continue;
var isF = h2 > 1 - C.fl, kd = 0, hk = lkwHash(gx * 0.37 + 3, gz * 0.53), acc = 0;
for (var q = 0; q < 4; q++) {
acc += KW[q];
if (hk < acc) {
kd = q;
break;
}
}
if (isF && nk[kd] >= nf)
isF = false;
d.position.set(x, y - 0.02, z);
d.rotation.set(0, h1 * 6.283, 0);
d.scale.set(s, s * (0.8 + h2 * 0.5), s);
d.updateMatrix();
col.setRGB(Math.min(1, c.r * 1.0), Math.min(1, c.g * 1.0 + 0.01), Math.min(1, c.b * 0.98));
if (isF) {
F[kd].setMatrixAt(nk[kd], d.matrix);
nk[kd]++;
}
else if (ng < tot) {
g.setMatrixAt(ng, d.matrix);
g.setColorAt(ng, col);
ng++;
}
}
g.count = ng;
g.instanceMatrix.needsUpdate = true;
if (g.instanceColor)
g.instanceColor.needsUpdate = true;
F.forEach(function (m, q) { m.count = nk[q]; m.instanceMatrix.needsUpdate = true; });
}
LKW.ticks.push(function (dt, L) { var inR = LKW.inRm; g.visible = !inR; F.forEach(function (m) { m.visible = !inR; }); if (inR)
return; if (Math.hypot(L.x - st.cx, L.z - st.cz) < (lite ? 2.2 : 1.4))
return; st.cx = L.x; st.cz = L.z; lay(L); });
LKL.g = g;
LKL.F = F;
},
function (P, list) {
if (!list.length)
return;
lkwInst(P, lkwGeo("lkBracken2", function () { var g = lkwFronds(7, 1.1, 0.42, 0.55, 0.05, 1.0); return typeof lklTwoSided === "function" ? lklTwoSided(g) : g; }), lkwM("lkBrackenM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x9AB870, map: lkwFrondTex("fern"), alphaTest: 0.4 }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, list) {
list.forEach(function (t) {
var g = new THREE.Group();
g.position.set(t.x, t.y + 0.18 * t.s, t.z);
g.rotation.y = t.ry;
g.scale.setScalar(t.s);
P.add(g);
var lg = new THREE.Mesh(lkwGeo("lkLog", function () { var c = new THREE.CylinderGeometry(0.26, 0.32, 3.4, 9, 3); var p = c.attributes.position; for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
p.setX(i, p.getX(i) * (1 + Math.sin(y * 2.1) * 0.05));
} c.rotateZ(Math.PI / 2); c.computeVertexNormals(); return c; }), lkwMat("bark"));
g.add(lg);
var moss = new THREE.Mesh(lkwGeo("lkLogMoss", function () { var c = new THREE.CylinderGeometry(0.3, 0.34, 2.6, 9, 1, true, -0.9, 1.8); c.rotateZ(Math.PI / 2); return c; }), lkwLam(0x5A8A34));
moss.position.y = 0.02;
g.add(moss);
var end = new THREE.Mesh(new THREE.CircleGeometry(0.31, 9), lkwLam(0xC8A878));
end.position.x = 1.71;
end.rotation.y = Math.PI / 2;
g.add(end);
});
},
function (P, x, z, y, ry, sc, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(sc);
P.add(g);
var w = o.w || 8.4, d = o.d || 6.2, h = 2.9, lite = lkwLite(), plaster = lkwLam(o.wall || 0xEDE2C8), oak = lkwMat("darkoak"), stone = lkwMat("greystone"), pane = lkwMat("pane");
lkwBox(g, w + 0.3, 0.5, d + 0.3, stone, 0, -0.05, 0);
lkwBox(g, w, h, d, plaster, 0, 0.45, 0);
var beam = function (bw, bh, bd, bx, by, bz, rz, ryy) { var m = lkwBox(g, bw, bh, bd, oak, bx, by, bz); if (rz) {
m.rotation.z = rz;
} if (ryy)
m.rotation.y = ryy; return m; };
[[0, d / 2 + 0.03, 0], [0, -d / 2 - 0.03, 0]].forEach(function (f) {
beam(w + 0.06, 0.22, 0.08, 0, 0.45, f[1]);
beam(w + 0.06, 0.22, 0.08, 0, h + 0.23, f[1]);
beam(w + 0.02, 0.14, 0.07, 0, 1.75, f[1]);
for (var sx = -w / 2; sx <= w / 2 + 0.01; sx += 1.2) {
if (f[1] > 0 && Math.abs(sx) < 0.8)
continue;
beam(0.16, h - 0.2, 0.07, sx, 0.62, f[1]);
}
[-1, 1].forEach(function (s) { var b = beam(0.13, 1.7, 0.07, s * (w / 2 - 0.6), 0.95, f[1]); b.rotation.z = s * 0.62; });
});
[[w / 2 + 0.03], [-w / 2 - 0.03]].forEach(function (f) { beam(0.08, 0.22, d + 0.06, f[0], 0.45, 0); beam(0.08, 0.22, d + 0.06, f[0], h + 0.23, 0); beam(0.07, 0.14, d + 0.02, f[0], 1.75, 0); for (var sz = -d / 2; sz <= d / 2 + 0.01; sz += 1.2)
beam(0.07, h - 0.2, 0.16, f[0], 0.62, sz); });
var rh = o.rh || 4.2;
[d / 2, -d / 2].forEach(function (gz) { var gm = new THREE.Mesh(lkwGeo("lkGab" + w, function () { var s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(0, rh * 0.92); s.lineTo(w / 2, 0); s.lineTo(-w / 2, 0); return new THREE.ShapeGeometry(s); }), lkwLam(o.wall || 0xEDE2C8, { ds: 1 })); gm.position.set(0, h + 0.45, gz + (gz > 0 ? 0.01 : -0.01)); g.add(gm); });
var th = new THREE.Mesh(lkwGeo("lkThatch" + w + "|" + d, function () {
var s = new THREE.Shape();
s.moveTo(-w / 2 - 0.9, -0.25);
s.quadraticCurveTo(-w / 4, rh * 0.55, 0, rh);
s.quadraticCurveTo(w / 4, rh * 0.55, w / 2 + 0.9, -0.25);
s.lineTo(w / 2 + 0.5, -0.55);
s.quadraticCurveTo(w / 4 - 0.2, rh * 0.45, 0, rh - 0.6);
s.quadraticCurveTo(-w / 4 + 0.2, rh * 0.45, -w / 2 - 0.5, -0.55);
s.lineTo(-w / 2 - 0.9, -0.25);
var e = new THREE.ExtrudeGeometry(s, { depth: d + 1.4, bevelEnabled: true, bevelSize: 0.18, bevelThickness: 0.25, bevelSegments: 2, curveSegments: 8 });
e.translate(0, 0, -(d + 1.4) / 2);
return e;
}), lkwThatchM());
th.position.y = h + 0.45;
g.add(th);
var rg = new THREE.Mesh(lkwGeo("lkRidge" + d, function () { var c = new THREE.CylinderGeometry(0.28, 0.28, d + 1.6, 10); c.rotateX(Math.PI / 2); return c; }), lkwLam(0x8A7040));
rg.position.y = h + 0.45 + rh - 0.02;
g.add(rg);
var cx = o.chimX != null ? o.chimX : -w / 2 + 0.9;
lkwBox(g, 1.1, h + rh + 1.5, 0.9, lkwMat("brick"), cx, 0, 0.0);
lkwBox(g, 1.3, 0.18, 1.1, stone, cx, h + rh + 1.5, 0);
[-0.25, 0.25].forEach(function (px) { lkwCyl(g, 0.13, 0.16, 0.55, lkwLam(0xB0603A), cx + px, h + rh + 1.68, 0, 10); });
if (!lite && o.smoke !== false)
lkwSmoke(g, cx, h + rh + 2.4, 0, 0x9A8A7A, 5);
var win = function (wx, wy, wz, face) {
var gw = new THREE.Group();
gw.position.set(wx, wy, wz);
gw.rotation.y = face;
g.add(gw);
lkwBox(gw, 1.25, 1.1, 0.1, oak, 0, 0, 0.02);
lkwBox(gw, 1.05, 0.9, 0.04, pane, 0, 0.1, 0.07);
for (var i = 1; i < 4; i++)
lkwBox(gw, 0.025, 0.9, 0.03, lkwLam(0x3A3A3A), -0.525 + i * 0.2625, 0.1, 0.1);
for (var j = 1; j < 3; j++)
lkwBox(gw, 1.05, 0.025, 0.03, lkwLam(0x3A3A3A), 0, 0.1 + j * 0.3, 0.1);
lkwBox(gw, 1.4, 0.1, 0.22, oak, 0, -0.05, 0.12);
lkwBox(gw, 1.2, 0.26, 0.26, lkwLam(0x6A4A2A), 0, -0.33, 0.22);
if (!lite)
for (var f = 0; f < 7; f++) {
var fl = new THREE.Mesh(lkwGeo("lkWbF", function () { return new THREE.SphereGeometry(0.08, 6, 5); }), lkwLam([0xD8283A, 0xF4E8F0, 0xE8A020, 0xC860A8][f % 4]));
fl.position.set(-0.5 + f * 0.165, -0.02, 0.26 + (f % 2) * 0.06);
gw.add(fl);
}
};
var doorX = o.doorX || 0;
[-w / 2 + 1.7, w / 2 - 1.7].forEach(function (wx) { win(wx, 1.2, d / 2 + 0.05, 0); win(wx, 1.2, -d / 2 - 0.05, Math.PI); });
win(w / 2 + 0.05, 1.2, 0.6, Math.PI / 2);
var dg = new THREE.Group();
dg.position.set(doorX, 0.45, d / 2 + 0.06);
g.add(dg);
lkwBox(dg, 1.25, 2.25, 0.12, oak, 0, 0, -0.02);
for (var p = 0; p < 4; p++)
lkwBox(dg, 0.24, 2.05, 0.05, lkwLam([0x5A3A22, 0x4A3020][p % 2]), -0.36 + p * 0.24, 0.02, 0.05);
[0.4, 1.6].forEach(function (hy) { lkwBox(dg, 0.7, 0.06, 0.03, lkwLam(0x1A1A1A), -0.14, hy, 0.09); });
lkwBox(dg, 0.06, 0.06, 0.06, lkwMat("brass"), 0.38, 1.0, 0.1);
var hood = new THREE.Mesh(lkwGeo("lkHood", function () { var s = new THREE.Shape(); s.moveTo(-0.95, 0); s.lineTo(0, 0.6); s.lineTo(0.95, 0); s.lineTo(-0.95, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 0.8, bevelEnabled: false }); return e; }), lkwThatchM());
hood.position.set(0, 2.35, -0.1);
dg.add(hood);
lkwBox(g, 1.7, 0.18, 0.8, stone, doorX, 0, d / 2 + 0.5);
return g;
},
function () {
return lkwM("lkgClipM", function () {
var t = lkwCanvas("lkgClipT", 128, 128, function (c, W, H) {
c.fillStyle = "#2E5222";
c.fillRect(0, 0, W, H);
var R = wRand(31);
for (var i = 0; i < 2600; i++) {
var x = R() * W, y = R() * H, s = 1.5 + R() * 2.5;
c.fillStyle = ["#3E6A2C", "#24451A", "#4A7A34", "#335C26", "#5A8A3E"][i % 5];
c.beginPath();
c.ellipse(x, y, s, s * 0.6, R() * 3, 0, 7);
c.fill();
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return new THREE.MeshLambertMaterial({ map: t });
});
},
function (G, a, b, h, w, H, solid) {
var L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 6)), ang = Math.atan2(b[0] - a[0], b[1] - a[1]);
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t, seg = L / n + 0.05, y = H(x, z) - 0.15;
var m = lkwBox(G, w, h, seg, lkgClipM(), x, y, z, ang);
m.castShadow = !lkwLite();
}
if (solid !== false) {
var cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2;
lkwSolid(cx, cz, w, L, H(cx, cz) - 1, H(cx, cz) + h, -ang);
}
},
function (G, x, z, y, kind, s) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.scale.setScalar(s || 1);
G.add(g);
var M = lkgClipM();
lkwBox(g, 0.9, 0.5, 0.9, lkwMat("ashlar"), 0, 0, 0);
lkwCyl(g, 0.55, 0.45, 0.6, lkwLam(0x9A5A3A), 0, 0.5, 0, 12);
if (kind === "ball") {
lkwCyl(g, 0.06, 0.08, 1.0, lkwMat("bark"), 0, 1.0, 0, 6);
var b = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 10), M);
b.position.y = 2.2;
g.add(b);
}
else if (kind === "cone") {
var c = new THREE.Mesh(new THREE.ConeGeometry(0.75, 2.6, 14), M);
c.position.y = 2.4;
g.add(c);
}
else if (kind === "pawn") {
var p0 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.62, 1.3, 14), M);
p0.position.y = 1.65;
g.add(p0);
var p1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 10), M);
p1.position.y = 2.75;
g.add(p1);
}
else {
var t = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 1.9, 14), M);
t.position.y = 2.0;
g.add(t);
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.283, c = lkwBox(g, 0.3, 0.36, 0.3, M, Math.cos(a) * 0.5, 2.95, Math.sin(a) * 0.5);
c.rotation.y = -a;
}
}
lkwRound(x, z, 0.6 * (s || 1), y - 1, y + 3);
return g;
},
function (G, x, z, y) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var st = lkwMat("ashlar");
lkwBox(g, 1.2, 1.1, 1.2, st, 0, 0, 0);
lkwBox(g, 1.4, 0.15, 1.4, st, 0, 1.1, 0);
var u = new THREE.Mesh(lkwGeo("lkgUrn", function () { var p = []; [[0.15, 0], [0.32, 0.05], [0.2, 0.2], [0.22, 0.3], [0.55, 0.55], [0.62, 0.85], [0.5, 0.95], [0.56, 1.0]].forEach(function (q) { p.push(new THREE.Vector2(q[0], q[1])); }); return new THREE.LatheGeometry(p, 16); }), st);
u.position.y = 1.25;
g.add(u);
for (var f = 0; f < 9; f++) {
var fl = new THREE.Mesh(lkwGeo("lkgUrnF", function () { return new THREE.SphereGeometry(0.16, 6, 5); }), lkwLam([0xC81A2A, 0xF4F0F0, 0xC81A2A][f % 3]));
fl.position.set(Math.cos(f / 9 * 6.283) * 0.36, 2.3 + (f % 2) * 0.12, Math.sin(f / 9 * 6.283) * 0.36);
g.add(fl);
}
var lv = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 6, 0, 6.3, 0, 1.2), lkgClipM());
lv.position.y = 2.1;
g.add(lv);
lkwRound(x, z, 0.7, y - 1, y + 2.5);
},
function (G, x, z, y, w) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var ir = lkwLam(0x2A2A26);
[-1, 1].forEach(function (s) { lkwCyl(g, 0.05, 0.05, 2.6, ir, s * w / 2, 0, 0, 6); });
var ar = new THREE.Mesh(lkwGeo("lkgArc" + w, function () { var c = new THREE.TorusGeometry(w / 2, 0.05, 6, 16, Math.PI); return c; }), ir);
ar.position.y = 2.6;
g.add(ar);
var R = wRand(Math.round(x * 7 + z * 3)), list = [];
for (var i = 0; i < 26; i++) {
var a = R() * Math.PI, side = i < 8 ? (i % 2 ? 1 : -1) : 0;
var px = side ? side * w / 2 : Math.cos(a) * w / 2, py = side ? 0.5 + R() * 2.1 : 2.6 + Math.sin(a) * w / 2;
list.push({ x: x + px + (R() - 0.5) * 0.25, y: y + py, z: z + (R() - 0.5) * 0.3, s: 0.18 + R() * 0.12, ry: R() * 6 });
}
lkwInst(G, lkwGeo("lkgLeafBlob", function () { return new THREE.IcosahedronGeometry(1, 0); }), lkgClipM(), list, {});
lkwInst(G, lkwGeo("lkgRose", function () { return new THREE.SphereGeometry(0.5, 6, 5); }), lkwLam(0xC81A2A), list.filter(function (t, i) { return i % 2 === 0; }).map(function (t) { return { x: t.x + 0.08, y: t.y + 0.08, z: t.z, s: t.s * 0.6 }; }), {});
lkwInst(G, lkwGeo("lkgRose", null), lkwLam(0xF4F0EE), list.filter(function (t, i) { return i % 4 === 1; }).map(function (t) { return { x: t.x - 0.06, y: t.y + 0.1, z: t.z + 0.05, s: t.s * 0.55 }; }), {});
},
function (G, x, z, y) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
lkwCyl(g, 0.05, 0.06, 5, lkwMat("gilt"), 0, 0, 0, 6);
var f = new THREE.Mesh(lkwGeo("lkgPen", function () { var s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(1.6, -0.35); s.lineTo(0, -0.7); s.lineTo(0, 0); return new THREE.ShapeGeometry(s); }), lkwLam(0xC81A2A, { ds: 1 }));
f.position.y = 4.9;
g.add(f);
},
function (col) {
return lklCardTex("lkgBloomD" + col, 128, 128, 0x3E6A2E, function (c, W, H) {
c.clearRect(0, 0, W, H);
var R = wRand(col.length * 17 + 5);
for (var i = 0; i < 46; i++) {
var px = 4 + R() * (W - 8), h = H * (0.3 + R() * 0.5);
c.strokeStyle = "rgba(46," + (84 + R() * 30 | 0) + ",34,1)";
c.lineWidth = 2.6;
c.beginPath();
c.moveTo(px, H);
c.quadraticCurveTo(px + (R() - 0.5) * 20, H - h * 0.5, px + (R() - 0.5) * 16, H - h);
c.stroke();
}
for (i = 0; i < 34; i++) {
var lx = R() * W, ly = H * 0.45 + R() * H * 0.5;
c.fillStyle = "rgba(" + (40 + R() * 20 | 0) + "," + (90 + R() * 40 | 0) + ",40,1)";
c.beginPath();
c.ellipse(lx, ly, 6 + R() * 6, 3 + R() * 2, R() * 3, 0, 7);
c.fill();
}
var base = new THREE.Color(col);
for (i = 0; i < 70; i++) {
var bx = 6 + R() * (W - 12), by = 6 + R() * H * 0.55, r = 3.2 + R() * 4, k = 0.75 + R() * 0.5;
c.fillStyle = "rgb(" + Math.min(255, base.r * 255 * k | 0) + "," + Math.min(255, base.g * 255 * k | 0) + "," + Math.min(255, base.b * 255 * k | 0) + ")";
for (var p = 0; p < 5; p++) {
var a = p / 5 * 6.283 + R();
c.beginPath();
c.arc(bx + Math.cos(a) * r * 0.6, by + Math.sin(a) * r * 0.6, r * 0.62, 0, 7);
c.fill();
}
c.fillStyle = "rgba(255,240,160,.9)";
c.beginPath();
c.arc(bx, by, r * 0.25, 0, 7);
c.fill();
}
});
},
function () { return lkwGeo("lkgBloomG", function () { var parts = []; for (var i = 0; i < 3; i++) {
var p = new THREE.PlaneGeometry(1.0, 0.62);
p.translate(0, 0.31, 0);
p.rotateY(i / 3 * Math.PI);
var nm = p.attributes.normal;
for (var v = 0; v < nm.count; v++)
nm.setXYZ(v, 0, 1, 0);
parts.push(p);
var b = p.clone();
b.rotateY(Math.PI);
parts.push(b);
} return gwMerge(parts); }); },
function (spec, o) {
o = o || {};
var k = String(spec).split(":"), kind = k[0] || "pawn", side = k[1] || "w", M = lkxPieceM(side), g = new THREE.Group(), body = new THREE.Group();
g.add(body);
g.userData.live = 1;
g.userData.keep = 1;
var top = { king: 1.0, queen: 0.96, bishop: 0.74, knight: 0.4, rook: 0.76, pawn: 0.5 }[kind] || 0.5;
var b = new THREE.Mesh(lkxTurnGeo(kind), M);
body.add(b);
b.castShadow = !lkwLite();
var skin = lkwLam(0xF4D8C4), dark = lkwLam(0x1A1210), face = null;
if (kind === "knight") {
var n = new THREE.Mesh(lkwGeo("lkxKn", function () { var s = new THREE.Shape(); s.moveTo(-0.16, 0); s.lineTo(0.18, 0); s.lineTo(0.2, 0.3); s.quadraticCurveTo(0.3, 0.5, 0.38, 0.52); s.lineTo(0.36, 0.62); s.quadraticCurveTo(0.1, 0.78, -0.04, 0.7); s.quadraticCurveTo(-0.2, 0.5, -0.16, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 }); e.translate(0, 0, -0.1); e.rotateY(-Math.PI / 2); return e; }), M);
n.position.y = 0.4;
body.add(n);
[-1, 1].forEach(function (sd) { var e = new THREE.Mesh(lkwGeo("lkxKe", function () { return new THREE.SphereGeometry(0.025, 6, 5); }), dark); e.position.set(sd * 0.1, 0.98, 0.12); body.add(e); });
}
else {
var hy = top + (kind === "pawn" ? 0.08 : 0.1), hr = kind === "pawn" ? 0.13 : 0.14;
face = new THREE.Mesh(lkwGeo("lkxHead", function () { return new THREE.SphereGeometry(1, 14, 10); }), side === "r" ? M : skin);
face.scale.setScalar(hr);
face.position.y = hy;
body.add(face);
[-1, 1].forEach(function (sd) { var e = new THREE.Mesh(lkwGeo("lkxEye", function () { return new THREE.SphereGeometry(0.022, 6, 5); }), dark); e.position.set(sd * 0.05, hy + 0.02, hr * 0.9); body.add(e); });
var m = new THREE.Mesh(lkwGeo("lkxMo", function () { return new THREE.BoxGeometry(0.06, 0.012, 0.01); }), lkwLam(0x7A2A22));
m.position.set(0, hy - 0.05, hr * 0.95);
body.add(m);
if (kind === "king" || kind === "queen") {
var G = lkwShine(0xE8C048, 0.3, 0.85);
var cr = new THREE.Mesh(lkwGeo("lkxCr" + kind, function () { return new THREE.CylinderGeometry(0.15, 0.12, 0.12, kind === "king" ? 8 : 12, 1, true); }), G);
cr.material.side = THREE.DoubleSide;
cr.position.y = hy + 0.15;
body.add(cr);
if (kind === "king") {
var x1 = new THREE.Mesh(lkwBoxG(0.035, 0.16, 0.035), G);
x1.position.y = hy + 0.26;
body.add(x1);
var x2 = new THREE.Mesh(lkwBoxG(0.11, 0.035, 0.035), G);
x2.position.y = hy + 0.3;
body.add(x2);
}
else
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283, ball = new THREE.Mesh(lkwGeo("lkxQb", function () { return new THREE.SphereGeometry(0.025, 6, 5); }), G);
ball.position.set(Math.cos(a) * 0.14, hy + 0.23, Math.sin(a) * 0.14);
body.add(ball);
}
}
else if (kind === "bishop") {
var mt = new THREE.Mesh(lkwGeo("lkxMt", function () { var c = new THREE.ConeGeometry(0.13, 0.26, 12); c.translate(0, 0.13, 0); return c; }), M);
mt.position.y = hy + 0.08;
body.add(mt);
}
else if (kind === "rook") {
for (var j = 0; j < 6; j++) {
var a2 = j / 6 * 6.283, c = new THREE.Mesh(lkwBoxG(0.1, 0.1, 0.08), M);
c.position.set(Math.cos(a2) * 0.3, 0.8, Math.sin(a2) * 0.3);
c.rotation.y = -a2;
body.add(c);
}
face.position.y = 0.62;
face.position.z = 0.22;
face.scale.setScalar(0.1);
}
}
var arms = [];
[-1, 1].forEach(function (sd) { var pv = new THREE.Group(); pv.position.set(sd * (kind === "pawn" ? 0.15 : 0.2), top * 0.62, 0); body.add(pv); var a = new THREE.Mesh(lkwGeo("lkxArm", function () { var c = new THREE.CylinderGeometry(0.03, 0.025, 0.26, 6); c.translate(0, -0.13, 0); return c; }), M); pv.add(a); pv.rotation.z = sd * 0.5; arms.push(pv); });
var feet = [];
[-1, 1].forEach(function (sd) { var f = new THREE.Mesh(lkwGeo("lkxFt", function () { var s = new THREE.SphereGeometry(0.06, 8, 6); s.scale(1, 0.6, 1.6); return s; }), dark); f.position.set(sd * 0.14, 0.02, 0.36); g.add(f); feet.push(f); });
var s = o.s || (kind === "pawn" ? 0.8 : 1.2);
g.scale.setScalar(s);
g.userData.chess = { body: body, arms: arms, feet: feet, ph: (spec.length * 1.7) % 6.283 };
return g;
},
function (w, l, cup) { return lkwGeo("lkxPet" + w + "|" + l + "|" + cup, function () { var s = new THREE.Shape(); s.moveTo(0, 0); s.quadraticCurveTo(w, l * 0.4, 0, l); s.quadraticCurveTo(-w, l * 0.4, 0, 0); var g = new THREE.ShapeGeometry(s, 6), p = g.attributes.position; for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
p.setZ(i, cup * (y / l) * (y / l));
} g.computeVertexNormals(); return g; }); },
function (kind, o) {
o = o || {};
var g = new THREE.Group(), stemM = lkwLam(0x3A6A2A), leafM = lkwLam(0x4A7A30, { ds: 1 }), R = wRand(String(kind).length * 13 + (o.seed || 1));
var D = { tigerlily: { h: 1.6, col: 0xE8641E, dot: 0x3A1A10, n: 6, w: 0.16, l: 0.42, cup: 0.18, face: 0xF2B060 }, rose: { h: 1.35, col: 0xC81E3A, n: 14, w: 0.14, l: 0.2, cup: 0.1, face: 0xE85A6A, rose: 1 }, violet: { h: 0.5, col: 0x6A3AA8, n: 5, w: 0.07, l: 0.1, cup: 0.02, face: 0xE8D040 },
daisy: { h: 0.45, col: 0xFAFAF4, n: 16, w: 0.03, l: 0.12, cup: 0.0, face: 0xF0C020 }, larkspur: { h: 1.25, col: 0x4A6AD8, n: 5, w: 0.06, l: 0.09, cup: 0.03, face: 0xE8E8F8, spike: 1 } }[kind] || { h: 0.6, col: 0xE8E040, n: 8, w: 0.05, l: 0.1, cup: 0.02, face: 0xF0C020 };
var h = D.h * (o.s || 1), st = new THREE.Mesh(lkwGeo("lkxStem", function () { var c = new THREE.CylinderGeometry(0.012, 0.02, 1, 6); c.translate(0, 0.5, 0); return c; }), stemM);
st.scale.set(h, h, h);
g.add(st);
for (var l = 0; l < 4; l++) {
var lf = new THREE.Mesh(lkxPetalGeo(0.08, 0.36, 0.04), leafM);
lf.scale.setScalar(h * 0.9);
lf.position.y = h * (0.2 + l * 0.14);
lf.rotation.set(-1.0, l * 1.9, 0);
g.add(lf);
}
var head = new THREE.Group();
head.position.y = h;
g.add(head);
var pm = lkwLam(D.col, { ds: 1 }), s = h / (kind === "daisy" || kind === "violet" ? 0.5 : 1.4);
if (D.spike) {
for (var k = 0; k < 14; k++) {
var b = new THREE.Mesh(lkwGeo("lkxLk", function () { return new THREE.SphereGeometry(0.035, 6, 5); }), pm);
b.position.set(Math.cos(k * 2.3) * 0.04, -0.4 + k * 0.04, Math.sin(k * 2.3) * 0.04);
head.add(b);
}
}
for (var i = 0; i < D.n; i++) {
var p = new THREE.Mesh(lkxPetalGeo(D.w, D.l, D.cup), pm), a = i / D.n * 6.283;
p.scale.setScalar(s);
if (D.rose) {
var ring = (i % 3), rr = 0.5 + ring * 0.25;
p.rotation.set(-0.3 - ring * 0.35, a, 0);
p.scale.setScalar(s * rr);
}
else
p.rotation.set(-1.15, a, 0);
p.rotation.order = "YXZ";
head.add(p);
if (D.dot && i % 1 === 0)
for (var d = 0; d < 3; d++) {
var dt = new THREE.Mesh(lkwGeo("lkxDot", function () { return new THREE.SphereGeometry(0.012, 5, 4); }), lkwLam(D.dot));
var r = D.l * s * (0.35 + d * 0.18);
dt.position.set(Math.sin(a) * r * 0.9, 0.04 + d * 0.03, Math.cos(a) * r * 0.9);
head.add(dt);
}
}
var fr = (kind === "daisy" ? 0.045 : kind === "violet" ? 0.05 : 0.09) * Math.max(0.6, s * 0.9), f = new THREE.Mesh(lkwGeo("lkxFace", function () { var q = new THREE.SphereGeometry(1, 14, 10); q.scale(1, 1, 0.6); return q; }), lkwLam(D.face));
f.scale.setScalar(fr);
f.position.set(0, 0.02, fr * 0.4);
head.add(f);
var ey = lkwLam(0x1A1210);
[-1, 1].forEach(function (sd) { var e = new THREE.Mesh(lkwGeo("lkxFe", function () { return new THREE.SphereGeometry(1, 6, 5); }), ey); e.scale.setScalar(fr * 0.16); e.position.set(sd * fr * 0.35, 0.02 + fr * 0.2, fr * 0.95); head.add(e); });
var mo = new THREE.Mesh(lkwGeo("lkxFm", function () { return new THREE.TorusGeometry(1, 0.25, 4, 10, Math.PI); }), lkwLam(0x8A2A22));
mo.scale.setScalar(fr * 0.3);
mo.rotation.z = Math.PI;
mo.position.set(0, 0.02 - fr * 0.3, fr * 0.98);
head.add(mo);
head.rotation.x = 0.25;
g.userData.flower = { head: head, ph: R() * 6 };
g.userData.live = 1;
g.userData.keep = 1;
return g;
},
function () {
var g = new THREE.Group(), w = lkwMat("oak"), red = lkwLam(0xB82A2A), body = new THREE.Group();
g.add(body);
var bd = new THREE.Mesh(lkwGeo("lkxRhB", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 0.34, 10); c.rotateX(Math.PI / 2); return c; }), lkwLam(0xE8DCC8));
body.add(bd);
var hd = new THREE.Mesh(lkwGeo("lkxRhH", function () { var c = new THREE.CylinderGeometry(0.04, 0.06, 0.18, 8); c.rotateX(-0.6); return c; }), lkwLam(0xE8DCC8));
hd.position.set(0, 0.12, 0.18);
body.add(hd);
var mn = new THREE.Mesh(lkwBoxG(0.02, 0.1, 0.16), lkwLam(0x2A1A10));
mn.position.set(0, 0.16, 0.12);
body.add(mn);
[-1, 1].forEach(function (sx) {
[-1, 1].forEach(function (sz) { var l = new THREE.Mesh(lkwBoxG(0.025, 0.16, 0.025), w); l.position.set(sx * 0.05, -0.14, sz * 0.12); l.rotation.x = sz * 0.3; body.add(l); });
var rk = new THREE.Mesh(lkwGeo("lkxRk", function () { return new THREE.TorusGeometry(0.3, 0.015, 4, 16, 1.4); }), red);
rk.rotation.set(0, Math.PI / 2, Math.PI * 1.5 - 0.7);
rk.position.set(sx * 0.05, 0.08, 0);
body.add(rk);
var wg = new THREE.Mesh(lkwGeo("lkxRhW", function () { var p = new THREE.PlaneGeometry(0.3, 0.12); p.translate(0.15, 0, 0); return p; }), lkwLam(0xD8C8A8, { ds: 1 }));
wg.position.set(sx * 0.07, 0.06, 0);
wg.rotation.y = sx > 0 ? 0 : Math.PI;
body.add(wg);
});
g.userData.fly = { kind: "rock", body: body };
return g;
},
function () {
var g = new THREE.Group(), body = new THREE.Group();
g.add(body);
var pud = new THREE.Mesh(lkwGeo("lkxSdB", function () { var s = new THREE.SphereGeometry(0.12, 12, 8); s.scale(1, 0.9, 1.5); return s; }), lkwLam(0x5A3020));
body.add(pud);
for (var i = 0; i < 10; i++) {
var r = new THREE.Mesh(lkwGeo("lkxSdR", function () { return new THREE.SphereGeometry(0.015, 5, 4); }), lkwLam(0x2A1410));
r.position.set(Math.cos(i * 2.1) * 0.11, Math.sin(i * 1.3) * 0.08, Math.sin(i * 2.1) * 0.16);
body.add(r);
}
[-1, 1].forEach(function (sd) {
for (var j = 0; j < 2; j++) {
var h = new THREE.Mesh(lkxPetalGeo(0.08, 0.32, 0.04), lkwShine(0x1E5A28, 0.35, 0.0));
h.rotation.set(0, 0, sd * (Math.PI / 2 - 0.2 - j * 0.3));
h.position.set(sd * 0.06, 0.06, 0.04 - j * 0.1);
body.add(h);
}
var b = new THREE.Mesh(lkwGeo("lkxBer", function () { return new THREE.SphereGeometry(0.02, 6, 5); }), lkwLam(0xC81A1A));
b.position.set(sd * 0.03, 0.12, 0.06);
body.add(b);
});
var hd = new THREE.Mesh(lkwGeo("lkxSdH", function () { return new THREE.SphereGeometry(0.04, 8, 6); }), lkwLam(0x3A1A10));
hd.position.set(0, 0.04, 0.2);
body.add(hd);
var fl = new THREE.Mesh(lkwGeo("lkxSdF", function () { var c = new THREE.ConeGeometry(0.035, 0.12, 8, 1, true); c.translate(0, 0.06, 0); return c; }), new THREE.MeshBasicMaterial({ color: 0x6A8AFF, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
fl.position.set(0, 0.07, 0.2);
body.add(fl);
g.userData.fly = { kind: "snap", body: body, flame: fl };
return g;
},
function () {
var g = new THREE.Group(), body = new THREE.Group();
g.add(body);
var cr = new THREE.Mesh(lkwGeo("lkxBbB", function () { var c = new THREE.CylinderGeometry(0.02, 0.02, 0.16, 6); c.rotateX(Math.PI / 2); return c; }), lkwLam(0xA8743A));
body.add(cr);
var su = new THREE.Mesh(lkwBoxG(0.04, 0.04, 0.04), lkwLam(0xFAFAFA));
su.position.set(0, -0.02, 0.1);
body.add(su);
var wings = [];
[-1, 1].forEach(function (sd) { var w = new THREE.Group(); w.position.x = sd * 0.015; body.add(w); var sl = new THREE.Mesh(lkwBoxG(0.16, 0.006, 0.13), lkwLam(0xF4E4B8)); sl.position.x = sd * 0.08; w.add(sl); var bu = new THREE.Mesh(lkwBoxG(0.14, 0.004, 0.11), lkwLam(0xF8E070)); bu.position.set(sd * 0.08, 0.005, 0); w.add(bu); var cs = new THREE.Mesh(lkwBoxG(0.17, 0.012, 0.012), lkwLam(0xA8743A)); cs.position.set(sd * 0.08, 0, 0.065); w.add(cs); wings.push(w); });
g.userData.fly = { kind: "bread", body: body, wings: wings };
return g;
},
function (g, t) {
var F = g.userData.fly;
if (!F)
return;
var ph = g.id * 0.7;
if (F.kind === "rock") {
F.body.rotation.x = Math.sin(t * 1.6 + ph) * 0.35;
}
else if (F.kind === "snap") {
F.body.position.y = Math.sin(t * 1.3 + ph) * 0.05;
F.flame.scale.set(1, 0.8 + Math.abs(Math.sin(t * 9 + ph)) * 0.5, 1);
}
else {
F.wings[0].rotation.z = Math.sin(t * 6 + ph) * 0.6;
F.wings[1].rotation.z = -Math.sin(t * 6 + ph) * 0.6;
F.body.position.y = Math.sin(t * 1.5 + ph) * 0.08;
}
},
function (G) {
var H = lkwHomeH, lite = lkwLite(), R = wRand(701), Hs = LKW_HO.house;
lkwTerrain(G, -220, -220, 440, 440, lite ? 6 : 3, H, lkwMat("snow"), function (x, z, y, c) { var g = 0.92 + lkwFbm(x * 0.06, z * 0.06, 2) * 0.08; c.setRGB(0.93 * g, 0.95 * g, 0.99 * g); });
lkwStrip(G, LKW_HO.lane, 3.0, H, lkwMat("slush"), 0.04);
lkwStrip(G, [[3.5, 7], [2, 16], [0, 26]], 1.6, H, lkwMat("slush"), 0.04);
var hy = H(Hs[0], Hs[1]);
lkwVilla(G, Hs[0], Hs[1], { y: hy, w: 14, d: 10, h: 9, ry: 0 });
var sr = lkwBox(G, 14.6, 0.3, 10.6, lkwMat("snowroof"), Hs[0], hy + 9.05, Hs[1]);
for (var s = 0; s < 6; s++)
lkwBox(G, 1.6, 0.08, 0.4, lkwMat("snow"), -5 + s * 2, hy + (s % 2 ? 1.7 : 4.9), Hs[1] + 5.2);
lkwSolid(Hs[0], Hs[1], 14.4, 10.4, hy - 1, hy + 12);
[[-1.6, 4.2], [1.6, 4.2]].forEach(function (c) { var ch = lkwBox(G, 1, 2.4, 1, lkwMat("brick"), Hs[0] + c[0] * 3, hy + 9, Hs[1] + c[1] * 0.6); lkwSmoke(G, Hs[0] + c[0] * 3, hy + 11.6, Hs[1] + c[1] * 0.6, 0xE0E0E8, 6); });
var wall = [[-26, 24], [-3, 24]], wall2 = [[3, 24], [26, 24]], wall3 = [[-26, 24], [-26, -20]], wall4 = [[26, 24], [26, -20]];
[wall, wall2, wall3, wall4].forEach(function (w) { var a = w[0], b = w[1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2, ry = Math.atan2(b[0] - a[0], b[1] - a[1]); lkwBox(G, 0.5, 1.4, L, lkwMat("brick"), cx, H(cx, cz) - 0.2, cz, ry); lkwBox(G, 0.62, 0.12, L, lkwMat("snow"), cx, H(cx, cz) + 1.2, cz, ry); lkwSolid(cx, cz, 0.6, L, H(cx, cz) - 1, H(cx, cz) + 2, -ry); });
[-3, 3].forEach(function (x) { lkwBox(G, 0.6, 1.9, 0.6, lkwMat("ashlar"), x, H(x, 24) - 0.2, 24); lkwCyl(G, 0.26, 0.26, 0.1, lkwMat("snow"), x, H(x, 24) + 1.7, 24, 10); });
var bare = lkwScatter(702, lite ? 14 : 40, -210, -210, 210, 210, function (x, z) { return Math.hypot(x, z) > 34 && lkwPathD(x, z, LKW_HO.lane) > 6; }, H, 0.8, 1.4);
lkwInst(G, lkxTreeGeo("oak"), lkwMat("darkbark"), bare, { shadow: !lite });
bare.forEach(function (t) { lkwRound(t.x, t.z, 0.6 * (t.s || 1), (t.y || 0) - 1, (t.y || 0) + 6); });
var birches = lkwScatter(705, lite ? 6 : 18, -200, -200, 200, 200, function (x, z) { return Math.hypot(x, z) > 30 && lkwPathD(x, z, LKW_HO.lane) > 5; }, H, 0.8, 1.2);
lkwInst(G, lkxTreeGeo("birch"), lkwS("b:limestone", 0xE8E4DC, 1.2), birches, {});
var holly = lkwScatter(703, lite ? 6 : 16, -26, -20, 26, 24, function (x, z) { return Math.abs(x) > 9 && Math.abs(x) < 24 && z > -18 && z < 22; }, H, 0.28, 0.42);
lkxTrees(G, "pine", holly, [0x1E3A22]);
lkwPlant(G, "bush", lkwScatter(704, lite ? 20 : 60, -25, -19, 25, 23, function (x, z) { return (Math.abs(x) > 8 || z < -6) && Math.abs(x) < 24; }, H, 0.5, 0.9), { col: 0x6A7A6A, keepAll: 1 });
var dx = Hs[0] + 3.5, dz = Hs[1] + 5;
[-1, 1].forEach(function (s) { lkwCyl(G, 0.14, 0.16, 2.9, lkwLam(0xF2EEE2), dx + s * 1.0, hy, dz + 1.3, 12); });
lkwBox(G, 2.6, 0.24, 1.6, lkwLam(0xF2EEE2), dx, hy + 2.9, dz + 0.7);
lkwBox(G, 2.7, 0.12, 1.7, lkwMat("snow"), dx, hy + 3.14, dz + 0.7);
lkwBox(G, 2.4, 0.16, 1.8, lkwMat("ashlar"), dx, hy - 0.1, dz + 0.8);
var wr = new THREE.Mesh(lkwGeo("lkWreath", function () { return new THREE.TorusGeometry(0.22, 0.07, 8, 18); }), lkwLam(0x1E4A22));
wr.position.set(dx, hy + 1.6, dz + 0.08);
G.add(wr);
for (var b = 0; b < 9; b++) {
var a = b / 9 * 6.283, be = new THREE.Mesh(lkwGeo("lkBerry", function () { return new THREE.SphereGeometry(0.03, 6, 5); }), lkwGlowM(0xC81E1E, 0.5));
be.position.set(dx + Math.cos(a) * 0.22, hy + 1.6 + Math.sin(a) * 0.22, dz + 0.14);
G.add(be);
}
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.5, 16, 0, Math.PI), lkwGlowM(0xFFD898, 0.9));
fan.position.set(dx, hy + 2.35, dz + 0.04);
G.add(fan);
var Lw = lkxGlowStart();
[[-3.5, 1.5], [3.5, 1.5], [-3.5, 4.8], [3.5, 4.8], [0, 4.8]].forEach(function (q) { var wp = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.6), lkwGlowM(0xFFC878, 0.75)); wp.position.set(Hs[0] + q[0], hy + q[1] + 0.8, dz + 0.03); G.add(wp); lkxGlow(Lw, Hs[0] + q[0], hy + q[1] + 0.8, dz + 0.3, 0xFFB860, 2.2); });
lkxGlowDone(G, Lw);
var sm = new THREE.Group();
sm.position.set(-12, H(-12, 14), 14);
G.add(sm);
[[0.7, 0.6], [0.5, 1.55], [0.34, 2.2]].forEach(function (q) { var b = new THREE.Mesh(lkwGeo("lkSnB" + q[0], function () { return new THREE.SphereGeometry(q[0], 14, 10); }), lkwMat("snow")); b.position.y = q[1]; sm.add(b); });
lkwCyl(sm, 0.26, 0.26, 0.04, lkwLam(0x1A1A1A), 0, 2.46, 0, 12);
lkwCyl(sm, 0.18, 0.2, 0.32, lkwLam(0x1A1A1A), 0, 2.48, 0, 12);
[-0.1, 0.1].forEach(function (e) { lkwBox(sm, 0.05, 0.05, 0.04, lkwLam(0x141414), e, 2.26, 0.3); });
var ns = lkwCyl(sm, 0.0, 0.05, 0.24, lkwLam(0xE07A2A), 0, 2.1, 0.38, 8);
ns.rotation.x = Math.PI / 2;
ns.position.y = 2.1;
for (var bt = 0; bt < 3; bt++)
lkwBox(sm, 0.06, 0.06, 0.04, lkwLam(0x141414), 0, 1.3 + bt * 0.22, 0.48 - Math.abs(bt - 1) * 0.03);
lkwRound(-12, 14, 0.8, H(-12, 14) - 1, H(-12, 14) + 3);
lkwLamp(G, 6, 30, H, {});
lkwLamp(G, -80, 64, H, {});
var F = LKW_HO.fire, fy = H(F[0], F[1]), bf = new THREE.Group();
bf.position.set(F[0], fy, F[1]);
G.add(bf);
for (var i = 0; i < 34; i++) {
var a = R() * 6.283, st = lkwCyl(bf, 0.04, 0.05, 2 + R() * 1.4, lkwMat("bark"), Math.cos(a) * 0.4, 0.5, Math.sin(a) * 0.4, 5);
st.rotation.set(Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5);
}
lkwRound(F[0], F[1], 1.4, fy - 1, fy + 3);
lkwCart(G, F[0] + 5, F[1] - 3, 0.6, { load: 4, y: H(F[0] + 5, F[1] - 3) });
lkwOne("hoboy1", "A boy with an armful of sticks", "m", "boy", F[0] + 3, F[1] + 2, 2.4, "We're getting in sticks for the bonfire, miss. It wants plenty of sticks, Miss Alice!", { child: true, wander: 3 });
lkwOne("hoboy2", "Another boy, blowing on his fingers", "m", "boy", F[0] - 3, F[1] - 1, 0.8, "It's that cold! The snow's coming down ever so thick.", { child: true, wander: 3 });
[[-120, -60, 0.3], [-100, -110, 0.1], [80, -90, -0.2], [130, -40, 0.4], [-160, 30, 1.4], [150, 60, -1.2]].forEach(function (t, i) { var y = H(t[0], t[1]); lkwTownHouse(G, t[0], t[1], 11, 8, 8.5, { y: y, ry: t[2], wall: i % 2 ? "brick" : "ashlar", roof: "snowroof" }); lkwSolid(t[0], t[1], 11.4, 8.4, y - 1, y + 10, -t[2]); });
lkwChurch(G, 40, -170, { ry: 0.2 });
lkwFar(G, H, [0.9, 0.92, 0.96], { edge: 210 });
if (typeof lkwSnowfall === "function")
lkwSnowfall(G, lite ? 400 : 1100, 1.2);
var Rm = LKW.rooms.filter(function (q) { return q.key === "drawing"; })[0];
if (Rm)
lkwDoor(Rm, "The front door of Alice's house", Hs[0] + 3.5, Hs[1] + 6.6, Math.PI);
},
function (P, x, y, z, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var m = lkwLam(col || 0xB83A3A);
var b = new THREE.Mesh(lkwGeo("lkWsB", function () { return new THREE.SphereGeometry(0.07, 10, 8); }), m);
b.position.y = 0.07;
g.add(b);
var R = wRand(Math.round(x * 100)), pts = [], px = 0, pz = 0;
for (var i = 0; i < 30; i++) {
px += (R() - 0.5) * 0.4;
pz += (R() - 0.5) * 0.4;
pts.push(new THREE.Vector3(px, 0.012, pz));
}
var tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.006, 4, false), m);
g.add(tube);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
lkwTable(g, 0, 0, 0.7, 0.7, 0.72, { mat: "darkoak" });
var t = lkwCanvas("lkBoardT", 256, 256, function (c, W, H) { for (var i = 0; i < 8; i++)
for (var j = 0; j < 8; j++) {
c.fillStyle = (i + j) % 2 ? "#3A2418" : "#E8DCC0";
c.fillRect(i * W / 8, j * H / 8, W / 8, H / 8);
} c.strokeStyle = "#C8A048"; c.lineWidth = 6; c.strokeRect(0, 0, W, H); });
var b = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.56), new THREE.MeshLambertMaterial({ map: t }));
b.rotation.x = -Math.PI / 2;
b.position.y = 0.725;
g.add(b);
if (o.pieces !== false) {
var row = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
for (var i = 0; i < 8; i++) {
[["w", -0.245, row[i]], ["w", -0.175, "pawn"], ["r", 0.245, row[i]], ["r", 0.175, "pawn"]].forEach(function (q) { if (o.gone && o.gone.indexOf(q[0] + q[2] + i) >= 0)
return; var p = lkxChessman(q[2] + ":" + q[0], { s: q[2] === "pawn" ? 0.045 : 0.07 }); p.position.set(-0.245 + i * 0.07, 0.725, q[1]); p.rotation.y = q[0] === "w" ? 0 : Math.PI; g.add(p); });
}
}
return g;
},
function (G) {
var X = LKW_ROOMXZ.home, R;
R = lkwRoom(G, "drawing", X.drawing[0], X.drawing[1], 9, 7.6, { wall: "damask", floor: "floor", name: "Alice's drawing-room", h: 3.8, lightI: 0.8, lightCol: 0xFFC890, env: "room" });
LKW.parlour = lkwParlour(R, 1, { seed: 1 });
lkwSpot(R.cx, R.cz - 2.9, 1.6, "The looking-glass over the chimney-piece", "climb up and go through the glass", function () { if (typeof lkbActive === "function" && lkbActive() && lkbStep() && lkbStep().k === "spot")
return; lkwThroughGlass(); }, R.y + 1.3);
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var up = lkwS("b:velvet", col || 0x6A2A2E, 1.2), wd = lkwMat("darkoak");
[[-0.34, 0.28], [0.34, 0.28], [-0.34, -0.3], [0.34, -0.3]].forEach(function (q) { lkwCyl(g, 0.03, 0.022, 0.18, wd, q[0], 0, q[1], 8); });
lkwBox(g, 0.82, 0.22, 0.74, up, 0, 0.18, 0);
lkwBox(g, 0.62, 0.12, 0.6, up, 0, 0.4, 0.04);
var bk = lkwBox(g, 0.8, 0.86, 0.16, up, 0, 0.4, -0.32);
bk.rotation.x = -0.12;
var top = new THREE.Mesh(lkwGeo("lkxWcTop", function () { var c = new THREE.CylinderGeometry(0.4, 0.4, 0.16, 16, 1, false, 0, Math.PI); c.rotateX(Math.PI / 2); c.rotateZ(Math.PI / 2); c.rotateY(Math.PI / 2); return c; }), up);
top.position.set(0, 1.24, -0.37);
top.rotation.set(-0.12, 0, 0);
top.scale.set(1, 0.35, 1);
g.add(top);
[-1, 1].forEach(function (s) {
lkwBox(g, 0.12, 0.24, 0.62, up, s * 0.36, 0.4, 0.02);
var ar = lkwCyl(g, 0.075, 0.075, 0.66, up, 0, 0, 0, 10);
ar.rotation.x = Math.PI / 2;
ar.position.set(s * 0.37, 0.66, 0.02);
var wg = lkwBox(g, 0.1, 0.56, 0.36, up, s * 0.38, 0.66, -0.18);
wg.rotation.y = -s * 0.25;
});
var bt = lkwLam(0x3A1418);
for (var i = 0; i < 3; i++)
for (var j = 0; j < 2; j++)
lkwCyl(g, 0.012, 0.012, 0.02, bt, -0.2 + i * 0.2, 0.62 + j * 0.26, -0.22 - j * 0.035, 6).rotation.x = Math.PI / 2 - 0.12;
lkwSolid(x, z, 0.9, 0.85, -0.2, 1.2, -(ry || 0));
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var up = lkwS("b:velvet", col || 0x3A4A2E, 1.2), wd = lkwMat("darkoak"), W = 1.9;
[-0.85, 0.85].forEach(function (sx) { [0.3, -0.3].forEach(function (sz) { lkwCyl(g, 0.032, 0.022, 0.2, wd, sx, 0, sz, 8); }); });
lkwBox(g, W, 0.12, 0.72, wd, 0, 0.18, 0);
lkwBox(g, W - 0.08, 0.18, 0.68, up, 0, 0.28, 0.01);
var bk = lkwBox(g, W - 0.1, 0.62, 0.14, up, 0, 0.42, -0.3);
bk.rotation.x = -0.1;
var arc = new THREE.Mesh(lkwGeo("lkxSetArc", function () { return new THREE.TorusGeometry(0.95, 0.035, 6, 30, Math.PI); }), wd);
arc.scale.set(1, 0.34, 1);
arc.position.set(0, 0.98, -0.36);
arc.rotation.x = -0.1;
g.add(arc);
var pad = new THREE.Mesh(lkwGeo("lkxSetPad", function () { var c = new THREE.CircleGeometry(0.93, 24, 0, Math.PI); return c; }), up);
pad.scale.set(1, 0.3, 1);
pad.position.set(0, 0.99, -0.36);
pad.rotation.x = -0.1;
g.add(pad);
var bt = lkwLam(0x1E2414);
for (var i = 0; i < 7; i++)
for (var j = 0; j < 2; j++)
lkwCyl(g, 0.012, 0.012, 0.02, bt, -0.75 + i * 0.25 + (j ? 0.125 : 0), 0.62 + j * 0.22, -0.22 - j * 0.025, 6).rotation.x = Math.PI / 2 - 0.1;
[-1, 1].forEach(function (s) {
var ar = lkwCyl(g, 0.13, 0.13, 0.68, up, 0, 0, 0, 12);
ar.rotation.x = Math.PI / 2;
ar.position.set(s * (W / 2 - 0.06), 0.6, 0.02);
lkwBox(g, 0.12, 0.2, 0.64, up, s * (W / 2 - 0.06), 0.4, 0.02);
var bo = lkwCyl(g, 0.09, 0.09, 0.42, lkwS("b:velvet", 0xB8904A, 1), 0, 0, 0, 10);
bo.rotation.z = Math.PI / 2;
bo.position.set(s * (W / 2 - 0.34), 0.5, -0.12);
});
lkwSolid(x, z, 2.0, 0.8, -0.2, 1.0, -(ry || 0));
return g;
},
function (kind, seed) {
return lkwCanvas("lkPaint" + kind + seed, 192, 240, function (c, W, H) {
var R = wRand(seed * 31 + 7);
function blot(x, y, r, col, a) { var gr = c.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, col); gr.addColorStop(1, "rgba(0,0,0,0)"); c.globalAlpha = a || 1; c.fillStyle = gr; c.fillRect(x - r, y - r, r * 2, r * 2); c.globalAlpha = 1; }
if (kind === "lady" || kind === "gent") {
var bg = c.createRadialGradient(W * 0.5, H * 0.35, 10, W * 0.5, H * 0.5, W);
bg.addColorStop(0, kind === "lady" ? "#5A4A36" : "#4A4030");
bg.addColorStop(1, "#120E0A");
c.fillStyle = bg;
c.fillRect(0, 0, W, H);
c.fillStyle = kind === "lady" ? ["#2A3A5A", "#4A1E2A", "#1E3A2A"][seed % 3] : "#141210";
c.beginPath();
c.moveTo(W * 0.12, H);
c.quadraticCurveTo(W * 0.18, H * 0.62, W * 0.5, H * 0.6);
c.quadraticCurveTo(W * 0.82, H * 0.62, W * 0.88, H);
c.fill();
if (kind === "lady") {
c.fillStyle = "#E8D8C4";
c.beginPath();
c.ellipse(W * 0.5, H * 0.62, W * 0.17, H * 0.05, 0, 0, 7);
c.fill();
c.fillStyle = "#F4ECDC";
for (var p = 0; p < 9; p++) {
c.beginPath();
c.arc(W * (0.4 + p * 0.025), H * (0.645 + Math.sin(p / 8 * Math.PI) * 0.02), 2.4, 0, 7);
c.fill();
}
}
else {
c.fillStyle = "#F2ECE0";
c.beginPath();
c.moveTo(W * 0.42, H * 0.6);
c.lineTo(W * 0.5, H * 0.74);
c.lineTo(W * 0.58, H * 0.6);
c.fill();
c.fillStyle = "#1A1A22";
c.fillRect(W * 0.46, H * 0.6, W * 0.08, H * 0.03);
}
c.fillStyle = "#D8B49A";
c.fillRect(W * 0.45, H * 0.47, W * 0.1, H * 0.14);
var fg = c.createRadialGradient(W * 0.46, H * 0.36, 4, W * 0.5, H * 0.4, W * 0.2);
fg.addColorStop(0, "#F2D6BE");
fg.addColorStop(1, "#B08066");
c.fillStyle = fg;
c.beginPath();
c.ellipse(W * 0.5, H * 0.39, W * 0.13, H * 0.11, 0, 0, 7);
c.fill();
c.fillStyle = "#2A1A12";
[0.45, 0.55].forEach(function (ex) { c.beginPath(); c.ellipse(W * ex, H * 0.37, 2.6, 1.8, 0, 0, 7); c.fill(); });
c.strokeStyle = "#8A4A3A";
c.lineWidth = 1.6;
c.beginPath();
c.moveTo(W * 0.47, H * 0.45);
c.quadraticCurveTo(W * 0.5, H * 0.46, W * 0.53, H * 0.45);
c.stroke();
c.strokeStyle = "rgba(90,50,30,.5)";
c.beginPath();
c.moveTo(W * 0.5, H * 0.38);
c.lineTo(W * 0.49, H * 0.42);
c.lineTo(W * 0.51, H * 0.42);
c.stroke();
var hair = kind === "lady" ? ["#3A2414", "#6A4A22", "#1E1410"][seed % 3] : "#3A3026";
c.fillStyle = hair;
if (kind === "lady") {
c.beginPath();
c.ellipse(W * 0.5, H * 0.31, W * 0.15, H * 0.07, 0, Math.PI, 0);
c.fill();
c.beginPath();
c.ellipse(W * 0.36, H * 0.4, W * 0.04, H * 0.08, 0.2, 0, 7);
c.ellipse(W * 0.64, H * 0.4, W * 0.04, H * 0.08, -0.2, 0, 7);
c.fill();
}
else {
c.beginPath();
c.ellipse(W * 0.5, H * 0.3, W * 0.14, H * 0.05, 0, Math.PI, 0);
c.fill();
c.fillRect(W * 0.37, H * 0.36, W * 0.03, H * 0.1);
c.fillRect(W * 0.6, H * 0.36, W * 0.03, H * 0.1);
}
blot(W * 0.4, H * 0.3, W * 0.25, "rgba(255,230,190,.25)", 1);
}
else if (kind === "land") {
var sk = c.createLinearGradient(0, 0, 0, H * 0.55);
sk.addColorStop(0, "#7A98B8");
sk.addColorStop(1, "#F0DCB0");
c.fillStyle = sk;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 6; i++)
blot(R() * W, R() * H * 0.3, 30 + R() * 30, "rgba(255,250,240,.7)", 0.8);
c.fillStyle = "#4A5A2E";
c.fillRect(0, H * 0.55, W, H * 0.45);
c.fillStyle = "#8AA0B0";
c.beginPath();
c.moveTo(0, H * 0.72);
c.quadraticCurveTo(W * 0.5, H * 0.6, W, H * 0.74);
c.lineTo(W, H * 0.82);
c.quadraticCurveTo(W * 0.5, H * 0.7, 0, H * 0.84);
c.fill();
for (i = 0; i < 14; i++) {
var tx = R() * W, ty = H * (0.42 + R() * 0.14);
c.fillStyle = ["#2A3A1E", "#3A4A22", "#24301A"][i % 3];
c.beginPath();
c.ellipse(tx, ty, 10 + R() * 14, 16 + R() * 16, 0, 0, 7);
c.fill();
}
for (i = 0; i < 4; i++) {
var cx = W * (0.2 + R() * 0.6), cy = H * (0.86 + R() * 0.08);
c.fillStyle = i % 2 ? "#E8E0D0" : "#6A3A22";
c.fillRect(cx, cy, 12, 6);
c.fillRect(cx + 10, cy - 3, 4, 4);
c.fillRect(cx + 1, cy + 6, 2, 4);
c.fillRect(cx + 9, cy + 6, 2, 4);
}
var vg = c.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.8);
vg.addColorStop(0, "rgba(0,0,0,0)");
vg.addColorStop(1, "rgba(40,24,8,.55)");
c.fillStyle = vg;
c.fillRect(0, 0, W, H);
}
else {
var s2 = c.createLinearGradient(0, 0, 0, H * 0.6);
s2.addColorStop(0, "#5A6A7A");
s2.addColorStop(1, "#D8C8A0");
c.fillStyle = s2;
c.fillRect(0, 0, W, H);
c.fillStyle = "#2A4A5A";
c.fillRect(0, H * 0.6, W, H * 0.4);
for (i = 0; i < 40; i++) {
c.fillStyle = "rgba(240,240,230,.5)";
c.fillRect(R() * W, H * (0.62 + R() * 0.36), 6 + R() * 14, 1.5);
}
c.fillStyle = "#2A1E14";
c.beginPath();
c.moveTo(W * 0.3, H * 0.62);
c.lineTo(W * 0.62, H * 0.62);
c.lineTo(W * 0.58, H * 0.66);
c.lineTo(W * 0.34, H * 0.66);
c.fill();
c.fillRect(W * 0.45, H * 0.3, 2, H * 0.32);
c.fillStyle = "#EAE2CC";
c.beginPath();
c.moveTo(W * 0.46, H * 0.32);
c.lineTo(W * 0.58, H * 0.5);
c.lineTo(W * 0.46, H * 0.58);
c.fill();
c.beginPath();
c.moveTo(W * 0.44, H * 0.34);
c.lineTo(W * 0.34, H * 0.56);
c.lineTo(W * 0.44, H * 0.58);
c.fill();
}
});
},
function (P, x, y, z, ry, w, h, tex, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var gi = lkxGilt();
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: tex }));
m.position.z = 0.05;
g.add(m);
if (o.oval) {
var fr = new THREE.Mesh(lkwGeo("lkxOvF", function () { return new THREE.TorusGeometry(0.5, 0.045, 8, 40); }), gi);
fr.scale.set(w * 0.98, h * 0.98, 1);
fr.position.z = 0.06;
g.add(fr);
var bd = lkwBox(g, w + 0.14, h + 0.14, 0.04, gi, 0, -h / 2 - 0.07, 0.01);
}
else {
[[0, h / 2 + 0.05, w + 0.2, 0.1], [0, -h / 2 - 0.05, w + 0.2, 0.1]].forEach(function (b) { lkwBox(g, b[2], b[3], 0.09, gi, b[0], b[1] - b[3] / 2, 0.03); });
[-1, 1].forEach(function (s) { lkwBox(g, 0.1, h, 0.09, gi, s * (w / 2 + 0.05), -h / 2, 0.03); });
}
lkwBox(g, 0.01, 0.5, 0.01, lkwLam(0x8A6A3A), -w * 0.3, h / 2 + 0.02, 0.0).rotation.z = -0.3;
lkwBox(g, 0.01, 0.5, 0.01, lkwLam(0x8A6A3A), w * 0.3, h / 2 + 0.02, 0.0).rotation.z = 0.3;
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var gi = lkxGilt(), bm = lkwShine(0x141210, 0.25, 0.1);
lkwBox(g, 0.46, 0.06, 0.2, bm, 0, 0, 0);
lkwBox(g, 0.34, 0.3, 0.16, bm, 0, 0.06, 0);
lkwBox(g, 0.38, 0.03, 0.18, gi, 0, 0.36, 0);
var dm = new THREE.Mesh(lkwGeo("lkxClkDm", function () { return new THREE.SphereGeometry(0.1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), gi);
dm.position.y = 0.39;
g.add(dm);
lkwCyl(g, 0.02, 0.03, 0.08, gi, 0, 0.48, 0, 8);
var face = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), new THREE.MeshLambertMaterial({ map: lkwCanvas(o.faceKey || "lkClkDial", 128, 128, o.face || function (c, W, H) { c.fillStyle = "#F4ECD8"; c.beginPath(); c.arc(W / 2, H / 2, W / 2, 0, 7); c.fill(); c.fillStyle = "#1A1410"; c.font = "bold 14px Georgia"; c.textAlign = "center"; c.textBaseline = "middle"; ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"].forEach(function (n, i) { var a = i / 12 * 6.283 - Math.PI / 2; c.fillText(n, W / 2 + Math.cos(a) * W * 0.38, H / 2 + Math.sin(a) * H * 0.38); }); c.lineWidth = 4; c.strokeStyle = "#1A1410"; c.beginPath(); c.moveTo(W / 2, H / 2); c.lineTo(W / 2 + W * 0.18, H / 2 - H * 0.12); c.moveTo(W / 2, H / 2); c.lineTo(W / 2, H * 0.18); c.stroke(); }) }));
face.position.set(0, 0.21, 0.081);
g.add(face);
var bz = new THREE.Mesh(lkwGeo("lkxClkBz", function () { return new THREE.TorusGeometry(0.105, 0.012, 6, 24); }), gi);
bz.position.set(0, 0.21, 0.082);
g.add(bz);
var sh = new THREE.Mesh(lkwGeo("lkxShade", function () { var c = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 18, 1, true); var t = new THREE.SphereGeometry(0.2, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2); t.translate(0, 0.25, 0); return gwMerge([c.toNonIndexed(), t.toNonIndexed()]); }), lkwShine(0xEEF4F8, 0.05, 0.1));
sh.material.transparent = true;
sh.material.opacity = 0.18;
sh.material.depthWrite = false;
sh.scale.set(1.2, 1, 0.6);
sh.position.y = 0.31;
g.add(sh);
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var rw = lkwShine(0x3A1810, 0.35, 0.05);
lkwBox(g, 1.42, 1.22, 0.56, rw, 0, 0, -0.08);
lkwBox(g, 1.36, 0.06, 0.3, rw, 0, 0.72, 0.3);
lkwBox(g, 1.24, 0.04, 0.2, lkwLam(0xF4EEE0), 0, 0.74, 0.26);
for (var k = 0; k < 36; k++)
if ([1, 3, 6, 8, 10].indexOf(k % 12) >= 0)
lkwBox(g, 0.018, 0.035, 0.11, lkwLam(0x141210), -0.6 + k * 0.034, 0.77, 0.22);
var silk = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.4), lkwS("b:velvet", 0x7A2A2A, 1));
silk.position.set(0, 1.0, 0.205);
g.add(silk);
lkwBox(g, 0.5, 0.32, 0.01, lkwLam(0xF0E8D2), 0, 0.84, 0.215).rotation.x = -0.15;
[-0.62, 0.62].forEach(function (s) { lkwCyl(g, 0.018, 0.018, 0.2, rw, s, 0.06, 0.3, 6); lkwCyl(g, 0.12, 0.14, 0.06, rw, s, 0, 0.3, 8); });
var stl = new THREE.Group();
stl.position.set(0, 0, 0.75);
g.add(stl);
lkwCyl(stl, 0.18, 0.18, 0.08, lkwS("b:velvet", 0x5A1E22, 1), 0, 0.48, 0, 14);
lkwCyl(stl, 0.04, 0.06, 0.48, rw, 0, 0, 0, 8);
lkwSolid(x, z, 1.5, 0.8, -0.2, 1.3, -(ry || 0));
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = lkwMat("darkoak"), R = wRand(Math.round(x * 77 + z * 13));
[[-0.28, -0.16], [0.28, -0.16], [-0.28, 0.16], [0.28, 0.16]].forEach(function (q) { lkwCyl(g, 0.018, 0.018, 1.5, wd, q[0], 0, q[1], 6); });
for (var s = 0; s < 5; s++) {
var y = 0.12 + s * 0.33;
lkwBox(g, 0.64, 0.025, 0.38, wd, 0, y, 0);
for (var i = 0; i < 3; i++) {
var col = [0xF0F0F4, 0x3A5A9A, 0xD8A040, 0x8AB0A0, 0xC86A6A][(s + i) % 5], px = -0.2 + i * 0.2;
if (R() < 0.5)
lkwCyl(g, 0.03, 0.05, 0.12 + R() * 0.08, lkwShine(col, 0.2, 0.05), px, y + 0.025, 0, 10);
else {
var b = new THREE.Mesh(lkwGeo("lkxWnB", function () { return new THREE.SphereGeometry(0.05, 10, 8); }), lkwShine(col, 0.2, 0.05));
b.position.set(px, y + 0.07, 0);
g.add(b);
}
}
}
var dm = new THREE.Mesh(lkwGeo("lkxBirdDm", function () { var c = new THREE.CylinderGeometry(0.12, 0.12, 0.26, 14, 1, true); var t = new THREE.SphereGeometry(0.12, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2); t.translate(0, 0.13, 0); return gwMerge([c.toNonIndexed(), t.toNonIndexed()]); }), lkwShine(0xEEF4F8, 0.05, 0.1));
dm.material.transparent = true;
dm.material.opacity = 0.2;
dm.material.depthWrite = false;
dm.position.y = 1.6;
g.add(dm);
var bird = new THREE.Mesh(lkwGeo("lkxBird", function () { var s = new THREE.SphereGeometry(0.05, 8, 6); s.scale(1.4, 1, 1); return s; }), lkwLam(0x7A4A2A));
bird.position.set(0, 1.58, 0);
g.add(bird);
return g;
},
function (P, x, y, z, ceil, L) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var b = lkxBrass(), gl = lkwGlowM(0xFFE8C0, 0.85);
lkwCyl(g, 0.02, 0.02, ceil - y, b, 0, 0, 0, 6);
var rose = new THREE.Mesh(lkwGeo("lkxRose", function () { return new THREE.CylinderGeometry(0.34, 0.4, 0.05, 24); }), lkwLam(0xF4EEE0));
rose.position.y = ceil - y - 0.03;
g.add(rose);
for (var i = 0; i < 12; i++) {
var a = i / 12 * 6.283, lf = lkwBox(g, 0.08, 0.03, 0.14, lkwLam(0xEAE2D0), Math.cos(a) * 0.26, ceil - y - 0.08, Math.sin(a) * 0.26, -a);
}
var bowl = new THREE.Mesh(lkwGeo("lkxGasB", function () { return new THREE.SphereGeometry(0.12, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), b);
g.add(bowl);
for (i = 0; i < 4; i++) {
a = i / 4 * 6.283 + 0.4;
var ar = new THREE.Mesh(lkwGeo("lkxGasA", function () { return new THREE.TorusGeometry(0.22, 0.014, 6, 12, Math.PI); }), b);
ar.position.set(Math.cos(a) * 0.22, 0.02, Math.sin(a) * 0.22);
ar.rotation.set(0, -a, Math.PI);
g.add(ar);
var gx = Math.cos(a) * 0.44, gz = Math.sin(a) * 0.44;
lkwCyl(g, 0.03, 0.05, 0.05, b, gx, 0.02, gz, 8);
var glb = new THREE.Mesh(lkwGeo("lkxGasG", function () { var s = new THREE.SphereGeometry(0.09, 12, 10); s.scale(1, 1.1, 1); return s; }), gl);
glb.position.set(gx, 0.15, gz);
g.add(glb);
lkxGlow(L, x + gx, y + 0.15, z + gz, 0xFFD8A0, 0.9);
}
return g;
},
function (R, m, o) {
o = o || {};
var G = R.g, W = 9, D = 7.6, H = R.h, lite = lkwLite(), Lg = lkxGlowStart(), out = {};
var wallM = lkwMat("damask"), mar = lkwMat("marble");
if (!lite)
try {
lkxPanelling(G, W, D, H, { h0: 0.9, step: 3, skip: [["s", 0, 1.0], ["n", 0, 1.5]], wood: lkwS("b:oak", 0x4A2614, 1.4) });
}
catch (e) { }
lkwBox(G, W - 0.2, 0.05, 0.05, lkxGilt(), 0, 2.95, -D / 2 + 0.13);
lkwBox(G, W - 0.2, 0.05, 0.05, lkxGilt(), 0, 2.95, D / 2 - 0.13);
[-1, 1].forEach(function (s) { lkwBox(G, 0.05, 0.05, D - 0.2, lkxGilt(), s * (W / 2 - 0.13), 2.95, 0); lkwBox(G, 0.2, 0.22, D - 0.2, lkwLam(0xF0EAD8), s * (W / 2 - 0.18), H - 0.22, 0); });
lkwBox(G, W - 0.2, 0.22, 0.2, lkwLam(0xF0EAD8), 0, H - 0.22, -D / 2 + 0.18);
lkwBox(G, W - 0.2, 0.22, 0.2, lkwLam(0xF0EAD8), 0, H - 0.22, D / 2 - 0.18);
lkwBox(G, 2.6, H, 0.36, wallM, 0, 0, -D / 2 + 0.26);
var cp = new THREE.Group();
cp.position.set(0, 0, -D / 2 + 0.48);
G.add(cp);
lkwBox(cp, 2.1, 0.06, 0.9, mar, 0, 0, 0.38);
[-1, 1].forEach(function (s) { lkwBox(cp, 0.3, 1.16, 0.2, mar, s * 0.82, 0.06, 0); lkwBox(cp, 0.36, 0.12, 0.24, mar, s * 0.82, 1.06, 0.01); var cb = new THREE.Mesh(lkwGeo("lkxCorbel", function () { var c = new THREE.CylinderGeometry(0.09, 0.06, 0.2, 10); return c; }), mar); cb.position.set(s * 0.82, 0.98, 0.12); cp.add(cb); });
lkwBox(cp, 1.94, 0.22, 0.2, mar, 0, 1.18, 0);
lkwBox(cp, 2.3, 0.07, 0.36, mar, 0, 1.4, 0.05);
lkwBox(cp, 1.34, 1.0, 0.12, lkwLam(0x141210), 0, 0.06, -0.06);
var grate = new THREE.Group();
grate.position.set(0, 0.06, 0.02);
cp.add(grate);
var ir = lkwShine(0x1E1E1E, 0.5, 0.6);
lkwBox(grate, 0.86, 0.36, 0.3, ir, 0, 0.06, 0);
for (var gb = 0; gb < 6; gb++)
lkwBox(grate, 0.02, 0.36, 0.02, ir, -0.36 + gb * 0.144, 0.06, 0.16);
lkwBox(grate, 1.04, 0.06, 0.06, lkwMat("brass"), 0, 0.42, 0.16);
lkwFire(grate, 0, 0.18, 0.02, 0.75);
lkxGlow(Lg, 0, 0.5, -D / 2 + 0.6, 0xFF9A40, 1.6);
var fend = new THREE.Group();
fend.position.set(0, 0.06, -D / 2 + 1.12);
G.add(fend);
var br = lkxBrass();
lkwBox(fend, 1.9, 0.16, 0.04, br, 0, 0, 0);
[-1, 1].forEach(function (s) { lkwBox(fend, 0.04, 0.16, 0.5, br, s * 0.93, 0, -0.25); });
for (var fi = 0; fi < 3; fi++) {
var ft = lkwCyl(G, 0.012, 0.012, 0.78, br, m * (1.24 - fi * 0.05), 0.06, -D / 2 + 0.95, 6);
ft.rotation.z = m * 0.08;
}
lkwCyl(G, 0.09, 0.12, 0.04, br, m * 1.2, 0.06, -D / 2 + 0.95, 10);
var sc = new THREE.Group();
sc.position.set(-m * 1.3, 0.06, -D / 2 + 0.95);
G.add(sc);
lkwCyl(sc, 0.18, 0.14, 0.34, lkwShine(0x2A1A10, 0.4, 0.3), 0, 0, 0, 12);
lkwCyl(sc, 0.2, 0.18, 0.04, br, 0, 0.34, 0, 12);
lkwBox(sc, 0.06, 0.04, 0.3, br, 0, 0.42, 0);
out.clock = lkxMantelClock(G, 0, 1.47, -D / 2 + 0.55, { face: o.face, faceKey: o.faceKey });
[-1, 1].forEach(function (s) {
var v = new THREE.Mesh(lkwGeo("lkxVase", function () { var pts = []; for (var i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(new THREE.Vector2(0.03 + Math.sin(t * Math.PI) * 0.07 + (t > 0.85 ? 0.03 : 0), t * 0.36));
} return new THREE.LatheGeometry(pts, 14); }), lkwShine(0x2A4A8A, 0.2, 0.05));
v.position.set(s * 0.6, 1.47, -D / 2 + 0.55);
G.add(v);
lkwCyl(G, 0.04, 0.06, 0.26, lkxBrass(), s * 0.92, 1.47, -D / 2 + 0.55, 8);
lkxGlow(Lg, s * 0.92, 1.98, -D / 2 + 0.55, 0xFFC060, 0.5);
var dog = new THREE.Group();
dog.position.set(s * 0.3, 1.47, -D / 2 + 0.6);
dog.rotation.y = -s * 0.4;
G.add(dog);
var wc = lkwShine(0xF4F0E8, 0.2, 0.05);
lkwCyl(dog, 0.045, 0.06, 0.14, wc, 0, 0, 0, 10);
var hd = new THREE.Mesh(lkwGeo("lkxDogH", function () { return new THREE.SphereGeometry(0.04, 10, 8); }), wc);
hd.position.y = 0.17;
dog.add(hd);
[-1, 1].forEach(function (e) { lkwBox(dog, 0.02, 0.05, 0.015, lkwLam(0xC8803A), e * 0.035, 0.13, 0); });
});
lkxCandles(G, [{ x: -0.92, y: 1.73, z: -D / 2 + 0.55, h: 0.2 }, { x: 0.92, y: 1.73, z: -D / 2 + 0.55, h: 0.2 }], Lg, {});
out.mirror = lkxMirror(G, 0, 1.86, -D / 2 + 0.46, 1.86, 1.24, 0, {});
try {
[-1, 1].forEach(function (s) { lkxSconce(G, s * 1.12, 2.1, -D / 2 + 0.45, 0, Lg, []); });
}
catch (e) { }
var tk = lkwCanvas("lkTurkey", 256, 192, function (c, W2, H2) {
c.fillStyle = "#7A1E1A";
c.fillRect(0, 0, W2, H2);
c.strokeStyle = "#1E2A4A";
c.lineWidth = 12;
c.strokeRect(10, 10, W2 - 20, H2 - 20);
c.strokeStyle = "#D8B060";
c.lineWidth = 3;
c.strokeRect(20, 20, W2 - 40, H2 - 40);
c.strokeRect(28, 28, W2 - 56, H2 - 56);
for (var i = 0; i < 3; i++) {
var cx = W2 * (0.27 + i * 0.23), cy = H2 / 2;
c.fillStyle = "#1E2A4A";
c.beginPath();
c.moveTo(cx, cy - 40);
c.lineTo(cx + 28, cy);
c.lineTo(cx, cy + 40);
c.lineTo(cx - 28, cy);
c.fill();
c.fillStyle = "#D8B060";
c.beginPath();
c.moveTo(cx, cy - 22);
c.lineTo(cx + 14, cy);
c.lineTo(cx, cy + 22);
c.lineTo(cx - 14, cy);
c.fill();
c.fillStyle = "#3A6A4A";
c.fillRect(cx - 4, cy - 4, 8, 8);
}
for (var y = 36; y < H2 - 30; y += 10)
for (var x = 36; x < W2 - 30; x += 10)
if ((x * 7 + y * 3) % 23 < 3) {
c.fillStyle = "#C88A3A";
c.fillRect(x, y, 3, 3);
}
});
var cp2 = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 4.6), new THREE.MeshLambertMaterial({ map: tk }));
cp2.rotation.x = -Math.PI / 2;
cp2.position.set(0, 0.008, 0.4);
G.add(cp2);
var hr = lkwCanvas("lkHearthRug", 128, 64, function (c, W2, H2) { c.fillStyle = "#2A3A2A"; c.fillRect(0, 0, W2, H2); c.fillStyle = "#C8A060"; for (var i = 0; i < W2; i += 6)
c.fillRect(i, 0, 2, 4), c.fillRect(i, H2 - 4, 2, 4); c.fillStyle = "#8A2A2A"; c.beginPath(); c.ellipse(W2 / 2, H2 / 2, W2 * 0.3, H2 * 0.28, 0, 0, 7); c.fill(); c.fillStyle = "#E8C88A"; c.beginPath(); c.ellipse(W2 / 2, H2 / 2, W2 * 0.14, H2 * 0.12, 0, 0, 7); c.fill(); });
var hrm = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.95), new THREE.MeshLambertMaterial({ map: hr }));
hrm.rotation.x = -Math.PI / 2;
hrm.position.set(0, 0.014, -D / 2 + 1.7);
G.add(hrm);
out.chair = lkxWingChair(G, m * -1.7, -D / 2 + 1.9, m * 0.75, 0x6A2A2E);
lkxWingChair(G, m * 1.8, -D / 2 + 1.95, -m * 0.8, 0x2E3A5A);
lkxSettee(G, m * -3.8, 0.6, m * Math.PI / 2, 0x3A4A2E);
var st2 = new THREE.Group();
st2.position.set(m * -2.6, 0, 0.6);
G.add(st2);
lkwTable(st2, 0, 0, 0.6, 1.1, 0.5, { mat: "darkoak" });
if (!o.book)
lkfPlates(st2, 0, 0.5, 0, 2, [0.14, 0.3]);
out.table = st2;
lkwChessTable(G, m * 1.3, 0.3, m * 0.3, o.chess || {});
lkwChair(G, m * 1.3, 1.05, Math.PI, {});
lkwChair(G, m * 1.3, -0.45, 0, {});
var bs = new THREE.Group();
bs.position.set(m * -0.9, 0, -D / 2 + 2.4);
G.add(bs);
lkwCyl(bs, 0.22, 0.18, 0.18, lkwLam(0xB8904A), 0, 0, 0, 12);
lkwWorsted(bs, 0.05, 0.16, 0.02, 0x5A8A3A);
lkwWorsted(G, m * 0.5, 0, -D / 2 + 1.9, 0xB83A3A);
lkwWorsted(G, m * -0.3, 0, -D / 2 + 2.2, 0x3A5A9A);
var wx = m * (W / 2 - 0.12);
lkwWindowIn(G, wx, 1.0, -0.6, -m * Math.PI / 2, 1.4, 2.0, { sky: o.sky || 0xD8DEE6 });
var vel = lkwMat("redvelvet");
try {
lkxDrape(G, wx - m * 0.12, 3.05, -1.75, 0.7, 2.95, -m * Math.PI / 2, vel, {});
lkxDrape(G, wx - m * 0.12, 3.05, 0.55, 0.7, 2.95, -m * Math.PI / 2, vel, {});
lkxSwag(G, wx - m * 0.14, 3.05, -0.6, 2.0, 0.4, -m * Math.PI / 2, vel);
}
catch (e) {
lkfCurtain(G, wx - m * 0.06, 0.4, -1.7, m * Math.PI / 2, 0.5, 2.6, 0x6A2A3A);
}
var lace = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.9), lkwLam(0xF4F0E4, { ds: 1, op: 0.45 }));
lace.position.set(wx - m * 0.06, 2.0, -0.6);
lace.rotation.y = -m * Math.PI / 2;
G.add(lace);
lkwShelves(G, -m * (W / 2 - 0.25), 2.6, 1.6, 2.4, m * Math.PI / 2, { books: 1 });
lkwShelves(G, -m * (W / 2 - 0.25), -2.2, 1.6, 2.4, m * Math.PI / 2, { books: 1 });
lkxPiano(G, m * 2.6, D / 2 - 0.6, Math.PI);
lkxWhatNot(G, m * (W / 2 - 0.45), D / 2 - 0.5, Math.PI);
var stand = new THREE.Group();
stand.position.set(m * (W / 2 - 0.6), 0, 2.0);
G.add(stand);
lkwCyl(stand, 0.18, 0.12, 0.8, lkwMat("darkoak"), 0, 0, 0, 10);
var ps = new THREE.Group();
ps.position.y = 0.8;
stand.add(ps);
lkfPlant(ps, 0, 0, 1.0);
lkfLampTable(G, m * -3.0, D / 2 - 1.0, { book: 1 });
lkxGlow(Lg, m * -3.0, 0.84, D / 2 - 1.0, 0xFFE0A8, 0.8);
out.pics = [];
out.pics.push(lkxFramed(G, -2.3, 2.15, -D / 2 + 0.14, 0, 0.62, 0.78, lkxPainting("lady", o.seed || 1), { oval: 1 }));
out.pics.push(lkxFramed(G, 2.3, 2.15, -D / 2 + 0.14, 0, 0.62, 0.78, lkxPainting("gent", o.seed || 1), { oval: 1 }));
lkxFramed(G, -m * (W / 2 - 0.12), 2.15, 0.6, m * Math.PI / 2, 1.3, 0.9, lkxPainting("land", o.seed || 2));
lkxFramed(G, -m * 2.4, 2.15, D / 2 - 0.12, Math.PI, 0.9, 0.7, lkxPainting("sea", o.seed || 3));
lkxGasolier(G, 0, 2.9, 0.2, H, Lg);
lkxGlowDone(G, Lg);
return out;
},
function (x, z) {
var B = LKW_BO, n = lkwFbm(x * 0.008, z * 0.008, 3), h = n * 0.9;
h += 9.5 * Math.exp(-((x - B.hill[0]) * (x - B.hill[0]) + (z - B.hill[1]) * (z - B.hill[1])) / (2 * 26 * 26));
var dh = Math.hypot(x - B.house[0], z - B.house[1]);
if (dh < 60)
h = h * (lkwSmooth(30, 60, dh)) + 0.4 * (1 - lkwSmooth(30, 60, dh));
if (lkwOnBoard(x, z) || Math.abs(x) < 460) {
for (var i = 0; i < B.brooks.length; i++) {
var d = Math.abs(z - B.brooks[i]);
if (d < 4)
h -= 0.9 * (1 - lkwSmooth(1.2, 4, d));
}
var dr = Math.abs(z - B.river - 2 * Math.sin(x / 40));
if (dr < 14)
h -= 1.9 * (1 - lkwSmooth(6, 14, dr));
}
var ex = Math.max(0, Math.abs(x) - 470), ez = Math.max(0, z - 760, -430 - z);
var e = Math.hypot(ex, ez);
if (e > 0)
h += lkwSmooth(0, 200, e) * (6 + lkwFbm(x * 0.004 + 7, z * 0.004, 2) * 22);
return h;
},
function (G) {
var H = lkwBoardH, lite = lkwLite(), B = LKW_BO, R = wRand(801);
lkwTerrain(G, -900, -900, 1800, 1800, lite ? 8 : 4, H, lkwMat("meadow"), function (x, z, y, c) {
var g = 0.84 + lkwFbm(x * 0.03, z * 0.03, 2) * 0.2;
if (lkwOnBoard(x, z)) {
var lt = (lkwRank(z) + lkwFileOf(x)) % 2 === 0, br = lkwBrookAt(z);
if (br != null && Math.abs(z - br) < 2.6) {
c.setRGB(0.42 * g, 0.36 * g, 0.24 * g);
return;
}
if (lt)
c.setRGB(0.6 * g, 0.74 * g, 0.36 * g);
else
c.setRGB(0.34 * g, 0.54 * g, 0.24 * g);
var dr = Math.abs(z - B.river - 2 * Math.sin(x / 40));
if (dr < 9)
c.setRGB(0.44 * g, 0.4 * g, 0.26 * g);
return;
}
var e = Math.max(0, Math.abs(x) - 470, z - 760, -430 - z);
var k = lkwSmooth(0, 160, e);
c.setRGB((0.46 - k * 0.08) * g, (0.66 - k * 0.1) * g, (0.32 - k * 0.06) * g);
});
B.brooks.forEach(function (bz) { lkwWater(G, 0, bz, 900, 3.0, H(0, bz - 6) - 0.8, 0x5A8AA0, 0.82); });
for (var wx = -440; wx < 440; wx += 40)
lkwWater(G, wx + 20, B.river, 41, 20, H(0, B.river - 20) - 1.25, 0x4A7A8A, 0.86);
var reeds = [];
B.brooks.forEach(function (bz) { for (var rx = -440; rx < 440; rx += lite ? 3 : 1.3) {
if (R() < 0.4)
continue;
[-1, 1].forEach(function (sd) { if (R() < 0.5)
return; reeds.push({ x: rx + R(), z: bz + sd * (1.8 + R() * 0.8), y: H(rx, bz + sd * 2.2) - 0.3, s: 0.6 + R() * 0.5, ry: R() * 6 }); });
} });
for (var rx2 = -440; rx2 < 440; rx2 += lite ? 2.4 : 1.0) {
[-1, 1].forEach(function (sd) { if (R() < 0.3)
return; var z = B.river + 2 * Math.sin(rx2 / 40) + sd * (8 + R() * 3); reeds.push({ x: rx2 + R(), z: z, y: H(rx2, z) - 0.4, s: 0.9 + R() * 0.7, ry: R() * 6 }); });
}
lkwInst(G, lkwGeo("lkReed", function () { return lkwCards(3, 1.0, 2.0, 0); }), lkwLam(0xFFFFFF, { ds: 1, map: lkwReedTex("reed"), mapk: "reedT", cut: 0.4 }), reeds, {});
B.brooks.forEach(function (bz) { var x = B.file, y = H(x, bz - 5); var pl = lkwBox(G, 1.6, 0.14, 7, lkwMat("planks"), x, y - 0.05, bz); lkwFloor(x, bz, 1.6, 7, y + 0.09, {}); [-0.7, 0.7].forEach(function (o) { lkwCyl(G, 0.06, 0.06, 0.8, lkwMat("darkoak"), x + o, y - 0.4, bz - 3.2, 6); lkwCyl(G, 0.06, 0.06, 0.8, lkwMat("darkoak"), x + o, y - 0.4, bz + 3.2, 6); }); });
var hd = [];
for (var f = 0; f <= 8; f++) {
var hx = B.x0 + f * B.sq;
for (var hz = B.z0; hz > B.end; hz -= lite ? 4 : 2) {
if (lkwBrookAt(hz) != null)
continue;
var dr = Math.abs(hz - B.river);
if (dr < 12)
continue;
hd.push({ x: hx, z: hz, y: H(hx, hz) - 0.1, s: 1, ry: 0 });
}
}
lkwInst(G, lkwGeo("lkHdg" + (lite ? 4 : 2), function () { var b = new THREE.BoxGeometry(1.2, 1.1, lite ? 4.1 : 2.1); b.translate(0, 0.55, 0); return b; }), lkgClipM(), hd, {});
for (f = 0; f <= 8; f++) {
var hx2 = B.x0 + f * B.sq;
var cuts = B.brooks.concat([B.river]).sort(function (a, b) { return b - a; }), top = B.z0;
cuts.concat([B.end]).forEach(function (cz) { var a = top, b = cz + (cz === B.river ? 12 : 4); if (a - b > 2)
lkwSolid(hx2, (a + b) / 2, 1.3, a - b, -50, H(hx2, (a + b) / 2) + 1.1); top = cz - (cz === B.river ? 12 : 4); });
}
lkwStrip(G, LKW_BO_WAY, 1.4, H, lkwMat("trail"), 0.04);
lkwStrip(G, LKW_BO_GARDEN, 1.6, H, lkwMat("gravel"), 0.05);
var Hs = B.house, hy = H(Hs[0], Hs[1]);
lkwVilla(G, Hs[0], Hs[1], { y: hy, w: 14, d: 10, h: 9, ry: Math.PI });
lkwSolid(Hs[0], Hs[1], 14.4, 10.4, hy - 1, hy + 12);
var dr2 = lkwVillaDoor(Hs[0], Hs[1], { w: 14, d: 10, ry: Math.PI });
LKW_BO.door = [dr2.x, dr2.z];
var Rh = LKW.rooms.filter(function (q) { return q.key === "lghall"; })[0];
if (Rh)
lkwDoor(Rh, "The front door of Looking-Glass House", dr2.x, dr2.z, 0);
lkwSmoke(G, Hs[0] + 4, hy + 11.6, Hs[1] - 2, 0xE8E8F0, 6);
lkwBoardGarden(G, H);
lkwBoardHill(G, H);
var far = function (x, z) { return !lkwOnBoard(x, z) && Math.hypot(x - Hs[0], z - Hs[1]) > 80 && Math.hypot(x - B.hill[0], z - B.hill[1]) > 40; };
lkxTrees(G, "oak", lkwScatter(802, lite ? 60 : 200, -880, -880, 880, 880, far, H, 1.0, 1.6), [0x3E6A2A, 0x4A7A2E, 0x5A8436]);
lkxTrees(G, "pine", lkwScatter(803, lite ? 30 : 90, -880, -880, 880, 880, function (x, z) { return far(x, z) && (Math.abs(x) > 520 || z < -470); }, H, 1.0, 1.5), [0x2E4A26]);
lkwFar(G, H, null, { edge: 880 });
[[B.x0 - 6, B.z0 + 6, "castle"], [-B.x0 + 6, B.z0 + 6, "castle"], [B.x0 - 6, B.end - 6, "castle"], [-B.x0 + 6, B.end - 6, "castle"]].forEach(function (t) { lkgTopiary(G, t[0], t[1], H(t[0], t[1]), t[2], 1.8); });
},
function (G, H) {
var B = LKW_BO, lite = lkwLite(), R = wRand(811), Bd = B.bed, by = H(Bd[0], Bd[1]);
var pal = [[-60, 600], [-60, 720], [60, 720], [60, 600], [3, 600]], pal2 = [[-3, 600], [-60, 600]];
lkwPaling(G, [[-3, 600], [-60, 600], [-60, 720], [60, 720], [60, 600], [3, 600]], H, {});
[-3, 3].forEach(function (x) { lkwBox(G, 0.3, 1.6, 0.3, lkwMat("oak"), x, H(x, 600) - 0.1, 600); });
var ring = [];
for (var a = 0; a < 6.283; a += lite ? 0.12 : 0.06)
ring.push({ x: Bd[0] + Math.cos(a) * 8.5, z: Bd[1] + Math.sin(a) * 8.5, y: by + 0.05, s: 1, ry: a });
lkwInst(G, lkwGeo("lkBedEdge", function () { var b = new THREE.BoxGeometry(0.6, 0.24, 0.2); b.translate(0, 0.12, 0); return b; }), lkwMat("ashlar"), ring, {});
var soil = new THREE.Mesh(new THREE.CircleGeometry(8.4, 40), lkwS("earth", 0x5A3E28, 2));
soil.rotation.x = -Math.PI / 2;
soil.position.set(Bd[0], by + 0.06, Bd[1]);
G.add(soil);
(LKW.noTurf || (LKW.noTurf = [])).push({ x0: Bd[0] - 8.6, x1: Bd[0] + 8.6, z0: Bd[1] - 8.6, z1: Bd[1] + 8.6 });
lkxTrees(G, "maple", [{ x: Bd[0], z: Bd[1], y: by, s: 1.1, ry: 0.3 }], [0x4A7A2E]);
lkwRound(Bd[0], Bd[1], 0.8, by - 1, by + 8);
var kinds = ["daisy", "daisy", "violet", "daisy", "larkspur", "rose", "daisy", "violet"], fl = [];
for (var i = 0; i < (lite ? 40 : 110); i++) {
var a2 = R() * 6.283, r = 2 + Math.sqrt(R()) * 5.8, x = Bd[0] + Math.cos(a2) * r, z = Bd[1] + Math.sin(a2) * r;
var g = lkxLiveFlower(kinds[i % kinds.length], { s: 0.8 + R() * 0.4, seed: i });
g.position.set(x, by + 0.06, z);
g.rotation.y = Math.atan2(0 - x, 640 - z) + (R() - 0.5);
G.add(g);
}
[["tigerlily", "The Tiger-lily", -4, 5, 1.25, "We CAN talk, when there's anybody worth talking to."], ["rose", "The Rose", -0.5, 6.4, 1.1, "I never saw anybody that looked stupider."], ["violet", "The Violet", 2.6, 6, 1, "I never saw anybody that looked stupider."], ["daisy", "The Daisies", 4.8, 4.4, 1.2, "Mind your manners!"], ["larkspur", "The Larkspur", -6, 2.4, 1, "She's coming! I hear her footstep, thump, thump, thump, along the gravel-walk!"]].forEach(function (f, i) {
var g = lkxLiveFlower(f[0], { s: f[4], seed: 40 + i });
var x = Bd[0] + f[2], z = Bd[1] + f[3];
g.position.set(x, by + 0.06, z);
g.rotation.y = Math.atan2(0, 1);
G.add(g);
var P = { g: g, y: by, o: {} };
LKW.people.push(P);
lkwTalk(P, f[1], lkwPersona("flower"), f[5], 3.2);
});
[[-56, 610, -56, 716], [56, 610, 56, 716], [-50, 704, -10, 704], [10, 704, 50, 704]].forEach(function (b, i) {
var n = lite ? 30 : 90, list = [], cols = ["#E8302A", "#F6D23A", "#F8F4F0", "#9A48C0", "#F07AA8"];
for (var k = 0; k < n; k++) {
var t = k / n, x = b[0] + (b[2] - b[0]) * t + (R() - 0.5) * 2.4, z = b[1] + (b[3] - b[1]) * t + (R() - 0.5) * 2.4;
list.push({ x: x, z: z, y: H(x, z) + 0.02, s: 0.8 + R() * 0.5, sy: 0.8 + R() * 0.6, ry: R() * 6.283 });
}
var col = cols[i % cols.length];
lkwInst(G, lkgBloomGeo(), lkwM("lkgBloomM" + col, function () { var m = new THREE.MeshLambertMaterial({ map: lkgBloomTex(col), alphaTest: 0.4 }); m.userData.noPhoto = 1; return m; }), list, {});
});
lkxRoseTree(G, -8, 666, H(-8, 666), { s: 1.1 });
lkxRoseTree(G, 8, 666, H(8, 666), { s: 1.1 });
var sd = new THREE.Group();
sd.position.set(22, H(22, 630), 630);
G.add(sd);
lkwCyl(sd, 0.3, 0.36, 1.0, lkwMat("ashlar"), 0, 0, 0, 10);
lkwCyl(sd, 0.5, 0.5, 0.06, lkwMat("brass"), 0, 1.0, 0, 16);
lkwRound(22, 630, 0.5, -50, H(22, 630) + 1.2);
lkwBench(G, -20, 646, Math.PI / 2);
lkwCyl(G, 0.3, 0.3, 0.9, lkwMat("iron"), 30, H(30, 650) + 0.3, 650, 12).rotation.z = Math.PI / 2;
lkxTrees(G, "oak", lkwScatter(812, lite ? 6 : 14, -58, 602, 58, 718, function (x, z) { return Math.hypot(x - B.house[0], z - B.house[1]) > 16 && Math.hypot(x - Bd[0], z - Bd[1]) > 14 && lkwPathD(x, z, LKW_BO_GARDEN) > 5; }, H, 0.9, 1.3), [0x4A7A2E, 0x3E6A2A]);
lkwPlant(G, "bush", lkwScatter(813, lite ? 20 : 70, -58, 602, 58, 718, function (x, z) { return Math.hypot(x - B.house[0], z - B.house[1]) > 10 && Math.hypot(x - Bd[0], z - Bd[1]) > 10 && lkwPathD(x, z, LKW_BO_GARDEN) > 2.4; }, H, 0.6, 1.2), { col: 0x355E26, keepAll: 1 });
lkwSpot(6, 648, 3, "The garden path, twisting like a corkscrew", "follow the path", function () { setStatus("🌀 <b>The path twists like a corkscrew.</b> Whichever way you follow it, it brings you back to the house door."); });
},
function (G, H) {
var B = LKW_BO, hy = H(B.hill[0], B.hill[1]);
lkwSpot(B.hill[0], B.hill[1], 5, "The top of the little hill", "look out over the country", function () { setStatus("♟️ <b>Marked out just like a large chessboard.</b> Little brooks run straight across it from side to side, and little green hedges divide the ground into squares."); }, hy);
lkxTrees(G, "oak", [{ x: B.hill[0] + 7, z: B.hill[1] - 5, y: H(B.hill[0] + 7, B.hill[1] - 5), s: 1.2, ry: 0 }], [0x4A7A2E]);
lkwBench(G, B.hill[0] - 3, B.hill[1] + 2, 0);
},
function (G) {
var X = LKW_ROOMXZ.board, R;
R = lkwRoom(G, "lghouse", X.lghouse[0], X.lghouse[1], 9, 7.6, { wall: "damask", floor: "floor", name: "The Looking-glass room", h: 3.8, lightI: 0.9, lightCol: 0xFFC890, env: "glass" });
var P = lkwParlour(R, -1, { seed: 4, sky: 0xBFE0F4, book: 1, faceKey: "lkClockFace", face: function (c, W, H) { c.fillStyle = "#F4ECD8"; c.beginPath(); c.arc(W / 2, H / 2, W / 2, 0, 7); c.fill(); c.fillStyle = "#2A1A10"; c.beginPath(); c.arc(W * 0.36, H * 0.4, 6, 0, 7); c.arc(W * 0.64, H * 0.4, 6, 0, 7); c.fill(); c.strokeStyle = "#7A2A22"; c.lineWidth = 5; c.beginPath(); c.arc(W / 2, H * 0.52, W * 0.24, 0.3, Math.PI - 0.3); c.stroke(); c.fillStyle = "#C8A0A0"; c.beginPath(); c.ellipse(W / 2, H * 0.52, 5, 8, 0, 0, 7); c.fill(); for (var i = 0; i < 12; i++) {
var a = i / 12 * 6.283;
c.fillStyle = "#2A1A10";
c.fillRect(W / 2 + Math.cos(a) * W * 0.42 - 2, H / 2 + Math.sin(a) * H * 0.42 - 2, 4, 4);
} }, chess: { gone: ["wking4", "wqueen3", "rking4", "rqueen3", "wpawn3", "wrook0", "wrook7"] } });
P.pics.forEach(function (pic) { var px = pic.position.x; [-1, 1].forEach(function (sd) { var e = new THREE.Mesh(lkwGeo("lkPicEye", function () { return new THREE.SphereGeometry(0.009, 8, 6); }), lkwLam(0x1A1210)); var ex = px + sd * 0.031; e.position.set(ex, 2.25, -3.59); R.g.add(e); LKW.ticks.push(function () { var L = lkwLocalSc(); e.position.x = ex + Math.max(-0.01, Math.min(0.01, (L.x - R.cx - ex) * 0.003)); }); }); });
var bk = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.22), new THREE.MeshLambertMaterial({ map: lkwCanvas("lkJabBook", 256, 190, function (c, W, H) { c.fillStyle = "#F2EAD4"; c.fillRect(0, 0, W, H); c.save(); c.translate(W, 0); c.scale(-1, 1); c.fillStyle = "#2A1A10"; c.font = "bold 18px Georgia"; c.fillText("JABBERWOCKY", 30, 28); c.font = "11px Georgia"; ["'Twas brillig, and the slithy toves", "Did gyre and gimble in the wabe;", "All mimsy were the borogoves,", "And the mome raths outgrabe."].forEach(function (l, i) { c.fillText(l, 16, 54 + i * 16); }); c.restore(); }) }));
bk.position.set(0, 0.52, 0.1);
bk.rotation.y = 0.3;
P.table.add(bk);
var cin = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.5), lkwS("earth", 0x3A3632, 3));
cin.rotation.x = -Math.PI / 2;
cin.position.set(0, 0.075, -2.95);
R.g.add(cin);
R = lkwRoom(G, "lghall", X.lghall[0], X.lghall[1], 6, 12, { wall: "greenpaper", floor: "checker", name: "The hall of Looking-Glass House", h: 6.4, lightI: 0.85, env: "glass" });
var st = new THREE.Group();
st.position.set(-1.6, 0, -1);
R.g.add(st);
for (var s = 0; s < 16; s++) {
lkwBox(st, 1.4, 0.18, 0.3, lkwMat("oak"), 0, s * 0.3, -4.2 + s * 0.3);
}
lkwBox(st, 0.08, 1.0, 5.2, lkwMat("darkoak"), 0.72, 2.6, -2.0).rotation.x = -0.78;
lkwBox(R.g, 6, 0.2, 3, lkwMat("floor"), 0, 4.8, -4.5);
lkxChandelier(R.g, 0, 5.6, 1, 0.6, 1, null, null, 6.4);
lkwPicture(R.g, 2.9, 2.6, -1, -Math.PI / 2, 1.2, 0.9);
lkfPegs(R.g, 2.95, 2.0, 2.6, -Math.PI / 2, ["coat", "hat", "umbrella"]);
lkwRug(R.g, 0, 2, 2.4, 6, 0x5A2A2A);
lkfClock(R.g, 2.8, 0, 4, -Math.PI / 2);
lkfPlant(R.g, -2.4, 4.6, 1.1);
lkwInDoor("lghall", "lghouse", 1.6, -5.4, "Up the stairs to the Looking-glass room", "go up");
},
function (G) {
var H = lkwBoardH, lite = lkwLite(), B = LKW_BO, S = LKW_SQ;
lkwSqCountry(G, H);
lkwSq2(G, H);
lkwSq3(G, H);
lkwSq4(G, H);
if (typeof lkwSq5 === "function")
lkwSq5(G, H);
if (typeof lkwSq6 === "function")
lkwSq6(G, H);
if (typeof lkwSq7 === "function")
lkwSq7(G, H);
if (typeof lkwSq8 === "function")
lkwSq8(G, H);
LKW.live = function (st) { (LKW.liveFns || []).forEach(function (f) { try {
f(st || {});
}
catch (e) { } }); };
try {
LKW.live(LKW.st);
}
catch (e) { }
},
function (G, H) {
var B = LKW_BO, lite = lkwLite(), oaks = [], maples = [], birches = [], bush = [], fruit = [], sheep = [], cows = [], corn = [], farms = [];
var kinds = ["meadow", "orchard", "corn", "pasture", "copse", "pond", "farm", "meadow", "pasture", "corn"];
for (var f = 1; f <= 8; f++)
for (var r = 1; r <= 8; r++) {
if (f === 4)
continue;
var x0 = B.x0 + (f - 1) * B.sq + 6, x1 = x0 + B.sq - 12, z1 = B.z0 - (r - 1) * B.sq - 6, z0 = z1 - B.sq + 12, R = wRand(f * 31 + r * 7);
var kind = kinds[(f * 3 + r * 5) % kinds.length];
if (r === 5 && Math.abs(B.river - (z0 + z1) / 2) < 60)
kind = kind === "pond" ? "meadow" : kind;
if (f === 5 && r === 4)
continue;
if (f >= 7 && r === 4)
continue;
var ok = function (x, z) { return lkwBrookAt(z) == null && Math.abs(z - B.river - 2 * Math.sin(x / 40)) > 14; };
var pick = function (n, cb) { for (var i = 0; i < n; i++) {
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok(x, z))
cb(x, z, R);
} };
if (kind === "orchard") {
for (var ox = x0 + 6; ox < x1; ox += lite ? 14 : 9)
for (var oz = z0 + 6; oz < z1; oz += lite ? 14 : 9)
if (ok(ox, oz))
fruit.push({ x: ox + (R() - 0.5) * 2, z: oz + (R() - 0.5) * 2, y: H(ox, oz), s: 0.6 + R() * 0.2, ry: R() * 6 });
}
else if (kind === "corn") {
corn.push([x0, z0, x1, z1]);
pick(lite ? 2 : 5, function (x, z) { oaks.push({ x: x, z: z, y: H(x, z), s: 1 + R() * 0.4, ry: R() * 6 }); });
}
else if (kind === "pasture") {
pick(lite ? 3 : 8, function (x, z) { (R() < 0.6 ? sheep : cows).push({ x: x, z: z, y: H(x, z), ry: R() * 6 }); });
pick(lite ? 3 : 6, function (x, z) { oaks.push({ x: x, z: z, y: H(x, z), s: 1.1 + R() * 0.5, ry: R() * 6 }); });
}
else if (kind === "copse") {
var cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
for (var i = 0; i < (lite ? 14 : 34); i++) {
var a = R() * 6.283, d = Math.sqrt(R()) * 36, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!ok(x, z))
continue;
(i % 3 ? oaks : birches).push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.6, ry: R() * 6 });
if (i % 2)
bush.push({ x: x + 3, z: z + 2, y: H(x + 3, z + 2), s: 0.6 + R() * 0.6, ry: R() * 6 });
}
}
else if (kind === "pond") {
var px = (x0 + x1) / 2, pz = (z0 + z1) / 2;
lkwWater(G, px, pz, 30, 22, H(px, pz) + 0.12, 0x4A7A8A, 0.84);
lkwPlant(G, "bush", [{ x: px + 18, z: pz, y: H(px + 18, pz), s: 1.2, ry: 0 }], { col: 0x355E26, keepAll: 1 });
lkxWillows(G, [{ x: px - 17, z: pz + 4, y: H(px - 17, pz + 4), s: 1, ry: 0 }]);
}
else if (kind === "farm") {
farms.push([(x0 + x1) / 2, (z0 + z1) / 2, R() * 6]);
pick(4, function (x, z) { maples.push({ x: x, z: z, y: H(x, z), s: 1 + R() * 0.4, ry: R() * 6 }); });
}
else {
pick(lite ? 3 : 7, function (x, z) { (R() < 0.5 ? oaks : maples).push({ x: x, z: z, y: H(x, z), s: 1 + R() * 0.6, ry: R() * 6 }); });
}
}
lkxTrees(G, "oak", oaks, [0x3E6A2A, 0x4A7A2E, 0x46742C]);
lkxTrees(G, "maple", maples, [0x4E7E30, 0x5A8A36]);
lkxTrees(G, "birch", birches, [0x6A9A3A]);
lkxTrees(G, "oak", fruit, [0x4A8A34, 0x5A9A3A]);
lkwPlant(G, "bush", bush, { col: 0x355E26, keepAll: 1 });
var ap = [];
fruit.forEach(function (t, i) { for (var k = 0; k < (lite ? 3 : 8); k++) {
var a = k * 0.8 + i, r = 1.6 * t.s;
ap.push({ x: t.x + Math.cos(a) * r, z: t.z + Math.sin(a) * r, y: t.y + 4.2 * t.s + ((k * 37) % 10) / 10, s: 1, ry: 0 });
} });
lkwInst(G, lkwGeo("lkApple", function () { return new THREE.SphereGeometry(0.09, 6, 5); }), lkwLam(0xC83A2A), ap, {});
var ears = [];
corn.forEach(function (c) { for (var cx = c[0]; cx < c[2]; cx += lite ? 2.4 : 1.2)
for (var cz = c[1]; cz < c[3]; cz += lite ? 2.4 : 1.2) {
if (lkwBrookAt(cz) != null)
continue;
ears.push({ x: cx + Math.sin(cz) * 0.4, z: cz + Math.cos(cx) * 0.4, y: H(cx, cz), s: 1, ry: (cx * cz) % 6 });
} (LKW.noTurf || (LKW.noTurf = [])).push({ x0: c[0], x1: c[2], z0: c[1], z1: c[3] }); });
lkwInst(G, lkwGeo("lkCorn", function () { return lkwCards(3, 1.3, 1.3, 0); }), lkwLam(0xFFFFFF, { ds: 1, map: lkwCornTex(), mapk: "cornT", cut: 0.4 }), ears, {});
if (typeof lkxBeastKinds === "function")
try {
lkxBeastKinds();
}
catch (e) { }
sheep.forEach(function (t, i) { var s = lkwCreature("sheep", "bsh" + i); s.position.set(t.x, t.y, t.z); s.rotation.y = t.ry; G.add(s); LKW.people.push({ g: s, y: t.y, o: { wander: 6, sp: 0.25 } }); });
cows.forEach(function (t, i) { var c = lkwCreature("cow", "bcw" + i); c.position.set(t.x, t.y, t.z); c.rotation.y = t.ry; G.add(c); LKW.people.push({ g: c, y: t.y, o: { wander: 5, sp: 0.2 } }); });
farms.forEach(function (F, i) {
var x = F[0], z = F[1], y = H(x, z);
lkwTownHouse(G, x, z, 11, 7, 6, { y: y, ry: F[2], wall: i % 2 ? "greystone" : "render", roof: i % 2 ? "slate" : "thatch" });
lkwSolid(x, z, 11.4, 7.4, y - 1, y + 8, -F[2]);
var bx = x + Math.cos(F[2]) * 16, bz = z - Math.sin(F[2]) * 16;
lkwBox(G, 10, 5, 7, lkwMat("planks"), bx, H(bx, bz), bz, F[2]);
lkwSolid(bx, bz, 10.4, 7.4, H(bx, bz) - 1, H(bx, bz) + 6, -F[2]);
lkwCart(G, x + 6, z + 8, F[2] + 1, { y: H(x + 6, z + 8), load: 3 });
lkwOne("bfarm" + i, ["A farmer in a smock", "A dairymaid", "A ploughman"][i % 3], i % 3 === 1 ? "f" : "m", i % 3 === 1 ? "maid" : "worker", x + 4, z + 10, F[2], ["Everything's backwards here, you know. We plant the harvest and reap the seed.", "The cows give the milk back, of an evening.", "Mind the hedge, miss: it's a file, and you mustn't cross it unless you're a Knight."][i % 3], { wander: 4 });
});
},
function () {
return lkwCanvas("lkCornT", 64, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(23);
for (var i = 0; i < 16; i++) {
var px = 4 + R() * (W - 8), top = 14 + R() * 40, lean = (R() - 0.5) * 8;
x.strokeStyle = "rgb(" + (200 + R() * 30 | 0) + "," + (160 + R() * 30 | 0) + "," + (70 + R() * 30 | 0) + ")";
x.lineWidth = 2;
x.beginPath();
x.moveTo(px, H);
x.lineTo(px + lean, top);
x.stroke();
x.fillStyle = "rgb(" + (210 + R() * 30 | 0) + "," + (170 + R() * 30 | 0) + "," + (80 + R() * 20 | 0) + ")";
for (var k = 0; k < 7; k++) {
x.beginPath();
x.ellipse(px + lean + (k % 2 ? 2 : -2), top + k * 4, 2.4, 3.4, k % 2 ? 0.4 : -0.4, 0, 7);
x.fill();
}
}
});
},
function (G, H) {
var S = LKW_SQ, T = S.redtree, ty = H(T[0] + 3, T[1]);
lkxTrees(G, "oak", [{ x: T[0] + 3, z: T[1], y: ty, s: 1.5, ry: 0.4 }], [0x4A7A2E]);
lkwRound(T[0] + 3, T[1], 1, ty - 1, ty + 8);
for (var p = 0; p < 5; p++) {
var pz = T[1] - 4 - p * 4.2;
lkwCyl(G, 0.05, 0.04, 0.5, lkwMat("oak"), T[0] - 1.2, H(T[0] - 1.2, pz) - 0.1, pz, 6);
}
lkwSpot(T[0] + 1.5, T[1] + 1, 2.4, "The tree at the end of the Second Square", "rest under it", function () { setStatus("🌳 <b>Under the same tree.</b> Everything is just as it was: here you must run as fast as you can to keep in the same place."); });
},
function (G, H) {
var S = LKW_SQ, lite = lkwLite();
lkwRailway(G, S.train, H);
var st = lkwStation(G, S.station[0] + 5.6, S.station[1], 40, "LOOKING-GLASS", { y: H(S.station[0] + 5.6, S.station[1]) });
lkwSignal(G, S.station[0] - 4, S.station[1] - 26, H);
var tr = lkwTrainLG(G, S.station[0], S.station[1] + 4, H);
lkwLiveOn(function (st) { tr.visible = !st.trainGone; });
lkwSpot(S.station[0] + 3, S.station[1], 3, "The train at the Looking-Glass platform", "get in", function () { if (typeof lkbActive === "function" && lkbActive() && lkbStep() && lkbStep().k === "spot")
return; lkwGo(lkR("carriage", 0, 2)(), "🚂 <b>A railway carriage.</b>"); });
var E = S.elephants, R = wRand(831), kinds = ["rose", "tigerlily", "larkspur", "rose", "daisy"];
for (var i = 0; i < (lite ? 8 : 20); i++) {
var a = R() * 6.283, d = 8 + R() * 46, x = E[0] + Math.cos(a) * d, z = E[1] + Math.sin(a) * d;
if (lkwBrookAt(z) != null)
continue;
var g = lkxLiveFlower(kinds[i % kinds.length], { s: 6 + R() * 4, seed: 200 + i });
g.position.set(x, H(x, z), z);
g.rotation.y = R() * 6;
G.add(g);
lkwRound(x, z, 0.6, H(x, z) - 1, H(x, z) + 20);
}
if (typeof CRX_PLANS !== "undefined" && CRX_PLANS.elephant) {
for (var e = 0; e < (lite ? 2 : 5); e++) {
var a2 = e * 1.3, x2 = E[0] + Math.cos(a2) * (14 + e * 5), z2 = E[1] + Math.sin(a2) * (14 + e * 5);
var el = lkwCrxPlain("elephant", "el" + e);
if (!el)
break;
el.position.set(x2, H(x2, z2), z2);
el.rotation.y = R() * 6;
G.add(el);
LKW.people.push({ g: el, y: H(x2, z2), o: { wander: 10, sp: 0.4 } });
}
}
lkwSpot(E[0] - 30, E[1] + 8, 6, "The great flowers of the Third Square", "look at the elephants", function () { setStatus("🐘 <b>Elephants!</b> Going about among the flowers, poking their proboscis into them, sucking out the honey. And what enormous flowers they must be!"); });
},
function (plan, seed) {
if (typeof crxBuild !== "function" || typeof crxPlan !== "function" || !crxPlan(plan))
return null;
var g = new THREE.Group();
g.userData.live = 1;
g.userData.keep = 1;
if (!lkwLite() && CRX.geo[plan]) {
try {
var c = crxBuild(plan);
if (c) {
g.add(c);
return g;
}
}
catch (e) { }
}
var st = lkwStandInC(plan);
g.add(st);
if (!lkwLite()) {
try {
crxWarm([plan]);
}
catch (e) { }
LKW.ticks.push(function () { if (!g.parent || g.userData.done || !CRX.geo[plan])
return; g.userData.done = 1; try {
var c = crxBuild(plan);
if (c) {
g.remove(st);
g.add(c);
}
}
catch (e) { } });
}
return g;
},
function (G, x, z, H) {
var t = new THREE.Group(), y = H(x, z) + 0.2;
t.position.set(x, y, z);
t.rotation.y = Math.PI;
G.add(t);
var green = lkwShine(0x2A5A34, 0.4, 0.3), black = lkwShine(0x141414, 0.5, 0.3), brass = lkwShine(0xC8A048, 0.3, 0.9), teak = lkwShine(0x6A3A1E, 0.5, 0.1), red = lkwLam(0x8A1E1A), cream = lkwLam(0xF0E6CC);
lkwBox(t, 2.4, 0.4, 8, black, 0, 0.95, 0);
var boil = lkwCyl(t, 0.8, 0.8, 5, green, 0, 2.15, 0.8, 16);
boil.rotation.x = Math.PI / 2;
boil.position.y = 2.15;
for (var bd = 0; bd < 3; bd++) {
var b = lkwCyl(t, 0.82, 0.82, 0.08, brass, 0, 2.15, -1.2 + bd * 1.6, 16);
b.rotation.x = Math.PI / 2;
b.position.y = 2.15;
}
lkwCyl(t, 0.26, 0.36, 1.6, black, 0, 3.0, 3.0, 12);
lkwCyl(t, 0.42, 0.28, 0.3, black, 0, 4.5, 3.0, 12);
lkwCyl(t, 0.3, 0.34, 0.5, brass, 0, 3.1, 1.0, 12);
lkwBox(t, 2.5, 2.0, 1.6, green, 0, 2.2, -2.4);
lkwBox(t, 2.6, 0.12, 2.2, black, 0, 4.2, -2.4);
[-1.15, 1.15].forEach(function (k) { [3.0, 1.6].forEach(function (wz) { var w = new THREE.Mesh(lkwGeo("lkTw5", function () { return new THREE.CylinderGeometry(0.5, 0.5, 0.12, 16); }), red); w.rotation.z = Math.PI / 2; w.position.set(k, 0.5, wz); t.add(w); }); [-0.2, -2.2].forEach(function (wz) { var w = new THREE.Mesh(lkwGeo("lkTw9", function () { return new THREE.CylinderGeometry(0.95, 0.95, 0.12, 20); }), red); w.rotation.z = Math.PI / 2; w.position.set(k, 0.95, wz); t.add(w); }); });
var tn = new THREE.Group();
tn.position.set(0, 0, -6.2);
t.add(tn);
lkwBox(tn, 2.5, 1.6, 4.2, green, 0, 0.9, 0);
lkwBox(tn, 2.3, 0.4, 3.6, lkwLam(0x1A1A1A), 0, 2.5, 0.2);
for (var c = 0; c < 3; c++) {
var cg = new THREE.Group();
cg.position.set(0, 0, -13.4 - c * 8.6);
t.add(cg);
lkwBox(cg, 2.6, 2.4, 8, teak, 0, 1.0, 0);
var rf = lkwCyl(cg, 1.4, 1.4, 8.1, lkwLam(0x3A3A3A), 0, 3.0, 0, 12);
rf.rotation.x = Math.PI / 2;
rf.scale.set(1, 1, 0.25);
rf.position.y = 3.4;
for (var d = 0; d < 4; d++) {
[-1, 1].forEach(function (k) { lkwBox(cg, 0.05, 0.6, 1.0, lkwGlowM(0xF0D8A0), k * 1.32, 2.0, -2.8 + d * 1.9); lkwBox(cg, 0.04, 0.06, 1.6, cream, k * 1.31, 2.7, -2.8 + d * 1.9); });
}
[-1.0, 1.0].forEach(function (k) { [-2.6, 2.6].forEach(function (wz) { var w = new THREE.Mesh(lkwGeo("lkTw5", function () { return new THREE.CylinderGeometry(0.5, 0.5, 0.12, 16); }), black); w.rotation.z = Math.PI / 2; w.position.set(k * 1.15, 0.5, wz); cg.add(w); }); });
}
lkwSmoke(t, 0, 4.8, 3.0, 0xE8E8EC, 8);
lkwSolid(x, z + 18, 3, 46, y - 1, y + 5);
return t;
},
function (G, H) {
var S = LKW_SQ, lite = lkwLite(), R = wRand(841), B = LKW_BO;
var Gn = S.gnat, gy = H(Gn[0] + 2, Gn[1]);
lkxTrees(G, "oak", [{ x: Gn[0] + 2.4, z: Gn[1], y: gy, s: 1.3, ry: 0 }], [0x4A7A2E]);
lkwRound(Gn[0] + 2.4, Gn[1], 0.9, gy - 1, gy + 8);
var flies = [[lkxRockingHorseFly, 0, 3.4, -1.2], [lkxSnapDragonFly, 1.6, 4.2, 0.8], [lkxBreadButterFly, -1.2, 2.6, 1.4], [lkxRockingHorseFly, 3.2, 5.2, -0.4], [lkxBreadButterFly, 1, 1.8, -2.0], [lkxSnapDragonFly, -2.2, 4.8, -1.8]];
flies.forEach(function (f, i) { var g = f[0](); g.position.set(Gn[0] + 2.4 + f[1], gy + f[2], Gn[1] + f[3]); g.rotation.y = R() * 6; g.scale.setScalar(1.6); G.add(g); });
lkwSpot(Gn[0] + 1, Gn[1] + 1.4, 2.6, "The Looking-Glass insects in the tree", "look at them", function () { setStatus("🦋 <b>The Looking-Glass insects.</b> A Rocking-horse-fly, swinging from branch to branch; a Snap-dragon-fly with a raisin burning in brandy for its head; a Bread-and-butter-fly with wings of bread-and-butter."); });
var Nn = S.noname, inW = function (x, z) { return x > -108 && x < -2 && z < Nn[0][1] + 2 && z > Nn[1][1] - 2 && Math.abs(x - B.file) > 2.4; };
lkxTrees(G, "oak", lkwScatter(842, lite ? 40 : 120, -108, Nn[1][1] - 2, -2, Nn[0][1] + 2, inW, H, 1.1, 1.8), [0x2E5622, 0x34602A]);
lkxTrees(G, "pine", lkwScatter(843, lite ? 14 : 40, -108, Nn[1][1] - 2, -2, Nn[0][1] + 2, inW, H, 1.1, 1.6), [0x24401E]);
lkwPlant(G, "bush", lkwScatter(844, lite ? 40 : 140, -108, Nn[1][1] - 2, -2, Nn[0][1] + 2, function (x, z) { return inW(x, z) && Math.abs(x - B.file) > 1.6; }, H, 0.5, 1.1), { col: 0x2A4A22, keepAll: 1 });
if (typeof lkxBracken === "function")
lkxBracken(G, lkwScatter(845, lite ? 120 : 600, -108, Nn[1][1] - 2, -2, Nn[0][1] + 2, function (x, z) { return inW(x, z) && Math.abs(x - B.file) > 1.4; }, H, 0.6, 1.2));
if (typeof lkxLogs === "function")
lkxLogs(G, lkwScatter(846, lite ? 6 : 16, -108, Nn[1][1] - 2, -2, Nn[0][1] + 2, inW, H, 0.8, 1.3));
lkwSpot(B.file, (Nn[0][1] + Nn[1][1]) / 2, 4, "The wood where things have no names", "walk on into it", function () { setStatus("🌲 <b>This must be the wood where things have no names.</b> It is very cool and shady under the trees, and you cannot for the life of you remember what anything is called."); });
var Ps = S.posts, py = H(Ps[0] + 1.4, Ps[1]);
[[0.0, "TO TWEEDLEDUM'S HOUSE"], [0.7, "TO THE HOUSE OF TWEEDLEDEE"]].forEach(function (p, i) { var g = new THREE.Group(); g.position.set(Ps[0] + 1.4, py, Ps[1] - i * 1.2); G.add(g); lkwCyl(g, 0.07, 0.08, 2.6, lkwMat("oak"), 0, 0, 0, 6); lkwSign(g, p[1], 1.6, 0.3, 0.8, 2.2 - p[0] * 0.3, 0, 0, { bg: "#F2EAD4", ink: "#2A1A10" }); lkwRound(Ps[0] + 1.4, Ps[1] - i * 1.2, 0.2, py - 1, py + 3); });
lkwSpot(Ps[0] + 0.4, Ps[1] - 0.6, 2, "The two finger-posts", "read them", function () { setStatus("☝️ <b>Two finger-posts, pointing the same way.</b> TO TWEEDLEDUM'S HOUSE and TO THE HOUSE OF TWEEDLEDEE. \"I do believe they live in the same house!\""); });
var Tw = S.tweedles;
lkxTrees(G, "maple", [{ x: Tw[0] + 3, z: Tw[1] - 2, y: H(Tw[0] + 3, Tw[1] - 2), s: 1.4, ry: 0 }], [0x4E7E30]);
lkwRound(Tw[0] + 3, Tw[1] - 2, 0.9, -50, H(Tw[0] + 3, Tw[1]) + 8);
var rt = new THREE.Group();
rt.position.set(Tw[0] + 5.4, H(Tw[0] + 5.4, Tw[1] + 1), Tw[1] + 1);
G.add(rt);
lkwCyl(rt, 0.012, 0.012, 0.18, lkwLam(0xF4F0E8), 0, 0.04, 0, 6).rotation.z = Math.PI / 2;
var rb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8, 0, Math.PI * 1.4), lkwLam(0xF4F0E8, { ds: 1 }));
rb.position.set(0.1, 0.06, 0);
rt.add(rb);
lkwSpot(Tw[0] + 5.4, Tw[1] + 1, 1.6, "A rattle, lying under the tree", "look at it", function () { setStatus("🪇 <b>A nice new rattle.</b> Or it was, before it was spoiled."); });
var Rk = S.redking;
lkxTrees(G, "oak", [{ x: Rk[0] - 2, z: Rk[1] - 2.4, y: H(Rk[0] - 2, Rk[1] - 2.4), s: 1.4, ry: 0.8 }], [0x46742C]);
lkwRound(Rk[0] - 2, Rk[1] - 2.4, 0.9, -50, H(Rk[0], Rk[1]) + 8);
lkwRug(G, Rk[0], Rk[1], 2.2, 1.0, 0x8A2A2A);
G.children[G.children.length - 1].position.y = H(Rk[0], Rk[1]) + 0.04;
var Sh = S.shore, sea = function (x, z) { return x > 360; };
lkwTerrain(G, 300, 30, 160, 140, lite ? 6 : 3, function (x, z) { return H(x, z) * 0.4 - Math.max(0, (x - 320)) * 0.03 + 0.1; }, lkwMat("sand"), function (x, z, y, c) { var g = 0.9 + lkwFbm(x * 0.06, z * 0.06, 2) * 0.1; c.setRGB(0.88 * g, 0.8 * g, 0.62 * g); });
(LKW.noTurf || (LKW.noTurf = [])).push({ x0: 300, x1: 460, z0: 30, z1: 170 });
lkwWater(G, 420, 100, 140, 180, H(380, 100) * 0.4 - 1.5, 0x3A7AA0, 0.9);
var rocks = lkwScatter(847, lite ? 12 : 30, 320, 40, 400, 160, null, function (x, z) { return H(x, z) * 0.4 - Math.max(0, (x - 320)) * 0.03; }, 0.5, 1.6);
rocks.forEach(function (r) { var m = new THREE.Mesh(lkwGeo("lkRock", function () { return new THREE.DodecahedronGeometry(0.7, 0); }), lkwMat("rock")); m.position.set(r.x, r.y, r.z); m.scale.set(r.s * 1.4, r.s * 0.7, r.s); m.rotation.y = r.ry; G.add(m); });
var oy = [];
for (var o = 0; o < (lite ? 30 : 90); o++)
oy.push({ x: 350 + R() * 30, z: 70 + R() * 60, y: 0, s: 1, ry: R() * 6 });
oy.forEach(function (q) { q.y = H(q.x, q.z) * 0.4 - Math.max(0, (q.x - 320)) * 0.03 + 0.04; });
lkwInst(G, lkwGeo("lkOyster", function () { var s = new THREE.SphereGeometry(0.1, 8, 5); s.scale(1, 0.35, 0.8); return s; }), lkwLam(0x8A8478), oy, {});
lkwSpot(Sh[0], Sh[1], 8, "The sea-shore of the poem", "listen to the sea", function () { setStatus("🌊 <b>The sun was shining on the sea, shining with all his might.</b> The sands are wet as wet can be; the oysters lie in their beds."); });
var wq = S.wqueen, inQ = function (x, z) { return x > -108 && x < -2 && z < 62 && z > 44 && Math.abs(x - B.file) > 3; };
lkxTrees(G, "oak", lkwScatter(848, lite ? 14 : 46, -108, 44, -2, 62, inQ, H, 1.0, 1.6), [0x3E6A2A, 0x4A7A2E]);
lkxTrees(G, "birch", lkwScatter(849, lite ? 6 : 20, -108, 44, -2, 62, inQ, H, 0.9, 1.3), [0x6A9A3A]);
},
function (G) {
var X = LKW_ROOMXZ.board, R;
R = lkwRoom(G, "carriage", X.carriage[0], X.carriage[1], 2.6, 8, { wall: "oak", floor: "planks", name: "A railway carriage", h: 2.6, lightI: 0.7, env: "carriage", dw: 0.9 });
for (var s = 0; s < 3; s++) {
[-1, 1].forEach(function (sd) { var z = -2.6 + s * 2.4; lkwBox(R.g, 2.2, 0.45, 0.6, lkwMat("redvelvet"), 0, 0, z + sd * 0.6); lkwBox(R.g, 2.2, 0.7, 0.12, lkwMat("redvelvet"), 0, 0.45, z + sd * 0.92); });
}
[-1.28, 1.28].forEach(function (x) { for (var w = 0; w < 3; w++) {
var win = lkwWindowIn(R.g, x, 1.6, -2.6 + w * 2.4, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0.9, 0.7, { sky: 0xA8D0E8 });
} });
for (var r = 0; r < 2; r++)
lkwBox(R.g, 0.06, 0.04, 7.6, lkwMat("brass"), r ? 1.1 : -1.1, 2.1, 0);
lkwBox(R.g, 2.4, 0.04, 7.6, lkwMat("ceiling"), 0, 2.48, 0);
},
function (G, H) {
var S = LKW_SQ2, lite = lkwLite(), Sp = S.shop, sy = H(Sp[0], Sp[1]);
lkwTownHouse(G, Sp[0], Sp[1], 8, 6, 4.6, { y: sy, ry: 0, wall: "render", roof: "thatch", shut: 0x5A3A2A });
lkwSolid(Sp[0], Sp[1], 8.4, 6.4, sy - 1, sy + 6);
lkwSign(G, "EGGS, WOOL, NEEDLES AND ALL MANNER OF CURIOUS THINGS", 5.4, 0.5, Sp[0], sy + 3.4, Sp[1] + 3.12, 0, { bg: "#2A3A2A", ink: "#F0E0B0" });
var Rs = LKW.rooms.filter(function (q) { return q.key === "shop"; })[0];
if (Rs)
lkwDoor(Rs, "The door of the little dark shop", Sp[0] + 1.6, Sp[1] + 4.2, Math.PI);
var Bt = S.boat;
lkwBoat(G, Bt[0], H(0, LKW_BO.river - 20) - 1.25, Bt[1], 0.1, { len: 4.6, col: 0x5A3A22 });
var J = S.jetty, jy = H(J[0], J[1] - 8);
lkwBox(G, 1.8, 0.16, 9, lkwMat("planks"), J[0], jy + 0.2, J[1] - 3);
lkwFloor(J[0], J[1] - 3, 1.8, 9, jy + 0.36, {});
for (var k = 0; k < 4; k++)
[-0.8, 0.8].forEach(function (o) { lkwCyl(G, 0.08, 0.08, 1.4, lkwMat("darkoak"), J[0] + o, jy - 1, J[1] - 6.5 + k * 2.4, 6); });
lkxWillows(G, [{ x: -80, z: -8, y: H(-80, -8), s: 1.1, ry: 0 }, { x: -24, z: -36, y: H(-24, -36), s: 1, ry: 1 }, { x: -140, z: -34, y: H(-140, -34), s: 1.2, ry: 2 }, { x: 40, z: -8, y: H(40, -8), s: 1, ry: 3 }]);
lkwSpot(Bt[0] + 1, Bt[1] + 3, 3, "The boat in the river", "look at the rushes", function () { setStatus("🚣 <b>The scented rushes.</b> The dearest rushes are always the ones out of reach; they begin to fade, and lose their scent, the moment they are picked."); });
},
function (G, H) {
var S = LKW_SQ2, lite = lkwLite(), W = S.wall, B = LKW_BO;
var wy = H(W[0], W[1]);
for (var x = -92; x < -18; x += 4) {
var y = H(x, W[1]);
lkwBox(G, 4.05, 2.7 + (wy - y), 0.5, lkwMat("brick"), x + 2, y - 0.2, W[1]);
lkwBox(G, 4.1, 0.12, 0.62, lkwMat("ashlar"), x + 2, wy + 2.5, W[1]);
}
lkwSolid(-55, W[1], 74, 0.6, -50, wy + 2.6);
lkwFloor(-55, W[1], 74, 0.5, wy + 2.62, {});
lkwLiveOn(function (st) { if (!LKW.humptyShell) {
var g = new THREE.Group();
g.position.set(W[0] + 0.6, H(W[0] + 0.6, W[1] + 1.2), W[1] + 1.2);
G.add(g);
for (var i = 0; i < 9; i++) {
var p = new THREE.Mesh(lkwGeo("lkShell", function () { return new THREE.SphereGeometry(0.3, 8, 6, 0, 1.4, 0, 1.2); }), lkwLam(0xF0E6CC, { ds: 1 }));
p.position.set((i % 3 - 1) * 0.4, 0.1, (Math.floor(i / 3) - 1) * 0.4);
p.rotation.set(i, i * 2, 0);
g.add(p);
}
LKW.humptyShell = g;
} LKW.humptyShell.visible = !!st.fallen; });
var kw = S.kingwood, inK = function (x, z) { return x > -108 && x < -2 && z < kw[0][1] && z > kw[1][1] && Math.abs(x - B.file) > 3; };
lkxTrees(G, "oak", lkwScatter(861, lite ? 24 : 70, -108, kw[1][1], -2, kw[0][1], inK, H, 1.0, 1.7), [0x3E6A2A, 0x34602A]);
lkxTrees(G, "birch", lkwScatter(862, lite ? 8 : 24, -108, kw[1][1], -2, kw[0][1], inK, H, 0.9, 1.3), [0x6A9A3A]);
lkwPlant(G, "bush", lkwScatter(863, lite ? 30 : 90, -108, kw[1][1], -2, kw[0][1], inK, H, 0.5, 1.0), { col: 0x355E26, keepAll: 1 });
var men = null;
lkwLiveOn(function (st) {
if (st.soldiers && !men) {
men = lkwStream(G, [[-100, -128], [-55, -134], [-10, -140], [40, -146]], H, { n: lite ? 16 : 46, carts: 0, sp: 3.2, w: 14, dress: ["lksoldier"], seed: 61 });
var hs = [];
for (var i = 0; i < (lite ? 2 : 6); i++) {
var h = lkwCreature("wkhorse", "kh" + i);
h.position.set(-90 + i * 24, H(-90 + i * 24, -138), -138 + i);
h.rotation.y = Math.PI / 2;
G.add(h);
hs.push(h);
LKW.people.push({ g: h, y: H(-90 + i * 24, -138), o: { wander: 8, sp: 1.6 } });
}
men.userData.horses = hs;
}
if (men) {
men.visible = !!st.soldiers;
(men.userData.horses || []).forEach(function (h) { h.visible = !!st.soldiers; });
}
});
},
function (G, H) {
var S = LKW_SQ2, lite = lkwLite(), T = S.town, ty = H(T[0], T[1]);
var cob = new THREE.Mesh(new THREE.PlaneGeometry(56, 46), lkwMat("cobble"));
cob.rotation.x = -Math.PI / 2;
cob.position.set(T[0], ty + 0.06, T[1]);
G.add(cob);
(LKW.noTurf || (LKW.noTurf = [])).push({ x0: T[0] - 30, x1: T[0] + 30, z0: T[1] - 25, z1: T[1] + 25 });
[[T[0] - 38, T[1], Math.PI / 2], [T[0] + 38, T[1], -Math.PI / 2]].forEach(function (q) { lkwShops(G, q[0], q[1], 3, { ry: q[2], y: H(q[0], q[1]), names: ["BAKER", "PLUM-CAKES", "DRAPER", "CHANDLER", "SADDLER", "CROWN AND ANCHOR"] }); lkwSolid(q[0], q[1], 9.4, 19, H(q[0], q[1]) - 1, H(q[0], q[1]) + 10, q[2]); });
[[T[0] - 18, T[1] - 32, 0], [T[0] + 18, T[1] - 32, 0], [T[0] - 18, T[1] + 32, Math.PI], [T[0] + 18, T[1] + 32, Math.PI]].forEach(function (q, i) { var y = H(q[0], q[1]); lkwTownHouse(G, q[0], q[1], 12, 8, 8, { y: y, ry: q[2], wall: i % 2 ? "brick" : "render", roof: i % 2 ? "slate" : "tile" }); lkwSolid(q[0], q[1], 12.4, 8.4, y - 1, y + 10, -q[2]); });
var mc = new THREE.Group();
mc.position.set(T[0] + 12, ty, T[1] - 8);
G.add(mc);
lkwBox(mc, 2.4, 0.5, 2.4, lkwMat("ashlar"), 0, 0, 0);
lkwCyl(mc, 0.25, 0.3, 4, lkwMat("ashlar"), 0, 0.5, 0, 8);
lkwBox(mc, 0.9, 0.2, 0.2, lkwMat("ashlar"), 0, 4.0, 0);
lkwRound(T[0] + 12, T[1] - 8, 1.4, ty - 1, ty + 5);
lkwLamp(G, T[0] - 10, T[1] + 10, H, {});
lkwLamp(G, T[0] + 10, T[1] - 14, H, {});
var dust = null;
lkwLiveOn(function (st) {
if (st.fight && !dust) {
var n = lite ? 60 : 200, pos = new Float32Array(n * 3), gg = new THREE.BufferGeometry();
gg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
dust = new THREE.Points(gg, new THREE.PointsMaterial({ color: 0xC8B898, size: lite ? 1.2 : 0.8, transparent: true, opacity: 0.45, depthWrite: false }));
dust.position.set(T[0], ty, T[1]);
dust.frustumCulled = false;
G.add(dust);
LKW.ticks.push(function () { if (!dust.visible)
return; var p = gg.attributes.position, t = LKW.t; for (var i = 0; i < n; i++) {
var a = t * 0.6 + i * 0.31, r = 4 + (i % 9) * 0.6;
p.setXYZ(i, Math.cos(a) * r, 0.3 + ((i * 0.37 + t * 0.4) % 2.5), Math.sin(a) * r * 0.7);
} p.needsUpdate = true; });
}
if (dust)
dust.visible = !!st.fight;
});
lkwCrowd("lktown", [["A woman with a basket", "f", "lktown", "They've been at it all morning. Round and round the town, for the crown."], ["A baker in his apron", "m", "lktown", "White bread, brown bread, and plum-cake, all ready for when they've done."], ["An old man on a bench", "m", "lktown", "The Lion beat the Unicorn all round the town, same as the song says."], ["A girl with a hoop", "f", "lktown", "They drummed them out of town last time!", null, true], ["A drummer", "m", "lktown", "When it's done, we drum them out."]], T[0] - 24, T[1] - 20, T[0] + 24, T[1] + 20, { wander: 4 });
var K = S.kwood, B = LKW_BO, inW = function (x, z) { return x > -108 && x < -2 && z < -232 && z > -282 && Math.hypot(x - K[0], z - K[1]) > 14 && Math.abs(x - B.file) > 3; };
lkxTrees(G, "oak", lkwScatter(871, lite ? 24 : 80, -108, -282, -2, -232, inW, H, 1.0, 1.7), [0x3E6A2A, 0x4A7A2E]);
lkxTrees(G, "pine", lkwScatter(872, lite ? 8 : 24, -108, -282, -2, -232, inW, H, 1.0, 1.5), [0x2E4A26]);
if (typeof lkxBracken === "function")
lkxBracken(G, lkwScatter(873, lite ? 80 : 360, -108, -282, -2, -232, inW, H, 0.6, 1.2));
lkwSpot(S.lastbrook[0] + 1.5, S.lastbrook[1], 3, "The last brook", "look across it", function () { setStatus("♛ <b>The Eighth Square, just across the brook.</b> Only a few yards more, down the hill and over the little brook, and you'll be a Queen."); });
},
function (G, H) {
var S = LKW_SQ2, lite = lkwLite(), C = S.castle, cy = H(C[0], C[1]);
var R = wRand(881);
for (var i = 0; i < (lite ? 4 : 10); i++) {
var x = -100 + R() * 90, z = -300 - R() * 40;
if (Math.abs(x - LKW_BO.file) < 5)
continue;
lkxRoseTree(G, x, z, H(x, z), { s: 0.8 + R() * 0.4 });
}
var g = new THREE.Group();
g.position.set(C[0], cy, C[1]);
G.add(g);
var st = lkwMat("ashlar"), dk = lkwMat("greystone");
lkwBox(g, 40, 9, 3, st, 0, 0, 16);
lkwBox(g, 3, 9, 32, st, -20, 0, 0);
lkwBox(g, 3, 9, 32, st, 20, 0, 0);
lkwBox(g, 40, 9, 3, st, 0, 0, -16);
for (var c = -19; c <= 19; c += 2.4)
lkwBox(g, 1.2, 1.2, 3.2, st, c, 9, 16);
[[-20, 16], [20, 16], [-20, -16], [20, -16]].forEach(function (t) { lkwCyl(g, 3.6, 4, 14, dk, t[0], 0, t[1], 16); var cn = new THREE.Mesh(new THREE.ConeGeometry(4.4, 6, 16), lkwMat("slate")); cn.position.set(t[0], 17, t[1]); g.add(cn); var fl = lkwBox(g, 0.08, 2.4, 0.08, lkwMat("iron"), t[0], 20, t[1]); var pen = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8), lkwLam(t[0] < 0 ? 0xB01E24 : 0xF2EDE0, { ds: 1 })); pen.position.set(t[0] + 0.7, 21.8, t[1]); g.add(pen); });
lkwBox(g, 5, 2.8, 3.2, lkwLam(0x0E0A08), 0, 6.2, 16.02);
var ar = new THREE.Mesh(lkwGeo("lkCArch", function () { return new THREE.TorusGeometry(2.5, 0.4, 6, 16, Math.PI); }), st);
ar.position.set(0, 6.2, 17.6);
g.add(ar);
lkwBox(g, 5, 6.2, 0.2, lkwMat("darkoak"), 0, 0, 17.4);
lkwSign(g, "QUEEN ALICE", 6, 0.9, 0, 9.6, 17.62, 0, { bg: "#F4ECD8", ink: "#6A1A1A" });
[[-3.6, "Visitors' Bell"], [3.6, "Servants' Bell"]].forEach(function (b) { lkwSign(g, b[1], 1.6, 0.3, b[0], 2.6, 17.62, 0, { bg: "#F2EAD4", ink: "#2A1A10" }); lkwCyl(g, 0.05, 0.05, 0.5, lkwMat("brass"), b[0], 1.8, 17.7, 6); });
lkwSolid(C[0], C[1] + 16, 40, 3.2, cy - 1, cy + 12);
lkwSolid(C[0] - 20, C[1], 3.2, 32, cy - 1, cy + 12);
lkwSolid(C[0] + 20, C[1], 3.2, 32, cy - 1, cy + 12);
lkwSolid(C[0], C[1] - 16, 40, 3.2, cy - 1, cy + 12);
[[-20, 16], [20, 16], [-20, -16], [20, -16]].forEach(function (t) { lkwRound(C[0] + t[0], C[1] + t[1], 4.1, cy - 1, cy + 16); });
var Rc = LKW.rooms.filter(function (q) { return q.key === "castle"; })[0];
if (Rc)
lkwDoor(Rc, "The arched doorway: QUEEN ALICE", C[0], C[1] + 19, Math.PI);
lkwSpot(C[0] - 3.6, C[1] + 18.6, 1.2, "The Visitors' Bell", "ring it", function () { setStatus("🔔 <b>The Visitors' Bell.</b> Nobody comes. \"I'm not a visitor, and I'm not a servant. There OUGHT to be one marked 'Queen,' you know.\""); });
lkwSpot(C[0] + 3.6, C[1] + 18.6, 1.2, "The Servants' Bell", "ring it", function () { setStatus("🔔 <b>The Servants' Bell.</b> It rings, a long way inside."); });
var Q = S.queens;
lkwBox(G, 6, 0.5, 1.6, lkwMat("moss"), Q[0], H(Q[0], Q[1]) - 0.1, Q[1]);
},
function (G) {
var X = LKW_ROOMXZ.board, R;
R = lkwRoom(G, "shop", X.shop[0], X.shop[1], 7, 6, { wall: "plaster", floor: "planks", name: "The little dark shop", h: 3, lightI: 0.55, env: "shop", beams: 1 });
[-3.3, 3.3].forEach(function (x) { lkwShelves(R.g, x, -0.4, 2.6, 2.6, x < 0 ? Math.PI / 2 : -Math.PI / 2, { books: 0 }); });
lkwShelves(R.g, 0, -2.8, 3.6, 2.6, 0, { books: 0 });
var R2 = wRand(891), things = [];
for (var i = 0; i < 60; i++) {
var w = R2() < 0.5, x = w ? (R2() < 0.5 ? -3.1 : 3.1) : (-1.6 + R2() * 3.2), z = w ? (-1.6 + R2() * 2.4) : -2.6, y = 0.4 + Math.floor(R2() * 4) * 0.6;
things.push([x, y, z, R2()]);
}
things.forEach(function (t) {
var k = Math.floor(t[3] * 4), m;
if (k === 0)
m = new THREE.Mesh(lkwGeo("lkThB", function () { return new THREE.CylinderGeometry(0.06, 0.07, 0.22, 8); }), lkwShine([0x3A6A3A, 0x8A3A2A, 0x2A3A6A][Math.floor(t[3] * 30) % 3], 0.2, 0.1));
else if (k === 1)
m = new THREE.Mesh(lkwGeo("lkThW", function () { return new THREE.SphereGeometry(0.09, 8, 6); }), lkwLam([0xD8C8A8, 0xB83A3A, 0x5A7AB8][Math.floor(t[3] * 30) % 3]));
else if (k === 2)
m = new THREE.Mesh(lkwBoxG(0.18, 0.12, 0.14), lkwLam([0x8A6A3A, 0xC8B080, 0x6A4A5A][Math.floor(t[3] * 30) % 3]));
else
m = new THREE.Mesh(lkwGeo("lkThE", function () { var s = new THREE.SphereGeometry(0.06, 8, 6); s.scale(1, 1.3, 1); return s; }), lkwLam(0xF4ECD8));
m.position.set(t[0], t[1] + 0.1, t[2]);
R.g.add(m);
m.userData.base = [t[0], t[1] + 0.1, t[2]];
});
var items = R.g.children.filter(function (m) { return m.userData.base; });
LKW.ticks.push(function (dt) { if (!lkwInRoom())
return; var t = LKW.t; items.forEach(function (m, i) { var b = m.userData.base; m.position.y = b[1] + Math.max(0, Math.sin(t * 0.4 + i * 1.7) - 0.92) * 6; }); });
lkwBox(R.g, 3.4, 1.0, 0.7, lkwMat("darkoak"), 0, 0, -1.3);
lkwBox(R.g, 3.5, 0.06, 0.8, lkwMat("oak"), 0, 1.0, -1.3);
lkwChair(R.g, 0.6, -2.0, 0, { arm: 1, mat: "darkoak" });
lkwCandle(R.g, -1.2, 1.06, -1.3, { brass: 1 });
lkwWindowIn(R.g, -2, 1.6, 2.92, Math.PI, 1.2, 1.0, { sky: 0xB8D8E8 });
R = lkwRoom(G, "castle", X.castle[0], X.castle[1], 16, 24, { wall: "ashlar", floor: "checker", name: "The great hall of Queen Alice's castle", h: 8, lightI: 1.0, env: "feast", dw: 2.4, dh: 3.6 });
lkwTable(R.g, 0, -1, 2.4, 18, 0.8, { mat: "darkoak", cloth: 0xF4F0E6 });
for (var s = 0; s < 14; s++) {
[-1, 1].forEach(function (sd) { lkwChair(R.g, sd * 1.6, -8.6 + s * 1.25, sd > 0 ? -Math.PI / 2 : Math.PI / 2, {}); });
}
[-1.4, 0, 1.4].forEach(function (x, i) { lkwChair(R.g, x, -11.2, 0, { arm: 1, mat: i === 1 ? "gilt" : "darkoak" }); });
var cl = [];
for (var c = 0; c < 18; c++)
cl.push({ x: (c % 2 ? 0.5 : -0.5), y: 0.8, z: -9.5 + c * 1.0 });
lkxCandles(R.g, cl, null, {});
lkxChandelier(R.g, 0, 7, -6, 1.2, 2, null, null, 8);
lkxChandelier(R.g, 0, 7, 4, 1.2, 2, null, null, 8);
[-7.9, 7.9].forEach(function (x) { for (var k = 0; k < 4; k++)
lkxSconce(R.g, x, 3.2, -9 + k * 6, x < 0 ? Math.PI / 2 : -Math.PI / 2); lkwWindowIn(R.g, x, 5.2, -4, x < 0 ? Math.PI / 2 : -Math.PI / 2, 1.6, 3, { sky: 0x8AB8E0 }); lkwWindowIn(R.g, x, 5.2, 4, x < 0 ? Math.PI / 2 : -Math.PI / 2, 1.6, 3, { sky: 0x8AB8E0 }); });
lkxDrape(R.g, 0, 0.2, -11.9, 10, 7.4, 0, lkwMat("redvelvet"), {});
lkwRug(R.g, 0, 4, 4, 8, 0x7A2A2A);
var mut = new THREE.Group();
mut.position.set(-0.4, 0.82, -9.6);
R.g.add(mut);
lkwCyl(mut, 0.5, 0.4, 0.04, lkwShine(0xF4F2EC, 0.2, 0), 0, 0, 0, 18);
var mt = new THREE.Mesh(lkwGeo("lkMut", function () { var s = new THREE.SphereGeometry(0.18, 10, 8); s.scale(1, 0.8, 1.6); return s; }), lkwLam(0x8A4A2A));
mt.position.y = 0.12;
mut.add(mt);
lkwCyl(mut, 0.03, 0.03, 0.18, lkwLam(0xF4ECD8), 0, 0.14, 0.32, 6).rotation.x = 1.2;
var pud = new THREE.Group();
pud.position.set(0.5, 0.82, -9.6);
R.g.add(pud);
lkwCyl(pud, 0.5, 0.4, 0.04, lkwShine(0xF4F2EC, 0.2, 0), 0, 0, 0, 18);
var pd = new THREE.Mesh(lkwGeo("lkPud", function () { return new THREE.SphereGeometry(0.22, 12, 8, 0, 6.3, 0, 1.7); }), lkwLam(0x4A2618));
pd.position.y = 0.04;
pud.add(pd);
var hol = new THREE.Mesh(lkxPetalGeo(0.04, 0.14, 0.02), lkwLam(0x1E5A28, { ds: 1 }));
hol.position.y = 0.26;
pud.add(hol);
var tur = lkwCyl(R.g, 0.26, 0.2, 0.3, lkwShine(0xF4F2EC, 0.2, 0), 0, 0.82, -7.6, 16);
var bots = [];
for (var b = 0; b < 10; b++) {
var bt = new THREE.Group();
bt.position.set((b % 2 ? 0.7 : -0.7), 0.82, -7 + b * 1.4);
R.g.add(bt);
lkwCyl(bt, 0.05, 0.06, 0.28, lkwShine(0x2A4A2A, 0.15, 0.1), 0, 0, 0, 8);
lkwCyl(bt, 0.018, 0.02, 0.1, lkwShine(0x2A4A2A, 0.15, 0.1), 0, 0.28, 0, 6);
bt.userData.home = [bt.position.x, 0.82, bt.position.z];
bots.push(bt);
}
lkwLiveOn(function (st) {
if (st.chaos && !R.g.userData.wings) {
R.g.userData.wings = 1;
bots.forEach(function (bt) { [-1, 1].forEach(function (sd) { var w = lkwCyl(bt, 0.14, 0.14, 0.012, lkwShine(0xF4F2EC, 0.2, 0), sd * 0.16, 0.14, 0, 14); w.rotation.z = Math.PI / 2 + sd * 0.4; }); [-1, 1].forEach(function (sd) { var f = lkwCyl(bt, 0.006, 0.006, 0.16, lkwShine(0xC8CCD4, 0.3, 0.9), sd * 0.03, -0.16, 0, 4); }); });
}
R.g.userData.chaos = !!st.chaos;
});
LKW.ticks.push(function () { if (!R.g.userData.chaos)
return; var t = LKW.t; bots.forEach(function (bt, i) { bt.position.set(Math.cos(t * 0.8 + i) * (2 + i % 3), 2 + Math.sin(t * 1.3 + i * 2) * 1.2, -4 + Math.sin(t * 0.5 + i) * 6); bt.rotation.z = Math.sin(t * 6 + i) * 0.3; }); });
},
function () {
var S = lkwSc(), k = S.env;
if (LKW.envK && LKW_ENV[LKW.envK])
k = LKW.envK;
if (LKW.night)
k = LKW.envK === "moon" || LKW.envK === "storm" ? LKW.envK : "night";
if (lkwInRoom()) {
var L = lkwLocalSc(), R = lkwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
var E = {}, B = LKW_ENV[k] || LKW_ENV.lake;
for (var q in B)
E[q] = B[q];
if (lkwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (LKW.moving || LKW.ride)
return true;
var S = lkwSc(), D = LKW_SCN[LKW.sc];
if (!D)
return false;
if (lkwInRoom()) {
if (lkwSolidAt(x, z, feet))
return true;
return lkwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (lkwSolidAt(x, z, feet))
return true;
var fl = lkwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = lkwLand(x, z);
if (hh > feet + 1.3 * Math.min(1.4, Math.max(0.12, LKW.size || 1)))
return true;
if (feet - hh > 7)
return true;
var w = D.wl ? D.wl(x, z) : null;
if (w !== null && w - hh > 1.1)
return true;
return false;
},
function (L) {
if (lkwInRoom()) {
var R = lkwRoomAt(L.x, L.z);
if (R)
return R.name;
}
var best = null, bd = 1e9;
for (var k in LKW_AT) {
var A = LKW_AT[k];
if (A.sc !== LKW.sc || !(A.name || LKW_ATN[k]))
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A.name || LKW_ATN[k];
}
}
return best && bd < 70 ? best : lkwSc().name;
},
function (dt) {
LKW.t += dt;
if (!LKW.built || !LKW.scG)
return;
lkwSizeTick(dt);
var S = lkwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72 - lkwEyeOff();
LKW.inRm = lkwInRoom();
LKW.et = (LKW.et || 0) + dt;
if (LKW.et > 0.8) {
LKW.et = 0;
worldEnv(lkwEnvNow());
}
var flow = LKW.t * 0.03;
LKW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
LKW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (LKW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(LKW.t * 3 + i * 2)) * 0.3; f.rotation.y = LKW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(LKW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(LKW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, LKW.inRm ? -500 : lkwLand(L.x, L.z), L.z);
}
});
(LKW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
(LKW.smoke || []).forEach(function (g) { g.children.forEach(function (m, i) { m.position.x += Math.sin(LKW.t * 0.1 + i) * dt * 0.4; m.rotation.y += dt * 0.02; }); });
LKW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return lkwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof lkbTick === "function")
try {
lkbTick(dt, L);
}
catch (e) {
var em = String(e && e.message);
LKW.e1 = LKW.e1 || {};
if (!LKW.e1[em]) {
LKW.e1[em] = 1;
if (window.console)
console.warn("[looking-glass] book", e && e.stack ? String(e.stack).slice(0, 400) : e);
}
}
if (!LKW.bannerBook)
worldBanner("<b>♟️ " + LKW_NAME + "</b> · " + esc(lkwPlaceName(L)) + (LKW.night ? " · night" : ""));
LKW.pt = (LKW.pt || 0) + dt;
if (LKW.pt < 0.15)
return;
LKW.pt = 0;
if (LKW.moving || LKW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
LKW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof lkbTalk === "function" && lkbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
LKW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : lkwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof lkbSpot === "function")
lkbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof lkbIdlePrompt === "function")
lkbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = lkwAtPt(opt.at) || (typeof lkbStartAt === "function" && lkbStartAt()) || lkwAtPt("hearth");
try {
lkwCrxKinds();
if (typeof crxWarm === "function" && !lkwLite())
crxWarm(LKW_CRX_WARM);
}
catch (e) { }
lkwScene(A.sc);
var S = LKW_SC[A.sc], y = A.y != null ? A.y : lkwGround(A.x, A.z);
camera.position.set(LKW.base + S.x + A.x, y + 1.72 + lkwEyeOff(), A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
LKW.moving = false;
LKW.ride = null;
LKW.inRm = lkwInRoom();
worldEnv(lkwEnvNow());
setStatus("♟️ <b>" + LKW_NAME + ".</b> Lewis Carroll's book, the whole of it: Alice's drawing-room and the looking-glass, Looking-Glass House, the garden of live flowers, and the great chessboard country square by square to the Eighth Square and the feast. <b>Press E</b> for the book.");
if (typeof lkbEnter === "function")
try {
lkbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[looking-glass] enter", e);
}
},
function () {
lkwSceneDrop();
for (var k in LKW.mats) {
var m = LKW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in LKW.tex) {
var x = LKW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in LKW_GEO) {
try {
LKW_GEO[g].dispose();
}
catch (e) { }
}
LKW.mats = {};
LKW.tex = {};
LKW_GEO = {};
LKW.built = false;
LKW.G = null;
LKW.lights = 0;
},
function (P, n, sp) {
var lite = lkwLite();
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
LKW.fx.push(p);
return p;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = LKW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = LKW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: LKW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return lkbPos(at.at);
var C = LKB_CH[lkbS().ch], i = lkbS().s, c = C && C.cast ? C.cast.filter(function (d) { return lkbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? lkbPos(c.at) : null;
}
if (at.spot) {
var Sp = LKW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: LKW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return lkbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || LKW.sc, x: at.x, z: at.z, y: at.y };
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
if (LKB.beam && LKB.beam.parent === LKW.scG)
return LKB.beam;
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
LKW.scG.add(g);
LKB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return lkwLam(c); }, m;
switch (kind) {
case "load":
m = lkwBox(g, 0.62, 0.42, 0.48, lkwMat("planks"), 0, 0, 0);
[-0.22, 0.22].forEach(function (x) { lkwBox(g, 0.05, 0.44, 0.5, lkwMat("darkoak"), x, 0, 0); });
lkwBox(g, 0.66, 0.04, 0.52, lkwMat("darkoak"), 0, 0.42, 0);
lkwBox(g, 0.12, 0.06, 0.03, lkwMat("iron"), 0, 0.3, 0.25);
break;
case "rifle":
var rf = new THREE.Group();
rf.rotation.y = 0.4;
g.add(rf);
m = lkwCyl(rf, 0.018, 0.018, 0.8, lkwMat("iron"), 0, 0, 0, 8);
m.rotation.x = Math.PI / 2;
m.position.set(0, 0.06, -0.3);
lkwBox(rf, 0.06, 0.07, 0.34, lkwMat("darkoak"), 0, 0.02, 0.02);
var stk = lkwBox(rf, 0.05, 0.12, 0.36, lkwMat("darkoak"), 0, 0, 0.32);
stk.rotation.x = -0.12;
lkwBox(rf, 0.03, 0.04, 0.08, lkwMat("brass"), 0, 0.08, 0.1);
break;
case "thorn":
m = lkwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = lkwCyl(g, 0.07, 0.08, 1.4, lkwMat("bark"), 0, 0, 0, 8);
m.rotation.z = Math.PI / 2;
m.position.y = 0.08;
var tw = lkwCyl(g, 0.025, 0.03, 0.4, lkwMat("bark"), 0, 0, 0, 6);
tw.rotation.set(0.5, 0, 0.9);
tw.position.set(0.3, 0.14, 0.1);
break;
case "fruit":
for (var fi = 0; fi < 5; fi++) {
var fr = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 0.22, 7), M(0xE8C030));
fr.rotation.z = 1.2 + fi * 0.1;
fr.position.set(0, 0.08, (fi - 2) * 0.06);
g.add(fr);
}
m = g.children[0];
break;
case "egg":
m = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), M(0xE8E0C8));
m.scale.y = 1.3;
m.position.y = 0.2;
g.add(m);
break;
case "bone":
m = lkwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
lkwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = lkwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
lkwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), lkwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "pencil":
for (var pi = 0; pi < 3; pi++) {
var pc = lkwCyl(g, 0.012, 0.012, 0.18, M([0xC8A030, 0x3A6A3A, 0xA83A2A][pi]), 0, 0, 0, 6);
pc.rotation.z = Math.PI / 2;
pc.rotation.y = pi * 0.3;
pc.position.y -= 0.09;
pc.position.set(0, 0.014, (pi - 1) * 0.04);
}
m = g.children[0];
break;
case "note":
m = lkwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "paper":
m = lkwBox(g, 0.34, 0.03, 0.46, M(0xE8E2D0), 0, 0.02, 0);
lkwBox(g, 0.3, 0.005, 0.08, M(0x2A2A2A), 0, 0.04, -0.16);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M(0xC8945A));
m.scale.set(1.5, 0.8, 1);
m.position.y = 0.1;
g.add(m);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 10), lkwShine(0x1A3A1A, 0.2, 0));
m.position.y = 0.15;
g.add(m);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 8), lkwShine(0x1A3A1A, 0.2, 0));
nk.position.y = 0.35;
g.add(nk);
break;
case "tin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), lkwShine(0xA8A8A0, 0.4, 0.6));
m.position.y = 0.05;
g.add(m);
break;
case "coin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 12), lkwShine(0xE8C060, 0.3, 0.9));
m.position.y = 0.01;
g.add(m);
break;
case "spade":
m = lkwBox(g, 0.05, 0.05, 1.0, M(0x6A4A2A), 0, 0.03, 0);
lkwBox(g, 0.2, 0.02, 0.26, lkwShine(0x8A8A88, 0.4, 0.7), 0, 0.02, 0.6);
break;
case "post":
m = lkwBox(g, 0.08, 1.1, 0.08, M(0xE8E0CC), 0, 0, 0);
break;
case "skin":
m = new THREE.Mesh(lkwGeo("lkSkin", function () { var sh = new THREE.Shape(); sh.moveTo(-0.5, 0); sh.quadraticCurveTo(-0.6, 0.3, -0.3, 0.42); sh.lineTo(-0.1, 0.3); sh.lineTo(0.1, 0.3); sh.lineTo(0.3, 0.42); sh.quadraticCurveTo(0.6, 0.3, 0.5, 0); sh.quadraticCurveTo(0.6, -0.3, 0.3, -0.42); sh.lineTo(0, -0.36); sh.lineTo(-0.3, -0.42); sh.quadraticCurveTo(-0.6, -0.3, -0.5, 0); var e = new THREE.ShapeGeometry(sh); e.rotateX(-Math.PI / 2); return e; }), M(0xB8904A));
m.position.y = 0.02;
g.add(m);
break;
case "cane":
m = lkwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = lkwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
lkwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = lkwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
lkwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
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
m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), M(0x7A5A3A));
m.scale.set(1.6, 0.6, 0.8);
m.position.y = 0.06;
g.add(m);
var rt = lkwCyl(g, 0.012, 0.02, 0.3, M(0x8A6A4A), 0, 0, 0, 5);
rt.rotation.z = 1.2;
rt.position.set(0.2, 0.06, 0);
break;
case "clay":
for (var ci = 0; ci < 3; ci++) {
var cl = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12 + ci * 0.02, 1), M(0x9A6A44));
cl.scale.y = 0.6;
cl.position.set((ci - 1) * 0.18, 0.06, (ci % 2) * 0.1);
g.add(cl);
}
m = g.children[0];
break;
case "stone":
for (var si = 0; si < 3; si++) {
var st0 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1 + si * 0.03, 0), M(0x8A8A84));
st0.scale.y = 0.7;
st0.position.set((si - 1) * 0.2, 0.07, (si % 2) * 0.12);
st0.rotation.y = si;
g.add(st0);
}
m = g.children[0];
break;
case "knife":
m = lkwBox(g, 0.03, 0.015, 0.24, lkwShine(0xC8C8D0, 0.25, 0.9), 0, 0.02, -0.12);
lkwBox(g, 0.04, 0.035, 0.12, lkwMat("darkoak"), 0, 0.01, 0.06);
break;
case "rope":
m = new THREE.Mesh(lkwGeo("lkCoilI", function () { return new THREE.TorusGeometry(0.2, 0.035, 6, 18); }), lkwMat("rope"));
m.rotation.x = Math.PI / 2;
m.position.y = 0.04;
g.add(m);
var m2b = m.clone();
m2b.scale.set(0.75, 0.75, 1);
m2b.position.y = 0.1;
g.add(m2b);
break;
case "spear":
m = lkwCyl(g, 0.022, 0.022, 1.9, lkwMat("oak"), 0, 0, 0, 6);
m.rotation.z = Math.PI / 2;
m.position.y = 0.05;
var tip = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.22, 6), lkwShine(0x8A8A88, 0.35, 0.7));
tip.rotation.z = -Math.PI / 2;
tip.position.set(1.05, 0.05, 0);
g.add(tip);
break;
case "arrow":
for (var ar = 0; ar < 3; ar++) {
var sh2 = lkwCyl(g, 0.008, 0.008, 0.7, lkwMat("oak"), 0, 0, 0, 5);
sh2.rotation.z = Math.PI / 2;
sh2.position.set(0, 0.02, (ar - 1) * 0.05);
var hd = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.06, 5), M(0x2A2A2A));
hd.rotation.z = -Math.PI / 2;
hd.position.set(0.38, 0.02, (ar - 1) * 0.05);
g.add(hd);
}
m = g.children[0];
break;
case "meat":
m = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), M(0x8A2A22));
m.scale.set(1.5, 0.6, 1);
m.position.y = 0.08;
g.add(m);
var bn = lkwCyl(g, 0.02, 0.02, 0.2, M(0xE8E0CC), 0, 0, 0, 6);
bn.rotation.z = Math.PI / 2;
bn.position.set(0.28, 0.08, 0);
break;
case "nuts":
for (var ni = 0; ni < 5; ni++) {
var nu = new THREE.Mesh(new THREE.SphereGeometry(0.05, 7, 6), M(0x6A4A2A));
nu.position.set(Math.cos(ni * 1.3) * 0.08, 0.05, Math.sin(ni * 1.3) * 0.08);
g.add(nu);
}
m = g.children[0];
break;
case "lantern":
m = lkwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), lkwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = lkwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
lkwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), lkwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), lkwMat("glass"));
m.position.y = 0.08;
g.add(m);
lkwCyl(g, 0.02, 0.02, 0.1, lkwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = lkwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = lkwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
lkwFire(g, 0, 0.08, 0, 0.4);
break;
case "chain":
m = lkwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
break;
case "key":
m = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 6, 14), lkwShine(0xE8C048, 0.25, 0.9));
m.position.y = 0.04;
m.rotation.x = Math.PI / 2;
g.add(m);
lkwBox(g, 0.1, 0.01, 0.01, lkwShine(0xE8C048, 0.25, 0.9), 0.07, 0.04, 0);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.12, 12), lkwShine(0x5A8A9A, 0.1, 0));
m.position.y = 0.06;
g.add(m);
lkwCyl(g, 0.012, 0.02, 0.05, lkwShine(0x5A8A9A, 0.1, 0), 0, 0.12, 0, 8);
lkwSign(g, "DRINK ME", 0.07, 0.04, 0, 0.06, 0.042, 0, { bg: "#F4EAD0", ink: "#1A1A1A" });
break;
case "cake":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.04, 12), M(0xD8A860));
m.position.y = 0.02;
g.add(m);
for (var cu = 0; cu < 6; cu++) {
var c0 = new THREE.Mesh(new THREE.SphereGeometry(0.007, 5, 4), M(0x2A1A10));
c0.position.set(-0.025 + cu * 0.01, 0.041, 0);
g.add(c0);
}
break;
case "cakes":
for (var ck = 0; ck < 5; ck++) {
var cc = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.03, 10), M(0xD8A860));
cc.position.set((ck % 3 - 1) * 0.1, 0.015, Math.floor(ck / 3) * 0.1);
g.add(cc);
}
break;
case "fan":
for (var fv = 0; fv < 9; fv++) {
var vn = lkwBox(g, 0.02, 0.004, 0.24, M(0xF4ECE0), Math.sin((fv - 4) * 0.16) * 0.12, 0.01, Math.cos((fv - 4) * 0.16) * 0.12);
vn.rotation.y = (fv - 4) * 0.16;
}
break;
case "gloves":
[0, 0.1].forEach(function (o) { var gv = lkwBox(g, 0.07, 0.015, 0.17, M(0xF6F2EA), o, 0.01, 0); gv.rotation.y = 0.3 + o * 2; });
break;
case "comfit":
m = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.08), M(0xC83A5A));
m.position.y = 0.03;
g.add(m);
for (var cf = 0; cf < 5; cf++) {
var co = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 5), M([0xF4E0E8, 0xE8F4D8, 0xF8F0C8][cf % 3]));
co.position.set(-0.04 + cf * 0.02, 0.07, 0);
g.add(co);
}
break;
case "thimble":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.025, 10), lkwShine(0xC8C8C0, 0.3, 0.8));
m.position.y = 0.013;
g.add(m);
break;
case "pebble":
for (var pb = 0; pb < 3; pb++) {
var pe = new THREE.Mesh(new THREE.DodecahedronGeometry(0.03, 0), M(0x9A9488));
pe.position.set(pb * 0.05, 0.02, 0);
g.add(pe);
}
break;
case "shroom":
m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 6, 0, 6.3, 0, 1.4), M(0xD8C8A8));
m.position.y = 0.03;
g.add(m);
break;
case "card":
m = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.004, 0.13), M(0xF6F2E8));
m.position.y = 0.01;
m.rotation.y = 0.4;
g.add(m);
var hc = new THREE.Mesh(new THREE.CircleGeometry(0.018, 10), M(0xC81A2A));
hc.rotation.x = -Math.PI / 2;
hc.position.y = 0.013;
g.add(hc);
break;
case "tart":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.04, 12), M(0xD8A060));
m.position.y = 0.02;
g.add(m);
lkwCyl(g, 0.06, 0.06, 0.01, M(0xA81A2A), 0, 0.04, 0, 10);
break;
case "brush":
lkwBox(g, 0.03, 0.03, 0.3, M(0x6A4A2A), 0, 0.02, 0);
lkwBox(g, 0.06, 0.04, 0.06, M(0xC81A2A), 0, 0.02, 0.17);
break;
case "watch":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.015, 16), lkwShine(0xE8C048, 0.25, 0.9));
m.position.y = 0.01;
g.add(m);
lkwCyl(g, 0.034, 0.034, 0.004, M(0xF4F0E4), 0, 0.017, 0, 16);
break;
case "slate":
lkwBox(g, 0.26, 0.012, 0.18, M(0x2A2A2E), 0, 0.006, 0);
lkwBox(g, 0.28, 0.014, 0.2, M(0x8A6A3A), 0, 0, 0);
break;
case "worsted":
m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), M(0xB83A3A));
m.position.y = 0.06;
g.add(m);
var wt = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.006, 4, 16), M(0x8A2A2A));
wt.position.y = 0.06;
wt.rotation.x = 1.1;
g.add(wt);
break;
case "pawn":
m = lkxChessman("pawn:w", { s: 0.05 });
m.scale.setScalar(0.12);
g.add(m);
break;
case "redqueen":
m = lkxChessman("queen:r", { s: 0.07 });
m.scale.setScalar(0.14);
g.add(m);
break;
case "rush":
for (var ru = 0; ru < 5; ru++) {
var rs = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.7, 5), M(0x6A8A3A));
rs.rotation.z = 1.45 + ru * 0.04;
rs.position.set(0, 0.02 + ru * 0.01, -0.05 + ru * 0.025);
g.add(rs);
}
var rh = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 5), M(0x7A5A2A));
rh.scale.set(1, 3, 1);
rh.position.set(0.34, 0.04, 0);
g.add(rh);
break;
case "crown":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.08, 14, 1, true), lkwShine(0xD8A838, 0.3, 0.85));
m.material.side = THREE.DoubleSide;
m.position.y = 0.05;
g.add(m);
for (var cp = 0; cp < 7; cp++) {
var a = cp / 7 * 6.283, pt = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.06, 5), lkwShine(0xD8A838, 0.3, 0.85));
pt.position.set(Math.cos(a) * 0.105, 0.12, Math.sin(a) * 0.105);
g.add(pt);
}
break;
case "rattle":
var rb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), M(0xD8D8D0));
rb.position.set(0, 0.07, 0);
g.add(rb);
var rd = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.22, 6), M(0x8A6A3A));
rd.rotation.z = Math.PI / 2;
rd.position.set(0.15, 0.07, 0);
g.add(rd);
break;
case "biscuit":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.012, 12), M(0xD8B070));
m.position.y = 0.01;
g.add(m);
var b2 = m.clone();
b2.position.set(0.03, 0.022, 0.01);
g.add(b2);
break;
case "needles":
[-0.02, 0.02].forEach(function (dx, i) { var nd = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.32, 5), M(0xC8C8C0)); nd.rotation.z = Math.PI / 2 + (i ? 0.2 : -0.2); nd.position.set(0, 0.02, dx); g.add(nd); });
var kn = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), M(0xE8E0D0));
kn.position.y = 0.04;
g.add(kn);
break;
case "dish":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.03, 16), M(0xF4F2EA));
m.position.y = 0.015;
g.add(m);
var cv = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 8, 0, 6.283, 0, 1.4), lkwShine(0xD8D8D8, 0.25, 0.8));
cv.position.y = 0.03;
g.add(cv);
break;
case "pepper":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.1, 10), lkwShine(0xC8C8C0, 0.3, 0.7));
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
if (!P || !LKW.scG || P.sc !== LKW.sc)
return null;
var g = lkbItemMesh(kind), y = P.y != null ? P.y : lkwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
LKW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = lkwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (LKB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = LKW.spots.indexOf(I.S); if (j >= 0)
LKW.spots.splice(j, 1); LKB.items = LKB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.lkb = 1;
LKB.items.push(I);
return I;
},
function (k) {
if (LKB.tuneKey === k)
return;
LKB.tuneKey = k;
var old = LKB.tune;
LKB.tune = null;
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
if (!k || !LKB_TUNES[k])
return;
try {
var A = new Audio(LKB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
LKB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (LKB.tune !== A) {
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
if (LKB.text)
return fn(LKB.text);
if (LKB.textWait) {
LKB.textWait.push(fn);
return;
}
LKB.textWait = [fn];
var done = function (B) { LKB.text = B; var w = LKB.textWait; LKB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/looking-glass/glass.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
lkbText(function (B) {
var C = LKB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + lkbNum(i) + ". " + esc(C.t) + "</h3>" + LKB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(lkbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); LKB.readOpen = 0; LKB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = lkbS(), C = LKB_CH[S.ch];
if (!C)
return;
LKB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
LKB.readAsk = 0;
LKB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : LKW_NAME) + "</div><h3 style='margin:4px 0'>" + lkbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? T.p.slice(0, C.p0 != null ? C.p0 : 1).map(lkbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); LKB.readOpen = 0; lkbStepDone(); }, all: function () { lkbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Carroll's own words, all of it");
b += lkbKeeperBtns(fns);
worldCard(b, fns);
};
lkbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
LKB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); lkbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = lkbS(), C = LKB_CH[S.ch];
if (!C)
return;
lkbItemsClear();
lkbCastClear();
LKB.hold = 0;
var go = function () { lkbWorldState(); lkbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[lkb] setup", S.ch, e);
} lkbTune(C.tune || null); lkbStepBegin(); };
if (place && C.start) {
var P = lkbPos(C.start);
if (P && WLD.on === LKW_KEY) {
lkwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (LKW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = lkbStep();
lkbItemsClear();
LKB.hold = 0;
LKB.puzOpen = 0;
if (!b)
return;
b._key = lkbKey();
lkbWorldState();
try {
if (b.on)
b.on(lkbS().f);
}
catch (e) {
if (window.console)
console.warn("[lkb] on", e);
}
if (b.k === "read") {
lkbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { LKB.rew[k] = 0; });
if (b.k === "find") {
var Pf = lkbPos(b.at);
if (Pf && Pf.sc === LKW.sc)
lkbItemAdd(b.item, Pf, b.name, b.verb, function () { if (lkbKey() === b._key)
lkbStepDone(); });
}
if (b.k === "gather") {
var P = lkbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(lkbS().ch * 97 + lkbS().s * 13 + 7);
LKB.got = 0;
if (P && P.sc === LKW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = lkwGround(Q.x, Q.z, (P.y != null ? P.y : lkwLand(P.x, P.z)) + 1);
lkbItemAdd(b.item, Q, b.name, b.verb, function () { if (lkbKey() !== b._key)
return; LKB.got++; try {
if (b.each)
b.each(LKB.got);
}
catch (e) { } if (LKB.got < n) {
lkbSay((b.eachSay || "Got one.") + " " + LKB.got + " of " + n + ".");
return;
} lkbStepDone(); });
}
}
if (b.h)
lkbSay("<b>" + esc(LKB_CH[lkbS().ch].t) + ".</b> " + b.h);
},
function (b) {
LKB.puzOpen = 1;
LKB.puzT = performance.now();
var k = lkbKey(), fns = {}, h = LKB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + lkbExpand(b.html) + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right || b.any) {
if (b.yes)
lkbSay(b.yes);
if (lkbKey() === k)
lkbStepDone();
return;
}
lkbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (lkbKey() === k)
LKB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = lkbS(), C = LKB_CH[S.ch], b = lkbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[lkb] done", e);
}
if (b.say)
lkbSay(b.say);
S.s++;
if (window.LKB_LOG)
LKB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= LKB_CH.length - 1) {
S.done = 1;
S.s = 0;
lkbSave();
lkbItemsClear();
lkbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
lkbSave();
var nx = LKB_CH[S.ch];
setTimeout(function () { try {
lkbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[lkb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
lkbSave();
lkbStepBegin();
},
function () {
lkbTune("end");
var S = lkbS();
lkwSizeSet(1);
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + lkQ("Life, what is it but a dream?") + "</p><p style='font-size:12px;opacity:.75'>Lewis Carroll, Through the Looking-Glass (1871), the last lines</p><p>You have climbed through the looking-glass with Alice; set the chessmen on their feet in the hearth; found the house the wrong way round and the garden path that turns you back; talked with the live flowers; run with the Red Queen and stayed in the same place; ridden the railway over the brook; walked the wood where things have no names; met Tweedledum and Tweedledee and seen the Red King dreaming; pinned the White Queen's shawl; rowed with the Sheep; talked of words with Humpty Dumpty; seen the Lion and the Unicorn fight for the crown; been rescued by the White Knight and heard his song; and been crowned Queen Alice at your own feast. Then the shaking, and the waking, and the kitten. Which dreamed it?</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; lkbSave(); lkbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "Alice's drawing-room, the fourth of November");
if (typeof bhnOpen === "function") {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen("lookingglass"); };
}
worldCard(b, fns);
},
function (c) {
var C = LKB.cast[c.key || c.k];
if (lkbCastLive(C))
return C;
var P = lkbPos(c.at);
if (!P || P.sc !== LKW.sc)
return null;
var F = LKW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute, name: c.name, s: c.s, chess: c.chess, flower: c.flower };
if (c.dy != null)
o.y = lkwGround(P.x, P.z, 500) + c.dy;
var Pp;
if (c.beast) {
var yb = o.y != null ? o.y : lkwGround(P.x + (c.ox || 0), P.z + (c.oz || 0), 500), gb = lkwCreature(c.beast, c.key || c.k);
LKW.scG.add(gb);
gb.position.set(P.x + (c.ox || 0), yb, P.z + (c.oz || 0));
gb.rotation.y = c.ry || 0;
if (c.s)
gb.scale.multiplyScalar(c.s);
Pp = { g: gb, y: yb, o: {} };
LKW.people.push(Pp);
if (c.name && !c.mute)
lkwTalk(Pp, c.name, lkwPersona(c.persona || c.k), c.greet || "", c.r || 3.6);
}
else if (F.name && !c.dress)
Pp = lkwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = lkwDressed("lkb" + (c.key || c.k), c.dress || "gent", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : lkwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
LKW.scG.add(g);
Pp = { g: g, y: y, o: {} };
LKW.people.push(Pp);
if (c.name && !c.mute)
lkwTalk(Pp, c.name, lkwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
LKB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return LKB.cast[c.key || c.k];
},
function () {
var C = LKB_CH[lkbS().ch];
if (!C || !C.cast)
return;
var idx = lkbS().s;
var on = {};
C.cast.forEach(function (c) { var key = c.key || c.k; if (!(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until) && !on[key])
on[key] = c; });
C.cast.forEach(function (c) {
var key = c.key || c.k, want = on[key], have = LKB.cast[key];
if (!want) {
if (have)
lkbCastHide(key);
return;
}
if (want !== c)
return;
if (have && have.c && have.c !== c)
lkbCastHide(key);
if (!lkbCastLive(LKB.cast[key]))
lkbCastAdd(c);
});
},
function () {
var b = lkbStep(), key = "pass", have = LKB.cast[key];
var want = b && b.k === "talk" && b.at && b.at.at ? b : null, P = want ? lkbPos(want.at.at) : null;
if (!want || !P || P.sc !== LKW.sc) {
if (have)
lkbCastHide(key);
return;
}
if (have && have.b === want && lkbCastLive(have))
return;
if (have)
lkbCastHide(key);
if (!want.pass && LKW.talk.some(function (T) { return T.name === want.who && T.p && T.p.g && T.p.g.parent; }))
return;
var pa = want.pass || {}, nm = String(want.who), fem = /woman|lady|girl|wife|Mrs|Miss|mother|maid/i.test(nm), kid = pa.child || /boy|girl|child/i.test(nm);
var dr = pa.dress || (fem ? (kid ? "girl" : "maid") : (kid ? "boy" : "gent"));
var Pp = lkwOne("pass" + lkbS().ch + "_" + lkbS().s, want.who, pa.sex || (fem ? "f" : "m"), dr, P.x, P.z, pa.ry || 0, pa.greet || "", { y: P.y, child: !!kid, persona: LKP.townfolk });
if (Pp)
LKB.cast[key] = { g: Pp.g, P: Pp, c: { k: key }, b: want };
},
function () {
if (!LKW.scG)
return;
lkbCastClear();
var S = lkbS(), C = LKB_CH[S.ch];
if (S.started && !S.done && C && C.cast && lkbCastHere(C)) {
lkbCastTick();
return;
}
(LKB_FOLK_AT[LKW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = lkwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
LKB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!lkbActive())
return false;
var b = lkbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = lkbKey();
worldPrompt(null);
var next = function () { if (lkbKey() === k)
lkbStepDone(); };
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
var body = lkbExpand(b.card[1]);
worldCard(LKB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + body + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
lkbVoices(T.name, body, k);
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
LKB.wt += dt;
if (LKB.wt > 0.5) {
LKB.wt = 0;
if (lkbActive() && lkbCastHere(LKB_CH[lkbS().ch]))
lkbCastTick();
if (lkbActive())
lkbPassTick();
var S0 = lkbS();
S0.seen[LKW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!lkbActive()) {
if (LKB.beam)
LKB.beam.visible = false;
LKW.bannerBook = false;
return;
}
var S = lkbS(), b = lkbStep(), t = LKW.t, feet = camera.position.y - 1.72 - lkwEyeOff();
LKB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? lkbPos(b.at) : null, here = P && P.sc === LKW.sc, bm = lkbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + lkbScName(P.sc) + ": press E for the book)";
if (here && !LKW.moving && !LKW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : lkwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = lkbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !LKW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (LKB.readAsk)
break;
if (!LKB.readOpen)
lkbChapterCard();
else {
LKB.readOpen = 0;
lkbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
lkbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
LKB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(LKB.hold, dt);
}
catch (e) { }
if (LKB.hold >= (b.sec || 8)) {
lkbStepDone();
return;
}
}
else
LKB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return LKB.rew[k]; })) {
lkbStepDone();
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
lkbStepDone();
return;
}
break;
}
case "puzzle":
if ((!LKB.puzOpen || performance.now() - (LKB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
lkbPuzzleCard(b);
break;
}
}
var C = LKB_CH[S.ch], prog = b && b.k === "hold" && LKB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - LKB.hold)) + " s)" : b && b.k === "gather" ? " (" + (LKB.got || 0) + " of " + (b.n || 3) + ")" : "";
LKW.bannerBook = true;
worldBanner("⚡ <b>" + lkbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = lkbS(), C = LKB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Lewis Carroll · Through the Looking-Glass, and What Alice Found There (1871), the whole book</div><h3 style='margin:4px 0'>♟️ Through the Looking-Glass</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + lkbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((lkbStep() || {}).h || "") + "</p>";
var st = lkbStep(), P = st && st.at ? lkbPos(st.at) : null, Cs = lkbPos(C.start);
var to = P && P.sc !== LKW.sc ? P : (!P && Cs && Cs.sc !== LKW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + lkbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); lkwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { lkbPopulate(); lkbStepBegin(); }); };
}
}
else
b += "<p>The fourth of November, and snowing. Alice is curled up in the great arm-chair by the fire in her drawing-room, half talking and half asleep, with the black kitten in her lap and a game of chess on the table, when she wonders what the house in the looking-glass over the chimney-piece is like. Then the glass begins to melt away, like a bright silvery mist, and she is through it, and so are you. All twelve chapters, every one played: Looking-Glass House and the live chessmen, the garden of live flowers, the run with the Red Queen, the railway and the Looking-Glass insects, the wood where things have no names, Tweedledum and Tweedledee, the White Queen and the Sheep, Humpty Dumpty, the Lion and the Unicorn, the White Knight, and Queen Alice's feast. About three and a half hours at your own pace; your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Alice's drawing-room", S.started ? "Back to where you were" : "One thing was certain, that the WHITE kitten had had nothing to do with it");
fns.go = function () { worldCard(null); lkbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; lkbSave(); lkbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(LKW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(LKW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (LKW_SCN[k].start || { x: 0, z: 0 }); lkwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, lkbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += lkbKeeperBtns(fns);
worldCard(b, fns);
},
function (h) {
return String(h == null ? "" : h).replace(/\u27E6(\d+):(\d+)-(\d+)\u27E7/g, function (m, c, a, b) {
var T = LKB.text && LKB.text.ch && LKB.text.ch[+c];
if (!T) {
try {
lkbText(function () { });
}
catch (e) { }
return "<p><i>(The page is being fetched: close this and open it again in a moment.)</i></p>";
}
var out = "";
for (var i = +a; i <= +b && i < T.p.length; i++)
out += lkbPara(T.p[i]);
return "<div style='max-height:52vh;overflow:auto'>" + out + "</div><div style='font-size:11px;opacity:.6;margin-top:4px'>" + esc(T.src) + "</div>";
});
},
function (name, html, k) {
if (typeof fvoSpeak !== "function" || (typeof fvoOn === "function" && !fvoOn()))
return;
var txt = String(html || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " "), re = /(^|[\s(\u2014-])'(.+?)'(?=[\s,.;:!?)\u2014-]|$)/g, m, L = [];
var key = (name || "").replace(/^The /, "").split(" ")[0];
while ((m = re.exec(txt)) && L.length < 14) {
var after = txt.slice(re.lastIndex, re.lastIndex + 44), bef = txt.slice(Math.max(0, m.index - 50), m.index), tag = /said|replied|cried|asked|thought|remarked|began|went on|added|exclaimed|whispered|shouted|screamed/.test(after) ? after : bef;
var ia = tag.search(/\bAlice\b/), ik = key ? tag.indexOf(key) : -1, who = ia >= 0 && (ik < 0 || (tag === after ? ia < ik : ia > ik)) ? "Alice" : name;
L.push([who, m[2]]);
}
var i = 0, step = function () { if (i >= L.length || lkbKey() !== k)
return; var q = L[i++], V = LKW_VO[q[0]] || [], c = { name: q[0], ftkSex: V[0], ftkAge: V[1], fvoP: V[2], fvoRt: V[3] }; try {
fvoSpeak(c, q[1], function () { setTimeout(step, 250); });
}
catch (e) { } };
step();
},
function (C) {
var R = function (v) { return typeof v === "string" ? lkbIdx(C, v) : v; };
var cur = C.p0 != null ? C.p0 : 1;
C.steps.forEach(function (s) {
if (!s.pn)
return;
s.pa = cur;
s.pb = cur + s.pn - 1;
cur += s.pn;
var tok = "\u27E6" + C.txt + ":" + s.pa + "-" + s.pb + "\u27E7";
s.tok = tok + (s.html || "");
if (s.k === "talk")
s.card[1] = tok + (s.card[1] || "");
else if (!s.ya)
s.html = tok + (s.html || "");
});
C.pEnd = cur;
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
LKB_CH.push(C);
return C;
},
function (st, s) {
var v = function (k) { return lkbStV(st[k]); }, reb = false;
Object.keys(LKW.st).forEach(function (k) { if (!(k in st) && LKW.st[k] != null && LKW.st[k] !== false) {
delete LKW.st[k];
if (LKW_LIVEK.indexOf(k) < 0)
reb = true;
} });
Object.keys(st).forEach(function (k) { if (k === "env" || k === "night" || k === "nightUntil" || k === "nightFrom")
return; var nv = v(k); if (LKW.st[k] !== nv) {
LKW.st[k] = nv;
if (LKW_LIVEK.indexOf(k) < 0)
reb = true;
} });
if (typeof lkwLiveState === "function")
try {
lkwLiveState();
}
catch (e) { }
if (reb && !LKW.rebuilding && LKW.scBuilt) {
LKW.rebuilding = 1;
try {
lkwRebuild();
}
catch (e) { }
LKW.rebuilding = 0;
}
},
function (G) {
try {
if (typeof wdwBox !== "function")
return;
var H = typeof wdwBankH === "function" ? wdwBankH : function () { return 0; };
var X = LKH_HOUSE.x, Z = LKH_HOUSE.z, y = H(X, Z), g = new THREE.Group();
g.position.set(X, y, Z);
g.rotation.y = Math.PI;
G.add(g);
var lam = function (c) { return wdwLam(c); }, brick = wdwMat("brick"), trim = lam(0xF2EEE2), slate = wdwMat("slate");
wdwBox(g, 12, 7.4, 9, brick, 0, 0, 0);
wdwBox(g, 12.3, 0.5, 9.3, wdwMat("darkstone"), 0, 0, 0);
wdwBox(g, 12.4, 0.2, 9.4, trim, 0, 7.2, 0);
var rf = new THREE.Mesh(new THREE.ConeGeometry(0.7072, 1, 4, 1), slate);
rf.geometry.rotateY(Math.PI / 4);
rf.scale.set(13, 3, 10);
rf.position.y = 7.4 + 1.5;
g.add(rf);
[-3.6, 3.6].forEach(function (cx) { wdwBox(g, 1, 3, 1, brick, cx, 8.2, 0); });
[[-3.6, 1.2], [3.6, 1.2], [-3.6, 4.4], [3.6, 4.4], [0, 4.4]].forEach(function (q) { wdwBox(g, 1.3, 1.9, 0.12, lam(0x2A3440), q[0], q[1], 4.52); wdwBox(g, 1.5, 0.12, 0.2, trim, q[0], q[1] - 0.06, 4.56); wdwBox(g, 0.06, 1.9, 0.14, trim, q[0], q[1], 4.58); wdwBox(g, 1.3, 0.06, 0.14, trim, q[0], q[1] + 0.92, 4.58); });
wdwBox(g, 1.2, 2.4, 0.14, lam(0x1E4A2A), 0, 0.3, 4.54);
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.6, 14, 0, Math.PI), lam(0xE8D8A0));
fan.position.set(0, 2.72, 4.6);
g.add(fan);
[-0.95, 0.95].forEach(function (cx) { wdwCyl(g, 0.12, 0.14, 2.8, trim, cx, 0.3, 5.6, 12); });
wdwBox(g, 2.4, 0.2, 1.4, trim, 0, 3.1, 5.0);
wdwBox(g, 2.4, 0.3, 1.4, wdwMat("ashlar"), 0, 0, 5.0);
[-1, 1].forEach(function (sd) { wdwBox(g, 6.6, 0.9, 0.4, brick, sd * 4.6, 0, 11); wdwBox(g, 0.4, 0.9, 6, brick, sd * 7.7, 0, 8.2); });
wdwBox(g, 1.4, 0.3, 6, wdwMat("gravel"), 0, -0.24, 8.2);
if (typeof wdxRoseTree === "function")
try {
[-1, 1].forEach(function (sd) { for (var i = 0; i < 4; i++)
wdxRoseTree(g, sd * (2 + i * 1.2), 9.6 - i * 0.4, 0, { s: 0.55, col: ["#B81E32", "#E87890"][(i + (sd > 0 ? 1 : 0)) % 2] }); });
}
catch (e) { }
if (typeof wdwSign === "function")
wdwSign(g, "ALICE'S HOUSE", 1.8, 0.4, 0, 1.2, 11.25, 0, { bg: "#F2EAD4" });
if (typeof wdwSolid === "function") {
wdwSolid(X, Z, 12.4, 9.4, y - 1, y + 10, 0);
}
var dx = X, dz = Z - 5.4;
wdwSpot(dx, dz, 1.8, "Alice's house (Through the Looking-Glass)", "go in at the front door", function () { lkbOpenIn(); });
}
catch (e) {
if (window.console)
console.warn("[looking-glass] house", e);
}
}
];
});
