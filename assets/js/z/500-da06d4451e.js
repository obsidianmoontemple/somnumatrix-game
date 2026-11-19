/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(500, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (DRW.tex[k])
return DRW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = drwLite();
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
return (DRW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (DRW.mats[k])
return DRW.mats[k];
var own = name.slice(0, 2) === "b:", map = drwPhotoTex(name, mpt || 2), m;
if (drwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = drwPhotoTex(name, mpt || 2, true);
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
return (DRW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return drwM(k, function () {
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
return drwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return drwCanvas("bamboo", 64, 256, function (x, W, H) {
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
drwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return drwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return drwCanvas("tuft", 128, 64, function (x, W, H) {
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
return drwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return drwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
drwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return drwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = DRW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / DRW_CELL) + "," + Math.floor(z / DRW_CELL)];
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
p = dlnPerson("drw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("drw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || DRW.scG || DRW.G).add(p);
var P = { g: p, y: y, o: o };
DRW.people.push(P);
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
DRW.inst.push(m);
try {
m.computeBoundingSphere && m.computeBoundingSphere();
}
catch (e) { }
return m;
},
function (P, pts, w, hfn, mat, lift) {
if (hfn && pts.length > 1) {
var st = drwLite() ? 8 : 4, dp = [pts[0]];
for (var j = 1; j < pts.length; j++) {
var a0 = pts[j - 1], b0 = pts[j], n = Math.max(1, Math.ceil(Math.hypot(b0[0] - a0[0], b0[1] - a0[1]) / st));
for (var k = 1; k <= n; k++)
dp.push([a0[0] + (b0[0] - a0[0]) * k / n, a0[1] + (b0[1] - a0[1]) * k / n]);
}
pts = dp;
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
var lite = drwLite(), leaf = drwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
drwInst(P, drwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), drwMat("pale"), list, { shadow: !lite });
drwInst(P, drwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), drwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
drwInst(P, drwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), drwMat("bark"), list, { shadow: !lite });
drwInst(P, drwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), drwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
drwInst(P, drwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), drwMat("darkbark"), list, { shadow: !lite });
drwInst(P, drwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), drwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
drwInst(P, drwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), drwMat("bark"), list, { shadow: !lite });
drwInst(P, drwGeo("pfronds", function () { var g = drwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), drwLam(0xFFFFFF, { ds: 1, map: drwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
drwInst(P, drwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), drwMat("darkbark"), list, {});
drwInst(P, drwGeo("mfronds", function () { return drwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), drwLam(0xFFFFFF, { ds: 1, map: drwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
drwInst(P, drwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), drwMat("darkbark"), list, {});
drwInst(P, drwGeo("ffronds", function () { return drwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), drwLam(0xFFFFFF, { ds: 1, map: drwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
drwInst(P, drwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), drwMat("darkbark"), list, {});
drwInst(P, drwGeo("cyf", function () { return drwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), drwLam(0xFFFFFF, { ds: 1, map: drwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
drwInst(P, drwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), drwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: drwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
drwInst(P, drwGeo("bamL", function () { return drwCards(3, 2.6, 2.2, 5.4); }), drwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
drwInst(P, drwGeo("reed" + kind, function () { return drwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), drwLam(0xFFFFFF, { ds: 1, map: drwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
drwInst(P, drwGeo("tuft", function () { return drwCards(2, 1.6, 0.7, 0); }), drwLam(o.col || 0xFFFFFF, { ds: 1, map: drwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
drwInst(P, drwGeo("flw", function () { return drwCards(2, 0.9, 0.7, 0); }), drwLam(0xFFFFFF, { ds: 1, map: drwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
drwInst(P, drwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), drwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
drwInst(P, drwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || drwMat("rock"), list, {});
break;
}
case "cactus": {
drwInst(P, drwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), drwLam(0x4A7A3A), list, {});
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
function (kind, col) { return drwM("skinM" + kind + (col || ""), function () { var t = drwSkinTex(kind); t.repeat.set(2, 2); var m = drwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = drwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(drwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = drwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(drwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
drwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return drwGeo(k, function () {
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
var t = drwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), drwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || drwS("b:stucco", o.col || 0xF0E2C8, 3), trim = drwLam(0xFAF6EE), sh = drwLam(o.shut || 0x3A6A4A), glass = drwShine(0x1A2228, 0.2, 0.3);
drwBox(g, w, h, d, wall, 0, 0, 0);
drwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
drwBox(g, w + 0.12, 0.5, d + 0.12, drwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(drwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || drwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
drwBox(g, 1.3, 2.6, 0.12, drwMat("oak"), wx, 0, d / 2 + 0.02);
drwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = drwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = drwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!drwLite())
[-1, 1].forEach(function (s) { drwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
drwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
drwBox(g, 0.05, 0.9, 0.05, drwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
drwBox(g, 1.8, 0.05, 0.05, drwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
drwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (DRW.scG) {
if (DRW.scG.parent)
DRW.scG.parent.remove(DRW.scG);
DRW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
DRW.scG = null;
DRW.solids = [];
DRW.sgrid = null;
DRW.floors = [];
DRW.spots = [];
DRW.talk = [];
DRW.people = [];
DRW.beasts = [];
DRW.fx = [];
DRW.water = [];
DRW.inst = [];
DRW.hgt = null;
DRW.scBuilt = null;
if (typeof drbSceneDrop === "function")
try {
drbSceneDrop();
}
catch (e) { }
},
function (k) {
var D = DRW_SCN[k], S = DRW_SC[k];
if (!D || !S)
return;
var par = S.host ? (typeof WORLDS !== "undefined" && WORLDS[S.host] && WORLDS[S.host].g) : DRW.G;
if (!par)
return;
if (DRW.scBuilt === k && DRW.scG && DRW.scG.parent === par)
return;
drwSceneDrop();
var O = drwO(k);
DRW.sc = k;
DRW.scG = new THREE.Group();
DRW.scG.name = "dracula-" + k;
DRW.scG.position.set(O.x, 0, O.z);
par.add(DRW.scG);
DRW.hgt = D.h || function () { return 0; };
try {
D.build(DRW.scG);
}
catch (e) {
if (window.console)
console.warn("[dracula] scene", k, e);
}
DRW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
DRW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = drwAtPt(at);
if (!A)
return;
var v = drwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
DRW.moving = true;
var w0 = WLD.on;
setTimeout(function () {
if (WLD.on !== w0) {
v.style.opacity = "0";
DRW.moving = false;
return;
}
var h = drwHostOf(A.sc);
if (WLD.on !== h) {
if (!WLD.on) {
var C = camera.position;
WLD.from = { here: store.here || 0, x: C.x, y: C.y, z: C.z, yaw: yaw };
}
DRW.hop = 1;
try {
worldGo(h, { keepFrom: true, drwHop: 1 });
}
catch (e) { }
DRW.hop = 0;
if (WLD.on !== h) {
v.style.opacity = "0";
DRW.moving = false;
return;
}
}
drwScene(A.sc);
var y = A.y != null ? A.y : drwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
drwCam(A.sc, A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(drwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; DRW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(drwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), drwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; DRW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(drwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), drwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(drwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), drwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(drwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), drwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!drwLite() && typeof THREE.PointLight === "function" && (DRW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
DRW.lights = (DRW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
DRW.fx.push(g);
return g;
},
function (k) {
switch (k) {
case "brick": return drwS("brick", 0xC07A5E, 1.6);
case "yellowbrick": return drwS("brick", 0xD8C098, 1.6);
case "ashlar": return drwS("b:ashlar", 0xE8E0D0, 2.4);
case "stone": return drwS("stone", 0xD0C8B8, 2.4);
case "slate": return drwS("b:slate", 0x6A6E78, 2);
case "oak": return drwS("b:oak", 0x8A5E3A, 1.4);
case "floor": return drwS("b:oak", 0xA87A50, 1.8);
case "planks": return drwS("b:planks", 0x9A8060, 2);
case "damask": return drwS("b:damask", 0x8A3A3A, 1.2);
case "greenpaper": return drwS("b:damask", 0x4A6A52, 1.2);
case "bluepaper": return drwS("b:damask", 0x4A5A7A, 1.2);
case "velvet": return drwS("b:velvet", 0x6A1E22, 0.8);
case "greenvelvet": return drwS("b:velvet", 0x2E4A34, 0.8);
case "leather": return drwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return drwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return drwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "plaster": return drwS("plaster", 0xF0EAD8, 4);
case "ceiling": return drwLam(0xEDE6D6);
case "brass": return drwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "nickel": return drwShine(0xD8DCE0, 0.25, 0.9);
case "iron": return drwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "ivory": return drwShine(0xF2EAD8, 0.35, 0.05);
case "quartz": return drwM("quartz", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F4FF, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.55, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "granite": return drwS("b:limestone", 0x9A948C, 4);
case "terracotta": return drwS("b:terracotta", 0xC87A5A, 1.6);
case "earth": return drwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return drwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "lawn": return drwS("grass", 0xA8C888, 4);
case "gravel": return drwS("sand", 0xC8B898, 3);
case "paving": return drwS("paving", 0xC8C0B0, 2.4);
case "road": return drwS("asphalt", 0x8A8478, 5);
case "white": return drwS("b:marble", 0xF8F6F2, 3, { shine: 30 });
case "bronze": return drwS("b:brass", 0x7A6A3A, 1.6, { shine: 60 });
case "verdigris": return drwS("b:brass", 0x6A9A8A, 1.6, { shine: 30 });
case "greystone": return drwS("b:limestone", 0xB0ACA4, 4);
case "ruin": return drwS("b:limestone", 0xA8A498, 4);
case "porcelain": return drwS("b:darktile", 0x8AC8A8, 2, { shine: 90 });
case "rock": return drwS("b:strata", 0x8A7A6A, 6);
case "redrock": return drwS("b:strata", 0x8A3A2A, 8);
case "cave": return drwS("b:cave", 0x7A746C, 4);
case "moss": return drwS("b:moss", 0x7A9A5A, 3);
case "bark": return drwS("bark", 0x8A7A64, 2.5);
case "darkbark": return drwS("bark", 0x5A4E40, 3);
case "pale": return drwS("bark", 0xC8BCA8, 3);
case "sand": return drwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "snow": return drwS("snow", 0xF4F6FA, 4);
}
return drwS("earth", 0x8A7058, 5);
},
function (P, x, z, ry, mat, arm) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = drwMat("oak");
if (arm) {
drwBox(g, 0.9, 0.42, 0.85, mat, 0, 0, 0);
drwBox(g, 0.9, 0.8, 0.22, mat, 0, 0.4, 0.34);
[-1, 1].forEach(function (k) { drwBox(g, 0.18, 0.3, 0.85, mat, k * 0.4, 0.42, 0); });
drwBox(g, 0.7, 0.1, 0.6, mat, 0, 0.42, -0.04);
}
else {
drwBox(g, 0.46, 0.06, 0.46, mat, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { drwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.2); });
drwBox(g, 0.44, 0.56, 0.05, wd, 0, 0.5, 0.21);
}
return g;
},
function (P, x, z, w, h, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = drwMat("oak"), R = wRand(Math.round(x * 7 + z * 13));
drwBox(g, w, h, 0.36, wd, 0, 0, 0);
var n = Math.floor(h / 0.42);
for (var i = 0; i < n; i++) {
var y = 0.12 + i * 0.42, bx = -w / 2 + 0.1;
while (bx < w / 2 - 0.12) {
var bw = 0.04 + R() * 0.05, bh = 0.24 + R() * 0.12;
drwBox(g, bw, bh, 0.24, drwLam([0x6A1E1E, 0x1E3A2A, 0x2A2A4A, 0x5A3A1E, 0x8A6A3A, 0x3A1A2A][Math.floor(R() * 6)]), bx + bw / 2, y, -0.2);
bx += bw + 0.005;
}
}
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ag = drwShine(0xE0E4E8, 0.25, 0.9);
drwCyl(g, 0.015, 0.02, 0.5, ag, 0, 0, 0, 6);
[0, 1, 2].forEach(function (i) {
var a = i / 3 * 6.283, f = new THREE.Group();
f.position.set(Math.cos(a) * 0.14, 0.5, Math.sin(a) * 0.14);
f.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
g.add(f);
var c = new THREE.Mesh(drwGeo("lilyc", function () { return new THREE.ConeGeometry(0.07, 0.14, 8, 1, true); }), ag);
c.rotation.x = Math.PI;
f.add(c);
var b = new THREE.Mesh(drwGeo("lilyb", function () { return new THREE.SphereGeometry(0.035, 8, 6); }), drwGlowM(0xFFF0C0));
b.position.y = -0.04;
f.add(b);
});
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), drwM("rug" + col, function () {
var t = drwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
drwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
h = h || DRW_HOUSE.h1;
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
drwBox(P, G[1], h - 2.4, 0.3, inner || mat, G[0], 2.4, z);
});
segs.forEach(function (s) { var w = s[1] - s[0]; if (w < 0.05)
return; drwBox(P, w, h, 0.3, mat, (s[0] + s[1]) / 2, 0, z, 0, true); if (inner) {
drwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z + 0.16);
drwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z - 0.16);
} });
},
function (P, x, z0, z1, mat, inner, gaps, h) {
h = h || DRW_HOUSE.h1;
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
drwBox(P, 0.3, h - 2.4, G[1], inner || mat, x, 2.4, G[0]);
});
segs.forEach(function (s) { var d = s[1] - s[0]; if (d < 0.05)
return; drwBox(P, 0.3, h, d, mat, x, 0, (s[0] + s[1]) / 2, 0, true); });
},
function (P, x0, x1, z0, z1, mat, dx, dz) {
var H = DRW_HOUSE.h1 - 0.02, w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, wd = drwMat("oak");
drwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z0 + 0.17);
drwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z1 - 0.17);
[x0 + 0.17, x1 - 0.17].forEach(function (x) {
var segs = [[z0 + 0.16, z1 - 0.16]];
if (dx != null && Math.abs(x - dx) < 0.5) {
segs = [[z0 + 0.16, dz - 0.65], [dz + 0.65, z1 - 0.16]];
drwBox(P, 0.02, H - 2.4, 1.3, mat, x, 2.4, dz);
}
segs.forEach(function (sg) { var L = sg[1] - sg[0]; drwBox(P, 0.02, H, L, mat, x, 0, (sg[0] + sg[1]) / 2); drwBox(P, 0.04, 0.06, L, wd, x + (x < cx ? 0.02 : -0.02), 0.95, (sg[0] + sg[1]) / 2); drwBox(P, 0.04, 0.18, L, wd, x + (x < cx ? 0.02 : -0.02), 0, (sg[0] + sg[1]) / 2); });
});
[z0 + 0.19, z1 - 0.19].forEach(function (z) { drwBox(P, w - 0.34, 0.06, 0.04, wd, cx, 0.95, z); drwBox(P, w - 0.34, 0.18, 0.04, wd, cx, 0, z); });
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
} }); g.userData.mats = mats; DRW.ghosts.push(g); return g; },
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("drw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("drw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = DRW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : drwGround(x, z, o.feet != null ? o.feet : 500);
var g = drwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || DRW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
DRW.people.push(P);
if (F.pale)
drwGhostly(g);
if (!o.mute)
drwTalk(P, F.name, drwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
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
var d = f ? (o.dressF || o.dress) : o.dress, g = drwDressed(seed + "c" + i, d, { sex: f ? "f" : "m", beard: !f && R() < (o.beardP == null ? 0.35 : o.beardP) ? (R() < 0.5 ? "full" : "mustache") : null, hair: o.hair ? o.hair(R) : null, skin: sk, child: o.childP && R() < o.childP });
var y = drwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
DRW.scG.add(g);
var P = { g: g, y: y, o: { wander: o.wander == null ? 10 : o.wander, sp: o.sp || 0.6 } };
DRW.people.push(P);
if (o.names && R() < (o.talkP == null ? 0.6 : o.talkP))
drwTalk(P, o.names[i % o.names.length], drwPersona(o.persona || "native"), (o.says || ["Good day to you."])[i % (o.says || [1]).length], 2.8);
out.push(P);
}
return out;
},
function (G, sc, i, W, D, H, o) {
o = o || {};
var A = drwInAt(sc, i), g = new THREE.Group();
g.position.set(A.x, DRW_IN_Y, A.z);
G.add(g);
var wall = o.wall || drwMat("plaster"), inner = o.paper || null;
drwBox(g, W, 0.12, D, o.floor || drwMat("floor"), 0, -0.12, 0);
drwBox(g, W, 0.2, D, o.ceil || drwMat("ceiling"), 0, H, 0);
drwFloor(A.x, A.z, W, D, DRW_IN_Y);
var h0 = DRW_HOUSE.h1;
DRW_HOUSE.h1 = H;
try {
drwWallZ(g, -D / 2, -W / 2, W / 2, wall, inner, o.gapN || [], H);
drwWallZ(g, D / 2, -W / 2, W / 2, wall, inner, [[0, 1.6]], H);
drwWallX(g, -W / 2, -D / 2, D / 2, wall, inner, [], H);
drwWallX(g, W / 2, -D / 2, D / 2, wall, inner, [], H);
}
finally {
DRW_HOUSE.h1 = h0;
}
drwBox(g, 1.6, 2.5, 0.06, drwGlowM(o.day || 0xF4ECD8, 0.9), 0, 0, D / 2 + 0.2);
for (var k = 0; k < (W > 16 ? 4 : 2); k++) {
var lx = (k % 2 ? 1 : -1) * W * 0.3, lz = (k < 2 ? -1 : 1) * D * 0.25;
var c = drwCyl(g, 0.05, 0.05, 0.5, drwMat("brass"), lx, H - 0.5, lz, 6);
var b = new THREE.Mesh(drwGeo("rlamp", function () { return new THREE.SphereGeometry(0.16, 10, 8); }), drwGlowM(0xFFE8B8));
b.position.set(lx, H - 0.6, lz);
g.add(b);
}
drwRoom(sc, A.x - W / 2, A.x + W / 2, A.z - D / 2, A.z + D / 2, o.env || "indoor");
var out = o.out;
drwSpot(A.x, A.z + D / 2 - 0.8, 1.5, o.doorName || "The door", "go out", function () { var bk = DRW.back && DRW.back[sc + i]; if (bk)
out = bk; if (out)
drwGo({ sc: sc, x: out.x, z: out.z, ry: out.ry }, null, typeof drbPopulate === "function" ? drbPopulate : null); }, DRW_IN_Y);
g.userData.A = A;
g.userData.W = W;
g.userData.D = D;
g.userData.H = H;
return g;
},
function (G, sc, i, x, z, ry, name, W, D, o) {
o = o || {};
var A = drwInAt(sc, i), y = o.y != null ? o.y : drwLand(x, z);
var dg = new THREE.Group();
dg.position.set(x, y, z);
dg.rotation.y = ry || 0;
G.add(dg);
drwBox(dg, 1.7, 2.7, 0.14, o.frame || drwMat("ashlar"), 0, 0, 0);
drwBox(dg, 1.25, 2.35, 0.1, drwLam(o.col || 0x4A2E1A), 0, 0.04, 0.07);
drwBox(dg, 0.09, 0.09, 0.06, drwMat("brass"), 0.42, 1.1, 0.15);
drwBox(dg, 2.0, 0.16, 0.5, o.frame || drwMat("ashlar"), 0, -0.02, 0.35);
var fx = x + Math.sin(ry || 0) * 1.6, fz = z + Math.cos(ry || 0) * 1.6;
drwSpot(fx, fz, 1.7, name, "go in", function () { (DRW.back || (DRW.back = {}))[sc + i] = { x: fx, z: fz, ry: (ry || 0) + Math.PI }; DRW.lastBack = { sc: sc, x: fx, z: fz, ry: (ry || 0) + Math.PI }; drwGo({ sc: sc, x: A.x, z: A.z + D / 2 - 2.2, y: DRW_IN_Y, ry: 0 }, o.msg || ("🚪 <b>" + name.replace(/^The door of /, "") + "</b>"), typeof drbPopulate === "function" ? drbPopulate : null); }, y);
return { x: fx, z: fz, ry: (ry || 0) };
},
function (G, sc, i, x, z, ry, name, room, o) {
o = o || {};
var W = room.W || 12, D = room.D || 10, H = room.H || 4;
var dw = o.door != null ? o.door : 0, ca = Math.cos(ry || 0), sa = Math.sin(ry || 0), front = o.front != null ? o.front : (o.d || 10) / 2 + 0.08;
var dx = x + sa * front + ca * dw, dz = z + ca * front - sa * dw;
var d = drwDoorTo(G, sc, i, dx, dz, ry, name, W, D, o);
var g = drwRoomBuild(G, sc, i, W, D, H, Object.assign({}, room, { out: { x: d.x, z: d.z, ry: (ry || 0) + Math.PI }, doorName: "The door, out to " + (o.outName || "the street") }));
if (room.fill)
try {
room.fill(g, W, D, H, drwInAt(sc, i));
}
catch (e) {
if (window.console)
console.warn("[dracula] room", name, e);
}
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = drwMat("oak");
drwBox(g, 1.6, 0.5, 2.1, wd, 0, 0, 0);
drwBox(g, 1.5, 0.22, 2.0, drwLam(0xF2EEE4), 0, 0.5, 0);
drwBox(g, 1.52, 0.08, 1.3, drwLam(col || 0x6A2A2A), 0, 0.72, 0.35);
drwBox(g, 1.2, 0.16, 0.4, drwLam(0xFAF8F2), 0, 0.72, -0.75);
drwBox(g, 1.7, 1.4, 0.1, wd, 0, 0, -1.05);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { drwBox(g, 0.08, 2.2, 0.08, wd, q[0] * 0.78, 0, q[1] * 1.02); });
drwBox(g, 1.7, 0.3, 2.2, drwLam(col || 0x6A2A2A), 0, 2.2, 0);
return g;
},
function (P, x, z, s, sky) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
s = s || 1;
var wd = drwMat("oak");
[0, 1, 2].forEach(function (i) { var a = i / 3 * 6.283; var l = drwBox(g, 0.05 * s, 0.8 * s, 0.05 * s, wd, Math.cos(a) * 0.32 * s, 0, Math.sin(a) * 0.32 * s); l.rotation.z = Math.cos(a) * 0.2; });
var t = drwCanvas(sky ? "gl:sky" : "gl:earth", 256, 128, function (c, W, H) {
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
var b = new THREE.Mesh(drwGeo("globe", function () { return new THREE.SphereGeometry(0.36, 24, 16); }), drwLam(0xFFFFFF, { map: t, mapk: sky ? "gl:sky" : "gl:earth" }));
b.scale.setScalar(s);
b.position.y = 1.05 * s;
b.rotation.z = 0.4;
g.add(b);
var m = new THREE.Mesh(drwGeo("gmer", function () { return new THREE.TorusGeometry(0.4, 0.015, 6, 32); }), drwMat("brass"));
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
[-1, 1].forEach(function (k) { var l = drwBox(g, 0.06, 1.3, 0.06, drwMat("oak"), k * 0.4, 0, 0); l.rotation.z = k * 0.25; });
drwBox(g, 0.06, 1.3, 0.06, drwMat("oak"), 0, 0, -0.45).rotation.x = -0.3;
var t = new THREE.Mesh(drwGeo("tscope" + len, function () { var c = new THREE.CylinderGeometry(0.07, 0.13, len, 12); c.rotateX(Math.PI / 2); return c; }), drwMat("brass"));
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
drwBox(g, 0.5, 1.0, 0.5, drwMat("oak"), 0, 0, 0);
var q = new THREE.Mesh(drwGeo("quad", function () { return new THREE.RingGeometry(0.55, 0.7, 16, 1, 0, Math.PI / 2); }), drwM("quadm", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE0B050, shininess: 80, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
q.position.set(-0.3, 1.05, 0);
g.add(q);
drwBox(g, 0.04, 0.7, 0.04, drwMat("brass"), -0.3, 1.0, 0).rotation.z = -0.7;
return g;
},
function (g, W, D, kind, seed) {
var R = wRand(seed || 7);
if (kind === "home") {
drwRug(g, 0, 0, W * 0.5, D * 0.45, [0x6A2A2A, 0x2A3A6A, 0x5A4A2A][Math.floor(R() * 3)]);
var t = drwTable(g, 0, -0.4, 1.8, 1.0, 0.78, drwMat("oak"));
[-1, 1].forEach(function (k) { drwChair(g, k * 1.2, -0.4, k * Math.PI / 2, drwMat("velvet")); });
drwBed(g, W / 2 - 1.3, -D / 2 + 1.4, 0);
drwChest(g, -W / 2 + 1.0, -D / 2 + 0.6, 0);
drwShelves(g, -W / 2 + 0.3, 1.0, 2.2, 2.2, Math.PI / 2);
}
else if (kind === "poor") {
drwTable(g, 0, 0, 1.4, 0.8, 0.74, drwMat("planks"));
drwChair(g, 0.9, 0, Math.PI / 2, drwMat("planks"));
drwBox(g, 1.8, 0.35, 0.9, drwMat("planks"), W / 2 - 1.2, 0, -D / 2 + 0.8);
drwBox(g, 1.7, 0.1, 0.8, drwLam(0x8A7A60), W / 2 - 1.2, 0.35, -D / 2 + 0.8);
drwChest(g, -W / 2 + 0.8, -D / 2 + 0.6, 0);
drwFire(g, -W / 2 + 1.0, 0, D / 2 - 1.4, 0.6);
}
else if (kind === "shop") {
drwBox(g, W * 0.7, 0.95, 0.7, drwMat("oak"), 0, 0, -D / 2 + 1.6);
drwShelves(g, 0, -D / 2 + 0.3, W * 0.8, 2.6, 0);
drwChair(g, W / 2 - 1, 0.5, -Math.PI / 2, drwMat("oak"));
}
else if (kind === "east") {
drwBox(g, W * 0.8, 0.06, D * 0.7, drwLam(0xC8B888), 0, 0, 0);
for (var i = 0; i < 4; i++)
drwBox(g, 0.9, 0.12, 0.9, drwLam([0x8A2A2A, 0x2A4A6A, 0x6A5A2A, 0x3A5A3A][i]), -1.5 + i, 0.06, -0.8);
drwBox(g, 1.2, 0.35, 0.8, drwLam(0x2A1A10), 0, 0, 0.2);
drwBox(g, 0.5, 1.4, 0.04, drwLam(0xF0E8D8), -W / 2 + 1.2, 0, -D / 2 + 0.3);
}
},
function (P, x0, z0, x1, z1, h, th, mat, y, o) {
o = o || {};
var L = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0), cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, yy = y != null ? y : Math.min(drwLand(x0, z0), drwLand(x1, z1)) - 0.6;
var m = new THREE.Mesh(drwBoxG(th, h + 0.6, L), mat || drwMat("ashlar"));
m.position.set(cx, yy + (h + 0.6) / 2, cz);
m.rotation.y = a;
m.castShadow = !drwLite();
m.receiveShadow = true;
P.add(m);
if (o.solid !== false)
drwSolid(cx, cz, th + 0.3, L, yy - 0.5, yy + h + 0.6, -a);
if (o.cren) {
var n = Math.floor(L / 1.6);
for (var i = 0; i < n; i += 2) {
var t = (i + 0.5) / n - 0.5, mx = cx + Math.sin(a) * t * L, mz = cz + Math.cos(a) * t * L;
var c = new THREE.Mesh(drwBoxG(th + 0.1, 0.9, L / n * 0.9), mat || drwMat("ashlar"));
c.position.set(mx, yy + h + 0.6 + 0.45, mz);
c.rotation.y = a;
P.add(c);
}
}
return m;
},
function (P, x, z, r, h, o) {
o = o || {};
var y = o.y != null ? o.y : drwLand(x, z) - 0.5, st = o.mat || drwMat("ashlar"), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var t = new THREE.Mesh(drwGeo("twr" + r + "|" + h, function () { var c = new THREE.CylinderGeometry(r, r * 1.08, h, 22, 1); var uv = c.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * r * 6.28 / 2.4, uv.getY(i) * h / 2.4); c.translate(0, h / 2, 0); return c; }), st);
t.castShadow = !drwLite();
g.add(t);
if (o.roof !== false && !o.flat) {
var rf = new THREE.Mesh(drwGeo("trf" + r, function () { var c = new THREE.ConeGeometry(r * 1.2, r * 2.4, 22, 1); c.translate(0, r * 1.2, 0); return c; }), o.roofMat || drwMat("slate"));
rf.position.y = h;
g.add(rf);
}
else {
for (var i = 0; i < 12; i += 2) {
var a = i / 12 * Math.PI * 2, c = new THREE.Mesh(drwBoxG(r * 0.42, 0.9, 0.6), st);
c.position.set(Math.cos(a) * r * 0.98, h + 0.45, Math.sin(a) * r * 0.98);
c.rotation.y = -a;
g.add(c);
}
var ring = new THREE.Mesh(drwGeo("tring" + r, function () { return new THREE.CylinderGeometry(r * 1.06, r * 1.06, 0.4, 22); }), st);
ring.position.y = h - 0.2;
g.add(ring);
}
var nw = o.windows == null ? Math.max(2, Math.floor(h / 7)) : o.windows;
for (var k = 0; k < nw; k++) {
var a2 = (k * 2.4) % 6.283, wy = 4 + k * (h - 6) / Math.max(1, nw);
var w = new THREE.Mesh(drwGeo("twin", function () { return new THREE.PlaneGeometry(0.7, 1.6); }), o.lit && k % 2 === 0 ? drwGlowM(0xFFC878, 0.85) : drwLam(0x0A0A0E));
w.position.set(Math.cos(a2) * (r + 0.03), wy, Math.sin(a2) * (r + 0.03));
w.rotation.y = Math.PI / 2 - a2;
g.add(w);
}
if (o.solid !== false)
drwRound(x, z, r + 0.3, y - 1, y + h + 20);
return g;
},
function (P, x, y, z, ry, w, h, lit) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var gl = lit ? drwGlowM(lit === true ? 0xFFC070 : lit, 0.8) : drwShine(0x0E1218, 0.2, 0.4);
var sh = new THREE.Shape();
sh.moveTo(-w / 2, 0);
sh.lineTo(-w / 2, h * 0.62);
sh.quadraticCurveTo(-w / 2, h * 0.9, 0, h);
sh.quadraticCurveTo(w / 2, h * 0.9, w / 2, h * 0.62);
sh.lineTo(w / 2, 0);
sh.lineTo(-w / 2, 0);
var m = new THREE.Mesh(drwGeo("gw" + w + "|" + h, function () { return new THREE.ShapeGeometry(sh, 6); }), gl);
m.position.z = 0.03;
g.add(m);
var fr = drwMat("ashlar");
drwBox(g, 0.14, h * 0.62, 0.14, fr, 0, 0, 0.05);
drwBox(g, w + 0.3, 0.18, 0.25, fr, 0, -0.1, 0.08);
return g;
},
function (P, x, y, z, ry, w, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var oak = o.mat || drwS("b:oak", 0x5A3A22, 1.4), ir = drwMat("iron");
drwBox(g, w, h, 0.16, oak, 0, 0, 0);
for (var i = 0; i < 3; i++)
drwBox(g, w + 0.04, 0.1, 0.2, ir, 0, 0.4 + i * (h - 0.8) / 2, 0.02);
var arch = new THREE.Mesh(drwGeo("dar" + w, function () { return new THREE.TorusGeometry(w / 2 + 0.2, 0.24, 6, 16, Math.PI); }), drwMat("ashlar"));
arch.position.set(0, h, 0.05);
g.add(arch);
[-1, 1].forEach(function (k) { drwBox(g, 0.42, h, 0.46, drwMat("ashlar"), k * (w / 2 + 0.2), 0, 0.05); });
drwBox(g, 0.12, 0.12, 0.08, drwMat("iron"), w * 0.3, h * 0.45, 0.12);
return g;
},
function (P, x, z, y0, y1, len, w, ry, o) {
o = o || {};
var OX = o.at ? o.at.x : 0, OZ = o.at ? o.at.z : 0, OY = o.at ? o.at.y : 0, mat = o.mat || drwMat("ashlar"), n = Math.max(3, Math.round(Math.abs(y1 - y0) / 0.19)), s = Math.sin(ry), c = Math.cos(ry), g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
P.add(g);
for (var i = 0; i < n; i++) {
var t = i / n, h = (y1 - y0) / n;
drwBox(g, w, Math.max(0.12, h * (i + 1) + (o.solidBelow ? y0 - (o.base != null ? o.base : y0) : 0)), len / n + 0.02, mat, 0, o.solidBelow ? (o.base != null ? o.base : y0) : y0 + h * i, (t + 0.5 / n) * len);
}
var mx = x + s * len / 2, mz = z + c * len / 2;
drwRamp(OX + mx, OZ + mz, w, len, OY + y0, OY + y1, -ry);
var rail = o.railMat || drwS("b:oak", 0x4A2E1A, 1.2), post = o.postMat || drwMat("iron"), every = Math.max(1, Math.round(n / Math.max(2, Math.round(len / 0.9))));
[-1, 1].forEach(function (sd, k) {
if (o.walls && o.walls.indexOf(k) >= 0)
return;
var ex = sd * (w / 2 - 0.05);
for (var i = 0; i <= n; i += every) {
var t = Math.min(1, i / n), py = y0 + (y1 - y0) * t;
drwBox(g, 0.05, 0.95, 0.05, post, ex, py, t * len);
}
var hr = new THREE.Mesh(drwBoxG(0.08, 0.07, Math.hypot(len, y1 - y0) + 0.1), rail);
hr.position.set(ex, (y0 + y1) / 2 + 0.95, len / 2);
hr.rotation.x = -Math.atan2(y1 - y0, len);
g.add(hr);
var ix = x + c * ex + s * len / 2, iz = z - s * ex + c * len / 2;
var S = drwSolid(OX + ix, OZ + iz, 0.22, len, OY + Math.min(y0, y1) - 1, OY + Math.max(y0, y1) + 2.2, -ry);
S.rail = 1;
});
return { x: x + s * len, z: z + c * len, y: y1 };
},
function (P, x, z, w, d, y, o) {
o = o || {};
var OX = o.at ? o.at.x : 0, OZ = o.at ? o.at.z : 0, OY = o.at ? o.at.y : 0, mat = o.mat || drwMat("ashlar");
drwBox(P, w, 0.3, d, mat, x, y - 0.3, z);
if (o.under != null)
drwBox(P, w, y - o.under, d, mat, x, o.under, z);
drwFloor(OX + x, OZ + z, w, d, OY + y);
var rail = o.railMat || drwS("b:oak", 0x4A2E1A, 1.2), post = drwMat("iron"), open = o.open || {};
[["n", 0, -d / 2, w, 0], ["s", 0, d / 2, w, 0], ["w", -w / 2, 0, d, 1], ["e", w / 2, 0, d, 1]].forEach(function (q) {
if (!open[q[0]])
return;
var L = q[3], along = q[4];
for (var t = -L / 2; t <= L / 2 + 0.01; t += 0.9)
drwBox(P, 0.05, 0.95, 0.05, post, x + (along ? q[1] : t), y, z + (along ? t : q[2]));
drwBox(P, along ? 0.08 : L, 0.07, along ? L : 0.08, rail, x + q[1], y + 0.95, z + q[2]);
var S = drwSolid(OX + x + q[1], OZ + z + q[2], along ? 0.22 : L, along ? L : 0.22, OY + y - 1, OY + y + 2.2, 0);
S.rail = 1;
});
return { x: x, z: z, y: y };
},
function (P, x, y, z, ry, col) {
var h = null;
try {
if (typeof crxBuild === "function" && !drwLite())
h = crxBuild("horse");
}
catch (e) {
h = null;
}
if (!h && typeof wHorse === "function")
try {
h = wHorse("drk" + Math.round(x * 7 + z), { col: col || 0x2A1E16 });
}
catch (e) {
h = null;
}
if (!h) {
h = new THREE.Group();
var bm = drwLam(col || 0x2A1E16);
drwEll(h, bm, 0.45, 0.5, 1.1, 0, 1.45, 0);
drwEll(h, bm, 0.18, 0.3, 0.42, 0, 2.0, 0.95);
[[-0.25, -0.7], [0.25, -0.7], [-0.25, 0.7], [0.25, 0.7]].forEach(function (q) { drwBox(h, 0.12, 1.1, 0.12, bm, q[0], 0, q[1]); });
}
h.position.set(x, y, z);
h.rotation.y = ry || 0;
P.add(h);
h.userData.keep = 1;
return h;
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : drwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var bl = drwShine(o.col || 0x0E0E10, 0.4, 0.1), wood = drwS("b:oak", 0x3A2414, 1.2), ir = drwMat("iron");
if (o.kind === "cart") {
drwBox(g, 1.8, 0.5, 3.6, drwS("b:planks", 0x7A6040, 1.4), 0, 0.9, 0);
[-1, 1].forEach(function (k) { drwBox(g, 0.08, 0.6, 3.6, wood, k * 0.9, 1.4, 0); });
}
else {
drwBox(g, 1.6, 1.5, 2.1, bl, 0, 1.1, 0);
drwBox(g, 1.7, 0.12, 2.3, bl, 0, 2.6, 0);
drwBox(g, 1.4, 0.5, 0.9, bl, 0, 1.6, 1.6);
drwBox(g, 1.5, 0.1, 1.0, bl, 0, 2.1, 1.6);
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(drwGeo("cwin", function () { return new THREE.PlaneGeometry(0.7, 0.6); }), drwShine(0x1A2028, 0.2, 0.4)); w.position.set(k * 0.81, 2.0, 0); w.rotation.y = k * Math.PI / 2; g.add(w); });
if (o.lamps !== false)
[-1, 1].forEach(function (k) { var l = new THREE.Mesh(drwGeo("clamp", function () { return new THREE.CylinderGeometry(0.1, 0.08, 0.26, 6); }), drwGlowM(0xFFD890, 0.9)); l.position.set(k * 0.95, 2.2, 1.05); g.add(l); });
}
[[-1, -0.75, 0.62], [1, -0.75, 0.62], [-1, 1.0, 0.52], [1, 1.0, 0.52]].forEach(function (q) {
var w = new THREE.Mesh(drwGeo("cwh" + q[2], function () { return new THREE.TorusGeometry(q[2], 0.05, 6, 22); }), wood);
w.position.set(q[0] * 0.95, q[2], q[1]);
w.rotation.y = Math.PI / 2;
g.add(w);
for (var s = 0; s < 6; s++) {
var sp = drwBox(g, 0.03, q[2] * 2, 0.03, wood, q[0] * 0.95, 0, q[1]);
sp.rotation.x = s / 6 * Math.PI;
sp.position.y = q[2];
}
});
drwBox(g, 0.08, 0.08, 3.2, wood, -0.35, 0.8, 3.0);
drwBox(g, 0.08, 0.08, 3.2, wood, 0.35, 0.8, 3.0);
var n = o.horses == null ? 2 : o.horses, hs = [];
for (var i = 0; i < n; i++) {
var col = o.horseCol || (o.black ? 0x101012 : [0x2A1E16, 0x4A3424, 0x1A1410, 0x5A4030][i % 4]);
hs.push(drkHorse(g, (i % 2 ? 0.55 : -0.55), 0, 3.6 + Math.floor(i / 2) * 2.6, 0, col));
}
if (o.solid !== false)
drwSolid(x + Math.sin(ry || 0) * 1.5, z + Math.cos(ry || 0) * 1.5, 2.2, 7 + Math.max(0, n - 2) * 1.3, y - 1, y + 3, -(ry || 0));
g.userData.keep = 1;
g.userData.horses = hs;
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var w = null;
try {
if (typeof crxBuild === "function")
w = crxBuild("wolf");
}
catch (e) {
w = null;
}
if (!w) {
w = new THREE.Group();
var m = drwLam(0x3A3634);
drwEll(w, m, 0.28, 0.32, 0.7, 0, 0.7, 0);
drwEll(w, m, 0.16, 0.18, 0.3, 0, 0.9, 0.7);
[[-0.15, -0.4], [0.15, -0.4], [-0.15, 0.4], [0.15, 0.4]].forEach(function (q) { drwBox(w, 0.07, 0.55, 0.07, m, q[0], 0, q[1]); });
}
var y = drwGround(x, z, o.feet != null ? o.feet : 500);
w.position.set(x, y, z);
w.rotation.y = ry || 0;
(P || DRW.scG).add(w);
w.userData.keep = 1;
w.userData.live = 1;
var B = { g: w, home: [x, z], r: o.r || 10, sp: o.sp || 0.5, ph: Math.random() * 6, feet: o.feet };
DRW.beasts.push(B);
return B;
},
function (P, x, y, z, n, r) {
for (var i = 0; i < n; i++) {
var g = new THREE.Group(), m = drwLam(0x0E0C0E, { ds: 1 });
drwEll(g, m, 0.05, 0.05, 0.12, 0, 0, 0, 6);
[-1, 1].forEach(function (k) { var wg = new THREE.Mesh(drwGeo("batw", function () { var s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(0.32, 0.08); s.lineTo(0.42, -0.06); s.lineTo(0.28, -0.04); s.lineTo(0.2, -0.1); s.lineTo(0.1, -0.04); s.lineTo(0, -0.06); return new THREE.ShapeGeometry(s); }), m); wg.rotation.x = -Math.PI / 2; wg.scale.x = k; g.add(wg); g.userData["w" + k] = wg; });
g.position.set(x, y, z);
g.userData.kind = "circle";
g.userData.home = [x, z];
g.userData.y0 = y + (i % 3) * 1.5;
g.userData.r = (r || 8) * (0.6 + (i % 4) * 0.15);
g.userData.sp = 0.7 + (i % 3) * 0.2;
g.userData.ph = i * 1.7;
g.userData.bat = 1;
P.add(g);
DRW.bob.push(g);
}
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : drwGround(x, z, 500), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
drwBox(g, 0.9, 0.75, 2.1, drwS("b:planks", 0x6A5034, 1.2), 0, 0, 0);
if (!o.shut)
drwBox(g, 0.8, 0.08, 2.0, drwMat("earth"), 0, 0.7, 0);
else
drwBox(g, 0.94, 0.06, 2.14, drwS("b:planks", 0x5A4028, 1.2), 0, 0.75, 0);
[-0.7, 0.7].forEach(function (q) { drwBox(g, 0.94, 0.06, 0.08, drwMat("iron"), 0, 0.3, q); });
if (o.solid !== false)
drwSolid(x, z, 0.9, 2.1, y - 0.5, y + 0.8, -(ry || 0));
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : drwGround(x, z, 500), g = new THREE.Group();
g.position.set(x, y + (o.lift || 0), z);
g.rotation.y = ry || 0;
P.add(g);
var sh = new THREE.Shape();
sh.moveTo(-0.28, -1.0);
sh.lineTo(0.28, -1.0);
sh.lineTo(0.38, 0.45);
sh.lineTo(0.24, 1.0);
sh.lineTo(-0.24, 1.0);
sh.lineTo(-0.38, 0.45);
sh.lineTo(-0.28, -1.0);
var geo = drwGeo("cof", function () { var e = new THREE.ExtrudeGeometry(sh, { depth: 0.5, bevelEnabled: false }); e.rotateX(-Math.PI / 2); return e; }), m = new THREE.Mesh(geo, o.mat || drwS("b:oak", 0x2A1A12, 1.0));
g.add(m);
if (o.open) {
var lid = new THREE.Mesh(drwGeo("cofl", function () { var e = new THREE.ExtrudeGeometry(sh, { depth: 0.06, bevelEnabled: false }); e.rotateX(-Math.PI / 2); return e; }), o.mat || drwS("b:oak", 0x2A1A12, 1.0));
lid.position.set(0.55, 0.06, 0.2);
lid.rotation.z = -0.3;
g.add(lid);
drwBox(g, 0.5, 0.04, 1.8, drwLam(0xE8E2D8), 0, 0.44, 0);
}
return g;
},
function (P, x, z, ry, name, o) {
o = o || {};
var y = o.y != null ? o.y : drwGround(x, z, 500), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var st = o.mat || drwMat("marble");
drwBox(g, 1.5, 0.25, 2.7, st, 0, 0, 0);
drwBox(g, 1.2, 0.85, 2.4, st, 0, 0.25, 0);
drwBox(g, 1.4, 0.18, 2.6, st, 0, 1.1, 0);
drwBox(g, 1.0, 0.16, 2.2, st, 0, 1.28, 0);
if (name) {
var s = drwSign(g, name, 1.0, 0.32, 0, 0.72, 1.21, 0, { bg: o.bg || "#D8D2C6", ink: "#2A2420" });
}
if (o.solid !== false)
drwSolid(x, z, 1.5, 2.7, y - 0.5, y + 1.4, -(ry || 0));
return g;
},
function (P, x, z, ry, kind, seed) {
var y = drwGround(x, z, 500), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var R = wRand(seed || 1), st = R() < 0.5 ? drwMat("greystone") : drwMat("stone");
if (kind === "cross") {
drwBox(g, 0.16, 1.3, 0.14, st, 0, 0, 0);
drwBox(g, 0.7, 0.14, 0.14, st, 0, 0.9, 0);
drwBox(g, 0.5, 0.2, 0.4, st, 0, 0, 0);
}
else if (kind === "table") {
drwBox(g, 0.9, 0.6, 1.9, st, 0, 0, 0);
drwBox(g, 1.0, 0.1, 2.0, st, 0, 0.6, 0);
}
else {
var w = 0.55 + R() * 0.3, h = 0.7 + R() * 0.6, s = drwBox(g, w, h, 0.12, st, 0, 0, 0);
var top = new THREE.Mesh(drwGeo("gtop", function () { return new THREE.CylinderGeometry(0.5, 0.5, 0.12, 12, 1, false, 0, Math.PI); }), st);
top.rotation.set(Math.PI / 2, 0, Math.PI / 2);
top.scale.set(1, 1, 1);
top.position.set(0, h, 0);
top.scale.set(w, 1, w);
top.rotation.set(0, 0, 0);
top.rotation.x = -Math.PI / 2;
top.rotation.z = Math.PI / 2;
g.add(top);
g.rotation.z = (R() - 0.5) * 0.12;
}
drwRound(x, z, 0.45, y - 0.5, y + 1.4);
return g;
},
function (legs) {
var key = "map:" + legs.map(function (l) { return l[0] + "-" + l[1]; }).join(","), W = 560, H = 360;
if (DRW.mapCache && DRW.mapCache[key])
return DRW.mapCache[key];
var pts = [];
legs.forEach(function (l) { pts.push(DRK_CITY[l[0]]); pts.push(DRK_CITY[l[1]]); });
var la0 = 1e9, la1 = -1e9, lo0 = 1e9, lo1 = -1e9;
pts.forEach(function (p) { la0 = Math.min(la0, p[0]); la1 = Math.max(la1, p[0]); lo0 = Math.min(lo0, p[1]); lo1 = Math.max(lo1, p[1]); });
var pad = 1.6;
la0 -= pad;
la1 += pad;
lo0 -= pad * 1.6;
lo1 += pad * 1.6;
var kx = Math.cos((la0 + la1) / 2 * Math.PI / 180), sx = W / ((lo1 - lo0) * kx), sy = H / (la1 - la0), s = Math.min(sx, sy);
var X = function (p) { return W / 2 + (p[1] - (lo0 + lo1) / 2) * kx * s; }, Y = function (p) { return H / 2 - (p[0] - (la0 + la1) / 2) * s; };
var c = document.createElement("canvas");
c.width = W;
c.height = H;
var x = c.getContext("2d");
var gr = x.createLinearGradient(0, 0, W, H);
gr.addColorStop(0, "#EADCB8");
gr.addColorStop(1, "#D8C49A");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(90,70,40,.18)";
x.lineWidth = 1;
for (var la = Math.ceil(la0); la <= la1; la++) {
x.beginPath();
x.moveTo(0, Y([la, 0]));
x.lineTo(W, Y([la, 0]));
x.stroke();
}
for (var lo = Math.ceil(lo0); lo <= lo1; lo++) {
x.beginPath();
x.moveTo(X([0, lo]), 0);
x.lineTo(X([0, lo]), H);
x.stroke();
}
x.strokeStyle = "#8A2A1A";
x.lineWidth = 3;
x.setLineDash([9, 6]);
legs.forEach(function (l) { var a = DRK_CITY[l[0]], b = DRK_CITY[l[1]]; x.beginPath(); x.moveTo(X(a), Y(a)); x.lineTo(X(b), Y(b)); x.stroke(); });
x.setLineDash([]);
var seen = {};
x.font = "bold 13px Georgia";
legs.forEach(function (l) { [l[0], l[1]].forEach(function (k) { if (seen[k])
return; seen[k] = 1; var p = DRK_CITY[k]; x.fillStyle = "#2A1A10"; x.beginPath(); x.arc(X(p), Y(p), 4.5, 0, 7); x.fill(); x.fillText(p[2], X(p) + 7, Y(p) - 6); }); });
x.strokeStyle = "#5A4024";
x.lineWidth = 4;
x.strokeRect(2, 2, W - 4, H - 4);
var url = c.toDataURL("image/jpeg", 0.85);
(DRW.mapCache || (DRW.mapCache = {}))[key] = url;
return url;
},
function (title, legs, to, after, o) {
o = o || {};
var total = 0, rows = legs.map(function (l) { var mi = l[3] != null ? l[3] : Math.round(drkMiles(l[0], l[1])); total += mi; return "<tr><td>" + esc(DRK_CITY[l[0]][2]) + " → " + esc(DRK_CITY[l[1]][2]) + "</td><td style='text-align:right;padding-left:10px'><b>" + mi + "</b> miles</td><td style='padding-left:10px;opacity:.85'>" + esc(l[2] || "") + "</td></tr>"; }).join("");
var h = DRB_H + esc(title) + "</div><img src='" + drkMap(legs) + "' style='width:100%;max-width:560px;border-radius:4px;margin:6px 0'><table style='font-size:13px;width:100%'>" + rows + "</table><div style='margin-top:6px'>All told, about <b>" + total + " miles</b>" + (o.time ? ", " + esc(o.time) : "") + ".</div>" + (o.html || "");
worldCard(h + worldBtn("go", "▶ Make the journey", o.btn || ""), { go: function () { worldCard(null); drkTravel(title, total, o.by || "🚂", function () { drwGo(to, o.msg || null, function () { try {
if (typeof drbPopulate === "function")
drbPopulate();
}
catch (e) { } if (after)
after(); }); }); } });
},
function (title, miles, by, done) {
var v = drwVeil();
v.style.opacity = "1";
DRW.moving = true;
var sec = window.SBK_FAST ? 0.05 : Math.min(28, 6 + miles / 60), t0 = performance.now();
var box = document.createElement("div");
box.style.cssText = "position:fixed;left:50%;top:44%;transform:translate(-50%,-50%);color:#E8DCC0;font:600 18px Georgia;text-align:center;z-index:44;pointer-events:none;text-shadow:0 1px 3px #000";
document.body.appendChild(box);
var tick = setInterval(function () {
var u = Math.min(1, (performance.now() - t0) / 1000 / sec);
box.innerHTML = by + " " + esc(title) + "<div style='font-size:14px;opacity:.85;margin-top:8px'>" + Math.round(miles * (1 - u)) + " miles to go</div><div style='margin:10px auto 0;width:240px;height:4px;background:rgba(255,255,255,.15)'><div style='height:4px;width:" + Math.round(u * 240) + "px;background:#C8A060'></div></div>";
if (u >= 1) {
clearInterval(tick);
if (box.parentNode)
box.parentNode.removeChild(box);
DRW.moving = false;
done();
}
}, 120);
},
function (pts, sp, carry, seat, end, o) {
o = o || {};
var D = [0];
for (var i = 1; i < pts.length; i++)
D.push(D[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
DRW.ride = { pts: pts, D: D, len: D[D.length - 1], d: 0, sp: window.SBK_FAST ? sp * 40 : sp, carry: carry, seat: seat || [0, 2.2, 0], end: end, o: o, last: 0, stops: (o.stops || []).map(function (s) { return { d: s.d, fn: s.fn, done: 0, asked: 0 }; }) };
worldPrompt(null);
},
function (P, w, d, rh, mat, y) {
var geo = drwGeo("gab" + w + "|" + d + "|" + rh, function () { var s = new THREE.Shape(); s.moveTo(-w / 2 - 0.4, 0); s.lineTo(0, rh); s.lineTo(w / 2 + 0.4, 0); s.lineTo(-w / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: d + 0.8, bevelEnabled: false }); e.translate(0, 0, -(d + 0.8) / 2); return e; });
var m = new THREE.Mesh(geo, mat);
m.position.y = y;
m.castShadow = !drwLite();
P.add(m);
return m;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var y = o.y != null ? o.y : Math.min(drwLand(x - w / 2, z), drwLand(x + w / 2, z), drwLand(x, z - d / 2), drwLand(x, z + d / 2)) - 0.3, g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = o.wall || drwS("b:stucco", o.col || 0xE8DCC0, 3), roof = o.roof || drwMat("terracotta"), trim = drwLam(o.trim || 0xF4EEE0), glass = drwShine(0x141A20, 0.2, 0.4), lit = drwWinLit();
drwBox(g, w, h, d, wall, 0, 0, 0);
drwBox(g, w + 0.12, 0.6, d + 0.12, drwMat("granite"), 0, 0, 0);
var rh = o.rh || Math.min(w, d) * 0.75;
if (o.across) {
var r = drkGable(g, d, w, rh, roof, h);
r.rotation.y = Math.PI / 2;
}
else
drkGable(g, w, d, rh, roof, h);
if (o.timber) {
var tb = drwS("b:oak", 0x3A2414, 1.2);
for (var i = 0; i <= Math.round(w / 1.6); i++)
drwBox(g, 0.14, h - 0.6, 0.06, tb, -w / 2 + i * w / Math.round(w / 1.6), 0.6, d / 2 + 0.03);
drwBox(g, w, 0.16, 0.06, tb, 0, h * 0.52, d / 2 + 0.03);
drwBox(g, w, 0.16, 0.06, tb, 0, h - 0.16, d / 2 + 0.03);
}
if (o.chim)
drwBox(g, 0.8, rh + 1.2, 0.8, drwMat("brick"), w * 0.28, h, 0);
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round(h / 3.6)), R = wRand(Math.round(x * 13 + z * 7));
for (var f = 0; f < floors; f++)
for (var i2 = 0; i2 < n; i2++) {
var wx = -w / 2 + (i2 + 0.5) * w / n, wy = 1.2 + f * (h - 0.4) / floors;
if (f === 0 && i2 === Math.floor(n / 2))
continue;
[d / 2 + 0.02, -d / 2 - 0.02].forEach(function (zz, k) { drwBox(g, 1.1, 1.6, 0.06, trim, wx, wy, zz); var gl = drwBox(g, 0.85, 1.35, 0.05, o.night && R() < 0.55 ? lit : glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03)); if (o.shut)
[-1, 1].forEach(function (sd) { drwBox(g, 0.45, 1.5, 0.05, drwLam(o.shut), wx + sd * 0.78, wy + 0.05, zz + (k ? -0.05 : 0.05)); }); });
}
var dw = Math.floor(n / 2), dx = -w / 2 + (dw + 0.5) * w / n;
drwBox(g, 1.3, 2.5, 0.1, drwS("b:oak", o.doorCol || 0x4A2A16, 1.2), dx, 0.55, d / 2 + 0.05);
drwBox(g, 1.6, 0.2, 0.2, trim, dx, 3.05, d / 2 + 0.08);
drwSolid(x, z, w + 0.2, d + 0.2, y - 1, y + h + rh, -(o.ry || 0));
if (o.room != null && o.sc) {
var ca = Math.cos(o.ry || 0), sa = Math.sin(o.ry || 0), fx = x + sa * (d / 2 + 0.3) + ca * dx, fz = z + ca * (d / 2 + 0.3) - sa * dx;
drwSpot(fx + sa * 1.1, fz + ca * 1.1, 1.6, o.name || "The door of a house", "go in", function () { var A = drwInAt(o.sc, o.room); (DRW.back || (DRW.back = {}))[o.sc + o.room] = { x: fx + sa * 1.6, z: fz + ca * 1.6, ry: (o.ry || 0) }; DRW.lastBack = { sc: o.sc, x: fx + sa * 1.6, z: fz + ca * 1.6, ry: (o.ry || 0) }; drwGo({ sc: o.sc, x: A.x, z: A.z + 3, y: DRW_IN_Y, ry: 0 }, "🚪 <b>" + esc((o.name || "A house").replace(/^The door of /, "")) + "</b>", typeof drbPopulate === "function" ? drbPopulate : null); }, y);
}
if (o.room != null && o.sc && !(DRW.roomsMade || (DRW.roomsMade = {}))[o.sc + o.room] && !o.ownRoom) {
DRW.roomsMade[o.sc + o.room] = 1;
var ca2 = Math.cos(o.ry || 0), sa2 = Math.sin(o.ry || 0), ox = x + sa2 * (d / 2 + 1.9) + ca2 * dx, oz = z + ca2 * (d / 2 + 1.9) - sa2 * dx;
var rW = o.rW || Math.min(12, Math.max(7, w - 2)), rD = o.rD || Math.min(9, Math.max(6, d - 2)), rg = drwRoomBuild(drwRoomsG(P), o.sc, o.room, rW, rD, o.rH || 3.4, { paper: o.paper || drwMat(["damask", "greenpaper", "bluepaper"][o.room % 3]), floor: drwMat("floor"), out: { x: ox, z: oz, ry: o.ry || 0 }, doorName: "The door, out to " + (o.outName || "the street"), env: o.env || "indoor" });
try {
if (o.fill)
o.fill(rg, rW, rD, o.rH || 3.4, drwInAt(o.sc, o.room));
else
drwFurnish(rg, rW, rD, o.kind || "home", o.room * 31 + 7);
}
catch (e) { }
}
return g;
},
function (P, x, y, z, ry, w, h, th, mat) {
var key = "arch" + w.toFixed(1) + "|" + h.toFixed(1) + "|" + th.toFixed(1), geo = drwGeo(key, function () {
var s = new THREE.Shape(), o = w / 2 + 0.7, r = w * 0.9;
s.moveTo(-o, 0);
s.lineTo(-o, h + 1.2);
s.lineTo(o, h + 1.2);
s.lineTo(o, 0);
s.lineTo(w / 2, 0);
s.quadraticCurveTo(w / 2, h * 0.75, 0, h);
s.quadraticCurveTo(-w / 2, h * 0.75, -w / 2, 0);
s.lineTo(-o, 0);
var e = new THREE.ExtrudeGeometry(s, { depth: th, bevelEnabled: false, curveSegments: 8 });
e.translate(0, 0, -th / 2);
e.rotateY(Math.PI / 2);
return e;
});
var m = new THREE.Mesh(geo, mat || drwMat("ashlar"));
m.position.set(x, y, z);
m.rotation.y = (ry || 0);
m.castShadow = !drwLite();
P.add(m);
return m;
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : drwLand(x, z) - 0.4, g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var st = o.mat || drwMat("ashlar"), L = o.len || 30, W = o.w || 13, H = o.h || 12;
drwBox(g, W, H, L, st, 0, 0, 0);
var r = drkGable(g, W, L, W * 0.7, o.roof || drwMat("slate"), H);
for (var i = 0; i < 4; i++) {
[-1, 1].forEach(function (k) { drkGothWin(g, k * (W / 2 + 0.02), 3, -L / 2 + 4 + i * (L - 8) / 3, k * Math.PI / 2, 1.6, 5, o.lit); });
}
var tw = o.tower || 6, th = o.th || (H * 2.4);
drwBox(g, tw, th, tw, st, 0, 0, L / 2 + tw / 2 - 0.5);
var sp = new THREE.Mesh(drwGeo("spire" + tw, function () { var c = new THREE.ConeGeometry(tw * 0.72, tw * 3, 4); c.rotateY(Math.PI / 4); c.translate(0, tw * 1.5, 0); return c; }), o.spire || drwMat("slate"));
sp.position.set(0, th, L / 2 + tw / 2 - 0.5);
g.add(sp);
drkGothWin(g, 0, th - 6, L / 2 + tw - 0.48, 0, 1.2, 3, false);
drkDoor(g, 0, 0, L / 2 + tw - 0.42, 0, 1.8, 2.8);
var ca = Math.cos(ry || 0), sa = Math.sin(ry || 0);
drwSolid(x, z, W + 0.3, L + 0.3, y - 1, y + H + 8, -(ry || 0));
drwSolid(x + sa * (L / 2 + tw / 2 - 0.5), z + ca * (L / 2 + tw / 2 - 0.5), tw + 0.3, tw + 0.3, y - 1, y + th + 20, -(ry || 0));
return { g: g, door: { x: x + sa * (L / 2 + tw + 0.8), z: z + ca * (L / 2 + tw + 0.8), y: y } };
},
function () {
var S = drwSc(), k = S.env, L = null;
try {
L = drwL();
}
catch (e) { }
if (DRW.envK && DRW_ENV[DRW.envK])
k = DRW.envK;
if (DRW.night && !gS0(DRW.sc).under)
k = "night";
var R = L ? drwRoomAt(L.x, L.z) : null;
if (R)
k = R.env;
var E = {}, B = DRW_ENV[k] || DRW_ENV.land;
for (var q in B)
E[q] = B[q];
if (drwLite() && E.fogD)
E.fogD *= 1.4;
return E;
},
function (x, z, feet) {
if (DRW.moving || DRW.ride)
return true;
var S = drwSc(), D = DRW_SCN[DRW.sc];
if (!D)
return false;
if ((Math.abs(x) > S.bound || Math.abs(z) > S.bound) && drwFloorAt(x, z, feet) === null)
return true;
if (D.edge && x < S.bound + 60 && D.edge(x, z))
return true;
if (drwSolidAt(x, z, feet))
return true;
var fl = drwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = drwLand(x, z);
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
DRW.t += dt;
if (!DRW.scG)
return;
var S = drwSc(), L = drwL(), feet = camera.position.y - 1.72;
DRW.et = (DRW.et || 0) + dt;
if (DRW.et > 0.8) {
DRW.et = 0;
worldEnv(drwEnvNow());
}
var flow = DRW.t * 0.02;
DRW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * 0.4, flow); });
DRW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (DRW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(DRW.t * 3 + i * 2)) * 0.3; f.rotation.y = DRW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(DRW.t * 1.3) * 0.08;
}
});
DRW.bob.forEach(function (g, i) {
var u = g.userData, k = u.kind;
if (Math.abs(g.position.x - L.x) + Math.abs(g.position.z - L.z) > 260)
return;
if (k === "spin") {
g.rotation.y += dt * (u.sp || 0.3);
}
else if (k === "float") {
g.position.y = u.y0 + Math.sin(DRW.t * (u.f || 0.3) + u.ph) * (u.amp || 1);
}
else if (k === "circle") {
var a = DRW.t * (u.sp || 0.6) + u.ph;
g.position.x = u.home[0] + Math.cos(a) * (u.r || 8);
g.position.z = u.home[1] + Math.sin(a) * (u.r || 8);
g.position.y = u.y0 + Math.sin(a * 2.3) * 1.2;
g.rotation.y = -a;
}
});
DRW.ghosts.forEach(function (g, i) { var m = g.userData.mats; if (m)
m.forEach(function (x) { x.opacity = 0.55 + Math.sin(DRW.t * 0.8 + i) * 0.1; }); });
DRW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return drwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof drbTick === "function")
try {
drbTick(dt, L);
}
catch (e) {
if (!DRW.e1) {
DRW.e1 = 1;
if (window.console)
console.warn("[dracula] book", e);
}
}
if (!DRW.bannerBook)
worldBanner("<b>🦇 " + DRW_NAME + "</b> · " + esc(drwPlaceName(L)) + (DRW.night ? " · night" : ""));
DRW.pt = (DRW.pt || 0) + dt;
if (DRW.pt < 0.15)
return;
DRW.pt = 0;
if (DRW.moving || DRW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
DRW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof drbTalk === "function" && drbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
DRW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : drwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof drbSpot === "function")
drbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof drbIdlePrompt === "function")
drbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
if (opt.drwHop)
return;
var A = drwAtPt(opt.at) || (typeof drbStartAt === "function" && drbStartAt()) || drwAtPt("bsquare");
if (DRW_SC[A.sc] && DRW_SC[A.sc].host) {
var Ah = A;
A = drwAtPt("bsquare");
setTimeout(function () { drwGo(Ah, null, function () { if (typeof drbEnterHosted === "function")
drbEnterHosted(); }); }, 60);
}
drwScene(A.sc);
var y = A.y != null ? A.y : drwGround(A.x, A.z);
drwCam(A.sc, A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
DRW.moving = false;
DRW.ride = null;
worldEnv(drwEnvNow());
setStatus("🦇 <b>" + DRW_NAME + ".</b> Bram Stoker's Dracula (1897), the whole of it: Bistritz and the Borgo Pass, Castle Dracula, Whitby, London, and the race back to the castle before the sun goes down. <b>Press E</b> for the book.");
if (typeof drbEnter === "function")
try {
drbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[dracula] enter", e);
}
},
function () {
if (DRW_SC[DRW.sc] && DRW_SC[DRW.sc].host) {
DRW.G = null;
DRW.built = false;
return;
}
drwSceneDrop();
for (var k in DRW.mats) {
var m = DRW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in DRW.tex) {
var x = DRW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in DRW_GEO) {
try {
DRW_GEO[g].dispose();
}
catch (e) { }
}
DRW.mats = {};
DRW.tex = {};
DRW_GEO = {};
DRW.built = false;
DRW.G = null;
DRW.lights = 0;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = DRW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = DRW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: DRW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return drbPos(at.at);
var C = DRB_CH[drbS().ch], i = drbS().s, c = C && C.cast ? C.cast.filter(function (d) { return drbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? drbPos(c.at) : null;
}
if (at.spot) {
var Sp = DRW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: DRW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return drbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || DRW.sc, x: at.x, z: at.z, y: at.y };
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
if (DRB.beam && DRB.beam.parent === DRW.scG)
return DRB.beam;
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
DRW.scG.add(g);
DRB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return drwLam(c); }, m;
switch (kind) {
case "load":
m = drwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
drwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = drwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = drwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = drwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = drwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = drwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
drwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = drwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
drwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), drwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = drwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "skin":
m = drwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = drwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
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
if (!P || !DRW.scG || P.sc !== DRW.sc)
return null;
var g = drbItemMesh(kind), y = P.y != null ? P.y : drwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
DRW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = drwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (DRB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = DRW.spots.indexOf(I.S); if (j >= 0)
DRW.spots.splice(j, 1); DRB.items = DRB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.drb = 1;
DRB.items.push(I);
return I;
},
function (k) {
if (DRB.tuneKey === k)
return;
DRB.tuneKey = k;
var old = DRB.tune;
DRB.tune = null;
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
if (!k || !DRB_TUNES[k])
return;
try {
var A = new Audio(DRB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
DRB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (DRB.tune !== A) {
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
if (DRB.text)
return fn(DRB.text);
if (DRB.textWait) {
DRB.textWait.push(fn);
return;
}
DRB.textWait = [fn];
var done = function (B) { DRB.text = B; var w = DRB.textWait; DRB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/dracula/dracula.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
drbText(function (B) {
var C = DRB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3>" + DRB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(drbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); DRB.readOpen = 0; DRB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = drbS(), C = DRB_CH[S.ch];
if (!C)
return;
DRB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
DRB.readAsk = 0;
DRB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "Dracula") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? drbOpening(T).map(drbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); DRB.readOpen = 0; drbStepDone(); }, all: function () { drbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Stoker's own words, all of it");
b += drbKeeperBtns(fns);
worldCard(b, fns);
};
drbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
DRB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); drbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = drbS(), C = DRB_CH[S.ch];
if (!C)
return;
drbItemsClear();
drbCastClear();
DRB.hold = 0;
var go = function () { drbWorldState(); drbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[drb] setup", S.ch, e);
} drbTune(C.tune || null); drbStepBegin(); };
if (place && C.start) {
var P = drbPos(C.start);
if (P && (WLD.on === DRW_KEY || drwHere())) {
drwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (DRW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = drbStep();
drbItemsClear();
DRB.hold = 0;
DRB.puzOpen = 0;
if (!b)
return;
b._key = drbKey();
drbWorldState();
try {
if (b.on)
b.on(drbS().f);
}
catch (e) {
if (window.console)
console.warn("[drb] on", e);
}
if (b.k === "read") {
drbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { DRB.rew[k] = 0; });
if (b.k === "find") {
var Pf = drbPos(b.at);
if (Pf && Pf.sc === DRW.sc)
drbItemAdd(b.item, Pf, b.name, b.verb, function () { if (drbKey() === b._key)
drbStepDone(); });
}
if (b.k === "gather") {
var P = drbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(drbS().ch * 97 + drbS().s * 13 + 7);
DRB.got = 0;
if (P && P.sc === DRW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = drwGround(Q.x, Q.z, (P.y != null ? P.y : drwLand(P.x, P.z)) + 1);
drbItemAdd(b.item, Q, b.name, b.verb, function () { if (drbKey() !== b._key)
return; DRB.got++; try {
if (b.each)
b.each(DRB.got);
}
catch (e) { } if (DRB.got < n) {
drbSay((b.eachSay || "Got one.") + " " + DRB.got + " of " + n + ".");
return;
} drbStepDone(); });
}
}
if (b.h)
drbSay("<b>" + esc(DRB_CH[drbS().ch].t) + ".</b> " + b.h);
},
function (b) {
DRB.puzOpen = 1;
DRB.puzT = performance.now();
var k = drbKey(), fns = {}, h = DRB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
drbSay(b.yes);
if (drbKey() === k)
drbStepDone();
return;
}
drbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (drbKey() === k)
DRB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = drbS(), C = DRB_CH[S.ch], b = drbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[drb] done", e);
}
if (b.say)
drbSay(b.say);
S.s++;
if (window.DRB_LOG)
DRB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= DRB_CH.length - 1) {
S.done = 1;
S.s = 0;
drbSave();
drbItemsClear();
drbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
drbSave();
var nx = DRB_CH[S.ch];
setTimeout(function () { try {
drbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[drb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
drbSave();
drbStepBegin();
},
function () {
drbTune("end");
var S = drbS();
try {
if (typeof bhnFinish === "function")
bhnFinish("dracula");
}
catch (e) { }
var b = "<h3 style='margin:4px 0'>Note</h3><p style='font-style:italic'>" + drQ("Seven years ago we all went through the flames; and the happiness of some of us since then is, we think, well worth the pain we endured.") + "</p><p style='font-style:italic'>" + drQ("\"We want no proofs; we ask none to believe us! This boy will some day know what a brave and gallant woman his mother is.") + "</p><p>You have walked the whole of Dracula, from Bistritz to the castle and back again.</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; drbSave(); drbChapterBegin(true); } };
b += worldBtn("again", "Walk it again from the start", "Bistritz, the 3rd of May");
worldCard(b, fns);
},
function (c) {
var C = DRB.cast[c.key || c.k];
if (drbCastLive(C))
return C;
var P = drbPos(c.at);
if (!P || P.sc !== DRW.sc)
return null;
var F = DRW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = drwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = drwDressed("drb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : drwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
DRW.scG.add(g);
Pp = { g: g, y: y, o: {} };
DRW.people.push(Pp);
if (c.name && !c.mute)
drwTalk(Pp, c.name, drwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
DRB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return DRB.cast[c.key || c.k];
},
function () {
var C = DRB_CH[drbS().ch];
if (!C || !C.cast)
return;
var idx = drbS().s;
C.cast.forEach(function (c) { var key = c.key || c.k; if (c.from != null && idx < c.from) {
if (DRB.cast[key])
drbCastHide(key);
return;
} if (c.until != null && idx >= c.until) {
if (DRB.cast[key])
drbCastHide(key);
return;
} if (!drbCastLive(DRB.cast[key]))
drbCastAdd(c); });
},
function () {
if (!DRW.scG)
return;
drbCastClear();
var S = drbS(), C = DRB_CH[S.ch];
if (S.started && !S.done && C && C.cast && drbCastHere(C)) {
drbCastTick();
return;
}
(DRB_FOLK_AT[DRW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = drwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
DRB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!drbActive())
return false;
var b = drbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = drbKey();
worldPrompt(null);
var next = function () { if (drbKey() === k)
drbStepDone(); };
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
worldCard(DRB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
DRB.wt += dt;
if (DRB.wt > 0.5) {
DRB.wt = 0;
if (drbActive() && drbCastHere(DRB_CH[drbS().ch]))
drbCastTick();
var S0 = drbS();
S0.seen[DRW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!drbActive()) {
if (DRB.beam)
DRB.beam.visible = false;
DRW.bannerBook = false;
return;
}
var S = drbS(), b = drbStep(), t = DRW.t, feet = camera.position.y - 1.72;
DRB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? drbPos(b.at) : null, here = P && P.sc === DRW.sc, bm = drbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + drbScName(P.sc) + ": press E for the book)";
if (here && !DRW.moving && !DRW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : drwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = drbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !DRW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (DRB.readAsk)
break;
if (!DRB.readOpen)
drbChapterCard();
else {
DRB.readOpen = 0;
drbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
drbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
DRB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(DRB.hold, dt);
}
catch (e) { }
if (DRB.hold >= (b.sec || 8)) {
drbStepDone();
return;
}
}
else
DRB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return DRB.rew[k]; })) {
drbStepDone();
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
drbStepDone();
return;
}
break;
}
case "puzzle":
if ((!DRB.puzOpen || performance.now() - (DRB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
drbPuzzleCard(b);
break;
}
}
var C = DRB_CH[S.ch], prog = b && b.k === "hold" && DRB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - DRB.hold)) + " s)" : b && b.k === "gather" ? " (" + (DRB.got || 0) + " of " + (b.n || 3) + ")" : "";
DRW.bannerBook = true;
worldBanner("⏳ <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = drbS(), C = DRB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Bram Stoker · Dracula (1897), the whole book</div><h3 style='margin:4px 0'>🦇 Dracula</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((drbStep() || {}).h || "") + "</p>";
var st = drbStep(), P = st && st.at ? drbPos(st.at) : null, Cs = drbPos(C.start);
var to = P && P.sc !== DRW.sc ? P : (!P && Cs && Cs.sc !== DRW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + drbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); drwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { drbPopulate(); drbStepBegin(); }); };
}
}
else
b += "<p>May 1893. Jonathan Harker, a young English solicitor, travels to Transylvania to settle the purchase of a London house for a Count who lives in a castle above the Borgo Pass. He finds himself a prisoner, and his host something not alive. The Count sails for England in fifty boxes of his own earth. At Whitby Mina Murray's friend Lucy begins to fade; Dr Seward sends for Professor Van Helsing; and the band of friends hunt the Count from London back across Europe, racing the sun to his castle.</p><p style='opacity:.8'>Told as Stoker told it, in diaries, letters and cuttings. Every journey is its true length.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Bistritz, the 3rd of May", S.started ? "Back to where you were" : "\"Left Munich at 8:35 P. M., on 1st May\"");
fns.go = function () { worldCard(null); drbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; drbSave(); drbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(DRW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(DRW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (DRW_SCN[k].start || { x: 0, z: 0 }); drwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, drbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += drbKeeperBtns(fns);
worldCard(b, fns);
},
function (C) {
var R = function (v) { return typeof v === "string" ? drbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
DRB_CH.push(C);
return C;
},
function () {
var b = "", fns = {}, go = function (id, icon, label, sub, fn) { b += worldBtn(id, icon + " " + label, sub); fns[id] = function () { worldCard(null); fn(); }; };
DRW_CAB.forEach(function (c) { if (DRW_AT[c[4]])
go(c[0], c[1], c[2], c[3], function () { drwGo(c[4], c[5], typeof drbPopulate === "function" ? function () { drbPopulate(); if (drbActive())
drbStepBegin(); } : null); }); });
if (typeof dlnGo === "function")
go("gos", "🏥", "Back to London, 1912", "Great Ormond Street", function () { dlnGo(); });
if (typeof sxGo === "function")
go("sx", "🔎", "To The Sign of the Four's London", "Upper Norwood, 1888", function () { sxGo("cab"); });
go("book", "🦇", "The book", "Dracula: all twenty-seven chapters", function () { drbOpen(); });
worldCard(worldFacts("🐴 A hansom cab", "London, 1893", [], []) + b, fns);
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("drl", "🦇 To Dracula's London, 1893", "Hillingham, Kingstead, Piccadilly, the Zoo, Purfleet and Carfax");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); drwCabCard(); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function (kind) {
var g = null;
if (kind.slice(0, 5) === "folk:") {
var P = drwFolk(kind.slice(5), 0, 0, 0, { mute: 1 });
if (P) {
g = P.g;
DRW.people = DRW.people.filter(function (p) { return p !== P; });
DRW.talk = DRW.talk.filter(function (T) { return T.p !== P; });
if (g.parent)
g.parent.remove(g);
}
}
else {
try {
if (typeof crxBuild === "function")
g = crxBuild(kind === "rat" ? "giantrat" : kind === "wolf" ? "timberwolf" : kind);
}
catch (e) {
g = null;
}
if (!g) {
try {
g = crxBuild(kind);
}
catch (e) {
g = null;
}
}
}
if (!g) {
g = new THREE.Group();
var m = drwLam(kind === "rat" ? 0x3A3028 : 0x3A3634);
drwEll(g, m, kind === "rat" ? 0.14 : 0.28, kind === "rat" ? 0.12 : 0.32, kind === "rat" ? 0.3 : 0.7, 0, kind === "rat" ? 0.14 : 0.7, 0);
}
g.userData.keep = 1;
g.userData.live = 1;
return g;
},
function (o) {
drkFightEnd(true);
var F = DRK_FIGHT;
F.on = 1;
F.o = o;
F.name = o.name;
F.vig = F.max = 100;
F.t = 0;
F.wave = 0;
F.foes = [];
F.won = 0;
drkFightWave(0);
setStatus("⚔️ <b>" + esc(o.name) + ".</b> " + (o.say || "They are coming. Strike them down (the game's own fighting: F, E or a click to strike; your abilities on 1 to 4)."));
if (typeof playTone === "function")
playTone(220, 0.3);
},
function (w) {
var F = DRK_FIGHT, o = F.o;
F.wave = w;
var list = o.foes.filter(function (f) { return (f.wave || 0) === w; });
if (!list.length)
return false;
list.forEach(function (f, i) {
var g = drkFoeMesh(f.kind), y = f.y != null ? f.y : drwGround(f.x, f.z, (f.feet != null ? f.feet : 500));
g.position.set(f.x, y, f.z);
DRW.scG.add(g);
F.foes.push({ f: f, g: g, hp: f.hp || 30, max: f.hp || 30, cd: 1 + i * 0.3, dead: 0, deadT: 0, y: y });
});
if (w > 0 && o.waveSay && o.waveSay[w])
setStatus("⚔️ " + o.waveSay[w]);
return true;
},
function (E, d) {
if (E.dead)
return;
E.hp -= d;
E.hurt = 0.25;
if (typeof playTone === "function")
playTone(320, 0.05);
if (E.hp <= 0) {
E.dead = 1;
E.deadT = 0;
try {
if (E.f.flee) {
E.deadT = 9;
if (E.g.parent)
E.g.parent.remove(E.g);
}
else if (E.g.userData.crxAct)
E.g.userData.crxAct("die");
else
E.g.rotation.z = Math.PI / 2;
}
catch (e) { }
try {
if (!E.f.flee && typeof cbtKilled === "function")
cbtKilled({ name: E.f.name || E.f.kind, lv: E.f.lv || 4, boss: !!E.f.boss });
}
catch (e) { }
if (E.f.dieSay && (E.f.boss || E.f.flee))
setStatus(E.f.dieSay);
}
},
function (dt, L) {
var F = DRK_FIGHT;
if (!F.on || !DRW.scG)
return;
F.t += dt;
var feet = camera.position.y - 1.72, alive = 0;
F.foes.forEach(function (E) {
var g = E.g, f = E.f;
if (E.dead) {
E.deadT += dt;
if (E.deadT > 2.2 && g.parent) {
g.parent.remove(g);
}
return;
}
alive++;
var dx = L.x - g.position.x, dz = L.z - g.position.z, d = Math.hypot(dx, dz), sp = (f.sp || 2.2) * (E.hurt > 0 ? 0.3 : 1);
E.hurt = Math.max(0, (E.hurt || 0) - dt);
E.cd -= dt;
if (d > (f.reach || 1.5) && d < 60) {
var nx = g.position.x + dx / d * sp * dt, nz = g.position.z + dz / d * sp * dt, gy = drwGround(nx, nz, E.y + 1.2);
if (!drwSolidAt(nx, nz, gy) && Math.abs(gy - E.y) < 1.3) {
g.position.x = nx;
g.position.z = nz;
g.position.y = gy;
E.y = gy;
}
else {
var sx = g.position.x + (-dz / d) * sp * dt;
if (!drwSolidAt(sx, g.position.z, E.y))
g.position.x = sx;
}
}
g.rotation.y = Math.atan2(dx, dz);
if (d <= (f.reach || 1.5) + 0.3 && Math.abs(E.y - feet) < 2 && E.cd <= 0) {
E.cd = f.rate || 1.4;
var dm = f.dmg || 6;
try {
if (typeof cbtHarm === "function")
dm = cbtHarm(dm);
}
catch (e) { }
if (dm > 0) {
F.vig -= dm;
if (typeof playTone === "function")
playTone(140, 0.1);
try {
if (g.userData.crxAct)
g.userData.crxAct("attack");
}
catch (e) { }
}
if (F.vig <= 0) {
drkFightLost();
return;
}
}
});
if (!F.on)
return;
if (!alive && !F.won) {
if (!drkFightWave(F.wave + 1)) {
F.won = 1;
var o = F.o;
setTimeout(function () { drkFightEnd(); try {
if (!o.noDrop && typeof bhnBattleWon === "function")
bhnBattleWon("dracula", o.boss ? { boss: true } : undefined);
}
catch (e) { } if (o.win)
try {
o.win();
}
catch (e) { } }, 1600);
}
}
if (!DRW.bannerBook || !F.won)
worldBanner("⚔️ <b>" + esc(F.name) + "</b> · vigour " + Math.max(0, Math.round(F.vig)) + " of " + F.max + " · " + alive + " left" + (F.o.foes.some(function (f) { return (f.wave || 0) > F.wave; }) ? " (more to come)" : ""));
if (typeof cbtKilled !== "function") {
var near = null, nd = 2.4;
F.foes.forEach(function (E) { if (E.dead)
return; var d = Math.hypot(E.g.position.x - L.x, E.g.position.z - L.z); if (d < nd) {
nd = d;
near = E;
} });
if (near)
worldPrompt("⚔️ <b>" + esc(near.f.name || "It") + "</b> · <b>press E</b> to strike", function () { drkFoeHit(near, 18); });
}
},
function () {
var A = drwInAt("castle", 4), x = A.x, z = A.z;
return [{ kind: "rat", x: x - 8, z: z - 10, hp: 14, lv: 3, dmg: 3, sp: 3.2, name: "a rat", wave: 0 }, { kind: "rat", x: x + 6, z: z - 12, hp: 14, lv: 3, dmg: 3, sp: 3.2, name: "a rat", wave: 0 }, { kind: "rat", x: x, z: z - 14, hp: 14, lv: 3, dmg: 3, sp: 3.2, name: "a rat", wave: 0 }, { kind: "rat", x: x - 12, z: z - 6, hp: 14, lv: 3, dmg: 3, sp: 3.2, name: "a rat", wave: 0 },
{ kind: "wolf", x: x - 10, z: z - 14, hp: 40, lv: 5, dmg: 7, sp: 3.0, name: "a wolf", wave: 1 }, { kind: "wolf", x: x + 10, z: z - 14, hp: 40, lv: 5, dmg: 7, sp: 3.0, name: "a wolf", wave: 1 }, { kind: "wolf", x: x, z: z - 16, hp: 40, lv: 5, dmg: 7, sp: 3.0, name: "a wolf", wave: 1 },
{ kind: "folk:woman1", x: x, z: z - 15, hp: 90, lv: 8, dmg: 10, sp: 1.6, name: "the fair sister", boss: 1, wave: 2 }, { kind: "folk:woman2", x: x - 6, z: z - 13, hp: 70, lv: 7, dmg: 9, sp: 1.7, name: "a dark sister", wave: 2 }, { kind: "folk:woman3", x: x + 6, z: z - 13, hp: 70, lv: 7, dmg: 9, sp: 1.7, name: "a dark sister", wave: 2 }];
},
function (after) {
var A = drwInAt("castle", 4);
drwGo({ sc: "castle", x: A.x, z: A.z + 12, y: DRW_IN_Y, ry: 0 }, "🕯️ <b>The Count's dungeon.</b> Crypt after crypt under the chapel, the candles guttering; something moves among the coffins.", function () {
drkFight({ name: "The Count's dungeon", foes: drkDungeonFoes(), start: { sc: "castle", x: A.x, z: A.z + 12, y: DRW_IN_Y, ry: 0 }, waveSay: { 1: "Wolves come howling out of the dark of the crypts.", 2: "Three women in white come out of the dust in the moonlight from the grating: the sisters." },
win: function () { setStatus("⚔️ <b>The dungeon is quiet.</b> The sisters are dust; the wolves and the rats lie still. Come back and fight it again whenever you like: the best of the Count's things are rare."); if (after)
after(); } });
});
},
function () {
var x = DRW_AT.croadlow.x, z = DRW_AT.croadlow.z, f = [];
for (var i = 0; i < 6; i++)
f.push({ kind: "folk:szgany", x: x - 8 + i * 3, z: z - 30 - (i % 2) * 3, hp: 40, lv: 7, dmg: 8, sp: 2.2, name: "a Szgany", wave: 0 });
for (i = 0; i < 4; i++)
f.push({ kind: "wolf", x: x - 10 + i * 6, z: z - 40, hp: 40, lv: 6, dmg: 8, sp: 3.0, name: "a wolf", wave: 1 });
for (i = 0; i < 4; i++)
f.push({ kind: "folk:szgany", x: x - 6 + i * 4, z: z - 46, hp: 46, lv: 8, dmg: 9, sp: 2.2, name: "a Szgany", wave: 2 });
f.push({ kind: "folk:count", x: x, z: z - 52, hp: 160, lv: 10, dmg: 12, sp: 1.8, name: "Count Dracula", boss: 1, wave: 3, dieSay: "🦇 " + drQ("It was like a miracle; but before our very eyes, and almost in the drawing of a breath, the whole body crumble into dust and passed from our sight.") });
return f;
},
function (after) {
var x = DRW_AT.croadlow.x, z = DRW_AT.croadlow.z;
drwGo({ sc: "castle", x: x, z: z, ry: Math.PI }, "🌄 <b>The road under the castle, at sunset.</b> The leiter-wagon, the Szgany round it with their knives out; the sun almost on the mountain tops.", function () {
drkFight({ name: "The last battle", boss: 1, foes: drkLastFoes(), start: { sc: "castle", x: x, z: z, ry: Math.PI }, waveSay: { 1: "The wolves come down the slopes to the Szgany's call.", 2: "More of the Szgany close round the wagon, knives out.", 3: "The lid of the box is thrown back: the Count. " + drQ("the eyes saw the sinking sun, and the look of hate in them turned to triumph.") },
say: "The Szgany draw their knives. Fight your way to the wagon before the sun goes down.",
win: function () { setStatus("🌄 <b>The last battle is won.</b> Fight it again whenever you like (from the road under the castle): the best of the Count's things are rare, and come to those who come back."); if (after)
after(); } });
});
},
function (G) {
var lite = drwLite(), H = drwBistH, R = wRand(1893);
drwTerrain(G, -540, -540, 1080, 1080, lite ? 14 : 8, H, drwMat("grass"), function (x, z, y, c) { var n = drwFbm(x * 0.03, z * 0.03, 3); c.setRGB(0.32 + n * 0.12, 0.38 + n * 0.1, 0.22 + n * 0.08); });
var sq = new THREE.Mesh(drwGeo("bsq", function () { var p = new THREE.PlaneGeometry(76, 76, 19, 19); p.rotateX(-Math.PI / 2); var pa = p.attributes.position; for (var i = 0; i < pa.count; i++)
pa.setY(i, drwBistH(pa.getX(i), pa.getZ(i) - 30) + 0.08); p.computeVertexNormals(); var uv = p.attributes.uv; for (i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 30, uv.getY(i) * 30); return p; }), drwMat("paving"));
sq.position.z = -30;
sq.receiveShadow = true;
G.add(sq);
drwStrip(G, [[0, 10], [0, 40], [0, 120], [20, 300], [0, 520]], 7, H, drwMat("road"), 0.12);
drwStrip(G, [[0, -68], [0, -160], [-30, -320], [-20, -520]], 7, H, drwMat("road"), 0.12);
var cols = [0xE8D8B8, 0xD8B890, 0xE0C8A8, 0xC8D0B0, 0xE8C8B8, 0xD0C0A0, 0xE4DCC8], k = 0;
[[-46, -6, Math.PI / 2], [-46, -30, Math.PI / 2], [-46, -54, Math.PI / 2], [46, -6, -Math.PI / 2], [46, -30, -Math.PI / 2], [46, -54, -Math.PI / 2], [-22, -76, 0], [22, -76, 0], [-22, 16, Math.PI], [22, 16, Math.PI]].forEach(function (q, i) {
if (i === 1)
return;
drkHouse(G, q[0], q[1], 14, 10, 8 + (i % 3), { ry: q[2], col: cols[i % cols.length], roof: drwMat("terracotta"), shut: [0x3A5A3A, 0x5A3A2A, 0x2A3A5A][i % 3], rh: 6.5, sc: "bistritz", room: 2 + (i % 3), name: ["The door of a burgher's house", "The door of a shop on the square", "The door of a weaver's house"][i % 3], timber: i % 4 === 2, chim: 1 });
});
drkHouse(G, -46, -30, 22, 14, 11, { ry: Math.PI / 2, col: 0xE8D8A8, roof: drwMat("terracotta"), shut: 0x2A4A2A, rh: 8, chim: 1 });
drwSign(G, "GOLDENE KRONE", 5, 0.8, -38.8, H(-38, -30) + 4.2, -30, Math.PI / 2, { bg: "#2A1A10", ink: "#E8C860" });
var cr = new THREE.Mesh(drwGeo("crown", function () { return new THREE.TorusGeometry(0.5, 0.12, 6, 14); }), drwShine(0xE8B840, 0.5, 0.6));
cr.position.set(-38.6, H(-38, -30) + 5.4, -30);
cr.rotation.y = Math.PI / 2;
G.add(cr);
drwEnterable(G, "bistritz", 0, -46, -30, Math.PI / 2, "The door of the Golden Krone Hotel", { W: 16, D: 12, H: 4.2, paper: drwMat("greenpaper"), floor: drwMat("floor"), env: "gas", fill: drwKroneDining }, { d: 22, outName: "the square" });
drwRoomBuild(G, "bistritz", 1, 8, 7, 3.4, { paper: drwMat("damask"), floor: drwMat("floor"), out: { x: DRW_AT.kdining.x + 5, z: DRW_AT.kdining.z - 2, ry: 0 }, doorName: "The door, down to the dining room", env: "gas" });
(function () {
var A = drwInAt("bistritz", 1), g = new THREE.Group();
g.position.set(A.x, DRW_IN_Y, A.z);
G.add(g);
drwBed(g, -2.4, -2, 0, 0xC8B8A0);
drwChest(g, 2.8, -3, 0);
drwTable(g, 2, 0, 1, 0.7, 0.76, drwMat("oak"));
drwChair(g, 2, 0.8, Math.PI, drwMat("oak"));
drwRug(g, 0, 0, 4, 3, 0x6A2A2A);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.6), drwGlowM(0xF4C890, 0.8));
win.position.set(0, 1.5, -3.44);
g.add(win);
})();
drkChurch(G, 34, -104, Math.PI, { len: 34, w: 14, h: 13, th: 44, tower: 8, lit: 0xFFC070 });
drkCoach(G, -30, -8, Math.PI, { horses: 4, col: 0x3A2A1A, lamps: true });
drkCoach(G, 30, -48, 0.4, { kind: "cart", horses: 1 });
for (var i = 0; i < (lite ? 4 : 7); i++) {
var mx = -18 + i * 7, mz = -48 - (i % 2) * 6, my = H(mx, mz);
var st = new THREE.Group();
st.position.set(mx, my, mz);
G.add(st);
drwBox(st, 2.6, 0.9, 1.2, drwS("b:planks", 0x7A5A3A, 1.4), 0, 0, 0);
[[-1.2, -0.5], [1.2, -0.5], [-1.2, 0.5], [1.2, 0.5]].forEach(function (q) { drwBox(st, 0.08, 2.4, 0.08, drwMat("oak"), q[0], 0, q[1]); });
drwBox(st, 3, 0.06, 1.6, drwLam([0xC83A2A, 0xE8D8B0, 0x3A6A9A, 0xC8A030][i % 4]), 0, 2.4, 0);
drwSolid(mx, mz, 2.8, 1.4, my - 1, my + 2.5, 0);
for (var b = 0; b < 4; b++) {
var fr = new THREE.Mesh(drwGeo("fruit", function () { return new THREE.SphereGeometry(0.14, 8, 6); }), drwLam([0xC83A2A, 0xE8A030, 0x7AA03A, 0x8A3A6A][(i + b) % 4]));
fr.position.set(-0.9 + b * 0.6, 0.98, 0);
st.add(fr);
}
}
(function () { var x = 8, z = -30, y = H(x, z); drwCyl(G, 1.2, 1.3, 0.9, drwMat("ashlar"), x, y, z, 16); var g = new THREE.Group(); g.position.set(x, y, z); G.add(g); [-1, 1].forEach(function (s) { drwBox(g, 0.14, 2.6, 0.14, drwMat("oak"), s * 1.0, 0, 0); }); drwBox(g, 2.3, 0.14, 0.14, drwMat("oak"), 0, 2.6, 0); drwRound(x, z, 1.4, y - 1, y + 3); })();
drwPlant(G, "tree", drwScatter(1894, lite ? 40 : 110, -520, -520, 520, 520, function (x, z) { return (Math.abs(x) > 70 || Math.abs(z + 30) > 70) && drwPathD(x, z, [[0, 10], [0, 120], [20, 300]]) > 10 && drwPathD(x, z, [[0, -68], [0, -160], [-30, -320]]) > 10; }, H, 0.9, 1.4), { col: 0x4A6A34 });
drwPlant(G, "conifer", drwScatter(1895, lite ? 30 : 80, -520, -520, 520, -260, null, H, 0.9, 1.4));
drwCrowd("bistritz", lite ? 8 : 20, -38, -70, 38, 10, { dress: "drpeasant", dressF: "drpeasantf", women: 0.5, wander: 14, sp: 0.5, beardP: 0.4, ok: function (x, z) { return !drwSolidAt(x, z, H(x, z)); },
names: ["A peasant of Bistritz", "A Saxon townswoman", "A Slovak with his great belt", "A woman in her embroidered apron", "A Czech from the hills", "A farmer come to market"], persona: "bistritz",
says: ["Tomorrow is St. George's Day. Tonight, when the clock strikes midnight, all the evil things in the world will have full sway.", "You are going to the Borgo? To the Count? (She crosses herself.)", "Ordog. Pokol. Stregoica. Vrolok. (He crosses himself, and points two fingers at you.)", "Paprika hendl, sir, the inn does it well. Thirsty food.", "The Borgo road climbs all day. The horses are fresh; the driver whips them on.", "Take this. (A crucifix, pressed into your hand.) For your mother's sake."] });
drwCrowd("bistritzS", lite ? 3 : 7, -38, -70, 38, 10, { dress: "drslovak", women: 0, wander: 10, sp: 0.4, beardP: 0.8, ok: function (x, z) { return !drwSolidAt(x, z, H(x, z)); } });
},
function (g, W, D, H, A) {
drwTable(g, -3, -2, 2.2, 1.1, 0.78, drwMat("oak"), 0xF0E8D8);
drwTable(g, 3, -2, 2.2, 1.1, 0.78, drwMat("oak"), 0xF0E8D8);
[-1, 1].forEach(function (s) { [-3, 3].forEach(function (tx) { drwChair(g, tx + s * 1.4, -2, s * Math.PI / 2, drwMat("oak")); }); });
drwBox(g, 1.4, 2.2, 1.0, drwS("tile", 0x7A3A2A, 0.6), -W / 2 + 1.2, 0, -D / 2 + 1.0);
drwFire(g, -W / 2 + 1.2, 0, -D / 2 + 1.8, 0.5);
drwShelves(g, 0, -D / 2 + 0.3, 5, 2.4, 0);
drwRug(g, 0, 1.6, 6, 3, 0x7A2A22);
var top = drkStair(g, W / 2 - 1.2, -D / 2 + 2.1 + 4.2, 0, 3.0, 4.2, 1.4, Math.PI, { mat: drwS("b:oak", 0x6A4A2A, 1.2), walls: [0], at: { x: A.x, z: A.z, y: DRW_IN_Y } });
drwSpot(A.x + W / 2 - 1.2, A.z - D / 2 + 1.2 + 0.6, 1.4, "The landing, and your room", "go up", function () { drwGo({ sc: "bistritz", x: DRW_AT.kroom.x, z: DRW_AT.kroom.z + 2, y: DRW_IN_Y, ry: 0 }, "🛏️ <b>Your room at the Golden Krone.</b>", typeof drbPopulate === "function" ? drbPopulate : null); }, DRW_IN_Y + 3.0);
drkLanding(g, W / 2 - 1.2, -D / 2 + 1.3, 1.4, 1.6, 3.0, { mat: drwS("b:oak", 0x6A4A2A, 1.2), under: 0, open: { w: 1 }, at: { x: A.x, z: A.z, y: DRW_IN_Y } });
},
function (G) {
var lite = drwLite(), H = drwBorgoH, R = wRand(1897), road = drwBorgoRoad();
drwTerrain(G, -1720, -700, 3440, 1400, lite ? 22 : 12, H, drwMat("grass"), function (x, z, y, c) {
var n = drwFbm(x * 0.02, z * 0.02, 3), rise = y - drwBorgoRoadY(x), rock = drwSmooth(40, 140, rise), snow = drwSmooth(150, 230, rise);
c.setRGB(0.20 + n * 0.08 + rock * 0.22 + snow * 0.55, 0.26 + n * 0.08 + rock * 0.16 + snow * 0.5, 0.16 + n * 0.05 + rock * 0.18 + snow * 0.6);
});
drwStrip(G, road, 6.5, H, drwMat("road"), 0.14);
var ok = function (x, z) { var d = Math.abs(z - drwBorgoZ(x)); return d > 7 && d < 520; };
drwPlant(G, "conifer", drwScatter(1898, lite ? 420 : 1300, -1700, -680, 1700, 680, ok, H, 0.9, 1.6), { keepAll: 1 });
drwPlant(G, "tree", drwScatter(1899, lite ? 80 : 240, -1700, -260, 1700, 260, function (x, z) { var d = Math.abs(z - drwBorgoZ(x)); return d > 9 && d < 120; }, H, 0.8, 1.2), { col: 0x3A5A2E });
drwPlant(G, "rock", drwScatter(1900, lite ? 60 : 180, -1700, -500, 1700, 500, function (x, z) { return Math.abs(z - drwBorgoZ(x)) > 8; }, H, 0.8, 2.6));
(function () { var x = -1580, z = drwBorgoZ(-1580) + 6, y = H(x, z); var g = new THREE.Group(); g.position.set(x, y, z); G.add(g); var wd = drwS("b:oak", 0x4A3424, 1.2); drwBox(g, 0.22, 3.4, 0.22, wd, 0, 0, 0); drwBox(g, 1.6, 0.2, 0.2, wd, 0, 2.5, 0); drwBox(g, 1.2, 0.5, 0.06, wd, 0, 2.9, 0.12); drwRound(x, z, 0.4); })();
drwSign(G, "BORGO", 1.6, 0.4, -1590, H(-1590, drwBorgoZ(-1590) - 5) + 1.1, drwBorgoZ(-1590) - 5, 0.2, { bg: "#D8D0C0", ink: "#1A1A1A" });
var dil = drkCoach(G, -1600, drwBorgoZ(-1600) + 2.5, -Math.PI / 2, { horses: 6, col: 0x3A2A1A });
DRW.shows = DRW.shows || {};
DRW.caleche = drkCoach(G, -1530, drwBorgoZ(-1530), -Math.PI / 2 + Math.PI, { horses: 4, black: 1 });
[[-760, 26], [-160, -34], [260, 30], [980, -28]].forEach(function (q, i) {
var x = q[0], z = drwBorgoZ(x) + q[1], y = H(x, z);
var f = new THREE.Mesh(drwGeo("bflame", function () { var c = new THREE.ConeGeometry(0.22, 0.8, 8); c.translate(0, 0.4, 0); return c; }), drwGlowM(0x6AA8FF, 0.75));
f.position.set(x, y + 0.1, z);
G.add(f);
var gl = new THREE.Mesh(drwGeo("bflameg", function () { return new THREE.SphereGeometry(0.9, 10, 8); }), drwGlowM(0x3A6AD8, 0.18));
gl.position.set(x, y + 0.6, z);
G.add(gl);
f.userData.kind = "float";
f.userData.y0 = y + 0.1;
f.userData.amp = 0.05;
f.userData.f = 0.4;
f.userData.ph = i;
DRW.bob.push(f);
for (var s = 0; s < 5; s++) {
var st = new THREE.Mesh(drwGeo("fstone2", function () { return new THREE.DodecahedronGeometry(0.22, 0); }), drwMat("rock"));
st.position.set(x + Math.cos(s * 1.3) * 0.7, y + 0.1, z + Math.sin(s * 1.3) * 0.7);
G.add(st);
}
});
for (var i = 0; i < (lite ? 5 : 9); i++) {
var a = i / (lite ? 5 : 9) * 6.283, x = 520 + Math.cos(a) * 16, z = drwBorgoZ(520) + Math.sin(a) * 14;
drkWolf(G, x, z, a, { r: 5, sp: 0.35 });
}
for (i = 0; i < (lite ? 3 : 6); i++) {
var x2 = -1200 + i * 520, z2 = drwBorgoZ(x2) + (i % 2 ? 1 : -1) * (30 + i * 4);
drkWolf(G, x2, z2, 0, { r: 16, sp: 0.5 });
}
var moon = new THREE.Mesh(new THREE.SphereGeometry(30, 16, 12), new THREE.MeshBasicMaterial({ color: 0xF0F0E0, fog: false }));
moon.position.set(1400, 700, -1800);
G.add(moon);
var mg = new THREE.Mesh(new THREE.SphereGeometry(70, 16, 12), new THREE.MeshBasicMaterial({ color: 0xC8D0F0, fog: false, transparent: true, opacity: 0.12, depthWrite: false }));
mg.position.copy(moon.position);
G.add(mg);
(function () {
var cx = 2050, cz = drwBorgoZ(1700) - 60, by = drwBorgoRoadY(1700) + 30, g = new THREE.Group();
g.position.set(cx, by, cz);
G.add(g);
var st = drwMat("greystone"), dk = drwLam(0x14141A);
var crag = new THREE.Mesh(drwGeo("bcrag", function () { var c = new THREE.CylinderGeometry(60, 150, 220, 9, 4); var pa = c.attributes.position; for (var i = 0; i < pa.count; i++) {
pa.setX(i, pa.getX(i) * (0.85 + drwHash(i, 1) * 0.3));
pa.setZ(i, pa.getZ(i) * (0.85 + drwHash(i, 2) * 0.3));
} c.computeVertexNormals(); c.translate(0, -80, 0); return c; }), drwMat("rock"));
g.add(crag);
drwBox(g, 90, 26, 50, st, 0, 30, 0);
drwBox(g, 30, 44, 30, st, -30, 30, -5);
[[-45, -25], [45, -25], [-45, 25], [45, 25], [10, -28]].forEach(function (q, i) { drkTower(g, q[0], q[1], 7, 40 + i * 6, { y: 30, flat: i % 2 === 0, mat: st, solid: false, windows: 2 }); });
for (var w = 0; w < 6; w++) {
var wm = new THREE.Mesh(drwGeo("cwin2", function () { return new THREE.PlaneGeometry(2, 4); }), w === 4 ? drwGlowM(0xFFC070, 0.8) : dk);
wm.position.set(-35 + w * 14, 46, 25.1);
g.add(wm);
}
})();
drkBats(G, 1500, drwBorgoRoadY(1500) + 30, drwBorgoZ(1500), lite ? 6 : 12, 20);
var far = [];
for (i = 0; i < 16; i++) {
var a2 = i / 16 * 6.283;
far.push({ x: Math.cos(a2) * 3200, z: Math.sin(a2) * 2200, y: -60, s: 1 + R() * 0.6, ry: R() * 6 });
}
drwInst(G, drwGeo("bmount", function () { var c = new THREE.ConeGeometry(700, 900, 7, 3); var pa = c.attributes.position; for (var i = 0; i < pa.count; i++) {
pa.setX(i, pa.getX(i) * (0.8 + drwHash(i, 4) * 0.4));
} c.computeVertexNormals(); c.translate(0, 450, 0); return c; }), drwLam(0x2A3040), far, { cull: false });
},
function (x, z) {
var n = drwFbm(x * 0.02 + 11, z * 0.02, 3) * 2;
if (x > -86 && x < 86 && z > -76 && z < 70)
return 0;
var dx = Math.max(0, Math.abs(x) - 86), dzs = Math.max(0, -76 - z), dzn = Math.max(0, z - 70);
if (dzs > 0 && dx < 200)
return -Math.min(320, dzs * 5 + dx * 0.5) + n * 3;
var y = -dzn * 0.19 - dx * 1.2 + n;
if (dx > 0 && dzn <= 0)
y = -dx * 1.4 + n;
return Math.max(-320, y);
},
function (G) {
var lite = drwLite(), H = drwCastleH, R = wRand(1462), st = drwMat("greystone"), ash = drwS("b:ashlar", 0x9A968E, 2.4), dark = drwLam(0x0A0A0E);
drwTerrain(G, -640, -640, 1280, 1300, lite ? 16 : 9, H, drwMat("rock"), function (x, z, y, c) { var n = drwFbm(x * 0.04, z * 0.04, 3), top = y > -1 ? 1 : 0, snow = DRW.snowOn ? 1 : 0; c.setRGB(0.32 + n * 0.1 + snow * 0.5, 0.31 + n * 0.1 + snow * 0.5, 0.3 + n * 0.08 + snow * 0.55); if (top && !snow)
c.setRGB(0.36 + n * 0.06, 0.34 + n * 0.06, 0.3 + n * 0.05); });
var road = [];
DRW_CR_ROAD.forEach(function (p) { road.push(p); });
drwStrip(G, drwDense(road, 4), 6, H, drwMat("road"), 0.16);
drwPlant(G, "conifer", drwScatter(1463, lite ? 160 : 480, -640, 90, 640, 660, function (x, z) { return drwCastleRoadD(x, z) > 9 && H(x, z) < -10; }, H, 0.9, 1.5), { keepAll: 1 });
drwPlant(G, "conifer", drwScatter(1464, lite ? 120 : 360, -640, -640, 640, -200, null, H, 1.0, 1.6), { keepAll: 1 });
drwPlant(G, "rock", drwScatter(1465, lite ? 40 : 120, -300, -300, 300, 600, function (x, z) { return drwCastleRoadD(x, z) > 7 && H(x, z) < -2; }, H, 1, 3));
drkWall(G, -80, 62, -3.2, 62, 12, 2.4, st, 0, { cren: 1 });
drkWall(G, 3.2, 62, 80, 62, 12, 2.4, st, 0, { cren: 1 });
drkWall(G, -80, 62, -80, -72, 12, 2.4, st, 0, { cren: 1 });
drkWall(G, 80, 62, 80, -72, 12, 2.4, st, 0, { cren: 1 });
[[-80, 62], [80, 62], [-80, -72], [80, -72]].forEach(function (q, i) { drkTower(G, q[0], q[1], 7, 22 + i * 3, { y: -0.4, flat: i % 2 === 1, mat: st, lit: i === 2 }); });
drkTower(G, -6.5, 64, 4.2, 18, { y: -0.4, flat: 1, mat: st });
drkTower(G, 6.5, 64, 4.2, 18, { y: -0.4, flat: 1, mat: st });
(function () { var g = new THREE.Group(); g.position.set(0, 0, 62); G.add(g); drwBox(g, 6.4, 4, 2.6, st, 0, 12 - 4, 0); var a = new THREE.Mesh(drwGeo("garch", function () { return new THREE.TorusGeometry(3.2, 0.4, 6, 16, Math.PI); }), st); a.position.set(0, 8, 1.3); g.add(a); })();
drwCastleKeep(G, st, ash, dark);
drwStrip(G, [[0, 62], [0, -18]], 9, H, drwMat("paving"), 0.06);
(function () { var x = -30, z = 20; drwCyl(G, 1.6, 1.7, 1, st, x, 0, z, 14); drwRound(x, z, 1.9, -1, 2); var g = new THREE.Group(); g.position.set(x, 0, z); G.add(g); [-1, 1].forEach(function (s) { drwBox(g, 0.2, 3, 0.2, drwMat("oak"), s * 1.4, 0, 0); }); drwBox(g, 3, 0.2, 0.3, drwMat("oak"), 0, 3, 0); })();
drkHouse(G, -56, 30, 18, 14, 6, { ry: Math.PI / 2, wall: st, roof: drwMat("slate"), rh: 4, sc: "castle", room: 2, name: "The door of the stables" });
DRW.ccal = drkCoach(G, 16, 24, Math.PI, { horses: 4, black: 1 });
drwShow("caleche", DRW.ccal, true);
(function () {
var cm = drwS("b:ashlar", 0x9A948A, 26).clone();
if (cm.emissive)
cm.emissive = new THREE.Color(0x24201C);
cm.userData.noPhoto = 1;
var fl = new THREE.Mesh(new THREE.PlaneGeometry(156, 78), cm);
fl.rotation.x = -Math.PI / 2;
fl.position.set(0, 0.03, 22);
G.add(fl);
var wd = drwScatter("cweed", lite ? 60 : 200, -76, -16, 76, 58, function (x, z) { return Math.abs(x) > 6 && Math.hypot(x + 30, z - 20) > 3; }, function () { return 0.04; }, 0.3, 0.9);
drwPlant(G, "grass", wd);
drwPlant(G, "bush", wd.filter(function (t, i) { return i % 9 === 0; }).map(function (t) { return { x: t.x, z: t.z, y: 0, s: t.s * 0.5, ry: t.ry }; }));
var oak2 = drwMat("oak"), iron = drwMat("iron");
[[-44, 22], [-44.8, 23.2], [-43.6, 24], [-45, 20.6], [-44, 40, 1]].forEach(function (q) {
var g = new THREE.Group();
g.position.set(q[0], 0, q[1]);
if (q[2])
g.rotation.z = Math.PI / 2;
G.add(g);
var c = new THREE.Mesh(drwGeo("barrel", function () { var c = new THREE.CylinderGeometry(0.42, 0.42, 1.1, 12); var pa = c.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i), k = 1 + 0.14 * (1 - Math.pow(y / 0.55, 2));
pa.setX(i, pa.getX(i) * k);
pa.setZ(i, pa.getZ(i) * k);
} c.computeVertexNormals(); c.translate(0, 0.55, 0); return c; }), oak2);
g.add(c);
if (q[2])
g.position.y = 0.45;
[0.15, 0.95].forEach(function (y) { var r = new THREE.Mesh(drwGeo("hoop", function () { return new THREE.TorusGeometry(0.47, 0.025, 4, 16); }), iron); r.rotation.x = Math.PI / 2; r.position.y = y; g.add(r); });
drwRound(q[0], q[1], 0.55, -1, 1.2);
});
(function () {
var g = new THREE.Group();
g.position.set(-38, 0, 46);
g.rotation.y = 0.6;
G.add(g);
drwBox(g, 1.6, 0.12, 3.2, oak2, 0, 0.7, 0);
drwBox(g, 0.1, 0.5, 3.2, oak2, -0.8, 0.76, 0);
drwBox(g, 0.1, 0.5, 3.2, oak2, 0.8, 0.76, 0);
drwBox(g, 0.08, 0.08, 2.6, oak2, -0.3, 0.4, 2.6);
drwBox(g, 0.08, 0.08, 2.6, oak2, 0.3, 0.4, 2.6);
var wh = new THREE.Mesh(drwGeo("cwheel", function () { return new THREE.TorusGeometry(0.62, 0.07, 5, 14); }), oak2);
wh.rotation.y = Math.PI / 2;
wh.position.set(-0.9, 0.62, -0.6);
g.add(wh);
var w2 = wh.clone();
w2.position.set(1.4, 0.3, 0.6);
w2.rotation.set(Math.PI / 2, 0, 0.3);
g.add(w2);
g.rotation.z = 0.12;
drwSolid(-38, 46, 2.4, 4, -1, 1.4, 0.6);
})();
(function () { var hay = new THREE.Mesh(drwGeo("hay", function () { var c = new THREE.SphereGeometry(1.4, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1.3, 0.7, 1); return c; }), drwS("b:planks", 0xB89A58, 0.6)); hay.position.set(-47, 0, 36); G.add(hay); drwRound(-47, 36, 1.6, -1, 1); })();
drwBox(G, 1.4, 0.8, 1.4, st, -12, 0, 8);
drwBox(G, 0.9, 0.4, 1.4, st, -12.6, 0, 8);
drwRound(-12, 8, 0.9, -1, 0.8);
[-5, 5].forEach(function (x) { drwBox(G, 0.1, 0.5, 0.5, iron, x, 3, -19.8); var f = new THREE.Mesh(drwGeo("tflame", function () { return new THREE.ConeGeometry(0.16, 0.5, 6); }), drwGlowM(0xFFA040, 0.9)); f.position.set(x, 3.75, -19.5); G.add(f); drwBox(G, 0.12, 0.4, 0.12, oak2, x, 3.2, -19.55); });
[[-30, 20], [0, -10], [30, 10]].forEach(function (q) { for (var i = 0; i < 6; i++)
drwBox(G, 0.6 + drwHash(i, q[0]) * 0.8, 0.18, 0.5 + drwHash(i, q[1]) * 0.6, st, q[0] + (drwHash(i, 3) - 0.5) * 8, 0, q[1] + (drwHash(i, 7) - 0.5) * 8); });
})();
drwCastleChapel(G, st);
(function () { var P = drwFolk("count", -24, -74.4, 0, { y: 12, mute: 1 }); if (!P)
return; var g = P.g; g.rotation.set(Math.PI / 2, 0, Math.PI); g.userData.crawl = 1; drwShow("crawl", g, false); DRW.crawler = g; })();
var moon = new THREE.Mesh(new THREE.SphereGeometry(30, 16, 12), new THREE.MeshBasicMaterial({ color: 0xF0F0E0, fog: false }));
moon.position.set(-900, 620, -1600);
G.add(moon);
drwShow("moon", moon, true);
drkBats(G, 0, 40, -30, lite ? 6 : 12, 40);
for (var i = 0; i < (lite ? 2 : 5); i++) {
var a = i * 1.4;
drkWolf(G, -200 + i * 90, 420 + i * 30, a, { r: 20, sp: 0.4 });
}
var far = [];
for (i = 0; i < 14; i++) {
var a2 = i / 14 * 6.283;
far.push({ x: Math.cos(a2) * 2600, z: Math.sin(a2) * 2600, y: -400, s: 1 + R() * 0.6, ry: R() * 6 });
}
drwInst(G, drwGeo("bmount", function () { var c = new THREE.ConeGeometry(700, 900, 7, 3); var pa = c.attributes.position; for (var i = 0; i < pa.count; i++) {
pa.setX(i, pa.getX(i) * (0.8 + drwHash(i, 4) * 0.4));
} c.computeVertexNormals(); c.translate(0, 450, 0); return c; }), drwLam(0x2A3040), far, { cull: false });
(function () {
var sn = new THREE.Group();
var flakes = [];
for (var i = 0; i < (lite ? 300 : 900); i++)
flakes.push({ x: (R() - 0.5) * 400, y: R() * 60, z: (R() - 0.5) * 400 + 100, s: 1 });
drwInst(sn, drwGeo("flake", function () { return new THREE.SphereGeometry(0.05, 4, 3); }), drwGlowM(0xFFFFFF, 0.85), flakes, { cull: false });
var cover = new THREE.Mesh(new THREE.PlaneGeometry(172, 146), drwLam(0xF2F4F8));
cover.rotation.x = -Math.PI / 2;
cover.position.set(0, 0.07, -3);
sn.add(cover);
G.add(sn);
drwShow("snow", sn, false);
sn.userData.kind = "float";
sn.userData.y0 = 0;
sn.userData.amp = 8;
sn.userData.f = 0.05;
sn.userData.ph = 0;
DRW.bob.push(sn);
})();
(function () { var w = drkCoach(G, 0, 300, Math.PI, { kind: "cart", horses: 2, solid: false }); drkEarthBox(w, 0, 0.3, 0, { y: 1.2, shut: 1, solid: false }); drwShow("leiter", w, false); DRW.leiter = w; })();
drwCastleRooms(G);
},
function (G, st, ash, dark) {
var F1 = 7, F2 = 14, x0 = -50, x1 = 50, zN = -20, zS = -70, plaster = drwS("b:stucco", 0x8A8274, 3), oak = drwS("b:oak", 0x4A2E1A, 1.4), flag = drwMat("greystone");
drkWall(G, x0, zN, -1.8, zN, F2 + 2, 1.6, st, 0, { cren: 1 });
drkWall(G, 1.8, zN, x1, zN, F2 + 2, 1.6, st, 0, { cren: 1 });
drwBox(G, 3.6, F2 + 2 - 4.4, 1.6, st, 0, 4.4, zN);
drkWall(G, x0, zS, x1, zS, F2 + 2, 1.6, st, 0, { cren: 1 });
drkWall(G, x0, zN, x0, zS, F2 + 2, 1.6, st, 0, { cren: 1 });
drkWall(G, x1, zN, x1, zS, F2 + 2, 1.6, st, 0, { cren: 1 });
drwBox(G, x1 - x0, 0.5, zN - zS, st, 0, F2 + 1.6, (zN + zS) / 2);
[[-50, -20], [50, -20], [-50, -70], [50, -70]].forEach(function (q, i) { drkTower(G, q[0], q[1], 5.5, 26 + i * 2, { y: -0.4, mat: st, lit: i === 1, roofMat: drwMat("slate") }); });
drkTower(G, -20, -72, 4, 34, { y: -0.4, mat: st, flat: 1, solid: false });
drkDoor(G, 0, 0, zN + 0.85, 0, 3.2, 4.4, { mat: drwS("b:oak", 0x3A2414, 1.2) });
for (var i = 0; i < 8; i++) {
var wx = x0 + 7 + i * 12;
[[zN + 0.82, 0], [zS - 0.82, Math.PI]].forEach(function (q, k) { drkGothWin(G, wx, 2.4, q[0], q[1], 1.6, 3.6, false); drkGothWin(G, wx, F1 + 2, q[0], q[1], 1.6, 3.8, (k === 1 && wx < -10 && wx > -40) ? 0xFFC070 : false); });
}
var slab = [[x0, x1, zN, -46], [x0, -2, -46, -58], [2, x1, -46, -58], [x0, x1, -58, zS]];
slab.forEach(function (r) { var w = r[1] - r[0], d = r[2] - r[3]; drwBox(G, w, 0.5, d, oak, (r[0] + r[1]) / 2, F1 - 0.5, (r[2] + r[3]) / 2); drwFloor((r[0] + r[1]) / 2, (r[2] + r[3]) / 2, w, d, F1); });
drwBox(G, x1 - x0, 0.12, zN - zS, flag, 0, 0.02, (zN + zS) / 2);
drwFloor(0, (zN + zS) / 2, x1 - x0 - 1.4, zN - zS - 1.4, 0.06);
var W1 = function (a, b, c, d) { drkWall(G, a, b, c, d, F1 - 0.5, 0.5, plaster, 0); };
W1(-15, -20, -15, -30);
W1(-15, -34, -15, -44);
W1(15, -20, 15, -30);
W1(15, -34, 15, -44);
W1(x0, -44, -3, -44);
W1(3, -44, x1, -44);
var W2 = function (a, b, c, d) { drkWall(G, a, b, c, d, F2 - F1 - 0.4, 0.5, plaster, F1); };
W2(-15, -44, -15, -54);
W2(-15, -58, -15, -70);
W2(15, -44, 15, -54);
W2(15, -58, 15, -70);
W2(x0, -60, -36, -60);
W2(-28, -60, -15, -60);
W2(-15, -44, -3, -44);
W2(3, -44, 15, -44);
W2(x0, -44, -15, -44);
W2(15, -44, x1, -44);
drkLanding(G, 0, -60, 6, 4, F1, { mat: oak, open: {} });
[[-2.2, -52, 0.22, 12], [2.2, -52, 0.22, 12]].forEach(function (q) { var S = drwSolid(q[0], q[1], q[2], q[3], F1 - 1, F1 + 2.2, 0); S.rail = 1; for (var t = -6; t <= 6; t += 1)
drwBox(G, 0.05, 0.95, 0.05, drwMat("iron"), q[0], F1, q[1] + t); drwBox(G, 0.08, 0.07, 12, oak, q[0], F1 + 0.95, q[1]); });
drkStair(G, 0, -46, 0, F1, 12, 3.6, Math.PI, { mat: ash });
(function () {
var g = new THREE.Group();
g.position.set(0, 0, -32);
G.add(g);
drwBox(g, 4.4, 3.6, 1.2, st, 0, 0, -11.3);
drwBox(g, 5, 0.4, 1.6, st, 0, 3.6, -11.2);
drwFire(g, 0, 0, -10.4, 1.2);
drwRug(g, 0, 0, 9, 7, 0x5A1A1A);
drwChair(g, -2, -7, 0.3, drwMat("velvet"), true);
drwChair(g, 2, -7, -0.3, drwMat("velvet"), true);
drwTable(g, 0, -4, 2, 1, 0.78, oak);
drwBox(g, 30, 0.3, 24, oak, 0, F1 - 0.3, 0);
for (var bm = -10; bm <= 10; bm += 4)
drwBox(g, 30, 0.5, 0.5, drwS("b:oak", 0x2A1A10, 1.2), 0, F1 - 0.8, bm);
var tap = [0x5A2A2A, 0x2A3A4A, 0x3A4A2A, 0x5A4A2A];
[-8, 0, 8].forEach(function (z, i) { [-14.7, 14.7].forEach(function (x, j) { var t = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 3.6), drwS("b:damask", tap[(i + j) % 4], 1.4)); t.position.set(x, 3.6, z); t.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2; g.add(t); drwBox(g, 0.1, 0.1, 4.6, drwMat("iron"), x + (x < 0 ? 0.1 : -0.1), 5.5, z); }); });
[-6, -2, 2, 6].forEach(function (x, i) { var b = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 3.2), drwS("b:velvet", i % 2 ? 0x6A1A1A : 0x1A1A1A, 1)); b.position.set(x, F1 - 2.6, -11.6); g.add(b); });
[[-13, -9, Math.PI / 2], [-13, 9, Math.PI / 2], [13, -9, -Math.PI / 2], [13, 9, -Math.PI / 2]].forEach(function (q) {
var a = new THREE.Group();
a.position.set(q[0], 0, q[1]);
a.rotation.y = q[2];
g.add(a);
var mt = drwShine(0x8A8A90, 0.4, 0.8);
drwBox(a, 0.9, 0.3, 0.6, drwMat("granite"), 0, 0, 0);
drwBox(a, 0.18, 0.9, 0.2, mt, -0.14, 0.3, 0);
drwBox(a, 0.18, 0.9, 0.2, mt, 0.14, 0.3, 0);
drwBox(a, 0.56, 0.7, 0.34, mt, 0, 1.2, 0);
var hm = new THREE.Mesh(drwGeo("helm", function () { return new THREE.SphereGeometry(0.17, 10, 8); }), mt);
hm.position.set(0, 2.08, 0);
a.add(hm);
drwBox(a, 0.04, 2.4, 0.04, drwMat("iron"), 0.42, 0, 0.1);
drwSolid(g.position.x + q[0], g.position.z + q[1], 1, 1, -1, 2.4, 0);
});
[[-9, -8], [9, -8], [-9, 6], [9, 6]].forEach(function (q) { drwBox(g, 0.08, 1.8, 0.08, drwMat("iron"), q[0], 0, q[1]); for (var c = -1; c <= 1; c++) {
var cf = new THREE.Mesh(drwGeo("cflame", function () { return new THREE.ConeGeometry(0.03, 0.09, 6); }), drwGlowM(0xFFC060, 0.9));
cf.position.set(q[0] + c * 0.22, 1.98, q[1]);
g.add(cf);
} drwBox(g, 0.5, 0.04, 0.08, drwMat("iron"), q[0], 1.8, q[1]); });
drwTable(g, -8, 4, 5, 1.2, 0.78, oak);
drwChest(g, 8, 8, 0);
drwChest(g, -11, 10, Math.PI / 2);
for (var bn = -1; bn <= 1; bn += 2)
drwBox(g, 5, 0.45, 0.4, oak, -8, 0, 4 + bn * 1.1);
})();
drwRoom("castle", -15, 15, -44, -20, "hall");
drwRoom("castle", 15, 50, -44, -20, "hall");
drwRoom("castle", -50, -15, -44, -20, "hall");
drwRoom("castle", -50, 50, -70, -44, "hall");
(function () {
var g = new THREE.Group();
g.position.set(32, 0, -32);
G.add(g);
drwTable(g, 0, 0, 6, 1.6, 0.8, oak, 0xF4EEE2);
for (var i = -1; i <= 1; i++) {
drwChair(g, i * 1.8, 1.2, Math.PI, oak);
drwChair(g, i * 1.8, -1.2, 0, oak);
}
for (i = 0; i < 5; i++) {
var c = new THREE.Mesh(drwGeo("goblet", function () { return new THREE.CylinderGeometry(0.06, 0.03, 0.18, 10); }), drwShine(0xE8C060, 0.5, 0.7));
c.position.set(-2.4 + i * 1.2, 0.98, 0);
g.add(c);
}
drwBox(g, 4, 3.4, 1, st, 0, 0, -11);
drwFire(g, 0, 0, -10.2, 1.0);
drwShelves(g, 16.6, -2, 5, 3, -Math.PI / 2);
})();
(function () {
var g = new THREE.Group();
g.position.set(-32, 0, -32);
G.add(g);
[-10, -5, 0, 5, 10].forEach(function (z) { drwShelves(g, -16.6, z, 4.6, 4.2, Math.PI / 2); });
drwShelves(g, 0, -11.4, 14, 4.2, 0);
drwTable(g, 0, 0, 3.2, 1.6, 0.78, oak, 0x2A4A2A);
drwChair(g, -1, 1.3, Math.PI, drwMat("leather"), true);
drwChair(g, 1, 1.3, Math.PI, drwMat("leather"), true);
for (var i = 0; i < 6; i++) {
drwBox(g, 0.32, 0.04, 0.24, drwLam([0xC8B898, 0xE8E0D0, 0x8A6A4A][i % 3]), -1.2 + i * 0.5, 0.8, (i % 2) * 0.3 - 0.15);
}
drwGlobe(g, 4, -4, 1.2);
})();
(function () {
var g = new THREE.Group();
g.position.set(-32, F1, -52);
G.add(g);
drwBed(g, -12, -4, Math.PI / 2, 0x4A2A3A);
drwTable(g, 6, -5, 1.6, 0.9, 0.78, oak);
drwChair(g, 6, -4, Math.PI, oak);
drwChest(g, -12, 4, Math.PI / 2);
drwRug(g, 0, 0, 7, 5, 0x3A2A4A);
var paper = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.4), drwLam(0xF4F0E4));
paper.rotation.x = -Math.PI / 2;
paper.position.set(6, 0.81, -5);
g.add(paper);
})();
drwRoom("castle", -50, -15, -60, -44, "hall");
(function () { var g = new THREE.Group(); g.position.set(-32, F1, -65); G.add(g); drwBed(g, -10, 1, Math.PI / 2, 0xC8B8C8); drwChair(g, 4, -2, 0.4, drwMat("velvet")); drwChair(g, -2, -3, -0.6, drwMat("velvet")); drwRug(g, 0, 0, 9, 5, 0x6A5A7A); drwTable(g, 8, 2, 1.4, 0.8, 0.7, oak); })();
(function () {
var g = new THREE.Group();
g.position.set(32, F1, -57);
G.add(g);
drwChest(g, 8, 8, 0);
drwChest(g, 6, 8, 0.4);
drwShelves(g, -16.6, 0, 4, 3, Math.PI / 2);
drwTable(g, 0, 0, 2, 1, 0.78, oak);
for (var i = 0; i < (drwLite() ? 40 : 120); i++) {
var a = drwHash(i, 7) * 6.283, r = Math.sqrt(drwHash(i, 8)) * 1.6;
var c = new THREE.Mesh(drwGeo("coin", function () { return new THREE.CylinderGeometry(0.06, 0.06, 0.015, 10); }), drwShine(0xE8C050, 0.5, 0.8));
c.position.set(10 + Math.cos(a) * r, (1.6 - r) * 0.5 * drwHash(i, 9), 9 + Math.sin(a) * r);
c.rotation.set(drwHash(i, 10) * 2, 0, drwHash(i, 11) * 2);
g.add(c);
}
})();
drwRoom("castle", 15, 50, -70, -44, "hall");
(function () { var y = F1 - 0.3; drwBox(G, 96, 0.3, 1.3, st, 0, y, -71.6); drwFloor(0, -71.6, 96, 1.3, F1); var S = drwSolid(0, -72.5, 96, 0.4, F1 - 1, F1 + 2.4, 0); S.rail = 1; for (var x = -47; x <= 47; x += 2.4)
drwBox(G, 0.12, 0.9, 0.12, st, x, F1, -72.3); drwBox(G, 96, 0.12, 0.16, st, 0, F1 + 0.9, -72.3); })();
},
function (G, st) {
var x = 66, z = 10, g = new THREE.Group();
g.position.set(x, 0, z);
G.add(g);
drkWall(G, x - 9, z - 16, x + 9, z - 16, 9, 1.2, st, 0);
drkWall(G, x - 9, z + 16, x - 2, z + 16, 9, 1.2, st, 0);
drkWall(G, x + 2, z + 16, x + 9, z + 16, 9, 1.2, st, 0);
drkWall(G, x - 9, z - 16, x - 9, z + 16, 7, 1.2, st, 0);
drkWall(G, x + 9, z - 16, x + 9, z + 16, 5, 1.2, st, 0);
for (var i = 0; i < 4; i++) {
drkGothWin(G, x - 9.62, 2.6, z - 12 + i * 8, -Math.PI / 2, 1.4, 4, false);
}
drkGothWin(G, x, 3, z - 15.38, 0, 3, 5.4, false);
for (i = 0; i < 6; i++) {
var R = wRand(70 + i);
drwBox(g, 0.6 + R() * 0.8, 0.3 + R() * 0.4, 0.5 + R() * 0.6, st, -6 + R() * 12, 0, -12 + R() * 24);
}
for (i = 0; i < 4; i++) {
drwBox(g, 4, 0.5, 0.6, drwS("b:oak", 0x3A2A1A, 1.2), -3, 0, 4 - i * 2.5);
drwBox(g, 4, 0.5, 0.6, drwS("b:oak", 0x3A2A1A, 1.2), 3.5, 0, 4 - i * 2.5);
}
drwBox(g, 3.2, 0.1, 5, drwLam(0x0A0A0C), 0, 0.03, -10);
[-1, 1].forEach(function (s) { for (var t = 0; t <= 5; t += 1)
drwBox(g, 0.05, 0.95, 0.05, drwMat("iron"), s * 1.7, 0, -12.5 + t); drwBox(g, 0.08, 0.07, 5, drwS("b:oak", 0x4A2E1A, 1.2), s * 1.7, 0.95, -10); var S = drwSolid(x + s * 1.7, z - 10, 0.22, 5, -1, 2.2, 0); S.rail = 1; });
drwSpot(x, z - 7.2, 1.8, "The stair down to the vault", "go down", function () { (DRW.back || (DRW.back = {})).castle0 = { x: x, z: z - 5.5, ry: 0 }; DRW.lastBack = { sc: "castle", x: x, z: z - 5.5, ry: 0 }; drwGo({ sc: "castle", x: DRW_AT.cvault.x, z: DRW_AT.cvault.z + 3, y: DRW_IN_Y, ry: 0 }, "🕯️ <b>The vault under the chapel.</b>", typeof drbPopulate === "function" ? drbPopulate : null); }, 0);
drwRoom("castle", x - 9, x + 9, z - 16, z + 16, "night");
},
function (G) {
var st = drwMat("greystone");
drwRoomBuild(G, "castle", 0, 22, 26, 4.6, { wall: st, floor: drwMat("earth"), ceil: st, out: { x: 66, z: 4.5, ry: 0 }, doorName: "The stair, up to the chapel", env: "crypt" });
(function () {
var A = drwInAt("castle", 0), g = new THREE.Group();
g.position.set(A.x, DRW_IN_Y, A.z);
G.add(g);
var at = { x: A.x, z: A.z, y: DRW_IN_Y };
drkStair(g, 0, 12.8, 0, 0.01, 0.2, 2.4, Math.PI, { mat: st, at: at });
for (var k = 0; k < 4; k++) {
var ax = -8 + k * 5.3;
[-1, 1].forEach(function (s) { drwBox(g, 0.8, 4.6, 0.8, st, ax, 0, s * 5); drwSolid(A.x + ax, A.z + s * 5, 0.8, 0.8, DRW_IN_Y - 1, DRW_IN_Y + 5, 0); });
}
var n = 0;
for (var r = 0; r < 5; r++)
for (var c = 0; c < (drwLite() ? 6 : 10); c++) {
var bx = -9.5 + c * 2.1, bz = -11 + r * 2.6;
if (Math.abs(bx) < 2.2 && bz > -4)
continue;
if (n >= 50)
break;
n++;
drkEarthBox(g, bx, bz, 0, { y: 0, solid: false });
}
drwSolid(A.x, A.z - 6, 20, 9, DRW_IN_Y - 1, DRW_IN_Y + 0.9, 0);
drkTomb(g, 6, -8 + 16, Math.PI, "DRACULA", { y: 0, solid: false, mat: drwMat("marble"), bg: "#E0DCD2" });
drwSolid(A.x + 6, A.z + 8, 1.6, 2.8, DRW_IN_Y - 1, DRW_IN_Y + 1.5, 0);
[-8, -4.5].forEach(function (tx, i) { drkTomb(g, tx, 8, Math.PI, null, { y: 0, solid: false }); drwSolid(A.x + tx, A.z + 8, 1.6, 2.8, DRW_IN_Y - 1, DRW_IN_Y + 1.5, 0); });
drkTomb(g, 9.5, 4, Math.PI / 2, null, { y: 0, solid: false });
drwSolid(A.x + 9.5, A.z + 4, 2.8, 1.6, DRW_IN_Y - 1, DRW_IN_Y + 1.5, 0);
for (var c2 = 0; c2 < 6; c2++) {
var cd = new THREE.Mesh(drwGeo("cand", function () { return new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6); }), drwLam(0xF0E8D0));
cd.position.set(-9 + c2 * 3.6, 0.15, 11.5);
g.add(cd);
var fl = new THREE.Mesh(drwGeo("candf", function () { return new THREE.ConeGeometry(0.03, 0.09, 6); }), drwGlowM(0xFFC060, 0.95));
fl.position.set(-9 + c2 * 3.6, 0.36, 11.5);
g.add(fl);
}
})();
drwRoomBuild(G, "castle", 4, 34, 34, 5.4, { wall: st, floor: drwMat("earth"), ceil: st, out: { x: drwInAt("castle", 0).x - 8, z: drwInAt("castle", 0).z + 10, ry: 0 }, doorName: "The stair, up to the vault", env: "crypt" });
(function () {
var A = drwInAt("castle", 4), g = new THREE.Group();
g.position.set(A.x, DRW_IN_Y, A.z);
G.add(g);
var R = wRand(1476);
for (var i = 0; i < 5; i++)
for (var j = 0; j < 5; j++) {
if (i === 2 && j >= 3)
continue;
var px = -12 + i * 6, pz = -12 + j * 6;
drwBox(g, 1.1, 5.4, 1.1, st, px, 0, pz);
drwSolid(A.x + px, A.z + pz, 1.1, 1.1, DRW_IN_Y - 1, DRW_IN_Y + 6);
}
for (var k = 0; k < 14; k++) {
var side = k % 4, t = -14 + (k >> 2) * 8 + ((k % 2) * 3);
var nx = side === 0 ? -16.2 : side === 1 ? 16.2 : t, nz = side === 2 ? -16.2 : side === 3 ? -16.2 : t;
if (side >= 2)
nx = -14 + (k >> 2) * 9 + (side === 3 ? 4 : 0);
drkCoffin(g, nx, nz, side < 2 ? 0 : Math.PI / 2, { y: 0.9 * ((k % 3) === 0 ? 1 : 0) });
}
for (var c = 0; c < 10; c++) {
var cx = -14 + R() * 28, cz = -14 + R() * 24, cd = new THREE.Mesh(drwGeo("cand", function () { return new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6); }), drwLam(0xF0E8D0));
cd.position.set(cx, 0.15, cz);
g.add(cd);
var fl = new THREE.Mesh(drwGeo("candf", function () { return new THREE.ConeGeometry(0.03, 0.09, 6); }), drwGlowM(0xFFC060, 0.9));
fl.position.set(cx, 0.34, cz);
g.add(fl);
}
var gr = new THREE.Mesh(new THREE.PlaneGeometry(3, 2), drwGlowM(0xA8B8E0, 0.5));
gr.rotation.x = Math.PI / 2;
gr.position.set(0, 5.3, -12);
g.add(gr);
var sh = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 2.2, 5.3, 10, 1, true), drwGlowM(0xA8B8E0, 0.08));
sh.position.set(0, 2.65, -12);
g.add(sh);
for (var b = 0; b < 16; b++) {
var bn = new THREE.Mesh(drwGeo("bone", function () { return new THREE.CylinderGeometry(0.03, 0.03, 0.5, 5); }), drwLam(0xE8E0CC));
bn.rotation.set(Math.PI / 2, R() * 3, 0);
bn.position.set(-14 + R() * 28, 0.03, -14 + R() * 28);
g.add(bn);
}
drwSpot(A.x, A.z + 14, 2, "The heart of the crypts", "stand and fight", function () { if (DRK_FIGHT.on)
return; drkDungeon(); }, DRW_IN_Y);
})();
(function () { var V = drwInAt("castle", 0); drwSpot(V.x - 8, V.z + 10, 1.8, "The stair down into the crypts", "go down", function () { var S = drbS(); if (!(S.done || S.ch >= 4 || (S.ch === 3 && S.s >= 1))) {
setStatus("🕯️ A narrow stair goes down into the dark. Not yet: you have not the light, nor the courage, yet.");
return;
} drkDungeon(); }, DRW_IN_Y); })();
(function () { var A = DRW_AT.croadlow; drwSpot(A.x, A.z + 6, 3, "The road under the castle, at sunset", "fight the last battle", function () { if (DRK_FIGHT.on)
return; if (!drbS().done) {
setStatus("🌄 The road winds down the mountain. The last battle is fought here, at the end of the book.");
return;
} drkLastBattle(); }); })();
drwRoomBuild(G, "castle", 2, 14, 10, 4, { wall: st, floor: drwMat("earth"), out: { x: -48.4, z: 30, ry: Math.PI / 2 }, doorName: "The door, out to the courtyard", env: "crypt" });
(function () { var A = drwInAt("castle", 2), g = new THREE.Group(); g.position.set(A.x, DRW_IN_Y, A.z); G.add(g); for (var i = 0; i < 4; i++) {
drwBox(g, 0.2, 1.6, 3, drwS("b:planks", 0x5A4430, 1.2), -6 + i * 3.4, 0, -3);
drwBox(g, 2.6, 0.5, 0.8, drwLam(0xC8B068), -4.4 + i * 3.4, 0, -4);
} drwBox(g, 10, 0.2, 0.2, drwMat("oak"), 0, 2.4, -4.6); })();
},
function (x, z) { var best = 1e9, by = 0; for (var i = 0; i < DRW_WSTEPS.length - 1; i++) {
var a = DRW_WSTEPS[i], b = DRW_WSTEPS[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz, t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L2)), px = a[0] + dx * t, pz = a[1] + dz * t, d = Math.hypot(x - px, z - pz);
if (d < best) {
best = d;
by = a[2] + (b[2] - a[2]) * t;
}
} return { d: best, y: by }; },
function (x, z) {
var rx = drwWhRX(z), rw = drwWhRW(z), dr = Math.abs(x - rx) - rw, n = drwFbm(x * 0.02 + 5, z * 0.02, 3);
if (dr < 0)
return -3.5 + dr * 0.02;
var h = 3 + n * 0.6 + Math.min(dr, 6) * 0.05;
if (x < rx) {
var cl = 36 * drwSmooth(34, 110, dr) * drwSmooth(260, 120, z);
h += cl + drwFbm(x * 0.01, z * 0.01, 2) * 3 * drwSmooth(60, 110, dr);
}
else {
var ce = 52 * drwSmooth(68, 104, dr) * drwSmooth(150, 60, z);
h += ce + drwFbm(x * 0.012, z * 0.012, 2) * 2.5 * drwSmooth(80, 110, dr);
}
if (z < -250) {
var sea = drwSmooth(-250, -330, z);
if (x > rx && dr < 80) {
h = h * (1 - sea) + (-2.6) * sea;
h = Math.min(h, 3 - (-250 - z) * 0.07);
}
else
h = h * (1 - sea) + (-6) * sea;
}
if (x > 60 && x < 170 && z < -40 && z > -160) {
var S = drwWhStair(x, z);
if (S.d < 6) {
var k = drwSmooth(6, 3.2, S.d);
h = h * (1 - k) + Math.min(h, S.y - 0.25) * k;
}
}
return h;
},
function (G) {
var lite = drwLite(), H = drwWhitbyH, R = wRand(1890);
drwTerrain(G, -780, -620, 1560, 1240, lite ? 12 : 6, H, drwMat("grass"), function (x, z, y, c) {
var n = drwFbm(x * 0.03, z * 0.03, 3), rx = drwWhRX(z), dr = Math.abs(x - rx) - drwWhRW(z), g = Math.max(Math.abs(H(x + 2, z) - y), Math.abs(H(x, z + 2) - y)) / 2, rock = drwSmooth(0.5, 1.1, g), sand = y < 2.2 ? 1 : 0, town = dr < 70 && y < 6 ? 1 : 0;
var r = 0.23 + n * 0.09, gg = 0.28 + n * 0.08, b = 0.16 + n * 0.05;
if (rock) {
r = r * (1 - rock) + 0.42 * rock;
gg = gg * (1 - rock) + 0.38 * rock;
b = b * (1 - rock) + 0.32 * rock;
}
if (sand) {
r = 0.72;
gg = 0.64;
b = 0.48;
}
if (town && !sand) {
r = 0.36;
gg = 0.34;
b = 0.30;
}
c.setRGB(r, gg, b);
});
drwWater(G, 0, -120, 1600, 1300, 0.4, 0x3A5A6A, 0.9);
var qm = drwMat("greystone");
for (var z = 200; z > -300; z -= 20) {
var rx = drwWhRX(z + 10), rw = drwWhRW(z + 10);
[-1, 1].forEach(function (s) { var x = rx + s * (rw + 0.6); if (s > 0 && z < -250)
return; drwBox(G, 1.2, 6.2, 20.4, qm, x, -3, z + 10); });
}
function pier(x0, z0, x1, z1) {
var L = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0), cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
var m = drwBox(G, 7, 5.2, L, drwMat("ashlar"), cx, -2, cz, a);
drwFloor(cx, cz, 7, L, 3.2, { rot: -a });
drwBox(G, 0.6, 1.1, L, drwMat("ashlar"), cx + Math.cos(a) * 3.3, 3.2, cz - Math.sin(a) * 3.3, a);
drwSolid(cx + Math.cos(a) * 3.3, cz - Math.sin(a) * 3.3, 0.6, L, 2, 5, -a);
drwSolid(cx - Math.cos(a) * 3.8, cz + Math.sin(a) * 3.8, 0.6, L, -5, 9, -a);
}
pier(-36, -240, -42, -410);
pier(46, -300, 50, -380);
[[-42, -412, 22], [50, -382, 14]].forEach(function (q) { var t = drkTower(G, q[0], q[1], 2.6, q[2], { y: 3.2, mat: drwMat("ashlar"), flat: 1, solid: true }); var lamp = new THREE.Mesh(drwGeo("lhl", function () { return new THREE.CylinderGeometry(1.4, 1.4, 2.2, 12); }), drwGlowM(0xFFE8A8, 0.8)); lamp.position.set(q[0], 3.2 + q[2] + 1.4, q[1]); G.add(lamp); drwCyl(G, 0.2, 1.6, 1.2, drwMat("iron"), q[0], 3.2 + q[2] + 2.5, q[1], 12); });
(function () {
var z = -40, rx = drwWhRX(z), rw = drwWhRW(z), L = rw * 2 + 4;
drwBox(G, L, 0.5, 7, drwMat("planks"), rx, 2.9, z);
drwFloor(rx, z, L, 7, 3.4);
[-1, 1].forEach(function (s) { for (var t = -L / 2; t <= L / 2; t += 1.4)
drwBox(G, 0.08, 1.0, 0.08, drwMat("iron"), rx + t, 3.4, z + s * 3.4); drwBox(G, L, 0.08, 0.08, drwMat("iron"), rx, 4.4, z + s * 3.4); drwSolid(rx, z + s * 3.6, L, 0.3, 0, 8); });
[-0.5, 0, 0.5].forEach(function (f) { drwBox(G, 3, 6.4, 4, drwMat("greystone"), rx + f * L * 0.8, -3.5, z); });
})();
var cols = [0xE8DCC8, 0xD8C8B0, 0xC8B8A0, 0xE0D0B8, 0xD0BCA0], k = 0, Hn = 0;
for (var zz = 160; zz > -230; zz -= 14) {
if (Math.abs(zz + 56) < 9 || Math.abs(zz + 40) < 6)
continue;
var rx2 = drwWhRX(zz), rw2 = drwWhRW(zz), bx = rx2 + rw2 + 8;
drkHouse(G, bx, zz, 9, 11, 7 + (Hn % 3) * 1.5, { ry: Math.PI / 2, col: cols[Hn % 5], roof: drwMat("terracotta"), rh: 3.6, across: 1, chim: Hn % 2, sc: "whitby", room: Hn % 3 === 0 ? 2 + (Hn / 3 | 0) % 4 : null, name: ["The door of a fisherman's house", "The door of a jet-worker's shop", "The door of a sailor's widow", "The door of a chandler's"][(Hn / 3 | 0) % 4], kind: ["poor", "shop", "poor", "shop"][(Hn / 3 | 0) % 4], night: 1 });
Hn++;
if (zz > -200) {
drkHouse(G, bx + 22, zz - 3, 9, 10, 8 + (Hn % 3) * 1.6, { ry: -Math.PI / 2, col: cols[Hn % 5], roof: drwMat("terracotta"), rh: 3.6, across: 1, chim: 1, sc: "whitby", room: Hn % 4 === 1 ? 6 + (Hn / 4 | 0) % 3 : null, name: ["The door of the Fleece inn", "The door of a cottage", "The door of a baker's"][(Hn / 4 | 0) % 3], kind: ["shop", "home", "shop"][(Hn / 4 | 0) % 3], night: 1 });
Hn++;
}
}
(function () { var p = []; for (var z = 170; z >= -230; z -= 10)
p.push([drwWhRX(z) + drwWhRW(z) + 19, z]); drwStrip(G, p, 8, H, drwMat("paving"), 0.1); })();
for (zz = 150; zz > -200; zz -= 16) {
var rx3 = drwWhRX(zz), rw3 = drwWhRW(zz), wx = rx3 - rw3 - 8;
drkHouse(G, wx, zz, 9, 11, 9 + (Hn % 3) * 1.4, { ry: -Math.PI / 2, col: cols[(Hn + 2) % 5], roof: drwMat(Hn % 3 ? "terracotta" : "slate"), rh: 3.6, across: 1, chim: 1, night: 1 });
Hn++;
}
drwStrip(G, drwDense([[-44, 150], [-50, -60], [-60, -220]], 8), 7, H, drwMat("paving"), 0.1);
drwStrip(G, drwDense([[-60, -100], [-110, -118], [-160, -140], [-200, -150], [-300, -150]], 6), 6, H, drwMat("road"), 0.12);
(function () {
var cx = -232, cz = -40, R0 = 120;
for (var i = 0; i < 9; i++) {
var a = -0.55 + i * 0.1375, x = cx + Math.sin(a) * R0, z = cz - Math.cos(a) * R0;
var isL = i === 4;
drkHouse(G, x, z, 12, 12, 13, { ry: a + Math.PI, col: 0xE8E2D4, wall: drwS("b:ashlar", 0xE4DCCC, 2.4), roof: drwMat("slate"), rh: 3.2, across: 0, chim: 1, trim: 0xF8F4EC, doorCol: 0x1A1A22, night: 1, ownRoom: isL });
}
drwSign(G, "THE CRESCENT", 3.2, 0.5, cx - 1, H(cx, cz - R0 - 7) + 4.4, cz - R0 - 6.25, Math.PI, { bg: "#E8E2D4", ink: "#2A2A30" });
var lx = cx, lz = cz - R0 - 6.3;
drwSpot(lx, lz - 1.4, 1.8, "The door of your lodging in the Crescent", "go in", function () { DRW.lastBack = { sc: "whitby", x: lx, z: lz - 2.6, ry: 0 }; (DRW.back || (DRW.back = {})).whitby0 = DRW.lastBack; drwGo({ sc: "whitby", x: DRW_AT.wlodge.x, z: DRW_AT.wlodge.z + 2, y: DRW_IN_Y, ry: 0 }, "🏠 <b>The sitting-room.</b> Mrs Westenra's chair by the window; the bay below.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(lx, lz - 1.4));
for (var t = -0.5; t <= 0.5; t += 0.02) {
var x2 = cx + Math.sin(t) * (R0 + 18), z2 = cz - Math.cos(t) * (R0 + 18);
drwBox(G, 0.06, 1.0, 0.06, drwMat("iron"), x2, H(x2, z2), z2);
}
drwStrip(G, (function () { var p = []; for (var t = -0.55; t <= 0.55; t += 0.05)
p.push([cx + Math.sin(t) * (R0 + 10), cz - Math.cos(t) * (R0 + 10)]); return p; })(), 6, H, drwMat("paving"), 0.1);
})();
(function () { var g0 = drwRoomBuild(G, "whitby", 0, 9, 7, 3.4, { paper: drwMat("bluepaper"), floor: drwMat("floor"), out: { x: -232, z: -40 - 120 - 6.3 - 2.6, ry: 0 }, doorName: "The door, out to the Crescent", env: "indoor" }); drwWhLodge(g0, 9, 7, 3.4, drwInAt("whitby", 0)); })();
drwRoomBuild(G, "whitby", 1, 7, 6, 3.2, { paper: drwMat("damask"), floor: drwMat("floor"), out: { x: DRW_AT.wlodge.x + 3, z: DRW_AT.wlodge.z - 2, ry: 0 }, doorName: "The door, down to the sitting-room", env: "indoor" });
(function () {
var A = drwInAt("whitby", 1), g = new THREE.Group();
g.position.set(A.x, DRW_IN_Y, A.z);
G.add(g);
drwBed(g, -2, -1.6, 0, 0xF0ECE4);
drwBed(g, 1.6, -1.6, 0, 0xF0ECE4);
drwChest(g, 3, 1.2, -Math.PI / 2);
drwChair(g, -3, 1.4, Math.PI / 2, drwMat("velvet"));
drwRug(g, 0, 0, 3, 2.4, 0x5A3A4A);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.8), drwGlowM(0xA8B8D8, 0.7));
win.position.set(0, 1.6, -2.94);
g.add(win);
drwBox(g, 1.6, 0.1, 0.3, drwMat("oak"), 0, 0.75, -2.85);
drwSpot(A.x, A.z - 2.2, 1.4, "The window over the bay", "look out", function () { setStatus("🦇 Moonlight on the harbour. " + drQ("Between me and the moonlight flitted a great bat, coming and going in great whirling circles.")); }, DRW_IN_Y);
})();
(function () {
var st = drwS("b:ashlar", 0xB8B0A0, 1.6);
for (var i = 0; i < DRW_WSTEPS.length - 1; i++) {
var a = DRW_WSTEPS[i], b = DRW_WSTEPS[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]);
if (Math.abs(b[2] - a[2]) > 0.5)
drkStair(G, a[0], a[1], a[2], b[2], L, 3.2, ry, { mat: st, walls: [], solidBelow: 1, base: a[2] - 4, railMat: drwS("b:oak", 0x3A2A1A, 1.2) });
else
drkLanding(G, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 4.2, 4.2, a[2], { mat: st, under: a[2] - 4, open: { e: 1, w: 1 } });
}
drwSign(G, "CHURCH STAIRS · 199", 1.6, 0.34, 92, 4.6, -55, 2.5, { bg: "#3A3028", ink: "#E8DCC0" });
})();
(function () {
var c = drkChurch(G, 190, -150, -Math.PI / 2, { len: 30, w: 15, h: 8, th: 16, tower: 7, lit: 0xFFC878, spire: drwMat("ashlar") });
for (var i = 0; i < (lite ? 60 : 150); i++) {
var a = R() * 6.283, r = 14 + R() * 44, x = 190 + Math.cos(a) * r, z = -150 + Math.sin(a) * r * 0.8;
if (Math.abs(x - 190) < 12 && Math.abs(z + 150) < 22)
continue;
if (Math.hypot(x - 152, z + 178) < 4)
continue;
if (drwWhitbyH(x, z) < 50)
continue;
drkGrave(G, x, z, Math.PI / 2 + (R() - 0.5) * 0.3, R() < 0.12 ? "table" : R() < 0.2 ? "cross" : "stone", i);
}
var y = H(152, -178);
var g = new THREE.Group();
g.position.set(152, y, -178);
g.rotation.y = Math.PI;
G.add(g);
drwBox(g, 2.2, 0.08, 0.6, drwMat("oak"), 0, 0.45, 0);
drwBox(g, 2.2, 0.6, 0.08, drwMat("oak"), 0, 0.5, 0.3);
[-1, 1].forEach(function (s) { drwBox(g, 0.08, 0.45, 0.5, drwMat("iron"), s, 0, 0); });
drwSolid(152, -178, 2.3, 0.7, y - 1, y + 0.9);
drwSpot(152, -176.6, 1.6, "The seat", "sit down", function () { setStatus("🪑 " + drQ("This is to my mind the nicest spot in Whitby, for it lies right over the town, and has a full view of the harbour and all up the bay")); }, y);
drkGrave(G, 154.4, -176, Math.PI, "table", 77);
for (var t = 0; t < 16; t++) {
var x3 = 126 + t * 4, z3 = -186 - Math.sin(t * 0.4) * 3;
drwBox(G, 4.1, 0.8, 0.5, drwMat("greystone"), x3, H(x3, z3) - 0.2, z3);
drwSolid(x3, z3, 4.1, 0.6, H(x3, z3) - 1, H(x3, z3) + 1.2);
}
})();
(function () {
var st = drwS("b:ashlar", 0xB8A890, 2.2), x0 = 230, z0 = -118, y = H(262, -118) - 0.3, g = new THREE.Group();
g.position.set(x0, y, z0);
G.add(g);
[-1, 1].forEach(function (s) { for (var i = 0; i < 9; i++) {
var bx = i * 8;
if (i % 3 === 2 && s > 0)
continue;
drwBox(g, 1.8, 16 - ((i * 7) % 5), 1.8, st, bx, 0, s * 9);
drwBox(g, 6.2, 1.2, 1.2, st, bx + 4, 13, s * 9);
if (i < 8 && !(i === 5 && s < 0))
drwBox(g, 6.2, 1.4, 1.0, st, bx + 4, 0, s * 9);
drwSolid(x0 + bx, z0 + s * 9, 2, 2, y - 1, y + 18);
} });
[-9, -4.2, 0, 4.2, 9].forEach(function (zz, i) { var wd = i === 0 || i === 4 ? 2.4 : i === 2 ? 1.6 : 1.2; drwBox(g, 1.8, 28, wd, st, 70, 0, zz); });
drwBox(g, 1.8, 4, 20, st, 70, 0, 0);
drwBox(g, 1.8, 4, 20, st, 70, 24, 0);
[-6.6, -2.1, 2.1, 6.6].forEach(function (zz) { drkArch(g, 70, 18.5, zz, 0, i3w(zz), 5, 1.8, st); });
function i3w(zz) { return Math.abs(zz) > 5 ? 2.6 : 2.6; }
drwSolid(x0 + 70, z0, 2, 20, y - 1, y + 30);
[-1, 1].forEach(function (s2) { for (var i2 = 0; i2 < 8; i2++) {
if (i2 % 3 === 2 && s2 > 0)
continue;
drkArch(g, i2 * 8 + 4, 9.5, s2 * 9, Math.PI / 2, 6.2, 3.6, 1.6, st);
} });
drwBox(g, 22, 22, 1.8, st, 40, 0, -20);
drwBox(g, 1.8, 14, 12, st, -2, 0, 0);
drwSolid(x0 + 40, z0 - 20, 22, 2, y - 1, y + 24);
drwSolid(x0 - 2, z0, 2, 12, y - 1, y + 16);
for (i = 0; i < 8; i++)
drwBox(g, 1.4, 0.6 + R() * 1.2, 1.4, st, 10 + R() * 55, 0, (R() - 0.5) * 14);
})();
(function () { drwBox(G, 24, 4.2, 6, drwMat("ashlar"), 70, -2, -238); drwFloor(70, -238, 24, 6, 2.2); var h = drkHouse(G, 96, -232, 6, 5, 3.4, { ry: -Math.PI / 2, col: 0xE8E4DA, roof: drwMat("slate"), rh: 2.2 }); drwSign(G, "COASTGUARD", 2, 0.4, 93, H(93, -232) + 2.8, -232, -Math.PI / 2, { bg: "#1A2A4A", ink: "#F0F0F0" }); })();
(function () {
var sh = null;
try {
if (typeof prwShip === "function") {
sh = prwShip("brig", { guns: 0, shut: 1, hull: 0x2A2420, sails: 0xC8C0A8 });
if (sh.userData.flag)
sh.userData.flag.visible = false;
}
}
catch (e) {
sh = null;
}
if (!sh) {
sh = new THREE.Group();
drwBox(sh, 6, 3, 22, drwLam(0x2A2420), 0, 0, 0);
drwCyl(sh, 0.25, 0.3, 20, drwMat("oak"), 0, 3, 4, 6);
drwCyl(sh, 0.25, 0.3, 18, drwMat("oak"), 0, 3, -5, 6);
}
var g = new THREE.Group();
g.add(sh);
sh.rotation.set(0.05, 0, 0.16);
g.position.set(52, -0.9, -284);
g.rotation.y = 2.6;
G.add(g);
drwShow("demeter", g, false);
DRW.demeter = g;
var Sd = drwRound(52, -284, 6, -3, 12);
DRW.stateFns.push(function (st) { Sd.off = !g.visible; });
})();
for (var b = 0; b < (lite ? 8 : 18); b++) {
var bz = 120 - b * 20, brx = drwWhRX(bz), s2 = b % 2 ? 1 : -1, bx2 = brx + s2 * (drwWhRW(bz) - 4);
var cb = new THREE.Group();
cb.position.set(bx2, 0.45, bz);
cb.rotation.y = (R() - 0.5) * 0.4;
G.add(cb);
var hull = new THREE.Mesh(drwGeo("coble", function () { var c = new THREE.CylinderGeometry(1.1, 0.7, 6, 10, 1, false, 0, Math.PI); c.rotateZ(Math.PI / 2); c.rotateY(Math.PI / 2); c.rotateZ(Math.PI); return c; }), drwLam([0x3A6A8A, 0xB83A2A, 0x2A5A3A, 0xE8D8B0][b % 4]));
hull.rotation.x = Math.PI;
cb.add(hull);
drwBox(cb, 1.6, 0.08, 5.2, drwMat("planks"), 0, 0.05, 0);
if (b % 3 === 0)
drwCyl(cb, 0.06, 0.08, 4, drwMat("oak"), 0, 0.1 + 2, 0.8, 6);
}
for (b = 0; b < (lite ? 4 : 10); b++) {
var nx = 70 + R() * 20, nz = -120 - R() * 80;
drwBox(G, 0.12, 2.4, 0.12, drwMat("oak"), nx, H(nx, nz), nz);
drwBox(G, 0.12, 2.4, 0.12, drwMat("oak"), nx + 3, H(nx + 3, nz), nz);
var net = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.6), drwLam(0x5A5A4A, { op: 0.75, ds: 1 }));
net.position.set(nx + 1.5, H(nx, nz) + 1.4, nz);
G.add(net);
}
drwPlant(G, "rock", drwScatter(1891, lite ? 40 : 120, -760, -600, 760, 600, function (x, z) { var h = H(x, z); return h > 8 && Math.max(Math.abs(H(x + 2, z) - h), Math.abs(H(x, z + 2) - h)) > 1.2; }, H, 0.8, 2.2));
drwPlant(G, "tree", drwScatter(1892, lite ? 20 : 60, -760, -100, 760, 600, function (x, z) { return H(x, z) > 6 && Math.abs(x - (drwWhRX(z) + drwWhRW(z) + 19)) > 24; }, H, 0.6, 1.0), { col: 0x4A6A34 });
drwCrowd("whitby", lite ? 8 : 22, 40, -220, 80, 140, { dress: "drfisher", dressF: "drfishw", women: 0.45, wander: 12, sp: 0.5, beardP: 0.6, ok: function (x, z) { return !drwSolidAt(x, z, H(x, z)) && H(x, z) > 2 && H(x, z) < 6; },
names: ["A fisherman", "A fishwife with her creel", "A jet-worker", "A boy mending nets", "A sailor home from sea", "A girl with a basket of herring"], persona: "whitby",
says: ["The herring's in. You'll smell it all up Church Street.", "Jet from the cliffs, miss. Mourning jewellery, the Queen wears it.", "Mind the steps, they're slippy when the fret comes in.", "Ther's a storm brewin', mark me. The sky's gone queer.", "Up the steps is St. Mary's. Hundred an' ninety-nine of 'em, count 'em.", "Them as is buried here, half of 'em was lost at sea, and the stones lie."] });
drwCrowd("whitbyW", lite ? 4 : 12, -320, -200, -140, -80, { dress: "drgent", dressF: "drlady", women: 0.6, wander: 16, sp: 0.45, beardP: 0.3, ok: function (x, z) { return !drwSolidAt(x, z, H(x, z)) && H(x, z) > 30; }, names: ["A visitor from York", "A lady on the cliff walk", "A gentleman with a telescope"], persona: "whitby", says: ["The view from here is the finest on the coast.", "Do you see the Abbey? Quite romantic, by moonlight.", "There's a band on the pier of an evening."] });
},
function (g, W, D, H, A) {
drwRug(g, 0, 0.4, 4, 3, 0x3A4A6A);
drwTable(g, -1.6, 0.2, 1.4, 0.9, 0.76, drwMat("oak"), 0xF0ECE0);
drwChair(g, -1.6, 1.1, Math.PI, drwMat("velvet"));
drwChair(g, 1.8, -2.2, 0.3, drwMat("velvet"));
drwShelves(g, -W / 2 + 0.3, -1, 2, 2.2, Math.PI / 2);
var win = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.8), drwGlowM(0xC8D8F0, 0.8));
win.position.set(-0.5, 1.6, -D / 2 + 0.04);
g.add(win);
drkStair(g, W / 2 - 0.9, D / 2 - 1.4, 0, 3.0, 4.0, 1.2, Math.PI, { mat: drwS("b:oak", 0x6A4A2A, 1.2), walls: [0], at: { x: A.x, z: A.z, y: DRW_IN_Y } });
drkLanding(g, W / 2 - 0.9, D / 2 - 1.4 - 4.0 - 0.7, 1.2, 1.4, 3.0, { mat: drwS("b:oak", 0x6A4A2A, 1.2), under: 0, open: { w: 1 }, at: { x: A.x, z: A.z, y: DRW_IN_Y } });
drwSpot(A.x + W / 2 - 0.9, A.z + D / 2 - 1.4 - 4.0 - 0.7, 1.2, "The landing, and the bedroom", "go up", function () { drwGo({ sc: "whitby", x: DRW_AT.wbed.x, z: DRW_AT.wbed.z + 1.5, y: DRW_IN_Y, ry: 0 }, "🛏️ <b>The bedroom.</b> Two beds; the window looks over the bay to the East Cliff.", typeof drbPopulate === "function" ? drbPopulate : null); }, DRW_IN_Y + 3.0);
},
function (G) {
var lite = drwLite(), H = drwHampH, R = wRand(1893);
drwTerrain(G, -720, -720, 1440, 1440, lite ? 14 : 7, H, drwMat("grass"), function (x, z, y, c) { var n = drwFbm(x * 0.03, z * 0.03, 3), heath = drwSmooth(-60, -160, z); c.setRGB(0.21 + n * 0.1 + heath * 0.08, 0.29 + n * 0.08 - heath * 0.03, 0.15 + n * 0.05); });
var road = [[-700, 104], [-300, 100], [0, 100], [200, 30], [260, -40], [300, -200], [330, -300], [400, -420]];
drwStrip(G, drwDense(road, 8), 9, H, drwMat("road"), 0.12);
drwStrip(G, drwDense([[0, 100], [30, -60], [40, -280], [-100, -420]], 8), 7, H, drwMat("road"), 0.12);
for (var i = 0; i < road.length - 1; i++) {
var a = road[i], b = road[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var t = 0; t < L; t += 36) {
var x = a[0] + (b[0] - a[0]) * t / L + 6, z = a[1] + (b[1] - a[1]) * t / L + 5;
var y = H(x, z);
drwCyl(G, 0.08, 0.11, 3.6, drwMat("iron"), x, y, z, 6);
var lm = new THREE.Mesh(drwGeo("glamp", function () { return new THREE.BoxGeometry(0.4, 0.5, 0.4); }), drwGlowM(0xFFD890, 0.8));
lm.position.set(x, y + 3.85, z);
G.add(lm);
drwRound(x, z, 0.2, y - 1, y + 4);
}
}
var cab = drkCoach(G, 8, 108, Math.PI / 2, { horses: 1, col: 0x1A1A1A, lamps: true });
drwSpot(4, 100, 2.4, "A hansom cab", "take a cab", function () { drwCabCard(); }, H(4, 100));
(function () {
var hx = -150, hz = 30;
drkHouse(G, hx, hz, 26, 18, 11, { ry: 0, col: 0xE8E0CC, wall: drwS("b:ashlar", 0xE4DCC8, 2.4), roof: drwMat("slate"), rh: 5, chim: 1, trim: 0xF8F4EC, doorCol: 0x2A2A2E, ownRoom: 1 });
[[-170, -14, -130, -14], [-190, -14, -190, 92], [-110, -14, -110, 92], [-190, 92, -156, 92], [-144, 92, -110, 92]].forEach(function (w) { drkWall(G, w[0], w[1], w[2], w[3], 2.4, 0.6, drwMat("brick"), null, {}); });
[-156, -144].forEach(function (x) { drwBox(G, 0.9, 3.2, 0.9, drwMat("ashlar"), x, H(x, 92) - 0.3, 92); });
drwSign(G, "HILLINGHAM", 2, 0.34, -150, H(-150, 92) + 3.0, 92.5, 0, { bg: "#2A2A2A", ink: "#E8E0C8" });
drwStrip(G, [[-150, 92], [-150, 40]], 4, H, drwMat("paving"), 0.1);
drwPlant(G, "tree", drwScatter(1894, lite ? 6 : 14, -188, -12, -112, 90, function (x, z) { return Math.abs(x + 150) > 10 && !(Math.abs(x + 150) < 16 && z < 42); }, H, 0.8, 1.1), { col: 0x4A6A34 });
for (var f = 0; f < (lite ? 20 : 60); f++) {
var fx = -186 + R() * 72, fz = 50 + R() * 38;
if (Math.abs(fx + 150) < 4)
continue;
var fl = new THREE.Mesh(drwGeo("rose", function () { return new THREE.SphereGeometry(0.18, 8, 6); }), drwLam([0xC83A4A, 0xF0E8E0, 0xE8B0C0, 0xD8C040][f % 4]));
fl.position.set(fx, H(fx, fz) + 0.5, fz);
G.add(fl);
}
drwSpot(-150, 38.4, 1.8, "The door of Hillingham", "go in", function () { DRW.lastBack = { sc: "hampstead", x: -150, z: 41, ry: 0 }; drwGo({ sc: "hampstead", x: DRW_AT.hhall.x, z: DRW_AT.hhall.z + 3, y: DRW_IN_Y, ry: 0 }, "🏠 <b>Hillingham.</b> The hall: the stair, the doors to the dining-room and to Lucy's room.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(-150, 38.4));
var lw = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.0), drwGlowM(0xFFD8A0, 0.7));
lw.position.set(-140, H(-140, 39) + 1.9, 39.08);
G.add(lw);
var gar = new THREE.Group();
for (var k = 0; k < 7; k++) {
var gb = new THREE.Mesh(drwGeo("garlic", function () { return new THREE.SphereGeometry(0.1, 8, 6); }), drwLam(0xF0ECE0));
gb.position.set(-0.7 + k * 0.23, 0, 0);
gar.add(gb);
}
gar.position.set(-140, H(-140, 39) + 2.9, 39.16);
G.add(gar);
drwShow("garlic", gar, false);
})();
(function () {
var g = drwRoomBuild(G, "hampstead", 0, 12, 9, 3.8, { paper: drwMat("greenpaper"), floor: drwMat("floor"), out: { x: -150, z: 41, ry: 0 }, doorName: "The front door, out to the garden", env: "gas" }), A = drwInAt("hampstead", 0);
drwRug(g, 0, 0, 5, 3.4, 0x6A2A2A);
drwTable(g, -3, -2, 2.6, 1.2, 0.78, drwMat("oak"), 0xF4F0E4);
[-1, 1].forEach(function (s) { drwChair(g, -3 + s * 1.6, -2, s * Math.PI / 2, drwMat("velvet")); });
drwShelves(g, 0, -4.2, 4, 2.6, 0);
drwFire(g, 4.6, 0, -3.4, 0.5);
drwChair(g, 3.4, -2.6, 0.4, drwMat("velvet"));
drkStair(g, -5.0, 3.2, 0, 3.4, 4.4, 1.4, Math.PI, { mat: drwS("b:oak", 0x6A4A2A, 1.2), walls: [1], at: { x: A.x, z: A.z, y: DRW_IN_Y } });
drkLanding(g, -5.0, -1.9, 1.4, 1.4, 3.4, { mat: drwS("b:oak", 0x6A4A2A, 1.2), under: 0, open: { e: 1 }, at: { x: A.x, z: A.z, y: DRW_IN_Y } });
drwSpot(A.x + 5.4, A.z + 1, 1.4, "The door of Lucy's room", "go in", function () { drwGo({ sc: "hampstead", x: DRW_AT.hlucy.x, z: DRW_AT.hlucy.z + 2, y: DRW_IN_Y, ry: 0 }, "🛏️ <b>Lucy's room.</b>", typeof drbPopulate === "function" ? drbPopulate : null); }, DRW_IN_Y);
drwBox(g, 0.1, 2.4, 1.3, drwS("b:oak", 0x3A2414, 1.2), 5.95, 0, 1);
})();
(function () {
var g = drwRoomBuild(G, "hampstead", 1, 8, 7, 3.6, { paper: drwMat("damask"), floor: drwMat("floor"), out: { x: DRW_AT.hhall.x + 4.2, z: DRW_AT.hhall.z + 1, ry: -Math.PI / 2 }, doorName: "The door, out to the hall", env: "gas" }), A = drwInAt("hampstead", 1);
drwBed(g, -1.6, -1.8, 0, 0xF4F0EC);
drwChest(g, 2.8, -2.8, 0);
drwChair(g, 2.4, 0.4, -0.8, drwMat("velvet"));
drwTable(g, -3.2, 1.4, 0.8, 0.6, 0.74, drwMat("oak"), 0xF4F0EC);
drwRug(g, 0, 0, 3.4, 2.4, 0x7A4A5A);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.0), drwGlowM(0x8AA0C8, 0.6));
win.position.set(1.2, 1.6, -3.44);
g.add(win);
drwBox(g, 1.8, 0.1, 0.3, drwMat("oak"), 1.2, 0.7, -3.35);
var gw = new THREE.Group();
for (var k = 0; k < 9; k++) {
var gb = new THREE.Mesh(drwGeo("garlic", function () { return new THREE.SphereGeometry(0.1, 8, 6); }), drwLam(0xF0ECE0));
gb.position.set(-0.8 + k * 0.2, Math.sin(k * 0.7) * 0.15, 0);
gw.add(gb);
}
gw.position.set(1.2, 2.75, -3.3);
g.add(gw);
drwShow("garlicin", gw, false);
var shard = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.0), drwLam(0x1A1A22, { op: 0.85 }));
shard.position.set(1.2, 1.6, -3.42);
g.add(shard);
drwShow("brokenwin", shard, false);
drwSpot(A.x + 1.2, A.z - 2.4, 1.4, "The window", "look out", function () { setStatus("🌙 The garden at night; the wall, the trees, and the road beyond."); }, DRW_IN_Y);
})();
(function () {
var cx = 230, cz = -60;
drkChurch(G, cx + 40, cz - 10, Math.PI / 2, { len: 30, w: 13, h: 10, th: 24, tower: 6, lit: 0xFFC878 });
[[cx - 60, cz + 64, cx - 14, cz + 64], [cx - 6, cz + 64, cx + 80, cz + 64], [cx - 60, cz - 80, cx + 80, cz - 80], [cx - 60, cz - 80, cx - 60, cz + 64], [cx + 80, cz - 80, cx + 80, cz + 64]].forEach(function (w) { drkWall(G, w[0], w[1], w[2], w[3], 1.8, 0.6, drwMat("greystone"), null, {}); });
[-14, -6].forEach(function (dx) { drwBox(G, 0.8, 2.6, 0.8, drwMat("greystone"), cx + dx, H(cx + dx, cz + 64) - 0.3, cz + 64); });
drwStrip(G, [[cx - 10, cz + 64], [cx - 10, cz + 20], [cx + 20, cz - 10]], 3, H, drwMat("paving"), 0.1);
for (var i = 0; i < (lite ? 50 : 130); i++) {
var x = cx - 56 + R() * 132, z = cz - 76 + R() * 136;
if (Math.hypot(x - (cx + 40), z - (cz - 10)) < 22 || Math.hypot(x - 232, z + 96) < 8 || Math.abs(x - cx + 10) < 3)
continue;
drkGrave(G, x, z, (R() - 0.5) * 0.2, R() < 0.1 ? "table" : R() < 0.25 ? "cross" : "stone", i + 300);
}
drwPlant(G, "conifer", drwScatter(1896, lite ? 6 : 14, cx - 56, cz - 76, cx + 76, cz + 60, function (x, z) { return Math.hypot(x - 232, z + 96) > 9 && Math.hypot(x - (cx + 40), z - (cz - 10)) > 24; }, H, 0.7, 1.1));
var t = drkHouse(G, 232, -104, 6, 7, 4, { ry: 0, col: 0xC8C0B0, wall: drwS("b:ashlar", 0xB8B0A0, 2), roof: drwMat("slate"), rh: 1.6, doorCol: 0x2A2A2A, ownRoom: 1 });
drwSign(G, "WESTENRA", 1.6, 0.3, 232, H(232, -100) + 3.0, -100.4, 0, { bg: "#B8B0A0", ink: "#2A2420" });
drwSpot(232, -98.6, 1.6, "The door of the Westenra tomb", "go in", function () { DRW.lastBack = { sc: "hampstead", x: 232, z: -97, ry: 0 }; drwGo({ sc: "hampstead", x: DRW_AT.htomb.x, z: DRW_AT.htomb.z + 1.8, y: DRW_IN_Y, ry: 0 }, "⚰️ <b>The Westenra tomb.</b> " + drQ("rusty, dank iron, and tarnished brass, and clouded silver-plating"), typeof drbPopulate === "function" ? drbPopulate : null); }, H(232, -98.6));
})();
(function () {
var g = drwRoomBuild(G, "hampstead", 2, 6, 6, 3.0, { wall: drwS("b:ashlar", 0x8A8478, 2), floor: drwMat("greystone"), ceil: drwS("b:ashlar", 0x7A746A, 2), out: { x: 232, z: -97, ry: 0 }, doorName: "The iron door, out to the churchyard", env: "crypt", day: 0x6A7080 }), A = drwInAt("hampstead", 2);
[-2.2, 2.2].forEach(function (x, i) { drwBox(g, 1.0, 0.9, 5, drwMat("greystone"), x, 0, -0.4); drkCoffin(g, x, -0.4, 0, { y: 0.9, lead: i === 1 }); });
drkCoffin(g, 0, -2.2, Math.PI / 2, { y: 0.0 });
drwSolid(A.x - 2.2, A.z - 0.4, 1, 5, DRW_IN_Y - 1, DRW_IN_Y + 1.6);
drwSolid(A.x + 2.2, A.z - 0.4, 1, 5, DRW_IN_Y - 1, DRW_IN_Y + 1.6);
for (var c = 0; c < 3; c++) {
var cd = new THREE.Mesh(drwGeo("candle", function () { return new THREE.CylinderGeometry(0.03, 0.03, 0.25, 6); }), drwLam(0xF0E8D0));
cd.position.set(-1 + c, 1.02, -2.8);
g.add(cd);
var fl = new THREE.Mesh(drwGeo("cflame", function () { return new THREE.ConeGeometry(0.025, 0.08, 6); }), drwGlowM(0xFFC060, 0.9));
fl.position.set(-1 + c, 1.18, -2.8);
g.add(fl);
}
drwBox(g, 1.6, 0.9, 0.5, drwMat("greystone"), 0, 0, -2.8);
})();
drwPlant(G, "tree", drwScatter(1897, lite ? 60 : 180, -700, -700, 700, -80, function (x, z) { return drwPathD(x, z, [[0, 100], [30, -60], [40, -280], [-100, -420]]) > 8 && drwPathD(x, z, road) > 9 && Math.hypot(x - 40, z + 294) > 26 && Math.hypot(x - 330, z + 310) > 24; }, H, 0.8, 1.4), { col: 0x4A6A30 });
drwPlant(G, "rock", drwScatter(1898, lite ? 20 : 50, -700, -700, 700, -100, null, H, 0.6, 1.2));
[[-200, -240, 60, 40], [160, -460, 50, 30]].forEach(function (p) { var y = H(p[0], p[1]) + 0.2; drwWater(G, p[0], p[1], p[2], p[3], y, 0x4A5A50, 0.85); drwSolid(p[0], p[1], p[2] - 4, p[3] - 4, y - 5, y + 2); });
drkHouse(G, 40, -306, 20, 12, 9, { ry: Math.PI, col: 0xE8E0D0, timber: 1, roof: drwMat("slate"), rh: 4, chim: 1, night: 1, ownRoom: 1 });
drwSign(G, "JACK STRAW'S CASTLE", 4.4, 0.6, 40, H(40, -300) + 4.6, -299.9, Math.PI, { bg: "#2A3A2A", ink: "#F0E8C8" });
drwSpot(42, -298.4, 1.8, "The door of Jack Straw's Castle", "go in", function () { DRW.lastBack = { sc: "hampstead", x: 42, z: -296, ry: Math.PI }; drwGo({ sc: "hampstead", x: DRW_AT.hjack.x, z: DRW_AT.hjack.z + 3, y: DRW_IN_Y, ry: 0 }, "🍽️ <b>Jack Straw's Castle.</b> The coffee-room: a fire, tables, the Heath dark outside.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(42, -298.4));
(function () { var g = drwRoomBuild(G, "hampstead", 3, 12, 9, 3.6, { paper: drwMat("greenpaper"), floor: drwMat("planks"), out: { x: 42, z: -296, ry: Math.PI }, doorName: "The door, out to the Heath", env: "gas" }); for (var t = 0; t < 4; t++) {
var tx = -3.6 + (t % 2) * 7, tz = -2.4 + (t >> 1) * 3.6;
drwTable(g, tx, tz, 1.8, 1.0, 0.76, drwMat("oak"), 0xF0ECE0);
drwChair(g, tx - 1.1, tz, Math.PI / 2, drwMat("oak"));
drwChair(g, tx + 1.1, tz, -Math.PI / 2, drwMat("oak"));
} drwFire(g, 0, 0, -4.0, 0.6); drwShelves(g, 4.5, -4.2, 3, 2.4, 0); })();
drkHouse(G, 342, -318, 16, 10, 8, { ry: -Math.PI / 2, col: 0xE8E0D0, timber: 1, roof: drwMat("terracotta"), rh: 4, chim: 1, sc: "hampstead", room: 4, name: "The door of the Spaniards", kind: "shop", night: 1 });
drwSign(G, "THE SPANIARDS", 3, 0.5, 336.9, H(336, -318) + 4, -318, -Math.PI / 2, { bg: "#3A2A1A", ink: "#F0E0B0" });
[[-330, 60, 0], [-420, 64, 0], [-520, 62, 0], [-60, 150, Math.PI], [-200, 150, Math.PI], [-360, 150, Math.PI], [120, 150, Math.PI]].forEach(function (q, i) {
drkHouse(G, q[0], q[1], 16, 12, 9, { ry: q[2], col: [0xE8E0CC, 0xD8C8B0, 0xC8A888][i % 3], wall: i % 3 === 2 ? drwMat("brick") : null, roof: drwMat("slate"), rh: 4, chim: 1, sc: "hampstead", room: 5 + i, name: i === 0 ? "The door of the North Hospital" : ["The door of a villa", "The door of a doctor's house", "The door of a widow's house"][i % 3], kind: "home", night: 1, paper: i === 0 ? drwS("plaster", 0xF0ECE4, 3) : null,
fill: i === 0 ? function (g, rW, rD) { for (var b = 0; b < 4; b++) {
drwBed(g, -rW / 2 + 1.4 + b * (rW - 2.8) / 3, -rD / 2 + 1.4, 0, 0xF4F4F0);
} drwBox(g, 1.2, 0.8, 0.6, drwMat("oak"), rW / 2 - 1, 0, rD / 2 - 1.2); } : null });
if (i === 0)
drwSign(G, "NORTH HOSPITAL", 4, 0.5, q[0], H(q[0], q[1]) + 5.6, q[1] + 6.08, 0, { bg: "#E8E0CC", ink: "#2A2420" });
});
drwCrowd("hamp", lite ? 8 : 20, -120, -300, 200, 90, { dress: "drgent", dressF: "drlady", women: 0.6, childP: 0.3, wander: 14, sp: 0.5, beardP: 0.3, ok: function (x, z) { return !drwSolidAt(x, z, H(x, z)); },
names: ["A nursemaid", "A child on the Heath", "A gentleman walking his dog", "A policeman", "A lady with a parasol", "A boy with a kite"], persona: "london",
says: ["Have you heard? The children keep wandering off at night. Little punctures in their throats, the papers say.", "The bloofer lady! She asked me to walk with her!", "Lovely afternoon for the Heath, sir.", "Mind yourself after dark up here. Westminster Gazette says there's a 'Hampstead Horror'.", "We dine at Jack Straw's on Sundays.", "My kite's caught in the gorse."] });
},
function (G, x0, z, n, ry, o) {
o = o || {};
var ca = Math.cos(ry), sa = Math.sin(ry), out = [];
for (var i = 0; i < n; i++) {
var w = o.w || 8, x = x0 + ca * i * w, zz = z - sa * i * w, h = (o.h || 14) + ((i * 7) % 3) * 1.2, st = o.stucco && (i % 3 !== 1);
var g = drkHouse(G, x, zz, w - 0.2, o.d || 12, h, { ry: ry, col: st ? 0xE8E2D4 : 0xA86A50, wall: st ? drwS("b:stucco", 0xE8E2D4, 3) : drwMat(o.brick || "brick"), roof: drwMat("slate"), rh: 3, chim: 1, trim: 0xF4F0E8, doorCol: [0x1A1A22, 0x2A1A14, 0x1A2A1A][i % 3], night: 1, sc: o.sc, room: o.rooms && o.rooms[i] != null ? o.rooms[i] : null, name: o.names ? o.names[i % o.names.length] : null, kind: o.kind || "home", ownRoom: o.own && o.own[i] });
var fx = x + sa * ((o.d || 12) / 2 + 1.4), fz = zz + ca * ((o.d || 12) / 2 + 1.4);
for (var t = -w / 2 + 0.3; t < w / 2 - 1.6; t += 0.6)
drwBox(G, 0.04, 1.0, 0.04, drwMat("iron"), fx + ca * t, drwLand(fx, fz), fz - sa * t);
out.push({ x: x, z: zz, g: g });
}
return out;
},
function (G) {
var lite = drwLite(), H = drwLonH, R = wRand(1893);
drwTerrain(G, -960, -960, 1920, 1920, lite ? 16 : 8, H, drwMat("grass"), function (x, z, y, c) { var n = drwFbm(x * 0.03, z * 0.03, 3), town = (z > -160 && z < 120) || (z > 180 && z < 520) ? 1 : 0; if (town) {
c.setRGB(0.34 + n * 0.06, 0.32 + n * 0.06, 0.30 + n * 0.05);
}
else
c.setRGB(0.22 + n * 0.08, 0.30 + n * 0.08, 0.16 + n * 0.05); });
function cabRank(x, z, ry) { drkCoach(G, x, z, ry, { horses: 1, col: 0x1A1A1A, lamps: true }); drwSpot(x - Math.cos(ry) * 2.4, z + Math.sin(ry) * 2.4, 2.4, "A hansom cab", "take a cab", function () { drwCabCard(); }, H(x, z)); }
function lamps(pts, step) { for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var t = 0; t < L; t += step) {
var x = a[0] + (b[0] - a[0]) * t / L, z = a[1] + (b[1] - a[1]) * t / L, y = H(x, z);
drwCyl(G, 0.07, 0.1, 3.4, drwMat("iron"), x, y, z, 6);
var lm = new THREE.Mesh(drwGeo("glamp", function () { return new THREE.BoxGeometry(0.4, 0.5, 0.4); }), drwGlowM(0xFFD890, 0.8));
lm.position.set(x, y + 3.65, z);
G.add(lm);
drwRound(x, z, 0.2, y - 1, y + 4);
}
} }
drwStrip(G, [[-700, -30], [-80, -30]], 16, H, drwMat("road"), 0.1);
drwStrip(G, [[-700, -44], [-80, -44]], 5, H, drwMat("paving"), 0.12);
drwStrip(G, [[-700, -16], [-80, -16]], 4, H, drwMat("paving"), 0.12);
drwTerrace(G, -640, -60, 64, 0, { w: 8.6, d: 12, h: 15, stucco: 1, sc: "london", rooms: { 6: 6, 14: 7, 28: 8, 40: 9, 52: 10 }, own: { 47: 1 }, names: ["The door of a gentleman's house", "The door of a club", "The door of a shop"] });
for (var x = -700; x <= -90; x += 1.0)
drwBox(G, 0.04, 1.6, 0.04, drwMat("iron"), x, H(x, -12), -12);
drwSolid(-395, -12, 610, 0.3, 0, 6);
drwPlant(G, "tree", drwScatter(1900, lite ? 40 : 110, -700, -6, -90, 120, null, H, 1.0, 1.5), { col: 0x4A6A30 });
lamps([[-700, -24], [-90, -24]], 30);
lamps([[-700, -40], [-90, -40]], 30);
(function () {
var x = -238, z = -60;
drwSign(G, "347", 0.7, 0.3, x + 1.4, H(x, z) + 3.0, z + 6.3, 0, { bg: "#1A1A22", ink: "#E8D8A8" });
for (var w = 0; w < 3; w++)
drwBox(G, 1.5, 1.4, 0.08, drwLam(0x6A6458), x - 2.4 + w * 2.4, H(x, z) + 5.6, z + 6.12);
drwSpot(x, z + 7.6, 1.7, "The door of No. 347 Piccadilly", "go in", function () { DRW.lastBack = { sc: "london", x: x, z: z + 9, ry: 0 }; drwGo({ sc: "london", x: DRW_AT.lsitting.x, z: DRW_AT.lsitting.z + 3, y: DRW_IN_Y, ry: 0 }, "🚪 <b>No. 347 Piccadilly.</b> Dust everywhere; the shutters closed; a smell of earth.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(x, z + 7.6));
})();
(function () {
var g = drwRoomBuild(G, "london", 0, 12, 9, 4.2, { paper: drwMat("damask"), floor: drwMat("floor"), out: { x: -238, z: -51, ry: 0 }, doorName: "The front door, out to Piccadilly", env: "indoor" }), A = drwInAt("london", 0);
drwTable(g, 0, -1, 3.2, 1.4, 0.78, drwMat("oak"));
for (var c = 0; c < 4; c++)
drwChair(g, -1.2 + c * 0.8, 0, Math.PI, drwMat("velvet"));
for (var b = 0; b < 8; b++) {
drkEarthBox(g, -4.6 + (b % 4) * 1.2, 2.4 + (b >> 2) * 2.4, 0, { y: 0, shut: 1, solid: false });
}
drwSolid(A.x - 2.8, A.z + 3.6, 5, 5, DRW_IN_Y - 1, DRW_IN_Y + 0.9);
var deeds = drwBox(g, 0.5, 0.12, 0.36, drwLam(0xD8C8A0), -0.6, 0.8, -1.2);
drwBox(g, 0.3, 0.06, 0.2, drwLam(0x3A2A1A), 0.6, 0.8, -1.1);
var win = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.8), drwLam(0x5A5448));
win.position.set(3, 1.8, -4.44);
g.add(win);
drwShow("p347win", win, true);
drwShelves(g, -5.6, -2, 2.6, 2.6, Math.PI / 2);
})();
drkHouse(G, -420, -72, 26, 14, 20, { ry: 0, col: 0xE8E2D4, wall: drwS("b:ashlar", 0xE0D8C8, 2.4), roof: drwMat("slate"), rh: 3, chim: 1, night: 1, ownRoom: 1 });
drwSign(G, "BERKELEY HOTEL", 4, 0.6, -420, H(-420, -65) + 5, -64.9, 0, { bg: "#2A2A3A", ink: "#E8D8A8" });
drwSpot(-420, -63.4, 1.8, "The door of the Berkeley Hotel", "go in", function () { DRW.lastBack = { sc: "london", x: -420, z: -61, ry: 0 }; drwGo({ sc: "london", x: DRW_AT.lberk.x, z: DRW_AT.lberk.z + 3, y: DRW_IN_Y, ry: 0 }, "🏨 <b>The Berkeley.</b> Van Helsing's room: his black bag, books, a crucifix on the table.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(-420, -63.4));
(function () { var g = drwRoomBuild(G, "london", 1, 9, 7, 3.6, { paper: drwMat("greenpaper"), floor: drwMat("floor"), out: { x: -420, z: -61, ry: 0 }, doorName: "The door, out to Piccadilly", env: "gas" }); drwBed(g, -2.6, -1.8, 0, 0xF4F0EC); drwTable(g, 1.6, -0.6, 1.6, 0.9, 0.76, drwMat("oak"), 0xF0ECE0); drwChair(g, 1.6, 0.2, Math.PI, drwMat("velvet")); drwChest(g, 3.4, -2.6, 0); drwShelves(g, -4.2, 1.0, 2, 2.2, Math.PI / 2); drwBox(g, 0.5, 0.3, 0.25, drwLam(0x1A1A1A), 1.4, 0.78, -0.7); })();
cabRank(-300, -24, Math.PI / 2);
(function () {
var x0 = 180, z0 = -420, x1 = 460, z1 = -180;
[[x0, z1, 290, z1], [310, z1, x1, z1], [x0, z0, x1, z0], [x0, z0, x0, z1], [x1, z0, x1, z1]].forEach(function (w) { drkWall(G, w[0], w[1], w[2], w[3], 2.2, 0.5, drwMat("brick"), null, {}); });
drwSign(G, "ZOOLOGICAL GARDENS", 4, 0.6, 300, H(300, -180) + 3.4, -179.6, 0, { bg: "#2A3A2A", ink: "#F0E8C8" });
[290, 310].forEach(function (x) { drwBox(G, 1, 3.4, 1, drwMat("ashlar"), x, H(x, -180) - 0.3, -180); });
drwStrip(G, drwDense([[300, -178], [300, -240], [330, -280], [380, -320], [400, -380]], 6), 4, H, drwMat("paving"), 0.1);
drwStrip(G, [[300, -240], [250, -280], [220, -360]], 3.4, H, drwMat("paving"), 0.1);
drwPlant(G, "tree", drwScatter(1901, lite ? 20 : 60, x0 + 6, z0 + 6, x1 - 6, z1 - 6, function (x, z) { return drwPathD(x, z, [[300, -178], [300, -240], [330, -280], [380, -320]]) > 6 && Math.hypot(x - 330, z + 300) > 18 && Math.hypot(x - 262, z + 262) > 10; }, H, 0.9, 1.3), { col: 0x4A6A30 });
var wx = 330, wz = -300, y = H(wx, wz);
drwBox(G, 14, 4, 6, drwMat("ashlar"), wx, y - 0.2, wz - 8);
drwSolid(wx, wz - 8, 14, 6, y - 1, y + 4);
for (var t = -7; t <= 7; t += 0.35) {
drwBox(G, 0.05, 3.2, 0.05, drwMat("iron"), wx + t, y, wz + 4);
drwBox(G, 0.05, 3.2, 0.05, drwMat("iron"), wx - 7, y, wz - 5 + (t + 7) * 0.64);
drwBox(G, 0.05, 3.2, 0.05, drwMat("iron"), wx + 7, y, wz - 5 + (t + 7) * 0.64);
}
drwSolid(wx, wz + 4, 14.4, 0.3, y - 1, y + 4);
drwSolid(wx - 7, wz, 0.3, 10, y - 1, y + 4);
drwSolid(wx + 7, wz, 0.3, 10, y - 1, y + 4);
for (var i = 0; i < (lite ? 3 : 5); i++)
drkWolf(G, wx - 4 + i * 2, wz - 1 + (i % 2), i, { r: 2.5, sp: 0.3 });
drwSign(G, "GREY WOLVES · NORWAY", 2.2, 0.4, wx, y + 2.6, wz + 4.2, 0, { bg: "#2A2A2A", ink: "#E8E0C8" });
[[230, -330, "BEARS"], [400, -260, "LIONS"], [420, -380, "ELEPHANT HOUSE"]].forEach(function (q) { drkHouse(G, q[0], q[1], 16, 10, 6, { ry: 0, col: 0xD8C8A8, roof: drwMat("slate"), rh: 3 }); drwSign(G, q[2], 2.4, 0.4, q[0], H(q[0], q[1]) + 4.2, q[1] + 5.1, 0, { bg: "#2A3A2A", ink: "#F0E8C8" }); });
drkHouse(G, 262, -268, 8, 7, 5, { ry: Math.PI / 2, col: 0xE8E0D0, roof: drwMat("slate"), rh: 2.4, chim: 1, ownRoom: 1 });
drwSpot(266.6, -268, 1.6, "The door of the keeper's lodge", "go in", function () { DRW.lastBack = { sc: "london", x: 268, z: -268, ry: Math.PI / 2 }; drwGo({ sc: "london", x: DRW_AT.llodge.x, z: DRW_AT.llodge.z + 2, y: DRW_IN_Y, ry: 0 }, "🏠 <b>The keeper's lodge.</b> A fire, a table, Mrs Bilder's tea-things.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(266, -268));
})();
(function () { var g = drwRoomBuild(G, "london", 2, 7, 6, 3.0, { paper: drwMat("greenpaper"), floor: drwMat("planks"), out: { x: 268, z: -268, ry: Math.PI / 2 }, doorName: "The door, out to the Gardens", env: "gas" }); drwFurnish(g, 7, 6, "poor", 22); })();
cabRank(300, -168, 0);
drwWater(G, 500, 520, 900, 300, 0.4, 0x3A4A48, 0.92);
drwStrip(G, [[260, 230], [700, 230]], 10, H, drwMat("road"), 0.1);
drwStrip(G, [[470, 230], [470, 330]], 6, H, drwMat("paving"), 0.1);
drwTerrace(G, 262, 210, 24, 0, { w: 8, d: 10, h: 10, brick: "brick", sc: "london", rooms: { 3: 11, 9: 12, 17: 13 }, names: ["The door of a lodging-house", "The door of a cooper's", "The door of a carter's"], kind: "poor" });
(function () { for (var i = 0; i < 6; i++) {
var wx = 290 + i * 68;
if (Math.abs(wx - 470) < 20)
continue;
drkHouse(G, wx, 300, 40, 30, 16, { ry: 0, col: 0x8A5A40, wall: drwMat("brick"), roof: drwMat("slate"), rh: 4 });
drwSign(G, ["DOOLITTLE'S WHARF", "TOOLEY'S", "CARTER, PATERSON & CO.", "GUN WHARF", "HAY'S", "SNOWFIELDS"][i], 5, 0.7, wx, H(wx, 300) + 11, 285 + 0.1, Math.PI, { bg: "#2A2A2A", ink: "#E8E0C8" });
} })();
(function () { var x = 470, z = 262; drkHouse(G, x, z, 10, 9, 9, { ry: Math.PI, col: 0x8A6A50, wall: drwMat("brick"), roof: drwMat("slate"), rh: 3, chim: 1, ownRoom: 1 }); drwSpot(x, z - 5.8, 1.6, "The door of the house in Jamaica Lane", "go in", function () { DRW.lastBack = { sc: "london", x: x, z: z - 7, ry: Math.PI }; drwGo({ sc: "london", x: DRW_AT.lbhouse.x, z: DRW_AT.lbhouse.z + 2, y: DRW_IN_Y, ry: 0 }, "📦 <b>Jamaica Lane.</b> Bare boards, a smell of earth.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(x, z - 5.8)); })();
(function () { var g = drwRoomBuild(G, "london", 3, 8, 7, 3.0, { wall: drwMat("plaster"), floor: drwMat("planks"), out: { x: 470, z: 255, ry: Math.PI }, doorName: "The door, out to Jamaica Lane", env: "indoor" }), A = drwInAt("london", 3); for (var b = 0; b < 6; b++)
drkEarthBox(g, -2.4 + (b % 3) * 1.4, -1 + (b >> 1 & 1) * 2.6, 0, { y: 0, shut: 1, solid: false }); drwSolid(A.x, A.z + 0.3, 5, 5, DRW_IN_Y - 1, DRW_IN_Y + 0.9); })();
(function () {
for (var i = 0; i < 10; i++) {
var x = 280 + i * 44;
drwBox(G, 30, 0.4, 10, drwMat("planks"), x, 1.6, 354);
drwFloor(x, 354, 30, 10, 2.0);
for (var p = -1; p <= 1; p += 2)
drwCyl(G, 0.2, 0.2, 5, drwMat("oak"), x + p * 13, -2.6, 358, 6);
}
drwSolid(500, 360, 500, 0.4, -5, 1.6);
for (var s = 0; s < (lite ? 3 : 6); s++) {
var bg = new THREE.Group();
bg.position.set(300 + s * 70, 0.4, 392 + (s % 2) * 30);
bg.rotation.y = Math.PI / 2 + (s % 2) * 0.2;
G.add(bg);
drwBox(bg, 4, 1.4, 16, drwLam(0x2A2420), 0, -0.6, 0);
drwBox(bg, 3.4, 0.6, 12, drwLam(0x5A4A30), 0, 0.8, 0);
if (s % 2)
drwCyl(bg, 0.12, 0.15, 10, drwMat("oak"), 0, 1, 2, 6);
}
})();
cabRank(300, 236, Math.PI / 2);
drwStrip(G, [[-700, 300], [-200, 300]], 8, H, drwMat("road"), 0.1);
drwTerrace(G, -680, 326, 56, 0, { w: 6.4, d: 9, h: 9, brick: "brick", sc: "london", rooms: { 6: 14, 18: 15, 30: 16, 44: 17 }, own: { 42: 1 }, names: ["The door of a tailor's", "The door of a lodging-house", "The door of a coffee-house", "The door of a cobbler's"], kind: "poor" });
drwTerrace(G, -300, 274, 56, Math.PI, { w: 6.4, d: 9, h: 9, brick: "brick", sc: "london", rooms: { 8: 18, 22: 19, 40: 20 }, names: ["The door of a baker's", "The door of a widow's house", "The door of a chapel-keeper's"], kind: "poor" });
(function () { var x = -680 + 42 * 6.4, z = 326; drwSign(G, "197", 0.6, 0.3, x, H(x, z) + 2.9, z - 4.6, Math.PI, { bg: "#2A2A2A", ink: "#E8E0C8" }); drwSpot(x, z - 5.6, 1.6, "The door of No. 197 Chicksand Street", "go in", function () { DRW.lastBack = { sc: "london", x: x, z: z - 7, ry: Math.PI }; drwGo({ sc: "london", x: DRW_AT.lm197.x, z: DRW_AT.lm197.z + 2, y: DRW_IN_Y, ry: 0 }, "📦 <b>No. 197 Chicksand Street.</b>", typeof drbPopulate === "function" ? drbPopulate : null); }, H(x, z - 5.6)); DRW_AT.m197.x = x; DRW_AT.m197.z = z - 7; })();
(function () { var g = drwRoomBuild(G, "london", 4, 7, 6, 2.8, { wall: drwMat("plaster"), floor: drwMat("planks"), out: { x: DRW_AT.m197.x, z: DRW_AT.m197.z, ry: Math.PI }, doorName: "The door, out to Chicksand Street", env: "indoor" }), A = drwInAt("london", 4); for (var b = 0; b < 9; b++)
drkEarthBox(g, -2.2 + (b % 3) * 1.2, -1.6 + Math.floor(b / 3) * 1.0, Math.PI / 2, { y: 0, shut: 1, solid: false }); drwSolid(A.x, A.z - 0.6, 4, 4, DRW_IN_Y - 1, DRW_IN_Y + 0.9); })();
lamps([[-700, 294], [-200, 294]], 34);
cabRank(-430, 292, Math.PI / 2);
(function () {
drwStrip(G, [[500, -560], [760, -560]], 8, H, drwMat("paving"), 0.1);
drkChurch(G, 640, -660, Math.PI, { len: 60, w: 24, h: 22, th: 46, tower: 12, lit: 0xFFC878, spire: drwMat("ashlar") });
drwTerrace(G, 500, -530, 30, Math.PI, { w: 8.4, d: 10, h: 11, stucco: 1, sc: "london", rooms: { 4: 21, 12: 22, 20: 23 }, own: { 9: 1 }, names: ["The door of a canon's house", "The door of a solicitor's", "The door of a bookseller's"] });
var x = 500 - 9 * 8.4, z = -530;
DRW_AT.exeter.x = x;
DRW_AT.exeter.z = z - 8;
drwSpot(x, z - 6.4, 1.6, "The door of the Harkers' house", "go in", function () { DRW.lastBack = { sc: "london", x: x, z: z - 8, ry: Math.PI }; drwGo({ sc: "london", x: DRW_AT.lexeter.x, z: DRW_AT.lexeter.z + 2, y: DRW_IN_Y, ry: 0 }, "🏠 <b>The Harkers' house, Exeter.</b>", typeof drbPopulate === "function" ? drbPopulate : null); }, H(x, z - 6.4));
var g = drwRoomBuild(G, "london", 5, 9, 7, 3.4, { paper: drwMat("bluepaper"), floor: drwMat("floor"), out: { x: x, z: z - 8, ry: Math.PI }, doorName: "The door, out to the Close", env: "gas" });
drwFurnish(g, 9, 7, "home", 55);
drwBox(g, 0.6, 0.3, 0.4, drwLam(0x1A1A1A), 1.0, 0.78, -0.4);
drwPlant(G, "tree", drwScatter(1902, lite ? 8 : 20, 520, -640, 760, -590, null, H, 0.9, 1.3), { col: 0x4A6A30 });
cabRank(600, -548, Math.PI / 2);
})();
var ok = function (x, z) { return !drwSolidAt(x, z, H(x, z)) && H(x, z) > 0.5; };
drwCrowd("picc", lite ? 8 : 24, -680, -46, -100, -16, { dress: "drgent", dressF: "drlady", women: 0.5, wander: 18, sp: 0.6, beardP: 0.4, ok: ok, names: ["A gentleman of Piccadilly", "A lady shopping", "A newsboy", "A policeman", "A clerk"], persona: "london", says: ["Westminster Gazette! Hampstead Horror! Read all about it!", "The Season's nearly over, thank heaven.", "Move along there, if you please.", "Green Park's lovely of an evening.", "I'm late for the City."] });
drwCrowd("zoo", lite ? 6 : 16, 190, -410, 450, -190, { dress: "drgent", dressF: "drlady", women: 0.55, childP: 0.3, wander: 14, sp: 0.5, ok: ok, names: ["A visitor to the Gardens", "A child with a bun for the bears", "A keeper"], persona: "london", says: ["They say a wolf got out last night!", "Can I feed the bears, Mama?", "Bersicker came back of himself, with his head cut and full of broken glass."] });
drwCrowd("berm", lite ? 6 : 16, 262, 214, 700, 340, { dress: "drpeasant", dressF: "drfishw", women: 0.3, wander: 12, sp: 0.5, beardP: 0.6, ok: ok, names: ["A carter", "A wharfinger", "A docker", "A woman with a barrow"], persona: "london", says: ["Boxes? We carts 'undreds o' boxes a day, guv'nor.", "Ask at the office, they keeps the books.", "'Eavy as lead, them boxes was. Dead earth, I reckon.", "Fresh watercress!"] });
drwCrowd("mile", lite ? 6 : 16, -680, 294, -200, 312, { dress: "drpeasant", dressF: "drfishw", women: 0.4, childP: 0.25, wander: 12, sp: 0.5, beardP: 0.6, ok: ok, names: ["A costermonger", "A tailor's apprentice", "A mother with her baby", "A watchman"], persona: "london", says: ["Chicksand Street? You're in it.", "There was a cart here last week, two men and a lot of boxes.", "Coffee, a penny the mug.", "Mind the gutter."] });
},
function (G) {
var lite = drwLite(), H = drwPurH, R = wRand(1890);
drwTerrain(G, -640, -640, 1280, 1280, lite ? 14 : 7, H, drwMat("grass"), function (x, z, y, c) { var n = drwFbm(x * 0.03, z * 0.03, 3), w = x > 20 && x < 300 && z > -140 && z < 90 ? 1 : 0; c.setRGB(0.19 + n * 0.07 - w * 0.03, 0.24 + n * 0.07 - w * 0.03, 0.13 + n * 0.04 - w * 0.03); });
drwWater(G, 0, 520, 1300, 500, 0.4, 0x4A5A58, 0.9);
drwStrip(G, drwDense([[-640, 130], [-300, 120], [0, 120], [400, 124], [640, 130]], 8), 9, H, drwMat("road"), 0.12);
(function () {
drkHouse(G, -300, 170, 24, 8, 6, { ry: Math.PI, col: 0xC8A080, wall: drwMat("brick"), roof: drwMat("slate"), rh: 2.6, chim: 1 });
drwSign(G, "PURFLEET", 3, 0.5, -300, H(-300, 166) + 4.4, 165.9, Math.PI, { bg: "#2A2A4A", ink: "#F0F0E0" });
drwStrip(G, [[-640, 192], [640, 192]], 4, H, drwMat("road"), 0.08);
for (var x = -640; x < 640; x += 2.2)
drwBox(G, 2.4, 0.12, 0.24, drwMat("oak"), x, H(x, 192) + 0.05, 192);
[-0.7, 0.7].forEach(function (o) { drwBox(G, 1280, 0.1, 0.08, drwMat("iron"), 0, H(0, 192) + 0.18, 192 + o); });
drwSolid(0, 196, 1280, 1, -5, 8);
})();
drkCoach(G, -280, 136, Math.PI / 2, { horses: 1, col: 0x1A1A1A, lamps: true });
drwSpot(-280, 130, 2.4, "A cab from the station", "take a cab", function () { drwCabCard(); }, H(-280, 130));
(function () {
var ax = -120, az = 20;
drkHouse(G, ax, az, 60, 22, 14, { ry: 0, col: 0xD8C8A0, wall: drwMat("yellowbrick"), roof: drwMat("slate"), rh: 5, chim: 1, trim: 0xF0ECE0, doorCol: 0x2A2A2E, night: 1, ownRoom: 1 });
drwSign(G, "DR. SEWARD · ASYLUM", 3.6, 0.5, ax, H(ax, az + 11) + 3.6, az + 11.2, 0, { bg: "#2A2A2A", ink: "#E8E0C8" });
for (var i = 0; i < 8; i++)
for (var b = 0; b < 4; b++)
drwBox(G, 0.05, 1.5, 0.05, drwMat("iron"), ax + 12 + i * 2.4 - 0.3 + b * 0.2, H(ax, az) + 1.2 + ((i % 2) * 4.6), az + 11.14);
[[-200, -120, 20, -120], [-200, -120, -200, 104], [20, -120, 20, 104], [-200, 104, -128, 104], [-112, 104, 20, 104]].forEach(function (w) { drkWall(G, w[0], w[1], w[2], w[3], 3.6, 0.7, drwMat("yellowbrick"), null, {}); });
[-128, -112].forEach(function (x) { drwBox(G, 1.1, 4.4, 1.1, drwMat("ashlar"), x, H(x, 104) - 0.3, 104); });
drwStrip(G, [[-120, 104], [-120, 32]], 5, H, drwMat("paving"), 0.1);
drwStrip(G, drwDense([[-120, 60], [-60, 40], [-30, -40], [-100, -90], [-170, -40], [-120, 60]], 6), 2.6, H, drwMat("road"), 0.08);
drwPlant(G, "tree", drwScatter(1903, lite ? 10 : 26, -196, -116, 16, 100, function (x, z) { return Math.abs(x + 120) > 8 && !(Math.abs(x + 120) < 34 && Math.abs(z - 20) < 16); }, H, 0.9, 1.3), { col: 0x4A6A34 });
drwSpot(-120, 33, 1.8, "The door of the asylum", "go in", function () { DRW.lastBack = { sc: "purfleet", x: -120, z: 35, ry: 0 }; drwGo({ sc: "purfleet", x: DRW_AT.award.x, z: DRW_AT.award.z + 5, y: DRW_IN_Y, ry: 0 }, "🏛️ <b>The asylum.</b> A long corridor: the study, the wards, Renfield's room, the stairs.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(-120, 33));
})();
(function () {
var g = drwRoomBuild(G, "purfleet", 5, 6, 16, 3.6, { wall: drwS("plaster", 0xE8E4D8, 3), floor: drwMat("floor"), out: { x: -120, z: 35, ry: 0 }, doorName: "The front door, out to the grounds", env: "gas" }), A = drwInAt("purfleet", 5);
[["The door of Dr Seward's study", "astudy", "📓 <b>Dr Seward's study.</b> The phonograph on the desk, the books, the fire.", -2.9, -4], ["The door of Renfield's room", "arenfield", "🕷️ <b>Renfield's room.</b> Bare, the window barred; flies on the sill.", 2.9, -4]].forEach(function (q) { drwBox(g, 0.1, 2.4, 1.3, drwS("b:oak", 0x3A2414, 1.2), q[3] * 1.03, 0, q[4]); drwSpot(A.x + q[3] * 0.9, A.z + q[4], 1.3, q[0], "go in", function () { drwGo({ sc: "purfleet", x: DRW_AT[q[1]].x, z: DRW_AT[q[1]].z + 1.8, y: DRW_IN_Y, ry: 0 }, q[2], typeof drbPopulate === "function" ? drbPopulate : null); }, DRW_IN_Y); });
drkStair(g, 1.8, -1.0, 0, 3.4, 4.2, 1.4, Math.PI, { mat: drwS("b:oak", 0x6A4A2A, 1.2), walls: [0], at: { x: A.x, z: A.z, y: DRW_IN_Y } });
drkLanding(g, 1.8, -6.0, 1.4, 1.4, 3.4, { mat: drwS("b:oak", 0x6A4A2A, 1.2), under: 0, open: { w: 1 }, at: { x: A.x, z: A.z, y: DRW_IN_Y } });
drwSpot(A.x + 1.8, A.z - 6.0, 1.2, "The landing, and Mina's room", "go up", function () { drwGo({ sc: "purfleet", x: DRW_AT.amina.x, z: DRW_AT.amina.z + 1.8, y: DRW_IN_Y, ry: 0 }, "🛏️ <b>Mina's room.</b>", typeof drbPopulate === "function" ? drbPopulate : null); }, DRW_IN_Y + 3.4);
for (var b = 0; b < 4; b++)
drwBox(g, 0.8, 0.5, 0.4, drwLam(0x5A4A3A), -2.4, 0, 4 - b * 2.2);
})();
(function () {
var g = drwRoomBuild(G, "purfleet", 0, 9, 8, 3.6, { paper: drwMat("greenpaper"), floor: drwMat("floor"), out: { x: DRW_AT.award.x - 2, z: DRW_AT.award.z - 4, ry: Math.PI / 2 }, doorName: "The door, out to the corridor", env: "gas" });
drwTable(g, 0, -1.6, 2.2, 1.1, 0.78, drwMat("oak"), null);
drwChair(g, 0, -0.7, Math.PI, drwMat("leather"));
drwShelves(g, 0, -3.7, 6, 2.8, 0);
drwFire(g, -4.0, 0, 1.0, 0.5);
drwChair(g, -2.6, 1.4, 0.6, drwMat("leather"));
drwChair(g, 2.6, 1.4, -0.6, drwMat("leather"));
var ph = new THREE.Group();
ph.position.set(0.5, 0.8, -1.8);
g.add(ph);
drwBox(ph, 0.5, 0.25, 0.35, drwS("b:oak", 0x5A3A1E, 1.2), 0, 0, 0);
drwCyl(ph, 0.08, 0.08, 0.3, drwMat("brass"), 0, 0.3, 0, 10).rotation.z = Math.PI / 2;
var horn = new THREE.Mesh(drwGeo("phorn", function () { var c = new THREE.ConeGeometry(0.25, 0.5, 14, 1, true); c.rotateZ(Math.PI / 2); return c; }), drwMat("brass"));
horn.position.set(0.35, 0.55, 0);
ph.add(horn);
var A = drwInAt("purfleet", 0);
drwSpot(A.x + 0.5, A.z - 1.2, 1.2, "Dr Seward's phonograph", "listen", function () { setStatus("📓 The wax cylinder turns: Dr Seward's voice, clear and tired. " + drQ("Sanguine temperament; great physical strength; morbidly excitable; periods of gloom, ending in some fixed idea which I cannot make out.")); }, DRW_IN_Y);
})();
(function () {
var g = drwRoomBuild(G, "purfleet", 1, 6, 6, 3.4, { wall: drwS("plaster", 0xD8D4C8, 3), floor: drwMat("planks"), out: { x: DRW_AT.award.x + 2, z: DRW_AT.award.z - 4, ry: -Math.PI / 2 }, doorName: "The door, out to the corridor", env: "indoor" });
drwBox(g, 0.9, 0.4, 1.9, drwLam(0x6A5A4A), -1.8, 0, -1.6);
drwBox(g, 0.8, 0.1, 1.8, drwLam(0xD8D0C0), -1.8, 0.4, -1.6);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.2), drwGlowM(0xB8C8D8, 0.6));
win.position.set(1, 1.9, -2.94);
g.add(win);
for (var b = 0; b < 5; b++)
drwBox(g, 0.04, 1.2, 0.04, drwMat("iron"), 0.6 + b * 0.2, 1.3, -2.9);
for (var f = 0; f < 10; f++) {
var fl = new THREE.Mesh(drwGeo("fly", function () { return new THREE.SphereGeometry(0.02, 4, 3); }), drwLam(0x0A0A0A));
fl.position.set(0.6 + Math.random() * 0.8, 1.3 + Math.random() * 1.2, -2.86);
g.add(fl);
}
drwBox(g, 0.3, 0.3, 0.3, drwLam(0x8A7A5A), 2, 0, 2);
})();
(function () {
var g = drwRoomBuild(G, "purfleet", 2, 7, 6, 3.2, { paper: drwMat("damask"), floor: drwMat("floor"), out: { x: DRW_AT.award.x + 1.8, z: DRW_AT.award.z - 5, y: DRW_IN_Y + 3.4, ry: 0 }, doorName: "The door, down to the corridor", env: "gas" });
drwBed(g, -1.6, -1.6, 0, 0xF4F0EC);
drwChest(g, 2.4, -2.4, 0);
drwChair(g, 1.8, 0.8, -0.6, drwMat("velvet"));
drwRug(g, 0, 0, 3, 2, 0x4A5A7A);
var win = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.6), drwGlowM(0x9AB0C8, 0.6));
win.position.set(0.2, 1.6, -2.94);
g.add(win);
})();
(function () {
drkWall(G, 22, -140, 22, 110, 4.4, 0.9, drwS("b:ashlar", 0x9A9288, 2.2), null, {});
[[22, -140, 300, -140], [300, -140, 300, 110], [22, 110, 152, 110], [168, 110, 300, 110]].forEach(function (w) { drkWall(G, w[0], w[1], w[2], w[3], 4.4, 0.9, drwS("b:ashlar", 0x9A9288, 2.2), null, {}); });
[152, 168].forEach(function (x) { drwBox(G, 1.2, 5, 1.2, drwS("b:ashlar", 0x8A8278, 2), x, H(x, 110) - 0.3, 110); });
for (var t = 152.6; t < 167.6; t += 0.4)
drwBox(G, 0.05, 3.6, 0.05, drwLam(0x5A3A2A), t, H(t, 110), 110);
drwSign(G, "CARFAX", 1.6, 0.34, 160, H(160, 110) + 4.2, 110.6, 0, { bg: "#4A4038", ink: "#C8C0B0" });
var gate = drwSolid(160, 110, 15, 0.6, -5, 10);
DRW.carfaxGate = gate;
DRW.stateFns.push(function (st, V) { gate.off = !!V(st.carfaxOpen); });
drwSpot(160, 112.6, 2, "The gates of Carfax", "look through", function () { if (!gate.off)
setStatus("🏚️ " + drQ("The closed gates are of heavy old oak and iron, all eaten with rust.")); }, H(160, 112));
drkHouse(G, 150, -10, 46, 30, 15, { ry: 0, col: 0x8A8478, wall: drwS("b:ashlar", 0x8A8478, 2.2), roof: drwMat("slate"), rh: 6, chim: 1, doorCol: 0x2A1E14, ownRoom: 1 });
[[-18, -24, 12], [18, -24, 16], [-18, 8, 10]].forEach(function (q) { drkTower(G, 150 + q[0], -10 + q[1], 5, q[2] + 15, { mat: drwS("b:ashlar", 0x847E72, 2.2), flat: 1, solid: true }); });
drwSpot(150, 6.6, 1.8, "The door of Carfax", "go in", function () { DRW.lastBack = { sc: "purfleet", x: 150, z: 9, ry: 0 }; drwGo({ sc: "purfleet", x: DRW_AT.cxhall.x, z: DRW_AT.cxhall.z + 3, y: DRW_IN_Y, ry: 0 }, "🏚️ <b>Carfax.</b> Dust inches deep; cobwebs; a passage to the chapel.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(150, 6.6));
var cg = drkChurch(G, 212, -62, Math.PI, { len: 22, w: 11, h: 8, th: 14, tower: 5, mat: drwS("b:ashlar", 0x7A746A, 2) });
drwSpot(212, -46, 1.8, "The door of the old chapel", "go in", function () { DRW.lastBack = { sc: "purfleet", x: 212, z: -43, ry: 0 }; drwGo({ sc: "purfleet", x: DRW_AT.cxchap.x, z: DRW_AT.cxchap.z + 4, y: DRW_IN_Y, ry: 0 }, "⛪ <b>The chapel of Carfax.</b> " + drQ("an earthy smell, as of some dry miasma"), typeof drbPopulate === "function" ? drbPopulate : null); }, H(212, -46));
[[80, -90, 26], [250, 30, 20]].forEach(function (p) { var y = H(p[0], p[1]) - 0.2; drwWater(G, p[0], p[1], p[2], p[2] * 0.7, y, 0x1A2420, 0.92); drwSolid(p[0], p[1], p[2] - 3, p[2] * 0.7 - 3, y - 5, y + 2); });
drwPlant(G, "tree", drwScatter(1904, lite ? 16 : 46, 30, -134, 294, 104, function (x, z) { return !(x > 120 && x < 180 && z > -30 && z < 10) && Math.hypot(x - 212, z + 62) > 18; }, H, 1.0, 1.6), { col: 0x3A5028 });
drwPlant(G, "rock", drwScatter(1905, lite ? 8 : 20, 30, -134, 294, 104, null, H, 0.5, 1.0));
drwPlant(G, "fern", drwScatter(1906, lite ? 60 : 220, 30, -134, 294, 104, function (x, z) { return !(x > 136 && x < 164 && z > -2 && z < 30) && !(Math.abs(x - 160) < 6 && z > 60) && Math.hypot(x - 212, z + 50) > 12; }, H, 0.8, 1.6));
})();
(function () {
var g = drwRoomBuild(G, "purfleet", 3, 14, 10, 4.6, { wall: drwS("plaster", 0x8A8070, 3), floor: drwMat("planks"), out: { x: 150, z: 9, ry: 0 }, doorName: "The front door, out to the grounds", env: "crypt", day: 0x6A6A70 }), A = drwInAt("purfleet", 3);
drwShelves(g, -6.6, 0, 4, 3, Math.PI / 2);
drwBox(g, 2.4, 0.8, 1.2, drwMat("oak"), 3, 0, -3.8);
for (var c = 0; c < 8; c++) {
var cw = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.0), drwLam(0xD8D8D0, { op: 0.25, ds: 1 }));
cw.position.set(-6 + c * 1.7, 3.8 + (c % 2) * 0.3, -4.9);
cw.rotation.x = 0.4;
g.add(cw);
}
drwBox(g, 0.1, 2.6, 1.4, drwS("b:oak", 0x2A1E14, 1.2), 6.95, 0, -2);
drwSpot(A.x + 6.3, A.z - 2, 1.4, "The passage to the chapel", "go through", function () { drwGo({ sc: "purfleet", x: DRW_AT.cxchap.x, z: DRW_AT.cxchap.z + 4, y: DRW_IN_Y, ry: 0 }, "⛪ <b>The chapel.</b>", typeof drbPopulate === "function" ? drbPopulate : null); }, DRW_IN_Y);
drwBox(g, 0.4, 0.05, 0.2, drwLam(0xC8B888), 3, 0.82, -3.8);
})();
(function () {
var g = drwRoomBuild(G, "purfleet", 4, 11, 22, 6.0, { wall: drwS("b:ashlar", 0x6A6458, 2), floor: drwMat("greystone"), ceil: drwS("b:oak", 0x2A2018, 1), out: { x: 212, z: -43, ry: 0 }, doorName: "The door, out to the grounds", env: "crypt", day: 0x5A6070 }), A = drwInAt("purfleet", 4);
for (var b = 0; b < 29; b++) {
var bx = -4 + (b % 6) * 1.5, bz = -8 + Math.floor(b / 6) * 2.6;
drkEarthBox(g, bx, bz, (b % 3 - 1) * 0.1, { y: 0, shut: b % 5 !== 0, solid: false });
var bb = drkEarthBox;
}
var boxes = new THREE.Group();
g.add(boxes);
drwSolid(A.x + (-4 + 3.75), A.z - 3, 9, 12, DRW_IN_Y - 1, DRW_IN_Y + 0.85);
drwBox(g, 3, 1.1, 1.2, drwMat("greystone"), 0, 0, -10);
for (var w = 0; w < 3; w++)
drkGothWin(g, -5.45, 2.2, -7 + w * 6, Math.PI / 2, 1.0, 2.8, false);
for (var r = 0; r < (lite ? 3 : 8); r++) {
var rat = null;
try {
if (typeof crxBuild === "function")
rat = crxBuild("rat");
}
catch (e) { }
if (!rat) {
rat = new THREE.Group();
drwEll(rat, drwLam(0x3A3028), 0.08, 0.06, 0.16, 0, 0.06, 0, 8);
}
rat.position.set(-4 + r * 1.1, 0, 6 + (r % 2));
rat.rotation.y = r;
g.add(rat);
drwShow("rat" + r, rat, false);
}
var Ab = A;
drwSpot(Ab.x, Ab.z - 9, 1.6, "The old altar", "look", function () { setStatus("⛪ Dust, and the marks of the boxes dragged across the floor. " + drQ("here the place was small and close, and the long disuse had made the air stagnant and foul.")); }, DRW_IN_Y);
})();
(function () { drwBox(G, 6, 0.4, 40, drwMat("planks"), 0, 1.0, 300); drwFloor(0, 300, 6, 40, 1.4); for (var s = 0; s < (lite ? 2 : 5); s++) {
var bg = new THREE.Group();
bg.position.set(-400 + s * 200, 0.4, 360 + (s % 2) * 40);
bg.rotation.y = Math.PI / 2;
G.add(bg);
drwBox(bg, 5, 1.4, 20, drwLam(0x2A2420), 0, -0.6, 0);
drwCyl(bg, 0.15, 0.18, 14, drwMat("oak"), 0, 1, 2, 6);
var sail = new THREE.Mesh(new THREE.PlaneGeometry(5, 9), drwLam(0x9A4A2A, { ds: 1 }));
sail.position.set(0, 7, 0.4);
sail.rotation.y = Math.PI / 2;
bg.add(sail);
} })();
drwCrowd("asylum", lite ? 3 : 8, -190, -110, 10, 90, { dress: "drattend", women: 0.1, wander: 10, sp: 0.4, ok: function (x, z) { return !drwSolidAt(x, z, H(x, z)); }, names: ["An attendant", "A patient walking with his keeper", "The gardener"], persona: "attendant", says: ["Mind yourself, sir.", "He thinks he is a teapot. Quite harmless.", "Dr Seward's in his study, I believe."] });
},
function (G) {
var lite = drwLite(), H = drwVarH, R = wRand(1893);
drwTerrain(G, -580, -580, 1160, 1160, lite ? 14 : 7, H, drwMat("grass"), function (x, z, y, c) { var n = drwFbm(x * 0.03, z * 0.03, 3), sand = y < 3.2 ? 1 : 0; c.setRGB(sand ? 0.66 : 0.36 + n * 0.1, sand ? 0.6 : 0.40 + n * 0.08, sand ? 0.46 : 0.24 + n * 0.05); });
drwWater(G, 0, 360, 1200, 600, 0.4, x0col(), 0.9);
function x0col() { return 0x2A4A5A; }
drwBox(G, 240, 4.6, 10, drwMat("ashlar"), -200, -1, 72);
drwFloor(-200, 72, 240, 10, 3.6);
drwSolid(-200, 78, 240, 0.6, -5, 10);
drwStrip(G, [[-320, 40], [-80, 40]], 12, H, drwMat("paving"), 0.1);
drwStrip(G, [[-200, 40], [-200, -140], [-320, -140]], 8, H, drwMat("road"), 0.1);
[[-300, 10, "LLOYD'S AGENCY"], [-250, 10, null], [-180, 10, "HOTEL ODESSUS"], [-130, 10, "TELEGRAF"], [-90, 10, null]].forEach(function (q, i) { drkHouse(G, q[0], q[1], 20, 14, 10 + (i % 2) * 3, { ry: Math.PI, col: [0xE8D8B8, 0xD8C0A0, 0xF0E0C8, 0xE0C8A8, 0xD8D0B8][i], roof: drwMat("terracotta"), rh: 3.4, chim: 1, shut: 0x3A5A6A, ownRoom: i === 2, sc: i === 2 ? null : "varna", room: i === 2 ? null : 3 + i, name: q[2] ? "The door of " + (q[2] === "TELEGRAF" ? "the telegraph office" : "Lloyd's agent") : "The door of a merchant's house", kind: "shop" }); if (q[2])
drwSign(G, q[2], 4, 0.6, q[0], H(q[0], q[1]) + 4.6, q[1] + 7.1, 0, { bg: "#2A2A3A", ink: "#F0E0B0" }); });
drwSpot(-180, 18.6, 1.8, "The door of the Odessus hotel", "go in", function () { DRW.lastBack = { sc: "varna", x: -180, z: 21, ry: Math.PI }; drwGo({ sc: "varna", x: DRW_AT.vroom.x, z: DRW_AT.vroom.z + 2, y: DRW_IN_Y, ry: 0 }, "🏨 <b>The Odessus.</b> Your room: the window over the harbour, where you watch for the ship.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(-180, 18.6));
(function () { var g = drwRoomBuild(G, "varna", 0, 10, 8, 3.6, { paper: drwMat("greenpaper"), floor: drwMat("floor"), out: { x: -180, z: 21, ry: Math.PI }, doorName: "The door, out to the quay", env: "gas" }); drwFurnish(g, 10, 8, "home", 31); var win = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.8), drwGlowM(0xB8D0E8, 0.7)); win.position.set(0, 1.6, -3.94); g.add(win); })();
for (var i = 0; i < (lite ? 8 : 20); i++) {
var hx = -360 + (i % 10) * 32, hz = -60 - Math.floor(i / 10) * 40;
drkHouse(G, hx, hz, 14, 10, 7 + (i % 3) * 2, { ry: (i % 2) * Math.PI, col: [0xE8D8B8, 0xF0E8D8, 0xD8C8A8][i % 3], roof: drwMat("terracotta"), rh: 3, chim: 1, shut: 0x5A3A2A, sc: "varna", room: i % 3 === 0 ? 8 + (i / 3 | 0) : null, name: "The door of a house in Varna", kind: i % 2 ? "east" : "home" });
}
(function () {
var x = -260, z = -200, y = H(x, z);
drwCyl(G, 8, 8, 10, drwMat("ashlar"), x, y, z, 16);
var d = new THREE.Mesh(drwGeo("dome", function () { return new THREE.SphereGeometry(8, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2); }), drwShine(0x8AA8A0, 0.5, 0.4));
d.position.set(x, y + 10, z);
G.add(d);
drwRound(x, z, 8.4, y - 1, y + 20);
[-1, 1].forEach(function (s) { drwCyl(G, 1.2, 1.4, 26, drwMat("ashlar"), x + s * 14, y, z, 10); var c = new THREE.Mesh(drwGeo("mincap", function () { return new THREE.ConeGeometry(1.5, 4, 10); }), drwMat("slate")); c.position.set(x + s * 14, y + 28, z); G.add(c); drwRound(x + s * 14, z, 1.5, y - 1, y + 30); });
})();
for (var s = 0; s < (lite ? 3 : 7); s++) {
var sh = null;
try {
if (typeof prwShip === "function") {
sh = prwShip(s % 2 ? "brig" : "sloop", { guns: 0, shut: 1, furled: 1, hull: [0x2A2420, 0x3A2A1A, 0x1A1A1A][s % 3] });
if (sh.userData.flag)
sh.userData.flag.visible = false;
}
}
catch (e) { }
if (!sh)
continue;
sh.position.set(-380 + s * 60, -0.2, 110 + (s % 2) * 30);
sh.rotation.y = Math.PI / 2;
G.add(sh);
}
drwCrowd("varna", lite ? 8 : 20, -320, -140, -80, 60, { dress: "drpeasant", dressF: "drpeasantf", women: 0.4, wander: 12, sp: 0.5, beardP: 0.7, ok: function (x, z) { return !drwSolidAt(x, z, H(x, z)) && H(x, z) > 2; }, names: ["A Bulgarian porter", "A Greek merchant", "A Turkish boatman", "A woman selling roses", "A harbour clerk"], persona: "varna", says: ["The Czarina Catherine? Not sighted. Fog in the Bosphorus, they say.", "Lloyd's posts the ships every day at noon.", "Roses! Rose oil from Kazanlak!", "The Black Sea is quiet today.", "The train to Rustchuk and Galatz goes in the morning."] });
drwBox(G, 260, 4.6, 10, drwMat("ashlar"), 400, -1, 72);
drwFloor(400, 72, 260, 10, 3.6);
drwSolid(400, 78, 260, 0.6, -5, 10);
drwStrip(G, [[280, 40], [540, 40]], 12, H, drwMat("paving"), 0.1);
[[330, 10, "HAPGOOD"], [380, 10, null], [440, 10, "I. HILDESHEIM"], [500, 10, null]].forEach(function (q, i) { drkHouse(G, q[0], q[1], 20, 14, 9 + (i % 2) * 3, { ry: Math.PI, col: [0xD8C8A8, 0xE8D8C0, 0xC8B898, 0xE0D0B0][i], roof: drwMat(i % 2 ? "slate" : "terracotta"), rh: 3.2, chim: 1, shut: 0x2A4A3A, ownRoom: i === 2, sc: i === 2 ? null : "varna", room: i === 2 ? null : 12 + i, name: "The door of " + (q[2] ? q[2] === "HAPGOOD" ? "Hapgood's agency" : "an office" : "a warehouse"), kind: "shop" }); if (q[2])
drwSign(G, q[2], 3, 0.5, q[0], H(q[0], q[1]) + 4.2, q[1] + 7.1, 0, { bg: "#1A2A1A", ink: "#F0E0B0" }); });
drwSpot(440, 18.6, 1.8, "The door of Hildesheim's office", "go in", function () { DRW.lastBack = { sc: "varna", x: 440, z: 21, ry: Math.PI }; drwGo({ sc: "varna", x: DRW_AT.goffice.x, z: DRW_AT.goffice.z + 2, y: DRW_IN_Y, ry: 0 }, "📜 <b>Immanuel Hildesheim's office.</b> A ledger, a desk, a Hebrew calendar on the wall.", typeof drbPopulate === "function" ? drbPopulate : null); }, H(440, 18.6));
(function () { var g = drwRoomBuild(G, "varna", 2, 8, 6, 3.2, { paper: drwMat("damask"), floor: drwMat("floor"), out: { x: 440, z: 21, ry: Math.PI }, doorName: "The door, out to the quay", env: "gas" }); drwFurnish(g, 8, 6, "shop", 77); drwBox(g, 0.6, 0.08, 0.4, drwLam(0xD8C8A0), 0, 0.96, -1.4); })();
(function () { var sh = null; try {
if (typeof prwShip === "function") {
sh = prwShip("ship", { guns: 0, shut: 1, furled: 1, hull: 0x1E1E22 });
if (sh.userData.flag)
sh.userData.flag.visible = false;
}
}
catch (e) { } if (sh) {
sh.position.set(400, -0.4, 92);
sh.rotation.y = Math.PI / 2;
G.add(sh);
} drwSign(G, "CZARINA CATHERINE", 3, 0.5, 400, 3.4, 82, Math.PI, { bg: "#1A1A1A", ink: "#F0E0B0" }); drwRound(400, 92, 16, -5, 20); })();
(function () { drkChurch(G, 480, -100, 0, { len: 24, w: 12, h: 9, th: 22, tower: 6, lit: 0xFFC878 }); for (var i = 0; i < (lite ? 20 : 50); i++) {
var x = 450 + R() * 70, z = -130 + R() * 50;
if (Math.hypot(x - 480, z + 100) < 16)
continue;
drkGrave(G, x, z, 0, R() < 0.4 ? "cross" : "stone", i + 900);
} })();
drwStrip(G, [[280, 40], [280, -160], [540, -160]], 8, H, drwMat("road"), 0.1);
for (i = 0; i < (lite ? 6 : 14); i++) {
var gx = 300 + (i % 7) * 36, gz = -50 - Math.floor(i / 7) * 36;
if (Math.hypot(gx - 480, gz + 100) < 36)
continue;
drkHouse(G, gx, gz, 14, 10, 8, { ry: (i % 2) * Math.PI, col: [0xE8D8B8, 0xD8C8A8, 0xC8B898][i % 3], roof: drwMat(i % 2 ? "slate" : "terracotta"), rh: 3, chim: 1, sc: "varna", room: i % 3 === 0 ? 16 + (i / 3 | 0) : null, name: "The door of a house in Galatz", kind: "home" });
}
drwCrowd("galatz", lite ? 6 : 16, 280, -140, 540, 60, { dress: "drpeasant", dressF: "drpeasantf", women: 0.35, wander: 12, sp: 0.5, beardP: 0.7, ok: function (x, z) { return !drwSolidAt(x, z, H(x, z)) && H(x, z) > 2; }, names: ["A Roumanian porter", "A Danube boatman", "A clerk from Hapgood's", "A Slovak"], persona: "varna", says: ["The Czarina Catherine came up the river in fog, with a wind behind her all the way. The captain swore at it.", "A box was taken off by a man called Petrof Skinsky.", "The river boats go up the Sereth from here.", "Skinsky? They found him in St Peter's churchyard, his throat torn open."] });
(function () { var g = drwRoomBuild(G, "varna", 1, 12, 8, 4.0, { wall: drwS("plaster", 0xF0ECE4, 3), floor: drwMat("floor"), out: { x: -200, z: 56, ry: Math.PI }, doorName: "The door (the book takes you on)", env: "indoor" }); for (var b = 0; b < 4; b++) {
drwBed(g, -4.4 + b * 2.9, -2.4, 0, 0xF4F4F0);
} var cr = new THREE.Group(); cr.position.set(0, 2.2, -3.9); g.add(cr); drwBox(cr, 0.08, 0.8, 0.04, drwMat("oak"), 0, 0, 0); drwBox(cr, 0.5, 0.08, 0.04, drwMat("oak"), 0, 0.5, 0); })();
},
function (G) {
var lite = drwLite(), H = drwRivH, R = wRand(1893);
drwTerrain(G, -2620, -760, 5240, 1520, lite ? 26 : 14, H, drwMat("grass"), function (x, z, y, c) {
var n = drwFbm(x * 0.02, z * 0.02, 3), snow = drwSmooth(600, 1800, x) * drwSmooth(3, 10, y), mud = y < 1.6 ? 1 : 0;
c.setRGB(mud ? 0.36 : 0.26 + n * 0.1 + snow * 0.6, mud ? 0.32 : 0.34 + n * 0.08 + snow * 0.52, mud ? 0.24 : 0.18 + n * 0.05 + snow * 0.62);
});
drwWater(G, 0, 0, 5300, 1600, 0.4, 0x4A4A3A, 0.92);
var ok = function (x, z) { var d = Math.abs(z - drwRivZ(x)); return d > drwRivW(x) + 8 && d < 700; };
drwPlant(G, "conifer", drwScatter(1910, lite ? 500 : 1500, -2600, -740, 2600, 740, function (x, z) { return ok(x, z) && (x > -400 || Math.abs(z - drwRivZ(x)) > 200); }, H, 0.9, 1.6), { keepAll: 1 });
drwPlant(G, "tree", drwScatter(1911, lite ? 160 : 480, -2600, -500, 2600, 500, function (x, z) { var d = Math.abs(z - drwRivZ(x)); return d > drwRivW(x) + 4 && d < drwRivW(x) + 90; }, H, 0.7, 1.2), { col: 0x5A6A3A });
drwPlant(G, "rock", drwScatter(1912, lite ? 60 : 160, -2600, -700, 2600, 700, ok, H, 0.7, 2.4));
[[-1600, 1], [-600, -1], [300, 1], [1300, -1], [1900, 1]].forEach(function (v, vi) {
var bx = v[0], side = v[1], rz = drwRivZ(bx) + side * (drwRivW(bx) + 30);
for (var i = 0; i < (lite ? 4 : 9); i++) {
var x = bx - 40 + (i % 5) * 20, z = rz + side * (Math.floor(i / 5) * 22 + (i % 2) * 4);
drkHouse(G, x, z, 9, 7, 4, { ry: side > 0 ? Math.PI : 0, col: [0x8A6A4A, 0x7A5A3A, 0x9A7A5A][i % 3], wall: drwS("b:planks", [0x8A6A4A, 0x7A5A3A, 0x9A7A5A][i % 3], 1.6), roof: drwS("b:planks", 0x5A4A3A, 1.4), rh: 3.4, chim: 1, sc: "river", room: i === 2 ? vi : null, name: "The door of a peasant's house", kind: "poor" });
}
var cx = bx + 60, cz = rz + side * 14, y = H(cx, cz);
drwBox(G, 8, 7, 12, drwS("b:planks", 0x6A4A2A, 1.6), cx, y - 0.2, cz);
var cp = new THREE.Mesh(drwGeo("onion", function () { var c = new THREE.SphereGeometry(2.2, 12, 10); c.scale(1, 1.3, 1); return c; }), drwShine(0x3A6A4A, 0.5, 0.2));
cp.position.set(cx, y + 9.6, cz);
G.add(cp);
drwBox(G, 0.1, 2.4, 0.1, drwMat("iron"), cx, y + 11.6, cz);
drwSolid(cx, cz, 8, 12, y - 1, y + 12);
var lz = drwRivZ(bx) + side * (drwRivW(bx) - 4);
drwBox(G, 4, 0.3, 12, drwMat("planks"), bx, 1.0, lz);
drwFloor(bx, lz, 4, 12, 1.3);
});
[[-1600, 1], [-600, -1], [300, 1], [1300, -1], [1900, 1], [-2400, 1]].forEach(function (v) {
var bx = v[0], side = v[1], rz = drwRivZ(bx) + side * (drwRivW(bx) + 40);
drwCrowd("river" + bx, lite ? 2 : 5, bx - 70, rz - 40, bx + 90, rz + 40, { dress: "drpeasant", dressF: "drpeasantf", women: 0.4, wander: 8, sp: 0.4, beardP: 0.7, ok: function (x, z) { var d = Math.abs(z - drwRivZ(x)); return d > drwRivW(x) + 14; }, names: ["A Roumanian peasant", "A ferryman", "A woman with her geese", "A Slovak boatman"], persona: "varna", says: ["A big boat went up two days ago. Szgany in it, and a great box.", "The water's high with the snow melting.", "The Bistritza comes in at Fundu, past the bend.", "God keep you. (She crosses herself.)"] });
});
for (var r = 0; r < (lite ? 10 : 24); r++) {
var x = 560 + R() * 80, z = drwRivZ(x) + (R() - 0.5) * drwRivW(x) * 1.6;
var rk = new THREE.Mesh(drwGeo("rrock", function () { return new THREE.DodecahedronGeometry(1.4, 0); }), drwMat("rock"));
rk.position.set(x, 0.2, z);
rk.scale.set(1 + R(), 0.6 + R() * 0.4, 1 + R());
G.add(rk);
var fm = new THREE.Mesh(drwGeo("foam", function () { var c = new THREE.CircleGeometry(2.4, 12); c.rotateX(-Math.PI / 2); return c; }), drwLam(0xE8ECE8, { op: 0.5 }));
fm.position.set(x, 0.46, z);
G.add(fm);
}
(function () { var g = new THREE.Group(), A = DRW_AT.rlaunch; g.position.set(A.x, 0.4, drwRivZ(A.x)); G.add(g); drwBox(g, 2.6, 1.2, 10, drwLam(0x1A1A1A), 0, -0.6, 0); drwBox(g, 2.4, 0.1, 9.6, drwMat("planks"), 0, 0.6, 0); drwBox(g, 2.0, 1.6, 3, drwS("b:oak", 0x6A4A2A, 1.2), 0, 0.6, -1); drwCyl(g, 0.3, 0.3, 2.6, drwLam(0x2A2A2A), 0, 2.2, 0.8, 10); drwSmoke(g, 0, 3.6, 0.8, 0x5A5A5A, 6); g.userData.keep = 1; DRW.launch = g; })();
(function () { var A = DRW_AT.rhorses; for (var i = 0; i < 4; i++)
drkHorse(G, A.x + i * 2.6, H(A.x + i * 2.6, A.z + 4), A.z + 4, 0, [0x3A2A1A, 0x1A1A1A, 0x6A4A2A, 0x8A6A4A][i]); })();
(function () { var g = new THREE.Group(), x = 1700; g.position.set(x, 0.4, drwRivZ(x)); g.rotation.y = Math.PI / 2; G.add(g); drwBox(g, 2.4, 1.0, 8, drwLam(0x3A2A1A), 0, -0.5, 0); drkEarthBox(g, 0, 0, 0, { y: 0.5, shut: 1, solid: false }); drwShow("szboat", g, false); })();
var far = [];
for (var i2 = 0; i2 < 14; i2++) {
far.push({ x: 2600 + i2 * 300 - 2000, z: -1800 + i2 * 260, y: -40, s: 1 + R() * 0.6, ry: R() * 6 });
}
for (i2 = 0; i2 < 8; i2++)
far.push({ x: 3400, z: -1400 + i2 * 400, y: -40, s: 1.2 + R() * 0.5, ry: R() * 6 });
drwInst(G, drwGeo("rmount", function () { var c = new THREE.ConeGeometry(600, 900, 7, 3); var pa = c.attributes.position; for (var i = 0; i < pa.count; i++) {
pa.setX(i, pa.getX(i) * (0.8 + drwHash(i, 4) * 0.4));
} c.computeVertexNormals(); c.translate(0, 450, 0); return c; }), drwLam(0xC8CCD8), far, { cull: false });
},
function (x, z, y) {
if (ddWaterAt(x, z))
return false;
for (var m = 0; m < DRW_ROOMS.length; m++) {
var Q = DRW_ROOMS[m];
if (Q.sc === DRW.sc && x > Q.x0 - 1 && x < Q.x1 + 1 && z > Q.z0 - 1 && z < Q.z1 + 1)
return false;
}
for (var a = 0; a < 5; a++) {
var dx = a === 0 ? 0 : [0.7, -0.7, 0, 0][a - 1], dz = a === 0 ? 0 : [0, 0, 0.7, -0.7][a - 1];
if (drwSolidAt(x + dx, z + dz, y + 0.2))
return false;
}
for (var i = 0; i < DRW.spots.length; i++) {
var S = DRW.spots[i];
if (S.y != null && Math.abs(S.y - y) > 6)
continue;
if (Math.hypot(S.x - x, S.z - z) < Math.max(3, (S.r || 1) + 1.5))
return false;
}
for (var k in DRW_AT) {
var A = DRW_AT[k];
if (A.sc !== DRW.sc || (A.y != null && Math.abs(A.y - y) > 4))
continue;
if (Math.hypot(A.x - x, A.z - z) < 3.2)
return false;
}
var fl0 = drwFloorAt(x, z, 500);
if (fl0 !== null && (fl0 > drwLand(x, z) + 4 || (fl0 > drwLand(x, z) + 0.6 && !ddNearWater(x, z))))
return false;
for (i = 0; i < DRW.people.length; i++) {
var P = DRW.people[i];
if (P.g && P.g.parent && Math.hypot(P.g.position.x - x, P.g.position.z - z) < 2)
return false;
}
var h0 = drwLand(x, z), h1 = drwLand(x + 1, z), h2 = drwLand(x, z + 1);
if (Math.abs(h1 - h0) > 0.7 || Math.abs(h2 - h0) > 0.7)
return false;
return true;
},
function (P, kind, R) {
var g = new THREE.Group();
P.add(g);
var oak = drwMat("oak"), iron = drwMat("iron"), st = drwMat("greystone"), pl = drwMat("planks"), r = 0.55, h = 1.2;
var barrel = function (x, z, y, lie) {
var b = new THREE.Mesh(ddG("barrel", function () { var c = new THREE.CylinderGeometry(0.4, 0.4, 1.05, 12); var pa = c.attributes.position; for (var i = 0; i < pa.count; i++) {
var yy = pa.getY(i), k = 1 + 0.14 * (1 - Math.pow(yy / 0.525, 2));
pa.setX(i, pa.getX(i) * k);
pa.setZ(i, pa.getZ(i) * k);
} c.computeVertexNormals(); return c; }), oak);
b.position.set(x, (y || 0) + (lie ? 0.42 : 0.525), z);
if (lie)
b.rotation.z = Math.PI / 2;
g.add(b);
[-0.3, 0.3].forEach(function (o) { var hp = new THREE.Mesh(ddG("hoop", function () { return new THREE.TorusGeometry(0.45, 0.022, 4, 14); }), iron); hp.position.copy(b.position); if (lie) {
hp.rotation.y = Math.PI / 2;
hp.position.x += o;
}
else {
hp.rotation.x = Math.PI / 2;
hp.position.y += o;
} g.add(hp); });
};
var crate = function (x, z, y, s) { s = s || 0.8; drwBox(g, s, s, s, pl, x, y || 0, z); drwBox(g, s + 0.04, 0.08, 0.1, oak, x, (y || 0) + s * 0.5, z + s / 2); drwBox(g, 0.1, s * 0.95, 0.06, oak, x, (y || 0), z + s / 2); };
switch (kind) {
case "barrel":
barrel(0, 0);
if (R() < 0.6)
barrel(0.85, 0.2);
if (R() < 0.4)
barrel(0.4, -0.75, 0, 1);
r = 1;
break;
case "crate":
crate(0, 0);
if (R() < 0.6)
crate(0.9, 0.1, 0, 0.7);
if (R() < 0.5)
crate(0.2, 0.05, 0.8, 0.6);
r = 0.9;
h = 1.5;
break;
case "sacks":
for (var i = 0; i < 4; i++) {
var s = new THREE.Mesh(ddG("sack", function () { var c = new THREE.SphereGeometry(0.34, 8, 6); c.scale(1, 0.7, 0.8); return c; }), drwLam(0xB8A27A));
s.position.set((i % 2) * 0.6 - 0.3, 0.24 + (i > 1 ? 0.42 : 0), (i > 1 ? 0 : 0.1));
s.rotation.y = i;
g.add(s);
}
r = 0.7;
break;
case "cart": {
var c = new THREE.Group();
g.add(c);
drwBox(c, 1.5, 0.1, 2.6, pl, 0, 0.75, 0);
drwBox(c, 0.08, 0.45, 2.6, pl, -0.75, 0.8, 0);
drwBox(c, 0.08, 0.45, 2.6, pl, 0.75, 0.8, 0);
drwBox(c, 1.5, 0.45, 0.08, pl, 0, 0.8, -1.3);
[-0.85, 0.85].forEach(function (x) { var w = new THREE.Mesh(ddG("wheel", function () { return new THREE.TorusGeometry(0.55, 0.06, 5, 16); }), oak); w.rotation.y = Math.PI / 2; w.position.set(x, 0.55, 0.2); c.add(w); for (var s = 0; s < 6; s++) {
var sp = drwBox(c, 0.04, 1.05, 0.04, oak, x, 0.03, 0.2);
sp.rotation.x = s / 6 * Math.PI;
sp.position.y = 0.55;
} });
[-0.3, 0.3].forEach(function (x) { drwBox(c, 0.07, 0.07, 2.4, oak, x, 0.45, 2.2).rotation.x = -0.2; });
if (R() < 0.6)
for (var k = 0; k < 3; k++)
drwBox(c, 0.5, 0.4, 0.5, R() < 0.5 ? drwLam(0xB8A27A) : pl, -0.4 + k * 0.4, 0.85, -0.6 + k * 0.4);
r = 1.6;
break;
}
case "bench":
drwBox(g, 1.8, 0.08, 0.45, oak, 0, 0.45, 0);
drwBox(g, 1.8, 0.45, 0.06, oak, 0, 0.55, -0.2);
[-0.8, 0.8].forEach(function (x) { drwBox(g, 0.08, 0.45, 0.45, iron, x, 0, 0); });
r = 0.9;
h = 1;
break;
case "tub":
drwCyl(g, 0.42, 0.34, 0.5, drwMat("terracotta"), 0, 0, 0, 10);
var fl = new THREE.Mesh(ddG("bloom", function () { return new THREE.IcosahedronGeometry(0.42, 1); }), drwLam([0xC83A4A, 0xE8C040, 0x8A4AC8, 0xF0F0F0][Math.floor(R() * 4)]));
fl.position.y = 0.72;
fl.scale.set(1, 0.6, 1);
g.add(fl);
var lv = new THREE.Mesh(ddG("leaves", function () { return new THREE.IcosahedronGeometry(0.44, 0); }), drwLam(0x3A5A2A));
lv.position.y = 0.6;
lv.scale.set(1.05, 0.5, 1.05);
g.add(lv);
r = 0.5;
h = 1;
break;
case "trough":
drwBox(g, 2.2, 0.6, 0.7, st, 0, 0, 0);
var wt = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), drwWaterM(0x3A4A44, 0.9));
wt.rotation.x = -Math.PI / 2;
wt.position.y = 0.56;
g.add(wt);
r = 1.1;
h = 0.8;
break;
case "cross":
drwBox(g, 0.16, 2.6, 0.16, oak, 0, 0, 0);
drwBox(g, 1.0, 0.14, 0.14, oak, 0, 1.9, 0);
drwBox(g, 0.6, 0.2, 0.12, oak, 0, 2.55, 0.02).rotation.z = 0;
var rf = new THREE.Mesh(ddG("xroof", function () { var c = new THREE.ConeGeometry(0.55, 0.4, 4); c.rotateY(Math.PI / 4); return c; }), drwMat("slate"));
rf.position.y = 2.75;
g.add(rf);
var fig = new THREE.Mesh(ddG("xfig", function () { return new THREE.CylinderGeometry(0.06, 0.04, 0.6, 6); }), drwLam(0xD8C8A8));
fig.position.set(0, 1.7, 0.1);
g.add(fig);
drwBox(g, 0.8, 0.1, 0.3, drwLam(0xE8B040), 0, 0, 0.25);
r = 0.4;
h = 2.8;
break;
case "shrine":
drwBox(g, 0.9, 1.4, 0.7, drwMat("plaster"), 0, 0, 0);
drwBox(g, 0.6, 0.7, 0.06, drwLam(0x2A3A6A), 0, 0.55, 0.36);
var rf2 = new THREE.Mesh(ddG("sroof", function () { var c = new THREE.ConeGeometry(0.75, 0.6, 4); c.rotateY(Math.PI / 4); return c; }), drwMat("slate"));
rf2.position.y = 1.7;
g.add(rf2);
var cf = new THREE.Mesh(ddG("cflame", function () { return new THREE.ConeGeometry(0.03, 0.09, 6); }), drwGlowM(0xFFC060, 0.9));
cf.position.set(0, 0.85, 0.42);
g.add(cf);
r = 0.6;
h = 2;
break;
case "stall":
drwBox(g, 2.4, 0.9, 1, pl, 0, 0, 0);
[-1.1, 1.1].forEach(function (x) { drwBox(g, 0.08, 2.3, 0.08, oak, x, 0, -0.45); drwBox(g, 0.08, 2.0, 0.08, oak, x, 0, 0.45); });
var aw = drwBox(g, 2.6, 0.06, 1.4, drwLam([0xA83A2A, 0x2A5A8A, 0xC8A040][Math.floor(R() * 3)], { ds: 1 }), 0, 2.15, 0);
aw.rotation.x = 0.2;
for (i = 0; i < 6; i++) {
var it = new THREE.Mesh(ddG("fruit", function () { return new THREE.SphereGeometry(0.12, 6, 5); }), drwLam([0xC83A2A, 0xE8A030, 0x6A8A2A, 0x8A3A6A][i % 4]));
it.position.set(-0.9 + i * 0.36, 0.98, (i % 2) * 0.2 - 0.1);
g.add(it);
}
r = 1.3;
h = 2.3;
break;
case "wood":
for (i = 0; i < 9; i++) {
var lg = new THREE.Mesh(ddG("log", function () { var c = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 7); c.rotateX(Math.PI / 2); return c; }), drwMat("darkbark"));
lg.position.set((i % 3) * 0.26 - 0.26, 0.12 + Math.floor(i / 3) * 0.22, 0);
g.add(lg);
}
r = 0.7;
h = 0.8;
break;
case "logs":
for (i = 0; i < 3; i++) {
var L = new THREE.Mesh(ddG("biglog", function () { var c = new THREE.CylinderGeometry(0.28, 0.32, 4, 8); c.rotateZ(Math.PI / 2); return c; }), drwMat("darkbark"));
L.position.set(0, 0.3 + (i === 2 ? 0.5 : 0), i === 2 ? 0 : (i - 0.5) * 0.62);
g.add(L);
}
r = 2;
h = 1;
break;
case "hay":
var hy = new THREE.Mesh(ddG("hay", function () { var c = new THREE.SphereGeometry(1.5, 10, 7, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1, 1.3, 1); return c; }), drwS("b:planks", 0xC8A860, 0.5));
g.add(hy);
var hp2 = new THREE.Mesh(ddG("haypole", function () { return new THREE.CylinderGeometry(0.05, 0.05, 3.2, 5); }), oak);
hp2.position.y = 1.6;
g.add(hp2);
r = 1.6;
h = 2.2;
break;
case "stone":
var sn = new THREE.Mesh(ddG("bould", function () { return new THREE.DodecahedronGeometry(0.9, 0); }), drwMat("rock"));
sn.scale.set(1, 0.6, 0.8);
sn.position.y = 0.3;
sn.rotation.y = R() * 3;
g.add(sn);
r = 0.9;
h = 0.9;
break;
case "fence":
for (i = 0; i < 4; i++)
drwBox(g, 0.1, 1.1, 0.1, oak, i * 1.2 - 1.8, 0, 0);
[0.4, 0.85].forEach(function (y) { drwBox(g, 3.8, 0.08, 0.05, oak, 0, y, 0); });
r = 0;
break;
case "boat":
var bt = new THREE.Mesh(ddG("dinghy", function () { var c = new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.8, 0.5, 2.2); return c; }), drwS("b:planks", 0x6A4A2A, 0.6, { ds: 1 }));
bt.position.y = 0.5;
bt.rotation.z = 0.15;
g.add(bt);
drwBox(g, 0.08, 0.06, 2, oak, 0.6, 0.3, 0).rotation.z = 0.3;
r = 1.3;
h = 0.9;
break;
case "rope":
var rp = new THREE.Mesh(ddG("rope", function () { return new THREE.TorusGeometry(0.32, 0.08, 6, 14); }), drwLam(0xA08A5A));
rp.rotation.x = Math.PI / 2;
rp.position.y = 0.08;
g.add(rp);
var rp2 = rp.clone();
rp2.position.y = 0.22;
rp2.scale.setScalar(0.85);
g.add(rp2);
barrel(0.9, 0.1);
r = 0.8;
break;
case "nets":
var nt = new THREE.Mesh(ddG("net", function () { var c = new THREE.SphereGeometry(0.9, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1.2, 0.35, 0.9); return c; }), drwLam(0x5A6A5A));
g.add(nt);
for (i = 0; i < 5; i++) {
var fb = new THREE.Mesh(ddG("float", function () { return new THREE.SphereGeometry(0.1, 6, 5); }), drwLam(0xD8A040));
fb.position.set(Math.cos(i) * 0.9, 0.12, Math.sin(i) * 0.7);
g.add(fb);
}
r = 1;
h = 0.5;
break;
case "pots":
for (i = 0; i < 5; i++) {
var pt = new THREE.Group();
pt.position.set((i % 3) * 0.75 - 0.75, Math.floor(i / 3) * 0.55, Math.floor(i / 3) * 0.1);
g.add(pt);
drwBox(pt, 0.6, 0.08, 0.45, oak, 0, 0, 0);
for (var a = 0; a < 3; a++) {
var hp3 = new THREE.Mesh(ddG("pothoop", function () { return new THREE.TorusGeometry(0.24, 0.015, 4, 10, Math.PI); }), oak);
hp3.position.set(-0.22 + a * 0.22, 0.05, 0);
hp3.rotation.y = Math.PI / 2;
pt.add(hp3);
}
}
r = 1;
h = 1;
break;
case "anchor":
drwBox(g, 0.12, 1.6, 0.12, iron, 0, 0, 0);
var ar = new THREE.Mesh(ddG("anchor", function () { return new THREE.TorusGeometry(0.55, 0.07, 5, 12, Math.PI); }), iron);
ar.rotation.z = Math.PI;
ar.position.y = 0.55;
g.add(ar);
drwBox(g, 0.8, 0.1, 0.1, iron, 0, 1.4, 0);
var ring = new THREE.Mesh(ddG("aring", function () { return new THREE.TorusGeometry(0.15, 0.03, 4, 10); }), iron);
ring.position.y = 1.75;
g.add(ring);
g.rotation.z = 0.5;
g.position.y = 0.3;
r = 0.7;
h = 1.6;
break;
case "bollard":
drwCyl(g, 0.22, 0.28, 0.8, iron, 0, 0, 0, 10);
var bt2 = new THREE.Mesh(ddG("bolltop", function () { return new THREE.SphereGeometry(0.26, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); }), iron);
bt2.position.y = 0.8;
g.add(bt2);
r = 0.35;
h = 1;
break;
case "lamp":
drwCyl(g, 0.07, 0.1, 3.4, drwLam(0x1A2A22), 0, 0, 0, 8);
drwBox(g, 0.4, 0.08, 0.08, drwLam(0x1A2A22), 0, 3.0, 0);
var lb = new THREE.Mesh(ddG("lantern", function () { var c = new THREE.CylinderGeometry(0.22, 0.14, 0.45, 6); return c; }), drwGlowM(0xFFE0A0, 0.92));
lb.position.y = 3.6;
g.add(lb);
var lt = new THREE.Mesh(ddG("lantop", function () { return new THREE.ConeGeometry(0.28, 0.25, 6); }), drwLam(0x1A2A22));
lt.position.y = 3.95;
g.add(lt);
r = 0.25;
h = 4;
break;
case "pillar":
drwCyl(g, 0.26, 0.28, 1.4, drwShine(0xA82A1E, 0.5, 0.2), 0, 0, 0, 12);
var pc = new THREE.Mesh(ddG("pcap", function () { return new THREE.SphereGeometry(0.3, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2); }), drwShine(0xA82A1E, 0.5, 0.2));
pc.position.y = 1.4;
g.add(pc);
drwBox(g, 0.3, 0.04, 0.04, drwLam(0x101010), 0, 1.1, 0.27);
r = 0.35;
h = 1.7;
break;
case "barrow":
drwBox(g, 1.4, 0.5, 0.8, pl, 0, 0.55, 0);
[-0.6, 0.6].forEach(function (x) { var w = new THREE.Mesh(ddG("bwheel", function () { return new THREE.TorusGeometry(0.42, 0.05, 5, 14); }), oak); w.rotation.y = Math.PI / 2; w.position.set(0, 0.42, 0); w.position.x = x * 1.2; g.add(w); });
for (i = 0; i < 8; i++) {
var fr = new THREE.Mesh(ddG("fruit", function () { return new THREE.SphereGeometry(0.12, 6, 5); }), drwLam([0xC83A2A, 0xE8A030, 0x6A8A2A, 0xE8D050][i % 4]));
fr.position.set(-0.5 + (i % 4) * 0.33, 1.1, i < 4 ? -0.18 : 0.18);
g.add(fr);
}
drwBox(g, 0.06, 0.06, 1.2, oak, -0.3, 0.7, 1.0);
drwBox(g, 0.06, 0.06, 1.2, oak, 0.3, 0.7, 1.0);
r = 1;
h = 1.2;
break;
case "railing":
for (i = 0; i < 8; i++)
drwBox(g, 0.04, 1.1, 0.04, iron, i * 0.3 - 1.05, 0, 0);
drwBox(g, 2.4, 0.05, 0.05, iron, 0, 1.0, 0);
drwBox(g, 2.4, 0.05, 0.05, iron, 0, 0.15, 0);
r = 0;
break;
case "urn":
drwBox(g, 0.8, 0.9, 0.8, drwMat("ashlar"), 0, 0, 0);
var u = new THREE.Mesh(ddG("urn", function () { return new THREE.LatheGeometry([[0, 0], [0.18, 0], [0.12, 0.12], [0.32, 0.35], [0.34, 0.55], [0.22, 0.75], [0.26, 0.82], [0, 0.82]].map(function (p) { return new THREE.Vector2(p[0], p[1]); }), 12); }), drwMat("greystone"));
u.position.y = 0.9;
g.add(u);
r = 0.5;
h = 1.8;
break;
case "brazier":
drwCyl(g, 0.06, 0.06, 1.1, iron, 0, 0, 0, 6);
var bw = new THREE.Mesh(ddG("bowl", function () { return new THREE.SphereGeometry(0.4, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), iron);
bw.position.y = 1.3;
g.add(bw);
drwFire(g, 0, 1.12, 0, 0.45);
r = 0.45;
h = 1.6;
break;
case "column":
var cl = drwCyl(g, 0.4, 0.44, 1.2 + R() * 2.2, drwMat("ashlar"), 0, 0, 0, 12);
drwBox(g, 1, 0.3, 1, drwMat("ashlar"), 0, 0, 0);
var dr = new THREE.Mesh(ddG("drum", function () { return new THREE.CylinderGeometry(0.42, 0.42, 0.9, 12); }), drwMat("ashlar"));
dr.rotation.z = Math.PI / 2;
dr.position.set(1.2, 0.42, 0.3);
g.add(dr);
r = 0.7;
h = 3;
break;
case "statue":
drwBox(g, 0.9, 1, 0.9, drwMat("ashlar"), 0, 0, 0);
var bd = new THREE.Mesh(ddG("robe", function () { return new THREE.CylinderGeometry(0.2, 0.38, 1.5, 10); }), drwMat("greystone"));
bd.position.y = 1.75;
g.add(bd);
var hd = new THREE.Mesh(ddG("shead", function () { return new THREE.SphereGeometry(0.14, 10, 8); }), drwMat("greystone"));
hd.position.y = 2.65;
g.add(hd);
[-1, 1].forEach(function (s) { var wg = new THREE.Mesh(ddG("wing", function () { var c = new THREE.ConeGeometry(0.28, 1.3, 4); c.scale(1, 1, 0.2); return c; }), drwMat("greystone")); wg.position.set(s * 0.3, 2.1, -0.15); wg.rotation.z = -s * 0.35; g.add(wg); });
r = 0.55;
h = 2.8;
break;
case "rubble":
for (i = 0; i < 6; i++)
drwBox(g, 0.4 + R() * 0.6, 0.2 + R() * 0.35, 0.3 + R() * 0.5, drwMat("greystone"), (R() - 0.5) * 2, 0, (R() - 0.5) * 2, R() * 3);
r = 0;
break;
case "bones":
for (i = 0; i < 5; i++) {
var bn = drwBox(g, 0.05, 0.05, 0.4, drwLam(0xD8D0B8), (R() - 0.5) * 0.8, 0, (R() - 0.5) * 0.8, R() * 3);
}
var sk = new THREE.Mesh(ddG("skull", function () { return new THREE.SphereGeometry(0.11, 8, 6); }), drwLam(0xD8D0B8));
sk.position.set(0.1, 0.1, 0);
g.add(sk);
r = 0;
break;
}
return { g: g, r: r, h: h };
},
function (G, k) {
var theme = DRW_DRESS[k], kit = DRW_DRESS_KIT[theme];
if (!kit)
return;
var lite = drwLite(), R = wRand(k.length * 977 + 31), D = new THREE.Group();
D.name = "dracula-dress-" + k;
G.add(D);
var n = 0;
var pts = [];
for (var a in DRW_AT) {
var A = DRW_AT[a];
if (A.sc === k && A.y == null)
pts.push(A);
}
pts.forEach(function (A) {
var want = lite ? 3 : 9, tries = 0, got = 0;
while (got < want && tries < want * 7) {
tries++;
var ang = R() * 6.283, d = 4 + R() * 12, x = A.x + Math.cos(ang) * d, z = A.z + Math.sin(ang) * d, y = drwGround(x, z, 500);
if (!ddClear(x, z, y))
continue;
var kind = ddKind(theme, kit, x, z, R), P = new THREE.Group();
P.position.set(x, y, z);
P.rotation.y = R() * 6.283;
D.add(P);
var it = ddProp(P, kind, R);
if (it.r > 0)
drwRound(x, z, it.r, y - 1, y + it.h);
else if (kind === "fence" || kind === "railing") {
drwSolid(x, z, kind === "fence" ? 3.8 : 2.4, 0.3, y - 1, y + 1.2, P.rotation.y);
}
got++;
n++;
}
});
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
pts.forEach(function (A) { x0 = Math.min(x0, A.x); x1 = Math.max(x1, A.x); z0 = Math.min(z0, A.z); z1 = Math.max(z1, A.z); });
var pad = theme === "castle" ? 40 : 90;
x0 -= pad;
x1 += pad;
z0 -= pad;
z1 += pad;
var walled = theme === "town" || theme === "port" || theme === "city" || theme === "castle";
var area = (x1 - x0) * (z1 - z0), goal = Math.min(lite ? (walled ? 140 : 70) : (walled ? (theme === "castle" ? 320 : 900) : 360), Math.round(area / (walled ? 120 : 900))), tries2 = 0, got2 = 0;
while (got2 < goal && tries2 < goal * 30) {
tries2++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), y = drwGround(x, z, 500);
var near = null;
if (walled) {
for (var q = 0; q < 8; q++) {
var a2 = q / 8 * 6.283;
if (drwSolidAt(x + Math.cos(a2) * 1.9, z + Math.sin(a2) * 1.9, y + 0.2)) {
near = a2;
break;
}
}
if (near === null)
continue;
}
if (!ddClear(x, z, y))
continue;
var kind = ddKind(theme, kit, x, z, R), P = new THREE.Group();
P.position.set(x, y, z);
P.rotation.y = near !== null ? -near + Math.PI / 2 : R() * 6.283;
D.add(P);
var it = ddProp(P, kind, R);
if (it.r > 0)
drwRound(x, z, it.r, y - 1, y + it.h);
else if (kind === "fence" || kind === "railing")
drwSolid(x, z, kind === "fence" ? 3.8 : 2.4, 0.3, y - 1, y + 1.2, P.rotation.y);
got2++;
n++;
}
D.userData.n = n;
return n;
},
function (i) {
return drwCanvas("ddpic" + i, 128, 160, function (c, W, H) {
var R = wRand(400 + i * 17);
if (i % 3 === 2) {
c.fillStyle = "#1A1612";
c.fillRect(0, 0, W, H);
var g = c.createRadialGradient(W / 2, H * 0.42, 4, W / 2, H * 0.42, 40);
g.addColorStop(0, "#D8B898");
g.addColorStop(1, "#4A3828");
c.fillStyle = g;
c.beginPath();
c.ellipse(W / 2, H * 0.42, 24, 30, 0, 0, 7);
c.fill();
c.fillStyle = ["#2A2A3A", "#4A1A1A", "#1A3A2A"][i % 3];
c.fillRect(W / 2 - 40, H * 0.62, 80, H);
c.fillStyle = "#2A1A10";
c.beginPath();
c.ellipse(W / 2, H * 0.3, 26, 16, 0, Math.PI, 0);
c.fill();
}
else {
var sky = c.createLinearGradient(0, 0, 0, H * 0.6);
sky.addColorStop(0, ["#5A7A9A", "#C88A5A", "#6A6A7A"][i % 3]);
sky.addColorStop(1, "#E8D8B8");
c.fillStyle = sky;
c.fillRect(0, 0, W, H);
for (var l = 0; l < 3; l++) {
c.fillStyle = ["#5A6A4A", "#4A5A3A", "#3A4A2A"][l];
c.beginPath();
c.moveTo(0, H);
for (var x = 0; x <= W; x += 8)
c.lineTo(x, H * (0.5 + l * 0.12) + Math.sin(x * 0.05 + R() * 0.4 + l) * 10);
c.lineTo(W, H);
c.fill();
}
if (i % 2) {
c.fillStyle = "#3A3A3A";
c.fillRect(W * 0.6, H * 0.38, 14, 30);
c.beginPath();
c.moveTo(W * 0.6 - 3, H * 0.38);
c.lineTo(W * 0.6 + 7, H * 0.3);
c.lineTo(W * 0.6 + 17, H * 0.38);
c.fill();
}
}
c.strokeStyle = "rgba(0,0,0,.25)";
c.lineWidth = 6;
c.strokeRect(0, 0, W, H);
});
},
function () {
return drwCanvas("ddweb", 128, 128, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "rgba(230,230,230,.55)";
c.lineWidth = 1;
for (var a = 0; a < 8; a++) {
c.beginPath();
c.moveTo(0, 0);
c.lineTo(Math.cos(a / 16 * Math.PI) * W, Math.sin(a / 16 * Math.PI) * H);
c.stroke();
}
for (var r = 12; r < W; r += 12) {
c.beginPath();
c.arc(0, 0, r, 0, Math.PI / 2);
c.stroke();
}
});
},
function (g, W, D, H, env, seed, gapN) {
var R = wRand(seed), A = g.userData.A, crypt = env === "crypt", openN = !!(gapN && gapN.length);
var oak = drwS("b:oak", 0x3A2414, 1.2), gilt = drwShine(0xC8A050, 0.35, 0.85);
var walls = [["N", -D / 2, W], ["W", -W / 2, D], ["E", W / 2, D]].filter(function (w) { return !(openN && w[0] === "N"); });
if (!crypt) {
walls.forEach(function (w) {
var along = w[2], hor = w[0] === "N";
var at = function (u, y, th, h, mat) { if (hor)
drwBox(g, along, h, th, mat, u, y, w[1] + (th / 2 + 0.18));
else
drwBox(g, th, h, along, mat, w[1] + (w[0] === "W" ? 1 : -1) * (th / 2 + 0.18), y, u); };
at(0, 0, 0.04, 0.95, drwS("b:oak", 0x4A2E1A, 1.4));
at(0, 0.95, 0.07, 0.07, oak);
at(0, 0, 0.06, 0.16, oak);
at(0, H - 0.22, 0.12, 0.2, drwMat("plaster"));
});
var pics = [[0, -D / 2, 0], [W * 0.28, -D / 2, 0], [-W * 0.28, -D / 2, 0], [-W / 2, -D * 0.15, Math.PI / 2], [W / 2, -D * 0.15, -Math.PI / 2]];
pics.forEach(function (p, i) {
if (i > 0 && R() < 0.25)
return;
if (openN && i < 3)
return;
var fw = 0.7 + R() * 0.5, fh = fw * 1.25;
var f = new THREE.Group();
f.position.set(p[0] + (p[2] === Math.PI / 2 ? 0.2 : p[2] ? -0.2 : 0), 1.75, p[1] + (p[2] ? 0 : 0.2));
f.rotation.y = p[2];
g.add(f);
drwBox(f, fw + 0.12, fh + 0.12, 0.05, gilt, 0, -0.06, 0);
var cv = new THREE.Mesh(new THREE.PlaneGeometry(fw, fh), drwLam(0xFFFFFF, { map: ddPicTex(Math.floor(R() * 6)), mapk: "ddpic" }));
cv.position.set(0, fh / 2 - 0.06 + 0.0, 0.03);
f.add(cv);
});
[-1, 1].forEach(function (s) {
if (R() < 0.3)
return;
var x = s * (W / 2 - 0.2), z = D * 0.15, col = [0x6A1A1E, 0x2A3A5A, 0x3A4A2A, 0x5A3A1A][Math.floor(R() * 4)];
var gl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.2), drwGlowM(0x5A6A8A, 0.5));
gl.position.set(x - s * 0.01, 1.8, z);
gl.rotation.y = -s * Math.PI / 2;
g.add(gl);
[-0.85, 0.85].forEach(function (o) { var c = new THREE.Mesh(ddG("curtain", function () { var p = new THREE.PlaneGeometry(0.7, 2.9, 8, 1), pa = p.attributes.position; for (var i = 0; i < pa.count; i++)
pa.setZ(i, Math.sin(pa.getX(i) * 18) * 0.05); p.computeVertexNormals(); return p; }), drwS("b:velvet", col, 0.8, { ds: 1 })); c.position.set(x - s * 0.07, 1.6, z + o); c.rotation.y = -s * Math.PI / 2; g.add(c); });
drwBox(g, 0.14, 0.3, 2.6, drwS("b:velvet", col, 0.8), x - s * 0.07, 3.0, z);
});
[[-W / 2 + 0.25, -D * 0.35, 1], [W / 2 - 0.25, -D * 0.35, -1]].forEach(function (q) { drwBox(g, 0.1, 0.25, 0.1, drwMat("brass"), q[0], 2.1, q[1]); var f = new THREE.Mesh(ddG("scf", function () { return new THREE.SphereGeometry(0.07, 8, 6); }), drwGlowM(0xFFD890, 0.95)); f.position.set(q[0] + q[2] * 0.12, 2.45, q[1]); g.add(f); });
var cx = -W / 2 + 0.6, px = W / 2 - 0.7, z = D / 2 - 0.7;
var ck = new THREE.Group();
ck.position.set(cx, 0, z);
g.add(ck);
drwBox(ck, 0.55, 2.1, 0.4, drwS("b:oak", 0x3A2010, 1.2), 0, 0, 0);
var fc = new THREE.Mesh(ddG("clockface", function () { return new THREE.CircleGeometry(0.2, 16); }), drwLam(0xF0E8D0));
fc.position.set(0.0, 1.75, 0.21);
ck.add(fc);
drwBox(ck, 0.06, 0.5, 0.02, gilt, 0, 0.7, 0.21);
ck.rotation.y = Math.PI;
drwSolid(A.x + cx, A.z + z, 0.6, 0.5, DRW_IN_Y - 1, DRW_IN_Y + 2.2);
drwCyl(g, 0.3, 0.24, 0.5, drwMat("terracotta"), px, 0, z, 10);
for (var l = 0; l < 7; l++) {
var lf = new THREE.Mesh(ddG("palmleaf", function () { var p = new THREE.PlaneGeometry(0.22, 1.1); p.translate(0, 0.55, 0); return p; }), drwLam(0x3A6A2A, { ds: 1 }));
lf.position.set(px, 0.5, z);
lf.rotation.set(0.6, l / 7 * 6.283, 0);
g.add(lf);
}
drwRound(A.x + px, A.z + z, 0.4, DRW_IN_Y - 1, DRW_IN_Y + 1.4);
}
else {
var web = drwLam(0xFFFFFF, { map: ddWebTex(), mapk: "ddweb", op: 0.8, ds: 1 });
[[-W / 2, -D / 2, 0], [W / 2, -D / 2, -Math.PI / 2], [-W / 2, D / 2, Math.PI / 2], [W / 2, D / 2, Math.PI]].forEach(function (q) { var m = new THREE.Mesh(ddG("webp", function () { return new THREE.PlaneGeometry(1.4, 1.4); }), web); m.position.set(q[0] + (q[0] < 0 ? 0.7 : -0.7) * 0.7, H - 0.7, q[1] + (q[1] < 0 ? 0.7 : -0.7) * 0.7); m.rotation.set(0, q[2] + Math.PI / 4, Math.PI); g.add(m); });
for (var c = 0; c < 8; c++) {
var w = walls[c % 3], u = (R() - 0.5) * w[2] * 0.8, x = w[0] === "N" ? u : w[1] + (w[0] === "W" ? 0.5 : -0.5), zz = w[0] === "N" ? w[1] + 0.5 : u;
for (var k = 0; k < 3; k++) {
var ch = 0.12 + R() * 0.3;
drwCyl(g, 0.035, 0.04, ch, drwLam(0xE8E0C8), x + (k - 1) * 0.1, 0, zz + (k % 2) * 0.08, 6);
var fl = new THREE.Mesh(ddG("cfl2", function () { return new THREE.ConeGeometry(0.025, 0.08, 6); }), drwGlowM(0xFFC060, 0.9));
fl.position.set(x + (k - 1) * 0.1, ch + 0.04, zz + (k % 2) * 0.08);
g.add(fl);
}
}
for (c = 0; c < 3; c++) {
var bp = new THREE.Group();
bp.position.set((R() - 0.5) * W * 0.7, 0, -D / 2 + 0.5 + R() * 0.4);
g.add(bp);
ddProp(bp, "bones", R);
}
[-W / 2 + 0.3, W / 2 - 0.3].forEach(function (x) { for (var lk = 0; lk < 10; lk++) {
var lnk = new THREE.Mesh(ddG("chainlink", function () { return new THREE.TorusGeometry(0.06, 0.015, 4, 8); }), drwMat("iron"));
lnk.position.set(x, H - 0.3 - lk * 0.11, -D * 0.2);
lnk.rotation.y = lk % 2 ? Math.PI / 2 : 0;
g.add(lnk);
} });
}
},
function (title, legs, to, h, o) {
o = o || {};
var st = { k: "until", h: h, test: function (f) { return !!f["j_" + title]; } };
st.reopen = function () { var f = drbS().f; drkJourney(title, legs, to, function () { f["j_" + title] = 1; if (o.after)
try {
o.after();
}
catch (e) { } }, o); };
st.on = function (f) { f["j_" + title] = 0; setTimeout(st.reopen, window.SBK_FAST ? 20 : 600); };
return st;
},
function (pts, sp, h, o) {
o = o || {};
var st = { k: "until", h: h, test: function (f) { return !!f._rode; } };
st.reopen = function () { var f = drbS().f; drkRide(typeof pts === "function" ? pts() : pts, sp, o.carry || null, o.seat || [0, 2.2, 0], function () { f._rode = 1; }, o); };
st.on = function (f) { f._rode = 0; setTimeout(st.reopen, window.SBK_FAST ? 20 : 700); };
return st;
},
function (after) {
var A = drwInAt("purfleet", 4), x = A.x, z = A.z, foes = [];
for (var i = 0; i < 10; i++)
foes.push({ kind: "rat", x: x - 4 + (i % 5) * 2, z: z - 8 + Math.floor(i / 5) * 2, hp: 10, lv: 2, dmg: 2, sp: 3.4, name: "a rat", wave: i < 6 ? 0 : 1 });
for (i = 0; i < 8; i++)
foes.push({ kind: "rat", x: x - 4 + (i % 4) * 2.6, z: z - 9, hp: 12, lv: 3, dmg: 2, sp: 3.6, name: "a rat", wave: 2 });
drwGo({ sc: "purfleet", x: x, z: z + 4, y: DRW_IN_Y, ry: 0 }, null, function () {
drkFight({ name: "The rats of Carfax", noDrop: 1, foes: foes, start: { sc: "purfleet", x: x, z: z + 4, y: DRW_IN_Y, ry: 0 }, say: drQ("The whole place was becoming alive with rats.") + " Strike them down while Arthur whistles for the dogs.",
waveSay: { 1: "More of them, out of the boxes and the walls.", 2: "The terriers are coming: a last rush of rats!" }, win: function () { setStatus("🐕 The terriers race round the chapel and the last of the rats are gone."); if (after)
after(); } });
});
},
function (after) {
var A = drwInAt("london", 0), x = A.x, z = A.z;
drwGo({ sc: "london", x: x, z: z + 2.4, y: DRW_IN_Y, ry: 0 }, null, function () {
drkFight({ name: "The Count, at Piccadilly", noDrop: 1, start: { sc: "london", x: x, z: z + 2.4, y: DRW_IN_Y, ry: 0 },
foes: [{ kind: "folk:count", x: x, z: z - 2.6, hp: 120, lv: 9, dmg: 8, sp: 1.9, name: "Count Dracula", boss: 1, flee: 1, dieSay: "🦇 " + drQ("You think to baffle me, you--with your pale faces all in a row, like sheep in a butcher's.") + " He leaps for the window, and is gone through the glass." }],
say: "He comes in with a panther-like movement. Strike at him (Jonathan's great Kukri knife): you cannot kill him here, but you can drive him off.",
win: function () { if (after)
after(); } });
});
}
];
});
