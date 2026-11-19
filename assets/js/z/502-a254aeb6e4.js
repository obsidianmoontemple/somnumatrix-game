/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(502, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (WQW.tex[k])
return WQW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = wqwLite();
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
return (WQW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (WQW.mats[k])
return WQW.mats[k];
var own = name.slice(0, 2) === "b:", map = wqwPhotoTex(name, mpt || 2), m;
if (wqwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = wqwPhotoTex(name, mpt || 2, true);
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
return (WQW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return wqwM(k, function () {
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
return wqwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return wqwCanvas("bamboo", 64, 256, function (x, W, H) {
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
wqwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return wqwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return wqwCanvas("tuft", 128, 64, function (x, W, H) {
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
return wqwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return wqwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
wqwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return wqwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = WQW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / WQW_CELL) + "," + Math.floor(z / WQW_CELL)];
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
p = dlnPerson("wqw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("wqw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || WQW.scG || WQW.G).add(p);
var P = { g: p, y: y, o: o };
WQW.people.push(P);
return P;
},
function (P, x0, z0, w, d, step, hfn, mat, cfn) {
var nx = Math.max(2, Math.round(w / step)), nz = Math.max(2, Math.round(d / step)), g = new THREE.PlaneGeometry(w, d, nx, nz);
g.rotateX(-Math.PI / 2);
var pa = g.attributes.position, uva = g.attributes.uv, col = new Float32Array(pa.count * 3), c = new THREE.Color();
for (var i = 0; i < pa.count; i++) {
var x = pa.getX(i) + x0 + w / 2, z = pa.getZ(i) + z0 + d / 2, y = hfn(x, z);
pa.setY(i, y);
uva.setXY(i, x - x0, z0 - z);
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
WQW.inst.push(m);
try {
m.computeBoundingSphere && m.computeBoundingSphere();
}
catch (e) { }
return m;
},
function (P, pts, w, hfn, mat, lift) {
if (hfn && pts.length > 1) {
var st = wqwLite() ? 8 : 4, rs = [pts[0]];
for (var j = 1; j < pts.length; j++) {
var p0 = pts[j - 1], p1 = pts[j], n = Math.max(1, Math.ceil(Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) / st));
for (var t = 1; t <= n; t++)
rs.push([p0[0] + (p1[0] - p0[0]) * t / n, p0[1] + (p1[1] - p0[1]) * t / n]);
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
if (mat && mat.vertexColors) {
var cl = new Float32Array(pos.length);
cl.fill(1);
g.setAttribute("color", new THREE.BufferAttribute(cl, 3));
}
var m = new THREE.Mesh(g, mat);
m.receiveShadow = true;
P.add(m);
return m;
},
function (P, kind, list, o) {
o = o || {};
if (!list || !list.length)
return;
var lite = wqwLite(), leaf = wqwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
wqwInst(P, wqwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), wqwMat("pale"), list, { shadow: !lite });
wqwInst(P, wqwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), wqwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
wqwInst(P, wqwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), wqwMat("bark"), list, { shadow: !lite });
wqwInst(P, wqwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), wqwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
wqwInst(P, wqwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), wqwMat("darkbark"), list, { shadow: !lite });
wqwInst(P, wqwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), wqwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
wqwInst(P, wqwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), wqwMat("bark"), list, { shadow: !lite });
wqwInst(P, wqwGeo("pfronds", function () { var g = wqwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), wqwLam(0xFFFFFF, { ds: 1, map: wqwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
wqwInst(P, wqwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), wqwMat("darkbark"), list, {});
wqwInst(P, wqwGeo("mfronds", function () { return wqwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), wqwLam(0xFFFFFF, { ds: 1, map: wqwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
wqwInst(P, wqwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), wqwMat("darkbark"), list, {});
wqwInst(P, wqwGeo("ffronds", function () { return wqwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), wqwLam(0xFFFFFF, { ds: 1, map: wqwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
wqwInst(P, wqwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), wqwMat("darkbark"), list, {});
wqwInst(P, wqwGeo("cyf", function () { return wqwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), wqwLam(0xFFFFFF, { ds: 1, map: wqwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
wqwInst(P, wqwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), wqwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: wqwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
wqwInst(P, wqwGeo("bamL", function () { return wqwCards(3, 2.6, 2.2, 5.4); }), wqwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
wqwInst(P, wqwGeo("reed" + kind, function () { return wqwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), wqwLam(0xFFFFFF, { ds: 1, map: wqwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
wqwInst(P, wqwGeo("tuft", function () { return wqwCards(2, 1.6, 0.7, 0); }), wqwLam(o.col || 0xFFFFFF, { ds: 1, map: wqwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
wqwInst(P, wqwGeo("flw", function () { return wqwCards(2, 0.9, 0.7, 0); }), wqwLam(0xFFFFFF, { ds: 1, map: wqwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
wqwInst(P, wqwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), wqwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
wqwInst(P, wqwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || wqwMat("rock"), list, {});
break;
}
case "cactus": {
wqwInst(P, wqwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), wqwLam(0x4A7A3A), list, {});
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
function (kind, col) { return wqwM("skinM" + kind + (col || ""), function () { var t = wqwSkinTex(kind); t.repeat.set(2, 2); var m = wqwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = wqwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(wqwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = wqwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(wqwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
wqwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return wqwGeo(k, function () {
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
var t = wqwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wqwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || wqwS("b:stucco", o.col || 0xF0E2C8, 3), trim = wqwLam(0xFAF6EE), sh = wqwLam(o.shut || 0x3A6A4A), glass = wqwShine(0x1A2228, 0.2, 0.3);
wqwBox(g, w, h, d, wall, 0, 0, 0);
wqwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
wqwBox(g, w + 0.12, 0.5, d + 0.12, wqwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(wqwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || wqwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
wqwBox(g, 1.3, 2.6, 0.12, wqwMat("oak"), wx, 0, d / 2 + 0.02);
wqwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = wqwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = wqwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!wqwLite())
[-1, 1].forEach(function (s) { wqwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
wqwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
wqwBox(g, 0.05, 0.9, 0.05, wqwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
wqwBox(g, 1.8, 0.05, 0.05, wqwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
wqwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (WQW.scG) {
if (WQW.scG.parent)
WQW.scG.parent.remove(WQW.scG);
WQW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
WQW.scG = null;
WQW.solids = [];
WQW.sgrid = null;
WQW.floors = [];
WQW.spots = [];
WQW.talk = [];
WQW.people = [];
WQW.beasts = [];
WQW.fx = [];
WQW.water = [];
WQW.inst = [];
WQW.hgt = null;
WQW.scBuilt = null;
if (typeof wqbSceneDrop === "function")
try {
wqbSceneDrop();
}
catch (e) { }
},
function (k) {
if (WQW.scBuilt === k && WQW.scG)
return;
wqwSceneDrop();
var D = WQW_SCN[k], S = WQW_SC[k];
if (!D || !S || !WQW.G)
return;
WQW.sc = k;
WQW.scG = new THREE.Group();
WQW.scG.position.x = S.x;
WQW.G.add(WQW.scG);
WQW.hgt = D.h || function () { return 0; };
try {
D.build(WQW.scG);
}
catch (e) {
if (window.console)
console.warn("[winters-heart] scene", k, e);
}
WQW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
WQW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = wqwAtPt(at);
if (!A)
return;
var v = wqwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
WQW.moving = true;
setTimeout(function () {
if (WLD.on !== WQW_KEY) {
v.style.opacity = "0";
WQW.moving = false;
return;
}
wqwScene(A.sc);
var S = WQW_SC[A.sc], y = A.y != null ? A.y : wqwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(WQW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(wqwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; WQW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(wqwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), wqwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; WQW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(wqwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), wqwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(wqwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), wqwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(wqwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), wqwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!wqwLite() && typeof THREE.PointLight === "function" && (WQW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
WQW.lights = (WQW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
WQW.fx.push(g);
return g;
},
function (k) {
switch (k) {
case "brick": return wqwS("brick", 0xC07A5E, 1.6);
case "yellowbrick": return wqwS("brick", 0xD8C098, 1.6);
case "ashlar": return wqwS("b:ashlar", 0xE8E0D0, 2.4);
case "stone": return wqwS("stone", 0xD0C8B8, 2.4);
case "slate": return wqwS("b:slate", 0x6A6E78, 2);
case "oak": return wqwS("b:oak", 0x8A5E3A, 1.4);
case "floor": return wqwS("b:oak", 0xA87A50, 1.8);
case "planks": return wqwS("b:planks", 0x9A8060, 2);
case "damask": return wqwS("b:damask", 0x8A3A3A, 1.2);
case "greenpaper": return wqwS("b:damask", 0x4A6A52, 1.2);
case "bluepaper": return wqwS("b:damask", 0x4A5A7A, 1.2);
case "velvet": return wqwS("b:velvet", 0x6A1E22, 0.8);
case "greenvelvet": return wqwS("b:velvet", 0x2E4A34, 0.8);
case "leather": return wqwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return wqwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return wqwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "plaster": return wqwS("plaster", 0xF0EAD8, 4);
case "ceiling": return wqwLam(0xEDE6D6);
case "brass": return wqwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "nickel": return wqwShine(0xD8DCE0, 0.25, 0.9);
case "iron": return wqwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "ivory": return wqwShine(0xF2EAD8, 0.35, 0.05);
case "quartz": return wqwM("quartz", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F4FF, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.55, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "granite": return wqwS("b:limestone", 0x9A948C, 4);
case "terracotta": return wqwS("b:terracotta", 0xC87A5A, 1.6);
case "earth": return wqwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return wqwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "lawn": return wqwS("grass", 0xA8C888, 4);
case "gravel": return wqwS("sand", 0xC8B898, 3);
case "paving": return wqwS("paving", 0xC8C0B0, 2.4);
case "road": return wqwS("asphalt", 0x8A8478, 5);
case "white": return wqwS("b:marble", 0xF8F6F2, 3, { shine: 30 });
case "bronze": return wqwS("b:brass", 0x7A6A3A, 1.6, { shine: 60 });
case "verdigris": return wqwS("b:brass", 0x6A9A8A, 1.6, { shine: 30 });
case "greystone": return wqwS("b:limestone", 0xB0ACA4, 4);
case "ruin": return wqwS("b:limestone", 0xA8A498, 4);
case "porcelain": return wqwS("b:darktile", 0x8AC8A8, 2, { shine: 90 });
case "rock": return wqwS("b:strata", 0x8A7A6A, 6);
case "redrock": return wqwS("b:strata", 0x8A3A2A, 8);
case "cave": return wqwS("b:cave", 0x7A746C, 4);
case "moss": return wqwS("b:moss", 0x7A9A5A, 3);
case "bark": return wqwS("bark", 0x8A7A64, 2.5);
case "darkbark": return wqwS("bark", 0x5A4E40, 3);
case "pale": return wqwS("bark", 0xC8BCA8, 3);
case "sand": return wqwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "snow": return wqwS("snow", 0xF4F6FA, 4);
}
return wqwS("earth", 0x8A7058, 5);
},
function (P, x, z, ry, mat, arm) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = wqwMat("oak");
if (arm) {
wqwBox(g, 0.9, 0.42, 0.85, mat, 0, 0, 0);
wqwBox(g, 0.9, 0.8, 0.22, mat, 0, 0.4, 0.34);
[-1, 1].forEach(function (k) { wqwBox(g, 0.18, 0.3, 0.85, mat, k * 0.4, 0.42, 0); });
wqwBox(g, 0.7, 0.1, 0.6, mat, 0, 0.42, -0.04);
}
else {
wqwBox(g, 0.46, 0.06, 0.46, mat, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { wqwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.2); });
wqwBox(g, 0.44, 0.56, 0.05, wd, 0, 0.5, 0.21);
}
return g;
},
function (P, x, z, w, h, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = wqwMat("oak"), R = wRand(Math.round(x * 7 + z * 13));
wqwBox(g, w, h, 0.36, wd, 0, 0, 0);
var n = Math.floor(h / 0.42);
for (var i = 0; i < n; i++) {
var y = 0.12 + i * 0.42, bx = -w / 2 + 0.1;
while (bx < w / 2 - 0.12) {
var bw = 0.04 + R() * 0.05, bh = 0.24 + R() * 0.12;
wqwBox(g, bw, bh, 0.24, wqwLam([0x6A1E1E, 0x1E3A2A, 0x2A2A4A, 0x5A3A1E, 0x8A6A3A, 0x3A1A2A][Math.floor(R() * 6)]), bx + bw / 2, y, -0.2);
bx += bw + 0.005;
}
}
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ag = wqwShine(0xE0E4E8, 0.25, 0.9);
wqwCyl(g, 0.015, 0.02, 0.5, ag, 0, 0, 0, 6);
[0, 1, 2].forEach(function (i) {
var a = i / 3 * 6.283, f = new THREE.Group();
f.position.set(Math.cos(a) * 0.14, 0.5, Math.sin(a) * 0.14);
f.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
g.add(f);
var c = new THREE.Mesh(wqwGeo("lilyc", function () { return new THREE.ConeGeometry(0.07, 0.14, 8, 1, true); }), ag);
c.rotation.x = Math.PI;
f.add(c);
var b = new THREE.Mesh(wqwGeo("lilyb", function () { return new THREE.SphereGeometry(0.035, 8, 6); }), wqwGlowM(0xFFF0C0));
b.position.y = -0.04;
f.add(b);
});
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), wqwM("rug" + col, function () {
var t = wqwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
wqwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
h = h || WQW_HOUSE.h1;
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
wqwBox(P, G[1], h - 2.4, 0.3, inner || mat, G[0], 2.4, z);
});
segs.forEach(function (s) { var w = s[1] - s[0]; if (w < 0.05)
return; wqwBox(P, w, h, 0.3, mat, (s[0] + s[1]) / 2, 0, z, 0, true); if (inner) {
wqwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z + 0.16);
wqwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z - 0.16);
} });
},
function (P, x, z0, z1, mat, inner, gaps, h) {
h = h || WQW_HOUSE.h1;
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
wqwBox(P, 0.3, h - 2.4, G[1], inner || mat, x, 2.4, G[0]);
});
segs.forEach(function (s) { var d = s[1] - s[0]; if (d < 0.05)
return; wqwBox(P, 0.3, h, d, mat, x, 0, (s[0] + s[1]) / 2, 0, true); });
},
function (P, x0, x1, z0, z1, mat, dx, dz) {
var H = WQW_HOUSE.h1 - 0.02, w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, wd = wqwMat("oak");
wqwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z0 + 0.17);
wqwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z1 - 0.17);
[x0 + 0.17, x1 - 0.17].forEach(function (x) {
var segs = [[z0 + 0.16, z1 - 0.16]];
if (dx != null && Math.abs(x - dx) < 0.5) {
segs = [[z0 + 0.16, dz - 0.65], [dz + 0.65, z1 - 0.16]];
wqwBox(P, 0.02, H - 2.4, 1.3, mat, x, 2.4, dz);
}
segs.forEach(function (sg) { var L = sg[1] - sg[0]; wqwBox(P, 0.02, H, L, mat, x, 0, (sg[0] + sg[1]) / 2); wqwBox(P, 0.04, 0.06, L, wd, x + (x < cx ? 0.02 : -0.02), 0.95, (sg[0] + sg[1]) / 2); wqwBox(P, 0.04, 0.18, L, wd, x + (x < cx ? 0.02 : -0.02), 0, (sg[0] + sg[1]) / 2); });
});
[z0 + 0.19, z1 - 0.19].forEach(function (z) { wqwBox(P, w - 0.34, 0.06, 0.04, wd, cx, 0.95, z); wqwBox(P, w - 0.34, 0.18, 0.04, wd, cx, 0, z); });
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
} }); g.userData.mats = mats; WQW.ghosts.push(g); return g; },
function (key, s) {
var g = new THREE.Group(), c = null;
try {
if (typeof crxOn === "function" && crxOn() && typeof crxHas === "function" && crxHas(key))
c = crxBuild(key);
}
catch (e) {
c = null;
}
if (!c) {
try {
if (key === "snowbear" && typeof npBear === "function")
c = npBear(0.55);
}
catch (e) { }
}
if (!c) {
c = new THREE.Group();
var M = wqwShine(key === "snowbear" ? 0xF2EEE2 : 0x8A8478, 0.8, 0);
var b = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 10), M);
b.scale.set(0.8, 0.75, 1.5);
b.position.y = 0.8;
c.add(b);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 9), M);
h.position.set(0, 1.0, 0.8);
c.add(h);
}
c.scale.multiplyScalar(s || 1);
g.add(c);
g.userData.crx = c.userData && c.userData.crx;
g.userData.crxAct = c.userData && c.userData.crxAct;
g.userData.beast = 1;
g.userData.live = 1;
return g;
},
function (seed, dress, o) {
o = o || {};
if (!dress || /^wqmod/.test(dress) || typeof dlnPerson !== "function") {
var lk = {};
if (o.skin != null)
lk.skin = o.skin;
if (o.hair != null)
lk.hair = o.hair;
return wPerson("wqw" + seed, { sex: o.sex, look: lk, child: o.child });
}
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("wqw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = WQW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : wqwGround(x, z, o.feet != null ? o.feet : 500);
var g = F.crx ? wqwCrx(F.crx, F.cs || 1) : wqwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
if (F.look)
try {
F.look(g);
}
catch (e) { }
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || WQW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
WQW.people.push(P);
if (!o.mute)
wqwTalk(P, F.name, wqwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
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
var d = f ? (o.dressF || o.dress) : o.dress, g = wqwDressed(seed + "c" + i, d, { sex: f ? "f" : "m", beard: !f && R() < (o.beardP == null ? 0.35 : o.beardP) ? (R() < 0.5 ? "full" : "mustache") : null, hair: o.hair ? o.hair(R) : null, skin: sk, child: o.childP && R() < o.childP });
if (o.look)
try {
o.look(g, R);
}
catch (e) { }
var y = wqwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
WQW.scG.add(g);
var P = { g: g, y: y, o: { wander: o.wander == null ? 10 : o.wander, sp: o.sp || 0.6 } };
WQW.people.push(P);
if (o.names && R() < (o.talkP == null ? 0.6 : o.talkP))
wqwTalk(P, o.names[i % o.names.length], wqwPersona(o.persona || "native"), (o.says || ["Good day to you."])[i % (o.says || [1]).length], 2.8);
out.push(P);
}
return out;
},
function (G, sc, i, W, D, H, o) {
o = o || {};
var A = wqwInAt(sc, i), g = new THREE.Group();
g.position.set(A.x, WQW_IN_Y, A.z);
G.add(g);
var wall = o.wall || wqwMat("plaster"), inner = o.paper || null;
wqwBox(g, W, 0.12, D, o.floor || wqwMat("floor"), 0, -0.12, 0);
wqwBox(g, W, 0.2, D, o.ceil || wqwMat("ceiling"), 0, H, 0);
wqwFloor(A.x, A.z, W, D, WQW_IN_Y);
var h0 = WQW_HOUSE.h1;
WQW_HOUSE.h1 = H;
try {
wqwWallZ(g, -D / 2, -W / 2, W / 2, wall, inner, o.gapN || [], H);
wqwWallZ(g, D / 2, -W / 2, W / 2, wall, inner, [[0, 1.6]], H);
wqwWallX(g, -W / 2, -D / 2, D / 2, wall, inner, [], H);
wqwWallX(g, W / 2, -D / 2, D / 2, wall, inner, [], H);
}
finally {
WQW_HOUSE.h1 = h0;
}
wqwBox(g, 1.6, 2.5, 0.06, wqwGlowM(o.day || 0xF4ECD8, 0.9), 0, 0, D / 2 + 0.2);
for (var k = 0; k < (W > 16 ? 4 : 2); k++) {
var lx = (k % 2 ? 1 : -1) * W * 0.3, lz = (k < 2 ? -1 : 1) * D * 0.25;
var c = wqwCyl(g, 0.05, 0.05, 0.5, wqwMat("brass"), lx, H - 0.5, lz, 6);
var b = new THREE.Mesh(wqwGeo("rlamp", function () { return new THREE.SphereGeometry(0.16, 10, 8); }), wqwGlowM(0xFFE8B8));
b.position.set(lx, H - 0.6, lz);
g.add(b);
}
wqwRoom(sc, A.x - W / 2, A.x + W / 2, A.z - D / 2, A.z + D / 2, o.env || "indoor");
var out = o.out;
wqwSpot(A.x, A.z + D / 2 - 0.8, 1.5, o.doorName || "The door", "go out", function () { var bk = WQW.back && WQW.back[sc + i]; if (bk)
out = bk; if (out)
wqwGo({ sc: sc, x: out.x, z: out.z, ry: out.ry }, null, typeof wqbPopulate === "function" ? wqbPopulate : null); }, WQW_IN_Y);
g.userData.A = A;
g.userData.W = W;
g.userData.D = D;
g.userData.H = H;
return g;
},
function (G, sc, i, x, z, ry, name, W, D, o) {
o = o || {};
var A = wqwInAt(sc, i), y = o.y != null ? o.y : wqwLand(x, z);
var dg = new THREE.Group();
dg.position.set(x, y, z);
dg.rotation.y = ry || 0;
G.add(dg);
if (!o.hide) {
wqwBox(dg, 1.7, 2.7, 0.14, o.frame || wqwMat("ashlar"), 0, 0, 0);
wqwBox(dg, 1.25, 2.35, 0.1, wqwLam(o.col || 0x4A2E1A), 0, 0.04, 0.07);
wqwBox(dg, 0.09, 0.09, 0.06, wqwMat("brass"), 0.42, 1.1, 0.15);
wqwBox(dg, 2.0, 0.16, 0.5, o.frame || wqwMat("ashlar"), 0, -0.02, 0.35);
}
var fx = x + Math.sin(ry || 0) * 1.6, fz = z + Math.cos(ry || 0) * 1.6;
wqwSpot(fx, fz, 1.7, name, "go in", function () { (WQW.back || (WQW.back = {}))[sc + i] = { x: fx, z: fz, ry: (ry || 0) + Math.PI }; WQW.lastBack = { sc: sc, x: fx, z: fz, ry: (ry || 0) + Math.PI }; wqwGo({ sc: sc, x: A.x, z: A.z + D / 2 - 2.2, y: WQW_IN_Y, ry: 0 }, o.msg || ("🚪 <b>" + name.replace(/^The door of /, "") + "</b>"), typeof wqbPopulate === "function" ? wqbPopulate : null); }, y);
return { x: fx, z: fz, ry: (ry || 0) };
},
function (G, sc, i, x, z, ry, name, room, o) {
o = o || {};
var W = room.W || 12, D = room.D || 10, H = room.H || 4;
var dw = o.door != null ? o.door : 0, ca = Math.cos(ry || 0), sa = Math.sin(ry || 0), front = o.front != null ? o.front : (o.d || 10) / 2 + 0.08;
var dx = x + sa * front + ca * dw, dz = z + ca * front - sa * dw;
var d = wqwDoorTo(G, sc, i, dx, dz, ry, name, W, D, o);
var g = wqwRoomBuild(G, sc, i, W, D, H, Object.assign({}, room, { out: { x: d.x, z: d.z, ry: (ry || 0) + Math.PI }, doorName: "The door, out to " + (o.outName || "the street") }));
if (room.fill)
try {
room.fill(g, W, D, H, wqwInAt(sc, i));
}
catch (e) {
if (window.console)
console.warn("[winters-heart] room", name, e);
}
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = wqwMat("oak");
wqwBox(g, 1.6, 0.5, 2.1, wd, 0, 0, 0);
wqwBox(g, 1.5, 0.22, 2.0, wqwLam(0xF2EEE4), 0, 0.5, 0);
wqwBox(g, 1.52, 0.08, 1.3, wqwLam(col || 0x6A2A2A), 0, 0.72, 0.35);
wqwBox(g, 1.2, 0.16, 0.4, wqwLam(0xFAF8F2), 0, 0.72, -0.75);
wqwBox(g, 1.7, 1.4, 0.1, wd, 0, 0, -1.05);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { wqwBox(g, 0.08, 2.2, 0.08, wd, q[0] * 0.78, 0, q[1] * 1.02); });
wqwBox(g, 1.7, 0.3, 2.2, wqwLam(col || 0x6A2A2A), 0, 2.2, 0);
return g;
},
function (P, x, z, s, sky) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
s = s || 1;
var wd = wqwMat("oak");
[0, 1, 2].forEach(function (i) { var a = i / 3 * 6.283; var l = wqwBox(g, 0.05 * s, 0.8 * s, 0.05 * s, wd, Math.cos(a) * 0.32 * s, 0, Math.sin(a) * 0.32 * s); l.rotation.z = Math.cos(a) * 0.2; });
var t = wqwCanvas(sky ? "gl:sky" : "gl:earth", 256, 128, function (c, W, H) {
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
var b = new THREE.Mesh(wqwGeo("globe", function () { return new THREE.SphereGeometry(0.36, 24, 16); }), wqwLam(0xFFFFFF, { map: t, mapk: sky ? "gl:sky" : "gl:earth" }));
b.scale.setScalar(s);
b.position.y = 1.05 * s;
b.rotation.z = 0.4;
g.add(b);
var m = new THREE.Mesh(wqwGeo("gmer", function () { return new THREE.TorusGeometry(0.4, 0.015, 6, 32); }), wqwMat("brass"));
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
[-1, 1].forEach(function (k) { var l = wqwBox(g, 0.06, 1.3, 0.06, wqwMat("oak"), k * 0.4, 0, 0); l.rotation.z = k * 0.25; });
wqwBox(g, 0.06, 1.3, 0.06, wqwMat("oak"), 0, 0, -0.45).rotation.x = -0.3;
var t = new THREE.Mesh(wqwGeo("tscope" + len, function () { var c = new THREE.CylinderGeometry(0.07, 0.13, len, 12); c.rotateX(Math.PI / 2); return c; }), wqwMat("brass"));
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
wqwBox(g, 0.5, 1.0, 0.5, wqwMat("oak"), 0, 0, 0);
var q = new THREE.Mesh(wqwGeo("quad", function () { return new THREE.RingGeometry(0.55, 0.7, 16, 1, 0, Math.PI / 2); }), wqwM("quadm", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE0B050, shininess: 80, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
q.position.set(-0.3, 1.05, 0);
g.add(q);
wqwBox(g, 0.04, 0.7, 0.04, wqwMat("brass"), -0.3, 1.0, 0).rotation.z = -0.7;
return g;
},
function (g, W, D, kind, seed) {
var R = wRand(seed || 7);
if (kind === "home") {
wqwRug(g, 0, 0, W * 0.5, D * 0.45, [0x6A2A2A, 0x2A3A6A, 0x5A4A2A][Math.floor(R() * 3)]);
var t = wqwTable(g, 0, -0.4, 1.8, 1.0, 0.78, wqwMat("oak"));
[-1, 1].forEach(function (k) { wqwChair(g, k * 1.2, -0.4, k * Math.PI / 2, wqwMat("velvet")); });
wqwBed(g, W / 2 - 1.3, -D / 2 + 1.4, 0);
wqwChest(g, -W / 2 + 1.0, -D / 2 + 0.6, 0);
wqwShelves(g, -W / 2 + 0.3, 1.0, 2.2, 2.2, Math.PI / 2);
}
else if (kind === "poor") {
wqwTable(g, 0, 0, 1.4, 0.8, 0.74, wqwMat("planks"));
wqwChair(g, 0.9, 0, Math.PI / 2, wqwMat("planks"));
wqwBox(g, 1.8, 0.35, 0.9, wqwMat("planks"), W / 2 - 1.2, 0, -D / 2 + 0.8);
wqwBox(g, 1.7, 0.1, 0.8, wqwLam(0x8A7A60), W / 2 - 1.2, 0.35, -D / 2 + 0.8);
wqwChest(g, -W / 2 + 0.8, -D / 2 + 0.6, 0);
wqwFire(g, -W / 2 + 1.0, 0, D / 2 - 1.4, 0.6);
}
else if (kind === "shop") {
wqwBox(g, W * 0.7, 0.95, 0.7, wqwMat("oak"), 0, 0, -D / 2 + 1.6);
wqwShelves(g, 0, -D / 2 + 0.3, W * 0.8, 2.6, 0);
wqwChair(g, W / 2 - 1, 0.5, -Math.PI / 2, wqwMat("oak"));
}
else if (kind === "east") {
wqwBox(g, W * 0.8, 0.06, D * 0.7, wqwLam(0xC8B888), 0, 0, 0);
for (var i = 0; i < 4; i++)
wqwBox(g, 0.9, 0.12, 0.9, wqwLam([0x8A2A2A, 0x2A4A6A, 0x6A5A2A, 0x3A5A3A][i]), -1.5 + i, 0.06, -0.8);
wqwBox(g, 1.2, 0.35, 0.8, wqwLam(0x2A1A10), 0, 0, 0.2);
wqwBox(g, 0.5, 1.4, 0.04, wqwLam(0xF0E8D8), -W / 2 + 1.2, 0, -D / 2 + 0.3);
}
},
function (list) {
if (THREE.BufferGeometryUtils && THREE.BufferGeometryUtils.mergeBufferGeometries)
return THREE.BufferGeometryUtils.mergeBufferGeometries(list.map(function (g) { return g.index ? g.toNonIndexed() : g; }));
var pos = [], nrm = [], uv = [];
list.forEach(function (g) { g = g.index ? g.toNonIndexed() : g; pos.push.apply(pos, g.attributes.position.array); nrm.push.apply(nrm, g.attributes.normal.array); if (g.attributes.uv)
uv.push.apply(uv, g.attributes.uv.array);
else
for (var i = 0; i < g.attributes.position.count * 2; i++)
uv.push(0); });
var o = new THREE.BufferGeometry();
o.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
o.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
o.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
return o;
},
function (P, o) {
o = o || {};
var g = new THREE.Group();
P.add(g);
[[0xF4F0FF, 60, [-900, 620, -1400]], [0xBFD8FF, 34, [400, 520, -1600]], [0xFFD8E8, 22, [1300, 700, -900]]].forEach(function (q, i) {
if (o.n && i >= o.n)
return;
var m = new THREE.Mesh(new THREE.SphereGeometry(q[1], 20, 14), new THREE.MeshBasicMaterial({ color: q[0], fog: false }));
m.position.set(q[2][0], q[2][1], q[2][2]);
g.add(m);
var h = new THREE.Mesh(new THREE.SphereGeometry(q[1] * 2.4, 16, 10), new THREE.MeshBasicMaterial({ color: q[0], fog: false, transparent: true, opacity: 0.12, depthWrite: false }));
h.position.copy(m.position);
g.add(h);
});
g.userData.keep = 1;
return g;
},
function (P, x, y, z, h, col, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var M = wqwM("crys" + col, function () { var m = new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.25, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.86, flatShading: true }); m.userData.noPhoto = 1; return m; });
var R = wRand(Math.round(x * 3 + z * 7)), n = o.n || 5;
for (var i = 0; i < n; i++) {
var hh = h * (i ? 0.35 + R() * 0.45 : 1), r = hh * 0.12, c = new THREE.Mesh(wqwGeo("crysG", function () { var k = new THREE.CylinderGeometry(0, 1, 1, 6, 1); k.translate(0, 0.5, 0); var b = new THREE.CylinderGeometry(1, 1, 1, 6, 1); b.translate(0, -0.5, 0); return wqwMerge([k, b]); }), M);
c.scale.set(r, hh * 0.5, r);
c.position.set(i ? (R() - 0.5) * h * 0.3 : 0, hh * 0.5, i ? (R() - 0.5) * h * 0.3 : 0);
c.rotation.set(i ? (R() - 0.5) * 0.5 : 0, R() * 3, i ? (R() - 0.5) * 0.5 : 0);
g.add(c);
}
if (o.solid !== false)
wqwRound(x, z, Math.max(0.6, h * 0.12));
return g;
},
function (P, list, o) {
o = o || {};
var lite = wqwLite(), leaf = wqwLeafTex();
if (lite && list.length > 40)
list = list.filter(function (t, i) { return i % 2 === 0; });
wqwInst(P, wqwGeo("atrunk", function () { var g = new THREE.CylinderGeometry(0.4, 0.9, 12, 8); g.translate(0, 6, 0); return g; }), wqwShine(o.bark || 0xE8E0F0, 0.35, 0.3), list, { shadow: !lite });
wqwInst(P, wqwGeo("acrown", function () { var parts = [], R = wRand(9); for (var i = 0; i < (lite ? 5 : 9); i++) {
var c = new THREE.IcosahedronGeometry(2.6 + R() * 1.8, 1);
c.translate((R() - 0.5) * 6, 11 + R() * 4, (R() - 0.5) * 6);
parts.push(c.index ? c.toNonIndexed() : c);
} return wqwMerge(parts); }), wqwM("aleaf" + (o.leaf || 0), function () { var m = new THREE.MeshLambertMaterial({ color: o.leaf || 0x8A6AE8, emissive: o.leaf || 0x8A6AE8, emissiveIntensity: o.glow != null ? o.glow : 0.35, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
list.forEach(function (t) { wqwRound(t.x, t.z, 0.9); });
},
function (P, list, cols) {
cols = cols || [0xFF8AE8, 0x8AE8FF, 0xFFE88A, 0xB88AFF, 0x8AFFB8];
cols.forEach(function (col, k) {
var part = list.filter(function (t, i) { return i % cols.length === k; });
if (!part.length)
return;
wqwInst(P, wqwGeo("aflow", function () { var s = new THREE.CylinderGeometry(0.015, 0.02, 0.5, 4); s.translate(0, 0.25, 0); var b = new THREE.IcosahedronGeometry(0.12, 0); b.translate(0, 0.55, 0); return wqwMerge([s, b]); }), wqwGlowM(col, 0.95), part, {});
});
},
function (P, x, z, h, col, ry, o) {
o = o || {};
var y = o.y != null ? o.y : wqwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var st = wqwBox(g, 1.2 * h / 3, h, 0.6 * h / 3, wqwMat("greystone"), 0, -0.2, 0);
var t = wqwCanvas("runes" + col, 128, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
var R = wRand(col % 997);
c.strokeStyle = "#" + ("000000" + col.toString(16)).slice(-6);
c.lineWidth = 5;
c.shadowColor = c.strokeStyle;
c.shadowBlur = 10;
for (var i = 0; i < 6; i++) {
var cy = 24 + i * 38;
c.beginPath();
c.moveTo(W / 2 - 20, cy);
for (var j = 0; j < 4; j++)
c.lineTo(W / 2 + (R() - 0.5) * 50, cy + (R() - 0.2) * 28);
c.stroke();
}
});
var rm = new THREE.Mesh(new THREE.PlaneGeometry(0.8 * h / 3, h * 0.85), wqwM("runeM" + col, function () { var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }); m.userData.noPhoto = 1; return m; }));
rm.position.set(0, h / 2 - 0.2, 0.3 * h / 3 + 0.02);
g.add(rm);
var rb = rm.clone();
rb.rotation.y = Math.PI;
rb.position.z = -rb.position.z;
g.add(rb);
wqwRound(x, z, 0.6 * h / 3);
return g;
},
function (P, n, x, z, r, y0, y1, col) {
var R = wRand(n * 7 + r), pos = [];
for (var i = 0; i < n; i++)
pos.push((R() - 0.5) * 2 * r, y0 + R() * (y1 - y0), (R() - 0.5) * 2 * r);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
var m = new THREE.PointsMaterial({ color: col || 0xE8D8FF, size: 0.35, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending });
if (typeof wqxHaloTex === "function") {
m.map = wqxHaloTex();
m.size = 0.5;
}
var p = new THREE.Points(g, m);
p.position.set(x, 0, z);
p.userData.sp = 0.02;
P.add(p);
WQW.spin.push(p);
return p;
},
function (P, x, y, z, r, col, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var ring = new THREE.Mesh(new THREE.TorusGeometry(r, r * 0.06, 10, 48), wqwGlowM(col, 0.95));
g.add(ring);
var t = wqwCanvas("swirl" + col, 256, 256, function (c, W, H) {
var cs = "#" + ("000000" + col.toString(16)).slice(-6), gr = c.createRadialGradient(W / 2, H / 2, 4, W / 2, H / 2, W / 2);
gr.addColorStop(0, "rgba(255,255,255,.9)");
gr.addColorStop(0.35, cs);
gr.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(255,255,255,.35)";
c.lineWidth = 3;
for (var i = 0; i < 6; i++) {
c.beginPath();
for (var a = 0; a < 9; a += 0.1) {
var rr = a * 12;
c.lineTo(W / 2 + Math.cos(a + i) * rr, H / 2 + Math.sin(a + i) * rr);
}
c.stroke();
}
});
var disc = new THREE.Mesh(new THREE.CircleGeometry(r * 0.96, 40), wqwM("swirlM" + col, function () { var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }); m.userData.noPhoto = 1; return m; }));
var sp = new THREE.Group();
sp.add(disc);
sp.userData.sp = 0.4;
g.add(sp);
WQW.spin.push(sp);
sp.rotation.x = 0;
disc.rotation.y = 0;
sp.rotation.order = "YXZ";
sp.userData.axis = "z";
g.userData.live = 1;
return g;
},
function () { return wqwCanvas("wqxHalo", 128, 128, function (c, W, H) { var g = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.18, "rgba(255,240,210,.55)"); g.addColorStop(0.5, "rgba(255,210,150,.16)"); g.addColorStop(1, "rgba(255,200,140,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); }); },
function (P, L, size) {
if (!L || !L.pos.length)
return null;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(L.pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(L.col, 3));
var m = new THREE.PointsMaterial({ size: size || 0.7, map: wqxHaloTex(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
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
var wax = wqwLam(o.wax || 0xF2E6CE), fl = wqwGlowM(o.flame || 0xFFC860);
wqwInst(P, wqwGeo("wqxWax", function () { var g = new THREE.CylinderGeometry(0.035, 0.04, 1, 8); g.translate(0, 0.5, 0); return g; }), wax, list.map(function (c) { return { x: c.x, y: c.y, z: c.z, sx: c.s || 1, sz: c.s || 1, sy: c.h || 0.18 }; }));
wqwInst(P, wqwGeo("wqxFlame", function () { var g = new THREE.SphereGeometry(0.03, 6, 5); g.scale(1, 2.2, 1); return g; }), fl, list.map(function (c) { return { x: c.x, y: c.y + (c.h || 0.18) + 0.05, z: c.z }; }));
list.forEach(function (c) { wqxGlow(L, c.x, c.y + (c.h || 0.18) + 0.06, c.z, o.halo || 0xFFB860, o.hs || 0.55); });
},
function (P, x, y, z, ry, L, cl) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var b = wqxBrass();
var bp = new THREE.Mesh(wqwGeo("wqxBP", function () { var s = new THREE.SphereGeometry(0.16, 10, 8); s.scale(1, 1.6, 0.25); return s; }), b);
bp.position.z = 0.03;
g.add(bp);
var arm = new THREE.Mesh(wqwGeo("wqxArm", function () { return new THREE.TorusGeometry(0.18, 0.018, 6, 16, Math.PI); }), b);
arm.rotation.set(0, Math.PI / 2, Math.PI / 2);
arm.position.set(0, -0.02, 0.2);
g.add(arm);
var cups = [];
[-0.16, 0.16].forEach(function (dx) { var cu = new THREE.Mesh(wqwGeo("wqxCup", function () { return new THREE.CylinderGeometry(0.06, 0.03, 0.05, 10); }), b); cu.position.set(dx, 0.12, 0.24); g.add(cu); cups.push(new THREE.Vector3(dx, 0.15, 0.24)); });
g.updateMatrixWorld(true);
var inv = new THREE.Matrix4();
P.updateMatrixWorld(true);
inv.copy(P.matrixWorld).invert();
if (cl)
cups.forEach(function (v) { var w = v.clone().applyMatrix4(g.matrixWorld).applyMatrix4(inv); cl.push({ x: w.x, y: w.y, z: w.z }); });
return g;
},
function (P, x, y, z, r, tiers, L, cl, ceil) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var b = wqxBrass(), lite = wqwLite(), cry = wqwShine(0xF4F8FF, 0.05, 0.2);
if (ceil != null) {
var ch = new THREE.Mesh(wqwGeo("wqxChain", function () { return new THREE.CylinderGeometry(0.02, 0.02, 1, 5); }), b);
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
var a2 = i / 4 * Math.PI * 2, sp = new THREE.Mesh(wqwGeo("wqxSpoke", function () { return new THREE.CylinderGeometry(0.015, 0.015, 1, 4); }), b);
sp.scale.y = rr;
sp.rotation.z = Math.PI / 2;
sp.rotation.y = -a2;
sp.position.set(Math.cos(a2) * rr / 2, yy, Math.sin(a2) * rr / 2);
g.add(sp);
}
}
var bowl = new THREE.Mesh(wqwGeo("wqxBowl", function () { var s = new THREE.SphereGeometry(0.3, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); return s; }), b);
bowl.position.y = -(tiers - 1) * 0.55 - 0.1;
g.add(bowl);
var fin = new THREE.Mesh(wqwGeo("wqxFinial", function () { return new THREE.OctahedronGeometry(0.12, 0); }), cry);
fin.scale.y = 2;
fin.position.y = bowl.position.y - 0.45;
g.add(fin);
wqwInst(g, wqwGeo("wqxDrop", function () { var o = new THREE.OctahedronGeometry(0.05, 0); o.scale(1, 2, 1); return o; }), cry, drops);
wqxGlow(L, x, y - 0.4, z, 0xFFD8A0, r * 2.6);
return g;
},
function (w, h, folds, depth) {
var k = "wqxDr" + w.toFixed(1) + "|" + h.toFixed(1) + "|" + folds + "|" + depth;
return wqwGeo(k, function () {
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
var m = new THREE.Mesh(wqxDrapeGeo(w, h, Math.max(2, Math.round(w * (o.fold || 1.6))), o.depth || 0.12), mat);
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
if (o.fringe) {
var f = new THREE.Mesh(wqwBoxG(w, 0.12, 0.06), wqxGilt());
f.position.set(0, -h - 0.04, 0.02);
m.add(f);
}
if (o.tie) {
var t = new THREE.Mesh(wqwBoxG(Math.min(0.5, w * 0.5), 0.07, 0.34), wqxGilt());
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
var t = new THREE.Mesh(new THREE.TorusGeometry(w / 2, 0.03, 4, 24, Math.PI), wqxGilt());
t.rotation.copy(g.rotation);
t.scale.set(1, (drop + 0.16) * 2 / w, 0.6);
t.position.set(x, y, z);
P.add(t);
return g;
},
function (tint) {
var key = "wqxMirG" + (tint || "warm");
return wqwM(key, function () {
var t = wqwCanvas(key + "T", 128, 256, function (c, W, H) {
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
var gi = wqxGilt();
var gl = new THREE.Mesh(wqwGeo(o.oval ? "wqxMirOv" : "wqxMirRe", function () { return o.oval ? new THREE.CircleGeometry(0.5, 32) : new THREE.PlaneGeometry(1, 1); }), wqxMirrorGlassM(o.tint));
gl.scale.set(w, h, 1);
gl.position.set(0, h / 2, 0.04);
g.add(gl);
if (o.oval) {
var fr = new THREE.Mesh(wqwGeo("wqxMirOvF", function () { return new THREE.TorusGeometry(0.5, 0.05, 8, 40); }), gi);
fr.scale.set(w, h, 1);
fr.position.set(0, h / 2, 0.05);
g.add(fr);
}
else {
[[0, h, w + 0.24, 0.16], [0, -0.04, w + 0.24, 0.14]].forEach(function (b) { wqwBox(g, b[2], b[3], 0.1, gi, b[0], b[1] - b[3] / 2, 0.04); });
[-1, 1].forEach(function (s) { wqwBox(g, 0.12, h, 0.1, gi, s * (w / 2 + 0.06), 0, 0.04); });
var cr = new THREE.Mesh(wqwGeo("wqxCrest", function () { return new THREE.TorusKnotGeometry(0.14, 0.035, 40, 6, 2, 3); }), gi);
cr.position.set(0, h + 0.22, 0.06);
cr.scale.set(1.4, 0.8, 0.4);
g.add(cr);
}
return g;
},
function (P, w, d, H, o) {
o = o || {};
var wood = o.wood || wqwS("b:oak", 0x3A1E10, 1.4), gi = o.trim || wqxGilt(), h0 = o.h0 || 1.2, step = o.step || 4, skip = o.skip || [];
function inGap(side, u) { return skip.some(function (s) { return s[0] === side && Math.abs(u - s[1]) < (s[2] || 1.2); }); }
[["n", -d / 2, 1], ["s", d / 2, -1]].forEach(function (S) {
for (var u = -w / 2 + 0.5; u < w / 2 - 0.4; u += 1) {
if (inGap(S[0], u + 0.5))
continue;
wqwBox(P, 1, h0, 0.08, wood, u + 0.5, 0, S[1] + S[2] * 0.04);
}
wqwBox(P, w, 0.08, 0.12, gi, 0, h0, S[1] + S[2] * 0.06);
wqwBox(P, w, 0.3, 0.24, gi, 0, H - 0.3, S[1] + S[2] * 0.12);
for (u = -w / 2 + step / 2; u < w / 2; u += step) {
if (inGap(S[0], u))
continue;
wqwBox(P, 0.36, H - h0 - 0.3, 0.16, gi, u, h0 + 0.08, S[1] + S[2] * 0.08);
}
});
[["w", -w / 2, 1], ["e", w / 2, -1]].forEach(function (S) {
for (var u = -d / 2 + 0.5; u < d / 2 - 0.4; u += 1) {
if (inGap(S[0], u + 0.5))
continue;
wqwBox(P, 0.08, h0, 1, wood, S[1] + S[2] * 0.04, 0, u + 0.5);
}
wqwBox(P, 0.12, 0.08, d, gi, S[1] + S[2] * 0.06, h0, 0);
wqwBox(P, 0.24, 0.3, d, gi, S[1] + S[2] * 0.12, H - 0.3, 0);
for (u = -d / 2 + step / 2; u < d / 2; u += step) {
if (inGap(S[0], u))
continue;
wqwBox(P, 0.16, H - h0 - 0.3, 0.36, gi, S[1] + S[2] * 0.08, h0 + 0.08, u);
}
});
},
function (P, x, y, z, len, r0, r1, col, op, tx, ty, tz) {
var q = Math.max(0.02, Math.min(1, r0 / r1)).toFixed(2);
var m = new THREE.Mesh(wqwGeo("wqxShaft" + q, function () { var g = new THREE.CylinderGeometry(+q, 1, 1, 24, 1, true); g.translate(0, -0.5, 0); return g; }), wqwM("wqxShaftM" + col + "|" + op, function () {
var t = wqwCanvas("wqxShaftT", 16, 128, function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); });
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
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 32), wqwM("wqxPool" + col + "|" + op, function () { var mm = new THREE.MeshBasicMaterial({ color: col, map: wqxHaloTex(), transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending }); mm.userData.noPhoto = 1; return mm; }));
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
var c = new THREE.Mesh(wqwGeo("wqxCloth" + r, function () { var pts = [new THREE.Vector2(0, 0.78), new THREE.Vector2(r, 0.78), new THREE.Vector2(r + 0.04, 0.74), new THREE.Vector2(r + 0.12, 0.4), new THREE.Vector2(r + 0.2, 0.02), new THREE.Vector2(r + 0.21, 0)]; var gg = new THREE.LatheGeometry(pts, 28); return gg; }), cloth);
g.add(c);
wqxLamp(g, 0, 0.78, 0, null);
wqxGlow(L, x, 0.98, z, 0xFFB050, 0.9);
if (o.wine !== false)
[[0.3, 0.2], [-0.28, -0.18]].forEach(function (p) { var w = new THREE.Mesh(wqwGeo("wqxGlass", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.04, 0), new THREE.Vector2(0.006, 0.01), new THREE.Vector2(0.006, 0.09), new THREE.Vector2(0.045, 0.13), new THREE.Vector2(0.05, 0.2)], 10); }), wqiIce(0x8A1A24, { op: 0.75 })); w.position.set(p[0], 0.78, p[1]); g.add(w); });
return g;
},
function (P, x, y, z, L, col) {
wqwCyl(P, 0.05, 0.05, 0.18, wqxBrass(), x, y, z, 8);
var sh = new THREE.Mesh(wqwGeo("wqxShade", function () { return new THREE.CylinderGeometry(0.07, 0.14, 0.14, 12, 1, true); }), wqwM("wqxShadeM" + (col || ""), function () { var m = new THREE.MeshBasicMaterial({ color: col || 0xFFB050, side: THREE.DoubleSide, transparent: true, opacity: 0.95 }); m.userData.noPhoto = 1; return m; }));
sh.position.set(x, y + 0.24, z);
P.add(sh);
if (L)
wqxGlow(L, x, y + 0.22, z, col || 0xFFB050, 1.0);
return sh;
},
function (P, cx, cy, cz, rx, ry, rz, n, seed, cols) {
var R = wRand(seed || 77);
(cols || [0xB8281A, 0xE0A030, 0xC8601A]).forEach(function (col, ci) {
var list = [];
for (var i = 0; i < Math.round(n / 3); i++)
list.push({ x: cx + (R() - 0.5) * rx * 2, y: cy + R() * ry, z: cz + (R() - 0.5) * rz * 2, rx: R() * 6, ry: R() * 6, rz: R() * 6, s: 0.7 + R() * 0.6 });
wqwInst(P, wqwGeo("wqxLeaf", function () { var s = new THREE.Shape(); s.moveTo(0, -0.08); s.quadraticCurveTo(0.07, 0, 0, 0.09); s.quadraticCurveTo(-0.07, 0, 0, -0.08); return new THREE.ShapeGeometry(s); }), wqwLam(col, { ds: 1, e: ci === 1 ? 0x3A2008 : 0x200804 }), list);
});
},
function (kind) {
return wqwGeo("wqxT_" + kind, function () {
var R = wRand(kind.length * 131 + 7), parts = [], lite = wqwLite();
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
return wqwGeo("wqxC_" + kind + (wqwLite() ? "L" : ""), function () {
var R = wRand(kind.length * 977 + 3), parts = [], lite = wqwLite();
var n = kind === "oak" ? (lite ? 16 : 44) : kind === "birch" ? (lite ? 10 : 26) : kind === "pine" ? (lite ? 10 : 24) : (lite ? 16 : 40), cx = kind === "oak" ? 5.4 : kind === "birch" ? 2.4 : kind === "pine" ? 2.6 : 3.8, cy = kind === "oak" ? 3.4 : kind === "birch" ? 4 : kind === "pine" ? 7 : 4.2, y0 = kind === "oak" ? 10.5 : kind === "birch" ? 12 : kind === "pine" ? 9 : 11.5;
for (var i = 0; i < n; i++) {
var u = R() * Math.PI * 2, v = Math.acos(2 * R() - 1), rr = 0.55 + R() * 0.45, x = Math.sin(v) * Math.cos(u) * cx * rr, y = Math.cos(v) * cy * rr, z = Math.sin(v) * Math.sin(u) * cx * rr;
if (kind === "pine") {
var t = (y / cy + 1) / 2;
x *= 1 - t;
z *= 1 - t;
}
var s = (kind === "oak" ? 2.4 : kind === "birch" ? 1.6 : 2.0) * (0.7 + R() * 0.5), c = wqwCards(2, s, s, -s / 2, 0);
c.rotateX((R() - 0.5) * 1.2);
c.rotateZ((R() - 0.5) * 1.2);
c.rotateY(R() * 3);
c.translate(x, y0 + y, z);
parts.push(c);
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
var lite = wqwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
var bark = kind === "birch" ? wqwS("b:limestone", 0xE8E4DC, 1.2) : wqwMat("bark");
wqwInst(P, wqxTreeGeo(kind), bark, list, { shadow: !lite });
(cols || [0x3A6A2A]).forEach(function (col, k) { var sub = list.filter(function (t, i) { return i % cols.length === k; }); if (sub.length)
wqwInst(P, wqxCrownGeo(kind), wqxLeafM(col), sub, {}); });
if (!o.noSolid)
list.forEach(function (t) { wqwRound(t.x, t.z, 0.6 * (t.s || 1), (t.y || 0) - 1, (t.y || 0) + 6); });
},
function (kind) {
return wqwCanvas("wqxSG" + kind, 128, 320, function (c, W, H) {
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
var ir = wqwShine(0x1A1A1A, 0.6, 0.6);
wqwCyl(P, 0.06, 0.09, h, ir, x, y, z, 8);
wqwBox(P, 0.34, 0.06, 0.34, ir, x, y + h, z);
var gl = new THREE.Mesh(wqwBoxG(0.26, 0.36, 0.26), wqwGlowM(0xFFC070, 0.92));
gl.position.set(x, y + h + 0.24, z);
P.add(gl);
var cap = new THREE.Mesh(wqwGeo("lanCap", function () { return new THREE.ConeGeometry(0.26, 0.22, 4); }), ir);
cap.rotation.y = Math.PI / 4;
cap.position.set(x, y + h + 0.53, z);
P.add(cap);
wqxGlow(L, x, y + h + 0.24, z, 0xFFB060, 2.2);
},
function () {
return wqwGeo("wqfFlameG", function () {
var gs = [];
for (var i = 0; i < 3; i++) {
var p = new THREE.PlaneGeometry(1, 1, 1, 6);
p.translate(0, 0.5, 0);
p.rotateY(i * Math.PI / 3);
gs.push(p);
}
var n = 0;
gs.forEach(function (g) { n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), uv = new Float32Array(n * 2), idx = [], o = 0;
gs.forEach(function (g) { pos.set(g.attributes.position.array, o * 3); uv.set(g.attributes.uv.array, o * 2); var ix = g.index.array; for (var k = 0; k < ix.length; k++)
idx.push(ix[k] + o); o += g.attributes.position.count; });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
G.setIndex(idx);
return G;
});
},
function (k) {
k = k || "blue";
return wqwM("wqfFlameM" + k, function () {
var C = { blue: [0x0A2AA8, 0x2E8CFF, 0xDDF6FF], pale: [0x1A50C8, 0x6CC4FF, 0xF4FCFF] }[k] || [0x0A2AA8, 0x2E8CFF, 0xDDF6FF];
var m = new THREE.ShaderMaterial({ uniforms: { time: WQF_U.time, cE: { value: new THREE.Color(C[0]) }, cM: { value: new THREE.Color(C[1]) }, cC: { value: new THREE.Color(C[2]) } },
vertexShader: "#include <common>\n#include <logdepthbuf_pars_vertex>\nvarying vec2 vUv; varying float vSeed; uniform float time; void main(){ vUv=uv; vec4 w=modelMatrix*vec4(0.,0.,0.,1.); vSeed=fract(sin(dot(mod(w.xz,97.),vec2(12.9898,78.233)))*43758.5453)*20.;" +
" vec3 p=position; float h=uv.y*uv.y; p.x+=sin(time*3.1+vSeed+uv.y*4.)*0.07*h; p.z+=cos(time*2.7+vSeed*1.3+uv.y*3.)*0.07*h; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);\n#include <logdepthbuf_vertex>\n}",
fragmentShader: "#include <common>\n#include <logdepthbuf_pars_fragment>\nvarying vec2 vUv; varying float vSeed; uniform float time; uniform vec3 cE; uniform vec3 cM; uniform vec3 cC;" +
" float hs2(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }" +
" float ns(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hs2(i),hs2(i+vec2(1.,0.)),f.x),mix(hs2(i+vec2(0.,1.)),hs2(i+vec2(1.,1.)),f.x),f.y); }" +
" float fb(vec2 p){ return ns(p)*0.55+ns(p*2.1)*0.28+ns(p*4.3)*0.17; }" +
" void main(){\n#include <logdepthbuf_fragment>\n vec2 p=vUv; float t=time*1.6+vSeed; float n=fb(vec2(p.x*3.2+vSeed,p.y*2.6-t*1.9)); float n2=fb(vec2(p.x*6.+vSeed*2.,p.y*5.-t*3.1));" +
" float x=p.x-0.5+(n-0.5)*0.45*p.y+sin(p.y*5.-t*2.)*0.04*p.y; float w=0.42*pow(1.-p.y,0.7)*(0.75+0.5*n);" +
" float body=1.-smoothstep(w*0.25,w,abs(x)); body*=smoothstep(0.,0.07,p.y); body*=1.-smoothstep(0.35+n*0.45,0.98,p.y+n2*0.25);" +
" float core=(1.-smoothstep(0.,w*0.55,abs(x)))*(1.-smoothstep(0.08,0.5+n*0.2,p.y));" +
" vec3 c=mix(cE,cM,smoothstep(0.,0.7,body)); c=mix(c,cC,core); float a=clamp(body*1.15,0.,1.);" +
" if(a<0.01) discard; float fk=0.85+0.3*ns(vec2(time*4.+vSeed,vSeed*3.)); gl_FragColor=vec4(c*(0.8+0.7*core)*fk,a); }",
transparent: true, depthWrite: false, blending: THREE.NormalBlending, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
});
},
function (kind) {
return wqwCanvas("ice" + kind, 512, 512, function (c, W, H) {
var R = wRand(kind.length * 97 + 13), deep = kind === "deep";
var g = c.createLinearGradient(0, 0, W, H);
g.addColorStop(0, deep ? "#2A4E78" : "#E2F0FA");
g.addColorStop(0.5, deep ? "#1E3C62" : "#CFE6F6");
g.addColorStop(1, deep ? "#264A72" : "#DDEEF9");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 120; i++) {
var x = R() * W, y = R() * H, r = 40 + R() * 140, dark = R() < 0.55;
for (var ox = -1; ox <= 1; ox++)
for (var oy = -1; oy <= 1; oy++) {
var X = x + ox * W, Y = y + oy * H;
if (X + r < 0 || X - r > W || Y + r < 0 || Y - r > H)
continue;
var gr = c.createRadialGradient(X, Y, 0, X, Y, r);
gr.addColorStop(0, dark ? (deep ? "rgba(8,20,44,.22)" : "rgba(120,170,215,.16)") : (deep ? "rgba(90,140,200,.14)" : "rgba(255,255,255,.22)"));
gr.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = gr;
c.fillRect(X - r, Y - r, r * 2, r * 2);
}
}
c.lineCap = "round";
for (i = 0; i < 9; i++) {
c.strokeStyle = deep ? "rgba(160,200,245,.16)" : "rgba(255,255,255,.28)";
c.lineWidth = 1.5 + R() * 2.5;
c.beginPath();
var x0 = R() * W, y0 = R() * H;
c.moveTo(x0, y0);
for (var k = 0; k < 4; k++) {
var x1 = x0 + (R() - 0.5) * 260, y1 = y0 + (R() - 0.5) * 260;
c.quadraticCurveTo((x0 + x1) / 2 + (R() - 0.5) * 80, (y0 + y1) / 2 + (R() - 0.5) * 80, x1, y1);
x0 = x1;
y0 = y1;
}
c.stroke();
}
for (i = 0; i < 70; i++) {
var bx = R() * W, by = R() * H, br = 1 + R() * 2.5;
c.fillStyle = "rgba(255,255,255," + (0.12 + R() * 0.2) + ")";
c.beginPath();
c.arc(bx, by, br, 0, 6.283);
c.fill();
}
});
},
function (col, o) {
o = o || {};
return wqwM("iceM" + col + "|" + (o.op || 1) + "|" + (o.kind || "") + "|" + (o.e || ""), function () {
var t = wqiIceTex(o.kind || "clear");
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(o.rep || 0.06, o.rep || 0.06);
t.anisotropy = 4;
var m = wqwLite() ? new THREE.MeshLambertMaterial({ color: col, map: t, emissive: o.e || 0x1A3450, emissiveIntensity: 0.35 }) : new THREE.MeshPhongMaterial({ color: col, map: t, emissive: o.e || 0x1A3450, emissiveIntensity: 0.3, shininess: 70, specular: 0x7A90A8 });
if (o.op && o.op < 1) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.noPhoto = 1;
return m;
});
},
function (tw) {
return wqwGeo("spire" + tw, function () {
var g = new THREE.CylinderGeometry(0.06, 1, 1, 10, 28, false), p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i) + 0.5, z = p.getZ(i), a = Math.atan2(z, x), r = Math.hypot(x, z), k = Math.round(a / (Math.PI * 2) * 10), star = (k % 2 ? 0.78 : 1);
var rr = r * star * (1 - y * 0.15), aa = a + y * tw;
p.setXYZ(i, Math.cos(aa) * rr, y, Math.sin(aa) * rr);
}
g.computeVertexNormals();
return g;
});
},
function (P, x0, x1, y, z, ry, n, len, mat) {
var list = [], R = wRand(Math.round(x0 * 7 + z * 3 + y));
for (var i = 0; i < n; i++) {
var t = i / (n - 1 || 1), x = x0 + (x1 - x0) * t;
list.push({ x: x, y: y, z: z, s: 1, sy: len * (0.3 + R() * 0.9), rx: Math.PI });
}
var g = new THREE.Group();
g.rotation.y = ry || 0;
P.add(g);
wqwInst(g, wqwGeo("icicle", function () { var c = new THREE.ConeGeometry(0.12, 1, 6); c.translate(0, 0.5, 0); return c; }), mat, list, {});
return g;
},
function () {
return wqwCanvas("carvedGate", 512, 1024, function (c, W, H) {
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#D8ECFA");
g.addColorStop(1, "#A8CCE8");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
var R = wRand(4441);
c.lineCap = "round";
var line = function (w, a) { c.strokeStyle = "rgba(40,80,120," + a + ")"; c.lineWidth = w; };
c.strokeStyle = "rgba(255,255,255,.8)";
c.lineWidth = 10;
c.strokeRect(14, 14, W - 28, H - 28);
c.lineWidth = 4;
c.strokeRect(34, 34, W - 68, H - 68);
for (var band = 0; band < 4; band++) {
var y0 = 60 + band * 235;
line(3, 0.7);
c.beginPath();
c.moveTo(50, y0 + 200);
for (var x = 50; x < W - 50; x += 40)
c.lineTo(x + 20, y0 + 90 + R() * 60), c.lineTo(x + 40, y0 + 200);
c.stroke();
for (var t = 0; t < 5; t++) {
var tx = 70 + t * 95 + R() * 20, ty = y0 + 200;
line(3, 0.8);
c.beginPath();
c.moveTo(tx, ty);
c.lineTo(tx, ty - 70);
c.stroke();
for (var b = 0; b < 5; b++) {
c.beginPath();
c.moveTo(tx - 26 + b * 4, ty - 14 - b * 12);
c.lineTo(tx, ty - 34 - b * 12);
c.lineTo(tx + 26 - b * 4, ty - 14 - b * 12);
c.stroke();
}
}
var dx = band % 2 ? 150 : 330, dy = y0 + 175;
line(4, 0.85);
c.beginPath();
c.ellipse(dx, dy, 34, 14, 0, 0, 6.283);
c.stroke();
c.beginPath();
c.moveTo(dx + 30, dy - 6);
c.lineTo(dx + 48, dy - 38);
c.lineTo(dx + 60, dy - 30);
c.stroke();
[-20, -6, 12, 26].forEach(function (lx) { c.beginPath(); c.moveTo(dx + lx, dy + 10); c.lineTo(dx + lx + (band % 2 ? 3 : -3), dy + 40); c.stroke(); });
if (band % 2 === 0) {
c.beginPath();
c.moveTo(dx + 48, dy - 38);
c.lineTo(dx + 40, dy - 64);
c.moveTo(dx + 48, dy - 38);
c.lineTo(dx + 64, dy - 62);
c.moveTo(dx + 42, dy - 56);
c.lineTo(dx + 32, dy - 60);
c.stroke();
}
for (var s = 0; s < 4; s++) {
var sx = 60 + R() * (W - 120), sy = y0 + 20 + R() * 60, sr = 10 + R() * 10;
line(2, 0.8);
for (var k = 0; k < 6; k++) {
var a = k / 6 * 6.283;
c.beginPath();
c.moveTo(sx, sy);
c.lineTo(sx + Math.cos(a) * sr, sy + Math.sin(a) * sr);
c.stroke();
}
}
}
});
},
function (x, z) {
var n = wqwFbm(x * 0.006, z * 0.006, 4), h = n * 7 + wqwFbm(x * 0.03, z * 0.03, 2) * 1.2, r = Math.hypot(x * 0.9, z + 60);
var rdW = Math.abs(x + Math.sin(z * 0.004) * 30 * wqwSmooth(150, 400, z)), vale = 1 - 0.94 * wqwSmooth(420, 60, rdW) * wqwSmooth(500, 700, z);
h += (Math.max(0, r - 640) * 0.55 + Math.max(0, r - 820) * 0.9 * (0.6 + n)) * vale;
var flat = wqwSmooth(260, 190, Math.hypot(x * 0.8, (z + 60) * 0.9));
h = h * (1 - flat) + 1.2 * flat;
var rdD = rdW, rd = wqwSmooth(180, 10, rdD) * wqwSmooth(120, 170, z);
rd = rd * rd * (3 - 2 * rd);
h = h * (1 - rd) + (1.2 + (z > 170 ? (n * 2) : 0)) * rd;
return h;
},
function (G) {
var lite = wqwLite(), H = wqiPalaceH, R = wRand(9001), ice = wqiIce(0xD8EEFC), iceB = wqiIce(0xA8D0F0, { e: 0x204A70 }), iceC = wqiIce(0xE8F6FF, { op: 0.82, e: 0x3A6A9A }), iceD = wqiIce(0x6A9AC8, { kind: "deep", e: 0x0A2440 });
wqwTerrain(G, -1100, -1100, 2200, 2200, lite ? 26 : 13, H, wqiSnowM(), function (x, z, y, c) { var n = wqwFbm(x * 0.02, z * 0.02, 3), sh = wqwSmooth(0, 40, y - 8); c.setRGB(0.9 + n * 0.08 - sh * 0.06, 0.93 + n * 0.06 - sh * 0.03, 0.99); });
var road = [];
for (var zz = 1080; zz >= 150; zz -= 30)
road.push([-Math.sin(zz * 0.004) * 30 * wqwSmooth(150, 400, zz), zz]);
wqwStrip(G, road, 8, function (x, z) { return H(x, z) + 0.04; }, wqiIce(0x9AC8EC, { rep: 0.15, e: 0x1A4A7A }), 0.06);
road.forEach(function (q, i) { if (i % 3)
return; [-1, 1].forEach(function (s) { var x = q[0] + s * 6.5, z = q[1]; wqcCrystal(G, x, H(x, z), z, 2.2 + R() * 0.8, 0xCFEAFF, { n: 3, solid: false }); }); });
var rocks = wqwScatter(9002, lite ? 60 : 160, -1000, -1000, 1000, 1000, function (x, z) { return Math.hypot(x, z + 60) > 280 && Math.abs(x) > 24; }, H, 1.5, 6);
wqwInst(G, wqwGeo("iceRock", function () { var g = new THREE.DodecahedronGeometry(1, 1), p = g.attributes.position, r2 = wRand(5); for (var i = 0; i < p.count; i++) {
p.setY(i, p.getY(i) * 0.6);
p.setX(i, p.getX(i) * (0.8 + r2() * 0.4));
} g.computeVertexNormals(); return g; }), iceB, rocks, { shadow: !lite });
rocks.forEach(function (t) { if (t.s > 3)
wqwRound(t.x, t.z, t.s * 0.8); });
var peaks = [];
for (var i = 0; i < (lite ? 14 : 28); i++) {
var a = i / 28 * Math.PI * 2 + R() * 0.2, r = 900 + R() * 150;
if (Math.sin(a) * r - 60 > 420 && Math.abs(Math.cos(a) * r) < 480)
continue;
peaks.push({ x: Math.cos(a) * r, z: -60 + Math.sin(a) * r, y: H(Math.cos(a) * r, -60 + Math.sin(a) * r) - 10, s: 60 + R() * 70, ry: R() * 6 });
}
wqwInst(G, wqwGeo("icePeak", function () { var g = new THREE.ConeGeometry(0.6, 1.4, 7, 3), p = g.attributes.position, r2 = wRand(7); for (var i = 0; i < p.count; i++) {
if (p.getY(i) < 0.69) {
p.setX(i, p.getX(i) * (0.8 + r2() * 0.5));
p.setZ(i, p.getZ(i) * (0.8 + r2() * 0.5));
}
} g.translate(0, 0.7, 0); g.computeVertexNormals(); return g; }), wqiIce(0xE4F0FA, { rep: 0.03 }), peaks, {});
wqwPlant(G, "conifer", wqwScatter(9003, lite ? 40 : 110, -900, -900, 900, 900, function (x, z) { var r = Math.hypot(x, z + 60); return r > 420 && r < 760 && Math.abs(x) > 40; }, H, 0.8, 1.4), { col: 0xD8E4EC });
var CW = 96, CZ0 = 110, CZ1 = -70;
[[-CW, CZ0, -CW, CZ1], [CW, CZ0, CW, CZ1], [-CW, CZ0, -14, CZ0], [14, CZ0, CW, CZ0]].forEach(function (w) {
var x = (w[0] + w[2]) / 2, z = (w[1] + w[3]) / 2, len = Math.hypot(w[2] - w[0], w[3] - w[1]), ry = Math.atan2(w[2] - w[0], w[3] - w[1]);
var m = wqwBox(G, 3, 14, len, iceB, 0, 0, 0);
m.position.set(x, H(x, z) + 7, z);
m.rotation.y = ry;
wqwSolid(x, z, ry === 0 ? 3 : len, ry === 0 ? len : 3, -50, 400, 0);
for (var k = 0; k < len / 6; k++) {
var t = (k + 0.5) / (len / 6), cx = w[0] + (w[2] - w[0]) * t, cz = w[1] + (w[3] - w[1]) * t;
var cr = wqwBox(G, 3.2, 2.2, 2.6, ice, cx, H(x, z) + 14, cz);
cr.rotation.y = ry;
}
wqiIcicles(G, -len / 2, len / 2, H(x, z) + 13.8, 1.7, 0, lite ? 20 : Math.round(len / 1.5), 2.2, iceC).position.set(x, 0, z);
});
[[-CW, CZ0], [CW, CZ0], [-CW, CZ1], [CW, CZ1]].forEach(function (q) { wqiSpire(G, q[0], H(q[0], q[1]), q[1], 6, 46, ice, 2.4); wqwRound(q[0], q[1], 6); });
(function () {
var y = H(0, CZ0), g = new THREE.Group();
g.position.set(0, y, CZ0);
G.add(g);
var carved = wqwM("carvedM", function () { var m = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, map: wqiCarvedTex(), emissive: 0x1A3A5A, emissiveIntensity: 0.25, shininess: 90, specular: 0xFFFFFF, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
[-1, 1].forEach(function (s) {
wqwBox(g, 6, 30, 6, ice, s * 17, 0, 0);
wqiSpire(g, s * 17, 30, 0, 4, 22, ice, 3);
wqwSolid(s * 17, CZ0, 6, 6, -50, 400, 0);
var leaf = new THREE.Mesh(new THREE.BoxGeometry(12, 24, 0.6), [iceB, iceB, iceB, iceB, carved, carved]);
leaf.position.set(s * (14 - 5.8 * Math.cos(1.2)), 12, -5.8 * Math.sin(1.2));
leaf.rotation.y = -s * 1.2;
g.add(leaf);
});
var arch = new THREE.Mesh(new THREE.TorusGeometry(17, 2.2, 8, 32, Math.PI), ice);
arch.position.set(0, 30, 0);
g.add(arch);
var crest = new THREE.Mesh(new THREE.OctahedronGeometry(3.4, 0), iceC);
crest.position.set(0, 49, 0);
crest.scale.y = 1.6;
g.add(crest);
})();
wqwSpot(0, CZ0 + 10, 5, "The gates of the Winter Palace", "look at the carvings", function () { wqbSay("❄️ The gates are carved with winter scenes: deer in deep snow, wolves running, pines under their weight of white, mountains, and snowflakes no two alike. The carving is so fine the ice seems to move."); }, H(0, CZ0 + 10));
var pav = wqwBox(G, CW * 2 - 4, 0.4, CZ0 - CZ1 - 4, wqiIce(0xC8E0F4, { rep: 0.05 }), 0, H(0, 20) - 0.3, (CZ0 + CZ1) / 2);
pav.receiveShadow = true;
(function () {
var x = 0, z = 10, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var crag = new THREE.Mesh(wqwGeo("crag", function () { var c = new THREE.DodecahedronGeometry(1, 2), p = c.attributes.position, r2 = wRand(31); for (var i = 0; i < p.count; i++) {
var s = 0.85 + r2() * 0.3;
p.setXYZ(i, p.getX(i) * s, p.getY(i) * s, p.getZ(i) * s);
} c.computeVertexNormals(); return c; }), wqiIce(0x9CC8EE, { e: 0x2A5A8A }));
crag.scale.set(14, 22, 9);
crag.position.set(0, 10, -10);
g.add(crag);
for (var cq = 0; cq < (lite ? 6 : 14); cq++)
wqcCrystal(g, (R() - 0.5) * 20, 4 + R() * 18, -6 - R() * 4, 2 + R() * 3, 0xCFEAFF, { n: 3, solid: false });
var M = iceC;
for (var i = 0; i < (lite ? 9 : 18); i++) {
var fx = -9 + i * (18 / ((lite ? 9 : 18) - 1)), top = 22 + Math.sin(i * 1.3) * 3, len = top - (i % 3 === 0 ? 2 : 6 + R() * 6);
var col = new THREE.Mesh(wqwTaper([[0, top, -3], [0.3 * Math.sin(i), top * 0.6, 0.5], [0.2, top - len, 2 + R() * 1.5]], [1.2 + R() * 0.6, 0.9, 0.25 + (i % 3 === 0 ? 0.9 : 0)], 8, 10), M);
col.position.x = fx;
g.add(col);
}
wqiIcicles(g, -10, 10, 21, -1.5, 0, lite ? 14 : 30, 5, M);
var pool = new THREE.Mesh(new THREE.CircleGeometry(15, 40), wqwShine(0xBFDCF0, 0.05, 0.3));
pool.rotation.x = -Math.PI / 2;
pool.position.set(0, 0.12, 4);
g.add(pool);
var rim = new THREE.Mesh(new THREE.TorusGeometry(15, 0.9, 8, 48), ice);
rim.rotation.x = Math.PI / 2;
rim.position.set(0, 0.3, 4);
g.add(rim);
wqwRound(x, z - 6, 13, -50, 400);
})();
wqwSpot(0, 26, 5, "The frozen waterfall", "look at the waterfall", function () { wqbSay("❄️ A waterfall, caught mid-fall: every rope of water stopped in the air, every splash a spray of crystal over the frozen pool."); }, H(0, 26));
(function () {
var x = 54, z = 36, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = -0.5;
G.add(g);
WQI.sleigh = g;
[-1, 1].forEach(function (s) {
var curve = new THREE.CatmullRomCurve3([new THREE.Vector3(s * 1.1, 0.2, -2.6), new THREE.Vector3(s * 1.1, 0.05, -1), new THREE.Vector3(s * 1.1, 0.05, 1.6), new THREE.Vector3(s * 1.1, 0.6, 2.8), new THREE.Vector3(s * 1.1, 1.4, 2.6), new THREE.Vector3(s * 1.1, 1.2, 2.1)]);
g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.08, 6, false), iceC));
for (var k = 0; k < 3; k++)
wqwBox(g, 0.08, 0.5, 0.08, iceC, s * 1.1, 0.05, -1.6 + k * 1.4);
});
var body = new THREE.Mesh(wqwGeo("sleighBody", function () { var sh = new THREE.Shape(); sh.moveTo(-2.4, 0); sh.lineTo(1.8, 0); sh.quadraticCurveTo(2.6, 0.2, 2.4, 1.4); sh.lineTo(1.6, 1.0); sh.lineTo(-1.2, 1.0); sh.quadraticCurveTo(-2.2, 1.6, -2.4, 2.2); sh.lineTo(-2.7, 2.2); sh.quadraticCurveTo(-2.6, 0.6, -2.4, 0); var e = new THREE.ExtrudeGeometry(sh, { depth: 2.0, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.12, bevelSegments: 2 }); e.translate(0, 0, -1); e.rotateY(Math.PI / 2); return e; }), iceC);
body.position.y = 0.5;
g.add(body);
wqwBox(g, 1.8, 0.3, 1.2, wqwLam(0xF4F4F8), 0, 0.9, -0.9);
wqwSolid(x, z, 3, 6, y - 1, y + 3, -0.5);
})();
wqwSpot(54, 44, 4, "The ice sleigh", "look at the sleigh", function () { wqbSay("🛷 A sleigh carved from one single piece of ice, its runners curling like frozen waves. There are no reindeer, and no harness. It flies by her will alone."); }, H(54, 44));
(function () {
var x = 0, z = -160, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
wqwBox(g, 120, 36, 170, ice, 0, 0, 0);
wqwBox(g, 124, 2, 174, iceC, 0, 36, 0);
wqwSolid(x, z, 120, 170, y - 2, y + 60, 0);
var nave = new THREE.Mesh(new THREE.CylinderGeometry(30, 30, 150, 6, 1, false, 0, Math.PI), ice);
nave.rotation.z = Math.PI / 2;
nave.rotation.y = Math.PI / 2;
nave.position.set(0, 36, 0);
nave.scale.set(1, 1, 0.8);
g.add(nave);
var face = new THREE.Mesh(new THREE.PlaneGeometry(18, 26), wqwGlowM(0xD8F0FF, 0.45));
face.position.set(0, 13, 85.2);
g.add(face);
var rose = new THREE.Mesh(new THREE.CircleGeometry(8, 10), wqwGlowM(0xBFE6FF, 0.7));
rose.position.set(0, 31, 85.3);
g.add(rose);
var rr = new THREE.Mesh(new THREE.TorusGeometry(8.4, 0.8, 6, 40), iceC);
rr.position.set(0, 31, 85.4);
g.add(rr);
for (var b = -3; b <= 3; b++) {
if (!b)
continue;
wqwBox(g, 3, 30, 6, iceB, b * 17, 0, 86);
}
wqiIcicles(g, -60, 60, 35.6, 87, 0, lite ? 30 : 90, 3, iceC);
var towers = [[-60, -85, 150, 4], [60, -85, 130, -3], [-60, 85, 100, 3], [60, 85, 110, -4], [0, -60, 190, 5], [-34, -20, 120, -3], [34, -20, 128, 3], [-90, 0, 90, 2.5], [90, 0, 96, -2.5]];
towers.forEach(function (t) { var base = Math.abs(t[0]) > 80 ? 0 : 30; if (Math.abs(t[0]) > 80) {
wqwBox(g, 16, 40, 16, ice, t[0], 0, t[1]);
wqwSolid(x + t[0], z + t[1], 16, 16, y - 2, y + 60, 0);
} wqiSpire(g, t[0], base + (Math.abs(t[0]) > 80 ? 40 : 6), t[1], Math.abs(t[0]) > 80 ? 7 : 9, t[2], ice, t[3]); });
[[0, 1, 70], [2, 3, 62], [4, 5, 96], [4, 6, 100], [7, 2, 60], [8, 3, 64]].forEach(function (q) {
var A = towers[q[0]], B = towers[q[1]], len = Math.hypot(B[0] - A[0], B[1] - A[1]);
var br = new THREE.Mesh(new THREE.BoxGeometry(3, 0.8, len), iceC);
br.position.set((A[0] + B[0]) / 2, q[2], (A[1] + B[1]) / 2);
br.rotation.y = Math.atan2(B[0] - A[0], B[1] - A[1]);
g.add(br);
var rail = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, len), iceC);
rail.position.copy(br.position);
rail.position.y += 1;
rail.rotation.copy(br.rotation);
g.add(rail);
});
for (var w = 0; w < 10; w++) {
[-1, 1].forEach(function (s) { var win = new THREE.Mesh(new THREE.PlaneGeometry(4, 12), wqwGlowM(0xBFE8FF, 0.38)); win.position.set(s * 60.2, 16, -70 + w * 15); win.rotation.y = s * Math.PI / 2; g.add(win); });
}
})();
wqwDoorTo(G, "palace", 2, 0, -74.4, 0, "The great doors of the palace", 28, 56, { col: 0xBFE0F6, frame: ice, y: H(0, -74), msg: "❄️ <b>The great hall of the Winter Palace</b>" });
(function () {
var t = wqwCanvas("aurora", 256, 128, function (c, W, Hh) {
var g = c.createLinearGradient(0, Hh, 0, 0);
g.addColorStop(0, "rgba(80,255,170,0)");
g.addColorStop(0.15, "rgba(90,255,180,.55)");
g.addColorStop(0.55, "rgba(90,200,255,.28)");
g.addColorStop(1, "rgba(170,110,255,0)");
c.fillStyle = g;
c.fillRect(0, 0, W, Hh);
for (var i = 0; i < 60; i++) {
c.fillStyle = "rgba(255,255,255," + (Math.random() * 0.12) + ")";
c.fillRect(Math.random() * W, 0, 1 + Math.random() * 2, Hh);
}
});
var m = wqwM("auroraM", function () { var mm = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }); mm.userData.noPhoto = 1; return mm; });
for (var i = 0; i < 3; i++) {
var geo = new THREE.PlaneGeometry(1800, 260, 40, 1), p = geo.attributes.position;
for (var k = 0; k < p.count; k++)
p.setZ(k, Math.sin(p.getX(k) * 0.004 + i * 1.7) * 180);
var a = new THREE.Mesh(geo, m);
a.position.set(-200 + i * 160, 560 + i * 60, -900 - i * 120);
a.rotation.x = -0.15;
G.add(a);
a.userData.kind = "float";
a.userData.y0 = a.position.y;
a.userData.amp = 8;
a.userData.f = 0.05;
a.userData.ph = i;
WQW.bob.push(a);
}
})();
wqcMoons(G, { n: 1 });
[["fox", -220, 380, 1], ["fox", 300, 260, 1], ["rabbit", -140, 520, 1], ["rabbit", 180, 600, 1], ["rabbit", -320, 180, 1], ["stag", 420, -80, 1.1], ["stag", -420, -20, 1.05]].forEach(function (q, i) { var g = wqwCrx(q[0], q[3]); var y = H(q[1], q[2]); g.position.set(q[1], y, q[2]); g.rotation.y = R() * 6; G.add(g); WQW.people.push({ g: g, y: y, o: { wander: q[0] === "stag" ? 40 : 22, sp: q[0] === "rabbit" ? 1.2 : 0.8 } }); });
wqcMotes(G, lite ? 200 : 600, 0, 0, 320, 1, 60, 0xFFFFFF);
},
function (g, A, lx, lz, ry, name, to, msg) {
var dg = new THREE.Group();
dg.position.set(lx, 0, lz);
dg.rotation.y = ry || 0;
g.add(dg);
wqwBox(dg, 3.2, 5.4, 0.3, wqiIce(0x9AC4E8, { e: 0x204A70 }), 0, 0, 0);
var gl = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 4.6), wqwGlowM(0xBFE8FF, 0.5));
gl.position.set(0, 2.4, 0.2);
dg.add(gl);
var fx = A.x + lx + Math.sin(ry || 0) * 1.4, fz = A.z + lz + Math.cos(ry || 0) * 1.4;
wqwSpot(fx, fz, 1.8, name, "go through", function () { var T = wqwAtPt(to); if (T)
wqwGo({ sc: T.sc, x: T.x, z: T.z, y: T.y, ry: T.ry }, msg || null, typeof wqbPopulate === "function" ? wqbPopulate : null); }, WQW_IN_Y);
},
function (G) {
var lite = wqwLite(), R = wRand(9100), ice = wqiIce(0xD8EEFC), iceC = wqiIce(0xE8F6FF, { op: 0.8, e: 0x3A6A9A }), out = { x: 0, z: -62, ry: Math.PI }, H2 = wqwInAt("palace", 2);
var back = function (dx, dz, ry) { return { x: H2.x + dx, z: H2.z + dz, ry: ry }; };
var g2 = wqwRoomBuild(G, "palace", 2, 28, 56, 20, wqiRoomIce({ out: out, doorName: "The great doors, out to the courtyard" })), A2 = g2.userData.A;
for (var i = 0; i < 6; i++) {
[-1, 1].forEach(function (s) { var c = wqiSpire(g2, s * 10, 0, -22 + i * 9, 1.1, 20, ice, 1.2); wqwRound(A2.x + s * 10, A2.z - 22 + i * 9, 1.1); });
}
for (i = 0; i < 5; i++) {
var rib = new THREE.Mesh(new THREE.TorusGeometry(10, 0.35, 6, 24, Math.PI), ice);
rib.position.set(0, 19.5 - 10, -20 + i * 10);
rib.scale.y = 0.6;
rib.position.y = 14;
g2.add(rib);
}
(function () { var t = new THREE.Group(); t.position.set(0, 0, -24); g2.add(t); wqwBox(t, 10, 0.6, 6, ice, 0, 0, 0); wqwBox(t, 6, 0.6, 4, ice, 0, 0.6, -0.6); wqwBox(t, 3, 1.2, 1.4, iceC, 0, 1.2, -1.2); var back = wqiSpire(t, 0, 1.2, -1.9, 1.6, 7, iceC, 2); back.scale.z = 0.4; wqcCrystal(t, -1.8, 1.2, -1.8, 3.6, 0xCFEAFF, { n: 3, solid: false }); wqcCrystal(t, 1.8, 1.2, -1.8, 3.6, 0xCFEAFF, { n: 3, solid: false }); wqwSolid(A2.x, A2.z - 24, 10, 6, WQW_IN_Y - 1, WQW_IN_Y + 2, 0); })();
wqwRug(g2, 0, 2, 4, 40, 0x9AC0E0);
var cand = [];
for (i = 0; i < 8; i++)
cand.push({ x: (i % 2 ? 6 : -6), y: 0, z: -18 + Math.floor(i / 2) * 11, s: 1 });
wqwInst(g2, wqwGeo("brazier", function () { var c = new THREE.CylinderGeometry(0.6, 0.3, 1.2, 8); c.translate(0, 0.6, 0); return c; }), ice, cand, {});
cand.forEach(function (q) { wqfFlame(g2, q.x, 1.15, q.z, 1.1, 2.4, "blue"); wqfFlame(g2, q.x + 0.1, 1.15, q.z, 0.6, 1.5, "pale"); });
wqiRoomDoor(g2, A2, -13.6, -6, Math.PI / 2, "The way to the hall of the grand hearth", "hearth", "🔥 <b>The hall of the grand hearth</b>");
wqiRoomDoor(g2, A2, 13.6, -6, -Math.PI / 2, "The way to the shard chamber", "shards", "❄️ <b>The shard chamber</b>");
wqiRoomDoor(g2, A2, -13.6, 12, Math.PI / 2, "The way to the library", "library", "📚 <b>The library of ancient tomes</b>");
wqiRoomDoor(g2, A2, 13.6, 12, -Math.PI / 2, "The stair to Glacia's chamber", "bower", "❄️ <b>Glacia's chamber, high in a tower</b>");
wqwSpot(A2.x, A2.z - 20, 3, "The throne of ice", "look at the throne", function () { wqbSay("❄️ A throne of ice on a dais of ice, crystals rising behind it like frozen flames. No one has sat in it for a long time."); }, WQW_IN_Y);
var g0 = wqwRoomBuild(G, "palace", 0, 72, 76, 44, wqiRoomIce({ env: "coldfire", out: back(-11, -6, Math.PI / 2), doorName: "The way back to the great hall" })), A0 = g0.userData.A;
(function () {
var h = new THREE.Group();
h.position.set(0, 0, -30);
g0.add(h);
var st = wqiIce(0x7FA8D0, { e: 0x10304E, kind: "deep", rep: 0.06 }), stB = wqiIce(0xA8CCEC, { e: 0x183A5A, rep: 0.08 });
wqwBox(h, 40, 22, 2, st, 0, 0, -7);
var back = new THREE.Mesh(new THREE.PlaneGeometry(36, 21), wqwGlowM(0x061426, 1));
back.position.set(0, 10.5, -5.9);
h.add(back);
[-1, 1].forEach(function (s) { wqwBox(h, 8, 22, 16, stB, s * 22, 0, 0); wqiSpire(h, s * 27.5, 0, 7.5, 1.8, 34, iceC, 2); wqiSpire(h, s * 17.6, 0, 7.6, 0.9, 22, iceC, 3); });
wqwBox(h, 52, 6, 16, stB, 0, 22, 0);
var fr = new THREE.Mesh(new THREE.PlaneGeometry(50, 5), wqwM("wqiHearthFrieze", function () { var m = new THREE.MeshPhongMaterial({ map: wqiCarvedTex(), color: 0xCFE4F8, emissive: 0x1A3A5A, emissiveIntensity: 0.5, shininess: 30 }); m.userData.noPhoto = 1; return m; }));
fr.position.set(0, 25, 8.06);
h.add(fr);
wqwBox(h, 60, 1.4, 20, ice, 0, 28, 1);
wqwBox(h, 44, 15.6, 12, stB, 0, 29.4, -2);
[-20, -10, 0, 10, 20].forEach(function (x, i) { wqiSpire(h, x, 29.4, 5.2, i === 2 ? 1.4 : 0.8, i === 2 ? 13 : 8, iceC, 3); });
wqwBox(h, 36, 0.6, 14, st, 0, 0, 0);
wqwBox(h, 46, 0.5, 8, ice, 0, 0, 11);
var bark = wqwS("bark", 0xC8D8E4, 6);
[[0, 1.5, -2.5, 1.6, 0.02], [0, 1.4, 1.8, 1.5, -0.03], [-1, 4.2, -0.4, 1.3, 0.05], [1.5, 6.6, -1.2, 1.1, -0.04]].forEach(function (q) { var lg = wqwCyl(h, q[3] * 0.85, q[3], 33, bark, q[0], 0, q[2], 12); lg.rotation.z = Math.PI / 2 + q[4]; lg.position.y = q[1]; });
for (var k = 0; k < 6; k++) {
var br2 = wqwCyl(h, 0.25, 0.5, 6, bark, -14 + k * 5.6, 0, (k % 2 ? 1 : -1) * 2.2, 6);
br2.rotation.z = (k % 2 ? 0.6 : -0.6);
br2.rotation.x = (k % 3 - 1) * 0.4;
br2.position.y = 3 + (k % 2) * 1.5;
}
var fire = new THREE.Group();
fire.position.set(0, 0.6, 0);
h.add(fire);
var fl = [], n = lite ? 12 : 28;
for (k = 0; k < n; k++) {
var wr = new THREE.Group();
wr.position.set(-16 + k * (32 / (n - 1)) + (R() - 0.5) * 1.2, 0, (R() - 0.5) * 7);
fire.add(wr);
fl.push(wr);
wqfFlame(wr, 0, 0, 0, 5 + R() * 4, 13 + R() * 9, "blue");
if (k % 2 === 0)
wqfFlame(wr, (R() - 0.5) * 1.5, 0, 0.8, 2.6 + R() * 1.8, 8 + R() * 7, "pale");
}
for (k = 0; k < (lite ? 6 : 14); k++)
wqfFlame(fire, -15 + k * (30 / ((lite ? 6 : 14) - 1)), 3.2 + (k % 3) * 1.2, (R() - 0.5) * 4, 2 + R() * 1.5, 4 + R() * 4, k % 2 ? "pale" : "blue");
var bed = new THREE.Mesh(new THREE.PlaneGeometry(34, 10), wqwGlowM(0x5AB8FF, 0.55));
bed.rotation.x = -Math.PI / 2;
bed.position.set(0, 0.65, 0);
fire.add(bed);
var core = wGlow(0xBFE8FF, 30, 0.45);
core.position.set(0, 8, 2);
fire.add(core);
var L = new THREE.PointLight(0x8FD0FF, lite ? 1.6 : 2.4, lite ? 70 : 110);
L.position.set(0, 9, 12);
h.add(L);
WQI.coldLight = L;
fire.userData.light = null;
fire.userData.kind = "fire";
fire.userData.fl = fl;
WQW.fx.push(fire);
WQI.coldFire = fire;
wqwSolid(A0.x, A0.z - 30, 62, 16, WQW_IN_Y - 1, WQW_IN_Y + 46, 0);
})();
(function () {
var t = wqwCanvas("hearthStars", 512, 512, function (c, W, Hh) {
c.fillStyle = "#06101E";
c.fillRect(0, 0, W, Hh);
var r2 = wRand(731);
for (var i = 0; i < 900; i++) {
var a = r2();
c.fillStyle = "rgba(" + (200 + a * 55 | 0) + "," + (225 + a * 30 | 0) + ",255," + (0.25 + a * 0.75) + ")";
c.fillRect(r2() * W, r2() * Hh, a > 0.92 ? 2 : 1, a > 0.92 ? 2 : 1);
}
for (i = 0; i < 14; i++) {
c.strokeStyle = "rgba(120,180,240,.10)";
c.lineWidth = 6 + r2() * 14;
c.beginPath();
c.moveTo(r2() * W, 0);
c.lineTo(r2() * W, Hh);
c.stroke();
}
});
var cm = new THREE.Mesh(new THREE.PlaneGeometry(71.6, 75.6), wqwM("hearthStarsM", function () { var m = new THREE.MeshBasicMaterial({ map: t }); m.userData.noPhoto = 1; return m; }));
cm.rotation.x = Math.PI / 2;
cm.position.y = 43.7;
g0.add(cm);
})();
wqwRug(g0, 0, -6, 12, 8, 0xF4F2EC);
[-1, 1].forEach(function (s) { wqwBox(g0, 2, 0.9, 10, ice, s * 12, 0, -4); for (var w = 0; w < 4; w++) {
var win = new THREE.Mesh(new THREE.PlaneGeometry(5, 16), wqwGlowM(0x9AC0E8, 0.55));
win.position.set(s * 35.85, 12, -24 + w * 16);
win.rotation.y = -s * Math.PI / 2;
g0.add(win);
} });
wqwSpot(A0.x, A0.z - 12, 5, "The cold fire", "hold your hands to the cold fire", function () { wqbSay("🔥 Blue-white flames, dancing over whole trees laid in the hearth. It gives no heat. It gives light, and something like comfort."); }, WQW_IN_Y);
var g1 = wqwRoomBuild(G, "palace", 1, 26, 26, 14, wqiRoomIce({ env: "icehall", out: back(11, -6, -Math.PI / 2), doorName: "The way back to the great hall" })), A1 = g1.userData.A;
(function () {
var tex = wqwCanvas("domeStars", 512, 256, function (c, W, Hh) {
c.fillStyle = "#040A1C";
c.fillRect(0, 0, W, Hh);
var r2 = wRand(77);
for (var i = 0; i < 700; i++) {
var a = r2();
c.fillStyle = "rgba(255,255,255," + (0.3 + a * 0.7) + ")";
c.fillRect(r2() * W, r2() * Hh, a > 0.9 ? 2 : 1, a > 0.9 ? 2 : 1);
}
var g = c.createLinearGradient(0, 0, W, 0);
g.addColorStop(0, "rgba(80,255,180,0)");
g.addColorStop(0.5, "rgba(80,255,180,.15)");
g.addColorStop(1, "rgba(80,255,180,0)");
c.fillStyle = g;
c.fillRect(0, Hh * 0.4, W, Hh * 0.2);
});
var dome = new THREE.Mesh(new THREE.SphereGeometry(12.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), wqwM("domeM", function () { var m = new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide }); m.userData.noPhoto = 1; return m; }));
dome.position.y = 7;
g1.add(dome);
var ring = new THREE.Mesh(new THREE.TorusGeometry(12.6, 0.5, 8, 48), ice);
ring.rotation.x = Math.PI / 2;
ring.position.y = 7;
g1.add(ring);
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2;
var col = wqiSpire(g1, Math.cos(a) * 12, 0, Math.sin(a) * 12, 0.7, 7.2, ice, 1);
}
var ped = wqcCrystal(g1, 0, 0, -1, 2.2, 0xCFEAFF, { n: 5, solid: false });
var top = wqwBox(g1, 1.6, 0.2, 1.2, iceC, 0, 1.6, -1);
var box = new THREE.Group();
box.position.set(0, 1.8, -1);
g1.add(box);
var silv = wqwShine(0xD8DCE4, 0.25, 0.95);
wqwBox(box, 0.9, 0.42, 0.6, silv, 0, 0, 0);
var lid = wqwBox(box, 0.94, 0.1, 0.64, silv, 0, 0.42, 0);
var pat = wqwCanvas("writhe", 256, 128, function (c, W, Hh) { c.fillStyle = "#C8CCD4"; c.fillRect(0, 0, W, Hh); c.strokeStyle = "#5A5E6A"; c.lineWidth = 3; var r2 = wRand(66); for (var i = 0; i < 14; i++) {
c.beginPath();
var x = r2() * W, y = r2() * Hh;
c.moveTo(x, y);
for (var j = 0; j < 8; j++) {
x += (r2() - 0.5) * 50;
y += (r2() - 0.5) * 40;
c.quadraticCurveTo(x + (r2() - 0.5) * 30, y + (r2() - 0.5) * 30, x, y);
}
c.stroke();
} });
var pm = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 0.4), wqwLam(0xFFFFFF, { map: pat, mapk: "writhe" }));
pm.position.set(0, 0.21, 0.31);
box.add(pm);
var pm2 = pm.clone();
pm2.rotation.y = Math.PI;
pm2.position.z = -0.31;
box.add(pm2);
WQI.box = box;
wqwSolid(A1.x, A1.z - 1, 2.4, 2, WQW_IN_Y - 1, WQW_IN_Y + 3, 0);
})();
wqwSpot(A1.x, A1.z + 0.6, 2.4, "The silver box", "look at the silver box", function () { wqbSay("❄️ A box of silver on a pedestal of crystal, its sides worked in patterns that seem to writhe when you are not looking straight at them. Inside, the shards she has gathered whisper to each other."); }, WQW_IN_Y);
var g3 = wqwRoomBuild(G, "palace", 3, 20, 16, 8, wqiRoomIce({ env: "icehall", out: back(-11, 12, Math.PI / 2), doorName: "The way back to the great hall" })), A3 = g3.userData.A;
[-9.6, 9.6].forEach(function (x) { for (var k = 0; k < 3; k++) {
var sh = wqwShelves(g3, x, -5 + k * 4, 3.6, 7, x < 0 ? Math.PI / 2 : -Math.PI / 2);
} });
for (var k = 0; k < 4; k++)
wqwShelves(g3, -7 + k * 4.6, -7.6, 3.6, 7, 0);
wqwTable(g3, 0, -1, 3.4, 1.6, 0.9, ice);
wqwChair(g3, 0, 0.6, Math.PI, ice);
wqwLily(g3, 0, 0.96, -1.2);
wqwSpot(A3.x, A3.z - 1, 2.4, "The ancient tomes", "read the tomes", function () { wqbSay("📚 Tomes older than the kingdoms of men: the turning of the year, the names of the winds, the old compacts between the seasons. Some pages are frosted shut."); }, WQW_IN_Y);
var g4 = wqwRoomBuild(G, "palace", 4, 16, 14, 7, wqiRoomIce({ env: "icehall", out: back(11, 12, -Math.PI / 2), doorName: "The stair down to the great hall" })), A4 = g4.userData.A;
(function () { var b = new THREE.Group(); b.position.set(0, 0, -4.4); g4.add(b); wqwBox(b, 3.6, 0.6, 4.2, ice, 0, 0, 0); wqwBox(b, 3.4, 0.3, 4, wqwLam(0xF6F4F0), 0, 0.6, 0); wqwBox(b, 3.8, 2.4, 0.4, iceC, 0, 0, -2.2); wqwSolid(A4.x, A4.z - 4.4, 3.6, 4.2, WQW_IN_Y - 1, WQW_IN_Y + 1.2, 0); })();
var win = new THREE.Mesh(new THREE.PlaneGeometry(4, 4.6), wqwGlowM(0x9AB8E0, 0.6));
win.position.set(7.85, 3.2, -1);
win.rotation.y = -Math.PI / 2;
g4.add(win);
wqwRug(g4, 0, 0.5, 5, 4, 0xE8EEF4);
wqwChair(g4, -5, -3, 0.6, ice);
wqwChest(g4, 5, -5.5, 0);
wqwSpot(A4.x + 6.6, A4.z - 1, 2, "The window", "look out over the wastes", function () { wqbSay("❄️ From the tower the wastes run white to the edge of the world, under the slow green light of the aurora."); }, WQW_IN_Y);
},
function (G) {
var lite = wqwLite(), H = wqtBorderH, R = wRand(7101);
wqwTerrain(G, -520, -520, 1040, 1040, lite ? 14 : 7, H, wqwS("grass", 0xFFFFFF, 4, { vc: 1, shine: 2, spec: 0x040404 }), function (x, z, y, c) {
var k = wqtSnowK(x, z), n = wqwFbm(x * 0.05, z * 0.05, 2);
c.setRGB(0.55 + n * 0.15 + k * 0.4, 0.38 + n * 0.1 + k * 0.56, 0.2 + n * 0.05 + k * 0.76);
});
var autumn = wqwScatter(7102, lite ? 60 : 150, 0, -500, 500, 500, function (x, z) { return wqtSnowK(x, z) < 0.2 && Math.hypot(x - 14, z - 10) > 14; }, H, 0.8, 1.3);
var winter = wqwScatter(7103, lite ? 60 : 150, -500, -500, 0, 500, function (x, z) { return wqtSnowK(x, z) > 0.8 && Math.hypot(x + 18, z - 96) > 10 && Math.abs(x + 40) > 6; }, H, 0.8, 1.3);
wqwPlant(G, "tree", autumn.filter(function (t, i) { return i % 3 === 0; }), { col: 0xC8501A });
wqwPlant(G, "tree", autumn.filter(function (t, i) { return i % 3 === 1; }), { col: 0xE0A020 });
wqwPlant(G, "tree", autumn.filter(function (t, i) { return i % 3 === 2; }), { col: 0x9A2A10 });
wqwInst(G, wqwGeo("bareTrunk", function () {
var parts = [], c = new THREE.CylinderGeometry(0.25, 0.5, 10, 6);
c.translate(0, 5, 0);
parts.push(c.toNonIndexed());
var r2 = wRand(3);
for (var i = 0; i < 7; i++) {
var b = new THREE.CylinderGeometry(0.05, 0.14, 4, 4);
b.translate(0, 2, 0);
b.rotateZ(0.5 + r2() * 0.5);
b.rotateY(i / 7 * 6.283);
b.translate(0, 5 + i * 0.6, 0);
parts.push(b.toNonIndexed());
}
return wqwMerge(parts);
}), wqwS("bark", 0xE8EEF4, 2.5), winter, { shadow: !lite });
wqwPlant(G, "conifer", wqwScatter(7104, lite ? 20 : 60, -500, -500, -60, 500, function (x, z) { return wqtSnowK(x, z) > 0.9; }, H, 0.8, 1.2), { col: 0xC8D8E0 });
autumn.concat(winter).forEach(function (t) { wqwRound(t.x, t.z, 0.7); });
var leaves = wqwScatter(7105, lite ? 500 : 1600, -40, -500, 500, 500, function (x, z) { return wqtSnowK(x, z) < 0.5; }, H, 0.6, 1.2).map(function (t) { t.y += 0.04; t.rx = -Math.PI / 2; t.rz = t.ry; return t; });
[0xC8501A, 0xE0A020, 0x8A2A10].forEach(function (col, k) { wqwInst(G, wqwGeo("leafP", function () { return new THREE.PlaneGeometry(0.22, 0.16); }), wqwLam(col, { ds: 1 }), leaves.filter(function (t, i) { return i % 3 === k; }), {}); });
wqcMotes(G, lite ? 120 : 360, 60, 0, 200, 1, 14, 0xE09040);
var frost = wqwScatter(7106, lite ? 120 : 400, -40, -500, 30, 500, function (x, z) { var k = wqtSnowK(x, z); return k > 0.3 && k < 0.85; }, H, 0.5, 1.4);
wqwInst(G, wqwGeo("frostFern", function () { var p = []; for (var i = 0; i < 5; i++) {
var q = new THREE.PlaneGeometry(0.08, 0.6);
q.translate(0, 0.3, 0);
q.rotateZ((i - 2) * 0.4);
p.push(q.toNonIndexed());
} return wqwMerge(p); }), wqwGlowM(0xE8F6FF, 0.75), frost, {});
(function () {
var x = -18, z = 96, y = H(x, z);
var r = wqwCrx("rabbit", 1);
r.position.set(x, y + 0.25, z);
r.rotation.set(-0.3, 0.6, 0);
G.add(r);
wqiFreeze(r);
WQW_RABBIT = r;
var ice = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), wqiIce(0xE8F6FF, { op: 0.45 }));
ice.position.set(x, y + 0.4, z);
ice.scale.set(1, 0.8, 1.3);
G.add(ice);
})();
var log = wqwCyl(G, 0.5, 0.55, 7, wqwMat("darkbark"), 20, H(20, 4) + 0.4, 4, 9);
log.rotation.z = Math.PI / 2;
wqwSolid(20, 4, 7, 1, -50, H(20, 4) + 0.9, 0);
},
function (g) {
g.traverse(function (o) { if (o.isMesh && o.material) {
var ms = Array.isArray(o.material) ? o.material : [o.material];
var out = ms.map(function (m) { var c = m.clone(); if (c.color)
c.color.lerp(new THREE.Color(0xCFE8F8), 0.72); if (c.emissive) {
c.emissive.setHex(0x2A5A8A);
c.emissiveIntensity = 0.35;
} if (c.shininess !== undefined)
c.shininess = 120; c.userData.noPhoto = 1; return c; });
o.material = Array.isArray(o.material) ? out : out[0];
} });
var cx = g.userData && g.userData.crx;
if (cx)
cx.dead = 1;
g.userData.frozen = 1;
return g;
},
function (G) {
var lite = wqwLite(), H = wqtForgeH, R = wRand(7201), rock = wqwS("b:cave", 0x3A3E48, 4);
wqwTerrain(G, -280, -280, 560, 560, lite ? 10 : 5, H, wqwS("b:cave", 0xFFFFFF, 4, { vc: 1 }), function (x, z, y, c) { var n = wqwFbm(x * 0.08, z * 0.08, 2); c.setRGB(0.46 + n * 0.1, 0.52 + n * 0.1, 0.66 + n * 0.12); });
for (var i = 0; i < (lite ? 20 : 40); i++) {
var a = i / 40 * Math.PI * 2, r = 210 + R() * 40, x = Math.cos(a) * r, z = Math.sin(a) * r;
var c = new THREE.Mesh(wqwGeo("pitRock", function () { var g = new THREE.DodecahedronGeometry(1, 1), p = g.attributes.position, r2 = wRand(19); for (var k = 0; k < p.count; k++)
p.setXYZ(k, p.getX(k) * (0.7 + r2() * 0.6), p.getY(k) * (0.8 + r2() * 0.6), p.getZ(k) * (0.7 + r2() * 0.6)); g.computeVertexNormals(); return g; }), rock);
c.scale.set(40 + R() * 30, 90 + R() * 60, 40 + R() * 30);
c.position.set(x, H(x, z) + 20, z);
c.rotation.y = R() * 6;
G.add(c);
}
var roof = new THREE.Mesh(new THREE.SphereGeometry(300, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), wqwLam(0x0A0C14, { ds: 1 }));
roof.position.y = 60;
G.add(roof);
var cold = wqwM("forgeCold", function () { var m = new THREE.MeshBasicMaterial({ color: 0x9AD8FF, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
[[0, 30, 3], [-30, 10, 1.6], [30, 10, 1.6], [-24, -40, 1.4], [24, -40, 1.4]].forEach(function (q, k) {
var x = q[0], z = q[1], s = q[2], y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
wqwCyl(g, 1.6 * s, 1.0 * s, 1.2 * s, wqwMat("iron"), 0, 0, 0, 12);
var fl = [];
for (var j = 0; j < 6; j++) {
var f = new THREE.Mesh(wqwGeo("forgeFl", function () { var c = new THREE.ConeGeometry(0.5, 2.6, 7, 1, true); c.translate(0, 1.3, 0); return c; }), cold);
f.position.set((R() - 0.5) * s * 1.6, 1.2 * s, (R() - 0.5) * s * 1.6);
f.scale.setScalar(s * (0.7 + R() * 0.6));
g.add(f);
fl.push(f);
}
var gl = wGlow(0xBFE8FF, 4 * s, 0.6);
gl.position.y = 2.4 * s;
g.add(gl);
if (!lite && k < 3 || k === 0) {
var L = new THREE.PointLight(0x8AC8FF, k === 0 ? 2.2 : 1.4, 90);
L.position.y = 5;
g.add(L);
}
g.userData.kind = "fire";
g.userData.fl = fl;
WQW.fx.push(g);
wqwRound(x, z, 1.7 * s);
});
(function () {
var x = 0, z = -10, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var bi = wqiIce(0x1A2A40, { kind: "deep", e: 0x0A1830 });
wqwBox(g, 3.4, 1.6, 1.8, bi, 0, 0, 0);
wqwBox(g, 4.6, 0.7, 2.2, bi, 0, 1.6, 0);
var horn = new THREE.Mesh(new THREE.ConeGeometry(0.7, 2.2, 8), bi);
horn.rotation.z = Math.PI / 2;
horn.position.set(3.3, 2.0, 0);
g.add(horn);
var ham = new THREE.Group();
ham.position.set(-0.8, 2.4, 0.4);
ham.rotation.z = 0.4;
g.add(ham);
wqwBox(ham, 0.14, 1.4, 0.14, wqwMat("iron"), 0, 0, 0);
wqwBox(ham, 0.7, 0.36, 0.36, wqwMat("iron"), 0, 1.3, 0);
var pour = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.6, 0.4, 16), wqwShine(0xE0E4EC, 0.12, 1));
pour.position.set(1, 2.5, 0);
g.add(pour);
wqwSolid(x, z, 4.6, 2.2, y - 1, y + 2.4, 0);
})();
WQW_FORGE_MIRROR = wqtMirror(G, -14, H(-14, -40), -40, 0.4, { cold: 1 });
for (i = 0; i < 8; i++) {
var x = -60 + R() * 120, z = -80 + R() * 60;
wqwCyl(G, 1.2, 0.9, 1.4, wqwMat("iron"), x, H(x, z), z, 10);
wqwRound(x, z, 1.2);
}
[[-40, 40], [44, 24], [30, -70], [-50, -60]].forEach(function (q, k) { var g = wqwCrx("imp", 1); g.position.set(q[0], H(q[0], q[1]), q[1]); g.rotation.y = Math.atan2(-q[0], -q[1]); G.add(g); WQW.people.push({ g: g, y: g.position.y, o: { wander: 8, sp: 0.5 } }); });
wqcMotes(G, lite ? 100 : 260, 0, 0, 120, 0.5, 30, 0x9AC8FF);
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var silv = wqwShine(0xD8DCE4, 0.18, 0.95), s = o.s || 1;
var face = new THREE.Mesh(new THREE.PlaneGeometry(1.6 * s, 2.4 * s), wqwM("mirrorFace", function () {
var t = wqwCanvas("mirrorT", 128, 256, function (c, W, H) { var gr = c.createLinearGradient(0, 0, W, H); gr.addColorStop(0, "#C8D8E8"); gr.addColorStop(0.5, "#F4F8FC"); gr.addColorStop(1, "#9AB0C8"); c.fillStyle = gr; c.fillRect(0, 0, W, H); c.fillStyle = "rgba(255,255,255,.5)"; c.fillRect(W * 0.2, 0, W * 0.08, H); });
var m = new THREE.MeshPhongMaterial({ map: t, color: 0xFFFFFF, emissive: 0x3A5A7A, emissiveIntensity: 0.3, shininess: 160, specular: 0xFFFFFF });
m.userData.noPhoto = 1;
return m;
}));
face.position.y = 1.4 * s + (o.lie ? 0 : 0.2);
g.add(face);
var frame = new THREE.Mesh(new THREE.TorusGeometry(1.0 * s, 0.08 * s, 6, 32), silv);
frame.scale.set(0.9, 1.3, 1);
frame.position.copy(face.position);
g.add(frame);
var thorns = [];
for (var i = 0; i < 26; i++) {
var a = i / 26 * Math.PI * 2;
thorns.push({ x: Math.cos(a) * 0.92 * s, y: face.position.y + Math.sin(a) * 1.32 * s, z: 0.02, s: s, rz: a - Math.PI / 2 });
}
wqwInst(g, wqwGeo("thorn", function () { var c = new THREE.ConeGeometry(0.035, 0.24, 5); c.translate(0, 0.12, 0); return c; }), silv, thorns, {});
if (!o.lie) {
wqwBox(g, 0.14 * s, 1.0 * s, 0.14 * s, silv, 0, 0, -0.1);
}
if (o.lie) {
g.rotation.x = -Math.PI / 2 + 0.25;
}
return g;
},
function (G) {
var lite = wqwLite(), H = wqtValleyH, R = wRand(7301), deep = wqiIce(0x2A4A70, { kind: "deep", e: 0x081830, rep: 0.04 }), blue = wqiIce(0x4A7AA8, { kind: "deep", e: 0x0E2848, rep: 0.05 });
wqwTerrain(G, -640, -640, 1280, 1280, lite ? 14 : 7, H, wqwS("snow", 0xFFFFFF, 5, { vc: 1 }), function (x, z, y, c) { var k = wqwSmooth(1, 10, y), n = wqwFbm(x * 0.04, z * 0.04, 2); c.setRGB(0.32 + n * 0.08 - k * 0.08 + 0.0, 0.46 + n * 0.08 - k * 0.06, 0.68 + n * 0.1 - k * 0.04); });
var slabs = [];
for (var i = 0; i < (lite ? 40 : 90); i++) {
var z = -200 + R() * 800, s = R() < 0.5 ? -1 : 1, w = 60 + Math.max(0, z) * 0.12, x = s * (w + 10 + R() * 60) - Math.sin(z * 0.01) * 30;
slabs.push({ x: x, z: z, y: H(x, z) - 6, s: 1, sx: 10 + R() * 24, sy: 30 + R() * 60, sz: 10 + R() * 20, ry: R() * 6 });
}
wqwInst(G, wqwGeo("iceSlab", function () { var g = new THREE.BoxGeometry(1, 1, 1, 2, 4, 2), p = g.attributes.position, r2 = wRand(29); for (var k = 0; k < p.count; k++) {
p.setX(k, p.getX(k) * (0.8 + r2() * 0.4));
p.setZ(k, p.getZ(k) * (0.8 + r2() * 0.4));
} g.translate(0, 0.5, 0); g.computeVertexNormals(); return g; }), deep, slabs, { shadow: !lite });
var pillars = wqwScatter(7302, lite ? 16 : 40, -120, -180, 120, 480, function (x, z) { return H(x, z) < 4 && Math.hypot(x - 14, z + 30) > 18 && Math.abs(x) > 14; }, H, 1, 2.5);
pillars.forEach(function (t) { wqcCrystal(G, t.x, t.y, t.z, 8 * t.s, 0x3A6A9A, { n: 4 }); });
for (i = 0; i < (lite ? 10 : 24); i++) {
var cx = -60 + R() * 120, cz = -160 + R() * 600;
var cr = new THREE.Mesh(new THREE.PlaneGeometry(0.6 + R() * 1.2, 14 + R() * 30), blue);
cr.rotation.x = -Math.PI / 2;
cr.rotation.z = R() * 3;
cr.position.set(cx, H(cx, cz) + 0.06, cz);
G.add(cr);
}
WQW_VALLEY_MIRROR = wqtMirror(G, 14, H(14, -30) + 0.25, -30, 0.3, { lie: 1, s: 0.6 });
WQW_VALLEY_MIRROR.userData.keep = 1;
var drift = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 8), wqwS("snow", 0xF4F6FA, 3));
drift.scale.set(1.2, 0.3, 0.8);
drift.position.set(14.6, H(14, -30) + 0.05, -29.4);
G.add(drift);
wqcMotes(G, lite ? 120 : 300, 0, 100, 200, 0.5, 30, 0xBFD8FF);
},
function (G) {
var lite = wqwLite(), R = wRand(7401);
for (var z = 780; z > -340; z -= 20) {
var y = wqtSkyY(z);
wqwRamp(0, z - 10, 140, 20, wqtSkyY(z), wqtSkyY(z - 20), 0);
}
var cloudT = wqwCanvas("cloud", 256, 256, function (c, W, H) { c.clearRect(0, 0, W, H); var r2 = wRand(5); for (var i = 0; i < 40; i++) {
var x = W / 2 + (r2() - 0.5) * W * 0.6, y = H / 2 + (r2() - 0.5) * H * 0.5, r = 20 + r2() * 60, g = c.createRadialGradient(x, y, 0, x, y, r);
g.addColorStop(0, "rgba(255,255,255,.55)");
g.addColorStop(1, "rgba(255,255,255,0)");
c.fillStyle = g;
c.fillRect(x - r, y - r, r * 2, r * 2);
} });
var cm = wqwM("cloudM", function () { var m = new THREE.MeshLambertMaterial({ map: cloudT, color: 0xA8B4D0, transparent: true, opacity: 0.7, depthWrite: false, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
var puffs = [];
for (var i = 0; i < (lite ? 160 : 420); i++) {
var zz = 800 - R() * 1150, x = (R() - 0.5) * 700, base = wqtSkyY(Math.max(-320, Math.min(780, zz)));
puffs.push({ x: x, y: base - 6 - R() * 60, z: zz, s: 30 + R() * 60, rx: -Math.PI / 2, rz: R() * 6 });
}
wqwInst(G, wqwGeo("puff", function () { return new THREE.PlaneGeometry(1, 1); }), cm, puffs, { cull: false });
var st = [];
for (i = 0; i < (lite ? 300 : 900); i++) {
st.push((R() - 0.5) * 1600, wqtSkyY(0) + R() * 600 - 100, -R() * 1400 + 400);
}
var sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.Float32BufferAttribute(st, 3));
var sp = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xFFFFFF, size: 1.6, transparent: true, opacity: 0.9, depthWrite: false }));
G.add(sp);
var bt = wqwCanvas("barrier", 256, 512, function (c, W, H) { var g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "rgba(200,180,255,0)"); g.addColorStop(0.5, "rgba(255,248,220,.6)"); g.addColorStop(1, "rgba(200,180,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.strokeStyle = "rgba(255,255,255,.25)"; for (var i = 0; i < 30; i++) {
c.beginPath();
c.moveTo(Math.random() * W, 0);
c.bezierCurveTo(Math.random() * W, H / 3, Math.random() * W, H * 2 / 3, Math.random() * W, H);
c.stroke();
} });
var bm = wqwM("barrierM", function () { var m = new THREE.MeshBasicMaterial({ map: bt, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide, fog: false }); m.userData.noPhoto = 1; return m; });
for (i = 0; i < 2; i++) {
var b = new THREE.Mesh(new THREE.PlaneGeometry(1400, 900, 1, 1), bm);
b.position.set(0, wqtSkyY(-320) + 200, -340 - i * 14);
G.add(b);
b.userData.kind = "float";
b.userData.y0 = b.position.y;
b.userData.amp = 3;
b.userData.f = 0.07;
b.userData.ph = i;
WQW.bob.push(b);
}
var crown = wGlow(0xFFF4D8, 160, 0.18);
crown.position.set(0, wqtSkyY(-320) + 320, -520);
G.add(crown);
},
function (G) {
var lite = wqwLite(), H = wqrAutumnH, R = wRand(7501);
wqwTerrain(G, -720, -720, 1440, 1440, lite ? 16 : 8, H, wqwS("grass", 0xFFFFFF, 4, { vc: 1 }), function (x, z, y, c) { var n = wqwFbm(x * 0.03, z * 0.03, 3); var m = wqwFbm(x * 0.11 + 7, z * 0.11, 2); var lf = Math.max(0, Math.min(1, (m + 0.1) * 2.2)); c.setRGB(0.40 + n * 0.08 + lf * 0.26, 0.40 + n * 0.06 - lf * 0.08, 0.16 + n * 0.04 - lf * 0.04); });
(function () {
var far = wqwScatter(7505, lite ? 120 : 420, -700, -700, 700, 700, function (x, z) { var r = Math.hypot(x, z); return r > 240 && r < 690; }, H, 1.0, 1.6);
wqxTrees(G, "maple", far.filter(function (t, i) { return i % 3 === 0; }), [0xC8301A, 0xE07A1A, 0xB8401A], { noSolid: 1 });
wqxTrees(G, "oak", far.filter(function (t, i) { return i % 3 === 1; }), [0xC8901A, 0x9A5A1A], { noSolid: 1 });
wqxTrees(G, "birch", far.filter(function (t, i) { return i % 3 === 2; }), [0xE8C040, 0xD8A030], { noSolid: 1 });
var sh = wqwScatter(7506, lite ? 200 : 700, -260, -200, 200, 380, function (x, z) { return Math.abs(x - Math.sin(z * 0.01) * 20) > 5 && Math.hypot(x, z - 60) > 22; }, H, 0.6, 1.3);
[0x8A3A12, 0xB8601A, 0x6A4A1A].forEach(function (col, k) { wqwInst(G, wqwGeo("autShrub", function () { var parts = [], r2 = wRand(91); for (var i = 0; i < 5; i++) {
var c = wqwCards(2, 1.0, 0.9, 0, 0);
c.rotateY(r2() * 3);
c.translate((r2() - 0.5) * 0.9, 0, (r2() - 0.5) * 0.9);
parts.push(c);
} return gwMerge(parts); }), wqxLeafM(col), sh.filter(function (t, i) { return i % 3 === k; }), {}); });
})();
var trees = wqwScatter(7502, lite ? 120 : 320, -680, -680, 680, 680, function (x, z) { return Math.hypot(x, z - 60) > 70 && Math.abs(x - Math.sin(z * 0.01) * 20) > 10; }, H, 0.8, 1.5);
wqxTrees(G, "maple", trees.filter(function (t, i) { return i % 2; }), [0xC8401A, 0xE0A020, 0xA8280E]);
wqxTrees(G, "oak", trees.filter(function (t, i) { return !(i % 2); }), [0xD87A1A, 0xC8B040], { noSolid: 1 });
trees.forEach(function (t) { wqwRound(t.x, t.z, 0.7); });
wqwStrip(G, (function () { var p = []; for (var z = 340; z >= 70; z -= 20)
p.push([Math.sin(z * 0.01) * 20, z]); return p; })(), 3, function (x, z) { return H(x, z) + 0.04; }, wqwMat("earth"), 0.05);
var leaves = wqwScatter(7503, lite ? 700 : 2200, -300, -300, 300, 400, null, H, 0.6, 1.3).map(function (t) { t.y += 0.04; t.rx = -Math.PI / 2; t.rz = t.ry; return t; });
[0xC8501A, 0xE0A020, 0x8A2A10, 0xD88A30].forEach(function (col, k) { wqwInst(G, wqwGeo("leafP", function () { return new THREE.PlaneGeometry(0.22, 0.16); }), wqwLam(col, { ds: 1 }), leaves.filter(function (t, i) { return i % 4 === k; }), {}); });
wqcMotes(G, lite ? 200 : 600, 0, 60, 260, 1, 20, 0xE89A40);
(function () {
var x = 0, z = 60, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var st = wqwMat("greystone");
for (var k = 0; k < 20; k++) {
var a = k / 20 * Math.PI * 2;
if (Math.abs(a - Math.PI / 2) < 0.25)
continue;
var w = wqwBox(g, 6.6, 0.9, 0.7, st, Math.cos(a) * 20, 0, Math.sin(a) * 20);
w.rotation.y = -a + Math.PI / 2;
wqwSolid(x + Math.cos(a) * 20, z + Math.sin(a) * 20, 1, 1, y - 1, y + 0.9, 0);
}
var roses = [], dead = [];
for (k = 0; k < 120; k++) {
var a2 = R() * Math.PI * 2, r = 6 + R() * 11;
var q = { x: Math.cos(a2) * r, y: 0, z: Math.sin(a2) * r, s: 0.7 + R() * 0.5, ry: R() * 6 };
roses.push(q);
}
WQW_ROSES = new THREE.Group();
WQW_ROSES.userData.keep = 1;
g.add(WQW_ROSES);
WQW_ASH = new THREE.Group();
WQW_ASH.userData.keep = 1;
g.add(WQW_ASH);
WQW_ASH.visible = false;
wqwInst(WQW_ROSES, wqwGeo("roseBush", function () { var parts = [], r2 = wRand(41); for (var i = 0; i < 3; i++) {
var c = new THREE.IcosahedronGeometry(0.45, 1);
c.translate((r2() - 0.5) * 0.6, 0.45 + r2() * 0.3, (r2() - 0.5) * 0.6);
parts.push(c.toNonIndexed());
} return wqwMerge(parts); }), wqwLam(0x2E4A22), roses, {});
wqwInst(WQW_ROSES, wqwGeo("roseBloom", function () { var parts = [], r2 = wRand(42); for (var i = 0; i < 6; i++) {
var c = new THREE.IcosahedronGeometry(0.11, 0);
c.translate((r2() - 0.5) * 0.9, 0.7 + r2() * 0.4, (r2() - 0.5) * 0.9);
parts.push(c.toNonIndexed());
} return wqwMerge(parts); }), wqwLam(0xA8102A), roses, {});
wqwInst(WQW_ASH, wqwGeo("roseBush", null), wqwLam(0x3A3430), roses, {});
wqwInst(WQW_ASH, wqwGeo("ashPile", function () { var c = new THREE.SphereGeometry(0.5, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1, 0.25, 1); return c; }), wqwLam(0x6A6460), roses, {});
wqwBox(g, 3, 0.5, 0.9, st, -6, 0, -8);
wqwBox(g, 3, 0.1, 0.9, wqwMat("oak"), -6, 0.5, -8);
wqwCyl(g, 0.4, 0.5, 1.1, st, 0, 0, 0, 10);
var dial = wqwCyl(g, 0.7, 0.7, 0.06, wqwMat("brass"), 0, 1.1, 0, 20);
})();
wqwSpot(6, 52, 3, "The roses", "smell the roses", function () { wqbSay(WQW_ASH && WQW_ASH.visible ? "🥀 Ash. Only ash, where the roses were." : "🌹 Deep red roses, heavy and sweet, in the light that never ends."); }, H(6, 52));
wqwHouse(G, 160, -40, 10, 8, 6, { y: H(160, -40), ry: -0.6, wall: wqwS("b:stucco", 0xD8C8A8, 3), roof: wqwS("b:slate", 0x6A4A3A, 2), shut: 0x6A2A10 });
wqwSmoke(G, 163, H(160, -40) + 9, -42, 0x9A8A7A, 8);
wqwPlant(G, "tree", [{ x: -30, z: 40, y: H(-30, 40), s: 1.1, ry: 1 }], { col: 0x5A7A2A });
for (var k = 0; k < 14; k++) {
var ap = new THREE.Mesh(wqwGeo("apple", function () { return new THREE.SphereGeometry(0.12, 8, 6); }), wqwLam(0xC82A1A));
ap.position.set(-30 + (R() - 0.5) * 6, H(-30, 40) + 7 + R() * 3, 40 + (R() - 0.5) * 6);
G.add(ap);
}
},
function (G) {
var lite = wqwLite(), H = wqrSpringH, R = wRand(7601);
wqwTerrain(G, -720, -720, 1440, 1440, lite ? 16 : 8, H, wqwS("grass", 0xFFFFFF, 4, { vc: 1 }), function (x, z, y, c) { var n = wqwFbm(x * 0.03, z * 0.03, 3); var m = wqwFbm(x * 0.11 + 3, z * 0.11, 2); c.setRGB(0.30 + n * 0.1 + m * 0.05, 0.44 + n * 0.1 - m * 0.03, 0.2 + n * 0.05); });
var sh = wqwCanvas("shimmer", 128, 256, function (c, W, Hh) { var g = c.createLinearGradient(0, 0, 0, Hh); g.addColorStop(0, "rgba(255,240,250,0)"); g.addColorStop(0.5, "rgba(255,230,250,.5)"); g.addColorStop(1, "rgba(255,240,250,0)"); c.fillStyle = g; c.fillRect(0, 0, W, Hh); });
var shm = new THREE.Mesh(new THREE.PlaneGeometry(1200, 40), wqwM("shimM", function () { var m = new THREE.MeshBasicMaterial({ map: sh, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
shm.position.set(0, H(0, 380) + 18, 380);
G.add(shm);
var fl = wqwScatter(7602, lite ? 900 : 2600, -500, -400, 500, 380, function (x, z) { return Math.hypot(x, z + 120) > 16; }, H, 0.7, 1.3);
["#F8C8D8", "#F8F0A0", "#C8A8F0", "#FFFFFF", "#F89AB0", "#A8D8F8"].forEach(function (c, k) { wqwPlant(G, "flowers", fl.filter(function (t, i) { return i % 6 === k; }), { col: c }); });
wqwPlant(G, "grass", wqwScatter(7603, lite ? 600 : 1800, -500, -400, 500, 380, null, H, 0.8, 1.4), { col: 0xA8D088 });
var bl = wqwScatter(7604, lite ? 40 : 110, -650, -650, 650, 650, function (x, z) { return Math.hypot(x, z + 120) > 40 && Math.hypot(x + 40, z - 60) > 26 && Math.abs(x) > 12; }, H, 0.8, 1.3);
wqxTrees(G, "maple", bl.filter(function (t, i) { return i % 2; }), [0xF4B8D0, 0xF8D8E8, 0xFFFFFF], { noSolid: 1 });
wqxTrees(G, "oak", bl.filter(function (t, i) { return !(i % 2); }), [0x6AA84A, 0x8AC060], { noSolid: 1 });
bl.forEach(function (t) { wqwRound(t.x, t.z, 0.7); });
var orch = [];
for (var i = 0; i < 6; i++)
for (var j = 0; j < 5; j++)
orch.push({ x: -190 + i * 16, z: -160 + j * 16, y: H(-190 + i * 16, -160 + j * 16), s: 0.8, ry: R() * 6 });
wqxTrees(G, "oak", orch.map(function (t) { t.s = 0.65; return t; }), [0x5A9A3A, 0xFFFFFF, 0x6AA84A], { noSolid: 1 });
orch.forEach(function (t) { wqwRound(t.x, t.z, 0.6); });
var apples = [];
orch.forEach(function (t) { for (var k = 0; k < 8; k++)
apples.push({ x: t.x + (R() - 0.5) * 5, y: t.y + 6 + R() * 3, z: t.z + (R() - 0.5) * 5, s: 1 }); });
wqwInst(G, wqwGeo("apple", function () { return new THREE.SphereGeometry(0.12, 8, 6); }), wqwLam(0xD8301A), apples, {});
(function () { var x = 40, z = -20, y = H(x, z); wqwCyl(G, 5, 5.4, 0.8, wqwMat("marble"), x, y, z, 24); wqwWater(G, x, z, 8.6, 8.6, y + 0.7, 0x6AB0D8, 0.85); wqwCyl(G, 0.6, 0.9, 3, wqwMat("marble"), x, y, z, 12); wqwCyl(G, 2, 1.6, 0.4, wqwMat("marble"), x, y + 3, z, 16); wqwRound(x, z, 5.4, -50, y + 0.8); })();
wqwSpot(40, -12, 4, "The fountain", "drink from the fountain", function () { wqbSay("💧 The water is cold and sweet, and tastes of blossom."); }, H(40, -12));
wqwSpot(-150, -112, 5, "The orchard", "pick an apple", function () { wqbSay("🍎 The apples here are always ripe. This one is warm from a sun that never moves from noon."); }, H(-150, -112));
var ring = [];
for (i = 0; i < 60; i++) {
var a = i / 60 * Math.PI * 2;
ring.push({ x: -40 + Math.cos(a) * 12, z: 60 + Math.sin(a) * 12, y: H(-40 + Math.cos(a) * 12, 60 + Math.sin(a) * 12), s: 1, ry: a });
}
wqwPlant(G, "flowers", ring, { col: "#FFFFFF" });
wqcMotes(G, lite ? 120 : 300, 0, 60, 240, 0.5, 8, 0xFFF0A0);
},
function (G) {
var lite = wqwLite(), H = wqdCraterH, R = wRand(7701);
wqwTerrain(G, -720, -720, 1440, 1440, lite ? 14 : 6, H, wqwS("snow", 0xFFFFFF, 5, { vc: 1 }), function (x, z, y, c) {
var r = Math.hypot(x, z), burn = wqwSmooth(46, 20, r), n = wqwFbm(x * 0.05, z * 0.05, 2);
c.setRGB(0.92 - burn * 0.5 + n * 0.04, 0.94 - burn * 0.46 + n * 0.04, 0.98 - burn * 0.38);
});
var rocks = [];
for (var i = 0; i < (lite ? 30 : 70); i++) {
var a = R() * Math.PI * 2, r = 20 + R() * 36;
rocks.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, y: H(Math.cos(a) * r, Math.sin(a) * r) - 0.3, s: 0.5 + R() * 1.4, ry: R() * 6 });
}
wqwInst(G, wqwGeo("craterRock", function () { var g = new THREE.DodecahedronGeometry(1, 0); g.scale(1, 0.6, 1); return g; }), wqwS("b:strata", 0x5A5048, 4), rocks, { shadow: !lite });
var glass = new THREE.Mesh(new THREE.CircleGeometry(10, 24), wqiIce(0x8AB0D0, { kind: "deep", op: 0.85 }));
glass.rotation.x = -Math.PI / 2;
glass.position.set(0, H(0, 0) + 0.05, 0);
G.add(glass);
var snapped = [];
for (i = 0; i < (lite ? 24 : 60); i++) {
var a2 = R() * Math.PI * 2, r2 = 60 + R() * 90, x = Math.cos(a2) * r2, z = Math.sin(a2) * r2;
snapped.push({ x: x, z: z, y: H(x, z) + 0.5, s: 0.8 + R() * 0.6, ry: -a2, rz: Math.PI / 2 - 0.1 });
}
wqwInst(G, wqwGeo("fallenTrunk", function () { var c = new THREE.CylinderGeometry(0.3, 0.45, 9, 7); c.translate(0, 4.5, 0); return c; }), wqwMat("darkbark"), snapped, { shadow: !lite });
wqwInst(G, wqwGeo("stump", function () { var c = new THREE.CylinderGeometry(0.4, 0.5, 1.4, 7); c.translate(0, 0.7, 0); return c; }), wqwMat("darkbark"), snapped.map(function (t) { return { x: t.x, z: t.z, y: t.y - 0.6, s: t.s, ry: t.ry }; }), {});
wqwPlant(G, "conifer", wqwScatter(7702, lite ? 60 : 160, -700, -700, 700, 700, function (x, z) { var r = Math.hypot(x, z); return r > 170 && Math.hypot(x - 20, z - 200) > 110 && Math.abs(x + 30 * Math.min(1, Math.max(0, -z / 260))) > 8; }, H, 0.8, 1.4), { col: 0xC8D8E0 });
var houses = [[-10, 170, 0.3], [30, 160, -0.2], [60, 190, -0.8], [-40, 205, 0.9], [0, 235, 0.1], [45, 240, -0.5], [80, 230, -1.2], [-60, 245, 1.2], [20, 280, 0], [-20, 300, 0.4]];
houses.forEach(function (q, k) {
var x = q[0], z = q[1], ry = q[2] + Math.PI, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var wd = wqwS("b:planks", 0x8A6A4A, 2), w = 9, d = 7;
wqwBox(g, w, 3.4, d, wd, 0, 0, 0);
var rf = new THREE.Mesh(wqwGeo("gable", function () { var s = new THREE.Shape(); s.moveTo(-5.2, 0); s.lineTo(0, 3.2); s.lineTo(5.2, 0); s.lineTo(-5.2, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 8, bevelEnabled: false }); e.translate(0, 0, -4); return e; }), wqwS("snow", 0xF4F6FA, 3));
rf.position.y = 3.4;
g.add(rf);
wqwBox(g, 0.9, 3, 0.9, wqwMat("stone"), 3, 3.4, -1.5);
wqwSmoke(g, 3, 6.6, -1.5, 0xA8A098, 6);
[-2.6, 2.6].forEach(function (wx) { var win = wqwBox(g, 1.1, 1.1, 0.08, wqwGlowM(0xFFB860, k % 3 ? 0.85 : 0.3), wx, 1.2, d / 2 + 0.02); if (k % 3 === 0) {
var cr = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), wqwLam(0x1A1410));
cr.position.set(wx, 1.75, d / 2 + 0.08);
g.add(cr);
} });
wqwSolid(x, z, w + 0.4, d + 0.4, y - 1, y + 7, ry);
if (k < 6)
wqwDoorTo(G, "crater", k, x + Math.sin(ry) * 3.7, z + Math.cos(ry) * 3.7, ry, "The door of a house in the village", 9, 7, { col: 0x4A2E1A, frame: wqwS("b:planks", 0x6A4A2A, 2), y: y });
});
for (var r3 = 0; r3 < 6; r3++) {
var gR = wqwRoomBuild(G, "crater", r3, 9, 7, 3, { wall: wqwS("b:planks", 0xA88A64, 2), floor: wqwMat("planks"), ceil: wqwS("b:planks", 0x8A6A4A, 2), env: "cottage", doorName: "The door, out to the snow" });
wqwFurnish(gR, 9, 7, r3 % 2 ? "poor" : "home", 400 + r3);
}
wqwStrip(G, [[0, 60], [6, 120], [14, 170], [20, 240], [20, 320]], 3.4, function (x, z) { return H(x, z) + 0.05; }, wqwS("snow", 0xD8DCE0, 3), 0.05);
wqcMotes(G, lite ? 200 : 500, 0, 0, 300, 1, 40, 0xFFFFFF);
wqcMoons(G, { n: 1 });
},
function (x, z) {
var n = wqwFbm(x * 0.006 + 3, z * 0.006, 4), h = n * 9 + wqwFbm(x * 0.04, z * 0.04, 2) * 0.7;
var north = Math.max(0, -z - 170), side = wqwSmooth(70, 190, Math.abs(x - 0.04 * Math.min(0, z + 170)));
h += north * 0.15 + north * side * 0.85 * (0.6 + n * 0.7);
var ridge = wqwSmooth(150, 300, x) * (1 - wqwSmooth(160, 320, Math.abs(z + 20))) * 52;
h += ridge;
h += wqwSmooth(640, 880, Math.hypot(x, z)) * 190 * (0.5 + n);
return h;
},
function (G, n, z0, y0) {
var t = wqwCanvas("aurora", 256, 128, function (c, W, Hh) {
var g = c.createLinearGradient(0, Hh, 0, 0);
g.addColorStop(0, "rgba(80,255,170,0)");
g.addColorStop(0.15, "rgba(90,255,180,.55)");
g.addColorStop(0.55, "rgba(90,200,255,.28)");
g.addColorStop(1, "rgba(170,110,255,0)");
c.fillStyle = g;
c.fillRect(0, 0, W, Hh);
for (var i = 0; i < 60; i++) {
c.fillStyle = "rgba(255,255,255," + (Math.random() * 0.12) + ")";
c.fillRect(Math.random() * W, 0, 1 + Math.random() * 2, Hh);
}
});
var m = wqwM("auroraM", function () { var mm = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }); mm.userData.noPhoto = 1; return mm; });
var grp = new THREE.Group();
G.add(grp);
for (var i = 0; i < n; i++) {
var geo = new THREE.PlaneGeometry(1800, 260, 40, 1), p = geo.attributes.position;
for (var k = 0; k < p.count; k++)
p.setZ(k, Math.sin(p.getX(k) * 0.004 + i * 1.7) * 180);
var a = new THREE.Mesh(geo, m);
a.position.set(-200 + i * 160, (y0 || 520) + i * 60, z0 - i * 120);
a.rotation.x = -0.15;
grp.add(a);
a.userData.kind = "float";
a.userData.y0 = a.position.y;
a.userData.amp = 8;
a.userData.f = 0.05;
a.userData.ph = i;
WQW.bob.push(a);
}
return grp;
},
function (G) {
var lite = wqwLite(), H = wqeNorthH, R = wRand(8801);
wqwTerrain(G, -900, -900, 1800, 1800, lite ? 14 : 7, H, wqwS("snow", 0xFFFFFF, 5, { vc: 1, shine: 3, spec: 0x0A0A0A }), function (x, z, y, c) {
var n = wqwFbm(x * 0.05, z * 0.05, 2), rock = wqwSmooth(30, 90, y) * wqwSmooth(0.4, 0.8, wqwFbm(x * 0.02, z * 0.02, 3));
c.setRGB(0.93 - rock * 0.5 + n * 0.03, 0.95 - rock * 0.5 + n * 0.03, 0.99 - rock * 0.44);
});
var gp = [[0, -150], [2, -240], [4, -330], [10, -440], [18, -560], [26, -700], [30, -860]];
wqwStrip(G, gp, 96, function (x, z) { return H(x, z) + 1.4; }, wqiIce(0xA8D0F0, { kind: "deep", op: 0.97 }), 0);
wqwStrip(G, gp.map(function (p) { return [p[0] + 30, p[1]]; }), 30, function (x, z) { return H(x, z) + 1.5; }, wqiIce(0xD8ECFA, { op: 0.95 }), 0);
var ser = [];
for (var i = 0; i < (lite ? 30 : 80); i++) {
var t = R(), k = Math.min(gp.length - 2, Math.floor(t * (gp.length - 1))), f = t * (gp.length - 1) - k, x = gp[k][0] + (gp[k + 1][0] - gp[k][0]) * f + (R() - 0.5) * 80, z = gp[k][1] + (gp[k + 1][1] - gp[k][1]) * f;
ser.push({ x: x, z: z, y: H(x, z) + 1, s: 1.5 + R() * 4, ry: R() * 6 });
}
wqwInst(G, wqwGeo("serac", function () { var g = new THREE.DodecahedronGeometry(1, 0); g.scale(1, 1.6, 0.8); return g; }), wqiIce(0xC8E4F8, { op: 0.92 }), ser, {});
for (i = 0; i < 9; i++) {
var fx = -44 + i * 11;
wqcCrystal(G, fx, H(fx, -152), -152 - R() * 6, 6 + R() * 9, 0xBFE4FF, { n: 4 });
}
var work = new THREE.Group();
G.add(work);
for (i = 0; i < (lite ? 8 : 16); i++) {
var a = i / 16 * Math.PI * 2, r = 8 + R() * 14, wx = -6 + Math.cos(a) * r, wz = -128 + Math.sin(a) * r;
wqcCrystal(work, wx, H(wx, wz), wz, 2 + R() * 5, 0xA8F0FF, { n: 3 });
}
var wglow = wGlow(0xA8F0FF, 40, 0.35);
wglow.position.set(-6, H(-6, -128) + 6, -128);
work.add(wglow);
wqcMotes(work, lite ? 80 : 200, -6, -128, 24, 0, 18, 0xDFF8FF);
wqwShow("working", work, false);
var rocks = [];
for (i = 0; i < (lite ? 40 : 110); i++) {
var rx = (R() - 0.5) * 1500, rz = (R() - 0.5) * 1500;
if (Math.hypot(rx, rz) < 220)
continue;
rocks.push({ x: rx, z: rz, y: H(rx, rz) - 0.4, s: 1 + R() * 4, ry: R() * 6 });
}
wqwInst(G, wqwGeo("nRock", function () { var g = new THREE.DodecahedronGeometry(1, 0); g.scale(1.3, 0.7, 1); return g; }), wqwS("b:slate", 0x6A6E78, 4), rocks, { shadow: !lite });
wqwPlant(G, "conifer", wqwScatter(8802, lite ? 40 : 120, -800, -200, 800, 800, function (x, z) { return Math.hypot(x, z) > 140 && Math.hypot(x - WQE_TOWER.x, z - WQE_TOWER.z) > 40 && Math.abs(x) > 30; }, H, 0.7, 1.2), { col: 0xD8E4EA });
wqeAurora(G, 3, -700, 520);
wqcMoons(G, { n: 1 });
(function () {
var T = WQE_TOWER, y = H(T.x, T.z), g = new THREE.Group();
g.position.set(T.x, y, T.z);
G.add(g);
var stone = wqwS("b:slate", 0x2E2A30, 3, { shine: 18, spec: 0x2A2A30 });
var talon = new THREE.Mesh(wqwTaper([[0, -6, 0], [0, 24, 0], [2, 46, 0], [10, 64, 0], [24, 74, 0]], [12, 10, 7.5, 3.6, 0.5], 24, 14), stone);
talon.castShadow = !lite;
g.add(talon);
[[-1, 18, 8], [1, 10, 10], [0, 34, 7]].forEach(function (q) { var b = new THREE.Mesh(wqwTaper([[0, 0, 0], [q[0] * 6, q[1] * 0.4, 4], [q[0] * 10, q[1] * 0.2, q[2]]], [3, 1.8, 0.3], 8, 8), stone); b.position.set(0, q[1], 0); b.rotation.y = q[0] * 1.4 + Math.PI; g.add(b); });
var wl = wqwGlowM(0xFF7A3A, 0.85);
[[0, 14, -1.7, 6], [0, 26, -1.1, 4.8], [0.6, 38, -0.6, 4], [2.1, 48, 0.2, 3.2]].forEach(function (q) { var a = q[2] * Math.PI / 2, w = new THREE.Mesh(wqwGeo("twin", function () { return new THREE.PlaneGeometry(1.4, 2.6); }), wl); var rr = 10.6 - q[1] * 0.11; w.position.set(q[0] + Math.sin(a) * rr, q[1], Math.cos(a) * rr); w.rotation.y = a; g.add(w); });
var rl = new THREE.PointLight(0xFF8A4A, lite ? 0.6 : 1.0, 60);
rl.position.set(-14, 30, 0);
g.add(rl);
for (var s = 0; s < 6; s++)
wqwBox(g, 4, 0.3, 1.2, stone, -13 - s * 1.1, -0.3 - s * 0.3 + 0.15, 0, Math.PI / 2);
wqwRound(T.x, T.z, 11.5, y - 4, y + 80);
var rub = new THREE.Group();
g.add(rub);
for (var q = 0; q < 26; q++) {
var a2 = R() * Math.PI * 2, r2 = 13 + R() * 14, b2 = wqwBox(rub, 0.8 + R() * 1.6, 0.6 + R() * 1.0, 0.8 + R() * 1.4, stone, Math.cos(a2) * r2, 0, Math.sin(a2) * r2);
b2.rotation.set(R(), R() * 3, R());
}
wqwShow("tornOut", rub, false);
})();
wqwDoorTo(G, "north", 0, WQE_TOWER.x - 13.2, WQE_TOWER.z, -Math.PI / 2, "The door of Gerda's tower", 14, 12, { col: 0x2A1418, frame: wqwS("b:slate", 0x2E2A30, 3), y: H(WQE_TOWER.x - 13.2, WQE_TOWER.z) });
(function () {
var W = 14, D = 12, Hh = 5, gR = wqwRoomBuild(G, "north", 0, W, D, Hh, { wall: wqwS("b:ashlar", 0x7A6A6E, 2), floor: wqwS("b:slate", 0x4A4042, 2), ceil: wqwS("b:slate", 0x241E20, 3), env: "towerroom", doorName: "The stair, down and out of the tower" });
wqwRug(gR, 0, 0.5, 7, 6, 0x5A1A1A);
wqwBox(gR, 3, 2.6, 0.8, wqwS("b:slate", 0x2E2A30, 3), 6.4, 0, 1.5, Math.PI / 2);
wqwFire(gR, 6.2, 0.2, 1.5, 0.8);
var hl = new THREE.PointLight(0xFF9A5A, 1.2, 16);
hl.position.set(5.6, 1.4, 1.5);
gR.add(hl);
wqwBed(gR, 4, -3.2, 0, 0x6A1A1A);
wqwChest(gR, -5.8, -4.6, 0);
wqwShelves(gR, -6.7, -1, 2.6, 2.4, Math.PI / 2);
var t = wqwTable(gR, -4.4, 1, 1.6, 0.9, 0.8, wqwMat("oak"));
var vase = new THREE.Group();
vase.position.set(-4.4, 0.8, 1);
gR.add(vase);
var vb = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.4, 12), wqwShine(0x3A5A8A, 0.1, 0.2));
vb.position.y = 0.2;
vase.add(vb);
for (var i = 0; i < 5; i++) {
var st = wqwBox(vase, 0.02, 0.5, 0.02, wqwLam(0x4A6A2A), (i - 2) * 0.05, 0.4, 0);
var fl = new THREE.Mesh(wqwGeo("lily", function () { return new THREE.ConeGeometry(0.08, 0.14, 6, 1, true); }), wqwLam(0xF4ECE0));
fl.position.set((i - 2) * 0.05, 0.92, 0);
fl.rotation.x = Math.PI;
vase.add(fl);
}
wqwShow("vaseWhole", vase, true);
var shards = new THREE.Group();
shards.position.set(-6.2, 0, 0.6);
gR.add(shards);
for (i = 0; i < 9; i++) {
var sb = wqwBox(shards, 0.12, 0.03, 0.1, wqwShine(0x3A5A8A, 0.1, 0.2), (R() - 0.5) * 0.8, 0, (R() - 0.5) * 0.8);
sb.rotation.y = R() * 3;
}
for (i = 0; i < 4; i++)
wqwBox(shards, 0.02, 0.02, 0.5, wqwLam(0x6A6A4A), (R() - 0.5) * 0.8, 0.01, (R() - 0.5) * 0.8);
wqwShow("vaseBroken", shards, false);
var nt = wqwCanvas("towerNight", 128, 192, function (c, W2, H2) {
var g = c.createLinearGradient(0, 0, 0, H2);
g.addColorStop(0, "#050A1E");
g.addColorStop(0.55, "#0E2A4A");
g.addColorStop(0.8, "#1E6A5A");
g.addColorStop(1, "#C8D8E8");
c.fillStyle = g;
c.fillRect(0, 0, W2, H2);
for (var i = 0; i < 70; i++) {
c.fillStyle = "rgba(255,255,255," + (0.3 + Math.random() * 0.7) + ")";
c.fillRect(Math.random() * W2, Math.random() * H2 * 0.6, 1, 1);
}
c.fillStyle = "rgba(120,255,190,.25)";
for (i = 0; i < 5; i++) {
c.beginPath();
c.ellipse(W2 * (0.2 + i * 0.15), H2 * (0.45 + Math.sin(i) * 0.05), 18, 40, 0.3, 0, 6.3);
c.fill();
}
c.fillStyle = "#E8EEF6";
c.beginPath();
c.moveTo(0, H2);
c.lineTo(W2 * 0.25, H2 * 0.82);
c.lineTo(W2 * 0.45, H2 * 0.9);
c.lineTo(W2 * 0.7, H2 * 0.78);
c.lineTo(W2, H2 * 0.88);
c.lineTo(W2, H2);
c.fill();
});
var night = wqwM("towerNightM", function () { var m = new THREE.MeshBasicMaterial({ map: nt, fog: false }); m.userData.noPhoto = 1; return m; }), torn = new THREE.Group(), fr = wqwS("b:slate", 0x2E2A30, 3);
[-4, 0, 4].forEach(function (x) {
var w = new THREE.Mesh(wqwGeo("twin2", function () { return new THREE.PlaneGeometry(1.8, 2.8); }), night);
w.position.set(x, 2.6, -D / 2 + 0.26);
gR.add(w);
wqwBox(gR, 2.2, 0.2, 0.3, fr, x, 1.1, -D / 2 + 0.3);
wqwBox(gR, 2.2, 0.2, 0.3, fr, x, 4.0, -D / 2 + 0.3);
wqwBox(gR, 0.2, 2.9, 0.3, fr, x - 1.0, 1.15, -D / 2 + 0.3);
wqwBox(gR, 0.2, 2.9, 0.3, fr, x + 1.0, 1.15, -D / 2 + 0.3);
wqwBox(gR, 0.08, 2.8, 0.06, fr, x, 1.2, -D / 2 + 0.3);
});
var tt = wqwCanvas("teared", 128, 128, function (c, W2, H2) { var g = c.createLinearGradient(0, 0, W2, H2); g.addColorStop(0, "#3A0A5A"); g.addColorStop(0.5, "#0A5A3A"); g.addColorStop(1, "#1A0A1A"); c.fillStyle = g; c.fillRect(0, 0, W2, H2); c.strokeStyle = "rgba(230,200,255,.8)"; c.lineWidth = 3; for (var i = 0; i < 4; i++) {
c.beginPath();
c.moveTo(Math.random() * W2, 0);
c.lineTo(Math.random() * W2, H2);
c.stroke();
} });
var tm = wqwM("tearWin", function () { var m = new THREE.MeshBasicMaterial({ map: tt, fog: false }); m.userData.noPhoto = 1; return m; });
[-4, 0, 4].forEach(function (x) { var w = new THREE.Mesh(wqwGeo("twin2", function () { return new THREE.PlaneGeometry(1.8, 2.8); }), tm); w.position.set(x, 2.6, -D / 2 + 0.28); torn.add(w); });
gR.add(torn);
wqwShow("tearSky", torn, false);
var wreck = new THREE.Group();
gR.add(wreck);
for (i = 0; i < 16; i++) {
var b = wqwBox(wreck, 0.4 + R() * 0.9, 0.3 + R() * 0.5, 0.4 + R() * 0.8, wqwS("b:slate", 0x3A3236, 3), (R() - 0.5) * (W - 2), 0, -D / 2 + 1 + R() * 4);
b.rotation.set(R() * 0.4, R() * 3, R() * 0.4);
}
for (i = 0; i < 10; i++)
wqcCrystal(wreck, (R() - 0.5) * (W - 1), R() * 2.5, -D / 2 + 0.4, 0.6 + R() * 1.2, 0xCFEFFF, { n: 3 });
wqwShow("torn", wreck, false);
wqwSpot(gR.position.x + 0, gR.position.z - D / 2 + 1.2, 2.2, "The window", "look out of the window", function () { wqbSay(WQW.shows.tearSky && WQW.shows.tearSky.visible ? "🌌 The sky is torn open, and through the wounds come colours that hurt to see." : "🌌 Below, the glacier runs pale under the aurora, and the mountains stand black against it."); }, WQW_IN_Y);
})();
},
function (x, z) {
var n = wqwFbm(x * 0.006 + 9, z * 0.006, 4), h = n * 8;
var valley = x < 200 ? Math.pow(Math.abs(z + wqwFbm(x * 0.004, 1, 2) * 60 - 60) / 240, 2) * 16 : 0;
var steppe = wqwSmooth(150, 320, x);
h = h * (1 - steppe * 0.7) + valley * (1 - steppe) + steppe * (4 + n * 3);
h -= wqwSmooth(14, 2, Math.abs(z - 60 + Math.sin(x * 0.01) * 16)) * (x < 200 ? 2 : 0);
h += wqwSmooth(640, 880, Math.hypot(x, z)) * 120 * (0.5 + n);
return h;
},
function (G) {
var lite = wqwLite(), H = wqeSouthH, R = wRand(8901);
var fieldK = function (x, z) { var fx = Math.floor((x + 1000) / 46), fz = Math.floor((z + 1000) / 38); return wqwHash(fx, fz); };
wqwTerrain(G, -900, -900, 1800, 1800, lite ? 14 : 7, H, wqwS("grass", 0xFFFFFF, 4, { vc: 1, shine: 2, spec: 0x040404 }), function (x, z, y, c) {
var n = wqwFbm(x * 0.05, z * 0.05, 2), st = wqwSmooth(150, 320, x), f = fieldK(x, z);
var r = 0.36 + n * 0.08, g = 0.37 + n * 0.08, b = 0.20;
if (x < 160 && Math.abs(z - 60) < 200) {
if (f < 0.33) {
r = 0.62;
g = 0.52;
b = 0.28;
}
else if (f < 0.6) {
r = 0.40;
g = 0.34;
b = 0.22;
}
else {
r = 0.38;
g = 0.42;
b = 0.22;
}
r += n * 0.06;
g += n * 0.05;
}
c.setRGB(r * (1 - st) + (0.70 + n * 0.08) * st, g * (1 - st) + (0.62 + n * 0.06) * st, b * (1 - st) + (0.40 + n * 0.04) * st);
});
var fm = wqwM("firstFrostM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xF4F8FC, transparent: true, opacity: 0.82, depthWrite: false, map: wqwPhotoTex("snow", 5) }); m.userData.noPhoto = 1; return m; });
var frostSheet = function (x0, z0, w, d) { var g = new THREE.PlaneGeometry(w, d, Math.round(w / 10), Math.round(d / 10)); g.rotateX(-Math.PI / 2); var p = g.attributes.position, uv = g.attributes.uv; for (var i = 0; i < p.count; i++) {
var x = p.getX(i) + x0 + w / 2, z = p.getZ(i) + z0 + d / 2;
p.setY(i, H(x, z) + 0.12);
uv.setXY(i, x, -z);
} g.computeVertexNormals(); var m = new THREE.Mesh(g, fm); m.position.set(x0 + w / 2, 0, z0 + d / 2); G.add(m); return m; };
wqwShow("frostV", frostSheet(-700, -260, 860, 640), false);
wqwShow("frostS", frostSheet(170, -500, 700, 1000), false);
var rv = [];
for (var x = -880; x <= 200; x += 20)
rv.push([x, 60 - Math.sin(x * 0.01) * 16]);
wqwStrip(G, rv, 9, function (x, z) { return H(x, z) + 0.35; }, wqwWaterM(0x4A6A7A, 0.85), 0);
var hs = [[-180, -30, 0.1], [-150, -60, -0.3], [-110, -30, 0.5], [-200, -80, 0.2], [-130, -100, -0.1], [-90, -70, 0.8], [-170, -130, 0.3]];
hs.forEach(function (q, k) { var x = q[0], z = q[1], y = H(x, z); var hg = wqwHouse(G, x, z, 9, 7, 4, { y: y - 0.2, ry: q[2], col: [0xE8DCC0, 0xD8C8A8, 0xF0E4CC][k % 3] }); wqwSmoke(G, x + 2, y + 6.5, z, 0xB8B0A8, 5); wqwSolid(x, z, 9.4, 7.4, y - 1, y + 8, q[2]); });
wqwStrip(G, [[-200, 20], [-170, -20], [-140, -60], [-130, -120]], 3.4, function (x, z) { return H(x, z) + 0.06; }, wqwS("earth", 0x8A7A5A, 3), 0.06);
wqwPlant(G, "tree", wqwScatter(8902, lite ? 14 : 34, -320, 10, -200, 110, function (x, z) { return Math.abs(z - 60 + Math.sin(x * 0.01) * 16) > 10; }, H, 0.8, 1.1), { col: 0x8A6A2A });
wqwPlant(G, "tree", wqwScatter(8903, lite ? 40 : 110, -860, -700, 160, 700, function (x, z) { return Math.abs(z - 60) > 200 && Math.abs(z - 60) < 420 && x < 120; }, H, 0.9, 1.4), { col: 0xA86A2A });
wqwPlant(G, "grass", wqwScatter(8904, lite ? 120 : 400, 200, -500, 860, 700, null, H, 0.8, 1.3), { col: 0xC8B880 });
[[520, -40], [560, 10], [540, 80]].forEach(function (q) { var x = q[0], z = q[1], y = H(x, z), tg = new THREE.Group(); tg.position.set(x, y, z); G.add(tg); wqwCyl(tg, 4, 4, 2.4, wqwS("b:quilt", 0xE8DCC0, 2), 0, 0, 0, 16); var rf = new THREE.Mesh(new THREE.ConeGeometry(4.3, 2.2, 16), wqwS("b:quilt", 0xD8C8A8, 2)); rf.position.y = 3.5; tg.add(rf); wqwBox(tg, 1.2, 1.8, 0.1, wqwLam(0xA82A2A), 0, 0, 4.02); wqwSmoke(tg, 0, 5, 0, 0xC8C0B8, 4); wqwRound(x, z, 4.2, y - 1, y + 5); });
wqwPlant(G, "horse", [{ x: 600, z: 60, y: H(600, 60), s: 1, ry: 1 }, { x: 610, z: 72, y: H(610, 72), s: 1, ry: 2 }, { x: 592, z: 80, y: H(592, 80), s: 0.95, ry: 0.4 }, { x: 620, z: 50, y: H(620, 50), s: 1, ry: 3 }], {});
wqcMoons(G, { n: 1 });
},
function (x, z) {
var n = wqwFbm(x * 0.007 + 5, z * 0.007, 4), shore = -140 + Math.sin(x * 0.006) * 40 + wqwFbm(x * 0.01, 2, 2) * 30;
var land = wqwSmooth(shore - 30, shore + 40, z), h = (n * 7 + wqwFbm(x * 0.05, z * 0.05, 2) * 0.6) * land + land * 3;
h += (1 - land) * (wqwFbm(x * 0.03, z * 0.03, 2) - 0.5) * 0.6;
h += wqwSmooth(640, 880, Math.hypot(x, z)) * 110 * (0.4 + n) * land;
return h;
},
function (g, s) {
s = s || 1;
var M = wqwS("b:quilt", 0xA8A296, 0.5, { shine: 22, spec: 0x2A2A2A }), b = new THREE.Mesh(wqwGeo("sealBody", function () { return wqwTaper([[0, 0.2, -0.9], [0, 0.3, -0.4], [0, 0.32, 0.2], [0, 0.3, 0.6], [0, 0.36, 0.85]], [0.08, 0.3, 0.36, 0.26, 0.16], 14, 10); }), M);
b.scale.setScalar(s);
g.add(b);
var hd = new THREE.Mesh(wqwGeo("sealHead", function () { return new THREE.SphereGeometry(0.17, 12, 10); }), M);
hd.position.set(0, 0.42 * s, 0.98 * s);
hd.scale.setScalar(s);
g.add(hd);
[-1, 1].forEach(function (k) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.028 * s, 8, 6), wqwShine(0x0A0A0A, 0.05, 0.9));
e.position.set(k * 0.07 * s, 0.47 * s, 1.12 * s);
g.add(e);
var f = wqwBox(g, 0.3 * s, 0.03 * s, 0.14 * s, M, k * 0.32 * s, 0.1 * s, 0.35 * s);
f.rotation.z = k * 0.4;
var t = wqwBox(g, 0.2 * s, 0.03 * s, 0.12 * s, M, k * 0.09 * s, 0.15 * s, -0.95 * s);
t.rotation.y = k * 0.5;
});
g.userData.beast = 1;
return g;
},
function (G) {
var lite = wqwLite(), H = wqfCoastH, R = wRand(9901);
wqwTerrain(G, -900, -900, 1800, 1800, lite ? 14 : 7, H, wqwS("snow", 0xFFFFFF, 5, { vc: 1, shine: 3, spec: 0x0A0A0A }), function (x, z, y, c) {
var n = wqwFbm(x * 0.05, z * 0.05, 2), shore = -140 + Math.sin(x * 0.006) * 40 + wqwFbm(x * 0.01, 2, 2) * 30, sea = 1 - wqwSmooth(shore - 30, shore + 10, z), rock = wqwSmooth(0.55, 0.75, wqwFbm(x * 0.03, z * 0.03, 3)) * (1 - sea) * 0.35;
c.setRGB(0.9 - sea * 0.1 - rock + n * 0.04, 0.93 - sea * 0.06 - rock + n * 0.04, 0.97 - rock * 0.8 + n * 0.02);
});
var wm = wqwWaterM(0x14222E, 0.94);
[[-600, -420, 520, 22], [-100, -520, 700, 16], [200, -360, 380, 12], [-300, -700, 900, 30]].forEach(function (q) { var w = new THREE.Mesh(new THREE.PlaneGeometry(q[2], q[3]), wm); w.rotation.x = -Math.PI / 2; w.rotation.z = (R() - 0.5) * 0.3; w.position.set(q[0] + q[2] / 2, H(q[0] + q[2] / 2, q[1]) + 0.05, q[1]); G.add(w); });
var floes = [];
for (var i = 0; i < (lite ? 24 : 60); i++) {
var fx = (R() - 0.5) * 1600, fz = -260 - R() * 560;
floes.push({ x: fx, z: fz, y: H(fx, fz) + 0.1, s: 4 + R() * 14, ry: R() * 6 });
}
wqwInst(G, wqwGeo("floe", function () { var g = new THREE.CylinderGeometry(1, 1.1, 0.6, 7); g.scale(1, 1, 0.7); return g; }), wqiIce(0xE8F2FA, { op: 1 }), floes, {});
var ridges = [];
for (i = 0; i < (lite ? 40 : 120); i++) {
var rx = (R() - 0.5) * 1700, rz = -200 - R() * 680;
ridges.push({ x: rx, z: rz, y: H(rx, rz), s: 0.8 + R() * 2.2, ry: R() * 6 });
}
wqwInst(G, wqwGeo("pressRidge", function () { var g = new THREE.BoxGeometry(1.6, 1, 0.9); g.rotateZ(0.5); g.rotateX(0.3); return g; }), wqiIce(0xCFE2F2, { op: 1 }), ridges, {});
var rocks = [];
for (i = 0; i < (lite ? 50 : 140); i++) {
var x = (R() - 0.5) * 1600, z = -100 + R() * 800;
rocks.push({ x: x, z: z, y: H(x, z) - 0.3, s: 0.5 + R() * 2.4, ry: R() * 6 });
}
wqwInst(G, wqwGeo("tRock", function () { var g = new THREE.DodecahedronGeometry(1, 0); g.scale(1.3, 0.6, 1); return g; }), wqwS("b:slate", 0x6A6E74, 3), rocks, { shadow: !lite });
var bl = [];
for (i = 0; i < (lite ? 30 : 80); i++) {
var cx = (R() - 0.5) * 1200, cz = -60 + R() * 600;
for (var j = 0; j < 3 + Math.floor(R() * 4); j++) {
var bx = cx + (R() - 0.5) * 14, bz = cz + (R() - 0.5) * 14;
bl.push({ x: bx, z: bz, y: H(bx, bz) - 0.5, s: 1.4 + R() * 3.4, ry: R() * 6 });
}
}
wqwInst(G, wqwGeo("boulder", function () { var g = new THREE.IcosahedronGeometry(1, 1), p = g.attributes.position, r2 = wRand(77); for (var k = 0; k < p.count; k++) {
var f = 0.8 + r2() * 0.35;
p.setXYZ(k, p.getX(k) * f, p.getY(k) * f * 0.75, p.getZ(k) * f);
} g.computeVertexNormals(); return g; }), wqwS("b:strata", 0x8A8A88, 3), bl, { shadow: !lite });
var capM = wqwS("snow", 0xFFFFFF, 3);
wqwInst(G, wqwGeo("bcap", function () { var g = new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2.6); g.scale(0.9, 0.45, 0.9); return g; }), capM, bl.map(function (b) { return { x: b.x, z: b.z, y: b.y + b.s * 0.62, s: b.s, ry: b.ry }; }), {});
var dr = [];
for (i = 0; i < (lite ? 60 : 180); i++) {
var dx = (R() - 0.5) * 1600, dz = -80 + R() * 760;
dr.push({ x: dx, z: dz, y: H(dx, dz) - 0.2, s: 2 + R() * 5, ry: 0.6 + (R() - 0.5) * 0.3 });
}
wqwInst(G, wqwGeo("drift", function () { var g = new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2); g.scale(3.2, 0.35, 0.9); return g; }), capM, dr, {});
wqwPlant(G, "grass", wqwScatter(9902, lite ? 100 : 300, -850, -80, 850, 800, function (x, z) { return Math.hypot(x + 340, z - 320) > 130; }, H, 0.5, 0.9), { col: 0x9A9A7A });
(function () { var bm = wqwLam(0xE8E0CC), x = 80, z = -150, y = H(x, z); for (var k = 0; k < 12; k++) {
var rb = new THREE.Mesh(wqwGeo("rib", function () { return new THREE.TorusGeometry(2.2, 0.12, 6, 14, Math.PI * 0.8); }), bm);
rb.position.set(x + k * 1.3, y + 0.1, z);
rb.rotation.set(0, Math.PI / 2, Math.PI * 0.1);
G.add(rb);
} wqwBox(G, 16, 0.4, 0.5, bm, x + 7, y, z); })();
var sealsAt = [[110, -300], [126, -296], [118, -312], [140, -306], [96, -292], [132, -322]];
WQW_SEALS = [];
sealsAt.forEach(function (q, k) { var g = new THREE.Group(); wqeSeal(g, 0.9 + R() * 0.3); g.position.set(q[0], H(q[0], q[1]) + 0.05, q[1]); g.rotation.y = R() * 6; g.userData.keep = 1; G.add(g); WQW_SEALS.push(g); WQW.people.push({ g: g, y: g.position.y, o: { wander: 6, sp: 0.25 } }); });
var vx = -340, vz = 300, hs = [[-60, -20, 0.2], [-30, 50, 2.9], [20, -30, 0.4], [50, 40, 3.2], [-90, 40, 1.6], [10, 90, 3.0], [80, -10, -1.4], [40, -38, 0.6]];
hs.forEach(function (q, k) {
var x = vx + q[0], z = vz + q[1], ry = q[2], y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var w = 8, d = 6.5, wd = wqwS("b:planks", 0x7A5A3A, 2);
wqwBox(g, w, 3.2, d, wd, 0, 0, 0);
var rf = new THREE.Mesh(wqwGeo("mgable", function () { var s = new THREE.Shape(); s.moveTo(-4.8, 0); s.lineTo(0, 3.6); s.lineTo(4.8, 0); s.lineTo(-4.8, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 7.4, bevelEnabled: false }); e.translate(0, 0, -3.7); return e; }), wqwS("snow", 0xF2F4F8, 3));
rf.position.y = 3.2;
g.add(rf);
wqwBox(g, 0.8, 2.6, 0.8, wqwMat("stone"), 2.6, 3.2, -1.4);
wqwSmoke(g, 2.6, 6.2, -1.4, 0xA8A098, 5);
[-2.3, 2.3].forEach(function (wx) { wqwBox(g, 1.0, 1.0, 0.08, wqwGlowM(0xFFB860, 0.8), wx, 1.2, d / 2 + 0.02); wqwBox(g, 0.5, 1.1, 0.06, wqwLam(0x3A2A1A), wx - 0.78, 1.15, d / 2 + 0.08); wqwBox(g, 0.5, 1.1, 0.06, wqwLam(0x3A2A1A), wx + 0.78, 1.15, d / 2 + 0.08); });
wqwSolid(x, z, w + 0.4, d + 0.4, y - 1, y + 7, ry);
});
(function () {
var A = WQW_AT.marginHouse, x = A.x, z = A.z - 6, y = H(x, z), ry = 0, g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var wd = wqwS("b:planks", 0x6A4A2E, 2);
wqwBox(g, 7, 3, 6, wd, 0, 0, 0);
var rf = new THREE.Mesh(wqwGeo("sgable", function () { var s = new THREE.Shape(); s.moveTo(-4.2, 0); s.lineTo(0, 3.0); s.lineTo(4.2, 0); s.lineTo(-4.2, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 6.8, bevelEnabled: false }); e.translate(0, 0, -3.4); return e; }), wqwS("snow", 0xF2F4F8, 3));
rf.position.y = 3;
g.add(rf);
wqwBox(g, 0.7, 2.4, 0.7, wqwMat("stone"), -2.2, 3, -1.2);
wqwSmoke(g, -2.2, 5.6, -1.2, 0xA8A098, 4);
wqwBox(g, 1.0, 0.9, 0.08, wqwGlowM(0xFFB060, 0.9), 2, 1.2, 3.02);
wqwSolid(x, z, 7.4, 6.4, y - 1, y + 6, ry);
wqwDoorTo(G, "coast", 0, x - 1.2, z + 3.1, 0, "The door of the small house at the edge", 8, 7, { col: 0x4A3220, frame: wqwS("b:planks", 0x5A3A22, 2), y: y });
})();
(function () {
var gR = wqwRoomBuild(G, "coast", 0, 8, 7, 2.9, { wall: wqwS("b:planks", 0x9A7A54, 2), floor: wqwMat("planks"), ceil: wqwS("b:planks", 0x7A5A3A, 2), env: "cottage", doorName: "The door, out into the street" });
wqwBox(gR, 2.4, 1.4, 0.7, wqwMat("stone"), -2.2, 0, -3.1);
wqwFire(gR, -2.2, 0.2, -2.8, 0.6);
var fl = new THREE.PointLight(0xFFA060, 1.1, 12);
fl.position.set(-2.2, 1, -2.4);
gR.add(fl);
WQW_MARGIN_FIRE = fl;
wqwChair(gR, -1.6, -1.6, Math.PI * 0.85, wqwMat("planks"));
wqwTable(gR, 1.8, -1.6, 1.4, 0.8, 0.74, wqwMat("planks"));
wqwBed(gR, 2.6, 1.6, Math.PI, 0x8A7A5A);
wqwRug(gR, -0.6, -0.6, 2.6, 2, 0x5A3A2A);
var crib = new THREE.Group();
crib.position.set(-0.4, 0, -2.6);
gR.add(crib);
wqwBox(crib, 1.0, 0.5, 0.6, wqwMat("oak"), 0, 0.15, 0);
wqwBox(crib, 0.9, 0.1, 0.5, wqwLam(0xE8E0D0), 0, 0.6, 0);
var frost = new THREE.Group();
gR.add(frost);
for (var i = 0; i < 14; i++)
wqcCrystal(frost, (R() - 0.5) * 6, 0, (R() - 0.5) * 5, 0.2 + R() * 0.5, 0xD8EEFF, { n: 2 });
var fp = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 6.6), wqwM("floorFrost", function () { var m = new THREE.MeshBasicMaterial({ color: 0xDCEEFF, transparent: true, opacity: 0.35, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
fp.rotation.x = -Math.PI / 2;
fp.position.y = 0.02;
frost.add(fp);
wqwShow("marginFrost", frost, false);
})();
wqcMoons(G, { n: 1 });
},
function (G, x, z, ry, y) {
var iceC = wqiIce(0xE8F6FF, { op: 0.82, e: 0x3A6A9A }), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
[-1, 1].forEach(function (s) {
var curve = new THREE.CatmullRomCurve3([new THREE.Vector3(s * 1.1, 0.2, -2.6), new THREE.Vector3(s * 1.1, 0.05, -1), new THREE.Vector3(s * 1.1, 0.05, 1.6), new THREE.Vector3(s * 1.1, 0.6, 2.8), new THREE.Vector3(s * 1.1, 1.4, 2.6), new THREE.Vector3(s * 1.1, 1.2, 2.1)]);
g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.08, 6, false), iceC));
for (var k = 0; k < 3; k++)
wqwBox(g, 0.08, 0.5, 0.08, iceC, s * 1.1, 0.05, -1.6 + k * 1.4);
});
var body = new THREE.Mesh(wqwGeo("sleighBody", function () { var sh = new THREE.Shape(); sh.moveTo(-2.4, 0); sh.lineTo(1.8, 0); sh.quadraticCurveTo(2.6, 0.2, 2.4, 1.4); sh.lineTo(1.6, 1.0); sh.lineTo(-1.2, 1.0); sh.quadraticCurveTo(-2.2, 1.6, -2.4, 2.2); sh.lineTo(-2.7, 2.2); sh.quadraticCurveTo(-2.6, 0.6, -2.4, 0); var e = new THREE.ExtrudeGeometry(sh, { depth: 2.0, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.12, bevelSegments: 2 }); e.translate(0, 0, -1); e.rotateY(Math.PI / 2); return e; }), iceC);
body.position.y = 0.5;
g.add(body);
wqwBox(g, 1.8, 0.3, 1.2, wqwLam(0xF4F4F8), 0, 0.9, -0.9);
wqwSolid(x, z, 3, 6, y - 1, y + 3, ry || 0);
return g;
},
function (G) {
var lite = wqwLite(), H = wqjSummerH, R = wRand(7801), P = WQJ_PAL;
wqwTerrain(G, -860, -860, 1720, 1720, lite ? 16 : 8, H, wqwS("grass", 0xFFFFFF, 4, { vc: 1 }), function (x, z, y, c) { var n = wqwFbm(x * 0.03, z * 0.03, 3), m = wqwFbm(x * 0.12, z * 0.12, 2); c.setRGB(0.42 + n * 0.1 + m * 0.05, 0.5 + n * 0.08, 0.18 + n * 0.04); });
var gold = wqwS("b:ashlar", 0xF0CC78, 2.4), goldD = wqwS("b:ashlar", 0xD8AE58, 2.4), marble = wqwMat("marble"), dome = wqwShine(0xE8B840, 0.35, 0.7);
(function () {
var x = 0, z = 384, y = H(x, z);
var a = new THREE.Mesh(new THREE.TorusGeometry(4, 0.45, 8, 24, Math.PI), wqwS("b:oak", 0x5A4A2A, 1.4));
a.position.set(x, y + 3, z);
G.add(a);
[-4, 4].forEach(function (dx) { wqwCyl(G, 0.45, 0.55, 3, wqwS("b:oak", 0x5A4A2A, 1.4), x + dx, y, z, 8); });
var sh = wqwCanvas("sportal", 128, 128, function (c, W, Hh) { var g = c.createRadialGradient(W / 2, Hh / 2, 4, W / 2, Hh / 2, W / 2); g.addColorStop(0, "rgba(255,240,180,.85)"); g.addColorStop(1, "rgba(255,200,90,0)"); c.fillStyle = g; c.fillRect(0, 0, W, Hh); });
var p = new THREE.Mesh(new THREE.PlaneGeometry(8, 7), wqwM("sportalM", function () { var m = new THREE.MeshBasicMaterial({ map: sh, transparent: true, depthWrite: false, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
p.position.set(x, y + 3.2, z);
G.add(p);
wqwPlant(G, "tree", [{ x: x - 9, z: z + 2, y: H(x - 9, z + 2), s: 0.8, ry: 1 }, { x: x + 9, z: z - 1, y: H(x + 9, z - 1), s: 0.9, ry: 2 }], { col: 0x7A8A5A });
for (var k = 0; k < 50; k++) {
var l = new THREE.Mesh(wqwGeo("vineL", function () { return new THREE.IcosahedronGeometry(0.22, 0); }), wqwLam(k % 5 ? 0x4A7A2A : 0xF0A040));
var a2 = R() * Math.PI;
l.position.set(x + Math.cos(a2) * 4, y + 3 + Math.sin(a2) * 4, z + (R() - 0.5) * 0.6);
G.add(l);
}
})();
var py = H(P.x, P.z) + 0.1, ty = py + 1.4;
WQW.summerY = ty;
wqwBox(G, 96, 1.4, 70, goldD, P.x, py, P.z);
wqwFloor(P.x, P.z, 96, 70, ty);
for (var st = 0; st < 6; st++) {
wqwBox(G, 30, 0.24, 0.6, goldD, P.x, py + st * 0.24, P.z + 35.3 + (5 - st) * 0.6);
}
wqwRamp(P.x, P.z + 37, 30, 3.6, py, ty, 0);
var cols = [];
for (var x = -45; x <= 45; x += 6) {
cols.push([x, -33]);
cols.push([x, 33]);
}
for (var z = -27; z <= 27; z += 6) {
cols.push([-45, z]);
cols.push([45, z]);
}
cols.forEach(function (c) { var cx = P.x + c[0], cz = P.z + c[1]; wqwCyl(G, 0.6, 0.7, 11, marble, cx, ty, cz, 14); wqwCyl(G, 0.95, 0.95, 0.5, gold, cx, ty, cz, 14); wqwBox(G, 1.6, 0.5, 1.6, gold, cx, ty + 11, cz); wqwRound(cx, cz, 0.75, ty - 1, ty + 12); });
[[0, -33, 96, 1.4], [0, 33, 96, 1.4]].forEach(function (b) { wqwBox(G, b[2], 1.6, b[3], gold, P.x + b[0], ty + 11.5, P.z + b[1]); });
[[-45, 0], [45, 0]].forEach(function (b) { wqwBox(G, 1.4, 1.6, 68, gold, P.x + b[0], ty + 11.5, P.z + b[1]); });
for (x = -42; x <= 42; x += 6) {
var ar = new THREE.Mesh(wqwGeo("garch", function () { return new THREE.TorusGeometry(2.4, 0.32, 6, 18, Math.PI); }), gold);
ar.position.set(P.x + x, ty + 8.6, P.z + 33);
G.add(ar);
}
var fz = P.z + 6;
(function () {
var y = ty;
wqwCyl(G, 7, 7.4, 0.9, marble, P.x, y, fz, 32);
wqwWater(G, P.x, fz, 13.6, 13.6, y + 0.75, 0x5AA8D8, 0.85);
wqwCyl(G, 0.8, 1.2, 4, marble, P.x, y, fz, 14);
wqwCyl(G, 2.8, 2.2, 0.5, marble, P.x, y + 4, fz, 20);
wqwCyl(G, 0.4, 0.6, 2, marble, P.x, y + 4.4, fz, 10);
wqwRound(P.x, fz, 7.4, y - 1, y + 1);
var jet = wqwGlowM(0xE8F6FF, 0.55);
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2, j = new THREE.Mesh(wqwGeo("jet", function () { var g = new THREE.CylinderGeometry(0.05, 0.12, 2.2, 6); g.translate(0, 1.1, 0); return g; }), jet);
j.position.set(P.x + Math.cos(a) * 2.6, y + 4.5, fz + Math.sin(a) * 2.6);
j.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
G.add(j);
}
})();
[[-14, -4], [14, -4], [-14, 16], [14, 16]].forEach(function (p) { var x = P.x + p[0], z = P.z + p[1]; wqwBox(G, 6, 0.9, 6, gold, x, ty, z); wqwRound(x, z, 3.2, ty - 1, ty + 1); wqwPlant(G, "bush", [{ x: x, z: z, y: ty + 0.9, s: 1.1, ry: R() * 6 }], { col: 0x4A8A3A }); wqwPlant(G, "flowers", [0, 1, 2, 3, 4, 5].map(function (i) { return { x: x + (R() - 0.5) * 4.6, z: z + (R() - 0.5) * 4.6, y: ty + 0.9, s: 0.9, ry: R() * 6 }; }), { col: ["#F04A3A", "#F8C040", "#E870B0"][R() * 3 | 0] }); });
wqwBox(G, 40, 15, 16, gold, P.x, ty, P.z - 24);
wqwSolid(P.x, P.z - 24, 40, 16, ty - 1, ty + 16, 0);
var dm = new THREE.Mesh(new THREE.SphereGeometry(11, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), dome);
dm.position.set(P.x, ty + 15, P.z - 24);
G.add(dm);
wqwCyl(G, 0.5, 0.2, 4, dome, P.x, ty + 26, P.z - 24, 8);
wqwBox(G, 5, 7, 0.4, wqwLam(0x2A1A0A), P.x, ty, P.z - 15.9);
[-1, 1].forEach(function (s) {
var wx = P.x + s * 32;
wqwBox(G, 18, 12, 26, gold, wx, ty, P.z - 12);
wqwSolid(wx, P.z - 12, 18, 26, ty - 1, ty + 13, 0);
for (var lv = 0; lv < 2; lv++) {
var by = ty + 4 + lv * 4.4;
wqwBox(G, 16, 0.4, 2.4, goldD, wx, by, P.z + 2.2);
for (var k = 0; k < 7; k++)
wqwBox(G, 0.18, 1.1, 0.18, marble, wx - 7 + k * 2.3, by + 0.4, P.z + 3.3);
wqwPlant(G, "bush", [0, 1, 2, 3].map(function (i) { return { x: wx - 6 + i * 4, z: P.z + 2, y: by + 0.4, s: 0.6, ry: R() * 6 }; }), { col: 0x5A9A3A });
var vine = [];
for (var k2 = 0; k2 < (lite ? 20 : 60); k2++)
vine.push({ x: wx - 8 + R() * 16, y: by - R() * 3.4, z: P.z + 3.5 + R() * 0.2, s: 0.6 + R() * 0.6 });
wqwInst(G, wqwGeo("vineF", function () { return new THREE.IcosahedronGeometry(0.3, 0); }), wqwLam(0x4A7A2A), vine, {});
var bl = vine.filter(function (v, i) { return i % 3 === 0; }).map(function (v) { return { x: v.x, y: v.y, z: v.z + 0.2, s: 0.5 }; });
wqwInst(G, wqwGeo("vineB", function () { return new THREE.IcosahedronGeometry(0.18, 0); }), wqwLam(lv ? 0xF05A8A : 0xF8A040), bl, {});
}
for (var r = 0; r < 4; r++)
wqwBox(G, 2.2, 3, 0.1, wqwGlowM(0xFFE8B0, 0.6), wx - 6 + r * 4, ty + 1, P.z + 1.06);
var tw = wx + s * 7;
wqwCyl(G, 2.4, 2.6, 22, gold, tw, ty, P.z - 24, 16);
var td = new THREE.Mesh(new THREE.SphereGeometry(2.8, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), dome);
td.position.set(tw, ty + 22, P.z - 24);
G.add(td);
wqwRound(tw, P.z - 24, 2.7, ty - 1, ty + 23);
});
wqwDoorTo(G, "summer", 0, P.x, P.z - 15.8, 0, "The archway into a cool, spacious room", 14, 10, { col: 0x8A5A2A, frame: gold, y: ty });
var gR = wqwRoomBuild(G, "summer", 0, 14, 10, 4.6, { wall: wqwS("b:stucco", 0xF4E4C0, 3), floor: wqwMat("marble"), ceil: wqwS("b:ashlar", 0xF0D8A0, 2), env: "summerroom", doorName: "Out into the courtyard", day: 0xFFF0C8 });
wqwBed(gR, -4, -2.6, 0, 0xD88A3A);
wqwBed(gR, -5.6, -2.6, 0, 0xD88A3A);
wqwRug(gR, 2, -1, 4.6, 3.4, 0xB8582A);
wqwRug(gR, 3, 2, 3.4, 2.4, 0xD8A040);
wqwChest(gR, -2, -4.4, 0);
[-4, 0, 4].forEach(function (x) { wqwBox(gR, 2.6, 2.6, 0.06, wqwGlowM(0xFFF0C8, 0.92), x, 1.2, -4.95); wqwBox(gR, 2.8, 0.18, 0.5, marble, x, 1.1, -4.8); });
[[-6.2, 3], [6.2, 3], [6.2, -3.6]].forEach(function (p) { wqwCyl(gR, 0.3, 0.24, 0.8, wqwMat("terracotta"), p[0], 0, p[1], 10); wqwPlant(gR, "bush", [{ x: p[0], z: p[1], y: 0.8, s: 0.4, ry: 0 }], { col: 0x5A9A3A }); });
var lamp = new THREE.PointLight(0xFFE0A0, 0.9, 16);
lamp.position.set(0, 3.6, 0);
gR.add(lamp);
var tr = wqwScatter(7802, lite ? 60 : 170, -300, -20, 300, 350, function (x, z) { return Math.abs(x) > 14 && Math.hypot(x - 96, z + 10) > 18 && Math.hypot(x + 96, z + 10) > 18 && Math.hypot(x + 60, z - 120) > 8; }, H, 0.8, 1.2);
var fruitC = [0xF0A050, 0x6A2A5A, 0xD8301A], fruits = [[], [], []];
tr.forEach(function (t, i) { for (var k = 0; k < 6; k++)
fruits[i % 3].push({ x: t.x + (R() - 0.5) * 5, y: t.y + 6 + R() * 3, z: t.z + (R() - 0.5) * 5, s: 1 }); wqwRound(t.x, t.z, 0.6); });
wqxTrees(G, "oak", tr.filter(function (t, i) { return i % 3; }), [0x4A8A2A, 0x5A9A30]);
wqxTrees(G, "maple", tr.filter(function (t, i) { return !(i % 3); }), [0x3A7A22, 0x6AA034], { noSolid: 1 });
fruits.forEach(function (f, i) { wqwInst(G, wqwGeo("fruit" + i, function () { return new THREE.SphereGeometry(0.15, 8, 6); }), wqwLam(fruitC[i]), f, {}); });
var fl = wqwScatter(7803, lite ? 800 : 2400, -340, -40, 340, 370, function (x, z) { return Math.abs(x) > 4; }, H, 0.8, 1.4);
["#F04A3A", "#F8C040", "#E870B0", "#8A4AD8", "#FFFFFF", "#F87A2A", "#3A8AF0"].forEach(function (c, k) { wqwPlant(G, "flowers", fl.filter(function (t, i) { return i % 7 === k; }), { col: c }); });
wqwPlant(G, "grass", wqwScatter(7804, lite ? 500 : 1600, -500, -200, 500, 380, null, H, 0.9, 1.5), { col: 0x9AB050 });
wqwPlant(G, "bush", wqwScatter(7805, lite ? 40 : 120, -360, -260, 360, 360, function (x, z) { return Math.abs(x) > 8 && Math.abs(x - P.x) + Math.abs(z - P.z) > 70; }, H, 0.8, 1.3), { col: 0x4A8A3A });
wqwStrip(G, [[0, 380], [0, 300], [4, 200], [-2, 100], [0, 10], [0, -52]], 5, function (x, z) { return H(x, z) + 0.06; }, wqwMat("gravel"), 0.06);
[[40, 140], [-40, 220], [60, 60], [-50, 40]].forEach(function (p) { var x = p[0], z = p[1], y = H(x, z); wqwCyl(G, 3, 3.2, 0.7, marble, x, y, z, 22); wqwWater(G, x, z, 5.6, 5.6, y + 0.6, 0x6AB0D8, 0.85); wqwCyl(G, 0.4, 0.6, 2.2, marble, x, y, z, 10); wqwRound(x, z, 3.2, y - 1, y + 1); });
(function () {
var x = 96, z = -10, y = H(x, z);
wqwBox(G, 16, 0.5, 12, goldD, x, y - 0.1, z);
wqwFloor(x, z, 16, 12, y + 0.4);
var g = new THREE.Group();
g.position.set(x, y + 0.4, z);
G.add(g);
[[-7.4, -5.4], [0, -5.4], [7.4, -5.4], [-7.4, 5.4], [0, 5.4], [7.4, 5.4]].forEach(function (c) { wqwCyl(g, 0.35, 0.4, 5, marble, c[0], 0, c[1], 12); wqwRound(x + c[0], z + c[1], 0.45, y, y + 6); });
wqwBox(g, 16.4, 0.5, 12.4, gold, 0, 5, 0);
var cl = new THREE.Mesh(new THREE.ConeGeometry(11, 3, 4, 1), wqwS("b:quilt", 0xF0E0C0, 2));
cl.rotation.y = Math.PI / 4;
cl.scale.set(1, 1, 0.75);
cl.position.y = 7;
g.add(cl);
wqwTable(g, 0, 0, 9, 2.2, 0.8, wqwMat("oak"), wqwLam(0xF8F0E0));
[-1, 1].forEach(function (s) { wqwBox(g, 9, 0.45, 0.8, wqwLam(0xC8582A), 0, 0, s * 2); });
var food = [];
for (var i = 0; i < 16; i++) {
food.push({ k: i % 5, x: -4 + i * 0.55, z: (i % 2 ? 0.4 : -0.4) });
}
food.forEach(function (f) {
var m;
if (f.k === 0) {
m = new THREE.Mesh(wqwGeo("loaf", function () { var gg = new THREE.SphereGeometry(0.22, 12, 8); gg.scale(1.5, 0.8, 1); return gg; }), wqwLam(0xC8904A));
}
else if (f.k === 1) {
m = new THREE.Mesh(wqwGeo("halfpeach", function () { return new THREE.SphereGeometry(0.16, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); }), wqwLam(0xF8903A));
}
else if (f.k === 2) {
m = new THREE.Mesh(wqwGeo("goblet", function () { var pts = [new THREE.Vector2(0, 0), new THREE.Vector2(0.08, 0), new THREE.Vector2(0.02, 0.04), new THREE.Vector2(0.02, 0.14), new THREE.Vector2(0.09, 0.2), new THREE.Vector2(0.1, 0.3)]; return new THREE.LatheGeometry(pts, 12); }), wqwShine(0xE8C060, 0.3, 0.8));
}
else if (f.k === 3) {
m = new THREE.Mesh(wqwGeo("platter", function () { return new THREE.CylinderGeometry(0.3, 0.26, 0.05, 18); }), wqwLam(0xF4ECDC));
var meat = new THREE.Mesh(wqwGeo("roast", function () { var gg = new THREE.SphereGeometry(0.2, 10, 6); gg.scale(1.3, 0.6, 0.9); return gg; }), wqwLam(0x8A4A22));
meat.position.y = 0.08;
m.add(meat);
}
else {
m = new THREE.Mesh(wqwGeo("grapes", function () { return new THREE.DodecahedronGeometry(0.14, 0); }), wqwLam(0x6A2A6A));
}
m.position.set(f.x, 0.86, f.z);
g.add(m);
});
})();
(function () {
var x = -96, z = -10, y = H(x, z);
for (var k = 0; k < 14; k++) {
var a = k / 14 * Math.PI * 2;
var s = new THREE.Mesh(wqwGeo("pitStone", function () { return new THREE.DodecahedronGeometry(0.5, 0); }), wqwMat("granite"));
s.position.set(x + Math.cos(a) * 1.9, y + 0.2, z + Math.sin(a) * 1.9);
G.add(s);
}
wqwFire(G, x, y + 0.1, z, 1.2);
var L = new THREE.PointLight(0xFFC060, 1.6, 26);
L.position.set(x, y + 2, z);
G.add(L);
wqwRound(x, z, 2.2, y - 1, y + 2);
[[0, 6], [0, -6], [6, 0], [-6, 0]].forEach(function (p) { wqwRug(G, x + p[0], z + p[1], 3, 2, 0xB8582A); });
WQW.summerPit = true;
var hd = [];
for (k = 0; k < 40; k++) {
var a2 = k / 40 * Math.PI * 2;
if (Math.abs(a2 - Math.PI * 0.25) < 0.25)
continue;
hd.push({ x: x + Math.cos(a2) * 13, z: z + Math.sin(a2) * 13, y: H(x + Math.cos(a2) * 13, z + Math.sin(a2) * 13), s: 0.9, ry: a2 });
}
wqwPlant(G, "bush", hd, { col: 0x3A7A2A });
wqwPlant(G, "flowers", hd.map(function (t) { return { x: t.x * 0.98 + x * 0.02, z: t.z * 0.98 + z * 0.02, y: t.y, s: 0.8, ry: t.ry }; }), { col: "#FFFFF0" });
})();
if (typeof wqcMotes === "function")
wqcMotes(G, lite ? 100 : 260, 0, 120, 260, 0.6, 8, 0xFFE070);
wqwWater(G, 700, 0, 600, 1600, -2, 0x2A7AB8, 0.95);
},
function (G, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var R = wRand(Math.round(x * 3 + z * 7));
for (var k = 0; k < 6; k++)
wqfFlame(g, (R() - 0.5) * 0.6 * s, 0, (R() - 0.5) * 0.6 * s, (0.9 + R() * 0.5) * s, (1.4 + R() * 1.3) * s, k % 2 ? "pale" : "blue");
for (k = 0; k < 5; k++) {
var c = new THREE.Mesh(wqwGeo("cfstone", function () { return new THREE.IcosahedronGeometry(0.3, 0); }), wqiIce(0xD8EEFC));
var a = k / 5 * Math.PI * 2;
c.position.set(Math.cos(a) * 0.8 * s, 0.05, Math.sin(a) * 0.8 * s);
g.add(c);
}
var L = new THREE.PointLight(0x9AD0FF, 1.1, 14 * s);
L.position.y = 1;
g.add(L);
return g;
},
function (P, x, y, z, ry, s, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s || 1);
P.add(g);
var m = wqwLam(col || 0xC89A62);
var body = new THREE.Mesh(wqwGeo("chBody", function () { var gg = new THREE.SphereGeometry(0.2, 14, 10); gg.scale(1.7, 0.9, 0.85); return gg; }), m);
body.position.y = 0.42;
body.rotation.z = 0.18;
g.add(body);
var neck = new THREE.Mesh(wqwGeo("chNeck", function () { var gg = new THREE.CylinderGeometry(0.07, 0.11, 0.32, 10); return gg; }), m);
neck.position.set(0.28, 0.6, 0);
neck.rotation.z = -0.7;
g.add(neck);
var head = new THREE.Mesh(wqwGeo("chHead", function () { var gg = new THREE.SphereGeometry(0.08, 10, 8); gg.scale(1.8, 0.9, 0.85); return gg; }), m);
head.position.set(0.42, 0.72, 0);
head.rotation.z = -0.35;
g.add(head);
[[0.22, 0.3, 0.06, -0.9], [0.24, 0.3, -0.06, -0.6], [-0.22, 0.32, 0.06, 0.9], [-0.24, 0.32, -0.06, 0.5]].forEach(function (l) { var lg = new THREE.Mesh(wqwGeo("chLeg", function () { var gg = new THREE.CylinderGeometry(0.025, 0.03, 0.28, 6); gg.translate(0, -0.14, 0); return gg; }), m); lg.position.set(l[0], l[1], l[2]); lg.rotation.z = l[3]; g.add(lg); });
for (var k = 0; k < 6; k++) {
var mn = new THREE.Mesh(wqwGeo("chMane", function () { var gg = new THREE.ConeGeometry(0.025, 0.14, 5); gg.rotateZ(Math.PI / 2); return gg; }), wqwLam(0x8A5A2A));
mn.position.set(0.3 - k * 0.03, 0.72 - k * 0.03, 0);
mn.rotation.z = 0.6;
g.add(mn);
}
var tail = new THREE.Mesh(wqwGeo("chTail", function () { var gg = new THREE.ConeGeometry(0.04, 0.26, 6); gg.rotateZ(-Math.PI / 2 - 0.5); return gg; }), wqwLam(0x8A5A2A));
tail.position.set(-0.4, 0.48, 0);
g.add(tail);
var pole = wqwCyl(g, 0.012, 0.012, 1.1, wqwShine(0xC8A040, 0.35, 0.8), 0, 0, 0, 6);
return g;
},
function () {
return wqwCanvas("wqqFrost", 256, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "rgba(235,248,255,.75)";
c.lineCap = "round";
var R = wRand(4401);
function br(x, y, a, len, w, d) { if (d > 5 || len < 3)
return; var x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; c.lineWidth = w; c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke(); br(x2, y2, a + 0.6, len * 0.62, w * 0.7, d + 1); br(x2, y2, a - 0.6, len * 0.62, w * 0.7, d + 1); br(x2, y2, a + (R() - 0.5) * 0.3, len * 0.72, w * 0.8, d + 1); }
for (var i = 0; i < 6; i++)
br(W / 2, H / 2, i / 6 * Math.PI * 2, 34, 3, 0);
for (i = 0; i < 4; i++) {
var cx = [0, W, 0, W][i], cy = [0, 0, H, H][i];
for (var k = 0; k < 3; k++)
br(cx, cy, Math.atan2(H / 2 - cy, W / 2 - cx) + (k - 1) * 0.5, 26, 2.4, 1);
}
});
},
function () {
return wqwM("wqqCaustic", function () {
var t = wqwCanvas("wqqCausticT", 256, 256, function (c, W, H) { c.clearRect(0, 0, W, H); var R = wRand(4402); for (var i = 0; i < 40; i++) {
c.strokeStyle = ["rgba(150,220,255,.35)", "rgba(220,240,255,.4)", "rgba(170,200,255,.3)", "rgba(160,255,230,.22)"][i % 4];
c.lineWidth = 2 + R() * 6;
c.beginPath();
var x = R() * W, y = R() * H;
c.moveTo(x, y);
c.bezierCurveTo(x + (R() - 0.5) * 160, y + (R() - 0.5) * 160, x + (R() - 0.5) * 160, y + (R() - 0.5) * 160, x + (R() - 0.5) * 220, y + (R() - 0.5) * 220);
c.stroke();
} });
t.wrapS = t.wrapT = THREE.RepeatWrapping;
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
});
},
function (P, x, y, z, ry, w, h, L, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var gl = new THREE.Mesh(wqwGeo("wqqLanG", function () { var s = new THREE.Shape(); s.moveTo(-0.5, 0); s.lineTo(0.5, 0); s.lineTo(0.5, 0.72); s.quadraticCurveTo(0.5, 0.92, 0, 1); s.quadraticCurveTo(-0.5, 0.92, -0.5, 0.72); s.closePath(); return new THREE.ShapeGeometry(s); }), wqxStainedM("frost", o.bright || 1.2));
gl.scale.set(w, h, 1);
gl.position.z = 0.06;
g.add(gl);
var fr = new THREE.Mesh(wqwGeo("wqqLanF", function () { var pts = [new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(-0.5, 0.72, 0), new THREE.Vector3(-0.3, 0.93, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0.3, 0.93, 0), new THREE.Vector3(0.5, 0.72, 0), new THREE.Vector3(0.5, 0, 0)]; return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.035, 6, false); }), wqiIce(0xE8F6FF, { e: 0x3A6A9A }));
fr.scale.set(w, h, Math.max(1, w));
fr.position.z = 0.08;
g.add(fr);
wqwBox(g, 0.08, h * 0.72, 0.1, wqiIce(0xE8F6FF, { e: 0x3A6A9A }), 0, 0, 0.08);
if (L) {
var v = new THREE.Vector3(0, h * 0.5, 0.6).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry || 0);
wqxGlow(L, x + v.x, y + v.y, z + v.z, 0x9AD0FF, Math.max(w, h) * 0.9);
}
return g;
},
function (P, x, y, z, L, s) {
s = s || 1;
var ice = wqiIce(0xD8EEFC);
wqwCyl(P, 0.12 * s, 0.3 * s, 1.1 * s, ice, x, y, z, 10);
var b = new THREE.Mesh(wqwGeo("wqqBowl", function () { return new THREE.SphereGeometry(0.55, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), ice);
b.scale.setScalar(s);
b.rotation.x = Math.PI;
b.position.set(x, y + 1.35 * s, z);
P.add(b);
wqfFlame(P, x, y + 1.3 * s, z, 0.95 * s, 2.1 * s, "blue");
wqfFlame(P, x + 0.05 * s, y + 1.3 * s, z, 0.5 * s, 1.3 * s, "pale");
wqxGlow(L, x, y + 1.9 * s, z, 0x9AE0FF, 3.2 * s);
},
function () {
return wqwM("wqsThatch", function () {
var t = wqwCanvas("wqsThatchT", 256, 256, function (c, W, H) {
c.fillStyle = "#B89850";
c.fillRect(0, 0, W, H);
var R = wRand(7801);
for (var i = 0; i < 2600; i++) {
var x = R() * W, y = R() * H, l = 8 + R() * 18;
c.strokeStyle = ["rgba(232,200,120,.6)", "rgba(140,110,50,.55)", "rgba(210,180,100,.5)", "rgba(110,84,40,.5)"][i % 4];
c.lineWidth = 1 + R() * 1.4;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + (R() - 0.5) * 3, y + l);
c.stroke();
}
for (var r = 0; r < H; r += 32) {
c.fillStyle = "rgba(70,52,24,.35)";
c.fillRect(0, r + 28, W, 4);
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(0.35, 0.35);
var m = wqwLite() ? new THREE.MeshLambertMaterial({ map: t }) : new THREE.MeshPhongMaterial({ map: t, shininess: 4, specular: 0x101008 });
m.userData.noPhoto = 1;
return m;
});
},
function (G, x, z, y) {
var lite = wqwLite(), R = wRand(7811), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var L = wqxGlowStart();
var W = 12, D = 9, Hw = 3.6, plaster = wqwS("b:stucco", 0xF6EEDE, 2.4), beam = wqwS("b:oak", 0x4A3020, 1.4), stone = wqwS("b:ashlar", 0xB8A890, 1.6);
wqwBox(g, W + 0.4, 0.6, D + 0.4, stone, 0, 0, 0);
wqwBox(g, W, Hw, D, plaster, 0, 0.6, 0);
[-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) { wqwBox(g, 0.32, Hw, 0.32, beam, sx * W / 2, 0.6, sz * D / 2); }); });
[-3, 3].forEach(function (bx) { wqwBox(g, 0.24, Hw, 0.12, beam, bx, 0.6, D / 2 + 0.04); });
wqwBox(g, W + 0.2, 0.22, 0.14, beam, 0, 0.6 + Hw - 0.2, D / 2 + 0.05);
wqwBox(g, W + 0.2, 0.22, 0.14, beam, 0, 0.6 + Hw - 0.2, -D / 2 - 0.05);
var th = new THREE.Mesh(wqwGeo("wqsThatchG", function () { var gg = new THREE.CylinderGeometry(0.0, 1, 1, 4, 6, false); gg.rotateY(Math.PI / 4); var p = gg.attributes.position; for (var i = 0; i < p.count; i++) {
var yy = p.getY(i) + 0.5;
var bulge = 1 + Math.sin(yy * Math.PI) * 0.08;
p.setX(i, p.getX(i) * bulge);
p.setZ(i, p.getZ(i) * bulge);
} gg.computeVertexNormals(); return gg; }), wqsThatchM());
th.scale.set((W + 2.6) / 1.414, 5.4, (D + 2.6) / 1.414);
th.position.y = 0.6 + Hw + 2.6;
g.add(th);
var ridge = new THREE.Mesh(wqwBoxG(W * 0.2, 0.5, 0.7), wqsThatchM());
ridge.position.y = 0.6 + Hw + 5.2;
g.add(ridge);
var ev = new THREE.Mesh(new THREE.TorusGeometry(1, 0.12, 6, 4), wqsThatchM());
ev.rotation.set(Math.PI / 2, 0, Math.PI / 4);
ev.scale.set((W + 2.6) / 1.414, (D + 2.6) / 1.414, 2);
ev.position.y = 0.6 + Hw - 0.1;
g.add(ev);
wqwBox(g, 1.4, 8.6, 1.4, stone, -W / 2 + 1.6, 0.6, -1.2);
wqwBox(g, 1.6, 0.3, 1.6, stone, -W / 2 + 1.6, 9.2, -1.2);
wqwSmoke(G, x - W / 2 + 1.6, y + 10, z - 1.2, 0xDDD6CC, lite ? 4 : 8);
var glass = wqwM("wqsGlass", function () { var t = wqwCanvas("wqsLeaded", 64, 96, function (c, Wc, Hc) { var gg = c.createLinearGradient(0, 0, Wc, Hc); gg.addColorStop(0, "#FFF6D8"); gg.addColorStop(0.4, "#F0C878"); gg.addColorStop(1, "#C88A40"); c.fillStyle = gg; c.fillRect(0, 0, Wc, Hc); c.strokeStyle = "#3A2A1A"; c.lineWidth = 2; for (var i = -Hc; i < Wc + Hc; i += 12) {
c.beginPath();
c.moveTo(i, 0);
c.lineTo(i + Hc * 0.6, Hc);
c.moveTo(i, Hc);
c.lineTo(i + Hc * 0.6, 0);
c.stroke();
} c.lineWidth = 5; c.strokeRect(0, 0, Wc, Hc); c.beginPath(); c.moveTo(Wc / 2, 0); c.lineTo(Wc / 2, Hc); c.stroke(); }); var m = new THREE.MeshBasicMaterial({ map: t }); m.userData.noPhoto = 1; return m; });
var wins = [[-3.6, D / 2, 0], [3.6, D / 2, 0], [-W / 2, -1.4, -Math.PI / 2], [W / 2, -1.4, Math.PI / 2], [W / 2, 2.2, Math.PI / 2], [-2, -D / 2, Math.PI], [2.6, -D / 2, Math.PI]];
wins.forEach(function (w) {
var wg = new THREE.Group();
wg.position.set(w[0], 1.6, w[1]);
wg.rotation.y = w[2];
g.add(wg);
var p = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.5), glass);
p.position.set(0, 0.75, 0.06);
wg.add(p);
wqwBox(wg, 1.6, 0.12, 0.24, beam, 0, -0.06, 0.1);
wqwBox(wg, 1.6, 0.14, 0.2, beam, 0, 1.5, 0.08);
[-1, 1].forEach(function (s) { var sh = new THREE.Mesh(wqwBoxG(0.66, 1.5, 0.06), wqwS("b:planks", 0x5A8A4A, 1)); sh.position.set(s * 1.06, 0.75, 0.12); sh.rotation.y = s * 0.25; wg.add(sh); });
wqwBox(wg, 1.6, 0.3, 0.36, beam, 0, -0.36, 0.28);
var fl = [];
for (var k = 0; k < 10; k++)
fl.push({ x: -0.7 + k * 0.155, y: -0.06, z: 0.28, s: 0.7, ry: R() * 6 });
wqwPlant(wg, "flowers", fl, { col: ["#F8C8D8", "#F8F0A0", "#C8A8F0"][Math.floor(R() * 3)], keepAll: 1 });
var v = new THREE.Vector3(0, 0.75, 0.4).applyAxisAngle(new THREE.Vector3(0, 1, 0), w[2]);
wqxGlow(L, w[0] + v.x, 1.6 + v.y, w[1] + v.z, 0xFFE8B0, 1.6);
});
wqwBox(g, 1.7, 2.7, 0.3, beam, 0, 0.6, D / 2 + 0.02);
var dl = new THREE.Mesh(wqwBoxG(1.1, 2.3, 0.08), wqwS("b:planks", 0x6A8A3A, 1));
dl.position.set(-0.85, 0.6 + 1.15, D / 2 - 0.5);
dl.rotation.y = 1.2;
g.add(dl);
var inner = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.3), wqwGlowM(0xFFB860, 0.95));
inner.position.set(0, 0.6 + 1.15, D / 2 + 0.17);
g.add(inner);
wqxGlow(L, 0, 1.8, D / 2 + 0.6, 0xFFB060, 2.6);
for (var st = 0; st < 2; st++)
wqwBox(g, 2.2 - st * 0.3, 0.2, 0.6, stone, 0, st * 0.2, D / 2 + 0.9 - st * 0.4);
var porch = new THREE.Mesh(wqwBoxG(2.6, 0.24, 1.4), wqsThatchM());
porch.position.set(0, 0.6 + 2.95, D / 2 + 0.6);
porch.rotation.x = 0.35;
g.add(porch);
var vine = [], bloom = [];
function climb(x0, x1, zz, ry2, n) { for (var i = 0; i < n; i++) {
var t = R(), hgt = R() * Hw, p = new THREE.Vector3(x0 + (x1 - x0) * t, 0.6 + hgt, 0.04).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry2);
p.add(new THREE.Vector3(Math.sin(ry2) * zz, 0, Math.cos(ry2) * zz));
vine.push({ x: p.x, y: p.y, z: p.z, s: 0.7 + R() * 0.6, rx: R() * 6, ry: R() * 6 });
if (R() < 0.55)
bloom.push({ x: p.x + (R() - 0.5) * 0.2, y: p.y + (R() - 0.5) * 0.2, z: p.z + (R() - 0.5) * 0.2, s: 0.8 + R() * 0.5 });
} }
climb(-W / 2 + 0.3, -1.2, D / 2 + 0.06, 0, lite ? 60 : 180);
climb(1.2, W / 2 - 0.3, D / 2 + 0.06, 0, lite ? 60 : 180);
climb(-D / 2 + 0.3, D / 2 - 0.3, W / 2 + 0.06, Math.PI / 2, lite ? 40 : 120);
climb(-D / 2 + 0.3, D / 2 - 0.3, W / 2 + 0.06, -Math.PI / 2, lite ? 40 : 120);
wqwInst(g, wqwGeo("wqsVine", function () { var c = wqwCards(2, 0.5, 0.5, -0.25, 0); return c; }), wqxLeafM(0x3A6A2A), vine);
wqwInst(g, wqwGeo("wqsRose", function () { return new THREE.IcosahedronGeometry(0.09, 1); }), wqwLam(0xE8506A, { e: 0x3A0A12 }), bloom.filter(function (b, i) { return i % 3; }));
wqwInst(g, wqwGeo("wqsRose", null), wqwLam(0xF8D8E0, { e: 0x2A1418 }), bloom.filter(function (b, i) { return !(i % 3); }));
for (var k = 0; k < 10; k++) {
var fs = new THREE.Mesh(wqwGeo("wqsFlag", function () { var c = new THREE.CircleGeometry(0.5, 7); c.rotateX(-Math.PI / 2); return c; }), stone);
fs.position.set((R() - 0.5) * 0.4, 0.03, D / 2 + 2 + k * 1.1);
fs.scale.set(1 + R() * 0.3, 1, 0.8 + R() * 0.3);
g.add(fs);
}
var bed = [];
for (k = 0; k < (lite ? 120 : 360); k++) {
var bx = (R() < 0.5 ? -1 : 1) * (1.6 + R() * 6), bz = D / 2 + 1.4 + R() * 10;
bed.push({ x: x + bx, z: z + bz, y: y + 0.02, s: 0.8 + R() * 0.4, ry: R() * 6 });
}
["#E83A4A", "#F8D040", "#C858A8", "#FFFFFF", "#F89AB0", "#8A6AE0"].forEach(function (cc, i) { wqwPlant(G, "flowers", bed.filter(function (b, j) { return j % 6 === i; }), { col: cc, keepAll: 1 }); });
var pick = [];
for (var px = -8; px <= 8; px += 0.5) {
if (Math.abs(px) < 1.2)
continue;
pick.push({ x: px, y: 0, z: D / 2 + 12 });
}
for (var pz = D / 2 + 1; pz < D / 2 + 12; pz += 0.5) {
pick.push({ x: -8, y: 0, z: pz });
pick.push({ x: 8, y: 0, z: pz });
}
wqwInst(g, wqwGeo("wqsPicket", function () { var b = new THREE.BoxGeometry(0.08, 1.0, 0.04); b.translate(0, 0.5, 0); var tip = new THREE.ConeGeometry(0.06, 0.14, 4); tip.translate(0, 1.07, 0); return gwMerge([b.toNonIndexed(), tip.toNonIndexed()]); }), wqwLam(0xF6F2EA), pick);
wqwBox(g, 16, 0.06, 0.06, wqwLam(0xF6F2EA), 0, 0.7, D / 2 + 12);
[[-1.6, 6], [1.6, 6.6]].forEach(function (q) { var sk = new THREE.Mesh(wqwGeo("wqsSkep", function () { return new THREE.SphereGeometry(0.4, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6); }), wqsThatchM()); sk.position.set(q[0] * 4, 0.5, D / 2 + q[1]); g.add(sk); wqwCyl(g, 0.25, 0.25, 0.5, wqwMat("oak"), q[0] * 4, 0, D / 2 + q[1], 8); });
var bn = new THREE.Group();
bn.position.set(5.4, 0, D / 2 + 3);
bn.rotation.y = -0.6;
g.add(bn);
wqwBox(bn, 1.8, 0.08, 0.5, wqwMat("oak"), 0, 0.45, 0);
wqwBox(bn, 1.8, 0.5, 0.06, wqwMat("oak"), 0, 0.53, -0.22);
[-0.75, 0.75].forEach(function (lx) { wqwBox(bn, 0.08, 0.45, 0.45, wqwMat("oak"), lx, 0, 0); });
var sun = new THREE.PointLight(0xFFE8C0, 0.8, 24);
sun.position.set(0, 3, D / 2 + 4);
g.add(sun);
wqxGlowDone(g, L, 1.0);
wqwSolid(x, z, W, D, y - 1, y + 9, 0);
return g;
},
function (P, list) { var cols = [0xF8D040, 0xE8701A, 0x6AA8F8, 0xF4F0EC, 0xC858A8]; cols.forEach(function (col, k) { wqwInst(P, wqwGeo("wqsBfly", function () { var a = new THREE.CircleGeometry(0.07, 6); a.translate(0.06, 0, 0); a.rotateY(0.5); var b = new THREE.CircleGeometry(0.07, 6); b.translate(-0.06, 0, 0); b.rotateY(-0.5); return gwMerge([a.toNonIndexed(), b.toNonIndexed()]); }), wqwLam(col, { ds: 1, e: 0x201810 }), list.filter(function (t, i) { return i % cols.length === k; })); }); },
function (P, x, y, z, ry, w, h, L) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var gl = new THREE.Mesh(wqwGeo("wqtWinG", function () { var s = new THREE.Shape(); s.moveTo(-0.5, 0); s.lineTo(0.5, 0); s.lineTo(0.5, 0.7); s.absarc(0, 0.7, 0.5, 0, Math.PI, false); s.closePath(); return new THREE.ShapeGeometry(s, 16); }), wqwM("wqtWinM", function () { var t = wqwCanvas("wqtWinT", 64, 128, function (c, W, H) { var gg = c.createLinearGradient(0, H, 0, 0); gg.addColorStop(0, "#FFC860"); gg.addColorStop(1, "#FFF4D0"); c.fillStyle = gg; c.fillRect(0, 0, W, H); c.strokeStyle = "rgba(120,80,20,.8)"; c.lineWidth = 2; for (var i = 8; i < W; i += 16) {
c.beginPath();
c.moveTo(i, 0);
c.lineTo(i, H);
c.stroke();
} for (i = 10; i < H; i += 20) {
c.beginPath();
c.moveTo(0, i);
c.lineTo(W, i);
c.stroke();
} }); var m = new THREE.MeshBasicMaterial({ map: t }); m.userData.noPhoto = 1; return m; }));
gl.scale.set(w, h / 1.2, 1);
gl.position.z = 0.06;
g.add(gl);
var fr = new THREE.Mesh(wqwGeo("wqtWinF", function () { var t = new THREE.TorusGeometry(0.5, 0.06, 6, 16, Math.PI); t.translate(0, 0.7, 0); return t; }), wqwS("b:marble", 0xF4ECDC, 1));
fr.scale.set(w, h / 1.2, w);
fr.position.z = 0.1;
g.add(fr);
[-1, 1].forEach(function (s) { wqwBox(g, 0.14 * w + 0.08, h * 0.58, 0.18, wqwS("b:marble", 0xF4ECDC, 1), s * w * 0.5, 0, 0.1); });
wqwBox(g, w + 0.4, 0.16, 0.4, wqwS("b:marble", 0xF4ECDC, 1), 0, -0.1, 0.2);
if (L) {
var v = new THREE.Vector3(0, h * 0.45, 0.8).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry || 0);
wqxGlow(L, x + v.x, y + v.y, z + v.z, 0xFFC860, Math.max(w, h) * 0.8);
}
return g;
},
function (P, x, y, z, ry, w, h, n, seed, bloomCol) {
var R = wRand(seed), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var lv = [], bl = [];
for (var i = 0; i < n; i++) {
var u = (R() - 0.5) * w, t = Math.pow(R(), 0.7) * h;
lv.push({ x: u, y: t, z: 0.08 + R() * 0.25, s: 0.7 + R() * 0.7, rx: R() * 6, ry: R() * 6 });
if (R() < 0.35)
bl.push({ x: u + (R() - 0.5) * 0.3, y: t + (R() - 0.5) * 0.3, z: 0.3, s: 0.8 + R() * 0.6 });
}
wqwInst(g, wqwGeo("wqsVine", function () { return wqwCards(2, 0.5, 0.5, -0.25, 0); }), wqxLeafM(0x3A7A2A), lv);
wqwInst(g, wqwGeo("wqsRose", function () { return new THREE.IcosahedronGeometry(0.09, 1); }), wqwLam(bloomCol || 0xE85A9A, { e: 0x2A0A14 }), bl);
return g;
},
function (P, x, y, z, s, fruitCol) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.scale.setScalar(s || 1);
P.add(g);
var urn = new THREE.Mesh(wqwGeo("wqtUrn", function () { var pts = []; for (var i = 0; i <= 10; i++) {
var t = i / 10;
pts.push(new THREE.Vector2(0.35 + Math.sin(t * Math.PI) * 0.35 + (t > 0.9 ? 0.12 : 0), t * 1.1));
} return new THREE.LatheGeometry(pts, 18); }), wqwMat("terracotta"));
g.add(urn);
wqwCyl(g, 0.06, 0.09, 1.4, wqwMat("bark"), 0, 1.0, 0, 6);
var cr = new THREE.Mesh(wqwGeo("wqtCrown", function () { var parts = [], r = wRand(77); for (var i = 0; i < 14; i++) {
var c = wqwCards(2, 0.9, 0.9, -0.45, 0);
c.rotateX(r() * 3);
c.translate((r() - 0.5) * 1.1, 2.6 + (r() - 0.5) * 0.9, (r() - 0.5) * 1.1);
parts.push(c);
} return gwMerge(parts); }), wqxLeafM(0x3A7A2A));
g.add(cr);
var R = wRand(Math.round(x * 7 + z)), fr = [];
for (var k = 0; k < 14; k++)
fr.push({ x: (R() - 0.5) * 1.2, y: 2.2 + R() * 0.9, z: (R() - 0.5) * 1.2, s: 1 });
wqwInst(g, wqwGeo("wqtCitrus", function () { return new THREE.SphereGeometry(0.09, 8, 6); }), wqwLam(fruitCol || 0xF0A020, { e: 0x301800 }), fr);
return g;
},
function (G, x, z, ry, y, k, L, lite) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var R = wRand(k * 31 + 7);
var w = 7 + R() * 3, d = 5.5 + R() * 2, h = 2.8 + R() * 0.8, logs = wqwS("b:planks", [0x7A5A3A, 0x8A6A44, 0x6A4A2E, 0x9A7A50][k % 4], 1.6), dark = wqwS("b:oak", 0x3A2414, 1.4);
wqwBox(g, w + 0.3, 0.5, d + 0.3, wqwMat("stone"), 0, 0, 0);
wqwBox(g, w, h, d, logs, 0, 0.5, 0);
for (var lg = 0.8; lg < h + 0.4; lg += 0.42) {
wqwBox(g, w + 0.5, 0.08, 0.12, dark, 0, lg, d / 2 + 0.02);
wqwBox(g, w + 0.5, 0.08, 0.12, dark, 0, lg, -d / 2 - 0.02);
}
[-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) { wqwCyl(g, 0.16, 0.16, h, dark, sx * (w / 2), 0.5, sz * (d / 2), 6); }); });
var rf = new THREE.Mesh(wqwGeo("wquRoof", function () { var s = new THREE.Shape(); s.moveTo(-0.6, 0); s.lineTo(0, 0.62); s.lineTo(0.6, 0); s.lineTo(0.56, -0.04); s.lineTo(0, 0.54); s.lineTo(-0.56, -0.04); s.closePath(); var e = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }); e.translate(0, 0, -0.5); return e; }), wqwS("snow", 0xF6F8FC, 3));
rf.scale.set(w + 1.2, w * 0.8, d + 1.0);
rf.position.y = h + 0.5;
g.add(rf);
var gab = new THREE.Mesh(wqwGeo("wquGab", function () { var s = new THREE.Shape(); s.moveTo(-0.5, 0); s.lineTo(0, 0.5); s.lineTo(0.5, 0); s.closePath(); return new THREE.ShapeGeometry(s); }), logs);
[1, -1].forEach(function (s) { var m = gab.clone(); m.scale.set(w, w * 0.95, 1); m.position.set(0, h + 0.5, s * d / 2); if (s < 0)
m.rotation.y = Math.PI; g.add(m); });
var ic = [];
for (var i = 0; i < (lite ? 4 : 10); i++) {
var u = -w / 2 - 0.4 + R() * (w + 0.8);
ic.push({ x: u, y: h + 0.42, z: d / 2 + 0.48, s: 0.6 + R() * 0.9 });
ic.push({ x: u, y: h + 0.42, z: -d / 2 - 0.48, s: 0.6 + R() * 0.9 });
}
wqwInst(g, wqwGeo("wquIcicle", function () { var c = new THREE.ConeGeometry(0.05, 0.5, 5); c.rotateX(Math.PI); c.translate(0, -0.25, 0); return c; }), wqiIce(0xE8F6FF, { op: 0.8 }), ic);
var cx = (R() < 0.5 ? -1 : 1) * w * 0.28;
wqwBox(g, 0.9, h + 3.4, 0.9, wqwMat("stone"), cx, 0.5, -d * 0.2);
wqwBox(g, 1.0, 0.25, 1.0, wqwS("snow", 0xF6F8FC, 3), cx, h + 3.9, -d * 0.2);
wqwSmoke(g, cx, h + 4.4, -d * 0.2, 0xA8A098, lite ? 3 : 6);
var glowM = wqwM("wquWinM", function () { var t = wqwCanvas("wquWinT", 64, 64, function (c, W, H) { var gg = c.createRadialGradient(W / 2, H / 2, 4, W / 2, H / 2, W * 0.7); gg.addColorStop(0, "#FFE8B0"); gg.addColorStop(1, "#E88A30"); c.fillStyle = gg; c.fillRect(0, 0, W, H); c.fillStyle = "#2A1A0E"; c.fillRect(W / 2 - 2, 0, 4, H); c.fillRect(0, H / 2 - 2, W, 4); c.lineWidth = 5; c.strokeStyle = "#2A1A0E"; c.strokeRect(0, 0, W, H); }); var m = new THREE.MeshBasicMaterial({ map: t }); m.userData.noPhoto = 1; return m; });
[-w * 0.28, w * 0.28].forEach(function (wx, j) {
if (j === 0 && k % 5 === 0)
return;
var p = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.0), glowM);
p.position.set(wx, 1.8, d / 2 + 0.08);
g.add(p);
[-1, 1].forEach(function (s) { wqwBox(g, 0.46, 1.1, 0.05, wqwLam([0x3A5A3A, 0x7A2A1A, 0x2A3A5A][k % 3]), wx + s * 0.76, 1.25, d / 2 + 0.1); });
wqwBox(g, 1.2, 0.26, 0.32, dark, wx, 1.12, d / 2 + 0.2);
wqwBox(g, 1.22, 0.08, 0.34, wqwS("snow", 0xF6F8FC, 3), wx, 1.38, d / 2 + 0.2);
var v = new THREE.Vector3(wx, 1.8, d / 2 + 0.5).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
wqxGlow(L, x + v.x, y + v.y, z + v.z, 0xFFB060, 1.8);
});
wqwBox(g, 1.1, 2.0, 0.1, dark, 0, 0.5, d / 2 + 0.05);
var lp = new THREE.Vector3(0.9, 2.7, d / 2 + 0.3).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
var lm = new THREE.Mesh(wqwGeo("wqaLan", function () { return new THREE.SphereGeometry(0.22, 10, 8); }), wqwGlowM(0xFFA040, 1));
lm.scale.setScalar(0.6);
lm.position.set(0.9, 2.7, d / 2 + 0.3);
g.add(lm);
wqxGlow(L, x + lp.x, y + lp.y, z + lp.z, 0xFFA040, 1.4);
var wp = [];
for (var r2 = 0; r2 < 4; r2++)
for (var c2 = 0; c2 < 6; c2++)
wp.push({ x: -w / 2 - 0.5, y: 0.2 + r2 * 0.3, z: -d / 2 + 0.6 + c2 * 0.32, s: 1, rx: 0, rz: Math.PI / 2 });
wqwInst(g, wqwGeo("wquLog", function () { return new THREE.CylinderGeometry(0.14, 0.14, 1.0, 7); }), wqwMat("bark"), wp);
wqwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + h + 4, ry);
return g;
},
function (G, H, o) {
var lite = wqwLite(), R = wRand(o.seed || 1), f = lite ? 0.25 : 1, x0 = o.x0, z0 = o.z0, x1 = o.x1, z1 = o.z1;
var keep = function (x, z) { if (o.keep && !o.keep(x, z))
return false; var y = H(x, z); if (o.maxY != null && y > o.maxY)
return false; return !wqwSolidAt(x, z, y); };
function sc(n, smin, smax, seed, ok) { return wqwScatter(seed, Math.round(n * f), x0, z0, x1, z1, function (x, z) { return keep(x, z) && (!ok || ok(x, z)); }, H, smin, smax); }
if (o.grass)
(o.grass.cols || [o.grass.col]).forEach(function (c, k) { wqwPlant(G, "grass", sc(o.grass.n / (o.grass.cols || [1]).length, 0.9, 1.8, (o.seed || 1) + 11 + k), { col: c, keepAll: 1 }); });
if (o.flowers) {
var fl = [];
for (var g = 0; g < Math.round(o.flowers.drifts * f); g++) {
var cx = x0 + R() * (x1 - x0), cz = z0 + R() * (z1 - z0), rr = 6 + R() * 22, col = g % o.flowers.cols.length;
for (var k = 0; k < o.flowers.per; k++) {
var a = R() * Math.PI * 2, r = Math.sqrt(R()) * rr, x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
if (!keep(x, z))
continue;
fl.push({ x: x, z: z, y: H(x, z), s: 0.7 + R() * 0.6, ry: R() * 6, c: col });
}
}
o.flowers.cols.forEach(function (c, k) { wqwPlant(G, "flowers", fl.filter(function (t) { return t.c === k; }), { col: c, keepAll: 1 }); });
}
if (o.shrubs)
wqwPlant(G, "bush", sc(o.shrubs.n, 0.6, 1.4, (o.seed || 1) + 21), { col: o.shrubs.col });
if (o.rocks)
wqwPlant(G, "rock", sc(o.rocks.n, 0.4, 1.6, (o.seed || 1) + 31).map(function (t) { t.y -= 0.2; return t; }), { mat: o.rocks.mat });
(o.trees || []).forEach(function (T, ti) {
var list = [];
for (var g = 0; g < Math.round(T.groves * f); g++) {
var cx = x0 + R() * (x1 - x0), cz = z0 + R() * (z1 - z0);
for (var k = 0; k < T.per; k++) {
var a = R() * Math.PI * 2, r = Math.sqrt(R()) * (T.r || 30), x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
if (!keep(x, z))
continue;
list.push({ x: x, z: z, y: H(x, z), s: (T.s0 || 0.8) + R() * ((T.s1 || 1.4) - (T.s0 || 0.8)), ry: R() * 6 });
}
}
if (T.kind === "conifer")
wqwPlant(G, "conifer", list, { col: T.cols[0] });
else
wqxTrees(G, T.kind, list, T.cols, { noSolid: T.noSolid });
if (T.fruit) {
var fr = [];
list.forEach(function (t, i) { if (i % 2)
return; for (var k = 0; k < 10; k++)
fr.push({ x: t.x + (R() - 0.5) * 5 * t.s, y: t.y + (6 + R() * 5) * t.s, z: t.z + (R() - 0.5) * 5 * t.s, s: 1 }); });
wqwInst(G, wqwGeo("fruitF" + ti + T.fruit, function () { return new THREE.SphereGeometry(0.14, 8, 6); }), wqwLam(T.fruit), fr, {});
}
});
},
function (cols, seed) {
var t = wqwCanvas("wqzCarpet" + cols.join("") + seed, 512, 512, function (c, W, Hh) {
var R = wRand(seed);
c.clearRect(0, 0, W, Hh);
for (var i = 0; i < 1500; i++) {
var x = R() * W, y = R() * Hh;
if (R() < 0.4) {
c.strokeStyle = ["#4A7A2A", "#6A9A3A", "#3A6A22"][i % 3];
c.lineWidth = 1.5;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + (R() - 0.5) * 5, y - 8 - R() * 8);
c.stroke();
continue;
}
var col = cols[Math.floor(R() * cols.length)], r = 2.4 + R() * 3.2;
c.fillStyle = col;
for (var p = 0; p < 5; p++) {
var a = p / 5 * Math.PI * 2;
c.beginPath();
c.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, r * 0.72, 0, Math.PI * 2);
c.fill();
}
c.fillStyle = "#F8D040";
c.beginPath();
c.arc(x, y, r * 0.42, 0, Math.PI * 2);
c.fill();
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return t;
},
function (G, H, o) {
var lite = wqwLite(), R = wRand(o.seed || 5), n = Math.round(o.n * (lite ? 0.35 : 1)), seg = lite ? 4 : 7;
(o.sets || [o.cols]).forEach(function (cols, si) {
var pos = [], uv = [], idx = [], v = 0;
for (var i = 0; i < n; i++) {
var cx = o.x0 + R() * (o.x1 - o.x0), cz = o.z0 + R() * (o.z1 - o.z0);
if (o.keep && !o.keep(cx, cz))
continue;
var r = (o.r0 || 6) + R() * ((o.r1 || 16) - (o.r0 || 6)), ang = R() * 6.283, ca = Math.cos(ang), sa = Math.sin(ang);
for (var a = 0; a <= seg; a++)
for (var b = 0; b <= seg; b++) {
var u = a / seg, w = b / seg, lx = (u - 0.5) * 2 * r, lz = (w - 0.5) * 2 * r, x = cx + lx * ca - lz * sa, z = cz + lx * sa + lz * ca;
pos.push(x, H(x, z) + 0.07, z);
uv.push(lx / 3.2, lz / 3.2);
}
for (a = 0; a < seg; a++)
for (b = 0; b < seg; b++) {
var du = (a + 0.5) / seg - 0.5, dw = (b + 0.5) / seg - 0.5;
if (du * du + dw * dw > 0.25 + R() * 0.04)
continue;
var q = v + a * (seg + 1) + b;
idx.push(q, q + 1, q + seg + 1, q + 1, q + seg + 2, q + seg + 1);
}
v += (seg + 1) * (seg + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
g.computeBoundingSphere();
var m = new THREE.Mesh(g, wqwM("wqzCarpetM" + cols.join("") + si, function () { var mm = new THREE.MeshLambertMaterial({ map: wqzCarpetTex(cols, (o.seed || 5) + si), transparent: true, alphaTest: 0.3, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); mm.userData.noPhoto = 1; return mm; }));
m.receiveShadow = true;
m.renderOrder = 1;
G.add(m);
});
},
function () {
var S = wqwSc(), k = S.env, L = null;
try {
var Lw = worldLocal();
L = { x: Lw.x - S.x, z: Lw.z };
}
catch (e) { }
if (WQW.envK && WQW_ENV[WQW.envK])
k = WQW.envK;
if (WQW.night && !gS0(WQW.sc).under)
k = WQW_SC[WQW.sc] && WQW_SC[WQW.sc].tor ? "tnight" : "enight";
var R = L ? wqwRoomAt(L.x, L.z) : null;
if (R)
k = R.env;
var E = {}, B = WQW_ENV[k] || WQW_ENV.land;
for (var q in B)
E[q] = B[q];
if (wqwLite() && E.fogD)
E.fogD *= 1.4;
return E;
},
function (x, z, feet) {
if (WQW.moving || WQW.ride)
return true;
var S = wqwSc(), D = WQW_SCN[WQW.sc];
if (!D)
return false;
if ((Math.abs(x) > S.bound || Math.abs(z) > S.bound) && wqwFloorAt(x, z, feet) === null)
return true;
if (D.edge && x < S.bound + 60 && D.edge(x, z))
return true;
if (wqwSolidAt(x, z, feet))
return true;
var fl = wqwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = wqwLand(x, z);
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
WQW.t += dt;
if (!WQW.built || !WQW.scG)
return;
var S = wqwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
WQW.et = (WQW.et || 0) + dt;
if (WQW.et > 0.8) {
WQW.et = 0;
worldEnv(wqwEnvNow());
}
var flow = WQW.t * 0.02;
WQW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * 0.4, flow); });
WQW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (WQW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(WQW.t * 3 + i * 2)) * 0.3; f.rotation.y = WQW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(WQW.t * 1.3) * 0.08;
}
});
WQW.bob.forEach(function (g, i) {
var u = g.userData, k = u.kind;
if (Math.abs(g.position.x - L.x) + Math.abs(g.position.z - L.z) > 260)
return;
if (k === "air") {
g.position.x = u.home[0] + Math.sin(WQW.t * 0.05 + u.ph) * 20 * u.dr[0] * 2;
g.position.z = u.home[1] + Math.cos(WQW.t * 0.04 + u.ph) * 20 * u.dr[1] * 2;
g.position.y = u.y0 + Math.sin(WQW.t * 0.4 + u.ph) * 0.8;
g.rotation.y += dt * 0.2;
}
else if (k === "walk") {
var a = WQW.t * 0.03 + u.ph;
g.position.x = u.home[0] + Math.sin(a) * 8;
g.position.z = u.home[1] + Math.cos(a * 0.7) * 8;
if (u.hfn)
g.position.y = u.hfn(g.position.x, g.position.z);
}
else if (k === "waltz") {
var b = WQW.t * 0.08 + u.ph;
g.position.x = u.home[0] + Math.sin(b) * 10;
g.position.z = u.home[1] + Math.sin(b * 2) * 5;
if (u.hfn)
g.position.y = u.hfn(g.position.x, g.position.z);
g.children[0].rotation.y = WQW.t * 2.2;
g.children[0].position.y = 0.55 + Math.abs(Math.sin(WQW.t * 3.3)) * 0.08;
}
else if (k === "spin") {
g.rotation.y += dt * (u.sp || 0.3);
}
else if (k === "float") {
g.position.y = u.y0 + Math.sin(WQW.t * (u.f || 0.3) + u.ph) * (u.amp || 1);
}
});
WQW.ghosts.forEach(function (g, i) { var m = g.userData.mats; if (m)
m.forEach(function (x) { x.opacity = 0.55 + Math.sin(WQW.t * 0.8 + i) * 0.1; }); });
WQW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return wqwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof wqbTick === "function")
try {
wqbTick(dt, L);
}
catch (e) {
if (!WQW.e1) {
WQW.e1 = 1;
if (window.console)
console.warn("[winters-heart] book", e);
}
}
if (!WQW.bannerBook)
worldBanner("<b>❄️ " + WQW_NAME + "</b> · " + esc(wqwPlaceName(L)) + (WQW.night ? " · night" : ""));
WQW.pt = (WQW.pt || 0) + dt;
if (WQW.pt < 0.15)
return;
WQW.pt = 0;
if (WQW.moving || WQW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
WQW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof wqbTalk === "function" && wqbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
WQW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : wqwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof wqbSpot === "function")
wqbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof wqbIdlePrompt === "function")
wqbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = wqwAtPt(opt.at) || (typeof wqbStartAt === "function" && wqbStartAt()) || wqwAtPt("gates");
wqwScene(A.sc);
var S = WQW_SC[A.sc], y = A.y != null ? A.y : wqwGround(A.x, A.z);
camera.position.set(WQW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
WQW.moving = false;
WQW.ride = null;
worldEnv(wqwEnvNow());
setStatus("❄️ <b>" + WQW_NAME + ".</b> S. Nightwell's book, the whole of it: the Snow Queen's Winter Palace and the wastes, and the realms of her sisters. <b>Press E</b> for the book.");
if (typeof wqbEnter === "function")
try {
wqbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[winters-heart] enter", e);
}
},
function () {
wqwSceneDrop();
for (var k in WQW.mats) {
var m = WQW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in WQW.tex) {
var x = WQW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in WQW_GEO) {
try {
WQW_GEO[g].dispose();
}
catch (e) { }
}
WQW.mats = {};
WQW.tex = {};
WQW_GEO = {};
WQW.built = false;
WQW.G = null;
WQW.lights = 0;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = WQW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = WQW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: WQW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return wqbPos(at.at);
var C = WQB_CH[wqbS().ch], i = wqbS().s, c = C && C.cast ? C.cast.filter(function (d) { return wqbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? wqbPos(c.at) : null;
}
if (at.spot) {
var Sp = WQW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: WQW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return wqbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || WQW.sc, x: at.x, z: at.z, y: at.y };
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
if (WQB.beam && WQB.beam.parent === WQW.scG)
return WQB.beam;
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
WQW.scG.add(g);
WQB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return wqwLam(c); }, m;
switch (kind) {
case "load":
m = wqwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
wqwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = wqwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = wqwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = wqwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = wqwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = wqwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
wqwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = wqwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
wqwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), wqwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = wqwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "skin":
m = wqwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = wqwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
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
if (!P || !WQW.scG || P.sc !== WQW.sc)
return null;
var g = wqbItemMesh(kind), y = P.y != null ? P.y : wqwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
WQW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = wqwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (WQB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = WQW.spots.indexOf(I.S); if (j >= 0)
WQW.spots.splice(j, 1); WQB.items = WQB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.arb = 1;
WQB.items.push(I);
return I;
},
function (k) {
if (WQB.tuneKey === k)
return;
WQB.tuneKey = k;
var old = WQB.tune;
WQB.tune = null;
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
if (!k || !WQB_TUNES[k])
return;
try {
var A = new Audio(WQB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
WQB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (WQB.tune !== A) {
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
if (WQB.text)
return fn(WQB.text);
if (WQB.textWait) {
WQB.textWait.push(fn);
return;
}
WQB.textWait = [fn];
var done = function (B) { WQB.text = B; var w = WQB.textWait; WQB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/winters-heart/winters-heart.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
wqbText(function (B) {
var C = WQB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + wqbLabel(i) + "</h3>" + WQB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(wqbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); WQB.readOpen = 0; WQB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = wqbS(), C = WQB_CH[S.ch];
if (!C)
return;
WQB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
WQB.readAsk = 0;
WQB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "Winter's Heart") + "</div><h3 style='margin:4px 0'>" + wqbLabel(ch) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? wqbOpening(T).map(wqbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); WQB.readOpen = 0; wqbStepDone(); }, all: function () { wqbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "The book's own words, all of it");
b += wqbKeeperBtns(fns);
worldCard(b, fns);
};
wqbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
WQB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); wqbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = wqbS(), C = WQB_CH[S.ch];
if (!C)
return;
wqbItemsClear();
wqbCastClear();
WQB.hold = 0;
var go = function () { wqbWorldState(); wqbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[wqb] setup", S.ch, e);
} wqbTune(C.tune || null); wqbStepBegin(); };
if (place && C.start) {
var P = wqbPos(C.start);
if (P && WLD.on === WQW_KEY) {
wqwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (WQW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = wqbStep();
wqbItemsClear();
WQB.hold = 0;
WQB.puzOpen = 0;
if (typeof wqxStepBegin === "function")
try {
wqxStepBegin(b);
}
catch (e) { }
if (!b)
return;
b._key = wqbKey();
wqbWorldState();
try {
if (b.on)
b.on(wqbS().f);
}
catch (e) {
if (window.console)
console.warn("[wqb] on", e);
}
if (b.k === "read") {
wqbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { WQB.rew[k] = 0; });
if (b.k === "find") {
var Pf = wqbPos(b.at);
if (Pf && Pf.sc === WQW.sc)
wqbItemAdd(b.item, Pf, b.name, b.verb, function () { if (wqbKey() === b._key)
wqbStepDone(); });
}
if (b.k === "gather") {
var P = wqbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(wqbS().ch * 97 + wqbS().s * 13 + 7);
WQB.got = 0;
if (P && P.sc === WQW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = wqwGround(Q.x, Q.z, (P.y != null ? P.y : wqwLand(P.x, P.z)) + 1);
wqbItemAdd(b.item, Q, b.name, b.verb, function () { if (wqbKey() !== b._key)
return; WQB.got++; try {
if (b.each)
b.each(WQB.got);
}
catch (e) { } if (WQB.got < n) {
wqbSay((b.eachSay || "Got one.") + " " + WQB.got + " of " + n + ".");
return;
} wqbStepDone(); });
}
}
if (b.h)
wqbSay("<b>" + esc(WQB_CH[wqbS().ch].t) + ".</b> " + b.h);
},
function (b) {
WQB.puzOpen = 1;
WQB.puzT = performance.now();
var k = wqbKey(), fns = {}, h = WQB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
wqbSay(b.yes);
if (wqbKey() === k)
wqbStepDone();
return;
}
wqbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (wqbKey() === k)
WQB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = wqbS(), C = WQB_CH[S.ch], b = wqbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[wqb] done", e);
}
if (b.say)
wqbSay(b.say);
S.s++;
if (window.WQB_LOG)
WQB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= WQB_CH.length - 1) {
S.done = 1;
S.s = 0;
wqbSave();
wqbItemsClear();
wqbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
wqbSave();
var nx = WQB_CH[S.ch];
setTimeout(function () { try {
wqbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[wqb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
wqbSave();
wqbStepBegin();
},
function () {
wqbTune("end");
var S = wqbS();
var b = "<h3 style='margin:4px 0'>The End</h3><p style='font-style:italic'>" + wqQ("\"I told it true,\" I say. \"That's all I promised.\"") + "</p><p style='font-style:italic'>" + wqQ("\"Mirror, Mirror on the Wall.\"") + "</p>" + wvsrc("Epilogue, Winter's Truth") + "<p>You have played the whole of Winter's Heart: the Winter Palace and the shard chamber, the crater village and Gerda's tower, the wastes and the hunts, the woodcarver's carousel horse, Talia's Spring, Alessia's Summer and Cora's Autumn, the Mirror Void, the last shard, the Ice King rising, and the binding at Frostspire. Winter has found her heart.</p>";
try {
if (typeof bhnFinish === "function")
bhnFinish(WQW_KEY);
else if (typeof wqxFinishGift === "function")
wqxFinishGift();
}
catch (e) { }
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; wqbSave(); wqbChapterBegin(true); } };
b += worldBtn("again", "Play it again from the start", "Kael's Tale");
worldCard(b, fns);
},
function (c) {
var C = WQB.cast[c.key || c.k];
if (wqbCastLive(C))
return C;
var P = wqbPos(c.at);
if (!P || P.sc !== WQW.sc)
return null;
var F = WQW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = wqwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = wqwDressed("arb" + (c.key || c.k), c.dress || "wqmod", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : wqwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
WQW.scG.add(g);
Pp = { g: g, y: y, o: {} };
WQW.people.push(Pp);
if (c.name && !c.mute)
wqwTalk(Pp, c.name, wqwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
WQB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return WQB.cast[c.key || c.k];
},
function () {
var C = WQB_CH[wqbS().ch];
if (!C || !C.cast)
return;
var idx = wqbS().s;
C.cast.forEach(function (c) { var key = c.key || c.k; if (c.from != null && idx < c.from) {
if (WQB.cast[key])
wqbCastHide(key);
return;
} if (c.until != null && idx >= c.until) {
if (WQB.cast[key])
wqbCastHide(key);
return;
} if (!wqbCastLive(WQB.cast[key]))
wqbCastAdd(c); });
},
function () {
if (!WQW.scG)
return;
wqbCastClear();
var S = wqbS(), C = WQB_CH[S.ch];
if (S.started && !S.done && C && C.cast && wqbCastHere(C)) {
wqbCastTick();
return;
}
(WQB_FOLK_AT[WQW.sc] || []).forEach(function (q, qi) { var key = "f_" + q[0] + "_" + qi; var Pp = wqwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
WQB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!wqbActive())
return false;
var b = wqbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = wqbKey();
worldPrompt(null);
var next = function () { if (wqbKey() === k)
wqbStepDone(); };
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
worldCard(WQB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
WQB.wt += dt;
if (WQB.wt > 0.5) {
WQB.wt = 0;
if (wqbActive() && wqbCastHere(WQB_CH[wqbS().ch]))
wqbCastTick();
var S0 = wqbS();
S0.seen[WQW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!wqbActive()) {
if (WQB.beam)
WQB.beam.visible = false;
WQW.bannerBook = false;
return;
}
var S = wqbS(), b = wqbStep(), t = WQW.t, feet = camera.position.y - 1.72;
WQB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? wqbPos(b.at) : null, here = P && P.sc === WQW.sc, bm = wqbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + wqbScName(P.sc) + ": press E for the book)";
if (here && !WQW.moving && !WQW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : wqwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = wqbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !WQW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (WQB.readAsk)
break;
if (!WQB.readOpen)
wqbChapterCard();
else {
WQB.readOpen = 0;
wqbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
wqbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
WQB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(WQB.hold, dt);
}
catch (e) { }
if (WQB.hold >= (b.sec || 8)) {
wqbStepDone();
return;
}
}
else
WQB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return WQB.rew[k]; })) {
wqbStepDone();
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
wqbStepDone();
return;
}
break;
}
case "puzzle":
if ((!WQB.puzOpen || performance.now() - (WQB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
wqbPuzzleCard(b);
break;
case "fight":
if (!WQX.fight && (!P || (near && fd < (b.r || 9))) && performance.now() - (WQX.fightT || 0) > 2500)
wqxFightCard(b);
break;
}
}
var C = WQB_CH[S.ch], prog = b && b.k === "hold" && WQB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - WQB.hold)) + " s)" : b && b.k === "gather" ? " (" + (WQB.got || 0) + " of " + (b.n || 3) + ")" : "";
WQW.bannerBook = true;
worldBanner("⏳ <b>" + wqbLabel(S.ch) + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = wqbS(), C = WQB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>S. Nightwell · Winter's Heart, A Snow Queen Tale, the whole book</div><h3 style='margin:4px 0'>❄️ Winter's Heart</h3>";
if (S.done)
b += "<p>You have played the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + wqbLabel(S.ch) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((wqbStep() || {}).h || "") + "</p>";
var st = wqbStep(), P = st && st.at ? wqbPos(st.at) : null, Cs = wqbPos(C.start);
var to = P && P.sc !== WQW.sc ? P : (!P && Cs && Cs.sc !== WQW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + wqbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); wqwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { wqbPopulate(); wqbStepBegin(); }); };
}
}
else
b += "<p>You know the story of the Snow Queen: the ice witch who stole a boy named Kai, and brave little Gerda who saved him. It is almost entirely wrong. This is the true one, as Kael, the Ice King, tells it: five sister goddesses of the seasons, a mirror forged in hell, a sorceress's curse, a polar bear who was Old Man Winter, and how the Snow Queen found her heart.</p><p style='opacity:.85'>You will play every scene of the book, as the one each scene follows (Glacia, Kael, Cora, Talia), and you can read every chapter in full as you go.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Kael's Tale", S.started ? "Back to where you were" : "\"Let me tell you the truth of winter.\"");
fns.go = function () { worldCard(null); wqbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; wqbSave(); wqbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(WQW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(WQW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (WQW_SCN[k].start || { x: 0, z: 0 }); wqwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, wqbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += wqbKeeperBtns(fns);
worldCard(b, fns);
},
function (C) {
var R = function (v) { return typeof v === "string" ? wqbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
WQB_CH.push(C);
return C;
},
function (st, s) {
var V = function (v) { return typeof v === "function" ? v(s) : v; };
if (WQW.shows)
for (var k in WQW.shows) {
var o = WQW.shows[k];
if (o)
o.visible = st[k] === undefined ? !!o.userData.def : !!V(st[k]);
}
WQW.solids.forEach(function (S) { if (S.show) {
var on = st[S.show] === undefined ? !!S.showDef : !!V(st[S.show]);
S.off = !on;
} });
if (WQW.stateFns)
WQW.stateFns.forEach(function (f) { try {
f(st, V, s);
}
catch (e) { } });
},
function (dt, L) {
var i = 0;
for (var k in WQB.cast) {
var C = WQB.cast[k];
if (!C || !C.c || !C.c.follow || !C.g.parent)
continue;
i++;
var a = yaw + Math.PI + (i % 2 ? 0.7 : -0.7) * Math.ceil(i / 2) * 0.6, d = 2.4 + Math.ceil(i / 2) * 0.9, tx = L.x + Math.sin(a) * d, tz = L.z + Math.cos(a) * d, g = C.g, dx = tx - g.position.x, dz = tz - g.position.z, dd = Math.hypot(dx, dz);
if (dd > 60) {
g.position.x = tx;
g.position.z = tz;
}
else if (dd > 0.6) {
var sp = Math.min(dd, dt * Math.max(2.2, dd * 1.4));
g.position.x += dx / dd * sp;
g.position.z += dz / dd * sp;
g.rotation.y = Math.atan2(dx, dz);
}
var feet = camera.position.y - 1.72;
g.position.y = wqwGround(g.position.x, g.position.z, feet + 1);
}
},
function (g) {
var M = wqwShine(0x4A140A, 0.6, 0.1);
wqwEll(g, M, 0.28, 0.36, 0.26, 0, 0.75, 0, 10);
var hd = wqwEll(g, M, 0.2, 0.2, 0.2, 0, 1.2, 0.05, 10);
[-1, 1].forEach(function (k) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), wqwGlowM(0xFF8A1A, 1));
e.position.set(k * 0.07, 1.24, 0.2);
g.add(e);
var h = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.18, 6), wqwLam(0x1A0A0A));
h.position.set(k * 0.1, 1.4, 0);
h.rotation.z = -k * 0.4;
g.add(h);
g.add(wqwLeg(g, M, k * 0.12, 0.5, 0, 0.5, 0.07, {}));
var w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.4), wqwLam(0x2A0A0A, { ds: 1 }));
w.position.set(k * 0.3, 1.0, -0.15);
w.rotation.y = k * 0.6;
g.add(w);
});
g.userData.float = 1;
},
function (g) {
var M = wqwM("shadowfoe", function () { var m = new THREE.MeshBasicMaterial({ color: 0x0A0612, transparent: true, opacity: 0.82, depthWrite: false }); m.userData.noPhoto = 1; return m; });
var body = new THREE.Mesh(wqwTaper([[0, 0, 0], [0, 0.9, 0], [0, 1.8, 0.05], [0, 2.4, 0]], [0.5, 0.42, 0.3, 0.18], 10, 9), M);
g.add(body);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10), M);
hd.position.y = 2.45;
g.add(hd);
[-1, 1].forEach(function (k) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), wqwGlowM(0xB06AFF, 1));
e.position.set(k * 0.09, 2.48, 0.22);
g.add(e);
var arm = new THREE.Mesh(wqwTaper([[0, 0, 0], [k * 0.4, -0.4, 0.2], [k * 0.6, -1.0, 0.3]], [0.12, 0.08, 0.03], 8, 6), M);
arm.position.set(k * 0.3, 1.9, 0);
g.add(arm);
});
g.userData.float = 1;
},
function (g, s, col, eye) {
var M = wqwShine(col, 0.3, 0.05), dk = wqwLam(0x8AA0B8);
var b = wqwEll(g, M, 0.55 * s, 0.5 * s, 1.15 * s, 0, 1.05 * s, 0, 16);
var nk = new THREE.Mesh(wqwTaper([[0, 1.2 * s, 0.8 * s], [0, 1.45 * s, 1.25 * s]], [0.4 * s, 0.3 * s], 6, 8), M);
g.add(nk);
var hd = wqwEll(g, M, 0.3 * s, 0.3 * s, 0.42 * s, 0, 1.5 * s, 1.5 * s, 12);
wqwEll(g, M, 0.15 * s, 0.14 * s, 0.3 * s, 0, 1.42 * s, 1.85 * s, 10);
[-1, 1].forEach(function (k) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.05 * s, 8, 6), wqwGlowM(eye, 1));
e.position.set(k * 0.13 * s, 1.58 * s, 1.78 * s);
g.add(e);
var ear = new THREE.Mesh(new THREE.ConeGeometry(0.09 * s, 0.25 * s, 6), M);
ear.position.set(k * 0.16 * s, 1.82 * s, 1.42 * s);
g.add(ear);
});
[[-1, 0.7], [1, 0.7], [-1, -0.7], [1, -0.7]].forEach(function (q) { g.add(wqwLeg(g, M, q[0] * 0.3 * s, 0.95 * s, q[1] * s, 0.95 * s, 0.16 * s, { bend: q[1] > 0 ? -1 : 1 })); });
for (var i = 0; i < 14; i++) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.06 * s, 0.5 * s, 5), wqwShine(0xBFE8FF, 0.4, 0.2));
sp.position.set((i % 2 ? 1 : -1) * 0.15 * s * (i % 3), 1.5 * s, -0.8 * s + i * 0.12 * s);
sp.rotation.x = -0.5;
g.add(sp);
}
var tl = new THREE.Mesh(wqwTaper([[0, 1.1 * s, -1.1 * s], [0, 0.9 * s, -1.6 * s], [0, 0.6 * s, -1.9 * s]], [0.15 * s, 0.1 * s, 0.03 * s], 8, 6), M);
g.add(tl);
g.userData.beast = 1;
},
function (g) {
var M = wqwM("wraithM", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECFF, emissive: 0x2A4A6A, transparent: true, opacity: 0.7, shininess: 80, depthWrite: false }); m.userData.noPhoto = 1; return m; });
var robe = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3.2, 12, 1, true), M);
robe.position.y = 1.9;
g.add(robe);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 10), M);
hd.position.y = 3.5;
g.add(hd);
[-1, 1].forEach(function (k) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), wqwGlowM(0x8AE8FF, 1));
e.position.set(k * 0.12, 3.55, 0.28);
g.add(e);
var arm = new THREE.Mesh(wqwTaper([[0, 0, 0], [k * 0.7, -0.5, 0.4], [k * 1.1, -1.2, 0.6]], [0.16, 0.1, 0.02], 8, 6), M);
arm.position.set(k * 0.4, 3.0, 0);
g.add(arm);
});
for (var i = 0; i < 8; i++) {
var c = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.7, 5), wqwShine(0xE8F8FF, 0.5, 0.3));
c.position.set(Math.cos(i) * 0.7, 3.6 + Math.sin(i * 2) * 0.15, Math.sin(i) * 0.4);
c.rotation.z = Math.cos(i) * 0.6;
g.add(c);
}
g.userData.float = 1;
},
function (g, col, ice) {
var M = ice ? wqwShine(col, 0.25, 0.1) : wqwMat("rock"), R = wRand(col);
var t = wqwBox(g, 1.4, 1.5, 0.9, M, 0, 1.4, 0);
wqwBox(g, 0.7, 0.6, 0.6, M, 0, 2.95, 0.05);
[-1, 1].forEach(function (k) {
wqwBox(g, 0.5, 1.4, 0.5, M, k * 0.95, 1.4, 0);
wqwBox(g, 0.55, 1.3, 0.55, M, k * 0.4, 0, 0);
var e = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), wqwGlowM(ice ? 0x8AE8FF : 0xFF9A3A, 1));
e.position.set(k * 0.16, 3.25, 0.36);
g.add(e);
});
for (var i = 0; i < 6; i++) {
var c = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25 + R() * 0.2, 0), M);
c.position.set((R() - 0.5) * 1.4, 1.6 + R() * 1.3, 0.4);
g.add(c);
}
g.userData.beast = 1;
},
function (kind, P) {
var F = WQX_FOES[kind];
if (!F || !WQW.scG || !P || P.sc !== WQW.sc)
return null;
var g = new THREE.Group();
try {
F.make(g);
}
catch (e) { }
var y = P.y != null ? P.y : wqwGround(P.x, P.z, 500);
g.position.set(P.x, y, P.z);
g.userData.keep = 1;
g.userData.live = 1;
g.userData.y0 = y;
g.userData.ph = Math.random() * 6;
WQW.scG.add(g);
var o = { g: g, kind: kind, P: P };
WQX.foes.push(o);
return o;
},
function (dt) {
var L = wqwLocalSc();
WQX.foes.forEach(function (o) {
var g = o.g, u = g.userData;
u.ph += dt;
g.rotation.y = Math.atan2(L.x - g.position.x, L.z - g.position.z);
if (u.float || (g.children[0] && g.children[0].userData.float))
g.position.y = u.y0 + 0.3 + Math.sin(u.ph * 1.3) * 0.25;
if (o.hurt) {
o.hurt -= dt;
g.position.x = o.P.x + Math.sin(u.ph * 40) * 0.05 * Math.max(0, o.hurt);
}
});
},
function (b) {
var k = wqbKey(), F = WQX_FOES[b.foe] || WQX_FOES.shadow, as = b.as || wqxAs(), H = WQX_HEROES[as] || WQX_HEROES.glacia;
var n = b.n || 1, st = WQX.fight = { b: b, k: k, hp: (b.hp || F.hp) * n, max: (b.hp || F.hp) * n, me: 40, meMax: 40, log: b.intro || "", turn: 0, guard: 0 };
if (!WQX.foes.length) {
var P = wqbPos(b.at);
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
wqxFoeAdd(b.foe, { sc: P.sc, x: P.x + (n > 1 ? Math.cos(a) * 3 : 0), z: P.z + (n > 1 ? Math.sin(a) * 3 : 0) });
}
}
var bar = function (v, m, c) { return "<div style='height:8px;background:rgba(255,255,255,.12);border-radius:4px;overflow:hidden;margin:2px 0 6px'><div style='height:100%;width:" + Math.max(0, Math.round(v / m * 100)) + "%;background:" + c + "'></div></div>"; };
var show = function () {
if (wqbKey() !== k) {
WQX.fight = null;
return;
}
var pows = (b.pow || H.pow).filter(function (p) { return !p.from || wqxHas(p.from) || (b.give && b.give.indexOf(p.from) >= 0); });
var h = WQB_H + "⚔️ " + esc((n > 1 ? n + " × " : "") + (b.name || F.name)) + "</div>" + bar(st.hp, st.max, "#E86A4A") + "<div style='font-size:12px;opacity:.85'>" + H.icon + " " + esc(H.name) + "</div>" + bar(st.me, st.meMax, "#6AD8A8") + "<div style='opacity:.92;margin:6px 0;line-height:1.5;min-height:40px'>" + st.log + "</div>", fns = {};
pows.forEach(function (p, i) { h += worldBtn("p" + i, p.n, p.guard ? "guard and strike" : p.heal ? "heal" : ""); fns["p" + i] = function () { turn(p); }; });
fns.away = function () { worldCard(null); WQX.fight = null; WQX.fightT = performance.now(); wqbSay("You step back. Come close again to fight on."); };
h += worldBtn("away", "Step back", "");
worldCard(h, fns);
};
var turn = function (p) {
st.turn++;
var w = F.weak.indexOf(p.k) >= 0, s = F.strong.indexOf(p.k) >= 0, d = Math.round(p.d * (w ? 1.6 : s ? 0.4 : 1) * (0.85 + Math.random() * 0.3));
st.hp -= d;
if (p.heal)
st.me = Math.min(st.meMax, st.me + p.heal);
st.guard = p.guard ? 1 : 0;
WQX.foes.forEach(function (o) { o.hurt = 0.5; });
if (typeof playTone === "function")
try {
playTone(w ? 520 : s ? 180 : 340, 0.06);
}
catch (e) { }
st.log = "<b>" + esc(p.n) + ".</b> " + esc(p.say) + (d > 0 ? " (" + (w ? "it hurts it badly" : s ? "it barely touches it" : "a good hit") + ")" : "");
if (st.hp <= 0) {
WQX.fight = null;
worldCard(null);
wqxFoesClear();
if (typeof wqbHeard === "function")
wqbHeard("won:" + b.foe);
if (b.won)
try {
b.won();
}
catch (e) { }
if (b.yes)
wqbSay(b.yes);
if (wqbKey() === k)
wqbStepDone();
return;
}
var hit = Math.round((b.dmg || 7) * (st.guard ? 0.3 : 1) * (0.7 + Math.random() * 0.6));
st.me -= hit;
st.log += "<br><span style='opacity:.85'>" + esc(b.hit || F.hit) + (st.guard ? " Your guard takes most of it." : "") + "</span>";
if (st.me <= 0) {
st.me = st.meMax;
st.hp = Math.min(st.max, st.hp + Math.round(st.max * 0.25));
st.log += "<br><b>You are knocked down.</b> You get up again, slower, and it has caught its breath. Try what hurts it most.";
}
show();
};
show();
},
function (who, h, title, intro, opts, o) {
o = o || {};
return wvTalk(who, h, null, Object.assign({ act: function (next) {
var asked = {}, need = o.need || opts.length;
var show = function (last) {
var c = Object.keys(asked).length, b = WQB_H + esc(title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + (last || intro) + "</div>", fns = {};
opts.forEach(function (q, i) { if (asked[i] && !o.again)
return; b += worldBtn("q" + i, (asked[i] ? "↺ " : "💬 ") + q[0], ""); fns["q" + i] = function () { asked[i] = 1; show("<p style='margin:4px 0;opacity:.8'>You: " + esc(q[0]) + "</p>" + q[1]); }; });
if (c >= need) {
b += worldBtn("go", "▶ " + (o.btn || "Go on"), "");
fns.go = function () { worldCard(null); next(); };
}
worldCard(b, fns);
};
show();
} }, o));
},
function (title) {
var S = wqbS(), kp = typeof isKeeperNow === "function" && isKeeperNow(), upto = S.done || kp ? WQB_CH.length - 1 : S.ch, fns = {}, b = WQB_H + "📚 " + esc(title || "Winter's Heart") + "</div><p style='opacity:.85;margin:4px 0'>Every chapter you have reached, in the book's own words.</p><div style='max-height:50vh;overflow:auto'>";
for (var i = 0; i <= upto; i++) {
if (WQB_CH[i].txt == null)
continue;
b += "<span data-w='r" + i + "' role='button' style='display:block;margin:2px 0;padding:4px 8px;border:1px solid rgba(232,192,96,.4);border-radius:3px'>" + wqbLabel(i) + "</span>";
(function (j) { fns["r" + j] = function () { wqbReadAll(j); }; })(i);
}
b += "</div>";
fns.back = function () { worldCard(null); };
b += worldBtn("back", "Close", "");
worldCard(b, fns);
},
function (g, col, s) {
s = s || 1;
var M = wqwM("wing" + col, function () {
var t = wqwCanvas("wingT" + col, 128, 256, function (c, W, H) { c.clearRect(0, 0, W, H); var cs = "#" + ("000000" + col.toString(16)).slice(-6); var gr = c.createLinearGradient(0, 0, W, H); gr.addColorStop(0, cs); gr.addColorStop(1, "rgba(255,255,255,.3)"); c.fillStyle = gr; c.beginPath(); c.moveTo(4, H - 10); c.bezierCurveTo(10, 20, W - 10, 0, W - 6, 60); c.bezierCurveTo(W - 20, 140, 40, 200, 4, H - 10); c.fill(); c.strokeStyle = "rgba(255,255,255,.6)"; c.lineWidth = 2; for (var i = 0; i < 5; i++) {
c.beginPath();
c.moveTo(6, H - 12);
c.quadraticCurveTo(40 + i * 10, 120 - i * 10, W - 10 - i * 8, 40 + i * 20);
c.stroke();
} });
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthWrite: false });
m.userData.noPhoto = 1;
return m;
});
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(wqwGeo("wingG", function () { var p = new THREE.PlaneGeometry(0.6, 1.1); p.translate(0.3, 0.25, 0); return p; }), M); w.position.set(k * 0.06 * s, 1.32 * s, -0.12 * s); w.rotation.y = k > 0 ? -0.5 : Math.PI + 0.5; w.scale.setScalar(s); g.add(w); });
},
function (s) { var a = wqbIdx(WC2, "autumn"), sp = wqbIdx(WC2, "spring"), ex = wqbIdx(WC2, "barrier"); if (s >= ex && s < a)
return "barrier"; if (s >= wqbIdx(WC2, "wither") && s < sp)
return "autumnwither"; if (s >= wqbIdx(WC2, "chill") && s < wqbIdx(WC2, "crater"))
return "springcold"; if (s >= wqbIdx(WC2, "crater"))
return "dusksnow"; return null; },
function (G) {
if (typeof THREE === "undefined")
return;
var lite = typeof LITE !== "undefined" && !!LITE, H = function (x, z) { return typeof npHeight === "function" ? npHeight(x, z) : 0; };
var iceM = new THREE.MeshPhongMaterial({ color: 0x9AC8EC, emissive: 0x1A4A7A, emissiveIntensity: 0.35, shininess: 90, specular: 0x8AA8C8 }), cairnM = new THREE.MeshPhongMaterial({ color: 0xCFEAFF, emissive: 0x2A5A8A, emissiveIntensity: 0.4, shininess: 110, specular: 0xFFFFFF, flatShading: true });
iceM.userData.noPhoto = 1;
cairnM.userData.noPhoto = 1;
var g = new THREE.Group(), P = WQN.pts;
g.name = "winters-heart-road";
G.add(g);
var pos = [], idx = [], w = 3.6, n = 0;
for (var i = 0; i < P.length - 1; i++) {
var a = P[i], b = P[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), steps = Math.max(1, Math.round(L / 4));
for (var k = 0; k <= steps; k++) {
if (i > 0 && k === 0)
continue;
var t = k / steps, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t, nx = (b[1] - a[1]) / L, nz = -(b[0] - a[0]) / L;
pos.push(x - nx * w, H(x - nx * w, z - nz * w) + 0.06, z - nz * w, x + nx * w, H(x + nx * w, z + nz * w) + 0.06, z + nz * w);
if (n > 0)
idx.push(n * 2 - 2, n * 2 - 1, n * 2, n * 2 - 1, n * 2 + 1, n * 2);
n++;
}
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setIndex(idx);
geo.computeVertexNormals();
var road = new THREE.Mesh(geo, iceM);
road.receiveShadow = true;
g.add(road);
var cg = new THREE.OctahedronGeometry(0.7, 0);
for (i = 0; i < P.length - 1; i++) {
var a2 = P[i], b2 = P[i + 1], L2 = Math.hypot(b2[0] - a2[0], b2[1] - a2[1]);
for (var d = 8; d < L2; d += lite ? 40 : 22) {
var t2 = d / L2, x2 = a2[0] + (b2[0] - a2[0]) * t2, z2 = a2[1] + (b2[1] - a2[1]) * t2, nx2 = (b2[1] - a2[1]) / L2, nz2 = -(b2[0] - a2[0]) / L2;
[-1, 1].forEach(function (s) { var cx = x2 + nx2 * s * 5.5, cz = z2 + nz2 * s * 5.5, c = new THREE.Mesh(cg, cairnM); c.scale.set(0.8, 1.9, 0.8); c.position.set(cx, H(cx, cz) + 1.2, cz); c.rotation.y = d; g.add(c); });
}
}
var s0 = P[0], post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 2.6, 8), new THREE.MeshLambertMaterial({ color: 0x6A4A2E }));
post.position.set(s0[0] + 5, H(s0[0] + 5, s0[1]) + 1.3, s0[1]);
g.add(post);
if (typeof wSign === "function")
try {
var sg = wSign(["The ice road", "to the Winter Palace", "Winter's Heart"], 2.4, 1.0, "#E8F4FF", "#1A3A6A");
sg.position.set(s0[0] + 5, H(s0[0] + 5, s0[1]) + 2.2, s0[1] + 0.1);
g.add(sg);
}
catch (e) { }
var e = P[P.length - 1], ey = H(e[0], e[1]), arch = new THREE.Group();
arch.position.set(e[0], ey, e[1]);
g.add(arch);
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 1.2, 10, 8), cairnM); p.position.set(s * 5, 5, 0); arch.add(p); var sp = new THREE.Mesh(new THREE.ConeGeometry(0.8, 5, 8), cairnM); sp.position.set(s * 5, 12.5, 0); arch.add(sp); });
var top = new THREE.Mesh(new THREE.TorusGeometry(5, 0.7, 8, 24, Math.PI), cairnM);
top.position.y = 10;
arch.add(top);
var glow = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 10), new THREE.MeshBasicMaterial({ color: 0xBFE8FF, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
glow.position.y = 5;
arch.add(glow);
if (typeof NP !== "undefined") {
[-1, 1].forEach(function (s) { NP.solids.push({ x: e[0] + s * 5, z: e[1], r: 1.2 }); });
var sp0 = { x: s0[0] + 5, z: s0[1], r: 3.4, name: "The ice road", verb: "read the sign", fn: function () { setStatus("❄️ <b>The ice road, to the Winter Palace.</b> North, past the Pole and across the sea ice, to the arch at the edge of the world, and on up to the palace of the Snow Queen. A book is told there: <b>Winter's Heart</b>, her true story."); } };
NP.wqRoad = { x: e[0], z: e[1] + 3, r: 6, name: "The arch of ice: the road to the Winter Palace", verb: "walk on to the Winter Palace", fn: function () { if (typeof wqwFromRoad === "function")
wqwFromRoad(); } };
NP.talkers.push(sp0, NP.wqRoad);
}
},
function (s) { var t = wqbIdx(WC3, "tear"), c = wqbIdx(WC3, "calm"); if (s >= t && s < c)
return "tear"; if (s >= wqbIdx(WC3, "frosted") && s < wqbIdx(WC3, "steppe"))
return "firstfrost"; if (s >= wqbIdx(WC3, "steppe") && s < wqbIdx(WC3, "steppeFrost"))
return "steppe"; if (s >= wqbIdx(WC3, "steppeFrost") && s < wqbIdx(WC3, "back"))
return "steppesnow"; return null; },
function () {
if (!wqrDone()) {
wqbSay("🪞 The glass is only glass, for now. <b>The Mirror Void</b> opens once you have finished <i>Winter's Heart</i>.");
return;
}
if (typeof bhnVault === "function")
bhnVault(WQW_KEY);
else
wqbSay("🪞 The Mirror Void opens with the Dungeon Maker; it is not on this device yet.");
},
function () {
if (!wqrDone()) {
wqbSay("🐻‍❄️ <b>The Last Hold</b> opens once you have finished <i>Winter's Heart</i>.");
return;
}
var P = wqwInAt("palace", 0, -15, 8), st = { hp: 110, max: 110, me: 40, meMax: 40, hold: 0, turn: 0, log: "<i>The world goes grey. The shard makes its last grab, and out of the glass comes your own shadow.</i>" };
try {
wqxFoesClear();
wqxFoeAdd("shade", { sc: P.sc, x: P.x - 3, z: P.z - 3 });
}
catch (e) { }
var bar = function (v, m, c) { return "<div style='height:8px;background:rgba(255,255,255,.12);border-radius:4px;overflow:hidden;margin:2px 0 6px'><div style='height:100%;width:" + Math.max(0, Math.round(v / m * 100)) + "%;background:" + c + "'></div></div>"; };
var pows = [{ k: "claw", n: "Claws", d: 10, say: "You rise and strike at the shadow, and it is your own shape that reels back." }, { k: "maul", n: "Your weight", d: 13, say: "Half a ton of bear comes down on the thing that wears your face." },
{ k: "roar", n: "Roar", d: 4, guard: 1, say: "You roar, and the grey shivers." }, { k: "hold", n: "Hold on to her", d: 16, hold: 1, say: "I loved her. I loved her. I loved her." }];
var show = function () {
var h = WQB_H + "⚔️ The Last Hold: Kael's shadow from the glass</div>" + bar(st.hp, st.max, "#8A7AB8") + "<div style='font-size:12px;opacity:.85'>🐻‍❄️ the great white bear · holding on " + st.hold + " of 3</div>" + bar(st.me, st.meMax, "#6AD8A8") + "<div style='opacity:.92;margin:6px 0;line-height:1.5;min-height:40px'>" + st.log + "</div>", fns = {};
pows.forEach(function (p, i) { h += worldBtn("p" + i, p.n, p.guard ? "guard" : p.hold ? "what saves you" : ""); fns["p" + i] = function () { turn(p); }; });
h += worldBtn("away", "Let go (try again later)", "");
fns.away = function () { worldCard(null); try {
wqxFoesClear();
}
catch (e) { } wqbSay("The grey lets go of you, for now."); };
worldCard(h, fns);
};
var turn = function (p) {
st.turn++;
var d = Math.round(p.d * (0.85 + Math.random() * 0.3));
if (p.hold) {
st.hold++;
st.me = Math.min(st.meMax, st.me + 8);
}
st.hp -= d;
st.log = "<b>" + esc(p.n) + ".</b> " + (p.hold ? "<i>" + esc(p.say) + "</i> " + WQR_HOLD[(st.hold - 1) % 3] : esc(p.say));
if (st.hp <= 0 && st.hold >= 3) {
worldCard(null);
try {
wqxFoesClear();
}
catch (e) { }
worldCard(WQB_H + "❄️ The kiss comes</div><div style='line-height:1.5'>" + wqQ("Then she leaned in and pressed her lips to my forehead, right over my corrupted eye.") + "<br>" + wqQ("And the world turned to ice.") + "<p>You held on. The Last Hold is won.</p></div>" + worldBtn("ok", "▶ Go on", ""), { ok: function () { worldCard(null); } });
try {
if (typeof bhnBattleWon === "function")
bhnBattleWon(WQW_KEY, { boss: true });
}
catch (e) { }
return;
}
if (st.hp <= 0) {
st.hp = Math.round(st.max * 0.2);
st.log += "<br><span style='opacity:.85'>It falls back, and comes again. Force alone will not end this: hold on to her.</span>";
}
var cruel = WQR_CRUEL[st.turn % 3], hit = Math.round(7 * (p.guard ? 0.3 : 1) * (0.7 + Math.random() * 0.6));
st.me -= hit;
st.log += "<br><span style='opacity:.8'>" + cruel + "</span>";
if (st.me <= 0) {
st.me = st.meMax;
st.hp = Math.min(st.max, st.hp + 25);
st.log += "<br><b>The grey closes over you.</b> You find her face again, and fight on.";
}
show();
};
show();
}
];
});
